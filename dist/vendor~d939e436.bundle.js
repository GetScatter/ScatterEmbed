(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "+SFK":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("AUvm");
__webpack_require__("wgeU");
__webpack_require__("adOz");
__webpack_require__("dl0q");
module.exports = __webpack_require__("WEpk").Symbol;


/***/ }),

/***/ "1CSz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__("P7XM")
var Buffer = __webpack_require__("hwdV").Buffer

var Base = __webpack_require__("ZDAU")

var ZEROS = Buffer.alloc(128)
var blocksize = 64

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  this._alg = alg
  this._key = key

  if (key.length > blocksize) {
    key = alg(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = [ipad]
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.push(data)
}

Hmac.prototype._final = function () {
  var h = this._alg(Buffer.concat(this._hash))
  return this._alg(Buffer.concat([this._opad, h]))
}
module.exports = Hmac


/***/ }),

/***/ "29s/":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("WEpk");
var global = __webpack_require__("5T2Y");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("uOPS") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "2GTP":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("eaoh");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "2Nb0":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("FlQf");
__webpack_require__("bBy9");
module.exports = __webpack_require__("zLkG").f('iterator');


/***/ }),

/***/ "2faE":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("5K7Z");
var IE8_DOM_DEFINE = __webpack_require__("eUtF");
var toPrimitive = __webpack_require__("G8Mo");
var dP = Object.defineProperty;

exports.f = __webpack_require__("jmDH") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "4dMO":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var elliptic = __webpack_require__("MzeL")
var BN = __webpack_require__("OZ/i")

module.exports = function createECDH (curve) {
  return new ECDH(curve)
}

var aliases = {
  secp256k1: {
    name: 'secp256k1',
    byteLength: 32
  },
  secp224r1: {
    name: 'p224',
    byteLength: 28
  },
  prime256v1: {
    name: 'p256',
    byteLength: 32
  },
  prime192v1: {
    name: 'p192',
    byteLength: 24
  },
  ed25519: {
    name: 'ed25519',
    byteLength: 32
  },
  secp384r1: {
    name: 'p384',
    byteLength: 48
  },
  secp521r1: {
    name: 'p521',
    byteLength: 66
  }
}

aliases.p224 = aliases.secp224r1
aliases.p256 = aliases.secp256r1 = aliases.prime256v1
aliases.p192 = aliases.secp192r1 = aliases.prime192v1
aliases.p384 = aliases.secp384r1
aliases.p521 = aliases.secp521r1

function ECDH (curve) {
  this.curveType = aliases[curve]
  if (!this.curveType) {
    this.curveType = {
      name: curve
    }
  }
  this.curve = new elliptic.ec(this.curveType.name) // eslint-disable-line new-cap
  this.keys = void 0
}

ECDH.prototype.generateKeys = function (enc, format) {
  this.keys = this.curve.genKeyPair()
  return this.getPublicKey(enc, format)
}

ECDH.prototype.computeSecret = function (other, inenc, enc) {
  inenc = inenc || 'utf8'
  if (!Buffer.isBuffer(other)) {
    other = new Buffer(other, inenc)
  }
  var otherPub = this.curve.keyFromPublic(other).getPublic()
  var out = otherPub.mul(this.keys.getPrivate()).getX()
  return formatReturnValue(out, enc, this.curveType.byteLength)
}

ECDH.prototype.getPublicKey = function (enc, format) {
  var key = this.keys.getPublic(format === 'compressed', true)
  if (format === 'hybrid') {
    if (key[key.length - 1] % 2) {
      key[0] = 7
    } else {
      key[0] = 6
    }
  }
  return formatReturnValue(key, enc)
}

ECDH.prototype.getPrivateKey = function (enc) {
  return formatReturnValue(this.keys.getPrivate(), enc)
}

ECDH.prototype.setPublicKey = function (pub, enc) {
  enc = enc || 'utf8'
  if (!Buffer.isBuffer(pub)) {
    pub = new Buffer(pub, enc)
  }
  this.keys._importPublic(pub)
  return this
}

ECDH.prototype.setPrivateKey = function (priv, enc) {
  enc = enc || 'utf8'
  if (!Buffer.isBuffer(priv)) {
    priv = new Buffer(priv, enc)
  }

  var _priv = new BN(priv)
  _priv = _priv.toString(16)
  this.keys = this.curve.genKeyPair()
  this.keys._importPrivate(_priv)
  return this
}

function formatReturnValue (bn, enc, len) {
  if (!Array.isArray(bn)) {
    bn = bn.toArray()
  }
  var buf = new Buffer(bn)
  if (len && buf.length < len) {
    var zeros = new Buffer(len - buf.length)
    zeros.fill(0)
    buf = Buffer.concat([zeros, buf])
  }
  if (!enc) {
    return buf
  } else {
    return buf.toString(enc)
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "5K7Z":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("93I4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "5T2Y":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "5vMV":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("B+OT");
var toIObject = __webpack_require__("NsO/");
var arrayIndexOf = __webpack_require__("W070")(false);
var IE_PROTO = __webpack_require__("VVlx")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "6/1s":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("YqAc")('meta');
var isObject = __webpack_require__("93I4");
var has = __webpack_require__("B+OT");
var setDesc = __webpack_require__("2faE").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("KUxP")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6zPY":
/***/ (function(module) {

module.exports = JSON.parse("{\"secp128r1\":{\"p\":\"fffffffdffffffffffffffffffffffff\",\"a\":\"fffffffdfffffffffffffffffffffffc\",\"b\":\"e87579c11079f43dd824993c2cee5ed3\",\"n\":\"fffffffe0000000075a30d1b9038a115\",\"h\":\"01\",\"Gx\":\"161ff7528b899b2d0c28607ca52c5b86\",\"Gy\":\"cf5ac8395bafeb13c02da292dded7a83\"},\"secp160k1\":{\"p\":\"fffffffffffffffffffffffffffffffeffffac73\",\"a\":\"00\",\"b\":\"07\",\"n\":\"0100000000000000000001b8fa16dfab9aca16b6b3\",\"h\":\"01\",\"Gx\":\"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb\",\"Gy\":\"938cf935318fdced6bc28286531733c3f03c4fee\"},\"secp160r1\":{\"p\":\"ffffffffffffffffffffffffffffffff7fffffff\",\"a\":\"ffffffffffffffffffffffffffffffff7ffffffc\",\"b\":\"1c97befc54bd7a8b65acf89f81d4d4adc565fa45\",\"n\":\"0100000000000000000001f4c8f927aed3ca752257\",\"h\":\"01\",\"Gx\":\"4a96b5688ef573284664698968c38bb913cbfc82\",\"Gy\":\"23a628553168947d59dcc912042351377ac5fb32\"},\"secp192k1\":{\"p\":\"fffffffffffffffffffffffffffffffffffffffeffffee37\",\"a\":\"00\",\"b\":\"03\",\"n\":\"fffffffffffffffffffffffe26f2fc170f69466a74defd8d\",\"h\":\"01\",\"Gx\":\"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d\",\"Gy\":\"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d\"},\"secp192r1\":{\"p\":\"fffffffffffffffffffffffffffffffeffffffffffffffff\",\"a\":\"fffffffffffffffffffffffffffffffefffffffffffffffc\",\"b\":\"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1\",\"n\":\"ffffffffffffffffffffffff99def836146bc9b1b4d22831\",\"h\":\"01\",\"Gx\":\"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012\",\"Gy\":\"07192b95ffc8da78631011ed6b24cdd573f977a11e794811\"},\"secp256k1\":{\"p\":\"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f\",\"a\":\"00\",\"b\":\"07\",\"n\":\"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141\",\"h\":\"01\",\"Gx\":\"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798\",\"Gy\":\"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8\"},\"secp256r1\":{\"p\":\"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff\",\"a\":\"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc\",\"b\":\"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b\",\"n\":\"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551\",\"h\":\"01\",\"Gx\":\"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296\",\"Gy\":\"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5\"}}");

/***/ }),

/***/ "82c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__("1seS");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "8jRI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "93I4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "A5Xg":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("NsO/");
var gOPN = __webpack_require__("ar/p").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "ANxK":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var generatePrime = __webpack_require__("WKKt")
var primes = __webpack_require__("wk3p")

var DH = __webpack_require__("Vh22")

function getDiffieHellman (mod) {
  var prime = new Buffer(primes[mod].prime, 'hex')
  var gen = new Buffer(primes[mod].gen, 'hex')

  return new DH(prime, gen)
}

var ENCODINGS = {
  'binary': true, 'hex': true, 'base64': true
}

function createDiffieHellman (prime, enc, generator, genc) {
  if (Buffer.isBuffer(enc) || ENCODINGS[enc] === undefined) {
    return createDiffieHellman(prime, 'binary', enc, generator)
  }

  enc = enc || 'binary'
  genc = genc || 'binary'
  generator = generator || new Buffer([2])

  if (!Buffer.isBuffer(generator)) {
    generator = new Buffer(generator, genc)
  }

  if (typeof prime === 'number') {
    return new DH(generatePrime(prime, generator), generator, true)
  }

  if (!Buffer.isBuffer(prime)) {
    prime = new Buffer(prime, enc)
  }

  return new DH(prime, generator, true)
}

exports.DiffieHellmanGroup = exports.createDiffieHellmanGroup = exports.getDiffieHellman = getDiffieHellman
exports.createDiffieHellman = exports.DiffieHellman = createDiffieHellman

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "AUvm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("5T2Y");
var has = __webpack_require__("B+OT");
var DESCRIPTORS = __webpack_require__("jmDH");
var $export = __webpack_require__("Y7ZC");
var redefine = __webpack_require__("kTiW");
var META = __webpack_require__("6/1s").KEY;
var $fails = __webpack_require__("KUxP");
var shared = __webpack_require__("29s/");
var setToStringTag = __webpack_require__("RfKB");
var uid = __webpack_require__("YqAc");
var wks = __webpack_require__("UWiX");
var wksExt = __webpack_require__("zLkG");
var wksDefine = __webpack_require__("Zxgi");
var enumKeys = __webpack_require__("R+7+");
var isArray = __webpack_require__("kAMH");
var anObject = __webpack_require__("5K7Z");
var isObject = __webpack_require__("93I4");
var toObject = __webpack_require__("JB68");
var toIObject = __webpack_require__("NsO/");
var toPrimitive = __webpack_require__("G8Mo");
var createDesc = __webpack_require__("rr1i");
var _create = __webpack_require__("oVml");
var gOPNExt = __webpack_require__("A5Xg");
var $GOPD = __webpack_require__("vwuL");
var $GOPS = __webpack_require__("mqlF");
var $DP = __webpack_require__("2faE");
var $keys = __webpack_require__("w6GO");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("ar/p").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("NV0k").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("uOPS")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("NegM")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "AYSA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("2j6C");

function Cipher(options) {
  this.options = options;

  this.type = this.options.type;
  this.blockSize = 8;
  this._init();

  this.buffer = new Array(this.blockSize);
  this.bufferOff = 0;
}
module.exports = Cipher;

Cipher.prototype._init = function _init() {
  // Might be overrided
};

Cipher.prototype.update = function update(data) {
  if (data.length === 0)
    return [];

  if (this.type === 'decrypt')
    return this._updateDecrypt(data);
  else
    return this._updateEncrypt(data);
};

Cipher.prototype._buffer = function _buffer(data, off) {
  // Append data to buffer
  var min = Math.min(this.buffer.length - this.bufferOff, data.length - off);
  for (var i = 0; i < min; i++)
    this.buffer[this.bufferOff + i] = data[off + i];
  this.bufferOff += min;

  // Shift next
  return min;
};

Cipher.prototype._flushBuffer = function _flushBuffer(out, off) {
  this._update(this.buffer, 0, out, off);
  this.bufferOff = 0;
  return this.blockSize;
};

Cipher.prototype._updateEncrypt = function _updateEncrypt(data) {
  var inputOff = 0;
  var outputOff = 0;

  var count = ((this.bufferOff + data.length) / this.blockSize) | 0;
  var out = new Array(count * this.blockSize);

  if (this.bufferOff !== 0) {
    inputOff += this._buffer(data, inputOff);

    if (this.bufferOff === this.buffer.length)
      outputOff += this._flushBuffer(out, outputOff);
  }

  // Write blocks
  var max = data.length - ((data.length - inputOff) % this.blockSize);
  for (; inputOff < max; inputOff += this.blockSize) {
    this._update(data, inputOff, out, outputOff);
    outputOff += this.blockSize;
  }

  // Queue rest
  for (; inputOff < data.length; inputOff++, this.bufferOff++)
    this.buffer[this.bufferOff] = data[inputOff];

  return out;
};

Cipher.prototype._updateDecrypt = function _updateDecrypt(data) {
  var inputOff = 0;
  var outputOff = 0;

  var count = Math.ceil((this.bufferOff + data.length) / this.blockSize) - 1;
  var out = new Array(count * this.blockSize);

  // TODO(indutny): optimize it, this is far from optimal
  for (; count > 0; count--) {
    inputOff += this._buffer(data, inputOff);
    outputOff += this._flushBuffer(out, outputOff);
  }

  // Buffer rest of the input
  inputOff += this._buffer(data, inputOff);

  return out;
};

Cipher.prototype.final = function final(buffer) {
  var first;
  if (buffer)
    first = this.update(buffer);

  var last;
  if (this.type === 'encrypt')
    last = this._finalEncrypt();
  else
    last = this._finalDecrypt();

  if (first)
    return first.concat(last);
  else
    return last;
};

Cipher.prototype._pad = function _pad(buffer, off) {
  if (off === 0)
    return false;

  while (off < buffer.length)
    buffer[off++] = 0;

  return true;
};

Cipher.prototype._finalEncrypt = function _finalEncrypt() {
  if (!this._pad(this.buffer, this.bufferOff))
    return [];

  var out = new Array(this.blockSize);
  this._update(this.buffer, 0, out, 0);
  return out;
};

Cipher.prototype._unpad = function _unpad(buffer) {
  return buffer;
};

Cipher.prototype._finalDecrypt = function _finalDecrypt() {
  assert.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
  var out = new Array(this.blockSize);
  this._flushBuffer(out, 0);

  return this._unpad(out);
};


/***/ }),

/***/ "B+OT":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "D8kY":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("Ojgd");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "DaRl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("2j6C");
var inherits = __webpack_require__("P7XM");

var proto = {};

function CBCState(iv) {
  assert.equal(iv.length, 8, 'Invalid IV length');

  this.iv = new Array(8);
  for (var i = 0; i < this.iv.length; i++)
    this.iv[i] = iv[i];
}

function instantiate(Base) {
  function CBC(options) {
    Base.call(this, options);
    this._cbcInit();
  }
  inherits(CBC, Base);

  var keys = Object.keys(proto);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    CBC.prototype[key] = proto[key];
  }

  CBC.create = function create(options) {
    return new CBC(options);
  };

  return CBC;
}

exports.instantiate = instantiate;

proto._cbcInit = function _cbcInit() {
  var state = new CBCState(this.options.iv);
  this._cbcState = state;
};

proto._update = function _update(inp, inOff, out, outOff) {
  var state = this._cbcState;
  var superProto = this.constructor.super_.prototype;

  var iv = state.iv;
  if (this.type === 'encrypt') {
    for (var i = 0; i < this.blockSize; i++)
      iv[i] ^= inp[inOff + i];

    superProto._update.call(this, iv, 0, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = out[outOff + i];
  } else {
    superProto._update.call(this, inp, inOff, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      out[outOff + i] ^= iv[i];

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = inp[inOff + i];
  }
};


/***/ }),

/***/ "ELBg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


/***/ }),

/***/ "FUXG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.utils = __webpack_require__("Xudb");
exports.Cipher = __webpack_require__("AYSA");
exports.DES = __webpack_require__("Titl");
exports.CBC = __webpack_require__("DaRl");
exports.EDE = __webpack_require__("H+yo");


/***/ }),

/***/ "FlQf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("ccE7")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("MPFp")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "FpHa":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "G8Mo":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("93I4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "Giow":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__("P7XM")
var Legacy = __webpack_require__("1CSz")
var Base = __webpack_require__("ZDAU")
var Buffer = __webpack_require__("hwdV").Buffer
var md5 = __webpack_require__("WnY+")
var RIPEMD160 = __webpack_require__("tcrS")

var sha = __webpack_require__("afKu")

var ZEROS = Buffer.alloc(128)

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  this._alg = alg
  this._key = key
  if (key.length > blocksize) {
    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
    key = hash.update(key).digest()
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }
  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
  this._hash.update(ipad)
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.update(data)
}

Hmac.prototype._final = function () {
  var h = this._hash.digest()
  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)
  return hash.update(this._opad).update(h).digest()
}

module.exports = function createHmac (alg, key) {
  alg = alg.toLowerCase()
  if (alg === 'rmd160' || alg === 'ripemd160') {
    return new Hmac('rmd160', key)
  }
  if (alg === 'md5') {
    return new Legacy(md5, key)
  }
  return new Hmac(alg, key)
}


/***/ }),

/***/ "H+yo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("2j6C");
var inherits = __webpack_require__("P7XM");

var des = __webpack_require__("FUXG");
var Cipher = des.Cipher;
var DES = des.DES;

function EDEState(type, key) {
  assert.equal(key.length, 24, 'Invalid key length');

  var k1 = key.slice(0, 8);
  var k2 = key.slice(8, 16);
  var k3 = key.slice(16, 24);

  if (type === 'encrypt') {
    this.ciphers = [
      DES.create({ type: 'encrypt', key: k1 }),
      DES.create({ type: 'decrypt', key: k2 }),
      DES.create({ type: 'encrypt', key: k3 })
    ];
  } else {
    this.ciphers = [
      DES.create({ type: 'decrypt', key: k3 }),
      DES.create({ type: 'encrypt', key: k2 }),
      DES.create({ type: 'decrypt', key: k1 })
    ];
  }
}

function EDE(options) {
  Cipher.call(this, options);

  var state = new EDEState(this.type, this.options.key);
  this._edeState = state;
}
inherits(EDE, Cipher);

module.exports = EDE;

EDE.create = function create(options) {
  return new EDE(options);
};

EDE.prototype._update = function _update(inp, inOff, out, outOff) {
  var state = this._edeState;

  state.ciphers[0]._update(inp, inOff, out, outOff);
  state.ciphers[1]._update(out, outOff, out, outOff);
  state.ciphers[2]._update(out, outOff, out, outOff);
};

EDE.prototype._pad = DES.prototype._pad;
EDE.prototype._unpad = DES.prototype._unpad;


/***/ }),

/***/ "HEbw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = __webpack_require__("Edxu")
exports.createHash = exports.Hash = __webpack_require__("mObS")
exports.createHmac = exports.Hmac = __webpack_require__("Giow")

var algos = __webpack_require__("EW2V")
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = __webpack_require__("oJl4")
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = __webpack_require__("lWpZ")

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = __webpack_require__("ANxK")

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = __webpack_require__("tpL1")

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = __webpack_require__("4dMO")

var publicEncrypt = __webpack_require__("ZEK9")

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

var rf = __webpack_require__("dcwN")

exports.randomFill = rf.randomFill
exports.randomFillSync = rf.randomFillSync

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}


/***/ }),

/***/ "Hsns":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("93I4");
var document = __webpack_require__("5T2Y").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "JB68":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("Jes0");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "JBAE":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ( true && module.exports) {
  module.exports = clone;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "JPst":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "Jes0":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "KUxP":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "M1xp":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("a0xu");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "MPFp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("uOPS");
var $export = __webpack_require__("Y7ZC");
var redefine = __webpack_require__("kTiW");
var hide = __webpack_require__("NegM");
var Iterators = __webpack_require__("SBuE");
var $iterCreate = __webpack_require__("j2DC");
var setToStringTag = __webpack_require__("RfKB");
var getPrototypeOf = __webpack_require__("U+KD");
var ITERATOR = __webpack_require__("UWiX")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "Mqbl":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("JB68");
var $keys = __webpack_require__("w6GO");

__webpack_require__("zn7N")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "MvwC":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("5T2Y").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "NIfo":
/***/ (function(module, exports, __webpack_require__) {

var BigInteger = __webpack_require__("7Vg5")

var curves = __webpack_require__("6zPY")
var Curve = __webpack_require__("VDaT")

function getCurveByName (name) {
  var curve = curves[name]
  if (!curve) return null

  var p = new BigInteger(curve.p, 16)
  var a = new BigInteger(curve.a, 16)
  var b = new BigInteger(curve.b, 16)
  var n = new BigInteger(curve.n, 16)
  var h = new BigInteger(curve.h, 16)
  var Gx = new BigInteger(curve.Gx, 16)
  var Gy = new BigInteger(curve.Gy, 16)

  return new Curve(p, a, b, Gx, Gy, n, h)
}

module.exports = getCurveByName


/***/ }),

/***/ "NV0k":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "NegM":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("2faE");
var createDesc = __webpack_require__("rr1i");
module.exports = __webpack_require__("jmDH") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "NsO/":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("M1xp");
var defined = __webpack_require__("Jes0");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "Ojgd":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "Onz0":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "PJ1Y":
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__("9lTW")
var Buffer = __webpack_require__("hwdV").Buffer
var BigInteger = __webpack_require__("7Vg5")

var THREE = BigInteger.valueOf(3)

function Point (curve, x, y, z) {
  assert.notStrictEqual(z, undefined, 'Missing Z coordinate')

  this.curve = curve
  this.x = x
  this.y = y
  this.z = z
  this._zInv = null

  this.compressed = true
}

Object.defineProperty(Point.prototype, 'zInv', {
  get: function () {
    if (this._zInv === null) {
      this._zInv = this.z.modInverse(this.curve.p)
    }

    return this._zInv
  }
})

Object.defineProperty(Point.prototype, 'affineX', {
  get: function () {
    return this.x.multiply(this.zInv).mod(this.curve.p)
  }
})

Object.defineProperty(Point.prototype, 'affineY', {
  get: function () {
    return this.y.multiply(this.zInv).mod(this.curve.p)
  }
})

Point.fromAffine = function (curve, x, y) {
  return new Point(curve, x, y, BigInteger.ONE)
}

Point.prototype.equals = function (other) {
  if (other === this) return true
  if (this.curve.isInfinity(this)) return this.curve.isInfinity(other)
  if (this.curve.isInfinity(other)) return this.curve.isInfinity(this)

  // u = Y2 * Z1 - Y1 * Z2
  var u = other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p)

  if (u.signum() !== 0) return false

  // v = X2 * Z1 - X1 * Z2
  var v = other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p)

  return v.signum() === 0
}

Point.prototype.negate = function () {
  var y = this.curve.p.subtract(this.y)

  return new Point(this.curve, this.x, y, this.z)
}

Point.prototype.add = function (b) {
  if (this.curve.isInfinity(this)) return b
  if (this.curve.isInfinity(b)) return this

  var x1 = this.x
  var y1 = this.y
  var x2 = b.x
  var y2 = b.y

  // u = Y2 * Z1 - Y1 * Z2
  var u = y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p)
  // v = X2 * Z1 - X1 * Z2
  var v = x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p)

  if (v.signum() === 0) {
    if (u.signum() === 0) {
      return this.twice() // this == b, so double
    }

    return this.curve.infinity // this = -b, so infinity
  }

  var v2 = v.square()
  var v3 = v2.multiply(v)
  var x1v2 = x1.multiply(v2)
  var zu2 = u.square().multiply(this.z)

  // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
  var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p)
  // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
  var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p)
  // z3 = v^3 * z1 * z2
  var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.p)

  return new Point(this.curve, x3, y3, z3)
}

Point.prototype.twice = function () {
  if (this.curve.isInfinity(this)) return this
  if (this.y.signum() === 0) return this.curve.infinity

  var x1 = this.x
  var y1 = this.y

  var y1z1 = y1.multiply(this.z).mod(this.curve.p)
  var y1sqz1 = y1z1.multiply(y1).mod(this.curve.p)
  var a = this.curve.a

  // w = 3 * x1^2 + a * z1^2
  var w = x1.square().multiply(THREE)

  if (a.signum() !== 0) {
    w = w.add(this.z.square().multiply(a))
  }

  w = w.mod(this.curve.p)
  // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
  var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p)
  // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
  var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p)
  // z3 = 8 * (y1 * z1)^3
  var z3 = y1z1.pow(3).shiftLeft(3).mod(this.curve.p)

  return new Point(this.curve, x3, y3, z3)
}

// Simple NAF (Non-Adjacent Form) multiplication algorithm
// TODO: modularize the multiplication algorithm
Point.prototype.multiply = function (k) {
  if (this.curve.isInfinity(this)) return this
  if (k.signum() === 0) return this.curve.infinity

  var e = k
  var h = e.multiply(THREE)

  var neg = this.negate()
  var R = this

  for (var i = h.bitLength() - 2; i > 0; --i) {
    var hBit = h.testBit(i)
    var eBit = e.testBit(i)

    R = R.twice()

    if (hBit !== eBit) {
      R = R.add(hBit ? this : neg)
    }
  }

  return R
}

// Compute this*j + x*k (simultaneous multiplication)
Point.prototype.multiplyTwo = function (j, x, k) {
  var i = Math.max(j.bitLength(), k.bitLength()) - 1
  var R = this.curve.infinity
  var both = this.add(x)

  while (i >= 0) {
    var jBit = j.testBit(i)
    var kBit = k.testBit(i)

    R = R.twice()

    if (jBit) {
      if (kBit) {
        R = R.add(both)
      } else {
        R = R.add(this)
      }
    } else if (kBit) {
      R = R.add(x)
    }
    --i
  }

  return R
}

Point.prototype.getEncoded = function (compressed) {
  if (compressed == null) compressed = this.compressed
  if (this.curve.isInfinity(this)) return Buffer.alloc(1, 0) // Infinity point encoded is simply '00'

  var x = this.affineX
  var y = this.affineY
  var byteLength = this.curve.pLength
  var buffer

  // 0x02/0x03 | X
  if (compressed) {
    buffer = Buffer.allocUnsafe(1 + byteLength)
    buffer.writeUInt8(y.isEven() ? 0x02 : 0x03, 0)

  // 0x04 | X | Y
  } else {
    buffer = Buffer.allocUnsafe(1 + byteLength + byteLength)
    buffer.writeUInt8(0x04, 0)

    y.toBuffer(byteLength).copy(buffer, 1 + byteLength)
  }

  x.toBuffer(byteLength).copy(buffer, 1)

  return buffer
}

Point.decodeFrom = function (curve, buffer) {
  var type = buffer.readUInt8(0)
  var compressed = (type !== 4)

  var byteLength = Math.floor((curve.p.bitLength() + 7) / 8)
  var x = BigInteger.fromBuffer(buffer.slice(1, 1 + byteLength))

  var Q
  if (compressed) {
    assert.equal(buffer.length, byteLength + 1, 'Invalid sequence length')
    assert(type === 0x02 || type === 0x03, 'Invalid sequence tag')

    var isOdd = (type === 0x03)
    Q = curve.pointFromX(isOdd, x)
  } else {
    assert.equal(buffer.length, 1 + byteLength + byteLength, 'Invalid sequence length')

    var y = BigInteger.fromBuffer(buffer.slice(1 + byteLength))
    Q = Point.fromAffine(curve, x, y)
  }

  Q.compressed = compressed
  return Q
}

Point.prototype.toString = function () {
  if (this.curve.isInfinity(this)) return '(INFINITY)'

  return '(' + this.affineX.toString() + ',' + this.affineY.toString() + ')'
}

module.exports = Point


/***/ }),

/***/ "QMMT":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("a0xu");
var TAG = __webpack_require__("UWiX")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "R+7+":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("w6GO");
var gOPS = __webpack_require__("mqlF");
var pIE = __webpack_require__("NV0k");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "RfKB":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("2faE").f;
var has = __webpack_require__("B+OT");
var TAG = __webpack_require__("UWiX")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "Rp86":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("bBy9");
__webpack_require__("FlQf");
module.exports = __webpack_require__("fXsU");


/***/ }),

