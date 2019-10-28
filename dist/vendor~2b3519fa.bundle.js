(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "+215":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"chainstart\",\"comment\":\"Start of the Ethereum main chain\",\"eip\":{\"url\":\"\",\"status\":\"\"},\"status\":\"\",\"gasConfig\":{\"minGasLimit\":{\"v\":5000,\"d\":\"Minimum the gas limit may ever be\"},\"gasLimitBoundDivisor\":{\"v\":1024,\"d\":\"The bound divisor of the gas limit, used in update calculations\"}},\"gasPrices\":{\"base\":{\"v\":2,\"d\":\"Gas base cost, used e.g. for ChainID opcode (Istanbul)\"},\"tierStep\":{\"v\":[0,2,3,5,8,10,20],\"d\":\"Once per operation, for a selection of them\"},\"exp\":{\"v\":10,\"d\":\"Once per EXP instuction\"},\"expByte\":{\"v\":10,\"d\":\"Times ceil(log256(exponent)) for the EXP instruction\"},\"sha3\":{\"v\":30,\"d\":\"Once per SHA3 operation\"},\"sha3Word\":{\"v\":6,\"d\":\"Once per word of the SHA3 operation's data\"},\"sload\":{\"v\":50,\"d\":\"Once per SLOAD operation\"},\"sstoreSet\":{\"v\":20000,\"d\":\"Once per SSTORE operation if the zeroness changes from zero\"},\"sstoreReset\":{\"v\":5000,\"d\":\"Once per SSTORE operation if the zeroness does not change from zero\"},\"sstoreRefund\":{\"v\":15000,\"d\":\"Once per SSTORE operation if the zeroness changes to zero\"},\"jumpdest\":{\"v\":1,\"d\":\"Refunded gas, once per SSTORE operation if the zeroness changes to zero\"},\"log\":{\"v\":375,\"d\":\"Per LOG* operation\"},\"logData\":{\"v\":8,\"d\":\"Per byte in a LOG* operation's data\"},\"logTopic\":{\"v\":375,\"d\":\"Multiplied by the * of the LOG*, per LOG transaction. e.g. LOG0 incurs 0 * c_txLogTopicGas, LOG4 incurs 4 * c_txLogTopicGas\"},\"create\":{\"v\":32000,\"d\":\"Once per CREATE operation & contract-creation transaction\"},\"call\":{\"v\":40,\"d\":\"Once per CALL operation & message call transaction\"},\"callStipend\":{\"v\":2300,\"d\":\"Free gas given at beginning of call\"},\"callValueTransfer\":{\"v\":9000,\"d\":\"Paid for CALL when the value transfor is non-zero\"},\"callNewAccount\":{\"v\":25000,\"d\":\"Paid for CALL when the destination address didn't exist prior\"},\"selfdestructRefund\":{\"v\":24000,\"d\":\"Refunded following a selfdestruct operation\"},\"memory\":{\"v\":3,\"d\":\"Times the address of the (highest referenced byte in memory + 1). NOTE: referencing happens on read, write and in instructions such as RETURN and CALL\"},\"quadCoeffDiv\":{\"v\":512,\"d\":\"Divisor for the quadratic particle of the memory cost equation\"},\"createData\":{\"v\":200,\"d\":\"\"},\"tx\":{\"v\":21000,\"d\":\"Per transaction. NOTE: Not payable on data of calls between transactions\"},\"txCreation\":{\"v\":32000,\"d\":\"The cost of creating a contract via tx\"},\"txDataZero\":{\"v\":4,\"d\":\"Per byte of data attached to a transaction that equals zero. NOTE: Not payable on data of calls between transactions\"},\"txDataNonZero\":{\"v\":68,\"d\":\"Per byte of data attached to a transaction that is not equal to zero. NOTE: Not payable on data of calls between transactions\"},\"copy\":{\"v\":3,\"d\":\"Multiplied by the number of 32-byte words that are copied (round up) for any *COPY operation and added\"},\"ecRecover\":{\"v\":3000,\"d\":\"\"},\"sha256\":{\"v\":60,\"d\":\"\"},\"sha256Word\":{\"v\":12,\"d\":\"\"},\"ripemd160\":{\"v\":600,\"d\":\"\"},\"ripemd160Word\":{\"v\":120,\"d\":\"\"},\"identity\":{\"v\":15,\"d\":\"\"},\"identityWord\":{\"v\":3,\"d\":\"\"}},\"vm\":{\"stackLimit\":{\"v\":1024,\"d\":\"Maximum size of VM stack allowed\"},\"callCreateDepth\":{\"v\":1024,\"d\":\"Maximum depth of call/create stack\"},\"maxExtraDataSize\":{\"v\":32,\"d\":\"Maximum size extra data may be after Genesis\"}},\"pow\":{\"minimumDifficulty\":{\"v\":131072,\"d\":\"The minimum that the difficulty may ever be\"},\"difficultyBoundDivisor\":{\"v\":2048,\"d\":\"The bound divisor of the difficulty, used in the update calculations\"},\"durationLimit\":{\"v\":13,\"d\":\"The decision boundary on the blocktime duration used to determine whether difficulty should go up or not\"},\"epochDuration\":{\"v\":30000,\"d\":\"Duration between proof-of-work epochs\"},\"timebombPeriod\":{\"v\":100000,\"d\":\"Exponential difficulty timebomb period\"},\"minerReward\":{\"v\":\"5000000000000000000\",\"d\":\"the amount a miner get rewarded for mining a block\"}},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "+qE3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "0EcT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BN = __webpack_require__("OZ/i");
exports.BN = BN;
var rlp = __webpack_require__("o8pB");
exports.rlp = rlp;
var createKeccakHash = __webpack_require__("aYMp");
var secp256k1 = __webpack_require__("IzB8");
exports.secp256k1 = secp256k1;
var assert = __webpack_require__("9lTW");
var createHash = __webpack_require__("mObS");
var Buffer = __webpack_require__("hwdV").Buffer;
var ethjsUtil = __webpack_require__("mhLr");
Object.assign(exports, ethjsUtil);
/**
 * The max integer that this VM can handle
 */
exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);
/**
 * 2^256
 */
exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);
/**
 * Keccak-256 hash of null
 */
exports.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
/**
 * Keccak-256 hash of null
 */
exports.KECCAK256_NULL = Buffer.from(exports.KECCAK256_NULL_S, 'hex');
/**
 * Keccak-256 of an RLP of an empty array
 */
exports.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347';
/**
 * Keccak-256 of an RLP of an empty array
 */
exports.KECCAK256_RLP_ARRAY = Buffer.from(exports.KECCAK256_RLP_ARRAY_S, 'hex');
/**
 * Keccak-256 hash of the RLP of null
 */
exports.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
/**
 * Keccak-256 hash of the RLP of null
 */
exports.KECCAK256_RLP = Buffer.from(exports.KECCAK256_RLP_S, 'hex');
/**
 * Returns a buffer filled with 0s.
 * @param bytes the number of bytes the buffer should be
 */
exports.zeros = function (bytes) {
    return Buffer.allocUnsafe(bytes).fill(0);
};
/**
 * Returns a zero address.
 */
exports.zeroAddress = function () {
    var addressLength = 20;
    var addr = exports.zeros(addressLength);
    return exports.bufferToHex(addr);
};
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer|Array)
 * @param length the number of bytes the output should be
 * @param right whether to start padding form the left or right
 * @return (Buffer|Array)
 */
exports.setLengthLeft = function (msg, length, right) {
    if (right === void 0) { right = false; }
    var buf = exports.zeros(length);
    msg = exports.toBuffer(msg);
    if (right) {
        if (msg.length < length) {
            msg.copy(buf);
            return buf;
        }
        return msg.slice(0, length);
    }
    else {
        if (msg.length < length) {
            msg.copy(buf, length - msg.length);
            return buf;
        }
        return msg.slice(-length);
    }
};
exports.setLength = exports.setLengthLeft;
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer|Array)
 * @param length the number of bytes the output should be
 * @return (Buffer|Array)
 */
exports.setLengthRight = function (msg, length) {
    return exports.setLength(msg, length, true);
};
/**
 * Trims leading zeros from a `Buffer` or an `Array`.
 * @param a (Buffer|Array|String)
 * @return (Buffer|Array|String)
 */
exports.unpad = function (a) {
    a = ethjsUtil.stripHexPrefix(a);
    var first = a[0];
    while (a.length > 0 && first.toString() === '0') {
        a = a.slice(1);
        first = a[0];
    }
    return a;
};
exports.stripZeros = exports.unpad;
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param v the value
 */
exports.toBuffer = function (v) {
    if (!Buffer.isBuffer(v)) {
        if (Array.isArray(v)) {
            v = Buffer.from(v);
        }
        else if (typeof v === 'string') {
            if (exports.isHexString(v)) {
                v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex');
            }
            else {
                v = Buffer.from(v);
            }
        }
        else if (typeof v === 'number') {
            v = exports.intToBuffer(v);
        }
        else if (v === null || v === undefined) {
            v = Buffer.allocUnsafe(0);
        }
        else if (BN.isBN(v)) {
            v = v.toArrayLike(Buffer);
        }
        else if (v.toArray) {
            // converts a BN to a Buffer
            v = Buffer.from(v.toArray());
        }
        else {
            throw new Error('invalid type');
        }
    }
    return v;
};
/**
 * Converts a `Buffer` to a `Number`.
 * @param buf `Buffer` object to convert
 * @throws If the input number exceeds 53 bits.
 */
exports.bufferToInt = function (buf) {
    return new BN(exports.toBuffer(buf)).toNumber();
};
/**
 * Converts a `Buffer` into a hex `String`.
 * @param buf `Buffer` object to convert
 */
exports.bufferToHex = function (buf) {
    buf = exports.toBuffer(buf);
    return '0x' + buf.toString('hex');
};
/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param num Signed integer value
 */
exports.fromSigned = function (num) {
    return new BN(num).fromTwos(256);
};
/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param num
 */
exports.toUnsigned = function (num) {
    return Buffer.from(num.toTwos(256).toArray());
};
/**
 * Creates Keccak hash of the input
 * @param a The input data (Buffer|Array|String|Number)
 * @param bits The Keccak width
 */
exports.keccak = function (a, bits) {
    if (bits === void 0) { bits = 256; }
    a = exports.toBuffer(a);
    if (!bits)
        bits = 256;
    return createKeccakHash("keccak" + bits)
        .update(a)
        .digest();
};
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer|Array|String|Number)
 */
exports.keccak256 = function (a) {
    return exports.keccak(a);
};
/**
 * Creates SHA256 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 */
exports.sha256 = function (a) {
    a = exports.toBuffer(a);
    return createHash('sha256')
        .update(a)
        .digest();
};
/**
 * Creates RIPEMD160 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 * @param padded Whether it should be padded to 256 bits or not
 */
exports.ripemd160 = function (a, padded) {
    a = exports.toBuffer(a);
    var hash = createHash('rmd160')
        .update(a)
        .digest();
    if (padded === true) {
        return exports.setLength(hash, 32);
    }
    else {
        return hash;
    }
};
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */
exports.rlphash = function (a) {
    return exports.keccak(rlp.encode(a));
};
/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 */
exports.isValidPrivate = function (privateKey) {
    return secp256k1.privateKeyVerify(privateKey);
};
/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */
exports.isValidPublic = function (publicKey, sanitize) {
    if (sanitize === void 0) { sanitize = false; }
    if (publicKey.length === 64) {
        // Convert to SEC1 for secp256k1
        return secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]));
    }
    if (!sanitize) {
        return false;
    }
    return secp256k1.publicKeyVerify(publicKey);
};
/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */
exports.pubToAddress = function (pubKey, sanitize) {
    if (sanitize === void 0) { sanitize = false; }
    pubKey = exports.toBuffer(pubKey);
    if (sanitize && pubKey.length !== 64) {
        pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
    }
    assert(pubKey.length === 64);
    // Only take the lower 160bits of the hash
    return exports.keccak(pubKey).slice(-20);
};
exports.publicToAddress = exports.pubToAddress;
/**
 * Returns the ethereum public key of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
exports.privateToPublic = function (privateKey) {
    privateKey = exports.toBuffer(privateKey);
    // skip the type flag and use the X, Y points
    return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};
/**
 * Converts a public key to the Ethereum format.
 */
exports.importPublic = function (publicKey) {
    publicKey = exports.toBuffer(publicKey);
    if (publicKey.length !== 64) {
        publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
    }
    return publicKey;
};
/**
 * Returns the ECDSA signature of a message hash.
 */
exports.ecsign = function (msgHash, privateKey, chainId) {
    var sig = secp256k1.sign(msgHash, privateKey);
    var recovery = sig.recovery;
    var ret = {
        r: sig.signature.slice(0, 32),
        s: sig.signature.slice(32, 64),
        v: chainId ? recovery + (chainId * 2 + 35) : recovery + 27,
    };
    return ret;
};
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 */
exports.hashPersonalMessage = function (message) {
    var prefix = exports.toBuffer("\u0019Ethereum Signed Message:\n" + message.length.toString());
    return exports.keccak(Buffer.concat([prefix, message]));
};
/**
 * ECDSA public key recovery from signature.
 * @returns Recovered public key
 */
exports.ecrecover = function (msgHash, v, r, s, chainId) {
    var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64);
    var recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) {
        throw new Error('Invalid signature v value');
    }
    var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
    return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};
/**
 * Convert signature parameters into the format of `eth_sign` RPC method.
 * @returns Signature
 */
exports.toRpcSig = function (v, r, s, chainId) {
    var recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) {
        throw new Error('Invalid signature v value');
    }
    // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin
    return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r, 32), exports.setLengthLeft(s, 32), exports.toBuffer(v)]));
};
/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 */
exports.fromRpcSig = function (sig) {
    var buf = exports.toBuffer(sig);
    // NOTE: with potential introduction of chainId this might need to be updated
    if (buf.length !== 65) {
        throw new Error('Invalid signature length');
    }
    var v = buf[64];
    // support both versions of `eth_sign` responses
    if (v < 27) {
        v += 27;
    }
    return {
        v: v,
        r: buf.slice(0, 32),
        s: buf.slice(32, 64),
    };
};
/**
 * Returns the ethereum address of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */
exports.privateToAddress = function (privateKey) {
    return exports.publicToAddress(exports.privateToPublic(privateKey));
};
/**
 * Checks if the address is a valid. Accepts checksummed addresses too.
 */
exports.isValidAddress = function (address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
};
/**
 * Checks if a given address is a zero address.
 */
exports.isZeroAddress = function (address) {
    var zeroAddr = exports.zeroAddress();
    return zeroAddr === exports.addHexPrefix(address);
};
/**
 * Returns a checksummed address.
 */
exports.toChecksumAddress = function (address) {
    address = ethjsUtil.stripHexPrefix(address).toLowerCase();
    var hash = exports.keccak(address).toString('hex');
    var ret = '0x';
    for (var i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase();
        }
        else {
            ret += address[i];
        }
    }
    return ret;
};
/**
 * Checks if the address is a valid checksummed address.
 */
exports.isValidChecksumAddress = function (address) {
    return exports.isValidAddress(address) && exports.toChecksumAddress(address) === address;
};
/**
 * Generates an address of a newly created contract.
 * @param from The address which is creating this new address
 * @param nonce The nonce of the from account
 */
exports.generateAddress = function (from, nonce) {
    from = exports.toBuffer(from);
    var nonceBN = new BN(nonce);
    if (nonceBN.isZero()) {
        // in RLP we want to encode null in the case of zero nonce
        // read the RLP documentation for an answer if you dare
        return exports.rlphash([from, null]).slice(-20);
    }
    // Only take the lower 160bits of the hash
    return exports.rlphash([from, Buffer.from(nonceBN.toArray())]).slice(-20);
};
/**
 * Generates an address for a contract created using CREATE2.
 * @param from The address which is creating this new address
 * @param salt A salt
 * @param initCode The init code of the contract being created
 */
exports.generateAddress2 = function (from, salt, initCode) {
    var fromBuf = exports.toBuffer(from);
    var saltBuf = exports.toBuffer(salt);
    var initCodeBuf = exports.toBuffer(initCode);
    assert(fromBuf.length === 20);
    assert(saltBuf.length === 32);
    var address = exports.keccak256(Buffer.concat([Buffer.from('ff', 'hex'), fromBuf, saltBuf, exports.keccak256(initCodeBuf)]));
    return address.slice(-20);
};
/**
 * Returns true if the supplied address belongs to a precompiled account (Byzantium).
 */
exports.isPrecompiled = function (address) {
    var a = exports.unpad(address);
    return a.length === 1 && a[0] >= 1 && a[0] <= 8;
};
/**
 * Adds "0x" to a given `String` if it does not already start with "0x".
 */
exports.addHexPrefix = function (str) {
    if (typeof str !== 'string') {
        return str;
    }
    return ethjsUtil.isHexPrefixed(str) ? str : '0x' + str;
};
/**
 * Validate a ECDSA signature.
 * @param homesteadOrLater Indicates whether this is being used on either the homestead hardfork or a later one
 */
exports.isValidSignature = function (v, r, s, homesteadOrLater, chainId) {
    if (homesteadOrLater === void 0) { homesteadOrLater = true; }
    var SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
    var SECP256K1_N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);
    if (r.length !== 32 || s.length !== 32) {
        return false;
    }
    if (!isValidSigRecovery(calculateSigRecovery(v, chainId))) {
        return false;
    }
    var rBN = new BN(r);
    var sBN = new BN(s);
    if (rBN.isZero() || rBN.gt(SECP256K1_N) || sBN.isZero() || sBN.gt(SECP256K1_N)) {
        return false;
    }
    if (homesteadOrLater && sBN.cmp(SECP256K1_N_DIV_2) === 1) {
        return false;
    }
    return true;
};
/**
 * Converts a `Buffer` or `Array` to JSON.
 * @param ba (Buffer|Array)
 * @return (Array|String|null)
 */
exports.baToJSON = function (ba) {
    if (Buffer.isBuffer(ba)) {
        return "0x" + ba.toString('hex');
    }
    else if (ba instanceof Array) {
        var array = [];
        for (var i = 0; i < ba.length; i++) {
            array.push(exports.baToJSON(ba[i]));
        }
        return array;
    }
};
/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param self the `Object` to define properties on
 * @param fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param data data to be validated against the definitions
 */
exports.defineProperties = function (self, fields, data) {
    self.raw = [];
    self._fields = [];
    // attach the `toJSON`
    self.toJSON = function (label) {
        if (label === void 0) { label = false; }
        if (label) {
            var obj_1 = {};
            self._fields.forEach(function (field) {
                obj_1[field] = "0x" + self[field].toString('hex');
            });
            return obj_1;
        }
        return exports.baToJSON(self.raw);
    };
    self.serialize = function serialize() {
        return rlp.encode(self.raw);
    };
    fields.forEach(function (field, i) {
        self._fields.push(field.name);
        function getter() {
            return self.raw[i];
        }
        function setter(v) {
            v = exports.toBuffer(v);
            if (v.toString('hex') === '00' && !field.allowZero) {
                v = Buffer.allocUnsafe(0);
            }
            if (field.allowLess && field.length) {
                v = exports.stripZeros(v);
                assert(field.length >= v.length, "The field " + field.name + " must not have more " + field.length + " bytes");
            }
            else if (!(field.allowZero && v.length === 0) && field.length) {
                assert(field.length === v.length, "The field " + field.name + " must have byte length of " + field.length);
            }
            self.raw[i] = v;
        }
        Object.defineProperty(self, field.name, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter,
        });
        if (field.default) {
            self[field.name] = field.default;
        }
        // attach alias
        if (field.alias) {
            Object.defineProperty(self, field.alias, {
                enumerable: false,
                configurable: true,
                set: setter,
                get: getter,
            });
        }
    });
    // if the constuctor is passed data
    if (data) {
        if (typeof data === 'string') {
            data = Buffer.from(ethjsUtil.stripHexPrefix(data), 'hex');
        }
        if (Buffer.isBuffer(data)) {
            data = rlp.decode(data);
        }
        if (Array.isArray(data)) {
            if (data.length > self._fields.length) {
                throw new Error('wrong number of fields in data');
            }
            // make sure all the items are buffers
            data.forEach(function (d, i) {
                self[self._fields[i]] = exports.toBuffer(d);
            });
        }
        else if (typeof data === 'object') {
            var keys_1 = Object.keys(data);
            fields.forEach(function (field) {
                if (keys_1.indexOf(field.name) !== -1)
                    self[field.name] = data[field.name];
                if (keys_1.indexOf(field.alias) !== -1)
                    self[field.alias] = data[field.alias];
            });
        }
        else {
            throw new Error('invalid data');
        }
    }
};
function calculateSigRecovery(v, chainId) {
    return chainId ? v - (2 * chainId + 35) : v - 27;
}
function isValidSigRecovery(recovery) {
    return recovery === 0 || recovery === 1;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "1mU8":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"constantinople\",\"comment\":\"Postponed hardfork including EIP-1283 (SSTORE gas metering changes)\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-1013\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{\"netSstoreNoopGas\":{\"v\":200,\"d\":\"Once per SSTORE operation if the value doesn't change\"},\"netSstoreInitGas\":{\"v\":20000,\"d\":\"Once per SSTORE operation from clean zero\"},\"netSstoreCleanGas\":{\"v\":5000,\"d\":\"Once per SSTORE operation from clean non-zero\"},\"netSstoreDirtyGas\":{\"v\":200,\"d\":\"Once per SSTORE operation from dirty\"},\"netSstoreClearRefund\":{\"v\":15000,\"d\":\"Once per SSTORE operation for clearing an originally existing storage slot\"},\"netSstoreResetRefund\":{\"v\":4800,\"d\":\"Once per SSTORE operation for resetting to the original non-zero value\"},\"netSstoreResetClearRefund\":{\"v\":19800,\"d\":\"Once per SSTORE operation for resetting to the original zero value\"}},\"vm\":{},\"pow\":{\"minerReward\":{\"v\":\"2000000000000000000\",\"d\":\"The amount a miner gets rewarded for mining a block\"}},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "6vPO":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* eslint-disable no-useless-escape */
const utils = __webpack_require__("0EcT")
const BN = __webpack_require__("OZ/i")

var ABI = function () {
}

// Convert from short to canonical names
// FIXME: optimise or make this nicer?
function elementaryName (name) {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3)
  } else if (name === 'int') {
    return 'int256'
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4)
  } else if (name === 'uint') {
    return 'uint256'
  } else if (name.startsWith('fixed[')) {
    return 'fixed128x128' + name.slice(5)
  } else if (name === 'fixed') {
    return 'fixed128x128'
  } else if (name.startsWith('ufixed[')) {
    return 'ufixed128x128' + name.slice(6)
  } else if (name === 'ufixed') {
    return 'ufixed128x128'
  }
  return name
}

ABI.eventID = function (name, types) {
  // FIXME: use node.js util.format?
  var sig = name + '(' + types.map(elementaryName).join(',') + ')'
  return utils.keccak256(Buffer.from(sig))
}

ABI.methodID = function (name, types) {
  return ABI.eventID(name, types).slice(0, 4)
}

// Parse N from type<N>
function parseTypeN (type) {
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10)
}

// Parse N,M from type<N>x<M>
function parseTypeNxM (type) {
  var tmp = /^\D+(\d+)x(\d+)$/.exec(type)
  return [ parseInt(tmp[1], 10), parseInt(tmp[2], 10) ]
}

// Parse N in type[<N>] where "type" can itself be an array type.
function parseTypeArray (type) {
  var tmp = type.match(/(.*)\[(.*?)\]$/)
  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10)
  }
  return null
}

function parseNumber (arg) {
  var type = typeof arg
  if (type === 'string') {
    if (utils.isHexPrefixed(arg)) {
      return new BN(utils.stripHexPrefix(arg), 16)
    } else {
      return new BN(arg, 10)
    }
  } else if (type === 'number') {
    return new BN(arg)
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg
  } else {
    throw new Error('Argument is not a number')
  }
}

// someMethod(bytes,uint)
// someMethod(bytes,uint):(boolean)
function parseSignature (sig) {
  var tmp = /^(\w+)\((.*)\)$/.exec(sig)

  if (tmp.length !== 3) {
    throw new Error('Invalid method signature')
  }

  var args = /^(.+)\):\((.+)$/.exec(tmp[2])

  if (args !== null && args.length === 3) {
    return {
      method: tmp[1],
      args: args[1].split(','),
      retargs: args[2].split(',')
    }
  } else {
    var params = tmp[2].split(',')
    if (params.length === 1 && params[0] === '') {
      // Special-case (possibly naive) fixup for functions that take no arguments.
      // TODO: special cases are always bad, but this makes the function return
      // match what the calling functions expect
      params = []
    }
    return {
      method: tmp[1],
      args: params
    }
  }
}

// Encodes a single item (can be dynamic array)
// @returns: Buffer
function encodeSingle (type, arg) {
  var size, num, ret, i

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg))
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0)
  } else if (type === 'string') {
    return encodeSingle('bytes', Buffer.from(arg, 'utf8'))
  } else if (isArray(type)) {
    // this part handles fixed-length ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    if (typeof arg.length === 'undefined') {
      throw new Error('Not an array?')
    }
    size = parseTypeArray(type)
    if (size !== 'dynamic' && size !== 0 && arg.length > size) {
      throw new Error('Elements exceed array size: ' + size)
    }
    ret = []
    type = type.slice(0, type.lastIndexOf('['))
    if (typeof arg === 'string') {
      arg = JSON.parse(arg)
    }
    for (i in arg) {
      ret.push(encodeSingle(type, arg[i]))
    }
    if (size === 'dynamic') {
      var length = encodeSingle('uint256', arg.length)
      ret.unshift(length)
    }
    return Buffer.concat(ret)
  } else if (type === 'bytes') {
    arg = Buffer.from(arg)

    ret = Buffer.concat([ encodeSingle('uint256', arg.length), arg ])

    if ((arg.length % 32) !== 0) {
      ret = Buffer.concat([ ret, utils.zeros(32 - (arg.length % 32)) ])
    }

    return ret
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type)
    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size)
    }

    return utils.setLengthRight(arg, 32)
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type)
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid uint<N> width: ' + size)
    }

    num = parseNumber(arg)
    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    if (num < 0) {
      throw new Error('Supplied uint is negative')
    }

    return num.toArrayLike(Buffer, 'be', 32)
  } else if (type.startsWith('int')) {
    size = parseTypeN(type)
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid int<N> width: ' + size)
    }

    num = parseNumber(arg)
    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    return num.toTwos(256).toArrayLike(Buffer, 'be', 32)
  } else if (type.startsWith('ufixed')) {
    size = parseTypeNxM(type)

    num = parseNumber(arg)

    if (num < 0) {
      throw new Error('Supplied ufixed is negative')
    }

    return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))))
  } else if (type.startsWith('fixed')) {
    size = parseTypeNxM(type)

    return encodeSingle('int256', parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))))
  }

  throw new Error('Unsupported or invalid type: ' + type)
}

// Decodes a single item (can be dynamic array)
// @returns: array
// FIXME: this method will need a lot of attention at checking limits and validation
function decodeSingle (parsedType, data, offset) {
  if (typeof parsedType === 'string') {
    parsedType = parseType(parsedType)
  }
  var size, num, ret, i

  if (parsedType.name === 'address') {
    return decodeSingle(parsedType.rawType, data, offset).toArrayLike(Buffer, 'be', 20).toString('hex')
  } else if (parsedType.name === 'bool') {
    return decodeSingle(parsedType.rawType, data, offset).toString() === new BN(1).toString()
  } else if (parsedType.name === 'string') {
    var bytes = decodeSingle(parsedType.rawType, data, offset)
    return Buffer.from(bytes, 'utf8').toString()
  } else if (parsedType.isArray) {
    // this part handles fixed-length arrays ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    ret = []
    size = parsedType.size

    if (parsedType.size === 'dynamic') {
      offset = decodeSingle('uint256', data, offset).toNumber()
      size = decodeSingle('uint256', data, offset).toNumber()
      offset = offset + 32
    }
    for (i = 0; i < size; i++) {
      var decoded = decodeSingle(parsedType.subArray, data, offset)
      ret.push(decoded)
      offset += parsedType.subArray.memoryUsage
    }
    return ret
  } else if (parsedType.name === 'bytes') {
    offset = decodeSingle('uint256', data, offset).toNumber()
    size = decodeSingle('uint256', data, offset).toNumber()
    return data.slice(offset + 32, offset + 32 + size)
  } else if (parsedType.name.startsWith('bytes')) {
    return data.slice(offset, offset + parsedType.size)
  } else if (parsedType.name.startsWith('uint')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be')
    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded int exceeds width: ' + parsedType.size + ' vs ' + num.bitLength())
    }
    return num
  } else if (parsedType.name.startsWith('int')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be').fromTwos(256)
    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded uint exceeds width: ' + parsedType.size + ' vs ' + num.bitLength())
    }

    return num
  } else if (parsedType.name.startsWith('ufixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]))
    num = decodeSingle('uint256', data, offset)
    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet')
    }
    return num.div(size)
  } else if (parsedType.name.startsWith('fixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]))
    num = decodeSingle('int256', data, offset)
    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet')
    }
    return num.div(size)
  }
  throw new Error('Unsupported or invalid type: ' + parsedType.name)
}

// Parse the given type
// @returns: {} containing the type itself, memory usage and (including size and subArray if applicable)
function parseType (type) {
  var size
  var ret
  if (isArray(type)) {
    size = parseTypeArray(type)
    var subArray = type.slice(0, type.lastIndexOf('['))
    subArray = parseType(subArray)
    ret = {
      isArray: true,
      name: type,
      size: size,
      memoryUsage: size === 'dynamic' ? 32 : subArray.memoryUsage * size,
      subArray: subArray
    }
    return ret
  } else {
    var rawType
    switch (type) {
      case 'address':
        rawType = 'uint160'
        break
      case 'bool':
        rawType = 'uint8'
        break
      case 'string':
        rawType = 'bytes'
        break
    }
    ret = {
      rawType: rawType,
      name: type,
      memoryUsage: 32
    }

    if ((type.startsWith('bytes') && type !== 'bytes') || type.startsWith('uint') || type.startsWith('int')) {
      ret.size = parseTypeN(type)
    } else if (type.startsWith('ufixed') || type.startsWith('fixed')) {
      ret.size = parseTypeNxM(type)
    }

    if (type.startsWith('bytes') && type !== 'bytes' && (ret.size < 1 || ret.size > 32)) {
      throw new Error('Invalid bytes<N> width: ' + ret.size)
    }
    if ((type.startsWith('uint') || type.startsWith('int')) && (ret.size % 8 || ret.size < 8 || ret.size > 256)) {
      throw new Error('Invalid int/uint<N> width: ' + ret.size)
    }
    return ret
  }
}

// Is a type dynamic?
function isDynamic (type) {
  // FIXME: handle all types? I don't think anything is missing now
  return (type === 'string') || (type === 'bytes') || (parseTypeArray(type) === 'dynamic')
}

// Is a type an array?
function isArray (type) {
  return type.lastIndexOf(']') === type.length - 1
}

// Encode a method/event with arguments
// @types an array of string type names
// @args  an array of the appropriate values
ABI.rawEncode = function (types, values) {
  var output = []
  var data = []

  var headLength = 0

  types.forEach(function (type) {
    if (isArray(type)) {
      var size = parseTypeArray(type)

      if (size !== 'dynamic') {
        headLength += 32 * size
      } else {
        headLength += 32
      }
    } else {
      headLength += 32
    }
  })

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i])
    var value = values[i]
    var cur = encodeSingle(type, value)

    // Use the head/tail method for storing dynamic data
    if (isDynamic(type)) {
      output.push(encodeSingle('uint256', headLength))
      data.push(cur)
      headLength += cur.length
    } else {
      output.push(cur)
    }
  }

  return Buffer.concat(output.concat(data))
}

ABI.rawDecode = function (types, data) {
  var ret = []
  data = Buffer.from(data)
  var offset = 0
  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i])
    var parsed = parseType(type, data, offset)
    var decoded = decodeSingle(parsed, data, offset)
    offset += parsed.memoryUsage
    ret.push(decoded)
  }
  return ret
}

ABI.simpleEncode = function (method) {
  var args = Array.prototype.slice.call(arguments).slice(1)
  var sig = parseSignature(method)

  // FIXME: validate/convert arguments
  if (args.length !== sig.args.length) {
    throw new Error('Argument count mismatch')
  }

  return Buffer.concat([ ABI.methodID(sig.method, sig.args), ABI.rawEncode(sig.args, args) ])
}

ABI.simpleDecode = function (method, data) {
  var sig = parseSignature(method)

  // FIXME: validate/convert arguments
  if (!sig.retargs) {
    throw new Error('No return values in method')
  }

  return ABI.rawDecode(sig.retargs, data)
}

function stringify (type, value) {
  if (type.startsWith('address') || type.startsWith('bytes')) {
    return '0x' + value.toString('hex')
  } else {
    return value.toString()
  }
}

ABI.stringify = function (types, values) {
  var ret = []

  for (var i in types) {
    var type = types[i]
    var value = values[i]

    // if it is an array type, concat the items
    if (/^[^\[]+\[.*\]$/.test(type)) {
      value = value.map(function (item) {
        return stringify(type, item)
      }).join(', ')
    } else {
      value = stringify(type, value)
    }

    ret.push(value)
  }

  return ret
}

ABI.solidityHexValue = function (type, value, bitsize) {
  // pass in bitsize = null if use default bitsize
  var size, num
  if (isArray(type)) {
    var subType = type.replace(/\[.*?\]/, '')
    if (!isArray(subType)) {
      var arraySize = parseTypeArray(type)
      if (arraySize !== 'dynamic' && arraySize !== 0 && value.length > arraySize) {
        throw new Error('Elements exceed array size: ' + arraySize)
      }
    }
    var arrayValues = value.map(function (v) {
      return ABI.solidityHexValue(subType, v, 256)
    })
    return Buffer.concat(arrayValues)
  } else if (type === 'bytes') {
    return value
  } else if (type === 'string') {
    return Buffer.from(value, 'utf8')
  } else if (type === 'bool') {
    bitsize = bitsize || 8
    var padding = Array((bitsize) / 4).join('0')
    return Buffer.from(value ? padding + '1' : padding + '0', 'hex')
  } else if (type === 'address') {
    var bytesize = 20
    if (bitsize) {
      bytesize = bitsize / 8
    }
    return utils.setLengthLeft(value, bytesize)
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type)
    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size)
    }

    return utils.setLengthRight(value, size)
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type)
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid uint<N> width: ' + size)
    }

    num = parseNumber(value)
    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    bitsize = bitsize || size
    return num.toArrayLike(Buffer, 'be', bitsize / 8)
  } else if (type.startsWith('int')) {
    size = parseTypeN(type)
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid int<N> width: ' + size)
    }

    num = parseNumber(value)
    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    bitsize = bitsize || size
    return num.toTwos(size).toArrayLike(Buffer, 'be', bitsize / 8)
  } else {
    // FIXME: support all other types
    throw new Error('Unsupported or invalid type: ' + type)
  }
}

ABI.solidityPack = function (types, values) {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values')
  }

  var ret = []

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i])
    var value = values[i]
    ret.push(ABI.solidityHexValue(type, value, null))
  }

  return Buffer.concat(ret)
}

ABI.soliditySHA3 = function (types, values) {
  return utils.keccak256(ABI.solidityPack(types, values))
}

ABI.soliditySHA256 = function (types, values) {
  return utils.sha256(ABI.solidityPack(types, values))
}

ABI.solidityRIPEMD160 = function (types, values) {
  return utils.ripemd160(ABI.solidityPack(types, values), true)
}

// Serpent's users are familiar with this encoding
// - s: string
// - b: bytes
// - b<N>: bytes<N>
// - i: int256
// - a: int256[]

function isNumeric (c) {
  // FIXME: is this correct? Seems to work
  return (c >= '0') && (c <= '9')
}

// For a "documentation" refer to https://github.com/ethereum/serpent/blob/develop/preprocess.cpp
ABI.fromSerpent = function (sig) {
  var ret = []
  for (var i = 0; i < sig.length; i++) {
    var type = sig[i]
    if (type === 's') {
      ret.push('bytes')
    } else if (type === 'b') {
      var tmp = 'bytes'
      var j = i + 1
      while ((j < sig.length) && isNumeric(sig[j])) {
        tmp += sig[j] - '0'
        j++
      }
      i = j - 1
      ret.push(tmp)
    } else if (type === 'i') {
      ret.push('int256')
    } else if (type === 'a') {
      ret.push('int256[]')
    } else {
      throw new Error('Unsupported or invalid type: ' + type)
    }
  }
  return ret
}

ABI.toSerpent = function (types) {
  var ret = []
  for (var i = 0; i < types.length; i++) {
    var type = types[i]
    if (type === 'bytes') {
      ret.push('s')
    } else if (type.startsWith('bytes')) {
      ret.push('b' + parseTypeN(type))
    } else if (type === 'int256') {
      ret.push('i')
    } else if (type === 'int256[]') {
      ret.push('a')
    } else {
      throw new Error('Unsupported or invalid type: ' + type)
    }
  }
  return ret.join('')
}

module.exports = ABI

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "8h0i":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"mainnet\",\"chainId\":1,\"networkId\":1,\"comment\":\"The Ethereum main chain\",\"url\":\"https://ethstats.net/\",\"genesis\":{\"hash\":\"0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3\",\"timestamp\":null,\"gasLimit\":5000,\"difficulty\":17179869184,\"nonce\":\"0x0000000000000042\",\"extraData\":\"0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa\",\"stateRoot\":\"0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544\"},\"hardforks\":[{\"name\":\"chainstart\",\"block\":0,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"homestead\",\"block\":1150000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"dao\",\"block\":1920000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"tangerineWhistle\",\"block\":2463000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"spuriousDragon\",\"block\":2675000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"byzantium\",\"block\":4370000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"constantinople\",\"block\":7280000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"petersburg\",\"block\":7280000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"istanbul\",\"block\":null,\"consensus\":\"pow\",\"finality\":null}],\"bootstrapNodes\":[{\"ip\":\"13.93.211.84\",\"port\":30303,\"id\":\"3f1d12044546b76342d59d4a05532c14b85aa669704bfe1f864fe079415aa2c02d743e03218e57a33fb94523adb54032871a6c51b2cc5514cb7c7e35b3ed0a99\",\"location\":\"US-WEST\",\"comment\":\"Go Bootnode\"},{\"ip\":\"191.235.84.50\",\"port\":30303,\"id\":\"78de8a0916848093c73790ead81d1928bec737d565119932b98c6b100d944b7a95e94f847f689fc723399d2e31129d182f7ef3863f2b4c820abbf3ab2722344d\",\"location\":\"BR\",\"comment\":\"Go Bootnode\"},{\"ip\":\"13.75.154.138\",\"port\":30303,\"id\":\"158f8aab45f6d19c6cbf4a089c2670541a8da11978a2f90dbf6a502a4a3bab80d288afdbeb7ec0ef6d92de563767f3b1ea9e8e334ca711e9f8e2df5a0385e8e6\",\"location\":\"AU\",\"comment\":\"Go Bootnode\"},{\"ip\":\"52.74.57.123\",\"port\":30303,\"id\":\"1118980bf48b0a3640bdba04e0fe78b1add18e1cd99bf22d53daac1fd9972ad650df52176e7c7d89d1114cfef2bc23a2959aa54998a46afcf7d91809f0855082\",\"location\":\"SG\",\"comment\":\"Go Bootnode\"}]}");

/***/ }),

/***/ "BqNb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = {
    names: {
        '1': 'mainnet',
        '3': 'ropsten',
        '4': 'rinkeby',
        '42': 'kovan',
        '6284': 'goerli',
    },
    mainnet: __webpack_require__("8h0i"),
    ropsten: __webpack_require__("JhP1"),
    rinkeby: __webpack_require__("Qfqe"),
    kovan: __webpack_require__("kp94"),
    goerli: __webpack_require__("CS0d"),
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "CS0d":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"goerli\",\"chainId\":5,\"networkId\":5,\"comment\":\"Cross-client PoA test network\",\"url\":\"https://github.com/goerli/testnet\",\"genesis\":{\"hash\":\"0xbf7e331f7f7c1dd2e05159666b3bf8bc7a8a3a9eb1d518969eab529dd9b88c1a\",\"timestamp\":\"0x5c51a607\",\"gasLimit\":10485760,\"difficulty\":1,\"nonce\":\"0x0000000000000000\",\"extraData\":\"0x22466c6578692069732061207468696e6722202d204166726900000000000000e0a2bd4258d2768837baa26a28fe71dc079f84c70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"stateRoot\":\"0x5d6cded585e73c4e322c30c2f782a336316f17dd85a4863b9d838d2d4b8b3008\"},\"hardforks\":[{\"name\":\"chainstart\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"homestead\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"dao\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"tangerineWhistle\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"spuriousDragon\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"byzantium\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"constantinople\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"petersburg\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"istanbul\",\"block\":null,\"consensus\":\"poa\",\"finality\":null}],\"bootstrapNodes\":[{\"ip\":\"51.141.78.53\",\"port\":30303,\"id\":\"011f758e6552d105183b1761c5e2dea0111bc20fd5f6422bc7f91e0fabbec9a6595caf6239b37feb773dddd3f87240d99d859431891e4a642cf2a0a9e6cbb98a\",\"location\":\"\",\"comment\":\"Source: https://github.com/goerli/testnet/blob/master/bootnodes.txt\"},{\"ip\":\"13.93.54.137\",\"port\":30303,\"id\":\"176b9417f511d05b6b2cf3e34b756cf0a7096b3094572a8f6ef4cdcb9d1f9d00683bf0f83347eebdf3b81c3521c2332086d9592802230bf528eaf606a1d9677b\",\"location\":\"\",\"comment\":\"Source: https://github.com/goerli/testnet/blob/master/bootnodes.txt\"},{\"ip\":\"94.237.54.114\",\"port\":30313,\"id\":\"46add44b9f13965f7b9875ac6b85f016f341012d84f975377573800a863526f4da19ae2c620ec73d11591fa9510e992ecc03ad0751f53cc02f7c7ed6d55c7291\",\"location\":\"\",\"comment\":\"Source: https://github.com/goerli/testnet/blob/master/bootnodes.txt\"},{\"ip\":\"52.64.155.147\",\"port\":30303,\"id\":\"c1f8b7c2ac4453271fa07d8e9ecf9a2e8285aa0bd0c07df0131f47153306b0736fd3db8924e7a9bf0bed6b1d8d4f87362a71b033dc7c64547728d953e43e59b2\",\"location\":\"\",\"comment\":\"Source: https://github.com/goerli/testnet/blob/master/bootnodes.txt\"},{\"ip\":\"213.186.16.82\",\"port\":30303,\"id\":\"f4a9c6ee28586009fb5a96c8af13a58ed6d8315a9eee4772212c1d4d9cebe5a8b8a78ea4434f318726317d04a3f531a1ef0420cf9752605a562cfe858c46e263\",\"location\":\"\",\"comment\":\"Source: https://github.com/goerli/testnet/blob/master/bootnodes.txt\"}]}");

/***/ }),

/***/ "IET4":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"petersburg\",\"comment\":\"Aka constantinopleFix, removes EIP-1283, activate together with or after constantinople\",\"eip\":{\"url\":\"https://github.com/ethereum/EIPs/pull/1716\",\"status\":\"Draft\"},\"gasConfig\":{},\"gasPrices\":{\"netSstoreNoopGas\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreInitGas\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreCleanGas\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreDirtyGas\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreClearRefund\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreResetRefund\":{\"v\":null,\"d\":\"Removed along EIP-1283\"},\"netSstoreResetClearRefund\":{\"v\":null,\"d\":\"Removed along EIP-1283\"}},\"vm\":{},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "JhP1":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"ropsten\",\"chainId\":3,\"networkId\":3,\"comment\":\"PoW test network\",\"url\":\"https://github.com/ethereum/ropsten\",\"genesis\":{\"hash\":\"0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d\",\"timestamp\":null,\"gasLimit\":16777216,\"difficulty\":1048576,\"nonce\":\"0x0000000000000042\",\"extraData\":\"0x3535353535353535353535353535353535353535353535353535353535353535\",\"stateRoot\":\"0x217b0bbcfb72e2d57e28f33cb361b9983513177755dc3f33ce3e7022ed62b77b\"},\"hardforks\":[{\"name\":\"chainstart\",\"block\":0,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"homestead\",\"block\":0,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"dao\",\"block\":null,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"tangerineWhistle\",\"block\":0,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"spuriousDragon\",\"block\":10,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"byzantium\",\"block\":1700000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"constantinople\",\"block\":4230000,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"petersburg\",\"block\":4939394,\"consensus\":\"pow\",\"finality\":null},{\"name\":\"istanbul\",\"block\":null,\"consensus\":\"pow\",\"finality\":null}],\"bootstrapNodes\":[{\"ip\":\"52.176.7.10\",\"port\":\"30303\",\"id\":\"30b7ab30a01c124a6cceca36863ece12c4f5fa68e3ba9b0b51407ccc002eeed3b3102d20a88f1c1d3c3154e2449317b8ef95090e77b312d5cc39354f86d5d606\",\"network\":\"Ropsten\",\"chainId\":3,\"location\":\"US\",\"comment\":\"US-Azure geth\"},{\"ip\":\"52.176.100.77\",\"port\":\"30303\",\"id\":\"865a63255b3bb68023b6bffd5095118fcc13e79dcf014fe4e47e065c350c7cc72af2e53eff895f11ba1bbb6a2b33271c1116ee870f266618eadfc2e78aa7349c\",\"network\":\"Ropsten\",\"chainId\":3,\"location\":\"US\",\"comment\":\"US-Azure parity\"},{\"ip\":\"52.232.243.152\",\"port\":\"30303\",\"id\":\"6332792c4a00e3e4ee0926ed89e0d27ef985424d97b6a45bf0f23e51f0dcb5e66b875777506458aea7af6f9e4ffb69f43f3778ee73c81ed9d34c51c4b16b0b0f\",\"network\":\"Ropsten\",\"chainId\":3,\"location\":\"US\",\"comment\":\"Parity\"},{\"ip\":\"192.81.208.223\",\"port\":\"30303\",\"id\":\"94c15d1b9e2fe7ce56e458b9a3b672ef11894ddedd0c6f247e0f1d3487f52b66208fb4aeb8179fce6e3a749ea93ed147c37976d67af557508d199d9594c35f09\",\"network\":\"Ropsten\",\"chainId\":3,\"location\":\"US\",\"comment\":\"@gpip\"}]}");

/***/ }),

/***/ "Q8Wm":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"byzantium\",\"comment\":\"Hardfork with new precompiles, instructions and other protocol changes\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-609\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{\"modexpGquaddivisor\":{\"v\":20,\"d\":\"Gquaddivisor from modexp precompile for gas calculation\"},\"ecAdd\":{\"v\":500,\"d\":\"Gas costs for curve addition precompile\"},\"ecMul\":{\"v\":40000,\"d\":\"Gas costs for curve multiplication precompile\"},\"ecPairing\":{\"v\":100000,\"d\":\"Base gas costs for curve pairing precompile\"},\"ecPairingWord\":{\"v\":80000,\"d\":\"Gas costs regarding curve pairing precompile input length\"}},\"vm\":{},\"pow\":{\"minerReward\":{\"v\":\"3000000000000000000\",\"d\":\"the amount a miner get rewarded for mining a block\"}},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "Qfqe":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"rinkeby\",\"chainId\":4,\"networkId\":4,\"comment\":\"PoA test network\",\"url\":\"https://www.rinkeby.io\",\"genesis\":{\"hash\":\"0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177\",\"timestamp\":\"0x58ee40ba\",\"gasLimit\":4700000,\"difficulty\":1,\"nonce\":\"0x0000000000000000\",\"extraData\":\"0x52657370656374206d7920617574686f7269746168207e452e436172746d616e42eb768f2244c8811c63729a21a3569731535f067ffc57839b00206d1ad20c69a1981b489f772031b279182d99e65703f0076e4812653aab85fca0f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"stateRoot\":\"0x53580584816f617295ea26c0e17641e0120cab2f0a8ffb53a866fd53aa8e8c2d\"},\"hardforks\":[{\"name\":\"chainstart\",\"block\":0,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"homestead\",\"block\":1,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"dao\",\"block\":null,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"tangerineWhistle\",\"block\":2,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"spuriousDragon\",\"block\":3,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"byzantium\",\"block\":1035301,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"constantinople\",\"block\":null,\"consensus\":\"poa\",\"finality\":null},{\"name\":\"istanbul\",\"block\":null,\"consensus\":\"poa\",\"finality\":null}],\"bootstrapNodes\":[{\"ip\":\"52.169.42.101\",\"port\":30303,\"id\":\"a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf\",\"location\":\"IE\",\"comment\":\"\"},{\"ip\":\"52.3.158.184\",\"port\":30303,\"id\":\"343149e4feefa15d882d9fe4ac7d88f885bd05ebb735e547f12e12080a9fa07c8014ca6fd7f373123488102fe5e34111f8509cf0b7de3f5b44339c9f25e87cb8\",\"location\":\"\",\"comment\":\"INFURA\"}]}");

/***/ }),

/***/ "Soe5":
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
    Buffer = __webpack_require__("HDXh").Buffer;
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
    if (num.isZero()) return new BN(1);
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

/***/ }),

/***/ "ZioU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hardforks = [
    ['chainstart', __webpack_require__("+215")],
    ['homestead', __webpack_require__("mCVm")],
    ['dao', __webpack_require__("cwbK")],
    ['tangerineWhistle', __webpack_require__("kbGD")],
    ['spuriousDragon', __webpack_require__("asp8")],
    ['byzantium', __webpack_require__("Q8Wm")],
    ['constantinople', __webpack_require__("1mU8")],
    ['petersburg', __webpack_require__("IET4")],
    ['istanbul', __webpack_require__("rqBE")],
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "asp8":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"spuriousDragon\",\"comment\":\"HF with EIPs for simple replay attack protection, EXP cost increase, state trie clearing, contract code size limit\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-607\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{\"expByte\":{\"v\":50,\"d\":\"Times ceil(log256(exponent)) for the EXP instruction\"}},\"vm\":{\"maxCodeSize\":{\"v\":24576,\"d\":\"Maximum length of contract code\"}},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "cMGI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("Soe5");
var numberToBN = __webpack_require__("prZD");

var zero = new BN(0);
var negative1 = new BN(-1);

// complete ethereum unit map
var unitMap = {
  'noether': '0', // eslint-disable-line
  'wei': '1', // eslint-disable-line
  'kwei': '1000', // eslint-disable-line
  'Kwei': '1000', // eslint-disable-line
  'babbage': '1000', // eslint-disable-line
  'femtoether': '1000', // eslint-disable-line
  'mwei': '1000000', // eslint-disable-line
  'Mwei': '1000000', // eslint-disable-line
  'lovelace': '1000000', // eslint-disable-line
  'picoether': '1000000', // eslint-disable-line
  'gwei': '1000000000', // eslint-disable-line
  'Gwei': '1000000000', // eslint-disable-line
  'shannon': '1000000000', // eslint-disable-line
  'nanoether': '1000000000', // eslint-disable-line
  'nano': '1000000000', // eslint-disable-line
  'szabo': '1000000000000', // eslint-disable-line
  'microether': '1000000000000', // eslint-disable-line
  'micro': '1000000000000', // eslint-disable-line
  'finney': '1000000000000000', // eslint-disable-line
  'milliether': '1000000000000000', // eslint-disable-line
  'milli': '1000000000000000', // eslint-disable-line
  'ether': '1000000000000000000', // eslint-disable-line
  'kether': '1000000000000000000000', // eslint-disable-line
  'grand': '1000000000000000000000', // eslint-disable-line
  'mether': '1000000000000000000000000', // eslint-disable-line
  'gether': '1000000000000000000000000000', // eslint-disable-line
  'tether': '1000000000000000000000000000000' };

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default ether
 * @returns {BigNumber} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
function getValueOfUnit(unitInput) {
  var unit = unitInput ? unitInput.toLowerCase() : 'ether';
  var unitValue = unitMap[unit]; // eslint-disable-line

  if (typeof unitValue !== 'string') {
    throw new Error('[ethjs-unit] the unit provided ' + unitInput + ' doesn\'t exists, please use the one of the following units ' + JSON.stringify(unitMap, null, 2));
  }

  return new BN(unitValue, 10);
}

function numberToString(arg) {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error('while converting number to string, invalid number value \'' + arg + '\', should be a number matching (^-?[0-9.]+).');
    }
    return arg;
  } else if (typeof arg === 'number') {
    return String(arg);
  } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else {
      // eslint-disable-line
      return arg.toString(10);
    }
  }
  throw new Error('while converting number to string, invalid number value \'' + arg + '\' type ' + typeof arg + '.');
}

function fromWei(weiInput, unit, optionsInput) {
  var wei = numberToBN(weiInput); // eslint-disable-line
  var negative = wei.lt(zero); // eslint-disable-line
  var base = getValueOfUnit(unit);
  var baseLength = unitMap[unit].length - 1 || 1;
  var options = optionsInput || {};

  if (negative) {
    wei = wei.mul(negative1);
  }

  var fraction = wei.mod(base).toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = '0' + fraction;
  }

  if (!options.pad) {
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  var whole = wei.div(base).toString(10); // eslint-disable-line

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var value = '' + whole + (fraction == '0' ? '' : '.' + fraction); // eslint-disable-line

  if (negative) {
    value = '-' + value;
  }

  return value;
}

function toWei(etherInput, unit) {
  var ether = numberToString(etherInput); // eslint-disable-line
  var base = getValueOfUnit(unit);
  var baseLength = unitMap[unit].length - 1 || 1;

  // Is it negative?
  var negative = ether.substring(0, 1) === '-'; // eslint-disable-line
  if (negative) {
    ether = ether.substring(1);
  }

  if (ether === '.') {
    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, invalid value');
  }

  // Split it into a whole and fractional part
  var comps = ether.split('.'); // eslint-disable-line
  if (comps.length > 2) {
    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei,  too many decimal points');
  }

  var whole = comps[0],
      fraction = comps[1]; // eslint-disable-line

  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > baseLength) {
    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, too many decimal places');
  }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  whole = new BN(whole);
  fraction = new BN(fraction);
  var wei = whole.mul(base).add(fraction); // eslint-disable-line

  if (negative) {
    wei = wei.mul(negative1);
  }

  return new BN(wei.toString(10), 10);
}

module.exports = {
  unitMap: unitMap,
  numberToString: numberToString,
  getValueOfUnit: getValueOfUnit,
  fromWei: fromWei,
  toWei: toWei
};

/***/ }),

/***/ "cwbK":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"dao\",\"comment\":\"DAO rescue hardfork\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-779\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{},\"vm\":{},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "ga3E":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("6vPO")


/***/ }),

/***/ "kbGD":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"tangerineWhistle\",\"comment\":\"Hardfork with gas cost changes for IO-heavy operations\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-608\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{\"sload\":{\"v\":200,\"d\":\"Once per SLOAD operation\"},\"call\":{\"v\":700,\"d\":\"Once per CALL operation & message call transaction\"}},\"vm\":{},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "kp94":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"kovan\",\"chainId\":42,\"networkId\":42,\"comment\":\"Parity PoA test network\",\"url\":\"https://kovan-testnet.github.io/website/\",\"genesis\":{\"hash\":\"0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9\",\"timestamp\":null,\"gasLimit\":6000000,\"difficulty\":131072,\"nonce\":\"0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"extraData\":\"0x\",\"stateRoot\":\"0x2480155b48a1cea17d67dbfdfaafe821c1d19cdd478c5358e8ec56dec24502b2\"},\"hardforks\":[],\"bootstrapNodes\":[{\"ip\":\"40.71.221.215\",\"port\":30303,\"id\":\"56abaf065581a5985b8c5f4f88bd202526482761ba10be9bfdcd14846dd01f652ec33fde0f8c0fd1db19b59a4c04465681fcef50e11380ca88d25996191c52de\",\"location\":\"\",\"comment\":\"Parity Bootnode\"},{\"ip\":\"52.166.117.77\",\"port\":30303,\"id\":\"d07827483dc47b368eaf88454fb04b41b7452cf454e194e2bd4c14f98a3278fed5d819dbecd0d010407fc7688d941ee1e58d4f9c6354d3da3be92f55c17d7ce3\",\"location\":\"\",\"comment\":\"Parity Bootnode\"},{\"ip\":\"52.165.239.18\",\"port\":30303,\"id\":\"8fa162563a8e5a05eef3e1cd5abc5828c71344f7277bb788a395cce4a0e30baf2b34b92fe0b2dbbba2313ee40236bae2aab3c9811941b9f5a7e8e90aaa27ecba\",\"location\":\"\",\"comment\":\"Parity Bootnode\"},{\"ip\":\"52.243.47.56\",\"port\":30303,\"id\":\"7e2e7f00784f516939f94e22bdc6cf96153603ca2b5df1c7cc0f90a38e7a2f218ffb1c05b156835e8b49086d11fdd1b3e2965be16baa55204167aa9bf536a4d9\",\"location\":\"\",\"comment\":\"Parity Bootnode\"},{\"ip\":\"40.68.248.100\",\"port\":30303,\"id\":\"0518a3d35d4a7b3e8c433e7ffd2355d84a1304ceb5ef349787b556197f0c87fad09daed760635b97d52179d645d3e6d16a37d2cc0a9945c2ddf585684beb39ac\",\"location\":\"\",\"comment\":\"Parity Bootnode\"}]}");

/***/ }),

/***/ "mCVm":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"homestead\",\"comment\":\"Homestead hardfork with protocol and network changes\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-606\",\"status\":\"Final\"},\"gasConfig\":{},\"gasPrices\":{},\"vm\":{},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "mhLr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var isHexPrefixed = __webpack_require__("UWJ2");
var stripHexPrefix = __webpack_require__("hbHZ");

/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
function padToEven(value) {
  var a = value; // eslint-disable-line

  if (typeof a !== 'string') {
    throw new Error('[ethjs-util] while padding to even, value must be string, is currently ' + typeof a + ', while padToEven.');
  }

  if (a.length % 2) {
    a = '0' + a;
  }

  return a;
}

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex(i) {
  var hex = i.toString(16); // eslint-disable-line

  return '0x' + hex;
}

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer(i) {
  var hex = intToHex(i);

  return new Buffer(padToEven(hex.slice(2)), 'hex');
}

/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */
function getBinarySize(str) {
  if (typeof str !== 'string') {
    throw new Error('[ethjs-util] while getting binary size, method getBinarySize requires input \'str\' to be type String, got \'' + typeof str + '\'.');
  }

  return Buffer.byteLength(str, 'utf8');
}

/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */
function arrayContainsArray(superset, subset, some) {
  if (Array.isArray(superset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'superset\' to be an array got type \'' + typeof superset + '\'');
  }
  if (Array.isArray(subset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'subset\' to be an array got type \'' + typeof subset + '\'');
  }

  return subset[Boolean(some) && 'some' || 'every'](function (value) {
    return superset.indexOf(value) >= 0;
  });
}

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toUtf8(hex) {
  var bufferValue = new Buffer(padToEven(stripHexPrefix(hex).replace(/^0+|0+$/g, '')), 'hex');

  return bufferValue.toString('utf8');
}

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toAscii(hex) {
  var str = ''; // eslint-disable-line
  var i = 0,
      l = hex.length; // eslint-disable-line

  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }

  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
}

/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromUtf8(stringValue) {
  var str = new Buffer(stringValue, 'utf8');

  return '0x' + padToEven(str.toString('hex')).replace(/^0+|0+$/g, '');
}

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromAscii(stringValue) {
  var hex = ''; // eslint-disable-line
  for (var i = 0; i < stringValue.length; i++) {
    // eslint-disable-line
    var code = stringValue.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
  }

  return '0x' + hex;
}

/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */
function getKeys(params, key, allowEmpty) {
  if (!Array.isArray(params)) {
    throw new Error('[ethjs-util] method getKeys expecting type Array as \'params\' input, got \'' + typeof params + '\'');
  }
  if (typeof key !== 'string') {
    throw new Error('[ethjs-util] method getKeys expecting type String for input \'key\' got \'' + typeof key + '\'.');
  }

  var result = []; // eslint-disable-line

  for (var i = 0; i < params.length; i++) {
    // eslint-disable-line
    var value = params[i][key]; // eslint-disable-line
    if (allowEmpty && !value) {
      value = '';
    } else if (typeof value !== 'string') {
      throw new Error('invalid abi');
    }
    result.push(value);
  }

  return result;
}

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
function isHexString(value, length) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

module.exports = {
  arrayContainsArray: arrayContainsArray,
  intToBuffer: intToBuffer,
  getBinarySize: getBinarySize,
  isHexPrefixed: isHexPrefixed,
  stripHexPrefix: stripHexPrefix,
  padToEven: padToEven,
  intToHex: intToHex,
  fromAscii: fromAscii,
  fromUtf8: fromUtf8,
  toAscii: toAscii,
  toUtf8: toUtf8,
  getKeys: getKeys,
  isHexString: isHexString
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "pi6U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chains_1 = __webpack_require__("BqNb");
var hardforks_1 = __webpack_require__("ZioU");
/**
 * Common class to access chain and hardfork parameters
 */
var Common = /** @class */ (function () {
    /**
     * @constructor
     * @param chain String ('mainnet') or Number (1) chain
     * @param hardfork String identifier ('byzantium') for hardfork (optional)
     * @param supportedHardforks Limit parameter returns to the given hardforks (optional)
     */
    function Common(chain, hardfork, supportedHardforks) {
        this._chainParams = this.setChain(chain);
        this._hardfork = null;
        this._supportedHardforks = supportedHardforks === undefined ? [] : supportedHardforks;
        if (hardfork) {
            this.setHardfork(hardfork);
        }
    }
    /**
     * Creates a Common object for a custom chain, based on a standard one. It uses all the [[Chain]]
     * params from [[baseChain]] except the ones overridden in [[customChainParams]].
     *
     * @param baseChain The name (`mainnet`) or id (`1`) of a standard chain used to base the custom
     * chain params on.
     * @param customChainParams The custom parameters of the chain.
     * @param hardfork String identifier ('byzantium') for hardfork (optional)
     * @param supportedHardforks Limit parameter returns to the given hardforks (optional)
     */
    Common.forCustomChain = function (baseChain, customChainParams, hardfork, supportedHardforks) {
        var standardChainParams = Common._getChainParams(baseChain);
        return new Common(__assign({}, standardChainParams, customChainParams), hardfork, supportedHardforks);
    };
    Common._getChainParams = function (chain) {
        if (typeof chain === 'number') {
            if (chains_1.chains['names'][chain]) {
                return chains_1.chains[chains_1.chains['names'][chain]];
            }
            throw new Error("Chain with ID " + chain + " not supported");
        }
        if (chains_1.chains[chain]) {
            return chains_1.chains[chain];
        }
        throw new Error("Chain with name " + chain + " not supported");
    };
    /**
     * Sets the chain
     * @param chain String ('mainnet') or Number (1) chain
     *     representation. Or, a Dictionary of chain parameters for a private network.
     * @returns The dictionary with parameters set as chain
     */
    Common.prototype.setChain = function (chain) {
        if (typeof chain === 'number' || typeof chain === 'string') {
            this._chainParams = Common._getChainParams(chain);
        }
        else if (typeof chain === 'object') {
            var required = ['networkId', 'genesis', 'hardforks', 'bootstrapNodes'];
            for (var _i = 0, required_1 = required; _i < required_1.length; _i++) {
                var param = required_1[_i];
                if (chain[param] === undefined) {
                    throw new Error("Missing required chain parameter: " + param);
                }
            }
            this._chainParams = chain;
        }
        else {
            throw new Error('Wrong input format');
        }
        return this._chainParams;
    };
    /**
     * Sets the hardfork to get params for
     * @param hardfork String identifier ('byzantium')
     */
    Common.prototype.setHardfork = function (hardfork) {
        if (!this._isSupportedHardfork(hardfork)) {
            throw new Error("Hardfork " + hardfork + " not set as supported in supportedHardforks");
        }
        var changed = false;
        for (var _i = 0, hardforkChanges_1 = hardforks_1.hardforks; _i < hardforkChanges_1.length; _i++) {
            var hfChanges = hardforkChanges_1[_i];
            if (hfChanges[0] === hardfork) {
                this._hardfork = hardfork;
                changed = true;
            }
        }
        if (!changed) {
            throw new Error("Hardfork with name " + hardfork + " not supported");
        }
    };
    /**
     * Internal helper function to choose between hardfork set and hardfork provided as param
     * @param hardfork Hardfork given to function as a parameter
     * @returns Hardfork chosen to be used
     */
    Common.prototype._chooseHardfork = function (hardfork, onlySupported) {
        onlySupported = onlySupported === undefined ? true : onlySupported;
        if (!hardfork) {
            if (!this._hardfork) {
                throw new Error('Method called with neither a hardfork set nor provided by param');
            }
            else {
                hardfork = this._hardfork;
            }
        }
        else if (onlySupported && !this._isSupportedHardfork(hardfork)) {
            throw new Error("Hardfork " + hardfork + " not set as supported in supportedHardforks");
        }
        return hardfork;
    };
    /**
     * Internal helper function, returns the params for the given hardfork for the chain set
     * @param hardfork Hardfork name
     * @returns Dictionary with hardfork params
     */
    Common.prototype._getHardfork = function (hardfork) {
        var hfs = this.hardforks();
        for (var _i = 0, hfs_1 = hfs; _i < hfs_1.length; _i++) {
            var hf = hfs_1[_i];
            if (hf['name'] === hardfork)
                return hf;
        }
        throw new Error("Hardfork " + hardfork + " not defined for chain " + this.chainName());
    };
    /**
     * Internal helper function to check if a hardfork is set to be supported by the library
     * @param hardfork Hardfork name
     * @returns True if hardfork is supported
     */
    Common.prototype._isSupportedHardfork = function (hardfork) {
        if (this._supportedHardforks.length > 0) {
            for (var _i = 0, _a = this._supportedHardforks; _i < _a.length; _i++) {
                var supportedHf = _a[_i];
                if (hardfork === supportedHf)
                    return true;
            }
        }
        else {
            return true;
        }
        return false;
    };
    /**
     * Returns the parameter corresponding to a hardfork
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow', 'casper', 'sharding')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @param hardfork Hardfork name, optional if hardfork set
     */
    Common.prototype.param = function (topic, name, hardfork) {
        hardfork = this._chooseHardfork(hardfork);
        var value;
        for (var _i = 0, hardforkChanges_2 = hardforks_1.hardforks; _i < hardforkChanges_2.length; _i++) {
            var hfChanges = hardforkChanges_2[_i];
            if (!hfChanges[1][topic]) {
                throw new Error("Topic " + topic + " not defined");
            }
            if (hfChanges[1][topic][name] !== undefined) {
                value = hfChanges[1][topic][name].v;
            }
            if (hfChanges[0] === hardfork)
                break;
        }
        if (value === undefined) {
            throw new Error(topic + " value for " + name + " not found");
        }
        return value;
    };
    /**
     * Returns a parameter for the hardfork active on block number
     * @param topic Parameter topic
     * @param name Parameter name
     * @param blockNumber Block number
     */
    Common.prototype.paramByBlock = function (topic, name, blockNumber) {
        var activeHfs = this.activeHardforks(blockNumber);
        var hardfork = activeHfs[activeHfs.length - 1]['name'];
        return this.param(topic, name, hardfork);
    };
    /**
     * Checks if set or provided hardfork is active on block number
     * @param hardfork Hardfork name or null (for HF set)
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    Common.prototype.hardforkIsActiveOnBlock = function (hardfork, blockNumber, opts) {
        opts = opts !== undefined ? opts : {};
        var onlySupported = opts.onlySupported === undefined ? false : opts.onlySupported;
        hardfork = this._chooseHardfork(hardfork, onlySupported);
        var hfBlock = this.hardforkBlock(hardfork);
        if (hfBlock !== null && blockNumber >= hfBlock)
            return true;
        return false;
    };
    /**
     * Alias to hardforkIsActiveOnBlock when hardfork is set
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    Common.prototype.activeOnBlock = function (blockNumber, opts) {
        return this.hardforkIsActiveOnBlock(null, blockNumber, opts);
    };
    /**
     * Sequence based check if given or set HF1 is greater than or equal HF2
     * @param hardfork1 Hardfork name or null (if set)
     * @param hardfork2 Hardfork name
     * @param opts Hardfork options
     * @returns True if HF1 gte HF2
     */
    Common.prototype.hardforkGteHardfork = function (hardfork1, hardfork2, opts) {
        opts = opts !== undefined ? opts : {};
        var onlyActive = opts.onlyActive === undefined ? false : opts.onlyActive;
        hardfork1 = this._chooseHardfork(hardfork1, opts.onlySupported);
        var hardforks;
        if (onlyActive) {
            hardforks = this.activeHardforks(null, opts);
        }
        else {
            hardforks = this.hardforks();
        }
        var posHf1 = -1, posHf2 = -1;
        var index = 0;
        for (var _i = 0, hardforks_2 = hardforks; _i < hardforks_2.length; _i++) {
            var hf = hardforks_2[_i];
            if (hf['name'] === hardfork1)
                posHf1 = index;
            if (hf['name'] === hardfork2)
                posHf2 = index;
            index += 1;
        }
        return posHf1 >= posHf2;
    };
    /**
     * Alias to hardforkGteHardfork when hardfork is set
     * @param hardfork Hardfork name
     * @param opts Hardfork options
     * @returns True if hardfork set is greater than hardfork provided
     */
    Common.prototype.gteHardfork = function (hardfork, opts) {
        return this.hardforkGteHardfork(null, hardfork, opts);
    };
    /**
     * Checks if given or set hardfork is active on the chain
     * @param hardfork Hardfork name, optional if HF set
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if hardfork is active on the chain
     */
    Common.prototype.hardforkIsActiveOnChain = function (hardfork, opts) {
        opts = opts !== undefined ? opts : {};
        var onlySupported = opts.onlySupported === undefined ? false : opts.onlySupported;
        hardfork = this._chooseHardfork(hardfork, onlySupported);
        for (var _i = 0, _a = this.hardforks(); _i < _a.length; _i++) {
            var hf = _a[_i];
            if (hf['name'] === hardfork && hf['block'] !== null)
                return true;
        }
        return false;
    };
    /**
     * Returns the active hardfork switches for the current chain
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Array with hardfork arrays
     */
    Common.prototype.activeHardforks = function (blockNumber, opts) {
        opts = opts !== undefined ? opts : {};
        var activeHardforks = [];
        var hfs = this.hardforks();
        for (var _i = 0, hfs_2 = hfs; _i < hfs_2.length; _i++) {
            var hf = hfs_2[_i];
            if (hf['block'] === null)
                continue;
            if (blockNumber !== undefined && blockNumber !== null && blockNumber < hf['block'])
                break;
            if (opts.onlySupported && !this._isSupportedHardfork(hf['name']))
                continue;
            activeHardforks.push(hf);
        }
        return activeHardforks;
    };
    /**
     * Returns the latest active hardfork name for chain or block or throws if unavailable
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Hardfork name
     */
    Common.prototype.activeHardfork = function (blockNumber, opts) {
        opts = opts !== undefined ? opts : {};
        var activeHardforks = this.activeHardforks(blockNumber, opts);
        if (activeHardforks.length > 0) {
            return activeHardforks[activeHardforks.length - 1]['name'];
        }
        else {
            throw new Error("No (supported) active hardfork found");
        }
    };
    /**
     * Returns the hardfork change block for hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number
     */
    Common.prototype.hardforkBlock = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork, false);
        return this._getHardfork(hardfork)['block'];
    };
    /**
     * True if block number provided is the hardfork (given or set) change block of the current chain
     * @param blockNumber Number of the block to check
     * @param hardfork Hardfork name, optional if HF set
     * @returns True if blockNumber is HF block
     */
    Common.prototype.isHardforkBlock = function (blockNumber, hardfork) {
        hardfork = this._chooseHardfork(hardfork, false);
        if (this.hardforkBlock(hardfork) === blockNumber) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Provide the consensus type for the hardfork set or provided as param
     * @param hardfork Hardfork name, optional if hardfork set
     * @returns Consensus type (e.g. 'pow', 'poa')
     */
    Common.prototype.consensus = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork);
        return this._getHardfork(hardfork)['consensus'];
    };
    /**
     * Provide the finality type for the hardfork set or provided as param
     * @param {String} hardfork Hardfork name, optional if hardfork set
     * @returns {String} Finality type (e.g. 'pos', null of no finality)
     */
    Common.prototype.finality = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork);
        return this._getHardfork(hardfork)['finality'];
    };
    /**
     * Returns the Genesis parameters of current chain
     * @returns Genesis dictionary
     */
    Common.prototype.genesis = function () {
        return this._chainParams['genesis'];
    };
    /**
     * Returns the hardforks for current chain
     * @returns {Array} Array with arrays of hardforks
     */
    Common.prototype.hardforks = function () {
        return this._chainParams['hardforks'];
    };
    /**
     * Returns bootstrap nodes for the current chain
     * @returns {Dictionary} Dict with bootstrap nodes
     */
    Common.prototype.bootstrapNodes = function () {
        return this._chainParams['bootstrapNodes'];
    };
    /**
     * Returns the hardfork set
     * @returns Hardfork name
     */
    Common.prototype.hardfork = function () {
        return this._hardfork;
    };
    /**
     * Returns the Id of current chain
     * @returns chain Id
     */
    Common.prototype.chainId = function () {
        return this._chainParams['chainId'];
    };
    /**
     * Returns the name of current chain
     * @returns chain name (lower case)
     */
    Common.prototype.chainName = function () {
        return chains_1.chains['names'][this.chainId()] || this._chainParams['name'];
    };
    /**
     * Returns the Id of current network
     * @returns network Id
     */
    Common.prototype.networkId = function () {
        return this._chainParams['networkId'];
    };
    return Common;
}());
exports.default = Common;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "roQf":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("hwdV").Buffer
var MD5 = __webpack_require__("9XZ3")

/* eslint-disable camelcase */
function EVP_BytesToKey (password, salt, keyBits, ivLen) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, 'binary')
  if (salt) {
    if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, 'binary')
    if (salt.length !== 8) throw new RangeError('salt should be Buffer with 8 byte length')
  }

  var keyLen = keyBits / 8
  var key = Buffer.alloc(keyLen)
  var iv = Buffer.alloc(ivLen || 0)
  var tmp = Buffer.alloc(0)

  while (keyLen > 0 || ivLen > 0) {
    var hash = new MD5()
    hash.update(tmp)
    hash.update(password)
    if (salt) hash.update(salt)
    tmp = hash.digest()

    var used = 0

    if (keyLen > 0) {
      var keyStart = key.length - keyLen
      used = Math.min(keyLen, tmp.length)
      tmp.copy(key, keyStart, 0, used)
      keyLen -= used
    }

    if (used < tmp.length && ivLen > 0) {
      var ivStart = iv.length - ivLen
      var length = Math.min(ivLen, tmp.length - used)
      tmp.copy(iv, ivStart, used, used + length)
      ivLen -= length
    }
  }

  tmp.fill(0)
  return { key: key, iv: iv }
}

module.exports = EVP_BytesToKey


/***/ }),

/***/ "rqBE":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"istanbul\",\"comment\":\"HF targeted for October 2019 following the Constantinople/Petersburg HF\",\"eip\":{\"url\":\"https://eips.ethereum.org/EIPS/eip-1679\",\"status\":\"Draft\"},\"gasConfig\":{},\"gasPrices\":{\"blake2bRound\":{\"v\":1,\"d\":\"Gas cost per round for the Blake2b F precompile\"},\"ecAdd\":{\"v\":150,\"d\":\"Gas costs for curve addition precompile\"},\"ecMul\":{\"v\":6000,\"d\":\"Gas costs for curve multiplication precompile\"},\"ecPairing\":{\"v\":45000,\"d\":\"Base gas costs for curve pairing precompile\"},\"ecPairingWord\":{\"v\":34000,\"d\":\"Gas costs regarding curve pairing precompile input length\"},\"txDataNonZero\":{\"v\":16,\"d\":\"Per byte of data attached to a transaction that is not equal to zero. NOTE: Not payable on data of calls between transactions\"}},\"vm\":{},\"pow\":{},\"casper\":{},\"sharding\":{}}");

/***/ }),

/***/ "tnHP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var createKeccakHash = __webpack_require__("aYMp");
var secp256k1 = __webpack_require__("IzB8");
var assert = __webpack_require__("9lTW");
var rlp = __webpack_require__("o8pB");
var BN = __webpack_require__("OZ/i");
var createHash = __webpack_require__("mObS");
var Buffer = __webpack_require__("hwdV").Buffer;
Object.assign(exports, __webpack_require__("mhLr"));

/**
 * the max integer that this VM can handle (a ```BN```)
 * @var {BN} MAX_INTEGER
 */
exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

/**
 * 2^256 (a ```BN```)
 * @var {BN} TWO_POW256
 */
exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);

/**
 * Keccak-256 hash of null (a ```String```)
 * @var {String} KECCAK256_NULL_S
 */
exports.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.SHA3_NULL_S = exports.KECCAK256_NULL_S;

/**
 * Keccak-256 hash of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_NULL
 */
exports.KECCAK256_NULL = Buffer.from(exports.KECCAK256_NULL_S, 'hex');
exports.SHA3_NULL = exports.KECCAK256_NULL;

/**
 * Keccak-256 of an RLP of an empty array (a ```String```)
 * @var {String} KECCAK256_RLP_ARRAY_S
 */
exports.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347';
exports.SHA3_RLP_ARRAY_S = exports.KECCAK256_RLP_ARRAY_S;

/**
 * Keccak-256 of an RLP of an empty array (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP_ARRAY
 */
exports.KECCAK256_RLP_ARRAY = Buffer.from(exports.KECCAK256_RLP_ARRAY_S, 'hex');
exports.SHA3_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY;

/**
 * Keccak-256 hash of the RLP of null  (a ```String```)
 * @var {String} KECCAK256_RLP_S
 */
exports.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
exports.SHA3_RLP_S = exports.KECCAK256_RLP_S;

/**
 * Keccak-256 hash of the RLP of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP
 */
exports.KECCAK256_RLP = Buffer.from(exports.KECCAK256_RLP_S, 'hex');
exports.SHA3_RLP = exports.KECCAK256_RLP;

/**
 * [`BN`](https://github.com/indutny/bn.js)
 * @var {Function}
 */
exports.BN = BN;

/**
 * [`rlp`](https://github.com/ethereumjs/rlp)
 * @var {Function}
 */
exports.rlp = rlp;

/**
 * [`secp256k1`](https://github.com/cryptocoinjs/secp256k1-node/)
 * @var {Object}
 */
exports.secp256k1 = secp256k1;

/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
exports.zeros = function (bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
};

/**
  * Returns a zero address
  * @method zeroAddress
  * @return {String}
  */
exports.zeroAddress = function () {
  var addressLength = 20;
  var zeroAddress = exports.zeros(addressLength);
  return exports.bufferToHex(zeroAddress);
};

/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method lsetLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
exports.setLengthLeft = exports.setLength = function (msg, length, right) {
  var buf = exports.zeros(length);
  msg = exports.toBuffer(msg);
  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }
    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }
    return msg.slice(-length);
  }
};

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
exports.setLengthRight = function (msg, length) {
  return exports.setLength(msg, length, true);
};

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
exports.unpad = exports.stripZeros = function (a) {
  a = exports.stripHexPrefix(a);
  var first = a[0];
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }
  return a;
};
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
exports.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (exports.isHexString(v)) {
        v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

/**
 * Converts a `Buffer` to a `Number`
 * @param {Buffer} buf
 * @return {Number}
 * @throws If the input number exceeds 53 bits.
 */
exports.bufferToInt = function (buf) {
  return new BN(exports.toBuffer(buf)).toNumber();
};

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
exports.bufferToHex = function (buf) {
  buf = exports.toBuffer(buf);
  return '0x' + buf.toString('hex');
};

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param {Buffer} num
 * @return {BN}
 */
exports.fromSigned = function (num) {
  return new BN(num).fromTwos(256);
};

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param {BN} num
 * @return {Buffer}
 */
exports.toUnsigned = function (num) {
  return Buffer.from(num.toTwos(256).toArray());
};

/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */
exports.keccak = function (a, bits) {
  a = exports.toBuffer(a);
  if (!bits) bits = 256;

  return createKeccakHash('keccak' + bits).update(a).digest();
};

/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256)
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.keccak256 = function (a) {
  return exports.keccak(a);
};

/**
 * Creates SHA-3 (Keccak) hash of the input [OBSOLETE]
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the SHA-3 width
 * @return {Buffer}
 */
exports.sha3 = exports.keccak;

/**
 * Creates SHA256 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.sha256 = function (a) {
  a = exports.toBuffer(a);
  return createHash('sha256').update(a).digest();
};

/**
 * Creates RIPEMD160 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Boolean} padded whether it should be padded to 256 bits or not
 * @return {Buffer}
 */
exports.ripemd160 = function (a, padded) {
  a = exports.toBuffer(a);
  var hash = createHash('rmd160').update(a).digest();
  if (padded === true) {
    return exports.setLength(hash, 32);
  } else {
    return hash;
  }
};

/**
 * Creates SHA-3 hash of the RLP encoded version of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.rlphash = function (a) {
  return exports.keccak(rlp.encode(a));
};

/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 * @param {Buffer} privateKey
 * @return {Boolean}
 */
exports.isValidPrivate = function (privateKey) {
  return secp256k1.privateKeyVerify(privateKey);
};

/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param {Buffer} publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Boolean}
 */
exports.isValidPublic = function (publicKey, sanitize) {
  if (publicKey.length === 64) {
    // Convert to SEC1 for secp256k1
    return secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]));
  }

  if (!sanitize) {
    return false;
  }

  return secp256k1.publicKeyVerify(publicKey);
};

/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param {Buffer} pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Buffer}
 */
exports.pubToAddress = exports.publicToAddress = function (pubKey, sanitize) {
  pubKey = exports.toBuffer(pubKey);
  if (sanitize && pubKey.length !== 64) {
    pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
  }
  assert(pubKey.length === 64);
  // Only take the lower 160bits of the hash
  return exports.keccak(pubKey).slice(-20);
};

/**
 * Returns the ethereum public key of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
var privateToPublic = exports.privateToPublic = function (privateKey) {
  privateKey = exports.toBuffer(privateKey);
  // skip the type flag and use the X, Y points
  return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};

/**
 * Converts a public key to the Ethereum format.
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
exports.importPublic = function (publicKey) {
  publicKey = exports.toBuffer(publicKey);
  if (publicKey.length !== 64) {
    publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
  }
  return publicKey;
};

/**
 * ECDSA sign
 * @param {Buffer} msgHash
 * @param {Buffer} privateKey
 * @return {Object}
 */
exports.ecsign = function (msgHash, privateKey) {
  var sig = secp256k1.sign(msgHash, privateKey);

  var ret = {};
  ret.r = sig.signature.slice(0, 32);
  ret.s = sig.signature.slice(32, 64);
  ret.v = sig.recovery + 27;
  return ret;
};

/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 * @param message
 * @returns {Buffer} hash
 */
exports.hashPersonalMessage = function (message) {
  var prefix = exports.toBuffer('\x19Ethereum Signed Message:\n' + message.length.toString());
  return exports.keccak(Buffer.concat([prefix, message]));
};

/**
 * ECDSA public key recovery from signature
 * @param {Buffer} msgHash
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {Buffer} publicKey
 */
exports.ecrecover = function (msgHash, v, r, s) {
  var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64);
  var recovery = v - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};

/**
 * Convert signature parameters into the format of `eth_sign` RPC method
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {String} sig
 */
exports.toRpcSig = function (v, r, s) {
  // NOTE: with potential introduction of chainId this might need to be updated
  if (v !== 27 && v !== 28) {
    throw new Error('Invalid recovery id');
  }

  // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin
  // FIXME: this might change in the future - https://github.com/ethereum/go-ethereum/issues/2053
  return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r, 32), exports.setLengthLeft(s, 32), exports.toBuffer(v - 27)]));
};

/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 * @param {String} sig
 * @return {Object}
 */
exports.fromRpcSig = function (sig) {
  sig = exports.toBuffer(sig);

  // NOTE: with potential introduction of chainId this might need to be updated
  if (sig.length !== 65) {
    throw new Error('Invalid signature length');
  }

  var v = sig[64];
  // support both versions of `eth_sign` responses
  if (v < 27) {
    v += 27;
  }

  return {
    v: v,
    r: sig.slice(0, 32),
    s: sig.slice(32, 64)
  };
};

/**
 * Returns the ethereum address of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
exports.privateToAddress = function (privateKey) {
  return exports.publicToAddress(privateToPublic(privateKey));
};

/**
 * Checks if the address is a valid. Accepts checksummed addresses too
 * @param {String} address
 * @return {Boolean}
 */
exports.isValidAddress = function (address) {
  return (/^0x[0-9a-fA-F]{40}$/.test(address)
  );
};

/**
  * Checks if a given address is a zero address
  * @method isZeroAddress
  * @param {String} address
  * @return {Boolean}
  */
exports.isZeroAddress = function (address) {
  var zeroAddress = exports.zeroAddress();
  return zeroAddress === exports.addHexPrefix(address);
};

/**
 * Returns a checksummed address
 * @param {String} address
 * @return {String}
 */
exports.toChecksumAddress = function (address) {
  address = exports.stripHexPrefix(address).toLowerCase();
  var hash = exports.keccak(address).toString('hex');
  var ret = '0x';

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
};

/**
 * Checks if the address is a valid checksummed address
 * @param {Buffer} address
 * @return {Boolean}
 */
exports.isValidChecksumAddress = function (address) {
  return exports.isValidAddress(address) && exports.toChecksumAddress(address) === address;
};

/**
 * Generates an address of a newly created contract
 * @param {Buffer} from the address which is creating this new address
 * @param {Buffer} nonce the nonce of the from account
 * @return {Buffer}
 */
exports.generateAddress = function (from, nonce) {
  from = exports.toBuffer(from);
  nonce = new BN(nonce);

  if (nonce.isZero()) {
    // in RLP we want to encode null in the case of zero nonce
    // read the RLP documentation for an answer if you dare
    nonce = null;
  } else {
    nonce = Buffer.from(nonce.toArray());
  }

  // Only take the lower 160bits of the hash
  return exports.rlphash([from, nonce]).slice(-20);
};

/**
 * Returns true if the supplied address belongs to a precompiled account (Byzantium)
 * @param {Buffer|String} address
 * @return {Boolean}
 */
exports.isPrecompiled = function (address) {
  var a = exports.unpad(address);
  return a.length === 1 && a[0] >= 1 && a[0] <= 8;
};

/**
 * Adds "0x" to a given `String` if it does not already start with "0x"
 * @param {String} str
 * @return {String}
 */
exports.addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str;
  }

  return exports.isHexPrefixed(str) ? str : '0x' + str;
};

/**
 * Validate ECDSA signature
 * @method isValidSignature
 * @param {Buffer} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @param {Boolean} [homestead=true]
 * @return {Boolean}
 */

exports.isValidSignature = function (v, r, s, homestead) {
  var SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
  var SECP256K1_N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);

  if (r.length !== 32 || s.length !== 32) {
    return false;
  }

  if (v !== 27 && v !== 28) {
    return false;
  }

  r = new BN(r);
  s = new BN(s);

  if (r.isZero() || r.gt(SECP256K1_N) || s.isZero() || s.gt(SECP256K1_N)) {
    return false;
  }

  if (homestead === false && new BN(s).cmp(SECP256K1_N_DIV_2) === 1) {
    return false;
  }

  return true;
};

/**
 * Converts a `Buffer` or `Array` to JSON
 * @param {Buffer|Array} ba
 * @return {Array|String|null}
 */
exports.baToJSON = function (ba) {
  if (Buffer.isBuffer(ba)) {
    return '0x' + ba.toString('hex');
  } else if (ba instanceof Array) {
    var array = [];
    for (var i = 0; i < ba.length; i++) {
      array.push(exports.baToJSON(ba[i]));
    }
    return array;
  }
};

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param {*} data data to be validated against the definitions
 */
exports.defineProperties = function (self, fields, data) {
  self.raw = [];
  self._fields = [];

  // attach the `toJSON`
  self.toJSON = function (label) {
    if (label) {
      var obj = {};
      self._fields.forEach(function (field) {
        obj[field] = '0x' + self[field].toString('hex');
      });
      return obj;
    }
    return exports.baToJSON(this.raw);
  };

  self.serialize = function serialize() {
    return rlp.encode(self.raw);
  };

  fields.forEach(function (field, i) {
    self._fields.push(field.name);
    function getter() {
      return self.raw[i];
    }
    function setter(v) {
      v = exports.toBuffer(v);

      if (v.toString('hex') === '00' && !field.allowZero) {
        v = Buffer.allocUnsafe(0);
      }

      if (field.allowLess && field.length) {
        v = exports.stripZeros(v);
        assert(field.length >= v.length, 'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
      } else if (!(field.allowZero && v.length === 0) && field.length) {
        assert(field.length === v.length, 'The field ' + field.name + ' must have byte length of ' + field.length);
      }

      self.raw[i] = v;
    }

    Object.defineProperty(self, field.name, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter
    });

    if (field.default) {
      self[field.name] = field.default;
    }

    // attach alias
    if (field.alias) {
      Object.defineProperty(self, field.alias, {
        enumerable: false,
        configurable: true,
        set: setter,
        get: getter
      });
    }
  });

  // if the constuctor is passed data
  if (data) {
    if (typeof data === 'string') {
      data = Buffer.from(exports.stripHexPrefix(data), 'hex');
    }

    if (Buffer.isBuffer(data)) {
      data = rlp.decode(data);
    }

    if (Array.isArray(data)) {
      if (data.length > self._fields.length) {
        throw new Error('wrong number of fields in data');
      }

      // make sure all the items are buffers
      data.forEach(function (d, i) {
        self[self._fields[i]] = exports.toBuffer(d);
      });
    } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      var keys = Object.keys(data);
      fields.forEach(function (field) {
        if (keys.indexOf(field.name) !== -1) self[field.name] = data[field.name];
        if (keys.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
      });
    } else {
      throw new Error('invalid data');
    }
  }
};

/***/ }),

/***/ "uhBA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoZXJldW1qcy1hYmkvbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtdXRpbC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGhlcmV1bWpzLWFiaS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtY29tbW9uL2Rpc3QvY2hhaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGhqcy11bml0L25vZGVfbW9kdWxlcy9ibi5qcy9saWIvYm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtY29tbW9uL2Rpc3QvaGFyZGZvcmtzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGhqcy11bml0L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoZXJldW1qcy1hYmkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aGpzLXV0aWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGhlcmV1bWpzLWNvbW1vbi9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldnBfYnl0ZXN0b2tleS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoZXJldW1qcy11dGlsL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMvYmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxTQUFTLG1CQUFPLENBQUMsTUFBTztBQUN4QjtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFLO0FBQ3ZCO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsTUFBUTtBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLE1BQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsTUFBYTtBQUN0QyxhQUFhLG1CQUFPLENBQUMsTUFBYTtBQUNsQyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGVBQWU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7OztBQ3JsQkE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBaUI7QUFDdkMsV0FBVyxtQkFBTyxDQUFDLE1BQU87O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTs7QUFFQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBOztBQUVBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsNkJBQTZCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDZCQUE2QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFdBQVc7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxXQUFXO0FBQy9EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBRSxNQUE2Qjs7Ozs7Ozs7OztBQ2wyR25CO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyxNQUFtQjtBQUM5QyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFrQjtBQUM1QyxZQUFZLG1CQUFPLENBQUMsTUFBWTtBQUNoQyx5QkFBeUIsbUJBQU8sQ0FBQyxNQUF5QjtBQUMxRCx1QkFBdUIsbUJBQU8sQ0FBQyxNQUF1QjtBQUN0RCxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFrQjtBQUM1Qyx1QkFBdUIsbUJBQU8sQ0FBQyxNQUF1QjtBQUN0RCxtQkFBbUIsbUJBQU8sQ0FBQyxNQUFtQjtBQUM5QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFpQjtBQUMxQztBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsTUFBTztBQUN4QixpQkFBaUIsbUJBQU8sQ0FBQyxNQUFjOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDOztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlDQUF5Qzs7QUFFekM7QUFDQSxvQ0FBb0MsRUFBRTtBQUN0Qzs7QUFFQSxtRUFBbUU7O0FBRW5FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7QUN2S0EsaUJBQWlCLG1CQUFPLENBQUMsTUFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F6Qyw4Q0FBYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQyxNQUFpQjtBQUM3QyxxQkFBcUIsbUJBQU8sQ0FBQyxNQUFrQjs7QUFFL0M7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFdBQVcsR0FBRyxXQUFXO0FBQ3RDO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7O0FBRWxCLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7O0FDM05hO0FBQ2I7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxlQUFlLG1CQUFPLENBQUMsTUFBVTtBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCx3QkFBd0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLCtCQUErQjtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxtQkFBbUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsZ0JBQWdCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLCtCQUErQjtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELHlCQUF5QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMkRBQTJELFlBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQixhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUE2QjtBQUNqQztBQUNBIiwiZmlsZSI6InZlbmRvcn4yYjM1MTlmYS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJOID0gcmVxdWlyZShcImJuLmpzXCIpO1xuZXhwb3J0cy5CTiA9IEJOO1xudmFyIHJscCA9IHJlcXVpcmUoXCJybHBcIik7XG5leHBvcnRzLnJscCA9IHJscDtcbnZhciBjcmVhdGVLZWNjYWtIYXNoID0gcmVxdWlyZSgna2VjY2FrJyk7XG52YXIgc2VjcDI1NmsxID0gcmVxdWlyZSgnc2VjcDI1NmsxJyk7XG5leHBvcnRzLnNlY3AyNTZrMSA9IHNlY3AyNTZrMTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciBjcmVhdGVIYXNoID0gcmVxdWlyZSgnY3JlYXRlLWhhc2gnKTtcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBldGhqc1V0aWwgPSByZXF1aXJlKCdldGhqcy11dGlsJyk7XG5PYmplY3QuYXNzaWduKGV4cG9ydHMsIGV0aGpzVXRpbCk7XG4vKipcbiAqIFRoZSBtYXggaW50ZWdlciB0aGF0IHRoaXMgVk0gY2FuIGhhbmRsZVxuICovXG5leHBvcnRzLk1BWF9JTlRFR0VSID0gbmV3IEJOKCdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmJywgMTYpO1xuLyoqXG4gKiAyXjI1NlxuICovXG5leHBvcnRzLlRXT19QT1cyNTYgPSBuZXcgQk4oJzEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJywgMTYpO1xuLyoqXG4gKiBLZWNjYWstMjU2IGhhc2ggb2YgbnVsbFxuICovXG5leHBvcnRzLktFQ0NBSzI1Nl9OVUxMX1MgPSAnYzVkMjQ2MDE4NmY3MjMzYzkyN2U3ZGIyZGNjNzAzYzBlNTAwYjY1M2NhODIyNzNiN2JmYWQ4MDQ1ZDg1YTQ3MCc7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiBudWxsXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X05VTEwgPSBCdWZmZXIuZnJvbShleHBvcnRzLktFQ0NBSzI1Nl9OVUxMX1MsICdoZXgnKTtcbi8qKlxuICogS2VjY2FrLTI1NiBvZiBhbiBSTFAgb2YgYW4gZW1wdHkgYXJyYXlcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQX0FSUkFZX1MgPSAnMWRjYzRkZThkZWM3NWQ3YWFiODViNTY3YjZjY2Q0MWFkMzEyNDUxYjk0OGE3NDEzZjBhMTQyZmQ0MGQ0OTM0Nyc7XG4vKipcbiAqIEtlY2Nhay0yNTYgb2YgYW4gUkxQIG9mIGFuIGVtcHR5IGFycmF5XG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWSA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWV9TLCAnaGV4Jyk7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgUkxQIG9mIG51bGxcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1MgPSAnNTZlODFmMTcxYmNjNTVhNmZmODM0NWU2OTJjMGY4NmU1YjQ4ZTAxYjk5NmNhZGMwMDE2MjJmYjVlMzYzYjQyMSc7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgUkxQIG9mIG51bGxcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQID0gQnVmZmVyLmZyb20oZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1MsICdoZXgnKTtcbi8qKlxuICogUmV0dXJucyBhIGJ1ZmZlciBmaWxsZWQgd2l0aCAwcy5cbiAqIEBwYXJhbSBieXRlcyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBidWZmZXIgc2hvdWxkIGJlXG4gKi9cbmV4cG9ydHMuemVyb3MgPSBmdW5jdGlvbiAoYnl0ZXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jVW5zYWZlKGJ5dGVzKS5maWxsKDApO1xufTtcbi8qKlxuICogUmV0dXJucyBhIHplcm8gYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy56ZXJvQWRkcmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRkcmVzc0xlbmd0aCA9IDIwO1xuICAgIHZhciBhZGRyID0gZXhwb3J0cy56ZXJvcyhhZGRyZXNzTGVuZ3RoKTtcbiAgICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleChhZGRyKTtcbn07XG4vKipcbiAqIExlZnQgUGFkcyBhbiBgQXJyYXlgIG9yIGBCdWZmZXJgIHdpdGggbGVhZGluZyB6ZXJvcyB0aWxsIGl0IGhhcyBgbGVuZ3RoYCBieXRlcy5cbiAqIE9yIGl0IHRydW5jYXRlcyB0aGUgYmVnaW5uaW5nIGlmIGl0IGV4Y2VlZHMuXG4gKiBAcGFyYW0gbXNnIHRoZSB2YWx1ZSB0byBwYWQgKEJ1ZmZlcnxBcnJheSlcbiAqIEBwYXJhbSBsZW5ndGggdGhlIG51bWJlciBvZiBieXRlcyB0aGUgb3V0cHV0IHNob3VsZCBiZVxuICogQHBhcmFtIHJpZ2h0IHdoZXRoZXIgdG8gc3RhcnQgcGFkZGluZyBmb3JtIHRoZSBsZWZ0IG9yIHJpZ2h0XG4gKiBAcmV0dXJuIChCdWZmZXJ8QXJyYXkpXG4gKi9cbmV4cG9ydHMuc2V0TGVuZ3RoTGVmdCA9IGZ1bmN0aW9uIChtc2csIGxlbmd0aCwgcmlnaHQpIHtcbiAgICBpZiAocmlnaHQgPT09IHZvaWQgMCkgeyByaWdodCA9IGZhbHNlOyB9XG4gICAgdmFyIGJ1ZiA9IGV4cG9ydHMuemVyb3MobGVuZ3RoKTtcbiAgICBtc2cgPSBleHBvcnRzLnRvQnVmZmVyKG1zZyk7XG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICAgIGlmIChtc2cubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBtc2cuY29weShidWYpO1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNnLnNsaWNlKDAsIGxlbmd0aCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAobXNnLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgbXNnLmNvcHkoYnVmLCBsZW5ndGggLSBtc2cubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZy5zbGljZSgtbGVuZ3RoKTtcbiAgICB9XG59O1xuZXhwb3J0cy5zZXRMZW5ndGggPSBleHBvcnRzLnNldExlbmd0aExlZnQ7XG4vKipcbiAqIFJpZ2h0IFBhZHMgYW4gYEFycmF5YCBvciBgQnVmZmVyYCB3aXRoIGxlYWRpbmcgemVyb3MgdGlsbCBpdCBoYXMgYGxlbmd0aGAgYnl0ZXMuXG4gKiBPciBpdCB0cnVuY2F0ZXMgdGhlIGJlZ2lubmluZyBpZiBpdCBleGNlZWRzLlxuICogQHBhcmFtIG1zZyB0aGUgdmFsdWUgdG8gcGFkIChCdWZmZXJ8QXJyYXkpXG4gKiBAcGFyYW0gbGVuZ3RoIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIG91dHB1dCBzaG91bGQgYmVcbiAqIEByZXR1cm4gKEJ1ZmZlcnxBcnJheSlcbiAqL1xuZXhwb3J0cy5zZXRMZW5ndGhSaWdodCA9IGZ1bmN0aW9uIChtc2csIGxlbmd0aCkge1xuICAgIHJldHVybiBleHBvcnRzLnNldExlbmd0aChtc2csIGxlbmd0aCwgdHJ1ZSk7XG59O1xuLyoqXG4gKiBUcmltcyBsZWFkaW5nIHplcm9zIGZyb20gYSBgQnVmZmVyYCBvciBhbiBgQXJyYXlgLlxuICogQHBhcmFtIGEgKEJ1ZmZlcnxBcnJheXxTdHJpbmcpXG4gKiBAcmV0dXJuIChCdWZmZXJ8QXJyYXl8U3RyaW5nKVxuICovXG5leHBvcnRzLnVucGFkID0gZnVuY3Rpb24gKGEpIHtcbiAgICBhID0gZXRoanNVdGlsLnN0cmlwSGV4UHJlZml4KGEpO1xuICAgIHZhciBmaXJzdCA9IGFbMF07XG4gICAgd2hpbGUgKGEubGVuZ3RoID4gMCAmJiBmaXJzdC50b1N0cmluZygpID09PSAnMCcpIHtcbiAgICAgICAgYSA9IGEuc2xpY2UoMSk7XG4gICAgICAgIGZpcnN0ID0gYVswXTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xuZXhwb3J0cy5zdHJpcFplcm9zID0gZXhwb3J0cy51bnBhZDtcbi8qKlxuICogQXR0ZW1wdHMgdG8gdHVybiBhIHZhbHVlIGludG8gYSBgQnVmZmVyYC4gQXMgaW5wdXQgaXQgc3VwcG9ydHMgYEJ1ZmZlcmAsIGBTdHJpbmdgLCBgTnVtYmVyYCwgbnVsbC91bmRlZmluZWQsIGBCTmAgYW5kIG90aGVyIG9iamVjdHMgd2l0aCBhIGB0b0FycmF5KClgIG1ldGhvZC5cbiAqIEBwYXJhbSB2IHRoZSB2YWx1ZVxuICovXG5leHBvcnRzLnRvQnVmZmVyID0gZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih2KSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgdiA9IEJ1ZmZlci5mcm9tKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaXNIZXhTdHJpbmcodikpIHtcbiAgICAgICAgICAgICAgICB2ID0gQnVmZmVyLmZyb20oZXhwb3J0cy5wYWRUb0V2ZW4oZXhwb3J0cy5zdHJpcEhleFByZWZpeCh2KSksICdoZXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHYgPSBCdWZmZXIuZnJvbSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHYgPSBleHBvcnRzLmludFRvQnVmZmVyKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHYgPT09IG51bGwgfHwgdiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2ID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEJOLmlzQk4odikpIHtcbiAgICAgICAgICAgIHYgPSB2LnRvQXJyYXlMaWtlKEJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodi50b0FycmF5KSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0cyBhIEJOIHRvIGEgQnVmZmVyXG4gICAgICAgICAgICB2ID0gQnVmZmVyLmZyb20odi50b0FycmF5KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHR5cGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgYEJ1ZmZlcmAgdG8gYSBgTnVtYmVyYC5cbiAqIEBwYXJhbSBidWYgYEJ1ZmZlcmAgb2JqZWN0IHRvIGNvbnZlcnRcbiAqIEB0aHJvd3MgSWYgdGhlIGlucHV0IG51bWJlciBleGNlZWRzIDUzIGJpdHMuXG4gKi9cbmV4cG9ydHMuYnVmZmVyVG9JbnQgPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgcmV0dXJuIG5ldyBCTihleHBvcnRzLnRvQnVmZmVyKGJ1ZikpLnRvTnVtYmVyKCk7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIGludG8gYSBoZXggYFN0cmluZ2AuXG4gKiBAcGFyYW0gYnVmIGBCdWZmZXJgIG9iamVjdCB0byBjb252ZXJ0XG4gKi9cbmV4cG9ydHMuYnVmZmVyVG9IZXggPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgYnVmID0gZXhwb3J0cy50b0J1ZmZlcihidWYpO1xuICAgIHJldHVybiAnMHgnICsgYnVmLnRvU3RyaW5nKCdoZXgnKTtcbn07XG4vKipcbiAqIEludGVycHJldHMgYSBgQnVmZmVyYCBhcyBhIHNpZ25lZCBpbnRlZ2VyIGFuZCByZXR1cm5zIGEgYEJOYC4gQXNzdW1lcyAyNTYtYml0IG51bWJlcnMuXG4gKiBAcGFyYW0gbnVtIFNpZ25lZCBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydHMuZnJvbVNpZ25lZCA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICByZXR1cm4gbmV3IEJOKG51bSkuZnJvbVR3b3MoMjU2KTtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgYEJOYCB0byBhbiB1bnNpZ25lZCBpbnRlZ2VyIGFuZCByZXR1cm5zIGl0IGFzIGEgYEJ1ZmZlcmAuIEFzc3VtZXMgMjU2LWJpdCBudW1iZXJzLlxuICogQHBhcmFtIG51bVxuICovXG5leHBvcnRzLnRvVW5zaWduZWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKG51bS50b1R3b3MoMjU2KS50b0FycmF5KCkpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBLZWNjYWsgaGFzaCBvZiB0aGUgaW5wdXRcbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhIChCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcilcbiAqIEBwYXJhbSBiaXRzIFRoZSBLZWNjYWsgd2lkdGhcbiAqL1xuZXhwb3J0cy5rZWNjYWsgPSBmdW5jdGlvbiAoYSwgYml0cykge1xuICAgIGlmIChiaXRzID09PSB2b2lkIDApIHsgYml0cyA9IDI1NjsgfVxuICAgIGEgPSBleHBvcnRzLnRvQnVmZmVyKGEpO1xuICAgIGlmICghYml0cylcbiAgICAgICAgYml0cyA9IDI1NjtcbiAgICByZXR1cm4gY3JlYXRlS2VjY2FrSGFzaChcImtlY2Nha1wiICsgYml0cylcbiAgICAgICAgLnVwZGF0ZShhKVxuICAgICAgICAuZGlnZXN0KCk7XG59O1xuLyoqXG4gKiBDcmVhdGVzIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgaW5wdXQsIGFsaWFzIGZvciBrZWNjYWsoYSwgMjU2KS5cbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhIChCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcilcbiAqL1xuZXhwb3J0cy5rZWNjYWsyNTYgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBleHBvcnRzLmtlY2NhayhhKTtcbn07XG4vKipcbiAqIENyZWF0ZXMgU0hBMjU2IGhhc2ggb2YgdGhlIGlucHV0LlxuICogQHBhcmFtIGEgVGhlIGlucHV0IGRhdGEgKEJ1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyKVxuICovXG5leHBvcnRzLnNoYTI1NiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gICAgcmV0dXJuIGNyZWF0ZUhhc2goJ3NoYTI1NicpXG4gICAgICAgIC51cGRhdGUoYSlcbiAgICAgICAgLmRpZ2VzdCgpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBSSVBFTUQxNjAgaGFzaCBvZiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gYSBUaGUgaW5wdXQgZGF0YSAoQnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXIpXG4gKiBAcGFyYW0gcGFkZGVkIFdoZXRoZXIgaXQgc2hvdWxkIGJlIHBhZGRlZCB0byAyNTYgYml0cyBvciBub3RcbiAqL1xuZXhwb3J0cy5yaXBlbWQxNjAgPSBmdW5jdGlvbiAoYSwgcGFkZGVkKSB7XG4gICAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gICAgdmFyIGhhc2ggPSBjcmVhdGVIYXNoKCdybWQxNjAnKVxuICAgICAgICAudXBkYXRlKGEpXG4gICAgICAgIC5kaWdlc3QoKTtcbiAgICBpZiAocGFkZGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnNldExlbmd0aChoYXNoLCAzMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9XG59O1xuLyoqXG4gKiBDcmVhdGVzIFNIQS0zIGhhc2ggb2YgdGhlIFJMUCBlbmNvZGVkIHZlcnNpb24gb2YgdGhlIGlucHV0LlxuICogQHBhcmFtIGEgVGhlIGlucHV0IGRhdGFcbiAqL1xuZXhwb3J0cy5ybHBoYXNoID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5rZWNjYWsocmxwLmVuY29kZShhKSk7XG59O1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByaXZhdGUga2V5IHNhdGlzZmllcyB0aGUgcnVsZXMgb2YgdGhlIGN1cnZlIHNlY3AyNTZrMS5cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkUHJpdmF0ZSA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wcml2YXRlS2V5VmVyaWZ5KHByaXZhdGVLZXkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwdWJsaWMga2V5IHNhdGlzZmllcyB0aGUgcnVsZXMgb2YgdGhlIGN1cnZlIHNlY3AyNTZrMVxuICogYW5kIHRoZSByZXF1aXJlbWVudHMgb2YgRXRoZXJldW0uXG4gKiBAcGFyYW0gcHVibGljS2V5IFRoZSB0d28gcG9pbnRzIG9mIGFuIHVuY29tcHJlc3NlZCBrZXksIHVubGVzcyBzYW5pdGl6ZSBpcyBlbmFibGVkXG4gKiBAcGFyYW0gc2FuaXRpemUgQWNjZXB0IHB1YmxpYyBrZXlzIGluIG90aGVyIGZvcm1hdHNcbiAqL1xuZXhwb3J0cy5pc1ZhbGlkUHVibGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSwgc2FuaXRpemUpIHtcbiAgICBpZiAoc2FuaXRpemUgPT09IHZvaWQgMCkgeyBzYW5pdGl6ZSA9IGZhbHNlOyB9XG4gICAgaWYgKHB1YmxpY0tleS5sZW5ndGggPT09IDY0KSB7XG4gICAgICAgIC8vIENvbnZlcnQgdG8gU0VDMSBmb3Igc2VjcDI1NmsxXG4gICAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VmVyaWZ5KEJ1ZmZlci5jb25jYXQoW0J1ZmZlci5mcm9tKFs0XSksIHB1YmxpY0tleV0pKTtcbiAgICB9XG4gICAgaWYgKCFzYW5pdGl6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VmVyaWZ5KHB1YmxpY0tleSk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBldGhlcmV1bSBhZGRyZXNzIG9mIGEgZ2l2ZW4gcHVibGljIGtleS5cbiAqIEFjY2VwdHMgXCJFdGhlcmV1bSBwdWJsaWMga2V5c1wiIGFuZCBTRUMxIGVuY29kZWQga2V5cy5cbiAqIEBwYXJhbSBwdWJLZXkgVGhlIHR3byBwb2ludHMgb2YgYW4gdW5jb21wcmVzc2VkIGtleSwgdW5sZXNzIHNhbml0aXplIGlzIGVuYWJsZWRcbiAqIEBwYXJhbSBzYW5pdGl6ZSBBY2NlcHQgcHVibGljIGtleXMgaW4gb3RoZXIgZm9ybWF0c1xuICovXG5leHBvcnRzLnB1YlRvQWRkcmVzcyA9IGZ1bmN0aW9uIChwdWJLZXksIHNhbml0aXplKSB7XG4gICAgaWYgKHNhbml0aXplID09PSB2b2lkIDApIHsgc2FuaXRpemUgPSBmYWxzZTsgfVxuICAgIHB1YktleSA9IGV4cG9ydHMudG9CdWZmZXIocHViS2V5KTtcbiAgICBpZiAoc2FuaXRpemUgJiYgcHViS2V5Lmxlbmd0aCAhPT0gNjQpIHtcbiAgICAgICAgcHViS2V5ID0gc2VjcDI1NmsxLnB1YmxpY0tleUNvbnZlcnQocHViS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG4gICAgfVxuICAgIGFzc2VydChwdWJLZXkubGVuZ3RoID09PSA2NCk7XG4gICAgLy8gT25seSB0YWtlIHRoZSBsb3dlciAxNjBiaXRzIG9mIHRoZSBoYXNoXG4gICAgcmV0dXJuIGV4cG9ydHMua2VjY2FrKHB1YktleSkuc2xpY2UoLTIwKTtcbn07XG5leHBvcnRzLnB1YmxpY1RvQWRkcmVzcyA9IGV4cG9ydHMucHViVG9BZGRyZXNzO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBldGhlcmV1bSBwdWJsaWMga2V5IG9mIGEgZ2l2ZW4gcHJpdmF0ZSBrZXkuXG4gKiBAcGFyYW0gcHJpdmF0ZUtleSBBIHByaXZhdGUga2V5IG11c3QgYmUgMjU2IGJpdHMgd2lkZVxuICovXG5leHBvcnRzLnByaXZhdGVUb1B1YmxpYyA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgcHJpdmF0ZUtleSA9IGV4cG9ydHMudG9CdWZmZXIocHJpdmF0ZUtleSk7XG4gICAgLy8gc2tpcCB0aGUgdHlwZSBmbGFnIGFuZCB1c2UgdGhlIFgsIFkgcG9pbnRzXG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlDcmVhdGUocHJpdmF0ZUtleSwgZmFsc2UpLnNsaWNlKDEpO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBwdWJsaWMga2V5IHRvIHRoZSBFdGhlcmV1bSBmb3JtYXQuXG4gKi9cbmV4cG9ydHMuaW1wb3J0UHVibGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSkge1xuICAgIHB1YmxpY0tleSA9IGV4cG9ydHMudG9CdWZmZXIocHVibGljS2V5KTtcbiAgICBpZiAocHVibGljS2V5Lmxlbmd0aCAhPT0gNjQpIHtcbiAgICAgICAgcHVibGljS2V5ID0gc2VjcDI1NmsxLnB1YmxpY0tleUNvbnZlcnQocHVibGljS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaWNLZXk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBFQ0RTQSBzaWduYXR1cmUgb2YgYSBtZXNzYWdlIGhhc2guXG4gKi9cbmV4cG9ydHMuZWNzaWduID0gZnVuY3Rpb24gKG1zZ0hhc2gsIHByaXZhdGVLZXksIGNoYWluSWQpIHtcbiAgICB2YXIgc2lnID0gc2VjcDI1NmsxLnNpZ24obXNnSGFzaCwgcHJpdmF0ZUtleSk7XG4gICAgdmFyIHJlY292ZXJ5ID0gc2lnLnJlY292ZXJ5O1xuICAgIHZhciByZXQgPSB7XG4gICAgICAgIHI6IHNpZy5zaWduYXR1cmUuc2xpY2UoMCwgMzIpLFxuICAgICAgICBzOiBzaWcuc2lnbmF0dXJlLnNsaWNlKDMyLCA2NCksXG4gICAgICAgIHY6IGNoYWluSWQgPyByZWNvdmVyeSArIChjaGFpbklkICogMiArIDM1KSA6IHJlY292ZXJ5ICsgMjcsXG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUga2VjY2FrLTI1NiBoYXNoIG9mIGBtZXNzYWdlYCwgcHJlZml4ZWQgd2l0aCB0aGUgaGVhZGVyIHVzZWQgYnkgdGhlIGBldGhfc2lnbmAgUlBDIGNhbGwuXG4gKiBUaGUgb3V0cHV0IG9mIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGZlZCBpbnRvIGBlY3NpZ25gIHRvIHByb2R1Y2UgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHRoZSBgZXRoX3NpZ25gXG4gKiBjYWxsIGZvciBhIGdpdmVuIGBtZXNzYWdlYCwgb3IgZmVkIHRvIGBlY3JlY292ZXJgIGFsb25nIHdpdGggYSBzaWduYXR1cmUgdG8gcmVjb3ZlciB0aGUgcHVibGljIGtleVxuICogdXNlZCB0byBwcm9kdWNlIHRoZSBzaWduYXR1cmUuXG4gKi9cbmV4cG9ydHMuaGFzaFBlcnNvbmFsTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdmFyIHByZWZpeCA9IGV4cG9ydHMudG9CdWZmZXIoXCJcXHUwMDE5RXRoZXJldW0gU2lnbmVkIE1lc3NhZ2U6XFxuXCIgKyBtZXNzYWdlLmxlbmd0aC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gZXhwb3J0cy5rZWNjYWsoQnVmZmVyLmNvbmNhdChbcHJlZml4LCBtZXNzYWdlXSkpO1xufTtcbi8qKlxuICogRUNEU0EgcHVibGljIGtleSByZWNvdmVyeSBmcm9tIHNpZ25hdHVyZS5cbiAqIEByZXR1cm5zIFJlY292ZXJlZCBwdWJsaWMga2V5XG4gKi9cbmV4cG9ydHMuZWNyZWNvdmVyID0gZnVuY3Rpb24gKG1zZ0hhc2gsIHYsIHIsIHMsIGNoYWluSWQpIHtcbiAgICB2YXIgc2lnbmF0dXJlID0gQnVmZmVyLmNvbmNhdChbZXhwb3J0cy5zZXRMZW5ndGgociwgMzIpLCBleHBvcnRzLnNldExlbmd0aChzLCAzMildLCA2NCk7XG4gICAgdmFyIHJlY292ZXJ5ID0gY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCk7XG4gICAgaWYgKCFpc1ZhbGlkU2lnUmVjb3ZlcnkocmVjb3ZlcnkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzaWduYXR1cmUgdiB2YWx1ZScpO1xuICAgIH1cbiAgICB2YXIgc2VuZGVyUHViS2V5ID0gc2VjcDI1NmsxLnJlY292ZXIobXNnSGFzaCwgc2lnbmF0dXJlLCByZWNvdmVyeSk7XG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KHNlbmRlclB1YktleSwgZmFsc2UpLnNsaWNlKDEpO1xufTtcbi8qKlxuICogQ29udmVydCBzaWduYXR1cmUgcGFyYW1ldGVycyBpbnRvIHRoZSBmb3JtYXQgb2YgYGV0aF9zaWduYCBSUEMgbWV0aG9kLlxuICogQHJldHVybnMgU2lnbmF0dXJlXG4gKi9cbmV4cG9ydHMudG9ScGNTaWcgPSBmdW5jdGlvbiAodiwgciwgcywgY2hhaW5JZCkge1xuICAgIHZhciByZWNvdmVyeSA9IGNhbGN1bGF0ZVNpZ1JlY292ZXJ5KHYsIGNoYWluSWQpO1xuICAgIGlmICghaXNWYWxpZFNpZ1JlY292ZXJ5KHJlY292ZXJ5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIHYgdmFsdWUnKTtcbiAgICB9XG4gICAgLy8gZ2V0aCAoYW5kIHRoZSBSUEMgZXRoX3NpZ24gbWV0aG9kKSB1c2VzIHRoZSA2NSBieXRlIGZvcm1hdCB1c2VkIGJ5IEJpdGNvaW5cbiAgICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleChCdWZmZXIuY29uY2F0KFtleHBvcnRzLnNldExlbmd0aExlZnQociwgMzIpLCBleHBvcnRzLnNldExlbmd0aExlZnQocywgMzIpLCBleHBvcnRzLnRvQnVmZmVyKHYpXSkpO1xufTtcbi8qKlxuICogQ29udmVydCBzaWduYXR1cmUgZm9ybWF0IG9mIHRoZSBgZXRoX3NpZ25gIFJQQyBtZXRob2QgdG8gc2lnbmF0dXJlIHBhcmFtZXRlcnNcbiAqIE5PVEU6IGFsbCBiZWNhdXNlIG9mIGEgYnVnIGluIGdldGg6IGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bS9nby1ldGhlcmV1bS9pc3N1ZXMvMjA1M1xuICovXG5leHBvcnRzLmZyb21ScGNTaWcgPSBmdW5jdGlvbiAoc2lnKSB7XG4gICAgdmFyIGJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoc2lnKTtcbiAgICAvLyBOT1RFOiB3aXRoIHBvdGVudGlhbCBpbnRyb2R1Y3Rpb24gb2YgY2hhaW5JZCB0aGlzIG1pZ2h0IG5lZWQgdG8gYmUgdXBkYXRlZFxuICAgIGlmIChidWYubGVuZ3RoICE9PSA2NSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIGxlbmd0aCcpO1xuICAgIH1cbiAgICB2YXIgdiA9IGJ1Zls2NF07XG4gICAgLy8gc3VwcG9ydCBib3RoIHZlcnNpb25zIG9mIGBldGhfc2lnbmAgcmVzcG9uc2VzXG4gICAgaWYgKHYgPCAyNykge1xuICAgICAgICB2ICs9IDI3O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2OiB2LFxuICAgICAgICByOiBidWYuc2xpY2UoMCwgMzIpLFxuICAgICAgICBzOiBidWYuc2xpY2UoMzIsIDY0KSxcbiAgICB9O1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gYWRkcmVzcyBvZiBhIGdpdmVuIHByaXZhdGUga2V5LlxuICogQHBhcmFtIHByaXZhdGVLZXkgQSBwcml2YXRlIGtleSBtdXN0IGJlIDI1NiBiaXRzIHdpZGVcbiAqL1xuZXhwb3J0cy5wcml2YXRlVG9BZGRyZXNzID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5wdWJsaWNUb0FkZHJlc3MoZXhwb3J0cy5wcml2YXRlVG9QdWJsaWMocHJpdmF0ZUtleSkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBhZGRyZXNzIGlzIGEgdmFsaWQuIEFjY2VwdHMgY2hlY2tzdW1tZWQgYWRkcmVzc2VzIHRvby5cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgcmV0dXJuIC9eMHhbMC05YS1mQS1GXXs0MH0kLy50ZXN0KGFkZHJlc3MpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYWRkcmVzcyBpcyBhIHplcm8gYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy5pc1plcm9BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICB2YXIgemVyb0FkZHIgPSBleHBvcnRzLnplcm9BZGRyZXNzKCk7XG4gICAgcmV0dXJuIHplcm9BZGRyID09PSBleHBvcnRzLmFkZEhleFByZWZpeChhZGRyZXNzKTtcbn07XG4vKipcbiAqIFJldHVybnMgYSBjaGVja3N1bW1lZCBhZGRyZXNzLlxuICovXG5leHBvcnRzLnRvQ2hlY2tzdW1BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICBhZGRyZXNzID0gZXRoanNVdGlsLnN0cmlwSGV4UHJlZml4KGFkZHJlc3MpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGhhc2ggPSBleHBvcnRzLmtlY2NhayhhZGRyZXNzKS50b1N0cmluZygnaGV4Jyk7XG4gICAgdmFyIHJldCA9ICcweCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRyZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJzZUludChoYXNoW2ldLCAxNikgPj0gOCkge1xuICAgICAgICAgICAgcmV0ICs9IGFkZHJlc3NbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldCArPSBhZGRyZXNzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGFkZHJlc3MgaXMgYSB2YWxpZCBjaGVja3N1bW1lZCBhZGRyZXNzLlxuICovXG5leHBvcnRzLmlzVmFsaWRDaGVja3N1bUFkZHJlc3MgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgIHJldHVybiBleHBvcnRzLmlzVmFsaWRBZGRyZXNzKGFkZHJlc3MpICYmIGV4cG9ydHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcykgPT09IGFkZHJlc3M7XG59O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gYWRkcmVzcyBvZiBhIG5ld2x5IGNyZWF0ZWQgY29udHJhY3QuXG4gKiBAcGFyYW0gZnJvbSBUaGUgYWRkcmVzcyB3aGljaCBpcyBjcmVhdGluZyB0aGlzIG5ldyBhZGRyZXNzXG4gKiBAcGFyYW0gbm9uY2UgVGhlIG5vbmNlIG9mIHRoZSBmcm9tIGFjY291bnRcbiAqL1xuZXhwb3J0cy5nZW5lcmF0ZUFkZHJlc3MgPSBmdW5jdGlvbiAoZnJvbSwgbm9uY2UpIHtcbiAgICBmcm9tID0gZXhwb3J0cy50b0J1ZmZlcihmcm9tKTtcbiAgICB2YXIgbm9uY2VCTiA9IG5ldyBCTihub25jZSk7XG4gICAgaWYgKG5vbmNlQk4uaXNaZXJvKCkpIHtcbiAgICAgICAgLy8gaW4gUkxQIHdlIHdhbnQgdG8gZW5jb2RlIG51bGwgaW4gdGhlIGNhc2Ugb2YgemVybyBub25jZVxuICAgICAgICAvLyByZWFkIHRoZSBSTFAgZG9jdW1lbnRhdGlvbiBmb3IgYW4gYW5zd2VyIGlmIHlvdSBkYXJlXG4gICAgICAgIHJldHVybiBleHBvcnRzLnJscGhhc2goW2Zyb20sIG51bGxdKS5zbGljZSgtMjApO1xuICAgIH1cbiAgICAvLyBPbmx5IHRha2UgdGhlIGxvd2VyIDE2MGJpdHMgb2YgdGhlIGhhc2hcbiAgICByZXR1cm4gZXhwb3J0cy5ybHBoYXNoKFtmcm9tLCBCdWZmZXIuZnJvbShub25jZUJOLnRvQXJyYXkoKSldKS5zbGljZSgtMjApO1xufTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIGFkZHJlc3MgZm9yIGEgY29udHJhY3QgY3JlYXRlZCB1c2luZyBDUkVBVEUyLlxuICogQHBhcmFtIGZyb20gVGhlIGFkZHJlc3Mgd2hpY2ggaXMgY3JlYXRpbmcgdGhpcyBuZXcgYWRkcmVzc1xuICogQHBhcmFtIHNhbHQgQSBzYWx0XG4gKiBAcGFyYW0gaW5pdENvZGUgVGhlIGluaXQgY29kZSBvZiB0aGUgY29udHJhY3QgYmVpbmcgY3JlYXRlZFxuICovXG5leHBvcnRzLmdlbmVyYXRlQWRkcmVzczIgPSBmdW5jdGlvbiAoZnJvbSwgc2FsdCwgaW5pdENvZGUpIHtcbiAgICB2YXIgZnJvbUJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoZnJvbSk7XG4gICAgdmFyIHNhbHRCdWYgPSBleHBvcnRzLnRvQnVmZmVyKHNhbHQpO1xuICAgIHZhciBpbml0Q29kZUJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoaW5pdENvZGUpO1xuICAgIGFzc2VydChmcm9tQnVmLmxlbmd0aCA9PT0gMjApO1xuICAgIGFzc2VydChzYWx0QnVmLmxlbmd0aCA9PT0gMzIpO1xuICAgIHZhciBhZGRyZXNzID0gZXhwb3J0cy5rZWNjYWsyNTYoQnVmZmVyLmNvbmNhdChbQnVmZmVyLmZyb20oJ2ZmJywgJ2hleCcpLCBmcm9tQnVmLCBzYWx0QnVmLCBleHBvcnRzLmtlY2NhazI1Nihpbml0Q29kZUJ1ZildKSk7XG4gICAgcmV0dXJuIGFkZHJlc3Muc2xpY2UoLTIwKTtcbn07XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3VwcGxpZWQgYWRkcmVzcyBiZWxvbmdzIHRvIGEgcHJlY29tcGlsZWQgYWNjb3VudCAoQnl6YW50aXVtKS5cbiAqL1xuZXhwb3J0cy5pc1ByZWNvbXBpbGVkID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICB2YXIgYSA9IGV4cG9ydHMudW5wYWQoYWRkcmVzcyk7XG4gICAgcmV0dXJuIGEubGVuZ3RoID09PSAxICYmIGFbMF0gPj0gMSAmJiBhWzBdIDw9IDg7XG59O1xuLyoqXG4gKiBBZGRzIFwiMHhcIiB0byBhIGdpdmVuIGBTdHJpbmdgIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgc3RhcnQgd2l0aCBcIjB4XCIuXG4gKi9cbmV4cG9ydHMuYWRkSGV4UHJlZml4ID0gZnVuY3Rpb24gKHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gZXRoanNVdGlsLmlzSGV4UHJlZml4ZWQoc3RyKSA/IHN0ciA6ICcweCcgKyBzdHI7XG59O1xuLyoqXG4gKiBWYWxpZGF0ZSBhIEVDRFNBIHNpZ25hdHVyZS5cbiAqIEBwYXJhbSBob21lc3RlYWRPckxhdGVyIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgaXMgYmVpbmcgdXNlZCBvbiBlaXRoZXIgdGhlIGhvbWVzdGVhZCBoYXJkZm9yayBvciBhIGxhdGVyIG9uZVxuICovXG5leHBvcnRzLmlzVmFsaWRTaWduYXR1cmUgPSBmdW5jdGlvbiAodiwgciwgcywgaG9tZXN0ZWFkT3JMYXRlciwgY2hhaW5JZCkge1xuICAgIGlmIChob21lc3RlYWRPckxhdGVyID09PSB2b2lkIDApIHsgaG9tZXN0ZWFkT3JMYXRlciA9IHRydWU7IH1cbiAgICB2YXIgU0VDUDI1NksxX05fRElWXzIgPSBuZXcgQk4oJzdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmNWQ1NzZlNzM1N2E0NTAxZGRmZTkyZjQ2NjgxYjIwYTAnLCAxNik7XG4gICAgdmFyIFNFQ1AyNTZLMV9OID0gbmV3IEJOKCdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxJywgMTYpO1xuICAgIGlmIChyLmxlbmd0aCAhPT0gMzIgfHwgcy5sZW5ndGggIT09IDMyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFpc1ZhbGlkU2lnUmVjb3ZlcnkoY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHJCTiA9IG5ldyBCTihyKTtcbiAgICB2YXIgc0JOID0gbmV3IEJOKHMpO1xuICAgIGlmIChyQk4uaXNaZXJvKCkgfHwgckJOLmd0KFNFQ1AyNTZLMV9OKSB8fCBzQk4uaXNaZXJvKCkgfHwgc0JOLmd0KFNFQ1AyNTZLMV9OKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChob21lc3RlYWRPckxhdGVyICYmIHNCTi5jbXAoU0VDUDI1NksxX05fRElWXzIpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIG9yIGBBcnJheWAgdG8gSlNPTi5cbiAqIEBwYXJhbSBiYSAoQnVmZmVyfEFycmF5KVxuICogQHJldHVybiAoQXJyYXl8U3RyaW5nfG51bGwpXG4gKi9cbmV4cG9ydHMuYmFUb0pTT04gPSBmdW5jdGlvbiAoYmEpIHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJhKSkge1xuICAgICAgICByZXR1cm4gXCIweFwiICsgYmEudG9TdHJpbmcoJ2hleCcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChiYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGV4cG9ydHMuYmFUb0pTT04oYmFbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufTtcbi8qKlxuICogRGVmaW5lcyBwcm9wZXJ0aWVzIG9uIGEgYE9iamVjdGAuIEl0IG1ha2UgdGhlIGFzc3VtcHRpb24gdGhhdCB1bmRlcmx5aW5nIGRhdGEgaXMgYmluYXJ5LlxuICogQHBhcmFtIHNlbGYgdGhlIGBPYmplY3RgIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uXG4gKiBAcGFyYW0gZmllbGRzIGFuIGFycmF5IGZpZWxkcyB0byBkZWZpbmUuIEZpZWxkcyBjYW4gY29udGFpbjpcbiAqICogYG5hbWVgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnRpZXNcbiAqICogYGxlbmd0aGAgLSB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBmaWVsZCBjYW4gaGF2ZVxuICogKiBgYWxsb3dMZXNzYCAtIGlmIHRoZSBmaWVsZCBjYW4gYmUgbGVzcyB0aGFuIHRoZSBsZW5ndGhcbiAqICogYGFsbG93RW1wdHlgXG4gKiBAcGFyYW0gZGF0YSBkYXRhIHRvIGJlIHZhbGlkYXRlZCBhZ2FpbnN0IHRoZSBkZWZpbml0aW9uc1xuICovXG5leHBvcnRzLmRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoc2VsZiwgZmllbGRzLCBkYXRhKSB7XG4gICAgc2VsZi5yYXcgPSBbXTtcbiAgICBzZWxmLl9maWVsZHMgPSBbXTtcbiAgICAvLyBhdHRhY2ggdGhlIGB0b0pTT05gXG4gICAgc2VsZi50b0pTT04gPSBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgaWYgKGxhYmVsID09PSB2b2lkIDApIHsgbGFiZWwgPSBmYWxzZTsgfVxuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIHZhciBvYmpfMSA9IHt9O1xuICAgICAgICAgICAgc2VsZi5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgb2JqXzFbZmllbGRdID0gXCIweFwiICsgc2VsZltmaWVsZF0udG9TdHJpbmcoJ2hleCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqXzE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYmFUb0pTT04oc2VsZi5yYXcpO1xuICAgIH07XG4gICAgc2VsZi5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gICAgICAgIHJldHVybiBybHAuZW5jb2RlKHNlbGYucmF3KTtcbiAgICB9O1xuICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgaSkge1xuICAgICAgICBzZWxmLl9maWVsZHMucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0dGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYucmF3W2ldO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNldHRlcih2KSB7XG4gICAgICAgICAgICB2ID0gZXhwb3J0cy50b0J1ZmZlcih2KTtcbiAgICAgICAgICAgIGlmICh2LnRvU3RyaW5nKCdoZXgnKSA9PT0gJzAwJyAmJiAhZmllbGQuYWxsb3daZXJvKSB7XG4gICAgICAgICAgICAgICAgdiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWVsZC5hbGxvd0xlc3MgJiYgZmllbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdiA9IGV4cG9ydHMuc3RyaXBaZXJvcyh2KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZmllbGQubGVuZ3RoID49IHYubGVuZ3RoLCBcIlRoZSBmaWVsZCBcIiArIGZpZWxkLm5hbWUgKyBcIiBtdXN0IG5vdCBoYXZlIG1vcmUgXCIgKyBmaWVsZC5sZW5ndGggKyBcIiBieXRlc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEoZmllbGQuYWxsb3daZXJvICYmIHYubGVuZ3RoID09PSAwKSAmJiBmaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZmllbGQubGVuZ3RoID09PSB2Lmxlbmd0aCwgXCJUaGUgZmllbGQgXCIgKyBmaWVsZC5uYW1lICsgXCIgbXVzdCBoYXZlIGJ5dGUgbGVuZ3RoIG9mIFwiICsgZmllbGQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucmF3W2ldID0gdjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgZmllbGQubmFtZSwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmllbGQuZGVmYXVsdCkge1xuICAgICAgICAgICAgc2VsZltmaWVsZC5uYW1lXSA9IGZpZWxkLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXR0YWNoIGFsaWFzXG4gICAgICAgIGlmIChmaWVsZC5hbGlhcykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGZpZWxkLmFsaWFzLCB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpZiB0aGUgY29uc3R1Y3RvciBpcyBwYXNzZWQgZGF0YVxuICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShldGhqc1V0aWwuc3RyaXBIZXhQcmVmaXgoZGF0YSksICdoZXgnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gcmxwLmRlY29kZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gc2VsZi5fZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgbnVtYmVyIG9mIGZpZWxkcyBpbiBkYXRhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIHRoZSBpdGVtcyBhcmUgYnVmZmVyc1xuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgc2VsZltzZWxmLl9maWVsZHNbaV1dID0gZXhwb3J0cy50b0J1ZmZlcihkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIGtleXNfMSA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXNfMS5pbmRleE9mKGZpZWxkLm5hbWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZltmaWVsZC5uYW1lXSA9IGRhdGFbZmllbGQubmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGtleXNfMS5pbmRleE9mKGZpZWxkLmFsaWFzKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHNlbGZbZmllbGQuYWxpYXNdID0gZGF0YVtmaWVsZC5hbGlhc107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCkge1xuICAgIHJldHVybiBjaGFpbklkID8gdiAtICgyICogY2hhaW5JZCArIDM1KSA6IHYgLSAyNztcbn1cbmZ1bmN0aW9uIGlzVmFsaWRTaWdSZWNvdmVyeShyZWNvdmVyeSkge1xuICAgIHJldHVybiByZWNvdmVyeSA9PT0gMCB8fCByZWNvdmVyeSA9PT0gMTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtZXNjYXBlICovXHJcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnZXRoZXJldW1qcy11dGlsJylcclxuY29uc3QgQk4gPSByZXF1aXJlKCdibi5qcycpXHJcblxyXG52YXIgQUJJID0gZnVuY3Rpb24gKCkge1xyXG59XHJcblxyXG4vLyBDb252ZXJ0IGZyb20gc2hvcnQgdG8gY2Fub25pY2FsIG5hbWVzXHJcbi8vIEZJWE1FOiBvcHRpbWlzZSBvciBtYWtlIHRoaXMgbmljZXI/XHJcbmZ1bmN0aW9uIGVsZW1lbnRhcnlOYW1lIChuYW1lKSB7XHJcbiAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaW50WycpKSB7XHJcbiAgICByZXR1cm4gJ2ludDI1NicgKyBuYW1lLnNsaWNlKDMpXHJcbiAgfSBlbHNlIGlmIChuYW1lID09PSAnaW50Jykge1xyXG4gICAgcmV0dXJuICdpbnQyNTYnXHJcbiAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ3VpbnRbJykpIHtcclxuICAgIHJldHVybiAndWludDI1NicgKyBuYW1lLnNsaWNlKDQpXHJcbiAgfSBlbHNlIGlmIChuYW1lID09PSAndWludCcpIHtcclxuICAgIHJldHVybiAndWludDI1NidcclxuICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnZml4ZWRbJykpIHtcclxuICAgIHJldHVybiAnZml4ZWQxMjh4MTI4JyArIG5hbWUuc2xpY2UoNSlcclxuICB9IGVsc2UgaWYgKG5hbWUgPT09ICdmaXhlZCcpIHtcclxuICAgIHJldHVybiAnZml4ZWQxMjh4MTI4J1xyXG4gIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCd1Zml4ZWRbJykpIHtcclxuICAgIHJldHVybiAndWZpeGVkMTI4eDEyOCcgKyBuYW1lLnNsaWNlKDYpXHJcbiAgfSBlbHNlIGlmIChuYW1lID09PSAndWZpeGVkJykge1xyXG4gICAgcmV0dXJuICd1Zml4ZWQxMjh4MTI4J1xyXG4gIH1cclxuICByZXR1cm4gbmFtZVxyXG59XHJcblxyXG5BQkkuZXZlbnRJRCA9IGZ1bmN0aW9uIChuYW1lLCB0eXBlcykge1xyXG4gIC8vIEZJWE1FOiB1c2Ugbm9kZS5qcyB1dGlsLmZvcm1hdD9cclxuICB2YXIgc2lnID0gbmFtZSArICcoJyArIHR5cGVzLm1hcChlbGVtZW50YXJ5TmFtZSkuam9pbignLCcpICsgJyknXHJcbiAgcmV0dXJuIHV0aWxzLmtlY2NhazI1NihCdWZmZXIuZnJvbShzaWcpKVxyXG59XHJcblxyXG5BQkkubWV0aG9kSUQgPSBmdW5jdGlvbiAobmFtZSwgdHlwZXMpIHtcclxuICByZXR1cm4gQUJJLmV2ZW50SUQobmFtZSwgdHlwZXMpLnNsaWNlKDAsIDQpXHJcbn1cclxuXHJcbi8vIFBhcnNlIE4gZnJvbSB0eXBlPE4+XHJcbmZ1bmN0aW9uIHBhcnNlVHlwZU4gKHR5cGUpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoL15cXEQrKFxcZCspJC8uZXhlYyh0eXBlKVsxXSwgMTApXHJcbn1cclxuXHJcbi8vIFBhcnNlIE4sTSBmcm9tIHR5cGU8Tj54PE0+XHJcbmZ1bmN0aW9uIHBhcnNlVHlwZU54TSAodHlwZSkge1xyXG4gIHZhciB0bXAgPSAvXlxcRCsoXFxkKyl4KFxcZCspJC8uZXhlYyh0eXBlKVxyXG4gIHJldHVybiBbIHBhcnNlSW50KHRtcFsxXSwgMTApLCBwYXJzZUludCh0bXBbMl0sIDEwKSBdXHJcbn1cclxuXHJcbi8vIFBhcnNlIE4gaW4gdHlwZVs8Tj5dIHdoZXJlIFwidHlwZVwiIGNhbiBpdHNlbGYgYmUgYW4gYXJyYXkgdHlwZS5cclxuZnVuY3Rpb24gcGFyc2VUeXBlQXJyYXkgKHR5cGUpIHtcclxuICB2YXIgdG1wID0gdHlwZS5tYXRjaCgvKC4qKVxcWyguKj8pXFxdJC8pXHJcbiAgaWYgKHRtcCkge1xyXG4gICAgcmV0dXJuIHRtcFsyXSA9PT0gJycgPyAnZHluYW1pYycgOiBwYXJzZUludCh0bXBbMl0sIDEwKVxyXG4gIH1cclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU51bWJlciAoYXJnKSB7XHJcbiAgdmFyIHR5cGUgPSB0eXBlb2YgYXJnXHJcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAodXRpbHMuaXNIZXhQcmVmaXhlZChhcmcpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQk4odXRpbHMuc3RyaXBIZXhQcmVmaXgoYXJnKSwgMTYpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IEJOKGFyZywgMTApXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xyXG4gICAgcmV0dXJuIG5ldyBCTihhcmcpXHJcbiAgfSBlbHNlIGlmIChhcmcudG9BcnJheSkge1xyXG4gICAgLy8gYXNzdW1lIHRoaXMgaXMgYSBCTiBmb3IgdGhlIG1vbWVudCwgcmVwbGFjZSB3aXRoIEJOLmlzQk4gc29vblxyXG4gICAgcmV0dXJuIGFyZ1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IGlzIG5vdCBhIG51bWJlcicpXHJcbiAgfVxyXG59XHJcblxyXG4vLyBzb21lTWV0aG9kKGJ5dGVzLHVpbnQpXHJcbi8vIHNvbWVNZXRob2QoYnl0ZXMsdWludCk6KGJvb2xlYW4pXHJcbmZ1bmN0aW9uIHBhcnNlU2lnbmF0dXJlIChzaWcpIHtcclxuICB2YXIgdG1wID0gL14oXFx3KylcXCgoLiopXFwpJC8uZXhlYyhzaWcpXHJcblxyXG4gIGlmICh0bXAubGVuZ3RoICE9PSAzKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWV0aG9kIHNpZ25hdHVyZScpXHJcbiAgfVxyXG5cclxuICB2YXIgYXJncyA9IC9eKC4rKVxcKTpcXCgoLispJC8uZXhlYyh0bXBbMl0pXHJcblxyXG4gIGlmIChhcmdzICE9PSBudWxsICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXRob2Q6IHRtcFsxXSxcclxuICAgICAgYXJnczogYXJnc1sxXS5zcGxpdCgnLCcpLFxyXG4gICAgICByZXRhcmdzOiBhcmdzWzJdLnNwbGl0KCcsJylcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHBhcmFtcyA9IHRtcFsyXS5zcGxpdCgnLCcpXHJcbiAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMSAmJiBwYXJhbXNbMF0gPT09ICcnKSB7XHJcbiAgICAgIC8vIFNwZWNpYWwtY2FzZSAocG9zc2libHkgbmFpdmUpIGZpeHVwIGZvciBmdW5jdGlvbnMgdGhhdCB0YWtlIG5vIGFyZ3VtZW50cy5cclxuICAgICAgLy8gVE9ETzogc3BlY2lhbCBjYXNlcyBhcmUgYWx3YXlzIGJhZCwgYnV0IHRoaXMgbWFrZXMgdGhlIGZ1bmN0aW9uIHJldHVyblxyXG4gICAgICAvLyBtYXRjaCB3aGF0IHRoZSBjYWxsaW5nIGZ1bmN0aW9ucyBleHBlY3RcclxuICAgICAgcGFyYW1zID0gW11cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1ldGhvZDogdG1wWzFdLFxyXG4gICAgICBhcmdzOiBwYXJhbXNcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEVuY29kZXMgYSBzaW5nbGUgaXRlbSAoY2FuIGJlIGR5bmFtaWMgYXJyYXkpXHJcbi8vIEByZXR1cm5zOiBCdWZmZXJcclxuZnVuY3Rpb24gZW5jb2RlU2luZ2xlICh0eXBlLCBhcmcpIHtcclxuICB2YXIgc2l6ZSwgbnVtLCByZXQsIGlcclxuXHJcbiAgaWYgKHR5cGUgPT09ICdhZGRyZXNzJykge1xyXG4gICAgcmV0dXJuIGVuY29kZVNpbmdsZSgndWludDE2MCcsIHBhcnNlTnVtYmVyKGFyZykpXHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYm9vbCcpIHtcclxuICAgIHJldHVybiBlbmNvZGVTaW5nbGUoJ3VpbnQ4JywgYXJnID8gMSA6IDApXHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGVuY29kZVNpbmdsZSgnYnl0ZXMnLCBCdWZmZXIuZnJvbShhcmcsICd1dGY4JykpXHJcbiAgfSBlbHNlIGlmIChpc0FycmF5KHR5cGUpKSB7XHJcbiAgICAvLyB0aGlzIHBhcnQgaGFuZGxlcyBmaXhlZC1sZW5ndGggKFsyXSkgYW5kIHZhcmlhYmxlIGxlbmd0aCAoW10pIGFycmF5c1xyXG4gICAgLy8gTk9URTogd2UgY2F0Y2ggaGVyZSBhbGwgY2FsbHMgdG8gYXJyYXlzLCB0aGF0IHNpbXBsaWZpZXMgdGhlIHJlc3RcclxuICAgIGlmICh0eXBlb2YgYXJnLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYW4gYXJyYXk/JylcclxuICAgIH1cclxuICAgIHNpemUgPSBwYXJzZVR5cGVBcnJheSh0eXBlKVxyXG4gICAgaWYgKHNpemUgIT09ICdkeW5hbWljJyAmJiBzaXplICE9PSAwICYmIGFyZy5sZW5ndGggPiBzaXplKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudHMgZXhjZWVkIGFycmF5IHNpemU6ICcgKyBzaXplKVxyXG4gICAgfVxyXG4gICAgcmV0ID0gW11cclxuICAgIHR5cGUgPSB0eXBlLnNsaWNlKDAsIHR5cGUubGFzdEluZGV4T2YoJ1snKSlcclxuICAgIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xyXG4gICAgICBhcmcgPSBKU09OLnBhcnNlKGFyZylcclxuICAgIH1cclxuICAgIGZvciAoaSBpbiBhcmcpIHtcclxuICAgICAgcmV0LnB1c2goZW5jb2RlU2luZ2xlKHR5cGUsIGFyZ1tpXSkpXHJcbiAgICB9XHJcbiAgICBpZiAoc2l6ZSA9PT0gJ2R5bmFtaWMnKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSBlbmNvZGVTaW5nbGUoJ3VpbnQyNTYnLCBhcmcubGVuZ3RoKVxyXG4gICAgICByZXQudW5zaGlmdChsZW5ndGgpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChyZXQpXHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYnl0ZXMnKSB7XHJcbiAgICBhcmcgPSBCdWZmZXIuZnJvbShhcmcpXHJcblxyXG4gICAgcmV0ID0gQnVmZmVyLmNvbmNhdChbIGVuY29kZVNpbmdsZSgndWludDI1NicsIGFyZy5sZW5ndGgpLCBhcmcgXSlcclxuXHJcbiAgICBpZiAoKGFyZy5sZW5ndGggJSAzMikgIT09IDApIHtcclxuICAgICAgcmV0ID0gQnVmZmVyLmNvbmNhdChbIHJldCwgdXRpbHMuemVyb3MoMzIgLSAoYXJnLmxlbmd0aCAlIDMyKSkgXSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ2J5dGVzJykpIHtcclxuICAgIHNpemUgPSBwYXJzZVR5cGVOKHR5cGUpXHJcbiAgICBpZiAoc2l6ZSA8IDEgfHwgc2l6ZSA+IDMyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBieXRlczxOPiB3aWR0aDogJyArIHNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHV0aWxzLnNldExlbmd0aFJpZ2h0KGFyZywgMzIpXHJcbiAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ3VpbnQnKSkge1xyXG4gICAgc2l6ZSA9IHBhcnNlVHlwZU4odHlwZSlcclxuICAgIGlmICgoc2l6ZSAlIDgpIHx8IChzaXplIDwgOCkgfHwgKHNpemUgPiAyNTYpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB1aW50PE4+IHdpZHRoOiAnICsgc2l6ZSlcclxuICAgIH1cclxuXHJcbiAgICBudW0gPSBwYXJzZU51bWJlcihhcmcpXHJcbiAgICBpZiAobnVtLmJpdExlbmd0aCgpID4gc2l6ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIHVpbnQgZXhjZWVkcyB3aWR0aDogJyArIHNpemUgKyAnIHZzICcgKyBudW0uYml0TGVuZ3RoKCkpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG51bSA8IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwbGllZCB1aW50IGlzIG5lZ2F0aXZlJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVtLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2JlJywgMzIpXHJcbiAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ2ludCcpKSB7XHJcbiAgICBzaXplID0gcGFyc2VUeXBlTih0eXBlKVxyXG4gICAgaWYgKChzaXplICUgOCkgfHwgKHNpemUgPCA4KSB8fCAoc2l6ZSA+IDI1NikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGludDxOPiB3aWR0aDogJyArIHNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgbnVtID0gcGFyc2VOdW1iZXIoYXJnKVxyXG4gICAgaWYgKG51bS5iaXRMZW5ndGgoKSA+IHNpemUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwbGllZCBpbnQgZXhjZWVkcyB3aWR0aDogJyArIHNpemUgKyAnIHZzICcgKyBudW0uYml0TGVuZ3RoKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bS50b1R3b3MoMjU2KS50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKVxyXG4gIH0gZWxzZSBpZiAodHlwZS5zdGFydHNXaXRoKCd1Zml4ZWQnKSkge1xyXG4gICAgc2l6ZSA9IHBhcnNlVHlwZU54TSh0eXBlKVxyXG5cclxuICAgIG51bSA9IHBhcnNlTnVtYmVyKGFyZylcclxuXHJcbiAgICBpZiAobnVtIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIHVmaXhlZCBpcyBuZWdhdGl2ZScpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVuY29kZVNpbmdsZSgndWludDI1NicsIG51bS5tdWwobmV3IEJOKDIpLnBvdyhuZXcgQk4oc2l6ZVsxXSkpKSlcclxuICB9IGVsc2UgaWYgKHR5cGUuc3RhcnRzV2l0aCgnZml4ZWQnKSkge1xyXG4gICAgc2l6ZSA9IHBhcnNlVHlwZU54TSh0eXBlKVxyXG5cclxuICAgIHJldHVybiBlbmNvZGVTaW5nbGUoJ2ludDI1NicsIHBhcnNlTnVtYmVyKGFyZykubXVsKG5ldyBCTigyKS5wb3cobmV3IEJOKHNpemVbMV0pKSkpXHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIG9yIGludmFsaWQgdHlwZTogJyArIHR5cGUpXHJcbn1cclxuXHJcbi8vIERlY29kZXMgYSBzaW5nbGUgaXRlbSAoY2FuIGJlIGR5bmFtaWMgYXJyYXkpXHJcbi8vIEByZXR1cm5zOiBhcnJheVxyXG4vLyBGSVhNRTogdGhpcyBtZXRob2Qgd2lsbCBuZWVkIGEgbG90IG9mIGF0dGVudGlvbiBhdCBjaGVja2luZyBsaW1pdHMgYW5kIHZhbGlkYXRpb25cclxuZnVuY3Rpb24gZGVjb2RlU2luZ2xlIChwYXJzZWRUeXBlLCBkYXRhLCBvZmZzZXQpIHtcclxuICBpZiAodHlwZW9mIHBhcnNlZFR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBwYXJzZWRUeXBlID0gcGFyc2VUeXBlKHBhcnNlZFR5cGUpXHJcbiAgfVxyXG4gIHZhciBzaXplLCBudW0sIHJldCwgaVxyXG5cclxuICBpZiAocGFyc2VkVHlwZS5uYW1lID09PSAnYWRkcmVzcycpIHtcclxuICAgIHJldHVybiBkZWNvZGVTaW5nbGUocGFyc2VkVHlwZS5yYXdUeXBlLCBkYXRhLCBvZmZzZXQpLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2JlJywgMjApLnRvU3RyaW5nKCdoZXgnKVxyXG4gIH0gZWxzZSBpZiAocGFyc2VkVHlwZS5uYW1lID09PSAnYm9vbCcpIHtcclxuICAgIHJldHVybiBkZWNvZGVTaW5nbGUocGFyc2VkVHlwZS5yYXdUeXBlLCBkYXRhLCBvZmZzZXQpLnRvU3RyaW5nKCkgPT09IG5ldyBCTigxKS50b1N0cmluZygpXHJcbiAgfSBlbHNlIGlmIChwYXJzZWRUeXBlLm5hbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YXIgYnl0ZXMgPSBkZWNvZGVTaW5nbGUocGFyc2VkVHlwZS5yYXdUeXBlLCBkYXRhLCBvZmZzZXQpXHJcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYnl0ZXMsICd1dGY4JykudG9TdHJpbmcoKVxyXG4gIH0gZWxzZSBpZiAocGFyc2VkVHlwZS5pc0FycmF5KSB7XHJcbiAgICAvLyB0aGlzIHBhcnQgaGFuZGxlcyBmaXhlZC1sZW5ndGggYXJyYXlzIChbMl0pIGFuZCB2YXJpYWJsZSBsZW5ndGggKFtdKSBhcnJheXNcclxuICAgIC8vIE5PVEU6IHdlIGNhdGNoIGhlcmUgYWxsIGNhbGxzIHRvIGFycmF5cywgdGhhdCBzaW1wbGlmaWVzIHRoZSByZXN0XHJcbiAgICByZXQgPSBbXVxyXG4gICAgc2l6ZSA9IHBhcnNlZFR5cGUuc2l6ZVxyXG5cclxuICAgIGlmIChwYXJzZWRUeXBlLnNpemUgPT09ICdkeW5hbWljJykge1xyXG4gICAgICBvZmZzZXQgPSBkZWNvZGVTaW5nbGUoJ3VpbnQyNTYnLCBkYXRhLCBvZmZzZXQpLnRvTnVtYmVyKClcclxuICAgICAgc2l6ZSA9IGRlY29kZVNpbmdsZSgndWludDI1NicsIGRhdGEsIG9mZnNldCkudG9OdW1iZXIoKVxyXG4gICAgICBvZmZzZXQgPSBvZmZzZXQgKyAzMlxyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICB2YXIgZGVjb2RlZCA9IGRlY29kZVNpbmdsZShwYXJzZWRUeXBlLnN1YkFycmF5LCBkYXRhLCBvZmZzZXQpXHJcbiAgICAgIHJldC5wdXNoKGRlY29kZWQpXHJcbiAgICAgIG9mZnNldCArPSBwYXJzZWRUeXBlLnN1YkFycmF5Lm1lbW9yeVVzYWdlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSBlbHNlIGlmIChwYXJzZWRUeXBlLm5hbWUgPT09ICdieXRlcycpIHtcclxuICAgIG9mZnNldCA9IGRlY29kZVNpbmdsZSgndWludDI1NicsIGRhdGEsIG9mZnNldCkudG9OdW1iZXIoKVxyXG4gICAgc2l6ZSA9IGRlY29kZVNpbmdsZSgndWludDI1NicsIGRhdGEsIG9mZnNldCkudG9OdW1iZXIoKVxyXG4gICAgcmV0dXJuIGRhdGEuc2xpY2Uob2Zmc2V0ICsgMzIsIG9mZnNldCArIDMyICsgc2l6ZSlcclxuICB9IGVsc2UgaWYgKHBhcnNlZFR5cGUubmFtZS5zdGFydHNXaXRoKCdieXRlcycpKSB7XHJcbiAgICByZXR1cm4gZGF0YS5zbGljZShvZmZzZXQsIG9mZnNldCArIHBhcnNlZFR5cGUuc2l6ZSlcclxuICB9IGVsc2UgaWYgKHBhcnNlZFR5cGUubmFtZS5zdGFydHNXaXRoKCd1aW50JykpIHtcclxuICAgIG51bSA9IG5ldyBCTihkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgMzIpLCAxNiwgJ2JlJylcclxuICAgIGlmIChudW0uYml0TGVuZ3RoKCkgPiBwYXJzZWRUeXBlLnNpemUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNvZGVkIGludCBleGNlZWRzIHdpZHRoOiAnICsgcGFyc2VkVHlwZS5zaXplICsgJyB2cyAnICsgbnVtLmJpdExlbmd0aCgpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bVxyXG4gIH0gZWxzZSBpZiAocGFyc2VkVHlwZS5uYW1lLnN0YXJ0c1dpdGgoJ2ludCcpKSB7XHJcbiAgICBudW0gPSBuZXcgQk4oZGF0YS5zbGljZShvZmZzZXQsIG9mZnNldCArIDMyKSwgMTYsICdiZScpLmZyb21Ud29zKDI1NilcclxuICAgIGlmIChudW0uYml0TGVuZ3RoKCkgPiBwYXJzZWRUeXBlLnNpemUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNvZGVkIHVpbnQgZXhjZWVkcyB3aWR0aDogJyArIHBhcnNlZFR5cGUuc2l6ZSArICcgdnMgJyArIG51bS5iaXRMZW5ndGgoKSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVtXHJcbiAgfSBlbHNlIGlmIChwYXJzZWRUeXBlLm5hbWUuc3RhcnRzV2l0aCgndWZpeGVkJykpIHtcclxuICAgIHNpemUgPSBuZXcgQk4oMikucG93KG5ldyBCTihwYXJzZWRUeXBlLnNpemVbMV0pKVxyXG4gICAgbnVtID0gZGVjb2RlU2luZ2xlKCd1aW50MjU2JywgZGF0YSwgb2Zmc2V0KVxyXG4gICAgaWYgKCFudW0ubW9kKHNpemUpLmlzWmVybygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjaW1hbHMgbm90IHN1cHBvcnRlZCB5ZXQnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bS5kaXYoc2l6ZSlcclxuICB9IGVsc2UgaWYgKHBhcnNlZFR5cGUubmFtZS5zdGFydHNXaXRoKCdmaXhlZCcpKSB7XHJcbiAgICBzaXplID0gbmV3IEJOKDIpLnBvdyhuZXcgQk4ocGFyc2VkVHlwZS5zaXplWzFdKSlcclxuICAgIG51bSA9IGRlY29kZVNpbmdsZSgnaW50MjU2JywgZGF0YSwgb2Zmc2V0KVxyXG4gICAgaWYgKCFudW0ubW9kKHNpemUpLmlzWmVybygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjaW1hbHMgbm90IHN1cHBvcnRlZCB5ZXQnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bS5kaXYoc2l6ZSlcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBvciBpbnZhbGlkIHR5cGU6ICcgKyBwYXJzZWRUeXBlLm5hbWUpXHJcbn1cclxuXHJcbi8vIFBhcnNlIHRoZSBnaXZlbiB0eXBlXHJcbi8vIEByZXR1cm5zOiB7fSBjb250YWluaW5nIHRoZSB0eXBlIGl0c2VsZiwgbWVtb3J5IHVzYWdlIGFuZCAoaW5jbHVkaW5nIHNpemUgYW5kIHN1YkFycmF5IGlmIGFwcGxpY2FibGUpXHJcbmZ1bmN0aW9uIHBhcnNlVHlwZSAodHlwZSkge1xyXG4gIHZhciBzaXplXHJcbiAgdmFyIHJldFxyXG4gIGlmIChpc0FycmF5KHR5cGUpKSB7XHJcbiAgICBzaXplID0gcGFyc2VUeXBlQXJyYXkodHlwZSlcclxuICAgIHZhciBzdWJBcnJheSA9IHR5cGUuc2xpY2UoMCwgdHlwZS5sYXN0SW5kZXhPZignWycpKVxyXG4gICAgc3ViQXJyYXkgPSBwYXJzZVR5cGUoc3ViQXJyYXkpXHJcbiAgICByZXQgPSB7XHJcbiAgICAgIGlzQXJyYXk6IHRydWUsXHJcbiAgICAgIG5hbWU6IHR5cGUsXHJcbiAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgIG1lbW9yeVVzYWdlOiBzaXplID09PSAnZHluYW1pYycgPyAzMiA6IHN1YkFycmF5Lm1lbW9yeVVzYWdlICogc2l6ZSxcclxuICAgICAgc3ViQXJyYXk6IHN1YkFycmF5XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciByYXdUeXBlXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnYWRkcmVzcyc6XHJcbiAgICAgICAgcmF3VHlwZSA9ICd1aW50MTYwJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ2Jvb2wnOlxyXG4gICAgICAgIHJhd1R5cGUgPSAndWludDgnXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICByYXdUeXBlID0gJ2J5dGVzJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICByZXQgPSB7XHJcbiAgICAgIHJhd1R5cGU6IHJhd1R5cGUsXHJcbiAgICAgIG5hbWU6IHR5cGUsXHJcbiAgICAgIG1lbW9yeVVzYWdlOiAzMlxyXG4gICAgfVxyXG5cclxuICAgIGlmICgodHlwZS5zdGFydHNXaXRoKCdieXRlcycpICYmIHR5cGUgIT09ICdieXRlcycpIHx8IHR5cGUuc3RhcnRzV2l0aCgndWludCcpIHx8IHR5cGUuc3RhcnRzV2l0aCgnaW50JykpIHtcclxuICAgICAgcmV0LnNpemUgPSBwYXJzZVR5cGVOKHR5cGUpXHJcbiAgICB9IGVsc2UgaWYgKHR5cGUuc3RhcnRzV2l0aCgndWZpeGVkJykgfHwgdHlwZS5zdGFydHNXaXRoKCdmaXhlZCcpKSB7XHJcbiAgICAgIHJldC5zaXplID0gcGFyc2VUeXBlTnhNKHR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUuc3RhcnRzV2l0aCgnYnl0ZXMnKSAmJiB0eXBlICE9PSAnYnl0ZXMnICYmIChyZXQuc2l6ZSA8IDEgfHwgcmV0LnNpemUgPiAzMikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJ5dGVzPE4+IHdpZHRoOiAnICsgcmV0LnNpemUpXHJcbiAgICB9XHJcbiAgICBpZiAoKHR5cGUuc3RhcnRzV2l0aCgndWludCcpIHx8IHR5cGUuc3RhcnRzV2l0aCgnaW50JykpICYmIChyZXQuc2l6ZSAlIDggfHwgcmV0LnNpemUgPCA4IHx8IHJldC5zaXplID4gMjU2KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50L3VpbnQ8Tj4gd2lkdGg6ICcgKyByZXQuc2l6ZSlcclxuICAgIH1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcbn1cclxuXHJcbi8vIElzIGEgdHlwZSBkeW5hbWljP1xyXG5mdW5jdGlvbiBpc0R5bmFtaWMgKHR5cGUpIHtcclxuICAvLyBGSVhNRTogaGFuZGxlIGFsbCB0eXBlcz8gSSBkb24ndCB0aGluayBhbnl0aGluZyBpcyBtaXNzaW5nIG5vd1xyXG4gIHJldHVybiAodHlwZSA9PT0gJ3N0cmluZycpIHx8ICh0eXBlID09PSAnYnl0ZXMnKSB8fCAocGFyc2VUeXBlQXJyYXkodHlwZSkgPT09ICdkeW5hbWljJylcclxufVxyXG5cclxuLy8gSXMgYSB0eXBlIGFuIGFycmF5P1xyXG5mdW5jdGlvbiBpc0FycmF5ICh0eXBlKSB7XHJcbiAgcmV0dXJuIHR5cGUubGFzdEluZGV4T2YoJ10nKSA9PT0gdHlwZS5sZW5ndGggLSAxXHJcbn1cclxuXHJcbi8vIEVuY29kZSBhIG1ldGhvZC9ldmVudCB3aXRoIGFyZ3VtZW50c1xyXG4vLyBAdHlwZXMgYW4gYXJyYXkgb2Ygc3RyaW5nIHR5cGUgbmFtZXNcclxuLy8gQGFyZ3MgIGFuIGFycmF5IG9mIHRoZSBhcHByb3ByaWF0ZSB2YWx1ZXNcclxuQUJJLnJhd0VuY29kZSA9IGZ1bmN0aW9uICh0eXBlcywgdmFsdWVzKSB7XHJcbiAgdmFyIG91dHB1dCA9IFtdXHJcbiAgdmFyIGRhdGEgPSBbXVxyXG5cclxuICB2YXIgaGVhZExlbmd0aCA9IDBcclxuXHJcbiAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgaWYgKGlzQXJyYXkodHlwZSkpIHtcclxuICAgICAgdmFyIHNpemUgPSBwYXJzZVR5cGVBcnJheSh0eXBlKVxyXG5cclxuICAgICAgaWYgKHNpemUgIT09ICdkeW5hbWljJykge1xyXG4gICAgICAgIGhlYWRMZW5ndGggKz0gMzIgKiBzaXplXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGVhZExlbmd0aCArPSAzMlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoZWFkTGVuZ3RoICs9IDMyXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHR5cGUgPSBlbGVtZW50YXJ5TmFtZSh0eXBlc1tpXSlcclxuICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tpXVxyXG4gICAgdmFyIGN1ciA9IGVuY29kZVNpbmdsZSh0eXBlLCB2YWx1ZSlcclxuXHJcbiAgICAvLyBVc2UgdGhlIGhlYWQvdGFpbCBtZXRob2QgZm9yIHN0b3JpbmcgZHluYW1pYyBkYXRhXHJcbiAgICBpZiAoaXNEeW5hbWljKHR5cGUpKSB7XHJcbiAgICAgIG91dHB1dC5wdXNoKGVuY29kZVNpbmdsZSgndWludDI1NicsIGhlYWRMZW5ndGgpKVxyXG4gICAgICBkYXRhLnB1c2goY3VyKVxyXG4gICAgICBoZWFkTGVuZ3RoICs9IGN1ci5sZW5ndGhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHB1dC5wdXNoKGN1cilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KG91dHB1dC5jb25jYXQoZGF0YSkpXHJcbn1cclxuXHJcbkFCSS5yYXdEZWNvZGUgPSBmdW5jdGlvbiAodHlwZXMsIGRhdGEpIHtcclxuICB2YXIgcmV0ID0gW11cclxuICBkYXRhID0gQnVmZmVyLmZyb20oZGF0YSlcclxuICB2YXIgb2Zmc2V0ID0gMFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0eXBlID0gZWxlbWVudGFyeU5hbWUodHlwZXNbaV0pXHJcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VUeXBlKHR5cGUsIGRhdGEsIG9mZnNldClcclxuICAgIHZhciBkZWNvZGVkID0gZGVjb2RlU2luZ2xlKHBhcnNlZCwgZGF0YSwgb2Zmc2V0KVxyXG4gICAgb2Zmc2V0ICs9IHBhcnNlZC5tZW1vcnlVc2FnZVxyXG4gICAgcmV0LnB1c2goZGVjb2RlZClcclxuICB9XHJcbiAgcmV0dXJuIHJldFxyXG59XHJcblxyXG5BQkkuc2ltcGxlRW5jb2RlID0gZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5zbGljZSgxKVxyXG4gIHZhciBzaWcgPSBwYXJzZVNpZ25hdHVyZShtZXRob2QpXHJcblxyXG4gIC8vIEZJWE1FOiB2YWxpZGF0ZS9jb252ZXJ0IGFyZ3VtZW50c1xyXG4gIGlmIChhcmdzLmxlbmd0aCAhPT0gc2lnLmFyZ3MubGVuZ3RoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IGNvdW50IG1pc21hdGNoJylcclxuICB9XHJcblxyXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KFsgQUJJLm1ldGhvZElEKHNpZy5tZXRob2QsIHNpZy5hcmdzKSwgQUJJLnJhd0VuY29kZShzaWcuYXJncywgYXJncykgXSlcclxufVxyXG5cclxuQUJJLnNpbXBsZURlY29kZSA9IGZ1bmN0aW9uIChtZXRob2QsIGRhdGEpIHtcclxuICB2YXIgc2lnID0gcGFyc2VTaWduYXR1cmUobWV0aG9kKVxyXG5cclxuICAvLyBGSVhNRTogdmFsaWRhdGUvY29udmVydCBhcmd1bWVudHNcclxuICBpZiAoIXNpZy5yZXRhcmdzKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJldHVybiB2YWx1ZXMgaW4gbWV0aG9kJylcclxuICB9XHJcblxyXG4gIHJldHVybiBBQkkucmF3RGVjb2RlKHNpZy5yZXRhcmdzLCBkYXRhKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdHJpbmdpZnkgKHR5cGUsIHZhbHVlKSB7XHJcbiAgaWYgKHR5cGUuc3RhcnRzV2l0aCgnYWRkcmVzcycpIHx8IHR5cGUuc3RhcnRzV2l0aCgnYnl0ZXMnKSkge1xyXG4gICAgcmV0dXJuICcweCcgKyB2YWx1ZS50b1N0cmluZygnaGV4JylcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcclxuICB9XHJcbn1cclxuXHJcbkFCSS5zdHJpbmdpZnkgPSBmdW5jdGlvbiAodHlwZXMsIHZhbHVlcykge1xyXG4gIHZhciByZXQgPSBbXVxyXG5cclxuICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XHJcbiAgICB2YXIgdHlwZSA9IHR5cGVzW2ldXHJcbiAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbaV1cclxuXHJcbiAgICAvLyBpZiBpdCBpcyBhbiBhcnJheSB0eXBlLCBjb25jYXQgdGhlIGl0ZW1zXHJcbiAgICBpZiAoL15bXlxcW10rXFxbLipcXF0kLy50ZXN0KHR5cGUpKSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0eXBlLCBpdGVtKVxyXG4gICAgICB9KS5qb2luKCcsICcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHN0cmluZ2lmeSh0eXBlLCB2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICByZXQucHVzaCh2YWx1ZSlcclxuICB9XHJcblxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuQUJJLnNvbGlkaXR5SGV4VmFsdWUgPSBmdW5jdGlvbiAodHlwZSwgdmFsdWUsIGJpdHNpemUpIHtcclxuICAvLyBwYXNzIGluIGJpdHNpemUgPSBudWxsIGlmIHVzZSBkZWZhdWx0IGJpdHNpemVcclxuICB2YXIgc2l6ZSwgbnVtXHJcbiAgaWYgKGlzQXJyYXkodHlwZSkpIHtcclxuICAgIHZhciBzdWJUeXBlID0gdHlwZS5yZXBsYWNlKC9cXFsuKj9cXF0vLCAnJylcclxuICAgIGlmICghaXNBcnJheShzdWJUeXBlKSkge1xyXG4gICAgICB2YXIgYXJyYXlTaXplID0gcGFyc2VUeXBlQXJyYXkodHlwZSlcclxuICAgICAgaWYgKGFycmF5U2l6ZSAhPT0gJ2R5bmFtaWMnICYmIGFycmF5U2l6ZSAhPT0gMCAmJiB2YWx1ZS5sZW5ndGggPiBhcnJheVNpemUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnRzIGV4Y2VlZCBhcnJheSBzaXplOiAnICsgYXJyYXlTaXplKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgYXJyYXlWYWx1ZXMgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHtcclxuICAgICAgcmV0dXJuIEFCSS5zb2xpZGl0eUhleFZhbHVlKHN1YlR5cGUsIHYsIDI1NilcclxuICAgIH0pXHJcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChhcnJheVZhbHVlcylcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdieXRlcycpIHtcclxuICAgIHJldHVybiB2YWx1ZVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZSwgJ3V0ZjgnKVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Jvb2wnKSB7XHJcbiAgICBiaXRzaXplID0gYml0c2l6ZSB8fCA4XHJcbiAgICB2YXIgcGFkZGluZyA9IEFycmF5KChiaXRzaXplKSAvIDQpLmpvaW4oJzAnKVxyXG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlID8gcGFkZGluZyArICcxJyA6IHBhZGRpbmcgKyAnMCcsICdoZXgnKVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FkZHJlc3MnKSB7XHJcbiAgICB2YXIgYnl0ZXNpemUgPSAyMFxyXG4gICAgaWYgKGJpdHNpemUpIHtcclxuICAgICAgYnl0ZXNpemUgPSBiaXRzaXplIC8gOFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHV0aWxzLnNldExlbmd0aExlZnQodmFsdWUsIGJ5dGVzaXplKVxyXG4gIH0gZWxzZSBpZiAodHlwZS5zdGFydHNXaXRoKCdieXRlcycpKSB7XHJcbiAgICBzaXplID0gcGFyc2VUeXBlTih0eXBlKVxyXG4gICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiAzMikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYnl0ZXM8Tj4gd2lkdGg6ICcgKyBzaXplKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1dGlscy5zZXRMZW5ndGhSaWdodCh2YWx1ZSwgc2l6ZSlcclxuICB9IGVsc2UgaWYgKHR5cGUuc3RhcnRzV2l0aCgndWludCcpKSB7XHJcbiAgICBzaXplID0gcGFyc2VUeXBlTih0eXBlKVxyXG4gICAgaWYgKChzaXplICUgOCkgfHwgKHNpemUgPCA4KSB8fCAoc2l6ZSA+IDI1NikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHVpbnQ8Tj4gd2lkdGg6ICcgKyBzaXplKVxyXG4gICAgfVxyXG5cclxuICAgIG51bSA9IHBhcnNlTnVtYmVyKHZhbHVlKVxyXG4gICAgaWYgKG51bS5iaXRMZW5ndGgoKSA+IHNpemUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwbGllZCB1aW50IGV4Y2VlZHMgd2lkdGg6ICcgKyBzaXplICsgJyB2cyAnICsgbnVtLmJpdExlbmd0aCgpKVxyXG4gICAgfVxyXG5cclxuICAgIGJpdHNpemUgPSBiaXRzaXplIHx8IHNpemVcclxuICAgIHJldHVybiBudW0udG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCBiaXRzaXplIC8gOClcclxuICB9IGVsc2UgaWYgKHR5cGUuc3RhcnRzV2l0aCgnaW50JykpIHtcclxuICAgIHNpemUgPSBwYXJzZVR5cGVOKHR5cGUpXHJcbiAgICBpZiAoKHNpemUgJSA4KSB8fCAoc2l6ZSA8IDgpIHx8IChzaXplID4gMjU2KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50PE4+IHdpZHRoOiAnICsgc2l6ZSlcclxuICAgIH1cclxuXHJcbiAgICBudW0gPSBwYXJzZU51bWJlcih2YWx1ZSlcclxuICAgIGlmIChudW0uYml0TGVuZ3RoKCkgPiBzaXplKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcGxpZWQgaW50IGV4Y2VlZHMgd2lkdGg6ICcgKyBzaXplICsgJyB2cyAnICsgbnVtLmJpdExlbmd0aCgpKVxyXG4gICAgfVxyXG5cclxuICAgIGJpdHNpemUgPSBiaXRzaXplIHx8IHNpemVcclxuICAgIHJldHVybiBudW0udG9Ud29zKHNpemUpLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2JlJywgYml0c2l6ZSAvIDgpXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEZJWE1FOiBzdXBwb3J0IGFsbCBvdGhlciB0eXBlc1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBvciBpbnZhbGlkIHR5cGU6ICcgKyB0eXBlKVxyXG4gIH1cclxufVxyXG5cclxuQUJJLnNvbGlkaXR5UGFjayA9IGZ1bmN0aW9uICh0eXBlcywgdmFsdWVzKSB7XHJcbiAgaWYgKHR5cGVzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOdW1iZXIgb2YgdHlwZXMgYXJlIG5vdCBtYXRjaGluZyB0aGUgdmFsdWVzJylcclxuICB9XHJcblxyXG4gIHZhciByZXQgPSBbXVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdHlwZSA9IGVsZW1lbnRhcnlOYW1lKHR5cGVzW2ldKVxyXG4gICAgdmFyIHZhbHVlID0gdmFsdWVzW2ldXHJcbiAgICByZXQucHVzaChBQkkuc29saWRpdHlIZXhWYWx1ZSh0eXBlLCB2YWx1ZSwgbnVsbCkpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gQnVmZmVyLmNvbmNhdChyZXQpXHJcbn1cclxuXHJcbkFCSS5zb2xpZGl0eVNIQTMgPSBmdW5jdGlvbiAodHlwZXMsIHZhbHVlcykge1xyXG4gIHJldHVybiB1dGlscy5rZWNjYWsyNTYoQUJJLnNvbGlkaXR5UGFjayh0eXBlcywgdmFsdWVzKSlcclxufVxyXG5cclxuQUJJLnNvbGlkaXR5U0hBMjU2ID0gZnVuY3Rpb24gKHR5cGVzLCB2YWx1ZXMpIHtcclxuICByZXR1cm4gdXRpbHMuc2hhMjU2KEFCSS5zb2xpZGl0eVBhY2sodHlwZXMsIHZhbHVlcykpXHJcbn1cclxuXHJcbkFCSS5zb2xpZGl0eVJJUEVNRDE2MCA9IGZ1bmN0aW9uICh0eXBlcywgdmFsdWVzKSB7XHJcbiAgcmV0dXJuIHV0aWxzLnJpcGVtZDE2MChBQkkuc29saWRpdHlQYWNrKHR5cGVzLCB2YWx1ZXMpLCB0cnVlKVxyXG59XHJcblxyXG4vLyBTZXJwZW50J3MgdXNlcnMgYXJlIGZhbWlsaWFyIHdpdGggdGhpcyBlbmNvZGluZ1xyXG4vLyAtIHM6IHN0cmluZ1xyXG4vLyAtIGI6IGJ5dGVzXHJcbi8vIC0gYjxOPjogYnl0ZXM8Tj5cclxuLy8gLSBpOiBpbnQyNTZcclxuLy8gLSBhOiBpbnQyNTZbXVxyXG5cclxuZnVuY3Rpb24gaXNOdW1lcmljIChjKSB7XHJcbiAgLy8gRklYTUU6IGlzIHRoaXMgY29ycmVjdD8gU2VlbXMgdG8gd29ya1xyXG4gIHJldHVybiAoYyA+PSAnMCcpICYmIChjIDw9ICc5JylcclxufVxyXG5cclxuLy8gRm9yIGEgXCJkb2N1bWVudGF0aW9uXCIgcmVmZXIgdG8gaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL3NlcnBlbnQvYmxvYi9kZXZlbG9wL3ByZXByb2Nlc3MuY3BwXHJcbkFCSS5mcm9tU2VycGVudCA9IGZ1bmN0aW9uIChzaWcpIHtcclxuICB2YXIgcmV0ID0gW11cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHR5cGUgPSBzaWdbaV1cclxuICAgIGlmICh0eXBlID09PSAncycpIHtcclxuICAgICAgcmV0LnB1c2goJ2J5dGVzJylcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2InKSB7XHJcbiAgICAgIHZhciB0bXAgPSAnYnl0ZXMnXHJcbiAgICAgIHZhciBqID0gaSArIDFcclxuICAgICAgd2hpbGUgKChqIDwgc2lnLmxlbmd0aCkgJiYgaXNOdW1lcmljKHNpZ1tqXSkpIHtcclxuICAgICAgICB0bXAgKz0gc2lnW2pdIC0gJzAnXHJcbiAgICAgICAgaisrXHJcbiAgICAgIH1cclxuICAgICAgaSA9IGogLSAxXHJcbiAgICAgIHJldC5wdXNoKHRtcClcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2knKSB7XHJcbiAgICAgIHJldC5wdXNoKCdpbnQyNTYnKVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYScpIHtcclxuICAgICAgcmV0LnB1c2goJ2ludDI1NltdJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgb3IgaW52YWxpZCB0eXBlOiAnICsgdHlwZSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJldFxyXG59XHJcblxyXG5BQkkudG9TZXJwZW50ID0gZnVuY3Rpb24gKHR5cGVzKSB7XHJcbiAgdmFyIHJldCA9IFtdXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHR5cGUgPSB0eXBlc1tpXVxyXG4gICAgaWYgKHR5cGUgPT09ICdieXRlcycpIHtcclxuICAgICAgcmV0LnB1c2goJ3MnKVxyXG4gICAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ2J5dGVzJykpIHtcclxuICAgICAgcmV0LnB1c2goJ2InICsgcGFyc2VUeXBlTih0eXBlKSlcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ludDI1NicpIHtcclxuICAgICAgcmV0LnB1c2goJ2knKVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaW50MjU2W10nKSB7XHJcbiAgICAgIHJldC5wdXNoKCdhJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgb3IgaW52YWxpZCB0eXBlOiAnICsgdHlwZSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJldC5qb2luKCcnKVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFCSVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2hhaW5zID0ge1xuICAgIG5hbWVzOiB7XG4gICAgICAgICcxJzogJ21haW5uZXQnLFxuICAgICAgICAnMyc6ICdyb3BzdGVuJyxcbiAgICAgICAgJzQnOiAncmlua2VieScsXG4gICAgICAgICc0Mic6ICdrb3ZhbicsXG4gICAgICAgICc2Mjg0JzogJ2dvZXJsaScsXG4gICAgfSxcbiAgICBtYWlubmV0OiByZXF1aXJlKCcuL21haW5uZXQuanNvbicpLFxuICAgIHJvcHN0ZW46IHJlcXVpcmUoJy4vcm9wc3Rlbi5qc29uJyksXG4gICAgcmlua2VieTogcmVxdWlyZSgnLi9yaW5rZWJ5Lmpzb24nKSxcbiAgICBrb3ZhbjogcmVxdWlyZSgnLi9rb3Zhbi5qc29uJyksXG4gICAgZ29lcmxpOiByZXF1aXJlKCcuL2dvZXJsaS5qc29uJyksXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFV0aWxzXG4gIGZ1bmN0aW9uIGFzc2VydCAodmFsLCBtc2cpIHtcbiAgICBpZiAoIXZhbCkgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnQXNzZXJ0aW9uIGZhaWxlZCcpO1xuICB9XG5cbiAgLy8gQ291bGQgdXNlIGBpbmhlcml0c2AgbW9kdWxlLCBidXQgZG9uJ3Qgd2FudCB0byBtb3ZlIGZyb20gc2luZ2xlIGZpbGVcbiAgLy8gYXJjaGl0ZWN0dXJlIHlldC5cbiAgZnVuY3Rpb24gaW5oZXJpdHMgKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yO1xuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGU7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKTtcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3I7XG4gIH1cblxuICAvLyBCTlxuXG4gIGZ1bmN0aW9uIEJOIChudW1iZXIsIGJhc2UsIGVuZGlhbikge1xuICAgIGlmIChCTi5pc0JOKG51bWJlcikpIHtcbiAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfVxuXG4gICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgdGhpcy53b3JkcyA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuXG4gICAgLy8gUmVkdWN0aW9uIGNvbnRleHRcbiAgICB0aGlzLnJlZCA9IG51bGw7XG5cbiAgICBpZiAobnVtYmVyICE9PSBudWxsKSB7XG4gICAgICBpZiAoYmFzZSA9PT0gJ2xlJyB8fCBiYXNlID09PSAnYmUnKSB7XG4gICAgICAgIGVuZGlhbiA9IGJhc2U7XG4gICAgICAgIGJhc2UgPSAxMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faW5pdChudW1iZXIgfHwgMCwgYmFzZSB8fCAxMCwgZW5kaWFuIHx8ICdiZScpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJOO1xuICB9IGVsc2Uge1xuICAgIGV4cG9ydHMuQk4gPSBCTjtcbiAgfVxuXG4gIEJOLkJOID0gQk47XG4gIEJOLndvcmRTaXplID0gMjY7XG5cbiAgdmFyIEJ1ZmZlcjtcbiAgdHJ5IHtcbiAgICBCdWZmZXIgPSByZXF1aXJlKCdidWYnICsgJ2ZlcicpLkJ1ZmZlcjtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG5cbiAgQk4uaXNCTiA9IGZ1bmN0aW9uIGlzQk4gKG51bSkge1xuICAgIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bSAhPT0gbnVsbCAmJiB0eXBlb2YgbnVtID09PSAnb2JqZWN0JyAmJlxuICAgICAgbnVtLmNvbnN0cnVjdG9yLndvcmRTaXplID09PSBCTi53b3JkU2l6ZSAmJiBBcnJheS5pc0FycmF5KG51bS53b3Jkcyk7XG4gIH07XG5cbiAgQk4ubWF4ID0gZnVuY3Rpb24gbWF4IChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPiAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ubWluID0gZnVuY3Rpb24gbWluIChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPCAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gaW5pdCAobnVtYmVyLCBiYXNlLCBlbmRpYW4pIHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0TnVtYmVyKG51bWJlciwgYmFzZSwgZW5kaWFuKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0QXJyYXkobnVtYmVyLCBiYXNlLCBlbmRpYW4pO1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAnaGV4Jykge1xuICAgICAgYmFzZSA9IDE2O1xuICAgIH1cbiAgICBhc3NlcnQoYmFzZSA9PT0gKGJhc2UgfCAwKSAmJiBiYXNlID49IDIgJiYgYmFzZSA8PSAzNik7XG5cbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGlmIChudW1iZXJbMF0gPT09ICctJykge1xuICAgICAgc3RhcnQrKztcbiAgICB9XG5cbiAgICBpZiAoYmFzZSA9PT0gMTYpIHtcbiAgICAgIHRoaXMuX3BhcnNlSGV4KG51bWJlciwgc3RhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJzZUJhc2UobnVtYmVyLCBiYXNlLCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG51bWJlclswXSA9PT0gJy0nKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnN0cmlwKCk7XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICB0aGlzLl9pbml0QXJyYXkodGhpcy50b0FycmF5KCksIGJhc2UsIGVuZGlhbik7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0TnVtYmVyID0gZnVuY3Rpb24gX2luaXROdW1iZXIgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgbnVtYmVyID0gLW51bWJlcjtcbiAgICB9XG4gICAgaWYgKG51bWJlciA8IDB4NDAwMDAwMCkge1xuICAgICAgdGhpcy53b3JkcyA9IFsgbnVtYmVyICYgMHgzZmZmZmZmIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChudW1iZXIgPCAweDEwMDAwMDAwMDAwMDAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gW1xuICAgICAgICBudW1iZXIgJiAweDNmZmZmZmYsXG4gICAgICAgIChudW1iZXIgLyAweDQwMDAwMDApICYgMHgzZmZmZmZmXG4gICAgICBdO1xuICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQobnVtYmVyIDwgMHgyMDAwMDAwMDAwMDAwMCk7IC8vIDIgXiA1MyAodW5zYWZlKVxuICAgICAgdGhpcy53b3JkcyA9IFtcbiAgICAgICAgbnVtYmVyICYgMHgzZmZmZmZmLFxuICAgICAgICAobnVtYmVyIC8gMHg0MDAwMDAwKSAmIDB4M2ZmZmZmZixcbiAgICAgICAgMVxuICAgICAgXTtcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcbiAgICB9XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICAvLyBSZXZlcnNlIHRoZSBieXRlc1xuICAgIHRoaXMuX2luaXRBcnJheSh0aGlzLnRvQXJyYXkoKSwgYmFzZSwgZW5kaWFuKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2luaXRBcnJheSA9IGZ1bmN0aW9uIF9pbml0QXJyYXkgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgLy8gUGVyaGFwcyBhIFVpbnQ4QXJyYXlcbiAgICBhc3NlcnQodHlwZW9mIG51bWJlci5sZW5ndGggPT09ICdudW1iZXInKTtcbiAgICBpZiAobnVtYmVyLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IE1hdGguY2VpbChudW1iZXIubGVuZ3RoIC8gMyk7XG4gICAgdGhpcy53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICB9XG5cbiAgICB2YXIgaiwgdztcbiAgICB2YXIgb2ZmID0gMDtcbiAgICBpZiAoZW5kaWFuID09PSAnYmUnKSB7XG4gICAgICBmb3IgKGkgPSBudW1iZXIubGVuZ3RoIC0gMSwgaiA9IDA7IGkgPj0gMDsgaSAtPSAzKSB7XG4gICAgICAgIHcgPSBudW1iZXJbaV0gfCAobnVtYmVyW2kgLSAxXSA8PCA4KSB8IChudW1iZXJbaSAtIDJdIDw8IDE2KTtcbiAgICAgICAgdGhpcy53b3Jkc1tqXSB8PSAodyA8PCBvZmYpICYgMHgzZmZmZmZmO1xuICAgICAgICB0aGlzLndvcmRzW2ogKyAxXSA9ICh3ID4+PiAoMjYgLSBvZmYpKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgb2ZmICs9IDI0O1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW5kaWFuID09PSAnbGUnKSB7XG4gICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG51bWJlci5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB3ID0gbnVtYmVyW2ldIHwgKG51bWJlcltpICsgMV0gPDwgOCkgfCAobnVtYmVyW2kgKyAyXSA8PCAxNik7XG4gICAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgdGhpcy53b3Jkc1tqICsgMV0gPSAodyA+Pj4gKDI2IC0gb2ZmKSkgJiAweDNmZmZmZmY7XG4gICAgICAgIG9mZiArPSAyNDtcbiAgICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICAgIG9mZiAtPSAyNjtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXJzZUhleCAoc3RyLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSAwO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihzdHIubGVuZ3RoLCBlbmQpO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpIC0gNDg7XG5cbiAgICAgIHIgPDw9IDQ7XG5cbiAgICAgIC8vICdhJyAtICdmJ1xuICAgICAgaWYgKGMgPj0gNDkgJiYgYyA8PSA1NCkge1xuICAgICAgICByIHw9IGMgLSA0OSArIDB4YTtcblxuICAgICAgLy8gJ0EnIC0gJ0YnXG4gICAgICB9IGVsc2UgaWYgKGMgPj0gMTcgJiYgYyA8PSAyMikge1xuICAgICAgICByIHw9IGMgLSAxNyArIDB4YTtcblxuICAgICAgLy8gJzAnIC0gJzknXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByIHw9IGMgJiAweGY7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl9wYXJzZUhleCA9IGZ1bmN0aW9uIF9wYXJzZUhleCAobnVtYmVyLCBzdGFydCkge1xuICAgIC8vIENyZWF0ZSBwb3NzaWJseSBiaWdnZXIgYXJyYXkgdG8gZW5zdXJlIHRoYXQgaXQgZml0cyB0aGUgbnVtYmVyXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLmNlaWwoKG51bWJlci5sZW5ndGggLSBzdGFydCkgLyA2KTtcbiAgICB0aGlzLndvcmRzID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSAwO1xuICAgIH1cblxuICAgIHZhciBqLCB3O1xuICAgIC8vIFNjYW4gMjQtYml0IGNodW5rcyBhbmQgYWRkIHRoZW0gdG8gdGhlIG51bWJlclxuICAgIHZhciBvZmYgPSAwO1xuICAgIGZvciAoaSA9IG51bWJlci5sZW5ndGggLSA2LCBqID0gMDsgaSA+PSBzdGFydDsgaSAtPSA2KSB7XG4gICAgICB3ID0gcGFyc2VIZXgobnVtYmVyLCBpLCBpICsgNik7XG4gICAgICB0aGlzLndvcmRzW2pdIHw9ICh3IDw8IG9mZikgJiAweDNmZmZmZmY7XG4gICAgICAvLyBOT1RFOiBgMHgzZmZmZmZgIGlzIGludGVudGlvbmFsIGhlcmUsIDI2Yml0cyBtYXggc2hpZnQgKyAyNGJpdCBoZXggbGltYlxuICAgICAgdGhpcy53b3Jkc1tqICsgMV0gfD0gdyA+Pj4gKDI2IC0gb2ZmKSAmIDB4M2ZmZmZmO1xuICAgICAgb2ZmICs9IDI0O1xuICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICBvZmYgLT0gMjY7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGkgKyA2ICE9PSBzdGFydCkge1xuICAgICAgdyA9IHBhcnNlSGV4KG51bWJlciwgc3RhcnQsIGkgKyA2KTtcbiAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaiArIDFdIHw9IHcgPj4+ICgyNiAtIG9mZikgJiAweDNmZmZmZjtcbiAgICB9XG4gICAgdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHBhcnNlQmFzZSAoc3RyLCBzdGFydCwgZW5kLCBtdWwpIHtcbiAgICB2YXIgciA9IDA7XG4gICAgdmFyIGxlbiA9IE1hdGgubWluKHN0ci5sZW5ndGgsIGVuZCk7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSkgLSA0ODtcblxuICAgICAgciAqPSBtdWw7XG5cbiAgICAgIC8vICdhJ1xuICAgICAgaWYgKGMgPj0gNDkpIHtcbiAgICAgICAgciArPSBjIC0gNDkgKyAweGE7XG5cbiAgICAgIC8vICdBJ1xuICAgICAgfSBlbHNlIGlmIChjID49IDE3KSB7XG4gICAgICAgIHIgKz0gYyAtIDE3ICsgMHhhO1xuXG4gICAgICAvLyAnMCcgLSAnOSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHIgKz0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICBCTi5wcm90b3R5cGUuX3BhcnNlQmFzZSA9IGZ1bmN0aW9uIF9wYXJzZUJhc2UgKG51bWJlciwgYmFzZSwgc3RhcnQpIHtcbiAgICAvLyBJbml0aWFsaXplIGFzIHplcm9cbiAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgdGhpcy5sZW5ndGggPSAxO1xuXG4gICAgLy8gRmluZCBsZW5ndGggb2YgbGltYiBpbiBiYXNlXG4gICAgZm9yICh2YXIgbGltYkxlbiA9IDAsIGxpbWJQb3cgPSAxOyBsaW1iUG93IDw9IDB4M2ZmZmZmZjsgbGltYlBvdyAqPSBiYXNlKSB7XG4gICAgICBsaW1iTGVuKys7XG4gICAgfVxuICAgIGxpbWJMZW4tLTtcbiAgICBsaW1iUG93ID0gKGxpbWJQb3cgLyBiYXNlKSB8IDA7XG5cbiAgICB2YXIgdG90YWwgPSBudW1iZXIubGVuZ3RoIC0gc3RhcnQ7XG4gICAgdmFyIG1vZCA9IHRvdGFsICUgbGltYkxlbjtcbiAgICB2YXIgZW5kID0gTWF0aC5taW4odG90YWwsIHRvdGFsIC0gbW9kKSArIHN0YXJ0O1xuXG4gICAgdmFyIHdvcmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBsaW1iTGVuKSB7XG4gICAgICB3b3JkID0gcGFyc2VCYXNlKG51bWJlciwgaSwgaSArIGxpbWJMZW4sIGJhc2UpO1xuXG4gICAgICB0aGlzLmltdWxuKGxpbWJQb3cpO1xuICAgICAgaWYgKHRoaXMud29yZHNbMF0gKyB3b3JkIDwgMHg0MDAwMDAwKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gKz0gd29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lhZGRuKHdvcmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb2QgIT09IDApIHtcbiAgICAgIHZhciBwb3cgPSAxO1xuICAgICAgd29yZCA9IHBhcnNlQmFzZShudW1iZXIsIGksIG51bWJlci5sZW5ndGgsIGJhc2UpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbW9kOyBpKyspIHtcbiAgICAgICAgcG93ICo9IGJhc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW11bG4ocG93KTtcbiAgICAgIGlmICh0aGlzLndvcmRzWzBdICsgd29yZCA8IDB4NDAwMDAwMCkge1xuICAgICAgICB0aGlzLndvcmRzWzBdICs9IHdvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pYWRkbih3b3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5IChkZXN0KSB7XG4gICAgZGVzdC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXN0LndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXTtcbiAgICB9XG4gICAgZGVzdC5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBkZXN0Lm5lZ2F0aXZlID0gdGhpcy5uZWdhdGl2ZTtcbiAgICBkZXN0LnJlZCA9IHRoaXMucmVkO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICB2YXIgciA9IG5ldyBCTihudWxsKTtcbiAgICB0aGlzLmNvcHkocik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9leHBhbmQgPSBmdW5jdGlvbiBfZXhwYW5kIChzaXplKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgc2l6ZSkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBsZWFkaW5nIGAwYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3RyaXAgPSBmdW5jdGlvbiBzdHJpcCAoKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoID4gMSAmJiB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5fbm9ybVNpZ24gPSBmdW5jdGlvbiBfbm9ybVNpZ24gKCkge1xuICAgIC8vIC0wID0gMFxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICByZXR1cm4gKHRoaXMucmVkID8gJzxCTi1SOiAnIDogJzxCTjogJykgKyB0aGlzLnRvU3RyaW5nKDE2KSArICc+JztcbiAgfTtcblxuICAvKlxuXG4gIHZhciB6ZXJvcyA9IFtdO1xuICB2YXIgZ3JvdXBTaXplcyA9IFtdO1xuICB2YXIgZ3JvdXBCYXNlcyA9IFtdO1xuXG4gIHZhciBzID0gJyc7XG4gIHZhciBpID0gLTE7XG4gIHdoaWxlICgrK2kgPCBCTi53b3JkU2l6ZSkge1xuICAgIHplcm9zW2ldID0gcztcbiAgICBzICs9ICcwJztcbiAgfVxuICBncm91cFNpemVzWzBdID0gMDtcbiAgZ3JvdXBTaXplc1sxXSA9IDA7XG4gIGdyb3VwQmFzZXNbMF0gPSAwO1xuICBncm91cEJhc2VzWzFdID0gMDtcbiAgdmFyIGJhc2UgPSAyIC0gMTtcbiAgd2hpbGUgKCsrYmFzZSA8IDM2ICsgMSkge1xuICAgIHZhciBncm91cFNpemUgPSAwO1xuICAgIHZhciBncm91cEJhc2UgPSAxO1xuICAgIHdoaWxlIChncm91cEJhc2UgPCAoMSA8PCBCTi53b3JkU2l6ZSkgLyBiYXNlKSB7XG4gICAgICBncm91cEJhc2UgKj0gYmFzZTtcbiAgICAgIGdyb3VwU2l6ZSArPSAxO1xuICAgIH1cbiAgICBncm91cFNpemVzW2Jhc2VdID0gZ3JvdXBTaXplO1xuICAgIGdyb3VwQmFzZXNbYmFzZV0gPSBncm91cEJhc2U7XG4gIH1cblxuICAqL1xuXG4gIHZhciB6ZXJvcyA9IFtcbiAgICAnJyxcbiAgICAnMCcsXG4gICAgJzAwJyxcbiAgICAnMDAwJyxcbiAgICAnMDAwMCcsXG4gICAgJzAwMDAwJyxcbiAgICAnMDAwMDAwJyxcbiAgICAnMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCdcbiAgXTtcblxuICB2YXIgZ3JvdXBTaXplcyA9IFtcbiAgICAwLCAwLFxuICAgIDI1LCAxNiwgMTIsIDExLCAxMCwgOSwgOCxcbiAgICA4LCA3LCA3LCA3LCA3LCA2LCA2LFxuICAgIDYsIDYsIDYsIDYsIDYsIDUsIDUsXG4gICAgNSwgNSwgNSwgNSwgNSwgNSwgNSxcbiAgICA1LCA1LCA1LCA1LCA1LCA1LCA1XG4gIF07XG5cbiAgdmFyIGdyb3VwQmFzZXMgPSBbXG4gICAgMCwgMCxcbiAgICAzMzU1NDQzMiwgNDMwNDY3MjEsIDE2Nzc3MjE2LCA0ODgyODEyNSwgNjA0NjYxNzYsIDQwMzUzNjA3LCAxNjc3NzIxNixcbiAgICA0MzA0NjcyMSwgMTAwMDAwMDAsIDE5NDg3MTcxLCAzNTgzMTgwOCwgNjI3NDg1MTcsIDc1Mjk1MzYsIDExMzkwNjI1LFxuICAgIDE2Nzc3MjE2LCAyNDEzNzU2OSwgMzQwMTIyMjQsIDQ3MDQ1ODgxLCA2NDAwMDAwMCwgNDA4NDEwMSwgNTE1MzYzMixcbiAgICA2NDM2MzQzLCA3OTYyNjI0LCA5NzY1NjI1LCAxMTg4MTM3NiwgMTQzNDg5MDcsIDE3MjEwMzY4LCAyMDUxMTE0OSxcbiAgICAyNDMwMDAwMCwgMjg2MjkxNTEsIDMzNTU0NDMyLCAzOTEzNTM5MywgNDU0MzU0MjQsIDUyNTIxODc1LCA2MDQ2NjE3NlxuICBdO1xuXG4gIEJOLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nIChiYXNlLCBwYWRkaW5nKSB7XG4gICAgYmFzZSA9IGJhc2UgfHwgMTA7XG4gICAgcGFkZGluZyA9IHBhZGRpbmcgfCAwIHx8IDE7XG5cbiAgICB2YXIgb3V0O1xuICAgIGlmIChiYXNlID09PSAxNiB8fCBiYXNlID09PSAnaGV4Jykge1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgb2ZmID0gMDtcbiAgICAgIHZhciBjYXJyeSA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHcgPSB0aGlzLndvcmRzW2ldO1xuICAgICAgICB2YXIgd29yZCA9ICgoKHcgPDwgb2ZmKSB8IGNhcnJ5KSAmIDB4ZmZmZmZmKS50b1N0cmluZygxNik7XG4gICAgICAgIGNhcnJ5ID0gKHcgPj4+ICgyNCAtIG9mZikpICYgMHhmZmZmZmY7XG4gICAgICAgIGlmIChjYXJyeSAhPT0gMCB8fCBpICE9PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBvdXQgPSB6ZXJvc1s2IC0gd29yZC5sZW5ndGhdICsgd29yZCArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSB3b3JkICsgb3V0O1xuICAgICAgICB9XG4gICAgICAgIG9mZiArPSAyO1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICAgIG91dCA9IGNhcnJ5LnRvU3RyaW5nKDE2KSArIG91dDtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChvdXQubGVuZ3RoICUgcGFkZGluZyAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnLScgKyBvdXQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAoYmFzZSB8IDApICYmIGJhc2UgPj0gMiAmJiBiYXNlIDw9IDM2KSB7XG4gICAgICAvLyB2YXIgZ3JvdXBTaXplID0gTWF0aC5mbG9vcihCTi53b3JkU2l6ZSAqIE1hdGguTE4yIC8gTWF0aC5sb2coYmFzZSkpO1xuICAgICAgdmFyIGdyb3VwU2l6ZSA9IGdyb3VwU2l6ZXNbYmFzZV07XG4gICAgICAvLyB2YXIgZ3JvdXBCYXNlID0gTWF0aC5wb3coYmFzZSwgZ3JvdXBTaXplKTtcbiAgICAgIHZhciBncm91cEJhc2UgPSBncm91cEJhc2VzW2Jhc2VdO1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgYyA9IHRoaXMuY2xvbmUoKTtcbiAgICAgIGMubmVnYXRpdmUgPSAwO1xuICAgICAgd2hpbGUgKCFjLmlzWmVybygpKSB7XG4gICAgICAgIHZhciByID0gYy5tb2RuKGdyb3VwQmFzZSkudG9TdHJpbmcoYmFzZSk7XG4gICAgICAgIGMgPSBjLmlkaXZuKGdyb3VwQmFzZSk7XG5cbiAgICAgICAgaWYgKCFjLmlzWmVybygpKSB7XG4gICAgICAgICAgb3V0ID0gemVyb3NbZ3JvdXBTaXplIC0gci5sZW5ndGhdICsgciArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSByICsgb3V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1plcm8oKSkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICB3aGlsZSAob3V0Lmxlbmd0aCAlIHBhZGRpbmcgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJzAnICsgb3V0O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJy0nICsgb3V0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBhc3NlcnQoZmFsc2UsICdCYXNlIHNob3VsZCBiZSBiZXR3ZWVuIDIgYW5kIDM2Jyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIgKCkge1xuICAgIHZhciByZXQgPSB0aGlzLndvcmRzWzBdO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0ICs9IHRoaXMud29yZHNbMV0gKiAweDQwMDAwMDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PT0gMyAmJiB0aGlzLndvcmRzWzJdID09PSAweDAxKSB7XG4gICAgICAvLyBOT1RFOiBhdCB0aGlzIHN0YWdlIGl0IGlzIGtub3duIHRoYXQgdGhlIHRvcCBiaXQgaXMgc2V0XG4gICAgICByZXQgKz0gMHgxMDAwMDAwMDAwMDAwMCArICh0aGlzLndvcmRzWzFdICogMHg0MDAwMDAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMikge1xuICAgICAgYXNzZXJ0KGZhbHNlLCAnTnVtYmVyIGNhbiBvbmx5IHNhZmVseSBzdG9yZSB1cCB0byA1MyBiaXRzJyk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgPyAtcmV0IDogcmV0O1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKDE2KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudG9CdWZmZXIgPSBmdW5jdGlvbiB0b0J1ZmZlciAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpO1xuICAgIHJldHVybiB0aGlzLnRvQXJyYXlMaWtlKEJ1ZmZlciwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcy50b0FycmF5TGlrZShBcnJheSwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5TGlrZSA9IGZ1bmN0aW9uIHRvQXJyYXlMaWtlIChBcnJheVR5cGUsIGVuZGlhbiwgbGVuZ3RoKSB7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSB0aGlzLmJ5dGVMZW5ndGgoKTtcbiAgICB2YXIgcmVxTGVuZ3RoID0gbGVuZ3RoIHx8IE1hdGgubWF4KDEsIGJ5dGVMZW5ndGgpO1xuICAgIGFzc2VydChieXRlTGVuZ3RoIDw9IHJlcUxlbmd0aCwgJ2J5dGUgYXJyYXkgbG9uZ2VyIHRoYW4gZGVzaXJlZCBsZW5ndGgnKTtcbiAgICBhc3NlcnQocmVxTGVuZ3RoID4gMCwgJ1JlcXVlc3RlZCBhcnJheSBsZW5ndGggPD0gMCcpO1xuXG4gICAgdGhpcy5zdHJpcCgpO1xuICAgIHZhciBsaXR0bGVFbmRpYW4gPSBlbmRpYW4gPT09ICdsZSc7XG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheVR5cGUocmVxTGVuZ3RoKTtcblxuICAgIHZhciBiLCBpO1xuICAgIHZhciBxID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmICghbGl0dGxlRW5kaWFuKSB7XG4gICAgICAvLyBBc3N1bWUgYmlnLWVuZGlhblxuICAgICAgZm9yIChpID0gMDsgaSA8IHJlcUxlbmd0aCAtIGJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyAhcS5pc1plcm8oKTsgaSsrKSB7XG4gICAgICAgIGIgPSBxLmFuZGxuKDB4ZmYpO1xuICAgICAgICBxLml1c2hybig4KTtcblxuICAgICAgICByZXNbcmVxTGVuZ3RoIC0gaSAtIDFdID0gYjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgIXEuaXNaZXJvKCk7IGkrKykge1xuICAgICAgICBiID0gcS5hbmRsbigweGZmKTtcbiAgICAgICAgcS5pdXNocm4oOCk7XG5cbiAgICAgICAgcmVzW2ldID0gYjtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGkgPCByZXFMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgaWYgKE1hdGguY2x6MzIpIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHJldHVybiAzMiAtIE1hdGguY2x6MzIodyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHZhciB0ID0gdztcbiAgICAgIHZhciByID0gMDtcbiAgICAgIGlmICh0ID49IDB4MTAwMCkge1xuICAgICAgICByICs9IDEzO1xuICAgICAgICB0ID4+Pj0gMTM7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDQwKSB7XG4gICAgICAgIHIgKz0gNztcbiAgICAgICAgdCA+Pj49IDc7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDgpIHtcbiAgICAgICAgciArPSA0O1xuICAgICAgICB0ID4+Pj0gNDtcbiAgICAgIH1cbiAgICAgIGlmICh0ID49IDB4MDIpIHtcbiAgICAgICAgciArPSAyO1xuICAgICAgICB0ID4+Pj0gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByICsgdDtcbiAgICB9O1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl96ZXJvQml0cyA9IGZ1bmN0aW9uIF96ZXJvQml0cyAodykge1xuICAgIC8vIFNob3J0LWN1dFxuICAgIGlmICh3ID09PSAwKSByZXR1cm4gMjY7XG5cbiAgICB2YXIgdCA9IHc7XG4gICAgdmFyIHIgPSAwO1xuICAgIGlmICgodCAmIDB4MWZmZikgPT09IDApIHtcbiAgICAgIHIgKz0gMTM7XG4gICAgICB0ID4+Pj0gMTM7XG4gICAgfVxuICAgIGlmICgodCAmIDB4N2YpID09PSAwKSB7XG4gICAgICByICs9IDc7XG4gICAgICB0ID4+Pj0gNztcbiAgICB9XG4gICAgaWYgKCh0ICYgMHhmKSA9PT0gMCkge1xuICAgICAgciArPSA0O1xuICAgICAgdCA+Pj49IDQ7XG4gICAgfVxuICAgIGlmICgodCAmIDB4MykgPT09IDApIHtcbiAgICAgIHIgKz0gMjtcbiAgICAgIHQgPj4+PSAyO1xuICAgIH1cbiAgICBpZiAoKHQgJiAweDEpID09PSAwKSB7XG4gICAgICByKys7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIC8vIFJldHVybiBudW1iZXIgb2YgdXNlZCBiaXRzIGluIGEgQk5cbiAgQk4ucHJvdG90eXBlLmJpdExlbmd0aCA9IGZ1bmN0aW9uIGJpdExlbmd0aCAoKSB7XG4gICAgdmFyIHcgPSB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIGhpID0gdGhpcy5fY291bnRCaXRzKHcpO1xuICAgIHJldHVybiAodGhpcy5sZW5ndGggLSAxKSAqIDI2ICsgaGk7XG4gIH07XG5cbiAgZnVuY3Rpb24gdG9CaXRBcnJheSAobnVtKSB7XG4gICAgdmFyIHcgPSBuZXcgQXJyYXkobnVtLmJpdExlbmd0aCgpKTtcblxuICAgIGZvciAodmFyIGJpdCA9IDA7IGJpdCA8IHcubGVuZ3RoOyBiaXQrKykge1xuICAgICAgdmFyIG9mZiA9IChiaXQgLyAyNikgfCAwO1xuICAgICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgICAgd1tiaXRdID0gKG51bS53b3Jkc1tvZmZdICYgKDEgPDwgd2JpdCkpID4+PiB3Yml0O1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9XG5cbiAgLy8gTnVtYmVyIG9mIHRyYWlsaW5nIHplcm8gYml0c1xuICBCTi5wcm90b3R5cGUuemVyb0JpdHMgPSBmdW5jdGlvbiB6ZXJvQml0cyAoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpIHJldHVybiAwO1xuXG4gICAgdmFyIHIgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGIgPSB0aGlzLl96ZXJvQml0cyh0aGlzLndvcmRzW2ldKTtcbiAgICAgIHIgKz0gYjtcbiAgICAgIGlmIChiICE9PSAyNikgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gYnl0ZUxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmJpdExlbmd0aCgpIC8gOCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvVHdvcyA9IGZ1bmN0aW9uIHRvVHdvcyAod2lkdGgpIHtcbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWJzKCkuaW5vdG4od2lkdGgpLmlhZGRuKDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tVHdvcyA9IGZ1bmN0aW9uIGZyb21Ud29zICh3aWR0aCkge1xuICAgIGlmICh0aGlzLnRlc3RuKHdpZHRoIC0gMSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdG4od2lkdGgpLmlhZGRuKDEpLmluZWcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaXNOZWcgPSBmdW5jdGlvbiBpc05lZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubmVnYXRpdmUgIT09IDA7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG5lZ2F0aXZlIGNsb25lIG9mIGB0aGlzYFxuICBCTi5wcm90b3R5cGUubmVnID0gZnVuY3Rpb24gbmVnICgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmluZWcoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaW5lZyA9IGZ1bmN0aW9uIGluZWcgKCkge1xuICAgIGlmICghdGhpcy5pc1plcm8oKSkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSBePSAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdW9yID0gZnVuY3Rpb24gaXVvciAobnVtKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgbnVtLmxlbmd0aCkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldIHwgbnVtLndvcmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlvciA9IGZ1bmN0aW9uIGlvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXVvcihudW0pO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlvcihudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pb3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVvciA9IGZ1bmN0aW9uIHVvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdW9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1b3IodGhpcyk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdWFuZCA9IGZ1bmN0aW9uIGl1YW5kIChudW0pIHtcbiAgICAvLyBiID0gbWluLWxlbmd0aChudW0sIHRoaXMpXG4gICAgdmFyIGI7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkge1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYiA9IHRoaXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXSAmIG51bS53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IGIubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaWFuZCA9IGZ1bmN0aW9uIGlhbmQgKG51bSkge1xuICAgIGFzc2VydCgodGhpcy5uZWdhdGl2ZSB8IG51bS5uZWdhdGl2ZSkgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1YW5kKG51bSk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQgKG51bSkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHJldHVybiB0aGlzLmNsb25lKCkuaWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYW5kKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS51YW5kID0gZnVuY3Rpb24gdWFuZCAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pdWFuZCh0aGlzKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLml1eG9yID0gZnVuY3Rpb24gaXV4b3IgKG51bSkge1xuICAgIC8vIGEubGVuZ3RoID4gYi5sZW5ndGhcbiAgICB2YXIgYTtcbiAgICB2YXIgYjtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSB7XG4gICAgICBhID0gdGhpcztcbiAgICAgIGIgPSBudW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBudW07XG4gICAgICBiID0gdGhpcztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldIF4gYi53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcyAhPT0gYSkge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5peG9yID0gZnVuY3Rpb24gaXhvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXV4b3IobnVtKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5peG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml4b3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnV4b3IgPSBmdW5jdGlvbiB1eG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLml1eG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1eG9yKHRoaXMpO1xuICB9O1xuXG4gIC8vIE5vdCBgYHRoaXNgYCB3aXRoIGBgd2lkdGhgYCBiaXR3aWR0aFxuICBCTi5wcm90b3R5cGUuaW5vdG4gPSBmdW5jdGlvbiBpbm90biAod2lkdGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIHdpZHRoID09PSAnbnVtYmVyJyAmJiB3aWR0aCA+PSAwKTtcblxuICAgIHZhciBieXRlc05lZWRlZCA9IE1hdGguY2VpbCh3aWR0aCAvIDI2KSB8IDA7XG4gICAgdmFyIGJpdHNMZWZ0ID0gd2lkdGggJSAyNjtcblxuICAgIC8vIEV4dGVuZCB0aGUgYnVmZmVyIHdpdGggbGVhZGluZyB6ZXJvZXNcbiAgICB0aGlzLl9leHBhbmQoYnl0ZXNOZWVkZWQpO1xuXG4gICAgaWYgKGJpdHNMZWZ0ID4gMCkge1xuICAgICAgYnl0ZXNOZWVkZWQtLTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgY29tcGxldGUgd29yZHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzTmVlZGVkOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB+dGhpcy53b3Jkc1tpXSAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIHJlc2lkdWVcbiAgICBpZiAoYml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gfnRoaXMud29yZHNbaV0gJiAoMHgzZmZmZmZmID4+ICgyNiAtIGJpdHNMZWZ0KSk7XG4gICAgfVxuXG4gICAgLy8gQW5kIHJlbW92ZSBsZWFkaW5nIHplcm9lc1xuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm5vdG4gPSBmdW5jdGlvbiBub3RuICh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW5vdG4od2lkdGgpO1xuICB9O1xuXG4gIC8vIFNldCBgYml0YCBvZiBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnNldG4gPSBmdW5jdGlvbiBzZXRuIChiaXQsIHZhbCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0ID09PSAnbnVtYmVyJyAmJiBiaXQgPj0gMCk7XG5cbiAgICB2YXIgb2ZmID0gKGJpdCAvIDI2KSB8IDA7XG4gICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgIHRoaXMuX2V4cGFuZChvZmYgKyAxKTtcblxuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMud29yZHNbb2ZmXSA9IHRoaXMud29yZHNbb2ZmXSB8ICgxIDw8IHdiaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndvcmRzW29mZl0gPSB0aGlzLndvcmRzW29mZl0gJiB+KDEgPDwgd2JpdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBBZGQgYG51bWAgdG8gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pYWRkID0gZnVuY3Rpb24gaWFkZCAobnVtKSB7XG4gICAgdmFyIHI7XG5cbiAgICAvLyBuZWdhdGl2ZSArIHBvc2l0aXZlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHIgPSB0aGlzLmlzdWIobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgXj0gMTtcbiAgICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuXG4gICAgLy8gcG9zaXRpdmUgKyBuZWdhdGl2ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByID0gdGhpcy5pc3ViKG51bSk7XG4gICAgICBudW0ubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHIuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gYS5sZW5ndGggPiBiLmxlbmd0aFxuICAgIHZhciBhLCBiO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgICAgY2FycnkgPSByID4+PiAyNjtcbiAgICB9XG4gICAgZm9yICg7IGNhcnJ5ICE9PSAwICYmIGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIGNhcnJ5O1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IHIgJiAweDNmZmZmZmY7XG4gICAgICBjYXJyeSA9IHIgPj4+IDI2O1xuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoXSA9IGNhcnJ5O1xuICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAvLyBDb3B5IHRoZSByZXN0IG9mIHRoZSB3b3Jkc1xuICAgIH0gZWxzZSBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEFkZCBgbnVtYCB0byBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAobnVtKSB7XG4gICAgdmFyIHJlcztcbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwICYmIHRoaXMubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByZXMgPSB0aGlzLnN1YihudW0pO1xuICAgICAgbnVtLm5lZ2F0aXZlIF49IDE7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAobnVtLm5lZ2F0aXZlID09PSAwICYmIHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgcmVzID0gbnVtLnN1Yih0aGlzKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGQobnVtKTtcblxuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYWRkKHRoaXMpO1xuICB9O1xuXG4gIC8vIFN1YnRyYWN0IGBudW1gIGZyb20gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pc3ViID0gZnVuY3Rpb24gaXN1YiAobnVtKSB7XG4gICAgLy8gdGhpcyAtICgtbnVtKSA9IHRoaXMgKyBudW1cbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICBudW0ubmVnYXRpdmUgPSAwO1xuICAgICAgdmFyIHIgPSB0aGlzLmlhZGQobnVtKTtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gci5fbm9ybVNpZ24oKTtcblxuICAgIC8vIC10aGlzIC0gbnVtID0gLSh0aGlzICsgbnVtKVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmlhZGQobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXMuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCBib3RoIG51bWJlcnMgYXJlIHBvc2l0aXZlXG4gICAgdmFyIGNtcCA9IHRoaXMuY21wKG51bSk7XG5cbiAgICAvLyBPcHRpbWl6YXRpb24gLSB6ZXJvaWZ5XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGEgPiBiXG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGNtcCA+IDApIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSAtIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gciA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICBmb3IgKDsgY2FycnkgIT09IDAgJiYgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHIgPSAoYS53b3Jkc1tpXSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHIgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2ldID0gciAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBDb3B5IHJlc3Qgb2YgdGhlIHdvcmRzXG4gICAgaWYgKGNhcnJ5ID09PSAwICYmIGkgPCBhLmxlbmd0aCAmJiBhICE9PSB0aGlzKSB7XG4gICAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGEud29yZHNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSk7XG5cbiAgICBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBTdWJ0cmFjdCBgbnVtYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWIobnVtKTtcbiAgfTtcblxuICBmdW5jdGlvbiBzbWFsbE11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgdmFyIGxlbiA9IChzZWxmLmxlbmd0aCArIG51bS5sZW5ndGgpIHwgMDtcbiAgICBvdXQubGVuZ3RoID0gbGVuO1xuICAgIGxlbiA9IChsZW4gLSAxKSB8IDA7XG5cbiAgICAvLyBQZWVsIG9uZSBpdGVyYXRpb24gKGNvbXBpbGVyIGNhbid0IGRvIGl0LCBiZWNhdXNlIG9mIGNvZGUgY29tcGxleGl0eSlcbiAgICB2YXIgYSA9IHNlbGYud29yZHNbMF0gfCAwO1xuICAgIHZhciBiID0gbnVtLndvcmRzWzBdIHwgMDtcbiAgICB2YXIgciA9IGEgKiBiO1xuXG4gICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICB2YXIgY2FycnkgPSAociAvIDB4NDAwMDAwMCkgfCAwO1xuICAgIG91dC53b3Jkc1swXSA9IGxvO1xuXG4gICAgZm9yICh2YXIgayA9IDE7IGsgPCBsZW47IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBjYXJyeSA+Pj4gMjY7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IChrIC0gaikgfCAwO1xuICAgICAgICBhID0gc2VsZi53b3Jkc1tpXSB8IDA7XG4gICAgICAgIGIgPSBudW0ud29yZHNbal0gfCAwO1xuICAgICAgICByID0gYSAqIGIgKyByd29yZDtcbiAgICAgICAgbmNhcnJ5ICs9IChyIC8gMHg0MDAwMDAwKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkIHwgMDtcbiAgICAgIGNhcnJ5ID0gbmNhcnJ5IHwgMDtcbiAgICB9XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICBvdXQud29yZHNba10gPSBjYXJyeSB8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5sZW5ndGgtLTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LnN0cmlwKCk7XG4gIH1cblxuICAvLyBUT0RPKGluZHV0bnkpOiBpdCBtYXkgYmUgcmVhc29uYWJsZSB0byBvbWl0IGl0IGZvciB1c2VycyB3aG8gZG9uJ3QgbmVlZFxuICAvLyB0byB3b3JrIHdpdGggMjU2LWJpdCBudW1iZXJzLCBvdGhlcndpc2UgaXQgZ2l2ZXMgMjAlIGltcHJvdmVtZW50IGZvciAyNTYtYml0XG4gIC8vIG11bHRpcGxpY2F0aW9uIChsaWtlIGVsbGlwdGljIHNlY3AyNTZrMSkuXG4gIHZhciBjb21iMTBNdWxUbyA9IGZ1bmN0aW9uIGNvbWIxME11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIHZhciBhID0gc2VsZi53b3JkcztcbiAgICB2YXIgYiA9IG51bS53b3JkcztcbiAgICB2YXIgbyA9IG91dC53b3JkcztcbiAgICB2YXIgYyA9IDA7XG4gICAgdmFyIGxvO1xuICAgIHZhciBtaWQ7XG4gICAgdmFyIGhpO1xuICAgIHZhciBhMCA9IGFbMF0gfCAwO1xuICAgIHZhciBhbDAgPSBhMCAmIDB4MWZmZjtcbiAgICB2YXIgYWgwID0gYTAgPj4+IDEzO1xuICAgIHZhciBhMSA9IGFbMV0gfCAwO1xuICAgIHZhciBhbDEgPSBhMSAmIDB4MWZmZjtcbiAgICB2YXIgYWgxID0gYTEgPj4+IDEzO1xuICAgIHZhciBhMiA9IGFbMl0gfCAwO1xuICAgIHZhciBhbDIgPSBhMiAmIDB4MWZmZjtcbiAgICB2YXIgYWgyID0gYTIgPj4+IDEzO1xuICAgIHZhciBhMyA9IGFbM10gfCAwO1xuICAgIHZhciBhbDMgPSBhMyAmIDB4MWZmZjtcbiAgICB2YXIgYWgzID0gYTMgPj4+IDEzO1xuICAgIHZhciBhNCA9IGFbNF0gfCAwO1xuICAgIHZhciBhbDQgPSBhNCAmIDB4MWZmZjtcbiAgICB2YXIgYWg0ID0gYTQgPj4+IDEzO1xuICAgIHZhciBhNSA9IGFbNV0gfCAwO1xuICAgIHZhciBhbDUgPSBhNSAmIDB4MWZmZjtcbiAgICB2YXIgYWg1ID0gYTUgPj4+IDEzO1xuICAgIHZhciBhNiA9IGFbNl0gfCAwO1xuICAgIHZhciBhbDYgPSBhNiAmIDB4MWZmZjtcbiAgICB2YXIgYWg2ID0gYTYgPj4+IDEzO1xuICAgIHZhciBhNyA9IGFbN10gfCAwO1xuICAgIHZhciBhbDcgPSBhNyAmIDB4MWZmZjtcbiAgICB2YXIgYWg3ID0gYTcgPj4+IDEzO1xuICAgIHZhciBhOCA9IGFbOF0gfCAwO1xuICAgIHZhciBhbDggPSBhOCAmIDB4MWZmZjtcbiAgICB2YXIgYWg4ID0gYTggPj4+IDEzO1xuICAgIHZhciBhOSA9IGFbOV0gfCAwO1xuICAgIHZhciBhbDkgPSBhOSAmIDB4MWZmZjtcbiAgICB2YXIgYWg5ID0gYTkgPj4+IDEzO1xuICAgIHZhciBiMCA9IGJbMF0gfCAwO1xuICAgIHZhciBibDAgPSBiMCAmIDB4MWZmZjtcbiAgICB2YXIgYmgwID0gYjAgPj4+IDEzO1xuICAgIHZhciBiMSA9IGJbMV0gfCAwO1xuICAgIHZhciBibDEgPSBiMSAmIDB4MWZmZjtcbiAgICB2YXIgYmgxID0gYjEgPj4+IDEzO1xuICAgIHZhciBiMiA9IGJbMl0gfCAwO1xuICAgIHZhciBibDIgPSBiMiAmIDB4MWZmZjtcbiAgICB2YXIgYmgyID0gYjIgPj4+IDEzO1xuICAgIHZhciBiMyA9IGJbM10gfCAwO1xuICAgIHZhciBibDMgPSBiMyAmIDB4MWZmZjtcbiAgICB2YXIgYmgzID0gYjMgPj4+IDEzO1xuICAgIHZhciBiNCA9IGJbNF0gfCAwO1xuICAgIHZhciBibDQgPSBiNCAmIDB4MWZmZjtcbiAgICB2YXIgYmg0ID0gYjQgPj4+IDEzO1xuICAgIHZhciBiNSA9IGJbNV0gfCAwO1xuICAgIHZhciBibDUgPSBiNSAmIDB4MWZmZjtcbiAgICB2YXIgYmg1ID0gYjUgPj4+IDEzO1xuICAgIHZhciBiNiA9IGJbNl0gfCAwO1xuICAgIHZhciBibDYgPSBiNiAmIDB4MWZmZjtcbiAgICB2YXIgYmg2ID0gYjYgPj4+IDEzO1xuICAgIHZhciBiNyA9IGJbN10gfCAwO1xuICAgIHZhciBibDcgPSBiNyAmIDB4MWZmZjtcbiAgICB2YXIgYmg3ID0gYjcgPj4+IDEzO1xuICAgIHZhciBiOCA9IGJbOF0gfCAwO1xuICAgIHZhciBibDggPSBiOCAmIDB4MWZmZjtcbiAgICB2YXIgYmg4ID0gYjggPj4+IDEzO1xuICAgIHZhciBiOSA9IGJbOV0gfCAwO1xuICAgIHZhciBibDkgPSBiOSAmIDB4MWZmZjtcbiAgICB2YXIgYmg5ID0gYjkgPj4+IDEzO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0gc2VsZi5uZWdhdGl2ZSBeIG51bS5uZWdhdGl2ZTtcbiAgICBvdXQubGVuZ3RoID0gMTk7XG4gICAgLyogayA9IDAgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDAsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMCwgYmgwKTtcbiAgICB2YXIgdzAgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcwID4+PiAyNikpIHwgMDtcbiAgICB3MCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDEsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDEpKSB8IDA7XG4gICAgdmFyIHcxID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MSA+Pj4gMjYpKSB8IDA7XG4gICAgdzEgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSAyICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWwyLCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDIsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDIsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDIsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMikpIHwgMDtcbiAgICB2YXIgdzIgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcyID4+PiAyNikpIHwgMDtcbiAgICB3MiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDMgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDMsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMykpIHwgMDtcbiAgICB2YXIgdzMgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHczID4+PiAyNikpIHwgMDtcbiAgICB3MyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDQgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDQsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNCwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDQpKSB8IDA7XG4gICAgdmFyIHc0ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NCA+Pj4gMjYpKSB8IDA7XG4gICAgdzQgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA1ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw1LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDUsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDUsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDUsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNSkpIHwgMDtcbiAgICB2YXIgdzUgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc1ID4+PiAyNikpIHwgMDtcbiAgICB3NSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDYgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDYsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNiwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNiwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNiwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNikpIHwgMDtcbiAgICB2YXIgdzYgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc2ID4+PiAyNikpIHwgMDtcbiAgICB3NiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDcgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDcsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDcpKSB8IDA7XG4gICAgdmFyIHc3ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NyA+Pj4gMjYpKSB8IDA7XG4gICAgdzcgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA4ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw4LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDgsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDgsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDgsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNSkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDYpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDYpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw3KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg3KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOCkpIHwgMDtcbiAgICB2YXIgdzggPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc4ID4+PiAyNikpIHwgMDtcbiAgICB3OCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDkgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzkgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc5ID4+PiAyNikpIHwgMDtcbiAgICB3OSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEwICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDEpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEwID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTAgPj4+IDI2KSkgfCAwO1xuICAgIHcxMCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDExICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDIpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMik7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMikpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMik7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwzKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgzKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNCkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDUpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDUpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTEgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxMSA+Pj4gMjYpKSB8IDA7XG4gICAgdzExICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTIgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMyk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgzKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwzKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgzKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEyID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTIgPj4+IDI2KSkgfCAwO1xuICAgIHcxMiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEzICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDQpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEzID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTMgPj4+IDI2KSkgfCAwO1xuICAgIHcxMyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE0ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDUpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTQgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNCA+Pj4gMjYpKSB8IDA7XG4gICAgdzE0ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTUgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsNik7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg2KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw2KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg2KTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE1ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTUgPj4+IDI2KSkgfCAwO1xuICAgIHcxNSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE2ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDcpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNyk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNykpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNyk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE2ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTYgPj4+IDI2KSkgfCAwO1xuICAgIHcxNiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE3ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDgpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoOCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsOCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoOCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTcgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNyA+Pj4gMjYpKSB8IDA7XG4gICAgdzE3ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTggKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsOSk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg5KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw5KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg5KTtcbiAgICB2YXIgdzE4ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTggPj4+IDI2KSkgfCAwO1xuICAgIHcxOCAmPSAweDNmZmZmZmY7XG4gICAgb1swXSA9IHcwO1xuICAgIG9bMV0gPSB3MTtcbiAgICBvWzJdID0gdzI7XG4gICAgb1szXSA9IHczO1xuICAgIG9bNF0gPSB3NDtcbiAgICBvWzVdID0gdzU7XG4gICAgb1s2XSA9IHc2O1xuICAgIG9bN10gPSB3NztcbiAgICBvWzhdID0gdzg7XG4gICAgb1s5XSA9IHc5O1xuICAgIG9bMTBdID0gdzEwO1xuICAgIG9bMTFdID0gdzExO1xuICAgIG9bMTJdID0gdzEyO1xuICAgIG9bMTNdID0gdzEzO1xuICAgIG9bMTRdID0gdzE0O1xuICAgIG9bMTVdID0gdzE1O1xuICAgIG9bMTZdID0gdzE2O1xuICAgIG9bMTddID0gdzE3O1xuICAgIG9bMThdID0gdzE4O1xuICAgIGlmIChjICE9PSAwKSB7XG4gICAgICBvWzE5XSA9IGM7XG4gICAgICBvdXQubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgLy8gUG9seWZpbGwgY29tYlxuICBpZiAoIU1hdGguaW11bCkge1xuICAgIGNvbWIxME11bFRvID0gc21hbGxNdWxUbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpZ011bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHNlbGYubGVuZ3RoICsgbnVtLmxlbmd0aDtcblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgdmFyIGhuY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgb3V0Lmxlbmd0aCAtIDE7IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBobmNhcnJ5O1xuICAgICAgaG5jYXJyeSA9IDA7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IGsgLSBqO1xuICAgICAgICB2YXIgYSA9IHNlbGYud29yZHNbaV0gfCAwO1xuICAgICAgICB2YXIgYiA9IG51bS53b3Jkc1tqXSB8IDA7XG4gICAgICAgIHZhciByID0gYSAqIGI7XG5cbiAgICAgICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgICAgbmNhcnJ5ID0gKG5jYXJyeSArICgociAvIDB4NDAwMDAwMCkgfCAwKSkgfCAwO1xuICAgICAgICBsbyA9IChsbyArIHJ3b3JkKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gbG8gJiAweDNmZmZmZmY7XG4gICAgICAgIG5jYXJyeSA9IChuY2FycnkgKyAobG8gPj4+IDI2KSkgfCAwO1xuXG4gICAgICAgIGhuY2FycnkgKz0gbmNhcnJ5ID4+PiAyNjtcbiAgICAgICAgbmNhcnJ5ICY9IDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkO1xuICAgICAgY2FycnkgPSBuY2Fycnk7XG4gICAgICBuY2FycnkgPSBobmNhcnJ5O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIG91dC53b3Jkc1trXSA9IGNhcnJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQubGVuZ3RoLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtYm9NdWxUbyAoc2VsZiwgbnVtLCBvdXQpIHtcbiAgICB2YXIgZmZ0bSA9IG5ldyBGRlRNKCk7XG4gICAgcmV0dXJuIGZmdG0ubXVscChzZWxmLCBudW0sIG91dCk7XG4gIH1cblxuICBCTi5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiBtdWxUbyAobnVtLCBvdXQpIHtcbiAgICB2YXIgcmVzO1xuICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCArIG51bS5sZW5ndGg7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxMCAmJiBudW0ubGVuZ3RoID09PSAxMCkge1xuICAgICAgcmVzID0gY29tYjEwTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgNjMpIHtcbiAgICAgIHJlcyA9IHNtYWxsTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgMTAyNCkge1xuICAgICAgcmVzID0gYmlnTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBqdW1ib011bFRvKHRoaXMsIG51bSwgb3V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIENvb2xleS1UdWtleSBhbGdvcml0aG0gZm9yIEZGVFxuICAvLyBzbGlnaHRseSByZXZpc2l0ZWQgdG8gcmVseSBvbiBsb29waW5nIGluc3RlYWQgb2YgcmVjdXJzaW9uXG5cbiAgZnVuY3Rpb24gRkZUTSAoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIEZGVE0ucHJvdG90eXBlLm1ha2VSQlQgPSBmdW5jdGlvbiBtYWtlUkJUIChOKSB7XG4gICAgdmFyIHQgPSBuZXcgQXJyYXkoTik7XG4gICAgdmFyIGwgPSBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyhOKSAtIDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIHRbaV0gPSB0aGlzLnJldkJpbihpLCBsLCBOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdDtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGJpbmFyeS1yZXZlcnNlZCByZXByZXNlbnRhdGlvbiBvZiBgeGBcbiAgRkZUTS5wcm90b3R5cGUucmV2QmluID0gZnVuY3Rpb24gcmV2QmluICh4LCBsLCBOKSB7XG4gICAgaWYgKHggPT09IDAgfHwgeCA9PT0gTiAtIDEpIHJldHVybiB4O1xuXG4gICAgdmFyIHJiID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgcmIgfD0gKHggJiAxKSA8PCAobCAtIGkgLSAxKTtcbiAgICAgIHggPj49IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJiO1xuICB9O1xuXG4gIC8vIFBlcmZvcm1zIFwidHdlZWRsaW5nXCIgcGhhc2UsIHRoZXJlZm9yZSAnZW11bGF0aW5nJ1xuICAvLyBiZWhhdmlvdXIgb2YgdGhlIHJlY3Vyc2l2ZSBhbGdvcml0aG1cbiAgRkZUTS5wcm90b3R5cGUucGVybXV0ZSA9IGZ1bmN0aW9uIHBlcm11dGUgKHJidCwgcndzLCBpd3MsIHJ0d3MsIGl0d3MsIE4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcnR3c1tpXSA9IHJ3c1tyYnRbaV1dO1xuICAgICAgaXR3c1tpXSA9IGl3c1tyYnRbaV1dO1xuICAgIH1cbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiB0cmFuc2Zvcm0gKHJ3cywgaXdzLCBydHdzLCBpdHdzLCBOLCByYnQpIHtcbiAgICB0aGlzLnBlcm11dGUocmJ0LCByd3MsIGl3cywgcnR3cywgaXR3cywgTik7XG5cbiAgICBmb3IgKHZhciBzID0gMTsgcyA8IE47IHMgPDw9IDEpIHtcbiAgICAgIHZhciBsID0gcyA8PCAxO1xuXG4gICAgICB2YXIgcnR3ZGYgPSBNYXRoLmNvcygyICogTWF0aC5QSSAvIGwpO1xuICAgICAgdmFyIGl0d2RmID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgLyBsKTtcblxuICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBOOyBwICs9IGwpIHtcbiAgICAgICAgdmFyIHJ0d2RmXyA9IHJ0d2RmO1xuICAgICAgICB2YXIgaXR3ZGZfID0gaXR3ZGY7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmUgPSBydHdzW3AgKyBqXTtcbiAgICAgICAgICB2YXIgaWUgPSBpdHdzW3AgKyBqXTtcblxuICAgICAgICAgIHZhciBybyA9IHJ0d3NbcCArIGogKyBzXTtcbiAgICAgICAgICB2YXIgaW8gPSBpdHdzW3AgKyBqICsgc107XG5cbiAgICAgICAgICB2YXIgcnggPSBydHdkZl8gKiBybyAtIGl0d2RmXyAqIGlvO1xuXG4gICAgICAgICAgaW8gPSBydHdkZl8gKiBpbyArIGl0d2RmXyAqIHJvO1xuICAgICAgICAgIHJvID0gcng7XG5cbiAgICAgICAgICBydHdzW3AgKyBqXSA9IHJlICsgcm87XG4gICAgICAgICAgaXR3c1twICsgal0gPSBpZSArIGlvO1xuXG4gICAgICAgICAgcnR3c1twICsgaiArIHNdID0gcmUgLSBybztcbiAgICAgICAgICBpdHdzW3AgKyBqICsgc10gPSBpZSAtIGlvO1xuXG4gICAgICAgICAgLyoganNoaW50IG1heGRlcHRoIDogZmFsc2UgKi9cbiAgICAgICAgICBpZiAoaiAhPT0gbCkge1xuICAgICAgICAgICAgcnggPSBydHdkZiAqIHJ0d2RmXyAtIGl0d2RmICogaXR3ZGZfO1xuXG4gICAgICAgICAgICBpdHdkZl8gPSBydHdkZiAqIGl0d2RmXyArIGl0d2RmICogcnR3ZGZfO1xuICAgICAgICAgICAgcnR3ZGZfID0gcng7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLmd1ZXNzTGVuMTNiID0gZnVuY3Rpb24gZ3Vlc3NMZW4xM2IgKG4sIG0pIHtcbiAgICB2YXIgTiA9IE1hdGgubWF4KG0sIG4pIHwgMTtcbiAgICB2YXIgb2RkID0gTiAmIDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoTiA9IE4gLyAyIHwgMDsgTjsgTiA9IE4gPj4+IDEpIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gMSA8PCBpICsgMSArIG9kZDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb25qdWdhdGUgPSBmdW5jdGlvbiBjb25qdWdhdGUgKHJ3cywgaXdzLCBOKSB7XG4gICAgaWYgKE4gPD0gMSkgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOIC8gMjsgaSsrKSB7XG4gICAgICB2YXIgdCA9IHJ3c1tpXTtcblxuICAgICAgcndzW2ldID0gcndzW04gLSBpIC0gMV07XG4gICAgICByd3NbTiAtIGkgLSAxXSA9IHQ7XG5cbiAgICAgIHQgPSBpd3NbaV07XG5cbiAgICAgIGl3c1tpXSA9IC1pd3NbTiAtIGkgLSAxXTtcbiAgICAgIGl3c1tOIC0gaSAtIDFdID0gLXQ7XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLm5vcm1hbGl6ZTEzYiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZTEzYiAod3MsIE4pIHtcbiAgICB2YXIgY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTiAvIDI7IGkrKykge1xuICAgICAgdmFyIHcgPSBNYXRoLnJvdW5kKHdzWzIgKiBpICsgMV0gLyBOKSAqIDB4MjAwMCArXG4gICAgICAgIE1hdGgucm91bmQod3NbMiAqIGldIC8gTikgK1xuICAgICAgICBjYXJyeTtcblxuICAgICAgd3NbaV0gPSB3ICYgMHgzZmZmZmZmO1xuXG4gICAgICBpZiAodyA8IDB4NDAwMDAwMCkge1xuICAgICAgICBjYXJyeSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXJyeSA9IHcgLyAweDQwMDAwMDAgfCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3cztcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb252ZXJ0MTNiID0gZnVuY3Rpb24gY29udmVydDEzYiAod3MsIGxlbiwgcndzLCBOKSB7XG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjYXJyeSA9IGNhcnJ5ICsgKHdzW2ldIHwgMCk7XG5cbiAgICAgIHJ3c1syICogaV0gPSBjYXJyeSAmIDB4MWZmZjsgY2FycnkgPSBjYXJyeSA+Pj4gMTM7XG4gICAgICByd3NbMiAqIGkgKyAxXSA9IGNhcnJ5ICYgMHgxZmZmOyBjYXJyeSA9IGNhcnJ5ID4+PiAxMztcbiAgICB9XG5cbiAgICAvLyBQYWQgd2l0aCB6ZXJvZXNcbiAgICBmb3IgKGkgPSAyICogbGVuOyBpIDwgTjsgKytpKSB7XG4gICAgICByd3NbaV0gPSAwO1xuICAgIH1cblxuICAgIGFzc2VydChjYXJyeSA9PT0gMCk7XG4gICAgYXNzZXJ0KChjYXJyeSAmIH4weDFmZmYpID09PSAwKTtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5zdHViID0gZnVuY3Rpb24gc3R1YiAoTikge1xuICAgIHZhciBwaCA9IG5ldyBBcnJheShOKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcGhbaV0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBwaDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5tdWxwID0gZnVuY3Rpb24gbXVscCAoeCwgeSwgb3V0KSB7XG4gICAgdmFyIE4gPSAyICogdGhpcy5ndWVzc0xlbjEzYih4Lmxlbmd0aCwgeS5sZW5ndGgpO1xuXG4gICAgdmFyIHJidCA9IHRoaXMubWFrZVJCVChOKTtcblxuICAgIHZhciBfID0gdGhpcy5zdHViKE4pO1xuXG4gICAgdmFyIHJ3cyA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgcndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgaXdzdCA9IG5ldyBBcnJheShOKTtcblxuICAgIHZhciBucndzID0gbmV3IEFycmF5KE4pO1xuICAgIHZhciBucndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgbml3c3QgPSBuZXcgQXJyYXkoTik7XG5cbiAgICB2YXIgcm13cyA9IG91dC53b3JkcztcbiAgICBybXdzLmxlbmd0aCA9IE47XG5cbiAgICB0aGlzLmNvbnZlcnQxM2IoeC53b3JkcywgeC5sZW5ndGgsIHJ3cywgTik7XG4gICAgdGhpcy5jb252ZXJ0MTNiKHkud29yZHMsIHkubGVuZ3RoLCBucndzLCBOKTtcblxuICAgIHRoaXMudHJhbnNmb3JtKHJ3cywgXywgcndzdCwgaXdzdCwgTiwgcmJ0KTtcbiAgICB0aGlzLnRyYW5zZm9ybShucndzLCBfLCBucndzdCwgbml3c3QsIE4sIHJidCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgdmFyIHJ4ID0gcndzdFtpXSAqIG5yd3N0W2ldIC0gaXdzdFtpXSAqIG5pd3N0W2ldO1xuICAgICAgaXdzdFtpXSA9IHJ3c3RbaV0gKiBuaXdzdFtpXSArIGl3c3RbaV0gKiBucndzdFtpXTtcbiAgICAgIHJ3c3RbaV0gPSByeDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmp1Z2F0ZShyd3N0LCBpd3N0LCBOKTtcbiAgICB0aGlzLnRyYW5zZm9ybShyd3N0LCBpd3N0LCBybXdzLCBfLCBOLCByYnQpO1xuICAgIHRoaXMuY29uanVnYXRlKHJtd3MsIF8sIE4pO1xuICAgIHRoaXMubm9ybWFsaXplMTNiKHJtd3MsIE4pO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0geC5uZWdhdGl2ZSBeIHkubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHgubGVuZ3RoICsgeS5sZW5ndGg7XG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIE11bHRpcGx5IGB0aGlzYCBieSBgbnVtYFxuICBCTi5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsIChudW0pIHtcbiAgICB2YXIgb3V0ID0gbmV3IEJOKG51bGwpO1xuICAgIG91dC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCArIG51bS5sZW5ndGgpO1xuICAgIHJldHVybiB0aGlzLm11bFRvKG51bSwgb3V0KTtcbiAgfTtcblxuICAvLyBNdWx0aXBseSBlbXBsb3lpbmcgRkZUXG4gIEJOLnByb3RvdHlwZS5tdWxmID0gZnVuY3Rpb24gbXVsZiAobnVtKSB7XG4gICAgdmFyIG91dCA9IG5ldyBCTihudWxsKTtcbiAgICBvdXQud29yZHMgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGggKyBudW0ubGVuZ3RoKTtcbiAgICByZXR1cm4ganVtYm9NdWxUbyh0aGlzLCBudW0sIG91dCk7XG4gIH07XG5cbiAgLy8gSW4tcGxhY2UgTXVsdGlwbGljYXRpb25cbiAgQk4ucHJvdG90eXBlLmltdWwgPSBmdW5jdGlvbiBpbXVsIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLm11bFRvKG51bSwgdGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmltdWxuID0gZnVuY3Rpb24gaW11bG4gKG51bSkge1xuICAgIGFzc2VydCh0eXBlb2YgbnVtID09PSAnbnVtYmVyJyk7XG4gICAgYXNzZXJ0KG51bSA8IDB4NDAwMDAwMCk7XG5cbiAgICAvLyBDYXJyeVxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9ICh0aGlzLndvcmRzW2ldIHwgMCkgKiBudW07XG4gICAgICB2YXIgbG8gPSAodyAmIDB4M2ZmZmZmZikgKyAoY2FycnkgJiAweDNmZmZmZmYpO1xuICAgICAgY2FycnkgPj49IDI2O1xuICAgICAgY2FycnkgKz0gKHcgLyAweDQwMDAwMDApIHwgMDtcbiAgICAgIC8vIE5PVEU6IGxvIGlzIDI3Yml0IG1heGltdW1cbiAgICAgIGNhcnJ5ICs9IGxvID4+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBsbyAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm11bG4gPSBmdW5jdGlvbiBtdWxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmltdWxuKG51bSk7XG4gIH07XG5cbiAgLy8gYHRoaXNgICogYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5zcXIgPSBmdW5jdGlvbiBzcXIgKCkge1xuICAgIHJldHVybiB0aGlzLm11bCh0aGlzKTtcbiAgfTtcblxuICAvLyBgdGhpc2AgKiBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLmlzcXIgPSBmdW5jdGlvbiBpc3FyICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbXVsKHRoaXMuY2xvbmUoKSk7XG4gIH07XG5cbiAgLy8gTWF0aC5wb3coYHRoaXNgLCBgbnVtYClcbiAgQk4ucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIHBvdyAobnVtKSB7XG4gICAgdmFyIHcgPSB0b0JpdEFycmF5KG51bSk7XG4gICAgaWYgKHcubGVuZ3RoID09PSAwKSByZXR1cm4gbmV3IEJOKDEpO1xuXG4gICAgLy8gU2tpcCBsZWFkaW5nIHplcm9lc1xuICAgIHZhciByZXMgPSB0aGlzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdy5sZW5ndGg7IGkrKywgcmVzID0gcmVzLnNxcigpKSB7XG4gICAgICBpZiAod1tpXSAhPT0gMCkgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCsraSA8IHcubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBxID0gcmVzLnNxcigpOyBpIDwgdy5sZW5ndGg7IGkrKywgcSA9IHEuc3FyKCkpIHtcbiAgICAgICAgaWYgKHdbaV0gPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIHJlcyA9IHJlcy5tdWwocSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICAvLyBTaGlmdC1sZWZ0IGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdXNobG4gPSBmdW5jdGlvbiBpdXNobG4gKGJpdHMpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdHMgPT09ICdudW1iZXInICYmIGJpdHMgPj0gMCk7XG4gICAgdmFyIHIgPSBiaXRzICUgMjY7XG4gICAgdmFyIHMgPSAoYml0cyAtIHIpIC8gMjY7XG4gICAgdmFyIGNhcnJ5TWFzayA9ICgweDNmZmZmZmYgPj4+ICgyNiAtIHIpKSA8PCAoMjYgLSByKTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChyICE9PSAwKSB7XG4gICAgICB2YXIgY2FycnkgPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmV3Q2FycnkgPSB0aGlzLndvcmRzW2ldICYgY2FycnlNYXNrO1xuICAgICAgICB2YXIgYyA9ICgodGhpcy53b3Jkc1tpXSB8IDApIC0gbmV3Q2FycnkpIDw8IHI7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBjIHwgY2Fycnk7XG4gICAgICAgIGNhcnJ5ID0gbmV3Q2FycnkgPj4+ICgyNiAtIHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGNhcnJ5O1xuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMud29yZHNbaSArIHNdID0gdGhpcy53b3Jkc1tpXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IHM7IGkrKykge1xuICAgICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sZW5ndGggKz0gcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hsbiA9IGZ1bmN0aW9uIGlzaGxuIChiaXRzKSB7XG4gICAgLy8gVE9ETyhpbmR1dG55KTogaW1wbGVtZW50IG1lXG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1c2hsbihiaXRzKTtcbiAgfTtcblxuICAvLyBTaGlmdC1yaWdodCBpbi1wbGFjZVxuICAvLyBOT1RFOiBgaGludGAgaXMgYSBsb3dlc3QgYml0IGJlZm9yZSB0cmFpbGluZyB6ZXJvZXNcbiAgLy8gTk9URTogaWYgYGV4dGVuZGVkYCBpcyBwcmVzZW50IC0gaXQgd2lsbCBiZSBmaWxsZWQgd2l0aCBkZXN0cm95ZWQgYml0c1xuICBCTi5wcm90b3R5cGUuaXVzaHJuID0gZnVuY3Rpb24gaXVzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgaDtcbiAgICBpZiAoaGludCkge1xuICAgICAgaCA9IChoaW50IC0gKGhpbnQgJSAyNikpIC8gMjY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSAwO1xuICAgIH1cblxuICAgIHZhciByID0gYml0cyAlIDI2O1xuICAgIHZhciBzID0gTWF0aC5taW4oKGJpdHMgLSByKSAvIDI2LCB0aGlzLmxlbmd0aCk7XG4gICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgdmFyIG1hc2tlZFdvcmRzID0gZXh0ZW5kZWQ7XG5cbiAgICBoIC09IHM7XG4gICAgaCA9IE1hdGgubWF4KDAsIGgpO1xuXG4gICAgLy8gRXh0ZW5kZWQgbW9kZSwgY29weSBtYXNrZWQgcGFydFxuICAgIGlmIChtYXNrZWRXb3Jkcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcbiAgICAgICAgbWFza2VkV29yZHMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldO1xuICAgICAgfVxuICAgICAgbWFza2VkV29yZHMubGVuZ3RoID0gcztcbiAgICB9XG5cbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgLy8gTm8tb3AsIHdlIHNob3VsZCBub3QgbW92ZSBhbnl0aGluZyBhdCBhbGxcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gcykge1xuICAgICAgdGhpcy5sZW5ndGggLT0gcztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2kgKyBzXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53b3Jkc1swXSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfVxuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMCAmJiAoY2FycnkgIT09IDAgfHwgaSA+PSBoKTsgaS0tKSB7XG4gICAgICB2YXIgd29yZCA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IChjYXJyeSA8PCAoMjYgLSByKSkgfCAod29yZCA+Pj4gcik7XG4gICAgICBjYXJyeSA9IHdvcmQgJiBtYXNrO1xuICAgIH1cblxuICAgIC8vIFB1c2ggY2FycmllZCBiaXRzIGFzIGEgbWFza1xuICAgIGlmIChtYXNrZWRXb3JkcyAmJiBjYXJyeSAhPT0gMCkge1xuICAgICAgbWFza2VkV29yZHMud29yZHNbbWFza2VkV29yZHMubGVuZ3RoKytdID0gY2Fycnk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hybiA9IGZ1bmN0aW9uIGlzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIC8vIFRPRE8oaW5kdXRueSk6IGltcGxlbWVudCBtZVxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwKTtcbiAgICByZXR1cm4gdGhpcy5pdXNocm4oYml0cywgaGludCwgZXh0ZW5kZWQpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LWxlZnRcbiAgQk4ucHJvdG90eXBlLnNobG4gPSBmdW5jdGlvbiBzaGxuIChiaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pc2hsbihiaXRzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudXNobG4gPSBmdW5jdGlvbiB1c2hsbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXVzaGxuKGJpdHMpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LXJpZ2h0XG4gIEJOLnByb3RvdHlwZS5zaHJuID0gZnVuY3Rpb24gc2hybiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXNocm4oYml0cyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVzaHJuID0gZnVuY3Rpb24gdXNocm4gKGJpdHMpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLml1c2hybihiaXRzKTtcbiAgfTtcblxuICAvLyBUZXN0IGlmIG4gYml0IGlzIHNldFxuICBCTi5wcm90b3R5cGUudGVzdG4gPSBmdW5jdGlvbiB0ZXN0biAoYml0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBiaXQgPT09ICdudW1iZXInICYmIGJpdCA+PSAwKTtcbiAgICB2YXIgciA9IGJpdCAlIDI2O1xuICAgIHZhciBzID0gKGJpdCAtIHIpIC8gMjY7XG4gICAgdmFyIHEgPSAxIDw8IHI7XG5cbiAgICAvLyBGYXN0IGNhc2U6IGJpdCBpcyBtdWNoIGhpZ2hlciB0aGFuIGFsbCBleGlzdGluZyB3b3Jkc1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSBzKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBiaXQgYW5kIHJldHVyblxuICAgIHZhciB3ID0gdGhpcy53b3Jkc1tzXTtcblxuICAgIHJldHVybiAhISh3ICYgcSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG9ubHkgbG93ZXJzIGJpdHMgb2YgbnVtYmVyIChpbi1wbGFjZSlcbiAgQk4ucHJvdG90eXBlLmltYXNrbiA9IGZ1bmN0aW9uIGltYXNrbiAoYml0cykge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgciA9IGJpdHMgJSAyNjtcbiAgICB2YXIgcyA9IChiaXRzIC0gcikgLyAyNjtcblxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwLCAnaW1hc2tuIHdvcmtzIG9ubHkgd2l0aCBwb3NpdGl2ZSBudW1iZXJzJyk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPD0gcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHIgIT09IDApIHtcbiAgICAgIHMrKztcbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1pbihzLCB0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAociAhPT0gMCkge1xuICAgICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gJj0gbWFzaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIFJldHVybiBvbmx5IGxvd2VycyBiaXRzIG9mIG51bWJlclxuICBCTi5wcm90b3R5cGUubWFza24gPSBmdW5jdGlvbiBtYXNrbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW1hc2tuKGJpdHMpO1xuICB9O1xuXG4gIC8vIEFkZCBwbGFpbiBudW1iZXIgYG51bWAgdG8gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pYWRkbiA9IGZ1bmN0aW9uIGlhZGRuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pc3VibigtbnVtKTtcblxuICAgIC8vIFBvc3NpYmxlIHNpZ24gY2hhbmdlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiAodGhpcy53b3Jkc1swXSB8IDApIDwgbnVtKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gPSBudW0gLSAodGhpcy53b3Jkc1swXSB8IDApO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgdGhpcy5pc3VibihudW0pO1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aG91dCBjaGVja3NcbiAgICByZXR1cm4gdGhpcy5faWFkZG4obnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2lhZGRuID0gZnVuY3Rpb24gX2lhZGRuIChudW0pIHtcbiAgICB0aGlzLndvcmRzWzBdICs9IG51bTtcblxuICAgIC8vIENhcnJ5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldID49IDB4NDAwMDAwMDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldIC09IDB4NDAwMDAwMDtcbiAgICAgIGlmIChpID09PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0gPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0rKztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSArIDEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gU3VidHJhY3QgcGxhaW4gbnVtYmVyIGBudW1gIGZyb20gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pc3VibiA9IGZ1bmN0aW9uIGlzdWJuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pYWRkbigtbnVtKTtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHRoaXMuaWFkZG4obnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy53b3Jkc1swXSAtPSBudW07XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEgJiYgdGhpcy53b3Jkc1swXSA8IDApIHtcbiAgICAgIHRoaXMud29yZHNbMF0gPSAtdGhpcy53b3Jkc1swXTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDYXJyeVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldIDwgMDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gKz0gMHg0MDAwMDAwO1xuICAgICAgICB0aGlzLndvcmRzW2kgKyAxXSAtPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmFkZG4gPSBmdW5jdGlvbiBhZGRuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGRuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnN1Ym4gPSBmdW5jdGlvbiBzdWJuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWJuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlhYnMgPSBmdW5jdGlvbiBpYWJzICgpIHtcbiAgICB0aGlzLm5lZ2F0aXZlID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5hYnMgPSBmdW5jdGlvbiBhYnMgKCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaWFicygpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5faXNobG5zdWJtdWwgPSBmdW5jdGlvbiBfaXNobG5zdWJtdWwgKG51bSwgbXVsLCBzaGlmdCkge1xuICAgIHZhciBsZW4gPSBudW0ubGVuZ3RoICsgc2hpZnQ7XG4gICAgdmFyIGk7XG5cbiAgICB0aGlzLl9leHBhbmQobGVuKTtcblxuICAgIHZhciB3O1xuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG51bS5sZW5ndGg7IGkrKykge1xuICAgICAgdyA9ICh0aGlzLndvcmRzW2kgKyBzaGlmdF0gfCAwKSArIGNhcnJ5O1xuICAgICAgdmFyIHJpZ2h0ID0gKG51bS53b3Jkc1tpXSB8IDApICogbXVsO1xuICAgICAgdyAtPSByaWdodCAmIDB4M2ZmZmZmZjtcbiAgICAgIGNhcnJ5ID0gKHcgPj4gMjYpIC0gKChyaWdodCAvIDB4NDAwMDAwMCkgfCAwKTtcbiAgICAgIHRoaXMud29yZHNbaSArIHNoaWZ0XSA9IHcgJiAweDNmZmZmZmY7XG4gICAgfVxuICAgIGZvciAoOyBpIDwgdGhpcy5sZW5ndGggLSBzaGlmdDsgaSsrKSB7XG4gICAgICB3ID0gKHRoaXMud29yZHNbaSArIHNoaWZ0XSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHcgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2kgKyBzaGlmdF0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cblxuICAgIGlmIChjYXJyeSA9PT0gMCkgcmV0dXJuIHRoaXMuc3RyaXAoKTtcblxuICAgIC8vIFN1YnRyYWN0aW9uIG92ZXJmbG93XG4gICAgYXNzZXJ0KGNhcnJ5ID09PSAtMSk7XG4gICAgY2FycnkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3ID0gLSh0aGlzLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICB0aGlzLm5lZ2F0aXZlID0gMTtcblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl93b3JkRGl2ID0gZnVuY3Rpb24gX3dvcmREaXYgKG51bSwgbW9kZSkge1xuICAgIHZhciBzaGlmdCA9IHRoaXMubGVuZ3RoIC0gbnVtLmxlbmd0aDtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtO1xuXG4gICAgLy8gTm9ybWFsaXplXG4gICAgdmFyIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgdmFyIGJoaUJpdHMgPSB0aGlzLl9jb3VudEJpdHMoYmhpKTtcbiAgICBzaGlmdCA9IDI2IC0gYmhpQml0cztcbiAgICBpZiAoc2hpZnQgIT09IDApIHtcbiAgICAgIGIgPSBiLnVzaGxuKHNoaWZ0KTtcbiAgICAgIGEuaXVzaGxuKHNoaWZ0KTtcbiAgICAgIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBxdW90aWVudFxuICAgIHZhciBtID0gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgICB2YXIgcTtcblxuICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgcSA9IG5ldyBCTihudWxsKTtcbiAgICAgIHEubGVuZ3RoID0gbSArIDE7XG4gICAgICBxLndvcmRzID0gbmV3IEFycmF5KHEubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcS5sZW5ndGg7IGkrKykge1xuICAgICAgICBxLndvcmRzW2ldID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlmZiA9IGEuY2xvbmUoKS5faXNobG5zdWJtdWwoYiwgMSwgbSk7XG4gICAgaWYgKGRpZmYubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIGEgPSBkaWZmO1xuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1ttXSA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IG0gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdmFyIHFqID0gKGEud29yZHNbYi5sZW5ndGggKyBqXSB8IDApICogMHg0MDAwMDAwICtcbiAgICAgICAgKGEud29yZHNbYi5sZW5ndGggKyBqIC0gMV0gfCAwKTtcblxuICAgICAgLy8gTk9URTogKHFqIC8gYmhpKSBpcyAoMHgzZmZmZmZmICogMHg0MDAwMDAwICsgMHgzZmZmZmZmKSAvIDB4MjAwMDAwMCBtYXhcbiAgICAgIC8vICgweDdmZmZmZmYpXG4gICAgICBxaiA9IE1hdGgubWluKChxaiAvIGJoaSkgfCAwLCAweDNmZmZmZmYpO1xuXG4gICAgICBhLl9pc2hsbnN1Ym11bChiLCBxaiwgaik7XG4gICAgICB3aGlsZSAoYS5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBxai0tO1xuICAgICAgICBhLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgYS5faXNobG5zdWJtdWwoYiwgMSwgaik7XG4gICAgICAgIGlmICghYS5pc1plcm8oKSkge1xuICAgICAgICAgIGEubmVnYXRpdmUgXj0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1tqXSA9IHFqO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocSkge1xuICAgICAgcS5zdHJpcCgpO1xuICAgIH1cbiAgICBhLnN0cmlwKCk7XG5cbiAgICAvLyBEZW5vcm1hbGl6ZVxuICAgIGlmIChtb2RlICE9PSAnZGl2JyAmJiBzaGlmdCAhPT0gMCkge1xuICAgICAgYS5pdXNocm4oc2hpZnQpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkaXY6IHEgfHwgbnVsbCxcbiAgICAgIG1vZDogYVxuICAgIH07XG4gIH07XG5cbiAgLy8gTk9URTogMSkgYG1vZGVgIGNhbiBiZSBzZXQgdG8gYG1vZGAgdG8gcmVxdWVzdCBtb2Qgb25seSxcbiAgLy8gICAgICAgdG8gYGRpdmAgdG8gcmVxdWVzdCBkaXYgb25seSwgb3IgYmUgYWJzZW50IHRvXG4gIC8vICAgICAgIHJlcXVlc3QgYm90aCBkaXYgJiBtb2RcbiAgLy8gICAgICAgMikgYHBvc2l0aXZlYCBpcyB0cnVlIGlmIHVuc2lnbmVkIG1vZCBpcyByZXF1ZXN0ZWRcbiAgQk4ucHJvdG90eXBlLmRpdm1vZCA9IGZ1bmN0aW9uIGRpdm1vZCAobnVtLCBtb2RlLCBwb3NpdGl2ZSkge1xuICAgIGFzc2VydCghbnVtLmlzWmVybygpKTtcblxuICAgIGlmICh0aGlzLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IG5ldyBCTigwKSxcbiAgICAgICAgbW9kOiBuZXcgQk4oMClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGRpdiwgbW9kLCByZXM7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICByZXMgPSB0aGlzLm5lZygpLmRpdm1vZChudW0sIG1vZGUpO1xuXG4gICAgICBpZiAobW9kZSAhPT0gJ21vZCcpIHtcbiAgICAgICAgZGl2ID0gcmVzLmRpdi5uZWcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUgIT09ICdkaXYnKSB7XG4gICAgICAgIG1vZCA9IHJlcy5tb2QubmVnKCk7XG4gICAgICAgIGlmIChwb3NpdGl2ZSAmJiBtb2QubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgICBtb2QuaWFkZChudW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogZGl2LFxuICAgICAgICBtb2Q6IG1vZFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgICBkaXYgPSByZXMuZGl2Lm5lZygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IGRpdixcbiAgICAgICAgbW9kOiByZXMubW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICgodGhpcy5uZWdhdGl2ZSAmIG51bS5uZWdhdGl2ZSkgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMubmVnKCkuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnZGl2Jykge1xuICAgICAgICBtb2QgPSByZXMubW9kLm5lZygpO1xuICAgICAgICBpZiAocG9zaXRpdmUgJiYgbW9kLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICAgICAgbW9kLmlzdWIobnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IHJlcy5kaXYsXG4gICAgICAgIG1vZDogbW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEJvdGggbnVtYmVycyBhcmUgcG9zaXRpdmUgYXQgdGhpcyBwb2ludFxuXG4gICAgLy8gU3RyaXAgYm90aCBudW1iZXJzIHRvIGFwcHJveGltYXRlIHNoaWZ0IHZhbHVlXG4gICAgaWYgKG51bS5sZW5ndGggPiB0aGlzLmxlbmd0aCB8fCB0aGlzLmNtcChudW0pIDwgMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGl2OiBuZXcgQk4oMCksXG4gICAgICAgIG1vZDogdGhpc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBWZXJ5IHNob3J0IHJlZHVjdGlvblxuICAgIGlmIChudW0ubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2RpdicpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IHRoaXMuZGl2bihudW0ud29yZHNbMF0pLFxuICAgICAgICAgIG1vZDogbnVsbFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZSA9PT0gJ21vZCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IG51bGwsXG4gICAgICAgICAgbW9kOiBuZXcgQk4odGhpcy5tb2RuKG51bS53b3Jkc1swXSkpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogdGhpcy5kaXZuKG51bS53b3Jkc1swXSksXG4gICAgICAgIG1vZDogbmV3IEJOKHRoaXMubW9kbihudW0ud29yZHNbMF0pKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fd29yZERpdihudW0sIG1vZGUpO1xuICB9O1xuXG4gIC8vIEZpbmQgYHRoaXNgIC8gYG51bWBcbiAgQk4ucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2bW9kKG51bSwgJ2RpdicsIGZhbHNlKS5kaXY7XG4gIH07XG5cbiAgLy8gRmluZCBgdGhpc2AgJSBgbnVtYFxuICBCTi5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gbW9kIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5kaXZtb2QobnVtLCAnbW9kJywgZmFsc2UpLm1vZDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudW1vZCA9IGZ1bmN0aW9uIHVtb2QgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmRpdm1vZChudW0sICdtb2QnLCB0cnVlKS5tb2Q7XG4gIH07XG5cbiAgLy8gRmluZCBSb3VuZChgdGhpc2AgLyBgbnVtYClcbiAgQk4ucHJvdG90eXBlLmRpdlJvdW5kID0gZnVuY3Rpb24gZGl2Um91bmQgKG51bSkge1xuICAgIHZhciBkbSA9IHRoaXMuZGl2bW9kKG51bSk7XG5cbiAgICAvLyBGYXN0IGNhc2UgLSBleGFjdCBkaXZpc2lvblxuICAgIGlmIChkbS5tb2QuaXNaZXJvKCkpIHJldHVybiBkbS5kaXY7XG5cbiAgICB2YXIgbW9kID0gZG0uZGl2Lm5lZ2F0aXZlICE9PSAwID8gZG0ubW9kLmlzdWIobnVtKSA6IGRtLm1vZDtcblxuICAgIHZhciBoYWxmID0gbnVtLnVzaHJuKDEpO1xuICAgIHZhciByMiA9IG51bS5hbmRsbigxKTtcbiAgICB2YXIgY21wID0gbW9kLmNtcChoYWxmKTtcblxuICAgIC8vIFJvdW5kIGRvd25cbiAgICBpZiAoY21wIDwgMCB8fCByMiA9PT0gMSAmJiBjbXAgPT09IDApIHJldHVybiBkbS5kaXY7XG5cbiAgICAvLyBSb3VuZCB1cFxuICAgIHJldHVybiBkbS5kaXYubmVnYXRpdmUgIT09IDAgPyBkbS5kaXYuaXN1Ym4oMSkgOiBkbS5kaXYuaWFkZG4oMSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm1vZG4gPSBmdW5jdGlvbiBtb2RuIChudW0pIHtcbiAgICBhc3NlcnQobnVtIDw9IDB4M2ZmZmZmZik7XG4gICAgdmFyIHAgPSAoMSA8PCAyNikgJSBudW07XG5cbiAgICB2YXIgYWNjID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgYWNjID0gKHAgKiBhY2MgKyAodGhpcy53b3Jkc1tpXSB8IDApKSAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9O1xuXG4gIC8vIEluLXBsYWNlIGRpdmlzaW9uIGJ5IG51bWJlclxuICBCTi5wcm90b3R5cGUuaWRpdm4gPSBmdW5jdGlvbiBpZGl2biAobnVtKSB7XG4gICAgYXNzZXJ0KG51bSA8PSAweDNmZmZmZmYpO1xuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHcgPSAodGhpcy53b3Jkc1tpXSB8IDApICsgY2FycnkgKiAweDQwMDAwMDA7XG4gICAgICB0aGlzLndvcmRzW2ldID0gKHcgLyBudW0pIHwgMDtcbiAgICAgIGNhcnJ5ID0gdyAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5kaXZuID0gZnVuY3Rpb24gZGl2biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pZGl2bihudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5lZ2NkID0gZnVuY3Rpb24gZWdjZCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIHggPSB0aGlzO1xuICAgIHZhciB5ID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKHgubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHggPSB4LnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSB4LmNsb25lKCk7XG4gICAgfVxuXG4gICAgLy8gQSAqIHggKyBCICogeSA9IHhcbiAgICB2YXIgQSA9IG5ldyBCTigxKTtcbiAgICB2YXIgQiA9IG5ldyBCTigwKTtcblxuICAgIC8vIEMgKiB4ICsgRCAqIHkgPSB5XG4gICAgdmFyIEMgPSBuZXcgQk4oMCk7XG4gICAgdmFyIEQgPSBuZXcgQk4oMSk7XG5cbiAgICB2YXIgZyA9IDA7XG5cbiAgICB3aGlsZSAoeC5pc0V2ZW4oKSAmJiB5LmlzRXZlbigpKSB7XG4gICAgICB4Lml1c2hybigxKTtcbiAgICAgIHkuaXVzaHJuKDEpO1xuICAgICAgKytnO1xuICAgIH1cblxuICAgIHZhciB5cCA9IHkuY2xvbmUoKTtcbiAgICB2YXIgeHAgPSB4LmNsb25lKCk7XG5cbiAgICB3aGlsZSAoIXguaXNaZXJvKCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7ICh4LndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgeC5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEEuaXNPZGQoKSB8fCBCLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEEuaWFkZCh5cCk7XG4gICAgICAgICAgICBCLmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEEuaXVzaHJuKDEpO1xuICAgICAgICAgIEIuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBqbSA9IDE7ICh5LndvcmRzWzBdICYgam0pID09PSAwICYmIGogPCAyNjsgKytqLCBqbSA8PD0gMSk7XG4gICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgeS5pdXNocm4oaik7XG4gICAgICAgIHdoaWxlIChqLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEMuaXNPZGQoKSB8fCBELmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEMuaWFkZCh5cCk7XG4gICAgICAgICAgICBELmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEMuaXVzaHJuKDEpO1xuICAgICAgICAgIEQuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh4LmNtcCh5KSA+PSAwKSB7XG4gICAgICAgIHguaXN1Yih5KTtcbiAgICAgICAgQS5pc3ViKEMpO1xuICAgICAgICBCLmlzdWIoRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5LmlzdWIoeCk7XG4gICAgICAgIEMuaXN1YihBKTtcbiAgICAgICAgRC5pc3ViKEIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhOiBDLFxuICAgICAgYjogRCxcbiAgICAgIGdjZDogeS5pdXNobG4oZylcbiAgICB9O1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgcmVkdWNlZCBpbmNhcm5hdGlvbiBvZiB0aGUgYmluYXJ5IEVFQVxuICAvLyBhYm92ZSwgZGVzaWduYXRlZCB0byBpbnZlcnQgbWVtYmVycyBvZiB0aGVcbiAgLy8gX3ByaW1lXyBmaWVsZHMgRihwKSBhdCBhIG1heGltYWwgc3BlZWRcbiAgQk4ucHJvdG90eXBlLl9pbnZtcCA9IGZ1bmN0aW9uIF9pbnZtcCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIGEgPSB0aGlzO1xuICAgIHZhciBiID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKGEubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGEgPSBhLnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBhLmNsb25lKCk7XG4gICAgfVxuXG4gICAgdmFyIHgxID0gbmV3IEJOKDEpO1xuICAgIHZhciB4MiA9IG5ldyBCTigwKTtcblxuICAgIHZhciBkZWx0YSA9IGIuY2xvbmUoKTtcblxuICAgIHdoaWxlIChhLmNtcG4oMSkgPiAwICYmIGIuY21wbigxKSA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7IChhLndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgYS5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKHgxLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIHgxLmlhZGQoZGVsdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHgxLml1c2hybigxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgam0gPSAxOyAoYi53b3Jkc1swXSAmIGptKSA9PT0gMCAmJiBqIDwgMjY7ICsraiwgam0gPDw9IDEpO1xuICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgIGIuaXVzaHJuKGopO1xuICAgICAgICB3aGlsZSAoai0tID4gMCkge1xuICAgICAgICAgIGlmICh4Mi5pc09kZCgpKSB7XG4gICAgICAgICAgICB4Mi5pYWRkKGRlbHRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB4Mi5pdXNocm4oMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGEuY21wKGIpID49IDApIHtcbiAgICAgICAgYS5pc3ViKGIpO1xuICAgICAgICB4MS5pc3ViKHgyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGIuaXN1YihhKTtcbiAgICAgICAgeDIuaXN1Yih4MSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlcztcbiAgICBpZiAoYS5jbXBuKDEpID09PSAwKSB7XG4gICAgICByZXMgPSB4MTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0geDI7XG4gICAgfVxuXG4gICAgaWYgKHJlcy5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzLmlhZGQocCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ2NkID0gZnVuY3Rpb24gZ2NkIChudW0pIHtcbiAgICBpZiAodGhpcy5pc1plcm8oKSkgcmV0dXJuIG51bS5hYnMoKTtcbiAgICBpZiAobnVtLmlzWmVybygpKSByZXR1cm4gdGhpcy5hYnMoKTtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtLmNsb25lKCk7XG4gICAgYS5uZWdhdGl2ZSA9IDA7XG4gICAgYi5uZWdhdGl2ZSA9IDA7XG5cbiAgICAvLyBSZW1vdmUgY29tbW9uIGZhY3RvciBvZiB0d29cbiAgICBmb3IgKHZhciBzaGlmdCA9IDA7IGEuaXNFdmVuKCkgJiYgYi5pc0V2ZW4oKTsgc2hpZnQrKykge1xuICAgICAgYS5pdXNocm4oMSk7XG4gICAgICBiLml1c2hybigxKTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICB3aGlsZSAoYS5pc0V2ZW4oKSkge1xuICAgICAgICBhLml1c2hybigxKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChiLmlzRXZlbigpKSB7XG4gICAgICAgIGIuaXVzaHJuKDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgciA9IGEuY21wKGIpO1xuICAgICAgaWYgKHIgPCAwKSB7XG4gICAgICAgIC8vIFN3YXAgYGFgIGFuZCBgYmAgdG8gbWFrZSBgYWAgYWx3YXlzIGJpZ2dlciB0aGFuIGBiYFxuICAgICAgICB2YXIgdCA9IGE7XG4gICAgICAgIGEgPSBiO1xuICAgICAgICBiID0gdDtcbiAgICAgIH0gZWxzZSBpZiAociA9PT0gMCB8fCBiLmNtcG4oMSkgPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGEuaXN1YihiKTtcbiAgICB9IHdoaWxlICh0cnVlKTtcblxuICAgIHJldHVybiBiLml1c2hsbihzaGlmdCk7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IG51bWJlciBpbiB0aGUgZmllbGQgRihudW0pXG4gIEJOLnByb3RvdHlwZS5pbnZtID0gZnVuY3Rpb24gaW52bSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZWdjZChudW0pLmEudW1vZChudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc0V2ZW4gPSBmdW5jdGlvbiBpc0V2ZW4gKCkge1xuICAgIHJldHVybiAodGhpcy53b3Jkc1swXSAmIDEpID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc09kZCA9IGZ1bmN0aW9uIGlzT2RkICgpIHtcbiAgICByZXR1cm4gKHRoaXMud29yZHNbMF0gJiAxKSA9PT0gMTtcbiAgfTtcblxuICAvLyBBbmQgZmlyc3Qgd29yZCBhbmQgbnVtXG4gIEJOLnByb3RvdHlwZS5hbmRsbiA9IGZ1bmN0aW9uIGFuZGxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy53b3Jkc1swXSAmIG51bTtcbiAgfTtcblxuICAvLyBJbmNyZW1lbnQgYXQgdGhlIGJpdCBwb3NpdGlvbiBpbi1saW5lXG4gIEJOLnByb3RvdHlwZS5iaW5jbiA9IGZ1bmN0aW9uIGJpbmNuIChiaXQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdCA9PT0gJ251bWJlcicpO1xuICAgIHZhciByID0gYml0ICUgMjY7XG4gICAgdmFyIHMgPSAoYml0IC0gcikgLyAyNjtcbiAgICB2YXIgcSA9IDEgPDwgcjtcblxuICAgIC8vIEZhc3QgY2FzZTogYml0IGlzIG11Y2ggaGlnaGVyIHRoYW4gYWxsIGV4aXN0aW5nIHdvcmRzXG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IHMpIHtcbiAgICAgIHRoaXMuX2V4cGFuZChzICsgMSk7XG4gICAgICB0aGlzLndvcmRzW3NdIHw9IHE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgYml0IGFuZCBwcm9wYWdhdGUsIGlmIG5lZWRlZFxuICAgIHZhciBjYXJyeSA9IHE7XG4gICAgZm9yICh2YXIgaSA9IHM7IGNhcnJ5ICE9PSAwICYmIGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdyArPSBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+Pj4gMjY7XG4gICAgICB3ICY9IDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbXBuID0gZnVuY3Rpb24gY21wbiAobnVtKSB7XG4gICAgdmFyIG5lZ2F0aXZlID0gbnVtIDwgMDtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmICFuZWdhdGl2ZSkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG5lZ2F0aXZlKSByZXR1cm4gMTtcblxuICAgIHRoaXMuc3RyaXAoKTtcblxuICAgIHZhciByZXM7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgcmVzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIG51bSA9IC1udW07XG4gICAgICB9XG5cbiAgICAgIGFzc2VydChudW0gPD0gMHgzZmZmZmZmLCAnTnVtYmVyIGlzIHRvbyBiaWcnKTtcblxuICAgICAgdmFyIHcgPSB0aGlzLndvcmRzWzBdIHwgMDtcbiAgICAgIHJlcyA9IHcgPT09IG51bSA/IDAgOiB3IDwgbnVtID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIC1yZXMgfCAwO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy8gQ29tcGFyZSB0d28gbnVtYmVycyBhbmQgcmV0dXJuOlxuICAvLyAxIC0gaWYgYHRoaXNgID4gYG51bWBcbiAgLy8gMCAtIGlmIGB0aGlzYCA9PSBgbnVtYFxuICAvLyAtMSAtIGlmIGB0aGlzYCA8IGBudW1gXG4gIEJOLnByb3RvdHlwZS5jbXAgPSBmdW5jdGlvbiBjbXAgKG51bSkge1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmIG51bS5uZWdhdGl2ZSA9PT0gMCkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG51bS5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIDE7XG5cbiAgICB2YXIgcmVzID0gdGhpcy51Y21wKG51bSk7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHJldHVybiAtcmVzIHwgMDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIFVuc2lnbmVkIGNvbXBhcmlzb25cbiAgQk4ucHJvdG90eXBlLnVjbXAgPSBmdW5jdGlvbiB1Y21wIChudW0pIHtcbiAgICAvLyBBdCB0aGlzIHBvaW50IGJvdGggbnVtYmVycyBoYXZlIHRoZSBzYW1lIHNpZ25cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gMTtcbiAgICBpZiAodGhpcy5sZW5ndGggPCBudW0ubGVuZ3RoKSByZXR1cm4gLTE7XG5cbiAgICB2YXIgcmVzID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGEgPSB0aGlzLndvcmRzW2ldIHwgMDtcbiAgICAgIHZhciBiID0gbnVtLndvcmRzW2ldIHwgMDtcblxuICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlO1xuICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJlcyA9IC0xO1xuICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICByZXMgPSAxO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmd0biA9IGZ1bmN0aW9uIGd0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAxO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndCA9IGZ1bmN0aW9uIGd0IChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXAobnVtKSA9PT0gMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ3RlbiA9IGZ1bmN0aW9uIGd0ZW4gKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcG4obnVtKSA+PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndGUgPSBmdW5jdGlvbiBndGUgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID49IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0biA9IGZ1bmN0aW9uIGx0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAtMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUubHQgPSBmdW5jdGlvbiBsdCAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPT09IC0xO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5sdGVuID0gZnVuY3Rpb24gbHRlbiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pIDw9IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0ZSA9IGZ1bmN0aW9uIGx0ZSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPD0gMDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZXFuID0gZnVuY3Rpb24gZXFuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXBuKG51bSkgPT09IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID09PSAwO1xuICB9O1xuXG4gIC8vXG4gIC8vIEEgcmVkdWNlIGNvbnRleHQsIGNvdWxkIGJlIHVzaW5nIG1vbnRnb21lcnkgb3Igc29tZXRoaW5nIGJldHRlciwgZGVwZW5kaW5nXG4gIC8vIG9uIHRoZSBgbWAgaXRzZWxmLlxuICAvL1xuICBCTi5yZWQgPSBmdW5jdGlvbiByZWQgKG51bSkge1xuICAgIHJldHVybiBuZXcgUmVkKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvUmVkID0gZnVuY3Rpb24gdG9SZWQgKGN0eCkge1xuICAgIGFzc2VydCghdGhpcy5yZWQsICdBbHJlYWR5IGEgbnVtYmVyIGluIHJlZHVjdGlvbiBjb250ZXh0Jyk7XG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDAsICdyZWQgd29ya3Mgb25seSB3aXRoIHBvc2l0aXZlcycpO1xuICAgIHJldHVybiBjdHguY29udmVydFRvKHRoaXMpLl9mb3JjZVJlZChjdHgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tUmVkID0gZnVuY3Rpb24gZnJvbVJlZCAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAnZnJvbVJlZCB3b3JrcyBvbmx5IHdpdGggbnVtYmVycyBpbiByZWR1Y3Rpb24gY29udGV4dCcpO1xuICAgIHJldHVybiB0aGlzLnJlZC5jb252ZXJ0RnJvbSh0aGlzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2ZvcmNlUmVkID0gZnVuY3Rpb24gX2ZvcmNlUmVkIChjdHgpIHtcbiAgICB0aGlzLnJlZCA9IGN0eDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZm9yY2VSZWQgPSBmdW5jdGlvbiBmb3JjZVJlZCAoY3R4KSB7XG4gICAgYXNzZXJ0KCF0aGlzLnJlZCwgJ0FscmVhZHkgYSBudW1iZXIgaW4gcmVkdWN0aW9uIGNvbnRleHQnKTtcbiAgICByZXR1cm4gdGhpcy5fZm9yY2VSZWQoY3R4KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkQWRkID0gZnVuY3Rpb24gcmVkQWRkIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRBZGQgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLmFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJQWRkID0gZnVuY3Rpb24gcmVkSUFkZCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSUFkZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaWFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTdWIgPSBmdW5jdGlvbiByZWRTdWIgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFN1YiB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElTdWIgPSBmdW5jdGlvbiByZWRJU3ViIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRJU3ViIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5pc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZFNobCA9IGZ1bmN0aW9uIHJlZFNobCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkU2hsIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zaGwodGhpcywgbnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkTXVsID0gZnVuY3Rpb24gcmVkTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubXVsKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElNdWwgPSBmdW5jdGlvbiByZWRJTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW11bCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTcXIgPSBmdW5jdGlvbiByZWRTcXIgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3FyKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJU3FyID0gZnVuY3Rpb24gcmVkSVNxciAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSVNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaXNxcih0aGlzKTtcbiAgfTtcblxuICAvLyBTcXVhcmUgcm9vdCBvdmVyIHBcbiAgQk4ucHJvdG90eXBlLnJlZFNxcnQgPSBmdW5jdGlvbiByZWRTcXJ0ICgpIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRTcXJ0IHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHRoaXMucmVkLl92ZXJpZnkxKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zcXJ0KHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJbnZtID0gZnVuY3Rpb24gcmVkSW52bSAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSW52bSB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW52bSh0aGlzKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmVnYXRpdmUgY2xvbmUgb2YgYHRoaXNgICUgYHJlZCBtb2R1bG9gXG4gIEJOLnByb3RvdHlwZS5yZWROZWcgPSBmdW5jdGlvbiByZWROZWcgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZE5lZyB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubmVnKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRQb3cgPSBmdW5jdGlvbiByZWRQb3cgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCAmJiAhbnVtLnJlZCwgJ3JlZFBvdyhub3JtYWxOdW0pJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTEodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLnBvdyh0aGlzLCBudW0pO1xuICB9O1xuXG4gIC8vIFByaW1lIG51bWJlcnMgd2l0aCBlZmZpY2llbnQgcmVkdWN0aW9uXG4gIHZhciBwcmltZXMgPSB7XG4gICAgazI1NjogbnVsbCxcbiAgICBwMjI0OiBudWxsLFxuICAgIHAxOTI6IG51bGwsXG4gICAgcDI1NTE5OiBudWxsXG4gIH07XG5cbiAgLy8gUHNldWRvLU1lcnNlbm5lIHByaW1lXG4gIGZ1bmN0aW9uIE1QcmltZSAobmFtZSwgcCkge1xuICAgIC8vIFAgPSAyIF4gTiAtIEtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucCA9IG5ldyBCTihwLCAxNik7XG4gICAgdGhpcy5uID0gdGhpcy5wLmJpdExlbmd0aCgpO1xuICAgIHRoaXMuayA9IG5ldyBCTigxKS5pdXNobG4odGhpcy5uKS5pc3ViKHRoaXMucCk7XG5cbiAgICB0aGlzLnRtcCA9IHRoaXMuX3RtcCgpO1xuICB9XG5cbiAgTVByaW1lLnByb3RvdHlwZS5fdG1wID0gZnVuY3Rpb24gX3RtcCAoKSB7XG4gICAgdmFyIHRtcCA9IG5ldyBCTihudWxsKTtcbiAgICB0bXAud29yZHMgPSBuZXcgQXJyYXkoTWF0aC5jZWlsKHRoaXMubiAvIDEzKSk7XG4gICAgcmV0dXJuIHRtcDtcbiAgfTtcblxuICBNUHJpbWUucHJvdG90eXBlLmlyZWR1Y2UgPSBmdW5jdGlvbiBpcmVkdWNlIChudW0pIHtcbiAgICAvLyBBc3N1bWVzIHRoYXQgYG51bWAgaXMgbGVzcyB0aGFuIGBQXjJgXG4gICAgLy8gbnVtID0gSEkgKiAoMiBeIE4gLSBLKSArIEhJICogSyArIExPID0gSEkgKiBLICsgTE8gKG1vZCBQKVxuICAgIHZhciByID0gbnVtO1xuICAgIHZhciBybGVuO1xuXG4gICAgZG8ge1xuICAgICAgdGhpcy5zcGxpdChyLCB0aGlzLnRtcCk7XG4gICAgICByID0gdGhpcy5pbXVsSyhyKTtcbiAgICAgIHIgPSByLmlhZGQodGhpcy50bXApO1xuICAgICAgcmxlbiA9IHIuYml0TGVuZ3RoKCk7XG4gICAgfSB3aGlsZSAocmxlbiA+IHRoaXMubik7XG5cbiAgICB2YXIgY21wID0gcmxlbiA8IHRoaXMubiA/IC0xIDogci51Y21wKHRoaXMucCk7XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgci53b3Jkc1swXSA9IDA7XG4gICAgICByLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChjbXAgPiAwKSB7XG4gICAgICByLmlzdWIodGhpcy5wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgci5zdHJpcCgpO1xuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIE1QcmltZS5wcm90b3R5cGUuc3BsaXQgPSBmdW5jdGlvbiBzcGxpdCAoaW5wdXQsIG91dCkge1xuICAgIGlucHV0Lml1c2hybih0aGlzLm4sIDAsIG91dCk7XG4gIH07XG5cbiAgTVByaW1lLnByb3RvdHlwZS5pbXVsSyA9IGZ1bmN0aW9uIGltdWxLIChudW0pIHtcbiAgICByZXR1cm4gbnVtLmltdWwodGhpcy5rKTtcbiAgfTtcblxuICBmdW5jdGlvbiBLMjU2ICgpIHtcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAnazI1NicsXG4gICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmUgZmZmZmZjMmYnKTtcbiAgfVxuICBpbmhlcml0cyhLMjU2LCBNUHJpbWUpO1xuXG4gIEsyNTYucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKGlucHV0LCBvdXRwdXQpIHtcbiAgICAvLyAyNTYgPSA5ICogMjYgKyAyMlxuICAgIHZhciBtYXNrID0gMHgzZmZmZmY7XG5cbiAgICB2YXIgb3V0TGVuID0gTWF0aC5taW4oaW5wdXQubGVuZ3RoLCA5KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG91dExlbjsgaSsrKSB7XG4gICAgICBvdXRwdXQud29yZHNbaV0gPSBpbnB1dC53b3Jkc1tpXTtcbiAgICB9XG4gICAgb3V0cHV0Lmxlbmd0aCA9IG91dExlbjtcblxuICAgIGlmIChpbnB1dC5sZW5ndGggPD0gOSkge1xuICAgICAgaW5wdXQud29yZHNbMF0gPSAwO1xuICAgICAgaW5wdXQubGVuZ3RoID0gMTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTaGlmdCBieSA5IGxpbWJzXG4gICAgdmFyIHByZXYgPSBpbnB1dC53b3Jkc1s5XTtcbiAgICBvdXRwdXQud29yZHNbb3V0cHV0Lmxlbmd0aCsrXSA9IHByZXYgJiBtYXNrO1xuXG4gICAgZm9yIChpID0gMTA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHQgPSBpbnB1dC53b3Jkc1tpXSB8IDA7XG4gICAgICBpbnB1dC53b3Jkc1tpIC0gMTBdID0gKChuZXh0ICYgbWFzaykgPDwgNCkgfCAocHJldiA+Pj4gMjIpO1xuICAgICAgcHJldiA9IG5leHQ7XG4gICAgfVxuICAgIHByZXYgPj4+PSAyMjtcbiAgICBpbnB1dC53b3Jkc1tpIC0gMTBdID0gcHJldjtcbiAgICBpZiAocHJldiA9PT0gMCAmJiBpbnB1dC5sZW5ndGggPiAxMCkge1xuICAgICAgaW5wdXQubGVuZ3RoIC09IDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dC5sZW5ndGggLT0gOTtcbiAgICB9XG4gIH07XG5cbiAgSzI1Ni5wcm90b3R5cGUuaW11bEsgPSBmdW5jdGlvbiBpbXVsSyAobnVtKSB7XG4gICAgLy8gSyA9IDB4MTAwMDAwM2QxID0gWyAweDQwLCAweDNkMSBdXG4gICAgbnVtLndvcmRzW251bS5sZW5ndGhdID0gMDtcbiAgICBudW0ud29yZHNbbnVtLmxlbmd0aCArIDFdID0gMDtcbiAgICBudW0ubGVuZ3RoICs9IDI7XG5cbiAgICAvLyBib3VuZGVkIGF0OiAweDQwICogMHgzZmZmZmZmICsgMHgzZDAgPSAweDEwMDAwMDM5MFxuICAgIHZhciBsbyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3ID0gbnVtLndvcmRzW2ldIHwgMDtcbiAgICAgIGxvICs9IHcgKiAweDNkMTtcbiAgICAgIG51bS53b3Jkc1tpXSA9IGxvICYgMHgzZmZmZmZmO1xuICAgICAgbG8gPSB3ICogMHg0MCArICgobG8gLyAweDQwMDAwMDApIHwgMCk7XG4gICAgfVxuXG4gICAgLy8gRmFzdCBsZW5ndGggcmVkdWN0aW9uXG4gICAgaWYgKG51bS53b3Jkc1tudW0ubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIG51bS5sZW5ndGgtLTtcbiAgICAgIGlmIChudW0ud29yZHNbbnVtLmxlbmd0aCAtIDFdID09PSAwKSB7XG4gICAgICAgIG51bS5sZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfTtcblxuICBmdW5jdGlvbiBQMjI0ICgpIHtcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAncDIyNCcsXG4gICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDEnKTtcbiAgfVxuICBpbmhlcml0cyhQMjI0LCBNUHJpbWUpO1xuXG4gIGZ1bmN0aW9uIFAxOTIgKCkge1xuICAgIE1QcmltZS5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgICdwMTkyJyxcbiAgICAgICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZSBmZmZmZmZmZiBmZmZmZmZmZicpO1xuICB9XG4gIGluaGVyaXRzKFAxOTIsIE1QcmltZSk7XG5cbiAgZnVuY3Rpb24gUDI1NTE5ICgpIHtcbiAgICAvLyAyIF4gMjU1IC0gMTlcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAnMjU1MTknLFxuICAgICAgJzdmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZWQnKTtcbiAgfVxuICBpbmhlcml0cyhQMjU1MTksIE1QcmltZSk7XG5cbiAgUDI1NTE5LnByb3RvdHlwZS5pbXVsSyA9IGZ1bmN0aW9uIGltdWxLIChudW0pIHtcbiAgICAvLyBLID0gMHgxM1xuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoaSA9IChudW0ud29yZHNbaV0gfCAwKSAqIDB4MTMgKyBjYXJyeTtcbiAgICAgIHZhciBsbyA9IGhpICYgMHgzZmZmZmZmO1xuICAgICAgaGkgPj4+PSAyNjtcblxuICAgICAgbnVtLndvcmRzW2ldID0gbG87XG4gICAgICBjYXJyeSA9IGhpO1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIG51bS53b3Jkc1tudW0ubGVuZ3RoKytdID0gY2Fycnk7XG4gICAgfVxuICAgIHJldHVybiBudW07XG4gIH07XG5cbiAgLy8gRXhwb3J0ZWQgbW9zdGx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB1c2UgcGxhaW4gbmFtZSBpbnN0ZWFkXG4gIEJOLl9wcmltZSA9IGZ1bmN0aW9uIHByaW1lIChuYW1lKSB7XG4gICAgLy8gQ2FjaGVkIHZlcnNpb24gb2YgcHJpbWVcbiAgICBpZiAocHJpbWVzW25hbWVdKSByZXR1cm4gcHJpbWVzW25hbWVdO1xuXG4gICAgdmFyIHByaW1lO1xuICAgIGlmIChuYW1lID09PSAnazI1NicpIHtcbiAgICAgIHByaW1lID0gbmV3IEsyNTYoKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwMjI0Jykge1xuICAgICAgcHJpbWUgPSBuZXcgUDIyNCgpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3AxOTInKSB7XG4gICAgICBwcmltZSA9IG5ldyBQMTkyKCk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAncDI1NTE5Jykge1xuICAgICAgcHJpbWUgPSBuZXcgUDI1NTE5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBwcmltZSAnICsgbmFtZSk7XG4gICAgfVxuICAgIHByaW1lc1tuYW1lXSA9IHByaW1lO1xuXG4gICAgcmV0dXJuIHByaW1lO1xuICB9O1xuXG4gIC8vXG4gIC8vIEJhc2UgcmVkdWN0aW9uIGVuZ2luZVxuICAvL1xuICBmdW5jdGlvbiBSZWQgKG0pIHtcbiAgICBpZiAodHlwZW9mIG0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgcHJpbWUgPSBCTi5fcHJpbWUobSk7XG4gICAgICB0aGlzLm0gPSBwcmltZS5wO1xuICAgICAgdGhpcy5wcmltZSA9IHByaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQobS5ndG4oMSksICdtb2R1bHVzIG11c3QgYmUgZ3JlYXRlciB0aGFuIDEnKTtcbiAgICAgIHRoaXMubSA9IG07XG4gICAgICB0aGlzLnByaW1lID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBSZWQucHJvdG90eXBlLl92ZXJpZnkxID0gZnVuY3Rpb24gX3ZlcmlmeTEgKGEpIHtcbiAgICBhc3NlcnQoYS5uZWdhdGl2ZSA9PT0gMCwgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcG9zaXRpdmVzJyk7XG4gICAgYXNzZXJ0KGEucmVkLCAncmVkIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuX3ZlcmlmeTIgPSBmdW5jdGlvbiBfdmVyaWZ5MiAoYSwgYikge1xuICAgIGFzc2VydCgoYS5uZWdhdGl2ZSB8IGIubmVnYXRpdmUpID09PSAwLCAncmVkIHdvcmtzIG9ubHkgd2l0aCBwb3NpdGl2ZXMnKTtcbiAgICBhc3NlcnQoYS5yZWQgJiYgYS5yZWQgPT09IGIucmVkLFxuICAgICAgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmltb2QgPSBmdW5jdGlvbiBpbW9kIChhKSB7XG4gICAgaWYgKHRoaXMucHJpbWUpIHJldHVybiB0aGlzLnByaW1lLmlyZWR1Y2UoYSkuX2ZvcmNlUmVkKHRoaXMpO1xuICAgIHJldHVybiBhLnVtb2QodGhpcy5tKS5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5uZWcgPSBmdW5jdGlvbiBuZWcgKGEpIHtcbiAgICBpZiAoYS5pc1plcm8oKSkge1xuICAgICAgcmV0dXJuIGEuY2xvbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tLnN1YihhKS5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuXG4gICAgdmFyIHJlcyA9IGEuYWRkKGIpO1xuICAgIGlmIChyZXMuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzLmlzdWIodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pYWRkID0gZnVuY3Rpb24gaWFkZCAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5pYWRkKGIpO1xuICAgIGlmIChyZXMuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzLmlzdWIodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1YiAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5zdWIoYik7XG4gICAgaWYgKHJlcy5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzLmlhZGQodGhpcy5tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pc3ViID0gZnVuY3Rpb24gaXN1YiAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG5cbiAgICB2YXIgcmVzID0gYS5pc3ViKGIpO1xuICAgIGlmIChyZXMuY21wbigwKSA8IDApIHtcbiAgICAgIHJlcy5pYWRkKHRoaXMubSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5zaGwgPSBmdW5jdGlvbiBzaGwgKGEsIG51bSkge1xuICAgIHRoaXMuX3ZlcmlmeTEoYSk7XG4gICAgcmV0dXJuIHRoaXMuaW1vZChhLnVzaGxuKG51bSkpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaW11bCA9IGZ1bmN0aW9uIGltdWwgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuICAgIHJldHVybiB0aGlzLmltb2QoYS5pbXVsKGIpKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uIG11bCAoYSwgYikge1xuICAgIHRoaXMuX3ZlcmlmeTIoYSwgYik7XG4gICAgcmV0dXJuIHRoaXMuaW1vZChhLm11bChiKSk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pc3FyID0gZnVuY3Rpb24gaXNxciAoYSkge1xuICAgIHJldHVybiB0aGlzLmltdWwoYSwgYS5jbG9uZSgpKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnNxciA9IGZ1bmN0aW9uIHNxciAoYSkge1xuICAgIHJldHVybiB0aGlzLm11bChhLCBhKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnNxcnQgPSBmdW5jdGlvbiBzcXJ0IChhKSB7XG4gICAgaWYgKGEuaXNaZXJvKCkpIHJldHVybiBhLmNsb25lKCk7XG5cbiAgICB2YXIgbW9kMyA9IHRoaXMubS5hbmRsbigzKTtcbiAgICBhc3NlcnQobW9kMyAlIDIgPT09IDEpO1xuXG4gICAgLy8gRmFzdCBjYXNlXG4gICAgaWYgKG1vZDMgPT09IDMpIHtcbiAgICAgIHZhciBwb3cgPSB0aGlzLm0uYWRkKG5ldyBCTigxKSkuaXVzaHJuKDIpO1xuICAgICAgcmV0dXJuIHRoaXMucG93KGEsIHBvdyk7XG4gICAgfVxuXG4gICAgLy8gVG9uZWxsaS1TaGFua3MgYWxnb3JpdGhtIChUb3RhbGx5IHVub3B0aW1pemVkIGFuZCBzbG93KVxuICAgIC8vXG4gICAgLy8gRmluZCBRIGFuZCBTLCB0aGF0IFEgKiAyIF4gUyA9IChQIC0gMSlcbiAgICB2YXIgcSA9IHRoaXMubS5zdWJuKDEpO1xuICAgIHZhciBzID0gMDtcbiAgICB3aGlsZSAoIXEuaXNaZXJvKCkgJiYgcS5hbmRsbigxKSA9PT0gMCkge1xuICAgICAgcysrO1xuICAgICAgcS5pdXNocm4oMSk7XG4gICAgfVxuICAgIGFzc2VydCghcS5pc1plcm8oKSk7XG5cbiAgICB2YXIgb25lID0gbmV3IEJOKDEpLnRvUmVkKHRoaXMpO1xuICAgIHZhciBuT25lID0gb25lLnJlZE5lZygpO1xuXG4gICAgLy8gRmluZCBxdWFkcmF0aWMgbm9uLXJlc2lkdWVcbiAgICAvLyBOT1RFOiBNYXggaXMgc3VjaCBiZWNhdXNlIG9mIGdlbmVyYWxpemVkIFJpZW1hbm4gaHlwb3RoZXNpcy5cbiAgICB2YXIgbHBvdyA9IHRoaXMubS5zdWJuKDEpLml1c2hybigxKTtcbiAgICB2YXIgeiA9IHRoaXMubS5iaXRMZW5ndGgoKTtcbiAgICB6ID0gbmV3IEJOKDIgKiB6ICogeikudG9SZWQodGhpcyk7XG5cbiAgICB3aGlsZSAodGhpcy5wb3coeiwgbHBvdykuY21wKG5PbmUpICE9PSAwKSB7XG4gICAgICB6LnJlZElBZGQobk9uZSk7XG4gICAgfVxuXG4gICAgdmFyIGMgPSB0aGlzLnBvdyh6LCBxKTtcbiAgICB2YXIgciA9IHRoaXMucG93KGEsIHEuYWRkbigxKS5pdXNocm4oMSkpO1xuICAgIHZhciB0ID0gdGhpcy5wb3coYSwgcSk7XG4gICAgdmFyIG0gPSBzO1xuICAgIHdoaWxlICh0LmNtcChvbmUpICE9PSAwKSB7XG4gICAgICB2YXIgdG1wID0gdDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyB0bXAuY21wKG9uZSkgIT09IDA7IGkrKykge1xuICAgICAgICB0bXAgPSB0bXAucmVkU3FyKCk7XG4gICAgICB9XG4gICAgICBhc3NlcnQoaSA8IG0pO1xuICAgICAgdmFyIGIgPSB0aGlzLnBvdyhjLCBuZXcgQk4oMSkuaXVzaGxuKG0gLSBpIC0gMSkpO1xuXG4gICAgICByID0gci5yZWRNdWwoYik7XG4gICAgICBjID0gYi5yZWRTcXIoKTtcbiAgICAgIHQgPSB0LnJlZE11bChjKTtcbiAgICAgIG0gPSBpO1xuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaW52bSA9IGZ1bmN0aW9uIGludm0gKGEpIHtcbiAgICB2YXIgaW52ID0gYS5faW52bXAodGhpcy5tKTtcbiAgICBpZiAoaW52Lm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICBpbnYubmVnYXRpdmUgPSAwO1xuICAgICAgcmV0dXJuIHRoaXMuaW1vZChpbnYpLnJlZE5lZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbW9kKGludik7XG4gICAgfVxuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24gcG93IChhLCBudW0pIHtcbiAgICBpZiAobnVtLmlzWmVybygpKSByZXR1cm4gbmV3IEJOKDEpO1xuICAgIGlmIChudW0uY21wbigxKSA9PT0gMCkgcmV0dXJuIGEuY2xvbmUoKTtcblxuICAgIHZhciB3aW5kb3dTaXplID0gNDtcbiAgICB2YXIgd25kID0gbmV3IEFycmF5KDEgPDwgd2luZG93U2l6ZSk7XG4gICAgd25kWzBdID0gbmV3IEJOKDEpLnRvUmVkKHRoaXMpO1xuICAgIHduZFsxXSA9IGE7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCB3bmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHduZFtpXSA9IHRoaXMubXVsKHduZFtpIC0gMV0sIGEpO1xuICAgIH1cblxuICAgIHZhciByZXMgPSB3bmRbMF07XG4gICAgdmFyIGN1cnJlbnQgPSAwO1xuICAgIHZhciBjdXJyZW50TGVuID0gMDtcbiAgICB2YXIgc3RhcnQgPSBudW0uYml0TGVuZ3RoKCkgJSAyNjtcbiAgICBpZiAoc3RhcnQgPT09IDApIHtcbiAgICAgIHN0YXJ0ID0gMjY7XG4gICAgfVxuXG4gICAgZm9yIChpID0gbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgd29yZCA9IG51bS53b3Jkc1tpXTtcbiAgICAgIGZvciAodmFyIGogPSBzdGFydCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIHZhciBiaXQgPSAod29yZCA+PiBqKSAmIDE7XG4gICAgICAgIGlmIChyZXMgIT09IHduZFswXSkge1xuICAgICAgICAgIHJlcyA9IHRoaXMuc3FyKHJlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYml0ID09PSAwICYmIGN1cnJlbnQgPT09IDApIHtcbiAgICAgICAgICBjdXJyZW50TGVuID0gMDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnQgPDw9IDE7XG4gICAgICAgIGN1cnJlbnQgfD0gYml0O1xuICAgICAgICBjdXJyZW50TGVuKys7XG4gICAgICAgIGlmIChjdXJyZW50TGVuICE9PSB3aW5kb3dTaXplICYmIChpICE9PSAwIHx8IGogIT09IDApKSBjb250aW51ZTtcblxuICAgICAgICByZXMgPSB0aGlzLm11bChyZXMsIHduZFtjdXJyZW50XSk7XG4gICAgICAgIGN1cnJlbnRMZW4gPSAwO1xuICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gMjY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmNvbnZlcnRUbyA9IGZ1bmN0aW9uIGNvbnZlcnRUbyAobnVtKSB7XG4gICAgdmFyIHIgPSBudW0udW1vZCh0aGlzLm0pO1xuXG4gICAgcmV0dXJuIHIgPT09IG51bSA/IHIuY2xvbmUoKSA6IHI7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5jb252ZXJ0RnJvbSA9IGZ1bmN0aW9uIGNvbnZlcnRGcm9tIChudW0pIHtcbiAgICB2YXIgcmVzID0gbnVtLmNsb25lKCk7XG4gICAgcmVzLnJlZCA9IG51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICAvL1xuICAvLyBNb250Z29tZXJ5IG1ldGhvZCBlbmdpbmVcbiAgLy9cblxuICBCTi5tb250ID0gZnVuY3Rpb24gbW9udCAobnVtKSB7XG4gICAgcmV0dXJuIG5ldyBNb250KG51bSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gTW9udCAobSkge1xuICAgIFJlZC5jYWxsKHRoaXMsIG0pO1xuXG4gICAgdGhpcy5zaGlmdCA9IHRoaXMubS5iaXRMZW5ndGgoKTtcbiAgICBpZiAodGhpcy5zaGlmdCAlIDI2ICE9PSAwKSB7XG4gICAgICB0aGlzLnNoaWZ0ICs9IDI2IC0gKHRoaXMuc2hpZnQgJSAyNik7XG4gICAgfVxuXG4gICAgdGhpcy5yID0gbmV3IEJOKDEpLml1c2hsbih0aGlzLnNoaWZ0KTtcbiAgICB0aGlzLnIyID0gdGhpcy5pbW9kKHRoaXMuci5zcXIoKSk7XG4gICAgdGhpcy5yaW52ID0gdGhpcy5yLl9pbnZtcCh0aGlzLm0pO1xuXG4gICAgdGhpcy5taW52ID0gdGhpcy5yaW52Lm11bCh0aGlzLnIpLmlzdWJuKDEpLmRpdih0aGlzLm0pO1xuICAgIHRoaXMubWludiA9IHRoaXMubWludi51bW9kKHRoaXMucik7XG4gICAgdGhpcy5taW52ID0gdGhpcy5yLnN1Yih0aGlzLm1pbnYpO1xuICB9XG4gIGluaGVyaXRzKE1vbnQsIFJlZCk7XG5cbiAgTW9udC5wcm90b3R5cGUuY29udmVydFRvID0gZnVuY3Rpb24gY29udmVydFRvIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5pbW9kKG51bS51c2hsbih0aGlzLnNoaWZ0KSk7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUuY29udmVydEZyb20gPSBmdW5jdGlvbiBjb252ZXJ0RnJvbSAobnVtKSB7XG4gICAgdmFyIHIgPSB0aGlzLmltb2QobnVtLm11bCh0aGlzLnJpbnYpKTtcbiAgICByLnJlZCA9IG51bGw7XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUuaW11bCA9IGZ1bmN0aW9uIGltdWwgKGEsIGIpIHtcbiAgICBpZiAoYS5pc1plcm8oKSB8fCBiLmlzWmVybygpKSB7XG4gICAgICBhLndvcmRzWzBdID0gMDtcbiAgICAgIGEubGVuZ3RoID0gMTtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHZhciB0ID0gYS5pbXVsKGIpO1xuICAgIHZhciBjID0gdC5tYXNrbih0aGlzLnNoaWZ0KS5tdWwodGhpcy5taW52KS5pbWFza24odGhpcy5zaGlmdCkubXVsKHRoaXMubSk7XG4gICAgdmFyIHUgPSB0LmlzdWIoYykuaXVzaHJuKHRoaXMuc2hpZnQpO1xuICAgIHZhciByZXMgPSB1O1xuXG4gICAgaWYgKHUuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzID0gdS5pc3ViKHRoaXMubSk7XG4gICAgfSBlbHNlIGlmICh1LmNtcG4oMCkgPCAwKSB7XG4gICAgICByZXMgPSB1LmlhZGQodGhpcy5tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcblxuICBNb250LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwgKGEsIGIpIHtcbiAgICBpZiAoYS5pc1plcm8oKSB8fCBiLmlzWmVybygpKSByZXR1cm4gbmV3IEJOKDApLl9mb3JjZVJlZCh0aGlzKTtcblxuICAgIHZhciB0ID0gYS5tdWwoYik7XG4gICAgdmFyIGMgPSB0Lm1hc2tuKHRoaXMuc2hpZnQpLm11bCh0aGlzLm1pbnYpLmltYXNrbih0aGlzLnNoaWZ0KS5tdWwodGhpcy5tKTtcbiAgICB2YXIgdSA9IHQuaXN1YihjKS5pdXNocm4odGhpcy5zaGlmdCk7XG4gICAgdmFyIHJlcyA9IHU7XG4gICAgaWYgKHUuY21wKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmVzID0gdS5pc3ViKHRoaXMubSk7XG4gICAgfSBlbHNlIGlmICh1LmNtcG4oMCkgPCAwKSB7XG4gICAgICByZXMgPSB1LmlhZGQodGhpcy5tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcblxuICBNb250LnByb3RvdHlwZS5pbnZtID0gZnVuY3Rpb24gaW52bSAoYSkge1xuICAgIC8vIChBUileLTEgKiBSXjIgPSAoQV4tMSAqIFJeLTEpICogUl4yID0gQV4tMSAqIFJcbiAgICB2YXIgcmVzID0gdGhpcy5pbW9kKGEuX2ludm1wKHRoaXMubSkubXVsKHRoaXMucjIpKTtcbiAgICByZXR1cm4gcmVzLl9mb3JjZVJlZCh0aGlzKTtcbiAgfTtcbn0pKHR5cGVvZiBtb2R1bGUgPT09ICd1bmRlZmluZWQnIHx8IG1vZHVsZSwgdGhpcyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaGFyZGZvcmtzID0gW1xuICAgIFsnY2hhaW5zdGFydCcsIHJlcXVpcmUoJy4vY2hhaW5zdGFydC5qc29uJyldLFxuICAgIFsnaG9tZXN0ZWFkJywgcmVxdWlyZSgnLi9ob21lc3RlYWQuanNvbicpXSxcbiAgICBbJ2RhbycsIHJlcXVpcmUoJy4vZGFvLmpzb24nKV0sXG4gICAgWyd0YW5nZXJpbmVXaGlzdGxlJywgcmVxdWlyZSgnLi90YW5nZXJpbmVXaGlzdGxlLmpzb24nKV0sXG4gICAgWydzcHVyaW91c0RyYWdvbicsIHJlcXVpcmUoJy4vc3B1cmlvdXNEcmFnb24uanNvbicpXSxcbiAgICBbJ2J5emFudGl1bScsIHJlcXVpcmUoJy4vYnl6YW50aXVtLmpzb24nKV0sXG4gICAgWydjb25zdGFudGlub3BsZScsIHJlcXVpcmUoJy4vY29uc3RhbnRpbm9wbGUuanNvbicpXSxcbiAgICBbJ3BldGVyc2J1cmcnLCByZXF1aXJlKCcuL3BldGVyc2J1cmcuanNvbicpXSxcbiAgICBbJ2lzdGFuYnVsJywgcmVxdWlyZSgnLi9pc3RhbmJ1bC5qc29uJyldLFxuXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciBudW1iZXJUb0JOID0gcmVxdWlyZSgnbnVtYmVyLXRvLWJuJyk7XG5cbnZhciB6ZXJvID0gbmV3IEJOKDApO1xudmFyIG5lZ2F0aXZlMSA9IG5ldyBCTigtMSk7XG5cbi8vIGNvbXBsZXRlIGV0aGVyZXVtIHVuaXQgbWFwXG52YXIgdW5pdE1hcCA9IHtcbiAgJ25vZXRoZXInOiAnMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ3dlaSc6ICcxJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAna3dlaSc6ICcxMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnS3dlaSc6ICcxMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnYmFiYmFnZSc6ICcxMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnZmVtdG9ldGhlcic6ICcxMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbXdlaSc6ICcxMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnTXdlaSc6ICcxMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbG92ZWxhY2UnOiAnMTAwMDAwMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ3BpY29ldGhlcic6ICcxMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnZ3dlaSc6ICcxMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnR3dlaSc6ICcxMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnc2hhbm5vbic6ICcxMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbmFub2V0aGVyJzogJzEwMDAwMDAwMDAnLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICduYW5vJzogJzEwMDAwMDAwMDAnLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICdzemFibyc6ICcxMDAwMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbWljcm9ldGhlcic6ICcxMDAwMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbWljcm8nOiAnMTAwMDAwMDAwMDAwMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ2Zpbm5leSc6ICcxMDAwMDAwMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbWlsbGlldGhlcic6ICcxMDAwMDAwMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAnbWlsbGknOiAnMTAwMDAwMDAwMDAwMDAwMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ2V0aGVyJzogJzEwMDAwMDAwMDAwMDAwMDAwMDAnLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICdrZXRoZXInOiAnMTAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ2dyYW5kJzogJzEwMDAwMDAwMDAwMDAwMDAwMDAwMDAnLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICdtZXRoZXInOiAnMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgJ2dldGhlcic6ICcxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAndGV0aGVyJzogJzEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnIH07XG5cbi8qKlxuICogUmV0dXJucyB2YWx1ZSBvZiB1bml0IGluIFdlaVxuICpcbiAqIEBtZXRob2QgZ2V0VmFsdWVPZlVuaXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB1bml0IHRoZSB1bml0IHRvIGNvbnZlcnQgdG8sIGRlZmF1bHQgZXRoZXJcbiAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9IHZhbHVlIG9mIHRoZSB1bml0IChpbiBXZWkpXG4gKiBAdGhyb3dzIGVycm9yIGlmIHRoZSB1bml0IGlzIG5vdCBjb3JyZWN0OndcbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWVPZlVuaXQodW5pdElucHV0KSB7XG4gIHZhciB1bml0ID0gdW5pdElucHV0ID8gdW5pdElucHV0LnRvTG93ZXJDYXNlKCkgOiAnZXRoZXInO1xuICB2YXIgdW5pdFZhbHVlID0gdW5pdE1hcFt1bml0XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIGlmICh0eXBlb2YgdW5pdFZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXVuaXRdIHRoZSB1bml0IHByb3ZpZGVkICcgKyB1bml0SW5wdXQgKyAnIGRvZXNuXFwndCBleGlzdHMsIHBsZWFzZSB1c2UgdGhlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHVuaXRzICcgKyBKU09OLnN0cmluZ2lmeSh1bml0TWFwLCBudWxsLCAyKSk7XG4gIH1cblxuICByZXR1cm4gbmV3IEJOKHVuaXRWYWx1ZSwgMTApO1xufVxuXG5mdW5jdGlvbiBudW1iZXJUb1N0cmluZyhhcmcpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCFhcmcubWF0Y2goL14tP1swLTkuXSskLykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignd2hpbGUgY29udmVydGluZyBudW1iZXIgdG8gc3RyaW5nLCBpbnZhbGlkIG51bWJlciB2YWx1ZSBcXCcnICsgYXJnICsgJ1xcJywgc2hvdWxkIGJlIGEgbnVtYmVyIG1hdGNoaW5nICheLT9bMC05Ll0rKS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZztcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBTdHJpbmcoYXJnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcudG9TdHJpbmcgJiYgKGFyZy50b1R3b3MgfHwgYXJnLmRpdmlkZWRUb0ludGVnZXJCeSkpIHtcbiAgICBpZiAoYXJnLnRvUHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGFyZy50b1ByZWNpc2lvbigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIGFyZy50b1N0cmluZygxMCk7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcignd2hpbGUgY29udmVydGluZyBudW1iZXIgdG8gc3RyaW5nLCBpbnZhbGlkIG51bWJlciB2YWx1ZSBcXCcnICsgYXJnICsgJ1xcJyB0eXBlICcgKyB0eXBlb2YgYXJnICsgJy4nKTtcbn1cblxuZnVuY3Rpb24gZnJvbVdlaSh3ZWlJbnB1dCwgdW5pdCwgb3B0aW9uc0lucHV0KSB7XG4gIHZhciB3ZWkgPSBudW1iZXJUb0JOKHdlaUlucHV0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB2YXIgbmVnYXRpdmUgPSB3ZWkubHQoemVybyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgdmFyIGJhc2UgPSBnZXRWYWx1ZU9mVW5pdCh1bml0KTtcbiAgdmFyIGJhc2VMZW5ndGggPSB1bml0TWFwW3VuaXRdLmxlbmd0aCAtIDEgfHwgMTtcbiAgdmFyIG9wdGlvbnMgPSBvcHRpb25zSW5wdXQgfHwge307XG5cbiAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgd2VpID0gd2VpLm11bChuZWdhdGl2ZTEpO1xuICB9XG5cbiAgdmFyIGZyYWN0aW9uID0gd2VpLm1vZChiYXNlKS50b1N0cmluZygxMCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICB3aGlsZSAoZnJhY3Rpb24ubGVuZ3RoIDwgYmFzZUxlbmd0aCkge1xuICAgIGZyYWN0aW9uID0gJzAnICsgZnJhY3Rpb247XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucGFkKSB7XG4gICAgZnJhY3Rpb24gPSBmcmFjdGlvbi5tYXRjaCgvXihbMC05XSpbMS05XXwwKSgwKikvKVsxXTtcbiAgfVxuXG4gIHZhciB3aG9sZSA9IHdlaS5kaXYoYmFzZSkudG9TdHJpbmcoMTApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgaWYgKG9wdGlvbnMuY29tbWlmeSkge1xuICAgIHdob2xlID0gd2hvbGUucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9ICcnICsgd2hvbGUgKyAoZnJhY3Rpb24gPT0gJzAnID8gJycgOiAnLicgKyBmcmFjdGlvbik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBpZiAobmVnYXRpdmUpIHtcbiAgICB2YWx1ZSA9ICctJyArIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0b1dlaShldGhlcklucHV0LCB1bml0KSB7XG4gIHZhciBldGhlciA9IG51bWJlclRvU3RyaW5nKGV0aGVySW5wdXQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHZhciBiYXNlID0gZ2V0VmFsdWVPZlVuaXQodW5pdCk7XG4gIHZhciBiYXNlTGVuZ3RoID0gdW5pdE1hcFt1bml0XS5sZW5ndGggLSAxIHx8IDE7XG5cbiAgLy8gSXMgaXQgbmVnYXRpdmU/XG4gIHZhciBuZWdhdGl2ZSA9IGV0aGVyLnN1YnN0cmluZygwLCAxKSA9PT0gJy0nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChuZWdhdGl2ZSkge1xuICAgIGV0aGVyID0gZXRoZXIuc3Vic3RyaW5nKDEpO1xuICB9XG5cbiAgaWYgKGV0aGVyID09PSAnLicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1tldGhqcy11bml0XSB3aGlsZSBjb252ZXJ0aW5nIG51bWJlciAnICsgZXRoZXJJbnB1dCArICcgdG8gd2VpLCBpbnZhbGlkIHZhbHVlJyk7XG4gIH1cblxuICAvLyBTcGxpdCBpdCBpbnRvIGEgd2hvbGUgYW5kIGZyYWN0aW9uYWwgcGFydFxuICB2YXIgY29tcHMgPSBldGhlci5zcGxpdCgnLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChjb21wcy5sZW5ndGggPiAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdbZXRoanMtdW5pdF0gd2hpbGUgY29udmVydGluZyBudW1iZXIgJyArIGV0aGVySW5wdXQgKyAnIHRvIHdlaSwgIHRvbyBtYW55IGRlY2ltYWwgcG9pbnRzJyk7XG4gIH1cblxuICB2YXIgd2hvbGUgPSBjb21wc1swXSxcbiAgICAgIGZyYWN0aW9uID0gY29tcHNbMV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBpZiAoIXdob2xlKSB7XG4gICAgd2hvbGUgPSAnMCc7XG4gIH1cbiAgaWYgKCFmcmFjdGlvbikge1xuICAgIGZyYWN0aW9uID0gJzAnO1xuICB9XG4gIGlmIChmcmFjdGlvbi5sZW5ndGggPiBiYXNlTGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdbZXRoanMtdW5pdF0gd2hpbGUgY29udmVydGluZyBudW1iZXIgJyArIGV0aGVySW5wdXQgKyAnIHRvIHdlaSwgdG9vIG1hbnkgZGVjaW1hbCBwbGFjZXMnKTtcbiAgfVxuXG4gIHdoaWxlIChmcmFjdGlvbi5sZW5ndGggPCBiYXNlTGVuZ3RoKSB7XG4gICAgZnJhY3Rpb24gKz0gJzAnO1xuICB9XG5cbiAgd2hvbGUgPSBuZXcgQk4od2hvbGUpO1xuICBmcmFjdGlvbiA9IG5ldyBCTihmcmFjdGlvbik7XG4gIHZhciB3ZWkgPSB3aG9sZS5tdWwoYmFzZSkuYWRkKGZyYWN0aW9uKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIGlmIChuZWdhdGl2ZSkge1xuICAgIHdlaSA9IHdlaS5tdWwobmVnYXRpdmUxKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgQk4od2VpLnRvU3RyaW5nKDEwKSwgMTApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdW5pdE1hcDogdW5pdE1hcCxcbiAgbnVtYmVyVG9TdHJpbmc6IG51bWJlclRvU3RyaW5nLFxuICBnZXRWYWx1ZU9mVW5pdDogZ2V0VmFsdWVPZlVuaXQsXG4gIGZyb21XZWk6IGZyb21XZWksXG4gIHRvV2VpOiB0b1dlaVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4LmpzJylcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNIZXhQcmVmaXhlZCA9IHJlcXVpcmUoJ2lzLWhleC1wcmVmaXhlZCcpO1xudmFyIHN0cmlwSGV4UHJlZml4ID0gcmVxdWlyZSgnc3RyaXAtaGV4LXByZWZpeCcpO1xuXG4vKipcbiAqIFBhZHMgYSBgU3RyaW5nYCB0byBoYXZlIGFuIGV2ZW4gbGVuZ3RoXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ30gb3V0cHV0XG4gKi9cbmZ1bmN0aW9uIHBhZFRvRXZlbih2YWx1ZSkge1xuICB2YXIgYSA9IHZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgaWYgKHR5cGVvZiBhICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXV0aWxdIHdoaWxlIHBhZGRpbmcgdG8gZXZlbiwgdmFsdWUgbXVzdCBiZSBzdHJpbmcsIGlzIGN1cnJlbnRseSAnICsgdHlwZW9mIGEgKyAnLCB3aGlsZSBwYWRUb0V2ZW4uJyk7XG4gIH1cblxuICBpZiAoYS5sZW5ndGggJSAyKSB7XG4gICAgYSA9ICcwJyArIGE7XG4gIH1cblxuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGBOdW1iZXJgIGludG8gYSBoZXggYFN0cmluZ2BcbiAqIEBwYXJhbSB7TnVtYmVyfSBpXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGludFRvSGV4KGkpIHtcbiAgdmFyIGhleCA9IGkudG9TdHJpbmcoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgcmV0dXJuICcweCcgKyBoZXg7XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gYE51bWJlcmAgdG8gYSBgQnVmZmVyYFxuICogQHBhcmFtIHtOdW1iZXJ9IGlcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZnVuY3Rpb24gaW50VG9CdWZmZXIoaSkge1xuICB2YXIgaGV4ID0gaW50VG9IZXgoaSk7XG5cbiAgcmV0dXJuIG5ldyBCdWZmZXIocGFkVG9FdmVuKGhleC5zbGljZSgyKSksICdoZXgnKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGJpbmFyeSBzaXplIG9mIGEgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldEJpbmFyeVNpemUoc3RyKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXV0aWxdIHdoaWxlIGdldHRpbmcgYmluYXJ5IHNpemUsIG1ldGhvZCBnZXRCaW5hcnlTaXplIHJlcXVpcmVzIGlucHV0IFxcJ3N0clxcJyB0byBiZSB0eXBlIFN0cmluZywgZ290IFxcJycgKyB0eXBlb2Ygc3RyICsgJ1xcJy4nKTtcbiAgfVxuXG4gIHJldHVybiBCdWZmZXIuYnl0ZUxlbmd0aChzdHIsICd1dGY4Jyk7XG59XG5cbi8qKlxuICogUmV0dXJucyBUUlVFIGlmIHRoZSBmaXJzdCBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgYWxsIGVsZW1lbnRzXG4gKiBmcm9tIHRoZSBzZWNvbmQgb25lLiBGQUxTRSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHthcnJheX0gc3VwZXJzZXRcbiAqIEBwYXJhbSB7YXJyYXl9IHN1YnNldFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBhcnJheUNvbnRhaW5zQXJyYXkoc3VwZXJzZXQsIHN1YnNldCwgc29tZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdXBlcnNldCkgIT09IHRydWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1tldGhqcy11dGlsXSBtZXRob2QgYXJyYXlDb250YWluc0FycmF5IHJlcXVpcmVzIGlucHV0IFxcJ3N1cGVyc2V0XFwnIHRvIGJlIGFuIGFycmF5IGdvdCB0eXBlIFxcJycgKyB0eXBlb2Ygc3VwZXJzZXQgKyAnXFwnJyk7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic2V0KSAhPT0gdHJ1ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXV0aWxdIG1ldGhvZCBhcnJheUNvbnRhaW5zQXJyYXkgcmVxdWlyZXMgaW5wdXQgXFwnc3Vic2V0XFwnIHRvIGJlIGFuIGFycmF5IGdvdCB0eXBlIFxcJycgKyB0eXBlb2Ygc3Vic2V0ICsgJ1xcJycpO1xuICB9XG5cbiAgcmV0dXJuIHN1YnNldFtCb29sZWFuKHNvbWUpICYmICdzb21lJyB8fCAnZXZlcnknXShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gc3VwZXJzZXQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbiAgfSk7XG59XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgdXRmOCBmcm9tIGl0J3MgaGV4IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQG1ldGhvZCB0b1V0ZjhcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgaW4gaGV4XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBhc2NpaSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgaGV4IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRvVXRmOChoZXgpIHtcbiAgdmFyIGJ1ZmZlclZhbHVlID0gbmV3IEJ1ZmZlcihwYWRUb0V2ZW4oc3RyaXBIZXhQcmVmaXgoaGV4KS5yZXBsYWNlKC9eMCt8MCskL2csICcnKSksICdoZXgnKTtcblxuICByZXR1cm4gYnVmZmVyVmFsdWUudG9TdHJpbmcoJ3V0ZjgnKTtcbn1cblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGdldCBhc2NpaSBmcm9tIGl0J3MgaGV4IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQG1ldGhvZCB0b0FzY2lpXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIGluIGhleFxuICogQHJldHVybnMge1N0cmluZ30gYXNjaWkgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGhleCB2YWx1ZVxuICovXG5mdW5jdGlvbiB0b0FzY2lpKGhleCkge1xuICB2YXIgc3RyID0gJyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgdmFyIGkgPSAwLFxuICAgICAgbCA9IGhleC5sZW5ndGg7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBpZiAoaGV4LnN1YnN0cmluZygwLCAyKSA9PT0gJzB4Jykge1xuICAgIGkgPSAyO1xuICB9XG5cbiAgZm9yICg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICB2YXIgY29kZSA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSwgMiksIDE2KTtcbiAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgaGV4IHJlcHJlc2VudGF0aW9uIChwcmVmaXhlZCBieSAweCkgb2YgdXRmOCBzdHJpbmdcbiAqXG4gKiBAbWV0aG9kIGZyb21VdGY4XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9uYWwgcGFkZGluZ1xuICogQHJldHVybnMge1N0cmluZ30gaGV4IHJlcHJlc2VudGF0aW9uIG9mIGlucHV0IHN0cmluZ1xuICovXG5mdW5jdGlvbiBmcm9tVXRmOChzdHJpbmdWYWx1ZSkge1xuICB2YXIgc3RyID0gbmV3IEJ1ZmZlcihzdHJpbmdWYWx1ZSwgJ3V0ZjgnKTtcblxuICByZXR1cm4gJzB4JyArIHBhZFRvRXZlbihzdHIudG9TdHJpbmcoJ2hleCcpKS5yZXBsYWNlKC9eMCt8MCskL2csICcnKTtcbn1cblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGdldCBoZXggcmVwcmVzZW50YXRpb24gKHByZWZpeGVkIGJ5IDB4KSBvZiBhc2NpaSBzdHJpbmdcbiAqXG4gKiBAbWV0aG9kIGZyb21Bc2NpaVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbmFsIHBhZGRpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGhleCByZXByZXNlbnRhdGlvbiBvZiBpbnB1dCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZnJvbUFzY2lpKHN0cmluZ1ZhbHVlKSB7XG4gIHZhciBoZXggPSAnJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ1ZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHZhciBjb2RlID0gc3RyaW5nVmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICB2YXIgbiA9IGNvZGUudG9TdHJpbmcoMTYpO1xuICAgIGhleCArPSBuLmxlbmd0aCA8IDIgPyAnMCcgKyBuIDogbjtcbiAgfVxuXG4gIHJldHVybiAnMHgnICsgaGV4O1xufVxuXG4vKipcbiAqIGdldEtleXMoW3thOiAxLCBiOiAyfSwge2E6IDMsIGI6IDR9XSwgJ2EnKSA9PiBbMSwgM11cbiAqXG4gKiBAbWV0aG9kIGdldEtleXMgZ2V0IHNwZWNpZmljIGtleSBmcm9tIGlubmVyIG9iamVjdCBhcnJheSBvZiBvYmplY3RzXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1zXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFsbG93RW1wdHlcbiAqIEByZXR1cm5zIHtBcnJheX0gb3V0cHV0IGp1c3QgYSBzaW1wbGUgYXJyYXkgb2Ygb3V0cHV0IGtleXNcbiAqL1xuZnVuY3Rpb24gZ2V0S2V5cyhwYXJhbXMsIGtleSwgYWxsb3dFbXB0eSkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1zKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXV0aWxdIG1ldGhvZCBnZXRLZXlzIGV4cGVjdGluZyB0eXBlIEFycmF5IGFzIFxcJ3BhcmFtc1xcJyBpbnB1dCwgZ290IFxcJycgKyB0eXBlb2YgcGFyYW1zICsgJ1xcJycpO1xuICB9XG4gIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignW2V0aGpzLXV0aWxdIG1ldGhvZCBnZXRLZXlzIGV4cGVjdGluZyB0eXBlIFN0cmluZyBmb3IgaW5wdXQgXFwna2V5XFwnIGdvdCBcXCcnICsgdHlwZW9mIGtleSArICdcXCcuJyk7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB2YXIgdmFsdWUgPSBwYXJhbXNbaV1ba2V5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChhbGxvd0VtcHR5ICYmICF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhYmknKTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJcyB0aGUgc3RyaW5nIGEgaGV4IHN0cmluZy5cbiAqXG4gKiBAbWV0aG9kIGNoZWNrIGlmIHN0cmluZyBpcyBoZXggc3RyaW5nIG9mIHNwZWNpZmljIGxlbmd0aFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gb3V0cHV0IHRoZSBzdHJpbmcgaXMgYSBoZXggc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGlzSGV4U3RyaW5nKHZhbHVlLCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgIXZhbHVlLm1hdGNoKC9eMHhbMC05QS1GYS1mXSokLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAobGVuZ3RoICYmIHZhbHVlLmxlbmd0aCAhPT0gMiArIDIgKiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5Q29udGFpbnNBcnJheTogYXJyYXlDb250YWluc0FycmF5LFxuICBpbnRUb0J1ZmZlcjogaW50VG9CdWZmZXIsXG4gIGdldEJpbmFyeVNpemU6IGdldEJpbmFyeVNpemUsXG4gIGlzSGV4UHJlZml4ZWQ6IGlzSGV4UHJlZml4ZWQsXG4gIHN0cmlwSGV4UHJlZml4OiBzdHJpcEhleFByZWZpeCxcbiAgcGFkVG9FdmVuOiBwYWRUb0V2ZW4sXG4gIGludFRvSGV4OiBpbnRUb0hleCxcbiAgZnJvbUFzY2lpOiBmcm9tQXNjaWksXG4gIGZyb21VdGY4OiBmcm9tVXRmOCxcbiAgdG9Bc2NpaTogdG9Bc2NpaSxcbiAgdG9VdGY4OiB0b1V0ZjgsXG4gIGdldEtleXM6IGdldEtleXMsXG4gIGlzSGV4U3RyaW5nOiBpc0hleFN0cmluZ1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY2hhaW5zXzEgPSByZXF1aXJlKFwiLi9jaGFpbnNcIik7XG52YXIgaGFyZGZvcmtzXzEgPSByZXF1aXJlKFwiLi9oYXJkZm9ya3NcIik7XG4vKipcbiAqIENvbW1vbiBjbGFzcyB0byBhY2Nlc3MgY2hhaW4gYW5kIGhhcmRmb3JrIHBhcmFtZXRlcnNcbiAqL1xudmFyIENvbW1vbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gY2hhaW4gU3RyaW5nICgnbWFpbm5ldCcpIG9yIE51bWJlciAoMSkgY2hhaW5cbiAgICAgKiBAcGFyYW0gaGFyZGZvcmsgU3RyaW5nIGlkZW50aWZpZXIgKCdieXphbnRpdW0nKSBmb3IgaGFyZGZvcmsgKG9wdGlvbmFsKVxuICAgICAqIEBwYXJhbSBzdXBwb3J0ZWRIYXJkZm9ya3MgTGltaXQgcGFyYW1ldGVyIHJldHVybnMgdG8gdGhlIGdpdmVuIGhhcmRmb3JrcyAob3B0aW9uYWwpXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ29tbW9uKGNoYWluLCBoYXJkZm9yaywgc3VwcG9ydGVkSGFyZGZvcmtzKSB7XG4gICAgICAgIHRoaXMuX2NoYWluUGFyYW1zID0gdGhpcy5zZXRDaGFpbihjaGFpbik7XG4gICAgICAgIHRoaXMuX2hhcmRmb3JrID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3VwcG9ydGVkSGFyZGZvcmtzID0gc3VwcG9ydGVkSGFyZGZvcmtzID09PSB1bmRlZmluZWQgPyBbXSA6IHN1cHBvcnRlZEhhcmRmb3JrcztcbiAgICAgICAgaWYgKGhhcmRmb3JrKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhhcmRmb3JrKGhhcmRmb3JrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ29tbW9uIG9iamVjdCBmb3IgYSBjdXN0b20gY2hhaW4sIGJhc2VkIG9uIGEgc3RhbmRhcmQgb25lLiBJdCB1c2VzIGFsbCB0aGUgW1tDaGFpbl1dXG4gICAgICogcGFyYW1zIGZyb20gW1tiYXNlQ2hhaW5dXSBleGNlcHQgdGhlIG9uZXMgb3ZlcnJpZGRlbiBpbiBbW2N1c3RvbUNoYWluUGFyYW1zXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYmFzZUNoYWluIFRoZSBuYW1lIChgbWFpbm5ldGApIG9yIGlkIChgMWApIG9mIGEgc3RhbmRhcmQgY2hhaW4gdXNlZCB0byBiYXNlIHRoZSBjdXN0b21cbiAgICAgKiBjaGFpbiBwYXJhbXMgb24uXG4gICAgICogQHBhcmFtIGN1c3RvbUNoYWluUGFyYW1zIFRoZSBjdXN0b20gcGFyYW1ldGVycyBvZiB0aGUgY2hhaW4uXG4gICAgICogQHBhcmFtIGhhcmRmb3JrIFN0cmluZyBpZGVudGlmaWVyICgnYnl6YW50aXVtJykgZm9yIGhhcmRmb3JrIChvcHRpb25hbClcbiAgICAgKiBAcGFyYW0gc3VwcG9ydGVkSGFyZGZvcmtzIExpbWl0IHBhcmFtZXRlciByZXR1cm5zIHRvIHRoZSBnaXZlbiBoYXJkZm9ya3MgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIENvbW1vbi5mb3JDdXN0b21DaGFpbiA9IGZ1bmN0aW9uIChiYXNlQ2hhaW4sIGN1c3RvbUNoYWluUGFyYW1zLCBoYXJkZm9yaywgc3VwcG9ydGVkSGFyZGZvcmtzKSB7XG4gICAgICAgIHZhciBzdGFuZGFyZENoYWluUGFyYW1zID0gQ29tbW9uLl9nZXRDaGFpblBhcmFtcyhiYXNlQ2hhaW4pO1xuICAgICAgICByZXR1cm4gbmV3IENvbW1vbihfX2Fzc2lnbih7fSwgc3RhbmRhcmRDaGFpblBhcmFtcywgY3VzdG9tQ2hhaW5QYXJhbXMpLCBoYXJkZm9yaywgc3VwcG9ydGVkSGFyZGZvcmtzKTtcbiAgICB9O1xuICAgIENvbW1vbi5fZ2V0Q2hhaW5QYXJhbXMgPSBmdW5jdGlvbiAoY2hhaW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGFpbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChjaGFpbnNfMS5jaGFpbnNbJ25hbWVzJ11bY2hhaW5dKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYWluc18xLmNoYWluc1tjaGFpbnNfMS5jaGFpbnNbJ25hbWVzJ11bY2hhaW5dXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYWluIHdpdGggSUQgXCIgKyBjaGFpbiArIFwiIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYWluc18xLmNoYWluc1tjaGFpbl0pIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbnNfMS5jaGFpbnNbY2hhaW5dO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYWluIHdpdGggbmFtZSBcIiArIGNoYWluICsgXCIgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNoYWluXG4gICAgICogQHBhcmFtIGNoYWluIFN0cmluZyAoJ21haW5uZXQnKSBvciBOdW1iZXIgKDEpIGNoYWluXG4gICAgICogICAgIHJlcHJlc2VudGF0aW9uLiBPciwgYSBEaWN0aW9uYXJ5IG9mIGNoYWluIHBhcmFtZXRlcnMgZm9yIGEgcHJpdmF0ZSBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIFRoZSBkaWN0aW9uYXJ5IHdpdGggcGFyYW1ldGVycyBzZXQgYXMgY2hhaW5cbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLnNldENoYWluID0gZnVuY3Rpb24gKGNoYWluKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2hhaW4gPT09ICdudW1iZXInIHx8IHR5cGVvZiBjaGFpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYWluUGFyYW1zID0gQ29tbW9uLl9nZXRDaGFpblBhcmFtcyhjaGFpbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoYWluID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIHJlcXVpcmVkID0gWyduZXR3b3JrSWQnLCAnZ2VuZXNpcycsICdoYXJkZm9ya3MnLCAnYm9vdHN0cmFwTm9kZXMnXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgcmVxdWlyZWRfMSA9IHJlcXVpcmVkOyBfaSA8IHJlcXVpcmVkXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtID0gcmVxdWlyZWRfMVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKGNoYWluW3BhcmFtXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcmVxdWlyZWQgY2hhaW4gcGFyYW1ldGVyOiBcIiArIHBhcmFtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jaGFpblBhcmFtcyA9IGNoYWluO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBpbnB1dCBmb3JtYXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhaW5QYXJhbXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBoYXJkZm9yayB0byBnZXQgcGFyYW1zIGZvclxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBTdHJpbmcgaWRlbnRpZmllciAoJ2J5emFudGl1bScpXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5zZXRIYXJkZm9yayA9IGZ1bmN0aW9uIChoYXJkZm9yaykge1xuICAgICAgICBpZiAoIXRoaXMuX2lzU3VwcG9ydGVkSGFyZGZvcmsoaGFyZGZvcmspKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIYXJkZm9yayBcIiArIGhhcmRmb3JrICsgXCIgbm90IHNldCBhcyBzdXBwb3J0ZWQgaW4gc3VwcG9ydGVkSGFyZGZvcmtzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgaGFyZGZvcmtDaGFuZ2VzXzEgPSBoYXJkZm9ya3NfMS5oYXJkZm9ya3M7IF9pIDwgaGFyZGZvcmtDaGFuZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgaGZDaGFuZ2VzID0gaGFyZGZvcmtDaGFuZ2VzXzFbX2ldO1xuICAgICAgICAgICAgaWYgKGhmQ2hhbmdlc1swXSA9PT0gaGFyZGZvcmspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXJkZm9yayA9IGhhcmRmb3JrO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGFyZGZvcmsgd2l0aCBuYW1lIFwiICsgaGFyZGZvcmsgKyBcIiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBoZWxwZXIgZnVuY3Rpb24gdG8gY2hvb3NlIGJldHdlZW4gaGFyZGZvcmsgc2V0IGFuZCBoYXJkZm9yayBwcm92aWRlZCBhcyBwYXJhbVxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBIYXJkZm9yayBnaXZlbiB0byBmdW5jdGlvbiBhcyBhIHBhcmFtZXRlclxuICAgICAqIEByZXR1cm5zIEhhcmRmb3JrIGNob3NlbiB0byBiZSB1c2VkXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5fY2hvb3NlSGFyZGZvcmsgPSBmdW5jdGlvbiAoaGFyZGZvcmssIG9ubHlTdXBwb3J0ZWQpIHtcbiAgICAgICAgb25seVN1cHBvcnRlZCA9IG9ubHlTdXBwb3J0ZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvbmx5U3VwcG9ydGVkO1xuICAgICAgICBpZiAoIWhhcmRmb3JrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhcmRmb3JrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2QgY2FsbGVkIHdpdGggbmVpdGhlciBhIGhhcmRmb3JrIHNldCBub3IgcHJvdmlkZWQgYnkgcGFyYW0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhcmRmb3JrID0gdGhpcy5faGFyZGZvcms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob25seVN1cHBvcnRlZCAmJiAhdGhpcy5faXNTdXBwb3J0ZWRIYXJkZm9yayhoYXJkZm9yaykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhhcmRmb3JrIFwiICsgaGFyZGZvcmsgKyBcIiBub3Qgc2V0IGFzIHN1cHBvcnRlZCBpbiBzdXBwb3J0ZWRIYXJkZm9ya3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhcmRmb3JrO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgaGVscGVyIGZ1bmN0aW9uLCByZXR1cm5zIHRoZSBwYXJhbXMgZm9yIHRoZSBnaXZlbiBoYXJkZm9yayBmb3IgdGhlIGNoYWluIHNldFxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBIYXJkZm9yayBuYW1lXG4gICAgICogQHJldHVybnMgRGljdGlvbmFyeSB3aXRoIGhhcmRmb3JrIHBhcmFtc1xuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuX2dldEhhcmRmb3JrID0gZnVuY3Rpb24gKGhhcmRmb3JrKSB7XG4gICAgICAgIHZhciBoZnMgPSB0aGlzLmhhcmRmb3JrcygpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGhmc18xID0gaGZzOyBfaSA8IGhmc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGhmID0gaGZzXzFbX2ldO1xuICAgICAgICAgICAgaWYgKGhmWyduYW1lJ10gPT09IGhhcmRmb3JrKVxuICAgICAgICAgICAgICAgIHJldHVybiBoZjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIYXJkZm9yayBcIiArIGhhcmRmb3JrICsgXCIgbm90IGRlZmluZWQgZm9yIGNoYWluIFwiICsgdGhpcy5jaGFpbk5hbWUoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBoZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBoYXJkZm9yayBpcyBzZXQgdG8gYmUgc3VwcG9ydGVkIGJ5IHRoZSBsaWJyYXJ5XG4gICAgICogQHBhcmFtIGhhcmRmb3JrIEhhcmRmb3JrIG5hbWVcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIGhhcmRmb3JrIGlzIHN1cHBvcnRlZFxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuX2lzU3VwcG9ydGVkSGFyZGZvcmsgPSBmdW5jdGlvbiAoaGFyZGZvcmspIHtcbiAgICAgICAgaWYgKHRoaXMuX3N1cHBvcnRlZEhhcmRmb3Jrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fc3VwcG9ydGVkSGFyZGZvcmtzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ZWRIZiA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAoaGFyZGZvcmsgPT09IHN1cHBvcnRlZEhmKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBhcmFtZXRlciBjb3JyZXNwb25kaW5nIHRvIGEgaGFyZGZvcmtcbiAgICAgKiBAcGFyYW0gdG9waWMgUGFyYW1ldGVyIHRvcGljICgnZ2FzQ29uZmlnJywgJ2dhc1ByaWNlcycsICd2bScsICdwb3cnLCAnY2FzcGVyJywgJ3NoYXJkaW5nJylcbiAgICAgKiBAcGFyYW0gbmFtZSBQYXJhbWV0ZXIgbmFtZSAoZS5nLiAnbWluR2FzTGltaXQnIGZvciAnZ2FzQ29uZmlnJyB0b3BpYylcbiAgICAgKiBAcGFyYW0gaGFyZGZvcmsgSGFyZGZvcmsgbmFtZSwgb3B0aW9uYWwgaWYgaGFyZGZvcmsgc2V0XG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5wYXJhbSA9IGZ1bmN0aW9uICh0b3BpYywgbmFtZSwgaGFyZGZvcmspIHtcbiAgICAgICAgaGFyZGZvcmsgPSB0aGlzLl9jaG9vc2VIYXJkZm9yayhoYXJkZm9yayk7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBoYXJkZm9ya0NoYW5nZXNfMiA9IGhhcmRmb3Jrc18xLmhhcmRmb3JrczsgX2kgPCBoYXJkZm9ya0NoYW5nZXNfMi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBoZkNoYW5nZXMgPSBoYXJkZm9ya0NoYW5nZXNfMltfaV07XG4gICAgICAgICAgICBpZiAoIWhmQ2hhbmdlc1sxXVt0b3BpY10pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb3BpYyBcIiArIHRvcGljICsgXCIgbm90IGRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGZDaGFuZ2VzWzFdW3RvcGljXVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBoZkNoYW5nZXNbMV1bdG9waWNdW25hbWVdLnY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGZDaGFuZ2VzWzBdID09PSBoYXJkZm9yaylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRvcGljICsgXCIgdmFsdWUgZm9yIFwiICsgbmFtZSArIFwiIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcGFyYW1ldGVyIGZvciB0aGUgaGFyZGZvcmsgYWN0aXZlIG9uIGJsb2NrIG51bWJlclxuICAgICAqIEBwYXJhbSB0b3BpYyBQYXJhbWV0ZXIgdG9waWNcbiAgICAgKiBAcGFyYW0gbmFtZSBQYXJhbWV0ZXIgbmFtZVxuICAgICAqIEBwYXJhbSBibG9ja051bWJlciBCbG9jayBudW1iZXJcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLnBhcmFtQnlCbG9jayA9IGZ1bmN0aW9uICh0b3BpYywgbmFtZSwgYmxvY2tOdW1iZXIpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUhmcyA9IHRoaXMuYWN0aXZlSGFyZGZvcmtzKGJsb2NrTnVtYmVyKTtcbiAgICAgICAgdmFyIGhhcmRmb3JrID0gYWN0aXZlSGZzW2FjdGl2ZUhmcy5sZW5ndGggLSAxXVsnbmFtZSddO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJhbSh0b3BpYywgbmFtZSwgaGFyZGZvcmspO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHNldCBvciBwcm92aWRlZCBoYXJkZm9yayBpcyBhY3RpdmUgb24gYmxvY2sgbnVtYmVyXG4gICAgICogQHBhcmFtIGhhcmRmb3JrIEhhcmRmb3JrIG5hbWUgb3IgbnVsbCAoZm9yIEhGIHNldClcbiAgICAgKiBAcGFyYW0gYmxvY2tOdW1iZXJcbiAgICAgKiBAcGFyYW0gb3B0cyBIYXJkZm9yayBvcHRpb25zIChvbmx5QWN0aXZlIHVudXNlZClcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIEhGIGlzIGFjdGl2ZSBvbiBibG9jayBudW1iZXJcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmhhcmRmb3JrSXNBY3RpdmVPbkJsb2NrID0gZnVuY3Rpb24gKGhhcmRmb3JrLCBibG9ja051bWJlciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyAhPT0gdW5kZWZpbmVkID8gb3B0cyA6IHt9O1xuICAgICAgICB2YXIgb25seVN1cHBvcnRlZCA9IG9wdHMub25seVN1cHBvcnRlZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRzLm9ubHlTdXBwb3J0ZWQ7XG4gICAgICAgIGhhcmRmb3JrID0gdGhpcy5fY2hvb3NlSGFyZGZvcmsoaGFyZGZvcmssIG9ubHlTdXBwb3J0ZWQpO1xuICAgICAgICB2YXIgaGZCbG9jayA9IHRoaXMuaGFyZGZvcmtCbG9jayhoYXJkZm9yayk7XG4gICAgICAgIGlmIChoZkJsb2NrICE9PSBudWxsICYmIGJsb2NrTnVtYmVyID49IGhmQmxvY2spXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxpYXMgdG8gaGFyZGZvcmtJc0FjdGl2ZU9uQmxvY2sgd2hlbiBoYXJkZm9yayBpcyBzZXRcbiAgICAgKiBAcGFyYW0gYmxvY2tOdW1iZXJcbiAgICAgKiBAcGFyYW0gb3B0cyBIYXJkZm9yayBvcHRpb25zIChvbmx5QWN0aXZlIHVudXNlZClcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIEhGIGlzIGFjdGl2ZSBvbiBibG9jayBudW1iZXJcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmFjdGl2ZU9uQmxvY2sgPSBmdW5jdGlvbiAoYmxvY2tOdW1iZXIsIG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFyZGZvcmtJc0FjdGl2ZU9uQmxvY2sobnVsbCwgYmxvY2tOdW1iZXIsIG9wdHMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VxdWVuY2UgYmFzZWQgY2hlY2sgaWYgZ2l2ZW4gb3Igc2V0IEhGMSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgSEYyXG4gICAgICogQHBhcmFtIGhhcmRmb3JrMSBIYXJkZm9yayBuYW1lIG9yIG51bGwgKGlmIHNldClcbiAgICAgKiBAcGFyYW0gaGFyZGZvcmsyIEhhcmRmb3JrIG5hbWVcbiAgICAgKiBAcGFyYW0gb3B0cyBIYXJkZm9yayBvcHRpb25zXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiBIRjEgZ3RlIEhGMlxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuaGFyZGZvcmtHdGVIYXJkZm9yayA9IGZ1bmN0aW9uIChoYXJkZm9yazEsIGhhcmRmb3JrMiwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyAhPT0gdW5kZWZpbmVkID8gb3B0cyA6IHt9O1xuICAgICAgICB2YXIgb25seUFjdGl2ZSA9IG9wdHMub25seUFjdGl2ZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRzLm9ubHlBY3RpdmU7XG4gICAgICAgIGhhcmRmb3JrMSA9IHRoaXMuX2Nob29zZUhhcmRmb3JrKGhhcmRmb3JrMSwgb3B0cy5vbmx5U3VwcG9ydGVkKTtcbiAgICAgICAgdmFyIGhhcmRmb3JrcztcbiAgICAgICAgaWYgKG9ubHlBY3RpdmUpIHtcbiAgICAgICAgICAgIGhhcmRmb3JrcyA9IHRoaXMuYWN0aXZlSGFyZGZvcmtzKG51bGwsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFyZGZvcmtzID0gdGhpcy5oYXJkZm9ya3MoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9zSGYxID0gLTEsIHBvc0hmMiA9IC0xO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGhhcmRmb3Jrc18yID0gaGFyZGZvcmtzOyBfaSA8IGhhcmRmb3Jrc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGhmID0gaGFyZGZvcmtzXzJbX2ldO1xuICAgICAgICAgICAgaWYgKGhmWyduYW1lJ10gPT09IGhhcmRmb3JrMSlcbiAgICAgICAgICAgICAgICBwb3NIZjEgPSBpbmRleDtcbiAgICAgICAgICAgIGlmIChoZlsnbmFtZSddID09PSBoYXJkZm9yazIpXG4gICAgICAgICAgICAgICAgcG9zSGYyID0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NIZjEgPj0gcG9zSGYyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxpYXMgdG8gaGFyZGZvcmtHdGVIYXJkZm9yayB3aGVuIGhhcmRmb3JrIGlzIHNldFxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBIYXJkZm9yayBuYW1lXG4gICAgICogQHBhcmFtIG9wdHMgSGFyZGZvcmsgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFRydWUgaWYgaGFyZGZvcmsgc2V0IGlzIGdyZWF0ZXIgdGhhbiBoYXJkZm9yayBwcm92aWRlZFxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuZ3RlSGFyZGZvcmsgPSBmdW5jdGlvbiAoaGFyZGZvcmssIG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFyZGZvcmtHdGVIYXJkZm9yayhudWxsLCBoYXJkZm9yaywgb3B0cyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgZ2l2ZW4gb3Igc2V0IGhhcmRmb3JrIGlzIGFjdGl2ZSBvbiB0aGUgY2hhaW5cbiAgICAgKiBAcGFyYW0gaGFyZGZvcmsgSGFyZGZvcmsgbmFtZSwgb3B0aW9uYWwgaWYgSEYgc2V0XG4gICAgICogQHBhcmFtIG9wdHMgSGFyZGZvcmsgb3B0aW9ucyAob25seUFjdGl2ZSB1bnVzZWQpXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiBoYXJkZm9yayBpcyBhY3RpdmUgb24gdGhlIGNoYWluXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5oYXJkZm9ya0lzQWN0aXZlT25DaGFpbiA9IGZ1bmN0aW9uIChoYXJkZm9yaywgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyAhPT0gdW5kZWZpbmVkID8gb3B0cyA6IHt9O1xuICAgICAgICB2YXIgb25seVN1cHBvcnRlZCA9IG9wdHMub25seVN1cHBvcnRlZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRzLm9ubHlTdXBwb3J0ZWQ7XG4gICAgICAgIGhhcmRmb3JrID0gdGhpcy5fY2hvb3NlSGFyZGZvcmsoaGFyZGZvcmssIG9ubHlTdXBwb3J0ZWQpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5oYXJkZm9ya3MoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBoZiA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChoZlsnbmFtZSddID09PSBoYXJkZm9yayAmJiBoZlsnYmxvY2snXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgaGFyZGZvcmsgc3dpdGNoZXMgZm9yIHRoZSBjdXJyZW50IGNoYWluXG4gICAgICogQHBhcmFtIGJsb2NrTnVtYmVyIHVwIHRvIGJsb2NrIGlmIHByb3ZpZGVkLCBvdGhlcndpc2UgZm9yIHRoZSB3aG9sZSBjaGFpblxuICAgICAqIEBwYXJhbSBvcHRzIEhhcmRmb3JrIG9wdGlvbnMgKG9ubHlBY3RpdmUgdW51c2VkKVxuICAgICAqIEByZXR1cm4gQXJyYXkgd2l0aCBoYXJkZm9yayBhcnJheXNcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmFjdGl2ZUhhcmRmb3JrcyA9IGZ1bmN0aW9uIChibG9ja051bWJlciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyAhPT0gdW5kZWZpbmVkID8gb3B0cyA6IHt9O1xuICAgICAgICB2YXIgYWN0aXZlSGFyZGZvcmtzID0gW107XG4gICAgICAgIHZhciBoZnMgPSB0aGlzLmhhcmRmb3JrcygpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGhmc18yID0gaGZzOyBfaSA8IGhmc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGhmID0gaGZzXzJbX2ldO1xuICAgICAgICAgICAgaWYgKGhmWydibG9jayddID09PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGJsb2NrTnVtYmVyICE9PSB1bmRlZmluZWQgJiYgYmxvY2tOdW1iZXIgIT09IG51bGwgJiYgYmxvY2tOdW1iZXIgPCBoZlsnYmxvY2snXSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmIChvcHRzLm9ubHlTdXBwb3J0ZWQgJiYgIXRoaXMuX2lzU3VwcG9ydGVkSGFyZGZvcmsoaGZbJ25hbWUnXSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBhY3RpdmVIYXJkZm9ya3MucHVzaChoZik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGl2ZUhhcmRmb3JrcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhdGVzdCBhY3RpdmUgaGFyZGZvcmsgbmFtZSBmb3IgY2hhaW4gb3IgYmxvY2sgb3IgdGhyb3dzIGlmIHVuYXZhaWxhYmxlXG4gICAgICogQHBhcmFtIGJsb2NrTnVtYmVyIHVwIHRvIGJsb2NrIGlmIHByb3ZpZGVkLCBvdGhlcndpc2UgZm9yIHRoZSB3aG9sZSBjaGFpblxuICAgICAqIEBwYXJhbSBvcHRzIEhhcmRmb3JrIG9wdGlvbnMgKG9ubHlBY3RpdmUgdW51c2VkKVxuICAgICAqIEByZXR1cm4gSGFyZGZvcmsgbmFtZVxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuYWN0aXZlSGFyZGZvcmsgPSBmdW5jdGlvbiAoYmxvY2tOdW1iZXIsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgIT09IHVuZGVmaW5lZCA/IG9wdHMgOiB7fTtcbiAgICAgICAgdmFyIGFjdGl2ZUhhcmRmb3JrcyA9IHRoaXMuYWN0aXZlSGFyZGZvcmtzKGJsb2NrTnVtYmVyLCBvcHRzKTtcbiAgICAgICAgaWYgKGFjdGl2ZUhhcmRmb3Jrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlSGFyZGZvcmtzW2FjdGl2ZUhhcmRmb3Jrcy5sZW5ndGggLSAxXVsnbmFtZSddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gKHN1cHBvcnRlZCkgYWN0aXZlIGhhcmRmb3JrIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoYXJkZm9yayBjaGFuZ2UgYmxvY2sgZm9yIGhhcmRmb3JrIHByb3ZpZGVkIG9yIHNldFxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBIYXJkZm9yayBuYW1lLCBvcHRpb25hbCBpZiBIRiBzZXRcbiAgICAgKiBAcmV0dXJucyBCbG9jayBudW1iZXJcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmhhcmRmb3JrQmxvY2sgPSBmdW5jdGlvbiAoaGFyZGZvcmspIHtcbiAgICAgICAgaGFyZGZvcmsgPSB0aGlzLl9jaG9vc2VIYXJkZm9yayhoYXJkZm9yaywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0SGFyZGZvcmsoaGFyZGZvcmspWydibG9jayddO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJ1ZSBpZiBibG9jayBudW1iZXIgcHJvdmlkZWQgaXMgdGhlIGhhcmRmb3JrIChnaXZlbiBvciBzZXQpIGNoYW5nZSBibG9jayBvZiB0aGUgY3VycmVudCBjaGFpblxuICAgICAqIEBwYXJhbSBibG9ja051bWJlciBOdW1iZXIgb2YgdGhlIGJsb2NrIHRvIGNoZWNrXG4gICAgICogQHBhcmFtIGhhcmRmb3JrIEhhcmRmb3JrIG5hbWUsIG9wdGlvbmFsIGlmIEhGIHNldFxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgYmxvY2tOdW1iZXIgaXMgSEYgYmxvY2tcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmlzSGFyZGZvcmtCbG9jayA9IGZ1bmN0aW9uIChibG9ja051bWJlciwgaGFyZGZvcmspIHtcbiAgICAgICAgaGFyZGZvcmsgPSB0aGlzLl9jaG9vc2VIYXJkZm9yayhoYXJkZm9yaywgZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5oYXJkZm9ya0Jsb2NrKGhhcmRmb3JrKSA9PT0gYmxvY2tOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcm92aWRlIHRoZSBjb25zZW5zdXMgdHlwZSBmb3IgdGhlIGhhcmRmb3JrIHNldCBvciBwcm92aWRlZCBhcyBwYXJhbVxuICAgICAqIEBwYXJhbSBoYXJkZm9yayBIYXJkZm9yayBuYW1lLCBvcHRpb25hbCBpZiBoYXJkZm9yayBzZXRcbiAgICAgKiBAcmV0dXJucyBDb25zZW5zdXMgdHlwZSAoZS5nLiAncG93JywgJ3BvYScpXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5jb25zZW5zdXMgPSBmdW5jdGlvbiAoaGFyZGZvcmspIHtcbiAgICAgICAgaGFyZGZvcmsgPSB0aGlzLl9jaG9vc2VIYXJkZm9yayhoYXJkZm9yayk7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRIYXJkZm9yayhoYXJkZm9yaylbJ2NvbnNlbnN1cyddO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJvdmlkZSB0aGUgZmluYWxpdHkgdHlwZSBmb3IgdGhlIGhhcmRmb3JrIHNldCBvciBwcm92aWRlZCBhcyBwYXJhbVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoYXJkZm9yayBIYXJkZm9yayBuYW1lLCBvcHRpb25hbCBpZiBoYXJkZm9yayBzZXRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBGaW5hbGl0eSB0eXBlIChlLmcuICdwb3MnLCBudWxsIG9mIG5vIGZpbmFsaXR5KVxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuZmluYWxpdHkgPSBmdW5jdGlvbiAoaGFyZGZvcmspIHtcbiAgICAgICAgaGFyZGZvcmsgPSB0aGlzLl9jaG9vc2VIYXJkZm9yayhoYXJkZm9yayk7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRIYXJkZm9yayhoYXJkZm9yaylbJ2ZpbmFsaXR5J107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBHZW5lc2lzIHBhcmFtZXRlcnMgb2YgY3VycmVudCBjaGFpblxuICAgICAqIEByZXR1cm5zIEdlbmVzaXMgZGljdGlvbmFyeVxuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuZ2VuZXNpcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYWluUGFyYW1zWydnZW5lc2lzJ107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoYXJkZm9ya3MgZm9yIGN1cnJlbnQgY2hhaW5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IHdpdGggYXJyYXlzIG9mIGhhcmRmb3Jrc1xuICAgICAqL1xuICAgIENvbW1vbi5wcm90b3R5cGUuaGFyZGZvcmtzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhaW5QYXJhbXNbJ2hhcmRmb3JrcyddO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBib290c3RyYXAgbm9kZXMgZm9yIHRoZSBjdXJyZW50IGNoYWluXG4gICAgICogQHJldHVybnMge0RpY3Rpb25hcnl9IERpY3Qgd2l0aCBib290c3RyYXAgbm9kZXNcbiAgICAgKi9cbiAgICBDb21tb24ucHJvdG90eXBlLmJvb3RzdHJhcE5vZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhaW5QYXJhbXNbJ2Jvb3RzdHJhcE5vZGVzJ107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoYXJkZm9yayBzZXRcbiAgICAgKiBAcmV0dXJucyBIYXJkZm9yayBuYW1lXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5oYXJkZm9yayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhcmRmb3JrO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgSWQgb2YgY3VycmVudCBjaGFpblxuICAgICAqIEByZXR1cm5zIGNoYWluIElkXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5jaGFpbklkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhaW5QYXJhbXNbJ2NoYWluSWQnXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgY3VycmVudCBjaGFpblxuICAgICAqIEByZXR1cm5zIGNoYWluIG5hbWUgKGxvd2VyIGNhc2UpXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5jaGFpbk5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjaGFpbnNfMS5jaGFpbnNbJ25hbWVzJ11bdGhpcy5jaGFpbklkKCldIHx8IHRoaXMuX2NoYWluUGFyYW1zWyduYW1lJ107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBJZCBvZiBjdXJyZW50IG5ldHdvcmtcbiAgICAgKiBAcmV0dXJucyBuZXR3b3JrIElkXG4gICAgICovXG4gICAgQ29tbW9uLnByb3RvdHlwZS5uZXR3b3JrSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFpblBhcmFtc1snbmV0d29ya0lkJ107XG4gICAgfTtcbiAgICByZXR1cm4gQ29tbW9uO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbW1vbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxudmFyIE1ENSA9IHJlcXVpcmUoJ21kNS5qcycpXG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZnVuY3Rpb24gRVZQX0J5dGVzVG9LZXkgKHBhc3N3b3JkLCBzYWx0LCBrZXlCaXRzLCBpdkxlbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihwYXNzd29yZCkpIHBhc3N3b3JkID0gQnVmZmVyLmZyb20ocGFzc3dvcmQsICdiaW5hcnknKVxuICBpZiAoc2FsdCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHNhbHQpKSBzYWx0ID0gQnVmZmVyLmZyb20oc2FsdCwgJ2JpbmFyeScpXG4gICAgaWYgKHNhbHQubGVuZ3RoICE9PSA4KSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc2FsdCBzaG91bGQgYmUgQnVmZmVyIHdpdGggOCBieXRlIGxlbmd0aCcpXG4gIH1cblxuICB2YXIga2V5TGVuID0ga2V5Qml0cyAvIDhcbiAgdmFyIGtleSA9IEJ1ZmZlci5hbGxvYyhrZXlMZW4pXG4gIHZhciBpdiA9IEJ1ZmZlci5hbGxvYyhpdkxlbiB8fCAwKVxuICB2YXIgdG1wID0gQnVmZmVyLmFsbG9jKDApXG5cbiAgd2hpbGUgKGtleUxlbiA+IDAgfHwgaXZMZW4gPiAwKSB7XG4gICAgdmFyIGhhc2ggPSBuZXcgTUQ1KClcbiAgICBoYXNoLnVwZGF0ZSh0bXApXG4gICAgaGFzaC51cGRhdGUocGFzc3dvcmQpXG4gICAgaWYgKHNhbHQpIGhhc2gudXBkYXRlKHNhbHQpXG4gICAgdG1wID0gaGFzaC5kaWdlc3QoKVxuXG4gICAgdmFyIHVzZWQgPSAwXG5cbiAgICBpZiAoa2V5TGVuID4gMCkge1xuICAgICAgdmFyIGtleVN0YXJ0ID0ga2V5Lmxlbmd0aCAtIGtleUxlblxuICAgICAgdXNlZCA9IE1hdGgubWluKGtleUxlbiwgdG1wLmxlbmd0aClcbiAgICAgIHRtcC5jb3B5KGtleSwga2V5U3RhcnQsIDAsIHVzZWQpXG4gICAgICBrZXlMZW4gLT0gdXNlZFxuICAgIH1cblxuICAgIGlmICh1c2VkIDwgdG1wLmxlbmd0aCAmJiBpdkxlbiA+IDApIHtcbiAgICAgIHZhciBpdlN0YXJ0ID0gaXYubGVuZ3RoIC0gaXZMZW5cbiAgICAgIHZhciBsZW5ndGggPSBNYXRoLm1pbihpdkxlbiwgdG1wLmxlbmd0aCAtIHVzZWQpXG4gICAgICB0bXAuY29weShpdiwgaXZTdGFydCwgdXNlZCwgdXNlZCArIGxlbmd0aClcbiAgICAgIGl2TGVuIC09IGxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHRtcC5maWxsKDApXG4gIHJldHVybiB7IGtleToga2V5LCBpdjogaXYgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVWUF9CeXRlc1RvS2V5XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGNyZWF0ZUtlY2Nha0hhc2ggPSByZXF1aXJlKCdrZWNjYWsnKTtcbnZhciBzZWNwMjU2azEgPSByZXF1aXJlKCdzZWNwMjU2azEnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciBybHAgPSByZXF1aXJlKCdybHAnKTtcbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgY3JlYXRlSGFzaCA9IHJlcXVpcmUoJ2NyZWF0ZS1oYXNoJyk7XG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG5PYmplY3QuYXNzaWduKGV4cG9ydHMsIHJlcXVpcmUoJ2V0aGpzLXV0aWwnKSk7XG5cbi8qKlxuICogdGhlIG1heCBpbnRlZ2VyIHRoYXQgdGhpcyBWTSBjYW4gaGFuZGxlIChhIGBgYEJOYGBgKVxuICogQHZhciB7Qk59IE1BWF9JTlRFR0VSXG4gKi9cbmV4cG9ydHMuTUFYX0lOVEVHRVIgPSBuZXcgQk4oJ2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYnLCAxNik7XG5cbi8qKlxuICogMl4yNTYgKGEgYGBgQk5gYGApXG4gKiBAdmFyIHtCTn0gVFdPX1BPVzI1NlxuICovXG5leHBvcnRzLlRXT19QT1cyNTYgPSBuZXcgQk4oJzEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJywgMTYpO1xuXG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiBudWxsIChhIGBgYFN0cmluZ2BgYClcbiAqIEB2YXIge1N0cmluZ30gS0VDQ0FLMjU2X05VTExfU1xuICovXG5leHBvcnRzLktFQ0NBSzI1Nl9OVUxMX1MgPSAnYzVkMjQ2MDE4NmY3MjMzYzkyN2U3ZGIyZGNjNzAzYzBlNTAwYjY1M2NhODIyNzNiN2JmYWQ4MDQ1ZDg1YTQ3MCc7XG5leHBvcnRzLlNIQTNfTlVMTF9TID0gZXhwb3J0cy5LRUNDQUsyNTZfTlVMTF9TO1xuXG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiBudWxsIChhIGBgYEJ1ZmZlcmBgYClcbiAqIEB2YXIge0J1ZmZlcn0gS0VDQ0FLMjU2X05VTExcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfTlVMTCA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMuS0VDQ0FLMjU2X05VTExfUywgJ2hleCcpO1xuZXhwb3J0cy5TSEEzX05VTEwgPSBleHBvcnRzLktFQ0NBSzI1Nl9OVUxMO1xuXG4vKipcbiAqIEtlY2Nhay0yNTYgb2YgYW4gUkxQIG9mIGFuIGVtcHR5IGFycmF5IChhIGBgYFN0cmluZ2BgYClcbiAqIEB2YXIge1N0cmluZ30gS0VDQ0FLMjU2X1JMUF9BUlJBWV9TXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWV9TID0gJzFkY2M0ZGU4ZGVjNzVkN2FhYjg1YjU2N2I2Y2NkNDFhZDMxMjQ1MWI5NDhhNzQxM2YwYTE0MmZkNDBkNDkzNDcnO1xuZXhwb3J0cy5TSEEzX1JMUF9BUlJBWV9TID0gZXhwb3J0cy5LRUNDQUsyNTZfUkxQX0FSUkFZX1M7XG5cbi8qKlxuICogS2VjY2FrLTI1NiBvZiBhbiBSTFAgb2YgYW4gZW1wdHkgYXJyYXkgKGEgYGBgQnVmZmVyYGBgKVxuICogQHZhciB7QnVmZmVyfSBLRUNDQUsyNTZfUkxQX0FSUkFZXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWSA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWV9TLCAnaGV4Jyk7XG5leHBvcnRzLlNIQTNfUkxQX0FSUkFZID0gZXhwb3J0cy5LRUNDQUsyNTZfUkxQX0FSUkFZO1xuXG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgUkxQIG9mIG51bGwgIChhIGBgYFN0cmluZ2BgYClcbiAqIEB2YXIge1N0cmluZ30gS0VDQ0FLMjU2X1JMUF9TXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9TID0gJzU2ZTgxZjE3MWJjYzU1YTZmZjgzNDVlNjkyYzBmODZlNWI0OGUwMWI5OTZjYWRjMDAxNjIyZmI1ZTM2M2I0MjEnO1xuZXhwb3J0cy5TSEEzX1JMUF9TID0gZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1M7XG5cbi8qKlxuICogS2VjY2FrLTI1NiBoYXNoIG9mIHRoZSBSTFAgb2YgbnVsbCAoYSBgYGBCdWZmZXJgYGApXG4gKiBAdmFyIHtCdWZmZXJ9IEtFQ0NBSzI1Nl9STFBcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQID0gQnVmZmVyLmZyb20oZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1MsICdoZXgnKTtcbmV4cG9ydHMuU0hBM19STFAgPSBleHBvcnRzLktFQ0NBSzI1Nl9STFA7XG5cbi8qKlxuICogW2BCTmBdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmR1dG55L2JuLmpzKVxuICogQHZhciB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydHMuQk4gPSBCTjtcblxuLyoqXG4gKiBbYHJscGBdKGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bWpzL3JscClcbiAqIEB2YXIge0Z1bmN0aW9ufVxuICovXG5leHBvcnRzLnJscCA9IHJscDtcblxuLyoqXG4gKiBbYHNlY3AyNTZrMWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9jcnlwdG9jb2luanMvc2VjcDI1NmsxLW5vZGUvKVxuICogQHZhciB7T2JqZWN0fVxuICovXG5leHBvcnRzLnNlY3AyNTZrMSA9IHNlY3AyNTZrMTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgYnVmZmVyIGZpbGxlZCB3aXRoIDBzXG4gKiBAbWV0aG9kIHplcm9zXG4gKiBAcGFyYW0ge051bWJlcn0gYnl0ZXMgIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIGJ1ZmZlciBzaG91bGQgYmVcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy56ZXJvcyA9IGZ1bmN0aW9uIChieXRlcykge1xuICByZXR1cm4gQnVmZmVyLmFsbG9jVW5zYWZlKGJ5dGVzKS5maWxsKDApO1xufTtcblxuLyoqXG4gICogUmV0dXJucyBhIHplcm8gYWRkcmVzc1xuICAqIEBtZXRob2QgemVyb0FkZHJlc3NcbiAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICovXG5leHBvcnRzLnplcm9BZGRyZXNzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYWRkcmVzc0xlbmd0aCA9IDIwO1xuICB2YXIgemVyb0FkZHJlc3MgPSBleHBvcnRzLnplcm9zKGFkZHJlc3NMZW5ndGgpO1xuICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleCh6ZXJvQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIExlZnQgUGFkcyBhbiBgQXJyYXlgIG9yIGBCdWZmZXJgIHdpdGggbGVhZGluZyB6ZXJvcyB0aWxsIGl0IGhhcyBgbGVuZ3RoYCBieXRlcy5cbiAqIE9yIGl0IHRydW5jYXRlcyB0aGUgYmVnaW5uaW5nIGlmIGl0IGV4Y2VlZHMuXG4gKiBAbWV0aG9kIGxzZXRMZW5ndGhcbiAqIEBwYXJhbSB7QnVmZmVyfEFycmF5fSBtc2cgdGhlIHZhbHVlIHRvIHBhZFxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBvdXRwdXQgc2hvdWxkIGJlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtyaWdodD1mYWxzZV0gd2hldGhlciB0byBzdGFydCBwYWRkaW5nIGZvcm0gdGhlIGxlZnQgb3IgcmlnaHRcbiAqIEByZXR1cm4ge0J1ZmZlcnxBcnJheX1cbiAqL1xuZXhwb3J0cy5zZXRMZW5ndGhMZWZ0ID0gZXhwb3J0cy5zZXRMZW5ndGggPSBmdW5jdGlvbiAobXNnLCBsZW5ndGgsIHJpZ2h0KSB7XG4gIHZhciBidWYgPSBleHBvcnRzLnplcm9zKGxlbmd0aCk7XG4gIG1zZyA9IGV4cG9ydHMudG9CdWZmZXIobXNnKTtcbiAgaWYgKHJpZ2h0KSB7XG4gICAgaWYgKG1zZy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgIG1zZy5jb3B5KGJ1Zik7XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gbXNnLnNsaWNlKDAsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1zZy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgIG1zZy5jb3B5KGJ1ZiwgbGVuZ3RoIC0gbXNnLmxlbmd0aCk7XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gbXNnLnNsaWNlKC1sZW5ndGgpO1xuICB9XG59O1xuXG4vKipcbiAqIFJpZ2h0IFBhZHMgYW4gYEFycmF5YCBvciBgQnVmZmVyYCB3aXRoIGxlYWRpbmcgemVyb3MgdGlsbCBpdCBoYXMgYGxlbmd0aGAgYnl0ZXMuXG4gKiBPciBpdCB0cnVuY2F0ZXMgdGhlIGJlZ2lubmluZyBpZiBpdCBleGNlZWRzLlxuICogQHBhcmFtIHtCdWZmZXJ8QXJyYXl9IG1zZyB0aGUgdmFsdWUgdG8gcGFkXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIG91dHB1dCBzaG91bGQgYmVcbiAqIEByZXR1cm4ge0J1ZmZlcnxBcnJheX1cbiAqL1xuZXhwb3J0cy5zZXRMZW5ndGhSaWdodCA9IGZ1bmN0aW9uIChtc2csIGxlbmd0aCkge1xuICByZXR1cm4gZXhwb3J0cy5zZXRMZW5ndGgobXNnLCBsZW5ndGgsIHRydWUpO1xufTtcblxuLyoqXG4gKiBUcmltcyBsZWFkaW5nIHplcm9zIGZyb20gYSBgQnVmZmVyYCBvciBhbiBgQXJyYXlgXG4gKiBAcGFyYW0ge0J1ZmZlcnxBcnJheXxTdHJpbmd9IGFcbiAqIEByZXR1cm4ge0J1ZmZlcnxBcnJheXxTdHJpbmd9XG4gKi9cbmV4cG9ydHMudW5wYWQgPSBleHBvcnRzLnN0cmlwWmVyb3MgPSBmdW5jdGlvbiAoYSkge1xuICBhID0gZXhwb3J0cy5zdHJpcEhleFByZWZpeChhKTtcbiAgdmFyIGZpcnN0ID0gYVswXTtcbiAgd2hpbGUgKGEubGVuZ3RoID4gMCAmJiBmaXJzdC50b1N0cmluZygpID09PSAnMCcpIHtcbiAgICBhID0gYS5zbGljZSgxKTtcbiAgICBmaXJzdCA9IGFbMF07XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuLyoqXG4gKiBBdHRlbXB0cyB0byB0dXJuIGEgdmFsdWUgaW50byBhIGBCdWZmZXJgLiBBcyBpbnB1dCBpdCBzdXBwb3J0cyBgQnVmZmVyYCwgYFN0cmluZ2AsIGBOdW1iZXJgLCBudWxsL3VuZGVmaW5lZCwgYEJOYCBhbmQgb3RoZXIgb2JqZWN0cyB3aXRoIGEgYHRvQXJyYXkoKWAgbWV0aG9kLlxuICogQHBhcmFtIHsqfSB2IHRoZSB2YWx1ZVxuICovXG5leHBvcnRzLnRvQnVmZmVyID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodikpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgdiA9IEJ1ZmZlci5mcm9tKHYpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZXhwb3J0cy5pc0hleFN0cmluZyh2KSkge1xuICAgICAgICB2ID0gQnVmZmVyLmZyb20oZXhwb3J0cy5wYWRUb0V2ZW4oZXhwb3J0cy5zdHJpcEhleFByZWZpeCh2KSksICdoZXgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBCdWZmZXIuZnJvbSh2KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJykge1xuICAgICAgdiA9IGV4cG9ydHMuaW50VG9CdWZmZXIodik7XG4gICAgfSBlbHNlIGlmICh2ID09PSBudWxsIHx8IHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKTtcbiAgICB9IGVsc2UgaWYgKEJOLmlzQk4odikpIHtcbiAgICAgIHYgPSB2LnRvQXJyYXlMaWtlKEJ1ZmZlcik7XG4gICAgfSBlbHNlIGlmICh2LnRvQXJyYXkpIHtcbiAgICAgIC8vIGNvbnZlcnRzIGEgQk4gdG8gYSBCdWZmZXJcbiAgICAgIHYgPSBCdWZmZXIuZnJvbSh2LnRvQXJyYXkoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0eXBlJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIHRvIGEgYE51bWJlcmBcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEB0aHJvd3MgSWYgdGhlIGlucHV0IG51bWJlciBleGNlZWRzIDUzIGJpdHMuXG4gKi9cbmV4cG9ydHMuYnVmZmVyVG9JbnQgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIHJldHVybiBuZXcgQk4oZXhwb3J0cy50b0J1ZmZlcihidWYpKS50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIGludG8gYSBoZXggYFN0cmluZ2BcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5idWZmZXJUb0hleCA9IGZ1bmN0aW9uIChidWYpIHtcbiAgYnVmID0gZXhwb3J0cy50b0J1ZmZlcihidWYpO1xuICByZXR1cm4gJzB4JyArIGJ1Zi50b1N0cmluZygnaGV4Jyk7XG59O1xuXG4vKipcbiAqIEludGVycHJldHMgYSBgQnVmZmVyYCBhcyBhIHNpZ25lZCBpbnRlZ2VyIGFuZCByZXR1cm5zIGEgYEJOYC4gQXNzdW1lcyAyNTYtYml0IG51bWJlcnMuXG4gKiBAcGFyYW0ge0J1ZmZlcn0gbnVtXG4gKiBAcmV0dXJuIHtCTn1cbiAqL1xuZXhwb3J0cy5mcm9tU2lnbmVkID0gZnVuY3Rpb24gKG51bSkge1xuICByZXR1cm4gbmV3IEJOKG51bSkuZnJvbVR3b3MoMjU2KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBgQk5gIHRvIGFuIHVuc2lnbmVkIGludGVnZXIgYW5kIHJldHVybnMgaXQgYXMgYSBgQnVmZmVyYC4gQXNzdW1lcyAyNTYtYml0IG51bWJlcnMuXG4gKiBAcGFyYW0ge0JOfSBudW1cbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy50b1Vuc2lnbmVkID0gZnVuY3Rpb24gKG51bSkge1xuICByZXR1cm4gQnVmZmVyLmZyb20obnVtLnRvVHdvcygyNTYpLnRvQXJyYXkoKSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgS2VjY2FrIGhhc2ggb2YgdGhlIGlucHV0XG4gKiBAcGFyYW0ge0J1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyfSBhIHRoZSBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge051bWJlcn0gW2JpdHM9MjU2XSB0aGUgS2VjY2FrIHdpZHRoXG4gKiBAcmV0dXJuIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMua2VjY2FrID0gZnVuY3Rpb24gKGEsIGJpdHMpIHtcbiAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gIGlmICghYml0cykgYml0cyA9IDI1NjtcblxuICByZXR1cm4gY3JlYXRlS2VjY2FrSGFzaCgna2VjY2FrJyArIGJpdHMpLnVwZGF0ZShhKS5kaWdlc3QoKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBLZWNjYWstMjU2IGhhc2ggb2YgdGhlIGlucHV0LCBhbGlhcyBmb3Iga2VjY2FrKGEsIDI1NilcbiAqIEBwYXJhbSB7QnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXJ9IGEgdGhlIGlucHV0IGRhdGFcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy5rZWNjYWsyNTYgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gZXhwb3J0cy5rZWNjYWsoYSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgU0hBLTMgKEtlY2NhaykgaGFzaCBvZiB0aGUgaW5wdXQgW09CU09MRVRFXVxuICogQHBhcmFtIHtCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcn0gYSB0aGUgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtOdW1iZXJ9IFtiaXRzPTI1Nl0gdGhlIFNIQS0zIHdpZHRoXG4gKiBAcmV0dXJuIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMuc2hhMyA9IGV4cG9ydHMua2VjY2FrO1xuXG4vKipcbiAqIENyZWF0ZXMgU0hBMjU2IGhhc2ggb2YgdGhlIGlucHV0XG4gKiBAcGFyYW0ge0J1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyfSBhIHRoZSBpbnB1dCBkYXRhXG4gKiBAcmV0dXJuIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMuc2hhMjU2ID0gZnVuY3Rpb24gKGEpIHtcbiAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gIHJldHVybiBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoYSkuZGlnZXN0KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgUklQRU1EMTYwIGhhc2ggb2YgdGhlIGlucHV0XG4gKiBAcGFyYW0ge0J1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyfSBhIHRoZSBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHBhZGRlZCB3aGV0aGVyIGl0IHNob3VsZCBiZSBwYWRkZWQgdG8gMjU2IGJpdHMgb3Igbm90XG4gKiBAcmV0dXJuIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMucmlwZW1kMTYwID0gZnVuY3Rpb24gKGEsIHBhZGRlZCkge1xuICBhID0gZXhwb3J0cy50b0J1ZmZlcihhKTtcbiAgdmFyIGhhc2ggPSBjcmVhdGVIYXNoKCdybWQxNjAnKS51cGRhdGUoYSkuZGlnZXN0KCk7XG4gIGlmIChwYWRkZWQgPT09IHRydWUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5zZXRMZW5ndGgoaGFzaCwgMzIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoYXNoO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgU0hBLTMgaGFzaCBvZiB0aGUgUkxQIGVuY29kZWQgdmVyc2lvbiBvZiB0aGUgaW5wdXRcbiAqIEBwYXJhbSB7QnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXJ9IGEgdGhlIGlucHV0IGRhdGFcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy5ybHBoYXNoID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGV4cG9ydHMua2VjY2FrKHJscC5lbmNvZGUoYSkpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByaXZhdGUga2V5IHNhdGlzZmllcyB0aGUgcnVsZXMgb2YgdGhlIGN1cnZlIHNlY3AyNTZrMS5cbiAqIEBwYXJhbSB7QnVmZmVyfSBwcml2YXRlS2V5XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLmlzVmFsaWRQcml2YXRlID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgcmV0dXJuIHNlY3AyNTZrMS5wcml2YXRlS2V5VmVyaWZ5KHByaXZhdGVLZXkpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHB1YmxpYyBrZXkgc2F0aXNmaWVzIHRoZSBydWxlcyBvZiB0aGUgY3VydmUgc2VjcDI1NmsxXG4gKiBhbmQgdGhlIHJlcXVpcmVtZW50cyBvZiBFdGhlcmV1bS5cbiAqIEBwYXJhbSB7QnVmZmVyfSBwdWJsaWNLZXkgVGhlIHR3byBwb2ludHMgb2YgYW4gdW5jb21wcmVzc2VkIGtleSwgdW5sZXNzIHNhbml0aXplIGlzIGVuYWJsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Nhbml0aXplPWZhbHNlXSBBY2NlcHQgcHVibGljIGtleXMgaW4gb3RoZXIgZm9ybWF0c1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkUHVibGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSwgc2FuaXRpemUpIHtcbiAgaWYgKHB1YmxpY0tleS5sZW5ndGggPT09IDY0KSB7XG4gICAgLy8gQ29udmVydCB0byBTRUMxIGZvciBzZWNwMjU2azFcbiAgICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleVZlcmlmeShCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbNF0pLCBwdWJsaWNLZXldKSk7XG4gIH1cblxuICBpZiAoIXNhbml0aXplKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlWZXJpZnkocHVibGljS2V5KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gYWRkcmVzcyBvZiBhIGdpdmVuIHB1YmxpYyBrZXkuXG4gKiBBY2NlcHRzIFwiRXRoZXJldW0gcHVibGljIGtleXNcIiBhbmQgU0VDMSBlbmNvZGVkIGtleXMuXG4gKiBAcGFyYW0ge0J1ZmZlcn0gcHViS2V5IFRoZSB0d28gcG9pbnRzIG9mIGFuIHVuY29tcHJlc3NlZCBrZXksIHVubGVzcyBzYW5pdGl6ZSBpcyBlbmFibGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzYW5pdGl6ZT1mYWxzZV0gQWNjZXB0IHB1YmxpYyBrZXlzIGluIG90aGVyIGZvcm1hdHNcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy5wdWJUb0FkZHJlc3MgPSBleHBvcnRzLnB1YmxpY1RvQWRkcmVzcyA9IGZ1bmN0aW9uIChwdWJLZXksIHNhbml0aXplKSB7XG4gIHB1YktleSA9IGV4cG9ydHMudG9CdWZmZXIocHViS2V5KTtcbiAgaWYgKHNhbml0aXplICYmIHB1YktleS5sZW5ndGggIT09IDY0KSB7XG4gICAgcHViS2V5ID0gc2VjcDI1NmsxLnB1YmxpY0tleUNvbnZlcnQocHViS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG4gIH1cbiAgYXNzZXJ0KHB1YktleS5sZW5ndGggPT09IDY0KTtcbiAgLy8gT25seSB0YWtlIHRoZSBsb3dlciAxNjBiaXRzIG9mIHRoZSBoYXNoXG4gIHJldHVybiBleHBvcnRzLmtlY2NhayhwdWJLZXkpLnNsaWNlKC0yMCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGV0aGVyZXVtIHB1YmxpYyBrZXkgb2YgYSBnaXZlbiBwcml2YXRlIGtleVxuICogQHBhcmFtIHtCdWZmZXJ9IHByaXZhdGVLZXkgQSBwcml2YXRlIGtleSBtdXN0IGJlIDI1NiBiaXRzIHdpZGVcbiAqIEByZXR1cm4ge0J1ZmZlcn1cbiAqL1xudmFyIHByaXZhdGVUb1B1YmxpYyA9IGV4cG9ydHMucHJpdmF0ZVRvUHVibGljID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgcHJpdmF0ZUtleSA9IGV4cG9ydHMudG9CdWZmZXIocHJpdmF0ZUtleSk7XG4gIC8vIHNraXAgdGhlIHR5cGUgZmxhZyBhbmQgdXNlIHRoZSBYLCBZIHBvaW50c1xuICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleUNyZWF0ZShwcml2YXRlS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgcHVibGljIGtleSB0byB0aGUgRXRoZXJldW0gZm9ybWF0LlxuICogQHBhcmFtIHtCdWZmZXJ9IHB1YmxpY0tleVxuICogQHJldHVybiB7QnVmZmVyfVxuICovXG5leHBvcnRzLmltcG9ydFB1YmxpYyA9IGZ1bmN0aW9uIChwdWJsaWNLZXkpIHtcbiAgcHVibGljS2V5ID0gZXhwb3J0cy50b0J1ZmZlcihwdWJsaWNLZXkpO1xuICBpZiAocHVibGljS2V5Lmxlbmd0aCAhPT0gNjQpIHtcbiAgICBwdWJsaWNLZXkgPSBzZWNwMjU2azEucHVibGljS2V5Q29udmVydChwdWJsaWNLZXksIGZhbHNlKS5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gcHVibGljS2V5O1xufTtcblxuLyoqXG4gKiBFQ0RTQSBzaWduXG4gKiBAcGFyYW0ge0J1ZmZlcn0gbXNnSGFzaFxuICogQHBhcmFtIHtCdWZmZXJ9IHByaXZhdGVLZXlcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0cy5lY3NpZ24gPSBmdW5jdGlvbiAobXNnSGFzaCwgcHJpdmF0ZUtleSkge1xuICB2YXIgc2lnID0gc2VjcDI1NmsxLnNpZ24obXNnSGFzaCwgcHJpdmF0ZUtleSk7XG5cbiAgdmFyIHJldCA9IHt9O1xuICByZXQuciA9IHNpZy5zaWduYXR1cmUuc2xpY2UoMCwgMzIpO1xuICByZXQucyA9IHNpZy5zaWduYXR1cmUuc2xpY2UoMzIsIDY0KTtcbiAgcmV0LnYgPSBzaWcucmVjb3ZlcnkgKyAyNztcbiAgcmV0dXJuIHJldDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUga2VjY2FrLTI1NiBoYXNoIG9mIGBtZXNzYWdlYCwgcHJlZml4ZWQgd2l0aCB0aGUgaGVhZGVyIHVzZWQgYnkgdGhlIGBldGhfc2lnbmAgUlBDIGNhbGwuXG4gKiBUaGUgb3V0cHV0IG9mIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGZlZCBpbnRvIGBlY3NpZ25gIHRvIHByb2R1Y2UgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHRoZSBgZXRoX3NpZ25gXG4gKiBjYWxsIGZvciBhIGdpdmVuIGBtZXNzYWdlYCwgb3IgZmVkIHRvIGBlY3JlY292ZXJgIGFsb25nIHdpdGggYSBzaWduYXR1cmUgdG8gcmVjb3ZlciB0aGUgcHVibGljIGtleVxuICogdXNlZCB0byBwcm9kdWNlIHRoZSBzaWduYXR1cmUuXG4gKiBAcGFyYW0gbWVzc2FnZVxuICogQHJldHVybnMge0J1ZmZlcn0gaGFzaFxuICovXG5leHBvcnRzLmhhc2hQZXJzb25hbE1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgcHJlZml4ID0gZXhwb3J0cy50b0J1ZmZlcignXFx4MTlFdGhlcmV1bSBTaWduZWQgTWVzc2FnZTpcXG4nICsgbWVzc2FnZS5sZW5ndGgudG9TdHJpbmcoKSk7XG4gIHJldHVybiBleHBvcnRzLmtlY2NhayhCdWZmZXIuY29uY2F0KFtwcmVmaXgsIG1lc3NhZ2VdKSk7XG59O1xuXG4vKipcbiAqIEVDRFNBIHB1YmxpYyBrZXkgcmVjb3ZlcnkgZnJvbSBzaWduYXR1cmVcbiAqIEBwYXJhbSB7QnVmZmVyfSBtc2dIYXNoXG4gKiBAcGFyYW0ge051bWJlcn0gdlxuICogQHBhcmFtIHtCdWZmZXJ9IHJcbiAqIEBwYXJhbSB7QnVmZmVyfSBzXG4gKiBAcmV0dXJuIHtCdWZmZXJ9IHB1YmxpY0tleVxuICovXG5leHBvcnRzLmVjcmVjb3ZlciA9IGZ1bmN0aW9uIChtc2dIYXNoLCB2LCByLCBzKSB7XG4gIHZhciBzaWduYXR1cmUgPSBCdWZmZXIuY29uY2F0KFtleHBvcnRzLnNldExlbmd0aChyLCAzMiksIGV4cG9ydHMuc2V0TGVuZ3RoKHMsIDMyKV0sIDY0KTtcbiAgdmFyIHJlY292ZXJ5ID0gdiAtIDI3O1xuICBpZiAocmVjb3ZlcnkgIT09IDAgJiYgcmVjb3ZlcnkgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIHYgdmFsdWUnKTtcbiAgfVxuICB2YXIgc2VuZGVyUHViS2V5ID0gc2VjcDI1NmsxLnJlY292ZXIobXNnSGFzaCwgc2lnbmF0dXJlLCByZWNvdmVyeSk7XG4gIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5Q29udmVydChzZW5kZXJQdWJLZXksIGZhbHNlKS5zbGljZSgxKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBzaWduYXR1cmUgcGFyYW1ldGVycyBpbnRvIHRoZSBmb3JtYXQgb2YgYGV0aF9zaWduYCBSUEMgbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdlxuICogQHBhcmFtIHtCdWZmZXJ9IHJcbiAqIEBwYXJhbSB7QnVmZmVyfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHNpZ1xuICovXG5leHBvcnRzLnRvUnBjU2lnID0gZnVuY3Rpb24gKHYsIHIsIHMpIHtcbiAgLy8gTk9URTogd2l0aCBwb3RlbnRpYWwgaW50cm9kdWN0aW9uIG9mIGNoYWluSWQgdGhpcyBtaWdodCBuZWVkIHRvIGJlIHVwZGF0ZWRcbiAgaWYgKHYgIT09IDI3ICYmIHYgIT09IDI4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlY292ZXJ5IGlkJyk7XG4gIH1cblxuICAvLyBnZXRoIChhbmQgdGhlIFJQQyBldGhfc2lnbiBtZXRob2QpIHVzZXMgdGhlIDY1IGJ5dGUgZm9ybWF0IHVzZWQgYnkgQml0Y29pblxuICAvLyBGSVhNRTogdGhpcyBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bS9nby1ldGhlcmV1bS9pc3N1ZXMvMjA1M1xuICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleChCdWZmZXIuY29uY2F0KFtleHBvcnRzLnNldExlbmd0aExlZnQociwgMzIpLCBleHBvcnRzLnNldExlbmd0aExlZnQocywgMzIpLCBleHBvcnRzLnRvQnVmZmVyKHYgLSAyNyldKSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgc2lnbmF0dXJlIGZvcm1hdCBvZiB0aGUgYGV0aF9zaWduYCBSUEMgbWV0aG9kIHRvIHNpZ25hdHVyZSBwYXJhbWV0ZXJzXG4gKiBOT1RFOiBhbGwgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBnZXRoOiBodHRwczovL2dpdGh1Yi5jb20vZXRoZXJldW0vZ28tZXRoZXJldW0vaXNzdWVzLzIwNTNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzaWdcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0cy5mcm9tUnBjU2lnID0gZnVuY3Rpb24gKHNpZykge1xuICBzaWcgPSBleHBvcnRzLnRvQnVmZmVyKHNpZyk7XG5cbiAgLy8gTk9URTogd2l0aCBwb3RlbnRpYWwgaW50cm9kdWN0aW9uIG9mIGNoYWluSWQgdGhpcyBtaWdodCBuZWVkIHRvIGJlIHVwZGF0ZWRcbiAgaWYgKHNpZy5sZW5ndGggIT09IDY1KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNpZ25hdHVyZSBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciB2ID0gc2lnWzY0XTtcbiAgLy8gc3VwcG9ydCBib3RoIHZlcnNpb25zIG9mIGBldGhfc2lnbmAgcmVzcG9uc2VzXG4gIGlmICh2IDwgMjcpIHtcbiAgICB2ICs9IDI3O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB2OiB2LFxuICAgIHI6IHNpZy5zbGljZSgwLCAzMiksXG4gICAgczogc2lnLnNsaWNlKDMyLCA2NClcbiAgfTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gYWRkcmVzcyBvZiBhIGdpdmVuIHByaXZhdGUga2V5XG4gKiBAcGFyYW0ge0J1ZmZlcn0gcHJpdmF0ZUtleSBBIHByaXZhdGUga2V5IG11c3QgYmUgMjU2IGJpdHMgd2lkZVxuICogQHJldHVybiB7QnVmZmVyfVxuICovXG5leHBvcnRzLnByaXZhdGVUb0FkZHJlc3MgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICByZXR1cm4gZXhwb3J0cy5wdWJsaWNUb0FkZHJlc3MocHJpdmF0ZVRvUHVibGljKHByaXZhdGVLZXkpKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBhZGRyZXNzIGlzIGEgdmFsaWQuIEFjY2VwdHMgY2hlY2tzdW1tZWQgYWRkcmVzc2VzIHRvb1xuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuaXNWYWxpZEFkZHJlc3MgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICByZXR1cm4gKC9eMHhbMC05YS1mQS1GXXs0MH0kLy50ZXN0KGFkZHJlc3MpXG4gICk7XG59O1xuXG4vKipcbiAgKiBDaGVja3MgaWYgYSBnaXZlbiBhZGRyZXNzIGlzIGEgemVybyBhZGRyZXNzXG4gICogQG1ldGhvZCBpc1plcm9BZGRyZXNzXG4gICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAqL1xuZXhwb3J0cy5pc1plcm9BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgdmFyIHplcm9BZGRyZXNzID0gZXhwb3J0cy56ZXJvQWRkcmVzcygpO1xuICByZXR1cm4gemVyb0FkZHJlc3MgPT09IGV4cG9ydHMuYWRkSGV4UHJlZml4KGFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY2hlY2tzdW1tZWQgYWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy50b0NoZWNrc3VtQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gIGFkZHJlc3MgPSBleHBvcnRzLnN0cmlwSGV4UHJlZml4KGFkZHJlc3MpLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBoYXNoID0gZXhwb3J0cy5rZWNjYWsoYWRkcmVzcykudG9TdHJpbmcoJ2hleCcpO1xuICB2YXIgcmV0ID0gJzB4JztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFkZHJlc3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocGFyc2VJbnQoaGFzaFtpXSwgMTYpID49IDgpIHtcbiAgICAgIHJldCArPSBhZGRyZXNzW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCArPSBhZGRyZXNzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgYWRkcmVzcyBpcyBhIHZhbGlkIGNoZWNrc3VtbWVkIGFkZHJlc3NcbiAqIEBwYXJhbSB7QnVmZmVyfSBhZGRyZXNzXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLmlzVmFsaWRDaGVja3N1bUFkZHJlc3MgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICByZXR1cm4gZXhwb3J0cy5pc1ZhbGlkQWRkcmVzcyhhZGRyZXNzKSAmJiBleHBvcnRzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MpID09PSBhZGRyZXNzO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gYWRkcmVzcyBvZiBhIG5ld2x5IGNyZWF0ZWQgY29udHJhY3RcbiAqIEBwYXJhbSB7QnVmZmVyfSBmcm9tIHRoZSBhZGRyZXNzIHdoaWNoIGlzIGNyZWF0aW5nIHRoaXMgbmV3IGFkZHJlc3NcbiAqIEBwYXJhbSB7QnVmZmVyfSBub25jZSB0aGUgbm9uY2Ugb2YgdGhlIGZyb20gYWNjb3VudFxuICogQHJldHVybiB7QnVmZmVyfVxuICovXG5leHBvcnRzLmdlbmVyYXRlQWRkcmVzcyA9IGZ1bmN0aW9uIChmcm9tLCBub25jZSkge1xuICBmcm9tID0gZXhwb3J0cy50b0J1ZmZlcihmcm9tKTtcbiAgbm9uY2UgPSBuZXcgQk4obm9uY2UpO1xuXG4gIGlmIChub25jZS5pc1plcm8oKSkge1xuICAgIC8vIGluIFJMUCB3ZSB3YW50IHRvIGVuY29kZSBudWxsIGluIHRoZSBjYXNlIG9mIHplcm8gbm9uY2VcbiAgICAvLyByZWFkIHRoZSBSTFAgZG9jdW1lbnRhdGlvbiBmb3IgYW4gYW5zd2VyIGlmIHlvdSBkYXJlXG4gICAgbm9uY2UgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIG5vbmNlID0gQnVmZmVyLmZyb20obm9uY2UudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8vIE9ubHkgdGFrZSB0aGUgbG93ZXIgMTYwYml0cyBvZiB0aGUgaGFzaFxuICByZXR1cm4gZXhwb3J0cy5ybHBoYXNoKFtmcm9tLCBub25jZV0pLnNsaWNlKC0yMCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3VwcGxpZWQgYWRkcmVzcyBiZWxvbmdzIHRvIGEgcHJlY29tcGlsZWQgYWNjb3VudCAoQnl6YW50aXVtKVxuICogQHBhcmFtIHtCdWZmZXJ8U3RyaW5nfSBhZGRyZXNzXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLmlzUHJlY29tcGlsZWQgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICB2YXIgYSA9IGV4cG9ydHMudW5wYWQoYWRkcmVzcyk7XG4gIHJldHVybiBhLmxlbmd0aCA9PT0gMSAmJiBhWzBdID49IDEgJiYgYVswXSA8PSA4O1xufTtcblxuLyoqXG4gKiBBZGRzIFwiMHhcIiB0byBhIGdpdmVuIGBTdHJpbmdgIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgc3RhcnQgd2l0aCBcIjB4XCJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hZGRIZXhQcmVmaXggPSBmdW5jdGlvbiAoc3RyKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5pc0hleFByZWZpeGVkKHN0cikgPyBzdHIgOiAnMHgnICsgc3RyO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBFQ0RTQSBzaWduYXR1cmVcbiAqIEBtZXRob2QgaXNWYWxpZFNpZ25hdHVyZVxuICogQHBhcmFtIHtCdWZmZXJ9IHZcbiAqIEBwYXJhbSB7QnVmZmVyfSByXG4gKiBAcGFyYW0ge0J1ZmZlcn0gc1xuICogQHBhcmFtIHtCb29sZWFufSBbaG9tZXN0ZWFkPXRydWVdXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydHMuaXNWYWxpZFNpZ25hdHVyZSA9IGZ1bmN0aW9uICh2LCByLCBzLCBob21lc3RlYWQpIHtcbiAgdmFyIFNFQ1AyNTZLMV9OX0RJVl8yID0gbmV3IEJOKCc3ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjVkNTc2ZTczNTdhNDUwMWRkZmU5MmY0NjY4MWIyMGEwJywgMTYpO1xuICB2YXIgU0VDUDI1NksxX04gPSBuZXcgQk4oJ2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlYmFhZWRjZTZhZjQ4YTAzYmJmZDI1ZThjZDAzNjQxNDEnLCAxNik7XG5cbiAgaWYgKHIubGVuZ3RoICE9PSAzMiB8fCBzLmxlbmd0aCAhPT0gMzIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodiAhPT0gMjcgJiYgdiAhPT0gMjgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByID0gbmV3IEJOKHIpO1xuICBzID0gbmV3IEJOKHMpO1xuXG4gIGlmIChyLmlzWmVybygpIHx8IHIuZ3QoU0VDUDI1NksxX04pIHx8IHMuaXNaZXJvKCkgfHwgcy5ndChTRUNQMjU2SzFfTikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaG9tZXN0ZWFkID09PSBmYWxzZSAmJiBuZXcgQk4ocykuY21wKFNFQ1AyNTZLMV9OX0RJVl8yKSA9PT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIG9yIGBBcnJheWAgdG8gSlNPTlxuICogQHBhcmFtIHtCdWZmZXJ8QXJyYXl9IGJhXG4gKiBAcmV0dXJuIHtBcnJheXxTdHJpbmd8bnVsbH1cbiAqL1xuZXhwb3J0cy5iYVRvSlNPTiA9IGZ1bmN0aW9uIChiYSkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJhKSkge1xuICAgIHJldHVybiAnMHgnICsgYmEudG9TdHJpbmcoJ2hleCcpO1xuICB9IGVsc2UgaWYgKGJhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKGV4cG9ydHMuYmFUb0pTT04oYmFbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG59O1xuXG4vKipcbiAqIERlZmluZXMgcHJvcGVydGllcyBvbiBhIGBPYmplY3RgLiBJdCBtYWtlIHRoZSBhc3N1bXB0aW9uIHRoYXQgdW5kZXJseWluZyBkYXRhIGlzIGJpbmFyeS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzZWxmIHRoZSBgT2JqZWN0YCB0byBkZWZpbmUgcHJvcGVydGllcyBvblxuICogQHBhcmFtIHtBcnJheX0gZmllbGRzIGFuIGFycmF5IGZpZWxkcyB0byBkZWZpbmUuIEZpZWxkcyBjYW4gY29udGFpbjpcbiAqICogYG5hbWVgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnRpZXNcbiAqICogYGxlbmd0aGAgLSB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBmaWVsZCBjYW4gaGF2ZVxuICogKiBgYWxsb3dMZXNzYCAtIGlmIHRoZSBmaWVsZCBjYW4gYmUgbGVzcyB0aGFuIHRoZSBsZW5ndGhcbiAqICogYGFsbG93RW1wdHlgXG4gKiBAcGFyYW0geyp9IGRhdGEgZGF0YSB0byBiZSB2YWxpZGF0ZWQgYWdhaW5zdCB0aGUgZGVmaW5pdGlvbnNcbiAqL1xuZXhwb3J0cy5kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHNlbGYsIGZpZWxkcywgZGF0YSkge1xuICBzZWxmLnJhdyA9IFtdO1xuICBzZWxmLl9maWVsZHMgPSBbXTtcblxuICAvLyBhdHRhY2ggdGhlIGB0b0pTT05gXG4gIHNlbGYudG9KU09OID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICB2YXIgb2JqID0ge307XG4gICAgICBzZWxmLl9maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgb2JqW2ZpZWxkXSA9ICcweCcgKyBzZWxmW2ZpZWxkXS50b1N0cmluZygnaGV4Jyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHJldHVybiBleHBvcnRzLmJhVG9KU09OKHRoaXMucmF3KTtcbiAgfTtcblxuICBzZWxmLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gcmxwLmVuY29kZShzZWxmLnJhdyk7XG4gIH07XG5cbiAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkLCBpKSB7XG4gICAgc2VsZi5fZmllbGRzLnB1c2goZmllbGQubmFtZSk7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKCkge1xuICAgICAgcmV0dXJuIHNlbGYucmF3W2ldO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR0ZXIodikge1xuICAgICAgdiA9IGV4cG9ydHMudG9CdWZmZXIodik7XG5cbiAgICAgIGlmICh2LnRvU3RyaW5nKCdoZXgnKSA9PT0gJzAwJyAmJiAhZmllbGQuYWxsb3daZXJvKSB7XG4gICAgICAgIHYgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZC5hbGxvd0xlc3MgJiYgZmllbGQubGVuZ3RoKSB7XG4gICAgICAgIHYgPSBleHBvcnRzLnN0cmlwWmVyb3Modik7XG4gICAgICAgIGFzc2VydChmaWVsZC5sZW5ndGggPj0gdi5sZW5ndGgsICdUaGUgZmllbGQgJyArIGZpZWxkLm5hbWUgKyAnIG11c3Qgbm90IGhhdmUgbW9yZSAnICsgZmllbGQubGVuZ3RoICsgJyBieXRlcycpO1xuICAgICAgfSBlbHNlIGlmICghKGZpZWxkLmFsbG93WmVybyAmJiB2Lmxlbmd0aCA9PT0gMCkgJiYgZmllbGQubGVuZ3RoKSB7XG4gICAgICAgIGFzc2VydChmaWVsZC5sZW5ndGggPT09IHYubGVuZ3RoLCAnVGhlIGZpZWxkICcgKyBmaWVsZC5uYW1lICsgJyBtdXN0IGhhdmUgYnl0ZSBsZW5ndGggb2YgJyArIGZpZWxkLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIHNlbGYucmF3W2ldID0gdjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgZmllbGQubmFtZSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgc2V0OiBzZXR0ZXJcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZC5kZWZhdWx0KSB7XG4gICAgICBzZWxmW2ZpZWxkLm5hbWVdID0gZmllbGQuZGVmYXVsdDtcbiAgICB9XG5cbiAgICAvLyBhdHRhY2ggYWxpYXNcbiAgICBpZiAoZmllbGQuYWxpYXMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBmaWVsZC5hbGlhcywge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBzZXQ6IHNldHRlcixcbiAgICAgICAgZ2V0OiBnZXR0ZXJcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gaWYgdGhlIGNvbnN0dWN0b3IgaXMgcGFzc2VkIGRhdGFcbiAgaWYgKGRhdGEpIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRhID0gQnVmZmVyLmZyb20oZXhwb3J0cy5zdHJpcEhleFByZWZpeChkYXRhKSwgJ2hleCcpO1xuICAgIH1cblxuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBybHAuZGVjb2RlKGRhdGEpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiBzZWxmLl9maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgbnVtYmVyIG9mIGZpZWxkcyBpbiBkYXRhJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgdGhlIGl0ZW1zIGFyZSBidWZmZXJzXG4gICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgc2VsZltzZWxmLl9maWVsZHNbaV1dID0gZXhwb3J0cy50b0J1ZmZlcihkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihkYXRhKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIGlmIChrZXlzLmluZGV4T2YoZmllbGQubmFtZSkgIT09IC0xKSBzZWxmW2ZpZWxkLm5hbWVdID0gZGF0YVtmaWVsZC5uYW1lXTtcbiAgICAgICAgaWYgKGtleXMuaW5kZXhPZihmaWVsZC5hbGlhcykgIT09IC0xKSBzZWxmW2ZpZWxkLmFsaWFzXSA9IGRhdGFbZmllbGQuYWxpYXNdO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhJyk7XG4gICAgfVxuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBwcmVmaXggPSAnfic7XG5cbi8qKlxuICogQ29uc3RydWN0b3IgdG8gY3JlYXRlIGEgc3RvcmFnZSBmb3Igb3VyIGBFRWAgb2JqZWN0cy5cbiAqIEFuIGBFdmVudHNgIGluc3RhbmNlIGlzIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRXZlbnRzKCkge31cblxuLy9cbi8vIFdlIHRyeSB0byBub3QgaW5oZXJpdCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC4gSW4gc29tZSBlbmdpbmVzIGNyZWF0aW5nIGFuXG4vLyBpbnN0YW5jZSBpbiB0aGlzIHdheSBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIGBPYmplY3QuY3JlYXRlKG51bGwpYCBkaXJlY3RseS5cbi8vIElmIGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBub3Qgc3VwcG9ydGVkIHdlIHByZWZpeCB0aGUgZXZlbnQgbmFtZXMgd2l0aCBhXG4vLyBjaGFyYWN0ZXIgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGJ1aWx0LWluIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3Rcbi8vIG92ZXJyaWRkZW4gb3IgdXNlZCBhcyBhbiBhdHRhY2sgdmVjdG9yLlxuLy9cbmlmIChPYmplY3QuY3JlYXRlKSB7XG4gIEV2ZW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vXG4gIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgYF9fcHJvdG9fX2AgcHJvcGVydHkgaXMgc3RpbGwgaW5oZXJpdGVkIGluXG4gIC8vIHNvbWUgb2xkIGJyb3dzZXJzIGxpa2UgQW5kcm9pZCA0LCBpUGhvbmUgNS4xLCBPcGVyYSAxMSBhbmQgU2FmYXJpIDUuXG4gIC8vXG4gIGlmICghbmV3IEV2ZW50cygpLl9fcHJvdG9fXykgcHJlZml4ID0gZmFsc2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IGVtaXR0ZXIsIG9uY2UpXG4gICAgLCBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0pIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gbGlzdGVuZXIsIGVtaXR0ZXIuX2V2ZW50c0NvdW50Kys7XG4gIGVsc2UgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XS5mbikgZW1pdHRlci5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2UgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBbZW1pdHRlci5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXTtcblxuICByZXR1cm4gZW1pdHRlcjtcbn1cblxuLyoqXG4gKiBDbGVhciBldmVudCBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZ0IFRoZSBFdmVudCBuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2xlYXJFdmVudChlbWl0dGVyLCBldnQpIHtcbiAgaWYgKC0tZW1pdHRlci5fZXZlbnRzQ291bnQgPT09IDApIGVtaXR0ZXIuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgZWxzZSBkZWxldGUgZW1pdHRlci5fZXZlbnRzW2V2dF07XG59XG5cbi8qKlxuICogTWluaW1hbCBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXG4gKiBsaXN0ZW5lcnMuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICB2YXIgbmFtZXMgPSBbXVxuICAgICwgZXZlbnRzXG4gICAgLCBuYW1lO1xuXG4gIGlmICh0aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgcmV0dXJuIG5hbWVzO1xuXG4gIGZvciAobmFtZSBpbiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzKSkge1xuICAgIGlmIChoYXMuY2FsbChldmVudHMsIG5hbWUpKSBuYW1lcy5wdXNoKHByZWZpeCA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lKTtcbiAgfVxuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWhhbmRsZXJzKSByZXR1cm4gW107XG4gIGlmIChoYW5kbGVycy5mbikgcmV0dXJuIFtoYW5kbGVycy5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBoYW5kbGVycy5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSBoYW5kbGVyc1tpXS5mbjtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGxpc3RlbmluZyB0byBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiBsaXN0ZW5lckNvdW50KGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIDA7XG4gIGlmIChsaXN0ZW5lcnMuZm4pIHJldHVybiAxO1xuICByZXR1cm4gbGlzdGVuZXJzLmxlbmd0aDtcbn07XG5cbi8qKlxuICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZWxzZSBgZmFsc2VgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIsIGEzKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBvbmUtdGltZSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IGhhdmUgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVycy5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gdGhpcztcbiAgaWYgKCFmbikge1xuICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKFxuICAgICAgbGlzdGVuZXJzLmZuID09PSBmbiAmJlxuICAgICAgKCFvbmNlIHx8IGxpc3RlbmVycy5vbmNlKSAmJlxuICAgICAgKCFjb250ZXh0IHx8IGxpc3RlbmVycy5jb250ZXh0ID09PSBjb250ZXh0KVxuICAgICkge1xuICAgICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZXZlbnRzID0gW10sIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0ZW5lcnNbaV0uZm4gIT09IGZuIHx8XG4gICAgICAgIChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSkgfHxcbiAgICAgICAgKGNvbnRleHQgJiYgbGlzdGVuZXJzW2ldLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgICAvL1xuICAgIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gICAgZWxzZSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IFtldmVudF0gVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQ7XG5cbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcbiAgICBpZiAodGhpcy5fZXZlbnRzW2V2dF0pIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgcHJlZml4LlxuLy9cbkV2ZW50RW1pdHRlci5wcmVmaXhlZCA9IHByZWZpeDtcblxuLy9cbi8vIEFsbG93IGBFdmVudEVtaXR0ZXJgIHRvIGJlIGltcG9ydGVkIGFzIG1vZHVsZSBuYW1lc3BhY2UuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=