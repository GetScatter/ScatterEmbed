(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "4lM6":
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
/**
 * @file subscription.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var _ = __webpack_require__("F/us");
var errors = __webpack_require__("OdSp").errors;
var EventEmitter = __webpack_require__("uhBA");

function Subscription(options) {
    EventEmitter.call(this);

    this.id = null;
    this.callback = _.identity;
    this.arguments = null;
    this._reconnectIntervalId = null;

    this.options = {
        subscription: options.subscription,
        type: options.type,
        requestManager: options.requestManager
    };
}

// INHERIT
Subscription.prototype = Object.create(EventEmitter.prototype);
Subscription.prototype.constructor = Subscription;


/**
 * Should be used to extract callback from array of arguments. Modifies input param
 *
 * @method extractCallback
 * @param {Array} arguments
 * @return {Function|Null} callback, if exists
 */

Subscription.prototype._extractCallback = function (args) {
    if (_.isFunction(args[args.length - 1])) {
        return args.pop(); // modify the args array!
    }
};

/**
 * Should be called to check if the number of arguments is correct
 *
 * @method validateArgs
 * @param {Array} arguments
 * @throws {Error} if it is not
 */

Subscription.prototype._validateArgs = function (args) {
    var subscription = this.options.subscription;

    if(!subscription)
        subscription = {};

    if(!subscription.params)
        subscription.params = 0;

    if (args.length !== subscription.params) {
        throw errors.InvalidNumberOfParams(args.length, subscription.params + 1, args[0]);
    }
};

/**
 * Should be called to format input args of method
 *
 * @method formatInput
 * @param {Array}
 * @return {Array}
 */

Subscription.prototype._formatInput = function (args) {
    var subscription = this.options.subscription;

    if (!subscription) {
        return args;
    }

    if (!subscription.inputFormatter) {
        return args;
    }

    var formattedArgs = subscription.inputFormatter.map(function (formatter, index) {
        return formatter ? formatter(args[index]) : args[index];
    });

    return formattedArgs;
};

/**
 * Should be called to format output(result) of method
 *
 * @method formatOutput
 * @param {Object}
 * @return {Object}
 */

Subscription.prototype._formatOutput = function (result) {
    var subscription = this.options.subscription;

    return (subscription && subscription.outputFormatter && result) ? subscription.outputFormatter(result) : result;
};

/**
 * Should create payload from given input args
 *
 * @method toPayload
 * @param {Array} args
 * @return {Object}
 */
Subscription.prototype._toPayload = function (args) {
    var params = [];
    this.callback = this._extractCallback(args) || _.identity;

    if (!this.subscriptionMethod) {
        this.subscriptionMethod = args.shift();

        // replace subscription with given name
        if (this.options.subscription.subscriptionName) {
            this.subscriptionMethod = this.options.subscription.subscriptionName;
        }
    }

    if (!this.arguments) {
        this.arguments = this._formatInput(args);
        this._validateArgs(this.arguments);
        args = []; // make empty after validation

    }

    // re-add subscriptionName
    params.push(this.subscriptionMethod);
    params = params.concat(this.arguments);


    if (args.length) {
        throw new Error('Only a callback is allowed as parameter on an already instantiated subscription.');
    }

    return {
        method: this.options.type + '_subscribe',
        params: params
    };
};

/**
 * Unsubscribes and clears callbacks
 *
 * @method unsubscribe
 * @return {Object}
 */
Subscription.prototype.unsubscribe = function(callback) {
    this.options.requestManager.removeSubscription(this.id, callback);
    this.id = null;
    this.removeAllListeners();
    clearInterval(this._reconnectIntervalId);
};

/**
 * Subscribes and watches for changes
 *
 * @method subscribe
 * @param {String} subscription the subscription
 * @param {Object} options the options object with address topics and fromBlock
 * @return {Object}
 */
Subscription.prototype.subscribe = function() {
    var _this = this;
    var args = Array.prototype.slice.call(arguments);
    var payload = this._toPayload(args);

    if(!payload) {
        return this;
    }

    if(!this.options.requestManager.provider) {
        var err1 = new Error('No provider set.');
        this.callback(err1, null, this);
        this.emit('error', err1);
        return this;
    }

    // throw error, if provider doesnt support subscriptions
    if(!this.options.requestManager.provider.on) {
        var err2 = new Error('The current provider doesn\'t support subscriptions: '+ this.options.requestManager.provider.constructor.name);
        this.callback(err2, null, this);
        this.emit('error', err2);
        return this;
    }

    // if id is there unsubscribe first
    if (this.id) {
        this.unsubscribe();
    }

    // store the params in the options object
    this.options.params = payload.params[1];

    // get past logs, if fromBlock is available
    if(payload.params[0] === 'logs' && _.isObject(payload.params[1]) && payload.params[1].hasOwnProperty('fromBlock') && isFinite(payload.params[1].fromBlock)) {
        // send the subscription request
        this.options.requestManager.send({
            method: 'eth_getLogs',
            params: [payload.params[1]]
        }, function (err, logs) {
            if(!err) {
                logs.forEach(function(log){
                    var output = _this._formatOutput(log);
                    _this.callback(null, output, _this);
                    _this.emit('data', output);
                });

                // TODO subscribe here? after the past logs?

            } else {
                _this.callback(err, null, _this);
                _this.emit('error', err);
            }
        });
    }

    // create subscription
    // TODO move to separate function? so that past logs can go first?

    if(typeof payload.params[1] === 'object')
        delete payload.params[1].fromBlock;

    this.options.requestManager.send(payload, function (err, result) {
        if(!err && result) {
            _this.id = result;

            // call callback on notifications
            _this.options.requestManager.addSubscription(_this.id, payload.params[0] , _this.options.type, function(err, result) {

                if (!err) {
                    if (!_.isArray(result)) {
                        result = [result];
                    }

                    result.forEach(function(resultItem) {
                        var output = _this._formatOutput(resultItem);

                        if (_.isFunction(_this.options.subscription.subscriptionHandler)) {
                            return _this.options.subscription.subscriptionHandler.call(_this, output);
                        } else {
                            _this.emit('data', output);
                        }

                        // call the callback, last so that unsubscribe there won't affect the emit above
                        _this.callback(null, output, _this);
                    });
                } else {
                    // unsubscribe, but keep listeners
                    _this.options.requestManager.removeSubscription(_this.id);

                    // re-subscribe, if connection fails
                    if(_this.options.requestManager.provider.once) {
                        _this._reconnectIntervalId = setInterval(function () {
                            // TODO check if that makes sense!
                            if (_this.options.requestManager.provider.reconnect) {
                                _this.options.requestManager.provider.reconnect();
                            }
                        }, 500);

                        _this.options.requestManager.provider.once('connect', function () {
                            clearInterval(_this._reconnectIntervalId);
                            _this.subscribe(_this.callback);
                        });
                    }
                    _this.emit('error', err);

                     // call the callback, last so that unsubscribe there won't affect the emit above
                    _this.callback(err, null, _this);
                }
            });
        } else {
          _this.callback(err, null, _this);
          _this.emit('error', err);
        }
    });

    // return an object to cancel the subscription
    return this;
};

module.exports = Subscription;


/***/ }),

/***/ "74Te":
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
/**
 * @file givenProvider.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var givenProvider = null;

// ADD GIVEN PROVIDER
/* jshint ignore:start */
var global;
try {
  global = Function('return this')();
} catch (e) {
  global = window;
}

// EthereumProvider
if(typeof global.ethereumProvider !== 'undefined') {
    givenProvider = global.ethereumProvider;

// Legacy web3.currentProvider
} else if(typeof global.web3 !== 'undefined' && global.web3.currentProvider) {

    if(global.web3.currentProvider.sendAsync) {
        global.web3.currentProvider.send = global.web3.currentProvider.sendAsync;
        delete global.web3.currentProvider.sendAsync;
    }

    // if connection is 'ipcProviderWrapper', add subscription support
    if(!global.web3.currentProvider.on &&
        global.web3.currentProvider.connection &&
        global.web3.currentProvider.connection.constructor.name === 'ipcProviderWrapper') {

        global.web3.currentProvider.on = function (type, callback) {

            if(typeof callback !== 'function')
                throw new Error('The second parameter callback must be a function.');

            switch(type){
                case 'data':
                    this.connection.on('data', function(data) {
                        var result = '';

                        data = data.toString();

                        try {
                            result = JSON.parse(data);
                        } catch(e) {
                            return callback(new Error('Couldn\'t parse response data'+ data));
                        }

                        // notification
                        if(!result.id && result.method.indexOf('_subscription') !== -1) {
                            callback(null, result);
                        }

                    });
                    break;

                default:
                    this.connection.on(type, callback);
                    break;
            }
        };
    }

    givenProvider = global.web3.currentProvider;
}
/* jshint ignore:end */


module.exports = givenProvider;


/***/ }),

/***/ "8e6A":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */




var requestManager = __webpack_require__("F2wZ");
var extend = __webpack_require__("PCH3");

module.exports = {
    packageInit: function (pkg, args) {
        args = Array.prototype.slice.call(args);

        if (!pkg) {
            throw new Error('You need to instantiate using the "new" keyword.');
        }


        // make property of pkg._provider, which can properly set providers
        Object.defineProperty(pkg, 'currentProvider', {
            get: function () {
                return pkg._provider;
            },
            set: function (value) {
                return pkg.setProvider(value);
            },
            enumerable: true,
            configurable: true
        });

        // inherit from web3 umbrella package
        if (args[0] && args[0]._requestManager) {
            pkg._requestManager = new requestManager.Manager(args[0].currentProvider);

        // set requestmanager on package
        } else {
            pkg._requestManager = new requestManager.Manager();
            pkg._requestManager.setProvider(args[0], args[1]);
        }

        // add givenProvider
        pkg.givenProvider = requestManager.Manager.givenProvider;
        pkg.providers = requestManager.Manager.providers;

         pkg._provider =  pkg._requestManager.provider;

        // add SETPROVIDER function (don't overwrite if already existing)
        if (!pkg.setProvider) {
            pkg.setProvider = function (provider, net) {
                pkg._requestManager.setProvider(provider, net);
                pkg._provider = pkg._requestManager.provider;
                return true;
            };
        }

        // attach batch request creation
        pkg.BatchRequest = requestManager.BatchManager.bind(null, pkg._requestManager);

        // attach extend function
        pkg.extend = extend(pkg);
    },
    addProviders: function (pkg) {
        pkg.givenProvider = requestManager.Manager.givenProvider;
        pkg.providers = requestManager.Manager.providers;
    }
};



/***/ }),

/***/ "F1/f":
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
/**
 * @file formatters.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2017
 */




var _ = __webpack_require__("F/us");
var utils = __webpack_require__("ETH1");
var Iban = __webpack_require__("2lMq");

/**
 * Should the format output to a big number
 *
 * @method outputBigNumberFormatter
 * @param {String|Number|BigNumber} number
 * @returns {BigNumber} object
 */
var outputBigNumberFormatter = function (number) {
    return utils.toBN(number).toString(10);
};

var isPredefinedBlockNumber = function (blockNumber) {
    return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
};

var inputDefaultBlockNumberFormatter = function (blockNumber) {
    if (this && (blockNumber === undefined || blockNumber === null)) {
        return this.defaultBlock;
    }
    if (blockNumber === 'genesis' || blockNumber === 'earliest') {
        return '0x0';
    }
    return inputBlockNumberFormatter(blockNumber);
};

var inputBlockNumberFormatter = function (blockNumber) {
    if (blockNumber === undefined) {
        return undefined;
    } else if (isPredefinedBlockNumber(blockNumber)) {
        return blockNumber;
    }
    return (utils.isHexStrict(blockNumber)) ? ((_.isString(blockNumber)) ? blockNumber.toLowerCase() : blockNumber) : utils.numberToHex(blockNumber);
};

/**
 * Formats the input of a transaction and converts all values to HEX
 *
 * @method _txInputFormatter
 * @param {Object} transaction options
 * @returns object
 */
var _txInputFormatter = function (options){

    if (options.to) { // it might be contract creation
        options.to = inputAddressFormatter(options.to);
    }

    if (options.data && options.input) {
        throw new Error('You can\'t have "data" and "input" as properties of transactions at the same time, please use either "data" or "input" instead.');
    }

    if (!options.data && options.input) {
        options.data = options.input;
        delete options.input;
    }

    if(options.data && !utils.isHex(options.data)) {
        throw new Error('The data field must be HEX encoded data.');
    }

    // allow both
    if (options.gas || options.gasLimit) {
        options.gas = options.gas || options.gasLimit;
    }

    ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
        return options[key] !== undefined;
    }).forEach(function(key){
        options[key] = utils.numberToHex(options[key]);
    });

    return options;
};

/**
 * Formats the input of a transaction and converts all values to HEX
 *
 * @method inputCallFormatter
 * @param {Object} transaction options
 * @returns object
*/
var inputCallFormatter = function (options){

    options = _txInputFormatter(options);

    var from = options.from || (this ? this.defaultAccount : null);

    if (from) {
        options.from = inputAddressFormatter(from);
    }


    return options;
};

/**
 * Formats the input of a transaction and converts all values to HEX
 *
 * @method inputTransactionFormatter
 * @param {Object} options
 * @returns object
*/
var inputTransactionFormatter = function (options) {

    options = _txInputFormatter(options);

    // check from, only if not number, or object
    if (!_.isNumber(options.from) && !_.isObject(options.from)) {
        options.from = options.from || (this ? this.defaultAccount : null);

        if (!options.from && !_.isNumber(options.from)) {
            throw new Error('The send transactions "from" field must be defined!');
        }

        options.from = inputAddressFormatter(options.from);
    }

    return options;
};

/**
 * Hex encodes the data passed to eth_sign and personal_sign
 *
 * @method inputSignFormatter
 * @param {String} data
 * @returns {String}
 */
var inputSignFormatter = function (data) {
    return (utils.isHexStrict(data)) ? data : utils.utf8ToHex(data);
};

/**
 * Formats the output of a transaction to its proper values
 *
 * @method outputTransactionFormatter
 * @param {Object} tx
 * @returns {Object}
*/
var outputTransactionFormatter = function (tx){
    if(tx.blockNumber !== null)
        tx.blockNumber = utils.hexToNumber(tx.blockNumber);
    if(tx.transactionIndex !== null)
        tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
    tx.nonce = utils.hexToNumber(tx.nonce);
    tx.gas = utils.hexToNumber(tx.gas);
    tx.gasPrice = outputBigNumberFormatter(tx.gasPrice);
    tx.value = outputBigNumberFormatter(tx.value);

    if(tx.to && utils.isAddress(tx.to)) { // tx.to could be `0x0` or `null` while contract creation
        tx.to = utils.toChecksumAddress(tx.to);
    } else {
        tx.to = null; // set to `null` if invalid address
    }

    if(tx.from) {
        tx.from = utils.toChecksumAddress(tx.from);
    }

    return tx;
};

/**
 * Formats the output of a transaction receipt to its proper values
 *
 * @method outputTransactionReceiptFormatter
 * @param {Object} receipt
 * @returns {Object}
*/
var outputTransactionReceiptFormatter = function (receipt){
    if(typeof receipt !== 'object') {
        throw new Error('Received receipt is invalid: '+ receipt);
    }

    if(receipt.blockNumber !== null)
        receipt.blockNumber = utils.hexToNumber(receipt.blockNumber);
    if(receipt.transactionIndex !== null)
        receipt.transactionIndex = utils.hexToNumber(receipt.transactionIndex);
    receipt.cumulativeGasUsed = utils.hexToNumber(receipt.cumulativeGasUsed);
    receipt.gasUsed = utils.hexToNumber(receipt.gasUsed);

    if(_.isArray(receipt.logs)) {
        receipt.logs = receipt.logs.map(outputLogFormatter);
    }

    if(receipt.contractAddress) {
        receipt.contractAddress = utils.toChecksumAddress(receipt.contractAddress);
    }

    if(typeof receipt.status !== 'undefined') {
        receipt.status = Boolean(parseInt(receipt.status));
    }

    return receipt;
};

/**
 * Formats the output of a block to its proper values
 *
 * @method outputBlockFormatter
 * @param {Object} block
 * @returns {Object}
*/
var outputBlockFormatter = function(block) {

    // transform to number
    block.gasLimit = utils.hexToNumber(block.gasLimit);
    block.gasUsed = utils.hexToNumber(block.gasUsed);
    block.size = utils.hexToNumber(block.size);
    block.timestamp = utils.hexToNumber(block.timestamp);
    if (block.number !== null)
        block.number = utils.hexToNumber(block.number);

    if(block.difficulty)
        block.difficulty = outputBigNumberFormatter(block.difficulty);
    if(block.totalDifficulty)
        block.totalDifficulty = outputBigNumberFormatter(block.totalDifficulty);

    if (_.isArray(block.transactions)) {
        block.transactions.forEach(function(item){
            if(!_.isString(item))
                return outputTransactionFormatter(item);
        });
    }

    if (block.miner)
        block.miner = utils.toChecksumAddress(block.miner);

    return block;
};

/**
 * Formats the input of a log
 *
 * @method inputLogFormatter
 * @param {Object} log object
 * @returns {Object} log
*/
var inputLogFormatter = function(options) {
    var toTopic = function(value){

        if(value === null || typeof value === 'undefined')
            return null;

        value = String(value);

        if(value.indexOf('0x') === 0)
            return value;
        else
            return utils.fromUtf8(value);
    };

    if (options.fromBlock)
        options.fromBlock = inputBlockNumberFormatter(options.fromBlock);

    if (options.toBlock)
        options.toBlock = inputBlockNumberFormatter(options.toBlock);


    // make sure topics, get converted to hex
    options.topics = options.topics || [];
    options.topics = options.topics.map(function(topic){
        return (_.isArray(topic)) ? topic.map(toTopic) : toTopic(topic);
    });

    toTopic = null;

    if (options.address) {
        options.address = (_.isArray(options.address)) ? options.address.map(function (addr) {
            return inputAddressFormatter(addr);
        }) : inputAddressFormatter(options.address);
    }

    return options;
};

/**
 * Formats the output of a log
 *
 * @method outputLogFormatter
 * @param {Object} log object
 * @returns {Object} log
*/
var outputLogFormatter = function(log) {

    // generate a custom log id
    if(typeof log.blockHash === 'string' &&
       typeof log.transactionHash === 'string' &&
       typeof log.logIndex === 'string') {
        var shaId = utils.sha3(log.blockHash.replace('0x','') + log.transactionHash.replace('0x','') + log.logIndex.replace('0x',''));
        log.id = 'log_'+ shaId.replace('0x','').substr(0,8);
    } else if(!log.id) {
        log.id = null;
    }

    if (log.blockNumber !== null)
        log.blockNumber = utils.hexToNumber(log.blockNumber);
    if (log.transactionIndex !== null)
        log.transactionIndex = utils.hexToNumber(log.transactionIndex);
    if (log.logIndex !== null)
        log.logIndex = utils.hexToNumber(log.logIndex);

    if (log.address) {
        log.address = utils.toChecksumAddress(log.address);
    }

    return log;
};

/**
 * Formats the input of a whisper post and converts all values to HEX
 *
 * @method inputPostFormatter
 * @param {Object} transaction object
 * @returns {Object}
*/
var inputPostFormatter = function(post) {

    // post.payload = utils.toHex(post.payload);

    if (post.ttl)
        post.ttl = utils.numberToHex(post.ttl);
    if (post.workToProve)
        post.workToProve = utils.numberToHex(post.workToProve);
    if (post.priority)
        post.priority = utils.numberToHex(post.priority);

    // fallback
    if (!_.isArray(post.topics)) {
        post.topics = post.topics ? [post.topics] : [];
    }

    // format the following options
    post.topics = post.topics.map(function(topic){
        // convert only if not hex
        return (topic.indexOf('0x') === 0) ? topic : utils.fromUtf8(topic);
    });

    return post;
};

/**
 * Formats the output of a received post message
 *
 * @method outputPostFormatter
 * @param {Object}
 * @returns {Object}
 */
var outputPostFormatter = function(post){

    post.expiry = utils.hexToNumber(post.expiry);
    post.sent = utils.hexToNumber(post.sent);
    post.ttl = utils.hexToNumber(post.ttl);
    post.workProved = utils.hexToNumber(post.workProved);
    // post.payloadRaw = post.payload;
    // post.payload = utils.hexToAscii(post.payload);

    // if (utils.isJson(post.payload)) {
    //     post.payload = JSON.parse(post.payload);
    // }

    // format the following options
    if (!post.topics) {
        post.topics = [];
    }
    post.topics = post.topics.map(function(topic){
        return utils.toUtf8(topic);
    });

    return post;
};

var inputAddressFormatter = function (address) {
    var iban = new Iban(address);
    if (iban.isValid() && iban.isDirect()) {
        return iban.toAddress().toLowerCase();
    } else if (utils.isAddress(address)) {
        return '0x' + address.toLowerCase().replace('0x','');
    }
    throw new Error('Provided address "'+ address +'" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can\'t be converted.');
};


var outputSyncingFormatter = function(result) {

    result.startingBlock = utils.hexToNumber(result.startingBlock);
    result.currentBlock = utils.hexToNumber(result.currentBlock);
    result.highestBlock = utils.hexToNumber(result.highestBlock);
    if (result.knownStates) {
        result.knownStates = utils.hexToNumber(result.knownStates);
        result.pulledStates = utils.hexToNumber(result.pulledStates);
    }

    return result;
};

