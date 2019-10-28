(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "/uSP":
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__("+qE3").EventEmitter
const inherits = __webpack_require__("MCLT").inherits

module.exports = Stoplight


inherits(Stoplight, EventEmitter)

function Stoplight(){
  const self = this
  EventEmitter.call(self)
  self.isLocked = true
}

Stoplight.prototype.go = function(){
  const self = this
  self.isLocked = false
  self.emit('unlock')
}

Stoplight.prototype.stop = function(){
  const self = this
  self.isLocked = true
  self.emit('lock')
}

Stoplight.prototype.await = function(fn){
  const self = this
  if (self.isLocked) {
    self.once('unlock', fn)
  } else {
    setTimeout(fn)
  }
}

/***/ }),

/***/ "PDys":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {/*
 This file is part of web3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/** @file WebsocketProvider.js
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var _ = __webpack_require__("F/us");
var errors = __webpack_require__("OdSp").errors;
var Ws = __webpack_require__("fjyx").w3cwebsocket;

var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

var _btoa = null;
var parseURL = null;
if (isNode) {
    _btoa = function(str) {
        return Buffer.from(str).toString('base64');
    };
    var url = __webpack_require__("CxY0");
    if (url.URL) {
        // Use the new Node 6+ API for parsing URLs that supports username/password
        var newURL = url.URL;
        parseURL = function(url) {
            return new newURL(url);
        };
    }
    else {
        // Web3 supports Node.js 5, so fall back to the legacy URL API if necessary
        parseURL = __webpack_require__("CxY0").parse;
    }
} else {
    _btoa = btoa;
    parseURL = function(url) {
        return new URL(url);
    };
}
// Default connection ws://localhost:8546




var WebsocketProvider = function WebsocketProvider(url, options)  {
    if (!Ws) {
        throw new Error('websocket is not available');
    }

    var _this = this;
    this.responseCallbacks = {};
    this.notificationCallbacks = [];

    options = options || {};
    this._customTimeout = options.timeout;

    // The w3cwebsocket implementation does not support Basic Auth
    // username/password in the URL. So generate the basic auth header, and
    // pass through with any additional headers supplied in constructor
    var parsedURL = parseURL(url);
    var headers = options.headers || {};
    var protocol = options.protocol || undefined;
    if (parsedURL.username && parsedURL.password) {
        headers.authorization = 'Basic ' + _btoa(parsedURL.username + ':' + parsedURL.password);
    }

    // Allow a custom client configuration
    var clientConfig = options.clientConfig || undefined;
    
    // Allow a custom request options
    // https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md#connectrequesturl-requestedprotocols-origin-headers-requestoptions
    var requestOptions = options.requestOptions || undefined;

    // When all node core implementations that do not have the
    // WHATWG compatible URL parser go out of service this line can be removed.
    if (parsedURL.auth) {
        headers.authorization = 'Basic ' + _btoa(parsedURL.auth);
    }
    this.connection = new Ws(url, protocol, undefined, headers, requestOptions, clientConfig);

    this.addDefaultEvents();


    // LISTEN FOR CONNECTION RESPONSES
    this.connection.onmessage = function(e) {
        /*jshint maxcomplexity: 6 */
        var data = (typeof e.data === 'string') ? e.data : '';

        _this._parseResponse(data).forEach(function(result){

            var id = null;

            // get the id which matches the returned id
            if(_.isArray(result)) {
                result.forEach(function(load){
                    if(_this.responseCallbacks[load.id])
                        id = load.id;
                });
            } else {
                id = result.id;
            }

            // notification
            if(!id && result && result.method && result.method.indexOf('_subscription') !== -1) {
                _this.notificationCallbacks.forEach(function(callback){
                    if(_.isFunction(callback))
                        callback(result);
                });

                // fire the callback
            } else if(_this.responseCallbacks[id]) {
                _this.responseCallbacks[id](null, result);
                delete _this.responseCallbacks[id];
            }
        });
    };

    // make property `connected` which will return the current connection status
    Object.defineProperty(this, 'connected', {
      get: function () {
        return this.connection && this.connection.readyState === this.connection.OPEN;
      },
      enumerable: true,
  });
};

/**
 Will add the error and end event to timeout existing calls

 @method addDefaultEvents
 */
WebsocketProvider.prototype.addDefaultEvents = function(){
    var _this = this;

    this.connection.onerror = function(){
        _this._timeout();
    };

    this.connection.onclose = function(){
        _this._timeout();

        // reset all requests and callbacks
        _this.reset();
    };

    // this.connection.on('timeout', function(){
    //     _this._timeout();
    // });
};

/**
 Will parse the response and make an array out of it.

 @method _parseResponse
 @param {String} data
 */
WebsocketProvider.prototype._parseResponse = function(data) {
    var _this = this,
        returnValues = [];

    // DE-CHUNKER
    var dechunkedData = data
        .replace(/\}[\n\r]?\{/g,'}|--|{') // }{
        .replace(/\}\][\n\r]?\[\{/g,'}]|--|[{') // }][{
        .replace(/\}[\n\r]?\[\{/g,'}|--|[{') // }[{
        .replace(/\}\][\n\r]?\{/g,'}]|--|{') // }]{
        .split('|--|');

    dechunkedData.forEach(function(data){

        // prepend the last chunk
        if(_this.lastChunk)
            data = _this.lastChunk + data;

        var result = null;

        try {
            result = JSON.parse(data);

        } catch(e) {

            _this.lastChunk = data;

            // start timeout to cancel all requests
            clearTimeout(_this.lastChunkTimeout);
            _this.lastChunkTimeout = setTimeout(function(){
                _this._timeout();
                throw errors.InvalidResponse(data);
            }, 1000 * 15);

            return;
        }

        // cancel timeout and set chunk to null
        clearTimeout(_this.lastChunkTimeout);
        _this.lastChunk = null;

        if(result)
            returnValues.push(result);
    });

    return returnValues;
};


/**
 Adds a callback to the responseCallbacks object,
 which will be called if a response matching the response Id will arrive.

 @method _addResponseCallback
 */
WebsocketProvider.prototype._addResponseCallback = function(payload, callback) {
    var id = payload.id || payload[0].id;
    var method = payload.method || payload[0].method;

    this.responseCallbacks[id] = callback;
    this.responseCallbacks[id].method = method;

    var _this = this;

    // schedule triggering the error response if a custom timeout is set
    if (this._customTimeout) {
        setTimeout(function () {
            if (_this.responseCallbacks[id]) {
                _this.responseCallbacks[id](errors.ConnectionTimeout(_this._customTimeout));
                delete _this.responseCallbacks[id];
            }
        }, this._customTimeout);
    }
};

/**
 Timeout all requests when the end/error event is fired

 @method _timeout
 */
WebsocketProvider.prototype._timeout = function() {
    for(var key in this.responseCallbacks) {
        if(this.responseCallbacks.hasOwnProperty(key)){
            this.responseCallbacks[key](errors.InvalidConnection('on WS'));
            delete this.responseCallbacks[key];
        }
    }
};


WebsocketProvider.prototype.send = function (payload, callback) {
    var _this = this;

    if (this.connection.readyState === this.connection.CONNECTING) {
        setTimeout(function () {
            _this.send(payload, callback);
        }, 10);
        return;
    }

    // try reconnect, when connection is gone
    // if(!this.connection.writable)
    //     this.connection.connect({url: this.url});
    if (this.connection.readyState !== this.connection.OPEN) {
        console.error('connection not open on send()');
        if (typeof this.connection.onerror === 'function') {
            this.connection.onerror(new Error('connection not open'));
        } else {
            console.error('no error callback');
        }
        callback(new Error('connection not open'));
        return;
    }

    this.connection.send(JSON.stringify(payload));
    this._addResponseCallback(payload, callback);
};

/**
 Subscribes to provider events.provider

 @method on
 @param {String} type    'notifcation', 'connect', 'error', 'end' or 'data'
 @param {Function} callback   the callback to call
 */
WebsocketProvider.prototype.on = function (type, callback) {

    if(typeof callback !== 'function')
        throw new Error('The second parameter callback must be a function.');

    switch(type){
        case 'data':
            this.notificationCallbacks.push(callback);
            break;

        case 'connect':
            this.connection.onopen = callback;
            break;

        case 'end':
            this.connection.onclose = callback;
            break;

        case 'error':
            this.connection.onerror = callback;
            break;

        // default:
        //     this.connection.on(type, callback);
        //     break;
    }
};

// TODO add once

/**
 Removes event listener

 @method removeListener
 @param {String} type    'notifcation', 'connect', 'error', 'end' or 'data'
 @param {Function} callback   the callback to call
 */
WebsocketProvider.prototype.removeListener = function (type, callback) {
    var _this = this;

    switch(type){
        case 'data':
            this.notificationCallbacks.forEach(function(cb, index){
                if(cb === callback)
                    _this.notificationCallbacks.splice(index, 1);
            });
            break;

        // TODO remvoving connect missing

        // default:
        //     this.connection.removeListener(type, callback);
        //     break;
    }
};

/**
 Removes all event listeners

 @method removeAllListeners
 @param {String} type    'notifcation', 'connect', 'error', 'end' or 'data'
 */
WebsocketProvider.prototype.removeAllListeners = function (type) {
    switch(type){
        case 'data':
            this.notificationCallbacks = [];
            break;

        // TODO remvoving connect properly missing

        case 'connect':
            this.connection.onopen = null;
            break;

        case 'end':
            this.connection.onclose = null;
            break;

        case 'error':
            this.connection.onerror = null;
            break;

        default:
            // this.connection.removeAllListeners(type);
            break;
    }
};

/**
 Resets the providers, clears all callbacks

 @method reset
 */
WebsocketProvider.prototype.reset = function () {
    this._timeout();
    this.notificationCallbacks = [];

    // this.connection.removeAllListeners('error');
    // this.connection.removeAllListeners('end');
    // this.connection.removeAllListeners('timeout');

    this.addDefaultEvents();
};

WebsocketProvider.prototype.disconnect = function () {
    if (this.connection) {
        this.connection.close();
    }
};

module.exports = WebsocketProvider;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB"), __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Rlsf":
/***/ (function(module, exports, __webpack_require__) {

/*
 * Emulate 'eth_accounts' / 'eth_sendTransaction' using 'eth_sendRawTransaction'
 *
 * The two callbacks a user needs to implement are:
 * - getAccounts() -- array of addresses supported
 * - signTransaction(tx) -- sign a raw transaction object
 */

const waterfall = __webpack_require__("l1gh")
const parallel = __webpack_require__("KWkM")
const inherits = __webpack_require__("MCLT").inherits
const ethUtil = __webpack_require__("tnHP")
const sigUtil = __webpack_require__("HtlB")
const extend = __webpack_require__("U6jy")
const Semaphore = __webpack_require__("odnP")
const Subprovider = __webpack_require__("Uu7K")
const estimateGas = __webpack_require__("a5O3")
const hexRegex = /^[0-9A-Fa-f]+$/g

module.exports = HookedWalletSubprovider

// handles the following RPC methods:
//   eth_coinbase
//   eth_accounts
//   eth_sendTransaction
//   eth_sign
//   eth_signTypedData
//   personal_sign
//   personal_ecRecover
//   parity_postTransaction
//   parity_checkRequest
//   parity_defaultAccount

//
// Tx Signature Flow
//
// handleRequest: eth_sendTransaction
//   validateTransaction (basic validity check)
//     validateSender (checks that sender is in accounts)
//   processTransaction (sign tx and submit to network)
//     approveTransaction (UI approval hook)
//     checkApproval
//     finalizeAndSubmitTx (tx signing)
//       nonceLock.take (bottle neck to ensure atomic nonce)
//         fillInTxExtras (set fallback gasPrice, nonce, etc)
//         signTransaction (perform the signature)
//         publishTransaction (publish signed tx to network)
//


inherits(HookedWalletSubprovider, Subprovider)

function HookedWalletSubprovider(opts){
  const self = this
  // control flow
  self.nonceLock = Semaphore(1)

  // data lookup
  if (opts.getAccounts) self.getAccounts = opts.getAccounts
  // high level override
  if (opts.processTransaction) self.processTransaction = opts.processTransaction
  if (opts.processSignTransaction) self.processSignTransaction = opts.processSignTransaction
  if (opts.processMessage) self.processMessage = opts.processMessage
  if (opts.processPersonalMessage) self.processPersonalMessage = opts.processPersonalMessage
  if (opts.processTypedMessage) self.processTypedMessage = opts.processTypedMessage
  // approval hooks
  self.approveTransaction = opts.approveTransaction || self.autoApprove
  self.approveMessage = opts.approveMessage || self.autoApprove
  self.approvePersonalMessage = opts.approvePersonalMessage || self.autoApprove
  self.approveTypedMessage = opts.approveTypedMessage || self.autoApprove
  // actually perform the signature
  self.signTransaction = opts.signTransaction  || mustProvideInConstructor('signTransaction')
  self.signMessage = opts.signMessage  || mustProvideInConstructor('signMessage')
  self.signPersonalMessage = opts.signPersonalMessage  || mustProvideInConstructor('signPersonalMessage')
  self.signTypedMessage = opts.signTypedMessage  || mustProvideInConstructor('signTypedMessage')
  if (opts.recoverPersonalSignature) self.recoverPersonalSignature = opts.recoverPersonalSignature
  // publish to network
  if (opts.publishTransaction) self.publishTransaction = opts.publishTransaction
  // gas options
  self.estimateGas = opts.estimateGas || self.estimateGas
  self.getGasPrice = opts.getGasPrice || self.getGasPrice
}

HookedWalletSubprovider.prototype.handleRequest = function(payload, next, end){
  const self = this
  self._parityRequests = {}
  self._parityRequestCount = 0

  // switch statement is not block scoped
  // sp we cant repeat var declarations
  let txParams, msgParams, extraParams
  let message, address

  switch(payload.method) {

    case 'eth_coinbase':
      // process normally
      self.getAccounts(function(err, accounts){
        if (err) return end(err)
        let result = accounts[0] || null
        end(null, result)
      })
      return

    case 'eth_accounts':
      // process normally
      self.getAccounts(function(err, accounts){
        if (err) return end(err)
        end(null, accounts)
      })
      return

    case 'eth_sendTransaction':
      txParams = payload.params[0]
      waterfall([
        (cb) => self.validateTransaction(txParams, cb),
        (cb) => self.processTransaction(txParams, cb),
      ], end)
      return

    case 'eth_signTransaction':
      txParams = payload.params[0]
      waterfall([
        (cb) => self.validateTransaction(txParams, cb),
        (cb) => self.processSignTransaction(txParams, cb),
      ], end)
      return

    case 'eth_sign':
      // process normally
      address = payload.params[0]
      message = payload.params[1]
      // non-standard "extraParams" to be appended to our "msgParams" obj
      // good place for metadata
      extraParams = payload.params[2] || {}
      msgParams = extend(extraParams, {
        from: address,
        data: message,
      })
      waterfall([
        (cb) => self.validateMessage(msgParams, cb),
        (cb) => self.processMessage(msgParams, cb),
      ], end)
      return

    case 'personal_sign':
      return (function(){
        // process normally
        const first = payload.params[0]
        const second = payload.params[1]

        // We initially incorrectly ordered these parameters.
        // To gracefully respect users who adopted this API early,
        // we are currently gracefully recovering from the wrong param order
        // when it is clearly identifiable.
        //
        // That means when the first param is definitely an address,
        // and the second param is definitely not, but is hex.
        if (resemblesData(second) && resemblesAddress(first)) {
          let warning = `The eth_personalSign method requires params ordered `
          warning += `[message, address]. This was previously handled incorrectly, `
          warning += `and has been corrected automatically. `
          warning += `Please switch this param order for smooth behavior in the future.`
          console.warn(warning)

          address = payload.params[0]
          message = payload.params[1]
        } else {
          message = payload.params[0]
          address = payload.params[1]
        }

        // non-standard "extraParams" to be appended to our "msgParams" obj
        // good place for metadata
        extraParams = payload.params[2] || {}
        msgParams = extend(extraParams, {
          from: address,
          data: message,
        })
        waterfall([
          (cb) => self.validatePersonalMessage(msgParams, cb),
          (cb) => self.processPersonalMessage(msgParams, cb),
        ], end)
      })()

    case 'personal_ecRecover':
      return (function(){    
        message = payload.params[0]
        let signature = payload.params[1]
        // non-standard "extraParams" to be appended to our "msgParams" obj
        // good place for metadata
        extraParams = payload.params[2] || {}
        msgParams = extend(extraParams, {
          sig: signature,
          data: message,
        })
        self.recoverPersonalSignature(msgParams, end)
      })()

    case 'eth_signTypedData':
      // process normally
      message = payload.params[0]
      address = payload.params[1]
      extraParams = payload.params[2] || {}
      msgParams = extend(extraParams, {
        from: address,
        data: message,
      })
      waterfall([
        (cb) => self.validateTypedMessage(msgParams, cb),
        (cb) => self.processTypedMessage(msgParams, cb),
      ], end)
      return

    case 'parity_postTransaction':
      txParams = payload.params[0]
      self.parityPostTransaction(txParams, end)
      return

    case 'parity_postSign':
      address = payload.params[0]
      message = payload.params[1]
      self.parityPostSign(address, message, end)
      return

    case 'parity_checkRequest':
      return (function(){
        const requestId = payload.params[0]
        self.parityCheckRequest(requestId, end)
      })()

    case 'parity_defaultAccount':
      self.getAccounts(function(err, accounts){
        if (err) return end(err)
        const account = accounts[0] || null
        end(null, account)
      })
      return

    default:
      next()
      return

  }
}

//
// data lookup
//

HookedWalletSubprovider.prototype.getAccounts = function(cb) {
  cb(null, [])
}


//
// "process" high level flow
//

HookedWalletSubprovider.prototype.processTransaction = function(txParams, cb) {
  const self = this
  waterfall([
    (cb) => self.approveTransaction(txParams, cb),
    (didApprove, cb) => self.checkApproval('transaction', didApprove, cb),
    (cb) => self.finalizeAndSubmitTx(txParams, cb),
  ], cb)
}


HookedWalletSubprovider.prototype.processSignTransaction = function(txParams, cb) {
  const self = this
  waterfall([
    (cb) => self.approveTransaction(txParams, cb),
    (didApprove, cb) => self.checkApproval('transaction', didApprove, cb),
    (cb) => self.finalizeTx(txParams, cb),
  ], cb)
}

HookedWalletSubprovider.prototype.processMessage = function(msgParams, cb) {
  const self = this
  waterfall([
    (cb) => self.approveMessage(msgParams, cb),
    (didApprove, cb) => self.checkApproval('message', didApprove, cb),
    (cb) => self.signMessage(msgParams, cb),
  ], cb)
}

HookedWalletSubprovider.prototype.processPersonalMessage = function(msgParams, cb) {
  const self = this
  waterfall([
    (cb) => self.approvePersonalMessage(msgParams, cb),
    (didApprove, cb) => self.checkApproval('message', didApprove, cb),
    (cb) => self.signPersonalMessage(msgParams, cb),
  ], cb)
}

HookedWalletSubprovider.prototype.processTypedMessage = function(msgParams, cb) {
  const self = this
  waterfall([
    (cb) => self.approveTypedMessage(msgParams, cb),
    (didApprove, cb) => self.checkApproval('message', didApprove, cb),
    (cb) => self.signTypedMessage(msgParams, cb),
  ], cb)
}

//
// approval
//

HookedWalletSubprovider.prototype.autoApprove = function(txParams, cb) {
  cb(null, true)
}

HookedWalletSubprovider.prototype.checkApproval = function(type, didApprove, cb) {
  cb( didApprove ? null : new Error('User denied '+type+' signature.') )
}

//
// parity
//

HookedWalletSubprovider.prototype.parityPostTransaction = function(txParams, cb) {
  const self = this

  // get next id
  const count = self._parityRequestCount
  const reqId = `0x${count.toString(16)}`
  self._parityRequestCount++

  self.emitPayload({
    method: 'eth_sendTransaction',
    params: [txParams],
  }, function(error, res){
    if (error) {
      self._parityRequests[reqId] = { error }
      return
    }
    const txHash = res.result
    self._parityRequests[reqId] = txHash
  })

  cb(null, reqId)
}


HookedWalletSubprovider.prototype.parityPostSign = function(address, message, cb) {
  const self = this

  // get next id
  const count = self._parityRequestCount
  const reqId = `0x${count.toString(16)}`
  self._parityRequestCount++

  self.emitPayload({
    method: 'eth_sign',
    params: [address, message],
  }, function(error, res){
    if (error) {
      self._parityRequests[reqId] = { error }
      return
    }
    const result = res.result
    self._parityRequests[reqId] = result
  })

  cb(null, reqId)
}

HookedWalletSubprovider.prototype.parityCheckRequest = function(reqId, cb) {
  const self = this
  const result = self._parityRequests[reqId] || null
  // tx not handled yet
  if (!result) return cb(null, null)
  // tx was rejected (or other error)
  if (result.error) return cb(result.error)
  // tx sent
  cb(null, result)
}

//
// signature and recovery
//

HookedWalletSubprovider.prototype.recoverPersonalSignature = function(msgParams, cb) {
  let senderHex
  try {
    senderHex = sigUtil.recoverPersonalSignature(msgParams)
  } catch (err) {
    return cb(err)
  }
  cb(null, senderHex)
}

//
// validation
//

HookedWalletSubprovider.prototype.validateTransaction = function(txParams, cb){
  const self = this
  // shortcut: undefined sender is invalid
  if (txParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign transaction.`))
  self.validateSender(txParams.from, function(err, senderIsValid){
    if (err) return cb(err)
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign transaction for this address: "${txParams.from}"`))
    cb()
  })
}

HookedWalletSubprovider.prototype.validateMessage = function(msgParams, cb){
  const self = this
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign message.`))
  self.validateSender(msgParams.from, function(err, senderIsValid){
    if (err) return cb(err)
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`))
    cb()
  })
}

