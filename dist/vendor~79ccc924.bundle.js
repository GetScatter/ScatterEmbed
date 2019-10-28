(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "/u+i":
/***/ (function(module, exports, __webpack_require__) {

const EthQuery = __webpack_require__("QXrW")
const pify = __webpack_require__("4CaD")
const SafeEventEmitter = __webpack_require__("y2lW")

const sec = 1000

const calculateSum = (accumulator, currentValue) => accumulator + currentValue
const blockTrackerEvents = ['sync', 'latest']

class BaseBlockTracker extends SafeEventEmitter {

  //
  // public
  //

  constructor (opts = {}) {
    super()
    // config
    this._blockResetDuration = opts.blockResetDuration || 20 * sec
    // state
    this._blockResetTimeout
    this._currentBlock = null
    this._isRunning = false
    // bind functions for internal use
    this._onNewListener = this._onNewListener.bind(this)
    this._onRemoveListener = this._onRemoveListener.bind(this)
    this._resetCurrentBlock = this._resetCurrentBlock.bind(this)
    // listen for handler changes
    this._setupInternalEvents()
  }

  isRunning () {
    return this._isRunning
  }

  getCurrentBlock () {
    return this._currentBlock
  }

  async getLatestBlock () {
    // return if available
    if (this._currentBlock) return this._currentBlock
    // wait for a new latest block
    const latestBlock = await new Promise(resolve => this.once('latest', resolve))
    // return newly set current block
    return latestBlock
  }

  // dont allow module consumer to remove our internal event listeners
  removeAllListeners (eventName) {
    // perform default behavior, preserve fn arity
    if (eventName) {
      super.removeAllListeners(eventName)
    } else {
      super.removeAllListeners()
    }
    // re-add internal events
    this._setupInternalEvents()
    // trigger stop check just in case
    this._onRemoveListener()
  }

  //
  // to be implemented in subclass
  //

  _start () {
    // default behavior is noop
  }

  _end () {
    // default behavior is noop
  }

  //
  // private
  //

  _setupInternalEvents () {
    // first remove listeners for idempotence
    this.removeListener('newListener', this._onNewListener)
    this.removeListener('removeListener', this._onRemoveListener)
    // then add them
    this.on('newListener', this._onNewListener)
    this.on('removeListener', this._onRemoveListener)
  }

  _onNewListener (eventName, handler) {
    // `newListener` is called *before* the listener is added
    if (!blockTrackerEvents.includes(eventName)) return
    this._maybeStart()
  }

  _onRemoveListener (eventName, handler) {
    // `removeListener` is called *after* the listener is removed
    if (this._getBlockTrackerEventCount() > 0) return
    this._maybeEnd()
  }

  _maybeStart () {
    if (this._isRunning) return
    this._isRunning = true
    // cancel setting latest block to stale
    this._cancelBlockResetTimeout()
    this._start()
  }

  _maybeEnd () {
    if (!this._isRunning) return
    this._isRunning = false
    this._setupBlockResetTimeout()
    this._end()
  }

  _getBlockTrackerEventCount () {
    return blockTrackerEvents
      .map(eventName => this.listenerCount(eventName))
      .reduce(calculateSum)
  }

  _newPotentialLatest (newBlock) {
    const currentBlock = this._currentBlock
    // only update if blok number is higher
    if (currentBlock && (hexToInt(newBlock) <= hexToInt(currentBlock))) return
    this._setCurrentBlock(newBlock)
  }

  _setCurrentBlock (newBlock) {
    const oldBlock = this._currentBlock
    this._currentBlock = newBlock
    this.emit('latest', newBlock)
    this.emit('sync', { oldBlock, newBlock })
  }

  _setupBlockResetTimeout () {
    // clear any existing timeout
    this._cancelBlockResetTimeout()
    // clear latest block when stale
    this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration)
    // nodejs - dont hold process open
    if (this._blockResetTimeout.unref) {
      this._blockResetTimeout.unref()
    }
  }

  _cancelBlockResetTimeout () {
    clearTimeout(this._blockResetTimeout)
  }

  _resetCurrentBlock () {
    this._currentBlock = null
  }

}

module.exports = BaseBlockTracker

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16)
}


/***/ }),

/***/ "1TIO":
/***/ (function(module) {

module.exports = JSON.parse("{\"4001\":{\"standard\":\"EIP 1193\",\"message\":\"User rejected the request.\"},\"4100\":{\"standard\":\"EIP 1193\",\"message\":\"The requested account and/or method has not been authorized by the user.\"},\"4200\":{\"standard\":\"EIP 1193\",\"message\":\"The requested method is not supported by this Ethereum provider.\"},\"-32700\":{\"standard\":\"JSON RPC 2.0\",\"message\":\"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.\"},\"-32600\":{\"standard\":\"JSON RPC 2.0\",\"message\":\"The JSON sent is not a valid Request object.\"},\"-32601\":{\"standard\":\"JSON RPC 2.0\",\"message\":\"The method does not exist / is not available.\"},\"-32602\":{\"standard\":\"JSON RPC 2.0\",\"message\":\"Invalid method parameter(s).\"},\"-32603\":{\"standard\":\"JSON RPC 2.0\",\"message\":\"Internal JSON-RPC error.\"}}");

/***/ }),

/***/ "2HNl":
/***/ (function(module, exports) {

var generate = function generate(num, fn) {
  var a = [];
  for (var i = 0; i < num; ++i) {
    a.push(fn(i));
  }return a;
};

var replicate = function replicate(num, val) {
  return generate(num, function () {
    return val;
  });
};

var concat = function concat(a, b) {
  return a.concat(b);
};

var flatten = function flatten(a) {
  var r = [];
  for (var j = 0, J = a.length; j < J; ++j) {
    for (var i = 0, I = a[j].length; i < I; ++i) {
      r.push(a[j][i]);
    }
  }return r;
};

var chunksOf = function chunksOf(n, a) {
  var b = [];
  for (var i = 0, l = a.length; i < l; i += n) {
    b.push(a.slice(i, i + n));
  }return b;
};

module.exports = {
  generate: generate,
  replicate: replicate,
  concat: concat,
  flatten: flatten,
  chunksOf: chunksOf
};

/***/ }),

/***/ "2YU9":
/***/ (function(module, exports) {

// The RLP format
// Serialization and deserialization for the BytesTree type, under the following grammar:
// | First byte | Meaning                                                                    |
// | ---------- | -------------------------------------------------------------------------- |
// | 0   to 127 | HEX(leaf)                                                                  |
// | 128 to 183 | HEX(length_of_leaf + 128) + HEX(leaf)                                      |
// | 184 to 191 | HEX(length_of_length_of_leaf + 128 + 55) + HEX(length_of_leaf) + HEX(leaf) |
// | 192 to 247 | HEX(length_of_node + 192) + HEX(node)                                      |
// | 248 to 255 | HEX(length_of_length_of_node + 128 + 55) + HEX(length_of_node) + HEX(node) |

var encode = function encode(tree) {
  var padEven = function padEven(str) {
    return str.length % 2 === 0 ? str : "0" + str;
  };

  var uint = function uint(num) {
    return padEven(num.toString(16));
  };

  var length = function length(len, add) {
    return len < 56 ? uint(add + len) : uint(add + uint(len).length / 2 + 55) + uint(len);
  };

  var dataTree = function dataTree(tree) {
    if (typeof tree === "string") {
      var hex = tree.slice(2);
      var pre = hex.length != 2 || hex >= "80" ? length(hex.length / 2, 128) : "";
      return pre + hex;
    } else {
      var _hex = tree.map(dataTree).join("");
      var _pre = length(_hex.length / 2, 192);
      return _pre + _hex;
    }
  };

  return "0x" + dataTree(tree);
};

var decode = function decode(hex) {
  var i = 2;

  var parseTree = function parseTree() {
    if (i >= hex.length) throw "";
    var head = hex.slice(i, i + 2);
    return head < "80" ? (i += 2, "0x" + head) : head < "c0" ? parseHex() : parseList();
  };

  var parseLength = function parseLength() {
    var len = parseInt(hex.slice(i, i += 2), 16) % 64;
    return len < 56 ? len : parseInt(hex.slice(i, i += (len - 55) * 2), 16);
  };

  var parseHex = function parseHex() {
    var len = parseLength();
    return "0x" + hex.slice(i, i += len * 2);
  };

  var parseList = function parseList() {
    var lim = parseLength() * 2 + i;
    var list = [];
    while (i < lim) {
      list.push(parseTree());
    }return list;
  };

  try {
    return parseTree();
  } catch (e) {
    return [];
  }
};

module.exports = { encode: encode, decode: decode };

/***/ }),

/***/ "4CaD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, opts) => function () {
	const P = opts.promiseModule;
	const args = new Array(arguments.length);

	for (let i = 0; i < arguments.length; i++) {
		args[i] = arguments[i];
	}

	return new P((resolve, reject) => {
		if (opts.errorFirst) {
			args.push(function (err, result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					if (err) {
						results.unshift(err);
						reject(results);
					} else {
						resolve(results);
					}
				} else if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		} else {
			args.push(function (result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 0; i < arguments.length; i++) {
						results[i] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});
		}

		fn.apply(this, args);
	});
};

module.exports = (obj, opts) => {
	opts = Object.assign({
		exclude: [/.+(Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise
	}, opts);

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	let ret;
	if (typeof obj === 'function') {
		ret = function () {
			if (opts.excludeMain) {
				return obj.apply(this, arguments);
			}

			return processFn(obj, opts).apply(this, arguments);
		};
	} else {
		ret = Object.create(Object.getPrototypeOf(obj));
	}

	for (const key in obj) { // eslint-disable-line guard-for-in
		const x = obj[key];
		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, opts) : x;
	}

	return ret;
};


/***/ }),

/***/ "HtlB":
/***/ (function(module, exports, __webpack_require__) {

const ethUtil = __webpack_require__("tnHP")
const ethAbi = __webpack_require__("ga3E")

module.exports = {

  concatSig: function (v, r, s) {
    const rSig = ethUtil.fromSigned(r)
    const sSig = ethUtil.fromSigned(s)
    const vSig = ethUtil.bufferToInt(v)
    const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64)
    const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64)
    const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig))
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex')
  },

  normalize: function (input) {
    if (!input) return

    if (typeof input === 'number') {
      const buffer = ethUtil.toBuffer(input)
      input = ethUtil.bufferToHex(buffer)
    }

    if (typeof input !== 'string') {
      var msg = 'eth-sig-util.normalize() requires hex string or integer input.'
      msg += ' received ' + (typeof input) + ': ' + input
      throw new Error(msg)
    }

    return ethUtil.addHexPrefix(input.toLowerCase())
  },

  personalSign: function (privateKey, msgParams) {
    var message = ethUtil.toBuffer(msgParams.data)
    var msgHash = ethUtil.hashPersonalMessage(message)
    var sig = ethUtil.ecsign(msgHash, privateKey)
    var serialized = ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
    return serialized
  },

  recoverPersonalSignature: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams)
    const sender = ethUtil.publicToAddress(publicKey)
    const senderHex = ethUtil.bufferToHex(sender)
    return senderHex
  },

  extractPublicKey: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams)
    return '0x' + publicKey.toString('hex')
  },

  typedSignatureHash: function (typedData) {
    const hashBuffer = typedSignatureHash(typedData)
    return ethUtil.bufferToHex(hashBuffer)
  },

  signTypedData: function (privateKey, msgParams) {
    const msgHash = typedSignatureHash(msgParams.data)
    const sig = ethUtil.ecsign(msgHash, privateKey)
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s))
  },

  recoverTypedSignature: function (msgParams) {
    const msgHash = typedSignatureHash(msgParams.data)
    const publicKey = recoverPublicKey(msgHash, msgParams.sig)
    const sender = ethUtil.publicToAddress(publicKey)
    return ethUtil.bufferToHex(sender)
  }

}

/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */
function typedSignatureHash(typedData) {
  const error = new Error('Expect argument to be non-empty array')
  if (typeof typedData !== 'object' || !typedData.length) throw error

  const data = typedData.map(function (e) {
    return e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value
  })
  const types = typedData.map(function (e) { return e.type })
  const schema = typedData.map(function (e) {
    if (!e.name) throw error
    return e.type + ' ' + e.name
  })

  return ethAbi.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
      ethAbi.soliditySHA3(types, data)
    ]
  )
}

function recoverPublicKey(hash, sig) {
  const signature = ethUtil.toBuffer(sig)
  const sigParams = ethUtil.fromRpcSig(signature)
  return ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s)
}

function getPublicKeyFor (msgParams) {
  const message = ethUtil.toBuffer(msgParams.data)
  const msgHash = ethUtil.hashPersonalMessage(message)
  return recoverPublicKey(msgHash, msgParams.sig)
}


function padWithZeroes (number, length) {
  var myString = '' + number
  while (myString.length < length) {
    myString = '0' + myString
  }
  return myString
}


/***/ }),

/***/ "LAvi":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var sha3 = __webpack_require__("HFX+").keccak_256
var uts46 = __webpack_require__("26+Y")

