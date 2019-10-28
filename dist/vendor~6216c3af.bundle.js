(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "6lN/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");
var utils = __webpack_require__("86MQ");
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a]);
      naf[b] = getNAF(coeffs[b], wndWidth[b]);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};


/***/ }),

/***/ "86MQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;
var BN = __webpack_require__("OZ/i");
var minAssert = __webpack_require__("2j6C");
var minUtils = __webpack_require__("dlgc");

utils.assert = minAssert;
utils.toArray = minUtils.toArray;
utils.zero2 = minUtils.zero2;
utils.toHex = minUtils.toHex;
utils.encode = minUtils.encode;

// Represent num in a w-NAF form
function getNAF(num, w) {
  var naf = [];
  var ws = 1 << (w + 1);
  var k = num.clone();
  while (k.cmpn(1) >= 0) {
    var z;
    if (k.isOdd()) {
      var mod = k.andln(ws - 1);
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }
    naf.push(z);

    // Optimization, shift by word if possible
    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
    for (var i = 1; i < shift; i++)
      naf.push(0);
    k.iushrn(shift);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;



/***/ }),

/***/ "DLvh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curves = exports;

var hash = __webpack_require__("fZJM");
var curve = __webpack_require__("QTa/");
var utils = __webpack_require__("86MQ");

var assert = utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new curve.edwards(options);
  else
    this.curve = new curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = __webpack_require__("QJsb");
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});


/***/ }),

/***/ "KAEN":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"elliptic\",\"version\":\"6.5.0\",\"description\":\"EC cryptography\",\"main\":\"lib/elliptic.js\",\"files\":[\"lib\"],\"scripts\":{\"jscs\":\"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js\",\"jshint\":\"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js\",\"lint\":\"npm run jscs && npm run jshint\",\"unit\":\"istanbul test _mocha --reporter=spec test/index.js\",\"test\":\"npm run lint && npm run unit\",\"version\":\"grunt dist && git add dist/\"},\"repository\":{\"type\":\"git\",\"url\":\"git@github.com:indutny/elliptic\"},\"keywords\":[\"EC\",\"Elliptic\",\"curve\",\"Cryptography\"],\"author\":\"Fedor Indutny <fedor@indutny.com>\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/indutny/elliptic/issues\"},\"homepage\":\"https://github.com/indutny/elliptic\",\"devDependencies\":{\"brfs\":\"^1.4.3\",\"coveralls\":\"^2.11.3\",\"grunt\":\"^0.4.5\",\"grunt-browserify\":\"^5.0.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-connect\":\"^1.0.0\",\"grunt-contrib-copy\":\"^1.0.0\",\"grunt-contrib-uglify\":\"^1.0.1\",\"grunt-mocha-istanbul\":\"^3.0.1\",\"grunt-saucelabs\":\"^8.6.2\",\"istanbul\":\"^0.4.2\",\"jscs\":\"^2.9.0\",\"jshint\":\"^2.6.0\",\"mocha\":\"^2.1.0\"},\"dependencies\":{\"bn.js\":\"^4.4.0\",\"brorand\":\"^1.0.1\",\"hash.js\":\"^1.0.0\",\"hmac-drbg\":\"^1.0.0\",\"inherits\":\"^2.0.1\",\"minimalistic-assert\":\"^1.0.0\",\"minimalistic-crypto-utils\":\"^1.0.0\"}}");

/***/ }),

/***/ "MwBp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("86MQ");
var BN = __webpack_require__("OZ/i");
var inherits = __webpack_require__("P7XM");
var Base = __webpack_require__("6lN/");

var assert = utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);

  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};


/***/ }),

/***/ "MzeL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = exports;

elliptic.version = __webpack_require__("KAEN").version;
elliptic.utils = __webpack_require__("86MQ");
elliptic.rand = __webpack_require__("/ayr");
elliptic.curve = __webpack_require__("QTa/");
elliptic.curves = __webpack_require__("DLvh");

// Protocols
elliptic.ec = __webpack_require__("uagp");
elliptic.eddsa = __webpack_require__("lF1L");


/***/ }),

/***/ "OA+I":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("86MQ");
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;


/***/ }),

/***/ "Pa+m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("86MQ");
var BN = __webpack_require__("OZ/i");
var inherits = __webpack_require__("P7XM");
var Base = __webpack_require__("6lN/");

var assert = utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.c2);
  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.fromRed().isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
    (this.y.cmp(this.z) === 0 ||
    (this.zOne && this.y.cmp(this.curve.c) === 0));
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.z).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),

/***/ "QJsb":
/***/ (function(module, exports) {

module.exports = {
  doubles: {
    step: 4,
    points: [
      [
        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
      ],
      [
        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
      ],
      [
        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
      ],
      [
        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
      ],
      [
        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
      ],
      [
        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
      ],
      [
        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
      ],
      [
        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
      ],
      [
        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
      ],
      [
        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
      ],
      [
        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
      ],
      [
        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
      ],
      [
        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
      ],
      [
        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
      ],
      [
        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
      ],
      [
        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
      ],
      [
        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
      ],
      [
        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
      ],
      [
        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
      ],
      [
        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
      ],
      [
        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
      ],
      [
        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
      ],
      [
        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
      ],
      [
        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
      ],
      [
        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
      ],
      [
        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
      ],
      [
        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
      ],
      [
        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
      ],
      [
        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
      ],
      [
        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
      ],
      [
        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
      ],
      [
        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
      ],
      [
        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
      ],
      [
        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
      ],
      [
        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
      ],
      [
        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
      ],
      [
        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
      ],
      [
        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
      ],
      [
        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
      ],
      [
        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
      ],
      [
        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
      ],
      [
        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
      ],
      [
        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
      ],
      [
        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
      ],
      [
        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
      ],
      [
        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
      ],
      [
        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
      ],
      [
        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
      ],
      [
        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
      ],
      [
        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
      ],
      [
        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
      ],
      [
        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
      ],
      [
        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
      ],
      [
        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
      ],
      [
        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
      ],
      [
        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
      ],
      [
        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
      ],
      [
        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
      ],
      [
        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
      ],
      [
        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
      ],
      [
        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
      ],
      [
        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
      ],
      [
        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
      ],
      [
        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
      ],
      [
        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
      ]
    ]
  },
  naf: {
    wnd: 7,
    points: [
      [
        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
      ],
      [
        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
      ],
      [
        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
      ],
      [
        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
      ],
      [
        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
      ],
      [
        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
      ],
      [
        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
      ],
      [
        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
      ],
      [
        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
      ],
      [
        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
      ],
      [
        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
      ],
      [
        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
      ],
      [
        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
      ],
      [
        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
      ],
      [
        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
      ],
      [
        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
      ],
      [
        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
      ],
      [
        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
      ],
      [
        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
      ],
      [
        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
      ],
      [
        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
      ],
      [
        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
      ],
      [
        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
      ],
      [
        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
      ],
      [
        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
      ],
      [
        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
      ],
      [
        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
      ],
      [
        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
      ],
      [
        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
      ],
      [
        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
      ],
      [
        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
      ],
      [
        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
      ],
      [
        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
      ],
      [
        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
      ],
      [
        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
      ],
      [
        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
      ],
      [
        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
      ],
      [
        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
      ],
      [
        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
      ],
      [
        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
      ],
      [
        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
      ],
      [
        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
      ],
      [
        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
      ],
      [
        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
      ],
      [
        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
      ],
      [
        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
      ],
      [
        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
      ],
      [
        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
      ],
      [
        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
      ],
      [
        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
      ],
      [
        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
      ],
      [
        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
      ],
      [
        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
      ],
      [
        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
      ],
      [
        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
      ],
      [
        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
      ],
      [
        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
      ],
      [
        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
      ],
      [
        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
      ],
      [
        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
      ],
      [
        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
      ],
      [
        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
      ],
      [
        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
      ],
      [
        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
      ],
      [
        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
      ],
      [
        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
      ],
      [
        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
      ],
      [
        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
      ],
      [
        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
      ],
      [
        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
      ],
      [
        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
      ],
      [
        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
      ],
      [
        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
      ],
      [
        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
      ],
      [
        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
      ],
      [
        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
      ],
      [
        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
      ],
      [
        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
      ],
      [
        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
      ],
      [
        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
      ],
      [
        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
      ],
      [
        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
      ],
      [
        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
      ],
      [
        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
      ],
      [
        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
      ],
      [
        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
      ],
      [
        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
      ],
      [
        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
      ],
      [
        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
      ],
      [
        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
      ],
      [
        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
      ],
      [
        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
      ],
      [
        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
      ],
      [
        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
      ],
      [
        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
      ],
      [
        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
      ],
      [
        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
      ],
      [
        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
      ],
      [
        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
      ],
      [
        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
      ],
      [
        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
      ],
      [
        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
      ],
      [
        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
      ],
      [
        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
      ],
      [
        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
      ],
      [
        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
      ],
      [
        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
      ],
      [
        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
      ],
      [
        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
      ],
      [
        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
      ],
      [
        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
      ],
      [
        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
      ],
      [
        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
      ],
      [
        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
      ],
      [
        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
      ],
      [
        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
      ],
      [
        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
      ],
      [
        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
      ],
      [
        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
      ],
      [
        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
      ],
      [
        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
      ],
      [
        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
      ],
      [
        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
      ],
      [
        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
      ],
      [
        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
      ],
      [
        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
      ],
      [
        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
      ]
    ]
  }
};


/***/ }),

/***/ "QTa/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = exports;

curve.base = __webpack_require__("6lN/");
curve.short = __webpack_require__("MwBp");
curve.mont = __webpack_require__("Z2+3");
curve.edwards = __webpack_require__("Pa+m");


/***/ }),

/***/ "RKMU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");
var utils = __webpack_require__("86MQ");
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;


/***/ }),

/***/ "Z2+3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");
var inherits = __webpack_require__("P7XM");
var Base = __webpack_require__("6lN/");

var utils = __webpack_require__("86MQ");

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};


/***/ }),

/***/ "lF1L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__("fZJM");
var curves = __webpack_require__("DLvh");
var utils = __webpack_require__("86MQ");
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = __webpack_require__("OA+I");
var Signature = __webpack_require__("RKMU");

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};


/***/ }),

/***/ "tz+M":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");

var utils = __webpack_require__("86MQ");
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
  }
  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0 && (r[1] & 0x80)) {
    r = r.slice(1);
  }
  if (s[0] === 0 && (s[1] & 0x80)) {
    s = s.slice(1);
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};


/***/ }),

/***/ "uagp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");
var HmacDRBG = __webpack_require__("aqI/");
var utils = __webpack_require__("86MQ");
var curves = __webpack_require__("DLvh");
var rand = __webpack_require__("/ayr");
var assert = utils.assert;

var KeyPair = __webpack_require__("uzSA");
var Signature = __webpack_require__("tz+M");

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8'
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};


/***/ }),