module.exports = {
    inputDefaultBlockNumberFormatter: inputDefaultBlockNumberFormatter,
    inputBlockNumberFormatter: inputBlockNumberFormatter,
    inputCallFormatter: inputCallFormatter,
    inputTransactionFormatter: inputTransactionFormatter,
    inputAddressFormatter: inputAddressFormatter,
    inputPostFormatter: inputPostFormatter,
    inputLogFormatter: inputLogFormatter,
    inputSignFormatter: inputSignFormatter,
    outputBigNumberFormatter: outputBigNumberFormatter,
    outputTransactionFormatter: outputTransactionFormatter,
    outputTransactionReceiptFormatter: outputTransactionReceiptFormatter,
    outputBlockFormatter: outputBlockFormatter,
    outputLogFormatter: outputLogFormatter,
    outputPostFormatter: outputPostFormatter,
    outputSyncingFormatter: outputSyncingFormatter
};



/***/ }),

/***/ "F2wZ":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */




var _ = __webpack_require__("F/us");
var errors = __webpack_require__("OdSp").errors;
var Jsonrpc = __webpack_require__("Y2yK");
var BatchManager = __webpack_require__("WKtK");
var givenProvider = __webpack_require__("74Te");



    /**
 * It's responsible for passing messages to providers
 * It's also responsible for polling the ethereum node for incoming messages
 * Default poll timeout is 1 second
 * Singleton
 */
var RequestManager = function RequestManager(provider) {
    this.provider = null;
    this.providers = RequestManager.providers;

    this.setProvider(provider);
    this.subscriptions = {};
};



RequestManager.givenProvider = givenProvider;

RequestManager.providers = {
    WebsocketProvider: __webpack_require__("PDys"),
    HttpProvider: __webpack_require__("gUgm"),
    IpcProvider: __webpack_require__("k6B8")
};



/**
 * Should be used to set provider of request manager
 *
 * @method setProvider
 * @param {Object} p
 */
RequestManager.prototype.setProvider = function (p, net) {
    var _this = this;

    // autodetect provider
    if(p && typeof p === 'string' && this.providers) {

        // HTTP
        if(/^http(s)?:\/\//i.test(p)) {
            p = new this.providers.HttpProvider(p);

            // WS
        } else if(/^ws(s)?:\/\//i.test(p)) {
            p = new this.providers.WebsocketProvider(p);

            // IPC
        } else if(p && typeof net === 'object'  && typeof net.connect === 'function') {
            p = new this.providers.IpcProvider(p, net);

        } else if(p) {
            throw new Error('Can\'t autodetect provider for "'+ p +'"');
        }
    }

    // reset the old one before changing, if still connected
    if(this.provider && this.provider.connected)
        this.clearSubscriptions();


    this.provider = p || null;

    // listen to incoming notifications
    if(this.provider && this.provider.on) {
        this.provider.on('data', function requestManagerNotification(result, deprecatedResult){
            result = result || deprecatedResult; // this is for possible old providers, which may had the error first handler

            // check for result.method, to prevent old providers errors to pass as result
            if(result.method && _this.subscriptions[result.params.subscription] && _this.subscriptions[result.params.subscription].callback) {
                _this.subscriptions[result.params.subscription].callback(null, result.params.result);
            }
        });
        // TODO add error, end, timeout, connect??
        // this.provider.on('error', function requestManagerNotification(result){
        //     Object.keys(_this.subscriptions).forEach(function(id){
        //         if(_this.subscriptions[id].callback)
        //             _this.subscriptions[id].callback(err);
        //     });
        // }
    }
};


/**
 * Should be used to asynchronously send request
 *
 * @method sendAsync
 * @param {Object} data
 * @param {Function} callback
 */
RequestManager.prototype.send = function (data, callback) {
    callback = callback || function(){};

    if (!this.provider) {
        return callback(errors.InvalidProvider());
    }

    var payload = Jsonrpc.toPayload(data.method, data.params);
    this.provider[this.provider.sendAsync ? 'sendAsync' : 'send'](payload, function (err, result) {
        if(result && result.id && payload.id !== result.id) return callback(new Error('Wrong response id "'+ result.id +'" (expected: "'+ payload.id +'") in '+ JSON.stringify(payload)));

        if (err) {
            return callback(err);
        }

        if (result && result.error) {
            return callback(errors.ErrorResponse(result));
        }

        if (!Jsonrpc.isValidResponse(result)) {
            return callback(errors.InvalidResponse(result));
        }

        callback(null, result.result);
    });
};

/**
 * Should be called to asynchronously send batch request
 *
 * @method sendBatch
 * @param {Array} batch data
 * @param {Function} callback
 */
RequestManager.prototype.sendBatch = function (data, callback) {
    if (!this.provider) {
        return callback(errors.InvalidProvider());
    }

    var payload = Jsonrpc.toBatchPayload(data);
    this.provider[this.provider.sendAsync ? 'sendAsync' : 'send'](payload, function (err, results) {
        if (err) {
            return callback(err);
        }

        if (!_.isArray(results)) {
            return callback(errors.InvalidResponse(results));
        }

        callback(null, results);
    });
};


/**
 * Waits for notifications
 *
 * @method addSubscription
 * @param {String} id           the subscription id
 * @param {String} name         the subscription name
 * @param {String} type         the subscription namespace (eth, personal, etc)
 * @param {Function} callback   the callback to call for incoming notifications
 */
RequestManager.prototype.addSubscription = function (id, name, type, callback) {
    if(this.provider.on) {
        this.subscriptions[id] = {
            callback: callback,
            type: type,
            name: name
        };

    } else {
        throw new Error('The provider doesn\'t support subscriptions: '+ this.provider.constructor.name);
    }
};

/**
 * Waits for notifications
 *
 * @method removeSubscription
 * @param {String} id           the subscription id
 * @param {Function} callback   fired once the subscription is removed
 */
RequestManager.prototype.removeSubscription = function (id, callback) {
    var _this = this;

    if(this.subscriptions[id]) {

        this.send({
            method: this.subscriptions[id].type + '_unsubscribe',
            params: [id]
        }, callback);

        // remove subscription
        delete _this.subscriptions[id];
    }
};

/**
 * Should be called to reset the subscriptions
 *
 * @method reset
 */
RequestManager.prototype.clearSubscriptions = function (keepIsSyncing) {
    var _this = this;


    // uninstall all subscriptions
    Object.keys(this.subscriptions).forEach(function(id){
        if(!keepIsSyncing || _this.subscriptions[id].name !== 'syncing')
            _this.removeSubscription(id);
    });


    //  reset notification callbacks etc.
    if(this.provider.reset)
        this.provider.reset();
};

module.exports = {
    Manager: RequestManager,
    BatchManager: BatchManager
};


/***/ }),

/***/ "OdSp":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var errors = __webpack_require__("Xy4I");
var formatters = __webpack_require__("F1/f");

module.exports = {
    errors: errors,
    formatters: formatters
};



/***/ }),

/***/ "PCH3":
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
/**
 * @file extend.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */




var formatters = __webpack_require__("OdSp").formatters;
var Method = __webpack_require__("Ykib");
var utils = __webpack_require__("ETH1");


var extend = function (pckg) {
    /* jshint maxcomplexity:5 */
    var ex = function (extension) {

        var extendedObject;
        if (extension.property) {
            if (!pckg[extension.property]) {
                pckg[extension.property] = {};
            }
            extendedObject = pckg[extension.property];
        } else {
            extendedObject = pckg;
        }

        if (extension.methods) {
            extension.methods.forEach(function (method) {
                if(!(method instanceof Method)) {
                    method = new Method(method);
                }

                method.attachToObject(extendedObject);
                method.setRequestManager(pckg._requestManager);
            });
        }

        return pckg;
    };

    ex.formatters = formatters;
    ex.utils = utils;
    ex.Method = Method;

    return ex;
};



module.exports = extend;



/***/ }),

/***/ "SSMb":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var Subscription = __webpack_require__("4lM6");


var Subscriptions = function Subscriptions(options) {
    this.name = options.name;
    this.type = options.type;
    this.subscriptions = options.subscriptions || {};
    this.requestManager = null;
};


Subscriptions.prototype.setRequestManager = function (rm) {
    this.requestManager = rm;
};


Subscriptions.prototype.attachToObject = function (obj) {
    var func = this.buildCall();
    var name = this.name.split('.');
    if (name.length > 1) {
        obj[name[0]] = obj[name[0]] || {};
        obj[name[0]][name[1]] = func;
    } else {
        obj[name[0]] = func;
    }
};


Subscriptions.prototype.buildCall = function() {
    var _this = this;

    return function(){
        if(!_this.subscriptions[arguments[0]]) {
            console.warn('Subscription '+ JSON.stringify(arguments[0]) +' doesn\'t exist. Subscribing anyway.');
        }

        var subscription = new Subscription({
            subscription: _this.subscriptions[arguments[0]],
            requestManager: _this.requestManager,
            type: _this.type
        });

        return subscription.subscribe.apply(subscription, arguments);
    };
};


module.exports = {
    subscriptions: Subscriptions,
    subscription: Subscription
};


/***/ }),

/***/ "VWKx":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2016
 */



var EventEmitter = __webpack_require__("uhBA");
var Promise = __webpack_require__("m6mq");

/**
 * This function generates a defer promise and adds eventEmitter functionality to it
 *
 * @method eventifiedPromise
 */
var PromiEvent = function PromiEvent(justPromise) {
    var resolve, reject,
        eventEmitter = new Promise(function() {
            resolve = arguments[0];
            reject = arguments[1];
        });

    if(justPromise) {
        return {
            resolve: resolve,
            reject: reject,
            eventEmitter: eventEmitter
        };
    }

    // get eventEmitter
    var emitter = new EventEmitter();

    // add eventEmitter to the promise
    eventEmitter._events = emitter._events;
    eventEmitter.emit = emitter.emit;
    eventEmitter.on = emitter.on;
    eventEmitter.once = emitter.once;
    eventEmitter.off = emitter.off;
    eventEmitter.listeners = emitter.listeners;
    eventEmitter.addListener = emitter.addListener;
    eventEmitter.removeListener = emitter.removeListener;
    eventEmitter.removeAllListeners = emitter.removeAllListeners;

    return {
        resolve: resolve,
        reject: reject,
        eventEmitter: eventEmitter
    };
};

PromiEvent.resolve = function(value) {
    var promise = PromiEvent(true);
    promise.resolve(value);
    return promise.eventEmitter;
};

module.exports = PromiEvent;


/***/ }),

/***/ "WKtK":
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
/**
 * @file batch.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */



var Jsonrpc = __webpack_require__("Y2yK");
var errors = __webpack_require__("OdSp").errors;

var Batch = function (requestManager) {
    this.requestManager = requestManager;
    this.requests = [];
};

/**
 * Should be called to add create new request to batch request
 *
 * @method add
 * @param {Object} jsonrpc requet object
 */
Batch.prototype.add = function (request) {
    this.requests.push(request);
};

/**
 * Should be called to execute batch request
 *
 * @method execute
 */
Batch.prototype.execute = function () {
    var requests = this.requests;
    this.requestManager.sendBatch(requests, function (err, results) {
        results = results || [];
        requests.map(function (request, index) {
            return results[index] || {};
        }).forEach(function (result, index) {
            if (requests[index].callback) {
                if (result && result.error) {
                    return requests[index].callback(errors.ErrorResponse(result));
                }

                if (!Jsonrpc.isValidResponse(result)) {
                    return requests[index].callback(errors.InvalidResponse(result));
                }

                try {
                    requests[index].callback(null, requests[index].format ? requests[index].format(result.result) : result.result);
                } catch (err) {
                    requests[index].callback(err);
                }
            }
        });
    });
};

module.exports = Batch;



/***/ }),

/***/ "Xy4I":
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
/**
 * @file errors.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2017
 */



module.exports = {
    ErrorResponse: function (result) {
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : JSON.stringify(result);
        return new Error('Returned error: ' + message);
    },
    InvalidNumberOfParams: function (got, expected, method) {
        return new Error('Invalid number of parameters for "'+ method +'". Got '+ got +' expected '+ expected +'!');
    },
    InvalidConnection: function (host){
        return new Error('CONNECTION ERROR: Couldn\'t connect to node '+ host +'.');
    },
    InvalidProvider: function () {
        return new Error('Provider not set or invalid');
    },
    InvalidResponse: function (result){
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
        return new Error(message);
    },
    ConnectionTimeout: function (ms){
        return new Error('CONNECTION TIMEOUT: timeout of ' + ms + ' ms achived');
    }
};


/***/ }),

/***/ "Y2yK":
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
/** @file jsonrpc.js
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Aaron Kumavis <aaron@kumavis.me>
 * @date 2015
 */



// Initialize Jsonrpc as a simple object with utility functions.
var Jsonrpc = {
    messageId: 0
};

/**
 * Should be called to valid json create payload object
 *
 * @method toPayload
 * @param {Function} method of jsonrpc call, required
 * @param {Array} params, an array of method params, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.toPayload = function (method, params) {
    if (!method) {
        throw new Error('JSONRPC method should be specified for params: "'+ JSON.stringify(params) +'"!');
    }

    // advance message ID
    Jsonrpc.messageId++;

    return {
        jsonrpc: '2.0',
        id: Jsonrpc.messageId,
        method: method,
        params: params || []
    };
};

/**
 * Should be called to check if jsonrpc response is valid
 *
 * @method isValidResponse
 * @param {Object}
 * @returns {Boolean} true if response is valid, otherwise false
 */
Jsonrpc.isValidResponse = function (response) {
    return Array.isArray(response) ? response.every(validateSingleMessage) : validateSingleMessage(response);

    function validateSingleMessage(message){
      return !!message &&
        !message.error &&
        message.jsonrpc === '2.0' &&
        (typeof message.id === 'number' || typeof message.id === 'string') &&
        message.result !== undefined; // only undefined is not valid json object
    }
};

/**
 * Should be called to create batch payload object
 *
 * @method toBatchPayload
 * @param {Array} messages, an array of objects with method (required) and params (optional) fields
 * @returns {Array} batch payload
 */
Jsonrpc.toBatchPayload = function (messages) {
    return messages.map(function (message) {
        return Jsonrpc.toPayload(message.method, message.params);
    });
};

module.exports = Jsonrpc;



/***/ }),

/***/ "Ykib":
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
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2017
 */



var _ = __webpack_require__("F/us");
var errors = __webpack_require__("OdSp").errors;
var formatters = __webpack_require__("OdSp").formatters;
var utils = __webpack_require__("ETH1");
var promiEvent = __webpack_require__("VWKx");
var Subscriptions = __webpack_require__("SSMb").subscriptions;

var TIMEOUTBLOCK = 50;
var POLLINGTIMEOUT = 15 * TIMEOUTBLOCK; // ~average block time (seconds) * TIMEOUTBLOCK
var CONFIRMATIONBLOCKS = 24;

var Method = function Method(options) {

    if(!options.call || !options.name) {
        throw new Error('When creating a method you need to provide at least the "name" and "call" property.');
    }

    this.name = options.name;
    this.call = options.call;
    this.params = options.params || 0;
    this.inputFormatter = options.inputFormatter;
    this.outputFormatter = options.outputFormatter;
    this.transformPayload = options.transformPayload;
    this.extraFormatters = options.extraFormatters;

    this.requestManager = options.requestManager;

    // reference to eth.accounts
    this.accounts = options.accounts;

    this.defaultBlock = options.defaultBlock || 'latest';
    this.defaultAccount = options.defaultAccount || null;
};

Method.prototype.setRequestManager = function (requestManager, accounts) {
    this.requestManager = requestManager;

    // reference to eth.accounts
    if (accounts) {
        this.accounts = accounts;
    }

};

Method.prototype.createFunction = function (requestManager, accounts) {
    var func = this.buildCall();
    func.call = this.call;

    this.setRequestManager(requestManager || this.requestManager, accounts || this.accounts);

    return func;
};

Method.prototype.attachToObject = function (obj) {
    var func = this.buildCall();
    func.call = this.call;
    var name = this.name.split('.');
    if (name.length > 1) {
        obj[name[0]] = obj[name[0]] || {};
        obj[name[0]][name[1]] = func;
    } else {
        obj[name[0]] = func;
    }
};

/**
 * Should be used to determine name of the jsonrpc method based on arguments
 *
 * @method getCall
 * @param {Array} arguments
 * @return {String} name of jsonrpc method
 */
Method.prototype.getCall = function (args) {
    return _.isFunction(this.call) ? this.call(args) : this.call;
};

/**
 * Should be used to extract callback from array of arguments. Modifies input param
 *
 * @method extractCallback
 * @param {Array} arguments
 * @return {Function|Null} callback, if exists
 */
Method.prototype.extractCallback = function (args) {
    if (_.isFunction(args[args.length - 1])) {
        return args.pop(); // modify the args array!
    }
};

/**
 * Should be called to check if the number of arguments is correct
 *
 * @method validateArgs
 * @param {Array} arguments
 * @throws {Error} if it is not
 */
Method.prototype.validateArgs = function (args) {
    if (args.length !== this.params) {
        throw errors.InvalidNumberOfParams(args.length, this.params, this.name);
    }
};

/**
 * Should be called to format input args of method
 *
 * @method formatInput
 * @param {Array}
 * @return {Array}
 */
Method.prototype.formatInput = function (args) {
    var _this = this;

    if (!this.inputFormatter) {
        return args;
    }

    return this.inputFormatter.map(function (formatter, index) {
        // bind this for defaultBlock, and defaultAccount
        return formatter ? formatter.call(_this, args[index]) : args[index];
    });
};

/**
 * Should be called to format output(result) of method
 *
 * @method formatOutput
 * @param {Object}
 * @return {Object}
 */
Method.prototype.formatOutput = function (result) {
    var _this = this;

    if(_.isArray(result)) {
        return result.map(function(res){
            return _this.outputFormatter && res ? _this.outputFormatter(res) : res;
        });
    } else {
        return this.outputFormatter && result ? this.outputFormatter(result) : result;
    }
};

/**
 * Should create payload from given input args
 *
 * @method toPayload
 * @param {Array} args
 * @return {Object}
 */
Method.prototype.toPayload = function (args) {
    var call = this.getCall(args);
    var callback = this.extractCallback(args);
    var params = this.formatInput(args);
    this.validateArgs(params);

    var payload = {
        method: call,
        params: params,
        callback: callback
    };

    if (this.transformPayload) {
        payload = this.transformPayload(payload);
    }

    return payload;
};


