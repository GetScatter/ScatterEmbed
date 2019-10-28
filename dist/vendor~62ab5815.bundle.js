(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "OZ/i":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(2).Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("YuTi")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm4uanMvbGliL2JuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLENBQVE7QUFDN0IsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsU0FBUztBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBOztBQUVBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSw2QkFBNkI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsNkJBQTZCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsV0FBVztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFdBQVc7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsR0FBRztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsV0FBVztBQUM5Qjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7O0FBRUEsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0Qzs7QUFFQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYztBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLCtDQUErQztBQUNsRTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsc0NBQXNDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5QkFBeUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGNBQWM7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixRQUFRO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFLE1BQTZCIiwiZmlsZSI6InZlbmRvcn42MmFiNTgxNS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVXRpbHNcbiAgZnVuY3Rpb24gYXNzZXJ0ICh2YWwsIG1zZykge1xuICAgIGlmICghdmFsKSB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdBc3NlcnRpb24gZmFpbGVkJyk7XG4gIH1cblxuICAvLyBDb3VsZCB1c2UgYGluaGVyaXRzYCBtb2R1bGUsIGJ1dCBkb24ndCB3YW50IHRvIG1vdmUgZnJvbSBzaW5nbGUgZmlsZVxuICAvLyBhcmNoaXRlY3R1cmUgeWV0LlxuICBmdW5jdGlvbiBpbmhlcml0cyAoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge307XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZTtcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpO1xuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvcjtcbiAgfVxuXG4gIC8vIEJOXG5cbiAgZnVuY3Rpb24gQk4gKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgaWYgKEJOLmlzQk4obnVtYmVyKSkge1xuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9XG5cbiAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICB0aGlzLndvcmRzID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgICAvLyBSZWR1Y3Rpb24gY29udGV4dFxuICAgIHRoaXMucmVkID0gbnVsbDtcblxuICAgIGlmIChudW1iZXIgIT09IG51bGwpIHtcbiAgICAgIGlmIChiYXNlID09PSAnbGUnIHx8IGJhc2UgPT09ICdiZScpIHtcbiAgICAgICAgZW5kaWFuID0gYmFzZTtcbiAgICAgICAgYmFzZSA9IDEwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pbml0KG51bWJlciB8fCAwLCBiYXNlIHx8IDEwLCBlbmRpYW4gfHwgJ2JlJyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQk47XG4gIH0gZWxzZSB7XG4gICAgZXhwb3J0cy5CTiA9IEJOO1xuICB9XG5cbiAgQk4uQk4gPSBCTjtcbiAgQk4ud29yZFNpemUgPSAyNjtcblxuICB2YXIgQnVmZmVyO1xuICB0cnkge1xuICAgIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG5cbiAgQk4uaXNCTiA9IGZ1bmN0aW9uIGlzQk4gKG51bSkge1xuICAgIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bSAhPT0gbnVsbCAmJiB0eXBlb2YgbnVtID09PSAnb2JqZWN0JyAmJlxuICAgICAgbnVtLmNvbnN0cnVjdG9yLndvcmRTaXplID09PSBCTi53b3JkU2l6ZSAmJiBBcnJheS5pc0FycmF5KG51bS53b3Jkcyk7XG4gIH07XG5cbiAgQk4ubWF4ID0gZnVuY3Rpb24gbWF4IChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPiAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ubWluID0gZnVuY3Rpb24gbWluIChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPCAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gaW5pdCAobnVtYmVyLCBiYXNlLCBlbmRpYW4pIHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0TnVtYmVyKG51bWJlciwgYmFzZSwgZW5kaWFuKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0QXJyYXkobnVtYmVyLCBiYXNlLCBlbmRpYW4pO1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAnaGV4Jykge1xuICAgICAgYmFzZSA9IDE2O1xuICAgIH1cbiAgICBhc3NlcnQoYmFzZSA9PT0gKGJhc2UgfCAwKSAmJiBiYXNlID49IDIgJiYgYmFzZSA8PSAzNik7XG5cbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGlmIChudW1iZXJbMF0gPT09ICctJykge1xuICAgICAgc3RhcnQrKztcbiAgICB9XG5cbiAgICBpZiAoYmFzZSA9PT0gMTYpIHtcbiAgICAgIHRoaXMuX3BhcnNlSGV4KG51bWJlciwgc3RhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJzZUJhc2UobnVtYmVyLCBiYXNlLCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG51bWJlclswXSA9PT0gJy0nKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnN0cmlwKCk7XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICB0aGlzLl9pbml0QXJyYXkodGhpcy50b0FycmF5KCksIGJhc2UsIGVuZGlhbik7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0TnVtYmVyID0gZnVuY3Rpb24gX2luaXROdW1iZXIgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgbnVtYmVyID0gLW51bWJlcjtcbiAgICB9XG4gICAgaWYgKG51bWJlciA8IDB4NDAwMDAwMCkge1xuICAgICAgdGhpcy53b3JkcyA9IFsgbnVtYmVyICYgMHgzZmZmZmZmIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChudW1iZXIgPCAweDEwMDAwMDAwMDAwMDAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gW1xuICAgICAgICBudW1iZXIgJiAweDNmZmZmZmYsXG4gICAgICAgIChudW1iZXIgLyAweDQwMDAwMDApICYgMHgzZmZmZmZmXG4gICAgICBdO1xuICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQobnVtYmVyIDwgMHgyMDAwMDAwMDAwMDAwMCk7IC8vIDIgXiA1MyAodW5zYWZlKVxuICAgICAgdGhpcy53b3JkcyA9IFtcbiAgICAgICAgbnVtYmVyICYgMHgzZmZmZmZmLFxuICAgICAgICAobnVtYmVyIC8gMHg0MDAwMDAwKSAmIDB4M2ZmZmZmZixcbiAgICAgICAgMVxuICAgICAgXTtcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcbiAgICB9XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICAvLyBSZXZlcnNlIHRoZSBieXRlc1xuICAgIHRoaXMuX2luaXRBcnJheSh0aGlzLnRvQXJyYXkoKSwgYmFzZSwgZW5kaWFuKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2luaXRBcnJheSA9IGZ1bmN0aW9uIF9pbml0QXJyYXkgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgLy8gUGVyaGFwcyBhIFVpbnQ4QXJyYXlcbiAgICBhc3NlcnQodHlwZW9mIG51bWJlci5sZW5ndGggPT09ICdudW1iZXInKTtcbiAgICBpZiAobnVtYmVyLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IE1hdGguY2VpbChudW1iZXIubGVuZ3RoIC8gMyk7XG4gICAgdGhpcy53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICB9XG5cbiAgICB2YXIgaiwgdztcbiAgICB2YXIgb2ZmID0gMDtcbiAgICBpZiAoZW5kaWFuID09PSAnYmUnKSB7XG4gICAgICBmb3IgKGkgPSBudW1iZXIubGVuZ3RoIC0gMSwgaiA9IDA7IGkgPj0gMDsgaSAtPSAzKSB7XG4gICAgICAgIHcgPSBudW1iZXJbaV0gfCAobnVtYmVyW2kgLSAxXSA8PCA4KSB8IChudW1iZXJbaSAtIDJdIDw8IDE2KTtcbiAgICAgICAgdGhpcy53b3Jkc1tqXSB8PSAodyA8PCBvZmYpICYgMHgzZmZmZmZmO1xuICAgICAgICB0aGlzLndvcmRzW2ogKyAxXSA9ICh3ID4+PiAoMjYgLSBvZmYpKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgb2ZmICs9IDI0O1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW5kaWFuID09PSAnbGUnKSB7XG4gICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG51bWJlci5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB3ID0gbnVtYmVyW2ldIHwgKG51bWJlcltpICsgMV0gPDwgOCkgfCAobnVtYmVyW2kgKyAyXSA8PCAxNik7XG4gICAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgdGhpcy53b3Jkc1tqICsgMV0gPSAodyA+Pj4gKDI2IC0gb2ZmKSkgJiAweDNmZmZmZmY7XG4gICAgICAgIG9mZiArPSAyNDtcbiAgICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICAgIG9mZiAtPSAyNjtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXJzZUhleCAoc3RyLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSAwO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihzdHIubGVuZ3RoLCBlbmQpO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpIC0gNDg7XG5cbiAgICAgIHIgPDw9IDQ7XG5cbiAgICAgIC8vICdhJyAtICdmJ1xuICAgICAgaWYgKGMgPj0gNDkgJiYgYyA8PSA1NCkge1xuICAgICAgICByIHw9IGMgLSA0OSArIDB4YTtcblxuICAgICAgLy8gJ0EnIC0gJ0YnXG4gICAgICB9IGVsc2UgaWYgKGMgPj0gMTcgJiYgYyA8PSAyMikge1xuICAgICAgICByIHw9IGMgLSAxNyArIDB4YTtcblxuICAgICAgLy8gJzAnIC0gJzknXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByIHw9IGMgJiAweGY7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl9wYXJzZUhleCA9IGZ1bmN0aW9uIF9wYXJzZUhleCAobnVtYmVyLCBzdGFydCkge1xuICAgIC8vIENyZWF0ZSBwb3NzaWJseSBiaWdnZXIgYXJyYXkgdG8gZW5zdXJlIHRoYXQgaXQgZml0cyB0aGUgbnVtYmVyXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLmNlaWwoKG51bWJlci5sZW5ndGggLSBzdGFydCkgLyA2KTtcbiAgICB0aGlzLndvcmRzID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSAwO1xuICAgIH1cblxuICAgIHZhciBqLCB3O1xuICAgIC8vIFNjYW4gMjQtYml0IGNodW5rcyBhbmQgYWRkIHRoZW0gdG8gdGhlIG51bWJlclxuICAgIHZhciBvZmYgPSAwO1xuICAgIGZvciAoaSA9IG51bWJlci5sZW5ndGggLSA2LCBqID0gMDsgaSA+PSBzdGFydDsgaSAtPSA2KSB7XG4gICAgICB3ID0gcGFyc2VIZXgobnVtYmVyLCBpLCBpICsgNik7XG4gICAgICB0aGlzLndvcmRzW2pdIHw9ICh3IDw8IG9mZikgJiAweDNmZmZmZmY7XG4gICAgICAvLyBOT1RFOiBgMHgzZmZmZmZgIGlzIGludGVudGlvbmFsIGhlcmUsIDI2Yml0cyBtYXggc2hpZnQgKyAyNGJpdCBoZXggbGltYlxuICAgICAgdGhpcy53b3Jkc1tqICsgMV0gfD0gdyA+Pj4gKDI2IC0gb2ZmKSAmIDB4M2ZmZmZmO1xuICAgICAgb2ZmICs9IDI0O1xuICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICBvZmYgLT0gMjY7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGkgKyA2ICE9PSBzdGFydCkge1xuICAgICAgdyA9IHBhcnNlSGV4KG51bWJlciwgc3RhcnQsIGkgKyA2KTtcbiAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaiArIDFdIHw9IHcgPj4+ICgyNiAtIG9mZikgJiAweDNmZmZmZjtcbiAgICB9XG4gICAgdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHBhcnNlQmFzZSAoc3RyLCBzdGFydCwgZW5kLCBtdWwpIHtcbiAgICB2YXIgciA9IDA7XG4gICAgdmFyIGxlbiA9IE1hdGgubWluKHN0ci5sZW5ndGgsIGVuZCk7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSkgLSA0ODtcblxuICAgICAgciAqPSBtdWw7XG5cbiAgICAgIC8vICdhJ1xuICAgICAgaWYgKGMgPj0gNDkpIHtcbiAgICAgICAgciArPSBjIC0gNDkgKyAweGE7XG5cbiAgICAgIC8vICdBJ1xuICAgICAgfSBlbHNlIGlmIChjID49IDE3KSB7XG4gICAgICAgIHIgKz0gYyAtIDE3ICsgMHhhO1xuXG4gICAgICAvLyAnMCcgLSAnOSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHIgKz0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICBCTi5wcm90b3R5cGUuX3BhcnNlQmFzZSA9IGZ1bmN0aW9uIF9wYXJzZUJhc2UgKG51bWJlciwgYmFzZSwgc3RhcnQpIHtcbiAgICAvLyBJbml0aWFsaXplIGFzIHplcm9cbiAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgdGhpcy5sZW5ndGggPSAxO1xuXG4gICAgLy8gRmluZCBsZW5ndGggb2YgbGltYiBpbiBiYXNlXG4gICAgZm9yICh2YXIgbGltYkxlbiA9IDAsIGxpbWJQb3cgPSAxOyBsaW1iUG93IDw9IDB4M2ZmZmZmZjsgbGltYlBvdyAqPSBiYXNlKSB7XG4gICAgICBsaW1iTGVuKys7XG4gICAgfVxuICAgIGxpbWJMZW4tLTtcbiAgICBsaW1iUG93ID0gKGxpbWJQb3cgLyBiYXNlKSB8IDA7XG5cbiAgICB2YXIgdG90YWwgPSBudW1iZXIubGVuZ3RoIC0gc3RhcnQ7XG4gICAgdmFyIG1vZCA9IHRvdGFsICUgbGltYkxlbjtcbiAgICB2YXIgZW5kID0gTWF0aC5taW4odG90YWwsIHRvdGFsIC0gbW9kKSArIHN0YXJ0O1xuXG4gICAgdmFyIHdvcmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBsaW1iTGVuKSB7XG4gICAgICB3b3JkID0gcGFyc2VCYXNlKG51bWJlciwgaSwgaSArIGxpbWJMZW4sIGJhc2UpO1xuXG4gICAgICB0aGlzLmltdWxuKGxpbWJQb3cpO1xuICAgICAgaWYgKHRoaXMud29yZHNbMF0gKyB3b3JkIDwgMHg0MDAwMDAwKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gKz0gd29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lhZGRuKHdvcmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb2QgIT09IDApIHtcbiAgICAgIHZhciBwb3cgPSAxO1xuICAgICAgd29yZCA9IHBhcnNlQmFzZShudW1iZXIsIGksIG51bWJlci5sZW5ndGgsIGJhc2UpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbW9kOyBpKyspIHtcbiAgICAgICAgcG93ICo9IGJhc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW11bG4ocG93KTtcbiAgICAgIGlmICh0aGlzLndvcmRzWzBdICsgd29yZCA8IDB4NDAwMDAwMCkge1xuICAgICAgICB0aGlzLndvcmRzWzBdICs9IHdvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pYWRkbih3b3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5IChkZXN0KSB7XG4gICAgZGVzdC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXN0LndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXTtcbiAgICB9XG4gICAgZGVzdC5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBkZXN0Lm5lZ2F0aXZlID0gdGhpcy5uZWdhdGl2ZTtcbiAgICBkZXN0LnJlZCA9IHRoaXMucmVkO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICB2YXIgciA9IG5ldyBCTihudWxsKTtcbiAgICB0aGlzLmNvcHkocik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9leHBhbmQgPSBmdW5jdGlvbiBfZXhwYW5kIChzaXplKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgc2l6ZSkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBsZWFkaW5nIGAwYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3RyaXAgPSBmdW5jdGlvbiBzdHJpcCAoKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoID4gMSAmJiB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5fbm9ybVNpZ24gPSBmdW5jdGlvbiBfbm9ybVNpZ24gKCkge1xuICAgIC8vIC0wID0gMFxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICByZXR1cm4gKHRoaXMucmVkID8gJzxCTi1SOiAnIDogJzxCTjogJykgKyB0aGlzLnRvU3RyaW5nKDE2KSArICc+JztcbiAgfTtcblxuICAvKlxuXG4gIHZhciB6ZXJvcyA9IFtdO1xuICB2YXIgZ3JvdXBTaXplcyA9IFtdO1xuICB2YXIgZ3JvdXBCYXNlcyA9IFtdO1xuXG4gIHZhciBzID0gJyc7XG4gIHZhciBpID0gLTE7XG4gIHdoaWxlICgrK2kgPCBCTi53b3JkU2l6ZSkge1xuICAgIHplcm9zW2ldID0gcztcbiAgICBzICs9ICcwJztcbiAgfVxuICBncm91cFNpemVzWzBdID0gMDtcbiAgZ3JvdXBTaXplc1sxXSA9IDA7XG4gIGdyb3VwQmFzZXNbMF0gPSAwO1xuICBncm91cEJhc2VzWzFdID0gMDtcbiAgdmFyIGJhc2UgPSAyIC0gMTtcbiAgd2hpbGUgKCsrYmFzZSA8IDM2ICsgMSkge1xuICAgIHZhciBncm91cFNpemUgPSAwO1xuICAgIHZhciBncm91cEJhc2UgPSAxO1xuICAgIHdoaWxlIChncm91cEJhc2UgPCAoMSA8PCBCTi53b3JkU2l6ZSkgLyBiYXNlKSB7XG4gICAgICBncm91cEJhc2UgKj0gYmFzZTtcbiAgICAgIGdyb3VwU2l6ZSArPSAxO1xuICAgIH1cbiAgICBncm91cFNpemVzW2Jhc2VdID0gZ3JvdXBTaXplO1xuICAgIGdyb3VwQmFzZXNbYmFzZV0gPSBncm91cEJhc2U7XG4gIH1cblxuICAqL1xuXG4gIHZhciB6ZXJvcyA9IFtcbiAgICAnJyxcbiAgICAnMCcsXG4gICAgJzAwJyxcbiAgICAnMDAwJyxcbiAgICAnMDAwMCcsXG4gICAgJzAwMDAwJyxcbiAgICAnMDAwMDAwJyxcbiAgICAnMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCdcbiAgXTtcblxuICB2YXIgZ3JvdXBTaXplcyA9IFtcbiAgICAwLCAwLFxuICAgIDI1LCAxNiwgMTIsIDExLCAxMCwgOSwgOCxcbiAgICA4LCA3LCA3LCA3LCA3LCA2LCA2LFxuICAgIDYsIDYsIDYsIDYsIDYsIDUsIDUsXG4gICAgNSwgNSwgNSwgNSwgNSwgNSwgNSxcbiAgICA1LCA1LCA1LCA1LCA1LCA1LCA1XG4gIF07XG5cbiAgdmFyIGdyb3VwQmFzZXMgPSBbXG4gICAgMCwgMCxcbiAgICAzMzU1NDQzMiwgNDMwNDY3MjEsIDE2Nzc3MjE2LCA0ODgyODEyNSwgNjA0NjYxNzYsIDQwMzUzNjA3LCAxNjc3NzIxNixcbiAgICA0MzA0NjcyMSwgMTAwMDAwMDAsIDE5NDg3MTcxLCAzNTgzMTgwOCwgNjI3NDg1MTcsIDc1Mjk1MzYsIDExMzkwNjI1LFxuICAgIDE2Nzc3MjE2LCAyNDEzNzU2OSwgMzQwMTIyMjQsIDQ3MDQ1ODgxLCA2NDAwMDAwMCwgNDA4NDEwMSwgNTE1MzYzMixcbiAgICA2NDM2MzQzLCA3OTYyNjI0LCA5NzY1NjI1LCAxMTg4MTM3NiwgMTQzNDg5MDcsIDE3MjEwMzY4LCAyMDUxMTE0OSxcbiAgICAyNDMwMDAwMCwgMjg2MjkxNTEsIDMzNTU0NDMyLCAzOTEzNTM5MywgNDU0MzU0MjQsIDUyNTIxODc1LCA2MDQ2NjE3NlxuICBdO1xuXG4gIEJOLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nIChiYXNlLCBwYWRkaW5nKSB7XG4gICAgYmFzZSA9IGJhc2UgfHwgMTA7XG4gICAgcGFkZGluZyA9IHBhZGRpbmcgfCAwIHx8IDE7XG5cbiAgICB2YXIgb3V0O1xuICAgIGlmIChiYXNlID09PSAxNiB8fCBiYXNlID09PSAnaGV4Jykge1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgb2ZmID0gMDtcbiAgICAgIHZhciBjYXJyeSA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHcgPSB0aGlzLndvcmRzW2ldO1xuICAgICAgICB2YXIgd29yZCA9ICgoKHcgPDwgb2ZmKSB8IGNhcnJ5KSAmIDB4ZmZmZmZmKS50b1N0cmluZygxNik7XG4gICAgICAgIGNhcnJ5ID0gKHcgPj4+ICgyNCAtIG9mZikpICYgMHhmZmZmZmY7XG4gICAgICAgIGlmIChjYXJyeSAhPT0gMCB8fCBpICE9PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBvdXQgPSB6ZXJvc1s2IC0gd29yZC5sZW5ndGhdICsgd29yZCArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSB3b3JkICsgb3V0O1xuICAgICAgICB9XG4gICAgICAgIG9mZiArPSAyO1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICAgIG91dCA9IGNhcnJ5LnRvU3RyaW5nKDE2KSArIG91dDtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChvdXQubGVuZ3RoICUgcGFkZGluZyAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnLScgKyBvdXQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAoYmFzZSB8IDApICYmIGJhc2UgPj0gMiAmJiBiYXNlIDw9IDM2KSB7XG4gICAgICAvLyB2YXIgZ3JvdXBTaXplID0gTWF0aC5mbG9vcihCTi53b3JkU2l6ZSAqIE1hdGguTE4yIC8gTWF0aC5sb2coYmFzZSkpO1xuICAgICAgdmFyIGdyb3VwU2l6ZSA9IGdyb3VwU2l6ZXNbYmFzZV07XG4gICAgICAvLyB2YXIgZ3JvdXBCYXNlID0gTWF0aC5wb3coYmFzZSwgZ3JvdXBTaXplKTtcbiAgICAgIHZhciBncm91cEJhc2UgPSBncm91cEJhc2VzW2Jhc2VdO1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgYyA9IHRoaXMuY2xvbmUoKTtcbiAgICAgIGMubmVnYXRpdmUgPSAwO1xuICAgICAgd2hpbGUgKCFjLmlzWmVybygpKSB7XG4gICAgICAgIHZhciByID0gYy5tb2RuKGdyb3VwQmFzZSkudG9TdHJpbmcoYmFzZSk7XG4gICAgICAgIGMgPSBjLmlkaXZuKGdyb3VwQmFzZSk7XG5cbiAgICAgICAgaWYgKCFjLmlzWmVybygpKSB7XG4gICAgICAgICAgb3V0ID0gemVyb3NbZ3JvdXBTaXplIC0gci5sZW5ndGhdICsgciArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSByICsgb3V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1plcm8oKSkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICB3aGlsZSAob3V0Lmxlbmd0aCAlIHBhZGRpbmcgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJzAnICsgb3V0O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJy0nICsgb3V0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBhc3NlcnQoZmFsc2UsICdCYXNlIHNob3VsZCBiZSBiZXR3ZWVuIDIgYW5kIDM2Jyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIgKCkge1xuICAgIHZhciByZXQgPSB0aGlzLndvcmRzWzBdO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0ICs9IHRoaXMud29yZHNbMV0gKiAweDQwMDAwMDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PT0gMyAmJiB0aGlzLndvcmRzWzJdID09PSAweDAxKSB7XG4gICAgICAvLyBOT1RFOiBhdCB0aGlzIHN0YWdlIGl0IGlzIGtub3duIHRoYXQgdGhlIHRvcCBiaXQgaXMgc2V0XG4gICAgICByZXQgKz0gMHgxMDAwMDAwMDAwMDAwMCArICh0aGlzLndvcmRzWzFdICogMHg0MDAwMDAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMikge1xuICAgICAgYXNzZXJ0KGZhbHNlLCAnTnVtYmVyIGNhbiBvbmx5IHNhZmVseSBzdG9yZSB1cCB0byA1MyBiaXRzJyk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgPyAtcmV0IDogcmV0O1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKDE2KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudG9CdWZmZXIgPSBmdW5jdGlvbiB0b0J1ZmZlciAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpO1xuICAgIHJldHVybiB0aGlzLnRvQXJyYXlMaWtlKEJ1ZmZlciwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcy50b0FycmF5TGlrZShBcnJheSwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5TGlrZSA9IGZ1bmN0aW9uIHRvQXJyYXlMaWtlIChBcnJheVR5cGUsIGVuZGlhbiwgbGVuZ3RoKSB7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSB0aGlzLmJ5dGVMZW5ndGgoKTtcbiAgICB2YXIgcmVxTGVuZ3RoID0gbGVuZ3RoIHx8IE1hdGgubWF4KDEsIGJ5dGVMZW5ndGgpO1xuICAgIGFzc2VydChieXRlTGVuZ3RoIDw9IHJlcUxlbmd0aCwgJ2J5dGUgYXJyYXkgbG9uZ2VyIHRoYW4gZGVzaXJlZCBsZW5ndGgnKTtcbiAgICBhc3NlcnQocmVxTGVuZ3RoID4gMCwgJ1JlcXVlc3RlZCBhcnJheSBsZW5ndGggPD0gMCcpO1xuXG4gICAgdGhpcy5zdHJpcCgpO1xuICAgIHZhciBsaXR0bGVFbmRpYW4gPSBlbmRpYW4gPT09ICdsZSc7XG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheVR5cGUocmVxTGVuZ3RoKTtcblxuICAgIHZhciBiLCBpO1xuICAgIHZhciBxID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmICghbGl0dGxlRW5kaWFuKSB7XG4gICAgICAvLyBBc3N1bWUgYmlnLWVuZGlhblxuICAgICAgZm9yIChpID0gMDsgaSA8IHJlcUxlbmd0aCAtIGJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyAhcS5pc1plcm8oKTsgaSsrKSB7XG4gICAgICAgIGIgPSBxLmFuZGxuKDB4ZmYpO1xuICAgICAgICBxLml1c2hybig4KTtcblxuICAgICAgICByZXNbcmVxTGVuZ3RoIC0gaSAtIDFdID0gYjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgIXEuaXNaZXJvKCk7IGkrKykge1xuICAgICAgICBiID0gcS5hbmRsbigweGZmKTtcbiAgICAgICAgcS5pdXNocm4oOCk7XG5cbiAgICAgICAgcmVzW2ldID0gYjtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGkgPCByZXFMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgaWYgKE1hdGguY2x6MzIpIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHJldHVybiAzMiAtIE1hdGguY2x6MzIodyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHZhciB0ID0gdztcbiAgICAgIHZhciByID0gMDtcbiAgICAgIGlmICh0ID49IDB4MTAwMCkge1xuICAgICAgICByICs9IDEzO1xuICAgICAgICB0ID4+Pj0gMTM7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDQwKSB7XG4gICAgICAgIHIgKz0gNztcbiAgICAgICAgdCA+Pj49IDc7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDgpIHtcbiAgICAgICAgciArPSA0O1xuICAgICAgICB0ID4+Pj0gNDtcbiAgICAgIH1cbiAgICAgIGlmICh0ID49IDB4MDIpIHtcbiAgICAgICAgciArPSAyO1xuICAgICAgICB0ID4+Pj0gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByICsgdDtcbiAgICB9O1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl96ZXJvQml0cyA9IGZ1bmN0aW9uIF96ZXJvQml0cyAodykge1xuICAgIC8vIFNob3J0LWN1dFxuICAgIGlmICh3ID09PSAwKSByZXR1cm4gMjY7XG5cbiAgICB2YXIgdCA9IHc7XG4gICAgdmFyIHIgPSAwO1xuICAgIGlmICgodCAmIDB4MWZmZikgPT09IDApIHtcbiAgICAgIHIgKz0gMTM7XG4gICAgICB0ID4+Pj0gMTM7XG4gICAgfVxuICAgIGlmICgodCAmIDB4N2YpID09PSAwKSB7XG4gICAgICByICs9IDc7XG4gICAgICB0ID4+Pj0gNztcbiAgICB9XG4gICAgaWYgKCh0ICYgMHhmKSA9PT0gMCkge1xuICAgICAgciArPSA0O1xuICAgICAgdCA+Pj49IDQ7XG4gICAgfVxuICAgIGlmICgodCAmIDB4MykgPT09IDApIHtcbiAgICAgIHIgKz0gMjtcbiAgICAgIHQgPj4+PSAyO1xuICAgIH1cbiAgICBpZiAoKHQgJiAweDEpID09PSAwKSB7XG4gICAgICByKys7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIC8vIFJldHVybiBudW1iZXIgb2YgdXNlZCBiaXRzIGluIGEgQk5cbiAgQk4ucHJvdG90eXBlLmJpdExlbmd0aCA9IGZ1bmN0aW9uIGJpdExlbmd0aCAoKSB7XG4gICAgdmFyIHcgPSB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIGhpID0gdGhpcy5fY291bnRCaXRzKHcpO1xuICAgIHJldHVybiAodGhpcy5sZW5ndGggLSAxKSAqIDI2ICsgaGk7XG4gIH07XG5cbiAgZnVuY3Rpb24gdG9CaXRBcnJheSAobnVtKSB7XG4gICAgdmFyIHcgPSBuZXcgQXJyYXkobnVtLmJpdExlbmd0aCgpKTtcblxuICAgIGZvciAodmFyIGJpdCA9IDA7IGJpdCA8IHcubGVuZ3RoOyBiaXQrKykge1xuICAgICAgdmFyIG9mZiA9IChiaXQgLyAyNikgfCAwO1xuICAgICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgICAgd1tiaXRdID0gKG51bS53b3Jkc1tvZmZdICYgKDEgPDwgd2JpdCkpID4+PiB3Yml0O1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9XG5cbiAgLy8gTnVtYmVyIG9mIHRyYWlsaW5nIHplcm8gYml0c1xuICBCTi5wcm90b3R5cGUuemVyb0JpdHMgPSBmdW5jdGlvbiB6ZXJvQml0cyAoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpIHJldHVybiAwO1xuXG4gICAgdmFyIHIgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGIgPSB0aGlzLl96ZXJvQml0cyh0aGlzLndvcmRzW2ldKTtcbiAgICAgIHIgKz0gYjtcbiAgICAgIGlmIChiICE9PSAyNikgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gYnl0ZUxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmJpdExlbmd0aCgpIC8gOCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvVHdvcyA9IGZ1bmN0aW9uIHRvVHdvcyAod2lkdGgpIHtcbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWJzKCkuaW5vdG4od2lkdGgpLmlhZGRuKDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tVHdvcyA9IGZ1bmN0aW9uIGZyb21Ud29zICh3aWR0aCkge1xuICAgIGlmICh0aGlzLnRlc3RuKHdpZHRoIC0gMSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdG4od2lkdGgpLmlhZGRuKDEpLmluZWcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaXNOZWcgPSBmdW5jdGlvbiBpc05lZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubmVnYXRpdmUgIT09IDA7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG5lZ2F0aXZlIGNsb25lIG9mIGB0aGlzYFxuICBCTi5wcm90b3R5cGUubmVnID0gZnVuY3Rpb24gbmVnICgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmluZWcoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaW5lZyA9IGZ1bmN0aW9uIGluZWcgKCkge1xuICAgIGlmICghdGhpcy5pc1plcm8oKSkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSBePSAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdW9yID0gZnVuY3Rpb24gaXVvciAobnVtKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgbnVtLmxlbmd0aCkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldIHwgbnVtLndvcmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlvciA9IGZ1bmN0aW9uIGlvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXVvcihudW0pO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlvcihudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pb3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVvciA9IGZ1bmN0aW9uIHVvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdW9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1b3IodGhpcyk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdWFuZCA9IGZ1bmN0aW9uIGl1YW5kIChudW0pIHtcbiAgICAvLyBiID0gbWluLWxlbmd0aChudW0sIHRoaXMpXG4gICAgdmFyIGI7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkge1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYiA9IHRoaXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXSAmIG51bS53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IGIubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaWFuZCA9IGZ1bmN0aW9uIGlhbmQgKG51bSkge1xuICAgIGFzc2VydCgodGhpcy5uZWdhdGl2ZSB8IG51bS5uZWdhdGl2ZSkgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1YW5kKG51bSk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQgKG51bSkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHJldHVybiB0aGlzLmNsb25lKCkuaWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYW5kKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS51YW5kID0gZnVuY3Rpb24gdWFuZCAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pdWFuZCh0aGlzKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLml1eG9yID0gZnVuY3Rpb24gaXV4b3IgKG51bSkge1xuICAgIC8vIGEubGVuZ3RoID4gYi5sZW5ndGhcbiAgICB2YXIgYTtcbiAgICB2YXIgYjtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSB7XG4gICAgICBhID0gdGhpcztcbiAgICAgIGIgPSBudW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBudW07XG4gICAgICBiID0gdGhpcztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldIF4gYi53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcyAhPT0gYSkge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5peG9yID0gZnVuY3Rpb24gaXhvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXV4b3IobnVtKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5peG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml4b3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnV4b3IgPSBmdW5jdGlvbiB1eG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLml1eG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1eG9yKHRoaXMpO1xuICB9O1xuXG4gIC8vIE5vdCBgYHRoaXNgYCB3aXRoIGBgd2lkdGhgYCBiaXR3aWR0aFxuICBCTi5wcm90b3R5cGUuaW5vdG4gPSBmdW5jdGlvbiBpbm90biAod2lkdGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIHdpZHRoID09PSAnbnVtYmVyJyAmJiB3aWR0aCA+PSAwKTtcblxuICAgIHZhciBieXRlc05lZWRlZCA9IE1hdGguY2VpbCh3aWR0aCAvIDI2KSB8IDA7XG4gICAgdmFyIGJpdHNMZWZ0ID0gd2lkdGggJSAyNjtcblxuICAgIC8vIEV4dGVuZCB0aGUgYnVmZmVyIHdpdGggbGVhZGluZyB6ZXJvZXNcbiAgICB0aGlzLl9leHBhbmQoYnl0ZXNOZWVkZWQpO1xuXG4gICAgaWYgKGJpdHNMZWZ0ID4gMCkge1xuICAgICAgYnl0ZXNOZWVkZWQtLTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgY29tcGxldGUgd29yZHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzTmVlZGVkOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB+dGhpcy53b3Jkc1tpXSAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIHJlc2lkdWVcbiAgICBpZiAoYml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gfnRoaXMud29yZHNbaV0gJiAoMHgzZmZmZmZmID4+ICgyNiAtIGJpdHNMZWZ0KSk7XG4gICAgfVxuXG4gICAgLy8gQW5kIHJlbW92ZSBsZWFkaW5nIHplcm9lc1xuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm5vdG4gPSBmdW5jdGlvbiBub3RuICh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW5vdG4od2lkdGgpO1xuICB9O1xuXG4gIC8vIFNldCBgYml0YCBvZiBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnNldG4gPSBmdW5jdGlvbiBzZXRuIChiaXQsIHZhbCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0ID09PSAnbnVtYmVyJyAmJiBiaXQgPj0gMCk7XG5cbiAgICB2YXIgb2ZmID0gKGJpdCAvIDI2KSB8IDA7XG4gICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgIHRoaXMuX2V4cGFuZChvZmYgKyAxKTtcblxuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMud29yZHNbb2ZmXSA9IHRoaXMud29yZHNbb2ZmXSB8ICgxIDw8IHdiaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndvcmRzW29mZl0gPSB0aGlzLndvcmRzW29mZl0gJiB+KDEgPDwgd2JpdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBBZGQgYG51bWAgdG8gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pYWRkID0gZnVuY3Rpb24gaWFkZCAobnVtKSB7XG4gICAgdmFyIHI7XG5cbiAgICAvLyBuZWdhdGl2ZSArIHBvc2l0aXZlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHIgPSB0aGlzLmlzdWIobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgXj0gMTtcbiAgICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuXG4gICAgLy8gcG9zaXRpdmUgKyBuZWdhdGl2ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByID0gdGhpcy5pc3ViKG51bSk7XG4gICAgICBudW0ubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHIuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gYS5sZW5ndGggPiBiLmxlbmd0aFxuICAgIHZhciBhLCBiO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgICAgY2FycnkgPSByID4+PiAyNjtcbiAgICB9XG4gICAgZm9yICg7IGNhcnJ5ICE9PSAwICYmIGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIGNhcnJ5O1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IHIgJiAweDNmZmZmZmY7XG4gICAgICBjYXJyeSA9IHIgPj4+IDI2O1xuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoXSA9IGNhcnJ5O1xuICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAvLyBDb3B5IHRoZSByZXN0IG9mIHRoZSB3b3Jkc1xuICAgIH0gZWxzZSBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEFkZCBgbnVtYCB0byBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAobnVtKSB7XG4gICAgdmFyIHJlcztcbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwICYmIHRoaXMubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByZXMgPSB0aGlzLnN1YihudW0pO1xuICAgICAgbnVtLm5lZ2F0aXZlIF49IDE7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAobnVtLm5lZ2F0aXZlID09PSAwICYmIHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgcmVzID0gbnVtLnN1Yih0aGlzKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGQobnVtKTtcblxuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYWRkKHRoaXMpO1xuICB9O1xuXG4gIC8vIFN1YnRyYWN0IGBudW1gIGZyb20gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pc3ViID0gZnVuY3Rpb24gaXN1YiAobnVtKSB7XG4gICAgLy8gdGhpcyAtICgtbnVtKSA9IHRoaXMgKyBudW1cbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICBudW0ubmVnYXRpdmUgPSAwO1xuICAgICAgdmFyIHIgPSB0aGlzLmlhZGQobnVtKTtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gci5fbm9ybVNpZ24oKTtcblxuICAgIC8vIC10aGlzIC0gbnVtID0gLSh0aGlzICsgbnVtKVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmlhZGQobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXMuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCBib3RoIG51bWJlcnMgYXJlIHBvc2l0aXZlXG4gICAgdmFyIGNtcCA9IHRoaXMuY21wKG51bSk7XG5cbiAgICAvLyBPcHRpbWl6YXRpb24gLSB6ZXJvaWZ5XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGEgPiBiXG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGNtcCA+IDApIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSAtIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gciA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICBmb3IgKDsgY2FycnkgIT09IDAgJiYgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHIgPSAoYS53b3Jkc1tpXSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHIgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2ldID0gciAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBDb3B5IHJlc3Qgb2YgdGhlIHdvcmRzXG4gICAgaWYgKGNhcnJ5ID09PSAwICYmIGkgPCBhLmxlbmd0aCAmJiBhICE9PSB0aGlzKSB7XG4gICAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGEud29yZHNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSk7XG5cbiAgICBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBTdWJ0cmFjdCBgbnVtYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWIobnVtKTtcbiAgfTtcblxuICBmdW5jdGlvbiBzbWFsbE11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgdmFyIGxlbiA9IChzZWxmLmxlbmd0aCArIG51bS5sZW5ndGgpIHwgMDtcbiAgICBvdXQubGVuZ3RoID0gbGVuO1xuICAgIGxlbiA9IChsZW4gLSAxKSB8IDA7XG5cbiAgICAvLyBQZWVsIG9uZSBpdGVyYXRpb24gKGNvbXBpbGVyIGNhbid0IGRvIGl0LCBiZWNhdXNlIG9mIGNvZGUgY29tcGxleGl0eSlcbiAgICB2YXIgYSA9IHNlbGYud29yZHNbMF0gfCAwO1xuICAgIHZhciBiID0gbnVtLndvcmRzWzBdIHwgMDtcbiAgICB2YXIgciA9IGEgKiBiO1xuXG4gICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICB2YXIgY2FycnkgPSAociAvIDB4NDAwMDAwMCkgfCAwO1xuICAgIG91dC53b3Jkc1swXSA9IGxvO1xuXG4gICAgZm9yICh2YXIgayA9IDE7IGsgPCBsZW47IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBjYXJyeSA+Pj4gMjY7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IChrIC0gaikgfCAwO1xuICAgICAgICBhID0gc2VsZi53b3Jkc1tpXSB8IDA7XG4gICAgICAgIGIgPSBudW0ud29yZHNbal0gfCAwO1xuICAgICAgICByID0gYSAqIGIgKyByd29yZDtcbiAgICAgICAgbmNhcnJ5ICs9IChyIC8gMHg0MDAwMDAwKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkIHwgMDtcbiAgICAgIGNhcnJ5ID0gbmNhcnJ5IHwgMDtcbiAgICB9XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICBvdXQud29yZHNba10gPSBjYXJyeSB8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5sZW5ndGgtLTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LnN0cmlwKCk7XG4gIH1cblxuICAvLyBUT0RPKGluZHV0bnkpOiBpdCBtYXkgYmUgcmVhc29uYWJsZSB0byBvbWl0IGl0IGZvciB1c2VycyB3aG8gZG9uJ3QgbmVlZFxuICAvLyB0byB3b3JrIHdpdGggMjU2LWJpdCBudW1iZXJzLCBvdGhlcndpc2UgaXQgZ2l2ZXMgMjAlIGltcHJvdmVtZW50IGZvciAyNTYtYml0XG4gIC8vIG11bHRpcGxpY2F0aW9uIChsaWtlIGVsbGlwdGljIHNlY3AyNTZrMSkuXG4gIHZhciBjb21iMTBNdWxUbyA9IGZ1bmN0aW9uIGNvbWIxME11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIHZhciBhID0gc2VsZi53b3JkcztcbiAgICB2YXIgYiA9IG51bS53b3JkcztcbiAgICB2YXIgbyA9IG91dC53b3JkcztcbiAgICB2YXIgYyA9IDA7XG4gICAgdmFyIGxvO1xuICAgIHZhciBtaWQ7XG4gICAgdmFyIGhpO1xuICAgIHZhciBhMCA9IGFbMF0gfCAwO1xuICAgIHZhciBhbDAgPSBhMCAmIDB4MWZmZjtcbiAgICB2YXIgYWgwID0gYTAgPj4+IDEzO1xuICAgIHZhciBhMSA9IGFbMV0gfCAwO1xuICAgIHZhciBhbDEgPSBhMSAmIDB4MWZmZjtcbiAgICB2YXIgYWgxID0gYTEgPj4+IDEzO1xuICAgIHZhciBhMiA9IGFbMl0gfCAwO1xuICAgIHZhciBhbDIgPSBhMiAmIDB4MWZmZjtcbiAgICB2YXIgYWgyID0gYTIgPj4+IDEzO1xuICAgIHZhciBhMyA9IGFbM10gfCAwO1xuICAgIHZhciBhbDMgPSBhMyAmIDB4MWZmZjtcbiAgICB2YXIgYWgzID0gYTMgPj4+IDEzO1xuICAgIHZhciBhNCA9IGFbNF0gfCAwO1xuICAgIHZhciBhbDQgPSBhNCAmIDB4MWZmZjtcbiAgICB2YXIgYWg0ID0gYTQgPj4+IDEzO1xuICAgIHZhciBhNSA9IGFbNV0gfCAwO1xuICAgIHZhciBhbDUgPSBhNSAmIDB4MWZmZjtcbiAgICB2YXIgYWg1ID0gYTUgPj4+IDEzO1xuICAgIHZhciBhNiA9IGFbNl0gfCAwO1xuICAgIHZhciBhbDYgPSBhNiAmIDB4MWZmZjtcbiAgICB2YXIgYWg2ID0gYTYgPj4+IDEzO1xuICAgIHZhciBhNyA9IGFbN10gfCAwO1xuICAgIHZhciBhbDcgPSBhNyAmIDB4MWZmZjtcbiAgICB2YXIgYWg3ID0gYTcgPj4+IDEzO1xuICAgIHZhciBhOCA9IGFbOF0gfCAwO1xuICAgIHZhciBhbDggPSBhOCAmIDB4MWZmZjtcbiAgICB2YXIgYWg4ID0gYTggPj4+IDEzO1xuICAgIHZhciBhOSA9IGFbOV0gfCAwO1xuICAgIHZhciBhbDkgPSBhOSAmIDB4MWZmZjtcbiAgICB2YXIgYWg5ID0gYTkgPj4+IDEzO1xuICAgIHZhciBiMCA9IGJbMF0gfCAwO1xuICAgIHZhciBibDAgPSBiMCAmIDB4MWZmZjtcbiAgICB2YXIgYmgwID0gYjAgPj4+IDEzO1xuICAgIHZhciBiMSA9IGJbMV0gfCAwO1xuICAgIHZhciBibDEgPSBiMSAmIDB4MWZmZjtcbiAgICB2YXIgYmgxID0gYjEgPj4+IDEzO1xuICAgIHZhciBiMiA9IGJbMl0gfCAwO1xuICAgIHZhciBibDIgPSBiMiAmIDB4MWZmZjtcbiAgICB2YXIgYmgyID0gYjIgPj4+IDEzO1xuICAgIHZhciBiMyA9IGJbM10gfCAwO1xuICAgIHZhciBibDMgPSBiMyAmIDB4MWZmZjtcbiAgICB2YXIgYmgzID0gYjMgPj4+IDEzO1xuICAgIHZhciBiNCA9IGJbNF0gfCAwO1xuICAgIHZhciBibDQgPSBiNCAmIDB4MWZmZjtcbiAgICB2YXIgYmg0ID0gYjQgPj4+IDEzO1xuICAgIHZhciBiNSA9IGJbNV0gfCAwO1xuICAgIHZhciBibDUgPSBiNSAmIDB4MWZmZjtcbiAgICB2YXIgYmg1ID0gYjUgPj4+IDEzO1xuICAgIHZhciBiNiA9IGJbNl0gfCAwO1xuICAgIHZhciBibDYgPSBiNiAmIDB4MWZmZjtcbiAgICB2YXIgYmg2ID0gYjYgPj4+IDEzO1xuICAgIHZhciBiNyA9IGJbN10gfCAwO1xuICAgIHZhciBibDcgPSBiNyAmIDB4MWZmZjtcbiAgICB2YXIgYmg3ID0gYjcgPj4+IDEzO1xuICAgIHZhciBiOCA9IGJbOF0gfCAwO1xuICAgIHZhciBibDggPSBiOCAmIDB4MWZmZjtcbiAgICB2YXIgYmg4ID0gYjggPj4+IDEzO1xuICAgIHZhciBiOSA9IGJbOV0gfCAwO1xuICAgIHZhciBibDkgPSBiOSAmIDB4MWZmZjtcbiAgICB2YXIgYmg5ID0gYjkgPj4+IDEzO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0gc2VsZi5uZWdhdGl2ZSBeIG51bS5uZWdhdGl2ZTtcbiAgICBvdXQubGVuZ3RoID0gMTk7XG4gICAgLyogayA9IDAgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDAsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMCwgYmgwKTtcbiAgICB2YXIgdzAgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcwID4+PiAyNikpIHwgMDtcbiAgICB3MCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDEsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDEpKSB8IDA7XG4gICAgdmFyIHcxID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MSA+Pj4gMjYpKSB8IDA7XG4gICAgdzEgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSAyICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWwyLCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDIsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDIsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDIsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMikpIHwgMDtcbiAgICB2YXIgdzIgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcyID4+PiAyNikpIHwgMDtcbiAgICB3MiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDMgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDMsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMykpIHwgMDtcbiAgICB2YXIgdzMgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHczID4+PiAyNikpIHwgMDtcbiAgICB3MyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDQgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDQsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNCwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDQpKSB8IDA7XG4gICAgdmFyIHc0ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NCA+Pj4gMjYpKSB8IDA7XG4gICAgdzQgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA1ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw1LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDUsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDUsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDUsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNSkpIHwgMDtcbiAgICB2YXIgdzUgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc1ID4+PiAyNikpIHwgMDtcbiAgICB3NSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDYgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDYsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNiwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNiwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNiwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNikpIHwgMDtcbiAgICB2YXIgdzYgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc2ID4+PiAyNikpIHwgMDtcbiAgICB3NiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDcgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDcsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDcpKSB8IDA7XG4gICAgdmFyIHc3ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NyA+Pj4gMjYpKSB8IDA7XG4gICAgdzcgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA4ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw4LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDgsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDgsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDgsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNSkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDYpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDYpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw3KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg3KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOCkpIHwgMDtcbiAgICB2YXIgdzggPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc4ID4+PiAyNikpIHwgMDtcbiAgICB3OCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDkgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzkgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc5ID4+PiAyNikpIHwgMDtcbiAgICB3OSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEwICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDEpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEwID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTAgPj4+IDI2KSkgfCAwO1xuICAgIHcxMCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDExICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDIpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMik7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMikpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMik7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwzKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgzKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNCkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDUpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDUpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTEgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxMSA+Pj4gMjYpKSB8IDA7XG4gICAgdzExICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTIgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMyk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgzKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwzKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgzKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEyID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTIgPj4+IDI2KSkgfCAwO1xuICAgIHcxMiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEzICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDQpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEzID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTMgPj4+IDI2KSkgfCAwO1xuICAgIHcxMyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE0ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDUpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTQgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNCA+Pj4gMjYpKSB8IDA7XG4gICAgdzE0ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTUgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsNik7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg2KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw2KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg2KTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE1ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTUgPj4+IDI2KSkgfCAwO1xuICAgIHcxNSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE2ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDcpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNyk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNykpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNyk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE2ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTYgPj4+IDI2KSkgfCAwO1xuICAgIHcxNiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE3ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDgpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoOCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsOCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoOCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTcgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNyA+Pj4gMjYpKSB8IDA7XG4gICAgdzE3ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTggKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsOSk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg5KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw5KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg5KTtcbiAgICB2YXIgdzE4ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTggPj4+IDI2KSkgfCAwO1xuICAgIHcxOCAmPSAweDNmZmZmZmY7XG4gICAgb1swXSA9IHcwO1xuICAgIG9bMV0gPSB3MTtcbiAgICBvWzJdID0gdzI7XG4gICAgb1szXSA9IHczO1xuICAgIG9bNF0gPSB3NDtcbiAgICBvWzVdID0gdzU7XG4gICAgb1s2XSA9IHc2O1xuICAgIG9bN10gPSB3NztcbiAgICBvWzhdID0gdzg7XG4gICAgb1s5XSA9IHc5O1xuICAgIG9bMTBdID0gdzEwO1xuICAgIG9bMTFdID0gdzExO1xuICAgIG9bMTJdID0gdzEyO1xuICAgIG9bMTNdID0gdzEzO1xuICAgIG9bMTRdID0gdzE0O1xuICAgIG9bMTVdID0gdzE1O1xuICAgIG9bMTZdID0gdzE2O1xuICAgIG9bMTddID0gdzE3O1xuICAgIG9bMThdID0gdzE4O1xuICAgIGlmIChjICE9PSAwKSB7XG4gICAgICBvWzE5XSA9IGM7XG4gICAgICBvdXQubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgLy8gUG9seWZpbGwgY29tYlxuICBpZiAoIU1hdGguaW11bCkge1xuICAgIGNvbWIxME11bFRvID0gc21hbGxNdWxUbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpZ011bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHNlbGYubGVuZ3RoICsgbnVtLmxlbmd0aDtcblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgdmFyIGhuY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgb3V0Lmxlbmd0aCAtIDE7IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBobmNhcnJ5O1xuICAgICAgaG5jYXJyeSA9IDA7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IGsgLSBqO1xuICAgICAgICB2YXIgYSA9IHNlbGYud29yZHNbaV0gfCAwO1xuICAgICAgICB2YXIgYiA9IG51bS53b3Jkc1tqXSB8IDA7XG4gICAgICAgIHZhciByID0gYSAqIGI7XG5cbiAgICAgICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgICAgbmNhcnJ5ID0gKG5jYXJyeSArICgociAvIDB4NDAwMDAwMCkgfCAwKSkgfCAwO1xuICAgICAgICBsbyA9IChsbyArIHJ3b3JkKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gbG8gJiAweDNmZmZmZmY7XG4gICAgICAgIG5jYXJyeSA9IChuY2FycnkgKyAobG8gPj4+IDI2KSkgfCAwO1xuXG4gICAgICAgIGhuY2FycnkgKz0gbmNhcnJ5ID4+PiAyNjtcbiAgICAgICAgbmNhcnJ5ICY9IDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkO1xuICAgICAgY2FycnkgPSBuY2Fycnk7XG4gICAgICBuY2FycnkgPSBobmNhcnJ5O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIG91dC53b3Jkc1trXSA9IGNhcnJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQubGVuZ3RoLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtYm9NdWxUbyAoc2VsZiwgbnVtLCBvdXQpIHtcbiAgICB2YXIgZmZ0bSA9IG5ldyBGRlRNKCk7XG4gICAgcmV0dXJuIGZmdG0ubXVscChzZWxmLCBudW0sIG91dCk7XG4gIH1cblxuICBCTi5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiBtdWxUbyAobnVtLCBvdXQpIHtcbiAgICB2YXIgcmVzO1xuICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCArIG51bS5sZW5ndGg7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxMCAmJiBudW0ubGVuZ3RoID09PSAxMCkge1xuICAgICAgcmVzID0gY29tYjEwTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgNjMpIHtcbiAgICAgIHJlcyA9IHNtYWxsTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgMTAyNCkge1xuICAgICAgcmVzID0gYmlnTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBqdW1ib011bFRvKHRoaXMsIG51bSwgb3V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIENvb2xleS1UdWtleSBhbGdvcml0aG0gZm9yIEZGVFxuICAvLyBzbGlnaHRseSByZXZpc2l0ZWQgdG8gcmVseSBvbiBsb29waW5nIGluc3RlYWQgb2YgcmVjdXJzaW9uXG5cbiAgZnVuY3Rpb24gRkZUTSAoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIEZGVE0ucHJvdG90eXBlLm1ha2VSQlQgPSBmdW5jdGlvbiBtYWtlUkJUIChOKSB7XG4gICAgdmFyIHQgPSBuZXcgQXJyYXkoTik7XG4gICAgdmFyIGwgPSBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyhOKSAtIDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIHRbaV0gPSB0aGlzLnJldkJpbihpLCBsLCBOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdDtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGJpbmFyeS1yZXZlcnNlZCByZXByZXNlbnRhdGlvbiBvZiBgeGBcbiAgRkZUTS5wcm90b3R5cGUucmV2QmluID0gZnVuY3Rpb24gcmV2QmluICh4LCBsLCBOKSB7XG4gICAgaWYgKHggPT09IDAgfHwgeCA9PT0gTiAtIDEpIHJldHVybiB4O1xuXG4gICAgdmFyIHJiID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgcmIgfD0gKHggJiAxKSA8PCAobCAtIGkgLSAxKTtcbiAgICAgIHggPj49IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJiO1xuICB9O1xuXG4gIC8vIFBlcmZvcm1zIFwidHdlZWRsaW5nXCIgcGhhc2UsIHRoZXJlZm9yZSAnZW11bGF0aW5nJ1xuICAvLyBiZWhhdmlvdXIgb2YgdGhlIHJlY3Vyc2l2ZSBhbGdvcml0aG1cbiAgRkZUTS5wcm90b3R5cGUucGVybXV0ZSA9IGZ1bmN0aW9uIHBlcm11dGUgKHJidCwgcndzLCBpd3MsIHJ0d3MsIGl0d3MsIE4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcnR3c1tpXSA9IHJ3c1tyYnRbaV1dO1xuICAgICAgaXR3c1tpXSA9IGl3c1tyYnRbaV1dO1xuICAgIH1cbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiB0cmFuc2Zvcm0gKHJ3cywgaXdzLCBydHdzLCBpdHdzLCBOLCByYnQpIHtcbiAgICB0aGlzLnBlcm11dGUocmJ0LCByd3MsIGl3cywgcnR3cywgaXR3cywgTik7XG5cbiAgICBmb3IgKHZhciBzID0gMTsgcyA8IE47IHMgPDw9IDEpIHtcbiAgICAgIHZhciBsID0gcyA8PCAxO1xuXG4gICAgICB2YXIgcnR3ZGYgPSBNYXRoLmNvcygyICogTWF0aC5QSSAvIGwpO1xuICAgICAgdmFyIGl0d2RmID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgLyBsKTtcblxuICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBOOyBwICs9IGwpIHtcbiAgICAgICAgdmFyIHJ0d2RmXyA9IHJ0d2RmO1xuICAgICAgICB2YXIgaXR3ZGZfID0gaXR3ZGY7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmUgPSBydHdzW3AgKyBqXTtcbiAgICAgICAgICB2YXIgaWUgPSBpdHdzW3AgKyBqXTtcblxuICAgICAgICAgIHZhciBybyA9IHJ0d3NbcCArIGogKyBzXTtcbiAgICAgICAgICB2YXIgaW8gPSBpdHdzW3AgKyBqICsgc107XG5cbiAgICAgICAgICB2YXIgcnggPSBydHdkZl8gKiBybyAtIGl0d2RmXyAqIGlvO1xuXG4gICAgICAgICAgaW8gPSBydHdkZl8gKiBpbyArIGl0d2RmXyAqIHJvO1xuICAgICAgICAgIHJvID0gcng7XG5cbiAgICAgICAgICBydHdzW3AgKyBqXSA9IHJlICsgcm87XG4gICAgICAgICAgaXR3c1twICsgal0gPSBpZSArIGlvO1xuXG4gICAgICAgICAgcnR3c1twICsgaiArIHNdID0gcmUgLSBybztcbiAgICAgICAgICBpdHdzW3AgKyBqICsgc10gPSBpZSAtIGlvO1xuXG4gICAgICAgICAgLyoganNoaW50IG1heGRlcHRoIDogZmFsc2UgKi9cbiAgICAgICAgICBpZiAoaiAhPT0gbCkge1xuICAgICAgICAgICAgcnggPSBydHdkZiAqIHJ0d2RmXyAtIGl0d2RmICogaXR3ZGZfO1xuXG4gICAgICAgICAgICBpdHdkZl8gPSBydHdkZiAqIGl0d2RmXyArIGl0d2RmICogcnR3ZGZfO1xuICAgICAgICAgICAgcnR3ZGZfID0gcng7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLmd1ZXNzTGVuMTNiID0gZnVuY3Rpb24gZ3Vlc3NMZW4xM2IgKG4sIG0pIHtcbiAgICB2YXIgTiA9IE1hdGgubWF4KG0sIG4pIHwgMTtcbiAgICB2YXIgb2RkID0gTiAmIDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoTiA9IE4gLyAyIHwgMDsgTjsgTiA9IE4gPj4+IDEpIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gMSA8PCBpICsgMSArIG9kZDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb25qdWdhdGUgPSBmdW5jdGlvbiBjb25qdWdhdGUgKHJ3cywgaXdzLCBOKSB7XG4gICAgaWYgKE4gPD0gMSkgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOIC8gMjsgaSsrKSB7XG4gICAgICB2YXIgdCA9IHJ3c1tpXTtcblxuICAgICAgcndzW2ldID0gcndzW04gLSBpIC0gMV07XG4gICAgICByd3NbTiAtIGkgLSAxXSA9IHQ7XG5cbiAgICAgIHQgPSBpd3NbaV07XG5cbiAgICAgIGl3c1tpXSA9IC1pd3NbTiAtIGkgLSAxXTtcbiAgICAgIGl3c1tOIC0gaSAtIDFdID0gLXQ7XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLm5vcm1hbGl6ZTEzYiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZTEzYiAod3MsIE4pIHtcbiAgICB2YXIgY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTiAvIDI7IGkrKykge1xuICAgICAgdmFyIHcgPSBNYXRoLnJvdW5kKHdzWzIgKiBpICsgMV0gLyBOKSAqIDB4MjAwMCArXG4gICAgICAgIE1hdGgucm91bmQod3NbMiAqIGldIC8gTikgK1xuICAgICAgICBjYXJyeTtcblxuICAgICAgd3NbaV0gPSB3ICYgMHgzZmZmZmZmO1xuXG4gICAgICBpZiAodyA8IDB4NDAwMDAwMCkge1xuICAgICAgICBjYXJyeSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXJyeSA9IHcgLyAweDQwMDAwMDAgfCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3cztcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb252ZXJ0MTNiID0gZnVuY3Rpb24gY29udmVydDEzYiAod3MsIGxlbiwgcndzLCBOKSB7XG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjYXJyeSA9IGNhcnJ5ICsgKHdzW2ldIHwgMCk7XG5cbiAgICAgIHJ3c1syICogaV0gPSBjYXJyeSAmIDB4MWZmZjsgY2FycnkgPSBjYXJyeSA+Pj4gMTM7XG4gICAgICByd3NbMiAqIGkgKyAxXSA9IGNhcnJ5ICYgMHgxZmZmOyBjYXJyeSA9IGNhcnJ5ID4+PiAxMztcbiAgICB9XG5cbiAgICAvLyBQYWQgd2l0aCB6ZXJvZXNcbiAgICBmb3IgKGkgPSAyICogbGVuOyBpIDwgTjsgKytpKSB7XG4gICAgICByd3NbaV0gPSAwO1xuICAgIH1cblxuICAgIGFzc2VydChjYXJyeSA9PT0gMCk7XG4gICAgYXNzZXJ0KChjYXJyeSAmIH4weDFmZmYpID09PSAwKTtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5zdHViID0gZnVuY3Rpb24gc3R1YiAoTikge1xuICAgIHZhciBwaCA9IG5ldyBBcnJheShOKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcGhbaV0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBwaDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5tdWxwID0gZnVuY3Rpb24gbXVscCAoeCwgeSwgb3V0KSB7XG4gICAgdmFyIE4gPSAyICogdGhpcy5ndWVzc0xlbjEzYih4Lmxlbmd0aCwgeS5sZW5ndGgpO1xuXG4gICAgdmFyIHJidCA9IHRoaXMubWFrZVJCVChOKTtcblxuICAgIHZhciBfID0gdGhpcy5zdHViKE4pO1xuXG4gICAgdmFyIHJ3cyA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgcndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgaXdzdCA9IG5ldyBBcnJheShOKTtcblxuICAgIHZhciBucndzID0gbmV3IEFycmF5KE4pO1xuICAgIHZhciBucndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgbml3c3QgPSBuZXcgQXJyYXkoTik7XG5cbiAgICB2YXIgcm13cyA9IG91dC53b3JkcztcbiAgICBybXdzLmxlbmd0aCA9IE47XG5cbiAgICB0aGlzLmNvbnZlcnQxM2IoeC53b3JkcywgeC5sZW5ndGgsIHJ3cywgTik7XG4gICAgdGhpcy5jb252ZXJ0MTNiKHkud29yZHMsIHkubGVuZ3RoLCBucndzLCBOKTtcblxuICAgIHRoaXMudHJhbnNmb3JtKHJ3cywgXywgcndzdCwgaXdzdCwgTiwgcmJ0KTtcbiAgICB0aGlzLnRyYW5zZm9ybShucndzLCBfLCBucndzdCwgbml3c3QsIE4sIHJidCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgdmFyIHJ4ID0gcndzdFtpXSAqIG5yd3N0W2ldIC0gaXdzdFtpXSAqIG5pd3N0W2ldO1xuICAgICAgaXdzdFtpXSA9IHJ3c3RbaV0gKiBuaXdzdFtpXSArIGl3c3RbaV0gKiBucndzdFtpXTtcbiAgICAgIHJ3c3RbaV0gPSByeDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmp1Z2F0ZShyd3N0LCBpd3N0LCBOKTtcbiAgICB0aGlzLnRyYW5zZm9ybShyd3N0LCBpd3N0LCBybXdzLCBfLCBOLCByYnQpO1xuICAgIHRoaXMuY29uanVnYXRlKHJtd3MsIF8sIE4pO1xuICAgIHRoaXMubm9ybWFsaXplMTNiKHJtd3MsIE4pO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0geC5uZWdhdGl2ZSBeIHkubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHgubGVuZ3RoICsgeS5sZW5ndGg7XG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIE11bHRpcGx5IGB0aGlzYCBieSBgbnVtYFxuICBCTi5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsIChudW0pIHtcbiAgICB2YXIgb3V0ID0gbmV3IEJOKG51bGwpO1xuICAgIG91dC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCArIG51bS5sZW5ndGgpO1xuICAgIHJldHVybiB0aGlzLm11bFRvKG51bSwgb3V0KTtcbiAgfTtcblxuICAvLyBNdWx0aXBseSBlbXBsb3lpbmcgRkZUXG4gIEJOLnByb3RvdHlwZS5tdWxmID0gZnVuY3Rpb24gbXVsZiAobnVtKSB7XG4gICAgdmFyIG91dCA9IG5ldyBCTihudWxsKTtcbiAgICBvdXQud29yZHMgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGggKyBudW0ubGVuZ3RoKTtcbiAgICByZXR1cm4ganVtYm9NdWxUbyh0aGlzLCBudW0sIG91dCk7XG4gIH07XG5cbiAgLy8gSW4tcGxhY2UgTXVsdGlwbGljYXRpb25cbiAgQk4ucHJvdG90eXBlLmltdWwgPSBmdW5jdGlvbiBpbXVsIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLm11bFRvKG51bSwgdGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmltdWxuID0gZnVuY3Rpb24gaW11bG4gKG51bSkge1xuICAgIGFzc2VydCh0eXBlb2YgbnVtID09PSAnbnVtYmVyJyk7XG4gICAgYXNzZXJ0KG51bSA8IDB4NDAwMDAwMCk7XG5cbiAgICAvLyBDYXJyeVxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9ICh0aGlzLndvcmRzW2ldIHwgMCkgKiBudW07XG4gICAgICB2YXIgbG8gPSAodyAmIDB4M2ZmZmZmZikgKyAoY2FycnkgJiAweDNmZmZmZmYpO1xuICAgICAgY2FycnkgPj49IDI2O1xuICAgICAgY2FycnkgKz0gKHcgLyAweDQwMDAwMDApIHwgMDtcbiAgICAgIC8vIE5PVEU6IGxvIGlzIDI3Yml0IG1heGltdW1cbiAgICAgIGNhcnJ5ICs9IGxvID4+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBsbyAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm11bG4gPSBmdW5jdGlvbiBtdWxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmltdWxuKG51bSk7XG4gIH07XG5cbiAgLy8gYHRoaXNgICogYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5zcXIgPSBmdW5jdGlvbiBzcXIgKCkge1xuICAgIHJldHVybiB0aGlzLm11bCh0aGlzKTtcbiAgfTtcblxuICAvLyBgdGhpc2AgKiBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLmlzcXIgPSBmdW5jdGlvbiBpc3FyICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbXVsKHRoaXMuY2xvbmUoKSk7XG4gIH07XG5cbiAgLy8gTWF0aC5wb3coYHRoaXNgLCBgbnVtYClcbiAgQk4ucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIHBvdyAobnVtKSB7XG4gICAgdmFyIHcgPSB0b0JpdEFycmF5KG51bSk7XG4gICAgaWYgKHcubGVuZ3RoID09PSAwKSByZXR1cm4gbmV3IEJOKDEpO1xuXG4gICAgLy8gU2tpcCBsZWFkaW5nIHplcm9lc1xuICAgIHZhciByZXMgPSB0aGlzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdy5sZW5ndGg7IGkrKywgcmVzID0gcmVzLnNxcigpKSB7XG4gICAgICBpZiAod1tpXSAhPT0gMCkgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCsraSA8IHcubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBxID0gcmVzLnNxcigpOyBpIDwgdy5sZW5ndGg7IGkrKywgcSA9IHEuc3FyKCkpIHtcbiAgICAgICAgaWYgKHdbaV0gPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIHJlcyA9IHJlcy5tdWwocSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICAvLyBTaGlmdC1sZWZ0IGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdXNobG4gPSBmdW5jdGlvbiBpdXNobG4gKGJpdHMpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdHMgPT09ICdudW1iZXInICYmIGJpdHMgPj0gMCk7XG4gICAgdmFyIHIgPSBiaXRzICUgMjY7XG4gICAgdmFyIHMgPSAoYml0cyAtIHIpIC8gMjY7XG4gICAgdmFyIGNhcnJ5TWFzayA9ICgweDNmZmZmZmYgPj4+ICgyNiAtIHIpKSA8PCAoMjYgLSByKTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChyICE9PSAwKSB7XG4gICAgICB2YXIgY2FycnkgPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmV3Q2FycnkgPSB0aGlzLndvcmRzW2ldICYgY2FycnlNYXNrO1xuICAgICAgICB2YXIgYyA9ICgodGhpcy53b3Jkc1tpXSB8IDApIC0gbmV3Q2FycnkpIDw8IHI7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBjIHwgY2Fycnk7XG4gICAgICAgIGNhcnJ5ID0gbmV3Q2FycnkgPj4+ICgyNiAtIHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGNhcnJ5O1xuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMud29yZHNbaSArIHNdID0gdGhpcy53b3Jkc1tpXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IHM7IGkrKykge1xuICAgICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sZW5ndGggKz0gcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hsbiA9IGZ1bmN0aW9uIGlzaGxuIChiaXRzKSB7XG4gICAgLy8gVE9ETyhpbmR1dG55KTogaW1wbGVtZW50IG1lXG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1c2hsbihiaXRzKTtcbiAgfTtcblxuICAvLyBTaGlmdC1yaWdodCBpbi1wbGFjZVxuICAvLyBOT1RFOiBgaGludGAgaXMgYSBsb3dlc3QgYml0IGJlZm9yZSB0cmFpbGluZyB6ZXJvZXNcbiAgLy8gTk9URTogaWYgYGV4dGVuZGVkYCBpcyBwcmVzZW50IC0gaXQgd2lsbCBiZSBmaWxsZWQgd2l0aCBkZXN0cm95ZWQgYml0c1xuICBCTi5wcm90b3R5cGUuaXVzaHJuID0gZnVuY3Rpb24gaXVzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgaDtcbiAgICBpZiAoaGludCkge1xuICAgICAgaCA9IChoaW50IC0gKGhpbnQgJSAyNikpIC8gMjY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSAwO1xuICAgIH1cblxuICAgIHZhciByID0gYml0cyAlIDI2O1xuICAgIHZhciBzID0gTWF0aC5taW4oKGJpdHMgLSByKSAvIDI2LCB0aGlzLmxlbmd0aCk7XG4gICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgdmFyIG1hc2tlZFdvcmRzID0gZXh0ZW5kZWQ7XG5cbiAgICBoIC09IHM7XG4gICAgaCA9IE1hdGgubWF4KDAsIGgpO1xuXG4gICAgLy8gRXh0ZW5kZWQgbW9kZSwgY29weSBtYXNrZWQgcGFydFxuICAgIGlmIChtYXNrZWRXb3Jkcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcbiAgICAgICAgbWFza2VkV29yZHMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldO1xuICAgICAgfVxuICAgICAgbWFza2VkV29yZHMubGVuZ3RoID0gcztcbiAgICB9XG5cbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgLy8gTm8tb3AsIHdlIHNob3VsZCBub3QgbW92ZSBhbnl0aGluZyBhdCBhbGxcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gcykge1xuICAgICAgdGhpcy5sZW5ndGggLT0gcztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2kgKyBzXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53b3Jkc1swXSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfVxuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMCAmJiAoY2FycnkgIT09IDAgfHwgaSA+PSBoKTsgaS0tKSB7XG4gICAgICB2YXIgd29yZCA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IChjYXJyeSA8PCAoMjYgLSByKSkgfCAod29yZCA+Pj4gcik7XG4gICAgICBjYXJyeSA9IHdvcmQgJiBtYXNrO1xuICAgIH1cblxuICAgIC8vIFB1c2ggY2FycmllZCBiaXRzIGFzIGEgbWFza1xuICAgIGlmIChtYXNrZWRXb3JkcyAmJiBjYXJyeSAhPT0gMCkge1xuICAgICAgbWFza2VkV29yZHMud29yZHNbbWFza2VkV29yZHMubGVuZ3RoKytdID0gY2Fycnk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hybiA9IGZ1bmN0aW9uIGlzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIC8vIFRPRE8oaW5kdXRueSk6IGltcGxlbWVudCBtZVxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwKTtcbiAgICByZXR1cm4gdGhpcy5pdXNocm4oYml0cywgaGludCwgZXh0ZW5kZWQpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LWxlZnRcbiAgQk4ucHJvdG90eXBlLnNobG4gPSBmdW5jdGlvbiBzaGxuIChiaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pc2hsbihiaXRzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudXNobG4gPSBmdW5jdGlvbiB1c2hsbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXVzaGxuKGJpdHMpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LXJpZ2h0XG4gIEJOLnByb3RvdHlwZS5zaHJuID0gZnVuY3Rpb24gc2hybiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXNocm4oYml0cyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVzaHJuID0gZnVuY3Rpb24gdXNocm4gKGJpdHMpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLml1c2hybihiaXRzKTtcbiAgfTtcblxuICAvLyBUZXN0IGlmIG4gYml0IGlzIHNldFxuICBCTi5wcm90b3R5cGUudGVzdG4gPSBmdW5jdGlvbiB0ZXN0biAoYml0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBiaXQgPT09ICdudW1iZXInICYmIGJpdCA+PSAwKTtcbiAgICB2YXIgciA9IGJpdCAlIDI2O1xuICAgIHZhciBzID0gKGJpdCAtIHIpIC8gMjY7XG4gICAgdmFyIHEgPSAxIDw8IHI7XG5cbiAgICAvLyBGYXN0IGNhc2U6IGJpdCBpcyBtdWNoIGhpZ2hlciB0aGFuIGFsbCBleGlzdGluZyB3b3Jkc1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSBzKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBiaXQgYW5kIHJldHVyblxuICAgIHZhciB3ID0gdGhpcy53b3Jkc1tzXTtcblxuICAgIHJldHVybiAhISh3ICYgcSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG9ubHkgbG93ZXJzIGJpdHMgb2YgbnVtYmVyIChpbi1wbGFjZSlcbiAgQk4ucHJvdG90eXBlLmltYXNrbiA9IGZ1bmN0aW9uIGltYXNrbiAoYml0cykge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgciA9IGJpdHMgJSAyNjtcbiAgICB2YXIgcyA9IChiaXRzIC0gcikgLyAyNjtcblxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwLCAnaW1hc2tuIHdvcmtzIG9ubHkgd2l0aCBwb3NpdGl2ZSBudW1iZXJzJyk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPD0gcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHIgIT09IDApIHtcbiAgICAgIHMrKztcbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1pbihzLCB0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAociAhPT0gMCkge1xuICAgICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gJj0gbWFzaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIFJldHVybiBvbmx5IGxvd2VycyBiaXRzIG9mIG51bWJlclxuICBCTi5wcm90b3R5cGUubWFza24gPSBmdW5jdGlvbiBtYXNrbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW1hc2tuKGJpdHMpO1xuICB9O1xuXG4gIC8vIEFkZCBwbGFpbiBudW1iZXIgYG51bWAgdG8gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pYWRkbiA9IGZ1bmN0aW9uIGlhZGRuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pc3VibigtbnVtKTtcblxuICAgIC8vIFBvc3NpYmxlIHNpZ24gY2hhbmdlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiAodGhpcy53b3Jkc1swXSB8IDApIDwgbnVtKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gPSBudW0gLSAodGhpcy53b3Jkc1swXSB8IDApO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgdGhpcy5pc3VibihudW0pO1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aG91dCBjaGVja3NcbiAgICByZXR1cm4gdGhpcy5faWFkZG4obnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2lhZGRuID0gZnVuY3Rpb24gX2lhZGRuIChudW0pIHtcbiAgICB0aGlzLndvcmRzWzBdICs9IG51bTtcblxuICAgIC8vIENhcnJ5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldID49IDB4NDAwMDAwMDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldIC09IDB4NDAwMDAwMDtcbiAgICAgIGlmIChpID09PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0gPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0rKztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSArIDEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gU3VidHJhY3QgcGxhaW4gbnVtYmVyIGBudW1gIGZyb20gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pc3VibiA9IGZ1bmN0aW9uIGlzdWJuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pYWRkbigtbnVtKTtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHRoaXMuaWFkZG4obnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy53b3Jkc1swXSAtPSBudW07XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEgJiYgdGhpcy53b3Jkc1swXSA8IDApIHtcbiAgICAgIHRoaXMud29yZHNbMF0gPSAtdGhpcy53b3Jkc1swXTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDYXJyeVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldIDwgMDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gKz0gMHg0MDAwMDAwO1xuICAgICAgICB0aGlzLndvcmRzW2kgKyAxXSAtPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmFkZG4gPSBmdW5jdGlvbiBhZGRuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGRuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnN1Ym4gPSBmdW5jdGlvbiBzdWJuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWJuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlhYnMgPSBmdW5jdGlvbiBpYWJzICgpIHtcbiAgICB0aGlzLm5lZ2F0aXZlID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5hYnMgPSBmdW5jdGlvbiBhYnMgKCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaWFicygpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5faXNobG5zdWJtdWwgPSBmdW5jdGlvbiBfaXNobG5zdWJtdWwgKG51bSwgbXVsLCBzaGlmdCkge1xuICAgIHZhciBsZW4gPSBudW0ubGVuZ3RoICsgc2hpZnQ7XG4gICAgdmFyIGk7XG5cbiAgICB0aGlzLl9leHBhbmQobGVuKTtcblxuICAgIHZhciB3O1xuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG51bS5sZW5ndGg7IGkrKykge1xuICAgICAgdyA9ICh0aGlzLndvcmRzW2kgKyBzaGlmdF0gfCAwKSArIGNhcnJ5O1xuICAgICAgdmFyIHJpZ2h0ID0gKG51bS53b3Jkc1tpXSB8IDApICogbXVsO1xuICAgICAgdyAtPSByaWdodCAmIDB4M2ZmZmZmZjtcbiAgICAgIGNhcnJ5ID0gKHcgPj4gMjYpIC0gKChyaWdodCAvIDB4NDAwMDAwMCkgfCAwKTtcbiAgICAgIHRoaXMud29yZHNbaSArIHNoaWZ0XSA9IHcgJiAweDNmZmZmZmY7XG4gICAgfVxuICAgIGZvciAoOyBpIDwgdGhpcy5sZW5ndGggLSBzaGlmdDsgaSsrKSB7XG4gICAgICB3ID0gKHRoaXMud29yZHNbaSArIHNoaWZ0XSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHcgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2kgKyBzaGlmdF0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cblxuICAgIGlmIChjYXJyeSA9PT0gMCkgcmV0dXJuIHRoaXMuc3RyaXAoKTtcblxuICAgIC8vIFN1YnRyYWN0aW9uIG92ZXJmbG93XG4gICAgYXNzZXJ0KGNhcnJ5ID09PSAtMSk7XG4gICAgY2FycnkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3ID0gLSh0aGlzLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICB0aGlzLm5lZ2F0aXZlID0gMTtcblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl93b3JkRGl2ID0gZnVuY3Rpb24gX3dvcmREaXYgKG51bSwgbW9kZSkge1xuICAgIHZhciBzaGlmdCA9IHRoaXMubGVuZ3RoIC0gbnVtLmxlbmd0aDtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtO1xuXG4gICAgLy8gTm9ybWFsaXplXG4gICAgdmFyIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgdmFyIGJoaUJpdHMgPSB0aGlzLl9jb3VudEJpdHMoYmhpKTtcbiAgICBzaGlmdCA9IDI2IC0gYmhpQml0cztcbiAgICBpZiAoc2hpZnQgIT09IDApIHtcbiAgICAgIGIgPSBiLnVzaGxuKHNoaWZ0KTtcbiAgICAgIGEuaXVzaGxuKHNoaWZ0KTtcbiAgICAgIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBxdW90aWVudFxuICAgIHZhciBtID0gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgICB2YXIgcTtcblxuICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgcSA9IG5ldyBCTihudWxsKTtcbiAgICAgIHEubGVuZ3RoID0gbSArIDE7XG4gICAgICBxLndvcmRzID0gbmV3IEFycmF5KHEubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcS5sZW5ndGg7IGkrKykge1xuICAgICAgICBxLndvcmRzW2ldID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlmZiA9IGEuY2xvbmUoKS5faXNobG5zdWJtdWwoYiwgMSwgbSk7XG4gICAgaWYgKGRpZmYubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIGEgPSBkaWZmO1xuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1ttXSA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IG0gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdmFyIHFqID0gKGEud29yZHNbYi5sZW5ndGggKyBqXSB8IDApICogMHg0MDAwMDAwICtcbiAgICAgICAgKGEud29yZHNbYi5sZW5ndGggKyBqIC0gMV0gfCAwKTtcblxuICAgICAgLy8gTk9URTogKHFqIC8gYmhpKSBpcyAoMHgzZmZmZmZmICogMHg0MDAwMDAwICsgMHgzZmZmZmZmKSAvIDB4MjAwMDAwMCBtYXhcbiAgICAgIC8vICgweDdmZmZmZmYpXG4gICAgICBxaiA9IE1hdGgubWluKChxaiAvIGJoaSkgfCAwLCAweDNmZmZmZmYpO1xuXG4gICAgICBhLl9pc2hsbnN1Ym11bChiLCBxaiwgaik7XG4gICAgICB3aGlsZSAoYS5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBxai0tO1xuICAgICAgICBhLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgYS5faXNobG5zdWJtdWwoYiwgMSwgaik7XG4gICAgICAgIGlmICghYS5pc1plcm8oKSkge1xuICAgICAgICAgIGEubmVnYXRpdmUgXj0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1tqXSA9IHFqO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocSkge1xuICAgICAgcS5zdHJpcCgpO1xuICAgIH1cbiAgICBhLnN0cmlwKCk7XG5cbiAgICAvLyBEZW5vcm1hbGl6ZVxuICAgIGlmIChtb2RlICE9PSAnZGl2JyAmJiBzaGlmdCAhPT0gMCkge1xuICAgICAgYS5pdXNocm4oc2hpZnQpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkaXY6IHEgfHwgbnVsbCxcbiAgICAgIG1vZDogYVxuICAgIH07XG4gIH07XG5cbiAgLy8gTk9URTogMSkgYG1vZGVgIGNhbiBiZSBzZXQgdG8gYG1vZGAgdG8gcmVxdWVzdCBtb2Qgb25seSxcbiAgLy8gICAgICAgdG8gYGRpdmAgdG8gcmVxdWVzdCBkaXYgb25seSwgb3IgYmUgYWJzZW50IHRvXG4gIC8vICAgICAgIHJlcXVlc3QgYm90aCBkaXYgJiBtb2RcbiAgLy8gICAgICAgMikgYHBvc2l0aXZlYCBpcyB0cnVlIGlmIHVuc2lnbmVkIG1vZCBpcyByZXF1ZXN0ZWRcbiAgQk4ucHJvdG90eXBlLmRpdm1vZCA9IGZ1bmN0aW9uIGRpdm1vZCAobnVtLCBtb2RlLCBwb3NpdGl2ZSkge1xuICAgIGFzc2VydCghbnVtLmlzWmVybygpKTtcblxuICAgIGlmICh0aGlzLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IG5ldyBCTigwKSxcbiAgICAgICAgbW9kOiBuZXcgQk4oMClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGRpdiwgbW9kLCByZXM7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICByZXMgPSB0aGlzLm5lZygpLmRpdm1vZChudW0sIG1vZGUpO1xuXG4gICAgICBpZiAobW9kZSAhPT0gJ21vZCcpIHtcbiAgICAgICAgZGl2ID0gcmVzLmRpdi5uZWcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUgIT09ICdkaXYnKSB7XG4gICAgICAgIG1vZCA9IHJlcy5tb2QubmVnKCk7XG4gICAgICAgIGlmIChwb3NpdGl2ZSAmJiBtb2QubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgICBtb2QuaWFkZChudW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogZGl2LFxuICAgICAgICBtb2Q6IG1vZFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgICBkaXYgPSByZXMuZGl2Lm5lZygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IGRpdixcbiAgICAgICAgbW9kOiByZXMubW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICgodGhpcy5uZWdhdGl2ZSAmIG51bS5uZWdhdGl2ZSkgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMubmVnKCkuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnZGl2Jykge1xuICAgICAgICBtb2QgPSByZXMubW9kLm5lZygpO1xuICAgICAgICBpZiAocG9zaXRpdmUgJiYgbW9kLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICAgICAgbW9kLmlzdWIobnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IHJlcy5kaXYsXG4gICAgICAgIG1vZDogbW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEJvdGggbnVtYmVycyBhcmUgcG9zaXRpdmUgYXQgdGhpcyBwb2ludFxuXG4gICAgLy8gU3RyaXAgYm90aCBudW1iZXJzIHRvIGFwcHJveGltYXRlIHNoaWZ0IHZhbHVlXG4gICAgaWYgKG51bS5sZW5ndGggPiB0aGlzLmxlbmd0aCB8fCB0aGlzLmNtcChudW0pIDwgMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGl2OiBuZXcgQk4oMCksXG4gICAgICAgIG1vZDogdGhpc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBWZXJ5IHNob3J0IHJlZHVjdGlvblxuICAgIGlmIChudW0ubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2RpdicpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IHRoaXMuZGl2bihudW0ud29yZHNbMF0pLFxuICAgICAgICAgIG1vZDogbnVsbFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZSA9PT0gJ21vZCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IG51bGwsXG4gICAgICAgICAgbW9kOiBuZXcgQk4odGhpcy5tb2RuKG51bS53b3Jkc1swXSkpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogdGhpcy5kaXZuKG51bS53b3Jkc1swXSksXG4gICAgICAgIG1vZDogbmV3IEJOKHRoaXMubW9kbihudW0ud29yZHNbMF0pKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fd29yZERpdihudW0sIG1vZGUpO1xuICB9O1xuXG4gIC8vIEZpbmQgYHRoaXNgIC8gYG51bWBcbiAgQk4ucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2bW9kKG51bSwgJ2RpdicsIGZhbHNlKS5kaXY7XG4gIH07XG5cbiAgLy8gRmluZCBgdGhpc2AgJSBgbnVtYFxuICBCTi5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gbW9kIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5kaXZtb2QobnVtLCAnbW9kJywgZmFsc2UpLm1vZDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudW1vZCA9IGZ1bmN0aW9uIHVtb2QgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmRpdm1vZChudW0sICdtb2QnLCB0cnVlKS5tb2Q7XG4gIH07XG5cbiAgLy8gRmluZCBSb3VuZChgdGhpc2AgLyBgbnVtYClcbiAgQk4ucHJvdG90eXBlLmRpdlJvdW5kID0gZnVuY3Rpb24gZGl2Um91bmQgKG51bSkge1xuICAgIHZhciBkbSA9IHRoaXMuZGl2bW9kKG51bSk7XG5cbiAgICAvLyBGYXN0IGNhc2UgLSBleGFjdCBkaXZpc2lvblxuICAgIGlmIChkbS5tb2QuaXNaZXJvKCkpIHJldHVybiBkbS5kaXY7XG5cbiAgICB2YXIgbW9kID0gZG0uZGl2Lm5lZ2F0aXZlICE9PSAwID8gZG0ubW9kLmlzdWIobnVtKSA6IGRtLm1vZDtcblxuICAgIHZhciBoYWxmID0gbnVtLnVzaHJuKDEpO1xuICAgIHZhciByMiA9IG51bS5hbmRsbigxKTtcbiAgICB2YXIgY21wID0gbW9kLmNtcChoYWxmKTtcblxuICAgIC8vIFJvdW5kIGRvd25cbiAgICBpZiAoY21wIDwgMCB8fCByMiA9PT0gMSAmJiBjbXAgPT09IDApIHJldHVybiBkbS5kaXY7XG5cbiAgICAvLyBSb3VuZCB1cFxuICAgIHJldHVybiBkbS5kaXYubmVnYXRpdmUgIT09IDAgPyBkbS5kaXYuaXN1Ym4oMSkgOiBkbS5kaXYuaWFkZG4oMSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm1vZG4gPSBmdW5jdGlvbiBtb2RuIChudW0pIHtcbiAgICBhc3NlcnQobnVtIDw9IDB4M2ZmZmZmZik7XG4gICAgdmFyIHAgPSAoMSA8PCAyNikgJSBudW07XG5cbiAgICB2YXIgYWNjID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgYWNjID0gKHAgKiBhY2MgKyAodGhpcy53b3Jkc1tpXSB8IDApKSAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9O1xuXG4gIC8vIEluLXBsYWNlIGRpdmlzaW9uIGJ5IG51bWJlclxuICBCTi5wcm90b3R5cGUuaWRpdm4gPSBmdW5jdGlvbiBpZGl2biAobnVtKSB7XG4gICAgYXNzZXJ0KG51bSA8PSAweDNmZmZmZmYpO1xuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHcgPSAodGhpcy53b3Jkc1tpXSB8IDApICsgY2FycnkgKiAweDQwMDAwMDA7XG4gICAgICB0aGlzLndvcmRzW2ldID0gKHcgLyBudW0pIHwgMDtcbiAgICAgIGNhcnJ5ID0gdyAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5kaXZuID0gZnVuY3Rpb24gZGl2biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pZGl2bihudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5lZ2NkID0gZnVuY3Rpb24gZWdjZCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIHggPSB0aGlzO1xuICAgIHZhciB5ID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKHgubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHggPSB4LnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSB4LmNsb25lKCk7XG4gICAgfVxuXG4gICAgLy8gQSAqIHggKyBCICogeSA9IHhcbiAgICB2YXIgQSA9IG5ldyBCTigxKTtcbiAgICB2YXIgQiA9IG5ldyBCTigwKTtcblxuICAgIC8vIEMgKiB4ICsgRCAqIHkgPSB5XG4gICAgdmFyIEMgPSBuZXcgQk4oMCk7XG4gICAgdmFyIEQgPSBuZXcgQk4oMSk7XG5cbiAgICB2YXIgZyA9IDA7XG5cbiAgICB3aGlsZSAoeC5pc0V2ZW4oKSAmJiB5LmlzRXZlbigpKSB7XG4gICAgICB4Lml1c2hybigxKTtcbiAgICAgIHkuaXVzaHJuKDEpO1xuICAgICAgKytnO1xuICAgIH1cblxuICAgIHZhciB5cCA9IHkuY2xvbmUoKTtcbiAgICB2YXIgeHAgPSB4LmNsb25lKCk7XG5cbiAgICB3aGlsZSAoIXguaXNaZXJvKCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7ICh4LndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgeC5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEEuaXNPZGQoKSB8fCBCLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEEuaWFkZCh5cCk7XG4gICAgICAgICAgICBCLmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEEuaXVzaHJuKDEpO1xuICAgICAgICAgIEIuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBqbSA9IDE7ICh5LndvcmRzWzBdICYgam0pID09PSAwICYmIGogPCAyNjsgKytqLCBqbSA8PD0gMSk7XG4gICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgeS5pdXNocm4oaik7XG4gICAgICAgIHdoaWxlIChqLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEMuaXNPZGQoKSB8fCBELmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEMuaWFkZCh5cCk7XG4gICAgICAgICAgICBELmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEMuaXVzaHJuKDEpO1xuICAgICAgICAgIEQuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh4LmNtcCh5KSA+PSAwKSB7XG4gICAgICAgIHguaXN1Yih5KTtcbiAgICAgICAgQS5pc3ViKEMpO1xuICAgICAgICBCLmlzdWIoRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5LmlzdWIoeCk7XG4gICAgICAgIEMuaXN1YihBKTtcbiAgICAgICAgRC5pc3ViKEIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhOiBDLFxuICAgICAgYjogRCxcbiAgICAgIGdjZDogeS5pdXNobG4oZylcbiAgICB9O1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgcmVkdWNlZCBpbmNhcm5hdGlvbiBvZiB0aGUgYmluYXJ5IEVFQVxuICAvLyBhYm92ZSwgZGVzaWduYXRlZCB0byBpbnZlcnQgbWVtYmVycyBvZiB0aGVcbiAgLy8gX3ByaW1lXyBmaWVsZHMgRihwKSBhdCBhIG1heGltYWwgc3BlZWRcbiAgQk4ucHJvdG90eXBlLl9pbnZtcCA9IGZ1bmN0aW9uIF9pbnZtcCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIGEgPSB0aGlzO1xuICAgIHZhciBiID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKGEubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGEgPSBhLnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBhLmNsb25lKCk7XG4gICAgfVxuXG4gICAgdmFyIHgxID0gbmV3IEJOKDEpO1xuICAgIHZhciB4MiA9IG5ldyBCTigwKTtcblxuICAgIHZhciBkZWx0YSA9IGIuY2xvbmUoKTtcblxuICAgIHdoaWxlIChhLmNtcG4oMSkgPiAwICYmIGIuY21wbigxKSA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7IChhLndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgYS5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKHgxLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIHgxLmlhZGQoZGVsdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHgxLml1c2hybigxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgam0gPSAxOyAoYi53b3Jkc1swXSAmIGptKSA9PT0gMCAmJiBqIDwgMjY7ICsraiwgam0gPDw9IDEpO1xuICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgIGIuaXVzaHJuKGopO1xuICAgICAgICB3aGlsZSAoai0tID4gMCkge1xuICAgICAgICAgIGlmICh4Mi5pc09kZCgpKSB7XG4gICAgICAgICAgICB4Mi5pYWRkKGRlbHRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB4Mi5pdXNocm4oMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGEuY21wKGIpID49IDApIHtcbiAgICAgICAgYS5pc3ViKGIpO1xuICAgICAgICB4MS5pc3ViKHgyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGIuaXN1YihhKTtcbiAgICAgICAgeDIuaXN1Yih4MSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlcztcbiAgICBpZiAoYS5jbXBuKDEpID09PSAwKSB7XG4gICAgICByZXMgPSB4MTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0geDI7XG4gICAgfVxuXG4gICAgaWYgKHJlcy5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzLmlhZGQocCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ2NkID0gZnVuY3Rpb24gZ2NkIChudW0pIHtcbiAgICBpZiAodGhpcy5pc1plcm8oKSkgcmV0dXJuIG51bS5hYnMoKTtcbiAgICBpZiAobnVtLmlzWmVybygpKSByZXR1cm4gdGhpcy5hYnMoKTtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtLmNsb25lKCk7XG4gICAgYS5uZWdhdGl2ZSA9IDA7XG4gICAgYi5uZWdhdGl2ZSA9IDA7XG5cbiAgICAvLyBSZW1vdmUgY29tbW9uIGZhY3RvciBvZiB0d29cbiAgICBmb3IgKHZhciBzaGlmdCA9IDA7IGEuaXNFdmVuKCkgJiYgYi5pc0V2ZW4oKTsgc2hpZnQrKykge1xuICAgICAgYS5pdXNocm4oMSk7XG4gICAgICBiLml1c2hybigxKTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICB3aGlsZSAoYS5pc0V2ZW4oKSkge1xuICAgICAgICBhLml1c2hybigxKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChiLmlzRXZlbigpKSB7XG4gICAgICAgIGIuaXVzaHJuKDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgciA9IGEuY21wKGIpO1xuICAgICAgaWYgKHIgPCAwKSB7XG4gICAgICAgIC8vIFN3YXAgYGFgIGFuZCBgYmAgdG8gbWFrZSBgYWAgYWx3YXlzIGJpZ2dlciB0aGFuIGBiYFxuICAgICAgICB2YXIgdCA9IGE7XG4gICAgICAgIGEgPSBiO1xuICAgICAgICBiID0gdDtcbiAgICAgIH0gZWxzZSBpZiAociA9PT0gMCB8fCBiLmNtcG4oMSkgPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGEuaXN1YihiKTtcbiAgICB9IHdoaWxlICh0cnVlKTtcblxuICAgIHJldHVybiBiLml1c2hsbihzaGlmdCk7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IG51bWJlciBpbiB0aGUgZmllbGQgRihudW0pXG4gIEJOLnByb3RvdHlwZS5pbnZtID0gZnVuY3Rpb24gaW52bSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZWdjZChudW0pLmEudW1vZChudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc0V2ZW4gPSBmdW5jdGlvbiBpc0V2ZW4gKCkge1xuICAgIHJldHVybiAodGhpcy53b3Jkc1swXSAmIDEpID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc09kZCA9IGZ1bmN0aW9uIGlzT2RkICgpIHtcbiAgICByZXR1cm4gKHRoaXMud29yZHNbMF0gJiAxKSA9PT0gMTtcbiAgfTtcblxuICAvLyBBbmQgZmlyc3Qgd29yZCBhbmQgbnVtXG4gIEJOLnByb3RvdHlwZS5hbmRsbiA9IGZ1bmN0aW9uIGFuZGxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy53b3Jkc1swXSAmIG51bTtcbiAgfTtcblxuICAvLyBJbmNyZW1lbnQgYXQgdGhlIGJpdCBwb3NpdGlvbiBpbi1saW5lXG4gIEJOLnByb3RvdHlwZS5iaW5jbiA9IGZ1bmN0aW9uIGJpbmNuIChiaXQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdCA9PT0gJ251bWJlcicpO1xuICAgIHZhciByID0gYml0ICUgMjY7XG4gICAgdmFyIHMgPSAoYml0IC0gcikgLyAyNjtcbiAgICB2YXIgcSA9IDEgPDwgcjtcblxuICAgIC8vIEZhc3QgY2FzZTogYml0IGlzIG11Y2ggaGlnaGVyIHRoYW4gYWxsIGV4aXN0aW5nIHdvcmRzXG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IHMpIHtcbiAgICAgIHRoaXMuX2V4cGFuZChzICsgMSk7XG4gICAgICB0aGlzLndvcmRzW3NdIHw9IHE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgYml0IGFuZCBwcm9wYWdhdGUsIGlmIG5lZWRlZFxuICAgIHZhciBjYXJyeSA9IHE7XG4gICAgZm9yICh2YXIgaSA9IHM7IGNhcnJ5ICE9PSAwICYmIGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdyArPSBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+Pj4gMjY7XG4gICAgICB3ICY9IDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbXBuID0gZnVuY3Rpb24gY21wbiAobnVtKSB7XG4gICAgdmFyIG5lZ2F0aXZlID0gbnVtIDwgMDtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmICFuZWdhdGl2ZSkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG5lZ2F0aXZlKSByZXR1cm4gMTtcblxuICAgIHRoaXMuc3RyaXAoKTtcblxuICAgIHZhciByZXM7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgcmVzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIG51bSA9IC1udW07XG4gICAgICB9XG5cbiAgICAgIGFzc2VydChudW0gPD0gMHgzZmZmZmZmLCAnTnVtYmVyIGlzIHRvbyBiaWcnKTtcblxuICAgICAgdmFyIHcgPSB0aGlzLndvcmRzWzBdIHwgMDtcbiAgICAgIHJlcyA9IHcgPT09IG51bSA/IDAgOiB3IDwgbnVtID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIC1yZXMgfCAwO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy8gQ29tcGFyZSB0d28gbnVtYmVycyBhbmQgcmV0dXJuOlxuICAvLyAxIC0gaWYgYHRoaXNgID4gYG51bWBcbiAgLy8gMCAtIGlmIGB0aGlzYCA9PSBgbnVtYFxuICAvLyAtMSAtIGlmIGB0aGlzYCA8IGBudW1gXG4gIEJOLnByb3RvdHlwZS5jbXAgPSBmdW5jdGlvbiBjbXAgKG51bSkge1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmIG51bS5uZWdhdGl2ZSA9PT0gMCkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG51bS5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIDE7XG5cbiAgICB2YXIgcmVzID0gdGhpcy51Y21wKG51bSk7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHJldHVybiAtcmVzIHwgMDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIFVuc2lnbmVkIGNvbXBhcmlzb25cbiAgQk4ucHJvdG90eXBlLnVjbXAgPSBmdW5jdGlvbiB1Y21wIChudW0pIHtcbiAgICAvLyBBdCB0aGlzIHBvaW50IGJvdGggbnVtYmVycyBoYXZlIHRoZSBzYW1lIHNpZ25cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gMTtcbiAgICBpZiAodGhpcy5sZW5ndGggPCBudW0ubGVuZ3RoKSByZXR1cm4gLTE7XG5cbiAgICB2YXIgcmVzID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGEgPSB0aGlzLndvcmRzW2ldIHwgMDtcbiAgICAgIHZhciBiID0gbnVtLndvcmRzW2ldIHwgMDtcblxuICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlO1xuICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJlcyA9IC0xO1xuICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICByZXMgPSAxO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmd0biA9IGZ1bmN0aW9uIGd0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAxO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndCA9IGZ1bmN0aW9uIGd0IChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXAobnVtKSA9PT0gMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ3RlbiA9IGZ1bmN0aW9uIGd0ZW4gKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcG4obnVtKSA+PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndGUgPSBmdW5jdGlvbiBndGUgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID49IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0biA9IGZ1bmN0aW9uIGx0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAtMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUubHQgPSBmdW5jdGlvbiBsdCAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPT09IC0xO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5sdGVuID0gZnVuY3Rpb24gbHRlbiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pIDw9IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0ZSA9IGZ1bmN0aW9uIGx0ZSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPD0gMDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZXFuID0gZnVuY3Rpb24gZXFuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXBuKG51bSkgPT09IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID09PSAwO1xuICB9O1xuXG4gIC8vXG4gIC8vIEEgcmVkdWNlIGNvbnRleHQsIGNvdWxkIGJlIHVzaW5nIG1vbnRnb21lcnkgb3Igc29tZXRoaW5nIGJldHRlciwgZGVwZW5kaW5nXG4gIC8vIG9uIHRoZSBgbWAgaXRzZWxmLlxuICAvL1xuICBCTi5yZWQgPSBmdW5jdGlvbiByZWQgKG51bSkge1xuICAgIHJldHVybiBuZXcgUmVkKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvUmVkID0gZnVuY3Rpb24gdG9SZWQgKGN0eCkge1xuICAgIGFzc2VydCghdGhpcy5yZWQsICdBbHJlYWR5IGEgbnVtYmVyIGluIHJlZHVjdGlvbiBjb250ZXh0Jyk7XG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDAsICdyZWQgd29ya3Mgb25seSB3aXRoIHBvc2l0aXZlcycpO1xuICAgIHJldHVybiBjdHguY29udmVydFRvKHRoaXMpLl9mb3JjZVJlZChjdHgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tUmVkID0gZnVuY3Rpb24gZnJvbVJlZCAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAnZnJvbVJlZCB3b3JrcyBvbmx5IHdpdGggbnVtYmVycyBpbiByZWR1Y3Rpb24gY29udGV4dCcpO1xuICAgIHJldHVybiB0aGlzLnJlZC5jb252ZXJ0RnJvbSh0aGlzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2ZvcmNlUmVkID0gZnVuY3Rpb24gX2ZvcmNlUmVkIChjdHgpIHtcbiAgICB0aGlzLnJlZCA9IGN0eDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZm9yY2VSZWQgPSBmdW5jdGlvbiBmb3JjZVJlZCAoY3R4KSB7XG4gICAgYXNzZXJ0KCF0aGlzLnJlZCwgJ0FscmVhZHkgYSBudW1iZXIgaW4gcmVkdWN0aW9uIGNvbnRleHQnKTtcbiAgICByZXR1cm4gdGhpcy5fZm9yY2VSZWQoY3R4KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkQWRkID0gZnVuY3Rpb24gcmVkQWRkIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRBZGQgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLmFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJQWRkID0gZnVuY3Rpb24gcmVkSUFkZCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSUFkZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaWFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTdWIgPSBmdW5jdGlvbiByZWRTdWIgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFN1YiB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElTdWIgPSBmdW5jdGlvbiByZWRJU3ViIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRJU3ViIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5pc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZFNobCA9IGZ1bmN0aW9uIHJlZFNobCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkU2hsIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zaGwodGhpcywgbnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkTXVsID0gZnVuY3Rpb24gcmVkTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubXVsKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElNdWwgPSBmdW5jdGlvbiByZWRJTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW11bCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTcXIgPSBmdW5jdGlvbiByZWRTcXIgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3FyKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJU3FyID0gZnVuY3Rpb24gcmVkSVNxciAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSVNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaXNxcih0aGlzKTtcbiAgfTtcblxuICAvLyBTcXVhcmUgcm9vdCBvdmVyIHBcbiAgQk4ucHJvdG90eXBlLnJlZFNxcnQgPSBmdW5jdGlvbiByZWRTcXJ0ICgpIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRTcXJ0IHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHRoaXMucmVkLl92ZXJpZnkxKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zcXJ0KHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJbnZtID0gZnVuY3Rpb24gcmVkSW52bSAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSW52bSB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW52bSh0aGlzKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmVnYXRpdmUgY2xvbmUgb2YgYHRoaXNgICUgYHJlZCBtb2R1bG9gXG4gIEJOLnByb3RvdHlwZS5yZWROZWcgPSBmdW5jdGlvbiByZWROZWcgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZE5lZyB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubmVnKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRQb3cgPSBmdW5jdGlvbiByZWRQb3cgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCAmJiAhbnVtLnJlZCwgJ3JlZFBvdyhub3JtYWxOdW0pJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTEodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLnBvdyh0aGlzLCBudW0pO1xuICB9O1xuXG4gIC8vIFByaW1lIG51bWJlcnMgd2l0aCBlZmZpY2llbnQgcmVkdWN0aW9uXG4gIHZhciBwcmltZXMgPSB7XG4gICAgazI1NjogbnVsbCxcbiAgICBwMjI0OiBudWxsLFxuICAgIHAxOTI6IG51bGwsXG4gICAgcDI1NTE5OiBudWxsXG4gIH07XG5cbiAgLy8gUHNldWRvLU1lcnNlbm5lIHByaW1lXG4gIGZ1bmN0aW9uIE1QcmltZSAobmFtZSwgcCkge1xuICAgIC8vIFAgPSAyIF4gTiAtIEtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucCA9IG5ldyBCTihwLCAxNik7XG4gICAgdGhpcy5uID0gdGhpcy5wLmJpdExlbmd0aCgpO1xuICAgIHRoaXMuayA9IG5ldyBCTigxKS5pdXNobG4odGhpcy5uKS5pc3ViKHRoaXMucCk7XG5cbiAgICB0aGlzLnRtcCA9IHRoaXMuX3RtcCgpO1xuICB9XG5cbiAgTVByaW1lLnByb3RvdHlwZS5fdG1wID0gZnVuY3Rpb24gX3RtcCAoKSB7XG4gICAgdmFyIHRtcCA9IG5ldyBCTihudWxsKTtcbiAgICB0bXAud29yZHMgPSBuZXcgQXJyYXkoTWF0aC5jZWlsKHRoaXMubiAvIDEzKSk7XG4gICAgcmV0dXJuIHRtcDtcbiAgfTtcblxuICBNUHJpbWUucHJvdG90eXBlLmlyZWR1Y2UgPSBmdW5jdGlvbiBpcmVkdWNlIChudW0pIHtcbiAgICAvLyBBc3N1bWVzIHRoYXQgYG51bWAgaXMgbGVzcyB0aGFuIGBQXjJgXG4gICAgLy8gbnVtID0gSEkgKiAoMiBeIE4gLSBLKSArIEhJICogSyArIExPID0gSEkgKiBLICsgTE8gKG1vZCBQKVxuICAgIHZhciByID0gbnVtO1xuICAgIHZhciBybGVuO1xuXG4gICAgZG8ge1xuICAgICAgdGhpcy5zcGxpdChyLCB0aGlzLnRtcCk7XG4gICAgICByID0gdGhpcy5pbXVsSyhyKTtcbiAgICAgIHIgPSByLmlhZGQodGhpcy50bXApO1xuICAgICAgcmxlbiA9IHIuYml0TGVuZ3RoKCk7XG4gICAgfSB3aGlsZSAocmxlbiA+IHRoaXMubik7XG5cbiAgICB2YXIgY21wID0gcmxlbiA8IHRoaXMubiA/IC0xIDogci51Y21wKHRoaXMucCk7XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgci53b3Jkc1swXSA9IDA7XG4gICAgICByLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChjbXAgPiAwKSB7XG4gICAgICByLmlzdWIodGhpcy5wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgci5zdHJpcCgpO1xuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIE1QcmltZS5wcm90b3R5cGUuc3BsaXQgPSBmdW5jdGlvbiBzcGxpdCAoaW5wdXQsIG91dCkge1xuICAgIGlucHV0Lml1c2hybih0aGlzLm4sIDAsIG91dCk7XG4gIH07XG5cbiAgTVByaW1lLnByb3RvdHlwZS5pbXVsSyA9IGZ1bmN0aW9uIGltdWxLIChudW0pIHtcbiAgICByZXR1cm4gbnVtLmltdWwodGhpcy5rKTtcbiAgfTtcblxuICBmdW5jdGlvbiBLMjU2ICgpIHtcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAnazI1NicsXG4gICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmUgZmZmZmZjMmYnKTtcbiAgfVxuICBpbmhlcml0cyhLMjU2LCBNUHJpbWUpO1xuXG4gIEsyNTYucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKGlucHV0LCBvdXRwdXQpIHtcbiAgICAvLyAyNTYgPSA5ICogMjYgKyAyMlxuICAgIHZhciBtYXNrID0gMHgzZmZmZmY7XG5cbiAgICB2YXIgb3V0TGVuID0gTWF0aC5taW4oaW5wdXQubGVuZ3RoLCA5KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dExlbjsgaSsrKSB7XG4gICAgICBvdXRwdXQud29yZHNbaV0gPSBpbnB1dC53b3Jkc1tpXTtcbiAgICB9XG4gICAgb3V0cHV0Lmxlbmd0aCA9IG91dExlbjtcblxuICAgIGlmIChpbnB1dC5sZW5ndGggPD0gOSkge1xuICAgICAgaW5wdXQud29yZHNbMF0gPSAwO1xuICAgICAgaW5wdXQubGVuZ3RoID0gMTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTaGlmdCBieSA5IGxpbWJzXG4gICAgdmFyIHByZXYgPSBpbnB1dC53b3Jkc1s5XTtcbiAgICBvdXRwdXQud29yZHNbb3V0cHV0Lmxlbmd0aCsrXSA9IHByZXYgJiBtYXNrO1xuXG4gICAgZm9yIChpID0gMTA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHQgPSBpbnB1dC53b3Jkc1tpXSB8IDA7XG4gICAgICBpbnB1dC53b3Jkc1tpIC0gMTBdID0gKChuZXh0ICYgbWFzaykgPDwgNCkgfCAocHJldiA+Pj4gMjIpO1xuICAgICAgcHJldiA9IG5leHQ7XG4gICAgfVxuICAgIHByZXYgPj4+PSAyMjtcbiAgICBpbnB1dC53b3Jkc1tpIC0gMTBdID0gcHJldjtcbiAgICBpZiAocHJldiA9PT0gMCAmJiBpbnB1dC5sZW5ndGggPiAxMCkge1xuICAgICAgaW5wdXQubGVuZ3RoIC09IDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dC5sZW5ndGggLT0gOTtcbiAgICB9XG4gIH07XG5cbiAgSzI1Ni5wcm90b3R5cGUuaW11bEsgPSBmdW5jdGlvbiBpbXVsSyAobnVtKSB7XG4gICAgLy8gSyA9IDB4MTAwMDAwM2QxID0gWyAweDQwLCAweDNkMSBdXG4gICAgbnVtLndvcmRzW251bS5sZW5ndGhdID0gMDtcbiAgICBudW0ud29yZHNbbnVtLmxlbmd0aCArIDFdID0gMDtcbiAgICBudW0ubGVuZ3RoICs9IDI7XG5cbiAgICAvLyBib3VuZGVkIGF0OiAweDQwICogMHgzZmZmZmZmICsgMHgzZDAgPSAweDEwMDAwMDM5MFxuICAgIHZhciBsbyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3ID0gbnVtLndvcmRzW2ldIHwgMDtcbiAgICAgIGxvICs9IHcgKiAweDNkMTtcbiAgICAgIG51bS53b3Jkc1tpXSA9IGxvICYgMHgzZmZmZmZmO1xuICAgICAgbG8gPSB3ICogMHg0MCArICgobG8gLyAweDQwMDAwMDApIHwgMCk7XG4gICAgfVxuXG4gICAgLy8gRmFzdCBsZW5ndGggcmVkdWN0aW9uXG4gICAgaWYgKG51bS53b3Jkc1tudW0ubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIG51bS5sZW5ndGgtLTtcbiAgICAgIGlmIChudW0ud29yZHNbbnVtLmxlbmd0aCAtIDFdID09PSAwKSB7XG4gICAgICAgIG51bS5sZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfTtcblxuICBmdW5jdGlvbiBQMjI0ICgpIHtcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAncDIyNCcsXG4gICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDEnKTtcbiAgfVxuICBpbmhlcml0cyhQMjI0LCBNUHJpbWUpO1xuXG4gIGZ1bmN0aW9uIFAxOTIgKCkge1xuICAgIE1QcmltZS5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgICdwMTkyJyxcbiAgICAgICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZSBmZmZmZmZmZiBmZmZmZmZmZicpO1xuICB9XG4gIGluaGVyaXRzKFAxOTIsIE1QcmltZSk7XG5cbiAgZnVuY3Rpb24gUDI1NTE5ICgpIHtcbiAgICAvLyAyIF4gMjU1IC0gMTlcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAnMjU1MTknLFxuICAgICAgJzdmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZWQnKTtcbiAgfVxuICBpbmhlcml0cyhQMjU1MTksIE1QcmltZSk7XG5cbiAgUDI1NTE5LnByb3RvdHlwZS5pbXVsSyA9IGZ1bmN0aW9uIGltdWxLIChudW0pIHtcbiAgICAvLyBLID0gMHgxM1xuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoaSA9IChudW0ud29yZHNbaV0gfCAwKSAqIDB4MTMgKyBjYXJyeTtcbiAgICAgIHZhciBsbyA9IGhpICYgMHgzZmZmZmZmO1xuICAgICAgaGkgPj4+PSAyNjtcblxuICAgICAgbnVtLndvcmRzW2ldID0gbG87XG4gICAgICBjYXJyeSA9IGhpO1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIG51bS53b3Jkc1tudW0ubGVuZ3RoKytdID0gY2Fycnk7XG4gICAgfVxuICAgIHJldHVybiBudW07XG4gIH07XG5cbiAgLy8gRXhwb3J0ZWQgbW9zdGx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB1c2UgcGxhaW4gbmFtZSBpbnN0ZWFkXG4gIEJOLl9wcmltZSA9IGZ1bmN0aW9uIHByaW1lIChuYW1lKSB7XG4gICAgLy8gQ2FjaGVkIHZlcnNpb24gb2YgcHJpbWVcbiAgICBpZiAocHJpbWVzW25hbWVdKSByZXR1cm4gcHJpbWVzW25hbWVdO1xuXG4gICAgdmFyIHByaW1lO1xuICAgIGlmIChuYW1lID09PSAnazI1NicpIHtcbiAgICAgIHByaW1lID0gbmV3IEsyNTYoKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwMjI0Jykge1xuICAgICAgcHJpbWUgPSBuZXcgUDIyNCgpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3AxOTInKSB7XG4gICAgICBwcmltZSA9IG5ldyBQMTkyKCk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAncDI1NTE5Jykge1xuICAgICAgcHJpbWUgPSBuZXcgUDI1NTE5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBwcmltZSAnICsgbmFtZSk7XG4gICAgfVxuICAgIHByaW1lc1tuYW1lXSA9IHByaW1lO1xuXG4gICAgcmV0dXJuIHByaW1lO1xuICB9O1xuXG4gIC8vXG4gIC8vIEJhc2UgcmVkdWN0aW9uIGVuZ2luZVxuICAvL1xuICBmdW5jdGlvbiBSZWQgKG0pIHtcbiAgICBpZiAodHlwZW9mIG0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgcHJpbWUgPSBCTi5fcHJpbWUobSk7XG4gICAgICB0aGlzLm0gPSBwcmltZS5wO1xuICAgICAgdGhpcy5wcmltZSA9IHByaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQobS5ndG4oMSksICdtb2R1bHVzIG11c3QgYmUgZ3JlYXRlciB0aGFuIDEnKTtcbiAgICAgIHRoaXMubSA9IG07XG4gICAgICB0aGlzLnByaW1lID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBSZWQucHJvdG90eXBlLl92ZXJpZnkxID0gZnVuY3Rpb24gX3ZlcmlmeTEgKGEpIHtcbiAgICBhc3NlcnQoYS5uZWdhdGl2ZSA9PT0gMCwgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcG9zaXRpdmVzJyk7XG4gICAgYXNzZXJ0KGEucmVkLCAncmVkIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuX3ZlcmlmeTIgPSBmdW5jdGlvbiBfdmVyaWZ5MiAoYSwgYikge1xuICAgIGFzc2VydCgoYS5uZWdhdGl2ZSB8IGIubmVnYXRpdmUpID09PSAwLCAncmVkIHdvcmtzIG9ubHkgd2l0aCBwb3NpdGl2ZXMnKTtcbiAgICBhc3NlcnQoYS5yZWQgJiYgYS5yZWQgPT09IGIucmVkLFxuICAgICAgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmltb2QgPSBmdW5jdGlvbiBpbW9kIChhKSB7XG4gICAgaWYgKHRoaXMucHJpbWUpIHJldHVybiB0aGlzLnByaW1lLmlyZWR1Y2UoYSkuX2ZvcmNlUmVkKHRoaXMpO1xuICAgIHJldHVybiBhLnVtb2QodGhpcy5tKS5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5uZWcgPSBmdW5jdGlvbiBuZWcgKGEpIHtcbiAgICBpZiAoYS5pc1plcm8oKSkge1xuICAgICAgcmV0dXJuIGEuY2xvbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tLnN1YihhKS5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuXG4gICAgdmFyIHJlcyA9IGEuYWRkKGIpO1xuICAgIGlmIChyZXMuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzLmlzdWIodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pYWRkID0gZnVuY3Rpb24gaWFkZCAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5pYWRkKGIpO1xuICAgIGlmIChyZXMuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzLmlzdWIodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1YiAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5zdWIoYik7XG4gICAgaWYgKHJlcy5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzLmlhZGQodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pc3ViID0gZnVuY3Rpb24gaXN1YiAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5pc3ViKGIpO1xuICAgIGlmIChyZXMuY21wbigwKSA8IDApIHtcbiAgICAgIHJlcy5pYWRkKHRoaXMubSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5zaGwgPSBmdW5jdGlvbiBzaGwgKGEsIG51bSkge1xuICAgIHRoaXMuX3ZlcmlmeTEoYSk7XG4gICAgcmV0dXJuIHRoaXMuaW1vZChhLnVzaGxuKG51bSkpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaW11bCA9IGZ1bmN0aW9uIGltdWwgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuICAgIHJldHVybiB0aGlzLmltb2QoYS5pbXVsKGIpKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uIG11bCAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG4gICAgcmV0dXJuIHRoaXMuaW1vZChhLm11bChiKSk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pc3FyID0gZnVuY3Rpb24gaXNxciAoYSkge1xuICAgIHJldHVybiB0aGlzLmltdWwoYSwgYS5jbG9uZSgpKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnNxciA9IGZ1bmN0aW9uIHNxciAoYSkge1xuICAgIHJldHVybiB0aGlzLm11bChhLCBhKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnNxcnQgPSBmdW5jdGlvbiBzcXJ0IChhKSB7XG4gICAgaWYgKGEuaXNaZXJvKCkpIHJldHVybiBhLmNsb25lKCk7XG5cbiAgICB2YXIgbW9kMyA9IHRoaXMubS5hbmRsbigzKTtcbiAgICBhc3NlcnQobW9kMyAlIDIgPT09IDEpO1xuXG4gICAgLy8gRmFzdCBjYXNlXG4gICAgaWYgKG1vZDMgPT09IDMpIHtcbiAgICAgIHZhciBwb3cgPSB0aGlzLm0uYWRkKG5ldyBCTigxKSkuaXVzaHJuKDIpO1xuICAgICAgcmV0dXJuIHRoaXMucG93KGEsIHBvdyk7XG4gICAgfVxuXG4gICAgLy8gVG9uZWxsaS1TaGFua3MgYWxnb3JpdGhtIChUb3RhbGx5IHVub3B0aW1pemVkIGFuZCBzbG93KVxuICAgIC8vXG4gICAgLy8gRmluZCBRIGFuZCBTLCB0aGF0IFEgKiAyIF4gUyA9IChQIC0gMSlcbiAgICB2YXIgcSA9IHRoaXMubS5zdWJuKDEpO1xuICAgIHZhciBzID0gMDtcbiAgICB3aGlsZSAoIXEuaXNaZXJvKCkgJiYgcS5hbmRsbigxKSA9PT0gMCkge1xuICAgICAgcysrO1xuICAgICAgcS5pdXNocm4oMSk7XG4gICAgfVxuICAgIGFzc2VydCghcS5pc1plcm8oKSk7XG5cbiAgICB2YXIgb25lID0gbmV3IEJOKDEpLnRvUmVkKHRoaXMpO1xuICAgIHZhciBuT25lID0gb25lLnJlZE5lZygpO1xuXG4gICAgLy8gRmluZCBxdWFkcmF0aWMgbm9uLXJlc2lkdWVcbiAgICAvLyBOT1RFOiBNYXggaXMgc3VjaCBiZWNhdXNlIG9mIGdlbmVyYWxpemVkIFJpZW1hbm4gaHlwb3RoZXNpcy5cbiAgICB2YXIgbHBvdyA9IHRoaXMubS5zdWJuKDEpLml1c2hybigxKTtcbiAgICB2YXIgeiA9IHRoaXMubS5iaXRMZW5ndGgoKTtcbiAgICB6ID0gbmV3IEJOKDIgKiB6ICogeikudG9SZWQodGhpcyk7XG5cbiAgICB3aGlsZSAodGhpcy5wb3coeiwgbHBvdykuY21wKG5PbmUpICE9PSAwKSB7XG4gICAgICB6LnJlZElBZGQobk9uZSk7XG4gICAgfVxuXG4gICAgdmFyIGMgPSB0aGlzLnBvdyh6LCBxKTtcbiAgICB2YXIgciA9IHRoaXMucG93KGEsIHEuYWRkbigxKS5pdXNocm4oMSkpO1xuICAgIHZhciB0ID0gdGhpcy5wb3coYSwgcSk7XG4gICAgdmFyIG0gPSBzO1xuICAgIHdoaWxlICh0LmNtcChvbmUpICE9PSAwKSB7XG4gICAgICB2YXIgdG1wID0gdDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyB0bXAuY21wKG9uZSkgIT09IDA7IGkrKykge1xuICAgICAgICB0bXAgPSB0bXAucmVkU3FyKCk7XG4gICAgICB9XG4gICAgICBhc3NlcnQoaSA8IG0pO1xuICAgICAgdmFyIGIgPSB0aGlzLnBvdyhjLCBuZXcgQk4oMSkuaXVzaGxuKG0gLSBpIC0gMSkpO1xuXG4gICAgICByID0gci5yZWRNdWwoYik7XG4gICAgICBjID0gYi5yZWRTcXIoKTtcbiAgICAgIHQgPSB0LnJlZE11bChjKTtcbiAgICAgIG0gPSBpO1xuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaW52bSA9IGZ1bmN0aW9uIGludm0gKGEpIHtcbiAgICB2YXIgaW52ID0gYS5faW52bXAodGhpcy5tKTtcbiAgICBpZiAoaW52Lm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICBpbnYubmVnYXRpdmUgPSAwO1xuICAgICAgcmV0dXJuIHRoaXMuaW1vZChpbnYpLnJlZE5lZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbW9kKGludik7XG4gICAgfVxuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24gcG93IChhLCBudW0pIHtcbiAgICBpZiAobnVtLmlzWmVybygpKSByZXR1cm4gbmV3IEJOKDEpLnRvUmVkKHRoaXMpO1xuICAgIGlmIChudW0uY21wbigxKSA9PT0gMCkgcmV0dXJuIGEuY2xvbmUoKTtcblxuICAgIHZhciB3aW5kb3dTaXplID0gNDtcbiAgICB2YXIgd25kID0gbmV3IEFycmF5KDEgPDwgd2luZG93U2l6ZSk7XG4gICAgd25kWzBdID0gbmV3IEJOKDEpLnRvUmVkKHRoaXMpO1xuICAgIHduZFsxXSA9IGE7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCB3bmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHduZFtpXSA9IHRoaXMubXVsKHduZFtpIC0gMV0sIGEpO1xuICAgIH1cblxuICAgIHZhciByZXMgPSB3bmRbMF07XG4gICAgdmFyIGN1cnJlbnQgPSAwO1xuICAgIHZhciBjdXJyZW50TGVuID0gMDtcbiAgICB2YXIgc3RhcnQgPSBudW0uYml0TGVuZ3RoKCkgJSAyNjtcbiAgICBpZiAoc3RhcnQgPT09IDApIHtcbiAgICAgIHN0YXJ0ID0gMjY7XG4gICAgfVxuXG4gICAgZm9yIChpID0gbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgd29yZCA9IG51bS53b3Jkc1tpXTtcbiAgICAgIGZvciAodmFyIGogPSBzdGFydCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIHZhciBiaXQgPSAod29yZCA+PiBqKSAmIDE7XG4gICAgICAgIGlmIChyZXMgIT09IHduZFswXSkge1xuICAgICAgICAgIHJlcyA9IHRoaXMuc3FyKHJlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYml0ID09PSAwICYmIGN1cnJlbnQgPT09IDApIHtcbiAgICAgICAgICBjdXJyZW50TGVuID0gMDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnQgPDw9IDE7XG4gICAgICAgIGN1cnJlbnQgfD0gYml0O1xuICAgICAgICBjdXJyZW50TGVuKys7XG4gICAgICAgIGlmIChjdXJyZW50TGVuICE9PSB3aW5kb3dTaXplICYmIChpICE9PSAwIHx8IGogIT09IDApKSBjb250aW51ZTtcblxuICAgICAgICByZXMgPSB0aGlzLm11bChyZXMsIHduZFtjdXJyZW50XSk7XG4gICAgICAgIGN1cnJlbnRMZW4gPSAwO1xuICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gMjY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmNvbnZlcnRUbyA9IGZ1bmN0aW9uIGNvbnZlcnRUbyAobnVtKSB7XG4gICAgdmFyIHIgPSBudW0udW1vZCh0aGlzLm0pO1xuXG4gICAgcmV0dXJuIHIgPT09IG51bSA/IHIuY2xvbmUoKSA6IHI7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5jb252ZXJ0RnJvbSA9IGZ1bmN0aW9uIGNvbnZlcnRGcm9tIChudW0pIHtcbiAgICB2YXIgcmVzID0gbnVtLmNsb25lKCk7XG4gICAgcmVzLnJlZCA9IG51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICAvL1xuICAvLyBNb250Z29tZXJ5IG1ldGhvZCBlbmdpbmVcbiAgLy9cblxuICBCTi5tb250ID0gZnVuY3Rpb24gbW9udCAobnVtKSB7XG4gICAgcmV0dXJuIG5ldyBNb250KG51bSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gTW9udCAobSkge1xuICAgIFJlZC5jYWxsKHRoaXMsIG0pO1xuXG4gICAgdGhpcy5zaGlmdCA9IHRoaXMubS5iaXRMZW5ndGgoKTtcbiAgICBpZiAodGhpcy5zaGlmdCAlIDI2ICE9PSAwKSB7XG4gICAgICB0aGlzLnNoaWZ0ICs9IDI2IC0gKHRoaXMuc2hpZnQgJSAyNik7XG4gICAgfVxuXG4gICAgdGhpcy5yID0gbmV3IEJOKDEpLml1c2hsbih0aGlzLnNoaWZ0KTtcbiAgICB0aGlzLnIyID0gdGhpcy5pbW9kKHRoaXMuci5zcXIoKSk7XG4gICAgdGhpcy5yaW52ID0gdGhpcy5yLl9pbnZtcCh0aGlzLm0pO1xuXG4gICAgdGhpcy5taW52ID0gdGhpcy5yaW52Lm11bCh0aGlzLnIpLmlzdWJuKDEpLmRpdih0aGlzLm0pO1xuICAgIHRoaXMubWludiA9IHRoaXMubWludi51bW9kKHRoaXMucik7XG4gICAgdGhpcy5taW52ID0gdGhpcy5yLnN1Yih0aGlzLm1pbnYpO1xuICB9XG4gIGluaGVyaXRzKE1vbnQsIFJlZCk7XG5cbiAgTW9udC5wcm90b3R5cGUuY29udmVydFRvID0gZnVuY3Rpb24gY29udmVydFRvIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5pbW9kKG51bS51c2hsbih0aGlzLnNoaWZ0KSk7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUuY29udmVydEZyb20gPSBmdW5jdGlvbiBjb252ZXJ0RnJvbSAobnVtKSB7XG4gICAgdmFyIHIgPSB0aGlzLmltb2QobnVtLm11bCh0aGlzLnJpbnYpKTtcbiAgICByLnJlZCA9IG51bGw7XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUuaW11bCA9IGZ1bmN0aW9uIGltdWwgKGEsIGIpIHtcbiAgICBpZiAoYS5pc1plcm8oKSB8fCBiLmlzWmVybygpKSB7XG4gICAgICBhLndvcmRzWzBdID0gMDtcbiAgICAgIGEubGVuZ3RoID0gMTtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHZhciB0ID0gYS5pbXVsKGIpO1xuICAgIHZhciBjID0gdC5tYXNrbih0aGlzLnNoaWZ0KS5tdWwodGhpcy5taW52KS5pbWFza24odGhpcy5zaGlmdCkubXVsKHRoaXMubSk7XG4gICAgdmFyIHUgPSB0LmlzdWIoYykuaXVzaHJuKHRoaXMuc2hpZnQpO1xuICAgIHZhciByZXMgPSB1O1xuXG4gICAgaWYgKHUuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzID0gdS5pc3ViKHRoaXMubSk7XG4gICAgfSBlbHNlIGlmICh1LmNtcG4oMCkgPCAwKSB7XG4gICAgICByZXMgPSB1LmlhZGQodGhpcy5tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcblxuICBNb250LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwgKGEsIGIpIHtcbiAgICBpZiAoYS5pc1plcm8oKSB8fCBiLmlzWmVybygpKSByZXR1cm4gbmV3IEJOKDApLl9mb3JjZVJlZCh0aGlzKTtcblxuICAgIHZhciB0ID0gYS5tdWwoYik7XG4gICAgdmFyIGMgPSB0Lm1hc2tuKHRoaXMuc2hpZnQpLm11bCh0aGlzLm1pbnYpLmltYXNrbih0aGlzLnNoaWZ0KS5tdWwodGhpcy5tKTtcbiAgICB2YXIgdSA9IHQuaXN1YihjKS5pdXNocm4odGhpcy5zaGlmdCk7XG4gICAgdmFyIHJlcyA9IHU7XG4gICAgaWYgKHUuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzID0gdS5pc3ViKHRoaXMubSk7XG4gICAgfSBlbHNlIGlmICh1LmNtcG4oMCkgPCAwKSB7XG4gICAgICByZXMgPSB1LmlhZGQodGhpcy5tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcblxuICBNb250LnByb3RvdHlwZS5pbnZtID0gZnVuY3Rpb24gaW52bSAoYSkge1xuICAgIC8vIChBUileLTEgKiBSXjIgPSAoQV4tMSAqIFJeLTEpICogUl4yID0gQV4tMSAqIFJcbiAgICB2YXIgcmVzID0gdGhpcy5pbW9kKGEuX2ludm1wKHRoaXMubSkubXVsKHRoaXMucjIpKTtcbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcbn0pKHR5cGVvZiBtb2R1bGUgPT09ICd1bmRlZmluZWQnIHx8IG1vZHVsZSwgdGhpcyk7XG4iXSwic291cmNlUm9vdCI6IiJ9