HookedWalletSubprovider.prototype.validatePersonalMessage = function(msgParams, cb){
  const self = this
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign personal message.`))
  if (msgParams.data === undefined) return cb(new Error(`Undefined message - message required to sign personal message.`))
  if (!isValidHex(msgParams.data)) return cb(new Error(`HookedWalletSubprovider - validateMessage - message was not encoded as hex.`))
  self.validateSender(msgParams.from, function(err, senderIsValid){
    if (err) return cb(err)
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`))
    cb()
  })
}

HookedWalletSubprovider.prototype.validateTypedMessage = function(msgParams, cb){
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign typed data.`))
  if (msgParams.data === undefined) return cb(new Error(`Undefined data - message required to sign typed data.`))
  this.validateSender(msgParams.from, function(err, senderIsValid){
    if (err) return cb(err)
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`))
    cb()
  })
}

HookedWalletSubprovider.prototype.validateSender = function(senderAddress, cb){
  const self = this
  // shortcut: undefined sender is invalid
  if (!senderAddress) return cb(null, false)
  self.getAccounts(function(err, accounts){
    if (err) return cb(err)
    const senderIsValid = (accounts.map(toLowerCase).indexOf(senderAddress.toLowerCase()) !== -1)
    cb(null, senderIsValid)
  })
}

//
// tx helpers
//

HookedWalletSubprovider.prototype.finalizeAndSubmitTx = function(txParams, cb) {
  const self = this
  // can only allow one tx to pass through this flow at a time
  // so we can atomically consume a nonce
  self.nonceLock.take(function(){
    waterfall([
      self.fillInTxExtras.bind(self, txParams),
      self.signTransaction.bind(self),
      self.publishTransaction.bind(self),
    ], function(err, txHash){
      self.nonceLock.leave()
      if (err) return cb(err)
      cb(null, txHash)
    })
  })
}

HookedWalletSubprovider.prototype.finalizeTx = function(txParams, cb) {
  const self = this
  // can only allow one tx to pass through this flow at a time
  // so we can atomically consume a nonce
  self.nonceLock.take(function(){
    waterfall([
      self.fillInTxExtras.bind(self, txParams),
      self.signTransaction.bind(self),
    ], function(err, signedTx){
      self.nonceLock.leave()
      if (err) return cb(err)
      cb(null, {raw: signedTx, tx: txParams})
    })
  })
}

HookedWalletSubprovider.prototype.publishTransaction = function(rawTx, cb) {
  const self = this
  self.emitPayload({
    method: 'eth_sendRawTransaction',
    params: [rawTx],
  }, function(err, res){
    if (err) return cb(err)
    cb(null, res.result)
  })
}

HookedWalletSubprovider.prototype.estimateGas = function(txParams, cb) {
  const self = this
  estimateGas(self.engine, txParams, cb)
}

HookedWalletSubprovider.prototype.getGasPrice = function(cb) {
  const self = this
  self.emitPayload({ method: 'eth_gasPrice', params: [] }, function (err, res) {
    if (err) return cb(err)
    cb(null, res.result)
  })
}

HookedWalletSubprovider.prototype.fillInTxExtras = function(txParams, cb){
  const self = this
  const address = txParams.from
  // console.log('fillInTxExtras - address:', address)

  const tasks = {}

  if (txParams.gasPrice === undefined) {
    // console.log("need to get gasprice")
    tasks.gasPrice = self.getGasPrice.bind(self)
  }

  if (txParams.nonce === undefined) {
    // console.log("need to get nonce")
    tasks.nonce = self.emitPayload.bind(self, { method: 'eth_getTransactionCount', params: [address, 'pending'] })
  }

  if (txParams.gas === undefined) {
    // console.log("need to get gas")
    tasks.gas = self.estimateGas.bind(self, cloneTxParams(txParams))
  }

  parallel(tasks, function(err, taskResults) {
    if (err) return cb(err)

    const result = {}
    if (taskResults.gasPrice) result.gasPrice = taskResults.gasPrice
    if (taskResults.nonce) result.nonce = taskResults.nonce.result
    if (taskResults.gas) result.gas = taskResults.gas

    cb(null, extend(txParams, result))
  })
}

// util

// we use this to clean any custom params from the txParams
function cloneTxParams(txParams){
  return {
    from: txParams.from,
    to: txParams.to,
    value: txParams.value,
    data: txParams.data,
    gas: txParams.gas,
    gasPrice: txParams.gasPrice,
    nonce: txParams.nonce,
  }
}

function toLowerCase(string){
  return string.toLowerCase()
}

function resemblesAddress (string) {
  const fixed = ethUtil.addHexPrefix(string)
  const isValid = ethUtil.isValidAddress(fixed)
  return isValid
}

// Returns true if resembles hex data
// but definitely not a valid address.
function resemblesData (string) {
  const fixed = ethUtil.addHexPrefix(string)
  const isValidAddress = ethUtil.isValidAddress(fixed)
  return !isValidAddress && isValidHex(string)
}

function isValidHex(data) {
  const isString = typeof data === 'string'
  if (!isString) return false
  const isHexPrefixed = data.slice(0,2) === '0x'
  if (!isHexPrefixed) return false
  const nonPrefixed = data.slice(2)
  const isValid = nonPrefixed.match(hexRegex)
  return isValid
}

function mustProvideInConstructor(methodName) {
  return function(params, cb) {
    cb(new Error('ProviderEngine - HookedWalletSubprovider - Must provide "' + methodName + '" fn in constructor options'))
  }
}


/***/ }),

/***/ "Uu7K":
/***/ (function(module, exports, __webpack_require__) {

const createPayload = __webpack_require__("xQaN")

module.exports = SubProvider

// this is the base class for a subprovider -- mostly helpers


function SubProvider() {

}

SubProvider.prototype.setEngine = function(engine) {
  const self = this
  if (self.engine) return
  self.engine = engine
  engine.on('block', function(block) {
    self.currentBlock = block
  })

  engine.on('start', function () {
    self.start()
  })

  engine.on('stop', function () {
    self.stop()
  })
}

SubProvider.prototype.handleRequest = function(payload, next, end) {
  throw new Error('Subproviders should override `handleRequest`.')
}

SubProvider.prototype.emitPayload = function(payload, cb){
  const self = this
  self.engine.sendAsync(createPayload(payload), cb)
}

// dummies for overriding

SubProvider.prototype.stop = function () {}

SubProvider.prototype.start = function () {}


/***/ }),

/***/ "WPTD":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {const xhr = process.browser ? __webpack_require__("7sdD") : __webpack_require__(4)
const inherits = __webpack_require__("MCLT").inherits
const createPayload = __webpack_require__("xQaN")
const Subprovider = __webpack_require__("Uu7K")
const { errors: rpcErrors } = __webpack_require__("z8+S")


module.exports = RpcSource

inherits(RpcSource, Subprovider)

function RpcSource(opts) {
  const self = this
  self.rpcUrl = opts.rpcUrl
}

RpcSource.prototype.handleRequest = function(payload, next, end){
  const self = this
  const targetUrl = self.rpcUrl

  // overwrite id to conflict with other concurrent users
  let newPayload = createPayload(payload)

  xhr({
    uri: targetUrl,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPayload),
    rejectUnauthorized: false,
    timeout: 20000,
  }, function(err, res, body) {
    if (err) return end(rpcErrors.internal(err))

    // check for error code
    switch (res.statusCode) {
      case 405:
        return end(rpcErrors.methodNotFound())
      case 504: // Gateway timeout
        return (function(){
          let msg = `Gateway timeout. The request took too long to process. `
          msg += `This can happen when querying logs over too wide a block range.`
          return end(rpcErrors.internal(msg))
        })()
      case 429: // Too many requests (rate limiting)
        return (function(){
          const err = new Error(`Too Many Requests`)
          return end(rpcErrors.internal(err))
        })()
      default:
        if (res.statusCode != 200) {
          return end(rpcErrors.internal(res.body))
        }
    }

    // parse response
    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.error(err.stack)
      return end(rpcErrors.internal(err))
    }
    if (data.error) return end(data.error)

    end(null, data.result)
  })
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "a5O3":
/***/ (function(module, exports, __webpack_require__) {

const createPayload = __webpack_require__("xQaN")

module.exports = estimateGas

/*

This is a work around for https://github.com/ethereum/go-ethereum/issues/2577

*/


function estimateGas(provider, txParams, cb) {
  provider.sendAsync(createPayload({
    method: 'eth_estimateGas',
    params: [txParams]
  }), function(err, res){
    if (err) {
      // handle simple value transfer case
      if (err.message === 'no contract code at given address') {
        return cb(null, '0xcf08')
      } else {
        return cb(err)        
      }
    }
    cb(null, res.result)
  })
}

/***/ }),

/***/ "f4g2":
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__("+qE3").EventEmitter
const inherits = __webpack_require__("MCLT").inherits
const ethUtil = __webpack_require__("tnHP")
const EthBlockTracker = __webpack_require__("V5x4")
const map = __webpack_require__("LCem")
const eachSeries = __webpack_require__("YOJA")
const Stoplight = __webpack_require__("/uSP")
const cacheUtils = __webpack_require__("gO+T")
const createPayload = __webpack_require__("xQaN")
const noop = function(){}

module.exports = Web3ProviderEngine


inherits(Web3ProviderEngine, EventEmitter)

function Web3ProviderEngine(opts) {
  const self = this
  EventEmitter.call(self)
  self.setMaxListeners(30)
  // parse options
  opts = opts || {}

  // block polling
  const directProvider = { sendAsync: self._handleAsync.bind(self) }
  const blockTrackerProvider = opts.blockTrackerProvider || directProvider
  self._blockTracker = opts.blockTracker || new EthBlockTracker({
    provider: blockTrackerProvider,
    pollingInterval: opts.pollingInterval || 4000,
    setSkipCacheFlag: true,
  })

  // set initialization blocker
  self._ready = new Stoplight()
  
  // local state
  self.currentBlock = null
  self._providers = []
}

// public

Web3ProviderEngine.prototype.start = function(cb = noop){
  const self = this

  // trigger start
  self._ready.go()

  // on new block, request block body and emit as events
  self._blockTracker.on('latest', (blockNumber) => {
    // get block body
    self._getBlockByNumber(blockNumber, (err, block) => {
      if (err) {
        this.emit('error', err)
        return
      }
      if (!block) {
        this.emit('error', new Error("Could not find block"))
        return
      }
      const bufferBlock = toBufferBlock(block)
      // set current + emit "block" event
      self._setCurrentBlock(bufferBlock)
      // emit other events
      self.emit('rawBlock', block)
      self.emit('latest', block)
    })
  })

  // forward other events
  self._blockTracker.on('sync', self.emit.bind(self, 'sync'))
  self._blockTracker.on('error', self.emit.bind(self, 'error'))

  // update state
  self._running = true
  // signal that we started
  self.emit('start')
}

Web3ProviderEngine.prototype.stop = function(){
  const self = this
  // stop block polling by removing event listeners
  self._blockTracker.removeAllListeners()
  // update state
  self._running = false
  // signal that we stopped
  self.emit('stop')
}

Web3ProviderEngine.prototype.isRunning = function(){
  const self = this
  return self._running
}

Web3ProviderEngine.prototype.addProvider = function(source, index){
  const self = this
  if (typeof index === 'number') {
    self._providers.splice(index, 0, source)
  } else {
    self._providers.push(source)
  }
  source.setEngine(this)
}

Web3ProviderEngine.prototype.removeProvider = function(source){
  const self = this
  const index = self._providers.indexOf(source)
  if (index < 0) throw new Error('Provider not found.')
  self._providers.splice(index, 1)
}

Web3ProviderEngine.prototype.send = function(payload){
  throw new Error('Web3ProviderEngine does not support synchronous requests.')
}

Web3ProviderEngine.prototype.sendAsync = function(payload, cb){
  const self = this
  self._ready.await(function(){

    if (Array.isArray(payload)) {
      // handle batch
      map(payload, self._handleAsync.bind(self), cb)
    } else {
      // handle single
      self._handleAsync(payload, cb)
    }

  })
}

// private

Web3ProviderEngine.prototype._getBlockByNumber = function(blockNumber, cb) {
  const req = createPayload({ method: 'eth_getBlockByNumber', params: [blockNumber, false], skipCache: true })
  this._handleAsync(req, (err, res) => {
    if (err) return cb(err)
    return cb(null, res.result)
  })
}

Web3ProviderEngine.prototype._handleAsync = function(payload, finished) {
  var self = this
  var currentProvider = -1
  var result = null
  var error = null

  var stack = []

  next()
  
  function next(after) {
    currentProvider += 1
    stack.unshift(after)

    // Bubbled down as far as we could go, and the request wasn't
    // handled. Return an error.
    if (currentProvider >= self._providers.length) {
      end(new Error('Request for method "' + payload.method + '" not handled by any subprovider. Please check your subprovider configuration to ensure this method is handled.'))
    } else {
      try {
        var provider = self._providers[currentProvider]
        provider.handleRequest(payload, next, end)
      } catch (e) {
        end(e)
      }
    }
  }

  function end(_error, _result) {
    error = _error
    result = _result

    eachSeries(stack, function(fn, callback) {

      if (fn) {
        fn(error, result, callback)
      } else {
        callback()
      }
    }, function() {

      var resultObj = {
        id: payload.id,
        jsonrpc: payload.jsonrpc,
        result: result
      }

      if (error != null) {
        resultObj.error = {
          message: error.stack || error.message || error,
          code: -32000
        }
        // respond with both error formats
        finished(error, resultObj)
      } else {
        finished(null, resultObj)
      }
    })
  }
}

//
// from remote-data
//

Web3ProviderEngine.prototype._setCurrentBlock = function(block){
  const self = this
  self.currentBlock = block
  self.emit('block', block)
}

// util

function toBufferBlock (jsonBlock) {
  return {
    number:           ethUtil.toBuffer(jsonBlock.number),
    hash:             ethUtil.toBuffer(jsonBlock.hash),
    parentHash:       ethUtil.toBuffer(jsonBlock.parentHash),
    nonce:            ethUtil.toBuffer(jsonBlock.nonce),
    mixHash:          ethUtil.toBuffer(jsonBlock.mixHash),
    sha3Uncles:       ethUtil.toBuffer(jsonBlock.sha3Uncles),
    logsBloom:        ethUtil.toBuffer(jsonBlock.logsBloom),
    transactionsRoot: ethUtil.toBuffer(jsonBlock.transactionsRoot),
    stateRoot:        ethUtil.toBuffer(jsonBlock.stateRoot),
    receiptsRoot:     ethUtil.toBuffer(jsonBlock.receiptRoot || jsonBlock.receiptsRoot),
    miner:            ethUtil.toBuffer(jsonBlock.miner),
    difficulty:       ethUtil.toBuffer(jsonBlock.difficulty),
    totalDifficulty:  ethUtil.toBuffer(jsonBlock.totalDifficulty),
    size:             ethUtil.toBuffer(jsonBlock.size),
    extraData:        ethUtil.toBuffer(jsonBlock.extraData),
    gasLimit:         ethUtil.toBuffer(jsonBlock.gasLimit),
    gasUsed:          ethUtil.toBuffer(jsonBlock.gasUsed),
    timestamp:        ethUtil.toBuffer(jsonBlock.timestamp),
    transactions:     jsonBlock.transactions,
  }
}


/***/ }),

/***/ "gO+T":
/***/ (function(module, exports, __webpack_require__) {

const stringify = __webpack_require__("rE/H")

module.exports = {
  cacheIdentifierForPayload: cacheIdentifierForPayload,
  canCache: canCache,
  blockTagForPayload: blockTagForPayload,
  paramsWithoutBlockTag: paramsWithoutBlockTag,
  blockTagParamIndex: blockTagParamIndex,
  cacheTypeForPayload: cacheTypeForPayload,
}

function cacheIdentifierForPayload(payload, opts = {}){
  if (!canCache(payload)) return null
  const { includeBlockRef } = opts
  const params = includeBlockRef ? payload.params : paramsWithoutBlockTag(payload)
  return payload.method + ':' + stringify(params)
}

function canCache(payload){
  return cacheTypeForPayload(payload) !== 'never'
}

function blockTagForPayload(payload){
  var index = blockTagParamIndex(payload);

  // Block tag param not passed.
  if (index >= payload.params.length) {
    return null;
  }

  return payload.params[index];
}

function paramsWithoutBlockTag(payload){
  var index = blockTagParamIndex(payload);

  // Block tag param not passed.
  if (index >= payload.params.length) {
    return payload.params;
  }

  // eth_getBlockByNumber has the block tag first, then the optional includeTx? param
  if (payload.method === 'eth_getBlockByNumber') {
    return payload.params.slice(1);
  }

  return payload.params.slice(0,index);
}

function blockTagParamIndex(payload){
  switch(payload.method) {
    // blockTag is third param
    case 'eth_getStorageAt':
      return 2
    // blockTag is second param
    case 'eth_getBalance':
    case 'eth_getCode':
    case 'eth_getTransactionCount':
    case 'eth_call':
    case 'eth_estimateGas':
      return 1
    // blockTag is first param
    case 'eth_getBlockByNumber':
      return 0
    // there is no blockTag
    default:
      return undefined
  }
}

function cacheTypeForPayload(payload) {
  switch (payload.method) {
    // cache permanently
    case 'web3_clientVersion':
    case 'web3_sha3':
    case 'eth_protocolVersion':
    case 'eth_getBlockTransactionCountByHash':
    case 'eth_getUncleCountByBlockHash':
    case 'eth_getCode':
    case 'eth_getBlockByHash':
    case 'eth_getTransactionByHash':
    case 'eth_getTransactionByBlockHashAndIndex':
    case 'eth_getTransactionReceipt':
    case 'eth_getUncleByBlockHashAndIndex':
    case 'eth_getCompilers':
    case 'eth_compileLLL':
    case 'eth_compileSolidity':
    case 'eth_compileSerpent':
    case 'shh_version':
      return 'perma'

    // cache until fork
    case 'eth_getBlockByNumber':
    case 'eth_getBlockTransactionCountByNumber':
    case 'eth_getUncleCountByBlockNumber':
    case 'eth_getTransactionByBlockNumberAndIndex':
    case 'eth_getUncleByBlockNumberAndIndex':
      return 'fork'

    // cache for block
    case 'eth_gasPrice':
    case 'eth_getBalance':
    case 'eth_getStorageAt':
    case 'eth_getTransactionCount':
    case 'eth_call':
    case 'eth_estimateGas':
    case 'eth_getFilterLogs':
    case 'eth_getLogs':
    case 'eth_blockNumber':
      return 'block'

    // never cache
    case 'net_version':
    case 'net_peerCount':
    case 'net_listening':
    case 'eth_syncing':
    case 'eth_sign':
    case 'eth_coinbase':
    case 'eth_mining':
    case 'eth_hashrate':
    case 'eth_accounts':
    case 'eth_sendTransaction':
    case 'eth_sendRawTransaction':
    case 'eth_newFilter':
    case 'eth_newBlockFilter':
    case 'eth_newPendingTransactionFilter':
    case 'eth_uninstallFilter':
    case 'eth_getFilterChanges':
    case 'eth_getWork':
    case 'eth_submitWork':
    case 'eth_submitHashrate':
    case 'db_putString':
    case 'db_getString':
    case 'db_putHex':
    case 'db_getHex':
    case 'shh_post':
    case 'shh_newIdentity':
    case 'shh_hasIdentity':
    case 'shh_newGroup':
    case 'shh_addToGroup':
    case 'shh_newFilter':
    case 'shh_uninstallFilter':
    case 'shh_getFilterChanges':
    case 'shh_getMessages':
      return 'never'
  }
}


/***/ }),

/***/ "gUgm":
/***/ (function(module, exports, __webpack_require__) {

/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file httpprovider.js
 * @authors:
 *   Marek Kotewicz <marek@parity.io>
 *   Marian Oancea
 *   Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2015
 */

var errors = __webpack_require__("OdSp").errors;
var XHR2 = __webpack_require__("hgLn").XMLHttpRequest // jshint ignore: line
var http = __webpack_require__("lJCZ");
var https = __webpack_require__("JPgR");


/**
 * HttpProvider should be used to send rpc calls over http
 */
var HttpProvider = function HttpProvider(host, options) {
    options = options || {};

    var keepAlive =
        (options.keepAlive === true || options.keepAlive !== false) ?
            true :
            false;
    this.host = host || 'http://localhost:8545';
    if (this.host.substring(0,5) === "https") {
        this.httpsAgent = new https.Agent({ keepAlive: keepAlive });
    }else{
        this.httpAgent = new http.Agent({ keepAlive: keepAlive });
    }
    this.timeout = options.timeout || 0;
    this.headers = options.headers;
    this.connected = false;
};

HttpProvider.prototype._prepareRequest = function(){
    var request = new XHR2();
    request.nodejsSet({
        httpsAgent:this.httpsAgent,
        httpAgent:this.httpAgent
    });

    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type','application/json');
    request.timeout = this.timeout && this.timeout !== 1 ? this.timeout : 0;
    request.withCredentials = true;

    if(this.headers) {
        this.headers.forEach(function(header) {
            request.setRequestHeader(header.name, header.value);
        });
    }

    return request;
};

/**
 * Should be used to make async request
 *
 * @method send
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
HttpProvider.prototype.send = function (payload, callback) {
    var _this = this;
    var request = this._prepareRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.timeout !== 1) {
            var result = request.responseText;
            var error = null;

            try {
                result = JSON.parse(result);
            } catch(e) {
                error = errors.InvalidResponse(request.responseText);
            }

            _this.connected = true;
            callback(error, result);
        }
    };

    request.ontimeout = function() {
        _this.connected = false;
        callback(errors.ConnectionTimeout(this.timeout));
    };

    try {
        request.send(JSON.stringify(payload));
    } catch(error) {
        this.connected = false;
        callback(errors.InvalidConnection(this.host));
    }
};

HttpProvider.prototype.disconnect = function () {
    //NO OP
};


module.exports = HttpProvider;


/***/ }),