Method.prototype._confirmTransaction = function (defer, result, payload) {
    var method = this,
        promiseResolved = false,
        canUnsubscribe = true,
        timeoutCount = 0,
        confirmationCount = 0,
        intervalId = null,
        receiptJSON = '',
        gasProvided = (_.isObject(payload.params[0]) && payload.params[0].gas) ? payload.params[0].gas : null,
        isContractDeployment = _.isObject(payload.params[0]) &&
            payload.params[0].data &&
            payload.params[0].from &&
            !payload.params[0].to;

    // add custom send Methods
    var _ethereumCalls = [
        new Method({
            name: 'getTransactionReceipt',
            call: 'eth_getTransactionReceipt',
            params: 1,
            inputFormatter: [null],
            outputFormatter: formatters.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getCode',
            call: 'eth_getCode',
            params: 2,
            inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter]
        }),
        new Subscriptions({
            name: 'subscribe',
            type: 'eth',
            subscriptions: {
                'newBlockHeaders': {
                    subscriptionName: 'newHeads', // replace subscription with this name
                    params: 0,
                    outputFormatter: formatters.outputBlockFormatter
                }
            }
        })
    ];
    // attach methods to this._ethereumCall
    var _ethereumCall = {};
    _.each(_ethereumCalls, function (mthd) {
        mthd.attachToObject(_ethereumCall);
        mthd.requestManager = method.requestManager; // assign rather than call setRequestManager()
    });


    // fire "receipt" and confirmation events and resolve after
    var checkConfirmation = function (existingReceipt, isPolling, err, blockHeader, sub) {
        if (!err) {
            // create fake unsubscribe
            if (!sub) {
                sub = {
                    unsubscribe: function () {
                        clearInterval(intervalId);
                    }
                };
            }
            // if we have a valid receipt we don't need to send a request
            return (existingReceipt ? promiEvent.resolve(existingReceipt) : _ethereumCall.getTransactionReceipt(result))
            // catch error from requesting receipt
            .catch(function (err) {
                sub.unsubscribe();
                promiseResolved = true;
                utils._fireError({message: 'Failed to check for transaction receipt:', data: err}, defer.eventEmitter, defer.reject);
            })
            // if CONFIRMATION listener exists check for confirmations, by setting canUnsubscribe = false
            .then(function(receipt) {
                if (!receipt || !receipt.blockHash) {
                    throw new Error('Receipt missing or blockHash null');
                }

                // apply extra formatters
                if (method.extraFormatters && method.extraFormatters.receiptFormatter) {
                    receipt = method.extraFormatters.receiptFormatter(receipt);
                }

                // check if confirmation listener exists
                if (defer.eventEmitter.listeners('confirmation').length > 0) {

                    // If there was an immediately retrieved receipt, it's already
                    // been confirmed by the direct call to checkConfirmation needed
                    // for parity instant-seal
                    if (existingReceipt === undefined || confirmationCount !== 0){
                        defer.eventEmitter.emit('confirmation', confirmationCount, receipt);
                    }

                    canUnsubscribe = false;
                    confirmationCount++;

                    if (confirmationCount === CONFIRMATIONBLOCKS + 1) { // add 1 so we account for conf 0
                        sub.unsubscribe();
                        defer.eventEmitter.removeAllListeners();
                    }
                }

                return receipt;
            })
            // CHECK for CONTRACT DEPLOYMENT
            .then(function(receipt) {

                if (isContractDeployment && !promiseResolved) {

                    if (!receipt.contractAddress) {

                        if (canUnsubscribe) {
                            sub.unsubscribe();
                            promiseResolved = true;
                        }

                        utils._fireError(new Error('The transaction receipt didn\'t contain a contract address.'), defer.eventEmitter, defer.reject);
                        return;
                    }

                    _ethereumCall.getCode(receipt.contractAddress, function (e, code) {

                        if (!code) {
                            return;
                        }


                        if (code.length > 2) {
                            defer.eventEmitter.emit('receipt', receipt);

                            // if contract, return instance instead of receipt
                            if (method.extraFormatters && method.extraFormatters.contractDeployFormatter) {
                                defer.resolve(method.extraFormatters.contractDeployFormatter(receipt));
                            } else {
                                defer.resolve(receipt);
                            }

                            // need to remove listeners, as they aren't removed automatically when succesfull
                            if (canUnsubscribe) {
                                defer.eventEmitter.removeAllListeners();
                            }

                        } else {
                            utils._fireError(new Error('The contract code couldn\'t be stored, please check your gas limit.'), defer.eventEmitter, defer.reject);
                        }

                        if (canUnsubscribe) {
                            sub.unsubscribe();
                        }
                        promiseResolved = true;
                    });
                }

                return receipt;
            })
            // CHECK for normal tx check for receipt only
            .then(function(receipt) {

                if (!isContractDeployment && !promiseResolved) {

                    if(!receipt.outOfGas &&
                        (!gasProvided || gasProvided !== receipt.gasUsed) &&
                        (receipt.status === true || receipt.status === '0x1' || typeof receipt.status === 'undefined')) {
                        defer.eventEmitter.emit('receipt', receipt);
                        defer.resolve(receipt);

                        // need to remove listeners, as they aren't removed automatically when succesfull
                        if (canUnsubscribe) {
                            defer.eventEmitter.removeAllListeners();
                        }

                    } else {
                        receiptJSON = JSON.stringify(receipt, null, 2);
                        if (receipt.status === false || receipt.status === '0x0') {
                            utils._fireError(new Error("Transaction has been reverted by the EVM:\n" + receiptJSON),
                                defer.eventEmitter, defer.reject);
                        } else {
                            utils._fireError(
                                new Error("Transaction ran out of gas. Please provide more gas:\n" + receiptJSON),
                                defer.eventEmitter, defer.reject);
                        }
                    }

                    if (canUnsubscribe) {
                        sub.unsubscribe();
                    }
                    promiseResolved = true;
                }

            })
            // time out the transaction if not mined after 50 blocks
            .catch(function () {
                timeoutCount++;

                // check to see if we are http polling
                if(!!isPolling) {
                    // polling timeout is different than TIMEOUTBLOCK blocks since we are triggering every second
                    if (timeoutCount - 1 >= POLLINGTIMEOUT) {
                        sub.unsubscribe();
                        promiseResolved = true;
                        utils._fireError(new Error('Transaction was not mined within' + POLLINGTIMEOUT + ' seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!'), defer.eventEmitter, defer.reject);
                    }
                } else {
                    if (timeoutCount - 1 >= TIMEOUTBLOCK) {
                        sub.unsubscribe();
                        promiseResolved = true;
                        utils._fireError(new Error('Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!'), defer.eventEmitter, defer.reject);
                    }
                }
            });


        } else {
            sub.unsubscribe();
            promiseResolved = true;
            utils._fireError({message: 'Failed to subscribe to new newBlockHeaders to confirm the transaction receipts.', data: err}, defer.eventEmitter, defer.reject);
        }
    };

    // start watching for confirmation depending on the support features of the provider
    var startWatching = function(existingReceipt) {
        // if provider allows PUB/SUB
        if (_.isFunction(this.requestManager.provider.on)) {
            _ethereumCall.subscribe('newBlockHeaders', checkConfirmation.bind(null, existingReceipt, false));
        } else {
            intervalId = setInterval(checkConfirmation.bind(null, existingReceipt, true), 1000);
        }
    }.bind(this);


    // first check if we already have a confirmed transaction
    _ethereumCall.getTransactionReceipt(result)
    .then(function(receipt) {
        if (receipt && receipt.blockHash) {
            if (defer.eventEmitter.listeners('confirmation').length > 0) {
                // We must keep on watching for new Blocks, if a confirmation listener is present
                startWatching(receipt);
            }
            checkConfirmation(receipt, false);

        } else if (!promiseResolved) {
            startWatching();
        }
    })
    .catch(function(){
        if (!promiseResolved) startWatching();
    });

};


var getWallet = function(from, accounts) {
    var wallet = null;

    // is index given
    if (_.isNumber(from)) {
        wallet = accounts.wallet[from];

        // is account given
    } else if (_.isObject(from) && from.address && from.privateKey) {
        wallet = from;

        // search in wallet for address
    } else {
        wallet = accounts.wallet[from.toLowerCase()];
    }

    return wallet;
};

Method.prototype.buildCall = function() {
    var method = this,
        isSendTx = (method.call === 'eth_sendTransaction' || method.call === 'eth_sendRawTransaction'); // || method.call === 'personal_sendTransaction'

    // actual send function
    var send = function () {
        var defer = promiEvent(!isSendTx),
            payload = method.toPayload(Array.prototype.slice.call(arguments));


        // CALLBACK function
        var sendTxCallback = function (err, result) {
            try {
                result = method.formatOutput(result);
            } catch(e) {
                err = e;
            }

            if (result instanceof Error) {
                err = result;
            }

            if (!err) {
                if (payload.callback) {
                    payload.callback(null, result);
                }
            } else {
                if(err.error) {
                    err = err.error;
                }

                return utils._fireError(err, defer.eventEmitter, defer.reject, payload.callback);
            }

            // return PROMISE
            if (!isSendTx) {

                if (!err) {
                    defer.resolve(result);

                }

                // return PROMIEVENT
            } else {
                defer.eventEmitter.emit('transactionHash', result);

                method._confirmTransaction(defer, result, payload);
            }

        };

        // SENDS the SIGNED SIGNATURE
        var sendSignedTx = function(sign){

            var signedPayload = _.extend({}, payload, {
                method: 'eth_sendRawTransaction',
                params: [sign.rawTransaction]
            });

            method.requestManager.send(signedPayload, sendTxCallback);
        };


        var sendRequest = function(payload, method) {

            if (method && method.accounts && method.accounts.wallet && method.accounts.wallet.length) {
                var wallet;

                // ETH_SENDTRANSACTION
                if (payload.method === 'eth_sendTransaction') {
                    var tx = payload.params[0];
                    wallet = getWallet((_.isObject(tx)) ? tx.from : null, method.accounts);


                    // If wallet was found, sign tx, and send using sendRawTransaction
                    if (wallet && wallet.privateKey) {
                        return method.accounts.signTransaction(_.omit(tx, 'from'), wallet.privateKey).then(sendSignedTx);
                    }

                    // ETH_SIGN
                } else if (payload.method === 'eth_sign') {
                    var data = payload.params[1];
                    wallet = getWallet(payload.params[0], method.accounts);

                    // If wallet was found, sign tx, and send using sendRawTransaction
                    if (wallet && wallet.privateKey) {
                        var sign = method.accounts.sign(data, wallet.privateKey);

                        if (payload.callback) {
                            payload.callback(null, sign.signature);
                        }

                        defer.resolve(sign.signature);
                        return;
                    }


                }
            }

            return method.requestManager.send(payload, sendTxCallback);
        };

        // Send the actual transaction
        if(isSendTx && _.isObject(payload.params[0]) && typeof payload.params[0].gasPrice === 'undefined') {

            var getGasPrice = (new Method({
                name: 'getGasPrice',
                call: 'eth_gasPrice',
                params: 0
            })).createFunction(method.requestManager);

            getGasPrice(function (err, gasPrice) {

                if (gasPrice) {
                    payload.params[0].gasPrice = gasPrice;
                }
                sendRequest(payload, method);
            });

        } else {
            sendRequest(payload, method);
        }


        return defer.eventEmitter;
    };

    // necessary to attach things to the method
    send.method = method;
    // necessary for batch requests
    send.request = this.request.bind(this);
    return send;
};

/**
 * Should be called to create the pure JSONRPC request which can be used in a batch request
 *
 * @method request
 * @return {Object} jsonrpc request
 */
Method.prototype.request = function () {
    var payload = this.toPayload(Array.prototype.slice.call(arguments));
    payload.format = this.formatOutput.bind(this);
    return payload;
};

