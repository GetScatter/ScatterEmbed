(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "+MEZ":
/***/ (function(module) {

module.exports = JSON.parse("{\"COMPRESSED_TYPE_INVALID\":\"compressed should be a boolean\",\"EC_PRIVATE_KEY_TYPE_INVALID\":\"private key should be a Buffer\",\"EC_PRIVATE_KEY_LENGTH_INVALID\":\"private key length is invalid\",\"EC_PRIVATE_KEY_RANGE_INVALID\":\"private key range is invalid\",\"EC_PRIVATE_KEY_TWEAK_ADD_FAIL\":\"tweak out of range or resulting private key is invalid\",\"EC_PRIVATE_KEY_TWEAK_MUL_FAIL\":\"tweak out of range\",\"EC_PRIVATE_KEY_EXPORT_DER_FAIL\":\"couldn't export to DER format\",\"EC_PRIVATE_KEY_IMPORT_DER_FAIL\":\"couldn't import from DER format\",\"EC_PUBLIC_KEYS_TYPE_INVALID\":\"public keys should be an Array\",\"EC_PUBLIC_KEYS_LENGTH_INVALID\":\"public keys Array should have at least 1 element\",\"EC_PUBLIC_KEY_TYPE_INVALID\":\"public key should be a Buffer\",\"EC_PUBLIC_KEY_LENGTH_INVALID\":\"public key length is invalid\",\"EC_PUBLIC_KEY_PARSE_FAIL\":\"the public key could not be parsed or is invalid\",\"EC_PUBLIC_KEY_CREATE_FAIL\":\"private was invalid, try again\",\"EC_PUBLIC_KEY_TWEAK_ADD_FAIL\":\"tweak out of range or resulting public key is invalid\",\"EC_PUBLIC_KEY_TWEAK_MUL_FAIL\":\"tweak out of range\",\"EC_PUBLIC_KEY_COMBINE_FAIL\":\"the sum of the public keys is not valid\",\"ECDH_FAIL\":\"scalar was invalid (zero or overflow)\",\"ECDSA_SIGNATURE_TYPE_INVALID\":\"signature should be a Buffer\",\"ECDSA_SIGNATURE_LENGTH_INVALID\":\"signature length is invalid\",\"ECDSA_SIGNATURE_PARSE_FAIL\":\"couldn't parse signature\",\"ECDSA_SIGNATURE_PARSE_DER_FAIL\":\"couldn't parse DER signature\",\"ECDSA_SIGNATURE_SERIALIZE_DER_FAIL\":\"couldn't serialize signature to DER format\",\"ECDSA_SIGN_FAIL\":\"nonce generation function failed or private key is invalid\",\"ECDSA_RECOVER_FAIL\":\"couldn't recover public key from signature\",\"MSG32_TYPE_INVALID\":\"message should be a Buffer\",\"MSG32_LENGTH_INVALID\":\"message length is invalid\",\"OPTIONS_TYPE_INVALID\":\"options should be an Object\",\"OPTIONS_DATA_TYPE_INVALID\":\"options.data should be a Buffer\",\"OPTIONS_DATA_LENGTH_INVALID\":\"options.data length is invalid\",\"OPTIONS_NONCEFN_TYPE_INVALID\":\"options.noncefn should be a Function\",\"RECOVERY_ID_TYPE_INVALID\":\"recovery should be a Number\",\"RECOVERY_ID_VALUE_INVALID\":\"recovery should have value between -1 and 4\",\"TWEAK_TYPE_INVALID\":\"tweak should be a Buffer\",\"TWEAK_LENGTH_INVALID\":\"tweak length is invalid\"}");

/***/ }),

/***/ "/cNO":
/***/ (function(module, exports, __webpack_require__) {

const scrypt = __webpack_require__("5XvV")
scrypt.async = __webpack_require__("xIa+")
module.exports = scrypt


/***/ }),

/***/ "0XuU":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("43KI").Transform


/***/ }),

/***/ "2Nt0":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "3BRs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
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

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__("lm0R");
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__("Onz0");
util.inherits = __webpack_require__("P7XM");
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__("t9FE")
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__("QpuX");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__("qPBE").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__("RoFp");

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__("sZro");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__("sZro");

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB"), __webpack_require__("URgk").setImmediate, __webpack_require__("yLpj")))

/***/ }),

/***/ "43KI":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rXFu");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__("3BRs");
exports.Duplex = __webpack_require__("sZro");
exports.Transform = __webpack_require__("J78i");
exports.PassThrough = __webpack_require__("eA/Y");


/***/ }),

/***/ "4uyc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _eos = __webpack_require__("INNF");

var eos = _interopRequireWildcard(_eos);

var _Reputable = __webpack_require__("j9m8");

var _Reputable2 = _interopRequireDefault(_Reputable);

var _helpers = __webpack_require__("qOpi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let repTotalCache = {};

const getReputations = (() => {
	var _ref = _asyncToGenerator(function* (reputables) {
		yield Promise.all(reputables.map((() => {
			var _ref2 = _asyncToGenerator(function* (reputable) {
				reputable.reputation = yield getReputation(reputable);
				return true;
			});

			return function (_x2) {
				return _ref2.apply(this, arguments);
			};
		})()));
		repTotalCache = {};
		return true;
	});

	return function getReputations(_x) {
		return _ref.apply(this, arguments);
	};
})();

const getReputation = (() => {
	var _ref3 = _asyncToGenerator(function* (reputable) {
		const reputation = yield eos.read({
			table: 'reputations',
			scope: reputable.id,
			limit: 1,
			firstOnly: true
		}).catch(function () {
			return null;
		});

		if (!reputation) return _Reputable.Reputation.placeholder();

		const fragTotals = yield Promise.all(reputation.fragments.map((() => {
			var _ref4 = _asyncToGenerator(function* (x) {

				if (repTotalCache.hasOwnProperty(x.fingerprint)) return repTotalCache[x.fingerprint];

				const rep = eos.read({
					table: 'fragtotal',
					scope: x.fingerprint,
					limit: 1,
					firstOnly: true
				}).catch(function () {
					return null;
				});

				if (rep) repTotalCache[x.fingerprint] = rep;
				return rep;
			});

			return function (_x4) {
				return _ref4.apply(this, arguments);
			};
		})()));

		const parseAsset = function (asset) {
			return parseFloat(asset.split(' ')[0]);
		};

		reputation.fragments.map(function (frag) {
			const fragTotal = fragTotals.find(function (x) {
				return x.type === frag.type;
			});
			frag.reputation = 0;

			const up = parseAsset(frag.up);
			const down = parseAsset(frag.down);
			const tup = parseAsset(fragTotal.up);
			const tdown = parseAsset(fragTotal.down);

			// TODO: Might be an issue here.
			frag.reputation = (up > 0 ? up / tup : 0) - (down > 0 ? down / tdown : 0);

			const timeMod = (Math.floor(+new Date() / 1000) - reputable.last_repute_time) / 100000000;
			if (frag.reputation > 0 && frag.reputation - timeMod > frag.reputation / 2) frag.timeScaledReputation = frag.reputation - timeMod;else if (frag.reputation < 0 && frag.reputation + timeMod < frag.reputation / 2) frag.timeScaledReputation = frag.reputation + timeMod;else frag.timeScaledReputation = frag.reputation;

			frag.reputation = parseFloat(frag.reputation).toFixed(4);
			frag.timeScaledReputation = parseFloat(frag.timeScaledReputation).toFixed(4);
			frag.fingerprint = fragTotal.fingerprint;
		});

		delete reputation.id;
		return _Reputable.Reputation.fromJson(reputation);
	});

	return function getReputation(_x3) {
		return _ref3.apply(this, arguments);
	};
})();

const getParents = (() => {
	var _ref5 = _asyncToGenerator(function* (reputable, last = null) {
		if (reputable.base === 0 || last && last.base === 0) {
			let parents = [];
			const getParents = function (r = null) {
				if (!r) r = reputable;
				if (!r.parent) return;
				parents.unshift(r.parent);
				return getParents(r.parent);
			};
			getParents();
			yield getReputations(parents);
			return true;
		}

		const parent = yield eos.read({
			table: 'reputables',
			index: last ? last.base : reputable.base,
			limit: 1,
			firstOnly: true,
			model: _Reputable2.default
		}).catch(function () {
			return null;
		});

		if (last) last.parent = parent;else reputable.parent = parent;

		return yield getParents(reputable, parent);
	});

	return function getParents(_x5) {
		return _ref5.apply(this, arguments);
	};
})();

class ReputationService {

	constructor() {}

	repute(username, id = 0, entity, type, fragments, network = "", parent = '', details = "") {
		return _asyncToGenerator(function* () {
			if (entity.indexOf('::') > -1) throw new Error('Entities can not have "::" in them.');

			if (parent instanceof _Reputable2.default) parent = parent.id === -1 ? `fingerprint::${parent.entity}::${parent.type}::${parent.network}` : `id::${parent.id}`;else if (typeof parent === 'number') parent = `id::${parent}`;else if (typeof parent === 'string' && parent.toString().length > 0 && parent.indexOf('::') > -1) parent = `fingerprint::${parent}`;

			if (!fragments.every(function (frag) {
				return frag instanceof _Reputable.Fragment && frag.validate();
			})) throw new Error('Invalid fragments');
			return eos.contract.repute(username, id, entity, type, fragments, network, parent, details, eos.options);
		})();
	}

	votetype(username, type) {
		return _asyncToGenerator(function* () {
			return eos.contract.votetype(username, type, eos.options);
		})();
	}

	getEntity(id) {
		return _asyncToGenerator(function* () {

			const reputable = yield eos.read({
				table: 'reputables',
				index: id,
				limit: 1,
				firstOnly: true,
				model: _Reputable2.default
			}).catch(function () {
				return null;
			});

			if (!reputable) return null;

			yield getReputations([reputable]);
			yield getParents(reputable);

			return reputable;
		})();
	}

	getReputationAndParents(reputable) {
		return _asyncToGenerator(function* () {
			yield getReputations([reputable]);
			yield getParents(reputable);
			return true;
		})();
	}

	searchForEntity(name) {
		return _asyncToGenerator(function* () {

			const reputables = yield eos.read({
				table: 'reputables',
				index: (0, _helpers.fingerprinted)(name),
				key_type: 'i64',
				index_position: 2,
				limit: 500,
				rowsOnly: true,
				model: _Reputable2.default
			}).catch(function () {
				return [];
			});

			if (reputables.length) {
				yield getReputations(reputables);
				yield Promise.all(reputables.map(function (reputable) {
					return getParents(reputable);
				}));
			}

			return reputables;
		})();
	}

	searchByFingerprint(type = '', entity = '', network = '', base = 0) {
		return _asyncToGenerator(function* () {

			const reputable = yield eos.read({
				table: 'reputables',
				index: (0, _helpers.fingerprinted)(type + entity + network + base),
				key_type: 'i64',
				index_position: 3,
				limit: 1,
				firstOnly: true,
				model: _Reputable2.default
			}).catch(function () {
				return null;
			});

			if (!reputable) return null;

			yield getReputations([reputable]);
			yield getParents(reputable);

			return reputable;
		})();
	}

	searchByParent(parentId) {
		return _asyncToGenerator(function* () {

			const reputables = yield eos.read({
				table: 'reputables',
				index: parentId,
				search: 0,
				key_type: 'i64',
				index_position: 4,
				limit: 500,
				rowsOnly: true,
				model: _Reputable2.default
			}).catch(function () {
				return [];
			});

			if (reputables.length) {
				yield getReputations(reputables);
				yield Promise.all(reputables.map(function (reputable) {
					return getParents(reputable);
				}));
			}

			return reputables;
		})();
	}

	getFragments(base = 0) {
		return _asyncToGenerator(function* () {
			return eos.read({
				table: 'reptypes',
				key_type: 'i64',
				index_position: 2,
				index: base,
				search: 1,
				limit: 100,
				rowsOnly: true,
				model: _Reputable.RepType
			}).catch(function () {
				return [];
			});
		})();
	}

	getFragmentsFor(reputable = null) {
		var _this = this;

		return _asyncToGenerator(function* () {
			const globalFragments = yield _this.getFragments();
			const basedFragments = reputable ? (yield _this.getFragments(reputable.id)).map(function (x) {
				x.isBased = true;
				return x;
			}) : [];
			return globalFragments.concat(basedFragments);
		})();
	}

	getMiners(id) {
		return _asyncToGenerator(function* () {

			return eos.read({
				table: 'minerfrags',
				scope: id,
				limit: 500,
				rowsOnly: true
			}).catch(function () {
				return null;
			});
		})();
	}
}
exports.default = ReputationService;

/***/ }),

/***/ "5XvV":
/***/ (function(module, exports, __webpack_require__) {

const crypto = __webpack_require__("HEbw")
const {
  checkAndInit,
  smixSync
} = __webpack_require__("jzvA")

// N = Cpu cost, r = Memory cost, p = parallelization cost
function scrypt (key, salt, N, r, p, dkLen, progressCallback) {
  const {
    XY,
    V,
    B32,
    x,
    _X,
    B,
    tickCallback
  } = checkAndInit(key, salt, N, r, p, dkLen, progressCallback)

  for (var i = 0; i < p; i++) {
    smixSync(B, i * 128 * r, r, N, V, XY, _X, B32, x, tickCallback)
  }

  return crypto.pbkdf2Sync(key, B, 1, dkLen, 'sha256')
}

module.exports = scrypt


/***/ }),

/***/ "CWBI":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("sZro");


/***/ }),

/***/ "EChu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Identity {

    constructor() {
        this.id = -1;
        this.fingerprint = '';
        this.username = '';
        this.key = '';
        this.account = '';
        this.expires = -1;
        this.tokens = null;
        this.total_rep = 0;
        this.usable_rep = 0;
        this.expansion = null;
        this.bonded = null;
        this.created = 0;
    }

    static placeholder() {
        return new Identity();
    }
    static fromJson(json) {
        return Object.assign(Identity.placeholder(), json);
    }

    tokenCapacity() {
        const parse = x => parseFloat(x.split(' ')[0]);
        return `${parseFloat(100 + parseFloat(parse(this.expansion) + parse(this.bonded) + parse(this.usable_rep))).toFixed(4)} RIDL`;
    }

}
exports.default = Identity;

/***/ }),

/***/ "Edxu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
var MAX_BYTES = 65536

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
var MAX_UINT32 = 4294967295

function oldBrowser () {
  throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
}

var Buffer = __webpack_require__("hwdV").Buffer
var crypto = global.crypto || global.msCrypto

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes
} else {
  module.exports = oldBrowser
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')

  var bytes = Buffer.allocUnsafe(size)

  if (size > 0) {  // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues
      // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
      for (var generated = 0; generated < size; generated += MAX_BYTES) {
        // buffer.slice automatically checks if the end is past the end of
        // the buffer so we don't have to here
        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES))
      }
    } else {
      crypto.getRandomValues(bytes)
    }
  }

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("8oxB")))

/***/ }),

/***/ "G1R0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__("hwdV").Buffer
var bip66 = __webpack_require__("zRCy")

var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
  // begin
  0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x21, 0x02, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
  // begin
  0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x41, 0x04, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0E, 0x11,
  0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10,
  0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

exports.privateKeyExport = function (privateKey, publicKey, compressed) {
  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED)
  privateKey.copy(result, compressed ? 8 : 9)
  publicKey.copy(result, compressed ? 181 : 214)
  return result
}

exports.privateKeyImport = function (privateKey) {
  var length = privateKey.length

  // sequence header
  var index = 0
  if (length < index + 1 || privateKey[index] !== 0x30) return
  index += 1

  // sequence length constructor
  if (length < index + 1 || !(privateKey[index] & 0x80)) return

  var lenb = privateKey[index] & 0x7f
  index += 1
  if (lenb < 1 || lenb > 2) return
  if (length < index + lenb) return

  // sequence length
  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0)
  index += lenb
  if (length < index + len) return

  // sequence element 0: version number (=1)
  if (length < index + 3 ||
      privateKey[index] !== 0x02 ||
      privateKey[index + 1] !== 0x01 ||
      privateKey[index + 2] !== 0x01) {
    return
  }
  index += 3

  // sequence element 1: octet string, up to 32 bytes
  if (length < index + 2 ||
      privateKey[index] !== 0x04 ||
      privateKey[index + 1] > 0x20 ||
      length < index + 2 + privateKey[index + 1]) {
    return
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1])
}

exports.signatureExport = function (sigObj) {
  var r = Buffer.concat([Buffer.from([0]), sigObj.r])
  for (var lenR = 33, posR = 0; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

  var s = Buffer.concat([Buffer.from([0]), sigObj.s])
  for (var lenS = 33, posS = 0; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

  return bip66.encode(r.slice(posR), s.slice(posS))
}

exports.signatureImport = function (sig) {
  var r = Buffer.alloc(32, 0)
  var s = Buffer.alloc(32, 0)

  try {
    var sigObj = bip66.decode(sig)
    if (sigObj.r.length === 33 && sigObj.r[0] === 0x00) sigObj.r = sigObj.r.slice(1)
    if (sigObj.r.length > 32) throw new Error('R length is too long')
    if (sigObj.s.length === 33 && sigObj.s[0] === 0x00) sigObj.s = sigObj.s.slice(1)
    if (sigObj.s.length > 32) throw new Error('S length is too long')
  } catch (err) {
    return
  }

  sigObj.r.copy(r, 32 - sigObj.r.length)
  sigObj.s.copy(s, 32 - sigObj.s.length)

  return { r: r, s: s }
}

exports.signatureImportLax = function (sig) {
  var r = Buffer.alloc(32, 0)
  var s = Buffer.alloc(32, 0)

  var length = sig.length
  var index = 0

  // sequence tag byte
  if (sig[index++] !== 0x30) return

  // sequence length byte
  var lenbyte = sig[index++]
  if (lenbyte & 0x80) {
    index += lenbyte - 0x80
    if (index > length) return
  }

  // sequence tag byte for r
  if (sig[index++] !== 0x02) return

  // length for r
  var rlen = sig[index++]
  if (rlen & 0x80) {
    lenbyte = rlen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) rlen = (rlen << 8) + sig[index]
  }
  if (rlen > length - index) return
  var rindex = index
  index += rlen

  // sequence tag byte for s
  if (sig[index++] !== 0x02) return

  // length for s
  var slen = sig[index++]
  if (slen & 0x80) {
    lenbyte = slen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) slen = (slen << 8) + sig[index]
  }
  if (slen > length - index) return
  var sindex = index
  index += slen

  // ignore leading zeros in r
  for (; rlen > 0 && sig[rindex] === 0x00; rlen -= 1, rindex += 1);
  // copy r value
  if (rlen > 32) return
  var rvalue = sig.slice(rindex, rindex + rlen)
  rvalue.copy(r, 32 - rvalue.length)

  // ignore leading zeros in s
  for (; slen > 0 && sig[sindex] === 0x00; slen -= 1, sindex += 1);
  // copy s value
  if (slen > 32) return
  var svalue = sig.slice(sindex, sindex + slen)
  svalue.copy(s, 32 - svalue.length)

  return { r: r, s: s }
}


/***/ }),

/***/ "GP3i":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__("hwdV").Buffer
var createHash = __webpack_require__("mObS")
var BN = __webpack_require__("OZ/i")
var EC = __webpack_require__("MzeL").ec

var messages = __webpack_require__("+MEZ")

var ec = new EC('secp256k1')
var ecparams = ec.curve

function loadCompressedPublicKey (first, xBuffer) {
  var x = new BN(xBuffer)

  // overflow
  if (x.cmp(ecparams.p) >= 0) return null
  x = x.toRed(ecparams.red)

  // compute corresponding Y
  var y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt()
  if ((first === 0x03) !== y.isOdd()) y = y.redNeg()

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadUncompressedPublicKey (first, xBuffer, yBuffer) {
  var x = new BN(xBuffer)
  var y = new BN(yBuffer)

  // overflow
  if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null

  x = x.toRed(ecparams.red)
  y = y.toRed(ecparams.red)

  // is odd flag
  if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

  // x*x*x + b = y*y
  var x3 = x.redSqr().redIMul(x)
  if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadPublicKey (publicKey) {
  var first = publicKey[0]
  switch (first) {
    case 0x02:
    case 0x03:
      if (publicKey.length !== 33) return null
      return loadCompressedPublicKey(first, publicKey.slice(1, 33))
    case 0x04:
    case 0x06:
    case 0x07:
      if (publicKey.length !== 65) return null
      return loadUncompressedPublicKey(first, publicKey.slice(1, 33), publicKey.slice(33, 65))
    default:
      return null
  }
}

exports.privateKeyVerify = function (privateKey) {
  var bn = new BN(privateKey)
  return bn.cmp(ecparams.n) < 0 && !bn.isZero()
}

exports.privateKeyExport = function (privateKey, compressed) {
  var d = new BN(privateKey)
  if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL)

  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, true))
}

exports.privateKeyNegate = function (privateKey) {
  var bn = new BN(privateKey)
  return bn.isZero() ? Buffer.alloc(32) : ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Buffer, 'be', 32)
}

exports.privateKeyModInverse = function (privateKey) {
  var bn = new BN(privateKey)
  if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_RANGE_INVALID)

  return bn.invm(ecparams.n).toArrayLike(Buffer, 'be', 32)
}

exports.privateKeyTweakAdd = function (privateKey, tweak) {
  var bn = new BN(tweak)
  if (bn.cmp(ecparams.n) >= 0) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

  bn.iadd(new BN(privateKey))
  if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n)
  if (bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

  return bn.toArrayLike(Buffer, 'be', 32)
}

exports.privateKeyTweakMul = function (privateKey, tweak) {
  var bn = new BN(tweak)
  if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL)

  bn.imul(new BN(privateKey))
  if (bn.cmp(ecparams.n)) bn = bn.umod(ecparams.n)

  return bn.toArrayLike(Buffer, 'be', 32)
}

exports.publicKeyCreate = function (privateKey, compressed) {
  var d = new BN(privateKey)
  if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL)

  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, true))
}

exports.publicKeyConvert = function (publicKey, compressed) {
  var pair = loadPublicKey(publicKey)
  if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  return Buffer.from(pair.getPublic(compressed, true))
}

exports.publicKeyVerify = function (publicKey) {
  return loadPublicKey(publicKey) !== null
}

exports.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
  var pair = loadPublicKey(publicKey)
  if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  tweak = new BN(tweak)
  if (tweak.cmp(ecparams.n) >= 0) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL)

  var point = ecparams.g.mul(tweak).add(pair.pub)
  if (point.isInfinity()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL)

  return Buffer.from(point.encode(true, compressed))
}

exports.publicKeyTweakMul = function (publicKey, tweak, compressed) {
  var pair = loadPublicKey(publicKey)
  if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  tweak = new BN(tweak)
  if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL)

  return Buffer.from(pair.pub.mul(tweak).encode(true, compressed))
}

exports.publicKeyCombine = function (publicKeys, compressed) {
  var pairs = new Array(publicKeys.length)
  for (var i = 0; i < publicKeys.length; ++i) {
    pairs[i] = loadPublicKey(publicKeys[i])
    if (pairs[i] === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)
  }

  var point = pairs[0].pub
  for (var j = 1; j < pairs.length; ++j) point = point.add(pairs[j].pub)
  if (point.isInfinity()) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL)

  return Buffer.from(point.encode(true, compressed))
}

exports.signatureNormalize = function (signature) {
  var r = new BN(signature.slice(0, 32))
  var s = new BN(signature.slice(32, 64))
  if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  var result = Buffer.from(signature)
  if (s.cmp(ec.nh) === 1) ecparams.n.sub(s).toArrayLike(Buffer, 'be', 32).copy(result, 32)

  return result
}

exports.signatureExport = function (signature) {
  var r = signature.slice(0, 32)
  var s = signature.slice(32, 64)
  if (new BN(r).cmp(ecparams.n) >= 0 || new BN(s).cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  return { r: r, s: s }
}

exports.signatureImport = function (sigObj) {
  var r = new BN(sigObj.r)
  if (r.cmp(ecparams.n) >= 0) r = new BN(0)

  var s = new BN(sigObj.s)
  if (s.cmp(ecparams.n) >= 0) s = new BN(0)

  return Buffer.concat([
    r.toArrayLike(Buffer, 'be', 32),
    s.toArrayLike(Buffer, 'be', 32)
  ])
}

exports.sign = function (message, privateKey, noncefn, data) {
  if (typeof noncefn === 'function') {
    var getNonce = noncefn
    noncefn = function (counter) {
      var nonce = getNonce(message, privateKey, null, data, counter)
      if (!Buffer.isBuffer(nonce) || nonce.length !== 32) throw new Error(messages.ECDSA_SIGN_FAIL)

      return new BN(nonce)
    }
  }

  var d = new BN(privateKey)
  if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL)

  var result = ec.sign(message, privateKey, { canonical: true, k: noncefn, pers: data })
  return {
    signature: Buffer.concat([
      result.r.toArrayLike(Buffer, 'be', 32),
      result.s.toArrayLike(Buffer, 'be', 32)
    ]),
    recovery: result.recoveryParam
  }
}

exports.verify = function (message, signature, publicKey) {
  var sigObj = { r: signature.slice(0, 32), s: signature.slice(32, 64) }

  var sigr = new BN(sigObj.r)
  var sigs = new BN(sigObj.s)
  if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)
  if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return false

  var pair = loadPublicKey(publicKey)
  if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  return ec.verify(message, sigObj, { x: pair.pub.x, y: pair.pub.y })
}

exports.recover = function (message, signature, recovery, compressed) {
  var sigObj = { r: signature.slice(0, 32), s: signature.slice(32, 64) }

  var sigr = new BN(sigObj.r)
  var sigs = new BN(sigObj.s)
  if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  try {
    if (sigr.isZero() || sigs.isZero()) throw new Error()

    var point = ec.recoverPubKey(message, sigObj, recovery)
    return Buffer.from(point.encode(true, compressed))
  } catch (err) {
    throw new Error(messages.ECDSA_RECOVER_FAIL)
  }
}

exports.ecdh = function (publicKey, privateKey) {
  var shared = exports.ecdhUnsafe(publicKey, privateKey, true)
  return createHash('sha256').update(shared).digest()
}

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  var pair = loadPublicKey(publicKey)
  if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  var scalar = new BN(privateKey)
  if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) throw new Error(messages.ECDH_FAIL)

  return Buffer.from(pair.pub.mul(scalar).encode(true, compressed))
}


/***/ }),

/***/ "INNF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.read = exports.canConnect = exports.init = exports.account = exports.options = exports.token = exports.contract = exports.reader = exports.writer = exports.tokenCode = exports.ridlCode = exports.encodeName = undefined;

var _eosjs = __webpack_require__("07fN");

var _eosjs2 = _interopRequireDefault(_eosjs);

var _Network = __webpack_require__("PA13");

var _Network2 = _interopRequireDefault(_Network);

var _bignumber = __webpack_require__("kB5k");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { format } = _eosjs2.default.modules;
const encodeName = exports.encodeName = name => format.encodeName(name, false);

const ridlCode = exports.ridlCode = 'ridlridlridl';
const tokenCode = exports.tokenCode = 'ridlridlcoin';

let writer = exports.writer = null;
let reader = exports.reader = null;
let contract = exports.contract = null;
let token = exports.token = null;
let options = exports.options = {};
let account = exports.account = null;
let net = null;

/***
 * Can be initialized as a reader only.
 * @param network
 * @param _account
 * @param signProvider
 * @returns {Promise.<boolean>}
 */
const init = exports.init = (() => {
    var _ref = _asyncToGenerator(function* (network, _account = null, signProvider = null) {
        network = _Network2.default.fromJson(network);
        net = network;
        if (!!_account) exports.account = account = _account;

        if (!(yield canConnect())) {
            exports.writer = writer = null;
            exports.contract = contract = null;
            exports.token = token = null;
            exports.options = options = {};
            return false;
        }

        exports.reader = reader = (0, _eosjs2.default)({ httpEndpoint: network.fullhost(), chainId: network.chainId });

        if (signProvider) {
            exports.writer = writer = (0, _eosjs2.default)({ httpEndpoint: network.fullhost(), chainId: network.chainId, signProvider });
            exports.contract = contract = yield writer.contract(ridlCode);
            exports.token = token = yield writer.contract(tokenCode);
        } else {
            exports.writer = writer = null;
            exports.contract = contract = null;
            exports.token = token = null;
        }

        const baseOptions = {
            logger: {
                log: null, //console.log,
                error: null //console.error
            }
        };

        exports.options = options = Object.assign(baseOptions, !!_account ? { authorization: [`${_account.name}@${_account.authority}`] } : {});
        return true;
    });

    return function init(_x) {
        return _ref.apply(this, arguments);
    };
})();

/***
 * Checks the connection to the network.
 * @returns {Promise.<*>}
 */
const canConnect = exports.canConnect = (() => {
    var _ref2 = _asyncToGenerator(function* () {
        const timeout = new Promise(function (r) {
            setTimeout(function () {
                return r(false);
            }, 1500);
        });
        const tester = fetch(`${net.fullhost()}/v1/chain/get_info`).then(function () {
            return true;
        }).catch(function () {
            return false;
        });
        return Promise.race([timeout, tester]);
    });

    return function canConnect() {
        return _ref2.apply(this, arguments);
    };
})();

const read = exports.read = (() => {
    var _ref3 = _asyncToGenerator(function* ({ table, index = null, upper_bound = null, nobound = false, limit = 10, model = null, scope = ridlCode, token = false, firstOnly = false, rowsOnly = false, key_type = null, index_position = null, search = null }) {
        let additions = index !== null ? { lower_bound: index, upper_bound: upper_bound ? upper_bound : (0, _bignumber.BigNumber)(index).plus(search !== null ? search : limit).toString() } : {};
        if (nobound) delete additions.upper_bound;
        if (key_type) additions = Object.assign({ key_type }, additions);
        if (index_position) additions = Object.assign({ index_position }, additions);
        return yield reader.getTableRows(Object.assign({ json: true, code: token ? tokenCode : ridlCode, scope, table, limit }, additions)).then(function (result) {
            if (model) result = formatRow(result, model);
            if (firstOnly) return getFirstOnly(result);
            if (rowsOnly) return getRowsOnly(result);
            return result;
        });
    });

    return function read(_x2) {
        return _ref3.apply(this, arguments);
    };
})();

const formatRow = (result, model) => {
    result.rows = result.rows.map(model.fromJson);
    return result;
};

const getRowsOnly = result => result.rows;
const getFirstOnly = result => result.rows.length ? getRowsOnly(result)[0] : null;

/***/ }),

/***/ "IzB8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__("Oomr")(__webpack_require__("GP3i"))


/***/ }),

/***/ "J78i":
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

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__("sZro");

/*<replacement>*/
var util = __webpack_require__("Onz0");
util.inherits = __webpack_require__("P7XM");
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ "LGOv":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("3BRs");


/***/ }),

/***/ "Lnfy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _eos = __webpack_require__("INNF");

var eos = _interopRequireWildcard(_eos);

var _Bond = __webpack_require__("ocSM");

var _Bond2 = _interopRequireDefault(_Bond);

var _helpers = __webpack_require__("qOpi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class BondService {

				constructor() {}

				get(bond_id) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'bonds',
																index: bond_id,
																limit: 1,
																model: _Bond2.default,
																firstOnly: true
												});
								})();
				}

				findByFingerprint(title, details, username, limit, fixed_party) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'bonds',
																key_type: 'i64',
																index_position: 3,
																index: (0, _helpers.fingerprinted)(title + details + username + limit + fixed_party),
																nobound: true,
																limit: 1,
																model: _Bond2.default,
																firstOnly: true
												});
								})();
				}

				findBonds(identity_id) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'bonds',
																key_type: 'i64',
																index_position: 2,
																index: identity_id,
																limit: 500,
																model: _Bond2.default,
																rowsOnly: true
												});
								})();
				}

				createbond(username, title, details, duration, limit, starts_in_seconds = 0, fixed_party = 0) {
								var _this = this;

								return _asyncToGenerator(function* () {
												return eos.contract.createbond(username, title, details, duration, starts_in_seconds, limit, fixed_party, eos.options).then(function () {
																return _this.findByFingerprint(title, details, username, limit, fixed_party);
												});
								})();
				}

				disputebond(username, bond_id, rep = '1.0000 REP') {
								return _asyncToGenerator(function* () {
												return eos.contract.disputebond(username, bond_id, rep, eos.options);
								})();
				}

				cancelbond(username, bond_id) {
								return _asyncToGenerator(function* () {
												return eos.contract.cancelbond(username, bond_id, eos.options);
								})();
				}

				closebond(bond_id) {
								return _asyncToGenerator(function* () {
												return eos.contract.closebond(bond_id, eos.options);
								})();
				}

				erasebond(bond_id) {
								return _asyncToGenerator(function* () {
												return eos.contract.erasebond(bond_id, eos.options);
								})();
				}
}
exports.default = BondService;

/***/ }),

/***/ "Oomr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var assert = __webpack_require__("isQN")
var der = __webpack_require__("G1R0")
var messages = __webpack_require__("+MEZ")

function initCompressedValue (value, defaultValue) {
  if (value === undefined) return defaultValue

  assert.isBoolean(value, messages.COMPRESSED_TYPE_INVALID)
  return value
}

module.exports = function (secp256k1) {
  return {
    privateKeyVerify: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      return privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)
    },

    privateKeyExport: function (privateKey, compressed) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)
      var publicKey = secp256k1.privateKeyExport(privateKey, compressed)

      return der.privateKeyExport(privateKey, publicKey, compressed)
    },

    privateKeyImport: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)

      privateKey = der.privateKeyImport(privateKey)
      if (privateKey && privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)) return privateKey

      throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL)
    },

    privateKeyNegate: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      return secp256k1.privateKeyNegate(privateKey)
    },

    privateKeyModInverse: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      return secp256k1.privateKeyModInverse(privateKey)
    },

    privateKeyTweakAdd: function (privateKey, tweak) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      return secp256k1.privateKeyTweakAdd(privateKey, tweak)
    },

    privateKeyTweakMul: function (privateKey, tweak) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      return secp256k1.privateKeyTweakMul(privateKey, tweak)
    },

    publicKeyCreate: function (privateKey, compressed) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyCreate(privateKey, compressed)
    },

    publicKeyConvert: function (publicKey, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyConvert(publicKey, compressed)
    },

    publicKeyVerify: function (publicKey) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      return secp256k1.publicKeyVerify(publicKey)
    },

    publicKeyTweakAdd: function (publicKey, tweak, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyTweakAdd(publicKey, tweak, compressed)
    },

    publicKeyTweakMul: function (publicKey, tweak, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyTweakMul(publicKey, tweak, compressed)
    },

    publicKeyCombine: function (publicKeys, compressed) {
      assert.isArray(publicKeys, messages.EC_PUBLIC_KEYS_TYPE_INVALID)
      assert.isLengthGTZero(publicKeys, messages.EC_PUBLIC_KEYS_LENGTH_INVALID)
      for (var i = 0; i < publicKeys.length; ++i) {
        assert.isBuffer(publicKeys[i], messages.EC_PUBLIC_KEY_TYPE_INVALID)
        assert.isBufferLength2(publicKeys[i], 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)
      }

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyCombine(publicKeys, compressed)
    },

    signatureNormalize: function (signature) {
      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      return secp256k1.signatureNormalize(signature)
    },

    signatureExport: function (signature) {
      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = secp256k1.signatureExport(signature)
      return der.signatureExport(sigObj)
    },

    signatureImport: function (sig) {
      assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = der.signatureImport(sig)
      if (sigObj) return secp256k1.signatureImport(sigObj)

      throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
    },

    signatureImportLax: function (sig) {
      assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = der.signatureImportLax(sig)
      if (sigObj) return secp256k1.signatureImport(sigObj)

      throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
    },

    sign: function (message, privateKey, options) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      var data = null
      var noncefn = null
      if (options !== undefined) {
        assert.isObject(options, messages.OPTIONS_TYPE_INVALID)

        if (options.data !== undefined) {
          assert.isBuffer(options.data, messages.OPTIONS_DATA_TYPE_INVALID)
          assert.isBufferLength(options.data, 32, messages.OPTIONS_DATA_LENGTH_INVALID)
          data = options.data
        }

        if (options.noncefn !== undefined) {
          assert.isFunction(options.noncefn, messages.OPTIONS_NONCEFN_TYPE_INVALID)
          noncefn = options.noncefn
        }
      }

      return secp256k1.sign(message, privateKey, noncefn, data)
    },

    verify: function (message, signature, publicKey) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      return secp256k1.verify(message, signature, publicKey)
    },

    recover: function (message, signature, recovery, compressed) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      assert.isNumber(recovery, messages.RECOVERY_ID_TYPE_INVALID)
      assert.isNumberInInterval(recovery, -1, 4, messages.RECOVERY_ID_VALUE_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.recover(message, signature, recovery, compressed)
    },

    ecdh: function (publicKey, privateKey) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      return secp256k1.ecdh(publicKey, privateKey)
    },

    ecdhUnsafe: function (publicKey, privateKey, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.ecdhUnsafe(publicKey, privateKey, compressed)
    }
  }
}


/***/ }),

/***/ "PA13":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Network {
    constructor(_protocol = 'https', _host = '', _port = 0, chainId = '', blockchain = 'eos') {
        this.protocol = _protocol;
        this.host = _host;
        this.port = _port;
        this.chainId = chainId.toString();
        this.blockchain = blockchain;
    }

    static placeholder() {
        return new Network();
    }

    static fromJson(json) {
        const p = Object.assign(Network.placeholder(), json);
        p.chainId = p.chainId ? p.chainId.toString() : '';
        return p;
    }

    hostport() {
        return `${this.host}${this.port ? ':' : ''}${this.port}`;
    }
    fullhost() {
        return `${this.protocol}://${this.host}${this.port ? ':' : ''}${this.port}`;
    }
    id() {
        return `${this.blockchain}::${this.chainId}`;
    }
}
exports.default = Network;

/***/ }),

/***/ "QpuX":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("+qE3").EventEmitter;


/***/ }),

/***/ "RoFp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__("lm0R");
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ "TCWg":
/***/ (function(module, exports) {

module.exports = window.crypto;

/***/ }),

/***/ "VLdL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FRAG_TYPES = exports.RepType = exports.Fragment = exports.Reputation = exports.Reputable = undefined;

var _eos = __webpack_require__("INNF");

var eos = _interopRequireWildcard(_eos);

var _identity = __webpack_require__("XAle");

var _identity2 = _interopRequireDefault(_identity);

var _reputation = __webpack_require__("4uyc");

var _reputation2 = _interopRequireDefault(_reputation);

var _bond = __webpack_require__("Lnfy");

var _bond2 = _interopRequireDefault(_bond);

var _Reputable = __webpack_require__("j9m8");

var _Reputable2 = _interopRequireDefault(_Reputable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const FRAG_TYPES = {
    BLOCKCHAIN_ADDR: 'acc',
    ACTION: 'act',
    APPLICATION: 'app',
    IDENTITY: 'id',
    OTHER: 'etc'
};

exports.Reputable = _Reputable2.default;
exports.Reputation = _Reputable.Reputation;
exports.Fragment = _Reputable.Fragment;
exports.RepType = _Reputable.RepType;
exports.FRAG_TYPES = FRAG_TYPES;


class RIDL {

    constructor() {
        this.identity = new _identity2.default();
        this.reputation = new _reputation2.default();
        this.bond = new _bond2.default();
    }

    /***
     * Initializes RIDL for a specified account. Can be re-initialized as
     * many times as needed.
     * -------------------------------
     * Can be initialized as a reader only by passing nulls into the
     * account and signProvider parameters.
     * @param network
     * @param account
     * @param signProvider
     * @returns {Promise}
     */
    init(network, account = null, signProvider = null) {
        return eos.init(network, account, signProvider);
    }

    canConnect() {
        return eos.canConnect();
    }

}

exports.default = new RIDL();

/***/ }),

/***/ "XAle":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _eos = __webpack_require__("INNF");

var eos = _interopRequireWildcard(_eos);

var _Identity = __webpack_require__("EChu");

var _Identity2 = _interopRequireDefault(_Identity);

var _Reputable = __webpack_require__("j9m8");

var _helpers = __webpack_require__("qOpi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getIdentity = (() => {
				var _ref = _asyncToGenerator(function* (username) {
								return yield eos.read({
												table: 'ids',
												key_type: 'i64',
												index_position: 3,
												index: (0, _helpers.fingerprinted)(username),
												limit: 1,
												model: _Identity2.default,
												firstOnly: true
								});
				});

				return function getIdentity(_x) {
								return _ref.apply(this, arguments);
				};
})();

class IdentityService {

				constructor() {
								this.paymentSymbol = 'EOS';
				}

				setSymbol(symbol) {
								this.paymentSymbol = symbol;
				}
				validName(name) {
								return (/^[a-zA-Z0-9_-]{3,20}$/.test(name)
								);
				}

				/***
     * Gets an identity based on a username
     * @param username
     * @returns {Promise<*>}
     */
				get(username) {
								return _asyncToGenerator(function* () {
												return getIdentity(username);
								})();
				}

				getById(id) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'ids',
																index: id,
																limit: 1,
																model: _Identity2.default,
																firstOnly: true
												});
								})();
				}

				getByAccount(accountName) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'ids',
																key_type: 'i64',
																index_position: 2,
																index: eos.encodeName(accountName),
																// nobound:true,
																limit: 1,
																model: _Identity2.default,
																rowsOnly: true
												});
								})();
				}

				/***
     * Pays for and identifies an identity
     * @param username
     * @param key
     * @returns {Promise<*>}
     */
				payAndIdentify(username, key) {
								var _this = this;

								return _asyncToGenerator(function* () {
												return eos.writer.transaction(['eosio.token', 'ridlridlridl'], function (contracts) {
																contracts.eosio_token.transfer(eos.account.name, 'ridlridlridl', `1.0000 ${_this.paymentSymbol}`, '', eos.options);
																contracts.ridlridlridl.identify(eos.account.name, username, key, eos.options);
												});
								})();
				}

				/***
     * Changes the identity key
     * @param username
     * @param key
     * @returns {Promise<T | boolean>}
     */
				changekey(username, key) {
								var _this2 = this;

								return _asyncToGenerator(function* () {
												return eos.contract.changekey(username, key, eos.options).then(function () {
																return _this2.get(username);
												}).catch(function (err) {
																return false;
												});
								})();
				}

				/***
     * Changes the identity account
     * @param username
     * @param key
     * @returns {Promise<T | boolean>}
     */
				changeacc(username, newAccountName) {
								var _this3 = this;

								return _asyncToGenerator(function* () {
												return eos.contract.changeacc(username, newAccountName, eos.options).then(function () {
																return _this3.get(username);
												}).catch(function (err) {
																return false;
												});
								})();
				}

				/***
     * Loads up RIDL tokens on the identity
     * @param username
     * @param amount
     * @returns {Promise<T | boolean>}
     */
				loadtokens(username, amount) {
								var _this4 = this;

								return _asyncToGenerator(function* () {
												amount = parseFloat(amount.toString().split(' ')[0]).toFixed(4);
												if (amount <= 0) throw new Error("Amount must be greater than 0");

												return eos.writer.transaction([_eos.tokenCode, _eos.ridlCode], function (contracts) {
																contracts[_eos.tokenCode].transfer(eos.account.name, _eos.ridlCode, `${amount} RIDL`, '', eos.options);
																contracts[_eos.ridlCode].loadtokens(username, `${amount} RIDL`, eos.options);
												}).then(function () {
																return _this4.get(username);
												}).catch(function (err) {
																return false;
												});
								})();
				}

				/***
     * Claims a reserved identity
     * @param username
     * @param key
     * @param signature
     * @returns {Promise<T | void>}
     */
				claim(username, key, signature) {
								var _this5 = this;

								return _asyncToGenerator(function* () {
												return eos.contract.claim(eos.account.name, username, key, signature, eos.options).then(function () {
																return _this5.get(username);
												});
								})();
				}

				identityBalance(username) {
								return _asyncToGenerator(function* () {
												return getIdentity(username).then(function (res) {
																return res.tokens;
												}).catch(function () {
																return null;
												});
								})();
				}

				accountBalance(name, asFloat = false) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																token: true,
																table: 'accounts',
																scope: (0, _eos.encodeName)(name),
																limit: 1,
																firstOnly: true
												}).then(function (x) {
																const quantity = x ? x.balance : '0.0000 RIDL';
																return asFloat ? parseFloat(quantity.split(' ')[0]) : quantity;
												});
								})();
				}

				exists(name) {
								var _this6 = this;

								return _asyncToGenerator(function* () {
												return yield _this6.get(name).then(function (x) {
																return !!x;
												});
								})();
				}

				getTopup(username) {
								return _asyncToGenerator(function* () {
												return yield eos.read({
																table: 'topups',
																index: (0, _helpers.fingerprinted)(username),
																limit: 1,
																firstOnly: true
												});
								})();
				}
}
exports.default = IdentityService;

/***/ }),

/***/ "Xhqo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__("qPBE").Buffer;
var util = __webpack_require__(1);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),

/***/ "ZXSt":
/***/ (function(module, exports, __webpack_require__) {

var randomHex = function(size, callback) {
    var crypto = __webpack_require__("dRmA");
    var isCallback = (typeof callback === 'function');

    
    if (size > 65536) {
        if(isCallback) {
            callback(new Error('Requested too many random bytes.'));
        } else {
            throw new Error('Requested too many random bytes.');
        }
    };


    // is node
    if (typeof crypto !== 'undefined' && crypto.randomBytes) {

        if(isCallback) {
            crypto.randomBytes(size, function(err, result){
                if(!err) {
                    callback(null, '0x'+ result.toString('hex'));
                } else {
                    callback(error);
                }
            })
        } else {
            return '0x'+ crypto.randomBytes(size).toString('hex');
        }

    // is browser
    } else {
        var cryptoLib;

        if (typeof crypto !== 'undefined') {
            cryptoLib = crypto;
        } else if(typeof msCrypto !== 'undefined') {
            cryptoLib = msCrypto;
        }

        if (cryptoLib && cryptoLib.getRandomValues) {
            var randomBytes = cryptoLib.getRandomValues(new Uint8Array(size));
            var returnValue = '0x'+ Array.from(randomBytes).map(function(arr){ return arr.toString(16); }).join('');

            if(isCallback) {
                callback(null, returnValue);
            } else {
                return returnValue;
            }

        // not crypto object
        } else {
            var error = new Error('No "crypto" object available. This Browser doesn\'t support generating secure random bytes.');

            if(isCallback) {
                callback(error);
            } else {
               throw error;
            }
        }
    }
};


module.exports = randomHex;


/***/ }),

/***/ "agzX":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
 * Fast "async" scrypt implementation in JavaScript.
 * Copyright (c) 2013-2016 Dmitry Chestnykh | BSD License
 * https://github.com/dchest/scrypt-async-js
 */

/**
 * scrypt(password, salt, options, callback)
 *
 * where
 *
 * password and salt are strings or arrays of bytes (Array of Uint8Array)
 * options is
 *
 * {
 *    N:      // CPU/memory cost parameter, must be power of two
 *            // (alternatively, you can specify logN)
 *    r:      // block size
 *    p:      // parallelization parameter
 *    dkLen:  // length of derived key, default = 32
 *    encoding: // optional encoding:
 *                    "base64" - standard Base64 encoding
 *                    "hex" — hex encoding,
 *                    "binary" — Uint8Array,
 *                    undefined/null - Array of bytes
 *    interruptStep: // optional, steps to split calculations (default is 0)
 * }
 *
 * Derives a key from password and salt and calls callback
 * with derived key as the only argument.
 *
 * Calculations are interrupted with setImmediate (or zero setTimeout) at the
 * given interruptSteps to avoid freezing the browser. If it's undefined or zero,
 * the callback is called immediately after the calculation, avoiding setImmediate.
 *
 * Legacy way (only supports p = 1) to call this function is:
 *
 * scrypt(password, salt, logN, r, dkLen, [interruptStep], callback, [encoding])
 *
 * In legacy API, if interruptStep is not given, it defaults to 1000.
 * Pass 0 to have callback called immediately.
 *
 */
function scrypt(password, salt, logN, r, dkLen, interruptStep, callback, encoding) {
  'use strict';

  function SHA256(m) {
    /** @const */ var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
      0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
      0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
      0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
      0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
      0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
      0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
      0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
      0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
      0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a,
        h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19,
        w = new Array(64);

    function blocks(p) {
      var off = 0, len = p.length;
      while (len >= 64) {
        var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7,
            u, i, j, t1, t2;

        for (i = 0; i < 16; i++) {
          j = off + i*4;
          w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                 ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
        }

        for (i = 16; i < 64; i++) {
          u = w[i-2];
          t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

          u = w[i-15];
          t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

          w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
        }

        for (i = 0; i < 64; i++) {
          t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
               ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
               ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

          t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
               ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

          h = g;
          g = f;
          f = e;
          e = (d + t1) | 0;
          d = c;
          c = b;
          b = a;
          a = (t1 + t2) | 0;
        }

        h0 = (h0 + a) | 0;
        h1 = (h1 + b) | 0;
        h2 = (h2 + c) | 0;
        h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0;
        h5 = (h5 + f) | 0;
        h6 = (h6 + g) | 0;
        h7 = (h7 + h) | 0;

        off += 64;
        len -= 64;
      }
    }

    blocks(m);

    var i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

    p.push(0x80);
    for (i = bytesLeft + 1; i < numZeros; i++) p.push(0);
    p.push((bitLenHi>>>24) & 0xff);
    p.push((bitLenHi>>>16) & 0xff);
    p.push((bitLenHi>>>8)  & 0xff);
    p.push((bitLenHi>>>0)  & 0xff);
    p.push((bitLenLo>>>24) & 0xff);
    p.push((bitLenLo>>>16) & 0xff);
    p.push((bitLenLo>>>8)  & 0xff);
    p.push((bitLenLo>>>0)  & 0xff);

    blocks(p);

    return [
      (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
      (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
      (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
      (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
      (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
      (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
      (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
      (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
    ];
  }

  function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
    // compress password if it's longer than hash block length
    if(password.length > 64) {
      // SHA256 expects password to be an Array. If it's not
      // (i.e. it doesn't have .push method), convert it to one.
      password = SHA256(password.push ? password : Array.prototype.slice.call(password, 0));
    }

    var i, innerLen = 64 + salt.length + 4,
        inner = new Array(innerLen),
        outerKey = new Array(64),
        dk = [];

    // inner = (password ^ ipad) || salt || counter
    for (i = 0; i < 64; i++) inner[i] = 0x36;
    for (i = 0; i < password.length; i++) inner[i] ^= password[i];
    for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
    for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

    // outerKey = password ^ opad
    for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
    for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

    // increments counter inside inner
    function incrementCounter() {
      for (var i = innerLen-1; i >= innerLen-4; i--) {
        inner[i]++;
        if (inner[i] <= 0xff) return;
        inner[i] = 0;
      }
    }

    // output blocks = SHA256(outerKey || SHA256(inner)) ...
    while (dkLen >= 32) {
      incrementCounter();
      dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
      dkLen -= 32;
    }
    if (dkLen > 0) {
      incrementCounter();
      dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
    }
    return dk;
  }

  function salsaXOR(tmp, B, bin, bout) {
    var j0  = tmp[0]  ^ B[bin++],
        j1  = tmp[1]  ^ B[bin++],
        j2  = tmp[2]  ^ B[bin++],
        j3  = tmp[3]  ^ B[bin++],
        j4  = tmp[4]  ^ B[bin++],
        j5  = tmp[5]  ^ B[bin++],
        j6  = tmp[6]  ^ B[bin++],
        j7  = tmp[7]  ^ B[bin++],
        j8  = tmp[8]  ^ B[bin++],
        j9  = tmp[9]  ^ B[bin++],
        j10 = tmp[10] ^ B[bin++],
        j11 = tmp[11] ^ B[bin++],
        j12 = tmp[12] ^ B[bin++],
        j13 = tmp[13] ^ B[bin++],
        j14 = tmp[14] ^ B[bin++],
        j15 = tmp[15] ^ B[bin++],
        u, i;

    var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
        x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
        x15 = j15;

    for (i = 0; i < 8; i += 2) {
      u =  x0 + x12;   x4 ^= u<<7  | u>>>(32-7);
      u =  x4 +  x0;   x8 ^= u<<9  | u>>>(32-9);
      u =  x8 +  x4;  x12 ^= u<<13 | u>>>(32-13);
      u = x12 +  x8;   x0 ^= u<<18 | u>>>(32-18);

      u =  x5 +  x1;   x9 ^= u<<7  | u>>>(32-7);
      u =  x9 +  x5;  x13 ^= u<<9  | u>>>(32-9);
      u = x13 +  x9;   x1 ^= u<<13 | u>>>(32-13);
      u =  x1 + x13;   x5 ^= u<<18 | u>>>(32-18);

      u = x10 +  x6;  x14 ^= u<<7  | u>>>(32-7);
      u = x14 + x10;   x2 ^= u<<9  | u>>>(32-9);
      u =  x2 + x14;   x6 ^= u<<13 | u>>>(32-13);
      u =  x6 +  x2;  x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x11;   x3 ^= u<<7  | u>>>(32-7);
      u =  x3 + x15;   x7 ^= u<<9  | u>>>(32-9);
      u =  x7 +  x3;  x11 ^= u<<13 | u>>>(32-13);
      u = x11 +  x7;  x15 ^= u<<18 | u>>>(32-18);

      u =  x0 +  x3;   x1 ^= u<<7  | u>>>(32-7);
      u =  x1 +  x0;   x2 ^= u<<9  | u>>>(32-9);
      u =  x2 +  x1;   x3 ^= u<<13 | u>>>(32-13);
      u =  x3 +  x2;   x0 ^= u<<18 | u>>>(32-18);

      u =  x5 +  x4;   x6 ^= u<<7  | u>>>(32-7);
      u =  x6 +  x5;   x7 ^= u<<9  | u>>>(32-9);
      u =  x7 +  x6;   x4 ^= u<<13 | u>>>(32-13);
      u =  x4 +  x7;   x5 ^= u<<18 | u>>>(32-18);

      u = x10 +  x9;  x11 ^= u<<7  | u>>>(32-7);
      u = x11 + x10;   x8 ^= u<<9  | u>>>(32-9);
      u =  x8 + x11;   x9 ^= u<<13 | u>>>(32-13);
      u =  x9 +  x8;  x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x14;  x12 ^= u<<7  | u>>>(32-7);
      u = x12 + x15;  x13 ^= u<<9  | u>>>(32-9);
      u = x13 + x12;  x14 ^= u<<13 | u>>>(32-13);
      u = x14 + x13;  x15 ^= u<<18 | u>>>(32-18);
    }

    B[bout++] = tmp[0]  = (x0  + j0)  | 0;
    B[bout++] = tmp[1]  = (x1  + j1)  | 0;
    B[bout++] = tmp[2]  = (x2  + j2)  | 0;
    B[bout++] = tmp[3]  = (x3  + j3)  | 0;
    B[bout++] = tmp[4]  = (x4  + j4)  | 0;
    B[bout++] = tmp[5]  = (x5  + j5)  | 0;
    B[bout++] = tmp[6]  = (x6  + j6)  | 0;
    B[bout++] = tmp[7]  = (x7  + j7)  | 0;
    B[bout++] = tmp[8]  = (x8  + j8)  | 0;
    B[bout++] = tmp[9]  = (x9  + j9)  | 0;
    B[bout++] = tmp[10] = (x10 + j10) | 0;
    B[bout++] = tmp[11] = (x11 + j11) | 0;
    B[bout++] = tmp[12] = (x12 + j12) | 0;
    B[bout++] = tmp[13] = (x13 + j13) | 0;
    B[bout++] = tmp[14] = (x14 + j14) | 0;
    B[bout++] = tmp[15] = (x15 + j15) | 0;
  }

  function blockCopy(dst, di, src, si, len) {
    while (len--) dst[di++] = src[si++];
  }

  function blockXOR(dst, di, src, si, len) {
    while (len--) dst[di++] ^= src[si++];
  }

  function blockMix(tmp, B, bin, bout, r) {
    blockCopy(tmp, 0, B, bin + (2*r-1)*16, 16);
    for (var i = 0; i < 2*r; i += 2) {
      salsaXOR(tmp, B, bin + i*16,      bout + i*8);
      salsaXOR(tmp, B, bin + i*16 + 16, bout + i*8 + r*16);
    }
  }

  function integerify(B, bi, r) {
    return B[bi+(2*r-1)*16];
  }

  function stringToUTF8Bytes(s) {
    var arr = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 0x80) {
        arr.push(c);
      } else if (c < 0x800) {
        arr.push(0xc0 | c >> 6);
        arr.push(0x80 | c & 0x3f);
      } else if (c < 0xd800) {
        arr.push(0xe0 | c >> 12);
        arr.push(0x80 | (c >> 6) & 0x3f);
        arr.push(0x80 | c & 0x3f);
      } else {
        if (i >= s.length - 1) {
          throw new Error('invalid string');
        }
        i++; // get one more character
        c = (c & 0x3ff) << 10;
        c |= s.charCodeAt(i) & 0x3ff;
        c += 0x10000;

        arr.push(0xf0 | c >> 18);
        arr.push(0x80 | (c >> 12) & 0x3f);
        arr.push(0x80 | (c >> 6) & 0x3f);
        arr.push(0x80 | c & 0x3f);
      }
    }
    return arr;
  }

  function bytesToHex(p) {
    /** @const */
    var enc = '0123456789abcdef'.split('');

    var len = p.length,
        arr = [],
        i = 0;

    for (; i < len; i++) {
        arr.push(enc[(p[i]>>>4) & 15]);
        arr.push(enc[(p[i]>>>0) & 15]);
    }
    return arr.join('');
  }

  function bytesToBase64(p) {
    /** @const */
    var enc = ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
              '0123456789+/').split('');

    var len = p.length,
        arr = [],
        i = 0,
        a, b, c, t;

    while (i < len) {
      a = i < len ? p[i++] : 0;
      b = i < len ? p[i++] : 0;
      c = i < len ? p[i++] : 0;
      t = (a << 16) + (b << 8) + c;
      arr.push(enc[(t >>> 3 * 6) & 63]);
      arr.push(enc[(t >>> 2 * 6) & 63]);
      arr.push(enc[(t >>> 1 * 6) & 63]);
      arr.push(enc[(t >>> 0 * 6) & 63]);
    }
    if (len % 3 > 0) {
      arr[arr.length-1] = '=';
      if (len % 3 === 1) arr[arr.length-2] = '=';
    }
    return arr.join('');
  }


  // Generate key.

  var MAX_UINT = (-1)>>>0,
      p = 1;

  if (typeof logN === "object") {
    // Called as: scrypt(password, salt, opts, callback)
    if (arguments.length > 4) {
      throw new Error('scrypt: incorrect number of arguments');
    }

    var opts = logN;

    callback = r;
    logN = opts.logN;
    if (typeof logN === 'undefined') {
      if (typeof opts.N !== 'undefined') {
        if (opts.N < 2 || opts.N > MAX_UINT)
          throw new Error('scrypt: N is out of range');

        if ((opts.N & (opts.N - 1)) !== 0)
          throw new Error('scrypt: N is not a power of 2');

        logN = Math.log(opts.N) / Math.LN2;
      } else {
        throw new Error('scrypt: missing N parameter');
      }
    }

    // XXX: If opts.p or opts.dkLen is 0, it will be set to the default value
    // instead of throwing due to incorrect value. To avoid breaking
    // compatibility, this will only be changed in the next major version.
    p = opts.p || 1;
    r = opts.r;
    dkLen = opts.dkLen || 32;
    interruptStep = opts.interruptStep || 0;
    encoding = opts.encoding;
  }

  if (p < 1)
    throw new Error('scrypt: invalid p');

  if (r <= 0)
    throw new Error('scrypt: invalid r');

  if (logN < 1 || logN > 31)
    throw new Error('scrypt: logN must be between 1 and 31');


  var N = (1<<logN)>>>0,
      XY, V, B, tmp;

  if (r*p >= 1<<30 || r > MAX_UINT/128/p || r > MAX_UINT/256 || N > MAX_UINT/128/r)
    throw new Error('scrypt: parameters are too large');

  // Decode strings.
  if (typeof password === 'string')
    password = stringToUTF8Bytes(password);
  if (typeof salt === 'string')
    salt = stringToUTF8Bytes(salt);

  if (typeof Int32Array !== 'undefined') {
    //XXX We can use Uint32Array, but Int32Array is faster in Safari.
    XY = new Int32Array(64*r);
    V = new Int32Array(32*N*r);
    tmp = new Int32Array(16);
  } else {
    XY = [];
    V = [];
    tmp = new Array(16);
  }
  B = PBKDF2_HMAC_SHA256_OneIter(password, salt, p*128*r);

  var xi = 0, yi = 32 * r;

  function smixStart(pos) {
    for (var i = 0; i < 32*r; i++) {
      var j = pos + i*4;
      XY[xi+i] = ((B[j+3] & 0xff)<<24) | ((B[j+2] & 0xff)<<16) |
                 ((B[j+1] & 0xff)<<8)  | ((B[j+0] & 0xff)<<0);
    }
  }

  function smixStep1(start, end) {
    for (var i = start; i < end; i += 2) {
      blockCopy(V, i*(32*r), XY, xi, 32*r);
      blockMix(tmp, XY, xi, yi, r);

      blockCopy(V, (i+1)*(32*r), XY, yi, 32*r);
      blockMix(tmp, XY, yi, xi, r);
    }
  }

  function smixStep2(start, end) {
    for (var i = start; i < end; i += 2) {
      var j = integerify(XY, xi, r) & (N-1);
      blockXOR(XY, xi, V, j*(32*r), 32*r);
      blockMix(tmp, XY, xi, yi, r);

      j = integerify(XY, yi, r) & (N-1);
      blockXOR(XY, yi, V, j*(32*r), 32*r);
      blockMix(tmp, XY, yi, xi, r);
    }
  }

  function smixFinish(pos) {
    for (var i = 0; i < 32*r; i++) {
      var j = XY[xi+i];
      B[pos + i*4 + 0] = (j>>>0)  & 0xff;
      B[pos + i*4 + 1] = (j>>>8)  & 0xff;
      B[pos + i*4 + 2] = (j>>>16) & 0xff;
      B[pos + i*4 + 3] = (j>>>24) & 0xff;
    }
  }

  var nextTick = (typeof setImmediate !== 'undefined') ? setImmediate : setTimeout;

  function interruptedFor(start, end, step, fn, donefn) {
    (function performStep() {
      nextTick(function() {
        fn(start, start + step < end ? start + step : end);
        start += step;
        if (start < end)
          performStep();
        else
          donefn();
        });
    })();
  }

  function getResult(enc) {
      var result = PBKDF2_HMAC_SHA256_OneIter(password, B, dkLen);
      if (enc === 'base64')
        return bytesToBase64(result);
      else if (enc === 'hex')
        return bytesToHex(result);
      else if (enc === 'binary')
        return new Uint8Array(result);
      else
        return result;
  }

  // Blocking variant.
  function calculateSync() {
    for (var i = 0; i < p; i++) {
      smixStart(i*128*r);
      smixStep1(0, N);
      smixStep2(0, N);
      smixFinish(i*128*r);
    }
    callback(getResult(encoding));
  }

  // Async variant.
  function calculateAsync(i) {
      smixStart(i*128*r);
      interruptedFor(0, N, interruptStep*2, smixStep1, function() {
        interruptedFor(0, N, interruptStep*2, smixStep2, function () {
          smixFinish(i*128*r);
          if (i + 1 < p) {
            nextTick(function() { calculateAsync(i + 1); });
          } else {
            callback(getResult(encoding));
          }
        });
      });
  }

  if (typeof interruptStep === 'function') {
    // Called as: scrypt(...,      callback, [encoding])
    //  shifting: scrypt(..., interruptStep,  callback, [encoding])
    encoding = callback;
    callback = interruptStep;
    interruptStep = 1000;
  }

  if (interruptStep <= 0) {
    calculateSync();
  } else {
    calculateAsync(0);
  }
}

if (true) module.exports = scrypt;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("URgk").setImmediate))

/***/ }),

/***/ "dRmA":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("TCWg");

/***/ }),

/***/ "dcwN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

function oldBrowser () {
  throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}
var safeBuffer = __webpack_require__("hwdV")
var randombytes = __webpack_require__("Edxu")
var Buffer = safeBuffer.Buffer
var kBufferMaxLength = safeBuffer.kMaxLength
var crypto = global.crypto || global.msCrypto
var kMaxUint32 = Math.pow(2, 32) - 1
function assertOffset (offset, length) {
  if (typeof offset !== 'number' || offset !== offset) { // eslint-disable-line no-self-compare
    throw new TypeError('offset must be a number')
  }

  if (offset > kMaxUint32 || offset < 0) {
    throw new TypeError('offset must be a uint32')
  }

  if (offset > kBufferMaxLength || offset > length) {
    throw new RangeError('offset out of range')
  }
}

function assertSize (size, offset, length) {
  if (typeof size !== 'number' || size !== size) { // eslint-disable-line no-self-compare
    throw new TypeError('size must be a number')
  }

  if (size > kMaxUint32 || size < 0) {
    throw new TypeError('size must be a uint32')
  }

  if (size + offset > length || size > kBufferMaxLength) {
    throw new RangeError('buffer too small')
  }
}
if ((crypto && crypto.getRandomValues) || !process.browser) {
  exports.randomFill = randomFill
  exports.randomFillSync = randomFillSync
} else {
  exports.randomFill = oldBrowser
  exports.randomFillSync = oldBrowser
}
function randomFill (buf, offset, size, cb) {
  if (!Buffer.isBuffer(buf) && !(buf instanceof global.Uint8Array)) {
    throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
  }

  if (typeof offset === 'function') {
    cb = offset
    offset = 0
    size = buf.length
  } else if (typeof size === 'function') {
    cb = size
    size = buf.length - offset
  } else if (typeof cb !== 'function') {
    throw new TypeError('"cb" argument must be a function')
  }
  assertOffset(offset, buf.length)
  assertSize(size, offset, buf.length)
  return actualFill(buf, offset, size, cb)
}

function actualFill (buf, offset, size, cb) {
  if (process.browser) {
    var ourBuf = buf.buffer
    var uint = new Uint8Array(ourBuf, offset, size)
    crypto.getRandomValues(uint)
    if (cb) {
      process.nextTick(function () {
        cb(null, buf)
      })
      return
    }
    return buf
  }
  if (cb) {
    randombytes(size, function (err, bytes) {
      if (err) {
        return cb(err)
      }
      bytes.copy(buf, offset)
      cb(null, buf)
    })
    return
  }
  var bytes = randombytes(size)
  bytes.copy(buf, offset)
  return buf
}
function randomFillSync (buf, offset, size) {
  if (typeof offset === 'undefined') {
    offset = 0
  }
  if (!Buffer.isBuffer(buf) && !(buf instanceof global.Uint8Array)) {
    throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
  }

  assertOffset(offset, buf.length)

  if (size === undefined) size = buf.length - offset

  assertSize(size, offset, buf.length)

  return actualFill(buf, offset, size)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("8oxB")))

/***/ }),

/***/ "eA/Y":
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

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__("J78i");

/*<replacement>*/
var util = __webpack_require__("Onz0");
util.inherits = __webpack_require__("P7XM");
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "hwdV":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__("HDXh")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "isQN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var toString = Object.prototype.toString

// TypeError
exports.isArray = function (value, message) {
  if (!Array.isArray(value)) throw TypeError(message)
}

exports.isBoolean = function (value, message) {
  if (toString.call(value) !== '[object Boolean]') throw TypeError(message)
}

exports.isBuffer = function (value, message) {
  if (!Buffer.isBuffer(value)) throw TypeError(message)
}

exports.isFunction = function (value, message) {
  if (toString.call(value) !== '[object Function]') throw TypeError(message)
}

exports.isNumber = function (value, message) {
  if (toString.call(value) !== '[object Number]') throw TypeError(message)
}

exports.isObject = function (value, message) {
  if (toString.call(value) !== '[object Object]') throw TypeError(message)
}

// RangeError
exports.isBufferLength = function (buffer, length, message) {
  if (buffer.length !== length) throw RangeError(message)
}

exports.isBufferLength2 = function (buffer, length1, length2, message) {
  if (buffer.length !== length1 && buffer.length !== length2) throw RangeError(message)
}

exports.isLengthGTZero = function (value, message) {
  if (value.length === 0) throw RangeError(message)
}

exports.isNumberInInterval = function (number, x, y, message) {
  if (number <= x || number >= y) throw RangeError(message)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "j9m8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
class Reputable {
	constructor() {
		this.id = -1;
		this.type = '';
		this.entity = '';
		this.base = '';
		this.fingerprint = '';
		this.last_reputer = '';
		this.last_repute_time = +new Date();
		this.owner = '';
		this.network = '';
		this.block = 0;

		this.reputation = null;
		this.parent = null;
		this.children = [];
	}

	static placeholder() {
		return new Reputable();
	}
	static fromJson(json) {
		let p = Object.assign(Reputable.placeholder(), json);
		if (json.hasOwnProperty('reputation')) p.reputation = Reputation.fromJson(json.reputation);
		if (json.hasOwnProperty('parent') && json.parent) p.parent = Reputable.fromJson(json.parent);
		if (json.hasOwnProperty('children') && json.children.length) p.children = json.children.map(x => Reputable.fromJson(x));
		return p;
	}
	clone() {
		return Reputable.fromJson(JSON.parse(JSON.stringify(this)));
	}

	readableType(type = null) {
		switch (type ? type : this.type) {
			case 'acc':
				return 'Account / Address';
			case 'app':
				return 'Application';
			case 'id':
				return 'Identity';
			case 'act':
				return 'Contract Action';
			case 'etc':
				return 'Other';
		}
	}

	averageReputation(localized = false, fingerprintFilters = null, withScaling = true) {
		if (!this.reputation) return 0;

		const fragments = !fingerprintFilters ? this.reputation.fragments : this.reputation.fragments.filter(x => fingerprintFilters.includes(x.fingerprint));

		if (!fragments.length) return 0;

		if (!localized) {
			return parseFloat(fragments.reduce((acc, x) => {
				acc += parseFloat(withScaling ? x.timeScaledReputation : x.reputation);
				return acc;
			}, 0) / fragments.length).toFixed(4);
		}

		const up = fragments.reduce((acc, x) => {
			acc += parseFloat(x.up.split(' ')[0]);return acc;
		}, 0);
		const down = fragments.reduce((acc, x) => {
			acc += parseFloat(x.down.split(' ')[0]);return acc;
		}, 0);

		return parseFloat((up - down) / (up + down)).toFixed(4);
	}

	decimalReputation(localized = false, fingerprintFilters = null, max = 5, withScaling = true) {
		const average = this.averageReputation(localized, fingerprintFilters, withScaling);
		const decimal = average * (localized ? max : max * 2);
		return parseFloat(decimal > max ? max : decimal < -max ? -max : decimal).toFixed(1);
	}
}

exports.default = Reputable;
class Reputation {
	constructor() {
		this.fragments = [];
		this.total_reputes = 0;
	}

	static placeholder() {
		return new Reputation();
	}
	static fromJson(json) {
		return Object.assign(Reputation.placeholder(), json);
	}
	clone() {
		return Reputation.fromJson(JSON.parse(JSON.stringify(this)));
	}
}

exports.Reputation = Reputation;
class RepType {
	constructor() {
		this.fingerprint = '';
		this.type = '';
		this.base = 0;
		this.upTag = 'Good';
		this.downTag = 'Bad';
	}

	static placeholder() {
		return new RepType();
	}
	static fromJson(json) {
		return Object.assign(RepType.placeholder(), json);
	}
	clone() {
		return RepType.fromJson(JSON.parse(JSON.stringify(this)));
	}
	toFragment(weight) {
		return new Fragment(this.type, weight, this.fingerprint);
	}
}

exports.RepType = RepType;
class Fragment {
	constructor(type, weight, fingerprint = '') {
		this.type = type;
		this.up = weight > 0 ? `${parseFloat(weight).toFixed(4)} RIDL` : '0.0000 RIDL';
		this.down = weight < 0 ? `${parseFloat(Math.abs(weight)).toFixed(4)} RIDL` : '0.0000 RIDL';
		this.fingerprint = fingerprint;
	}

	static placeholder() {
		return new Fragment('none', 0);
	}
	static fromJson(json) {
		return Object.assign(Fragment.placeholder(), json);
	}
	clone() {
		return Fragment.fromJson(JSON.parse(JSON.stringify(this)));
	}

	validate() {
		return (parseFloat(this.up.split(' ')[0]) > 0 || parseFloat(this.down.split(' ')[0]) > 0) && this.type.toString().length && this.fingerprint.toString().length;
	}
}
exports.Fragment = Fragment;

/***/ }),

/***/ "jzvA":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, setImmediate) {const crypto = __webpack_require__("HEbw")
const MAX_VALUE = 0x7fffffff
const DEFAULT_PROMISE_INTERVAL = 5000
/* eslint-disable camelcase */

function checkAndInit (key, salt, N, r, p, dkLen, progressCallback) {
  if (N === 0 || (N & (N - 1)) !== 0) throw Error('N must be > 0 and a power of 2')

  if (N > MAX_VALUE / 128 / r) throw Error('Parameter N is too large')
  if (r > MAX_VALUE / 128 / p) throw Error('Parameter r is too large')

  let XY = Buffer.alloc(256 * r)
  let V = Buffer.alloc(128 * r * N)

  // pseudo global
  let B32 = new Int32Array(16) // salsa20_8
  let x = new Int32Array(16) // salsa20_8
  let _X = Buffer.alloc(64) // blockmix_salsa8

  // pseudo global
  let B = crypto.pbkdf2Sync(key, salt, 1, p * 128 * r, 'sha256')

  let tickCallback
  if (progressCallback) {
    let totalOps = p * N * 2
    let currentOp = 0

    tickCallback = function () {
      ++currentOp

      // send progress notifications once every 1,000 ops
      if (currentOp % 1000 === 0) {
        progressCallback({
          current: currentOp,
          total: totalOps,
          percent: (currentOp / totalOps) * 100.0
        })
      }
    }
  }
  return {
    XY,
    V,
    B32,
    x,
    _X,
    B,
    tickCallback
  }
}

async function smix (B, Bi, r, N, V, XY, _X, B32, x, tickCallback, promiseInterval) {
  promiseInterval = promiseInterval || DEFAULT_PROMISE_INTERVAL
  let Xi = 0
  let Yi = 128 * r
  let i

  B.copy(XY, Xi, Bi, Bi + Yi)

  for (i = 0; i < N; i++) {
    XY.copy(V, i * Yi, Xi, Xi + Yi)
    if (i % promiseInterval === 0) {
      await new Promise(resolve => setImmediate(resolve))
    }
    blockmix_salsa8(XY, Xi, Yi, r, _X, B32, x)

    if (tickCallback) tickCallback()
  }

  for (i = 0; i < N; i++) {
    let offset = Xi + (2 * r - 1) * 64
    let j = XY.readUInt32LE(offset) & (N - 1)
    blockxor(V, j * Yi, XY, Xi, Yi)
    if (i % promiseInterval === 0) {
      await new Promise(resolve => setImmediate(resolve))
    }
    blockmix_salsa8(XY, Xi, Yi, r, _X, B32, x)

    if (tickCallback) tickCallback()
  }

  XY.copy(B, Bi, Xi, Xi + Yi)
}

function smixSync (B, Bi, r, N, V, XY, _X, B32, x, tickCallback) {
  let Xi = 0
  let Yi = 128 * r
  let i

  B.copy(XY, Xi, Bi, Bi + Yi)

  for (i = 0; i < N; i++) {
    XY.copy(V, i * Yi, Xi, Xi + Yi)
    blockmix_salsa8(XY, Xi, Yi, r, _X, B32, x)

    if (tickCallback) tickCallback()
  }

  for (i = 0; i < N; i++) {
    let offset = Xi + (2 * r - 1) * 64
    let j = XY.readUInt32LE(offset) & (N - 1)
    blockxor(V, j * Yi, XY, Xi, Yi)
    blockmix_salsa8(XY, Xi, Yi, r, _X, B32, x)

    if (tickCallback) tickCallback()
  }

  XY.copy(B, Bi, Xi, Xi + Yi)
}

function blockmix_salsa8 (BY, Bi, Yi, r, _X, B32, x) {
  let i

  arraycopy(BY, Bi + (2 * r - 1) * 64, _X, 0, 64)

  for (i = 0; i < 2 * r; i++) {
    blockxor(BY, i * 64, _X, 0, 64)
    salsa20_8(_X, B32, x)
    arraycopy(_X, 0, BY, Yi + (i * 64), 64)
  }

  for (i = 0; i < r; i++) {
    arraycopy(BY, Yi + (i * 2) * 64, BY, Bi + (i * 64), 64)
  }

  for (i = 0; i < r; i++) {
    arraycopy(BY, Yi + (i * 2 + 1) * 64, BY, Bi + (i + r) * 64, 64)
  }
}

function R (a, b) {
  return (a << b) | (a >>> (32 - b))
}

function salsa20_8 (B, B32, x) {
  let i

  for (i = 0; i < 16; i++) {
    B32[i] = (B[i * 4 + 0] & 0xff) << 0
    B32[i] |= (B[i * 4 + 1] & 0xff) << 8
    B32[i] |= (B[i * 4 + 2] & 0xff) << 16
    B32[i] |= (B[i * 4 + 3] & 0xff) << 24
    // B32[i] = B.readUInt32LE(i*4)   <--- this is signficantly slower even in Node.js
  }

  arraycopy(B32, 0, x, 0, 16)

  for (i = 8; i > 0; i -= 2) {
    x[4] ^= R(x[0] + x[12], 7)
    x[8] ^= R(x[4] + x[0], 9)
    x[12] ^= R(x[8] + x[4], 13)
    x[0] ^= R(x[12] + x[8], 18)
    x[9] ^= R(x[5] + x[1], 7)
    x[13] ^= R(x[9] + x[5], 9)
    x[1] ^= R(x[13] + x[9], 13)
    x[5] ^= R(x[1] + x[13], 18)
    x[14] ^= R(x[10] + x[6], 7)
    x[2] ^= R(x[14] + x[10], 9)
    x[6] ^= R(x[2] + x[14], 13)
    x[10] ^= R(x[6] + x[2], 18)
    x[3] ^= R(x[15] + x[11], 7)
    x[7] ^= R(x[3] + x[15], 9)
    x[11] ^= R(x[7] + x[3], 13)
    x[15] ^= R(x[11] + x[7], 18)
    x[1] ^= R(x[0] + x[3], 7)
    x[2] ^= R(x[1] + x[0], 9)
    x[3] ^= R(x[2] + x[1], 13)
    x[0] ^= R(x[3] + x[2], 18)
    x[6] ^= R(x[5] + x[4], 7)
    x[7] ^= R(x[6] + x[5], 9)
    x[4] ^= R(x[7] + x[6], 13)
    x[5] ^= R(x[4] + x[7], 18)
    x[11] ^= R(x[10] + x[9], 7)
    x[8] ^= R(x[11] + x[10], 9)
    x[9] ^= R(x[8] + x[11], 13)
    x[10] ^= R(x[9] + x[8], 18)
    x[12] ^= R(x[15] + x[14], 7)
    x[13] ^= R(x[12] + x[15], 9)
    x[14] ^= R(x[13] + x[12], 13)
    x[15] ^= R(x[14] + x[13], 18)
  }

  for (i = 0; i < 16; ++i) B32[i] = x[i] + B32[i]

  for (i = 0; i < 16; i++) {
    let bi = i * 4
    B[bi + 0] = (B32[i] >> 0 & 0xff)
    B[bi + 1] = (B32[i] >> 8 & 0xff)
    B[bi + 2] = (B32[i] >> 16 & 0xff)
    B[bi + 3] = (B32[i] >> 24 & 0xff)
    // B.writeInt32LE(B32[i], i*4)  //<--- this is signficantly slower even in Node.js
  }
}

// naive approach... going back to loop unrolling may yield additional performance
function blockxor (S, Si, D, Di, len) {
  for (let i = 0; i < len; i++) {
    D[Di + i] ^= S[Si + i]
  }
}

function arraycopy (src, srcPos, dest, destPos, length) {
  if (Buffer.isBuffer(src) && Buffer.isBuffer(dest)) {
    src.copy(dest, destPos, srcPos, srcPos + length)
  } else {
    while (length--) {
      dest[destPos++] = src[srcPos++]
    }
  }
}

module.exports = {
  checkAndInit,
  smix,
  smixSync
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer, __webpack_require__("URgk").setImmediate))

/***/ }),

/***/ "o8pB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
var BN = __webpack_require__("OZ/i");
/**
 * RLP Encoding based on: https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP
 * This function takes in a data, convert it to buffer if not, and a length for recursion
 * @param input - will be converted to buffer
 * @returns returns buffer of encoded data
 **/
function encode(input) {
    if (Array.isArray(input)) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output.push(encode(input[i]));
        }
        var buf = Buffer.concat(output);
        return Buffer.concat([encodeLength(buf.length, 192), buf]);
    }
    else {
        var inputBuf = toBuffer(input);
        return inputBuf.length === 1 && inputBuf[0] < 128
            ? inputBuf
            : Buffer.concat([encodeLength(inputBuf.length, 128), inputBuf]);
    }
}
exports.encode = encode;
/**
 * Parse integers. Check if there is no leading zeros
 * @param v The value to parse
 * @param base The base to parse the integer into
 */
function safeParseInt(v, base) {
    if (v.slice(0, 2) === '00') {
        throw new Error('invalid RLP: extra zeros');
    }
    return parseInt(v, base);
}
function encodeLength(len, offset) {
    if (len < 56) {
        return Buffer.from([len + offset]);
    }
    else {
        var hexLength = intToHex(len);
        var lLength = hexLength.length / 2;
        var firstByte = intToHex(offset + 55 + lLength);
        return Buffer.from(firstByte + hexLength, 'hex');
    }
}
function decode(input, stream) {
    if (stream === void 0) { stream = false; }
    if (!input || input.length === 0) {
        return Buffer.from([]);
    }
    var inputBuffer = toBuffer(input);
    var decoded = _decode(inputBuffer);
    if (stream) {
        return decoded;
    }
    if (decoded.remainder.length !== 0) {
        throw new Error('invalid remainder');
    }
    return decoded.data;
}
exports.decode = decode;
/**
 * Get the length of the RLP input
 * @param input
 * @returns The length of the input or an empty Buffer if no input
 */
function getLength(input) {
    if (!input || input.length === 0) {
        return Buffer.from([]);
    }
    var inputBuffer = toBuffer(input);
    var firstByte = inputBuffer[0];
    if (firstByte <= 0x7f) {
        return inputBuffer.length;
    }
    else if (firstByte <= 0xb7) {
        return firstByte - 0x7f;
    }
    else if (firstByte <= 0xbf) {
        return firstByte - 0xb6;
    }
    else if (firstByte <= 0xf7) {
        // a list between  0-55 bytes long
        return firstByte - 0xbf;
    }
    else {
        // a list  over 55 bytes long
        var llength = firstByte - 0xf6;
        var length = safeParseInt(inputBuffer.slice(1, llength).toString('hex'), 16);
        return llength + length;
    }
}
exports.getLength = getLength;
/** Decode an input with RLP */
function _decode(input) {
    var length, llength, data, innerRemainder, d;
    var decoded = [];
    var firstByte = input[0];
    if (firstByte <= 0x7f) {
        // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding.
        return {
            data: input.slice(0, 1),
            remainder: input.slice(1),
        };
    }
    else if (firstByte <= 0xb7) {
        // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string
        // The range of the first byte is [0x80, 0xb7]
        length = firstByte - 0x7f;
        // set 0x80 null to 0
        if (firstByte === 0x80) {
            data = Buffer.from([]);
        }
        else {
            data = input.slice(1, length);
        }
        if (length === 2 && data[0] < 0x80) {
            throw new Error('invalid rlp encoding: byte must be less 0x80');
        }
        return {
            data: data,
            remainder: input.slice(length),
        };
    }
    else if (firstByte <= 0xbf) {
        llength = firstByte - 0xb6;
        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);
        data = input.slice(llength, length + llength);
        if (data.length < length) {
            throw new Error('invalid RLP');
        }
        return {
            data: data,
            remainder: input.slice(length + llength),
        };
    }
    else if (firstByte <= 0xf7) {
        // a list between  0-55 bytes long
        length = firstByte - 0xbf;
        innerRemainder = input.slice(1, length);
        while (innerRemainder.length) {
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(length),
        };
    }
    else {
        // a list  over 55 bytes long
        llength = firstByte - 0xf6;
        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);
        var totalLength = llength + length;
        if (totalLength > input.length) {
            throw new Error('invalid rlp: total length is larger than the data');
        }
        innerRemainder = input.slice(llength, totalLength);
        if (innerRemainder.length === 0) {
            throw new Error('invalid rlp, List has a invalid length');
        }
        while (innerRemainder.length) {
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(totalLength),
        };
    }
}
/** Check if a string is prefixed by 0x */
function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x';
}
/** Removes 0x from a given String */
function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str.slice(2) : str;
}
/** Transform an integer into its hexadecimal value */
function intToHex(integer) {
    if (integer < 0) {
        throw new Error('Invalid integer as argument, must be unsigned!');
    }
    var hex = integer.toString(16);
    return hex.length % 2 ? "0" + hex : hex;
}
/** Pad a string to be even */
function padToEven(a) {
    return a.length % 2 ? "0" + a : a;
}
/** Transform an integer into a Buffer */
function intToBuffer(integer) {
    var hex = intToHex(integer);
    return Buffer.from(hex, 'hex');
}
/** Transform anything into a Buffer */
function toBuffer(v) {
    if (!Buffer.isBuffer(v)) {
        if (typeof v === 'string') {
            if (isHexPrefixed(v)) {
                return Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
            }
            else {
                return Buffer.from(v);
            }
        }
        else if (typeof v === 'number') {
            if (!v) {
                return Buffer.from([]);
            }
            else {
                return intToBuffer(v);
            }
        }
        else if (v === null || v === undefined) {
            return Buffer.from([]);
        }
        else if (v instanceof Uint8Array) {
            return Buffer.from(v);
        }
        else if (BN.isBN(v)) {
            // converts a BN to a Buffer
            return Buffer.from(v.toArray());
        }
        else {
            throw new Error('invalid type');
        }
    }
    return v;
}
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "ocSM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
class Bond {
	constructor() {
		this.id = 0;
		this.identity = 0;
		this.title = '';
		this.details = '';
		this.start_time = 0;
		this.expires = 0;
		this.limit = null;
		this.votes = null;
		this.fixed_party = null;
	}

	static placeholder() {
		return new Bond();
	}
	static fromJson(json) {
		return Object.assign(Bond.placeholder(), json);
	}

}
exports.default = Bond;

/***/ }),

/***/ "odnP":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {;(function(global) {

'use strict';

var nextTick = function (fn) { setTimeout(fn, 0); }
if (typeof process != 'undefined' && process && typeof process.nextTick == 'function') {
	// node.js and the like
	nextTick = process.nextTick;
}

function semaphore(capacity) {
	var semaphore = {
		capacity: capacity || 1,
		current: 0,
		queue: [],
		firstHere: false,

		take: function() {
			if (semaphore.firstHere === false) {
        			semaphore.current++;
        			semaphore.firstHere = true;
        			var isFirst = 1;
      			} else {
        			var isFirst = 0;
      			}
			var item = { n: 1 };

			if (typeof arguments[0] == 'function') {
				item.task = arguments[0];
			} else {
				item.n = arguments[0];
			}

			if (arguments.length >= 2)  {
				if (typeof arguments[1] == 'function') item.task = arguments[1];
				else item.n = arguments[1];
			}

			var task = item.task;
			item.task = function() { task(semaphore.leave); };

			if (semaphore.current + item.n - isFirst > semaphore.capacity) {
        			if (isFirst === 1) {
        				semaphore.current--;
        				semaphore.firstHere = false;
        			}
				return semaphore.queue.push(item);
			}

			semaphore.current += item.n - isFirst;
			item.task(semaphore.leave);
      			if (isFirst === 1) semaphore.firstHere = false;
		},

		leave: function(n) {
			n = n || 1;

			semaphore.current -= n;

			if (!semaphore.queue.length) {
				if (semaphore.current < 0) {
					throw new Error('leave called too many times.');
				}

				return;
			}

			var item = semaphore.queue[0];

			if (item.n + semaphore.current > semaphore.capacity) {
				return;
			}

			semaphore.queue.shift();
			semaphore.current += item.n;

			nextTick(item.task);
		},

		available: function(n) {
			n = n || 1;
			return(semaphore.current + n <= semaphore.capacity);
		}
	};

	return semaphore;
};

if (true) {
    // node export
    module.exports = semaphore;
} else {}
}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "qOpi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fingerprinted = undefined;

var _murmurhash = __webpack_require__("ohnt");

var _murmurhash2 = _interopRequireDefault(_murmurhash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fingerprinted = exports.fingerprinted = data => _murmurhash2.default.v2(data.toLowerCase());

/***/ }),

/***/ "qPBE":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__("HDXh")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "rXFu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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



/*<replacement>*/

var pna = __webpack_require__("lm0R");
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__("2Nt0");
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__("+qE3").EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__("QpuX");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__("qPBE").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__("Onz0");
util.inherits = __webpack_require__("P7XM");
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(0);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__("Xhqo");
var destroyImpl = __webpack_require__("RoFp");
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__("sZro");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__("qiJe").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__("sZro");

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__("qiJe").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("8oxB")))

/***/ }),

/***/ "sZro":
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

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__("lm0R");
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__("Onz0");
util.inherits = __webpack_require__("P7XM");
/*</replacement>*/

var Readable = __webpack_require__("rXFu");
var Writable = __webpack_require__("3BRs");

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),

/***/ "tcrS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__("HDXh").Buffer
var inherits = __webpack_require__("P7XM")
var HashBase = __webpack_require__("k+aG")

var ARRAY16 = new Array(16)

var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
]

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
]

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
]

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
]

var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]
var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]

function RIPEMD160 () {
  HashBase.call(this, 64)

  // state
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0
}

inherits(RIPEMD160, HashBase)

RIPEMD160.prototype._update = function () {
  var words = ARRAY16
  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4)

  var al = this._a | 0
  var bl = this._b | 0
  var cl = this._c | 0
  var dl = this._d | 0
  var el = this._e | 0

  var ar = this._a | 0
  var br = this._b | 0
  var cr = this._c | 0
  var dr = this._d | 0
  var er = this._e | 0

  // computation
  for (var i = 0; i < 80; i += 1) {
    var tl
    var tr
    if (i < 16) {
      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i])
      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i])
    } else if (i < 32) {
      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i])
      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i])
    } else if (i < 48) {
      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i])
      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i])
    } else if (i < 64) {
      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i])
      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i])
    } else { // if (i<80) {
      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i])
      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i])
    }

    al = el
    el = dl
    dl = rotl(cl, 10)
    cl = bl
    bl = tl

    ar = er
    er = dr
    dr = rotl(cr, 10)
    cr = br
    br = tr
  }

  // update state
  var t = (this._b + cl + dr) | 0
  this._b = (this._c + dl + er) | 0
  this._c = (this._d + el + ar) | 0
  this._d = (this._e + al + br) | 0
  this._e = (this._a + bl + cr) | 0
  this._a = t
}

RIPEMD160.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64)
    this._update()
    this._blockOffset = 0
  }

  this._block.fill(0, this._blockOffset, 56)
  this._block.writeUInt32LE(this._length[0], 56)
  this._block.writeUInt32LE(this._length[1], 60)
  this._update()

  // produce result
  var buffer = Buffer.alloc ? Buffer.alloc(20) : new Buffer(20)
  buffer.writeInt32LE(this._a, 0)
  buffer.writeInt32LE(this._b, 4)
  buffer.writeInt32LE(this._c, 8)
  buffer.writeInt32LE(this._d, 12)
  buffer.writeInt32LE(this._e, 16)
  return buffer
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

module.exports = RIPEMD160


/***/ }),

/***/ "wq4j":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("43KI").PassThrough


/***/ }),

/***/ "xIa+":
/***/ (function(module, exports, __webpack_require__) {

const crypto = __webpack_require__("HEbw")
const {
  checkAndInit,
  smix
} = __webpack_require__("jzvA")

// N = Cpu cost, r = Memory cost, p = parallelization cost
async function scrypt (key, salt, N, r, p, dkLen, progressCallback, promiseInterval) {
  const {
    XY,
    V,
    B32,
    x,
    _X,
    B,
    tickCallback
  } = checkAndInit(key, salt, N, r, p, dkLen, progressCallback)

  for (var i = 0; i < p; i++) {
    await smix(B, i * 128 * r, r, N, V, XY, _X, B32, x, tickCallback, promiseInterval)
  }

  return crypto.pbkdf2Sync(key, B, 1, dkLen, 'sha256')
}

module.exports = scrypt


/***/ }),

/***/ "y2lW":
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__("MCLT")
const EventEmitter = __webpack_require__("+qE3")

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
}

module.exports = SafeEventEmitter


function SafeEventEmitter() {
  EventEmitter.call(this)
}

util.inherits(SafeEventEmitter, EventEmitter)

SafeEventEmitter.prototype.emit = function (type) {
  // copied from https://github.com/Gozala/events/blob/master/events.js
  // modified lines are commented with "edited:"
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
    // edited: using safeApply
    safeApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      // edited: using safeApply
      safeApply(listeners[i], this, args);
  }

  return true;
}

function safeApply(handler, context, args) {
  try {
    ReflectApply(handler, context, args)
  } catch (err) {
    // throw error after timeout so as not to interupt the stack
    setTimeout(() => {
      throw err
    })
  }
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2NyeXB0c3kvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV93cml0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3JlYWRhYmxlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpZGwvZGlzdC9zZXJ2aWNlcy9yZXB1dGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zY3J5cHRzeS9saWIvc2NyeXB0U3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWRsL2Rpc3QvbW9kZWxzL0lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb21ieXRlcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWNwMjU2azEvbGliL2Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VjcDI1NmsxL2xpYi9lbGxpcHRpYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlkbC9kaXN0L3NlcnZpY2VzL2Vvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VjcDI1NmsxL2VsbGlwdGljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vd3JpdGFibGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlkbC9kaXN0L3NlcnZpY2VzL2JvbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlY3AyNTZrMS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpZGwvZGlzdC9tb2RlbHMvTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbS1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFuZG9taGV4L3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWRsL2Rpc3QvcmlkbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlkbC9kaXN0L3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvQnVmZmVyTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFuZG9taGV4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2NyeXB0LWFzeW5jL3NjcnlwdC1hc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFuZG9taGV4L3NyYy9jcnlwdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JhbmRvbWZpbGwvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3Bhc3N0aHJvdWdoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zYWZlLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VjcDI1NmsxL2xpYi9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpZGwvZGlzdC9tb2RlbHMvUmVwdXRhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zY3J5cHRzeS9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JscC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWRsL2Rpc3QvbW9kZWxzL0JvbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbWFwaG9yZS9saWIvc2VtYXBob3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWRsL2Rpc3QvdXRpbC9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbm9kZV9tb2R1bGVzL3NhZmUtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpcGVtZDE2MC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3Bhc3N0aHJvdWdoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zY3J5cHRzeS9saWIvc2NyeXB0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zYWZlLWV2ZW50LWVtaXR0ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxtQkFBTyxDQUFDLE1BQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7Ozs7Ozs7O0FDRkEsaUJBQWlCLG1CQUFPLENBQUMsTUFBWTs7Ozs7Ozs7QUNBckMsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVhOztBQUViOztBQUVBLFVBQVUsbUJBQU8sQ0FBQyxNQUFzQjtBQUN4Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLE1BQWM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVTtBQUNsQzs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLE1BQWdCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLG1CQUFPLENBQUMsTUFBMkI7QUFDaEQ7O0FBRUE7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLE1BQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLG1CQUFPLENBQUMsTUFBNEI7O0FBRXREOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsTUFBa0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlEQUFpRCwwRkFBMEY7O0FBRTNJO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsTUFBa0I7O0FBRS9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7O0FBRWpDOztBQUVBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9EQUFvRDtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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Q0FBQyxNQUFnQjs7Ozs7Ozs7O0FDRDFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLE1BQWtCOztBQUV2QztBQUNBLFdBQVcsbUJBQU8sQ0FBQyxNQUFjO0FBQ2pDLGdCQUFnQixtQkFBTyxDQUFDLE1BQVU7QUFDbEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7O0FDck5BLGlCQUFpQixtQkFBTyxDQUFDLE1BQTJCOzs7Ozs7Ozs7QUNBdkM7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsV0FBVyxtQkFBTyxDQUFDLE1BQU87O0FBRTFCOztBQUVBLFlBQVksbUJBQU8sQ0FBQyxNQUFnQjs7QUFFcEM7O0FBRUEsZUFBZSxtQkFBTyxDQUFDLE1BQWlCOztBQUV4QyxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsdUNBQXVDLDZCQUE2QixZQUFZLEVBQUUsT0FBTyxpQkFBaUIsbUJBQW1CLHVCQUF1Qiw0RUFBNEUsRUFBRSxFQUFFLHNCQUFzQixlQUFlLEVBQUU7O0FBRTNRLGdDQUFnQyxxQkFBcUIscUNBQXFDLGdEQUFnRCwwQkFBMEIsTUFBTSwwQkFBMEIsd0JBQXdCLEVBQUUsZ0JBQWdCLGVBQWUsUUFBUSxFQUFFLGlCQUFpQixnQkFBZ0IsRUFBRSxPQUFPLHNEQUFzRCxxQkFBcUIsRUFBRSxrQkFBa0Isb0JBQW9CLEVBQUUsRUFBRSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxHQUFHOztBQUV4Yzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsOEI7Ozs7Ozs7O0FDckdZO0FBQ1osYUFBYSxtQkFBTyxDQUFDLE1BQVU7QUFDL0IsVUFBVSxtQkFBTyxDQUFDLE1BQU87QUFDekIsZUFBZSxtQkFBTyxDQUFDLE1BQWlCOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7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TyxDQUFDLE1BQWM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVTtBQUNsQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7QUM5Q0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDL0RBLDhDQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzNDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0dBQWtHO0FBQ2xHLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxtQkFBTyxDQUFDLE1BQWlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0Q0FBNEM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFOztBQUU1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLG1EQUFtRCxpRUFBaUU7QUFDcEg7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDekJBLGFBQWEsbUJBQU8sQ0FBQyxNQUFNO0FBQzNCLHFCQUFxQixtQkFBTyxDQUFDLE1BQVM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcn42NzhmODRhZi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzY3J5cHQgPSByZXF1aXJlKCcuL3NjcnlwdFN5bmMnKVxuc2NyeXB0LmFzeW5jID0gcmVxdWlyZSgnLi9zY3J5cHQnKVxubW9kdWxlLmV4cG9ydHMgPSBzY3J5cHRcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFkYWJsZScpLlRyYW5zZm9ybVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gQSBiaXQgc2ltcGxlciB0aGFuIHJlYWRhYmxlIHN0cmVhbXMuXG4vLyBJbXBsZW1lbnQgYW4gYXN5bmMgLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKSwgYW5kIGl0J2xsIGhhbmRsZSBhbGxcbi8vIHRoZSBkcmFpbiBldmVudCBlbWlzc2lvbiBhbmQgYnVmZmVyaW5nLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwbmEgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gV3JpdGFibGU7XG5cbi8qIDxyZXBsYWNlbWVudD4gKi9cbmZ1bmN0aW9uIFdyaXRlUmVxKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhpcy5jaHVuayA9IGNodW5rO1xuICB0aGlzLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbn1cblxuLy8gSXQgc2VlbXMgYSBsaW5rZWQgbGlzdCBidXQgaXQgaXMgbm90XG4vLyB0aGVyZSB3aWxsIGJlIG9ubHkgMiBvZiB0aGVzZSBmb3IgZWFjaCBzdHJlYW1cbmZ1bmN0aW9uIENvcmtlZFJlcXVlc3Qoc3RhdGUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLm5leHQgPSBudWxsO1xuICB0aGlzLmVudHJ5ID0gbnVsbDtcbiAgdGhpcy5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgb25Db3JrZWRGaW5pc2goX3RoaXMsIHN0YXRlKTtcbiAgfTtcbn1cbi8qIDwvcmVwbGFjZW1lbnQ+ICovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgYXN5bmNXcml0ZSA9ICFwcm9jZXNzLmJyb3dzZXIgJiYgWyd2MC4xMCcsICd2MC45LiddLmluZGV4T2YocHJvY2Vzcy52ZXJzaW9uLnNsaWNlKDAsIDUpKSA+IC0xID8gc2V0SW1tZWRpYXRlIDogcG5hLm5leHRUaWNrO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaW50ZXJuYWxVdGlsID0ge1xuICBkZXByZWNhdGU6IHJlcXVpcmUoJ3V0aWwtZGVwcmVjYXRlJylcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIE91clVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSB8fCBmdW5jdGlvbiAoKSB7fTtcbmZ1bmN0aW9uIF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGNodW5rKTtcbn1cbmZ1bmN0aW9uIF9pc1VpbnQ4QXJyYXkob2JqKSB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBPdXJVaW50OEFycmF5O1xufVxuXG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIGRlc3Ryb3lJbXBsID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3knKTtcblxudXRpbC5pbmhlcml0cyhXcml0YWJsZSwgU3RyZWFtKTtcblxuZnVuY3Rpb24gbm9wKCkge31cblxuZnVuY3Rpb24gV3JpdGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBEdXBsZXggc3RyZWFtcyBhcmUgYm90aCByZWFkYWJsZSBhbmQgd3JpdGFibGUsIGJ1dCBzaGFyZVxuICAvLyB0aGUgc2FtZSBvcHRpb25zIG9iamVjdC5cbiAgLy8gSG93ZXZlciwgc29tZSBjYXNlcyByZXF1aXJlIHNldHRpbmcgb3B0aW9ucyB0byBkaWZmZXJlbnRcbiAgLy8gdmFsdWVzIGZvciB0aGUgcmVhZGFibGUgYW5kIHRoZSB3cml0YWJsZSBzaWRlcyBvZiB0aGUgZHVwbGV4IHN0cmVhbS5cbiAgLy8gVGhlc2Ugb3B0aW9ucyBjYW4gYmUgcHJvdmlkZWQgc2VwYXJhdGVseSBhcyByZWFkYWJsZVhYWCBhbmQgd3JpdGFibGVYWFguXG4gIHZhciBpc0R1cGxleCA9IHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleDtcblxuICAvLyBvYmplY3Qgc3RyZWFtIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhpcyBzdHJlYW1cbiAgLy8gY29udGFpbnMgYnVmZmVycyBvciBvYmplY3RzLlxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcblxuICBpZiAoaXNEdXBsZXgpIHRoaXMub2JqZWN0TW9kZSA9IHRoaXMub2JqZWN0TW9kZSB8fCAhIW9wdGlvbnMud3JpdGFibGVPYmplY3RNb2RlO1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCB3cml0ZSgpIHN0YXJ0cyByZXR1cm5pbmcgZmFsc2VcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyB0aGF0IHdlIGFsd2F5cyByZXR1cm4gZmFsc2UgaWZcbiAgLy8gdGhlIGVudGlyZSBidWZmZXIgaXMgbm90IGZsdXNoZWQgaW1tZWRpYXRlbHkgb24gd3JpdGUoKVxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgd3JpdGFibGVId20gPSBvcHRpb25zLndyaXRhYmxlSGlnaFdhdGVyTWFyaztcbiAgdmFyIGRlZmF1bHRId20gPSB0aGlzLm9iamVjdE1vZGUgPyAxNiA6IDE2ICogMTAyNDtcblxuICBpZiAoaHdtIHx8IGh3bSA9PT0gMCkgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO2Vsc2UgaWYgKGlzRHVwbGV4ICYmICh3cml0YWJsZUh3bSB8fCB3cml0YWJsZUh3bSA9PT0gMCkpIHRoaXMuaGlnaFdhdGVyTWFyayA9IHdyaXRhYmxlSHdtO2Vsc2UgdGhpcy5oaWdoV2F0ZXJNYXJrID0gZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IE1hdGguZmxvb3IodGhpcy5oaWdoV2F0ZXJNYXJrKTtcblxuICAvLyBpZiBfZmluYWwgaGFzIGJlZW4gY2FsbGVkXG4gIHRoaXMuZmluYWxDYWxsZWQgPSBmYWxzZTtcblxuICAvLyBkcmFpbiBldmVudCBmbGFnLlxuICB0aGlzLm5lZWREcmFpbiA9IGZhbHNlO1xuICAvLyBhdCB0aGUgc3RhcnQgb2YgY2FsbGluZyBlbmQoKVxuICB0aGlzLmVuZGluZyA9IGZhbHNlO1xuICAvLyB3aGVuIGVuZCgpIGhhcyBiZWVuIGNhbGxlZCwgYW5kIHJldHVybmVkXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBoYXMgaXQgYmVlbiBkZXN0cm95ZWRcbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG4gIHZhciBub0RlY29kZSA9IG9wdGlvbnMuZGVjb2RlU3RyaW5ncyA9PT0gZmFsc2U7XG4gIHRoaXMuZGVjb2RlU3RyaW5ncyA9ICFub0RlY29kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cbiAgdGhpcy53cml0aW5nID0gZmFsc2U7XG5cbiAgLy8gd2hlbiB0cnVlIGFsbCB3cml0ZXMgd2lsbCBiZSBidWZmZXJlZCB1bnRpbCAudW5jb3JrKCkgY2FsbFxuICB0aGlzLmNvcmtlZCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cbiAgdGhpcy5idWZmZXJQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuICB0aGlzLm9ud3JpdGUgPSBmdW5jdGlvbiAoZXIpIHtcbiAgICBvbndyaXRlKHN0cmVhbSwgZXIpO1xuICB9O1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0IHRoZSB1c2VyIHN1cHBsaWVzIHRvIHdyaXRlKGNodW5rLGVuY29kaW5nLGNiKVxuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuXG4gIC8vIHRoZSBhbW91bnQgdGhhdCBpcyBiZWluZyB3cml0dGVuIHdoZW4gX3dyaXRlIGlzIGNhbGxlZC5cbiAgdGhpcy53cml0ZWxlbiA9IDA7XG5cbiAgdGhpcy5idWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB0aGlzLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuXG4gIC8vIG51bWJlciBvZiBwZW5kaW5nIHVzZXItc3VwcGxpZWQgd3JpdGUgY2FsbGJhY2tzXG4gIC8vIHRoaXMgbXVzdCBiZSAwIGJlZm9yZSAnZmluaXNoJyBjYW4gYmUgZW1pdHRlZFxuICB0aGlzLnBlbmRpbmdjYiA9IDA7XG5cbiAgLy8gZW1pdCBwcmVmaW5pc2ggaWYgdGhlIG9ubHkgdGhpbmcgd2UncmUgd2FpdGluZyBmb3IgaXMgX3dyaXRlIGNic1xuICAvLyBUaGlzIGlzIHJlbGV2YW50IGZvciBzeW5jaHJvbm91cyBUcmFuc2Zvcm0gc3RyZWFtc1xuICB0aGlzLnByZWZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gVHJ1ZSBpZiB0aGUgZXJyb3Igd2FzIGFscmVhZHkgZW1pdHRlZCBhbmQgc2hvdWxkIG5vdCBiZSB0aHJvd24gYWdhaW5cbiAgdGhpcy5lcnJvckVtaXR0ZWQgPSBmYWxzZTtcblxuICAvLyBjb3VudCBidWZmZXJlZCByZXF1ZXN0c1xuICB0aGlzLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcblxuICAvLyBhbGxvY2F0ZSB0aGUgZmlyc3QgQ29ya2VkUmVxdWVzdCwgdGhlcmUgaXMgYWx3YXlzXG4gIC8vIG9uZSBhbGxvY2F0ZWQgYW5kIGZyZWUgdG8gdXNlLCBhbmQgd2UgbWFpbnRhaW4gYXQgbW9zdCB0d29cbiAgdGhpcy5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdCh0aGlzKTtcbn1cblxuV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24gZ2V0QnVmZmVyKCkge1xuICB2YXIgY3VycmVudCA9IHRoaXMuYnVmZmVyZWRSZXF1ZXN0O1xuICB2YXIgb3V0ID0gW107XG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgb3V0LnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUsICdidWZmZXInLCB7XG4gICAgICBnZXQ6IGludGVybmFsVXRpbC5kZXByZWNhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXIoKTtcbiAgICAgIH0sICdfd3JpdGFibGVTdGF0ZS5idWZmZXIgaXMgZGVwcmVjYXRlZC4gVXNlIF93cml0YWJsZVN0YXRlLmdldEJ1ZmZlciAnICsgJ2luc3RlYWQuJywgJ0RFUDAwMDMnKVxuICAgIH0pO1xuICB9IGNhdGNoIChfKSB7fVxufSkoKTtcblxuLy8gVGVzdCBfd3JpdGFibGVTdGF0ZSBmb3IgaW5oZXJpdGFuY2UgdG8gYWNjb3VudCBmb3IgRHVwbGV4IHN0cmVhbXMsXG4vLyB3aG9zZSBwcm90b3R5cGUgY2hhaW4gb25seSBwb2ludHMgdG8gUmVhZGFibGUuXG52YXIgcmVhbEhhc0luc3RhbmNlO1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmhhc0luc3RhbmNlICYmIHR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICByZWFsSGFzSW5zdGFuY2UgPSBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgaWYgKHJlYWxIYXNJbnN0YW5jZS5jYWxsKHRoaXMsIG9iamVjdCkpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHRoaXMgIT09IFdyaXRhYmxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBvYmplY3QgJiYgb2JqZWN0Ll93cml0YWJsZVN0YXRlIGluc3RhbmNlb2YgV3JpdGFibGVTdGF0ZTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgcmVhbEhhc0luc3RhbmNlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiB0aGlzO1xuICB9O1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZShvcHRpb25zKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgLy8gV3JpdGFibGUgY3RvciBpcyBhcHBsaWVkIHRvIER1cGxleGVzLCB0b28uXG4gIC8vIGByZWFsSGFzSW5zdGFuY2VgIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHVzaW5nIHBsYWluIGBpbnN0YW5jZW9mYFxuICAvLyB3b3VsZCByZXR1cm4gZmFsc2UsIGFzIG5vIGBfd3JpdGFibGVTdGF0ZWAgcHJvcGVydHkgaXMgYXR0YWNoZWQuXG5cbiAgLy8gVHJ5aW5nIHRvIHVzZSB0aGUgY3VzdG9tIGBpbnN0YW5jZW9mYCBmb3IgV3JpdGFibGUgaGVyZSB3aWxsIGFsc28gYnJlYWsgdGhlXG4gIC8vIE5vZGUuanMgTGF6eVRyYW5zZm9ybSBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaGFzIGEgbm9uLXRyaXZpYWwgZ2V0dGVyIGZvclxuICAvLyBgX3dyaXRhYmxlU3RhdGVgIHRoYXQgd291bGQgbGVhZCB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gIGlmICghcmVhbEhhc0luc3RhbmNlLmNhbGwoV3JpdGFibGUsIHRoaXMpICYmICEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpIHtcbiAgICByZXR1cm4gbmV3IFdyaXRhYmxlKG9wdGlvbnMpO1xuICB9XG5cbiAgdGhpcy5fd3JpdGFibGVTdGF0ZSA9IG5ldyBXcml0YWJsZVN0YXRlKG9wdGlvbnMsIHRoaXMpO1xuXG4gIC8vIGxlZ2FjeS5cbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGUgPT09ICdmdW5jdGlvbicpIHRoaXMuX3dyaXRlID0gb3B0aW9ucy53cml0ZTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy53cml0ZXYgPT09ICdmdW5jdGlvbicpIHRoaXMuX3dyaXRldiA9IG9wdGlvbnMud3JpdGV2O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHRoaXMuX2Rlc3Ryb3kgPSBvcHRpb25zLmRlc3Ryb3k7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmluYWwgPT09ICdmdW5jdGlvbicpIHRoaXMuX2ZpbmFsID0gb3B0aW9ucy5maW5hbDtcbiAgfVxuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufVxuXG4vLyBPdGhlcndpc2UgcGVvcGxlIGNhbiBwaXBlIFdyaXRhYmxlIHN0cmVhbXMsIHdoaWNoIGlzIGp1c3Qgd3JvbmcuXG5Xcml0YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignQ2Fubm90IHBpcGUsIG5vdCByZWFkYWJsZScpKTtcbn07XG5cbmZ1bmN0aW9uIHdyaXRlQWZ0ZXJFbmQoc3RyZWFtLCBjYikge1xuICB2YXIgZXIgPSBuZXcgRXJyb3IoJ3dyaXRlIGFmdGVyIGVuZCcpO1xuICAvLyBUT0RPOiBkZWZlciBlcnJvciBldmVudHMgY29uc2lzdGVudGx5IGV2ZXJ5d2hlcmUsIG5vdCBqdXN0IHRoZSBjYlxuICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIHBuYS5uZXh0VGljayhjYiwgZXIpO1xufVxuXG4vLyBDaGVja3MgdGhhdCBhIHVzZXItc3VwcGxpZWQgY2h1bmsgaXMgdmFsaWQsIGVzcGVjaWFsbHkgZm9yIHRoZSBwYXJ0aWN1bGFyXG4vLyBtb2RlIHRoZSBzdHJlYW0gaXMgaW4uIEN1cnJlbnRseSB0aGlzIG1lYW5zIHRoYXQgYG51bGxgIGlzIG5ldmVyIGFjY2VwdGVkXG4vLyBhbmQgdW5kZWZpbmVkL25vbi1zdHJpbmcgdmFsdWVzIGFyZSBvbmx5IGFsbG93ZWQgaW4gb2JqZWN0IG1vZGUuXG5mdW5jdGlvbiB2YWxpZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBjYikge1xuICB2YXIgdmFsaWQgPSB0cnVlO1xuICB2YXIgZXIgPSBmYWxzZTtcblxuICBpZiAoY2h1bmsgPT09IG51bGwpIHtcbiAgICBlciA9IG5ldyBUeXBlRXJyb3IoJ01heSBub3Qgd3JpdGUgbnVsbCB2YWx1ZXMgdG8gc3RyZWFtJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNodW5rICE9PSAnc3RyaW5nJyAmJiBjaHVuayAhPT0gdW5kZWZpbmVkICYmICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG5vbi1zdHJpbmcvYnVmZmVyIGNodW5rJyk7XG4gIH1cbiAgaWYgKGVyKSB7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIHBuYS5uZXh0VGljayhjYiwgZXIpO1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuICB2YXIgcmV0ID0gZmFsc2U7XG4gIHZhciBpc0J1ZiA9ICFzdGF0ZS5vYmplY3RNb2RlICYmIF9pc1VpbnQ4QXJyYXkoY2h1bmspO1xuXG4gIGlmIChpc0J1ZiAmJiAhQnVmZmVyLmlzQnVmZmVyKGNodW5rKSkge1xuICAgIGNodW5rID0gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuayk7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICBpZiAoaXNCdWYpIGVuY29kaW5nID0gJ2J1ZmZlcic7ZWxzZSBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9IHN0YXRlLmRlZmF1bHRFbmNvZGluZztcblxuICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSBjYiA9IG5vcDtcblxuICBpZiAoc3RhdGUuZW5kZWQpIHdyaXRlQWZ0ZXJFbmQodGhpcywgY2IpO2Vsc2UgaWYgKGlzQnVmIHx8IHZhbGlkQ2h1bmsodGhpcywgc3RhdGUsIGNodW5rLCBjYikpIHtcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICByZXQgPSB3cml0ZU9yQnVmZmVyKHRoaXMsIHN0YXRlLCBpc0J1ZiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLmNvcmsgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG5cbiAgc3RhdGUuY29ya2VkKys7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUudW5jb3JrID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQtLTtcblxuICAgIGlmICghc3RhdGUud3JpdGluZyAmJiAhc3RhdGUuY29ya2VkICYmICFzdGF0ZS5maW5pc2hlZCAmJiAhc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyAmJiBzdGF0ZS5idWZmZXJlZFJlcXVlc3QpIGNsZWFyQnVmZmVyKHRoaXMsIHN0YXRlKTtcbiAgfVxufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnNldERlZmF1bHRFbmNvZGluZyA9IGZ1bmN0aW9uIHNldERlZmF1bHRFbmNvZGluZyhlbmNvZGluZykge1xuICAvLyBub2RlOjpQYXJzZUVuY29kaW5nKCkgcmVxdWlyZXMgbG93ZXIgY2FzZS5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycpIGVuY29kaW5nID0gZW5jb2RpbmcudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCEoWydoZXgnLCAndXRmOCcsICd1dGYtOCcsICdhc2NpaScsICdiaW5hcnknLCAnYmFzZTY0JywgJ3VjczInLCAndWNzLTInLCAndXRmMTZsZScsICd1dGYtMTZsZScsICdyYXcnXS5pbmRleE9mKChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpKSA+IC0xKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZWZhdWx0RW5jb2RpbmcgPSBlbmNvZGluZztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKSB7XG4gIGlmICghc3RhdGUub2JqZWN0TW9kZSAmJiBzdGF0ZS5kZWNvZGVTdHJpbmdzICE9PSBmYWxzZSAmJiB0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnKSB7XG4gICAgY2h1bmsgPSBCdWZmZXIuZnJvbShjaHVuaywgZW5jb2RpbmcpO1xuICB9XG4gIHJldHVybiBjaHVuaztcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ3dyaXRhYmxlSGlnaFdhdGVyTWFyaycsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgfVxufSk7XG5cbi8vIGlmIHdlJ3JlIGFscmVhZHkgd3JpdGluZyBzb21ldGhpbmcsIHRoZW4ganVzdCBwdXQgdGhpc1xuLy8gaW4gdGhlIHF1ZXVlLCBhbmQgd2FpdCBvdXIgdHVybi4gIE90aGVyd2lzZSwgY2FsbCBfd3JpdGVcbi8vIElmIHdlIHJldHVybiBmYWxzZSwgdGhlbiB3ZSBuZWVkIGEgZHJhaW4gZXZlbnQsIHNvIHNldCB0aGF0IGZsYWcuXG5mdW5jdGlvbiB3cml0ZU9yQnVmZmVyKHN0cmVhbSwgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGlmICghaXNCdWYpIHtcbiAgICB2YXIgbmV3Q2h1bmsgPSBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKTtcbiAgICBpZiAoY2h1bmsgIT09IG5ld0NodW5rKSB7XG4gICAgICBpc0J1ZiA9IHRydWU7XG4gICAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICAgICAgY2h1bmsgPSBuZXdDaHVuaztcbiAgICB9XG4gIH1cbiAgdmFyIGxlbiA9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuXG4gIHN0YXRlLmxlbmd0aCArPSBsZW47XG5cbiAgdmFyIHJldCA9IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIC8vIHdlIG11c3QgZW5zdXJlIHRoYXQgcHJldmlvdXMgbmVlZERyYWluIHdpbGwgbm90IGJlIHJlc2V0IHRvIGZhbHNlLlxuICBpZiAoIXJldCkgc3RhdGUubmVlZERyYWluID0gdHJ1ZTtcblxuICBpZiAoc3RhdGUud3JpdGluZyB8fCBzdGF0ZS5jb3JrZWQpIHtcbiAgICB2YXIgbGFzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IHtcbiAgICAgIGNodW5rOiBjaHVuayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcbiAgICAgIGlzQnVmOiBpc0J1ZixcbiAgICAgIGNhbGxiYWNrOiBjYixcbiAgICAgIG5leHQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChsYXN0KSB7XG4gICAgICBsYXN0Lm5leHQgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH1cbiAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudCArPSAxO1xuICB9IGVsc2Uge1xuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIHdyaXRldiwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHN0YXRlLndyaXRlbGVuID0gbGVuO1xuICBzdGF0ZS53cml0ZWNiID0gY2I7XG4gIHN0YXRlLndyaXRpbmcgPSB0cnVlO1xuICBzdGF0ZS5zeW5jID0gdHJ1ZTtcbiAgaWYgKHdyaXRldikgc3RyZWFtLl93cml0ZXYoY2h1bmssIHN0YXRlLm9ud3JpdGUpO2Vsc2Ugc3RyZWFtLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIHN0YXRlLm9ud3JpdGUpO1xuICBzdGF0ZS5zeW5jID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpIHtcbiAgLS1zdGF0ZS5wZW5kaW5nY2I7XG5cbiAgaWYgKHN5bmMpIHtcbiAgICAvLyBkZWZlciB0aGUgY2FsbGJhY2sgaWYgd2UgYXJlIGJlaW5nIGNhbGxlZCBzeW5jaHJvbm91c2x5XG4gICAgLy8gdG8gYXZvaWQgcGlsaW5nIHVwIHRoaW5ncyBvbiB0aGUgc3RhY2tcbiAgICBwbmEubmV4dFRpY2soY2IsIGVyKTtcbiAgICAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYW5kIGl0IHdpbGwgYWx3YXlzIGhhcHBlblxuICAgIC8vIGFmdGVyIGVycm9yXG4gICAgcG5hLm5leHRUaWNrKGZpbmlzaE1heWJlLCBzdHJlYW0sIHN0YXRlKTtcbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhlIGNhbGxlciBleHBlY3QgdGhpcyB0byBoYXBwZW4gYmVmb3JlIGlmXG4gICAgLy8gaXQgaXMgYXN5bmNcbiAgICBjYihlcik7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIC8vIHRoaXMgY2FuIGVtaXQgZmluaXNoLCBidXQgZmluaXNoIG11c3RcbiAgICAvLyBhbHdheXMgZm9sbG93IGVycm9yXG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpO2Vsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdGF0ZSk7XG5cbiAgICBpZiAoIWZpbmlzaGVkICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSB7XG4gICAgICBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc3luYykge1xuICAgICAgLyo8cmVwbGFjZW1lbnQ+Ki9cbiAgICAgIGFzeW5jV3JpdGUoYWZ0ZXJXcml0ZSwgc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICAgIC8qPC9yZXBsYWNlbWVudD4qL1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKSB7XG4gIGlmICghZmluaXNoZWQpIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKTtcbiAgc3RhdGUucGVuZGluZ2NiLS07XG4gIGNiKCk7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG4vLyBNdXN0IGZvcmNlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBvbiBuZXh0VGljaywgc28gdGhhdCB3ZSBkb24ndFxuLy8gZW1pdCAnZHJhaW4nIGJlZm9yZSB0aGUgd3JpdGUoKSBjb25zdW1lciBnZXRzIHRoZSAnZmFsc2UnIHJldHVyblxuLy8gdmFsdWUsIGFuZCBoYXMgYSBjaGFuY2UgdG8gYXR0YWNoIGEgJ2RyYWluJyBsaXN0ZW5lci5cbmZ1bmN0aW9uIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUubmVlZERyYWluKSB7XG4gICAgc3RhdGUubmVlZERyYWluID0gZmFsc2U7XG4gICAgc3RyZWFtLmVtaXQoJ2RyYWluJyk7XG4gIH1cbn1cblxuLy8gaWYgdGhlcmUncyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB3YWl0aW5nLCB0aGVuIHByb2Nlc3MgaXRcbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG4gIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdDtcblxuICBpZiAoc3RyZWFtLl93cml0ZXYgJiYgZW50cnkgJiYgZW50cnkubmV4dCkge1xuICAgIC8vIEZhc3QgY2FzZSwgd3JpdGUgZXZlcnl0aGluZyB1c2luZyBfd3JpdGV2KClcbiAgICB2YXIgbCA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50O1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkobCk7XG4gICAgdmFyIGhvbGRlciA9IHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZTtcbiAgICBob2xkZXIuZW50cnkgPSBlbnRyeTtcblxuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIGFsbEJ1ZmZlcnMgPSB0cnVlO1xuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgYnVmZmVyW2NvdW50XSA9IGVudHJ5O1xuICAgICAgaWYgKCFlbnRyeS5pc0J1ZikgYWxsQnVmZmVycyA9IGZhbHNlO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gICAgYnVmZmVyLmFsbEJ1ZmZlcnMgPSBhbGxCdWZmZXJzO1xuXG4gICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB0cnVlLCBzdGF0ZS5sZW5ndGgsIGJ1ZmZlciwgJycsIGhvbGRlci5maW5pc2gpO1xuXG4gICAgLy8gZG9Xcml0ZSBpcyBhbG1vc3QgYWx3YXlzIGFzeW5jLCBkZWZlciB0aGVzZSB0byBzYXZlIGEgYml0IG9mIHRpbWVcbiAgICAvLyBhcyB0aGUgaG90IHBhdGggZW5kcyB3aXRoIGRvV3JpdGVcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgICBpZiAoaG9sZGVyLm5leHQpIHtcbiAgICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGhvbGRlci5uZXh0O1xuICAgICAgaG9sZGVyLm5leHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdChzdGF0ZSk7XG4gICAgfVxuICAgIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTbG93IGNhc2UsIHdyaXRlIGNodW5rcyBvbmUtYnktb25lXG4gICAgd2hpbGUgKGVudHJ5KSB7XG4gICAgICB2YXIgY2h1bmsgPSBlbnRyeS5jaHVuaztcbiAgICAgIHZhciBlbmNvZGluZyA9IGVudHJ5LmVuY29kaW5nO1xuICAgICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG5cbiAgICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudC0tO1xuICAgICAgLy8gaWYgd2UgZGlkbid0IGNhbGwgdGhlIG9ud3JpdGUgaW1tZWRpYXRlbHksIHRoZW5cbiAgICAgIC8vIGl0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byB3YWl0IHVudGlsIGl0IGRvZXMuXG4gICAgICAvLyBhbHNvLCB0aGF0IG1lYW5zIHRoYXQgdGhlIGNodW5rIGFuZCBjYiBhcmUgY3VycmVudGx5XG4gICAgICAvLyBiZWluZyBwcm9jZXNzZWQsIHNvIG1vdmUgdGhlIGJ1ZmZlciBjb3VudGVyIHBhc3QgdGhlbS5cbiAgICAgIGlmIChzdGF0ZS53cml0aW5nKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbnRyeSA9PT0gbnVsbCkgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG4gIH1cblxuICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBlbnRyeTtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgY2IobmV3IEVycm9yKCdfd3JpdGUoKSBpcyBub3QgaW1wbGVtZW50ZWQnKSk7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRldiA9IG51bGw7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmICh0eXBlb2YgY2h1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGNodW5rO1xuICAgIGNodW5rID0gbnVsbDtcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICBpZiAoY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCkgdGhpcy53cml0ZShjaHVuaywgZW5jb2RpbmcpO1xuXG4gIC8vIC5lbmQoKSBmdWxseSB1bmNvcmtzXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQgPSAxO1xuICAgIHRoaXMudW5jb3JrKCk7XG4gIH1cblxuICAvLyBpZ25vcmUgdW5uZWNlc3NhcnkgZW5kKCkgY2FsbHMuXG4gIGlmICghc3RhdGUuZW5kaW5nICYmICFzdGF0ZS5maW5pc2hlZCkgZW5kV3JpdGFibGUodGhpcywgc3RhdGUsIGNiKTtcbn07XG5cbmZ1bmN0aW9uIG5lZWRGaW5pc2goc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLmVuZGluZyAmJiBzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID09PSBudWxsICYmICFzdGF0ZS5maW5pc2hlZCAmJiAhc3RhdGUud3JpdGluZztcbn1cbmZ1bmN0aW9uIGNhbGxGaW5hbChzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5fZmluYWwoZnVuY3Rpb24gKGVycikge1xuICAgIHN0YXRlLnBlbmRpbmdjYi0tO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgfVxuICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcHJlZmluaXNoKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5wcmVmaW5pc2hlZCAmJiAhc3RhdGUuZmluYWxDYWxsZWQpIHtcbiAgICBpZiAodHlwZW9mIHN0cmVhbS5fZmluYWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgICAgc3RhdGUuZmluYWxDYWxsZWQgPSB0cnVlO1xuICAgICAgcG5hLm5leHRUaWNrKGNhbGxGaW5hbCwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5lbWl0KCdwcmVmaW5pc2gnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbmVlZCA9IG5lZWRGaW5pc2goc3RhdGUpO1xuICBpZiAobmVlZCkge1xuICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3RhdGUucGVuZGluZ2NiID09PSAwKSB7XG4gICAgICBzdGF0ZS5maW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWVkO1xufVxuXG5mdW5jdGlvbiBlbmRXcml0YWJsZShzdHJlYW0sIHN0YXRlLCBjYikge1xuICBzdGF0ZS5lbmRpbmcgPSB0cnVlO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbiAgaWYgKGNiKSB7XG4gICAgaWYgKHN0YXRlLmZpbmlzaGVkKSBwbmEubmV4dFRpY2soY2IpO2Vsc2Ugc3RyZWFtLm9uY2UoJ2ZpbmlzaCcsIGNiKTtcbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gIHN0cmVhbS53cml0YWJsZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbkNvcmtlZEZpbmlzaChjb3JrUmVxLCBzdGF0ZSwgZXJyKSB7XG4gIHZhciBlbnRyeSA9IGNvcmtSZXEuZW50cnk7XG4gIGNvcmtSZXEuZW50cnkgPSBudWxsO1xuICB3aGlsZSAoZW50cnkpIHtcbiAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICBjYihlcnIpO1xuICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgfVxuICBpZiAoc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlKSB7XG4gICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlLm5leHQgPSBjb3JrUmVxO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGNvcmtSZXE7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICghdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblxuV3JpdGFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBkZXN0cm95SW1wbC5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl91bmRlc3Ryb3kgPSBkZXN0cm95SW1wbC51bmRlc3Ryb3k7XG5Xcml0YWJsZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB0aGlzLmVuZCgpO1xuICBjYihlcnIpO1xufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3JlYWRhYmxlLmpzJyk7XG5leHBvcnRzLlN0cmVhbSA9IGV4cG9ydHM7XG5leHBvcnRzLlJlYWRhYmxlID0gZXhwb3J0cztcbmV4cG9ydHMuV3JpdGFibGUgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG5leHBvcnRzLkR1cGxleCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG5leHBvcnRzLlRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzJyk7XG5leHBvcnRzLlBhc3NUaHJvdWdoID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcycpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZW9zID0gcmVxdWlyZShcIi4vZW9zXCIpO1xuXG52YXIgZW9zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2Vvcyk7XG5cbnZhciBfUmVwdXRhYmxlID0gcmVxdWlyZShcIi4uL21vZGVscy9SZXB1dGFibGVcIik7XG5cbnZhciBfUmVwdXRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1JlcHV0YWJsZSk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoXCIuLi91dGlsL2hlbHBlcnNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9XG5cbmxldCByZXBUb3RhbENhY2hlID0ge307XG5cbmNvbnN0IGdldFJlcHV0YXRpb25zID0gKCgpID0+IHtcblx0dmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKHJlcHV0YWJsZXMpIHtcblx0XHR5aWVsZCBQcm9taXNlLmFsbChyZXB1dGFibGVzLm1hcCgoKCkgPT4ge1xuXHRcdFx0dmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qIChyZXB1dGFibGUpIHtcblx0XHRcdFx0cmVwdXRhYmxlLnJlcHV0YXRpb24gPSB5aWVsZCBnZXRSZXB1dGF0aW9uKHJlcHV0YWJsZSk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoX3gyKSB7XG5cdFx0XHRcdHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcblx0XHR9KSgpKSk7XG5cdFx0cmVwVG90YWxDYWNoZSA9IHt9O1xuXHRcdHJldHVybiB0cnVlO1xuXHR9KTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gZ2V0UmVwdXRhdGlvbnMoX3gpIHtcblx0XHRyZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9O1xufSkoKTtcblxuY29uc3QgZ2V0UmVwdXRhdGlvbiA9ICgoKSA9PiB7XG5cdHZhciBfcmVmMyA9IF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAocmVwdXRhYmxlKSB7XG5cdFx0Y29uc3QgcmVwdXRhdGlvbiA9IHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdHRhYmxlOiAncmVwdXRhdGlvbnMnLFxuXHRcdFx0c2NvcGU6IHJlcHV0YWJsZS5pZCxcblx0XHRcdGxpbWl0OiAxLFxuXHRcdFx0Zmlyc3RPbmx5OiB0cnVlXG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSk7XG5cblx0XHRpZiAoIXJlcHV0YXRpb24pIHJldHVybiBfUmVwdXRhYmxlLlJlcHV0YXRpb24ucGxhY2Vob2xkZXIoKTtcblxuXHRcdGNvbnN0IGZyYWdUb3RhbHMgPSB5aWVsZCBQcm9taXNlLmFsbChyZXB1dGF0aW9uLmZyYWdtZW50cy5tYXAoKCgpID0+IHtcblx0XHRcdHZhciBfcmVmNCA9IF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoeCkge1xuXG5cdFx0XHRcdGlmIChyZXBUb3RhbENhY2hlLmhhc093blByb3BlcnR5KHguZmluZ2VycHJpbnQpKSByZXR1cm4gcmVwVG90YWxDYWNoZVt4LmZpbmdlcnByaW50XTtcblxuXHRcdFx0XHRjb25zdCByZXAgPSBlb3MucmVhZCh7XG5cdFx0XHRcdFx0dGFibGU6ICdmcmFndG90YWwnLFxuXHRcdFx0XHRcdHNjb3BlOiB4LmZpbmdlcnByaW50LFxuXHRcdFx0XHRcdGxpbWl0OiAxLFxuXHRcdFx0XHRcdGZpcnN0T25seTogdHJ1ZVxuXHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChyZXApIHJlcFRvdGFsQ2FjaGVbeC5maW5nZXJwcmludF0gPSByZXA7XG5cdFx0XHRcdHJldHVybiByZXA7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChfeDQpIHtcblx0XHRcdFx0cmV0dXJuIF9yZWY0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9O1xuXHRcdH0pKCkpKTtcblxuXHRcdGNvbnN0IHBhcnNlQXNzZXQgPSBmdW5jdGlvbiAoYXNzZXQpIHtcblx0XHRcdHJldHVybiBwYXJzZUZsb2F0KGFzc2V0LnNwbGl0KCcgJylbMF0pO1xuXHRcdH07XG5cblx0XHRyZXB1dGF0aW9uLmZyYWdtZW50cy5tYXAoZnVuY3Rpb24gKGZyYWcpIHtcblx0XHRcdGNvbnN0IGZyYWdUb3RhbCA9IGZyYWdUb3RhbHMuZmluZChmdW5jdGlvbiAoeCkge1xuXHRcdFx0XHRyZXR1cm4geC50eXBlID09PSBmcmFnLnR5cGU7XG5cdFx0XHR9KTtcblx0XHRcdGZyYWcucmVwdXRhdGlvbiA9IDA7XG5cblx0XHRcdGNvbnN0IHVwID0gcGFyc2VBc3NldChmcmFnLnVwKTtcblx0XHRcdGNvbnN0IGRvd24gPSBwYXJzZUFzc2V0KGZyYWcuZG93bik7XG5cdFx0XHRjb25zdCB0dXAgPSBwYXJzZUFzc2V0KGZyYWdUb3RhbC51cCk7XG5cdFx0XHRjb25zdCB0ZG93biA9IHBhcnNlQXNzZXQoZnJhZ1RvdGFsLmRvd24pO1xuXG5cdFx0XHQvLyBUT0RPOiBNaWdodCBiZSBhbiBpc3N1ZSBoZXJlLlxuXHRcdFx0ZnJhZy5yZXB1dGF0aW9uID0gKHVwID4gMCA/IHVwIC8gdHVwIDogMCkgLSAoZG93biA+IDAgPyBkb3duIC8gdGRvd24gOiAwKTtcblxuXHRcdFx0Y29uc3QgdGltZU1vZCA9IChNYXRoLmZsb29yKCtuZXcgRGF0ZSgpIC8gMTAwMCkgLSByZXB1dGFibGUubGFzdF9yZXB1dGVfdGltZSkgLyAxMDAwMDAwMDA7XG5cdFx0XHRpZiAoZnJhZy5yZXB1dGF0aW9uID4gMCAmJiBmcmFnLnJlcHV0YXRpb24gLSB0aW1lTW9kID4gZnJhZy5yZXB1dGF0aW9uIC8gMikgZnJhZy50aW1lU2NhbGVkUmVwdXRhdGlvbiA9IGZyYWcucmVwdXRhdGlvbiAtIHRpbWVNb2Q7ZWxzZSBpZiAoZnJhZy5yZXB1dGF0aW9uIDwgMCAmJiBmcmFnLnJlcHV0YXRpb24gKyB0aW1lTW9kIDwgZnJhZy5yZXB1dGF0aW9uIC8gMikgZnJhZy50aW1lU2NhbGVkUmVwdXRhdGlvbiA9IGZyYWcucmVwdXRhdGlvbiArIHRpbWVNb2Q7ZWxzZSBmcmFnLnRpbWVTY2FsZWRSZXB1dGF0aW9uID0gZnJhZy5yZXB1dGF0aW9uO1xuXG5cdFx0XHRmcmFnLnJlcHV0YXRpb24gPSBwYXJzZUZsb2F0KGZyYWcucmVwdXRhdGlvbikudG9GaXhlZCg0KTtcblx0XHRcdGZyYWcudGltZVNjYWxlZFJlcHV0YXRpb24gPSBwYXJzZUZsb2F0KGZyYWcudGltZVNjYWxlZFJlcHV0YXRpb24pLnRvRml4ZWQoNCk7XG5cdFx0XHRmcmFnLmZpbmdlcnByaW50ID0gZnJhZ1RvdGFsLmZpbmdlcnByaW50O1xuXHRcdH0pO1xuXG5cdFx0ZGVsZXRlIHJlcHV0YXRpb24uaWQ7XG5cdFx0cmV0dXJuIF9SZXB1dGFibGUuUmVwdXRhdGlvbi5mcm9tSnNvbihyZXB1dGF0aW9uKTtcblx0fSk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGdldFJlcHV0YXRpb24oX3gzKSB7XG5cdFx0cmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG59KSgpO1xuXG5jb25zdCBnZXRQYXJlbnRzID0gKCgpID0+IHtcblx0dmFyIF9yZWY1ID0gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qIChyZXB1dGFibGUsIGxhc3QgPSBudWxsKSB7XG5cdFx0aWYgKHJlcHV0YWJsZS5iYXNlID09PSAwIHx8IGxhc3QgJiYgbGFzdC5iYXNlID09PSAwKSB7XG5cdFx0XHRsZXQgcGFyZW50cyA9IFtdO1xuXHRcdFx0Y29uc3QgZ2V0UGFyZW50cyA9IGZ1bmN0aW9uIChyID0gbnVsbCkge1xuXHRcdFx0XHRpZiAoIXIpIHIgPSByZXB1dGFibGU7XG5cdFx0XHRcdGlmICghci5wYXJlbnQpIHJldHVybjtcblx0XHRcdFx0cGFyZW50cy51bnNoaWZ0KHIucGFyZW50KTtcblx0XHRcdFx0cmV0dXJuIGdldFBhcmVudHMoci5wYXJlbnQpO1xuXHRcdFx0fTtcblx0XHRcdGdldFBhcmVudHMoKTtcblx0XHRcdHlpZWxkIGdldFJlcHV0YXRpb25zKHBhcmVudHMpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGFyZW50ID0geWllbGQgZW9zLnJlYWQoe1xuXHRcdFx0dGFibGU6ICdyZXB1dGFibGVzJyxcblx0XHRcdGluZGV4OiBsYXN0ID8gbGFzdC5iYXNlIDogcmVwdXRhYmxlLmJhc2UsXG5cdFx0XHRsaW1pdDogMSxcblx0XHRcdGZpcnN0T25seTogdHJ1ZSxcblx0XHRcdG1vZGVsOiBfUmVwdXRhYmxlMi5kZWZhdWx0XG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSk7XG5cblx0XHRpZiAobGFzdCkgbGFzdC5wYXJlbnQgPSBwYXJlbnQ7ZWxzZSByZXB1dGFibGUucGFyZW50ID0gcGFyZW50O1xuXG5cdFx0cmV0dXJuIHlpZWxkIGdldFBhcmVudHMocmVwdXRhYmxlLCBwYXJlbnQpO1xuXHR9KTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gZ2V0UGFyZW50cyhfeDUpIHtcblx0XHRyZXR1cm4gX3JlZjUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0fTtcbn0pKCk7XG5cbmNsYXNzIFJlcHV0YXRpb25TZXJ2aWNlIHtcblxuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0cmVwdXRlKHVzZXJuYW1lLCBpZCA9IDAsIGVudGl0eSwgdHlwZSwgZnJhZ21lbnRzLCBuZXR3b3JrID0gXCJcIiwgcGFyZW50ID0gJycsIGRldGFpbHMgPSBcIlwiKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRpZiAoZW50aXR5LmluZGV4T2YoJzo6JykgPiAtMSkgdGhyb3cgbmV3IEVycm9yKCdFbnRpdGllcyBjYW4gbm90IGhhdmUgXCI6OlwiIGluIHRoZW0uJyk7XG5cblx0XHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBfUmVwdXRhYmxlMi5kZWZhdWx0KSBwYXJlbnQgPSBwYXJlbnQuaWQgPT09IC0xID8gYGZpbmdlcnByaW50Ojoke3BhcmVudC5lbnRpdHl9Ojoke3BhcmVudC50eXBlfTo6JHtwYXJlbnQubmV0d29ya31gIDogYGlkOjoke3BhcmVudC5pZH1gO2Vsc2UgaWYgKHR5cGVvZiBwYXJlbnQgPT09ICdudW1iZXInKSBwYXJlbnQgPSBgaWQ6OiR7cGFyZW50fWA7ZWxzZSBpZiAodHlwZW9mIHBhcmVudCA9PT0gJ3N0cmluZycgJiYgcGFyZW50LnRvU3RyaW5nKCkubGVuZ3RoID4gMCAmJiBwYXJlbnQuaW5kZXhPZignOjonKSA+IC0xKSBwYXJlbnQgPSBgZmluZ2VycHJpbnQ6OiR7cGFyZW50fWA7XG5cblx0XHRcdGlmICghZnJhZ21lbnRzLmV2ZXJ5KGZ1bmN0aW9uIChmcmFnKSB7XG5cdFx0XHRcdHJldHVybiBmcmFnIGluc3RhbmNlb2YgX1JlcHV0YWJsZS5GcmFnbWVudCAmJiBmcmFnLnZhbGlkYXRlKCk7XG5cdFx0XHR9KSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyYWdtZW50cycpO1xuXHRcdFx0cmV0dXJuIGVvcy5jb250cmFjdC5yZXB1dGUodXNlcm5hbWUsIGlkLCBlbnRpdHksIHR5cGUsIGZyYWdtZW50cywgbmV0d29yaywgcGFyZW50LCBkZXRhaWxzLCBlb3Mub3B0aW9ucyk7XG5cdFx0fSkoKTtcblx0fVxuXG5cdHZvdGV0eXBlKHVzZXJuYW1lLCB0eXBlKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRyZXR1cm4gZW9zLmNvbnRyYWN0LnZvdGV0eXBlKHVzZXJuYW1lLCB0eXBlLCBlb3Mub3B0aW9ucyk7XG5cdFx0fSkoKTtcblx0fVxuXG5cdGdldEVudGl0eShpZCkge1xuXHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXG5cdFx0XHRjb25zdCByZXB1dGFibGUgPSB5aWVsZCBlb3MucmVhZCh7XG5cdFx0XHRcdHRhYmxlOiAncmVwdXRhYmxlcycsXG5cdFx0XHRcdGluZGV4OiBpZCxcblx0XHRcdFx0bGltaXQ6IDEsXG5cdFx0XHRcdGZpcnN0T25seTogdHJ1ZSxcblx0XHRcdFx0bW9kZWw6IF9SZXB1dGFibGUyLmRlZmF1bHRcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXB1dGFibGUpIHJldHVybiBudWxsO1xuXG5cdFx0XHR5aWVsZCBnZXRSZXB1dGF0aW9ucyhbcmVwdXRhYmxlXSk7XG5cdFx0XHR5aWVsZCBnZXRQYXJlbnRzKHJlcHV0YWJsZSk7XG5cblx0XHRcdHJldHVybiByZXB1dGFibGU7XG5cdFx0fSkoKTtcblx0fVxuXG5cdGdldFJlcHV0YXRpb25BbmRQYXJlbnRzKHJlcHV0YWJsZSkge1xuXHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0eWllbGQgZ2V0UmVwdXRhdGlvbnMoW3JlcHV0YWJsZV0pO1xuXHRcdFx0eWllbGQgZ2V0UGFyZW50cyhyZXB1dGFibGUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSkoKTtcblx0fVxuXG5cdHNlYXJjaEZvckVudGl0eShuYW1lKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cblx0XHRcdGNvbnN0IHJlcHV0YWJsZXMgPSB5aWVsZCBlb3MucmVhZCh7XG5cdFx0XHRcdHRhYmxlOiAncmVwdXRhYmxlcycsXG5cdFx0XHRcdGluZGV4OiAoMCwgX2hlbHBlcnMuZmluZ2VycHJpbnRlZCkobmFtZSksXG5cdFx0XHRcdGtleV90eXBlOiAnaTY0Jyxcblx0XHRcdFx0aW5kZXhfcG9zaXRpb246IDIsXG5cdFx0XHRcdGxpbWl0OiA1MDAsXG5cdFx0XHRcdHJvd3NPbmx5OiB0cnVlLFxuXHRcdFx0XHRtb2RlbDogX1JlcHV0YWJsZTIuZGVmYXVsdFxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJlcHV0YWJsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHlpZWxkIGdldFJlcHV0YXRpb25zKHJlcHV0YWJsZXMpO1xuXHRcdFx0XHR5aWVsZCBQcm9taXNlLmFsbChyZXB1dGFibGVzLm1hcChmdW5jdGlvbiAocmVwdXRhYmxlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldFBhcmVudHMocmVwdXRhYmxlKTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVwdXRhYmxlcztcblx0XHR9KSgpO1xuXHR9XG5cblx0c2VhcmNoQnlGaW5nZXJwcmludCh0eXBlID0gJycsIGVudGl0eSA9ICcnLCBuZXR3b3JrID0gJycsIGJhc2UgPSAwKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cblx0XHRcdGNvbnN0IHJlcHV0YWJsZSA9IHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0dGFibGU6ICdyZXB1dGFibGVzJyxcblx0XHRcdFx0aW5kZXg6ICgwLCBfaGVscGVycy5maW5nZXJwcmludGVkKSh0eXBlICsgZW50aXR5ICsgbmV0d29yayArIGJhc2UpLFxuXHRcdFx0XHRrZXlfdHlwZTogJ2k2NCcsXG5cdFx0XHRcdGluZGV4X3Bvc2l0aW9uOiAzLFxuXHRcdFx0XHRsaW1pdDogMSxcblx0XHRcdFx0Zmlyc3RPbmx5OiB0cnVlLFxuXHRcdFx0XHRtb2RlbDogX1JlcHV0YWJsZTIuZGVmYXVsdFxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlcHV0YWJsZSkgcmV0dXJuIG51bGw7XG5cblx0XHRcdHlpZWxkIGdldFJlcHV0YXRpb25zKFtyZXB1dGFibGVdKTtcblx0XHRcdHlpZWxkIGdldFBhcmVudHMocmVwdXRhYmxlKTtcblxuXHRcdFx0cmV0dXJuIHJlcHV0YWJsZTtcblx0XHR9KSgpO1xuXHR9XG5cblx0c2VhcmNoQnlQYXJlbnQocGFyZW50SWQpIHtcblx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblxuXHRcdFx0Y29uc3QgcmVwdXRhYmxlcyA9IHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0dGFibGU6ICdyZXB1dGFibGVzJyxcblx0XHRcdFx0aW5kZXg6IHBhcmVudElkLFxuXHRcdFx0XHRzZWFyY2g6IDAsXG5cdFx0XHRcdGtleV90eXBlOiAnaTY0Jyxcblx0XHRcdFx0aW5kZXhfcG9zaXRpb246IDQsXG5cdFx0XHRcdGxpbWl0OiA1MDAsXG5cdFx0XHRcdHJvd3NPbmx5OiB0cnVlLFxuXHRcdFx0XHRtb2RlbDogX1JlcHV0YWJsZTIuZGVmYXVsdFxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJlcHV0YWJsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHlpZWxkIGdldFJlcHV0YXRpb25zKHJlcHV0YWJsZXMpO1xuXHRcdFx0XHR5aWVsZCBQcm9taXNlLmFsbChyZXB1dGFibGVzLm1hcChmdW5jdGlvbiAocmVwdXRhYmxlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldFBhcmVudHMocmVwdXRhYmxlKTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVwdXRhYmxlcztcblx0XHR9KSgpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnRzKGJhc2UgPSAwKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRyZXR1cm4gZW9zLnJlYWQoe1xuXHRcdFx0XHR0YWJsZTogJ3JlcHR5cGVzJyxcblx0XHRcdFx0a2V5X3R5cGU6ICdpNjQnLFxuXHRcdFx0XHRpbmRleF9wb3NpdGlvbjogMixcblx0XHRcdFx0aW5kZXg6IGJhc2UsXG5cdFx0XHRcdHNlYXJjaDogMSxcblx0XHRcdFx0bGltaXQ6IDEwMCxcblx0XHRcdFx0cm93c09ubHk6IHRydWUsXG5cdFx0XHRcdG1vZGVsOiBfUmVwdXRhYmxlLlJlcFR5cGVcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fSk7XG5cdFx0fSkoKTtcblx0fVxuXG5cdGdldEZyYWdtZW50c0ZvcihyZXB1dGFibGUgPSBudWxsKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0Y29uc3QgZ2xvYmFsRnJhZ21lbnRzID0geWllbGQgX3RoaXMuZ2V0RnJhZ21lbnRzKCk7XG5cdFx0XHRjb25zdCBiYXNlZEZyYWdtZW50cyA9IHJlcHV0YWJsZSA/ICh5aWVsZCBfdGhpcy5nZXRGcmFnbWVudHMocmVwdXRhYmxlLmlkKSkubWFwKGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRcdHguaXNCYXNlZCA9IHRydWU7XG5cdFx0XHRcdHJldHVybiB4O1xuXHRcdFx0fSkgOiBbXTtcblx0XHRcdHJldHVybiBnbG9iYWxGcmFnbWVudHMuY29uY2F0KGJhc2VkRnJhZ21lbnRzKTtcblx0XHR9KSgpO1xuXHR9XG5cblx0Z2V0TWluZXJzKGlkKSB7XG5cdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cblx0XHRcdHJldHVybiBlb3MucmVhZCh7XG5cdFx0XHRcdHRhYmxlOiAnbWluZXJmcmFncycsXG5cdFx0XHRcdHNjb3BlOiBpZCxcblx0XHRcdFx0bGltaXQ6IDUwMCxcblx0XHRcdFx0cm93c09ubHk6IHRydWVcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9KTtcblx0XHR9KSgpO1xuXHR9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBSZXB1dGF0aW9uU2VydmljZTsiLCJjb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxuY29uc3Qge1xuICBjaGVja0FuZEluaXQsXG4gIHNtaXhTeW5jXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbi8vIE4gPSBDcHUgY29zdCwgciA9IE1lbW9yeSBjb3N0LCBwID0gcGFyYWxsZWxpemF0aW9uIGNvc3RcbmZ1bmN0aW9uIHNjcnlwdCAoa2V5LCBzYWx0LCBOLCByLCBwLCBka0xlbiwgcHJvZ3Jlc3NDYWxsYmFjaykge1xuICBjb25zdCB7XG4gICAgWFksXG4gICAgVixcbiAgICBCMzIsXG4gICAgeCxcbiAgICBfWCxcbiAgICBCLFxuICAgIHRpY2tDYWxsYmFja1xuICB9ID0gY2hlY2tBbmRJbml0KGtleSwgc2FsdCwgTiwgciwgcCwgZGtMZW4sIHByb2dyZXNzQ2FsbGJhY2spXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwOyBpKyspIHtcbiAgICBzbWl4U3luYyhCLCBpICogMTI4ICogciwgciwgTiwgViwgWFksIF9YLCBCMzIsIHgsIHRpY2tDYWxsYmFjaylcbiAgfVxuXG4gIHJldHVybiBjcnlwdG8ucGJrZGYyU3luYyhrZXksIEIsIDEsIGRrTGVuLCAnc2hhMjU2Jylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzY3J5cHRcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9kdXBsZXguanMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuY2xhc3MgSWRlbnRpdHkge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAtMTtcbiAgICAgICAgdGhpcy5maW5nZXJwcmludCA9ICcnO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gJyc7XG4gICAgICAgIHRoaXMua2V5ID0gJyc7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9ICcnO1xuICAgICAgICB0aGlzLmV4cGlyZXMgPSAtMTtcbiAgICAgICAgdGhpcy50b2tlbnMgPSBudWxsO1xuICAgICAgICB0aGlzLnRvdGFsX3JlcCA9IDA7XG4gICAgICAgIHRoaXMudXNhYmxlX3JlcCA9IDA7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib25kZWQgPSBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZWQgPSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eSgpO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUpzb24oanNvbikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihJZGVudGl0eS5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICB9XG5cbiAgICB0b2tlbkNhcGFjaXR5KCkge1xuICAgICAgICBjb25zdCBwYXJzZSA9IHggPT4gcGFyc2VGbG9hdCh4LnNwbGl0KCcgJylbMF0pO1xuICAgICAgICByZXR1cm4gYCR7cGFyc2VGbG9hdCgxMDAgKyBwYXJzZUZsb2F0KHBhcnNlKHRoaXMuZXhwYW5zaW9uKSArIHBhcnNlKHRoaXMuYm9uZGVkKSArIHBhcnNlKHRoaXMudXNhYmxlX3JlcCkpKS50b0ZpeGVkKDQpfSBSSURMYDtcbiAgICB9XG5cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IElkZW50aXR5OyIsIid1c2Ugc3RyaWN0J1xuXG4vLyBsaW1pdCBvZiBDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKClcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DcnlwdG8vZ2V0UmFuZG9tVmFsdWVzXG52YXIgTUFYX0JZVEVTID0gNjU1MzZcblxuLy8gTm9kZSBzdXBwb3J0cyByZXF1ZXN0aW5nIHVwIHRvIHRoaXMgbnVtYmVyIG9mIGJ5dGVzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL2NyeXB0by9yYW5kb20uanMjTDQ4XG52YXIgTUFYX1VJTlQzMiA9IDQyOTQ5NjcyOTVcblxuZnVuY3Rpb24gb2xkQnJvd3NlciAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignU2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cXG5Vc2UgQ2hyb21lLCBGaXJlZm94IG9yIEludGVybmV0IEV4cGxvcmVyIDExJylcbn1cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG52YXIgY3J5cHRvID0gZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG9cblxuaWYgKGNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZXNcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gb2xkQnJvd3NlclxufVxuXG5mdW5jdGlvbiByYW5kb21CeXRlcyAoc2l6ZSwgY2IpIHtcbiAgLy8gcGhhbnRvbWpzIG5lZWRzIHRvIHRocm93XG4gIGlmIChzaXplID4gTUFYX1VJTlQzMikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3JlcXVlc3RlZCB0b28gbWFueSByYW5kb20gYnl0ZXMnKVxuXG4gIHZhciBieXRlcyA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKVxuXG4gIGlmIChzaXplID4gMCkgeyAgLy8gZ2V0UmFuZG9tVmFsdWVzIGZhaWxzIG9uIElFIGlmIHNpemUgPT0gMFxuICAgIGlmIChzaXplID4gTUFYX0JZVEVTKSB7IC8vIHRoaXMgaXMgdGhlIG1heCBieXRlcyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzXG4gICAgICAvLyBjYW4gZG8gYXQgb25jZSBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL3dpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzXG4gICAgICBmb3IgKHZhciBnZW5lcmF0ZWQgPSAwOyBnZW5lcmF0ZWQgPCBzaXplOyBnZW5lcmF0ZWQgKz0gTUFYX0JZVEVTKSB7XG4gICAgICAgIC8vIGJ1ZmZlci5zbGljZSBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgZW5kIGlzIHBhc3QgdGhlIGVuZCBvZlxuICAgICAgICAvLyB0aGUgYnVmZmVyIHNvIHdlIGRvbid0IGhhdmUgdG8gaGVyZVxuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzLnNsaWNlKGdlbmVyYXRlZCwgZ2VuZXJhdGVkICsgTUFYX0JZVEVTKSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhieXRlcylcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY2IobnVsbCwgYnl0ZXMpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuIiwiJ3VzZSBzdHJpY3QnXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXJcbnZhciBiaXA2NiA9IHJlcXVpcmUoJ2JpcDY2JylcblxudmFyIEVDX1BSSVZLRVlfRVhQT1JUX0RFUl9DT01QUkVTU0VEID0gQnVmZmVyLmZyb20oW1xuICAvLyBiZWdpblxuICAweDMwLCAweDgxLCAweGQzLCAweDAyLCAweDAxLCAweDAxLCAweDA0LCAweDIwLFxuICAvLyBwcml2YXRlIGtleVxuICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAvLyBtaWRkbGVcbiAgMHhhMCwgMHg4MSwgMHg4NSwgMHgzMCwgMHg4MSwgMHg4MiwgMHgwMiwgMHgwMSwgMHgwMSwgMHgzMCwgMHgyYywgMHgwNiwgMHgwNywgMHgyYSwgMHg4NiwgMHg0OCxcbiAgMHhjRSwgMHgzZCwgMHgwMSwgMHgwMSwgMHgwMiwgMHgyMSwgMHgwMCwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZixcbiAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZixcbiAgMHhmZiwgMHhmZiwgMHhmRSwgMHhmZiwgMHhmZiwgMHhmYywgMHgyZiwgMHgzMCwgMHgwNiwgMHgwNCwgMHgwMSwgMHgwMCwgMHgwNCwgMHgwMSwgMHgwNywgMHgwNCxcbiAgMHgyMSwgMHgwMiwgMHg3OSwgMHhiRSwgMHg2NiwgMHg3RSwgMHhmOSwgMHhkYywgMHhiYiwgMHhhYywgMHg1NSwgMHhhMCwgMHg2MiwgMHg5NSwgMHhjRSwgMHg4NyxcbiAgMHgwYiwgMHgwNywgMHgwMiwgMHg5YiwgMHhmYywgMHhkYiwgMHgyZCwgMHhjRSwgMHgyOCwgMHhkOSwgMHg1OSwgMHhmMiwgMHg4MSwgMHg1YiwgMHgxNiwgMHhmOCxcbiAgMHgxNywgMHg5OCwgMHgwMiwgMHgyMSwgMHgwMCwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZixcbiAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmRSwgMHhiYSwgMHhhRSwgMHhkYywgMHhFNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYiwgMHhiZiwgMHhkMiwgMHg1RSxcbiAgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MSwgMHgwMiwgMHgwMSwgMHgwMSwgMHhhMSwgMHgyNCwgMHgwMywgMHgyMiwgMHgwMCxcbiAgLy8gcHVibGljIGtleVxuICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAweDAwXG5dKVxuXG52YXIgRUNfUFJJVktFWV9FWFBPUlRfREVSX1VOQ09NUFJFU1NFRCA9IEJ1ZmZlci5mcm9tKFtcbiAgLy8gYmVnaW5cbiAgMHgzMCwgMHg4MiwgMHgwMSwgMHgxMywgMHgwMiwgMHgwMSwgMHgwMSwgMHgwNCwgMHgyMCxcbiAgLy8gcHJpdmF0ZSBrZXlcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgLy8gbWlkZGxlXG4gIDB4YTAsIDB4ODEsIDB4YTUsIDB4MzAsIDB4ODEsIDB4YTIsIDB4MDIsIDB4MDEsIDB4MDEsIDB4MzAsIDB4MmMsIDB4MDYsIDB4MDcsIDB4MmEsIDB4ODYsIDB4NDgsXG4gIDB4Y0UsIDB4M2QsIDB4MDEsIDB4MDEsIDB4MDIsIDB4MjEsIDB4MDAsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsXG4gIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsXG4gIDB4ZmYsIDB4ZmYsIDB4ZkUsIDB4ZmYsIDB4ZmYsIDB4ZmMsIDB4MmYsIDB4MzAsIDB4MDYsIDB4MDQsIDB4MDEsIDB4MDAsIDB4MDQsIDB4MDEsIDB4MDcsIDB4MDQsXG4gIDB4NDEsIDB4MDQsIDB4NzksIDB4YkUsIDB4NjYsIDB4N0UsIDB4ZjksIDB4ZGMsIDB4YmIsIDB4YWMsIDB4NTUsIDB4YTAsIDB4NjIsIDB4OTUsIDB4Y0UsIDB4ODcsXG4gIDB4MGIsIDB4MDcsIDB4MDIsIDB4OWIsIDB4ZmMsIDB4ZGIsIDB4MmQsIDB4Y0UsIDB4MjgsIDB4ZDksIDB4NTksIDB4ZjIsIDB4ODEsIDB4NWIsIDB4MTYsIDB4ZjgsXG4gIDB4MTcsIDB4OTgsIDB4NDgsIDB4M2EsIDB4ZGEsIDB4NzcsIDB4MjYsIDB4YTMsIDB4YzQsIDB4NjUsIDB4NWQsIDB4YTQsIDB4ZmIsIDB4ZmMsIDB4MEUsIDB4MTEsXG4gIDB4MDgsIDB4YTgsIDB4ZmQsIDB4MTcsIDB4YjQsIDB4NDgsIDB4YTYsIDB4ODUsIDB4NTQsIDB4MTksIDB4OWMsIDB4NDcsIDB4ZDAsIDB4OGYsIDB4ZmIsIDB4MTAsXG4gIDB4ZDQsIDB4YjgsIDB4MDIsIDB4MjEsIDB4MDAsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsXG4gIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZkUsIDB4YmEsIDB4YUUsIDB4ZGMsIDB4RTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2IsIDB4YmYsIDB4ZDIsIDB4NUUsXG4gIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDEsIDB4MDIsIDB4MDEsIDB4MDEsIDB4YTEsIDB4NDQsIDB4MDMsIDB4NDIsIDB4MDAsXG4gIC8vIHB1YmxpYyBrZXlcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgMHgwMFxuXSlcblxuZXhwb3J0cy5wcml2YXRlS2V5RXhwb3J0ID0gZnVuY3Rpb24gKHByaXZhdGVLZXksIHB1YmxpY0tleSwgY29tcHJlc3NlZCkge1xuICB2YXIgcmVzdWx0ID0gQnVmZmVyLmZyb20oY29tcHJlc3NlZCA/IEVDX1BSSVZLRVlfRVhQT1JUX0RFUl9DT01QUkVTU0VEIDogRUNfUFJJVktFWV9FWFBPUlRfREVSX1VOQ09NUFJFU1NFRClcbiAgcHJpdmF0ZUtleS5jb3B5KHJlc3VsdCwgY29tcHJlc3NlZCA/IDggOiA5KVxuICBwdWJsaWNLZXkuY29weShyZXN1bHQsIGNvbXByZXNzZWQgPyAxODEgOiAyMTQpXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0cy5wcml2YXRlS2V5SW1wb3J0ID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgdmFyIGxlbmd0aCA9IHByaXZhdGVLZXkubGVuZ3RoXG5cbiAgLy8gc2VxdWVuY2UgaGVhZGVyXG4gIHZhciBpbmRleCA9IDBcbiAgaWYgKGxlbmd0aCA8IGluZGV4ICsgMSB8fCBwcml2YXRlS2V5W2luZGV4XSAhPT0gMHgzMCkgcmV0dXJuXG4gIGluZGV4ICs9IDFcblxuICAvLyBzZXF1ZW5jZSBsZW5ndGggY29uc3RydWN0b3JcbiAgaWYgKGxlbmd0aCA8IGluZGV4ICsgMSB8fCAhKHByaXZhdGVLZXlbaW5kZXhdICYgMHg4MCkpIHJldHVyblxuXG4gIHZhciBsZW5iID0gcHJpdmF0ZUtleVtpbmRleF0gJiAweDdmXG4gIGluZGV4ICs9IDFcbiAgaWYgKGxlbmIgPCAxIHx8IGxlbmIgPiAyKSByZXR1cm5cbiAgaWYgKGxlbmd0aCA8IGluZGV4ICsgbGVuYikgcmV0dXJuXG5cbiAgLy8gc2VxdWVuY2UgbGVuZ3RoXG4gIHZhciBsZW4gPSBwcml2YXRlS2V5W2luZGV4ICsgbGVuYiAtIDFdIHwgKGxlbmIgPiAxID8gcHJpdmF0ZUtleVtpbmRleCArIGxlbmIgLSAyXSA8PCA4IDogMClcbiAgaW5kZXggKz0gbGVuYlxuICBpZiAobGVuZ3RoIDwgaW5kZXggKyBsZW4pIHJldHVyblxuXG4gIC8vIHNlcXVlbmNlIGVsZW1lbnQgMDogdmVyc2lvbiBudW1iZXIgKD0xKVxuICBpZiAobGVuZ3RoIDwgaW5kZXggKyAzIHx8XG4gICAgICBwcml2YXRlS2V5W2luZGV4XSAhPT0gMHgwMiB8fFxuICAgICAgcHJpdmF0ZUtleVtpbmRleCArIDFdICE9PSAweDAxIHx8XG4gICAgICBwcml2YXRlS2V5W2luZGV4ICsgMl0gIT09IDB4MDEpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpbmRleCArPSAzXG5cbiAgLy8gc2VxdWVuY2UgZWxlbWVudCAxOiBvY3RldCBzdHJpbmcsIHVwIHRvIDMyIGJ5dGVzXG4gIGlmIChsZW5ndGggPCBpbmRleCArIDIgfHxcbiAgICAgIHByaXZhdGVLZXlbaW5kZXhdICE9PSAweDA0IHx8XG4gICAgICBwcml2YXRlS2V5W2luZGV4ICsgMV0gPiAweDIwIHx8XG4gICAgICBsZW5ndGggPCBpbmRleCArIDIgKyBwcml2YXRlS2V5W2luZGV4ICsgMV0pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBwcml2YXRlS2V5LnNsaWNlKGluZGV4ICsgMiwgaW5kZXggKyAyICsgcHJpdmF0ZUtleVtpbmRleCArIDFdKVxufVxuXG5leHBvcnRzLnNpZ25hdHVyZUV4cG9ydCA9IGZ1bmN0aW9uIChzaWdPYmopIHtcbiAgdmFyIHIgPSBCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbMF0pLCBzaWdPYmoucl0pXG4gIGZvciAodmFyIGxlblIgPSAzMywgcG9zUiA9IDA7IGxlblIgPiAxICYmIHJbcG9zUl0gPT09IDB4MDAgJiYgIShyW3Bvc1IgKyAxXSAmIDB4ODApOyAtLWxlblIsICsrcG9zUik7XG5cbiAgdmFyIHMgPSBCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbMF0pLCBzaWdPYmouc10pXG4gIGZvciAodmFyIGxlblMgPSAzMywgcG9zUyA9IDA7IGxlblMgPiAxICYmIHNbcG9zU10gPT09IDB4MDAgJiYgIShzW3Bvc1MgKyAxXSAmIDB4ODApOyAtLWxlblMsICsrcG9zUyk7XG5cbiAgcmV0dXJuIGJpcDY2LmVuY29kZShyLnNsaWNlKHBvc1IpLCBzLnNsaWNlKHBvc1MpKVxufVxuXG5leHBvcnRzLnNpZ25hdHVyZUltcG9ydCA9IGZ1bmN0aW9uIChzaWcpIHtcbiAgdmFyIHIgPSBCdWZmZXIuYWxsb2MoMzIsIDApXG4gIHZhciBzID0gQnVmZmVyLmFsbG9jKDMyLCAwKVxuXG4gIHRyeSB7XG4gICAgdmFyIHNpZ09iaiA9IGJpcDY2LmRlY29kZShzaWcpXG4gICAgaWYgKHNpZ09iai5yLmxlbmd0aCA9PT0gMzMgJiYgc2lnT2JqLnJbMF0gPT09IDB4MDApIHNpZ09iai5yID0gc2lnT2JqLnIuc2xpY2UoMSlcbiAgICBpZiAoc2lnT2JqLnIubGVuZ3RoID4gMzIpIHRocm93IG5ldyBFcnJvcignUiBsZW5ndGggaXMgdG9vIGxvbmcnKVxuICAgIGlmIChzaWdPYmoucy5sZW5ndGggPT09IDMzICYmIHNpZ09iai5zWzBdID09PSAweDAwKSBzaWdPYmoucyA9IHNpZ09iai5zLnNsaWNlKDEpXG4gICAgaWYgKHNpZ09iai5zLmxlbmd0aCA+IDMyKSB0aHJvdyBuZXcgRXJyb3IoJ1MgbGVuZ3RoIGlzIHRvbyBsb25nJylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBzaWdPYmouci5jb3B5KHIsIDMyIC0gc2lnT2JqLnIubGVuZ3RoKVxuICBzaWdPYmoucy5jb3B5KHMsIDMyIC0gc2lnT2JqLnMubGVuZ3RoKVxuXG4gIHJldHVybiB7IHI6IHIsIHM6IHMgfVxufVxuXG5leHBvcnRzLnNpZ25hdHVyZUltcG9ydExheCA9IGZ1bmN0aW9uIChzaWcpIHtcbiAgdmFyIHIgPSBCdWZmZXIuYWxsb2MoMzIsIDApXG4gIHZhciBzID0gQnVmZmVyLmFsbG9jKDMyLCAwKVxuXG4gIHZhciBsZW5ndGggPSBzaWcubGVuZ3RoXG4gIHZhciBpbmRleCA9IDBcblxuICAvLyBzZXF1ZW5jZSB0YWcgYnl0ZVxuICBpZiAoc2lnW2luZGV4KytdICE9PSAweDMwKSByZXR1cm5cblxuICAvLyBzZXF1ZW5jZSBsZW5ndGggYnl0ZVxuICB2YXIgbGVuYnl0ZSA9IHNpZ1tpbmRleCsrXVxuICBpZiAobGVuYnl0ZSAmIDB4ODApIHtcbiAgICBpbmRleCArPSBsZW5ieXRlIC0gMHg4MFxuICAgIGlmIChpbmRleCA+IGxlbmd0aCkgcmV0dXJuXG4gIH1cblxuICAvLyBzZXF1ZW5jZSB0YWcgYnl0ZSBmb3IgclxuICBpZiAoc2lnW2luZGV4KytdICE9PSAweDAyKSByZXR1cm5cblxuICAvLyBsZW5ndGggZm9yIHJcbiAgdmFyIHJsZW4gPSBzaWdbaW5kZXgrK11cbiAgaWYgKHJsZW4gJiAweDgwKSB7XG4gICAgbGVuYnl0ZSA9IHJsZW4gLSAweDgwXG4gICAgaWYgKGluZGV4ICsgbGVuYnl0ZSA+IGxlbmd0aCkgcmV0dXJuXG4gICAgZm9yICg7IGxlbmJ5dGUgPiAwICYmIHNpZ1tpbmRleF0gPT09IDB4MDA7IGluZGV4ICs9IDEsIGxlbmJ5dGUgLT0gMSk7XG4gICAgZm9yIChybGVuID0gMDsgbGVuYnl0ZSA+IDA7IGluZGV4ICs9IDEsIGxlbmJ5dGUgLT0gMSkgcmxlbiA9IChybGVuIDw8IDgpICsgc2lnW2luZGV4XVxuICB9XG4gIGlmIChybGVuID4gbGVuZ3RoIC0gaW5kZXgpIHJldHVyblxuICB2YXIgcmluZGV4ID0gaW5kZXhcbiAgaW5kZXggKz0gcmxlblxuXG4gIC8vIHNlcXVlbmNlIHRhZyBieXRlIGZvciBzXG4gIGlmIChzaWdbaW5kZXgrK10gIT09IDB4MDIpIHJldHVyblxuXG4gIC8vIGxlbmd0aCBmb3Igc1xuICB2YXIgc2xlbiA9IHNpZ1tpbmRleCsrXVxuICBpZiAoc2xlbiAmIDB4ODApIHtcbiAgICBsZW5ieXRlID0gc2xlbiAtIDB4ODBcbiAgICBpZiAoaW5kZXggKyBsZW5ieXRlID4gbGVuZ3RoKSByZXR1cm5cbiAgICBmb3IgKDsgbGVuYnl0ZSA+IDAgJiYgc2lnW2luZGV4XSA9PT0gMHgwMDsgaW5kZXggKz0gMSwgbGVuYnl0ZSAtPSAxKTtcbiAgICBmb3IgKHNsZW4gPSAwOyBsZW5ieXRlID4gMDsgaW5kZXggKz0gMSwgbGVuYnl0ZSAtPSAxKSBzbGVuID0gKHNsZW4gPDwgOCkgKyBzaWdbaW5kZXhdXG4gIH1cbiAgaWYgKHNsZW4gPiBsZW5ndGggLSBpbmRleCkgcmV0dXJuXG4gIHZhciBzaW5kZXggPSBpbmRleFxuICBpbmRleCArPSBzbGVuXG5cbiAgLy8gaWdub3JlIGxlYWRpbmcgemVyb3MgaW4gclxuICBmb3IgKDsgcmxlbiA+IDAgJiYgc2lnW3JpbmRleF0gPT09IDB4MDA7IHJsZW4gLT0gMSwgcmluZGV4ICs9IDEpO1xuICAvLyBjb3B5IHIgdmFsdWVcbiAgaWYgKHJsZW4gPiAzMikgcmV0dXJuXG4gIHZhciBydmFsdWUgPSBzaWcuc2xpY2UocmluZGV4LCByaW5kZXggKyBybGVuKVxuICBydmFsdWUuY29weShyLCAzMiAtIHJ2YWx1ZS5sZW5ndGgpXG5cbiAgLy8gaWdub3JlIGxlYWRpbmcgemVyb3MgaW4gc1xuICBmb3IgKDsgc2xlbiA+IDAgJiYgc2lnW3NpbmRleF0gPT09IDB4MDA7IHNsZW4gLT0gMSwgc2luZGV4ICs9IDEpO1xuICAvLyBjb3B5IHMgdmFsdWVcbiAgaWYgKHNsZW4gPiAzMikgcmV0dXJuXG4gIHZhciBzdmFsdWUgPSBzaWcuc2xpY2Uoc2luZGV4LCBzaW5kZXggKyBzbGVuKVxuICBzdmFsdWUuY29weShzLCAzMiAtIHN2YWx1ZS5sZW5ndGgpXG5cbiAgcmV0dXJuIHsgcjogciwgczogcyB9XG59XG4iLCIndXNlIHN0cmljdCdcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlclxudmFyIGNyZWF0ZUhhc2ggPSByZXF1aXJlKCdjcmVhdGUtaGFzaCcpXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpXG52YXIgRUMgPSByZXF1aXJlKCdlbGxpcHRpYycpLmVjXG5cbnZhciBtZXNzYWdlcyA9IHJlcXVpcmUoJy4uL21lc3NhZ2VzLmpzb24nKVxuXG52YXIgZWMgPSBuZXcgRUMoJ3NlY3AyNTZrMScpXG52YXIgZWNwYXJhbXMgPSBlYy5jdXJ2ZVxuXG5mdW5jdGlvbiBsb2FkQ29tcHJlc3NlZFB1YmxpY0tleSAoZmlyc3QsIHhCdWZmZXIpIHtcbiAgdmFyIHggPSBuZXcgQk4oeEJ1ZmZlcilcblxuICAvLyBvdmVyZmxvd1xuICBpZiAoeC5jbXAoZWNwYXJhbXMucCkgPj0gMCkgcmV0dXJuIG51bGxcbiAgeCA9IHgudG9SZWQoZWNwYXJhbXMucmVkKVxuXG4gIC8vIGNvbXB1dGUgY29ycmVzcG9uZGluZyBZXG4gIHZhciB5ID0geC5yZWRTcXIoKS5yZWRJTXVsKHgpLnJlZElBZGQoZWNwYXJhbXMuYikucmVkU3FydCgpXG4gIGlmICgoZmlyc3QgPT09IDB4MDMpICE9PSB5LmlzT2RkKCkpIHkgPSB5LnJlZE5lZygpXG5cbiAgcmV0dXJuIGVjLmtleVBhaXIoeyBwdWI6IHsgeDogeCwgeTogeSB9IH0pXG59XG5cbmZ1bmN0aW9uIGxvYWRVbmNvbXByZXNzZWRQdWJsaWNLZXkgKGZpcnN0LCB4QnVmZmVyLCB5QnVmZmVyKSB7XG4gIHZhciB4ID0gbmV3IEJOKHhCdWZmZXIpXG4gIHZhciB5ID0gbmV3IEJOKHlCdWZmZXIpXG5cbiAgLy8gb3ZlcmZsb3dcbiAgaWYgKHguY21wKGVjcGFyYW1zLnApID49IDAgfHwgeS5jbXAoZWNwYXJhbXMucCkgPj0gMCkgcmV0dXJuIG51bGxcblxuICB4ID0geC50b1JlZChlY3BhcmFtcy5yZWQpXG4gIHkgPSB5LnRvUmVkKGVjcGFyYW1zLnJlZClcblxuICAvLyBpcyBvZGQgZmxhZ1xuICBpZiAoKGZpcnN0ID09PSAweDA2IHx8IGZpcnN0ID09PSAweDA3KSAmJiB5LmlzT2RkKCkgIT09IChmaXJzdCA9PT0gMHgwNykpIHJldHVybiBudWxsXG5cbiAgLy8geCp4KnggKyBiID0geSp5XG4gIHZhciB4MyA9IHgucmVkU3FyKCkucmVkSU11bCh4KVxuICBpZiAoIXkucmVkU3FyKCkucmVkSVN1Yih4My5yZWRJQWRkKGVjcGFyYW1zLmIpKS5pc1plcm8oKSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gZWMua2V5UGFpcih7IHB1YjogeyB4OiB4LCB5OiB5IH0gfSlcbn1cblxuZnVuY3Rpb24gbG9hZFB1YmxpY0tleSAocHVibGljS2V5KSB7XG4gIHZhciBmaXJzdCA9IHB1YmxpY0tleVswXVxuICBzd2l0Y2ggKGZpcnN0KSB7XG4gICAgY2FzZSAweDAyOlxuICAgIGNhc2UgMHgwMzpcbiAgICAgIGlmIChwdWJsaWNLZXkubGVuZ3RoICE9PSAzMykgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBsb2FkQ29tcHJlc3NlZFB1YmxpY0tleShmaXJzdCwgcHVibGljS2V5LnNsaWNlKDEsIDMzKSlcbiAgICBjYXNlIDB4MDQ6XG4gICAgY2FzZSAweDA2OlxuICAgIGNhc2UgMHgwNzpcbiAgICAgIGlmIChwdWJsaWNLZXkubGVuZ3RoICE9PSA2NSkgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBsb2FkVW5jb21wcmVzc2VkUHVibGljS2V5KGZpcnN0LCBwdWJsaWNLZXkuc2xpY2UoMSwgMzMpLCBwdWJsaWNLZXkuc2xpY2UoMzMsIDY1KSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnRzLnByaXZhdGVLZXlWZXJpZnkgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICB2YXIgYm4gPSBuZXcgQk4ocHJpdmF0ZUtleSlcbiAgcmV0dXJuIGJuLmNtcChlY3BhcmFtcy5uKSA8IDAgJiYgIWJuLmlzWmVybygpXG59XG5cbmV4cG9ydHMucHJpdmF0ZUtleUV4cG9ydCA9IGZ1bmN0aW9uIChwcml2YXRlS2V5LCBjb21wcmVzc2VkKSB7XG4gIHZhciBkID0gbmV3IEJOKHByaXZhdGVLZXkpXG4gIGlmIChkLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IGQuaXNaZXJvKCkpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9FWFBPUlRfREVSX0ZBSUwpXG5cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGVjLmtleUZyb21Qcml2YXRlKHByaXZhdGVLZXkpLmdldFB1YmxpYyhjb21wcmVzc2VkLCB0cnVlKSlcbn1cblxuZXhwb3J0cy5wcml2YXRlS2V5TmVnYXRlID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgdmFyIGJuID0gbmV3IEJOKHByaXZhdGVLZXkpXG4gIHJldHVybiBibi5pc1plcm8oKSA/IEJ1ZmZlci5hbGxvYygzMikgOiBlY3BhcmFtcy5uLnN1YihibikudW1vZChlY3BhcmFtcy5uKS50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKVxufVxuXG5leHBvcnRzLnByaXZhdGVLZXlNb2RJbnZlcnNlID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgdmFyIGJuID0gbmV3IEJOKHByaXZhdGVLZXkpXG4gIGlmIChibi5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBibi5pc1plcm8oKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1JBTkdFX0lOVkFMSUQpXG5cbiAgcmV0dXJuIGJuLmludm0oZWNwYXJhbXMubikudG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCAzMilcbn1cblxuZXhwb3J0cy5wcml2YXRlS2V5VHdlYWtBZGQgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSwgdHdlYWspIHtcbiAgdmFyIGJuID0gbmV3IEJOKHR3ZWFrKVxuICBpZiAoYm4uY21wKGVjcGFyYW1zLm4pID49IDApIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9UV0VBS19BRERfRkFJTClcblxuICBibi5pYWRkKG5ldyBCTihwcml2YXRlS2V5KSlcbiAgaWYgKGJuLmNtcChlY3BhcmFtcy5uKSA+PSAwKSBibi5pc3ViKGVjcGFyYW1zLm4pXG4gIGlmIChibi5pc1plcm8oKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1RXRUFLX0FERF9GQUlMKVxuXG4gIHJldHVybiBibi50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKVxufVxuXG5leHBvcnRzLnByaXZhdGVLZXlUd2Vha011bCA9IGZ1bmN0aW9uIChwcml2YXRlS2V5LCB0d2Vhaykge1xuICB2YXIgYm4gPSBuZXcgQk4odHdlYWspXG4gIGlmIChibi5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBibi5pc1plcm8oKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1RXRUFLX01VTF9GQUlMKVxuXG4gIGJuLmltdWwobmV3IEJOKHByaXZhdGVLZXkpKVxuICBpZiAoYm4uY21wKGVjcGFyYW1zLm4pKSBibiA9IGJuLnVtb2QoZWNwYXJhbXMubilcblxuICByZXR1cm4gYm4udG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCAzMilcbn1cblxuZXhwb3J0cy5wdWJsaWNLZXlDcmVhdGUgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSwgY29tcHJlc3NlZCkge1xuICB2YXIgZCA9IG5ldyBCTihwcml2YXRlS2V5KVxuICBpZiAoZC5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBkLmlzWmVybygpKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNfUFVCTElDX0tFWV9DUkVBVEVfRkFJTClcblxuICByZXR1cm4gQnVmZmVyLmZyb20oZWMua2V5RnJvbVByaXZhdGUocHJpdmF0ZUtleSkuZ2V0UHVibGljKGNvbXByZXNzZWQsIHRydWUpKVxufVxuXG5leHBvcnRzLnB1YmxpY0tleUNvbnZlcnQgPSBmdW5jdGlvbiAocHVibGljS2V5LCBjb21wcmVzc2VkKSB7XG4gIHZhciBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJsaWNLZXkpXG4gIGlmIChwYWlyID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNfUFVCTElDX0tFWV9QQVJTRV9GQUlMKVxuXG4gIHJldHVybiBCdWZmZXIuZnJvbShwYWlyLmdldFB1YmxpYyhjb21wcmVzc2VkLCB0cnVlKSlcbn1cblxuZXhwb3J0cy5wdWJsaWNLZXlWZXJpZnkgPSBmdW5jdGlvbiAocHVibGljS2V5KSB7XG4gIHJldHVybiBsb2FkUHVibGljS2V5KHB1YmxpY0tleSkgIT09IG51bGxcbn1cblxuZXhwb3J0cy5wdWJsaWNLZXlUd2Vha0FkZCA9IGZ1bmN0aW9uIChwdWJsaWNLZXksIHR3ZWFrLCBjb21wcmVzc2VkKSB7XG4gIHZhciBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJsaWNLZXkpXG4gIGlmIChwYWlyID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNfUFVCTElDX0tFWV9QQVJTRV9GQUlMKVxuXG4gIHR3ZWFrID0gbmV3IEJOKHR3ZWFrKVxuICBpZiAodHdlYWsuY21wKGVjcGFyYW1zLm4pID49IDApIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RXRUFLX0FERF9GQUlMKVxuXG4gIHZhciBwb2ludCA9IGVjcGFyYW1zLmcubXVsKHR3ZWFrKS5hZGQocGFpci5wdWIpXG4gIGlmIChwb2ludC5pc0luZmluaXR5KCkpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RXRUFLX0FERF9GQUlMKVxuXG4gIHJldHVybiBCdWZmZXIuZnJvbShwb2ludC5lbmNvZGUodHJ1ZSwgY29tcHJlc3NlZCkpXG59XG5cbmV4cG9ydHMucHVibGljS2V5VHdlYWtNdWwgPSBmdW5jdGlvbiAocHVibGljS2V5LCB0d2VhaywgY29tcHJlc3NlZCkge1xuICB2YXIgcGFpciA9IGxvYWRQdWJsaWNLZXkocHVibGljS2V5KVxuICBpZiAocGFpciA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfUEFSU0VfRkFJTClcblxuICB0d2VhayA9IG5ldyBCTih0d2VhaylcbiAgaWYgKHR3ZWFrLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IHR3ZWFrLmlzWmVybygpKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNfUFVCTElDX0tFWV9UV0VBS19NVUxfRkFJTClcblxuICByZXR1cm4gQnVmZmVyLmZyb20ocGFpci5wdWIubXVsKHR3ZWFrKS5lbmNvZGUodHJ1ZSwgY29tcHJlc3NlZCkpXG59XG5cbmV4cG9ydHMucHVibGljS2V5Q29tYmluZSA9IGZ1bmN0aW9uIChwdWJsaWNLZXlzLCBjb21wcmVzc2VkKSB7XG4gIHZhciBwYWlycyA9IG5ldyBBcnJheShwdWJsaWNLZXlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwdWJsaWNLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgcGFpcnNbaV0gPSBsb2FkUHVibGljS2V5KHB1YmxpY0tleXNbaV0pXG4gICAgaWYgKHBhaXJzW2ldID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNfUFVCTElDX0tFWV9QQVJTRV9GQUlMKVxuICB9XG5cbiAgdmFyIHBvaW50ID0gcGFpcnNbMF0ucHViXG4gIGZvciAodmFyIGogPSAxOyBqIDwgcGFpcnMubGVuZ3RoOyArK2opIHBvaW50ID0gcG9pbnQuYWRkKHBhaXJzW2pdLnB1YilcbiAgaWYgKHBvaW50LmlzSW5maW5pdHkoKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfQ09NQklORV9GQUlMKVxuXG4gIHJldHVybiBCdWZmZXIuZnJvbShwb2ludC5lbmNvZGUodHJ1ZSwgY29tcHJlc3NlZCkpXG59XG5cbmV4cG9ydHMuc2lnbmF0dXJlTm9ybWFsaXplID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xuICB2YXIgciA9IG5ldyBCTihzaWduYXR1cmUuc2xpY2UoMCwgMzIpKVxuICB2YXIgcyA9IG5ldyBCTihzaWduYXR1cmUuc2xpY2UoMzIsIDY0KSlcbiAgaWYgKHIuY21wKGVjcGFyYW1zLm4pID49IDAgfHwgcy5jbXAoZWNwYXJhbXMubikgPj0gMCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9QQVJTRV9GQUlMKVxuXG4gIHZhciByZXN1bHQgPSBCdWZmZXIuZnJvbShzaWduYXR1cmUpXG4gIGlmIChzLmNtcChlYy5uaCkgPT09IDEpIGVjcGFyYW1zLm4uc3ViKHMpLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2JlJywgMzIpLmNvcHkocmVzdWx0LCAzMilcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydHMuc2lnbmF0dXJlRXhwb3J0ID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xuICB2YXIgciA9IHNpZ25hdHVyZS5zbGljZSgwLCAzMilcbiAgdmFyIHMgPSBzaWduYXR1cmUuc2xpY2UoMzIsIDY0KVxuICBpZiAobmV3IEJOKHIpLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IG5ldyBCTihzKS5jbXAoZWNwYXJhbXMubikgPj0gMCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9QQVJTRV9GQUlMKVxuXG4gIHJldHVybiB7IHI6IHIsIHM6IHMgfVxufVxuXG5leHBvcnRzLnNpZ25hdHVyZUltcG9ydCA9IGZ1bmN0aW9uIChzaWdPYmopIHtcbiAgdmFyIHIgPSBuZXcgQk4oc2lnT2JqLnIpXG4gIGlmIChyLmNtcChlY3BhcmFtcy5uKSA+PSAwKSByID0gbmV3IEJOKDApXG5cbiAgdmFyIHMgPSBuZXcgQk4oc2lnT2JqLnMpXG4gIGlmIChzLmNtcChlY3BhcmFtcy5uKSA+PSAwKSBzID0gbmV3IEJOKDApXG5cbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW1xuICAgIHIudG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCAzMiksXG4gICAgcy50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKVxuICBdKVxufVxuXG5leHBvcnRzLnNpZ24gPSBmdW5jdGlvbiAobWVzc2FnZSwgcHJpdmF0ZUtleSwgbm9uY2VmbiwgZGF0YSkge1xuICBpZiAodHlwZW9mIG5vbmNlZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgZ2V0Tm9uY2UgPSBub25jZWZuXG4gICAgbm9uY2VmbiA9IGZ1bmN0aW9uIChjb3VudGVyKSB7XG4gICAgICB2YXIgbm9uY2UgPSBnZXROb25jZShtZXNzYWdlLCBwcml2YXRlS2V5LCBudWxsLCBkYXRhLCBjb3VudGVyKVxuICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIobm9uY2UpIHx8IG5vbmNlLmxlbmd0aCAhPT0gMzIpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ0RTQV9TSUdOX0ZBSUwpXG5cbiAgICAgIHJldHVybiBuZXcgQk4obm9uY2UpXG4gICAgfVxuICB9XG5cbiAgdmFyIGQgPSBuZXcgQk4ocHJpdmF0ZUtleSlcbiAgaWYgKGQuY21wKGVjcGFyYW1zLm4pID49IDAgfHwgZC5pc1plcm8oKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDRFNBX1NJR05fRkFJTClcblxuICB2YXIgcmVzdWx0ID0gZWMuc2lnbihtZXNzYWdlLCBwcml2YXRlS2V5LCB7IGNhbm9uaWNhbDogdHJ1ZSwgazogbm9uY2VmbiwgcGVyczogZGF0YSB9KVxuICByZXR1cm4ge1xuICAgIHNpZ25hdHVyZTogQnVmZmVyLmNvbmNhdChbXG4gICAgICByZXN1bHQuci50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKSxcbiAgICAgIHJlc3VsdC5zLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2JlJywgMzIpXG4gICAgXSksXG4gICAgcmVjb3Zlcnk6IHJlc3VsdC5yZWNvdmVyeVBhcmFtXG4gIH1cbn1cblxuZXhwb3J0cy52ZXJpZnkgPSBmdW5jdGlvbiAobWVzc2FnZSwgc2lnbmF0dXJlLCBwdWJsaWNLZXkpIHtcbiAgdmFyIHNpZ09iaiA9IHsgcjogc2lnbmF0dXJlLnNsaWNlKDAsIDMyKSwgczogc2lnbmF0dXJlLnNsaWNlKDMyLCA2NCkgfVxuXG4gIHZhciBzaWdyID0gbmV3IEJOKHNpZ09iai5yKVxuICB2YXIgc2lncyA9IG5ldyBCTihzaWdPYmoucylcbiAgaWYgKHNpZ3IuY21wKGVjcGFyYW1zLm4pID49IDAgfHwgc2lncy5jbXAoZWNwYXJhbXMubikgPj0gMCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9QQVJTRV9GQUlMKVxuICBpZiAoc2lncy5jbXAoZWMubmgpID09PSAxIHx8IHNpZ3IuaXNaZXJvKCkgfHwgc2lncy5pc1plcm8oKSkgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIHBhaXIgPSBsb2FkUHVibGljS2V5KHB1YmxpY0tleSlcbiAgaWYgKHBhaXIgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1BBUlNFX0ZBSUwpXG5cbiAgcmV0dXJuIGVjLnZlcmlmeShtZXNzYWdlLCBzaWdPYmosIHsgeDogcGFpci5wdWIueCwgeTogcGFpci5wdWIueSB9KVxufVxuXG5leHBvcnRzLnJlY292ZXIgPSBmdW5jdGlvbiAobWVzc2FnZSwgc2lnbmF0dXJlLCByZWNvdmVyeSwgY29tcHJlc3NlZCkge1xuICB2YXIgc2lnT2JqID0geyByOiBzaWduYXR1cmUuc2xpY2UoMCwgMzIpLCBzOiBzaWduYXR1cmUuc2xpY2UoMzIsIDY0KSB9XG5cbiAgdmFyIHNpZ3IgPSBuZXcgQk4oc2lnT2JqLnIpXG4gIHZhciBzaWdzID0gbmV3IEJOKHNpZ09iai5zKVxuICBpZiAoc2lnci5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBzaWdzLmNtcChlY3BhcmFtcy5uKSA+PSAwKSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX1BBUlNFX0ZBSUwpXG5cbiAgdHJ5IHtcbiAgICBpZiAoc2lnci5pc1plcm8oKSB8fCBzaWdzLmlzWmVybygpKSB0aHJvdyBuZXcgRXJyb3IoKVxuXG4gICAgdmFyIHBvaW50ID0gZWMucmVjb3ZlclB1YktleShtZXNzYWdlLCBzaWdPYmosIHJlY292ZXJ5KVxuICAgIHJldHVybiBCdWZmZXIuZnJvbShwb2ludC5lbmNvZGUodHJ1ZSwgY29tcHJlc3NlZCkpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ0RTQV9SRUNPVkVSX0ZBSUwpXG4gIH1cbn1cblxuZXhwb3J0cy5lY2RoID0gZnVuY3Rpb24gKHB1YmxpY0tleSwgcHJpdmF0ZUtleSkge1xuICB2YXIgc2hhcmVkID0gZXhwb3J0cy5lY2RoVW5zYWZlKHB1YmxpY0tleSwgcHJpdmF0ZUtleSwgdHJ1ZSlcbiAgcmV0dXJuIGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShzaGFyZWQpLmRpZ2VzdCgpXG59XG5cbmV4cG9ydHMuZWNkaFVuc2FmZSA9IGZ1bmN0aW9uIChwdWJsaWNLZXksIHByaXZhdGVLZXksIGNvbXByZXNzZWQpIHtcbiAgdmFyIHBhaXIgPSBsb2FkUHVibGljS2V5KHB1YmxpY0tleSlcbiAgaWYgKHBhaXIgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1BBUlNFX0ZBSUwpXG5cbiAgdmFyIHNjYWxhciA9IG5ldyBCTihwcml2YXRlS2V5KVxuICBpZiAoc2NhbGFyLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IHNjYWxhci5pc1plcm8oKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDREhfRkFJTClcblxuICByZXR1cm4gQnVmZmVyLmZyb20ocGFpci5wdWIubXVsKHNjYWxhcikuZW5jb2RlKHRydWUsIGNvbXByZXNzZWQpKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlYWQgPSBleHBvcnRzLmNhbkNvbm5lY3QgPSBleHBvcnRzLmluaXQgPSBleHBvcnRzLmFjY291bnQgPSBleHBvcnRzLm9wdGlvbnMgPSBleHBvcnRzLnRva2VuID0gZXhwb3J0cy5jb250cmFjdCA9IGV4cG9ydHMucmVhZGVyID0gZXhwb3J0cy53cml0ZXIgPSBleHBvcnRzLnRva2VuQ29kZSA9IGV4cG9ydHMucmlkbENvZGUgPSBleHBvcnRzLmVuY29kZU5hbWUgPSB1bmRlZmluZWQ7XG5cbnZhciBfZW9zanMgPSByZXF1aXJlKCdlb3NqcycpO1xuXG52YXIgX2Vvc2pzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Vvc2pzKTtcblxudmFyIF9OZXR3b3JrID0gcmVxdWlyZSgnLi4vbW9kZWxzL05ldHdvcmsnKTtcblxudmFyIF9OZXR3b3JrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX05ldHdvcmspO1xuXG52YXIgX2JpZ251bWJlciA9IHJlcXVpcmUoJ2JpZ251bWJlci5qcycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgZnVuY3Rpb24gc3RlcChrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgc3RlcChcInRocm93XCIsIGVycik7IH0pOyB9IH0gcmV0dXJuIHN0ZXAoXCJuZXh0XCIpOyB9KTsgfTsgfVxuXG5jb25zdCB7IGZvcm1hdCB9ID0gX2Vvc2pzMi5kZWZhdWx0Lm1vZHVsZXM7XG5jb25zdCBlbmNvZGVOYW1lID0gZXhwb3J0cy5lbmNvZGVOYW1lID0gbmFtZSA9PiBmb3JtYXQuZW5jb2RlTmFtZShuYW1lLCBmYWxzZSk7XG5cbmNvbnN0IHJpZGxDb2RlID0gZXhwb3J0cy5yaWRsQ29kZSA9ICdyaWRscmlkbHJpZGwnO1xuY29uc3QgdG9rZW5Db2RlID0gZXhwb3J0cy50b2tlbkNvZGUgPSAncmlkbHJpZGxjb2luJztcblxubGV0IHdyaXRlciA9IGV4cG9ydHMud3JpdGVyID0gbnVsbDtcbmxldCByZWFkZXIgPSBleHBvcnRzLnJlYWRlciA9IG51bGw7XG5sZXQgY29udHJhY3QgPSBleHBvcnRzLmNvbnRyYWN0ID0gbnVsbDtcbmxldCB0b2tlbiA9IGV4cG9ydHMudG9rZW4gPSBudWxsO1xubGV0IG9wdGlvbnMgPSBleHBvcnRzLm9wdGlvbnMgPSB7fTtcbmxldCBhY2NvdW50ID0gZXhwb3J0cy5hY2NvdW50ID0gbnVsbDtcbmxldCBuZXQgPSBudWxsO1xuXG4vKioqXHJcbiAqIENhbiBiZSBpbml0aWFsaXplZCBhcyBhIHJlYWRlciBvbmx5LlxyXG4gKiBAcGFyYW0gbmV0d29ya1xyXG4gKiBAcGFyYW0gX2FjY291bnRcclxuICogQHBhcmFtIHNpZ25Qcm92aWRlclxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48Ym9vbGVhbj59XHJcbiAqL1xuY29uc3QgaW5pdCA9IGV4cG9ydHMuaW5pdCA9ICgoKSA9PiB7XG4gICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKG5ldHdvcmssIF9hY2NvdW50ID0gbnVsbCwgc2lnblByb3ZpZGVyID0gbnVsbCkge1xuICAgICAgICBuZXR3b3JrID0gX05ldHdvcmsyLmRlZmF1bHQuZnJvbUpzb24obmV0d29yayk7XG4gICAgICAgIG5ldCA9IG5ldHdvcms7XG4gICAgICAgIGlmICghIV9hY2NvdW50KSBleHBvcnRzLmFjY291bnQgPSBhY2NvdW50ID0gX2FjY291bnQ7XG5cbiAgICAgICAgaWYgKCEoeWllbGQgY2FuQ29ubmVjdCgpKSkge1xuICAgICAgICAgICAgZXhwb3J0cy53cml0ZXIgPSB3cml0ZXIgPSBudWxsO1xuICAgICAgICAgICAgZXhwb3J0cy5jb250cmFjdCA9IGNvbnRyYWN0ID0gbnVsbDtcbiAgICAgICAgICAgIGV4cG9ydHMudG9rZW4gPSB0b2tlbiA9IG51bGw7XG4gICAgICAgICAgICBleHBvcnRzLm9wdGlvbnMgPSBvcHRpb25zID0ge307XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBleHBvcnRzLnJlYWRlciA9IHJlYWRlciA9ICgwLCBfZW9zanMyLmRlZmF1bHQpKHsgaHR0cEVuZHBvaW50OiBuZXR3b3JrLmZ1bGxob3N0KCksIGNoYWluSWQ6IG5ldHdvcmsuY2hhaW5JZCB9KTtcblxuICAgICAgICBpZiAoc2lnblByb3ZpZGVyKSB7XG4gICAgICAgICAgICBleHBvcnRzLndyaXRlciA9IHdyaXRlciA9ICgwLCBfZW9zanMyLmRlZmF1bHQpKHsgaHR0cEVuZHBvaW50OiBuZXR3b3JrLmZ1bGxob3N0KCksIGNoYWluSWQ6IG5ldHdvcmsuY2hhaW5JZCwgc2lnblByb3ZpZGVyIH0pO1xuICAgICAgICAgICAgZXhwb3J0cy5jb250cmFjdCA9IGNvbnRyYWN0ID0geWllbGQgd3JpdGVyLmNvbnRyYWN0KHJpZGxDb2RlKTtcbiAgICAgICAgICAgIGV4cG9ydHMudG9rZW4gPSB0b2tlbiA9IHlpZWxkIHdyaXRlci5jb250cmFjdCh0b2tlbkNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cy53cml0ZXIgPSB3cml0ZXIgPSBudWxsO1xuICAgICAgICAgICAgZXhwb3J0cy5jb250cmFjdCA9IGNvbnRyYWN0ID0gbnVsbDtcbiAgICAgICAgICAgIGV4cG9ydHMudG9rZW4gPSB0b2tlbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGxvZ2dlcjoge1xuICAgICAgICAgICAgICAgIGxvZzogbnVsbCwgLy9jb25zb2xlLmxvZyxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCAvL2NvbnNvbGUuZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBleHBvcnRzLm9wdGlvbnMgPSBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihiYXNlT3B0aW9ucywgISFfYWNjb3VudCA/IHsgYXV0aG9yaXphdGlvbjogW2Ake19hY2NvdW50Lm5hbWV9QCR7X2FjY291bnQuYXV0aG9yaXR5fWBdIH0gOiB7fSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGluaXQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufSkoKTtcblxuLyoqKlxyXG4gKiBDaGVja3MgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIG5ldHdvcmsuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlLjwqPn1cclxuICovXG5jb25zdCBjYW5Db25uZWN0ID0gZXhwb3J0cy5jYW5Db25uZWN0ID0gKCgpID0+IHtcbiAgICB2YXIgX3JlZjIgPSBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB0aW1lb3V0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByKGZhbHNlKTtcbiAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGVzdGVyID0gZmV0Y2goYCR7bmV0LmZ1bGxob3N0KCl9L3YxL2NoYWluL2dldF9pbmZvYCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbdGltZW91dCwgdGVzdGVyXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gY2FuQ29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn0pKCk7XG5cbmNvbnN0IHJlYWQgPSBleHBvcnRzLnJlYWQgPSAoKCkgPT4ge1xuICAgIHZhciBfcmVmMyA9IF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoeyB0YWJsZSwgaW5kZXggPSBudWxsLCB1cHBlcl9ib3VuZCA9IG51bGwsIG5vYm91bmQgPSBmYWxzZSwgbGltaXQgPSAxMCwgbW9kZWwgPSBudWxsLCBzY29wZSA9IHJpZGxDb2RlLCB0b2tlbiA9IGZhbHNlLCBmaXJzdE9ubHkgPSBmYWxzZSwgcm93c09ubHkgPSBmYWxzZSwga2V5X3R5cGUgPSBudWxsLCBpbmRleF9wb3NpdGlvbiA9IG51bGwsIHNlYXJjaCA9IG51bGwgfSkge1xuICAgICAgICBsZXQgYWRkaXRpb25zID0gaW5kZXggIT09IG51bGwgPyB7IGxvd2VyX2JvdW5kOiBpbmRleCwgdXBwZXJfYm91bmQ6IHVwcGVyX2JvdW5kID8gdXBwZXJfYm91bmQgOiAoMCwgX2JpZ251bWJlci5CaWdOdW1iZXIpKGluZGV4KS5wbHVzKHNlYXJjaCAhPT0gbnVsbCA/IHNlYXJjaCA6IGxpbWl0KS50b1N0cmluZygpIH0gOiB7fTtcbiAgICAgICAgaWYgKG5vYm91bmQpIGRlbGV0ZSBhZGRpdGlvbnMudXBwZXJfYm91bmQ7XG4gICAgICAgIGlmIChrZXlfdHlwZSkgYWRkaXRpb25zID0gT2JqZWN0LmFzc2lnbih7IGtleV90eXBlIH0sIGFkZGl0aW9ucyk7XG4gICAgICAgIGlmIChpbmRleF9wb3NpdGlvbikgYWRkaXRpb25zID0gT2JqZWN0LmFzc2lnbih7IGluZGV4X3Bvc2l0aW9uIH0sIGFkZGl0aW9ucyk7XG4gICAgICAgIHJldHVybiB5aWVsZCByZWFkZXIuZ2V0VGFibGVSb3dzKE9iamVjdC5hc3NpZ24oeyBqc29uOiB0cnVlLCBjb2RlOiB0b2tlbiA/IHRva2VuQ29kZSA6IHJpZGxDb2RlLCBzY29wZSwgdGFibGUsIGxpbWl0IH0sIGFkZGl0aW9ucykpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsKSByZXN1bHQgPSBmb3JtYXRSb3cocmVzdWx0LCBtb2RlbCk7XG4gICAgICAgICAgICBpZiAoZmlyc3RPbmx5KSByZXR1cm4gZ2V0Rmlyc3RPbmx5KHJlc3VsdCk7XG4gICAgICAgICAgICBpZiAocm93c09ubHkpIHJldHVybiBnZXRSb3dzT25seShyZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZChfeDIpIHtcbiAgICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn0pKCk7XG5cbmNvbnN0IGZvcm1hdFJvdyA9IChyZXN1bHQsIG1vZGVsKSA9PiB7XG4gICAgcmVzdWx0LnJvd3MgPSByZXN1bHQucm93cy5tYXAobW9kZWwuZnJvbUpzb24pO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBnZXRSb3dzT25seSA9IHJlc3VsdCA9PiByZXN1bHQucm93cztcbmNvbnN0IGdldEZpcnN0T25seSA9IHJlc3VsdCA9PiByZXN1bHQucm93cy5sZW5ndGggPyBnZXRSb3dzT25seShyZXN1bHQpWzBdIDogbnVsbDsiLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWInKShyZXF1aXJlKCcuL2xpYi9lbGxpcHRpYycpKVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGEgdHJhbnNmb3JtIHN0cmVhbSBpcyBhIHJlYWRhYmxlL3dyaXRhYmxlIHN0cmVhbSB3aGVyZSB5b3UgZG9cbi8vIHNvbWV0aGluZyB3aXRoIHRoZSBkYXRhLiAgU29tZXRpbWVzIGl0J3MgY2FsbGVkIGEgXCJmaWx0ZXJcIixcbi8vIGJ1dCB0aGF0J3Mgbm90IGEgZ3JlYXQgbmFtZSBmb3IgaXQsIHNpbmNlIHRoYXQgaW1wbGllcyBhIHRoaW5nIHdoZXJlXG4vLyBzb21lIGJpdHMgcGFzcyB0aHJvdWdoLCBhbmQgb3RoZXJzIGFyZSBzaW1wbHkgaWdub3JlZC4gIChUaGF0IHdvdWxkXG4vLyBiZSBhIHZhbGlkIGV4YW1wbGUgb2YgYSB0cmFuc2Zvcm0sIG9mIGNvdXJzZS4pXG4vL1xuLy8gV2hpbGUgdGhlIG91dHB1dCBpcyBjYXVzYWxseSByZWxhdGVkIHRvIHRoZSBpbnB1dCwgaXQncyBub3QgYVxuLy8gbmVjZXNzYXJpbHkgc3ltbWV0cmljIG9yIHN5bmNocm9ub3VzIHRyYW5zZm9ybWF0aW9uLiAgRm9yIGV4YW1wbGUsXG4vLyBhIHpsaWIgc3RyZWFtIG1pZ2h0IHRha2UgbXVsdGlwbGUgcGxhaW4tdGV4dCB3cml0ZXMoKSwgYW5kIHRoZW5cbi8vIGVtaXQgYSBzaW5nbGUgY29tcHJlc3NlZCBjaHVuayBzb21lIHRpbWUgaW4gdGhlIGZ1dHVyZS5cbi8vXG4vLyBIZXJlJ3MgaG93IHRoaXMgd29ya3M6XG4vL1xuLy8gVGhlIFRyYW5zZm9ybSBzdHJlYW0gaGFzIGFsbCB0aGUgYXNwZWN0cyBvZiB0aGUgcmVhZGFibGUgYW5kIHdyaXRhYmxlXG4vLyBzdHJlYW0gY2xhc3Nlcy4gIFdoZW4geW91IHdyaXRlKGNodW5rKSwgdGhhdCBjYWxscyBfd3JpdGUoY2h1bmssY2IpXG4vLyBpbnRlcm5hbGx5LCBhbmQgcmV0dXJucyBmYWxzZSBpZiB0aGVyZSdzIGEgbG90IG9mIHBlbmRpbmcgd3JpdGVzXG4vLyBidWZmZXJlZCB1cC4gIFdoZW4geW91IGNhbGwgcmVhZCgpLCB0aGF0IGNhbGxzIF9yZWFkKG4pIHVudGlsXG4vLyB0aGVyZSdzIGVub3VnaCBwZW5kaW5nIHJlYWRhYmxlIGRhdGEgYnVmZmVyZWQgdXAuXG4vL1xuLy8gSW4gYSB0cmFuc2Zvcm0gc3RyZWFtLCB0aGUgd3JpdHRlbiBkYXRhIGlzIHBsYWNlZCBpbiBhIGJ1ZmZlci4gIFdoZW5cbi8vIF9yZWFkKG4pIGlzIGNhbGxlZCwgaXQgdHJhbnNmb3JtcyB0aGUgcXVldWVkIHVwIGRhdGEsIGNhbGxpbmcgdGhlXG4vLyBidWZmZXJlZCBfd3JpdGUgY2IncyBhcyBpdCBjb25zdW1lcyBjaHVua3MuICBJZiBjb25zdW1pbmcgYSBzaW5nbGVcbi8vIHdyaXR0ZW4gY2h1bmsgd291bGQgcmVzdWx0IGluIG11bHRpcGxlIG91dHB1dCBjaHVua3MsIHRoZW4gdGhlIGZpcnN0XG4vLyBvdXRwdXR0ZWQgYml0IGNhbGxzIHRoZSByZWFkY2IsIGFuZCBzdWJzZXF1ZW50IGNodW5rcyBqdXN0IGdvIGludG9cbi8vIHRoZSByZWFkIGJ1ZmZlciwgYW5kIHdpbGwgY2F1c2UgaXQgdG8gZW1pdCAncmVhZGFibGUnIGlmIG5lY2Vzc2FyeS5cbi8vXG4vLyBUaGlzIHdheSwgYmFjay1wcmVzc3VyZSBpcyBhY3R1YWxseSBkZXRlcm1pbmVkIGJ5IHRoZSByZWFkaW5nIHNpZGUsXG4vLyBzaW5jZSBfcmVhZCBoYXMgdG8gYmUgY2FsbGVkIHRvIHN0YXJ0IHByb2Nlc3NpbmcgYSBuZXcgY2h1bmsuICBIb3dldmVyLFxuLy8gYSBwYXRob2xvZ2ljYWwgaW5mbGF0ZSB0eXBlIG9mIHRyYW5zZm9ybSBjYW4gY2F1c2UgZXhjZXNzaXZlIGJ1ZmZlcmluZ1xuLy8gaGVyZS4gIEZvciBleGFtcGxlLCBpbWFnaW5lIGEgc3RyZWFtIHdoZXJlIGV2ZXJ5IGJ5dGUgb2YgaW5wdXQgaXNcbi8vIGludGVycHJldGVkIGFzIGFuIGludGVnZXIgZnJvbSAwLTI1NSwgYW5kIHRoZW4gcmVzdWx0cyBpbiB0aGF0IG1hbnlcbi8vIGJ5dGVzIG9mIG91dHB1dC4gIFdyaXRpbmcgdGhlIDQgYnl0ZXMge2ZmLGZmLGZmLGZmfSB3b3VsZCByZXN1bHQgaW5cbi8vIDFrYiBvZiBkYXRhIGJlaW5nIG91dHB1dC4gIEluIHRoaXMgY2FzZSwgeW91IGNvdWxkIHdyaXRlIGEgdmVyeSBzbWFsbFxuLy8gYW1vdW50IG9mIGlucHV0LCBhbmQgZW5kIHVwIHdpdGggYSB2ZXJ5IGxhcmdlIGFtb3VudCBvZiBvdXRwdXQuICBJblxuLy8gc3VjaCBhIHBhdGhvbG9naWNhbCBpbmZsYXRpbmcgbWVjaGFuaXNtLCB0aGVyZSdkIGJlIG5vIHdheSB0byB0ZWxsXG4vLyB0aGUgc3lzdGVtIHRvIHN0b3AgZG9pbmcgdGhlIHRyYW5zZm9ybS4gIEEgc2luZ2xlIDRNQiB3cml0ZSBjb3VsZFxuLy8gY2F1c2UgdGhlIHN5c3RlbSB0byBydW4gb3V0IG9mIG1lbW9yeS5cbi8vXG4vLyBIb3dldmVyLCBldmVuIGluIHN1Y2ggYSBwYXRob2xvZ2ljYWwgY2FzZSwgb25seSBhIHNpbmdsZSB3cml0dGVuIGNodW5rXG4vLyB3b3VsZCBiZSBjb25zdW1lZCwgYW5kIHRoZW4gdGhlIHJlc3Qgd291bGQgd2FpdCAodW4tdHJhbnNmb3JtZWQpIHVudGlsXG4vLyB0aGUgcmVzdWx0cyBvZiB0aGUgcHJldmlvdXMgdHJhbnNmb3JtZWQgY2h1bmsgd2VyZSBjb25zdW1lZC5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTtcblxudmFyIER1cGxleCA9IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG51dGlsLmluaGVyaXRzKFRyYW5zZm9ybSwgRHVwbGV4KTtcblxuZnVuY3Rpb24gYWZ0ZXJUcmFuc2Zvcm0oZXIsIGRhdGEpIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuXG4gIHZhciBjYiA9IHRzLndyaXRlY2I7XG5cbiAgaWYgKCFjYikge1xuICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCd3cml0ZSBjYWxsYmFjayBjYWxsZWQgbXVsdGlwbGUgdGltZXMnKSk7XG4gIH1cblxuICB0cy53cml0ZWNodW5rID0gbnVsbDtcbiAgdHMud3JpdGVjYiA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT0gbnVsbCkgLy8gc2luZ2xlIGVxdWFscyBjaGVjayBmb3IgYm90aCBgbnVsbGAgYW5kIGB1bmRlZmluZWRgXG4gICAgdGhpcy5wdXNoKGRhdGEpO1xuXG4gIGNiKGVyKTtcblxuICB2YXIgcnMgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICBycy5yZWFkaW5nID0gZmFsc2U7XG4gIGlmIChycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykge1xuICAgIHRoaXMuX3JlYWQocnMuaGlnaFdhdGVyTWFyayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFRyYW5zZm9ybSkpIHJldHVybiBuZXcgVHJhbnNmb3JtKG9wdGlvbnMpO1xuXG4gIER1cGxleC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gIHRoaXMuX3RyYW5zZm9ybVN0YXRlID0ge1xuICAgIGFmdGVyVHJhbnNmb3JtOiBhZnRlclRyYW5zZm9ybS5iaW5kKHRoaXMpLFxuICAgIG5lZWRUcmFuc2Zvcm06IGZhbHNlLFxuICAgIHRyYW5zZm9ybWluZzogZmFsc2UsXG4gICAgd3JpdGVjYjogbnVsbCxcbiAgICB3cml0ZWNodW5rOiBudWxsLFxuICAgIHdyaXRlZW5jb2Rpbmc6IG51bGxcbiAgfTtcblxuICAvLyBzdGFydCBvdXQgYXNraW5nIGZvciBhIHJlYWRhYmxlIGV2ZW50IG9uY2UgZGF0YSBpcyB0cmFuc2Zvcm1lZC5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuXG4gIC8vIHdlIGhhdmUgaW1wbGVtZW50ZWQgdGhlIF9yZWFkIG1ldGhvZCwgYW5kIGRvbmUgdGhlIG90aGVyIHRoaW5nc1xuICAvLyB0aGF0IFJlYWRhYmxlIHdhbnRzIGJlZm9yZSB0aGUgZmlyc3QgX3JlYWQgY2FsbCwgc28gdW5zZXQgdGhlXG4gIC8vIHN5bmMgZ3VhcmQgZmxhZy5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5zeW5jID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nKSB0aGlzLl90cmFuc2Zvcm0gPSBvcHRpb25zLnRyYW5zZm9ybTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2ggPSBvcHRpb25zLmZsdXNoO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgd3JpdGFibGUgc2lkZSBmaW5pc2hlcywgdGhlbiBmbHVzaCBvdXQgYW55dGhpbmcgcmVtYWluaW5nLlxuICB0aGlzLm9uKCdwcmVmaW5pc2gnLCBwcmVmaW5pc2gpO1xufVxuXG5mdW5jdGlvbiBwcmVmaW5pc2goKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLl9mbHVzaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuX2ZsdXNoKGZ1bmN0aW9uIChlciwgZGF0YSkge1xuICAgICAgZG9uZShfdGhpcywgZXIsIGRhdGEpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvbmUodGhpcywgbnVsbCwgbnVsbCk7XG4gIH1cbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5uZWVkVHJhbnNmb3JtID0gZmFsc2U7XG4gIHJldHVybiBEdXBsZXgucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcpO1xufTtcblxuLy8gVGhpcyBpcyB0aGUgcGFydCB3aGVyZSB5b3UgZG8gc3R1ZmYhXG4vLyBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGluIGltcGxlbWVudGF0aW9uIGNsYXNzZXMuXG4vLyAnY2h1bmsnIGlzIGFuIGlucHV0IGNodW5rLlxuLy9cbi8vIENhbGwgYHB1c2gobmV3Q2h1bmspYCB0byBwYXNzIGFsb25nIHRyYW5zZm9ybWVkIG91dHB1dFxuLy8gdG8gdGhlIHJlYWRhYmxlIHNpZGUuICBZb3UgbWF5IGNhbGwgJ3B1c2gnIHplcm8gb3IgbW9yZSB0aW1lcy5cbi8vXG4vLyBDYWxsIGBjYihlcnIpYCB3aGVuIHlvdSBhcmUgZG9uZSB3aXRoIHRoaXMgY2h1bmsuICBJZiB5b3UgcGFzc1xuLy8gYW4gZXJyb3IsIHRoZW4gdGhhdCdsbCBwdXQgdGhlIGh1cnQgb24gdGhlIHdob2xlIG9wZXJhdGlvbi4gIElmIHlvdVxuLy8gbmV2ZXIgY2FsbCBjYigpLCB0aGVuIHlvdSdsbCBuZXZlciBnZXQgYW5vdGhlciBjaHVuay5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRocm93IG5ldyBFcnJvcignX3RyYW5zZm9ybSgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xufTtcblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcbiAgdHMud3JpdGVjYiA9IGNiO1xuICB0cy53cml0ZWNodW5rID0gY2h1bms7XG4gIHRzLndyaXRlZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgaWYgKCF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB2YXIgcnMgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICh0cy5uZWVkVHJhbnNmb3JtIHx8IHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB0aGlzLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59O1xuXG4vLyBEb2Vzbid0IG1hdHRlciB3aGF0IHRoZSBhcmdzIGFyZSBoZXJlLlxuLy8gX3RyYW5zZm9ybSBkb2VzIGFsbCB0aGUgd29yay5cbi8vIFRoYXQgd2UgZ290IGhlcmUgbWVhbnMgdGhhdCB0aGUgcmVhZGFibGUgc2lkZSB3YW50cyBtb3JlIGRhdGEuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG5cbiAgaWYgKHRzLndyaXRlY2h1bmsgIT09IG51bGwgJiYgdHMud3JpdGVjYiAmJiAhdHMudHJhbnNmb3JtaW5nKSB7XG4gICAgdHMudHJhbnNmb3JtaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl90cmFuc2Zvcm0odHMud3JpdGVjaHVuaywgdHMud3JpdGVlbmNvZGluZywgdHMuYWZ0ZXJUcmFuc2Zvcm0pO1xuICB9IGVsc2Uge1xuICAgIC8vIG1hcmsgdGhhdCB3ZSBuZWVkIGEgdHJhbnNmb3JtLCBzbyB0aGF0IGFueSBkYXRhIHRoYXQgY29tZXMgaW5cbiAgICAvLyB3aWxsIGdldCBwcm9jZXNzZWQsIG5vdyB0aGF0IHdlJ3ZlIGFza2VkIGZvciBpdC5cbiAgICB0cy5uZWVkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgfVxufTtcblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIER1cGxleC5wcm90b3R5cGUuX2Rlc3Ryb3kuY2FsbCh0aGlzLCBlcnIsIGZ1bmN0aW9uIChlcnIyKSB7XG4gICAgY2IoZXJyMik7XG4gICAgX3RoaXMyLmVtaXQoJ2Nsb3NlJyk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZG9uZShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIGlmIChlcikgcmV0dXJuIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcblxuICBpZiAoZGF0YSAhPSBudWxsKSAvLyBzaW5nbGUgZXF1YWxzIGNoZWNrIGZvciBib3RoIGBudWxsYCBhbmQgYHVuZGVmaW5lZGBcbiAgICBzdHJlYW0ucHVzaChkYXRhKTtcblxuICAvLyBpZiB0aGVyZSdzIG5vdGhpbmcgaW4gdGhlIHdyaXRlIGJ1ZmZlciwgdGhlbiB0aGF0IG1lYW5zXG4gIC8vIHRoYXQgbm90aGluZyBtb3JlIHdpbGwgZXZlciBiZSBwcm92aWRlZFxuICBpZiAoc3RyZWFtLl93cml0YWJsZVN0YXRlLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdDYWxsaW5nIHRyYW5zZm9ybSBkb25lIHdoZW4gd3MubGVuZ3RoICE9IDAnKTtcblxuICBpZiAoc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZS50cmFuc2Zvcm1pbmcpIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHN0aWxsIHRyYW5zZm9ybWluZycpO1xuXG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fd3JpdGFibGUuanMnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHRcdFx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2VvcyA9IHJlcXVpcmUoXCIuL2Vvc1wiKTtcblxudmFyIGVvcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9lb3MpO1xuXG52YXIgX0JvbmQgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0JvbmRcIik7XG5cbnZhciBfQm9uZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Cb25kKTtcblxudmFyIF9oZWxwZXJzID0gcmVxdWlyZShcIi4uL3V0aWwvaGVscGVyc1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHsgdHJ5IHsgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpOyB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlOyB9IGNhdGNoIChlcnJvcikgeyByZWplY3QoZXJyb3IpOyByZXR1cm47IH0gaWYgKGluZm8uZG9uZSkgeyByZXNvbHZlKHZhbHVlKTsgfSBlbHNlIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHN0ZXAoXCJ0aHJvd1wiLCBlcnIpOyB9KTsgfSB9IHJldHVybiBzdGVwKFwibmV4dFwiKTsgfSk7IH07IH1cblxuY2xhc3MgQm9uZFNlcnZpY2Uge1xuXG5cdFx0XHRcdGNvbnN0cnVjdG9yKCkge31cblxuXHRcdFx0XHRnZXQoYm9uZF9pZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGU6ICdib25kcycsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluZGV4OiBib25kX2lkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW1pdDogMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IF9Cb25kMi5kZWZhdWx0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaXJzdE9ubHk6IHRydWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaW5kQnlGaW5nZXJwcmludCh0aXRsZSwgZGV0YWlscywgdXNlcm5hbWUsIGxpbWl0LCBmaXhlZF9wYXJ0eSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGU6ICdib25kcycsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleV90eXBlOiAnaTY0Jyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5kZXhfcG9zaXRpb246IDMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluZGV4OiAoMCwgX2hlbHBlcnMuZmluZ2VycHJpbnRlZCkodGl0bGUgKyBkZXRhaWxzICsgdXNlcm5hbWUgKyBsaW1pdCArIGZpeGVkX3BhcnR5KSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bm9ib3VuZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGltaXQ6IDEsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiBfQm9uZDIuZGVmYXVsdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zmlyc3RPbmx5OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmluZEJvbmRzKGlkZW50aXR5X2lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geWllbGQgZW9zLnJlYWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJsZTogJ2JvbmRzJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5X3R5cGU6ICdpNjQnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbmRleF9wb3NpdGlvbjogMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5kZXg6IGlkZW50aXR5X2lkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW1pdDogNTAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogX0JvbmQyLmRlZmF1bHQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvd3NPbmx5OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3JlYXRlYm9uZCh1c2VybmFtZSwgdGl0bGUsIGRldGFpbHMsIGR1cmF0aW9uLCBsaW1pdCwgc3RhcnRzX2luX3NlY29uZHMgPSAwLCBmaXhlZF9wYXJ0eSA9IDApIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZW9zLmNvbnRyYWN0LmNyZWF0ZWJvbmQodXNlcm5hbWUsIHRpdGxlLCBkZXRhaWxzLCBkdXJhdGlvbiwgc3RhcnRzX2luX3NlY29uZHMsIGxpbWl0LCBmaXhlZF9wYXJ0eSwgZW9zLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuZmluZEJ5RmluZ2VycHJpbnQodGl0bGUsIGRldGFpbHMsIHVzZXJuYW1lLCBsaW1pdCwgZml4ZWRfcGFydHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpc3B1dGVib25kKHVzZXJuYW1lLCBib25kX2lkLCByZXAgPSAnMS4wMDAwIFJFUCcpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlb3MuY29udHJhY3QuZGlzcHV0ZWJvbmQodXNlcm5hbWUsIGJvbmRfaWQsIHJlcCwgZW9zLm9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYW5jZWxib25kKHVzZXJuYW1lLCBib25kX2lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZW9zLmNvbnRyYWN0LmNhbmNlbGJvbmQodXNlcm5hbWUsIGJvbmRfaWQsIGVvcy5vcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2xvc2Vib25kKGJvbmRfaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlb3MuY29udHJhY3QuY2xvc2Vib25kKGJvbmRfaWQsIGVvcy5vcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXJhc2Vib25kKGJvbmRfaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlb3MuY29udHJhY3QuZXJhc2Vib25kKGJvbmRfaWQsIGVvcy5vcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBCb25kU2VydmljZTsiLCIndXNlIHN0cmljdCdcbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2Fzc2VydCcpXG52YXIgZGVyID0gcmVxdWlyZSgnLi9kZXInKVxudmFyIG1lc3NhZ2VzID0gcmVxdWlyZSgnLi9tZXNzYWdlcy5qc29uJylcblxuZnVuY3Rpb24gaW5pdENvbXByZXNzZWRWYWx1ZSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuXG4gIGFzc2VydC5pc0Jvb2xlYW4odmFsdWUsIG1lc3NhZ2VzLkNPTVBSRVNTRURfVFlQRV9JTlZBTElEKVxuICByZXR1cm4gdmFsdWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VjcDI1NmsxKSB7XG4gIHJldHVybiB7XG4gICAgcHJpdmF0ZUtleVZlcmlmeTogZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihwcml2YXRlS2V5LCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICByZXR1cm4gcHJpdmF0ZUtleS5sZW5ndGggPT09IDMyICYmIHNlY3AyNTZrMS5wcml2YXRlS2V5VmVyaWZ5KHByaXZhdGVLZXkpXG4gICAgfSxcblxuICAgIHByaXZhdGVLZXlFeHBvcnQ6IGZ1bmN0aW9uIChwcml2YXRlS2V5LCBjb21wcmVzc2VkKSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHJpdmF0ZUtleSwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHByaXZhdGVLZXksIDMyLCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgY29tcHJlc3NlZCA9IGluaXRDb21wcmVzc2VkVmFsdWUoY29tcHJlc3NlZCwgdHJ1ZSlcbiAgICAgIHZhciBwdWJsaWNLZXkgPSBzZWNwMjU2azEucHJpdmF0ZUtleUV4cG9ydChwcml2YXRlS2V5LCBjb21wcmVzc2VkKVxuXG4gICAgICByZXR1cm4gZGVyLnByaXZhdGVLZXlFeHBvcnQocHJpdmF0ZUtleSwgcHVibGljS2V5LCBjb21wcmVzc2VkKVxuICAgIH0sXG5cbiAgICBwcml2YXRlS2V5SW1wb3J0OiBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHByaXZhdGVLZXksIG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1RZUEVfSU5WQUxJRClcblxuICAgICAgcHJpdmF0ZUtleSA9IGRlci5wcml2YXRlS2V5SW1wb3J0KHByaXZhdGVLZXkpXG4gICAgICBpZiAocHJpdmF0ZUtleSAmJiBwcml2YXRlS2V5Lmxlbmd0aCA9PT0gMzIgJiYgc2VjcDI1NmsxLnByaXZhdGVLZXlWZXJpZnkocHJpdmF0ZUtleSkpIHJldHVybiBwcml2YXRlS2V5XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9JTVBPUlRfREVSX0ZBSUwpXG4gICAgfSxcblxuICAgIHByaXZhdGVLZXlOZWdhdGU6IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHJpdmF0ZUtleSwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHByaXZhdGVLZXksIDMyLCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgcmV0dXJuIHNlY3AyNTZrMS5wcml2YXRlS2V5TmVnYXRlKHByaXZhdGVLZXkpXG4gICAgfSxcblxuICAgIHByaXZhdGVLZXlNb2RJbnZlcnNlOiBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHByaXZhdGVLZXksIG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aChwcml2YXRlS2V5LCAzMiwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEucHJpdmF0ZUtleU1vZEludmVyc2UocHJpdmF0ZUtleSlcbiAgICB9LFxuXG4gICAgcHJpdmF0ZUtleVR3ZWFrQWRkOiBmdW5jdGlvbiAocHJpdmF0ZUtleSwgdHdlYWspIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihwcml2YXRlS2V5LCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgocHJpdmF0ZUtleSwgMzIsIG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIodHdlYWssIG1lc3NhZ2VzLlRXRUFLX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aCh0d2VhaywgMzIsIG1lc3NhZ2VzLlRXRUFLX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnByaXZhdGVLZXlUd2Vha0FkZChwcml2YXRlS2V5LCB0d2VhaylcbiAgICB9LFxuXG4gICAgcHJpdmF0ZUtleVR3ZWFrTXVsOiBmdW5jdGlvbiAocHJpdmF0ZUtleSwgdHdlYWspIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihwcml2YXRlS2V5LCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgocHJpdmF0ZUtleSwgMzIsIG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIodHdlYWssIG1lc3NhZ2VzLlRXRUFLX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aCh0d2VhaywgMzIsIG1lc3NhZ2VzLlRXRUFLX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnByaXZhdGVLZXlUd2Vha011bChwcml2YXRlS2V5LCB0d2VhaylcbiAgICB9LFxuXG4gICAgcHVibGljS2V5Q3JlYXRlOiBmdW5jdGlvbiAocHJpdmF0ZUtleSwgY29tcHJlc3NlZCkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHByaXZhdGVLZXksIG1lc3NhZ2VzLkVDX1BSSVZBVEVfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aChwcml2YXRlS2V5LCAzMiwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGNvbXByZXNzZWQgPSBpbml0Q29tcHJlc3NlZFZhbHVlKGNvbXByZXNzZWQsIHRydWUpXG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5Q3JlYXRlKHByaXZhdGVLZXksIGNvbXByZXNzZWQpXG4gICAgfSxcblxuICAgIHB1YmxpY0tleUNvbnZlcnQ6IGZ1bmN0aW9uIChwdWJsaWNLZXksIGNvbXByZXNzZWQpIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihwdWJsaWNLZXksIG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoMihwdWJsaWNLZXksIDMzLCA2NSwgbWVzc2FnZXMuRUNfUFVCTElDX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgY29tcHJlc3NlZCA9IGluaXRDb21wcmVzc2VkVmFsdWUoY29tcHJlc3NlZCwgdHJ1ZSlcblxuICAgICAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KHB1YmxpY0tleSwgY29tcHJlc3NlZClcbiAgICB9LFxuXG4gICAgcHVibGljS2V5VmVyaWZ5OiBmdW5jdGlvbiAocHVibGljS2V5KSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHVibGljS2V5LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VmVyaWZ5KHB1YmxpY0tleSlcbiAgICB9LFxuXG4gICAgcHVibGljS2V5VHdlYWtBZGQ6IGZ1bmN0aW9uIChwdWJsaWNLZXksIHR3ZWFrLCBjb21wcmVzc2VkKSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHVibGljS2V5LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aDIocHVibGljS2V5LCAzMywgNjUsIG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGFzc2VydC5pc0J1ZmZlcih0d2VhaywgbWVzc2FnZXMuVFdFQUtfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHR3ZWFrLCAzMiwgbWVzc2FnZXMuVFdFQUtfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGNvbXByZXNzZWQgPSBpbml0Q29tcHJlc3NlZFZhbHVlKGNvbXByZXNzZWQsIHRydWUpXG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VHdlYWtBZGQocHVibGljS2V5LCB0d2VhaywgY29tcHJlc3NlZClcbiAgICB9LFxuXG4gICAgcHVibGljS2V5VHdlYWtNdWw6IGZ1bmN0aW9uIChwdWJsaWNLZXksIHR3ZWFrLCBjb21wcmVzc2VkKSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHVibGljS2V5LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aDIocHVibGljS2V5LCAzMywgNjUsIG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGFzc2VydC5pc0J1ZmZlcih0d2VhaywgbWVzc2FnZXMuVFdFQUtfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHR3ZWFrLCAzMiwgbWVzc2FnZXMuVFdFQUtfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGNvbXByZXNzZWQgPSBpbml0Q29tcHJlc3NlZFZhbHVlKGNvbXByZXNzZWQsIHRydWUpXG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VHdlYWtNdWwocHVibGljS2V5LCB0d2VhaywgY29tcHJlc3NlZClcbiAgICB9LFxuXG4gICAgcHVibGljS2V5Q29tYmluZTogZnVuY3Rpb24gKHB1YmxpY0tleXMsIGNvbXByZXNzZWQpIHtcbiAgICAgIGFzc2VydC5pc0FycmF5KHB1YmxpY0tleXMsIG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlTX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0xlbmd0aEdUWmVybyhwdWJsaWNLZXlzLCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZU19MRU5HVEhfSU5WQUxJRClcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHVibGljS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBhc3NlcnQuaXNCdWZmZXIocHVibGljS2V5c1tpXSwgbWVzc2FnZXMuRUNfUFVCTElDX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aDIocHVibGljS2V5c1tpXSwgMzMsIDY1LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX0xFTkdUSF9JTlZBTElEKVxuICAgICAgfVxuXG4gICAgICBjb21wcmVzc2VkID0gaW5pdENvbXByZXNzZWRWYWx1ZShjb21wcmVzc2VkLCB0cnVlKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleUNvbWJpbmUocHVibGljS2V5cywgY29tcHJlc3NlZClcbiAgICB9LFxuXG4gICAgc2lnbmF0dXJlTm9ybWFsaXplOiBmdW5jdGlvbiAoc2lnbmF0dXJlKSB7XG4gICAgICBhc3NlcnQuaXNCdWZmZXIoc2lnbmF0dXJlLCBtZXNzYWdlcy5FQ0RTQV9TSUdOQVRVUkVfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHNpZ25hdHVyZSwgNjQsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgcmV0dXJuIHNlY3AyNTZrMS5zaWduYXR1cmVOb3JtYWxpemUoc2lnbmF0dXJlKVxuICAgIH0sXG5cbiAgICBzaWduYXR1cmVFeHBvcnQ6IGZ1bmN0aW9uIChzaWduYXR1cmUpIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihzaWduYXR1cmUsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgoc2lnbmF0dXJlLCA2NCwgbWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICB2YXIgc2lnT2JqID0gc2VjcDI1NmsxLnNpZ25hdHVyZUV4cG9ydChzaWduYXR1cmUpXG4gICAgICByZXR1cm4gZGVyLnNpZ25hdHVyZUV4cG9ydChzaWdPYmopXG4gICAgfSxcblxuICAgIHNpZ25hdHVyZUltcG9ydDogZnVuY3Rpb24gKHNpZykge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHNpZywgbWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0xlbmd0aEdUWmVybyhzaWcsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgdmFyIHNpZ09iaiA9IGRlci5zaWduYXR1cmVJbXBvcnQoc2lnKVxuICAgICAgaWYgKHNpZ09iaikgcmV0dXJuIHNlY3AyNTZrMS5zaWduYXR1cmVJbXBvcnQoc2lnT2JqKVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX1BBUlNFX0RFUl9GQUlMKVxuICAgIH0sXG5cbiAgICBzaWduYXR1cmVJbXBvcnRMYXg6IGZ1bmN0aW9uIChzaWcpIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihzaWcsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNMZW5ndGhHVFplcm8oc2lnLCBtZXNzYWdlcy5FQ0RTQV9TSUdOQVRVUkVfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIHZhciBzaWdPYmogPSBkZXIuc2lnbmF0dXJlSW1wb3J0TGF4KHNpZylcbiAgICAgIGlmIChzaWdPYmopIHJldHVybiBzZWNwMjU2azEuc2lnbmF0dXJlSW1wb3J0KHNpZ09iailcblxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9QQVJTRV9ERVJfRkFJTClcbiAgICB9LFxuXG4gICAgc2lnbjogZnVuY3Rpb24gKG1lc3NhZ2UsIHByaXZhdGVLZXksIG9wdGlvbnMpIHtcbiAgICAgIGFzc2VydC5pc0J1ZmZlcihtZXNzYWdlLCBtZXNzYWdlcy5NU0czMl9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgobWVzc2FnZSwgMzIsIG1lc3NhZ2VzLk1TRzMyX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHJpdmF0ZUtleSwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHByaXZhdGVLZXksIDMyLCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgdmFyIGRhdGEgPSBudWxsXG4gICAgICB2YXIgbm9uY2VmbiA9IG51bGxcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0LmlzT2JqZWN0KG9wdGlvbnMsIG1lc3NhZ2VzLk9QVElPTlNfVFlQRV9JTlZBTElEKVxuXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFzc2VydC5pc0J1ZmZlcihvcHRpb25zLmRhdGEsIG1lc3NhZ2VzLk9QVElPTlNfREFUQV9UWVBFX0lOVkFMSUQpXG4gICAgICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKG9wdGlvbnMuZGF0YSwgMzIsIG1lc3NhZ2VzLk9QVElPTlNfREFUQV9MRU5HVEhfSU5WQUxJRClcbiAgICAgICAgICBkYXRhID0gb3B0aW9ucy5kYXRhXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5ub25jZWZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhc3NlcnQuaXNGdW5jdGlvbihvcHRpb25zLm5vbmNlZm4sIG1lc3NhZ2VzLk9QVElPTlNfTk9OQ0VGTl9UWVBFX0lOVkFMSUQpXG4gICAgICAgICAgbm9uY2VmbiA9IG9wdGlvbnMubm9uY2VmblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEuc2lnbihtZXNzYWdlLCBwcml2YXRlS2V5LCBub25jZWZuLCBkYXRhKVxuICAgIH0sXG5cbiAgICB2ZXJpZnk6IGZ1bmN0aW9uIChtZXNzYWdlLCBzaWduYXR1cmUsIHB1YmxpY0tleSkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKG1lc3NhZ2UsIG1lc3NhZ2VzLk1TRzMyX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aChtZXNzYWdlLCAzMiwgbWVzc2FnZXMuTVNHMzJfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGFzc2VydC5pc0J1ZmZlcihzaWduYXR1cmUsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgoc2lnbmF0dXJlLCA2NCwgbWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHVibGljS2V5LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aDIocHVibGljS2V5LCAzMywgNjUsIG1lc3NhZ2VzLkVDX1BVQkxJQ19LRVlfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIHJldHVybiBzZWNwMjU2azEudmVyaWZ5KG1lc3NhZ2UsIHNpZ25hdHVyZSwgcHVibGljS2V5KVxuICAgIH0sXG5cbiAgICByZWNvdmVyOiBmdW5jdGlvbiAobWVzc2FnZSwgc2lnbmF0dXJlLCByZWNvdmVyeSwgY29tcHJlc3NlZCkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKG1lc3NhZ2UsIG1lc3NhZ2VzLk1TRzMyX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc0J1ZmZlckxlbmd0aChtZXNzYWdlLCAzMiwgbWVzc2FnZXMuTVNHMzJfTEVOR1RIX0lOVkFMSUQpXG5cbiAgICAgIGFzc2VydC5pc0J1ZmZlcihzaWduYXR1cmUsIG1lc3NhZ2VzLkVDRFNBX1NJR05BVFVSRV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgoc2lnbmF0dXJlLCA2NCwgbWVzc2FnZXMuRUNEU0FfU0lHTkFUVVJFX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNOdW1iZXIocmVjb3ZlcnksIG1lc3NhZ2VzLlJFQ09WRVJZX0lEX1RZUEVfSU5WQUxJRClcbiAgICAgIGFzc2VydC5pc051bWJlckluSW50ZXJ2YWwocmVjb3ZlcnksIC0xLCA0LCBtZXNzYWdlcy5SRUNPVkVSWV9JRF9WQUxVRV9JTlZBTElEKVxuXG4gICAgICBjb21wcmVzc2VkID0gaW5pdENvbXByZXNzZWRWYWx1ZShjb21wcmVzc2VkLCB0cnVlKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnJlY292ZXIobWVzc2FnZSwgc2lnbmF0dXJlLCByZWNvdmVyeSwgY29tcHJlc3NlZClcbiAgICB9LFxuXG4gICAgZWNkaDogZnVuY3Rpb24gKHB1YmxpY0tleSwgcHJpdmF0ZUtleSkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHB1YmxpY0tleSwgbWVzc2FnZXMuRUNfUFVCTElDX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgyKHB1YmxpY0tleSwgMzMsIDY1LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHJpdmF0ZUtleSwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHByaXZhdGVLZXksIDMyLCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgcmV0dXJuIHNlY3AyNTZrMS5lY2RoKHB1YmxpY0tleSwgcHJpdmF0ZUtleSlcbiAgICB9LFxuXG4gICAgZWNkaFVuc2FmZTogZnVuY3Rpb24gKHB1YmxpY0tleSwgcHJpdmF0ZUtleSwgY29tcHJlc3NlZCkge1xuICAgICAgYXNzZXJ0LmlzQnVmZmVyKHB1YmxpY0tleSwgbWVzc2FnZXMuRUNfUFVCTElDX0tFWV9UWVBFX0lOVkFMSUQpXG4gICAgICBhc3NlcnQuaXNCdWZmZXJMZW5ndGgyKHB1YmxpY0tleSwgMzMsIDY1LCBtZXNzYWdlcy5FQ19QVUJMSUNfS0VZX0xFTkdUSF9JTlZBTElEKVxuXG4gICAgICBhc3NlcnQuaXNCdWZmZXIocHJpdmF0ZUtleSwgbWVzc2FnZXMuRUNfUFJJVkFURV9LRVlfVFlQRV9JTlZBTElEKVxuICAgICAgYXNzZXJ0LmlzQnVmZmVyTGVuZ3RoKHByaXZhdGVLZXksIDMyLCBtZXNzYWdlcy5FQ19QUklWQVRFX0tFWV9MRU5HVEhfSU5WQUxJRClcblxuICAgICAgY29tcHJlc3NlZCA9IGluaXRDb21wcmVzc2VkVmFsdWUoY29tcHJlc3NlZCwgdHJ1ZSlcblxuICAgICAgcmV0dXJuIHNlY3AyNTZrMS5lY2RoVW5zYWZlKHB1YmxpY0tleSwgcHJpdmF0ZUtleSwgY29tcHJlc3NlZClcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuY2xhc3MgTmV0d29yayB7XG4gICAgY29uc3RydWN0b3IoX3Byb3RvY29sID0gJ2h0dHBzJywgX2hvc3QgPSAnJywgX3BvcnQgPSAwLCBjaGFpbklkID0gJycsIGJsb2NrY2hhaW4gPSAnZW9zJykge1xuICAgICAgICB0aGlzLnByb3RvY29sID0gX3Byb3RvY29sO1xuICAgICAgICB0aGlzLmhvc3QgPSBfaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gX3BvcnQ7XG4gICAgICAgIHRoaXMuY2hhaW5JZCA9IGNoYWluSWQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5ibG9ja2NoYWluID0gYmxvY2tjaGFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTmV0d29yaygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tSnNvbihqc29uKSB7XG4gICAgICAgIGNvbnN0IHAgPSBPYmplY3QuYXNzaWduKE5ldHdvcmsucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgICAgIHAuY2hhaW5JZCA9IHAuY2hhaW5JZCA/IHAuY2hhaW5JZC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGhvc3Rwb3J0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5ob3N0fSR7dGhpcy5wb3J0ID8gJzonIDogJyd9JHt0aGlzLnBvcnR9YDtcbiAgICB9XG4gICAgZnVsbGhvc3QoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sfTovLyR7dGhpcy5ob3N0fSR7dGhpcy5wb3J0ID8gJzonIDogJyd9JHt0aGlzLnBvcnR9YDtcbiAgICB9XG4gICAgaWQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmJsb2NrY2hhaW59Ojoke3RoaXMuY2hhaW5JZH1gO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE5ldHdvcms7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwbmEgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8vIHVuZG9jdW1lbnRlZCBjYigpIEFQSSwgbmVlZGVkIGZvciBjb3JlLCBub3QgZm9yIHB1YmxpYyBBUElcbmZ1bmN0aW9uIGRlc3Ryb3koZXJyLCBjYikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciByZWFkYWJsZURlc3Ryb3llZCA9IHRoaXMuX3JlYWRhYmxlU3RhdGUgJiYgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIHZhciB3cml0YWJsZURlc3Ryb3llZCA9IHRoaXMuX3dyaXRhYmxlU3RhdGUgJiYgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG5cbiAgaWYgKHJlYWRhYmxlRGVzdHJveWVkIHx8IHdyaXRhYmxlRGVzdHJveWVkKSB7XG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihlcnIpO1xuICAgIH0gZWxzZSBpZiAoZXJyICYmICghdGhpcy5fd3JpdGFibGVTdGF0ZSB8fCAhdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQpKSB7XG4gICAgICBwbmEubmV4dFRpY2soZW1pdEVycm9yTlQsIHRoaXMsIGVycik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gd2Ugc2V0IGRlc3Ryb3llZCB0byB0cnVlIGJlZm9yZSBmaXJpbmcgZXJyb3IgY2FsbGJhY2tzIGluIG9yZGVyXG4gIC8vIHRvIG1ha2UgaXQgcmUtZW50cmFuY2Ugc2FmZSBpbiBjYXNlIGRlc3Ryb3koKSBpcyBjYWxsZWQgd2l0aGluIGNhbGxiYWNrc1xuXG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gaWYgdGhpcyBpcyBhIGR1cGxleCBzdHJlYW0gbWFyayB0aGUgd3JpdGFibGUgcGFydCBhcyBkZXN0cm95ZWQgYXMgd2VsbFxuICBpZiAodGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2Rlc3Ryb3koZXJyIHx8IG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoIWNiICYmIGVycikge1xuICAgICAgcG5hLm5leHRUaWNrKGVtaXRFcnJvck5ULCBfdGhpcywgZXJyKTtcbiAgICAgIGlmIChfdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICBfdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gdW5kZXN0cm95KCkge1xuICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRFcnJvck5UKHNlbGYsIGVycikge1xuICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gIHVuZGVzdHJveTogdW5kZXN0cm95XG59OyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93LmNyeXB0bzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRlJBR19UWVBFUyA9IGV4cG9ydHMuUmVwVHlwZSA9IGV4cG9ydHMuRnJhZ21lbnQgPSBleHBvcnRzLlJlcHV0YXRpb24gPSBleHBvcnRzLlJlcHV0YWJsZSA9IHVuZGVmaW5lZDtcblxudmFyIF9lb3MgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2VvcycpO1xuXG52YXIgZW9zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2Vvcyk7XG5cbnZhciBfaWRlbnRpdHkgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkZW50aXR5Jyk7XG5cbnZhciBfaWRlbnRpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRlbnRpdHkpO1xuXG52YXIgX3JlcHV0YXRpb24gPSByZXF1aXJlKCcuL3NlcnZpY2VzL3JlcHV0YXRpb24nKTtcblxudmFyIF9yZXB1dGF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlcHV0YXRpb24pO1xuXG52YXIgX2JvbmQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2JvbmQnKTtcblxudmFyIF9ib25kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JvbmQpO1xuXG52YXIgX1JlcHV0YWJsZSA9IHJlcXVpcmUoJy4vbW9kZWxzL1JlcHV0YWJsZScpO1xuXG52YXIgX1JlcHV0YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9SZXB1dGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5jb25zdCBGUkFHX1RZUEVTID0ge1xuICAgIEJMT0NLQ0hBSU5fQUREUjogJ2FjYycsXG4gICAgQUNUSU9OOiAnYWN0JyxcbiAgICBBUFBMSUNBVElPTjogJ2FwcCcsXG4gICAgSURFTlRJVFk6ICdpZCcsXG4gICAgT1RIRVI6ICdldGMnXG59O1xuXG5leHBvcnRzLlJlcHV0YWJsZSA9IF9SZXB1dGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlJlcHV0YXRpb24gPSBfUmVwdXRhYmxlLlJlcHV0YXRpb247XG5leHBvcnRzLkZyYWdtZW50ID0gX1JlcHV0YWJsZS5GcmFnbWVudDtcbmV4cG9ydHMuUmVwVHlwZSA9IF9SZXB1dGFibGUuUmVwVHlwZTtcbmV4cG9ydHMuRlJBR19UWVBFUyA9IEZSQUdfVFlQRVM7XG5cblxuY2xhc3MgUklETCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pZGVudGl0eSA9IG5ldyBfaWRlbnRpdHkyLmRlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yZXB1dGF0aW9uID0gbmV3IF9yZXB1dGF0aW9uMi5kZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuYm9uZCA9IG5ldyBfYm9uZDIuZGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKipcclxuICAgICAqIEluaXRpYWxpemVzIFJJREwgZm9yIGEgc3BlY2lmaWVkIGFjY291bnQuIENhbiBiZSByZS1pbml0aWFsaXplZCBhc1xyXG4gICAgICogbWFueSB0aW1lcyBhcyBuZWVkZWQuXHJcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgKiBDYW4gYmUgaW5pdGlhbGl6ZWQgYXMgYSByZWFkZXIgb25seSBieSBwYXNzaW5nIG51bGxzIGludG8gdGhlXHJcbiAgICAgKiBhY2NvdW50IGFuZCBzaWduUHJvdmlkZXIgcGFyYW1ldGVycy5cclxuICAgICAqIEBwYXJhbSBuZXR3b3JrXHJcbiAgICAgKiBAcGFyYW0gYWNjb3VudFxyXG4gICAgICogQHBhcmFtIHNpZ25Qcm92aWRlclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgKi9cbiAgICBpbml0KG5ldHdvcmssIGFjY291bnQgPSBudWxsLCBzaWduUHJvdmlkZXIgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBlb3MuaW5pdChuZXR3b3JrLCBhY2NvdW50LCBzaWduUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGNhbkNvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiBlb3MuY2FuQ29ubmVjdCgpO1xuICAgIH1cblxufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgUklETCgpOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0XHRcdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9lb3MgPSByZXF1aXJlKCcuL2VvcycpO1xuXG52YXIgZW9zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2Vvcyk7XG5cbnZhciBfSWRlbnRpdHkgPSByZXF1aXJlKCcuLi9tb2RlbHMvSWRlbnRpdHknKTtcblxudmFyIF9JZGVudGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JZGVudGl0eSk7XG5cbnZhciBfUmVwdXRhYmxlID0gcmVxdWlyZSgnLi4vbW9kZWxzL1JlcHV0YWJsZScpO1xuXG52YXIgX2hlbHBlcnMgPSByZXF1aXJlKCcuLi91dGlsL2hlbHBlcnMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHsgdHJ5IHsgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpOyB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlOyB9IGNhdGNoIChlcnJvcikgeyByZWplY3QoZXJyb3IpOyByZXR1cm47IH0gaWYgKGluZm8uZG9uZSkgeyByZXNvbHZlKHZhbHVlKTsgfSBlbHNlIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHN0ZXAoXCJ0aHJvd1wiLCBlcnIpOyB9KTsgfSB9IHJldHVybiBzdGVwKFwibmV4dFwiKTsgfSk7IH07IH1cblxuY29uc3QgZ2V0SWRlbnRpdHkgPSAoKCkgPT4ge1xuXHRcdFx0XHR2YXIgX3JlZiA9IF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAodXNlcm5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geWllbGQgZW9zLnJlYWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGU6ICdpZHMnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5X3R5cGU6ICdpNjQnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5kZXhfcG9zaXRpb246IDMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbmRleDogKDAsIF9oZWxwZXJzLmZpbmdlcnByaW50ZWQpKHVzZXJuYW1lKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpbWl0OiAxLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IF9JZGVudGl0eTIuZGVmYXVsdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpcnN0T25seTogdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gZ2V0SWRlbnRpdHkoX3gpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xufSkoKTtcblxuY2xhc3MgSWRlbnRpdHlTZXJ2aWNlIHtcblxuXHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBheW1lbnRTeW1ib2wgPSAnRU9TJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldFN5bWJvbChzeW1ib2wpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBheW1lbnRTeW1ib2wgPSBzeW1ib2w7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFsaWROYW1lKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKC9eW2EtekEtWjAtOV8tXXszLDIwfSQvLnRlc3QobmFtZSlcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqKlxyXG4gICAgICogR2V0cyBhbiBpZGVudGl0eSBiYXNlZCBvbiBhIHVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG4gICAgICovXG5cdFx0XHRcdGdldCh1c2VybmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldElkZW50aXR5KHVzZXJuYW1lKTtcblx0XHRcdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Z2V0QnlJZChpZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGU6ICdpZHMnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbmRleDogaWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpbWl0OiAxLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogX0lkZW50aXR5Mi5kZWZhdWx0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaXJzdE9ubHk6IHRydWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRnZXRCeUFjY291bnQoYWNjb3VudE5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB5aWVsZCBlb3MucmVhZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlOiAnaWRzJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5X3R5cGU6ICdpNjQnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbmRleF9wb3NpdGlvbjogMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5kZXg6IGVvcy5lbmNvZGVOYW1lKGFjY291bnROYW1lKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gbm9ib3VuZDp0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW1pdDogMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IF9JZGVudGl0eTIuZGVmYXVsdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm93c09ubHk6IHRydWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKioqXHJcbiAgICAgKiBQYXlzIGZvciBhbmQgaWRlbnRpZmllcyBhbiBpZGVudGl0eVxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuICAgICAqL1xuXHRcdFx0XHRwYXlBbmRJZGVudGlmeSh1c2VybmFtZSwga2V5KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVvcy53cml0ZXIudHJhbnNhY3Rpb24oWydlb3Npby50b2tlbicsICdyaWRscmlkbHJpZGwnXSwgZnVuY3Rpb24gKGNvbnRyYWN0cykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250cmFjdHMuZW9zaW9fdG9rZW4udHJhbnNmZXIoZW9zLmFjY291bnQubmFtZSwgJ3JpZGxyaWRscmlkbCcsIGAxLjAwMDAgJHtfdGhpcy5wYXltZW50U3ltYm9sfWAsICcnLCBlb3Mub3B0aW9ucyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyYWN0cy5yaWRscmlkbHJpZGwuaWRlbnRpZnkoZW9zLmFjY291bnQubmFtZSwgdXNlcm5hbWUsIGtleSwgZW9zLm9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKipcclxuICAgICAqIENoYW5nZXMgdGhlIGlkZW50aXR5IGtleVxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUIHwgYm9vbGVhbj59XHJcbiAgICAgKi9cblx0XHRcdFx0Y2hhbmdla2V5KHVzZXJuYW1lLCBrZXkpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVvcy5jb250cmFjdC5jaGFuZ2VrZXkodXNlcm5hbWUsIGtleSwgZW9zLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLmdldCh1c2VybmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKioqXHJcbiAgICAgKiBDaGFuZ2VzIHRoZSBpZGVudGl0eSBhY2NvdW50XHJcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWVcclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQgfCBib29sZWFuPn1cclxuICAgICAqL1xuXHRcdFx0XHRjaGFuZ2VhY2ModXNlcm5hbWUsIG5ld0FjY291bnROYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlb3MuY29udHJhY3QuY2hhbmdlYWNjKHVzZXJuYW1lLCBuZXdBY2NvdW50TmFtZSwgZW9zLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmdldCh1c2VybmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKioqXHJcbiAgICAgKiBMb2FkcyB1cCBSSURMIHRva2VucyBvbiB0aGUgaWRlbnRpdHlcclxuICAgICAqIEBwYXJhbSB1c2VybmFtZVxyXG4gICAgICogQHBhcmFtIGFtb3VudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VCB8IGJvb2xlYW4+fVxyXG4gICAgICovXG5cdFx0XHRcdGxvYWR0b2tlbnModXNlcm5hbWUsIGFtb3VudCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbW91bnQgPSBwYXJzZUZsb2F0KGFtb3VudC50b1N0cmluZygpLnNwbGl0KCcgJylbMF0pLnRvRml4ZWQoNCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoYW1vdW50IDw9IDApIHRocm93IG5ldyBFcnJvcihcIkFtb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwXCIpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZW9zLndyaXRlci50cmFuc2FjdGlvbihbX2Vvcy50b2tlbkNvZGUsIF9lb3MucmlkbENvZGVdLCBmdW5jdGlvbiAoY29udHJhY3RzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyYWN0c1tfZW9zLnRva2VuQ29kZV0udHJhbnNmZXIoZW9zLmFjY291bnQubmFtZSwgX2Vvcy5yaWRsQ29kZSwgYCR7YW1vdW50fSBSSURMYCwgJycsIGVvcy5vcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udHJhY3RzW19lb3MucmlkbENvZGVdLmxvYWR0b2tlbnModXNlcm5hbWUsIGAke2Ftb3VudH0gUklETGAsIGVvcy5vcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM0LmdldCh1c2VybmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKioqXHJcbiAgICAgKiBDbGFpbXMgYSByZXNlcnZlZCBpZGVudGl0eVxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gc2lnbmF0dXJlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUIHwgdm9pZD59XHJcbiAgICAgKi9cblx0XHRcdFx0Y2xhaW0odXNlcm5hbWUsIGtleSwgc2lnbmF0dXJlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF90aGlzNSA9IHRoaXM7XG5cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlb3MuY29udHJhY3QuY2xhaW0oZW9zLmFjY291bnQubmFtZSwgdXNlcm5hbWUsIGtleSwgc2lnbmF0dXJlLCBlb3Mub3B0aW9ucykudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczUuZ2V0KHVzZXJuYW1lKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZGVudGl0eUJhbGFuY2UodXNlcm5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBnZXRJZGVudGl0eSh1c2VybmFtZSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMudG9rZW5zO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2NvdW50QmFsYW5jZShuYW1lLCBhc0Zsb2F0ID0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB5aWVsZCBlb3MucmVhZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRva2VuOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJsZTogJ2FjY291bnRzJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2NvcGU6ICgwLCBfZW9zLmVuY29kZU5hbWUpKG5hbWUpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW1pdDogMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zmlyc3RPbmx5OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHF1YW50aXR5ID0geCA/IHguYmFsYW5jZSA6ICcwLjAwMDAgUklETCc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhc0Zsb2F0ID8gcGFyc2VGbG9hdChxdWFudGl0eS5zcGxpdCgnICcpWzBdKSA6IHF1YW50aXR5O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV4aXN0cyhuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF90aGlzNiA9IHRoaXM7XG5cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB5aWVsZCBfdGhpczYuZ2V0KG5hbWUpLnRoZW4oZnVuY3Rpb24gKHgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICEheDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRnZXRUb3B1cCh1c2VybmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHlpZWxkIGVvcy5yZWFkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFibGU6ICd0b3B1cHMnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbmRleDogKDAsIF9oZWxwZXJzLmZpbmdlcnByaW50ZWQpKHVzZXJuYW1lKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGltaXQ6IDEsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpcnN0T25seTogdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSWRlbnRpdHlTZXJ2aWNlOyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbmZ1bmN0aW9uIGNvcHlCdWZmZXIoc3JjLCB0YXJnZXQsIG9mZnNldCkge1xuICBzcmMuY29weSh0YXJnZXQsIG9mZnNldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCdWZmZXJMaXN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdWZmZXJMaXN0KTtcblxuICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gICAgdGhpcy50YWlsID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2KSB7XG4gICAgdmFyIGVudHJ5ID0geyBkYXRhOiB2LCBuZXh0OiBudWxsIH07XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkgdGhpcy50YWlsLm5leHQgPSBlbnRyeTtlbHNlIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgICsrdGhpcy5sZW5ndGg7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQodikge1xuICAgIHZhciBlbnRyeSA9IHsgZGF0YTogdiwgbmV4dDogdGhpcy5oZWFkIH07XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgICArK3RoaXMubGVuZ3RoO1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgdmFyIHJldCA9IHRoaXMuaGVhZC5kYXRhO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtlbHNlIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXh0O1xuICAgIC0tdGhpcy5sZW5ndGg7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiBqb2luKHMpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICB2YXIgcmV0ID0gJycgKyBwLmRhdGE7XG4gICAgd2hpbGUgKHAgPSBwLm5leHQpIHtcbiAgICAgIHJldCArPSBzICsgcC5kYXRhO1xuICAgIH1yZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdChuKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRoaXMuaGVhZC5kYXRhO1xuICAgIHZhciByZXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobiA+Pj4gMCk7XG4gICAgdmFyIHAgPSB0aGlzLmhlYWQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChwKSB7XG4gICAgICBjb3B5QnVmZmVyKHAuZGF0YSwgcmV0LCBpKTtcbiAgICAgIGkgKz0gcC5kYXRhLmxlbmd0aDtcbiAgICAgIHAgPSBwLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgcmV0dXJuIEJ1ZmZlckxpc3Q7XG59KCk7XG5cbmlmICh1dGlsICYmIHV0aWwuaW5zcGVjdCAmJiB1dGlsLmluc3BlY3QuY3VzdG9tKSB7XG4gIG1vZHVsZS5leHBvcnRzLnByb3RvdHlwZVt1dGlsLmluc3BlY3QuY3VzdG9tXSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2JqID0gdXRpbC5pbnNwZWN0KHsgbGVuZ3RoOiB0aGlzLmxlbmd0aCB9KTtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyAnICsgb2JqO1xuICB9O1xufSIsInZhciByYW5kb21IZXggPSBmdW5jdGlvbihzaXplLCBjYWxsYmFjaykge1xuICAgIHZhciBjcnlwdG8gPSByZXF1aXJlKCcuL2NyeXB0by5qcycpO1xuICAgIHZhciBpc0NhbGxiYWNrID0gKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyk7XG5cbiAgICBcbiAgICBpZiAoc2l6ZSA+IDY1NTM2KSB7XG4gICAgICAgIGlmKGlzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcignUmVxdWVzdGVkIHRvbyBtYW55IHJhbmRvbSBieXRlcy4nKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3RlZCB0b28gbWFueSByYW5kb20gYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBpcyBub2RlXG4gICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21CeXRlcykge1xuXG4gICAgICAgIGlmKGlzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNyeXB0by5yYW5kb21CeXRlcyhzaXplLCBmdW5jdGlvbihlcnIsIHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYoIWVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnMHgnKyByZXN1bHQudG9TdHJpbmcoJ2hleCcpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnMHgnKyBjcnlwdG8ucmFuZG9tQnl0ZXMoc2l6ZSkudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgICB9XG5cbiAgICAvLyBpcyBicm93c2VyXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNyeXB0b0xpYjtcblxuICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNyeXB0b0xpYiA9IGNyeXB0bztcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNyeXB0b0xpYiA9IG1zQ3J5cHRvO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNyeXB0b0xpYiAmJiBjcnlwdG9MaWIuZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgICAgICB2YXIgcmFuZG9tQnl0ZXMgPSBjcnlwdG9MaWIuZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9ICcweCcrIEFycmF5LmZyb20ocmFuZG9tQnl0ZXMpLm1hcChmdW5jdGlvbihhcnIpeyByZXR1cm4gYXJyLnRvU3RyaW5nKDE2KTsgfSkuam9pbignJyk7XG5cbiAgICAgICAgICAgIGlmKGlzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAvLyBub3QgY3J5cHRvIG9iamVjdFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdObyBcImNyeXB0b1wiIG9iamVjdCBhdmFpbGFibGUuIFRoaXMgQnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBnZW5lcmF0aW5nIHNlY3VyZSByYW5kb20gYnl0ZXMuJyk7XG5cbiAgICAgICAgICAgIGlmKGlzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tSGV4O1xuIiwiLyohXG4gKiBGYXN0IFwiYXN5bmNcIiBzY3J5cHQgaW1wbGVtZW50YXRpb24gaW4gSmF2YVNjcmlwdC5cbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IERtaXRyeSBDaGVzdG55a2ggfCBCU0QgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2RjaGVzdC9zY3J5cHQtYXN5bmMtanNcbiAqL1xuXG4vKipcbiAqIHNjcnlwdChwYXNzd29yZCwgc2FsdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gKlxuICogd2hlcmVcbiAqXG4gKiBwYXNzd29yZCBhbmQgc2FsdCBhcmUgc3RyaW5ncyBvciBhcnJheXMgb2YgYnl0ZXMgKEFycmF5IG9mIFVpbnQ4QXJyYXkpXG4gKiBvcHRpb25zIGlzXG4gKlxuICoge1xuICogICAgTjogICAgICAvLyBDUFUvbWVtb3J5IGNvc3QgcGFyYW1ldGVyLCBtdXN0IGJlIHBvd2VyIG9mIHR3b1xuICogICAgICAgICAgICAvLyAoYWx0ZXJuYXRpdmVseSwgeW91IGNhbiBzcGVjaWZ5IGxvZ04pXG4gKiAgICByOiAgICAgIC8vIGJsb2NrIHNpemVcbiAqICAgIHA6ICAgICAgLy8gcGFyYWxsZWxpemF0aW9uIHBhcmFtZXRlclxuICogICAgZGtMZW46ICAvLyBsZW5ndGggb2YgZGVyaXZlZCBrZXksIGRlZmF1bHQgPSAzMlxuICogICAgZW5jb2Rpbmc6IC8vIG9wdGlvbmFsIGVuY29kaW5nOlxuICogICAgICAgICAgICAgICAgICAgIFwiYmFzZTY0XCIgLSBzdGFuZGFyZCBCYXNlNjQgZW5jb2RpbmdcbiAqICAgICAgICAgICAgICAgICAgICBcImhleFwiIOKAlCBoZXggZW5jb2RpbmcsXG4gKiAgICAgICAgICAgICAgICAgICAgXCJiaW5hcnlcIiDigJQgVWludDhBcnJheSxcbiAqICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQvbnVsbCAtIEFycmF5IG9mIGJ5dGVzXG4gKiAgICBpbnRlcnJ1cHRTdGVwOiAvLyBvcHRpb25hbCwgc3RlcHMgdG8gc3BsaXQgY2FsY3VsYXRpb25zIChkZWZhdWx0IGlzIDApXG4gKiB9XG4gKlxuICogRGVyaXZlcyBhIGtleSBmcm9tIHBhc3N3b3JkIGFuZCBzYWx0IGFuZCBjYWxscyBjYWxsYmFja1xuICogd2l0aCBkZXJpdmVkIGtleSBhcyB0aGUgb25seSBhcmd1bWVudC5cbiAqXG4gKiBDYWxjdWxhdGlvbnMgYXJlIGludGVycnVwdGVkIHdpdGggc2V0SW1tZWRpYXRlIChvciB6ZXJvIHNldFRpbWVvdXQpIGF0IHRoZVxuICogZ2l2ZW4gaW50ZXJydXB0U3RlcHMgdG8gYXZvaWQgZnJlZXppbmcgdGhlIGJyb3dzZXIuIElmIGl0J3MgdW5kZWZpbmVkIG9yIHplcm8sXG4gKiB0aGUgY2FsbGJhY2sgaXMgY2FsbGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBjYWxjdWxhdGlvbiwgYXZvaWRpbmcgc2V0SW1tZWRpYXRlLlxuICpcbiAqIExlZ2FjeSB3YXkgKG9ubHkgc3VwcG9ydHMgcCA9IDEpIHRvIGNhbGwgdGhpcyBmdW5jdGlvbiBpczpcbiAqXG4gKiBzY3J5cHQocGFzc3dvcmQsIHNhbHQsIGxvZ04sIHIsIGRrTGVuLCBbaW50ZXJydXB0U3RlcF0sIGNhbGxiYWNrLCBbZW5jb2RpbmddKVxuICpcbiAqIEluIGxlZ2FjeSBBUEksIGlmIGludGVycnVwdFN0ZXAgaXMgbm90IGdpdmVuLCBpdCBkZWZhdWx0cyB0byAxMDAwLlxuICogUGFzcyAwIHRvIGhhdmUgY2FsbGJhY2sgY2FsbGVkIGltbWVkaWF0ZWx5LlxuICpcbiAqL1xuZnVuY3Rpb24gc2NyeXB0KHBhc3N3b3JkLCBzYWx0LCBsb2dOLCByLCBka0xlbiwgaW50ZXJydXB0U3RlcCwgY2FsbGJhY2ssIGVuY29kaW5nKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBTSEEyNTYobSkge1xuICAgIC8qKiBAY29uc3QgKi8gdmFyIEsgPSBbXG4gICAgICAweDQyOGEyZjk4LCAweDcxMzc0NDkxLCAweGI1YzBmYmNmLCAweGU5YjVkYmE1LCAweDM5NTZjMjViLFxuICAgICAgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMHhhYjFjNWVkNSwgMHhkODA3YWE5OCwgMHgxMjgzNWIwMSxcbiAgICAgIDB4MjQzMTg1YmUsIDB4NTUwYzdkYzMsIDB4NzJiZTVkNzQsIDB4ODBkZWIxZmUsIDB4OWJkYzA2YTcsXG4gICAgICAweGMxOWJmMTc0LCAweGU0OWI2OWMxLCAweGVmYmU0Nzg2LCAweDBmYzE5ZGM2LCAweDI0MGNhMWNjLFxuICAgICAgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSwgMHg5ODNlNTE1MixcbiAgICAgIDB4YTgzMWM2NmQsIDB4YjAwMzI3YzgsIDB4YmY1OTdmYzcsIDB4YzZlMDBiZjMsIDB4ZDVhNzkxNDcsXG4gICAgICAweDA2Y2E2MzUxLCAweDE0MjkyOTY3LCAweDI3YjcwYTg1LCAweDJlMWIyMTM4LCAweDRkMmM2ZGZjLFxuICAgICAgMHg1MzM4MGQxMywgMHg2NTBhNzM1NCwgMHg3NjZhMGFiYiwgMHg4MWMyYzkyZSwgMHg5MjcyMmM4NSxcbiAgICAgIDB4YTJiZmU4YTEsIDB4YTgxYTY2NGIsIDB4YzI0YjhiNzAsIDB4Yzc2YzUxYTMsIDB4ZDE5MmU4MTksXG4gICAgICAweGQ2OTkwNjI0LCAweGY0MGUzNTg1LCAweDEwNmFhMDcwLCAweDE5YTRjMTE2LCAweDFlMzc2YzA4LFxuICAgICAgMHgyNzQ4Nzc0YywgMHgzNGIwYmNiNSwgMHgzOTFjMGNiMywgMHg0ZWQ4YWE0YSwgMHg1YjljY2E0ZixcbiAgICAgIDB4NjgyZTZmZjMsIDB4NzQ4ZjgyZWUsIDB4NzhhNTYzNmYsIDB4ODRjODc4MTQsIDB4OGNjNzAyMDgsXG4gICAgICAweDkwYmVmZmZhLCAweGE0NTA2Y2ViLCAweGJlZjlhM2Y3LCAweGM2NzE3OGYyXG4gICAgXTtcblxuICAgIHZhciBoMCA9IDB4NmEwOWU2NjcsIGgxID0gMHhiYjY3YWU4NSwgaDIgPSAweDNjNmVmMzcyLCBoMyA9IDB4YTU0ZmY1M2EsXG4gICAgICAgIGg0ID0gMHg1MTBlNTI3ZiwgaDUgPSAweDliMDU2ODhjLCBoNiA9IDB4MWY4M2Q5YWIsIGg3ID0gMHg1YmUwY2QxOSxcbiAgICAgICAgdyA9IG5ldyBBcnJheSg2NCk7XG5cbiAgICBmdW5jdGlvbiBibG9ja3MocCkge1xuICAgICAgdmFyIG9mZiA9IDAsIGxlbiA9IHAubGVuZ3RoO1xuICAgICAgd2hpbGUgKGxlbiA+PSA2NCkge1xuICAgICAgICB2YXIgYSA9IGgwLCBiID0gaDEsIGMgPSBoMiwgZCA9IGgzLCBlID0gaDQsIGYgPSBoNSwgZyA9IGg2LCBoID0gaDcsXG4gICAgICAgICAgICB1LCBpLCBqLCB0MSwgdDI7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICBqID0gb2ZmICsgaSo0O1xuICAgICAgICAgIHdbaV0gPSAoKHBbal0gJiAweGZmKTw8MjQpIHwgKChwW2orMV0gJiAweGZmKTw8MTYpIHxcbiAgICAgICAgICAgICAgICAgKChwW2orMl0gJiAweGZmKTw8OCkgfCAocFtqKzNdICYgMHhmZik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAxNjsgaSA8IDY0OyBpKyspIHtcbiAgICAgICAgICB1ID0gd1tpLTJdO1xuICAgICAgICAgIHQxID0gKCh1Pj4+MTcpIHwgKHU8PCgzMi0xNykpKSBeICgodT4+PjE5KSB8ICh1PDwoMzItMTkpKSkgXiAodT4+PjEwKTtcblxuICAgICAgICAgIHUgPSB3W2ktMTVdO1xuICAgICAgICAgIHQyID0gKCh1Pj4+NykgfCAodTw8KDMyLTcpKSkgXiAoKHU+Pj4xOCkgfCAodTw8KDMyLTE4KSkpIF4gKHU+Pj4zKTtcblxuICAgICAgICAgIHdbaV0gPSAoKCh0MSArIHdbaS03XSkgfCAwKSArICgodDIgKyB3W2ktMTZdKSB8IDApKSB8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgICAgIHQxID0gKCgoKCgoZT4+PjYpIHwgKGU8PCgzMi02KSkpIF4gKChlPj4+MTEpIHwgKGU8PCgzMi0xMSkpKSBeXG4gICAgICAgICAgICAgICAoKGU+Pj4yNSkgfCAoZTw8KDMyLTI1KSkpKSArICgoZSAmIGYpIF4gKH5lICYgZykpKSB8IDApICtcbiAgICAgICAgICAgICAgICgoaCArICgoS1tpXSArIHdbaV0pIHwgMCkpIHwgMCkpIHwgMDtcblxuICAgICAgICAgIHQyID0gKCgoKGE+Pj4yKSB8IChhPDwoMzItMikpKSBeICgoYT4+PjEzKSB8IChhPDwoMzItMTMpKSkgXlxuICAgICAgICAgICAgICAgKChhPj4+MjIpIHwgKGE8PCgzMi0yMikpKSkgKyAoKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpKSkgfCAwO1xuXG4gICAgICAgICAgaCA9IGc7XG4gICAgICAgICAgZyA9IGY7XG4gICAgICAgICAgZiA9IGU7XG4gICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcbiAgICAgICAgICBkID0gYztcbiAgICAgICAgICBjID0gYjtcbiAgICAgICAgICBiID0gYTtcbiAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGgwID0gKGgwICsgYSkgfCAwO1xuICAgICAgICBoMSA9IChoMSArIGIpIHwgMDtcbiAgICAgICAgaDIgPSAoaDIgKyBjKSB8IDA7XG4gICAgICAgIGgzID0gKGgzICsgZCkgfCAwO1xuICAgICAgICBoNCA9IChoNCArIGUpIHwgMDtcbiAgICAgICAgaDUgPSAoaDUgKyBmKSB8IDA7XG4gICAgICAgIGg2ID0gKGg2ICsgZykgfCAwO1xuICAgICAgICBoNyA9IChoNyArIGgpIHwgMDtcblxuICAgICAgICBvZmYgKz0gNjQ7XG4gICAgICAgIGxlbiAtPSA2NDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBibG9ja3MobSk7XG5cbiAgICB2YXIgaSwgYnl0ZXNMZWZ0ID0gbS5sZW5ndGggJSA2NCxcbiAgICAgICAgYml0TGVuSGkgPSAobS5sZW5ndGggLyAweDIwMDAwMDAwKSB8IDAsXG4gICAgICAgIGJpdExlbkxvID0gbS5sZW5ndGggPDwgMyxcbiAgICAgICAgbnVtWmVyb3MgPSAoYnl0ZXNMZWZ0IDwgNTYpID8gNTYgOiAxMjAsXG4gICAgICAgIHAgPSBtLnNsaWNlKG0ubGVuZ3RoIC0gYnl0ZXNMZWZ0LCBtLmxlbmd0aCk7XG5cbiAgICBwLnB1c2goMHg4MCk7XG4gICAgZm9yIChpID0gYnl0ZXNMZWZ0ICsgMTsgaSA8IG51bVplcm9zOyBpKyspIHAucHVzaCgwKTtcbiAgICBwLnB1c2goKGJpdExlbkhpPj4+MjQpICYgMHhmZik7XG4gICAgcC5wdXNoKChiaXRMZW5IaT4+PjE2KSAmIDB4ZmYpO1xuICAgIHAucHVzaCgoYml0TGVuSGk+Pj44KSAgJiAweGZmKTtcbiAgICBwLnB1c2goKGJpdExlbkhpPj4+MCkgICYgMHhmZik7XG4gICAgcC5wdXNoKChiaXRMZW5Mbz4+PjI0KSAmIDB4ZmYpO1xuICAgIHAucHVzaCgoYml0TGVuTG8+Pj4xNikgJiAweGZmKTtcbiAgICBwLnB1c2goKGJpdExlbkxvPj4+OCkgICYgMHhmZik7XG4gICAgcC5wdXNoKChiaXRMZW5Mbz4+PjApICAmIDB4ZmYpO1xuXG4gICAgYmxvY2tzKHApO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIChoMD4+PjI0KSAmIDB4ZmYsIChoMD4+PjE2KSAmIDB4ZmYsIChoMD4+PjgpICYgMHhmZiwgKGgwPj4+MCkgJiAweGZmLFxuICAgICAgKGgxPj4+MjQpICYgMHhmZiwgKGgxPj4+MTYpICYgMHhmZiwgKGgxPj4+OCkgJiAweGZmLCAoaDE+Pj4wKSAmIDB4ZmYsXG4gICAgICAoaDI+Pj4yNCkgJiAweGZmLCAoaDI+Pj4xNikgJiAweGZmLCAoaDI+Pj44KSAmIDB4ZmYsIChoMj4+PjApICYgMHhmZixcbiAgICAgIChoMz4+PjI0KSAmIDB4ZmYsIChoMz4+PjE2KSAmIDB4ZmYsIChoMz4+PjgpICYgMHhmZiwgKGgzPj4+MCkgJiAweGZmLFxuICAgICAgKGg0Pj4+MjQpICYgMHhmZiwgKGg0Pj4+MTYpICYgMHhmZiwgKGg0Pj4+OCkgJiAweGZmLCAoaDQ+Pj4wKSAmIDB4ZmYsXG4gICAgICAoaDU+Pj4yNCkgJiAweGZmLCAoaDU+Pj4xNikgJiAweGZmLCAoaDU+Pj44KSAmIDB4ZmYsIChoNT4+PjApICYgMHhmZixcbiAgICAgIChoNj4+PjI0KSAmIDB4ZmYsIChoNj4+PjE2KSAmIDB4ZmYsIChoNj4+PjgpICYgMHhmZiwgKGg2Pj4+MCkgJiAweGZmLFxuICAgICAgKGg3Pj4+MjQpICYgMHhmZiwgKGg3Pj4+MTYpICYgMHhmZiwgKGg3Pj4+OCkgJiAweGZmLCAoaDc+Pj4wKSAmIDB4ZmZcbiAgICBdO1xuICB9XG5cbiAgZnVuY3Rpb24gUEJLREYyX0hNQUNfU0hBMjU2X09uZUl0ZXIocGFzc3dvcmQsIHNhbHQsIGRrTGVuKSB7XG4gICAgLy8gY29tcHJlc3MgcGFzc3dvcmQgaWYgaXQncyBsb25nZXIgdGhhbiBoYXNoIGJsb2NrIGxlbmd0aFxuICAgIGlmKHBhc3N3b3JkLmxlbmd0aCA+IDY0KSB7XG4gICAgICAvLyBTSEEyNTYgZXhwZWN0cyBwYXNzd29yZCB0byBiZSBhbiBBcnJheS4gSWYgaXQncyBub3RcbiAgICAgIC8vIChpLmUuIGl0IGRvZXNuJ3QgaGF2ZSAucHVzaCBtZXRob2QpLCBjb252ZXJ0IGl0IHRvIG9uZS5cbiAgICAgIHBhc3N3b3JkID0gU0hBMjU2KHBhc3N3b3JkLnB1c2ggPyBwYXNzd29yZCA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhc3N3b3JkLCAwKSk7XG4gICAgfVxuXG4gICAgdmFyIGksIGlubmVyTGVuID0gNjQgKyBzYWx0Lmxlbmd0aCArIDQsXG4gICAgICAgIGlubmVyID0gbmV3IEFycmF5KGlubmVyTGVuKSxcbiAgICAgICAgb3V0ZXJLZXkgPSBuZXcgQXJyYXkoNjQpLFxuICAgICAgICBkayA9IFtdO1xuXG4gICAgLy8gaW5uZXIgPSAocGFzc3dvcmQgXiBpcGFkKSB8fCBzYWx0IHx8IGNvdW50ZXJcbiAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7IGkrKykgaW5uZXJbaV0gPSAweDM2O1xuICAgIGZvciAoaSA9IDA7IGkgPCBwYXNzd29yZC5sZW5ndGg7IGkrKykgaW5uZXJbaV0gXj0gcGFzc3dvcmRbaV07XG4gICAgZm9yIChpID0gMDsgaSA8IHNhbHQubGVuZ3RoOyBpKyspIGlubmVyWzY0K2ldID0gc2FsdFtpXTtcbiAgICBmb3IgKGkgPSBpbm5lckxlbiAtIDQ7IGkgPCBpbm5lckxlbjsgaSsrKSBpbm5lcltpXSA9IDA7XG5cbiAgICAvLyBvdXRlcktleSA9IHBhc3N3b3JkIF4gb3BhZFxuICAgIGZvciAoaSA9IDA7IGkgPCA2NDsgaSsrKSBvdXRlcktleVtpXSA9IDB4NWM7XG4gICAgZm9yIChpID0gMDsgaSA8IHBhc3N3b3JkLmxlbmd0aDsgaSsrKSBvdXRlcktleVtpXSBePSBwYXNzd29yZFtpXTtcblxuICAgIC8vIGluY3JlbWVudHMgY291bnRlciBpbnNpZGUgaW5uZXJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRDb3VudGVyKCkge1xuICAgICAgZm9yICh2YXIgaSA9IGlubmVyTGVuLTE7IGkgPj0gaW5uZXJMZW4tNDsgaS0tKSB7XG4gICAgICAgIGlubmVyW2ldKys7XG4gICAgICAgIGlmIChpbm5lcltpXSA8PSAweGZmKSByZXR1cm47XG4gICAgICAgIGlubmVyW2ldID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBvdXRwdXQgYmxvY2tzID0gU0hBMjU2KG91dGVyS2V5IHx8IFNIQTI1Nihpbm5lcikpIC4uLlxuICAgIHdoaWxlIChka0xlbiA+PSAzMikge1xuICAgICAgaW5jcmVtZW50Q291bnRlcigpO1xuICAgICAgZGsgPSBkay5jb25jYXQoU0hBMjU2KG91dGVyS2V5LmNvbmNhdChTSEEyNTYoaW5uZXIpKSkpO1xuICAgICAgZGtMZW4gLT0gMzI7XG4gICAgfVxuICAgIGlmIChka0xlbiA+IDApIHtcbiAgICAgIGluY3JlbWVudENvdW50ZXIoKTtcbiAgICAgIGRrID0gZGsuY29uY2F0KFNIQTI1NihvdXRlcktleS5jb25jYXQoU0hBMjU2KGlubmVyKSkpLnNsaWNlKDAsIGRrTGVuKSk7XG4gICAgfVxuICAgIHJldHVybiBkaztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhbHNhWE9SKHRtcCwgQiwgYmluLCBib3V0KSB7XG4gICAgdmFyIGowICA9IHRtcFswXSAgXiBCW2JpbisrXSxcbiAgICAgICAgajEgID0gdG1wWzFdICBeIEJbYmluKytdLFxuICAgICAgICBqMiAgPSB0bXBbMl0gIF4gQltiaW4rK10sXG4gICAgICAgIGozICA9IHRtcFszXSAgXiBCW2JpbisrXSxcbiAgICAgICAgajQgID0gdG1wWzRdICBeIEJbYmluKytdLFxuICAgICAgICBqNSAgPSB0bXBbNV0gIF4gQltiaW4rK10sXG4gICAgICAgIGo2ICA9IHRtcFs2XSAgXiBCW2JpbisrXSxcbiAgICAgICAgajcgID0gdG1wWzddICBeIEJbYmluKytdLFxuICAgICAgICBqOCAgPSB0bXBbOF0gIF4gQltiaW4rK10sXG4gICAgICAgIGo5ICA9IHRtcFs5XSAgXiBCW2JpbisrXSxcbiAgICAgICAgajEwID0gdG1wWzEwXSBeIEJbYmluKytdLFxuICAgICAgICBqMTEgPSB0bXBbMTFdIF4gQltiaW4rK10sXG4gICAgICAgIGoxMiA9IHRtcFsxMl0gXiBCW2JpbisrXSxcbiAgICAgICAgajEzID0gdG1wWzEzXSBeIEJbYmluKytdLFxuICAgICAgICBqMTQgPSB0bXBbMTRdIF4gQltiaW4rK10sXG4gICAgICAgIGoxNSA9IHRtcFsxNV0gXiBCW2JpbisrXSxcbiAgICAgICAgdSwgaTtcblxuICAgIHZhciB4MCA9IGowLCB4MSA9IGoxLCB4MiA9IGoyLCB4MyA9IGozLCB4NCA9IGo0LCB4NSA9IGo1LCB4NiA9IGo2LCB4NyA9IGo3LFxuICAgICAgICB4OCA9IGo4LCB4OSA9IGo5LCB4MTAgPSBqMTAsIHgxMSA9IGoxMSwgeDEyID0gajEyLCB4MTMgPSBqMTMsIHgxNCA9IGoxNCxcbiAgICAgICAgeDE1ID0gajE1O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDg7IGkgKz0gMikge1xuICAgICAgdSA9ICB4MCArIHgxMjsgICB4NCBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0gIHg0ICsgIHgwOyAgIHg4IF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDggKyAgeDQ7ICB4MTIgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSB4MTIgKyAgeDg7ICAgeDAgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9ICB4NSArICB4MTsgICB4OSBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0gIHg5ICsgIHg1OyAgeDEzIF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSB4MTMgKyAgeDk7ICAgeDEgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSAgeDEgKyB4MTM7ICAgeDUgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9IHgxMCArICB4NjsgIHgxNCBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0geDE0ICsgeDEwOyAgIHgyIF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDIgKyB4MTQ7ICAgeDYgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSAgeDYgKyAgeDI7ICB4MTAgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9IHgxNSArIHgxMTsgICB4MyBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0gIHgzICsgeDE1OyAgIHg3IF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDcgKyAgeDM7ICB4MTEgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSB4MTEgKyAgeDc7ICB4MTUgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9ICB4MCArICB4MzsgICB4MSBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0gIHgxICsgIHgwOyAgIHgyIF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDIgKyAgeDE7ICAgeDMgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSAgeDMgKyAgeDI7ICAgeDAgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9ICB4NSArICB4NDsgICB4NiBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0gIHg2ICsgIHg1OyAgIHg3IF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDcgKyAgeDY7ICAgeDQgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSAgeDQgKyAgeDc7ICAgeDUgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9IHgxMCArICB4OTsgIHgxMSBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0geDExICsgeDEwOyAgIHg4IF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSAgeDggKyB4MTE7ICAgeDkgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSAgeDkgKyAgeDg7ICB4MTAgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcblxuICAgICAgdSA9IHgxNSArIHgxNDsgIHgxMiBePSB1PDw3ICB8IHU+Pj4oMzItNyk7XG4gICAgICB1ID0geDEyICsgeDE1OyAgeDEzIF49IHU8PDkgIHwgdT4+PigzMi05KTtcbiAgICAgIHUgPSB4MTMgKyB4MTI7ICB4MTQgXj0gdTw8MTMgfCB1Pj4+KDMyLTEzKTtcbiAgICAgIHUgPSB4MTQgKyB4MTM7ICB4MTUgXj0gdTw8MTggfCB1Pj4+KDMyLTE4KTtcbiAgICB9XG5cbiAgICBCW2JvdXQrK10gPSB0bXBbMF0gID0gKHgwICArIGowKSAgfCAwO1xuICAgIEJbYm91dCsrXSA9IHRtcFsxXSAgPSAoeDEgICsgajEpICB8IDA7XG4gICAgQltib3V0KytdID0gdG1wWzJdICA9ICh4MiAgKyBqMikgIHwgMDtcbiAgICBCW2JvdXQrK10gPSB0bXBbM10gID0gKHgzICArIGozKSAgfCAwO1xuICAgIEJbYm91dCsrXSA9IHRtcFs0XSAgPSAoeDQgICsgajQpICB8IDA7XG4gICAgQltib3V0KytdID0gdG1wWzVdICA9ICh4NSAgKyBqNSkgIHwgMDtcbiAgICBCW2JvdXQrK10gPSB0bXBbNl0gID0gKHg2ICArIGo2KSAgfCAwO1xuICAgIEJbYm91dCsrXSA9IHRtcFs3XSAgPSAoeDcgICsgajcpICB8IDA7XG4gICAgQltib3V0KytdID0gdG1wWzhdICA9ICh4OCAgKyBqOCkgIHwgMDtcbiAgICBCW2JvdXQrK10gPSB0bXBbOV0gID0gKHg5ICArIGo5KSAgfCAwO1xuICAgIEJbYm91dCsrXSA9IHRtcFsxMF0gPSAoeDEwICsgajEwKSB8IDA7XG4gICAgQltib3V0KytdID0gdG1wWzExXSA9ICh4MTEgKyBqMTEpIHwgMDtcbiAgICBCW2JvdXQrK10gPSB0bXBbMTJdID0gKHgxMiArIGoxMikgfCAwO1xuICAgIEJbYm91dCsrXSA9IHRtcFsxM10gPSAoeDEzICsgajEzKSB8IDA7XG4gICAgQltib3V0KytdID0gdG1wWzE0XSA9ICh4MTQgKyBqMTQpIHwgMDtcbiAgICBCW2JvdXQrK10gPSB0bXBbMTVdID0gKHgxNSArIGoxNSkgfCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2tDb3B5KGRzdCwgZGksIHNyYywgc2ksIGxlbikge1xuICAgIHdoaWxlIChsZW4tLSkgZHN0W2RpKytdID0gc3JjW3NpKytdO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2tYT1IoZHN0LCBkaSwgc3JjLCBzaSwgbGVuKSB7XG4gICAgd2hpbGUgKGxlbi0tKSBkc3RbZGkrK10gXj0gc3JjW3NpKytdO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2tNaXgodG1wLCBCLCBiaW4sIGJvdXQsIHIpIHtcbiAgICBibG9ja0NvcHkodG1wLCAwLCBCLCBiaW4gKyAoMipyLTEpKjE2LCAxNik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyKnI7IGkgKz0gMikge1xuICAgICAgc2Fsc2FYT1IodG1wLCBCLCBiaW4gKyBpKjE2LCAgICAgIGJvdXQgKyBpKjgpO1xuICAgICAgc2Fsc2FYT1IodG1wLCBCLCBiaW4gKyBpKjE2ICsgMTYsIGJvdXQgKyBpKjggKyByKjE2KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnRlZ2VyaWZ5KEIsIGJpLCByKSB7XG4gICAgcmV0dXJuIEJbYmkrKDIqci0xKSoxNl07XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdUb1VURjhCeXRlcyhzKSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgYXJyLnB1c2goYyk7XG4gICAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICBhcnIucHVzaCgweGMwIHwgYyA+PiA2KTtcbiAgICAgICAgYXJyLnB1c2goMHg4MCB8IGMgJiAweDNmKTtcbiAgICAgIH0gZWxzZSBpZiAoYyA8IDB4ZDgwMCkge1xuICAgICAgICBhcnIucHVzaCgweGUwIHwgYyA+PiAxMik7XG4gICAgICAgIGFyci5wdXNoKDB4ODAgfCAoYyA+PiA2KSAmIDB4M2YpO1xuICAgICAgICBhcnIucHVzaCgweDgwIHwgYyAmIDB4M2YpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGkgPj0gcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGkrKzsgLy8gZ2V0IG9uZSBtb3JlIGNoYXJhY3RlclxuICAgICAgICBjID0gKGMgJiAweDNmZikgPDwgMTA7XG4gICAgICAgIGMgfD0gcy5jaGFyQ29kZUF0KGkpICYgMHgzZmY7XG4gICAgICAgIGMgKz0gMHgxMDAwMDtcblxuICAgICAgICBhcnIucHVzaCgweGYwIHwgYyA+PiAxOCk7XG4gICAgICAgIGFyci5wdXNoKDB4ODAgfCAoYyA+PiAxMikgJiAweDNmKTtcbiAgICAgICAgYXJyLnB1c2goMHg4MCB8IChjID4+IDYpICYgMHgzZik7XG4gICAgICAgIGFyci5wdXNoKDB4ODAgfCBjICYgMHgzZik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBieXRlc1RvSGV4KHApIHtcbiAgICAvKiogQGNvbnN0ICovXG4gICAgdmFyIGVuYyA9ICcwMTIzNDU2Nzg5YWJjZGVmJy5zcGxpdCgnJyk7XG5cbiAgICB2YXIgbGVuID0gcC5sZW5ndGgsXG4gICAgICAgIGFyciA9IFtdLFxuICAgICAgICBpID0gMDtcblxuICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2goZW5jWyhwW2ldPj4+NCkgJiAxNV0pO1xuICAgICAgICBhcnIucHVzaChlbmNbKHBbaV0+Pj4wKSAmIDE1XSk7XG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbignJyk7XG4gIH1cblxuICBmdW5jdGlvbiBieXRlc1RvQmFzZTY0KHApIHtcbiAgICAvKiogQGNvbnN0ICovXG4gICAgdmFyIGVuYyA9ICgnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicgK1xuICAgICAgICAgICAgICAnMDEyMzQ1Njc4OSsvJykuc3BsaXQoJycpO1xuXG4gICAgdmFyIGxlbiA9IHAubGVuZ3RoLFxuICAgICAgICBhcnIgPSBbXSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIGEsIGIsIGMsIHQ7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgYSA9IGkgPCBsZW4gPyBwW2krK10gOiAwO1xuICAgICAgYiA9IGkgPCBsZW4gPyBwW2krK10gOiAwO1xuICAgICAgYyA9IGkgPCBsZW4gPyBwW2krK10gOiAwO1xuICAgICAgdCA9IChhIDw8IDE2KSArIChiIDw8IDgpICsgYztcbiAgICAgIGFyci5wdXNoKGVuY1sodCA+Pj4gMyAqIDYpICYgNjNdKTtcbiAgICAgIGFyci5wdXNoKGVuY1sodCA+Pj4gMiAqIDYpICYgNjNdKTtcbiAgICAgIGFyci5wdXNoKGVuY1sodCA+Pj4gMSAqIDYpICYgNjNdKTtcbiAgICAgIGFyci5wdXNoKGVuY1sodCA+Pj4gMCAqIDYpICYgNjNdKTtcbiAgICB9XG4gICAgaWYgKGxlbiAlIDMgPiAwKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aC0xXSA9ICc9JztcbiAgICAgIGlmIChsZW4gJSAzID09PSAxKSBhcnJbYXJyLmxlbmd0aC0yXSA9ICc9JztcbiAgICB9XG4gICAgcmV0dXJuIGFyci5qb2luKCcnKTtcbiAgfVxuXG5cbiAgLy8gR2VuZXJhdGUga2V5LlxuXG4gIHZhciBNQVhfVUlOVCA9ICgtMSk+Pj4wLFxuICAgICAgcCA9IDE7XG5cbiAgaWYgKHR5cGVvZiBsb2dOID09PSBcIm9iamVjdFwiKSB7XG4gICAgLy8gQ2FsbGVkIGFzOiBzY3J5cHQocGFzc3dvcmQsIHNhbHQsIG9wdHMsIGNhbGxiYWNrKVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzY3J5cHQ6IGluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSBsb2dOO1xuXG4gICAgY2FsbGJhY2sgPSByO1xuICAgIGxvZ04gPSBvcHRzLmxvZ047XG4gICAgaWYgKHR5cGVvZiBsb2dOID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRzLk4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChvcHRzLk4gPCAyIHx8IG9wdHMuTiA+IE1BWF9VSU5UKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2NyeXB0OiBOIGlzIG91dCBvZiByYW5nZScpO1xuXG4gICAgICAgIGlmICgob3B0cy5OICYgKG9wdHMuTiAtIDEpKSAhPT0gMClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NjcnlwdDogTiBpcyBub3QgYSBwb3dlciBvZiAyJyk7XG5cbiAgICAgICAgbG9nTiA9IE1hdGgubG9nKG9wdHMuTikgLyBNYXRoLkxOMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc2NyeXB0OiBtaXNzaW5nIE4gcGFyYW1ldGVyJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gWFhYOiBJZiBvcHRzLnAgb3Igb3B0cy5ka0xlbiBpcyAwLCBpdCB3aWxsIGJlIHNldCB0byB0aGUgZGVmYXVsdCB2YWx1ZVxuICAgIC8vIGluc3RlYWQgb2YgdGhyb3dpbmcgZHVlIHRvIGluY29ycmVjdCB2YWx1ZS4gVG8gYXZvaWQgYnJlYWtpbmdcbiAgICAvLyBjb21wYXRpYmlsaXR5LCB0aGlzIHdpbGwgb25seSBiZSBjaGFuZ2VkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uXG4gICAgcCA9IG9wdHMucCB8fCAxO1xuICAgIHIgPSBvcHRzLnI7XG4gICAgZGtMZW4gPSBvcHRzLmRrTGVuIHx8IDMyO1xuICAgIGludGVycnVwdFN0ZXAgPSBvcHRzLmludGVycnVwdFN0ZXAgfHwgMDtcbiAgICBlbmNvZGluZyA9IG9wdHMuZW5jb2Rpbmc7XG4gIH1cblxuICBpZiAocCA8IDEpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzY3J5cHQ6IGludmFsaWQgcCcpO1xuXG4gIGlmIChyIDw9IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzY3J5cHQ6IGludmFsaWQgcicpO1xuXG4gIGlmIChsb2dOIDwgMSB8fCBsb2dOID4gMzEpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzY3J5cHQ6IGxvZ04gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDMxJyk7XG5cblxuICB2YXIgTiA9ICgxPDxsb2dOKT4+PjAsXG4gICAgICBYWSwgViwgQiwgdG1wO1xuXG4gIGlmIChyKnAgPj0gMTw8MzAgfHwgciA+IE1BWF9VSU5ULzEyOC9wIHx8IHIgPiBNQVhfVUlOVC8yNTYgfHwgTiA+IE1BWF9VSU5ULzEyOC9yKVxuICAgIHRocm93IG5ldyBFcnJvcignc2NyeXB0OiBwYXJhbWV0ZXJzIGFyZSB0b28gbGFyZ2UnKTtcblxuICAvLyBEZWNvZGUgc3RyaW5ncy5cbiAgaWYgKHR5cGVvZiBwYXNzd29yZCA9PT0gJ3N0cmluZycpXG4gICAgcGFzc3dvcmQgPSBzdHJpbmdUb1VURjhCeXRlcyhwYXNzd29yZCk7XG4gIGlmICh0eXBlb2Ygc2FsdCA9PT0gJ3N0cmluZycpXG4gICAgc2FsdCA9IHN0cmluZ1RvVVRGOEJ5dGVzKHNhbHQpO1xuXG4gIGlmICh0eXBlb2YgSW50MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvL1hYWCBXZSBjYW4gdXNlIFVpbnQzMkFycmF5LCBidXQgSW50MzJBcnJheSBpcyBmYXN0ZXIgaW4gU2FmYXJpLlxuICAgIFhZID0gbmV3IEludDMyQXJyYXkoNjQqcik7XG4gICAgViA9IG5ldyBJbnQzMkFycmF5KDMyKk4qcik7XG4gICAgdG1wID0gbmV3IEludDMyQXJyYXkoMTYpO1xuICB9IGVsc2Uge1xuICAgIFhZID0gW107XG4gICAgViA9IFtdO1xuICAgIHRtcCA9IG5ldyBBcnJheSgxNik7XG4gIH1cbiAgQiA9IFBCS0RGMl9ITUFDX1NIQTI1Nl9PbmVJdGVyKHBhc3N3b3JkLCBzYWx0LCBwKjEyOCpyKTtcblxuICB2YXIgeGkgPSAwLCB5aSA9IDMyICogcjtcblxuICBmdW5jdGlvbiBzbWl4U3RhcnQocG9zKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMipyOyBpKyspIHtcbiAgICAgIHZhciBqID0gcG9zICsgaSo0O1xuICAgICAgWFlbeGkraV0gPSAoKEJbaiszXSAmIDB4ZmYpPDwyNCkgfCAoKEJbaisyXSAmIDB4ZmYpPDwxNikgfFxuICAgICAgICAgICAgICAgICAoKEJbaisxXSAmIDB4ZmYpPDw4KSAgfCAoKEJbaiswXSAmIDB4ZmYpPDwwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbWl4U3RlcDEoc3RhcnQsIGVuZCkge1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAyKSB7XG4gICAgICBibG9ja0NvcHkoViwgaSooMzIqciksIFhZLCB4aSwgMzIqcik7XG4gICAgICBibG9ja01peCh0bXAsIFhZLCB4aSwgeWksIHIpO1xuXG4gICAgICBibG9ja0NvcHkoViwgKGkrMSkqKDMyKnIpLCBYWSwgeWksIDMyKnIpO1xuICAgICAgYmxvY2tNaXgodG1wLCBYWSwgeWksIHhpLCByKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbWl4U3RlcDIoc3RhcnQsIGVuZCkge1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAyKSB7XG4gICAgICB2YXIgaiA9IGludGVnZXJpZnkoWFksIHhpLCByKSAmIChOLTEpO1xuICAgICAgYmxvY2tYT1IoWFksIHhpLCBWLCBqKigzMipyKSwgMzIqcik7XG4gICAgICBibG9ja01peCh0bXAsIFhZLCB4aSwgeWksIHIpO1xuXG4gICAgICBqID0gaW50ZWdlcmlmeShYWSwgeWksIHIpICYgKE4tMSk7XG4gICAgICBibG9ja1hPUihYWSwgeWksIFYsIGoqKDMyKnIpLCAzMipyKTtcbiAgICAgIGJsb2NrTWl4KHRtcCwgWFksIHlpLCB4aSwgcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc21peEZpbmlzaChwb3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyKnI7IGkrKykge1xuICAgICAgdmFyIGogPSBYWVt4aStpXTtcbiAgICAgIEJbcG9zICsgaSo0ICsgMF0gPSAoaj4+PjApICAmIDB4ZmY7XG4gICAgICBCW3BvcyArIGkqNCArIDFdID0gKGo+Pj44KSAgJiAweGZmO1xuICAgICAgQltwb3MgKyBpKjQgKyAyXSA9IChqPj4+MTYpICYgMHhmZjtcbiAgICAgIEJbcG9zICsgaSo0ICsgM10gPSAoaj4+PjI0KSAmIDB4ZmY7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5leHRUaWNrID0gKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnKSA/IHNldEltbWVkaWF0ZSA6IHNldFRpbWVvdXQ7XG5cbiAgZnVuY3Rpb24gaW50ZXJydXB0ZWRGb3Ioc3RhcnQsIGVuZCwgc3RlcCwgZm4sIGRvbmVmbikge1xuICAgIChmdW5jdGlvbiBwZXJmb3JtU3RlcCgpIHtcbiAgICAgIG5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBmbihzdGFydCwgc3RhcnQgKyBzdGVwIDwgZW5kID8gc3RhcnQgKyBzdGVwIDogZW5kKTtcbiAgICAgICAgc3RhcnQgKz0gc3RlcDtcbiAgICAgICAgaWYgKHN0YXJ0IDwgZW5kKVxuICAgICAgICAgIHBlcmZvcm1TdGVwKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBkb25lZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChlbmMpIHtcbiAgICAgIHZhciByZXN1bHQgPSBQQktERjJfSE1BQ19TSEEyNTZfT25lSXRlcihwYXNzd29yZCwgQiwgZGtMZW4pO1xuICAgICAgaWYgKGVuYyA9PT0gJ2Jhc2U2NCcpXG4gICAgICAgIHJldHVybiBieXRlc1RvQmFzZTY0KHJlc3VsdCk7XG4gICAgICBlbHNlIGlmIChlbmMgPT09ICdoZXgnKVxuICAgICAgICByZXR1cm4gYnl0ZXNUb0hleChyZXN1bHQpO1xuICAgICAgZWxzZSBpZiAoZW5jID09PSAnYmluYXJ5JylcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBCbG9ja2luZyB2YXJpYW50LlxuICBmdW5jdGlvbiBjYWxjdWxhdGVTeW5jKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcDsgaSsrKSB7XG4gICAgICBzbWl4U3RhcnQoaSoxMjgqcik7XG4gICAgICBzbWl4U3RlcDEoMCwgTik7XG4gICAgICBzbWl4U3RlcDIoMCwgTik7XG4gICAgICBzbWl4RmluaXNoKGkqMTI4KnIpO1xuICAgIH1cbiAgICBjYWxsYmFjayhnZXRSZXN1bHQoZW5jb2RpbmcpKTtcbiAgfVxuXG4gIC8vIEFzeW5jIHZhcmlhbnQuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUFzeW5jKGkpIHtcbiAgICAgIHNtaXhTdGFydChpKjEyOCpyKTtcbiAgICAgIGludGVycnVwdGVkRm9yKDAsIE4sIGludGVycnVwdFN0ZXAqMiwgc21peFN0ZXAxLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaW50ZXJydXB0ZWRGb3IoMCwgTiwgaW50ZXJydXB0U3RlcCoyLCBzbWl4U3RlcDIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzbWl4RmluaXNoKGkqMTI4KnIpO1xuICAgICAgICAgIGlmIChpICsgMSA8IHApIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uKCkgeyBjYWxjdWxhdGVBc3luYyhpICsgMSk7IH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhnZXRSZXN1bHQoZW5jb2RpbmcpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGludGVycnVwdFN0ZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDYWxsZWQgYXM6IHNjcnlwdCguLi4sICAgICAgY2FsbGJhY2ssIFtlbmNvZGluZ10pXG4gICAgLy8gIHNoaWZ0aW5nOiBzY3J5cHQoLi4uLCBpbnRlcnJ1cHRTdGVwLCAgY2FsbGJhY2ssIFtlbmNvZGluZ10pXG4gICAgZW5jb2RpbmcgPSBjYWxsYmFjaztcbiAgICBjYWxsYmFjayA9IGludGVycnVwdFN0ZXA7XG4gICAgaW50ZXJydXB0U3RlcCA9IDEwMDA7XG4gIH1cblxuICBpZiAoaW50ZXJydXB0U3RlcCA8PSAwKSB7XG4gICAgY2FsY3VsYXRlU3luYygpO1xuICB9IGVsc2Uge1xuICAgIGNhbGN1bGF0ZUFzeW5jKDApO1xuICB9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBzY3J5cHQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ2NyeXB0bycpOyIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBvbGRCcm93c2VyICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdzZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0aW9uIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyXFxudXNlIGNocm9tZSwgRmlyZUZveCBvciBJbnRlcm5ldCBFeHBsb3JlciAxMScpXG59XG52YXIgc2FmZUJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJylcbnZhciByYW5kb21ieXRlcyA9IHJlcXVpcmUoJ3JhbmRvbWJ5dGVzJylcbnZhciBCdWZmZXIgPSBzYWZlQnVmZmVyLkJ1ZmZlclxudmFyIGtCdWZmZXJNYXhMZW5ndGggPSBzYWZlQnVmZmVyLmtNYXhMZW5ndGhcbnZhciBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0b1xudmFyIGtNYXhVaW50MzIgPSBNYXRoLnBvdygyLCAzMikgLSAxXG5mdW5jdGlvbiBhc3NlcnRPZmZzZXQgKG9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgIT09IG9mZnNldCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29mZnNldCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPiBrTWF4VWludDMyIHx8IG9mZnNldCA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvZmZzZXQgbXVzdCBiZSBhIHVpbnQzMicpXG4gIH1cblxuICBpZiAob2Zmc2V0ID4ga0J1ZmZlck1heExlbmd0aCB8fCBvZmZzZXQgPiBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IG91dCBvZiByYW5nZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJyB8fCBzaXplICE9PSBzaXplKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2l6ZSBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmIChzaXplID4ga01heFVpbnQzMiB8fCBzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NpemUgbXVzdCBiZSBhIHVpbnQzMicpXG4gIH1cblxuICBpZiAoc2l6ZSArIG9mZnNldCA+IGxlbmd0aCB8fCBzaXplID4ga0J1ZmZlck1heExlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdidWZmZXIgdG9vIHNtYWxsJylcbiAgfVxufVxuaWYgKChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykgfHwgIXByb2Nlc3MuYnJvd3Nlcikge1xuICBleHBvcnRzLnJhbmRvbUZpbGwgPSByYW5kb21GaWxsXG4gIGV4cG9ydHMucmFuZG9tRmlsbFN5bmMgPSByYW5kb21GaWxsU3luY1xufSBlbHNlIHtcbiAgZXhwb3J0cy5yYW5kb21GaWxsID0gb2xkQnJvd3NlclxuICBleHBvcnRzLnJhbmRvbUZpbGxTeW5jID0gb2xkQnJvd3NlclxufVxuZnVuY3Rpb24gcmFuZG9tRmlsbCAoYnVmLCBvZmZzZXQsIHNpemUsIGNiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikgJiYgIShidWYgaW5zdGFuY2VvZiBnbG9iYWwuVWludDhBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZlwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgb3IgVWludDhBcnJheScpXG4gIH1cblxuICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gMFxuICAgIHNpemUgPSBidWYubGVuZ3RoXG4gIH0gZWxzZSBpZiAodHlwZW9mIHNpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IHNpemVcbiAgICBzaXplID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICB9IGVsc2UgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiY2JcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB9XG4gIGFzc2VydE9mZnNldChvZmZzZXQsIGJ1Zi5sZW5ndGgpXG4gIGFzc2VydFNpemUoc2l6ZSwgb2Zmc2V0LCBidWYubGVuZ3RoKVxuICByZXR1cm4gYWN0dWFsRmlsbChidWYsIG9mZnNldCwgc2l6ZSwgY2IpXG59XG5cbmZ1bmN0aW9uIGFjdHVhbEZpbGwgKGJ1Ziwgb2Zmc2V0LCBzaXplLCBjYikge1xuICBpZiAocHJvY2Vzcy5icm93c2VyKSB7XG4gICAgdmFyIG91ckJ1ZiA9IGJ1Zi5idWZmZXJcbiAgICB2YXIgdWludCA9IG5ldyBVaW50OEFycmF5KG91ckJ1Ziwgb2Zmc2V0LCBzaXplKVxuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModWludClcbiAgICBpZiAoY2IpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBjYihudWxsLCBidWYpXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHJldHVybiBidWZcbiAgfVxuICBpZiAoY2IpIHtcbiAgICByYW5kb21ieXRlcyhzaXplLCBmdW5jdGlvbiAoZXJyLCBieXRlcykge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgfVxuICAgICAgYnl0ZXMuY29weShidWYsIG9mZnNldClcbiAgICAgIGNiKG51bGwsIGJ1ZilcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG4gIHZhciBieXRlcyA9IHJhbmRvbWJ5dGVzKHNpemUpXG4gIGJ5dGVzLmNvcHkoYnVmLCBvZmZzZXQpXG4gIHJldHVybiBidWZcbn1cbmZ1bmN0aW9uIHJhbmRvbUZpbGxTeW5jIChidWYsIG9mZnNldCwgc2l6ZSkge1xuICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvZmZzZXQgPSAwXG4gIH1cbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSAmJiAhKGJ1ZiBpbnN0YW5jZW9mIGdsb2JhbC5VaW50OEFycmF5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBvciBVaW50OEFycmF5JylcbiAgfVxuXG4gIGFzc2VydE9mZnNldChvZmZzZXQsIGJ1Zi5sZW5ndGgpXG5cbiAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkgc2l6ZSA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcblxuICBhc3NlcnRTaXplKHNpemUsIG9mZnNldCwgYnVmLmxlbmd0aClcblxuICByZXR1cm4gYWN0dWFsRmlsbChidWYsIG9mZnNldCwgc2l6ZSlcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHBhc3N0aHJvdWdoIHN0cmVhbS5cbi8vIGJhc2ljYWxseSBqdXN0IHRoZSBtb3N0IG1pbmltYWwgc29ydCBvZiBUcmFuc2Zvcm0gc3RyZWFtLlxuLy8gRXZlcnkgd3JpdHRlbiBjaHVuayBnZXRzIG91dHB1dCBhcy1pcy5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSk7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoKSkgcmV0dXJuIG5ldyBQYXNzVGhyb3VnaChvcHRpb25zKTtcblxuICBUcmFuc2Zvcm0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuUGFzc1Rocm91Z2gucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihudWxsLCBjaHVuayk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGkgKi9cbnZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKVxudmFyIEJ1ZmZlciA9IGJ1ZmZlci5CdWZmZXJcblxuLy8gYWx0ZXJuYXRpdmUgdG8gdXNpbmcgT2JqZWN0LmtleXMgZm9yIG9sZCBicm93c2Vyc1xuZnVuY3Rpb24gY29weVByb3BzIChzcmMsIGRzdCkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgZHN0W2tleV0gPSBzcmNba2V5XVxuICB9XG59XG5pZiAoQnVmZmVyLmZyb20gJiYgQnVmZmVyLmFsbG9jICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZSAmJiBCdWZmZXIuYWxsb2NVbnNhZmVTbG93KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gYnVmZmVyXG59IGVsc2Uge1xuICAvLyBDb3B5IHByb3BlcnRpZXMgZnJvbSByZXF1aXJlKCdidWZmZXInKVxuICBjb3B5UHJvcHMoYnVmZmVyLCBleHBvcnRzKVxuICBleHBvcnRzLkJ1ZmZlciA9IFNhZmVCdWZmZXJcbn1cblxuZnVuY3Rpb24gU2FmZUJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuU2FmZUJ1ZmZlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJ1ZmZlci5wcm90b3R5cGUpXG5cbi8vIENvcHkgc3RhdGljIG1ldGhvZHMgZnJvbSBCdWZmZXJcbmNvcHlQcm9wcyhCdWZmZXIsIFNhZmVCdWZmZXIpXG5cblNhZmVCdWZmZXIuZnJvbSA9IGZ1bmN0aW9uIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuU2FmZUJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgdmFyIGJ1ZiA9IEJ1ZmZlcihzaXplKVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuZmlsbChmaWxsKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBidWYuZmlsbCgwKVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuU2FmZUJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gQnVmZmVyKHNpemUpXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBidWZmZXIuU2xvd0J1ZmZlcihzaXplKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbi8vIFR5cGVFcnJvclxuZXhwb3J0cy5pc0FycmF5ID0gZnVuY3Rpb24gKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHRocm93IFR5cGVFcnJvcihtZXNzYWdlKVxufVxuXG5leHBvcnRzLmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAodG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT09ICdbb2JqZWN0IEJvb2xlYW5dJykgdGhyb3cgVHlwZUVycm9yKG1lc3NhZ2UpXG59XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbiAodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodmFsdWUpKSB0aHJvdyBUeXBlRXJyb3IobWVzc2FnZSlcbn1cblxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbHVlKSAhPT0gJ1tvYmplY3QgRnVuY3Rpb25dJykgdGhyb3cgVHlwZUVycm9yKG1lc3NhZ2UpXG59XG5cbmV4cG9ydHMuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSAnW29iamVjdCBOdW1iZXJdJykgdGhyb3cgVHlwZUVycm9yKG1lc3NhZ2UpXG59XG5cbmV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbiAodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSAnW29iamVjdCBPYmplY3RdJykgdGhyb3cgVHlwZUVycm9yKG1lc3NhZ2UpXG59XG5cbi8vIFJhbmdlRXJyb3JcbmV4cG9ydHMuaXNCdWZmZXJMZW5ndGggPSBmdW5jdGlvbiAoYnVmZmVyLCBsZW5ndGgsIG1lc3NhZ2UpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggIT09IGxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihtZXNzYWdlKVxufVxuXG5leHBvcnRzLmlzQnVmZmVyTGVuZ3RoMiA9IGZ1bmN0aW9uIChidWZmZXIsIGxlbmd0aDEsIGxlbmd0aDIsIG1lc3NhZ2UpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggIT09IGxlbmd0aDEgJiYgYnVmZmVyLmxlbmd0aCAhPT0gbGVuZ3RoMikgdGhyb3cgUmFuZ2VFcnJvcihtZXNzYWdlKVxufVxuXG5leHBvcnRzLmlzTGVuZ3RoR1RaZXJvID0gZnVuY3Rpb24gKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHRocm93IFJhbmdlRXJyb3IobWVzc2FnZSlcbn1cblxuZXhwb3J0cy5pc051bWJlckluSW50ZXJ2YWwgPSBmdW5jdGlvbiAobnVtYmVyLCB4LCB5LCBtZXNzYWdlKSB7XG4gIGlmIChudW1iZXIgPD0geCB8fCBudW1iZXIgPj0geSkgdGhyb3cgUmFuZ2VFcnJvcihtZXNzYWdlKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuY2xhc3MgUmVwdXRhYmxlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pZCA9IC0xO1xuXHRcdHRoaXMudHlwZSA9ICcnO1xuXHRcdHRoaXMuZW50aXR5ID0gJyc7XG5cdFx0dGhpcy5iYXNlID0gJyc7XG5cdFx0dGhpcy5maW5nZXJwcmludCA9ICcnO1xuXHRcdHRoaXMubGFzdF9yZXB1dGVyID0gJyc7XG5cdFx0dGhpcy5sYXN0X3JlcHV0ZV90aW1lID0gK25ldyBEYXRlKCk7XG5cdFx0dGhpcy5vd25lciA9ICcnO1xuXHRcdHRoaXMubmV0d29yayA9ICcnO1xuXHRcdHRoaXMuYmxvY2sgPSAwO1xuXG5cdFx0dGhpcy5yZXB1dGF0aW9uID0gbnVsbDtcblx0XHR0aGlzLnBhcmVudCA9IG51bGw7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IFtdO1xuXHR9XG5cblx0c3RhdGljIHBsYWNlaG9sZGVyKCkge1xuXHRcdHJldHVybiBuZXcgUmVwdXRhYmxlKCk7XG5cdH1cblx0c3RhdGljIGZyb21Kc29uKGpzb24pIHtcblx0XHRsZXQgcCA9IE9iamVjdC5hc3NpZ24oUmVwdXRhYmxlLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuXHRcdGlmIChqc29uLmhhc093blByb3BlcnR5KCdyZXB1dGF0aW9uJykpIHAucmVwdXRhdGlvbiA9IFJlcHV0YXRpb24uZnJvbUpzb24oanNvbi5yZXB1dGF0aW9uKTtcblx0XHRpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgncGFyZW50JykgJiYganNvbi5wYXJlbnQpIHAucGFyZW50ID0gUmVwdXRhYmxlLmZyb21Kc29uKGpzb24ucGFyZW50KTtcblx0XHRpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnY2hpbGRyZW4nKSAmJiBqc29uLmNoaWxkcmVuLmxlbmd0aCkgcC5jaGlsZHJlbiA9IGpzb24uY2hpbGRyZW4ubWFwKHggPT4gUmVwdXRhYmxlLmZyb21Kc29uKHgpKTtcblx0XHRyZXR1cm4gcDtcblx0fVxuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gUmVwdXRhYmxlLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcblx0fVxuXG5cdHJlYWRhYmxlVHlwZSh0eXBlID0gbnVsbCkge1xuXHRcdHN3aXRjaCAodHlwZSA/IHR5cGUgOiB0aGlzLnR5cGUpIHtcblx0XHRcdGNhc2UgJ2FjYyc6XG5cdFx0XHRcdHJldHVybiAnQWNjb3VudCAvIEFkZHJlc3MnO1xuXHRcdFx0Y2FzZSAnYXBwJzpcblx0XHRcdFx0cmV0dXJuICdBcHBsaWNhdGlvbic7XG5cdFx0XHRjYXNlICdpZCc6XG5cdFx0XHRcdHJldHVybiAnSWRlbnRpdHknO1xuXHRcdFx0Y2FzZSAnYWN0Jzpcblx0XHRcdFx0cmV0dXJuICdDb250cmFjdCBBY3Rpb24nO1xuXHRcdFx0Y2FzZSAnZXRjJzpcblx0XHRcdFx0cmV0dXJuICdPdGhlcic7XG5cdFx0fVxuXHR9XG5cblx0YXZlcmFnZVJlcHV0YXRpb24obG9jYWxpemVkID0gZmFsc2UsIGZpbmdlcnByaW50RmlsdGVycyA9IG51bGwsIHdpdGhTY2FsaW5nID0gdHJ1ZSkge1xuXHRcdGlmICghdGhpcy5yZXB1dGF0aW9uKSByZXR1cm4gMDtcblxuXHRcdGNvbnN0IGZyYWdtZW50cyA9ICFmaW5nZXJwcmludEZpbHRlcnMgPyB0aGlzLnJlcHV0YXRpb24uZnJhZ21lbnRzIDogdGhpcy5yZXB1dGF0aW9uLmZyYWdtZW50cy5maWx0ZXIoeCA9PiBmaW5nZXJwcmludEZpbHRlcnMuaW5jbHVkZXMoeC5maW5nZXJwcmludCkpO1xuXG5cdFx0aWYgKCFmcmFnbWVudHMubGVuZ3RoKSByZXR1cm4gMDtcblxuXHRcdGlmICghbG9jYWxpemVkKSB7XG5cdFx0XHRyZXR1cm4gcGFyc2VGbG9hdChmcmFnbWVudHMucmVkdWNlKChhY2MsIHgpID0+IHtcblx0XHRcdFx0YWNjICs9IHBhcnNlRmxvYXQod2l0aFNjYWxpbmcgPyB4LnRpbWVTY2FsZWRSZXB1dGF0aW9uIDogeC5yZXB1dGF0aW9uKTtcblx0XHRcdFx0cmV0dXJuIGFjYztcblx0XHRcdH0sIDApIC8gZnJhZ21lbnRzLmxlbmd0aCkudG9GaXhlZCg0KTtcblx0XHR9XG5cblx0XHRjb25zdCB1cCA9IGZyYWdtZW50cy5yZWR1Y2UoKGFjYywgeCkgPT4ge1xuXHRcdFx0YWNjICs9IHBhcnNlRmxvYXQoeC51cC5zcGxpdCgnICcpWzBdKTtyZXR1cm4gYWNjO1xuXHRcdH0sIDApO1xuXHRcdGNvbnN0IGRvd24gPSBmcmFnbWVudHMucmVkdWNlKChhY2MsIHgpID0+IHtcblx0XHRcdGFjYyArPSBwYXJzZUZsb2F0KHguZG93bi5zcGxpdCgnICcpWzBdKTtyZXR1cm4gYWNjO1xuXHRcdH0sIDApO1xuXG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQoKHVwIC0gZG93bikgLyAodXAgKyBkb3duKSkudG9GaXhlZCg0KTtcblx0fVxuXG5cdGRlY2ltYWxSZXB1dGF0aW9uKGxvY2FsaXplZCA9IGZhbHNlLCBmaW5nZXJwcmludEZpbHRlcnMgPSBudWxsLCBtYXggPSA1LCB3aXRoU2NhbGluZyA9IHRydWUpIHtcblx0XHRjb25zdCBhdmVyYWdlID0gdGhpcy5hdmVyYWdlUmVwdXRhdGlvbihsb2NhbGl6ZWQsIGZpbmdlcnByaW50RmlsdGVycywgd2l0aFNjYWxpbmcpO1xuXHRcdGNvbnN0IGRlY2ltYWwgPSBhdmVyYWdlICogKGxvY2FsaXplZCA/IG1heCA6IG1heCAqIDIpO1xuXHRcdHJldHVybiBwYXJzZUZsb2F0KGRlY2ltYWwgPiBtYXggPyBtYXggOiBkZWNpbWFsIDwgLW1heCA/IC1tYXggOiBkZWNpbWFsKS50b0ZpeGVkKDEpO1xuXHR9XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlcHV0YWJsZTtcbmNsYXNzIFJlcHV0YXRpb24ge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZyYWdtZW50cyA9IFtdO1xuXHRcdHRoaXMudG90YWxfcmVwdXRlcyA9IDA7XG5cdH1cblxuXHRzdGF0aWMgcGxhY2Vob2xkZXIoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXB1dGF0aW9uKCk7XG5cdH1cblx0c3RhdGljIGZyb21Kc29uKGpzb24pIHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihSZXB1dGF0aW9uLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuXHR9XG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBSZXB1dGF0aW9uLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcblx0fVxufVxuXG5leHBvcnRzLlJlcHV0YXRpb24gPSBSZXB1dGF0aW9uO1xuY2xhc3MgUmVwVHlwZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZmluZ2VycHJpbnQgPSAnJztcblx0XHR0aGlzLnR5cGUgPSAnJztcblx0XHR0aGlzLmJhc2UgPSAwO1xuXHRcdHRoaXMudXBUYWcgPSAnR29vZCc7XG5cdFx0dGhpcy5kb3duVGFnID0gJ0JhZCc7XG5cdH1cblxuXHRzdGF0aWMgcGxhY2Vob2xkZXIoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXBUeXBlKCk7XG5cdH1cblx0c3RhdGljIGZyb21Kc29uKGpzb24pIHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihSZXBUeXBlLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuXHR9XG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBSZXBUeXBlLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcblx0fVxuXHR0b0ZyYWdtZW50KHdlaWdodCkge1xuXHRcdHJldHVybiBuZXcgRnJhZ21lbnQodGhpcy50eXBlLCB3ZWlnaHQsIHRoaXMuZmluZ2VycHJpbnQpO1xuXHR9XG59XG5cbmV4cG9ydHMuUmVwVHlwZSA9IFJlcFR5cGU7XG5jbGFzcyBGcmFnbWVudCB7XG5cdGNvbnN0cnVjdG9yKHR5cGUsIHdlaWdodCwgZmluZ2VycHJpbnQgPSAnJykge1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0dGhpcy51cCA9IHdlaWdodCA+IDAgPyBgJHtwYXJzZUZsb2F0KHdlaWdodCkudG9GaXhlZCg0KX0gUklETGAgOiAnMC4wMDAwIFJJREwnO1xuXHRcdHRoaXMuZG93biA9IHdlaWdodCA8IDAgPyBgJHtwYXJzZUZsb2F0KE1hdGguYWJzKHdlaWdodCkpLnRvRml4ZWQoNCl9IFJJRExgIDogJzAuMDAwMCBSSURMJztcblx0XHR0aGlzLmZpbmdlcnByaW50ID0gZmluZ2VycHJpbnQ7XG5cdH1cblxuXHRzdGF0aWMgcGxhY2Vob2xkZXIoKSB7XG5cdFx0cmV0dXJuIG5ldyBGcmFnbWVudCgnbm9uZScsIDApO1xuXHR9XG5cdHN0YXRpYyBmcm9tSnNvbihqc29uKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oRnJhZ21lbnQucGxhY2Vob2xkZXIoKSwganNvbik7XG5cdH1cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIEZyYWdtZW50LmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcblx0fVxuXG5cdHZhbGlkYXRlKCkge1xuXHRcdHJldHVybiAocGFyc2VGbG9hdCh0aGlzLnVwLnNwbGl0KCcgJylbMF0pID4gMCB8fCBwYXJzZUZsb2F0KHRoaXMuZG93bi5zcGxpdCgnICcpWzBdKSA+IDApICYmIHRoaXMudHlwZS50b1N0cmluZygpLmxlbmd0aCAmJiB0aGlzLmZpbmdlcnByaW50LnRvU3RyaW5nKCkubGVuZ3RoO1xuXHR9XG59XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7IiwiY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcbmNvbnN0IE1BWF9WQUxVRSA9IDB4N2ZmZmZmZmZcbmNvbnN0IERFRkFVTFRfUFJPTUlTRV9JTlRFUlZBTCA9IDUwMDBcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5mdW5jdGlvbiBjaGVja0FuZEluaXQgKGtleSwgc2FsdCwgTiwgciwgcCwgZGtMZW4sIHByb2dyZXNzQ2FsbGJhY2spIHtcbiAgaWYgKE4gPT09IDAgfHwgKE4gJiAoTiAtIDEpKSAhPT0gMCkgdGhyb3cgRXJyb3IoJ04gbXVzdCBiZSA+IDAgYW5kIGEgcG93ZXIgb2YgMicpXG5cbiAgaWYgKE4gPiBNQVhfVkFMVUUgLyAxMjggLyByKSB0aHJvdyBFcnJvcignUGFyYW1ldGVyIE4gaXMgdG9vIGxhcmdlJylcbiAgaWYgKHIgPiBNQVhfVkFMVUUgLyAxMjggLyBwKSB0aHJvdyBFcnJvcignUGFyYW1ldGVyIHIgaXMgdG9vIGxhcmdlJylcblxuICBsZXQgWFkgPSBCdWZmZXIuYWxsb2MoMjU2ICogcilcbiAgbGV0IFYgPSBCdWZmZXIuYWxsb2MoMTI4ICogciAqIE4pXG5cbiAgLy8gcHNldWRvIGdsb2JhbFxuICBsZXQgQjMyID0gbmV3IEludDMyQXJyYXkoMTYpIC8vIHNhbHNhMjBfOFxuICBsZXQgeCA9IG5ldyBJbnQzMkFycmF5KDE2KSAvLyBzYWxzYTIwXzhcbiAgbGV0IF9YID0gQnVmZmVyLmFsbG9jKDY0KSAvLyBibG9ja21peF9zYWxzYThcblxuICAvLyBwc2V1ZG8gZ2xvYmFsXG4gIGxldCBCID0gY3J5cHRvLnBia2RmMlN5bmMoa2V5LCBzYWx0LCAxLCBwICogMTI4ICogciwgJ3NoYTI1NicpXG5cbiAgbGV0IHRpY2tDYWxsYmFja1xuICBpZiAocHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgIGxldCB0b3RhbE9wcyA9IHAgKiBOICogMlxuICAgIGxldCBjdXJyZW50T3AgPSAwXG5cbiAgICB0aWNrQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICArK2N1cnJlbnRPcFxuXG4gICAgICAvLyBzZW5kIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMgb25jZSBldmVyeSAxLDAwMCBvcHNcbiAgICAgIGlmIChjdXJyZW50T3AgJSAxMDAwID09PSAwKSB7XG4gICAgICAgIHByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRPcCxcbiAgICAgICAgICB0b3RhbDogdG90YWxPcHMsXG4gICAgICAgICAgcGVyY2VudDogKGN1cnJlbnRPcCAvIHRvdGFsT3BzKSAqIDEwMC4wXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgWFksXG4gICAgVixcbiAgICBCMzIsXG4gICAgeCxcbiAgICBfWCxcbiAgICBCLFxuICAgIHRpY2tDYWxsYmFja1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNtaXggKEIsIEJpLCByLCBOLCBWLCBYWSwgX1gsIEIzMiwgeCwgdGlja0NhbGxiYWNrLCBwcm9taXNlSW50ZXJ2YWwpIHtcbiAgcHJvbWlzZUludGVydmFsID0gcHJvbWlzZUludGVydmFsIHx8IERFRkFVTFRfUFJPTUlTRV9JTlRFUlZBTFxuICBsZXQgWGkgPSAwXG4gIGxldCBZaSA9IDEyOCAqIHJcbiAgbGV0IGlcblxuICBCLmNvcHkoWFksIFhpLCBCaSwgQmkgKyBZaSlcblxuICBmb3IgKGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgWFkuY29weShWLCBpICogWWksIFhpLCBYaSArIFlpKVxuICAgIGlmIChpICUgcHJvbWlzZUludGVydmFsID09PSAwKSB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldEltbWVkaWF0ZShyZXNvbHZlKSlcbiAgICB9XG4gICAgYmxvY2ttaXhfc2Fsc2E4KFhZLCBYaSwgWWksIHIsIF9YLCBCMzIsIHgpXG5cbiAgICBpZiAodGlja0NhbGxiYWNrKSB0aWNrQ2FsbGJhY2soKVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IE47IGkrKykge1xuICAgIGxldCBvZmZzZXQgPSBYaSArICgyICogciAtIDEpICogNjRcbiAgICBsZXQgaiA9IFhZLnJlYWRVSW50MzJMRShvZmZzZXQpICYgKE4gLSAxKVxuICAgIGJsb2NreG9yKFYsIGogKiBZaSwgWFksIFhpLCBZaSlcbiAgICBpZiAoaSAlIHByb21pc2VJbnRlcnZhbCA9PT0gMCkge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRJbW1lZGlhdGUocmVzb2x2ZSkpXG4gICAgfVxuICAgIGJsb2NrbWl4X3NhbHNhOChYWSwgWGksIFlpLCByLCBfWCwgQjMyLCB4KVxuXG4gICAgaWYgKHRpY2tDYWxsYmFjaykgdGlja0NhbGxiYWNrKClcbiAgfVxuXG4gIFhZLmNvcHkoQiwgQmksIFhpLCBYaSArIFlpKVxufVxuXG5mdW5jdGlvbiBzbWl4U3luYyAoQiwgQmksIHIsIE4sIFYsIFhZLCBfWCwgQjMyLCB4LCB0aWNrQ2FsbGJhY2spIHtcbiAgbGV0IFhpID0gMFxuICBsZXQgWWkgPSAxMjggKiByXG4gIGxldCBpXG5cbiAgQi5jb3B5KFhZLCBYaSwgQmksIEJpICsgWWkpXG5cbiAgZm9yIChpID0gMDsgaSA8IE47IGkrKykge1xuICAgIFhZLmNvcHkoViwgaSAqIFlpLCBYaSwgWGkgKyBZaSlcbiAgICBibG9ja21peF9zYWxzYTgoWFksIFhpLCBZaSwgciwgX1gsIEIzMiwgeClcblxuICAgIGlmICh0aWNrQ2FsbGJhY2spIHRpY2tDYWxsYmFjaygpXG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgbGV0IG9mZnNldCA9IFhpICsgKDIgKiByIC0gMSkgKiA2NFxuICAgIGxldCBqID0gWFkucmVhZFVJbnQzMkxFKG9mZnNldCkgJiAoTiAtIDEpXG4gICAgYmxvY2t4b3IoViwgaiAqIFlpLCBYWSwgWGksIFlpKVxuICAgIGJsb2NrbWl4X3NhbHNhOChYWSwgWGksIFlpLCByLCBfWCwgQjMyLCB4KVxuXG4gICAgaWYgKHRpY2tDYWxsYmFjaykgdGlja0NhbGxiYWNrKClcbiAgfVxuXG4gIFhZLmNvcHkoQiwgQmksIFhpLCBYaSArIFlpKVxufVxuXG5mdW5jdGlvbiBibG9ja21peF9zYWxzYTggKEJZLCBCaSwgWWksIHIsIF9YLCBCMzIsIHgpIHtcbiAgbGV0IGlcblxuICBhcnJheWNvcHkoQlksIEJpICsgKDIgKiByIC0gMSkgKiA2NCwgX1gsIDAsIDY0KVxuXG4gIGZvciAoaSA9IDA7IGkgPCAyICogcjsgaSsrKSB7XG4gICAgYmxvY2t4b3IoQlksIGkgKiA2NCwgX1gsIDAsIDY0KVxuICAgIHNhbHNhMjBfOChfWCwgQjMyLCB4KVxuICAgIGFycmF5Y29weShfWCwgMCwgQlksIFlpICsgKGkgKiA2NCksIDY0KVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHI7IGkrKykge1xuICAgIGFycmF5Y29weShCWSwgWWkgKyAoaSAqIDIpICogNjQsIEJZLCBCaSArIChpICogNjQpLCA2NClcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCByOyBpKyspIHtcbiAgICBhcnJheWNvcHkoQlksIFlpICsgKGkgKiAyICsgMSkgKiA2NCwgQlksIEJpICsgKGkgKyByKSAqIDY0LCA2NClcbiAgfVxufVxuXG5mdW5jdGlvbiBSIChhLCBiKSB7XG4gIHJldHVybiAoYSA8PCBiKSB8IChhID4+PiAoMzIgLSBiKSlcbn1cblxuZnVuY3Rpb24gc2Fsc2EyMF84IChCLCBCMzIsIHgpIHtcbiAgbGV0IGlcblxuICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgIEIzMltpXSA9IChCW2kgKiA0ICsgMF0gJiAweGZmKSA8PCAwXG4gICAgQjMyW2ldIHw9IChCW2kgKiA0ICsgMV0gJiAweGZmKSA8PCA4XG4gICAgQjMyW2ldIHw9IChCW2kgKiA0ICsgMl0gJiAweGZmKSA8PCAxNlxuICAgIEIzMltpXSB8PSAoQltpICogNCArIDNdICYgMHhmZikgPDwgMjRcbiAgICAvLyBCMzJbaV0gPSBCLnJlYWRVSW50MzJMRShpKjQpICAgPC0tLSB0aGlzIGlzIHNpZ25maWNhbnRseSBzbG93ZXIgZXZlbiBpbiBOb2RlLmpzXG4gIH1cblxuICBhcnJheWNvcHkoQjMyLCAwLCB4LCAwLCAxNilcblxuICBmb3IgKGkgPSA4OyBpID4gMDsgaSAtPSAyKSB7XG4gICAgeFs0XSBePSBSKHhbMF0gKyB4WzEyXSwgNylcbiAgICB4WzhdIF49IFIoeFs0XSArIHhbMF0sIDkpXG4gICAgeFsxMl0gXj0gUih4WzhdICsgeFs0XSwgMTMpXG4gICAgeFswXSBePSBSKHhbMTJdICsgeFs4XSwgMTgpXG4gICAgeFs5XSBePSBSKHhbNV0gKyB4WzFdLCA3KVxuICAgIHhbMTNdIF49IFIoeFs5XSArIHhbNV0sIDkpXG4gICAgeFsxXSBePSBSKHhbMTNdICsgeFs5XSwgMTMpXG4gICAgeFs1XSBePSBSKHhbMV0gKyB4WzEzXSwgMTgpXG4gICAgeFsxNF0gXj0gUih4WzEwXSArIHhbNl0sIDcpXG4gICAgeFsyXSBePSBSKHhbMTRdICsgeFsxMF0sIDkpXG4gICAgeFs2XSBePSBSKHhbMl0gKyB4WzE0XSwgMTMpXG4gICAgeFsxMF0gXj0gUih4WzZdICsgeFsyXSwgMTgpXG4gICAgeFszXSBePSBSKHhbMTVdICsgeFsxMV0sIDcpXG4gICAgeFs3XSBePSBSKHhbM10gKyB4WzE1XSwgOSlcbiAgICB4WzExXSBePSBSKHhbN10gKyB4WzNdLCAxMylcbiAgICB4WzE1XSBePSBSKHhbMTFdICsgeFs3XSwgMTgpXG4gICAgeFsxXSBePSBSKHhbMF0gKyB4WzNdLCA3KVxuICAgIHhbMl0gXj0gUih4WzFdICsgeFswXSwgOSlcbiAgICB4WzNdIF49IFIoeFsyXSArIHhbMV0sIDEzKVxuICAgIHhbMF0gXj0gUih4WzNdICsgeFsyXSwgMTgpXG4gICAgeFs2XSBePSBSKHhbNV0gKyB4WzRdLCA3KVxuICAgIHhbN10gXj0gUih4WzZdICsgeFs1XSwgOSlcbiAgICB4WzRdIF49IFIoeFs3XSArIHhbNl0sIDEzKVxuICAgIHhbNV0gXj0gUih4WzRdICsgeFs3XSwgMTgpXG4gICAgeFsxMV0gXj0gUih4WzEwXSArIHhbOV0sIDcpXG4gICAgeFs4XSBePSBSKHhbMTFdICsgeFsxMF0sIDkpXG4gICAgeFs5XSBePSBSKHhbOF0gKyB4WzExXSwgMTMpXG4gICAgeFsxMF0gXj0gUih4WzldICsgeFs4XSwgMTgpXG4gICAgeFsxMl0gXj0gUih4WzE1XSArIHhbMTRdLCA3KVxuICAgIHhbMTNdIF49IFIoeFsxMl0gKyB4WzE1XSwgOSlcbiAgICB4WzE0XSBePSBSKHhbMTNdICsgeFsxMl0sIDEzKVxuICAgIHhbMTVdIF49IFIoeFsxNF0gKyB4WzEzXSwgMTgpXG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgMTY7ICsraSkgQjMyW2ldID0geFtpXSArIEIzMltpXVxuXG4gIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgbGV0IGJpID0gaSAqIDRcbiAgICBCW2JpICsgMF0gPSAoQjMyW2ldID4+IDAgJiAweGZmKVxuICAgIEJbYmkgKyAxXSA9IChCMzJbaV0gPj4gOCAmIDB4ZmYpXG4gICAgQltiaSArIDJdID0gKEIzMltpXSA+PiAxNiAmIDB4ZmYpXG4gICAgQltiaSArIDNdID0gKEIzMltpXSA+PiAyNCAmIDB4ZmYpXG4gICAgLy8gQi53cml0ZUludDMyTEUoQjMyW2ldLCBpKjQpICAvLzwtLS0gdGhpcyBpcyBzaWduZmljYW50bHkgc2xvd2VyIGV2ZW4gaW4gTm9kZS5qc1xuICB9XG59XG5cbi8vIG5haXZlIGFwcHJvYWNoLi4uIGdvaW5nIGJhY2sgdG8gbG9vcCB1bnJvbGxpbmcgbWF5IHlpZWxkIGFkZGl0aW9uYWwgcGVyZm9ybWFuY2VcbmZ1bmN0aW9uIGJsb2NreG9yIChTLCBTaSwgRCwgRGksIGxlbikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgRFtEaSArIGldIF49IFNbU2kgKyBpXVxuICB9XG59XG5cbmZ1bmN0aW9uIGFycmF5Y29weSAoc3JjLCBzcmNQb3MsIGRlc3QsIGRlc3RQb3MsIGxlbmd0aCkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHNyYykgJiYgQnVmZmVyLmlzQnVmZmVyKGRlc3QpKSB7XG4gICAgc3JjLmNvcHkoZGVzdCwgZGVzdFBvcywgc3JjUG9zLCBzcmNQb3MgKyBsZW5ndGgpXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBkZXN0W2Rlc3RQb3MrK10gPSBzcmNbc3JjUG9zKytdXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjaGVja0FuZEluaXQsXG4gIHNtaXgsXG4gIHNtaXhTeW5jXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCTiA9IHJlcXVpcmUoXCJibi5qc1wiKTtcbi8qKlxuICogUkxQIEVuY29kaW5nIGJhc2VkIG9uOiBodHRwczovL2dpdGh1Yi5jb20vZXRoZXJldW0vd2lraS93aWtpLyU1QkVuZ2xpc2glNUQtUkxQXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGluIGEgZGF0YSwgY29udmVydCBpdCB0byBidWZmZXIgaWYgbm90LCBhbmQgYSBsZW5ndGggZm9yIHJlY3Vyc2lvblxuICogQHBhcmFtIGlucHV0IC0gd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYnVmZmVyXG4gKiBAcmV0dXJucyByZXR1cm5zIGJ1ZmZlciBvZiBlbmNvZGVkIGRhdGFcbiAqKi9cbmZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGVuY29kZShpbnB1dFtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBidWYgPSBCdWZmZXIuY29uY2F0KG91dHB1dCk7XG4gICAgICAgIHJldHVybiBCdWZmZXIuY29uY2F0KFtlbmNvZGVMZW5ndGgoYnVmLmxlbmd0aCwgMTkyKSwgYnVmXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgaW5wdXRCdWYgPSB0b0J1ZmZlcihpbnB1dCk7XG4gICAgICAgIHJldHVybiBpbnB1dEJ1Zi5sZW5ndGggPT09IDEgJiYgaW5wdXRCdWZbMF0gPCAxMjhcbiAgICAgICAgICAgID8gaW5wdXRCdWZcbiAgICAgICAgICAgIDogQnVmZmVyLmNvbmNhdChbZW5jb2RlTGVuZ3RoKGlucHV0QnVmLmxlbmd0aCwgMTI4KSwgaW5wdXRCdWZdKTtcbiAgICB9XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbi8qKlxuICogUGFyc2UgaW50ZWdlcnMuIENoZWNrIGlmIHRoZXJlIGlzIG5vIGxlYWRpbmcgemVyb3NcbiAqIEBwYXJhbSB2IFRoZSB2YWx1ZSB0byBwYXJzZVxuICogQHBhcmFtIGJhc2UgVGhlIGJhc2UgdG8gcGFyc2UgdGhlIGludGVnZXIgaW50b1xuICovXG5mdW5jdGlvbiBzYWZlUGFyc2VJbnQodiwgYmFzZSkge1xuICAgIGlmICh2LnNsaWNlKDAsIDIpID09PSAnMDAnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBSTFA6IGV4dHJhIHplcm9zJyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUludCh2LCBiYXNlKTtcbn1cbmZ1bmN0aW9uIGVuY29kZUxlbmd0aChsZW4sIG9mZnNldCkge1xuICAgIGlmIChsZW4gPCA1Nikge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oW2xlbiArIG9mZnNldF0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGhleExlbmd0aCA9IGludFRvSGV4KGxlbik7XG4gICAgICAgIHZhciBsTGVuZ3RoID0gaGV4TGVuZ3RoLmxlbmd0aCAvIDI7XG4gICAgICAgIHZhciBmaXJzdEJ5dGUgPSBpbnRUb0hleChvZmZzZXQgKyA1NSArIGxMZW5ndGgpO1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oZmlyc3RCeXRlICsgaGV4TGVuZ3RoLCAnaGV4Jyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVjb2RlKGlucHV0LCBzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtID09PSB2b2lkIDApIHsgc3RyZWFtID0gZmFsc2U7IH1cbiAgICBpZiAoIWlucHV0IHx8IGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oW10pO1xuICAgIH1cbiAgICB2YXIgaW5wdXRCdWZmZXIgPSB0b0J1ZmZlcihpbnB1dCk7XG4gICAgdmFyIGRlY29kZWQgPSBfZGVjb2RlKGlucHV0QnVmZmVyKTtcbiAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVkO1xuICAgIH1cbiAgICBpZiAoZGVjb2RlZC5yZW1haW5kZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCByZW1haW5kZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZWQuZGF0YTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgUkxQIGlucHV0XG4gKiBAcGFyYW0gaW5wdXRcbiAqIEByZXR1cm5zIFRoZSBsZW5ndGggb2YgdGhlIGlucHV0IG9yIGFuIGVtcHR5IEJ1ZmZlciBpZiBubyBpbnB1dFxuICovXG5mdW5jdGlvbiBnZXRMZW5ndGgoaW5wdXQpIHtcbiAgICBpZiAoIWlucHV0IHx8IGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oW10pO1xuICAgIH1cbiAgICB2YXIgaW5wdXRCdWZmZXIgPSB0b0J1ZmZlcihpbnB1dCk7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGlucHV0QnVmZmVyWzBdO1xuICAgIGlmIChmaXJzdEJ5dGUgPD0gMHg3Zikge1xuICAgICAgICByZXR1cm4gaW5wdXRCdWZmZXIubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIGlmIChmaXJzdEJ5dGUgPD0gMHhiNykge1xuICAgICAgICByZXR1cm4gZmlyc3RCeXRlIC0gMHg3ZjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlyc3RCeXRlIDw9IDB4YmYpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0Qnl0ZSAtIDB4YjY7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpcnN0Qnl0ZSA8PSAweGY3KSB7XG4gICAgICAgIC8vIGEgbGlzdCBiZXR3ZWVuICAwLTU1IGJ5dGVzIGxvbmdcbiAgICAgICAgcmV0dXJuIGZpcnN0Qnl0ZSAtIDB4YmY7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhIGxpc3QgIG92ZXIgNTUgYnl0ZXMgbG9uZ1xuICAgICAgICB2YXIgbGxlbmd0aCA9IGZpcnN0Qnl0ZSAtIDB4ZjY7XG4gICAgICAgIHZhciBsZW5ndGggPSBzYWZlUGFyc2VJbnQoaW5wdXRCdWZmZXIuc2xpY2UoMSwgbGxlbmd0aCkudG9TdHJpbmcoJ2hleCcpLCAxNik7XG4gICAgICAgIHJldHVybiBsbGVuZ3RoICsgbGVuZ3RoO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TGVuZ3RoID0gZ2V0TGVuZ3RoO1xuLyoqIERlY29kZSBhbiBpbnB1dCB3aXRoIFJMUCAqL1xuZnVuY3Rpb24gX2RlY29kZShpbnB1dCkge1xuICAgIHZhciBsZW5ndGgsIGxsZW5ndGgsIGRhdGEsIGlubmVyUmVtYWluZGVyLCBkO1xuICAgIHZhciBkZWNvZGVkID0gW107XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGlucHV0WzBdO1xuICAgIGlmIChmaXJzdEJ5dGUgPD0gMHg3Zikge1xuICAgICAgICAvLyBhIHNpbmdsZSBieXRlIHdob3NlIHZhbHVlIGlzIGluIHRoZSBbMHgwMCwgMHg3Zl0gcmFuZ2UsIHRoYXQgYnl0ZSBpcyBpdHMgb3duIFJMUCBlbmNvZGluZy5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IGlucHV0LnNsaWNlKDAsIDEpLFxuICAgICAgICAgICAgcmVtYWluZGVyOiBpbnB1dC5zbGljZSgxKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlyc3RCeXRlIDw9IDB4YjcpIHtcbiAgICAgICAgLy8gc3RyaW5nIGlzIDAtNTUgYnl0ZXMgbG9uZy4gQSBzaW5nbGUgYnl0ZSB3aXRoIHZhbHVlIDB4ODAgcGx1cyB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgZm9sbG93ZWQgYnkgdGhlIHN0cmluZ1xuICAgICAgICAvLyBUaGUgcmFuZ2Ugb2YgdGhlIGZpcnN0IGJ5dGUgaXMgWzB4ODAsIDB4YjddXG4gICAgICAgIGxlbmd0aCA9IGZpcnN0Qnl0ZSAtIDB4N2Y7XG4gICAgICAgIC8vIHNldCAweDgwIG51bGwgdG8gMFxuICAgICAgICBpZiAoZmlyc3RCeXRlID09PSAweDgwKSB7XG4gICAgICAgICAgICBkYXRhID0gQnVmZmVyLmZyb20oW10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGlucHV0LnNsaWNlKDEsIGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMiAmJiBkYXRhWzBdIDwgMHg4MCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJscCBlbmNvZGluZzogYnl0ZSBtdXN0IGJlIGxlc3MgMHg4MCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcmVtYWluZGVyOiBpbnB1dC5zbGljZShsZW5ndGgpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChmaXJzdEJ5dGUgPD0gMHhiZikge1xuICAgICAgICBsbGVuZ3RoID0gZmlyc3RCeXRlIC0gMHhiNjtcbiAgICAgICAgbGVuZ3RoID0gc2FmZVBhcnNlSW50KGlucHV0LnNsaWNlKDEsIGxsZW5ndGgpLnRvU3RyaW5nKCdoZXgnKSwgMTYpO1xuICAgICAgICBkYXRhID0gaW5wdXQuc2xpY2UobGxlbmd0aCwgbGVuZ3RoICsgbGxlbmd0aCk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIFJMUCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcmVtYWluZGVyOiBpbnB1dC5zbGljZShsZW5ndGggKyBsbGVuZ3RoKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlyc3RCeXRlIDw9IDB4ZjcpIHtcbiAgICAgICAgLy8gYSBsaXN0IGJldHdlZW4gIDAtNTUgYnl0ZXMgbG9uZ1xuICAgICAgICBsZW5ndGggPSBmaXJzdEJ5dGUgLSAweGJmO1xuICAgICAgICBpbm5lclJlbWFpbmRlciA9IGlucHV0LnNsaWNlKDEsIGxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChpbm5lclJlbWFpbmRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGQgPSBfZGVjb2RlKGlubmVyUmVtYWluZGVyKTtcbiAgICAgICAgICAgIGRlY29kZWQucHVzaChkLmRhdGEpO1xuICAgICAgICAgICAgaW5uZXJSZW1haW5kZXIgPSBkLnJlbWFpbmRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogZGVjb2RlZCxcbiAgICAgICAgICAgIHJlbWFpbmRlcjogaW5wdXQuc2xpY2UobGVuZ3RoKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGEgbGlzdCAgb3ZlciA1NSBieXRlcyBsb25nXG4gICAgICAgIGxsZW5ndGggPSBmaXJzdEJ5dGUgLSAweGY2O1xuICAgICAgICBsZW5ndGggPSBzYWZlUGFyc2VJbnQoaW5wdXQuc2xpY2UoMSwgbGxlbmd0aCkudG9TdHJpbmcoJ2hleCcpLCAxNik7XG4gICAgICAgIHZhciB0b3RhbExlbmd0aCA9IGxsZW5ndGggKyBsZW5ndGg7XG4gICAgICAgIGlmICh0b3RhbExlbmd0aCA+IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJscDogdG90YWwgbGVuZ3RoIGlzIGxhcmdlciB0aGFuIHRoZSBkYXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5uZXJSZW1haW5kZXIgPSBpbnB1dC5zbGljZShsbGVuZ3RoLCB0b3RhbExlbmd0aCk7XG4gICAgICAgIGlmIChpbm5lclJlbWFpbmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBybHAsIExpc3QgaGFzIGEgaW52YWxpZCBsZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaW5uZXJSZW1haW5kZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBkID0gX2RlY29kZShpbm5lclJlbWFpbmRlcik7XG4gICAgICAgICAgICBkZWNvZGVkLnB1c2goZC5kYXRhKTtcbiAgICAgICAgICAgIGlubmVyUmVtYWluZGVyID0gZC5yZW1haW5kZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZWQsXG4gICAgICAgICAgICByZW1haW5kZXI6IGlucHV0LnNsaWNlKHRvdGFsTGVuZ3RoKSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4vKiogQ2hlY2sgaWYgYSBzdHJpbmcgaXMgcHJlZml4ZWQgYnkgMHggKi9cbmZ1bmN0aW9uIGlzSGV4UHJlZml4ZWQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCAyKSA9PT0gJzB4Jztcbn1cbi8qKiBSZW1vdmVzIDB4IGZyb20gYSBnaXZlbiBTdHJpbmcgKi9cbmZ1bmN0aW9uIHN0cmlwSGV4UHJlZml4KHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gaXNIZXhQcmVmaXhlZChzdHIpID8gc3RyLnNsaWNlKDIpIDogc3RyO1xufVxuLyoqIFRyYW5zZm9ybSBhbiBpbnRlZ2VyIGludG8gaXRzIGhleGFkZWNpbWFsIHZhbHVlICovXG5mdW5jdGlvbiBpbnRUb0hleChpbnRlZ2VyKSB7XG4gICAgaWYgKGludGVnZXIgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnRlZ2VyIGFzIGFyZ3VtZW50LCBtdXN0IGJlIHVuc2lnbmVkIScpO1xuICAgIH1cbiAgICB2YXIgaGV4ID0gaW50ZWdlci50b1N0cmluZygxNik7XG4gICAgcmV0dXJuIGhleC5sZW5ndGggJSAyID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG4vKiogUGFkIGEgc3RyaW5nIHRvIGJlIGV2ZW4gKi9cbmZ1bmN0aW9uIHBhZFRvRXZlbihhKSB7XG4gICAgcmV0dXJuIGEubGVuZ3RoICUgMiA/IFwiMFwiICsgYSA6IGE7XG59XG4vKiogVHJhbnNmb3JtIGFuIGludGVnZXIgaW50byBhIEJ1ZmZlciAqL1xuZnVuY3Rpb24gaW50VG9CdWZmZXIoaW50ZWdlcikge1xuICAgIHZhciBoZXggPSBpbnRUb0hleChpbnRlZ2VyKTtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oaGV4LCAnaGV4Jyk7XG59XG4vKiogVHJhbnNmb3JtIGFueXRoaW5nIGludG8gYSBCdWZmZXIgKi9cbmZ1bmN0aW9uIHRvQnVmZmVyKHYpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih2KSkge1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoaXNIZXhQcmVmaXhlZCh2KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShwYWRUb0V2ZW4oc3RyaXBIZXhQcmVmaXgodikpLCAnaGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20odik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludFRvQnVmZmVyKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHYgPT09IG51bGwgfHwgdiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oW10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHYgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20odik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQk4uaXNCTih2KSkge1xuICAgICAgICAgICAgLy8gY29udmVydHMgYSBCTiB0byBhIEJ1ZmZlclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHYudG9BcnJheSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0eXBlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5jbGFzcyBCb25kIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pZCA9IDA7XG5cdFx0dGhpcy5pZGVudGl0eSA9IDA7XG5cdFx0dGhpcy50aXRsZSA9ICcnO1xuXHRcdHRoaXMuZGV0YWlscyA9ICcnO1xuXHRcdHRoaXMuc3RhcnRfdGltZSA9IDA7XG5cdFx0dGhpcy5leHBpcmVzID0gMDtcblx0XHR0aGlzLmxpbWl0ID0gbnVsbDtcblx0XHR0aGlzLnZvdGVzID0gbnVsbDtcblx0XHR0aGlzLmZpeGVkX3BhcnR5ID0gbnVsbDtcblx0fVxuXG5cdHN0YXRpYyBwbGFjZWhvbGRlcigpIHtcblx0XHRyZXR1cm4gbmV3IEJvbmQoKTtcblx0fVxuXHRzdGF0aWMgZnJvbUpzb24oanNvbikge1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKEJvbmQucGxhY2Vob2xkZXIoKSwganNvbik7XG5cdH1cblxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQm9uZDsiLCI7KGZ1bmN0aW9uKGdsb2JhbCkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBuZXh0VGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfVxuaWYgKHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHByb2Nlc3MgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT0gJ2Z1bmN0aW9uJykge1xuXHQvLyBub2RlLmpzIGFuZCB0aGUgbGlrZVxuXHRuZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG59XG5cbmZ1bmN0aW9uIHNlbWFwaG9yZShjYXBhY2l0eSkge1xuXHR2YXIgc2VtYXBob3JlID0ge1xuXHRcdGNhcGFjaXR5OiBjYXBhY2l0eSB8fCAxLFxuXHRcdGN1cnJlbnQ6IDAsXG5cdFx0cXVldWU6IFtdLFxuXHRcdGZpcnN0SGVyZTogZmFsc2UsXG5cblx0XHR0YWtlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChzZW1hcGhvcmUuZmlyc3RIZXJlID09PSBmYWxzZSkge1xuICAgICAgICBcdFx0XHRzZW1hcGhvcmUuY3VycmVudCsrO1xuICAgICAgICBcdFx0XHRzZW1hcGhvcmUuZmlyc3RIZXJlID0gdHJ1ZTtcbiAgICAgICAgXHRcdFx0dmFyIGlzRmlyc3QgPSAxO1xuICAgICAgXHRcdFx0fSBlbHNlIHtcbiAgICAgICAgXHRcdFx0dmFyIGlzRmlyc3QgPSAwO1xuICAgICAgXHRcdFx0fVxuXHRcdFx0dmFyIGl0ZW0gPSB7IG46IDEgfTtcblxuXHRcdFx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRpdGVtLnRhc2sgPSBhcmd1bWVudHNbMF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpdGVtLm4gPSBhcmd1bWVudHNbMF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpICB7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09ICdmdW5jdGlvbicpIGl0ZW0udGFzayA9IGFyZ3VtZW50c1sxXTtcblx0XHRcdFx0ZWxzZSBpdGVtLm4gPSBhcmd1bWVudHNbMV07XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0YXNrID0gaXRlbS50YXNrO1xuXHRcdFx0aXRlbS50YXNrID0gZnVuY3Rpb24oKSB7IHRhc2soc2VtYXBob3JlLmxlYXZlKTsgfTtcblxuXHRcdFx0aWYgKHNlbWFwaG9yZS5jdXJyZW50ICsgaXRlbS5uIC0gaXNGaXJzdCA+IHNlbWFwaG9yZS5jYXBhY2l0eSkge1xuICAgICAgICBcdFx0XHRpZiAoaXNGaXJzdCA9PT0gMSkge1xuICAgICAgICBcdFx0XHRcdHNlbWFwaG9yZS5jdXJyZW50LS07XG4gICAgICAgIFx0XHRcdFx0c2VtYXBob3JlLmZpcnN0SGVyZSA9IGZhbHNlO1xuICAgICAgICBcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZW1hcGhvcmUucXVldWUucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0c2VtYXBob3JlLmN1cnJlbnQgKz0gaXRlbS5uIC0gaXNGaXJzdDtcblx0XHRcdGl0ZW0udGFzayhzZW1hcGhvcmUubGVhdmUpO1xuICAgICAgXHRcdFx0aWYgKGlzRmlyc3QgPT09IDEpIHNlbWFwaG9yZS5maXJzdEhlcmUgPSBmYWxzZTtcblx0XHR9LFxuXG5cdFx0bGVhdmU6IGZ1bmN0aW9uKG4pIHtcblx0XHRcdG4gPSBuIHx8IDE7XG5cblx0XHRcdHNlbWFwaG9yZS5jdXJyZW50IC09IG47XG5cblx0XHRcdGlmICghc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCkge1xuXHRcdFx0XHRpZiAoc2VtYXBob3JlLmN1cnJlbnQgPCAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdsZWF2ZSBjYWxsZWQgdG9vIG1hbnkgdGltZXMuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpdGVtID0gc2VtYXBob3JlLnF1ZXVlWzBdO1xuXG5cdFx0XHRpZiAoaXRlbS5uICsgc2VtYXBob3JlLmN1cnJlbnQgPiBzZW1hcGhvcmUuY2FwYWNpdHkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRzZW1hcGhvcmUucXVldWUuc2hpZnQoKTtcblx0XHRcdHNlbWFwaG9yZS5jdXJyZW50ICs9IGl0ZW0ubjtcblxuXHRcdFx0bmV4dFRpY2soaXRlbS50YXNrKTtcblx0XHR9LFxuXG5cdFx0YXZhaWxhYmxlOiBmdW5jdGlvbihuKSB7XG5cdFx0XHRuID0gbiB8fCAxO1xuXHRcdFx0cmV0dXJuKHNlbWFwaG9yZS5jdXJyZW50ICsgbiA8PSBzZW1hcGhvcmUuY2FwYWNpdHkpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gc2VtYXBob3JlO1xufTtcblxuaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIG5vZGUgZXhwb3J0XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZW1hcGhvcmU7XG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIGFtZCBleHBvcnRcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VtYXBob3JlO1xuICAgIH0pO1xufSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGdsb2JhbC5zZW1hcGhvcmUgPSBzZW1hcGhvcmU7XG59XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZmluZ2VycHJpbnRlZCA9IHVuZGVmaW5lZDtcblxudmFyIF9tdXJtdXJoYXNoID0gcmVxdWlyZSgnbXVybXVyaGFzaCcpO1xuXG52YXIgX211cm11cmhhc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbXVybXVyaGFzaCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IGZpbmdlcnByaW50ZWQgPSBleHBvcnRzLmZpbmdlcnByaW50ZWQgPSBkYXRhID0+IF9tdXJtdXJoYXNoMi5kZWZhdWx0LnYyKGRhdGEudG9Mb3dlckNhc2UoKSk7IiwiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwbmEgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhZGFibGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5SZWFkYWJsZS5SZWFkYWJsZVN0YXRlID0gUmVhZGFibGVTdGF0ZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIEVFbGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIChlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVycyh0eXBlKS5sZW5ndGg7XG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgU3RyZWFtID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5mdW5jdGlvbiBfaXNVaW50OEFycmF5KG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgb2JqIGluc3RhbmNlb2YgT3VyVWludDhBcnJheTtcbn1cblxuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBkZWJ1Z1V0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgZGVidWcgPSB2b2lkIDA7XG5pZiAoZGVidWdVdGlsICYmIGRlYnVnVXRpbC5kZWJ1Z2xvZykge1xuICBkZWJ1ZyA9IGRlYnVnVXRpbC5kZWJ1Z2xvZygnc3RyZWFtJyk7XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9O1xufVxuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXJMaXN0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL0J1ZmZlckxpc3QnKTtcbnZhciBkZXN0cm95SW1wbCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9kZXN0cm95Jyk7XG52YXIgU3RyaW5nRGVjb2RlcjtcblxudXRpbC5pbmhlcml0cyhSZWFkYWJsZSwgU3RyZWFtKTtcblxudmFyIGtQcm94eUV2ZW50cyA9IFsnZXJyb3InLCAnY2xvc2UnLCAnZGVzdHJveScsICdwYXVzZScsICdyZXN1bWUnXTtcblxuZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbikge1xuICAvLyBTYWRseSB0aGlzIGlzIG5vdCBjYWNoZWFibGUgYXMgc29tZSBsaWJyYXJpZXMgYnVuZGxlIHRoZWlyIG93blxuICAvLyBldmVudCBlbWl0dGVyIGltcGxlbWVudGF0aW9uIHdpdGggdGhlbS5cbiAgaWYgKHR5cGVvZiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGVtaXR0ZXIucHJlcGVuZExpc3RlbmVyKGV2ZW50LCBmbik7XG5cbiAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gbWFrZSBzdXJlIHRoYXQgb3VyIGVycm9yIGhhbmRsZXIgaXMgYXR0YWNoZWQgYmVmb3JlIGFueVxuICAvLyB1c2VybGFuZCBvbmVzLiAgTkVWRVIgRE8gVEhJUy4gVGhpcyBpcyBoZXJlIG9ubHkgYmVjYXVzZSB0aGlzIGNvZGUgbmVlZHNcbiAgLy8gdG8gY29udGludWUgdG8gd29yayB3aXRoIG9sZGVyIHZlcnNpb25zIG9mIE5vZGUuanMgdGhhdCBkbyBub3QgaW5jbHVkZVxuICAvLyB0aGUgcHJlcGVuZExpc3RlbmVyKCkgbWV0aG9kLiBUaGUgZ29hbCBpcyB0byBldmVudHVhbGx5IHJlbW92ZSB0aGlzIGhhY2suXG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSBlbWl0dGVyLm9uKGV2ZW50LCBmbik7ZWxzZSBpZiAoaXNBcnJheShlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSkgZW1pdHRlci5fZXZlbnRzW2V2ZW50XS51bnNoaWZ0KGZuKTtlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldmVudF0gPSBbZm4sIGVtaXR0ZXIuX2V2ZW50c1tldmVudF1dO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZVN0YXRlKG9wdGlvbnMsIHN0cmVhbSkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIER1cGxleCBzdHJlYW1zIGFyZSBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZSwgYnV0IHNoYXJlXG4gIC8vIHRoZSBzYW1lIG9wdGlvbnMgb2JqZWN0LlxuICAvLyBIb3dldmVyLCBzb21lIGNhc2VzIHJlcXVpcmUgc2V0dGluZyBvcHRpb25zIHRvIGRpZmZlcmVudFxuICAvLyB2YWx1ZXMgZm9yIHRoZSByZWFkYWJsZSBhbmQgdGhlIHdyaXRhYmxlIHNpZGVzIG9mIHRoZSBkdXBsZXggc3RyZWFtLlxuICAvLyBUaGVzZSBvcHRpb25zIGNhbiBiZSBwcm92aWRlZCBzZXBhcmF0ZWx5IGFzIHJlYWRhYmxlWFhYIGFuZCB3cml0YWJsZVhYWC5cbiAgdmFyIGlzRHVwbGV4ID0gc3RyZWFtIGluc3RhbmNlb2YgRHVwbGV4O1xuXG4gIC8vIG9iamVjdCBzdHJlYW0gZmxhZy4gVXNlZCB0byBtYWtlIHJlYWQobikgaWdub3JlIG4gYW5kIHRvXG4gIC8vIG1ha2UgYWxsIHRoZSBidWZmZXIgbWVyZ2luZyBhbmQgbGVuZ3RoIGNoZWNrcyBnbyBhd2F5XG4gIHRoaXMub2JqZWN0TW9kZSA9ICEhb3B0aW9ucy5vYmplY3RNb2RlO1xuXG4gIGlmIChpc0R1cGxleCkgdGhpcy5vYmplY3RNb2RlID0gdGhpcy5vYmplY3RNb2RlIHx8ICEhb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGU7XG5cbiAgLy8gdGhlIHBvaW50IGF0IHdoaWNoIGl0IHN0b3BzIGNhbGxpbmcgX3JlYWQoKSB0byBmaWxsIHRoZSBidWZmZXJcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyBcImRvbid0IGNhbGwgX3JlYWQgcHJlZW1wdGl2ZWx5IGV2ZXJcIlxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgcmVhZGFibGVId20gPSBvcHRpb25zLnJlYWRhYmxlSGlnaFdhdGVyTWFyaztcbiAgdmFyIGRlZmF1bHRId20gPSB0aGlzLm9iamVjdE1vZGUgPyAxNiA6IDE2ICogMTAyNDtcblxuICBpZiAoaHdtIHx8IGh3bSA9PT0gMCkgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO2Vsc2UgaWYgKGlzRHVwbGV4ICYmIChyZWFkYWJsZUh3bSB8fCByZWFkYWJsZUh3bSA9PT0gMCkpIHRoaXMuaGlnaFdhdGVyTWFyayA9IHJlYWRhYmxlSHdtO2Vsc2UgdGhpcy5oaWdoV2F0ZXJNYXJrID0gZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IE1hdGguZmxvb3IodGhpcy5oaWdoV2F0ZXJNYXJrKTtcblxuICAvLyBBIGxpbmtlZCBsaXN0IGlzIHVzZWQgdG8gc3RvcmUgZGF0YSBjaHVua3MgaW5zdGVhZCBvZiBhbiBhcnJheSBiZWNhdXNlIHRoZVxuICAvLyBsaW5rZWQgbGlzdCBjYW4gcmVtb3ZlIGVsZW1lbnRzIGZyb20gdGhlIGJlZ2lubmluZyBmYXN0ZXIgdGhhblxuICAvLyBhcnJheS5zaGlmdCgpXG4gIHRoaXMuYnVmZmVyID0gbmV3IEJ1ZmZlckxpc3QoKTtcbiAgdGhpcy5sZW5ndGggPSAwO1xuICB0aGlzLnBpcGVzID0gbnVsbDtcbiAgdGhpcy5waXBlc0NvdW50ID0gMDtcbiAgdGhpcy5mbG93aW5nID0gbnVsbDtcbiAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICB0aGlzLmVuZEVtaXR0ZWQgPSBmYWxzZTtcbiAgdGhpcy5yZWFkaW5nID0gZmFsc2U7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgZXZlbnQgJ3JlYWRhYmxlJy8nZGF0YScgaXMgZW1pdHRlZFxuICAvLyBpbW1lZGlhdGVseSwgb3Igb24gYSBsYXRlciB0aWNrLiAgV2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhdCBmaXJzdCwgYmVjYXVzZVxuICAvLyBhbnkgYWN0aW9ucyB0aGF0IHNob3VsZG4ndCBoYXBwZW4gdW50aWwgXCJsYXRlclwiIHNob3VsZCBnZW5lcmFsbHkgYWxzb1xuICAvLyBub3QgaGFwcGVuIGJlZm9yZSB0aGUgZmlyc3QgcmVhZCBjYWxsLlxuICB0aGlzLnN5bmMgPSB0cnVlO1xuXG4gIC8vIHdoZW5ldmVyIHdlIHJldHVybiBudWxsLCB0aGVuIHdlIHNldCBhIGZsYWcgdG8gc2F5XG4gIC8vIHRoYXQgd2UncmUgYXdhaXRpbmcgYSAncmVhZGFibGUnIGV2ZW50IGVtaXNzaW9uLlxuICB0aGlzLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuICB0aGlzLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICB0aGlzLnJlYWRhYmxlTGlzdGVuaW5nID0gZmFsc2U7XG4gIHRoaXMucmVzdW1lU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgLy8gaGFzIGl0IGJlZW4gZGVzdHJveWVkXG4gIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgLy8gQ3J5cHRvIGlzIGtpbmQgb2Ygb2xkIGFuZCBjcnVzdHkuICBIaXN0b3JpY2FsbHksIGl0cyBkZWZhdWx0IHN0cmluZ1xuICAvLyBlbmNvZGluZyBpcyAnYmluYXJ5JyBzbyB3ZSBoYXZlIHRvIG1ha2UgdGhpcyBjb25maWd1cmFibGUuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgdW5pdmVyc2UgdXNlcyAndXRmOCcsIHRob3VnaC5cbiAgdGhpcy5kZWZhdWx0RW5jb2RpbmcgPSBvcHRpb25zLmRlZmF1bHRFbmNvZGluZyB8fCAndXRmOCc7XG5cbiAgLy8gdGhlIG51bWJlciBvZiB3cml0ZXJzIHRoYXQgYXJlIGF3YWl0aW5nIGEgZHJhaW4gZXZlbnQgaW4gLnBpcGUoKXNcbiAgdGhpcy5hd2FpdERyYWluID0gMDtcblxuICAvLyBpZiB0cnVlLCBhIG1heWJlUmVhZE1vcmUgaGFzIGJlZW4gc2NoZWR1bGVkXG4gIHRoaXMucmVhZGluZ01vcmUgPSBmYWxzZTtcblxuICB0aGlzLmRlY29kZXIgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gbnVsbDtcbiAgaWYgKG9wdGlvbnMuZW5jb2RpbmcpIHtcbiAgICBpZiAoIVN0cmluZ0RlY29kZXIpIFN0cmluZ0RlY29kZXIgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2Rlci8nKS5TdHJpbmdEZWNvZGVyO1xuICAgIHRoaXMuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgIHRoaXMuZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlKG9wdGlvbnMpIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVhZGFibGUpKSByZXR1cm4gbmV3IFJlYWRhYmxlKG9wdGlvbnMpO1xuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUgPSBuZXcgUmVhZGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3lcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucmVhZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fcmVhZCA9IG9wdGlvbnMucmVhZDtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuICB9XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZS5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAoIXRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG5cblJlYWRhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZGVzdHJveUltcGwuZGVzdHJveTtcblJlYWRhYmxlLnByb3RvdHlwZS5fdW5kZXN0cm95ID0gZGVzdHJveUltcGwudW5kZXN0cm95O1xuUmVhZGFibGUucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5wdXNoKG51bGwpO1xuICBjYihlcnIpO1xufTtcblxuLy8gTWFudWFsbHkgc2hvdmUgc29tZXRoaW5nIGludG8gdGhlIHJlYWQoKSBidWZmZXIuXG4vLyBUaGlzIHJldHVybnMgdHJ1ZSBpZiB0aGUgaGlnaFdhdGVyTWFyayBoYXMgbm90IGJlZW4gaGl0IHlldCxcbi8vIHNpbWlsYXIgdG8gaG93IFdyaXRhYmxlLndyaXRlKCkgcmV0dXJucyB0cnVlIGlmIHlvdSBzaG91bGRcbi8vIHdyaXRlKCkgc29tZSBtb3JlLlxuUmVhZGFibGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBza2lwQ2h1bmtDaGVjaztcblxuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBpZiAodHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG4gICAgICBpZiAoZW5jb2RpbmcgIT09IHN0YXRlLmVuY29kaW5nKSB7XG4gICAgICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgICAgICAgZW5jb2RpbmcgPSAnJztcbiAgICAgIH1cbiAgICAgIHNraXBDaHVua0NoZWNrID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2tpcENodW5rQ2hlY2sgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHJlYWRhYmxlQWRkQ2h1bmsodGhpcywgY2h1bmssIGVuY29kaW5nLCBmYWxzZSwgc2tpcENodW5rQ2hlY2spO1xufTtcblxuLy8gVW5zaGlmdCBzaG91bGQgKmFsd2F5cyogYmUgc29tZXRoaW5nIGRpcmVjdGx5IG91dCBvZiByZWFkKClcblJlYWRhYmxlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIGNodW5rLCBudWxsLCB0cnVlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiByZWFkYWJsZUFkZENodW5rKHN0cmVhbSwgY2h1bmssIGVuY29kaW5nLCBhZGRUb0Zyb250LCBza2lwQ2h1bmtDaGVjaykge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGlmIChjaHVuayA9PT0gbnVsbCkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICBvbkVvZkNodW5rKHN0cmVhbSwgc3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBlcjtcbiAgICBpZiAoIXNraXBDaHVua0NoZWNrKSBlciA9IGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspO1xuICAgIGlmIChlcikge1xuICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuayAmJiBjaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodHlwZW9mIGNodW5rICE9PSAnc3RyaW5nJyAmJiAhc3RhdGUub2JqZWN0TW9kZSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY2h1bmspICE9PSBCdWZmZXIucHJvdG90eXBlKSB7XG4gICAgICAgIGNodW5rID0gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuayk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGRUb0Zyb250KSB7XG4gICAgICAgIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3N0cmVhbS51bnNoaWZ0KCkgYWZ0ZXIgZW5kIGV2ZW50JykpO2Vsc2UgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5lbmRlZCkge1xuICAgICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3N0cmVhbS5wdXNoKCkgYWZ0ZXIgRU9GJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhZW5jb2RpbmcpIHtcbiAgICAgICAgICBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspO1xuICAgICAgICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlIHx8IGNodW5rLmxlbmd0aCAhPT0gMCkgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtlbHNlIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWFkZFRvRnJvbnQpIHtcbiAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmVlZE1vcmVEYXRhKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGFkZFRvRnJvbnQpIHtcbiAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmICFzdGF0ZS5zeW5jKSB7XG4gICAgc3RyZWFtLmVtaXQoJ2RhdGEnLCBjaHVuayk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdXBkYXRlIHRoZSBidWZmZXIgaW5mby5cbiAgICBzdGF0ZS5sZW5ndGggKz0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG4gICAgaWYgKGFkZFRvRnJvbnQpIHN0YXRlLmJ1ZmZlci51bnNoaWZ0KGNodW5rKTtlbHNlIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcblxuICAgIGlmIChzdGF0ZS5uZWVkUmVhZGFibGUpIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xuICB9XG4gIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspIHtcbiAgdmFyIGVyO1xuICBpZiAoIV9pc1VpbnQ4QXJyYXkoY2h1bmspICYmIHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIHJldHVybiBlcjtcbn1cblxuLy8gaWYgaXQncyBwYXN0IHRoZSBoaWdoIHdhdGVyIG1hcmssIHdlIGNhbiBwdXNoIGluIHNvbWUgbW9yZS5cbi8vIEFsc28sIGlmIHdlIGhhdmUgbm8gZGF0YSB5ZXQsIHdlIGNhbiBzdGFuZCBzb21lXG4vLyBtb3JlIGJ5dGVzLiAgVGhpcyBpcyB0byB3b3JrIGFyb3VuZCBjYXNlcyB3aGVyZSBod209MCxcbi8vIHN1Y2ggYXMgdGhlIHJlcGwuICBBbHNvLCBpZiB0aGUgcHVzaCgpIHRyaWdnZXJlZCBhXG4vLyByZWFkYWJsZSBldmVudCwgYW5kIHRoZSB1c2VyIGNhbGxlZCByZWFkKGxhcmdlTnVtYmVyKSBzdWNoIHRoYXRcbi8vIG5lZWRSZWFkYWJsZSB3YXMgc2V0LCB0aGVuIHdlIG91Z2h0IHRvIHB1c2ggbW9yZSwgc28gdGhhdCBhbm90aGVyXG4vLyAncmVhZGFibGUnIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkLlxuZnVuY3Rpb24gbmVlZE1vcmVEYXRhKHN0YXRlKSB7XG4gIHJldHVybiAhc3RhdGUuZW5kZWQgJiYgKHN0YXRlLm5lZWRSZWFkYWJsZSB8fCBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5pc1BhdXNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9PT0gZmFsc2U7XG59O1xuXG4vLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cblJlYWRhYmxlLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmMpIHtcbiAgaWYgKCFTdHJpbmdEZWNvZGVyKSBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoZW5jKTtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmNvZGluZyA9IGVuYztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBEb24ndCByYWlzZSB0aGUgaHdtID4gOE1CXG52YXIgTUFYX0hXTSA9IDB4ODAwMDAwO1xuZnVuY3Rpb24gY29tcHV0ZU5ld0hpZ2hXYXRlck1hcmsobikge1xuICBpZiAobiA+PSBNQVhfSFdNKSB7XG4gICAgbiA9IE1BWF9IV007XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBuZXh0IGhpZ2hlc3QgcG93ZXIgb2YgMiB0byBwcmV2ZW50IGluY3JlYXNpbmcgaHdtIGV4Y2Vzc2l2ZWx5IGluXG4gICAgLy8gdGlueSBhbW91bnRzXG4gICAgbi0tO1xuICAgIG4gfD0gbiA+Pj4gMTtcbiAgICBuIHw9IG4gPj4+IDI7XG4gICAgbiB8PSBuID4+PiA0O1xuICAgIG4gfD0gbiA+Pj4gODtcbiAgICBuIHw9IG4gPj4+IDE2O1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBob3dNdWNoVG9SZWFkKG4sIHN0YXRlKSB7XG4gIGlmIChuIDw9IDAgfHwgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmVuZGVkKSByZXR1cm4gMDtcbiAgaWYgKHN0YXRlLm9iamVjdE1vZGUpIHJldHVybiAxO1xuICBpZiAobiAhPT0gbikge1xuICAgIC8vIE9ubHkgZmxvdyBvbmUgYnVmZmVyIGF0IGEgdGltZVxuICAgIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCkgcmV0dXJuIHN0YXRlLmJ1ZmZlci5oZWFkLmRhdGEubGVuZ3RoO2Vsc2UgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbiAgfVxuICAvLyBJZiB3ZSdyZSBhc2tpbmcgZm9yIG1vcmUgdGhhbiB0aGUgY3VycmVudCBod20sIHRoZW4gcmFpc2UgdGhlIGh3bS5cbiAgaWYgKG4gPiBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSBzdGF0ZS5oaWdoV2F0ZXJNYXJrID0gY29tcHV0ZU5ld0hpZ2hXYXRlck1hcmsobik7XG4gIGlmIChuIDw9IHN0YXRlLmxlbmd0aCkgcmV0dXJuIG47XG4gIC8vIERvbid0IGhhdmUgZW5vdWdoXG4gIGlmICghc3RhdGUuZW5kZWQpIHtcbiAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiBzdGF0ZS5sZW5ndGg7XG59XG5cbi8vIHlvdSBjYW4gb3ZlcnJpZGUgZWl0aGVyIHRoaXMgbWV0aG9kLCBvciB0aGUgYXN5bmMgX3JlYWQobikgYmVsb3cuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIGRlYnVnKCdyZWFkJywgbik7XG4gIG4gPSBwYXJzZUludChuLCAxMCk7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBuT3JpZyA9IG47XG5cbiAgaWYgKG4gIT09IDApIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuXG4gIC8vIGlmIHdlJ3JlIGRvaW5nIHJlYWQoMCkgdG8gdHJpZ2dlciBhIHJlYWRhYmxlIGV2ZW50LCBidXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGEgYnVuY2ggb2YgZGF0YSBpbiB0aGUgYnVmZmVyLCB0aGVuIGp1c3QgdHJpZ2dlclxuICAvLyB0aGUgJ3JlYWRhYmxlJyBldmVudCBhbmQgbW92ZSBvbi5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUubmVlZFJlYWRhYmxlICYmIChzdGF0ZS5sZW5ndGggPj0gc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5lbmRlZCkpIHtcbiAgICBkZWJ1ZygncmVhZDogZW1pdFJlYWRhYmxlJywgc3RhdGUubGVuZ3RoLCBzdGF0ZS5lbmRlZCk7XG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgZW5kUmVhZGFibGUodGhpcyk7ZWxzZSBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBuID0gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSk7XG5cbiAgLy8gaWYgd2UndmUgZW5kZWQsIGFuZCB3ZSdyZSBub3cgY2xlYXIsIHRoZW4gZmluaXNoIGl0IHVwLlxuICBpZiAobiA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkge1xuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIGVuZFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gQWxsIHRoZSBhY3R1YWwgY2h1bmsgZ2VuZXJhdGlvbiBsb2dpYyBuZWVkcyB0byBiZVxuICAvLyAqYmVsb3cqIHRoZSBjYWxsIHRvIF9yZWFkLiAgVGhlIHJlYXNvbiBpcyB0aGF0IGluIGNlcnRhaW5cbiAgLy8gc3ludGhldGljIHN0cmVhbSBjYXNlcywgc3VjaCBhcyBwYXNzdGhyb3VnaCBzdHJlYW1zLCBfcmVhZFxuICAvLyBtYXkgYmUgYSBjb21wbGV0ZWx5IHN5bmNocm9ub3VzIG9wZXJhdGlvbiB3aGljaCBtYXkgY2hhbmdlXG4gIC8vIHRoZSBzdGF0ZSBvZiB0aGUgcmVhZCBidWZmZXIsIHByb3ZpZGluZyBlbm91Z2ggZGF0YSB3aGVuXG4gIC8vIGJlZm9yZSB0aGVyZSB3YXMgKm5vdCogZW5vdWdoLlxuICAvL1xuICAvLyBTbywgdGhlIHN0ZXBzIGFyZTpcbiAgLy8gMS4gRmlndXJlIG91dCB3aGF0IHRoZSBzdGF0ZSBvZiB0aGluZ3Mgd2lsbCBiZSBhZnRlciB3ZSBkb1xuICAvLyBhIHJlYWQgZnJvbSB0aGUgYnVmZmVyLlxuICAvL1xuICAvLyAyLiBJZiB0aGF0IHJlc3VsdGluZyBzdGF0ZSB3aWxsIHRyaWdnZXIgYSBfcmVhZCwgdGhlbiBjYWxsIF9yZWFkLlxuICAvLyBOb3RlIHRoYXQgdGhpcyBtYXkgYmUgYXN5bmNocm9ub3VzLCBvciBzeW5jaHJvbm91cy4gIFllcywgaXQgaXNcbiAgLy8gZGVlcGx5IHVnbHkgdG8gd3JpdGUgQVBJcyB0aGlzIHdheSwgYnV0IHRoYXQgc3RpbGwgZG9lc24ndCBtZWFuXG4gIC8vIHRoYXQgdGhlIFJlYWRhYmxlIGNsYXNzIHNob3VsZCBiZWhhdmUgaW1wcm9wZXJseSwgYXMgc3RyZWFtcyBhcmVcbiAgLy8gZGVzaWduZWQgdG8gYmUgc3luYy9hc3luYyBhZ25vc3RpYy5cbiAgLy8gVGFrZSBub3RlIGlmIHRoZSBfcmVhZCBjYWxsIGlzIHN5bmMgb3IgYXN5bmMgKGllLCBpZiB0aGUgcmVhZCBjYWxsXG4gIC8vIGhhcyByZXR1cm5lZCB5ZXQpLCBzbyB0aGF0IHdlIGtub3cgd2hldGhlciBvciBub3QgaXQncyBzYWZlIHRvIGVtaXRcbiAgLy8gJ3JlYWRhYmxlJyBldGMuXG4gIC8vXG4gIC8vIDMuIEFjdHVhbGx5IHB1bGwgdGhlIHJlcXVlc3RlZCBjaHVua3Mgb3V0IG9mIHRoZSBidWZmZXIgYW5kIHJldHVybi5cblxuICAvLyBpZiB3ZSBuZWVkIGEgcmVhZGFibGUgZXZlbnQsIHRoZW4gd2UgbmVlZCB0byBkbyBzb21lIHJlYWRpbmcuXG4gIHZhciBkb1JlYWQgPSBzdGF0ZS5uZWVkUmVhZGFibGU7XG4gIGRlYnVnKCduZWVkIHJlYWRhYmxlJywgZG9SZWFkKTtcblxuICAvLyBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBsZXNzIHRoYW4gdGhlIGhpZ2hXYXRlck1hcmssIHRoZW4gYWxzbyByZWFkIHNvbWVcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCB8fCBzdGF0ZS5sZW5ndGggLSBuIDwgc3RhdGUuaGlnaFdhdGVyTWFyaykge1xuICAgIGRvUmVhZCA9IHRydWU7XG4gICAgZGVidWcoJ2xlbmd0aCBsZXNzIHRoYW4gd2F0ZXJtYXJrJywgZG9SZWFkKTtcbiAgfVxuXG4gIC8vIGhvd2V2ZXIsIGlmIHdlJ3ZlIGVuZGVkLCB0aGVuIHRoZXJlJ3Mgbm8gcG9pbnQsIGFuZCBpZiB3ZSdyZSBhbHJlYWR5XG4gIC8vIHJlYWRpbmcsIHRoZW4gaXQncyB1bm5lY2Vzc2FyeS5cbiAgaWYgKHN0YXRlLmVuZGVkIHx8IHN0YXRlLnJlYWRpbmcpIHtcbiAgICBkb1JlYWQgPSBmYWxzZTtcbiAgICBkZWJ1ZygncmVhZGluZyBvciBlbmRlZCcsIGRvUmVhZCk7XG4gIH0gZWxzZSBpZiAoZG9SZWFkKSB7XG4gICAgZGVidWcoJ2RvIHJlYWQnKTtcbiAgICBzdGF0ZS5yZWFkaW5nID0gdHJ1ZTtcbiAgICBzdGF0ZS5zeW5jID0gdHJ1ZTtcbiAgICAvLyBpZiB0aGUgbGVuZ3RoIGlzIGN1cnJlbnRseSB6ZXJvLCB0aGVuIHdlICpuZWVkKiBhIHJlYWRhYmxlIGV2ZW50LlxuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgLy8gY2FsbCBpbnRlcm5hbCByZWFkIG1ldGhvZFxuICAgIHRoaXMuX3JlYWQoc3RhdGUuaGlnaFdhdGVyTWFyayk7XG4gICAgc3RhdGUuc3luYyA9IGZhbHNlO1xuICAgIC8vIElmIF9yZWFkIHB1c2hlZCBkYXRhIHN5bmNocm9ub3VzbHksIHRoZW4gYHJlYWRpbmdgIHdpbGwgYmUgZmFsc2UsXG4gICAgLy8gYW5kIHdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgaG93IG11Y2ggZGF0YSB3ZSBjYW4gcmV0dXJuIHRvIHRoZSB1c2VyLlxuICAgIGlmICghc3RhdGUucmVhZGluZykgbiA9IGhvd011Y2hUb1JlYWQobk9yaWcsIHN0YXRlKTtcbiAgfVxuXG4gIHZhciByZXQ7XG4gIGlmIChuID4gMCkgcmV0ID0gZnJvbUxpc3Qobiwgc3RhdGUpO2Vsc2UgcmV0ID0gbnVsbDtcblxuICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBuID0gMDtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5sZW5ndGggLT0gbjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICAvLyBJZiB3ZSBoYXZlIG5vdGhpbmcgaW4gdGhlIGJ1ZmZlciwgdGhlbiB3ZSB3YW50IHRvIGtub3dcbiAgICAvLyBhcyBzb29uIGFzIHdlICpkbyogZ2V0IHNvbWV0aGluZyBpbnRvIHRoZSBidWZmZXIuXG4gICAgaWYgKCFzdGF0ZS5lbmRlZCkgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAgIC8vIElmIHdlIHRyaWVkIHRvIHJlYWQoKSBwYXN0IHRoZSBFT0YsIHRoZW4gZW1pdCBlbmQgb24gdGhlIG5leHQgdGljay5cbiAgICBpZiAobk9yaWcgIT09IG4gJiYgc3RhdGUuZW5kZWQpIGVuZFJlYWRhYmxlKHRoaXMpO1xuICB9XG5cbiAgaWYgKHJldCAhPT0gbnVsbCkgdGhpcy5lbWl0KCdkYXRhJywgcmV0KTtcblxuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5lbmRlZCkgcmV0dXJuO1xuICBpZiAoc3RhdGUuZGVjb2Rlcikge1xuICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkge1xuICAgICAgc3RhdGUuYnVmZmVyLnB1c2goY2h1bmspO1xuICAgICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG5cbiAgLy8gZW1pdCAncmVhZGFibGUnIG5vdyB0byBtYWtlIHN1cmUgaXQgZ2V0cyBwaWNrZWQgdXAuXG4gIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xufVxuXG4vLyBEb24ndCBlbWl0IHJlYWRhYmxlIHJpZ2h0IGF3YXkgaW4gc3luYyBtb2RlLCBiZWNhdXNlIHRoaXMgY2FuIHRyaWdnZXJcbi8vIGFub3RoZXIgcmVhZCgpIGNhbGwgPT4gc3RhY2sgb3ZlcmZsb3cuICBUaGlzIHdheSwgaXQgbWlnaHQgdHJpZ2dlclxuLy8gYSBuZXh0VGljayByZWN1cnNpb24gd2FybmluZywgYnV0IHRoYXQncyBub3Qgc28gYmFkLlxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIHN0YXRlLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuICBpZiAoIXN0YXRlLmVtaXR0ZWRSZWFkYWJsZSkge1xuICAgIGRlYnVnKCdlbWl0UmVhZGFibGUnLCBzdGF0ZS5mbG93aW5nKTtcbiAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSB0cnVlO1xuICAgIGlmIChzdGF0ZS5zeW5jKSBwbmEubmV4dFRpY2soZW1pdFJlYWRhYmxlXywgc3RyZWFtKTtlbHNlIGVtaXRSZWFkYWJsZV8oc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGVfKHN0cmVhbSkge1xuICBkZWJ1ZygnZW1pdCByZWFkYWJsZScpO1xuICBzdHJlYW0uZW1pdCgncmVhZGFibGUnKTtcbiAgZmxvdyhzdHJlYW0pO1xufVxuXG4vLyBhdCB0aGlzIHBvaW50LCB0aGUgdXNlciBoYXMgcHJlc3VtYWJseSBzZWVuIHRoZSAncmVhZGFibGUnIGV2ZW50LFxuLy8gYW5kIGNhbGxlZCByZWFkKCkgdG8gY29uc3VtZSBzb21lIGRhdGEuICB0aGF0IG1heSBoYXZlIHRyaWdnZXJlZFxuLy8gaW4gdHVybiBhbm90aGVyIF9yZWFkKG4pIGNhbGwsIGluIHdoaWNoIGNhc2UgcmVhZGluZyA9IHRydWUgaWZcbi8vIGl0J3MgaW4gcHJvZ3Jlc3MuXG4vLyBIb3dldmVyLCBpZiB3ZSdyZSBub3QgZW5kZWQsIG9yIHJlYWRpbmcsIGFuZCB0aGUgbGVuZ3RoIDwgaHdtLFxuLy8gdGhlbiBnbyBhaGVhZCBhbmQgdHJ5IHRvIHJlYWQgc29tZSBtb3JlIHByZWVtcHRpdmVseS5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmdNb3JlKSB7XG4gICAgc3RhdGUucmVhZGluZ01vcmUgPSB0cnVlO1xuICAgIHBuYS5uZXh0VGljayhtYXliZVJlYWRNb3JlXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZV8oc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbGVuID0gc3RhdGUubGVuZ3RoO1xuICB3aGlsZSAoIXN0YXRlLnJlYWRpbmcgJiYgIXN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLmVuZGVkICYmIHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkZWJ1ZygnbWF5YmVSZWFkTW9yZSByZWFkIDAnKTtcbiAgICBzdHJlYW0ucmVhZCgwKTtcbiAgICBpZiAobGVuID09PSBzdGF0ZS5sZW5ndGgpXG4gICAgICAvLyBkaWRuJ3QgZ2V0IGFueSBkYXRhLCBzdG9wIHNwaW5uaW5nLlxuICAgICAgYnJlYWs7ZWxzZSBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn1cblxuLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5SZWFkYWJsZS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdfcmVhZCgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKGRlc3QsIHBpcGVPcHRzKSB7XG4gIHZhciBzcmMgPSB0aGlzO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuXG4gIHN3aXRjaCAoc3RhdGUucGlwZXNDb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHN0YXRlLnBpcGVzID0gZGVzdDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHN0YXRlLnBpcGVzID0gW3N0YXRlLnBpcGVzLCBkZXN0XTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdGF0ZS5waXBlcy5wdXNoKGRlc3QpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgc3RhdGUucGlwZXNDb3VudCArPSAxO1xuICBkZWJ1ZygncGlwZSBjb3VudD0lZCBvcHRzPSVqJywgc3RhdGUucGlwZXNDb3VudCwgcGlwZU9wdHMpO1xuXG4gIHZhciBkb0VuZCA9ICghcGlwZU9wdHMgfHwgcGlwZU9wdHMuZW5kICE9PSBmYWxzZSkgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRvdXQgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRlcnI7XG5cbiAgdmFyIGVuZEZuID0gZG9FbmQgPyBvbmVuZCA6IHVucGlwZTtcbiAgaWYgKHN0YXRlLmVuZEVtaXR0ZWQpIHBuYS5uZXh0VGljayhlbmRGbik7ZWxzZSBzcmMub25jZSgnZW5kJywgZW5kRm4pO1xuXG4gIGRlc3Qub24oJ3VucGlwZScsIG9udW5waXBlKTtcbiAgZnVuY3Rpb24gb251bnBpcGUocmVhZGFibGUsIHVucGlwZUluZm8pIHtcbiAgICBkZWJ1Zygnb251bnBpcGUnKTtcbiAgICBpZiAocmVhZGFibGUgPT09IHNyYykge1xuICAgICAgaWYgKHVucGlwZUluZm8gJiYgdW5waXBlSW5mby5oYXNVbnBpcGVkID09PSBmYWxzZSkge1xuICAgICAgICB1bnBpcGVJbmZvLmhhc1VucGlwZWQgPSB0cnVlO1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgZGVidWcoJ29uZW5kJyk7XG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG4gIC8vIHdoZW4gdGhlIGRlc3QgZHJhaW5zLCBpdCByZWR1Y2VzIHRoZSBhd2FpdERyYWluIGNvdW50ZXJcbiAgLy8gb24gdGhlIHNvdXJjZS4gIFRoaXMgd291bGQgYmUgbW9yZSBlbGVnYW50IHdpdGggYSAub25jZSgpXG4gIC8vIGhhbmRsZXIgaW4gZmxvdygpLCBidXQgYWRkaW5nIGFuZCByZW1vdmluZyByZXBlYXRlZGx5IGlzXG4gIC8vIHRvbyBzbG93LlxuICB2YXIgb25kcmFpbiA9IHBpcGVPbkRyYWluKHNyYyk7XG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG5cbiAgdmFyIGNsZWFuZWRVcCA9IGZhbHNlO1xuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIGRlYnVnKCdjbGVhbnVwJyk7XG4gICAgLy8gY2xlYW51cCBldmVudCBoYW5kbGVycyBvbmNlIHRoZSBwaXBlIGlzIGJyb2tlblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCB1bnBpcGUpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG5cbiAgICBjbGVhbmVkVXAgPSB0cnVlO1xuXG4gICAgLy8gaWYgdGhlIHJlYWRlciBpcyB3YWl0aW5nIGZvciBhIGRyYWluIGV2ZW50IGZyb20gdGhpc1xuICAgIC8vIHNwZWNpZmljIHdyaXRlciwgdGhlbiBpdCB3b3VsZCBjYXVzZSBpdCB0byBuZXZlciBzdGFydFxuICAgIC8vIGZsb3dpbmcgYWdhaW4uXG4gICAgLy8gU28sIGlmIHRoaXMgaXMgYXdhaXRpbmcgYSBkcmFpbiwgdGhlbiB3ZSBqdXN0IGNhbGwgaXQgbm93LlxuICAgIC8vIElmIHdlIGRvbid0IGtub3csIHRoZW4gYXNzdW1lIHRoYXQgd2UgYXJlIHdhaXRpbmcgZm9yIG9uZS5cbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiAmJiAoIWRlc3QuX3dyaXRhYmxlU3RhdGUgfHwgZGVzdC5fd3JpdGFibGVTdGF0ZS5uZWVkRHJhaW4pKSBvbmRyYWluKCk7XG4gIH1cblxuICAvLyBJZiB0aGUgdXNlciBwdXNoZXMgbW9yZSBkYXRhIHdoaWxlIHdlJ3JlIHdyaXRpbmcgdG8gZGVzdCB0aGVuIHdlJ2xsIGVuZCB1cFxuICAvLyBpbiBvbmRhdGEgYWdhaW4uIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byBpbmNyZWFzZSBhd2FpdERyYWluIG9uY2UgYmVjYXVzZVxuICAvLyBkZXN0IHdpbGwgb25seSBlbWl0IG9uZSAnZHJhaW4nIGV2ZW50IGZvciB0aGUgbXVsdGlwbGUgd3JpdGVzLlxuICAvLyA9PiBJbnRyb2R1Y2UgYSBndWFyZCBvbiBpbmNyZWFzaW5nIGF3YWl0RHJhaW4uXG4gIHZhciBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gIHNyYy5vbignZGF0YScsIG9uZGF0YSk7XG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGRlYnVnKCdvbmRhdGEnKTtcbiAgICBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gICAgdmFyIHJldCA9IGRlc3Qud3JpdGUoY2h1bmspO1xuICAgIGlmIChmYWxzZSA9PT0gcmV0ICYmICFpbmNyZWFzZWRBd2FpdERyYWluKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciB1bnBpcGVkIGR1cmluZyBgZGVzdC53cml0ZSgpYCwgaXQgaXMgcG9zc2libGVcbiAgICAgIC8vIHRvIGdldCBzdHVjayBpbiBhIHBlcm1hbmVudGx5IHBhdXNlZCBzdGF0ZSBpZiB0aGF0IHdyaXRlXG4gICAgICAvLyBhbHNvIHJldHVybmVkIGZhbHNlLlxuICAgICAgLy8gPT4gQ2hlY2sgd2hldGhlciBgZGVzdGAgaXMgc3RpbGwgYSBwaXBpbmcgZGVzdGluYXRpb24uXG4gICAgICBpZiAoKHN0YXRlLnBpcGVzQ291bnQgPT09IDEgJiYgc3RhdGUucGlwZXMgPT09IGRlc3QgfHwgc3RhdGUucGlwZXNDb3VudCA+IDEgJiYgaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCkgIT09IC0xKSAmJiAhY2xlYW5lZFVwKSB7XG4gICAgICAgIGRlYnVnKCdmYWxzZSB3cml0ZSByZXNwb25zZSwgcGF1c2UnLCBzcmMuX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbik7XG4gICAgICAgIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKys7XG4gICAgICAgIGluY3JlYXNlZEF3YWl0RHJhaW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgc3JjLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIGRlc3QgaGFzIGFuIGVycm9yLCB0aGVuIHN0b3AgcGlwaW5nIGludG8gaXQuXG4gIC8vIGhvd2V2ZXIsIGRvbid0IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvciBmb3IgdGhpcy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGRlYnVnKCdvbmVycm9yJywgZXIpO1xuICAgIHVucGlwZSgpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgaWYgKEVFbGlzdGVuZXJDb3VudChkZXN0LCAnZXJyb3InKSA9PT0gMCkgZGVzdC5lbWl0KCdlcnJvcicsIGVyKTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBvdXIgZXJyb3IgaGFuZGxlciBpcyBhdHRhY2hlZCBiZWZvcmUgdXNlcmxhbmQgb25lcy5cbiAgcHJlcGVuZExpc3RlbmVyKGRlc3QsICdlcnJvcicsIG9uZXJyb3IpO1xuXG4gIC8vIEJvdGggY2xvc2UgYW5kIGZpbmlzaCBzaG91bGQgdHJpZ2dlciB1bnBpcGUsIGJ1dCBvbmx5IG9uY2UuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIHVucGlwZSgpO1xuICB9XG4gIGRlc3Qub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgZnVuY3Rpb24gb25maW5pc2goKSB7XG4gICAgZGVidWcoJ29uZmluaXNoJyk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblxuICBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgZGVidWcoJ3VucGlwZScpO1xuICAgIHNyYy51bnBpcGUoZGVzdCk7XG4gIH1cblxuICAvLyB0ZWxsIHRoZSBkZXN0IHRoYXQgaXQncyBiZWluZyBwaXBlZCB0b1xuICBkZXN0LmVtaXQoJ3BpcGUnLCBzcmMpO1xuXG4gIC8vIHN0YXJ0IHRoZSBmbG93IGlmIGl0IGhhc24ndCBiZWVuIHN0YXJ0ZWQgYWxyZWFkeS5cbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BpcGUgcmVzdW1lJyk7XG4gICAgc3JjLnJlc3VtZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5mdW5jdGlvbiBwaXBlT25EcmFpbihzcmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgZGVidWcoJ3BpcGVPbkRyYWluJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4pIHN0YXRlLmF3YWl0RHJhaW4tLTtcbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiA9PT0gMCAmJiBFRWxpc3RlbmVyQ291bnQoc3JjLCAnZGF0YScpKSB7XG4gICAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICAgIGZsb3coc3JjKTtcbiAgICB9XG4gIH07XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiAoZGVzdCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgdW5waXBlSW5mbyA9IHsgaGFzVW5waXBlZDogZmFsc2UgfTtcblxuICAvLyBpZiB3ZSdyZSBub3QgcGlwaW5nIGFueXdoZXJlLCB0aGVuIGRvIG5vdGhpbmcuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAwKSByZXR1cm4gdGhpcztcblxuICAvLyBqdXN0IG9uZSBkZXN0aW5hdGlvbi4gIG1vc3QgY29tbW9uIGNhc2UuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSB7XG4gICAgLy8gcGFzc2VkIGluIG9uZSwgYnV0IGl0J3Mgbm90IHRoZSByaWdodCBvbmUuXG4gICAgaWYgKGRlc3QgJiYgZGVzdCAhPT0gc3RhdGUucGlwZXMpIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKCFkZXN0KSBkZXN0ID0gc3RhdGUucGlwZXM7XG5cbiAgICAvLyBnb3QgYSBtYXRjaC5cbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIGlmIChkZXN0KSBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc2xvdyBjYXNlLiBtdWx0aXBsZSBwaXBlIGRlc3RpbmF0aW9ucy5cblxuICBpZiAoIWRlc3QpIHtcbiAgICAvLyByZW1vdmUgYWxsLlxuICAgIHZhciBkZXN0cyA9IHN0YXRlLnBpcGVzO1xuICAgIHZhciBsZW4gPSBzdGF0ZS5waXBlc0NvdW50O1xuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0c1tpXS5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcbiAgICB9cmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB0cnkgdG8gZmluZCB0aGUgcmlnaHQgb25lLlxuICB2YXIgaW5kZXggPSBpbmRleE9mKHN0YXRlLnBpcGVzLCBkZXN0KTtcbiAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIHRoaXM7XG5cbiAgc3RhdGUucGlwZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgc3RhdGUucGlwZXNDb3VudCAtPSAxO1xuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkgc3RhdGUucGlwZXMgPSBzdGF0ZS5waXBlc1swXTtcblxuICBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gc2V0IHVwIGRhdGEgZXZlbnRzIGlmIHRoZXkgYXJlIGFza2VkIGZvclxuLy8gRW5zdXJlIHJlYWRhYmxlIGxpc3RlbmVycyBldmVudHVhbGx5IGdldCBzb21ldGhpbmdcblJlYWRhYmxlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgZm4pIHtcbiAgdmFyIHJlcyA9IFN0cmVhbS5wcm90b3R5cGUub24uY2FsbCh0aGlzLCBldiwgZm4pO1xuXG4gIGlmIChldiA9PT0gJ2RhdGEnKSB7XG4gICAgLy8gU3RhcnQgZmxvd2luZyBvbiBuZXh0IHRpY2sgaWYgc3RyZWFtIGlzbid0IGV4cGxpY2l0bHkgcGF1c2VkXG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyAhPT0gZmFsc2UpIHRoaXMucmVzdW1lKCk7XG4gIH0gZWxzZSBpZiAoZXYgPT09ICdyZWFkYWJsZScpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiAhc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcpIHtcbiAgICAgIHN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nID0gc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKCFzdGF0ZS5yZWFkaW5nKSB7XG4gICAgICAgIHBuYS5uZXh0VGljayhuUmVhZGluZ05leHRUaWNrLCB0aGlzKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGVuZ3RoKSB7XG4gICAgICAgIGVtaXRSZWFkYWJsZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblJlYWRhYmxlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IFJlYWRhYmxlLnByb3RvdHlwZS5vbjtcblxuZnVuY3Rpb24gblJlYWRpbmdOZXh0VGljayhzZWxmKSB7XG4gIGRlYnVnKCdyZWFkYWJsZSBuZXh0dGljayByZWFkIDAnKTtcbiAgc2VsZi5yZWFkKDApO1xufVxuXG4vLyBwYXVzZSgpIGFuZCByZXN1bWUoKSBhcmUgcmVtbmFudHMgb2YgdGhlIGxlZ2FjeSByZWFkYWJsZSBzdHJlYW0gQVBJXG4vLyBJZiB0aGUgdXNlciB1c2VzIHRoZW0sIHRoZW4gc3dpdGNoIGludG8gb2xkIG1vZGUuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICBpZiAoIXN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncmVzdW1lJyk7XG4gICAgc3RhdGUuZmxvd2luZyA9IHRydWU7XG4gICAgcmVzdW1lKHRoaXMsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHJlc3VtZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVzdW1lU2NoZWR1bGVkKSB7XG4gICAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICBwbmEubmV4dFRpY2socmVzdW1lXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzdW1lXyhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZykge1xuICAgIGRlYnVnKCdyZXN1bWUgcmVhZCAwJyk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bWVTY2hlZHVsZWQgPSBmYWxzZTtcbiAgc3RhdGUuYXdhaXREcmFpbiA9IDA7XG4gIHN0cmVhbS5lbWl0KCdyZXN1bWUnKTtcbiAgZmxvdyhzdHJlYW0pO1xuICBpZiAoc3RhdGUuZmxvd2luZyAmJiAhc3RhdGUucmVhZGluZykgc3RyZWFtLnJlYWQoMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NhbGwgcGF1c2UgZmxvd2luZz0laicsIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyk7XG4gIGlmIChmYWxzZSAhPT0gdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BhdXNlJyk7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwYXVzZScpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZmxvdyhzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBkZWJ1ZygnZmxvdycsIHN0YXRlLmZsb3dpbmcpO1xuICB3aGlsZSAoc3RhdGUuZmxvd2luZyAmJiBzdHJlYW0ucmVhZCgpICE9PSBudWxsKSB7fVxufVxuXG4vLyB3cmFwIGFuIG9sZC1zdHlsZSBzdHJlYW0gYXMgdGhlIGFzeW5jIGRhdGEgc291cmNlLlxuLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSByZWFkYWJsZSBzdHJlYW0gaW50ZXJmYWNlLlxuLy8gSXQgaXMgYW4gdWdseSB1bmZvcnR1bmF0ZSBtZXNzIG9mIGhpc3RvcnkuXG5SZWFkYWJsZS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgcGF1c2VkID0gZmFsc2U7XG5cbiAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZW5kJyk7XG4gICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIXN0YXRlLmVuZGVkKSB7XG4gICAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkgX3RoaXMucHVzaChjaHVuayk7XG4gICAgfVxuXG4gICAgX3RoaXMucHVzaChudWxsKTtcbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZGF0YScpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyKSBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspO1xuXG4gICAgLy8gZG9uJ3Qgc2tpcCBvdmVyIGZhbHN5IHZhbHVlcyBpbiBvYmplY3RNb2RlXG4gICAgaWYgKHN0YXRlLm9iamVjdE1vZGUgJiYgKGNodW5rID09PSBudWxsIHx8IGNodW5rID09PSB1bmRlZmluZWQpKSByZXR1cm47ZWxzZSBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgKCFjaHVuayB8fCAhY2h1bmsubGVuZ3RoKSkgcmV0dXJuO1xuXG4gICAgdmFyIHJldCA9IF90aGlzLnB1c2goY2h1bmspO1xuICAgIGlmICghcmV0KSB7XG4gICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLnBhdXNlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBwcm94eSBhbGwgdGhlIG90aGVyIG1ldGhvZHMuXG4gIC8vIGltcG9ydGFudCB3aGVuIHdyYXBwaW5nIGZpbHRlcnMgYW5kIGR1cGxleGVzLlxuICBmb3IgKHZhciBpIGluIHN0cmVhbSkge1xuICAgIGlmICh0aGlzW2ldID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0cmVhbVtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1tpXSA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc3RyZWFtW21ldGhvZF0uYXBwbHkoc3RyZWFtLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfShpKTtcbiAgICB9XG4gIH1cblxuICAvLyBwcm94eSBjZXJ0YWluIGltcG9ydGFudCBldmVudHMuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwga1Byb3h5RXZlbnRzLmxlbmd0aDsgbisrKSB7XG4gICAgc3RyZWFtLm9uKGtQcm94eUV2ZW50c1tuXSwgdGhpcy5lbWl0LmJpbmQodGhpcywga1Byb3h5RXZlbnRzW25dKSk7XG4gIH1cblxuICAvLyB3aGVuIHdlIHRyeSB0byBjb25zdW1lIHNvbWUgbW9yZSBieXRlcywgc2ltcGx5IHVucGF1c2UgdGhlXG4gIC8vIHVuZGVybHlpbmcgc3RyZWFtLlxuICB0aGlzLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgICBkZWJ1Zygnd3JhcHBlZCBfcmVhZCcsIG4pO1xuICAgIGlmIChwYXVzZWQpIHtcbiAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgc3RyZWFtLnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZS5wcm90b3R5cGUsICdyZWFkYWJsZUhpZ2hXYXRlck1hcmsnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIH1cbn0pO1xuXG4vLyBleHBvc2VkIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkuXG5SZWFkYWJsZS5fZnJvbUxpc3QgPSBmcm9tTGlzdDtcblxuLy8gUGx1Y2sgb2ZmIG4gYnl0ZXMgZnJvbSBhbiBhcnJheSBvZiBidWZmZXJzLlxuLy8gTGVuZ3RoIGlzIHRoZSBjb21iaW5lZCBsZW5ndGhzIG9mIGFsbCB0aGUgYnVmZmVycyBpbiB0aGUgbGlzdC5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gZnJvbUxpc3Qobiwgc3RhdGUpIHtcbiAgLy8gbm90aGluZyBidWZmZXJlZFxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICB2YXIgcmV0O1xuICBpZiAoc3RhdGUub2JqZWN0TW9kZSkgcmV0ID0gc3RhdGUuYnVmZmVyLnNoaWZ0KCk7ZWxzZSBpZiAoIW4gfHwgbiA+PSBzdGF0ZS5sZW5ndGgpIHtcbiAgICAvLyByZWFkIGl0IGFsbCwgdHJ1bmNhdGUgdGhlIGxpc3RcbiAgICBpZiAoc3RhdGUuZGVjb2RlcikgcmV0ID0gc3RhdGUuYnVmZmVyLmpvaW4oJycpO2Vsc2UgaWYgKHN0YXRlLmJ1ZmZlci5sZW5ndGggPT09IDEpIHJldCA9IHN0YXRlLmJ1ZmZlci5oZWFkLmRhdGE7ZWxzZSByZXQgPSBzdGF0ZS5idWZmZXIuY29uY2F0KHN0YXRlLmxlbmd0aCk7XG4gICAgc3RhdGUuYnVmZmVyLmNsZWFyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVhZCBwYXJ0IG9mIGxpc3RcbiAgICByZXQgPSBmcm9tTGlzdFBhcnRpYWwobiwgc3RhdGUuYnVmZmVyLCBzdGF0ZS5kZWNvZGVyKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbi8vIEV4dHJhY3RzIG9ubHkgZW5vdWdoIGJ1ZmZlcmVkIGRhdGEgdG8gc2F0aXNmeSB0aGUgYW1vdW50IHJlcXVlc3RlZC5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gZnJvbUxpc3RQYXJ0aWFsKG4sIGxpc3QsIGhhc1N0cmluZ3MpIHtcbiAgdmFyIHJldDtcbiAgaWYgKG4gPCBsaXN0LmhlYWQuZGF0YS5sZW5ndGgpIHtcbiAgICAvLyBzbGljZSBpcyB0aGUgc2FtZSBmb3IgYnVmZmVycyBhbmQgc3RyaW5nc1xuICAgIHJldCA9IGxpc3QuaGVhZC5kYXRhLnNsaWNlKDAsIG4pO1xuICAgIGxpc3QuaGVhZC5kYXRhID0gbGlzdC5oZWFkLmRhdGEuc2xpY2Uobik7XG4gIH0gZWxzZSBpZiAobiA9PT0gbGlzdC5oZWFkLmRhdGEubGVuZ3RoKSB7XG4gICAgLy8gZmlyc3QgY2h1bmsgaXMgYSBwZXJmZWN0IG1hdGNoXG4gICAgcmV0ID0gbGlzdC5zaGlmdCgpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJlc3VsdCBzcGFucyBtb3JlIHRoYW4gb25lIGJ1ZmZlclxuICAgIHJldCA9IGhhc1N0cmluZ3MgPyBjb3B5RnJvbUJ1ZmZlclN0cmluZyhuLCBsaXN0KSA6IGNvcHlGcm9tQnVmZmVyKG4sIGxpc3QpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8vIENvcGllcyBhIHNwZWNpZmllZCBhbW91bnQgb2YgY2hhcmFjdGVycyBmcm9tIHRoZSBsaXN0IG9mIGJ1ZmZlcmVkIGRhdGFcbi8vIGNodW5rcy5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gY29weUZyb21CdWZmZXJTdHJpbmcobiwgbGlzdCkge1xuICB2YXIgcCA9IGxpc3QuaGVhZDtcbiAgdmFyIGMgPSAxO1xuICB2YXIgcmV0ID0gcC5kYXRhO1xuICBuIC09IHJldC5sZW5ndGg7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgdmFyIHN0ciA9IHAuZGF0YTtcbiAgICB2YXIgbmIgPSBuID4gc3RyLmxlbmd0aCA/IHN0ci5sZW5ndGggOiBuO1xuICAgIGlmIChuYiA9PT0gc3RyLmxlbmd0aCkgcmV0ICs9IHN0cjtlbHNlIHJldCArPSBzdHIuc2xpY2UoMCwgbik7XG4gICAgbiAtPSBuYjtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgaWYgKG5iID09PSBzdHIubGVuZ3RoKSB7XG4gICAgICAgICsrYztcbiAgICAgICAgaWYgKHAubmV4dCkgbGlzdC5oZWFkID0gcC5uZXh0O2Vsc2UgbGlzdC5oZWFkID0gbGlzdC50YWlsID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QuaGVhZCA9IHA7XG4gICAgICAgIHAuZGF0YSA9IHN0ci5zbGljZShuYik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgKytjO1xuICB9XG4gIGxpc3QubGVuZ3RoIC09IGM7XG4gIHJldHVybiByZXQ7XG59XG5cbi8vIENvcGllcyBhIHNwZWNpZmllZCBhbW91bnQgb2YgYnl0ZXMgZnJvbSB0aGUgbGlzdCBvZiBidWZmZXJlZCBkYXRhIGNodW5rcy5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gY29weUZyb21CdWZmZXIobiwgbGlzdCkge1xuICB2YXIgcmV0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG4pO1xuICB2YXIgcCA9IGxpc3QuaGVhZDtcbiAgdmFyIGMgPSAxO1xuICBwLmRhdGEuY29weShyZXQpO1xuICBuIC09IHAuZGF0YS5sZW5ndGg7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgdmFyIGJ1ZiA9IHAuZGF0YTtcbiAgICB2YXIgbmIgPSBuID4gYnVmLmxlbmd0aCA/IGJ1Zi5sZW5ndGggOiBuO1xuICAgIGJ1Zi5jb3B5KHJldCwgcmV0Lmxlbmd0aCAtIG4sIDAsIG5iKTtcbiAgICBuIC09IG5iO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICBpZiAobmIgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgKytjO1xuICAgICAgICBpZiAocC5uZXh0KSBsaXN0LmhlYWQgPSBwLm5leHQ7ZWxzZSBsaXN0LmhlYWQgPSBsaXN0LnRhaWwgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdC5oZWFkID0gcDtcbiAgICAgICAgcC5kYXRhID0gYnVmLnNsaWNlKG5iKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICArK2M7XG4gIH1cbiAgbGlzdC5sZW5ndGggLT0gYztcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZW5kUmVhZGFibGUoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcblxuICAvLyBJZiB3ZSBnZXQgaGVyZSBiZWZvcmUgY29uc3VtaW5nIGFsbCB0aGUgYnl0ZXMsIHRoZW4gdGhhdCBpcyBhXG4gIC8vIGJ1ZyBpbiBub2RlLiAgU2hvdWxkIG5ldmVyIGhhcHBlbi5cbiAgaWYgKHN0YXRlLmxlbmd0aCA+IDApIHRocm93IG5ldyBFcnJvcignXCJlbmRSZWFkYWJsZSgpXCIgY2FsbGVkIG9uIG5vbi1lbXB0eSBzdHJlYW0nKTtcblxuICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQpIHtcbiAgICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gICAgcG5hLm5leHRUaWNrKGVuZFJlYWRhYmxlTlQsIHN0YXRlLCBzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlTlQoc3RhdGUsIHN0cmVhbSkge1xuICAvLyBDaGVjayB0aGF0IHdlIGRpZG4ndCBnZXQgb25lIGxhc3QgdW5zaGlmdC5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkICYmIHN0YXRlLmxlbmd0aCA9PT0gMCkge1xuICAgIHN0YXRlLmVuZEVtaXR0ZWQgPSB0cnVlO1xuICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdlbmQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHhzW2ldID09PSB4KSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGEgZHVwbGV4IHN0cmVhbSBpcyBqdXN0IGEgc3RyZWFtIHRoYXQgaXMgYm90aCByZWFkYWJsZSBhbmQgd3JpdGFibGUuXG4vLyBTaW5jZSBKUyBkb2Vzbid0IGhhdmUgbXVsdGlwbGUgcHJvdG90eXBhbCBpbmhlcml0YW5jZSwgdGhpcyBjbGFzc1xuLy8gcHJvdG90eXBhbGx5IGluaGVyaXRzIGZyb20gUmVhZGFibGUsIGFuZCB0aGVuIHBhcmFzaXRpY2FsbHkgZnJvbVxuLy8gV3JpdGFibGUuXG5cbid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIHBuYSA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gIH1yZXR1cm4ga2V5cztcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBEdXBsZXg7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFJlYWRhYmxlID0gcmVxdWlyZSgnLi9fc3RyZWFtX3JlYWRhYmxlJyk7XG52YXIgV3JpdGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fd3JpdGFibGUnKTtcblxudXRpbC5pbmhlcml0cyhEdXBsZXgsIFJlYWRhYmxlKTtcblxue1xuICAvLyBhdm9pZCBzY29wZSBjcmVlcCwgdGhlIGtleXMgYXJyYXkgY2FuIHRoZW4gYmUgY29sbGVjdGVkXG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhXcml0YWJsZS5wcm90b3R5cGUpO1xuICBmb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgICB2YXIgbWV0aG9kID0ga2V5c1t2XTtcbiAgICBpZiAoIUR1cGxleC5wcm90b3R5cGVbbWV0aG9kXSkgRHVwbGV4LnByb3RvdHlwZVttZXRob2RdID0gV3JpdGFibGUucHJvdG90eXBlW21ldGhvZF07XG4gIH1cbn1cblxuZnVuY3Rpb24gRHVwbGV4KG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpIHJldHVybiBuZXcgRHVwbGV4KG9wdGlvbnMpO1xuXG4gIFJlYWRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIFdyaXRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZWFkYWJsZSA9PT0gZmFsc2UpIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLndyaXRhYmxlID09PSBmYWxzZSkgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuYWxsb3dIYWxmT3BlbiA9IHRydWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dIYWxmT3BlbiA9PT0gZmFsc2UpIHRoaXMuYWxsb3dIYWxmT3BlbiA9IGZhbHNlO1xuXG4gIHRoaXMub25jZSgnZW5kJywgb25lbmQpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ3dyaXRhYmxlSGlnaFdhdGVyTWFyaycsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgfVxufSk7XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpIHJldHVybjtcblxuICAvLyBubyBtb3JlIGRhdGEgY2FuIGJlIHdyaXR0ZW4uXG4gIC8vIEJ1dCBhbGxvdyBtb3JlIHdyaXRlcyB0byBoYXBwZW4gaW4gdGhpcyB0aWNrLlxuICBwbmEubmV4dFRpY2sob25FbmROVCwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIG9uRW5kTlQoc2VsZikge1xuICBzZWxmLmVuZCgpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5EdXBsZXgucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5wdXNoKG51bGwpO1xuICB0aGlzLmVuZCgpO1xuXG4gIHBuYS5uZXh0VGljayhjYiwgZXJyKTtcbn07IiwiJ3VzZSBzdHJpY3QnXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG52YXIgSGFzaEJhc2UgPSByZXF1aXJlKCdoYXNoLWJhc2UnKVxuXG52YXIgQVJSQVkxNiA9IG5ldyBBcnJheSgxNilcblxudmFyIHpsID0gW1xuICAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LFxuICA3LCA0LCAxMywgMSwgMTAsIDYsIDE1LCAzLCAxMiwgMCwgOSwgNSwgMiwgMTQsIDExLCA4LFxuICAzLCAxMCwgMTQsIDQsIDksIDE1LCA4LCAxLCAyLCA3LCAwLCA2LCAxMywgMTEsIDUsIDEyLFxuICAxLCA5LCAxMSwgMTAsIDAsIDgsIDEyLCA0LCAxMywgMywgNywgMTUsIDE0LCA1LCA2LCAyLFxuICA0LCAwLCA1LCA5LCA3LCAxMiwgMiwgMTAsIDE0LCAxLCAzLCA4LCAxMSwgNiwgMTUsIDEzXG5dXG5cbnZhciB6ciA9IFtcbiAgNSwgMTQsIDcsIDAsIDksIDIsIDExLCA0LCAxMywgNiwgMTUsIDgsIDEsIDEwLCAzLCAxMixcbiAgNiwgMTEsIDMsIDcsIDAsIDEzLCA1LCAxMCwgMTQsIDE1LCA4LCAxMiwgNCwgOSwgMSwgMixcbiAgMTUsIDUsIDEsIDMsIDcsIDE0LCA2LCA5LCAxMSwgOCwgMTIsIDIsIDEwLCAwLCA0LCAxMyxcbiAgOCwgNiwgNCwgMSwgMywgMTEsIDE1LCAwLCA1LCAxMiwgMiwgMTMsIDksIDcsIDEwLCAxNCxcbiAgMTIsIDE1LCAxMCwgNCwgMSwgNSwgOCwgNywgNiwgMiwgMTMsIDE0LCAwLCAzLCA5LCAxMVxuXVxuXG52YXIgc2wgPSBbXG4gIDExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCxcbiAgNywgNiwgOCwgMTMsIDExLCA5LCA3LCAxNSwgNywgMTIsIDE1LCA5LCAxMSwgNywgMTMsIDEyLFxuICAxMSwgMTMsIDYsIDcsIDE0LCA5LCAxMywgMTUsIDE0LCA4LCAxMywgNiwgNSwgMTIsIDcsIDUsXG4gIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMixcbiAgOSwgMTUsIDUsIDExLCA2LCA4LCAxMywgMTIsIDUsIDEyLCAxMywgMTQsIDExLCA4LCA1LCA2XG5dXG5cbnZhciBzciA9IFtcbiAgOCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LFxuICA5LCAxMywgMTUsIDcsIDEyLCA4LCA5LCAxMSwgNywgNywgMTIsIDcsIDYsIDE1LCAxMywgMTEsXG4gIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LFxuICA4LCA1LCAxMiwgOSwgMTIsIDUsIDE0LCA2LCA4LCAxMywgNiwgNSwgMTUsIDEzLCAxMSwgMTFcbl1cblxudmFyIGhsID0gWzB4MDAwMDAwMDAsIDB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4YTk1M2ZkNGVdXG52YXIgaHIgPSBbMHg1MGEyOGJlNiwgMHg1YzRkZDEyNCwgMHg2ZDcwM2VmMywgMHg3YTZkNzZlOSwgMHgwMDAwMDAwMF1cblxuZnVuY3Rpb24gUklQRU1EMTYwICgpIHtcbiAgSGFzaEJhc2UuY2FsbCh0aGlzLCA2NClcblxuICAvLyBzdGF0ZVxuICB0aGlzLl9hID0gMHg2NzQ1MjMwMVxuICB0aGlzLl9iID0gMHhlZmNkYWI4OVxuICB0aGlzLl9jID0gMHg5OGJhZGNmZVxuICB0aGlzLl9kID0gMHgxMDMyNTQ3NlxuICB0aGlzLl9lID0gMHhjM2QyZTFmMFxufVxuXG5pbmhlcml0cyhSSVBFTUQxNjAsIEhhc2hCYXNlKVxuXG5SSVBFTUQxNjAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB3b3JkcyA9IEFSUkFZMTZcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB3b3Jkc1tqXSA9IHRoaXMuX2Jsb2NrLnJlYWRJbnQzMkxFKGogKiA0KVxuXG4gIHZhciBhbCA9IHRoaXMuX2EgfCAwXG4gIHZhciBibCA9IHRoaXMuX2IgfCAwXG4gIHZhciBjbCA9IHRoaXMuX2MgfCAwXG4gIHZhciBkbCA9IHRoaXMuX2QgfCAwXG4gIHZhciBlbCA9IHRoaXMuX2UgfCAwXG5cbiAgdmFyIGFyID0gdGhpcy5fYSB8IDBcbiAgdmFyIGJyID0gdGhpcy5fYiB8IDBcbiAgdmFyIGNyID0gdGhpcy5fYyB8IDBcbiAgdmFyIGRyID0gdGhpcy5fZCB8IDBcbiAgdmFyIGVyID0gdGhpcy5fZSB8IDBcblxuICAvLyBjb21wdXRhdGlvblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpICs9IDEpIHtcbiAgICB2YXIgdGxcbiAgICB2YXIgdHJcbiAgICBpZiAoaSA8IDE2KSB7XG4gICAgICB0bCA9IGZuMShhbCwgYmwsIGNsLCBkbCwgZWwsIHdvcmRzW3psW2ldXSwgaGxbMF0sIHNsW2ldKVxuICAgICAgdHIgPSBmbjUoYXIsIGJyLCBjciwgZHIsIGVyLCB3b3Jkc1t6cltpXV0sIGhyWzBdLCBzcltpXSlcbiAgICB9IGVsc2UgaWYgKGkgPCAzMikge1xuICAgICAgdGwgPSBmbjIoYWwsIGJsLCBjbCwgZGwsIGVsLCB3b3Jkc1t6bFtpXV0sIGhsWzFdLCBzbFtpXSlcbiAgICAgIHRyID0gZm40KGFyLCBiciwgY3IsIGRyLCBlciwgd29yZHNbenJbaV1dLCBoclsxXSwgc3JbaV0pXG4gICAgfSBlbHNlIGlmIChpIDwgNDgpIHtcbiAgICAgIHRsID0gZm4zKGFsLCBibCwgY2wsIGRsLCBlbCwgd29yZHNbemxbaV1dLCBobFsyXSwgc2xbaV0pXG4gICAgICB0ciA9IGZuMyhhciwgYnIsIGNyLCBkciwgZXIsIHdvcmRzW3pyW2ldXSwgaHJbMl0sIHNyW2ldKVxuICAgIH0gZWxzZSBpZiAoaSA8IDY0KSB7XG4gICAgICB0bCA9IGZuNChhbCwgYmwsIGNsLCBkbCwgZWwsIHdvcmRzW3psW2ldXSwgaGxbM10sIHNsW2ldKVxuICAgICAgdHIgPSBmbjIoYXIsIGJyLCBjciwgZHIsIGVyLCB3b3Jkc1t6cltpXV0sIGhyWzNdLCBzcltpXSlcbiAgICB9IGVsc2UgeyAvLyBpZiAoaTw4MCkge1xuICAgICAgdGwgPSBmbjUoYWwsIGJsLCBjbCwgZGwsIGVsLCB3b3Jkc1t6bFtpXV0sIGhsWzRdLCBzbFtpXSlcbiAgICAgIHRyID0gZm4xKGFyLCBiciwgY3IsIGRyLCBlciwgd29yZHNbenJbaV1dLCBocls0XSwgc3JbaV0pXG4gICAgfVxuXG4gICAgYWwgPSBlbFxuICAgIGVsID0gZGxcbiAgICBkbCA9IHJvdGwoY2wsIDEwKVxuICAgIGNsID0gYmxcbiAgICBibCA9IHRsXG5cbiAgICBhciA9IGVyXG4gICAgZXIgPSBkclxuICAgIGRyID0gcm90bChjciwgMTApXG4gICAgY3IgPSBiclxuICAgIGJyID0gdHJcbiAgfVxuXG4gIC8vIHVwZGF0ZSBzdGF0ZVxuICB2YXIgdCA9ICh0aGlzLl9iICsgY2wgKyBkcikgfCAwXG4gIHRoaXMuX2IgPSAodGhpcy5fYyArIGRsICsgZXIpIHwgMFxuICB0aGlzLl9jID0gKHRoaXMuX2QgKyBlbCArIGFyKSB8IDBcbiAgdGhpcy5fZCA9ICh0aGlzLl9lICsgYWwgKyBicikgfCAwXG4gIHRoaXMuX2UgPSAodGhpcy5fYSArIGJsICsgY3IpIHwgMFxuICB0aGlzLl9hID0gdFxufVxuXG5SSVBFTUQxNjAucHJvdG90eXBlLl9kaWdlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNyZWF0ZSBwYWRkaW5nIGFuZCBoYW5kbGUgYmxvY2tzXG4gIHRoaXMuX2Jsb2NrW3RoaXMuX2Jsb2NrT2Zmc2V0KytdID0gMHg4MFxuICBpZiAodGhpcy5fYmxvY2tPZmZzZXQgPiA1Nikge1xuICAgIHRoaXMuX2Jsb2NrLmZpbGwoMCwgdGhpcy5fYmxvY2tPZmZzZXQsIDY0KVxuICAgIHRoaXMuX3VwZGF0ZSgpXG4gICAgdGhpcy5fYmxvY2tPZmZzZXQgPSAwXG4gIH1cblxuICB0aGlzLl9ibG9jay5maWxsKDAsIHRoaXMuX2Jsb2NrT2Zmc2V0LCA1NilcbiAgdGhpcy5fYmxvY2sud3JpdGVVSW50MzJMRSh0aGlzLl9sZW5ndGhbMF0sIDU2KVxuICB0aGlzLl9ibG9jay53cml0ZVVJbnQzMkxFKHRoaXMuX2xlbmd0aFsxXSwgNjApXG4gIHRoaXMuX3VwZGF0ZSgpXG5cbiAgLy8gcHJvZHVjZSByZXN1bHRcbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyA/IEJ1ZmZlci5hbGxvYygyMCkgOiBuZXcgQnVmZmVyKDIwKVxuICBidWZmZXIud3JpdGVJbnQzMkxFKHRoaXMuX2EsIDApXG4gIGJ1ZmZlci53cml0ZUludDMyTEUodGhpcy5fYiwgNClcbiAgYnVmZmVyLndyaXRlSW50MzJMRSh0aGlzLl9jLCA4KVxuICBidWZmZXIud3JpdGVJbnQzMkxFKHRoaXMuX2QsIDEyKVxuICBidWZmZXIud3JpdGVJbnQzMkxFKHRoaXMuX2UsIDE2KVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIHJvdGwgKHgsIG4pIHtcbiAgcmV0dXJuICh4IDw8IG4pIHwgKHggPj4+ICgzMiAtIG4pKVxufVxuXG5mdW5jdGlvbiBmbjEgKGEsIGIsIGMsIGQsIGUsIG0sIGssIHMpIHtcbiAgcmV0dXJuIChyb3RsKChhICsgKGIgXiBjIF4gZCkgKyBtICsgaykgfCAwLCBzKSArIGUpIHwgMFxufVxuXG5mdW5jdGlvbiBmbjIgKGEsIGIsIGMsIGQsIGUsIG0sIGssIHMpIHtcbiAgcmV0dXJuIChyb3RsKChhICsgKChiICYgYykgfCAoKH5iKSAmIGQpKSArIG0gKyBrKSB8IDAsIHMpICsgZSkgfCAwXG59XG5cbmZ1bmN0aW9uIGZuMyAoYSwgYiwgYywgZCwgZSwgbSwgaywgcykge1xuICByZXR1cm4gKHJvdGwoKGEgKyAoKGIgfCAofmMpKSBeIGQpICsgbSArIGspIHwgMCwgcykgKyBlKSB8IDBcbn1cblxuZnVuY3Rpb24gZm40IChhLCBiLCBjLCBkLCBlLCBtLCBrLCBzKSB7XG4gIHJldHVybiAocm90bCgoYSArICgoYiAmIGQpIHwgKGMgJiAofmQpKSkgKyBtICsgaykgfCAwLCBzKSArIGUpIHwgMFxufVxuXG5mdW5jdGlvbiBmbjUgKGEsIGIsIGMsIGQsIGUsIG0sIGssIHMpIHtcbiAgcmV0dXJuIChyb3RsKChhICsgKGIgXiAoYyB8ICh+ZCkpKSArIG0gKyBrKSB8IDAsIHMpICsgZSkgfCAwXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUklQRU1EMTYwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5QYXNzVGhyb3VnaFxuIiwiY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcbmNvbnN0IHtcbiAgY2hlY2tBbmRJbml0LFxuICBzbWl4XG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbi8vIE4gPSBDcHUgY29zdCwgciA9IE1lbW9yeSBjb3N0LCBwID0gcGFyYWxsZWxpemF0aW9uIGNvc3RcbmFzeW5jIGZ1bmN0aW9uIHNjcnlwdCAoa2V5LCBzYWx0LCBOLCByLCBwLCBka0xlbiwgcHJvZ3Jlc3NDYWxsYmFjaywgcHJvbWlzZUludGVydmFsKSB7XG4gIGNvbnN0IHtcbiAgICBYWSxcbiAgICBWLFxuICAgIEIzMixcbiAgICB4LFxuICAgIF9YLFxuICAgIEIsXG4gICAgdGlja0NhbGxiYWNrXG4gIH0gPSBjaGVja0FuZEluaXQoa2V5LCBzYWx0LCBOLCByLCBwLCBka0xlbiwgcHJvZ3Jlc3NDYWxsYmFjaylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgIGF3YWl0IHNtaXgoQiwgaSAqIDEyOCAqIHIsIHIsIE4sIFYsIFhZLCBfWCwgQjMyLCB4LCB0aWNrQ2FsbGJhY2ssIHByb21pc2VJbnRlcnZhbClcbiAgfVxuXG4gIHJldHVybiBjcnlwdG8ucGJrZGYyU3luYyhrZXksIEIsIDEsIGRrTGVuLCAnc2hhMjU2Jylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzY3J5cHRcbiIsImNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJylcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cy8nKVxuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTYWZlRXZlbnRFbWl0dGVyXG5cblxuZnVuY3Rpb24gU2FmZUV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcylcbn1cblxudXRpbC5pbmhlcml0cyhTYWZlRXZlbnRFbWl0dGVyLCBFdmVudEVtaXR0ZXIpXG5cblNhZmVFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuICAvLyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vR296YWxhL2V2ZW50cy9ibG9iL21hc3Rlci9ldmVudHMuanNcbiAgLy8gbW9kaWZpZWQgbGluZXMgYXJlIGNvbW1lbnRlZCB3aXRoIFwiZWRpdGVkOlwiXG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBlZGl0ZWQ6IHVzaW5nIHNhZmVBcHBseVxuICAgIHNhZmVBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgLy8gZWRpdGVkOiB1c2luZyBzYWZlQXBwbHlcbiAgICAgIHNhZmVBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNhZmVBcHBseShoYW5kbGVyLCBjb250ZXh0LCBhcmdzKSB7XG4gIHRyeSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIGNvbnRleHQsIGFyZ3MpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHRocm93IGVycm9yIGFmdGVyIHRpbWVvdXQgc28gYXMgbm90IHRvIGludGVydXB0IHRoZSBzdGFja1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhyb3cgZXJyXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9