function namehash (inputName) {
  // Reject empty names:
  var node = ''
  for (var i = 0; i < 32; i++) {
    node += '00'
  }

  name = normalize(inputName)

  if (name) {
    var labels = name.split('.')

    for(var i = labels.length - 1; i >= 0; i--) {
      var labelSha = sha3(labels[i])
      node = sha3(new Buffer(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}

function normalize(name) {
  return name ? uts46.toUnicode(name, {useStd3ASCII: true, transitional: false}) : name
}

exports.hash = namehash
exports.normalize = normalize

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Lf5n":
/***/ (function(module, exports, __webpack_require__) {


const safeStringify = __webpack_require__("N1pS")

/**
 * @class JsonRpcError
 * Error subclass implementing JSON RPC 2.0 errors.
 * Permits any integer error code.
 */
class JsonRpcError extends Error {

  /**
   * Create a JSON RPC error.
   * @param {number} code - The integer error code.
   * @param {string} message - The string message.
   * @param {any} [data] - The error data.
   */
  constructor (code, message, data) {

    if (!Number.isInteger(code)) throw new Error(
      '"code" must be an integer.'
    )
    if (!message || typeof message !== 'string') throw new Error(
      '"message" must be a nonempty string.'
    )

    super(message)
    this.code = code
    if (data !== undefined) this.data = data
  }

  /**
   * Returns a plain object with all public class properties.
   * @returns {object} The serialized error. 
   */
  serialize() {
    const serialized = {
      code: this.code,
      message: this.message,
    }
    if (this.data !== undefined) serialized.data = this.data
    if (this.stack) serialized.stack = this.stack
    return serialized
  }

  /**
   * Return a string representation of the serialized error, omitting
   * any circular references.
   * @returns {string} The serialized error as a string.
   */
  toString() {
    return safeStringify(
      this.serialize(),
      stringifyReplacer,
      2
    )
  }
}

/**
 * @class EthJsonRpcError
 * Error subclass implementing Ethereum JSON RPC errors.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
class EthJsonRpcError extends JsonRpcError {
  /**
   * Create an Ethereum JSON RPC error.
   * @param {number} code - The integer error code, in the [ 1000 <= 4999 ] range.
   * @param {string} message - The string message.
   * @param {any} [data] - The error data.
   */
  constructor(code, message, data) {
    if (!isValidEthCode(code)) {
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999'
      )
    }
    super(code, message, data)
  }
}

// Internal

function isValidEthCode(code) {
  return Number.isInteger(code) && code >= 1000 && code <= 4999
}

function stringifyReplacer(_, value) {
  if (value === '[Circular]') {
    return
  }
  return value
}

// Exports

module.exports =  {
  JsonRpcError,
  EthJsonRpcError,
}


/***/ }),

/***/ "QXrW":
/***/ (function(module, exports, __webpack_require__) {

const extend = __webpack_require__("U6jy")
const createRandomId = __webpack_require__("2J3U")()

module.exports = EthQuery


function EthQuery(provider){
  const self = this
  self.currentProvider = provider
}

//
// base queries
//

// default block
EthQuery.prototype.getBalance =                          generateFnWithDefaultBlockFor(2, 'eth_getBalance')
EthQuery.prototype.getCode =                             generateFnWithDefaultBlockFor(2, 'eth_getCode')
EthQuery.prototype.getTransactionCount =                 generateFnWithDefaultBlockFor(2, 'eth_getTransactionCount')
EthQuery.prototype.getStorageAt =                        generateFnWithDefaultBlockFor(3, 'eth_getStorageAt')
EthQuery.prototype.call =                                generateFnWithDefaultBlockFor(2, 'eth_call')
// standard
EthQuery.prototype.protocolVersion =                     generateFnFor('eth_protocolVersion')
EthQuery.prototype.syncing =                             generateFnFor('eth_syncing')
EthQuery.prototype.coinbase =                            generateFnFor('eth_coinbase')
EthQuery.prototype.mining =                              generateFnFor('eth_mining')
EthQuery.prototype.hashrate =                            generateFnFor('eth_hashrate')
EthQuery.prototype.gasPrice =                            generateFnFor('eth_gasPrice')
EthQuery.prototype.accounts =                            generateFnFor('eth_accounts')
EthQuery.prototype.blockNumber =                         generateFnFor('eth_blockNumber')
EthQuery.prototype.getBlockTransactionCountByHash =      generateFnFor('eth_getBlockTransactionCountByHash')
EthQuery.prototype.getBlockTransactionCountByNumber =    generateFnFor('eth_getBlockTransactionCountByNumber')
EthQuery.prototype.getUncleCountByBlockHash =            generateFnFor('eth_getUncleCountByBlockHash')
EthQuery.prototype.getUncleCountByBlockNumber =          generateFnFor('eth_getUncleCountByBlockNumber')
EthQuery.prototype.sign =                                generateFnFor('eth_sign')
EthQuery.prototype.sendTransaction =                     generateFnFor('eth_sendTransaction')
EthQuery.prototype.sendRawTransaction =                  generateFnFor('eth_sendRawTransaction')
EthQuery.prototype.estimateGas =                         generateFnFor('eth_estimateGas')
EthQuery.prototype.getBlockByHash =                      generateFnFor('eth_getBlockByHash')
EthQuery.prototype.getBlockByNumber =                    generateFnFor('eth_getBlockByNumber')
EthQuery.prototype.getTransactionByHash =                generateFnFor('eth_getTransactionByHash')
EthQuery.prototype.getTransactionByBlockHashAndIndex =   generateFnFor('eth_getTransactionByBlockHashAndIndex')
EthQuery.prototype.getTransactionByBlockNumberAndIndex = generateFnFor('eth_getTransactionByBlockNumberAndIndex')
EthQuery.prototype.getTransactionReceipt =               generateFnFor('eth_getTransactionReceipt')
EthQuery.prototype.getUncleByBlockHashAndIndex =         generateFnFor('eth_getUncleByBlockHashAndIndex')
EthQuery.prototype.getUncleByBlockNumberAndIndex =       generateFnFor('eth_getUncleByBlockNumberAndIndex')
EthQuery.prototype.getCompilers =                        generateFnFor('eth_getCompilers')
EthQuery.prototype.compileLLL =                          generateFnFor('eth_compileLLL')
EthQuery.prototype.compileSolidity =                     generateFnFor('eth_compileSolidity')
EthQuery.prototype.compileSerpent =                      generateFnFor('eth_compileSerpent')
EthQuery.prototype.newFilter =                           generateFnFor('eth_newFilter')
EthQuery.prototype.newBlockFilter =                      generateFnFor('eth_newBlockFilter')
EthQuery.prototype.newPendingTransactionFilter =         generateFnFor('eth_newPendingTransactionFilter')
EthQuery.prototype.uninstallFilter =                     generateFnFor('eth_uninstallFilter')
EthQuery.prototype.getFilterChanges =                    generateFnFor('eth_getFilterChanges')
EthQuery.prototype.getFilterLogs =                       generateFnFor('eth_getFilterLogs')
EthQuery.prototype.getLogs =                             generateFnFor('eth_getLogs')
EthQuery.prototype.getWork =                             generateFnFor('eth_getWork')
EthQuery.prototype.submitWork =                          generateFnFor('eth_submitWork')
EthQuery.prototype.submitHashrate =                      generateFnFor('eth_submitHashrate')

// network level

EthQuery.prototype.sendAsync = function(opts, cb){
  const self = this
  self.currentProvider.sendAsync(createPayload(opts), function(err, response){
    if (!err && response.error) err = new Error('EthQuery - RPC Error - '+response.error.message)
    if (err) return cb(err)
    cb(null, response.result)
  })
}

// util

function generateFnFor(methodName){
  return function(){
    const self = this
    var args = [].slice.call(arguments)
    var cb = args.pop()
    self.sendAsync({
      method: methodName,
      params: args,
    }, cb)
  }
}

function generateFnWithDefaultBlockFor(argCount, methodName){
  return function(){
    const self = this
    var args = [].slice.call(arguments)
    var cb = args.pop()
    // set optional default block param
    if (args.length < argCount) args.push('latest')
    self.sendAsync({
      method: methodName,
      params: args,
    }, cb)
  }
}

function createPayload(data){
  return extend({
    // defaults
    id: createRandomId(),
    jsonrpc: '2.0',
    params: [],
    // user-specified
  }, data)
}


/***/ }),

/***/ "V5x4":
/***/ (function(module, exports, __webpack_require__) {

const pify = __webpack_require__("4CaD")
const BaseBlockTracker = __webpack_require__("/u+i")

const sec = 1000

class PollingBlockTracker extends BaseBlockTracker {

  constructor (opts = {}) {
    // parse + validate args
    if (!opts.provider) throw new Error('PollingBlockTracker - no provider specified.')
    const pollingInterval = opts.pollingInterval || 20 * sec
    const retryTimeout = opts.retryTimeout || pollingInterval / 10
    const keepEventLoopActive = opts.keepEventLoopActive !== undefined ? opts.keepEventLoopActive : true
    const setSkipCacheFlag = opts.setSkipCacheFlag || false
    // BaseBlockTracker constructor
    super(Object.assign({
      blockResetDuration: pollingInterval,
    }, opts))
    // config
    this._provider = opts.provider
    this._pollingInterval = pollingInterval
    this._retryTimeout = retryTimeout
    this._keepEventLoopActive = keepEventLoopActive
    this._setSkipCacheFlag = setSkipCacheFlag
  }

  //
  // public
  //

  // trigger block polling
  async checkForLatestBlock () {
    await this._updateLatestBlock()
    return await this.getLatestBlock()
  }

  //
  // private
  //

  _start () {
    this._performSync().catch(err => this.emit('error', err))
  }

  async _performSync () {
    while (this._isRunning) {
      try {
        await this._updateLatestBlock()
        await timeout(this._pollingInterval, !this._keepEventLoopActive)
      } catch (err) {
        const newErr = new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:\n${err.stack}`)
        try {
          this.emit('error', newErr)
        } catch (emitErr) {
          console.error(newErr)
        }
        await timeout(this._retryTimeout, !this._keepEventLoopActive)
      }
    }
  }

  async _updateLatestBlock () {
    // fetch + set latest block
    const latestBlock = await this._fetchLatestBlock()
    this._newPotentialLatest(latestBlock)
  }

  async _fetchLatestBlock () {
    const req = { jsonrpc: "2.0", id: 1, method: 'eth_blockNumber', params: [] }
    if (this._setSkipCacheFlag) req.skipCache = true
    const res = await pify((cb) => this._provider.sendAsync(req, cb))()
    if (res.error) throw new Error(`PollingBlockTracker - encountered error fetching block:\n${res.error}`)
    return res.result
  }

}

module.exports = PollingBlockTracker

function timeout (duration, unref) {
  return new Promise(resolve => {
    const timoutRef = setTimeout(resolve, duration)
    // don't keep process open
    if (timoutRef.unref && unref) {
      timoutRef.unref()
    }
  })
}


/***/ }),

/***/ "Z4fQ":
/***/ (function(module, exports) {

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module) be nice

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5 engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	Object.defineProperty(Object.prototype, "__global__", {
		get: function () { return this; },
		configurable: true
	});
	try { return __global__; }
	finally { delete Object.prototype.__global__; }
})();


/***/ }),

/***/ "b/S+":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Bytes = __webpack_require__("c/MD");
var Nat = __webpack_require__("moAw");
var elliptic = __webpack_require__("MzeL");
var rlp = __webpack_require__("2YU9");
var secp256k1 = new elliptic.ec("secp256k1"); // eslint-disable-line

var _require = __webpack_require__("ewvk"),
    keccak256 = _require.keccak256,
    keccak256s = _require.keccak256s;

var create = function create(entropy) {
  var innerHex = keccak256(Bytes.concat(Bytes.random(32), entropy || Bytes.random(32)));
  var middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
  var outerHex = keccak256(middleHex);
  return fromPrivate(outerHex);
};

var toChecksum = function toChecksum(address) {
  var addressHash = keccak256s(address.slice(2));
  var checksumAddress = "0x";
  for (var i = 0; i < 40; i++) {
    checksumAddress += parseInt(addressHash[i + 2], 16) > 7 ? address[i + 2].toUpperCase() : address[i + 2];
  }return checksumAddress;
};

var fromPrivate = function fromPrivate(privateKey) {
  var buffer = new Buffer(privateKey.slice(2), "hex");
  var ecKey = secp256k1.keyFromPrivate(buffer);
  var publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
  var publicHash = keccak256(publicKey);
  var address = toChecksum("0x" + publicHash.slice(-40));
  return {
    address: address,
    privateKey: privateKey
  };
};

var encodeSignature = function encodeSignature(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      v = _ref2[0],
      r = Bytes.pad(32, _ref2[1]),
      s = Bytes.pad(32, _ref2[2]);

  return Bytes.flatten([r, s, v]);
};

var decodeSignature = function decodeSignature(hex) {
  return [Bytes.slice(64, Bytes.length(hex), hex), Bytes.slice(0, 32, hex), Bytes.slice(32, 64, hex)];
};

var makeSigner = function makeSigner(addToV) {
  return function (hash, privateKey) {
    var signature = secp256k1.keyFromPrivate(new Buffer(privateKey.slice(2), "hex")).sign(new Buffer(hash.slice(2), "hex"), { canonical: true });
    return encodeSignature([Nat.fromString(Bytes.fromNumber(addToV + signature.recoveryParam)), Bytes.pad(32, Bytes.fromNat("0x" + signature.r.toString(16))), Bytes.pad(32, Bytes.fromNat("0x" + signature.s.toString(16)))]);
  };
};

var sign = makeSigner(27); // v=27|28 instead of 0|1...

var recover = function recover(hash, signature) {
  var vals = decodeSignature(signature);
  var vrs = { v: Bytes.toNumber(vals[0]), r: vals[1].slice(2), s: vals[2].slice(2) };
  var ecPublicKey = secp256k1.recoverPubKey(new Buffer(hash.slice(2), "hex"), vrs, vrs.v < 2 ? vrs.v : 1 - vrs.v % 2); // because odd vals mean v=0... sadly that means v=0 means v=1... I hate that
  var publicKey = "0x" + ecPublicKey.encode("hex", false).slice(2);
  var publicHash = keccak256(publicKey);
  var address = toChecksum("0x" + publicHash.slice(-40));
  return address;
};

module.exports = {
  create: create,
  toChecksum: toChecksum,
  fromPrivate: fromPrivate,
  sign: sign,
  makeSigner: makeSigner,
  recover: recover,
  encodeSignature: encodeSignature,
  decodeSignature: decodeSignature
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "c/MD":
/***/ (function(module, exports, __webpack_require__) {

var A = __webpack_require__("2HNl");

var at = function at(bytes, index) {
  return parseInt(bytes.slice(index * 2 + 2, index * 2 + 4), 16);
};

var random = function random(bytes) {
  var rnd = void 0;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) rnd = window.crypto.getRandomValues(new Uint8Array(bytes));else if (true) rnd = __webpack_require__("HEbw").randomBytes(bytes);else {}
  var hex = "0x";
  for (var i = 0; i < bytes; ++i) {
    hex += ("00" + rnd[i].toString(16)).slice(-2);
  }return hex;
};

var length = function length(a) {
  return (a.length - 2) / 2;
};

var flatten = function flatten(a) {
  return "0x" + a.reduce(function (r, s) {
    return r + s.slice(2);
  }, "");
};

var slice = function slice(i, j, bs) {
  return "0x" + bs.slice(i * 2 + 2, j * 2 + 2);
};

var reverse = function reverse(hex) {
  var rev = "0x";
  for (var i = 0, l = length(hex); i < l; ++i) {
    rev += hex.slice((l - i) * 2, (l - i + 1) * 2);
  }
  return rev;
};

var pad = function pad(l, hex) {
  return hex.length === l * 2 + 2 ? hex : pad(l, "0x" + "0" + hex.slice(2));
};

var padRight = function padRight(l, hex) {
  return hex.length === l * 2 + 2 ? hex : padRight(l, hex + "0");
};

var toArray = function toArray(hex) {
  var arr = [];
  for (var i = 2, l = hex.length; i < l; i += 2) {
    arr.push(parseInt(hex.slice(i, i + 2), 16));
  }return arr;
};

var fromArray = function fromArray(arr) {
  var hex = "0x";
  for (var i = 0, l = arr.length; i < l; ++i) {
    var b = arr[i];
    hex += (b < 16 ? "0" : "") + b.toString(16);
  }
  return hex;
};

var toUint8Array = function toUint8Array(hex) {
  return new Uint8Array(toArray(hex));
};

var fromUint8Array = function fromUint8Array(arr) {
  return fromArray([].slice.call(arr, 0));
};

var fromNumber = function fromNumber(num) {
  var hex = num.toString(16);
  return hex.length % 2 === 0 ? "0x" + hex : "0x0" + hex;
};

var toNumber = function toNumber(hex) {
  return parseInt(hex.slice(2), 16);
};

var concat = function concat(a, b) {
  return a.concat(b.slice(2));
};

var fromNat = function fromNat(bn) {
  return bn === "0x0" ? "0x" : bn.length % 2 === 0 ? bn : "0x0" + bn.slice(2);
};

var toNat = function toNat(bn) {
  return bn[2] === "0" ? "0x" + bn.slice(3) : bn;
};

var fromAscii = function fromAscii(ascii) {
  var hex = "0x";
  for (var i = 0; i < ascii.length; ++i) {
    hex += ("00" + ascii.charCodeAt(i).toString(16)).slice(-2);
  }return hex;
};

var toAscii = function toAscii(hex) {
  var ascii = "";
  for (var i = 2; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }return ascii;
};

// From https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
var fromString = function fromString(s) {
  var makeByte = function makeByte(uint8) {
    var b = uint8.toString(16);
    return b.length < 2 ? "0" + b : b;
  };
  var bytes = "0x";
  for (var ci = 0; ci != s.length; ci++) {
    var c = s.charCodeAt(ci);
    if (c < 128) {
      bytes += makeByte(c);
      continue;
    }
    if (c < 2048) {
      bytes += makeByte(c >> 6 | 192);
    } else {
      if (c > 0xd7ff && c < 0xdc00) {
        if (++ci == s.length) return null;
        var c2 = s.charCodeAt(ci);
        if (c2 < 0xdc00 || c2 > 0xdfff) return null;
        c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
        bytes += makeByte(c >> 18 | 240);
        bytes += makeByte(c >> 12 & 63 | 128);
      } else {
        // c <= 0xffff
        bytes += makeByte(c >> 12 | 224);
      }
      bytes += makeByte(c >> 6 & 63 | 128);
    }
    bytes += makeByte(c & 63 | 128);
  }
  return bytes;
};

var toString = function toString(bytes) {
  var s = '';
  var i = 0;
  var l = length(bytes);
  while (i < l) {
    var c = at(bytes, i++);
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= l) return null;
        c = (c & 31) << 6 | at(bytes, i) & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= l) return null;
        c = (c & 15) << 12 | (at(bytes, i) & 63) << 6 | at(bytes, ++i) & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= l) return null;
        c = (c & 7) << 18 | (at(bytes, i) & 63) << 12 | (at(bytes, ++i) & 63) << 6 | at(bytes, ++i) & 63;
      } else return null;
      ++i;
    }
    if (c <= 0xffff) s += String.fromCharCode(c);else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800);
      s += String.fromCharCode(c & 0x3FF | 0xdc00);
    } else return null;
  }
  return s;
};

module.exports = {
  random: random,
  length: length,
  concat: concat,
  flatten: flatten,
  slice: slice,
  reverse: reverse,
  pad: pad,
  padRight: padRight,
  fromAscii: fromAscii,
  toAscii: toAscii,
  fromString: fromString,
  toString: toString,
  fromNumber: fromNumber,
  toNumber: toNumber,
  fromNat: fromNat,
  toNat: toNat,
  fromArray: fromArray,
  toArray: toArray,
  fromUint8Array: fromUint8Array,
  toUint8Array: toUint8Array
};

/***/ }),

/***/ "drvL":
/***/ (function(module) {

module.exports = JSON.parse("{\"jsonRpc\":{\"parse\":-32700,\"invalidRequest\":-32600,\"methodNotFound\":-32601,\"invalidParams\":-32602,\"internal\":-32603},\"eth\":{\"userRejectedRequest\":4001,\"unauthorized\":4100,\"unsupportedMethod\":4200}}");

/***/ }),

/***/ "ewvk":
/***/ (function(module, exports) {

// This was ported from https://github.com/emn178/js-sha3, with some minor
// modifications and pruning. It is licensed under MIT:
//
// Copyright 2015-2016 Chen, Yi-Cyuan
//  
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var HEX_CHARS = '0123456789abcdef'.split('');
var KECCAK_PADDING = [1, 256, 65536, 16777216];
var SHIFT = [0, 8, 16, 24];
var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

var Keccak = function Keccak(bits) {
  return {
    blocks: [],
    reset: true,
    block: 0,
    start: 0,
    blockCount: 1600 - (bits << 1) >> 5,
    outputBlocks: bits >> 5,
    s: function (s) {
      return [].concat(s, s, s, s, s);
    }([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  };
};

var update = function update(state, message) {
  var length = message.length,
      blocks = state.blocks,
      byteCount = state.blockCount << 2,
      blockCount = state.blockCount,
      outputBlocks = state.outputBlocks,
      s = state.s,
      index = 0,
      i,
      code;

  // update
  while (index < length) {
    if (state.reset) {
      state.reset = false;
      blocks[0] = state.block;
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    if (typeof message !== "string") {
      for (i = state.start; index < length && i < byteCount; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }
    } else {
      for (i = state.start; index < length && i < byteCount; ++index) {
        code = message.charCodeAt(index);
        if (code < 0x80) {
          blocks[i >> 2] |= code << SHIFT[i++ & 3];
        } else if (code < 0x800) {
          blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
          blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        }
      }
    }
    state.lastByteIndex = i;
    if (i >= byteCount) {
      state.start = i - byteCount;
      state.block = blocks[blockCount];
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
      state.reset = true;
    } else {
      state.start = i;
    }
  }

  // finalize
  i = state.lastByteIndex;
  blocks[i >> 2] |= KECCAK_PADDING[i & 3];
  if (state.lastByteIndex === byteCount) {
    blocks[0] = blocks[blockCount];
    for (i = 1; i < blockCount + 1; ++i) {
      blocks[i] = 0;
    }
  }
  blocks[blockCount - 1] |= 0x80000000;
  for (i = 0; i < blockCount; ++i) {
    s[i] ^= blocks[i];
  }
  f(s);

  // toString
  var hex = '',
      i = 0,
      j = 0,
      block;
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      block = s[i];
      hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
    }
    if (j % blockCount === 0) {
      f(s);
      i = 0;
    }
  }
  return "0x" + hex;
};

var f = function f(s) {
  var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

  for (n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    h = c8 ^ (c2 << 1 | c3 >>> 31);
    l = c9 ^ (c3 << 1 | c2 >>> 31);
    s[0] ^= h;
    s[1] ^= l;
    s[10] ^= h;
    s[11] ^= l;
    s[20] ^= h;
    s[21] ^= l;
    s[30] ^= h;
    s[31] ^= l;
    s[40] ^= h;
    s[41] ^= l;
    h = c0 ^ (c4 << 1 | c5 >>> 31);
    l = c1 ^ (c5 << 1 | c4 >>> 31);
    s[2] ^= h;
    s[3] ^= l;
    s[12] ^= h;
    s[13] ^= l;
    s[22] ^= h;
    s[23] ^= l;
    s[32] ^= h;
    s[33] ^= l;
    s[42] ^= h;
    s[43] ^= l;
    h = c2 ^ (c6 << 1 | c7 >>> 31);
    l = c3 ^ (c7 << 1 | c6 >>> 31);
    s[4] ^= h;
    s[5] ^= l;
    s[14] ^= h;
    s[15] ^= l;
    s[24] ^= h;
    s[25] ^= l;
    s[34] ^= h;
    s[35] ^= l;
    s[44] ^= h;
    s[45] ^= l;
    h = c4 ^ (c8 << 1 | c9 >>> 31);
    l = c5 ^ (c9 << 1 | c8 >>> 31);
    s[6] ^= h;
    s[7] ^= l;
    s[16] ^= h;
    s[17] ^= l;
    s[26] ^= h;
    s[27] ^= l;
    s[36] ^= h;
    s[37] ^= l;
    s[46] ^= h;
    s[47] ^= l;
    h = c6 ^ (c0 << 1 | c1 >>> 31);
    l = c7 ^ (c1 << 1 | c0 >>> 31);
    s[8] ^= h;
    s[9] ^= l;
    s[18] ^= h;
    s[19] ^= l;
    s[28] ^= h;
    s[29] ^= l;
    s[38] ^= h;
    s[39] ^= l;
    s[48] ^= h;
    s[49] ^= l;

    b0 = s[0];
    b1 = s[1];
    b32 = s[11] << 4 | s[10] >>> 28;
    b33 = s[10] << 4 | s[11] >>> 28;
    b14 = s[20] << 3 | s[21] >>> 29;
    b15 = s[21] << 3 | s[20] >>> 29;
    b46 = s[31] << 9 | s[30] >>> 23;
    b47 = s[30] << 9 | s[31] >>> 23;
    b28 = s[40] << 18 | s[41] >>> 14;
    b29 = s[41] << 18 | s[40] >>> 14;
    b20 = s[2] << 1 | s[3] >>> 31;
    b21 = s[3] << 1 | s[2] >>> 31;
    b2 = s[13] << 12 | s[12] >>> 20;
    b3 = s[12] << 12 | s[13] >>> 20;
    b34 = s[22] << 10 | s[23] >>> 22;
    b35 = s[23] << 10 | s[22] >>> 22;
    b16 = s[33] << 13 | s[32] >>> 19;
    b17 = s[32] << 13 | s[33] >>> 19;
    b48 = s[42] << 2 | s[43] >>> 30;
    b49 = s[43] << 2 | s[42] >>> 30;
    b40 = s[5] << 30 | s[4] >>> 2;
    b41 = s[4] << 30 | s[5] >>> 2;
    b22 = s[14] << 6 | s[15] >>> 26;
    b23 = s[15] << 6 | s[14] >>> 26;
    b4 = s[25] << 11 | s[24] >>> 21;
    b5 = s[24] << 11 | s[25] >>> 21;
    b36 = s[34] << 15 | s[35] >>> 17;
    b37 = s[35] << 15 | s[34] >>> 17;
    b18 = s[45] << 29 | s[44] >>> 3;
    b19 = s[44] << 29 | s[45] >>> 3;
    b10 = s[6] << 28 | s[7] >>> 4;
    b11 = s[7] << 28 | s[6] >>> 4;
    b42 = s[17] << 23 | s[16] >>> 9;
    b43 = s[16] << 23 | s[17] >>> 9;
    b24 = s[26] << 25 | s[27] >>> 7;
    b25 = s[27] << 25 | s[26] >>> 7;
    b6 = s[36] << 21 | s[37] >>> 11;
    b7 = s[37] << 21 | s[36] >>> 11;
    b38 = s[47] << 24 | s[46] >>> 8;
    b39 = s[46] << 24 | s[47] >>> 8;
    b30 = s[8] << 27 | s[9] >>> 5;
    b31 = s[9] << 27 | s[8] >>> 5;
    b12 = s[18] << 20 | s[19] >>> 12;
    b13 = s[19] << 20 | s[18] >>> 12;
    b44 = s[29] << 7 | s[28] >>> 25;
    b45 = s[28] << 7 | s[29] >>> 25;
    b26 = s[38] << 8 | s[39] >>> 24;
    b27 = s[39] << 8 | s[38] >>> 24;
    b8 = s[48] << 14 | s[49] >>> 18;
    b9 = s[49] << 14 | s[48] >>> 18;

    s[0] = b0 ^ ~b2 & b4;
    s[1] = b1 ^ ~b3 & b5;
    s[10] = b10 ^ ~b12 & b14;
    s[11] = b11 ^ ~b13 & b15;
    s[20] = b20 ^ ~b22 & b24;
    s[21] = b21 ^ ~b23 & b25;
    s[30] = b30 ^ ~b32 & b34;
    s[31] = b31 ^ ~b33 & b35;
    s[40] = b40 ^ ~b42 & b44;
    s[41] = b41 ^ ~b43 & b45;
    s[2] = b2 ^ ~b4 & b6;
    s[3] = b3 ^ ~b5 & b7;
    s[12] = b12 ^ ~b14 & b16;
    s[13] = b13 ^ ~b15 & b17;
    s[22] = b22 ^ ~b24 & b26;
    s[23] = b23 ^ ~b25 & b27;
    s[32] = b32 ^ ~b34 & b36;
    s[33] = b33 ^ ~b35 & b37;
    s[42] = b42 ^ ~b44 & b46;
    s[43] = b43 ^ ~b45 & b47;
    s[4] = b4 ^ ~b6 & b8;
    s[5] = b5 ^ ~b7 & b9;
    s[14] = b14 ^ ~b16 & b18;
    s[15] = b15 ^ ~b17 & b19;
    s[24] = b24 ^ ~b26 & b28;
    s[25] = b25 ^ ~b27 & b29;
    s[34] = b34 ^ ~b36 & b38;
    s[35] = b35 ^ ~b37 & b39;
    s[44] = b44 ^ ~b46 & b48;
    s[45] = b45 ^ ~b47 & b49;
    s[6] = b6 ^ ~b8 & b0;
    s[7] = b7 ^ ~b9 & b1;
    s[16] = b16 ^ ~b18 & b10;
    s[17] = b17 ^ ~b19 & b11;
    s[26] = b26 ^ ~b28 & b20;
    s[27] = b27 ^ ~b29 & b21;
    s[36] = b36 ^ ~b38 & b30;
    s[37] = b37 ^ ~b39 & b31;
    s[46] = b46 ^ ~b48 & b40;
    s[47] = b47 ^ ~b49 & b41;
    s[8] = b8 ^ ~b0 & b2;
    s[9] = b9 ^ ~b1 & b3;
    s[18] = b18 ^ ~b10 & b12;
    s[19] = b19 ^ ~b11 & b13;
    s[28] = b28 ^ ~b20 & b22;
    s[29] = b29 ^ ~b21 & b23;
    s[38] = b38 ^ ~b30 & b32;
    s[39] = b39 ^ ~b31 & b33;
    s[48] = b48 ^ ~b40 & b42;
    s[49] = b49 ^ ~b41 & b43;

    s[0] ^= RC[n];
    s[1] ^= RC[n + 1];
  }
};

var keccak = function keccak(bits) {
  return function (str) {
    var msg;
    if (str.slice(0, 2) === "0x") {
      msg = [];
      for (var i = 2, l = str.length; i < l; i += 2) {
        msg.push(parseInt(str.slice(i, i + 2), 16));
      }
    } else {
      msg = str;
    }
    return update(Keccak(bits, bits), msg);
  };
};

module.exports = {
  keccak256: keccak(256),
  keccak512: keccak(512),
  keccak256s: keccak(256),
  keccak512s: keccak(512)
};

/***/ }),

/***/ "moAw":
/***/ (function(module, exports, __webpack_require__) {

var BN = __webpack_require__("OZ/i");
var Bytes = __webpack_require__("c/MD");

var fromBN = function fromBN(bn) {
  return "0x" + bn.toString("hex");
};

var toBN = function toBN(str) {
  return new BN(str.slice(2), 16);
};

var fromString = function fromString(str) {
  var bn = "0x" + (str.slice(0, 2) === "0x" ? new BN(str.slice(2), 16) : new BN(str, 10)).toString("hex");
  return bn === "0x0" ? "0x" : bn;
};

var toEther = function toEther(wei) {
  return toNumber(div(wei, fromString("10000000000"))) / 100000000;
};

var fromEther = function fromEther(eth) {
  return mul(fromNumber(Math.floor(eth * 100000000)), fromString("10000000000"));
};

var toString = function toString(a) {
  return toBN(a).toString(10);
};

var fromNumber = function fromNumber(a) {
  return typeof a === "string" ? /^0x/.test(a) ? a : "0x" + a : "0x" + new BN(a).toString("hex");
};

var toNumber = function toNumber(a) {
  return toBN(a).toNumber();
};

var toUint256 = function toUint256(a) {
  return Bytes.pad(32, a);
};

var bin = function bin(method) {
  return function (a, b) {
    return fromBN(toBN(a)[method](toBN(b)));
  };
};

var add = bin("add");
var mul = bin("mul");
var div = bin("div");
var sub = bin("sub");

module.exports = {
  toString: toString,
  fromString: fromString,
  toNumber: toNumber,
  fromNumber: fromNumber,
  toEther: toEther,
  fromEther: fromEther,
  toUint256: toUint256,
  add: add,
  mul: mul,
  div: div,
  sub: sub
};

/***/ }),

/***/ "rdiz":
/***/ (function(module, exports, __webpack_require__) {


const errorValues = __webpack_require__("1TIO")
const FALLBACK_ERROR_CODE = __webpack_require__("drvL").jsonRpc.internal
const { JsonRpcError } = __webpack_require__("Lf5n")

const JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.'

const FALLBACK_MESSAGE = 'Unspecified error message. This is  bug, please report it.'

const FALLBACK_ERROR = {
  code: FALLBACK_ERROR_CODE,
  message: getMessageFromCode(FALLBACK_ERROR_CODE)
}

/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 * @param {number} code - The integer error code.
 * @param {string} fallbackMessage - The fallback message.
 * @return {string} The corresponding message or the fallback message.
 */
function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {

  if (Number.isInteger(code)) {

    const codeString = code.toString()
    if (errorValues[codeString]) return errorValues[codeString].message

    if (isJsonRpcServerError(code)) return JSON_RPC_SERVER_ERROR_MESSAGE

    // TODO: allow valid codes and messages to be extended
    // // EIP 1193 Status Codes
    // if (code >= 4000 && code <= 4999) return Something?
  }
  return fallbackMessage
}

/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 * @param {number} code - The code to check
 * @return {boolean} true if the code is valid, false otherwise.
 */
function isValidCode(code) {

  if (!Number.isInteger(code)) return false

  const codeString = code.toString()
  if (errorValues[codeString]) return true

  if (isJsonRpcServerError(code)) return true

  // TODO: allow valid codes and messages to be extended
  // // EIP 1193 Status Codes
  // if (code >= 4000 && code <= 4999) return true

  return false
}

/**
 * Serializes the given error to an ETH JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 * Adds a 'stack' property if it exists on the given error.
 *
 * @param {any} error - The error to serialize.
 * @param {object} fallbackError - The custom fallback error values if the
 * given error is invalid.
 * @return {object} A standardized error object.
 */
function serializeError (error, fallbackError = FALLBACK_ERROR) {

  if (
    !fallbackError || 
    !Number.isInteger(fallbackError.code) ||
    typeof fallbackError.message !== 'string'
  ) {
    throw new Error(
      'fallbackError must contain integer number code and string message.'
    )
  }

  if (typeof error === 'object' && error instanceof JsonRpcError) {
    return error.serialize()
  }

  const serialized = {}

  if (error && isValidCode(error.code)) {

    serialized.code = error.code

    if (error.message && typeof error.message === 'string') {
      serialized.message = error.message
      if (error.hasOwnProperty('data')) serialized.data = error.data
    } else {
      serialized.message = getMessageFromCode(serialized.code)
      serialized.data = { originalError: assignOriginalError(error) }
    }

  } else {
    serialized.code = fallbackError.code
    serialized.message = fallbackError.message
    serialized.data = { originalError: assignOriginalError(error) }
  }

  if (error && error.stack) serialized.stack = error.stack
  return serialized
}

// Internal

function isJsonRpcServerError (code) {
  return code >= -32099 && code <= -32000
}

function assignOriginalError (error) {
  if (error && typeof error === 'object' && !Array.isArray(error)) {
    return Object.assign({}, error)
  }
  return error
}

// Exports

module.exports = {
  getMessageFromCode,
  isValidCode,
  serializeError,
  JSON_RPC_SERVER_ERROR_MESSAGE,
}


/***/ }),

/***/ "z8+S":
/***/ (function(module, exports, __webpack_require__) {


const { JsonRpcError, EthJsonRpcError } = __webpack_require__("Lf5n")
const {
  serializeError, getMessageFromCode,
} = __webpack_require__("rdiz")
const errors = __webpack_require__("zUc0")
const ERROR_CODES = __webpack_require__("drvL")

module.exports = {
  errors,
  JsonRpcError,
  EthJsonRpcError,
  serializeError,
  getMessageFromCode,
  /** @type ErrorCodes */
  ERROR_CODES,
}

// Types

/**
 * @typedef {Object} EthJsonRpcErrorCodes
 * @property {number} userRejectedRequest
 * @property {number} unauthorized
 * @property {number} unsupportedMethod
 */

/**
 * @typedef {Object} JsonRpcErrorCodes
 * @property {number} parse
 * @property {number} invalidRequest
 * @property {number} invalidParams
 * @property {number} methodNotFound
 * @property {number} internal
 */

/**
 * @typedef ErrorCodes
 * @property {JsonRpcErrorCodes} jsonRpc
 * @property {EthJsonRpcErrorCodes} eth
 */


/***/ }),

/***/ "zUc0":
/***/ (function(module, exports, __webpack_require__) {


const { JsonRpcError, EthJsonRpcError } = __webpack_require__("Lf5n")
const { getMessageFromCode } = __webpack_require__("rdiz")
const ERROR_CODES = __webpack_require__("drvL")

module.exports = {
  /**
   * Get a JSON RPC 2.0 Parse error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  parse: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.parse, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Invalid Request error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  invalidRequest: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.invalidRequest, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Invalid Params error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  invalidParams: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.invalidParams, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Method Not Found error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  methodNotFound: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.methodNotFound, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Internal error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  internal: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.internal, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Server error.
   * Permits integer error codes in the [ -32099 <= -32000 ] range.
   * @param {number} code - The integer error code.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  server: (code, message, data) => {
    if (!Number.isInteger(code) || code > -32000 || code < -32099) {
      throw new Error(
        '"code" must be an integer such that: -32099 <= code <= -32000'
      )
    }
    return getJsonRpcError(code, message, data)
  },
  eth: {
    /**
     * Get an Ethereum JSON RPC User Rejected Request error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    userRejectedRequest: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.userRejectedRequest, message, data
      )
    },

    /**
     * Get an Ethereum JSON RPC Unauthorized error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    unauthorized: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.unauthorized, message, data
      )
    },

    /**
     * Get an Ethereum JSON RPC Unsupported Method error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    unsupportedMethod: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.unsupportedMethod, message, data
      )
    },

    /**
     * Get a custom Ethereum JSON RPC error.
     * @param {string} code - The error code.
     * @param {string} message - The error message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    custom: (code, message, data) => {
      if (!message || typeof message !== 'string') throw new Error(
        '"message" must be a nonempty string'
      )
      return new EthJsonRpcError(code, message, data)
    },
  },
}

// Internal

function getJsonRpcError(code, message, data) {
  return new JsonRpcError(
    code,
    message || getMessageFromCode(code),
    data
  )
}

function getEthJsonRpcError(code, message, data) {
  return new EthJsonRpcError(
    code,
    message || getMessageFromCode(code),
    data
  )
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWJsb2NrLXRyYWNrZXIvc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aC1saWIvbGliL2FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGgtbGliL2xpYi9ybHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aC1ibG9jay10cmFja2VyL25vZGVfbW9kdWxlcy9waWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGgtc2lnLXV0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aC1lbnMtbmFtZWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aC1qc29uLXJwYy1lcnJvcnMvc3JjL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V0aC1xdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWJsb2NrLXRyYWNrZXIvc3JjL3BvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGgtbGliL2xpYi9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGgtbGliL2xpYi9ieXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWxpYi9saWIvaGFzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWxpYi9saWIvbmF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldGgtanNvbi1ycGMtZXJyb3JzL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWpzb24tcnBjLWVycm9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXRoLWpzb24tcnBjLWVycm9ycy9zcmMvZXJyb3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUJBQWlCLG1CQUFPLENBQUMsTUFBVztBQUNwQyxhQUFhLG1CQUFPLENBQUMsTUFBTTtBQUMzQix5QkFBeUIsbUJBQU8sQ0FBQyxNQUFvQjs7QUFFckQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0EsaUJB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcn43OWNjYzkyNC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdGhRdWVyeSA9IHJlcXVpcmUoJ2V0aC1xdWVyeScpXG5jb25zdCBwaWZ5ID0gcmVxdWlyZSgncGlmeScpXG5jb25zdCBTYWZlRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnc2FmZS1ldmVudC1lbWl0dGVyJylcblxuY29uc3Qgc2VjID0gMTAwMFxuXG5jb25zdCBjYWxjdWxhdGVTdW0gPSAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4gYWNjdW11bGF0b3IgKyBjdXJyZW50VmFsdWVcbmNvbnN0IGJsb2NrVHJhY2tlckV2ZW50cyA9IFsnc3luYycsICdsYXRlc3QnXVxuXG5jbGFzcyBCYXNlQmxvY2tUcmFja2VyIGV4dGVuZHMgU2FmZUV2ZW50RW1pdHRlciB7XG5cbiAgLy9cbiAgLy8gcHVibGljXG4gIC8vXG5cbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIHN1cGVyKClcbiAgICAvLyBjb25maWdcbiAgICB0aGlzLl9ibG9ja1Jlc2V0RHVyYXRpb24gPSBvcHRzLmJsb2NrUmVzZXREdXJhdGlvbiB8fCAyMCAqIHNlY1xuICAgIC8vIHN0YXRlXG4gICAgdGhpcy5fYmxvY2tSZXNldFRpbWVvdXRcbiAgICB0aGlzLl9jdXJyZW50QmxvY2sgPSBudWxsXG4gICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2VcbiAgICAvLyBiaW5kIGZ1bmN0aW9ucyBmb3IgaW50ZXJuYWwgdXNlXG4gICAgdGhpcy5fb25OZXdMaXN0ZW5lciA9IHRoaXMuX29uTmV3TGlzdGVuZXIuYmluZCh0aGlzKVxuICAgIHRoaXMuX29uUmVtb3ZlTGlzdGVuZXIgPSB0aGlzLl9vblJlbW92ZUxpc3RlbmVyLmJpbmQodGhpcylcbiAgICB0aGlzLl9yZXNldEN1cnJlbnRCbG9jayA9IHRoaXMuX3Jlc2V0Q3VycmVudEJsb2NrLmJpbmQodGhpcylcbiAgICAvLyBsaXN0ZW4gZm9yIGhhbmRsZXIgY2hhbmdlc1xuICAgIHRoaXMuX3NldHVwSW50ZXJuYWxFdmVudHMoKVxuICB9XG5cbiAgaXNSdW5uaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNSdW5uaW5nXG4gIH1cblxuICBnZXRDdXJyZW50QmxvY2sgKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50QmxvY2tcbiAgfVxuXG4gIGFzeW5jIGdldExhdGVzdEJsb2NrICgpIHtcbiAgICAvLyByZXR1cm4gaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRCbG9jaykgcmV0dXJuIHRoaXMuX2N1cnJlbnRCbG9ja1xuICAgIC8vIHdhaXQgZm9yIGEgbmV3IGxhdGVzdCBibG9ja1xuICAgIGNvbnN0IGxhdGVzdEJsb2NrID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoJ2xhdGVzdCcsIHJlc29sdmUpKVxuICAgIC8vIHJldHVybiBuZXdseSBzZXQgY3VycmVudCBibG9ja1xuICAgIHJldHVybiBsYXRlc3RCbG9ja1xuICB9XG5cbiAgLy8gZG9udCBhbGxvdyBtb2R1bGUgY29uc3VtZXIgdG8gcmVtb3ZlIG91ciBpbnRlcm5hbCBldmVudCBsaXN0ZW5lcnNcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzIChldmVudE5hbWUpIHtcbiAgICAvLyBwZXJmb3JtIGRlZmF1bHQgYmVoYXZpb3IsIHByZXNlcnZlIGZuIGFyaXR5XG4gICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgc3VwZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlQWxsTGlzdGVuZXJzKClcbiAgICB9XG4gICAgLy8gcmUtYWRkIGludGVybmFsIGV2ZW50c1xuICAgIHRoaXMuX3NldHVwSW50ZXJuYWxFdmVudHMoKVxuICAgIC8vIHRyaWdnZXIgc3RvcCBjaGVjayBqdXN0IGluIGNhc2VcbiAgICB0aGlzLl9vblJlbW92ZUxpc3RlbmVyKClcbiAgfVxuXG4gIC8vXG4gIC8vIHRvIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzXG4gIC8vXG5cbiAgX3N0YXJ0ICgpIHtcbiAgICAvLyBkZWZhdWx0IGJlaGF2aW9yIGlzIG5vb3BcbiAgfVxuXG4gIF9lbmQgKCkge1xuICAgIC8vIGRlZmF1bHQgYmVoYXZpb3IgaXMgbm9vcFxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZVxuICAvL1xuXG4gIF9zZXR1cEludGVybmFsRXZlbnRzICgpIHtcbiAgICAvLyBmaXJzdCByZW1vdmUgbGlzdGVuZXJzIGZvciBpZGVtcG90ZW5jZVxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ25ld0xpc3RlbmVyJywgdGhpcy5fb25OZXdMaXN0ZW5lcilcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdyZW1vdmVMaXN0ZW5lcicsIHRoaXMuX29uUmVtb3ZlTGlzdGVuZXIpXG4gICAgLy8gdGhlbiBhZGQgdGhlbVxuICAgIHRoaXMub24oJ25ld0xpc3RlbmVyJywgdGhpcy5fb25OZXdMaXN0ZW5lcilcbiAgICB0aGlzLm9uKCdyZW1vdmVMaXN0ZW5lcicsIHRoaXMuX29uUmVtb3ZlTGlzdGVuZXIpXG4gIH1cblxuICBfb25OZXdMaXN0ZW5lciAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgLy8gYG5ld0xpc3RlbmVyYCBpcyBjYWxsZWQgKmJlZm9yZSogdGhlIGxpc3RlbmVyIGlzIGFkZGVkXG4gICAgaWYgKCFibG9ja1RyYWNrZXJFdmVudHMuaW5jbHVkZXMoZXZlbnROYW1lKSkgcmV0dXJuXG4gICAgdGhpcy5fbWF5YmVTdGFydCgpXG4gIH1cblxuICBfb25SZW1vdmVMaXN0ZW5lciAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgLy8gYHJlbW92ZUxpc3RlbmVyYCBpcyBjYWxsZWQgKmFmdGVyKiB0aGUgbGlzdGVuZXIgaXMgcmVtb3ZlZFxuICAgIGlmICh0aGlzLl9nZXRCbG9ja1RyYWNrZXJFdmVudENvdW50KCkgPiAwKSByZXR1cm5cbiAgICB0aGlzLl9tYXliZUVuZCgpXG4gIH1cblxuICBfbWF5YmVTdGFydCAoKSB7XG4gICAgaWYgKHRoaXMuX2lzUnVubmluZykgcmV0dXJuXG4gICAgdGhpcy5faXNSdW5uaW5nID0gdHJ1ZVxuICAgIC8vIGNhbmNlbCBzZXR0aW5nIGxhdGVzdCBibG9jayB0byBzdGFsZVxuICAgIHRoaXMuX2NhbmNlbEJsb2NrUmVzZXRUaW1lb3V0KClcbiAgICB0aGlzLl9zdGFydCgpXG4gIH1cblxuICBfbWF5YmVFbmQgKCkge1xuICAgIGlmICghdGhpcy5faXNSdW5uaW5nKSByZXR1cm5cbiAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZVxuICAgIHRoaXMuX3NldHVwQmxvY2tSZXNldFRpbWVvdXQoKVxuICAgIHRoaXMuX2VuZCgpXG4gIH1cblxuICBfZ2V0QmxvY2tUcmFja2VyRXZlbnRDb3VudCAoKSB7XG4gICAgcmV0dXJuIGJsb2NrVHJhY2tlckV2ZW50c1xuICAgICAgLm1hcChldmVudE5hbWUgPT4gdGhpcy5saXN0ZW5lckNvdW50KGV2ZW50TmFtZSkpXG4gICAgICAucmVkdWNlKGNhbGN1bGF0ZVN1bSlcbiAgfVxuXG4gIF9uZXdQb3RlbnRpYWxMYXRlc3QgKG5ld0Jsb2NrKSB7XG4gICAgY29uc3QgY3VycmVudEJsb2NrID0gdGhpcy5fY3VycmVudEJsb2NrXG4gICAgLy8gb25seSB1cGRhdGUgaWYgYmxvayBudW1iZXIgaXMgaGlnaGVyXG4gICAgaWYgKGN1cnJlbnRCbG9jayAmJiAoaGV4VG9JbnQobmV3QmxvY2spIDw9IGhleFRvSW50KGN1cnJlbnRCbG9jaykpKSByZXR1cm5cbiAgICB0aGlzLl9zZXRDdXJyZW50QmxvY2sobmV3QmxvY2spXG4gIH1cblxuICBfc2V0Q3VycmVudEJsb2NrIChuZXdCbG9jaykge1xuICAgIGNvbnN0IG9sZEJsb2NrID0gdGhpcy5fY3VycmVudEJsb2NrXG4gICAgdGhpcy5fY3VycmVudEJsb2NrID0gbmV3QmxvY2tcbiAgICB0aGlzLmVtaXQoJ2xhdGVzdCcsIG5ld0Jsb2NrKVxuICAgIHRoaXMuZW1pdCgnc3luYycsIHsgb2xkQmxvY2ssIG5ld0Jsb2NrIH0pXG4gIH1cblxuICBfc2V0dXBCbG9ja1Jlc2V0VGltZW91dCAoKSB7XG4gICAgLy8gY2xlYXIgYW55IGV4aXN0aW5nIHRpbWVvdXRcbiAgICB0aGlzLl9jYW5jZWxCbG9ja1Jlc2V0VGltZW91dCgpXG4gICAgLy8gY2xlYXIgbGF0ZXN0IGJsb2NrIHdoZW4gc3RhbGVcbiAgICB0aGlzLl9ibG9ja1Jlc2V0VGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fcmVzZXRDdXJyZW50QmxvY2ssIHRoaXMuX2Jsb2NrUmVzZXREdXJhdGlvbilcbiAgICAvLyBub2RlanMgLSBkb250IGhvbGQgcHJvY2VzcyBvcGVuXG4gICAgaWYgKHRoaXMuX2Jsb2NrUmVzZXRUaW1lb3V0LnVucmVmKSB7XG4gICAgICB0aGlzLl9ibG9ja1Jlc2V0VGltZW91dC51bnJlZigpXG4gICAgfVxuICB9XG5cbiAgX2NhbmNlbEJsb2NrUmVzZXRUaW1lb3V0ICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fYmxvY2tSZXNldFRpbWVvdXQpXG4gIH1cblxuICBfcmVzZXRDdXJyZW50QmxvY2sgKCkge1xuICAgIHRoaXMuX2N1cnJlbnRCbG9jayA9IG51bGxcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUJsb2NrVHJhY2tlclxuXG5mdW5jdGlvbiBoZXhUb0ludChoZXhJbnQpIHtcbiAgcmV0dXJuIE51bWJlci5wYXJzZUludChoZXhJbnQsIDE2KVxufVxuIiwidmFyIGdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUobnVtLCBmbikge1xuICB2YXIgYSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgKytpKSB7XG4gICAgYS5wdXNoKGZuKGkpKTtcbiAgfXJldHVybiBhO1xufTtcblxudmFyIHJlcGxpY2F0ZSA9IGZ1bmN0aW9uIHJlcGxpY2F0ZShudW0sIHZhbCkge1xuICByZXR1cm4gZ2VuZXJhdGUobnVtLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSk7XG59O1xuXG52YXIgY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufTtcblxudmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiBmbGF0dGVuKGEpIHtcbiAgdmFyIHIgPSBbXTtcbiAgZm9yICh2YXIgaiA9IDAsIEogPSBhLmxlbmd0aDsgaiA8IEo7ICsraikge1xuICAgIGZvciAodmFyIGkgPSAwLCBJID0gYVtqXS5sZW5ndGg7IGkgPCBJOyArK2kpIHtcbiAgICAgIHIucHVzaChhW2pdW2ldKTtcbiAgICB9XG4gIH1yZXR1cm4gcjtcbn07XG5cbnZhciBjaHVua3NPZiA9IGZ1bmN0aW9uIGNodW5rc09mKG4sIGEpIHtcbiAgdmFyIGIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhLmxlbmd0aDsgaSA8IGw7IGkgKz0gbikge1xuICAgIGIucHVzaChhLnNsaWNlKGksIGkgKyBuKSk7XG4gIH1yZXR1cm4gYjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZW5lcmF0ZTogZ2VuZXJhdGUsXG4gIHJlcGxpY2F0ZTogcmVwbGljYXRlLFxuICBjb25jYXQ6IGNvbmNhdCxcbiAgZmxhdHRlbjogZmxhdHRlbixcbiAgY2h1bmtzT2Y6IGNodW5rc09mXG59OyIsIi8vIFRoZSBSTFAgZm9ybWF0XG4vLyBTZXJpYWxpemF0aW9uIGFuZCBkZXNlcmlhbGl6YXRpb24gZm9yIHRoZSBCeXRlc1RyZWUgdHlwZSwgdW5kZXIgdGhlIGZvbGxvd2luZyBncmFtbWFyOlxuLy8gfCBGaXJzdCBieXRlIHwgTWVhbmluZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gfCAtLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuLy8gfCAwICAgdG8gMTI3IHwgSEVYKGxlYWYpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gfCAxMjggdG8gMTgzIHwgSEVYKGxlbmd0aF9vZl9sZWFmICsgMTI4KSArIEhFWChsZWFmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gfCAxODQgdG8gMTkxIHwgSEVYKGxlbmd0aF9vZl9sZW5ndGhfb2ZfbGVhZiArIDEyOCArIDU1KSArIEhFWChsZW5ndGhfb2ZfbGVhZikgKyBIRVgobGVhZikgfFxuLy8gfCAxOTIgdG8gMjQ3IHwgSEVYKGxlbmd0aF9vZl9ub2RlICsgMTkyKSArIEhFWChub2RlKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gfCAyNDggdG8gMjU1IHwgSEVYKGxlbmd0aF9vZl9sZW5ndGhfb2Zfbm9kZSArIDEyOCArIDU1KSArIEhFWChsZW5ndGhfb2Zfbm9kZSkgKyBIRVgobm9kZSkgfFxuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHRyZWUpIHtcbiAgdmFyIHBhZEV2ZW4gPSBmdW5jdGlvbiBwYWRFdmVuKHN0cikge1xuICAgIHJldHVybiBzdHIubGVuZ3RoICUgMiA9PT0gMCA/IHN0ciA6IFwiMFwiICsgc3RyO1xuICB9O1xuXG4gIHZhciB1aW50ID0gZnVuY3Rpb24gdWludChudW0pIHtcbiAgICByZXR1cm4gcGFkRXZlbihudW0udG9TdHJpbmcoMTYpKTtcbiAgfTtcblxuICB2YXIgbGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKGxlbiwgYWRkKSB7XG4gICAgcmV0dXJuIGxlbiA8IDU2ID8gdWludChhZGQgKyBsZW4pIDogdWludChhZGQgKyB1aW50KGxlbikubGVuZ3RoIC8gMiArIDU1KSArIHVpbnQobGVuKTtcbiAgfTtcblxuICB2YXIgZGF0YVRyZWUgPSBmdW5jdGlvbiBkYXRhVHJlZSh0cmVlKSB7XG4gICAgaWYgKHR5cGVvZiB0cmVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgaGV4ID0gdHJlZS5zbGljZSgyKTtcbiAgICAgIHZhciBwcmUgPSBoZXgubGVuZ3RoICE9IDIgfHwgaGV4ID49IFwiODBcIiA/IGxlbmd0aChoZXgubGVuZ3RoIC8gMiwgMTI4KSA6IFwiXCI7XG4gICAgICByZXR1cm4gcHJlICsgaGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2hleCA9IHRyZWUubWFwKGRhdGFUcmVlKS5qb2luKFwiXCIpO1xuICAgICAgdmFyIF9wcmUgPSBsZW5ndGgoX2hleC5sZW5ndGggLyAyLCAxOTIpO1xuICAgICAgcmV0dXJuIF9wcmUgKyBfaGV4O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gXCIweFwiICsgZGF0YVRyZWUodHJlZSk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKGhleCkge1xuICB2YXIgaSA9IDI7XG5cbiAgdmFyIHBhcnNlVHJlZSA9IGZ1bmN0aW9uIHBhcnNlVHJlZSgpIHtcbiAgICBpZiAoaSA+PSBoZXgubGVuZ3RoKSB0aHJvdyBcIlwiO1xuICAgIHZhciBoZWFkID0gaGV4LnNsaWNlKGksIGkgKyAyKTtcbiAgICByZXR1cm4gaGVhZCA8IFwiODBcIiA/IChpICs9IDIsIFwiMHhcIiArIGhlYWQpIDogaGVhZCA8IFwiYzBcIiA/IHBhcnNlSGV4KCkgOiBwYXJzZUxpc3QoKTtcbiAgfTtcblxuICB2YXIgcGFyc2VMZW5ndGggPSBmdW5jdGlvbiBwYXJzZUxlbmd0aCgpIHtcbiAgICB2YXIgbGVuID0gcGFyc2VJbnQoaGV4LnNsaWNlKGksIGkgKz0gMiksIDE2KSAlIDY0O1xuICAgIHJldHVybiBsZW4gPCA1NiA/IGxlbiA6IHBhcnNlSW50KGhleC5zbGljZShpLCBpICs9IChsZW4gLSA1NSkgKiAyKSwgMTYpO1xuICB9O1xuXG4gIHZhciBwYXJzZUhleCA9IGZ1bmN0aW9uIHBhcnNlSGV4KCkge1xuICAgIHZhciBsZW4gPSBwYXJzZUxlbmd0aCgpO1xuICAgIHJldHVybiBcIjB4XCIgKyBoZXguc2xpY2UoaSwgaSArPSBsZW4gKiAyKTtcbiAgfTtcblxuICB2YXIgcGFyc2VMaXN0ID0gZnVuY3Rpb24gcGFyc2VMaXN0KCkge1xuICAgIHZhciBsaW0gPSBwYXJzZUxlbmd0aCgpICogMiArIGk7XG4gICAgdmFyIGxpc3QgPSBbXTtcbiAgICB3aGlsZSAoaSA8IGxpbSkge1xuICAgICAgbGlzdC5wdXNoKHBhcnNlVHJlZSgpKTtcbiAgICB9cmV0dXJuIGxpc3Q7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gcGFyc2VUcmVlKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBlbmNvZGU6IGVuY29kZSwgZGVjb2RlOiBkZWNvZGUgfTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHByb2Nlc3NGbiA9IChmbiwgb3B0cykgPT4gZnVuY3Rpb24gKCkge1xuXHRjb25zdCBQID0gb3B0cy5wcm9taXNlTW9kdWxlO1xuXHRjb25zdCBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcblx0fVxuXG5cdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKG9wdHMuZXJyb3JGaXJzdCkge1xuXHRcdFx0YXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuXHRcdFx0XHRpZiAob3B0cy5tdWx0aUFyZ3MpIHtcblx0XHRcdFx0XHRjb25zdCByZXN1bHRzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRzLnVuc2hpZnQoZXJyKTtcblx0XHRcdFx0XHRcdHJlamVjdChyZXN1bHRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJncy5wdXNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0aWYgKG9wdHMubXVsdGlBcmdzKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0cmVzdWx0c1tpXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdHMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Zm4uYXBwbHkodGhpcywgYXJncyk7XG5cdH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAob2JqLCBvcHRzKSA9PiB7XG5cdG9wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRleGNsdWRlOiBbLy4rKFN5bmN8U3RyZWFtKSQvXSxcblx0XHRlcnJvckZpcnN0OiB0cnVlLFxuXHRcdHByb21pc2VNb2R1bGU6IFByb21pc2Vcblx0fSwgb3B0cyk7XG5cblx0Y29uc3QgZmlsdGVyID0ga2V5ID0+IHtcblx0XHRjb25zdCBtYXRjaCA9IHBhdHRlcm4gPT4gdHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnID8ga2V5ID09PSBwYXR0ZXJuIDogcGF0dGVybi50ZXN0KGtleSk7XG5cdFx0cmV0dXJuIG9wdHMuaW5jbHVkZSA/IG9wdHMuaW5jbHVkZS5zb21lKG1hdGNoKSA6ICFvcHRzLmV4Y2x1ZGUuc29tZShtYXRjaCk7XG5cdH07XG5cblx0bGV0IHJldDtcblx0aWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAob3B0cy5leGNsdWRlTWFpbikge1xuXHRcdFx0XHRyZXR1cm4gb2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9jZXNzRm4ob2JqLCBvcHRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0cmV0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBndWFyZC1mb3ItaW5cblx0XHRjb25zdCB4ID0gb2JqW2tleV07XG5cdFx0cmV0W2tleV0gPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyAmJiBmaWx0ZXIoa2V5KSA/IHByb2Nlc3NGbih4LCBvcHRzKSA6IHg7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsImNvbnN0IGV0aFV0aWwgPSByZXF1aXJlKCdldGhlcmV1bWpzLXV0aWwnKVxuY29uc3QgZXRoQWJpID0gcmVxdWlyZSgnZXRoZXJldW1qcy1hYmknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBjb25jYXRTaWc6IGZ1bmN0aW9uICh2LCByLCBzKSB7XG4gICAgY29uc3QgclNpZyA9IGV0aFV0aWwuZnJvbVNpZ25lZChyKVxuICAgIGNvbnN0IHNTaWcgPSBldGhVdGlsLmZyb21TaWduZWQocylcbiAgICBjb25zdCB2U2lnID0gZXRoVXRpbC5idWZmZXJUb0ludCh2KVxuICAgIGNvbnN0IHJTdHIgPSBwYWRXaXRoWmVyb2VzKGV0aFV0aWwudG9VbnNpZ25lZChyU2lnKS50b1N0cmluZygnaGV4JyksIDY0KVxuICAgIGNvbnN0IHNTdHIgPSBwYWRXaXRoWmVyb2VzKGV0aFV0aWwudG9VbnNpZ25lZChzU2lnKS50b1N0cmluZygnaGV4JyksIDY0KVxuICAgIGNvbnN0IHZTdHIgPSBldGhVdGlsLnN0cmlwSGV4UHJlZml4KGV0aFV0aWwuaW50VG9IZXgodlNpZykpXG4gICAgcmV0dXJuIGV0aFV0aWwuYWRkSGV4UHJlZml4KHJTdHIuY29uY2F0KHNTdHIsIHZTdHIpKS50b1N0cmluZygnaGV4JylcbiAgfSxcblxuICBub3JtYWxpemU6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmICghaW5wdXQpIHJldHVyblxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGV0aFV0aWwudG9CdWZmZXIoaW5wdXQpXG4gICAgICBpbnB1dCA9IGV0aFV0aWwuYnVmZmVyVG9IZXgoYnVmZmVyKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbXNnID0gJ2V0aC1zaWctdXRpbC5ub3JtYWxpemUoKSByZXF1aXJlcyBoZXggc3RyaW5nIG9yIGludGVnZXIgaW5wdXQuJ1xuICAgICAgbXNnICs9ICcgcmVjZWl2ZWQgJyArICh0eXBlb2YgaW5wdXQpICsgJzogJyArIGlucHV0XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgIH1cblxuICAgIHJldHVybiBldGhVdGlsLmFkZEhleFByZWZpeChpbnB1dC50b0xvd2VyQ2FzZSgpKVxuICB9LFxuXG4gIHBlcnNvbmFsU2lnbjogZnVuY3Rpb24gKHByaXZhdGVLZXksIG1zZ1BhcmFtcykge1xuICAgIHZhciBtZXNzYWdlID0gZXRoVXRpbC50b0J1ZmZlcihtc2dQYXJhbXMuZGF0YSlcbiAgICB2YXIgbXNnSGFzaCA9IGV0aFV0aWwuaGFzaFBlcnNvbmFsTWVzc2FnZShtZXNzYWdlKVxuICAgIHZhciBzaWcgPSBldGhVdGlsLmVjc2lnbihtc2dIYXNoLCBwcml2YXRlS2V5KVxuICAgIHZhciBzZXJpYWxpemVkID0gZXRoVXRpbC5idWZmZXJUb0hleCh0aGlzLmNvbmNhdFNpZyhzaWcudiwgc2lnLnIsIHNpZy5zKSlcbiAgICByZXR1cm4gc2VyaWFsaXplZFxuICB9LFxuXG4gIHJlY292ZXJQZXJzb25hbFNpZ25hdHVyZTogZnVuY3Rpb24gKG1zZ1BhcmFtcykge1xuICAgIGNvbnN0IHB1YmxpY0tleSA9IGdldFB1YmxpY0tleUZvcihtc2dQYXJhbXMpXG4gICAgY29uc3Qgc2VuZGVyID0gZXRoVXRpbC5wdWJsaWNUb0FkZHJlc3MocHVibGljS2V5KVxuICAgIGNvbnN0IHNlbmRlckhleCA9IGV0aFV0aWwuYnVmZmVyVG9IZXgoc2VuZGVyKVxuICAgIHJldHVybiBzZW5kZXJIZXhcbiAgfSxcblxuICBleHRyYWN0UHVibGljS2V5OiBmdW5jdGlvbiAobXNnUGFyYW1zKSB7XG4gICAgY29uc3QgcHVibGljS2V5ID0gZ2V0UHVibGljS2V5Rm9yKG1zZ1BhcmFtcylcbiAgICByZXR1cm4gJzB4JyArIHB1YmxpY0tleS50b1N0cmluZygnaGV4JylcbiAgfSxcblxuICB0eXBlZFNpZ25hdHVyZUhhc2g6IGZ1bmN0aW9uICh0eXBlZERhdGEpIHtcbiAgICBjb25zdCBoYXNoQnVmZmVyID0gdHlwZWRTaWduYXR1cmVIYXNoKHR5cGVkRGF0YSlcbiAgICByZXR1cm4gZXRoVXRpbC5idWZmZXJUb0hleChoYXNoQnVmZmVyKVxuICB9LFxuXG4gIHNpZ25UeXBlZERhdGE6IGZ1bmN0aW9uIChwcml2YXRlS2V5LCBtc2dQYXJhbXMpIHtcbiAgICBjb25zdCBtc2dIYXNoID0gdHlwZWRTaWduYXR1cmVIYXNoKG1zZ1BhcmFtcy5kYXRhKVxuICAgIGNvbnN0IHNpZyA9IGV0aFV0aWwuZWNzaWduKG1zZ0hhc2gsIHByaXZhdGVLZXkpXG4gICAgcmV0dXJuIGV0aFV0aWwuYnVmZmVyVG9IZXgodGhpcy5jb25jYXRTaWcoc2lnLnYsIHNpZy5yLCBzaWcucykpXG4gIH0sXG5cbiAgcmVjb3ZlclR5cGVkU2lnbmF0dXJlOiBmdW5jdGlvbiAobXNnUGFyYW1zKSB7XG4gICAgY29uc3QgbXNnSGFzaCA9IHR5cGVkU2lnbmF0dXJlSGFzaChtc2dQYXJhbXMuZGF0YSlcbiAgICBjb25zdCBwdWJsaWNLZXkgPSByZWNvdmVyUHVibGljS2V5KG1zZ0hhc2gsIG1zZ1BhcmFtcy5zaWcpXG4gICAgY29uc3Qgc2VuZGVyID0gZXRoVXRpbC5wdWJsaWNUb0FkZHJlc3MocHVibGljS2V5KVxuICAgIHJldHVybiBldGhVdGlsLmJ1ZmZlclRvSGV4KHNlbmRlcilcbiAgfVxuXG59XG5cbi8qKlxuICogQHBhcmFtIHR5cGVkRGF0YSAtIEFycmF5IG9mIGRhdGEgYWxvbmcgd2l0aCB0eXBlcywgYXMgcGVyIEVJUDcxMi5cbiAqIEByZXR1cm5zIEJ1ZmZlclxuICovXG5mdW5jdGlvbiB0eXBlZFNpZ25hdHVyZUhhc2godHlwZWREYXRhKSB7XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdFeHBlY3QgYXJndW1lbnQgdG8gYmUgbm9uLWVtcHR5IGFycmF5JylcbiAgaWYgKHR5cGVvZiB0eXBlZERhdGEgIT09ICdvYmplY3QnIHx8ICF0eXBlZERhdGEubGVuZ3RoKSB0aHJvdyBlcnJvclxuXG4gIGNvbnN0IGRhdGEgPSB0eXBlZERhdGEubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIGUudHlwZSA9PT0gJ2J5dGVzJyA/IGV0aFV0aWwudG9CdWZmZXIoZS52YWx1ZSkgOiBlLnZhbHVlXG4gIH0pXG4gIGNvbnN0IHR5cGVzID0gdHlwZWREYXRhLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50eXBlIH0pXG4gIGNvbnN0IHNjaGVtYSA9IHR5cGVkRGF0YS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIWUubmFtZSkgdGhyb3cgZXJyb3JcbiAgICByZXR1cm4gZS50eXBlICsgJyAnICsgZS5uYW1lXG4gIH0pXG5cbiAgcmV0dXJuIGV0aEFiaS5zb2xpZGl0eVNIQTMoXG4gICAgWydieXRlczMyJywgJ2J5dGVzMzInXSxcbiAgICBbXG4gICAgICBldGhBYmkuc29saWRpdHlTSEEzKG5ldyBBcnJheSh0eXBlZERhdGEubGVuZ3RoKS5maWxsKCdzdHJpbmcnKSwgc2NoZW1hKSxcbiAgICAgIGV0aEFiaS5zb2xpZGl0eVNIQTModHlwZXMsIGRhdGEpXG4gICAgXVxuICApXG59XG5cbmZ1bmN0aW9uIHJlY292ZXJQdWJsaWNLZXkoaGFzaCwgc2lnKSB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGV0aFV0aWwudG9CdWZmZXIoc2lnKVxuICBjb25zdCBzaWdQYXJhbXMgPSBldGhVdGlsLmZyb21ScGNTaWcoc2lnbmF0dXJlKVxuICByZXR1cm4gZXRoVXRpbC5lY3JlY292ZXIoaGFzaCwgc2lnUGFyYW1zLnYsIHNpZ1BhcmFtcy5yLCBzaWdQYXJhbXMucylcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljS2V5Rm9yIChtc2dQYXJhbXMpIHtcbiAgY29uc3QgbWVzc2FnZSA9IGV0aFV0aWwudG9CdWZmZXIobXNnUGFyYW1zLmRhdGEpXG4gIGNvbnN0IG1zZ0hhc2ggPSBldGhVdGlsLmhhc2hQZXJzb25hbE1lc3NhZ2UobWVzc2FnZSlcbiAgcmV0dXJuIHJlY292ZXJQdWJsaWNLZXkobXNnSGFzaCwgbXNnUGFyYW1zLnNpZylcbn1cblxuXG5mdW5jdGlvbiBwYWRXaXRoWmVyb2VzIChudW1iZXIsIGxlbmd0aCkge1xuICB2YXIgbXlTdHJpbmcgPSAnJyArIG51bWJlclxuICB3aGlsZSAobXlTdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgbXlTdHJpbmcgPSAnMCcgKyBteVN0cmluZ1xuICB9XG4gIHJldHVybiBteVN0cmluZ1xufVxuIiwidmFyIHNoYTMgPSByZXF1aXJlKCdqcy1zaGEzJykua2VjY2FrXzI1NlxudmFyIHV0czQ2ID0gcmVxdWlyZSgnaWRuYS11dHM0Ni1oeCcpXG5cbmZ1bmN0aW9uIG5hbWVoYXNoIChpbnB1dE5hbWUpIHtcbiAgLy8gUmVqZWN0IGVtcHR5IG5hbWVzOlxuICB2YXIgbm9kZSA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgIG5vZGUgKz0gJzAwJ1xuICB9XG5cbiAgbmFtZSA9IG5vcm1hbGl6ZShpbnB1dE5hbWUpXG5cbiAgaWYgKG5hbWUpIHtcbiAgICB2YXIgbGFiZWxzID0gbmFtZS5zcGxpdCgnLicpXG5cbiAgICBmb3IodmFyIGkgPSBsYWJlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYWJlbFNoYSA9IHNoYTMobGFiZWxzW2ldKVxuICAgICAgbm9kZSA9IHNoYTMobmV3IEJ1ZmZlcihub2RlICsgbGFiZWxTaGEsICdoZXgnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJzB4JyArIG5vZGVcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgPyB1dHM0Ni50b1VuaWNvZGUobmFtZSwge3VzZVN0ZDNBU0NJSTogdHJ1ZSwgdHJhbnNpdGlvbmFsOiBmYWxzZX0pIDogbmFtZVxufVxuXG5leHBvcnRzLmhhc2ggPSBuYW1laGFzaFxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemVcbiIsIlxuY29uc3Qgc2FmZVN0cmluZ2lmeSA9IHJlcXVpcmUoJ2Zhc3Qtc2FmZS1zdHJpbmdpZnknKVxuXG4vKipcbiAqIEBjbGFzcyBKc29uUnBjRXJyb3JcbiAqIEVycm9yIHN1YmNsYXNzIGltcGxlbWVudGluZyBKU09OIFJQQyAyLjAgZXJyb3JzLlxuICogUGVybWl0cyBhbnkgaW50ZWdlciBlcnJvciBjb2RlLlxuICovXG5jbGFzcyBKc29uUnBjRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIEpTT04gUlBDIGVycm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFRoZSBpbnRlZ2VyIGVycm9yIGNvZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIHN0cmluZyBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge2FueX0gW2RhdGFdIC0gVGhlIGVycm9yIGRhdGEuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoY29kZSwgbWVzc2FnZSwgZGF0YSkge1xuXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvZGUpKSB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnXCJjb2RlXCIgbXVzdCBiZSBhbiBpbnRlZ2VyLidcbiAgICApXG4gICAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1wibWVzc2FnZVwiIG11c3QgYmUgYSBub25lbXB0eSBzdHJpbmcuJ1xuICAgIClcblxuICAgIHN1cGVyKG1lc3NhZ2UpXG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHRoaXMuZGF0YSA9IGRhdGFcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IHdpdGggYWxsIHB1YmxpYyBjbGFzcyBwcm9wZXJ0aWVzLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgc2VyaWFsaXplZCBlcnJvci4gXG4gICAqL1xuICBzZXJpYWxpemUoKSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZCA9IHtcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPT0gdW5kZWZpbmVkKSBzZXJpYWxpemVkLmRhdGEgPSB0aGlzLmRhdGFcbiAgICBpZiAodGhpcy5zdGFjaykgc2VyaWFsaXplZC5zdGFjayA9IHRoaXMuc3RhY2tcbiAgICByZXR1cm4gc2VyaWFsaXplZFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2VyaWFsaXplZCBlcnJvciwgb21pdHRpbmdcbiAgICogYW55IGNpcmN1bGFyIHJlZmVyZW5jZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzZXJpYWxpemVkIGVycm9yIGFzIGEgc3RyaW5nLlxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHNhZmVTdHJpbmdpZnkoXG4gICAgICB0aGlzLnNlcmlhbGl6ZSgpLFxuICAgICAgc3RyaW5naWZ5UmVwbGFjZXIsXG4gICAgICAyXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogQGNsYXNzIEV0aEpzb25ScGNFcnJvclxuICogRXJyb3Igc3ViY2xhc3MgaW1wbGVtZW50aW5nIEV0aGVyZXVtIEpTT04gUlBDIGVycm9ycy5cbiAqIFBlcm1pdHMgaW50ZWdlciBlcnJvciBjb2RlcyBpbiB0aGUgWyAxMDAwIDw9IDQ5OTkgXSByYW5nZS5cbiAqL1xuY2xhc3MgRXRoSnNvblJwY0Vycm9yIGV4dGVuZHMgSnNvblJwY0Vycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBFdGhlcmV1bSBKU09OIFJQQyBlcnJvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGUgLSBUaGUgaW50ZWdlciBlcnJvciBjb2RlLCBpbiB0aGUgWyAxMDAwIDw9IDQ5OTkgXSByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgc3RyaW5nIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7YW55fSBbZGF0YV0gLSBUaGUgZXJyb3IgZGF0YS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgICBpZiAoIWlzVmFsaWRFdGhDb2RlKGNvZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdcImNvZGVcIiBtdXN0IGJlIGFuIGludGVnZXIgc3VjaCB0aGF0OiAxMDAwIDw9IGNvZGUgPD0gNDk5OSdcbiAgICAgIClcbiAgICB9XG4gICAgc3VwZXIoY29kZSwgbWVzc2FnZSwgZGF0YSlcbiAgfVxufVxuXG4vLyBJbnRlcm5hbFxuXG5mdW5jdGlvbiBpc1ZhbGlkRXRoQ29kZShjb2RlKSB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGNvZGUpICYmIGNvZGUgPj0gMTAwMCAmJiBjb2RlIDw9IDQ5OTlcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5UmVwbGFjZXIoXywgdmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAnW0NpcmN1bGFyXScpIHtcbiAgICByZXR1cm5cbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gRXhwb3J0c1xuXG5tb2R1bGUuZXhwb3J0cyA9ICB7XG4gIEpzb25ScGNFcnJvcixcbiAgRXRoSnNvblJwY0Vycm9yLFxufVxuIiwiY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuY29uc3QgY3JlYXRlUmFuZG9tSWQgPSByZXF1aXJlKCdqc29uLXJwYy1yYW5kb20taWQnKSgpXG5cbm1vZHVsZS5leHBvcnRzID0gRXRoUXVlcnlcblxuXG5mdW5jdGlvbiBFdGhRdWVyeShwcm92aWRlcil7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHNlbGYuY3VycmVudFByb3ZpZGVyID0gcHJvdmlkZXJcbn1cblxuLy9cbi8vIGJhc2UgcXVlcmllc1xuLy9cblxuLy8gZGVmYXVsdCBibG9ja1xuRXRoUXVlcnkucHJvdG90eXBlLmdldEJhbGFuY2UgPSAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbldpdGhEZWZhdWx0QmxvY2tGb3IoMiwgJ2V0aF9nZXRCYWxhbmNlJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRDb2RlID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5XaXRoRGVmYXVsdEJsb2NrRm9yKDIsICdldGhfZ2V0Q29kZScpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VHJhbnNhY3Rpb25Db3VudCA9ICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuV2l0aERlZmF1bHRCbG9ja0ZvcigyLCAnZXRoX2dldFRyYW5zYWN0aW9uQ291bnQnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFN0b3JhZ2VBdCA9ICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbldpdGhEZWZhdWx0QmxvY2tGb3IoMywgJ2V0aF9nZXRTdG9yYWdlQXQnKVxuRXRoUXVlcnkucHJvdG90eXBlLmNhbGwgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbldpdGhEZWZhdWx0QmxvY2tGb3IoMiwgJ2V0aF9jYWxsJylcbi8vIHN0YW5kYXJkXG5FdGhRdWVyeS5wcm90b3R5cGUucHJvdG9jb2xWZXJzaW9uID0gICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfcHJvdG9jb2xWZXJzaW9uJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5zeW5jaW5nID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9zeW5jaW5nJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5jb2luYmFzZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9jb2luYmFzZScpXG5FdGhRdWVyeS5wcm90b3R5cGUubWluaW5nID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfbWluaW5nJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5oYXNocmF0ZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9oYXNocmF0ZScpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2FzUHJpY2UgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2FzUHJpY2UnKVxuRXRoUXVlcnkucHJvdG90eXBlLmFjY291bnRzID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2FjY291bnRzJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5ibG9ja051bWJlciA9ICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9ibG9ja051bWJlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlIYXNoID0gICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlIYXNoJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlciA9ICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VW5jbGVDb3VudEJ5QmxvY2tIYXNoID0gICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VW5jbGVDb3VudEJ5QmxvY2tIYXNoJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlciA9ICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUuc2lnbiA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc2lnbicpXG5FdGhRdWVyeS5wcm90b3R5cGUuc2VuZFRyYW5zYWN0aW9uID0gICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc2VuZFRyYW5zYWN0aW9uJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5zZW5kUmF3VHJhbnNhY3Rpb24gPSAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9zZW5kUmF3VHJhbnNhY3Rpb24nKVxuRXRoUXVlcnkucHJvdG90eXBlLmVzdGltYXRlR2FzID0gICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2VzdGltYXRlR2FzJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRCbG9ja0J5SGFzaCA9ICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRCbG9ja0J5SGFzaCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0QmxvY2tCeU51bWJlciA9ICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0QmxvY2tCeU51bWJlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VHJhbnNhY3Rpb25CeUhhc2ggPSAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VHJhbnNhY3Rpb25CeUhhc2gnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uQnlCbG9ja0hhc2hBbmRJbmRleCA9ICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja0hhc2hBbmRJbmRleCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VHJhbnNhY3Rpb25CeUJsb2NrTnVtYmVyQW5kSW5kZXggPSBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VHJhbnNhY3Rpb25CeUJsb2NrTnVtYmVyQW5kSW5kZXgnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uUmVjZWlwdCA9ICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFRyYW5zYWN0aW9uUmVjZWlwdCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VW5jbGVCeUJsb2NrSGFzaEFuZEluZGV4ID0gICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VW5jbGVCeUJsb2NrSGFzaEFuZEluZGV4JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRVbmNsZUJ5QmxvY2tOdW1iZXJBbmRJbmRleCA9ICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRVbmNsZUJ5QmxvY2tOdW1iZXJBbmRJbmRleCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0Q29tcGlsZXJzID0gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0Q29tcGlsZXJzJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5jb21waWxlTExMID0gICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9jb21waWxlTExMJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5jb21waWxlU29saWRpdHkgPSAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9jb21waWxlU29saWRpdHknKVxuRXRoUXVlcnkucHJvdG90eXBlLmNvbXBpbGVTZXJwZW50ID0gICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2NvbXBpbGVTZXJwZW50JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5uZXdGaWx0ZXIgPSAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9uZXdGaWx0ZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLm5ld0Jsb2NrRmlsdGVyID0gICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX25ld0Jsb2NrRmlsdGVyJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5uZXdQZW5kaW5nVHJhbnNhY3Rpb25GaWx0ZXIgPSAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9uZXdQZW5kaW5nVHJhbnNhY3Rpb25GaWx0ZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLnVuaW5zdGFsbEZpbHRlciA9ICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3VuaW5zdGFsbEZpbHRlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0RmlsdGVyQ2hhbmdlcyA9ICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0RmlsdGVyQ2hhbmdlcycpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0RmlsdGVyTG9ncyA9ICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0RmlsdGVyTG9ncycpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0TG9ncyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0TG9ncycpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0V29yayA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0V29yaycpXG5FdGhRdWVyeS5wcm90b3R5cGUuc3VibWl0V29yayA9ICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc3VibWl0V29yaycpXG5FdGhRdWVyeS5wcm90b3R5cGUuc3VibWl0SGFzaHJhdGUgPSAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc3VibWl0SGFzaHJhdGUnKVxuXG4vLyBuZXR3b3JrIGxldmVsXG5cbkV0aFF1ZXJ5LnByb3RvdHlwZS5zZW5kQXN5bmMgPSBmdW5jdGlvbihvcHRzLCBjYil7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHNlbGYuY3VycmVudFByb3ZpZGVyLnNlbmRBc3luYyhjcmVhdGVQYXlsb2FkKG9wdHMpLCBmdW5jdGlvbihlcnIsIHJlc3BvbnNlKXtcbiAgICBpZiAoIWVyciAmJiByZXNwb25zZS5lcnJvcikgZXJyID0gbmV3IEVycm9yKCdFdGhRdWVyeSAtIFJQQyBFcnJvciAtICcrcmVzcG9uc2UuZXJyb3IubWVzc2FnZSlcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNiKG51bGwsIHJlc3BvbnNlLnJlc3VsdClcbiAgfSlcbn1cblxuLy8gdXRpbFxuXG5mdW5jdGlvbiBnZW5lcmF0ZUZuRm9yKG1ldGhvZE5hbWUpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgdmFyIGNiID0gYXJncy5wb3AoKVxuICAgIHNlbGYuc2VuZEFzeW5jKHtcbiAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtczogYXJncyxcbiAgICB9LCBjYilcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUZuV2l0aERlZmF1bHRCbG9ja0ZvcihhcmdDb3VudCwgbWV0aG9kTmFtZSl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICB2YXIgY2IgPSBhcmdzLnBvcCgpXG4gICAgLy8gc2V0IG9wdGlvbmFsIGRlZmF1bHQgYmxvY2sgcGFyYW1cbiAgICBpZiAoYXJncy5sZW5ndGggPCBhcmdDb3VudCkgYXJncy5wdXNoKCdsYXRlc3QnKVxuICAgIHNlbGYuc2VuZEFzeW5jKHtcbiAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtczogYXJncyxcbiAgICB9LCBjYilcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXlsb2FkKGRhdGEpe1xuICByZXR1cm4gZXh0ZW5kKHtcbiAgICAvLyBkZWZhdWx0c1xuICAgIGlkOiBjcmVhdGVSYW5kb21JZCgpLFxuICAgIGpzb25ycGM6ICcyLjAnLFxuICAgIHBhcmFtczogW10sXG4gICAgLy8gdXNlci1zcGVjaWZpZWRcbiAgfSwgZGF0YSlcbn1cbiIsImNvbnN0IHBpZnkgPSByZXF1aXJlKCdwaWZ5JylcbmNvbnN0IEJhc2VCbG9ja1RyYWNrZXIgPSByZXF1aXJlKCcuL2Jhc2UnKVxuXG5jb25zdCBzZWMgPSAxMDAwXG5cbmNsYXNzIFBvbGxpbmdCbG9ja1RyYWNrZXIgZXh0ZW5kcyBCYXNlQmxvY2tUcmFja2VyIHtcblxuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgLy8gcGFyc2UgKyB2YWxpZGF0ZSBhcmdzXG4gICAgaWYgKCFvcHRzLnByb3ZpZGVyKSB0aHJvdyBuZXcgRXJyb3IoJ1BvbGxpbmdCbG9ja1RyYWNrZXIgLSBubyBwcm92aWRlciBzcGVjaWZpZWQuJylcbiAgICBjb25zdCBwb2xsaW5nSW50ZXJ2YWwgPSBvcHRzLnBvbGxpbmdJbnRlcnZhbCB8fCAyMCAqIHNlY1xuICAgIGNvbnN0IHJldHJ5VGltZW91dCA9IG9wdHMucmV0cnlUaW1lb3V0IHx8IHBvbGxpbmdJbnRlcnZhbCAvIDEwXG4gICAgY29uc3Qga2VlcEV2ZW50TG9vcEFjdGl2ZSA9IG9wdHMua2VlcEV2ZW50TG9vcEFjdGl2ZSAhPT0gdW5kZWZpbmVkID8gb3B0cy5rZWVwRXZlbnRMb29wQWN0aXZlIDogdHJ1ZVxuICAgIGNvbnN0IHNldFNraXBDYWNoZUZsYWcgPSBvcHRzLnNldFNraXBDYWNoZUZsYWcgfHwgZmFsc2VcbiAgICAvLyBCYXNlQmxvY2tUcmFja2VyIGNvbnN0cnVjdG9yXG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbih7XG4gICAgICBibG9ja1Jlc2V0RHVyYXRpb246IHBvbGxpbmdJbnRlcnZhbCxcbiAgICB9LCBvcHRzKSlcbiAgICAvLyBjb25maWdcbiAgICB0aGlzLl9wcm92aWRlciA9IG9wdHMucHJvdmlkZXJcbiAgICB0aGlzLl9wb2xsaW5nSW50ZXJ2YWwgPSBwb2xsaW5nSW50ZXJ2YWxcbiAgICB0aGlzLl9yZXRyeVRpbWVvdXQgPSByZXRyeVRpbWVvdXRcbiAgICB0aGlzLl9rZWVwRXZlbnRMb29wQWN0aXZlID0ga2VlcEV2ZW50TG9vcEFjdGl2ZVxuICAgIHRoaXMuX3NldFNraXBDYWNoZUZsYWcgPSBzZXRTa2lwQ2FjaGVGbGFnXG4gIH1cblxuICAvL1xuICAvLyBwdWJsaWNcbiAgLy9cblxuICAvLyB0cmlnZ2VyIGJsb2NrIHBvbGxpbmdcbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RCbG9jayAoKSB7XG4gICAgYXdhaXQgdGhpcy5fdXBkYXRlTGF0ZXN0QmxvY2soKVxuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldExhdGVzdEJsb2NrKClcbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGVcbiAgLy9cblxuICBfc3RhcnQgKCkge1xuICAgIHRoaXMuX3BlcmZvcm1TeW5jKCkuY2F0Y2goZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKVxuICB9XG5cbiAgYXN5bmMgX3BlcmZvcm1TeW5jICgpIHtcbiAgICB3aGlsZSAodGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVMYXRlc3RCbG9jaygpXG4gICAgICAgIGF3YWl0IHRpbWVvdXQodGhpcy5fcG9sbGluZ0ludGVydmFsLCAhdGhpcy5fa2VlcEV2ZW50TG9vcEFjdGl2ZSlcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBuZXdFcnIgPSBuZXcgRXJyb3IoYFBvbGxpbmdCbG9ja1RyYWNrZXIgLSBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIHVwZGF0ZSBsYXRlc3QgYmxvY2s6XFxuJHtlcnIuc3RhY2t9YClcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3RXJyKVxuICAgICAgICB9IGNhdGNoIChlbWl0RXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihuZXdFcnIpXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGltZW91dCh0aGlzLl9yZXRyeVRpbWVvdXQsICF0aGlzLl9rZWVwRXZlbnRMb29wQWN0aXZlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIF91cGRhdGVMYXRlc3RCbG9jayAoKSB7XG4gICAgLy8gZmV0Y2ggKyBzZXQgbGF0ZXN0IGJsb2NrXG4gICAgY29uc3QgbGF0ZXN0QmxvY2sgPSBhd2FpdCB0aGlzLl9mZXRjaExhdGVzdEJsb2NrKClcbiAgICB0aGlzLl9uZXdQb3RlbnRpYWxMYXRlc3QobGF0ZXN0QmxvY2spXG4gIH1cblxuICBhc3luYyBfZmV0Y2hMYXRlc3RCbG9jayAoKSB7XG4gICAgY29uc3QgcmVxID0geyBqc29ucnBjOiBcIjIuMFwiLCBpZDogMSwgbWV0aG9kOiAnZXRoX2Jsb2NrTnVtYmVyJywgcGFyYW1zOiBbXSB9XG4gICAgaWYgKHRoaXMuX3NldFNraXBDYWNoZUZsYWcpIHJlcS5za2lwQ2FjaGUgPSB0cnVlXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcGlmeSgoY2IpID0+IHRoaXMuX3Byb3ZpZGVyLnNlbmRBc3luYyhyZXEsIGNiKSkoKVxuICAgIGlmIChyZXMuZXJyb3IpIHRocm93IG5ldyBFcnJvcihgUG9sbGluZ0Jsb2NrVHJhY2tlciAtIGVuY291bnRlcmVkIGVycm9yIGZldGNoaW5nIGJsb2NrOlxcbiR7cmVzLmVycm9yfWApXG4gICAgcmV0dXJuIHJlcy5yZXN1bHRcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9sbGluZ0Jsb2NrVHJhY2tlclxuXG5mdW5jdGlvbiB0aW1lb3V0IChkdXJhdGlvbiwgdW5yZWYpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGNvbnN0IHRpbW91dFJlZiA9IHNldFRpbWVvdXQocmVzb2x2ZSwgZHVyYXRpb24pXG4gICAgLy8gZG9uJ3Qga2VlcCBwcm9jZXNzIG9wZW5cbiAgICBpZiAodGltb3V0UmVmLnVucmVmICYmIHVucmVmKSB7XG4gICAgICB0aW1vdXRSZWYudW5yZWYoKVxuICAgIH1cbiAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMpIHJldHVybiB0aGlzO1xuXG5cdC8vIFVuZXhwZWN0ZWQgc3RyaWN0IG1vZGUgKG1heSBoYXBwZW4gaWYgZS5nLiBidW5kbGVkIGludG8gRVNNIG1vZHVsZSkgYmUgbmljZVxuXG5cdC8vIFRoYW5rcyBAbWF0aGlhc2J5bmVucyAtPiBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvZ2xvYmFsdGhpc1xuXHQvLyBJbiBhbGwgRVM1IGVuZ2luZXMgZ2xvYmFsIG9iamVjdCBpbmhlcml0cyBmcm9tIE9iamVjdC5wcm90b3R5cGVcblx0Ly8gKGlmIHlvdSBhcHByb2FjaGVkIG9uZSB0aGF0IGRvZXNuJ3QgcGxlYXNlIHJlcG9ydClcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsIFwiX19nbG9iYWxfX1wiLCB7XG5cdFx0Z2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LFxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9KTtcblx0dHJ5IHsgcmV0dXJuIF9fZ2xvYmFsX187IH1cblx0ZmluYWxseSB7IGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fZ2xvYmFsX187IH1cbn0pKCk7XG4iLCJ2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBCeXRlcyA9IHJlcXVpcmUoXCIuL2J5dGVzXCIpO1xudmFyIE5hdCA9IHJlcXVpcmUoXCIuL25hdFwiKTtcbnZhciBlbGxpcHRpYyA9IHJlcXVpcmUoXCJlbGxpcHRpY1wiKTtcbnZhciBybHAgPSByZXF1aXJlKFwiLi9ybHBcIik7XG52YXIgc2VjcDI1NmsxID0gbmV3IGVsbGlwdGljLmVjKFwic2VjcDI1NmsxXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoXCIuL2hhc2hcIiksXG4gICAga2VjY2FrMjU2ID0gX3JlcXVpcmUua2VjY2FrMjU2LFxuICAgIGtlY2NhazI1NnMgPSBfcmVxdWlyZS5rZWNjYWsyNTZzO1xuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGVudHJvcHkpIHtcbiAgdmFyIGlubmVySGV4ID0ga2VjY2FrMjU2KEJ5dGVzLmNvbmNhdChCeXRlcy5yYW5kb20oMzIpLCBlbnRyb3B5IHx8IEJ5dGVzLnJhbmRvbSgzMikpKTtcbiAgdmFyIG1pZGRsZUhleCA9IEJ5dGVzLmNvbmNhdChCeXRlcy5jb25jYXQoQnl0ZXMucmFuZG9tKDMyKSwgaW5uZXJIZXgpLCBCeXRlcy5yYW5kb20oMzIpKTtcbiAgdmFyIG91dGVySGV4ID0ga2VjY2FrMjU2KG1pZGRsZUhleCk7XG4gIHJldHVybiBmcm9tUHJpdmF0ZShvdXRlckhleCk7XG59O1xuXG52YXIgdG9DaGVja3N1bSA9IGZ1bmN0aW9uIHRvQ2hlY2tzdW0oYWRkcmVzcykge1xuICB2YXIgYWRkcmVzc0hhc2ggPSBrZWNjYWsyNTZzKGFkZHJlc3Muc2xpY2UoMikpO1xuICB2YXIgY2hlY2tzdW1BZGRyZXNzID0gXCIweFwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICBjaGVja3N1bUFkZHJlc3MgKz0gcGFyc2VJbnQoYWRkcmVzc0hhc2hbaSArIDJdLCAxNikgPiA3ID8gYWRkcmVzc1tpICsgMl0udG9VcHBlckNhc2UoKSA6IGFkZHJlc3NbaSArIDJdO1xuICB9cmV0dXJuIGNoZWNrc3VtQWRkcmVzcztcbn07XG5cbnZhciBmcm9tUHJpdmF0ZSA9IGZ1bmN0aW9uIGZyb21Qcml2YXRlKHByaXZhdGVLZXkpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIocHJpdmF0ZUtleS5zbGljZSgyKSwgXCJoZXhcIik7XG4gIHZhciBlY0tleSA9IHNlY3AyNTZrMS5rZXlGcm9tUHJpdmF0ZShidWZmZXIpO1xuICB2YXIgcHVibGljS2V5ID0gXCIweFwiICsgZWNLZXkuZ2V0UHVibGljKGZhbHNlLCAnaGV4Jykuc2xpY2UoMik7XG4gIHZhciBwdWJsaWNIYXNoID0ga2VjY2FrMjU2KHB1YmxpY0tleSk7XG4gIHZhciBhZGRyZXNzID0gdG9DaGVja3N1bShcIjB4XCIgKyBwdWJsaWNIYXNoLnNsaWNlKC00MCkpO1xuICByZXR1cm4ge1xuICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgcHJpdmF0ZUtleTogcHJpdmF0ZUtleVxuICB9O1xufTtcblxudmFyIGVuY29kZVNpZ25hdHVyZSA9IGZ1bmN0aW9uIGVuY29kZVNpZ25hdHVyZShfcmVmKSB7XG4gIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDMpLFxuICAgICAgdiA9IF9yZWYyWzBdLFxuICAgICAgciA9IEJ5dGVzLnBhZCgzMiwgX3JlZjJbMV0pLFxuICAgICAgcyA9IEJ5dGVzLnBhZCgzMiwgX3JlZjJbMl0pO1xuXG4gIHJldHVybiBCeXRlcy5mbGF0dGVuKFtyLCBzLCB2XSk7XG59O1xuXG52YXIgZGVjb2RlU2lnbmF0dXJlID0gZnVuY3Rpb24gZGVjb2RlU2lnbmF0dXJlKGhleCkge1xuICByZXR1cm4gW0J5dGVzLnNsaWNlKDY0LCBCeXRlcy5sZW5ndGgoaGV4KSwgaGV4KSwgQnl0ZXMuc2xpY2UoMCwgMzIsIGhleCksIEJ5dGVzLnNsaWNlKDMyLCA2NCwgaGV4KV07XG59O1xuXG52YXIgbWFrZVNpZ25lciA9IGZ1bmN0aW9uIG1ha2VTaWduZXIoYWRkVG9WKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaGFzaCwgcHJpdmF0ZUtleSkge1xuICAgIHZhciBzaWduYXR1cmUgPSBzZWNwMjU2azEua2V5RnJvbVByaXZhdGUobmV3IEJ1ZmZlcihwcml2YXRlS2V5LnNsaWNlKDIpLCBcImhleFwiKSkuc2lnbihuZXcgQnVmZmVyKGhhc2guc2xpY2UoMiksIFwiaGV4XCIpLCB7IGNhbm9uaWNhbDogdHJ1ZSB9KTtcbiAgICByZXR1cm4gZW5jb2RlU2lnbmF0dXJlKFtOYXQuZnJvbVN0cmluZyhCeXRlcy5mcm9tTnVtYmVyKGFkZFRvViArIHNpZ25hdHVyZS5yZWNvdmVyeVBhcmFtKSksIEJ5dGVzLnBhZCgzMiwgQnl0ZXMuZnJvbU5hdChcIjB4XCIgKyBzaWduYXR1cmUuci50b1N0cmluZygxNikpKSwgQnl0ZXMucGFkKDMyLCBCeXRlcy5mcm9tTmF0KFwiMHhcIiArIHNpZ25hdHVyZS5zLnRvU3RyaW5nKDE2KSkpXSk7XG4gIH07XG59O1xuXG52YXIgc2lnbiA9IG1ha2VTaWduZXIoMjcpOyAvLyB2PTI3fDI4IGluc3RlYWQgb2YgMHwxLi4uXG5cbnZhciByZWNvdmVyID0gZnVuY3Rpb24gcmVjb3ZlcihoYXNoLCBzaWduYXR1cmUpIHtcbiAgdmFyIHZhbHMgPSBkZWNvZGVTaWduYXR1cmUoc2lnbmF0dXJlKTtcbiAgdmFyIHZycyA9IHsgdjogQnl0ZXMudG9OdW1iZXIodmFsc1swXSksIHI6IHZhbHNbMV0uc2xpY2UoMiksIHM6IHZhbHNbMl0uc2xpY2UoMikgfTtcbiAgdmFyIGVjUHVibGljS2V5ID0gc2VjcDI1NmsxLnJlY292ZXJQdWJLZXkobmV3IEJ1ZmZlcihoYXNoLnNsaWNlKDIpLCBcImhleFwiKSwgdnJzLCB2cnMudiA8IDIgPyB2cnMudiA6IDEgLSB2cnMudiAlIDIpOyAvLyBiZWNhdXNlIG9kZCB2YWxzIG1lYW4gdj0wLi4uIHNhZGx5IHRoYXQgbWVhbnMgdj0wIG1lYW5zIHY9MS4uLiBJIGhhdGUgdGhhdFxuICB2YXIgcHVibGljS2V5ID0gXCIweFwiICsgZWNQdWJsaWNLZXkuZW5jb2RlKFwiaGV4XCIsIGZhbHNlKS5zbGljZSgyKTtcbiAgdmFyIHB1YmxpY0hhc2ggPSBrZWNjYWsyNTYocHVibGljS2V5KTtcbiAgdmFyIGFkZHJlc3MgPSB0b0NoZWNrc3VtKFwiMHhcIiArIHB1YmxpY0hhc2guc2xpY2UoLTQwKSk7XG4gIHJldHVybiBhZGRyZXNzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogY3JlYXRlLFxuICB0b0NoZWNrc3VtOiB0b0NoZWNrc3VtLFxuICBmcm9tUHJpdmF0ZTogZnJvbVByaXZhdGUsXG4gIHNpZ246IHNpZ24sXG4gIG1ha2VTaWduZXI6IG1ha2VTaWduZXIsXG4gIHJlY292ZXI6IHJlY292ZXIsXG4gIGVuY29kZVNpZ25hdHVyZTogZW5jb2RlU2lnbmF0dXJlLFxuICBkZWNvZGVTaWduYXR1cmU6IGRlY29kZVNpZ25hdHVyZVxufTsiLCJ2YXIgQSA9IHJlcXVpcmUoXCIuL2FycmF5LmpzXCIpO1xuXG52YXIgYXQgPSBmdW5jdGlvbiBhdChieXRlcywgaW5kZXgpIHtcbiAgcmV0dXJuIHBhcnNlSW50KGJ5dGVzLnNsaWNlKGluZGV4ICogMiArIDIsIGluZGV4ICogMiArIDQpLCAxNik7XG59O1xuXG52YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKGJ5dGVzKSB7XG4gIHZhciBybmQgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5jcnlwdG8gJiYgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KGJ5dGVzKSk7ZWxzZSBpZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHJuZCA9IHJlcXVpcmUoXCJjXCIgKyBcInJ5cHRvXCIpLnJhbmRvbUJ5dGVzKGJ5dGVzKTtlbHNlIHRocm93IFwiU2FmZSByYW5kb20gbnVtYmVycyBub3QgYXZhaWxhYmxlLlwiO1xuICB2YXIgaGV4ID0gXCIweFwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzOyArK2kpIHtcbiAgICBoZXggKz0gKFwiMDBcIiArIHJuZFtpXS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgfXJldHVybiBoZXg7XG59O1xuXG52YXIgbGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgcmV0dXJuIChhLmxlbmd0aCAtIDIpIC8gMjtcbn07XG5cbnZhciBmbGF0dGVuID0gZnVuY3Rpb24gZmxhdHRlbihhKSB7XG4gIHJldHVybiBcIjB4XCIgKyBhLnJlZHVjZShmdW5jdGlvbiAociwgcykge1xuICAgIHJldHVybiByICsgcy5zbGljZSgyKTtcbiAgfSwgXCJcIik7XG59O1xuXG52YXIgc2xpY2UgPSBmdW5jdGlvbiBzbGljZShpLCBqLCBicykge1xuICByZXR1cm4gXCIweFwiICsgYnMuc2xpY2UoaSAqIDIgKyAyLCBqICogMiArIDIpO1xufTtcblxudmFyIHJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlKGhleCkge1xuICB2YXIgcmV2ID0gXCIweFwiO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxlbmd0aChoZXgpOyBpIDwgbDsgKytpKSB7XG4gICAgcmV2ICs9IGhleC5zbGljZSgobCAtIGkpICogMiwgKGwgLSBpICsgMSkgKiAyKTtcbiAgfVxuICByZXR1cm4gcmV2O1xufTtcblxudmFyIHBhZCA9IGZ1bmN0aW9uIHBhZChsLCBoZXgpIHtcbiAgcmV0dXJuIGhleC5sZW5ndGggPT09IGwgKiAyICsgMiA/IGhleCA6IHBhZChsLCBcIjB4XCIgKyBcIjBcIiArIGhleC5zbGljZSgyKSk7XG59O1xuXG52YXIgcGFkUmlnaHQgPSBmdW5jdGlvbiBwYWRSaWdodChsLCBoZXgpIHtcbiAgcmV0dXJuIGhleC5sZW5ndGggPT09IGwgKiAyICsgMiA/IGhleCA6IHBhZFJpZ2h0KGwsIGhleCArIFwiMFwiKTtcbn07XG5cbnZhciB0b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheShoZXgpIHtcbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMiwgbCA9IGhleC5sZW5ndGg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICBhcnIucHVzaChwYXJzZUludChoZXguc2xpY2UoaSwgaSArIDIpLCAxNikpO1xuICB9cmV0dXJuIGFycjtcbn07XG5cbnZhciBmcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyKSB7XG4gIHZhciBoZXggPSBcIjB4XCI7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHZhciBiID0gYXJyW2ldO1xuICAgIGhleCArPSAoYiA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIGIudG9TdHJpbmcoMTYpO1xuICB9XG4gIHJldHVybiBoZXg7XG59O1xuXG52YXIgdG9VaW50OEFycmF5ID0gZnVuY3Rpb24gdG9VaW50OEFycmF5KGhleCkge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodG9BcnJheShoZXgpKTtcbn07XG5cbnZhciBmcm9tVWludDhBcnJheSA9IGZ1bmN0aW9uIGZyb21VaW50OEFycmF5KGFycikge1xuICByZXR1cm4gZnJvbUFycmF5KFtdLnNsaWNlLmNhbGwoYXJyLCAwKSk7XG59O1xuXG52YXIgZnJvbU51bWJlciA9IGZ1bmN0aW9uIGZyb21OdW1iZXIobnVtKSB7XG4gIHZhciBoZXggPSBudW0udG9TdHJpbmcoMTYpO1xuICByZXR1cm4gaGV4Lmxlbmd0aCAlIDIgPT09IDAgPyBcIjB4XCIgKyBoZXggOiBcIjB4MFwiICsgaGV4O1xufTtcblxudmFyIHRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIoaGV4KSB7XG4gIHJldHVybiBwYXJzZUludChoZXguc2xpY2UoMiksIDE2KTtcbn07XG5cbnZhciBjb25jYXQgPSBmdW5jdGlvbiBjb25jYXQoYSwgYikge1xuICByZXR1cm4gYS5jb25jYXQoYi5zbGljZSgyKSk7XG59O1xuXG52YXIgZnJvbU5hdCA9IGZ1bmN0aW9uIGZyb21OYXQoYm4pIHtcbiAgcmV0dXJuIGJuID09PSBcIjB4MFwiID8gXCIweFwiIDogYm4ubGVuZ3RoICUgMiA9PT0gMCA/IGJuIDogXCIweDBcIiArIGJuLnNsaWNlKDIpO1xufTtcblxudmFyIHRvTmF0ID0gZnVuY3Rpb24gdG9OYXQoYm4pIHtcbiAgcmV0dXJuIGJuWzJdID09PSBcIjBcIiA/IFwiMHhcIiArIGJuLnNsaWNlKDMpIDogYm47XG59O1xuXG52YXIgZnJvbUFzY2lpID0gZnVuY3Rpb24gZnJvbUFzY2lpKGFzY2lpKSB7XG4gIHZhciBoZXggPSBcIjB4XCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXNjaWkubGVuZ3RoOyArK2kpIHtcbiAgICBoZXggKz0gKFwiMDBcIiArIGFzY2lpLmNoYXJDb2RlQXQoaSkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gIH1yZXR1cm4gaGV4O1xufTtcblxudmFyIHRvQXNjaWkgPSBmdW5jdGlvbiB0b0FzY2lpKGhleCkge1xuICB2YXIgYXNjaWkgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMjsgaSA8IGhleC5sZW5ndGg7IGkgKz0gMikge1xuICAgIGFzY2lpICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoaGV4LnNsaWNlKGksIGkgKyAyKSwgMTYpKTtcbiAgfXJldHVybiBhc2NpaTtcbn07XG5cbi8vIEZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGFzY2FsZGVrbG9lLzYyNTQ2MTAzYTE1NzY4MDNkYWRlOTI2OWNjZjc2MzMwXG52YXIgZnJvbVN0cmluZyA9IGZ1bmN0aW9uIGZyb21TdHJpbmcocykge1xuICB2YXIgbWFrZUJ5dGUgPSBmdW5jdGlvbiBtYWtlQnl0ZSh1aW50OCkge1xuICAgIHZhciBiID0gdWludDgudG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiBiLmxlbmd0aCA8IDIgPyBcIjBcIiArIGIgOiBiO1xuICB9O1xuICB2YXIgYnl0ZXMgPSBcIjB4XCI7XG4gIGZvciAodmFyIGNpID0gMDsgY2kgIT0gcy5sZW5ndGg7IGNpKyspIHtcbiAgICB2YXIgYyA9IHMuY2hhckNvZGVBdChjaSk7XG4gICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgIGJ5dGVzICs9IG1ha2VCeXRlKGMpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChjIDwgMjA0OCkge1xuICAgICAgYnl0ZXMgKz0gbWFrZUJ5dGUoYyA+PiA2IHwgMTkyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGMgPiAweGQ3ZmYgJiYgYyA8IDB4ZGMwMCkge1xuICAgICAgICBpZiAoKytjaSA9PSBzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjMiA9IHMuY2hhckNvZGVBdChjaSk7XG4gICAgICAgIGlmIChjMiA8IDB4ZGMwMCB8fCBjMiA+IDB4ZGZmZikgcmV0dXJuIG51bGw7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKChjICYgMHgwM2ZmKSA8PCAxMCkgKyAoYzIgJiAweDAzZmYpO1xuICAgICAgICBieXRlcyArPSBtYWtlQnl0ZShjID4+IDE4IHwgMjQwKTtcbiAgICAgICAgYnl0ZXMgKz0gbWFrZUJ5dGUoYyA+PiAxMiAmIDYzIHwgMTI4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGMgPD0gMHhmZmZmXG4gICAgICAgIGJ5dGVzICs9IG1ha2VCeXRlKGMgPj4gMTIgfCAyMjQpO1xuICAgICAgfVxuICAgICAgYnl0ZXMgKz0gbWFrZUJ5dGUoYyA+PiA2ICYgNjMgfCAxMjgpO1xuICAgIH1cbiAgICBieXRlcyArPSBtYWtlQnl0ZShjICYgNjMgfCAxMjgpO1xuICB9XG4gIHJldHVybiBieXRlcztcbn07XG5cbnZhciB0b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGJ5dGVzKSB7XG4gIHZhciBzID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBsZW5ndGgoYnl0ZXMpO1xuICB3aGlsZSAoaSA8IGwpIHtcbiAgICB2YXIgYyA9IGF0KGJ5dGVzLCBpKyspO1xuICAgIGlmIChjID4gMTI3KSB7XG4gICAgICBpZiAoYyA+IDE5MSAmJiBjIDwgMjI0KSB7XG4gICAgICAgIGlmIChpID49IGwpIHJldHVybiBudWxsO1xuICAgICAgICBjID0gKGMgJiAzMSkgPDwgNiB8IGF0KGJ5dGVzLCBpKSAmIDYzO1xuICAgICAgfSBlbHNlIGlmIChjID4gMjIzICYmIGMgPCAyNDApIHtcbiAgICAgICAgaWYgKGkgKyAxID49IGwpIHJldHVybiBudWxsO1xuICAgICAgICBjID0gKGMgJiAxNSkgPDwgMTIgfCAoYXQoYnl0ZXMsIGkpICYgNjMpIDw8IDYgfCBhdChieXRlcywgKytpKSAmIDYzO1xuICAgICAgfSBlbHNlIGlmIChjID4gMjM5ICYmIGMgPCAyNDgpIHtcbiAgICAgICAgaWYgKGkgKyAyID49IGwpIHJldHVybiBudWxsO1xuICAgICAgICBjID0gKGMgJiA3KSA8PCAxOCB8IChhdChieXRlcywgaSkgJiA2MykgPDwgMTIgfCAoYXQoYnl0ZXMsICsraSkgJiA2MykgPDwgNiB8IGF0KGJ5dGVzLCArK2kpICYgNjM7XG4gICAgICB9IGVsc2UgcmV0dXJuIG51bGw7XG4gICAgICArK2k7XG4gICAgfVxuICAgIGlmIChjIDw9IDB4ZmZmZikgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO2Vsc2UgaWYgKGMgPD0gMHgxMGZmZmYpIHtcbiAgICAgIGMgLT0gMHgxMDAwMDtcbiAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjID4+IDEwIHwgMHhkODAwKTtcbiAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjICYgMHgzRkYgfCAweGRjMDApO1xuICAgIH0gZWxzZSByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByYW5kb206IHJhbmRvbSxcbiAgbGVuZ3RoOiBsZW5ndGgsXG4gIGNvbmNhdDogY29uY2F0LFxuICBmbGF0dGVuOiBmbGF0dGVuLFxuICBzbGljZTogc2xpY2UsXG4gIHJldmVyc2U6IHJldmVyc2UsXG4gIHBhZDogcGFkLFxuICBwYWRSaWdodDogcGFkUmlnaHQsXG4gIGZyb21Bc2NpaTogZnJvbUFzY2lpLFxuICB0b0FzY2lpOiB0b0FzY2lpLFxuICBmcm9tU3RyaW5nOiBmcm9tU3RyaW5nLFxuICB0b1N0cmluZzogdG9TdHJpbmcsXG4gIGZyb21OdW1iZXI6IGZyb21OdW1iZXIsXG4gIHRvTnVtYmVyOiB0b051bWJlcixcbiAgZnJvbU5hdDogZnJvbU5hdCxcbiAgdG9OYXQ6IHRvTmF0LFxuICBmcm9tQXJyYXk6IGZyb21BcnJheSxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgZnJvbVVpbnQ4QXJyYXk6IGZyb21VaW50OEFycmF5LFxuICB0b1VpbnQ4QXJyYXk6IHRvVWludDhBcnJheVxufTsiLCIvLyBUaGlzIHdhcyBwb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZW1uMTc4L2pzLXNoYTMsIHdpdGggc29tZSBtaW5vclxuLy8gbW9kaWZpY2F0aW9ucyBhbmQgcHJ1bmluZy4gSXQgaXMgbGljZW5zZWQgdW5kZXIgTUlUOlxuLy9cbi8vIENvcHlyaWdodCAyMDE1LTIwMTYgQ2hlbiwgWWktQ3l1YW5cbi8vICBcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuLy8gYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4vLyB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vLyBcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4vLyBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vIFxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbi8vIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbi8vIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcbi8vIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbi8vIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBIRVhfQ0hBUlMgPSAnMDEyMzQ1Njc4OWFiY2RlZicuc3BsaXQoJycpO1xudmFyIEtFQ0NBS19QQURESU5HID0gWzEsIDI1NiwgNjU1MzYsIDE2Nzc3MjE2XTtcbnZhciBTSElGVCA9IFswLCA4LCAxNiwgMjRdO1xudmFyIFJDID0gWzEsIDAsIDMyODk4LCAwLCAzMjkwNiwgMjE0NzQ4MzY0OCwgMjE0NzUxNjQxNiwgMjE0NzQ4MzY0OCwgMzI5MDcsIDAsIDIxNDc0ODM2NDksIDAsIDIxNDc1MTY1NDUsIDIxNDc0ODM2NDgsIDMyNzc3LCAyMTQ3NDgzNjQ4LCAxMzgsIDAsIDEzNiwgMCwgMjE0NzUxNjQyNSwgMCwgMjE0NzQ4MzY1OCwgMCwgMjE0NzUxNjU1NSwgMCwgMTM5LCAyMTQ3NDgzNjQ4LCAzMjkwNSwgMjE0NzQ4MzY0OCwgMzI3NzEsIDIxNDc0ODM2NDgsIDMyNzcwLCAyMTQ3NDgzNjQ4LCAxMjgsIDIxNDc0ODM2NDgsIDMyNzc4LCAwLCAyMTQ3NDgzNjU4LCAyMTQ3NDgzNjQ4LCAyMTQ3NTE2NTQ1LCAyMTQ3NDgzNjQ4LCAzMjg5NiwgMjE0NzQ4MzY0OCwgMjE0NzQ4MzY0OSwgMCwgMjE0NzUxNjQyNCwgMjE0NzQ4MzY0OF07XG5cbnZhciBLZWNjYWsgPSBmdW5jdGlvbiBLZWNjYWsoYml0cykge1xuICByZXR1cm4ge1xuICAgIGJsb2NrczogW10sXG4gICAgcmVzZXQ6IHRydWUsXG4gICAgYmxvY2s6IDAsXG4gICAgc3RhcnQ6IDAsXG4gICAgYmxvY2tDb3VudDogMTYwMCAtIChiaXRzIDw8IDEpID4+IDUsXG4gICAgb3V0cHV0QmxvY2tzOiBiaXRzID4+IDUsXG4gICAgczogZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQocywgcywgcywgcywgcyk7XG4gICAgfShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pXG4gIH07XG59O1xuXG52YXIgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHN0YXRlLCBtZXNzYWdlKSB7XG4gIHZhciBsZW5ndGggPSBtZXNzYWdlLmxlbmd0aCxcbiAgICAgIGJsb2NrcyA9IHN0YXRlLmJsb2NrcyxcbiAgICAgIGJ5dGVDb3VudCA9IHN0YXRlLmJsb2NrQ291bnQgPDwgMixcbiAgICAgIGJsb2NrQ291bnQgPSBzdGF0ZS5ibG9ja0NvdW50LFxuICAgICAgb3V0cHV0QmxvY2tzID0gc3RhdGUub3V0cHV0QmxvY2tzLFxuICAgICAgcyA9IHN0YXRlLnMsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBpLFxuICAgICAgY29kZTtcblxuICAvLyB1cGRhdGVcbiAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHN0YXRlLnJlc2V0KSB7XG4gICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgYmxvY2tzWzBdID0gc3RhdGUuYmxvY2s7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgYmxvY2tDb3VudCArIDE7ICsraSkge1xuICAgICAgICBibG9ja3NbaV0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGZvciAoaSA9IHN0YXRlLnN0YXJ0OyBpbmRleCA8IGxlbmd0aCAmJiBpIDwgYnl0ZUNvdW50OyArK2luZGV4KSB7XG4gICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9IG1lc3NhZ2VbaW5kZXhdIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSBzdGF0ZS5zdGFydDsgaW5kZXggPCBsZW5ndGggJiYgaSA8IGJ5dGVDb3VudDsgKytpbmRleCkge1xuICAgICAgICBjb2RlID0gbWVzc2FnZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgaWYgKGNvZGUgPCAweDgwKSB7XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gY29kZSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHg4MDApIHtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhjMCB8IGNvZGUgPj4gNikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCBjb2RlICYgMHgzZikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID49IDB4ZTAwMCkge1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGUwIHwgY29kZSA+PiAxMikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCBjb2RlID4+IDYgJiAweDNmKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IGNvZGUgJiAweDNmKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2RlID0gMHgxMDAwMCArICgoY29kZSAmIDB4M2ZmKSA8PCAxMCB8IG1lc3NhZ2UuY2hhckNvZGVBdCgrK2luZGV4KSAmIDB4M2ZmKTtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhmMCB8IGNvZGUgPj4gMTgpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgY29kZSA+PiAxMiAmIDB4M2YpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgY29kZSA+PiA2ICYgMHgzZikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCBjb2RlICYgMHgzZikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgc3RhdGUubGFzdEJ5dGVJbmRleCA9IGk7XG4gICAgaWYgKGkgPj0gYnl0ZUNvdW50KSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IGkgLSBieXRlQ291bnQ7XG4gICAgICBzdGF0ZS5ibG9jayA9IGJsb2Nrc1tibG9ja0NvdW50XTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBibG9ja0NvdW50OyArK2kpIHtcbiAgICAgICAgc1tpXSBePSBibG9ja3NbaV07XG4gICAgICB9XG4gICAgICBmKHMpO1xuICAgICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IGk7XG4gICAgfVxuICB9XG5cbiAgLy8gZmluYWxpemVcbiAgaSA9IHN0YXRlLmxhc3RCeXRlSW5kZXg7XG4gIGJsb2Nrc1tpID4+IDJdIHw9IEtFQ0NBS19QQURESU5HW2kgJiAzXTtcbiAgaWYgKHN0YXRlLmxhc3RCeXRlSW5kZXggPT09IGJ5dGVDb3VudCkge1xuICAgIGJsb2Nrc1swXSA9IGJsb2Nrc1tibG9ja0NvdW50XTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgYmxvY2tDb3VudCArIDE7ICsraSkge1xuICAgICAgYmxvY2tzW2ldID0gMDtcbiAgICB9XG4gIH1cbiAgYmxvY2tzW2Jsb2NrQ291bnQgLSAxXSB8PSAweDgwMDAwMDAwO1xuICBmb3IgKGkgPSAwOyBpIDwgYmxvY2tDb3VudDsgKytpKSB7XG4gICAgc1tpXSBePSBibG9ja3NbaV07XG4gIH1cbiAgZihzKTtcblxuICAvLyB0b1N0cmluZ1xuICB2YXIgaGV4ID0gJycsXG4gICAgICBpID0gMCxcbiAgICAgIGogPSAwLFxuICAgICAgYmxvY2s7XG4gIHdoaWxlIChqIDwgb3V0cHV0QmxvY2tzKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGJsb2NrQ291bnQgJiYgaiA8IG91dHB1dEJsb2NrczsgKytpLCArK2opIHtcbiAgICAgIGJsb2NrID0gc1tpXTtcbiAgICAgIGhleCArPSBIRVhfQ0hBUlNbYmxvY2sgPj4gNCAmIDB4MEZdICsgSEVYX0NIQVJTW2Jsb2NrICYgMHgwRl0gKyBIRVhfQ0hBUlNbYmxvY2sgPj4gMTIgJiAweDBGXSArIEhFWF9DSEFSU1tibG9jayA+PiA4ICYgMHgwRl0gKyBIRVhfQ0hBUlNbYmxvY2sgPj4gMjAgJiAweDBGXSArIEhFWF9DSEFSU1tibG9jayA+PiAxNiAmIDB4MEZdICsgSEVYX0NIQVJTW2Jsb2NrID4+IDI4ICYgMHgwRl0gKyBIRVhfQ0hBUlNbYmxvY2sgPj4gMjQgJiAweDBGXTtcbiAgICB9XG4gICAgaWYgKGogJSBibG9ja0NvdW50ID09PSAwKSB7XG4gICAgICBmKHMpO1xuICAgICAgaSA9IDA7XG4gICAgfVxuICB9XG4gIHJldHVybiBcIjB4XCIgKyBoZXg7XG59O1xuXG52YXIgZiA9IGZ1bmN0aW9uIGYocykge1xuICB2YXIgaCwgbCwgbiwgYzAsIGMxLCBjMiwgYzMsIGM0LCBjNSwgYzYsIGM3LCBjOCwgYzksIGIwLCBiMSwgYjIsIGIzLCBiNCwgYjUsIGI2LCBiNywgYjgsIGI5LCBiMTAsIGIxMSwgYjEyLCBiMTMsIGIxNCwgYjE1LCBiMTYsIGIxNywgYjE4LCBiMTksIGIyMCwgYjIxLCBiMjIsIGIyMywgYjI0LCBiMjUsIGIyNiwgYjI3LCBiMjgsIGIyOSwgYjMwLCBiMzEsIGIzMiwgYjMzLCBiMzQsIGIzNSwgYjM2LCBiMzcsIGIzOCwgYjM5LCBiNDAsIGI0MSwgYjQyLCBiNDMsIGI0NCwgYjQ1LCBiNDYsIGI0NywgYjQ4LCBiNDk7XG5cbiAgZm9yIChuID0gMDsgbiA8IDQ4OyBuICs9IDIpIHtcbiAgICBjMCA9IHNbMF0gXiBzWzEwXSBeIHNbMjBdIF4gc1szMF0gXiBzWzQwXTtcbiAgICBjMSA9IHNbMV0gXiBzWzExXSBeIHNbMjFdIF4gc1szMV0gXiBzWzQxXTtcbiAgICBjMiA9IHNbMl0gXiBzWzEyXSBeIHNbMjJdIF4gc1szMl0gXiBzWzQyXTtcbiAgICBjMyA9IHNbM10gXiBzWzEzXSBeIHNbMjNdIF4gc1szM10gXiBzWzQzXTtcbiAgICBjNCA9IHNbNF0gXiBzWzE0XSBeIHNbMjRdIF4gc1szNF0gXiBzWzQ0XTtcbiAgICBjNSA9IHNbNV0gXiBzWzE1XSBeIHNbMjVdIF4gc1szNV0gXiBzWzQ1XTtcbiAgICBjNiA9IHNbNl0gXiBzWzE2XSBeIHNbMjZdIF4gc1szNl0gXiBzWzQ2XTtcbiAgICBjNyA9IHNbN10gXiBzWzE3XSBeIHNbMjddIF4gc1szN10gXiBzWzQ3XTtcbiAgICBjOCA9IHNbOF0gXiBzWzE4XSBeIHNbMjhdIF4gc1szOF0gXiBzWzQ4XTtcbiAgICBjOSA9IHNbOV0gXiBzWzE5XSBeIHNbMjldIF4gc1szOV0gXiBzWzQ5XTtcblxuICAgIGggPSBjOCBeIChjMiA8PCAxIHwgYzMgPj4+IDMxKTtcbiAgICBsID0gYzkgXiAoYzMgPDwgMSB8IGMyID4+PiAzMSk7XG4gICAgc1swXSBePSBoO1xuICAgIHNbMV0gXj0gbDtcbiAgICBzWzEwXSBePSBoO1xuICAgIHNbMTFdIF49IGw7XG4gICAgc1syMF0gXj0gaDtcbiAgICBzWzIxXSBePSBsO1xuICAgIHNbMzBdIF49IGg7XG4gICAgc1szMV0gXj0gbDtcbiAgICBzWzQwXSBePSBoO1xuICAgIHNbNDFdIF49IGw7XG4gICAgaCA9IGMwIF4gKGM0IDw8IDEgfCBjNSA+Pj4gMzEpO1xuICAgIGwgPSBjMSBeIChjNSA8PCAxIHwgYzQgPj4+IDMxKTtcbiAgICBzWzJdIF49IGg7XG4gICAgc1szXSBePSBsO1xuICAgIHNbMTJdIF49IGg7XG4gICAgc1sxM10gXj0gbDtcbiAgICBzWzIyXSBePSBoO1xuICAgIHNbMjNdIF49IGw7XG4gICAgc1szMl0gXj0gaDtcbiAgICBzWzMzXSBePSBsO1xuICAgIHNbNDJdIF49IGg7XG4gICAgc1s0M10gXj0gbDtcbiAgICBoID0gYzIgXiAoYzYgPDwgMSB8IGM3ID4+PiAzMSk7XG4gICAgbCA9IGMzIF4gKGM3IDw8IDEgfCBjNiA+Pj4gMzEpO1xuICAgIHNbNF0gXj0gaDtcbiAgICBzWzVdIF49IGw7XG4gICAgc1sxNF0gXj0gaDtcbiAgICBzWzE1XSBePSBsO1xuICAgIHNbMjRdIF49IGg7XG4gICAgc1syNV0gXj0gbDtcbiAgICBzWzM0XSBePSBoO1xuICAgIHNbMzVdIF49IGw7XG4gICAgc1s0NF0gXj0gaDtcbiAgICBzWzQ1XSBePSBsO1xuICAgIGggPSBjNCBeIChjOCA8PCAxIHwgYzkgPj4+IDMxKTtcbiAgICBsID0gYzUgXiAoYzkgPDwgMSB8IGM4ID4+PiAzMSk7XG4gICAgc1s2XSBePSBoO1xuICAgIHNbN10gXj0gbDtcbiAgICBzWzE2XSBePSBoO1xuICAgIHNbMTddIF49IGw7XG4gICAgc1syNl0gXj0gaDtcbiAgICBzWzI3XSBePSBsO1xuICAgIHNbMzZdIF49IGg7XG4gICAgc1szN10gXj0gbDtcbiAgICBzWzQ2XSBePSBoO1xuICAgIHNbNDddIF49IGw7XG4gICAgaCA9IGM2IF4gKGMwIDw8IDEgfCBjMSA+Pj4gMzEpO1xuICAgIGwgPSBjNyBeIChjMSA8PCAxIHwgYzAgPj4+IDMxKTtcbiAgICBzWzhdIF49IGg7XG4gICAgc1s5XSBePSBsO1xuICAgIHNbMThdIF49IGg7XG4gICAgc1sxOV0gXj0gbDtcbiAgICBzWzI4XSBePSBoO1xuICAgIHNbMjldIF49IGw7XG4gICAgc1szOF0gXj0gaDtcbiAgICBzWzM5XSBePSBsO1xuICAgIHNbNDhdIF49IGg7XG4gICAgc1s0OV0gXj0gbDtcblxuICAgIGIwID0gc1swXTtcbiAgICBiMSA9IHNbMV07XG4gICAgYjMyID0gc1sxMV0gPDwgNCB8IHNbMTBdID4+PiAyODtcbiAgICBiMzMgPSBzWzEwXSA8PCA0IHwgc1sxMV0gPj4+IDI4O1xuICAgIGIxNCA9IHNbMjBdIDw8IDMgfCBzWzIxXSA+Pj4gMjk7XG4gICAgYjE1ID0gc1syMV0gPDwgMyB8IHNbMjBdID4+PiAyOTtcbiAgICBiNDYgPSBzWzMxXSA8PCA5IHwgc1szMF0gPj4+IDIzO1xuICAgIGI0NyA9IHNbMzBdIDw8IDkgfCBzWzMxXSA+Pj4gMjM7XG4gICAgYjI4ID0gc1s0MF0gPDwgMTggfCBzWzQxXSA+Pj4gMTQ7XG4gICAgYjI5ID0gc1s0MV0gPDwgMTggfCBzWzQwXSA+Pj4gMTQ7XG4gICAgYjIwID0gc1syXSA8PCAxIHwgc1szXSA+Pj4gMzE7XG4gICAgYjIxID0gc1szXSA8PCAxIHwgc1syXSA+Pj4gMzE7XG4gICAgYjIgPSBzWzEzXSA8PCAxMiB8IHNbMTJdID4+PiAyMDtcbiAgICBiMyA9IHNbMTJdIDw8IDEyIHwgc1sxM10gPj4+IDIwO1xuICAgIGIzNCA9IHNbMjJdIDw8IDEwIHwgc1syM10gPj4+IDIyO1xuICAgIGIzNSA9IHNbMjNdIDw8IDEwIHwgc1syMl0gPj4+IDIyO1xuICAgIGIxNiA9IHNbMzNdIDw8IDEzIHwgc1szMl0gPj4+IDE5O1xuICAgIGIxNyA9IHNbMzJdIDw8IDEzIHwgc1szM10gPj4+IDE5O1xuICAgIGI0OCA9IHNbNDJdIDw8IDIgfCBzWzQzXSA+Pj4gMzA7XG4gICAgYjQ5ID0gc1s0M10gPDwgMiB8IHNbNDJdID4+PiAzMDtcbiAgICBiNDAgPSBzWzVdIDw8IDMwIHwgc1s0XSA+Pj4gMjtcbiAgICBiNDEgPSBzWzRdIDw8IDMwIHwgc1s1XSA+Pj4gMjtcbiAgICBiMjIgPSBzWzE0XSA8PCA2IHwgc1sxNV0gPj4+IDI2O1xuICAgIGIyMyA9IHNbMTVdIDw8IDYgfCBzWzE0XSA+Pj4gMjY7XG4gICAgYjQgPSBzWzI1XSA8PCAxMSB8IHNbMjRdID4+PiAyMTtcbiAgICBiNSA9IHNbMjRdIDw8IDExIHwgc1syNV0gPj4+IDIxO1xuICAgIGIzNiA9IHNbMzRdIDw8IDE1IHwgc1szNV0gPj4+IDE3O1xuICAgIGIzNyA9IHNbMzVdIDw8IDE1IHwgc1szNF0gPj4+IDE3O1xuICAgIGIxOCA9IHNbNDVdIDw8IDI5IHwgc1s0NF0gPj4+IDM7XG4gICAgYjE5ID0gc1s0NF0gPDwgMjkgfCBzWzQ1XSA+Pj4gMztcbiAgICBiMTAgPSBzWzZdIDw8IDI4IHwgc1s3XSA+Pj4gNDtcbiAgICBiMTEgPSBzWzddIDw8IDI4IHwgc1s2XSA+Pj4gNDtcbiAgICBiNDIgPSBzWzE3XSA8PCAyMyB8IHNbMTZdID4+PiA5O1xuICAgIGI0MyA9IHNbMTZdIDw8IDIzIHwgc1sxN10gPj4+IDk7XG4gICAgYjI0ID0gc1syNl0gPDwgMjUgfCBzWzI3XSA+Pj4gNztcbiAgICBiMjUgPSBzWzI3XSA8PCAyNSB8IHNbMjZdID4+PiA3O1xuICAgIGI2ID0gc1szNl0gPDwgMjEgfCBzWzM3XSA+Pj4gMTE7XG4gICAgYjcgPSBzWzM3XSA8PCAyMSB8IHNbMzZdID4+PiAxMTtcbiAgICBiMzggPSBzWzQ3XSA8PCAyNCB8IHNbNDZdID4+PiA4O1xuICAgIGIzOSA9IHNbNDZdIDw8IDI0IHwgc1s0N10gPj4+IDg7XG4gICAgYjMwID0gc1s4XSA8PCAyNyB8IHNbOV0gPj4+IDU7XG4gICAgYjMxID0gc1s5XSA8PCAyNyB8IHNbOF0gPj4+IDU7XG4gICAgYjEyID0gc1sxOF0gPDwgMjAgfCBzWzE5XSA+Pj4gMTI7XG4gICAgYjEzID0gc1sxOV0gPDwgMjAgfCBzWzE4XSA+Pj4gMTI7XG4gICAgYjQ0ID0gc1syOV0gPDwgNyB8IHNbMjhdID4+PiAyNTtcbiAgICBiNDUgPSBzWzI4XSA8PCA3IHwgc1syOV0gPj4+IDI1O1xuICAgIGIyNiA9IHNbMzhdIDw8IDggfCBzWzM5XSA+Pj4gMjQ7XG4gICAgYjI3ID0gc1szOV0gPDwgOCB8IHNbMzhdID4+PiAyNDtcbiAgICBiOCA9IHNbNDhdIDw8IDE0IHwgc1s0OV0gPj4+IDE4O1xuICAgIGI5ID0gc1s0OV0gPDwgMTQgfCBzWzQ4XSA+Pj4gMTg7XG5cbiAgICBzWzBdID0gYjAgXiB+YjIgJiBiNDtcbiAgICBzWzFdID0gYjEgXiB+YjMgJiBiNTtcbiAgICBzWzEwXSA9IGIxMCBeIH5iMTIgJiBiMTQ7XG4gICAgc1sxMV0gPSBiMTEgXiB+YjEzICYgYjE1O1xuICAgIHNbMjBdID0gYjIwIF4gfmIyMiAmIGIyNDtcbiAgICBzWzIxXSA9IGIyMSBeIH5iMjMgJiBiMjU7XG4gICAgc1szMF0gPSBiMzAgXiB+YjMyICYgYjM0O1xuICAgIHNbMzFdID0gYjMxIF4gfmIzMyAmIGIzNTtcbiAgICBzWzQwXSA9IGI0MCBeIH5iNDIgJiBiNDQ7XG4gICAgc1s0MV0gPSBiNDEgXiB+YjQzICYgYjQ1O1xuICAgIHNbMl0gPSBiMiBeIH5iNCAmIGI2O1xuICAgIHNbM10gPSBiMyBeIH5iNSAmIGI3O1xuICAgIHNbMTJdID0gYjEyIF4gfmIxNCAmIGIxNjtcbiAgICBzWzEzXSA9IGIxMyBeIH5iMTUgJiBiMTc7XG4gICAgc1syMl0gPSBiMjIgXiB+YjI0ICYgYjI2O1xuICAgIHNbMjNdID0gYjIzIF4gfmIyNSAmIGIyNztcbiAgICBzWzMyXSA9IGIzMiBeIH5iMzQgJiBiMzY7XG4gICAgc1szM10gPSBiMzMgXiB+YjM1ICYgYjM3O1xuICAgIHNbNDJdID0gYjQyIF4gfmI0NCAmIGI0NjtcbiAgICBzWzQzXSA9IGI0MyBeIH5iNDUgJiBiNDc7XG4gICAgc1s0XSA9IGI0IF4gfmI2ICYgYjg7XG4gICAgc1s1XSA9IGI1IF4gfmI3ICYgYjk7XG4gICAgc1sxNF0gPSBiMTQgXiB+YjE2ICYgYjE4O1xuICAgIHNbMTVdID0gYjE1IF4gfmIxNyAmIGIxOTtcbiAgICBzWzI0XSA9IGIyNCBeIH5iMjYgJiBiMjg7XG4gICAgc1syNV0gPSBiMjUgXiB+YjI3ICYgYjI5O1xuICAgIHNbMzRdID0gYjM0IF4gfmIzNiAmIGIzODtcbiAgICBzWzM1XSA9IGIzNSBeIH5iMzcgJiBiMzk7XG4gICAgc1s0NF0gPSBiNDQgXiB+YjQ2ICYgYjQ4O1xuICAgIHNbNDVdID0gYjQ1IF4gfmI0NyAmIGI0OTtcbiAgICBzWzZdID0gYjYgXiB+YjggJiBiMDtcbiAgICBzWzddID0gYjcgXiB+YjkgJiBiMTtcbiAgICBzWzE2XSA9IGIxNiBeIH5iMTggJiBiMTA7XG4gICAgc1sxN10gPSBiMTcgXiB+YjE5ICYgYjExO1xuICAgIHNbMjZdID0gYjI2IF4gfmIyOCAmIGIyMDtcbiAgICBzWzI3XSA9IGIyNyBeIH5iMjkgJiBiMjE7XG4gICAgc1szNl0gPSBiMzYgXiB+YjM4ICYgYjMwO1xuICAgIHNbMzddID0gYjM3IF4gfmIzOSAmIGIzMTtcbiAgICBzWzQ2XSA9IGI0NiBeIH5iNDggJiBiNDA7XG4gICAgc1s0N10gPSBiNDcgXiB+YjQ5ICYgYjQxO1xuICAgIHNbOF0gPSBiOCBeIH5iMCAmIGIyO1xuICAgIHNbOV0gPSBiOSBeIH5iMSAmIGIzO1xuICAgIHNbMThdID0gYjE4IF4gfmIxMCAmIGIxMjtcbiAgICBzWzE5XSA9IGIxOSBeIH5iMTEgJiBiMTM7XG4gICAgc1syOF0gPSBiMjggXiB+YjIwICYgYjIyO1xuICAgIHNbMjldID0gYjI5IF4gfmIyMSAmIGIyMztcbiAgICBzWzM4XSA9IGIzOCBeIH5iMzAgJiBiMzI7XG4gICAgc1szOV0gPSBiMzkgXiB+YjMxICYgYjMzO1xuICAgIHNbNDhdID0gYjQ4IF4gfmI0MCAmIGI0MjtcbiAgICBzWzQ5XSA9IGI0OSBeIH5iNDEgJiBiNDM7XG5cbiAgICBzWzBdIF49IFJDW25dO1xuICAgIHNbMV0gXj0gUkNbbiArIDFdO1xuICB9XG59O1xuXG52YXIga2VjY2FrID0gZnVuY3Rpb24ga2VjY2FrKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAgICB2YXIgbXNnO1xuICAgIGlmIChzdHIuc2xpY2UoMCwgMikgPT09IFwiMHhcIikge1xuICAgICAgbXNnID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMiwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICAgICAgbXNnLnB1c2gocGFyc2VJbnQoc3RyLnNsaWNlKGksIGkgKyAyKSwgMTYpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlKEtlY2NhayhiaXRzLCBiaXRzKSwgbXNnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBrZWNjYWsyNTY6IGtlY2NhaygyNTYpLFxuICBrZWNjYWs1MTI6IGtlY2Nhayg1MTIpLFxuICBrZWNjYWsyNTZzOiBrZWNjYWsoMjU2KSxcbiAga2VjY2FrNTEyczoga2VjY2FrKDUxMilcbn07IiwidmFyIEJOID0gcmVxdWlyZShcImJuLmpzXCIpO1xudmFyIEJ5dGVzID0gcmVxdWlyZShcIi4vYnl0ZXNcIik7XG5cbnZhciBmcm9tQk4gPSBmdW5jdGlvbiBmcm9tQk4oYm4pIHtcbiAgcmV0dXJuIFwiMHhcIiArIGJuLnRvU3RyaW5nKFwiaGV4XCIpO1xufTtcblxudmFyIHRvQk4gPSBmdW5jdGlvbiB0b0JOKHN0cikge1xuICByZXR1cm4gbmV3IEJOKHN0ci5zbGljZSgyKSwgMTYpO1xufTtcblxudmFyIGZyb21TdHJpbmcgPSBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cikge1xuICB2YXIgYm4gPSBcIjB4XCIgKyAoc3RyLnNsaWNlKDAsIDIpID09PSBcIjB4XCIgPyBuZXcgQk4oc3RyLnNsaWNlKDIpLCAxNikgOiBuZXcgQk4oc3RyLCAxMCkpLnRvU3RyaW5nKFwiaGV4XCIpO1xuICByZXR1cm4gYm4gPT09IFwiMHgwXCIgPyBcIjB4XCIgOiBibjtcbn07XG5cbnZhciB0b0V0aGVyID0gZnVuY3Rpb24gdG9FdGhlcih3ZWkpIHtcbiAgcmV0dXJuIHRvTnVtYmVyKGRpdih3ZWksIGZyb21TdHJpbmcoXCIxMDAwMDAwMDAwMFwiKSkpIC8gMTAwMDAwMDAwO1xufTtcblxudmFyIGZyb21FdGhlciA9IGZ1bmN0aW9uIGZyb21FdGhlcihldGgpIHtcbiAgcmV0dXJuIG11bChmcm9tTnVtYmVyKE1hdGguZmxvb3IoZXRoICogMTAwMDAwMDAwKSksIGZyb21TdHJpbmcoXCIxMDAwMDAwMDAwMFwiKSk7XG59O1xuXG52YXIgdG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhhKSB7XG4gIHJldHVybiB0b0JOKGEpLnRvU3RyaW5nKDEwKTtcbn07XG5cbnZhciBmcm9tTnVtYmVyID0gZnVuY3Rpb24gZnJvbU51bWJlcihhKSB7XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gXCJzdHJpbmdcIiA/IC9eMHgvLnRlc3QoYSkgPyBhIDogXCIweFwiICsgYSA6IFwiMHhcIiArIG5ldyBCTihhKS50b1N0cmluZyhcImhleFwiKTtcbn07XG5cbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKGEpIHtcbiAgcmV0dXJuIHRvQk4oYSkudG9OdW1iZXIoKTtcbn07XG5cbnZhciB0b1VpbnQyNTYgPSBmdW5jdGlvbiB0b1VpbnQyNTYoYSkge1xuICByZXR1cm4gQnl0ZXMucGFkKDMyLCBhKTtcbn07XG5cbnZhciBiaW4gPSBmdW5jdGlvbiBiaW4obWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmcm9tQk4odG9CTihhKVttZXRob2RdKHRvQk4oYikpKTtcbiAgfTtcbn07XG5cbnZhciBhZGQgPSBiaW4oXCJhZGRcIik7XG52YXIgbXVsID0gYmluKFwibXVsXCIpO1xudmFyIGRpdiA9IGJpbihcImRpdlwiKTtcbnZhciBzdWIgPSBiaW4oXCJzdWJcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0b1N0cmluZzogdG9TdHJpbmcsXG4gIGZyb21TdHJpbmc6IGZyb21TdHJpbmcsXG4gIHRvTnVtYmVyOiB0b051bWJlcixcbiAgZnJvbU51bWJlcjogZnJvbU51bWJlcixcbiAgdG9FdGhlcjogdG9FdGhlcixcbiAgZnJvbUV0aGVyOiBmcm9tRXRoZXIsXG4gIHRvVWludDI1NjogdG9VaW50MjU2LFxuICBhZGQ6IGFkZCxcbiAgbXVsOiBtdWwsXG4gIGRpdjogZGl2LFxuICBzdWI6IHN1YlxufTsiLCJcbmNvbnN0IGVycm9yVmFsdWVzID0gcmVxdWlyZSgnLi9lcnJvclZhbHVlcy5qc29uJylcbmNvbnN0IEZBTExCQUNLX0VSUk9SX0NPREUgPSByZXF1aXJlKCcuL2Vycm9yQ29kZXMuanNvbicpLmpzb25ScGMuaW50ZXJuYWxcbmNvbnN0IHsgSnNvblJwY0Vycm9yIH0gPSByZXF1aXJlKCcuL2NsYXNzZXMnKVxuXG5jb25zdCBKU09OX1JQQ19TRVJWRVJfRVJST1JfTUVTU0FHRSA9ICdVbnNwZWNpZmllZCBzZXJ2ZXIgZXJyb3IuJ1xuXG5jb25zdCBGQUxMQkFDS19NRVNTQUdFID0gJ1Vuc3BlY2lmaWVkIGVycm9yIG1lc3NhZ2UuIFRoaXMgaXMgIGJ1ZywgcGxlYXNlIHJlcG9ydCBpdC4nXG5cbmNvbnN0IEZBTExCQUNLX0VSUk9SID0ge1xuICBjb2RlOiBGQUxMQkFDS19FUlJPUl9DT0RFLFxuICBtZXNzYWdlOiBnZXRNZXNzYWdlRnJvbUNvZGUoRkFMTEJBQ0tfRVJST1JfQ09ERSlcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtZXNzYWdlIGZvciBhIGdpdmVuIGNvZGUsIG9yIGEgZmFsbGJhY2sgbWVzc2FnZSBpZiB0aGUgY29kZSBoYXNcbiAqIG5vIGNvcnJlc3BvbmRpbmcgbWVzc2FnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlIC0gVGhlIGludGVnZXIgZXJyb3IgY29kZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2UgLSBUaGUgZmFsbGJhY2sgbWVzc2FnZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNvcnJlc3BvbmRpbmcgbWVzc2FnZSBvciB0aGUgZmFsbGJhY2sgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWVzc2FnZUZyb21Db2RlKGNvZGUsIGZhbGxiYWNrTWVzc2FnZSA9IEZBTExCQUNLX01FU1NBR0UpIHtcblxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihjb2RlKSkge1xuXG4gICAgY29uc3QgY29kZVN0cmluZyA9IGNvZGUudG9TdHJpbmcoKVxuICAgIGlmIChlcnJvclZhbHVlc1tjb2RlU3RyaW5nXSkgcmV0dXJuIGVycm9yVmFsdWVzW2NvZGVTdHJpbmddLm1lc3NhZ2VcblxuICAgIGlmIChpc0pzb25ScGNTZXJ2ZXJFcnJvcihjb2RlKSkgcmV0dXJuIEpTT05fUlBDX1NFUlZFUl9FUlJPUl9NRVNTQUdFXG5cbiAgICAvLyBUT0RPOiBhbGxvdyB2YWxpZCBjb2RlcyBhbmQgbWVzc2FnZXMgdG8gYmUgZXh0ZW5kZWRcbiAgICAvLyAvLyBFSVAgMTE5MyBTdGF0dXMgQ29kZXNcbiAgICAvLyBpZiAoY29kZSA+PSA0MDAwICYmIGNvZGUgPD0gNDk5OSkgcmV0dXJuIFNvbWV0aGluZz9cbiAgfVxuICByZXR1cm4gZmFsbGJhY2tNZXNzYWdlXG59XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBjb2RlIGlzIHZhbGlkLlxuICogQSBjb2RlIGlzIG9ubHkgdmFsaWQgaWYgaXQgaGFzIGEgbWVzc2FnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlIC0gVGhlIGNvZGUgdG8gY2hlY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNvZGUgaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZENvZGUoY29kZSkge1xuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb2RlKSkgcmV0dXJuIGZhbHNlXG5cbiAgY29uc3QgY29kZVN0cmluZyA9IGNvZGUudG9TdHJpbmcoKVxuICBpZiAoZXJyb3JWYWx1ZXNbY29kZVN0cmluZ10pIHJldHVybiB0cnVlXG5cbiAgaWYgKGlzSnNvblJwY1NlcnZlckVycm9yKGNvZGUpKSByZXR1cm4gdHJ1ZVxuXG4gIC8vIFRPRE86IGFsbG93IHZhbGlkIGNvZGVzIGFuZCBtZXNzYWdlcyB0byBiZSBleHRlbmRlZFxuICAvLyAvLyBFSVAgMTE5MyBTdGF0dXMgQ29kZXNcbiAgLy8gaWYgKGNvZGUgPj0gNDAwMCAmJiBjb2RlIDw9IDQ5OTkpIHJldHVybiB0cnVlXG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgZ2l2ZW4gZXJyb3IgdG8gYW4gRVRIIEpTT04gUlBDLWNvbXBhdGlibGUgZXJyb3Igb2JqZWN0LlxuICogTWVyZWx5IGNvcGllcyB0aGUgZ2l2ZW4gZXJyb3IncyB2YWx1ZXMgaWYgaXQgaXMgYWxyZWFkeSBjb21wYXRpYmxlLlxuICogSWYgdGhlIGdpdmVuIGVycm9yIGlzIG5vdCBmdWxseSBjb21wYXRpYmxlLCBpdCB3aWxsIGJlIHByZXNlcnZlZCBvbiB0aGVcbiAqIHJldHVybmVkIG9iamVjdCdzIGRhdGEub3JpZ2luYWxFcnJvciBwcm9wZXJ0eS5cbiAqIEFkZHMgYSAnc3RhY2snIHByb3BlcnR5IGlmIGl0IGV4aXN0cyBvbiB0aGUgZ2l2ZW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHthbnl9IGVycm9yIC0gVGhlIGVycm9yIHRvIHNlcmlhbGl6ZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBmYWxsYmFja0Vycm9yIC0gVGhlIGN1c3RvbSBmYWxsYmFjayBlcnJvciB2YWx1ZXMgaWYgdGhlXG4gKiBnaXZlbiBlcnJvciBpcyBpbnZhbGlkLlxuICogQHJldHVybiB7b2JqZWN0fSBBIHN0YW5kYXJkaXplZCBlcnJvciBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZUVycm9yIChlcnJvciwgZmFsbGJhY2tFcnJvciA9IEZBTExCQUNLX0VSUk9SKSB7XG5cbiAgaWYgKFxuICAgICFmYWxsYmFja0Vycm9yIHx8IFxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKGZhbGxiYWNrRXJyb3IuY29kZSkgfHxcbiAgICB0eXBlb2YgZmFsbGJhY2tFcnJvci5tZXNzYWdlICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZmFsbGJhY2tFcnJvciBtdXN0IGNvbnRhaW4gaW50ZWdlciBudW1iZXIgY29kZSBhbmQgc3RyaW5nIG1lc3NhZ2UuJ1xuICAgIClcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmIGVycm9yIGluc3RhbmNlb2YgSnNvblJwY0Vycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yLnNlcmlhbGl6ZSgpXG4gIH1cblxuICBjb25zdCBzZXJpYWxpemVkID0ge31cblxuICBpZiAoZXJyb3IgJiYgaXNWYWxpZENvZGUoZXJyb3IuY29kZSkpIHtcblxuICAgIHNlcmlhbGl6ZWQuY29kZSA9IGVycm9yLmNvZGVcblxuICAgIGlmIChlcnJvci5tZXNzYWdlICYmIHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgc2VyaWFsaXplZC5tZXNzYWdlID0gZXJyb3IubWVzc2FnZVxuICAgICAgaWYgKGVycm9yLmhhc093blByb3BlcnR5KCdkYXRhJykpIHNlcmlhbGl6ZWQuZGF0YSA9IGVycm9yLmRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgc2VyaWFsaXplZC5tZXNzYWdlID0gZ2V0TWVzc2FnZUZyb21Db2RlKHNlcmlhbGl6ZWQuY29kZSlcbiAgICAgIHNlcmlhbGl6ZWQuZGF0YSA9IHsgb3JpZ2luYWxFcnJvcjogYXNzaWduT3JpZ2luYWxFcnJvcihlcnJvcikgfVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWQuY29kZSA9IGZhbGxiYWNrRXJyb3IuY29kZVxuICAgIHNlcmlhbGl6ZWQubWVzc2FnZSA9IGZhbGxiYWNrRXJyb3IubWVzc2FnZVxuICAgIHNlcmlhbGl6ZWQuZGF0YSA9IHsgb3JpZ2luYWxFcnJvcjogYXNzaWduT3JpZ2luYWxFcnJvcihlcnJvcikgfVxuICB9XG5cbiAgaWYgKGVycm9yICYmIGVycm9yLnN0YWNrKSBzZXJpYWxpemVkLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgcmV0dXJuIHNlcmlhbGl6ZWRcbn1cblxuLy8gSW50ZXJuYWxcblxuZnVuY3Rpb24gaXNKc29uUnBjU2VydmVyRXJyb3IgKGNvZGUpIHtcbiAgcmV0dXJuIGNvZGUgPj0gLTMyMDk5ICYmIGNvZGUgPD0gLTMyMDAwXG59XG5cbmZ1bmN0aW9uIGFzc2lnbk9yaWdpbmFsRXJyb3IgKGVycm9yKSB7XG4gIGlmIChlcnJvciAmJiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGVycm9yKSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlcnJvcilcbiAgfVxuICByZXR1cm4gZXJyb3Jcbn1cblxuLy8gRXhwb3J0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0TWVzc2FnZUZyb21Db2RlLFxuICBpc1ZhbGlkQ29kZSxcbiAgc2VyaWFsaXplRXJyb3IsXG4gIEpTT05fUlBDX1NFUlZFUl9FUlJPUl9NRVNTQUdFLFxufVxuIiwiXG5jb25zdCB7IEpzb25ScGNFcnJvciwgRXRoSnNvblJwY0Vycm9yIH0gPSByZXF1aXJlKCcuL3NyYy9jbGFzc2VzJylcbmNvbnN0IHtcbiAgc2VyaWFsaXplRXJyb3IsIGdldE1lc3NhZ2VGcm9tQ29kZSxcbn0gPSByZXF1aXJlKCcuL3NyYy91dGlscycpXG5jb25zdCBlcnJvcnMgPSByZXF1aXJlKCcuL3NyYy9lcnJvcnMnKVxuY29uc3QgRVJST1JfQ09ERVMgPSByZXF1aXJlKCcuL3NyYy9lcnJvckNvZGVzLmpzb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXJyb3JzLFxuICBKc29uUnBjRXJyb3IsXG4gIEV0aEpzb25ScGNFcnJvcixcbiAgc2VyaWFsaXplRXJyb3IsXG4gIGdldE1lc3NhZ2VGcm9tQ29kZSxcbiAgLyoqIEB0eXBlIEVycm9yQ29kZXMgKi9cbiAgRVJST1JfQ09ERVMsXG59XG5cbi8vIFR5cGVzXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRXRoSnNvblJwY0Vycm9yQ29kZXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1c2VyUmVqZWN0ZWRSZXF1ZXN0XG4gKiBAcHJvcGVydHkge251bWJlcn0gdW5hdXRob3JpemVkXG4gKiBAcHJvcGVydHkge251bWJlcn0gdW5zdXBwb3J0ZWRNZXRob2RcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEpzb25ScGNFcnJvckNvZGVzXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGFyc2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnZhbGlkUmVxdWVzdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludmFsaWRQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtZXRob2ROb3RGb3VuZFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludGVybmFsXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBFcnJvckNvZGVzXG4gKiBAcHJvcGVydHkge0pzb25ScGNFcnJvckNvZGVzfSBqc29uUnBjXG4gKiBAcHJvcGVydHkge0V0aEpzb25ScGNFcnJvckNvZGVzfSBldGhcbiAqL1xuIiwiXG5jb25zdCB7IEpzb25ScGNFcnJvciwgRXRoSnNvblJwY0Vycm9yIH0gPSByZXF1aXJlKCcuL2NsYXNzZXMnKVxuY29uc3QgeyBnZXRNZXNzYWdlRnJvbUNvZGUgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuY29uc3QgRVJST1JfQ09ERVMgPSByZXF1aXJlKCcuL2Vycm9yQ29kZXMuanNvbicpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKipcbiAgICogR2V0IGEgSlNPTiBSUEMgMi4wIFBhcnNlIGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2VdIC0gQSBjdXN0b20gbWVzc2FnZS5cbiAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAqIEByZXR1cm4ge0pzb25ScGNFcnJvcn0gVGhlIGVycm9yLlxuICAgKi9cbiAgcGFyc2U6IChtZXNzYWdlLCBkYXRhKSA9PiBnZXRKc29uUnBjRXJyb3IoXG4gICAgRVJST1JfQ09ERVMuanNvblJwYy5wYXJzZSwgbWVzc2FnZSwgZGF0YVxuICApLFxuXG4gIC8qKlxuICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgSW52YWxpZCBSZXF1ZXN0IGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2VdIC0gQSBjdXN0b20gbWVzc2FnZS5cbiAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAqIEByZXR1cm4ge0pzb25ScGNFcnJvcn0gVGhlIGVycm9yLlxuICAgKi9cbiAgaW52YWxpZFJlcXVlc3Q6IChtZXNzYWdlLCBkYXRhKSA9PiBnZXRKc29uUnBjRXJyb3IoXG4gICAgRVJST1JfQ09ERVMuanNvblJwYy5pbnZhbGlkUmVxdWVzdCwgbWVzc2FnZSwgZGF0YVxuICApLFxuXG4gIC8qKlxuICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgSW52YWxpZCBQYXJhbXMgZXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbWVzc2FnZV0gLSBBIGN1c3RvbSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge2FueX0gW2RhdGFdIC0gRXJyb3IgZGF0YS5cbiAgICogQHJldHVybiB7SnNvblJwY0Vycm9yfSBUaGUgZXJyb3IuXG4gICAqL1xuICBpbnZhbGlkUGFyYW1zOiAobWVzc2FnZSwgZGF0YSkgPT4gZ2V0SnNvblJwY0Vycm9yKFxuICAgIEVSUk9SX0NPREVTLmpzb25ScGMuaW52YWxpZFBhcmFtcywgbWVzc2FnZSwgZGF0YVxuICApLFxuXG4gIC8qKlxuICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgTWV0aG9kIE5vdCBGb3VuZCBlcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFttZXNzYWdlXSAtIEEgY3VzdG9tIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7YW55fSBbZGF0YV0gLSBFcnJvciBkYXRhLlxuICAgKiBAcmV0dXJuIHtKc29uUnBjRXJyb3J9IFRoZSBlcnJvci5cbiAgICovXG4gIG1ldGhvZE5vdEZvdW5kOiAobWVzc2FnZSwgZGF0YSkgPT4gZ2V0SnNvblJwY0Vycm9yKFxuICAgIEVSUk9SX0NPREVTLmpzb25ScGMubWV0aG9kTm90Rm91bmQsIG1lc3NhZ2UsIGRhdGFcbiAgKSxcblxuICAvKipcbiAgICogR2V0IGEgSlNPTiBSUEMgMi4wIEludGVybmFsIGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2VdIC0gQSBjdXN0b20gbWVzc2FnZS5cbiAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAqIEByZXR1cm4ge0pzb25ScGNFcnJvcn0gVGhlIGVycm9yLlxuICAgKi9cbiAgaW50ZXJuYWw6IChtZXNzYWdlLCBkYXRhKSA9PiBnZXRKc29uUnBjRXJyb3IoXG4gICAgRVJST1JfQ09ERVMuanNvblJwYy5pbnRlcm5hbCwgbWVzc2FnZSwgZGF0YVxuICApLFxuXG4gIC8qKlxuICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgU2VydmVyIGVycm9yLlxuICAgKiBQZXJtaXRzIGludGVnZXIgZXJyb3IgY29kZXMgaW4gdGhlIFsgLTMyMDk5IDw9IC0zMjAwMCBdIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFRoZSBpbnRlZ2VyIGVycm9yIGNvZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbWVzc2FnZV0gLSBBIGN1c3RvbSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge2FueX0gW2RhdGFdIC0gRXJyb3IgZGF0YS5cbiAgICogQHJldHVybiB7SnNvblJwY0Vycm9yfSBUaGUgZXJyb3IuXG4gICAqL1xuICBzZXJ2ZXI6IChjb2RlLCBtZXNzYWdlLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvZGUpIHx8IGNvZGUgPiAtMzIwMDAgfHwgY29kZSA8IC0zMjA5OSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnXCJjb2RlXCIgbXVzdCBiZSBhbiBpbnRlZ2VyIHN1Y2ggdGhhdDogLTMyMDk5IDw9IGNvZGUgPD0gLTMyMDAwJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gZ2V0SnNvblJwY0Vycm9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpXG4gIH0sXG4gIGV0aDoge1xuICAgIC8qKlxuICAgICAqIEdldCBhbiBFdGhlcmV1bSBKU09OIFJQQyBVc2VyIFJlamVjdGVkIFJlcXVlc3QgZXJyb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXNzYWdlXSAtIEEgY3VzdG9tIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAgICogQHJldHVybiB7RXRoSnNvblJwY0Vycm9yfSBUaGUgZXJyb3IuXG4gICAgICovXG4gICAgdXNlclJlamVjdGVkUmVxdWVzdDogKG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBnZXRFdGhKc29uUnBjRXJyb3IoXG4gICAgICAgIEVSUk9SX0NPREVTLmV0aC51c2VyUmVqZWN0ZWRSZXF1ZXN0LCBtZXNzYWdlLCBkYXRhXG4gICAgICApXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBFdGhlcmV1bSBKU09OIFJQQyBVbmF1dGhvcml6ZWQgZXJyb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXNzYWdlXSAtIEEgY3VzdG9tIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAgICogQHJldHVybiB7RXRoSnNvblJwY0Vycm9yfSBUaGUgZXJyb3IuXG4gICAgICovXG4gICAgdW5hdXRob3JpemVkOiAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGdldEV0aEpzb25ScGNFcnJvcihcbiAgICAgICAgRVJST1JfQ09ERVMuZXRoLnVuYXV0aG9yaXplZCwgbWVzc2FnZSwgZGF0YVxuICAgICAgKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gRXRoZXJldW0gSlNPTiBSUEMgVW5zdXBwb3J0ZWQgTWV0aG9kIGVycm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWVzc2FnZV0gLSBBIGN1c3RvbSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZGF0YV0gLSBFcnJvciBkYXRhLlxuICAgICAqIEByZXR1cm4ge0V0aEpzb25ScGNFcnJvcn0gVGhlIGVycm9yLlxuICAgICAqL1xuICAgIHVuc3VwcG9ydGVkTWV0aG9kOiAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGdldEV0aEpzb25ScGNFcnJvcihcbiAgICAgICAgRVJST1JfQ09ERVMuZXRoLnVuc3VwcG9ydGVkTWV0aG9kLCBtZXNzYWdlLCBkYXRhXG4gICAgICApXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIGN1c3RvbSBFdGhlcmV1bSBKU09OIFJQQyBlcnJvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBlcnJvciBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHthbnl9IFtkYXRhXSAtIEVycm9yIGRhdGEuXG4gICAgICogQHJldHVybiB7RXRoSnNvblJwY0Vycm9yfSBUaGUgZXJyb3IuXG4gICAgICovXG4gICAgY3VzdG9tOiAoY29kZSwgbWVzc2FnZSwgZGF0YSkgPT4ge1xuICAgICAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnXCJtZXNzYWdlXCIgbXVzdCBiZSBhIG5vbmVtcHR5IHN0cmluZydcbiAgICAgIClcbiAgICAgIHJldHVybiBuZXcgRXRoSnNvblJwY0Vycm9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpXG4gICAgfSxcbiAgfSxcbn1cblxuLy8gSW50ZXJuYWxcblxuZnVuY3Rpb24gZ2V0SnNvblJwY0Vycm9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBKc29uUnBjRXJyb3IoXG4gICAgY29kZSxcbiAgICBtZXNzYWdlIHx8IGdldE1lc3NhZ2VGcm9tQ29kZShjb2RlKSxcbiAgICBkYXRhXG4gIClcbn1cblxuZnVuY3Rpb24gZ2V0RXRoSnNvblJwY0Vycm9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBFdGhKc29uUnBjRXJyb3IoXG4gICAgY29kZSxcbiAgICBtZXNzYWdlIHx8IGdldE1lc3NhZ2VGcm9tQ29kZShjb2RlKSxcbiAgICBkYXRhXG4gIClcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=