/***/ "k6B8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file index.js
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var _ = __webpack_require__("F/us");
var errors = __webpack_require__("OdSp").errors;
var oboe = __webpack_require__("Nmc6");


var IpcProvider = function IpcProvider(path, net) {
    var _this = this;
    this.responseCallbacks = {};
    this.notificationCallbacks = [];
    this.path = path;
    this.connected = false;

    this.connection = net.connect({path: this.path});

    this.addDefaultEvents();

    // LISTEN FOR CONNECTION RESPONSES
    var callback = function(result) {
        /*jshint maxcomplexity: 6 */

        var id = null;

        // get the id which matches the returned id
        if(_.isArray(result)) {
            result.forEach(function(load){
                if(_this.responseCallbacks[load.id])
                    id = load.id;
            });
        } else {
            id = result.id;
        }

        // notification
        if(!id && result.method.indexOf('_subscription') !== -1) {
            _this.notificationCallbacks.forEach(function(callback){
                if(_.isFunction(callback))
                    callback(result);
            });

            // fire the callback
        } else if(_this.responseCallbacks[id]) {
            _this.responseCallbacks[id](null, result);
            delete _this.responseCallbacks[id];
        }
    };

    // use oboe.js for Sockets
    if (net.constructor.name === 'Socket') {
        oboe(this.connection)
        .done(callback);
    } else {
        this.connection.on('data', function(data){
            _this._parseResponse(data.toString()).forEach(callback);
        });
    }
};

/**
Will add the error and end event to timeout existing calls

@method addDefaultEvents
*/
IpcProvider.prototype.addDefaultEvents = function(){
    var _this = this;

    this.connection.on('connect', function(){
        _this.connected = true;
    });

    this.connection.on('close', function(){
        _this.connected = false;
    });

    this.connection.on('error', function(){
        _this._timeout();
    });

    this.connection.on('end', function(){
        _this._timeout();
    });

    this.connection.on('timeout', function(){
        _this._timeout();
    });
};


/**
 Will parse the response and make an array out of it.

 NOTE, this exists for backwards compatibility reasons.

 @method _parseResponse
 @param {String} data
 */
IpcProvider.prototype._parseResponse = function(data) {
    var _this = this,
        returnValues = [];

    // DE-CHUNKER
    var dechunkedData = data
        .replace(/\}[\n\r]?\{/g,'}|--|{') // }{
        .replace(/\}\][\n\r]?\[\{/g,'}]|--|[{') // }][{
        .replace(/\}[\n\r]?\[\{/g,'}|--|[{') // }[{
        .replace(/\}\][\n\r]?\{/g,'}]|--|{') // }]{
        .split('|--|');

    dechunkedData.forEach(function(data){

        // prepend the last chunk
        if(_this.lastChunk)
            data = _this.lastChunk + data;

        var result = null;

        try {
            result = JSON.parse(data);

        } catch(e) {

            _this.lastChunk = data;

            // start timeout to cancel all requests
            clearTimeout(_this.lastChunkTimeout);
            _this.lastChunkTimeout = setTimeout(function(){
                _this._timeout();
                throw errors.InvalidResponse(data);
            }, 1000 * 15);

            return;
        }

        // cancel timeout and set chunk to null
        clearTimeout(_this.lastChunkTimeout);
        _this.lastChunk = null;

        if(result)
            returnValues.push(result);
    });

    return returnValues;
};


/**
Get the adds a callback to the responseCallbacks object,
which will be called if a response matching the response Id will arrive.

@method _addResponseCallback
*/
IpcProvider.prototype._addResponseCallback = function(payload, callback) {
    var id = payload.id || payload[0].id;
    var method = payload.method || payload[0].method;

    this.responseCallbacks[id] = callback;
    this.responseCallbacks[id].method = method;
};

/**
Timeout all requests when the end/error event is fired

@method _timeout
*/
IpcProvider.prototype._timeout = function() {
    for(var key in this.responseCallbacks) {
        if(this.responseCallbacks.hasOwnProperty(key)){
            this.responseCallbacks[key](errors.InvalidConnection('on IPC'));
            delete this.responseCallbacks[key];
        }
    }
};

/**
 Try to reconnect

 @method reconnect
 */
IpcProvider.prototype.reconnect = function() {
    this.connection.connect({path: this.path});
};


IpcProvider.prototype.send = function (payload, callback) {
    // try reconnect, when connection is gone
    if(!this.connection.writable)
        this.connection.connect({path: this.path});


    this.connection.write(JSON.stringify(payload));
    this._addResponseCallback(payload, callback);
};

/**
Subscribes to provider events.provider

@method on
@param {String} type    'notification', 'connect', 'error', 'end' or 'data'
@param {Function} callback   the callback to call
*/
IpcProvider.prototype.on = function (type, callback) {

    if(typeof callback !== 'function')
        throw new Error('The second parameter callback must be a function.');

    switch(type){
        case 'data':
            this.notificationCallbacks.push(callback);
            break;

        // adds error, end, timeout, connect
        default:
            this.connection.on(type, callback);
            break;
    }
};

/**
 Subscribes to provider events.provider

 @method on
 @param {String} type    'connect', 'error', 'end' or 'data'
 @param {Function} callback   the callback to call
 */
IpcProvider.prototype.once = function (type, callback) {

    if(typeof callback !== 'function')
        throw new Error('The second parameter callback must be a function.');

    this.connection.once(type, callback);
};

/**
Removes event listener

@method removeListener
@param {String} type    'data', 'connect', 'error', 'end' or 'data'
@param {Function} callback   the callback to call
*/
IpcProvider.prototype.removeListener = function (type, callback) {
    var _this = this;

    switch(type){
        case 'data':
            this.notificationCallbacks.forEach(function(cb, index){
                if(cb === callback)
                    _this.notificationCallbacks.splice(index, 1);
            });
            break;

        default:
            this.connection.removeListener(type, callback);
            break;
    }
};

/**
Removes all event listeners

@method removeAllListeners
@param {String} type    'data', 'connect', 'error', 'end' or 'data'
*/
IpcProvider.prototype.removeAllListeners = function (type) {
    switch(type){
        case 'data':
            this.notificationCallbacks = [];
            break;

        default:
            this.connection.removeAllListeners(type);
            break;
    }
};

/**
Resets the providers, clears all callbacks

@method reset
*/
IpcProvider.prototype.reset = function () {
    this._timeout();
    this.notificationCallbacks = [];

    this.connection.removeAllListeners('error');
    this.connection.removeAllListeners('end');
    this.connection.removeAllListeners('timeout');

    this.addDefaultEvents();
};

module.exports = IpcProvider;



/***/ }),

/***/ "kzD/":
/***/ (function(module, exports) {

// gotta keep it within MAX_SAFE_INTEGER
const extraDigits = 3

module.exports = createRandomId


function createRandomId(){
  // 13 time digits
  var datePart = new Date().getTime()*Math.pow(10, extraDigits)
  // 3 random digits
  var extraPart = Math.floor(Math.random()*Math.pow(10, extraDigits))
  // 16 digits
  return datePart+extraPart
}

/***/ }),