/***/ "SBuE":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "Titl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("2j6C");
var inherits = __webpack_require__("P7XM");

var des = __webpack_require__("FUXG");
var utils = des.utils;
var Cipher = des.Cipher;

function DESState() {
  this.tmp = new Array(2);
  this.keys = null;
}

function DES(options) {
  Cipher.call(this, options);

  var state = new DESState();
  this._desState = state;

  this.deriveKeys(state, options.key);
}
inherits(DES, Cipher);
module.exports = DES;

DES.create = function create(options) {
  return new DES(options);
};

var shiftTable = [
  1, 1, 2, 2, 2, 2, 2, 2,
  1, 2, 2, 2, 2, 2, 2, 1
];

DES.prototype.deriveKeys = function deriveKeys(state, key) {
  state.keys = new Array(16 * 2);

  assert.equal(key.length, this.blockSize, 'Invalid key length');

  var kL = utils.readUInt32BE(key, 0);
  var kR = utils.readUInt32BE(key, 4);

  utils.pc1(kL, kR, state.tmp, 0);
  kL = state.tmp[0];
  kR = state.tmp[1];
  for (var i = 0; i < state.keys.length; i += 2) {
    var shift = shiftTable[i >>> 1];
    kL = utils.r28shl(kL, shift);
    kR = utils.r28shl(kR, shift);
    utils.pc2(kL, kR, state.keys, i);
  }
};

DES.prototype._update = function _update(inp, inOff, out, outOff) {
  var state = this._desState;

  var l = utils.readUInt32BE(inp, inOff);
  var r = utils.readUInt32BE(inp, inOff + 4);

  // Initial Permutation
  utils.ip(l, r, state.tmp, 0);
  l = state.tmp[0];
  r = state.tmp[1];

  if (this.type === 'encrypt')
    this._encrypt(state, l, r, state.tmp, 0);
  else
    this._decrypt(state, l, r, state.tmp, 0);

  l = state.tmp[0];
  r = state.tmp[1];

  utils.writeUInt32BE(out, l, outOff);
  utils.writeUInt32BE(out, r, outOff + 4);
};

DES.prototype._pad = function _pad(buffer, off) {
  var value = buffer.length - off;
  for (var i = off; i < buffer.length; i++)
    buffer[i] = value;

  return true;
};

DES.prototype._unpad = function _unpad(buffer) {
  var pad = buffer[buffer.length - 1];
  for (var i = buffer.length - pad; i < buffer.length; i++)
    assert.equal(buffer[i], pad);

  return buffer.slice(0, buffer.length - pad);
};

DES.prototype._encrypt = function _encrypt(state, lStart, rStart, out, off) {
  var l = lStart;
  var r = rStart;

  // Apply f() x16 times
  for (var i = 0; i < state.keys.length; i += 2) {
    var keyL = state.keys[i];
    var keyR = state.keys[i + 1];

    // f(r, k)
    utils.expand(r, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s = utils.substitute(keyL, keyR);
    var f = utils.permute(s);

    var t = r;
    r = (l ^ f) >>> 0;
    l = t;
  }

  // Reverse Initial Permutation
  utils.rip(r, l, out, off);
};

DES.prototype._decrypt = function _decrypt(state, lStart, rStart, out, off) {
  var l = rStart;
  var r = lStart;

  // Apply f() x16 times
  for (var i = state.keys.length - 2; i >= 0; i -= 2) {
    var keyL = state.keys[i];
    var keyR = state.keys[i + 1];

    // f(r, k)
    utils.expand(l, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s = utils.substitute(keyL, keyR);
    var f = utils.permute(s);

    var t = l;
    l = (r ^ f) >>> 0;
    r = t;
  }

  // Reverse Initial Permutation
  utils.rip(l, r, out, off);
};


/***/ }),

/***/ "U+KD":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("B+OT");
var toObject = __webpack_require__("JB68");
var IE_PROTO = __webpack_require__("VVlx")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "UO39":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "UWiX":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("29s/")('wks');
var uid = __webpack_require__("YqAc");
var Symbol = __webpack_require__("5T2Y").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "VDaT":
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__("9lTW")
var BigInteger = __webpack_require__("7Vg5")

var Point = __webpack_require__("PJ1Y")

function Curve (p, a, b, Gx, Gy, n, h) {
  this.p = p
  this.a = a
  this.b = b
  this.G = Point.fromAffine(this, Gx, Gy)
  this.n = n
  this.h = h

  this.infinity = new Point(this, null, null, BigInteger.ZERO)

  // result caching
  this.pOverFour = p.add(BigInteger.ONE).shiftRight(2)

  // determine size of p in bytes
  this.pLength = Math.floor((this.p.bitLength() + 7) / 8)
}

Curve.prototype.pointFromX = function (isOdd, x) {
  var alpha = x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p)
  var beta = alpha.modPow(this.pOverFour, this.p) // XXX: not compatible with all curves

  var y = beta
  if (beta.isEven() ^ !isOdd) {
    y = this.p.subtract(y) // -y % p
  }

  return Point.fromAffine(this, x, y)
}

Curve.prototype.isInfinity = function (Q) {
  if (Q === this.infinity) return true

  return Q.z.signum() === 0 && Q.y.signum() !== 0
}

Curve.prototype.isOnCurve = function (Q) {
  if (this.isInfinity(Q)) return true

  var x = Q.affineX
  var y = Q.affineY
  var a = this.a
  var b = this.b
  var p = this.p

  // Check that xQ and yQ are integers in the interval [0, p - 1]
  if (x.signum() < 0 || x.compareTo(p) >= 0) return false
  if (y.signum() < 0 || y.compareTo(p) >= 0) return false

  // and check that y^2 = x^3 + ax + b (mod p)
  var lhs = y.square().mod(p)
  var rhs = x.pow(3).add(a.multiply(x)).add(b).mod(p)
  return lhs.equals(rhs)
}

/**
 * Validate an elliptic curve point.
 *
 * See SEC 1, section 3.2.2.1: Elliptic Curve Public Key Validation Primitive
 */
Curve.prototype.validate = function (Q) {
  // Check Q != O
  assert(!this.isInfinity(Q), 'Point is at infinity')
  assert(this.isOnCurve(Q), 'Point is not on the curve')

  // Check nQ = O (where Q is a scalar multiple of G)
  var nQ = Q.multiply(this.n)
  assert(this.isInfinity(nQ), 'Point is not a scalar multiple of G')

  return true
}

module.exports = Curve


/***/ }),

/***/ "VKFn":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("bBy9");
__webpack_require__("FlQf");
module.exports = __webpack_require__("ldVq");


/***/ }),

/***/ "VVlx":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("29s/")('keys');
var uid = __webpack_require__("YqAc");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "Vh22":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var BN = __webpack_require__("OZ/i");
var MillerRabin = __webpack_require__("ehAg");
var millerRabin = new MillerRabin();
var TWENTYFOUR = new BN(24);
var ELEVEN = new BN(11);
var TEN = new BN(10);
var THREE = new BN(3);
var SEVEN = new BN(7);
var primes = __webpack_require__("WKKt");
var randomBytes = __webpack_require__("Edxu");
module.exports = DH;

function setPublicKey(pub, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(pub)) {
    pub = new Buffer(pub, enc);
  }
  this._pub = new BN(pub);
  return this;
}

function setPrivateKey(priv, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(priv)) {
    priv = new Buffer(priv, enc);
  }
  this._priv = new BN(priv);
  return this;
}

var primeCache = {};
function checkPrime(prime, generator) {
  var gen = generator.toString('hex');
  var hex = [gen, prime.toString(16)].join('_');
  if (hex in primeCache) {
    return primeCache[hex];
  }
  var error = 0;

  if (prime.isEven() ||
    !primes.simpleSieve ||
    !primes.fermatTest(prime) ||
    !millerRabin.test(prime)) {
    //not a prime so +1
    error += 1;

    if (gen === '02' || gen === '05') {
      // we'd be able to check the generator
      // it would fail so +8
      error += 8;
    } else {
      //we wouldn't be able to test the generator
      // so +4
      error += 4;
    }
    primeCache[hex] = error;
    return error;
  }
  if (!millerRabin.test(prime.shrn(1))) {
    //not a safe prime
    error += 2;
  }
  var rem;
  switch (gen) {
    case '02':
      if (prime.mod(TWENTYFOUR).cmp(ELEVEN)) {
        // unsuidable generator
        error += 8;
      }
      break;
    case '05':
      rem = prime.mod(TEN);
      if (rem.cmp(THREE) && rem.cmp(SEVEN)) {
        // prime mod 10 needs to equal 3 or 7
        error += 8;
      }
      break;
    default:
      error += 4;
  }
  primeCache[hex] = error;
  return error;
}

function DH(prime, generator, malleable) {
  this.setGenerator(generator);
  this.__prime = new BN(prime);
  this._prime = BN.mont(this.__prime);
  this._primeLen = prime.length;
  this._pub = undefined;
  this._priv = undefined;
  this._primeCode = undefined;
  if (malleable) {
    this.setPublicKey = setPublicKey;
    this.setPrivateKey = setPrivateKey;
  } else {
    this._primeCode = 8;
  }
}
Object.defineProperty(DH.prototype, 'verifyError', {
  enumerable: true,
  get: function () {
    if (typeof this._primeCode !== 'number') {
      this._primeCode = checkPrime(this.__prime, this.__gen);
    }
    return this._primeCode;
  }
});
DH.prototype.generateKeys = function () {
  if (!this._priv) {
    this._priv = new BN(randomBytes(this._primeLen));
  }
  this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();
  return this.getPublicKey();
};

DH.prototype.computeSecret = function (other) {
  other = new BN(other);
  other = other.toRed(this._prime);
  var secret = other.redPow(this._priv).fromRed();
  var out = new Buffer(secret.toArray());
  var prime = this.getPrime();
  if (out.length < prime.length) {
    var front = new Buffer(prime.length - out.length);
    front.fill(0);
    out = Buffer.concat([front, out]);
  }
  return out;
};

DH.prototype.getPublicKey = function getPublicKey(enc) {
  return formatReturnValue(this._pub, enc);
};

DH.prototype.getPrivateKey = function getPrivateKey(enc) {
  return formatReturnValue(this._priv, enc);
};

DH.prototype.getPrime = function (enc) {
  return formatReturnValue(this.__prime, enc);
};

DH.prototype.getGenerator = function (enc) {
  return formatReturnValue(this._gen, enc);
};

DH.prototype.setGenerator = function (gen, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(gen)) {
    gen = new Buffer(gen, enc);
  }
  this.__gen = gen;
  this._gen = new BN(gen);
  return this;
};

function formatReturnValue(bn, enc) {
  var buf = new Buffer(bn.toArray());
  if (!enc) {
    return buf;
  } else {
    return buf.toString(enc);
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "W070":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("NsO/");
var toLength = __webpack_require__("tEej");
var toAbsoluteIndex = __webpack_require__("D8kY");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "WEpk":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "WKKt":
/***/ (function(module, exports, __webpack_require__) {

var randomBytes = __webpack_require__("Edxu");
module.exports = findPrime;
findPrime.simpleSieve = simpleSieve;
findPrime.fermatTest = fermatTest;
var BN = __webpack_require__("OZ/i");
var TWENTYFOUR = new BN(24);
var MillerRabin = __webpack_require__("ehAg");
var millerRabin = new MillerRabin();
var ONE = new BN(1);
var TWO = new BN(2);
var FIVE = new BN(5);
var SIXTEEN = new BN(16);
var EIGHT = new BN(8);
var TEN = new BN(10);
var THREE = new BN(3);
var SEVEN = new BN(7);
var ELEVEN = new BN(11);
var FOUR = new BN(4);
var TWELVE = new BN(12);
var primes = null;

function _getPrimes() {
  if (primes !== null)
    return primes;

  var limit = 0x100000;
  var res = [];
  res[0] = 2;
  for (var i = 1, k = 3; k < limit; k += 2) {
    var sqrt = Math.ceil(Math.sqrt(k));
    for (var j = 0; j < i && res[j] <= sqrt; j++)
      if (k % res[j] === 0)
        break;

    if (i !== j && res[j] <= sqrt)
      continue;

    res[i++] = k;
  }
  primes = res;
  return res;
}

function simpleSieve(p) {
  var primes = _getPrimes();

  for (var i = 0; i < primes.length; i++)
    if (p.modn(primes[i]) === 0) {
      if (p.cmpn(primes[i]) === 0) {
        return true;
      } else {
        return false;
      }
    }

  return true;
}

function fermatTest(p) {
  var red = BN.mont(p);
  return TWO.toRed(red).redPow(p.subn(1)).fromRed().cmpn(1) === 0;
}

function findPrime(bits, gen) {
  if (bits < 16) {
    // this is what openssl does
    if (gen === 2 || gen === 5) {
      return new BN([0x8c, 0x7b]);
    } else {
      return new BN([0x8c, 0x27]);
    }
  }
  gen = new BN(gen);

  var num, n2;

  while (true) {
    num = new BN(randomBytes(Math.ceil(bits / 8)));
    while (num.bitLength() > bits) {
      num.ishrn(1);
    }
    if (num.isEven()) {
      num.iadd(ONE);
    }
    if (!num.testn(1)) {
      num.iadd(TWO);
    }
    if (!gen.cmp(TWO)) {
      while (num.mod(TWENTYFOUR).cmp(ELEVEN)) {
        num.iadd(FOUR);
      }
    } else if (!gen.cmp(FIVE)) {
      while (num.mod(TEN).cmp(THREE)) {
        num.iadd(FOUR);
      }
    }
    n2 = num.shrn(1);
    if (simpleSieve(n2) && simpleSieve(num) &&
      fermatTest(n2) && fermatTest(num) &&
      millerRabin.test(n2) && millerRabin.test(num)) {
      return num;
    }
  }

}


/***/ }),

/***/ "WnY+":
/***/ (function(module, exports, __webpack_require__) {

var MD5 = __webpack_require__("9XZ3")

module.exports = function (buffer) {
  return new MD5().update(buffer).digest()
}


/***/ }),

/***/ "Xudb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.readUInt32BE = function readUInt32BE(bytes, off) {
  var res =  (bytes[0 + off] << 24) |
             (bytes[1 + off] << 16) |
             (bytes[2 + off] << 8) |
             bytes[3 + off];
  return res >>> 0;
};

exports.writeUInt32BE = function writeUInt32BE(bytes, value, off) {
  bytes[0 + off] = value >>> 24;
  bytes[1 + off] = (value >>> 16) & 0xff;
  bytes[2 + off] = (value >>> 8) & 0xff;
  bytes[3 + off] = value & 0xff;
};

exports.ip = function ip(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  for (var i = 6; i >= 0; i -= 2) {
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inR >>> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inL >>> (j + i)) & 1;
    }
  }

  for (var i = 6; i >= 0; i -= 2) {
    for (var j = 1; j <= 25; j += 8) {
      outR <<= 1;
      outR |= (inR >>> (j + i)) & 1;
    }
    for (var j = 1; j <= 25; j += 8) {
      outR <<= 1;
      outR |= (inL >>> (j + i)) & 1;
    }
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.rip = function rip(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  for (var i = 0; i < 4; i++) {
    for (var j = 24; j >= 0; j -= 8) {
      outL <<= 1;
      outL |= (inR >>> (j + i)) & 1;
      outL <<= 1;
      outL |= (inL >>> (j + i)) & 1;
    }
  }
  for (var i = 4; i < 8; i++) {
    for (var j = 24; j >= 0; j -= 8) {
      outR <<= 1;
      outR |= (inR >>> (j + i)) & 1;
      outR <<= 1;
      outR |= (inL >>> (j + i)) & 1;
    }
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.pc1 = function pc1(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  // 7, 15, 23, 31, 39, 47, 55, 63
  // 6, 14, 22, 30, 39, 47, 55, 63
  // 5, 13, 21, 29, 39, 47, 55, 63
  // 4, 12, 20, 28
  for (var i = 7; i >= 5; i--) {
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inR >> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inL >> (j + i)) & 1;
    }
  }
  for (var j = 0; j <= 24; j += 8) {
    outL <<= 1;
    outL |= (inR >> (j + i)) & 1;
  }

  // 1, 9, 17, 25, 33, 41, 49, 57
  // 2, 10, 18, 26, 34, 42, 50, 58
  // 3, 11, 19, 27, 35, 43, 51, 59
  // 36, 44, 52, 60
  for (var i = 1; i <= 3; i++) {
    for (var j = 0; j <= 24; j += 8) {
      outR <<= 1;
      outR |= (inR >> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outR <<= 1;
      outR |= (inL >> (j + i)) & 1;
    }
  }
  for (var j = 0; j <= 24; j += 8) {
    outR <<= 1;
    outR |= (inL >> (j + i)) & 1;
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.r28shl = function r28shl(num, shift) {
  return ((num << shift) & 0xfffffff) | (num >>> (28 - shift));
};

var pc2table = [
  // inL => outL
  14, 11, 17, 4, 27, 23, 25, 0,
  13, 22, 7, 18, 5, 9, 16, 24,
  2, 20, 12, 21, 1, 8, 15, 26,

  // inR => outR
  15, 4, 25, 19, 9, 1, 26, 16,
  5, 11, 23, 8, 12, 7, 17, 0,
  22, 3, 10, 14, 6, 20, 27, 24
];

exports.pc2 = function pc2(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  var len = pc2table.length >>> 1;
  for (var i = 0; i < len; i++) {
    outL <<= 1;
    outL |= (inL >>> pc2table[i]) & 0x1;
  }
  for (var i = len; i < pc2table.length; i++) {
    outR <<= 1;
    outR |= (inR >>> pc2table[i]) & 0x1;
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.expand = function expand(r, out, off) {
  var outL = 0;
  var outR = 0;

  outL = ((r & 1) << 5) | (r >>> 27);
  for (var i = 23; i >= 15; i -= 4) {
    outL <<= 6;
    outL |= (r >>> i) & 0x3f;
  }
  for (var i = 11; i >= 3; i -= 4) {
    outR |= (r >>> i) & 0x3f;
    outR <<= 6;
  }
  outR |= ((r & 0x1f) << 1) | (r >>> 31);

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

var sTable = [
  14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1,
  3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8,
  4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7,
  15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13,

  15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14,
  9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5,
  0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2,
  5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9,

  10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10,
  1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1,
  13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7,
  11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12,

  7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3,
  1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9,
  10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8,
  15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14,

  2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1,
  8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6,
  4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13,
  15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3,

  12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5,
  0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8,
  9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10,
  7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13,

  4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10,
  3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6,
  1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7,
  10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12,

  13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4,
  10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2,
  7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13,
  0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11
];

exports.substitute = function substitute(inL, inR) {
  var out = 0;
  for (var i = 0; i < 4; i++) {
    var b = (inL >>> (18 - i * 6)) & 0x3f;
    var sb = sTable[i * 0x40 + b];

    out <<= 4;
    out |= sb;
  }
  for (var i = 0; i < 4; i++) {
    var b = (inR >>> (18 - i * 6)) & 0x3f;
    var sb = sTable[4 * 0x40 + i * 0x40 + b];

    out <<= 4;
    out |= sb;
  }
  return out >>> 0;
};

var permuteTable = [
  16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22,
  30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7
];

exports.permute = function permute(num) {
  var out = 0;
  for (var i = 0; i < permuteTable.length; i++) {
    out <<= 1;
    out |= (num >>> permuteTable[i]) & 0x1;
  }
  return out >>> 0;
};

exports.padSplit = function padSplit(num, size, group) {
  var str = num.toString(2);
  while (str.length < size)
    str = '0' + str;

  var out = [];
  for (var i = 0; i < size; i += group)
    out.push(str.slice(i, i + group));
  return out.join(' ');
};


/***/ }),

/***/ "Y7ZC":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("5T2Y");
var core = __webpack_require__("WEpk");
var ctx = __webpack_require__("2GTP");
var hide = __webpack_require__("NegM");
var has = __webpack_require__("B+OT");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "YqAc":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "ZDAU":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer
var Transform = __webpack_require__("1IWx").Transform
var StringDecoder = __webpack_require__("qiJe").StringDecoder
var inherits = __webpack_require__("P7XM")

function CipherBase (hashMode) {
  Transform.call(this)
  this.hashMode = typeof hashMode === 'string'
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest
  } else {
    this.final = this._finalOrDigest
  }
  if (this._final) {
    this.__final = this._final
    this._final = null
  }
  this._decoder = null
  this._encoding = null
}
inherits(CipherBase, Transform)

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = Buffer.from(data, inputEnc)
  }

  var outData = this._update(data)
  if (this.hashMode) return this

  if (outputEnc) {
    outData = this._toString(outData, outputEnc)
  }

  return outData
}

CipherBase.prototype.setAutoPadding = function () {}
CipherBase.prototype.getAuthTag = function () {
  throw new Error('trying to get auth tag in unsupported state')
}

CipherBase.prototype.setAuthTag = function () {
  throw new Error('trying to set auth tag in unsupported state')
}

CipherBase.prototype.setAAD = function () {
  throw new Error('trying to set aad in unsupported state')
}

CipherBase.prototype._transform = function (data, _, next) {
  var err
  try {
    if (this.hashMode) {
      this._update(data)
    } else {
      this.push(this._update(data))
    }
  } catch (e) {
    err = e
  } finally {
    next(err)
  }
}
CipherBase.prototype._flush = function (done) {
  var err
  try {
    this.push(this.__final())
  } catch (e) {
    err = e
  }

  done(err)
}
CipherBase.prototype._finalOrDigest = function (outputEnc) {
  var outData = this.__final() || Buffer.alloc(0)
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true)
  }
  return outData
}

CipherBase.prototype._toString = function (value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc)
    this._encoding = enc
  }

  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

  var out = this._decoder.write(value)
  if (fin) {
    out += this._decoder.end()
  }

  return out
}

module.exports = CipherBase


/***/ }),

/***/ "Zxgi":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("5T2Y");
var core = __webpack_require__("WEpk");
var LIBRARY = __webpack_require__("uOPS");
var wksExt = __webpack_require__("zLkG");
var defineProperty = __webpack_require__("2faE").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "a0xu":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "adOz":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Zxgi")('asyncIterator');


/***/ }),

/***/ "ar/p":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("5vMV");
var hiddenKeys = __webpack_require__("FpHa").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "bBy9":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("w2d+");
var global = __webpack_require__("5T2Y");
var hide = __webpack_require__("NegM");
var Iterators = __webpack_require__("SBuE");
var TO_STRING_TAG = __webpack_require__("UWiX")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "ccE7":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("Ojgd");
var defined = __webpack_require__("Jes0");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "dl0q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Zxgi")('observable');


/***/ }),

/***/ "eKop":
/***/ (function(module, exports, __webpack_require__) {

var Point = __webpack_require__("PJ1Y")
var Curve = __webpack_require__("VDaT")

var getCurveByName = __webpack_require__("NIfo")

module.exports = {
  Curve: Curve,
  Point: Point,
  getCurveByName: getCurveByName
}


/***/ }),

/***/ "eUtF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("jmDH") && !__webpack_require__("KUxP")(function () {
  return Object.defineProperty(__webpack_require__("Hsns")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "eaoh":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "fNZA":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("QMMT");
var ITERATOR = __webpack_require__("UWiX")('iterator');
var Iterators = __webpack_require__("SBuE");
module.exports = __webpack_require__("WEpk").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "fXsU":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("5K7Z");
var get = __webpack_require__("fNZA");
module.exports = __webpack_require__("WEpk").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "fpC5":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("2faE");
var anObject = __webpack_require__("5K7Z");
var getKeys = __webpack_require__("w6GO");

module.exports = __webpack_require__("jmDH") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "hDam":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "iq4v":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Mqbl");
module.exports = __webpack_require__("WEpk").Object.keys;


/***/ }),

/***/ "j2DC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("oVml");
var descriptor = __webpack_require__("rr1i");
var setToStringTag = __webpack_require__("RfKB");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("NegM")(IteratorPrototype, __webpack_require__("UWiX")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "jmDH":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("KUxP")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "kAMH":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("a0xu");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "kTiW":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("NegM");


/***/ }),

/***/ "ldVq":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("QMMT");
var ITERATOR = __webpack_require__("UWiX")('iterator');
var Iterators = __webpack_require__("SBuE");
module.exports = __webpack_require__("WEpk").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "mObS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__("P7XM")
var MD5 = __webpack_require__("9XZ3")
var RIPEMD160 = __webpack_require__("tcrS")
var sha = __webpack_require__("afKu")
var Base = __webpack_require__("ZDAU")

function Hash (hash) {
  Base.call(this, 'digest')

  this._hash = hash
}

inherits(Hash, Base)

Hash.prototype._update = function (data) {
  this._hash.update(data)
}

Hash.prototype._final = function () {
  return this._hash.digest()
}

module.exports = function createHash (alg) {
  alg = alg.toLowerCase()
  if (alg === 'md5') return new MD5()
  if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160()

  return new Hash(sha(alg))
}


/***/ }),

