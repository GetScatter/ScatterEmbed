(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "/ab2":
/***/ (function(module, exports, __webpack_require__) {

var ciphers = __webpack_require__("iUdu")
var deciphers = __webpack_require__("QihY")
var modes = __webpack_require__("6F8h")

function getCiphers () {
  return Object.keys(modes)
}

exports.createCipher = exports.Cipher = ciphers.createCipher
exports.createCipheriv = exports.Cipheriv = ciphers.createCipheriv
exports.createDecipher = exports.Decipher = deciphers.createDecipher
exports.createDecipheriv = exports.Decipheriv = deciphers.createDecipheriv
exports.listCiphers = exports.getCiphers = getCiphers


/***/ }),

/***/ "/ayr":
/***/ (function(module, exports, __webpack_require__) {

var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto = __webpack_require__(3);
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}


/***/ }),

/***/ "6F8h":
/***/ (function(module) {

module.exports = JSON.parse("{\"aes-128-ecb\":{\"cipher\":\"AES\",\"key\":128,\"iv\":0,\"mode\":\"ECB\",\"type\":\"block\"},\"aes-192-ecb\":{\"cipher\":\"AES\",\"key\":192,\"iv\":0,\"mode\":\"ECB\",\"type\":\"block\"},\"aes-256-ecb\":{\"cipher\":\"AES\",\"key\":256,\"iv\":0,\"mode\":\"ECB\",\"type\":\"block\"},\"aes-128-cbc\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes-192-cbc\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes-256-cbc\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes128\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes192\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes256\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CBC\",\"type\":\"block\"},\"aes-128-cfb\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CFB\",\"type\":\"stream\"},\"aes-192-cfb\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CFB\",\"type\":\"stream\"},\"aes-256-cfb\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CFB\",\"type\":\"stream\"},\"aes-128-cfb8\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CFB8\",\"type\":\"stream\"},\"aes-192-cfb8\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CFB8\",\"type\":\"stream\"},\"aes-256-cfb8\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CFB8\",\"type\":\"stream\"},\"aes-128-cfb1\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CFB1\",\"type\":\"stream\"},\"aes-192-cfb1\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CFB1\",\"type\":\"stream\"},\"aes-256-cfb1\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CFB1\",\"type\":\"stream\"},\"aes-128-ofb\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"OFB\",\"type\":\"stream\"},\"aes-192-ofb\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"OFB\",\"type\":\"stream\"},\"aes-256-ofb\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"OFB\",\"type\":\"stream\"},\"aes-128-ctr\":{\"cipher\":\"AES\",\"key\":128,\"iv\":16,\"mode\":\"CTR\",\"type\":\"stream\"},\"aes-192-ctr\":{\"cipher\":\"AES\",\"key\":192,\"iv\":16,\"mode\":\"CTR\",\"type\":\"stream\"},\"aes-256-ctr\":{\"cipher\":\"AES\",\"key\":256,\"iv\":16,\"mode\":\"CTR\",\"type\":\"stream\"},\"aes-128-gcm\":{\"cipher\":\"AES\",\"key\":128,\"iv\":12,\"mode\":\"GCM\",\"type\":\"auth\"},\"aes-192-gcm\":{\"cipher\":\"AES\",\"key\":192,\"iv\":12,\"mode\":\"GCM\",\"type\":\"auth\"},\"aes-256-gcm\":{\"cipher\":\"AES\",\"key\":256,\"iv\":12,\"mode\":\"GCM\",\"type\":\"auth\"}}");

/***/ }),

/***/ "AUX7":
/***/ (function(module, exports) {

exports.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
}

exports.decrypt = function (self, block) {
  return self._cipher.decryptBlock(block)
}


/***/ }),

/***/ "B3Rj":
/***/ (function(module, exports, __webpack_require__) {

var basex = __webpack_require__("QqcV")
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),

/***/ "BumV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base58 = __webpack_require__("B3Rj")
var Buffer = __webpack_require__("hwdV").Buffer

module.exports = function (checksumFn) {
  // Encode a buffer as a base58-check encoded string
  function encode (payload) {
    var checksum = checksumFn(payload)

    return base58.encode(Buffer.concat([
      payload,
      checksum
    ], payload.length + 4))
  }

  function decodeRaw (buffer) {
    var payload = buffer.slice(0, -4)
    var checksum = buffer.slice(-4)
    var newChecksum = checksumFn(payload)

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3]) return

    return payload
  }

  // Decode a base58-check encoded string to a buffer, no result if checksum is wrong
  function decodeUnsafe (string) {
    var buffer = base58.decodeUnsafe(string)
    if (!buffer) return

    return decodeRaw(buffer)
  }

  function decode (string) {
    var buffer = base58.decode(string)
    var payload = decodeRaw(buffer, checksumFn)
    if (!payload) throw new Error('Invalid checksum')
    return payload
  }

  return {
    encode: encode,
    decode: decode,
    decodeUnsafe: decodeUnsafe
  }
}


/***/ }),

/***/ "C+gy":
/***/ (function(module, exports) {

exports['des-ecb'] = {
  key: 8,
  iv: 0
}
exports['des-cbc'] = exports.des = {
  key: 8,
  iv: 8
}
exports['des-ede3-cbc'] = exports.des3 = {
  key: 24,
  iv: 8
}
exports['des-ede3'] = {
  key: 24,
  iv: 0
}
exports['des-ede-cbc'] = {
  key: 16,
  iv: 8
}
exports['des-ede'] = {
  key: 16,
  iv: 0
}


/***/ }),

/***/ "CfXC":
/***/ (function(module, exports, __webpack_require__) {

var aes = __webpack_require__("OfWw")
var Buffer = __webpack_require__("hwdV").Buffer
var Transform = __webpack_require__("ZDAU")
var inherits = __webpack_require__("P7XM")

function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._mode = mode
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  return this._mode.encrypt(this, chunk, this._decrypt)
}

StreamCipher.prototype._final = function () {
  this._cipher.scrub()
}

module.exports = StreamCipher


/***/ }),

/***/ "DGy1":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
 * Backing buffer: ArrayBuffer, Accessor: Uint8Array
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bytebuffer.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("yXba")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else {}

})(this, function(Long) {
    "use strict";

    /**
     * Constructs a new ByteBuffer.
     * @class The swiss army knife for binary data in JavaScript.
     * @exports ByteBuffer
     * @constructor
     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @expose
     */
    var ByteBuffer = function(capacity, littleEndian, noAssert) {
        if (typeof capacity === 'undefined')
            capacity = ByteBuffer.DEFAULT_CAPACITY;
        if (typeof littleEndian === 'undefined')
            littleEndian = ByteBuffer.DEFAULT_ENDIAN;
        if (typeof noAssert === 'undefined')
            noAssert = ByteBuffer.DEFAULT_NOASSERT;
        if (!noAssert) {
            capacity = capacity | 0;
            if (capacity < 0)
                throw RangeError("Illegal capacity");
            littleEndian = !!littleEndian;
            noAssert = !!noAssert;
        }

        /**
         * Backing ArrayBuffer.
         * @type {!ArrayBuffer}
         * @expose
         */
        this.buffer = capacity === 0 ? EMPTY_BUFFER : new ArrayBuffer(capacity);

        /**
         * Uint8Array utilized to manipulate the backing buffer. Becomes `null` if the backing buffer has a capacity of `0`.
         * @type {?Uint8Array}
         * @expose
         */
        this.view = capacity === 0 ? null : new Uint8Array(this.buffer);

        /**
         * Absolute read/write offset.
         * @type {number}
         * @expose
         * @see ByteBuffer#flip
         * @see ByteBuffer#clear
         */
        this.offset = 0;

        /**
         * Marked offset.
         * @type {number}
         * @expose
         * @see ByteBuffer#mark
         * @see ByteBuffer#reset
         */
        this.markedOffset = -1;

        /**
         * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
         * @type {number}
         * @expose
         * @see ByteBuffer#flip
         * @see ByteBuffer#clear
         */
        this.limit = capacity;

        /**
         * Whether to use little endian byte order, defaults to `false` for big endian.
         * @type {boolean}
         * @expose
         */
        this.littleEndian = littleEndian;

        /**
         * Whether to skip assertions of offsets and values, defaults to `false`.
         * @type {boolean}
         * @expose
         */
        this.noAssert = noAssert;
    };

    /**
     * ByteBuffer version.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.VERSION = "5.0.1";

    /**
     * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
     * @type {boolean}
     * @const
     * @expose
     */
    ByteBuffer.LITTLE_ENDIAN = true;

    /**
     * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
     * @type {boolean}
     * @const
     * @expose
     */
    ByteBuffer.BIG_ENDIAN = false;

    /**
     * Default initial capacity of `16`.
     * @type {number}
     * @expose
     */
    ByteBuffer.DEFAULT_CAPACITY = 16;

    /**
     * Default endianess of `false` for big endian.
     * @type {boolean}
     * @expose
     */
    ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

    /**
     * Default no assertions flag of `false`.
     * @type {boolean}
     * @expose
     */
    ByteBuffer.DEFAULT_NOASSERT = false;

    /**
     * A `Long` class for representing a 64-bit two's-complement integer value. May be `null` if Long.js has not been loaded
     *  and int64 support is not available.
     * @type {?Long}
     * @const
     * @see https://github.com/dcodeIO/long.js
     * @expose
     */
    ByteBuffer.Long = Long || null;

    /**
     * @alias ByteBuffer.prototype
     * @inner
     */
    var ByteBufferPrototype = ByteBuffer.prototype;

    /**
     * An indicator used to reliably determine if an object is a ByteBuffer or not.
     * @type {boolean}
     * @const
     * @expose
     * @private
     */
    ByteBufferPrototype.__isByteBuffer__;

    Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    // helpers

    /**
     * @type {!ArrayBuffer}
     * @inner
     */
    var EMPTY_BUFFER = new ArrayBuffer(0);

    /**
     * String.fromCharCode reference for compile-time renaming.
     * @type {function(...number):string}
     * @inner
     */
    var stringFromCharCode = String.fromCharCode;

    /**
     * Creates a source function for a string.
     * @param {string} s String to read from
     * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
     *  no more characters left.
     * @throws {TypeError} If the argument is invalid
     * @inner
     */
    function stringSource(s) {
        var i=0; return function() {
            return i < s.length ? s.charCodeAt(i++) : null;
        };
    }

    /**
     * Creates a destination function for a string.
     * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
     *  Returns the final string when called without arguments.
     * @inner
     */
    function stringDestination() {
        var cs = [], ps = []; return function() {
            if (arguments.length === 0)
                return ps.join('')+stringFromCharCode.apply(String, cs);
            if (cs.length + arguments.length > 1024)
                ps.push(stringFromCharCode.apply(String, cs)),
                    cs.length = 0;
            Array.prototype.push.apply(cs, arguments);
        };
    }

    /**
     * Gets the accessor type.
     * @returns {Function} `Buffer` under node.js, `Uint8Array` respectively `DataView` in the browser (classes)
     * @expose
     */
    ByteBuffer.accessor = function() {
        return Uint8Array;
    };
    /**
     * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
        return new ByteBuffer(capacity, littleEndian, noAssert);
    };

    /**
     * Concatenates multiple ByteBuffers into one.
     * @param {!Array.<!ByteBuffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
     * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
     *  defaults to "utf8")
     * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
     *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} Concatenated ByteBuffer
     * @expose
     */
    ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
        if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
            noAssert = littleEndian;
            littleEndian = encoding;
            encoding = undefined;
        }
        var capacity = 0;
        for (var i=0, k=buffers.length, length; i<k; ++i) {
            if (!ByteBuffer.isByteBuffer(buffers[i]))
                buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
            length = buffers[i].limit - buffers[i].offset;
            if (length > 0) capacity += length;
        }
        if (capacity === 0)
            return new ByteBuffer(0, littleEndian, noAssert);
        var bb = new ByteBuffer(capacity, littleEndian, noAssert),
            bi;
        i=0; while (i<k) {
            bi = buffers[i++];
            length = bi.limit - bi.offset;
            if (length <= 0) continue;
            bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
            bb.offset += length;
        }
        bb.limit = bb.offset;
        bb.offset = 0;
        return bb;
    };

    /**
     * Tests if the specified type is a ByteBuffer.
     * @param {*} bb ByteBuffer to test
     * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
     * @expose
     */
    ByteBuffer.isByteBuffer = function(bb) {
        return (bb && bb["__isByteBuffer__"]) === true;
    };
    /**
     * Gets the backing buffer type.
     * @returns {Function} `Buffer` under node.js, `ArrayBuffer` in the browser (classes)
     * @expose
     */
    ByteBuffer.type = function() {
        return ArrayBuffer;
    };
    /**
     * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
     *  {@link ByteBuffer#limit} to the length of the wrapped data.
     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
     * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
     *  "utf8")
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
     * @expose
     */
    ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
        if (typeof encoding !== 'string') {
            noAssert = littleEndian;
            littleEndian = encoding;
            encoding = undefined;
        }
        if (typeof buffer === 'string') {
            if (typeof encoding === 'undefined')
                encoding = "utf8";
            switch (encoding) {
                case "base64":
                    return ByteBuffer.fromBase64(buffer, littleEndian);
                case "hex":
                    return ByteBuffer.fromHex(buffer, littleEndian);
                case "binary":
                    return ByteBuffer.fromBinary(buffer, littleEndian);
                case "utf8":
                    return ByteBuffer.fromUTF8(buffer, littleEndian);
                case "debug":
                    return ByteBuffer.fromDebug(buffer, littleEndian);
                default:
                    throw Error("Unsupported encoding: "+encoding);
            }
        }
        if (buffer === null || typeof buffer !== 'object')
            throw TypeError("Illegal buffer");
        var bb;
        if (ByteBuffer.isByteBuffer(buffer)) {
            bb = ByteBufferPrototype.clone.call(buffer);
            bb.markedOffset = -1;
            return bb;
        }
        if (buffer instanceof Uint8Array) { // Extract ArrayBuffer from Uint8Array
            bb = new ByteBuffer(0, littleEndian, noAssert);
            if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
                bb.buffer = buffer.buffer;
                bb.offset = buffer.byteOffset;
                bb.limit = buffer.byteOffset + buffer.byteLength;
                bb.view = new Uint8Array(buffer.buffer);
            }
        } else if (buffer instanceof ArrayBuffer) { // Reuse ArrayBuffer
            bb = new ByteBuffer(0, littleEndian, noAssert);
            if (buffer.byteLength > 0) {
                bb.buffer = buffer;
                bb.offset = 0;
                bb.limit = buffer.byteLength;
                bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
            }
        } else if (Object.prototype.toString.call(buffer) === "[object Array]") { // Create from octets
            bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
            bb.limit = buffer.length;
            for (var i=0; i<buffer.length; ++i)
                bb.view[i] = buffer[i];
        } else
            throw TypeError("Illegal buffer"); // Otherwise fail
        return bb;
    };

    /**
     * Writes the array as a bitset.
     * @param {Array<boolean>} value Array of booleans to write
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBufferPrototype.writeBitSet = function(value, offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;
      if (!this.noAssert) {
        if (!(value instanceof Array))
          throw TypeError("Illegal BitSet: Not an array");
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: "+offset+" (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.byteLength)
            throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
      }

      var start = offset,
          bits = value.length,
          bytes = (bits >> 3),
          bit = 0,
          k;

      offset += this.writeVarint32(bits,offset);

      while(bytes--) {
        k = (!!value[bit++] & 1) |
            ((!!value[bit++] & 1) << 1) |
            ((!!value[bit++] & 1) << 2) |
            ((!!value[bit++] & 1) << 3) |
            ((!!value[bit++] & 1) << 4) |
            ((!!value[bit++] & 1) << 5) |
            ((!!value[bit++] & 1) << 6) |
            ((!!value[bit++] & 1) << 7);
        this.writeByte(k,offset++);
      }

      if(bit < bits) {
        var m = 0; k = 0;
        while(bit < bits) k = k | ((!!value[bit++] & 1) << (m++));
        this.writeByte(k,offset++);
      }

      if (relative) {
        this.offset = offset;
        return this;
      }
      return offset - start;
    }

    /**
     * Reads a BitSet as an array of booleans.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {Array<boolean>
     * @expose
     */
    ByteBufferPrototype.readBitSet = function(offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      var ret = this.readVarint32(offset),
          bits = ret.value,
          bytes = (bits >> 3),
          bit = 0,
          value = [],
          k;

      offset += ret.length;

      while(bytes--) {
        k = this.readByte(offset++);
        value[bit++] = !!(k & 0x01);
        value[bit++] = !!(k & 0x02);
        value[bit++] = !!(k & 0x04);
        value[bit++] = !!(k & 0x08);
        value[bit++] = !!(k & 0x10);
        value[bit++] = !!(k & 0x20);
        value[bit++] = !!(k & 0x40);
        value[bit++] = !!(k & 0x80);
      }

      if(bit < bits) {
        var m = 0;
        k = this.readByte(offset++);
        while(bit < bits) value[bit++] = !!((k >> (m++)) & 1);
      }

      if (relative) {
        this.offset = offset;
      }
      return value;
    }
    /**
     * Reads the specified number of bytes.
     * @param {number} length Number of bytes to read
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBufferPrototype.readBytes = function(length, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + length > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
        }
        var slice = this.slice(offset, offset + length);
        if (relative) this.offset += length;
        return slice;
    };

    /**
     * Writes a payload of bytes. This is an alias of {@link ByteBuffer#append}.
     * @function
     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to write. If `source` is a ByteBuffer, its offsets
     *  will be modified according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;

    // types/ints/int8

    /**
     * Writes an 8bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeInt8 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 1;
        var capacity0 = this.buffer.byteLength;
        if (offset > capacity0)
            this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
        offset -= 1;
        this.view[offset] = value;
        if (relative) this.offset += 1;
        return this;
    };

    /**
     * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

    /**
     * Reads an 8bit signed integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt8 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
        }
        var value = this.view[offset];
        if ((value & 0x80) === 0x80) value = -(0xFF - value + 1); // Cast to signed
        if (relative) this.offset += 1;
        return value;
    };

    /**
     * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

    /**
     * Writes an 8bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeUint8 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 1;
        var capacity1 = this.buffer.byteLength;
        if (offset > capacity1)
            this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
        offset -= 1;
        this.view[offset] = value;
        if (relative) this.offset += 1;
        return this;
    };

    /**
     * Writes an 8bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint8}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;

    /**
     * Reads an 8bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUint8 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
        }
        var value = this.view[offset];
        if (relative) this.offset += 1;
        return value;
    };

    /**
     * Reads an 8bit unsigned integer. This is an alias of {@link ByteBuffer#readUint8}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;

    // types/ints/int16

    /**
     * Writes a 16bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeInt16 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 2;
        var capacity2 = this.buffer.byteLength;
        if (offset > capacity2)
            this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
        offset -= 2;
        if (this.littleEndian) {
            this.view[offset+1] = (value & 0xFF00) >>> 8;
            this.view[offset  ] =  value & 0x00FF;
        } else {
            this.view[offset]   = (value & 0xFF00) >>> 8;
            this.view[offset+1] =  value & 0x00FF;
        }
        if (relative) this.offset += 2;
        return this;
    };

    /**
     * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

    /**
     * Reads a 16bit signed integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readInt16 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.view[offset  ];
            value |= this.view[offset+1] << 8;
        } else {
            value  = this.view[offset  ] << 8;
            value |= this.view[offset+1];
        }
        if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1); // Cast to signed
        if (relative) this.offset += 2;
        return value;
    };

    /**
     * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

    /**
     * Writes a 16bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeUint16 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 2;
        var capacity3 = this.buffer.byteLength;
        if (offset > capacity3)
            this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
        offset -= 2;
        if (this.littleEndian) {
            this.view[offset+1] = (value & 0xFF00) >>> 8;
            this.view[offset  ] =  value & 0x00FF;
        } else {
            this.view[offset]   = (value & 0xFF00) >>> 8;
            this.view[offset+1] =  value & 0x00FF;
        }
        if (relative) this.offset += 2;
        return this;
    };

    /**
     * Writes a 16bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint16}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;

    /**
     * Reads a 16bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readUint16 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.view[offset  ];
            value |= this.view[offset+1] << 8;
        } else {
            value  = this.view[offset  ] << 8;
            value |= this.view[offset+1];
        }
        if (relative) this.offset += 2;
        return value;
    };

    /**
     * Reads a 16bit unsigned integer. This is an alias of {@link ByteBuffer#readUint16}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;

    // types/ints/int32

    /**
     * Writes a 32bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeInt32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 4;
        var capacity4 = this.buffer.byteLength;
        if (offset > capacity4)
            this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
        offset -= 4;
        if (this.littleEndian) {
            this.view[offset+3] = (value >>> 24) & 0xFF;
            this.view[offset+2] = (value >>> 16) & 0xFF;
            this.view[offset+1] = (value >>>  8) & 0xFF;
            this.view[offset  ] =  value         & 0xFF;
        } else {
            this.view[offset  ] = (value >>> 24) & 0xFF;
            this.view[offset+1] = (value >>> 16) & 0xFF;
            this.view[offset+2] = (value >>>  8) & 0xFF;
            this.view[offset+3] =  value         & 0xFF;
        }
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

    /**
     * Reads a 32bit signed integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.view[offset+2] << 16;
            value |= this.view[offset+1] <<  8;
            value |= this.view[offset  ];
            value += this.view[offset+3] << 24 >>> 0;
        } else {
            value  = this.view[offset+1] << 16;
            value |= this.view[offset+2] <<  8;
            value |= this.view[offset+3];
            value += this.view[offset  ] << 24 >>> 0;
        }
        value |= 0; // Cast to signed
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

    /**
     * Writes a 32bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeUint32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 4;
        var capacity5 = this.buffer.byteLength;
        if (offset > capacity5)
            this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
        offset -= 4;
        if (this.littleEndian) {
            this.view[offset+3] = (value >>> 24) & 0xFF;
            this.view[offset+2] = (value >>> 16) & 0xFF;
            this.view[offset+1] = (value >>>  8) & 0xFF;
            this.view[offset  ] =  value         & 0xFF;
        } else {
            this.view[offset  ] = (value >>> 24) & 0xFF;
            this.view[offset+1] = (value >>> 16) & 0xFF;
            this.view[offset+2] = (value >>>  8) & 0xFF;
            this.view[offset+3] =  value         & 0xFF;
        }
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint32}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;

    /**
     * Reads a 32bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUint32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.view[offset+2] << 16;
            value |= this.view[offset+1] <<  8;
            value |= this.view[offset  ];
            value += this.view[offset+3] << 24 >>> 0;
        } else {
            value  = this.view[offset+1] << 16;
            value |= this.view[offset+2] <<  8;
            value |= this.view[offset+3];
            value += this.view[offset  ] << 24 >>> 0;
        }
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit unsigned integer. This is an alias of {@link ByteBuffer#readUint32}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;

    // types/ints/int64

    if (Long) {

        /**
         * Writes a 64bit signed integer.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeInt64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            offset += 8;
            var capacity6 = this.buffer.byteLength;
            if (offset > capacity6)
                this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
            offset -= 8;
            var lo = value.low,
                hi = value.high;
            if (this.littleEndian) {
                this.view[offset+3] = (lo >>> 24) & 0xFF;
                this.view[offset+2] = (lo >>> 16) & 0xFF;
                this.view[offset+1] = (lo >>>  8) & 0xFF;
                this.view[offset  ] =  lo         & 0xFF;
                offset += 4;
                this.view[offset+3] = (hi >>> 24) & 0xFF;
                this.view[offset+2] = (hi >>> 16) & 0xFF;
                this.view[offset+1] = (hi >>>  8) & 0xFF;
                this.view[offset  ] =  hi         & 0xFF;
            } else {
                this.view[offset  ] = (hi >>> 24) & 0xFF;
                this.view[offset+1] = (hi >>> 16) & 0xFF;
                this.view[offset+2] = (hi >>>  8) & 0xFF;
                this.view[offset+3] =  hi         & 0xFF;
                offset += 4;
                this.view[offset  ] = (lo >>> 24) & 0xFF;
                this.view[offset+1] = (lo >>> 16) & 0xFF;
                this.view[offset+2] = (lo >>>  8) & 0xFF;
                this.view[offset+3] =  lo         & 0xFF;
            }
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;

        /**
         * Reads a 64bit signed integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readInt64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
            }
            var lo = 0,
                hi = 0;
            if (this.littleEndian) {
                lo  = this.view[offset+2] << 16;
                lo |= this.view[offset+1] <<  8;
                lo |= this.view[offset  ];
                lo += this.view[offset+3] << 24 >>> 0;
                offset += 4;
                hi  = this.view[offset+2] << 16;
                hi |= this.view[offset+1] <<  8;
                hi |= this.view[offset  ];
                hi += this.view[offset+3] << 24 >>> 0;
            } else {
                hi  = this.view[offset+1] << 16;
                hi |= this.view[offset+2] <<  8;
                hi |= this.view[offset+3];
                hi += this.view[offset  ] << 24 >>> 0;
                offset += 4;
                lo  = this.view[offset+1] << 16;
                lo |= this.view[offset+2] <<  8;
                lo |= this.view[offset+3];
                lo += this.view[offset  ] << 24 >>> 0;
            }
            var value = new Long(lo, hi, false);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;

        /**
         * Writes a 64bit unsigned integer.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUint64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            offset += 8;
            var capacity7 = this.buffer.byteLength;
            if (offset > capacity7)
                this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
            offset -= 8;
            var lo = value.low,
                hi = value.high;
            if (this.littleEndian) {
                this.view[offset+3] = (lo >>> 24) & 0xFF;
                this.view[offset+2] = (lo >>> 16) & 0xFF;
                this.view[offset+1] = (lo >>>  8) & 0xFF;
                this.view[offset  ] =  lo         & 0xFF;
                offset += 4;
                this.view[offset+3] = (hi >>> 24) & 0xFF;
                this.view[offset+2] = (hi >>> 16) & 0xFF;
                this.view[offset+1] = (hi >>>  8) & 0xFF;
                this.view[offset  ] =  hi         & 0xFF;
            } else {
                this.view[offset  ] = (hi >>> 24) & 0xFF;
                this.view[offset+1] = (hi >>> 16) & 0xFF;
                this.view[offset+2] = (hi >>>  8) & 0xFF;
                this.view[offset+3] =  hi         & 0xFF;
                offset += 4;
                this.view[offset  ] = (lo >>> 24) & 0xFF;
                this.view[offset+1] = (lo >>> 16) & 0xFF;
                this.view[offset+2] = (lo >>>  8) & 0xFF;
                this.view[offset+3] =  lo         & 0xFF;
            }
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint64}.
         * @function
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;

        /**
         * Reads a 64bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readUint64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
            }
            var lo = 0,
                hi = 0;
            if (this.littleEndian) {
                lo  = this.view[offset+2] << 16;
                lo |= this.view[offset+1] <<  8;
                lo |= this.view[offset  ];
                lo += this.view[offset+3] << 24 >>> 0;
                offset += 4;
                hi  = this.view[offset+2] << 16;
                hi |= this.view[offset+1] <<  8;
                hi |= this.view[offset  ];
                hi += this.view[offset+3] << 24 >>> 0;
            } else {
                hi  = this.view[offset+1] << 16;
                hi |= this.view[offset+2] <<  8;
                hi |= this.view[offset+3];
                hi += this.view[offset  ] << 24 >>> 0;
                offset += 4;
                lo  = this.view[offset+1] << 16;
                lo |= this.view[offset+2] <<  8;
                lo |= this.view[offset+3];
                lo += this.view[offset  ] << 24 >>> 0;
            }
            var value = new Long(lo, hi, true);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit unsigned integer. This is an alias of {@link ByteBuffer#readUint64}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;

    } // Long


    // types/floats/float32

    /*
     ieee754 - https://github.com/feross/ieee754

     The MIT License (MIT)

     Copyright (c) Feross Aboukhadijeh

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.
    */

    /**
     * Reads an IEEE754 float from a byte array.
     * @param {!Array} buffer
     * @param {number} offset
     * @param {boolean} isLE
     * @param {number} mLen
     * @param {number} nBytes
     * @returns {number}
     * @inner
     */
    function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
        var e, m,
            eLen = nBytes * 8 - mLen - 1,
            eMax = (1 << eLen) - 1,
            eBias = eMax >> 1,
            nBits = -7,
            i = isLE ? (nBytes - 1) : 0,
            d = isLE ? -1 : 1,
            s = buffer[offset + i];

        i += d;

        e = s & ((1 << (-nBits)) - 1);
        s >>= (-nBits);
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & ((1 << (-nBits)) - 1);
        e >>= (-nBits);
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
            e = 1 - eBias;
        } else if (e === eMax) {
            return m ? NaN : ((s ? -1 : 1) * Infinity);
        } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    }

    /**
     * Writes an IEEE754 float to a byte array.
     * @param {!Array} buffer
     * @param {number} value
     * @param {number} offset
     * @param {boolean} isLE
     * @param {number} mLen
     * @param {number} nBytes
     * @inner
     */
    function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c,
            eLen = nBytes * 8 - mLen - 1,
            eMax = (1 << eLen) - 1,
            eBias = eMax >> 1,
            rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
            i = isLE ? 0 : (nBytes - 1),
            d = isLE ? 1 : -1,
            s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
        } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
                e--;
                c *= 2;
            }
            if (e + eBias >= 1) {
                value += rt / c;
            } else {
                value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
                e++;
                c /= 2;
            }

            if (e + eBias >= eMax) {
                m = 0;
                e = eMax;
            } else if (e + eBias >= 1) {
                m = (value * c - 1) * Math.pow(2, mLen);
                e = e + eBias;
            } else {
                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                e = 0;
            }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = (e << mLen) | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
    }

    /**
     * Writes a 32bit float.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number')
                throw TypeError("Illegal value: "+value+" (not a number)");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 4;
        var capacity8 = this.buffer.byteLength;
        if (offset > capacity8)
            this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
        offset -= 4;
        ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

    /**
     * Reads a 32bit float.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

    // types/floats/float64

    /**
     * Writes a 64bit float.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat64 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number')
                throw TypeError("Illegal value: "+value+" (not a number)");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        offset += 8;
        var capacity9 = this.buffer.byteLength;
        if (offset > capacity9)
            this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
        offset -= 8;
        ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
        if (relative) this.offset += 8;
        return this;
    };

    /**
     * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

    /**
     * Reads a 64bit float.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat64 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
        if (relative) this.offset += 8;
        return value;
    };

    /**
     * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


    // types/varints/varint32

    /**
     * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
     * @type {number}
     * @const
     * @expose
     */
    ByteBuffer.MAX_VARINT32_BYTES = 5;

    /**
     * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
     * @param {number} value Value to encode
     * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
     * @expose
     */
    ByteBuffer.calculateVarint32 = function(value) {
        // ref: src/google/protobuf/io/coded_stream.cc
        value = value >>> 0;
             if (value < 1 << 7 ) return 1;
        else if (value < 1 << 14) return 2;
        else if (value < 1 << 21) return 3;
        else if (value < 1 << 28) return 4;
        else                      return 5;
    };

    /**
     * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
     * @param {number} n Signed 32bit integer
     * @returns {number} Unsigned zigzag encoded 32bit integer
     * @expose
     */
    ByteBuffer.zigZagEncode32 = function(n) {
        return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
    };

    /**
     * Decodes a zigzag encoded signed 32bit integer.
     * @param {number} n Unsigned zigzag encoded 32bit integer
     * @returns {number} Signed 32bit integer
     * @expose
     */
    ByteBuffer.zigZagDecode32 = function(n) {
        return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
    };

    /**
     * Writes a 32bit base 128 variable-length integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeVarint32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        var size = ByteBuffer.calculateVarint32(value),
            b;
        offset += size;
        var capacity10 = this.buffer.byteLength;
        if (offset > capacity10)
            this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
        offset -= size;
        value >>>= 0;
        while (value >= 0x80) {
            b = (value & 0x7f) | 0x80;
            this.view[offset++] = b;
            value >>>= 7;
        }
        this.view[offset++] = value;
        if (relative) {
            this.offset = offset;
            return this;
        }
        return size;
    };

    /**
     * Writes a zig-zag encoded (signed) 32bit base 128 variable-length integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
    };

    /**
     * Reads a 32bit base 128 variable-length integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
     *  and the actual number of bytes read.
     * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
     *  to fully decode the varint.
     * @expose
     */
    ByteBufferPrototype.readVarint32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
        }
        var c = 0,
            value = 0 >>> 0,
            b;
        do {
            if (!this.noAssert && offset > this.limit) {
                var err = Error("Truncated");
                err['truncated'] = true;
                throw err;
            }
            b = this.view[offset++];
            if (c < 5)
                value |= (b & 0x7f) << (7*c);
            ++c;
        } while ((b & 0x80) !== 0);
        value |= 0;
        if (relative) {
            this.offset = offset;
            return value;
        }
        return {
            "value": value,
            "length": c
        };
    };

    /**
     * Reads a zig-zag encoded (signed) 32bit base 128 variable-length integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
     *  and the actual number of bytes read.
     * @throws {Error} If it's not a valid varint
     * @expose
     */
    ByteBufferPrototype.readVarint32ZigZag = function(offset) {
        var val = this.readVarint32(offset);
        if (typeof val === 'object')
            val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
        else
            val = ByteBuffer.zigZagDecode32(val);
        return val;
    };

    // types/varints/varint64

    if (Long) {

        /**
         * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
         * @type {number}
         * @const
         * @expose
         */
        ByteBuffer.MAX_VARINT64_BYTES = 10;

        /**
         * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
         * @param {number|!Long} value Value to encode
         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
         * @expose
         */
        ByteBuffer.calculateVarint64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            // ref: src/google/protobuf/io/coded_stream.cc
            var part0 = value.toInt() >>> 0,
                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
            if (part2 == 0) {
                if (part1 == 0) {
                    if (part0 < 1 << 14)
                        return part0 < 1 << 7 ? 1 : 2;
                    else
                        return part0 < 1 << 21 ? 3 : 4;
                } else {
                    if (part1 < 1 << 14)
                        return part1 < 1 << 7 ? 5 : 6;
                    else
                        return part1 < 1 << 21 ? 7 : 8;
                }
            } else
                return part2 < 1 << 7 ? 9 : 10;
        };

        /**
         * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
         * @param {number|!Long} value Signed long
         * @returns {!Long} Unsigned zigzag encoded long
         * @expose
         */
        ByteBuffer.zigZagEncode64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            // ref: src/google/protobuf/wire_format_lite.h
            return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
        };

        /**
         * Decodes a zigzag encoded signed 64bit integer.
         * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
         * @returns {!Long} Signed long
         * @expose
         */
        ByteBuffer.zigZagDecode64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            // ref: src/google/protobuf/wire_format_lite.h
            return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
        };

        /**
         * Writes a 64bit base 128 variable-length integer.
         * @param {number|Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeVarint64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            var size = ByteBuffer.calculateVarint64(value),
                part0 = value.toInt() >>> 0,
                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
            offset += size;
            var capacity11 = this.buffer.byteLength;
            if (offset > capacity11)
                this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
            offset -= size;
            switch (size) {
                case 10: this.view[offset+9] = (part2 >>>  7) & 0x01;
                case 9 : this.view[offset+8] = size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F;
                case 8 : this.view[offset+7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
                case 7 : this.view[offset+6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
                case 6 : this.view[offset+5] = size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F;
                case 5 : this.view[offset+4] = size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F;
                case 4 : this.view[offset+3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
                case 3 : this.view[offset+2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
                case 2 : this.view[offset+1] = size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F;
                case 1 : this.view[offset  ] = size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F;
            }
            if (relative) {
                this.offset += size;
                return this;
            } else {
                return size;
            }
        };

        /**
         * Writes a zig-zag encoded 64bit base 128 variable-length integer.
         * @param {number|Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
            return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
        };

        /**
         * Reads a 64bit base 128 variable-length integer. Requires Long.js.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
         *  the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            // ref: src/google/protobuf/io/coded_stream.cc
            var start = offset,
                part0 = 0,
                part1 = 0,
                part2 = 0,
                b  = 0;
            b = this.view[offset++]; part0  = (b & 0x7F)      ; if ( b & 0x80                                                   ) {
            b = this.view[offset++]; part0 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part0 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part0 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part1  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part1 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part1 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part1 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part2  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.view[offset++]; part2 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            throw Error("Buffer overrun"); }}}}}}}}}}
            var value = Long.fromBits(part0 | (part1 << 28), (part1 >>> 4) | (part2) << 24, false);
            if (relative) {
                this.offset = offset;
                return value;
            } else {
                return {
                    'value': value,
                    'length': offset-start
                };
            }
        };

        /**
         * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
         *  the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
            var val = this.readVarint64(offset);
            if (val && val['value'] instanceof Long)
                val["value"] = ByteBuffer.zigZagDecode64(val["value"]);
            else
                val = ByteBuffer.zigZagDecode64(val);
            return val;
        };

    } // Long


    // types/strings/cstring

    /**
     * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
     *  characters itself.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  contained in `str` + 1 if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeCString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        var i,
            k = str.length;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            for (i=0; i<k; ++i) {
                if (str.charCodeAt(i) === 0)
                    throw RangeError("Illegal str: Contains NULL-characters");
            }
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        // UTF8 strings do not contain zero bytes in between except for the zero character, so:
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k+1;
        var capacity12 = this.buffer.byteLength;
        if (offset > capacity12)
            this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
        offset -= k+1;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
            this.view[offset++] = b;
        }.bind(this));
        this.view[offset++] = 0;
        if (relative) {
            this.offset = offset;
            return this;
        }
        return k;
    };

    /**
     * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
     *  itself.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readCString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
        }
        var start = offset,
            temp;
        // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
        var sd, b = -1;
        utfx.decodeUTF8toUTF16(function() {
            if (b === 0) return null;
            if (offset >= this.limit)
                throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);
            b = this.view[offset++];
            return b === 0 ? null : b;
        }.bind(this), sd = stringDestination(), true);
        if (relative) {
            this.offset = offset;
            return sd();
        } else {
            return {
                "string": sd(),
                "length": offset - start
            };
        }
    };

    // types/strings/istring

    /**
     * Writes a length as uint32 prefixed UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
     * @expose
     * @see ByteBuffer#writeVarint32
     */
    ByteBufferPrototype.writeIString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        var start = offset,
            k;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        offset += 4+k;
        var capacity13 = this.buffer.byteLength;
        if (offset > capacity13)
            this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
        offset -= 4+k;
        if (this.littleEndian) {
            this.view[offset+3] = (k >>> 24) & 0xFF;
            this.view[offset+2] = (k >>> 16) & 0xFF;
            this.view[offset+1] = (k >>>  8) & 0xFF;
            this.view[offset  ] =  k         & 0xFF;
        } else {
            this.view[offset  ] = (k >>> 24) & 0xFF;
            this.view[offset+1] = (k >>> 16) & 0xFF;
            this.view[offset+2] = (k >>>  8) & 0xFF;
            this.view[offset+3] =  k         & 0xFF;
        }
        offset += 4;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
            this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + 4 + k)
            throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));
        if (relative) {
            this.offset = offset;
            return this;
        }
        return offset - start;
    };

    /**
     * Reads a length as uint32 prefixed UTF8 encoded string.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     * @see ByteBuffer#readVarint32
     */
    ByteBufferPrototype.readIString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readUint32(offset);
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str['length'];
        if (relative) {
            this.offset = offset;
            return str['string'];
        } else {
            return {
                'string': str['string'],
                'length': offset - start
            };
        }
    };

    // types/strings/utf8string

    /**
     * Metrics representing number of UTF8 characters. Evaluates to `c`.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.METRICS_CHARS = 'c';

    /**
     * Metrics representing number of bytes. Evaluates to `b`.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.METRICS_BYTES = 'b';

    /**
     * Writes an UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
     * @expose
     */
    ByteBufferPrototype.writeUTF8String = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        var k;
        var start = offset;
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k;
        var capacity14 = this.buffer.byteLength;
        if (offset > capacity14)
            this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
        offset -= k;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
            this.view[offset++] = b;
        }.bind(this));
        if (relative) {
            this.offset = offset;
            return this;
        }
        return offset - start;
    };

    /**
     * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
     * @function
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
     * @expose
     */
    ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

    /**
     * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
     *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 characters
     * @expose
     */
    ByteBuffer.calculateUTF8Chars = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
    };

    /**
     * Calculates the number of UTF8 bytes of a string.
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 bytes
     * @expose
     */
    ByteBuffer.calculateUTF8Bytes = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[1];
    };

    /**
     * Calculates the number of UTF8 bytes of a string. This is an alias of {@link ByteBuffer.calculateUTF8Bytes}.
     * @function
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 bytes
     * @expose
     */
    ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;

    /**
     * Reads an UTF8 encoded string.
     * @param {number} length Number of characters or bytes to read.
     * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
     *  {@link ByteBuffer.METRICS_CHARS}.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
        if (typeof metrics === 'number') {
            offset = metrics;
            metrics = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
        if (!this.noAssert) {
            if (typeof length !== 'number' || length % 1 !== 0)
                throw TypeError("Illegal length: "+length+" (not an integer)");
            length |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        var i = 0,
            start = offset,
            sd;
        if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
            sd = stringDestination();
            utfx.decodeUTF8(function() {
                return i < length && offset < this.limit ? this.view[offset++] : null;
            }.bind(this), function(cp) {
                ++i; utfx.UTF8toUTF16(cp, sd);
            });
            if (i !== length)
                throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    "string": sd(),
                    "length": offset - start
                };
            }
        } else if (metrics === ByteBuffer.METRICS_BYTES) {
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + length > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
            }
            var k = offset + length;
            utfx.decodeUTF8toUTF16(function() {
                return offset < k ? this.view[offset++] : null;
            }.bind(this), sd = stringDestination(), this.noAssert);
            if (offset !== k)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    'string': sd(),
                    'length': offset - start
                };
            }
        } else
            throw TypeError("Unsupported metrics: "+metrics);
    };

    /**
     * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
     * @function
     * @param {number} length Number of characters or bytes to read
     * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
     *  {@link ByteBuffer.METRICS_CHARS}.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

    // types/strings/vstring

    /**
     * Writes a length as varint32 prefixed UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
     * @expose
     * @see ByteBuffer#writeVarint32
     */
    ByteBufferPrototype.writeVString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        var start = offset,
            k, l;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        l = ByteBuffer.calculateVarint32(k);
        offset += l+k;
        var capacity15 = this.buffer.byteLength;
        if (offset > capacity15)
            this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
        offset -= l+k;
        offset += this.writeVarint32(k, offset);
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
            this.view[offset++] = b;
        }.bind(this));
        if (offset !== start+k+l)
            throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));
        if (relative) {
            this.offset = offset;
            return this;
        }
        return offset - start;
    };

    /**
     * Reads a length as varint32 prefixed UTF8 encoded string.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     * @see ByteBuffer#readVarint32
     */
    ByteBufferPrototype.readVString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readVarint32(offset);
        var str = this.readUTF8String(len['value'], ByteBuffer.METRICS_BYTES, offset += len['length']);
        offset += str['length'];
        if (relative) {
            this.offset = offset;
            return str['string'];
        } else {
            return {
                'string': str['string'],
                'length': offset - start
            };
        }
    };


    /**
     * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
     *  data's length.
     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its offsets
     *  will be modified according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
     * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
     */
    ByteBufferPrototype.append = function(source, encoding, offset) {
        if (typeof encoding === 'number' || typeof encoding !== 'string') {
            offset = encoding;
            encoding = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        if (!(source instanceof ByteBuffer))
            source = ByteBuffer.wrap(source, encoding);
        var length = source.limit - source.offset;
        if (length <= 0) return this; // Nothing to append
        offset += length;
        var capacity16 = this.buffer.byteLength;
        if (offset > capacity16)
            this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
        offset -= length;
        this.view.set(source.view.subarray(source.offset, source.limit), offset);
        source.offset += length;
        if (relative) this.offset += length;
        return this;
    };

    /**
     * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
        specified offset up to the length of this ByteBuffer's data.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @see ByteBuffer#append
     */
    ByteBufferPrototype.appendTo = function(target, offset) {
        target.append(this, offset);
        return this;
    };

    /**
     * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
     *  disable them if your code already makes sure that everything is valid.
     * @param {boolean} assert `true` to enable assertions, otherwise `false`
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.assert = function(assert) {
        this.noAssert = !assert;
        return this;
    };

    /**
     * Gets the capacity of this ByteBuffer's backing buffer.
     * @returns {number} Capacity of the backing buffer
     * @expose
     */
    ByteBufferPrototype.capacity = function() {
        return this.buffer.byteLength;
    };
    /**
     * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
     *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.clear = function() {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset = -1;
        return this;
    };

    /**
     * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
     *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
     * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
     * @returns {!ByteBuffer} Cloned instance
     * @expose
     */
    ByteBufferPrototype.clone = function(copy) {
        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
        if (copy) {
            bb.buffer = new ArrayBuffer(this.buffer.byteLength);
            bb.view = new Uint8Array(bb.buffer);
        } else {
            bb.buffer = this.buffer;
            bb.view = this.view;
        }
        bb.offset = this.offset;
        bb.markedOffset = this.markedOffset;
        bb.limit = this.limit;
        return bb;
    };

    /**
     * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
     *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
     *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.compact = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        if (begin === 0 && end === this.buffer.byteLength)
            return this; // Already compacted
        var len = end - begin;
        if (len === 0) {
            this.buffer = EMPTY_BUFFER;
            this.view = null;
            if (this.markedOffset >= 0) this.markedOffset -= begin;
            this.offset = 0;
            this.limit = 0;
            return this;
        }
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        view.set(this.view.subarray(begin, end));
        this.buffer = buffer;
        this.view = view;
        if (this.markedOffset >= 0) this.markedOffset -= begin;
        this.offset = 0;
        this.limit = len;
        return this;
    };

    /**
     * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}.
     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} Copy
     * @expose
     */
    ByteBufferPrototype.copy = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        if (begin === end)
            return new ByteBuffer(0, this.littleEndian, this.noAssert);
        var capacity = end - begin,
            bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
        bb.offset = 0;
        bb.limit = capacity;
        if (bb.markedOffset >= 0) bb.markedOffset -= begin;
        this.copyTo(bb, 0, begin, end);
        return bb;
    };

    /**
     * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
     *  by the number of bytes copied if omitted.
     * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
     *  number of bytes copied if omitted.
     * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
        var relative,
            targetRelative;
        if (!this.noAssert) {
            if (!ByteBuffer.isByteBuffer(target))
                throw TypeError("Illegal target: Not a ByteBuffer");
        }
        targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
        sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
        sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

        if (targetOffset < 0 || targetOffset > target.buffer.byteLength)
            throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);
        if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength)
            throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);

        var len = sourceLimit - sourceOffset;
        if (len === 0)
            return target; // Nothing to copy

        target.ensureCapacity(targetOffset + len);

        target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);

        if (relative) this.offset += len;
        if (targetRelative) target.offset += len;

        return this;
    };

    /**
     * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
     *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
     *  the required capacity will be used instead.
     * @param {number} capacity Required capacity
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.ensureCapacity = function(capacity) {
        var current = this.buffer.byteLength;
        if (current < capacity)
            return this.resize((current *= 2) > capacity ? current : capacity);
        return this;
    };

    /**
     * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
     * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
     * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted. defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} this
     * @expose
     * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
     */
    ByteBufferPrototype.fill = function(value, begin, end) {
        var relative = typeof begin === 'undefined';
        if (relative) begin = this.offset;
        if (typeof value === 'string' && value.length > 0)
            value = value.charCodeAt(0);
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        if (begin >= end)
            return this; // Nothing to fill
        while (begin < end) this.view[begin++] = value;
        if (relative) this.offset = begin;
        return this;
    };

    /**
     * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
     *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.flip = function() {
        this.limit = this.offset;
        this.offset = 0;
        return this;
    };
    /**
     * Marks an offset on this ByteBuffer to be used later.
     * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
     * @returns {!ByteBuffer} this
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @see ByteBuffer#reset
     * @expose
     */
    ByteBufferPrototype.mark = function(offset) {
        offset = typeof offset === 'undefined' ? this.offset : offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        this.markedOffset = offset;
        return this;
    };
    /**
     * Sets the byte order.
     * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.order = function(littleEndian) {
        if (!this.noAssert) {
            if (typeof littleEndian !== 'boolean')
                throw TypeError("Illegal littleEndian: Not a boolean");
        }
        this.littleEndian = !!littleEndian;
        return this;
    };

    /**
     * Switches (to) little endian byte order.
     * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.LE = function(littleEndian) {
        this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
        return this;
    };

    /**
     * Switches (to) big endian byte order.
     * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.BE = function(bigEndian) {
        this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
        return this;
    };
    /**
     * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
     *  will be resized and its contents moved accordingly.
     * @param {!ByteBuffer|string|!ArrayBuffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be
     *  modified according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
     *  prepended if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
     * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
     */
    ByteBufferPrototype.prepend = function(source, encoding, offset) {
        if (typeof encoding === 'number' || typeof encoding !== 'string') {
            offset = encoding;
            encoding = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
        }
        if (!(source instanceof ByteBuffer))
            source = ByteBuffer.wrap(source, encoding);
        var len = source.limit - source.offset;
        if (len <= 0) return this; // Nothing to prepend
        var diff = len - offset;
        if (diff > 0) { // Not enough space before offset, so resize + move
            var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
            var view = new Uint8Array(buffer);
            view.set(this.view.subarray(offset, this.buffer.byteLength), len);
            this.buffer = buffer;
            this.view = view;
            this.offset += diff;
            if (this.markedOffset >= 0) this.markedOffset += diff;
            this.limit += diff;
            offset += diff;
        } else {
            var arrayView = new Uint8Array(this.buffer);
        }
        this.view.set(source.view.subarray(source.offset, source.limit), offset - len);

        source.offset = source.limit;
        if (relative)
            this.offset -= len;
        return this;
    };

    /**
     * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
     *  will be resized and its contents moved accordingly.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
     *  prepended if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @see ByteBuffer#prepend
     */
    ByteBufferPrototype.prependTo = function(target, offset) {
        target.prepend(this, offset);
        return this;
    };
    /**
     * Prints debug information about this ByteBuffer's contents.
     * @param {function(string)=} out Output function to call, defaults to console.log
     * @expose
     */
    ByteBufferPrototype.printDebug = function(out) {
        if (typeof out !== 'function') out = console.log.bind(console);
        out(
            this.toString()+"\n"+
            "-------------------------------------------------------------------\n"+
            this.toDebug(/* columns */ true)
        );
    };

    /**
     * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
     * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
     * @expose
     */
    ByteBufferPrototype.remaining = function() {
        return this.limit - this.offset;
    };
    /**
     * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
     *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
     *  marked, sets `offset = 0`.
     * @returns {!ByteBuffer} this
     * @see ByteBuffer#mark
     * @expose
     */
    ByteBufferPrototype.reset = function() {
        if (this.markedOffset >= 0) {
            this.offset = this.markedOffset;
            this.markedOffset = -1;
        } else {
            this.offset = 0;
        }
        return this;
    };
    /**
     * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
     *  large or larger.
     * @param {number} capacity Capacity required
     * @returns {!ByteBuffer} this
     * @throws {TypeError} If `capacity` is not a number
     * @throws {RangeError} If `capacity < 0`
     * @expose
     */
    ByteBufferPrototype.resize = function(capacity) {
        if (!this.noAssert) {
            if (typeof capacity !== 'number' || capacity % 1 !== 0)
                throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
            capacity |= 0;
            if (capacity < 0)
                throw RangeError("Illegal capacity: 0 <= "+capacity);
        }
        if (this.buffer.byteLength < capacity) {
            var buffer = new ArrayBuffer(capacity);
            var view = new Uint8Array(buffer);
            view.set(this.view);
            this.buffer = buffer;
            this.view = view;
        }
        return this;
    };
    /**
     * Reverses this ByteBuffer's contents.
     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.reverse = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        if (begin === end)
            return this; // Nothing to reverse
        Array.prototype.reverse.call(this.view.subarray(begin, end));
        return this;
    };
    /**
     * Skips the next `length` bytes. This will just advance
     * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.skip = function(length) {
        if (!this.noAssert) {
            if (typeof length !== 'number' || length % 1 !== 0)
                throw TypeError("Illegal length: "+length+" (not an integer)");
            length |= 0;
        }
        var offset = this.offset + length;
        if (!this.noAssert) {
            if (offset < 0 || offset > this.buffer.byteLength)
                throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);
        }
        this.offset = offset;
        return this;
    };

    /**
     * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
     * @expose
     */
    ByteBufferPrototype.slice = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        var bb = this.clone();
        bb.offset = begin;
        bb.limit = end;
        return bb;
    };
    /**
     * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
     * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
     *  possible. Defaults to `false`
     * @returns {!ArrayBuffer} Contents as an ArrayBuffer
     * @expose
     */
    ByteBufferPrototype.toBuffer = function(forceCopy) {
        var offset = this.offset,
            limit = this.limit;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: Not an integer");
            offset >>>= 0;
            if (typeof limit !== 'number' || limit % 1 !== 0)
                throw TypeError("Illegal limit: Not an integer");
            limit >>>= 0;
            if (offset < 0 || offset > limit || limit > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);
        }
        // NOTE: It's not possible to have another ArrayBuffer reference the same memory as the backing buffer. This is
        // possible with Uint8Array#subarray only, but we have to return an ArrayBuffer by contract. So:
        if (!forceCopy && offset === 0 && limit === this.buffer.byteLength)
            return this.buffer;
        if (offset === limit)
            return EMPTY_BUFFER;
        var buffer = new ArrayBuffer(limit - offset);
        new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
        return buffer;
    };

    /**
     * Returns a raw buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. This is an alias of {@link ByteBuffer#toBuffer}.
     * @function
     * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory.
     *  Defaults to `false`
     * @returns {!ArrayBuffer} Contents as an ArrayBuffer
     * @expose
     */
    ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;

    /**
     * Converts the ByteBuffer's contents to a string.
     * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
     *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
     *  highlighted offsets.
     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {string} String representation
     * @throws {Error} If `encoding` is invalid
     * @expose
     */
    ByteBufferPrototype.toString = function(encoding, begin, end) {
        if (typeof encoding === 'undefined')
            return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
        if (typeof encoding === 'number')
            encoding = "utf8",
            begin = encoding,
            end = begin;
        switch (encoding) {
            case "utf8":
                return this.toUTF8(begin, end);
            case "base64":
                return this.toBase64(begin, end);
            case "hex":
                return this.toHex(begin, end);
            case "binary":
                return this.toBinary(begin, end);
            case "debug":
                return this.toDebug();
            case "columns":
                return this.toColumns();
            default:
                throw Error("Unsupported encoding: "+encoding);
        }
    };

    // lxiv-embeddable

    /**
     * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/lxiv for details
     */
    var lxiv = function() {
        "use strict";

        /**
         * lxiv namespace.
         * @type {!Object.<string,*>}
         * @exports lxiv
         */
        var lxiv = {};

        /**
         * Character codes for output.
         * @type {!Array.<number>}
         * @inner
         */
        var aout = [
            65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
            103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
            119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
        ];

        /**
         * Character codes for input.
         * @type {!Array.<number>}
         * @inner
         */
        var ain = [];
        for (var i=0, k=aout.length; i<k; ++i)
            ain[aout[i]] = i;

        /**
         * Encodes bytes to base64 char codes.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
         *  there are no more bytes left.
         * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
         *  code.
         */
        lxiv.encode = function(src, dst) {
            var b, t;
            while ((b = src()) !== null) {
                dst(aout[(b>>2)&0x3f]);
                t = (b&0x3)<<4;
                if ((b = src()) !== null) {
                    t |= (b>>4)&0xf;
                    dst(aout[(t|((b>>4)&0xf))&0x3f]);
                    t = (b&0xf)<<2;
                    if ((b = src()) !== null)
                        dst(aout[(t|((b>>6)&0x3))&0x3f]),
                        dst(aout[b&0x3f]);
                    else
                        dst(aout[t&0x3f]),
                        dst(61);
                } else
                    dst(aout[t&0x3f]),
                    dst(61),
                    dst(61);
            }
        };

        /**
         * Decodes base64 char codes to bytes.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
         * @throws {Error} If a character code is invalid
         */
        lxiv.decode = function(src, dst) {
            var c, t1, t2;
            function fail(c) {
                throw Error("Illegal character code: "+c);
            }
            while ((c = src()) !== null) {
                t1 = ain[c];
                if (typeof t1 === 'undefined') fail(c);
                if ((c = src()) !== null) {
                    t2 = ain[c];
                    if (typeof t2 === 'undefined') fail(c);
                    dst((t1<<2)>>>0|(t2&0x30)>>4);
                    if ((c = src()) !== null) {
                        t1 = ain[c];
                        if (typeof t1 === 'undefined')
                            if (c === 61) break; else fail(c);
                        dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
                        if ((c = src()) !== null) {
                            t2 = ain[c];
                            if (typeof t2 === 'undefined')
                                if (c === 61) break; else fail(c);
                            dst(((t1&0x3)<<6)>>>0|t2);
                        }
                    }
                }
            }
        };

        /**
         * Tests if a string is valid base64.
         * @param {string} str String to test
         * @returns {boolean} `true` if valid, otherwise `false`
         */
        lxiv.test = function(str) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
        };

        return lxiv;
    }();

    // encodings/base64

    /**
     * Encodes this ByteBuffer's contents to a base64 encoded string.
     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
     * @returns {string} Base64 encoded string
     * @throws {RangeError} If `begin` or `end` is out of bounds
     * @expose
     */
    ByteBufferPrototype.toBase64 = function(begin, end) {
        if (typeof begin === 'undefined')
            begin = this.offset;
        if (typeof end === 'undefined')
            end = this.limit;
        begin = begin | 0; end = end | 0;
        if (begin < 0 || end > this.capacity || begin > end)
            throw RangeError("begin, end");
        var sd; lxiv.encode(function() {
            return begin < end ? this.view[begin++] : null;
        }.bind(this), sd = stringDestination());
        return sd();
    };

    /**
     * Decodes a base64 encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromBase64 = function(str, littleEndian) {
        if (typeof str !== 'string')
            throw TypeError("str");
        var bb = new ByteBuffer(str.length/4*3, littleEndian),
            i = 0;
        lxiv.decode(stringSource(str), function(b) {
            bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
    };

    /**
     * Encodes a binary string to base64 like `window.btoa` does.
     * @param {string} str Binary string
     * @returns {string} Base64 encoded string
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
     * @expose
     */
    ByteBuffer.btoa = function(str) {
        return ByteBuffer.fromBinary(str).toBase64();
    };

    /**
     * Decodes a base64 encoded string to binary like `window.atob` does.
     * @param {string} b64 Base64 encoded string
     * @returns {string} Binary string
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
     * @expose
     */
    ByteBuffer.atob = function(b64) {
        return ByteBuffer.fromBase64(b64).toBinary();
    };

    // encodings/binary

    /**
     * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
     * @returns {string} Binary encoded string
     * @throws {RangeError} If `offset > limit`
     * @expose
     */
    ByteBufferPrototype.toBinary = function(begin, end) {
        if (typeof begin === 'undefined')
            begin = this.offset;
        if (typeof end === 'undefined')
            end = this.limit;
        begin |= 0; end |= 0;
        if (begin < 0 || end > this.capacity() || begin > end)
            throw RangeError("begin, end");
        if (begin === end)
            return "";
        var chars = [],
            parts = [];
        while (begin < end) {
            chars.push(this.view[begin++]);
            if (chars.length >= 1024)
                parts.push(String.fromCharCode.apply(String, chars)),
                chars = [];
        }
        return parts.join('') + String.fromCharCode.apply(String, chars);
    };

    /**
     * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromBinary = function(str, littleEndian) {
        if (typeof str !== 'string')
            throw TypeError("str");
        var i = 0,
            k = str.length,
            charCode,
            bb = new ByteBuffer(k, littleEndian);
        while (i<k) {
            charCode = str.charCodeAt(i);
            if (charCode > 0xff)
                throw RangeError("illegal char code: "+charCode);
            bb.view[i++] = charCode;
        }
        bb.limit = k;
        return bb;
    };

    // encodings/debug

    /**
     * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
     * * `<` : offset,
     * * `'` : markedOffset,
     * * `>` : limit,
     * * `|` : offset and limit,
     * * `[` : offset and markedOffset,
     * * `]` : markedOffset and limit,
     * * `!` : offset, markedOffset and limit
     * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
     * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
     * @expose
     * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
     * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
     * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
     * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
     */
    ByteBufferPrototype.toDebug = function(columns) {
        var i = -1,
            k = this.buffer.byteLength,
            b,
            hex = "",
            asc = "",
            out = "";
        while (i<k) {
            if (i !== -1) {
                b = this.view[i];
                if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                else hex += b.toString(16).toUpperCase();
                if (columns)
                    asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
            }
            ++i;
            if (columns) {
                if (i > 0 && i % 16 === 0 && i !== k) {
                    while (hex.length < 3*16+3) hex += " ";
                    out += hex+asc+"\n";
                    hex = asc = "";
                }
            }
            if (i === this.offset && i === this.limit)
                hex += i === this.markedOffset ? "!" : "|";
            else if (i === this.offset)
                hex += i === this.markedOffset ? "[" : "<";
            else if (i === this.limit)
                hex += i === this.markedOffset ? "]" : ">";
            else
                hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
        }
        if (columns && hex !== " ") {
            while (hex.length < 3*16+3)
                hex += " ";
            out += hex + asc + "\n";
        }
        return columns ? out : hex;
    };

    /**
     * Decodes a hex encoded string with marked offsets to a ByteBuffer.
     * @param {string} str Debug string to decode (not be generated with `columns = true`)
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     * @see ByteBuffer#toDebug
     */
    ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
        var k = str.length,
            bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
        var i = 0, j = 0, ch, b,
            rs = false, // Require symbol next
            ho = false, hm = false, hl = false, // Already has offset (ho), markedOffset (hm), limit (hl)?
            fail = false;
        while (i<k) {
            switch (ch = str.charAt(i++)) {
                case '!':
                    if (!noAssert) {
                        if (ho || hm || hl) {
                            fail = true;
                            break;
                        }
                        ho = hm = hl = true;
                    }
                    bb.offset = bb.markedOffset = bb.limit = j;
                    rs = false;
                    break;
                case '|':
                    if (!noAssert) {
                        if (ho || hl) {
                            fail = true;
                            break;
                        }
                        ho = hl = true;
                    }
                    bb.offset = bb.limit = j;
                    rs = false;
                    break;
                case '[':
                    if (!noAssert) {
                        if (ho || hm) {
                            fail = true;
                            break;
                        }
                        ho = hm = true;
                    }
                    bb.offset = bb.markedOffset = j;
                    rs = false;
                    break;
                case '<':
                    if (!noAssert) {
                        if (ho) {
                            fail = true;
                            break;
                        }
                        ho = true;
                    }
                    bb.offset = j;
                    rs = false;
                    break;
                case ']':
                    if (!noAssert) {
                        if (hl || hm) {
                            fail = true;
                            break;
                        }
                        hl = hm = true;
                    }
                    bb.limit = bb.markedOffset = j;
                    rs = false;
                    break;
                case '>':
                    if (!noAssert) {
                        if (hl) {
                            fail = true;
                            break;
                        }
                        hl = true;
                    }
                    bb.limit = j;
                    rs = false;
                    break;
                case "'":
                    if (!noAssert) {
                        if (hm) {
                            fail = true;
                            break;
                        }
                        hm = true;
                    }
                    bb.markedOffset = j;
                    rs = false;
                    break;
                case ' ':
                    rs = false;
                    break;
                default:
                    if (!noAssert) {
                        if (rs) {
                            fail = true;
                            break;
                        }
                    }
                    b = parseInt(ch+str.charAt(i++), 16);
                    if (!noAssert) {
                        if (isNaN(b) || b < 0 || b > 255)
                            throw TypeError("Illegal str: Not a debug encoded string");
                    }
                    bb.view[j++] = b;
                    rs = true;
            }
            if (fail)
                throw TypeError("Illegal str: Invalid symbol at "+i);
        }
        if (!noAssert) {
            if (!ho || !hl)
                throw TypeError("Illegal str: Missing offset or limit");
            if (j<bb.buffer.byteLength)
                throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
        }
        return bb;
    };

    // encodings/hex

    /**
     * Encodes this ByteBuffer's contents to a hex encoded string.
     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
     * @returns {string} Hex encoded string
     * @expose
     */
    ByteBufferPrototype.toHex = function(begin, end) {
        begin = typeof begin === 'undefined' ? this.offset : begin;
        end = typeof end === 'undefined' ? this.limit : end;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        var out = new Array(end - begin),
            b;
        while (begin < end) {
            b = this.view[begin++];
            if (b < 0x10)
                out.push("0", b.toString(16));
            else out.push(b.toString(16));
        }
        return out.join('');
    };

    /**
     * Decodes a hex encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
        if (!noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (str.length % 2 !== 0)
                throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var k = str.length,
            bb = new ByteBuffer((k / 2) | 0, littleEndian),
            b;
        for (var i=0, j=0; i<k; i+=2) {
            b = parseInt(str.substring(i, i+2), 16);
            if (!noAssert)
                if (!isFinite(b) || b < 0 || b > 255)
                    throw TypeError("Illegal str: Contains non-hex characters");
            bb.view[j++] = b;
        }
        bb.limit = j;
        return bb;
    };

    // utfx-embeddable

    /**
     * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/utfx for details
     */
    var utfx = function() {
        "use strict";

        /**
         * utfx namespace.
         * @inner
         * @type {!Object.<string,*>}
         */
        var utfx = {};

        /**
         * Maximum valid code point.
         * @type {number}
         * @const
         */
        utfx.MAX_CODEPOINT = 0x10FFFF;

        /**
         * Encodes UTF8 code points to UTF8 bytes.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
         */
        utfx.encodeUTF8 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src,
                src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp < 0x80)
                    dst(cp&0x7F);
                else if (cp < 0x800)
                    dst(((cp>>6)&0x1F)|0xC0),
                    dst((cp&0x3F)|0x80);
                else if (cp < 0x10000)
                    dst(((cp>>12)&0x0F)|0xE0),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                else
                    dst(((cp>>18)&0x07)|0xF0),
                    dst(((cp>>12)&0x3F)|0x80),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                cp = null;
            }
        };

        /**
         * Decodes UTF8 bytes to UTF8 code points.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
         *  remaining bytes.
         */
        utfx.decodeUTF8 = function(src, dst) {
            var a, b, c, d, fail = function(b) {
                b = b.slice(0, b.indexOf(null));
                var err = Error(b.toString());
                err.name = "TruncatedError";
                err['bytes'] = b;
                throw err;
            };
            while ((a = src()) !== null) {
                if ((a&0x80) === 0)
                    dst(a);
                else if ((a&0xE0) === 0xC0)
                    ((b = src()) === null) && fail([a, b]),
                    dst(((a&0x1F)<<6) | (b&0x3F));
                else if ((a&0xF0) === 0xE0)
                    ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                    dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                else if ((a&0xF8) === 0xF0)
                    ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                    dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                else throw RangeError("Illegal starting byte: "+a);
            }
        };

        /**
         * Converts UTF16 characters to UTF8 code points.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @param {!function(number)} dst Code points destination as a function successively called with each converted code
         *  point.
         */
        utfx.UTF16toUTF8 = function(src, dst) {
            var c1, c2 = null;
            while (true) {
                if ((c1 = c2 !== null ? c2 : src()) === null)
                    break;
                if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                    if ((c2 = src()) !== null) {
                        if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                            dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                            c2 = null; continue;
                        }
                    }
                }
                dst(c1);
            }
            if (c2 !== null) dst(c2);
        };

        /**
         * Converts UTF8 code points to UTF16 characters.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a code point is out of range
         */
        utfx.UTF8toUTF16 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src, src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp <= 0xFFFF)
                    dst(cp);
                else
                    cp -= 0x10000,
                    dst((cp>>10)+0xD800),
                    dst((cp%0x400)+0xDC00);
                cp = null;
            }
        };

        /**
         * Converts and encodes UTF16 characters to UTF8 bytes.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
         *  if there are no more characters left.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
         */
        utfx.encodeUTF16toUTF8 = function(src, dst) {
            utfx.UTF16toUTF8(src, function(cp) {
                utfx.encodeUTF8(cp, dst);
            });
        };

        /**
         * Decodes and converts UTF8 bytes to UTF16 characters.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
         */
        utfx.decodeUTF8toUTF16 = function(src, dst) {
            utfx.decodeUTF8(src, function(cp) {
                utfx.UTF8toUTF16(cp, dst);
            });
        };

        /**
         * Calculates the byte length of an UTF8 code point.
         * @param {number} cp UTF8 code point
         * @returns {number} Byte length
         */
        utfx.calculateCodePoint = function(cp) {
            return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
        };

        /**
         * Calculates the number of UTF8 bytes required to store UTF8 code points.
         * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
         *  `null` if there are no more code points left.
         * @returns {number} The number of UTF8 bytes required
         */
        utfx.calculateUTF8 = function(src) {
            var cp, l=0;
            while ((cp = src()) !== null)
                l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            return l;
        };

        /**
         * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
         * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
         */
        utfx.calculateUTF16asUTF8 = function(src) {
            var n=0, l=0;
            utfx.UTF16toUTF8(src, function(cp) {
                ++n; l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            });
            return [n,l];
        };

        return utfx;
    }();

    // encodings/utf8

    /**
     * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
     *  string.
     * @returns {string} Hex encoded string
     * @throws {RangeError} If `offset > limit`
     * @expose
     */
    ByteBufferPrototype.toUTF8 = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
        }
        var sd; try {
            utfx.decodeUTF8toUTF16(function() {
                return begin < end ? this.view[begin++] : null;
            }.bind(this), sd = stringDestination());
        } catch (e) {
            if (begin !== end)
                throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);
        }
        return sd();
    };

    /**
     * Decodes an UTF8 encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
        if (!noAssert)
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
        var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert),
            i = 0;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
            bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
    };

    return ByteBuffer;
});


/***/ }),

/***/ "EW2V":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("tOiH")


/***/ }),

/***/ "Hjy1":
/***/ (function(module, exports, __webpack_require__) {

var CipherBase = __webpack_require__("ZDAU")
var des = __webpack_require__("FUXG")
var inherits = __webpack_require__("P7XM")
var Buffer = __webpack_require__("hwdV").Buffer

var modes = {
  'des-ede3-cbc': des.CBC.instantiate(des.EDE),
  'des-ede3': des.EDE,
  'des-ede-cbc': des.CBC.instantiate(des.EDE),
  'des-ede': des.EDE,
  'des-cbc': des.CBC.instantiate(des.DES),
  'des-ecb': des.DES
}
modes.des = modes['des-cbc']
modes.des3 = modes['des-ede3-cbc']
module.exports = DES
inherits(DES, CipherBase)
function DES (opts) {
  CipherBase.call(this)
  var modeName = opts.mode.toLowerCase()
  var mode = modes[modeName]
  var type
  if (opts.decrypt) {
    type = 'decrypt'
  } else {
    type = 'encrypt'
  }
  var key = opts.key
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key)
  }
  if (modeName === 'des-ede' || modeName === 'des-ede-cbc') {
    key = Buffer.concat([key, key.slice(0, 8)])
  }
  var iv = opts.iv
  if (!Buffer.isBuffer(iv)) {
    iv = Buffer.from(iv)
  }
  this._des = mode.create({
    key: key,
    iv: iv,
    type: type
  })
}
DES.prototype._update = function (data) {
  return Buffer.from(this._des.update(data))
}
DES.prototype._final = function () {
  return Buffer.from(this._des.final())
}


/***/ }),

/***/ "NQVK":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer
var xor = __webpack_require__("jIre")

function encryptStart (self, data, decrypt) {
  var len = data.length
  var out = xor(data, self._cache)
  self._cache = self._cache.slice(len)
  self._prev = Buffer.concat([self._prev, decrypt ? data : out])
  return out
}

exports.encrypt = function (self, data, decrypt) {
  var out = Buffer.allocUnsafe(0)
  var len

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev)
      self._prev = Buffer.allocUnsafe(0)
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length
      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)])
      data = data.slice(len)
    } else {
      out = Buffer.concat([out, encryptStart(self, data, decrypt)])
      break
    }
  }

  return out
}


/***/ }),

/***/ "OfWw":
/***/ (function(module, exports, __webpack_require__) {

// based on the aes implimentation in triple sec
// https://github.com/keybase/triplesec
// which is in turn based on the one from crypto-js
// https://code.google.com/p/crypto-js/

var Buffer = __webpack_require__("hwdV").Buffer

function asUInt32Array (buf) {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)

  var len = (buf.length / 4) | 0
  var out = new Array(len)

  for (var i = 0; i < len; i++) {
    out[i] = buf.readUInt32BE(i * 4)
  }

  return out
}

function scrubVec (v) {
  for (var i = 0; i < v.length; v++) {
    v[i] = 0
  }
}

function cryptBlock (M, keySchedule, SUB_MIX, SBOX, nRounds) {
  var SUB_MIX0 = SUB_MIX[0]
  var SUB_MIX1 = SUB_MIX[1]
  var SUB_MIX2 = SUB_MIX[2]
  var SUB_MIX3 = SUB_MIX[3]

  var s0 = M[0] ^ keySchedule[0]
  var s1 = M[1] ^ keySchedule[1]
  var s2 = M[2] ^ keySchedule[2]
  var s3 = M[3] ^ keySchedule[3]
  var t0, t1, t2, t3
  var ksRow = 4

  for (var round = 1; round < nRounds; round++) {
    t0 = SUB_MIX0[s0 >>> 24] ^ SUB_MIX1[(s1 >>> 16) & 0xff] ^ SUB_MIX2[(s2 >>> 8) & 0xff] ^ SUB_MIX3[s3 & 0xff] ^ keySchedule[ksRow++]
    t1 = SUB_MIX0[s1 >>> 24] ^ SUB_MIX1[(s2 >>> 16) & 0xff] ^ SUB_MIX2[(s3 >>> 8) & 0xff] ^ SUB_MIX3[s0 & 0xff] ^ keySchedule[ksRow++]
    t2 = SUB_MIX0[s2 >>> 24] ^ SUB_MIX1[(s3 >>> 16) & 0xff] ^ SUB_MIX2[(s0 >>> 8) & 0xff] ^ SUB_MIX3[s1 & 0xff] ^ keySchedule[ksRow++]
    t3 = SUB_MIX0[s3 >>> 24] ^ SUB_MIX1[(s0 >>> 16) & 0xff] ^ SUB_MIX2[(s1 >>> 8) & 0xff] ^ SUB_MIX3[s2 & 0xff] ^ keySchedule[ksRow++]
    s0 = t0
    s1 = t1
    s2 = t2
    s3 = t3
  }

  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++]
  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++]
  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++]
  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++]
  t0 = t0 >>> 0
  t1 = t1 >>> 0
  t2 = t2 >>> 0
  t3 = t3 >>> 0

  return [t0, t1, t2, t3]
}

// AES constants
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]
var G = (function () {
  // Compute double table
  var d = new Array(256)
  for (var j = 0; j < 256; j++) {
    if (j < 128) {
      d[j] = j << 1
    } else {
      d[j] = (j << 1) ^ 0x11b
    }
  }

  var SBOX = []
  var INV_SBOX = []
  var SUB_MIX = [[], [], [], []]
  var INV_SUB_MIX = [[], [], [], []]

  // Walk GF(2^8)
  var x = 0
  var xi = 0
  for (var i = 0; i < 256; ++i) {
    // Compute sbox
    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4)
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63
    SBOX[x] = sx
    INV_SBOX[sx] = x

    // Compute multiplication
    var x2 = d[x]
    var x4 = d[x2]
    var x8 = d[x4]

    // Compute sub bytes, mix columns tables
    var t = (d[sx] * 0x101) ^ (sx * 0x1010100)
    SUB_MIX[0][x] = (t << 24) | (t >>> 8)
    SUB_MIX[1][x] = (t << 16) | (t >>> 16)
    SUB_MIX[2][x] = (t << 8) | (t >>> 24)
    SUB_MIX[3][x] = t

    // Compute inv sub bytes, inv mix columns tables
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100)
    INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8)
    INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16)
    INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24)
    INV_SUB_MIX[3][sx] = t

    if (x === 0) {
      x = xi = 1
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]]
      xi ^= d[d[xi]]
    }
  }

  return {
    SBOX: SBOX,
    INV_SBOX: INV_SBOX,
    SUB_MIX: SUB_MIX,
    INV_SUB_MIX: INV_SUB_MIX
  }
})()

function AES (key) {
  this._key = asUInt32Array(key)
  this._reset()
}

AES.blockSize = 4 * 4
AES.keySize = 256 / 8
AES.prototype.blockSize = AES.blockSize
AES.prototype.keySize = AES.keySize
AES.prototype._reset = function () {
  var keyWords = this._key
  var keySize = keyWords.length
  var nRounds = keySize + 6
  var ksRows = (nRounds + 1) * 4

  var keySchedule = []
  for (var k = 0; k < keySize; k++) {
    keySchedule[k] = keyWords[k]
  }

  for (k = keySize; k < ksRows; k++) {
    var t = keySchedule[k - 1]

    if (k % keySize === 0) {
      t = (t << 8) | (t >>> 24)
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])

      t ^= RCON[(k / keySize) | 0] << 24
    } else if (keySize > 6 && k % keySize === 4) {
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])
    }

    keySchedule[k] = keySchedule[k - keySize] ^ t
  }

  var invKeySchedule = []
  for (var ik = 0; ik < ksRows; ik++) {
    var ksR = ksRows - ik
    var tt = keySchedule[ksR - (ik % 4 ? 0 : 4)]

    if (ik < 4 || ksR <= 4) {
      invKeySchedule[ik] = tt
    } else {
      invKeySchedule[ik] =
        G.INV_SUB_MIX[0][G.SBOX[tt >>> 24]] ^
        G.INV_SUB_MIX[1][G.SBOX[(tt >>> 16) & 0xff]] ^
        G.INV_SUB_MIX[2][G.SBOX[(tt >>> 8) & 0xff]] ^
        G.INV_SUB_MIX[3][G.SBOX[tt & 0xff]]
    }
  }

  this._nRounds = nRounds
  this._keySchedule = keySchedule
  this._invKeySchedule = invKeySchedule
}

AES.prototype.encryptBlockRaw = function (M) {
  M = asUInt32Array(M)
  return cryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX, this._nRounds)
}

AES.prototype.encryptBlock = function (M) {
  var out = this.encryptBlockRaw(M)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[1], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[3], 12)
  return buf
}

AES.prototype.decryptBlock = function (M) {
  M = asUInt32Array(M)

  // swap
  var m1 = M[1]
  M[1] = M[3]
  M[3] = m1

  var out = cryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX, this._nRounds)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[3], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[1], 12)
  return buf
}

AES.prototype.scrub = function () {
  scrubVec(this._keySchedule)
  scrubVec(this._invKeySchedule)
  scrubVec(this._key)
}

module.exports.AES = AES


/***/ }),

/***/ "P2KE":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer
var ZEROES = Buffer.alloc(16, 0)

function toArray (buf) {
  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}

function fromArray (out) {
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0] >>> 0, 0)
  buf.writeUInt32BE(out[1] >>> 0, 4)
  buf.writeUInt32BE(out[2] >>> 0, 8)
  buf.writeUInt32BE(out[3] >>> 0, 12)
  return buf
}

function GHASH (key) {
  this.h = key
  this.state = Buffer.alloc(16, 0)
  this.cache = Buffer.allocUnsafe(0)
}

// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH.prototype.ghash = function (block) {
  var i = -1
  while (++i < block.length) {
    this.state[i] ^= block[i]
  }
  this._multiply()
}

GHASH.prototype._multiply = function () {
  var Vi = toArray(this.h)
  var Zi = [0, 0, 0, 0]
  var j, xi, lsbVi
  var i = -1
  while (++i < 128) {
    xi = (this.state[~~(i / 8)] & (1 << (7 - (i % 8)))) !== 0
    if (xi) {
      // Z_i+1 = Z_i ^ V_i
      Zi[0] ^= Vi[0]
      Zi[1] ^= Vi[1]
      Zi[2] ^= Vi[2]
      Zi[3] ^= Vi[3]
    }

    // Store the value of LSB(V_i)
    lsbVi = (Vi[3] & 1) !== 0

    // V_i+1 = V_i >> 1
    for (j = 3; j > 0; j--) {
      Vi[j] = (Vi[j] >>> 1) | ((Vi[j - 1] & 1) << 31)
    }
    Vi[0] = Vi[0] >>> 1

    // If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
    if (lsbVi) {
      Vi[0] = Vi[0] ^ (0xe1 << 24)
    }
  }
  this.state = fromArray(Zi)
}

GHASH.prototype.update = function (buf) {
  this.cache = Buffer.concat([this.cache, buf])
  var chunk
  while (this.cache.length >= 16) {
    chunk = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    this.ghash(chunk)
  }
}

GHASH.prototype.final = function (abl, bl) {
  if (this.cache.length) {
    this.ghash(Buffer.concat([this.cache, ZEROES], 16))
  }

  this.ghash(fromArray([0, abl, 0, bl]))
  return this.state
}

module.exports = GHASH


/***/ }),

/***/ "QihY":
/***/ (function(module, exports, __webpack_require__) {

var AuthCipher = __webpack_require__("gvAe")
var Buffer = __webpack_require__("hwdV").Buffer
var MODES = __webpack_require__("usKN")
var StreamCipher = __webpack_require__("CfXC")
var Transform = __webpack_require__("ZDAU")
var aes = __webpack_require__("OfWw")
var ebtk = __webpack_require__("roQf")
var inherits = __webpack_require__("P7XM")

function Decipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._last = void 0
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Decipher, Transform)

Decipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []
  while ((chunk = this._cache.get(this._autopadding))) {
    thing = this._mode.decrypt(this, chunk)
    out.push(thing)
  }
  return Buffer.concat(out)
}

Decipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    return unpad(this._mode.decrypt(this, chunk))
  } else if (chunk) {
    throw new Error('data not multiple of block length')
  }
}

Decipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function (autoPadding) {
  var out
  if (autoPadding) {
    if (this.cache.length > 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  } else {
    if (this.cache.length >= 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  }

  return null
}

Splitter.prototype.flush = function () {
  if (this.cache.length) return this.cache
}

function unpad (last) {
  var padded = last[15]
  if (padded < 1 || padded > 16) {
    throw new Error('unable to decrypt data')
  }
  var i = -1
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) return

  return last.slice(0, 16 - padded)
}

function createDecipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv, true)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv, true)
  }

  return new Decipher(config.module, password, iv)
}

function createDecipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createDecipheriv(suite, keys.key, keys.iv)
}

exports.createDecipher = createDecipher
exports.createDecipheriv = createDecipheriv


/***/ }),

/***/ "UWVS":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__("jIre")

function getBlock (self) {
  self._prev = self._cipher.encryptBlock(self._prev)
  return self._prev
}

exports.encrypt = function (self, chunk) {
  while (self._cache.length < chunk.length) {
    self._cache = Buffer.concat([self._cache, getBlock(self)])
  }

  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Ujlg":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer

function encryptByte (self, byteParam, decrypt) {
  var pad
  var i = -1
  var len = 8
  var out = 0
  var bit, value
  while (++i < len) {
    pad = self._cipher.encryptBlock(self._prev)
    bit = (byteParam & (1 << (7 - i))) ? 0x80 : 0
    value = pad[0] ^ bit
    out += ((value & 0x80) >> (i % 8))
    self._prev = shiftIn(self._prev, decrypt ? bit : value)
  }
  return out
}

function shiftIn (buffer, value) {
  var len = buffer.length
  var i = -1
  var out = Buffer.allocUnsafe(buffer.length)
  buffer = Buffer.concat([buffer, Buffer.from([value])])

  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7)
  }

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}


/***/ }),

/***/ "YskG":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer

function encryptByte (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev)
  var out = pad[0] ^ byteParam

  self._prev = Buffer.concat([
    self._prev.slice(1),
    Buffer.from([decrypt ? byteParam : out])
  ])

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}


/***/ }),

/***/ "at63":
/***/ (function(module, exports, __webpack_require__) {

var xor = __webpack_require__("jIre")
var Buffer = __webpack_require__("hwdV").Buffer
var incr32 = __webpack_require__("vZ2G")

function getBlock (self) {
  var out = self._cipher.encryptBlockRaw(self._prev)
  incr32(self._prev)
  return out
}

var blockSize = 16
exports.encrypt = function (self, chunk) {
  var chunkNum = Math.ceil(chunk.length / blockSize)
  var start = self._cache.length
  self._cache = Buffer.concat([
    self._cache,
    Buffer.allocUnsafe(chunkNum * blockSize)
  ])
  for (var i = 0; i < chunkNum; i++) {
    var out = getBlock(self)
    var offset = start + i * blockSize
    self._cache.writeUInt32BE(out[0], offset + 0)
    self._cache.writeUInt32BE(out[1], offset + 4)
    self._cache.writeUInt32BE(out[2], offset + 8)
    self._cache.writeUInt32BE(out[3], offset + 12)
  }
  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}


/***/ }),

/***/ "b+dc":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var createHmac = __webpack_require__("Giow")
var crt = __webpack_require__("qVij")
var EC = __webpack_require__("MzeL").ec
var BN = __webpack_require__("OZ/i")
var parseKeys = __webpack_require__("Ku4m")
var curves = __webpack_require__("zZGF")

function sign (hash, key, hashType, signType, tag) {
  var priv = parseKeys(key)
  if (priv.curve) {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
    return ecSign(hash, priv)
  } else if (priv.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong private key type')
    return dsaSign(hash, priv, hashType)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
  }
  hash = Buffer.concat([tag, hash])
  var len = priv.modulus.byteLength()
  var pad = [ 0, 1 ]
  while (hash.length + pad.length + 1 < len) pad.push(0xff)
  pad.push(0x00)
  var i = -1
  while (++i < hash.length) pad.push(hash[i])

  var out = crt(pad, priv)
  return out
}

function ecSign (hash, priv) {
  var curveId = curves[priv.curve.join('.')]
  if (!curveId) throw new Error('unknown curve ' + priv.curve.join('.'))

  var curve = new EC(curveId)
  var key = curve.keyFromPrivate(priv.privateKey)
  var out = key.sign(hash)

  return new Buffer(out.toDER())
}

function dsaSign (hash, priv, algo) {
  var x = priv.params.priv_key
  var p = priv.params.p
  var q = priv.params.q
  var g = priv.params.g
  var r = new BN(0)
  var k
  var H = bits2int(hash, q).mod(q)
  var s = false
  var kv = getKey(x, q, hash, algo)
  while (s === false) {
    k = makeKey(q, kv, algo)
    r = makeR(g, k, p, q)
    s = k.invm(q).imul(H.add(x.mul(r))).mod(q)
    if (s.cmpn(0) === 0) {
      s = false
      r = new BN(0)
    }
  }
  return toDER(r, s)
}

function toDER (r, s) {
  r = r.toArray()
  s = s.toArray()

  // Pad values
  if (r[0] & 0x80) r = [ 0 ].concat(r)
  if (s[0] & 0x80) s = [ 0 ].concat(s)

  var total = r.length + s.length + 4
  var res = [ 0x30, total, 0x02, r.length ]
  res = res.concat(r, [ 0x02, s.length ], s)
  return new Buffer(res)
}

function getKey (x, q, hash, algo) {
  x = new Buffer(x.toArray())
  if (x.length < q.byteLength()) {
    var zeros = new Buffer(q.byteLength() - x.length)
    zeros.fill(0)
    x = Buffer.concat([ zeros, x ])
  }
  var hlen = hash.length
  var hbits = bits2octets(hash, q)
  var v = new Buffer(hlen)
  v.fill(1)
  var k = new Buffer(hlen)
  k.fill(0)
  k = createHmac(algo, k).update(v).update(new Buffer([ 0 ])).update(x).update(hbits).digest()
  v = createHmac(algo, k).update(v).digest()
  k = createHmac(algo, k).update(v).update(new Buffer([ 1 ])).update(x).update(hbits).digest()
  v = createHmac(algo, k).update(v).digest()
  return { k: k, v: v }
}

function bits2int (obits, q) {
  var bits = new BN(obits)
  var shift = (obits.length << 3) - q.bitLength()
  if (shift > 0) bits.ishrn(shift)
  return bits
}

function bits2octets (bits, q) {
  bits = bits2int(bits, q)
  bits = bits.mod(q)
  var out = new Buffer(bits.toArray())
  if (out.length < q.byteLength()) {
    var zeros = new Buffer(q.byteLength() - out.length)
    zeros.fill(0)
    out = Buffer.concat([ zeros, out ])
  }
  return out
}

function makeKey (q, kv, algo) {
  var t
  var k

  do {
    t = new Buffer(0)

    while (t.length * 8 < q.bitLength()) {
      kv.v = createHmac(algo, kv.k).update(kv.v).digest()
      t = Buffer.concat([ t, kv.v ])
    }

    k = bits2int(t, q)
    kv.k = createHmac(algo, kv.k).update(kv.v).update(new Buffer([ 0 ])).digest()
    kv.v = createHmac(algo, kv.k).update(kv.v).digest()
  } while (k.cmp(q) !== -1)

  return k
}

function makeR (g, k, p, q) {
  return g.toRed(BN.mont(p)).redPow(k).fromRed().mod(q)
}

module.exports = sign
module.exports.getKey = getKey
module.exports.makeKey = makeKey

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "b3gk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createHash = __webpack_require__("mObS")
var bs58checkBase = __webpack_require__("BumV")

// SHA256(SHA256(buffer))
function sha256x2 (buffer) {
  var tmp = createHash('sha256').update(buffer).digest()
  return createHash('sha256').update(tmp).digest()
}

module.exports = bs58checkBase(sha256x2)


/***/ }),

/***/ "gvAe":
/***/ (function(module, exports, __webpack_require__) {

var aes = __webpack_require__("OfWw")
var Buffer = __webpack_require__("hwdV").Buffer
var Transform = __webpack_require__("ZDAU")
var inherits = __webpack_require__("P7XM")
var GHASH = __webpack_require__("P2KE")
var xor = __webpack_require__("jIre")
var incr32 = __webpack_require__("vZ2G")

function xorTest (a, b) {
  var out = 0
  if (a.length !== b.length) out++

  var len = Math.min(a.length, b.length)
  for (var i = 0; i < len; ++i) {
    out += (a[i] ^ b[i])
  }

  return out
}

function calcIv (self, iv, ck) {
  if (iv.length === 12) {
    self._finID = Buffer.concat([iv, Buffer.from([0, 0, 0, 1])])
    return Buffer.concat([iv, Buffer.from([0, 0, 0, 2])])
  }
  var ghash = new GHASH(ck)
  var len = iv.length
  var toPad = len % 16
  ghash.update(iv)
  if (toPad) {
    toPad = 16 - toPad
    ghash.update(Buffer.alloc(toPad, 0))
  }
  ghash.update(Buffer.alloc(8, 0))
  var ivBits = len * 8
  var tail = Buffer.alloc(8)
  tail.writeUIntBE(ivBits, 0, 8)
  ghash.update(tail)
  self._finID = ghash.state
  var out = Buffer.from(self._finID)
  incr32(out)
  return out
}
function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  var h = Buffer.alloc(4, 0)

  this._cipher = new aes.AES(key)
  var ck = this._cipher.encryptBlock(h)
  this._ghash = new GHASH(ck)
  iv = calcIv(this, iv, ck)

  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._alen = 0
  this._len = 0
  this._mode = mode

  this._authTag = null
  this._called = false
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  if (!this._called && this._alen) {
    var rump = 16 - (this._alen % 16)
    if (rump < 16) {
      rump = Buffer.alloc(rump, 0)
      this._ghash.update(rump)
    }
  }

  this._called = true
  var out = this._mode.encrypt(this, chunk)
  if (this._decrypt) {
    this._ghash.update(chunk)
  } else {
    this._ghash.update(out)
  }
  this._len += chunk.length
  return out
}

StreamCipher.prototype._final = function () {
  if (this._decrypt && !this._authTag) throw new Error('Unsupported state or unable to authenticate data')

  var tag = xor(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID))
  if (this._decrypt && xorTest(tag, this._authTag)) throw new Error('Unsupported state or unable to authenticate data')

  this._authTag = tag
  this._cipher.scrub()
}

StreamCipher.prototype.getAuthTag = function getAuthTag () {
  if (this._decrypt || !Buffer.isBuffer(this._authTag)) throw new Error('Attempting to get auth tag in unsupported state')

  return this._authTag
}

StreamCipher.prototype.setAuthTag = function setAuthTag (tag) {
  if (!this._decrypt) throw new Error('Attempting to set auth tag in unsupported state')

  this._authTag = tag
}

StreamCipher.prototype.setAAD = function setAAD (buf) {
  if (this._called) throw new Error('Attempting to set AAD in unsupported state')

  this._ghash.update(buf)
  this._alen += buf.length
}

module.exports = StreamCipher


/***/ }),

/***/ "hZA9":
/***/ (function(module, exports, __webpack_require__) {

var upperCase = __webpack_require__("jDM7")
var noCase = __webpack_require__("Pwfc")

/**
 * Camel case a string.
 *
 * @param  {string} value
 * @param  {string} [locale]
 * @return {string}
 */
module.exports = function (value, locale, mergeNumbers) {
  var result = noCase(value, locale)

  // Replace periods between numeric entities with an underscore.
  if (!mergeNumbers) {
    result = result.replace(/ (?=\d)/g, '_')
  }

  // Replace spaces between words with an upper cased character.
  return result.replace(/ (.)/g, function (m, $1) {
    return upperCase($1, locale)
  })
}


/***/ }),

/***/ "iUdu":
/***/ (function(module, exports, __webpack_require__) {

var MODES = __webpack_require__("usKN")
var AuthCipher = __webpack_require__("gvAe")
var Buffer = __webpack_require__("hwdV").Buffer
var StreamCipher = __webpack_require__("CfXC")
var Transform = __webpack_require__("ZDAU")
var aes = __webpack_require__("OfWw")
var ebtk = __webpack_require__("roQf")
var inherits = __webpack_require__("P7XM")

function Cipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Cipher, Transform)

Cipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []

  while ((chunk = this._cache.get())) {
    thing = this._mode.encrypt(this, chunk)
    out.push(thing)
  }

  return Buffer.concat(out)
}

var PADDING = Buffer.alloc(16, 0x10)

Cipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    chunk = this._mode.encrypt(this, chunk)
    this._cipher.scrub()
    return chunk
  }

  if (!chunk.equals(PADDING)) {
    this._cipher.scrub()
    throw new Error('data not multiple of block length')
  }
}

Cipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function () {
  if (this.cache.length > 15) {
    var out = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    return out
  }
  return null
}

Splitter.prototype.flush = function () {
  var len = 16 - this.cache.length
  var padBuff = Buffer.allocUnsafe(len)

  var i = -1
  while (++i < len) {
    padBuff.writeUInt8(len, i)
  }

  return Buffer.concat([this.cache, padBuff])
}

function createCipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv)
  }

  return new Cipher(config.module, password, iv)
}

function createCipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createCipheriv(suite, keys.key, keys.iv)
}

exports.createCipheriv = createCipheriv
exports.createCipher = createCipher


/***/ }),

/***/ "jAWH":
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ "jIre":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function xor (a, b) {
  var length = Math.min(a.length, b.length)
  var buffer = new Buffer(length)

  for (var i = 0; i < length; ++i) {
    buffer[i] = a[i] ^ b[i]
  }

  return buffer
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "lWpZ":
/***/ (function(module, exports, __webpack_require__) {

var DES = __webpack_require__("Hjy1")
var aes = __webpack_require__("/ab2")
var aesModes = __webpack_require__("usKN")
var desModes = __webpack_require__("C+gy")
var ebtk = __webpack_require__("roQf")

function createCipher (suite, password) {
  suite = suite.toLowerCase()

  var keyLen, ivLen
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }

  var keys = ebtk(password, false, keyLen, ivLen)
  return createCipheriv(suite, keys.key, keys.iv)
}

function createDecipher (suite, password) {
  suite = suite.toLowerCase()

  var keyLen, ivLen
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }

  var keys = ebtk(password, false, keyLen, ivLen)
  return createDecipheriv(suite, keys.key, keys.iv)
}

function createCipheriv (suite, key, iv) {
  suite = suite.toLowerCase()
  if (aesModes[suite]) return aes.createCipheriv(suite, key, iv)
  if (desModes[suite]) return new DES({ key: key, iv: iv, mode: suite })

  throw new TypeError('invalid suite type')
}

function createDecipheriv (suite, key, iv) {
  suite = suite.toLowerCase()
  if (aesModes[suite]) return aes.createDecipheriv(suite, key, iv)
  if (desModes[suite]) return new DES({ key: key, iv: iv, mode: suite, decrypt: true })

  throw new TypeError('invalid suite type')
}

function getCiphers () {
  return Object.keys(desModes).concat(aes.getCiphers())
}

exports.createCipher = exports.Cipher = createCipher
exports.createCipheriv = exports.Cipheriv = createCipheriv
exports.createDecipher = exports.Decipher = createDecipher
exports.createDecipheriv = exports.Decipheriv = createDecipheriv
exports.listCiphers = exports.getCiphers = getCiphers


/***/ }),

/***/ "mAz1":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var BN = __webpack_require__("OZ/i")
var EC = __webpack_require__("MzeL").ec
var parseKeys = __webpack_require__("Ku4m")
var curves = __webpack_require__("zZGF")

function verify (sig, hash, key, signType, tag) {
  var pub = parseKeys(key)
  if (pub.type === 'ec') {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
    return ecVerify(sig, hash, pub)
  } else if (pub.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong public key type')
    return dsaVerify(sig, hash, pub)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
  }
  hash = Buffer.concat([tag, hash])
  var len = pub.modulus.byteLength()
  var pad = [ 1 ]
  var padNum = 0
  while (hash.length + pad.length + 2 < len) {
    pad.push(0xff)
    padNum++
  }
  pad.push(0x00)
  var i = -1
  while (++i < hash.length) {
    pad.push(hash[i])
  }
  pad = new Buffer(pad)
  var red = BN.mont(pub.modulus)
  sig = new BN(sig).toRed(red)

  sig = sig.redPow(new BN(pub.publicExponent))
  sig = new Buffer(sig.fromRed().toArray())
  var out = padNum < 8 ? 1 : 0
  len = Math.min(sig.length, pad.length)
  if (sig.length !== pad.length) out = 1

  i = -1
  while (++i < len) out |= sig[i] ^ pad[i]
  return out === 0
}

function ecVerify (sig, hash, pub) {
  var curveId = curves[pub.data.algorithm.curve.join('.')]
  if (!curveId) throw new Error('unknown curve ' + pub.data.algorithm.curve.join('.'))

  var curve = new EC(curveId)
  var pubkey = pub.data.subjectPrivateKey.data

  return curve.verify(hash, sig, pubkey)
}

function dsaVerify (sig, hash, pub) {
  var p = pub.data.p
  var q = pub.data.q
  var g = pub.data.g
  var y = pub.data.pub_key
  var unpacked = parseKeys.signature.decode(sig, 'der')
  var s = unpacked.s
  var r = unpacked.r
  checkValue(s, q)
  checkValue(r, q)
  var montp = BN.mont(p)
  var w = s.invm(q)
  var v = g.toRed(montp)
    .redPow(new BN(hash).mul(w).mod(q))
    .fromRed()
    .mul(y.toRed(montp).redPow(r.mul(w).mod(q)).fromRed())
    .mod(p)
    .mod(q)
  return v.cmp(r) === 0
}

function checkValue (b, q) {
  if (b.cmpn(0) <= 0) throw new Error('invalid sig')
  if (b.cmp(q) >= q) throw new Error('invalid sig')
}

module.exports = verify

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "qVij":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var bn = __webpack_require__("OZ/i");
var randomBytes = __webpack_require__("Edxu");
module.exports = crt;
function blind(priv) {
  var r = getr(priv);
  var blinder = r.toRed(bn.mont(priv.modulus))
  .redPow(new bn(priv.publicExponent)).fromRed();
  return {
    blinder: blinder,
    unblinder:r.invm(priv.modulus)
  };
}
function crt(msg, priv) {
  var blinds = blind(priv);
  var len = priv.modulus.byteLength();
  var mod = bn.mont(priv.modulus);
  var blinded = new bn(msg).mul(blinds.blinder).umod(priv.modulus);
  var c1 = blinded.toRed(bn.mont(priv.prime1));
  var c2 = blinded.toRed(bn.mont(priv.prime2));
  var qinv = priv.coefficient;
  var p = priv.prime1;
  var q = priv.prime2;
  var m1 = c1.redPow(priv.exponent1);
  var m2 = c2.redPow(priv.exponent2);
  m1 = m1.fromRed();
  m2 = m2.fromRed();
  var h = m1.isub(m2).imul(qinv).umod(p);
  h.imul(q);
  m2.iadd(h);
  return new Buffer(m2.imul(blinds.unblinder).umod(priv.modulus).toArray(false, len));
}
crt.getr = getr;
function getr(priv) {
  var len = priv.modulus.byteLength();
  var r = new bn(randomBytes(len));
  while (r.cmp(priv.modulus) >=  0 || !r.umod(priv.prime1) || !r.umod(priv.prime2)) {
    r = new bn(randomBytes(len));
  }
  return r;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "tOiH":
/***/ (function(module) {

module.exports = JSON.parse("{\"sha224WithRSAEncryption\":{\"sign\":\"rsa\",\"hash\":\"sha224\",\"id\":\"302d300d06096086480165030402040500041c\"},\"RSA-SHA224\":{\"sign\":\"ecdsa/rsa\",\"hash\":\"sha224\",\"id\":\"302d300d06096086480165030402040500041c\"},\"sha256WithRSAEncryption\":{\"sign\":\"rsa\",\"hash\":\"sha256\",\"id\":\"3031300d060960864801650304020105000420\"},\"RSA-SHA256\":{\"sign\":\"ecdsa/rsa\",\"hash\":\"sha256\",\"id\":\"3031300d060960864801650304020105000420\"},\"sha384WithRSAEncryption\":{\"sign\":\"rsa\",\"hash\":\"sha384\",\"id\":\"3041300d060960864801650304020205000430\"},\"RSA-SHA384\":{\"sign\":\"ecdsa/rsa\",\"hash\":\"sha384\",\"id\":\"3041300d060960864801650304020205000430\"},\"sha512WithRSAEncryption\":{\"sign\":\"rsa\",\"hash\":\"sha512\",\"id\":\"3051300d060960864801650304020305000440\"},\"RSA-SHA512\":{\"sign\":\"ecdsa/rsa\",\"hash\":\"sha512\",\"id\":\"3051300d060960864801650304020305000440\"},\"RSA-SHA1\":{\"sign\":\"rsa\",\"hash\":\"sha1\",\"id\":\"3021300906052b0e03021a05000414\"},\"ecdsa-with-SHA1\":{\"sign\":\"ecdsa\",\"hash\":\"sha1\",\"id\":\"\"},\"sha256\":{\"sign\":\"ecdsa\",\"hash\":\"sha256\",\"id\":\"\"},\"sha224\":{\"sign\":\"ecdsa\",\"hash\":\"sha224\",\"id\":\"\"},\"sha384\":{\"sign\":\"ecdsa\",\"hash\":\"sha384\",\"id\":\"\"},\"sha512\":{\"sign\":\"ecdsa\",\"hash\":\"sha512\",\"id\":\"\"},\"DSA-SHA\":{\"sign\":\"dsa\",\"hash\":\"sha1\",\"id\":\"\"},\"DSA-SHA1\":{\"sign\":\"dsa\",\"hash\":\"sha1\",\"id\":\"\"},\"DSA\":{\"sign\":\"dsa\",\"hash\":\"sha1\",\"id\":\"\"},\"DSA-WITH-SHA224\":{\"sign\":\"dsa\",\"hash\":\"sha224\",\"id\":\"\"},\"DSA-SHA224\":{\"sign\":\"dsa\",\"hash\":\"sha224\",\"id\":\"\"},\"DSA-WITH-SHA256\":{\"sign\":\"dsa\",\"hash\":\"sha256\",\"id\":\"\"},\"DSA-SHA256\":{\"sign\":\"dsa\",\"hash\":\"sha256\",\"id\":\"\"},\"DSA-WITH-SHA384\":{\"sign\":\"dsa\",\"hash\":\"sha384\",\"id\":\"\"},\"DSA-SHA384\":{\"sign\":\"dsa\",\"hash\":\"sha384\",\"id\":\"\"},\"DSA-WITH-SHA512\":{\"sign\":\"dsa\",\"hash\":\"sha512\",\"id\":\"\"},\"DSA-SHA512\":{\"sign\":\"dsa\",\"hash\":\"sha512\",\"id\":\"\"},\"DSA-RIPEMD160\":{\"sign\":\"dsa\",\"hash\":\"rmd160\",\"id\":\"\"},\"ripemd160WithRSA\":{\"sign\":\"rsa\",\"hash\":\"rmd160\",\"id\":\"3021300906052b2403020105000414\"},\"RSA-RIPEMD160\":{\"sign\":\"rsa\",\"hash\":\"rmd160\",\"id\":\"3021300906052b2403020105000414\"},\"md5WithRSAEncryption\":{\"sign\":\"rsa\",\"hash\":\"md5\",\"id\":\"3020300c06082a864886f70d020505000410\"},\"RSA-MD5\":{\"sign\":\"rsa\",\"hash\":\"md5\",\"id\":\"3020300c06082a864886f70d020505000410\"}}");

/***/ }),

/***/ "tpL1":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__("mObS")
var stream = __webpack_require__("1IWx")
var inherits = __webpack_require__("P7XM")
var sign = __webpack_require__("b+dc")
var verify = __webpack_require__("mAz1")

var algorithms = __webpack_require__("tOiH")
Object.keys(algorithms).forEach(function (key) {
  algorithms[key].id = new Buffer(algorithms[key].id, 'hex')
  algorithms[key.toLowerCase()] = algorithms[key]
})

function Sign (algorithm) {
  stream.Writable.call(this)

  var data = algorithms[algorithm]
  if (!data) throw new Error('Unknown message digest')

  this._hashType = data.hash
  this._hash = createHash(data.hash)
  this._tag = data.id
  this._signType = data.sign
}
inherits(Sign, stream.Writable)

Sign.prototype._write = function _write (data, _, done) {
  this._hash.update(data)
  done()
}

Sign.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = new Buffer(data, enc)

  this._hash.update(data)
  return this
}

Sign.prototype.sign = function signMethod (key, enc) {
  this.end()
  var hash = this._hash.digest()
  var sig = sign(hash, key, this._hashType, this._signType, this._tag)

  return enc ? sig.toString(enc) : sig
}

function Verify (algorithm) {
  stream.Writable.call(this)

  var data = algorithms[algorithm]
  if (!data) throw new Error('Unknown message digest')

  this._hash = createHash(data.hash)
  this._tag = data.id
  this._signType = data.sign
}
inherits(Verify, stream.Writable)

Verify.prototype._write = function _write (data, _, done) {
  this._hash.update(data)
  done()
}

Verify.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = new Buffer(data, enc)

  this._hash.update(data)
  return this
}

Verify.prototype.verify = function verifyMethod (key, sig, enc) {
  if (typeof sig === 'string') sig = new Buffer(sig, enc)

  this.end()
  var hash = this._hash.digest()
  return verify(sig, hash, key, this._signType, this._tag)
}

function createSign (algorithm) {
  return new Sign(algorithm)
}

function createVerify (algorithm) {
  return new Verify(algorithm)
}

module.exports = {
  Sign: createSign,
  Verify: createVerify,
  createSign: createSign,
  createVerify: createVerify
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "usKN":
/***/ (function(module, exports, __webpack_require__) {

var modeModules = {
  ECB: __webpack_require__("AUX7"),
  CBC: __webpack_require__("wRn4"),
  CFB: __webpack_require__("NQVK"),
  CFB8: __webpack_require__("YskG"),
  CFB1: __webpack_require__("Ujlg"),
  OFB: __webpack_require__("UWVS"),
  CTR: __webpack_require__("at63"),
  GCM: __webpack_require__("at63")
}

var modes = __webpack_require__("6F8h")

for (var key in modes) {
  modes[key].module = modeModules[modes[key].mode]
}

module.exports = modes


/***/ }),

/***/ "vZ2G":
/***/ (function(module, exports) {

function incr32 (iv) {
  var len = iv.length
  var item
  while (len--) {
    item = iv.readUInt8(len)
    if (item === 255) {
      iv.writeUInt8(0, len)
    } else {
      item++
      iv.writeUInt8(item, len)
      break
    }
  }
}
module.exports = incr32


/***/ }),

/***/ "wRn4":
/***/ (function(module, exports, __webpack_require__) {

var xor = __webpack_require__("jIre")

exports.encrypt = function (self, block) {
  var data = xor(block, self._prev)

  self._prev = self._cipher.encryptBlock(data)
  return self._prev
}

exports.decrypt = function (self, block) {
  var pad = self._prev

  self._prev = block
  var out = self._cipher.decryptBlock(block)

  return xor(out, pad)
}


/***/ }),

/***/ "zZGF":
/***/ (function(module) {

module.exports = JSON.parse("{\"1.3.132.0.10\":\"secp256k1\",\"1.3.132.0.33\":\"p224\",\"1.2.840.10045.3.1.1\":\"p192\",\"1.2.840.10045.3.1.7\":\"p256\",\"1.3.132.0.34\":\"p384\",\"1.3.132.0.35\":\"p521\"}");

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1hZXMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvcmFuZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1hZXMvbW9kZXMvZWNiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iczU4L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iczU4Y2hlY2svYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1kZXMvbW9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL3N0cmVhbUNpcGhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnl0ZWJ1ZmZlci9kaXN0L2J5dGVidWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktc2lnbi9hbGdvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1kZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2NmYi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1hZXMvYWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5LWFlcy9naGFzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1hZXMvZGVjcnlwdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5LWFlcy9tb2Rlcy9vZmIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2NmYjEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2NmYjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2N0ci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1zaWduL2Jyb3dzZXIvc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnM1OGNoZWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5LWFlcy9hdXRoQ2lwaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYW1lbC1jYXNlL2NhbWVsLWNhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL2VuY3J5cHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVpbHRpbi1zdGF0dXMtY29kZXMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyLXhvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1jaXBoZXIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1zaWduL2Jyb3dzZXIvdmVyaWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5LXJzYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1zaWduL2Jyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5LWFlcy9pbmNyMzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktYWVzL21vZGVzL2NiYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGNBQWMs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TyxDQUFDLE1BQU87QUFDdEIsT0FBTyxtQkFBTyxDQUFDLE1BQU87QUFDdEIsT0FBTyxtQkFBTyxDQUFDLE1BQU87QUFDdEIsUUFBUSxtQkFBTyxDQUFDLE1BQVE7QUFDeEIsUUFBUSxtQkFBTyxDQUFDLE1BQVE7QUFDeEIsT0FBTyxtQkFBTyxDQUFDLE1BQU87QUFDdEIsT0FBTyxtQkFBTyxDQUFDLE1BQU87QUFDdEIsT0FBTyxtQkFBTyxDQUFDLE1BQU87QUFDdEI7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLE1BQWE7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZEEsVUFBVSxtQkFBTyxDQUFDLE1BQVk7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6InZlbmRvcn43Mjc0ZTFkZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2lwaGVycyA9IHJlcXVpcmUoJy4vZW5jcnlwdGVyJylcbnZhciBkZWNpcGhlcnMgPSByZXF1aXJlKCcuL2RlY3J5cHRlcicpXG52YXIgbW9kZXMgPSByZXF1aXJlKCcuL21vZGVzL2xpc3QuanNvbicpXG5cbmZ1bmN0aW9uIGdldENpcGhlcnMgKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMobW9kZXMpXG59XG5cbmV4cG9ydHMuY3JlYXRlQ2lwaGVyID0gZXhwb3J0cy5DaXBoZXIgPSBjaXBoZXJzLmNyZWF0ZUNpcGhlclxuZXhwb3J0cy5jcmVhdGVDaXBoZXJpdiA9IGV4cG9ydHMuQ2lwaGVyaXYgPSBjaXBoZXJzLmNyZWF0ZUNpcGhlcml2XG5leHBvcnRzLmNyZWF0ZURlY2lwaGVyID0gZXhwb3J0cy5EZWNpcGhlciA9IGRlY2lwaGVycy5jcmVhdGVEZWNpcGhlclxuZXhwb3J0cy5jcmVhdGVEZWNpcGhlcml2ID0gZXhwb3J0cy5EZWNpcGhlcml2ID0gZGVjaXBoZXJzLmNyZWF0ZURlY2lwaGVyaXZcbmV4cG9ydHMubGlzdENpcGhlcnMgPSBleHBvcnRzLmdldENpcGhlcnMgPSBnZXRDaXBoZXJzXG4iLCJ2YXIgcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByYW5kKGxlbikge1xuICBpZiAoIXIpXG4gICAgciA9IG5ldyBSYW5kKG51bGwpO1xuXG4gIHJldHVybiByLmdlbmVyYXRlKGxlbik7XG59O1xuXG5mdW5jdGlvbiBSYW5kKHJhbmQpIHtcbiAgdGhpcy5yYW5kID0gcmFuZDtcbn1cbm1vZHVsZS5leHBvcnRzLlJhbmQgPSBSYW5kO1xuXG5SYW5kLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIGdlbmVyYXRlKGxlbikge1xuICByZXR1cm4gdGhpcy5fcmFuZChsZW4pO1xufTtcblxuLy8gRW11bGF0ZSBjcnlwdG8gQVBJIHVzaW5nIHJhbmR5XG5SYW5kLnByb3RvdHlwZS5fcmFuZCA9IGZ1bmN0aW9uIF9yYW5kKG4pIHtcbiAgaWYgKHRoaXMucmFuZC5nZXRCeXRlcylcbiAgICByZXR1cm4gdGhpcy5yYW5kLmdldEJ5dGVzKG4pO1xuXG4gIHZhciByZXMgPSBuZXcgVWludDhBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspXG4gICAgcmVzW2ldID0gdGhpcy5yYW5kLmdldEJ5dGUoKTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbmlmICh0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcpIHtcbiAgaWYgKHNlbGYuY3J5cHRvICYmIHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIE1vZGVybiBicm93c2Vyc1xuICAgIFJhbmQucHJvdG90eXBlLl9yYW5kID0gZnVuY3Rpb24gX3JhbmQobikge1xuICAgICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KG4pO1xuICAgICAgc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycik7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoc2VsZi5tc0NyeXB0byAmJiBzZWxmLm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIElFXG4gICAgUmFuZC5wcm90b3R5cGUuX3JhbmQgPSBmdW5jdGlvbiBfcmFuZChuKSB7XG4gICAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICBzZWxmLm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnIpO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9O1xuXG4gIC8vIFNhZmFyaSdzIFdlYldvcmtlcnMgZG8gbm90IGhhdmUgYGNyeXB0b2BcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE9sZCBqdW5rXG4gICAgUmFuZC5wcm90b3R5cGUuX3JhbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIHlldCcpO1xuICAgIH07XG4gIH1cbn0gZWxzZSB7XG4gIC8vIE5vZGUuanMgb3IgV2ViIHdvcmtlciB3aXRoIG5vIGNyeXB0byBzdXBwb3J0XG4gIHRyeSB7XG4gICAgdmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzICE9PSAnZnVuY3Rpb24nKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydGVkJyk7XG5cbiAgICBSYW5kLnByb3RvdHlwZS5fcmFuZCA9IGZ1bmN0aW9uIF9yYW5kKG4pIHtcbiAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMobik7XG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG59XG4iLCJleHBvcnRzLmVuY3J5cHQgPSBmdW5jdGlvbiAoc2VsZiwgYmxvY2spIHtcbiAgcmV0dXJuIHNlbGYuX2NpcGhlci5lbmNyeXB0QmxvY2soYmxvY2spXG59XG5cbmV4cG9ydHMuZGVjcnlwdCA9IGZ1bmN0aW9uIChzZWxmLCBibG9jaykge1xuICByZXR1cm4gc2VsZi5fY2lwaGVyLmRlY3J5cHRCbG9jayhibG9jaylcbn1cbiIsInZhciBiYXNleCA9IHJlcXVpcmUoJ2Jhc2UteCcpXG52YXIgQUxQSEFCRVQgPSAnMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eidcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNleChBTFBIQUJFVClcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTU4ID0gcmVxdWlyZSgnYnM1OCcpXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hlY2tzdW1Gbikge1xuICAvLyBFbmNvZGUgYSBidWZmZXIgYXMgYSBiYXNlNTgtY2hlY2sgZW5jb2RlZCBzdHJpbmdcbiAgZnVuY3Rpb24gZW5jb2RlIChwYXlsb2FkKSB7XG4gICAgdmFyIGNoZWNrc3VtID0gY2hlY2tzdW1GbihwYXlsb2FkKVxuXG4gICAgcmV0dXJuIGJhc2U1OC5lbmNvZGUoQnVmZmVyLmNvbmNhdChbXG4gICAgICBwYXlsb2FkLFxuICAgICAgY2hlY2tzdW1cbiAgICBdLCBwYXlsb2FkLmxlbmd0aCArIDQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlUmF3IChidWZmZXIpIHtcbiAgICB2YXIgcGF5bG9hZCA9IGJ1ZmZlci5zbGljZSgwLCAtNClcbiAgICB2YXIgY2hlY2tzdW0gPSBidWZmZXIuc2xpY2UoLTQpXG4gICAgdmFyIG5ld0NoZWNrc3VtID0gY2hlY2tzdW1GbihwYXlsb2FkKVxuXG4gICAgaWYgKGNoZWNrc3VtWzBdIF4gbmV3Q2hlY2tzdW1bMF0gfFxuICAgICAgICBjaGVja3N1bVsxXSBeIG5ld0NoZWNrc3VtWzFdIHxcbiAgICAgICAgY2hlY2tzdW1bMl0gXiBuZXdDaGVja3N1bVsyXSB8XG4gICAgICAgIGNoZWNrc3VtWzNdIF4gbmV3Q2hlY2tzdW1bM10pIHJldHVyblxuXG4gICAgcmV0dXJuIHBheWxvYWRcbiAgfVxuXG4gIC8vIERlY29kZSBhIGJhc2U1OC1jaGVjayBlbmNvZGVkIHN0cmluZyB0byBhIGJ1ZmZlciwgbm8gcmVzdWx0IGlmIGNoZWNrc3VtIGlzIHdyb25nXG4gIGZ1bmN0aW9uIGRlY29kZVVuc2FmZSAoc3RyaW5nKSB7XG4gICAgdmFyIGJ1ZmZlciA9IGJhc2U1OC5kZWNvZGVVbnNhZmUoc3RyaW5nKVxuICAgIGlmICghYnVmZmVyKSByZXR1cm5cblxuICAgIHJldHVybiBkZWNvZGVSYXcoYnVmZmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlIChzdHJpbmcpIHtcbiAgICB2YXIgYnVmZmVyID0gYmFzZTU4LmRlY29kZShzdHJpbmcpXG4gICAgdmFyIHBheWxvYWQgPSBkZWNvZGVSYXcoYnVmZmVyLCBjaGVja3N1bUZuKVxuICAgIGlmICghcGF5bG9hZCkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNoZWNrc3VtJylcbiAgICByZXR1cm4gcGF5bG9hZFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBkZWNvZGVVbnNhZmU6IGRlY29kZVVuc2FmZVxuICB9XG59XG4iLCJleHBvcnRzWydkZXMtZWNiJ10gPSB7XG4gIGtleTogOCxcbiAgaXY6IDBcbn1cbmV4cG9ydHNbJ2Rlcy1jYmMnXSA9IGV4cG9ydHMuZGVzID0ge1xuICBrZXk6IDgsXG4gIGl2OiA4XG59XG5leHBvcnRzWydkZXMtZWRlMy1jYmMnXSA9IGV4cG9ydHMuZGVzMyA9IHtcbiAga2V5OiAyNCxcbiAgaXY6IDhcbn1cbmV4cG9ydHNbJ2Rlcy1lZGUzJ10gPSB7XG4gIGtleTogMjQsXG4gIGl2OiAwXG59XG5leHBvcnRzWydkZXMtZWRlLWNiYyddID0ge1xuICBrZXk6IDE2LFxuICBpdjogOFxufVxuZXhwb3J0c1snZGVzLWVkZSddID0ge1xuICBrZXk6IDE2LFxuICBpdjogMFxufVxuIiwidmFyIGFlcyA9IHJlcXVpcmUoJy4vYWVzJylcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2NpcGhlci1iYXNlJylcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcblxuZnVuY3Rpb24gU3RyZWFtQ2lwaGVyIChtb2RlLCBrZXksIGl2LCBkZWNyeXB0KSB7XG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMpXG5cbiAgdGhpcy5fY2lwaGVyID0gbmV3IGFlcy5BRVMoa2V5KVxuICB0aGlzLl9wcmV2ID0gQnVmZmVyLmZyb20oaXYpXG4gIHRoaXMuX2NhY2hlID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG4gIHRoaXMuX3NlY0NhY2hlID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG4gIHRoaXMuX2RlY3J5cHQgPSBkZWNyeXB0XG4gIHRoaXMuX21vZGUgPSBtb2RlXG59XG5cbmluaGVyaXRzKFN0cmVhbUNpcGhlciwgVHJhbnNmb3JtKVxuXG5TdHJlYW1DaXBoZXIucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgcmV0dXJuIHRoaXMuX21vZGUuZW5jcnlwdCh0aGlzLCBjaHVuaywgdGhpcy5fZGVjcnlwdClcbn1cblxuU3RyZWFtQ2lwaGVyLnByb3RvdHlwZS5fZmluYWwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2NpcGhlci5zY3J1YigpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtQ2lwaGVyXG4iLCIvKlxyXG4gQ29weXJpZ2h0IDIwMTMtMjAxNCBEYW5pZWwgV2lydHogPGRjb2RlQGRjb2RlLmlvPlxyXG5cclxuIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuXHJcbiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcbiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAbGljZW5zZSBieXRlYnVmZmVyLmpzIChjKSAyMDE1IERhbmllbCBXaXJ0eiA8ZGNvZGVAZGNvZGUuaW8+XHJcbiAqIEJhY2tpbmcgYnVmZmVyOiBBcnJheUJ1ZmZlciwgQWNjZXNzb3I6IFVpbnQ4QXJyYXlcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxyXG4gKiBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL2J5dGVidWZmZXIuanMgZm9yIGRldGFpbHNcclxuICovXHJcbihmdW5jdGlvbihnbG9iYWwsIGZhY3RvcnkpIHtcclxuXHJcbiAgICAvKiBBTUQgKi8gaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lW1wiYW1kXCJdKVxyXG4gICAgICAgIGRlZmluZShbXCJsb25nXCJdLCBmYWN0b3J5KTtcclxuICAgIC8qIENvbW1vbkpTICovIGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlICYmIG1vZHVsZVtcImV4cG9ydHNcIl0pXHJcbiAgICAgICAgbW9kdWxlWydleHBvcnRzJ10gPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBMb25nOyB0cnkgeyBMb25nID0gcmVxdWlyZShcImxvbmdcIik7IH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KExvbmcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAvKiBHbG9iYWwgKi8gZWxzZVxyXG4gICAgICAgIChnbG9iYWxbXCJkY29kZUlPXCJdID0gZ2xvYmFsW1wiZGNvZGVJT1wiXSB8fCB7fSlbXCJCeXRlQnVmZmVyXCJdID0gZmFjdG9yeShnbG9iYWxbXCJkY29kZUlPXCJdW1wiTG9uZ1wiXSk7XHJcblxyXG59KSh0aGlzLCBmdW5jdGlvbihMb25nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQnl0ZUJ1ZmZlci5cclxuICAgICAqIEBjbGFzcyBUaGUgc3dpc3MgYXJteSBrbmlmZSBmb3IgYmluYXJ5IGRhdGEgaW4gSmF2YVNjcmlwdC5cclxuICAgICAqIEBleHBvcnRzIEJ5dGVCdWZmZXJcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBjYXBhY2l0eSBJbml0aWFsIGNhcGFjaXR5LiBEZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0NBUEFDSVRZfS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGxpdHRsZUVuZGlhbiBXaGV0aGVyIHRvIHVzZSBsaXR0bGUgb3IgYmlnIGVuZGlhbiBieXRlIG9yZGVyLiBEZWZhdWx0cyB0b1xyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyLkRFRkFVTFRfRU5ESUFOfS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IG5vQXNzZXJ0IFdoZXRoZXIgdG8gc2tpcCBhc3NlcnRpb25zIG9mIG9mZnNldHMgYW5kIHZhbHVlcy4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX05PQVNTRVJUfS5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgdmFyIEJ5dGVCdWZmZXIgPSBmdW5jdGlvbihjYXBhY2l0eSwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FwYWNpdHkgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICBjYXBhY2l0eSA9IEJ5dGVCdWZmZXIuREVGQVVMVF9DQVBBQ0lUWTtcclxuICAgICAgICBpZiAodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIGxpdHRsZUVuZGlhbiA9IEJ5dGVCdWZmZXIuREVGQVVMVF9FTkRJQU47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub0Fzc2VydCA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIG5vQXNzZXJ0ID0gQnl0ZUJ1ZmZlci5ERUZBVUxUX05PQVNTRVJUO1xyXG4gICAgICAgIGlmICghbm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgY2FwYWNpdHkgPSBjYXBhY2l0eSB8IDA7XHJcbiAgICAgICAgICAgIGlmIChjYXBhY2l0eSA8IDApXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBjYXBhY2l0eVwiKTtcclxuICAgICAgICAgICAgbGl0dGxlRW5kaWFuID0gISFsaXR0bGVFbmRpYW47XHJcbiAgICAgICAgICAgIG5vQXNzZXJ0ID0gISFub0Fzc2VydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJhY2tpbmcgQXJyYXlCdWZmZXIuXHJcbiAgICAgICAgICogQHR5cGUgeyFBcnJheUJ1ZmZlcn1cclxuICAgICAgICAgKiBAZXhwb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBjYXBhY2l0eSA9PT0gMCA/IEVNUFRZX0JVRkZFUiA6IG5ldyBBcnJheUJ1ZmZlcihjYXBhY2l0eSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVpbnQ4QXJyYXkgdXRpbGl6ZWQgdG8gbWFuaXB1bGF0ZSB0aGUgYmFja2luZyBidWZmZXIuIEJlY29tZXMgYG51bGxgIGlmIHRoZSBiYWNraW5nIGJ1ZmZlciBoYXMgYSBjYXBhY2l0eSBvZiBgMGAuXHJcbiAgICAgICAgICogQHR5cGUgez9VaW50OEFycmF5fVxyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnZpZXcgPSBjYXBhY2l0eSA9PT0gMCA/IG51bGwgOiBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFic29sdXRlIHJlYWQvd3JpdGUgb2Zmc2V0LlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciNmbGlwXHJcbiAgICAgICAgICogQHNlZSBCeXRlQnVmZmVyI2NsZWFyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYXJrZWQgb2Zmc2V0LlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciNtYXJrXHJcbiAgICAgICAgICogQHNlZSBCeXRlQnVmZmVyI3Jlc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tYXJrZWRPZmZzZXQgPSAtMTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWJzb2x1dGUgbGltaXQgb2YgdGhlIGNvbnRhaW5lZCBkYXRhLiBTZXQgdG8gdGhlIGJhY2tpbmcgYnVmZmVyJ3MgY2FwYWNpdHkgdXBvbiBhbGxvY2F0aW9uLlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciNmbGlwXHJcbiAgICAgICAgICogQHNlZSBCeXRlQnVmZmVyI2NsZWFyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5saW1pdCA9IGNhcGFjaXR5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXaGV0aGVyIHRvIHVzZSBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIsIGRlZmF1bHRzIHRvIGBmYWxzZWAgZm9yIGJpZyBlbmRpYW4uXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGl0dGxlRW5kaWFuID0gbGl0dGxlRW5kaWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXaGV0aGVyIHRvIHNraXAgYXNzZXJ0aW9ucyBvZiBvZmZzZXRzIGFuZCB2YWx1ZXMsIGRlZmF1bHRzIHRvIGBmYWxzZWAuXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubm9Bc3NlcnQgPSBub0Fzc2VydDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCeXRlQnVmZmVyIHZlcnNpb24uXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuVkVSU0lPTiA9IFwiNS4wLjFcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExpdHRsZSBlbmRpYW4gY29uc3RhbnQgdGhhdCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIGl0cyBib29sZWFuIHZhbHVlLiBFdmFsdWF0ZXMgdG8gYHRydWVgLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAY29uc3RcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5MSVRUTEVfRU5ESUFOID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpZyBlbmRpYW4gY29uc3RhbnQgdGhhdCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIGl0cyBib29sZWFuIHZhbHVlLiBFdmFsdWF0ZXMgdG8gYGZhbHNlYC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuQklHX0VORElBTiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBpbml0aWFsIGNhcGFjaXR5IG9mIGAxNmAuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLkRFRkFVTFRfQ0FQQUNJVFkgPSAxNjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgZW5kaWFuZXNzIG9mIGBmYWxzZWAgZm9yIGJpZyBlbmRpYW4uXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTiA9IEJ5dGVCdWZmZXIuQklHX0VORElBTjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgbm8gYXNzZXJ0aW9ucyBmbGFnIG9mIGBmYWxzZWAuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5ERUZBVUxUX05PQVNTRVJUID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGBMb25nYCBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIGEgNjQtYml0IHR3bydzLWNvbXBsZW1lbnQgaW50ZWdlciB2YWx1ZS4gTWF5IGJlIGBudWxsYCBpZiBMb25nLmpzIGhhcyBub3QgYmVlbiBsb2FkZWRcclxuICAgICAqICBhbmQgaW50NjQgc3VwcG9ydCBpcyBub3QgYXZhaWxhYmxlLlxyXG4gICAgICogQHR5cGUgez9Mb25nfVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL2xvbmcuanNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5Mb25nID0gTG9uZyB8fCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGFsaWFzIEJ5dGVCdWZmZXIucHJvdG90eXBlXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgdmFyIEJ5dGVCdWZmZXJQcm90b3R5cGUgPSBCeXRlQnVmZmVyLnByb3RvdHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGluZGljYXRvciB1c2VkIHRvIHJlbGlhYmx5IGRldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCeXRlQnVmZmVyIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLl9faXNCeXRlQnVmZmVyX187XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ5dGVCdWZmZXJQcm90b3R5cGUsIFwiX19pc0J5dGVCdWZmZXJfX1wiLCB7XHJcbiAgICAgICAgdmFsdWU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaGVscGVyc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgeyFBcnJheUJ1ZmZlcn1cclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICB2YXIgRU1QVFlfQlVGRkVSID0gbmV3IEFycmF5QnVmZmVyKDApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyaW5nLmZyb21DaGFyQ29kZSByZWZlcmVuY2UgZm9yIGNvbXBpbGUtdGltZSByZW5hbWluZy5cclxuICAgICAqIEB0eXBlIHtmdW5jdGlvbiguLi5udW1iZXIpOnN0cmluZ31cclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICB2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBzb3VyY2UgZnVuY3Rpb24gZm9yIGEgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHMgU3RyaW5nIHRvIHJlYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9uKCk6bnVtYmVyfG51bGx9IFNvdXJjZSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG5leHQgY2hhciBjb2RlIHJlc3BlY3RpdmVseSBgbnVsbGAgaWYgdGhlcmUgYXJlXHJcbiAgICAgKiAgbm8gbW9yZSBjaGFyYWN0ZXJzIGxlZnQuXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBhcmd1bWVudCBpcyBpbnZhbGlkXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc3RyaW5nU291cmNlKHMpIHtcclxuICAgICAgICB2YXIgaT0wOyByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpIDwgcy5sZW5ndGggPyBzLmNoYXJDb2RlQXQoaSsrKSA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBkZXN0aW5hdGlvbiBmdW5jdGlvbiBmb3IgYSBzdHJpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24obnVtYmVyPSk6dW5kZWZpbmVkfHN0cmluZ30gRGVzdGluYXRpb24gZnVuY3Rpb24gc3VjY2Vzc2l2ZWx5IGNhbGxlZCB3aXRoIHRoZSBuZXh0IGNoYXIgY29kZS5cclxuICAgICAqICBSZXR1cm5zIHRoZSBmaW5hbCBzdHJpbmcgd2hlbiBjYWxsZWQgd2l0aG91dCBhcmd1bWVudHMuXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc3RyaW5nRGVzdGluYXRpb24oKSB7XHJcbiAgICAgICAgdmFyIGNzID0gW10sIHBzID0gW107IHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHMuam9pbignJykrc3RyaW5nRnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY3MpO1xyXG4gICAgICAgICAgICBpZiAoY3MubGVuZ3RoICsgYXJndW1lbnRzLmxlbmd0aCA+IDEwMjQpXHJcbiAgICAgICAgICAgICAgICBwcy5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNzKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY3MsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGFjY2Vzc29yIHR5cGUuXHJcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IGBCdWZmZXJgIHVuZGVyIG5vZGUuanMsIGBVaW50OEFycmF5YCByZXNwZWN0aXZlbHkgYERhdGFWaWV3YCBpbiB0aGUgYnJvd3NlciAoY2xhc3NlcylcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5hY2Nlc3NvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBVaW50OEFycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWxsb2NhdGVzIGEgbmV3IEJ5dGVCdWZmZXIgYmFja2VkIGJ5IGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgY2FwYWNpdHkuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGNhcGFjaXR5IEluaXRpYWwgY2FwYWNpdHkuIERlZmF1bHRzIHRvIHtAbGluayBCeXRlQnVmZmVyLkRFRkFVTFRfQ0FQQUNJVFl9LlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbGl0dGxlRW5kaWFuIFdoZXRoZXIgdG8gdXNlIGxpdHRsZSBvciBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuREVGQVVMVF9FTkRJQU59LlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbm9Bc3NlcnQgV2hldGhlciB0byBza2lwIGFzc2VydGlvbnMgb2Ygb2Zmc2V0cyBhbmQgdmFsdWVzLiBEZWZhdWx0cyB0b1xyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyLkRFRkFVTFRfTk9BU1NFUlR9LlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLmFsbG9jYXRlID0gZnVuY3Rpb24oY2FwYWNpdHksIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJ5dGVCdWZmZXIoY2FwYWNpdHksIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmNhdGVuYXRlcyBtdWx0aXBsZSBCeXRlQnVmZmVycyBpbnRvIG9uZS5cclxuICAgICAqIEBwYXJhbSB7IUFycmF5LjwhQnl0ZUJ1ZmZlcnwhQXJyYXlCdWZmZXJ8IVVpbnQ4QXJyYXl8c3RyaW5nPn0gYnVmZmVycyBCdWZmZXJzIHRvIGNvbmNhdGVuYXRlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8Ym9vbGVhbik9fSBlbmNvZGluZyBTdHJpbmcgZW5jb2RpbmcgaWYgYGJ1ZmZlcnNgIGNvbnRhaW5zIGEgc3RyaW5nIChcImJhc2U2NFwiLCBcImhleFwiLCBcImJpbmFyeVwiLFxyXG4gICAgICogIGRlZmF1bHRzIHRvIFwidXRmOFwiKVxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbGl0dGxlRW5kaWFuIFdoZXRoZXIgdG8gdXNlIGxpdHRsZSBvciBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIgZm9yIHRoZSByZXN1bHRpbmcgQnl0ZUJ1ZmZlci4gRGVmYXVsdHNcclxuICAgICAqICB0byB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTn0uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBub0Fzc2VydCBXaGV0aGVyIHRvIHNraXAgYXNzZXJ0aW9ucyBvZiBvZmZzZXRzIGFuZCB2YWx1ZXMgZm9yIHRoZSByZXN1bHRpbmcgQnl0ZUJ1ZmZlci4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX05PQVNTRVJUfS5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gQ29uY2F0ZW5hdGVkIEJ5dGVCdWZmZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbihidWZmZXJzLCBlbmNvZGluZywgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIG5vQXNzZXJ0ID0gbGl0dGxlRW5kaWFuO1xyXG4gICAgICAgICAgICBsaXR0bGVFbmRpYW4gPSBlbmNvZGluZztcclxuICAgICAgICAgICAgZW5jb2RpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjYXBhY2l0eSA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wLCBrPWJ1ZmZlcnMubGVuZ3RoLCBsZW5ndGg7IGk8azsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmICghQnl0ZUJ1ZmZlci5pc0J5dGVCdWZmZXIoYnVmZmVyc1tpXSkpXHJcbiAgICAgICAgICAgICAgICBidWZmZXJzW2ldID0gQnl0ZUJ1ZmZlci53cmFwKGJ1ZmZlcnNbaV0sIGVuY29kaW5nKTtcclxuICAgICAgICAgICAgbGVuZ3RoID0gYnVmZmVyc1tpXS5saW1pdCAtIGJ1ZmZlcnNbaV0ub2Zmc2V0O1xyXG4gICAgICAgICAgICBpZiAobGVuZ3RoID4gMCkgY2FwYWNpdHkgKz0gbGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FwYWNpdHkgPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnl0ZUJ1ZmZlcigwLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcclxuICAgICAgICB2YXIgYmIgPSBuZXcgQnl0ZUJ1ZmZlcihjYXBhY2l0eSwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCksXHJcbiAgICAgICAgICAgIGJpO1xyXG4gICAgICAgIGk9MDsgd2hpbGUgKGk8aykge1xyXG4gICAgICAgICAgICBiaSA9IGJ1ZmZlcnNbaSsrXTtcclxuICAgICAgICAgICAgbGVuZ3RoID0gYmkubGltaXQgLSBiaS5vZmZzZXQ7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGJiLnZpZXcuc2V0KGJpLnZpZXcuc3ViYXJyYXkoYmkub2Zmc2V0LCBiaS5saW1pdCksIGJiLm9mZnNldCk7XHJcbiAgICAgICAgICAgIGJiLm9mZnNldCArPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJiLmxpbWl0ID0gYmIub2Zmc2V0O1xyXG4gICAgICAgIGJiLm9mZnNldCA9IDA7XHJcbiAgICAgICAgcmV0dXJuIGJiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdHlwZSBpcyBhIEJ5dGVCdWZmZXIuXHJcbiAgICAgKiBAcGFyYW0geyp9IGJiIEJ5dGVCdWZmZXIgdG8gdGVzdFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBpdCBpcyBhIEJ5dGVCdWZmZXIsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuaXNCeXRlQnVmZmVyID0gZnVuY3Rpb24oYmIpIHtcclxuICAgICAgICByZXR1cm4gKGJiICYmIGJiW1wiX19pc0J5dGVCdWZmZXJfX1wiXSkgPT09IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBiYWNraW5nIGJ1ZmZlciB0eXBlLlxyXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBgQnVmZmVyYCB1bmRlciBub2RlLmpzLCBgQXJyYXlCdWZmZXJgIGluIHRoZSBicm93c2VyIChjbGFzc2VzKVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLnR5cGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXlCdWZmZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBhIGJ1ZmZlciBvciBhIHN0cmluZy4gU2V0cyB0aGUgYWxsb2NhdGVkIEJ5dGVCdWZmZXIncyB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IHRvIGAwYCBhbmQgaXRzXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9IHRvIHRoZSBsZW5ndGggb2YgdGhlIHdyYXBwZWQgZGF0YS5cclxuICAgICAqIEBwYXJhbSB7IUJ5dGVCdWZmZXJ8IUFycmF5QnVmZmVyfCFVaW50OEFycmF5fHN0cmluZ3whQXJyYXkuPG51bWJlcj59IGJ1ZmZlciBBbnl0aGluZyB0aGF0IGNhbiBiZSB3cmFwcGVkXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8Ym9vbGVhbik9fSBlbmNvZGluZyBTdHJpbmcgZW5jb2RpbmcgaWYgYGJ1ZmZlcmAgaXMgYSBzdHJpbmcgKFwiYmFzZTY0XCIsIFwiaGV4XCIsIFwiYmluYXJ5XCIsIGRlZmF1bHRzIHRvXHJcbiAgICAgKiAgXCJ1dGY4XCIpXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBsaXR0bGVFbmRpYW4gV2hldGhlciB0byB1c2UgbGl0dGxlIG9yIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTn0uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBub0Fzc2VydCBXaGV0aGVyIHRvIHNraXAgYXNzZXJ0aW9ucyBvZiBvZmZzZXRzIGFuZCB2YWx1ZXMuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuREVGQVVMVF9OT0FTU0VSVH0uXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IEEgQnl0ZUJ1ZmZlciB3cmFwcGluZyBgYnVmZmVyYFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLndyYXAgPSBmdW5jdGlvbihidWZmZXIsIGVuY29kaW5nLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbm9Bc3NlcnQgPSBsaXR0bGVFbmRpYW47XHJcbiAgICAgICAgICAgIGxpdHRsZUVuZGlhbiA9IGVuY29kaW5nO1xyXG4gICAgICAgICAgICBlbmNvZGluZyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBidWZmZXIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICAgICAgZW5jb2RpbmcgPSBcInV0ZjhcIjtcclxuICAgICAgICAgICAgc3dpdGNoIChlbmNvZGluZykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJhc2U2NFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBCeXRlQnVmZmVyLmZyb21CYXNlNjQoYnVmZmVyLCBsaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImhleFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBCeXRlQnVmZmVyLmZyb21IZXgoYnVmZmVyLCBsaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJpbmFyeVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBCeXRlQnVmZmVyLmZyb21CaW5hcnkoYnVmZmVyLCBsaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInV0ZjhcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQnl0ZUJ1ZmZlci5mcm9tVVRGOChidWZmZXIsIGxpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVidWdcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQnl0ZUJ1ZmZlci5mcm9tRGVidWcoYnVmZmVyLCBsaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlVuc3VwcG9ydGVkIGVuY29kaW5nOiBcIitlbmNvZGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1ZmZlciA9PT0gbnVsbCB8fCB0eXBlb2YgYnVmZmVyICE9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBidWZmZXJcIik7XHJcbiAgICAgICAgdmFyIGJiO1xyXG4gICAgICAgIGlmIChCeXRlQnVmZmVyLmlzQnl0ZUJ1ZmZlcihidWZmZXIpKSB7XHJcbiAgICAgICAgICAgIGJiID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS5jbG9uZS5jYWxsKGJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGJiLm1hcmtlZE9mZnNldCA9IC0xO1xyXG4gICAgICAgICAgICByZXR1cm4gYmI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7IC8vIEV4dHJhY3QgQXJyYXlCdWZmZXIgZnJvbSBVaW50OEFycmF5XHJcbiAgICAgICAgICAgIGJiID0gbmV3IEJ5dGVCdWZmZXIoMCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkgeyAvLyBBdm9pZCByZWZlcmVuY2VzIHRvIG1vcmUgdGhhbiBvbmUgRU1QVFlfQlVGRkVSXHJcbiAgICAgICAgICAgICAgICBiYi5idWZmZXIgPSBidWZmZXIuYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgYmIub2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBiYi5saW1pdCA9IGJ1ZmZlci5ieXRlT2Zmc2V0ICsgYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBiYi52aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7IC8vIFJldXNlIEFycmF5QnVmZmVyXHJcbiAgICAgICAgICAgIGJiID0gbmV3IEJ5dGVCdWZmZXIoMCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXIuYnl0ZUxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJiLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIGJiLm9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYi5saW1pdCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgYmIudmlldyA9IGJ1ZmZlci5ieXRlTGVuZ3RoID4gMCA/IG5ldyBVaW50OEFycmF5KGJ1ZmZlcikgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYnVmZmVyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7IC8vIENyZWF0ZSBmcm9tIG9jdGV0c1xyXG4gICAgICAgICAgICBiYiA9IG5ldyBCeXRlQnVmZmVyKGJ1ZmZlci5sZW5ndGgsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xyXG4gICAgICAgICAgICBiYi5saW1pdCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxidWZmZXIubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICBiYi52aWV3W2ldID0gYnVmZmVyW2ldO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGJ1ZmZlclwiKTsgLy8gT3RoZXJ3aXNlIGZhaWxcclxuICAgICAgICByZXR1cm4gYmI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBhcnJheSBhcyBhIGJpdHNldC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Ym9vbGVhbj59IHZhbHVlIEFycmF5IG9mIGJvb2xlYW5zIHRvIHdyaXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgbGVuZ3RoYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlQml0U2V0ID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSlcclxuICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgQml0U2V0OiBOb3QgYW4gYXJyYXlcIik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgICAgYml0cyA9IHZhbHVlLmxlbmd0aCxcclxuICAgICAgICAgIGJ5dGVzID0gKGJpdHMgPj4gMyksXHJcbiAgICAgICAgICBiaXQgPSAwLFxyXG4gICAgICAgICAgaztcclxuXHJcbiAgICAgIG9mZnNldCArPSB0aGlzLndyaXRlVmFyaW50MzIoYml0cyxvZmZzZXQpO1xyXG5cclxuICAgICAgd2hpbGUoYnl0ZXMtLSkge1xyXG4gICAgICAgIGsgPSAoISF2YWx1ZVtiaXQrK10gJiAxKSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCAxKSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCAyKSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCAzKSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCA0KSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCA1KSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCA2KSB8XHJcbiAgICAgICAgICAgICgoISF2YWx1ZVtiaXQrK10gJiAxKSA8PCA3KTtcclxuICAgICAgICB0aGlzLndyaXRlQnl0ZShrLG9mZnNldCsrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoYml0IDwgYml0cykge1xyXG4gICAgICAgIHZhciBtID0gMDsgayA9IDA7XHJcbiAgICAgICAgd2hpbGUoYml0IDwgYml0cykgayA9IGsgfCAoKCEhdmFsdWVbYml0KytdICYgMSkgPDwgKG0rKykpO1xyXG4gICAgICAgIHRoaXMud3JpdGVCeXRlKGssb2Zmc2V0KyspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIEJpdFNldCBhcyBhbiBhcnJheSBvZiBib29sZWFucy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGBsZW5ndGhgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkQml0U2V0ID0gZnVuY3Rpb24ob2Zmc2V0KSB7XHJcbiAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcblxyXG4gICAgICB2YXIgcmV0ID0gdGhpcy5yZWFkVmFyaW50MzIob2Zmc2V0KSxcclxuICAgICAgICAgIGJpdHMgPSByZXQudmFsdWUsXHJcbiAgICAgICAgICBieXRlcyA9IChiaXRzID4+IDMpLFxyXG4gICAgICAgICAgYml0ID0gMCxcclxuICAgICAgICAgIHZhbHVlID0gW10sXHJcbiAgICAgICAgICBrO1xyXG5cclxuICAgICAgb2Zmc2V0ICs9IHJldC5sZW5ndGg7XHJcblxyXG4gICAgICB3aGlsZShieXRlcy0tKSB7XHJcbiAgICAgICAgayA9IHRoaXMucmVhZEJ5dGUob2Zmc2V0KyspO1xyXG4gICAgICAgIHZhbHVlW2JpdCsrXSA9ICEhKGsgJiAweDAxKTtcclxuICAgICAgICB2YWx1ZVtiaXQrK10gPSAhIShrICYgMHgwMik7XHJcbiAgICAgICAgdmFsdWVbYml0KytdID0gISEoayAmIDB4MDQpO1xyXG4gICAgICAgIHZhbHVlW2JpdCsrXSA9ICEhKGsgJiAweDA4KTtcclxuICAgICAgICB2YWx1ZVtiaXQrK10gPSAhIShrICYgMHgxMCk7XHJcbiAgICAgICAgdmFsdWVbYml0KytdID0gISEoayAmIDB4MjApO1xyXG4gICAgICAgIHZhbHVlW2JpdCsrXSA9ICEhKGsgJiAweDQwKTtcclxuICAgICAgICB2YWx1ZVtiaXQrK10gPSAhIShrICYgMHg4MCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGJpdCA8IGJpdHMpIHtcclxuICAgICAgICB2YXIgbSA9IDA7XHJcbiAgICAgICAgayA9IHRoaXMucmVhZEJ5dGUob2Zmc2V0KyspO1xyXG4gICAgICAgIHdoaWxlKGJpdCA8IGJpdHMpIHZhbHVlW2JpdCsrXSA9ICEhKChrID4+IChtKyspKSAmIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJ5dGVzLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCBOdW1iZXIgb2YgYnl0ZXMgdG8gcmVhZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYGxlbmd0aGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn1cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkQnl0ZXMgPSBmdW5jdGlvbihsZW5ndGgsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIGxlbmd0aCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiK2xlbmd0aCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2xpY2UgPSB0aGlzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHNsaWNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIHBheWxvYWQgb2YgYnl0ZXMuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjYXBwZW5kfS5cclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHshQnl0ZUJ1ZmZlcnwhQXJyYXlCdWZmZXJ8IVVpbnQ4QXJyYXl8c3RyaW5nfSBzb3VyY2UgRGF0YSB0byB3cml0ZS4gSWYgYHNvdXJjZWAgaXMgYSBCeXRlQnVmZmVyLCBpdHMgb2Zmc2V0c1xyXG4gICAgICogIHdpbGwgYmUgbW9kaWZpZWQgYWNjb3JkaW5nIHRvIHRoZSBwZXJmb3JtZWQgcmVhZCBvcGVyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyKT19IGVuY29kaW5nIEVuY29kaW5nIGlmIGBkYXRhYCBpcyBhIHN0cmluZyAoXCJiYXNlNjRcIiwgXCJoZXhcIiwgXCJiaW5hcnlcIiwgZGVmYXVsdHMgdG8gXCJ1dGY4XCIpXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICB3cml0dGVuIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUJ5dGVzID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS5hcHBlbmQ7XHJcblxyXG4gICAgLy8gdHlwZXMvaW50cy9pbnQ4XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYW4gOGJpdCBzaWduZWQgaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAxYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdmFsdWUgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgdmFsdWU6IFwiK3ZhbHVlK1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICB2YWx1ZSB8PSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICB2YXIgY2FwYWNpdHkwID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCA+IGNhcGFjaXR5MClcbiAgICAgICAgICAgIHRoaXMucmVzaXplKChjYXBhY2l0eTAgKj0gMikgPiBvZmZzZXQgPyBjYXBhY2l0eTAgOiBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgLT0gMTtcbiAgICAgICAgdGhpcy52aWV3W29mZnNldF0gPSB2YWx1ZTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhbiA4Yml0IHNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3dyaXRlSW50OH0uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAxYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVCeXRlID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUludDg7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiA4Yml0IHNpZ25lZCBpbnRlZ2VyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGFkdmFuY2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgMWAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDEgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIisxK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlld1tvZmZzZXRdO1xyXG4gICAgICAgIGlmICgodmFsdWUgJiAweDgwKSA9PT0gMHg4MCkgdmFsdWUgPSAtKDB4RkYgLSB2YWx1ZSArIDEpOyAvLyBDYXN0IHRvIHNpZ25lZFxyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIDhiaXQgc2lnbmVkIGludGVnZXIuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjcmVhZEludDh9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAxYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRCeXRlID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkSW50ODtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhbiA4Yml0IHVuc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGFkdmFuY2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgMWAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVWludDggPSBmdW5jdGlvbih2YWx1ZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCB2YWx1ZTogXCIrdmFsdWUrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIHZhbHVlID4+Pj0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgdmFyIGNhcGFjaXR5MSA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTEpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkxICo9IDIpID4gb2Zmc2V0ID8gY2FwYWNpdHkxIDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IDE7XG4gICAgICAgIHRoaXMudmlld1tvZmZzZXRdID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYW4gOGJpdCB1bnNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3dyaXRlVWludDh9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGFkdmFuY2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgMWAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVUludDggPSBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVWludDg7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiA4Yml0IHVuc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAxYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVaW50OCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDEgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIisxK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlld1tvZmZzZXRdO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIDhiaXQgdW5zaWduZWQgaW50ZWdlci4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciNyZWFkVWludDh9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAxYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVSW50OCA9IEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZFVpbnQ4O1xyXG5cclxuICAgIC8vIHR5cGVzL2ludHMvaW50MTZcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIDE2Yml0IHNpZ25lZCBpbnRlZ2VyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBhZHZhbmNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDJgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIG9yIGB2YWx1ZWAgaXMgbm90IGEgdmFsaWQgbnVtYmVyXHJcbiAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgb2Zmc2V0YCBpcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJbnQxNiA9IGZ1bmN0aW9uKHZhbHVlLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHZhbHVlOiBcIit2YWx1ZStcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgdmFsdWUgfD0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgKz0gMjtcbiAgICAgICAgdmFyIGNhcGFjaXR5MiA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTIpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkyICo9IDIpID4gb2Zmc2V0ID8gY2FwYWNpdHkyIDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IDI7XG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKHZhbHVlICYgMHhGRjAwKSA+Pj4gODtcclxuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9ICB2YWx1ZSAmIDB4MDBGRjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0XSAgID0gKHZhbHVlICYgMHhGRjAwKSA+Pj4gODtcclxuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsxXSA9ICB2YWx1ZSAmIDB4MDBGRjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSAxNmJpdCBzaWduZWQgaW50ZWdlci4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciN3cml0ZUludDE2fS5cclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBhZHZhbmNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDJgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIG9yIGB2YWx1ZWAgaXMgbm90IGEgdmFsaWQgbnVtYmVyXHJcbiAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgb2Zmc2V0YCBpcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVTaG9ydCA9IEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJbnQxNjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMTZiaXQgc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAyYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgb2Zmc2V0YCBpcyBub3QgYSB2YWxpZCBudW1iZXJcclxuICAgICAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IElmIGBvZmZzZXRgIGlzIG91dCBvZiBib3VuZHNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkSW50MTYgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAyID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMitcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmFsdWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xyXG4gICAgICAgICAgICB2YWx1ZSAgPSB0aGlzLnZpZXdbb2Zmc2V0ICBdO1xyXG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzFdIDw8IDg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgID0gdGhpcy52aWV3W29mZnNldCAgXSA8PCA4O1xyXG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHZhbHVlICYgMHg4MDAwKSA9PT0gMHg4MDAwKSB2YWx1ZSA9IC0oMHhGRkZGIC0gdmFsdWUgKyAxKTsgLy8gQ2FzdCB0byBzaWduZWRcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIDE2Yml0IHNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3JlYWRJbnQxNn0uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBhZHZhbmNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDJgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRTaG9ydCA9IEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZEludDE2O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgMTZiaXQgdW5zaWduZWQgaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAyYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgb2Zmc2V0YCBvciBgdmFsdWVgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVWludDE2ID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdmFsdWUgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgdmFsdWU6IFwiK3ZhbHVlK1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICB2YWx1ZSA+Pj49IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgMCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ICs9IDI7XG4gICAgICAgIHZhciBjYXBhY2l0eTMgPSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob2Zmc2V0ID4gY2FwYWNpdHkzKVxuICAgICAgICAgICAgdGhpcy5yZXNpemUoKGNhcGFjaXR5MyAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5MyA6IG9mZnNldCk7XG4gICAgICAgIG9mZnNldCAtPSAyO1xuICAgICAgICBpZiAodGhpcy5saXR0bGVFbmRpYW4pIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsxXSA9ICh2YWx1ZSAmIDB4RkYwMCkgPj4+IDg7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAgdmFsdWUgJiAweDAwRkY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldF0gICA9ICh2YWx1ZSAmIDB4RkYwMCkgPj4+IDg7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAgdmFsdWUgJiAweDAwRkY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgMTZiaXQgdW5zaWduZWQgaW50ZWdlci4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciN3cml0ZVVpbnQxNn0uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGAyYCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgb2Zmc2V0YCBvciBgdmFsdWVgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVUludDE2ID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVVpbnQxNjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMTZiaXQgdW5zaWduZWQgaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBhZHZhbmNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDJgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVaW50MTYgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAyID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMitcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmFsdWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xyXG4gICAgICAgICAgICB2YWx1ZSAgPSB0aGlzLnZpZXdbb2Zmc2V0ICBdO1xyXG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzFdIDw8IDg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgID0gdGhpcy52aWV3W29mZnNldCAgXSA8PCA4O1xyXG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIDE2Yml0IHVuc2lnbmVkIGludGVnZXIuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjcmVhZFVpbnQxNn0uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBhZHZhbmNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDJgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVSW50MTYgPSBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVaW50MTY7XHJcblxyXG4gICAgLy8gdHlwZXMvaW50cy9pbnQzMlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgMzJiaXQgc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDRgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJbnQzMiA9IGZ1bmN0aW9uKHZhbHVlLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHZhbHVlOiBcIit2YWx1ZStcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgdmFsdWUgfD0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgdmFyIGNhcGFjaXR5NCA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTQpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHk0ICo9IDIpID4gb2Zmc2V0ID8gY2FwYWNpdHk0IDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IDQ7XG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9ICh2YWx1ZSA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAodmFsdWUgPj4+IDE2KSAmIDB4RkY7XG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKHZhbHVlID4+PiAgOCkgJiAweEZGO1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9ICB2YWx1ZSAgICAgICAgICYgMHhGRjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAodmFsdWUgPj4+IDI0KSAmIDB4RkY7XG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKHZhbHVlID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsyXSA9ICh2YWx1ZSA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAgdmFsdWUgICAgICAgICAmIDB4RkY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSAzMmJpdCBzaWduZWQgaW50ZWdlci4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciN3cml0ZUludDMyfS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgNGAgaWYgb21pdHRlZC5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUludCA9IEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJbnQzMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMzJiaXQgc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgNGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkSW50MzIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyA0ID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrNCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmFsdWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xuICAgICAgICAgICAgdmFsdWUgID0gdGhpcy52aWV3W29mZnNldCsyXSA8PCAxNjtcbiAgICAgICAgICAgIHZhbHVlIHw9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgIDg7XG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0ICBdO1xuICAgICAgICAgICAgdmFsdWUgKz0gdGhpcy52aWV3W29mZnNldCszXSA8PCAyNCA+Pj4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlICA9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgMTY7XG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzJdIDw8ICA4O1xuICAgICAgICAgICAgdmFsdWUgfD0gdGhpcy52aWV3W29mZnNldCszXTtcbiAgICAgICAgICAgIHZhbHVlICs9IHRoaXMudmlld1tvZmZzZXQgIF0gPDwgMjQgPj4+IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgfD0gMDsgLy8gQ2FzdCB0byBzaWduZWRcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIDMyYml0IHNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3JlYWRJbnQzMn0uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgYWR2YW5jZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA0YCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRJbnQgPSBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRJbnQzMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIDMyYml0IHVuc2lnbmVkIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDRgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVVaW50MzIgPSBmdW5jdGlvbih2YWx1ZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCB2YWx1ZTogXCIrdmFsdWUrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIHZhbHVlID4+Pj0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgdmFyIGNhcGFjaXR5NSA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTUpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHk1ICo9IDIpID4gb2Zmc2V0ID8gY2FwYWNpdHk1IDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IDQ7XG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9ICh2YWx1ZSA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAodmFsdWUgPj4+IDE2KSAmIDB4RkY7XG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKHZhbHVlID4+PiAgOCkgJiAweEZGO1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9ICB2YWx1ZSAgICAgICAgICYgMHhGRjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAodmFsdWUgPj4+IDI0KSAmIDB4RkY7XG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKHZhbHVlID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsyXSA9ICh2YWx1ZSA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAgdmFsdWUgICAgICAgICAmIDB4RkY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSAzMmJpdCB1bnNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3dyaXRlVWludDMyfS5cclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA0YCBpZiBvbWl0dGVkLlxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVUludDMyID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVVpbnQzMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMzJiaXQgdW5zaWduZWQgaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA0YCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVaW50MzIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyA0ID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrNCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmFsdWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xuICAgICAgICAgICAgdmFsdWUgID0gdGhpcy52aWV3W29mZnNldCsyXSA8PCAxNjtcbiAgICAgICAgICAgIHZhbHVlIHw9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgIDg7XG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0ICBdO1xuICAgICAgICAgICAgdmFsdWUgKz0gdGhpcy52aWV3W29mZnNldCszXSA8PCAyNCA+Pj4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlICA9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgMTY7XG4gICAgICAgICAgICB2YWx1ZSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzJdIDw8ICA4O1xuICAgICAgICAgICAgdmFsdWUgfD0gdGhpcy52aWV3W29mZnNldCszXTtcbiAgICAgICAgICAgIHZhbHVlICs9IHRoaXMudmlld1tvZmZzZXQgIF0gPDwgMjQgPj4+IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSAzMmJpdCB1bnNpZ25lZCBpbnRlZ2VyLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3JlYWRVaW50MzJ9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgNGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkVUludDMyID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkVWludDMyO1xyXG5cclxuICAgIC8vIHR5cGVzL2ludHMvaW50NjRcclxuXHJcbiAgICBpZiAoTG9uZykge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXcml0ZXMgYSA2NGJpdCBzaWduZWQgaW50ZWdlci5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA4YCBpZiBvbWl0dGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlSW50NjQgPSBmdW5jdGlvbih2YWx1ZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoISh2YWx1ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIExvbmcpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHZhbHVlOiBcIit2YWx1ZStcIiAobm90IGFuIGludGVnZXIgb3IgTG9uZylcIik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBMb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDg7XG4gICAgICAgICAgICB2YXIgY2FwYWNpdHk2ID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTYpXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKGNhcGFjaXR5NiAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5NiA6IG9mZnNldCk7XG4gICAgICAgICAgICBvZmZzZXQgLT0gODtcbiAgICAgICAgICAgIHZhciBsbyA9IHZhbHVlLmxvdyxcclxuICAgICAgICAgICAgICAgIGhpID0gdmFsdWUuaGlnaDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGl0dGxlRW5kaWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzNdID0gKGxvID4+PiAyNCkgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAobG8gPj4+IDE2KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsxXSA9IChsbyA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0ICBdID0gIGxvICAgICAgICAgJiAweEZGO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9IChoaSA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzJdID0gKGhpID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAoaGkgPj4+ICA4KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9ICBoaSAgICAgICAgICYgMHhGRjtcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0ICBdID0gKGhpID4+PiAyNCkgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAoaGkgPj4+IDE2KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsyXSA9IChoaSA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzNdID0gIGhpICAgICAgICAgJiAweEZGO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9IChsbyA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKGxvID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAobG8gPj4+ICA4KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9ICBsbyAgICAgICAgICYgMHhGRjtcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA4O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogV3JpdGVzIGEgNjRiaXQgc2lnbmVkIGludGVnZXIuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjd3JpdGVJbnQ2NH0uXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgOGAgaWYgb21pdHRlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAgICAgKiBAZXhwb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUxvbmcgPSBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlSW50NjQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlYWRzIGEgNjRiaXQgc2lnbmVkIGludGVnZXIuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDhgIGlmIG9taXR0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMgeyFMb25nfVxyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRJbnQ2NCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyA4ID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzgrXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbG8gPSAwLFxyXG4gICAgICAgICAgICAgICAgaGkgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXR0bGVFbmRpYW4pIHtcclxuICAgICAgICAgICAgICAgIGxvICA9IHRoaXMudmlld1tvZmZzZXQrMl0gPDwgMTY7XG4gICAgICAgICAgICAgICAgbG8gfD0gdGhpcy52aWV3W29mZnNldCsxXSA8PCAgODtcbiAgICAgICAgICAgICAgICBsbyB8PSB0aGlzLnZpZXdbb2Zmc2V0ICBdO1xuICAgICAgICAgICAgICAgIGxvICs9IHRoaXMudmlld1tvZmZzZXQrM10gPDwgMjQgPj4+IDA7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgICAgICAgICBoaSAgPSB0aGlzLnZpZXdbb2Zmc2V0KzJdIDw8IDE2O1xuICAgICAgICAgICAgICAgIGhpIHw9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgIDg7XG4gICAgICAgICAgICAgICAgaGkgfD0gdGhpcy52aWV3W29mZnNldCAgXTtcbiAgICAgICAgICAgICAgICBoaSArPSB0aGlzLnZpZXdbb2Zmc2V0KzNdIDw8IDI0ID4+PiAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpICA9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgMTY7XG4gICAgICAgICAgICAgICAgaGkgfD0gdGhpcy52aWV3W29mZnNldCsyXSA8PCAgODtcbiAgICAgICAgICAgICAgICBoaSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzNdO1xuICAgICAgICAgICAgICAgIGhpICs9IHRoaXMudmlld1tvZmZzZXQgIF0gPDwgMjQgPj4+IDA7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgICAgICAgICBsbyAgPSB0aGlzLnZpZXdbb2Zmc2V0KzFdIDw8IDE2O1xuICAgICAgICAgICAgICAgIGxvIHw9IHRoaXMudmlld1tvZmZzZXQrMl0gPDwgIDg7XG4gICAgICAgICAgICAgICAgbG8gfD0gdGhpcy52aWV3W29mZnNldCszXTtcbiAgICAgICAgICAgICAgICBsbyArPSB0aGlzLnZpZXdbb2Zmc2V0ICBdIDw8IDI0ID4+PiAwO1xuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBuZXcgTG9uZyhsbywgaGksIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA4O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlYWRzIGEgNjRiaXQgc2lnbmVkIGludGVnZXIuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjcmVhZEludDY0fS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgOGAgaWYgb21pdHRlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZExvbmcgPSBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRJbnQ2NDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogV3JpdGVzIGEgNjRiaXQgdW5zaWduZWQgaW50ZWdlci5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA4YCBpZiBvbWl0dGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVWludDY0ID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBMb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCEodmFsdWUgJiYgdmFsdWUgaW5zdGFuY2VvZiBMb25nKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCB2YWx1ZTogXCIrdmFsdWUrXCIgKG5vdCBhbiBpbnRlZ2VyIG9yIExvbmcpXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgICAgIG9mZnNldCArPSA4O1xuICAgICAgICAgICAgdmFyIGNhcGFjaXR5NyA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gY2FwYWNpdHk3KVxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplKChjYXBhY2l0eTcgKj0gMikgPiBvZmZzZXQgPyBjYXBhY2l0eTcgOiBvZmZzZXQpO1xuICAgICAgICAgICAgb2Zmc2V0IC09IDg7XG4gICAgICAgICAgICB2YXIgbG8gPSB2YWx1ZS5sb3csXHJcbiAgICAgICAgICAgICAgICBoaSA9IHZhbHVlLmhpZ2g7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpdHRsZUVuZGlhbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9IChsbyA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzJdID0gKGxvID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAobG8gPj4+ICA4KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9ICBsbyAgICAgICAgICYgMHhGRjtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAoaGkgPj4+IDI0KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsyXSA9IChoaSA+Pj4gMTYpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKGhpID4+PiAgOCkgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAgaGkgICAgICAgICAmIDB4RkY7XG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCAgXSA9IChoaSA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzFdID0gKGhpID4+PiAxNikgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAoaGkgPj4+ICA4KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCszXSA9ICBoaSAgICAgICAgICYgMHhGRjtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAobG8gPj4+IDI0KSAmIDB4RkY7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3W29mZnNldCsxXSA9IChsbyA+Pj4gMTYpICYgMHhGRjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KzJdID0gKGxvID4+PiAgOCkgJiAweEZGO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAgbG8gICAgICAgICAmIDB4RkY7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gODtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdyaXRlcyBhIDY0Yml0IHVuc2lnbmVkIGludGVnZXIuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjd3JpdGVVaW50NjR9LlxyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDhgIGlmIG9taXR0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVVSW50NjQgPSBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlVWludDY0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWFkcyBhIDY0Yml0IHVuc2lnbmVkIGludGVnZXIuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDhgIGlmIG9taXR0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMgeyFMb25nfVxyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVaW50NjQgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgOCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIis4K1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGxvID0gMCxcclxuICAgICAgICAgICAgICAgIGhpID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGl0dGxlRW5kaWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsbyAgPSB0aGlzLnZpZXdbb2Zmc2V0KzJdIDw8IDE2O1xuICAgICAgICAgICAgICAgIGxvIHw9IHRoaXMudmlld1tvZmZzZXQrMV0gPDwgIDg7XG4gICAgICAgICAgICAgICAgbG8gfD0gdGhpcy52aWV3W29mZnNldCAgXTtcbiAgICAgICAgICAgICAgICBsbyArPSB0aGlzLnZpZXdbb2Zmc2V0KzNdIDw8IDI0ID4+PiAwO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgaGkgID0gdGhpcy52aWV3W29mZnNldCsyXSA8PCAxNjtcbiAgICAgICAgICAgICAgICBoaSB8PSB0aGlzLnZpZXdbb2Zmc2V0KzFdIDw8ICA4O1xuICAgICAgICAgICAgICAgIGhpIHw9IHRoaXMudmlld1tvZmZzZXQgIF07XG4gICAgICAgICAgICAgICAgaGkgKz0gdGhpcy52aWV3W29mZnNldCszXSA8PCAyNCA+Pj4gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaSAgPSB0aGlzLnZpZXdbb2Zmc2V0KzFdIDw8IDE2O1xuICAgICAgICAgICAgICAgIGhpIHw9IHRoaXMudmlld1tvZmZzZXQrMl0gPDwgIDg7XG4gICAgICAgICAgICAgICAgaGkgfD0gdGhpcy52aWV3W29mZnNldCszXTtcbiAgICAgICAgICAgICAgICBoaSArPSB0aGlzLnZpZXdbb2Zmc2V0ICBdIDw8IDI0ID4+PiAwO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgbG8gID0gdGhpcy52aWV3W29mZnNldCsxXSA8PCAxNjtcbiAgICAgICAgICAgICAgICBsbyB8PSB0aGlzLnZpZXdbb2Zmc2V0KzJdIDw8ICA4O1xuICAgICAgICAgICAgICAgIGxvIHw9IHRoaXMudmlld1tvZmZzZXQrM107XG4gICAgICAgICAgICAgICAgbG8gKz0gdGhpcy52aWV3W29mZnNldCAgXSA8PCAyNCA+Pj4gMDtcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbmV3IExvbmcobG8sIGhpLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA4O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlYWRzIGEgNjRiaXQgdW5zaWduZWQgaW50ZWdlci4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciNyZWFkVWludDY0fS5cclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgOGAgaWYgb21pdHRlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZFVJbnQ2NCA9IEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZFVpbnQ2NDtcclxuXHJcbiAgICB9IC8vIExvbmdcclxuXHJcblxyXG4gICAgLy8gdHlwZXMvZmxvYXRzL2Zsb2F0MzJcclxuXHJcbiAgICAvKlxyXG4gICAgIGllZWU3NTQgLSBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2llZWU3NTRcclxuXHJcbiAgICAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcblxyXG4gICAgIENvcHlyaWdodCAoYykgRmVyb3NzIEFib3VraGFkaWplaFxyXG5cclxuICAgICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAgICAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gICAgIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICAgICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAgICAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAgICAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiAgICAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICAgICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiAgICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gICAgIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gICAgIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gICAgIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICAgICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gICAgIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICAgICBUSEUgU09GVFdBUkUuXHJcbiAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gSUVFRTc1NCBmbG9hdCBmcm9tIGEgYnl0ZSBhcnJheS5cclxuICAgICAqIEBwYXJhbSB7IUFycmF5fSBidWZmZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMRVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1MZW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuQnl0ZXNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaWVlZTc1NF9yZWFkKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcclxuICAgICAgICB2YXIgZSwgbSxcclxuICAgICAgICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcclxuICAgICAgICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcclxuICAgICAgICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXHJcbiAgICAgICAgICAgIG5CaXRzID0gLTcsXHJcbiAgICAgICAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcclxuICAgICAgICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXHJcbiAgICAgICAgICAgIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XHJcblxyXG4gICAgICAgIGkgKz0gZDtcclxuXHJcbiAgICAgICAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XHJcbiAgICAgICAgcyA+Pj0gKC1uQml0cyk7XHJcbiAgICAgICAgbkJpdHMgKz0gZUxlbjtcclxuICAgICAgICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxyXG5cclxuICAgICAgICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcclxuICAgICAgICBlID4+PSAoLW5CaXRzKTtcclxuICAgICAgICBuQml0cyArPSBtTGVuO1xyXG4gICAgICAgIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XHJcblxyXG4gICAgICAgIGlmIChlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGUgPSAxIC0gZUJpYXM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xyXG4gICAgICAgICAgICBlID0gZSAtIGVCaWFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhbiBJRUVFNzU0IGZsb2F0IHRvIGEgYnl0ZSBhcnJheS5cclxuICAgICAqIEBwYXJhbSB7IUFycmF5fSBidWZmZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xFXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbUxlblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlc1xyXG4gICAgICogQGlubmVyXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGllZWU3NTRfd3JpdGUoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcclxuICAgICAgICB2YXIgZSwgbSwgYyxcclxuICAgICAgICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcclxuICAgICAgICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcclxuICAgICAgICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXHJcbiAgICAgICAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcclxuICAgICAgICAgICAgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpLFxyXG4gICAgICAgICAgICBkID0gaXNMRSA/IDEgOiAtMSxcclxuICAgICAgICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcclxuICAgICAgICAgICAgZSA9IGVNYXg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBlLS07XHJcbiAgICAgICAgICAgICAgICBjICo9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBydCAvIGM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBlKys7XHJcbiAgICAgICAgICAgICAgICBjIC89IDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xyXG4gICAgICAgICAgICAgICAgbSA9IDA7XHJcbiAgICAgICAgICAgICAgICBlID0gZU1heDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xyXG4gICAgICAgICAgICAgICAgZSA9IGUgKyBlQmlhcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcclxuICAgICAgICAgICAgICAgIGUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxyXG5cclxuICAgICAgICBlID0gKGUgPDwgbUxlbikgfCBtO1xyXG4gICAgICAgIGVMZW4gKz0gbUxlbjtcclxuICAgICAgICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XHJcblxyXG4gICAgICAgIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIDMyYml0IGZsb2F0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gd3JpdGUgdG8uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IGA0YCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVGbG9hdDMyID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHZhbHVlOiBcIit2YWx1ZStcIiAobm90IGEgbnVtYmVyKVwiKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICB2YXIgY2FwYWNpdHk4ID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCA+IGNhcGFjaXR5OClcbiAgICAgICAgICAgIHRoaXMucmVzaXplKChjYXBhY2l0eTggKj0gMikgPiBvZmZzZXQgPyBjYXBhY2l0eTggOiBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgLT0gNDtcbiAgICAgICAgaWVlZTc1NF93cml0ZSh0aGlzLnZpZXcsIHZhbHVlLCBvZmZzZXQsIHRoaXMubGl0dGxlRW5kaWFuLCAyMywgNCk7XHJcbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSAzMmJpdCBmbG9hdC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciN3cml0ZUZsb2F0MzJ9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDRgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUZsb2F0ID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUZsb2F0MzI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIDMyYml0IGZsb2F0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDRgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRGbG9hdDMyID0gZnVuY3Rpb24ob2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgNCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzQrXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaWVlZTc1NF9yZWFkKHRoaXMudmlldywgb2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbiwgMjMsIDQpO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMzJiaXQgZmxvYXQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjcmVhZEZsb2F0MzJ9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgNGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZEZsb2F0ID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkRmxvYXQzMjtcclxuXHJcbiAgICAvLyB0eXBlcy9mbG9hdHMvZmxvYXQ2NFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgNjRiaXQgZmxvYXQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDhgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUZsb2F0NjQgPSBmdW5jdGlvbih2YWx1ZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgdmFsdWU6IFwiK3ZhbHVlK1wiIChub3QgYSBudW1iZXIpXCIpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgMCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ICs9IDg7XG4gICAgICAgIHZhciBjYXBhY2l0eTkgPSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob2Zmc2V0ID4gY2FwYWNpdHk5KVxuICAgICAgICAgICAgdGhpcy5yZXNpemUoKGNhcGFjaXR5OSAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5OSA6IG9mZnNldCk7XG4gICAgICAgIG9mZnNldCAtPSA4O1xuICAgICAgICBpZWVlNzU0X3dyaXRlKHRoaXMudmlldywgdmFsdWUsIG9mZnNldCwgdGhpcy5saXR0bGVFbmRpYW4sIDUyLCA4KTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIDY0Yml0IGZsb2F0LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3dyaXRlRmxvYXQ2NH0uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgOGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlRG91YmxlID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZUZsb2F0NjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIDY0Yml0IGZsb2F0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgYDhgIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRGbG9hdDY0ID0gZnVuY3Rpb24ob2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgOCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzgrXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaWVlZTc1NF9yZWFkKHRoaXMudmlldywgb2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbiwgNTIsIDgpO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gODtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgNjRiaXQgZmxvYXQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIEJ5dGVCdWZmZXIjcmVhZEZsb2F0NjR9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSBgOGAgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZERvdWJsZSA9IEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZEZsb2F0NjQ7XHJcblxyXG5cclxuICAgIC8vIHR5cGVzL3ZhcmludHMvdmFyaW50MzJcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGJ5dGVzIHJlcXVpcmVkIHRvIHN0b3JlIGEgMzJiaXQgYmFzZSAxMjggdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuTUFYX1ZBUklOVDMyX0JZVEVTID0gNTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgcmVxdWlyZWQgdG8gc3RvcmUgYSAzMmJpdCBiYXNlIDEyOCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBlbmNvZGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyByZXF1aXJlZC4gQ2FwcGVkIHRvIHtAbGluayBCeXRlQnVmZmVyLk1BWF9WQVJJTlQzMl9CWVRFU31cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5jYWxjdWxhdGVWYXJpbnQzMiA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gcmVmOiBzcmMvZ29vZ2xlL3Byb3RvYnVmL2lvL2NvZGVkX3N0cmVhbS5jY1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPj4+IDA7XHJcbiAgICAgICAgICAgICBpZiAodmFsdWUgPCAxIDw8IDcgKSByZXR1cm4gMTtcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA8IDEgPDwgMTQpIHJldHVybiAyO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlIDwgMSA8PCAyMSkgcmV0dXJuIDM7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPCAxIDw8IDI4KSByZXR1cm4gNDtcclxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFppZ3phZyBlbmNvZGVzIGEgc2lnbmVkIDMyYml0IGludGVnZXIgc28gdGhhdCBpdCBjYW4gYmUgZWZmZWN0aXZlbHkgdXNlZCB3aXRoIHZhcmludCBlbmNvZGluZy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFNpZ25lZCAzMmJpdCBpbnRlZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBVbnNpZ25lZCB6aWd6YWcgZW5jb2RlZCAzMmJpdCBpbnRlZ2VyXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuemlnWmFnRW5jb2RlMzIgPSBmdW5jdGlvbihuKSB7XHJcbiAgICAgICAgcmV0dXJuICgoKG4gfD0gMCkgPDwgMSkgXiAobiA+PiAzMSkpID4+PiAwOyAvLyByZWY6IHNyYy9nb29nbGUvcHJvdG9idWYvd2lyZV9mb3JtYXRfbGl0ZS5oXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVjb2RlcyBhIHppZ3phZyBlbmNvZGVkIHNpZ25lZCAzMmJpdCBpbnRlZ2VyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVW5zaWduZWQgemlnemFnIGVuY29kZWQgMzJiaXQgaW50ZWdlclxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gU2lnbmVkIDMyYml0IGludGVnZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci56aWdaYWdEZWNvZGUzMiA9IGZ1bmN0aW9uKG4pIHtcclxuICAgICAgICByZXR1cm4gKChuID4+PiAxKSBeIC0obiAmIDEpKSB8IDA7IC8vIC8vIHJlZjogc3JjL2dvb2dsZS9wcm90b2J1Zi93aXJlX2Zvcm1hdF9saXRlLmhcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSAzMmJpdCBiYXNlIDEyOCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgd3JpdHRlbiBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfG51bWJlcn0gdGhpcyBpZiBgb2Zmc2V0YCBpcyBvbWl0dGVkLCBlbHNlIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVZhcmludDMyID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdmFsdWUgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgdmFsdWU6IFwiK3ZhbHVlK1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICB2YWx1ZSB8PSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzaXplID0gQnl0ZUJ1ZmZlci5jYWxjdWxhdGVWYXJpbnQzMih2YWx1ZSksXHJcbiAgICAgICAgICAgIGI7XHJcbiAgICAgICAgb2Zmc2V0ICs9IHNpemU7XG4gICAgICAgIHZhciBjYXBhY2l0eTEwID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCA+IGNhcGFjaXR5MTApXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkxMCAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5MTAgOiBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgLT0gc2l6ZTtcbiAgICAgICAgdmFsdWUgPj4+PSAwO1xyXG4gICAgICAgIHdoaWxlICh2YWx1ZSA+PSAweDgwKSB7XHJcbiAgICAgICAgICAgIGIgPSAodmFsdWUgJiAweDdmKSB8IDB4ODA7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrK10gPSBiO1xyXG4gICAgICAgICAgICB2YWx1ZSA+Pj49IDc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmlld1tvZmZzZXQrK10gPSB2YWx1ZTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYSB6aWctemFnIGVuY29kZWQgKHNpZ25lZCkgMzJiaXQgYmFzZSAxMjggdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIHdyaXR0ZW4gaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcnxudW1iZXJ9IHRoaXMgaWYgYG9mZnNldGAgaXMgb21pdHRlZCwgZWxzZSB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVWYXJpbnQzMlppZ1phZyA9IGZ1bmN0aW9uKHZhbHVlLCBvZmZzZXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZVZhcmludDMyKEJ5dGVCdWZmZXIuemlnWmFnRW5jb2RlMzIodmFsdWUpLCBvZmZzZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgMzJiaXQgYmFzZSAxMjggdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgd3JpdHRlbiBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge251bWJlcnwhe3ZhbHVlOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyfX0gVGhlIHZhbHVlIHJlYWQgaWYgb2Zmc2V0IGlzIG9taXR0ZWQsIGVsc2UgdGhlIHZhbHVlIHJlYWRcclxuICAgICAqICBhbmQgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC5cclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBpdCdzIG5vdCBhIHZhbGlkIHZhcmludC4gSGFzIGEgcHJvcGVydHkgYHRydW5jYXRlZCA9IHRydWVgIGlmIHRoZXJlIGlzIG5vdCBlbm91Z2ggZGF0YSBhdmFpbGFibGVcclxuICAgICAqICB0byBmdWxseSBkZWNvZGUgdGhlIHZhcmludC5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkVmFyaW50MzIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAxID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMStcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IDAsXHJcbiAgICAgICAgICAgIHZhbHVlID0gMCA+Pj4gMCxcclxuICAgICAgICAgICAgYjtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCAmJiBvZmZzZXQgPiB0aGlzLmxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXCJUcnVuY2F0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBlcnJbJ3RydW5jYXRlZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiID0gdGhpcy52aWV3W29mZnNldCsrXTtcclxuICAgICAgICAgICAgaWYgKGMgPCA1KVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgfD0gKGIgJiAweDdmKSA8PCAoNypjKTtcclxuICAgICAgICAgICAgKytjO1xyXG4gICAgICAgIH0gd2hpbGUgKChiICYgMHg4MCkgIT09IDApO1xyXG4gICAgICAgIHZhbHVlIHw9IDA7XHJcbiAgICAgICAgaWYgKHJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwidmFsdWVcIjogdmFsdWUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoXCI6IGNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIChzaWduZWQpIDMyYml0IGJhc2UgMTI4IHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIHdyaXR0ZW4gaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ8IXt2YWx1ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcn19IFRoZSB2YWx1ZSByZWFkIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSB2YWx1ZSByZWFkXHJcbiAgICAgKiAgYW5kIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHJlYWQuXHJcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgaXQncyBub3QgYSB2YWxpZCB2YXJpbnRcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkVmFyaW50MzJaaWdaYWcgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5yZWFkVmFyaW50MzIob2Zmc2V0KTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHZhbFtcInZhbHVlXCJdID0gQnl0ZUJ1ZmZlci56aWdaYWdEZWNvZGUzMih2YWxbXCJ2YWx1ZVwiXSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB2YWwgPSBCeXRlQnVmZmVyLnppZ1phZ0RlY29kZTMyKHZhbCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gdHlwZXMvdmFyaW50cy92YXJpbnQ2NFxyXG5cclxuICAgIGlmIChMb25nKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGJ5dGVzIHJlcXVpcmVkIHRvIHN0b3JlIGEgNjRiaXQgYmFzZSAxMjggdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKiBAY29uc3RcclxuICAgICAgICAgKiBAZXhwb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnl0ZUJ1ZmZlci5NQVhfVkFSSU5UNjRfQllURVMgPSAxMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsY3VsYXRlcyB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyByZXF1aXJlZCB0byBzdG9yZSBhIDY0Yml0IGJhc2UgMTI4IHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSB2YWx1ZSBWYWx1ZSB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBOdW1iZXIgb2YgYnl0ZXMgcmVxdWlyZWQuIENhcHBlZCB0byB7QGxpbmsgQnl0ZUJ1ZmZlci5NQVhfVkFSSU5UNjRfQllURVN9XHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJ5dGVCdWZmZXIuY2FsY3VsYXRlVmFyaW50NjQgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIHJlZjogc3JjL2dvb2dsZS9wcm90b2J1Zi9pby9jb2RlZF9zdHJlYW0uY2NcclxuICAgICAgICAgICAgdmFyIHBhcnQwID0gdmFsdWUudG9JbnQoKSA+Pj4gMCxcclxuICAgICAgICAgICAgICAgIHBhcnQxID0gdmFsdWUuc2hpZnRSaWdodFVuc2lnbmVkKDI4KS50b0ludCgpID4+PiAwLFxyXG4gICAgICAgICAgICAgICAgcGFydDIgPSB2YWx1ZS5zaGlmdFJpZ2h0VW5zaWduZWQoNTYpLnRvSW50KCkgPj4+IDA7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0MiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFydDEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0MCA8IDEgPDwgMTQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0MCA8IDEgPDwgNyA/IDEgOiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnQwIDwgMSA8PCAyMSA/IDMgOiA0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydDEgPCAxIDw8IDE0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFydDEgPCAxIDw8IDcgPyA1IDogNjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0MSA8IDEgPDwgMjEgPyA3IDogODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydDIgPCAxIDw8IDcgPyA5IDogMTA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmlnemFnIGVuY29kZXMgYSBzaWduZWQgNjRiaXQgaW50ZWdlciBzbyB0aGF0IGl0IGNhbiBiZSBlZmZlY3RpdmVseSB1c2VkIHdpdGggdmFyaW50IGVuY29kaW5nLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSB2YWx1ZSBTaWduZWQgbG9uZ1xyXG4gICAgICAgICAqIEByZXR1cm5zIHshTG9uZ30gVW5zaWduZWQgemlnemFnIGVuY29kZWQgbG9uZ1xyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyLnppZ1phZ0VuY29kZTY0ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBMb25nLmZyb21OdW1iZXIodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBMb25nLmZyb21TdHJpbmcodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnVuc2lnbmVkICE9PSBmYWxzZSkgdmFsdWUgPSB2YWx1ZS50b1NpZ25lZCgpO1xuICAgICAgICAgICAgLy8gcmVmOiBzcmMvZ29vZ2xlL3Byb3RvYnVmL3dpcmVfZm9ybWF0X2xpdGUuaFxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2hpZnRMZWZ0KDEpLnhvcih2YWx1ZS5zaGlmdFJpZ2h0KDYzKSkudG9VbnNpZ25lZCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSB6aWd6YWcgZW5jb2RlZCBzaWduZWQgNjRiaXQgaW50ZWdlci5cclxuICAgICAgICAgKiBAcGFyYW0geyFMb25nfG51bWJlcn0gdmFsdWUgVW5zaWduZWQgemlnemFnIGVuY29kZWQgbG9uZyBvciBKYXZhU2NyaXB0IG51bWJlclxyXG4gICAgICAgICAqIEByZXR1cm5zIHshTG9uZ30gU2lnbmVkIGxvbmdcclxuICAgICAgICAgKiBAZXhwb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnl0ZUJ1ZmZlci56aWdaYWdEZWNvZGU2NCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tTnVtYmVyKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gTG9uZy5mcm9tU3RyaW5nKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS51bnNpZ25lZCAhPT0gZmFsc2UpIHZhbHVlID0gdmFsdWUudG9TaWduZWQoKTtcbiAgICAgICAgICAgIC8vIHJlZjogc3JjL2dvb2dsZS9wcm90b2J1Zi93aXJlX2Zvcm1hdF9saXRlLmhcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNoaWZ0UmlnaHRVbnNpZ25lZCgxKS54b3IodmFsdWUuYW5kKExvbmcuT05FKS50b1NpZ25lZCgpLm5lZ2F0ZSgpKS50b1NpZ25lZCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdyaXRlcyBhIDY0Yml0IGJhc2UgMTI4IHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfExvbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgICAgICogIHdyaXR0ZW4gaWYgb21pdHRlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ8bnVtYmVyfSBgdGhpc2AgaWYgb2Zmc2V0IGlzIG9taXR0ZWQsIGVsc2UgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlbi5cclxuICAgICAgICAgKiBAZXhwb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVZhcmludDY0ID0gZnVuY3Rpb24odmFsdWUsIG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBMb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCEodmFsdWUgJiYgdmFsdWUgaW5zdGFuY2VvZiBMb25nKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCB2YWx1ZTogXCIrdmFsdWUrXCIgKG5vdCBhbiBpbnRlZ2VyIG9yIExvbmcpXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbU51bWJlcih2YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IExvbmcuZnJvbVN0cmluZyh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudW5zaWduZWQgIT09IGZhbHNlKSB2YWx1ZSA9IHZhbHVlLnRvU2lnbmVkKCk7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IEJ5dGVCdWZmZXIuY2FsY3VsYXRlVmFyaW50NjQodmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgcGFydDAgPSB2YWx1ZS50b0ludCgpID4+PiAwLFxyXG4gICAgICAgICAgICAgICAgcGFydDEgPSB2YWx1ZS5zaGlmdFJpZ2h0VW5zaWduZWQoMjgpLnRvSW50KCkgPj4+IDAsXHJcbiAgICAgICAgICAgICAgICBwYXJ0MiA9IHZhbHVlLnNoaWZ0UmlnaHRVbnNpZ25lZCg1NikudG9JbnQoKSA+Pj4gMDtcclxuICAgICAgICAgICAgb2Zmc2V0ICs9IHNpemU7XG4gICAgICAgICAgICB2YXIgY2FwYWNpdHkxMSA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gY2FwYWNpdHkxMSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkxMSAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5MTEgOiBvZmZzZXQpO1xuICAgICAgICAgICAgb2Zmc2V0IC09IHNpemU7XG4gICAgICAgICAgICBzd2l0Y2ggKHNpemUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHRoaXMudmlld1tvZmZzZXQrOV0gPSAocGFydDIgPj4+ICA3KSAmIDB4MDE7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkgOiB0aGlzLnZpZXdbb2Zmc2V0KzhdID0gc2l6ZSAhPT0gOSA/IChwYXJ0MiAgICAgICApIHwgMHg4MCA6IChwYXJ0MiAgICAgICApICYgMHg3RjtcclxuICAgICAgICAgICAgICAgIGNhc2UgOCA6IHRoaXMudmlld1tvZmZzZXQrN10gPSBzaXplICE9PSA4ID8gKHBhcnQxID4+PiAyMSkgfCAweDgwIDogKHBhcnQxID4+PiAyMSkgJiAweDdGO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3IDogdGhpcy52aWV3W29mZnNldCs2XSA9IHNpemUgIT09IDcgPyAocGFydDEgPj4+IDE0KSB8IDB4ODAgOiAocGFydDEgPj4+IDE0KSAmIDB4N0Y7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDYgOiB0aGlzLnZpZXdbb2Zmc2V0KzVdID0gc2l6ZSAhPT0gNiA/IChwYXJ0MSA+Pj4gIDcpIHwgMHg4MCA6IChwYXJ0MSA+Pj4gIDcpICYgMHg3RjtcclxuICAgICAgICAgICAgICAgIGNhc2UgNSA6IHRoaXMudmlld1tvZmZzZXQrNF0gPSBzaXplICE9PSA1ID8gKHBhcnQxICAgICAgICkgfCAweDgwIDogKHBhcnQxICAgICAgICkgJiAweDdGO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0IDogdGhpcy52aWV3W29mZnNldCszXSA9IHNpemUgIT09IDQgPyAocGFydDAgPj4+IDIxKSB8IDB4ODAgOiAocGFydDAgPj4+IDIxKSAmIDB4N0Y7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMgOiB0aGlzLnZpZXdbb2Zmc2V0KzJdID0gc2l6ZSAhPT0gMyA/IChwYXJ0MCA+Pj4gMTQpIHwgMHg4MCA6IChwYXJ0MCA+Pj4gMTQpICYgMHg3RjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMiA6IHRoaXMudmlld1tvZmZzZXQrMV0gPSBzaXplICE9PSAyID8gKHBhcnQwID4+PiAgNykgfCAweDgwIDogKHBhcnQwID4+PiAgNykgJiAweDdGO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxIDogdGhpcy52aWV3W29mZnNldCAgXSA9IHNpemUgIT09IDEgPyAocGFydDAgICAgICAgKSB8IDB4ODAgOiAocGFydDAgICAgICAgKSAmIDB4N0Y7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCArPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdyaXRlcyBhIHppZy16YWcgZW5jb2RlZCA2NGJpdCBiYXNlIDEyOCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlci5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcnxMb25nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICAgICAqICB3cml0dGVuIGlmIG9taXR0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfG51bWJlcn0gYHRoaXNgIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW4uXHJcbiAgICAgICAgICogQGV4cG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVWYXJpbnQ2NFppZ1phZyA9IGZ1bmN0aW9uKHZhbHVlLCBvZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVWYXJpbnQ2NChCeXRlQnVmZmVyLnppZ1phZ0VuY29kZTY0KHZhbHVlKSwgb2Zmc2V0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWFkcyBhIDY0Yml0IGJhc2UgMTI4IHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLiBSZXF1aXJlcyBMb25nLmpzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAgICAgKiAgcmVhZCBpZiBvbWl0dGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHshTG9uZ3whe3ZhbHVlOiBMb25nLCBsZW5ndGg6IG51bWJlcn19IFRoZSB2YWx1ZSByZWFkIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSB2YWx1ZSByZWFkIGFuZFxyXG4gICAgICAgICAqICB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyByZWFkLlxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBpdCdzIG5vdCBhIHZhbGlkIHZhcmludFxyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRWYXJpbnQ2NCA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAxID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzErXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZWY6IHNyYy9nb29nbGUvcHJvdG9idWYvaW8vY29kZWRfc3RyZWFtLmNjXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IG9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcnQwID0gMCxcclxuICAgICAgICAgICAgICAgIHBhcnQxID0gMCxcclxuICAgICAgICAgICAgICAgIHBhcnQyID0gMCxcclxuICAgICAgICAgICAgICAgIGIgID0gMDtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQwICA9IChiICYgMHg3RikgICAgICA7IGlmICggYiAmIDB4ODAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQwIHw9IChiICYgMHg3RikgPDwgIDc7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQwIHw9IChiICYgMHg3RikgPDwgMTQ7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQwIHw9IChiICYgMHg3RikgPDwgMjE7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQxICA9IChiICYgMHg3RikgICAgICA7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQxIHw9IChiICYgMHg3RikgPDwgIDc7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQxIHw9IChiICYgMHg3RikgPDwgMTQ7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQxIHw9IChiICYgMHg3RikgPDwgMjE7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQyICA9IChiICYgMHg3RikgICAgICA7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgYiA9IHRoaXMudmlld1tvZmZzZXQrK107IHBhcnQyIHw9IChiICYgMHg3RikgPDwgIDc7IGlmICgoYiAmIDB4ODApIHx8ICh0aGlzLm5vQXNzZXJ0ICYmIHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJCdWZmZXIgb3ZlcnJ1blwiKTsgfX19fX19fX19fVxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBMb25nLmZyb21CaXRzKHBhcnQwIHwgKHBhcnQxIDw8IDI4KSwgKHBhcnQxID4+PiA0KSB8IChwYXJ0MikgPDwgMjQsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlbmd0aCc6IG9mZnNldC1zdGFydFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIDY0Yml0IGJhc2UgMTI4IHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLiBSZXF1aXJlcyBMb25nLmpzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAgICAgKiAgcmVhZCBpZiBvbWl0dGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHshTG9uZ3whe3ZhbHVlOiBMb25nLCBsZW5ndGg6IG51bWJlcn19IFRoZSB2YWx1ZSByZWFkIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSB2YWx1ZSByZWFkIGFuZFxyXG4gICAgICAgICAqICB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyByZWFkLlxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBpdCdzIG5vdCBhIHZhbGlkIHZhcmludFxyXG4gICAgICAgICAqIEBleHBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRWYXJpbnQ2NFppZ1phZyA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5yZWFkVmFyaW50NjQob2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKHZhbCAmJiB2YWxbJ3ZhbHVlJ10gaW5zdGFuY2VvZiBMb25nKVxyXG4gICAgICAgICAgICAgICAgdmFsW1widmFsdWVcIl0gPSBCeXRlQnVmZmVyLnppZ1phZ0RlY29kZTY0KHZhbFtcInZhbHVlXCJdKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdmFsID0gQnl0ZUJ1ZmZlci56aWdaYWdEZWNvZGU2NCh2YWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSAvLyBMb25nXHJcblxyXG5cclxuICAgIC8vIHR5cGVzL3N0cmluZ3MvY3N0cmluZ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgTlVMTC10ZXJtaW5hdGVkIFVURjggZW5jb2RlZCBzdHJpbmcuIEZvciB0aGlzIHRvIHdvcmsgdGhlIHNwZWNpZmllZCBzdHJpbmcgbXVzdCBub3QgY29udGFpbiBhbnkgTlVMTFxyXG4gICAgICogIGNoYXJhY3RlcnMgaXRzZWxmLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIGNvbnRhaW5lZCBpbiBgc3RyYCArIDEgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcnxudW1iZXJ9IHRoaXMgaWYgb2Zmc2V0IGlzIG9taXR0ZWQsIGVsc2UgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlblxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlQ1N0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBrID0gc3RyLmxlbmd0aDtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBzdHI6IE5vdCBhIHN0cmluZ1wiKTtcclxuICAgICAgICAgICAgZm9yIChpPTA7IGk8azsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyLmNoYXJDb2RlQXQoaSkgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgc3RyOiBDb250YWlucyBOVUxMLWNoYXJhY3RlcnNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVURjggc3RyaW5ncyBkbyBub3QgY29udGFpbiB6ZXJvIGJ5dGVzIGluIGJldHdlZW4gZXhjZXB0IGZvciB0aGUgemVybyBjaGFyYWN0ZXIsIHNvOlxyXG4gICAgICAgIGsgPSB1dGZ4LmNhbGN1bGF0ZVVURjE2YXNVVEY4KHN0cmluZ1NvdXJjZShzdHIpKVsxXTtcclxuICAgICAgICBvZmZzZXQgKz0gaysxO1xuICAgICAgICB2YXIgY2FwYWNpdHkxMiA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTEyKVxuICAgICAgICAgICAgdGhpcy5yZXNpemUoKGNhcGFjaXR5MTIgKj0gMikgPiBvZmZzZXQgPyBjYXBhY2l0eTEyIDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IGsrMTtcbiAgICAgICAgdXRmeC5lbmNvZGVVVEYxNnRvVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSwgZnVuY3Rpb24oYikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KytdID0gYjtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMudmlld1tvZmZzZXQrK10gPSAwO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgTlVMTC10ZXJtaW5hdGVkIFVURjggZW5jb2RlZCBzdHJpbmcuIEZvciB0aGlzIHRvIHdvcmsgdGhlIHN0cmluZyByZWFkIG11c3Qgbm90IGNvbnRhaW4gYW55IE5VTEwgY2hhcmFjdGVyc1xyXG4gICAgICogIGl0c2VsZi5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICByZWFkIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfCF7c3RyaW5nOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyfX0gVGhlIHN0cmluZyByZWFkIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSBzdHJpbmdcclxuICAgICAqICByZWFkIGFuZCB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyByZWFkLlxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRDU3RyaW5nID0gZnVuY3Rpb24ob2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIHJlbGF0aXZlID0gdHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmIChyZWxhdGl2ZSkgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgMSA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzErXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgICAgICB0ZW1wO1xyXG4gICAgICAgIC8vIFVURjggc3RyaW5ncyBkbyBub3QgY29udGFpbiB6ZXJvIGJ5dGVzIGluIGJldHdlZW4gZXhjZXB0IGZvciB0aGUgemVybyBjaGFyYWN0ZXIgaXRzZWxmLCBzbzpcclxuICAgICAgICB2YXIgc2QsIGIgPSAtMTtcclxuICAgICAgICB1dGZ4LmRlY29kZVVURjh0b1VURjE2KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoYiA9PT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPj0gdGhpcy5saW1pdClcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiBUcnVuY2F0ZWQgZGF0YSwgXCIrb2Zmc2V0K1wiIDwgXCIrdGhpcy5saW1pdCk7XHJcbiAgICAgICAgICAgIGIgPSB0aGlzLnZpZXdbb2Zmc2V0KytdO1xyXG4gICAgICAgICAgICByZXR1cm4gYiA9PT0gMCA/IG51bGwgOiBiO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgc2QgPSBzdHJpbmdEZXN0aW5hdGlvbigpLCB0cnVlKTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBcInN0cmluZ1wiOiBzZCgpLFxyXG4gICAgICAgICAgICAgICAgXCJsZW5ndGhcIjogb2Zmc2V0IC0gc3RhcnRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHR5cGVzL3N0cmluZ3MvaXN0cmluZ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgbGVuZ3RoIGFzIHVpbnQzMiBwcmVmaXhlZCBVVEY4IGVuY29kZWQgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIHdyaXR0ZW4gaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcnxudW1iZXJ9IGB0aGlzYCBpZiBgb2Zmc2V0YCBpcyBvbWl0dGVkLCBlbHNlIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciN3cml0ZVZhcmludDMyXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUud3JpdGVJU3RyaW5nID0gZnVuY3Rpb24oc3RyLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgc3RyOiBOb3QgYSBzdHJpbmdcIik7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgICAgIGs7XHJcbiAgICAgICAgayA9IHV0ZnguY2FsY3VsYXRlVVRGMTZhc1VURjgoc3RyaW5nU291cmNlKHN0ciksIHRoaXMubm9Bc3NlcnQpWzFdO1xyXG4gICAgICAgIG9mZnNldCArPSA0K2s7XG4gICAgICAgIHZhciBjYXBhY2l0eTEzID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCA+IGNhcGFjaXR5MTMpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkxMyAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5MTMgOiBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgLT0gNCtrO1xuICAgICAgICBpZiAodGhpcy5saXR0bGVFbmRpYW4pIHtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAoayA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAoayA+Pj4gMTYpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAoayA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAgayAgICAgICAgICYgMHhGRjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQgIF0gPSAoayA+Pj4gMjQpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMV0gPSAoayA+Pj4gMTYpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrMl0gPSAoayA+Pj4gIDgpICYgMHhGRjtcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrM10gPSAgayAgICAgICAgICYgMHhGRjtcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgKz0gNDtcclxuICAgICAgICB1dGZ4LmVuY29kZVVURjE2dG9VVEY4KHN0cmluZ1NvdXJjZShzdHIpLCBmdW5jdGlvbihiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrK10gPSBiO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gc3RhcnQgKyA0ICsgaylcclxuICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgcmFuZ2U6IFRydW5jYXRlZCBkYXRhLCBcIitvZmZzZXQrXCIgPT0gXCIrKG9mZnNldCs0K2spKTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSBsZW5ndGggYXMgdWludDMyIHByZWZpeGVkIFVURjggZW5jb2RlZCBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgcmVhZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3whe3N0cmluZzogc3RyaW5nLCBsZW5ndGg6IG51bWJlcn19IFRoZSBzdHJpbmcgcmVhZCBpZiBvZmZzZXQgaXMgb21pdHRlZCwgZWxzZSB0aGUgc3RyaW5nXHJcbiAgICAgKiAgcmVhZCBhbmQgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciNyZWFkVmFyaW50MzJcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkSVN0cmluZyA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDQgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIis0K1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5yZWFkVWludDMyKG9mZnNldCk7XHJcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMucmVhZFVURjhTdHJpbmcobGVuLCBCeXRlQnVmZmVyLk1FVFJJQ1NfQllURVMsIG9mZnNldCArPSA0KTtcclxuICAgICAgICBvZmZzZXQgKz0gc3RyWydsZW5ndGgnXTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJbJ3N0cmluZyddO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnc3RyaW5nJzogc3RyWydzdHJpbmcnXSxcclxuICAgICAgICAgICAgICAgICdsZW5ndGgnOiBvZmZzZXQgLSBzdGFydFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gdHlwZXMvc3RyaW5ncy91dGY4c3RyaW5nXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRyaWNzIHJlcHJlc2VudGluZyBudW1iZXIgb2YgVVRGOCBjaGFyYWN0ZXJzLiBFdmFsdWF0ZXMgdG8gYGNgLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBjb25zdFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLk1FVFJJQ1NfQ0hBUlMgPSAnYyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRyaWNzIHJlcHJlc2VudGluZyBudW1iZXIgb2YgYnl0ZXMuIEV2YWx1YXRlcyB0byBgYmAuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQGNvbnN0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuTUVUUklDU19CWVRFUyA9ICdiJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhbiBVVEY4IGVuY29kZWQgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gd3JpdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byB3cml0ZSB0by4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcnxudW1iZXJ9IHRoaXMgaWYgb2Zmc2V0IGlzIG9taXR0ZWQsIGVsc2UgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlbi5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVVURjhTdHJpbmcgPSBmdW5jdGlvbihzdHIsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrO1xyXG4gICAgICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgICAgICBrID0gdXRmeC5jYWxjdWxhdGVVVEYxNmFzVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSlbMV07XHJcbiAgICAgICAgb2Zmc2V0ICs9IGs7XG4gICAgICAgIHZhciBjYXBhY2l0eTE0ID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCA+IGNhcGFjaXR5MTQpXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgoY2FwYWNpdHkxNCAqPSAyKSA+IG9mZnNldCA/IGNhcGFjaXR5MTQgOiBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgLT0gaztcbiAgICAgICAgdXRmeC5lbmNvZGVVVEYxNnRvVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSwgZnVuY3Rpb24oYikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdbb2Zmc2V0KytdID0gYjtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgYW4gVVRGOCBlbmNvZGVkIHN0cmluZy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciN3cml0ZVVURjhTdHJpbmd9LlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfG51bWJlcn0gdGhpcyBpZiBvZmZzZXQgaXMgb21pdHRlZCwgZWxzZSB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyB3cml0dGVuLlxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLndyaXRlU3RyaW5nID0gQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVVURjhTdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgVVRGOCBjaGFyYWN0ZXJzIG9mIGEgc3RyaW5nLiBKYXZhU2NyaXB0IGl0c2VsZiB1c2VzIFVURi0xNiwgc28gdGhhdCBhIHN0cmluZydzXHJcbiAgICAgKiAgYGxlbmd0aGAgcHJvcGVydHkgZG9lcyBub3QgcmVmbGVjdCBpdHMgYWN0dWFsIFVURjggc2l6ZSBpZiBpdCBjb250YWlucyBjb2RlIHBvaW50cyBsYXJnZXIgdGhhbiAweEZGRkYuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjYWxjdWxhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBVVEY4IGNoYXJhY3RlcnNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5jYWxjdWxhdGVVVEY4Q2hhcnMgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICByZXR1cm4gdXRmeC5jYWxjdWxhdGVVVEYxNmFzVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSlbMF07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIFVURjggYnl0ZXMgb2YgYSBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjYWxjdWxhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBVVEY4IGJ5dGVzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuY2FsY3VsYXRlVVRGOEJ5dGVzID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0ZnguY2FsY3VsYXRlVVRGMTZhc1VURjgoc3RyaW5nU291cmNlKHN0cikpWzFdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBVVEY4IGJ5dGVzIG9mIGEgc3RyaW5nLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyLmNhbGN1bGF0ZVVURjhCeXRlc30uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGNhbGN1bGF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gTnVtYmVyIG9mIFVURjggYnl0ZXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5jYWxjdWxhdGVTdHJpbmcgPSBCeXRlQnVmZmVyLmNhbGN1bGF0ZVVURjhCeXRlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIFVURjggZW5jb2RlZCBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIE51bWJlciBvZiBjaGFyYWN0ZXJzIG9yIGJ5dGVzIHRvIHJlYWQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IG1ldHJpY3MgTWV0cmljcyBzcGVjaWZ5aW5nIHdoYXQgYGxlbmd0aGAgaXMgbWVhbnQgdG8gY291bnQuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuTUVUUklDU19DSEFSU30uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcmVhZCBmcm9tLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgcmVhZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3whe3N0cmluZzogc3RyaW5nLCBsZW5ndGg6IG51bWJlcn19IFRoZSBzdHJpbmcgcmVhZCBpZiBvZmZzZXQgaXMgb21pdHRlZCwgZWxzZSB0aGUgc3RyaW5nXHJcbiAgICAgKiAgcmVhZCBhbmQgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC5cclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5yZWFkVVRGOFN0cmluZyA9IGZ1bmN0aW9uKGxlbmd0aCwgbWV0cmljcywgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRyaWNzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBtZXRyaWNzO1xyXG4gICAgICAgICAgICBtZXRyaWNzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRyaWNzID09PSAndW5kZWZpbmVkJykgbWV0cmljcyA9IEJ5dGVCdWZmZXIuTUVUUklDU19DSEFSUztcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsZW5ndGggIT09ICdudW1iZXInIHx8IGxlbmd0aCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBsZW5ndGg6IFwiK2xlbmd0aCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgbGVuZ3RoIHw9IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgMCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiAwIDw9IFwiK29mZnNldCtcIiAoK1wiKzArXCIpIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICBzdGFydCA9IG9mZnNldCxcclxuICAgICAgICAgICAgc2Q7XHJcbiAgICAgICAgaWYgKG1ldHJpY3MgPT09IEJ5dGVCdWZmZXIuTUVUUklDU19DSEFSUykgeyAvLyBUaGUgc2FtZSBmb3Igbm9kZSBhbmQgdGhlIGJyb3dzZXJcclxuICAgICAgICAgICAgc2QgPSBzdHJpbmdEZXN0aW5hdGlvbigpO1xyXG4gICAgICAgICAgICB1dGZ4LmRlY29kZVVURjgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA8IGxlbmd0aCAmJiBvZmZzZXQgPCB0aGlzLmxpbWl0ID8gdGhpcy52aWV3W29mZnNldCsrXSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24oY3ApIHtcclxuICAgICAgICAgICAgICAgICsraTsgdXRmeC5VVEY4dG9VVEYxNihjcCwgc2QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGkgIT09IGxlbmd0aClcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiBUcnVuY2F0ZWQgZGF0YSwgXCIraStcIiA9PSBcIitsZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCI6IHNkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZW5ndGhcIjogb2Zmc2V0IC0gc3RhcnRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG1ldHJpY3MgPT09IEJ5dGVCdWZmZXIuTUVUUklDU19CWVRFUykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogXCIrb2Zmc2V0K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyBsZW5ndGggPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrbGVuZ3RoK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGsgPSBvZmZzZXQgKyBsZW5ndGg7XHJcbiAgICAgICAgICAgIHV0ZnguZGVjb2RlVVRGOHRvVVRGMTYoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0IDwgayA/IHRoaXMudmlld1tvZmZzZXQrK10gOiBudWxsO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHNkID0gc3RyaW5nRGVzdGluYXRpb24oKSwgdGhpcy5ub0Fzc2VydCk7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGspXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCByYW5nZTogVHJ1bmNhdGVkIGRhdGEsIFwiK29mZnNldCtcIiA9PSBcIitrKTtcclxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAnc3RyaW5nJzogc2QoKSxcclxuICAgICAgICAgICAgICAgICAgICAnbGVuZ3RoJzogb2Zmc2V0IC0gc3RhcnRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVW5zdXBwb3J0ZWQgbWV0cmljczogXCIrbWV0cmljcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gVVRGOCBlbmNvZGVkIHN0cmluZy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgQnl0ZUJ1ZmZlciNyZWFkVVRGOFN0cmluZ30uXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggTnVtYmVyIG9mIGNoYXJhY3RlcnMgb3IgYnl0ZXMgdG8gcmVhZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBtZXRyaWNzIE1ldHJpY3Mgc3BlY2lmeWluZyB3aGF0IGBuYCBpcyBtZWFudCB0byBjb3VudC4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5NRVRSSUNTX0NIQVJTfS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byByZWFkIGZyb20uIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICByZWFkIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfCF7c3RyaW5nOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyfX0gVGhlIHN0cmluZyByZWFkIGlmIG9mZnNldCBpcyBvbWl0dGVkLCBlbHNlIHRoZSBzdHJpbmdcclxuICAgICAqICByZWFkIGFuZCB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyByZWFkLlxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRTdHJpbmcgPSBCeXRlQnVmZmVyUHJvdG90eXBlLnJlYWRVVEY4U3RyaW5nO1xyXG5cclxuICAgIC8vIHR5cGVzL3N0cmluZ3MvdnN0cmluZ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgbGVuZ3RoIGFzIHZhcmludDMyIHByZWZpeGVkIFVURjggZW5jb2RlZCBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byB3cml0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHdyaXRlIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgd3JpdHRlbiBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfG51bWJlcn0gYHRoaXNgIGlmIGBvZmZzZXRgIGlzIG9taXR0ZWQsIGVsc2UgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlblxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICogQHNlZSBCeXRlQnVmZmVyI3dyaXRlVmFyaW50MzJcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS53cml0ZVZTdHJpbmcgPSBmdW5jdGlvbihzdHIsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBzdHI6IE5vdCBhIHN0cmluZ1wiKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFydCA9IG9mZnNldCxcclxuICAgICAgICAgICAgaywgbDtcclxuICAgICAgICBrID0gdXRmeC5jYWxjdWxhdGVVVEYxNmFzVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSwgdGhpcy5ub0Fzc2VydClbMV07XHJcbiAgICAgICAgbCA9IEJ5dGVCdWZmZXIuY2FsY3VsYXRlVmFyaW50MzIoayk7XHJcbiAgICAgICAgb2Zmc2V0ICs9IGwraztcbiAgICAgICAgdmFyIGNhcGFjaXR5MTUgPSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob2Zmc2V0ID4gY2FwYWNpdHkxNSlcbiAgICAgICAgICAgIHRoaXMucmVzaXplKChjYXBhY2l0eTE1ICo9IDIpID4gb2Zmc2V0ID8gY2FwYWNpdHkxNSA6IG9mZnNldCk7XG4gICAgICAgIG9mZnNldCAtPSBsK2s7XG4gICAgICAgIG9mZnNldCArPSB0aGlzLndyaXRlVmFyaW50MzIoaywgb2Zmc2V0KTtcclxuICAgICAgICB1dGZ4LmVuY29kZVVURjE2dG9VVEY4KHN0cmluZ1NvdXJjZShzdHIpLCBmdW5jdGlvbihiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1tvZmZzZXQrK10gPSBiO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gc3RhcnQraytsKVxyXG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCByYW5nZTogVHJ1bmNhdGVkIGRhdGEsIFwiK29mZnNldCtcIiA9PSBcIisob2Zmc2V0K2srbCkpO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIGxlbmd0aCBhcyB2YXJpbnQzMiBwcmVmaXhlZCBVVEY4IGVuY29kZWQgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHJlYWQgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIHJlYWQgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8IXtzdHJpbmc6IHN0cmluZywgbGVuZ3RoOiBudW1iZXJ9fSBUaGUgc3RyaW5nIHJlYWQgaWYgb2Zmc2V0IGlzIG9taXR0ZWQsIGVsc2UgdGhlIHN0cmluZ1xyXG4gICAgICogIHJlYWQgYW5kIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHJlYWQuXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKiBAc2VlIEJ5dGVCdWZmZXIjcmVhZFZhcmludDMyXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVhZFZTdHJpbmcgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgaWYgKHJlbGF0aXZlKSBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAxID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMStcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMucmVhZFZhcmludDMyKG9mZnNldCk7XHJcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMucmVhZFVURjhTdHJpbmcobGVuWyd2YWx1ZSddLCBCeXRlQnVmZmVyLk1FVFJJQ1NfQllURVMsIG9mZnNldCArPSBsZW5bJ2xlbmd0aCddKTtcclxuICAgICAgICBvZmZzZXQgKz0gc3RyWydsZW5ndGgnXTtcclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJbJ3N0cmluZyddO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnc3RyaW5nJzogc3RyWydzdHJpbmcnXSxcclxuICAgICAgICAgICAgICAgICdsZW5ndGgnOiBvZmZzZXQgLSBzdGFydFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kcyBzb21lIGRhdGEgdG8gdGhpcyBCeXRlQnVmZmVyLiBUaGlzIHdpbGwgb3ZlcndyaXRlIGFueSBjb250ZW50cyBiZWhpbmQgdGhlIHNwZWNpZmllZCBvZmZzZXQgdXAgdG8gdGhlIGFwcGVuZGVkXHJcbiAgICAgKiAgZGF0YSdzIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7IUJ5dGVCdWZmZXJ8IUFycmF5QnVmZmVyfCFVaW50OEFycmF5fHN0cmluZ30gc291cmNlIERhdGEgdG8gYXBwZW5kLiBJZiBgc291cmNlYCBpcyBhIEJ5dGVCdWZmZXIsIGl0cyBvZmZzZXRzXHJcbiAgICAgKiAgd2lsbCBiZSBtb2RpZmllZCBhY2NvcmRpbmcgdG8gdGhlIHBlcmZvcm1lZCByZWFkIG9wZXJhdGlvbi5cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpPX0gZW5jb2RpbmcgRW5jb2RpbmcgaWYgYGRhdGFgIGlzIGEgc3RyaW5nIChcImJhc2U2NFwiLCBcImhleFwiLCBcImJpbmFyeVwiLCBkZWZhdWx0cyB0byBcInV0ZjhcIilcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byBhcHBlbmQgYXQuIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICB3cml0dGVuIGlmIG9taXR0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBleGFtcGxlIEEgcmVsYXRpdmUgYDwwMSAwMj4wMy5hcHBlbmQoPDA0IDA1PilgIHdpbGwgcmVzdWx0IGluIGA8MDEgMDIgMDQgMDU+LCAwNCAwNXxgXHJcbiAgICAgKiBAZXhhbXBsZSBBbiBhYnNvbHV0ZSBgPDAxIDAyPjAzLmFwcGVuZCgwNCAwNT4sIDEpYCB3aWxsIHJlc3VsdCBpbiBgPDAxIDA0PjA1LCAwNCAwNXxgXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oc291cmNlLCBlbmNvZGluZywgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGluZztcclxuICAgICAgICAgICAgZW5jb2RpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIEJ5dGVCdWZmZXIpKVxyXG4gICAgICAgICAgICBzb3VyY2UgPSBCeXRlQnVmZmVyLndyYXAoc291cmNlLCBlbmNvZGluZyk7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHNvdXJjZS5saW1pdCAtIHNvdXJjZS5vZmZzZXQ7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA8PSAwKSByZXR1cm4gdGhpczsgLy8gTm90aGluZyB0byBhcHBlbmRcclxuICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICB2YXIgY2FwYWNpdHkxNiA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvZmZzZXQgPiBjYXBhY2l0eTE2KVxuICAgICAgICAgICAgdGhpcy5yZXNpemUoKGNhcGFjaXR5MTYgKj0gMikgPiBvZmZzZXQgPyBjYXBhY2l0eTE2IDogb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0IC09IGxlbmd0aDtcbiAgICAgICAgdGhpcy52aWV3LnNldChzb3VyY2Uudmlldy5zdWJhcnJheShzb3VyY2Uub2Zmc2V0LCBzb3VyY2UubGltaXQpLCBvZmZzZXQpO1xyXG4gICAgICAgIHNvdXJjZS5vZmZzZXQgKz0gbGVuZ3RoO1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZSkgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmRzIHRoaXMgQnl0ZUJ1ZmZlcidzIGNvbnRlbnRzIHRvIGFub3RoZXIgQnl0ZUJ1ZmZlci4gVGhpcyB3aWxsIG92ZXJ3cml0ZSBhbnkgY29udGVudHMgYXQgYW5kIGFmdGVyIHRoZVxyXG4gICAgICAgIHNwZWNpZmllZCBvZmZzZXQgdXAgdG8gdGhlIGxlbmd0aCBvZiB0aGlzIEJ5dGVCdWZmZXIncyBkYXRhLlxyXG4gICAgICogQHBhcmFtIHshQnl0ZUJ1ZmZlcn0gdGFyZ2V0IFRhcmdldCBCeXRlQnVmZmVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gYXBwZW5kIHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2Uge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzXHJcbiAgICAgKiAgcmVhZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKiBAc2VlIEJ5dGVCdWZmZXIjYXBwZW5kXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuYXBwZW5kVG8gPSBmdW5jdGlvbih0YXJnZXQsIG9mZnNldCkge1xyXG4gICAgICAgIHRhcmdldC5hcHBlbmQodGhpcywgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIGFzc2VydGlvbnMgb2YgYXJndW1lbnQgdHlwZXMgYW5kIG9mZnNldHMuIEFzc2VydGlvbnMgYXJlIGVuYWJsZWQgYnkgZGVmYXVsdCBidXQgeW91IGNhbiBvcHQgdG9cclxuICAgICAqICBkaXNhYmxlIHRoZW0gaWYgeW91ciBjb2RlIGFscmVhZHkgbWFrZXMgc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgdmFsaWQuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFzc2VydCBgdHJ1ZWAgdG8gZW5hYmxlIGFzc2VydGlvbnMsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5hc3NlcnQgPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICAgICAgICB0aGlzLm5vQXNzZXJ0ID0gIWFzc2VydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjYXBhY2l0eSBvZiB0aGlzIEJ5dGVCdWZmZXIncyBiYWNraW5nIGJ1ZmZlci5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IENhcGFjaXR5IG9mIHRoZSBiYWNraW5nIGJ1ZmZlclxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLmNhcGFjaXR5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhpcyBCeXRlQnVmZmVyJ3Mgb2Zmc2V0cyBieSBzZXR0aW5nIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gdG8gYDBgIGFuZCB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0gdG8gdGhlXHJcbiAgICAgKiAgYmFja2luZyBidWZmZXIncyBjYXBhY2l0eS4gRGlzY2FyZHMge0BsaW5rIEJ5dGVCdWZmZXIjbWFya2VkT2Zmc2V0fS5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubGltaXQgPSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubWFya2VkT2Zmc2V0ID0gLTE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNsb25lZCBpbnN0YW5jZSBvZiB0aGlzIEJ5dGVCdWZmZXIsIHByZXNldCB3aXRoIHRoaXMgQnl0ZUJ1ZmZlcidzIHZhbHVlcyBmb3Ige0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSxcclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlciNtYXJrZWRPZmZzZXR9IGFuZCB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBjb3B5IFdoZXRoZXIgdG8gY29weSB0aGUgYmFja2luZyBidWZmZXIgb3IgdG8gcmV0dXJuIGFub3RoZXIgdmlldyBvbiB0aGUgc2FtZSwgZGVmYXVsdHMgdG8gYGZhbHNlYFxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSBDbG9uZWQgaW5zdGFuY2VcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKGNvcHkpIHtcclxuICAgICAgICB2YXIgYmIgPSBuZXcgQnl0ZUJ1ZmZlcigwLCB0aGlzLmxpdHRsZUVuZGlhbiwgdGhpcy5ub0Fzc2VydCk7XHJcbiAgICAgICAgaWYgKGNvcHkpIHtcclxuICAgICAgICAgICAgYmIuYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICBiYi52aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYmIuYnVmZmVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYi5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcclxuICAgICAgICAgICAgYmIudmlldyA9IHRoaXMudmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgYmIub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgYmIubWFya2VkT2Zmc2V0ID0gdGhpcy5tYXJrZWRPZmZzZXQ7XHJcbiAgICAgICAgYmIubGltaXQgPSB0aGlzLmxpbWl0O1xyXG4gICAgICAgIHJldHVybiBiYjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYWN0cyB0aGlzIEJ5dGVCdWZmZXIgdG8gYmUgYmFja2VkIGJ5IGEge0BsaW5rIEJ5dGVCdWZmZXIjYnVmZmVyfSBvZiBpdHMgY29udGVudHMnIGxlbmd0aC4gQ29udGVudHMgYXJlIHRoZSBieXRlc1xyXG4gICAgICogIGJldHdlZW4ge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBhbmQge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LiBXaWxsIHNldCBgb2Zmc2V0ID0gMGAgYW5kIGBsaW1pdCA9IGNhcGFjaXR5YCBhbmRcclxuICAgICAqICBhZGFwdCB7QGxpbmsgQnl0ZUJ1ZmZlciNtYXJrZWRPZmZzZXR9IHRvIHRoZSBzYW1lIHJlbGF0aXZlIHBvc2l0aW9uIGlmIHNldC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gT2Zmc2V0IHRvIHN0YXJ0IGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGVuZCBPZmZzZXQgdG8gZW5kIGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH1cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLmNvbXBhY3QgPSBmdW5jdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiZWdpbiA9PT0gJ3VuZGVmaW5lZCcpIGJlZ2luID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICd1bmRlZmluZWQnKSBlbmQgPSB0aGlzLmxpbWl0O1xyXG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJlZ2luICE9PSAnbnVtYmVyJyB8fCBiZWdpbiAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBiZWdpbjogTm90IGFuIGludGVnZXJcIik7XG4gICAgICAgICAgICBiZWdpbiA+Pj49IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVuZCAhPT0gJ251bWJlcicgfHwgZW5kICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGVuZDogTm90IGFuIGludGVnZXJcIik7XG4gICAgICAgICAgICBlbmQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKGJlZ2luIDwgMCB8fCBiZWdpbiA+IGVuZCB8fCBlbmQgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiAwIDw9IFwiK2JlZ2luK1wiIDw9IFwiK2VuZCtcIiA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZWdpbiA9PT0gMCAmJiBlbmQgPT09IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzOyAvLyBBbHJlYWR5IGNvbXBhY3RlZFxyXG4gICAgICAgIHZhciBsZW4gPSBlbmQgLSBiZWdpbjtcclxuICAgICAgICBpZiAobGVuID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gRU1QVFlfQlVGRkVSO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXJrZWRPZmZzZXQgPj0gMCkgdGhpcy5tYXJrZWRPZmZzZXQgLT0gYmVnaW47XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5saW1pdCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGxlbik7XHJcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG4gICAgICAgIHZpZXcuc2V0KHRoaXMudmlldy5zdWJhcnJheShiZWdpbiwgZW5kKSk7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuICAgICAgICBpZiAodGhpcy5tYXJrZWRPZmZzZXQgPj0gMCkgdGhpcy5tYXJrZWRPZmZzZXQgLT0gYmVnaW47XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubGltaXQgPSBsZW47XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMuIENvbnRlbnRzIGFyZSB0aGUgYnl0ZXMgYmV0d2VlbiB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGFuZFxyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyI2xpbWl0fS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gQmVnaW4gb2Zmc2V0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBlbmQgRW5kIG9mZnNldCwgZGVmYXVsdHMgdG8ge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSBDb3B5XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKGJlZ2luLCBlbmQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGJlZ2luID09PSAndW5kZWZpbmVkJykgYmVnaW4gPSB0aGlzLm9mZnNldDtcclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3VuZGVmaW5lZCcpIGVuZCA9IHRoaXMubGltaXQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gIT09ICdudW1iZXInIHx8IGJlZ2luICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGJlZ2luOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGJlZ2luID4+Pj0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kICE9PSAnbnVtYmVyJyB8fCBlbmQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgZW5kOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGVuZCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAoYmVnaW4gPCAwIHx8IGJlZ2luID4gZW5kIHx8IGVuZCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgcmFuZ2U6IDAgPD0gXCIrYmVnaW4rXCIgPD0gXCIrZW5kK1wiIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlZ2luID09PSBlbmQpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnl0ZUJ1ZmZlcigwLCB0aGlzLmxpdHRsZUVuZGlhbiwgdGhpcy5ub0Fzc2VydCk7XHJcbiAgICAgICAgdmFyIGNhcGFjaXR5ID0gZW5kIC0gYmVnaW4sXHJcbiAgICAgICAgICAgIGJiID0gbmV3IEJ5dGVCdWZmZXIoY2FwYWNpdHksIHRoaXMubGl0dGxlRW5kaWFuLCB0aGlzLm5vQXNzZXJ0KTtcclxuICAgICAgICBiYi5vZmZzZXQgPSAwO1xyXG4gICAgICAgIGJiLmxpbWl0ID0gY2FwYWNpdHk7XHJcbiAgICAgICAgaWYgKGJiLm1hcmtlZE9mZnNldCA+PSAwKSBiYi5tYXJrZWRPZmZzZXQgLT0gYmVnaW47XHJcbiAgICAgICAgdGhpcy5jb3B5VG8oYmIsIDAsIGJlZ2luLCBlbmQpO1xyXG4gICAgICAgIHJldHVybiBiYjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3BpZXMgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMgdG8gYW5vdGhlciBCeXRlQnVmZmVyLiBDb250ZW50cyBhcmUgdGhlIGJ5dGVzIGJldHdlZW4ge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBhbmRcclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0uXHJcbiAgICAgKiBAcGFyYW0geyFCeXRlQnVmZmVyfSB0YXJnZXQgVGFyZ2V0IEJ5dGVCdWZmZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gdGFyZ2V0T2Zmc2V0IE9mZnNldCB0byBjb3B5IHRvLiBXaWxsIHVzZSBhbmQgaW5jcmVhc2UgdGhlIHRhcmdldCdzIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH1cclxuICAgICAqICBieSB0aGUgbnVtYmVyIG9mIGJ5dGVzIGNvcGllZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBzb3VyY2VPZmZzZXQgT2Zmc2V0IHRvIHN0YXJ0IGNvcHlpbmcgZnJvbS4gV2lsbCB1c2UgYW5kIGluY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlXHJcbiAgICAgKiAgbnVtYmVyIG9mIGJ5dGVzIGNvcGllZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBzb3VyY2VMaW1pdCBPZmZzZXQgdG8gZW5kIGNvcHlpbmcgZnJvbSwgZGVmYXVsdHMgdG8ge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9XHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbih0YXJnZXQsIHRhcmdldE9mZnNldCwgc291cmNlT2Zmc2V0LCBzb3VyY2VMaW1pdCkge1xyXG4gICAgICAgIHZhciByZWxhdGl2ZSxcclxuICAgICAgICAgICAgdGFyZ2V0UmVsYXRpdmU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICghQnl0ZUJ1ZmZlci5pc0J5dGVCdWZmZXIodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgdGFyZ2V0OiBOb3QgYSBCeXRlQnVmZmVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRPZmZzZXQgPSAodGFyZ2V0UmVsYXRpdmUgPSB0eXBlb2YgdGFyZ2V0T2Zmc2V0ID09PSAndW5kZWZpbmVkJykgPyB0YXJnZXQub2Zmc2V0IDogdGFyZ2V0T2Zmc2V0IHwgMDtcclxuICAgICAgICBzb3VyY2VPZmZzZXQgPSAocmVsYXRpdmUgPSB0eXBlb2Ygc291cmNlT2Zmc2V0ID09PSAndW5kZWZpbmVkJykgPyB0aGlzLm9mZnNldCA6IHNvdXJjZU9mZnNldCB8IDA7XHJcbiAgICAgICAgc291cmNlTGltaXQgPSB0eXBlb2Ygc291cmNlTGltaXQgPT09ICd1bmRlZmluZWQnID8gdGhpcy5saW1pdCA6IHNvdXJjZUxpbWl0IHwgMDtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldE9mZnNldCA8IDAgfHwgdGFyZ2V0T2Zmc2V0ID4gdGFyZ2V0LmJ1ZmZlci5ieXRlTGVuZ3RoKVxyXG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCB0YXJnZXQgcmFuZ2U6IDAgPD0gXCIrdGFyZ2V0T2Zmc2V0K1wiIDw9IFwiK3RhcmdldC5idWZmZXIuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHNvdXJjZU9mZnNldCA8IDAgfHwgc291cmNlTGltaXQgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxyXG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBzb3VyY2UgcmFuZ2U6IDAgPD0gXCIrc291cmNlT2Zmc2V0K1wiIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICB2YXIgbGVuID0gc291cmNlTGltaXQgLSBzb3VyY2VPZmZzZXQ7XHJcbiAgICAgICAgaWYgKGxlbiA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDsgLy8gTm90aGluZyB0byBjb3B5XHJcblxyXG4gICAgICAgIHRhcmdldC5lbnN1cmVDYXBhY2l0eSh0YXJnZXRPZmZzZXQgKyBsZW4pO1xyXG5cclxuICAgICAgICB0YXJnZXQudmlldy5zZXQodGhpcy52aWV3LnN1YmFycmF5KHNvdXJjZU9mZnNldCwgc291cmNlTGltaXQpLCB0YXJnZXRPZmZzZXQpO1xyXG5cclxuICAgICAgICBpZiAocmVsYXRpdmUpIHRoaXMub2Zmc2V0ICs9IGxlbjtcclxuICAgICAgICBpZiAodGFyZ2V0UmVsYXRpdmUpIHRhcmdldC5vZmZzZXQgKz0gbGVuO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlcyBzdXJlIHRoYXQgdGhpcyBCeXRlQnVmZmVyIGlzIGJhY2tlZCBieSBhIHtAbGluayBCeXRlQnVmZmVyI2J1ZmZlcn0gb2YgYXQgbGVhc3QgdGhlIHNwZWNpZmllZCBjYXBhY2l0eS4gSWYgdGhlXHJcbiAgICAgKiAgY3VycmVudCBjYXBhY2l0eSBpcyBleGNlZWRlZCwgaXQgd2lsbCBiZSBkb3VibGVkLiBJZiBkb3VibGUgdGhlIGN1cnJlbnQgY2FwYWNpdHkgaXMgbGVzcyB0aGFuIHRoZSByZXF1aXJlZCBjYXBhY2l0eSxcclxuICAgICAqICB0aGUgcmVxdWlyZWQgY2FwYWNpdHkgd2lsbCBiZSB1c2VkIGluc3RlYWQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2FwYWNpdHkgUmVxdWlyZWQgY2FwYWNpdHlcclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLmVuc3VyZUNhcGFjaXR5ID0gZnVuY3Rpb24oY2FwYWNpdHkpIHtcclxuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPCBjYXBhY2l0eSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzaXplKChjdXJyZW50ICo9IDIpID4gY2FwYWNpdHkgPyBjdXJyZW50IDogY2FwYWNpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE92ZXJ3cml0ZXMgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMgd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlLiBDb250ZW50cyBhcmUgdGhlIGJ5dGVzIGJldHdlZW5cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGFuZCB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIEJ5dGUgdmFsdWUgdG8gZmlsbCB3aXRoLiBJZiBnaXZlbiBhcyBhIHN0cmluZywgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyB1c2VkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBiZWdpbiBCZWdpbiBvZmZzZXQuIFdpbGwgdXNlIGFuZCBpbmNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICB3cml0dGVuIGlmIG9taXR0ZWQuIGRlZmF1bHRzIHRvIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGVuZCBFbmQgb2Zmc2V0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0uXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBleGFtcGxlIGBzb21lQnl0ZUJ1ZmZlci5jbGVhcigpLmZpbGwoMClgIGZpbGxzIHRoZSBlbnRpcmUgYmFja2luZyBidWZmZXIgd2l0aCB6ZXJvZXNcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24odmFsdWUsIGJlZ2luLCBlbmQpIHtcclxuICAgICAgICB2YXIgcmVsYXRpdmUgPSB0eXBlb2YgYmVnaW4gPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIGJlZ2luID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAodHlwZW9mIGJlZ2luID09PSAndW5kZWZpbmVkJykgYmVnaW4gPSB0aGlzLm9mZnNldDtcclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3VuZGVmaW5lZCcpIGVuZCA9IHRoaXMubGltaXQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHZhbHVlOiBcIit2YWx1ZStcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgdmFsdWUgfD0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gIT09ICdudW1iZXInIHx8IGJlZ2luICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGJlZ2luOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGJlZ2luID4+Pj0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kICE9PSAnbnVtYmVyJyB8fCBlbmQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgZW5kOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGVuZCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAoYmVnaW4gPCAwIHx8IGJlZ2luID4gZW5kIHx8IGVuZCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgcmFuZ2U6IDAgPD0gXCIrYmVnaW4rXCIgPD0gXCIrZW5kK1wiIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlZ2luID49IGVuZClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7IC8vIE5vdGhpbmcgdG8gZmlsbFxyXG4gICAgICAgIHdoaWxlIChiZWdpbiA8IGVuZCkgdGhpcy52aWV3W2JlZ2luKytdID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHJlbGF0aXZlKSB0aGlzLm9mZnNldCA9IGJlZ2luO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ha2VzIHRoaXMgQnl0ZUJ1ZmZlciByZWFkeSBmb3IgYSBuZXcgc2VxdWVuY2Ugb2Ygd3JpdGUgb3IgcmVsYXRpdmUgcmVhZCBvcGVyYXRpb25zLiBTZXRzIGBsaW1pdCA9IG9mZnNldGAgYW5kXHJcbiAgICAgKiAgYG9mZnNldCA9IDBgLiBNYWtlIHN1cmUgYWx3YXlzIHRvIGZsaXAgYSBCeXRlQnVmZmVyIHdoZW4gYWxsIHJlbGF0aXZlIHJlYWQgb3Igd3JpdGUgb3BlcmF0aW9ucyBhcmUgY29tcGxldGUuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5mbGlwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saW1pdCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIE1hcmtzIGFuIG9mZnNldCBvbiB0aGlzIEJ5dGVCdWZmZXIgdG8gYmUgdXNlZCBsYXRlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0IE9mZnNldCB0byBtYXJrLiBEZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9LlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGBvZmZzZXRgIGlzIG5vdCBhIHZhbGlkIG51bWJlclxyXG4gICAgICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYG9mZnNldGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQHNlZSBCeXRlQnVmZmVyI3Jlc2V0XHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUubWFyayA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnID8gdGhpcy5vZmZzZXQgOiBvZmZzZXQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgb2Zmc2V0OiBcIitvZmZzZXQrXCIgKG5vdCBhbiBpbnRlZ2VyKVwiKTtcbiAgICAgICAgICAgIG9mZnNldCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAwID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IDAgPD0gXCIrb2Zmc2V0K1wiICgrXCIrMCtcIikgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcmtlZE9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJ5dGUgb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxpdHRsZUVuZGlhbiBgdHJ1ZWAgZm9yIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlciwgYGZhbHNlYCBmb3IgYmlnIGVuZGlhblxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUub3JkZXIgPSBmdW5jdGlvbihsaXR0bGVFbmRpYW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXR0bGVFbmRpYW4gIT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgbGl0dGxlRW5kaWFuOiBOb3QgYSBib29sZWFuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpdHRsZUVuZGlhbiA9ICEhbGl0dGxlRW5kaWFuO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN3aXRjaGVzICh0bykgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbGl0dGxlRW5kaWFuIERlZmF1bHRzIHRvIGB0cnVlYCwgb3RoZXJ3aXNlIHVzZXMgYmlnIGVuZGlhblxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuTEUgPSBmdW5jdGlvbihsaXR0bGVFbmRpYW4pIHtcclxuICAgICAgICB0aGlzLmxpdHRsZUVuZGlhbiA9IHR5cGVvZiBsaXR0bGVFbmRpYW4gIT09ICd1bmRlZmluZWQnID8gISFsaXR0bGVFbmRpYW4gOiB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN3aXRjaGVzICh0bykgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gYmlnRW5kaWFuIERlZmF1bHRzIHRvIGB0cnVlYCwgb3RoZXJ3aXNlIHVzZXMgbGl0dGxlIGVuZGlhblxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuQkUgPSBmdW5jdGlvbihiaWdFbmRpYW4pIHtcclxuICAgICAgICB0aGlzLmxpdHRsZUVuZGlhbiA9IHR5cGVvZiBiaWdFbmRpYW4gIT09ICd1bmRlZmluZWQnID8gIWJpZ0VuZGlhbiA6IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUHJlcGVuZHMgc29tZSBkYXRhIHRvIHRoaXMgQnl0ZUJ1ZmZlci4gVGhpcyB3aWxsIG92ZXJ3cml0ZSBhbnkgY29udGVudHMgYmVmb3JlIHRoZSBzcGVjaWZpZWQgb2Zmc2V0IHVwIHRvIHRoZVxyXG4gICAgICogIHByZXBlbmRlZCBkYXRhJ3MgbGVuZ3RoLiBJZiB0aGVyZSBpcyBub3QgZW5vdWdoIHNwYWNlIGF2YWlsYWJsZSBiZWZvcmUgdGhlIHNwZWNpZmllZCBgb2Zmc2V0YCwgdGhlIGJhY2tpbmcgYnVmZmVyXHJcbiAgICAgKiAgd2lsbCBiZSByZXNpemVkIGFuZCBpdHMgY29udGVudHMgbW92ZWQgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAcGFyYW0geyFCeXRlQnVmZmVyfHN0cmluZ3whQXJyYXlCdWZmZXJ9IHNvdXJjZSBEYXRhIHRvIHByZXBlbmQuIElmIGBzb3VyY2VgIGlzIGEgQnl0ZUJ1ZmZlciwgaXRzIG9mZnNldCB3aWxsIGJlXHJcbiAgICAgKiAgbW9kaWZpZWQgYWNjb3JkaW5nIHRvIHRoZSBwZXJmb3JtZWQgcmVhZCBvcGVyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyKT19IGVuY29kaW5nIEVuY29kaW5nIGlmIGBkYXRhYCBpcyBhIHN0cmluZyAoXCJiYXNlNjRcIiwgXCJoZXhcIiwgXCJiaW5hcnlcIiwgZGVmYXVsdHMgdG8gXCJ1dGY4XCIpXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9mZnNldCBPZmZzZXQgdG8gcHJlcGVuZCBhdC4gV2lsbCB1c2UgYW5kIGRlY3JlYXNlIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYnkgdGhlIG51bWJlciBvZiBieXRlc1xyXG4gICAgICogIHByZXBlbmRlZCBpZiBvbWl0dGVkLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKiBAZXhhbXBsZSBBIHJlbGF0aXZlIGAwMDwwMSAwMiAwMz4ucHJlcGVuZCg8MDQgMDU+KWAgcmVzdWx0cyBpbiBgPDA0IDA1IDAxIDAyIDAzPiwgMDQgMDV8YFxyXG4gICAgICogQGV4YW1wbGUgQW4gYWJzb2x1dGUgYDAwPDAxIDAyIDAzPi5wcmVwZW5kKDwwNCAwNT4sIDIpYCByZXN1bHRzIGluIGAwNDwwNSAwMiAwMz4sIDA0IDA1fGBcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24oc291cmNlLCBlbmNvZGluZywgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGluZztcclxuICAgICAgICAgICAgZW5jb2RpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZWxhdGl2ZSA9IHR5cGVvZiBvZmZzZXQgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICBpZiAocmVsYXRpdmUpIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInIHx8IG9mZnNldCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBvZmZzZXQ6IFwiK29mZnNldCtcIiAobm90IGFuIGludGVnZXIpXCIpO1xuICAgICAgICAgICAgb2Zmc2V0ID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDAgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogMCA8PSBcIitvZmZzZXQrXCIgKCtcIiswK1wiKSA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIEJ5dGVCdWZmZXIpKVxyXG4gICAgICAgICAgICBzb3VyY2UgPSBCeXRlQnVmZmVyLndyYXAoc291cmNlLCBlbmNvZGluZyk7XHJcbiAgICAgICAgdmFyIGxlbiA9IHNvdXJjZS5saW1pdCAtIHNvdXJjZS5vZmZzZXQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSByZXR1cm4gdGhpczsgLy8gTm90aGluZyB0byBwcmVwZW5kXHJcbiAgICAgICAgdmFyIGRpZmYgPSBsZW4gLSBvZmZzZXQ7XHJcbiAgICAgICAgaWYgKGRpZmYgPiAwKSB7IC8vIE5vdCBlbm91Z2ggc3BhY2UgYmVmb3JlIG9mZnNldCwgc28gcmVzaXplICsgbW92ZVxyXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggKyBkaWZmKTtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG4gICAgICAgICAgICB2aWV3LnNldCh0aGlzLnZpZXcuc3ViYXJyYXkob2Zmc2V0LCB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKSwgbGVuKTtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IGRpZmY7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlZE9mZnNldCA+PSAwKSB0aGlzLm1hcmtlZE9mZnNldCArPSBkaWZmO1xyXG4gICAgICAgICAgICB0aGlzLmxpbWl0ICs9IGRpZmY7XHJcbiAgICAgICAgICAgIG9mZnNldCArPSBkaWZmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJheVZpZXcgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmlldy5zZXQoc291cmNlLnZpZXcuc3ViYXJyYXkoc291cmNlLm9mZnNldCwgc291cmNlLmxpbWl0KSwgb2Zmc2V0IC0gbGVuKTtcclxuXHJcbiAgICAgICAgc291cmNlLm9mZnNldCA9IHNvdXJjZS5saW1pdDtcclxuICAgICAgICBpZiAocmVsYXRpdmUpXHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0IC09IGxlbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwZW5kcyB0aGlzIEJ5dGVCdWZmZXIgdG8gYW5vdGhlciBCeXRlQnVmZmVyLiBUaGlzIHdpbGwgb3ZlcndyaXRlIGFueSBjb250ZW50cyBiZWZvcmUgdGhlIHNwZWNpZmllZCBvZmZzZXQgdXAgdG8gdGhlXHJcbiAgICAgKiAgcHJlcGVuZGVkIGRhdGEncyBsZW5ndGguIElmIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgYXZhaWxhYmxlIGJlZm9yZSB0aGUgc3BlY2lmaWVkIGBvZmZzZXRgLCB0aGUgYmFja2luZyBidWZmZXJcclxuICAgICAqICB3aWxsIGJlIHJlc2l6ZWQgYW5kIGl0cyBjb250ZW50cyBtb3ZlZCBhY2NvcmRpbmdseS5cclxuICAgICAqIEBwYXJhbSB7IUJ5dGVCdWZmZXJ9IHRhcmdldCBUYXJnZXQgQnl0ZUJ1ZmZlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgT2Zmc2V0IHRvIHByZXBlbmQgYXQuIFdpbGwgdXNlIGFuZCBkZWNyZWFzZSB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGJ5IHRoZSBudW1iZXIgb2YgYnl0ZXNcclxuICAgICAqICBwcmVwZW5kZWQgaWYgb21pdHRlZC5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICogQHNlZSBCeXRlQnVmZmVyI3ByZXBlbmRcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS5wcmVwZW5kVG8gPSBmdW5jdGlvbih0YXJnZXQsIG9mZnNldCkge1xyXG4gICAgICAgIHRhcmdldC5wcmVwZW5kKHRoaXMsIG9mZnNldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcmludHMgZGVidWcgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyk9fSBvdXQgT3V0cHV0IGZ1bmN0aW9uIHRvIGNhbGwsIGRlZmF1bHRzIHRvIGNvbnNvbGUubG9nXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucHJpbnREZWJ1ZyA9IGZ1bmN0aW9uKG91dCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0ICE9PSAnZnVuY3Rpb24nKSBvdXQgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xyXG4gICAgICAgIG91dChcclxuICAgICAgICAgICAgdGhpcy50b1N0cmluZygpK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiK1xyXG4gICAgICAgICAgICB0aGlzLnRvRGVidWcoLyogY29sdW1ucyAqLyB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHJlbWFpbmluZyByZWFkYWJsZSBieXRlcy4gQ29udGVudHMgYXJlIHRoZSBieXRlcyBiZXR3ZWVuIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYW5kXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LCBzbyB0aGlzIHJldHVybnMgYGxpbWl0IC0gb2Zmc2V0YC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlbWFpbmluZyByZWFkYWJsZSBieXRlcy4gTWF5IGJlIG5lZ2F0aXZlIGlmIGBvZmZzZXQgPiBsaW1pdGAuXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVtYWluaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGltaXQgLSB0aGlzLm9mZnNldDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGlzIEJ5dGVCdWZmZXIncyB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9LiBJZiBhbiBvZmZzZXQgaGFzIGJlZW4gbWFya2VkIHRocm91Z2gge0BsaW5rIEJ5dGVCdWZmZXIjbWFya31cclxuICAgICAqICBiZWZvcmUsIGBvZmZzZXRgIHdpbGwgYmUgc2V0IHRvIHtAbGluayBCeXRlQnVmZmVyI21hcmtlZE9mZnNldH0sIHdoaWNoIHdpbGwgdGhlbiBiZSBkaXNjYXJkZWQuIElmIG5vIG9mZnNldCBoYXMgYmVlblxyXG4gICAgICogIG1hcmtlZCwgc2V0cyBgb2Zmc2V0ID0gMGAuXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciNtYXJrXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXJrZWRPZmZzZXQgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMubWFya2VkT2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlZE9mZnNldCA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoaXMgQnl0ZUJ1ZmZlciB0byBiZSBiYWNrZWQgYnkgYSBidWZmZXIgb2YgYXQgbGVhc3QgdGhlIGdpdmVuIGNhcGFjaXR5LiBXaWxsIGRvIG5vdGhpbmcgaWYgYWxyZWFkeSB0aGF0XHJcbiAgICAgKiAgbGFyZ2Ugb3IgbGFyZ2VyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNhcGFjaXR5IENhcGFjaXR5IHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IHRoaXNcclxuICAgICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYGNhcGFjaXR5YCBpcyBub3QgYSBudW1iZXJcclxuICAgICAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IElmIGBjYXBhY2l0eSA8IDBgXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24oY2FwYWNpdHkpIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYXBhY2l0eSAhPT0gJ251bWJlcicgfHwgY2FwYWNpdHkgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgY2FwYWNpdHk6IFwiK2NhcGFjaXR5K1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBjYXBhY2l0eSB8PSAwO1xuICAgICAgICAgICAgaWYgKGNhcGFjaXR5IDwgMClcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIGNhcGFjaXR5OiAwIDw9IFwiK2NhcGFjaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggPCBjYXBhY2l0eSkge1xyXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGNhcGFjaXR5KTtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG4gICAgICAgICAgICB2aWV3LnNldCh0aGlzLnZpZXcpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXZlcnNlcyB0aGlzIEJ5dGVCdWZmZXIncyBjb250ZW50cy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gT2Zmc2V0IHRvIHN0YXJ0IGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGVuZCBPZmZzZXQgdG8gZW5kIGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH1cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gdGhpc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiZWdpbiA9PT0gJ3VuZGVmaW5lZCcpIGJlZ2luID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICd1bmRlZmluZWQnKSBlbmQgPSB0aGlzLmxpbWl0O1xyXG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJlZ2luICE9PSAnbnVtYmVyJyB8fCBiZWdpbiAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBiZWdpbjogTm90IGFuIGludGVnZXJcIik7XG4gICAgICAgICAgICBiZWdpbiA+Pj49IDA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVuZCAhPT0gJ251bWJlcicgfHwgZW5kICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGVuZDogTm90IGFuIGludGVnZXJcIik7XG4gICAgICAgICAgICBlbmQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKGJlZ2luIDwgMCB8fCBiZWdpbiA+IGVuZCB8fCBlbmQgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiAwIDw9IFwiK2JlZ2luK1wiIDw9IFwiK2VuZCtcIiA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZWdpbiA9PT0gZW5kKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpczsgLy8gTm90aGluZyB0byByZXZlcnNlXHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnJldmVyc2UuY2FsbCh0aGlzLnZpZXcuc3ViYXJyYXkoYmVnaW4sIGVuZCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2tpcHMgdGhlIG5leHQgYGxlbmd0aGAgYnl0ZXMuIFRoaXMgd2lsbCBqdXN0IGFkdmFuY2VcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggTnVtYmVyIG9mIGJ5dGVzIHRvIHNraXAuIE1heSBhbHNvIGJlIG5lZ2F0aXZlIHRvIG1vdmUgdGhlIG9mZnNldCBiYWNrLlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSB0aGlzXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uKGxlbmd0aCkge1xyXG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxlbmd0aCAhPT0gJ251bWJlcicgfHwgbGVuZ3RoICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGxlbmd0aDogXCIrbGVuZ3RoK1wiIChub3QgYW4gaW50ZWdlcilcIik7XG4gICAgICAgICAgICBsZW5ndGggfD0gMDtcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldCArIGxlbmd0aDtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIGxlbmd0aDogMCA8PSBcIit0aGlzLm9mZnNldCtcIiArIFwiK2xlbmd0aCtcIiA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2xpY2VzIHRoaXMgQnl0ZUJ1ZmZlciBieSBjcmVhdGluZyBhIGNsb25lZCBpbnN0YW5jZSB3aXRoIGBvZmZzZXQgPSBiZWdpbmAgYW5kIGBsaW1pdCA9IGVuZGAuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGJlZ2luIEJlZ2luIG9mZnNldCwgZGVmYXVsdHMgdG8ge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gZW5kIEVuZCBvZmZzZXQsIGRlZmF1bHRzIHRvIHtAbGluayBCeXRlQnVmZmVyI2xpbWl0fS5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gQ2xvbmUgb2YgdGhpcyBCeXRlQnVmZmVyIHdpdGggc2xpY2luZyBhcHBsaWVkLCBiYWNrZWQgYnkgdGhlIHNhbWUge0BsaW5rIEJ5dGVCdWZmZXIjYnVmZmVyfVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24oYmVnaW4sIGVuZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT09ICd1bmRlZmluZWQnKSBiZWdpbiA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJykgZW5kID0gdGhpcy5saW1pdDtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiZWdpbiAhPT0gJ251bWJlcicgfHwgYmVnaW4gJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgYmVnaW46IE5vdCBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICAgICAgYmVnaW4gPj4+PSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmQgIT09ICdudW1iZXInIHx8IGVuZCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBlbmQ6IE5vdCBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICAgICAgZW5kID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChiZWdpbiA8IDAgfHwgYmVnaW4gPiBlbmQgfHwgZW5kID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCByYW5nZTogMCA8PSBcIitiZWdpbitcIiA8PSBcIitlbmQrXCIgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYmIgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgYmIub2Zmc2V0ID0gYmVnaW47XHJcbiAgICAgICAgYmIubGltaXQgPSBlbmQ7XHJcbiAgICAgICAgcmV0dXJuIGJiO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGJhY2tpbmcgYnVmZmVyIHRoYXQgY29udGFpbnMgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMuIENvbnRlbnRzIGFyZSB0aGUgYnl0ZXMgYmV0d2VlblxyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0gYW5kIHtAbGluayBCeXRlQnVmZmVyI2xpbWl0fS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlQ29weSBJZiBgdHJ1ZWAgcmV0dXJucyBhIGNvcHksIG90aGVyd2lzZSByZXR1cm5zIGEgdmlldyByZWZlcmVuY2luZyB0aGUgc2FtZSBtZW1vcnkgaWZcclxuICAgICAqICBwb3NzaWJsZS4gRGVmYXVsdHMgdG8gYGZhbHNlYFxyXG4gICAgICogQHJldHVybnMgeyFBcnJheUJ1ZmZlcn0gQ29udGVudHMgYXMgYW4gQXJyYXlCdWZmZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlclByb3RvdHlwZS50b0J1ZmZlciA9IGZ1bmN0aW9uKGZvcmNlQ29weSkge1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldCxcclxuICAgICAgICAgICAgbGltaXQgPSB0aGlzLmxpbWl0O1xyXG4gICAgICAgIGlmICghdGhpcy5ub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0ICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIG9mZnNldDogTm90IGFuIGludGVnZXJcIik7XG4gICAgICAgICAgICBvZmZzZXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaW1pdCAhPT0gJ251bWJlcicgfHwgbGltaXQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgbGltaXQ6IE5vdCBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICAgICAgbGltaXQgPj4+PSAwO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ID4gbGltaXQgfHwgbGltaXQgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiAwIDw9IFwiK29mZnNldCtcIiA8PSBcIitsaW1pdCtcIiA8PSBcIit0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5PVEU6IEl0J3Mgbm90IHBvc3NpYmxlIHRvIGhhdmUgYW5vdGhlciBBcnJheUJ1ZmZlciByZWZlcmVuY2UgdGhlIHNhbWUgbWVtb3J5IGFzIHRoZSBiYWNraW5nIGJ1ZmZlci4gVGhpcyBpc1xyXG4gICAgICAgIC8vIHBvc3NpYmxlIHdpdGggVWludDhBcnJheSNzdWJhcnJheSBvbmx5LCBidXQgd2UgaGF2ZSB0byByZXR1cm4gYW4gQXJyYXlCdWZmZXIgYnkgY29udHJhY3QuIFNvOlxyXG4gICAgICAgIGlmICghZm9yY2VDb3B5ICYmIG9mZnNldCA9PT0gMCAmJiBsaW1pdCA9PT0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyO1xyXG4gICAgICAgIGlmIChvZmZzZXQgPT09IGxpbWl0KVxyXG4gICAgICAgICAgICByZXR1cm4gRU1QVFlfQlVGRkVSO1xyXG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIobGltaXQgLSBvZmZzZXQpO1xyXG4gICAgICAgIG5ldyBVaW50OEFycmF5KGJ1ZmZlcikuc2V0KG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKS5zdWJhcnJheShvZmZzZXQsIGxpbWl0KSwgMCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgcmF3IGJ1ZmZlciBjb21wYWN0ZWQgdG8gY29udGFpbiB0aGlzIEJ5dGVCdWZmZXIncyBjb250ZW50cy4gQ29udGVudHMgYXJlIHRoZSBieXRlcyBiZXR3ZWVuXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIjb2Zmc2V0fSBhbmQge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBCeXRlQnVmZmVyI3RvQnVmZmVyfS5cclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VDb3B5IElmIGB0cnVlYCByZXR1cm5zIGEgY29weSwgb3RoZXJ3aXNlIHJldHVybnMgYSB2aWV3IHJlZmVyZW5jaW5nIHRoZSBzYW1lIG1lbW9yeS5cclxuICAgICAqICBEZWZhdWx0cyB0byBgZmFsc2VgXHJcbiAgICAgKiBAcmV0dXJucyB7IUFycmF5QnVmZmVyfSBDb250ZW50cyBhcyBhbiBBcnJheUJ1ZmZlclxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBCeXRlQnVmZmVyUHJvdG90eXBlLnRvQnVmZmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIEJ5dGVCdWZmZXIncyBjb250ZW50cyB0byBhIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gZW5jb2RpbmcgT3V0cHV0IGVuY29kaW5nLiBSZXR1cm5zIGFuIGluZm9ybWF0aXZlIHN0cmluZyByZXByZXNlbnRhdGlvbiBpZiBvbWl0dGVkIGJ1dCBhbHNvIGFsbG93c1xyXG4gICAgICogIGRpcmVjdCBjb252ZXJzaW9uIHRvIFwidXRmOFwiLCBcImhleFwiLCBcImJhc2U2NFwiIGFuZCBcImJpbmFyeVwiIGVuY29kaW5nLiBcImRlYnVnXCIgcmV0dXJucyBhIGhleCByZXByZXNlbnRhdGlvbiB3aXRoXHJcbiAgICAgKiAgaGlnaGxpZ2h0ZWQgb2Zmc2V0cy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gT2Zmc2V0IHRvIGJlZ2luIGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGVuZCBPZmZzZXQgdG8gZW5kIGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIGBlbmNvZGluZ2AgaXMgaW52YWxpZFxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oZW5jb2RpbmcsIGJlZ2luLCBlbmQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgcmV0dXJuIFwiQnl0ZUJ1ZmZlckFCKG9mZnNldD1cIit0aGlzLm9mZnNldCtcIixtYXJrZWRPZmZzZXQ9XCIrdGhpcy5tYXJrZWRPZmZzZXQrXCIsbGltaXQ9XCIrdGhpcy5saW1pdCtcIixjYXBhY2l0eT1cIit0aGlzLmNhcGFjaXR5KCkrXCIpXCI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgIGVuY29kaW5nID0gXCJ1dGY4XCIsXHJcbiAgICAgICAgICAgIGJlZ2luID0gZW5jb2RpbmcsXHJcbiAgICAgICAgICAgIGVuZCA9IGJlZ2luO1xyXG4gICAgICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgY2FzZSBcInV0ZjhcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvVVRGOChiZWdpbiwgZW5kKTtcclxuICAgICAgICAgICAgY2FzZSBcImJhc2U2NFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9CYXNlNjQoYmVnaW4sIGVuZCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZXhcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvSGV4KGJlZ2luLCBlbmQpO1xyXG4gICAgICAgICAgICBjYXNlIFwiYmluYXJ5XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0JpbmFyeShiZWdpbiwgZW5kKTtcclxuICAgICAgICAgICAgY2FzZSBcImRlYnVnXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RlYnVnKCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb2x1bW5zXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbHVtbnMoKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiVW5zdXBwb3J0ZWQgZW5jb2Rpbmc6IFwiK2VuY29kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGx4aXYtZW1iZWRkYWJsZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbHhpdi1lbWJlZGRhYmxlIChjKSAyMDE0IERhbmllbCBXaXJ0eiA8ZGNvZGVAZGNvZGUuaW8+XHJcbiAgICAgKiBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXHJcbiAgICAgKiBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL2x4aXYgZm9yIGRldGFpbHNcclxuICAgICAqL1xyXG4gICAgdmFyIGx4aXYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbHhpdiBuYW1lc3BhY2UuXHJcbiAgICAgICAgICogQHR5cGUgeyFPYmplY3QuPHN0cmluZywqPn1cclxuICAgICAgICAgKiBAZXhwb3J0cyBseGl2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGx4aXYgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hhcmFjdGVyIGNvZGVzIGZvciBvdXRwdXQuXHJcbiAgICAgICAgICogQHR5cGUgeyFBcnJheS48bnVtYmVyPn1cclxuICAgICAgICAgKiBAaW5uZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgYW91dCA9IFtcclxuICAgICAgICAgICAgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCA3OSwgODAsXHJcbiAgICAgICAgICAgIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLCA5NywgOTgsIDk5LCAxMDAsIDEwMSwgMTAyLFxyXG4gICAgICAgICAgICAxMDMsIDEwNCwgMTA1LCAxMDYsIDEwNywgMTA4LCAxMDksIDExMCwgMTExLCAxMTIsIDExMywgMTE0LCAxMTUsIDExNiwgMTE3LCAxMTgsXHJcbiAgICAgICAgICAgIDExOSwgMTIwLCAxMjEsIDEyMiwgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDQzLCA0N1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoYXJhY3RlciBjb2RlcyBmb3IgaW5wdXQuXHJcbiAgICAgICAgICogQHR5cGUgeyFBcnJheS48bnVtYmVyPn1cclxuICAgICAgICAgKiBAaW5uZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgYWluID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaT0wLCBrPWFvdXQubGVuZ3RoOyBpPGs7ICsraSlcclxuICAgICAgICAgICAgYWluW2FvdXRbaV1dID0gaTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyBieXRlcyB0byBiYXNlNjQgY2hhciBjb2Rlcy5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbigpOm51bWJlcnxudWxsfSBzcmMgQnl0ZXMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGJ5dGUgcmVzcGVjdGl2ZWx5IGBudWxsYCBpZlxyXG4gICAgICAgICAqICB0aGVyZSBhcmUgbm8gbW9yZSBieXRlcyBsZWZ0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7IWZ1bmN0aW9uKG51bWJlcil9IGRzdCBDaGFyYWN0ZXJzIGRlc3RpbmF0aW9uIGFzIGEgZnVuY3Rpb24gc3VjY2Vzc2l2ZWx5IGNhbGxlZCB3aXRoIGVhY2ggZW5jb2RlZCBjaGFyXHJcbiAgICAgICAgICogIGNvZGUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbHhpdi5lbmNvZGUgPSBmdW5jdGlvbihzcmMsIGRzdCkge1xyXG4gICAgICAgICAgICB2YXIgYiwgdDtcclxuICAgICAgICAgICAgd2hpbGUgKChiID0gc3JjKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkc3QoYW91dFsoYj4+MikmMHgzZl0pO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiJjB4Myk8PDQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGIgPSBzcmMoKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0IHw9IChiPj40KSYweGY7XHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KGFvdXRbKHR8KChiPj40KSYweGYpKSYweDNmXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IChiJjB4Zik8PDI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChiID0gc3JjKCkpICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkc3QoYW91dFsodHwoKGI+PjYpJjB4MykpJjB4M2ZdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHN0KGFvdXRbYiYweDNmXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkc3QoYW91dFt0JjB4M2ZdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHN0KDYxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGRzdChhb3V0W3QmMHgzZl0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCg2MSksXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KDYxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYmFzZTY0IGNoYXIgY29kZXMgdG8gYnl0ZXMuXHJcbiAgICAgICAgICogQHBhcmFtIHshZnVuY3Rpb24oKTpudW1iZXJ8bnVsbH0gc3JjIENoYXJhY3RlcnMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGNoYXIgY29kZSByZXNwZWN0aXZlbHlcclxuICAgICAgICAgKiAgYG51bGxgIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMgbGVmdC5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbihudW1iZXIpfSBkc3QgQnl0ZXMgZGVzdGluYXRpb24gYXMgYSBmdW5jdGlvbiBzdWNjZXNzaXZlbHkgY2FsbGVkIHdpdGggdGhlIG5leHQgYnl0ZS5cclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYSBjaGFyYWN0ZXIgY29kZSBpcyBpbnZhbGlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbHhpdi5kZWNvZGUgPSBmdW5jdGlvbihzcmMsIGRzdCkge1xyXG4gICAgICAgICAgICB2YXIgYywgdDEsIHQyO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmYWlsKGMpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiSWxsZWdhbCBjaGFyYWN0ZXIgY29kZTogXCIrYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKChjID0gc3JjKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0MSA9IGFpbltjXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdDEgPT09ICd1bmRlZmluZWQnKSBmYWlsKGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKChjID0gc3JjKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdDIgPSBhaW5bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0MiA9PT0gJ3VuZGVmaW5lZCcpIGZhaWwoYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KCh0MTw8Mik+Pj4wfCh0MiYweDMwKT4+NCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjID0gc3JjKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxID0gYWluW2NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQxID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjID09PSA2MSkgYnJlYWs7IGVsc2UgZmFpbChjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHN0KCgodDImMHhmKTw8NCk+Pj4wfCh0MSYweDNjKT4+Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYyA9IHNyYygpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDIgPSBhaW5bY107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQyID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gNjEpIGJyZWFrOyBlbHNlIGZhaWwoYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc3QoKCh0MSYweDMpPDw2KT4+PjB8dDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdHMgaWYgYSBzdHJpbmcgaXMgdmFsaWQgYmFzZTY0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIHRlc3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHZhbGlkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGx4aXYudGVzdCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvLnRlc3Qoc3RyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbHhpdjtcclxuICAgIH0oKTtcclxuXHJcbiAgICAvLyBlbmNvZGluZ3MvYmFzZTY0XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmNvZGVzIHRoaXMgQnl0ZUJ1ZmZlcidzIGNvbnRlbnRzIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBiZWdpbiBPZmZzZXQgdG8gYmVnaW4gYXQsIGRlZmF1bHRzIHRvIHtAbGluayBCeXRlQnVmZmVyI29mZnNldH0uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGVuZCBPZmZzZXQgdG8gZW5kIGF0LCBkZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICAgICAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IElmIGBiZWdpbmAgb3IgYGVuZGAgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyUHJvdG90eXBlLnRvQmFzZTY0ID0gZnVuY3Rpb24oYmVnaW4sIGVuZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICBiZWdpbiA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgZW5kID0gdGhpcy5saW1pdDtcclxuICAgICAgICBiZWdpbiA9IGJlZ2luIHwgMDsgZW5kID0gZW5kIHwgMDtcclxuICAgICAgICBpZiAoYmVnaW4gPCAwIHx8IGVuZCA+IHRoaXMuY2FwYWNpdHkgfHwgYmVnaW4gPiBlbmQpXHJcbiAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJiZWdpbiwgZW5kXCIpO1xyXG4gICAgICAgIHZhciBzZDsgbHhpdi5lbmNvZGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWdpbiA8IGVuZCA/IHRoaXMudmlld1tiZWdpbisrXSA6IG51bGw7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCBzZCA9IHN0cmluZ0Rlc3RpbmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBzZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29kZXMgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBCeXRlQnVmZmVyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gZGVjb2RlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBsaXR0bGVFbmRpYW4gV2hldGhlciB0byB1c2UgbGl0dGxlIG9yIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTn0uXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IEJ5dGVCdWZmZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5mcm9tQmFzZTY0ID0gZnVuY3Rpb24oc3RyLCBsaXR0bGVFbmRpYW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcInN0clwiKTtcclxuICAgICAgICB2YXIgYmIgPSBuZXcgQnl0ZUJ1ZmZlcihzdHIubGVuZ3RoLzQqMywgbGl0dGxlRW5kaWFuKSxcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgbHhpdi5kZWNvZGUoc3RyaW5nU291cmNlKHN0ciksIGZ1bmN0aW9uKGIpIHtcclxuICAgICAgICAgICAgYmIudmlld1tpKytdID0gYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBiYi5saW1pdCA9IGk7XHJcbiAgICAgICAgcmV0dXJuIGJiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY29kZXMgYSBiaW5hcnkgc3RyaW5nIHRvIGJhc2U2NCBsaWtlIGB3aW5kb3cuYnRvYWAgZG9lcy5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQmluYXJ5IHN0cmluZ1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cuYnRvYVxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLmJ0b2EgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICByZXR1cm4gQnl0ZUJ1ZmZlci5mcm9tQmluYXJ5KHN0cikudG9CYXNlNjQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGJpbmFyeSBsaWtlIGB3aW5kb3cuYXRvYmAgZG9lcy5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiNjQgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCaW5hcnkgc3RyaW5nXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cuYXRvYlxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLmF0b2IgPSBmdW5jdGlvbihiNjQpIHtcclxuICAgICAgICByZXR1cm4gQnl0ZUJ1ZmZlci5mcm9tQmFzZTY0KGI2NCkudG9CaW5hcnkoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZW5jb2RpbmdzL2JpbmFyeVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5jb2RlcyB0aGlzIEJ5dGVCdWZmZXIgdG8gYSBiaW5hcnkgZW5jb2RlZCBzdHJpbmcsIHRoYXQgaXMgdXNpbmcgb25seSBjaGFyYWN0ZXJzIDB4MDAtMHhGRiBhcyBieXRlcy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gT2Zmc2V0IHRvIGJlZ2luIGF0LiBEZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBlbmQgT2Zmc2V0IHRvIGVuZCBhdC4gRGVmYXVsdHMgdG8ge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmluYXJ5IGVuY29kZWQgc3RyaW5nXHJcbiAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgb2Zmc2V0ID4gbGltaXRgXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUudG9CaW5hcnkgPSBmdW5jdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiZWdpbiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIGJlZ2luID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICBlbmQgPSB0aGlzLmxpbWl0O1xyXG4gICAgICAgIGJlZ2luIHw9IDA7IGVuZCB8PSAwO1xyXG4gICAgICAgIGlmIChiZWdpbiA8IDAgfHwgZW5kID4gdGhpcy5jYXBhY2l0eSgpIHx8IGJlZ2luID4gZW5kKVxyXG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiYmVnaW4sIGVuZFwiKTtcclxuICAgICAgICBpZiAoYmVnaW4gPT09IGVuZClcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIGNoYXJzID0gW10sXHJcbiAgICAgICAgICAgIHBhcnRzID0gW107XHJcbiAgICAgICAgd2hpbGUgKGJlZ2luIDwgZW5kKSB7XHJcbiAgICAgICAgICAgIGNoYXJzLnB1c2godGhpcy52aWV3W2JlZ2luKytdKTtcclxuICAgICAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCA+PSAxMDI0KVxyXG4gICAgICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2hhcnMpKSxcclxuICAgICAgICAgICAgICAgIGNoYXJzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKSArIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaGFycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVjb2RlcyBhIGJpbmFyeSBlbmNvZGVkIHN0cmluZywgdGhhdCBpcyB1c2luZyBvbmx5IGNoYXJhY3RlcnMgMHgwMC0weEZGIGFzIGJ5dGVzLCB0byBhIEJ5dGVCdWZmZXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBkZWNvZGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGxpdHRsZUVuZGlhbiBXaGV0aGVyIHRvIHVzZSBsaXR0bGUgb3IgYmlnIGVuZGlhbiBieXRlIG9yZGVyLiBEZWZhdWx0cyB0b1xyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyLkRFRkFVTFRfRU5ESUFOfS5cclxuICAgICAqIEByZXR1cm5zIHshQnl0ZUJ1ZmZlcn0gQnl0ZUJ1ZmZlclxyXG4gICAgICogQGV4cG9zZVxyXG4gICAgICovXHJcbiAgICBCeXRlQnVmZmVyLmZyb21CaW5hcnkgPSBmdW5jdGlvbihzdHIsIGxpdHRsZUVuZGlhbikge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwic3RyXCIpO1xyXG4gICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgayA9IHN0ci5sZW5ndGgsXHJcbiAgICAgICAgICAgIGNoYXJDb2RlLFxyXG4gICAgICAgICAgICBiYiA9IG5ldyBCeXRlQnVmZmVyKGssIGxpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgd2hpbGUgKGk8aykge1xyXG4gICAgICAgICAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICBpZiAoY2hhckNvZGUgPiAweGZmKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcImlsbGVnYWwgY2hhciBjb2RlOiBcIitjaGFyQ29kZSk7XHJcbiAgICAgICAgICAgIGJiLnZpZXdbaSsrXSA9IGNoYXJDb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiYi5saW1pdCA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGJiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBlbmNvZGluZ3MvZGVidWdcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY29kZXMgdGhpcyBCeXRlQnVmZmVyIHRvIGEgaGV4IGVuY29kZWQgc3RyaW5nIHdpdGggbWFya2VkIG9mZnNldHMuIE9mZnNldCBzeW1ib2xzIGFyZTpcclxuICAgICAqICogYDxgIDogb2Zmc2V0LFxyXG4gICAgICogKiBgJ2AgOiBtYXJrZWRPZmZzZXQsXHJcbiAgICAgKiAqIGA+YCA6IGxpbWl0LFxyXG4gICAgICogKiBgfGAgOiBvZmZzZXQgYW5kIGxpbWl0LFxyXG4gICAgICogKiBgW2AgOiBvZmZzZXQgYW5kIG1hcmtlZE9mZnNldCxcclxuICAgICAqICogYF1gIDogbWFya2VkT2Zmc2V0IGFuZCBsaW1pdCxcclxuICAgICAqICogYCFgIDogb2Zmc2V0LCBtYXJrZWRPZmZzZXQgYW5kIGxpbWl0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBjb2x1bW5zIElmIGB0cnVlYCByZXR1cm5zIHR3byBjb2x1bW5zIGhleCArIGFzY2lpLCBkZWZhdWx0cyB0byBgZmFsc2VgXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfCFBcnJheS48c3RyaW5nPn0gRGVidWcgc3RyaW5nIG9yIGFycmF5IG9mIGxpbmVzIGlmIGBhc0FycmF5ID0gdHJ1ZWBcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBleGFtcGxlIGA+MDAnMDEgMDI8MDNgIGNvbnRhaW5zIGZvdXIgYnl0ZXMgd2l0aCBgbGltaXQ9MCwgbWFya2VkT2Zmc2V0PTEsIG9mZnNldD0zYFxyXG4gICAgICogQGV4YW1wbGUgYDAwWzAxIDAyIDAzPmAgY29udGFpbnMgZm91ciBieXRlcyB3aXRoIGBvZmZzZXQ9bWFya2VkT2Zmc2V0PTEsIGxpbWl0PTRgXHJcbiAgICAgKiBAZXhhbXBsZSBgMDB8MDEgMDIgMDNgIGNvbnRhaW5zIGZvdXIgYnl0ZXMgd2l0aCBgb2Zmc2V0PWxpbWl0PTEsIG1hcmtlZE9mZnNldD0tMWBcclxuICAgICAqIEBleGFtcGxlIGB8YCBjb250YWlucyB6ZXJvIGJ5dGVzIHdpdGggYG9mZnNldD1saW1pdD0wLCBtYXJrZWRPZmZzZXQ9LTFgXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUudG9EZWJ1ZyA9IGZ1bmN0aW9uKGNvbHVtbnMpIHtcclxuICAgICAgICB2YXIgaSA9IC0xLFxyXG4gICAgICAgICAgICBrID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgYixcclxuICAgICAgICAgICAgaGV4ID0gXCJcIixcclxuICAgICAgICAgICAgYXNjID0gXCJcIixcclxuICAgICAgICAgICAgb3V0ID0gXCJcIjtcclxuICAgICAgICB3aGlsZSAoaTxrKSB7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgYiA9IHRoaXMudmlld1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChiIDwgMHgxMCkgaGV4ICs9IFwiMFwiK2IudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGhleCArPSBiLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYXNjICs9IGIgPiAzMiAmJiBiIDwgMTI3ID8gU3RyaW5nLmZyb21DaGFyQ29kZShiKSA6ICcuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDAgJiYgaSAlIDE2ID09PSAwICYmIGkgIT09IGspIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IDMqMTYrMykgaGV4ICs9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dCArPSBoZXgrYXNjK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaGV4ID0gYXNjID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5vZmZzZXQgJiYgaSA9PT0gdGhpcy5saW1pdClcclxuICAgICAgICAgICAgICAgIGhleCArPSBpID09PSB0aGlzLm1hcmtlZE9mZnNldCA/IFwiIVwiIDogXCJ8XCI7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPT09IHRoaXMub2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgaGV4ICs9IGkgPT09IHRoaXMubWFya2VkT2Zmc2V0ID8gXCJbXCIgOiBcIjxcIjtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gdGhpcy5saW1pdClcclxuICAgICAgICAgICAgICAgIGhleCArPSBpID09PSB0aGlzLm1hcmtlZE9mZnNldCA/IFwiXVwiIDogXCI+XCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGhleCArPSBpID09PSB0aGlzLm1hcmtlZE9mZnNldCA/IFwiJ1wiIDogKGNvbHVtbnMgfHwgKGkgIT09IDAgJiYgaSAhPT0gaykgPyBcIiBcIiA6IFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29sdW1ucyAmJiBoZXggIT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChoZXgubGVuZ3RoIDwgMyoxNiszKVxyXG4gICAgICAgICAgICAgICAgaGV4ICs9IFwiIFwiO1xyXG4gICAgICAgICAgICBvdXQgKz0gaGV4ICsgYXNjICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbnMgPyBvdXQgOiBoZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVjb2RlcyBhIGhleCBlbmNvZGVkIHN0cmluZyB3aXRoIG1hcmtlZCBvZmZzZXRzIHRvIGEgQnl0ZUJ1ZmZlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgRGVidWcgc3RyaW5nIHRvIGRlY29kZSAobm90IGJlIGdlbmVyYXRlZCB3aXRoIGBjb2x1bW5zID0gdHJ1ZWApXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBsaXR0bGVFbmRpYW4gV2hldGhlciB0byB1c2UgbGl0dGxlIG9yIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTn0uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBub0Fzc2VydCBXaGV0aGVyIHRvIHNraXAgYXNzZXJ0aW9ucyBvZiBvZmZzZXRzIGFuZCB2YWx1ZXMuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuREVGQVVMVF9OT0FTU0VSVH0uXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IEJ5dGVCdWZmZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqIEBzZWUgQnl0ZUJ1ZmZlciN0b0RlYnVnXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuZnJvbURlYnVnID0gZnVuY3Rpb24oc3RyLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XHJcbiAgICAgICAgdmFyIGsgPSBzdHIubGVuZ3RoLFxyXG4gICAgICAgICAgICBiYiA9IG5ldyBCeXRlQnVmZmVyKCgoaysxKS8zKXwwLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcclxuICAgICAgICB2YXIgaSA9IDAsIGogPSAwLCBjaCwgYixcclxuICAgICAgICAgICAgcnMgPSBmYWxzZSwgLy8gUmVxdWlyZSBzeW1ib2wgbmV4dFxyXG4gICAgICAgICAgICBobyA9IGZhbHNlLCBobSA9IGZhbHNlLCBobCA9IGZhbHNlLCAvLyBBbHJlYWR5IGhhcyBvZmZzZXQgKGhvKSwgbWFya2VkT2Zmc2V0IChobSksIGxpbWl0IChobCk/XHJcbiAgICAgICAgICAgIGZhaWwgPSBmYWxzZTtcclxuICAgICAgICB3aGlsZSAoaTxrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2ggPSBzdHIuY2hhckF0KGkrKykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJyEnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvIHx8IGhtIHx8IGhsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvID0gaG0gPSBobCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJiLm9mZnNldCA9IGJiLm1hcmtlZE9mZnNldCA9IGJiLmxpbWl0ID0gajtcclxuICAgICAgICAgICAgICAgICAgICBycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnfCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG8gfHwgaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG8gPSBobCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJiLm9mZnNldCA9IGJiLmxpbWl0ID0gajtcclxuICAgICAgICAgICAgICAgICAgICBycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnWyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG8gfHwgaG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG8gPSBobSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJiLm9mZnNldCA9IGJiLm1hcmtlZE9mZnNldCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgcnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmIub2Zmc2V0ID0gajtcclxuICAgICAgICAgICAgICAgICAgICBycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnXSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGwgfHwgaG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGwgPSBobSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJiLmxpbWl0ID0gYmIubWFya2VkT2Zmc2V0ID0gajtcclxuICAgICAgICAgICAgICAgICAgICBycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnPic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiYi5saW1pdCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgcnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCInXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiYi5tYXJrZWRPZmZzZXQgPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgIHJzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcclxuICAgICAgICAgICAgICAgICAgICBycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiID0gcGFyc2VJbnQoY2grc3RyLmNoYXJBdChpKyspLCAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oYikgfHwgYiA8IDAgfHwgYiA+IDI1NSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgc3RyOiBOb3QgYSBkZWJ1ZyBlbmNvZGVkIHN0cmluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmIudmlld1tqKytdID0gYjtcclxuICAgICAgICAgICAgICAgICAgICBycyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZhaWwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogSW52YWxpZCBzeW1ib2wgYXQgXCIraSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKCFobyB8fCAhaGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogTWlzc2luZyBvZmZzZXQgb3IgbGltaXRcIik7XHJcbiAgICAgICAgICAgIGlmIChqPGJiLmJ1ZmZlci5ieXRlTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBzdHI6IE5vdCBhIGRlYnVnIGVuY29kZWQgc3RyaW5nIChpcyBpdCBoZXg/KSBcIitqK1wiIDwgXCIrayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYjtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZW5jb2RpbmdzL2hleFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5jb2RlcyB0aGlzIEJ5dGVCdWZmZXIncyBjb250ZW50cyB0byBhIGhleCBlbmNvZGVkIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gYmVnaW4gT2Zmc2V0IHRvIGJlZ2luIGF0LiBEZWZhdWx0cyB0byB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBlbmQgT2Zmc2V0IHRvIGVuZCBhdC4gRGVmYXVsdHMgdG8ge0BsaW5rIEJ5dGVCdWZmZXIjbGltaXR9LlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gSGV4IGVuY29kZWQgc3RyaW5nXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUudG9IZXggPSBmdW5jdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgYmVnaW4gPSB0eXBlb2YgYmVnaW4gPT09ICd1bmRlZmluZWQnID8gdGhpcy5vZmZzZXQgOiBiZWdpbjtcclxuICAgICAgICBlbmQgPSB0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJyA/IHRoaXMubGltaXQgOiBlbmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vQXNzZXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gIT09ICdudW1iZXInIHx8IGJlZ2luICUgMSAhPT0gMClcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGJlZ2luOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGJlZ2luID4+Pj0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kICE9PSAnbnVtYmVyJyB8fCBlbmQgJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgZW5kOiBOb3QgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgICAgIGVuZCA+Pj49IDA7XG4gICAgICAgICAgICBpZiAoYmVnaW4gPCAwIHx8IGJlZ2luID4gZW5kIHx8IGVuZCA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgcmFuZ2U6IDAgPD0gXCIrYmVnaW4rXCIgPD0gXCIrZW5kK1wiIDw9IFwiK3RoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG91dCA9IG5ldyBBcnJheShlbmQgLSBiZWdpbiksXHJcbiAgICAgICAgICAgIGI7XHJcbiAgICAgICAgd2hpbGUgKGJlZ2luIDwgZW5kKSB7XHJcbiAgICAgICAgICAgIGIgPSB0aGlzLnZpZXdbYmVnaW4rK107XHJcbiAgICAgICAgICAgIGlmIChiIDwgMHgxMClcclxuICAgICAgICAgICAgICAgIG91dC5wdXNoKFwiMFwiLCBiLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgICAgIGVsc2Ugb3V0LnB1c2goYi50b1N0cmluZygxNikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29kZXMgYSBoZXggZW5jb2RlZCBzdHJpbmcgdG8gYSBCeXRlQnVmZmVyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gZGVjb2RlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBsaXR0bGVFbmRpYW4gV2hldGhlciB0byB1c2UgbGl0dGxlIG9yIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci4gRGVmYXVsdHMgdG9cclxuICAgICAqICB7QGxpbmsgQnl0ZUJ1ZmZlci5ERUZBVUxUX0VORElBTn0uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBub0Fzc2VydCBXaGV0aGVyIHRvIHNraXAgYXNzZXJ0aW9ucyBvZiBvZmZzZXRzIGFuZCB2YWx1ZXMuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuREVGQVVMVF9OT0FTU0VSVH0uXHJcbiAgICAgKiBAcmV0dXJucyB7IUJ5dGVCdWZmZXJ9IEJ5dGVCdWZmZXJcclxuICAgICAqIEBleHBvc2VcclxuICAgICAqL1xyXG4gICAgQnl0ZUJ1ZmZlci5mcm9tSGV4ID0gZnVuY3Rpb24oc3RyLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XHJcbiAgICAgICAgaWYgKCFub0Fzc2VydCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogTm90IGEgc3RyaW5nXCIpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCAlIDIgIT09IDApXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogTGVuZ3RoIG5vdCBhIG11bHRpcGxlIG9mIDJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrID0gc3RyLmxlbmd0aCxcclxuICAgICAgICAgICAgYmIgPSBuZXcgQnl0ZUJ1ZmZlcigoayAvIDIpIHwgMCwgbGl0dGxlRW5kaWFuKSxcclxuICAgICAgICAgICAgYjtcclxuICAgICAgICBmb3IgKHZhciBpPTAsIGo9MDsgaTxrOyBpKz0yKSB7XHJcbiAgICAgICAgICAgIGIgPSBwYXJzZUludChzdHIuc3Vic3RyaW5nKGksIGkrMiksIDE2KTtcclxuICAgICAgICAgICAgaWYgKCFub0Fzc2VydClcclxuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoYikgfHwgYiA8IDAgfHwgYiA+IDI1NSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogQ29udGFpbnMgbm9uLWhleCBjaGFyYWN0ZXJzXCIpO1xyXG4gICAgICAgICAgICBiYi52aWV3W2orK10gPSBiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBiYi5saW1pdCA9IGo7XHJcbiAgICAgICAgcmV0dXJuIGJiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyB1dGZ4LWVtYmVkZGFibGVcclxuXHJcbiAgICAvKipcclxuICAgICAqIHV0ZngtZW1iZWRkYWJsZSAoYykgMjAxNCBEYW5pZWwgV2lydHogPGRjb2RlQGRjb2RlLmlvPlxyXG4gICAgICogUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxyXG4gICAgICogc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNvZGVJTy91dGZ4IGZvciBkZXRhaWxzXHJcbiAgICAgKi9cclxuICAgIHZhciB1dGZ4ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHV0ZnggbmFtZXNwYWNlLlxyXG4gICAgICAgICAqIEBpbm5lclxyXG4gICAgICAgICAqIEB0eXBlIHshT2JqZWN0LjxzdHJpbmcsKj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHV0ZnggPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWF4aW11bSB2YWxpZCBjb2RlIHBvaW50LlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICogQGNvbnN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXRmeC5NQVhfQ09ERVBPSU5UID0gMHgxMEZGRkY7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgVVRGOCBjb2RlIHBvaW50cyB0byBVVEY4IGJ5dGVzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7KCFmdW5jdGlvbigpOm51bWJlcnxudWxsKSB8IG51bWJlcn0gc3JjIENvZGUgcG9pbnRzIHNvdXJjZSwgZWl0aGVyIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGNvZGUgcG9pbnRcclxuICAgICAgICAgKiAgcmVzcGVjdGl2ZWx5IGBudWxsYCBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjb2RlIHBvaW50cyBsZWZ0IG9yIGEgc2luZ2xlIG51bWVyaWMgY29kZSBwb2ludC5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbihudW1iZXIpfSBkc3QgQnl0ZXMgZGVzdGluYXRpb24gYXMgYSBmdW5jdGlvbiBzdWNjZXNzaXZlbHkgY2FsbGVkIHdpdGggdGhlIG5leHQgYnl0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHV0ZnguZW5jb2RlVVRGOCA9IGZ1bmN0aW9uKHNyYywgZHN0KSB7XHJcbiAgICAgICAgICAgIHZhciBjcCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3JjID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgIGNwID0gc3JjLFxyXG4gICAgICAgICAgICAgICAgc3JjID0gZnVuY3Rpb24oKSB7IHJldHVybiBudWxsOyB9O1xyXG4gICAgICAgICAgICB3aGlsZSAoY3AgIT09IG51bGwgfHwgKGNwID0gc3JjKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3AgPCAweDgwKVxyXG4gICAgICAgICAgICAgICAgICAgIGRzdChjcCYweDdGKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNwIDwgMHg4MDApXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KCgoY3A+PjYpJjB4MUYpfDB4QzApLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoY3AmMHgzRil8MHg4MCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjcCA8IDB4MTAwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KCgoY3A+PjEyKSYweDBGKXwweEUwKSxcclxuICAgICAgICAgICAgICAgICAgICBkc3QoKChjcD4+NikmMHgzRil8MHg4MCksXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KChjcCYweDNGKXwweDgwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkc3QoKChjcD4+MTgpJjB4MDcpfDB4RjApLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoKGNwPj4xMikmMHgzRil8MHg4MCksXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KCgoY3A+PjYpJjB4M0YpfDB4ODApLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoY3AmMHgzRil8MHg4MCk7XHJcbiAgICAgICAgICAgICAgICBjcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIFVURjggYnl0ZXMgdG8gVVRGOCBjb2RlIHBvaW50cy5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbigpOm51bWJlcnxudWxsfSBzcmMgQnl0ZXMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGJ5dGUgcmVzcGVjdGl2ZWx5IGBudWxsYCBpZiB0aGVyZVxyXG4gICAgICAgICAqICBhcmUgbm8gbW9yZSBieXRlcyBsZWZ0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7IWZ1bmN0aW9uKG51bWJlcil9IGRzdCBDb2RlIHBvaW50cyBkZXN0aW5hdGlvbiBhcyBhIGZ1bmN0aW9uIHN1Y2Nlc3NpdmVseSBjYWxsZWQgd2l0aCBlYWNoIGRlY29kZWQgY29kZSBwb2ludC5cclxuICAgICAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBhIHN0YXJ0aW5nIGJ5dGUgaXMgaW52YWxpZCBpbiBVVEY4XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsYXN0IHNlcXVlbmNlIGlzIHRydW5jYXRlZC4gSGFzIGFuIGFycmF5IHByb3BlcnR5IGBieXRlc2AgaG9sZGluZyB0aGVcclxuICAgICAgICAgKiAgcmVtYWluaW5nIGJ5dGVzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHV0ZnguZGVjb2RlVVRGOCA9IGZ1bmN0aW9uKHNyYywgZHN0KSB7XHJcbiAgICAgICAgICAgIHZhciBhLCBiLCBjLCBkLCBmYWlsID0gZnVuY3Rpb24oYikge1xyXG4gICAgICAgICAgICAgICAgYiA9IGIuc2xpY2UoMCwgYi5pbmRleE9mKG51bGwpKTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihiLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZXJyLm5hbWUgPSBcIlRydW5jYXRlZEVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICBlcnJbJ2J5dGVzJ10gPSBiO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aGlsZSAoKGEgPSBzcmMoKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoYSYweDgwKSA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICBkc3QoYSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoYSYweEUwKSA9PT0gMHhDMClcclxuICAgICAgICAgICAgICAgICAgICAoKGIgPSBzcmMoKSkgPT09IG51bGwpICYmIGZhaWwoW2EsIGJdKSxcclxuICAgICAgICAgICAgICAgICAgICBkc3QoKChhJjB4MUYpPDw2KSB8IChiJjB4M0YpKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChhJjB4RjApID09PSAweEUwKVxyXG4gICAgICAgICAgICAgICAgICAgICgoYj1zcmMoKSkgPT09IG51bGwgfHwgKGM9c3JjKCkpID09PSBudWxsKSAmJiBmYWlsKFthLCBiLCBjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KCgoYSYweDBGKTw8MTIpIHwgKChiJjB4M0YpPDw2KSB8IChjJjB4M0YpKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChhJjB4RjgpID09PSAweEYwKVxyXG4gICAgICAgICAgICAgICAgICAgICgoYj1zcmMoKSkgPT09IG51bGwgfHwgKGM9c3JjKCkpID09PSBudWxsIHx8IChkPXNyYygpKSA9PT0gbnVsbCkgJiYgZmFpbChbYSwgYiwgYyAsZF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoKGEmMHgwNyk8PDE4KSB8ICgoYiYweDNGKTw8MTIpIHwgKChjJjB4M0YpPDw2KSB8IChkJjB4M0YpKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgUmFuZ2VFcnJvcihcIklsbGVnYWwgc3RhcnRpbmcgYnl0ZTogXCIrYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBVVEYxNiBjaGFyYWN0ZXJzIHRvIFVURjggY29kZSBwb2ludHMuXHJcbiAgICAgICAgICogQHBhcmFtIHshZnVuY3Rpb24oKTpudW1iZXJ8bnVsbH0gc3JjIENoYXJhY3RlcnMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGNoYXIgY29kZSByZXNwZWN0aXZlbHlcclxuICAgICAgICAgKiAgYG51bGxgIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMgbGVmdC5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbihudW1iZXIpfSBkc3QgQ29kZSBwb2ludHMgZGVzdGluYXRpb24gYXMgYSBmdW5jdGlvbiBzdWNjZXNzaXZlbHkgY2FsbGVkIHdpdGggZWFjaCBjb252ZXJ0ZWQgY29kZVxyXG4gICAgICAgICAqICBwb2ludC5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1dGZ4LlVURjE2dG9VVEY4ID0gZnVuY3Rpb24oc3JjLCBkc3QpIHtcclxuICAgICAgICAgICAgdmFyIGMxLCBjMiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGMxID0gYzIgIT09IG51bGwgPyBjMiA6IHNyYygpKSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmIChjMSA+PSAweEQ4MDAgJiYgYzEgPD0gMHhERkZGKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjMiA9IHNyYygpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYzIgPj0gMHhEQzAwICYmIGMyIDw9IDB4REZGRikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHN0KChjMS0weEQ4MDApKjB4NDAwK2MyLTB4REMwMCsweDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMyID0gbnVsbDsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkc3QoYzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjMiAhPT0gbnVsbCkgZHN0KGMyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBVVEY4IGNvZGUgcG9pbnRzIHRvIFVURjE2IGNoYXJhY3RlcnMuXHJcbiAgICAgICAgICogQHBhcmFtIHsoIWZ1bmN0aW9uKCk6bnVtYmVyfG51bGwpIHwgbnVtYmVyfSBzcmMgQ29kZSBwb2ludHMgc291cmNlLCBlaXRoZXIgYXMgYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG5leHQgY29kZSBwb2ludFxyXG4gICAgICAgICAqICByZXNwZWN0aXZlbHkgYG51bGxgIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNvZGUgcG9pbnRzIGxlZnQgb3IgYSBzaW5nbGUgbnVtZXJpYyBjb2RlIHBvaW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7IWZ1bmN0aW9uKG51bWJlcil9IGRzdCBDaGFyYWN0ZXJzIGRlc3RpbmF0aW9uIGFzIGEgZnVuY3Rpb24gc3VjY2Vzc2l2ZWx5IGNhbGxlZCB3aXRoIGVhY2ggY29udmVydGVkIGNoYXIgY29kZS5cclxuICAgICAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBhIGNvZGUgcG9pbnQgaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXRmeC5VVEY4dG9VVEYxNiA9IGZ1bmN0aW9uKHNyYywgZHN0KSB7XHJcbiAgICAgICAgICAgIHZhciBjcCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3JjID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgIGNwID0gc3JjLCBzcmMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG51bGw7IH07XHJcbiAgICAgICAgICAgIHdoaWxlIChjcCAhPT0gbnVsbCB8fCAoY3AgPSBzcmMoKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjcCA8PSAweEZGRkYpXHJcbiAgICAgICAgICAgICAgICAgICAgZHN0KGNwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjcCAtPSAweDEwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoY3A+PjEwKSsweEQ4MDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGRzdCgoY3AlMHg0MDApKzB4REMwMCk7XHJcbiAgICAgICAgICAgICAgICBjcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhbmQgZW5jb2RlcyBVVEYxNiBjaGFyYWN0ZXJzIHRvIFVURjggYnl0ZXMuXHJcbiAgICAgICAgICogQHBhcmFtIHshZnVuY3Rpb24oKTpudW1iZXJ8bnVsbH0gc3JjIENoYXJhY3RlcnMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGNoYXIgY29kZSByZXNwZWN0aXZlbHkgYG51bGxgXHJcbiAgICAgICAgICogIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMgbGVmdC5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbihudW1iZXIpfSBkc3QgQnl0ZXMgZGVzdGluYXRpb24gYXMgYSBmdW5jdGlvbiBzdWNjZXNzaXZlbHkgY2FsbGVkIHdpdGggdGhlIG5leHQgYnl0ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1dGZ4LmVuY29kZVVURjE2dG9VVEY4ID0gZnVuY3Rpb24oc3JjLCBkc3QpIHtcclxuICAgICAgICAgICAgdXRmeC5VVEYxNnRvVVRGOChzcmMsIGZ1bmN0aW9uKGNwKSB7XHJcbiAgICAgICAgICAgICAgICB1dGZ4LmVuY29kZVVURjgoY3AsIGRzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYW5kIGNvbnZlcnRzIFVURjggYnl0ZXMgdG8gVVRGMTYgY2hhcmFjdGVycy5cclxuICAgICAgICAgKiBAcGFyYW0geyFmdW5jdGlvbigpOm51bWJlcnxudWxsfSBzcmMgQnl0ZXMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGJ5dGUgcmVzcGVjdGl2ZWx5IGBudWxsYCBpZiB0aGVyZVxyXG4gICAgICAgICAqICBhcmUgbm8gbW9yZSBieXRlcyBsZWZ0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7IWZ1bmN0aW9uKG51bWJlcil9IGRzdCBDaGFyYWN0ZXJzIGRlc3RpbmF0aW9uIGFzIGEgZnVuY3Rpb24gc3VjY2Vzc2l2ZWx5IGNhbGxlZCB3aXRoIGVhY2ggY29udmVydGVkIGNoYXIgY29kZS5cclxuICAgICAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBhIHN0YXJ0aW5nIGJ5dGUgaXMgaW52YWxpZCBpbiBVVEY4XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsYXN0IHNlcXVlbmNlIGlzIHRydW5jYXRlZC4gSGFzIGFuIGFycmF5IHByb3BlcnR5IGBieXRlc2AgaG9sZGluZyB0aGUgcmVtYWluaW5nIGJ5dGVzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHV0ZnguZGVjb2RlVVRGOHRvVVRGMTYgPSBmdW5jdGlvbihzcmMsIGRzdCkge1xyXG4gICAgICAgICAgICB1dGZ4LmRlY29kZVVURjgoc3JjLCBmdW5jdGlvbihjcCkge1xyXG4gICAgICAgICAgICAgICAgdXRmeC5VVEY4dG9VVEYxNihjcCwgZHN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYW4gVVRGOCBjb2RlIHBvaW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjcCBVVEY4IGNvZGUgcG9pbnRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHV0ZnguY2FsY3VsYXRlQ29kZVBvaW50ID0gZnVuY3Rpb24oY3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIChjcCA8IDB4ODApID8gMSA6IChjcCA8IDB4ODAwKSA/IDIgOiAoY3AgPCAweDEwMDAwKSA/IDMgOiA0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBVVEY4IGJ5dGVzIHJlcXVpcmVkIHRvIHN0b3JlIFVURjggY29kZSBwb2ludHMuXHJcbiAgICAgICAgICogQHBhcmFtIHsoIWZ1bmN0aW9uKCk6bnVtYmVyfG51bGwpfSBzcmMgQ29kZSBwb2ludHMgc291cmNlIGFzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBuZXh0IGNvZGUgcG9pbnQgcmVzcGVjdGl2ZWx5XHJcbiAgICAgICAgICogIGBudWxsYCBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjb2RlIHBvaW50cyBsZWZ0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgVVRGOCBieXRlcyByZXF1aXJlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHV0ZnguY2FsY3VsYXRlVVRGOCA9IGZ1bmN0aW9uKHNyYykge1xyXG4gICAgICAgICAgICB2YXIgY3AsIGw9MDtcclxuICAgICAgICAgICAgd2hpbGUgKChjcCA9IHNyYygpKSAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGwgKz0gKGNwIDwgMHg4MCkgPyAxIDogKGNwIDwgMHg4MDApID8gMiA6IChjcCA8IDB4MTAwMDApID8gMyA6IDQ7XHJcbiAgICAgICAgICAgIHJldHVybiBsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBVVEY4IGNvZGUgcG9pbnRzIHJlc3BlY3RpdmVseSBVVEY4IGJ5dGVzIHJlcXVpcmVkIHRvIHN0b3JlIFVURjE2IGNoYXIgY29kZXMuXHJcbiAgICAgICAgICogQHBhcmFtIHsoIWZ1bmN0aW9uKCk6bnVtYmVyfG51bGwpfSBzcmMgQ2hhcmFjdGVycyBzb3VyY2UgYXMgYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG5leHQgY2hhciBjb2RlIHJlc3BlY3RpdmVseVxyXG4gICAgICAgICAqICBgbnVsbGAgaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hhcmFjdGVycyBsZWZ0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IFRoZSBudW1iZXIgb2YgVVRGOCBjb2RlIHBvaW50cyBhdCBpbmRleCAwIGFuZCB0aGUgbnVtYmVyIG9mIFVURjggYnl0ZXMgcmVxdWlyZWQgYXQgaW5kZXggMS5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1dGZ4LmNhbGN1bGF0ZVVURjE2YXNVVEY4ID0gZnVuY3Rpb24oc3JjKSB7XHJcbiAgICAgICAgICAgIHZhciBuPTAsIGw9MDtcclxuICAgICAgICAgICAgdXRmeC5VVEYxNnRvVVRGOChzcmMsIGZ1bmN0aW9uKGNwKSB7XHJcbiAgICAgICAgICAgICAgICArK247IGwgKz0gKGNwIDwgMHg4MCkgPyAxIDogKGNwIDwgMHg4MDApID8gMiA6IChjcCA8IDB4MTAwMDApID8gMyA6IDQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gW24sbF07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHV0Zng7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgLy8gZW5jb2RpbmdzL3V0ZjhcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY29kZXMgdGhpcyBCeXRlQnVmZmVyJ3MgY29udGVudHMgYmV0d2VlbiB7QGxpbmsgQnl0ZUJ1ZmZlciNvZmZzZXR9IGFuZCB7QGxpbmsgQnl0ZUJ1ZmZlciNsaW1pdH0gdG8gYW4gVVRGOCBlbmNvZGVkXHJcbiAgICAgKiAgc3RyaW5nLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gSGV4IGVuY29kZWQgc3RyaW5nXHJcbiAgICAgKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgb2Zmc2V0ID4gbGltaXRgXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXJQcm90b3R5cGUudG9VVEY4ID0gZnVuY3Rpb24oYmVnaW4sIGVuZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT09ICd1bmRlZmluZWQnKSBiZWdpbiA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJykgZW5kID0gdGhpcy5saW1pdDtcclxuICAgICAgICBpZiAoIXRoaXMubm9Bc3NlcnQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiZWdpbiAhPT0gJ251bWJlcicgfHwgYmVnaW4gJSAxICE9PSAwKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgYmVnaW46IE5vdCBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICAgICAgYmVnaW4gPj4+PSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmQgIT09ICdudW1iZXInIHx8IGVuZCAlIDEgIT09IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBlbmQ6IE5vdCBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICAgICAgZW5kID4+Pj0gMDtcbiAgICAgICAgICAgIGlmIChiZWdpbiA8IDAgfHwgYmVnaW4gPiBlbmQgfHwgZW5kID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKFwiSWxsZWdhbCByYW5nZTogMCA8PSBcIitiZWdpbitcIiA8PSBcIitlbmQrXCIgPD0gXCIrdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2Q7IHRyeSB7XHJcbiAgICAgICAgICAgIHV0ZnguZGVjb2RlVVRGOHRvVVRGMTYoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4gPCBlbmQgPyB0aGlzLnZpZXdbYmVnaW4rK10gOiBudWxsO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHNkID0gc3RyaW5nRGVzdGluYXRpb24oKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoYmVnaW4gIT09IGVuZClcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoXCJJbGxlZ2FsIHJhbmdlOiBUcnVuY2F0ZWQgZGF0YSwgXCIrYmVnaW4rXCIgIT0gXCIrZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVjb2RlcyBhbiBVVEY4IGVuY29kZWQgc3RyaW5nIHRvIGEgQnl0ZUJ1ZmZlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGRlY29kZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbGl0dGxlRW5kaWFuIFdoZXRoZXIgdG8gdXNlIGxpdHRsZSBvciBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAge0BsaW5rIEJ5dGVCdWZmZXIuREVGQVVMVF9FTkRJQU59LlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gbm9Bc3NlcnQgV2hldGhlciB0byBza2lwIGFzc2VydGlvbnMgb2Ygb2Zmc2V0cyBhbmQgdmFsdWVzLiBEZWZhdWx0cyB0b1xyXG4gICAgICogIHtAbGluayBCeXRlQnVmZmVyLkRFRkFVTFRfTk9BU1NFUlR9LlxyXG4gICAgICogQHJldHVybnMgeyFCeXRlQnVmZmVyfSBCeXRlQnVmZmVyXHJcbiAgICAgKiBAZXhwb3NlXHJcbiAgICAgKi9cclxuICAgIEJ5dGVCdWZmZXIuZnJvbVVURjggPSBmdW5jdGlvbihzdHIsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcclxuICAgICAgICBpZiAoIW5vQXNzZXJ0KVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIHN0cjogTm90IGEgc3RyaW5nXCIpO1xyXG4gICAgICAgIHZhciBiYiA9IG5ldyBCeXRlQnVmZmVyKHV0ZnguY2FsY3VsYXRlVVRGMTZhc1VURjgoc3RyaW5nU291cmNlKHN0ciksIHRydWUpWzFdLCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSxcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgdXRmeC5lbmNvZGVVVEYxNnRvVVRGOChzdHJpbmdTb3VyY2Uoc3RyKSwgZnVuY3Rpb24oYikge1xyXG4gICAgICAgICAgICBiYi52aWV3W2krK10gPSBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJiLmxpbWl0ID0gaTtcclxuICAgICAgICByZXR1cm4gYmI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBCeXRlQnVmZmVyO1xyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Jyb3dzZXIvYWxnb3JpdGhtcy5qc29uJylcbiIsInZhciBDaXBoZXJCYXNlID0gcmVxdWlyZSgnY2lwaGVyLWJhc2UnKVxudmFyIGRlcyA9IHJlcXVpcmUoJ2Rlcy5qcycpXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcblxudmFyIG1vZGVzID0ge1xuICAnZGVzLWVkZTMtY2JjJzogZGVzLkNCQy5pbnN0YW50aWF0ZShkZXMuRURFKSxcbiAgJ2Rlcy1lZGUzJzogZGVzLkVERSxcbiAgJ2Rlcy1lZGUtY2JjJzogZGVzLkNCQy5pbnN0YW50aWF0ZShkZXMuRURFKSxcbiAgJ2Rlcy1lZGUnOiBkZXMuRURFLFxuICAnZGVzLWNiYyc6IGRlcy5DQkMuaW5zdGFudGlhdGUoZGVzLkRFUyksXG4gICdkZXMtZWNiJzogZGVzLkRFU1xufVxubW9kZXMuZGVzID0gbW9kZXNbJ2Rlcy1jYmMnXVxubW9kZXMuZGVzMyA9IG1vZGVzWydkZXMtZWRlMy1jYmMnXVxubW9kdWxlLmV4cG9ydHMgPSBERVNcbmluaGVyaXRzKERFUywgQ2lwaGVyQmFzZSlcbmZ1bmN0aW9uIERFUyAob3B0cykge1xuICBDaXBoZXJCYXNlLmNhbGwodGhpcylcbiAgdmFyIG1vZGVOYW1lID0gb3B0cy5tb2RlLnRvTG93ZXJDYXNlKClcbiAgdmFyIG1vZGUgPSBtb2Rlc1ttb2RlTmFtZV1cbiAgdmFyIHR5cGVcbiAgaWYgKG9wdHMuZGVjcnlwdCkge1xuICAgIHR5cGUgPSAnZGVjcnlwdCdcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gJ2VuY3J5cHQnXG4gIH1cbiAgdmFyIGtleSA9IG9wdHMua2V5XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGtleSkpIHtcbiAgICBrZXkgPSBCdWZmZXIuZnJvbShrZXkpXG4gIH1cbiAgaWYgKG1vZGVOYW1lID09PSAnZGVzLWVkZScgfHwgbW9kZU5hbWUgPT09ICdkZXMtZWRlLWNiYycpIHtcbiAgICBrZXkgPSBCdWZmZXIuY29uY2F0KFtrZXksIGtleS5zbGljZSgwLCA4KV0pXG4gIH1cbiAgdmFyIGl2ID0gb3B0cy5pdlxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihpdikpIHtcbiAgICBpdiA9IEJ1ZmZlci5mcm9tKGl2KVxuICB9XG4gIHRoaXMuX2RlcyA9IG1vZGUuY3JlYXRlKHtcbiAgICBrZXk6IGtleSxcbiAgICBpdjogaXYsXG4gICAgdHlwZTogdHlwZVxuICB9KVxufVxuREVTLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHRoaXMuX2Rlcy51cGRhdGUoZGF0YSkpXG59XG5ERVMucHJvdG90eXBlLl9maW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHRoaXMuX2Rlcy5maW5hbCgpKVxufVxuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG52YXIgeG9yID0gcmVxdWlyZSgnYnVmZmVyLXhvcicpXG5cbmZ1bmN0aW9uIGVuY3J5cHRTdGFydCAoc2VsZiwgZGF0YSwgZGVjcnlwdCkge1xuICB2YXIgbGVuID0gZGF0YS5sZW5ndGhcbiAgdmFyIG91dCA9IHhvcihkYXRhLCBzZWxmLl9jYWNoZSlcbiAgc2VsZi5fY2FjaGUgPSBzZWxmLl9jYWNoZS5zbGljZShsZW4pXG4gIHNlbGYuX3ByZXYgPSBCdWZmZXIuY29uY2F0KFtzZWxmLl9wcmV2LCBkZWNyeXB0ID8gZGF0YSA6IG91dF0pXG4gIHJldHVybiBvdXRcbn1cblxuZXhwb3J0cy5lbmNyeXB0ID0gZnVuY3Rpb24gKHNlbGYsIGRhdGEsIGRlY3J5cHQpIHtcbiAgdmFyIG91dCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKVxuICB2YXIgbGVuXG5cbiAgd2hpbGUgKGRhdGEubGVuZ3RoKSB7XG4gICAgaWYgKHNlbGYuX2NhY2hlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2VsZi5fY2FjaGUgPSBzZWxmLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHNlbGYuX3ByZXYpXG4gICAgICBzZWxmLl9wcmV2ID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG4gICAgfVxuXG4gICAgaWYgKHNlbGYuX2NhY2hlLmxlbmd0aCA8PSBkYXRhLmxlbmd0aCkge1xuICAgICAgbGVuID0gc2VsZi5fY2FjaGUubGVuZ3RoXG4gICAgICBvdXQgPSBCdWZmZXIuY29uY2F0KFtvdXQsIGVuY3J5cHRTdGFydChzZWxmLCBkYXRhLnNsaWNlKDAsIGxlbiksIGRlY3J5cHQpXSlcbiAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKGxlbilcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ID0gQnVmZmVyLmNvbmNhdChbb3V0LCBlbmNyeXB0U3RhcnQoc2VsZiwgZGF0YSwgZGVjcnlwdCldKVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0XG59XG4iLCIvLyBiYXNlZCBvbiB0aGUgYWVzIGltcGxpbWVudGF0aW9uIGluIHRyaXBsZSBzZWNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rZXliYXNlL3RyaXBsZXNlY1xuLy8gd2hpY2ggaXMgaW4gdHVybiBiYXNlZCBvbiB0aGUgb25lIGZyb20gY3J5cHRvLWpzXG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy9cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG5cbmZ1bmN0aW9uIGFzVUludDMyQXJyYXkgKGJ1Zikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG5cbiAgdmFyIGxlbiA9IChidWYubGVuZ3RoIC8gNCkgfCAwXG4gIHZhciBvdXQgPSBuZXcgQXJyYXkobGVuKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSBidWYucmVhZFVJbnQzMkJFKGkgKiA0KVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBzY3J1YlZlYyAodikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHYubGVuZ3RoOyB2KyspIHtcbiAgICB2W2ldID0gMFxuICB9XG59XG5cbmZ1bmN0aW9uIGNyeXB0QmxvY2sgKE0sIGtleVNjaGVkdWxlLCBTVUJfTUlYLCBTQk9YLCBuUm91bmRzKSB7XG4gIHZhciBTVUJfTUlYMCA9IFNVQl9NSVhbMF1cbiAgdmFyIFNVQl9NSVgxID0gU1VCX01JWFsxXVxuICB2YXIgU1VCX01JWDIgPSBTVUJfTUlYWzJdXG4gIHZhciBTVUJfTUlYMyA9IFNVQl9NSVhbM11cblxuICB2YXIgczAgPSBNWzBdIF4ga2V5U2NoZWR1bGVbMF1cbiAgdmFyIHMxID0gTVsxXSBeIGtleVNjaGVkdWxlWzFdXG4gIHZhciBzMiA9IE1bMl0gXiBrZXlTY2hlZHVsZVsyXVxuICB2YXIgczMgPSBNWzNdIF4ga2V5U2NoZWR1bGVbM11cbiAgdmFyIHQwLCB0MSwgdDIsIHQzXG4gIHZhciBrc1JvdyA9IDRcblxuICBmb3IgKHZhciByb3VuZCA9IDE7IHJvdW5kIDwgblJvdW5kczsgcm91bmQrKykge1xuICAgIHQwID0gU1VCX01JWDBbczAgPj4+IDI0XSBeIFNVQl9NSVgxWyhzMSA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYMlsoczIgPj4+IDgpICYgMHhmZl0gXiBTVUJfTUlYM1tzMyAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK11cbiAgICB0MSA9IFNVQl9NSVgwW3MxID4+PiAyNF0gXiBTVUJfTUlYMVsoczIgPj4+IDE2KSAmIDB4ZmZdIF4gU1VCX01JWDJbKHMzID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWDNbczAgJiAweGZmXSBeIGtleVNjaGVkdWxlW2tzUm93KytdXG4gICAgdDIgPSBTVUJfTUlYMFtzMiA+Pj4gMjRdIF4gU1VCX01JWDFbKHMzID4+PiAxNikgJiAweGZmXSBeIFNVQl9NSVgyWyhzMCA+Pj4gOCkgJiAweGZmXSBeIFNVQl9NSVgzW3MxICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXVxuICAgIHQzID0gU1VCX01JWDBbczMgPj4+IDI0XSBeIFNVQl9NSVgxWyhzMCA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYMlsoczEgPj4+IDgpICYgMHhmZl0gXiBTVUJfTUlYM1tzMiAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK11cbiAgICBzMCA9IHQwXG4gICAgczEgPSB0MVxuICAgIHMyID0gdDJcbiAgICBzMyA9IHQzXG4gIH1cblxuICB0MCA9ICgoU0JPWFtzMCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMSA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMyID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMyAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdXG4gIHQxID0gKChTQk9YW3MxID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHMyID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsoczMgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3MwICYgMHhmZl0pIF4ga2V5U2NoZWR1bGVba3NSb3crK11cbiAgdDIgPSAoKFNCT1hbczIgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczMgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMCA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczEgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXVxuICB0MyA9ICgoU0JPWFtzMyA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMxID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMiAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdXG4gIHQwID0gdDAgPj4+IDBcbiAgdDEgPSB0MSA+Pj4gMFxuICB0MiA9IHQyID4+PiAwXG4gIHQzID0gdDMgPj4+IDBcblxuICByZXR1cm4gW3QwLCB0MSwgdDIsIHQzXVxufVxuXG4vLyBBRVMgY29uc3RhbnRzXG52YXIgUkNPTiA9IFsweDAwLCAweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFiLCAweDM2XVxudmFyIEcgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBDb21wdXRlIGRvdWJsZSB0YWJsZVxuICB2YXIgZCA9IG5ldyBBcnJheSgyNTYpXG4gIGZvciAodmFyIGogPSAwOyBqIDwgMjU2OyBqKyspIHtcbiAgICBpZiAoaiA8IDEyOCkge1xuICAgICAgZFtqXSA9IGogPDwgMVxuICAgIH0gZWxzZSB7XG4gICAgICBkW2pdID0gKGogPDwgMSkgXiAweDExYlxuICAgIH1cbiAgfVxuXG4gIHZhciBTQk9YID0gW11cbiAgdmFyIElOVl9TQk9YID0gW11cbiAgdmFyIFNVQl9NSVggPSBbW10sIFtdLCBbXSwgW11dXG4gIHZhciBJTlZfU1VCX01JWCA9IFtbXSwgW10sIFtdLCBbXV1cblxuICAvLyBXYWxrIEdGKDJeOClcbiAgdmFyIHggPSAwXG4gIHZhciB4aSA9IDBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgIC8vIENvbXB1dGUgc2JveFxuICAgIHZhciBzeCA9IHhpIF4gKHhpIDw8IDEpIF4gKHhpIDw8IDIpIF4gKHhpIDw8IDMpIF4gKHhpIDw8IDQpXG4gICAgc3ggPSAoc3ggPj4+IDgpIF4gKHN4ICYgMHhmZikgXiAweDYzXG4gICAgU0JPWFt4XSA9IHN4XG4gICAgSU5WX1NCT1hbc3hdID0geFxuXG4gICAgLy8gQ29tcHV0ZSBtdWx0aXBsaWNhdGlvblxuICAgIHZhciB4MiA9IGRbeF1cbiAgICB2YXIgeDQgPSBkW3gyXVxuICAgIHZhciB4OCA9IGRbeDRdXG5cbiAgICAvLyBDb21wdXRlIHN1YiBieXRlcywgbWl4IGNvbHVtbnMgdGFibGVzXG4gICAgdmFyIHQgPSAoZFtzeF0gKiAweDEwMSkgXiAoc3ggKiAweDEwMTAxMDApXG4gICAgU1VCX01JWFswXVt4XSA9ICh0IDw8IDI0KSB8ICh0ID4+PiA4KVxuICAgIFNVQl9NSVhbMV1beF0gPSAodCA8PCAxNikgfCAodCA+Pj4gMTYpXG4gICAgU1VCX01JWFsyXVt4XSA9ICh0IDw8IDgpIHwgKHQgPj4+IDI0KVxuICAgIFNVQl9NSVhbM11beF0gPSB0XG5cbiAgICAvLyBDb21wdXRlIGludiBzdWIgYnl0ZXMsIGludiBtaXggY29sdW1ucyB0YWJsZXNcbiAgICB0ID0gKHg4ICogMHgxMDEwMTAxKSBeICh4NCAqIDB4MTAwMDEpIF4gKHgyICogMHgxMDEpIF4gKHggKiAweDEwMTAxMDApXG4gICAgSU5WX1NVQl9NSVhbMF1bc3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpXG4gICAgSU5WX1NVQl9NSVhbMV1bc3hdID0gKHQgPDwgMTYpIHwgKHQgPj4+IDE2KVxuICAgIElOVl9TVUJfTUlYWzJdW3N4XSA9ICh0IDw8IDgpIHwgKHQgPj4+IDI0KVxuICAgIElOVl9TVUJfTUlYWzNdW3N4XSA9IHRcblxuICAgIGlmICh4ID09PSAwKSB7XG4gICAgICB4ID0geGkgPSAxXG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSB4MiBeIGRbZFtkW3g4IF4geDJdXV1cbiAgICAgIHhpIF49IGRbZFt4aV1dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBTQk9YOiBTQk9YLFxuICAgIElOVl9TQk9YOiBJTlZfU0JPWCxcbiAgICBTVUJfTUlYOiBTVUJfTUlYLFxuICAgIElOVl9TVUJfTUlYOiBJTlZfU1VCX01JWFxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIEFFUyAoa2V5KSB7XG4gIHRoaXMuX2tleSA9IGFzVUludDMyQXJyYXkoa2V5KVxuICB0aGlzLl9yZXNldCgpXG59XG5cbkFFUy5ibG9ja1NpemUgPSA0ICogNFxuQUVTLmtleVNpemUgPSAyNTYgLyA4XG5BRVMucHJvdG90eXBlLmJsb2NrU2l6ZSA9IEFFUy5ibG9ja1NpemVcbkFFUy5wcm90b3R5cGUua2V5U2l6ZSA9IEFFUy5rZXlTaXplXG5BRVMucHJvdG90eXBlLl9yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGtleVdvcmRzID0gdGhpcy5fa2V5XG4gIHZhciBrZXlTaXplID0ga2V5V29yZHMubGVuZ3RoXG4gIHZhciBuUm91bmRzID0ga2V5U2l6ZSArIDZcbiAgdmFyIGtzUm93cyA9IChuUm91bmRzICsgMSkgKiA0XG5cbiAgdmFyIGtleVNjaGVkdWxlID0gW11cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBrZXlTaXplOyBrKyspIHtcbiAgICBrZXlTY2hlZHVsZVtrXSA9IGtleVdvcmRzW2tdXG4gIH1cblxuICBmb3IgKGsgPSBrZXlTaXplOyBrIDwga3NSb3dzOyBrKyspIHtcbiAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2sgLSAxXVxuXG4gICAgaWYgKGsgJSBrZXlTaXplID09PSAwKSB7XG4gICAgICB0ID0gKHQgPDwgOCkgfCAodCA+Pj4gMjQpXG4gICAgICB0ID1cbiAgICAgICAgKEcuU0JPWFt0ID4+PiAyNF0gPDwgMjQpIHxcbiAgICAgICAgKEcuU0JPWFsodCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHxcbiAgICAgICAgKEcuU0JPWFsodCA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8XG4gICAgICAgIChHLlNCT1hbdCAmIDB4ZmZdKVxuXG4gICAgICB0IF49IFJDT05bKGsgLyBrZXlTaXplKSB8IDBdIDw8IDI0XG4gICAgfSBlbHNlIGlmIChrZXlTaXplID4gNiAmJiBrICUga2V5U2l6ZSA9PT0gNCkge1xuICAgICAgdCA9XG4gICAgICAgIChHLlNCT1hbdCA+Pj4gMjRdIDw8IDI0KSB8XG4gICAgICAgIChHLlNCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8XG4gICAgICAgIChHLlNCT1hbKHQgPj4+IDgpICYgMHhmZl0gPDwgOCkgfFxuICAgICAgICAoRy5TQk9YW3QgJiAweGZmXSlcbiAgICB9XG5cbiAgICBrZXlTY2hlZHVsZVtrXSA9IGtleVNjaGVkdWxlW2sgLSBrZXlTaXplXSBeIHRcbiAgfVxuXG4gIHZhciBpbnZLZXlTY2hlZHVsZSA9IFtdXG4gIGZvciAodmFyIGlrID0gMDsgaWsgPCBrc1Jvd3M7IGlrKyspIHtcbiAgICB2YXIga3NSID0ga3NSb3dzIC0gaWtcbiAgICB2YXIgdHQgPSBrZXlTY2hlZHVsZVtrc1IgLSAoaWsgJSA0ID8gMCA6IDQpXVxuXG4gICAgaWYgKGlrIDwgNCB8fCBrc1IgPD0gNCkge1xuICAgICAgaW52S2V5U2NoZWR1bGVbaWtdID0gdHRcbiAgICB9IGVsc2Uge1xuICAgICAgaW52S2V5U2NoZWR1bGVbaWtdID1cbiAgICAgICAgRy5JTlZfU1VCX01JWFswXVtHLlNCT1hbdHQgPj4+IDI0XV0gXlxuICAgICAgICBHLklOVl9TVUJfTUlYWzFdW0cuU0JPWFsodHQgPj4+IDE2KSAmIDB4ZmZdXSBeXG4gICAgICAgIEcuSU5WX1NVQl9NSVhbMl1bRy5TQk9YWyh0dCA+Pj4gOCkgJiAweGZmXV0gXlxuICAgICAgICBHLklOVl9TVUJfTUlYWzNdW0cuU0JPWFt0dCAmIDB4ZmZdXVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX25Sb3VuZHMgPSBuUm91bmRzXG4gIHRoaXMuX2tleVNjaGVkdWxlID0ga2V5U2NoZWR1bGVcbiAgdGhpcy5faW52S2V5U2NoZWR1bGUgPSBpbnZLZXlTY2hlZHVsZVxufVxuXG5BRVMucHJvdG90eXBlLmVuY3J5cHRCbG9ja1JhdyA9IGZ1bmN0aW9uIChNKSB7XG4gIE0gPSBhc1VJbnQzMkFycmF5KE0pXG4gIHJldHVybiBjcnlwdEJsb2NrKE0sIHRoaXMuX2tleVNjaGVkdWxlLCBHLlNVQl9NSVgsIEcuU0JPWCwgdGhpcy5fblJvdW5kcylcbn1cblxuQUVTLnByb3RvdHlwZS5lbmNyeXB0QmxvY2sgPSBmdW5jdGlvbiAoTSkge1xuICB2YXIgb3V0ID0gdGhpcy5lbmNyeXB0QmxvY2tSYXcoTSlcbiAgdmFyIGJ1ZiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgxNilcbiAgYnVmLndyaXRlVUludDMyQkUob3V0WzBdLCAwKVxuICBidWYud3JpdGVVSW50MzJCRShvdXRbMV0sIDQpXG4gIGJ1Zi53cml0ZVVJbnQzMkJFKG91dFsyXSwgOClcbiAgYnVmLndyaXRlVUludDMyQkUob3V0WzNdLCAxMilcbiAgcmV0dXJuIGJ1ZlxufVxuXG5BRVMucHJvdG90eXBlLmRlY3J5cHRCbG9jayA9IGZ1bmN0aW9uIChNKSB7XG4gIE0gPSBhc1VJbnQzMkFycmF5KE0pXG5cbiAgLy8gc3dhcFxuICB2YXIgbTEgPSBNWzFdXG4gIE1bMV0gPSBNWzNdXG4gIE1bM10gPSBtMVxuXG4gIHZhciBvdXQgPSBjcnlwdEJsb2NrKE0sIHRoaXMuX2ludktleVNjaGVkdWxlLCBHLklOVl9TVUJfTUlYLCBHLklOVl9TQk9YLCB0aGlzLl9uUm91bmRzKVxuICB2YXIgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDE2KVxuICBidWYud3JpdGVVSW50MzJCRShvdXRbMF0sIDApXG4gIGJ1Zi53cml0ZVVJbnQzMkJFKG91dFszXSwgNClcbiAgYnVmLndyaXRlVUludDMyQkUob3V0WzJdLCA4KVxuICBidWYud3JpdGVVSW50MzJCRShvdXRbMV0sIDEyKVxuICByZXR1cm4gYnVmXG59XG5cbkFFUy5wcm90b3R5cGUuc2NydWIgPSBmdW5jdGlvbiAoKSB7XG4gIHNjcnViVmVjKHRoaXMuX2tleVNjaGVkdWxlKVxuICBzY3J1YlZlYyh0aGlzLl9pbnZLZXlTY2hlZHVsZSlcbiAgc2NydWJWZWModGhpcy5fa2V5KVxufVxuXG5tb2R1bGUuZXhwb3J0cy5BRVMgPSBBRVNcbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxudmFyIFpFUk9FUyA9IEJ1ZmZlci5hbGxvYygxNiwgMClcblxuZnVuY3Rpb24gdG9BcnJheSAoYnVmKSB7XG4gIHJldHVybiBbXG4gICAgYnVmLnJlYWRVSW50MzJCRSgwKSxcbiAgICBidWYucmVhZFVJbnQzMkJFKDQpLFxuICAgIGJ1Zi5yZWFkVUludDMyQkUoOCksXG4gICAgYnVmLnJlYWRVSW50MzJCRSgxMilcbiAgXVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXkgKG91dCkge1xuICB2YXIgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDE2KVxuICBidWYud3JpdGVVSW50MzJCRShvdXRbMF0gPj4+IDAsIDApXG4gIGJ1Zi53cml0ZVVJbnQzMkJFKG91dFsxXSA+Pj4gMCwgNClcbiAgYnVmLndyaXRlVUludDMyQkUob3V0WzJdID4+PiAwLCA4KVxuICBidWYud3JpdGVVSW50MzJCRShvdXRbM10gPj4+IDAsIDEyKVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIEdIQVNIIChrZXkpIHtcbiAgdGhpcy5oID0ga2V5XG4gIHRoaXMuc3RhdGUgPSBCdWZmZXIuYWxsb2MoMTYsIDApXG4gIHRoaXMuY2FjaGUgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMClcbn1cblxuLy8gZnJvbSBodHRwOi8vYml0d2lzZXNoaWZ0bGVmdC5naXRodWIuaW8vc2pjbC9kb2Mvc3ltYm9scy9zcmMvY29yZV9nY20uanMuaHRtbFxuLy8gYnkgSnVobyBWw6Row6QtSGVydHR1YVxuR0hBU0gucHJvdG90eXBlLmdoYXNoID0gZnVuY3Rpb24gKGJsb2NrKSB7XG4gIHZhciBpID0gLTFcbiAgd2hpbGUgKCsraSA8IGJsb2NrLmxlbmd0aCkge1xuICAgIHRoaXMuc3RhdGVbaV0gXj0gYmxvY2tbaV1cbiAgfVxuICB0aGlzLl9tdWx0aXBseSgpXG59XG5cbkdIQVNILnByb3RvdHlwZS5fbXVsdGlwbHkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBWaSA9IHRvQXJyYXkodGhpcy5oKVxuICB2YXIgWmkgPSBbMCwgMCwgMCwgMF1cbiAgdmFyIGosIHhpLCBsc2JWaVxuICB2YXIgaSA9IC0xXG4gIHdoaWxlICgrK2kgPCAxMjgpIHtcbiAgICB4aSA9ICh0aGlzLnN0YXRlW35+KGkgLyA4KV0gJiAoMSA8PCAoNyAtIChpICUgOCkpKSkgIT09IDBcbiAgICBpZiAoeGkpIHtcbiAgICAgIC8vIFpfaSsxID0gWl9pIF4gVl9pXG4gICAgICBaaVswXSBePSBWaVswXVxuICAgICAgWmlbMV0gXj0gVmlbMV1cbiAgICAgIFppWzJdIF49IFZpWzJdXG4gICAgICBaaVszXSBePSBWaVszXVxuICAgIH1cblxuICAgIC8vIFN0b3JlIHRoZSB2YWx1ZSBvZiBMU0IoVl9pKVxuICAgIGxzYlZpID0gKFZpWzNdICYgMSkgIT09IDBcblxuICAgIC8vIFZfaSsxID0gVl9pID4+IDFcbiAgICBmb3IgKGogPSAzOyBqID4gMDsgai0tKSB7XG4gICAgICBWaVtqXSA9IChWaVtqXSA+Pj4gMSkgfCAoKFZpW2ogLSAxXSAmIDEpIDw8IDMxKVxuICAgIH1cbiAgICBWaVswXSA9IFZpWzBdID4+PiAxXG5cbiAgICAvLyBJZiBMU0IoVl9pKSBpcyAxLCBWX2krMSA9IChWX2kgPj4gMSkgXiBSXG4gICAgaWYgKGxzYlZpKSB7XG4gICAgICBWaVswXSA9IFZpWzBdIF4gKDB4ZTEgPDwgMjQpXG4gICAgfVxuICB9XG4gIHRoaXMuc3RhdGUgPSBmcm9tQXJyYXkoWmkpXG59XG5cbkdIQVNILnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIHRoaXMuY2FjaGUgPSBCdWZmZXIuY29uY2F0KFt0aGlzLmNhY2hlLCBidWZdKVxuICB2YXIgY2h1bmtcbiAgd2hpbGUgKHRoaXMuY2FjaGUubGVuZ3RoID49IDE2KSB7XG4gICAgY2h1bmsgPSB0aGlzLmNhY2hlLnNsaWNlKDAsIDE2KVxuICAgIHRoaXMuY2FjaGUgPSB0aGlzLmNhY2hlLnNsaWNlKDE2KVxuICAgIHRoaXMuZ2hhc2goY2h1bmspXG4gIH1cbn1cblxuR0hBU0gucHJvdG90eXBlLmZpbmFsID0gZnVuY3Rpb24gKGFibCwgYmwpIHtcbiAgaWYgKHRoaXMuY2FjaGUubGVuZ3RoKSB7XG4gICAgdGhpcy5naGFzaChCdWZmZXIuY29uY2F0KFt0aGlzLmNhY2hlLCBaRVJPRVNdLCAxNikpXG4gIH1cblxuICB0aGlzLmdoYXNoKGZyb21BcnJheShbMCwgYWJsLCAwLCBibF0pKVxuICByZXR1cm4gdGhpcy5zdGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdIQVNIXG4iLCJ2YXIgQXV0aENpcGhlciA9IHJlcXVpcmUoJy4vYXV0aENpcGhlcicpXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcbnZhciBNT0RFUyA9IHJlcXVpcmUoJy4vbW9kZXMnKVxudmFyIFN0cmVhbUNpcGhlciA9IHJlcXVpcmUoJy4vc3RyZWFtQ2lwaGVyJylcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdjaXBoZXItYmFzZScpXG52YXIgYWVzID0gcmVxdWlyZSgnLi9hZXMnKVxudmFyIGVidGsgPSByZXF1aXJlKCdldnBfYnl0ZXN0b2tleScpXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG5cbmZ1bmN0aW9uIERlY2lwaGVyIChtb2RlLCBrZXksIGl2KSB7XG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMpXG5cbiAgdGhpcy5fY2FjaGUgPSBuZXcgU3BsaXR0ZXIoKVxuICB0aGlzLl9sYXN0ID0gdm9pZCAwXG4gIHRoaXMuX2NpcGhlciA9IG5ldyBhZXMuQUVTKGtleSlcbiAgdGhpcy5fcHJldiA9IEJ1ZmZlci5mcm9tKGl2KVxuICB0aGlzLl9tb2RlID0gbW9kZVxuICB0aGlzLl9hdXRvcGFkZGluZyA9IHRydWVcbn1cblxuaW5oZXJpdHMoRGVjaXBoZXIsIFRyYW5zZm9ybSlcblxuRGVjaXBoZXIucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLl9jYWNoZS5hZGQoZGF0YSlcbiAgdmFyIGNodW5rXG4gIHZhciB0aGluZ1xuICB2YXIgb3V0ID0gW11cbiAgd2hpbGUgKChjaHVuayA9IHRoaXMuX2NhY2hlLmdldCh0aGlzLl9hdXRvcGFkZGluZykpKSB7XG4gICAgdGhpbmcgPSB0aGlzLl9tb2RlLmRlY3J5cHQodGhpcywgY2h1bmspXG4gICAgb3V0LnB1c2godGhpbmcpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQob3V0KVxufVxuXG5EZWNpcGhlci5wcm90b3R5cGUuX2ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2h1bmsgPSB0aGlzLl9jYWNoZS5mbHVzaCgpXG4gIGlmICh0aGlzLl9hdXRvcGFkZGluZykge1xuICAgIHJldHVybiB1bnBhZCh0aGlzLl9tb2RlLmRlY3J5cHQodGhpcywgY2h1bmspKVxuICB9IGVsc2UgaWYgKGNodW5rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIG5vdCBtdWx0aXBsZSBvZiBibG9jayBsZW5ndGgnKVxuICB9XG59XG5cbkRlY2lwaGVyLnByb3RvdHlwZS5zZXRBdXRvUGFkZGluZyA9IGZ1bmN0aW9uIChzZXRUbykge1xuICB0aGlzLl9hdXRvcGFkZGluZyA9ICEhc2V0VG9cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gU3BsaXR0ZXIgKCkge1xuICB0aGlzLmNhY2hlID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG59XG5cblNwbGl0dGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmNhY2hlID0gQnVmZmVyLmNvbmNhdChbdGhpcy5jYWNoZSwgZGF0YV0pXG59XG5cblNwbGl0dGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoYXV0b1BhZGRpbmcpIHtcbiAgdmFyIG91dFxuICBpZiAoYXV0b1BhZGRpbmcpIHtcbiAgICBpZiAodGhpcy5jYWNoZS5sZW5ndGggPiAxNikge1xuICAgICAgb3V0ID0gdGhpcy5jYWNoZS5zbGljZSgwLCAxNilcbiAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLmNhY2hlLnNsaWNlKDE2KVxuICAgICAgcmV0dXJuIG91dFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5jYWNoZS5sZW5ndGggPj0gMTYpIHtcbiAgICAgIG91dCA9IHRoaXMuY2FjaGUuc2xpY2UoMCwgMTYpXG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5jYWNoZS5zbGljZSgxNilcbiAgICAgIHJldHVybiBvdXRcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5TcGxpdHRlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNhY2hlLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2FjaGVcbn1cblxuZnVuY3Rpb24gdW5wYWQgKGxhc3QpIHtcbiAgdmFyIHBhZGRlZCA9IGxhc3RbMTVdXG4gIGlmIChwYWRkZWQgPCAxIHx8IHBhZGRlZCA+IDE2KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gZGVjcnlwdCBkYXRhJylcbiAgfVxuICB2YXIgaSA9IC0xXG4gIHdoaWxlICgrK2kgPCBwYWRkZWQpIHtcbiAgICBpZiAobGFzdFsoaSArICgxNiAtIHBhZGRlZCkpXSAhPT0gcGFkZGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBkZWNyeXB0IGRhdGEnKVxuICAgIH1cbiAgfVxuICBpZiAocGFkZGVkID09PSAxNikgcmV0dXJuXG5cbiAgcmV0dXJuIGxhc3Quc2xpY2UoMCwgMTYgLSBwYWRkZWQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlY2lwaGVyaXYgKHN1aXRlLCBwYXNzd29yZCwgaXYpIHtcbiAgdmFyIGNvbmZpZyA9IE1PREVTW3N1aXRlLnRvTG93ZXJDYXNlKCldXG4gIGlmICghY29uZmlnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHN1aXRlIHR5cGUnKVxuXG4gIGlmICh0eXBlb2YgaXYgPT09ICdzdHJpbmcnKSBpdiA9IEJ1ZmZlci5mcm9tKGl2KVxuICBpZiAoY29uZmlnLm1vZGUgIT09ICdHQ00nICYmIGl2Lmxlbmd0aCAhPT0gY29uZmlnLml2KSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIGl2IGxlbmd0aCAnICsgaXYubGVuZ3RoKVxuXG4gIGlmICh0eXBlb2YgcGFzc3dvcmQgPT09ICdzdHJpbmcnKSBwYXNzd29yZCA9IEJ1ZmZlci5mcm9tKHBhc3N3b3JkKVxuICBpZiAocGFzc3dvcmQubGVuZ3RoICE9PSBjb25maWcua2V5IC8gOCkgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBrZXkgbGVuZ3RoICcgKyBwYXNzd29yZC5sZW5ndGgpXG5cbiAgaWYgKGNvbmZpZy50eXBlID09PSAnc3RyZWFtJykge1xuICAgIHJldHVybiBuZXcgU3RyZWFtQ2lwaGVyKGNvbmZpZy5tb2R1bGUsIHBhc3N3b3JkLCBpdiwgdHJ1ZSlcbiAgfSBlbHNlIGlmIChjb25maWcudHlwZSA9PT0gJ2F1dGgnKSB7XG4gICAgcmV0dXJuIG5ldyBBdXRoQ2lwaGVyKGNvbmZpZy5tb2R1bGUsIHBhc3N3b3JkLCBpdiwgdHJ1ZSlcbiAgfVxuXG4gIHJldHVybiBuZXcgRGVjaXBoZXIoY29uZmlnLm1vZHVsZSwgcGFzc3dvcmQsIGl2KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEZWNpcGhlciAoc3VpdGUsIHBhc3N3b3JkKSB7XG4gIHZhciBjb25maWcgPSBNT0RFU1tzdWl0ZS50b0xvd2VyQ2FzZSgpXVxuICBpZiAoIWNvbmZpZykgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBzdWl0ZSB0eXBlJylcblxuICB2YXIga2V5cyA9IGVidGsocGFzc3dvcmQsIGZhbHNlLCBjb25maWcua2V5LCBjb25maWcuaXYpXG4gIHJldHVybiBjcmVhdGVEZWNpcGhlcml2KHN1aXRlLCBrZXlzLmtleSwga2V5cy5pdilcbn1cblxuZXhwb3J0cy5jcmVhdGVEZWNpcGhlciA9IGNyZWF0ZURlY2lwaGVyXG5leHBvcnRzLmNyZWF0ZURlY2lwaGVyaXYgPSBjcmVhdGVEZWNpcGhlcml2XG4iLCJ2YXIgeG9yID0gcmVxdWlyZSgnYnVmZmVyLXhvcicpXG5cbmZ1bmN0aW9uIGdldEJsb2NrIChzZWxmKSB7XG4gIHNlbGYuX3ByZXYgPSBzZWxmLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHNlbGYuX3ByZXYpXG4gIHJldHVybiBzZWxmLl9wcmV2XG59XG5cbmV4cG9ydHMuZW5jcnlwdCA9IGZ1bmN0aW9uIChzZWxmLCBjaHVuaykge1xuICB3aGlsZSAoc2VsZi5fY2FjaGUubGVuZ3RoIDwgY2h1bmsubGVuZ3RoKSB7XG4gICAgc2VsZi5fY2FjaGUgPSBCdWZmZXIuY29uY2F0KFtzZWxmLl9jYWNoZSwgZ2V0QmxvY2soc2VsZildKVxuICB9XG5cbiAgdmFyIHBhZCA9IHNlbGYuX2NhY2hlLnNsaWNlKDAsIGNodW5rLmxlbmd0aClcbiAgc2VsZi5fY2FjaGUgPSBzZWxmLl9jYWNoZS5zbGljZShjaHVuay5sZW5ndGgpXG4gIHJldHVybiB4b3IoY2h1bmssIHBhZClcbn1cbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxuXG5mdW5jdGlvbiBlbmNyeXB0Qnl0ZSAoc2VsZiwgYnl0ZVBhcmFtLCBkZWNyeXB0KSB7XG4gIHZhciBwYWRcbiAgdmFyIGkgPSAtMVxuICB2YXIgbGVuID0gOFxuICB2YXIgb3V0ID0gMFxuICB2YXIgYml0LCB2YWx1ZVxuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgcGFkID0gc2VsZi5fY2lwaGVyLmVuY3J5cHRCbG9jayhzZWxmLl9wcmV2KVxuICAgIGJpdCA9IChieXRlUGFyYW0gJiAoMSA8PCAoNyAtIGkpKSkgPyAweDgwIDogMFxuICAgIHZhbHVlID0gcGFkWzBdIF4gYml0XG4gICAgb3V0ICs9ICgodmFsdWUgJiAweDgwKSA+PiAoaSAlIDgpKVxuICAgIHNlbGYuX3ByZXYgPSBzaGlmdEluKHNlbGYuX3ByZXYsIGRlY3J5cHQgPyBiaXQgOiB2YWx1ZSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHNoaWZ0SW4gKGJ1ZmZlciwgdmFsdWUpIHtcbiAgdmFyIGxlbiA9IGJ1ZmZlci5sZW5ndGhcbiAgdmFyIGkgPSAtMVxuICB2YXIgb3V0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKGJ1ZmZlci5sZW5ndGgpXG4gIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2J1ZmZlciwgQnVmZmVyLmZyb20oW3ZhbHVlXSldKVxuXG4gIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICBvdXRbaV0gPSBidWZmZXJbaV0gPDwgMSB8IGJ1ZmZlcltpICsgMV0gPj4gKDcpXG4gIH1cblxuICByZXR1cm4gb3V0XG59XG5cbmV4cG9ydHMuZW5jcnlwdCA9IGZ1bmN0aW9uIChzZWxmLCBjaHVuaywgZGVjcnlwdCkge1xuICB2YXIgbGVuID0gY2h1bmsubGVuZ3RoXG4gIHZhciBvdXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuKVxuICB2YXIgaSA9IC0xXG5cbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIG91dFtpXSA9IGVuY3J5cHRCeXRlKHNlbGYsIGNodW5rW2ldLCBkZWNyeXB0KVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG5cbmZ1bmN0aW9uIGVuY3J5cHRCeXRlIChzZWxmLCBieXRlUGFyYW0sIGRlY3J5cHQpIHtcbiAgdmFyIHBhZCA9IHNlbGYuX2NpcGhlci5lbmNyeXB0QmxvY2soc2VsZi5fcHJldilcbiAgdmFyIG91dCA9IHBhZFswXSBeIGJ5dGVQYXJhbVxuXG4gIHNlbGYuX3ByZXYgPSBCdWZmZXIuY29uY2F0KFtcbiAgICBzZWxmLl9wcmV2LnNsaWNlKDEpLFxuICAgIEJ1ZmZlci5mcm9tKFtkZWNyeXB0ID8gYnl0ZVBhcmFtIDogb3V0XSlcbiAgXSlcblxuICByZXR1cm4gb3V0XG59XG5cbmV4cG9ydHMuZW5jcnlwdCA9IGZ1bmN0aW9uIChzZWxmLCBjaHVuaywgZGVjcnlwdCkge1xuICB2YXIgbGVuID0gY2h1bmsubGVuZ3RoXG4gIHZhciBvdXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuKVxuICB2YXIgaSA9IC0xXG5cbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIG91dFtpXSA9IGVuY3J5cHRCeXRlKHNlbGYsIGNodW5rW2ldLCBkZWNyeXB0KVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuIiwidmFyIHhvciA9IHJlcXVpcmUoJ2J1ZmZlci14b3InKVxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG52YXIgaW5jcjMyID0gcmVxdWlyZSgnLi4vaW5jcjMyJylcblxuZnVuY3Rpb24gZ2V0QmxvY2sgKHNlbGYpIHtcbiAgdmFyIG91dCA9IHNlbGYuX2NpcGhlci5lbmNyeXB0QmxvY2tSYXcoc2VsZi5fcHJldilcbiAgaW5jcjMyKHNlbGYuX3ByZXYpXG4gIHJldHVybiBvdXRcbn1cblxudmFyIGJsb2NrU2l6ZSA9IDE2XG5leHBvcnRzLmVuY3J5cHQgPSBmdW5jdGlvbiAoc2VsZiwgY2h1bmspIHtcbiAgdmFyIGNodW5rTnVtID0gTWF0aC5jZWlsKGNodW5rLmxlbmd0aCAvIGJsb2NrU2l6ZSlcbiAgdmFyIHN0YXJ0ID0gc2VsZi5fY2FjaGUubGVuZ3RoXG4gIHNlbGYuX2NhY2hlID0gQnVmZmVyLmNvbmNhdChbXG4gICAgc2VsZi5fY2FjaGUsXG4gICAgQnVmZmVyLmFsbG9jVW5zYWZlKGNodW5rTnVtICogYmxvY2tTaXplKVxuICBdKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rTnVtOyBpKyspIHtcbiAgICB2YXIgb3V0ID0gZ2V0QmxvY2soc2VsZilcbiAgICB2YXIgb2Zmc2V0ID0gc3RhcnQgKyBpICogYmxvY2tTaXplXG4gICAgc2VsZi5fY2FjaGUud3JpdGVVSW50MzJCRShvdXRbMF0sIG9mZnNldCArIDApXG4gICAgc2VsZi5fY2FjaGUud3JpdGVVSW50MzJCRShvdXRbMV0sIG9mZnNldCArIDQpXG4gICAgc2VsZi5fY2FjaGUud3JpdGVVSW50MzJCRShvdXRbMl0sIG9mZnNldCArIDgpXG4gICAgc2VsZi5fY2FjaGUud3JpdGVVSW50MzJCRShvdXRbM10sIG9mZnNldCArIDEyKVxuICB9XG4gIHZhciBwYWQgPSBzZWxmLl9jYWNoZS5zbGljZSgwLCBjaHVuay5sZW5ndGgpXG4gIHNlbGYuX2NhY2hlID0gc2VsZi5fY2FjaGUuc2xpY2UoY2h1bmsubGVuZ3RoKVxuICByZXR1cm4geG9yKGNodW5rLCBwYWQpXG59XG4iLCIvLyBtdWNoIG9mIHRoaXMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2luZHV0bnkvc2VsZi1zaWduZWQvYmxvYi9naC1wYWdlcy9saWIvcnNhLmpzXG52YXIgY3JlYXRlSG1hYyA9IHJlcXVpcmUoJ2NyZWF0ZS1obWFjJylcbnZhciBjcnQgPSByZXF1aXJlKCdicm93c2VyaWZ5LXJzYScpXG52YXIgRUMgPSByZXF1aXJlKCdlbGxpcHRpYycpLmVjXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpXG52YXIgcGFyc2VLZXlzID0gcmVxdWlyZSgncGFyc2UtYXNuMScpXG52YXIgY3VydmVzID0gcmVxdWlyZSgnLi9jdXJ2ZXMuanNvbicpXG5cbmZ1bmN0aW9uIHNpZ24gKGhhc2gsIGtleSwgaGFzaFR5cGUsIHNpZ25UeXBlLCB0YWcpIHtcbiAgdmFyIHByaXYgPSBwYXJzZUtleXMoa2V5KVxuICBpZiAocHJpdi5jdXJ2ZSkge1xuICAgIC8vIHJzYSBrZXlzIGNhbiBiZSBpbnRlcnByZXRlZCBhcyBlY2RzYSBvbmVzIGluIG9wZW5zc2xcbiAgICBpZiAoc2lnblR5cGUgIT09ICdlY2RzYScgJiYgc2lnblR5cGUgIT09ICdlY2RzYS9yc2EnKSB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIHByaXZhdGUga2V5IHR5cGUnKVxuICAgIHJldHVybiBlY1NpZ24oaGFzaCwgcHJpdilcbiAgfSBlbHNlIGlmIChwcml2LnR5cGUgPT09ICdkc2EnKSB7XG4gICAgaWYgKHNpZ25UeXBlICE9PSAnZHNhJykgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyBwcml2YXRlIGtleSB0eXBlJylcbiAgICByZXR1cm4gZHNhU2lnbihoYXNoLCBwcml2LCBoYXNoVHlwZSlcbiAgfSBlbHNlIHtcbiAgICBpZiAoc2lnblR5cGUgIT09ICdyc2EnICYmIHNpZ25UeXBlICE9PSAnZWNkc2EvcnNhJykgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyBwcml2YXRlIGtleSB0eXBlJylcbiAgfVxuICBoYXNoID0gQnVmZmVyLmNvbmNhdChbdGFnLCBoYXNoXSlcbiAgdmFyIGxlbiA9IHByaXYubW9kdWx1cy5ieXRlTGVuZ3RoKClcbiAgdmFyIHBhZCA9IFsgMCwgMSBdXG4gIHdoaWxlIChoYXNoLmxlbmd0aCArIHBhZC5sZW5ndGggKyAxIDwgbGVuKSBwYWQucHVzaCgweGZmKVxuICBwYWQucHVzaCgweDAwKVxuICB2YXIgaSA9IC0xXG4gIHdoaWxlICgrK2kgPCBoYXNoLmxlbmd0aCkgcGFkLnB1c2goaGFzaFtpXSlcblxuICB2YXIgb3V0ID0gY3J0KHBhZCwgcHJpdilcbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBlY1NpZ24gKGhhc2gsIHByaXYpIHtcbiAgdmFyIGN1cnZlSWQgPSBjdXJ2ZXNbcHJpdi5jdXJ2ZS5qb2luKCcuJyldXG4gIGlmICghY3VydmVJZCkgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGN1cnZlICcgKyBwcml2LmN1cnZlLmpvaW4oJy4nKSlcblxuICB2YXIgY3VydmUgPSBuZXcgRUMoY3VydmVJZClcbiAgdmFyIGtleSA9IGN1cnZlLmtleUZyb21Qcml2YXRlKHByaXYucHJpdmF0ZUtleSlcbiAgdmFyIG91dCA9IGtleS5zaWduKGhhc2gpXG5cbiAgcmV0dXJuIG5ldyBCdWZmZXIob3V0LnRvREVSKCkpXG59XG5cbmZ1bmN0aW9uIGRzYVNpZ24gKGhhc2gsIHByaXYsIGFsZ28pIHtcbiAgdmFyIHggPSBwcml2LnBhcmFtcy5wcml2X2tleVxuICB2YXIgcCA9IHByaXYucGFyYW1zLnBcbiAgdmFyIHEgPSBwcml2LnBhcmFtcy5xXG4gIHZhciBnID0gcHJpdi5wYXJhbXMuZ1xuICB2YXIgciA9IG5ldyBCTigwKVxuICB2YXIga1xuICB2YXIgSCA9IGJpdHMyaW50KGhhc2gsIHEpLm1vZChxKVxuICB2YXIgcyA9IGZhbHNlXG4gIHZhciBrdiA9IGdldEtleSh4LCBxLCBoYXNoLCBhbGdvKVxuICB3aGlsZSAocyA9PT0gZmFsc2UpIHtcbiAgICBrID0gbWFrZUtleShxLCBrdiwgYWxnbylcbiAgICByID0gbWFrZVIoZywgaywgcCwgcSlcbiAgICBzID0gay5pbnZtKHEpLmltdWwoSC5hZGQoeC5tdWwocikpKS5tb2QocSlcbiAgICBpZiAocy5jbXBuKDApID09PSAwKSB7XG4gICAgICBzID0gZmFsc2VcbiAgICAgIHIgPSBuZXcgQk4oMClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvREVSKHIsIHMpXG59XG5cbmZ1bmN0aW9uIHRvREVSIChyLCBzKSB7XG4gIHIgPSByLnRvQXJyYXkoKVxuICBzID0gcy50b0FycmF5KClcblxuICAvLyBQYWQgdmFsdWVzXG4gIGlmIChyWzBdICYgMHg4MCkgciA9IFsgMCBdLmNvbmNhdChyKVxuICBpZiAoc1swXSAmIDB4ODApIHMgPSBbIDAgXS5jb25jYXQocylcblxuICB2YXIgdG90YWwgPSByLmxlbmd0aCArIHMubGVuZ3RoICsgNFxuICB2YXIgcmVzID0gWyAweDMwLCB0b3RhbCwgMHgwMiwgci5sZW5ndGggXVxuICByZXMgPSByZXMuY29uY2F0KHIsIFsgMHgwMiwgcy5sZW5ndGggXSwgcylcbiAgcmV0dXJuIG5ldyBCdWZmZXIocmVzKVxufVxuXG5mdW5jdGlvbiBnZXRLZXkgKHgsIHEsIGhhc2gsIGFsZ28pIHtcbiAgeCA9IG5ldyBCdWZmZXIoeC50b0FycmF5KCkpXG4gIGlmICh4Lmxlbmd0aCA8IHEuYnl0ZUxlbmd0aCgpKSB7XG4gICAgdmFyIHplcm9zID0gbmV3IEJ1ZmZlcihxLmJ5dGVMZW5ndGgoKSAtIHgubGVuZ3RoKVxuICAgIHplcm9zLmZpbGwoMClcbiAgICB4ID0gQnVmZmVyLmNvbmNhdChbIHplcm9zLCB4IF0pXG4gIH1cbiAgdmFyIGhsZW4gPSBoYXNoLmxlbmd0aFxuICB2YXIgaGJpdHMgPSBiaXRzMm9jdGV0cyhoYXNoLCBxKVxuICB2YXIgdiA9IG5ldyBCdWZmZXIoaGxlbilcbiAgdi5maWxsKDEpXG4gIHZhciBrID0gbmV3IEJ1ZmZlcihobGVuKVxuICBrLmZpbGwoMClcbiAgayA9IGNyZWF0ZUhtYWMoYWxnbywgaykudXBkYXRlKHYpLnVwZGF0ZShuZXcgQnVmZmVyKFsgMCBdKSkudXBkYXRlKHgpLnVwZGF0ZShoYml0cykuZGlnZXN0KClcbiAgdiA9IGNyZWF0ZUhtYWMoYWxnbywgaykudXBkYXRlKHYpLmRpZ2VzdCgpXG4gIGsgPSBjcmVhdGVIbWFjKGFsZ28sIGspLnVwZGF0ZSh2KS51cGRhdGUobmV3IEJ1ZmZlcihbIDEgXSkpLnVwZGF0ZSh4KS51cGRhdGUoaGJpdHMpLmRpZ2VzdCgpXG4gIHYgPSBjcmVhdGVIbWFjKGFsZ28sIGspLnVwZGF0ZSh2KS5kaWdlc3QoKVxuICByZXR1cm4geyBrOiBrLCB2OiB2IH1cbn1cblxuZnVuY3Rpb24gYml0czJpbnQgKG9iaXRzLCBxKSB7XG4gIHZhciBiaXRzID0gbmV3IEJOKG9iaXRzKVxuICB2YXIgc2hpZnQgPSAob2JpdHMubGVuZ3RoIDw8IDMpIC0gcS5iaXRMZW5ndGgoKVxuICBpZiAoc2hpZnQgPiAwKSBiaXRzLmlzaHJuKHNoaWZ0KVxuICByZXR1cm4gYml0c1xufVxuXG5mdW5jdGlvbiBiaXRzMm9jdGV0cyAoYml0cywgcSkge1xuICBiaXRzID0gYml0czJpbnQoYml0cywgcSlcbiAgYml0cyA9IGJpdHMubW9kKHEpXG4gIHZhciBvdXQgPSBuZXcgQnVmZmVyKGJpdHMudG9BcnJheSgpKVxuICBpZiAob3V0Lmxlbmd0aCA8IHEuYnl0ZUxlbmd0aCgpKSB7XG4gICAgdmFyIHplcm9zID0gbmV3IEJ1ZmZlcihxLmJ5dGVMZW5ndGgoKSAtIG91dC5sZW5ndGgpXG4gICAgemVyb3MuZmlsbCgwKVxuICAgIG91dCA9IEJ1ZmZlci5jb25jYXQoWyB6ZXJvcywgb3V0IF0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBtYWtlS2V5IChxLCBrdiwgYWxnbykge1xuICB2YXIgdFxuICB2YXIga1xuXG4gIGRvIHtcbiAgICB0ID0gbmV3IEJ1ZmZlcigwKVxuXG4gICAgd2hpbGUgKHQubGVuZ3RoICogOCA8IHEuYml0TGVuZ3RoKCkpIHtcbiAgICAgIGt2LnYgPSBjcmVhdGVIbWFjKGFsZ28sIGt2LmspLnVwZGF0ZShrdi52KS5kaWdlc3QoKVxuICAgICAgdCA9IEJ1ZmZlci5jb25jYXQoWyB0LCBrdi52IF0pXG4gICAgfVxuXG4gICAgayA9IGJpdHMyaW50KHQsIHEpXG4gICAga3YuayA9IGNyZWF0ZUhtYWMoYWxnbywga3YuaykudXBkYXRlKGt2LnYpLnVwZGF0ZShuZXcgQnVmZmVyKFsgMCBdKSkuZGlnZXN0KClcbiAgICBrdi52ID0gY3JlYXRlSG1hYyhhbGdvLCBrdi5rKS51cGRhdGUoa3YudikuZGlnZXN0KClcbiAgfSB3aGlsZSAoay5jbXAocSkgIT09IC0xKVxuXG4gIHJldHVybiBrXG59XG5cbmZ1bmN0aW9uIG1ha2VSIChnLCBrLCBwLCBxKSB7XG4gIHJldHVybiBnLnRvUmVkKEJOLm1vbnQocCkpLnJlZFBvdyhrKS5mcm9tUmVkKCkubW9kKHEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnblxubW9kdWxlLmV4cG9ydHMuZ2V0S2V5ID0gZ2V0S2V5XG5tb2R1bGUuZXhwb3J0cy5tYWtlS2V5ID0gbWFrZUtleVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjcmVhdGVIYXNoID0gcmVxdWlyZSgnY3JlYXRlLWhhc2gnKVxudmFyIGJzNThjaGVja0Jhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKVxuXG4vLyBTSEEyNTYoU0hBMjU2KGJ1ZmZlcikpXG5mdW5jdGlvbiBzaGEyNTZ4MiAoYnVmZmVyKSB7XG4gIHZhciB0bXAgPSBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoYnVmZmVyKS5kaWdlc3QoKVxuICByZXR1cm4gY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHRtcCkuZGlnZXN0KClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiczU4Y2hlY2tCYXNlKHNoYTI1NngyKVxuIiwidmFyIGFlcyA9IHJlcXVpcmUoJy4vYWVzJylcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2NpcGhlci1iYXNlJylcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciBHSEFTSCA9IHJlcXVpcmUoJy4vZ2hhc2gnKVxudmFyIHhvciA9IHJlcXVpcmUoJ2J1ZmZlci14b3InKVxudmFyIGluY3IzMiA9IHJlcXVpcmUoJy4vaW5jcjMyJylcblxuZnVuY3Rpb24geG9yVGVzdCAoYSwgYikge1xuICB2YXIgb3V0ID0gMFxuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSBvdXQrK1xuXG4gIHZhciBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBvdXQgKz0gKGFbaV0gXiBiW2ldKVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBjYWxjSXYgKHNlbGYsIGl2LCBjaykge1xuICBpZiAoaXYubGVuZ3RoID09PSAxMikge1xuICAgIHNlbGYuX2ZpbklEID0gQnVmZmVyLmNvbmNhdChbaXYsIEJ1ZmZlci5mcm9tKFswLCAwLCAwLCAxXSldKVxuICAgIHJldHVybiBCdWZmZXIuY29uY2F0KFtpdiwgQnVmZmVyLmZyb20oWzAsIDAsIDAsIDJdKV0pXG4gIH1cbiAgdmFyIGdoYXNoID0gbmV3IEdIQVNIKGNrKVxuICB2YXIgbGVuID0gaXYubGVuZ3RoXG4gIHZhciB0b1BhZCA9IGxlbiAlIDE2XG4gIGdoYXNoLnVwZGF0ZShpdilcbiAgaWYgKHRvUGFkKSB7XG4gICAgdG9QYWQgPSAxNiAtIHRvUGFkXG4gICAgZ2hhc2gudXBkYXRlKEJ1ZmZlci5hbGxvYyh0b1BhZCwgMCkpXG4gIH1cbiAgZ2hhc2gudXBkYXRlKEJ1ZmZlci5hbGxvYyg4LCAwKSlcbiAgdmFyIGl2Qml0cyA9IGxlbiAqIDhcbiAgdmFyIHRhaWwgPSBCdWZmZXIuYWxsb2MoOClcbiAgdGFpbC53cml0ZVVJbnRCRShpdkJpdHMsIDAsIDgpXG4gIGdoYXNoLnVwZGF0ZSh0YWlsKVxuICBzZWxmLl9maW5JRCA9IGdoYXNoLnN0YXRlXG4gIHZhciBvdXQgPSBCdWZmZXIuZnJvbShzZWxmLl9maW5JRClcbiAgaW5jcjMyKG91dClcbiAgcmV0dXJuIG91dFxufVxuZnVuY3Rpb24gU3RyZWFtQ2lwaGVyIChtb2RlLCBrZXksIGl2LCBkZWNyeXB0KSB7XG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMpXG5cbiAgdmFyIGggPSBCdWZmZXIuYWxsb2MoNCwgMClcblxuICB0aGlzLl9jaXBoZXIgPSBuZXcgYWVzLkFFUyhrZXkpXG4gIHZhciBjayA9IHRoaXMuX2NpcGhlci5lbmNyeXB0QmxvY2soaClcbiAgdGhpcy5fZ2hhc2ggPSBuZXcgR0hBU0goY2spXG4gIGl2ID0gY2FsY0l2KHRoaXMsIGl2LCBjaylcblxuICB0aGlzLl9wcmV2ID0gQnVmZmVyLmZyb20oaXYpXG4gIHRoaXMuX2NhY2hlID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG4gIHRoaXMuX3NlY0NhY2hlID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG4gIHRoaXMuX2RlY3J5cHQgPSBkZWNyeXB0XG4gIHRoaXMuX2FsZW4gPSAwXG4gIHRoaXMuX2xlbiA9IDBcbiAgdGhpcy5fbW9kZSA9IG1vZGVcblxuICB0aGlzLl9hdXRoVGFnID0gbnVsbFxuICB0aGlzLl9jYWxsZWQgPSBmYWxzZVxufVxuXG5pbmhlcml0cyhTdHJlYW1DaXBoZXIsIFRyYW5zZm9ybSlcblxuU3RyZWFtQ2lwaGVyLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIGlmICghdGhpcy5fY2FsbGVkICYmIHRoaXMuX2FsZW4pIHtcbiAgICB2YXIgcnVtcCA9IDE2IC0gKHRoaXMuX2FsZW4gJSAxNilcbiAgICBpZiAocnVtcCA8IDE2KSB7XG4gICAgICBydW1wID0gQnVmZmVyLmFsbG9jKHJ1bXAsIDApXG4gICAgICB0aGlzLl9naGFzaC51cGRhdGUocnVtcClcbiAgICB9XG4gIH1cblxuICB0aGlzLl9jYWxsZWQgPSB0cnVlXG4gIHZhciBvdXQgPSB0aGlzLl9tb2RlLmVuY3J5cHQodGhpcywgY2h1bmspXG4gIGlmICh0aGlzLl9kZWNyeXB0KSB7XG4gICAgdGhpcy5fZ2hhc2gudXBkYXRlKGNodW5rKVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2doYXNoLnVwZGF0ZShvdXQpXG4gIH1cbiAgdGhpcy5fbGVuICs9IGNodW5rLmxlbmd0aFxuICByZXR1cm4gb3V0XG59XG5cblN0cmVhbUNpcGhlci5wcm90b3R5cGUuX2ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fZGVjcnlwdCAmJiAhdGhpcy5fYXV0aFRhZykgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBzdGF0ZSBvciB1bmFibGUgdG8gYXV0aGVudGljYXRlIGRhdGEnKVxuXG4gIHZhciB0YWcgPSB4b3IodGhpcy5fZ2hhc2guZmluYWwodGhpcy5fYWxlbiAqIDgsIHRoaXMuX2xlbiAqIDgpLCB0aGlzLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHRoaXMuX2ZpbklEKSlcbiAgaWYgKHRoaXMuX2RlY3J5cHQgJiYgeG9yVGVzdCh0YWcsIHRoaXMuX2F1dGhUYWcpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHN0YXRlIG9yIHVuYWJsZSB0byBhdXRoZW50aWNhdGUgZGF0YScpXG5cbiAgdGhpcy5fYXV0aFRhZyA9IHRhZ1xuICB0aGlzLl9jaXBoZXIuc2NydWIoKVxufVxuXG5TdHJlYW1DaXBoZXIucHJvdG90eXBlLmdldEF1dGhUYWcgPSBmdW5jdGlvbiBnZXRBdXRoVGFnICgpIHtcbiAgaWYgKHRoaXMuX2RlY3J5cHQgfHwgIUJ1ZmZlci5pc0J1ZmZlcih0aGlzLl9hdXRoVGFnKSkgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0aW5nIHRvIGdldCBhdXRoIHRhZyBpbiB1bnN1cHBvcnRlZCBzdGF0ZScpXG5cbiAgcmV0dXJuIHRoaXMuX2F1dGhUYWdcbn1cblxuU3RyZWFtQ2lwaGVyLnByb3RvdHlwZS5zZXRBdXRoVGFnID0gZnVuY3Rpb24gc2V0QXV0aFRhZyAodGFnKSB7XG4gIGlmICghdGhpcy5fZGVjcnlwdCkgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0aW5nIHRvIHNldCBhdXRoIHRhZyBpbiB1bnN1cHBvcnRlZCBzdGF0ZScpXG5cbiAgdGhpcy5fYXV0aFRhZyA9IHRhZ1xufVxuXG5TdHJlYW1DaXBoZXIucHJvdG90eXBlLnNldEFBRCA9IGZ1bmN0aW9uIHNldEFBRCAoYnVmKSB7XG4gIGlmICh0aGlzLl9jYWxsZWQpIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGluZyB0byBzZXQgQUFEIGluIHVuc3VwcG9ydGVkIHN0YXRlJylcblxuICB0aGlzLl9naGFzaC51cGRhdGUoYnVmKVxuICB0aGlzLl9hbGVuICs9IGJ1Zi5sZW5ndGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHJlYW1DaXBoZXJcbiIsInZhciB1cHBlckNhc2UgPSByZXF1aXJlKCd1cHBlci1jYXNlJylcbnZhciBub0Nhc2UgPSByZXF1aXJlKCduby1jYXNlJylcblxuLyoqXG4gKiBDYW1lbCBjYXNlIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSAge3N0cmluZ30gW2xvY2FsZV1cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIGxvY2FsZSwgbWVyZ2VOdW1iZXJzKSB7XG4gIHZhciByZXN1bHQgPSBub0Nhc2UodmFsdWUsIGxvY2FsZSlcblxuICAvLyBSZXBsYWNlIHBlcmlvZHMgYmV0d2VlbiBudW1lcmljIGVudGl0aWVzIHdpdGggYW4gdW5kZXJzY29yZS5cbiAgaWYgKCFtZXJnZU51bWJlcnMpIHtcbiAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvICg/PVxcZCkvZywgJ18nKVxuICB9XG5cbiAgLy8gUmVwbGFjZSBzcGFjZXMgYmV0d2VlbiB3b3JkcyB3aXRoIGFuIHVwcGVyIGNhc2VkIGNoYXJhY3Rlci5cbiAgcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC8gKC4pL2csIGZ1bmN0aW9uIChtLCAkMSkge1xuICAgIHJldHVybiB1cHBlckNhc2UoJDEsIGxvY2FsZSlcbiAgfSlcbn1cbiIsInZhciBNT0RFUyA9IHJlcXVpcmUoJy4vbW9kZXMnKVxudmFyIEF1dGhDaXBoZXIgPSByZXF1aXJlKCcuL2F1dGhDaXBoZXInKVxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG52YXIgU3RyZWFtQ2lwaGVyID0gcmVxdWlyZSgnLi9zdHJlYW1DaXBoZXInKVxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2NpcGhlci1iYXNlJylcbnZhciBhZXMgPSByZXF1aXJlKCcuL2FlcycpXG52YXIgZWJ0ayA9IHJlcXVpcmUoJ2V2cF9ieXRlc3Rva2V5JylcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcblxuZnVuY3Rpb24gQ2lwaGVyIChtb2RlLCBrZXksIGl2KSB7XG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMpXG5cbiAgdGhpcy5fY2FjaGUgPSBuZXcgU3BsaXR0ZXIoKVxuICB0aGlzLl9jaXBoZXIgPSBuZXcgYWVzLkFFUyhrZXkpXG4gIHRoaXMuX3ByZXYgPSBCdWZmZXIuZnJvbShpdilcbiAgdGhpcy5fbW9kZSA9IG1vZGVcbiAgdGhpcy5fYXV0b3BhZGRpbmcgPSB0cnVlXG59XG5cbmluaGVyaXRzKENpcGhlciwgVHJhbnNmb3JtKVxuXG5DaXBoZXIucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLl9jYWNoZS5hZGQoZGF0YSlcbiAgdmFyIGNodW5rXG4gIHZhciB0aGluZ1xuICB2YXIgb3V0ID0gW11cblxuICB3aGlsZSAoKGNodW5rID0gdGhpcy5fY2FjaGUuZ2V0KCkpKSB7XG4gICAgdGhpbmcgPSB0aGlzLl9tb2RlLmVuY3J5cHQodGhpcywgY2h1bmspXG4gICAgb3V0LnB1c2godGhpbmcpXG4gIH1cblxuICByZXR1cm4gQnVmZmVyLmNvbmNhdChvdXQpXG59XG5cbnZhciBQQURESU5HID0gQnVmZmVyLmFsbG9jKDE2LCAweDEwKVxuXG5DaXBoZXIucHJvdG90eXBlLl9maW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNodW5rID0gdGhpcy5fY2FjaGUuZmx1c2goKVxuICBpZiAodGhpcy5fYXV0b3BhZGRpbmcpIHtcbiAgICBjaHVuayA9IHRoaXMuX21vZGUuZW5jcnlwdCh0aGlzLCBjaHVuaylcbiAgICB0aGlzLl9jaXBoZXIuc2NydWIoKVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgaWYgKCFjaHVuay5lcXVhbHMoUEFERElORykpIHtcbiAgICB0aGlzLl9jaXBoZXIuc2NydWIoKVxuICAgIHRocm93IG5ldyBFcnJvcignZGF0YSBub3QgbXVsdGlwbGUgb2YgYmxvY2sgbGVuZ3RoJylcbiAgfVxufVxuXG5DaXBoZXIucHJvdG90eXBlLnNldEF1dG9QYWRkaW5nID0gZnVuY3Rpb24gKHNldFRvKSB7XG4gIHRoaXMuX2F1dG9wYWRkaW5nID0gISFzZXRUb1xuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBTcGxpdHRlciAoKSB7XG4gIHRoaXMuY2FjaGUgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMClcbn1cblxuU3BsaXR0ZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuY2FjaGUgPSBCdWZmZXIuY29uY2F0KFt0aGlzLmNhY2hlLCBkYXRhXSlcbn1cblxuU3BsaXR0ZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY2FjaGUubGVuZ3RoID4gMTUpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5jYWNoZS5zbGljZSgwLCAxNilcbiAgICB0aGlzLmNhY2hlID0gdGhpcy5jYWNoZS5zbGljZSgxNilcbiAgICByZXR1cm4gb3V0XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuU3BsaXR0ZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuID0gMTYgLSB0aGlzLmNhY2hlLmxlbmd0aFxuICB2YXIgcGFkQnVmZiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW4pXG5cbiAgdmFyIGkgPSAtMVxuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgcGFkQnVmZi53cml0ZVVJbnQ4KGxlbiwgaSlcbiAgfVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KFt0aGlzLmNhY2hlLCBwYWRCdWZmXSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2lwaGVyaXYgKHN1aXRlLCBwYXNzd29yZCwgaXYpIHtcbiAgdmFyIGNvbmZpZyA9IE1PREVTW3N1aXRlLnRvTG93ZXJDYXNlKCldXG4gIGlmICghY29uZmlnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHN1aXRlIHR5cGUnKVxuXG4gIGlmICh0eXBlb2YgcGFzc3dvcmQgPT09ICdzdHJpbmcnKSBwYXNzd29yZCA9IEJ1ZmZlci5mcm9tKHBhc3N3b3JkKVxuICBpZiAocGFzc3dvcmQubGVuZ3RoICE9PSBjb25maWcua2V5IC8gOCkgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBrZXkgbGVuZ3RoICcgKyBwYXNzd29yZC5sZW5ndGgpXG5cbiAgaWYgKHR5cGVvZiBpdiA9PT0gJ3N0cmluZycpIGl2ID0gQnVmZmVyLmZyb20oaXYpXG4gIGlmIChjb25maWcubW9kZSAhPT0gJ0dDTScgJiYgaXYubGVuZ3RoICE9PSBjb25maWcuaXYpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgaXYgbGVuZ3RoICcgKyBpdi5sZW5ndGgpXG5cbiAgaWYgKGNvbmZpZy50eXBlID09PSAnc3RyZWFtJykge1xuICAgIHJldHVybiBuZXcgU3RyZWFtQ2lwaGVyKGNvbmZpZy5tb2R1bGUsIHBhc3N3b3JkLCBpdilcbiAgfSBlbHNlIGlmIChjb25maWcudHlwZSA9PT0gJ2F1dGgnKSB7XG4gICAgcmV0dXJuIG5ldyBBdXRoQ2lwaGVyKGNvbmZpZy5tb2R1bGUsIHBhc3N3b3JkLCBpdilcbiAgfVxuXG4gIHJldHVybiBuZXcgQ2lwaGVyKGNvbmZpZy5tb2R1bGUsIHBhc3N3b3JkLCBpdilcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2lwaGVyIChzdWl0ZSwgcGFzc3dvcmQpIHtcbiAgdmFyIGNvbmZpZyA9IE1PREVTW3N1aXRlLnRvTG93ZXJDYXNlKCldXG4gIGlmICghY29uZmlnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHN1aXRlIHR5cGUnKVxuXG4gIHZhciBrZXlzID0gZWJ0ayhwYXNzd29yZCwgZmFsc2UsIGNvbmZpZy5rZXksIGNvbmZpZy5pdilcbiAgcmV0dXJuIGNyZWF0ZUNpcGhlcml2KHN1aXRlLCBrZXlzLmtleSwga2V5cy5pdilcbn1cblxuZXhwb3J0cy5jcmVhdGVDaXBoZXJpdiA9IGNyZWF0ZUNpcGhlcml2XG5leHBvcnRzLmNyZWF0ZUNpcGhlciA9IGNyZWF0ZUNpcGhlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiMTAwXCI6IFwiQ29udGludWVcIixcbiAgXCIxMDFcIjogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gIFwiMTAyXCI6IFwiUHJvY2Vzc2luZ1wiLFxuICBcIjIwMFwiOiBcIk9LXCIsXG4gIFwiMjAxXCI6IFwiQ3JlYXRlZFwiLFxuICBcIjIwMlwiOiBcIkFjY2VwdGVkXCIsXG4gIFwiMjAzXCI6IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgXCIyMDRcIjogXCJObyBDb250ZW50XCIsXG4gIFwiMjA1XCI6IFwiUmVzZXQgQ29udGVudFwiLFxuICBcIjIwNlwiOiBcIlBhcnRpYWwgQ29udGVudFwiLFxuICBcIjIwN1wiOiBcIk11bHRpLVN0YXR1c1wiLFxuICBcIjIwOFwiOiBcIkFscmVhZHkgUmVwb3J0ZWRcIixcbiAgXCIyMjZcIjogXCJJTSBVc2VkXCIsXG4gIFwiMzAwXCI6IFwiTXVsdGlwbGUgQ2hvaWNlc1wiLFxuICBcIjMwMVwiOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG4gIFwiMzAyXCI6IFwiRm91bmRcIixcbiAgXCIzMDNcIjogXCJTZWUgT3RoZXJcIixcbiAgXCIzMDRcIjogXCJOb3QgTW9kaWZpZWRcIixcbiAgXCIzMDVcIjogXCJVc2UgUHJveHlcIixcbiAgXCIzMDdcIjogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgXCIzMDhcIjogXCJQZXJtYW5lbnQgUmVkaXJlY3RcIixcbiAgXCI0MDBcIjogXCJCYWQgUmVxdWVzdFwiLFxuICBcIjQwMVwiOiBcIlVuYXV0aG9yaXplZFwiLFxuICBcIjQwMlwiOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcbiAgXCI0MDNcIjogXCJGb3JiaWRkZW5cIixcbiAgXCI0MDRcIjogXCJOb3QgRm91bmRcIixcbiAgXCI0MDVcIjogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcbiAgXCI0MDZcIjogXCJOb3QgQWNjZXB0YWJsZVwiLFxuICBcIjQwN1wiOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gIFwiNDA4XCI6IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG4gIFwiNDA5XCI6IFwiQ29uZmxpY3RcIixcbiAgXCI0MTBcIjogXCJHb25lXCIsXG4gIFwiNDExXCI6IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG4gIFwiNDEyXCI6IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuICBcIjQxM1wiOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXG4gIFwiNDE0XCI6IFwiVVJJIFRvbyBMb25nXCIsXG4gIFwiNDE1XCI6IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuICBcIjQxNlwiOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICBcIjQxN1wiOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuICBcIjQxOFwiOiBcIkknbSBhIHRlYXBvdFwiLFxuICBcIjQyMVwiOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcbiAgXCI0MjJcIjogXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiLFxuICBcIjQyM1wiOiBcIkxvY2tlZFwiLFxuICBcIjQyNFwiOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gIFwiNDI1XCI6IFwiVW5vcmRlcmVkIENvbGxlY3Rpb25cIixcbiAgXCI0MjZcIjogXCJVcGdyYWRlIFJlcXVpcmVkXCIsXG4gIFwiNDI4XCI6IFwiUHJlY29uZGl0aW9uIFJlcXVpcmVkXCIsXG4gIFwiNDI5XCI6IFwiVG9vIE1hbnkgUmVxdWVzdHNcIixcbiAgXCI0MzFcIjogXCJSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlXCIsXG4gIFwiNDUxXCI6IFwiVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnNcIixcbiAgXCI1MDBcIjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgXCI1MDFcIjogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgXCI1MDJcIjogXCJCYWQgR2F0ZXdheVwiLFxuICBcIjUwM1wiOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgXCI1MDRcIjogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgXCI1MDVcIjogXCJIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZFwiLFxuICBcIjUwNlwiOiBcIlZhcmlhbnQgQWxzbyBOZWdvdGlhdGVzXCIsXG4gIFwiNTA3XCI6IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgXCI1MDhcIjogXCJMb29wIERldGVjdGVkXCIsXG4gIFwiNTA5XCI6IFwiQmFuZHdpZHRoIExpbWl0IEV4Y2VlZGVkXCIsXG4gIFwiNTEwXCI6IFwiTm90IEV4dGVuZGVkXCIsXG4gIFwiNTExXCI6IFwiTmV0d29yayBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhvciAoYSwgYikge1xuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKVxuICB2YXIgYnVmZmVyID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGJ1ZmZlcltpXSA9IGFbaV0gXiBiW2ldXG4gIH1cblxuICByZXR1cm4gYnVmZmVyXG59XG4iLCJ2YXIgREVTID0gcmVxdWlyZSgnYnJvd3NlcmlmeS1kZXMnKVxudmFyIGFlcyA9IHJlcXVpcmUoJ2Jyb3dzZXJpZnktYWVzL2Jyb3dzZXInKVxudmFyIGFlc01vZGVzID0gcmVxdWlyZSgnYnJvd3NlcmlmeS1hZXMvbW9kZXMnKVxudmFyIGRlc01vZGVzID0gcmVxdWlyZSgnYnJvd3NlcmlmeS1kZXMvbW9kZXMnKVxudmFyIGVidGsgPSByZXF1aXJlKCdldnBfYnl0ZXN0b2tleScpXG5cbmZ1bmN0aW9uIGNyZWF0ZUNpcGhlciAoc3VpdGUsIHBhc3N3b3JkKSB7XG4gIHN1aXRlID0gc3VpdGUudG9Mb3dlckNhc2UoKVxuXG4gIHZhciBrZXlMZW4sIGl2TGVuXG4gIGlmIChhZXNNb2Rlc1tzdWl0ZV0pIHtcbiAgICBrZXlMZW4gPSBhZXNNb2Rlc1tzdWl0ZV0ua2V5XG4gICAgaXZMZW4gPSBhZXNNb2Rlc1tzdWl0ZV0uaXZcbiAgfSBlbHNlIGlmIChkZXNNb2Rlc1tzdWl0ZV0pIHtcbiAgICBrZXlMZW4gPSBkZXNNb2Rlc1tzdWl0ZV0ua2V5ICogOFxuICAgIGl2TGVuID0gZGVzTW9kZXNbc3VpdGVdLml2XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBzdWl0ZSB0eXBlJylcbiAgfVxuXG4gIHZhciBrZXlzID0gZWJ0ayhwYXNzd29yZCwgZmFsc2UsIGtleUxlbiwgaXZMZW4pXG4gIHJldHVybiBjcmVhdGVDaXBoZXJpdihzdWl0ZSwga2V5cy5rZXksIGtleXMuaXYpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlY2lwaGVyIChzdWl0ZSwgcGFzc3dvcmQpIHtcbiAgc3VpdGUgPSBzdWl0ZS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIGtleUxlbiwgaXZMZW5cbiAgaWYgKGFlc01vZGVzW3N1aXRlXSkge1xuICAgIGtleUxlbiA9IGFlc01vZGVzW3N1aXRlXS5rZXlcbiAgICBpdkxlbiA9IGFlc01vZGVzW3N1aXRlXS5pdlxuICB9IGVsc2UgaWYgKGRlc01vZGVzW3N1aXRlXSkge1xuICAgIGtleUxlbiA9IGRlc01vZGVzW3N1aXRlXS5rZXkgKiA4XG4gICAgaXZMZW4gPSBkZXNNb2Rlc1tzdWl0ZV0uaXZcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHN1aXRlIHR5cGUnKVxuICB9XG5cbiAgdmFyIGtleXMgPSBlYnRrKHBhc3N3b3JkLCBmYWxzZSwga2V5TGVuLCBpdkxlbilcbiAgcmV0dXJuIGNyZWF0ZURlY2lwaGVyaXYoc3VpdGUsIGtleXMua2V5LCBrZXlzLml2KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDaXBoZXJpdiAoc3VpdGUsIGtleSwgaXYpIHtcbiAgc3VpdGUgPSBzdWl0ZS50b0xvd2VyQ2FzZSgpXG4gIGlmIChhZXNNb2Rlc1tzdWl0ZV0pIHJldHVybiBhZXMuY3JlYXRlQ2lwaGVyaXYoc3VpdGUsIGtleSwgaXYpXG4gIGlmIChkZXNNb2Rlc1tzdWl0ZV0pIHJldHVybiBuZXcgREVTKHsga2V5OiBrZXksIGl2OiBpdiwgbW9kZTogc3VpdGUgfSlcblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHN1aXRlIHR5cGUnKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEZWNpcGhlcml2IChzdWl0ZSwga2V5LCBpdikge1xuICBzdWl0ZSA9IHN1aXRlLnRvTG93ZXJDYXNlKClcbiAgaWYgKGFlc01vZGVzW3N1aXRlXSkgcmV0dXJuIGFlcy5jcmVhdGVEZWNpcGhlcml2KHN1aXRlLCBrZXksIGl2KVxuICBpZiAoZGVzTW9kZXNbc3VpdGVdKSByZXR1cm4gbmV3IERFUyh7IGtleToga2V5LCBpdjogaXYsIG1vZGU6IHN1aXRlLCBkZWNyeXB0OiB0cnVlIH0pXG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBzdWl0ZSB0eXBlJylcbn1cblxuZnVuY3Rpb24gZ2V0Q2lwaGVycyAoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhkZXNNb2RlcykuY29uY2F0KGFlcy5nZXRDaXBoZXJzKCkpXG59XG5cbmV4cG9ydHMuY3JlYXRlQ2lwaGVyID0gZXhwb3J0cy5DaXBoZXIgPSBjcmVhdGVDaXBoZXJcbmV4cG9ydHMuY3JlYXRlQ2lwaGVyaXYgPSBleHBvcnRzLkNpcGhlcml2ID0gY3JlYXRlQ2lwaGVyaXZcbmV4cG9ydHMuY3JlYXRlRGVjaXBoZXIgPSBleHBvcnRzLkRlY2lwaGVyID0gY3JlYXRlRGVjaXBoZXJcbmV4cG9ydHMuY3JlYXRlRGVjaXBoZXJpdiA9IGV4cG9ydHMuRGVjaXBoZXJpdiA9IGNyZWF0ZURlY2lwaGVyaXZcbmV4cG9ydHMubGlzdENpcGhlcnMgPSBleHBvcnRzLmdldENpcGhlcnMgPSBnZXRDaXBoZXJzXG4iLCIvLyBtdWNoIG9mIHRoaXMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2luZHV0bnkvc2VsZi1zaWduZWQvYmxvYi9naC1wYWdlcy9saWIvcnNhLmpzXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpXG52YXIgRUMgPSByZXF1aXJlKCdlbGxpcHRpYycpLmVjXG52YXIgcGFyc2VLZXlzID0gcmVxdWlyZSgncGFyc2UtYXNuMScpXG52YXIgY3VydmVzID0gcmVxdWlyZSgnLi9jdXJ2ZXMuanNvbicpXG5cbmZ1bmN0aW9uIHZlcmlmeSAoc2lnLCBoYXNoLCBrZXksIHNpZ25UeXBlLCB0YWcpIHtcbiAgdmFyIHB1YiA9IHBhcnNlS2V5cyhrZXkpXG4gIGlmIChwdWIudHlwZSA9PT0gJ2VjJykge1xuICAgIC8vIHJzYSBrZXlzIGNhbiBiZSBpbnRlcnByZXRlZCBhcyBlY2RzYSBvbmVzIGluIG9wZW5zc2xcbiAgICBpZiAoc2lnblR5cGUgIT09ICdlY2RzYScgJiYgc2lnblR5cGUgIT09ICdlY2RzYS9yc2EnKSB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIHB1YmxpYyBrZXkgdHlwZScpXG4gICAgcmV0dXJuIGVjVmVyaWZ5KHNpZywgaGFzaCwgcHViKVxuICB9IGVsc2UgaWYgKHB1Yi50eXBlID09PSAnZHNhJykge1xuICAgIGlmIChzaWduVHlwZSAhPT0gJ2RzYScpIHRocm93IG5ldyBFcnJvcignd3JvbmcgcHVibGljIGtleSB0eXBlJylcbiAgICByZXR1cm4gZHNhVmVyaWZ5KHNpZywgaGFzaCwgcHViKVxuICB9IGVsc2Uge1xuICAgIGlmIChzaWduVHlwZSAhPT0gJ3JzYScgJiYgc2lnblR5cGUgIT09ICdlY2RzYS9yc2EnKSB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIHB1YmxpYyBrZXkgdHlwZScpXG4gIH1cbiAgaGFzaCA9IEJ1ZmZlci5jb25jYXQoW3RhZywgaGFzaF0pXG4gIHZhciBsZW4gPSBwdWIubW9kdWx1cy5ieXRlTGVuZ3RoKClcbiAgdmFyIHBhZCA9IFsgMSBdXG4gIHZhciBwYWROdW0gPSAwXG4gIHdoaWxlIChoYXNoLmxlbmd0aCArIHBhZC5sZW5ndGggKyAyIDwgbGVuKSB7XG4gICAgcGFkLnB1c2goMHhmZilcbiAgICBwYWROdW0rK1xuICB9XG4gIHBhZC5wdXNoKDB4MDApXG4gIHZhciBpID0gLTFcbiAgd2hpbGUgKCsraSA8IGhhc2gubGVuZ3RoKSB7XG4gICAgcGFkLnB1c2goaGFzaFtpXSlcbiAgfVxuICBwYWQgPSBuZXcgQnVmZmVyKHBhZClcbiAgdmFyIHJlZCA9IEJOLm1vbnQocHViLm1vZHVsdXMpXG4gIHNpZyA9IG5ldyBCTihzaWcpLnRvUmVkKHJlZClcblxuICBzaWcgPSBzaWcucmVkUG93KG5ldyBCTihwdWIucHVibGljRXhwb25lbnQpKVxuICBzaWcgPSBuZXcgQnVmZmVyKHNpZy5mcm9tUmVkKCkudG9BcnJheSgpKVxuICB2YXIgb3V0ID0gcGFkTnVtIDwgOCA/IDEgOiAwXG4gIGxlbiA9IE1hdGgubWluKHNpZy5sZW5ndGgsIHBhZC5sZW5ndGgpXG4gIGlmIChzaWcubGVuZ3RoICE9PSBwYWQubGVuZ3RoKSBvdXQgPSAxXG5cbiAgaSA9IC0xXG4gIHdoaWxlICgrK2kgPCBsZW4pIG91dCB8PSBzaWdbaV0gXiBwYWRbaV1cbiAgcmV0dXJuIG91dCA9PT0gMFxufVxuXG5mdW5jdGlvbiBlY1ZlcmlmeSAoc2lnLCBoYXNoLCBwdWIpIHtcbiAgdmFyIGN1cnZlSWQgPSBjdXJ2ZXNbcHViLmRhdGEuYWxnb3JpdGhtLmN1cnZlLmpvaW4oJy4nKV1cbiAgaWYgKCFjdXJ2ZUlkKSB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gY3VydmUgJyArIHB1Yi5kYXRhLmFsZ29yaXRobS5jdXJ2ZS5qb2luKCcuJykpXG5cbiAgdmFyIGN1cnZlID0gbmV3IEVDKGN1cnZlSWQpXG4gIHZhciBwdWJrZXkgPSBwdWIuZGF0YS5zdWJqZWN0UHJpdmF0ZUtleS5kYXRhXG5cbiAgcmV0dXJuIGN1cnZlLnZlcmlmeShoYXNoLCBzaWcsIHB1YmtleSlcbn1cblxuZnVuY3Rpb24gZHNhVmVyaWZ5IChzaWcsIGhhc2gsIHB1Yikge1xuICB2YXIgcCA9IHB1Yi5kYXRhLnBcbiAgdmFyIHEgPSBwdWIuZGF0YS5xXG4gIHZhciBnID0gcHViLmRhdGEuZ1xuICB2YXIgeSA9IHB1Yi5kYXRhLnB1Yl9rZXlcbiAgdmFyIHVucGFja2VkID0gcGFyc2VLZXlzLnNpZ25hdHVyZS5kZWNvZGUoc2lnLCAnZGVyJylcbiAgdmFyIHMgPSB1bnBhY2tlZC5zXG4gIHZhciByID0gdW5wYWNrZWQuclxuICBjaGVja1ZhbHVlKHMsIHEpXG4gIGNoZWNrVmFsdWUociwgcSlcbiAgdmFyIG1vbnRwID0gQk4ubW9udChwKVxuICB2YXIgdyA9IHMuaW52bShxKVxuICB2YXIgdiA9IGcudG9SZWQobW9udHApXG4gICAgLnJlZFBvdyhuZXcgQk4oaGFzaCkubXVsKHcpLm1vZChxKSlcbiAgICAuZnJvbVJlZCgpXG4gICAgLm11bCh5LnRvUmVkKG1vbnRwKS5yZWRQb3coci5tdWwodykubW9kKHEpKS5mcm9tUmVkKCkpXG4gICAgLm1vZChwKVxuICAgIC5tb2QocSlcbiAgcmV0dXJuIHYuY21wKHIpID09PSAwXG59XG5cbmZ1bmN0aW9uIGNoZWNrVmFsdWUgKGIsIHEpIHtcbiAgaWYgKGIuY21wbigwKSA8PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2lnJylcbiAgaWYgKGIuY21wKHEpID49IHEpIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzaWcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcmlmeVxuIiwidmFyIGJuID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciByYW5kb21CeXRlcyA9IHJlcXVpcmUoJ3JhbmRvbWJ5dGVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGNydDtcbmZ1bmN0aW9uIGJsaW5kKHByaXYpIHtcbiAgdmFyIHIgPSBnZXRyKHByaXYpO1xuICB2YXIgYmxpbmRlciA9IHIudG9SZWQoYm4ubW9udChwcml2Lm1vZHVsdXMpKVxuICAucmVkUG93KG5ldyBibihwcml2LnB1YmxpY0V4cG9uZW50KSkuZnJvbVJlZCgpO1xuICByZXR1cm4ge1xuICAgIGJsaW5kZXI6IGJsaW5kZXIsXG4gICAgdW5ibGluZGVyOnIuaW52bShwcml2Lm1vZHVsdXMpXG4gIH07XG59XG5mdW5jdGlvbiBjcnQobXNnLCBwcml2KSB7XG4gIHZhciBibGluZHMgPSBibGluZChwcml2KTtcbiAgdmFyIGxlbiA9IHByaXYubW9kdWx1cy5ieXRlTGVuZ3RoKCk7XG4gIHZhciBtb2QgPSBibi5tb250KHByaXYubW9kdWx1cyk7XG4gIHZhciBibGluZGVkID0gbmV3IGJuKG1zZykubXVsKGJsaW5kcy5ibGluZGVyKS51bW9kKHByaXYubW9kdWx1cyk7XG4gIHZhciBjMSA9IGJsaW5kZWQudG9SZWQoYm4ubW9udChwcml2LnByaW1lMSkpO1xuICB2YXIgYzIgPSBibGluZGVkLnRvUmVkKGJuLm1vbnQocHJpdi5wcmltZTIpKTtcbiAgdmFyIHFpbnYgPSBwcml2LmNvZWZmaWNpZW50O1xuICB2YXIgcCA9IHByaXYucHJpbWUxO1xuICB2YXIgcSA9IHByaXYucHJpbWUyO1xuICB2YXIgbTEgPSBjMS5yZWRQb3cocHJpdi5leHBvbmVudDEpO1xuICB2YXIgbTIgPSBjMi5yZWRQb3cocHJpdi5leHBvbmVudDIpO1xuICBtMSA9IG0xLmZyb21SZWQoKTtcbiAgbTIgPSBtMi5mcm9tUmVkKCk7XG4gIHZhciBoID0gbTEuaXN1YihtMikuaW11bChxaW52KS51bW9kKHApO1xuICBoLmltdWwocSk7XG4gIG0yLmlhZGQoaCk7XG4gIHJldHVybiBuZXcgQnVmZmVyKG0yLmltdWwoYmxpbmRzLnVuYmxpbmRlcikudW1vZChwcml2Lm1vZHVsdXMpLnRvQXJyYXkoZmFsc2UsIGxlbikpO1xufVxuY3J0LmdldHIgPSBnZXRyO1xuZnVuY3Rpb24gZ2V0cihwcml2KSB7XG4gIHZhciBsZW4gPSBwcml2Lm1vZHVsdXMuYnl0ZUxlbmd0aCgpO1xuICB2YXIgciA9IG5ldyBibihyYW5kb21CeXRlcyhsZW4pKTtcbiAgd2hpbGUgKHIuY21wKHByaXYubW9kdWx1cykgPj0gIDAgfHwgIXIudW1vZChwcml2LnByaW1lMSkgfHwgIXIudW1vZChwcml2LnByaW1lMikpIHtcbiAgICByID0gbmV3IGJuKHJhbmRvbUJ5dGVzKGxlbikpO1xuICB9XG4gIHJldHVybiByO1xufVxuIiwidmFyIGNyZWF0ZUhhc2ggPSByZXF1aXJlKCdjcmVhdGUtaGFzaCcpXG52YXIgc3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJylcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciBzaWduID0gcmVxdWlyZSgnLi9zaWduJylcbnZhciB2ZXJpZnkgPSByZXF1aXJlKCcuL3ZlcmlmeScpXG5cbnZhciBhbGdvcml0aG1zID0gcmVxdWlyZSgnLi9hbGdvcml0aG1zLmpzb24nKVxuT2JqZWN0LmtleXMoYWxnb3JpdGhtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGFsZ29yaXRobXNba2V5XS5pZCA9IG5ldyBCdWZmZXIoYWxnb3JpdGhtc1trZXldLmlkLCAnaGV4JylcbiAgYWxnb3JpdGhtc1trZXkudG9Mb3dlckNhc2UoKV0gPSBhbGdvcml0aG1zW2tleV1cbn0pXG5cbmZ1bmN0aW9uIFNpZ24gKGFsZ29yaXRobSkge1xuICBzdHJlYW0uV3JpdGFibGUuY2FsbCh0aGlzKVxuXG4gIHZhciBkYXRhID0gYWxnb3JpdGhtc1thbGdvcml0aG1dXG4gIGlmICghZGF0YSkgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG1lc3NhZ2UgZGlnZXN0JylcblxuICB0aGlzLl9oYXNoVHlwZSA9IGRhdGEuaGFzaFxuICB0aGlzLl9oYXNoID0gY3JlYXRlSGFzaChkYXRhLmhhc2gpXG4gIHRoaXMuX3RhZyA9IGRhdGEuaWRcbiAgdGhpcy5fc2lnblR5cGUgPSBkYXRhLnNpZ25cbn1cbmluaGVyaXRzKFNpZ24sIHN0cmVhbS5Xcml0YWJsZSlcblxuU2lnbi5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gX3dyaXRlIChkYXRhLCBfLCBkb25lKSB7XG4gIHRoaXMuX2hhc2gudXBkYXRlKGRhdGEpXG4gIGRvbmUoKVxufVxuXG5TaWduLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKGRhdGEsIGVuYykge1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhLCBlbmMpXG5cbiAgdGhpcy5faGFzaC51cGRhdGUoZGF0YSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuU2lnbi5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ25NZXRob2QgKGtleSwgZW5jKSB7XG4gIHRoaXMuZW5kKClcbiAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoLmRpZ2VzdCgpXG4gIHZhciBzaWcgPSBzaWduKGhhc2gsIGtleSwgdGhpcy5faGFzaFR5cGUsIHRoaXMuX3NpZ25UeXBlLCB0aGlzLl90YWcpXG5cbiAgcmV0dXJuIGVuYyA/IHNpZy50b1N0cmluZyhlbmMpIDogc2lnXG59XG5cbmZ1bmN0aW9uIFZlcmlmeSAoYWxnb3JpdGhtKSB7XG4gIHN0cmVhbS5Xcml0YWJsZS5jYWxsKHRoaXMpXG5cbiAgdmFyIGRhdGEgPSBhbGdvcml0aG1zW2FsZ29yaXRobV1cbiAgaWYgKCFkYXRhKSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWVzc2FnZSBkaWdlc3QnKVxuXG4gIHRoaXMuX2hhc2ggPSBjcmVhdGVIYXNoKGRhdGEuaGFzaClcbiAgdGhpcy5fdGFnID0gZGF0YS5pZFxuICB0aGlzLl9zaWduVHlwZSA9IGRhdGEuc2lnblxufVxuaW5oZXJpdHMoVmVyaWZ5LCBzdHJlYW0uV3JpdGFibGUpXG5cblZlcmlmeS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gX3dyaXRlIChkYXRhLCBfLCBkb25lKSB7XG4gIHRoaXMuX2hhc2gudXBkYXRlKGRhdGEpXG4gIGRvbmUoKVxufVxuXG5WZXJpZnkucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoZGF0YSwgZW5jKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEsIGVuYylcblxuICB0aGlzLl9oYXNoLnVwZGF0ZShkYXRhKVxuICByZXR1cm4gdGhpc1xufVxuXG5WZXJpZnkucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeU1ldGhvZCAoa2V5LCBzaWcsIGVuYykge1xuICBpZiAodHlwZW9mIHNpZyA9PT0gJ3N0cmluZycpIHNpZyA9IG5ldyBCdWZmZXIoc2lnLCBlbmMpXG5cbiAgdGhpcy5lbmQoKVxuICB2YXIgaGFzaCA9IHRoaXMuX2hhc2guZGlnZXN0KClcbiAgcmV0dXJuIHZlcmlmeShzaWcsIGhhc2gsIGtleSwgdGhpcy5fc2lnblR5cGUsIHRoaXMuX3RhZylcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2lnbiAoYWxnb3JpdGhtKSB7XG4gIHJldHVybiBuZXcgU2lnbihhbGdvcml0aG0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcmlmeSAoYWxnb3JpdGhtKSB7XG4gIHJldHVybiBuZXcgVmVyaWZ5KGFsZ29yaXRobSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNpZ246IGNyZWF0ZVNpZ24sXG4gIFZlcmlmeTogY3JlYXRlVmVyaWZ5LFxuICBjcmVhdGVTaWduOiBjcmVhdGVTaWduLFxuICBjcmVhdGVWZXJpZnk6IGNyZWF0ZVZlcmlmeVxufVxuIiwidmFyIG1vZGVNb2R1bGVzID0ge1xuICBFQ0I6IHJlcXVpcmUoJy4vZWNiJyksXG4gIENCQzogcmVxdWlyZSgnLi9jYmMnKSxcbiAgQ0ZCOiByZXF1aXJlKCcuL2NmYicpLFxuICBDRkI4OiByZXF1aXJlKCcuL2NmYjgnKSxcbiAgQ0ZCMTogcmVxdWlyZSgnLi9jZmIxJyksXG4gIE9GQjogcmVxdWlyZSgnLi9vZmInKSxcbiAgQ1RSOiByZXF1aXJlKCcuL2N0cicpLFxuICBHQ006IHJlcXVpcmUoJy4vY3RyJylcbn1cblxudmFyIG1vZGVzID0gcmVxdWlyZSgnLi9saXN0Lmpzb24nKVxuXG5mb3IgKHZhciBrZXkgaW4gbW9kZXMpIHtcbiAgbW9kZXNba2V5XS5tb2R1bGUgPSBtb2RlTW9kdWxlc1ttb2Rlc1trZXldLm1vZGVdXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kZXNcbiIsImZ1bmN0aW9uIGluY3IzMiAoaXYpIHtcbiAgdmFyIGxlbiA9IGl2Lmxlbmd0aFxuICB2YXIgaXRlbVxuICB3aGlsZSAobGVuLS0pIHtcbiAgICBpdGVtID0gaXYucmVhZFVJbnQ4KGxlbilcbiAgICBpZiAoaXRlbSA9PT0gMjU1KSB7XG4gICAgICBpdi53cml0ZVVJbnQ4KDAsIGxlbilcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbSsrXG4gICAgICBpdi53cml0ZVVJbnQ4KGl0ZW0sIGxlbilcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluY3IzMlxuIiwidmFyIHhvciA9IHJlcXVpcmUoJ2J1ZmZlci14b3InKVxuXG5leHBvcnRzLmVuY3J5cHQgPSBmdW5jdGlvbiAoc2VsZiwgYmxvY2spIHtcbiAgdmFyIGRhdGEgPSB4b3IoYmxvY2ssIHNlbGYuX3ByZXYpXG5cbiAgc2VsZi5fcHJldiA9IHNlbGYuX2NpcGhlci5lbmNyeXB0QmxvY2soZGF0YSlcbiAgcmV0dXJuIHNlbGYuX3ByZXZcbn1cblxuZXhwb3J0cy5kZWNyeXB0ID0gZnVuY3Rpb24gKHNlbGYsIGJsb2NrKSB7XG4gIHZhciBwYWQgPSBzZWxmLl9wcmV2XG5cbiAgc2VsZi5fcHJldiA9IGJsb2NrXG4gIHZhciBvdXQgPSBzZWxmLl9jaXBoZXIuZGVjcnlwdEJsb2NrKGJsb2NrKVxuXG4gIHJldHVybiB4b3Iob3V0LCBwYWQpXG59XG4iXSwic291cmNlUm9vdCI6IiJ9