/***/ "uzSA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("OZ/i");
var utils = __webpack_require__("86MQ");
var assert = utils.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2N1cnZlL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2N1cnZlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2N1cnZlL3Nob3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9lZGRzYS9rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9jdXJ2ZS9lZHdhcmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvcHJlY29tcHV0ZWQvc2VjcDI1NmsxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvY3VydmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9lZGRzYS9zaWduYXR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9jdXJ2ZS9tb250LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvZWRkc2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9lYy9zaWduYXR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9lYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2VjL2tleS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsTUFBTztBQUN4QixZQUFZLG1CQUFPLENBQUMsTUFBVTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUIsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNyWGE7O0FBRWI7QUFDQSxTQUFTLG1CQUFPLENBQUMsTUFBTztBQUN4QixnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFxQjtBQUM3QyxlQUFlLG1CQUFPLENBQUMsTUFBMkI7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RIYTs7QUFFYjs7QUFFQSxXQUFXLG1CQUFPLENBQUMsTUFBUztBQUM1QixZQUFZLG1CQUFPLENBQUMsTUFBUztBQUM3QixZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsUUFBUSxtQkFBTyxDQUFDLE1BQXlCO0FBQ3pDLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TVk7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLE1BQVU7QUFDOUIsU0FBUyxtQkFBTyxDQUFDLE1BQU87QUFDeEIsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakMsV0FBVyxtQkFBTyxDQUFDLE1BQVE7O0FBRTNCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLGVBQWU7QUFDcEIsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsV0FBVztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdjZCYTs7QUFFYjs7QUFFQSxtQkFBbUIsbUJBQU8sQ0FBQyxNQUFpQjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFrQjtBQUMzQyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFTO0FBQ2pDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWtCO0FBQzNDLGtCQUFrQixtQkFBTyxDQUFDLE1BQW1COztBQUU3QztBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFlO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWtCOzs7Ozs7Ozs7QUNaOUI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLE1BQVU7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsT0FBTztBQUNqQjtBQUNBLFVBQVUsWUFBWTtBQUN0QixVQUFVLE1BQU07QUFDaEIsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixXQUFXO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDOUZhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxNQUFVO0FBQzlCLFNBQVMsbUJBQU8sQ0FBQyxNQUFPO0FBQ3hCLGVBQWUsbUJBQU8sQ0FBQyxNQUFVO0FBQ2pDLFdBQVcsbUJBQU8sQ0FBQyxNQUFROztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQy9hQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM3dCYTs7QUFFYjs7QUFFQSxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBUztBQUMvQixhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXOzs7Ozs7Ozs7QUNQdEI7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLE1BQU87QUFDeEIsWUFBWSxtQkFBTyxDQUFDLE1BQVU7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsb0JBQW9CO0FBQzlCLFVBQVUsbUJBQW1CO0FBQzdCLFVBQVUsZ0JBQWdCO0FBQzFCLFVBQVUsYUFBYTtBQUN2QixVQUFVLGFBQWE7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNoRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLE1BQU87QUFDeEIsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakMsV0FBVyxtQkFBTyxDQUFDLE1BQVE7O0FBRTNCLFlBQVksbUJBQU8sQ0FBQyxNQUFVOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZix1Q0FBdUM7QUFDdkMsZUFBZTs7QUFFZixxQkFBcUIsaUJBQWlCO0FBQ3RDOztBQUVBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNqTGE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLE1BQVM7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLE1BQVc7QUFDaEMsWUFBWSxtQkFBTyxDQUFDLE1BQVU7QUFDOUI7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFPO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLE1BQWE7O0FBRXJDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFVBQVUsYUFBYTtBQUN2QixVQUFVLHFCQUFxQjtBQUMvQixZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUNBQWlDO0FBQzlEOztBQUVBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsdUJBQXVCO0FBQ2pDLFVBQVUsMkJBQTJCO0FBQ3JDLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDckhhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxNQUFPOztBQUV4QixZQUFZLG1CQUFPLENBQUMsTUFBVTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGNBQWM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcklhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxNQUFPO0FBQ3hCLGVBQWUsbUJBQU8sQ0FBQyxNQUFXO0FBQ2xDLFlBQVksbUJBQU8sQ0FBQyxNQUFVO0FBQzlCLGFBQWEsbUJBQU8sQ0FBQyxNQUFXO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxNQUFTO0FBQzVCOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxNQUFPO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLE1BQWE7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBLG9CQUFvQixNQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiwyQ0FBMkM7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaFBhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxNQUFPO0FBQ3hCLFlBQVksbUJBQU8sQ0FBQyxNQUFVO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTs7QUFFWixVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcn42MjE2YzNhZi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGdldE5BRiA9IHV0aWxzLmdldE5BRjtcbnZhciBnZXRKU0YgPSB1dGlscy5nZXRKU0Y7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBCYXNlQ3VydmUodHlwZSwgY29uZikge1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLnAgPSBuZXcgQk4oY29uZi5wLCAxNik7XG5cbiAgLy8gVXNlIE1vbnRnb21lcnksIHdoZW4gdGhlcmUgaXMgbm8gZmFzdCByZWR1Y3Rpb24gZm9yIHRoZSBwcmltZVxuICB0aGlzLnJlZCA9IGNvbmYucHJpbWUgPyBCTi5yZWQoY29uZi5wcmltZSkgOiBCTi5tb250KHRoaXMucCk7XG5cbiAgLy8gVXNlZnVsIGZvciBtYW55IGN1cnZlc1xuICB0aGlzLnplcm8gPSBuZXcgQk4oMCkudG9SZWQodGhpcy5yZWQpO1xuICB0aGlzLm9uZSA9IG5ldyBCTigxKS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMudHdvID0gbmV3IEJOKDIpLnRvUmVkKHRoaXMucmVkKTtcblxuICAvLyBDdXJ2ZSBjb25maWd1cmF0aW9uLCBvcHRpb25hbFxuICB0aGlzLm4gPSBjb25mLm4gJiYgbmV3IEJOKGNvbmYubiwgMTYpO1xuICB0aGlzLmcgPSBjb25mLmcgJiYgdGhpcy5wb2ludEZyb21KU09OKGNvbmYuZywgY29uZi5nUmVkKTtcblxuICAvLyBUZW1wb3JhcnkgYXJyYXlzXG4gIHRoaXMuX3duYWZUMSA9IG5ldyBBcnJheSg0KTtcbiAgdGhpcy5fd25hZlQyID0gbmV3IEFycmF5KDQpO1xuICB0aGlzLl93bmFmVDMgPSBuZXcgQXJyYXkoNCk7XG4gIHRoaXMuX3duYWZUNCA9IG5ldyBBcnJheSg0KTtcblxuICAvLyBHZW5lcmFsaXplZCBHcmVnIE1heHdlbGwncyB0cmlja1xuICB2YXIgYWRqdXN0Q291bnQgPSB0aGlzLm4gJiYgdGhpcy5wLmRpdih0aGlzLm4pO1xuICBpZiAoIWFkanVzdENvdW50IHx8IGFkanVzdENvdW50LmNtcG4oMTAwKSA+IDApIHtcbiAgICB0aGlzLnJlZE4gPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX21heHdlbGxUcmljayA9IHRydWU7XG4gICAgdGhpcy5yZWROID0gdGhpcy5uLnRvUmVkKHRoaXMucmVkKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ3VydmU7XG5cbkJhc2VDdXJ2ZS5wcm90b3R5cGUucG9pbnQgPSBmdW5jdGlvbiBwb2ludCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cbkJhc2VDdXJ2ZS5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cbkJhc2VDdXJ2ZS5wcm90b3R5cGUuX2ZpeGVkTmFmTXVsID0gZnVuY3Rpb24gX2ZpeGVkTmFmTXVsKHAsIGspIHtcbiAgYXNzZXJ0KHAucHJlY29tcHV0ZWQpO1xuICB2YXIgZG91YmxlcyA9IHAuX2dldERvdWJsZXMoKTtcblxuICB2YXIgbmFmID0gZ2V0TkFGKGssIDEpO1xuICB2YXIgSSA9ICgxIDw8IChkb3VibGVzLnN0ZXAgKyAxKSkgLSAoZG91Ymxlcy5zdGVwICUgMiA9PT0gMCA/IDIgOiAxKTtcbiAgSSAvPSAzO1xuXG4gIC8vIFRyYW5zbGF0ZSBpbnRvIG1vcmUgd2luZG93ZWQgZm9ybVxuICB2YXIgcmVwciA9IFtdO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IG5hZi5sZW5ndGg7IGogKz0gZG91Ymxlcy5zdGVwKSB7XG4gICAgdmFyIG5hZlcgPSAwO1xuICAgIGZvciAodmFyIGsgPSBqICsgZG91Ymxlcy5zdGVwIC0gMTsgayA+PSBqOyBrLS0pXG4gICAgICBuYWZXID0gKG5hZlcgPDwgMSkgKyBuYWZba107XG4gICAgcmVwci5wdXNoKG5hZlcpO1xuICB9XG5cbiAgdmFyIGEgPSB0aGlzLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgdmFyIGIgPSB0aGlzLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgZm9yICh2YXIgaSA9IEk7IGkgPiAwOyBpLS0pIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcHIubGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciBuYWZXID0gcmVwcltqXTtcbiAgICAgIGlmIChuYWZXID09PSBpKVxuICAgICAgICBiID0gYi5taXhlZEFkZChkb3VibGVzLnBvaW50c1tqXSk7XG4gICAgICBlbHNlIGlmIChuYWZXID09PSAtaSlcbiAgICAgICAgYiA9IGIubWl4ZWRBZGQoZG91Ymxlcy5wb2ludHNbal0ubmVnKCkpO1xuICAgIH1cbiAgICBhID0gYS5hZGQoYik7XG4gIH1cbiAgcmV0dXJuIGEudG9QKCk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLl93bmFmTXVsID0gZnVuY3Rpb24gX3duYWZNdWwocCwgaykge1xuICB2YXIgdyA9IDQ7XG5cbiAgLy8gUHJlY29tcHV0ZSB3aW5kb3dcbiAgdmFyIG5hZlBvaW50cyA9IHAuX2dldE5BRlBvaW50cyh3KTtcbiAgdyA9IG5hZlBvaW50cy53bmQ7XG4gIHZhciB3bmQgPSBuYWZQb2ludHMucG9pbnRzO1xuXG4gIC8vIEdldCBOQUYgZm9ybVxuICB2YXIgbmFmID0gZ2V0TkFGKGssIHcpO1xuXG4gIC8vIEFkZCBgdGhpc2AqKE4rMSkgZm9yIGV2ZXJ5IHctTkFGIGluZGV4XG4gIHZhciBhY2MgPSB0aGlzLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgZm9yICh2YXIgaSA9IG5hZi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIC8vIENvdW50IHplcm9lc1xuICAgIGZvciAodmFyIGsgPSAwOyBpID49IDAgJiYgbmFmW2ldID09PSAwOyBpLS0pXG4gICAgICBrKys7XG4gICAgaWYgKGkgPj0gMClcbiAgICAgIGsrKztcbiAgICBhY2MgPSBhY2MuZGJscChrKTtcblxuICAgIGlmIChpIDwgMClcbiAgICAgIGJyZWFrO1xuICAgIHZhciB6ID0gbmFmW2ldO1xuICAgIGFzc2VydCh6ICE9PSAwKTtcbiAgICBpZiAocC50eXBlID09PSAnYWZmaW5lJykge1xuICAgICAgLy8gSiArLSBQXG4gICAgICBpZiAoeiA+IDApXG4gICAgICAgIGFjYyA9IGFjYy5taXhlZEFkZCh3bmRbKHogLSAxKSA+PiAxXSk7XG4gICAgICBlbHNlXG4gICAgICAgIGFjYyA9IGFjYy5taXhlZEFkZCh3bmRbKC16IC0gMSkgPj4gMV0ubmVnKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBKICstIEpcbiAgICAgIGlmICh6ID4gMClcbiAgICAgICAgYWNjID0gYWNjLmFkZCh3bmRbKHogLSAxKSA+PiAxXSk7XG4gICAgICBlbHNlXG4gICAgICAgIGFjYyA9IGFjYy5hZGQod25kWygteiAtIDEpID4+IDFdLm5lZygpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHAudHlwZSA9PT0gJ2FmZmluZScgPyBhY2MudG9QKCkgOiBhY2M7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLl93bmFmTXVsQWRkID0gZnVuY3Rpb24gX3duYWZNdWxBZGQoZGVmVyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29lZmZzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqYWNvYmlhblJlc3VsdCkge1xuICB2YXIgd25kV2lkdGggPSB0aGlzLl93bmFmVDE7XG4gIHZhciB3bmQgPSB0aGlzLl93bmFmVDI7XG4gIHZhciBuYWYgPSB0aGlzLl93bmFmVDM7XG5cbiAgLy8gRmlsbCBhbGwgYXJyYXlzXG4gIHZhciBtYXggPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIHAgPSBwb2ludHNbaV07XG4gICAgdmFyIG5hZlBvaW50cyA9IHAuX2dldE5BRlBvaW50cyhkZWZXKTtcbiAgICB3bmRXaWR0aFtpXSA9IG5hZlBvaW50cy53bmQ7XG4gICAgd25kW2ldID0gbmFmUG9pbnRzLnBvaW50cztcbiAgfVxuXG4gIC8vIENvbWIgc21hbGwgd2luZG93IE5BRnNcbiAgZm9yICh2YXIgaSA9IGxlbiAtIDE7IGkgPj0gMTsgaSAtPSAyKSB7XG4gICAgdmFyIGEgPSBpIC0gMTtcbiAgICB2YXIgYiA9IGk7XG4gICAgaWYgKHduZFdpZHRoW2FdICE9PSAxIHx8IHduZFdpZHRoW2JdICE9PSAxKSB7XG4gICAgICBuYWZbYV0gPSBnZXROQUYoY29lZmZzW2FdLCB3bmRXaWR0aFthXSk7XG4gICAgICBuYWZbYl0gPSBnZXROQUYoY29lZmZzW2JdLCB3bmRXaWR0aFtiXSk7XG4gICAgICBtYXggPSBNYXRoLm1heChuYWZbYV0ubGVuZ3RoLCBtYXgpO1xuICAgICAgbWF4ID0gTWF0aC5tYXgobmFmW2JdLmxlbmd0aCwgbWF4KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBjb21iID0gW1xuICAgICAgcG9pbnRzW2FdLCAvKiAxICovXG4gICAgICBudWxsLCAvKiAzICovXG4gICAgICBudWxsLCAvKiA1ICovXG4gICAgICBwb2ludHNbYl0gLyogNyAqL1xuICAgIF07XG5cbiAgICAvLyBUcnkgdG8gYXZvaWQgUHJvamVjdGl2ZSBwb2ludHMsIGlmIHBvc3NpYmxlXG4gICAgaWYgKHBvaW50c1thXS55LmNtcChwb2ludHNbYl0ueSkgPT09IDApIHtcbiAgICAgIGNvbWJbMV0gPSBwb2ludHNbYV0uYWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXS5uZWcoKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludHNbYV0ueS5jbXAocG9pbnRzW2JdLnkucmVkTmVnKCkpID09PSAwKSB7XG4gICAgICBjb21iWzFdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLmFkZChwb2ludHNbYl0ubmVnKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21iWzFdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXS5uZWcoKSk7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gW1xuICAgICAgLTMsIC8qIC0xIC0xICovXG4gICAgICAtMSwgLyogLTEgMCAqL1xuICAgICAgLTUsIC8qIC0xIDEgKi9cbiAgICAgIC03LCAvKiAwIC0xICovXG4gICAgICAwLCAvKiAwIDAgKi9cbiAgICAgIDcsIC8qIDAgMSAqL1xuICAgICAgNSwgLyogMSAtMSAqL1xuICAgICAgMSwgLyogMSAwICovXG4gICAgICAzICAvKiAxIDEgKi9cbiAgICBdO1xuXG4gICAgdmFyIGpzZiA9IGdldEpTRihjb2VmZnNbYV0sIGNvZWZmc1tiXSk7XG4gICAgbWF4ID0gTWF0aC5tYXgoanNmWzBdLmxlbmd0aCwgbWF4KTtcbiAgICBuYWZbYV0gPSBuZXcgQXJyYXkobWF4KTtcbiAgICBuYWZbYl0gPSBuZXcgQXJyYXkobWF4KTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1heDsgaisrKSB7XG4gICAgICB2YXIgamEgPSBqc2ZbMF1bal0gfCAwO1xuICAgICAgdmFyIGpiID0ganNmWzFdW2pdIHwgMDtcblxuICAgICAgbmFmW2FdW2pdID0gaW5kZXhbKGphICsgMSkgKiAzICsgKGpiICsgMSldO1xuICAgICAgbmFmW2JdW2pdID0gMDtcbiAgICAgIHduZFthXSA9IGNvbWI7XG4gICAgfVxuICB9XG5cbiAgdmFyIGFjYyA9IHRoaXMuanBvaW50KG51bGwsIG51bGwsIG51bGwpO1xuICB2YXIgdG1wID0gdGhpcy5fd25hZlQ0O1xuICBmb3IgKHZhciBpID0gbWF4OyBpID49IDA7IGktLSkge1xuICAgIHZhciBrID0gMDtcblxuICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgIHZhciB6ZXJvID0gdHJ1ZTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgdG1wW2pdID0gbmFmW2pdW2ldIHwgMDtcbiAgICAgICAgaWYgKHRtcFtqXSAhPT0gMClcbiAgICAgICAgICB6ZXJvID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIXplcm8pXG4gICAgICAgIGJyZWFrO1xuICAgICAgaysrO1xuICAgICAgaS0tO1xuICAgIH1cbiAgICBpZiAoaSA+PSAwKVxuICAgICAgaysrO1xuICAgIGFjYyA9IGFjYy5kYmxwKGspO1xuICAgIGlmIChpIDwgMClcbiAgICAgIGJyZWFrO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW47IGorKykge1xuICAgICAgdmFyIHogPSB0bXBbal07XG4gICAgICB2YXIgcDtcbiAgICAgIGlmICh6ID09PSAwKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGVsc2UgaWYgKHogPiAwKVxuICAgICAgICBwID0gd25kW2pdWyh6IC0gMSkgPj4gMV07XG4gICAgICBlbHNlIGlmICh6IDwgMClcbiAgICAgICAgcCA9IHduZFtqXVsoLXogLSAxKSA+PiAxXS5uZWcoKTtcblxuICAgICAgaWYgKHAudHlwZSA9PT0gJ2FmZmluZScpXG4gICAgICAgIGFjYyA9IGFjYy5taXhlZEFkZChwKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYWNjID0gYWNjLmFkZChwKTtcbiAgICB9XG4gIH1cbiAgLy8gWmVyb2lmeSByZWZlcmVuY2VzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgd25kW2ldID0gbnVsbDtcblxuICBpZiAoamFjb2JpYW5SZXN1bHQpXG4gICAgcmV0dXJuIGFjYztcbiAgZWxzZVxuICAgIHJldHVybiBhY2MudG9QKCk7XG59O1xuXG5mdW5jdGlvbiBCYXNlUG9pbnQoY3VydmUsIHR5cGUpIHtcbiAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLnByZWNvbXB1dGVkID0gbnVsbDtcbn1cbkJhc2VDdXJ2ZS5CYXNlUG9pbnQgPSBCYXNlUG9pbnQ7XG5cbkJhc2VQb2ludC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSgvKm90aGVyKi8pIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cbkJhc2VQb2ludC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuY3VydmUudmFsaWRhdGUodGhpcyk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLmRlY29kZVBvaW50ID0gZnVuY3Rpb24gZGVjb2RlUG9pbnQoYnl0ZXMsIGVuYykge1xuICBieXRlcyA9IHV0aWxzLnRvQXJyYXkoYnl0ZXMsIGVuYyk7XG5cbiAgdmFyIGxlbiA9IHRoaXMucC5ieXRlTGVuZ3RoKCk7XG5cbiAgLy8gdW5jb21wcmVzc2VkLCBoeWJyaWQtb2RkLCBoeWJyaWQtZXZlblxuICBpZiAoKGJ5dGVzWzBdID09PSAweDA0IHx8IGJ5dGVzWzBdID09PSAweDA2IHx8IGJ5dGVzWzBdID09PSAweDA3KSAmJlxuICAgICAgYnl0ZXMubGVuZ3RoIC0gMSA9PT0gMiAqIGxlbikge1xuICAgIGlmIChieXRlc1swXSA9PT0gMHgwNilcbiAgICAgIGFzc2VydChieXRlc1tieXRlcy5sZW5ndGggLSAxXSAlIDIgPT09IDApO1xuICAgIGVsc2UgaWYgKGJ5dGVzWzBdID09PSAweDA3KVxuICAgICAgYXNzZXJ0KGJ5dGVzW2J5dGVzLmxlbmd0aCAtIDFdICUgMiA9PT0gMSk7XG5cbiAgICB2YXIgcmVzID0gIHRoaXMucG9pbnQoYnl0ZXMuc2xpY2UoMSwgMSArIGxlbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzLnNsaWNlKDEgKyBsZW4sIDEgKyAyICogbGVuKSk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2UgaWYgKChieXRlc1swXSA9PT0gMHgwMiB8fCBieXRlc1swXSA9PT0gMHgwMykgJiZcbiAgICAgICAgICAgICAgYnl0ZXMubGVuZ3RoIC0gMSA9PT0gbGVuKSB7XG4gICAgcmV0dXJuIHRoaXMucG9pbnRGcm9tWChieXRlcy5zbGljZSgxLCAxICsgbGVuKSwgYnl0ZXNbMF0gPT09IDB4MDMpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignVW5rbm93biBwb2ludCBmb3JtYXQnKTtcbn07XG5cbkJhc2VQb2ludC5wcm90b3R5cGUuZW5jb2RlQ29tcHJlc3NlZCA9IGZ1bmN0aW9uIGVuY29kZUNvbXByZXNzZWQoZW5jKSB7XG4gIHJldHVybiB0aGlzLmVuY29kZShlbmMsIHRydWUpO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5fZW5jb2RlID0gZnVuY3Rpb24gX2VuY29kZShjb21wYWN0KSB7XG4gIHZhciBsZW4gPSB0aGlzLmN1cnZlLnAuYnl0ZUxlbmd0aCgpO1xuICB2YXIgeCA9IHRoaXMuZ2V0WCgpLnRvQXJyYXkoJ2JlJywgbGVuKTtcblxuICBpZiAoY29tcGFjdClcbiAgICByZXR1cm4gWyB0aGlzLmdldFkoKS5pc0V2ZW4oKSA/IDB4MDIgOiAweDAzIF0uY29uY2F0KHgpO1xuXG4gIHJldHVybiBbIDB4MDQgXS5jb25jYXQoeCwgdGhpcy5nZXRZKCkudG9BcnJheSgnYmUnLCBsZW4pKSA7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShlbmMsIGNvbXBhY3QpIHtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZSh0aGlzLl9lbmNvZGUoY29tcGFjdCksIGVuYyk7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLnByZWNvbXB1dGUgPSBmdW5jdGlvbiBwcmVjb21wdXRlKHBvd2VyKSB7XG4gIGlmICh0aGlzLnByZWNvbXB1dGVkKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIHZhciBwcmVjb21wdXRlZCA9IHtcbiAgICBkb3VibGVzOiBudWxsLFxuICAgIG5hZjogbnVsbCxcbiAgICBiZXRhOiBudWxsXG4gIH07XG4gIHByZWNvbXB1dGVkLm5hZiA9IHRoaXMuX2dldE5BRlBvaW50cyg4KTtcbiAgcHJlY29tcHV0ZWQuZG91YmxlcyA9IHRoaXMuX2dldERvdWJsZXMoNCwgcG93ZXIpO1xuICBwcmVjb21wdXRlZC5iZXRhID0gdGhpcy5fZ2V0QmV0YSgpO1xuICB0aGlzLnByZWNvbXB1dGVkID0gcHJlY29tcHV0ZWQ7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9oYXNEb3VibGVzID0gZnVuY3Rpb24gX2hhc0RvdWJsZXMoaykge1xuICBpZiAoIXRoaXMucHJlY29tcHV0ZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBkb3VibGVzID0gdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzO1xuICBpZiAoIWRvdWJsZXMpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBkb3VibGVzLnBvaW50cy5sZW5ndGggPj0gTWF0aC5jZWlsKChrLmJpdExlbmd0aCgpICsgMSkgLyBkb3VibGVzLnN0ZXApO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5fZ2V0RG91YmxlcyA9IGZ1bmN0aW9uIF9nZXREb3VibGVzKHN0ZXAsIHBvd2VyKSB7XG4gIGlmICh0aGlzLnByZWNvbXB1dGVkICYmIHRoaXMucHJlY29tcHV0ZWQuZG91YmxlcylcbiAgICByZXR1cm4gdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzO1xuXG4gIHZhciBkb3VibGVzID0gWyB0aGlzIF07XG4gIHZhciBhY2MgPSB0aGlzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBvd2VyOyBpICs9IHN0ZXApIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0ZXA7IGorKylcbiAgICAgIGFjYyA9IGFjYy5kYmwoKTtcbiAgICBkb3VibGVzLnB1c2goYWNjKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHN0ZXA6IHN0ZXAsXG4gICAgcG9pbnRzOiBkb3VibGVzXG4gIH07XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9nZXROQUZQb2ludHMgPSBmdW5jdGlvbiBfZ2V0TkFGUG9pbnRzKHduZCkge1xuICBpZiAodGhpcy5wcmVjb21wdXRlZCAmJiB0aGlzLnByZWNvbXB1dGVkLm5hZilcbiAgICByZXR1cm4gdGhpcy5wcmVjb21wdXRlZC5uYWY7XG5cbiAgdmFyIHJlcyA9IFsgdGhpcyBdO1xuICB2YXIgbWF4ID0gKDEgPDwgd25kKSAtIDE7XG4gIHZhciBkYmwgPSBtYXggPT09IDEgPyBudWxsIDogdGhpcy5kYmwoKTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBtYXg7IGkrKylcbiAgICByZXNbaV0gPSByZXNbaSAtIDFdLmFkZChkYmwpO1xuICByZXR1cm4ge1xuICAgIHduZDogd25kLFxuICAgIHBvaW50czogcmVzXG4gIH07XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9nZXRCZXRhID0gZnVuY3Rpb24gX2dldEJldGEoKSB7XG4gIHJldHVybiBudWxsO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5kYmxwID0gZnVuY3Rpb24gZGJscChrKSB7XG4gIHZhciByID0gdGhpcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrOyBpKyspXG4gICAgciA9IHIuZGJsKCk7XG4gIHJldHVybiByO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gZXhwb3J0cztcbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgbWluQXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xudmFyIG1pblV0aWxzID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWNyeXB0by11dGlscycpO1xuXG51dGlscy5hc3NlcnQgPSBtaW5Bc3NlcnQ7XG51dGlscy50b0FycmF5ID0gbWluVXRpbHMudG9BcnJheTtcbnV0aWxzLnplcm8yID0gbWluVXRpbHMuemVybzI7XG51dGlscy50b0hleCA9IG1pblV0aWxzLnRvSGV4O1xudXRpbHMuZW5jb2RlID0gbWluVXRpbHMuZW5jb2RlO1xuXG4vLyBSZXByZXNlbnQgbnVtIGluIGEgdy1OQUYgZm9ybVxuZnVuY3Rpb24gZ2V0TkFGKG51bSwgdykge1xuICB2YXIgbmFmID0gW107XG4gIHZhciB3cyA9IDEgPDwgKHcgKyAxKTtcbiAgdmFyIGsgPSBudW0uY2xvbmUoKTtcbiAgd2hpbGUgKGsuY21wbigxKSA+PSAwKSB7XG4gICAgdmFyIHo7XG4gICAgaWYgKGsuaXNPZGQoKSkge1xuICAgICAgdmFyIG1vZCA9IGsuYW5kbG4od3MgLSAxKTtcbiAgICAgIGlmIChtb2QgPiAod3MgPj4gMSkgLSAxKVxuICAgICAgICB6ID0gKHdzID4+IDEpIC0gbW9kO1xuICAgICAgZWxzZVxuICAgICAgICB6ID0gbW9kO1xuICAgICAgay5pc3Vibih6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IDA7XG4gICAgfVxuICAgIG5hZi5wdXNoKHopO1xuXG4gICAgLy8gT3B0aW1pemF0aW9uLCBzaGlmdCBieSB3b3JkIGlmIHBvc3NpYmxlXG4gICAgdmFyIHNoaWZ0ID0gKGsuY21wbigwKSAhPT0gMCAmJiBrLmFuZGxuKHdzIC0gMSkgPT09IDApID8gKHcgKyAxKSA6IDE7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzaGlmdDsgaSsrKVxuICAgICAgbmFmLnB1c2goMCk7XG4gICAgay5pdXNocm4oc2hpZnQpO1xuICB9XG5cbiAgcmV0dXJuIG5hZjtcbn1cbnV0aWxzLmdldE5BRiA9IGdldE5BRjtcblxuLy8gUmVwcmVzZW50IGsxLCBrMiBpbiBhIEpvaW50IFNwYXJzZSBGb3JtXG5mdW5jdGlvbiBnZXRKU0YoazEsIGsyKSB7XG4gIHZhciBqc2YgPSBbXG4gICAgW10sXG4gICAgW11cbiAgXTtcblxuICBrMSA9IGsxLmNsb25lKCk7XG4gIGsyID0gazIuY2xvbmUoKTtcbiAgdmFyIGQxID0gMDtcbiAgdmFyIGQyID0gMDtcbiAgd2hpbGUgKGsxLmNtcG4oLWQxKSA+IDAgfHwgazIuY21wbigtZDIpID4gMCkge1xuXG4gICAgLy8gRmlyc3QgcGhhc2VcbiAgICB2YXIgbTE0ID0gKGsxLmFuZGxuKDMpICsgZDEpICYgMztcbiAgICB2YXIgbTI0ID0gKGsyLmFuZGxuKDMpICsgZDIpICYgMztcbiAgICBpZiAobTE0ID09PSAzKVxuICAgICAgbTE0ID0gLTE7XG4gICAgaWYgKG0yNCA9PT0gMylcbiAgICAgIG0yNCA9IC0xO1xuICAgIHZhciB1MTtcbiAgICBpZiAoKG0xNCAmIDEpID09PSAwKSB7XG4gICAgICB1MSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtOCA9IChrMS5hbmRsbig3KSArIGQxKSAmIDc7XG4gICAgICBpZiAoKG04ID09PSAzIHx8IG04ID09PSA1KSAmJiBtMjQgPT09IDIpXG4gICAgICAgIHUxID0gLW0xNDtcbiAgICAgIGVsc2VcbiAgICAgICAgdTEgPSBtMTQ7XG4gICAgfVxuICAgIGpzZlswXS5wdXNoKHUxKTtcblxuICAgIHZhciB1MjtcbiAgICBpZiAoKG0yNCAmIDEpID09PSAwKSB7XG4gICAgICB1MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtOCA9IChrMi5hbmRsbig3KSArIGQyKSAmIDc7XG4gICAgICBpZiAoKG04ID09PSAzIHx8IG04ID09PSA1KSAmJiBtMTQgPT09IDIpXG4gICAgICAgIHUyID0gLW0yNDtcbiAgICAgIGVsc2VcbiAgICAgICAgdTIgPSBtMjQ7XG4gICAgfVxuICAgIGpzZlsxXS5wdXNoKHUyKTtcblxuICAgIC8vIFNlY29uZCBwaGFzZVxuICAgIGlmICgyICogZDEgPT09IHUxICsgMSlcbiAgICAgIGQxID0gMSAtIGQxO1xuICAgIGlmICgyICogZDIgPT09IHUyICsgMSlcbiAgICAgIGQyID0gMSAtIGQyO1xuICAgIGsxLml1c2hybigxKTtcbiAgICBrMi5pdXNocm4oMSk7XG4gIH1cblxuICByZXR1cm4ganNmO1xufVxudXRpbHMuZ2V0SlNGID0gZ2V0SlNGO1xuXG5mdW5jdGlvbiBjYWNoZWRQcm9wZXJ0eShvYmosIG5hbWUsIGNvbXB1dGVyKSB7XG4gIHZhciBrZXkgPSAnXycgKyBuYW1lO1xuICBvYmoucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gY2FjaGVkUHJvcGVydHkoKSB7XG4gICAgcmV0dXJuIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkID8gdGhpc1trZXldIDpcbiAgICAgICAgICAgdGhpc1trZXldID0gY29tcHV0ZXIuY2FsbCh0aGlzKTtcbiAgfTtcbn1cbnV0aWxzLmNhY2hlZFByb3BlcnR5ID0gY2FjaGVkUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHBhcnNlQnl0ZXMoYnl0ZXMpIHtcbiAgcmV0dXJuIHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycgPyB1dGlscy50b0FycmF5KGJ5dGVzLCAnaGV4JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzO1xufVxudXRpbHMucGFyc2VCeXRlcyA9IHBhcnNlQnl0ZXM7XG5cbmZ1bmN0aW9uIGludEZyb21MRShieXRlcykge1xuICByZXR1cm4gbmV3IEJOKGJ5dGVzLCAnaGV4JywgJ2xlJyk7XG59XG51dGlscy5pbnRGcm9tTEUgPSBpbnRGcm9tTEU7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGN1cnZlcyA9IGV4cG9ydHM7XG5cbnZhciBoYXNoID0gcmVxdWlyZSgnaGFzaC5qcycpO1xudmFyIGN1cnZlID0gcmVxdWlyZSgnLi9jdXJ2ZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBQcmVzZXRDdXJ2ZShvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLnR5cGUgPT09ICdzaG9ydCcpXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5zaG9ydChvcHRpb25zKTtcbiAgZWxzZSBpZiAob3B0aW9ucy50eXBlID09PSAnZWR3YXJkcycpXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5lZHdhcmRzKG9wdGlvbnMpO1xuICBlbHNlXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5tb250KG9wdGlvbnMpO1xuICB0aGlzLmcgPSB0aGlzLmN1cnZlLmc7XG4gIHRoaXMubiA9IHRoaXMuY3VydmUubjtcbiAgdGhpcy5oYXNoID0gb3B0aW9ucy5oYXNoO1xuXG4gIGFzc2VydCh0aGlzLmcudmFsaWRhdGUoKSwgJ0ludmFsaWQgY3VydmUnKTtcbiAgYXNzZXJ0KHRoaXMuZy5tdWwodGhpcy5uKS5pc0luZmluaXR5KCksICdJbnZhbGlkIGN1cnZlLCBHKk4gIT0gTycpO1xufVxuY3VydmVzLlByZXNldEN1cnZlID0gUHJlc2V0Q3VydmU7XG5cbmZ1bmN0aW9uIGRlZmluZUN1cnZlKG5hbWUsIG9wdGlvbnMpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1cnZlcywgbmFtZSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3VydmUgPSBuZXcgUHJlc2V0Q3VydmUob3B0aW9ucyk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VydmVzLCBuYW1lLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGN1cnZlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjdXJ2ZTtcbiAgICB9XG4gIH0pO1xufVxuXG5kZWZpbmVDdXJ2ZSgncDE5MicsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6ICdwMTkyJyxcbiAgcDogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZmJyxcbiAgYTogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZjJyxcbiAgYjogJzY0MjEwNTE5IGU1OWM4MGU3IDBmYTdlOWFiIDcyMjQzMDQ5IGZlYjhkZWVjIGMxNDZiOWIxJyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIDk5ZGVmODM2IDE0NmJjOWIxIGI0ZDIyODMxJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJzE4OGRhODBlIGIwMzA5MGY2IDdjYmYyMGViIDQzYTE4ODAwIGY0ZmYwYWZkIDgyZmYxMDEyJyxcbiAgICAnMDcxOTJiOTUgZmZjOGRhNzggNjMxMDExZWQgNmIyNGNkZDUgNzNmOTc3YTEgMWU3OTQ4MTEnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDIyNCcsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6ICdwMjI0JyxcbiAgcDogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIDAwMDAwMDAwIDAwMDAwMDAwIDAwMDAwMDAxJyxcbiAgYTogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlJyxcbiAgYjogJ2I0MDUwYTg1IDBjMDRiM2FiIGY1NDEzMjU2IDUwNDRiMGI3IGQ3YmZkOGJhIDI3MGIzOTQzIDIzNTVmZmI0JyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmYxNmEyIGUwYjhmMDNlIDEzZGQyOTQ1IDVjNWMyYTNkJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJ2I3MGUwY2JkIDZiYjRiZjdmIDMyMTM5MGI5IDRhMDNjMWQzIDU2YzIxMTIyIDM0MzI4MGQ2IDExNWMxZDIxJyxcbiAgICAnYmQzNzYzODggYjVmNzIzZmIgNGMyMmRmZTYgY2Q0Mzc1YTAgNWEwNzQ3NjQgNDRkNTgxOTkgODUwMDdlMzQnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDI1NicsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6IG51bGwsXG4gIHA6ICdmZmZmZmZmZiAwMDAwMDAwMSAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZicsXG4gIGE6ICdmZmZmZmZmZiAwMDAwMDAwMSAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmYycsXG4gIGI6ICc1YWM2MzVkOCBhYTNhOTNlNyBiM2ViYmQ1NSA3Njk4ODZiYyA2NTFkMDZiMCBjYzUzYjBmNiAzYmNlM2MzZSAyN2QyNjA0YicsXG4gIG46ICdmZmZmZmZmZiAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBiY2U2ZmFhZCBhNzE3OWU4NCBmM2I5Y2FjMiBmYzYzMjU1MScsXG4gIGhhc2g6IGhhc2guc2hhMjU2LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc2YjE3ZDFmMiBlMTJjNDI0NyBmOGJjZTZlNSA2M2E0NDBmMiA3NzAzN2Q4MSAyZGViMzNhMCBmNGExMzk0NSBkODk4YzI5NicsXG4gICAgJzRmZTM0MmUyIGZlMWE3ZjliIDhlZTdlYjRhIDdjMGY5ZTE2IDJiY2UzMzU3IDZiMzE1ZWNlIGNiYjY0MDY4IDM3YmY1MWY1J1xuICBdXG59KTtcblxuZGVmaW5lQ3VydmUoJ3AzODQnLCB7XG4gIHR5cGU6ICdzaG9ydCcsXG4gIHByaW1lOiBudWxsLFxuICBwOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgJyArXG4gICAgICdmZmZmZmZmZSBmZmZmZmZmZiAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZicsXG4gIGE6ICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZlIGZmZmZmZmZmIDAwMDAwMDAwIDAwMDAwMDAwIGZmZmZmZmZjJyxcbiAgYjogJ2IzMzEyZmE3IGUyM2VlN2U0IDk4OGUwNTZiIGUzZjgyZDE5IDE4MWQ5YzZlIGZlODE0MTEyIDAzMTQwODhmICcgK1xuICAgICAnNTAxMzg3NWEgYzY1NjM5OGQgOGEyZWQxOWQgMmE4NWM4ZWQgZDNlYzJhZWYnLFxuICBuOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgYzc2MzRkODEgJyArXG4gICAgICdmNDM3MmRkZiA1ODFhMGRiMiA0OGIwYTc3YSBlY2VjMTk2YSBjY2M1Mjk3MycsXG4gIGhhc2g6IGhhc2guc2hhMzg0LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICdhYTg3Y2EyMiBiZThiMDUzNyA4ZWIxYzcxZSBmMzIwYWQ3NCA2ZTFkM2I2MiA4YmE3OWI5OCA1OWY3NDFlMCA4MjU0MmEzOCAnICtcbiAgICAnNTUwMmYyNWQgYmY1NTI5NmMgM2E1NDVlMzggNzI3NjBhYjcnLFxuICAgICczNjE3ZGU0YSA5NjI2MmM2ZiA1ZDllOThiZiA5MjkyZGMyOSBmOGY0MWRiZCAyODlhMTQ3YyBlOWRhMzExMyBiNWYwYjhjMCAnICtcbiAgICAnMGE2MGIxY2UgMWQ3ZTgxOWQgN2E0MzFkN2MgOTBlYTBlNWYnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDUyMScsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6IG51bGwsXG4gIHA6ICcwMDAwMDFmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmICcgK1xuICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYnLFxuICBhOiAnMDAwMDAxZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgJyArXG4gICAgICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZjJyxcbiAgYjogJzAwMDAwMDUxIDk1M2ViOTYxIDhlMWM5YTFmIDkyOWEyMWEwIGI2ODU0MGVlIGEyZGE3MjViICcgK1xuICAgICAnOTliMzE1ZjMgYjhiNDg5OTEgOGVmMTA5ZTEgNTYxOTM5NTEgZWM3ZTkzN2IgMTY1MmMwYmQgJyArXG4gICAgICczYmIxYmYwNyAzNTczZGY4OCAzZDJjMzRmMSBlZjQ1MWZkNCA2YjUwM2YwMCcsXG4gIG46ICcwMDAwMDFmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZhIDUxODY4NzgzIGJmMmY5NjZiIDdmY2MwMTQ4ICcgK1xuICAgICAnZjcwOWE1ZDAgM2JiNWM5YjggODk5YzQ3YWUgYmI2ZmI3MWUgOTEzODY0MDknLFxuICBoYXNoOiBoYXNoLnNoYTUxMixcbiAgZ1JlZDogZmFsc2UsXG4gIGc6IFtcbiAgICAnMDAwMDAwYzYgODU4ZTA2YjcgMDQwNGU5Y2QgOWUzZWNiNjYgMjM5NWI0NDIgOWM2NDgxMzkgJyArXG4gICAgJzA1M2ZiNTIxIGY4MjhhZjYwIDZiNGQzZGJhIGExNGI1ZTc3IGVmZTc1OTI4IGZlMWRjMTI3ICcgK1xuICAgICdhMmZmYThkZSAzMzQ4YjNjMSA4NTZhNDI5YiBmOTdlN2UzMSBjMmU1YmQ2NicsXG4gICAgJzAwMDAwMTE4IDM5Mjk2YTc4IDlhM2JjMDA0IDVjOGE1ZmI0IDJjN2QxYmQ5IDk4ZjU0NDQ5ICcgK1xuICAgICc1NzliNDQ2OCAxN2FmYmQxNyAyNzNlNjYyYyA5N2VlNzI5OSA1ZWY0MjY0MCBjNTUwYjkwMSAnICtcbiAgICAnM2ZhZDA3NjEgMzUzYzcwODYgYTI3MmMyNDAgODhiZTk0NzYgOWZkMTY2NTAnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgnY3VydmUyNTUxOScsIHtcbiAgdHlwZTogJ21vbnQnLFxuICBwcmltZTogJ3AyNTUxOScsXG4gIHA6ICc3ZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmVkJyxcbiAgYTogJzc2ZDA2JyxcbiAgYjogJzEnLFxuICBuOiAnMTAwMDAwMDAwMDAwMDAwMCAwMDAwMDAwMDAwMDAwMDAwIDE0ZGVmOWRlYTJmNzljZDYgNTgxMjYzMWE1Y2Y1ZDNlZCcsXG4gIGhhc2g6IGhhc2guc2hhMjU2LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc5J1xuICBdXG59KTtcblxuZGVmaW5lQ3VydmUoJ2VkMjU1MTknLCB7XG4gIHR5cGU6ICdlZHdhcmRzJyxcbiAgcHJpbWU6ICdwMjU1MTknLFxuICBwOiAnN2ZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZlZCcsXG4gIGE6ICctMScsXG4gIGM6ICcxJyxcbiAgLy8gLTEyMTY2NSAqICgxMjE2NjZeKC0xKSkgKG1vZCBQKVxuICBkOiAnNTIwMzZjZWUyYjZmZmU3MyA4Y2M3NDA3OTc3NzllODk4IDAwNzAwYTRkNDE0MWQ4YWIgNzVlYjRkY2ExMzU5NzhhMycsXG4gIG46ICcxMDAwMDAwMDAwMDAwMDAwIDAwMDAwMDAwMDAwMDAwMDAgMTRkZWY5ZGVhMmY3OWNkNiA1ODEyNjMxYTVjZjVkM2VkJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJzIxNjkzNmQzY2Q2ZTUzZmVjMGE0ZTIzMWZkZDZkYzVjNjkyY2M3NjA5NTI1YTdiMmM5NTYyZDYwOGYyNWQ1MWEnLFxuXG4gICAgLy8gNC81XG4gICAgJzY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NTgnXG4gIF1cbn0pO1xuXG52YXIgcHJlO1xudHJ5IHtcbiAgcHJlID0gcmVxdWlyZSgnLi9wcmVjb21wdXRlZC9zZWNwMjU2azEnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgcHJlID0gdW5kZWZpbmVkO1xufVxuXG5kZWZpbmVDdXJ2ZSgnc2VjcDI1NmsxJywge1xuICB0eXBlOiAnc2hvcnQnLFxuICBwcmltZTogJ2syNTYnLFxuICBwOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmUgZmZmZmZjMmYnLFxuICBhOiAnMCcsXG4gIGI6ICc3JyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGJhYWVkY2U2IGFmNDhhMDNiIGJmZDI1ZThjIGQwMzY0MTQxJyxcbiAgaDogJzEnLFxuICBoYXNoOiBoYXNoLnNoYTI1NixcblxuICAvLyBQcmVjb21wdXRlZCBlbmRvbW9ycGhpc21cbiAgYmV0YTogJzdhZTk2YTJiNjU3YzA3MTA2ZTY0NDc5ZWFjMzQzNGU5OWNmMDQ5NzUxMmY1ODk5NWMxMzk2YzI4NzE5NTAxZWUnLFxuICBsYW1iZGE6ICc1MzYzYWQ0Y2MwNWMzMGUwYTUyNjFjMDI4ODEyNjQ1YTEyMmUyMmVhMjA4MTY2NzhkZjAyOTY3YzFiMjNiZDcyJyxcbiAgYmFzaXM6IFtcbiAgICB7XG4gICAgICBhOiAnMzA4NmQyMjFhN2Q0NmJjZGU4NmM5MGU0OTI4NGViMTUnLFxuICAgICAgYjogJy1lNDQzN2VkNjAxMGU4ODI4NmY1NDdmYTkwYWJmZTRjMydcbiAgICB9LFxuICAgIHtcbiAgICAgIGE6ICcxMTRjYTUwZjdhOGUyZjNmNjU3YzExMDhkOWQ0NGNmZDgnLFxuICAgICAgYjogJzMwODZkMjIxYTdkNDZiY2RlODZjOTBlNDkyODRlYjE1J1xuICAgIH1cbiAgXSxcblxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc3OWJlNjY3ZWY5ZGNiYmFjNTVhMDYyOTVjZTg3MGIwNzAyOWJmY2RiMmRjZTI4ZDk1OWYyODE1YjE2ZjgxNzk4JyxcbiAgICAnNDgzYWRhNzcyNmEzYzQ2NTVkYTRmYmZjMGUxMTA4YThmZDE3YjQ0OGE2ODU1NDE5OWM0N2QwOGZmYjEwZDRiOCcsXG4gICAgcHJlXG4gIF1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG52YXIgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuXG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBTaG9ydEN1cnZlKGNvbmYpIHtcbiAgQmFzZS5jYWxsKHRoaXMsICdzaG9ydCcsIGNvbmYpO1xuXG4gIHRoaXMuYSA9IG5ldyBCTihjb25mLmEsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYiA9IG5ldyBCTihjb25mLmIsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMudGludiA9IHRoaXMudHdvLnJlZEludm0oKTtcblxuICB0aGlzLnplcm9BID0gdGhpcy5hLmZyb21SZWQoKS5jbXBuKDApID09PSAwO1xuICB0aGlzLnRocmVlQSA9IHRoaXMuYS5mcm9tUmVkKCkuc3ViKHRoaXMucCkuY21wbigtMykgPT09IDA7XG5cbiAgLy8gSWYgdGhlIGN1cnZlIGlzIGVuZG9tb3JwaGljLCBwcmVjYWxjdWxhdGUgYmV0YSBhbmQgbGFtYmRhXG4gIHRoaXMuZW5kbyA9IHRoaXMuX2dldEVuZG9tb3JwaGlzbShjb25mKTtcbiAgdGhpcy5fZW5kb1duYWZUMSA9IG5ldyBBcnJheSg0KTtcbiAgdGhpcy5fZW5kb1duYWZUMiA9IG5ldyBBcnJheSg0KTtcbn1cbmluaGVyaXRzKFNob3J0Q3VydmUsIEJhc2UpO1xubW9kdWxlLmV4cG9ydHMgPSBTaG9ydEN1cnZlO1xuXG5TaG9ydEN1cnZlLnByb3RvdHlwZS5fZ2V0RW5kb21vcnBoaXNtID0gZnVuY3Rpb24gX2dldEVuZG9tb3JwaGlzbShjb25mKSB7XG4gIC8vIE5vIGVmZmljaWVudCBlbmRvbW9ycGhpc21cbiAgaWYgKCF0aGlzLnplcm9BIHx8ICF0aGlzLmcgfHwgIXRoaXMubiB8fCB0aGlzLnAubW9kbigzKSAhPT0gMSlcbiAgICByZXR1cm47XG5cbiAgLy8gQ29tcHV0ZSBiZXRhIGFuZCBsYW1iZGEsIHRoYXQgbGFtYmRhICogUCA9IChiZXRhICogUHg7IFB5KVxuICB2YXIgYmV0YTtcbiAgdmFyIGxhbWJkYTtcbiAgaWYgKGNvbmYuYmV0YSkge1xuICAgIGJldGEgPSBuZXcgQk4oY29uZi5iZXRhLCAxNikudG9SZWQodGhpcy5yZWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBiZXRhcyA9IHRoaXMuX2dldEVuZG9Sb290cyh0aGlzLnApO1xuICAgIC8vIENob29zZSB0aGUgc21hbGxlc3QgYmV0YVxuICAgIGJldGEgPSBiZXRhc1swXS5jbXAoYmV0YXNbMV0pIDwgMCA/IGJldGFzWzBdIDogYmV0YXNbMV07XG4gICAgYmV0YSA9IGJldGEudG9SZWQodGhpcy5yZWQpO1xuICB9XG4gIGlmIChjb25mLmxhbWJkYSkge1xuICAgIGxhbWJkYSA9IG5ldyBCTihjb25mLmxhbWJkYSwgMTYpO1xuICB9IGVsc2Uge1xuICAgIC8vIENob29zZSB0aGUgbGFtYmRhIHRoYXQgaXMgbWF0Y2hpbmcgc2VsZWN0ZWQgYmV0YVxuICAgIHZhciBsYW1iZGFzID0gdGhpcy5fZ2V0RW5kb1Jvb3RzKHRoaXMubik7XG4gICAgaWYgKHRoaXMuZy5tdWwobGFtYmRhc1swXSkueC5jbXAodGhpcy5nLngucmVkTXVsKGJldGEpKSA9PT0gMCkge1xuICAgICAgbGFtYmRhID0gbGFtYmRhc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFtYmRhID0gbGFtYmRhc1sxXTtcbiAgICAgIGFzc2VydCh0aGlzLmcubXVsKGxhbWJkYSkueC5jbXAodGhpcy5nLngucmVkTXVsKGJldGEpKSA9PT0gMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IGJhc2lzIHZlY3RvcnMsIHVzZWQgZm9yIGJhbGFuY2VkIGxlbmd0aC10d28gcmVwcmVzZW50YXRpb25cbiAgdmFyIGJhc2lzO1xuICBpZiAoY29uZi5iYXNpcykge1xuICAgIGJhc2lzID0gY29uZi5iYXNpcy5tYXAoZnVuY3Rpb24odmVjKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhOiBuZXcgQk4odmVjLmEsIDE2KSxcbiAgICAgICAgYjogbmV3IEJOKHZlYy5iLCAxNilcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYmFzaXMgPSB0aGlzLl9nZXRFbmRvQmFzaXMobGFtYmRhKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmV0YTogYmV0YSxcbiAgICBsYW1iZGE6IGxhbWJkYSxcbiAgICBiYXNpczogYmFzaXNcbiAgfTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9nZXRFbmRvUm9vdHMgPSBmdW5jdGlvbiBfZ2V0RW5kb1Jvb3RzKG51bSkge1xuICAvLyBGaW5kIHJvb3RzIG9mIGZvciB4XjIgKyB4ICsgMSBpbiBGXG4gIC8vIFJvb3QgPSAoLTEgKy0gU3FydCgtMykpIC8gMlxuICAvL1xuICB2YXIgcmVkID0gbnVtID09PSB0aGlzLnAgPyB0aGlzLnJlZCA6IEJOLm1vbnQobnVtKTtcbiAgdmFyIHRpbnYgPSBuZXcgQk4oMikudG9SZWQocmVkKS5yZWRJbnZtKCk7XG4gIHZhciBudGludiA9IHRpbnYucmVkTmVnKCk7XG5cbiAgdmFyIHMgPSBuZXcgQk4oMykudG9SZWQocmVkKS5yZWROZWcoKS5yZWRTcXJ0KCkucmVkTXVsKHRpbnYpO1xuXG4gIHZhciBsMSA9IG50aW52LnJlZEFkZChzKS5mcm9tUmVkKCk7XG4gIHZhciBsMiA9IG50aW52LnJlZFN1YihzKS5mcm9tUmVkKCk7XG4gIHJldHVybiBbIGwxLCBsMiBdO1xufTtcblxuU2hvcnRDdXJ2ZS5wcm90b3R5cGUuX2dldEVuZG9CYXNpcyA9IGZ1bmN0aW9uIF9nZXRFbmRvQmFzaXMobGFtYmRhKSB7XG4gIC8vIGFwcnhTcXJ0ID49IHNxcnQodGhpcy5uKVxuICB2YXIgYXByeFNxcnQgPSB0aGlzLm4udXNocm4oTWF0aC5mbG9vcih0aGlzLm4uYml0TGVuZ3RoKCkgLyAyKSk7XG5cbiAgLy8gMy43NFxuICAvLyBSdW4gRUdDRCwgdW50aWwgcihMICsgMSkgPCBhcHJ4U3FydFxuICB2YXIgdSA9IGxhbWJkYTtcbiAgdmFyIHYgPSB0aGlzLm4uY2xvbmUoKTtcbiAgdmFyIHgxID0gbmV3IEJOKDEpO1xuICB2YXIgeTEgPSBuZXcgQk4oMCk7XG4gIHZhciB4MiA9IG5ldyBCTigwKTtcbiAgdmFyIHkyID0gbmV3IEJOKDEpO1xuXG4gIC8vIE5PVEU6IGFsbCB2ZWN0b3JzIGFyZSByb290cyBvZjogYSArIGIgKiBsYW1iZGEgPSAwIChtb2QgbilcbiAgdmFyIGEwO1xuICB2YXIgYjA7XG4gIC8vIEZpcnN0IHZlY3RvclxuICB2YXIgYTE7XG4gIHZhciBiMTtcbiAgLy8gU2Vjb25kIHZlY3RvclxuICB2YXIgYTI7XG4gIHZhciBiMjtcblxuICB2YXIgcHJldlI7XG4gIHZhciBpID0gMDtcbiAgdmFyIHI7XG4gIHZhciB4O1xuICB3aGlsZSAodS5jbXBuKDApICE9PSAwKSB7XG4gICAgdmFyIHEgPSB2LmRpdih1KTtcbiAgICByID0gdi5zdWIocS5tdWwodSkpO1xuICAgIHggPSB4Mi5zdWIocS5tdWwoeDEpKTtcbiAgICB2YXIgeSA9IHkyLnN1YihxLm11bCh5MSkpO1xuXG4gICAgaWYgKCFhMSAmJiByLmNtcChhcHJ4U3FydCkgPCAwKSB7XG4gICAgICBhMCA9IHByZXZSLm5lZygpO1xuICAgICAgYjAgPSB4MTtcbiAgICAgIGExID0gci5uZWcoKTtcbiAgICAgIGIxID0geDtcbiAgICB9IGVsc2UgaWYgKGExICYmICsraSA9PT0gMikge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHByZXZSID0gcjtcblxuICAgIHYgPSB1O1xuICAgIHUgPSByO1xuICAgIHgyID0geDE7XG4gICAgeDEgPSB4O1xuICAgIHkyID0geTE7XG4gICAgeTEgPSB5O1xuICB9XG4gIGEyID0gci5uZWcoKTtcbiAgYjIgPSB4O1xuXG4gIHZhciBsZW4xID0gYTEuc3FyKCkuYWRkKGIxLnNxcigpKTtcbiAgdmFyIGxlbjIgPSBhMi5zcXIoKS5hZGQoYjIuc3FyKCkpO1xuICBpZiAobGVuMi5jbXAobGVuMSkgPj0gMCkge1xuICAgIGEyID0gYTA7XG4gICAgYjIgPSBiMDtcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBzaWduc1xuICBpZiAoYTEubmVnYXRpdmUpIHtcbiAgICBhMSA9IGExLm5lZygpO1xuICAgIGIxID0gYjEubmVnKCk7XG4gIH1cbiAgaWYgKGEyLm5lZ2F0aXZlKSB7XG4gICAgYTIgPSBhMi5uZWcoKTtcbiAgICBiMiA9IGIyLm5lZygpO1xuICB9XG5cbiAgcmV0dXJuIFtcbiAgICB7IGE6IGExLCBiOiBiMSB9LFxuICAgIHsgYTogYTIsIGI6IGIyIH1cbiAgXTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9lbmRvU3BsaXQgPSBmdW5jdGlvbiBfZW5kb1NwbGl0KGspIHtcbiAgdmFyIGJhc2lzID0gdGhpcy5lbmRvLmJhc2lzO1xuICB2YXIgdjEgPSBiYXNpc1swXTtcbiAgdmFyIHYyID0gYmFzaXNbMV07XG5cbiAgdmFyIGMxID0gdjIuYi5tdWwoaykuZGl2Um91bmQodGhpcy5uKTtcbiAgdmFyIGMyID0gdjEuYi5uZWcoKS5tdWwoaykuZGl2Um91bmQodGhpcy5uKTtcblxuICB2YXIgcDEgPSBjMS5tdWwodjEuYSk7XG4gIHZhciBwMiA9IGMyLm11bCh2Mi5hKTtcbiAgdmFyIHExID0gYzEubXVsKHYxLmIpO1xuICB2YXIgcTIgPSBjMi5tdWwodjIuYik7XG5cbiAgLy8gQ2FsY3VsYXRlIGFuc3dlclxuICB2YXIgazEgPSBrLnN1YihwMSkuc3ViKHAyKTtcbiAgdmFyIGsyID0gcTEuYWRkKHEyKS5uZWcoKTtcbiAgcmV0dXJuIHsgazE6IGsxLCBrMjogazIgfTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnBvaW50RnJvbVggPSBmdW5jdGlvbiBwb2ludEZyb21YKHgsIG9kZCkge1xuICB4ID0gbmV3IEJOKHgsIDE2KTtcbiAgaWYgKCF4LnJlZClcbiAgICB4ID0geC50b1JlZCh0aGlzLnJlZCk7XG5cbiAgdmFyIHkyID0geC5yZWRTcXIoKS5yZWRNdWwoeCkucmVkSUFkZCh4LnJlZE11bCh0aGlzLmEpKS5yZWRJQWRkKHRoaXMuYik7XG4gIHZhciB5ID0geTIucmVkU3FydCgpO1xuICBpZiAoeS5yZWRTcXIoKS5yZWRTdWIoeTIpLmNtcCh0aGlzLnplcm8pICE9PSAwKVxuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwb2ludCcpO1xuXG4gIC8vIFhYWCBJcyB0aGVyZSBhbnkgd2F5IHRvIHRlbGwgaWYgdGhlIG51bWJlciBpcyBvZGQgd2l0aG91dCBjb252ZXJ0aW5nIGl0XG4gIC8vIHRvIG5vbi1yZWQgZm9ybT9cbiAgdmFyIGlzT2RkID0geS5mcm9tUmVkKCkuaXNPZGQoKTtcbiAgaWYgKG9kZCAmJiAhaXNPZGQgfHwgIW9kZCAmJiBpc09kZClcbiAgICB5ID0geS5yZWROZWcoKTtcblxuICByZXR1cm4gdGhpcy5wb2ludCh4LCB5KTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUocG9pbnQpIHtcbiAgaWYgKHBvaW50LmluZilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB2YXIgeCA9IHBvaW50Lng7XG4gIHZhciB5ID0gcG9pbnQueTtcblxuICB2YXIgYXggPSB0aGlzLmEucmVkTXVsKHgpO1xuICB2YXIgcmhzID0geC5yZWRTcXIoKS5yZWRNdWwoeCkucmVkSUFkZChheCkucmVkSUFkZCh0aGlzLmIpO1xuICByZXR1cm4geS5yZWRTcXIoKS5yZWRJU3ViKHJocykuY21wbigwKSA9PT0gMDtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9lbmRvV25hZk11bEFkZCA9XG4gICAgZnVuY3Rpb24gX2VuZG9XbmFmTXVsQWRkKHBvaW50cywgY29lZmZzLCBqYWNvYmlhblJlc3VsdCkge1xuICB2YXIgbnBvaW50cyA9IHRoaXMuX2VuZG9XbmFmVDE7XG4gIHZhciBuY29lZmZzID0gdGhpcy5fZW5kb1duYWZUMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3BsaXQgPSB0aGlzLl9lbmRvU3BsaXQoY29lZmZzW2ldKTtcbiAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICB2YXIgYmV0YSA9IHAuX2dldEJldGEoKTtcblxuICAgIGlmIChzcGxpdC5rMS5uZWdhdGl2ZSkge1xuICAgICAgc3BsaXQuazEuaW5lZygpO1xuICAgICAgcCA9IHAubmVnKHRydWUpO1xuICAgIH1cbiAgICBpZiAoc3BsaXQuazIubmVnYXRpdmUpIHtcbiAgICAgIHNwbGl0LmsyLmluZWcoKTtcbiAgICAgIGJldGEgPSBiZXRhLm5lZyh0cnVlKTtcbiAgICB9XG5cbiAgICBucG9pbnRzW2kgKiAyXSA9IHA7XG4gICAgbnBvaW50c1tpICogMiArIDFdID0gYmV0YTtcbiAgICBuY29lZmZzW2kgKiAyXSA9IHNwbGl0LmsxO1xuICAgIG5jb2VmZnNbaSAqIDIgKyAxXSA9IHNwbGl0LmsyO1xuICB9XG4gIHZhciByZXMgPSB0aGlzLl93bmFmTXVsQWRkKDEsIG5wb2ludHMsIG5jb2VmZnMsIGkgKiAyLCBqYWNvYmlhblJlc3VsdCk7XG5cbiAgLy8gQ2xlYW4tdXAgcmVmZXJlbmNlcyB0byBwb2ludHMgYW5kIGNvZWZmaWNpZW50c1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGkgKiAyOyBqKyspIHtcbiAgICBucG9pbnRzW2pdID0gbnVsbDtcbiAgICBuY29lZmZzW2pdID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gUG9pbnQoY3VydmUsIHgsIHksIGlzUmVkKSB7XG4gIEJhc2UuQmFzZVBvaW50LmNhbGwodGhpcywgY3VydmUsICdhZmZpbmUnKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeSA9PT0gbnVsbCkge1xuICAgIHRoaXMueCA9IG51bGw7XG4gICAgdGhpcy55ID0gbnVsbDtcbiAgICB0aGlzLmluZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54ID0gbmV3IEJOKHgsIDE2KTtcbiAgICB0aGlzLnkgPSBuZXcgQk4oeSwgMTYpO1xuICAgIC8vIEZvcmNlIHJlZGdvbWVyeSByZXByZXNlbnRhdGlvbiB3aGVuIGxvYWRpbmcgZnJvbSBKU09OXG4gICAgaWYgKGlzUmVkKSB7XG4gICAgICB0aGlzLnguZm9yY2VSZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgICAgdGhpcy55LmZvcmNlUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLngucmVkKVxuICAgICAgdGhpcy54ID0gdGhpcy54LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICBpZiAoIXRoaXMueS5yZWQpXG4gICAgICB0aGlzLnkgPSB0aGlzLnkudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgIHRoaXMuaW5mID0gZmFsc2U7XG4gIH1cbn1cbmluaGVyaXRzKFBvaW50LCBCYXNlLkJhc2VQb2ludCk7XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnBvaW50ID0gZnVuY3Rpb24gcG9pbnQoeCwgeSwgaXNSZWQpIHtcbiAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLCB4LCB5LCBpc1JlZCk7XG59O1xuXG5TaG9ydEN1cnZlLnByb3RvdHlwZS5wb2ludEZyb21KU09OID0gZnVuY3Rpb24gcG9pbnRGcm9tSlNPTihvYmosIHJlZCkge1xuICByZXR1cm4gUG9pbnQuZnJvbUpTT04odGhpcywgb2JqLCByZWQpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLl9nZXRCZXRhID0gZnVuY3Rpb24gX2dldEJldGEoKSB7XG4gIGlmICghdGhpcy5jdXJ2ZS5lbmRvKVxuICAgIHJldHVybjtcblxuICB2YXIgcHJlID0gdGhpcy5wcmVjb21wdXRlZDtcbiAgaWYgKHByZSAmJiBwcmUuYmV0YSlcbiAgICByZXR1cm4gcHJlLmJldGE7XG5cbiAgdmFyIGJldGEgPSB0aGlzLmN1cnZlLnBvaW50KHRoaXMueC5yZWRNdWwodGhpcy5jdXJ2ZS5lbmRvLmJldGEpLCB0aGlzLnkpO1xuICBpZiAocHJlKSB7XG4gICAgdmFyIGN1cnZlID0gdGhpcy5jdXJ2ZTtcbiAgICB2YXIgZW5kb011bCA9IGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiBjdXJ2ZS5wb2ludChwLngucmVkTXVsKGN1cnZlLmVuZG8uYmV0YSksIHAueSk7XG4gICAgfTtcbiAgICBwcmUuYmV0YSA9IGJldGE7XG4gICAgYmV0YS5wcmVjb21wdXRlZCA9IHtcbiAgICAgIGJldGE6IG51bGwsXG4gICAgICBuYWY6IHByZS5uYWYgJiYge1xuICAgICAgICB3bmQ6IHByZS5uYWYud25kLFxuICAgICAgICBwb2ludHM6IHByZS5uYWYucG9pbnRzLm1hcChlbmRvTXVsKVxuICAgICAgfSxcbiAgICAgIGRvdWJsZXM6IHByZS5kb3VibGVzICYmIHtcbiAgICAgICAgc3RlcDogcHJlLmRvdWJsZXMuc3RlcCxcbiAgICAgICAgcG9pbnRzOiBwcmUuZG91Ymxlcy5wb2ludHMubWFwKGVuZG9NdWwpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYmV0YTtcbn07XG5cblBvaW50LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gIGlmICghdGhpcy5wcmVjb21wdXRlZClcbiAgICByZXR1cm4gWyB0aGlzLngsIHRoaXMueSBdO1xuXG4gIHJldHVybiBbIHRoaXMueCwgdGhpcy55LCB0aGlzLnByZWNvbXB1dGVkICYmIHtcbiAgICBkb3VibGVzOiB0aGlzLnByZWNvbXB1dGVkLmRvdWJsZXMgJiYge1xuICAgICAgc3RlcDogdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzLnN0ZXAsXG4gICAgICBwb2ludHM6IHRoaXMucHJlY29tcHV0ZWQuZG91Ymxlcy5wb2ludHMuc2xpY2UoMSlcbiAgICB9LFxuICAgIG5hZjogdGhpcy5wcmVjb21wdXRlZC5uYWYgJiYge1xuICAgICAgd25kOiB0aGlzLnByZWNvbXB1dGVkLm5hZi53bmQsXG4gICAgICBwb2ludHM6IHRoaXMucHJlY29tcHV0ZWQubmFmLnBvaW50cy5zbGljZSgxKVxuICAgIH1cbiAgfSBdO1xufTtcblxuUG9pbnQuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihjdXJ2ZSwgb2JqLCByZWQpIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKVxuICAgIG9iaiA9IEpTT04ucGFyc2Uob2JqKTtcbiAgdmFyIHJlcyA9IGN1cnZlLnBvaW50KG9ialswXSwgb2JqWzFdLCByZWQpO1xuICBpZiAoIW9ialsyXSlcbiAgICByZXR1cm4gcmVzO1xuXG4gIGZ1bmN0aW9uIG9iajJwb2ludChvYmopIHtcbiAgICByZXR1cm4gY3VydmUucG9pbnQob2JqWzBdLCBvYmpbMV0sIHJlZCk7XG4gIH1cblxuICB2YXIgcHJlID0gb2JqWzJdO1xuICByZXMucHJlY29tcHV0ZWQgPSB7XG4gICAgYmV0YTogbnVsbCxcbiAgICBkb3VibGVzOiBwcmUuZG91YmxlcyAmJiB7XG4gICAgICBzdGVwOiBwcmUuZG91Ymxlcy5zdGVwLFxuICAgICAgcG9pbnRzOiBbIHJlcyBdLmNvbmNhdChwcmUuZG91Ymxlcy5wb2ludHMubWFwKG9iajJwb2ludCkpXG4gICAgfSxcbiAgICBuYWY6IHByZS5uYWYgJiYge1xuICAgICAgd25kOiBwcmUubmFmLnduZCxcbiAgICAgIHBvaW50czogWyByZXMgXS5jb25jYXQocHJlLm5hZi5wb2ludHMubWFwKG9iajJwb2ludCkpXG4gICAgfVxuICB9O1xuICByZXR1cm4gcmVzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0KCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuICc8RUMgUG9pbnQgSW5maW5pdHk+JztcbiAgcmV0dXJuICc8RUMgUG9pbnQgeDogJyArIHRoaXMueC5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICtcbiAgICAgICcgeTogJyArIHRoaXMueS5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICsgJz4nO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmlzSW5maW5pdHkgPSBmdW5jdGlvbiBpc0luZmluaXR5KCkge1xuICByZXR1cm4gdGhpcy5pbmY7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHApIHtcbiAgLy8gTyArIFAgPSBQXG4gIGlmICh0aGlzLmluZilcbiAgICByZXR1cm4gcDtcblxuICAvLyBQICsgTyA9IFBcbiAgaWYgKHAuaW5mKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIFAgKyBQID0gMlBcbiAgaWYgKHRoaXMuZXEocCkpXG4gICAgcmV0dXJuIHRoaXMuZGJsKCk7XG5cbiAgLy8gUCArICgtUCkgPSBPXG4gIGlmICh0aGlzLm5lZygpLmVxKHApKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpO1xuXG4gIC8vIFAgKyBRID0gT1xuICBpZiAodGhpcy54LmNtcChwLngpID09PSAwKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpO1xuXG4gIHZhciBjID0gdGhpcy55LnJlZFN1YihwLnkpO1xuICBpZiAoYy5jbXBuKDApICE9PSAwKVxuICAgIGMgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKHAueCkucmVkSW52bSgpKTtcbiAgdmFyIG54ID0gYy5yZWRTcXIoKS5yZWRJU3ViKHRoaXMueCkucmVkSVN1YihwLngpO1xuICB2YXIgbnkgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKG54KSkucmVkSVN1Yih0aGlzLnkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmRibCA9IGZ1bmN0aW9uIGRibCgpIHtcbiAgaWYgKHRoaXMuaW5mKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIDJQID0gT1xuICB2YXIgeXMxID0gdGhpcy55LnJlZEFkZCh0aGlzLnkpO1xuICBpZiAoeXMxLmNtcG4oMCkgPT09IDApXG4gICAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobnVsbCwgbnVsbCk7XG5cbiAgdmFyIGEgPSB0aGlzLmN1cnZlLmE7XG5cbiAgdmFyIHgyID0gdGhpcy54LnJlZFNxcigpO1xuICB2YXIgZHlpbnYgPSB5czEucmVkSW52bSgpO1xuICB2YXIgYyA9IHgyLnJlZEFkZCh4MikucmVkSUFkZCh4MikucmVkSUFkZChhKS5yZWRNdWwoZHlpbnYpO1xuXG4gIHZhciBueCA9IGMucmVkU3FyKCkucmVkSVN1Yih0aGlzLngucmVkQWRkKHRoaXMueCkpO1xuICB2YXIgbnkgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKG54KSkucmVkSVN1Yih0aGlzLnkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbiBnZXRYKCkge1xuICByZXR1cm4gdGhpcy54LmZyb21SZWQoKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24gZ2V0WSgpIHtcbiAgcmV0dXJuIHRoaXMueS5mcm9tUmVkKCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsKGspIHtcbiAgayA9IG5ldyBCTihrLCAxNik7XG5cbiAgaWYgKHRoaXMuX2hhc0RvdWJsZXMoaykpXG4gICAgcmV0dXJuIHRoaXMuY3VydmUuX2ZpeGVkTmFmTXVsKHRoaXMsIGspO1xuICBlbHNlIGlmICh0aGlzLmN1cnZlLmVuZG8pXG4gICAgcmV0dXJuIHRoaXMuY3VydmUuX2VuZG9XbmFmTXVsQWRkKFsgdGhpcyBdLCBbIGsgXSk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fd25hZk11bCh0aGlzLCBrKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiBtdWxBZGQoazEsIHAyLCBrMikge1xuICB2YXIgcG9pbnRzID0gWyB0aGlzLCBwMiBdO1xuICB2YXIgY29lZmZzID0gWyBrMSwgazIgXTtcbiAgaWYgKHRoaXMuY3VydmUuZW5kbylcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZW5kb1duYWZNdWxBZGQocG9pbnRzLCBjb2VmZnMpO1xuICBlbHNlXG4gICAgcmV0dXJuIHRoaXMuY3VydmUuX3duYWZNdWxBZGQoMSwgcG9pbnRzLCBjb2VmZnMsIDIpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmptdWxBZGQgPSBmdW5jdGlvbiBqbXVsQWRkKGsxLCBwMiwgazIpIHtcbiAgdmFyIHBvaW50cyA9IFsgdGhpcywgcDIgXTtcbiAgdmFyIGNvZWZmcyA9IFsgazEsIGsyIF07XG4gIGlmICh0aGlzLmN1cnZlLmVuZG8pXG4gICAgcmV0dXJuIHRoaXMuY3VydmUuX2VuZG9XbmFmTXVsQWRkKHBvaW50cywgY29lZmZzLCB0cnVlKTtcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsQWRkKDEsIHBvaW50cywgY29lZmZzLCAyLCB0cnVlKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxKHApIHtcbiAgcmV0dXJuIHRoaXMgPT09IHAgfHxcbiAgICAgICAgIHRoaXMuaW5mID09PSBwLmluZiAmJlxuICAgICAgICAgICAgICh0aGlzLmluZiB8fCB0aGlzLnguY21wKHAueCkgPT09IDAgJiYgdGhpcy55LmNtcChwLnkpID09PSAwKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5uZWcgPSBmdW5jdGlvbiBuZWcoX3ByZWNvbXB1dGUpIHtcbiAgaWYgKHRoaXMuaW5mKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIHZhciByZXMgPSB0aGlzLmN1cnZlLnBvaW50KHRoaXMueCwgdGhpcy55LnJlZE5lZygpKTtcbiAgaWYgKF9wcmVjb21wdXRlICYmIHRoaXMucHJlY29tcHV0ZWQpIHtcbiAgICB2YXIgcHJlID0gdGhpcy5wcmVjb21wdXRlZDtcbiAgICB2YXIgbmVnYXRlID0gZnVuY3Rpb24ocCkge1xuICAgICAgcmV0dXJuIHAubmVnKCk7XG4gICAgfTtcbiAgICByZXMucHJlY29tcHV0ZWQgPSB7XG4gICAgICBuYWY6IHByZS5uYWYgJiYge1xuICAgICAgICB3bmQ6IHByZS5uYWYud25kLFxuICAgICAgICBwb2ludHM6IHByZS5uYWYucG9pbnRzLm1hcChuZWdhdGUpXG4gICAgICB9LFxuICAgICAgZG91YmxlczogcHJlLmRvdWJsZXMgJiYge1xuICAgICAgICBzdGVwOiBwcmUuZG91Ymxlcy5zdGVwLFxuICAgICAgICBwb2ludHM6IHByZS5kb3VibGVzLnBvaW50cy5tYXAobmVnYXRlKVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cblBvaW50LnByb3RvdHlwZS50b0ogPSBmdW5jdGlvbiB0b0ooKSB7XG4gIGlmICh0aGlzLmluZilcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5qcG9pbnQobnVsbCwgbnVsbCwgbnVsbCk7XG5cbiAgdmFyIHJlcyA9IHRoaXMuY3VydmUuanBvaW50KHRoaXMueCwgdGhpcy55LCB0aGlzLmN1cnZlLm9uZSk7XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBKUG9pbnQoY3VydmUsIHgsIHksIHopIHtcbiAgQmFzZS5CYXNlUG9pbnQuY2FsbCh0aGlzLCBjdXJ2ZSwgJ2phY29iaWFuJyk7XG4gIGlmICh4ID09PSBudWxsICYmIHkgPT09IG51bGwgJiYgeiA9PT0gbnVsbCkge1xuICAgIHRoaXMueCA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMueSA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMueiA9IG5ldyBCTigwKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnggPSBuZXcgQk4oeCwgMTYpO1xuICAgIHRoaXMueSA9IG5ldyBCTih5LCAxNik7XG4gICAgdGhpcy56ID0gbmV3IEJOKHosIDE2KTtcbiAgfVxuICBpZiAoIXRoaXMueC5yZWQpXG4gICAgdGhpcy54ID0gdGhpcy54LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgaWYgKCF0aGlzLnkucmVkKVxuICAgIHRoaXMueSA9IHRoaXMueS50b1JlZCh0aGlzLmN1cnZlLnJlZCk7XG4gIGlmICghdGhpcy56LnJlZClcbiAgICB0aGlzLnogPSB0aGlzLnoudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuXG4gIHRoaXMuek9uZSA9IHRoaXMueiA9PT0gdGhpcy5jdXJ2ZS5vbmU7XG59XG5pbmhlcml0cyhKUG9pbnQsIEJhc2UuQmFzZVBvaW50KTtcblxuU2hvcnRDdXJ2ZS5wcm90b3R5cGUuanBvaW50ID0gZnVuY3Rpb24ganBvaW50KHgsIHksIHopIHtcbiAgcmV0dXJuIG5ldyBKUG9pbnQodGhpcywgeCwgeSwgeik7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLnRvUCA9IGZ1bmN0aW9uIHRvUCgpIHtcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpO1xuXG4gIHZhciB6aW52ID0gdGhpcy56LnJlZEludm0oKTtcbiAgdmFyIHppbnYyID0gemludi5yZWRTcXIoKTtcbiAgdmFyIGF4ID0gdGhpcy54LnJlZE11bCh6aW52Mik7XG4gIHZhciBheSA9IHRoaXMueS5yZWRNdWwoemludjIpLnJlZE11bCh6aW52KTtcblxuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChheCwgYXkpO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5uZWcgPSBmdW5jdGlvbiBuZWcoKSB7XG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludCh0aGlzLngsIHRoaXMueS5yZWROZWcoKSwgdGhpcy56KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHApIHtcbiAgLy8gTyArIFAgPSBQXG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gcDtcblxuICAvLyBQICsgTyA9IFBcbiAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIDEyTSArIDRTICsgN0FcbiAgdmFyIHB6MiA9IHAuei5yZWRTcXIoKTtcbiAgdmFyIHoyID0gdGhpcy56LnJlZFNxcigpO1xuICB2YXIgdTEgPSB0aGlzLngucmVkTXVsKHB6Mik7XG4gIHZhciB1MiA9IHAueC5yZWRNdWwoejIpO1xuICB2YXIgczEgPSB0aGlzLnkucmVkTXVsKHB6Mi5yZWRNdWwocC56KSk7XG4gIHZhciBzMiA9IHAueS5yZWRNdWwoejIucmVkTXVsKHRoaXMueikpO1xuXG4gIHZhciBoID0gdTEucmVkU3ViKHUyKTtcbiAgdmFyIHIgPSBzMS5yZWRTdWIoczIpO1xuICBpZiAoaC5jbXBuKDApID09PSAwKSB7XG4gICAgaWYgKHIuY21wbigwKSAhPT0gMClcbiAgICAgIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5kYmwoKTtcbiAgfVxuXG4gIHZhciBoMiA9IGgucmVkU3FyKCk7XG4gIHZhciBoMyA9IGgyLnJlZE11bChoKTtcbiAgdmFyIHYgPSB1MS5yZWRNdWwoaDIpO1xuXG4gIHZhciBueCA9IHIucmVkU3FyKCkucmVkSUFkZChoMykucmVkSVN1Yih2KS5yZWRJU3ViKHYpO1xuICB2YXIgbnkgPSByLnJlZE11bCh2LnJlZElTdWIobngpKS5yZWRJU3ViKHMxLnJlZE11bChoMykpO1xuICB2YXIgbnogPSB0aGlzLnoucmVkTXVsKHAueikucmVkTXVsKGgpO1xuXG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChueCwgbnksIG56KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUubWl4ZWRBZGQgPSBmdW5jdGlvbiBtaXhlZEFkZChwKSB7XG4gIC8vIE8gKyBQID0gUFxuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHAudG9KKCk7XG5cbiAgLy8gUCArIE8gPSBQXG4gIGlmIChwLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyA4TSArIDNTICsgN0FcbiAgdmFyIHoyID0gdGhpcy56LnJlZFNxcigpO1xuICB2YXIgdTEgPSB0aGlzLng7XG4gIHZhciB1MiA9IHAueC5yZWRNdWwoejIpO1xuICB2YXIgczEgPSB0aGlzLnk7XG4gIHZhciBzMiA9IHAueS5yZWRNdWwoejIpLnJlZE11bCh0aGlzLnopO1xuXG4gIHZhciBoID0gdTEucmVkU3ViKHUyKTtcbiAgdmFyIHIgPSBzMS5yZWRTdWIoczIpO1xuICBpZiAoaC5jbXBuKDApID09PSAwKSB7XG4gICAgaWYgKHIuY21wbigwKSAhPT0gMClcbiAgICAgIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5kYmwoKTtcbiAgfVxuXG4gIHZhciBoMiA9IGgucmVkU3FyKCk7XG4gIHZhciBoMyA9IGgyLnJlZE11bChoKTtcbiAgdmFyIHYgPSB1MS5yZWRNdWwoaDIpO1xuXG4gIHZhciBueCA9IHIucmVkU3FyKCkucmVkSUFkZChoMykucmVkSVN1Yih2KS5yZWRJU3ViKHYpO1xuICB2YXIgbnkgPSByLnJlZE11bCh2LnJlZElTdWIobngpKS5yZWRJU3ViKHMxLnJlZE11bChoMykpO1xuICB2YXIgbnogPSB0aGlzLnoucmVkTXVsKGgpO1xuXG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChueCwgbnksIG56KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuZGJscCA9IGZ1bmN0aW9uIGRibHAocG93KSB7XG4gIGlmIChwb3cgPT09IDApXG4gICAgcmV0dXJuIHRoaXM7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gdGhpcztcbiAgaWYgKCFwb3cpXG4gICAgcmV0dXJuIHRoaXMuZGJsKCk7XG5cbiAgaWYgKHRoaXMuY3VydmUuemVyb0EgfHwgdGhpcy5jdXJ2ZS50aHJlZUEpIHtcbiAgICB2YXIgciA9IHRoaXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3c7IGkrKylcbiAgICAgIHIgPSByLmRibCgpO1xuICAgIHJldHVybiByO1xuICB9XG5cbiAgLy8gMU0gKyAyUyArIDFBICsgTiAqICg0UyArIDVNICsgOEEpXG4gIC8vIE4gPSAxID0+IDZNICsgNlMgKyA5QVxuICB2YXIgYSA9IHRoaXMuY3VydmUuYTtcbiAgdmFyIHRpbnYgPSB0aGlzLmN1cnZlLnRpbnY7XG5cbiAgdmFyIGp4ID0gdGhpcy54O1xuICB2YXIgankgPSB0aGlzLnk7XG4gIHZhciBqeiA9IHRoaXMuejtcbiAgdmFyIGp6NCA9IGp6LnJlZFNxcigpLnJlZFNxcigpO1xuXG4gIC8vIFJldXNlIHJlc3VsdHNcbiAgdmFyIGp5ZCA9IGp5LnJlZEFkZChqeSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcG93OyBpKyspIHtcbiAgICB2YXIgangyID0gangucmVkU3FyKCk7XG4gICAgdmFyIGp5ZDIgPSBqeWQucmVkU3FyKCk7XG4gICAgdmFyIGp5ZDQgPSBqeWQyLnJlZFNxcigpO1xuICAgIHZhciBjID0gangyLnJlZEFkZChqeDIpLnJlZElBZGQoangyKS5yZWRJQWRkKGEucmVkTXVsKGp6NCkpO1xuXG4gICAgdmFyIHQxID0gangucmVkTXVsKGp5ZDIpO1xuICAgIHZhciBueCA9IGMucmVkU3FyKCkucmVkSVN1Yih0MS5yZWRBZGQodDEpKTtcbiAgICB2YXIgdDIgPSB0MS5yZWRJU3ViKG54KTtcbiAgICB2YXIgZG55ID0gYy5yZWRNdWwodDIpO1xuICAgIGRueSA9IGRueS5yZWRJQWRkKGRueSkucmVkSVN1YihqeWQ0KTtcbiAgICB2YXIgbnogPSBqeWQucmVkTXVsKGp6KTtcbiAgICBpZiAoaSArIDEgPCBwb3cpXG4gICAgICBqejQgPSBqejQucmVkTXVsKGp5ZDQpO1xuXG4gICAganggPSBueDtcbiAgICBqeiA9IG56O1xuICAgIGp5ZCA9IGRueTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChqeCwganlkLnJlZE11bCh0aW52KSwganopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5kYmwgPSBmdW5jdGlvbiBkYmwoKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gdGhpcztcblxuICBpZiAodGhpcy5jdXJ2ZS56ZXJvQSlcbiAgICByZXR1cm4gdGhpcy5femVyb0RibCgpO1xuICBlbHNlIGlmICh0aGlzLmN1cnZlLnRocmVlQSlcbiAgICByZXR1cm4gdGhpcy5fdGhyZWVEYmwoKTtcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzLl9kYmwoKTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuX3plcm9EYmwgPSBmdW5jdGlvbiBfemVyb0RibCgpIHtcbiAgdmFyIG54O1xuICB2YXIgbnk7XG4gIHZhciBuejtcbiAgLy8gWiA9IDFcbiAgaWYgKHRoaXMuek9uZSkge1xuICAgIC8vIGh5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by1zaG9ydHctamFjb2JpYW4tMC5odG1sXG4gICAgLy8gICAgICNkb3VibGluZy1tZGJsLTIwMDctYmxcbiAgICAvLyAxTSArIDVTICsgMTRBXG5cbiAgICAvLyBYWCA9IFgxXjJcbiAgICB2YXIgeHggPSB0aGlzLngucmVkU3FyKCk7XG4gICAgLy8gWVkgPSBZMV4yXG4gICAgdmFyIHl5ID0gdGhpcy55LnJlZFNxcigpO1xuICAgIC8vIFlZWVkgPSBZWV4yXG4gICAgdmFyIHl5eXkgPSB5eS5yZWRTcXIoKTtcbiAgICAvLyBTID0gMiAqICgoWDEgKyBZWSleMiAtIFhYIC0gWVlZWSlcbiAgICB2YXIgcyA9IHRoaXMueC5yZWRBZGQoeXkpLnJlZFNxcigpLnJlZElTdWIoeHgpLnJlZElTdWIoeXl5eSk7XG4gICAgcyA9IHMucmVkSUFkZChzKTtcbiAgICAvLyBNID0gMyAqIFhYICsgYTsgYSA9IDBcbiAgICB2YXIgbSA9IHh4LnJlZEFkZCh4eCkucmVkSUFkZCh4eCk7XG4gICAgLy8gVCA9IE0gXiAyIC0gMipTXG4gICAgdmFyIHQgPSBtLnJlZFNxcigpLnJlZElTdWIocykucmVkSVN1YihzKTtcblxuICAgIC8vIDggKiBZWVlZXG4gICAgdmFyIHl5eXk4ID0geXl5eS5yZWRJQWRkKHl5eXkpO1xuICAgIHl5eXk4ID0geXl5eTgucmVkSUFkZCh5eXl5OCk7XG4gICAgeXl5eTggPSB5eXl5OC5yZWRJQWRkKHl5eXk4KTtcblxuICAgIC8vIFgzID0gVFxuICAgIG54ID0gdDtcbiAgICAvLyBZMyA9IE0gKiAoUyAtIFQpIC0gOCAqIFlZWVlcbiAgICBueSA9IG0ucmVkTXVsKHMucmVkSVN1Yih0KSkucmVkSVN1Yih5eXl5OCk7XG4gICAgLy8gWjMgPSAyKlkxXG4gICAgbnogPSB0aGlzLnkucmVkQWRkKHRoaXMueSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXNob3J0dy1qYWNvYmlhbi0wLmh0bWxcbiAgICAvLyAgICAgI2RvdWJsaW5nLWRibC0yMDA5LWxcbiAgICAvLyAyTSArIDVTICsgMTNBXG5cbiAgICAvLyBBID0gWDFeMlxuICAgIHZhciBhID0gdGhpcy54LnJlZFNxcigpO1xuICAgIC8vIEIgPSBZMV4yXG4gICAgdmFyIGIgPSB0aGlzLnkucmVkU3FyKCk7XG4gICAgLy8gQyA9IEJeMlxuICAgIHZhciBjID0gYi5yZWRTcXIoKTtcbiAgICAvLyBEID0gMiAqICgoWDEgKyBCKV4yIC0gQSAtIEMpXG4gICAgdmFyIGQgPSB0aGlzLngucmVkQWRkKGIpLnJlZFNxcigpLnJlZElTdWIoYSkucmVkSVN1YihjKTtcbiAgICBkID0gZC5yZWRJQWRkKGQpO1xuICAgIC8vIEUgPSAzICogQVxuICAgIHZhciBlID0gYS5yZWRBZGQoYSkucmVkSUFkZChhKTtcbiAgICAvLyBGID0gRV4yXG4gICAgdmFyIGYgPSBlLnJlZFNxcigpO1xuXG4gICAgLy8gOCAqIENcbiAgICB2YXIgYzggPSBjLnJlZElBZGQoYyk7XG4gICAgYzggPSBjOC5yZWRJQWRkKGM4KTtcbiAgICBjOCA9IGM4LnJlZElBZGQoYzgpO1xuXG4gICAgLy8gWDMgPSBGIC0gMiAqIERcbiAgICBueCA9IGYucmVkSVN1YihkKS5yZWRJU3ViKGQpO1xuICAgIC8vIFkzID0gRSAqIChEIC0gWDMpIC0gOCAqIENcbiAgICBueSA9IGUucmVkTXVsKGQucmVkSVN1YihueCkpLnJlZElTdWIoYzgpO1xuICAgIC8vIFozID0gMiAqIFkxICogWjFcbiAgICBueiA9IHRoaXMueS5yZWRNdWwodGhpcy56KTtcbiAgICBueiA9IG56LnJlZElBZGQobnopO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG54LCBueSwgbnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5fdGhyZWVEYmwgPSBmdW5jdGlvbiBfdGhyZWVEYmwoKSB7XG4gIHZhciBueDtcbiAgdmFyIG55O1xuICB2YXIgbno7XG4gIC8vIFogPSAxXG4gIGlmICh0aGlzLnpPbmUpIHtcbiAgICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tc2hvcnR3LWphY29iaWFuLTMuaHRtbFxuICAgIC8vICAgICAjZG91YmxpbmctbWRibC0yMDA3LWJsXG4gICAgLy8gMU0gKyA1UyArIDE1QVxuXG4gICAgLy8gWFggPSBYMV4yXG4gICAgdmFyIHh4ID0gdGhpcy54LnJlZFNxcigpO1xuICAgIC8vIFlZID0gWTFeMlxuICAgIHZhciB5eSA9IHRoaXMueS5yZWRTcXIoKTtcbiAgICAvLyBZWVlZID0gWVleMlxuICAgIHZhciB5eXl5ID0geXkucmVkU3FyKCk7XG4gICAgLy8gUyA9IDIgKiAoKFgxICsgWVkpXjIgLSBYWCAtIFlZWVkpXG4gICAgdmFyIHMgPSB0aGlzLngucmVkQWRkKHl5KS5yZWRTcXIoKS5yZWRJU3ViKHh4KS5yZWRJU3ViKHl5eXkpO1xuICAgIHMgPSBzLnJlZElBZGQocyk7XG4gICAgLy8gTSA9IDMgKiBYWCArIGFcbiAgICB2YXIgbSA9IHh4LnJlZEFkZCh4eCkucmVkSUFkZCh4eCkucmVkSUFkZCh0aGlzLmN1cnZlLmEpO1xuICAgIC8vIFQgPSBNXjIgLSAyICogU1xuICAgIHZhciB0ID0gbS5yZWRTcXIoKS5yZWRJU3ViKHMpLnJlZElTdWIocyk7XG4gICAgLy8gWDMgPSBUXG4gICAgbnggPSB0O1xuICAgIC8vIFkzID0gTSAqIChTIC0gVCkgLSA4ICogWVlZWVxuICAgIHZhciB5eXl5OCA9IHl5eXkucmVkSUFkZCh5eXl5KTtcbiAgICB5eXl5OCA9IHl5eXk4LnJlZElBZGQoeXl5eTgpO1xuICAgIHl5eXk4ID0geXl5eTgucmVkSUFkZCh5eXl5OCk7XG4gICAgbnkgPSBtLnJlZE11bChzLnJlZElTdWIodCkpLnJlZElTdWIoeXl5eTgpO1xuICAgIC8vIFozID0gMiAqIFkxXG4gICAgbnogPSB0aGlzLnkucmVkQWRkKHRoaXMueSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXNob3J0dy1qYWNvYmlhbi0zLmh0bWwjZG91YmxpbmctZGJsLTIwMDEtYlxuICAgIC8vIDNNICsgNVNcblxuICAgIC8vIGRlbHRhID0gWjFeMlxuICAgIHZhciBkZWx0YSA9IHRoaXMuei5yZWRTcXIoKTtcbiAgICAvLyBnYW1tYSA9IFkxXjJcbiAgICB2YXIgZ2FtbWEgPSB0aGlzLnkucmVkU3FyKCk7XG4gICAgLy8gYmV0YSA9IFgxICogZ2FtbWFcbiAgICB2YXIgYmV0YSA9IHRoaXMueC5yZWRNdWwoZ2FtbWEpO1xuICAgIC8vIGFscGhhID0gMyAqIChYMSAtIGRlbHRhKSAqIChYMSArIGRlbHRhKVxuICAgIHZhciBhbHBoYSA9IHRoaXMueC5yZWRTdWIoZGVsdGEpLnJlZE11bCh0aGlzLngucmVkQWRkKGRlbHRhKSk7XG4gICAgYWxwaGEgPSBhbHBoYS5yZWRBZGQoYWxwaGEpLnJlZElBZGQoYWxwaGEpO1xuICAgIC8vIFgzID0gYWxwaGFeMiAtIDggKiBiZXRhXG4gICAgdmFyIGJldGE0ID0gYmV0YS5yZWRJQWRkKGJldGEpO1xuICAgIGJldGE0ID0gYmV0YTQucmVkSUFkZChiZXRhNCk7XG4gICAgdmFyIGJldGE4ID0gYmV0YTQucmVkQWRkKGJldGE0KTtcbiAgICBueCA9IGFscGhhLnJlZFNxcigpLnJlZElTdWIoYmV0YTgpO1xuICAgIC8vIFozID0gKFkxICsgWjEpXjIgLSBnYW1tYSAtIGRlbHRhXG4gICAgbnogPSB0aGlzLnkucmVkQWRkKHRoaXMueikucmVkU3FyKCkucmVkSVN1YihnYW1tYSkucmVkSVN1YihkZWx0YSk7XG4gICAgLy8gWTMgPSBhbHBoYSAqICg0ICogYmV0YSAtIFgzKSAtIDggKiBnYW1tYV4yXG4gICAgdmFyIGdnYW1tYTggPSBnYW1tYS5yZWRTcXIoKTtcbiAgICBnZ2FtbWE4ID0gZ2dhbW1hOC5yZWRJQWRkKGdnYW1tYTgpO1xuICAgIGdnYW1tYTggPSBnZ2FtbWE4LnJlZElBZGQoZ2dhbW1hOCk7XG4gICAgZ2dhbW1hOCA9IGdnYW1tYTgucmVkSUFkZChnZ2FtbWE4KTtcbiAgICBueSA9IGFscGhhLnJlZE11bChiZXRhNC5yZWRJU3ViKG54KSkucmVkSVN1YihnZ2FtbWE4KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChueCwgbnksIG56KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuX2RibCA9IGZ1bmN0aW9uIF9kYmwoKSB7XG4gIHZhciBhID0gdGhpcy5jdXJ2ZS5hO1xuXG4gIC8vIDRNICsgNlMgKyAxMEFcbiAgdmFyIGp4ID0gdGhpcy54O1xuICB2YXIgankgPSB0aGlzLnk7XG4gIHZhciBqeiA9IHRoaXMuejtcbiAgdmFyIGp6NCA9IGp6LnJlZFNxcigpLnJlZFNxcigpO1xuXG4gIHZhciBqeDIgPSBqeC5yZWRTcXIoKTtcbiAgdmFyIGp5MiA9IGp5LnJlZFNxcigpO1xuXG4gIHZhciBjID0gangyLnJlZEFkZChqeDIpLnJlZElBZGQoangyKS5yZWRJQWRkKGEucmVkTXVsKGp6NCkpO1xuXG4gIHZhciBqeGQ0ID0gangucmVkQWRkKGp4KTtcbiAganhkNCA9IGp4ZDQucmVkSUFkZChqeGQ0KTtcbiAgdmFyIHQxID0ganhkNC5yZWRNdWwoankyKTtcbiAgdmFyIG54ID0gYy5yZWRTcXIoKS5yZWRJU3ViKHQxLnJlZEFkZCh0MSkpO1xuICB2YXIgdDIgPSB0MS5yZWRJU3ViKG54KTtcblxuICB2YXIganlkOCA9IGp5Mi5yZWRTcXIoKTtcbiAganlkOCA9IGp5ZDgucmVkSUFkZChqeWQ4KTtcbiAganlkOCA9IGp5ZDgucmVkSUFkZChqeWQ4KTtcbiAganlkOCA9IGp5ZDgucmVkSUFkZChqeWQ4KTtcbiAgdmFyIG55ID0gYy5yZWRNdWwodDIpLnJlZElTdWIoanlkOCk7XG4gIHZhciBueiA9IGp5LnJlZEFkZChqeSkucmVkTXVsKGp6KTtcblxuICByZXR1cm4gdGhpcy5jdXJ2ZS5qcG9pbnQobngsIG55LCBueik7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLnRycGwgPSBmdW5jdGlvbiB0cnBsKCkge1xuICBpZiAoIXRoaXMuY3VydmUuemVyb0EpXG4gICAgcmV0dXJuIHRoaXMuZGJsKCkuYWRkKHRoaXMpO1xuXG4gIC8vIGh5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by1zaG9ydHctamFjb2JpYW4tMC5odG1sI3RyaXBsaW5nLXRwbC0yMDA3LWJsXG4gIC8vIDVNICsgMTBTICsgLi4uXG5cbiAgLy8gWFggPSBYMV4yXG4gIHZhciB4eCA9IHRoaXMueC5yZWRTcXIoKTtcbiAgLy8gWVkgPSBZMV4yXG4gIHZhciB5eSA9IHRoaXMueS5yZWRTcXIoKTtcbiAgLy8gWlogPSBaMV4yXG4gIHZhciB6eiA9IHRoaXMuei5yZWRTcXIoKTtcbiAgLy8gWVlZWSA9IFlZXjJcbiAgdmFyIHl5eXkgPSB5eS5yZWRTcXIoKTtcbiAgLy8gTSA9IDMgKiBYWCArIGEgKiBaWjI7IGEgPSAwXG4gIHZhciBtID0geHgucmVkQWRkKHh4KS5yZWRJQWRkKHh4KTtcbiAgLy8gTU0gPSBNXjJcbiAgdmFyIG1tID0gbS5yZWRTcXIoKTtcbiAgLy8gRSA9IDYgKiAoKFgxICsgWVkpXjIgLSBYWCAtIFlZWVkpIC0gTU1cbiAgdmFyIGUgPSB0aGlzLngucmVkQWRkKHl5KS5yZWRTcXIoKS5yZWRJU3ViKHh4KS5yZWRJU3ViKHl5eXkpO1xuICBlID0gZS5yZWRJQWRkKGUpO1xuICBlID0gZS5yZWRBZGQoZSkucmVkSUFkZChlKTtcbiAgZSA9IGUucmVkSVN1YihtbSk7XG4gIC8vIEVFID0gRV4yXG4gIHZhciBlZSA9IGUucmVkU3FyKCk7XG4gIC8vIFQgPSAxNipZWVlZXG4gIHZhciB0ID0geXl5eS5yZWRJQWRkKHl5eXkpO1xuICB0ID0gdC5yZWRJQWRkKHQpO1xuICB0ID0gdC5yZWRJQWRkKHQpO1xuICB0ID0gdC5yZWRJQWRkKHQpO1xuICAvLyBVID0gKE0gKyBFKV4yIC0gTU0gLSBFRSAtIFRcbiAgdmFyIHUgPSBtLnJlZElBZGQoZSkucmVkU3FyKCkucmVkSVN1YihtbSkucmVkSVN1YihlZSkucmVkSVN1Yih0KTtcbiAgLy8gWDMgPSA0ICogKFgxICogRUUgLSA0ICogWVkgKiBVKVxuICB2YXIgeXl1NCA9IHl5LnJlZE11bCh1KTtcbiAgeXl1NCA9IHl5dTQucmVkSUFkZCh5eXU0KTtcbiAgeXl1NCA9IHl5dTQucmVkSUFkZCh5eXU0KTtcbiAgdmFyIG54ID0gdGhpcy54LnJlZE11bChlZSkucmVkSVN1Yih5eXU0KTtcbiAgbnggPSBueC5yZWRJQWRkKG54KTtcbiAgbnggPSBueC5yZWRJQWRkKG54KTtcbiAgLy8gWTMgPSA4ICogWTEgKiAoVSAqIChUIC0gVSkgLSBFICogRUUpXG4gIHZhciBueSA9IHRoaXMueS5yZWRNdWwodS5yZWRNdWwodC5yZWRJU3ViKHUpKS5yZWRJU3ViKGUucmVkTXVsKGVlKSkpO1xuICBueSA9IG55LnJlZElBZGQobnkpO1xuICBueSA9IG55LnJlZElBZGQobnkpO1xuICBueSA9IG55LnJlZElBZGQobnkpO1xuICAvLyBaMyA9IChaMSArIEUpXjIgLSBaWiAtIEVFXG4gIHZhciBueiA9IHRoaXMuei5yZWRBZGQoZSkucmVkU3FyKCkucmVkSVN1Yih6eikucmVkSVN1YihlZSk7XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG54LCBueSwgbnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwoaywga2Jhc2UpIHtcbiAgayA9IG5ldyBCTihrLCBrYmFzZSk7XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuX3duYWZNdWwodGhpcywgayk7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEocCkge1xuICBpZiAocC50eXBlID09PSAnYWZmaW5lJylcbiAgICByZXR1cm4gdGhpcy5lcShwLnRvSigpKTtcblxuICBpZiAodGhpcyA9PT0gcClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICAvLyB4MSAqIHoyXjIgPT0geDIgKiB6MV4yXG4gIHZhciB6MiA9IHRoaXMuei5yZWRTcXIoKTtcbiAgdmFyIHB6MiA9IHAuei5yZWRTcXIoKTtcbiAgaWYgKHRoaXMueC5yZWRNdWwocHoyKS5yZWRJU3ViKHAueC5yZWRNdWwoejIpKS5jbXBuKDApICE9PSAwKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyB5MSAqIHoyXjMgPT0geTIgKiB6MV4zXG4gIHZhciB6MyA9IHoyLnJlZE11bCh0aGlzLnopO1xuICB2YXIgcHozID0gcHoyLnJlZE11bChwLnopO1xuICByZXR1cm4gdGhpcy55LnJlZE11bChwejMpLnJlZElTdWIocC55LnJlZE11bCh6MykpLmNtcG4oMCkgPT09IDA7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLmVxWFRvUCA9IGZ1bmN0aW9uIGVxWFRvUCh4KSB7XG4gIHZhciB6cyA9IHRoaXMuei5yZWRTcXIoKTtcbiAgdmFyIHJ4ID0geC50b1JlZCh0aGlzLmN1cnZlLnJlZCkucmVkTXVsKHpzKTtcbiAgaWYgKHRoaXMueC5jbXAocngpID09PSAwKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHZhciB4YyA9IHguY2xvbmUoKTtcbiAgdmFyIHQgPSB0aGlzLmN1cnZlLnJlZE4ucmVkTXVsKHpzKTtcbiAgZm9yICg7Oykge1xuICAgIHhjLmlhZGQodGhpcy5jdXJ2ZS5uKTtcbiAgICBpZiAoeGMuY21wKHRoaXMuY3VydmUucCkgPj0gMClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJ4LnJlZElBZGQodCk7XG4gICAgaWYgKHRoaXMueC5jbXAocngpID09PSAwKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbkpQb2ludC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gJzxFQyBKUG9pbnQgSW5maW5pdHk+JztcbiAgcmV0dXJuICc8RUMgSlBvaW50IHg6ICcgKyB0aGlzLngudG9TdHJpbmcoMTYsIDIpICtcbiAgICAgICcgeTogJyArIHRoaXMueS50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB6OiAnICsgdGhpcy56LnRvU3RyaW5nKDE2LCAyKSArICc+Jztcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuaXNJbmZpbml0eSA9IGZ1bmN0aW9uIGlzSW5maW5pdHkoKSB7XG4gIC8vIFhYWCBUaGlzIGNvZGUgYXNzdW1lcyB0aGF0IHplcm8gaXMgYWx3YXlzIHplcm8gaW4gcmVkXG4gIHJldHVybiB0aGlzLnouY21wbigwKSA9PT0gMDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbGxpcHRpYyA9IGV4cG9ydHM7XG5cbmVsbGlwdGljLnZlcnNpb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuZWxsaXB0aWMudXRpbHMgPSByZXF1aXJlKCcuL2VsbGlwdGljL3V0aWxzJyk7XG5lbGxpcHRpYy5yYW5kID0gcmVxdWlyZSgnYnJvcmFuZCcpO1xuZWxsaXB0aWMuY3VydmUgPSByZXF1aXJlKCcuL2VsbGlwdGljL2N1cnZlJyk7XG5lbGxpcHRpYy5jdXJ2ZXMgPSByZXF1aXJlKCcuL2VsbGlwdGljL2N1cnZlcycpO1xuXG4vLyBQcm90b2NvbHNcbmVsbGlwdGljLmVjID0gcmVxdWlyZSgnLi9lbGxpcHRpYy9lYycpO1xuZWxsaXB0aWMuZWRkc2EgPSByZXF1aXJlKCcuL2VsbGlwdGljL2VkZHNhJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xudmFyIHBhcnNlQnl0ZXMgPSB1dGlscy5wYXJzZUJ5dGVzO1xudmFyIGNhY2hlZFByb3BlcnR5ID0gdXRpbHMuY2FjaGVkUHJvcGVydHk7XG5cbi8qKlxuKiBAcGFyYW0ge0VERFNBfSBlZGRzYSAtIGluc3RhbmNlXG4qIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwdWJsaWMvcHJpdmF0ZSBrZXkgcGFyYW1ldGVyc1xuKlxuKiBAcGFyYW0ge0FycmF5PEJ5dGU+fSBbcGFyYW1zLnNlY3JldF0gLSBzZWNyZXQgc2VlZCBieXRlc1xuKiBAcGFyYW0ge1BvaW50fSBbcGFyYW1zLnB1Yl0gLSBwdWJsaWMga2V5IHBvaW50IChha2EgYEFgIGluIGVkZHNhIHRlcm1zKVxuKiBAcGFyYW0ge0FycmF5PEJ5dGU+fSBbcGFyYW1zLnB1Yl0gLSBwdWJsaWMga2V5IHBvaW50IGVuY29kZWQgYXMgYnl0ZXNcbipcbiovXG5mdW5jdGlvbiBLZXlQYWlyKGVkZHNhLCBwYXJhbXMpIHtcbiAgdGhpcy5lZGRzYSA9IGVkZHNhO1xuICB0aGlzLl9zZWNyZXQgPSBwYXJzZUJ5dGVzKHBhcmFtcy5zZWNyZXQpO1xuICBpZiAoZWRkc2EuaXNQb2ludChwYXJhbXMucHViKSlcbiAgICB0aGlzLl9wdWIgPSBwYXJhbXMucHViO1xuICBlbHNlXG4gICAgdGhpcy5fcHViQnl0ZXMgPSBwYXJzZUJ5dGVzKHBhcmFtcy5wdWIpO1xufVxuXG5LZXlQYWlyLmZyb21QdWJsaWMgPSBmdW5jdGlvbiBmcm9tUHVibGljKGVkZHNhLCBwdWIpIHtcbiAgaWYgKHB1YiBpbnN0YW5jZW9mIEtleVBhaXIpXG4gICAgcmV0dXJuIHB1YjtcbiAgcmV0dXJuIG5ldyBLZXlQYWlyKGVkZHNhLCB7IHB1YjogcHViIH0pO1xufTtcblxuS2V5UGFpci5mcm9tU2VjcmV0ID0gZnVuY3Rpb24gZnJvbVNlY3JldChlZGRzYSwgc2VjcmV0KSB7XG4gIGlmIChzZWNyZXQgaW5zdGFuY2VvZiBLZXlQYWlyKVxuICAgIHJldHVybiBzZWNyZXQ7XG4gIHJldHVybiBuZXcgS2V5UGFpcihlZGRzYSwgeyBzZWNyZXQ6IHNlY3JldCB9KTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLnNlY3JldCA9IGZ1bmN0aW9uIHNlY3JldCgpIHtcbiAgcmV0dXJuIHRoaXMuX3NlY3JldDtcbn07XG5cbmNhY2hlZFByb3BlcnR5KEtleVBhaXIsICdwdWJCeXRlcycsIGZ1bmN0aW9uIHB1YkJ5dGVzKCkge1xuICByZXR1cm4gdGhpcy5lZGRzYS5lbmNvZGVQb2ludCh0aGlzLnB1YigpKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShLZXlQYWlyLCAncHViJywgZnVuY3Rpb24gcHViKCkge1xuICBpZiAodGhpcy5fcHViQnl0ZXMpXG4gICAgcmV0dXJuIHRoaXMuZWRkc2EuZGVjb2RlUG9pbnQodGhpcy5fcHViQnl0ZXMpO1xuICByZXR1cm4gdGhpcy5lZGRzYS5nLm11bCh0aGlzLnByaXYoKSk7XG59KTtcblxuY2FjaGVkUHJvcGVydHkoS2V5UGFpciwgJ3ByaXZCeXRlcycsIGZ1bmN0aW9uIHByaXZCeXRlcygpIHtcbiAgdmFyIGVkZHNhID0gdGhpcy5lZGRzYTtcbiAgdmFyIGhhc2ggPSB0aGlzLmhhc2goKTtcbiAgdmFyIGxhc3RJeCA9IGVkZHNhLmVuY29kaW5nTGVuZ3RoIC0gMTtcblxuICB2YXIgYSA9IGhhc2guc2xpY2UoMCwgZWRkc2EuZW5jb2RpbmdMZW5ndGgpO1xuICBhWzBdICY9IDI0ODtcbiAgYVtsYXN0SXhdICY9IDEyNztcbiAgYVtsYXN0SXhdIHw9IDY0O1xuXG4gIHJldHVybiBhO1xufSk7XG5cbmNhY2hlZFByb3BlcnR5KEtleVBhaXIsICdwcml2JywgZnVuY3Rpb24gcHJpdigpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuZGVjb2RlSW50KHRoaXMucHJpdkJ5dGVzKCkpO1xufSk7XG5cbmNhY2hlZFByb3BlcnR5KEtleVBhaXIsICdoYXNoJywgZnVuY3Rpb24gaGFzaCgpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuaGFzaCgpLnVwZGF0ZSh0aGlzLnNlY3JldCgpKS5kaWdlc3QoKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShLZXlQYWlyLCAnbWVzc2FnZVByZWZpeCcsIGZ1bmN0aW9uIG1lc3NhZ2VQcmVmaXgoKSB7XG4gIHJldHVybiB0aGlzLmhhc2goKS5zbGljZSh0aGlzLmVkZHNhLmVuY29kaW5nTGVuZ3RoKTtcbn0pO1xuXG5LZXlQYWlyLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gc2lnbihtZXNzYWdlKSB7XG4gIGFzc2VydCh0aGlzLl9zZWNyZXQsICdLZXlQYWlyIGNhbiBvbmx5IHZlcmlmeScpO1xuICByZXR1cm4gdGhpcy5lZGRzYS5zaWduKG1lc3NhZ2UsIHRoaXMpO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UsIHNpZykge1xuICByZXR1cm4gdGhpcy5lZGRzYS52ZXJpZnkobWVzc2FnZSwgc2lnLCB0aGlzKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLmdldFNlY3JldCA9IGZ1bmN0aW9uIGdldFNlY3JldChlbmMpIHtcbiAgYXNzZXJ0KHRoaXMuX3NlY3JldCwgJ0tleVBhaXIgaXMgcHVibGljIG9ubHknKTtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZSh0aGlzLnNlY3JldCgpLCBlbmMpO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUuZ2V0UHVibGljID0gZnVuY3Rpb24gZ2V0UHVibGljKGVuYykge1xuICByZXR1cm4gdXRpbHMuZW5jb2RlKHRoaXMucHViQnl0ZXMoKSwgZW5jKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5UGFpcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xudmFyIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcblxuZnVuY3Rpb24gRWR3YXJkc0N1cnZlKGNvbmYpIHtcbiAgLy8gTk9URTogSW1wb3J0YW50IGFzIHdlIGFyZSBjcmVhdGluZyBwb2ludCBpbiBCYXNlLmNhbGwoKVxuICB0aGlzLnR3aXN0ZWQgPSAoY29uZi5hIHwgMCkgIT09IDE7XG4gIHRoaXMubU9uZUEgPSB0aGlzLnR3aXN0ZWQgJiYgKGNvbmYuYSB8IDApID09PSAtMTtcbiAgdGhpcy5leHRlbmRlZCA9IHRoaXMubU9uZUE7XG5cbiAgQmFzZS5jYWxsKHRoaXMsICdlZHdhcmRzJywgY29uZik7XG5cbiAgdGhpcy5hID0gbmV3IEJOKGNvbmYuYSwgMTYpLnVtb2QodGhpcy5yZWQubSk7XG4gIHRoaXMuYSA9IHRoaXMuYS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYyA9IG5ldyBCTihjb25mLmMsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYzIgPSB0aGlzLmMucmVkU3FyKCk7XG4gIHRoaXMuZCA9IG5ldyBCTihjb25mLmQsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuZGQgPSB0aGlzLmQucmVkQWRkKHRoaXMuZCk7XG5cbiAgYXNzZXJ0KCF0aGlzLnR3aXN0ZWQgfHwgdGhpcy5jLmZyb21SZWQoKS5jbXBuKDEpID09PSAwKTtcbiAgdGhpcy5vbmVDID0gKGNvbmYuYyB8IDApID09PSAxO1xufVxuaW5oZXJpdHMoRWR3YXJkc0N1cnZlLCBCYXNlKTtcbm1vZHVsZS5leHBvcnRzID0gRWR3YXJkc0N1cnZlO1xuXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLl9tdWxBID0gZnVuY3Rpb24gX211bEEobnVtKSB7XG4gIGlmICh0aGlzLm1PbmVBKVxuICAgIHJldHVybiBudW0ucmVkTmVnKCk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5hLnJlZE11bChudW0pO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5fbXVsQyA9IGZ1bmN0aW9uIF9tdWxDKG51bSkge1xuICBpZiAodGhpcy5vbmVDKVxuICAgIHJldHVybiBudW07XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jLnJlZE11bChudW0pO1xufTtcblxuLy8gSnVzdCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIFNob3J0IGN1cnZlXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLmpwb2ludCA9IGZ1bmN0aW9uIGpwb2ludCh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHksIHosIHQpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5wb2ludEZyb21YID0gZnVuY3Rpb24gcG9pbnRGcm9tWCh4LCBvZGQpIHtcbiAgeCA9IG5ldyBCTih4LCAxNik7XG4gIGlmICgheC5yZWQpXG4gICAgeCA9IHgudG9SZWQodGhpcy5yZWQpO1xuXG4gIHZhciB4MiA9IHgucmVkU3FyKCk7XG4gIHZhciByaHMgPSB0aGlzLmMyLnJlZFN1Yih0aGlzLmEucmVkTXVsKHgyKSk7XG4gIHZhciBsaHMgPSB0aGlzLm9uZS5yZWRTdWIodGhpcy5jMi5yZWRNdWwodGhpcy5kKS5yZWRNdWwoeDIpKTtcblxuICB2YXIgeTIgPSByaHMucmVkTXVsKGxocy5yZWRJbnZtKCkpO1xuICB2YXIgeSA9IHkyLnJlZFNxcnQoKTtcbiAgaWYgKHkucmVkU3FyKCkucmVkU3ViKHkyKS5jbXAodGhpcy56ZXJvKSAhPT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcG9pbnQnKTtcblxuICB2YXIgaXNPZGQgPSB5LmZyb21SZWQoKS5pc09kZCgpO1xuICBpZiAob2RkICYmICFpc09kZCB8fCAhb2RkICYmIGlzT2RkKVxuICAgIHkgPSB5LnJlZE5lZygpO1xuXG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHkpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5wb2ludEZyb21ZID0gZnVuY3Rpb24gcG9pbnRGcm9tWSh5LCBvZGQpIHtcbiAgeSA9IG5ldyBCTih5LCAxNik7XG4gIGlmICgheS5yZWQpXG4gICAgeSA9IHkudG9SZWQodGhpcy5yZWQpO1xuXG4gIC8vIHheMiA9ICh5XjIgLSBjXjIpIC8gKGNeMiBkIHleMiAtIGEpXG4gIHZhciB5MiA9IHkucmVkU3FyKCk7XG4gIHZhciBsaHMgPSB5Mi5yZWRTdWIodGhpcy5jMik7XG4gIHZhciByaHMgPSB5Mi5yZWRNdWwodGhpcy5kKS5yZWRNdWwodGhpcy5jMikucmVkU3ViKHRoaXMuYSk7XG4gIHZhciB4MiA9IGxocy5yZWRNdWwocmhzLnJlZEludm0oKSk7XG5cbiAgaWYgKHgyLmNtcCh0aGlzLnplcm8pID09PSAwKSB7XG4gICAgaWYgKG9kZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwb2ludCcpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLnBvaW50KHRoaXMuemVybywgeSk7XG4gIH1cblxuICB2YXIgeCA9IHgyLnJlZFNxcnQoKTtcbiAgaWYgKHgucmVkU3FyKCkucmVkU3ViKHgyKS5jbXAodGhpcy56ZXJvKSAhPT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcG9pbnQnKTtcblxuICBpZiAoeC5mcm9tUmVkKCkuaXNPZGQoKSAhPT0gb2RkKVxuICAgIHggPSB4LnJlZE5lZygpO1xuXG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHkpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIHZhbGlkYXRlKHBvaW50KSB7XG4gIGlmIChwb2ludC5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgLy8gQ3VydmU6IEEgKiBYXjIgKyBZXjIgPSBDXjIgKiAoMSArIEQgKiBYXjIgKiBZXjIpXG4gIHBvaW50Lm5vcm1hbGl6ZSgpO1xuXG4gIHZhciB4MiA9IHBvaW50LngucmVkU3FyKCk7XG4gIHZhciB5MiA9IHBvaW50LnkucmVkU3FyKCk7XG4gIHZhciBsaHMgPSB4Mi5yZWRNdWwodGhpcy5hKS5yZWRBZGQoeTIpO1xuICB2YXIgcmhzID0gdGhpcy5jMi5yZWRNdWwodGhpcy5vbmUucmVkQWRkKHRoaXMuZC5yZWRNdWwoeDIpLnJlZE11bCh5MikpKTtcblxuICByZXR1cm4gbGhzLmNtcChyaHMpID09PSAwO1xufTtcblxuZnVuY3Rpb24gUG9pbnQoY3VydmUsIHgsIHksIHosIHQpIHtcbiAgQmFzZS5CYXNlUG9pbnQuY2FsbCh0aGlzLCBjdXJ2ZSwgJ3Byb2plY3RpdmUnKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeSA9PT0gbnVsbCAmJiB6ID09PSBudWxsKSB7XG4gICAgdGhpcy54ID0gdGhpcy5jdXJ2ZS56ZXJvO1xuICAgIHRoaXMueSA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMueiA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMudCA9IHRoaXMuY3VydmUuemVybztcbiAgICB0aGlzLnpPbmUgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMueCA9IG5ldyBCTih4LCAxNik7XG4gICAgdGhpcy55ID0gbmV3IEJOKHksIDE2KTtcbiAgICB0aGlzLnogPSB6ID8gbmV3IEJOKHosIDE2KSA6IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMudCA9IHQgJiYgbmV3IEJOKHQsIDE2KTtcbiAgICBpZiAoIXRoaXMueC5yZWQpXG4gICAgICB0aGlzLnggPSB0aGlzLngudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgIGlmICghdGhpcy55LnJlZClcbiAgICAgIHRoaXMueSA9IHRoaXMueS50b1JlZCh0aGlzLmN1cnZlLnJlZCk7XG4gICAgaWYgKCF0aGlzLnoucmVkKVxuICAgICAgdGhpcy56ID0gdGhpcy56LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICBpZiAodGhpcy50ICYmICF0aGlzLnQucmVkKVxuICAgICAgdGhpcy50ID0gdGhpcy50LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICB0aGlzLnpPbmUgPSB0aGlzLnogPT09IHRoaXMuY3VydmUub25lO1xuXG4gICAgLy8gVXNlIGV4dGVuZGVkIGNvb3JkaW5hdGVzXG4gICAgaWYgKHRoaXMuY3VydmUuZXh0ZW5kZWQgJiYgIXRoaXMudCkge1xuICAgICAgdGhpcy50ID0gdGhpcy54LnJlZE11bCh0aGlzLnkpO1xuICAgICAgaWYgKCF0aGlzLnpPbmUpXG4gICAgICAgIHRoaXMudCA9IHRoaXMudC5yZWRNdWwodGhpcy56LnJlZEludm0oKSk7XG4gICAgfVxuICB9XG59XG5pbmhlcml0cyhQb2ludCwgQmFzZS5CYXNlUG9pbnQpO1xuXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLnBvaW50RnJvbUpTT04gPSBmdW5jdGlvbiBwb2ludEZyb21KU09OKG9iaikge1xuICByZXR1cm4gUG9pbnQuZnJvbUpTT04odGhpcywgb2JqKTtcbn07XG5cbkVkd2FyZHNDdXJ2ZS5wcm90b3R5cGUucG9pbnQgPSBmdW5jdGlvbiBwb2ludCh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiBuZXcgUG9pbnQodGhpcywgeCwgeSwgeiwgdCk7XG59O1xuXG5Qb2ludC5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKGN1cnZlLCBvYmopIHtcbiAgcmV0dXJuIG5ldyBQb2ludChjdXJ2ZSwgb2JqWzBdLCBvYmpbMV0sIG9ialsyXSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gJzxFQyBQb2ludCBJbmZpbml0eT4nO1xuICByZXR1cm4gJzxFQyBQb2ludCB4OiAnICsgdGhpcy54LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB5OiAnICsgdGhpcy55LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB6OiAnICsgdGhpcy56LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgKyAnPic7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuaXNJbmZpbml0eSA9IGZ1bmN0aW9uIGlzSW5maW5pdHkoKSB7XG4gIC8vIFhYWCBUaGlzIGNvZGUgYXNzdW1lcyB0aGF0IHplcm8gaXMgYWx3YXlzIHplcm8gaW4gcmVkXG4gIHJldHVybiB0aGlzLnguY21wbigwKSA9PT0gMCAmJlxuICAgICh0aGlzLnkuY21wKHRoaXMueikgPT09IDAgfHxcbiAgICAodGhpcy56T25lICYmIHRoaXMueS5jbXAodGhpcy5jdXJ2ZS5jKSA9PT0gMCkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLl9leHREYmwgPSBmdW5jdGlvbiBfZXh0RGJsKCkge1xuICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tdHdpc3RlZC1leHRlbmRlZC0xLmh0bWxcbiAgLy8gICAgICNkb3VibGluZy1kYmwtMjAwOC1od2NkXG4gIC8vIDRNICsgNFNcblxuICAvLyBBID0gWDFeMlxuICB2YXIgYSA9IHRoaXMueC5yZWRTcXIoKTtcbiAgLy8gQiA9IFkxXjJcbiAgdmFyIGIgPSB0aGlzLnkucmVkU3FyKCk7XG4gIC8vIEMgPSAyICogWjFeMlxuICB2YXIgYyA9IHRoaXMuei5yZWRTcXIoKTtcbiAgYyA9IGMucmVkSUFkZChjKTtcbiAgLy8gRCA9IGEgKiBBXG4gIHZhciBkID0gdGhpcy5jdXJ2ZS5fbXVsQShhKTtcbiAgLy8gRSA9IChYMSArIFkxKV4yIC0gQSAtIEJcbiAgdmFyIGUgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkU3FyKCkucmVkSVN1YihhKS5yZWRJU3ViKGIpO1xuICAvLyBHID0gRCArIEJcbiAgdmFyIGcgPSBkLnJlZEFkZChiKTtcbiAgLy8gRiA9IEcgLSBDXG4gIHZhciBmID0gZy5yZWRTdWIoYyk7XG4gIC8vIEggPSBEIC0gQlxuICB2YXIgaCA9IGQucmVkU3ViKGIpO1xuICAvLyBYMyA9IEUgKiBGXG4gIHZhciBueCA9IGUucmVkTXVsKGYpO1xuICAvLyBZMyA9IEcgKiBIXG4gIHZhciBueSA9IGcucmVkTXVsKGgpO1xuICAvLyBUMyA9IEUgKiBIXG4gIHZhciBudCA9IGUucmVkTXVsKGgpO1xuICAvLyBaMyA9IEYgKiBHXG4gIHZhciBueiA9IGYucmVkTXVsKGcpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnksIG56LCBudCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX3Byb2pEYmwgPSBmdW5jdGlvbiBfcHJvakRibCgpIHtcbiAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXR3aXN0ZWQtcHJvamVjdGl2ZS5odG1sXG4gIC8vICAgICAjZG91YmxpbmctZGJsLTIwMDgtYmJqbHBcbiAgLy8gICAgICNkb3VibGluZy1kYmwtMjAwNy1ibFxuICAvLyBhbmQgb3RoZXJzXG4gIC8vIEdlbmVyYWxseSAzTSArIDRTIG9yIDJNICsgNFNcblxuICAvLyBCID0gKFgxICsgWTEpXjJcbiAgdmFyIGIgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkU3FyKCk7XG4gIC8vIEMgPSBYMV4yXG4gIHZhciBjID0gdGhpcy54LnJlZFNxcigpO1xuICAvLyBEID0gWTFeMlxuICB2YXIgZCA9IHRoaXMueS5yZWRTcXIoKTtcblxuICB2YXIgbng7XG4gIHZhciBueTtcbiAgdmFyIG56O1xuICBpZiAodGhpcy5jdXJ2ZS50d2lzdGVkKSB7XG4gICAgLy8gRSA9IGEgKiBDXG4gICAgdmFyIGUgPSB0aGlzLmN1cnZlLl9tdWxBKGMpO1xuICAgIC8vIEYgPSBFICsgRFxuICAgIHZhciBmID0gZS5yZWRBZGQoZCk7XG4gICAgaWYgKHRoaXMuek9uZSkge1xuICAgICAgLy8gWDMgPSAoQiAtIEMgLSBEKSAqIChGIC0gMilcbiAgICAgIG54ID0gYi5yZWRTdWIoYykucmVkU3ViKGQpLnJlZE11bChmLnJlZFN1Yih0aGlzLmN1cnZlLnR3bykpO1xuICAgICAgLy8gWTMgPSBGICogKEUgLSBEKVxuICAgICAgbnkgPSBmLnJlZE11bChlLnJlZFN1YihkKSk7XG4gICAgICAvLyBaMyA9IEZeMiAtIDIgKiBGXG4gICAgICBueiA9IGYucmVkU3FyKCkucmVkU3ViKGYpLnJlZFN1YihmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSCA9IFoxXjJcbiAgICAgIHZhciBoID0gdGhpcy56LnJlZFNxcigpO1xuICAgICAgLy8gSiA9IEYgLSAyICogSFxuICAgICAgdmFyIGogPSBmLnJlZFN1YihoKS5yZWRJU3ViKGgpO1xuICAgICAgLy8gWDMgPSAoQi1DLUQpKkpcbiAgICAgIG54ID0gYi5yZWRTdWIoYykucmVkSVN1YihkKS5yZWRNdWwoaik7XG4gICAgICAvLyBZMyA9IEYgKiAoRSAtIEQpXG4gICAgICBueSA9IGYucmVkTXVsKGUucmVkU3ViKGQpKTtcbiAgICAgIC8vIFozID0gRiAqIEpcbiAgICAgIG56ID0gZi5yZWRNdWwoaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEUgPSBDICsgRFxuICAgIHZhciBlID0gYy5yZWRBZGQoZCk7XG4gICAgLy8gSCA9IChjICogWjEpXjJcbiAgICB2YXIgaCA9IHRoaXMuY3VydmUuX211bEModGhpcy56KS5yZWRTcXIoKTtcbiAgICAvLyBKID0gRSAtIDIgKiBIXG4gICAgdmFyIGogPSBlLnJlZFN1YihoKS5yZWRTdWIoaCk7XG4gICAgLy8gWDMgPSBjICogKEIgLSBFKSAqIEpcbiAgICBueCA9IHRoaXMuY3VydmUuX211bEMoYi5yZWRJU3ViKGUpKS5yZWRNdWwoaik7XG4gICAgLy8gWTMgPSBjICogRSAqIChDIC0gRClcbiAgICBueSA9IHRoaXMuY3VydmUuX211bEMoZSkucmVkTXVsKGMucmVkSVN1YihkKSk7XG4gICAgLy8gWjMgPSBFICogSlxuICAgIG56ID0gZS5yZWRNdWwoaik7XG4gIH1cbiAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobngsIG55LCBueik7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZGJsID0gZnVuY3Rpb24gZGJsKCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gRG91YmxlIGluIGV4dGVuZGVkIGNvb3JkaW5hdGVzXG4gIGlmICh0aGlzLmN1cnZlLmV4dGVuZGVkKVxuICAgIHJldHVybiB0aGlzLl9leHREYmwoKTtcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzLl9wcm9qRGJsKCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX2V4dEFkZCA9IGZ1bmN0aW9uIF9leHRBZGQocCkge1xuICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tdHdpc3RlZC1leHRlbmRlZC0xLmh0bWxcbiAgLy8gICAgICNhZGRpdGlvbi1hZGQtMjAwOC1od2NkLTNcbiAgLy8gOE1cblxuICAvLyBBID0gKFkxIC0gWDEpICogKFkyIC0gWDIpXG4gIHZhciBhID0gdGhpcy55LnJlZFN1Yih0aGlzLngpLnJlZE11bChwLnkucmVkU3ViKHAueCkpO1xuICAvLyBCID0gKFkxICsgWDEpICogKFkyICsgWDIpXG4gIHZhciBiID0gdGhpcy55LnJlZEFkZCh0aGlzLngpLnJlZE11bChwLnkucmVkQWRkKHAueCkpO1xuICAvLyBDID0gVDEgKiBrICogVDJcbiAgdmFyIGMgPSB0aGlzLnQucmVkTXVsKHRoaXMuY3VydmUuZGQpLnJlZE11bChwLnQpO1xuICAvLyBEID0gWjEgKiAyICogWjJcbiAgdmFyIGQgPSB0aGlzLnoucmVkTXVsKHAuei5yZWRBZGQocC56KSk7XG4gIC8vIEUgPSBCIC0gQVxuICB2YXIgZSA9IGIucmVkU3ViKGEpO1xuICAvLyBGID0gRCAtIENcbiAgdmFyIGYgPSBkLnJlZFN1YihjKTtcbiAgLy8gRyA9IEQgKyBDXG4gIHZhciBnID0gZC5yZWRBZGQoYyk7XG4gIC8vIEggPSBCICsgQVxuICB2YXIgaCA9IGIucmVkQWRkKGEpO1xuICAvLyBYMyA9IEUgKiBGXG4gIHZhciBueCA9IGUucmVkTXVsKGYpO1xuICAvLyBZMyA9IEcgKiBIXG4gIHZhciBueSA9IGcucmVkTXVsKGgpO1xuICAvLyBUMyA9IEUgKiBIXG4gIHZhciBudCA9IGUucmVkTXVsKGgpO1xuICAvLyBaMyA9IEYgKiBHXG4gIHZhciBueiA9IGYucmVkTXVsKGcpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnksIG56LCBudCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX3Byb2pBZGQgPSBmdW5jdGlvbiBfcHJvakFkZChwKSB7XG4gIC8vIGh5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by10d2lzdGVkLXByb2plY3RpdmUuaHRtbFxuICAvLyAgICAgI2FkZGl0aW9uLWFkZC0yMDA4LWJiamxwXG4gIC8vICAgICAjYWRkaXRpb24tYWRkLTIwMDctYmxcbiAgLy8gMTBNICsgMVNcblxuICAvLyBBID0gWjEgKiBaMlxuICB2YXIgYSA9IHRoaXMuei5yZWRNdWwocC56KTtcbiAgLy8gQiA9IEFeMlxuICB2YXIgYiA9IGEucmVkU3FyKCk7XG4gIC8vIEMgPSBYMSAqIFgyXG4gIHZhciBjID0gdGhpcy54LnJlZE11bChwLngpO1xuICAvLyBEID0gWTEgKiBZMlxuICB2YXIgZCA9IHRoaXMueS5yZWRNdWwocC55KTtcbiAgLy8gRSA9IGQgKiBDICogRFxuICB2YXIgZSA9IHRoaXMuY3VydmUuZC5yZWRNdWwoYykucmVkTXVsKGQpO1xuICAvLyBGID0gQiAtIEVcbiAgdmFyIGYgPSBiLnJlZFN1YihlKTtcbiAgLy8gRyA9IEIgKyBFXG4gIHZhciBnID0gYi5yZWRBZGQoZSk7XG4gIC8vIFgzID0gQSAqIEYgKiAoKFgxICsgWTEpICogKFgyICsgWTIpIC0gQyAtIEQpXG4gIHZhciB0bXAgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkTXVsKHAueC5yZWRBZGQocC55KSkucmVkSVN1YihjKS5yZWRJU3ViKGQpO1xuICB2YXIgbnggPSBhLnJlZE11bChmKS5yZWRNdWwodG1wKTtcbiAgdmFyIG55O1xuICB2YXIgbno7XG4gIGlmICh0aGlzLmN1cnZlLnR3aXN0ZWQpIHtcbiAgICAvLyBZMyA9IEEgKiBHICogKEQgLSBhICogQylcbiAgICBueSA9IGEucmVkTXVsKGcpLnJlZE11bChkLnJlZFN1Yih0aGlzLmN1cnZlLl9tdWxBKGMpKSk7XG4gICAgLy8gWjMgPSBGICogR1xuICAgIG56ID0gZi5yZWRNdWwoZyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gWTMgPSBBICogRyAqIChEIC0gQylcbiAgICBueSA9IGEucmVkTXVsKGcpLnJlZE11bChkLnJlZFN1YihjKSk7XG4gICAgLy8gWjMgPSBjICogRiAqIEdcbiAgICBueiA9IHRoaXMuY3VydmUuX211bEMoZikucmVkTXVsKGcpO1xuICB9XG4gIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG54LCBueSwgbnopO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChwKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gcDtcbiAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGlmICh0aGlzLmN1cnZlLmV4dGVuZGVkKVxuICAgIHJldHVybiB0aGlzLl9leHRBZGQocCk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5fcHJvakFkZChwKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwoaykge1xuICBpZiAodGhpcy5faGFzRG91YmxlcyhrKSlcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZml4ZWROYWZNdWwodGhpcywgayk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fd25hZk11bCh0aGlzLCBrKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiBtdWxBZGQoazEsIHAsIGsyKSB7XG4gIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsQWRkKDEsIFsgdGhpcywgcCBdLCBbIGsxLCBrMiBdLCAyLCBmYWxzZSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuam11bEFkZCA9IGZ1bmN0aW9uIGptdWxBZGQoazEsIHAsIGsyKSB7XG4gIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsQWRkKDEsIFsgdGhpcywgcCBdLCBbIGsxLCBrMiBdLCAyLCB0cnVlKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUoKSB7XG4gIGlmICh0aGlzLnpPbmUpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gTm9ybWFsaXplIGNvb3JkaW5hdGVzXG4gIHZhciB6aSA9IHRoaXMuei5yZWRJbnZtKCk7XG4gIHRoaXMueCA9IHRoaXMueC5yZWRNdWwoemkpO1xuICB0aGlzLnkgPSB0aGlzLnkucmVkTXVsKHppKTtcbiAgaWYgKHRoaXMudClcbiAgICB0aGlzLnQgPSB0aGlzLnQucmVkTXVsKHppKTtcbiAgdGhpcy56ID0gdGhpcy5jdXJ2ZS5vbmU7XG4gIHRoaXMuek9uZSA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm5lZyA9IGZ1bmN0aW9uIG5lZygpIHtcbiAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQodGhpcy54LnJlZE5lZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ICYmIHRoaXMudC5yZWROZWcoKSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uIGdldFgoKSB7XG4gIHRoaXMubm9ybWFsaXplKCk7XG4gIHJldHVybiB0aGlzLnguZnJvbVJlZCgpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbiBnZXRZKCkge1xuICB0aGlzLm5vcm1hbGl6ZSgpO1xuICByZXR1cm4gdGhpcy55LmZyb21SZWQoKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxKG90aGVyKSB7XG4gIHJldHVybiB0aGlzID09PSBvdGhlciB8fFxuICAgICAgICAgdGhpcy5nZXRYKCkuY21wKG90aGVyLmdldFgoKSkgPT09IDAgJiZcbiAgICAgICAgIHRoaXMuZ2V0WSgpLmNtcChvdGhlci5nZXRZKCkpID09PSAwO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmVxWFRvUCA9IGZ1bmN0aW9uIGVxWFRvUCh4KSB7XG4gIHZhciByeCA9IHgudG9SZWQodGhpcy5jdXJ2ZS5yZWQpLnJlZE11bCh0aGlzLnopO1xuICBpZiAodGhpcy54LmNtcChyeCkgPT09IDApXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgdmFyIHhjID0geC5jbG9uZSgpO1xuICB2YXIgdCA9IHRoaXMuY3VydmUucmVkTi5yZWRNdWwodGhpcy56KTtcbiAgZm9yICg7Oykge1xuICAgIHhjLmlhZGQodGhpcy5jdXJ2ZS5uKTtcbiAgICBpZiAoeGMuY21wKHRoaXMuY3VydmUucCkgPj0gMClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJ4LnJlZElBZGQodCk7XG4gICAgaWYgKHRoaXMueC5jbXAocngpID09PSAwKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8vIENvbXBhdGliaWxpdHkgd2l0aCBCYXNlQ3VydmVcblBvaW50LnByb3RvdHlwZS50b1AgPSBQb2ludC5wcm90b3R5cGUubm9ybWFsaXplO1xuUG9pbnQucHJvdG90eXBlLm1peGVkQWRkID0gUG9pbnQucHJvdG90eXBlLmFkZDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBkb3VibGVzOiB7XG4gICAgc3RlcDogNCxcbiAgICBwb2ludHM6IFtcbiAgICAgIFtcbiAgICAgICAgJ2U2MGZjZTkzYjU5ZTllYzUzMDExYWFiYzIxYzIzZTk3YjJhMzEzNjliODdhNWFlOWM0NGVlODllMmE2ZGVjMGEnLFxuICAgICAgICAnZjdlMzUwNzM5OWU1OTU5MjlkYjk5ZjM0ZjU3OTM3MTAxMjk2ODkxZTQ0ZDIzZjBiZTFmMzJjY2U2OTYxNjgyMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4MjgyMjYzMjEyYzYwOWQ5ZWEyYTZlM2UxNzJkZTIzOGQ4YzM5Y2FiZDVhYzFjYTEwNjQ2ZTIzZmQ1ZjUxNTA4JyxcbiAgICAgICAgJzExZjhhODA5ODU1N2RmZTQ1ZTgyNTZlODMwYjYwYWNlNjJkNjEzYWMyZjdiMTdiZWQzMWI2ZWFmZjZlMjZjYWYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTc1ZTE1OWY3MjhiODY1YTcyZjk5Y2M2YzZmYzg0NmRlMGI5MzgzM2ZkMjIyMmVkNzNmY2U1YjU1MWU1YjczOScsXG4gICAgICAgICdkMzUwNmUwZDllM2M3OWViYTRlZjk3YTUxZmY3MWY1ZWFjYjU5NTVhZGQyNDM0NWM2ZWZhNmZmZWU5ZmVkNjk1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM2M2Q5MGQ0NDdiMDBjOWM5OWNlYWMwNWI2MjYyZWUwNTM0NDFjN2U1NTU1MmZmZTUyNmJhZDhmODNmZjQ2NDAnLFxuICAgICAgICAnNGUyNzNhZGZjNzMyMjIxOTUzYjQ0NTM5N2YzMzYzMTQ1YjlhODkwMDgxOTllY2I2MjAwM2M3ZjNiZWU5ZGU5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhiNGI1ZjE2NWRmM2MyYmU4YzYyNDRiNWI3NDU2Mzg4NDNlNGE3ODFhMTViY2QxYjY5Zjc5YTU1ZGZmZGY4MGMnLFxuICAgICAgICAnNGFhZDBhNmY2OGQzMDhiNGIzZmJkNzgxM2FiMGRhMDRmOWUzMzY1NDYxNjJlZTU2YjNlZmYwYzY1ZmQ0ZmQzNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3MjNjYmFhNmU1ZGI5OTZkNmJmNzcxYzAwYmQ1NDhjN2I3MDBkYmZmYTZjMGU3N2JjYjYxMTU5MjUyMzJmY2RhJyxcbiAgICAgICAgJzk2ZTg2N2I1NTk1Y2M0OThhOTIxMTM3NDg4ODI0ZDZlMjY2MGEwNjUzNzc5NDk0ODAxZGMwNjlkOWViMzlmNWYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZWViZmE0ZDQ5M2JlYmY5OGJhNWZlZWM4MTJjMmQzYjUwOTQ3OTYxMjM3YTkxOTgzOWE1MzNlY2EwZTdkZDdmYScsXG4gICAgICAgICc1ZDlhOGNhMzk3MGVmMGYyNjllZTdlZGFmMTc4MDg5ZDlhZTRjZGMzYTcxMWY3MTJkZGZkNGZkYWUxZGU4OTk5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzEwMGY0NGRhNjk2ZTcxNjcyNzkxZDBhMDliN2JkZTQ1OWYxMjE1YTI5YjNjMDNiZmVmZDc4MzViMzlhNDhkYjAnLFxuICAgICAgICAnY2RkOWUxMzE5MmEwMGI3NzJlYzhmMzMwMGMwOTA2NjZiN2ZmNGExOGZmNTE5NWFjMGZiZDVjZDYyYmM2NWEwOSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlMTAzMWJlMjYyYzdlZDFiMWRjOTIyN2E0YTA0YzAxN2E3N2Y4ZDQ0NjRmM2IzODUyYzhhY2RlNmU1MzRmZDJkJyxcbiAgICAgICAgJzlkNzA2MTkyODk0MDQwNWU2YmI2YTQxNzY1OTc1MzVhZjI5MmRkNDE5ZTFjZWQ3OWE0NGYxOGYyOTQ1NmEwMGQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZmVlYTZjYWU0NmQ1NWI1MzBhYzI4MzlmMTQzYmQ3ZWM1Y2Y4YjI2NmE0MWQ2YWY1MmQ1ZTY4OGQ5MDk0Njk2ZCcsXG4gICAgICAgICdlNTdjNmI2Yzk3ZGNlMWJhYjA2ZTRlMTJiZjNlY2Q1Yzk4MWM4OTU3Y2M0MTQ0MmQzMTU1ZGViZjE4MDkwMDg4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2RhNjdhOTFkOTEwNDljZGNiMzY3YmU0YmU2ZmZjYTNjZmVlZDY1N2Q4MDg1ODNkZTMzZmE5NzhiYzFlYzZjYjEnLFxuICAgICAgICAnOWJhY2FhMzU0ODE2NDJiYzQxZjQ2M2Y3ZWM5NzgwZTVkZWM3YWRjNTA4Zjc0MGExN2U5ZWE4ZTI3YTY4YmUxZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc1MzkwNGZhYTBiMzM0Y2RkYTZlMDAwOTM1ZWYyMjE1MWVjMDhkMGY3YmIxMTA2OWY1NzU0NWNjYzFhMzdiN2MwJyxcbiAgICAgICAgJzViYzA4N2QwYmM4MDEwNmQ4OGM5ZWNjYWMyMGQzYzFjMTM5OTk5ODFlMTQ0MzQ2OTlkY2IwOTZiMDIyNzcxYzgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGU3YmNkMGJkMzU5ODNhNzcxOWNjYTc3NjRjYTkwNjc3OWI1M2EwNDNhOWI4YmNhZWZmOTU5ZjQzYWQ4NjA0NycsXG4gICAgICAgICcxMGI3NzcwYjJhM2RhNGIzOTQwMzEwNDIwY2E5NTE0NTc5ZTg4ZTJlNDdmZDY4YjNlYTEwMDQ3ZTg0NjAzNzJhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM4NWVlZDM0YzFjZGZmMjFlNmQwODE4Njg5YjgxYmRlNzFhN2Y0ZjE4Mzk3ZTY2OTBhODQxZTE1OTljNDM4NjInLFxuICAgICAgICAnMjgzYmViYzNlOGVhMjNmNTY3MDFkZTE5ZTllYmY0NTc2YjMwNGVlYzIwODZkYzhjYzA0NThmZTU1NDJlNTQ1MydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2ZjlkOWI4MDNlY2YxOTE2MzdjNzNhNDQxM2RmYTE4MGZkZGY4NGE1OTQ3ZmJjOWM2MDZlZDg2YzNmYWMzYTcnLFxuICAgICAgICAnN2M4MGM2OGU2MDMwNTliYTY5YjhlMmEzMGU0NWM0ZDQ3ZWE0ZGQyZjVjMjgxMDAyZDg2ODkwNjAzYTg0MjE2MCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczMzIyZDQwMTI0M2M0ZTI1ODJhMjE0N2MxMDRkNmVjYmY3NzRkMTYzZGIwZjVlNTMxM2I3ZTBlNzQyZDBlNmJkJyxcbiAgICAgICAgJzU2ZTcwNzk3ZTk2NjRlZjViZmIwMTliYzRkZGFmOWI3MjgwNWY2M2VhMjg3M2FmNjI0ZjNhMmU5NmMyOGIyYTAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODU2NzJjN2QyZGUwYjdkYTJiZDE3NzBkODk2NjU4Njg3NDFiM2Y5YWY3NjQzMzk3NzIxZDc0ZDI4MTM0YWI4MycsXG4gICAgICAgICc3YzQ4MWI5YjViNDNiMmViNjM3NDA0OWJmYTYyYzJlNWU3N2YxN2ZjYzUyOThmNDRjOGUzMDk0Zjc5MDMxM2E2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzk0OGJmODA5YjE5ODhhNDZiMDZjOWYxOTE5NDEzYjEwZjkyMjZjNjBmNjY4ODMyZmZkOTU5YWY2MGM4MmEwYScsXG4gICAgICAgICc1M2E1NjI4NTZkY2I2NjQ2ZGM2Yjc0YzVkMWMzNDE4YzZkNGRmZjA4Yzk3Y2QyYmVkNGNiN2Y4OGQ4YzhlNTg5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzYyNjBjZTdmNDYxODAxYzM0ZjA2N2NlMGYwMjg3M2E4ZjFiMGU0NGRmYzY5NzUyYWNjZWNkODE5ZjM4ZmQ4ZTgnLFxuICAgICAgICAnYmMyZGE4MmI2ZmE1YjU3MWE3ZjA5MDQ5Nzc2YTFlZjdlY2QyOTIyMzgwNTFjMTk4YzFhODRlOTViMmI0YWUxNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlNTAzN2RlMGFmYzFkOGQ0M2Q4MzQ4NDE0YmJmNDEwMzA0M2VjOGY1NzViZmRjNDMyOTUzY2M4ZDIwMzdmYTJkJyxcbiAgICAgICAgJzQ1NzE1MzRiYWE5NGQzYjVmOWY5OGQwOWZiOTkwYmRkYmQ1ZjViMDNlYzQ4MWYxMGUwZTVkYzg0MWQ3NTViZGEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTA2MzcyYjBmNGEyMDdhZGY1ZWE5MDVlOGYxNzcxYjRlN2U4ZGJkMWM2YTZjNWI3MjU4NjZhMGFlNGZjZTcyNScsXG4gICAgICAgICc3YTkwODk3NGJjZTE4Y2ZlMTJhMjdiYjJhZDVhNDg4Y2Q3NDg0YTc3ODcxMDQ4NzBiMjcwMzRmOTRlZWUzMWRkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzIxM2M3YTcxNWNkNWQ0NTM1OGQwYmJmOWRjMGNlMDIyMDRiMTBiZGRlMmEzZjU4NTQwYWQ2OTA4ZDA1NTk3NTQnLFxuICAgICAgICAnNGI2ZGFkMGI1YWU0NjI1MDcwMTNhZDA2MjQ1YmExOTBiYjQ4NTBmNWYzNmE3ZWVkZGZmMmMyNzUzNGI0NThmMidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc0ZTdjMjcyYTdhZjRiMzRlOGRiYjkzNTJhNTQxOWE4N2UyODM4YzcwYWRjNjJjZGRmMGNjM2EzYjA4ZmJkNTNjJyxcbiAgICAgICAgJzE3NzQ5Yzc2NmM5ZDBiMThlMTZmZDA5ZjZkZWY2ODFiNTMwYjk2MTRiZmY3ZGQzM2UwYjM5NDE4MTdkY2FhZTYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZmVhNzRlM2RiZTc3OGIxYjEwZjIzOGFkNjE2ODZhYTVjNzZlM2RiMmJlNDMwNTc2MzI0MjdlMjg0MGZiMjdiNicsXG4gICAgICAgICc2ZTA1NjhkYjliMGIxMzI5N2NmNjc0ZGVjY2I2YWY5MzEyNmI1OTZiOTczZjdiNzc3MDFkM2RiN2YyM2NiOTZmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc2ZTY0MTEzZjY3N2NmMGUxMGEyNTcwZDU5OTk2OGQzMTU0NGUxNzliNzYwNDMyOTUyYzAyYTQ0MTdiZGRlMzknLFxuICAgICAgICAnYzkwZGRmOGRlZTRlOTVjZjU3NzA2NmQ3MDY4MWYwZDM1ZTJhMzNkMmI1NmQyMDMyYjRiMTc1MmQxOTAxYWMwMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdjNzM4YzU2YjAzYjJhYmUxZTgyODFiYWE3NDNmOGY5YThmN2NjNjQzZGYyNmNiZWUzYWIxNTAyNDJiY2JiODkxJyxcbiAgICAgICAgJzg5M2ZiNTc4OTUxYWQyNTM3ZjcxOGYyZWFjYmZiYmJiODIzMTRlZWY3ODgwY2ZlOTE3ZTczNWQ5Njk5YTg0YzMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDg5NTYyNjU0OGI2NWI4MWUyNjRjNzYzN2M5NzI4NzdkMWQ3MmU1ZjNhOTI1MDE0MzcyZTlmNjU4OGY2YzE0YicsXG4gICAgICAgICdmZWJmYWEzOGYyYmM3ZWFlNzI4ZWM2MDgxOGMzNDBlYjAzNDI4ZDYzMmJiMDY3ZTE3OTM2M2VkNzVkN2Q5OTFmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2I4ZGE5NDAzMmE5NTc1MThlYjBmNjQzMzU3MWU4NzYxY2VmZmM3MzY5M2U4NGVkZDQ5MTUwYTU2NGY2NzZlMDMnLFxuICAgICAgICAnMjgwNGRmYTQ0ODA1YTFlNGQ3Yzk5Y2M5NzYyODA4YjA5MmNjNTg0ZDk1ZmYzYjUxMTQ4OGU0ZTc0ZWZkZjZlNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlODBmZWExNDQ0MWZiMzNhN2Q4YWRhYjk0NzVkN2ZhYjIwMTllZmZiNTE1NmE3OTJmMWExMTc3OGUzYzBkZjVkJyxcbiAgICAgICAgJ2VlZDFkZTdmNjM4ZTAwNzcxZTg5NzY4Y2EzY2E5NDQ3MmQxNTVlODBhZjMyMmVhOWZjYjQyOTFiNmFjOWVjNzgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYTMwMTY5N2JkZmNkNzA0MzEzYmE0OGU1MWQ1Njc1NDNmMmExODIwMzFlZmQ2OTE1ZGRjMDdiYmNjNGUxNjA3MCcsXG4gICAgICAgICc3MzcwZjkxY2ZiNjdlNGY1MDgxODA5ZmEyNWQ0MGY5YjE3MzVkYmY3YzBhMTFhMTMwYzBkMWEwNDFlMTc3ZWExJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzkwYWQ4NWIzODlkNmI5MzY0NjNmOWQwNTEyNjc4ZGUyMDhjYzMzMGIxMTMwN2ZmZmFiN2FjNjNlM2ZiMDRlZDQnLFxuICAgICAgICAnZTUwN2EzNjIwYTM4MjYxYWZmZGNiZDk0MjcyMjJiODM5YWVmYWJlMTU4Mjg5NGQ5OTFkNGQ0OGNiNmVmMTUwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhmNjhiOWQyZjYzYjVmMzM5MjM5YzFhZDk4MWYxNjJlZTg4YzU2Nzg3MjNlYTMzNTFiN2I0NDRjOWVjNGMwZGEnLFxuICAgICAgICAnNjYyYTlmMmRiYTA2Mzk4NmRlMWQ5MGMyYjZiZTIxNWRiYmVhMmNmZTk1NTEwYmZkZjIzY2JmNzk1MDFmZmY4MidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlNGYzZmIwMTc2YWY4NWQ2NWZmOTlmZjkxOThjMzYwOTFmNDhlODY1MDM2ODFlM2U2Njg2ZmQ1MDUzMjMxZTExJyxcbiAgICAgICAgJzFlNjM2MzNhZDBlZjRmMWMxNjYxYTZkMGVhMDJiNzI4NmNjN2U3NGVjOTUxZDFjOTgyMmMzODU3NmZlYjczYmMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGMwMGZhOWIxOGViZjMzMWViOTYxNTM3YTQ1YTQyNjZjNzAzNGYyZjBkNGUxZDA3MTZmYjZlYWUyMGVhZTI5ZScsXG4gICAgICAgICdlZmE0NzI2N2ZlYTUyMWExYTlkYzM0M2EzNzM2Yzk3NGMyZmFkYWZhODFlMzZjNTRlN2QyYTRjNjY3MDI0MTRiJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2U3YTI2Y2U2OWRkNDgyOWYzZTEwY2VjMGE5ZTk4ZWQzMTQzZDA4NGYzMDhiOTJjMDk5N2ZkZGZjNjBjYjNlNDEnLFxuICAgICAgICAnMmE3NThlMzAwZmE3OTg0YjQ3MWIwMDZhMWFhZmJiMThkMGE2YjJjMDQyMGU4M2UyMGU4YTk0MjFjZjJjZmQ1MSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiNjQ1OWUwZWUzNjYyZWM4ZDIzNTQwYzIyM2JjYmRjNTcxY2JjYjk2N2Q3OTQyNGYzY2YyOWViM2RlNmI4MGVmJyxcbiAgICAgICAgJzY3Yzg3NmQwNmYzZTA2ZGUxZGFkZjE2ZTU2NjFkYjNjNGIzYWU2ZDQ4ZTM1YjJmZjMwYmYwYjYxYTcxYmE0NSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkNjhhODBjODI4MGJiODQwNzkzMjM0YWExMThmMDYyMzFkNmYxZmM2N2U3M2M1YTVkZWRhMGY1YjQ5Njk0M2U4JyxcbiAgICAgICAgJ2RiOGJhOWZmZjRiNTg2ZDAwYzRiMWY5MTc3YjBlMjhiNWIwZTdiOGY3ODQ1Mjk1YTI5NGM4NDI2NmIxMzMxMjAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzI0YWVkN2RmNjVjODA0MjUyZGMwMjcwOTA3YTMwYjA5NjEyYWViOTczNDQ5Y2VhNDA5NTk4MGZjMjhkM2Q1ZCcsXG4gICAgICAgICc2NDhhMzY1Nzc0YjYxZjJmZjEzMGMwYzM1YWVjMWY0ZjE5MjEzYjBjN2UzMzI4NDM5NjcyMjRhZjk2YWI3Yzg0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzRkZjljMTQ5MTljZGU2MWY2ZDUxZGZkYmU1ZmVlNWRjZWVjNDE0M2JhOGQxY2E4ODhlOGJkMzczZmQwNTRjOTYnLFxuICAgICAgICAnMzVlYzUxMDkyZDg3MjgwNTA5NzRjMjNhMWQ4NWQ0YjVkNTA2Y2RjMjg4NDkwMTkyZWJhYzA2Y2FkMTBkNWQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOWMzOTE5YTg0YTQ3NDg3MGZhZWQ4YTljMWNjNjYwMjE1MjM0ODkwNTRkN2YwMzA4Y2JmYzk5YzhhYzFmOThjZCcsXG4gICAgICAgICdkZGI4NGYwZjRhNGRkZDU3NTg0ZjA0NGJmMjYwZTY0MTkwNTMyNmY3NmM2NGM4ZTZiZTdlNWUwM2Q0ZmM1OTlkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzYwNTcxNzBiMWRkMTJmZGY4ZGUwNWYyODFkOGUwNmJiOTFlMTQ5M2E4YjkxZDRjYzVhMjEzODIxMjBhOTU5ZTUnLFxuICAgICAgICAnOWExYWYwYjI2YTZhNDgwN2FkZDlhMmRhZjcxZGYyNjI0NjUxNTJiYzNlZTI0YzY1ZTg5OWJlOTMyMzg1YTJhOCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhNTc2ZGY4ZTIzYTA4NDExNDIxNDM5YTQ1MThkYTMxODgwY2VmMGZiYTdkNGRmMTJiMWE2OTczZWVjYjk0MjY2JyxcbiAgICAgICAgJzQwYTZiZjIwZTc2NjQwYjJjOTJiOTdhZmU1OGNkODJjNDMyZTEwYTdmNTE0ZDlmM2VlOGJlMTFhZTFiMjhlYzgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzc3OGE3OGMyOGRlYzNlMzBhMDVmZTk2MjlkZThjMzhiYjMwZDFmNWNmOWEzYTIwOGY3NjM4ODliZTU4YWQ3MScsXG4gICAgICAgICczNDYyNmQ5YWI1YTViMjJmZjcwOThlMTJmMmZmNTgwMDg3YjM4NDExZmYyNGFjNTYzYjUxM2ZjMWZkOWY0M2FjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzkyODk1NWVlNjM3YTg0NDYzNzI5ZmQzMGU3YWZkMmVkNWY5NjI3NGU1YWQ3ZTVjYjA5ZWRhOWMwNmQ5MDNhYycsXG4gICAgICAgICdjMjU2MjEwMDNkM2Y0MmE4MjdiNzhhMTMwOTNhOTVlZWFjM2QyNmVmYThhOGQ4M2ZjNTE4MGU5MzViY2QwOTFmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzg1ZDBmZWYzZWM2ZGIxMDkzOTkwNjRmM2EwZTNiMjg1NTY0NWI0YTkwN2FkMzU0NTI3YWFlNzUxNjNkODI3NTEnLFxuICAgICAgICAnMWYwMzY0ODQxM2EzOGMwYmUyOWQ0OTZlNTgyY2Y1NjYzZTg3NTFlOTY4NzczMzE1ODJjMjM3YTI0ZWIxZjk2MidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmZjJiMGRjZTk3ZWVjZTk3YzFjOWI2MDQxNzk4Yjg1ZGZkZmI2ZDg4ODJkYTIwMzA4ZjU0MDQ4MjQ1MjYwODdlJyxcbiAgICAgICAgJzQ5M2QxM2ZlZjUyNGJhMTg4YWY0YzRkYzU0ZDA3OTM2YzdiN2VkNmZiOTBlMmNlYjJjOTUxZTAxZjBjMjk5MDcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODI3ZmJiZTRiMWU4ODBlYTllZDJiMmU2MzAxYjIxMmI1N2YxZWUxNDhjZDZkZDI4NzgwZTVlMmNmODU2ZTI0MScsXG4gICAgICAgICdjNjBmOWM5MjNjNzI3YjBiNzFiZWYyYzY3ZDFkMTI2ODdmZjdhNjMxODY5MDMxNjZkNjA1YjY4YmFlYzI5M2VjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2VhYTY0OWYyMWY1MWJkYmFlN2JlNGFlMzRjZTZlNTIxN2E1OGZkY2U3ZjQ3ZjlhYTdmM2I1OGZhMjEyMGUyYjMnLFxuICAgICAgICAnYmUzMjc5ZWQ1YmJiYjAzYWM2OWE4MGY4OTg3OWFhNWEwMWE2Yjk2NWYxM2Y3ZTU5ZDQ3YTUzMDViYTVhZDkzZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlNGE0MmQ0M2M1Y2YxNjlkOTM5MWRmNmRlY2Y0MmVlNTQxYjZkOGYwYzlhMTM3NDAxZTIzNjMyZGRhMzRkMjRmJyxcbiAgICAgICAgJzRkOWY5MmU3MTZkMWM3MzUyNmZjOTljY2ZiOGFkMzRjZTg4NmVlZGZhOGQ4ZTRmMTNhN2Y3MTMxZGViYTk0MTQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMWVjODBmZWYzNjBjYmRkOTU0MTYwZmFkYWIzNTJiNmI5MmI1MzU3NmE4OGZlYTQ5NDcxNzNiOWQ0MzAwYmYxOScsXG4gICAgICAgICdhZWVmZTkzNzU2YjUzNDBkMmYzYTQ5NThhN2FiYmY1ZTAxNDZlNzdmNjI5NWEwN2I2NzFjZGMxY2MxMDdjZWZkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE0NmE3NzhjMDQ2NzBjMmY5MWIwMGFmNDY4MGRmYThiY2UzNDkwNzE3ZDU4YmE4ODlkZGI1OTI4MzY2NjQyYmUnLFxuICAgICAgICAnYjMxOGUwZWMzMzU0MDI4YWRkNjY5ODI3ZjlkNGIyODcwYWFhOTcxZDJmN2U1ZWQxZDBiMjk3NDgzZDgzZWZkMCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmYTUwYzBmNjFkMjJlNWYwN2UzYWNlYmIxYWEwN2IxMjhkMDAxMjIwOWEyOGI5Nzc2ZDc2YTg3OTMxODBlZWY5JyxcbiAgICAgICAgJzZiODRjNjkyMjM5N2ViYTliNzJjZDI4NzIyODFhNjhhNWU2ODMyOTNhNTdhMjEzYjM4Y2Q4ZDdkM2Y0ZjI4MTEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZGExZDYxZDBjYTcyMWExMWIxYTViZjZiN2Q4OGU4NDIxYTI4OGFiNWQ1YmJhNTIyMGU1M2QzMmI1ZjA2N2VjMicsXG4gICAgICAgICc4MTU3ZjU1YTdjOTkzMDZjNzljMDc2NjE2MWM5MWUyOTY2YTczODk5ZDI3OWI0OGE2NTVmYmEwZjFhZDgzNmYxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2E4ZTI4MmZmMGM5NzA2OTA3MjE1ZmY5OGU4ZmQ0MTY2MTUzMTFkZTA0NDZmMWUwNjJhNzNiMDYxMGQwNjRlMTMnLFxuICAgICAgICAnN2Y5NzM1NWI4ZGI4MWMwOWFiZmI3ZjNjNWIyNTE1ODg4YjY3OWEzZTUwZGQ2YmQ2Y2VmN2M3MzExMWY0Y2MwYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNzRhNTNiOWM5YTI4NTg3MmQzOWU1NmU2OTEzY2FiMTVkNTliMWZhNTEyNTA4YzAyMmYzODJkZTgzMTk0OTdjJyxcbiAgICAgICAgJ2NjYzlkYzM3YWJmYzljMTY1N2I0MTU1ZjJjNDdmOWU2NjQ2YjNhMWQ4Y2I5ODU0MzgzZGExM2FjMDc5YWZhNzMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOTU5Mzk2OTgxOTQzNzg1YzNkM2U1N2VkZjUwMThjZGJlMDM5ZTczMGU0OTE4YjNkODg0ZmRmZjA5NDc1YjdiYScsXG4gICAgICAgICcyZTdlNTUyODg4YzMzMWRkOGJhMDM4NmE0YjljZDY4NDljNjUzZjY0Yzg3MDkzODVlOWI4YWJmODc1MjRmMmZkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2QyYTYzYTUwYWU0MDFlNTZkNjQ1YTExNTNiMTA5YThmY2NhMGE0M2Q1NjFmYmEyZGJiNTEzNDBjOWQ4MmIxNTEnLFxuICAgICAgICAnZTgyZDg2ZmI2NDQzZmNiNzU2NWFlZTU4YjI5NDgyMjBhNzBmNzUwYWY0ODRjYTUyZDQxNDIxNzRkY2Y4OTQwNSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2NDU4N2UyMzM1NDcxZWI4OTBlZTc4OTZkN2NmZGM4NjZiYWNiZGJkMzgzOTMxN2IzNDM2ZjliNDU2MTdlMDczJyxcbiAgICAgICAgJ2Q5OWZjZGQ1YmY2OTAyZTJhZTk2ZGQ2NDQ3YzI5OWExODViOTBhMzkxMzNhZWFiMzU4Mjk5ZTVlOWZhZjY1ODknXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODQ4MWJkZTBlNGU0ZDg4NWIzYTU0NmQzZTU0OWRlMDQyZjBhYTZjZWEyNTBlN2ZkMzU4ZDZjODZkZDQ1ZTQ1OCcsXG4gICAgICAgICczOGVlN2I4Y2JhNTQwNGRkODRhMjViZjM5Y2VjYjJjYTkwMGE3OWM0MmIyNjJlNTU2ZDY0YjFiNTk3NzkwNTdlJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzEzNDY0YTU3YTc4MTAyYWE2MmI2OTc5YWU4MTdmNDYzN2ZmY2ZlZDNjNGIxY2UzMGJjZDYzMDNmNmNhZjY2NmInLFxuICAgICAgICAnNjliZTE1OTAwNDYxNDU4MGVmN2U0MzM0NTNjY2IwY2E0OGYzMDBhODFkMDk0MmUxM2Y0OTVhOTA3ZjZlY2MyNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiYzRhOWRmNWI3MTNmZTJlOWFlZjQzMGJjYzFkYzk3YTBjZDljY2VkZTJmMjg1ODhjYWRhM2EwZDJkODNmMzY2JyxcbiAgICAgICAgJ2QzYTgxY2E2ZTc4NWMwNjM4MzkzN2FkZjRiNzk4Y2FhNmU4YTlmYmZhNTQ3YjE2ZDc1OGQ2NjY1ODFmMzNjMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4YzI4YTk3YmY4Mjk4YmMwZDIzZDhjNzQ5NDUyYTMyZTY5NGI2NWUzMGE5NDcyYTM5NTRhYjMwZmU1MzI0Y2FhJyxcbiAgICAgICAgJzQwYTMwNDYzYTMzMDUxOTMzNzhmZWRmMzFmN2NjMGViN2FlNzg0ZjA0NTFjYjk0NTllNzFkYzczY2JlZjk0ODInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGVhOTY2NjEzOTUyN2E4YzFkZDk0Y2U0ZjA3MWZkMjNjOGIzNTBjNWE0YmIzMzc0OGM0YmExMTFmYWNjYWUwJyxcbiAgICAgICAgJzYyMGVmYWJiYzhlZTI3ODJlMjRlN2MwY2ZiOTVjNWQ3MzViNzgzYmU5Y2YwZjhlOTU1YWYzNGEzMGU2MmI5NDUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZGQzNjI1ZmFlZjViYTA2MDc0NjY5NzE2YmJkMzc4OGQ4OWJkZGU4MTU5NTk5NjgwOTJmNzZjYzRlYjlhOTc4NycsXG4gICAgICAgICc3YTE4OGZhMzUyMGUzMGQ0NjFkYTI1MDEwNDU3MzFjYTk0MTQ2MTk4Mjg4MzM5NTkzN2Y2OGQwMGM2NDRhNTczJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2Y3MTBkNzlkOWViOTYyMjk3ZTRmNjIzMmI0MGU4ZjdmZWIyYmM2MzgxNDYxNGQ2OTJjMTJkZTc1MjQwODIyMWUnLFxuICAgICAgICAnZWE5OGU2NzIzMmQzYjMyOTVkM2I1MzU1MzIxMTVjY2FjODYxMmM3MjE4NTE2MTc1MjZhZTQ3YTljNzdiZmM4MidcbiAgICAgIF1cbiAgICBdXG4gIH0sXG4gIG5hZjoge1xuICAgIHduZDogNyxcbiAgICBwb2ludHM6IFtcbiAgICAgIFtcbiAgICAgICAgJ2Y5MzA4YTAxOTI1OGMzMTA0OTM0NGY4NWY4OWQ1MjI5YjUzMWM4NDU4MzZmOTliMDg2MDFmMTEzYmNlMDM2ZjknLFxuICAgICAgICAnMzg4ZjdiMGY2MzJkZTgxNDBmZTMzN2U2MmEzN2YzNTY2NTAwYTk5OTM0YzIyMzFiNmNiOWZkNzU4NGI4ZTY3MidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyZjhiZGU0ZDFhMDcyMDkzNTViNGE3MjUwYTVjNTEyOGU4OGI4NGJkZGM2MTlhYjdjYmE4ZDU2OWIyNDBlZmU0JyxcbiAgICAgICAgJ2Q4YWMyMjI2MzZlNWUzZDZkNGRiYTlkZGE2YzljNDI2Zjc4ODI3MWJhYjBkNjg0MGRjYTg3ZDNhYTZhYzYyZDYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNWNiZGYwNjQ2ZTVkYjRlYWEzOThmMzY1ZjJlYTdhMGUzZDQxOWI3ZTAzMzBlMzljZTkyYmRkZWRjYWM0ZjliYycsXG4gICAgICAgICc2YWViY2E0MGJhMjU1OTYwYTMxNzhkNmQ4NjFhNTRkYmE4MTNkMGI4MTNmZGU3YjVhNTA4MjYyODA4NzI2NGRhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2FjZDQ4NGUyZjBjN2Y2NTMwOWFkMTc4YTlmNTU5YWJkZTA5Nzk2OTc0YzU3ZTcxNGMzNWYxMTBkZmMyN2NjYmUnLFxuICAgICAgICAnY2MzMzg5MjFiMGE3ZDlmZDY0MzgwOTcxNzYzYjYxZTlhZGQ4ODhhNDM3NWY4ZTBmMDVjYzI2MmFjNjRmOWMzNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3NzRhZTdmODU4YTk0MTFlNWVmNDI0NmI3MGM2NWFhYzU2NDk5ODBiZTVjMTc4OTFiYmVjMTc4OTVkYTAwOGNiJyxcbiAgICAgICAgJ2Q5ODRhMDMyZWI2YjVlMTkwMjQzZGQ1NmQ3YjdiMzY1MzcyZGIxZTJkZmY5ZDZhODMwMWQ3NGM5Yzk1M2M2MWInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZjI4NzczYzJkOTc1Mjg4YmM3ZDFkMjA1YzM3NDg2NTFiMDc1ZmJjNjYxMGU1OGNkZGVlZGRmOGYxOTQwNWFhOCcsXG4gICAgICAgICdhYjA5MDJlOGQ4ODBhODk3NTgyMTJlYjY1Y2RhZjQ3M2ExYTA2ZGE1MjFmYTkxZjI5YjVjYjUyZGIwM2VkODEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDc5MjRkNGY3ZDQzZWE5NjVhNDY1YWUzMDk1ZmY0MTEzMWU1OTQ2ZjNjODVmNzllNDRhZGJjZjhlMjdlMDgwZScsXG4gICAgICAgICc1ODFlMjg3MmE4NmM3MmE2ODM4NDJlYzIyOGNjNmRlZmVhNDBhZjJiZDg5NmQzYTVjNTA0ZGM5ZmY2YTI2YjU4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2RlZmRlYTRjZGI2Nzc3NTBhNDIwZmVlODA3ZWFjZjIxZWI5ODk4YWU3OWI5NzY4NzY2ZTRmYWEwNGEyZDRhMzQnLFxuICAgICAgICAnNDIxMWFiMDY5NDYzNTE2OGU5OTdiMGVhZDJhOTNkYWVjZWQxZjRhMDRhOTVjMGY2Y2ZiMTk5ZjY5ZTU2ZWI3NydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyYjRlYTBhNzk3YTQ0M2QyOTNlZjVjZmY0NDRmNDk3OWYwNmFjZmViZDdlODZkMjc3NDc1NjU2MTM4Mzg1YjZjJyxcbiAgICAgICAgJzg1ZTg5YmMwMzc5NDVkOTNiMzQzMDgzYjVhMWM4NjEzMWEwMWY2MGM1MDI2OTc2M2I1NzBjODU0ZTVjMDliN2EnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzUyYmJmNGE0Y2RkMTI1NjRmOTNmYTMzMmNlMzMzMzAxZDlhZDQwMjcxZjgxMDcxODEzNDBhZWYyNWJlNTlkNScsXG4gICAgICAgICczMjFlYjQwNzUzNDhmNTM0ZDU5YzE4MjU5ZGRhM2UxZjRhMWIzYjJlNzFiMTAzOWM2N2JkM2Q4YmNmODE5OThjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzJmYTIxMDRkNmIzOGQxMWIwMjMwMDEwNTU5ODc5MTI0ZTQyYWI4ZGZlZmY1ZmYyOWRjOWNkYWRkNGVjYWNjM2YnLFxuICAgICAgICAnMmRlMTA2ODI5NWRkODY1YjY0NTY5MzM1YmQ1ZGQ4MDE4MWQ3MGVjZmM4ODI2NDg0MjNiYTc2YjUzMmI3ZDY3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzkyNDgyNzliMDliNGQ2OGRhYjIxYTliMDY2ZWRkYTgzMjYzYzNkODRlMDk1NzJlMjY5Y2EwY2Q3ZjU0NTM3MTQnLFxuICAgICAgICAnNzMwMTZmN2JmMjM0YWFkZTVkMWFhNzFiZGVhMmIxZmYzZmMwZGUyYTg4NzkxMmZmZTU0YTMyY2U5N2NiMzQwMidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkYWVkNGYyYmUzYThiZjI3OGU3MDEzMmZiMGJlYjc1MjJmNTcwZTE0NGJmNjE1YzA3ZTk5NmQ0NDNkZWU4NzI5JyxcbiAgICAgICAgJ2E2OWRjZTRhN2Q2Yzk4ZThkNGExYWNhODdlZjhkNzAwM2Y4M2MyMzBmM2FmYTcyNmFiNDBlNTIyOTBiZTFjNTUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYzQ0ZDEyYzcwNjVkODEyZThhY2YyOGQ3Y2JiMTlmOTAxMWVjZDllOWZkZjI4MWIwZTZhM2I1ZTg3ZDIyZTdkYicsXG4gICAgICAgICcyMTE5YTQ2MGNlMzI2Y2RjNzZjNDU5MjZjOTgyZmRhYzBlMTA2ZTg2MWVkZjYxYzVhMDM5MDYzZjBlMGU2NDgyJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzZhMjQ1YmY2ZGM2OTg1MDRjODlhMjBjZmRlZDYwODUzMTUyYjY5NTMzNmMyODA2M2I2MWM2NWNiZDI2OWU2YjQnLFxuICAgICAgICAnZTAyMmNmNDJjMmJkNGE3MDhiM2Y1MTI2ZjE2YTI0YWQ4YjMzYmE0OGQwNDIzYjZlZmQ1ZTYzNDgxMDBkOGE4MidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNjk3ZmZhNmZkOWRlNjI3YzA3N2UzZDJmZTU0MTA4NGNlMTMzMDBiMGJlYzExNDZmOTVhZTU3ZjBkMGJkNmE1JyxcbiAgICAgICAgJ2I5YzM5OGYxODY4MDZmNWQyNzU2MTUwNmU0NTU3NDMzYTJjZjE1MDA5ZTQ5OGFlN2FkZWU5ZDYzZDAxYjIzOTYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNjA1YmRiMDE5OTgxNzE4Yjk4NmQwZjA3ZTgzNGNiMGQ5ZGViODM2MGZmYjdmNjFkZjk4MjM0NWVmMjdhNzQ3OScsXG4gICAgICAgICcyOTcyZDJkZTRmOGQyMDY4MWE3OGQ5M2VjOTZmZTIzYzI2YmZhZTg0ZmIxNGRiNDNiMDFlMWU5MDU2YjhjNDknXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNjJkMTRkYWI0MTUwYmY0OTc0MDJmZGM0NWEyMTVlMTBkY2IwMWMzNTQ5NTliMTBjZmUzMWM3ZTlkODdmZjMzZCcsXG4gICAgICAgICc4MGZjMDZiZDhjYzViMDEwOTgwODhhMTk1MGVlZDBkYjAxYWExMzI5NjdhYjQ3MjIzNWY1NjQyNDgzYjI1ZWFmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzgwYzYwYWQwMDQwZjI3ZGFkZTViNGIwNmM0MDhlNTZiMmM1MGU5ZjU2YjliOGI0MjVlNTU1YzJmODYzMDhiNmYnLFxuICAgICAgICAnMWMzODMwM2YxY2M1YzMwZjI2ZTY2YmFkN2ZlNzJmNzBhNjVlZWQ0Y2JlNzAyNGViMWFhMDFmNTY0MzBiZDU3YSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3YTkzNzVhZDYxNjdhZDU0YWE3NGM2MzQ4Y2M1NGQzNDRjYzVkYzk0ODdkODQ3MDQ5ZDVlYWJiMGZhMDNjOGZiJyxcbiAgICAgICAgJ2QwZTNmYTllY2E4NzI2OTA5NTU5ZTBkNzkyNjkwNDZiZGM1OWVhMTBjNzBjZTJiMDJkNDk5ZWMyMjRkYzdmNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkNTI4ZWNkOWI2OTZiNTRjOTA3YTllZDA0NTQ0N2E3OWJiNDA4ZWMzOWI2OGRmNTA0YmI1MWY0NTliYzNmZmM5JyxcbiAgICAgICAgJ2VlY2Y0MTI1MzEzNmU1Zjk5OTY2ZjIxODgxZmQ2NTZlYmM0MzQ1NDA1YzUyMGRiYzA2MzQ2NWI1MjE0MDk5MzMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDkzNzBhNGI1ZjQzNDEyZWEyNWY1MTRlOGVjZGFkMDUyNjYxMTVlNGE3ZWNiMTM4NzIzMTgwOGY4YjQ1OTYzJyxcbiAgICAgICAgJzc1OGYzZjQxYWZkNmVkNDI4YjMwODFiMDUxMmZkNjJhNTRjM2YzYWZiYjViNjc2NGI2NTMwNTJhMTI5NDljOWEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzdmMjMwOTM2ZWU4OGNiYmQ3M2RmOTMwZDY0NzAyZWY4ODFkODExZTBlMTQ5OGUyZjFjMTNlYjFmYzM0NWQ3NCcsXG4gICAgICAgICc5NThlZjQyYTc4ODZiNjQwMGEwODI2NmU5YmExYjM3ODk2Yzk1MzMwZDk3MDc3Y2JiZThlYjNjNzY3MWM2MGQ2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2YyZGFjOTkxY2M0Y2U0YjllYTQ0ODg3ZTVjN2MwYmNlNThjODAwNzRhYjlkNGRiYWViMjg1MzFiNzczOWY1MzAnLFxuICAgICAgICAnZTBkZWRjOWIzYjJmOGRhZDRkYTFmMzJkZWMyNTMxZGY5ZWI1ZmJlYjA1OThlNGZkMWExMTdkYmE3MDNhM2MzNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc0NjNiM2Q5ZjY2MjYyMWZiMWI0YmU4ZmJiZTI1MjAxMjVhMjE2Y2RmYzlkYWUzZGViY2JhNDg1MGM2OTBkNDViJyxcbiAgICAgICAgJzVlZDQzMGQ3OGMyOTZjMzU0MzExNDMwNmRkODYyMmQ3YzYyMmUyN2M5NzBhMWRlMzFjYjM3N2IwMWFmNzMwN2UnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZjE2ZjgwNDI0NGU0NmUyYTA5MjMyZDRhZmYzYjU5OTc2Yjk4ZmFjMTQzMjhhMmQxYTMyNDk2YjQ5OTk4ZjI0NycsXG4gICAgICAgICdjZWRhYmQ5YjgyMjAzZjdlMTNkMjA2ZmNkZjRlMzNkOTJhNmM1M2MyNmU1Y2NlMjZkNjU3OTk2MmM0ZTMxZGY2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2NhZjc1NDI3MmRjODQ1NjNiMDM1MmI3YTE0MzExYWY1NWQyNDUzMTVhY2UyN2M2NTM2OWUxNWY3MTUxZDQxZDEnLFxuICAgICAgICAnY2I0NzQ2NjBlZjM1ZjVmMmE0MWI2NDNmYTVlNDYwNTc1ZjRmYTliNzk2MjIzMmE1YzMyZjkwODMxOGEwNDQ3NidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyNjAwY2E0YjI4MmNiOTg2Zjg1ZDBmMTcwOTk3OWQ4YjQ0YTA5YzA3Y2I4NmQ3YzEyNDQ5N2JjODZmMDgyMTIwJyxcbiAgICAgICAgJzQxMTliODg3NTNjMTViZDZhNjkzYjAzZmNkZGJiNDVkNWFjNmJlNzRhYjVmMGVmNDRiMGJlOTQ3NWE3ZTRiNDAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzYzNWNhNzJkN2U4NDMyYzMzOGVjNTNjZDEyMjIwYmMwMWM0ODY4NWUyNGY3ZGM4YzYwMmE3NzQ2OTk4ZTQzNScsXG4gICAgICAgICc5MWI2NDk2MDk0ODlkNjEzZDFkNWU1OTBmNzhlNmQ3NGVjZmMwNjFkNTcwNDhiYWQ5ZTc2ZjMwMmM1YjljNjEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzU0ZTMyMzlmMzI1NTcwY2RiYmY0YTg3ZGVlZThhNjZiN2YyYjMzNDc5ZDQ2OGZiYzFhNTA3NDNiZjU2Y2MxOCcsXG4gICAgICAgICc2NzNmYjg2ZTViZGEzMGZiM2NkMGVkMzA0ZWE0OWEwMjNlZTMzZDAxOTdhNjk1ZDBjNWQ5ODA5M2M1MzY2ODMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTNlNmJkMTA3MWExZTk2YWZmNTc4NTljODJkNTcwZjAzMzA4MDA2NjFkMWM5NTJmOWZlMjY5NDY5MWQ5YjllOCcsXG4gICAgICAgICc1OWM5ZTBiYmEzOTRlNzZmNDBjMGFhNTgzNzlhM2NiNmE1YTIyODM5OTNlOTBjNDE2NzAwMmFmNDkyMGUzN2Y1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE4NmI0ODNkMDU2YTAzMzgyNmFlNzNkODhmNzMyOTg1YzRjY2IxZjMyYmEzNWY0YjRjYzQ3ZmRjZjA0YWE2ZWInLFxuICAgICAgICAnM2I5NTJkMzJjNjdjZjc3ZTJlMTc0NDZlMjA0MTgwYWIyMWZiODA5MDg5NTEzOGI0YTRhNzk3Zjg2ZTgwODg4YidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkZjlkNzBhNmI5ODc2Y2U1NDRjOTg1NjFmNGJlNGY3MjU0NDJlNmQyYjczN2Q5YzkxYTgzMjE3MjRjZTA5NjNmJyxcbiAgICAgICAgJzU1ZWIyZGFmZDg0ZDZjY2Q1Zjg2MmI3ODVkYzM5ZDRhYjE1NzIyMjcyMGVmOWRhMjE3YjhjNDVjZjJiYTI0MTcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNWVkZDVjYzIzYzUxZTg3YTQ5N2NhODE1ZDVkY2UwZjhhYjUyNTU0Zjg0OWVkODk5NWRlNjRjNWYzNGNlNzE0MycsXG4gICAgICAgICdlZmFlOWM4ZGJjMTQxMzA2NjFlOGNlYzAzMGM4OWFkMGMxM2M2NmMwZDE3YTI5MDVjZGM3MDZhYjczOTlhODY4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzI5MDc5OGMyYjY0NzY4MzBkYTEyZmUwMjI4N2U5ZTc3N2FhM2ZiYTFjMzU1YjE3YTcyMmQzNjJmODQ2MTRmYmEnLFxuICAgICAgICAnZTM4ZGE3NmRjZDQ0MDYyMTk4OGQwMGJjZjc5YWYyNWQ1YjI5YzA5NGRiMmEyMzE0NmQwMDNhZmQ0MTk0M2U3YSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhZjNjNDIzYTk1ZDlmNWIzMDU0NzU0ZWZhMTUwYWMzOWNkMjk1NTJmZTM2MDI1NzM2MmRmZGVjZWY0MDUzYjQ1JyxcbiAgICAgICAgJ2Y5OGEzZmQ4MzFlYjJiNzQ5YTkzYjBlNmYzNWNmYjQwYzhjZDVhYTY2N2ExNTU4MWJjMmZlZGVkNDk4ZmQ5YzYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzY2ZGJiMjRkMTM0ZTc0NWNjY2FhMjhjOTliZjI3NDkwNmJiNjZiMjZkY2Y5OGRmOGQyZmVkNTBkODg0MjQ5YScsXG4gICAgICAgICc3NDRiMTE1MmVhY2JlNWUzOGRjYzg4Nzk4MGRhMzhiODk3NTg0YTY1ZmEwNmNlZGQyYzkyNGY5N2NiYWM1OTk2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzU5ZGJmNDZmOGM5NDc1OWJhMjEyNzdjMzM3ODRmNDE2NDVmN2I0NGY2YzU5NmE1OGNlOTJlNjY2MTkxYWJlM2UnLFxuICAgICAgICAnYzUzNGFkNDQxNzVmYmMzMDBmNGVhNmNlNjQ4MzA5YTA0MmNlNzM5YTc5MTk3OThjZDg1ZTIxNmM0YTMwN2Y2ZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmMTNhZGE5NTEwM2M0NTM3MzA1ZTY5MWU3NGU5YTRhOGRkNjQ3ZTcxMWE5NWU3M2NiNjJkYzYwMThjZmQ4N2I4JyxcbiAgICAgICAgJ2UxMzgxN2I0NGVlMTRkZTY2M2JmNGJjODA4MzQxZjMyNjk0OWUyMWE2YTc1YzI1NzA3Nzg0MTliZGFmNTczM2QnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzc1NGI0ZmEwZThhY2VkMDZkNDE2N2EyYzU5Y2NhNGNkYTE4NjljMDZlYmFkZmI2NDg4NTUwMDE1YTg4NTIyYycsXG4gICAgICAgICczMGU5M2U4NjRlNjY5ZDgyMjI0Yjk2N2MzMDIwYjhmYThkMWU0ZTM1MGI2Y2JjYzUzN2E0OGI1Nzg0MTE2M2EyJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzk0OGRjYWRmNTk5MGUwNDhhYTM4NzRkNDZhYmVmOWQ3MDE4NThmOTVkZTgwNDFkMmE2ODI4Yzk5ZTIyNjI1MTknLFxuICAgICAgICAnZTQ5MWE0MjUzN2Y2ZTU5N2Q1ZDI4YTMyMjRiMWJjMjVkZjkxNTRlZmJkMmVmMWQyY2JiYTJjYWU1MzQ3ZDU3ZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3OTYyNDE0NDUwYzc2YzE2ODljN2I0OGY4MjAyZWMzN2ZiMjI0Y2Y1YWMwYmZhMTU3MDMyOGE4YTNkN2M3N2FiJyxcbiAgICAgICAgJzEwMGI2MTBlYzRmZmI0NzYwZDVjMWZjMTMzZWY2ZjZiMTI1MDdhMDUxZjA0YWM1NzYwYWZhNWIyOWRiODM0MzcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzUxNDA4NzgzNDk2NGI1NGIxNWIxNjA2NDRkOTE1NDg1YTE2OTc3MjI1Yjg4NDdiYjBkZDA4NTEzN2VjNDdjYScsXG4gICAgICAgICdlZjBhZmJiMjA1NjIwNTQ0OGUxNjUyYzQ4ZTgxMjdmYzYwMzllNzdjMTVjMjM3OGI3ZTdkMTVhMGRlMjkzMzExJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2QzY2MzMGFkNmI0ODNlNGJjNzljZTJjOWRkOGJjNTQ5OTNlOTQ3ZWI4ZGY3ODdiNDQyOTQzZDNmN2I1MjdlYWYnLFxuICAgICAgICAnOGIzNzhhMjJkODI3Mjc4ZDg5YzVlOWJlOGY5NTA4YWUzYzJhZDQ2MjkwMzU4NjMwYWZiMzRkYjA0ZWVkZTBhNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNjI0ZDg0NzgwNzMyODYwY2UxYzc4ZmNiZmVmZTA4YjJiMjk4MjNkYjkxM2Y2NDkzOTc1YmEwZmY0ODQ3NjEwJyxcbiAgICAgICAgJzY4NjUxY2Y5YjZkYTkwM2UwOTE0NDQ4YzZjZDlkNGNhODk2ODc4ZjUyODJiZTRjOGNjMDZlMmE0MDQwNzg1NzUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzMzY2U4MGRhOTU1YThhMjY5MDJjOTU2MzNlNjJhOTg1MTkyNDc0YjVhZjIwN2RhNmRmN2I0ZmQ1ZmM2MWNkNCcsXG4gICAgICAgICdmNTQzNWEyYmQyYmFkZjdkNDg1YTRkOGI4ZGI5ZmNjZTNlMWVmOGUwMjAxZTQ1NzhjNTQ2NzNiYzFkYzVlYTFkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE1ZDk0NDEyNTQ5NDUwNjRjZjFhMWMzM2JiZDNiNDlmODk2NmM1MDkyMTcxZTY5OWVmMjU4ZGZhYjgxYzA0NWMnLFxuICAgICAgICAnZDU2ZWIzMGI2OTQ2M2U3MjM0ZjUxMzdiNzNiODQxNzc0MzQ4MDBiYWNlYmZjNjg1ZmMzN2JiZTllZmU0MDcwZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhMWQwZmNmMmVjOWRlNjc1YjYxMjEzNmU1Y2U3MGQyNzFjMjE0MTdjOWQyYjhhYWFhYzEzODU5OWQwNzE3OTQwJyxcbiAgICAgICAgJ2VkZDc3ZjUwYmNiNWEzY2FiMmU5MDczNzMwOTY2N2YyNjQxNDYyYTU0MDcwZjNkNTE5MjEyZDM5YzE5N2E2MjknXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTIyZmJlMTVjMGFmOGNjYzU3ODBjMDczNWY4NGRiZTlhNzkwYmFkZWU4MjQ1YzA2YzdjYTM3MzMxY2IzNjk4MCcsXG4gICAgICAgICdhODU1YmFiYWQ1Y2Q2MGM4OGI0MzBhNjlmNTNhMWE3YTM4Mjg5MTU0OTY0Nzk5YmU0M2QwNmQ3N2QzMWRhMDYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzExMDkxZGQ5ODYwZThlMjBlZTEzNDczYzExNTVmNWY2OTYzNWUzOTQ3MDRlYWE3NDAwOTQ1MjI0NmNmYTliMycsXG4gICAgICAgICc2NmRiNjU2Zjg3ZDFmMDRmZmZkMWYwNDc4OGMwNjgzMDg3MWVjNWE2NGZlZWU2ODViZDgwZjBiMTI4NmQ4Mzc0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM0YzFmZDA0ZDMwMWJlODliMzFjMDQ0MmQzZTZhYzI0ODgzOTI4YjQ1YTkzNDA3ODE4NjdkNDIzMmVjMmRiZGYnLFxuICAgICAgICAnOTQxNDY4NWU5N2IxYjU5NTRiZDQ2ZjczMDE3NDEzNmQ1N2YxY2VlYjQ4NzQ0M2RjNTMyMTg1N2JhNzNhYmVlJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2YyMTllYTVkNmI1NDcwMWMxYzE0ZGU1YjU1N2ViNDJhOGQxM2YzYWJiY2QwOGFmZmNjMmE1ZTZiMDQ5YjhkNjMnLFxuICAgICAgICAnNGNiOTU5NTdlODNkNDBiMGY3M2FmNDU0NGNjY2Y2YjFmNGIwOGQzYzA3YjI3ZmI4ZDhjMjk2MmE0MDA3NjZkMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkN2I4NzQwZjc0YThmYmFhYjFmNjgzZGI4ZjQ1ZGUyNjU0M2E1NDkwYmNhNjI3MDg3MjM2OTEyNDY5YTBiNDQ4JyxcbiAgICAgICAgJ2ZhNzc5NjgxMjhkOWM5MmVlMTAxMGYzMzdhZDQ3MTdlZmYxNWRiNWVkM2MwNDliMzQxMWUwMzE1ZWFhNDU5M2InXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzJkMzFjMjIyZjhmNmYwZWY4NmY3Yzk4ZDNhMzMzNWVhZDViY2QzMmFiZGQ5NDI4OWZlNGQzMDkxYWE4MjRiZicsXG4gICAgICAgICc1ZjMwMzJmNTg5MjE1NmUzOWNjZDNkNzkxNWI5ZTFkYTJlNmRhYzllNmYyNmU5NjExMThkMTRiODQ2MmUxNjYxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc0NjFmMzcxOTE0YWIzMjY3MTA0NWExNTVkOTgzMWVhODc5M2Q3N2NkNTk1OTJjNDM0MGY4NmNiYzE4MzQ3YjUnLFxuICAgICAgICAnOGVjMGJhMjM4Yjk2YmVjMGNiZGRkY2FlMGFhNDQyNTQyZWVlMWZmNTBjOTg2ZWE2YjM5ODQ3YjNjYzA5MmZmNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlZTA3OWFkYjFkZjE4NjAwNzQzNTZhMjVhYTM4MjA2YTZkNzE2YjJjM2U2NzQ1M2QyODc2OThiYWQ3YjJiMmQ2JyxcbiAgICAgICAgJzhkYzI0MTJhYWZlM2JlNWM0YzVmMzdlMGVjYzVmOWY2YTQ0Njk4OWFmMDRjNGUyNWViYWFjNDc5ZWMxYzhjMWUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTZlYzkzZTQ0N2VjODNmMDQ2N2IxODMwMmVlNjIwZjdlNjVkZTMzMTg3NGM5ZGM3MmJmZDg2MTZiYTlkYTZiNScsXG4gICAgICAgICc1ZTQ2MzExNTBlNjJmYjQwZDBlOGMyYTdjYTU4MDRhMzlkNTgxODZhNTBlNDk3MTM5NjI2Nzc4ZTI1YjA2NzRkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2VhYTVmOTgwYzI0NWY2ZjAzODk3ODI5MGFmYTcwYjZiZDg4NTU4OTdmOThiNmFhNDg1Yjk2MDY1ZDUzN2JkOTknLFxuICAgICAgICAnZjY1ZjVkM2UyOTJjMmUwODE5YTUyODM5MWM5OTQ2MjRkNzg0ODY5ZDdlNmVhNjdmYjE4MDQxMDI0ZWRjMDdkYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3OGM5NDA3NTQ0YWMxMzI2OTJlZTE5MTBhMDI0Mzk5NThhZTA0ODc3MTUxMzQyZWE5NmM0YjZiMzVhNDlmNTEnLFxuICAgICAgICAnZjNlMDMxOTE2OWViOWI4NWQ1NDA0Nzk1NTM5YTVlNjhmYTFmYmQ1ODNjMDY0ZDI0NjJiNjc1ZjE5NGEzZGRiNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc0OTRmNGJlMjE5YTFhNzcwMTZkY2Q4Mzg0MzFhZWEwMDAxY2RjOGFlN2E2ZmM2ODg3MjY1NzhkOTcwMjg1N2E1JyxcbiAgICAgICAgJzQyMjQyYTk2OTI4M2E1ZjMzOWJhN2YwNzVlMzZiYTJhZjkyNWNlMzBkNzY3ZWQ2ZTU1ZjRiMDMxODgwZDU2MmMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYTU5OGE4MDMwZGE2ZDg2YzZiYzdmMmY1MTQ0ZWE1NDlkMjgyMTFlYTU4ZmFhNzBlYmY0YzFlNjY1YzFmZTliNScsXG4gICAgICAgICcyMDRiNWQ2Zjg0ODIyYzMwN2U0YjRhNzE0MDczN2FlYzIzZmM2M2I2NWIzNWY4NmExMDAyNmRiZDJkODY0ZTZiJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2M0MTkxNjM2NWFiYjJiNWQwOTE5MmY1ZjJkYmVhZmVjMjA4ZjAyMGYxMjU3MGExODRkYmFkYzNlNTg1OTU5OTcnLFxuICAgICAgICAnNGYxNDM1MWQwMDg3ZWZhNDlkMjQ1YjMyODk4NDk4OWQ1Y2FmOTQ1MGYzNGJmYzBlZDE2ZTk2YjU4ZmE5OTEzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzg0MWQ2MDYzYTU4NmZhNDc1YTcyNDYwNGRhMDNiYzViOTJhMmUwZDJlMGEzNmFjZmU0YzczYTU1MTQ3NDI4ODEnLFxuICAgICAgICAnNzM4NjdmNTljMDY1OWU4MTkwNGY5YTFjNzU0MzY5OGU2MjU2MmQ2NzQ0YzE2OWNlN2EzNmRlMDFhOGQ2MTU0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzVlOTViYjM5OWE2OTcxZDM3NjAyNjk0N2Y4OWJkZTJmMjgyYjMzODEwOTI4YmU0ZGVkMTEyYWM0ZDcwZTIwZDUnLFxuICAgICAgICAnMzlmMjNmMzY2ODA5MDg1YmVlYmZjNzExODEzMTM3NzVhOTljOWFlZDdkOGJhMzhiMTYxMzg0Yzc0NjAxMjg2NSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczNmU0NjQxYTUzOTQ4ZmQ0NzZjMzlmOGE5OWZkOTc0ZTVlYzA3NTY0YjUzMTVkOGJmOTk0NzFiY2EwZWYyZjY2JyxcbiAgICAgICAgJ2QyNDI0YjFiMWFiZTRlYjgxNjQyMjdiMDg1YzlhYTk0NTZlYTEzNDkzZmQ1NjNlMDZmZDUxY2Y1Njk0Yzc4ZmMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzM2NTgxZWE3YmZiYmIyOTBjMTkxYTJmNTA3YTQxY2Y1NjQzODQyMTcwZTkxNGZhZWFiMjdjMmM1NzlmNzI2JyxcbiAgICAgICAgJ2VhZDEyMTY4NTk1ZmUxYmU5OTI1MjEyOWI2ZTU2YjMzOTFmN2FiMTQxMGNkMWUwZWYzZGNkY2FiZDJmZGEyMjQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGFiODk4MTZkYWRmZDZiNmExZjI2MzRmY2YwMGVjODQwMzc4MTAyNWVkNjg5MGM0ODQ5NzQyNzA2YmQ0M2VkZScsXG4gICAgICAgICc2ZmRjZWYwOWYyZjZkMGEwNDRlNjU0YWVmNjI0MTM2ZjUwM2Q0NTljM2U4OTg0NTg1OGE0N2E5MTI5Y2RkMjRlJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzFlMzNmMWE3NDZjOWM1Nzc4MTMzMzQ0ZDkyOTlmY2FhMjBiMDkzOGU4YWNmZjI1NDRiYjQwMjg0YjhjNWZiOTQnLFxuICAgICAgICAnNjA2NjAyNTdkZDExYjNhYTljOGVkNjE4ZDI0ZWRmZjIzMDZkMzIwZjFkMDMwMTBlMzNhN2QyMDU3ZjNiM2I2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzg1YjdjMWRjYjNjZWMxYjdlZTdmMzBkZWQ3OWRkMjBhMGVkMWY0Y2MxOGNiY2ZjZmE0MTAzNjFmZDhmMDhmMzEnLFxuICAgICAgICAnM2Q5OGE5Y2RkMDI2ZGQ0M2YzOTA0OGYyNWE4ODQ3ZjRmY2FmYWQxODk1ZDdhNjMzYzZmZWQzYzM1ZTk5OTUxMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyOWRmOWZiZDhkOWU0NjUwOTI3NWY0YjEyNWQ2ZDQ1ZDdmYmU5YTNiODc4YTdhZjg3MmEyODAwNjYxYWM1ZjUxJyxcbiAgICAgICAgJ2I0YzRmZTk5Yzc3NWE2MDZlMmQ4ODYyMTc5MTM5ZmZkYTYxZGM4NjFjMDE5ZTU1Y2QyODc2ZWIyYTI3ZDg0YidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhMGIxY2FlMDZiMGE4NDdhM2ZlYTZlNjcxYWFmOGFkZmRmZTU4Y2EyZjc2ODEwNWM4MDgyYjJlNDQ5ZmNlMjUyJyxcbiAgICAgICAgJ2FlNDM0MTAyZWRkZTA5NThlYzRiMTlkOTE3YTZhMjhlNmI3MmRhMTgzNGFmZjBlNjUwZjA0OTUwM2EyOTZjZjInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNGU4Y2VhZmI5YjNlOWExMzZkYzdmZjY3ZTg0MDI5NWI0OTlkZmIzYjIxMzNlNGJhMTEzZjJlNGMwZTEyMWU1JyxcbiAgICAgICAgJ2NmMjE3NDExOGM4YjZkN2E0YjQ4ZjZkNTM0Y2U1Yzc5NDIyYzA4NmE2MzQ2MDUwMmI4MjdjZTYyYTMyNjY4M2MnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDI0YTQ0ZTA0N2UxOWI2ZjVhZmI4MWM3Y2EyZjY5MDgwYTUwNzY2ODlhMDEwOTE5ZjQyNzI1YzJiNzg5YTMzYicsXG4gICAgICAgICc2ZmI4ZDU1OTFiNDY2ZjhmYzYzZGI1MGYxYzBmMWM2OTAxM2Y5OTY4ODdiODI0NGQyY2RlYzQxN2FmZWE4ZmEzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2VhMDE2MDZhN2E2YzljZGQyNDlmZGZjZmFjYjk5NTg0MDAxZWRkMjhhYmJhYjc3YjUxMDRlOThlOGUzYjM1ZDQnLFxuICAgICAgICAnMzIyYWY0OTA4YzczMTJiMGNmYmZlMzY5ZjdhN2IzY2RiN2Q0NDk0YmMyODIzNzAwY2ZkNjUyMTg4YTNlYTk4ZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhZjhhZGRiZjJiNjYxYzhhNmM2MzI4NjU1ZWI5NjY1MTI1MjAwN2Q4YzVlYTMxYmU0YWQxOTZkZThjZTIxMzFmJyxcbiAgICAgICAgJzY3NDllNjdjMDI5Yjg1ZjUyYTAzNGVhZmQwOTY4MzZiMjUyMDgxODY4MGUyNmFjOGYzZGZiY2RiNzE3NDk3MDAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTNhZTE5NzQ1NjZjYTA2Y2M1MTZkNDdlMGZiMTY1YTY3NGEzZGFiY2ZjYTE1ZTcyMmYwZTM0NTBmNDU4ODknLFxuICAgICAgICAnMmFlYWJlN2U0NTMxNTEwMTE2MjE3ZjA3YmY0ZDA3MzAwZGU5N2U0ODc0ZjgxZjUzMzQyMGE3MmVlYjBiZDZhNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc1OTFlZTM1NTMxM2Q5OTcyMWNmNjk5M2ZmZWQxZTNlMzAxOTkzZmYzZWQyNTg4MDIwNzVlYThjZWQzOTdlMjQ2JyxcbiAgICAgICAgJ2IwZWE1NThhMTEzYzMwYmVhNjBmYzQ3NzU0NjBjNzkwMWZmMGIwNTNkMjVjYTJiZGVlZTk4ZjFhNGJlNWQxOTYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTEzOTZkNTVmZGE1NGM0OWYxOWFhOTczMThkOGRhNjFmYTg1ODRlNDdiMDg0OTQ1MDc3Y2YwMzI1NWI1Mjk4NCcsXG4gICAgICAgICc5OThjNzRhOGNkNDVhYzAxMjg5ZDU4MzNhN2JlYjQ3NDRmZjUzNmIwMWIyNTdiZTRjNTc2N2JlYTkzZWE1N2E0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzNjNWQyYTFiYTM5YzVhMTc5MDAwMDczOGM5ZTBjNDBiOGRjZGZkNTQ2ODc1NGI2NDA1NTQwMTU3ZTAxN2FhN2EnLFxuICAgICAgICAnYjIyODQyNzk5OTVhMzRlMmY5ZDRkZTczOTZmYzE4YjgwZjliOGI5ZmRkMjcwZjY2NjFmNzljYTRjODFiZDI1NydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdjYzg3MDRiOGE2MGEwZGVmYTNhOTlhNzI5OWYyZTljM2ZiYzM5NWFmYjA0YWMwNzg0MjVlZjhhMTc5M2NjMDMwJyxcbiAgICAgICAgJ2JkZDQ2MDM5ZmVlZDE3ODgxZDFlMDg2MmRiMzQ3ZjhjZjM5NWI3NGZjNGJjZGM0ZTk0MGI3NGUzYWMxZjFiMTMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYzUzM2U0ZjdlYTg1NTVhYWNkOTc3N2FjNWNhZDI5Yjk3ZGQ0ZGVmY2NjNTNlZTdlYTIwNDExOWIyODg5YjE5NycsXG4gICAgICAgICc2ZjBhMjU2YmM1ZWZkZjQyOWEyZmI2MjQyZjFhNDNhMmQ5YjkyNWJiNGE0YjNhMjZiYjhlMGY0NWViNTk2MDk2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2MxNGY4ZjJjY2IyN2Q2ZjEwOWY2ZDA4ZDAzY2M5NmE2OWJhOGMzNGVlYzA3YmJjZjU2NmQ0OGUzM2RhNjU5MycsXG4gICAgICAgICdjMzU5ZDY5MjNiYjM5OGY3ZmQ0NDczZTE2ZmUxYzI4NDc1Yjc0MGRkMDk4MDc1ZTZjMGU4NjQ5MTEzZGMzYTM4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2E2Y2JjMzA0NmJjNmE0NTBiYWMyNDc4OWZhMTcxMTVhNGM5NzM5ZWQ3NWY4ZjIxY2U0NDFmNzJlMGI5MGU2ZWYnLFxuICAgICAgICAnMjFhZTdmNDY4MGU4ODliYjEzMDYxOWUyYzBmOTVhMzYwY2ViNTczYzcwNjAzMTM5ODYyYWZkNjE3ZmE5YjlmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM0N2Q2ZDlhMDJjNDg5MjdlYmZiODZjMTM1OWIxY2FmMTMwYTNjMDI2N2QxMWNlNjM0NGIzOWY5OWQ0M2NjMzgnLFxuICAgICAgICAnNjBlYTdmNjFhMzUzNTI0ZDFjOTg3ZjZlY2VjOTJmMDg2ZDU2NWFiNjg3ODcwY2IxMjY4OWZmMWUzMWM3NDQ0OCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkYTY1NDVkMjE4MWRiOGQ5ODNmN2RjYjM3NWVmNTg2NmQ0N2M2N2IxYmYzMWM4Y2Y4NTVlZjc0MzdiNzI2NTZhJyxcbiAgICAgICAgJzQ5Yjk2NzE1YWI2ODc4YTc5ZTc4ZjA3Y2U1NjgwYzVkNjY3MzA1MWI0OTM1YmQ4OTdmZWE4MjRiNzdkYzIwOGEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYzQwNzQ3Y2M5ZDAxMmNiMWExM2I4MTQ4MzA5YzZkZTdlYzI1ZDY5NDVkNjU3MTQ2YjlkNTk5NGI4ZmViMTExMScsXG4gICAgICAgICc1Y2E1NjA3NTNiZTJhMTJmYzZkZTZjYWYyY2I0ODk1NjVkYjkzNjE1NmI5NTE0ZTFiYjVlODMwMzdlMGZhMmQ0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzRlNDJjOGVjODJjOTk3OThjY2YzYTYxMGJlODcwZTc4MzM4YzdmNzEzMzQ4YmQzNGM4MjAzZWY0MDM3ZjM1MDInLFxuICAgICAgICAnNzU3MWQ3NGVlNWUwZmI5MmE3YThiMzNhMDc3ODMzNDFhNTQ5MjE0NGNjNTRiY2M0MGE5NDQ3MzY5MzYwNjQzNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczNzc1YWI3MDg5YmM2YWY4MjNhYmEyZTFhZjcwYjIzNmQyNTFjYWRiMGM4Njc0MzI4NzUyMmExYjNiMGRlZGVhJyxcbiAgICAgICAgJ2JlNTJkMTA3YmNmYTA5ZDhiY2I5NzM2YTgyOGNmYTdmYWM4ZGIxN2JmN2E3NmEyYzQyYWQ5NjE0MDkwMThjZjcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnY2VlMzFjYmY3ZTM0ZWMzNzlkOTRmYjgxNGQzZDc3NWFkOTU0NTk1ZDEzMTRiYTg4NDY5NTllM2U4MmY3NGUyNicsXG4gICAgICAgICc4ZmQ2NGExNGMwNmI1ODljMjZiOTQ3YWUyYmNmNmJmYTAxNDllZjBiZTE0ZWQ0ZDgwZjQ0OGEwMWM0M2IxYzZkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2I0ZjllYWVhMDliNjkxNzYxOWY2ZWE2YTRlYjU0NjRlZmRkYjU4ZmQ0NWIxZWJlZmNkYzFhMDFkMDhiNDc5ODYnLFxuICAgICAgICAnMzllNWM5OTI1YjVhNTRiMDc0MzNhNGYxOGM2MTcyNmY4YmIxMzFjMDEyY2E1NDJlYjI0YThhYzA3MjAwNjgyYSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkNDI2M2RmYzNkMmRmOTIzYTAxNzlhNDg5NjZkMzBjZTg0ZTI1MTVhZmMzZGNjYzFiNzc5MDc3OTJlYmNjNjBlJyxcbiAgICAgICAgJzYyZGZhZjA3YTBmNzhmZWIzMGUzMGQ2Mjk1ODUzY2UxODllMTI3NzYwYWQ2Y2Y3ZmFlMTY0ZTEyMmEyMDhkNTQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDg0NTc1MjQ4MjBmYTY1YTRmOGQzNWViNjkzMDg1N2MwMDMyYWNjMGE0YTJkZTQyMjIzM2VlZGE4OTc2MTJjNCcsXG4gICAgICAgICcyNWE3NDhhYjM2Nzk3OWQ5ODczM2MzOGExZmExYzJlN2RjNmNjMDdkYjJkNjBhOWFlN2E3NmFhYTQ5YmQwZjc3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2RmZWVlZjE4ODExMDFmMmNiMTE2NDRmM2EyYWZkZmMyMDQ1ZTE5OTE5MTUyOTIzZjM2N2ExNzY3YzExY2NlZGEnLFxuICAgICAgICAnZWNmYjcwNTZjZjFkZTA0MmY5NDIwYmFiMzk2NzkzYzBjMzkwYmRlNzRiNGJiZGZmMTZhODNhZTA5YTlhNzUxNydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2ZDdlZjZiMTc1NDNmODM3M2M1NzNmNDRlMWYzODk4MzVkODliY2JjNjA2MmNlZDM2YzgyZGY4M2I4ZmFlODU5JyxcbiAgICAgICAgJ2NkNDUwZWMzMzU0Mzg5ODZkZmVmYTEwYzU3ZmVhOWJjYzUyMWEwOTU5YjJkODBiYmY3NGIxOTBkY2E3MTJkMTAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTc1NjA1ZDU5MTAyYTVhMjY4NDUwMGQzYjk5MWYyZTNmM2M4OGI5MzIyNTU0NzAzNWFmMjVhZjY2ZTA0NTQxZicsXG4gICAgICAgICdmNWM1NDc1NGE4ZjcxZWU1NDBiOWI0ODcyODQ3M2UzMTRmNzI5YWM1MzA4YjA2OTM4MzYwOTkwZTJiZmFkMTI1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2ViOTg2NjBmNGM0ZGZhYTA2YTJiZTQ1M2Q1MDIwYmM5OWEwYzJlNjBhYmUzODg0NTdkZDQzZmVmYjFlZDYyMGMnLFxuICAgICAgICAnNmNiOWE4ODc2ZDljYjg1MjA2MDlhZjNhZGQyNmNkMjBhMGE3Y2Q4YTk0MTExMzFjZTg1ZjQ0MTAwMDk5MjIzZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxM2U4N2IwMjdkODUxNGQzNTkzOWYyZTY4OTJiMTk5MjIxNTQ1OTY5NDE4ODgzMzZkYzM1NjNlM2I4ZGJhOTQyJyxcbiAgICAgICAgJ2ZlZjVhM2M2ODA1OWE2ZGVjNWQ2MjQxMTRiZjFlOTFhYWMyYjlkYTU2OGQ2YWJlYjI1NzBkNTU2NDZiOGFkZjEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZWUxNjMwMjZlOWZkNmZlMDE3YzM4ZjA2YTViZTZmYzEyNTQyNGIzNzFjZTI3MDhlN2JmNDQ5MTY5MWU1NzY0YScsXG4gICAgICAgICcxYWNiMjUwZjI1NWRkNjFjNDNkOTRjY2M2NzBkMGY1OGY0OWFlM2ZhMTViOTY2MjNlNTQzMGRhMGFkNmM2MmIyJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2IyNjhmNWVmOWFkNTFlNGQ3OGRlM2E3NTBjMmRjODliMWU2MjZkNDM1MDU4Njc5OTk5MzJlNWRiMzNhZjNkODAnLFxuICAgICAgICAnNWYzMTBkNGIzYzk5YjllYmIxOWY3N2Q0MWMxZGVlMDE4Y2YwZDM0ZmQ0MTkxNjE0MDAzZTk0NWExMjE2ZTQyMydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmZjA3ZjMxMThhOWRmMDM1ZTlmYWQ4NWViNmM3YmZlNDJiMDJmMDFjYTk5Y2VlYTNiZjdmZmRiYTkzYzQ3NTBkJyxcbiAgICAgICAgJzQzODEzNmQ2MDNlODU4YTNhNWM0NDBjMzhlY2NiYWRkYzFkMjk0MjExNGUyZWRkZDQ3NDBkMDk4Y2VkMWYwZDgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGQ4Yjk4NTVjN2MwNTJhMzQxNDZmZDIwZmZiNjU4YmVhNGI5ZjY5ZTBkODI1ZWJlYzE2ZThjM2NlMmI1MjZhMScsXG4gICAgICAgICdjZGI1NTllZWRjMmQ3OWY5MjZiYWY0NGZiODRlYTRkNDRiY2Y1MGZlZTUxZDdjZWIzMGUyZTdmNDYzMDM2NzU4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzUyZGIwYjUzODRkZmJmMDViZmE5ZDQ3MmQ3YWUyNmRmZTRiODUxY2VjYTkxYjFlYmE1NDI2MzE4MGRhMzJiNjMnLFxuICAgICAgICAnYzNiOTk3ZDA1MGVlNWQ0MjNlYmFmNjZhNmRiOWY1N2IzMTgwYzkwMjg3NTY3OWRlOTI0YjY5ZDg0YTdiMzc1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2U2MmY5NDkwZDNkNTFkYTYzOTVlZmQyNGU4MDkxOWNjN2QwZjI5YzNmM2ZhNDhjNmZmZjU0M2JlY2JkNDMzNTInLFxuICAgICAgICAnNmQ4OWFkN2JhNDg3NmIwYjIyYzJjYTI4MGM2ODI4NjJmMzQyYzg1OTFmMWRhZjUxNzBlMDdiZmQ5Y2NhZmE3ZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3ZjMwZWEyNDc2YjM5OWI0OTU3NTA5Yzg4Zjc3ZDAxOTFhZmEyZmY1Y2I3YjE0ZmQ2ZDhlN2Q2NWFhYWIxMTkzJyxcbiAgICAgICAgJ2NhNWVmN2Q0YjIzMWM5NGMzYjE1Mzg5YTVmNjMxMWU5ZGFmZjdiYjY3YjEwM2U5ODgwZWY0YmZmNjM3YWNhZWMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNTA5OGZmMWUxZDlmMTRmYjQ2YTIxMGZhZGE2YzkwM2ZlZjBmYjdiNGExZGQxZDlhYzYwYTAzNjE4MDBiN2EwMCcsXG4gICAgICAgICc5NzMxMTQxZDgxZmM4ZjgwODRkMzdjNmU3NTQyMDA2YjNlZTFiNDBkNjBkZmU1MzYyYTViMTMyZmQxN2RkYzAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzJiNzhjN2RlOWVlNTEyYTcyODk1YmU2YjljYmVmYTZlMmYzYzRjY2NlNDQ1Yzk2YjlmMmM4MWUyNzc4YWQ1OCcsXG4gICAgICAgICdlZTE4NDlmNTEzZGY3MWUzMmVmYzM4OTZlZTI4MjYwYzczYmI4MDU0N2FlMjI3NWJhNDk3MjM3Nzk0Yzg3NTNjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2UyY2I3NGZkZGM4ZTlmYmNkMDc2ZWVmMmE3YzcyYjBjZTM3ZDUwZjA4MjY5ZGZjMDc0YjU4MTU1MDU0N2E0ZjcnLFxuICAgICAgICAnZDNhYTJlZDcxYzlkZDIyNDdhNjJkZjA2MjczNmViMGJhZGRlYTllMzYxMjJkMmJlODY0MWFiY2IwMDVjYzRhNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4NDM4NDQ3NTY2ZDRkN2JlZGFkYzI5OTQ5NmFiMzU3NDI2MDA5YTM1ZjIzNWNiMTQxYmUwZDk5Y2QxMGFlM2E4JyxcbiAgICAgICAgJ2M0ZTEwMjA5MTY5ODBhNGRhNWQwMWFjNWU2YWQzMzA3MzRlZjBkNzkwNjYzMWM0ZjIzOTA0MjZiMmVkZDc5MWYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDE2MmQ0ODhiODk0MDIwMzliNTg0YzZmYzZjMzA4ODcwNTg3ZDljNDZmNjYwYjg3OGFiNjVjODJjNzExZDY3ZScsXG4gICAgICAgICc2NzE2M2U5MDMyMzYyODlmNzc2ZjIyYzI1ZmI4YTNhZmMxNzMyZjJiODRiNGU5NWRiZGE0N2FlNWEwODUyNjQ5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzNmYWQzZmE4NGNhZjBmMzRmMGY4OWJmZDJkY2Y1NGZjMTc1ZDc2N2FlYzNlNTA2ODRmM2JhNGE0YmY1ZjY4M2QnLFxuICAgICAgICAnY2QxYmM3Y2I2Y2M0MDdiYjJmMGNhNjQ3YzcxOGE3MzBjZjcxODcyZTdkMGQyYTUzZmEyMGVmY2RmZTYxODI2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzY3NGYyNjAwYTMwMDdhMDA1NjhjMWE3Y2UwNWQwODE2YzFmYjg0YmYxMzcwNzk4ZjFjNjk1MzJmYWViMWE4NmInLFxuICAgICAgICAnMjk5ZDIxZjk0MTNmMzNiM2VkZjQzYjI1NzAwNDU4MGI3MGRiNTdkYTBiMTgyMjU5ZTA5ZWVjYzY5ZTBkMzhhNSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkMzJmNGRhNTRhZGU3NGFiYjgxYjgxNWFkMWZiM2IyNjNkODJkNmM2OTI3MTRiY2ZmODdkMjliZDVlZTlmMDhmJyxcbiAgICAgICAgJ2Y5NDI5ZTczOGI4ZTUzYjk2OGU5OTAxNmMwNTk3MDc3ODJlMTRmNDUzNTM1OWQ1ODJmYzQxNjkxMGIzZWVhODcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzBlNGU2NzA0MzUzODU1NTZlNTkzNjU3MTM1ODQ1ZDM2ZmJiNjkzMWY3MmIwOGNiMWVkOTU0ZjFlM2NlM2ZmNicsXG4gICAgICAgICc0NjJmOWJjZTYxOTg5ODYzODQ5OTM1MDExM2JiYzliMTBhODc4ZDM1ZGE3MDc0MGRjNjk1YTU1OWViODhkYjdiJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2JlMjA2MjAwM2M1MWNjMzAwNDY4MjkwNDMzMGU0ZGVlN2YzZGNkMTBiMDFlNTgwYmYxOTcxYjA0ZDRjYWQyOTcnLFxuICAgICAgICAnNjIxODhiYzQ5ZDYxZTU0Mjg1NzNkNDhhNzRlMWM2NTViMWM2MTA5MDkwNTY4MmEwZDU1NThlZDcyZGNjYjliYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5MzE0NDQyM2FjZTM0NTFlZDI5ZTBmYjlhYzJhZjIxMWNiNmU4NGE2MDFkZjU5OTNjNDE5ODU5ZmZmNWRmMDRhJyxcbiAgICAgICAgJzdjMTBkZmIxNjRjMzQyNWY1YzcxYTNmOWQ3OTkyMDM4ZjEwNjUyMjRmNzJiYjlkMWQ5MDJhNmQxMzAzN2I0N2MnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYjAxNWY4MDQ0ZjVmY2JkY2YyMWNhMjZkNmMzNGZiODE5NzgyOTIwNWM3YjdkMmE3Y2I2NjQxOGMxNTdiMTEyYycsXG4gICAgICAgICdhYjhjMWUwODZkMDRlODEzNzQ0YTY1NWIyZGY4ZDVmODNiM2NkYzZmYWEzMDg4YzFkM2FlYTE0NTRlM2ExZDVmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2Q1ZTllMWRhNjQ5ZDk3ZDg5ZTQ4NjgxMTdhNDY1YTNhNGY4YTE4ZGU1N2ExNDBkMzZiM2YyYWYzNDFhMjFiNTInLFxuICAgICAgICAnNGNiMDQ0MzdmMzkxZWQ3MzExMWExM2NjMWQ0ZGQwZGIxNjkzNDY1YzIyNDA0ODBkODk1NWU4NTkyZjI3NDQ3YSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkM2FlNDEwNDdkZDdjYTA2NWRiZjhlZDc3Yjk5MjQzOTk4MzAwNWNkNzJlMTZkNmY5OTZhNTMxNmQzNjk2NmJiJyxcbiAgICAgICAgJ2JkMWFlYjIxYWQyMmViYjIyYTEwZjAzMDM0MTdjNmQ5NjRmOGNkZDdkZjBhY2E2MTRiMTBkYzE0ZDEyNWFjNDYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDYzZTI3NjNkODg1Zjk1OGZjNjZjZGQyMjgwMGYwYTQ4NzE5N2QwYTgyZTM3N2I0OWY4MGFmODdjODk3YjA2NScsXG4gICAgICAgICdiZmVmYWNkYjBlNWQwZmQ3ZGYzYTMxMWE5NGRlMDYyYjI2YjgwYzYxZmJjOTc1MDhiNzk5OTI2NzFlZjdjYTdmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc5ODVmZGZkMTI3YzA1NjdjNmY1M2VjMWJiNjNlYzMxNThlNTk3YzQwYmZlNzQ3YzgzY2RkZmM5MTA2NDE5MTcnLFxuICAgICAgICAnNjAzYzEyZGFmM2Q5ODYyZWYyYjI1ZmUxZGUyODlhZWQyNGVkMjkxZTBlYzY3MDg3MDNhNWJkNTY3ZjMyZWQwMydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3NGExYWQ2YjVmNzZlMzlkYjJkZDI0OTQxMGVhYzdmOTllNzRjNTljYjgzZDJkMGVkNWZmMTU0M2RhNzcwM2U5JyxcbiAgICAgICAgJ2NjNjE1N2VmMThjOWM2M2NkNjE5M2Q4MzYzMWJiZWEwMDkzZTA5Njg5NDJlOGMzM2Q1NzM3ZmQ3OTBlMGRiMDgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzA2ODJhNTA3MDMzNzVmNjAyZDQxNjY2NGJhMTliN2ZjOWJhYjQyYzcyNzQ3NDYzYTcxZDA4OTZiMjJmNmRhMycsXG4gICAgICAgICc1NTNlMDRmNmIwMThiNGZhNmM4ZjM5ZTdmMzExZDMxNzYyOTBkMGUwZjE5Y2E3M2YxNzcxNGQ5OTc3YTIyZmY4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzllMjE1OGYwZDdjMGQ1ZjI2YzM3OTFlZmVmYTc5NTk3NjU0ZTdhMmIyNDY0ZjUyYjFlZTZjMTM0Nzc2OWVmNTcnLFxuICAgICAgICAnNzEyZmNkZDFiOTA1M2YwOTAwM2EzNDgxZmE3NzYyZTlmZmQ3YzhlZjM1YTM4NTA5ZTJmYmYyNjI5MDA4MzczJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE3NmUyNjk4OWE0M2M5Y2ZlYmE0MDI5YzIwMjUzOGMyODE3MmU1NjZlM2M0ZmNlNzMyMjg1N2YzYmUzMjdkNjYnLFxuICAgICAgICAnZWQ4Y2M5ZDA0YjI5ZWI4NzdkMjcwYjQ4NzhkYzQzYzE5YWVmZDMxZjRlZWUwOWVlN2I0NzgzNGMxZmE0YjFjMydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3NWQ0NmVmZWEzNzcxZTZlNjhhYmI4OWExM2FkNzQ3ZWNmMTg5MjM5M2RmYzRmMWI3MDA0Nzg4YzUwMzc0ZGE4JyxcbiAgICAgICAgJzk4NTIzOTBhOTk1MDc2NzlmZDBiODZmZDJiMzlhODY4ZDdlZmMyMjE1MTM0NmUxYTNjYTQ3MjY1ODZhNmJlZDgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODA5YTIwYzY3ZDY0OTAwZmZiNjk4YzRjODI1ZjZkNWYyMzEwZmIwNDUxYzg2OTM0NWI3MzE5ZjY0NTYwNTcyMScsXG4gICAgICAgICc5ZTk5NDk4MGQ5OTE3ZTIyYjc2YjA2MTkyN2ZhMDQxNDNkMDk2Y2NjNTQ5NjNlNmE1ZWJmYTVmM2Y4ZTI4NmMxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzFiMzg5MDNhNDNmN2YxMTRlZDQ1MDBiNGVhYzcwODNmZGVmZWNlMWNmMjljNjM1MjhkNTYzNDQ2Zjk3MmMxODAnLFxuICAgICAgICAnNDAzNmVkYzkzMWE2MGFlODg5MzUzZjc3ZmQ1M2RlNGEyNzA4YjI2YjZmNWRhNzJhZDMzOTQxMTlkYWY0MDhmOSdcbiAgICAgIF1cbiAgICBdXG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjdXJ2ZSA9IGV4cG9ydHM7XG5cbmN1cnZlLmJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmN1cnZlLnNob3J0ID0gcmVxdWlyZSgnLi9zaG9ydCcpO1xuY3VydmUubW9udCA9IHJlcXVpcmUoJy4vbW9udCcpO1xuY3VydmUuZWR3YXJkcyA9IHJlcXVpcmUoJy4vZWR3YXJkcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBhc3NlcnQgPSB1dGlscy5hc3NlcnQ7XG52YXIgY2FjaGVkUHJvcGVydHkgPSB1dGlscy5jYWNoZWRQcm9wZXJ0eTtcbnZhciBwYXJzZUJ5dGVzID0gdXRpbHMucGFyc2VCeXRlcztcblxuLyoqXG4qIEBwYXJhbSB7RUREU0F9IGVkZHNhIC0gZWRkc2EgaW5zdGFuY2VcbiogQHBhcmFtIHtBcnJheTxCeXRlcz58T2JqZWN0fSBzaWcgLVxuKiBAcGFyYW0ge0FycmF5PEJ5dGVzPnxQb2ludH0gW3NpZy5SXSAtIFIgcG9pbnQgYXMgUG9pbnQgb3IgYnl0ZXNcbiogQHBhcmFtIHtBcnJheTxCeXRlcz58Ym59IFtzaWcuU10gLSBTIHNjYWxhciBhcyBibiBvciBieXRlc1xuKiBAcGFyYW0ge0FycmF5PEJ5dGVzPn0gW3NpZy5SZW5jb2RlZF0gLSBSIHBvaW50IGVuY29kZWRcbiogQHBhcmFtIHtBcnJheTxCeXRlcz59IFtzaWcuU2VuY29kZWRdIC0gUyBzY2FsYXIgZW5jb2RlZFxuKi9cbmZ1bmN0aW9uIFNpZ25hdHVyZShlZGRzYSwgc2lnKSB7XG4gIHRoaXMuZWRkc2EgPSBlZGRzYTtcblxuICBpZiAodHlwZW9mIHNpZyAhPT0gJ29iamVjdCcpXG4gICAgc2lnID0gcGFyc2VCeXRlcyhzaWcpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHNpZykpIHtcbiAgICBzaWcgPSB7XG4gICAgICBSOiBzaWcuc2xpY2UoMCwgZWRkc2EuZW5jb2RpbmdMZW5ndGgpLFxuICAgICAgUzogc2lnLnNsaWNlKGVkZHNhLmVuY29kaW5nTGVuZ3RoKVxuICAgIH07XG4gIH1cblxuICBhc3NlcnQoc2lnLlIgJiYgc2lnLlMsICdTaWduYXR1cmUgd2l0aG91dCBSIG9yIFMnKTtcblxuICBpZiAoZWRkc2EuaXNQb2ludChzaWcuUikpXG4gICAgdGhpcy5fUiA9IHNpZy5SO1xuICBpZiAoc2lnLlMgaW5zdGFuY2VvZiBCTilcbiAgICB0aGlzLl9TID0gc2lnLlM7XG5cbiAgdGhpcy5fUmVuY29kZWQgPSBBcnJheS5pc0FycmF5KHNpZy5SKSA/IHNpZy5SIDogc2lnLlJlbmNvZGVkO1xuICB0aGlzLl9TZW5jb2RlZCA9IEFycmF5LmlzQXJyYXkoc2lnLlMpID8gc2lnLlMgOiBzaWcuU2VuY29kZWQ7XG59XG5cbmNhY2hlZFByb3BlcnR5KFNpZ25hdHVyZSwgJ1MnLCBmdW5jdGlvbiBTKCkge1xuICByZXR1cm4gdGhpcy5lZGRzYS5kZWNvZGVJbnQodGhpcy5TZW5jb2RlZCgpKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShTaWduYXR1cmUsICdSJywgZnVuY3Rpb24gUigpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuZGVjb2RlUG9pbnQodGhpcy5SZW5jb2RlZCgpKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShTaWduYXR1cmUsICdSZW5jb2RlZCcsIGZ1bmN0aW9uIFJlbmNvZGVkKCkge1xuICByZXR1cm4gdGhpcy5lZGRzYS5lbmNvZGVQb2ludCh0aGlzLlIoKSk7XG59KTtcblxuY2FjaGVkUHJvcGVydHkoU2lnbmF0dXJlLCAnU2VuY29kZWQnLCBmdW5jdGlvbiBTZW5jb2RlZCgpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuZW5jb2RlSW50KHRoaXMuUygpKTtcbn0pO1xuXG5TaWduYXR1cmUucHJvdG90eXBlLnRvQnl0ZXMgPSBmdW5jdGlvbiB0b0J5dGVzKCkge1xuICByZXR1cm4gdGhpcy5SZW5jb2RlZCgpLmNvbmNhdCh0aGlzLlNlbmNvZGVkKCkpO1xufTtcblxuU2lnbmF0dXJlLnByb3RvdHlwZS50b0hleCA9IGZ1bmN0aW9uIHRvSGV4KCkge1xuICByZXR1cm4gdXRpbHMuZW5jb2RlKHRoaXMudG9CeXRlcygpLCAnaGV4JykudG9VcHBlckNhc2UoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmF0dXJlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbnZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIE1vbnRDdXJ2ZShjb25mKSB7XG4gIEJhc2UuY2FsbCh0aGlzLCAnbW9udCcsIGNvbmYpO1xuXG4gIHRoaXMuYSA9IG5ldyBCTihjb25mLmEsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYiA9IG5ldyBCTihjb25mLmIsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuaTQgPSBuZXcgQk4oNCkudG9SZWQodGhpcy5yZWQpLnJlZEludm0oKTtcbiAgdGhpcy50d28gPSBuZXcgQk4oMikudG9SZWQodGhpcy5yZWQpO1xuICB0aGlzLmEyNCA9IHRoaXMuaTQucmVkTXVsKHRoaXMuYS5yZWRBZGQodGhpcy50d28pKTtcbn1cbmluaGVyaXRzKE1vbnRDdXJ2ZSwgQmFzZSk7XG5tb2R1bGUuZXhwb3J0cyA9IE1vbnRDdXJ2ZTtcblxuTW9udEN1cnZlLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIHZhbGlkYXRlKHBvaW50KSB7XG4gIHZhciB4ID0gcG9pbnQubm9ybWFsaXplKCkueDtcbiAgdmFyIHgyID0geC5yZWRTcXIoKTtcbiAgdmFyIHJocyA9IHgyLnJlZE11bCh4KS5yZWRBZGQoeDIucmVkTXVsKHRoaXMuYSkpLnJlZEFkZCh4KTtcbiAgdmFyIHkgPSByaHMucmVkU3FydCgpO1xuXG4gIHJldHVybiB5LnJlZFNxcigpLmNtcChyaHMpID09PSAwO1xufTtcblxuZnVuY3Rpb24gUG9pbnQoY3VydmUsIHgsIHopIHtcbiAgQmFzZS5CYXNlUG9pbnQuY2FsbCh0aGlzLCBjdXJ2ZSwgJ3Byb2plY3RpdmUnKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeiA9PT0gbnVsbCkge1xuICAgIHRoaXMueCA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMueiA9IHRoaXMuY3VydmUuemVybztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnggPSBuZXcgQk4oeCwgMTYpO1xuICAgIHRoaXMueiA9IG5ldyBCTih6LCAxNik7XG4gICAgaWYgKCF0aGlzLngucmVkKVxuICAgICAgdGhpcy54ID0gdGhpcy54LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICBpZiAoIXRoaXMuei5yZWQpXG4gICAgICB0aGlzLnogPSB0aGlzLnoudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICB9XG59XG5pbmhlcml0cyhQb2ludCwgQmFzZS5CYXNlUG9pbnQpO1xuXG5Nb250Q3VydmUucHJvdG90eXBlLmRlY29kZVBvaW50ID0gZnVuY3Rpb24gZGVjb2RlUG9pbnQoYnl0ZXMsIGVuYykge1xuICByZXR1cm4gdGhpcy5wb2ludCh1dGlscy50b0FycmF5KGJ5dGVzLCBlbmMpLCAxKTtcbn07XG5cbk1vbnRDdXJ2ZS5wcm90b3R5cGUucG9pbnQgPSBmdW5jdGlvbiBwb2ludCh4LCB6KSB7XG4gIHJldHVybiBuZXcgUG9pbnQodGhpcywgeCwgeik7XG59O1xuXG5Nb250Q3VydmUucHJvdG90eXBlLnBvaW50RnJvbUpTT04gPSBmdW5jdGlvbiBwb2ludEZyb21KU09OKG9iaikge1xuICByZXR1cm4gUG9pbnQuZnJvbUpTT04odGhpcywgb2JqKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5wcmVjb21wdXRlID0gZnVuY3Rpb24gcHJlY29tcHV0ZSgpIHtcbiAgLy8gTm8tb3Bcbn07XG5cblBvaW50LnByb3RvdHlwZS5fZW5jb2RlID0gZnVuY3Rpb24gX2VuY29kZSgpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0WCgpLnRvQXJyYXkoJ2JlJywgdGhpcy5jdXJ2ZS5wLmJ5dGVMZW5ndGgoKSk7XG59O1xuXG5Qb2ludC5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKGN1cnZlLCBvYmopIHtcbiAgcmV0dXJuIG5ldyBQb2ludChjdXJ2ZSwgb2JqWzBdLCBvYmpbMV0gfHwgY3VydmUub25lKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiAnPEVDIFBvaW50IEluZmluaXR5Pic7XG4gIHJldHVybiAnPEVDIFBvaW50IHg6ICcgKyB0aGlzLnguZnJvbVJlZCgpLnRvU3RyaW5nKDE2LCAyKSArXG4gICAgICAnIHo6ICcgKyB0aGlzLnouZnJvbVJlZCgpLnRvU3RyaW5nKDE2LCAyKSArICc+Jztcbn07XG5cblBvaW50LnByb3RvdHlwZS5pc0luZmluaXR5ID0gZnVuY3Rpb24gaXNJbmZpbml0eSgpIHtcbiAgLy8gWFhYIFRoaXMgY29kZSBhc3N1bWVzIHRoYXQgemVybyBpcyBhbHdheXMgemVybyBpbiByZWRcbiAgcmV0dXJuIHRoaXMuei5jbXBuKDApID09PSAwO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmRibCA9IGZ1bmN0aW9uIGRibCgpIHtcbiAgLy8gaHR0cDovL2h5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by1tb250Z29tLXh6Lmh0bWwjZG91YmxpbmctZGJsLTE5ODctbS0zXG4gIC8vIDJNICsgMlMgKyA0QVxuXG4gIC8vIEEgPSBYMSArIFoxXG4gIHZhciBhID0gdGhpcy54LnJlZEFkZCh0aGlzLnopO1xuICAvLyBBQSA9IEFeMlxuICB2YXIgYWEgPSBhLnJlZFNxcigpO1xuICAvLyBCID0gWDEgLSBaMVxuICB2YXIgYiA9IHRoaXMueC5yZWRTdWIodGhpcy56KTtcbiAgLy8gQkIgPSBCXjJcbiAgdmFyIGJiID0gYi5yZWRTcXIoKTtcbiAgLy8gQyA9IEFBIC0gQkJcbiAgdmFyIGMgPSBhYS5yZWRTdWIoYmIpO1xuICAvLyBYMyA9IEFBICogQkJcbiAgdmFyIG54ID0gYWEucmVkTXVsKGJiKTtcbiAgLy8gWjMgPSBDICogKEJCICsgQTI0ICogQylcbiAgdmFyIG56ID0gYy5yZWRNdWwoYmIucmVkQWRkKHRoaXMuY3VydmUuYTI0LnJlZE11bChjKSkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnopO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydGVkIG9uIE1vbnRnb21lcnkgY3VydmUnKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5kaWZmQWRkID0gZnVuY3Rpb24gZGlmZkFkZChwLCBkaWZmKSB7XG4gIC8vIGh0dHA6Ly9oeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tbW9udGdvbS14ei5odG1sI2RpZmZhZGQtZGFkZC0xOTg3LW0tM1xuICAvLyA0TSArIDJTICsgNkFcblxuICAvLyBBID0gWDIgKyBaMlxuICB2YXIgYSA9IHRoaXMueC5yZWRBZGQodGhpcy56KTtcbiAgLy8gQiA9IFgyIC0gWjJcbiAgdmFyIGIgPSB0aGlzLngucmVkU3ViKHRoaXMueik7XG4gIC8vIEMgPSBYMyArIFozXG4gIHZhciBjID0gcC54LnJlZEFkZChwLnopO1xuICAvLyBEID0gWDMgLSBaM1xuICB2YXIgZCA9IHAueC5yZWRTdWIocC56KTtcbiAgLy8gREEgPSBEICogQVxuICB2YXIgZGEgPSBkLnJlZE11bChhKTtcbiAgLy8gQ0IgPSBDICogQlxuICB2YXIgY2IgPSBjLnJlZE11bChiKTtcbiAgLy8gWDUgPSBaMSAqIChEQSArIENCKV4yXG4gIHZhciBueCA9IGRpZmYuei5yZWRNdWwoZGEucmVkQWRkKGNiKS5yZWRTcXIoKSk7XG4gIC8vIFo1ID0gWDEgKiAoREEgLSBDQileMlxuICB2YXIgbnogPSBkaWZmLngucmVkTXVsKGRhLnJlZElTdWIoY2IpLnJlZFNxcigpKTtcbiAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobngsIG56KTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwoaykge1xuICB2YXIgdCA9IGsuY2xvbmUoKTtcbiAgdmFyIGEgPSB0aGlzOyAvLyAoTiAvIDIpICogUSArIFFcbiAgdmFyIGIgPSB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpOyAvLyAoTiAvIDIpICogUVxuICB2YXIgYyA9IHRoaXM7IC8vIFFcblxuICBmb3IgKHZhciBiaXRzID0gW107IHQuY21wbigwKSAhPT0gMDsgdC5pdXNocm4oMSkpXG4gICAgYml0cy5wdXNoKHQuYW5kbG4oMSkpO1xuXG4gIGZvciAodmFyIGkgPSBiaXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGJpdHNbaV0gPT09IDApIHtcbiAgICAgIC8vIE4gKiBRICsgUSA9ICgoTiAvIDIpICogUSArIFEpKSArIChOIC8gMikgKiBRXG4gICAgICBhID0gYS5kaWZmQWRkKGIsIGMpO1xuICAgICAgLy8gTiAqIFEgPSAyICogKChOIC8gMikgKiBRICsgUSkpXG4gICAgICBiID0gYi5kYmwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTiAqIFEgPSAoKE4gLyAyKSAqIFEgKyBRKSArICgoTiAvIDIpICogUSlcbiAgICAgIGIgPSBhLmRpZmZBZGQoYiwgYyk7XG4gICAgICAvLyBOICogUSArIFEgPSAyICogKChOIC8gMikgKiBRICsgUSlcbiAgICAgIGEgPSBhLmRibCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYjtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiBtdWxBZGQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnRlZCBvbiBNb250Z29tZXJ5IGN1cnZlJyk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuanVtbEFkZCA9IGZ1bmN0aW9uIGp1bWxBZGQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnRlZCBvbiBNb250Z29tZXJ5IGN1cnZlJyk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcShvdGhlcikge1xuICByZXR1cm4gdGhpcy5nZXRYKCkuY21wKG90aGVyLmdldFgoKSkgPT09IDA7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKCkge1xuICB0aGlzLnggPSB0aGlzLngucmVkTXVsKHRoaXMuei5yZWRJbnZtKCkpO1xuICB0aGlzLnogPSB0aGlzLmN1cnZlLm9uZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uIGdldFgoKSB7XG4gIC8vIE5vcm1hbGl6ZSBjb29yZGluYXRlc1xuICB0aGlzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiB0aGlzLnguZnJvbVJlZCgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc2ggPSByZXF1aXJlKCdoYXNoLmpzJyk7XG52YXIgY3VydmVzID0gcmVxdWlyZSgnLi4vY3VydmVzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcbnZhciBwYXJzZUJ5dGVzID0gdXRpbHMucGFyc2VCeXRlcztcbnZhciBLZXlQYWlyID0gcmVxdWlyZSgnLi9rZXknKTtcbnZhciBTaWduYXR1cmUgPSByZXF1aXJlKCcuL3NpZ25hdHVyZScpO1xuXG5mdW5jdGlvbiBFRERTQShjdXJ2ZSkge1xuICBhc3NlcnQoY3VydmUgPT09ICdlZDI1NTE5JywgJ29ubHkgdGVzdGVkIHdpdGggZWQyNTUxOSBzbyBmYXInKTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRUREU0EpKVxuICAgIHJldHVybiBuZXcgRUREU0EoY3VydmUpO1xuXG4gIHZhciBjdXJ2ZSA9IGN1cnZlc1tjdXJ2ZV0uY3VydmU7XG4gIHRoaXMuY3VydmUgPSBjdXJ2ZTtcbiAgdGhpcy5nID0gY3VydmUuZztcbiAgdGhpcy5nLnByZWNvbXB1dGUoY3VydmUubi5iaXRMZW5ndGgoKSArIDEpO1xuXG4gIHRoaXMucG9pbnRDbGFzcyA9IGN1cnZlLnBvaW50KCkuY29uc3RydWN0b3I7XG4gIHRoaXMuZW5jb2RpbmdMZW5ndGggPSBNYXRoLmNlaWwoY3VydmUubi5iaXRMZW5ndGgoKSAvIDgpO1xuICB0aGlzLmhhc2ggPSBoYXNoLnNoYTUxMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFRERTQTtcblxuLyoqXG4qIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSBieXRlc1xuKiBAcGFyYW0ge0FycmF5fFN0cmluZ3xLZXlQYWlyfSBzZWNyZXQgLSBzZWNyZXQgYnl0ZXMgb3IgYSBrZXlwYWlyXG4qIEByZXR1cm5zIHtTaWduYXR1cmV9IC0gc2lnbmF0dXJlXG4qL1xuRUREU0EucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbiBzaWduKG1lc3NhZ2UsIHNlY3JldCkge1xuICBtZXNzYWdlID0gcGFyc2VCeXRlcyhtZXNzYWdlKTtcbiAgdmFyIGtleSA9IHRoaXMua2V5RnJvbVNlY3JldChzZWNyZXQpO1xuICB2YXIgciA9IHRoaXMuaGFzaEludChrZXkubWVzc2FnZVByZWZpeCgpLCBtZXNzYWdlKTtcbiAgdmFyIFIgPSB0aGlzLmcubXVsKHIpO1xuICB2YXIgUmVuY29kZWQgPSB0aGlzLmVuY29kZVBvaW50KFIpO1xuICB2YXIgc18gPSB0aGlzLmhhc2hJbnQoUmVuY29kZWQsIGtleS5wdWJCeXRlcygpLCBtZXNzYWdlKVxuICAgICAgICAgICAgICAgLm11bChrZXkucHJpdigpKTtcbiAgdmFyIFMgPSByLmFkZChzXykudW1vZCh0aGlzLmN1cnZlLm4pO1xuICByZXR1cm4gdGhpcy5tYWtlU2lnbmF0dXJlKHsgUjogUiwgUzogUywgUmVuY29kZWQ6IFJlbmNvZGVkIH0pO1xufTtcblxuLyoqXG4qIEBwYXJhbSB7QXJyYXl9IG1lc3NhZ2UgLSBtZXNzYWdlIGJ5dGVzXG4qIEBwYXJhbSB7QXJyYXl8U3RyaW5nfFNpZ25hdHVyZX0gc2lnIC0gc2lnIGJ5dGVzXG4qIEBwYXJhbSB7QXJyYXl8U3RyaW5nfFBvaW50fEtleVBhaXJ9IHB1YiAtIHB1YmxpYyBrZXlcbiogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiBwdWJsaWMga2V5IG1hdGNoZXMgc2lnIG9mIG1lc3NhZ2VcbiovXG5FRERTQS5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UsIHNpZywgcHViKSB7XG4gIG1lc3NhZ2UgPSBwYXJzZUJ5dGVzKG1lc3NhZ2UpO1xuICBzaWcgPSB0aGlzLm1ha2VTaWduYXR1cmUoc2lnKTtcbiAgdmFyIGtleSA9IHRoaXMua2V5RnJvbVB1YmxpYyhwdWIpO1xuICB2YXIgaCA9IHRoaXMuaGFzaEludChzaWcuUmVuY29kZWQoKSwga2V5LnB1YkJ5dGVzKCksIG1lc3NhZ2UpO1xuICB2YXIgU0cgPSB0aGlzLmcubXVsKHNpZy5TKCkpO1xuICB2YXIgUnBsdXNBaCA9IHNpZy5SKCkuYWRkKGtleS5wdWIoKS5tdWwoaCkpO1xuICByZXR1cm4gUnBsdXNBaC5lcShTRyk7XG59O1xuXG5FRERTQS5wcm90b3R5cGUuaGFzaEludCA9IGZ1bmN0aW9uIGhhc2hJbnQoKSB7XG4gIHZhciBoYXNoID0gdGhpcy5oYXNoKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgIGhhc2gudXBkYXRlKGFyZ3VtZW50c1tpXSk7XG4gIHJldHVybiB1dGlscy5pbnRGcm9tTEUoaGFzaC5kaWdlc3QoKSkudW1vZCh0aGlzLmN1cnZlLm4pO1xufTtcblxuRUREU0EucHJvdG90eXBlLmtleUZyb21QdWJsaWMgPSBmdW5jdGlvbiBrZXlGcm9tUHVibGljKHB1Yikge1xuICByZXR1cm4gS2V5UGFpci5mcm9tUHVibGljKHRoaXMsIHB1Yik7XG59O1xuXG5FRERTQS5wcm90b3R5cGUua2V5RnJvbVNlY3JldCA9IGZ1bmN0aW9uIGtleUZyb21TZWNyZXQoc2VjcmV0KSB7XG4gIHJldHVybiBLZXlQYWlyLmZyb21TZWNyZXQodGhpcywgc2VjcmV0KTtcbn07XG5cbkVERFNBLnByb3RvdHlwZS5tYWtlU2lnbmF0dXJlID0gZnVuY3Rpb24gbWFrZVNpZ25hdHVyZShzaWcpIHtcbiAgaWYgKHNpZyBpbnN0YW5jZW9mIFNpZ25hdHVyZSlcbiAgICByZXR1cm4gc2lnO1xuICByZXR1cm4gbmV3IFNpZ25hdHVyZSh0aGlzLCBzaWcpO1xufTtcblxuLyoqXG4qICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWpvc2Vmc3Nvbi1lZGRzYS1lZDI1NTE5LTAzI3NlY3Rpb24tNS4yXG4qXG4qIEVERFNBIGRlZmluZXMgbWV0aG9kcyBmb3IgZW5jb2RpbmcgYW5kIGRlY29kaW5nIHBvaW50cyBhbmQgaW50ZWdlcnMuIFRoZXNlIGFyZVxuKiBoZWxwZXIgY29udmVuaWVuY2UgbWV0aG9kcywgdGhhdCBwYXNzIGFsb25nIHRvIHV0aWxpdHkgZnVuY3Rpb25zIGltcGxpZWRcbiogcGFyYW1ldGVycy5cbipcbiovXG5FRERTQS5wcm90b3R5cGUuZW5jb2RlUG9pbnQgPSBmdW5jdGlvbiBlbmNvZGVQb2ludChwb2ludCkge1xuICB2YXIgZW5jID0gcG9pbnQuZ2V0WSgpLnRvQXJyYXkoJ2xlJywgdGhpcy5lbmNvZGluZ0xlbmd0aCk7XG4gIGVuY1t0aGlzLmVuY29kaW5nTGVuZ3RoIC0gMV0gfD0gcG9pbnQuZ2V0WCgpLmlzT2RkKCkgPyAweDgwIDogMDtcbiAgcmV0dXJuIGVuYztcbn07XG5cbkVERFNBLnByb3RvdHlwZS5kZWNvZGVQb2ludCA9IGZ1bmN0aW9uIGRlY29kZVBvaW50KGJ5dGVzKSB7XG4gIGJ5dGVzID0gdXRpbHMucGFyc2VCeXRlcyhieXRlcyk7XG5cbiAgdmFyIGxhc3RJeCA9IGJ5dGVzLmxlbmd0aCAtIDE7XG4gIHZhciBub3JtZWQgPSBieXRlcy5zbGljZSgwLCBsYXN0SXgpLmNvbmNhdChieXRlc1tsYXN0SXhdICYgfjB4ODApO1xuICB2YXIgeElzT2RkID0gKGJ5dGVzW2xhc3RJeF0gJiAweDgwKSAhPT0gMDtcblxuICB2YXIgeSA9IHV0aWxzLmludEZyb21MRShub3JtZWQpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludEZyb21ZKHksIHhJc09kZCk7XG59O1xuXG5FRERTQS5wcm90b3R5cGUuZW5jb2RlSW50ID0gZnVuY3Rpb24gZW5jb2RlSW50KG51bSkge1xuICByZXR1cm4gbnVtLnRvQXJyYXkoJ2xlJywgdGhpcy5lbmNvZGluZ0xlbmd0aCk7XG59O1xuXG5FRERTQS5wcm90b3R5cGUuZGVjb2RlSW50ID0gZnVuY3Rpb24gZGVjb2RlSW50KGJ5dGVzKSB7XG4gIHJldHVybiB1dGlscy5pbnRGcm9tTEUoYnl0ZXMpO1xufTtcblxuRUREU0EucHJvdG90eXBlLmlzUG9pbnQgPSBmdW5jdGlvbiBpc1BvaW50KHZhbCkge1xuICByZXR1cm4gdmFsIGluc3RhbmNlb2YgdGhpcy5wb2ludENsYXNzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBhc3NlcnQgPSB1dGlscy5hc3NlcnQ7XG5cbmZ1bmN0aW9uIFNpZ25hdHVyZShvcHRpb25zLCBlbmMpIHtcbiAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBTaWduYXR1cmUpXG4gICAgcmV0dXJuIG9wdGlvbnM7XG5cbiAgaWYgKHRoaXMuX2ltcG9ydERFUihvcHRpb25zLCBlbmMpKVxuICAgIHJldHVybjtcblxuICBhc3NlcnQob3B0aW9ucy5yICYmIG9wdGlvbnMucywgJ1NpZ25hdHVyZSB3aXRob3V0IHIgb3IgcycpO1xuICB0aGlzLnIgPSBuZXcgQk4ob3B0aW9ucy5yLCAxNik7XG4gIHRoaXMucyA9IG5ldyBCTihvcHRpb25zLnMsIDE2KTtcbiAgaWYgKG9wdGlvbnMucmVjb3ZlcnlQYXJhbSA9PT0gdW5kZWZpbmVkKVxuICAgIHRoaXMucmVjb3ZlcnlQYXJhbSA9IG51bGw7XG4gIGVsc2VcbiAgICB0aGlzLnJlY292ZXJ5UGFyYW0gPSBvcHRpb25zLnJlY292ZXJ5UGFyYW07XG59XG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hdHVyZTtcblxuZnVuY3Rpb24gUG9zaXRpb24oKSB7XG4gIHRoaXMucGxhY2UgPSAwO1xufVxuXG5mdW5jdGlvbiBnZXRMZW5ndGgoYnVmLCBwKSB7XG4gIHZhciBpbml0aWFsID0gYnVmW3AucGxhY2UrK107XG4gIGlmICghKGluaXRpYWwgJiAweDgwKSkge1xuICAgIHJldHVybiBpbml0aWFsO1xuICB9XG4gIHZhciBvY3RldExlbiA9IGluaXRpYWwgJiAweGY7XG4gIHZhciB2YWwgPSAwO1xuICBmb3IgKHZhciBpID0gMCwgb2ZmID0gcC5wbGFjZTsgaSA8IG9jdGV0TGVuOyBpKyssIG9mZisrKSB7XG4gICAgdmFsIDw8PSA4O1xuICAgIHZhbCB8PSBidWZbb2ZmXTtcbiAgfVxuICBwLnBsYWNlID0gb2ZmO1xuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBybVBhZGRpbmcoYnVmKSB7XG4gIHZhciBpID0gMDtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGggLSAxO1xuICB3aGlsZSAoIWJ1ZltpXSAmJiAhKGJ1ZltpICsgMV0gJiAweDgwKSAmJiBpIDwgbGVuKSB7XG4gICAgaSsrO1xuICB9XG4gIGlmIChpID09PSAwKSB7XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICByZXR1cm4gYnVmLnNsaWNlKGkpO1xufVxuXG5TaWduYXR1cmUucHJvdG90eXBlLl9pbXBvcnRERVIgPSBmdW5jdGlvbiBfaW1wb3J0REVSKGRhdGEsIGVuYykge1xuICBkYXRhID0gdXRpbHMudG9BcnJheShkYXRhLCBlbmMpO1xuICB2YXIgcCA9IG5ldyBQb3NpdGlvbigpO1xuICBpZiAoZGF0YVtwLnBsYWNlKytdICE9PSAweDMwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsZW4gPSBnZXRMZW5ndGgoZGF0YSwgcCk7XG4gIGlmICgobGVuICsgcC5wbGFjZSkgIT09IGRhdGEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChkYXRhW3AucGxhY2UrK10gIT09IDB4MDIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJsZW4gPSBnZXRMZW5ndGgoZGF0YSwgcCk7XG4gIHZhciByID0gZGF0YS5zbGljZShwLnBsYWNlLCBybGVuICsgcC5wbGFjZSk7XG4gIHAucGxhY2UgKz0gcmxlbjtcbiAgaWYgKGRhdGFbcC5wbGFjZSsrXSAhPT0gMHgwMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgc2xlbiA9IGdldExlbmd0aChkYXRhLCBwKTtcbiAgaWYgKGRhdGEubGVuZ3RoICE9PSBzbGVuICsgcC5wbGFjZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcyA9IGRhdGEuc2xpY2UocC5wbGFjZSwgc2xlbiArIHAucGxhY2UpO1xuICBpZiAoclswXSA9PT0gMCAmJiAoclsxXSAmIDB4ODApKSB7XG4gICAgciA9IHIuc2xpY2UoMSk7XG4gIH1cbiAgaWYgKHNbMF0gPT09IDAgJiYgKHNbMV0gJiAweDgwKSkge1xuICAgIHMgPSBzLnNsaWNlKDEpO1xuICB9XG5cbiAgdGhpcy5yID0gbmV3IEJOKHIpO1xuICB0aGlzLnMgPSBuZXcgQk4ocyk7XG4gIHRoaXMucmVjb3ZlcnlQYXJhbSA9IG51bGw7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBjb25zdHJ1Y3RMZW5ndGgoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA8IDB4ODApIHtcbiAgICBhcnIucHVzaChsZW4pO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgb2N0ZXRzID0gMSArIChNYXRoLmxvZyhsZW4pIC8gTWF0aC5MTjIgPj4+IDMpO1xuICBhcnIucHVzaChvY3RldHMgfCAweDgwKTtcbiAgd2hpbGUgKC0tb2N0ZXRzKSB7XG4gICAgYXJyLnB1c2goKGxlbiA+Pj4gKG9jdGV0cyA8PCAzKSkgJiAweGZmKTtcbiAgfVxuICBhcnIucHVzaChsZW4pO1xufVxuXG5TaWduYXR1cmUucHJvdG90eXBlLnRvREVSID0gZnVuY3Rpb24gdG9ERVIoZW5jKSB7XG4gIHZhciByID0gdGhpcy5yLnRvQXJyYXkoKTtcbiAgdmFyIHMgPSB0aGlzLnMudG9BcnJheSgpO1xuXG4gIC8vIFBhZCB2YWx1ZXNcbiAgaWYgKHJbMF0gJiAweDgwKVxuICAgIHIgPSBbIDAgXS5jb25jYXQocik7XG4gIC8vIFBhZCB2YWx1ZXNcbiAgaWYgKHNbMF0gJiAweDgwKVxuICAgIHMgPSBbIDAgXS5jb25jYXQocyk7XG5cbiAgciA9IHJtUGFkZGluZyhyKTtcbiAgcyA9IHJtUGFkZGluZyhzKTtcblxuICB3aGlsZSAoIXNbMF0gJiYgIShzWzFdICYgMHg4MCkpIHtcbiAgICBzID0gcy5zbGljZSgxKTtcbiAgfVxuICB2YXIgYXJyID0gWyAweDAyIF07XG4gIGNvbnN0cnVjdExlbmd0aChhcnIsIHIubGVuZ3RoKTtcbiAgYXJyID0gYXJyLmNvbmNhdChyKTtcbiAgYXJyLnB1c2goMHgwMik7XG4gIGNvbnN0cnVjdExlbmd0aChhcnIsIHMubGVuZ3RoKTtcbiAgdmFyIGJhY2tIYWxmID0gYXJyLmNvbmNhdChzKTtcbiAgdmFyIHJlcyA9IFsgMHgzMCBdO1xuICBjb25zdHJ1Y3RMZW5ndGgocmVzLCBiYWNrSGFsZi5sZW5ndGgpO1xuICByZXMgPSByZXMuY29uY2F0KGJhY2tIYWxmKTtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZShyZXMsIGVuYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIEhtYWNEUkJHID0gcmVxdWlyZSgnaG1hYy1kcmJnJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGN1cnZlcyA9IHJlcXVpcmUoJy4uL2N1cnZlcycpO1xudmFyIHJhbmQgPSByZXF1aXJlKCdicm9yYW5kJyk7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG52YXIgS2V5UGFpciA9IHJlcXVpcmUoJy4va2V5Jyk7XG52YXIgU2lnbmF0dXJlID0gcmVxdWlyZSgnLi9zaWduYXR1cmUnKTtcblxuZnVuY3Rpb24gRUMob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRUMpKVxuICAgIHJldHVybiBuZXcgRUMob3B0aW9ucyk7XG5cbiAgLy8gU2hvcnRjdXQgYGVsbGlwdGljLmVjKGN1cnZlLW5hbWUpYFxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgYXNzZXJ0KGN1cnZlcy5oYXNPd25Qcm9wZXJ0eShvcHRpb25zKSwgJ1Vua25vd24gY3VydmUgJyArIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucyA9IGN1cnZlc1tvcHRpb25zXTtcbiAgfVxuXG4gIC8vIFNob3J0Y3V0IGZvciBgZWxsaXB0aWMuZWMoZWxsaXB0aWMuY3VydmVzLmN1cnZlTmFtZSlgXG4gIGlmIChvcHRpb25zIGluc3RhbmNlb2YgY3VydmVzLlByZXNldEN1cnZlKVxuICAgIG9wdGlvbnMgPSB7IGN1cnZlOiBvcHRpb25zIH07XG5cbiAgdGhpcy5jdXJ2ZSA9IG9wdGlvbnMuY3VydmUuY3VydmU7XG4gIHRoaXMubiA9IHRoaXMuY3VydmUubjtcbiAgdGhpcy5uaCA9IHRoaXMubi51c2hybigxKTtcbiAgdGhpcy5nID0gdGhpcy5jdXJ2ZS5nO1xuXG4gIC8vIFBvaW50IG9uIGN1cnZlXG4gIHRoaXMuZyA9IG9wdGlvbnMuY3VydmUuZztcbiAgdGhpcy5nLnByZWNvbXB1dGUob3B0aW9ucy5jdXJ2ZS5uLmJpdExlbmd0aCgpICsgMSk7XG5cbiAgLy8gSGFzaCBmb3IgZnVuY3Rpb24gZm9yIERSQkdcbiAgdGhpcy5oYXNoID0gb3B0aW9ucy5oYXNoIHx8IG9wdGlvbnMuY3VydmUuaGFzaDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRUM7XG5cbkVDLnByb3RvdHlwZS5rZXlQYWlyID0gZnVuY3Rpb24ga2V5UGFpcihvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgS2V5UGFpcih0aGlzLCBvcHRpb25zKTtcbn07XG5cbkVDLnByb3RvdHlwZS5rZXlGcm9tUHJpdmF0ZSA9IGZ1bmN0aW9uIGtleUZyb21Qcml2YXRlKHByaXYsIGVuYykge1xuICByZXR1cm4gS2V5UGFpci5mcm9tUHJpdmF0ZSh0aGlzLCBwcml2LCBlbmMpO1xufTtcblxuRUMucHJvdG90eXBlLmtleUZyb21QdWJsaWMgPSBmdW5jdGlvbiBrZXlGcm9tUHVibGljKHB1YiwgZW5jKSB7XG4gIHJldHVybiBLZXlQYWlyLmZyb21QdWJsaWModGhpcywgcHViLCBlbmMpO1xufTtcblxuRUMucHJvdG90eXBlLmdlbktleVBhaXIgPSBmdW5jdGlvbiBnZW5LZXlQYWlyKG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKVxuICAgIG9wdGlvbnMgPSB7fTtcblxuICAvLyBJbnN0YW50aWF0ZSBIbWFjX0RSQkdcbiAgdmFyIGRyYmcgPSBuZXcgSG1hY0RSQkcoe1xuICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICBwZXJzOiBvcHRpb25zLnBlcnMsXG4gICAgcGVyc0VuYzogb3B0aW9ucy5wZXJzRW5jIHx8ICd1dGY4JyxcbiAgICBlbnRyb3B5OiBvcHRpb25zLmVudHJvcHkgfHwgcmFuZCh0aGlzLmhhc2guaG1hY1N0cmVuZ3RoKSxcbiAgICBlbnRyb3B5RW5jOiBvcHRpb25zLmVudHJvcHkgJiYgb3B0aW9ucy5lbnRyb3B5RW5jIHx8ICd1dGY4JyxcbiAgICBub25jZTogdGhpcy5uLnRvQXJyYXkoKVxuICB9KTtcblxuICB2YXIgYnl0ZXMgPSB0aGlzLm4uYnl0ZUxlbmd0aCgpO1xuICB2YXIgbnMyID0gdGhpcy5uLnN1YihuZXcgQk4oMikpO1xuICBkbyB7XG4gICAgdmFyIHByaXYgPSBuZXcgQk4oZHJiZy5nZW5lcmF0ZShieXRlcykpO1xuICAgIGlmIChwcml2LmNtcChuczIpID4gMClcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgcHJpdi5pYWRkbigxKTtcbiAgICByZXR1cm4gdGhpcy5rZXlGcm9tUHJpdmF0ZShwcml2KTtcbiAgfSB3aGlsZSAodHJ1ZSk7XG59O1xuXG5FQy5wcm90b3R5cGUuX3RydW5jYXRlVG9OID0gZnVuY3Rpb24gdHJ1bmNhdGVUb04obXNnLCB0cnVuY09ubHkpIHtcbiAgdmFyIGRlbHRhID0gbXNnLmJ5dGVMZW5ndGgoKSAqIDggLSB0aGlzLm4uYml0TGVuZ3RoKCk7XG4gIGlmIChkZWx0YSA+IDApXG4gICAgbXNnID0gbXNnLnVzaHJuKGRlbHRhKTtcbiAgaWYgKCF0cnVuY09ubHkgJiYgbXNnLmNtcCh0aGlzLm4pID49IDApXG4gICAgcmV0dXJuIG1zZy5zdWIodGhpcy5uKTtcbiAgZWxzZVxuICAgIHJldHVybiBtc2c7XG59O1xuXG5FQy5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24obXNnLCBrZXksIGVuYywgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIGVuYyA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0gZW5jO1xuICAgIGVuYyA9IG51bGw7XG4gIH1cbiAgaWYgKCFvcHRpb25zKVxuICAgIG9wdGlvbnMgPSB7fTtcblxuICBrZXkgPSB0aGlzLmtleUZyb21Qcml2YXRlKGtleSwgZW5jKTtcbiAgbXNnID0gdGhpcy5fdHJ1bmNhdGVUb04obmV3IEJOKG1zZywgMTYpKTtcblxuICAvLyBaZXJvLWV4dGVuZCBrZXkgdG8gcHJvdmlkZSBlbm91Z2ggZW50cm9weVxuICB2YXIgYnl0ZXMgPSB0aGlzLm4uYnl0ZUxlbmd0aCgpO1xuICB2YXIgYmtleSA9IGtleS5nZXRQcml2YXRlKCkudG9BcnJheSgnYmUnLCBieXRlcyk7XG5cbiAgLy8gWmVyby1leHRlbmQgbm9uY2UgdG8gaGF2ZSB0aGUgc2FtZSBieXRlIHNpemUgYXMgTlxuICB2YXIgbm9uY2UgPSBtc2cudG9BcnJheSgnYmUnLCBieXRlcyk7XG5cbiAgLy8gSW5zdGFudGlhdGUgSG1hY19EUkJHXG4gIHZhciBkcmJnID0gbmV3IEhtYWNEUkJHKHtcbiAgICBoYXNoOiB0aGlzLmhhc2gsXG4gICAgZW50cm9weTogYmtleSxcbiAgICBub25jZTogbm9uY2UsXG4gICAgcGVyczogb3B0aW9ucy5wZXJzLFxuICAgIHBlcnNFbmM6IG9wdGlvbnMucGVyc0VuYyB8fCAndXRmOCdcbiAgfSk7XG5cbiAgLy8gTnVtYmVyIG9mIGJ5dGVzIHRvIGdlbmVyYXRlXG4gIHZhciBuczEgPSB0aGlzLm4uc3ViKG5ldyBCTigxKSk7XG5cbiAgZm9yICh2YXIgaXRlciA9IDA7IHRydWU7IGl0ZXIrKykge1xuICAgIHZhciBrID0gb3B0aW9ucy5rID9cbiAgICAgICAgb3B0aW9ucy5rKGl0ZXIpIDpcbiAgICAgICAgbmV3IEJOKGRyYmcuZ2VuZXJhdGUodGhpcy5uLmJ5dGVMZW5ndGgoKSkpO1xuICAgIGsgPSB0aGlzLl90cnVuY2F0ZVRvTihrLCB0cnVlKTtcbiAgICBpZiAoay5jbXBuKDEpIDw9IDAgfHwgay5jbXAobnMxKSA+PSAwKVxuICAgICAgY29udGludWU7XG5cbiAgICB2YXIga3AgPSB0aGlzLmcubXVsKGspO1xuICAgIGlmIChrcC5pc0luZmluaXR5KCkpXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciBrcFggPSBrcC5nZXRYKCk7XG4gICAgdmFyIHIgPSBrcFgudW1vZCh0aGlzLm4pO1xuICAgIGlmIChyLmNtcG4oMCkgPT09IDApXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciBzID0gay5pbnZtKHRoaXMubikubXVsKHIubXVsKGtleS5nZXRQcml2YXRlKCkpLmlhZGQobXNnKSk7XG4gICAgcyA9IHMudW1vZCh0aGlzLm4pO1xuICAgIGlmIChzLmNtcG4oMCkgPT09IDApXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciByZWNvdmVyeVBhcmFtID0gKGtwLmdldFkoKS5pc09kZCgpID8gMSA6IDApIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChrcFguY21wKHIpICE9PSAwID8gMiA6IDApO1xuXG4gICAgLy8gVXNlIGNvbXBsZW1lbnQgb2YgYHNgLCBpZiBpdCBpcyA+IGBuIC8gMmBcbiAgICBpZiAob3B0aW9ucy5jYW5vbmljYWwgJiYgcy5jbXAodGhpcy5uaCkgPiAwKSB7XG4gICAgICBzID0gdGhpcy5uLnN1YihzKTtcbiAgICAgIHJlY292ZXJ5UGFyYW0gXj0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFNpZ25hdHVyZSh7IHI6IHIsIHM6IHMsIHJlY292ZXJ5UGFyYW06IHJlY292ZXJ5UGFyYW0gfSk7XG4gIH1cbn07XG5cbkVDLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobXNnLCBzaWduYXR1cmUsIGtleSwgZW5jKSB7XG4gIG1zZyA9IHRoaXMuX3RydW5jYXRlVG9OKG5ldyBCTihtc2csIDE2KSk7XG4gIGtleSA9IHRoaXMua2V5RnJvbVB1YmxpYyhrZXksIGVuYyk7XG4gIHNpZ25hdHVyZSA9IG5ldyBTaWduYXR1cmUoc2lnbmF0dXJlLCAnaGV4Jyk7XG5cbiAgLy8gUGVyZm9ybSBwcmltaXRpdmUgdmFsdWVzIHZhbGlkYXRpb25cbiAgdmFyIHIgPSBzaWduYXR1cmUucjtcbiAgdmFyIHMgPSBzaWduYXR1cmUucztcbiAgaWYgKHIuY21wbigxKSA8IDAgfHwgci5jbXAodGhpcy5uKSA+PSAwKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKHMuY21wbigxKSA8IDAgfHwgcy5jbXAodGhpcy5uKSA+PSAwKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBWYWxpZGF0ZSBzaWduYXR1cmVcbiAgdmFyIHNpbnYgPSBzLmludm0odGhpcy5uKTtcbiAgdmFyIHUxID0gc2ludi5tdWwobXNnKS51bW9kKHRoaXMubik7XG4gIHZhciB1MiA9IHNpbnYubXVsKHIpLnVtb2QodGhpcy5uKTtcblxuICBpZiAoIXRoaXMuY3VydmUuX21heHdlbGxUcmljaykge1xuICAgIHZhciBwID0gdGhpcy5nLm11bEFkZCh1MSwga2V5LmdldFB1YmxpYygpLCB1Mik7XG4gICAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHAuZ2V0WCgpLnVtb2QodGhpcy5uKS5jbXAocikgPT09IDA7XG4gIH1cblxuICAvLyBOT1RFOiBHcmVnIE1heHdlbGwncyB0cmljaywgaW5zcGlyZWQgYnk6XG4gIC8vIGh0dHBzOi8vZ2l0LmlvL3ZhZDNLXG5cbiAgdmFyIHAgPSB0aGlzLmcuam11bEFkZCh1MSwga2V5LmdldFB1YmxpYygpLCB1Mik7XG4gIGlmIChwLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gQ29tcGFyZSBgcC54YCBvZiBKYWNvYmlhbiBwb2ludCB3aXRoIGByYCxcbiAgLy8gdGhpcyB3aWxsIGRvIGBwLnggPT0gciAqIHAuel4yYCBpbnN0ZWFkIG9mIG11bHRpcGx5aW5nIGBwLnhgIGJ5IHRoZVxuICAvLyBpbnZlcnNlIG9mIGBwLnpeMmBcbiAgcmV0dXJuIHAuZXFYVG9QKHIpO1xufTtcblxuRUMucHJvdG90eXBlLnJlY292ZXJQdWJLZXkgPSBmdW5jdGlvbihtc2csIHNpZ25hdHVyZSwgaiwgZW5jKSB7XG4gIGFzc2VydCgoMyAmIGopID09PSBqLCAnVGhlIHJlY292ZXJ5IHBhcmFtIGlzIG1vcmUgdGhhbiB0d28gYml0cycpO1xuICBzaWduYXR1cmUgPSBuZXcgU2lnbmF0dXJlKHNpZ25hdHVyZSwgZW5jKTtcblxuICB2YXIgbiA9IHRoaXMubjtcbiAgdmFyIGUgPSBuZXcgQk4obXNnKTtcbiAgdmFyIHIgPSBzaWduYXR1cmUucjtcbiAgdmFyIHMgPSBzaWduYXR1cmUucztcblxuICAvLyBBIHNldCBMU0Igc2lnbmlmaWVzIHRoYXQgdGhlIHktY29vcmRpbmF0ZSBpcyBvZGRcbiAgdmFyIGlzWU9kZCA9IGogJiAxO1xuICB2YXIgaXNTZWNvbmRLZXkgPSBqID4+IDE7XG4gIGlmIChyLmNtcCh0aGlzLmN1cnZlLnAudW1vZCh0aGlzLmN1cnZlLm4pKSA+PSAwICYmIGlzU2Vjb25kS2V5KVxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgc2VuY29uZCBrZXkgY2FuZGluYXRlJyk7XG5cbiAgLy8gMS4xLiBMZXQgeCA9IHIgKyBqbi5cbiAgaWYgKGlzU2Vjb25kS2V5KVxuICAgIHIgPSB0aGlzLmN1cnZlLnBvaW50RnJvbVgoci5hZGQodGhpcy5jdXJ2ZS5uKSwgaXNZT2RkKTtcbiAgZWxzZVxuICAgIHIgPSB0aGlzLmN1cnZlLnBvaW50RnJvbVgociwgaXNZT2RkKTtcblxuICB2YXIgckludiA9IHNpZ25hdHVyZS5yLmludm0obik7XG4gIHZhciBzMSA9IG4uc3ViKGUpLm11bChySW52KS51bW9kKG4pO1xuICB2YXIgczIgPSBzLm11bChySW52KS51bW9kKG4pO1xuXG4gIC8vIDEuNi4xIENvbXB1dGUgUSA9IHJeLTEgKHNSIC0gIGVHKVxuICAvLyAgICAgICAgICAgICAgIFEgPSByXi0xIChzUiArIC1lRylcbiAgcmV0dXJuIHRoaXMuZy5tdWxBZGQoczEsIHIsIHMyKTtcbn07XG5cbkVDLnByb3RvdHlwZS5nZXRLZXlSZWNvdmVyeVBhcmFtID0gZnVuY3Rpb24oZSwgc2lnbmF0dXJlLCBRLCBlbmMpIHtcbiAgc2lnbmF0dXJlID0gbmV3IFNpZ25hdHVyZShzaWduYXR1cmUsIGVuYyk7XG4gIGlmIChzaWduYXR1cmUucmVjb3ZlcnlQYXJhbSAhPT0gbnVsbClcbiAgICByZXR1cm4gc2lnbmF0dXJlLnJlY292ZXJ5UGFyYW07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2YXIgUXByaW1lO1xuICAgIHRyeSB7XG4gICAgICBRcHJpbWUgPSB0aGlzLnJlY292ZXJQdWJLZXkoZSwgc2lnbmF0dXJlLCBpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoUXByaW1lLmVxKFEpKVxuICAgICAgcmV0dXJuIGk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCB2YWxpZCByZWNvdmVyeSBmYWN0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcblxuZnVuY3Rpb24gS2V5UGFpcihlYywgb3B0aW9ucykge1xuICB0aGlzLmVjID0gZWM7XG4gIHRoaXMucHJpdiA9IG51bGw7XG4gIHRoaXMucHViID0gbnVsbDtcblxuICAvLyBLZXlQYWlyKGVjLCB7IHByaXY6IC4uLiwgcHViOiAuLi4gfSlcbiAgaWYgKG9wdGlvbnMucHJpdilcbiAgICB0aGlzLl9pbXBvcnRQcml2YXRlKG9wdGlvbnMucHJpdiwgb3B0aW9ucy5wcml2RW5jKTtcbiAgaWYgKG9wdGlvbnMucHViKVxuICAgIHRoaXMuX2ltcG9ydFB1YmxpYyhvcHRpb25zLnB1Yiwgb3B0aW9ucy5wdWJFbmMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBLZXlQYWlyO1xuXG5LZXlQYWlyLmZyb21QdWJsaWMgPSBmdW5jdGlvbiBmcm9tUHVibGljKGVjLCBwdWIsIGVuYykge1xuICBpZiAocHViIGluc3RhbmNlb2YgS2V5UGFpcilcbiAgICByZXR1cm4gcHViO1xuXG4gIHJldHVybiBuZXcgS2V5UGFpcihlYywge1xuICAgIHB1YjogcHViLFxuICAgIHB1YkVuYzogZW5jXG4gIH0pO1xufTtcblxuS2V5UGFpci5mcm9tUHJpdmF0ZSA9IGZ1bmN0aW9uIGZyb21Qcml2YXRlKGVjLCBwcml2LCBlbmMpIHtcbiAgaWYgKHByaXYgaW5zdGFuY2VvZiBLZXlQYWlyKVxuICAgIHJldHVybiBwcml2O1xuXG4gIHJldHVybiBuZXcgS2V5UGFpcihlYywge1xuICAgIHByaXY6IHByaXYsXG4gICAgcHJpdkVuYzogZW5jXG4gIH0pO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgdmFyIHB1YiA9IHRoaXMuZ2V0UHVibGljKCk7XG5cbiAgaWYgKHB1Yi5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHsgcmVzdWx0OiBmYWxzZSwgcmVhc29uOiAnSW52YWxpZCBwdWJsaWMga2V5JyB9O1xuICBpZiAoIXB1Yi52YWxpZGF0ZSgpKVxuICAgIHJldHVybiB7IHJlc3VsdDogZmFsc2UsIHJlYXNvbjogJ1B1YmxpYyBrZXkgaXMgbm90IGEgcG9pbnQnIH07XG4gIGlmICghcHViLm11bCh0aGlzLmVjLmN1cnZlLm4pLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4geyByZXN1bHQ6IGZhbHNlLCByZWFzb246ICdQdWJsaWMga2V5ICogTiAhPSBPJyB9O1xuXG4gIHJldHVybiB7IHJlc3VsdDogdHJ1ZSwgcmVhc29uOiBudWxsIH07XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5nZXRQdWJsaWMgPSBmdW5jdGlvbiBnZXRQdWJsaWMoY29tcGFjdCwgZW5jKSB7XG4gIC8vIGNvbXBhY3QgaXMgb3B0aW9uYWwgYXJndW1lbnRcbiAgaWYgKHR5cGVvZiBjb21wYWN0ID09PSAnc3RyaW5nJykge1xuICAgIGVuYyA9IGNvbXBhY3Q7XG4gICAgY29tcGFjdCA9IG51bGw7XG4gIH1cblxuICBpZiAoIXRoaXMucHViKVxuICAgIHRoaXMucHViID0gdGhpcy5lYy5nLm11bCh0aGlzLnByaXYpO1xuXG4gIGlmICghZW5jKVxuICAgIHJldHVybiB0aGlzLnB1YjtcblxuICByZXR1cm4gdGhpcy5wdWIuZW5jb2RlKGVuYywgY29tcGFjdCk7XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5nZXRQcml2YXRlID0gZnVuY3Rpb24gZ2V0UHJpdmF0ZShlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHRoaXMucHJpdi50b1N0cmluZygxNiwgMik7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5wcml2O1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUuX2ltcG9ydFByaXZhdGUgPSBmdW5jdGlvbiBfaW1wb3J0UHJpdmF0ZShrZXksIGVuYykge1xuICB0aGlzLnByaXYgPSBuZXcgQk4oa2V5LCBlbmMgfHwgMTYpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBwcml2IHdvbid0IGJlIGJpZ2dlciB0aGFuIG4sIG90aGVyd2lzZSB3ZSBtYXkgZmFpbFxuICAvLyBpbiBmaXhlZCBtdWx0aXBsaWNhdGlvbiBtZXRob2RcbiAgdGhpcy5wcml2ID0gdGhpcy5wcml2LnVtb2QodGhpcy5lYy5jdXJ2ZS5uKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLl9pbXBvcnRQdWJsaWMgPSBmdW5jdGlvbiBfaW1wb3J0UHVibGljKGtleSwgZW5jKSB7XG4gIGlmIChrZXkueCB8fCBrZXkueSkge1xuICAgIC8vIE1vbnRnb21lcnkgcG9pbnRzIG9ubHkgaGF2ZSBhbiBgeGAgY29vcmRpbmF0ZS5cbiAgICAvLyBXZWllcnN0cmFzcy9FZHdhcmRzIHBvaW50cyBvbiB0aGUgb3RoZXIgaGFuZCBoYXZlIGJvdGggYHhgIGFuZFxuICAgIC8vIGB5YCBjb29yZGluYXRlcy5cbiAgICBpZiAodGhpcy5lYy5jdXJ2ZS50eXBlID09PSAnbW9udCcpIHtcbiAgICAgIGFzc2VydChrZXkueCwgJ05lZWQgeCBjb29yZGluYXRlJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVjLmN1cnZlLnR5cGUgPT09ICdzaG9ydCcgfHxcbiAgICAgICAgICAgICAgIHRoaXMuZWMuY3VydmUudHlwZSA9PT0gJ2Vkd2FyZHMnKSB7XG4gICAgICBhc3NlcnQoa2V5LnggJiYga2V5LnksICdOZWVkIGJvdGggeCBhbmQgeSBjb29yZGluYXRlJyk7XG4gICAgfVxuICAgIHRoaXMucHViID0gdGhpcy5lYy5jdXJ2ZS5wb2ludChrZXkueCwga2V5LnkpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnB1YiA9IHRoaXMuZWMuY3VydmUuZGVjb2RlUG9pbnQoa2V5LCBlbmMpO1xufTtcblxuLy8gRUNESFxuS2V5UGFpci5wcm90b3R5cGUuZGVyaXZlID0gZnVuY3Rpb24gZGVyaXZlKHB1Yikge1xuICByZXR1cm4gcHViLm11bCh0aGlzLnByaXYpLmdldFgoKTtcbn07XG5cbi8vIEVDRFNBXG5LZXlQYWlyLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gc2lnbihtc2csIGVuYywgb3B0aW9ucykge1xuICByZXR1cm4gdGhpcy5lYy5zaWduKG1zZywgdGhpcywgZW5jLCBvcHRpb25zKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtc2csIHNpZ25hdHVyZSkge1xuICByZXR1cm4gdGhpcy5lYy52ZXJpZnkobXNnLCBzaWduYXR1cmUsIHRoaXMpO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gIHJldHVybiAnPEtleSBwcml2OiAnICsgKHRoaXMucHJpdiAmJiB0aGlzLnByaXYudG9TdHJpbmcoMTYsIDIpKSArXG4gICAgICAgICAnIHB1YjogJyArICh0aGlzLnB1YiAmJiB0aGlzLnB1Yi5pbnNwZWN0KCkpICsgJyA+Jztcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9