/***/ "mqlF":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "oVml":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("5K7Z");
var dPs = __webpack_require__("fpC5");
var enumBugKeys = __webpack_require__("FpHa");
var IE_PROTO = __webpack_require__("VVlx")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("Hsns")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("MvwC").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "pspB":
/***/ (function(module, exports) {

/* jshint node: true */
(function () {
    "use strict";

    function CookieAccessInfo(domain, path, secure, script) {
        if (this instanceof CookieAccessInfo) {
            this.domain = domain || undefined;
            this.path = path || "/";
            this.secure = !!secure;
            this.script = !!script;
            return this;
        }
        return new CookieAccessInfo(domain, path, secure, script);
    }
    CookieAccessInfo.All = Object.freeze(Object.create(null));
    exports.CookieAccessInfo = CookieAccessInfo;

    function Cookie(cookiestr, request_domain, request_path) {
        if (cookiestr instanceof Cookie) {
            return cookiestr;
        }
        if (this instanceof Cookie) {
            this.name = null;
            this.value = null;
            this.expiration_date = Infinity;
            this.path = String(request_path || "/");
            this.explicit_path = false;
            this.domain = request_domain || null;
            this.explicit_domain = false;
            this.secure = false; //how to define default?
            this.noscript = false; //httponly
            if (cookiestr) {
                this.parse(cookiestr, request_domain, request_path);
            }
            return this;
        }
        return new Cookie(cookiestr, request_domain, request_path);
    }
    exports.Cookie = Cookie;

    Cookie.prototype.toString = function toString() {
        var str = [this.name + "=" + this.value];
        if (this.expiration_date !== Infinity) {
            str.push("expires=" + (new Date(this.expiration_date)).toGMTString());
        }
        if (this.domain) {
            str.push("domain=" + this.domain);
        }
        if (this.path) {
            str.push("path=" + this.path);
        }
        if (this.secure) {
            str.push("secure");
        }
        if (this.noscript) {
            str.push("httponly");
        }
        return str.join("; ");
    };

    Cookie.prototype.toValueString = function toValueString() {
        return this.name + "=" + this.value;
    };

    var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
    Cookie.prototype.parse = function parse(str, request_domain, request_path) {
        if (this instanceof Cookie) {
            var parts = str.split(";").filter(function (value) {
                    return !!value;
                });
            var i;

            var pair = parts[0].match(/([^=]+)=([\s\S]*)/);
            if (!pair) {
                console.warn("Invalid cookie header encountered. Header: '"+str+"'");
                return;
            }

            var key = pair[1];
            var value = pair[2];
            if ( typeof key !== 'string' || key.length === 0 || typeof value !== 'string' ) {
                console.warn("Unable to extract values from cookie header. Cookie: '"+str+"'");
                return;
            }

            this.name = key;
            this.value = value;

            for (i = 1; i < parts.length; i += 1) {
                pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
                key = pair[1].trim().toLowerCase();
                value = pair[2];
                switch (key) {
                case "httponly":
                    this.noscript = true;
                    break;
                case "expires":
                    this.expiration_date = value ?
                            Number(Date.parse(value)) :
                            Infinity;
                    break;
                case "path":
                    this.path = value ?
                            value.trim() :
                            "";
                    this.explicit_path = true;
                    break;
                case "domain":
                    this.domain = value ?
                            value.trim() :
                            "";
                    this.explicit_domain = !!this.domain;
                    break;
                case "secure":
                    this.secure = true;
                    break;
                }
            }

            if (!this.explicit_path) {
               this.path = request_path || "/";
            }
            if (!this.explicit_domain) {
               this.domain = request_domain;
            }

            return this;
        }
        return new Cookie().parse(str, request_domain, request_path);
    };

    Cookie.prototype.matches = function matches(access_info) {
        if (access_info === CookieAccessInfo.All) {
          return true;
        }
        if (this.noscript && access_info.script ||
                this.secure && !access_info.secure ||
                !this.collidesWith(access_info)) {
            return false;
        }
        return true;
    };

    Cookie.prototype.collidesWith = function collidesWith(access_info) {
        if ((this.path && !access_info.path) || (this.domain && !access_info.domain)) {
            return false;
        }
        if (this.path && access_info.path.indexOf(this.path) !== 0) {
            return false;
        }
        if (this.explicit_path && access_info.path.indexOf( this.path ) !== 0) {
           return false;
        }
        var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/,'');
        var cookie_domain = this.domain && this.domain.replace(/^[\.]/,'');
        if (cookie_domain === access_domain) {
            return true;
        }
        if (cookie_domain) {
            if (!this.explicit_domain) {
                return false; // we already checked if the domains were exactly the same
            }
            var wildcard = access_domain.indexOf(cookie_domain);
            if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
                return false;
            }
            return true;
        }
        return true;
    };

    function CookieJar() {
        var cookies, cookies_list, collidable_cookie;
        if (this instanceof CookieJar) {
            cookies = Object.create(null); //name: [Cookie]

            this.setCookie = function setCookie(cookie, request_domain, request_path) {
                var remove, i;
                cookie = new Cookie(cookie, request_domain, request_path);
                //Delete the cookie if the set is past the current time
                remove = cookie.expiration_date <= Date.now();
                if (cookies[cookie.name] !== undefined) {
                    cookies_list = cookies[cookie.name];
                    for (i = 0; i < cookies_list.length; i += 1) {
                        collidable_cookie = cookies_list[i];
                        if (collidable_cookie.collidesWith(cookie)) {
                            if (remove) {
                                cookies_list.splice(i, 1);
                                if (cookies_list.length === 0) {
                                    delete cookies[cookie.name];
                                }
                                return false;
                            }
                            cookies_list[i] = cookie;
                            return cookie;
                        }
                    }
                    if (remove) {
                        return false;
                    }
                    cookies_list.push(cookie);
                    return cookie;
                }
                if (remove) {
                    return false;
                }
                cookies[cookie.name] = [cookie];
                return cookies[cookie.name];
            };
            //returns a cookie
            this.getCookie = function getCookie(cookie_name, access_info) {
                var cookie, i;
                cookies_list = cookies[cookie_name];
                if (!cookies_list) {
                    return;
                }
                for (i = 0; i < cookies_list.length; i += 1) {
                    cookie = cookies_list[i];
                    if (cookie.expiration_date <= Date.now()) {
                        if (cookies_list.length === 0) {
                            delete cookies[cookie.name];
                        }
                        continue;
                    }

                    if (cookie.matches(access_info)) {
                        return cookie;
                    }
                }
            };
            //returns a list of cookies
            this.getCookies = function getCookies(access_info) {
                var matches = [], cookie_name, cookie;
                for (cookie_name in cookies) {
                    cookie = this.getCookie(cookie_name, access_info);
                    if (cookie) {
                        matches.push(cookie);
                    }
                }
                matches.toString = function toString() {
                    return matches.join(":");
                };
                matches.toValueString = function toValueString() {
                    return matches.map(function (c) {
                        return c.toValueString();
                    }).join(';');
                };
                return matches;
            };

            return this;
        }
        return new CookieJar();
    }
    exports.CookieJar = CookieJar;

    //returns list of cookies that were set correctly. Cookies that are expired and removed are not returned.
    CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
        cookies = Array.isArray(cookies) ?
                cookies :
                cookies.split(cookie_str_splitter);
        var successful = [],
            i,
            cookie;
        cookies = cookies.map(function(item){
            return new Cookie(item, request_domain, request_path);
        });
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i];
            if (this.setCookie(cookie, request_domain, request_path)) {
                successful.push(cookie);
            }
        }
        return successful;
    };
}());


/***/ }),

/***/ "rr1i":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "tEej":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("Ojgd");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "uOPS":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "vwuL":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("NV0k");
var createDesc = __webpack_require__("rr1i");
var toIObject = __webpack_require__("NsO/");
var toPrimitive = __webpack_require__("G8Mo");
var has = __webpack_require__("B+OT");
var IE8_DOM_DEFINE = __webpack_require__("eUtF");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("jmDH") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "w2d+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("hDam");
var step = __webpack_require__("UO39");
var Iterators = __webpack_require__("SBuE");
var toIObject = __webpack_require__("NsO/");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("MPFp")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "w6GO":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("5vMV");
var enumBugKeys = __webpack_require__("FpHa");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "wgeU":
/***/ (function(module, exports) {



/***/ }),

/***/ "wk3p":
/***/ (function(module) {

module.exports = JSON.parse("{\"modp1\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff\"},\"modp2\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff\"},\"modp5\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff\"},\"modp14\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff\"},\"modp15\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff\"},\"modp16\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff\"},\"modp17\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff\"},\"modp18\":{\"gen\":\"02\",\"prime\":\"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff\"}}");

/***/ }),

/***/ "zLkG":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("UWiX");


/***/ }),