module.exports = Method;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLXN1YnNjcmlwdGlvbnMvc3JjL3N1YnNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLXJlcXVlc3RtYW5hZ2VyL3NyYy9naXZlblByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWNvcmUvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWNvcmUtaGVscGVycy9zcmMvZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLXJlcXVlc3RtYW5hZ2VyL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLWhlbHBlcnMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWNvcmUvc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLXN1YnNjcmlwdGlvbnMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWNvcmUtcHJvbWlldmVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtY29yZS1yZXF1ZXN0bWFuYWdlci9zcmMvYmF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtY29yZS1oZWxwZXJzL3NyYy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtY29yZS1yZXF1ZXN0bWFuYWdlci9zcmMvanNvbnJwYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1jb3JlLW1ldGhvZC9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsUUFBUSxtQkFBTyxDQUFDLE1BQVk7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLE1BQW1CO0FBQ3hDLG1CQUFtQixtQkFBTyxDQUFDLE1BQWU7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxjQUFjO0FBQzFCOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLE1BQU07QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDbFRBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7O0FDMUZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7QUFHYixxQkFBcUIsbUJBQU8sQ0FBQyxNQUEwQjtBQUN2RCxhQUFhLG1CQUFPLENBQUMsTUFBYTs7QUFFbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7OztBQUdiLFFBQVEsbUJBQU8sQ0FBQyxNQUFZO0FBQzVCLFlBQVksbUJBQU8sQ0FBQyxNQUFZO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxNQUFlOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDO0FBQ0EsS0FBSztBQUNMLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDemJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7QUFHYixRQUFRLG1CQUFPLENBQUMsTUFBWTtBQUM1QixhQUFhLG1CQUFPLENBQUMsTUFBbUI7QUFDeEMsY0FBYyxtQkFBTyxDQUFDLE1BQWM7QUFDcEMsbUJBQW1CLG1CQUFPLENBQUMsTUFBWTtBQUN2QyxvQkFBb0IsbUJBQU8sQ0FBQyxNQUFvQjs7OztBQUloRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyxNQUFtQjtBQUNsRCxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFxQjtBQUMvQyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFvQjtBQUM3Qzs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNyUEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLE1BQVU7QUFDL0IsaUJBQWlCLG1CQUFPLENBQUMsTUFBYzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7OztBQUdiLGlCQUFpQixtQkFBTyxDQUFDLE1BQW1CO0FBQzVDLGFBQWEsbUJBQU8sQ0FBQyxNQUFrQjtBQUN2QyxZQUFZLG1CQUFPLENBQUMsTUFBWTs7O0FBR2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBOzs7Ozs7Ozs7O0FDbkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLE1BQW1COzs7QUFHOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxNQUFlO0FBQzFDLGNBQWMsbUJBQU8sQ0FBQyxNQUFhOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDMUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGNBQWMsbUJBQU8sQ0FBQyxNQUFXO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxNQUFtQjs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7O0FDekVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM5Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsTUFBTTtBQUNqQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7Ozs7Ozs7OztBQ3ZGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFFBQVEsbUJBQU8sQ0FBQyxNQUFZO0FBQzVCLGFBQWEsbUJBQU8sQ0FBQyxNQUFtQjtBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFtQjtBQUM1QyxZQUFZLG1CQUFPLENBQUMsTUFBWTtBQUNoQyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFzQjtBQUMvQyxvQkFBb0IsbUJBQU8sQ0FBQyxNQUF5Qjs7QUFFckQ7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BELEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsK0RBQStEO0FBQ2pHLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7O0FBR2IsU0FBUztBQUNUO0FBQ0E7QUFDQSw4QkFBOEIsc0dBQXNHO0FBQ3BJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVHQUF1Rzs7QUFFdkc7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWIsU0FBUztBQUNUO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJ2ZW5kb3J+ZDI5YzcwZGEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuXG4gICAgd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgd2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICAgIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gICAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICAgIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgc3Vic2NyaXB0aW9uLmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1oZWxwZXJzJykuZXJyb3JzO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcblxuZnVuY3Rpb24gU3Vic2NyaXB0aW9uKG9wdGlvbnMpIHtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBfLmlkZW50aXR5O1xuICAgIHRoaXMuYXJndW1lbnRzID0gbnVsbDtcbiAgICB0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbElkID0gbnVsbDtcblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgc3Vic2NyaXB0aW9uOiBvcHRpb25zLnN1YnNjcmlwdGlvbixcbiAgICAgICAgdHlwZTogb3B0aW9ucy50eXBlLFxuICAgICAgICByZXF1ZXN0TWFuYWdlcjogb3B0aW9ucy5yZXF1ZXN0TWFuYWdlclxuICAgIH07XG59XG5cbi8vIElOSEVSSVRcblN1YnNjcmlwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YnNjcmlwdGlvbjtcblxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIGV4dHJhY3QgY2FsbGJhY2sgZnJvbSBhcnJheSBvZiBhcmd1bWVudHMuIE1vZGlmaWVzIGlucHV0IHBhcmFtXG4gKlxuICogQG1ldGhvZCBleHRyYWN0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3VtZW50c1xuICogQHJldHVybiB7RnVuY3Rpb258TnVsbH0gY2FsbGJhY2ssIGlmIGV4aXN0c1xuICovXG5cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2V4dHJhY3RDYWxsYmFjayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pKSB7XG4gICAgICAgIHJldHVybiBhcmdzLnBvcCgpOyAvLyBtb2RpZnkgdGhlIGFyZ3MgYXJyYXkhXG4gICAgfVxufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGNoZWNrIGlmIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIGlzIGNvcnJlY3RcbiAqXG4gKiBAbWV0aG9kIHZhbGlkYXRlQXJnc1xuICogQHBhcmFtIHtBcnJheX0gYXJndW1lbnRzXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgaXQgaXMgbm90XG4gKi9cblxuU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fdmFsaWRhdGVBcmdzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnN1YnNjcmlwdGlvbjtcblxuICAgIGlmKCFzdWJzY3JpcHRpb24pXG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHt9O1xuXG4gICAgaWYoIXN1YnNjcmlwdGlvbi5wYXJhbXMpXG4gICAgICAgIHN1YnNjcmlwdGlvbi5wYXJhbXMgPSAwO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSBzdWJzY3JpcHRpb24ucGFyYW1zKSB7XG4gICAgICAgIHRocm93IGVycm9ycy5JbnZhbGlkTnVtYmVyT2ZQYXJhbXMoYXJncy5sZW5ndGgsIHN1YnNjcmlwdGlvbi5wYXJhbXMgKyAxLCBhcmdzWzBdKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gZm9ybWF0IGlucHV0IGFyZ3Mgb2YgbWV0aG9kXG4gKlxuICogQG1ldGhvZCBmb3JtYXRJbnB1dFxuICogQHBhcmFtIHtBcnJheX1cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2Zvcm1hdElucHV0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnN1YnNjcmlwdGlvbjtcblxuICAgIGlmICghc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH1cblxuICAgIGlmICghc3Vic2NyaXB0aW9uLmlucHV0Rm9ybWF0dGVyKSB7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXR0ZWRBcmdzID0gc3Vic2NyaXB0aW9uLmlucHV0Rm9ybWF0dGVyLm1hcChmdW5jdGlvbiAoZm9ybWF0dGVyLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0dGVyID8gZm9ybWF0dGVyKGFyZ3NbaW5kZXhdKSA6IGFyZ3NbaW5kZXhdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZEFyZ3M7XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gZm9ybWF0IG91dHB1dChyZXN1bHQpIG9mIG1ldGhvZFxuICpcbiAqIEBtZXRob2QgZm9ybWF0T3V0cHV0XG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5TdWJzY3JpcHRpb24ucHJvdG90eXBlLl9mb3JtYXRPdXRwdXQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucy5zdWJzY3JpcHRpb247XG5cbiAgICByZXR1cm4gKHN1YnNjcmlwdGlvbiAmJiBzdWJzY3JpcHRpb24ub3V0cHV0Rm9ybWF0dGVyICYmIHJlc3VsdCkgPyBzdWJzY3JpcHRpb24ub3V0cHV0Rm9ybWF0dGVyKHJlc3VsdCkgOiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFNob3VsZCBjcmVhdGUgcGF5bG9hZCBmcm9tIGdpdmVuIGlucHV0IGFyZ3NcbiAqXG4gKiBAbWV0aG9kIHRvUGF5bG9hZFxuICogQHBhcmFtIHtBcnJheX0gYXJnc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5TdWJzY3JpcHRpb24ucHJvdG90eXBlLl90b1BheWxvYWQgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrID0gdGhpcy5fZXh0cmFjdENhbGxiYWNrKGFyZ3MpIHx8IF8uaWRlbnRpdHk7XG5cbiAgICBpZiAoIXRoaXMuc3Vic2NyaXB0aW9uTWV0aG9kKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uTWV0aG9kID0gYXJncy5zaGlmdCgpO1xuXG4gICAgICAgIC8vIHJlcGxhY2Ugc3Vic2NyaXB0aW9uIHdpdGggZ2l2ZW4gbmFtZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN1YnNjcmlwdGlvbi5zdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbk1ldGhvZCA9IHRoaXMub3B0aW9ucy5zdWJzY3JpcHRpb24uc3Vic2NyaXB0aW9uTmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5hcmd1bWVudHMpIHtcbiAgICAgICAgdGhpcy5hcmd1bWVudHMgPSB0aGlzLl9mb3JtYXRJbnB1dChhcmdzKTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVBcmdzKHRoaXMuYXJndW1lbnRzKTtcbiAgICAgICAgYXJncyA9IFtdOyAvLyBtYWtlIGVtcHR5IGFmdGVyIHZhbGlkYXRpb25cblxuICAgIH1cblxuICAgIC8vIHJlLWFkZCBzdWJzY3JpcHRpb25OYW1lXG4gICAgcGFyYW1zLnB1c2godGhpcy5zdWJzY3JpcHRpb25NZXRob2QpO1xuICAgIHBhcmFtcyA9IHBhcmFtcy5jb25jYXQodGhpcy5hcmd1bWVudHMpO1xuXG5cbiAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGEgY2FsbGJhY2sgaXMgYWxsb3dlZCBhcyBwYXJhbWV0ZXIgb24gYW4gYWxyZWFkeSBpbnN0YW50aWF0ZWQgc3Vic2NyaXB0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGhvZDogdGhpcy5vcHRpb25zLnR5cGUgKyAnX3N1YnNjcmliZScsXG4gICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgfTtcbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmVzIGFuZCBjbGVhcnMgY2FsbGJhY2tzXG4gKlxuICogQG1ldGhvZCB1bnN1YnNjcmliZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5TdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9wdGlvbnMucmVxdWVzdE1hbmFnZXIucmVtb3ZlU3Vic2NyaXB0aW9uKHRoaXMuaWQsIGNhbGxiYWNrKTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fcmVjb25uZWN0SW50ZXJ2YWxJZCk7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXMgYW5kIHdhdGNoZXMgZm9yIGNoYW5nZXNcbiAqXG4gKiBAbWV0aG9kIHN1YnNjcmliZVxuICogQHBhcmFtIHtTdHJpbmd9IHN1YnNjcmlwdGlvbiB0aGUgc3Vic2NyaXB0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB0aGUgb3B0aW9ucyBvYmplY3Qgd2l0aCBhZGRyZXNzIHRvcGljcyBhbmQgZnJvbUJsb2NrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl90b1BheWxvYWQoYXJncyk7XG5cbiAgICBpZighcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZighdGhpcy5vcHRpb25zLnJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyKSB7XG4gICAgICAgIHZhciBlcnIxID0gbmV3IEVycm9yKCdObyBwcm92aWRlciBzZXQuJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZXJyMSwgbnVsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgZXJyb3IsIGlmIHByb3ZpZGVyIGRvZXNudCBzdXBwb3J0IHN1YnNjcmlwdGlvbnNcbiAgICBpZighdGhpcy5vcHRpb25zLnJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyLm9uKSB7XG4gICAgICAgIHZhciBlcnIyID0gbmV3IEVycm9yKCdUaGUgY3VycmVudCBwcm92aWRlciBkb2VzblxcJ3Qgc3VwcG9ydCBzdWJzY3JpcHRpb25zOiAnKyB0aGlzLm9wdGlvbnMucmVxdWVzdE1hbmFnZXIucHJvdmlkZXIuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZXJyMiwgbnVsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gaWYgaWQgaXMgdGhlcmUgdW5zdWJzY3JpYmUgZmlyc3RcbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLy8gc3RvcmUgdGhlIHBhcmFtcyBpbiB0aGUgb3B0aW9ucyBvYmplY3RcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zID0gcGF5bG9hZC5wYXJhbXNbMV07XG5cbiAgICAvLyBnZXQgcGFzdCBsb2dzLCBpZiBmcm9tQmxvY2sgaXMgYXZhaWxhYmxlXG4gICAgaWYocGF5bG9hZC5wYXJhbXNbMF0gPT09ICdsb2dzJyAmJiBfLmlzT2JqZWN0KHBheWxvYWQucGFyYW1zWzFdKSAmJiBwYXlsb2FkLnBhcmFtc1sxXS5oYXNPd25Qcm9wZXJ0eSgnZnJvbUJsb2NrJykgJiYgaXNGaW5pdGUocGF5bG9hZC5wYXJhbXNbMV0uZnJvbUJsb2NrKSkge1xuICAgICAgICAvLyBzZW5kIHRoZSBzdWJzY3JpcHRpb24gcmVxdWVzdFxuICAgICAgICB0aGlzLm9wdGlvbnMucmVxdWVzdE1hbmFnZXIuc2VuZCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdldGhfZ2V0TG9ncycsXG4gICAgICAgICAgICBwYXJhbXM6IFtwYXlsb2FkLnBhcmFtc1sxXV1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVyciwgbG9ncykge1xuICAgICAgICAgICAgaWYoIWVycikge1xuICAgICAgICAgICAgICAgIGxvZ3MuZm9yRWFjaChmdW5jdGlvbihsb2cpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gX3RoaXMuX2Zvcm1hdE91dHB1dChsb2cpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jYWxsYmFjayhudWxsLCBvdXRwdXQsIF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZW1pdCgnZGF0YScsIG91dHB1dCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPIHN1YnNjcmliZSBoZXJlPyBhZnRlciB0aGUgcGFzdCBsb2dzP1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmNhbGxiYWNrKGVyciwgbnVsbCwgX3RoaXMpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHN1YnNjcmlwdGlvblxuICAgIC8vIFRPRE8gbW92ZSB0byBzZXBhcmF0ZSBmdW5jdGlvbj8gc28gdGhhdCBwYXN0IGxvZ3MgY2FuIGdvIGZpcnN0P1xuXG4gICAgaWYodHlwZW9mIHBheWxvYWQucGFyYW1zWzFdID09PSAnb2JqZWN0JylcbiAgICAgICAgZGVsZXRlIHBheWxvYWQucGFyYW1zWzFdLmZyb21CbG9jaztcblxuICAgIHRoaXMub3B0aW9ucy5yZXF1ZXN0TWFuYWdlci5zZW5kKHBheWxvYWQsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZighZXJyICYmIHJlc3VsdCkge1xuICAgICAgICAgICAgX3RoaXMuaWQgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgY2FsbGJhY2sgb24gbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgX3RoaXMub3B0aW9ucy5yZXF1ZXN0TWFuYWdlci5hZGRTdWJzY3JpcHRpb24oX3RoaXMuaWQsIHBheWxvYWQucGFyYW1zWzBdICwgX3RoaXMub3B0aW9ucy50eXBlLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW3Jlc3VsdF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChmdW5jdGlvbihyZXN1bHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gX3RoaXMuX2Zvcm1hdE91dHB1dChyZXN1bHRJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihfdGhpcy5vcHRpb25zLnN1YnNjcmlwdGlvbi5zdWJzY3JpcHRpb25IYW5kbGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5vcHRpb25zLnN1YnNjcmlwdGlvbi5zdWJzY3JpcHRpb25IYW5kbGVyLmNhbGwoX3RoaXMsIG91dHB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoJ2RhdGEnLCBvdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBjYWxsYmFjaywgbGFzdCBzbyB0aGF0IHVuc3Vic2NyaWJlIHRoZXJlIHdvbid0IGFmZmVjdCB0aGUgZW1pdCBhYm92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2sobnVsbCwgb3V0cHV0LCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuc3Vic2NyaWJlLCBidXQga2VlcCBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0aW9ucy5yZXF1ZXN0TWFuYWdlci5yZW1vdmVTdWJzY3JpcHRpb24oX3RoaXMuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlLXN1YnNjcmliZSwgaWYgY29ubmVjdGlvbiBmYWlsc1xuICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5vcHRpb25zLnJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyLm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZWNvbm5lY3RJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gY2hlY2sgaWYgdGhhdCBtYWtlcyBzZW5zZSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5yZXF1ZXN0TWFuYWdlci5wcm92aWRlci5yZWNvbm5lY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0aW9ucy5yZXF1ZXN0TWFuYWdlci5wcm92aWRlci5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25zLnJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyLm9uY2UoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5fcmVjb25uZWN0SW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKF90aGlzLmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgY2FsbGJhY2ssIGxhc3Qgc28gdGhhdCB1bnN1YnNjcmliZSB0aGVyZSB3b24ndCBhZmZlY3QgdGhlIGVtaXQgYWJvdmVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2soZXJyLCBudWxsLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuY2FsbGJhY2soZXJyLCBudWxsLCBfdGhpcyk7XG4gICAgICAgICAgX3RoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyByZXR1cm4gYW4gb2JqZWN0IHRvIGNhbmNlbCB0aGUgc3Vic2NyaXB0aW9uXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YnNjcmlwdGlvbjtcbiIsIi8qXG4gVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuLyoqXG4gKiBAZmlsZSBnaXZlblByb3ZpZGVyLmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnaXZlblByb3ZpZGVyID0gbnVsbDtcblxuLy8gQUREIEdJVkVOIFBST1ZJREVSXG4vKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG52YXIgZ2xvYmFsO1xudHJ5IHtcbiAgZ2xvYmFsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn0gY2F0Y2ggKGUpIHtcbiAgZ2xvYmFsID0gd2luZG93O1xufVxuXG4vLyBFdGhlcmV1bVByb3ZpZGVyXG5pZih0eXBlb2YgZ2xvYmFsLmV0aGVyZXVtUHJvdmlkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZ2l2ZW5Qcm92aWRlciA9IGdsb2JhbC5ldGhlcmV1bVByb3ZpZGVyO1xuXG4vLyBMZWdhY3kgd2ViMy5jdXJyZW50UHJvdmlkZXJcbn0gZWxzZSBpZih0eXBlb2YgZ2xvYmFsLndlYjMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC53ZWIzLmN1cnJlbnRQcm92aWRlcikge1xuXG4gICAgaWYoZ2xvYmFsLndlYjMuY3VycmVudFByb3ZpZGVyLnNlbmRBc3luYykge1xuICAgICAgICBnbG9iYWwud2ViMy5jdXJyZW50UHJvdmlkZXIuc2VuZCA9IGdsb2JhbC53ZWIzLmN1cnJlbnRQcm92aWRlci5zZW5kQXN5bmM7XG4gICAgICAgIGRlbGV0ZSBnbG9iYWwud2ViMy5jdXJyZW50UHJvdmlkZXIuc2VuZEFzeW5jO1xuICAgIH1cblxuICAgIC8vIGlmIGNvbm5lY3Rpb24gaXMgJ2lwY1Byb3ZpZGVyV3JhcHBlcicsIGFkZCBzdWJzY3JpcHRpb24gc3VwcG9ydFxuICAgIGlmKCFnbG9iYWwud2ViMy5jdXJyZW50UHJvdmlkZXIub24gJiZcbiAgICAgICAgZ2xvYmFsLndlYjMuY3VycmVudFByb3ZpZGVyLmNvbm5lY3Rpb24gJiZcbiAgICAgICAgZ2xvYmFsLndlYjMuY3VycmVudFByb3ZpZGVyLmNvbm5lY3Rpb24uY29uc3RydWN0b3IubmFtZSA9PT0gJ2lwY1Byb3ZpZGVyV3JhcHBlcicpIHtcblxuICAgICAgICBnbG9iYWwud2ViMy5jdXJyZW50UHJvdmlkZXIub24gPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHNlY29uZCBwYXJhbWV0ZXIgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuXG4gICAgICAgICAgICBzd2l0Y2godHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbignZGF0YScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcignQ291bGRuXFwndCBwYXJzZSByZXNwb25zZSBkYXRhJysgZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub3RpZmljYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQuaWQgJiYgcmVzdWx0Lm1ldGhvZC5pbmRleE9mKCdfc3Vic2NyaXB0aW9uJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub24odHlwZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnaXZlblByb3ZpZGVyID0gZ2xvYmFsLndlYjMuY3VycmVudFByb3ZpZGVyO1xufVxuLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGdpdmVuUHJvdmlkZXI7XG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciByZXF1ZXN0TWFuYWdlciA9IHJlcXVpcmUoJ3dlYjMtY29yZS1yZXF1ZXN0bWFuYWdlcicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vZXh0ZW5kLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhY2thZ2VJbml0OiBmdW5jdGlvbiAocGtnLCBhcmdzKSB7XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcblxuICAgICAgICBpZiAoIXBrZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBpbnN0YW50aWF0ZSB1c2luZyB0aGUgXCJuZXdcIiBrZXl3b3JkLicpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBtYWtlIHByb3BlcnR5IG9mIHBrZy5fcHJvdmlkZXIsIHdoaWNoIGNhbiBwcm9wZXJseSBzZXQgcHJvdmlkZXJzXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwa2csICdjdXJyZW50UHJvdmlkZXInLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGtnLl9wcm92aWRlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwa2cuc2V0UHJvdmlkZXIodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaW5oZXJpdCBmcm9tIHdlYjMgdW1icmVsbGEgcGFja2FnZVxuICAgICAgICBpZiAoYXJnc1swXSAmJiBhcmdzWzBdLl9yZXF1ZXN0TWFuYWdlcikge1xuICAgICAgICAgICAgcGtnLl9yZXF1ZXN0TWFuYWdlciA9IG5ldyByZXF1ZXN0TWFuYWdlci5NYW5hZ2VyKGFyZ3NbMF0uY3VycmVudFByb3ZpZGVyKTtcblxuICAgICAgICAvLyBzZXQgcmVxdWVzdG1hbmFnZXIgb24gcGFja2FnZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGtnLl9yZXF1ZXN0TWFuYWdlciA9IG5ldyByZXF1ZXN0TWFuYWdlci5NYW5hZ2VyKCk7XG4gICAgICAgICAgICBwa2cuX3JlcXVlc3RNYW5hZ2VyLnNldFByb3ZpZGVyKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGdpdmVuUHJvdmlkZXJcbiAgICAgICAgcGtnLmdpdmVuUHJvdmlkZXIgPSByZXF1ZXN0TWFuYWdlci5NYW5hZ2VyLmdpdmVuUHJvdmlkZXI7XG4gICAgICAgIHBrZy5wcm92aWRlcnMgPSByZXF1ZXN0TWFuYWdlci5NYW5hZ2VyLnByb3ZpZGVycztcblxuICAgICAgICAgcGtnLl9wcm92aWRlciA9ICBwa2cuX3JlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyO1xuXG4gICAgICAgIC8vIGFkZCBTRVRQUk9WSURFUiBmdW5jdGlvbiAoZG9uJ3Qgb3ZlcndyaXRlIGlmIGFscmVhZHkgZXhpc3RpbmcpXG4gICAgICAgIGlmICghcGtnLnNldFByb3ZpZGVyKSB7XG4gICAgICAgICAgICBwa2cuc2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIG5ldCkge1xuICAgICAgICAgICAgICAgIHBrZy5fcmVxdWVzdE1hbmFnZXIuc2V0UHJvdmlkZXIocHJvdmlkZXIsIG5ldCk7XG4gICAgICAgICAgICAgICAgcGtnLl9wcm92aWRlciA9IHBrZy5fcmVxdWVzdE1hbmFnZXIucHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXR0YWNoIGJhdGNoIHJlcXVlc3QgY3JlYXRpb25cbiAgICAgICAgcGtnLkJhdGNoUmVxdWVzdCA9IHJlcXVlc3RNYW5hZ2VyLkJhdGNoTWFuYWdlci5iaW5kKG51bGwsIHBrZy5fcmVxdWVzdE1hbmFnZXIpO1xuXG4gICAgICAgIC8vIGF0dGFjaCBleHRlbmQgZnVuY3Rpb25cbiAgICAgICAgcGtnLmV4dGVuZCA9IGV4dGVuZChwa2cpO1xuICAgIH0sXG4gICAgYWRkUHJvdmlkZXJzOiBmdW5jdGlvbiAocGtnKSB7XG4gICAgICAgIHBrZy5naXZlblByb3ZpZGVyID0gcmVxdWVzdE1hbmFnZXIuTWFuYWdlci5naXZlblByb3ZpZGVyO1xuICAgICAgICBwa2cucHJvdmlkZXJzID0gcmVxdWVzdE1hbmFnZXIuTWFuYWdlci5wcm92aWRlcnM7XG4gICAgfVxufTtcblxuIiwiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuXG4gICAgd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgd2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICAgIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gICAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICAgIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgZm9ybWF0dGVycy5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGF1dGhvciBNYXJlayBLb3Rld2ljeiA8bWFyZWtAcGFyaXR5LmlvPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnd2ViMy11dGlscycpO1xudmFyIEliYW4gPSByZXF1aXJlKCd3ZWIzLWV0aC1pYmFuJyk7XG5cbi8qKlxuICogU2hvdWxkIHRoZSBmb3JtYXQgb3V0cHV0IHRvIGEgYmlnIG51bWJlclxuICpcbiAqIEBtZXRob2Qgb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QmlnTnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9IG9iamVjdFxuICovXG52YXIgb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgIHJldHVybiB1dGlscy50b0JOKG51bWJlcikudG9TdHJpbmcoMTApO1xufTtcblxudmFyIGlzUHJlZGVmaW5lZEJsb2NrTnVtYmVyID0gZnVuY3Rpb24gKGJsb2NrTnVtYmVyKSB7XG4gICAgcmV0dXJuIGJsb2NrTnVtYmVyID09PSAnbGF0ZXN0JyB8fCBibG9ja051bWJlciA9PT0gJ3BlbmRpbmcnIHx8IGJsb2NrTnVtYmVyID09PSAnZWFybGllc3QnO1xufTtcblxudmFyIGlucHV0RGVmYXVsdEJsb2NrTnVtYmVyRm9ybWF0dGVyID0gZnVuY3Rpb24gKGJsb2NrTnVtYmVyKSB7XG4gICAgaWYgKHRoaXMgJiYgKGJsb2NrTnVtYmVyID09PSB1bmRlZmluZWQgfHwgYmxvY2tOdW1iZXIgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRCbG9jaztcbiAgICB9XG4gICAgaWYgKGJsb2NrTnVtYmVyID09PSAnZ2VuZXNpcycgfHwgYmxvY2tOdW1iZXIgPT09ICdlYXJsaWVzdCcpIHtcbiAgICAgICAgcmV0dXJuICcweDAnO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRCbG9ja051bWJlckZvcm1hdHRlcihibG9ja051bWJlcik7XG59O1xuXG52YXIgaW5wdXRCbG9ja051bWJlckZvcm1hdHRlciA9IGZ1bmN0aW9uIChibG9ja051bWJlcikge1xuICAgIGlmIChibG9ja051bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChpc1ByZWRlZmluZWRCbG9ja051bWJlcihibG9ja051bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIGJsb2NrTnVtYmVyO1xuICAgIH1cbiAgICByZXR1cm4gKHV0aWxzLmlzSGV4U3RyaWN0KGJsb2NrTnVtYmVyKSkgPyAoKF8uaXNTdHJpbmcoYmxvY2tOdW1iZXIpKSA/IGJsb2NrTnVtYmVyLnRvTG93ZXJDYXNlKCkgOiBibG9ja051bWJlcikgOiB1dGlscy5udW1iZXJUb0hleChibG9ja051bWJlcik7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGlucHV0IG9mIGEgdHJhbnNhY3Rpb24gYW5kIGNvbnZlcnRzIGFsbCB2YWx1ZXMgdG8gSEVYXG4gKlxuICogQG1ldGhvZCBfdHhJbnB1dEZvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IHRyYW5zYWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIG9iamVjdFxuICovXG52YXIgX3R4SW5wdXRGb3JtYXR0ZXIgPSBmdW5jdGlvbiAob3B0aW9ucyl7XG5cbiAgICBpZiAob3B0aW9ucy50bykgeyAvLyBpdCBtaWdodCBiZSBjb250cmFjdCBjcmVhdGlvblxuICAgICAgICBvcHRpb25zLnRvID0gaW5wdXRBZGRyZXNzRm9ybWF0dGVyKG9wdGlvbnMudG8pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5cXCd0IGhhdmUgXCJkYXRhXCIgYW5kIFwiaW5wdXRcIiBhcyBwcm9wZXJ0aWVzIG9mIHRyYW5zYWN0aW9ucyBhdCB0aGUgc2FtZSB0aW1lLCBwbGVhc2UgdXNlIGVpdGhlciBcImRhdGFcIiBvciBcImlucHV0XCIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlucHV0KSB7XG4gICAgICAgIG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuaW5wdXQ7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmlucHV0O1xuICAgIH1cblxuICAgIGlmKG9wdGlvbnMuZGF0YSAmJiAhdXRpbHMuaXNIZXgob3B0aW9ucy5kYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGZpZWxkIG11c3QgYmUgSEVYIGVuY29kZWQgZGF0YS4nKTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBib3RoXG4gICAgaWYgKG9wdGlvbnMuZ2FzIHx8IG9wdGlvbnMuZ2FzTGltaXQpIHtcbiAgICAgICAgb3B0aW9ucy5nYXMgPSBvcHRpb25zLmdhcyB8fCBvcHRpb25zLmdhc0xpbWl0O1xuICAgIH1cblxuICAgIFsnZ2FzUHJpY2UnLCAnZ2FzJywgJ3ZhbHVlJywgJ25vbmNlJ10uZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgb3B0aW9uc1trZXldID0gdXRpbHMubnVtYmVyVG9IZXgob3B0aW9uc1trZXldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvcHRpb25zO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBpbnB1dCBvZiBhIHRyYW5zYWN0aW9uIGFuZCBjb252ZXJ0cyBhbGwgdmFsdWVzIHRvIEhFWFxuICpcbiAqIEBtZXRob2QgaW5wdXRDYWxsRm9ybWF0dGVyXG4gKiBAcGFyYW0ge09iamVjdH0gdHJhbnNhY3Rpb24gb3B0aW9uc1xuICogQHJldHVybnMgb2JqZWN0XG4qL1xudmFyIGlucHV0Q2FsbEZvcm1hdHRlciA9IGZ1bmN0aW9uIChvcHRpb25zKXtcblxuICAgIG9wdGlvbnMgPSBfdHhJbnB1dEZvcm1hdHRlcihvcHRpb25zKTtcblxuICAgIHZhciBmcm9tID0gb3B0aW9ucy5mcm9tIHx8ICh0aGlzID8gdGhpcy5kZWZhdWx0QWNjb3VudCA6IG51bGwpO1xuXG4gICAgaWYgKGZyb20pIHtcbiAgICAgICAgb3B0aW9ucy5mcm9tID0gaW5wdXRBZGRyZXNzRm9ybWF0dGVyKGZyb20pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGlucHV0IG9mIGEgdHJhbnNhY3Rpb24gYW5kIGNvbnZlcnRzIGFsbCB2YWx1ZXMgdG8gSEVYXG4gKlxuICogQG1ldGhvZCBpbnB1dFRyYW5zYWN0aW9uRm9ybWF0dGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMgb2JqZWN0XG4qL1xudmFyIGlucHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgb3B0aW9ucyA9IF90eElucHV0Rm9ybWF0dGVyKG9wdGlvbnMpO1xuXG4gICAgLy8gY2hlY2sgZnJvbSwgb25seSBpZiBub3QgbnVtYmVyLCBvciBvYmplY3RcbiAgICBpZiAoIV8uaXNOdW1iZXIob3B0aW9ucy5mcm9tKSAmJiAhXy5pc09iamVjdChvcHRpb25zLmZyb20pKSB7XG4gICAgICAgIG9wdGlvbnMuZnJvbSA9IG9wdGlvbnMuZnJvbSB8fCAodGhpcyA/IHRoaXMuZGVmYXVsdEFjY291bnQgOiBudWxsKTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMuZnJvbSAmJiAhXy5pc051bWJlcihvcHRpb25zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzZW5kIHRyYW5zYWN0aW9ucyBcImZyb21cIiBmaWVsZCBtdXN0IGJlIGRlZmluZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLmZyb20gPSBpbnB1dEFkZHJlc3NGb3JtYXR0ZXIob3B0aW9ucy5mcm9tKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5cbi8qKlxuICogSGV4IGVuY29kZXMgdGhlIGRhdGEgcGFzc2VkIHRvIGV0aF9zaWduIGFuZCBwZXJzb25hbF9zaWduXG4gKlxuICogQG1ldGhvZCBpbnB1dFNpZ25Gb3JtYXR0ZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG52YXIgaW5wdXRTaWduRm9ybWF0dGVyID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gKHV0aWxzLmlzSGV4U3RyaWN0KGRhdGEpKSA/IGRhdGEgOiB1dGlscy51dGY4VG9IZXgoZGF0YSk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIG91dHB1dCBvZiBhIHRyYW5zYWN0aW9uIHRvIGl0cyBwcm9wZXIgdmFsdWVzXG4gKlxuICogQG1ldGhvZCBvdXRwdXRUcmFuc2FjdGlvbkZvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IHR4XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuKi9cbnZhciBvdXRwdXRUcmFuc2FjdGlvbkZvcm1hdHRlciA9IGZ1bmN0aW9uICh0eCl7XG4gICAgaWYodHguYmxvY2tOdW1iZXIgIT09IG51bGwpXG4gICAgICAgIHR4LmJsb2NrTnVtYmVyID0gdXRpbHMuaGV4VG9OdW1iZXIodHguYmxvY2tOdW1iZXIpO1xuICAgIGlmKHR4LnRyYW5zYWN0aW9uSW5kZXggIT09IG51bGwpXG4gICAgICAgIHR4LnRyYW5zYWN0aW9uSW5kZXggPSB1dGlscy5oZXhUb051bWJlcih0eC50cmFuc2FjdGlvbkluZGV4KTtcbiAgICB0eC5ub25jZSA9IHV0aWxzLmhleFRvTnVtYmVyKHR4Lm5vbmNlKTtcbiAgICB0eC5nYXMgPSB1dGlscy5oZXhUb051bWJlcih0eC5nYXMpO1xuICAgIHR4Lmdhc1ByaWNlID0gb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyKHR4Lmdhc1ByaWNlKTtcbiAgICB0eC52YWx1ZSA9IG91dHB1dEJpZ051bWJlckZvcm1hdHRlcih0eC52YWx1ZSk7XG5cbiAgICBpZih0eC50byAmJiB1dGlscy5pc0FkZHJlc3ModHgudG8pKSB7IC8vIHR4LnRvIGNvdWxkIGJlIGAweDBgIG9yIGBudWxsYCB3aGlsZSBjb250cmFjdCBjcmVhdGlvblxuICAgICAgICB0eC50byA9IHV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHR4LnRvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0eC50byA9IG51bGw7IC8vIHNldCB0byBgbnVsbGAgaWYgaW52YWxpZCBhZGRyZXNzXG4gICAgfVxuXG4gICAgaWYodHguZnJvbSkge1xuICAgICAgICB0eC5mcm9tID0gdXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHguZnJvbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR4O1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBvdXRwdXQgb2YgYSB0cmFuc2FjdGlvbiByZWNlaXB0IHRvIGl0cyBwcm9wZXIgdmFsdWVzXG4gKlxuICogQG1ldGhvZCBvdXRwdXRUcmFuc2FjdGlvblJlY2VpcHRGb3JtYXR0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWNlaXB0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuKi9cbnZhciBvdXRwdXRUcmFuc2FjdGlvblJlY2VpcHRGb3JtYXR0ZXIgPSBmdW5jdGlvbiAocmVjZWlwdCl7XG4gICAgaWYodHlwZW9mIHJlY2VpcHQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVjZWl2ZWQgcmVjZWlwdCBpcyBpbnZhbGlkOiAnKyByZWNlaXB0KTtcbiAgICB9XG5cbiAgICBpZihyZWNlaXB0LmJsb2NrTnVtYmVyICE9PSBudWxsKVxuICAgICAgICByZWNlaXB0LmJsb2NrTnVtYmVyID0gdXRpbHMuaGV4VG9OdW1iZXIocmVjZWlwdC5ibG9ja051bWJlcik7XG4gICAgaWYocmVjZWlwdC50cmFuc2FjdGlvbkluZGV4ICE9PSBudWxsKVxuICAgICAgICByZWNlaXB0LnRyYW5zYWN0aW9uSW5kZXggPSB1dGlscy5oZXhUb051bWJlcihyZWNlaXB0LnRyYW5zYWN0aW9uSW5kZXgpO1xuICAgIHJlY2VpcHQuY3VtdWxhdGl2ZUdhc1VzZWQgPSB1dGlscy5oZXhUb051bWJlcihyZWNlaXB0LmN1bXVsYXRpdmVHYXNVc2VkKTtcbiAgICByZWNlaXB0Lmdhc1VzZWQgPSB1dGlscy5oZXhUb051bWJlcihyZWNlaXB0Lmdhc1VzZWQpO1xuXG4gICAgaWYoXy5pc0FycmF5KHJlY2VpcHQubG9ncykpIHtcbiAgICAgICAgcmVjZWlwdC5sb2dzID0gcmVjZWlwdC5sb2dzLm1hcChvdXRwdXRMb2dGb3JtYXR0ZXIpO1xuICAgIH1cblxuICAgIGlmKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKSB7XG4gICAgICAgIHJlY2VpcHQuY29udHJhY3RBZGRyZXNzID0gdXRpbHMudG9DaGVja3N1bUFkZHJlc3MocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiByZWNlaXB0LnN0YXR1cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVjZWlwdC5zdGF0dXMgPSBCb29sZWFuKHBhcnNlSW50KHJlY2VpcHQuc3RhdHVzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY2VpcHQ7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIG91dHB1dCBvZiBhIGJsb2NrIHRvIGl0cyBwcm9wZXIgdmFsdWVzXG4gKlxuICogQG1ldGhvZCBvdXRwdXRCbG9ja0Zvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IGJsb2NrXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuKi9cbnZhciBvdXRwdXRCbG9ja0Zvcm1hdHRlciA9IGZ1bmN0aW9uKGJsb2NrKSB7XG5cbiAgICAvLyB0cmFuc2Zvcm0gdG8gbnVtYmVyXG4gICAgYmxvY2suZ2FzTGltaXQgPSB1dGlscy5oZXhUb051bWJlcihibG9jay5nYXNMaW1pdCk7XG4gICAgYmxvY2suZ2FzVXNlZCA9IHV0aWxzLmhleFRvTnVtYmVyKGJsb2NrLmdhc1VzZWQpO1xuICAgIGJsb2NrLnNpemUgPSB1dGlscy5oZXhUb051bWJlcihibG9jay5zaXplKTtcbiAgICBibG9jay50aW1lc3RhbXAgPSB1dGlscy5oZXhUb051bWJlcihibG9jay50aW1lc3RhbXApO1xuICAgIGlmIChibG9jay5udW1iZXIgIT09IG51bGwpXG4gICAgICAgIGJsb2NrLm51bWJlciA9IHV0aWxzLmhleFRvTnVtYmVyKGJsb2NrLm51bWJlcik7XG5cbiAgICBpZihibG9jay5kaWZmaWN1bHR5KVxuICAgICAgICBibG9jay5kaWZmaWN1bHR5ID0gb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyKGJsb2NrLmRpZmZpY3VsdHkpO1xuICAgIGlmKGJsb2NrLnRvdGFsRGlmZmljdWx0eSlcbiAgICAgICAgYmxvY2sudG90YWxEaWZmaWN1bHR5ID0gb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyKGJsb2NrLnRvdGFsRGlmZmljdWx0eSk7XG5cbiAgICBpZiAoXy5pc0FycmF5KGJsb2NrLnRyYW5zYWN0aW9ucykpIHtcbiAgICAgICAgYmxvY2sudHJhbnNhY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc1N0cmluZyhpdGVtKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXIoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChibG9jay5taW5lcilcbiAgICAgICAgYmxvY2subWluZXIgPSB1dGlscy50b0NoZWNrc3VtQWRkcmVzcyhibG9jay5taW5lcik7XG5cbiAgICByZXR1cm4gYmxvY2s7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGlucHV0IG9mIGEgbG9nXG4gKlxuICogQG1ldGhvZCBpbnB1dExvZ0Zvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IGxvZyBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvZ1xuKi9cbnZhciBpbnB1dExvZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgdG9Ub3BpYyA9IGZ1bmN0aW9uKHZhbHVlKXtcblxuICAgICAgICBpZih2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuXG4gICAgICAgIGlmKHZhbHVlLmluZGV4T2YoJzB4JykgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB1dGlscy5mcm9tVXRmOCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIGlmIChvcHRpb25zLmZyb21CbG9jaylcbiAgICAgICAgb3B0aW9ucy5mcm9tQmxvY2sgPSBpbnB1dEJsb2NrTnVtYmVyRm9ybWF0dGVyKG9wdGlvbnMuZnJvbUJsb2NrKTtcblxuICAgIGlmIChvcHRpb25zLnRvQmxvY2spXG4gICAgICAgIG9wdGlvbnMudG9CbG9jayA9IGlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXIob3B0aW9ucy50b0Jsb2NrKTtcblxuXG4gICAgLy8gbWFrZSBzdXJlIHRvcGljcywgZ2V0IGNvbnZlcnRlZCB0byBoZXhcbiAgICBvcHRpb25zLnRvcGljcyA9IG9wdGlvbnMudG9waWNzIHx8IFtdO1xuICAgIG9wdGlvbnMudG9waWNzID0gb3B0aW9ucy50b3BpY3MubWFwKGZ1bmN0aW9uKHRvcGljKXtcbiAgICAgICAgcmV0dXJuIChfLmlzQXJyYXkodG9waWMpKSA/IHRvcGljLm1hcCh0b1RvcGljKSA6IHRvVG9waWModG9waWMpO1xuICAgIH0pO1xuXG4gICAgdG9Ub3BpYyA9IG51bGw7XG5cbiAgICBpZiAob3B0aW9ucy5hZGRyZXNzKSB7XG4gICAgICAgIG9wdGlvbnMuYWRkcmVzcyA9IChfLmlzQXJyYXkob3B0aW9ucy5hZGRyZXNzKSkgPyBvcHRpb25zLmFkZHJlc3MubWFwKGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXRBZGRyZXNzRm9ybWF0dGVyKGFkZHIpO1xuICAgICAgICB9KSA6IGlucHV0QWRkcmVzc0Zvcm1hdHRlcihvcHRpb25zLmFkZHJlc3MpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBvdXRwdXQgb2YgYSBsb2dcbiAqXG4gKiBAbWV0aG9kIG91dHB1dExvZ0Zvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IGxvZyBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvZ1xuKi9cbnZhciBvdXRwdXRMb2dGb3JtYXR0ZXIgPSBmdW5jdGlvbihsb2cpIHtcblxuICAgIC8vIGdlbmVyYXRlIGEgY3VzdG9tIGxvZyBpZFxuICAgIGlmKHR5cGVvZiBsb2cuYmxvY2tIYXNoID09PSAnc3RyaW5nJyAmJlxuICAgICAgIHR5cGVvZiBsb2cudHJhbnNhY3Rpb25IYXNoID09PSAnc3RyaW5nJyAmJlxuICAgICAgIHR5cGVvZiBsb2cubG9nSW5kZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBzaGFJZCA9IHV0aWxzLnNoYTMobG9nLmJsb2NrSGFzaC5yZXBsYWNlKCcweCcsJycpICsgbG9nLnRyYW5zYWN0aW9uSGFzaC5yZXBsYWNlKCcweCcsJycpICsgbG9nLmxvZ0luZGV4LnJlcGxhY2UoJzB4JywnJykpO1xuICAgICAgICBsb2cuaWQgPSAnbG9nXycrIHNoYUlkLnJlcGxhY2UoJzB4JywnJykuc3Vic3RyKDAsOCk7XG4gICAgfSBlbHNlIGlmKCFsb2cuaWQpIHtcbiAgICAgICAgbG9nLmlkID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobG9nLmJsb2NrTnVtYmVyICE9PSBudWxsKVxuICAgICAgICBsb2cuYmxvY2tOdW1iZXIgPSB1dGlscy5oZXhUb051bWJlcihsb2cuYmxvY2tOdW1iZXIpO1xuICAgIGlmIChsb2cudHJhbnNhY3Rpb25JbmRleCAhPT0gbnVsbClcbiAgICAgICAgbG9nLnRyYW5zYWN0aW9uSW5kZXggPSB1dGlscy5oZXhUb051bWJlcihsb2cudHJhbnNhY3Rpb25JbmRleCk7XG4gICAgaWYgKGxvZy5sb2dJbmRleCAhPT0gbnVsbClcbiAgICAgICAgbG9nLmxvZ0luZGV4ID0gdXRpbHMuaGV4VG9OdW1iZXIobG9nLmxvZ0luZGV4KTtcblxuICAgIGlmIChsb2cuYWRkcmVzcykge1xuICAgICAgICBsb2cuYWRkcmVzcyA9IHV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGxvZy5hZGRyZXNzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9nO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBpbnB1dCBvZiBhIHdoaXNwZXIgcG9zdCBhbmQgY29udmVydHMgYWxsIHZhbHVlcyB0byBIRVhcbiAqXG4gKiBAbWV0aG9kIGlucHV0UG9zdEZvcm1hdHRlclxuICogQHBhcmFtIHtPYmplY3R9IHRyYW5zYWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge09iamVjdH1cbiovXG52YXIgaW5wdXRQb3N0Rm9ybWF0dGVyID0gZnVuY3Rpb24ocG9zdCkge1xuXG4gICAgLy8gcG9zdC5wYXlsb2FkID0gdXRpbHMudG9IZXgocG9zdC5wYXlsb2FkKTtcblxuICAgIGlmIChwb3N0LnR0bClcbiAgICAgICAgcG9zdC50dGwgPSB1dGlscy5udW1iZXJUb0hleChwb3N0LnR0bCk7XG4gICAgaWYgKHBvc3Qud29ya1RvUHJvdmUpXG4gICAgICAgIHBvc3Qud29ya1RvUHJvdmUgPSB1dGlscy5udW1iZXJUb0hleChwb3N0LndvcmtUb1Byb3ZlKTtcbiAgICBpZiAocG9zdC5wcmlvcml0eSlcbiAgICAgICAgcG9zdC5wcmlvcml0eSA9IHV0aWxzLm51bWJlclRvSGV4KHBvc3QucHJpb3JpdHkpO1xuXG4gICAgLy8gZmFsbGJhY2tcbiAgICBpZiAoIV8uaXNBcnJheShwb3N0LnRvcGljcykpIHtcbiAgICAgICAgcG9zdC50b3BpY3MgPSBwb3N0LnRvcGljcyA/IFtwb3N0LnRvcGljc10gOiBbXTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgdGhlIGZvbGxvd2luZyBvcHRpb25zXG4gICAgcG9zdC50b3BpY3MgPSBwb3N0LnRvcGljcy5tYXAoZnVuY3Rpb24odG9waWMpe1xuICAgICAgICAvLyBjb252ZXJ0IG9ubHkgaWYgbm90IGhleFxuICAgICAgICByZXR1cm4gKHRvcGljLmluZGV4T2YoJzB4JykgPT09IDApID8gdG9waWMgOiB1dGlscy5mcm9tVXRmOCh0b3BpYyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zdDtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgb3V0cHV0IG9mIGEgcmVjZWl2ZWQgcG9zdCBtZXNzYWdlXG4gKlxuICogQG1ldGhvZCBvdXRwdXRQb3N0Rm9ybWF0dGVyXG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbnZhciBvdXRwdXRQb3N0Rm9ybWF0dGVyID0gZnVuY3Rpb24ocG9zdCl7XG5cbiAgICBwb3N0LmV4cGlyeSA9IHV0aWxzLmhleFRvTnVtYmVyKHBvc3QuZXhwaXJ5KTtcbiAgICBwb3N0LnNlbnQgPSB1dGlscy5oZXhUb051bWJlcihwb3N0LnNlbnQpO1xuICAgIHBvc3QudHRsID0gdXRpbHMuaGV4VG9OdW1iZXIocG9zdC50dGwpO1xuICAgIHBvc3Qud29ya1Byb3ZlZCA9IHV0aWxzLmhleFRvTnVtYmVyKHBvc3Qud29ya1Byb3ZlZCk7XG4gICAgLy8gcG9zdC5wYXlsb2FkUmF3ID0gcG9zdC5wYXlsb2FkO1xuICAgIC8vIHBvc3QucGF5bG9hZCA9IHV0aWxzLmhleFRvQXNjaWkocG9zdC5wYXlsb2FkKTtcblxuICAgIC8vIGlmICh1dGlscy5pc0pzb24ocG9zdC5wYXlsb2FkKSkge1xuICAgIC8vICAgICBwb3N0LnBheWxvYWQgPSBKU09OLnBhcnNlKHBvc3QucGF5bG9hZCk7XG4gICAgLy8gfVxuXG4gICAgLy8gZm9ybWF0IHRoZSBmb2xsb3dpbmcgb3B0aW9uc1xuICAgIGlmICghcG9zdC50b3BpY3MpIHtcbiAgICAgICAgcG9zdC50b3BpY3MgPSBbXTtcbiAgICB9XG4gICAgcG9zdC50b3BpY3MgPSBwb3N0LnRvcGljcy5tYXAoZnVuY3Rpb24odG9waWMpe1xuICAgICAgICByZXR1cm4gdXRpbHMudG9VdGY4KHRvcGljKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3N0O1xufTtcblxudmFyIGlucHV0QWRkcmVzc0Zvcm1hdHRlciA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgdmFyIGliYW4gPSBuZXcgSWJhbihhZGRyZXNzKTtcbiAgICBpZiAoaWJhbi5pc1ZhbGlkKCkgJiYgaWJhbi5pc0RpcmVjdCgpKSB7XG4gICAgICAgIHJldHVybiBpYmFuLnRvQWRkcmVzcygpLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FkZHJlc3MoYWRkcmVzcykpIHtcbiAgICAgICAgcmV0dXJuICcweCcgKyBhZGRyZXNzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnMHgnLCcnKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlZCBhZGRyZXNzIFwiJysgYWRkcmVzcyArJ1wiIGlzIGludmFsaWQsIHRoZSBjYXBpdGFsaXphdGlvbiBjaGVja3N1bSB0ZXN0IGZhaWxlZCwgb3IgaXRzIGFuIGluZHJlY3QgSUJBTiBhZGRyZXNzIHdoaWNoIGNhblxcJ3QgYmUgY29udmVydGVkLicpO1xufTtcblxuXG52YXIgb3V0cHV0U3luY2luZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgcmVzdWx0LnN0YXJ0aW5nQmxvY2sgPSB1dGlscy5oZXhUb051bWJlcihyZXN1bHQuc3RhcnRpbmdCbG9jayk7XG4gICAgcmVzdWx0LmN1cnJlbnRCbG9jayA9IHV0aWxzLmhleFRvTnVtYmVyKHJlc3VsdC5jdXJyZW50QmxvY2spO1xuICAgIHJlc3VsdC5oaWdoZXN0QmxvY2sgPSB1dGlscy5oZXhUb051bWJlcihyZXN1bHQuaGlnaGVzdEJsb2NrKTtcbiAgICBpZiAocmVzdWx0Lmtub3duU3RhdGVzKSB7XG4gICAgICAgIHJlc3VsdC5rbm93blN0YXRlcyA9IHV0aWxzLmhleFRvTnVtYmVyKHJlc3VsdC5rbm93blN0YXRlcyk7XG4gICAgICAgIHJlc3VsdC5wdWxsZWRTdGF0ZXMgPSB1dGlscy5oZXhUb051bWJlcihyZXN1bHQucHVsbGVkU3RhdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXREZWZhdWx0QmxvY2tOdW1iZXJGb3JtYXR0ZXI6IGlucHV0RGVmYXVsdEJsb2NrTnVtYmVyRm9ybWF0dGVyLFxuICAgIGlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXI6IGlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXIsXG4gICAgaW5wdXRDYWxsRm9ybWF0dGVyOiBpbnB1dENhbGxGb3JtYXR0ZXIsXG4gICAgaW5wdXRUcmFuc2FjdGlvbkZvcm1hdHRlcjogaW5wdXRUcmFuc2FjdGlvbkZvcm1hdHRlcixcbiAgICBpbnB1dEFkZHJlc3NGb3JtYXR0ZXI6IGlucHV0QWRkcmVzc0Zvcm1hdHRlcixcbiAgICBpbnB1dFBvc3RGb3JtYXR0ZXI6IGlucHV0UG9zdEZvcm1hdHRlcixcbiAgICBpbnB1dExvZ0Zvcm1hdHRlcjogaW5wdXRMb2dGb3JtYXR0ZXIsXG4gICAgaW5wdXRTaWduRm9ybWF0dGVyOiBpbnB1dFNpZ25Gb3JtYXR0ZXIsXG4gICAgb3V0cHV0QmlnTnVtYmVyRm9ybWF0dGVyOiBvdXRwdXRCaWdOdW1iZXJGb3JtYXR0ZXIsXG4gICAgb3V0cHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXI6IG91dHB1dFRyYW5zYWN0aW9uRm9ybWF0dGVyLFxuICAgIG91dHB1dFRyYW5zYWN0aW9uUmVjZWlwdEZvcm1hdHRlcjogb3V0cHV0VHJhbnNhY3Rpb25SZWNlaXB0Rm9ybWF0dGVyLFxuICAgIG91dHB1dEJsb2NrRm9ybWF0dGVyOiBvdXRwdXRCbG9ja0Zvcm1hdHRlcixcbiAgICBvdXRwdXRMb2dGb3JtYXR0ZXI6IG91dHB1dExvZ0Zvcm1hdHRlcixcbiAgICBvdXRwdXRQb3N0Rm9ybWF0dGVyOiBvdXRwdXRQb3N0Rm9ybWF0dGVyLFxuICAgIG91dHB1dFN5bmNpbmdGb3JtYXR0ZXI6IG91dHB1dFN5bmNpbmdGb3JtYXR0ZXJcbn07XG5cbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnd2ViMy1jb3JlLWhlbHBlcnMnKS5lcnJvcnM7XG52YXIgSnNvbnJwYyA9IHJlcXVpcmUoJy4vanNvbnJwYy5qcycpO1xudmFyIEJhdGNoTWFuYWdlciA9IHJlcXVpcmUoJy4vYmF0Y2guanMnKTtcbnZhciBnaXZlblByb3ZpZGVyID0gcmVxdWlyZSgnLi9naXZlblByb3ZpZGVyLmpzJyk7XG5cblxuXG4gICAgLyoqXG4gKiBJdCdzIHJlc3BvbnNpYmxlIGZvciBwYXNzaW5nIG1lc3NhZ2VzIHRvIHByb3ZpZGVyc1xuICogSXQncyBhbHNvIHJlc3BvbnNpYmxlIGZvciBwb2xsaW5nIHRoZSBldGhlcmV1bSBub2RlIGZvciBpbmNvbWluZyBtZXNzYWdlc1xuICogRGVmYXVsdCBwb2xsIHRpbWVvdXQgaXMgMSBzZWNvbmRcbiAqIFNpbmdsZXRvblxuICovXG52YXIgUmVxdWVzdE1hbmFnZXIgPSBmdW5jdGlvbiBSZXF1ZXN0TWFuYWdlcihwcm92aWRlcikge1xuICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgIHRoaXMucHJvdmlkZXJzID0gUmVxdWVzdE1hbmFnZXIucHJvdmlkZXJzO1xuXG4gICAgdGhpcy5zZXRQcm92aWRlcihwcm92aWRlcik7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0ge307XG59O1xuXG5cblxuUmVxdWVzdE1hbmFnZXIuZ2l2ZW5Qcm92aWRlciA9IGdpdmVuUHJvdmlkZXI7XG5cblJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVycyA9IHtcbiAgICBXZWJzb2NrZXRQcm92aWRlcjogcmVxdWlyZSgnd2ViMy1wcm92aWRlcnMtd3MnKSxcbiAgICBIdHRwUHJvdmlkZXI6IHJlcXVpcmUoJ3dlYjMtcHJvdmlkZXJzLWh0dHAnKSxcbiAgICBJcGNQcm92aWRlcjogcmVxdWlyZSgnd2ViMy1wcm92aWRlcnMtaXBjJylcbn07XG5cblxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIHNldCBwcm92aWRlciBvZiByZXF1ZXN0IG1hbmFnZXJcbiAqXG4gKiBAbWV0aG9kIHNldFByb3ZpZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gcFxuICovXG5SZXF1ZXN0TWFuYWdlci5wcm90b3R5cGUuc2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAocCwgbmV0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIGF1dG9kZXRlY3QgcHJvdmlkZXJcbiAgICBpZihwICYmIHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiB0aGlzLnByb3ZpZGVycykge1xuXG4gICAgICAgIC8vIEhUVFBcbiAgICAgICAgaWYoL15odHRwKHMpPzpcXC9cXC8vaS50ZXN0KHApKSB7XG4gICAgICAgICAgICBwID0gbmV3IHRoaXMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihwKTtcblxuICAgICAgICAgICAgLy8gV1NcbiAgICAgICAgfSBlbHNlIGlmKC9ed3Mocyk/OlxcL1xcLy9pLnRlc3QocCkpIHtcbiAgICAgICAgICAgIHAgPSBuZXcgdGhpcy5wcm92aWRlcnMuV2Vic29ja2V0UHJvdmlkZXIocCk7XG5cbiAgICAgICAgICAgIC8vIElQQ1xuICAgICAgICB9IGVsc2UgaWYocCAmJiB0eXBlb2YgbmV0ID09PSAnb2JqZWN0JyAgJiYgdHlwZW9mIG5ldC5jb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBwID0gbmV3IHRoaXMucHJvdmlkZXJzLklwY1Byb3ZpZGVyKHAsIG5ldCk7XG5cbiAgICAgICAgfSBlbHNlIGlmKHApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBhdXRvZGV0ZWN0IHByb3ZpZGVyIGZvciBcIicrIHAgKydcIicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGhlIG9sZCBvbmUgYmVmb3JlIGNoYW5naW5nLCBpZiBzdGlsbCBjb25uZWN0ZWRcbiAgICBpZih0aGlzLnByb3ZpZGVyICYmIHRoaXMucHJvdmlkZXIuY29ubmVjdGVkKVxuICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9ucygpO1xuXG5cbiAgICB0aGlzLnByb3ZpZGVyID0gcCB8fCBudWxsO1xuXG4gICAgLy8gbGlzdGVuIHRvIGluY29taW5nIG5vdGlmaWNhdGlvbnNcbiAgICBpZih0aGlzLnByb3ZpZGVyICYmIHRoaXMucHJvdmlkZXIub24pIHtcbiAgICAgICAgdGhpcy5wcm92aWRlci5vbignZGF0YScsIGZ1bmN0aW9uIHJlcXVlc3RNYW5hZ2VyTm90aWZpY2F0aW9uKHJlc3VsdCwgZGVwcmVjYXRlZFJlc3VsdCl7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgZGVwcmVjYXRlZFJlc3VsdDsgLy8gdGhpcyBpcyBmb3IgcG9zc2libGUgb2xkIHByb3ZpZGVycywgd2hpY2ggbWF5IGhhZCB0aGUgZXJyb3IgZmlyc3QgaGFuZGxlclxuXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgcmVzdWx0Lm1ldGhvZCwgdG8gcHJldmVudCBvbGQgcHJvdmlkZXJzIGVycm9ycyB0byBwYXNzIGFzIHJlc3VsdFxuICAgICAgICAgICAgaWYocmVzdWx0Lm1ldGhvZCAmJiBfdGhpcy5zdWJzY3JpcHRpb25zW3Jlc3VsdC5wYXJhbXMuc3Vic2NyaXB0aW9uXSAmJiBfdGhpcy5zdWJzY3JpcHRpb25zW3Jlc3VsdC5wYXJhbXMuc3Vic2NyaXB0aW9uXS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF90aGlzLnN1YnNjcmlwdGlvbnNbcmVzdWx0LnBhcmFtcy5zdWJzY3JpcHRpb25dLmNhbGxiYWNrKG51bGwsIHJlc3VsdC5wYXJhbXMucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRPRE8gYWRkIGVycm9yLCBlbmQsIHRpbWVvdXQsIGNvbm5lY3Q/P1xuICAgICAgICAvLyB0aGlzLnByb3ZpZGVyLm9uKCdlcnJvcicsIGZ1bmN0aW9uIHJlcXVlc3RNYW5hZ2VyTm90aWZpY2F0aW9uKHJlc3VsdCl7XG4gICAgICAgIC8vICAgICBPYmplY3Qua2V5cyhfdGhpcy5zdWJzY3JpcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKGlkKXtcbiAgICAgICAgLy8gICAgICAgICBpZihfdGhpcy5zdWJzY3JpcHRpb25zW2lkXS5jYWxsYmFjaylcbiAgICAgICAgLy8gICAgICAgICAgICAgX3RoaXMuc3Vic2NyaXB0aW9uc1tpZF0uY2FsbGJhY2soZXJyKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxufTtcblxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIGFzeW5jaHJvbm91c2x5IHNlbmQgcmVxdWVzdFxuICpcbiAqIEBtZXRob2Qgc2VuZEFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuUmVxdWVzdE1hbmFnZXIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgIGlmICghdGhpcy5wcm92aWRlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JzLkludmFsaWRQcm92aWRlcigpKTtcbiAgICB9XG5cbiAgICB2YXIgcGF5bG9hZCA9IEpzb25ycGMudG9QYXlsb2FkKGRhdGEubWV0aG9kLCBkYXRhLnBhcmFtcyk7XG4gICAgdGhpcy5wcm92aWRlclt0aGlzLnByb3ZpZGVyLnNlbmRBc3luYyA/ICdzZW5kQXN5bmMnIDogJ3NlbmQnXShwYXlsb2FkLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgaWYocmVzdWx0ICYmIHJlc3VsdC5pZCAmJiBwYXlsb2FkLmlkICE9PSByZXN1bHQuaWQpIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoJ1dyb25nIHJlc3BvbnNlIGlkIFwiJysgcmVzdWx0LmlkICsnXCIgKGV4cGVjdGVkOiBcIicrIHBheWxvYWQuaWQgKydcIikgaW4gJysgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpKTtcblxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JzLkVycm9yUmVzcG9uc2UocmVzdWx0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIUpzb25ycGMuaXNWYWxpZFJlc3BvbnNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvcnMuSW52YWxpZFJlc3BvbnNlKHJlc3VsdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0LnJlc3VsdCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gYXN5bmNocm9ub3VzbHkgc2VuZCBiYXRjaCByZXF1ZXN0XG4gKlxuICogQG1ldGhvZCBzZW5kQmF0Y2hcbiAqIEBwYXJhbSB7QXJyYXl9IGJhdGNoIGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cblJlcXVlc3RNYW5hZ2VyLnByb3RvdHlwZS5zZW5kQmF0Y2ggPSBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMucHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9ycy5JbnZhbGlkUHJvdmlkZXIoKSk7XG4gICAgfVxuXG4gICAgdmFyIHBheWxvYWQgPSBKc29ucnBjLnRvQmF0Y2hQYXlsb2FkKGRhdGEpO1xuICAgIHRoaXMucHJvdmlkZXJbdGhpcy5wcm92aWRlci5zZW5kQXN5bmMgPyAnc2VuZEFzeW5jJyA6ICdzZW5kJ10ocGF5bG9hZCwgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghXy5pc0FycmF5KHJlc3VsdHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JzLkludmFsaWRSZXNwb25zZShyZXN1bHRzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICB9KTtcbn07XG5cblxuLyoqXG4gKiBXYWl0cyBmb3Igbm90aWZpY2F0aW9uc1xuICpcbiAqIEBtZXRob2QgYWRkU3Vic2NyaXB0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgICAgICAgICAgIHRoZSBzdWJzY3JpcHRpb24gaWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICAgICAgdGhlIHN1YnNjcmlwdGlvbiBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAgICAgIHRoZSBzdWJzY3JpcHRpb24gbmFtZXNwYWNlIChldGgsIHBlcnNvbmFsLCBldGMpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIHRoZSBjYWxsYmFjayB0byBjYWxsIGZvciBpbmNvbWluZyBub3RpZmljYXRpb25zXG4gKi9cblJlcXVlc3RNYW5hZ2VyLnByb3RvdHlwZS5hZGRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoaWQsIG5hbWUsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYodGhpcy5wcm92aWRlci5vbikge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbaWRdID0ge1xuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb3ZpZGVyIGRvZXNuXFwndCBzdXBwb3J0IHN1YnNjcmlwdGlvbnM6ICcrIHRoaXMucHJvdmlkZXIuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBXYWl0cyBmb3Igbm90aWZpY2F0aW9uc1xuICpcbiAqIEBtZXRob2QgcmVtb3ZlU3Vic2NyaXB0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgICAgICAgICAgIHRoZSBzdWJzY3JpcHRpb24gaWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgZmlyZWQgb25jZSB0aGUgc3Vic2NyaXB0aW9uIGlzIHJlbW92ZWRcbiAqL1xuUmVxdWVzdE1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYodGhpcy5zdWJzY3JpcHRpb25zW2lkXSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCh7XG4gICAgICAgICAgICBtZXRob2Q6IHRoaXMuc3Vic2NyaXB0aW9uc1tpZF0udHlwZSArICdfdW5zdWJzY3JpYmUnLFxuICAgICAgICAgICAgcGFyYW1zOiBbaWRdXG4gICAgICAgIH0sIGNhbGxiYWNrKTtcblxuICAgICAgICAvLyByZW1vdmUgc3Vic2NyaXB0aW9uXG4gICAgICAgIGRlbGV0ZSBfdGhpcy5zdWJzY3JpcHRpb25zW2lkXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gcmVzZXQgdGhlIHN1YnNjcmlwdGlvbnNcbiAqXG4gKiBAbWV0aG9kIHJlc2V0XG4gKi9cblJlcXVlc3RNYW5hZ2VyLnByb3RvdHlwZS5jbGVhclN1YnNjcmlwdGlvbnMgPSBmdW5jdGlvbiAoa2VlcElzU3luY2luZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblxuICAgIC8vIHVuaW5zdGFsbCBhbGwgc3Vic2NyaXB0aW9uc1xuICAgIE9iamVjdC5rZXlzKHRoaXMuc3Vic2NyaXB0aW9ucykuZm9yRWFjaChmdW5jdGlvbihpZCl7XG4gICAgICAgIGlmKCFrZWVwSXNTeW5jaW5nIHx8IF90aGlzLnN1YnNjcmlwdGlvbnNbaWRdLm5hbWUgIT09ICdzeW5jaW5nJylcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZVN1YnNjcmlwdGlvbihpZCk7XG4gICAgfSk7XG5cblxuICAgIC8vICByZXNldCBub3RpZmljYXRpb24gY2FsbGJhY2tzIGV0Yy5cbiAgICBpZih0aGlzLnByb3ZpZGVyLnJlc2V0KVxuICAgICAgICB0aGlzLnByb3ZpZGVyLnJlc2V0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBNYW5hZ2VyOiBSZXF1ZXN0TWFuYWdlcixcbiAgICBCYXRjaE1hbmFnZXI6IEJhdGNoTWFuYWdlclxufTtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKCcuL2Zvcm1hdHRlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZXJyb3JzOiBlcnJvcnMsXG4gICAgZm9ybWF0dGVyczogZm9ybWF0dGVyc1xufTtcblxuIiwiLypcbiBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuXG4gd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gd2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG4vKipcbiAqIEBmaWxlIGV4dGVuZC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBmb3JtYXR0ZXJzID0gcmVxdWlyZSgnd2ViMy1jb3JlLWhlbHBlcnMnKS5mb3JtYXR0ZXJzO1xudmFyIE1ldGhvZCA9IHJlcXVpcmUoJ3dlYjMtY29yZS1tZXRob2QnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ3dlYjMtdXRpbHMnKTtcblxuXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gKHBja2cpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo1ICovXG4gICAgdmFyIGV4ID0gZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuXG4gICAgICAgIHZhciBleHRlbmRlZE9iamVjdDtcbiAgICAgICAgaWYgKGV4dGVuc2lvbi5wcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFwY2tnW2V4dGVuc2lvbi5wcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICBwY2tnW2V4dGVuc2lvbi5wcm9wZXJ0eV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4dGVuZGVkT2JqZWN0ID0gcGNrZ1tleHRlbnNpb24ucHJvcGVydHldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRPYmplY3QgPSBwY2tnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbi5tZXRob2RzKSB7XG4gICAgICAgICAgICBleHRlbnNpb24ubWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpZighKG1ldGhvZCBpbnN0YW5jZW9mIE1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gbmV3IE1ldGhvZChtZXRob2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1ldGhvZC5hdHRhY2hUb09iamVjdChleHRlbmRlZE9iamVjdCk7XG4gICAgICAgICAgICAgICAgbWV0aG9kLnNldFJlcXVlc3RNYW5hZ2VyKHBja2cuX3JlcXVlc3RNYW5hZ2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBja2c7XG4gICAgfTtcblxuICAgIGV4LmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIGV4LnV0aWxzID0gdXRpbHM7XG4gICAgZXguTWV0aG9kID0gTWV0aG9kO1xuXG4gICAgcmV0dXJuIGV4O1xufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kO1xuXG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgU3Vic2NyaXB0aW9uID0gcmVxdWlyZSgnLi9zdWJzY3JpcHRpb24uanMnKTtcblxuXG52YXIgU3Vic2NyaXB0aW9ucyA9IGZ1bmN0aW9uIFN1YnNjcmlwdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gb3B0aW9ucy5zdWJzY3JpcHRpb25zIHx8IHt9O1xuICAgIHRoaXMucmVxdWVzdE1hbmFnZXIgPSBudWxsO1xufTtcblxuXG5TdWJzY3JpcHRpb25zLnByb3RvdHlwZS5zZXRSZXF1ZXN0TWFuYWdlciA9IGZ1bmN0aW9uIChybSkge1xuICAgIHRoaXMucmVxdWVzdE1hbmFnZXIgPSBybTtcbn07XG5cblxuU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuYXR0YWNoVG9PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGZ1bmMgPSB0aGlzLmJ1aWxkQ2FsbCgpO1xuICAgIHZhciBuYW1lID0gdGhpcy5uYW1lLnNwbGl0KCcuJyk7XG4gICAgaWYgKG5hbWUubGVuZ3RoID4gMSkge1xuICAgICAgICBvYmpbbmFtZVswXV0gPSBvYmpbbmFtZVswXV0gfHwge307XG4gICAgICAgIG9ialtuYW1lWzBdXVtuYW1lWzFdXSA9IGZ1bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW25hbWVbMF1dID0gZnVuYztcbiAgICB9XG59O1xuXG5cblN1YnNjcmlwdGlvbnMucHJvdG90eXBlLmJ1aWxkQ2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIV90aGlzLnN1YnNjcmlwdGlvbnNbYXJndW1lbnRzWzBdXSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdTdWJzY3JpcHRpb24gJysgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzWzBdKSArJyBkb2VzblxcJ3QgZXhpc3QuIFN1YnNjcmliaW5nIGFueXdheS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbjogX3RoaXMuc3Vic2NyaXB0aW9uc1thcmd1bWVudHNbMF1dLFxuICAgICAgICAgICAgcmVxdWVzdE1hbmFnZXI6IF90aGlzLnJlcXVlc3RNYW5hZ2VyLFxuICAgICAgICAgICAgdHlwZTogX3RoaXMudHlwZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLnN1YnNjcmliZS5hcHBseShzdWJzY3JpcHRpb24sIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9ucyxcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvblxufTtcbiIsIi8qXG4gVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxNlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xudmFyIFByb21pc2UgPSByZXF1aXJlKFwiYW55LXByb21pc2VcIik7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgYSBkZWZlciBwcm9taXNlIGFuZCBhZGRzIGV2ZW50RW1pdHRlciBmdW5jdGlvbmFsaXR5IHRvIGl0XG4gKlxuICogQG1ldGhvZCBldmVudGlmaWVkUHJvbWlzZVxuICovXG52YXIgUHJvbWlFdmVudCA9IGZ1bmN0aW9uIFByb21pRXZlbnQoanVzdFByb21pc2UpIHtcbiAgICB2YXIgcmVzb2x2ZSwgcmVqZWN0LFxuICAgICAgICBldmVudEVtaXR0ZXIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICByZWplY3QgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIH0pO1xuXG4gICAgaWYoanVzdFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICAgIGV2ZW50RW1pdHRlcjogZXZlbnRFbWl0dGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZ2V0IGV2ZW50RW1pdHRlclxuICAgIHZhciBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLy8gYWRkIGV2ZW50RW1pdHRlciB0byB0aGUgcHJvbWlzZVxuICAgIGV2ZW50RW1pdHRlci5fZXZlbnRzID0gZW1pdHRlci5fZXZlbnRzO1xuICAgIGV2ZW50RW1pdHRlci5lbWl0ID0gZW1pdHRlci5lbWl0O1xuICAgIGV2ZW50RW1pdHRlci5vbiA9IGVtaXR0ZXIub247XG4gICAgZXZlbnRFbWl0dGVyLm9uY2UgPSBlbWl0dGVyLm9uY2U7XG4gICAgZXZlbnRFbWl0dGVyLm9mZiA9IGVtaXR0ZXIub2ZmO1xuICAgIGV2ZW50RW1pdHRlci5saXN0ZW5lcnMgPSBlbWl0dGVyLmxpc3RlbmVycztcbiAgICBldmVudEVtaXR0ZXIuYWRkTGlzdGVuZXIgPSBlbWl0dGVyLmFkZExpc3RlbmVyO1xuICAgIGV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9IGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXI7XG4gICAgZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycyA9IGVtaXR0ZXIucmVtb3ZlQWxsTGlzdGVuZXJzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgIGV2ZW50RW1pdHRlcjogZXZlbnRFbWl0dGVyXG4gICAgfTtcbn07XG5cblByb21pRXZlbnQucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taUV2ZW50KHRydWUpO1xuICAgIHByb21pc2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHByb21pc2UuZXZlbnRFbWl0dGVyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taUV2ZW50O1xuIiwiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuXG4gICAgd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgd2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICAgIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gICAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICAgIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgYmF0Y2guanNcbiAqIEBhdXRob3IgTWFyZWsgS290ZXdpY3ogPG1hcmVrQGV0aGRldi5jb20+XG4gKiBAZGF0ZSAyMDE1XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBKc29ucnBjID0gcmVxdWlyZSgnLi9qc29ucnBjJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnd2ViMy1jb3JlLWhlbHBlcnMnKS5lcnJvcnM7XG5cbnZhciBCYXRjaCA9IGZ1bmN0aW9uIChyZXF1ZXN0TWFuYWdlcikge1xuICAgIHRoaXMucmVxdWVzdE1hbmFnZXIgPSByZXF1ZXN0TWFuYWdlcjtcbiAgICB0aGlzLnJlcXVlc3RzID0gW107XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gYWRkIGNyZWF0ZSBuZXcgcmVxdWVzdCB0byBiYXRjaCByZXF1ZXN0XG4gKlxuICogQG1ldGhvZCBhZGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBqc29ucnBjIHJlcXVldCBvYmplY3RcbiAqL1xuQmF0Y2gucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGV4ZWN1dGUgYmF0Y2ggcmVxdWVzdFxuICpcbiAqIEBtZXRob2QgZXhlY3V0ZVxuICovXG5CYXRjaC5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVxdWVzdHMgPSB0aGlzLnJlcXVlc3RzO1xuICAgIHRoaXMucmVxdWVzdE1hbmFnZXIuc2VuZEJhdGNoKHJlcXVlc3RzLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuICAgICAgICByZXF1ZXN0cy5tYXAoZnVuY3Rpb24gKHJlcXVlc3QsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0c1tpbmRleF0gfHwge307XG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c1tpbmRleF0uY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdLmNhbGxiYWNrKGVycm9ycy5FcnJvclJlc3BvbnNlKHJlc3VsdCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghSnNvbnJwYy5pc1ZhbGlkUmVzcG9uc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdLmNhbGxiYWNrKGVycm9ycy5JbnZhbGlkUmVzcG9uc2UocmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNbaW5kZXhdLmNhbGxiYWNrKG51bGwsIHJlcXVlc3RzW2luZGV4XS5mb3JtYXQgPyByZXF1ZXN0c1tpbmRleF0uZm9ybWF0KHJlc3VsdC5yZXN1bHQpIDogcmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzW2luZGV4XS5jYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhdGNoO1xuXG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBlcnJvcnMuanNcbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBhdXRob3IgTWFyZWsgS290ZXdpY3ogPG1hcmVrQHBhcml0eS5pbz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICEhcmVzdWx0ICYmICEhcmVzdWx0LmVycm9yICYmICEhcmVzdWx0LmVycm9yLm1lc3NhZ2UgPyByZXN1bHQuZXJyb3IubWVzc2FnZSA6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1JldHVybmVkIGVycm9yOiAnICsgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBJbnZhbGlkTnVtYmVyT2ZQYXJhbXM6IGZ1bmN0aW9uIChnb3QsIGV4cGVjdGVkLCBtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgcGFyYW1ldGVycyBmb3IgXCInKyBtZXRob2QgKydcIi4gR290ICcrIGdvdCArJyBleHBlY3RlZCAnKyBleHBlY3RlZCArJyEnKTtcbiAgICB9LFxuICAgIEludmFsaWRDb25uZWN0aW9uOiBmdW5jdGlvbiAoaG9zdCl7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0NPTk5FQ1RJT04gRVJST1I6IENvdWxkblxcJ3QgY29ubmVjdCB0byBub2RlICcrIGhvc3QgKycuJyk7XG4gICAgfSxcbiAgICBJbnZhbGlkUHJvdmlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignUHJvdmlkZXIgbm90IHNldCBvciBpbnZhbGlkJyk7XG4gICAgfSxcbiAgICBJbnZhbGlkUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICEhcmVzdWx0ICYmICEhcmVzdWx0LmVycm9yICYmICEhcmVzdWx0LmVycm9yLm1lc3NhZ2UgPyByZXN1bHQuZXJyb3IubWVzc2FnZSA6ICdJbnZhbGlkIEpTT04gUlBDIHJlc3BvbnNlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9LFxuICAgIENvbm5lY3Rpb25UaW1lb3V0OiBmdW5jdGlvbiAobXMpe1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdDT05ORUNUSU9OIFRJTUVPVVQ6IHRpbWVvdXQgb2YgJyArIG1zICsgJyBtcyBhY2hpdmVkJyk7XG4gICAgfVxufTtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKiogQGZpbGUganNvbnJwYy5qc1xuICogQGF1dGhvcnM6XG4gKiAgIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiAgIE1hcmVrIEtvdGV3aWN6IDxtYXJla0BldGhkZXYuY29tPlxuICogICBBYXJvbiBLdW1hdmlzIDxhYXJvbkBrdW1hdmlzLm1lPlxuICogQGRhdGUgMjAxNVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBJbml0aWFsaXplIEpzb25ycGMgYXMgYSBzaW1wbGUgb2JqZWN0IHdpdGggdXRpbGl0eSBmdW5jdGlvbnMuXG52YXIgSnNvbnJwYyA9IHtcbiAgICBtZXNzYWdlSWQ6IDBcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byB2YWxpZCBqc29uIGNyZWF0ZSBwYXlsb2FkIG9iamVjdFxuICpcbiAqIEBtZXRob2QgdG9QYXlsb2FkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2Qgb2YganNvbnJwYyBjYWxsLCByZXF1aXJlZFxuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zLCBhbiBhcnJheSBvZiBtZXRob2QgcGFyYW1zLCBvcHRpb25hbFxuICogQHJldHVybnMge09iamVjdH0gdmFsaWQganNvbnJwYyBwYXlsb2FkIG9iamVjdFxuICovXG5Kc29ucnBjLnRvUGF5bG9hZCA9IGZ1bmN0aW9uIChtZXRob2QsIHBhcmFtcykge1xuICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTlJQQyBtZXRob2Qgc2hvdWxkIGJlIHNwZWNpZmllZCBmb3IgcGFyYW1zOiBcIicrIEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKydcIiEnKTtcbiAgICB9XG5cbiAgICAvLyBhZHZhbmNlIG1lc3NhZ2UgSURcbiAgICBKc29ucnBjLm1lc3NhZ2VJZCsrO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgIGlkOiBKc29ucnBjLm1lc3NhZ2VJZCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHBhcmFtczogcGFyYW1zIHx8IFtdXG4gICAgfTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBjaGVjayBpZiBqc29ucnBjIHJlc3BvbnNlIGlzIHZhbGlkXG4gKlxuICogQG1ldGhvZCBpc1ZhbGlkUmVzcG9uc2VcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgcmVzcG9uc2UgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5Kc29ucnBjLmlzVmFsaWRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3BvbnNlKSA/IHJlc3BvbnNlLmV2ZXJ5KHZhbGlkYXRlU2luZ2xlTWVzc2FnZSkgOiB2YWxpZGF0ZVNpbmdsZU1lc3NhZ2UocmVzcG9uc2UpO1xuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTaW5nbGVNZXNzYWdlKG1lc3NhZ2Upe1xuICAgICAgcmV0dXJuICEhbWVzc2FnZSAmJlxuICAgICAgICAhbWVzc2FnZS5lcnJvciAmJlxuICAgICAgICBtZXNzYWdlLmpzb25ycGMgPT09ICcyLjAnICYmXG4gICAgICAgICh0eXBlb2YgbWVzc2FnZS5pZCA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG1lc3NhZ2UuaWQgPT09ICdzdHJpbmcnKSAmJlxuICAgICAgICBtZXNzYWdlLnJlc3VsdCAhPT0gdW5kZWZpbmVkOyAvLyBvbmx5IHVuZGVmaW5lZCBpcyBub3QgdmFsaWQganNvbiBvYmplY3RcbiAgICB9XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gY3JlYXRlIGJhdGNoIHBheWxvYWQgb2JqZWN0XG4gKlxuICogQG1ldGhvZCB0b0JhdGNoUGF5bG9hZFxuICogQHBhcmFtIHtBcnJheX0gbWVzc2FnZXMsIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBtZXRob2QgKHJlcXVpcmVkKSBhbmQgcGFyYW1zIChvcHRpb25hbCkgZmllbGRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGJhdGNoIHBheWxvYWRcbiAqL1xuSnNvbnJwYy50b0JhdGNoUGF5bG9hZCA9IGZ1bmN0aW9uIChtZXNzYWdlcykge1xuICAgIHJldHVybiBtZXNzYWdlcy5tYXAoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIEpzb25ycGMudG9QYXlsb2FkKG1lc3NhZ2UubWV0aG9kLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpzb25ycGM7XG5cbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAYXV0aG9yIE1hcmVrIEtvdGV3aWN6IDxtYXJla0BwYXJpdHkuaW8+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1oZWxwZXJzJykuZXJyb3JzO1xudmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtaGVscGVycycpLmZvcm1hdHRlcnM7XG52YXIgdXRpbHMgPSByZXF1aXJlKCd3ZWIzLXV0aWxzJyk7XG52YXIgcHJvbWlFdmVudCA9IHJlcXVpcmUoJ3dlYjMtY29yZS1wcm9taWV2ZW50Jyk7XG52YXIgU3Vic2NyaXB0aW9ucyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1zdWJzY3JpcHRpb25zJykuc3Vic2NyaXB0aW9ucztcblxudmFyIFRJTUVPVVRCTE9DSyA9IDUwO1xudmFyIFBPTExJTkdUSU1FT1VUID0gMTUgKiBUSU1FT1VUQkxPQ0s7IC8vIH5hdmVyYWdlIGJsb2NrIHRpbWUgKHNlY29uZHMpICogVElNRU9VVEJMT0NLXG52YXIgQ09ORklSTUFUSU9OQkxPQ0tTID0gMjQ7XG5cbnZhciBNZXRob2QgPSBmdW5jdGlvbiBNZXRob2Qob3B0aW9ucykge1xuXG4gICAgaWYoIW9wdGlvbnMuY2FsbCB8fCAhb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBjcmVhdGluZyBhIG1ldGhvZCB5b3UgbmVlZCB0byBwcm92aWRlIGF0IGxlYXN0IHRoZSBcIm5hbWVcIiBhbmQgXCJjYWxsXCIgcHJvcGVydHkuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHRoaXMuY2FsbCA9IG9wdGlvbnMuY2FsbDtcbiAgICB0aGlzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zIHx8IDA7XG4gICAgdGhpcy5pbnB1dEZvcm1hdHRlciA9IG9wdGlvbnMuaW5wdXRGb3JtYXR0ZXI7XG4gICAgdGhpcy5vdXRwdXRGb3JtYXR0ZXIgPSBvcHRpb25zLm91dHB1dEZvcm1hdHRlcjtcbiAgICB0aGlzLnRyYW5zZm9ybVBheWxvYWQgPSBvcHRpb25zLnRyYW5zZm9ybVBheWxvYWQ7XG4gICAgdGhpcy5leHRyYUZvcm1hdHRlcnMgPSBvcHRpb25zLmV4dHJhRm9ybWF0dGVycztcblxuICAgIHRoaXMucmVxdWVzdE1hbmFnZXIgPSBvcHRpb25zLnJlcXVlc3RNYW5hZ2VyO1xuXG4gICAgLy8gcmVmZXJlbmNlIHRvIGV0aC5hY2NvdW50c1xuICAgIHRoaXMuYWNjb3VudHMgPSBvcHRpb25zLmFjY291bnRzO1xuXG4gICAgdGhpcy5kZWZhdWx0QmxvY2sgPSBvcHRpb25zLmRlZmF1bHRCbG9jayB8fCAnbGF0ZXN0JztcbiAgICB0aGlzLmRlZmF1bHRBY2NvdW50ID0gb3B0aW9ucy5kZWZhdWx0QWNjb3VudCB8fCBudWxsO1xufTtcblxuTWV0aG9kLnByb3RvdHlwZS5zZXRSZXF1ZXN0TWFuYWdlciA9IGZ1bmN0aW9uIChyZXF1ZXN0TWFuYWdlciwgYWNjb3VudHMpIHtcbiAgICB0aGlzLnJlcXVlc3RNYW5hZ2VyID0gcmVxdWVzdE1hbmFnZXI7XG5cbiAgICAvLyByZWZlcmVuY2UgdG8gZXRoLmFjY291bnRzXG4gICAgaWYgKGFjY291bnRzKSB7XG4gICAgICAgIHRoaXMuYWNjb3VudHMgPSBhY2NvdW50cztcbiAgICB9XG5cbn07XG5cbk1ldGhvZC5wcm90b3R5cGUuY3JlYXRlRnVuY3Rpb24gPSBmdW5jdGlvbiAocmVxdWVzdE1hbmFnZXIsIGFjY291bnRzKSB7XG4gICAgdmFyIGZ1bmMgPSB0aGlzLmJ1aWxkQ2FsbCgpO1xuICAgIGZ1bmMuY2FsbCA9IHRoaXMuY2FsbDtcblxuICAgIHRoaXMuc2V0UmVxdWVzdE1hbmFnZXIocmVxdWVzdE1hbmFnZXIgfHwgdGhpcy5yZXF1ZXN0TWFuYWdlciwgYWNjb3VudHMgfHwgdGhpcy5hY2NvdW50cyk7XG5cbiAgICByZXR1cm4gZnVuYztcbn07XG5cbk1ldGhvZC5wcm90b3R5cGUuYXR0YWNoVG9PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGZ1bmMgPSB0aGlzLmJ1aWxkQ2FsbCgpO1xuICAgIGZ1bmMuY2FsbCA9IHRoaXMuY2FsbDtcbiAgICB2YXIgbmFtZSA9IHRoaXMubmFtZS5zcGxpdCgnLicpO1xuICAgIGlmIChuYW1lLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgb2JqW25hbWVbMF1dID0gb2JqW25hbWVbMF1dIHx8IHt9O1xuICAgICAgICBvYmpbbmFtZVswXV1bbmFtZVsxXV0gPSBmdW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtuYW1lWzBdXSA9IGZ1bmM7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgdXNlZCB0byBkZXRlcm1pbmUgbmFtZSBvZiB0aGUganNvbnJwYyBtZXRob2QgYmFzZWQgb24gYXJndW1lbnRzXG4gKlxuICogQG1ldGhvZCBnZXRDYWxsXG4gKiBAcGFyYW0ge0FycmF5fSBhcmd1bWVudHNcbiAqIEByZXR1cm4ge1N0cmluZ30gbmFtZSBvZiBqc29ucnBjIG1ldGhvZFxuICovXG5NZXRob2QucHJvdG90eXBlLmdldENhbGwgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odGhpcy5jYWxsKSA/IHRoaXMuY2FsbChhcmdzKSA6IHRoaXMuY2FsbDtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gZXh0cmFjdCBjYWxsYmFjayBmcm9tIGFycmF5IG9mIGFyZ3VtZW50cy4gTW9kaWZpZXMgaW5wdXQgcGFyYW1cbiAqXG4gKiBAbWV0aG9kIGV4dHJhY3RDYWxsYmFja1xuICogQHBhcmFtIHtBcnJheX0gYXJndW1lbnRzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbnxOdWxsfSBjYWxsYmFjaywgaWYgZXhpc3RzXG4gKi9cbk1ldGhvZC5wcm90b3R5cGUuZXh0cmFjdENhbGxiYWNrID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGFyZ3NbYXJncy5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3MucG9wKCk7IC8vIG1vZGlmeSB0aGUgYXJncyBhcnJheSFcbiAgICB9XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gY2hlY2sgaWYgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgaXMgY29ycmVjdFxuICpcbiAqIEBtZXRob2QgdmFsaWRhdGVBcmdzXG4gKiBAcGFyYW0ge0FycmF5fSBhcmd1bWVudHNcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBpdCBpcyBub3RcbiAqL1xuTWV0aG9kLnByb3RvdHlwZS52YWxpZGF0ZUFyZ3MgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JzLkludmFsaWROdW1iZXJPZlBhcmFtcyhhcmdzLmxlbmd0aCwgdGhpcy5wYXJhbXMsIHRoaXMubmFtZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGZvcm1hdCBpbnB1dCBhcmdzIG9mIG1ldGhvZFxuICpcbiAqIEBtZXRob2QgZm9ybWF0SW5wdXRcbiAqIEBwYXJhbSB7QXJyYXl9XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuTWV0aG9kLnByb3RvdHlwZS5mb3JtYXRJbnB1dCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICghdGhpcy5pbnB1dEZvcm1hdHRlcikge1xuICAgICAgICByZXR1cm4gYXJncztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbnB1dEZvcm1hdHRlci5tYXAoZnVuY3Rpb24gKGZvcm1hdHRlciwgaW5kZXgpIHtcbiAgICAgICAgLy8gYmluZCB0aGlzIGZvciBkZWZhdWx0QmxvY2ssIGFuZCBkZWZhdWx0QWNjb3VudFxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyID8gZm9ybWF0dGVyLmNhbGwoX3RoaXMsIGFyZ3NbaW5kZXhdKSA6IGFyZ3NbaW5kZXhdO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGZvcm1hdCBvdXRwdXQocmVzdWx0KSBvZiBtZXRob2RcbiAqXG4gKiBAbWV0aG9kIGZvcm1hdE91dHB1dFxuICogQHBhcmFtIHtPYmplY3R9XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbk1ldGhvZC5wcm90b3R5cGUuZm9ybWF0T3V0cHV0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZihfLmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm91dHB1dEZvcm1hdHRlciAmJiByZXMgPyBfdGhpcy5vdXRwdXRGb3JtYXR0ZXIocmVzKSA6IHJlcztcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Rm9ybWF0dGVyICYmIHJlc3VsdCA/IHRoaXMub3V0cHV0Rm9ybWF0dGVyKHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTaG91bGQgY3JlYXRlIHBheWxvYWQgZnJvbSBnaXZlbiBpbnB1dCBhcmdzXG4gKlxuICogQG1ldGhvZCB0b1BheWxvYWRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuTWV0aG9kLnByb3RvdHlwZS50b1BheWxvYWQgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHZhciBjYWxsID0gdGhpcy5nZXRDYWxsKGFyZ3MpO1xuICAgIHZhciBjYWxsYmFjayA9IHRoaXMuZXh0cmFjdENhbGxiYWNrKGFyZ3MpO1xuICAgIHZhciBwYXJhbXMgPSB0aGlzLmZvcm1hdElucHV0KGFyZ3MpO1xuICAgIHRoaXMudmFsaWRhdGVBcmdzKHBhcmFtcyk7XG5cbiAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgICAgbWV0aG9kOiBjYWxsLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRyYW5zZm9ybVBheWxvYWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IHRoaXMudHJhbnNmb3JtUGF5bG9hZChwYXlsb2FkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF5bG9hZDtcbn07XG5cblxuTWV0aG9kLnByb3RvdHlwZS5fY29uZmlybVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKGRlZmVyLCByZXN1bHQsIHBheWxvYWQpIHtcbiAgICB2YXIgbWV0aG9kID0gdGhpcyxcbiAgICAgICAgcHJvbWlzZVJlc29sdmVkID0gZmFsc2UsXG4gICAgICAgIGNhblVuc3Vic2NyaWJlID0gdHJ1ZSxcbiAgICAgICAgdGltZW91dENvdW50ID0gMCxcbiAgICAgICAgY29uZmlybWF0aW9uQ291bnQgPSAwLFxuICAgICAgICBpbnRlcnZhbElkID0gbnVsbCxcbiAgICAgICAgcmVjZWlwdEpTT04gPSAnJyxcbiAgICAgICAgZ2FzUHJvdmlkZWQgPSAoXy5pc09iamVjdChwYXlsb2FkLnBhcmFtc1swXSkgJiYgcGF5bG9hZC5wYXJhbXNbMF0uZ2FzKSA/IHBheWxvYWQucGFyYW1zWzBdLmdhcyA6IG51bGwsXG4gICAgICAgIGlzQ29udHJhY3REZXBsb3ltZW50ID0gXy5pc09iamVjdChwYXlsb2FkLnBhcmFtc1swXSkgJiZcbiAgICAgICAgICAgIHBheWxvYWQucGFyYW1zWzBdLmRhdGEgJiZcbiAgICAgICAgICAgIHBheWxvYWQucGFyYW1zWzBdLmZyb20gJiZcbiAgICAgICAgICAgICFwYXlsb2FkLnBhcmFtc1swXS50bztcblxuICAgIC8vIGFkZCBjdXN0b20gc2VuZCBNZXRob2RzXG4gICAgdmFyIF9ldGhlcmV1bUNhbGxzID0gW1xuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRUcmFuc2FjdGlvblJlY2VpcHQnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQnLFxuICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtudWxsXSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogZm9ybWF0dGVycy5vdXRwdXRUcmFuc2FjdGlvblJlY2VpcHRGb3JtYXR0ZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldENvZGUnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9nZXRDb2RlJyxcbiAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIsIGZvcm1hdHRlcnMuaW5wdXREZWZhdWx0QmxvY2tOdW1iZXJGb3JtYXR0ZXJdXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgU3Vic2NyaXB0aW9ucyh7XG4gICAgICAgICAgICBuYW1lOiAnc3Vic2NyaWJlJyxcbiAgICAgICAgICAgIHR5cGU6ICdldGgnLFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczoge1xuICAgICAgICAgICAgICAgICduZXdCbG9ja0hlYWRlcnMnOiB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbk5hbWU6ICduZXdIZWFkcycsIC8vIHJlcGxhY2Ugc3Vic2NyaXB0aW9uIHdpdGggdGhpcyBuYW1lXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogMCxcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXJzLm91dHB1dEJsb2NrRm9ybWF0dGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF07XG4gICAgLy8gYXR0YWNoIG1ldGhvZHMgdG8gdGhpcy5fZXRoZXJldW1DYWxsXG4gICAgdmFyIF9ldGhlcmV1bUNhbGwgPSB7fTtcbiAgICBfLmVhY2goX2V0aGVyZXVtQ2FsbHMsIGZ1bmN0aW9uIChtdGhkKSB7XG4gICAgICAgIG10aGQuYXR0YWNoVG9PYmplY3QoX2V0aGVyZXVtQ2FsbCk7XG4gICAgICAgIG10aGQucmVxdWVzdE1hbmFnZXIgPSBtZXRob2QucmVxdWVzdE1hbmFnZXI7IC8vIGFzc2lnbiByYXRoZXIgdGhhbiBjYWxsIHNldFJlcXVlc3RNYW5hZ2VyKClcbiAgICB9KTtcblxuXG4gICAgLy8gZmlyZSBcInJlY2VpcHRcIiBhbmQgY29uZmlybWF0aW9uIGV2ZW50cyBhbmQgcmVzb2x2ZSBhZnRlclxuICAgIHZhciBjaGVja0NvbmZpcm1hdGlvbiA9IGZ1bmN0aW9uIChleGlzdGluZ1JlY2VpcHQsIGlzUG9sbGluZywgZXJyLCBibG9ja0hlYWRlciwgc3ViKSB7XG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgZmFrZSB1bnN1YnNjcmliZVxuICAgICAgICAgICAgaWYgKCFzdWIpIHtcbiAgICAgICAgICAgICAgICBzdWIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYSB2YWxpZCByZWNlaXB0IHdlIGRvbid0IG5lZWQgdG8gc2VuZCBhIHJlcXVlc3RcbiAgICAgICAgICAgIHJldHVybiAoZXhpc3RpbmdSZWNlaXB0ID8gcHJvbWlFdmVudC5yZXNvbHZlKGV4aXN0aW5nUmVjZWlwdCkgOiBfZXRoZXJldW1DYWxsLmdldFRyYW5zYWN0aW9uUmVjZWlwdChyZXN1bHQpKVxuICAgICAgICAgICAgLy8gY2F0Y2ggZXJyb3IgZnJvbSByZXF1ZXN0aW5nIHJlY2VpcHRcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgcHJvbWlzZVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB1dGlscy5fZmlyZUVycm9yKHttZXNzYWdlOiAnRmFpbGVkIHRvIGNoZWNrIGZvciB0cmFuc2FjdGlvbiByZWNlaXB0OicsIGRhdGE6IGVycn0sIGRlZmVyLmV2ZW50RW1pdHRlciwgZGVmZXIucmVqZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBpZiBDT05GSVJNQVRJT04gbGlzdGVuZXIgZXhpc3RzIGNoZWNrIGZvciBjb25maXJtYXRpb25zLCBieSBzZXR0aW5nIGNhblVuc3Vic2NyaWJlID0gZmFsc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY2VpcHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlY2VpcHQgfHwgIXJlY2VpcHQuYmxvY2tIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVjZWlwdCBtaXNzaW5nIG9yIGJsb2NrSGFzaCBudWxsJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgZXh0cmEgZm9ybWF0dGVyc1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QuZXh0cmFGb3JtYXR0ZXJzICYmIG1ldGhvZC5leHRyYUZvcm1hdHRlcnMucmVjZWlwdEZvcm1hdHRlcikge1xuICAgICAgICAgICAgICAgICAgICByZWNlaXB0ID0gbWV0aG9kLmV4dHJhRm9ybWF0dGVycy5yZWNlaXB0Rm9ybWF0dGVyKHJlY2VpcHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGNvbmZpcm1hdGlvbiBsaXN0ZW5lciBleGlzdHNcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXIuZXZlbnRFbWl0dGVyLmxpc3RlbmVycygnY29uZmlybWF0aW9uJykubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBpbW1lZGlhdGVseSByZXRyaWV2ZWQgcmVjZWlwdCwgaXQncyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIC8vIGJlZW4gY29uZmlybWVkIGJ5IHRoZSBkaXJlY3QgY2FsbCB0byBjaGVja0NvbmZpcm1hdGlvbiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHBhcml0eSBpbnN0YW50LXNlYWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nUmVjZWlwdCA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpcm1hdGlvbkNvdW50ICE9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLmV2ZW50RW1pdHRlci5lbWl0KCdjb25maXJtYXRpb24nLCBjb25maXJtYXRpb25Db3VudCwgcmVjZWlwdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW5VbnN1YnNjcmliZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtYXRpb25Db3VudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtYXRpb25Db3VudCA9PT0gQ09ORklSTUFUSU9OQkxPQ0tTICsgMSkgeyAvLyBhZGQgMSBzbyB3ZSBhY2NvdW50IGZvciBjb25mIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIuZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpcHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gQ0hFQ0sgZm9yIENPTlRSQUNUIERFUExPWU1FTlRcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY2VpcHQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpc0NvbnRyYWN0RGVwbG95bWVudCAmJiAhcHJvbWlzZVJlc29sdmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5fZmlyZUVycm9yKG5ldyBFcnJvcignVGhlIHRyYW5zYWN0aW9uIHJlY2VpcHQgZGlkblxcJ3QgY29udGFpbiBhIGNvbnRyYWN0IGFkZHJlc3MuJyksIGRlZmVyLmV2ZW50RW1pdHRlciwgZGVmZXIucmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF9ldGhlcmV1bUNhbGwuZ2V0Q29kZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcywgZnVuY3Rpb24gKGUsIGNvZGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5ldmVudEVtaXR0ZXIuZW1pdCgncmVjZWlwdCcsIHJlY2VpcHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgY29udHJhY3QsIHJldHVybiBpbnN0YW5jZSBpbnN0ZWFkIG9mIHJlY2VpcHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kLmV4dHJhRm9ybWF0dGVycyAmJiBtZXRob2QuZXh0cmFGb3JtYXR0ZXJzLmNvbnRyYWN0RGVwbG95Rm9ybWF0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUobWV0aG9kLmV4dHJhRm9ybWF0dGVycy5jb250cmFjdERlcGxveUZvcm1hdHRlcihyZWNlaXB0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZWNlaXB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGFzIHRoZXkgYXJlbid0IHJlbW92ZWQgYXV0b21hdGljYWxseSB3aGVuIHN1Y2Nlc2Z1bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIuZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5fZmlyZUVycm9yKG5ldyBFcnJvcignVGhlIGNvbnRyYWN0IGNvZGUgY291bGRuXFwndCBiZSBzdG9yZWQsIHBsZWFzZSBjaGVjayB5b3VyIGdhcyBsaW1pdC4nKSwgZGVmZXIuZXZlbnRFbWl0dGVyLCBkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VSZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXB0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIENIRUNLIGZvciBub3JtYWwgdHggY2hlY2sgZm9yIHJlY2VpcHQgb25seVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjZWlwdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0NvbnRyYWN0RGVwbG95bWVudCAmJiAhcHJvbWlzZVJlc29sdmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlY2VpcHQub3V0T2ZHYXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICghZ2FzUHJvdmlkZWQgfHwgZ2FzUHJvdmlkZWQgIT09IHJlY2VpcHQuZ2FzVXNlZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZWNlaXB0LnN0YXR1cyA9PT0gdHJ1ZSB8fCByZWNlaXB0LnN0YXR1cyA9PT0gJzB4MScgfHwgdHlwZW9mIHJlY2VpcHQuc3RhdHVzID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLmV2ZW50RW1pdHRlci5lbWl0KCdyZWNlaXB0JywgcmVjZWlwdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlY2VpcHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGFzIHRoZXkgYXJlbid0IHJlbW92ZWQgYXV0b21hdGljYWxseSB3aGVuIHN1Y2Nlc2Z1bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5VbnN1YnNjcmliZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLmV2ZW50RW1pdHRlci5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWlwdEpTT04gPSBKU09OLnN0cmluZ2lmeShyZWNlaXB0LCBudWxsLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNlaXB0LnN0YXR1cyA9PT0gZmFsc2UgfHwgcmVjZWlwdC5zdGF0dXMgPT09ICcweDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuX2ZpcmVFcnJvcihuZXcgRXJyb3IoXCJUcmFuc2FjdGlvbiBoYXMgYmVlbiByZXZlcnRlZCBieSB0aGUgRVZNOlxcblwiICsgcmVjZWlwdEpTT04pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5ldmVudEVtaXR0ZXIsIGRlZmVyLnJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLl9maXJlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihcIlRyYW5zYWN0aW9uIHJhbiBvdXQgb2YgZ2FzLiBQbGVhc2UgcHJvdmlkZSBtb3JlIGdhczpcXG5cIiArIHJlY2VpcHRKU09OKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIuZXZlbnRFbWl0dGVyLCBkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhblVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHRpbWUgb3V0IHRoZSB0cmFuc2FjdGlvbiBpZiBub3QgbWluZWQgYWZ0ZXIgNTAgYmxvY2tzXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXRDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlIGFyZSBodHRwIHBvbGxpbmdcbiAgICAgICAgICAgICAgICBpZighIWlzUG9sbGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBwb2xsaW5nIHRpbWVvdXQgaXMgZGlmZmVyZW50IHRoYW4gVElNRU9VVEJMT0NLIGJsb2NrcyBzaW5jZSB3ZSBhcmUgdHJpZ2dlcmluZyBldmVyeSBzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXRDb3VudCAtIDEgPj0gUE9MTElOR1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLl9maXJlRXJyb3IobmV3IEVycm9yKCdUcmFuc2FjdGlvbiB3YXMgbm90IG1pbmVkIHdpdGhpbicgKyBQT0xMSU5HVElNRU9VVCArICcgc2Vjb25kcywgcGxlYXNlIG1ha2Ugc3VyZSB5b3VyIHRyYW5zYWN0aW9uIHdhcyBwcm9wZXJseSBzZW50LiBCZSBhd2FyZSB0aGF0IGl0IG1pZ2h0IHN0aWxsIGJlIG1pbmVkIScpLCBkZWZlci5ldmVudEVtaXR0ZXIsIGRlZmVyLnJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGltZW91dENvdW50IC0gMSA+PSBUSU1FT1VUQkxPQ0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLl9maXJlRXJyb3IobmV3IEVycm9yKCdUcmFuc2FjdGlvbiB3YXMgbm90IG1pbmVkIHdpdGhpbiA1MCBibG9ja3MsIHBsZWFzZSBtYWtlIHN1cmUgeW91ciB0cmFuc2FjdGlvbiB3YXMgcHJvcGVybHkgc2VudC4gQmUgYXdhcmUgdGhhdCBpdCBtaWdodCBzdGlsbCBiZSBtaW5lZCEnKSwgZGVmZXIuZXZlbnRFbWl0dGVyLCBkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBwcm9taXNlUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbHMuX2ZpcmVFcnJvcih7bWVzc2FnZTogJ0ZhaWxlZCB0byBzdWJzY3JpYmUgdG8gbmV3IG5ld0Jsb2NrSGVhZGVycyB0byBjb25maXJtIHRoZSB0cmFuc2FjdGlvbiByZWNlaXB0cy4nLCBkYXRhOiBlcnJ9LCBkZWZlci5ldmVudEVtaXR0ZXIsIGRlZmVyLnJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gc3RhcnQgd2F0Y2hpbmcgZm9yIGNvbmZpcm1hdGlvbiBkZXBlbmRpbmcgb24gdGhlIHN1cHBvcnQgZmVhdHVyZXMgb2YgdGhlIHByb3ZpZGVyXG4gICAgdmFyIHN0YXJ0V2F0Y2hpbmcgPSBmdW5jdGlvbihleGlzdGluZ1JlY2VpcHQpIHtcbiAgICAgICAgLy8gaWYgcHJvdmlkZXIgYWxsb3dzIFBVQi9TVUJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnJlcXVlc3RNYW5hZ2VyLnByb3ZpZGVyLm9uKSkge1xuICAgICAgICAgICAgX2V0aGVyZXVtQ2FsbC5zdWJzY3JpYmUoJ25ld0Jsb2NrSGVhZGVycycsIGNoZWNrQ29uZmlybWF0aW9uLmJpbmQobnVsbCwgZXhpc3RpbmdSZWNlaXB0LCBmYWxzZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGNoZWNrQ29uZmlybWF0aW9uLmJpbmQobnVsbCwgZXhpc3RpbmdSZWNlaXB0LCB0cnVlKSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcyk7XG5cblxuICAgIC8vIGZpcnN0IGNoZWNrIGlmIHdlIGFscmVhZHkgaGF2ZSBhIGNvbmZpcm1lZCB0cmFuc2FjdGlvblxuICAgIF9ldGhlcmV1bUNhbGwuZ2V0VHJhbnNhY3Rpb25SZWNlaXB0KHJlc3VsdClcbiAgICAudGhlbihmdW5jdGlvbihyZWNlaXB0KSB7XG4gICAgICAgIGlmIChyZWNlaXB0ICYmIHJlY2VpcHQuYmxvY2tIYXNoKSB7XG4gICAgICAgICAgICBpZiAoZGVmZXIuZXZlbnRFbWl0dGVyLmxpc3RlbmVycygnY29uZmlybWF0aW9uJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIG11c3Qga2VlcCBvbiB3YXRjaGluZyBmb3IgbmV3IEJsb2NrcywgaWYgYSBjb25maXJtYXRpb24gbGlzdGVuZXIgaXMgcHJlc2VudFxuICAgICAgICAgICAgICAgIHN0YXJ0V2F0Y2hpbmcocmVjZWlwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVja0NvbmZpcm1hdGlvbihyZWNlaXB0LCBmYWxzZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghcHJvbWlzZVJlc29sdmVkKSB7XG4gICAgICAgICAgICBzdGFydFdhdGNoaW5nKCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoIXByb21pc2VSZXNvbHZlZCkgc3RhcnRXYXRjaGluZygpO1xuICAgIH0pO1xuXG59O1xuXG5cbnZhciBnZXRXYWxsZXQgPSBmdW5jdGlvbihmcm9tLCBhY2NvdW50cykge1xuICAgIHZhciB3YWxsZXQgPSBudWxsO1xuXG4gICAgLy8gaXMgaW5kZXggZ2l2ZW5cbiAgICBpZiAoXy5pc051bWJlcihmcm9tKSkge1xuICAgICAgICB3YWxsZXQgPSBhY2NvdW50cy53YWxsZXRbZnJvbV07XG5cbiAgICAgICAgLy8gaXMgYWNjb3VudCBnaXZlblxuICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdChmcm9tKSAmJiBmcm9tLmFkZHJlc3MgJiYgZnJvbS5wcml2YXRlS2V5KSB7XG4gICAgICAgIHdhbGxldCA9IGZyb207XG5cbiAgICAgICAgLy8gc2VhcmNoIGluIHdhbGxldCBmb3IgYWRkcmVzc1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdhbGxldCA9IGFjY291bnRzLndhbGxldFtmcm9tLnRvTG93ZXJDYXNlKCldO1xuICAgIH1cblxuICAgIHJldHVybiB3YWxsZXQ7XG59O1xuXG5NZXRob2QucHJvdG90eXBlLmJ1aWxkQ2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLFxuICAgICAgICBpc1NlbmRUeCA9IChtZXRob2QuY2FsbCA9PT0gJ2V0aF9zZW5kVHJhbnNhY3Rpb24nIHx8IG1ldGhvZC5jYWxsID09PSAnZXRoX3NlbmRSYXdUcmFuc2FjdGlvbicpOyAvLyB8fCBtZXRob2QuY2FsbCA9PT0gJ3BlcnNvbmFsX3NlbmRUcmFuc2FjdGlvbidcblxuICAgIC8vIGFjdHVhbCBzZW5kIGZ1bmN0aW9uXG4gICAgdmFyIHNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWZlciA9IHByb21pRXZlbnQoIWlzU2VuZFR4KSxcbiAgICAgICAgICAgIHBheWxvYWQgPSBtZXRob2QudG9QYXlsb2FkKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXG5cbiAgICAgICAgLy8gQ0FMTEJBQ0sgZnVuY3Rpb25cbiAgICAgICAgdmFyIHNlbmRUeENhbGxiYWNrID0gZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1ldGhvZC5mb3JtYXRPdXRwdXQocmVzdWx0KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGVyciA9IGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIGVyciA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihlcnIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID0gZXJyLmVycm9yO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB1dGlscy5fZmlyZUVycm9yKGVyciwgZGVmZXIuZXZlbnRFbWl0dGVyLCBkZWZlci5yZWplY3QsIHBheWxvYWQuY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gUFJPTUlTRVxuICAgICAgICAgICAgaWYgKCFpc1NlbmRUeCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIFBST01JRVZFTlRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXIuZXZlbnRFbWl0dGVyLmVtaXQoJ3RyYW5zYWN0aW9uSGFzaCcsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBtZXRob2QuX2NvbmZpcm1UcmFuc2FjdGlvbihkZWZlciwgcmVzdWx0LCBwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNFTkRTIHRoZSBTSUdORUQgU0lHTkFUVVJFXG4gICAgICAgIHZhciBzZW5kU2lnbmVkVHggPSBmdW5jdGlvbihzaWduKXtcblxuICAgICAgICAgICAgdmFyIHNpZ25lZFBheWxvYWQgPSBfLmV4dGVuZCh7fSwgcGF5bG9hZCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2V0aF9zZW5kUmF3VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIHBhcmFtczogW3NpZ24ucmF3VHJhbnNhY3Rpb25dXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWV0aG9kLnJlcXVlc3RNYW5hZ2VyLnNlbmQoc2lnbmVkUGF5bG9hZCwgc2VuZFR4Q2FsbGJhY2spO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgdmFyIHNlbmRSZXF1ZXN0ID0gZnVuY3Rpb24ocGF5bG9hZCwgbWV0aG9kKSB7XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgJiYgbWV0aG9kLmFjY291bnRzICYmIG1ldGhvZC5hY2NvdW50cy53YWxsZXQgJiYgbWV0aG9kLmFjY291bnRzLndhbGxldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2FsbGV0O1xuXG4gICAgICAgICAgICAgICAgLy8gRVRIX1NFTkRUUkFOU0FDVElPTlxuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLm1ldGhvZCA9PT0gJ2V0aF9zZW5kVHJhbnNhY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eCA9IHBheWxvYWQucGFyYW1zWzBdO1xuICAgICAgICAgICAgICAgICAgICB3YWxsZXQgPSBnZXRXYWxsZXQoKF8uaXNPYmplY3QodHgpKSA/IHR4LmZyb20gOiBudWxsLCBtZXRob2QuYWNjb3VudHMpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2FsbGV0IHdhcyBmb3VuZCwgc2lnbiB0eCwgYW5kIHNlbmQgdXNpbmcgc2VuZFJhd1RyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh3YWxsZXQgJiYgd2FsbGV0LnByaXZhdGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2QuYWNjb3VudHMuc2lnblRyYW5zYWN0aW9uKF8ub21pdCh0eCwgJ2Zyb20nKSwgd2FsbGV0LnByaXZhdGVLZXkpLnRoZW4oc2VuZFNpZ25lZFR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVUSF9TSUdOXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLm1ldGhvZCA9PT0gJ2V0aF9zaWduJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHBheWxvYWQucGFyYW1zWzFdO1xuICAgICAgICAgICAgICAgICAgICB3YWxsZXQgPSBnZXRXYWxsZXQocGF5bG9hZC5wYXJhbXNbMF0sIG1ldGhvZC5hY2NvdW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2FsbGV0IHdhcyBmb3VuZCwgc2lnbiB0eCwgYW5kIHNlbmQgdXNpbmcgc2VuZFJhd1RyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh3YWxsZXQgJiYgd2FsbGV0LnByaXZhdGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWduID0gbWV0aG9kLmFjY291bnRzLnNpZ24oZGF0YSwgd2FsbGV0LnByaXZhdGVLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuY2FsbGJhY2sobnVsbCwgc2lnbi5zaWduYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHNpZ24uc2lnbmF0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZXRob2QucmVxdWVzdE1hbmFnZXIuc2VuZChwYXlsb2FkLCBzZW5kVHhDYWxsYmFjayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2VuZCB0aGUgYWN0dWFsIHRyYW5zYWN0aW9uXG4gICAgICAgIGlmKGlzU2VuZFR4ICYmIF8uaXNPYmplY3QocGF5bG9hZC5wYXJhbXNbMF0pICYmIHR5cGVvZiBwYXlsb2FkLnBhcmFtc1swXS5nYXNQcmljZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdmFyIGdldEdhc1ByaWNlID0gKG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdnZXRHYXNQcmljZScsXG4gICAgICAgICAgICAgICAgY2FsbDogJ2V0aF9nYXNQcmljZScsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgICAgICB9KSkuY3JlYXRlRnVuY3Rpb24obWV0aG9kLnJlcXVlc3RNYW5hZ2VyKTtcblxuICAgICAgICAgICAgZ2V0R2FzUHJpY2UoZnVuY3Rpb24gKGVyciwgZ2FzUHJpY2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChnYXNQcmljZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnBhcmFtc1swXS5nYXNQcmljZSA9IGdhc1ByaWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZW5kUmVxdWVzdChwYXlsb2FkLCBtZXRob2QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRSZXF1ZXN0KHBheWxvYWQsIG1ldGhvZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBkZWZlci5ldmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIG5lY2Vzc2FyeSB0byBhdHRhY2ggdGhpbmdzIHRvIHRoZSBtZXRob2RcbiAgICBzZW5kLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAvLyBuZWNlc3NhcnkgZm9yIGJhdGNoIHJlcXVlc3RzXG4gICAgc2VuZC5yZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0LmJpbmQodGhpcyk7XG4gICAgcmV0dXJuIHNlbmQ7XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gY3JlYXRlIHRoZSBwdXJlIEpTT05SUEMgcmVxdWVzdCB3aGljaCBjYW4gYmUgdXNlZCBpbiBhIGJhdGNoIHJlcXVlc3RcbiAqXG4gKiBAbWV0aG9kIHJlcXVlc3RcbiAqIEByZXR1cm4ge09iamVjdH0ganNvbnJwYyByZXF1ZXN0XG4gKi9cbk1ldGhvZC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMudG9QYXlsb2FkKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHBheWxvYWQuZm9ybWF0ID0gdGhpcy5mb3JtYXRPdXRwdXQuYmluZCh0aGlzKTtcbiAgICByZXR1cm4gcGF5bG9hZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWV0aG9kO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==