/***/ "xQaN":
/***/ (function(module, exports, __webpack_require__) {

const getRandomId = __webpack_require__("kzD/")
const extend = __webpack_require__("U6jy")

module.exports = createPayload


function createPayload(data){
  return extend({
    // defaults
    id: getRandomId(),
    jsonrpc: '2.0',
    params: [],
    // user-specified
  }, data)
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlci1lbmdpbmUvdXRpbC9zdG9wbGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtcHJvdmlkZXJzLXdzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlci1lbmdpbmUvc3VicHJvdmlkZXJzL2hvb2tlZC13YWxsZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtcHJvdmlkZXItZW5naW5lL3N1YnByb3ZpZGVycy9zdWJwcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlci1lbmdpbmUvc3VicHJvdmlkZXJzL3JwYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlci1lbmdpbmUvdXRpbC9lc3RpbWF0ZS1nYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtcHJvdmlkZXItZW5naW5lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLXByb3ZpZGVyLWVuZ2luZS91dGlsL3JwYy1jYWNoZS11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlcnMtaHR0cC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtcHJvdmlkZXJzLWlwYy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtcHJvdmlkZXItZW5naW5lL3V0aWwvcmFuZG9tLWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLXByb3ZpZGVyLWVuZ2luZS91dGlsL2NyZWF0ZS1wYXlsb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUJBQXFCLG1CQUFPLENBQUMsTUFBUTtBQUNyQyxp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O0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EseUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNB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QTtBQUNBLEM7Ozs7Ozs7QUNiQSxvQkFBb0IsbUJBQU8sQ0FBQyxNQUFnQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsTUFBTzs7QUFFOUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwiZmlsZSI6InZlbmRvcn42OTE3NDlhMi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbmNvbnN0IGluaGVyaXRzID0gcmVxdWlyZSgndXRpbCcpLmluaGVyaXRzXG5cbm1vZHVsZS5leHBvcnRzID0gU3RvcGxpZ2h0XG5cblxuaW5oZXJpdHMoU3RvcGxpZ2h0LCBFdmVudEVtaXR0ZXIpXG5cbmZ1bmN0aW9uIFN0b3BsaWdodCgpe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBFdmVudEVtaXR0ZXIuY2FsbChzZWxmKVxuICBzZWxmLmlzTG9ja2VkID0gdHJ1ZVxufVxuXG5TdG9wbGlnaHQucHJvdG90eXBlLmdvID0gZnVuY3Rpb24oKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5pc0xvY2tlZCA9IGZhbHNlXG4gIHNlbGYuZW1pdCgndW5sb2NrJylcbn1cblxuU3RvcGxpZ2h0LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5pc0xvY2tlZCA9IHRydWVcbiAgc2VsZi5lbWl0KCdsb2NrJylcbn1cblxuU3RvcGxpZ2h0LnByb3RvdHlwZS5hd2FpdCA9IGZ1bmN0aW9uKGZuKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuaXNMb2NrZWQpIHtcbiAgICBzZWxmLm9uY2UoJ3VubG9jaycsIGZuKVxuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoZm4pXG4gIH1cbn0iLCIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKiBAZmlsZSBXZWJzb2NrZXRQcm92aWRlci5qc1xuICogQGF1dGhvcnM6XG4gKiAgIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1oZWxwZXJzJykuZXJyb3JzO1xudmFyIFdzID0gcmVxdWlyZSgnd2Vic29ja2V0JykudzNjd2Vic29ja2V0O1xuXG52YXIgaXNOb2RlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyA/IHByb2Nlc3MgOiAwKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG52YXIgX2J0b2EgPSBudWxsO1xudmFyIHBhcnNlVVJMID0gbnVsbDtcbmlmIChpc05vZGUpIHtcbiAgICBfYnRvYSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oc3RyKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfTtcbiAgICB2YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG4gICAgaWYgKHVybC5VUkwpIHtcbiAgICAgICAgLy8gVXNlIHRoZSBuZXcgTm9kZSA2KyBBUEkgZm9yIHBhcnNpbmcgVVJMcyB0aGF0IHN1cHBvcnRzIHVzZXJuYW1lL3Bhc3N3b3JkXG4gICAgICAgIHZhciBuZXdVUkwgPSB1cmwuVVJMO1xuICAgICAgICBwYXJzZVVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBuZXdVUkwodXJsKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFdlYjMgc3VwcG9ydHMgTm9kZS5qcyA1LCBzbyBmYWxsIGJhY2sgdG8gdGhlIGxlZ2FjeSBVUkwgQVBJIGlmIG5lY2Vzc2FyeVxuICAgICAgICBwYXJzZVVSTCA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlO1xuICAgIH1cbn0gZWxzZSB7XG4gICAgX2J0b2EgPSBidG9hO1xuICAgIHBhcnNlVVJMID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHVybCk7XG4gICAgfTtcbn1cbi8vIERlZmF1bHQgY29ubmVjdGlvbiB3czovL2xvY2FsaG9zdDo4NTQ2XG5cblxuXG5cbnZhciBXZWJzb2NrZXRQcm92aWRlciA9IGZ1bmN0aW9uIFdlYnNvY2tldFByb3ZpZGVyKHVybCwgb3B0aW9ucykgIHtcbiAgICBpZiAoIVdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd2Vic29ja2V0IGlzIG5vdCBhdmFpbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMucmVzcG9uc2VDYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fY3VzdG9tVGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcblxuICAgIC8vIFRoZSB3M2N3ZWJzb2NrZXQgaW1wbGVtZW50YXRpb24gZG9lcyBub3Qgc3VwcG9ydCBCYXNpYyBBdXRoXG4gICAgLy8gdXNlcm5hbWUvcGFzc3dvcmQgaW4gdGhlIFVSTC4gU28gZ2VuZXJhdGUgdGhlIGJhc2ljIGF1dGggaGVhZGVyLCBhbmRcbiAgICAvLyBwYXNzIHRocm91Z2ggd2l0aCBhbnkgYWRkaXRpb25hbCBoZWFkZXJzIHN1cHBsaWVkIGluIGNvbnN0cnVjdG9yXG4gICAgdmFyIHBhcnNlZFVSTCA9IHBhcnNlVVJMKHVybCk7XG4gICAgdmFyIGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5wcm90b2NvbCB8fCB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcnNlZFVSTC51c2VybmFtZSAmJiBwYXJzZWRVUkwucGFzc3dvcmQpIHtcbiAgICAgICAgaGVhZGVycy5hdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBfYnRvYShwYXJzZWRVUkwudXNlcm5hbWUgKyAnOicgKyBwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgIH1cblxuICAgIC8vIEFsbG93IGEgY3VzdG9tIGNsaWVudCBjb25maWd1cmF0aW9uXG4gICAgdmFyIGNsaWVudENvbmZpZyA9IG9wdGlvbnMuY2xpZW50Q29uZmlnIHx8IHVuZGVmaW5lZDtcbiAgICBcbiAgICAvLyBBbGxvdyBhIGN1c3RvbSByZXF1ZXN0IG9wdGlvbnNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGhldHVydGxlMzIvV2ViU29ja2V0LU5vZGUvYmxvYi9tYXN0ZXIvZG9jcy9XZWJTb2NrZXRDbGllbnQubWQjY29ubmVjdHJlcXVlc3R1cmwtcmVxdWVzdGVkcHJvdG9jb2xzLW9yaWdpbi1oZWFkZXJzLXJlcXVlc3RvcHRpb25zXG4gICAgdmFyIHJlcXVlc3RPcHRpb25zID0gb3B0aW9ucy5yZXF1ZXN0T3B0aW9ucyB8fCB1bmRlZmluZWQ7XG5cbiAgICAvLyBXaGVuIGFsbCBub2RlIGNvcmUgaW1wbGVtZW50YXRpb25zIHRoYXQgZG8gbm90IGhhdmUgdGhlXG4gICAgLy8gV0hBVFdHIGNvbXBhdGlibGUgVVJMIHBhcnNlciBnbyBvdXQgb2Ygc2VydmljZSB0aGlzIGxpbmUgY2FuIGJlIHJlbW92ZWQuXG4gICAgaWYgKHBhcnNlZFVSTC5hdXRoKSB7XG4gICAgICAgIGhlYWRlcnMuYXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgX2J0b2EocGFyc2VkVVJMLmF1dGgpO1xuICAgIH1cbiAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgV3ModXJsLCBwcm90b2NvbCwgdW5kZWZpbmVkLCBoZWFkZXJzLCByZXF1ZXN0T3B0aW9ucywgY2xpZW50Q29uZmlnKTtcblxuICAgIHRoaXMuYWRkRGVmYXVsdEV2ZW50cygpO1xuXG5cbiAgICAvLyBMSVNURU4gRk9SIENPTk5FQ1RJT04gUkVTUE9OU0VTXG4gICAgdGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLypqc2hpbnQgbWF4Y29tcGxleGl0eTogNiAqL1xuICAgICAgICB2YXIgZGF0YSA9ICh0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJykgPyBlLmRhdGEgOiAnJztcblxuICAgICAgICBfdGhpcy5fcGFyc2VSZXNwb25zZShkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCl7XG5cbiAgICAgICAgICAgIHZhciBpZCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgaWQgd2hpY2ggbWF0Y2hlcyB0aGUgcmV0dXJuZWQgaWRcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24obG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2xvYWQuaWRdKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBsb2FkLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZCA9IHJlc3VsdC5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm90aWZpY2F0aW9uXG4gICAgICAgICAgICBpZighaWQgJiYgcmVzdWx0ICYmIHJlc3VsdC5tZXRob2QgJiYgcmVzdWx0Lm1ldGhvZC5pbmRleE9mKCdfc3Vic2NyaXB0aW9uJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubm90aWZpY2F0aW9uQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICBpZihfLmlzRnVuY3Rpb24oY2FsbGJhY2spKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICB9IGVsc2UgaWYoX3RoaXMucmVzcG9uc2VDYWxsYmFja3NbaWRdKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzcG9uc2VDYWxsYmFja3NbaWRdKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIG1ha2UgcHJvcGVydHkgYGNvbm5lY3RlZGAgd2hpY2ggd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgY29ubmVjdGlvbiBzdGF0dXNcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Nvbm5lY3RlZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uICYmIHRoaXMuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSB0aGlzLmNvbm5lY3Rpb24uT1BFTjtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9KTtcbn07XG5cbi8qKlxuIFdpbGwgYWRkIHRoZSBlcnJvciBhbmQgZW5kIGV2ZW50IHRvIHRpbWVvdXQgZXhpc3RpbmcgY2FsbHNcblxuIEBtZXRob2QgYWRkRGVmYXVsdEV2ZW50c1xuICovXG5XZWJzb2NrZXRQcm92aWRlci5wcm90b3R5cGUuYWRkRGVmYXVsdEV2ZW50cyA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuX3RpbWVvdXQoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICBfdGhpcy5fdGltZW91dCgpO1xuXG4gICAgICAgIC8vIHJlc2V0IGFsbCByZXF1ZXN0cyBhbmQgY2FsbGJhY2tzXG4gICAgICAgIF90aGlzLnJlc2V0KCk7XG4gICAgfTtcblxuICAgIC8vIHRoaXMuY29ubmVjdGlvbi5vbigndGltZW91dCcsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIF90aGlzLl90aW1lb3V0KCk7XG4gICAgLy8gfSk7XG59O1xuXG4vKipcbiBXaWxsIHBhcnNlIHRoZSByZXNwb25zZSBhbmQgbWFrZSBhbiBhcnJheSBvdXQgb2YgaXQuXG5cbiBAbWV0aG9kIF9wYXJzZVJlc3BvbnNlXG4gQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAqL1xuV2Vic29ja2V0UHJvdmlkZXIucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIHJldHVyblZhbHVlcyA9IFtdO1xuXG4gICAgLy8gREUtQ0hVTktFUlxuICAgIHZhciBkZWNodW5rZWREYXRhID0gZGF0YVxuICAgICAgICAucmVwbGFjZSgvXFx9W1xcblxccl0/XFx7L2csJ318LS18eycpIC8vIH17XG4gICAgICAgIC5yZXBsYWNlKC9cXH1cXF1bXFxuXFxyXT9cXFtcXHsvZywnfV18LS18W3snKSAvLyB9XVt7XG4gICAgICAgIC5yZXBsYWNlKC9cXH1bXFxuXFxyXT9cXFtcXHsvZywnfXwtLXxbeycpIC8vIH1be1xuICAgICAgICAucmVwbGFjZSgvXFx9XFxdW1xcblxccl0/XFx7L2csJ31dfC0tfHsnKSAvLyB9XXtcbiAgICAgICAgLnNwbGl0KCd8LS18Jyk7XG5cbiAgICBkZWNodW5rZWREYXRhLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG5cbiAgICAgICAgLy8gcHJlcGVuZCB0aGUgbGFzdCBjaHVua1xuICAgICAgICBpZihfdGhpcy5sYXN0Q2h1bmspXG4gICAgICAgICAgICBkYXRhID0gX3RoaXMubGFzdENodW5rICsgZGF0YTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgICAgICB9IGNhdGNoKGUpIHtcblxuICAgICAgICAgICAgX3RoaXMubGFzdENodW5rID0gZGF0YTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGltZW91dCB0byBjYW5jZWwgYWxsIHJlcXVlc3RzXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMubGFzdENodW5rVGltZW91dCk7XG4gICAgICAgICAgICBfdGhpcy5sYXN0Q2h1bmtUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF90aGlzLl90aW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JzLkludmFsaWRSZXNwb25zZShkYXRhKTtcbiAgICAgICAgICAgIH0sIDEwMDAgKiAxNSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbmNlbCB0aW1lb3V0IGFuZCBzZXQgY2h1bmsgdG8gbnVsbFxuICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMubGFzdENodW5rVGltZW91dCk7XG4gICAgICAgIF90aGlzLmxhc3RDaHVuayA9IG51bGw7XG5cbiAgICAgICAgaWYocmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuVmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXR1cm5WYWx1ZXM7XG59O1xuXG5cbi8qKlxuIEFkZHMgYSBjYWxsYmFjayB0byB0aGUgcmVzcG9uc2VDYWxsYmFja3Mgb2JqZWN0LFxuIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGlmIGEgcmVzcG9uc2UgbWF0Y2hpbmcgdGhlIHJlc3BvbnNlIElkIHdpbGwgYXJyaXZlLlxuXG4gQG1ldGhvZCBfYWRkUmVzcG9uc2VDYWxsYmFja1xuICovXG5XZWJzb2NrZXRQcm92aWRlci5wcm90b3R5cGUuX2FkZFJlc3BvbnNlQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXlsb2FkLCBjYWxsYmFjaykge1xuICAgIHZhciBpZCA9IHBheWxvYWQuaWQgfHwgcGF5bG9hZFswXS5pZDtcbiAgICB2YXIgbWV0aG9kID0gcGF5bG9hZC5tZXRob2QgfHwgcGF5bG9hZFswXS5tZXRob2Q7XG5cbiAgICB0aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xuICAgIHRoaXMucmVzcG9uc2VDYWxsYmFja3NbaWRdLm1ldGhvZCA9IG1ldGhvZDtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBzY2hlZHVsZSB0cmlnZ2VyaW5nIHRoZSBlcnJvciByZXNwb25zZSBpZiBhIGN1c3RvbSB0aW1lb3V0IGlzIHNldFxuICAgIGlmICh0aGlzLl9jdXN0b21UaW1lb3V0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXShlcnJvcnMuQ29ubmVjdGlvblRpbWVvdXQoX3RoaXMuX2N1c3RvbVRpbWVvdXQpKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMucmVzcG9uc2VDYWxsYmFja3NbaWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9jdXN0b21UaW1lb3V0KTtcbiAgICB9XG59O1xuXG4vKipcbiBUaW1lb3V0IGFsbCByZXF1ZXN0cyB3aGVuIHRoZSBlbmQvZXJyb3IgZXZlbnQgaXMgZmlyZWRcblxuIEBtZXRob2QgX3RpbWVvdXRcbiAqL1xuV2Vic29ja2V0UHJvdmlkZXIucHJvdG90eXBlLl90aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yKHZhciBrZXkgaW4gdGhpcy5yZXNwb25zZUNhbGxiYWNrcykge1xuICAgICAgICBpZih0aGlzLnJlc3BvbnNlQ2FsbGJhY2tzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZUNhbGxiYWNrc1trZXldKGVycm9ycy5JbnZhbGlkQ29ubmVjdGlvbignb24gV1MnKSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yZXNwb25zZUNhbGxiYWNrc1trZXldO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5XZWJzb2NrZXRQcm92aWRlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChwYXlsb2FkLCBjYWxsYmFjaykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IHRoaXMuY29ubmVjdGlvbi5DT05ORUNUSU5HKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuc2VuZChwYXlsb2FkLCBjYWxsYmFjayk7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRyeSByZWNvbm5lY3QsIHdoZW4gY29ubmVjdGlvbiBpcyBnb25lXG4gICAgLy8gaWYoIXRoaXMuY29ubmVjdGlvbi53cml0YWJsZSlcbiAgICAvLyAgICAgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Qoe3VybDogdGhpcy51cmx9KTtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uLnJlYWR5U3RhdGUgIT09IHRoaXMuY29ubmVjdGlvbi5PUEVOKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Nvbm5lY3Rpb24gbm90IG9wZW4gb24gc2VuZCgpJyk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25uZWN0aW9uLm9uZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yKG5ldyBFcnJvcignY29ubmVjdGlvbiBub3Qgb3BlbicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ25vIGVycm9yIGNhbGxiYWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdjb25uZWN0aW9uIG5vdCBvcGVuJykpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgIHRoaXMuX2FkZFJlc3BvbnNlQ2FsbGJhY2socGF5bG9hZCwgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gU3Vic2NyaWJlcyB0byBwcm92aWRlciBldmVudHMucHJvdmlkZXJcblxuIEBtZXRob2Qgb25cbiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAnbm90aWZjYXRpb24nLCAnY29ubmVjdCcsICdlcnJvcicsICdlbmQnIG9yICdkYXRhJ1xuIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgdGhlIGNhbGxiYWNrIHRvIGNhbGxcbiAqL1xuV2Vic29ja2V0UHJvdmlkZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG5cbiAgICBpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHNlY29uZCBwYXJhbWV0ZXIgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuXG4gICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25vcGVuID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBkZWZhdWx0OlxuICAgICAgICAvLyAgICAgdGhpcy5jb25uZWN0aW9uLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbi8vIFRPRE8gYWRkIG9uY2VcblxuLyoqXG4gUmVtb3ZlcyBldmVudCBsaXN0ZW5lclxuXG4gQG1ldGhvZCByZW1vdmVMaXN0ZW5lclxuIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICdub3RpZmNhdGlvbicsICdjb25uZWN0JywgJ2Vycm9yJywgJ2VuZCcgb3IgJ2RhdGEnXG4gQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICB0aGUgY2FsbGJhY2sgdG8gY2FsbFxuICovXG5XZWJzb2NrZXRQcm92aWRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oY2IsIGluZGV4KXtcbiAgICAgICAgICAgICAgICBpZihjYiA9PT0gY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBUT0RPIHJlbXZvdmluZyBjb25uZWN0IG1pc3NpbmdcblxuICAgICAgICAvLyBkZWZhdWx0OlxuICAgICAgICAvLyAgICAgdGhpcy5jb25uZWN0aW9uLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbi8qKlxuIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVyc1xuXG4gQG1ldGhvZCByZW1vdmVBbGxMaXN0ZW5lcnNcbiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAnbm90aWZjYXRpb24nLCAnY29ubmVjdCcsICdlcnJvcicsICdlbmQnIG9yICdkYXRhJ1xuICovXG5XZWJzb2NrZXRQcm92aWRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25DYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIFRPRE8gcmVtdm92aW5nIGNvbm5lY3QgcHJvcGVybHkgbWlzc2luZ1xuXG4gICAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ub3BlbiA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBudWxsO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIHRoaXMuY29ubmVjdGlvbi5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcbiBSZXNldHMgdGhlIHByb3ZpZGVycywgY2xlYXJzIGFsbCBjYWxsYmFja3NcblxuIEBtZXRob2QgcmVzZXRcbiAqL1xuV2Vic29ja2V0UHJvdmlkZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3RpbWVvdXQoKTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IFtdO1xuXG4gICAgLy8gdGhpcy5jb25uZWN0aW9uLnJlbW92ZUFsbExpc3RlbmVycygnZXJyb3InKTtcbiAgICAvLyB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlQWxsTGlzdGVuZXJzKCdlbmQnKTtcbiAgICAvLyB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlQWxsTGlzdGVuZXJzKCd0aW1lb3V0Jyk7XG5cbiAgICB0aGlzLmFkZERlZmF1bHRFdmVudHMoKTtcbn07XG5cbldlYnNvY2tldFByb3ZpZGVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNvbm5lY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJzb2NrZXRQcm92aWRlcjtcbiIsIi8qXG4gKiBFbXVsYXRlICdldGhfYWNjb3VudHMnIC8gJ2V0aF9zZW5kVHJhbnNhY3Rpb24nIHVzaW5nICdldGhfc2VuZFJhd1RyYW5zYWN0aW9uJ1xuICpcbiAqIFRoZSB0d28gY2FsbGJhY2tzIGEgdXNlciBuZWVkcyB0byBpbXBsZW1lbnQgYXJlOlxuICogLSBnZXRBY2NvdW50cygpIC0tIGFycmF5IG9mIGFkZHJlc3NlcyBzdXBwb3J0ZWRcbiAqIC0gc2lnblRyYW5zYWN0aW9uKHR4KSAtLSBzaWduIGEgcmF3IHRyYW5zYWN0aW9uIG9iamVjdFxuICovXG5cbmNvbnN0IHdhdGVyZmFsbCA9IHJlcXVpcmUoJ2FzeW5jL3dhdGVyZmFsbCcpXG5jb25zdCBwYXJhbGxlbCA9IHJlcXVpcmUoJ2FzeW5jL3BhcmFsbGVsJylcbmNvbnN0IGluaGVyaXRzID0gcmVxdWlyZSgndXRpbCcpLmluaGVyaXRzXG5jb25zdCBldGhVdGlsID0gcmVxdWlyZSgnZXRoZXJldW1qcy11dGlsJylcbmNvbnN0IHNpZ1V0aWwgPSByZXF1aXJlKCdldGgtc2lnLXV0aWwnKVxuY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuY29uc3QgU2VtYXBob3JlID0gcmVxdWlyZSgnc2VtYXBob3JlJylcbmNvbnN0IFN1YnByb3ZpZGVyID0gcmVxdWlyZSgnLi9zdWJwcm92aWRlci5qcycpXG5jb25zdCBlc3RpbWF0ZUdhcyA9IHJlcXVpcmUoJy4uL3V0aWwvZXN0aW1hdGUtZ2FzLmpzJylcbmNvbnN0IGhleFJlZ2V4ID0gL15bMC05QS1GYS1mXSskL2dcblxubW9kdWxlLmV4cG9ydHMgPSBIb29rZWRXYWxsZXRTdWJwcm92aWRlclxuXG4vLyBoYW5kbGVzIHRoZSBmb2xsb3dpbmcgUlBDIG1ldGhvZHM6XG4vLyAgIGV0aF9jb2luYmFzZVxuLy8gICBldGhfYWNjb3VudHNcbi8vICAgZXRoX3NlbmRUcmFuc2FjdGlvblxuLy8gICBldGhfc2lnblxuLy8gICBldGhfc2lnblR5cGVkRGF0YVxuLy8gICBwZXJzb25hbF9zaWduXG4vLyAgIHBlcnNvbmFsX2VjUmVjb3ZlclxuLy8gICBwYXJpdHlfcG9zdFRyYW5zYWN0aW9uXG4vLyAgIHBhcml0eV9jaGVja1JlcXVlc3Rcbi8vICAgcGFyaXR5X2RlZmF1bHRBY2NvdW50XG5cbi8vXG4vLyBUeCBTaWduYXR1cmUgRmxvd1xuLy9cbi8vIGhhbmRsZVJlcXVlc3Q6IGV0aF9zZW5kVHJhbnNhY3Rpb25cbi8vICAgdmFsaWRhdGVUcmFuc2FjdGlvbiAoYmFzaWMgdmFsaWRpdHkgY2hlY2spXG4vLyAgICAgdmFsaWRhdGVTZW5kZXIgKGNoZWNrcyB0aGF0IHNlbmRlciBpcyBpbiBhY2NvdW50cylcbi8vICAgcHJvY2Vzc1RyYW5zYWN0aW9uIChzaWduIHR4IGFuZCBzdWJtaXQgdG8gbmV0d29yaylcbi8vICAgICBhcHByb3ZlVHJhbnNhY3Rpb24gKFVJIGFwcHJvdmFsIGhvb2spXG4vLyAgICAgY2hlY2tBcHByb3ZhbFxuLy8gICAgIGZpbmFsaXplQW5kU3VibWl0VHggKHR4IHNpZ25pbmcpXG4vLyAgICAgICBub25jZUxvY2sudGFrZSAoYm90dGxlIG5lY2sgdG8gZW5zdXJlIGF0b21pYyBub25jZSlcbi8vICAgICAgICAgZmlsbEluVHhFeHRyYXMgKHNldCBmYWxsYmFjayBnYXNQcmljZSwgbm9uY2UsIGV0Yylcbi8vICAgICAgICAgc2lnblRyYW5zYWN0aW9uIChwZXJmb3JtIHRoZSBzaWduYXR1cmUpXG4vLyAgICAgICAgIHB1Ymxpc2hUcmFuc2FjdGlvbiAocHVibGlzaCBzaWduZWQgdHggdG8gbmV0d29yaylcbi8vXG5cblxuaW5oZXJpdHMoSG9va2VkV2FsbGV0U3VicHJvdmlkZXIsIFN1YnByb3ZpZGVyKVxuXG5mdW5jdGlvbiBIb29rZWRXYWxsZXRTdWJwcm92aWRlcihvcHRzKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgLy8gY29udHJvbCBmbG93XG4gIHNlbGYubm9uY2VMb2NrID0gU2VtYXBob3JlKDEpXG5cbiAgLy8gZGF0YSBsb29rdXBcbiAgaWYgKG9wdHMuZ2V0QWNjb3VudHMpIHNlbGYuZ2V0QWNjb3VudHMgPSBvcHRzLmdldEFjY291bnRzXG4gIC8vIGhpZ2ggbGV2ZWwgb3ZlcnJpZGVcbiAgaWYgKG9wdHMucHJvY2Vzc1RyYW5zYWN0aW9uKSBzZWxmLnByb2Nlc3NUcmFuc2FjdGlvbiA9IG9wdHMucHJvY2Vzc1RyYW5zYWN0aW9uXG4gIGlmIChvcHRzLnByb2Nlc3NTaWduVHJhbnNhY3Rpb24pIHNlbGYucHJvY2Vzc1NpZ25UcmFuc2FjdGlvbiA9IG9wdHMucHJvY2Vzc1NpZ25UcmFuc2FjdGlvblxuICBpZiAob3B0cy5wcm9jZXNzTWVzc2FnZSkgc2VsZi5wcm9jZXNzTWVzc2FnZSA9IG9wdHMucHJvY2Vzc01lc3NhZ2VcbiAgaWYgKG9wdHMucHJvY2Vzc1BlcnNvbmFsTWVzc2FnZSkgc2VsZi5wcm9jZXNzUGVyc29uYWxNZXNzYWdlID0gb3B0cy5wcm9jZXNzUGVyc29uYWxNZXNzYWdlXG4gIGlmIChvcHRzLnByb2Nlc3NUeXBlZE1lc3NhZ2UpIHNlbGYucHJvY2Vzc1R5cGVkTWVzc2FnZSA9IG9wdHMucHJvY2Vzc1R5cGVkTWVzc2FnZVxuICAvLyBhcHByb3ZhbCBob29rc1xuICBzZWxmLmFwcHJvdmVUcmFuc2FjdGlvbiA9IG9wdHMuYXBwcm92ZVRyYW5zYWN0aW9uIHx8IHNlbGYuYXV0b0FwcHJvdmVcbiAgc2VsZi5hcHByb3ZlTWVzc2FnZSA9IG9wdHMuYXBwcm92ZU1lc3NhZ2UgfHwgc2VsZi5hdXRvQXBwcm92ZVxuICBzZWxmLmFwcHJvdmVQZXJzb25hbE1lc3NhZ2UgPSBvcHRzLmFwcHJvdmVQZXJzb25hbE1lc3NhZ2UgfHwgc2VsZi5hdXRvQXBwcm92ZVxuICBzZWxmLmFwcHJvdmVUeXBlZE1lc3NhZ2UgPSBvcHRzLmFwcHJvdmVUeXBlZE1lc3NhZ2UgfHwgc2VsZi5hdXRvQXBwcm92ZVxuICAvLyBhY3R1YWxseSBwZXJmb3JtIHRoZSBzaWduYXR1cmVcbiAgc2VsZi5zaWduVHJhbnNhY3Rpb24gPSBvcHRzLnNpZ25UcmFuc2FjdGlvbiAgfHwgbXVzdFByb3ZpZGVJbkNvbnN0cnVjdG9yKCdzaWduVHJhbnNhY3Rpb24nKVxuICBzZWxmLnNpZ25NZXNzYWdlID0gb3B0cy5zaWduTWVzc2FnZSAgfHwgbXVzdFByb3ZpZGVJbkNvbnN0cnVjdG9yKCdzaWduTWVzc2FnZScpXG4gIHNlbGYuc2lnblBlcnNvbmFsTWVzc2FnZSA9IG9wdHMuc2lnblBlcnNvbmFsTWVzc2FnZSAgfHwgbXVzdFByb3ZpZGVJbkNvbnN0cnVjdG9yKCdzaWduUGVyc29uYWxNZXNzYWdlJylcbiAgc2VsZi5zaWduVHlwZWRNZXNzYWdlID0gb3B0cy5zaWduVHlwZWRNZXNzYWdlICB8fCBtdXN0UHJvdmlkZUluQ29uc3RydWN0b3IoJ3NpZ25UeXBlZE1lc3NhZ2UnKVxuICBpZiAob3B0cy5yZWNvdmVyUGVyc29uYWxTaWduYXR1cmUpIHNlbGYucmVjb3ZlclBlcnNvbmFsU2lnbmF0dXJlID0gb3B0cy5yZWNvdmVyUGVyc29uYWxTaWduYXR1cmVcbiAgLy8gcHVibGlzaCB0byBuZXR3b3JrXG4gIGlmIChvcHRzLnB1Ymxpc2hUcmFuc2FjdGlvbikgc2VsZi5wdWJsaXNoVHJhbnNhY3Rpb24gPSBvcHRzLnB1Ymxpc2hUcmFuc2FjdGlvblxuICAvLyBnYXMgb3B0aW9uc1xuICBzZWxmLmVzdGltYXRlR2FzID0gb3B0cy5lc3RpbWF0ZUdhcyB8fCBzZWxmLmVzdGltYXRlR2FzXG4gIHNlbGYuZ2V0R2FzUHJpY2UgPSBvcHRzLmdldEdhc1ByaWNlIHx8IHNlbGYuZ2V0R2FzUHJpY2Vcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLmhhbmRsZVJlcXVlc3QgPSBmdW5jdGlvbihwYXlsb2FkLCBuZXh0LCBlbmQpe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBzZWxmLl9wYXJpdHlSZXF1ZXN0cyA9IHt9XG4gIHNlbGYuX3Bhcml0eVJlcXVlc3RDb3VudCA9IDBcblxuICAvLyBzd2l0Y2ggc3RhdGVtZW50IGlzIG5vdCBibG9jayBzY29wZWRcbiAgLy8gc3Agd2UgY2FudCByZXBlYXQgdmFyIGRlY2xhcmF0aW9uc1xuICBsZXQgdHhQYXJhbXMsIG1zZ1BhcmFtcywgZXh0cmFQYXJhbXNcbiAgbGV0IG1lc3NhZ2UsIGFkZHJlc3NcblxuICBzd2l0Y2gocGF5bG9hZC5tZXRob2QpIHtcblxuICAgIGNhc2UgJ2V0aF9jb2luYmFzZSc6XG4gICAgICAvLyBwcm9jZXNzIG5vcm1hbGx5XG4gICAgICBzZWxmLmdldEFjY291bnRzKGZ1bmN0aW9uKGVyciwgYWNjb3VudHMpe1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZW5kKGVycilcbiAgICAgICAgbGV0IHJlc3VsdCA9IGFjY291bnRzWzBdIHx8IG51bGxcbiAgICAgICAgZW5kKG51bGwsIHJlc3VsdClcbiAgICAgIH0pXG4gICAgICByZXR1cm5cblxuICAgIGNhc2UgJ2V0aF9hY2NvdW50cyc6XG4gICAgICAvLyBwcm9jZXNzIG5vcm1hbGx5XG4gICAgICBzZWxmLmdldEFjY291bnRzKGZ1bmN0aW9uKGVyciwgYWNjb3VudHMpe1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZW5kKGVycilcbiAgICAgICAgZW5kKG51bGwsIGFjY291bnRzKVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuXG4gICAgY2FzZSAnZXRoX3NlbmRUcmFuc2FjdGlvbic6XG4gICAgICB0eFBhcmFtcyA9IHBheWxvYWQucGFyYW1zWzBdXG4gICAgICB3YXRlcmZhbGwoW1xuICAgICAgICAoY2IpID0+IHNlbGYudmFsaWRhdGVUcmFuc2FjdGlvbih0eFBhcmFtcywgY2IpLFxuICAgICAgICAoY2IpID0+IHNlbGYucHJvY2Vzc1RyYW5zYWN0aW9uKHR4UGFyYW1zLCBjYiksXG4gICAgICBdLCBlbmQpXG4gICAgICByZXR1cm5cblxuICAgIGNhc2UgJ2V0aF9zaWduVHJhbnNhY3Rpb24nOlxuICAgICAgdHhQYXJhbXMgPSBwYXlsb2FkLnBhcmFtc1swXVxuICAgICAgd2F0ZXJmYWxsKFtcbiAgICAgICAgKGNiKSA9PiBzZWxmLnZhbGlkYXRlVHJhbnNhY3Rpb24odHhQYXJhbXMsIGNiKSxcbiAgICAgICAgKGNiKSA9PiBzZWxmLnByb2Nlc3NTaWduVHJhbnNhY3Rpb24odHhQYXJhbXMsIGNiKSxcbiAgICAgIF0sIGVuZClcbiAgICAgIHJldHVyblxuXG4gICAgY2FzZSAnZXRoX3NpZ24nOlxuICAgICAgLy8gcHJvY2VzcyBub3JtYWxseVxuICAgICAgYWRkcmVzcyA9IHBheWxvYWQucGFyYW1zWzBdXG4gICAgICBtZXNzYWdlID0gcGF5bG9hZC5wYXJhbXNbMV1cbiAgICAgIC8vIG5vbi1zdGFuZGFyZCBcImV4dHJhUGFyYW1zXCIgdG8gYmUgYXBwZW5kZWQgdG8gb3VyIFwibXNnUGFyYW1zXCIgb2JqXG4gICAgICAvLyBnb29kIHBsYWNlIGZvciBtZXRhZGF0YVxuICAgICAgZXh0cmFQYXJhbXMgPSBwYXlsb2FkLnBhcmFtc1syXSB8fCB7fVxuICAgICAgbXNnUGFyYW1zID0gZXh0ZW5kKGV4dHJhUGFyYW1zLCB7XG4gICAgICAgIGZyb206IGFkZHJlc3MsXG4gICAgICAgIGRhdGE6IG1lc3NhZ2UsXG4gICAgICB9KVxuICAgICAgd2F0ZXJmYWxsKFtcbiAgICAgICAgKGNiKSA9PiBzZWxmLnZhbGlkYXRlTWVzc2FnZShtc2dQYXJhbXMsIGNiKSxcbiAgICAgICAgKGNiKSA9PiBzZWxmLnByb2Nlc3NNZXNzYWdlKG1zZ1BhcmFtcywgY2IpLFxuICAgICAgXSwgZW5kKVxuICAgICAgcmV0dXJuXG5cbiAgICBjYXNlICdwZXJzb25hbF9zaWduJzpcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gcHJvY2VzcyBub3JtYWxseVxuICAgICAgICBjb25zdCBmaXJzdCA9IHBheWxvYWQucGFyYW1zWzBdXG4gICAgICAgIGNvbnN0IHNlY29uZCA9IHBheWxvYWQucGFyYW1zWzFdXG5cbiAgICAgICAgLy8gV2UgaW5pdGlhbGx5IGluY29ycmVjdGx5IG9yZGVyZWQgdGhlc2UgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gVG8gZ3JhY2VmdWxseSByZXNwZWN0IHVzZXJzIHdobyBhZG9wdGVkIHRoaXMgQVBJIGVhcmx5LFxuICAgICAgICAvLyB3ZSBhcmUgY3VycmVudGx5IGdyYWNlZnVsbHkgcmVjb3ZlcmluZyBmcm9tIHRoZSB3cm9uZyBwYXJhbSBvcmRlclxuICAgICAgICAvLyB3aGVuIGl0IGlzIGNsZWFybHkgaWRlbnRpZmlhYmxlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGF0IG1lYW5zIHdoZW4gdGhlIGZpcnN0IHBhcmFtIGlzIGRlZmluaXRlbHkgYW4gYWRkcmVzcyxcbiAgICAgICAgLy8gYW5kIHRoZSBzZWNvbmQgcGFyYW0gaXMgZGVmaW5pdGVseSBub3QsIGJ1dCBpcyBoZXguXG4gICAgICAgIGlmIChyZXNlbWJsZXNEYXRhKHNlY29uZCkgJiYgcmVzZW1ibGVzQWRkcmVzcyhmaXJzdCkpIHtcbiAgICAgICAgICBsZXQgd2FybmluZyA9IGBUaGUgZXRoX3BlcnNvbmFsU2lnbiBtZXRob2QgcmVxdWlyZXMgcGFyYW1zIG9yZGVyZWQgYFxuICAgICAgICAgIHdhcm5pbmcgKz0gYFttZXNzYWdlLCBhZGRyZXNzXS4gVGhpcyB3YXMgcHJldmlvdXNseSBoYW5kbGVkIGluY29ycmVjdGx5LCBgXG4gICAgICAgICAgd2FybmluZyArPSBgYW5kIGhhcyBiZWVuIGNvcnJlY3RlZCBhdXRvbWF0aWNhbGx5LiBgXG4gICAgICAgICAgd2FybmluZyArPSBgUGxlYXNlIHN3aXRjaCB0aGlzIHBhcmFtIG9yZGVyIGZvciBzbW9vdGggYmVoYXZpb3IgaW4gdGhlIGZ1dHVyZS5gXG4gICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpXG5cbiAgICAgICAgICBhZGRyZXNzID0gcGF5bG9hZC5wYXJhbXNbMF1cbiAgICAgICAgICBtZXNzYWdlID0gcGF5bG9hZC5wYXJhbXNbMV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZXNzYWdlID0gcGF5bG9hZC5wYXJhbXNbMF1cbiAgICAgICAgICBhZGRyZXNzID0gcGF5bG9hZC5wYXJhbXNbMV1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vbi1zdGFuZGFyZCBcImV4dHJhUGFyYW1zXCIgdG8gYmUgYXBwZW5kZWQgdG8gb3VyIFwibXNnUGFyYW1zXCIgb2JqXG4gICAgICAgIC8vIGdvb2QgcGxhY2UgZm9yIG1ldGFkYXRhXG4gICAgICAgIGV4dHJhUGFyYW1zID0gcGF5bG9hZC5wYXJhbXNbMl0gfHwge31cbiAgICAgICAgbXNnUGFyYW1zID0gZXh0ZW5kKGV4dHJhUGFyYW1zLCB7XG4gICAgICAgICAgZnJvbTogYWRkcmVzcyxcbiAgICAgICAgICBkYXRhOiBtZXNzYWdlLFxuICAgICAgICB9KVxuICAgICAgICB3YXRlcmZhbGwoW1xuICAgICAgICAgIChjYikgPT4gc2VsZi52YWxpZGF0ZVBlcnNvbmFsTWVzc2FnZShtc2dQYXJhbXMsIGNiKSxcbiAgICAgICAgICAoY2IpID0+IHNlbGYucHJvY2Vzc1BlcnNvbmFsTWVzc2FnZShtc2dQYXJhbXMsIGNiKSxcbiAgICAgICAgXSwgZW5kKVxuICAgICAgfSkoKVxuXG4gICAgY2FzZSAncGVyc29uYWxfZWNSZWNvdmVyJzpcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKXsgICAgXG4gICAgICAgIG1lc3NhZ2UgPSBwYXlsb2FkLnBhcmFtc1swXVxuICAgICAgICBsZXQgc2lnbmF0dXJlID0gcGF5bG9hZC5wYXJhbXNbMV1cbiAgICAgICAgLy8gbm9uLXN0YW5kYXJkIFwiZXh0cmFQYXJhbXNcIiB0byBiZSBhcHBlbmRlZCB0byBvdXIgXCJtc2dQYXJhbXNcIiBvYmpcbiAgICAgICAgLy8gZ29vZCBwbGFjZSBmb3IgbWV0YWRhdGFcbiAgICAgICAgZXh0cmFQYXJhbXMgPSBwYXlsb2FkLnBhcmFtc1syXSB8fCB7fVxuICAgICAgICBtc2dQYXJhbXMgPSBleHRlbmQoZXh0cmFQYXJhbXMsIHtcbiAgICAgICAgICBzaWc6IHNpZ25hdHVyZSxcbiAgICAgICAgICBkYXRhOiBtZXNzYWdlLFxuICAgICAgICB9KVxuICAgICAgICBzZWxmLnJlY292ZXJQZXJzb25hbFNpZ25hdHVyZShtc2dQYXJhbXMsIGVuZClcbiAgICAgIH0pKClcblxuICAgIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhJzpcbiAgICAgIC8vIHByb2Nlc3Mgbm9ybWFsbHlcbiAgICAgIG1lc3NhZ2UgPSBwYXlsb2FkLnBhcmFtc1swXVxuICAgICAgYWRkcmVzcyA9IHBheWxvYWQucGFyYW1zWzFdXG4gICAgICBleHRyYVBhcmFtcyA9IHBheWxvYWQucGFyYW1zWzJdIHx8IHt9XG4gICAgICBtc2dQYXJhbXMgPSBleHRlbmQoZXh0cmFQYXJhbXMsIHtcbiAgICAgICAgZnJvbTogYWRkcmVzcyxcbiAgICAgICAgZGF0YTogbWVzc2FnZSxcbiAgICAgIH0pXG4gICAgICB3YXRlcmZhbGwoW1xuICAgICAgICAoY2IpID0+IHNlbGYudmFsaWRhdGVUeXBlZE1lc3NhZ2UobXNnUGFyYW1zLCBjYiksXG4gICAgICAgIChjYikgPT4gc2VsZi5wcm9jZXNzVHlwZWRNZXNzYWdlKG1zZ1BhcmFtcywgY2IpLFxuICAgICAgXSwgZW5kKVxuICAgICAgcmV0dXJuXG5cbiAgICBjYXNlICdwYXJpdHlfcG9zdFRyYW5zYWN0aW9uJzpcbiAgICAgIHR4UGFyYW1zID0gcGF5bG9hZC5wYXJhbXNbMF1cbiAgICAgIHNlbGYucGFyaXR5UG9zdFRyYW5zYWN0aW9uKHR4UGFyYW1zLCBlbmQpXG4gICAgICByZXR1cm5cblxuICAgIGNhc2UgJ3Bhcml0eV9wb3N0U2lnbic6XG4gICAgICBhZGRyZXNzID0gcGF5bG9hZC5wYXJhbXNbMF1cbiAgICAgIG1lc3NhZ2UgPSBwYXlsb2FkLnBhcmFtc1sxXVxuICAgICAgc2VsZi5wYXJpdHlQb3N0U2lnbihhZGRyZXNzLCBtZXNzYWdlLCBlbmQpXG4gICAgICByZXR1cm5cblxuICAgIGNhc2UgJ3Bhcml0eV9jaGVja1JlcXVlc3QnOlxuICAgICAgcmV0dXJuIChmdW5jdGlvbigpe1xuICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSBwYXlsb2FkLnBhcmFtc1swXVxuICAgICAgICBzZWxmLnBhcml0eUNoZWNrUmVxdWVzdChyZXF1ZXN0SWQsIGVuZClcbiAgICAgIH0pKClcblxuICAgIGNhc2UgJ3Bhcml0eV9kZWZhdWx0QWNjb3VudCc6XG4gICAgICBzZWxmLmdldEFjY291bnRzKGZ1bmN0aW9uKGVyciwgYWNjb3VudHMpe1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZW5kKGVycilcbiAgICAgICAgY29uc3QgYWNjb3VudCA9IGFjY291bnRzWzBdIHx8IG51bGxcbiAgICAgICAgZW5kKG51bGwsIGFjY291bnQpXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG5cbiAgICBkZWZhdWx0OlxuICAgICAgbmV4dCgpXG4gICAgICByZXR1cm5cblxuICB9XG59XG5cbi8vXG4vLyBkYXRhIGxvb2t1cFxuLy9cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLmdldEFjY291bnRzID0gZnVuY3Rpb24oY2IpIHtcbiAgY2IobnVsbCwgW10pXG59XG5cblxuLy9cbi8vIFwicHJvY2Vzc1wiIGhpZ2ggbGV2ZWwgZmxvd1xuLy9cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnByb2Nlc3NUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKHR4UGFyYW1zLCBjYikge1xuICBjb25zdCBzZWxmID0gdGhpc1xuICB3YXRlcmZhbGwoW1xuICAgIChjYikgPT4gc2VsZi5hcHByb3ZlVHJhbnNhY3Rpb24odHhQYXJhbXMsIGNiKSxcbiAgICAoZGlkQXBwcm92ZSwgY2IpID0+IHNlbGYuY2hlY2tBcHByb3ZhbCgndHJhbnNhY3Rpb24nLCBkaWRBcHByb3ZlLCBjYiksXG4gICAgKGNiKSA9PiBzZWxmLmZpbmFsaXplQW5kU3VibWl0VHgodHhQYXJhbXMsIGNiKSxcbiAgXSwgY2IpXG59XG5cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnByb2Nlc3NTaWduVHJhbnNhY3Rpb24gPSBmdW5jdGlvbih0eFBhcmFtcywgY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgd2F0ZXJmYWxsKFtcbiAgICAoY2IpID0+IHNlbGYuYXBwcm92ZVRyYW5zYWN0aW9uKHR4UGFyYW1zLCBjYiksXG4gICAgKGRpZEFwcHJvdmUsIGNiKSA9PiBzZWxmLmNoZWNrQXBwcm92YWwoJ3RyYW5zYWN0aW9uJywgZGlkQXBwcm92ZSwgY2IpLFxuICAgIChjYikgPT4gc2VsZi5maW5hbGl6ZVR4KHR4UGFyYW1zLCBjYiksXG4gIF0sIGNiKVxufVxuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUucHJvY2Vzc01lc3NhZ2UgPSBmdW5jdGlvbihtc2dQYXJhbXMsIGNiKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHdhdGVyZmFsbChbXG4gICAgKGNiKSA9PiBzZWxmLmFwcHJvdmVNZXNzYWdlKG1zZ1BhcmFtcywgY2IpLFxuICAgIChkaWRBcHByb3ZlLCBjYikgPT4gc2VsZi5jaGVja0FwcHJvdmFsKCdtZXNzYWdlJywgZGlkQXBwcm92ZSwgY2IpLFxuICAgIChjYikgPT4gc2VsZi5zaWduTWVzc2FnZShtc2dQYXJhbXMsIGNiKSxcbiAgXSwgY2IpXG59XG5cbkhvb2tlZFdhbGxldFN1YnByb3ZpZGVyLnByb3RvdHlwZS5wcm9jZXNzUGVyc29uYWxNZXNzYWdlID0gZnVuY3Rpb24obXNnUGFyYW1zLCBjYikge1xuICBjb25zdCBzZWxmID0gdGhpc1xuICB3YXRlcmZhbGwoW1xuICAgIChjYikgPT4gc2VsZi5hcHByb3ZlUGVyc29uYWxNZXNzYWdlKG1zZ1BhcmFtcywgY2IpLFxuICAgIChkaWRBcHByb3ZlLCBjYikgPT4gc2VsZi5jaGVja0FwcHJvdmFsKCdtZXNzYWdlJywgZGlkQXBwcm92ZSwgY2IpLFxuICAgIChjYikgPT4gc2VsZi5zaWduUGVyc29uYWxNZXNzYWdlKG1zZ1BhcmFtcywgY2IpLFxuICBdLCBjYilcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnByb2Nlc3NUeXBlZE1lc3NhZ2UgPSBmdW5jdGlvbihtc2dQYXJhbXMsIGNiKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHdhdGVyZmFsbChbXG4gICAgKGNiKSA9PiBzZWxmLmFwcHJvdmVUeXBlZE1lc3NhZ2UobXNnUGFyYW1zLCBjYiksXG4gICAgKGRpZEFwcHJvdmUsIGNiKSA9PiBzZWxmLmNoZWNrQXBwcm92YWwoJ21lc3NhZ2UnLCBkaWRBcHByb3ZlLCBjYiksXG4gICAgKGNiKSA9PiBzZWxmLnNpZ25UeXBlZE1lc3NhZ2UobXNnUGFyYW1zLCBjYiksXG4gIF0sIGNiKVxufVxuXG4vL1xuLy8gYXBwcm92YWxcbi8vXG5cbkhvb2tlZFdhbGxldFN1YnByb3ZpZGVyLnByb3RvdHlwZS5hdXRvQXBwcm92ZSA9IGZ1bmN0aW9uKHR4UGFyYW1zLCBjYikge1xuICBjYihudWxsLCB0cnVlKVxufVxuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUuY2hlY2tBcHByb3ZhbCA9IGZ1bmN0aW9uKHR5cGUsIGRpZEFwcHJvdmUsIGNiKSB7XG4gIGNiKCBkaWRBcHByb3ZlID8gbnVsbCA6IG5ldyBFcnJvcignVXNlciBkZW5pZWQgJyt0eXBlKycgc2lnbmF0dXJlLicpIClcbn1cblxuLy9cbi8vIHBhcml0eVxuLy9cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnBhcml0eVBvc3RUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKHR4UGFyYW1zLCBjYikge1xuICBjb25zdCBzZWxmID0gdGhpc1xuXG4gIC8vIGdldCBuZXh0IGlkXG4gIGNvbnN0IGNvdW50ID0gc2VsZi5fcGFyaXR5UmVxdWVzdENvdW50XG4gIGNvbnN0IHJlcUlkID0gYDB4JHtjb3VudC50b1N0cmluZygxNil9YFxuICBzZWxmLl9wYXJpdHlSZXF1ZXN0Q291bnQrK1xuXG4gIHNlbGYuZW1pdFBheWxvYWQoe1xuICAgIG1ldGhvZDogJ2V0aF9zZW5kVHJhbnNhY3Rpb24nLFxuICAgIHBhcmFtczogW3R4UGFyYW1zXSxcbiAgfSwgZnVuY3Rpb24oZXJyb3IsIHJlcyl7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBzZWxmLl9wYXJpdHlSZXF1ZXN0c1tyZXFJZF0gPSB7IGVycm9yIH1cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB0eEhhc2ggPSByZXMucmVzdWx0XG4gICAgc2VsZi5fcGFyaXR5UmVxdWVzdHNbcmVxSWRdID0gdHhIYXNoXG4gIH0pXG5cbiAgY2IobnVsbCwgcmVxSWQpXG59XG5cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnBhcml0eVBvc3RTaWduID0gZnVuY3Rpb24oYWRkcmVzcywgbWVzc2FnZSwgY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAvLyBnZXQgbmV4dCBpZFxuICBjb25zdCBjb3VudCA9IHNlbGYuX3Bhcml0eVJlcXVlc3RDb3VudFxuICBjb25zdCByZXFJZCA9IGAweCR7Y291bnQudG9TdHJpbmcoMTYpfWBcbiAgc2VsZi5fcGFyaXR5UmVxdWVzdENvdW50KytcblxuICBzZWxmLmVtaXRQYXlsb2FkKHtcbiAgICBtZXRob2Q6ICdldGhfc2lnbicsXG4gICAgcGFyYW1zOiBbYWRkcmVzcywgbWVzc2FnZV0sXG4gIH0sIGZ1bmN0aW9uKGVycm9yLCByZXMpe1xuICAgIGlmIChlcnJvcikge1xuICAgICAgc2VsZi5fcGFyaXR5UmVxdWVzdHNbcmVxSWRdID0geyBlcnJvciB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzLnJlc3VsdFxuICAgIHNlbGYuX3Bhcml0eVJlcXVlc3RzW3JlcUlkXSA9IHJlc3VsdFxuICB9KVxuXG4gIGNiKG51bGwsIHJlcUlkKVxufVxuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUucGFyaXR5Q2hlY2tSZXF1ZXN0ID0gZnVuY3Rpb24ocmVxSWQsIGNiKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGNvbnN0IHJlc3VsdCA9IHNlbGYuX3Bhcml0eVJlcXVlc3RzW3JlcUlkXSB8fCBudWxsXG4gIC8vIHR4IG5vdCBoYW5kbGVkIHlldFxuICBpZiAoIXJlc3VsdCkgcmV0dXJuIGNiKG51bGwsIG51bGwpXG4gIC8vIHR4IHdhcyByZWplY3RlZCAob3Igb3RoZXIgZXJyb3IpXG4gIGlmIChyZXN1bHQuZXJyb3IpIHJldHVybiBjYihyZXN1bHQuZXJyb3IpXG4gIC8vIHR4IHNlbnRcbiAgY2IobnVsbCwgcmVzdWx0KVxufVxuXG4vL1xuLy8gc2lnbmF0dXJlIGFuZCByZWNvdmVyeVxuLy9cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnJlY292ZXJQZXJzb25hbFNpZ25hdHVyZSA9IGZ1bmN0aW9uKG1zZ1BhcmFtcywgY2IpIHtcbiAgbGV0IHNlbmRlckhleFxuICB0cnkge1xuICAgIHNlbmRlckhleCA9IHNpZ1V0aWwucmVjb3ZlclBlcnNvbmFsU2lnbmF0dXJlKG1zZ1BhcmFtcylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGNiKGVycilcbiAgfVxuICBjYihudWxsLCBzZW5kZXJIZXgpXG59XG5cbi8vXG4vLyB2YWxpZGF0aW9uXG4vL1xuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUudmFsaWRhdGVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKHR4UGFyYW1zLCBjYil7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIC8vIHNob3J0Y3V0OiB1bmRlZmluZWQgc2VuZGVyIGlzIGludmFsaWRcbiAgaWYgKHR4UGFyYW1zLmZyb20gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5kZWZpbmVkIGFkZHJlc3MgLSBmcm9tIGFkZHJlc3MgcmVxdWlyZWQgdG8gc2lnbiB0cmFuc2FjdGlvbi5gKSlcbiAgc2VsZi52YWxpZGF0ZVNlbmRlcih0eFBhcmFtcy5mcm9tLCBmdW5jdGlvbihlcnIsIHNlbmRlcklzVmFsaWQpe1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKCFzZW5kZXJJc1ZhbGlkKSByZXR1cm4gY2IobmV3IEVycm9yKGBVbmtub3duIGFkZHJlc3MgLSB1bmFibGUgdG8gc2lnbiB0cmFuc2FjdGlvbiBmb3IgdGhpcyBhZGRyZXNzOiBcIiR7dHhQYXJhbXMuZnJvbX1cImApKVxuICAgIGNiKClcbiAgfSlcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnZhbGlkYXRlTWVzc2FnZSA9IGZ1bmN0aW9uKG1zZ1BhcmFtcywgY2Ipe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBpZiAobXNnUGFyYW1zLmZyb20gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5kZWZpbmVkIGFkZHJlc3MgLSBmcm9tIGFkZHJlc3MgcmVxdWlyZWQgdG8gc2lnbiBtZXNzYWdlLmApKVxuICBzZWxmLnZhbGlkYXRlU2VuZGVyKG1zZ1BhcmFtcy5mcm9tLCBmdW5jdGlvbihlcnIsIHNlbmRlcklzVmFsaWQpe1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKCFzZW5kZXJJc1ZhbGlkKSByZXR1cm4gY2IobmV3IEVycm9yKGBVbmtub3duIGFkZHJlc3MgLSB1bmFibGUgdG8gc2lnbiBtZXNzYWdlIGZvciB0aGlzIGFkZHJlc3M6IFwiJHttc2dQYXJhbXMuZnJvbX1cImApKVxuICAgIGNiKClcbiAgfSlcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLnZhbGlkYXRlUGVyc29uYWxNZXNzYWdlID0gZnVuY3Rpb24obXNnUGFyYW1zLCBjYil7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGlmIChtc2dQYXJhbXMuZnJvbSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gY2IobmV3IEVycm9yKGBVbmRlZmluZWQgYWRkcmVzcyAtIGZyb20gYWRkcmVzcyByZXF1aXJlZCB0byBzaWduIHBlcnNvbmFsIG1lc3NhZ2UuYCkpXG4gIGlmIChtc2dQYXJhbXMuZGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gY2IobmV3IEVycm9yKGBVbmRlZmluZWQgbWVzc2FnZSAtIG1lc3NhZ2UgcmVxdWlyZWQgdG8gc2lnbiBwZXJzb25hbCBtZXNzYWdlLmApKVxuICBpZiAoIWlzVmFsaWRIZXgobXNnUGFyYW1zLmRhdGEpKSByZXR1cm4gY2IobmV3IEVycm9yKGBIb29rZWRXYWxsZXRTdWJwcm92aWRlciAtIHZhbGlkYXRlTWVzc2FnZSAtIG1lc3NhZ2Ugd2FzIG5vdCBlbmNvZGVkIGFzIGhleC5gKSlcbiAgc2VsZi52YWxpZGF0ZVNlbmRlcihtc2dQYXJhbXMuZnJvbSwgZnVuY3Rpb24oZXJyLCBzZW5kZXJJc1ZhbGlkKXtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGlmICghc2VuZGVySXNWYWxpZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5rbm93biBhZGRyZXNzIC0gdW5hYmxlIHRvIHNpZ24gbWVzc2FnZSBmb3IgdGhpcyBhZGRyZXNzOiBcIiR7bXNnUGFyYW1zLmZyb219XCJgKSlcbiAgICBjYigpXG4gIH0pXG59XG5cbkhvb2tlZFdhbGxldFN1YnByb3ZpZGVyLnByb3RvdHlwZS52YWxpZGF0ZVR5cGVkTWVzc2FnZSA9IGZ1bmN0aW9uKG1zZ1BhcmFtcywgY2Ipe1xuICBpZiAobXNnUGFyYW1zLmZyb20gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5kZWZpbmVkIGFkZHJlc3MgLSBmcm9tIGFkZHJlc3MgcmVxdWlyZWQgdG8gc2lnbiB0eXBlZCBkYXRhLmApKVxuICBpZiAobXNnUGFyYW1zLmRhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5kZWZpbmVkIGRhdGEgLSBtZXNzYWdlIHJlcXVpcmVkIHRvIHNpZ24gdHlwZWQgZGF0YS5gKSlcbiAgdGhpcy52YWxpZGF0ZVNlbmRlcihtc2dQYXJhbXMuZnJvbSwgZnVuY3Rpb24oZXJyLCBzZW5kZXJJc1ZhbGlkKXtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGlmICghc2VuZGVySXNWYWxpZCkgcmV0dXJuIGNiKG5ldyBFcnJvcihgVW5rbm93biBhZGRyZXNzIC0gdW5hYmxlIHRvIHNpZ24gbWVzc2FnZSBmb3IgdGhpcyBhZGRyZXNzOiBcIiR7bXNnUGFyYW1zLmZyb219XCJgKSlcbiAgICBjYigpXG4gIH0pXG59XG5cbkhvb2tlZFdhbGxldFN1YnByb3ZpZGVyLnByb3RvdHlwZS52YWxpZGF0ZVNlbmRlciA9IGZ1bmN0aW9uKHNlbmRlckFkZHJlc3MsIGNiKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgLy8gc2hvcnRjdXQ6IHVuZGVmaW5lZCBzZW5kZXIgaXMgaW52YWxpZFxuICBpZiAoIXNlbmRlckFkZHJlc3MpIHJldHVybiBjYihudWxsLCBmYWxzZSlcbiAgc2VsZi5nZXRBY2NvdW50cyhmdW5jdGlvbihlcnIsIGFjY291bnRzKXtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvbnN0IHNlbmRlcklzVmFsaWQgPSAoYWNjb3VudHMubWFwKHRvTG93ZXJDYXNlKS5pbmRleE9mKHNlbmRlckFkZHJlc3MudG9Mb3dlckNhc2UoKSkgIT09IC0xKVxuICAgIGNiKG51bGwsIHNlbmRlcklzVmFsaWQpXG4gIH0pXG59XG5cbi8vXG4vLyB0eCBoZWxwZXJzXG4vL1xuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUuZmluYWxpemVBbmRTdWJtaXRUeCA9IGZ1bmN0aW9uKHR4UGFyYW1zLCBjYikge1xuICBjb25zdCBzZWxmID0gdGhpc1xuICAvLyBjYW4gb25seSBhbGxvdyBvbmUgdHggdG8gcGFzcyB0aHJvdWdoIHRoaXMgZmxvdyBhdCBhIHRpbWVcbiAgLy8gc28gd2UgY2FuIGF0b21pY2FsbHkgY29uc3VtZSBhIG5vbmNlXG4gIHNlbGYubm9uY2VMb2NrLnRha2UoZnVuY3Rpb24oKXtcbiAgICB3YXRlcmZhbGwoW1xuICAgICAgc2VsZi5maWxsSW5UeEV4dHJhcy5iaW5kKHNlbGYsIHR4UGFyYW1zKSxcbiAgICAgIHNlbGYuc2lnblRyYW5zYWN0aW9uLmJpbmQoc2VsZiksXG4gICAgICBzZWxmLnB1Ymxpc2hUcmFuc2FjdGlvbi5iaW5kKHNlbGYpLFxuICAgIF0sIGZ1bmN0aW9uKGVyciwgdHhIYXNoKXtcbiAgICAgIHNlbGYubm9uY2VMb2NrLmxlYXZlKClcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICBjYihudWxsLCB0eEhhc2gpXG4gICAgfSlcbiAgfSlcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLmZpbmFsaXplVHggPSBmdW5jdGlvbih0eFBhcmFtcywgY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgLy8gY2FuIG9ubHkgYWxsb3cgb25lIHR4IHRvIHBhc3MgdGhyb3VnaCB0aGlzIGZsb3cgYXQgYSB0aW1lXG4gIC8vIHNvIHdlIGNhbiBhdG9taWNhbGx5IGNvbnN1bWUgYSBub25jZVxuICBzZWxmLm5vbmNlTG9jay50YWtlKGZ1bmN0aW9uKCl7XG4gICAgd2F0ZXJmYWxsKFtcbiAgICAgIHNlbGYuZmlsbEluVHhFeHRyYXMuYmluZChzZWxmLCB0eFBhcmFtcyksXG4gICAgICBzZWxmLnNpZ25UcmFuc2FjdGlvbi5iaW5kKHNlbGYpLFxuICAgIF0sIGZ1bmN0aW9uKGVyciwgc2lnbmVkVHgpe1xuICAgICAgc2VsZi5ub25jZUxvY2subGVhdmUoKVxuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIGNiKG51bGwsIHtyYXc6IHNpZ25lZFR4LCB0eDogdHhQYXJhbXN9KVxuICAgIH0pXG4gIH0pXG59XG5cbkhvb2tlZFdhbGxldFN1YnByb3ZpZGVyLnByb3RvdHlwZS5wdWJsaXNoVHJhbnNhY3Rpb24gPSBmdW5jdGlvbihyYXdUeCwgY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5lbWl0UGF5bG9hZCh7XG4gICAgbWV0aG9kOiAnZXRoX3NlbmRSYXdUcmFuc2FjdGlvbicsXG4gICAgcGFyYW1zOiBbcmF3VHhdLFxuICB9LCBmdW5jdGlvbihlcnIsIHJlcyl7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBjYihudWxsLCByZXMucmVzdWx0KVxuICB9KVxufVxuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUuZXN0aW1hdGVHYXMgPSBmdW5jdGlvbih0eFBhcmFtcywgY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgZXN0aW1hdGVHYXMoc2VsZi5lbmdpbmUsIHR4UGFyYW1zLCBjYilcbn1cblxuSG9va2VkV2FsbGV0U3VicHJvdmlkZXIucHJvdG90eXBlLmdldEdhc1ByaWNlID0gZnVuY3Rpb24oY2IpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5lbWl0UGF5bG9hZCh7IG1ldGhvZDogJ2V0aF9nYXNQcmljZScsIHBhcmFtczogW10gfSwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBjYihudWxsLCByZXMucmVzdWx0KVxuICB9KVxufVxuXG5Ib29rZWRXYWxsZXRTdWJwcm92aWRlci5wcm90b3R5cGUuZmlsbEluVHhFeHRyYXMgPSBmdW5jdGlvbih0eFBhcmFtcywgY2Ipe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBjb25zdCBhZGRyZXNzID0gdHhQYXJhbXMuZnJvbVxuICAvLyBjb25zb2xlLmxvZygnZmlsbEluVHhFeHRyYXMgLSBhZGRyZXNzOicsIGFkZHJlc3MpXG5cbiAgY29uc3QgdGFza3MgPSB7fVxuXG4gIGlmICh0eFBhcmFtcy5nYXNQcmljZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJuZWVkIHRvIGdldCBnYXNwcmljZVwiKVxuICAgIHRhc2tzLmdhc1ByaWNlID0gc2VsZi5nZXRHYXNQcmljZS5iaW5kKHNlbGYpXG4gIH1cblxuICBpZiAodHhQYXJhbXMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibmVlZCB0byBnZXQgbm9uY2VcIilcbiAgICB0YXNrcy5ub25jZSA9IHNlbGYuZW1pdFBheWxvYWQuYmluZChzZWxmLCB7IG1ldGhvZDogJ2V0aF9nZXRUcmFuc2FjdGlvbkNvdW50JywgcGFyYW1zOiBbYWRkcmVzcywgJ3BlbmRpbmcnXSB9KVxuICB9XG5cbiAgaWYgKHR4UGFyYW1zLmdhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJuZWVkIHRvIGdldCBnYXNcIilcbiAgICB0YXNrcy5nYXMgPSBzZWxmLmVzdGltYXRlR2FzLmJpbmQoc2VsZiwgY2xvbmVUeFBhcmFtcyh0eFBhcmFtcykpXG4gIH1cblxuICBwYXJhbGxlbCh0YXNrcywgZnVuY3Rpb24oZXJyLCB0YXNrUmVzdWx0cykge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG5cbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIGlmICh0YXNrUmVzdWx0cy5nYXNQcmljZSkgcmVzdWx0Lmdhc1ByaWNlID0gdGFza1Jlc3VsdHMuZ2FzUHJpY2VcbiAgICBpZiAodGFza1Jlc3VsdHMubm9uY2UpIHJlc3VsdC5ub25jZSA9IHRhc2tSZXN1bHRzLm5vbmNlLnJlc3VsdFxuICAgIGlmICh0YXNrUmVzdWx0cy5nYXMpIHJlc3VsdC5nYXMgPSB0YXNrUmVzdWx0cy5nYXNcblxuICAgIGNiKG51bGwsIGV4dGVuZCh0eFBhcmFtcywgcmVzdWx0KSlcbiAgfSlcbn1cblxuLy8gdXRpbFxuXG4vLyB3ZSB1c2UgdGhpcyB0byBjbGVhbiBhbnkgY3VzdG9tIHBhcmFtcyBmcm9tIHRoZSB0eFBhcmFtc1xuZnVuY3Rpb24gY2xvbmVUeFBhcmFtcyh0eFBhcmFtcyl7XG4gIHJldHVybiB7XG4gICAgZnJvbTogdHhQYXJhbXMuZnJvbSxcbiAgICB0bzogdHhQYXJhbXMudG8sXG4gICAgdmFsdWU6IHR4UGFyYW1zLnZhbHVlLFxuICAgIGRhdGE6IHR4UGFyYW1zLmRhdGEsXG4gICAgZ2FzOiB0eFBhcmFtcy5nYXMsXG4gICAgZ2FzUHJpY2U6IHR4UGFyYW1zLmdhc1ByaWNlLFxuICAgIG5vbmNlOiB0eFBhcmFtcy5ub25jZSxcbiAgfVxufVxuXG5mdW5jdGlvbiB0b0xvd2VyQ2FzZShzdHJpbmcpe1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKClcbn1cblxuZnVuY3Rpb24gcmVzZW1ibGVzQWRkcmVzcyAoc3RyaW5nKSB7XG4gIGNvbnN0IGZpeGVkID0gZXRoVXRpbC5hZGRIZXhQcmVmaXgoc3RyaW5nKVxuICBjb25zdCBpc1ZhbGlkID0gZXRoVXRpbC5pc1ZhbGlkQWRkcmVzcyhmaXhlZClcbiAgcmV0dXJuIGlzVmFsaWRcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIHJlc2VtYmxlcyBoZXggZGF0YVxuLy8gYnV0IGRlZmluaXRlbHkgbm90IGEgdmFsaWQgYWRkcmVzcy5cbmZ1bmN0aW9uIHJlc2VtYmxlc0RhdGEgKHN0cmluZykge1xuICBjb25zdCBmaXhlZCA9IGV0aFV0aWwuYWRkSGV4UHJlZml4KHN0cmluZylcbiAgY29uc3QgaXNWYWxpZEFkZHJlc3MgPSBldGhVdGlsLmlzVmFsaWRBZGRyZXNzKGZpeGVkKVxuICByZXR1cm4gIWlzVmFsaWRBZGRyZXNzICYmIGlzVmFsaWRIZXgoc3RyaW5nKVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkSGV4KGRhdGEpIHtcbiAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZydcbiAgaWYgKCFpc1N0cmluZykgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IGlzSGV4UHJlZml4ZWQgPSBkYXRhLnNsaWNlKDAsMikgPT09ICcweCdcbiAgaWYgKCFpc0hleFByZWZpeGVkKSByZXR1cm4gZmFsc2VcbiAgY29uc3Qgbm9uUHJlZml4ZWQgPSBkYXRhLnNsaWNlKDIpXG4gIGNvbnN0IGlzVmFsaWQgPSBub25QcmVmaXhlZC5tYXRjaChoZXhSZWdleClcbiAgcmV0dXJuIGlzVmFsaWRcbn1cblxuZnVuY3Rpb24gbXVzdFByb3ZpZGVJbkNvbnN0cnVjdG9yKG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHBhcmFtcywgY2IpIHtcbiAgICBjYihuZXcgRXJyb3IoJ1Byb3ZpZGVyRW5naW5lIC0gSG9va2VkV2FsbGV0U3VicHJvdmlkZXIgLSBNdXN0IHByb3ZpZGUgXCInICsgbWV0aG9kTmFtZSArICdcIiBmbiBpbiBjb25zdHJ1Y3RvciBvcHRpb25zJykpXG4gIH1cbn1cbiIsImNvbnN0IGNyZWF0ZVBheWxvYWQgPSByZXF1aXJlKCcuLi91dGlsL2NyZWF0ZS1wYXlsb2FkLmpzJylcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJQcm92aWRlclxuXG4vLyB0aGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhIHN1YnByb3ZpZGVyIC0tIG1vc3RseSBoZWxwZXJzXG5cblxuZnVuY3Rpb24gU3ViUHJvdmlkZXIoKSB7XG5cbn1cblxuU3ViUHJvdmlkZXIucHJvdG90eXBlLnNldEVuZ2luZSA9IGZ1bmN0aW9uKGVuZ2luZSkge1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBpZiAoc2VsZi5lbmdpbmUpIHJldHVyblxuICBzZWxmLmVuZ2luZSA9IGVuZ2luZVxuICBlbmdpbmUub24oJ2Jsb2NrJywgZnVuY3Rpb24oYmxvY2spIHtcbiAgICBzZWxmLmN1cnJlbnRCbG9jayA9IGJsb2NrXG4gIH0pXG5cbiAgZW5naW5lLm9uKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLnN0YXJ0KClcbiAgfSlcblxuICBlbmdpbmUub24oJ3N0b3AnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5zdG9wKClcbiAgfSlcbn1cblxuU3ViUHJvdmlkZXIucHJvdG90eXBlLmhhbmRsZVJlcXVlc3QgPSBmdW5jdGlvbihwYXlsb2FkLCBuZXh0LCBlbmQpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdTdWJwcm92aWRlcnMgc2hvdWxkIG92ZXJyaWRlIGBoYW5kbGVSZXF1ZXN0YC4nKVxufVxuXG5TdWJQcm92aWRlci5wcm90b3R5cGUuZW1pdFBheWxvYWQgPSBmdW5jdGlvbihwYXlsb2FkLCBjYil7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHNlbGYuZW5naW5lLnNlbmRBc3luYyhjcmVhdGVQYXlsb2FkKHBheWxvYWQpLCBjYilcbn1cblxuLy8gZHVtbWllcyBmb3Igb3ZlcnJpZGluZ1xuXG5TdWJQcm92aWRlci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHt9XG5cblN1YlByb3ZpZGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHt9XG4iLCJjb25zdCB4aHIgPSBwcm9jZXNzLmJyb3dzZXIgPyByZXF1aXJlKCd4aHInKSA6IHJlcXVpcmUoJ3JlcXVlc3QnKVxuY29uc3QgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHNcbmNvbnN0IGNyZWF0ZVBheWxvYWQgPSByZXF1aXJlKCcuLi91dGlsL2NyZWF0ZS1wYXlsb2FkLmpzJylcbmNvbnN0IFN1YnByb3ZpZGVyID0gcmVxdWlyZSgnLi9zdWJwcm92aWRlci5qcycpXG5jb25zdCB7IGVycm9yczogcnBjRXJyb3JzIH0gPSByZXF1aXJlKCdldGgtanNvbi1ycGMtZXJyb3JzJylcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJwY1NvdXJjZVxuXG5pbmhlcml0cyhScGNTb3VyY2UsIFN1YnByb3ZpZGVyKVxuXG5mdW5jdGlvbiBScGNTb3VyY2Uob3B0cykge1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBzZWxmLnJwY1VybCA9IG9wdHMucnBjVXJsXG59XG5cblJwY1NvdXJjZS5wcm90b3R5cGUuaGFuZGxlUmVxdWVzdCA9IGZ1bmN0aW9uKHBheWxvYWQsIG5leHQsIGVuZCl7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGNvbnN0IHRhcmdldFVybCA9IHNlbGYucnBjVXJsXG5cbiAgLy8gb3ZlcndyaXRlIGlkIHRvIGNvbmZsaWN0IHdpdGggb3RoZXIgY29uY3VycmVudCB1c2Vyc1xuICBsZXQgbmV3UGF5bG9hZCA9IGNyZWF0ZVBheWxvYWQocGF5bG9hZClcblxuICB4aHIoe1xuICAgIHVyaTogdGFyZ2V0VXJsLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3UGF5bG9hZCksXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICB0aW1lb3V0OiAyMDAwMCxcbiAgfSwgZnVuY3Rpb24oZXJyLCByZXMsIGJvZHkpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gZW5kKHJwY0Vycm9ycy5pbnRlcm5hbChlcnIpKVxuXG4gICAgLy8gY2hlY2sgZm9yIGVycm9yIGNvZGVcbiAgICBzd2l0Y2ggKHJlcy5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDQwNTpcbiAgICAgICAgcmV0dXJuIGVuZChycGNFcnJvcnMubWV0aG9kTm90Rm91bmQoKSlcbiAgICAgIGNhc2UgNTA0OiAvLyBHYXRld2F5IHRpbWVvdXRcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbigpe1xuICAgICAgICAgIGxldCBtc2cgPSBgR2F0ZXdheSB0aW1lb3V0LiBUaGUgcmVxdWVzdCB0b29rIHRvbyBsb25nIHRvIHByb2Nlc3MuIGBcbiAgICAgICAgICBtc2cgKz0gYFRoaXMgY2FuIGhhcHBlbiB3aGVuIHF1ZXJ5aW5nIGxvZ3Mgb3ZlciB0b28gd2lkZSBhIGJsb2NrIHJhbmdlLmBcbiAgICAgICAgICByZXR1cm4gZW5kKHJwY0Vycm9ycy5pbnRlcm5hbChtc2cpKVxuICAgICAgICB9KSgpXG4gICAgICBjYXNlIDQyOTogLy8gVG9vIG1hbnkgcmVxdWVzdHMgKHJhdGUgbGltaXRpbmcpXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24oKXtcbiAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYFRvbyBNYW55IFJlcXVlc3RzYClcbiAgICAgICAgICByZXR1cm4gZW5kKHJwY0Vycm9ycy5pbnRlcm5hbChlcnIpKVxuICAgICAgICB9KSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT0gMjAwKSB7XG4gICAgICAgICAgcmV0dXJuIGVuZChycGNFcnJvcnMuaW50ZXJuYWwocmVzLmJvZHkpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgcmVzcG9uc2VcbiAgICBsZXQgZGF0YVxuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShib2R5KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spXG4gICAgICByZXR1cm4gZW5kKHJwY0Vycm9ycy5pbnRlcm5hbChlcnIpKVxuICAgIH1cbiAgICBpZiAoZGF0YS5lcnJvcikgcmV0dXJuIGVuZChkYXRhLmVycm9yKVxuXG4gICAgZW5kKG51bGwsIGRhdGEucmVzdWx0KVxuICB9KVxufVxuIiwiY29uc3QgY3JlYXRlUGF5bG9hZCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBheWxvYWQuanMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzdGltYXRlR2FzXG5cbi8qXG5cblRoaXMgaXMgYSB3b3JrIGFyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL2dvLWV0aGVyZXVtL2lzc3Vlcy8yNTc3XG5cbiovXG5cblxuZnVuY3Rpb24gZXN0aW1hdGVHYXMocHJvdmlkZXIsIHR4UGFyYW1zLCBjYikge1xuICBwcm92aWRlci5zZW5kQXN5bmMoY3JlYXRlUGF5bG9hZCh7XG4gICAgbWV0aG9kOiAnZXRoX2VzdGltYXRlR2FzJyxcbiAgICBwYXJhbXM6IFt0eFBhcmFtc11cbiAgfSksIGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAvLyBoYW5kbGUgc2ltcGxlIHZhbHVlIHRyYW5zZmVyIGNhc2VcbiAgICAgIGlmIChlcnIubWVzc2FnZSA9PT0gJ25vIGNvbnRyYWN0IGNvZGUgYXQgZ2l2ZW4gYWRkcmVzcycpIHtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsICcweGNmMDgnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNiKGVycikgICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgICBjYihudWxsLCByZXMucmVzdWx0KVxuICB9KVxufSIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuY29uc3QgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHNcbmNvbnN0IGV0aFV0aWwgPSByZXF1aXJlKCdldGhlcmV1bWpzLXV0aWwnKVxuY29uc3QgRXRoQmxvY2tUcmFja2VyID0gcmVxdWlyZSgnZXRoLWJsb2NrLXRyYWNrZXInKVxuY29uc3QgbWFwID0gcmVxdWlyZSgnYXN5bmMvbWFwJylcbmNvbnN0IGVhY2hTZXJpZXMgPSByZXF1aXJlKCdhc3luYy9lYWNoU2VyaWVzJylcbmNvbnN0IFN0b3BsaWdodCA9IHJlcXVpcmUoJy4vdXRpbC9zdG9wbGlnaHQuanMnKVxuY29uc3QgY2FjaGVVdGlscyA9IHJlcXVpcmUoJy4vdXRpbC9ycGMtY2FjaGUtdXRpbHMuanMnKVxuY29uc3QgY3JlYXRlUGF5bG9hZCA9IHJlcXVpcmUoJy4vdXRpbC9jcmVhdGUtcGF5bG9hZC5qcycpXG5jb25zdCBub29wID0gZnVuY3Rpb24oKXt9XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViM1Byb3ZpZGVyRW5naW5lXG5cblxuaW5oZXJpdHMoV2ViM1Byb3ZpZGVyRW5naW5lLCBFdmVudEVtaXR0ZXIpXG5cbmZ1bmN0aW9uIFdlYjNQcm92aWRlckVuZ2luZShvcHRzKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIEV2ZW50RW1pdHRlci5jYWxsKHNlbGYpXG4gIHNlbGYuc2V0TWF4TGlzdGVuZXJzKDMwKVxuICAvLyBwYXJzZSBvcHRpb25zXG4gIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgLy8gYmxvY2sgcG9sbGluZ1xuICBjb25zdCBkaXJlY3RQcm92aWRlciA9IHsgc2VuZEFzeW5jOiBzZWxmLl9oYW5kbGVBc3luYy5iaW5kKHNlbGYpIH1cbiAgY29uc3QgYmxvY2tUcmFja2VyUHJvdmlkZXIgPSBvcHRzLmJsb2NrVHJhY2tlclByb3ZpZGVyIHx8IGRpcmVjdFByb3ZpZGVyXG4gIHNlbGYuX2Jsb2NrVHJhY2tlciA9IG9wdHMuYmxvY2tUcmFja2VyIHx8IG5ldyBFdGhCbG9ja1RyYWNrZXIoe1xuICAgIHByb3ZpZGVyOiBibG9ja1RyYWNrZXJQcm92aWRlcixcbiAgICBwb2xsaW5nSW50ZXJ2YWw6IG9wdHMucG9sbGluZ0ludGVydmFsIHx8IDQwMDAsXG4gICAgc2V0U2tpcENhY2hlRmxhZzogdHJ1ZSxcbiAgfSlcblxuICAvLyBzZXQgaW5pdGlhbGl6YXRpb24gYmxvY2tlclxuICBzZWxmLl9yZWFkeSA9IG5ldyBTdG9wbGlnaHQoKVxuICBcbiAgLy8gbG9jYWwgc3RhdGVcbiAgc2VsZi5jdXJyZW50QmxvY2sgPSBudWxsXG4gIHNlbGYuX3Byb3ZpZGVycyA9IFtdXG59XG5cbi8vIHB1YmxpY1xuXG5XZWIzUHJvdmlkZXJFbmdpbmUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oY2IgPSBub29wKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAvLyB0cmlnZ2VyIHN0YXJ0XG4gIHNlbGYuX3JlYWR5LmdvKClcblxuICAvLyBvbiBuZXcgYmxvY2ssIHJlcXVlc3QgYmxvY2sgYm9keSBhbmQgZW1pdCBhcyBldmVudHNcbiAgc2VsZi5fYmxvY2tUcmFja2VyLm9uKCdsYXRlc3QnLCAoYmxvY2tOdW1iZXIpID0+IHtcbiAgICAvLyBnZXQgYmxvY2sgYm9keVxuICAgIHNlbGYuX2dldEJsb2NrQnlOdW1iZXIoYmxvY2tOdW1iZXIsIChlcnIsIGJsb2NrKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYmxvY2tcIikpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgYnVmZmVyQmxvY2sgPSB0b0J1ZmZlckJsb2NrKGJsb2NrKVxuICAgICAgLy8gc2V0IGN1cnJlbnQgKyBlbWl0IFwiYmxvY2tcIiBldmVudFxuICAgICAgc2VsZi5fc2V0Q3VycmVudEJsb2NrKGJ1ZmZlckJsb2NrKVxuICAgICAgLy8gZW1pdCBvdGhlciBldmVudHNcbiAgICAgIHNlbGYuZW1pdCgncmF3QmxvY2snLCBibG9jaylcbiAgICAgIHNlbGYuZW1pdCgnbGF0ZXN0JywgYmxvY2spXG4gICAgfSlcbiAgfSlcblxuICAvLyBmb3J3YXJkIG90aGVyIGV2ZW50c1xuICBzZWxmLl9ibG9ja1RyYWNrZXIub24oJ3N5bmMnLCBzZWxmLmVtaXQuYmluZChzZWxmLCAnc3luYycpKVxuICBzZWxmLl9ibG9ja1RyYWNrZXIub24oJ2Vycm9yJywgc2VsZi5lbWl0LmJpbmQoc2VsZiwgJ2Vycm9yJykpXG5cbiAgLy8gdXBkYXRlIHN0YXRlXG4gIHNlbGYuX3J1bm5pbmcgPSB0cnVlXG4gIC8vIHNpZ25hbCB0aGF0IHdlIHN0YXJ0ZWRcbiAgc2VsZi5lbWl0KCdzdGFydCcpXG59XG5cbldlYjNQcm92aWRlckVuZ2luZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIC8vIHN0b3AgYmxvY2sgcG9sbGluZyBieSByZW1vdmluZyBldmVudCBsaXN0ZW5lcnNcbiAgc2VsZi5fYmxvY2tUcmFja2VyLnJlbW92ZUFsbExpc3RlbmVycygpXG4gIC8vIHVwZGF0ZSBzdGF0ZVxuICBzZWxmLl9ydW5uaW5nID0gZmFsc2VcbiAgLy8gc2lnbmFsIHRoYXQgd2Ugc3RvcHBlZFxuICBzZWxmLmVtaXQoJ3N0b3AnKVxufVxuXG5XZWIzUHJvdmlkZXJFbmdpbmUucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uKCl7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHJldHVybiBzZWxmLl9ydW5uaW5nXG59XG5cbldlYjNQcm92aWRlckVuZ2luZS5wcm90b3R5cGUuYWRkUHJvdmlkZXIgPSBmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICBzZWxmLl9wcm92aWRlcnMuc3BsaWNlKGluZGV4LCAwLCBzb3VyY2UpXG4gIH0gZWxzZSB7XG4gICAgc2VsZi5fcHJvdmlkZXJzLnB1c2goc291cmNlKVxuICB9XG4gIHNvdXJjZS5zZXRFbmdpbmUodGhpcylcbn1cblxuV2ViM1Byb3ZpZGVyRW5naW5lLnByb3RvdHlwZS5yZW1vdmVQcm92aWRlciA9IGZ1bmN0aW9uKHNvdXJjZSl7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGNvbnN0IGluZGV4ID0gc2VsZi5fcHJvdmlkZXJzLmluZGV4T2Yoc291cmNlKVxuICBpZiAoaW5kZXggPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIG5vdCBmb3VuZC4nKVxuICBzZWxmLl9wcm92aWRlcnMuc3BsaWNlKGluZGV4LCAxKVxufVxuXG5XZWIzUHJvdmlkZXJFbmdpbmUucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihwYXlsb2FkKXtcbiAgdGhyb3cgbmV3IEVycm9yKCdXZWIzUHJvdmlkZXJFbmdpbmUgZG9lcyBub3Qgc3VwcG9ydCBzeW5jaHJvbm91cyByZXF1ZXN0cy4nKVxufVxuXG5XZWIzUHJvdmlkZXJFbmdpbmUucHJvdG90eXBlLnNlbmRBc3luYyA9IGZ1bmN0aW9uKHBheWxvYWQsIGNiKXtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5fcmVhZHkuYXdhaXQoZnVuY3Rpb24oKXtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICAvLyBoYW5kbGUgYmF0Y2hcbiAgICAgIG1hcChwYXlsb2FkLCBzZWxmLl9oYW5kbGVBc3luYy5iaW5kKHNlbGYpLCBjYilcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFuZGxlIHNpbmdsZVxuICAgICAgc2VsZi5faGFuZGxlQXN5bmMocGF5bG9hZCwgY2IpXG4gICAgfVxuXG4gIH0pXG59XG5cbi8vIHByaXZhdGVcblxuV2ViM1Byb3ZpZGVyRW5naW5lLnByb3RvdHlwZS5fZ2V0QmxvY2tCeU51bWJlciA9IGZ1bmN0aW9uKGJsb2NrTnVtYmVyLCBjYikge1xuICBjb25zdCByZXEgPSBjcmVhdGVQYXlsb2FkKHsgbWV0aG9kOiAnZXRoX2dldEJsb2NrQnlOdW1iZXInLCBwYXJhbXM6IFtibG9ja051bWJlciwgZmFsc2VdLCBza2lwQ2FjaGU6IHRydWUgfSlcbiAgdGhpcy5faGFuZGxlQXN5bmMocmVxLCAoZXJyLCByZXMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIHJldHVybiBjYihudWxsLCByZXMucmVzdWx0KVxuICB9KVxufVxuXG5XZWIzUHJvdmlkZXJFbmdpbmUucHJvdG90eXBlLl9oYW5kbGVBc3luYyA9IGZ1bmN0aW9uKHBheWxvYWQsIGZpbmlzaGVkKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB2YXIgY3VycmVudFByb3ZpZGVyID0gLTFcbiAgdmFyIHJlc3VsdCA9IG51bGxcbiAgdmFyIGVycm9yID0gbnVsbFxuXG4gIHZhciBzdGFjayA9IFtdXG5cbiAgbmV4dCgpXG4gIFxuICBmdW5jdGlvbiBuZXh0KGFmdGVyKSB7XG4gICAgY3VycmVudFByb3ZpZGVyICs9IDFcbiAgICBzdGFjay51bnNoaWZ0KGFmdGVyKVxuXG4gICAgLy8gQnViYmxlZCBkb3duIGFzIGZhciBhcyB3ZSBjb3VsZCBnbywgYW5kIHRoZSByZXF1ZXN0IHdhc24ndFxuICAgIC8vIGhhbmRsZWQuIFJldHVybiBhbiBlcnJvci5cbiAgICBpZiAoY3VycmVudFByb3ZpZGVyID49IHNlbGYuX3Byb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIGVuZChuZXcgRXJyb3IoJ1JlcXVlc3QgZm9yIG1ldGhvZCBcIicgKyBwYXlsb2FkLm1ldGhvZCArICdcIiBub3QgaGFuZGxlZCBieSBhbnkgc3VicHJvdmlkZXIuIFBsZWFzZSBjaGVjayB5b3VyIHN1YnByb3ZpZGVyIGNvbmZpZ3VyYXRpb24gdG8gZW5zdXJlIHRoaXMgbWV0aG9kIGlzIGhhbmRsZWQuJykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBwcm92aWRlciA9IHNlbGYuX3Byb3ZpZGVyc1tjdXJyZW50UHJvdmlkZXJdXG4gICAgICAgIHByb3ZpZGVyLmhhbmRsZVJlcXVlc3QocGF5bG9hZCwgbmV4dCwgZW5kKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlbmQoZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbmQoX2Vycm9yLCBfcmVzdWx0KSB7XG4gICAgZXJyb3IgPSBfZXJyb3JcbiAgICByZXN1bHQgPSBfcmVzdWx0XG5cbiAgICBlYWNoU2VyaWVzKHN0YWNrLCBmdW5jdGlvbihmbiwgY2FsbGJhY2spIHtcblxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGZuKGVycm9yLCByZXN1bHQsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgcmVzdWx0T2JqID0ge1xuICAgICAgICBpZDogcGF5bG9hZC5pZCxcbiAgICAgICAganNvbnJwYzogcGF5bG9hZC5qc29ucnBjLFxuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICByZXN1bHRPYmouZXJyb3IgPSB7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3Iuc3RhY2sgfHwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgICBjb2RlOiAtMzIwMDBcbiAgICAgICAgfVxuICAgICAgICAvLyByZXNwb25kIHdpdGggYm90aCBlcnJvciBmb3JtYXRzXG4gICAgICAgIGZpbmlzaGVkKGVycm9yLCByZXN1bHRPYmopXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5pc2hlZChudWxsLCByZXN1bHRPYmopXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vL1xuLy8gZnJvbSByZW1vdGUtZGF0YVxuLy9cblxuV2ViM1Byb3ZpZGVyRW5naW5lLnByb3RvdHlwZS5fc2V0Q3VycmVudEJsb2NrID0gZnVuY3Rpb24oYmxvY2spe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBzZWxmLmN1cnJlbnRCbG9jayA9IGJsb2NrXG4gIHNlbGYuZW1pdCgnYmxvY2snLCBibG9jaylcbn1cblxuLy8gdXRpbFxuXG5mdW5jdGlvbiB0b0J1ZmZlckJsb2NrIChqc29uQmxvY2spIHtcbiAgcmV0dXJuIHtcbiAgICBudW1iZXI6ICAgICAgICAgICBldGhVdGlsLnRvQnVmZmVyKGpzb25CbG9jay5udW1iZXIpLFxuICAgIGhhc2g6ICAgICAgICAgICAgIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLmhhc2gpLFxuICAgIHBhcmVudEhhc2g6ICAgICAgIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLnBhcmVudEhhc2gpLFxuICAgIG5vbmNlOiAgICAgICAgICAgIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLm5vbmNlKSxcbiAgICBtaXhIYXNoOiAgICAgICAgICBldGhVdGlsLnRvQnVmZmVyKGpzb25CbG9jay5taXhIYXNoKSxcbiAgICBzaGEzVW5jbGVzOiAgICAgICBldGhVdGlsLnRvQnVmZmVyKGpzb25CbG9jay5zaGEzVW5jbGVzKSxcbiAgICBsb2dzQmxvb206ICAgICAgICBldGhVdGlsLnRvQnVmZmVyKGpzb25CbG9jay5sb2dzQmxvb20pLFxuICAgIHRyYW5zYWN0aW9uc1Jvb3Q6IGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLnRyYW5zYWN0aW9uc1Jvb3QpLFxuICAgIHN0YXRlUm9vdDogICAgICAgIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLnN0YXRlUm9vdCksXG4gICAgcmVjZWlwdHNSb290OiAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2sucmVjZWlwdFJvb3QgfHwganNvbkJsb2NrLnJlY2VpcHRzUm9vdCksXG4gICAgbWluZXI6ICAgICAgICAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2subWluZXIpLFxuICAgIGRpZmZpY3VsdHk6ICAgICAgIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLmRpZmZpY3VsdHkpLFxuICAgIHRvdGFsRGlmZmljdWx0eTogIGV0aFV0aWwudG9CdWZmZXIoanNvbkJsb2NrLnRvdGFsRGlmZmljdWx0eSksXG4gICAgc2l6ZTogICAgICAgICAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2suc2l6ZSksXG4gICAgZXh0cmFEYXRhOiAgICAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2suZXh0cmFEYXRhKSxcbiAgICBnYXNMaW1pdDogICAgICAgICBldGhVdGlsLnRvQnVmZmVyKGpzb25CbG9jay5nYXNMaW1pdCksXG4gICAgZ2FzVXNlZDogICAgICAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2suZ2FzVXNlZCksXG4gICAgdGltZXN0YW1wOiAgICAgICAgZXRoVXRpbC50b0J1ZmZlcihqc29uQmxvY2sudGltZXN0YW1wKSxcbiAgICB0cmFuc2FjdGlvbnM6ICAgICBqc29uQmxvY2sudHJhbnNhY3Rpb25zLFxuICB9XG59XG4iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0YWJsZS1zdHJpbmdpZnknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2FjaGVJZGVudGlmaWVyRm9yUGF5bG9hZDogY2FjaGVJZGVudGlmaWVyRm9yUGF5bG9hZCxcbiAgY2FuQ2FjaGU6IGNhbkNhY2hlLFxuICBibG9ja1RhZ0ZvclBheWxvYWQ6IGJsb2NrVGFnRm9yUGF5bG9hZCxcbiAgcGFyYW1zV2l0aG91dEJsb2NrVGFnOiBwYXJhbXNXaXRob3V0QmxvY2tUYWcsXG4gIGJsb2NrVGFnUGFyYW1JbmRleDogYmxvY2tUYWdQYXJhbUluZGV4LFxuICBjYWNoZVR5cGVGb3JQYXlsb2FkOiBjYWNoZVR5cGVGb3JQYXlsb2FkLFxufVxuXG5mdW5jdGlvbiBjYWNoZUlkZW50aWZpZXJGb3JQYXlsb2FkKHBheWxvYWQsIG9wdHMgPSB7fSl7XG4gIGlmICghY2FuQ2FjaGUocGF5bG9hZCkpIHJldHVybiBudWxsXG4gIGNvbnN0IHsgaW5jbHVkZUJsb2NrUmVmIH0gPSBvcHRzXG4gIGNvbnN0IHBhcmFtcyA9IGluY2x1ZGVCbG9ja1JlZiA/IHBheWxvYWQucGFyYW1zIDogcGFyYW1zV2l0aG91dEJsb2NrVGFnKHBheWxvYWQpXG4gIHJldHVybiBwYXlsb2FkLm1ldGhvZCArICc6JyArIHN0cmluZ2lmeShwYXJhbXMpXG59XG5cbmZ1bmN0aW9uIGNhbkNhY2hlKHBheWxvYWQpe1xuICByZXR1cm4gY2FjaGVUeXBlRm9yUGF5bG9hZChwYXlsb2FkKSAhPT0gJ25ldmVyJ1xufVxuXG5mdW5jdGlvbiBibG9ja1RhZ0ZvclBheWxvYWQocGF5bG9hZCl7XG4gIHZhciBpbmRleCA9IGJsb2NrVGFnUGFyYW1JbmRleChwYXlsb2FkKTtcblxuICAvLyBCbG9jayB0YWcgcGFyYW0gbm90IHBhc3NlZC5cbiAgaWYgKGluZGV4ID49IHBheWxvYWQucGFyYW1zLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQucGFyYW1zW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gcGFyYW1zV2l0aG91dEJsb2NrVGFnKHBheWxvYWQpe1xuICB2YXIgaW5kZXggPSBibG9ja1RhZ1BhcmFtSW5kZXgocGF5bG9hZCk7XG5cbiAgLy8gQmxvY2sgdGFnIHBhcmFtIG5vdCBwYXNzZWQuXG4gIGlmIChpbmRleCA+PSBwYXlsb2FkLnBhcmFtcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gcGF5bG9hZC5wYXJhbXM7XG4gIH1cblxuICAvLyBldGhfZ2V0QmxvY2tCeU51bWJlciBoYXMgdGhlIGJsb2NrIHRhZyBmaXJzdCwgdGhlbiB0aGUgb3B0aW9uYWwgaW5jbHVkZVR4PyBwYXJhbVxuICBpZiAocGF5bG9hZC5tZXRob2QgPT09ICdldGhfZ2V0QmxvY2tCeU51bWJlcicpIHtcbiAgICByZXR1cm4gcGF5bG9hZC5wYXJhbXMuc2xpY2UoMSk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZC5wYXJhbXMuc2xpY2UoMCxpbmRleCk7XG59XG5cbmZ1bmN0aW9uIGJsb2NrVGFnUGFyYW1JbmRleChwYXlsb2FkKXtcbiAgc3dpdGNoKHBheWxvYWQubWV0aG9kKSB7XG4gICAgLy8gYmxvY2tUYWcgaXMgdGhpcmQgcGFyYW1cbiAgICBjYXNlICdldGhfZ2V0U3RvcmFnZUF0JzpcbiAgICAgIHJldHVybiAyXG4gICAgLy8gYmxvY2tUYWcgaXMgc2Vjb25kIHBhcmFtXG4gICAgY2FzZSAnZXRoX2dldEJhbGFuY2UnOlxuICAgIGNhc2UgJ2V0aF9nZXRDb2RlJzpcbiAgICBjYXNlICdldGhfZ2V0VHJhbnNhY3Rpb25Db3VudCc6XG4gICAgY2FzZSAnZXRoX2NhbGwnOlxuICAgIGNhc2UgJ2V0aF9lc3RpbWF0ZUdhcyc6XG4gICAgICByZXR1cm4gMVxuICAgIC8vIGJsb2NrVGFnIGlzIGZpcnN0IHBhcmFtXG4gICAgY2FzZSAnZXRoX2dldEJsb2NrQnlOdW1iZXInOlxuICAgICAgcmV0dXJuIDBcbiAgICAvLyB0aGVyZSBpcyBubyBibG9ja1RhZ1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FjaGVUeXBlRm9yUGF5bG9hZChwYXlsb2FkKSB7XG4gIHN3aXRjaCAocGF5bG9hZC5tZXRob2QpIHtcbiAgICAvLyBjYWNoZSBwZXJtYW5lbnRseVxuICAgIGNhc2UgJ3dlYjNfY2xpZW50VmVyc2lvbic6XG4gICAgY2FzZSAnd2ViM19zaGEzJzpcbiAgICBjYXNlICdldGhfcHJvdG9jb2xWZXJzaW9uJzpcbiAgICBjYXNlICdldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlIYXNoJzpcbiAgICBjYXNlICdldGhfZ2V0VW5jbGVDb3VudEJ5QmxvY2tIYXNoJzpcbiAgICBjYXNlICdldGhfZ2V0Q29kZSc6XG4gICAgY2FzZSAnZXRoX2dldEJsb2NrQnlIYXNoJzpcbiAgICBjYXNlICdldGhfZ2V0VHJhbnNhY3Rpb25CeUhhc2gnOlxuICAgIGNhc2UgJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tIYXNoQW5kSW5kZXgnOlxuICAgIGNhc2UgJ2V0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQnOlxuICAgIGNhc2UgJ2V0aF9nZXRVbmNsZUJ5QmxvY2tIYXNoQW5kSW5kZXgnOlxuICAgIGNhc2UgJ2V0aF9nZXRDb21waWxlcnMnOlxuICAgIGNhc2UgJ2V0aF9jb21waWxlTExMJzpcbiAgICBjYXNlICdldGhfY29tcGlsZVNvbGlkaXR5JzpcbiAgICBjYXNlICdldGhfY29tcGlsZVNlcnBlbnQnOlxuICAgIGNhc2UgJ3NoaF92ZXJzaW9uJzpcbiAgICAgIHJldHVybiAncGVybWEnXG5cbiAgICAvLyBjYWNoZSB1bnRpbCBmb3JrXG4gICAgY2FzZSAnZXRoX2dldEJsb2NrQnlOdW1iZXInOlxuICAgIGNhc2UgJ2V0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlcic6XG4gICAgY2FzZSAnZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrTnVtYmVyJzpcbiAgICBjYXNlICdldGhfZ2V0VHJhbnNhY3Rpb25CeUJsb2NrTnVtYmVyQW5kSW5kZXgnOlxuICAgIGNhc2UgJ2V0aF9nZXRVbmNsZUJ5QmxvY2tOdW1iZXJBbmRJbmRleCc6XG4gICAgICByZXR1cm4gJ2ZvcmsnXG5cbiAgICAvLyBjYWNoZSBmb3IgYmxvY2tcbiAgICBjYXNlICdldGhfZ2FzUHJpY2UnOlxuICAgIGNhc2UgJ2V0aF9nZXRCYWxhbmNlJzpcbiAgICBjYXNlICdldGhfZ2V0U3RvcmFnZUF0JzpcbiAgICBjYXNlICdldGhfZ2V0VHJhbnNhY3Rpb25Db3VudCc6XG4gICAgY2FzZSAnZXRoX2NhbGwnOlxuICAgIGNhc2UgJ2V0aF9lc3RpbWF0ZUdhcyc6XG4gICAgY2FzZSAnZXRoX2dldEZpbHRlckxvZ3MnOlxuICAgIGNhc2UgJ2V0aF9nZXRMb2dzJzpcbiAgICBjYXNlICdldGhfYmxvY2tOdW1iZXInOlxuICAgICAgcmV0dXJuICdibG9jaydcblxuICAgIC8vIG5ldmVyIGNhY2hlXG4gICAgY2FzZSAnbmV0X3ZlcnNpb24nOlxuICAgIGNhc2UgJ25ldF9wZWVyQ291bnQnOlxuICAgIGNhc2UgJ25ldF9saXN0ZW5pbmcnOlxuICAgIGNhc2UgJ2V0aF9zeW5jaW5nJzpcbiAgICBjYXNlICdldGhfc2lnbic6XG4gICAgY2FzZSAnZXRoX2NvaW5iYXNlJzpcbiAgICBjYXNlICdldGhfbWluaW5nJzpcbiAgICBjYXNlICdldGhfaGFzaHJhdGUnOlxuICAgIGNhc2UgJ2V0aF9hY2NvdW50cyc6XG4gICAgY2FzZSAnZXRoX3NlbmRUcmFuc2FjdGlvbic6XG4gICAgY2FzZSAnZXRoX3NlbmRSYXdUcmFuc2FjdGlvbic6XG4gICAgY2FzZSAnZXRoX25ld0ZpbHRlcic6XG4gICAgY2FzZSAnZXRoX25ld0Jsb2NrRmlsdGVyJzpcbiAgICBjYXNlICdldGhfbmV3UGVuZGluZ1RyYW5zYWN0aW9uRmlsdGVyJzpcbiAgICBjYXNlICdldGhfdW5pbnN0YWxsRmlsdGVyJzpcbiAgICBjYXNlICdldGhfZ2V0RmlsdGVyQ2hhbmdlcyc6XG4gICAgY2FzZSAnZXRoX2dldFdvcmsnOlxuICAgIGNhc2UgJ2V0aF9zdWJtaXRXb3JrJzpcbiAgICBjYXNlICdldGhfc3VibWl0SGFzaHJhdGUnOlxuICAgIGNhc2UgJ2RiX3B1dFN0cmluZyc6XG4gICAgY2FzZSAnZGJfZ2V0U3RyaW5nJzpcbiAgICBjYXNlICdkYl9wdXRIZXgnOlxuICAgIGNhc2UgJ2RiX2dldEhleCc6XG4gICAgY2FzZSAnc2hoX3Bvc3QnOlxuICAgIGNhc2UgJ3NoaF9uZXdJZGVudGl0eSc6XG4gICAgY2FzZSAnc2hoX2hhc0lkZW50aXR5JzpcbiAgICBjYXNlICdzaGhfbmV3R3JvdXAnOlxuICAgIGNhc2UgJ3NoaF9hZGRUb0dyb3VwJzpcbiAgICBjYXNlICdzaGhfbmV3RmlsdGVyJzpcbiAgICBjYXNlICdzaGhfdW5pbnN0YWxsRmlsdGVyJzpcbiAgICBjYXNlICdzaGhfZ2V0RmlsdGVyQ2hhbmdlcyc6XG4gICAgY2FzZSAnc2hoX2dldE1lc3NhZ2VzJzpcbiAgICAgIHJldHVybiAnbmV2ZXInXG4gIH1cbn1cbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKiogQGZpbGUgaHR0cHByb3ZpZGVyLmpzXG4gKiBAYXV0aG9yczpcbiAqICAgTWFyZWsgS290ZXdpY3ogPG1hcmVrQHBhcml0eS5pbz5cbiAqICAgTWFyaWFuIE9hbmNlYVxuICogICBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxNVxuICovXG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtaGVscGVycycpLmVycm9ycztcbnZhciBYSFIyID0gcmVxdWlyZSgneGhyMi1jb29raWVzJykuWE1MSHR0cFJlcXVlc3QgLy8ganNoaW50IGlnbm9yZTogbGluZVxudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xuXG5cbi8qKlxuICogSHR0cFByb3ZpZGVyIHNob3VsZCBiZSB1c2VkIHRvIHNlbmQgcnBjIGNhbGxzIG92ZXIgaHR0cFxuICovXG52YXIgSHR0cFByb3ZpZGVyID0gZnVuY3Rpb24gSHR0cFByb3ZpZGVyKGhvc3QsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBrZWVwQWxpdmUgPVxuICAgICAgICAob3B0aW9ucy5rZWVwQWxpdmUgPT09IHRydWUgfHwgb3B0aW9ucy5rZWVwQWxpdmUgIT09IGZhbHNlKSA/XG4gICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgIGZhbHNlO1xuICAgIHRoaXMuaG9zdCA9IGhvc3QgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODU0NSc7XG4gICAgaWYgKHRoaXMuaG9zdC5zdWJzdHJpbmcoMCw1KSA9PT0gXCJodHRwc1wiKSB7XG4gICAgICAgIHRoaXMuaHR0cHNBZ2VudCA9IG5ldyBodHRwcy5BZ2VudCh7IGtlZXBBbGl2ZToga2VlcEFsaXZlIH0pO1xuICAgIH1lbHNle1xuICAgICAgICB0aGlzLmh0dHBBZ2VudCA9IG5ldyBodHRwLkFnZW50KHsga2VlcEFsaXZlOiBrZWVwQWxpdmUgfSk7XG4gICAgfVxuICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAwO1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xufTtcblxuSHR0cFByb3ZpZGVyLnByb3RvdHlwZS5fcHJlcGFyZVJlcXVlc3QgPSBmdW5jdGlvbigpe1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhIUjIoKTtcbiAgICByZXF1ZXN0Lm5vZGVqc1NldCh7XG4gICAgICAgIGh0dHBzQWdlbnQ6dGhpcy5odHRwc0FnZW50LFxuICAgICAgICBodHRwQWdlbnQ6dGhpcy5odHRwQWdlbnRcbiAgICB9KTtcblxuICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuaG9zdCwgdHJ1ZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgcmVxdWVzdC50aW1lb3V0ID0gdGhpcy50aW1lb3V0ICYmIHRoaXMudGltZW91dCAhPT0gMSA/IHRoaXMudGltZW91dCA6IDA7XG4gICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gICAgaWYodGhpcy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlci5uYW1lLCBoZWFkZXIudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gbWFrZSBhc3luYyByZXF1ZXN0XG4gKlxuICogQG1ldGhvZCBzZW5kXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdHJpZ2dlcmVkIG9uIGVuZCB3aXRoIChlcnIsIHJlc3VsdClcbiAqL1xuSHR0cFByb3ZpZGVyLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHBheWxvYWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3QudGltZW91dCAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGVycm9ycy5JbnZhbGlkUmVzcG9uc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9ycy5Db25uZWN0aW9uVGltZW91dCh0aGlzLnRpbWVvdXQpKTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9ycy5JbnZhbGlkQ29ubmVjdGlvbih0aGlzLmhvc3QpKTtcbiAgICB9XG59O1xuXG5IdHRwUHJvdmlkZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9OTyBPUFxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEh0dHBQcm92aWRlcjtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKiogQGZpbGUgaW5kZXguanNcbiAqIEBhdXRob3JzOlxuICogICBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtaGVscGVycycpLmVycm9ycztcbnZhciBvYm9lID0gcmVxdWlyZSgnb2JvZScpO1xuXG5cbnZhciBJcGNQcm92aWRlciA9IGZ1bmN0aW9uIElwY1Byb3ZpZGVyKHBhdGgsIG5ldCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5yZXNwb25zZUNhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMubm90aWZpY2F0aW9uQ2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb25uZWN0aW9uID0gbmV0LmNvbm5lY3Qoe3BhdGg6IHRoaXMucGF0aH0pO1xuXG4gICAgdGhpcy5hZGREZWZhdWx0RXZlbnRzKCk7XG5cbiAgICAvLyBMSVNURU4gRk9SIENPTk5FQ1RJT04gUkVTUE9OU0VTXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8qanNoaW50IG1heGNvbXBsZXhpdHk6IDYgKi9cblxuICAgICAgICB2YXIgaWQgPSBudWxsO1xuXG4gICAgICAgIC8vIGdldCB0aGUgaWQgd2hpY2ggbWF0Y2hlcyB0aGUgcmV0dXJuZWQgaWRcbiAgICAgICAgaWYoXy5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uKGxvYWQpe1xuICAgICAgICAgICAgICAgIGlmKF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2xvYWQuaWRdKVxuICAgICAgICAgICAgICAgICAgICBpZCA9IGxvYWQuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gcmVzdWx0LmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm90aWZpY2F0aW9uXG4gICAgICAgIGlmKCFpZCAmJiByZXN1bHQubWV0aG9kLmluZGV4T2YoJ19zdWJzY3JpcHRpb24nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBpZihfLmlzRnVuY3Rpb24oY2FsbGJhY2spKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgIH0gZWxzZSBpZihfdGhpcy5yZXNwb25zZUNhbGxiYWNrc1tpZF0pIHtcbiAgICAgICAgICAgIF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXShudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgZGVsZXRlIF90aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2lkXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB1c2Ugb2JvZS5qcyBmb3IgU29ja2V0c1xuICAgIGlmIChuZXQuY29uc3RydWN0b3IubmFtZSA9PT0gJ1NvY2tldCcpIHtcbiAgICAgICAgb2JvZSh0aGlzLmNvbm5lY3Rpb24pXG4gICAgICAgIC5kb25lKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub24oJ2RhdGEnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIF90aGlzLl9wYXJzZVJlc3BvbnNlKGRhdGEudG9TdHJpbmcoKSkuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbi8qKlxuV2lsbCBhZGQgdGhlIGVycm9yIGFuZCBlbmQgZXZlbnQgdG8gdGltZW91dCBleGlzdGluZyBjYWxsc1xuXG5AbWV0aG9kIGFkZERlZmF1bHRFdmVudHNcbiovXG5JcGNQcm92aWRlci5wcm90b3R5cGUuYWRkRGVmYXVsdEV2ZW50cyA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuY29ubmVjdGlvbi5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF90aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuX3RpbWVvdXQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29ubmVjdGlvbi5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuX3RpbWVvdXQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29ubmVjdGlvbi5vbigndGltZW91dCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF90aGlzLl90aW1lb3V0KCk7XG4gICAgfSk7XG59O1xuXG5cbi8qKlxuIFdpbGwgcGFyc2UgdGhlIHJlc3BvbnNlIGFuZCBtYWtlIGFuIGFycmF5IG91dCBvZiBpdC5cblxuIE5PVEUsIHRoaXMgZXhpc3RzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSByZWFzb25zLlxuXG4gQG1ldGhvZCBfcGFyc2VSZXNwb25zZVxuIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gKi9cbklwY1Byb3ZpZGVyLnByb3RvdHlwZS5fcGFyc2VSZXNwb25zZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICByZXR1cm5WYWx1ZXMgPSBbXTtcblxuICAgIC8vIERFLUNIVU5LRVJcbiAgICB2YXIgZGVjaHVua2VkRGF0YSA9IGRhdGFcbiAgICAgICAgLnJlcGxhY2UoL1xcfVtcXG5cXHJdP1xcey9nLCd9fC0tfHsnKSAvLyB9e1xuICAgICAgICAucmVwbGFjZSgvXFx9XFxdW1xcblxccl0/XFxbXFx7L2csJ31dfC0tfFt7JykgLy8gfV1be1xuICAgICAgICAucmVwbGFjZSgvXFx9W1xcblxccl0/XFxbXFx7L2csJ318LS18W3snKSAvLyB9W3tcbiAgICAgICAgLnJlcGxhY2UoL1xcfVxcXVtcXG5cXHJdP1xcey9nLCd9XXwtLXx7JykgLy8gfV17XG4gICAgICAgIC5zcGxpdCgnfC0tfCcpO1xuXG4gICAgZGVjaHVua2VkRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgICAgIC8vIHByZXBlbmQgdGhlIGxhc3QgY2h1bmtcbiAgICAgICAgaWYoX3RoaXMubGFzdENodW5rKVxuICAgICAgICAgICAgZGF0YSA9IF90aGlzLmxhc3RDaHVuayArIGRhdGE7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgfSBjYXRjaChlKSB7XG5cbiAgICAgICAgICAgIF90aGlzLmxhc3RDaHVuayA9IGRhdGE7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRpbWVvdXQgdG8gY2FuY2VsIGFsbCByZXF1ZXN0c1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLmxhc3RDaHVua1RpbWVvdXQpO1xuICAgICAgICAgICAgX3RoaXMubGFzdENodW5rVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGltZW91dCgpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9ycy5JbnZhbGlkUmVzcG9uc2UoZGF0YSk7XG4gICAgICAgICAgICB9LCAxMDAwICogMTUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYW5jZWwgdGltZW91dCBhbmQgc2V0IGNodW5rIHRvIG51bGxcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLmxhc3RDaHVua1RpbWVvdXQpO1xuICAgICAgICBfdGhpcy5sYXN0Q2h1bmsgPSBudWxsO1xuXG4gICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgIHJldHVyblZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWVzO1xufTtcblxuXG4vKipcbkdldCB0aGUgYWRkcyBhIGNhbGxiYWNrIHRvIHRoZSByZXNwb25zZUNhbGxiYWNrcyBvYmplY3QsXG53aGljaCB3aWxsIGJlIGNhbGxlZCBpZiBhIHJlc3BvbnNlIG1hdGNoaW5nIHRoZSByZXNwb25zZSBJZCB3aWxsIGFycml2ZS5cblxuQG1ldGhvZCBfYWRkUmVzcG9uc2VDYWxsYmFja1xuKi9cbklwY1Byb3ZpZGVyLnByb3RvdHlwZS5fYWRkUmVzcG9uc2VDYWxsYmFjayA9IGZ1bmN0aW9uKHBheWxvYWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGlkID0gcGF5bG9hZC5pZCB8fCBwYXlsb2FkWzBdLmlkO1xuICAgIHZhciBtZXRob2QgPSBwYXlsb2FkLm1ldGhvZCB8fCBwYXlsb2FkWzBdLm1ldGhvZDtcblxuICAgIHRoaXMucmVzcG9uc2VDYWxsYmFja3NbaWRdID0gY2FsbGJhY2s7XG4gICAgdGhpcy5yZXNwb25zZUNhbGxiYWNrc1tpZF0ubWV0aG9kID0gbWV0aG9kO1xufTtcblxuLyoqXG5UaW1lb3V0IGFsbCByZXF1ZXN0cyB3aGVuIHRoZSBlbmQvZXJyb3IgZXZlbnQgaXMgZmlyZWRcblxuQG1ldGhvZCBfdGltZW91dFxuKi9cbklwY1Byb3ZpZGVyLnByb3RvdHlwZS5fdGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIGZvcih2YXIga2V5IGluIHRoaXMucmVzcG9uc2VDYWxsYmFja3MpIHtcbiAgICAgICAgaWYodGhpcy5yZXNwb25zZUNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VDYWxsYmFja3Nba2V5XShlcnJvcnMuSW52YWxpZENvbm5lY3Rpb24oJ29uIElQQycpKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlc3BvbnNlQ2FsbGJhY2tzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiBUcnkgdG8gcmVjb25uZWN0XG5cbiBAbWV0aG9kIHJlY29ubmVjdFxuICovXG5JcGNQcm92aWRlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Qoe3BhdGg6IHRoaXMucGF0aH0pO1xufTtcblxuXG5JcGNQcm92aWRlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChwYXlsb2FkLCBjYWxsYmFjaykge1xuICAgIC8vIHRyeSByZWNvbm5lY3QsIHdoZW4gY29ubmVjdGlvbiBpcyBnb25lXG4gICAgaWYoIXRoaXMuY29ubmVjdGlvbi53cml0YWJsZSlcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Qoe3BhdGg6IHRoaXMucGF0aH0pO1xuXG5cbiAgICB0aGlzLmNvbm5lY3Rpb24ud3JpdGUoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgIHRoaXMuX2FkZFJlc3BvbnNlQ2FsbGJhY2socGF5bG9hZCwgY2FsbGJhY2spO1xufTtcblxuLyoqXG5TdWJzY3JpYmVzIHRvIHByb3ZpZGVyIGV2ZW50cy5wcm92aWRlclxuXG5AbWV0aG9kIG9uXG5AcGFyYW0ge1N0cmluZ30gdHlwZSAgICAnbm90aWZpY2F0aW9uJywgJ2Nvbm5lY3QnLCAnZXJyb3InLCAnZW5kJyBvciAnZGF0YSdcbkBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgdGhlIGNhbGxiYWNrIHRvIGNhbGxcbiovXG5JcGNQcm92aWRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcblxuICAgIGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc2Vjb25kIHBhcmFtZXRlciBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG5cbiAgICBzd2l0Y2godHlwZSl7XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25DYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBhZGRzIGVycm9yLCBlbmQsIHRpbWVvdXQsIGNvbm5lY3RcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcbiBTdWJzY3JpYmVzIHRvIHByb3ZpZGVyIGV2ZW50cy5wcm92aWRlclxuXG4gQG1ldGhvZCBvblxuIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICdjb25uZWN0JywgJ2Vycm9yJywgJ2VuZCcgb3IgJ2RhdGEnXG4gQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICB0aGUgY2FsbGJhY2sgdG8gY2FsbFxuICovXG5JcGNQcm92aWRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuXG4gICAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzZWNvbmQgcGFyYW1ldGVyIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcblxuICAgIHRoaXMuY29ubmVjdGlvbi5vbmNlKHR5cGUsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuUmVtb3ZlcyBldmVudCBsaXN0ZW5lclxuXG5AbWV0aG9kIHJlbW92ZUxpc3RlbmVyXG5AcGFyYW0ge1N0cmluZ30gdHlwZSAgICAnZGF0YScsICdjb25uZWN0JywgJ2Vycm9yJywgJ2VuZCcgb3IgJ2RhdGEnXG5AcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIHRoZSBjYWxsYmFjayB0byBjYWxsXG4qL1xuSXBjUHJvdmlkZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNiLCBpbmRleCl7XG4gICAgICAgICAgICAgICAgaWYoY2IgPT09IGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ub3RpZmljYXRpb25DYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5yZW1vdmVMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcblJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVyc1xuXG5AbWV0aG9kIHJlbW92ZUFsbExpc3RlbmVyc1xuQHBhcmFtIHtTdHJpbmd9IHR5cGUgICAgJ2RhdGEnLCAnY29ubmVjdCcsICdlcnJvcicsICdlbmQnIG9yICdkYXRhJ1xuKi9cbklwY1Byb3ZpZGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcblJlc2V0cyB0aGUgcHJvdmlkZXJzLCBjbGVhcnMgYWxsIGNhbGxiYWNrc1xuXG5AbWV0aG9kIHJlc2V0XG4qL1xuSXBjUHJvdmlkZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3RpbWVvdXQoKTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IFtdO1xuXG4gICAgdGhpcy5jb25uZWN0aW9uLnJlbW92ZUFsbExpc3RlbmVycygnZXJyb3InKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlQWxsTGlzdGVuZXJzKCdlbmQnKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlQWxsTGlzdGVuZXJzKCd0aW1lb3V0Jyk7XG5cbiAgICB0aGlzLmFkZERlZmF1bHRFdmVudHMoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXBjUHJvdmlkZXI7XG5cbiIsIi8vIGdvdHRhIGtlZXAgaXQgd2l0aGluIE1BWF9TQUZFX0lOVEVHRVJcbmNvbnN0IGV4dHJhRGlnaXRzID0gM1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVJhbmRvbUlkXG5cblxuZnVuY3Rpb24gY3JlYXRlUmFuZG9tSWQoKXtcbiAgLy8gMTMgdGltZSBkaWdpdHNcbiAgdmFyIGRhdGVQYXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkqTWF0aC5wb3coMTAsIGV4dHJhRGlnaXRzKVxuICAvLyAzIHJhbmRvbSBkaWdpdHNcbiAgdmFyIGV4dHJhUGFydCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpNYXRoLnBvdygxMCwgZXh0cmFEaWdpdHMpKVxuICAvLyAxNiBkaWdpdHNcbiAgcmV0dXJuIGRhdGVQYXJ0K2V4dHJhUGFydFxufSIsImNvbnN0IGdldFJhbmRvbUlkID0gcmVxdWlyZSgnLi9yYW5kb20taWQuanMnKVxuY29uc3QgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBheWxvYWRcblxuXG5mdW5jdGlvbiBjcmVhdGVQYXlsb2FkKGRhdGEpe1xuICByZXR1cm4gZXh0ZW5kKHtcbiAgICAvLyBkZWZhdWx0c1xuICAgIGlkOiBnZXRSYW5kb21JZCgpLFxuICAgIGpzb25ycGM6ICcyLjAnLFxuICAgIHBhcmFtczogW10sXG4gICAgLy8gdXNlci1zcGVjaWZpZWRcbiAgfSwgZGF0YSlcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=