/***/ "zn7N":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("Y7ZC");
var core = __webpack_require__("WEpk");
var fails = __webpack_require__("KUxP");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlYXRlLWhtYWMvbGVnYWN5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVhdGUtZWNkaC9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RpZmZpZS1oZWxsbWFuL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Rlcy5qcy9saWIvZGVzL2NpcGhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZXMuanMvbGliL2Rlcy9jYmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RpamtzdHJhanMvZGlqa3N0cmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Rlcy5qcy9saWIvZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlYXRlLWhtYWMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVzLmpzL2xpYi9kZXMvZWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nsb25lL2Nsb25lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VjdXJ2ZS9saWIvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLXV0aWwtaXMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VjdXJ2ZS9saWIvcG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Rlcy5qcy9saWIvZGVzL2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VjdXJ2ZS9saWIvY3VydmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RpZmZpZS1oZWxsbWFuL2xpYi9kaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGlmZmllLWhlbGxtYW4vbGliL2dlbmVyYXRlUHJpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWF0ZS1oYXNoL21kNS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVzLmpzL2xpYi9kZXMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NpcGhlci1iYXNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VjdXJ2ZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlYXRlLWhhc2gvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29va2llamFyL2Nvb2tpZWphci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQkFBTyxDQUFDLE1BQTBCO0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZC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LG1CQUFPLENBQUMsTUFBVTtBQUM5QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EscURBQXFELE9BQU8sRUFBRTtBQUM5RCIsImZpbGUiOiJ2ZW5kb3J+ZDkzOWU0MzYuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG4iLCIndXNlIHN0cmljdCdcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxuXG52YXIgQmFzZSA9IHJlcXVpcmUoJ2NpcGhlci1iYXNlJylcblxudmFyIFpFUk9TID0gQnVmZmVyLmFsbG9jKDEyOClcbnZhciBibG9ja3NpemUgPSA2NFxuXG5mdW5jdGlvbiBIbWFjIChhbGcsIGtleSkge1xuICBCYXNlLmNhbGwodGhpcywgJ2RpZ2VzdCcpXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgIGtleSA9IEJ1ZmZlci5mcm9tKGtleSlcbiAgfVxuXG4gIHRoaXMuX2FsZyA9IGFsZ1xuICB0aGlzLl9rZXkgPSBrZXlcblxuICBpZiAoa2V5Lmxlbmd0aCA+IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IGFsZyhrZXkpXG4gIH0gZWxzZSBpZiAoa2V5Lmxlbmd0aCA8IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IEJ1ZmZlci5jb25jYXQoW2tleSwgWkVST1NdLCBibG9ja3NpemUpXG4gIH1cblxuICB2YXIgaXBhZCA9IHRoaXMuX2lwYWQgPSBCdWZmZXIuYWxsb2NVbnNhZmUoYmxvY2tzaXplKVxuICB2YXIgb3BhZCA9IHRoaXMuX29wYWQgPSBCdWZmZXIuYWxsb2NVbnNhZmUoYmxvY2tzaXplKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tzaXplOyBpKyspIHtcbiAgICBpcGFkW2ldID0ga2V5W2ldIF4gMHgzNlxuICAgIG9wYWRbaV0gPSBrZXlbaV0gXiAweDVDXG4gIH1cblxuICB0aGlzLl9oYXNoID0gW2lwYWRdXG59XG5cbmluaGVyaXRzKEhtYWMsIEJhc2UpXG5cbkhtYWMucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLl9oYXNoLnB1c2goZGF0YSlcbn1cblxuSG1hYy5wcm90b3R5cGUuX2ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaCA9IHRoaXMuX2FsZyhCdWZmZXIuY29uY2F0KHRoaXMuX2hhc2gpKVxuICByZXR1cm4gdGhpcy5fYWxnKEJ1ZmZlci5jb25jYXQoW3RoaXMuX29wYWQsIGhdKSlcbn1cbm1vZHVsZS5leHBvcnRzID0gSG1hY1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZWxsaXB0aWMgPSByZXF1aXJlKCdlbGxpcHRpYycpXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRUNESCAoY3VydmUpIHtcbiAgcmV0dXJuIG5ldyBFQ0RIKGN1cnZlKVxufVxuXG52YXIgYWxpYXNlcyA9IHtcbiAgc2VjcDI1NmsxOiB7XG4gICAgbmFtZTogJ3NlY3AyNTZrMScsXG4gICAgYnl0ZUxlbmd0aDogMzJcbiAgfSxcbiAgc2VjcDIyNHIxOiB7XG4gICAgbmFtZTogJ3AyMjQnLFxuICAgIGJ5dGVMZW5ndGg6IDI4XG4gIH0sXG4gIHByaW1lMjU2djE6IHtcbiAgICBuYW1lOiAncDI1NicsXG4gICAgYnl0ZUxlbmd0aDogMzJcbiAgfSxcbiAgcHJpbWUxOTJ2MToge1xuICAgIG5hbWU6ICdwMTkyJyxcbiAgICBieXRlTGVuZ3RoOiAyNFxuICB9LFxuICBlZDI1NTE5OiB7XG4gICAgbmFtZTogJ2VkMjU1MTknLFxuICAgIGJ5dGVMZW5ndGg6IDMyXG4gIH0sXG4gIHNlY3AzODRyMToge1xuICAgIG5hbWU6ICdwMzg0JyxcbiAgICBieXRlTGVuZ3RoOiA0OFxuICB9LFxuICBzZWNwNTIxcjE6IHtcbiAgICBuYW1lOiAncDUyMScsXG4gICAgYnl0ZUxlbmd0aDogNjZcbiAgfVxufVxuXG5hbGlhc2VzLnAyMjQgPSBhbGlhc2VzLnNlY3AyMjRyMVxuYWxpYXNlcy5wMjU2ID0gYWxpYXNlcy5zZWNwMjU2cjEgPSBhbGlhc2VzLnByaW1lMjU2djFcbmFsaWFzZXMucDE5MiA9IGFsaWFzZXMuc2VjcDE5MnIxID0gYWxpYXNlcy5wcmltZTE5MnYxXG5hbGlhc2VzLnAzODQgPSBhbGlhc2VzLnNlY3AzODRyMVxuYWxpYXNlcy5wNTIxID0gYWxpYXNlcy5zZWNwNTIxcjFcblxuZnVuY3Rpb24gRUNESCAoY3VydmUpIHtcbiAgdGhpcy5jdXJ2ZVR5cGUgPSBhbGlhc2VzW2N1cnZlXVxuICBpZiAoIXRoaXMuY3VydmVUeXBlKSB7XG4gICAgdGhpcy5jdXJ2ZVR5cGUgPSB7XG4gICAgICBuYW1lOiBjdXJ2ZVxuICAgIH1cbiAgfVxuICB0aGlzLmN1cnZlID0gbmV3IGVsbGlwdGljLmVjKHRoaXMuY3VydmVUeXBlLm5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuICB0aGlzLmtleXMgPSB2b2lkIDBcbn1cblxuRUNESC5wcm90b3R5cGUuZ2VuZXJhdGVLZXlzID0gZnVuY3Rpb24gKGVuYywgZm9ybWF0KSB7XG4gIHRoaXMua2V5cyA9IHRoaXMuY3VydmUuZ2VuS2V5UGFpcigpXG4gIHJldHVybiB0aGlzLmdldFB1YmxpY0tleShlbmMsIGZvcm1hdClcbn1cblxuRUNESC5wcm90b3R5cGUuY29tcHV0ZVNlY3JldCA9IGZ1bmN0aW9uIChvdGhlciwgaW5lbmMsIGVuYykge1xuICBpbmVuYyA9IGluZW5jIHx8ICd1dGY4J1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihvdGhlcikpIHtcbiAgICBvdGhlciA9IG5ldyBCdWZmZXIob3RoZXIsIGluZW5jKVxuICB9XG4gIHZhciBvdGhlclB1YiA9IHRoaXMuY3VydmUua2V5RnJvbVB1YmxpYyhvdGhlcikuZ2V0UHVibGljKClcbiAgdmFyIG91dCA9IG90aGVyUHViLm11bCh0aGlzLmtleXMuZ2V0UHJpdmF0ZSgpKS5nZXRYKClcbiAgcmV0dXJuIGZvcm1hdFJldHVyblZhbHVlKG91dCwgZW5jLCB0aGlzLmN1cnZlVHlwZS5ieXRlTGVuZ3RoKVxufVxuXG5FQ0RILnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoZW5jLCBmb3JtYXQpIHtcbiAgdmFyIGtleSA9IHRoaXMua2V5cy5nZXRQdWJsaWMoZm9ybWF0ID09PSAnY29tcHJlc3NlZCcsIHRydWUpXG4gIGlmIChmb3JtYXQgPT09ICdoeWJyaWQnKSB7XG4gICAgaWYgKGtleVtrZXkubGVuZ3RoIC0gMV0gJSAyKSB7XG4gICAgICBrZXlbMF0gPSA3XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleVswXSA9IDZcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFJldHVyblZhbHVlKGtleSwgZW5jKVxufVxuXG5FQ0RILnByb3RvdHlwZS5nZXRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKGVuYykge1xuICByZXR1cm4gZm9ybWF0UmV0dXJuVmFsdWUodGhpcy5rZXlzLmdldFByaXZhdGUoKSwgZW5jKVxufVxuXG5FQ0RILnByb3RvdHlwZS5zZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAocHViLCBlbmMpIHtcbiAgZW5jID0gZW5jIHx8ICd1dGY4J1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihwdWIpKSB7XG4gICAgcHViID0gbmV3IEJ1ZmZlcihwdWIsIGVuYylcbiAgfVxuICB0aGlzLmtleXMuX2ltcG9ydFB1YmxpYyhwdWIpXG4gIHJldHVybiB0aGlzXG59XG5cbkVDREgucHJvdG90eXBlLnNldFByaXZhdGVLZXkgPSBmdW5jdGlvbiAocHJpdiwgZW5jKSB7XG4gIGVuYyA9IGVuYyB8fCAndXRmOCdcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocHJpdikpIHtcbiAgICBwcml2ID0gbmV3IEJ1ZmZlcihwcml2LCBlbmMpXG4gIH1cblxuICB2YXIgX3ByaXYgPSBuZXcgQk4ocHJpdilcbiAgX3ByaXYgPSBfcHJpdi50b1N0cmluZygxNilcbiAgdGhpcy5rZXlzID0gdGhpcy5jdXJ2ZS5nZW5LZXlQYWlyKClcbiAgdGhpcy5rZXlzLl9pbXBvcnRQcml2YXRlKF9wcml2KVxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBmb3JtYXRSZXR1cm5WYWx1ZSAoYm4sIGVuYywgbGVuKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShibikpIHtcbiAgICBibiA9IGJuLnRvQXJyYXkoKVxuICB9XG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKGJuKVxuICBpZiAobGVuICYmIGJ1Zi5sZW5ndGggPCBsZW4pIHtcbiAgICB2YXIgemVyb3MgPSBuZXcgQnVmZmVyKGxlbiAtIGJ1Zi5sZW5ndGgpXG4gICAgemVyb3MuZmlsbCgwKVxuICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW3plcm9zLCBidWZdKVxuICB9XG4gIGlmICghZW5jKSB7XG4gICAgcmV0dXJuIGJ1ZlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBidWYudG9TdHJpbmcoZW5jKVxuICB9XG59XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2woJ2ZvbycpID09PSAnc3ltYm9sJztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIG9yaWdEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgb2JqID0ge307XG5cdHRyeSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iaiwgJ3gnLCB7IGVudW1lcmFibGU6IGZhbHNlLCB2YWx1ZTogb2JqIH0pO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycywgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRmb3IgKHZhciBfIGluIG9iaikgeyAvLyBqc2NzOmlnbm9yZSBkaXNhbGxvd1VudXNlZFZhcmlhYmxlc1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqLnggPT09IG9iajtcblx0fSBjYXRjaCAoZSkgeyAvKiB0aGlzIGlzIElFIDguICovXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBvcmlnRGVmaW5lUHJvcGVydHkgJiYgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCgpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCAmJiAoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSB8fCAhcHJlZGljYXRlKCkpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRva2VuID0gJyVbYS1mMC05XXsyfSc7XG52YXIgc2luZ2xlTWF0Y2hlciA9IG5ldyBSZWdFeHAodG9rZW4sICdnaScpO1xudmFyIG11bHRpTWF0Y2hlciA9IG5ldyBSZWdFeHAoJygnICsgdG9rZW4gKyAnKSsnLCAnZ2knKTtcblxuZnVuY3Rpb24gZGVjb2RlQ29tcG9uZW50cyhjb21wb25lbnRzLCBzcGxpdCkge1xuXHR0cnkge1xuXHRcdC8vIFRyeSB0byBkZWNvZGUgdGhlIGVudGlyZSBzdHJpbmcgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudHMuam9pbignJykpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cblxuXHRpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0fVxuXG5cdHNwbGl0ID0gc3BsaXQgfHwgMTtcblxuXHQvLyBTcGxpdCB0aGUgYXJyYXkgaW4gMiBwYXJ0c1xuXHR2YXIgbGVmdCA9IGNvbXBvbmVudHMuc2xpY2UoMCwgc3BsaXQpO1xuXHR2YXIgcmlnaHQgPSBjb21wb25lbnRzLnNsaWNlKHNwbGl0KTtcblxuXHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKFtdLCBkZWNvZGVDb21wb25lbnRzKGxlZnQpLCBkZWNvZGVDb21wb25lbnRzKHJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHR2YXIgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5wdXQgPSBkZWNvZGVDb21wb25lbnRzKHRva2VucywgaSkuam9pbignJyk7XG5cblx0XHRcdHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxufVxuXG5mdW5jdGlvbiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoaW5wdXQpIHtcblx0Ly8gS2VlcCB0cmFjayBvZiBhbGwgdGhlIHJlcGxhY2VtZW50cyBhbmQgcHJlZmlsbCB0aGUgbWFwIHdpdGggdGhlIGBCT01gXG5cdHZhciByZXBsYWNlTWFwID0ge1xuXHRcdCclRkUlRkYnOiAnXFx1RkZGRFxcdUZGRkQnLFxuXHRcdCclRkYlRkUnOiAnXFx1RkZGRFxcdUZGRkQnXG5cdH07XG5cblx0dmFyIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR3aGlsZSAobWF0Y2gpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gRGVjb2RlIGFzIGJpZyBjaHVua3MgYXMgcG9zc2libGVcblx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzBdKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWNvZGUobWF0Y2hbMF0pO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9PSBtYXRjaFswXSkge1xuXHRcdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IHJlc3VsdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0fVxuXG5cdC8vIEFkZCBgJUMyYCBhdCB0aGUgZW5kIG9mIHRoZSBtYXAgdG8gbWFrZSBzdXJlIGl0IGRvZXMgbm90IHJlcGxhY2UgdGhlIGNvbWJpbmF0b3IgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZVxuXHRyZXBsYWNlTWFwWyclQzInXSA9ICdcXHVGRkZEJztcblxuXHR2YXIgZW50cmllcyA9IE9iamVjdC5rZXlzKHJlcGxhY2VNYXApO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIFJlcGxhY2UgYWxsIGRlY29kZWQgY29tcG9uZW50c1xuXHRcdHZhciBrZXkgPSBlbnRyaWVzW2ldO1xuXHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKGtleSwgJ2cnKSwgcmVwbGFjZU1hcFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZW5jb2RlZFVSSSkge1xuXHRpZiAodHlwZW9mIGVuY29kZWRVUkkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGVuY29kZWRVUklgIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AsIGdvdCBgJyArIHR5cGVvZiBlbmNvZGVkVVJJICsgJ2AnKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0ZW5jb2RlZFVSSSA9IGVuY29kZWRVUkkucmVwbGFjZSgvXFwrL2csICcgJyk7XG5cblx0XHQvLyBUcnkgdGhlIGJ1aWx0IGluIGRlY29kZXIgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBGYWxsYmFjayB0byBhIG1vcmUgYWR2YW5jZWQgZGVjb2RlclxuXHRcdHJldHVybiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIGdlbmVyYXRlUHJpbWUgPSByZXF1aXJlKCcuL2xpYi9nZW5lcmF0ZVByaW1lJylcbnZhciBwcmltZXMgPSByZXF1aXJlKCcuL2xpYi9wcmltZXMuanNvbicpXG5cbnZhciBESCA9IHJlcXVpcmUoJy4vbGliL2RoJylcblxuZnVuY3Rpb24gZ2V0RGlmZmllSGVsbG1hbiAobW9kKSB7XG4gIHZhciBwcmltZSA9IG5ldyBCdWZmZXIocHJpbWVzW21vZF0ucHJpbWUsICdoZXgnKVxuICB2YXIgZ2VuID0gbmV3IEJ1ZmZlcihwcmltZXNbbW9kXS5nZW4sICdoZXgnKVxuXG4gIHJldHVybiBuZXcgREgocHJpbWUsIGdlbilcbn1cblxudmFyIEVOQ09ESU5HUyA9IHtcbiAgJ2JpbmFyeSc6IHRydWUsICdoZXgnOiB0cnVlLCAnYmFzZTY0JzogdHJ1ZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEaWZmaWVIZWxsbWFuIChwcmltZSwgZW5jLCBnZW5lcmF0b3IsIGdlbmMpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihlbmMpIHx8IEVOQ09ESU5HU1tlbmNdID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY3JlYXRlRGlmZmllSGVsbG1hbihwcmltZSwgJ2JpbmFyeScsIGVuYywgZ2VuZXJhdG9yKVxuICB9XG5cbiAgZW5jID0gZW5jIHx8ICdiaW5hcnknXG4gIGdlbmMgPSBnZW5jIHx8ICdiaW5hcnknXG4gIGdlbmVyYXRvciA9IGdlbmVyYXRvciB8fCBuZXcgQnVmZmVyKFsyXSlcblxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihnZW5lcmF0b3IpKSB7XG4gICAgZ2VuZXJhdG9yID0gbmV3IEJ1ZmZlcihnZW5lcmF0b3IsIGdlbmMpXG4gIH1cblxuICBpZiAodHlwZW9mIHByaW1lID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBuZXcgREgoZ2VuZXJhdGVQcmltZShwcmltZSwgZ2VuZXJhdG9yKSwgZ2VuZXJhdG9yLCB0cnVlKVxuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocHJpbWUpKSB7XG4gICAgcHJpbWUgPSBuZXcgQnVmZmVyKHByaW1lLCBlbmMpXG4gIH1cblxuICByZXR1cm4gbmV3IERIKHByaW1lLCBnZW5lcmF0b3IsIHRydWUpXG59XG5cbmV4cG9ydHMuRGlmZmllSGVsbG1hbkdyb3VwID0gZXhwb3J0cy5jcmVhdGVEaWZmaWVIZWxsbWFuR3JvdXAgPSBleHBvcnRzLmdldERpZmZpZUhlbGxtYW4gPSBnZXREaWZmaWVIZWxsbWFuXG5leHBvcnRzLmNyZWF0ZURpZmZpZUhlbGxtYW4gPSBleHBvcnRzLkRpZmZpZUhlbGxtYW4gPSBjcmVhdGVEaWZmaWVIZWxsbWFuXG4iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVk7XG52YXIgJGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIHdrc0RlZmluZSA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKTtcbnZhciBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICRHT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nICYmICEhJEdPUFMuZjtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgJEdPUFMuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gQ2hyb21lIDM4IGFuZCAzOSBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgZmFpbHMgb24gcHJpbWl0aXZlc1xuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0M1xudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSAkZmFpbHMoZnVuY3Rpb24gKCkgeyAkR09QUy5mKDEpOyB9KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBGQUlMU19PTl9QUklNSVRJVkVTLCAnT2JqZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICAgIHJldHVybiAkR09QUy5mKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICAkcmVwbGFjZXIgPSByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcblxuZnVuY3Rpb24gQ2lwaGVyKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICB0aGlzLnR5cGUgPSB0aGlzLm9wdGlvbnMudHlwZTtcbiAgdGhpcy5ibG9ja1NpemUgPSA4O1xuICB0aGlzLl9pbml0KCk7XG5cbiAgdGhpcy5idWZmZXIgPSBuZXcgQXJyYXkodGhpcy5ibG9ja1NpemUpO1xuICB0aGlzLmJ1ZmZlck9mZiA9IDA7XG59XG5tb2R1bGUuZXhwb3J0cyA9IENpcGhlcjtcblxuQ2lwaGVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIF9pbml0KCkge1xuICAvLyBNaWdodCBiZSBvdmVycmlkZWRcbn07XG5cbkNpcGhlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGRhdGEpIHtcbiAgaWYgKGRhdGEubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodGhpcy50eXBlID09PSAnZGVjcnlwdCcpXG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZURlY3J5cHQoZGF0YSk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5fdXBkYXRlRW5jcnlwdChkYXRhKTtcbn07XG5cbkNpcGhlci5wcm90b3R5cGUuX2J1ZmZlciA9IGZ1bmN0aW9uIF9idWZmZXIoZGF0YSwgb2ZmKSB7XG4gIC8vIEFwcGVuZCBkYXRhIHRvIGJ1ZmZlclxuICB2YXIgbWluID0gTWF0aC5taW4odGhpcy5idWZmZXIubGVuZ3RoIC0gdGhpcy5idWZmZXJPZmYsIGRhdGEubGVuZ3RoIC0gb2ZmKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaW47IGkrKylcbiAgICB0aGlzLmJ1ZmZlclt0aGlzLmJ1ZmZlck9mZiArIGldID0gZGF0YVtvZmYgKyBpXTtcbiAgdGhpcy5idWZmZXJPZmYgKz0gbWluO1xuXG4gIC8vIFNoaWZ0IG5leHRcbiAgcmV0dXJuIG1pbjtcbn07XG5cbkNpcGhlci5wcm90b3R5cGUuX2ZsdXNoQnVmZmVyID0gZnVuY3Rpb24gX2ZsdXNoQnVmZmVyKG91dCwgb2ZmKSB7XG4gIHRoaXMuX3VwZGF0ZSh0aGlzLmJ1ZmZlciwgMCwgb3V0LCBvZmYpO1xuICB0aGlzLmJ1ZmZlck9mZiA9IDA7XG4gIHJldHVybiB0aGlzLmJsb2NrU2l6ZTtcbn07XG5cbkNpcGhlci5wcm90b3R5cGUuX3VwZGF0ZUVuY3J5cHQgPSBmdW5jdGlvbiBfdXBkYXRlRW5jcnlwdChkYXRhKSB7XG4gIHZhciBpbnB1dE9mZiA9IDA7XG4gIHZhciBvdXRwdXRPZmYgPSAwO1xuXG4gIHZhciBjb3VudCA9ICgodGhpcy5idWZmZXJPZmYgKyBkYXRhLmxlbmd0aCkgLyB0aGlzLmJsb2NrU2l6ZSkgfCAwO1xuICB2YXIgb3V0ID0gbmV3IEFycmF5KGNvdW50ICogdGhpcy5ibG9ja1NpemUpO1xuXG4gIGlmICh0aGlzLmJ1ZmZlck9mZiAhPT0gMCkge1xuICAgIGlucHV0T2ZmICs9IHRoaXMuX2J1ZmZlcihkYXRhLCBpbnB1dE9mZik7XG5cbiAgICBpZiAodGhpcy5idWZmZXJPZmYgPT09IHRoaXMuYnVmZmVyLmxlbmd0aClcbiAgICAgIG91dHB1dE9mZiArPSB0aGlzLl9mbHVzaEJ1ZmZlcihvdXQsIG91dHB1dE9mZik7XG4gIH1cblxuICAvLyBXcml0ZSBibG9ja3NcbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoIC0gKChkYXRhLmxlbmd0aCAtIGlucHV0T2ZmKSAlIHRoaXMuYmxvY2tTaXplKTtcbiAgZm9yICg7IGlucHV0T2ZmIDwgbWF4OyBpbnB1dE9mZiArPSB0aGlzLmJsb2NrU2l6ZSkge1xuICAgIHRoaXMuX3VwZGF0ZShkYXRhLCBpbnB1dE9mZiwgb3V0LCBvdXRwdXRPZmYpO1xuICAgIG91dHB1dE9mZiArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgfVxuXG4gIC8vIFF1ZXVlIHJlc3RcbiAgZm9yICg7IGlucHV0T2ZmIDwgZGF0YS5sZW5ndGg7IGlucHV0T2ZmKyssIHRoaXMuYnVmZmVyT2ZmKyspXG4gICAgdGhpcy5idWZmZXJbdGhpcy5idWZmZXJPZmZdID0gZGF0YVtpbnB1dE9mZl07XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbkNpcGhlci5wcm90b3R5cGUuX3VwZGF0ZURlY3J5cHQgPSBmdW5jdGlvbiBfdXBkYXRlRGVjcnlwdChkYXRhKSB7XG4gIHZhciBpbnB1dE9mZiA9IDA7XG4gIHZhciBvdXRwdXRPZmYgPSAwO1xuXG4gIHZhciBjb3VudCA9IE1hdGguY2VpbCgodGhpcy5idWZmZXJPZmYgKyBkYXRhLmxlbmd0aCkgLyB0aGlzLmJsb2NrU2l6ZSkgLSAxO1xuICB2YXIgb3V0ID0gbmV3IEFycmF5KGNvdW50ICogdGhpcy5ibG9ja1NpemUpO1xuXG4gIC8vIFRPRE8oaW5kdXRueSk6IG9wdGltaXplIGl0LCB0aGlzIGlzIGZhciBmcm9tIG9wdGltYWxcbiAgZm9yICg7IGNvdW50ID4gMDsgY291bnQtLSkge1xuICAgIGlucHV0T2ZmICs9IHRoaXMuX2J1ZmZlcihkYXRhLCBpbnB1dE9mZik7XG4gICAgb3V0cHV0T2ZmICs9IHRoaXMuX2ZsdXNoQnVmZmVyKG91dCwgb3V0cHV0T2ZmKTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciByZXN0IG9mIHRoZSBpbnB1dFxuICBpbnB1dE9mZiArPSB0aGlzLl9idWZmZXIoZGF0YSwgaW5wdXRPZmYpO1xuXG4gIHJldHVybiBvdXQ7XG59O1xuXG5DaXBoZXIucHJvdG90eXBlLmZpbmFsID0gZnVuY3Rpb24gZmluYWwoYnVmZmVyKSB7XG4gIHZhciBmaXJzdDtcbiAgaWYgKGJ1ZmZlcilcbiAgICBmaXJzdCA9IHRoaXMudXBkYXRlKGJ1ZmZlcik7XG5cbiAgdmFyIGxhc3Q7XG4gIGlmICh0aGlzLnR5cGUgPT09ICdlbmNyeXB0JylcbiAgICBsYXN0ID0gdGhpcy5fZmluYWxFbmNyeXB0KCk7XG4gIGVsc2VcbiAgICBsYXN0ID0gdGhpcy5fZmluYWxEZWNyeXB0KCk7XG5cbiAgaWYgKGZpcnN0KVxuICAgIHJldHVybiBmaXJzdC5jb25jYXQobGFzdCk7XG4gIGVsc2VcbiAgICByZXR1cm4gbGFzdDtcbn07XG5cbkNpcGhlci5wcm90b3R5cGUuX3BhZCA9IGZ1bmN0aW9uIF9wYWQoYnVmZmVyLCBvZmYpIHtcbiAgaWYgKG9mZiA9PT0gMClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgd2hpbGUgKG9mZiA8IGJ1ZmZlci5sZW5ndGgpXG4gICAgYnVmZmVyW29mZisrXSA9IDA7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5DaXBoZXIucHJvdG90eXBlLl9maW5hbEVuY3J5cHQgPSBmdW5jdGlvbiBfZmluYWxFbmNyeXB0KCkge1xuICBpZiAoIXRoaXMuX3BhZCh0aGlzLmJ1ZmZlciwgdGhpcy5idWZmZXJPZmYpKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgb3V0ID0gbmV3IEFycmF5KHRoaXMuYmxvY2tTaXplKTtcbiAgdGhpcy5fdXBkYXRlKHRoaXMuYnVmZmVyLCAwLCBvdXQsIDApO1xuICByZXR1cm4gb3V0O1xufTtcblxuQ2lwaGVyLnByb3RvdHlwZS5fdW5wYWQgPSBmdW5jdGlvbiBfdW5wYWQoYnVmZmVyKSB7XG4gIHJldHVybiBidWZmZXI7XG59O1xuXG5DaXBoZXIucHJvdG90eXBlLl9maW5hbERlY3J5cHQgPSBmdW5jdGlvbiBfZmluYWxEZWNyeXB0KCkge1xuICBhc3NlcnQuZXF1YWwodGhpcy5idWZmZXJPZmYsIHRoaXMuYmxvY2tTaXplLCAnTm90IGVub3VnaCBkYXRhIHRvIGRlY3J5cHQnKTtcbiAgdmFyIG91dCA9IG5ldyBBcnJheSh0aGlzLmJsb2NrU2l6ZSk7XG4gIHRoaXMuX2ZsdXNoQnVmZmVyKG91dCwgMCk7XG5cbiAgcmV0dXJuIHRoaXMuX3VucGFkKG91dCk7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxudmFyIHByb3RvID0ge307XG5cbmZ1bmN0aW9uIENCQ1N0YXRlKGl2KSB7XG4gIGFzc2VydC5lcXVhbChpdi5sZW5ndGgsIDgsICdJbnZhbGlkIElWIGxlbmd0aCcpO1xuXG4gIHRoaXMuaXYgPSBuZXcgQXJyYXkoOCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdi5sZW5ndGg7IGkrKylcbiAgICB0aGlzLml2W2ldID0gaXZbaV07XG59XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlKEJhc2UpIHtcbiAgZnVuY3Rpb24gQ0JDKG9wdGlvbnMpIHtcbiAgICBCYXNlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY2JjSW5pdCgpO1xuICB9XG4gIGluaGVyaXRzKENCQywgQmFzZSk7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm90byk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIENCQy5wcm90b3R5cGVba2V5XSA9IHByb3RvW2tleV07XG4gIH1cblxuICBDQkMuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IENCQyhvcHRpb25zKTtcbiAgfTtcblxuICByZXR1cm4gQ0JDO1xufVxuXG5leHBvcnRzLmluc3RhbnRpYXRlID0gaW5zdGFudGlhdGU7XG5cbnByb3RvLl9jYmNJbml0ID0gZnVuY3Rpb24gX2NiY0luaXQoKSB7XG4gIHZhciBzdGF0ZSA9IG5ldyBDQkNTdGF0ZSh0aGlzLm9wdGlvbnMuaXYpO1xuICB0aGlzLl9jYmNTdGF0ZSA9IHN0YXRlO1xufTtcblxucHJvdG8uX3VwZGF0ZSA9IGZ1bmN0aW9uIF91cGRhdGUoaW5wLCBpbk9mZiwgb3V0LCBvdXRPZmYpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fY2JjU3RhdGU7XG4gIHZhciBzdXBlclByb3RvID0gdGhpcy5jb25zdHJ1Y3Rvci5zdXBlcl8ucHJvdG90eXBlO1xuXG4gIHZhciBpdiA9IHN0YXRlLml2O1xuICBpZiAodGhpcy50eXBlID09PSAnZW5jcnlwdCcpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tTaXplOyBpKyspXG4gICAgICBpdltpXSBePSBpbnBbaW5PZmYgKyBpXTtcblxuICAgIHN1cGVyUHJvdG8uX3VwZGF0ZS5jYWxsKHRoaXMsIGl2LCAwLCBvdXQsIG91dE9mZik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tTaXplOyBpKyspXG4gICAgICBpdltpXSA9IG91dFtvdXRPZmYgKyBpXTtcbiAgfSBlbHNlIHtcbiAgICBzdXBlclByb3RvLl91cGRhdGUuY2FsbCh0aGlzLCBpbnAsIGluT2ZmLCBvdXQsIG91dE9mZik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tTaXplOyBpKyspXG4gICAgICBvdXRbb3V0T2ZmICsgaV0gXj0gaXZbaV07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tTaXplOyBpKyspXG4gICAgICBpdltpXSA9IGlucFtpbk9mZiArIGldO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDcmVhdGVkIDIwMDgtMDgtMTkuXG4gKlxuICogRGlqa3N0cmEgcGF0aC1maW5kaW5nIGZ1bmN0aW9ucy4gQWRhcHRlZCBmcm9tIHRoZSBEaWprc3RhciBQeXRob24gcHJvamVjdC5cbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDhcbiAqICAgV3lhdHQgQmFsZHdpbiA8c2VsZkB3eWF0dGJhbGR3aW4uY29tPlxuICogICBBbGwgcmlnaHRzIHJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICpcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBkaWprc3RyYSA9IHtcbiAgc2luZ2xlX3NvdXJjZV9zaG9ydGVzdF9wYXRoczogZnVuY3Rpb24oZ3JhcGgsIHMsIGQpIHtcbiAgICAvLyBQcmVkZWNlc3NvciBtYXAgZm9yIGVhY2ggbm9kZSB0aGF0IGhhcyBiZWVuIGVuY291bnRlcmVkLlxuICAgIC8vIG5vZGUgSUQgPT4gcHJlZGVjZXNzb3Igbm9kZSBJRFxuICAgIHZhciBwcmVkZWNlc3NvcnMgPSB7fTtcblxuICAgIC8vIENvc3RzIG9mIHNob3J0ZXN0IHBhdGhzIGZyb20gcyB0byBhbGwgbm9kZXMgZW5jb3VudGVyZWQuXG4gICAgLy8gbm9kZSBJRCA9PiBjb3N0XG4gICAgdmFyIGNvc3RzID0ge307XG4gICAgY29zdHNbc10gPSAwO1xuXG4gICAgLy8gQ29zdHMgb2Ygc2hvcnRlc3QgcGF0aHMgZnJvbSBzIHRvIGFsbCBub2RlcyBlbmNvdW50ZXJlZDsgZGlmZmVycyBmcm9tXG4gICAgLy8gYGNvc3RzYCBpbiB0aGF0IGl0IHByb3ZpZGVzIGVhc3kgYWNjZXNzIHRvIHRoZSBub2RlIHRoYXQgY3VycmVudGx5IGhhc1xuICAgIC8vIHRoZSBrbm93biBzaG9ydGVzdCBwYXRoIGZyb20gcy5cbiAgICAvLyBYWFg6IERvIHdlIGFjdHVhbGx5IG5lZWQgYm90aCBgY29zdHNgIGFuZCBgb3BlbmA/XG4gICAgdmFyIG9wZW4gPSBkaWprc3RyYS5Qcmlvcml0eVF1ZXVlLm1ha2UoKTtcbiAgICBvcGVuLnB1c2gocywgMCk7XG5cbiAgICB2YXIgY2xvc2VzdCxcbiAgICAgICAgdSwgdixcbiAgICAgICAgY29zdF9vZl9zX3RvX3UsXG4gICAgICAgIGFkamFjZW50X25vZGVzLFxuICAgICAgICBjb3N0X29mX2UsXG4gICAgICAgIGNvc3Rfb2Zfc190b191X3BsdXNfY29zdF9vZl9lLFxuICAgICAgICBjb3N0X29mX3NfdG9fdixcbiAgICAgICAgZmlyc3RfdmlzaXQ7XG4gICAgd2hpbGUgKCFvcGVuLmVtcHR5KCkpIHtcbiAgICAgIC8vIEluIHRoZSBub2RlcyByZW1haW5pbmcgaW4gZ3JhcGggdGhhdCBoYXZlIGEga25vd24gY29zdCBmcm9tIHMsXG4gICAgICAvLyBmaW5kIHRoZSBub2RlLCB1LCB0aGF0IGN1cnJlbnRseSBoYXMgdGhlIHNob3J0ZXN0IHBhdGggZnJvbSBzLlxuICAgICAgY2xvc2VzdCA9IG9wZW4ucG9wKCk7XG4gICAgICB1ID0gY2xvc2VzdC52YWx1ZTtcbiAgICAgIGNvc3Rfb2Zfc190b191ID0gY2xvc2VzdC5jb3N0O1xuXG4gICAgICAvLyBHZXQgbm9kZXMgYWRqYWNlbnQgdG8gdS4uLlxuICAgICAgYWRqYWNlbnRfbm9kZXMgPSBncmFwaFt1XSB8fCB7fTtcblxuICAgICAgLy8gLi4uYW5kIGV4cGxvcmUgdGhlIGVkZ2VzIHRoYXQgY29ubmVjdCB1IHRvIHRob3NlIG5vZGVzLCB1cGRhdGluZ1xuICAgICAgLy8gdGhlIGNvc3Qgb2YgdGhlIHNob3J0ZXN0IHBhdGhzIHRvIGFueSBvciBhbGwgb2YgdGhvc2Ugbm9kZXMgYXNcbiAgICAgIC8vIG5lY2Vzc2FyeS4gdiBpcyB0aGUgbm9kZSBhY3Jvc3MgdGhlIGN1cnJlbnQgZWRnZSBmcm9tIHUuXG4gICAgICBmb3IgKHYgaW4gYWRqYWNlbnRfbm9kZXMpIHtcbiAgICAgICAgaWYgKGFkamFjZW50X25vZGVzLmhhc093blByb3BlcnR5KHYpKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSBjb3N0IG9mIHRoZSBlZGdlIHJ1bm5pbmcgZnJvbSB1IHRvIHYuXG4gICAgICAgICAgY29zdF9vZl9lID0gYWRqYWNlbnRfbm9kZXNbdl07XG5cbiAgICAgICAgICAvLyBDb3N0IG9mIHMgdG8gdSBwbHVzIHRoZSBjb3N0IG9mIHUgdG8gdiBhY3Jvc3MgZS0tdGhpcyBpcyAqYSpcbiAgICAgICAgICAvLyBjb3N0IGZyb20gcyB0byB2IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbGVzcyB0aGFuIHRoZSBjdXJyZW50XG4gICAgICAgICAgLy8ga25vd24gY29zdCB0byB2LlxuICAgICAgICAgIGNvc3Rfb2Zfc190b191X3BsdXNfY29zdF9vZl9lID0gY29zdF9vZl9zX3RvX3UgKyBjb3N0X29mX2U7XG5cbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IHZpc2l0ZWQgdiB5ZXQgT1IgaWYgdGhlIGN1cnJlbnQga25vd24gY29zdCBmcm9tIHMgdG9cbiAgICAgICAgICAvLyB2IGlzIGdyZWF0ZXIgdGhhbiB0aGUgbmV3IGNvc3Qgd2UganVzdCBmb3VuZCAoY29zdCBvZiBzIHRvIHUgcGx1c1xuICAgICAgICAgIC8vIGNvc3Qgb2YgdSB0byB2IGFjcm9zcyBlKSwgdXBkYXRlIHYncyBjb3N0IGluIHRoZSBjb3N0IGxpc3QgYW5kXG4gICAgICAgICAgLy8gdXBkYXRlIHYncyBwcmVkZWNlc3NvciBpbiB0aGUgcHJlZGVjZXNzb3IgbGlzdCAoaXQncyBub3cgdSkuXG4gICAgICAgICAgY29zdF9vZl9zX3RvX3YgPSBjb3N0c1t2XTtcbiAgICAgICAgICBmaXJzdF92aXNpdCA9ICh0eXBlb2YgY29zdHNbdl0gPT09ICd1bmRlZmluZWQnKTtcbiAgICAgICAgICBpZiAoZmlyc3RfdmlzaXQgfHwgY29zdF9vZl9zX3RvX3YgPiBjb3N0X29mX3NfdG9fdV9wbHVzX2Nvc3Rfb2ZfZSkge1xuICAgICAgICAgICAgY29zdHNbdl0gPSBjb3N0X29mX3NfdG9fdV9wbHVzX2Nvc3Rfb2ZfZTtcbiAgICAgICAgICAgIG9wZW4ucHVzaCh2LCBjb3N0X29mX3NfdG9fdV9wbHVzX2Nvc3Rfb2ZfZSk7XG4gICAgICAgICAgICBwcmVkZWNlc3NvcnNbdl0gPSB1O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvc3RzW2RdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIG1zZyA9IFsnQ291bGQgbm90IGZpbmQgYSBwYXRoIGZyb20gJywgcywgJyB0byAnLCBkLCAnLiddLmpvaW4oJycpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29ycztcbiAgfSxcblxuICBleHRyYWN0X3Nob3J0ZXN0X3BhdGhfZnJvbV9wcmVkZWNlc3Nvcl9saXN0OiBmdW5jdGlvbihwcmVkZWNlc3NvcnMsIGQpIHtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgdSA9IGQ7XG4gICAgdmFyIHByZWRlY2Vzc29yO1xuICAgIHdoaWxlICh1KSB7XG4gICAgICBub2Rlcy5wdXNoKHUpO1xuICAgICAgcHJlZGVjZXNzb3IgPSBwcmVkZWNlc3NvcnNbdV07XG4gICAgICB1ID0gcHJlZGVjZXNzb3JzW3VdO1xuICAgIH1cbiAgICBub2Rlcy5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9LFxuXG4gIGZpbmRfcGF0aDogZnVuY3Rpb24oZ3JhcGgsIHMsIGQpIHtcbiAgICB2YXIgcHJlZGVjZXNzb3JzID0gZGlqa3N0cmEuc2luZ2xlX3NvdXJjZV9zaG9ydGVzdF9wYXRocyhncmFwaCwgcywgZCk7XG4gICAgcmV0dXJuIGRpamtzdHJhLmV4dHJhY3Rfc2hvcnRlc3RfcGF0aF9mcm9tX3ByZWRlY2Vzc29yX2xpc3QoXG4gICAgICBwcmVkZWNlc3NvcnMsIGQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBIHZlcnkgbmFpdmUgcHJpb3JpdHkgcXVldWUgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBQcmlvcml0eVF1ZXVlOiB7XG4gICAgbWFrZTogZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgIHZhciBUID0gZGlqa3N0cmEuUHJpb3JpdHlRdWV1ZSxcbiAgICAgICAgICB0ID0ge30sXG4gICAgICAgICAga2V5O1xuICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICBmb3IgKGtleSBpbiBUKSB7XG4gICAgICAgIGlmIChULmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB0W2tleV0gPSBUW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHQucXVldWUgPSBbXTtcbiAgICAgIHQuc29ydGVyID0gb3B0cy5zb3J0ZXIgfHwgVC5kZWZhdWx0X3NvcnRlcjtcbiAgICAgIHJldHVybiB0O1xuICAgIH0sXG5cbiAgICBkZWZhdWx0X3NvcnRlcjogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmNvc3QgLSBiLmNvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBpdGVtIHRvIHRoZSBxdWV1ZSBhbmQgZW5zdXJlIHRoZSBoaWdoZXN0IHByaW9yaXR5IGVsZW1lbnRcbiAgICAgKiBpcyBhdCB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlLlxuICAgICAqL1xuICAgIHB1c2g6IGZ1bmN0aW9uICh2YWx1ZSwgY29zdCkge1xuICAgICAgdmFyIGl0ZW0gPSB7dmFsdWU6IHZhbHVlLCBjb3N0OiBjb3N0fTtcbiAgICAgIHRoaXMucXVldWUucHVzaChpdGVtKTtcbiAgICAgIHRoaXMucXVldWUuc29ydCh0aGlzLnNvcnRlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgaGlnaGVzdCBwcmlvcml0eSBlbGVtZW50IGluIHRoZSBxdWV1ZS5cbiAgICAgKi9cbiAgICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgfSxcblxuICAgIGVtcHR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGggPT09IDA7XG4gICAgfVxuICB9XG59O1xuXG5cbi8vIG5vZGUuanMgbW9kdWxlIGV4cG9ydHNcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGRpamtzdHJhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnV0aWxzID0gcmVxdWlyZSgnLi9kZXMvdXRpbHMnKTtcbmV4cG9ydHMuQ2lwaGVyID0gcmVxdWlyZSgnLi9kZXMvY2lwaGVyJyk7XG5leHBvcnRzLkRFUyA9IHJlcXVpcmUoJy4vZGVzL2RlcycpO1xuZXhwb3J0cy5DQkMgPSByZXF1aXJlKCcuL2Rlcy9jYmMnKTtcbmV4cG9ydHMuRURFID0gcmVxdWlyZSgnLi9kZXMvZWRlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG52YXIgTGVnYWN5ID0gcmVxdWlyZSgnLi9sZWdhY3knKVxudmFyIEJhc2UgPSByZXF1aXJlKCdjaXBoZXItYmFzZScpXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcbnZhciBtZDUgPSByZXF1aXJlKCdjcmVhdGUtaGFzaC9tZDUnKVxudmFyIFJJUEVNRDE2MCA9IHJlcXVpcmUoJ3JpcGVtZDE2MCcpXG5cbnZhciBzaGEgPSByZXF1aXJlKCdzaGEuanMnKVxuXG52YXIgWkVST1MgPSBCdWZmZXIuYWxsb2MoMTI4KVxuXG5mdW5jdGlvbiBIbWFjIChhbGcsIGtleSkge1xuICBCYXNlLmNhbGwodGhpcywgJ2RpZ2VzdCcpXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgIGtleSA9IEJ1ZmZlci5mcm9tKGtleSlcbiAgfVxuXG4gIHZhciBibG9ja3NpemUgPSAoYWxnID09PSAnc2hhNTEyJyB8fCBhbGcgPT09ICdzaGEzODQnKSA/IDEyOCA6IDY0XG5cbiAgdGhpcy5fYWxnID0gYWxnXG4gIHRoaXMuX2tleSA9IGtleVxuICBpZiAoa2V5Lmxlbmd0aCA+IGJsb2Nrc2l6ZSkge1xuICAgIHZhciBoYXNoID0gYWxnID09PSAncm1kMTYwJyA/IG5ldyBSSVBFTUQxNjAoKSA6IHNoYShhbGcpXG4gICAga2V5ID0gaGFzaC51cGRhdGUoa2V5KS5kaWdlc3QoKVxuICB9IGVsc2UgaWYgKGtleS5sZW5ndGggPCBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBCdWZmZXIuY29uY2F0KFtrZXksIFpFUk9TXSwgYmxvY2tzaXplKVxuICB9XG5cbiAgdmFyIGlwYWQgPSB0aGlzLl9pcGFkID0gQnVmZmVyLmFsbG9jVW5zYWZlKGJsb2Nrc2l6ZSlcbiAgdmFyIG9wYWQgPSB0aGlzLl9vcGFkID0gQnVmZmVyLmFsbG9jVW5zYWZlKGJsb2Nrc2l6ZSlcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2Nrc2l6ZTsgaSsrKSB7XG4gICAgaXBhZFtpXSA9IGtleVtpXSBeIDB4MzZcbiAgICBvcGFkW2ldID0ga2V5W2ldIF4gMHg1Q1xuICB9XG4gIHRoaXMuX2hhc2ggPSBhbGcgPT09ICdybWQxNjAnID8gbmV3IFJJUEVNRDE2MCgpIDogc2hhKGFsZylcbiAgdGhpcy5faGFzaC51cGRhdGUoaXBhZClcbn1cblxuaW5oZXJpdHMoSG1hYywgQmFzZSlcblxuSG1hYy5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuX2hhc2gudXBkYXRlKGRhdGEpXG59XG5cbkhtYWMucHJvdG90eXBlLl9maW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGggPSB0aGlzLl9oYXNoLmRpZ2VzdCgpXG4gIHZhciBoYXNoID0gdGhpcy5fYWxnID09PSAncm1kMTYwJyA/IG5ldyBSSVBFTUQxNjAoKSA6IHNoYSh0aGlzLl9hbGcpXG4gIHJldHVybiBoYXNoLnVwZGF0ZSh0aGlzLl9vcGFkKS51cGRhdGUoaCkuZGlnZXN0KClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVIbWFjIChhbGcsIGtleSkge1xuICBhbGcgPSBhbGcudG9Mb3dlckNhc2UoKVxuICBpZiAoYWxnID09PSAncm1kMTYwJyB8fCBhbGcgPT09ICdyaXBlbWQxNjAnKSB7XG4gICAgcmV0dXJuIG5ldyBIbWFjKCdybWQxNjAnLCBrZXkpXG4gIH1cbiAgaWYgKGFsZyA9PT0gJ21kNScpIHtcbiAgICByZXR1cm4gbmV3IExlZ2FjeShtZDUsIGtleSlcbiAgfVxuICByZXR1cm4gbmV3IEhtYWMoYWxnLCBrZXkpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtYXNzZXJ0Jyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgZGVzID0gcmVxdWlyZSgnLi4vZGVzJyk7XG52YXIgQ2lwaGVyID0gZGVzLkNpcGhlcjtcbnZhciBERVMgPSBkZXMuREVTO1xuXG5mdW5jdGlvbiBFREVTdGF0ZSh0eXBlLCBrZXkpIHtcbiAgYXNzZXJ0LmVxdWFsKGtleS5sZW5ndGgsIDI0LCAnSW52YWxpZCBrZXkgbGVuZ3RoJyk7XG5cbiAgdmFyIGsxID0ga2V5LnNsaWNlKDAsIDgpO1xuICB2YXIgazIgPSBrZXkuc2xpY2UoOCwgMTYpO1xuICB2YXIgazMgPSBrZXkuc2xpY2UoMTYsIDI0KTtcblxuICBpZiAodHlwZSA9PT0gJ2VuY3J5cHQnKSB7XG4gICAgdGhpcy5jaXBoZXJzID0gW1xuICAgICAgREVTLmNyZWF0ZSh7IHR5cGU6ICdlbmNyeXB0Jywga2V5OiBrMSB9KSxcbiAgICAgIERFUy5jcmVhdGUoeyB0eXBlOiAnZGVjcnlwdCcsIGtleTogazIgfSksXG4gICAgICBERVMuY3JlYXRlKHsgdHlwZTogJ2VuY3J5cHQnLCBrZXk6IGszIH0pXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNpcGhlcnMgPSBbXG4gICAgICBERVMuY3JlYXRlKHsgdHlwZTogJ2RlY3J5cHQnLCBrZXk6IGszIH0pLFxuICAgICAgREVTLmNyZWF0ZSh7IHR5cGU6ICdlbmNyeXB0Jywga2V5OiBrMiB9KSxcbiAgICAgIERFUy5jcmVhdGUoeyB0eXBlOiAnZGVjcnlwdCcsIGtleTogazEgfSlcbiAgICBdO1xuICB9XG59XG5cbmZ1bmN0aW9uIEVERShvcHRpb25zKSB7XG4gIENpcGhlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gIHZhciBzdGF0ZSA9IG5ldyBFREVTdGF0ZSh0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5rZXkpO1xuICB0aGlzLl9lZGVTdGF0ZSA9IHN0YXRlO1xufVxuaW5oZXJpdHMoRURFLCBDaXBoZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVERTtcblxuRURFLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRURFKG9wdGlvbnMpO1xufTtcblxuRURFLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gX3VwZGF0ZShpbnAsIGluT2ZmLCBvdXQsIG91dE9mZikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9lZGVTdGF0ZTtcblxuICBzdGF0ZS5jaXBoZXJzWzBdLl91cGRhdGUoaW5wLCBpbk9mZiwgb3V0LCBvdXRPZmYpO1xuICBzdGF0ZS5jaXBoZXJzWzFdLl91cGRhdGUob3V0LCBvdXRPZmYsIG91dCwgb3V0T2ZmKTtcbiAgc3RhdGUuY2lwaGVyc1syXS5fdXBkYXRlKG91dCwgb3V0T2ZmLCBvdXQsIG91dE9mZik7XG59O1xuXG5FREUucHJvdG90eXBlLl9wYWQgPSBERVMucHJvdG90eXBlLl9wYWQ7XG5FREUucHJvdG90eXBlLl91bnBhZCA9IERFUy5wcm90b3R5cGUuX3VucGFkO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMucmFuZG9tQnl0ZXMgPSBleHBvcnRzLnJuZyA9IGV4cG9ydHMucHNldWRvUmFuZG9tQnl0ZXMgPSBleHBvcnRzLnBybmcgPSByZXF1aXJlKCdyYW5kb21ieXRlcycpXG5leHBvcnRzLmNyZWF0ZUhhc2ggPSBleHBvcnRzLkhhc2ggPSByZXF1aXJlKCdjcmVhdGUtaGFzaCcpXG5leHBvcnRzLmNyZWF0ZUhtYWMgPSBleHBvcnRzLkhtYWMgPSByZXF1aXJlKCdjcmVhdGUtaG1hYycpXG5cbnZhciBhbGdvcyA9IHJlcXVpcmUoJ2Jyb3dzZXJpZnktc2lnbi9hbGdvcycpXG52YXIgYWxnb0tleXMgPSBPYmplY3Qua2V5cyhhbGdvcylcbnZhciBoYXNoZXMgPSBbJ3NoYTEnLCAnc2hhMjI0JywgJ3NoYTI1NicsICdzaGEzODQnLCAnc2hhNTEyJywgJ21kNScsICdybWQxNjAnXS5jb25jYXQoYWxnb0tleXMpXG5leHBvcnRzLmdldEhhc2hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGhhc2hlc1xufVxuXG52YXIgcCA9IHJlcXVpcmUoJ3Bia2RmMicpXG5leHBvcnRzLnBia2RmMiA9IHAucGJrZGYyXG5leHBvcnRzLnBia2RmMlN5bmMgPSBwLnBia2RmMlN5bmNcblxudmFyIGFlcyA9IHJlcXVpcmUoJ2Jyb3dzZXJpZnktY2lwaGVyJylcblxuZXhwb3J0cy5DaXBoZXIgPSBhZXMuQ2lwaGVyXG5leHBvcnRzLmNyZWF0ZUNpcGhlciA9IGFlcy5jcmVhdGVDaXBoZXJcbmV4cG9ydHMuQ2lwaGVyaXYgPSBhZXMuQ2lwaGVyaXZcbmV4cG9ydHMuY3JlYXRlQ2lwaGVyaXYgPSBhZXMuY3JlYXRlQ2lwaGVyaXZcbmV4cG9ydHMuRGVjaXBoZXIgPSBhZXMuRGVjaXBoZXJcbmV4cG9ydHMuY3JlYXRlRGVjaXBoZXIgPSBhZXMuY3JlYXRlRGVjaXBoZXJcbmV4cG9ydHMuRGVjaXBoZXJpdiA9IGFlcy5EZWNpcGhlcml2XG5leHBvcnRzLmNyZWF0ZURlY2lwaGVyaXYgPSBhZXMuY3JlYXRlRGVjaXBoZXJpdlxuZXhwb3J0cy5nZXRDaXBoZXJzID0gYWVzLmdldENpcGhlcnNcbmV4cG9ydHMubGlzdENpcGhlcnMgPSBhZXMubGlzdENpcGhlcnNcblxudmFyIGRoID0gcmVxdWlyZSgnZGlmZmllLWhlbGxtYW4nKVxuXG5leHBvcnRzLkRpZmZpZUhlbGxtYW5Hcm91cCA9IGRoLkRpZmZpZUhlbGxtYW5Hcm91cFxuZXhwb3J0cy5jcmVhdGVEaWZmaWVIZWxsbWFuR3JvdXAgPSBkaC5jcmVhdGVEaWZmaWVIZWxsbWFuR3JvdXBcbmV4cG9ydHMuZ2V0RGlmZmllSGVsbG1hbiA9IGRoLmdldERpZmZpZUhlbGxtYW5cbmV4cG9ydHMuY3JlYXRlRGlmZmllSGVsbG1hbiA9IGRoLmNyZWF0ZURpZmZpZUhlbGxtYW5cbmV4cG9ydHMuRGlmZmllSGVsbG1hbiA9IGRoLkRpZmZpZUhlbGxtYW5cblxudmFyIHNpZ24gPSByZXF1aXJlKCdicm93c2VyaWZ5LXNpZ24nKVxuXG5leHBvcnRzLmNyZWF0ZVNpZ24gPSBzaWduLmNyZWF0ZVNpZ25cbmV4cG9ydHMuU2lnbiA9IHNpZ24uU2lnblxuZXhwb3J0cy5jcmVhdGVWZXJpZnkgPSBzaWduLmNyZWF0ZVZlcmlmeVxuZXhwb3J0cy5WZXJpZnkgPSBzaWduLlZlcmlmeVxuXG5leHBvcnRzLmNyZWF0ZUVDREggPSByZXF1aXJlKCdjcmVhdGUtZWNkaCcpXG5cbnZhciBwdWJsaWNFbmNyeXB0ID0gcmVxdWlyZSgncHVibGljLWVuY3J5cHQnKVxuXG5leHBvcnRzLnB1YmxpY0VuY3J5cHQgPSBwdWJsaWNFbmNyeXB0LnB1YmxpY0VuY3J5cHRcbmV4cG9ydHMucHJpdmF0ZUVuY3J5cHQgPSBwdWJsaWNFbmNyeXB0LnByaXZhdGVFbmNyeXB0XG5leHBvcnRzLnB1YmxpY0RlY3J5cHQgPSBwdWJsaWNFbmNyeXB0LnB1YmxpY0RlY3J5cHRcbmV4cG9ydHMucHJpdmF0ZURlY3J5cHQgPSBwdWJsaWNFbmNyeXB0LnByaXZhdGVEZWNyeXB0XG5cbi8vIHRoZSBsZWFzdCBJIGNhbiBkbyBpcyBtYWtlIGVycm9yIG1lc3NhZ2VzIGZvciB0aGUgcmVzdCBvZiB0aGUgbm9kZS5qcy9jcnlwdG8gYXBpLlxuLy8gO1tcbi8vICAgJ2NyZWF0ZUNyZWRlbnRpYWxzJ1xuLy8gXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4vLyAgIGV4cG9ydHNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgdGhyb3cgbmV3IEVycm9yKFtcbi8vICAgICAgICdzb3JyeSwgJyArIG5hbWUgKyAnIGlzIG5vdCBpbXBsZW1lbnRlZCB5ZXQnLFxuLy8gICAgICAgJ3dlIGFjY2VwdCBwdWxsIHJlcXVlc3RzJyxcbi8vICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vY3J5cHRvLWJyb3dzZXJpZnkvY3J5cHRvLWJyb3dzZXJpZnknXG4vLyAgICAgXS5qb2luKCdcXG4nKSlcbi8vICAgfVxuLy8gfSlcblxudmFyIHJmID0gcmVxdWlyZSgncmFuZG9tZmlsbCcpXG5cbmV4cG9ydHMucmFuZG9tRmlsbCA9IHJmLnJhbmRvbUZpbGxcbmV4cG9ydHMucmFuZG9tRmlsbFN5bmMgPSByZi5yYW5kb21GaWxsU3luY1xuXG5leHBvcnRzLmNyZWF0ZUNyZWRlbnRpYWxzID0gZnVuY3Rpb24gKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICdzb3JyeSwgY3JlYXRlQ3JlZGVudGlhbHMgaXMgbm90IGltcGxlbWVudGVkIHlldCcsXG4gICAgJ3dlIGFjY2VwdCBwdWxsIHJlcXVlc3RzJyxcbiAgICAnaHR0cHM6Ly9naXRodWIuY29tL2NyeXB0by1icm93c2VyaWZ5L2NyeXB0by1icm93c2VyaWZ5J1xuICBdLmpvaW4oJ1xcbicpKVxufVxuXG5leHBvcnRzLmNvbnN0YW50cyA9IHtcbiAgJ0RIX0NIRUNLX1BfTk9UX1NBRkVfUFJJTUUnOiAyLFxuICAnREhfQ0hFQ0tfUF9OT1RfUFJJTUUnOiAxLFxuICAnREhfVU5BQkxFX1RPX0NIRUNLX0dFTkVSQVRPUic6IDQsXG4gICdESF9OT1RfU1VJVEFCTEVfR0VORVJBVE9SJzogOCxcbiAgJ05QTl9FTkFCTEVEJzogMSxcbiAgJ0FMUE5fRU5BQkxFRCc6IDEsXG4gICdSU0FfUEtDUzFfUEFERElORyc6IDEsXG4gICdSU0FfU1NMVjIzX1BBRERJTkcnOiAyLFxuICAnUlNBX05PX1BBRERJTkcnOiAzLFxuICAnUlNBX1BLQ1MxX09BRVBfUEFERElORyc6IDQsXG4gICdSU0FfWDkzMV9QQURESU5HJzogNSxcbiAgJ1JTQV9QS0NTMV9QU1NfUEFERElORyc6IDYsXG4gICdQT0lOVF9DT05WRVJTSU9OX0NPTVBSRVNTRUQnOiAyLFxuICAnUE9JTlRfQ09OVkVSU0lPTl9VTkNPTVBSRVNTRUQnOiA0LFxuICAnUE9JTlRfQ09OVkVSU0lPTl9IWUJSSUQnOiA2XG59XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwidmFyIGNsb25lID0gKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW5zdGFuY2VvZihvYmosIHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgIT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiB0eXBlO1xufVxuXG52YXIgbmF0aXZlTWFwO1xudHJ5IHtcbiAgbmF0aXZlTWFwID0gTWFwO1xufSBjYXRjaChfKSB7XG4gIC8vIG1heWJlIGEgcmVmZXJlbmNlIGVycm9yIGJlY2F1c2Ugbm8gYE1hcGAuIEdpdmUgaXQgYSBkdW1teSB2YWx1ZSB0aGF0IG5vXG4gIC8vIHZhbHVlIHdpbGwgZXZlciBiZSBhbiBpbnN0YW5jZW9mLlxuICBuYXRpdmVNYXAgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlU2V0O1xudHJ5IHtcbiAgbmF0aXZlU2V0ID0gU2V0O1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVNldCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVQcm9taXNlO1xudHJ5IHtcbiAgbmF0aXZlUHJvbWlzZSA9IFByb21pc2U7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlUHJvbWlzZSA9IGZ1bmN0aW9uKCkge307XG59XG5cbi8qKlxuICogQ2xvbmVzIChjb3BpZXMpIGFuIE9iamVjdCB1c2luZyBkZWVwIGNvcHlpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyBjaXJjdWxhciByZWZlcmVuY2VzIGJ5IGRlZmF1bHQsIGJ1dCBpZiB5b3UgYXJlIGNlcnRhaW5cbiAqIHRoZXJlIGFyZSBubyBjaXJjdWxhciByZWZlcmVuY2VzIGluIHlvdXIgb2JqZWN0LCB5b3UgY2FuIHNhdmUgc29tZSBDUFUgdGltZVxuICogYnkgY2FsbGluZyBjbG9uZShvYmosIGZhbHNlKS5cbiAqXG4gKiBDYXV0aW9uOiBpZiBgY2lyY3VsYXJgIGlzIGZhbHNlIGFuZCBgcGFyZW50YCBjb250YWlucyBjaXJjdWxhciByZWZlcmVuY2VzLFxuICogeW91ciBwcm9ncmFtIG1heSBlbnRlciBhbiBpbmZpbml0ZSBsb29wIGFuZCBjcmFzaC5cbiAqXG4gKiBAcGFyYW0gYHBhcmVudGAgLSB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZFxuICogQHBhcmFtIGBjaXJjdWxhcmAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZCBtYXkgY29udGFpblxuICogICAgY2lyY3VsYXIgcmVmZXJlbmNlcy4gKG9wdGlvbmFsIC0gdHJ1ZSBieSBkZWZhdWx0KVxuICogQHBhcmFtIGBkZXB0aGAgLSBzZXQgdG8gYSBudW1iZXIgaWYgdGhlIG9iamVjdCBpcyBvbmx5IHRvIGJlIGNsb25lZCB0b1xuICogICAgYSBwYXJ0aWN1bGFyIGRlcHRoLiAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBJbmZpbml0eSlcbiAqIEBwYXJhbSBgcHJvdG90eXBlYCAtIHNldHMgdGhlIHByb3RvdHlwZSB0byBiZSB1c2VkIHdoZW4gY2xvbmluZyBhbiBvYmplY3QuXG4gKiAgICAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBwYXJlbnQgcHJvdG90eXBlKS5cbiAqIEBwYXJhbSBgaW5jbHVkZU5vbkVudW1lcmFibGVgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAqICAgIHNob3VsZCBiZSBjbG9uZWQgYXMgd2VsbC4gTm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBvbiB0aGUgcHJvdG90eXBlXG4gKiAgICBjaGFpbiB3aWxsIGJlIGlnbm9yZWQuIChvcHRpb25hbCAtIGZhbHNlIGJ5IGRlZmF1bHQpXG4qL1xuZnVuY3Rpb24gY2xvbmUocGFyZW50LCBjaXJjdWxhciwgZGVwdGgsIHByb3RvdHlwZSwgaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PT0gJ29iamVjdCcpIHtcbiAgICBkZXB0aCA9IGNpcmN1bGFyLmRlcHRoO1xuICAgIHByb3RvdHlwZSA9IGNpcmN1bGFyLnByb3RvdHlwZTtcbiAgICBpbmNsdWRlTm9uRW51bWVyYWJsZSA9IGNpcmN1bGFyLmluY2x1ZGVOb25FbnVtZXJhYmxlO1xuICAgIGNpcmN1bGFyID0gY2lyY3VsYXIuY2lyY3VsYXI7XG4gIH1cbiAgLy8gbWFpbnRhaW4gdHdvIGFycmF5cyBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcywgd2hlcmUgY29ycmVzcG9uZGluZyBwYXJlbnRzXG4gIC8vIGFuZCBjaGlsZHJlbiBoYXZlIHRoZSBzYW1lIGluZGV4XG4gIHZhciBhbGxQYXJlbnRzID0gW107XG4gIHZhciBhbGxDaGlsZHJlbiA9IFtdO1xuXG4gIHZhciB1c2VCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9ICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT0gJ3VuZGVmaW5lZCcpXG4gICAgY2lyY3VsYXIgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZGVwdGggPT0gJ3VuZGVmaW5lZCcpXG4gICAgZGVwdGggPSBJbmZpbml0eTtcblxuICAvLyByZWN1cnNlIHRoaXMgZnVuY3Rpb24gc28gd2UgZG9uJ3QgcmVzZXQgYWxsUGFyZW50cyBhbmQgYWxsQ2hpbGRyZW5cbiAgZnVuY3Rpb24gX2Nsb25lKHBhcmVudCwgZGVwdGgpIHtcbiAgICAvLyBjbG9uaW5nIG51bGwgYWx3YXlzIHJldHVybnMgbnVsbFxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGlmIChkZXB0aCA9PT0gMClcbiAgICAgIHJldHVybiBwYXJlbnQ7XG5cbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHByb3RvO1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZU1hcCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVTZXQoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlUHJvbWlzZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwYXJlbnQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJlc29sdmUoX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KF9jbG9uZShlcnIsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gW107XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzUmVnRXhwKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFJlZ0V4cChwYXJlbnQuc291cmNlLCBfX2dldFJlZ0V4cEZsYWdzKHBhcmVudCkpO1xuICAgICAgaWYgKHBhcmVudC5sYXN0SW5kZXgpIGNoaWxkLmxhc3RJbmRleCA9IHBhcmVudC5sYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzRGF0ZShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEYXRlKHBhcmVudC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodXNlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihwYXJlbnQpKSB7XG4gICAgICBpZiAoQnVmZmVyLmFsbG9jVW5zYWZlKSB7XG4gICAgICAgIC8vIE5vZGUuanMgPj0gNC41LjBcbiAgICAgICAgY2hpbGQgPSBCdWZmZXIuYWxsb2NVbnNhZmUocGFyZW50Lmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPbGRlciBOb2RlLmpzIHZlcnNpb25zXG4gICAgICAgIGNoaWxkID0gbmV3IEJ1ZmZlcihwYXJlbnQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudC5jb3B5KGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgRXJyb3IpKSB7XG4gICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwcm90b3R5cGUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50KTtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcbiAgICAgICAgcHJvdG8gPSBwcm90b3R5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNpcmN1bGFyKSB7XG4gICAgICB2YXIgaW5kZXggPSBhbGxQYXJlbnRzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiBhbGxDaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgICBhbGxQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIGFsbENoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGtleUNoaWxkID0gX2Nsb25lKGtleSwgZGVwdGggLSAxKTtcbiAgICAgICAgdmFyIHZhbHVlQ2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLnNldChrZXlDaGlsZCwgdmFsdWVDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGVudHJ5Q2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLmFkZChlbnRyeUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gcGFyZW50KSB7XG4gICAgICB2YXIgYXR0cnM7XG4gICAgICBpZiAocHJvdG8pIHtcbiAgICAgICAgYXR0cnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLnNldCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2hpbGRbaV0gPSBfY2xvbmUocGFyZW50W2ldLCBkZXB0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBEb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IGNsb25pbmcgYSBzeW1ib2wgYmVjYXVzZSBpdCBpcyBhIHByaW1pdGl2ZSxcbiAgICAgICAgLy8gbGlrZSBhIG51bWJlciBvciBzdHJpbmcuXG4gICAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBzeW1ib2wpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmICFpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3N5bWJvbF0gPSBfY2xvbmUocGFyZW50W3N5bWJvbF0sIGRlcHRoIC0gMSk7XG4gICAgICAgIGlmICghZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBzeW1ib2wsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgIHZhciBhbGxQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsUHJvcGVydHlOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gYWxsUHJvcGVydHlOYW1lc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbcHJvcGVydHlOYW1lXSA9IF9jbG9uZShwYXJlbnRbcHJvcGVydHlOYW1lXSwgZGVwdGggLSAxKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gX2Nsb25lKHBhcmVudCwgZGVwdGgpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBmbGF0IGNsb25lIHVzaW5nIHByb3RvdHlwZSwgYWNjZXB0cyBvbmx5IG9iamVjdHMsIHVzZWZ1bGwgZm9yIHByb3BlcnR5XG4gKiBvdmVycmlkZSBvbiBGTEFUIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChubyBuZXN0ZWQgcHJvcHMpLlxuICpcbiAqIFVTRSBXSVRIIENBVVRJT04hIFRoaXMgbWF5IG5vdCBiZWhhdmUgYXMgeW91IHdpc2ggaWYgeW91IGRvIG5vdCBrbm93IGhvdyB0aGlzXG4gKiB3b3Jrcy5cbiAqL1xuY2xvbmUuY2xvbmVQcm90b3R5cGUgPSBmdW5jdGlvbiBjbG9uZVByb3RvdHlwZShwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgYyA9IGZ1bmN0aW9uICgpIHt9O1xuICBjLnByb3RvdHlwZSA9IHBhcmVudDtcbiAgcmV0dXJuIG5ldyBjKCk7XG59O1xuXG4vLyBwcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIF9fb2JqVG9TdHIobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuY2xvbmUuX19vYmpUb1N0ciA9IF9fb2JqVG9TdHI7XG5cbmZ1bmN0aW9uIF9faXNEYXRlKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5jbG9uZS5fX2lzRGF0ZSA9IF9faXNEYXRlO1xuXG5mdW5jdGlvbiBfX2lzQXJyYXkobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5jbG9uZS5fX2lzQXJyYXkgPSBfX2lzQXJyYXk7XG5cbmZ1bmN0aW9uIF9faXNSZWdFeHAobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuY2xvbmUuX19pc1JlZ0V4cCA9IF9faXNSZWdFeHA7XG5cbmZ1bmN0aW9uIF9fZ2V0UmVnRXhwRmxhZ3MocmUpIHtcbiAgdmFyIGZsYWdzID0gJyc7XG4gIGlmIChyZS5nbG9iYWwpIGZsYWdzICs9ICdnJztcbiAgaWYgKHJlLmlnbm9yZUNhc2UpIGZsYWdzICs9ICdpJztcbiAgaWYgKHJlLm11bHRpbGluZSkgZmxhZ3MgKz0gJ20nO1xuICByZXR1cm4gZmxhZ3M7XG59XG5jbG9uZS5fX2dldFJlZ0V4cEZsYWdzID0gX19nZXRSZWdFeHBGbGFncztcblxucmV0dXJuIGNsb25lO1xufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufSIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJ2YXIgQmlnSW50ZWdlciA9IHJlcXVpcmUoJ2JpZ2knKVxuXG52YXIgY3VydmVzID0gcmVxdWlyZSgnLi9jdXJ2ZXMuanNvbicpXG52YXIgQ3VydmUgPSByZXF1aXJlKCcuL2N1cnZlJylcblxuZnVuY3Rpb24gZ2V0Q3VydmVCeU5hbWUgKG5hbWUpIHtcbiAgdmFyIGN1cnZlID0gY3VydmVzW25hbWVdXG4gIGlmICghY3VydmUpIHJldHVybiBudWxsXG5cbiAgdmFyIHAgPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5wLCAxNilcbiAgdmFyIGEgPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5hLCAxNilcbiAgdmFyIGIgPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5iLCAxNilcbiAgdmFyIG4gPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5uLCAxNilcbiAgdmFyIGggPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5oLCAxNilcbiAgdmFyIEd4ID0gbmV3IEJpZ0ludGVnZXIoY3VydmUuR3gsIDE2KVxuICB2YXIgR3kgPSBuZXcgQmlnSW50ZWdlcihjdXJ2ZS5HeSwgMTYpXG5cbiAgcmV0dXJuIG5ldyBDdXJ2ZShwLCBhLCBiLCBHeCwgR3ksIG4sIGgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q3VydmVCeU5hbWVcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJnKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IEJ1ZmZlci5pc0J1ZmZlcjtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuIiwidmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcbnZhciBCaWdJbnRlZ2VyID0gcmVxdWlyZSgnYmlnaScpXG5cbnZhciBUSFJFRSA9IEJpZ0ludGVnZXIudmFsdWVPZigzKVxuXG5mdW5jdGlvbiBQb2ludCAoY3VydmUsIHgsIHksIHopIHtcbiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKHosIHVuZGVmaW5lZCwgJ01pc3NpbmcgWiBjb29yZGluYXRlJylcblxuICB0aGlzLmN1cnZlID0gY3VydmVcbiAgdGhpcy54ID0geFxuICB0aGlzLnkgPSB5XG4gIHRoaXMueiA9IHpcbiAgdGhpcy5fekludiA9IG51bGxcblxuICB0aGlzLmNvbXByZXNzZWQgPSB0cnVlXG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQb2ludC5wcm90b3R5cGUsICd6SW52Jywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fekludiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fekludiA9IHRoaXMuei5tb2RJbnZlcnNlKHRoaXMuY3VydmUucClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fekludlxuICB9XG59KVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUG9pbnQucHJvdG90eXBlLCAnYWZmaW5lWCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueC5tdWx0aXBseSh0aGlzLnpJbnYpLm1vZCh0aGlzLmN1cnZlLnApXG4gIH1cbn0pXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQb2ludC5wcm90b3R5cGUsICdhZmZpbmVZJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy55Lm11bHRpcGx5KHRoaXMuekludikubW9kKHRoaXMuY3VydmUucClcbiAgfVxufSlcblxuUG9pbnQuZnJvbUFmZmluZSA9IGZ1bmN0aW9uIChjdXJ2ZSwgeCwgeSkge1xuICByZXR1cm4gbmV3IFBvaW50KGN1cnZlLCB4LCB5LCBCaWdJbnRlZ2VyLk9ORSlcbn1cblxuUG9pbnQucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAob3RoZXIgPT09IHRoaXMpIHJldHVybiB0cnVlXG4gIGlmICh0aGlzLmN1cnZlLmlzSW5maW5pdHkodGhpcykpIHJldHVybiB0aGlzLmN1cnZlLmlzSW5maW5pdHkob3RoZXIpXG4gIGlmICh0aGlzLmN1cnZlLmlzSW5maW5pdHkob3RoZXIpKSByZXR1cm4gdGhpcy5jdXJ2ZS5pc0luZmluaXR5KHRoaXMpXG5cbiAgLy8gdSA9IFkyICogWjEgLSBZMSAqIFoyXG4gIHZhciB1ID0gb3RoZXIueS5tdWx0aXBseSh0aGlzLnopLnN1YnRyYWN0KHRoaXMueS5tdWx0aXBseShvdGhlci56KSkubW9kKHRoaXMuY3VydmUucClcblxuICBpZiAodS5zaWdudW0oKSAhPT0gMCkgcmV0dXJuIGZhbHNlXG5cbiAgLy8gdiA9IFgyICogWjEgLSBYMSAqIFoyXG4gIHZhciB2ID0gb3RoZXIueC5tdWx0aXBseSh0aGlzLnopLnN1YnRyYWN0KHRoaXMueC5tdWx0aXBseShvdGhlci56KSkubW9kKHRoaXMuY3VydmUucClcblxuICByZXR1cm4gdi5zaWdudW0oKSA9PT0gMFxufVxuXG5Qb2ludC5wcm90b3R5cGUubmVnYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgeSA9IHRoaXMuY3VydmUucC5zdWJ0cmFjdCh0aGlzLnkpXG5cbiAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmN1cnZlLCB0aGlzLngsIHksIHRoaXMueilcbn1cblxuUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChiKSB7XG4gIGlmICh0aGlzLmN1cnZlLmlzSW5maW5pdHkodGhpcykpIHJldHVybiBiXG4gIGlmICh0aGlzLmN1cnZlLmlzSW5maW5pdHkoYikpIHJldHVybiB0aGlzXG5cbiAgdmFyIHgxID0gdGhpcy54XG4gIHZhciB5MSA9IHRoaXMueVxuICB2YXIgeDIgPSBiLnhcbiAgdmFyIHkyID0gYi55XG5cbiAgLy8gdSA9IFkyICogWjEgLSBZMSAqIFoyXG4gIHZhciB1ID0geTIubXVsdGlwbHkodGhpcy56KS5zdWJ0cmFjdCh5MS5tdWx0aXBseShiLnopKS5tb2QodGhpcy5jdXJ2ZS5wKVxuICAvLyB2ID0gWDIgKiBaMSAtIFgxICogWjJcbiAgdmFyIHYgPSB4Mi5tdWx0aXBseSh0aGlzLnopLnN1YnRyYWN0KHgxLm11bHRpcGx5KGIueikpLm1vZCh0aGlzLmN1cnZlLnApXG5cbiAgaWYgKHYuc2lnbnVtKCkgPT09IDApIHtcbiAgICBpZiAodS5zaWdudW0oKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudHdpY2UoKSAvLyB0aGlzID09IGIsIHNvIGRvdWJsZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmN1cnZlLmluZmluaXR5IC8vIHRoaXMgPSAtYiwgc28gaW5maW5pdHlcbiAgfVxuXG4gIHZhciB2MiA9IHYuc3F1YXJlKClcbiAgdmFyIHYzID0gdjIubXVsdGlwbHkodilcbiAgdmFyIHgxdjIgPSB4MS5tdWx0aXBseSh2MilcbiAgdmFyIHp1MiA9IHUuc3F1YXJlKCkubXVsdGlwbHkodGhpcy56KVxuXG4gIC8vIHgzID0gdiAqICh6MiAqICh6MSAqIHVeMiAtIDIgKiB4MSAqIHZeMikgLSB2XjMpXG4gIHZhciB4MyA9IHp1Mi5zdWJ0cmFjdCh4MXYyLnNoaWZ0TGVmdCgxKSkubXVsdGlwbHkoYi56KS5zdWJ0cmFjdCh2MykubXVsdGlwbHkodikubW9kKHRoaXMuY3VydmUucClcbiAgLy8geTMgPSB6MiAqICgzICogeDEgKiB1ICogdl4yIC0geTEgKiB2XjMgLSB6MSAqIHVeMykgKyB1ICogdl4zXG4gIHZhciB5MyA9IHgxdjIubXVsdGlwbHkoVEhSRUUpLm11bHRpcGx5KHUpLnN1YnRyYWN0KHkxLm11bHRpcGx5KHYzKSkuc3VidHJhY3QoenUyLm11bHRpcGx5KHUpKS5tdWx0aXBseShiLnopLmFkZCh1Lm11bHRpcGx5KHYzKSkubW9kKHRoaXMuY3VydmUucClcbiAgLy8gejMgPSB2XjMgKiB6MSAqIHoyXG4gIHZhciB6MyA9IHYzLm11bHRpcGx5KHRoaXMueikubXVsdGlwbHkoYi56KS5tb2QodGhpcy5jdXJ2ZS5wKVxuXG4gIHJldHVybiBuZXcgUG9pbnQodGhpcy5jdXJ2ZSwgeDMsIHkzLCB6Mylcbn1cblxuUG9pbnQucHJvdG90eXBlLnR3aWNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jdXJ2ZS5pc0luZmluaXR5KHRoaXMpKSByZXR1cm4gdGhpc1xuICBpZiAodGhpcy55LnNpZ251bSgpID09PSAwKSByZXR1cm4gdGhpcy5jdXJ2ZS5pbmZpbml0eVxuXG4gIHZhciB4MSA9IHRoaXMueFxuICB2YXIgeTEgPSB0aGlzLnlcblxuICB2YXIgeTF6MSA9IHkxLm11bHRpcGx5KHRoaXMueikubW9kKHRoaXMuY3VydmUucClcbiAgdmFyIHkxc3F6MSA9IHkxejEubXVsdGlwbHkoeTEpLm1vZCh0aGlzLmN1cnZlLnApXG4gIHZhciBhID0gdGhpcy5jdXJ2ZS5hXG5cbiAgLy8gdyA9IDMgKiB4MV4yICsgYSAqIHoxXjJcbiAgdmFyIHcgPSB4MS5zcXVhcmUoKS5tdWx0aXBseShUSFJFRSlcblxuICBpZiAoYS5zaWdudW0oKSAhPT0gMCkge1xuICAgIHcgPSB3LmFkZCh0aGlzLnouc3F1YXJlKCkubXVsdGlwbHkoYSkpXG4gIH1cblxuICB3ID0gdy5tb2QodGhpcy5jdXJ2ZS5wKVxuICAvLyB4MyA9IDIgKiB5MSAqIHoxICogKHdeMiAtIDggKiB4MSAqIHkxXjIgKiB6MSlcbiAgdmFyIHgzID0gdy5zcXVhcmUoKS5zdWJ0cmFjdCh4MS5zaGlmdExlZnQoMykubXVsdGlwbHkoeTFzcXoxKSkuc2hpZnRMZWZ0KDEpLm11bHRpcGx5KHkxejEpLm1vZCh0aGlzLmN1cnZlLnApXG4gIC8vIHkzID0gNCAqIHkxXjIgKiB6MSAqICgzICogdyAqIHgxIC0gMiAqIHkxXjIgKiB6MSkgLSB3XjNcbiAgdmFyIHkzID0gdy5tdWx0aXBseShUSFJFRSkubXVsdGlwbHkoeDEpLnN1YnRyYWN0KHkxc3F6MS5zaGlmdExlZnQoMSkpLnNoaWZ0TGVmdCgyKS5tdWx0aXBseSh5MXNxejEpLnN1YnRyYWN0KHcucG93KDMpKS5tb2QodGhpcy5jdXJ2ZS5wKVxuICAvLyB6MyA9IDggKiAoeTEgKiB6MSleM1xuICB2YXIgejMgPSB5MXoxLnBvdygzKS5zaGlmdExlZnQoMykubW9kKHRoaXMuY3VydmUucClcblxuICByZXR1cm4gbmV3IFBvaW50KHRoaXMuY3VydmUsIHgzLCB5MywgejMpXG59XG5cbi8vIFNpbXBsZSBOQUYgKE5vbi1BZGphY2VudCBGb3JtKSBtdWx0aXBsaWNhdGlvbiBhbGdvcml0aG1cbi8vIFRPRE86IG1vZHVsYXJpemUgdGhlIG11bHRpcGxpY2F0aW9uIGFsZ29yaXRobVxuUG9pbnQucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKGspIHtcbiAgaWYgKHRoaXMuY3VydmUuaXNJbmZpbml0eSh0aGlzKSkgcmV0dXJuIHRoaXNcbiAgaWYgKGsuc2lnbnVtKCkgPT09IDApIHJldHVybiB0aGlzLmN1cnZlLmluZmluaXR5XG5cbiAgdmFyIGUgPSBrXG4gIHZhciBoID0gZS5tdWx0aXBseShUSFJFRSlcblxuICB2YXIgbmVnID0gdGhpcy5uZWdhdGUoKVxuICB2YXIgUiA9IHRoaXNcblxuICBmb3IgKHZhciBpID0gaC5iaXRMZW5ndGgoKSAtIDI7IGkgPiAwOyAtLWkpIHtcbiAgICB2YXIgaEJpdCA9IGgudGVzdEJpdChpKVxuICAgIHZhciBlQml0ID0gZS50ZXN0Qml0KGkpXG5cbiAgICBSID0gUi50d2ljZSgpXG5cbiAgICBpZiAoaEJpdCAhPT0gZUJpdCkge1xuICAgICAgUiA9IFIuYWRkKGhCaXQgPyB0aGlzIDogbmVnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBSXG59XG5cbi8vIENvbXB1dGUgdGhpcypqICsgeCprIChzaW11bHRhbmVvdXMgbXVsdGlwbGljYXRpb24pXG5Qb2ludC5wcm90b3R5cGUubXVsdGlwbHlUd28gPSBmdW5jdGlvbiAoaiwgeCwgaykge1xuICB2YXIgaSA9IE1hdGgubWF4KGouYml0TGVuZ3RoKCksIGsuYml0TGVuZ3RoKCkpIC0gMVxuICB2YXIgUiA9IHRoaXMuY3VydmUuaW5maW5pdHlcbiAgdmFyIGJvdGggPSB0aGlzLmFkZCh4KVxuXG4gIHdoaWxlIChpID49IDApIHtcbiAgICB2YXIgakJpdCA9IGoudGVzdEJpdChpKVxuICAgIHZhciBrQml0ID0gay50ZXN0Qml0KGkpXG5cbiAgICBSID0gUi50d2ljZSgpXG5cbiAgICBpZiAoakJpdCkge1xuICAgICAgaWYgKGtCaXQpIHtcbiAgICAgICAgUiA9IFIuYWRkKGJvdGgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBSID0gUi5hZGQodGhpcylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtCaXQpIHtcbiAgICAgIFIgPSBSLmFkZCh4KVxuICAgIH1cbiAgICAtLWlcbiAgfVxuXG4gIHJldHVybiBSXG59XG5cblBvaW50LnByb3RvdHlwZS5nZXRFbmNvZGVkID0gZnVuY3Rpb24gKGNvbXByZXNzZWQpIHtcbiAgaWYgKGNvbXByZXNzZWQgPT0gbnVsbCkgY29tcHJlc3NlZCA9IHRoaXMuY29tcHJlc3NlZFxuICBpZiAodGhpcy5jdXJ2ZS5pc0luZmluaXR5KHRoaXMpKSByZXR1cm4gQnVmZmVyLmFsbG9jKDEsIDApIC8vIEluZmluaXR5IHBvaW50IGVuY29kZWQgaXMgc2ltcGx5ICcwMCdcblxuICB2YXIgeCA9IHRoaXMuYWZmaW5lWFxuICB2YXIgeSA9IHRoaXMuYWZmaW5lWVxuICB2YXIgYnl0ZUxlbmd0aCA9IHRoaXMuY3VydmUucExlbmd0aFxuICB2YXIgYnVmZmVyXG5cbiAgLy8gMHgwMi8weDAzIHwgWFxuICBpZiAoY29tcHJlc3NlZCkge1xuICAgIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgxICsgYnl0ZUxlbmd0aClcbiAgICBidWZmZXIud3JpdGVVSW50OCh5LmlzRXZlbigpID8gMHgwMiA6IDB4MDMsIDApXG5cbiAgLy8gMHgwNCB8IFggfCBZXG4gIH0gZWxzZSB7XG4gICAgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDEgKyBieXRlTGVuZ3RoICsgYnl0ZUxlbmd0aClcbiAgICBidWZmZXIud3JpdGVVSW50OCgweDA0LCAwKVxuXG4gICAgeS50b0J1ZmZlcihieXRlTGVuZ3RoKS5jb3B5KGJ1ZmZlciwgMSArIGJ5dGVMZW5ndGgpXG4gIH1cblxuICB4LnRvQnVmZmVyKGJ5dGVMZW5ndGgpLmNvcHkoYnVmZmVyLCAxKVxuXG4gIHJldHVybiBidWZmZXJcbn1cblxuUG9pbnQuZGVjb2RlRnJvbSA9IGZ1bmN0aW9uIChjdXJ2ZSwgYnVmZmVyKSB7XG4gIHZhciB0eXBlID0gYnVmZmVyLnJlYWRVSW50OCgwKVxuICB2YXIgY29tcHJlc3NlZCA9ICh0eXBlICE9PSA0KVxuXG4gIHZhciBieXRlTGVuZ3RoID0gTWF0aC5mbG9vcigoY3VydmUucC5iaXRMZW5ndGgoKSArIDcpIC8gOClcbiAgdmFyIHggPSBCaWdJbnRlZ2VyLmZyb21CdWZmZXIoYnVmZmVyLnNsaWNlKDEsIDEgKyBieXRlTGVuZ3RoKSlcblxuICB2YXIgUVxuICBpZiAoY29tcHJlc3NlZCkge1xuICAgIGFzc2VydC5lcXVhbChidWZmZXIubGVuZ3RoLCBieXRlTGVuZ3RoICsgMSwgJ0ludmFsaWQgc2VxdWVuY2UgbGVuZ3RoJylcbiAgICBhc3NlcnQodHlwZSA9PT0gMHgwMiB8fCB0eXBlID09PSAweDAzLCAnSW52YWxpZCBzZXF1ZW5jZSB0YWcnKVxuXG4gICAgdmFyIGlzT2RkID0gKHR5cGUgPT09IDB4MDMpXG4gICAgUSA9IGN1cnZlLnBvaW50RnJvbVgoaXNPZGQsIHgpXG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0LmVxdWFsKGJ1ZmZlci5sZW5ndGgsIDEgKyBieXRlTGVuZ3RoICsgYnl0ZUxlbmd0aCwgJ0ludmFsaWQgc2VxdWVuY2UgbGVuZ3RoJylcblxuICAgIHZhciB5ID0gQmlnSW50ZWdlci5mcm9tQnVmZmVyKGJ1ZmZlci5zbGljZSgxICsgYnl0ZUxlbmd0aCkpXG4gICAgUSA9IFBvaW50LmZyb21BZmZpbmUoY3VydmUsIHgsIHkpXG4gIH1cblxuICBRLmNvbXByZXNzZWQgPSBjb21wcmVzc2VkXG4gIHJldHVybiBRXG59XG5cblBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY3VydmUuaXNJbmZpbml0eSh0aGlzKSkgcmV0dXJuICcoSU5GSU5JVFkpJ1xuXG4gIHJldHVybiAnKCcgKyB0aGlzLmFmZmluZVgudG9TdHJpbmcoKSArICcsJyArIHRoaXMuYWZmaW5lWS50b1N0cmluZygpICsgJyknXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9pbnRcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtYXNzZXJ0Jyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgZGVzID0gcmVxdWlyZSgnLi4vZGVzJyk7XG52YXIgdXRpbHMgPSBkZXMudXRpbHM7XG52YXIgQ2lwaGVyID0gZGVzLkNpcGhlcjtcblxuZnVuY3Rpb24gREVTU3RhdGUoKSB7XG4gIHRoaXMudG1wID0gbmV3IEFycmF5KDIpO1xuICB0aGlzLmtleXMgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBERVMob3B0aW9ucykge1xuICBDaXBoZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICB2YXIgc3RhdGUgPSBuZXcgREVTU3RhdGUoKTtcbiAgdGhpcy5fZGVzU3RhdGUgPSBzdGF0ZTtcblxuICB0aGlzLmRlcml2ZUtleXMoc3RhdGUsIG9wdGlvbnMua2V5KTtcbn1cbmluaGVyaXRzKERFUywgQ2lwaGVyKTtcbm1vZHVsZS5leHBvcnRzID0gREVTO1xuXG5ERVMuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBERVMob3B0aW9ucyk7XG59O1xuXG52YXIgc2hpZnRUYWJsZSA9IFtcbiAgMSwgMSwgMiwgMiwgMiwgMiwgMiwgMixcbiAgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMVxuXTtcblxuREVTLnByb3RvdHlwZS5kZXJpdmVLZXlzID0gZnVuY3Rpb24gZGVyaXZlS2V5cyhzdGF0ZSwga2V5KSB7XG4gIHN0YXRlLmtleXMgPSBuZXcgQXJyYXkoMTYgKiAyKTtcblxuICBhc3NlcnQuZXF1YWwoa2V5Lmxlbmd0aCwgdGhpcy5ibG9ja1NpemUsICdJbnZhbGlkIGtleSBsZW5ndGgnKTtcblxuICB2YXIga0wgPSB1dGlscy5yZWFkVUludDMyQkUoa2V5LCAwKTtcbiAgdmFyIGtSID0gdXRpbHMucmVhZFVJbnQzMkJFKGtleSwgNCk7XG5cbiAgdXRpbHMucGMxKGtMLCBrUiwgc3RhdGUudG1wLCAwKTtcbiAga0wgPSBzdGF0ZS50bXBbMF07XG4gIGtSID0gc3RhdGUudG1wWzFdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRlLmtleXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgc2hpZnQgPSBzaGlmdFRhYmxlW2kgPj4+IDFdO1xuICAgIGtMID0gdXRpbHMucjI4c2hsKGtMLCBzaGlmdCk7XG4gICAga1IgPSB1dGlscy5yMjhzaGwoa1IsIHNoaWZ0KTtcbiAgICB1dGlscy5wYzIoa0wsIGtSLCBzdGF0ZS5rZXlzLCBpKTtcbiAgfVxufTtcblxuREVTLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gX3VwZGF0ZShpbnAsIGluT2ZmLCBvdXQsIG91dE9mZikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9kZXNTdGF0ZTtcblxuICB2YXIgbCA9IHV0aWxzLnJlYWRVSW50MzJCRShpbnAsIGluT2ZmKTtcbiAgdmFyIHIgPSB1dGlscy5yZWFkVUludDMyQkUoaW5wLCBpbk9mZiArIDQpO1xuXG4gIC8vIEluaXRpYWwgUGVybXV0YXRpb25cbiAgdXRpbHMuaXAobCwgciwgc3RhdGUudG1wLCAwKTtcbiAgbCA9IHN0YXRlLnRtcFswXTtcbiAgciA9IHN0YXRlLnRtcFsxXTtcblxuICBpZiAodGhpcy50eXBlID09PSAnZW5jcnlwdCcpXG4gICAgdGhpcy5fZW5jcnlwdChzdGF0ZSwgbCwgciwgc3RhdGUudG1wLCAwKTtcbiAgZWxzZVxuICAgIHRoaXMuX2RlY3J5cHQoc3RhdGUsIGwsIHIsIHN0YXRlLnRtcCwgMCk7XG5cbiAgbCA9IHN0YXRlLnRtcFswXTtcbiAgciA9IHN0YXRlLnRtcFsxXTtcblxuICB1dGlscy53cml0ZVVJbnQzMkJFKG91dCwgbCwgb3V0T2ZmKTtcbiAgdXRpbHMud3JpdGVVSW50MzJCRShvdXQsIHIsIG91dE9mZiArIDQpO1xufTtcblxuREVTLnByb3RvdHlwZS5fcGFkID0gZnVuY3Rpb24gX3BhZChidWZmZXIsIG9mZikge1xuICB2YXIgdmFsdWUgPSBidWZmZXIubGVuZ3RoIC0gb2ZmO1xuICBmb3IgKHZhciBpID0gb2ZmOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKVxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuREVTLnByb3RvdHlwZS5fdW5wYWQgPSBmdW5jdGlvbiBfdW5wYWQoYnVmZmVyKSB7XG4gIHZhciBwYWQgPSBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdO1xuICBmb3IgKHZhciBpID0gYnVmZmVyLmxlbmd0aCAtIHBhZDsgaSA8IGJ1ZmZlci5sZW5ndGg7IGkrKylcbiAgICBhc3NlcnQuZXF1YWwoYnVmZmVyW2ldLCBwYWQpO1xuXG4gIHJldHVybiBidWZmZXIuc2xpY2UoMCwgYnVmZmVyLmxlbmd0aCAtIHBhZCk7XG59O1xuXG5ERVMucHJvdG90eXBlLl9lbmNyeXB0ID0gZnVuY3Rpb24gX2VuY3J5cHQoc3RhdGUsIGxTdGFydCwgclN0YXJ0LCBvdXQsIG9mZikge1xuICB2YXIgbCA9IGxTdGFydDtcbiAgdmFyIHIgPSByU3RhcnQ7XG5cbiAgLy8gQXBwbHkgZigpIHgxNiB0aW1lc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRlLmtleXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIga2V5TCA9IHN0YXRlLmtleXNbaV07XG4gICAgdmFyIGtleVIgPSBzdGF0ZS5rZXlzW2kgKyAxXTtcblxuICAgIC8vIGYociwgaylcbiAgICB1dGlscy5leHBhbmQociwgc3RhdGUudG1wLCAwKTtcblxuICAgIGtleUwgXj0gc3RhdGUudG1wWzBdO1xuICAgIGtleVIgXj0gc3RhdGUudG1wWzFdO1xuICAgIHZhciBzID0gdXRpbHMuc3Vic3RpdHV0ZShrZXlMLCBrZXlSKTtcbiAgICB2YXIgZiA9IHV0aWxzLnBlcm11dGUocyk7XG5cbiAgICB2YXIgdCA9IHI7XG4gICAgciA9IChsIF4gZikgPj4+IDA7XG4gICAgbCA9IHQ7XG4gIH1cblxuICAvLyBSZXZlcnNlIEluaXRpYWwgUGVybXV0YXRpb25cbiAgdXRpbHMucmlwKHIsIGwsIG91dCwgb2ZmKTtcbn07XG5cbkRFUy5wcm90b3R5cGUuX2RlY3J5cHQgPSBmdW5jdGlvbiBfZGVjcnlwdChzdGF0ZSwgbFN0YXJ0LCByU3RhcnQsIG91dCwgb2ZmKSB7XG4gIHZhciBsID0gclN0YXJ0O1xuICB2YXIgciA9IGxTdGFydDtcblxuICAvLyBBcHBseSBmKCkgeDE2IHRpbWVzXG4gIGZvciAodmFyIGkgPSBzdGF0ZS5rZXlzLmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAyKSB7XG4gICAgdmFyIGtleUwgPSBzdGF0ZS5rZXlzW2ldO1xuICAgIHZhciBrZXlSID0gc3RhdGUua2V5c1tpICsgMV07XG5cbiAgICAvLyBmKHIsIGspXG4gICAgdXRpbHMuZXhwYW5kKGwsIHN0YXRlLnRtcCwgMCk7XG5cbiAgICBrZXlMIF49IHN0YXRlLnRtcFswXTtcbiAgICBrZXlSIF49IHN0YXRlLnRtcFsxXTtcbiAgICB2YXIgcyA9IHV0aWxzLnN1YnN0aXR1dGUoa2V5TCwga2V5Uik7XG4gICAgdmFyIGYgPSB1dGlscy5wZXJtdXRlKHMpO1xuXG4gICAgdmFyIHQgPSBsO1xuICAgIGwgPSAociBeIGYpID4+PiAwO1xuICAgIHIgPSB0O1xuICB9XG5cbiAgLy8gUmV2ZXJzZSBJbml0aWFsIFBlcm11dGF0aW9uXG4gIHV0aWxzLnJpcChsLCByLCBvdXQsIG9mZik7XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxudmFyIEJpZ0ludGVnZXIgPSByZXF1aXJlKCdiaWdpJylcblxudmFyIFBvaW50ID0gcmVxdWlyZSgnLi9wb2ludCcpXG5cbmZ1bmN0aW9uIEN1cnZlIChwLCBhLCBiLCBHeCwgR3ksIG4sIGgpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLmEgPSBhXG4gIHRoaXMuYiA9IGJcbiAgdGhpcy5HID0gUG9pbnQuZnJvbUFmZmluZSh0aGlzLCBHeCwgR3kpXG4gIHRoaXMubiA9IG5cbiAgdGhpcy5oID0gaFxuXG4gIHRoaXMuaW5maW5pdHkgPSBuZXcgUG9pbnQodGhpcywgbnVsbCwgbnVsbCwgQmlnSW50ZWdlci5aRVJPKVxuXG4gIC8vIHJlc3VsdCBjYWNoaW5nXG4gIHRoaXMucE92ZXJGb3VyID0gcC5hZGQoQmlnSW50ZWdlci5PTkUpLnNoaWZ0UmlnaHQoMilcblxuICAvLyBkZXRlcm1pbmUgc2l6ZSBvZiBwIGluIGJ5dGVzXG4gIHRoaXMucExlbmd0aCA9IE1hdGguZmxvb3IoKHRoaXMucC5iaXRMZW5ndGgoKSArIDcpIC8gOClcbn1cblxuQ3VydmUucHJvdG90eXBlLnBvaW50RnJvbVggPSBmdW5jdGlvbiAoaXNPZGQsIHgpIHtcbiAgdmFyIGFscGhhID0geC5wb3coMykuYWRkKHRoaXMuYS5tdWx0aXBseSh4KSkuYWRkKHRoaXMuYikubW9kKHRoaXMucClcbiAgdmFyIGJldGEgPSBhbHBoYS5tb2RQb3codGhpcy5wT3ZlckZvdXIsIHRoaXMucCkgLy8gWFhYOiBub3QgY29tcGF0aWJsZSB3aXRoIGFsbCBjdXJ2ZXNcblxuICB2YXIgeSA9IGJldGFcbiAgaWYgKGJldGEuaXNFdmVuKCkgXiAhaXNPZGQpIHtcbiAgICB5ID0gdGhpcy5wLnN1YnRyYWN0KHkpIC8vIC15ICUgcFxuICB9XG5cbiAgcmV0dXJuIFBvaW50LmZyb21BZmZpbmUodGhpcywgeCwgeSlcbn1cblxuQ3VydmUucHJvdG90eXBlLmlzSW5maW5pdHkgPSBmdW5jdGlvbiAoUSkge1xuICBpZiAoUSA9PT0gdGhpcy5pbmZpbml0eSkgcmV0dXJuIHRydWVcblxuICByZXR1cm4gUS56LnNpZ251bSgpID09PSAwICYmIFEueS5zaWdudW0oKSAhPT0gMFxufVxuXG5DdXJ2ZS5wcm90b3R5cGUuaXNPbkN1cnZlID0gZnVuY3Rpb24gKFEpIHtcbiAgaWYgKHRoaXMuaXNJbmZpbml0eShRKSkgcmV0dXJuIHRydWVcblxuICB2YXIgeCA9IFEuYWZmaW5lWFxuICB2YXIgeSA9IFEuYWZmaW5lWVxuICB2YXIgYSA9IHRoaXMuYVxuICB2YXIgYiA9IHRoaXMuYlxuICB2YXIgcCA9IHRoaXMucFxuXG4gIC8vIENoZWNrIHRoYXQgeFEgYW5kIHlRIGFyZSBpbnRlZ2VycyBpbiB0aGUgaW50ZXJ2YWwgWzAsIHAgLSAxXVxuICBpZiAoeC5zaWdudW0oKSA8IDAgfHwgeC5jb21wYXJlVG8ocCkgPj0gMCkgcmV0dXJuIGZhbHNlXG4gIGlmICh5LnNpZ251bSgpIDwgMCB8fCB5LmNvbXBhcmVUbyhwKSA+PSAwKSByZXR1cm4gZmFsc2VcblxuICAvLyBhbmQgY2hlY2sgdGhhdCB5XjIgPSB4XjMgKyBheCArIGIgKG1vZCBwKVxuICB2YXIgbGhzID0geS5zcXVhcmUoKS5tb2QocClcbiAgdmFyIHJocyA9IHgucG93KDMpLmFkZChhLm11bHRpcGx5KHgpKS5hZGQoYikubW9kKHApXG4gIHJldHVybiBsaHMuZXF1YWxzKHJocylcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBhbiBlbGxpcHRpYyBjdXJ2ZSBwb2ludC5cbiAqXG4gKiBTZWUgU0VDIDEsIHNlY3Rpb24gMy4yLjIuMTogRWxsaXB0aWMgQ3VydmUgUHVibGljIEtleSBWYWxpZGF0aW9uIFByaW1pdGl2ZVxuICovXG5DdXJ2ZS5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAoUSkge1xuICAvLyBDaGVjayBRICE9IE9cbiAgYXNzZXJ0KCF0aGlzLmlzSW5maW5pdHkoUSksICdQb2ludCBpcyBhdCBpbmZpbml0eScpXG4gIGFzc2VydCh0aGlzLmlzT25DdXJ2ZShRKSwgJ1BvaW50IGlzIG5vdCBvbiB0aGUgY3VydmUnKVxuXG4gIC8vIENoZWNrIG5RID0gTyAod2hlcmUgUSBpcyBhIHNjYWxhciBtdWx0aXBsZSBvZiBHKVxuICB2YXIgblEgPSBRLm11bHRpcGx5KHRoaXMubilcbiAgYXNzZXJ0KHRoaXMuaXNJbmZpbml0eShuUSksICdQb2ludCBpcyBub3QgYSBzY2FsYXIgbXVsdGlwbGUgb2YgRycpXG5cbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDdXJ2ZVxuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgTWlsbGVyUmFiaW4gPSByZXF1aXJlKCdtaWxsZXItcmFiaW4nKTtcbnZhciBtaWxsZXJSYWJpbiA9IG5ldyBNaWxsZXJSYWJpbigpO1xudmFyIFRXRU5UWUZPVVIgPSBuZXcgQk4oMjQpO1xudmFyIEVMRVZFTiA9IG5ldyBCTigxMSk7XG52YXIgVEVOID0gbmV3IEJOKDEwKTtcbnZhciBUSFJFRSA9IG5ldyBCTigzKTtcbnZhciBTRVZFTiA9IG5ldyBCTig3KTtcbnZhciBwcmltZXMgPSByZXF1aXJlKCcuL2dlbmVyYXRlUHJpbWUnKTtcbnZhciByYW5kb21CeXRlcyA9IHJlcXVpcmUoJ3JhbmRvbWJ5dGVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IERIO1xuXG5mdW5jdGlvbiBzZXRQdWJsaWNLZXkocHViLCBlbmMpIHtcbiAgZW5jID0gZW5jIHx8ICd1dGY4JztcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocHViKSkge1xuICAgIHB1YiA9IG5ldyBCdWZmZXIocHViLCBlbmMpO1xuICB9XG4gIHRoaXMuX3B1YiA9IG5ldyBCTihwdWIpO1xuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc2V0UHJpdmF0ZUtleShwcml2LCBlbmMpIHtcbiAgZW5jID0gZW5jIHx8ICd1dGY4JztcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocHJpdikpIHtcbiAgICBwcml2ID0gbmV3IEJ1ZmZlcihwcml2LCBlbmMpO1xuICB9XG4gIHRoaXMuX3ByaXYgPSBuZXcgQk4ocHJpdik7XG4gIHJldHVybiB0aGlzO1xufVxuXG52YXIgcHJpbWVDYWNoZSA9IHt9O1xuZnVuY3Rpb24gY2hlY2tQcmltZShwcmltZSwgZ2VuZXJhdG9yKSB7XG4gIHZhciBnZW4gPSBnZW5lcmF0b3IudG9TdHJpbmcoJ2hleCcpO1xuICB2YXIgaGV4ID0gW2dlbiwgcHJpbWUudG9TdHJpbmcoMTYpXS5qb2luKCdfJyk7XG4gIGlmIChoZXggaW4gcHJpbWVDYWNoZSkge1xuICAgIHJldHVybiBwcmltZUNhY2hlW2hleF07XG4gIH1cbiAgdmFyIGVycm9yID0gMDtcblxuICBpZiAocHJpbWUuaXNFdmVuKCkgfHxcbiAgICAhcHJpbWVzLnNpbXBsZVNpZXZlIHx8XG4gICAgIXByaW1lcy5mZXJtYXRUZXN0KHByaW1lKSB8fFxuICAgICFtaWxsZXJSYWJpbi50ZXN0KHByaW1lKSkge1xuICAgIC8vbm90IGEgcHJpbWUgc28gKzFcbiAgICBlcnJvciArPSAxO1xuXG4gICAgaWYgKGdlbiA9PT0gJzAyJyB8fCBnZW4gPT09ICcwNScpIHtcbiAgICAgIC8vIHdlJ2QgYmUgYWJsZSB0byBjaGVjayB0aGUgZ2VuZXJhdG9yXG4gICAgICAvLyBpdCB3b3VsZCBmYWlsIHNvICs4XG4gICAgICBlcnJvciArPSA4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dlIHdvdWxkbid0IGJlIGFibGUgdG8gdGVzdCB0aGUgZ2VuZXJhdG9yXG4gICAgICAvLyBzbyArNFxuICAgICAgZXJyb3IgKz0gNDtcbiAgICB9XG4gICAgcHJpbWVDYWNoZVtoZXhdID0gZXJyb3I7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG4gIGlmICghbWlsbGVyUmFiaW4udGVzdChwcmltZS5zaHJuKDEpKSkge1xuICAgIC8vbm90IGEgc2FmZSBwcmltZVxuICAgIGVycm9yICs9IDI7XG4gIH1cbiAgdmFyIHJlbTtcbiAgc3dpdGNoIChnZW4pIHtcbiAgICBjYXNlICcwMic6XG4gICAgICBpZiAocHJpbWUubW9kKFRXRU5UWUZPVVIpLmNtcChFTEVWRU4pKSB7XG4gICAgICAgIC8vIHVuc3VpZGFibGUgZ2VuZXJhdG9yXG4gICAgICAgIGVycm9yICs9IDg7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICcwNSc6XG4gICAgICByZW0gPSBwcmltZS5tb2QoVEVOKTtcbiAgICAgIGlmIChyZW0uY21wKFRIUkVFKSAmJiByZW0uY21wKFNFVkVOKSkge1xuICAgICAgICAvLyBwcmltZSBtb2QgMTAgbmVlZHMgdG8gZXF1YWwgMyBvciA3XG4gICAgICAgIGVycm9yICs9IDg7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgZXJyb3IgKz0gNDtcbiAgfVxuICBwcmltZUNhY2hlW2hleF0gPSBlcnJvcjtcbiAgcmV0dXJuIGVycm9yO1xufVxuXG5mdW5jdGlvbiBESChwcmltZSwgZ2VuZXJhdG9yLCBtYWxsZWFibGUpIHtcbiAgdGhpcy5zZXRHZW5lcmF0b3IoZ2VuZXJhdG9yKTtcbiAgdGhpcy5fX3ByaW1lID0gbmV3IEJOKHByaW1lKTtcbiAgdGhpcy5fcHJpbWUgPSBCTi5tb250KHRoaXMuX19wcmltZSk7XG4gIHRoaXMuX3ByaW1lTGVuID0gcHJpbWUubGVuZ3RoO1xuICB0aGlzLl9wdWIgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3ByaXYgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3ByaW1lQ29kZSA9IHVuZGVmaW5lZDtcbiAgaWYgKG1hbGxlYWJsZSkge1xuICAgIHRoaXMuc2V0UHVibGljS2V5ID0gc2V0UHVibGljS2V5O1xuICAgIHRoaXMuc2V0UHJpdmF0ZUtleSA9IHNldFByaXZhdGVLZXk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fcHJpbWVDb2RlID0gODtcbiAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERILnByb3RvdHlwZSwgJ3ZlcmlmeUVycm9yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3ByaW1lQ29kZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3ByaW1lQ29kZSA9IGNoZWNrUHJpbWUodGhpcy5fX3ByaW1lLCB0aGlzLl9fZ2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ByaW1lQ29kZTtcbiAgfVxufSk7XG5ESC5wcm90b3R5cGUuZ2VuZXJhdGVLZXlzID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX3ByaXYpIHtcbiAgICB0aGlzLl9wcml2ID0gbmV3IEJOKHJhbmRvbUJ5dGVzKHRoaXMuX3ByaW1lTGVuKSk7XG4gIH1cbiAgdGhpcy5fcHViID0gdGhpcy5fZ2VuLnRvUmVkKHRoaXMuX3ByaW1lKS5yZWRQb3codGhpcy5fcHJpdikuZnJvbVJlZCgpO1xuICByZXR1cm4gdGhpcy5nZXRQdWJsaWNLZXkoKTtcbn07XG5cbkRILnByb3RvdHlwZS5jb21wdXRlU2VjcmV0ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIG90aGVyID0gbmV3IEJOKG90aGVyKTtcbiAgb3RoZXIgPSBvdGhlci50b1JlZCh0aGlzLl9wcmltZSk7XG4gIHZhciBzZWNyZXQgPSBvdGhlci5yZWRQb3codGhpcy5fcHJpdikuZnJvbVJlZCgpO1xuICB2YXIgb3V0ID0gbmV3IEJ1ZmZlcihzZWNyZXQudG9BcnJheSgpKTtcbiAgdmFyIHByaW1lID0gdGhpcy5nZXRQcmltZSgpO1xuICBpZiAob3V0Lmxlbmd0aCA8IHByaW1lLmxlbmd0aCkge1xuICAgIHZhciBmcm9udCA9IG5ldyBCdWZmZXIocHJpbWUubGVuZ3RoIC0gb3V0Lmxlbmd0aCk7XG4gICAgZnJvbnQuZmlsbCgwKTtcbiAgICBvdXQgPSBCdWZmZXIuY29uY2F0KFtmcm9udCwgb3V0XSk7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5cbkRILnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiBnZXRQdWJsaWNLZXkoZW5jKSB7XG4gIHJldHVybiBmb3JtYXRSZXR1cm5WYWx1ZSh0aGlzLl9wdWIsIGVuYyk7XG59O1xuXG5ESC5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uIGdldFByaXZhdGVLZXkoZW5jKSB7XG4gIHJldHVybiBmb3JtYXRSZXR1cm5WYWx1ZSh0aGlzLl9wcml2LCBlbmMpO1xufTtcblxuREgucHJvdG90eXBlLmdldFByaW1lID0gZnVuY3Rpb24gKGVuYykge1xuICByZXR1cm4gZm9ybWF0UmV0dXJuVmFsdWUodGhpcy5fX3ByaW1lLCBlbmMpO1xufTtcblxuREgucHJvdG90eXBlLmdldEdlbmVyYXRvciA9IGZ1bmN0aW9uIChlbmMpIHtcbiAgcmV0dXJuIGZvcm1hdFJldHVyblZhbHVlKHRoaXMuX2dlbiwgZW5jKTtcbn07XG5cbkRILnByb3RvdHlwZS5zZXRHZW5lcmF0b3IgPSBmdW5jdGlvbiAoZ2VuLCBlbmMpIHtcbiAgZW5jID0gZW5jIHx8ICd1dGY4JztcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoZ2VuKSkge1xuICAgIGdlbiA9IG5ldyBCdWZmZXIoZ2VuLCBlbmMpO1xuICB9XG4gIHRoaXMuX19nZW4gPSBnZW47XG4gIHRoaXMuX2dlbiA9IG5ldyBCTihnZW4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGZvcm1hdFJldHVyblZhbHVlKGJuLCBlbmMpIHtcbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIoYm4udG9BcnJheSgpKTtcbiAgaWYgKCFlbmMpIHtcbiAgICByZXR1cm4gYnVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBidWYudG9TdHJpbmcoZW5jKTtcbiAgfVxufVxuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjknIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIHJhbmRvbUJ5dGVzID0gcmVxdWlyZSgncmFuZG9tYnl0ZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZmluZFByaW1lO1xuZmluZFByaW1lLnNpbXBsZVNpZXZlID0gc2ltcGxlU2lldmU7XG5maW5kUHJpbWUuZmVybWF0VGVzdCA9IGZlcm1hdFRlc3Q7XG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIFRXRU5UWUZPVVIgPSBuZXcgQk4oMjQpO1xudmFyIE1pbGxlclJhYmluID0gcmVxdWlyZSgnbWlsbGVyLXJhYmluJyk7XG52YXIgbWlsbGVyUmFiaW4gPSBuZXcgTWlsbGVyUmFiaW4oKTtcbnZhciBPTkUgPSBuZXcgQk4oMSk7XG52YXIgVFdPID0gbmV3IEJOKDIpO1xudmFyIEZJVkUgPSBuZXcgQk4oNSk7XG52YXIgU0lYVEVFTiA9IG5ldyBCTigxNik7XG52YXIgRUlHSFQgPSBuZXcgQk4oOCk7XG52YXIgVEVOID0gbmV3IEJOKDEwKTtcbnZhciBUSFJFRSA9IG5ldyBCTigzKTtcbnZhciBTRVZFTiA9IG5ldyBCTig3KTtcbnZhciBFTEVWRU4gPSBuZXcgQk4oMTEpO1xudmFyIEZPVVIgPSBuZXcgQk4oNCk7XG52YXIgVFdFTFZFID0gbmV3IEJOKDEyKTtcbnZhciBwcmltZXMgPSBudWxsO1xuXG5mdW5jdGlvbiBfZ2V0UHJpbWVzKCkge1xuICBpZiAocHJpbWVzICE9PSBudWxsKVxuICAgIHJldHVybiBwcmltZXM7XG5cbiAgdmFyIGxpbWl0ID0gMHgxMDAwMDA7XG4gIHZhciByZXMgPSBbXTtcbiAgcmVzWzBdID0gMjtcbiAgZm9yICh2YXIgaSA9IDEsIGsgPSAzOyBrIDwgbGltaXQ7IGsgKz0gMikge1xuICAgIHZhciBzcXJ0ID0gTWF0aC5jZWlsKE1hdGguc3FydChrKSk7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBpICYmIHJlc1tqXSA8PSBzcXJ0OyBqKyspXG4gICAgICBpZiAoayAlIHJlc1tqXSA9PT0gMClcbiAgICAgICAgYnJlYWs7XG5cbiAgICBpZiAoaSAhPT0gaiAmJiByZXNbal0gPD0gc3FydClcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgcmVzW2krK10gPSBrO1xuICB9XG4gIHByaW1lcyA9IHJlcztcbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gc2ltcGxlU2lldmUocCkge1xuICB2YXIgcHJpbWVzID0gX2dldFByaW1lcygpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbWVzLmxlbmd0aDsgaSsrKVxuICAgIGlmIChwLm1vZG4ocHJpbWVzW2ldKSA9PT0gMCkge1xuICAgICAgaWYgKHAuY21wbihwcmltZXNbaV0pID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZmVybWF0VGVzdChwKSB7XG4gIHZhciByZWQgPSBCTi5tb250KHApO1xuICByZXR1cm4gVFdPLnRvUmVkKHJlZCkucmVkUG93KHAuc3VibigxKSkuZnJvbVJlZCgpLmNtcG4oMSkgPT09IDA7XG59XG5cbmZ1bmN0aW9uIGZpbmRQcmltZShiaXRzLCBnZW4pIHtcbiAgaWYgKGJpdHMgPCAxNikge1xuICAgIC8vIHRoaXMgaXMgd2hhdCBvcGVuc3NsIGRvZXNcbiAgICBpZiAoZ2VuID09PSAyIHx8IGdlbiA9PT0gNSkge1xuICAgICAgcmV0dXJuIG5ldyBCTihbMHg4YywgMHg3Yl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEJOKFsweDhjLCAweDI3XSk7XG4gICAgfVxuICB9XG4gIGdlbiA9IG5ldyBCTihnZW4pO1xuXG4gIHZhciBudW0sIG4yO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbnVtID0gbmV3IEJOKHJhbmRvbUJ5dGVzKE1hdGguY2VpbChiaXRzIC8gOCkpKTtcbiAgICB3aGlsZSAobnVtLmJpdExlbmd0aCgpID4gYml0cykge1xuICAgICAgbnVtLmlzaHJuKDEpO1xuICAgIH1cbiAgICBpZiAobnVtLmlzRXZlbigpKSB7XG4gICAgICBudW0uaWFkZChPTkUpO1xuICAgIH1cbiAgICBpZiAoIW51bS50ZXN0bigxKSkge1xuICAgICAgbnVtLmlhZGQoVFdPKTtcbiAgICB9XG4gICAgaWYgKCFnZW4uY21wKFRXTykpIHtcbiAgICAgIHdoaWxlIChudW0ubW9kKFRXRU5UWUZPVVIpLmNtcChFTEVWRU4pKSB7XG4gICAgICAgIG51bS5pYWRkKEZPVVIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWdlbi5jbXAoRklWRSkpIHtcbiAgICAgIHdoaWxlIChudW0ubW9kKFRFTikuY21wKFRIUkVFKSkge1xuICAgICAgICBudW0uaWFkZChGT1VSKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbjIgPSBudW0uc2hybigxKTtcbiAgICBpZiAoc2ltcGxlU2lldmUobjIpICYmIHNpbXBsZVNpZXZlKG51bSkgJiZcbiAgICAgIGZlcm1hdFRlc3QobjIpICYmIGZlcm1hdFRlc3QobnVtKSAmJlxuICAgICAgbWlsbGVyUmFiaW4udGVzdChuMikgJiYgbWlsbGVyUmFiaW4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgfVxuXG59XG4iLCJ2YXIgTUQ1ID0gcmVxdWlyZSgnbWQ1LmpzJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gIHJldHVybiBuZXcgTUQ1KCkudXBkYXRlKGJ1ZmZlcikuZGlnZXN0KClcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUoYnl0ZXMsIG9mZikge1xuICB2YXIgcmVzID0gIChieXRlc1swICsgb2ZmXSA8PCAyNCkgfFxuICAgICAgICAgICAgIChieXRlc1sxICsgb2ZmXSA8PCAxNikgfFxuICAgICAgICAgICAgIChieXRlc1syICsgb2ZmXSA8PCA4KSB8XG4gICAgICAgICAgICAgYnl0ZXNbMyArIG9mZl07XG4gIHJldHVybiByZXMgPj4+IDA7XG59O1xuXG5leHBvcnRzLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFKGJ5dGVzLCB2YWx1ZSwgb2ZmKSB7XG4gIGJ5dGVzWzAgKyBvZmZdID0gdmFsdWUgPj4+IDI0O1xuICBieXRlc1sxICsgb2ZmXSA9ICh2YWx1ZSA+Pj4gMTYpICYgMHhmZjtcbiAgYnl0ZXNbMiArIG9mZl0gPSAodmFsdWUgPj4+IDgpICYgMHhmZjtcbiAgYnl0ZXNbMyArIG9mZl0gPSB2YWx1ZSAmIDB4ZmY7XG59O1xuXG5leHBvcnRzLmlwID0gZnVuY3Rpb24gaXAoaW5MLCBpblIsIG91dCwgb2ZmKSB7XG4gIHZhciBvdXRMID0gMDtcbiAgdmFyIG91dFIgPSAwO1xuXG4gIGZvciAodmFyIGkgPSA2OyBpID49IDA7IGkgLT0gMikge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDw9IDI0OyBqICs9IDgpIHtcbiAgICAgIG91dEwgPDw9IDE7XG4gICAgICBvdXRMIHw9IChpblIgPj4+IChqICsgaSkpICYgMTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gMjQ7IGogKz0gOCkge1xuICAgICAgb3V0TCA8PD0gMTtcbiAgICAgIG91dEwgfD0gKGluTCA+Pj4gKGogKyBpKSkgJiAxO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSA2OyBpID49IDA7IGkgLT0gMikge1xuICAgIGZvciAodmFyIGogPSAxOyBqIDw9IDI1OyBqICs9IDgpIHtcbiAgICAgIG91dFIgPDw9IDE7XG4gICAgICBvdXRSIHw9IChpblIgPj4+IChqICsgaSkpICYgMTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDE7IGogPD0gMjU7IGogKz0gOCkge1xuICAgICAgb3V0UiA8PD0gMTtcbiAgICAgIG91dFIgfD0gKGluTCA+Pj4gKGogKyBpKSkgJiAxO1xuICAgIH1cbiAgfVxuXG4gIG91dFtvZmYgKyAwXSA9IG91dEwgPj4+IDA7XG4gIG91dFtvZmYgKyAxXSA9IG91dFIgPj4+IDA7XG59O1xuXG5leHBvcnRzLnJpcCA9IGZ1bmN0aW9uIHJpcChpbkwsIGluUiwgb3V0LCBvZmYpIHtcbiAgdmFyIG91dEwgPSAwO1xuICB2YXIgb3V0UiA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMjQ7IGogPj0gMDsgaiAtPSA4KSB7XG4gICAgICBvdXRMIDw8PSAxO1xuICAgICAgb3V0TCB8PSAoaW5SID4+PiAoaiArIGkpKSAmIDE7XG4gICAgICBvdXRMIDw8PSAxO1xuICAgICAgb3V0TCB8PSAoaW5MID4+PiAoaiArIGkpKSAmIDE7XG4gICAgfVxuICB9XG4gIGZvciAodmFyIGkgPSA0OyBpIDwgODsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDI0OyBqID49IDA7IGogLT0gOCkge1xuICAgICAgb3V0UiA8PD0gMTtcbiAgICAgIG91dFIgfD0gKGluUiA+Pj4gKGogKyBpKSkgJiAxO1xuICAgICAgb3V0UiA8PD0gMTtcbiAgICAgIG91dFIgfD0gKGluTCA+Pj4gKGogKyBpKSkgJiAxO1xuICAgIH1cbiAgfVxuXG4gIG91dFtvZmYgKyAwXSA9IG91dEwgPj4+IDA7XG4gIG91dFtvZmYgKyAxXSA9IG91dFIgPj4+IDA7XG59O1xuXG5leHBvcnRzLnBjMSA9IGZ1bmN0aW9uIHBjMShpbkwsIGluUiwgb3V0LCBvZmYpIHtcbiAgdmFyIG91dEwgPSAwO1xuICB2YXIgb3V0UiA9IDA7XG5cbiAgLy8gNywgMTUsIDIzLCAzMSwgMzksIDQ3LCA1NSwgNjNcbiAgLy8gNiwgMTQsIDIyLCAzMCwgMzksIDQ3LCA1NSwgNjNcbiAgLy8gNSwgMTMsIDIxLCAyOSwgMzksIDQ3LCA1NSwgNjNcbiAgLy8gNCwgMTIsIDIwLCAyOFxuICBmb3IgKHZhciBpID0gNzsgaSA+PSA1OyBpLS0pIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSAyNDsgaiArPSA4KSB7XG4gICAgICBvdXRMIDw8PSAxO1xuICAgICAgb3V0TCB8PSAoaW5SID4+IChqICsgaSkpICYgMTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gMjQ7IGogKz0gOCkge1xuICAgICAgb3V0TCA8PD0gMTtcbiAgICAgIG91dEwgfD0gKGluTCA+PiAoaiArIGkpKSAmIDE7XG4gICAgfVxuICB9XG4gIGZvciAodmFyIGogPSAwOyBqIDw9IDI0OyBqICs9IDgpIHtcbiAgICBvdXRMIDw8PSAxO1xuICAgIG91dEwgfD0gKGluUiA+PiAoaiArIGkpKSAmIDE7XG4gIH1cblxuICAvLyAxLCA5LCAxNywgMjUsIDMzLCA0MSwgNDksIDU3XG4gIC8vIDIsIDEwLCAxOCwgMjYsIDM0LCA0MiwgNTAsIDU4XG4gIC8vIDMsIDExLCAxOSwgMjcsIDM1LCA0MywgNTEsIDU5XG4gIC8vIDM2LCA0NCwgNTIsIDYwXG4gIGZvciAodmFyIGkgPSAxOyBpIDw9IDM7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDw9IDI0OyBqICs9IDgpIHtcbiAgICAgIG91dFIgPDw9IDE7XG4gICAgICBvdXRSIHw9IChpblIgPj4gKGogKyBpKSkgJiAxO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSAyNDsgaiArPSA4KSB7XG4gICAgICBvdXRSIDw8PSAxO1xuICAgICAgb3V0UiB8PSAoaW5MID4+IChqICsgaSkpICYgMTtcbiAgICB9XG4gIH1cbiAgZm9yICh2YXIgaiA9IDA7IGogPD0gMjQ7IGogKz0gOCkge1xuICAgIG91dFIgPDw9IDE7XG4gICAgb3V0UiB8PSAoaW5MID4+IChqICsgaSkpICYgMTtcbiAgfVxuXG4gIG91dFtvZmYgKyAwXSA9IG91dEwgPj4+IDA7XG4gIG91dFtvZmYgKyAxXSA9IG91dFIgPj4+IDA7XG59O1xuXG5leHBvcnRzLnIyOHNobCA9IGZ1bmN0aW9uIHIyOHNobChudW0sIHNoaWZ0KSB7XG4gIHJldHVybiAoKG51bSA8PCBzaGlmdCkgJiAweGZmZmZmZmYpIHwgKG51bSA+Pj4gKDI4IC0gc2hpZnQpKTtcbn07XG5cbnZhciBwYzJ0YWJsZSA9IFtcbiAgLy8gaW5MID0+IG91dExcbiAgMTQsIDExLCAxNywgNCwgMjcsIDIzLCAyNSwgMCxcbiAgMTMsIDIyLCA3LCAxOCwgNSwgOSwgMTYsIDI0LFxuICAyLCAyMCwgMTIsIDIxLCAxLCA4LCAxNSwgMjYsXG5cbiAgLy8gaW5SID0+IG91dFJcbiAgMTUsIDQsIDI1LCAxOSwgOSwgMSwgMjYsIDE2LFxuICA1LCAxMSwgMjMsIDgsIDEyLCA3LCAxNywgMCxcbiAgMjIsIDMsIDEwLCAxNCwgNiwgMjAsIDI3LCAyNFxuXTtcblxuZXhwb3J0cy5wYzIgPSBmdW5jdGlvbiBwYzIoaW5MLCBpblIsIG91dCwgb2ZmKSB7XG4gIHZhciBvdXRMID0gMDtcbiAgdmFyIG91dFIgPSAwO1xuXG4gIHZhciBsZW4gPSBwYzJ0YWJsZS5sZW5ndGggPj4+IDE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRMIDw8PSAxO1xuICAgIG91dEwgfD0gKGluTCA+Pj4gcGMydGFibGVbaV0pICYgMHgxO1xuICB9XG4gIGZvciAodmFyIGkgPSBsZW47IGkgPCBwYzJ0YWJsZS5sZW5ndGg7IGkrKykge1xuICAgIG91dFIgPDw9IDE7XG4gICAgb3V0UiB8PSAoaW5SID4+PiBwYzJ0YWJsZVtpXSkgJiAweDE7XG4gIH1cblxuICBvdXRbb2ZmICsgMF0gPSBvdXRMID4+PiAwO1xuICBvdXRbb2ZmICsgMV0gPSBvdXRSID4+PiAwO1xufTtcblxuZXhwb3J0cy5leHBhbmQgPSBmdW5jdGlvbiBleHBhbmQociwgb3V0LCBvZmYpIHtcbiAgdmFyIG91dEwgPSAwO1xuICB2YXIgb3V0UiA9IDA7XG5cbiAgb3V0TCA9ICgociAmIDEpIDw8IDUpIHwgKHIgPj4+IDI3KTtcbiAgZm9yICh2YXIgaSA9IDIzOyBpID49IDE1OyBpIC09IDQpIHtcbiAgICBvdXRMIDw8PSA2O1xuICAgIG91dEwgfD0gKHIgPj4+IGkpICYgMHgzZjtcbiAgfVxuICBmb3IgKHZhciBpID0gMTE7IGkgPj0gMzsgaSAtPSA0KSB7XG4gICAgb3V0UiB8PSAociA+Pj4gaSkgJiAweDNmO1xuICAgIG91dFIgPDw9IDY7XG4gIH1cbiAgb3V0UiB8PSAoKHIgJiAweDFmKSA8PCAxKSB8IChyID4+PiAzMSk7XG5cbiAgb3V0W29mZiArIDBdID0gb3V0TCA+Pj4gMDtcbiAgb3V0W29mZiArIDFdID0gb3V0UiA+Pj4gMDtcbn07XG5cbnZhciBzVGFibGUgPSBbXG4gIDE0LCAwLCA0LCAxNSwgMTMsIDcsIDEsIDQsIDIsIDE0LCAxNSwgMiwgMTEsIDEzLCA4LCAxLFxuICAzLCAxMCwgMTAsIDYsIDYsIDEyLCAxMiwgMTEsIDUsIDksIDksIDUsIDAsIDMsIDcsIDgsXG4gIDQsIDE1LCAxLCAxMiwgMTQsIDgsIDgsIDIsIDEzLCA0LCA2LCA5LCAyLCAxLCAxMSwgNyxcbiAgMTUsIDUsIDEyLCAxMSwgOSwgMywgNywgMTQsIDMsIDEwLCAxMCwgMCwgNSwgNiwgMCwgMTMsXG5cbiAgMTUsIDMsIDEsIDEzLCA4LCA0LCAxNCwgNywgNiwgMTUsIDExLCAyLCAzLCA4LCA0LCAxNCxcbiAgOSwgMTIsIDcsIDAsIDIsIDEsIDEzLCAxMCwgMTIsIDYsIDAsIDksIDUsIDExLCAxMCwgNSxcbiAgMCwgMTMsIDE0LCA4LCA3LCAxMCwgMTEsIDEsIDEwLCAzLCA0LCAxNSwgMTMsIDQsIDEsIDIsXG4gIDUsIDExLCA4LCA2LCAxMiwgNywgNiwgMTIsIDksIDAsIDMsIDUsIDIsIDE0LCAxNSwgOSxcblxuICAxMCwgMTMsIDAsIDcsIDksIDAsIDE0LCA5LCA2LCAzLCAzLCA0LCAxNSwgNiwgNSwgMTAsXG4gIDEsIDIsIDEzLCA4LCAxMiwgNSwgNywgMTQsIDExLCAxMiwgNCwgMTEsIDIsIDE1LCA4LCAxLFxuICAxMywgMSwgNiwgMTAsIDQsIDEzLCA5LCAwLCA4LCA2LCAxNSwgOSwgMywgOCwgMCwgNyxcbiAgMTEsIDQsIDEsIDE1LCAyLCAxNCwgMTIsIDMsIDUsIDExLCAxMCwgNSwgMTQsIDIsIDcsIDEyLFxuXG4gIDcsIDEzLCAxMywgOCwgMTQsIDExLCAzLCA1LCAwLCA2LCA2LCAxNSwgOSwgMCwgMTAsIDMsXG4gIDEsIDQsIDIsIDcsIDgsIDIsIDUsIDEyLCAxMSwgMSwgMTIsIDEwLCA0LCAxNCwgMTUsIDksXG4gIDEwLCAzLCA2LCAxNSwgOSwgMCwgMCwgNiwgMTIsIDEwLCAxMSwgMSwgNywgMTMsIDEzLCA4LFxuICAxNSwgOSwgMSwgNCwgMywgNSwgMTQsIDExLCA1LCAxMiwgMiwgNywgOCwgMiwgNCwgMTQsXG5cbiAgMiwgMTQsIDEyLCAxMSwgNCwgMiwgMSwgMTIsIDcsIDQsIDEwLCA3LCAxMSwgMTMsIDYsIDEsXG4gIDgsIDUsIDUsIDAsIDMsIDE1LCAxNSwgMTAsIDEzLCAzLCAwLCA5LCAxNCwgOCwgOSwgNixcbiAgNCwgMTEsIDIsIDgsIDEsIDEyLCAxMSwgNywgMTAsIDEsIDEzLCAxNCwgNywgMiwgOCwgMTMsXG4gIDE1LCA2LCA5LCAxNSwgMTIsIDAsIDUsIDksIDYsIDEwLCAzLCA0LCAwLCA1LCAxNCwgMyxcblxuICAxMiwgMTAsIDEsIDE1LCAxMCwgNCwgMTUsIDIsIDksIDcsIDIsIDEyLCA2LCA5LCA4LCA1LFxuICAwLCA2LCAxMywgMSwgMywgMTMsIDQsIDE0LCAxNCwgMCwgNywgMTEsIDUsIDMsIDExLCA4LFxuICA5LCA0LCAxNCwgMywgMTUsIDIsIDUsIDEyLCAyLCA5LCA4LCA1LCAxMiwgMTUsIDMsIDEwLFxuICA3LCAxMSwgMCwgMTQsIDQsIDEsIDEwLCA3LCAxLCA2LCAxMywgMCwgMTEsIDgsIDYsIDEzLFxuXG4gIDQsIDEzLCAxMSwgMCwgMiwgMTEsIDE0LCA3LCAxNSwgNCwgMCwgOSwgOCwgMSwgMTMsIDEwLFxuICAzLCAxNCwgMTIsIDMsIDksIDUsIDcsIDEyLCA1LCAyLCAxMCwgMTUsIDYsIDgsIDEsIDYsXG4gIDEsIDYsIDQsIDExLCAxMSwgMTMsIDEzLCA4LCAxMiwgMSwgMywgNCwgNywgMTAsIDE0LCA3LFxuICAxMCwgOSwgMTUsIDUsIDYsIDAsIDgsIDE1LCAwLCAxNCwgNSwgMiwgOSwgMywgMiwgMTIsXG5cbiAgMTMsIDEsIDIsIDE1LCA4LCAxMywgNCwgOCwgNiwgMTAsIDE1LCAzLCAxMSwgNywgMSwgNCxcbiAgMTAsIDEyLCA5LCA1LCAzLCA2LCAxNCwgMTEsIDUsIDAsIDAsIDE0LCAxMiwgOSwgNywgMixcbiAgNywgMiwgMTEsIDEsIDQsIDE0LCAxLCA3LCA5LCA0LCAxMiwgMTAsIDE0LCA4LCAyLCAxMyxcbiAgMCwgMTUsIDYsIDEyLCAxMCwgOSwgMTMsIDAsIDE1LCAzLCAzLCA1LCA1LCA2LCA4LCAxMVxuXTtcblxuZXhwb3J0cy5zdWJzdGl0dXRlID0gZnVuY3Rpb24gc3Vic3RpdHV0ZShpbkwsIGluUikge1xuICB2YXIgb3V0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2YXIgYiA9IChpbkwgPj4+ICgxOCAtIGkgKiA2KSkgJiAweDNmO1xuICAgIHZhciBzYiA9IHNUYWJsZVtpICogMHg0MCArIGJdO1xuXG4gICAgb3V0IDw8PSA0O1xuICAgIG91dCB8PSBzYjtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIHZhciBiID0gKGluUiA+Pj4gKDE4IC0gaSAqIDYpKSAmIDB4M2Y7XG4gICAgdmFyIHNiID0gc1RhYmxlWzQgKiAweDQwICsgaSAqIDB4NDAgKyBiXTtcblxuICAgIG91dCA8PD0gNDtcbiAgICBvdXQgfD0gc2I7XG4gIH1cbiAgcmV0dXJuIG91dCA+Pj4gMDtcbn07XG5cbnZhciBwZXJtdXRlVGFibGUgPSBbXG4gIDE2LCAyNSwgMTIsIDExLCAzLCAyMCwgNCwgMTUsIDMxLCAxNywgOSwgNiwgMjcsIDE0LCAxLCAyMixcbiAgMzAsIDI0LCA4LCAxOCwgMCwgNSwgMjksIDIzLCAxMywgMTksIDIsIDI2LCAxMCwgMjEsIDI4LCA3XG5dO1xuXG5leHBvcnRzLnBlcm11dGUgPSBmdW5jdGlvbiBwZXJtdXRlKG51bSkge1xuICB2YXIgb3V0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJtdXRlVGFibGUubGVuZ3RoOyBpKyspIHtcbiAgICBvdXQgPDw9IDE7XG4gICAgb3V0IHw9IChudW0gPj4+IHBlcm11dGVUYWJsZVtpXSkgJiAweDE7XG4gIH1cbiAgcmV0dXJuIG91dCA+Pj4gMDtcbn07XG5cbmV4cG9ydHMucGFkU3BsaXQgPSBmdW5jdGlvbiBwYWRTcGxpdChudW0sIHNpemUsIGdyb3VwKSB7XG4gIHZhciBzdHIgPSBudW0udG9TdHJpbmcoMik7XG4gIHdoaWxlIChzdHIubGVuZ3RoIDwgc2l6ZSlcbiAgICBzdHIgPSAnMCcgKyBzdHI7XG5cbiAgdmFyIG91dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkgKz0gZ3JvdXApXG4gICAgb3V0LnB1c2goc3RyLnNsaWNlKGksIGkgKyBncm91cCkpO1xuICByZXR1cm4gb3V0LmpvaW4oJyAnKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYgaGFzKGV4cG9ydHMsIGtleSkpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnc3RyZWFtJykuVHJhbnNmb3JtXG52YXIgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyJykuU3RyaW5nRGVjb2RlclxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuXG5mdW5jdGlvbiBDaXBoZXJCYXNlIChoYXNoTW9kZSkge1xuICBUcmFuc2Zvcm0uY2FsbCh0aGlzKVxuICB0aGlzLmhhc2hNb2RlID0gdHlwZW9mIGhhc2hNb2RlID09PSAnc3RyaW5nJ1xuICBpZiAodGhpcy5oYXNoTW9kZSkge1xuICAgIHRoaXNbaGFzaE1vZGVdID0gdGhpcy5fZmluYWxPckRpZ2VzdFxuICB9IGVsc2Uge1xuICAgIHRoaXMuZmluYWwgPSB0aGlzLl9maW5hbE9yRGlnZXN0XG4gIH1cbiAgaWYgKHRoaXMuX2ZpbmFsKSB7XG4gICAgdGhpcy5fX2ZpbmFsID0gdGhpcy5fZmluYWxcbiAgICB0aGlzLl9maW5hbCA9IG51bGxcbiAgfVxuICB0aGlzLl9kZWNvZGVyID0gbnVsbFxuICB0aGlzLl9lbmNvZGluZyA9IG51bGxcbn1cbmluaGVyaXRzKENpcGhlckJhc2UsIFRyYW5zZm9ybSlcblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEsIGlucHV0RW5jLCBvdXRwdXRFbmMpIHtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBpbnB1dEVuYylcbiAgfVxuXG4gIHZhciBvdXREYXRhID0gdGhpcy5fdXBkYXRlKGRhdGEpXG4gIGlmICh0aGlzLmhhc2hNb2RlKSByZXR1cm4gdGhpc1xuXG4gIGlmIChvdXRwdXRFbmMpIHtcbiAgICBvdXREYXRhID0gdGhpcy5fdG9TdHJpbmcob3V0RGF0YSwgb3V0cHV0RW5jKVxuICB9XG5cbiAgcmV0dXJuIG91dERhdGFcbn1cblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuc2V0QXV0b1BhZGRpbmcgPSBmdW5jdGlvbiAoKSB7fVxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuZ2V0QXV0aFRhZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCd0cnlpbmcgdG8gZ2V0IGF1dGggdGFnIGluIHVuc3VwcG9ydGVkIHN0YXRlJylcbn1cblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuc2V0QXV0aFRhZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCd0cnlpbmcgdG8gc2V0IGF1dGggdGFnIGluIHVuc3VwcG9ydGVkIHN0YXRlJylcbn1cblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuc2V0QUFEID0gZnVuY3Rpb24gKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3RyeWluZyB0byBzZXQgYWFkIGluIHVuc3VwcG9ydGVkIHN0YXRlJylcbn1cblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBuZXh0KSB7XG4gIHZhciBlcnJcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy5oYXNoTW9kZSkge1xuICAgICAgdGhpcy5fdXBkYXRlKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaCh0aGlzLl91cGRhdGUoZGF0YSkpXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyID0gZVxuICB9IGZpbmFsbHkge1xuICAgIG5leHQoZXJyKVxuICB9XG59XG5DaXBoZXJCYXNlLnByb3RvdHlwZS5fZmx1c2ggPSBmdW5jdGlvbiAoZG9uZSkge1xuICB2YXIgZXJyXG4gIHRyeSB7XG4gICAgdGhpcy5wdXNoKHRoaXMuX19maW5hbCgpKVxuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyID0gZVxuICB9XG5cbiAgZG9uZShlcnIpXG59XG5DaXBoZXJCYXNlLnByb3RvdHlwZS5fZmluYWxPckRpZ2VzdCA9IGZ1bmN0aW9uIChvdXRwdXRFbmMpIHtcbiAgdmFyIG91dERhdGEgPSB0aGlzLl9fZmluYWwoKSB8fCBCdWZmZXIuYWxsb2MoMClcbiAgaWYgKG91dHB1dEVuYykge1xuICAgIG91dERhdGEgPSB0aGlzLl90b1N0cmluZyhvdXREYXRhLCBvdXRwdXRFbmMsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG91dERhdGFcbn1cblxuQ2lwaGVyQmFzZS5wcm90b3R5cGUuX3RvU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlLCBlbmMsIGZpbikge1xuICBpZiAoIXRoaXMuX2RlY29kZXIpIHtcbiAgICB0aGlzLl9kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoZW5jKVxuICAgIHRoaXMuX2VuY29kaW5nID0gZW5jXG4gIH1cblxuICBpZiAodGhpcy5fZW5jb2RpbmcgIT09IGVuYykgdGhyb3cgbmV3IEVycm9yKCdjYW5cXCd0IHN3aXRjaCBlbmNvZGluZ3MnKVxuXG4gIHZhciBvdXQgPSB0aGlzLl9kZWNvZGVyLndyaXRlKHZhbHVlKVxuICBpZiAoZmluKSB7XG4gICAgb3V0ICs9IHRoaXMuX2RlY29kZXIuZW5kKClcbiAgfVxuXG4gIHJldHVybiBvdXRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaXBoZXJCYXNlXG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuIiwidmFyIFBvaW50ID0gcmVxdWlyZSgnLi9wb2ludCcpXG52YXIgQ3VydmUgPSByZXF1aXJlKCcuL2N1cnZlJylcblxudmFyIGdldEN1cnZlQnlOYW1lID0gcmVxdWlyZSgnLi9uYW1lcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDdXJ2ZTogQ3VydmUsXG4gIFBvaW50OiBQb2ludCxcbiAgZ2V0Q3VydmVCeU5hbWU6IGdldEN1cnZlQnlOYW1lXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG4iLCIndXNlIHN0cmljdCdcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciBNRDUgPSByZXF1aXJlKCdtZDUuanMnKVxudmFyIFJJUEVNRDE2MCA9IHJlcXVpcmUoJ3JpcGVtZDE2MCcpXG52YXIgc2hhID0gcmVxdWlyZSgnc2hhLmpzJylcbnZhciBCYXNlID0gcmVxdWlyZSgnY2lwaGVyLWJhc2UnKVxuXG5mdW5jdGlvbiBIYXNoIChoYXNoKSB7XG4gIEJhc2UuY2FsbCh0aGlzLCAnZGlnZXN0JylcblxuICB0aGlzLl9oYXNoID0gaGFzaFxufVxuXG5pbmhlcml0cyhIYXNoLCBCYXNlKVxuXG5IYXNoLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5faGFzaC51cGRhdGUoZGF0YSlcbn1cblxuSGFzaC5wcm90b3R5cGUuX2ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5faGFzaC5kaWdlc3QoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUhhc2ggKGFsZykge1xuICBhbGcgPSBhbGcudG9Mb3dlckNhc2UoKVxuICBpZiAoYWxnID09PSAnbWQ1JykgcmV0dXJuIG5ldyBNRDUoKVxuICBpZiAoYWxnID09PSAncm1kMTYwJyB8fCBhbGcgPT09ICdyaXBlbWQxNjAnKSByZXR1cm4gbmV3IFJJUEVNRDE2MCgpXG5cbiAgcmV0dXJuIG5ldyBIYXNoKHNoYShhbGcpKVxufVxuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIi8qIGpzaGludCBub2RlOiB0cnVlICovXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gQ29va2llQWNjZXNzSW5mbyhkb21haW4sIHBhdGgsIHNlY3VyZSwgc2NyaXB0KSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ29va2llQWNjZXNzSW5mbykge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW4gfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5wYXRoID0gcGF0aCB8fCBcIi9cIjtcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlID0gISFzZWN1cmU7XG4gICAgICAgICAgICB0aGlzLnNjcmlwdCA9ICEhc2NyaXB0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb29raWVBY2Nlc3NJbmZvKGRvbWFpbiwgcGF0aCwgc2VjdXJlLCBzY3JpcHQpO1xuICAgIH1cbiAgICBDb29raWVBY2Nlc3NJbmZvLkFsbCA9IE9iamVjdC5mcmVlemUoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgZXhwb3J0cy5Db29raWVBY2Nlc3NJbmZvID0gQ29va2llQWNjZXNzSW5mbztcblxuICAgIGZ1bmN0aW9uIENvb2tpZShjb29raWVzdHIsIHJlcXVlc3RfZG9tYWluLCByZXF1ZXN0X3BhdGgpIHtcbiAgICAgICAgaWYgKGNvb2tpZXN0ciBpbnN0YW5jZW9mIENvb2tpZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb2tpZXN0cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIENvb2tpZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5leHBpcmF0aW9uX2RhdGUgPSBJbmZpbml0eTtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IFN0cmluZyhyZXF1ZXN0X3BhdGggfHwgXCIvXCIpO1xuICAgICAgICAgICAgdGhpcy5leHBsaWNpdF9wYXRoID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IHJlcXVlc3RfZG9tYWluIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLmV4cGxpY2l0X2RvbWFpbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWN1cmUgPSBmYWxzZTsgLy9ob3cgdG8gZGVmaW5lIGRlZmF1bHQ/XG4gICAgICAgICAgICB0aGlzLm5vc2NyaXB0ID0gZmFsc2U7IC8vaHR0cG9ubHlcbiAgICAgICAgICAgIGlmIChjb29raWVzdHIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlKGNvb2tpZXN0ciwgcmVxdWVzdF9kb21haW4sIHJlcXVlc3RfcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvb2tpZShjb29raWVzdHIsIHJlcXVlc3RfZG9tYWluLCByZXF1ZXN0X3BhdGgpO1xuICAgIH1cbiAgICBleHBvcnRzLkNvb2tpZSA9IENvb2tpZTtcblxuICAgIENvb2tpZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgdmFyIHN0ciA9IFt0aGlzLm5hbWUgKyBcIj1cIiArIHRoaXMudmFsdWVdO1xuICAgICAgICBpZiAodGhpcy5leHBpcmF0aW9uX2RhdGUgIT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICBzdHIucHVzaChcImV4cGlyZXM9XCIgKyAobmV3IERhdGUodGhpcy5leHBpcmF0aW9uX2RhdGUpKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIHN0ci5wdXNoKFwiZG9tYWluPVwiICsgdGhpcy5kb21haW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIHN0ci5wdXNoKFwicGF0aD1cIiArIHRoaXMucGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VjdXJlKSB7XG4gICAgICAgICAgICBzdHIucHVzaChcInNlY3VyZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub3NjcmlwdCkge1xuICAgICAgICAgICAgc3RyLnB1c2goXCJodHRwb25seVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCI7IFwiKTtcbiAgICB9O1xuXG4gICAgQ29va2llLnByb3RvdHlwZS50b1ZhbHVlU3RyaW5nID0gZnVuY3Rpb24gdG9WYWx1ZVN0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiPVwiICsgdGhpcy52YWx1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGNvb2tpZV9zdHJfc3BsaXR0ZXIgPSAvWzpdKD89XFxzKlthLXpBLVowLTlfXFwtXStcXHMqWz1dKS9nO1xuICAgIENvb2tpZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzdHIsIHJlcXVlc3RfZG9tYWluLCByZXF1ZXN0X3BhdGgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDb29raWUpIHtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChcIjtcIikuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpO1xuXG4gICAgICAgICAgICB2YXIgcGFpciA9IHBhcnRzWzBdLm1hdGNoKC8oW149XSspPShbXFxzXFxTXSopLyk7XG4gICAgICAgICAgICBpZiAoIXBhaXIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIGNvb2tpZSBoZWFkZXIgZW5jb3VudGVyZWQuIEhlYWRlcjogJ1wiK3N0citcIidcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIga2V5ID0gcGFpclsxXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhaXJbMl07XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleS5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gZXh0cmFjdCB2YWx1ZXMgZnJvbSBjb29raWUgaGVhZGVyLiBDb29raWU6ICdcIitzdHIrXCInXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5uYW1lID0ga2V5O1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBwYWlyID0gcGFydHNbaV0ubWF0Y2goLyhbXj1dKykoPzo9KFtcXHNcXFNdKikpPy8pO1xuICAgICAgICAgICAgICAgIGtleSA9IHBhaXJbMV0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYWlyWzJdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImh0dHBvbmx5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9zY3JpcHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXhwaXJlc1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyYXRpb25fZGF0ZSA9IHZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoRGF0ZS5wYXJzZSh2YWx1ZSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhdGhcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gdmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnRyaW0oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBsaWNpdF9wYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvbWFpblwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbWFpbiA9IHZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50cmltKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwbGljaXRfZG9tYWluID0gISF0aGlzLmRvbWFpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlY3VyZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY3VyZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmV4cGxpY2l0X3BhdGgpIHtcbiAgICAgICAgICAgICAgIHRoaXMucGF0aCA9IHJlcXVlc3RfcGF0aCB8fCBcIi9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5leHBsaWNpdF9kb21haW4pIHtcbiAgICAgICAgICAgICAgIHRoaXMuZG9tYWluID0gcmVxdWVzdF9kb21haW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ29va2llKCkucGFyc2Uoc3RyLCByZXF1ZXN0X2RvbWFpbiwgcmVxdWVzdF9wYXRoKTtcbiAgICB9O1xuXG4gICAgQ29va2llLnByb3RvdHlwZS5tYXRjaGVzID0gZnVuY3Rpb24gbWF0Y2hlcyhhY2Nlc3NfaW5mbykge1xuICAgICAgICBpZiAoYWNjZXNzX2luZm8gPT09IENvb2tpZUFjY2Vzc0luZm8uQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9zY3JpcHQgJiYgYWNjZXNzX2luZm8uc2NyaXB0IHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN1cmUgJiYgIWFjY2Vzc19pbmZvLnNlY3VyZSB8fFxuICAgICAgICAgICAgICAgICF0aGlzLmNvbGxpZGVzV2l0aChhY2Nlc3NfaW5mbykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgQ29va2llLnByb3RvdHlwZS5jb2xsaWRlc1dpdGggPSBmdW5jdGlvbiBjb2xsaWRlc1dpdGgoYWNjZXNzX2luZm8pIHtcbiAgICAgICAgaWYgKCh0aGlzLnBhdGggJiYgIWFjY2Vzc19pbmZvLnBhdGgpIHx8ICh0aGlzLmRvbWFpbiAmJiAhYWNjZXNzX2luZm8uZG9tYWluKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhdGggJiYgYWNjZXNzX2luZm8ucGF0aC5pbmRleE9mKHRoaXMucGF0aCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5leHBsaWNpdF9wYXRoICYmIGFjY2Vzc19pbmZvLnBhdGguaW5kZXhPZiggdGhpcy5wYXRoICkgIT09IDApIHtcbiAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhY2Nlc3NfZG9tYWluID0gYWNjZXNzX2luZm8uZG9tYWluICYmIGFjY2Vzc19pbmZvLmRvbWFpbi5yZXBsYWNlKC9eW1xcLl0vLCcnKTtcbiAgICAgICAgdmFyIGNvb2tpZV9kb21haW4gPSB0aGlzLmRvbWFpbiAmJiB0aGlzLmRvbWFpbi5yZXBsYWNlKC9eW1xcLl0vLCcnKTtcbiAgICAgICAgaWYgKGNvb2tpZV9kb21haW4gPT09IGFjY2Vzc19kb21haW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb29raWVfZG9tYWluKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXhwbGljaXRfZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB3ZSBhbHJlYWR5IGNoZWNrZWQgaWYgdGhlIGRvbWFpbnMgd2VyZSBleGFjdGx5IHRoZSBzYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2lsZGNhcmQgPSBhY2Nlc3NfZG9tYWluLmluZGV4T2YoY29va2llX2RvbWFpbik7XG4gICAgICAgICAgICBpZiAod2lsZGNhcmQgPT09IC0xIHx8IHdpbGRjYXJkICE9PSBhY2Nlc3NfZG9tYWluLmxlbmd0aCAtIGNvb2tpZV9kb21haW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIENvb2tpZUphcigpIHtcbiAgICAgICAgdmFyIGNvb2tpZXMsIGNvb2tpZXNfbGlzdCwgY29sbGlkYWJsZV9jb29raWU7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ29va2llSmFyKSB7XG4gICAgICAgICAgICBjb29raWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy9uYW1lOiBbQ29va2llXVxuXG4gICAgICAgICAgICB0aGlzLnNldENvb2tpZSA9IGZ1bmN0aW9uIHNldENvb2tpZShjb29raWUsIHJlcXVlc3RfZG9tYWluLCByZXF1ZXN0X3BhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlLCBpO1xuICAgICAgICAgICAgICAgIGNvb2tpZSA9IG5ldyBDb29raWUoY29va2llLCByZXF1ZXN0X2RvbWFpbiwgcmVxdWVzdF9wYXRoKTtcbiAgICAgICAgICAgICAgICAvL0RlbGV0ZSB0aGUgY29va2llIGlmIHRoZSBzZXQgaXMgcGFzdCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gY29va2llLmV4cGlyYXRpb25fZGF0ZSA8PSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGlmIChjb29raWVzW2Nvb2tpZS5uYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZXNfbGlzdCA9IGNvb2tpZXNbY29va2llLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29va2llc19saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRhYmxlX2Nvb2tpZSA9IGNvb2tpZXNfbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRhYmxlX2Nvb2tpZS5jb2xsaWRlc1dpdGgoY29va2llKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2llc19saXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvb2tpZXNfbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb29raWVzW2Nvb2tpZS5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZXNfbGlzdFtpXSA9IGNvb2tpZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29va2llO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb29raWVzX2xpc3QucHVzaChjb29raWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29va2llO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29va2llc1tjb29raWUubmFtZV0gPSBbY29va2llXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29va2llc1tjb29raWUubmFtZV07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9yZXR1cm5zIGEgY29va2llXG4gICAgICAgICAgICB0aGlzLmdldENvb2tpZSA9IGZ1bmN0aW9uIGdldENvb2tpZShjb29raWVfbmFtZSwgYWNjZXNzX2luZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29va2llLCBpO1xuICAgICAgICAgICAgICAgIGNvb2tpZXNfbGlzdCA9IGNvb2tpZXNbY29va2llX25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghY29va2llc19saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvb2tpZXNfbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb29raWUgPSBjb29raWVzX2xpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb29raWUuZXhwaXJhdGlvbl9kYXRlIDw9IERhdGUubm93KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb29raWVzX2xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvb2tpZXNbY29va2llLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29va2llLm1hdGNoZXMoYWNjZXNzX2luZm8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29va2llO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vcmV0dXJucyBhIGxpc3Qgb2YgY29va2llc1xuICAgICAgICAgICAgdGhpcy5nZXRDb29raWVzID0gZnVuY3Rpb24gZ2V0Q29va2llcyhhY2Nlc3NfaW5mbykge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gW10sIGNvb2tpZV9uYW1lLCBjb29raWU7XG4gICAgICAgICAgICAgICAgZm9yIChjb29raWVfbmFtZSBpbiBjb29raWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZSA9IHRoaXMuZ2V0Q29va2llKGNvb2tpZV9uYW1lLCBhY2Nlc3NfaW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb29raWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChjb29raWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1hdGNoZXMudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuam9pbihcIjpcIik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtYXRjaGVzLnRvVmFsdWVTdHJpbmcgPSBmdW5jdGlvbiB0b1ZhbHVlU3RyaW5nKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLnRvVmFsdWVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignOycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvb2tpZUphcigpO1xuICAgIH1cbiAgICBleHBvcnRzLkNvb2tpZUphciA9IENvb2tpZUphcjtcblxuICAgIC8vcmV0dXJucyBsaXN0IG9mIGNvb2tpZXMgdGhhdCB3ZXJlIHNldCBjb3JyZWN0bHkuIENvb2tpZXMgdGhhdCBhcmUgZXhwaXJlZCBhbmQgcmVtb3ZlZCBhcmUgbm90IHJldHVybmVkLlxuICAgIENvb2tpZUphci5wcm90b3R5cGUuc2V0Q29va2llcyA9IGZ1bmN0aW9uIHNldENvb2tpZXMoY29va2llcywgcmVxdWVzdF9kb21haW4sIHJlcXVlc3RfcGF0aCkge1xuICAgICAgICBjb29raWVzID0gQXJyYXkuaXNBcnJheShjb29raWVzKSA/XG4gICAgICAgICAgICAgICAgY29va2llcyA6XG4gICAgICAgICAgICAgICAgY29va2llcy5zcGxpdChjb29raWVfc3RyX3NwbGl0dGVyKTtcbiAgICAgICAgdmFyIHN1Y2Nlc3NmdWwgPSBbXSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjb29raWU7XG4gICAgICAgIGNvb2tpZXMgPSBjb29raWVzLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29va2llKGl0ZW0sIHJlcXVlc3RfZG9tYWluLCByZXF1ZXN0X3BhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvb2tpZSA9IGNvb2tpZXNbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5zZXRDb29raWUoY29va2llLCByZXF1ZXN0X2RvbWFpbiwgcmVxdWVzdF9wYXRoKSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWwucHVzaChjb29raWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzZnVsO1xuICAgIH07XG59KCkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9