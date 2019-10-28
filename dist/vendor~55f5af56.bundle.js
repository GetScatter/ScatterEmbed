(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "+QiP":
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
 * @file ResolverMethodHandler.js
 *
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */



var PromiEvent = __webpack_require__("VWKx");
var namehash = __webpack_require__("LAvi");
var _ = __webpack_require__("F/us");

/**
 * @param {Registry} registry
 * @constructor
 */
function ResolverMethodHandler(registry) {
    this.registry = registry;
}

/**
 * Executes an resolver method and returns an eventifiedPromise
 *
 * @param {string} ensName
 * @param {string} methodName
 * @param {array} methodArguments
 * @param {function} callback
 * @returns {Object}
 */
ResolverMethodHandler.prototype.method = function (ensName, methodName, methodArguments, callback) {
    return {
        call: this.call.bind({
            ensName: ensName,
            methodName: methodName,
            methodArguments: methodArguments,
            callback: callback,
            parent: this
        }),
        send: this.send.bind({
            ensName: ensName,
            methodName: methodName,
            methodArguments: methodArguments,
            callback: callback,
            parent: this
        })
    };
};

/**
 * Executes call
 *
 * @returns {eventifiedPromise}
 */
ResolverMethodHandler.prototype.call = function (callback) {
    var self = this;
    var promiEvent = new PromiEvent();
    var preparedArguments = this.parent.prepareArguments(this.ensName, this.methodArguments);

    this.parent.registry.resolver(this.ensName).then(function (resolver) {
        self.parent.handleCall(promiEvent, resolver.methods[self.methodName], preparedArguments, callback);
    }).catch(function (error) {
        promiEvent.reject(error);
    });

    return promiEvent.eventEmitter;
};


/**
 * Executes send
 *
 * @param {Object} sendOptions
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ResolverMethodHandler.prototype.send = function (sendOptions, callback) {
    var self = this;
    var promiEvent = new PromiEvent();
    var preparedArguments = this.parent.prepareArguments(this.ensName, this.methodArguments);

    this.parent.registry.resolver(this.ensName).then(function (resolver) {
        self.parent.handleSend(promiEvent, resolver.methods[self.methodName], preparedArguments, sendOptions, callback);
    }).catch(function (error) {
        promiEvent.reject(error);
    });

    return promiEvent.eventEmitter;
};

/**
 * Handles a call method
 *
 * @param {eventifiedPromise} promiEvent
 * @param {function} method
 * @param {array} preparedArguments
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ResolverMethodHandler.prototype.handleCall = function (promiEvent, method, preparedArguments, callback) {
    method.apply(this, preparedArguments).call()
        .then(function (receipt) {
            promiEvent.resolve(receipt);

            if (_.isFunction(callback)) {
                callback(receipt);
            }
        }).catch(function (error) {
            promiEvent.reject(error);

            if (_.isFunction(callback)) {
                callback(error);
            }
        });

    return promiEvent;
};

/**
 * Handles a send method
 *
 * @param {eventifiedPromise} promiEvent
 * @param {function} method
 * @param {array} preparedArguments
 * @param {Object} sendOptions
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ResolverMethodHandler.prototype.handleSend = function (promiEvent, method, preparedArguments, sendOptions, callback) {
    method.apply(this, preparedArguments).send(sendOptions)
        .on('transactionHash', function (hash) {
            promiEvent.eventEmitter.emit('transactionHash', hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            promiEvent.eventEmitter.emit('confirmation', confirmationNumber, receipt);
        })
        .on('receipt', function (receipt) {
            promiEvent.eventEmitter.emit('receipt', receipt);
            promiEvent.resolve(receipt);

            if (_.isFunction(callback)) {
                callback(receipt);
            }
        })
        .on('error', function (error) {
            promiEvent.eventEmitter.emit('error', error);
            promiEvent.reject(error);

            if (_.isFunction(callback)) {
                callback(error);
            }
        });

    return promiEvent;
};

/**
 * Adds the ENS node to the arguments
 *
 * @param {string} name
 * @param {array} methodArguments
 * @returns {array}
 */
ResolverMethodHandler.prototype.prepareArguments = function (name, methodArguments) {
    var node = namehash.hash(name);

    if (methodArguments.length > 0) {
        methodArguments.unshift(node);

        return methodArguments;
    }

    return [node];
};

module.exports = ResolverMethodHandler;


/***/ }),

/***/ "0QDG":
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
 * @file contract.js
 *
 * To initialize a contract use:
 *
 *  var Contract = require('web3-eth-contract');
 *  Contract.setProvider('ws://localhost:8546');
 *  var contract = new Contract(abi, address, ...);
 *
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */





var _ = __webpack_require__("F/us");
var core = __webpack_require__("8e6A");
var Method = __webpack_require__("Ykib");
var utils = __webpack_require__("ETH1");
var Subscription = __webpack_require__("SSMb").subscription;
var formatters = __webpack_require__("OdSp").formatters;
var errors = __webpack_require__("OdSp").errors;
var promiEvent = __webpack_require__("VWKx");
var abi = __webpack_require__("u6/g");


/**
 * Should be called to create new contract instance
 *
 * @method Contract
 * @constructor
 * @param {Array} jsonInterface
 * @param {String} address
 * @param {Object} options
 */
var Contract = function Contract(jsonInterface, address, options) {
    var _this = this,
        args = Array.prototype.slice.call(arguments);

    if(!(this instanceof Contract)) {
        throw new Error('Please use the "new" keyword to instantiate a web3.eth.contract() object!');
    }

    // sets _requestmanager
    core.packageInit(this, [this.constructor.currentProvider]);

    this.clearSubscriptions = this._requestManager.clearSubscriptions;



    if(!jsonInterface || !(Array.isArray(jsonInterface))) {
        throw new Error('You must provide the json interface of the contract when instantiating a contract object.');
    }



    // create the options object
    this.options = {};

    var lastArg = args[args.length - 1];
    if(_.isObject(lastArg) && !_.isArray(lastArg)) {
        options = lastArg;

        this.options = _.extend(this.options, this._getOrSetDefaultOptions(options));
        if(_.isObject(address)) {
            address = null;
        }
    }

    // set address
    Object.defineProperty(this.options, 'address', {
        set: function(value){
            if(value) {
                _this._address = utils.toChecksumAddress(formatters.inputAddressFormatter(value));
            }
        },
        get: function(){
            return _this._address;
        },
        enumerable: true
    });

    // add method and event signatures, when the jsonInterface gets set
    Object.defineProperty(this.options, 'jsonInterface', {
        set: function(value){
            _this.methods = {};
            _this.events = {};

            _this._jsonInterface = value.map(function(method) {
                var func,
                    funcName;

                // make constant and payable backwards compatible
                method.constant = (method.stateMutability === "view" || method.stateMutability === "pure" || method.constant);
                method.payable = (method.stateMutability === "payable" || method.payable);


                if (method.name) {
                    funcName = utils._jsonInterfaceMethodToString(method);
                }


                // function
                if (method.type === 'function') {
                    method.signature = abi.encodeFunctionSignature(funcName);
                    func = _this._createTxObject.bind({
                        method: method,
                        parent: _this
                    });


                    // add method only if not one already exists
                    if(!_this.methods[method.name]) {
                        _this.methods[method.name] = func;
                    } else {
                        var cascadeFunc = _this._createTxObject.bind({
                            method: method,
                            parent: _this,
                            nextMethod: _this.methods[method.name]
                        });
                        _this.methods[method.name] = cascadeFunc;
                    }

                    // definitely add the method based on its signature
                    _this.methods[method.signature] = func;

                    // add method by name
                    _this.methods[funcName] = func;


                // event
                } else if (method.type === 'event') {
                    method.signature = abi.encodeEventSignature(funcName);
                    var event = _this._on.bind(_this, method.signature);

                    // add method only if not already exists
                    if(!_this.events[method.name] || _this.events[method.name].name === 'bound ')
                        _this.events[method.name] = event;

                    // definitely add the method based on its signature
                    _this.events[method.signature] = event;

                    // add event by name
                    _this.events[funcName] = event;
                }


                return method;
            });

            // add allEvents
            _this.events.allEvents = _this._on.bind(_this, 'allevents');

            return _this._jsonInterface;
        },
        get: function(){
            return _this._jsonInterface;
        },
        enumerable: true
    });

    // get default account from the Class
    var defaultAccount = this.constructor.defaultAccount;
    var defaultBlock = this.constructor.defaultBlock || 'latest';

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatters.inputAddressFormatter(val));
            }

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;

            return val;
        },
        enumerable: true
    });

    // properties
    this.methods = {};
    this.events = {};

    this._address = null;
    this._jsonInterface = [];

    // set getter/setter properties
    this.options.address = address;
    this.options.jsonInterface = jsonInterface;

};

Contract.setProvider = function(provider, accounts) {
    // Contract.currentProvider = provider;
    core.packageInit(this, [provider]);

    this._ethAccounts = accounts;
};


/**
 * Get the callback and modiufy the array if necessary
 *
 * @method _getCallback
 * @param {Array} args
 * @return {Function} the callback
 */
Contract.prototype._getCallback = function getCallback(args) {
    if (args && _.isFunction(args[args.length - 1])) {
        return args.pop(); // modify the args array!
    }
};

/**
 * Checks that no listener with name "newListener" or "removeListener" is added.
 *
 * @method _checkListener
 * @param {String} type
 * @param {String} event
 * @return {Object} the contract instance
 */
Contract.prototype._checkListener = function(type, event){
    if(event === type) {
        throw new Error('The event "'+ type +'" is a reserved event name, you can\'t use it.');
    }
};


/**
 * Use default values, if options are not available
 *
 * @method _getOrSetDefaultOptions
 * @param {Object} options the options gived by the user
 * @return {Object} the options with gaps filled by defaults
 */
Contract.prototype._getOrSetDefaultOptions = function getOrSetDefaultOptions(options) {
    var gasPrice = options.gasPrice ? String(options.gasPrice): null;
    var from = options.from ? utils.toChecksumAddress(formatters.inputAddressFormatter(options.from)) : null;

    options.data = options.data || this.options.data;

    options.from = from || this.options.from;
    options.gasPrice = gasPrice || this.options.gasPrice;
    options.gas = options.gas || options.gasLimit || this.options.gas;

    // TODO replace with only gasLimit?
    delete options.gasLimit;

    return options;
};


/**
 * Should be used to encode indexed params and options to one final object
 *
 * @method _encodeEventABI
 * @param {Object} event
 * @param {Object} options
 * @return {Object} everything combined together and encoded
 */
Contract.prototype._encodeEventABI = function (event, options) {
    options = options || {};
    var filter = options.filter || {},
        result = {};

    ['fromBlock', 'toBlock'].filter(function (f) {
        return options[f] !== undefined;
    }).forEach(function (f) {
        result[f] = formatters.inputBlockNumberFormatter(options[f]);
    });

    // use given topics
    if(_.isArray(options.topics)) {
        result.topics = options.topics;

    // create topics based on filter
    } else {

        result.topics = [];

        // add event signature
        if (event && !event.anonymous && event.name !== 'ALLEVENTS') {
            result.topics.push(event.signature);
        }

        // add event topics (indexed arguments)
        if (event.name !== 'ALLEVENTS') {
            var indexedTopics = event.inputs.filter(function (i) {
                return i.indexed === true;
            }).map(function (i) {
                var value = filter[i.name];
                if (!value) {
                    return null;
                }

                // TODO: https://github.com/ethereum/web3.js/issues/344
                // TODO: deal properly with components

                if (_.isArray(value)) {
                    return value.map(function (v) {
                        return abi.encodeParameter(i.type, v);
                    });
                }
                return abi.encodeParameter(i.type, value);
            });

            result.topics = result.topics.concat(indexedTopics);
        }

        if(!result.topics.length)
            delete result.topics;
    }

    if(this.options.address) {
        result.address = this.options.address.toLowerCase();
    }

    return result;
};

/**
 * Should be used to decode indexed params and options
 *
 * @method _decodeEventABI
 * @param {Object} data
 * @return {Object} result object with decoded indexed && not indexed params
 */
Contract.prototype._decodeEventABI = function (data) {
    var event = this;

    data.data = data.data || '';
    data.topics = data.topics || [];
    var result = formatters.outputLogFormatter(data);

    // if allEvents get the right event
    if(event.name === 'ALLEVENTS') {
        event = event.jsonInterface.find(function (intf) {
            return (intf.signature === data.topics[0]);
        }) || {anonymous: true};
    }

    // create empty inputs if none are present (e.g. anonymous events on allEvents)
    event.inputs = event.inputs || [];


    var argTopics = event.anonymous ? data.topics : data.topics.slice(1);

    result.returnValues = abi.decodeLog(event.inputs, data.data, argTopics);
    delete result.returnValues.__length__;

    // add name
    result.event = event.name;

    // add signature
    result.signature = (event.anonymous || !data.topics[0]) ? null : data.topics[0];

    // move the data and topics to "raw"
    result.raw = {
        data: result.data,
        topics: result.topics
    };
    delete result.data;
    delete result.topics;


    return result;
};

/**
 * Encodes an ABI for a method, including signature or the method.
 * Or when constructor encodes only the constructor parameters.
 *
 * @method _encodeMethodABI
 * @param {Mixed} args the arguments to encode
 * @param {String} the encoded ABI
 */
Contract.prototype._encodeMethodABI = function _encodeMethodABI() {
    var methodSignature = this._method.signature,
        args = this.arguments || [];

    var signature = false,
        paramsABI = this._parent.options.jsonInterface.filter(function (json) {
            return ((methodSignature === 'constructor' && json.type === methodSignature) ||
                ((json.signature === methodSignature || json.signature === methodSignature.replace('0x','') || json.name === methodSignature) && json.type === 'function'));
        }).map(function (json) {
            var inputLength = (_.isArray(json.inputs)) ? json.inputs.length : 0;

            if (inputLength !== args.length) {
                throw new Error('The number of arguments is not matching the methods required number. You need to pass '+ inputLength +' arguments.');
            }

            if (json.type === 'function') {
                signature = json.signature;
            }
            return _.isArray(json.inputs) ? json.inputs : [];
        }).map(function (inputs) {
            return abi.encodeParameters(inputs, args).replace('0x','');
        })[0] || '';

    // return constructor
    if(methodSignature === 'constructor') {
        if(!this._deployData)
            throw new Error('The contract has no contract data option set. This is necessary to append the constructor parameters.');

        return this._deployData + paramsABI;

    // return method
    } else {

        var returnValue = (signature) ? signature + paramsABI : paramsABI;

        if(!returnValue) {
            throw new Error('Couldn\'t find a matching contract method named "'+ this._method.name +'".');
        } else {
            return returnValue;
        }
    }

};


/**
 * Decode method return values
 *
 * @method _decodeMethodReturn
 * @param {Array} outputs
 * @param {String} returnValues
 * @return {Object} decoded output return values
 */
Contract.prototype._decodeMethodReturn = function (outputs, returnValues) {
    if (!returnValues) {
        return null;
    }

    returnValues = returnValues.length >= 2 ? returnValues.slice(2) : returnValues;
    var result = abi.decodeParameters(outputs, returnValues);

    if (result.__length__ === 1) {
        return result[0];
    } else {
        delete result.__length__;
        return result;
    }
};


/**
 * Deploys a contract and fire events based on its state: transactionHash, receipt
 *
 * All event listeners will be removed, once the last possible event is fired ("error", or "receipt")
 *
 * @method deploy
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} EventEmitter possible events are "error", "transactionHash" and "receipt"
 */
Contract.prototype.deploy = function(options, callback){

    options = options || {};

    options.arguments = options.arguments || [];
    options = this._getOrSetDefaultOptions(options);


    // return error, if no "data" is specified
    if(!options.data) {
        return utils._fireError(new Error('No "data" specified in neither the given options, nor the default options.'), null, null, callback);
    }

    var constructor = _.find(this.options.jsonInterface, function (method) {
        return (method.type === 'constructor');
    }) || {};
    constructor.signature = 'constructor';

    return this._createTxObject.apply({
        method: constructor,
        parent: this,
        deployData: options.data,
        _ethAccounts: this.constructor._ethAccounts
    }, options.arguments);

};

/**
 * Gets the event signature and outputformatters
 *
 * @method _generateEventOptions
 * @param {Object} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the event options object
 */
Contract.prototype._generateEventOptions = function() {
    var args = Array.prototype.slice.call(arguments);

    // get the callback
    var callback = this._getCallback(args);

    // get the options
    var options = (_.isObject(args[args.length - 1])) ? args.pop() : {};

    var event = (_.isString(args[0])) ? args[0] : 'allevents';
    event = (event.toLowerCase() === 'allevents') ? {
            name: 'ALLEVENTS',
            jsonInterface: this.options.jsonInterface
        } : this.options.jsonInterface.find(function (json) {
            return (json.type === 'event' && (json.name === event || json.signature === '0x'+ event.replace('0x','')));
        });

    if (!event) {
        throw new Error('Event "' + event.name + '" doesn\'t exist in this contract.');
    }

    if (!utils.isAddress(this.options.address)) {
        throw new Error('This contract object doesn\'t have address set yet, please set an address first.');
    }

    return {
        params: this._encodeEventABI(event, options),
        event: event,
        callback: callback
    };
};

/**
 * Adds event listeners and creates a subscription, and remove it once its fired.
 *
 * @method clone
 * @return {Object} the event subscription
 */
Contract.prototype.clone = function() {
    return new this.constructor(this.options.jsonInterface, this.options.address, this.options);
};


/**
 * Adds event listeners and creates a subscription, and remove it once its fired.
 *
 * @method once
 * @param {String} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the event subscription
 */
Contract.prototype.once = function(event, options, callback) {
    var args = Array.prototype.slice.call(arguments);

    // get the callback
    callback = this._getCallback(args);

    if (!callback) {
        throw new Error('Once requires a callback as the second parameter.');
    }

    // don't allow fromBlock
    if (options)
        delete options.fromBlock;

    // don't return as once shouldn't provide "on"
    this._on(event, options, function (err, res, sub) {
        sub.unsubscribe();
        if(_.isFunction(callback)){
            callback(err, res, sub);
        }
    });

    return undefined;
};

/**
 * Adds event listeners and creates a subscription.
 *
 * @method _on
 * @param {String} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the event subscription
 */
Contract.prototype._on = function(){
    var subOptions = this._generateEventOptions.apply(this, arguments);


    // prevent the event "newListener" and "removeListener" from being overwritten
    this._checkListener('newListener', subOptions.event.name, subOptions.callback);
    this._checkListener('removeListener', subOptions.event.name, subOptions.callback);

    // TODO check if listener already exists? and reuse subscription if options are the same.

    // create new subscription
    var subscription = new Subscription({
        subscription: {
            params: 1,
            inputFormatter: [formatters.inputLogFormatter],
            outputFormatter: this._decodeEventABI.bind(subOptions.event),
            // DUBLICATE, also in web3-eth
            subscriptionHandler: function (output) {
                if(output.removed) {
                    this.emit('changed', output);
                } else {
                    this.emit('data', output);
                }

                if (_.isFunction(this.callback)) {
                    this.callback(null, output, this);
                }
            }
        },
        type: 'eth',
        requestManager: this._requestManager
    });
    subscription.subscribe('logs', subOptions.params, subOptions.callback || function () {});

    return subscription;
};

/**
 * Get past events from contracts
 *
 * @method getPastEvents
 * @param {String} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the promievent
 */
Contract.prototype.getPastEvents = function(){
    var subOptions = this._generateEventOptions.apply(this, arguments);

    var getPastLogs = new Method({
        name: 'getPastLogs',
        call: 'eth_getLogs',
        params: 1,
        inputFormatter: [formatters.inputLogFormatter],
        outputFormatter: this._decodeEventABI.bind(subOptions.event)
    });
    getPastLogs.setRequestManager(this._requestManager);
    var call = getPastLogs.buildCall();

    getPastLogs = null;

    return call(subOptions.params, subOptions.callback);
};


/**
 * returns the an object with call, send, estimate functions
 *
 * @method _createTxObject
 * @returns {Object} an object with functions to call the methods
 */
Contract.prototype._createTxObject =  function _createTxObject(){
    var args = Array.prototype.slice.call(arguments);
    var txObject = {};

    if(this.method.type === 'function') {

        txObject.call = this.parent._executeMethod.bind(txObject, 'call');
        txObject.call.request = this.parent._executeMethod.bind(txObject, 'call', true); // to make batch requests

    }

    txObject.send = this.parent._executeMethod.bind(txObject, 'send');
    txObject.send.request = this.parent._executeMethod.bind(txObject, 'send', true); // to make batch requests
    txObject.encodeABI = this.parent._encodeMethodABI.bind(txObject);
    txObject.estimateGas = this.parent._executeMethod.bind(txObject, 'estimate');

    if (args && this.method.inputs && args.length !== this.method.inputs.length) {
        if (this.nextMethod) {
            return this.nextMethod.apply(null, args);
        }
        throw errors.InvalidNumberOfParams(args.length, this.method.inputs.length, this.method.name);
    }

    txObject.arguments = args || [];
    txObject._method = this.method;
    txObject._parent = this.parent;
    txObject._ethAccounts = this.parent.constructor._ethAccounts || this._ethAccounts;

    if(this.deployData) {
        txObject._deployData = this.deployData;
    }

    return txObject;
};


/**
 * Generates the options for the execute call
 *
 * @method _processExecuteArguments
 * @param {Array} args
 * @param {Promise} defer
 */
Contract.prototype._processExecuteArguments = function _processExecuteArguments(args, defer) {
    var processedArgs = {};

    processedArgs.type = args.shift();

    // get the callback
    processedArgs.callback = this._parent._getCallback(args);

    // get block number to use for call
    if(processedArgs.type === 'call' && args[args.length - 1] !== true && (_.isString(args[args.length - 1]) || isFinite(args[args.length - 1])))
        processedArgs.defaultBlock = args.pop();

    // get the options
    processedArgs.options = (_.isObject(args[args.length - 1])) ? args.pop() : {};

    // get the generateRequest argument for batch requests
    processedArgs.generateRequest = (args[args.length - 1] === true)? args.pop() : false;

    processedArgs.options = this._parent._getOrSetDefaultOptions(processedArgs.options);
    processedArgs.options.data = this.encodeABI();

    // add contract address
    if(!this._deployData && !utils.isAddress(this._parent.options.address))
        throw new Error('This contract object doesn\'t have address set yet, please set an address first.');

    if(!this._deployData)
        processedArgs.options.to = this._parent.options.address;

    // return error, if no "data" is specified
    if(!processedArgs.options.data)
        return utils._fireError(new Error('Couldn\'t find a matching contract method, or the number of parameters is wrong.'), defer.eventEmitter, defer.reject, processedArgs.callback);

    return processedArgs;
};

/**
 * Executes a call, transact or estimateGas on a contract function
 *
 * @method _executeMethod
 * @param {String} type the type this execute function should execute
 * @param {Boolean} makeRequest if true, it simply returns the request parameters, rather than executing it
 */
Contract.prototype._executeMethod = function _executeMethod(){
    var _this = this,
        args = this._parent._processExecuteArguments.call(this, Array.prototype.slice.call(arguments), defer),
        defer = promiEvent((args.type !== 'send')),
        ethAccounts = _this.constructor._ethAccounts || _this._ethAccounts;

    // simple return request for batch requests
    if(args.generateRequest) {

        var payload = {
            params: [formatters.inputCallFormatter.call(this._parent, args.options)],
            callback: args.callback
        };

        if(args.type === 'call') {
            payload.params.push(formatters.inputDefaultBlockNumberFormatter.call(this._parent, args.defaultBlock));
            payload.method = 'eth_call';
            payload.format = this._parent._decodeMethodReturn.bind(null, this._method.outputs);
        } else {
            payload.method = 'eth_sendTransaction';
        }

        return payload;

    } else {

        switch (args.type) {
            case 'estimate':

                var estimateGas = (new Method({
                    name: 'estimateGas',
                    call: 'eth_estimateGas',
                    params: 1,
                    inputFormatter: [formatters.inputCallFormatter],
                    outputFormatter: utils.hexToNumber,
                    requestManager: _this._parent._requestManager,
                    accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
                    defaultAccount: _this._parent.defaultAccount,
                    defaultBlock: _this._parent.defaultBlock
                })).createFunction();

                return estimateGas(args.options, args.callback);

            case 'call':

                // TODO check errors: missing "from" should give error on deploy and send, call ?

                var call = (new Method({
                    name: 'call',
                    call: 'eth_call',
                    params: 2,
                    inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter],
                    // add output formatter for decoding
                    outputFormatter: function (result) {
                        return _this._parent._decodeMethodReturn(_this._method.outputs, result);
                    },
                    requestManager: _this._parent._requestManager,
                    accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
                    defaultAccount: _this._parent.defaultAccount,
                    defaultBlock: _this._parent.defaultBlock
                })).createFunction();

                return call(args.options, args.defaultBlock, args.callback);

            case 'send':

                // return error, if no "from" is specified
                if(!utils.isAddress(args.options.from)) {
                    return utils._fireError(new Error('No "from" address specified in neither the given options, nor the default options.'), defer.eventEmitter, defer.reject, args.callback);
                }

                if (_.isBoolean(this._method.payable) && !this._method.payable && args.options.value && args.options.value > 0) {
                    return utils._fireError(new Error('Can not send value to non-payable contract method or constructor'), defer.eventEmitter, defer.reject, args.callback);
                }


                // make sure receipt logs are decoded
                var extraFormatters = {
                    receiptFormatter: function (receipt) {
                        if (_.isArray(receipt.logs)) {

                            // decode logs
                            var events = _.map(receipt.logs, function(log) {
                                return _this._parent._decodeEventABI.call({
                                    name: 'ALLEVENTS',
                                    jsonInterface: _this._parent.options.jsonInterface
                                }, log);
                            });

                            // make log names keys
                            receipt.events = {};
                            var count = 0;
                            events.forEach(function (ev) {
                                if (ev.event) {
                                    // if > 1 of the same event, don't overwrite any existing events
                                    if (receipt.events[ev.event]) {
                                        if (Array.isArray(receipt.events[ ev.event ])) {
                                            receipt.events[ ev.event ].push(ev);
                                        } else {
                                            receipt.events[ev.event] = [receipt.events[ev.event], ev];
                                        }
                                    } else {
                                        receipt.events[ ev.event ] = ev;
                                    }
                                } else {
                                    receipt.events[count] = ev;
                                    count++;
                                }
                            });

                            delete receipt.logs;
                        }
                        return receipt;
                    },
                    contractDeployFormatter: function (receipt) {
                        var newContract = _this._parent.clone();
                        newContract.options.address = receipt.contractAddress;
                        return newContract;
                    }
                };

                var sendTransaction = (new Method({
                    name: 'sendTransaction',
                    call: 'eth_sendTransaction',
                    params: 1,
                    inputFormatter: [formatters.inputTransactionFormatter],
                    requestManager: _this._parent._requestManager,
                    accounts: _this.constructor._ethAccounts || _this._ethAccounts, // is eth.accounts (necessary for wallet signing)
                    defaultAccount: _this._parent.defaultAccount,
                    defaultBlock: _this._parent.defaultBlock,
                    extraFormatters: extraFormatters
                })).createFunction();

                return sendTransaction(args.options, args.callback);

        }

    }

};

module.exports = Contract;


/***/ }),

/***/ "2lMq":
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
 * @file iban.js
 *
 * Details: https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol
 *
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2015
 */



var utils = __webpack_require__("ETH1");
var BigNumber = __webpack_require__("OZ/i");


var leftPad = function (string, bytes) {
    var result = string;
    while (result.length < bytes * 2) {
        result = '0' + result;
    }
    return result;
};

/**
 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
 *
 * @method iso13616Prepare
 * @param {String} iban the IBAN
 * @returns {String} the prepared IBAN
 */
var iso13616Prepare = function (iban) {
    var A = 'A'.charCodeAt(0);
    var Z = 'Z'.charCodeAt(0);

    iban = iban.toUpperCase();
    iban = iban.substr(4) + iban.substr(0,4);

    return iban.split('').map(function(n){
        var code = n.charCodeAt(0);
        if (code >= A && code <= Z){
            // A = 10, B = 11, ... Z = 35
            return code - A + 10;
        } else {
            return n;
        }
    }).join('');
};

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 *
 * @method mod9710
 * @param {String} iban
 * @returns {Number}
 */
var mod9710 = function (iban) {
    var remainder = iban,
        block;

    while (remainder.length > 2){
        block = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
    }

    return parseInt(remainder, 10) % 97;
};

/**
 * This prototype should be used to create iban object from iban correct string
 *
 * @param {String} iban
 */
var Iban = function Iban(iban) {
    this._iban = iban;
};

/**
 * This method should be used to create an ethereum address from a direct iban address
 *
 * @method toAddress
 * @param {String} iban address
 * @return {String} the ethereum address
 */
Iban.toAddress = function (ib) {
    ib = new Iban(ib);

    if(!ib.isDirect()) {
        throw new Error('IBAN is indirect and can\'t be converted');
    }

    return ib.toAddress();
};

/**
 * This method should be used to create iban address from an ethereum address
 *
 * @method toIban
 * @param {String} address
 * @return {String} the IBAN address
 */
Iban.toIban = function (address) {
    return Iban.fromAddress(address).toString();
};

/**
 * This method should be used to create iban object from an ethereum address
 *
 * @method fromAddress
 * @param {String} address
 * @return {Iban} the IBAN object
 */
Iban.fromAddress = function (address) {
    if(!utils.isAddress(address)){
        throw new Error('Provided address is not a valid address: '+ address);
    }

    address = address.replace('0x','').replace('0X','');

    var asBn = new BigNumber(address, 16);
    var base36 = asBn.toString(36);
    var padded = leftPad(base36, 15);
    return Iban.fromBban(padded.toUpperCase());
};

/**
 * Convert the passed BBAN to an IBAN for this country specification.
 * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
 * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
 *
 * @method fromBban
 * @param {String} bban the BBAN to convert to IBAN
 * @returns {Iban} the IBAN object
 */
Iban.fromBban = function (bban) {
    var countryCode = 'XE';

    var remainder = mod9710(iso13616Prepare(countryCode + '00' + bban));
    var checkDigit = ('0' + (98 - remainder)).slice(-2);

    return new Iban(countryCode + checkDigit + bban);
};

/**
 * Should be used to create IBAN object for given institution and identifier
 *
 * @method createIndirect
 * @param {Object} options, required options are "institution" and "identifier"
 * @return {Iban} the IBAN object
 */
Iban.createIndirect = function (options) {
    return Iban.fromBban('ETH' + options.institution + options.identifier);
};

/**
 * This method should be used to check if given string is valid iban object
 *
 * @method isValid
 * @param {String} iban string
 * @return {Boolean} true if it is valid IBAN
 */
Iban.isValid = function (iban) {
    var i = new Iban(iban);
    return i.isValid();
};

/**
 * Should be called to check if iban is correct
 *
 * @method isValid
 * @returns {Boolean} true if it is, otherwise false
 */
Iban.prototype.isValid = function () {
    return /^XE[0-9]{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) &&
        mod9710(iso13616Prepare(this._iban)) === 1;
};

/**
 * Should be called to check if iban number is direct
 *
 * @method isDirect
 * @returns {Boolean} true if it is, otherwise false
 */
Iban.prototype.isDirect = function () {
    return this._iban.length === 34 || this._iban.length === 35;
};

/**
 * Should be called to check if iban number if indirect
 *
 * @method isIndirect
 * @returns {Boolean} true if it is, otherwise false
 */
Iban.prototype.isIndirect = function () {
    return this._iban.length === 20;
};

/**
 * Should be called to get iban checksum
 * Uses the mod-97-10 checksumming protocol (ISO/IEC 7064:2003)
 *
 * @method checksum
 * @returns {String} checksum
 */
Iban.prototype.checksum = function () {
    return this._iban.substr(2, 2);
};

/**
 * Should be called to get institution identifier
 * eg. XREG
 *
 * @method institution
 * @returns {String} institution identifier
 */
Iban.prototype.institution = function () {
    return this.isIndirect() ? this._iban.substr(7, 4) : '';
};

/**
 * Should be called to get client identifier within institution
 * eg. GAVOFYORK
 *
 * @method client
 * @returns {String} client identifier
 */
Iban.prototype.client = function () {
    return this.isIndirect() ? this._iban.substr(11) : '';
};

/**
 * Should be called to get client direct address
 *
 * @method toAddress
 * @returns {String} ethereum address
 */
Iban.prototype.toAddress = function () {
    if (this.isDirect()) {
        var base36 = this._iban.substr(4);
        var asBn = new BigNumber(base36, 36);
        return utils.toChecksumAddress(asBn.toString(16, 20));
    }

    return '';
};

Iban.prototype.toString = function () {
    return this._iban;
};

module.exports = Iban;


/***/ }),

/***/ "3ksW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Unknown Error
exports.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
// Not implemented
exports.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED';
// Missing new operator to an object
//  - name: The name of the class
exports.MISSING_NEW = 'MISSING_NEW';
// Call exception
//  - transaction: the transaction
//  - address?: the contract address
//  - args?: The arguments passed into the function
//  - method?: The Solidity method signature
//  - errorSignature?: The EIP848 error signature
//  - errorArgs?: The EIP848 error parameters
//  - reason: The reason (only for EIP848 "Error(string)")
exports.CALL_EXCEPTION = 'CALL_EXCEPTION';
// Response from a server was invalid
//   - response: The body of the response
//'BAD_RESPONSE',
// Invalid argument (e.g. value is incompatible with type) to a function:
//   - arg: The argument name that was invalid
//   - value: The value of the argument
exports.INVALID_ARGUMENT = 'INVALID_ARGUMENT';
// Missing argument to a function:
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
exports.MISSING_ARGUMENT = 'MISSING_ARGUMENT';
// Too many arguments
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
exports.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT';
// Numeric Fault
//   - operation: the operation being executed
//   - fault: the reason this faulted
exports.NUMERIC_FAULT = 'NUMERIC_FAULT';
// Unsupported operation
//   - operation
exports.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION';
var _permanentCensorErrors = false;
var _censorErrors = false;
// @TODO: Enum
function throwError(message, code, params) {
    if (_censorErrors) {
        throw new Error('unknown error');
    }
    if (!code) {
        code = exports.UNKNOWN_ERROR;
    }
    if (!params) {
        params = {};
    }
    var messageDetails = [];
    Object.keys(params).forEach(function (key) {
        try {
            messageDetails.push(key + '=' + JSON.stringify(params[key]));
        }
        catch (error) {
            messageDetails.push(key + '=' + JSON.stringify(params[key].toString()));
        }
    });
    var reason = message;
    if (messageDetails.length) {
        message += ' (' + messageDetails.join(', ') + ')';
    }
    // @TODO: Any??
    var error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function (key) {
        error[key] = params[key];
    });
    throw error;
}
exports.throwError = throwError;
function checkNew(self, kind) {
    if (!(self instanceof kind)) {
        throwError('missing new', exports.MISSING_NEW, { name: kind.name });
    }
}
exports.checkNew = checkNew;
function checkArgumentCount(count, expectedCount, suffix) {
    if (!suffix) {
        suffix = '';
    }
    if (count < expectedCount) {
        throwError('missing argument' + suffix, exports.MISSING_ARGUMENT, { count: count, expectedCount: expectedCount });
    }
    if (count > expectedCount) {
        throwError('too many arguments' + suffix, exports.UNEXPECTED_ARGUMENT, { count: count, expectedCount: expectedCount });
    }
}
exports.checkArgumentCount = checkArgumentCount;
function setCensorship(censorship, permanent) {
    if (_permanentCensorErrors) {
        throwError('error censorship permanent', exports.UNSUPPORTED_OPERATION, { operation: 'setCersorship' });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
}
exports.setCensorship = setCensorship;


/***/ }),

/***/ "4Zn2":
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
 * @file getNetworkType.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var _ = __webpack_require__("F/us");

var getNetworkType = function (callback) {
    var _this = this,
        id;


    return this.net.getId()
        .then(function (givenId) {

            id = givenId;

            return _this.getBlock(0);
        })
        .then(function (genesis) {
            var returnValue = 'private';

            if (genesis.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3' &&
                id === 1) {
                returnValue = 'main';
            }
            if (genesis.hash === '0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303' &&
                id === 2) {
                returnValue = 'morden';
            }
            if (genesis.hash === '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d' &&
                id === 3) {
                returnValue = 'ropsten';
            }
            if (genesis.hash === '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177' &&
                id === 4) {
                returnValue = 'rinkeby';
            }
            if (genesis.hash === '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9' &&
                id === 42) {
                returnValue = 'kovan';
            }

            if (_.isFunction(callback)) {
                callback(null, returnValue);
            }

            return returnValue;
        })
        .catch(function (err) {
            if (_.isFunction(callback)) {
                callback(err);
            } else {
                throw err;
            }
        });
};

module.exports = getNetworkType;


/***/ }),

/***/ "9eFT":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("M6DC");
var bytesToUuid = __webpack_require__("mFAp");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "CC7U":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
var COERCERTL = R++
re[COERCERTL] = new RegExp(src[COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "CmDq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  Conversion Utilities
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__("abO7");
var errors = __webpack_require__("3ksW");
exports.AddressZero = '0x0000000000000000000000000000000000000000';
exports.HashZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
function isBigNumber(value) {
    return (value instanceof types_1.BigNumber);
}
function addSlice(array) {
    if (array.slice) {
        return array;
    }
    array.slice = function () {
        var args = Array.prototype.slice.call(arguments);
        return new Uint8Array(Array.prototype.slice.apply(array, args));
    };
    return array;
}
function isArrayish(value) {
    if (!value || parseInt(String(value.length)) != value.length || typeof (value) === 'string') {
        return false;
    }
    for (var i = 0; i < value.length; i++) {
        var v = value[i];
        if (v < 0 || v >= 256 || parseInt(String(v)) != v) {
            return false;
        }
    }
    return true;
}
exports.isArrayish = isArrayish;
function arrayify(value) {
    if (value == null) {
        errors.throwError('cannot convert null value to array', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
    }
    if (isBigNumber(value)) {
        value = value.toHexString();
    }
    if (typeof (value) === 'string') {
        var match = value.match(/^(0x)?[0-9a-fA-F]*$/);
        if (!match) {
            errors.throwError('invalid hexidecimal string', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        if (match[1] !== '0x') {
            errors.throwError('hex string must have 0x prefix', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        value = value.substring(2);
        if (value.length % 2) {
            value = '0' + value;
        }
        var result = [];
        for (var i = 0; i < value.length; i += 2) {
            result.push(parseInt(value.substr(i, 2), 16));
        }
        return addSlice(new Uint8Array(result));
    }
    else if (typeof (value) === 'string') {
    }
    if (isArrayish(value)) {
        return addSlice(new Uint8Array(value));
    }
    errors.throwError('invalid arrayify value', null, { arg: 'value', value: value, type: typeof (value) });
    return null;
}
exports.arrayify = arrayify;
function concat(objects) {
    var arrays = [];
    var length = 0;
    for (var i = 0; i < objects.length; i++) {
        var object = arrayify(objects[i]);
        arrays.push(object);
        length += object.length;
    }
    var result = new Uint8Array(length);
    var offset = 0;
    for (var i = 0; i < arrays.length; i++) {
        result.set(arrays[i], offset);
        offset += arrays[i].length;
    }
    return addSlice(result);
}
exports.concat = concat;
function stripZeros(value) {
    var result = arrayify(value);
    if (result.length === 0) {
        return result;
    }
    // Find the first non-zero entry
    var start = 0;
    while (result[start] === 0) {
        start++;
    }
    // If we started with zeros, strip them
    if (start) {
        result = result.slice(start);
    }
    return result;
}
exports.stripZeros = stripZeros;
function padZeros(value, length) {
    value = arrayify(value);
    if (length < value.length) {
        throw new Error('cannot pad');
    }
    var result = new Uint8Array(length);
    result.set(value, length - value.length);
    return addSlice(result);
}
exports.padZeros = padZeros;
function isHexString(value, length) {
    if (typeof (value) !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
exports.isHexString = isHexString;
var HexCharacters = '0123456789abcdef';
function hexlify(value) {
    if (isBigNumber(value)) {
        return value.toHexString();
    }
    if (typeof (value) === 'number') {
        if (value < 0) {
            errors.throwError('cannot hexlify negative value', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        var hex = '';
        while (value) {
            hex = HexCharacters[value & 0x0f] + hex;
            value = Math.floor(value / 16);
        }
        if (hex.length) {
            if (hex.length % 2) {
                hex = '0' + hex;
            }
            return '0x' + hex;
        }
        return '0x00';
    }
    if (typeof (value) === 'string') {
        var match = value.match(/^(0x)?[0-9a-fA-F]*$/);
        if (!match) {
            errors.throwError('invalid hexidecimal string', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        if (match[1] !== '0x') {
            errors.throwError('hex string must have 0x prefix', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        if (value.length % 2) {
            value = '0x0' + value.substring(2);
        }
        return value;
    }
    if (isArrayish(value)) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            var v = value[i];
            result.push(HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f]);
        }
        return '0x' + result.join('');
    }
    errors.throwError('invalid hexlify value', null, { arg: 'value', value: value });
    return 'never';
}
exports.hexlify = hexlify;
function hexDataLength(data) {
    if (!isHexString(data) || (data.length % 2) !== 0) {
        return null;
    }
    return (data.length - 2) / 2;
}
exports.hexDataLength = hexDataLength;
function hexDataSlice(data, offset, length) {
    if (!isHexString(data)) {
        errors.throwError('invalid hex data', errors.INVALID_ARGUMENT, { arg: 'value', value: data });
    }
    if ((data.length % 2) !== 0) {
        errors.throwError('hex data length must be even', errors.INVALID_ARGUMENT, { arg: 'value', value: data });
    }
    offset = 2 + 2 * offset;
    if (length != null) {
        return '0x' + data.substring(offset, offset + 2 * length);
    }
    return '0x' + data.substring(offset);
}
exports.hexDataSlice = hexDataSlice;
function hexStripZeros(value) {
    if (!isHexString(value)) {
        errors.throwError('invalid hex string', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
    }
    while (value.length > 3 && value.substring(0, 3) === '0x0') {
        value = '0x' + value.substring(3);
    }
    return value;
}
exports.hexStripZeros = hexStripZeros;
function hexZeroPad(value, length) {
    if (!isHexString(value)) {
        errors.throwError('invalid hex string', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
    }
    while (value.length < 2 * length + 2) {
        value = '0x0' + value.substring(2);
    }
    return value;
}
exports.hexZeroPad = hexZeroPad;
function isSignature(value) {
    return (value && value.r != null && value.s != null);
}
function splitSignature(signature) {
    var v = 0;
    var r = '0x', s = '0x';
    if (isSignature(signature)) {
        if (signature.v == null && signature.recoveryParam == null) {
            errors.throwError('at least on of recoveryParam or v must be specified', errors.INVALID_ARGUMENT, { argument: 'signature', value: signature });
        }
        r = hexZeroPad(signature.r, 32);
        s = hexZeroPad(signature.s, 32);
        v = signature.v;
        if (typeof (v) === 'string') {
            v = parseInt(v, 16);
        }
        var recoveryParam = signature.recoveryParam;
        if (recoveryParam == null && signature.v != null) {
            recoveryParam = 1 - (v % 2);
        }
        v = 27 + recoveryParam;
    }
    else {
        var bytes = arrayify(signature);
        if (bytes.length !== 65) {
            throw new Error('invalid signature');
        }
        r = hexlify(bytes.slice(0, 32));
        s = hexlify(bytes.slice(32, 64));
        v = bytes[64];
        if (v !== 27 && v !== 28) {
            v = 27 + (v % 2);
        }
    }
    return {
        r: r,
        s: s,
        recoveryParam: (v - 27),
        v: v
    };
}
exports.splitSignature = splitSignature;
function joinSignature(signature) {
    signature = splitSignature(signature);
    return hexlify(concat([
        signature.r,
        signature.s,
        (signature.recoveryParam ? '0x1c' : '0x1b')
    ]));
}
exports.joinSignature = joinSignature;


/***/ }),

/***/ "EsSj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var REGISTRY = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "resolver",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "label",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setSubnodeOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "setTTL",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "ttl",
        "outputs": [
            {
                "name": "",
                "type": "uint64"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "setResolver",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "label",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "NewOwner",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "NewResolver",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "NewTTL",
        "type": "event"
    }
];

module.exports = REGISTRY;


/***/ }),

/***/ "H8gM":
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
var core = __webpack_require__("8e6A");
var helpers = __webpack_require__("OdSp");
var Subscriptions = __webpack_require__("SSMb").subscriptions;
var Method = __webpack_require__("Ykib");
var utils = __webpack_require__("ETH1");
var Net = __webpack_require__("rlKj");

var ENS = __webpack_require__("cB64");
var Personal = __webpack_require__("s84P");
var BaseContract = __webpack_require__("0QDG");
var Iban = __webpack_require__("2lMq");
var Accounts = __webpack_require__("Ii8J");
var abi = __webpack_require__("u6/g");

var getNetworkType = __webpack_require__("4Zn2");
var formatter = helpers.formatters;


var blockCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? "eth_getBlockByHash" : "eth_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getTransactionByBlockHashAndIndex' : 'eth_getTransactionByBlockNumberAndIndex';
};

var uncleCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getUncleByBlockHashAndIndex' : 'eth_getUncleByBlockNumberAndIndex';
};

var getBlockTransactionCountCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getBlockTransactionCountByHash' : 'eth_getBlockTransactionCountByNumber';
};

var uncleCountCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getUncleCountByBlockHash' : 'eth_getUncleCountByBlockNumber';
};


var Eth = function Eth() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
        _this.Contract.setProvider(_this.currentProvider, _this.accounts);
    };


    var defaultAccount = null;
    var defaultBlock = 'latest';

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
            }

            // also set on the Contract object
            _this.Contract.defaultAccount = defaultAccount;
            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            // also set on the Contract object
            _this.Contract.defaultBlock = defaultBlock;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    this.clearSubscriptions = _this._requestManager.clearSubscriptions;

    // add net
    this.net = new Net(this.currentProvider);
    // add chain detection
    this.net.getNetworkType = getNetworkType.bind(this);

    // add accounts
    this.accounts = new Accounts(this.currentProvider);

    // add personal
    this.personal = new Personal(this.currentProvider);
    this.personal.defaultAccount = this.defaultAccount;

    // create a proxy Contract type for this instance, as a Contract's provider
    // is stored as a class member rather than an instance variable. If we do
    // not create this proxy type, changing the provider in one instance of
    // web3-eth would subsequently change the provider for _all_ contract
    // instances!
    var self = this;
    var Contract = function Contract() {
        BaseContract.apply(this, arguments);

        // when Eth.setProvider is called, call packageInit
        // on all contract instances instantiated via this Eth
        // instances. This will update the currentProvider for
        // the contract instances
        var _this = this;
        var setProvider = self.setProvider;
        self.setProvider = function() {
          setProvider.apply(self, arguments);
          core.packageInit(_this, [self.currentProvider]);
        };
    };

    Contract.setProvider = function() {
        BaseContract.setProvider.apply(this, arguments);
    };

    // make our proxy Contract inherit from web3-eth-contract so that it has all
    // the right functionality and so that instanceof and friends work properly
    Contract.prototype = Object.create(BaseContract.prototype);
    Contract.prototype.constructor = Contract;

    // add contract
    this.Contract = Contract;
    this.Contract.defaultAccount = this.defaultAccount;
    this.Contract.defaultBlock = this.defaultBlock;
    this.Contract.setProvider(this.currentProvider, this.accounts);

    // add IBAN
    this.Iban = Iban;

    // add ABI
    this.abi = abi;

    // add ENS
    this.ens = new ENS(this);

    var methods = [
        new Method({
            name: 'getNodeInfo',
            call: 'web3_clientVersion'
        }),
        new Method({
            name: 'getProtocolVersion',
            call: 'eth_protocolVersion',
            params: 0
        }),
        new Method({
            name: 'getCoinbase',
            call: 'eth_coinbase',
            params: 0
        }),
        new Method({
            name: 'isMining',
            call: 'eth_mining',
            params: 0
        }),
        new Method({
            name: 'getHashrate',
            call: 'eth_hashrate',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'isSyncing',
            call: 'eth_syncing',
            params: 0,
            outputFormatter: formatter.outputSyncingFormatter
        }),
        new Method({
            name: 'getGasPrice',
            call: 'eth_gasPrice',
            params: 0,
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getAccounts',
            call: 'eth_accounts',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getBlockNumber',
            call: 'eth_blockNumber',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getBalance',
            call: 'eth_getBalance',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getStorageAt',
            call: 'eth_getStorageAt',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, utils.numberToHex, formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
            name: 'getCode',
            call: 'eth_getCode',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
            name: 'getBlock',
            call: blockCall,
            params: 2,
            inputFormatter: [formatter.inputBlockNumberFormatter, function (val) { return !!val; }],
            outputFormatter: formatter.outputBlockFormatter
        }),
        new Method({
            name: 'getUncle',
            call: uncleCall,
            params: 2,
            inputFormatter: [formatter.inputBlockNumberFormatter, utils.numberToHex],
            outputFormatter: formatter.outputBlockFormatter,

        }),
        new Method({
            name: 'getBlockTransactionCount',
            call: getBlockTransactionCountCall,
            params: 1,
            inputFormatter: [formatter.inputBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getBlockUncleCount',
            call: uncleCountCall,
            params: 1,
            inputFormatter: [formatter.inputBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getTransaction',
            call: 'eth_getTransactionByHash',
            params: 1,
            inputFormatter: [null],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionFromBlock',
            call: transactionFromBlockCall,
            params: 2,
            inputFormatter: [formatter.inputBlockNumberFormatter, utils.numberToHex],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionReceipt',
            call: 'eth_getTransactionReceipt',
            params: 1,
            inputFormatter: [null],
            outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getTransactionCount',
            call: 'eth_getTransactionCount',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'sendSignedTransaction',
            call: 'eth_sendRawTransaction',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'signTransaction',
            call: 'eth_signTransaction',
            params: 1,
            inputFormatter: [formatter.inputTransactionFormatter]
        }),
        new Method({
            name: 'sendTransaction',
            call: 'eth_sendTransaction',
            params: 1,
            inputFormatter: [formatter.inputTransactionFormatter]
        }),
        new Method({
            name: 'sign',
            call: 'eth_sign',
            params: 2,
            inputFormatter: [formatter.inputSignFormatter, formatter.inputAddressFormatter],
            transformPayload: function (payload) {
                payload.params.reverse();
                return payload;
            }
        }),
        new Method({
            name: 'call',
            call: 'eth_call',
            params: 2,
            inputFormatter: [formatter.inputCallFormatter, formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
            name: 'estimateGas',
            call: 'eth_estimateGas',
            params: 1,
            inputFormatter: [formatter.inputCallFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'submitWork',
            call: 'eth_submitWork',
            params: 3
        }),
        new Method({
            name: 'getWork',
            call: 'eth_getWork',
            params: 0
        }),
        new Method({
            name: 'getPastLogs',
            call: 'eth_getLogs',
            params: 1,
            inputFormatter: [formatter.inputLogFormatter],
            outputFormatter: formatter.outputLogFormatter
        }),

        // subscriptions
        new Subscriptions({
            name: 'subscribe',
            type: 'eth',
            subscriptions: {
                'newBlockHeaders': {
                    // TODO rename on RPC side?
                    subscriptionName: 'newHeads', // replace subscription with this name
                    params: 0,
                    outputFormatter: formatter.outputBlockFormatter
                },
                'pendingTransactions': {
                    subscriptionName: 'newPendingTransactions', // replace subscription with this name
                    params: 0
                },
                'logs': {
                    params: 1,
                    inputFormatter: [formatter.inputLogFormatter],
                    outputFormatter: formatter.outputLogFormatter,
                    // DUBLICATE, also in web3-eth-contract
                    subscriptionHandler: function (output) {
                        if(output.removed) {
                            this.emit('changed', output);
                        } else {
                            this.emit('data', output);
                        }

                        if (_.isFunction(this.callback)) {
                            this.callback(null, output, this);
                        }
                    }
                },
                'syncing': {
                    params: 0,
                    outputFormatter: formatter.outputSyncingFormatter,
                    subscriptionHandler: function (output) {
                        var _this = this;

                        // fire TRUE at start
                        if(this._isSyncing !== true) {
                            this._isSyncing = true;
                            this.emit('changed', _this._isSyncing);

                            if (_.isFunction(this.callback)) {
                                this.callback(null, _this._isSyncing, this);
                            }

                            setTimeout(function () {
                                _this.emit('data', output);

                                if (_.isFunction(_this.callback)) {
                                    _this.callback(null, output, _this);
                                }
                            }, 0);

                            // fire sync status
                        } else {
                            this.emit('data', output);
                            if (_.isFunction(_this.callback)) {
                                this.callback(null, output, this);
                            }

                            // wait for some time before fireing the FALSE
                            clearTimeout(this._isSyncingTimeout);
                            this._isSyncingTimeout = setTimeout(function () {
                                if(output.currentBlock > output.highestBlock - 200) {
                                    _this._isSyncing = false;
                                    _this.emit('changed', _this._isSyncing);

                                    if (_.isFunction(_this.callback)) {
                                        _this.callback(null, _this._isSyncing, _this);
                                    }
                                }
                            }, 500);
                        }
                    }
                }
            }
        })
    ];

    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is eth.accounts (necessary for wallet signing)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
    });

};

core.addProviders(Eth);


module.exports = Eth;



/***/ }),

/***/ "Ii8J":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {/*
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
 * @file accounts.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */



var _ = __webpack_require__("F/us");
var core = __webpack_require__("8e6A");
var Method = __webpack_require__("Ykib");
var Promise = __webpack_require__("m6mq");
var Account = __webpack_require__("b/S+");
var Hash = __webpack_require__("ewvk");
var RLP = __webpack_require__("2YU9");
var Nat = __webpack_require__("moAw");
var Bytes = __webpack_require__("c/MD");
var cryp = (typeof global === 'undefined') ? __webpack_require__("HEbw") : __webpack_require__("HEbw");
var scrypt = __webpack_require__("zW2h");
var uuid = __webpack_require__("KtDt");
var utils = __webpack_require__("ETH1");
var helpers = __webpack_require__("OdSp");

var isNot = function(value) {
    return (_.isUndefined(value) || _.isNull(value));
};

var trimLeadingZero = function (hex) {
    while (hex && hex.startsWith('0x0')) {
        hex = '0x' + hex.slice(3);
    }
    return hex;
};

var makeEven = function (hex) {
    if(hex.length % 2 === 1) {
        hex = hex.replace('0x', '0x0');
    }
    return hex;
};


var Accounts = function Accounts() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);

    // remove unecessary core functions
    delete this.BatchRequest;
    delete this.extend;

    var _ethereumCall = [
        new Method({
            name: 'getId',
            call: 'net_version',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getGasPrice',
            call: 'eth_gasPrice',
            params: 0
        }),
        new Method({
            name: 'getTransactionCount',
            call: 'eth_getTransactionCount',
            params: 2,
            inputFormatter: [function (address) {
                if (utils.isAddress(address)) {
                    return address;
                } else {
                    throw new Error('Address '+ address +' is not a valid address to get the "transactionCount".');
                }
            }, function () { return 'latest'; }]
        })
    ];
    // attach methods to this._ethereumCall
    this._ethereumCall = {};
    _.each(_ethereumCall, function (method) {
        method.attachToObject(_this._ethereumCall);
        method.setRequestManager(_this._requestManager);
    });


    this.wallet = new Wallet(this);
};

Accounts.prototype._addAccountFunctions = function (account) {
    var _this = this;

    // add sign functions
    account.signTransaction = function signTransaction(tx, callback) {
        return _this.signTransaction(tx, account.privateKey, callback);
    };
    account.sign = function sign(data) {
        return _this.sign(data, account.privateKey);
    };

    account.encrypt = function encrypt(password, options) {
        return _this.encrypt(account.privateKey, password, options);
    };


    return account;
};

Accounts.prototype.create = function create(entropy) {
    return this._addAccountFunctions(Account.create(entropy || utils.randomHex(32)));
};

Accounts.prototype.privateKeyToAccount = function privateKeyToAccount(privateKey) {
    return this._addAccountFunctions(Account.fromPrivate(privateKey));
};

Accounts.prototype.signTransaction = function signTransaction(tx, privateKey, callback) {
    var _this = this,
        error = false,
        result;

    callback = callback || function () {};

    if (!tx) {
        error = new Error('No transaction object given!');

        callback(error);
        return Promise.reject(error);
    }

    function signed (tx) {

        if (!tx.gas && !tx.gasLimit) {
            error = new Error('"gas" is missing');
        }

        if (tx.nonce  < 0 ||
            tx.gas  < 0 ||
            tx.gasPrice  < 0 ||
            tx.chainId  < 0) {
            error = new Error('Gas, gasPrice, nonce or chainId is lower than 0');
        }

        if (error) {
            callback(error);
            return Promise.reject(error);
        }

        try {
            tx = helpers.formatters.inputCallFormatter(tx);

            var transaction = tx;
            transaction.to = tx.to || '0x';
            transaction.data = tx.data || '0x';
            transaction.value = tx.value || '0x';
            transaction.chainId = utils.numberToHex(tx.chainId);

            var rlpEncoded = RLP.encode([
                Bytes.fromNat(transaction.nonce),
                Bytes.fromNat(transaction.gasPrice),
                Bytes.fromNat(transaction.gas),
                transaction.to.toLowerCase(),
                Bytes.fromNat(transaction.value),
                transaction.data,
                Bytes.fromNat(transaction.chainId || "0x1"),
                "0x",
                "0x"]);


            var hash = Hash.keccak256(rlpEncoded);

            var signature = Account.makeSigner(Nat.toNumber(transaction.chainId || "0x1") * 2 + 35)(Hash.keccak256(rlpEncoded), privateKey);

            var rawTx = RLP.decode(rlpEncoded).slice(0, 6).concat(Account.decodeSignature(signature));

            rawTx[6] = makeEven(trimLeadingZero(rawTx[6]));
            rawTx[7] = makeEven(trimLeadingZero(rawTx[7]));
            rawTx[8] = makeEven(trimLeadingZero(rawTx[8]));

            var rawTransaction = RLP.encode(rawTx);

            var values = RLP.decode(rawTransaction);
            result = {
                messageHash: hash,
                v: trimLeadingZero(values[6]),
                r: trimLeadingZero(values[7]),
                s: trimLeadingZero(values[8]),
                rawTransaction: rawTransaction
            };

        } catch(e) {
            callback(e);
            return Promise.reject(e);
        }

        callback(null, result);
        return result;
    }

    // Resolve immediately if nonce, chainId and price are provided
    if (tx.nonce !== undefined && tx.chainId !== undefined && tx.gasPrice !== undefined) {
        return Promise.resolve(signed(tx));
    }


    // Otherwise, get the missing info from the Ethereum Node
    return Promise.all([
        isNot(tx.chainId) ? _this._ethereumCall.getId() : tx.chainId,
        isNot(tx.gasPrice) ? _this._ethereumCall.getGasPrice() : tx.gasPrice,
        isNot(tx.nonce) ? _this._ethereumCall.getTransactionCount(_this.privateKeyToAccount(privateKey).address) : tx.nonce
    ]).then(function (args) {
        if (isNot(args[0]) || isNot(args[1]) || isNot(args[2])) {
            throw new Error('One of the values "chainId", "gasPrice", or "nonce" couldn\'t be fetched: '+ JSON.stringify(args));
        }
        return signed(_.extend(tx, {chainId: args[0], gasPrice: args[1], nonce: args[2]}));
    });
};

/* jshint ignore:start */
Accounts.prototype.recoverTransaction = function recoverTransaction(rawTx) {
    var values = RLP.decode(rawTx);
    var signature = Account.encodeSignature(values.slice(6,9));
    var recovery = Bytes.toNumber(values[6]);
    var extraData = recovery < 35 ? [] : [Bytes.fromNumber((recovery - 35) >> 1), "0x", "0x"];
    var signingData = values.slice(0,6).concat(extraData);
    var signingDataHex = RLP.encode(signingData);
    return Account.recover(Hash.keccak256(signingDataHex), signature);
};
/* jshint ignore:end */

Accounts.prototype.hashMessage = function hashMessage(data) {
    var message = utils.isHexStrict(data) ? utils.hexToBytes(data) : data;
    var messageBuffer = Buffer.from(message);
    var preamble = "\x19Ethereum Signed Message:\n" + message.length;
    var preambleBuffer = Buffer.from(preamble);
    var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return Hash.keccak256s(ethMessage);
};

Accounts.prototype.sign = function sign(data, privateKey) {
    var hash = this.hashMessage(data);
    var signature = Account.sign(hash, privateKey);
    var vrs = Account.decodeSignature(signature);
    return {
        message: data,
        messageHash: hash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature: signature
    };
};

Accounts.prototype.recover = function recover(message, signature, preFixed) {
    var args = [].slice.apply(arguments);


    if (_.isObject(message)) {
        return this.recover(message.messageHash, Account.encodeSignature([message.v, message.r, message.s]), true);
    }

    if (!preFixed) {
        message = this.hashMessage(message);
    }

    if (args.length >= 4) {
        preFixed = args.slice(-1)[0];
        preFixed = _.isBoolean(preFixed) ? !!preFixed : false;

        return this.recover(message, Account.encodeSignature(args.slice(1, 4)), preFixed); // v, r, s
    }
    return Account.recover(message, signature);
};

// Taken from https://github.com/ethereumjs/ethereumjs-wallet
Accounts.prototype.decrypt = function (v3Keystore, password, nonStrict) {
    /* jshint maxcomplexity: 10 */

    if(!_.isString(password)) {
        throw new Error('No password given.');
    }

    var json = (_.isObject(v3Keystore)) ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);

    if (json.version !== 3) {
        throw new Error('Not a valid V3 wallet');
    }

    var derivedKey;
    var kdfparams;
    if (json.crypto.kdf === 'scrypt') {
        kdfparams = json.crypto.kdfparams;

        // FIXME: support progress reporting callback
        derivedKey = scrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    } else if (json.crypto.kdf === 'pbkdf2') {
        kdfparams = json.crypto.kdfparams;

        if (kdfparams.prf !== 'hmac-sha256') {
            throw new Error('Unsupported parameters to PBKDF2');
        }

        derivedKey = cryp.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
    } else {
        throw new Error('Unsupported key derivation scheme');
    }

    var ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');

    var mac = utils.sha3(Buffer.concat([ derivedKey.slice(16, 32), ciphertext ])).replace('0x','');
    if (mac !== json.crypto.mac) {
        throw new Error('Key derivation failed - possibly wrong password');
    }

    var decipher = cryp.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
    var seed = '0x'+ Buffer.concat([ decipher.update(ciphertext), decipher.final() ]).toString('hex');

    return this.privateKeyToAccount(seed);
};

Accounts.prototype.encrypt = function (privateKey, password, options) {
    /* jshint maxcomplexity: 20 */
    var account = this.privateKeyToAccount(privateKey);

    options = options || {};
    var salt = options.salt || cryp.randomBytes(32);
    var iv = options.iv || cryp.randomBytes(16);

    var derivedKey;
    var kdf = options.kdf || 'scrypt';
    var kdfparams = {
        dklen: options.dklen || 32,
        salt: salt.toString('hex')
    };

    if (kdf === 'pbkdf2') {
        kdfparams.c = options.c || 262144;
        kdfparams.prf = 'hmac-sha256';
        derivedKey = cryp.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
    } else if (kdf === 'scrypt') {
        // FIXME: support progress reporting callback
        kdfparams.n = options.n || 8192; // 2048 4096 8192 16384
        kdfparams.r = options.r || 8;
        kdfparams.p = options.p || 1;
        derivedKey = scrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    } else {
        throw new Error('Unsupported kdf');
    }

    var cipher = cryp.createCipheriv(options.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
    if (!cipher) {
        throw new Error('Unsupported cipher');
    }

    var ciphertext = Buffer.concat([ cipher.update(Buffer.from(account.privateKey.replace('0x',''), 'hex')), cipher.final() ]);

    var mac = utils.sha3(Buffer.concat([ derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex') ])).replace('0x','');

    return {
        version: 3,
        id: uuid.v4({ random: options.uuid || cryp.randomBytes(16) }),
        address: account.address.toLowerCase().replace('0x',''),
        crypto: {
            ciphertext: ciphertext.toString('hex'),
            cipherparams: {
                iv: iv.toString('hex')
            },
            cipher: options.cipher || 'aes-128-ctr',
            kdf: kdf,
            kdfparams: kdfparams,
            mac: mac.toString('hex')
        }
    };
};


// Note: this is trying to follow closely the specs on
// http://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html

function Wallet(accounts) {
    this._accounts = accounts;
    this.length = 0;
    this.defaultKeyName = "web3js_wallet";
}

Wallet.prototype._findSafeIndex = function (pointer) {
    pointer = pointer || 0;
    if (_.has(this, pointer)) {
        return this._findSafeIndex(pointer + 1);
    } else {
        return pointer;
    }
};

Wallet.prototype._currentIndexes = function () {
    var keys = Object.keys(this);
    var indexes = keys
        .map(function(key) { return parseInt(key); })
        .filter(function(n) { return (n < 9e20); });

    return indexes;
};

Wallet.prototype.create = function (numberOfAccounts, entropy) {
    for (var i = 0; i < numberOfAccounts; ++i) {
        this.add(this._accounts.create(entropy).privateKey);
    }
    return this;
};

Wallet.prototype.add = function (account) {

    if (_.isString(account)) {
        account = this._accounts.privateKeyToAccount(account);
    }
    if (!this[account.address]) {
        account = this._accounts.privateKeyToAccount(account.privateKey);
        account.index = this._findSafeIndex();

        this[account.index] = account;
        this[account.address] = account;
        this[account.address.toLowerCase()] = account;

        this.length++;

        return account;
    } else {
        return this[account.address];
    }
};

Wallet.prototype.remove = function (addressOrIndex) {
    var account = this[addressOrIndex];

    if (account && account.address) {
        // address
        this[account.address].privateKey = null;
        delete this[account.address];
        // address lowercase
        this[account.address.toLowerCase()].privateKey = null;
        delete this[account.address.toLowerCase()];
        // index
        this[account.index].privateKey = null;
        delete this[account.index];

        this.length--;

        return true;
    } else {
        return false;
    }
};

Wallet.prototype.clear = function () {
    var _this = this;
    var indexes = this._currentIndexes();

    indexes.forEach(function(index) {
        _this.remove(index);
    });

    return this;
};

Wallet.prototype.encrypt = function (password, options) {
    var _this = this;
    var indexes = this._currentIndexes();

    var accounts = indexes.map(function(index) {
        return _this[index].encrypt(password, options);
    });

    return accounts;
};


Wallet.prototype.decrypt = function (encryptedWallet, password) {
    var _this = this;

    encryptedWallet.forEach(function (keystore) {
        var account = _this._accounts.decrypt(keystore, password);

        if (account) {
            _this.add(account);
        } else {
            throw new Error('Couldn\'t decrypt accounts. Password wrong?');
        }
    });

    return this;
};

Wallet.prototype.save = function (password, keyName) {
    localStorage.setItem(keyName || this.defaultKeyName, JSON.stringify(this.encrypt(password)));

    return true;
};

Wallet.prototype.load = function (password, keyName) {
    var keystore = localStorage.getItem(keyName || this.defaultKeyName);

    if (keystore) {
        try {
            keystore = JSON.parse(keystore);
        } catch(e) {

        }
    }

    return this.decrypt(keystore || [], password);
};

if (typeof localStorage === 'undefined') {
    delete Wallet.prototype.save;
    delete Wallet.prototype.load;
}


module.exports = Accounts;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "IiIQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RESOLVER = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "interfaceID",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentTypes",
                "type": "uint256"
            }
        ],
        "name": "ABI",
        "outputs": [
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "hash",
                "type": "bytes"
            }
        ],
        "name": "setMultihash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "multihash",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "setPubkey",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "content",
        "outputs": [
            {
                "name": "ret",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "addr",
        "outputs": [
            {
                "name": "ret",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "setABI",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "name",
        "outputs": [
            {
                "name": "ret",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "setName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "setContent",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "pubkey",
        "outputs": [
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "setAddr",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "ensAddr",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "a",
                "type": "address"
            }
        ],
        "name": "AddrChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "ContentChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            }
        ],
        "name": "NameChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "contentType",
                "type": "uint256"
            }
        ],
        "name": "ABIChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "x",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "PubkeyChanged",
        "type": "event"
    }
];

module.exports = RESOLVER;


/***/ }),

/***/ "JtcH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
exports.defineReadOnly = defineReadOnly;
function defineFrozen(object, name, value) {
    var frozen = JSON.stringify(value);
    Object.defineProperty(object, name, {
        enumerable: true,
        get: function () { return JSON.parse(frozen); }
    });
}
exports.defineFrozen = defineFrozen;
function resolveProperties(object) {
    var result = {};
    var promises = [];
    Object.keys(object).forEach(function (key) {
        var value = object[key];
        if (value instanceof Promise) {
            promises.push(value.then(function (value) {
                result[key] = value;
                return null;
            }));
        }
        else {
            result[key] = value;
        }
    });
    return Promise.all(promises).then(function () {
        return result;
    });
}
exports.resolveProperties = resolveProperties;
function shallowCopy(object) {
    var result = {};
    for (var key in object) {
        result[key] = object[key];
    }
    return result;
}
exports.shallowCopy = shallowCopy;
function jsonCopy(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.jsonCopy = jsonCopy;


/***/ }),

/***/ "KtDt":
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__("oAuU");
var v4 = __webpack_require__("9eFT");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "L9vt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  BigNumber
 *
 *  A wrapper around the BN.js object. We use the BN.js library
 *  because it is used by elliptic, so it is required regardles.
 *
 */
var bn_js_1 = __importDefault(__webpack_require__("OZ/i"));
var bytes_1 = __webpack_require__("CmDq");
var properties_1 = __webpack_require__("JtcH");
var types_1 = __webpack_require__("abO7");
var errors = __importStar(__webpack_require__("3ksW"));
var BN_1 = new bn_js_1.default.BN(-1);
function toHex(bn) {
    var value = bn.toString(16);
    if (value[0] === '-') {
        if ((value.length % 2) === 0) {
            return '-0x0' + value.substring(1);
        }
        return "-0x" + value.substring(1);
    }
    if ((value.length % 2) === 1) {
        return '0x0' + value;
    }
    return '0x' + value;
}
function toBN(value) {
    return bigNumberify(value)._bn;
}
function toBigNumber(bn) {
    return new BigNumber(toHex(bn));
}
var BigNumber = /** @class */ (function (_super) {
    __extends(BigNumber, _super);
    function BigNumber(value) {
        var _this = _super.call(this) || this;
        errors.checkNew(_this, BigNumber);
        if (typeof (value) === 'string') {
            if (bytes_1.isHexString(value)) {
                if (value == '0x') {
                    value = '0x0';
                }
                properties_1.defineReadOnly(_this, '_hex', value);
            }
            else if (value[0] === '-' && bytes_1.isHexString(value.substring(1))) {
                properties_1.defineReadOnly(_this, '_hex', value);
            }
            else if (value.match(/^-?[0-9]*$/)) {
                if (value == '') {
                    value = '0';
                }
                properties_1.defineReadOnly(_this, '_hex', toHex(new bn_js_1.default.BN(value)));
            }
            else {
                errors.throwError('invalid BigNumber string value', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
            }
        }
        else if (typeof (value) === 'number') {
            if (parseInt(String(value)) !== value) {
                errors.throwError('underflow', errors.NUMERIC_FAULT, { operation: 'setValue', fault: 'underflow', value: value, outputValue: parseInt(String(value)) });
            }
            try {
                properties_1.defineReadOnly(_this, '_hex', toHex(new bn_js_1.default.BN(value)));
            }
            catch (error) {
                errors.throwError('overflow', errors.NUMERIC_FAULT, { operation: 'setValue', fault: 'overflow', details: error.message });
            }
        }
        else if (value instanceof BigNumber) {
            properties_1.defineReadOnly(_this, '_hex', value._hex);
        }
        else if (value.toHexString) {
            properties_1.defineReadOnly(_this, '_hex', toHex(toBN(value.toHexString())));
        }
        else if (bytes_1.isArrayish(value)) {
            properties_1.defineReadOnly(_this, '_hex', toHex(new bn_js_1.default.BN(bytes_1.hexlify(value).substring(2), 16)));
        }
        else {
            errors.throwError('invalid BigNumber value', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        return _this;
    }
    Object.defineProperty(BigNumber.prototype, "_bn", {
        get: function () {
            if (this._hex[0] === '-') {
                return (new bn_js_1.default.BN(this._hex.substring(3), 16)).mul(BN_1);
            }
            return new bn_js_1.default.BN(this._hex.substring(2), 16);
        },
        enumerable: true,
        configurable: true
    });
    BigNumber.prototype.fromTwos = function (value) {
        return toBigNumber(this._bn.fromTwos(value));
    };
    BigNumber.prototype.toTwos = function (value) {
        return toBigNumber(this._bn.toTwos(value));
    };
    BigNumber.prototype.add = function (other) {
        return toBigNumber(this._bn.add(toBN(other)));
    };
    BigNumber.prototype.sub = function (other) {
        return toBigNumber(this._bn.sub(toBN(other)));
    };
    BigNumber.prototype.div = function (other) {
        var o = bigNumberify(other);
        if (o.isZero()) {
            errors.throwError('division by zero', errors.NUMERIC_FAULT, { operation: 'divide', fault: 'division by zero' });
        }
        return toBigNumber(this._bn.div(toBN(other)));
    };
    BigNumber.prototype.mul = function (other) {
        return toBigNumber(this._bn.mul(toBN(other)));
    };
    BigNumber.prototype.mod = function (other) {
        return toBigNumber(this._bn.mod(toBN(other)));
    };
    BigNumber.prototype.pow = function (other) {
        return toBigNumber(this._bn.pow(toBN(other)));
    };
    BigNumber.prototype.maskn = function (value) {
        return toBigNumber(this._bn.maskn(value));
    };
    BigNumber.prototype.eq = function (other) {
        return this._bn.eq(toBN(other));
    };
    BigNumber.prototype.lt = function (other) {
        return this._bn.lt(toBN(other));
    };
    BigNumber.prototype.lte = function (other) {
        return this._bn.lte(toBN(other));
    };
    BigNumber.prototype.gt = function (other) {
        return this._bn.gt(toBN(other));
    };
    BigNumber.prototype.gte = function (other) {
        return this._bn.gte(toBN(other));
    };
    BigNumber.prototype.isZero = function () {
        return this._bn.isZero();
    };
    BigNumber.prototype.toNumber = function () {
        try {
            return this._bn.toNumber();
        }
        catch (error) {
            errors.throwError('overflow', errors.NUMERIC_FAULT, { operation: 'setValue', fault: 'overflow', details: error.message });
        }
        return null;
    };
    BigNumber.prototype.toString = function () {
        return this._bn.toString(10);
    };
    BigNumber.prototype.toHexString = function () {
        return this._hex;
    };
    return BigNumber;
}(types_1.BigNumber));
function bigNumberify(value) {
    if (value instanceof BigNumber) {
        return value;
    }
    return new BigNumber(value);
}
exports.bigNumberify = bigNumberify;
exports.ConstantNegativeOne = bigNumberify(-1);
exports.ConstantZero = bigNumberify(0);
exports.ConstantOne = bigNumberify(1);
exports.ConstantTwo = bigNumberify(2);
exports.ConstantWeiPerEther = bigNumberify('1000000000000000000');


/***/ }),

/***/ "M6DC":
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "TTHW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// We use this for base 36 maths
var bn_js_1 = __importDefault(__webpack_require__("OZ/i"));
var bytes_1 = __webpack_require__("CmDq");
var keccak256_1 = __webpack_require__("hbFG");
var rlp_1 = __webpack_require__("plAw");
var errors = __webpack_require__("3ksW");
function getChecksumAddress(address) {
    if (typeof (address) !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
        errors.throwError('invalid address', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
    }
    address = address.toLowerCase();
    var chars = address.substring(2).split('');
    var hashed = new Uint8Array(40);
    for (var i_1 = 0; i_1 < 40; i_1++) {
        hashed[i_1] = chars[i_1].charCodeAt(0);
    }
    hashed = bytes_1.arrayify(keccak256_1.keccak256(hashed));
    for (var i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    return '0x' + chars.join('');
}
// Shims for environments that are missing some required constants and functions
var MAX_SAFE_INTEGER = 0x1fffffffffffff;
function log10(x) {
    if (Math.log10) {
        return Math.log10(x);
    }
    return Math.log(x) / Math.LN10;
}
// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table
var ibanLookup = {};
for (var i = 0; i < 10; i++) {
    ibanLookup[String(i)] = String(i);
}
for (var i = 0; i < 26; i++) {
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
// How many decimal digits can we process? (for 64-bit float, this is 15)
var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + '00';
    var expanded = '';
    address.split('').forEach(function (c) {
        expanded += ibanLookup[c];
    });
    // Javascript can handle integers safely up to 15 (decimal) digits
    while (expanded.length >= safeDigits) {
        var block = expanded.substring(0, safeDigits);
        expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }
    var checksum = String(98 - (parseInt(expanded, 10) % 97));
    while (checksum.length < 2) {
        checksum = '0' + checksum;
    }
    return checksum;
}
;
function getAddress(address) {
    var result = null;
    if (typeof (address) !== 'string') {
        errors.throwError('invalid address', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
    }
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (address.substring(0, 2) !== '0x') {
            address = '0x' + address;
        }
        result = getChecksumAddress(address);
        // It is a checksummed address with a bad checksum
        if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
            errors.throwError('bad address checksum', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
        }
        // Maybe ICAP? (we only support direct mode)
    }
    else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            errors.throwError('bad icap checksum', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
        }
        result = (new bn_js_1.default.BN(address.substring(4), 36)).toString(16);
        while (result.length < 40) {
            result = '0' + result;
        }
        result = getChecksumAddress('0x' + result);
    }
    else {
        errors.throwError('invalid address', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
    }
    return result;
}
exports.getAddress = getAddress;
function getIcapAddress(address) {
    var base36 = (new bn_js_1.default.BN(getAddress(address).substring(2), 16)).toString(36).toUpperCase();
    while (base36.length < 30) {
        base36 = '0' + base36;
    }
    return 'XE' + ibanChecksum('XE00' + base36) + base36;
}
exports.getIcapAddress = getIcapAddress;
// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
function getContractAddress(transaction) {
    if (!transaction.from) {
        throw new Error('missing from address');
    }
    var nonce = transaction.nonce;
    return getAddress('0x' + keccak256_1.keccak256(rlp_1.encode([
        getAddress(transaction.from),
        bytes_1.stripZeros(bytes_1.hexlify(nonce))
    ])).substring(26));
}
exports.getContractAddress = getContractAddress;


/***/ }),

/***/ "UsaS":
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
 * @file ENS.js
 *
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */



var config = __webpack_require__("Xomu");
var Registry = __webpack_require__("t6Gu");
var ResolverMethodHandler = __webpack_require__("+QiP");

/**
 * Constructs a new instance of ENS
 *
 * @method ENS
 * @param {Object} eth
 * @constructor
 */
function ENS(eth) {
    this.eth = eth;
}

Object.defineProperty(ENS.prototype, 'registry', {
    get: function () {
        return new Registry(this);
    },
    enumerable: true
});

Object.defineProperty(ENS.prototype, 'resolverMethodHandler', {
    get: function () {
        return new ResolverMethodHandler(this.registry);
    },
    enumerable: true
});

/**
 * @param {string} name
 * @returns {Promise<Contract>}
 */
ENS.prototype.resolver = function (name) {
    return this.registry.resolver(name);
};

/**
 * Returns the address record associated with a name.
 *
 * @method getAddress
 * @param {string} name
 * @param {function} callback
 * @return {eventifiedPromise}
 */
ENS.prototype.getAddress = function (name, callback) {
    return this.resolverMethodHandler.method(name, 'addr', []).call(callback);
};

/**
 * Sets a new address
 *
 * @method setAddress
 * @param {string} name
 * @param {string} address
 * @param {Object} sendOptions
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.setAddress = function (name, address, sendOptions, callback) {
    return this.resolverMethodHandler.method(name, 'setAddr', [address]).send(sendOptions, callback);
};

/**
 * Returns the public key
 *
 * @method getPubkey
 * @param {string} name
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.getPubkey = function (name, callback) {
    return this.resolverMethodHandler.method(name, 'pubkey', [], callback).call(callback);
};

/**
 * Set the new public key
 *
 * @method setPubkey
 * @param {string} name
 * @param {string} x
 * @param {string} y
 * @param {Object} sendOptions
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.setPubkey = function (name, x, y, sendOptions, callback) {
    return this.resolverMethodHandler.method(name, 'setPubkey', [x, y]).send(sendOptions, callback);
};

/**
 * Returns the content
 *
 * @method getContent
 * @param {string} name
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.getContent = function (name, callback) {
    return this.resolverMethodHandler.method(name, 'content', []).call(callback);
};

/**
 * Set the content
 *
 * @method setContent
 * @param {string} name
 * @param {string} hash
 * @param {function} callback
 * @param {Object} sendOptions
 * @returns {eventifiedPromise}
 */
ENS.prototype.setContent = function (name, hash, sendOptions, callback) {
    return this.resolverMethodHandler.method(name, 'setContent', [hash]).send(sendOptions, callback);
};

/**
 * Get the multihash
 *
 * @method getMultihash
 * @param {string} name
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.getMultihash = function (name, callback) {
    return this.resolverMethodHandler.method(name, 'multihash', []).call(callback);
};

/**
 * Set the multihash
 *
 * @method setMultihash
 * @param {string} name
 * @param {string} hash
 * @param {Object} sendOptions
 * @param {function} callback
 * @returns {eventifiedPromise}
 */
ENS.prototype.setMultihash = function (name, hash, sendOptions, callback) {
    return this.resolverMethodHandler.method(name, 'multihash', [hash]).send(sendOptions, callback);
};

/**
 * Checks if the current used network is synced and looks for ENS support there.
 * Throws an error if not.
 *
 * @returns {Promise<Block>}
 */
ENS.prototype.checkNetwork = function () {
    var self = this;
    return self.eth.getBlock('latest').then(function (block) {
        var headAge = new Date() / 1000 - block.timestamp;
        if (headAge > 3600) {
            throw new Error("Network not synced; last block was " + headAge + " seconds ago");
        }
        return self.eth.net.getNetworkType();
    }).then(function (networkType) {
        var addr = config.addresses[networkType];
        if (typeof addr === 'undefined') {
            throw new Error("ENS is not supported on network " + networkType);
        }

        return addr;
    });
};

module.exports = ENS;


/***/ }),

/***/ "V4+v":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bytes_1 = __webpack_require__("CmDq");
var UnicodeNormalizationForm;
(function (UnicodeNormalizationForm) {
    UnicodeNormalizationForm["current"] = "";
    UnicodeNormalizationForm["NFC"] = "NFC";
    UnicodeNormalizationForm["NFD"] = "NFD";
    UnicodeNormalizationForm["NFKC"] = "NFKC";
    UnicodeNormalizationForm["NFKD"] = "NFKD";
})(UnicodeNormalizationForm = exports.UnicodeNormalizationForm || (exports.UnicodeNormalizationForm = {}));
;
// http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
function toUtf8Bytes(str, form) {
    if (form === void 0) { form = UnicodeNormalizationForm.current; }
    if (form != UnicodeNormalizationForm.current) {
        str = str.normalize(form);
    }
    var result = [];
    var offset = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            result[offset++] = c;
        }
        else if (c < 2048) {
            result[offset++] = (c >> 6) | 192;
            result[offset++] = (c & 63) | 128;
        }
        else if (((c & 0xFC00) == 0xD800) && (i + 1) < str.length && ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            result[offset++] = (c >> 18) | 240;
            result[offset++] = ((c >> 12) & 63) | 128;
            result[offset++] = ((c >> 6) & 63) | 128;
            result[offset++] = (c & 63) | 128;
        }
        else {
            result[offset++] = (c >> 12) | 224;
            result[offset++] = ((c >> 6) & 63) | 128;
            result[offset++] = (c & 63) | 128;
        }
    }
    return bytes_1.arrayify(result);
}
exports.toUtf8Bytes = toUtf8Bytes;
;
// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
function toUtf8String(bytes) {
    bytes = bytes_1.arrayify(bytes);
    var result = '';
    var i = 0;
    // Invalid bytes are ignored
    while (i < bytes.length) {
        var c = bytes[i++];
        if (c >> 7 == 0) {
            // 0xxx xxxx
            result += String.fromCharCode(c);
            continue;
        }
        // Invalid starting byte
        if (c >> 6 == 0x02) {
            continue;
        }
        // Multibyte; how many bytes left for thus character?
        var extraLength = null;
        if (c >> 5 == 0x06) {
            extraLength = 1;
        }
        else if (c >> 4 == 0x0e) {
            extraLength = 2;
        }
        else if (c >> 3 == 0x1e) {
            extraLength = 3;
        }
        else if (c >> 2 == 0x3e) {
            extraLength = 4;
        }
        else if (c >> 1 == 0x7e) {
            extraLength = 5;
        }
        else {
            continue;
        }
        // Do we have enough bytes in our data?
        if (i + extraLength > bytes.length) {
            // If there is an invalid unprocessed byte, try to continue
            for (; i < bytes.length; i++) {
                if (bytes[i] >> 6 != 0x02) {
                    break;
                }
            }
            if (i != bytes.length)
                continue;
            // All leftover bytes are valid.
            return result;
        }
        // Remove the UTF-8 prefix from the char (res)
        var res = c & ((1 << (8 - extraLength - 1)) - 1);
        var count;
        for (count = 0; count < extraLength; count++) {
            var nextChar = bytes[i++];
            // Is the char valid multibyte part?
            if (nextChar >> 6 != 0x02) {
                break;
            }
            ;
            res = (res << 6) | (nextChar & 0x3f);
        }
        if (count != extraLength) {
            i--;
            continue;
        }
        if (res <= 0xffff) {
            result += String.fromCharCode(res);
            continue;
        }
        res -= 0x10000;
        result += String.fromCharCode(((res >> 10) & 0x3ff) + 0xd800, (res & 0x3ff) + 0xdc00);
    }
    return result;
}
exports.toUtf8String = toUtf8String;


/***/ }),

/***/ "Xomu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
    addresses: {
        main: "0x314159265dD8dbb310642f98f50C066173C1259b",
        ropsten: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
        rinkeby: "0xe7410170f87102df0055eb195163a03b7f2bff4a"
    },
};

module.exports = config;


/***/ }),

/***/ "abO7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////
// Bytes
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////
// BigNumber
var BigNumber = /** @class */ (function () {
    function BigNumber() {
    }
    return BigNumber;
}());
exports.BigNumber = BigNumber;
;
;
;
///////////////////////////////
// Interface
var Indexed = /** @class */ (function () {
    function Indexed() {
    }
    return Indexed;
}());
exports.Indexed = Indexed;
/**
 *  Provider
 *
 *  Note: We use an abstract class so we can use instanceof to determine if an
 *        object is a Provider.
 */
var MinimalProvider = /** @class */ (function () {
    function MinimalProvider() {
    }
    return MinimalProvider;
}());
exports.MinimalProvider = MinimalProvider;
/**
 *  Signer
 *
 *  Note: We use an abstract class so we can use instanceof to determine if an
 *        object is a Signer.
 */
var Signer = /** @class */ (function () {
    function Signer() {
    }
    return Signer;
}());
exports.Signer = Signer;
///////////////////////////////
// HDNode
var HDNode = /** @class */ (function () {
    function HDNode() {
    }
    return HDNode;
}());
exports.HDNode = HDNode;


/***/ }),

/***/ "cB64":
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
 *
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */



var ENS = __webpack_require__("UsaS");

module.exports = ENS;


/***/ }),

/***/ "hbFG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sha3 = __webpack_require__("HFX+");
var bytes_1 = __webpack_require__("CmDq");
function keccak256(data) {
    return '0x' + sha3.keccak_256(bytes_1.arrayify(data));
}
exports.keccak256 = keccak256;


/***/ }),

/***/ "mFAp":
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "oAuU":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("M6DC");
var bytesToUuid = __webpack_require__("mFAp");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "plAw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//See: https://github.com/ethereum/wiki/wiki/RLP
Object.defineProperty(exports, "__esModule", { value: true });
var bytes_1 = __webpack_require__("CmDq");
function arrayifyInteger(value) {
    var result = [];
    while (value) {
        result.unshift(value & 0xff);
        value >>= 8;
    }
    return result;
}
function unarrayifyInteger(data, offset, length) {
    var result = 0;
    for (var i = 0; i < length; i++) {
        result = (result * 256) + data[offset + i];
    }
    return result;
}
function _encode(object) {
    if (Array.isArray(object)) {
        var payload = [];
        object.forEach(function (child) {
            payload = payload.concat(_encode(child));
        });
        if (payload.length <= 55) {
            payload.unshift(0xc0 + payload.length);
            return payload;
        }
        var length = arrayifyInteger(payload.length);
        length.unshift(0xf7 + length.length);
        return length.concat(payload);
    }
    var data = Array.prototype.slice.call(bytes_1.arrayify(object));
    if (data.length === 1 && data[0] <= 0x7f) {
        return data;
    }
    else if (data.length <= 55) {
        data.unshift(0x80 + data.length);
        return data;
    }
    var length = arrayifyInteger(data.length);
    length.unshift(0xb7 + length.length);
    return length.concat(data);
}
function encode(object) {
    return bytes_1.hexlify(_encode(object));
}
exports.encode = encode;
function _decodeChildren(data, offset, childOffset, length) {
    var result = [];
    while (childOffset < offset + 1 + length) {
        var decoded = _decode(data, childOffset);
        result.push(decoded.result);
        childOffset += decoded.consumed;
        if (childOffset > offset + 1 + length) {
            throw new Error('invalid rlp');
        }
    }
    return { consumed: (1 + length), result: result };
}
// returns { consumed: number, result: Object }
function _decode(data, offset) {
    if (data.length === 0) {
        throw new Error('invalid rlp data');
    }
    // Array with extra length prefix
    if (data[offset] >= 0xf8) {
        var lengthLength = data[offset] - 0xf7;
        if (offset + 1 + lengthLength > data.length) {
            throw new Error('too short');
        }
        var length = unarrayifyInteger(data, offset + 1, lengthLength);
        if (offset + 1 + lengthLength + length > data.length) {
            throw new Error('to short');
        }
        return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
    }
    else if (data[offset] >= 0xc0) {
        var length = data[offset] - 0xc0;
        if (offset + 1 + length > data.length) {
            throw new Error('invalid rlp data');
        }
        return _decodeChildren(data, offset, offset + 1, length);
    }
    else if (data[offset] >= 0xb8) {
        var lengthLength = data[offset] - 0xb7;
        if (offset + 1 + lengthLength > data.length) {
            throw new Error('invalid rlp data');
        }
        var length = unarrayifyInteger(data, offset + 1, lengthLength);
        if (offset + 1 + lengthLength + length > data.length) {
            throw new Error('invalid rlp data');
        }
        var result = bytes_1.hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
        return { consumed: (1 + lengthLength + length), result: result };
    }
    else if (data[offset] >= 0x80) {
        var length = data[offset] - 0x80;
        if (offset + 1 + length > data.length) {
            throw new Error('invlaid rlp data');
        }
        var result = bytes_1.hexlify(data.slice(offset + 1, offset + 1 + length));
        return { consumed: (1 + length), result: result };
    }
    return { consumed: 1, result: bytes_1.hexlify(data[offset]) };
}
function decode(data) {
    var bytes = bytes_1.arrayify(data);
    var decoded = _decode(bytes, 0);
    if (decoded.consumed !== bytes.length) {
        throw new Error('invalid rlp data');
    }
    return decoded.result;
}
exports.decode = decode;


/***/ }),

/***/ "rR0g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
var address_1 = __webpack_require__("TTHW");
var bignumber_1 = __webpack_require__("L9vt");
var bytes_1 = __webpack_require__("CmDq");
var utf8_1 = __webpack_require__("V4+v");
var properties_1 = __webpack_require__("JtcH");
var errors = __importStar(__webpack_require__("3ksW"));
var paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
var paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
var paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
exports.defaultCoerceFunc = function (type, value) {
    var match = type.match(paramTypeNumber);
    if (match && parseInt(match[2]) <= 48) {
        return value.toNumber();
    }
    return value;
};
///////////////////////////////////
// Parsing for Solidity Signatures
var regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
var regexIdentifier = new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");
function verifyType(type) {
    // These need to be transformed to their full description
    if (type.match(/^uint($|[^1-9])/)) {
        type = 'uint256' + type.substring(4);
    }
    else if (type.match(/^int($|[^1-9])/)) {
        type = 'int256' + type.substring(3);
    }
    return type;
}
function parseParam(param, allowIndexed) {
    function throwError(i) {
        throw new Error('unexpected character "' + param[i] + '" at position ' + i + ' in "' + param + '"');
    }
    var parent = { type: '', name: '', state: { allowType: true } };
    var node = parent;
    for (var i = 0; i < param.length; i++) {
        var c = param[i];
        switch (c) {
            case '(':
                if (!node.state.allowParams) {
                    throwError(i);
                }
                node.state.allowType = false;
                node.type = verifyType(node.type);
                node.components = [{ type: '', name: '', parent: node, state: { allowType: true } }];
                node = node.components[0];
                break;
            case ')':
                delete node.state;
                if (allowIndexed && node.name === 'indexed') {
                    node.indexed = true;
                    node.name = '';
                }
                node.type = verifyType(node.type);
                var child = node;
                node = node.parent;
                if (!node) {
                    throwError(i);
                }
                delete child.parent;
                node.state.allowParams = false;
                node.state.allowName = true;
                node.state.allowArray = true;
                break;
            case ',':
                delete node.state;
                if (allowIndexed && node.name === 'indexed') {
                    node.indexed = true;
                    node.name = '';
                }
                node.type = verifyType(node.type);
                var sibling = { type: '', name: '', parent: node.parent, state: { allowType: true } };
                node.parent.components.push(sibling);
                delete node.parent;
                node = sibling;
                break;
            // Hit a space...
            case ' ':
                // If reading type, the type is done and may read a param or name
                if (node.state.allowType) {
                    if (node.type !== '') {
                        node.type = verifyType(node.type);
                        delete node.state.allowType;
                        node.state.allowName = true;
                        node.state.allowParams = true;
                    }
                }
                // If reading name, the name is done
                if (node.state.allowName) {
                    if (node.name !== '') {
                        if (allowIndexed && node.name === 'indexed') {
                            node.indexed = true;
                            node.name = '';
                        }
                        else {
                            node.state.allowName = false;
                        }
                    }
                }
                break;
            case '[':
                if (!node.state.allowArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.allowArray = false;
                node.state.allowName = false;
                node.state.readArray = true;
                break;
            case ']':
                if (!node.state.readArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.readArray = false;
                node.state.allowArray = true;
                node.state.allowName = true;
                break;
            default:
                if (node.state.allowType) {
                    node.type += c;
                    node.state.allowParams = true;
                    node.state.allowArray = true;
                }
                else if (node.state.allowName) {
                    node.name += c;
                    delete node.state.allowArray;
                }
                else if (node.state.readArray) {
                    node.type += c;
                }
                else {
                    throwError(i);
                }
        }
    }
    if (node.parent) {
        throw new Error("unexpected eof");
    }
    delete parent.state;
    if (allowIndexed && node.name === 'indexed') {
        node.indexed = true;
        node.name = '';
    }
    parent.type = verifyType(parent.type);
    return parent;
}
// @TODO: Better return type
function parseSignatureEvent(fragment) {
    var abi = {
        anonymous: false,
        inputs: [],
        name: '',
        type: 'event'
    };
    var match = fragment.match(regexParen);
    if (!match) {
        throw new Error('invalid event: ' + fragment);
    }
    abi.name = match[1].trim();
    splitNesting(match[2]).forEach(function (param) {
        param = parseParam(param, true);
        param.indexed = !!param.indexed;
        abi.inputs.push(param);
    });
    match[3].split(' ').forEach(function (modifier) {
        switch (modifier) {
            case 'anonymous':
                abi.anonymous = true;
                break;
            case '':
                break;
            default:
                console.log('unknown modifier: ' + modifier);
        }
    });
    if (abi.name && !abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + abi.name + '"');
    }
    return abi;
}
function parseSignatureFunction(fragment) {
    var abi = {
        constant: false,
        inputs: [],
        name: '',
        outputs: [],
        payable: false,
        stateMutability: null,
        type: 'function'
    };
    var comps = fragment.split(' returns ');
    var left = comps[0].match(regexParen);
    if (!left) {
        throw new Error('invalid signature');
    }
    abi.name = left[1].trim();
    if (!abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + left[1] + '"');
    }
    splitNesting(left[2]).forEach(function (param) {
        abi.inputs.push(parseParam(param));
    });
    left[3].split(' ').forEach(function (modifier) {
        switch (modifier) {
            case 'constant':
                abi.constant = true;
                break;
            case 'payable':
                abi.payable = true;
                break;
            case 'pure':
                abi.constant = true;
                abi.stateMutability = 'pure';
                break;
            case 'view':
                abi.constant = true;
                abi.stateMutability = 'view';
                break;
            case '':
                break;
            default:
                console.log('unknown modifier: ' + modifier);
        }
    });
    // We have outputs
    if (comps.length > 1) {
        var right = comps[1].match(regexParen);
        if (right[1].trim() != '' || right[3].trim() != '') {
            throw new Error('unexpected tokens');
        }
        splitNesting(right[2]).forEach(function (param) {
            abi.outputs.push(parseParam(param));
        });
    }
    return abi;
}
function parseParamType(type) {
    return parseParam(type, true);
}
exports.parseParamType = parseParamType;
// @TODO: Allow a second boolean to expose names
function formatParamType(paramType) {
    return getParamCoder(exports.defaultCoerceFunc, paramType).type;
}
exports.formatParamType = formatParamType;
// @TODO: Allow a second boolean to expose names and modifiers
function formatSignature(fragment) {
    return fragment.name + '(' + fragment.inputs.map(function (i) { return formatParamType(i); }).join(',') + ')';
}
exports.formatSignature = formatSignature;
function parseSignature(fragment) {
    if (typeof (fragment) === 'string') {
        // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
        fragment = fragment.replace(/\(/g, ' (').replace(/\)/g, ') ').replace(/\s+/g, ' ');
        fragment = fragment.trim();
        if (fragment.substring(0, 6) === 'event ') {
            return parseSignatureEvent(fragment.substring(6).trim());
        }
        else {
            if (fragment.substring(0, 9) === 'function ') {
                fragment = fragment.substring(9);
            }
            return parseSignatureFunction(fragment.trim());
        }
    }
    throw new Error('unknown signature');
}
exports.parseSignature = parseSignature;
var Coder = /** @class */ (function () {
    function Coder(coerceFunc, name, type, localName, dynamic) {
        this.coerceFunc = coerceFunc;
        this.name = name;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
    }
    return Coder;
}());
// Clones the functionality of an existing Coder, but without a localName
var CoderAnonymous = /** @class */ (function (_super) {
    __extends(CoderAnonymous, _super);
    function CoderAnonymous(coder) {
        var _this = _super.call(this, coder.coerceFunc, coder.name, coder.type, undefined, coder.dynamic) || this;
        properties_1.defineReadOnly(_this, 'coder', coder);
        return _this;
    }
    CoderAnonymous.prototype.encode = function (value) { return this.coder.encode(value); };
    CoderAnonymous.prototype.decode = function (data, offset) { return this.coder.decode(data, offset); };
    return CoderAnonymous;
}(Coder));
var CoderNull = /** @class */ (function (_super) {
    __extends(CoderNull, _super);
    function CoderNull(coerceFunc, localName) {
        return _super.call(this, coerceFunc, 'null', '', localName, false) || this;
    }
    CoderNull.prototype.encode = function (value) {
        return bytes_1.arrayify([]);
    };
    CoderNull.prototype.decode = function (data, offset) {
        if (offset > data.length) {
            throw new Error('invalid null');
        }
        return {
            consumed: 0,
            value: this.coerceFunc('null', undefined)
        };
    };
    return CoderNull;
}(Coder));
var CoderNumber = /** @class */ (function (_super) {
    __extends(CoderNumber, _super);
    function CoderNumber(coerceFunc, size, signed, localName) {
        var _this = this;
        var name = ((signed ? 'int' : 'uint') + (size * 8));
        _this = _super.call(this, coerceFunc, name, name, localName, false) || this;
        _this.size = size;
        _this.signed = signed;
        return _this;
    }
    CoderNumber.prototype.encode = function (value) {
        try {
            var v = bignumber_1.bigNumberify(value);
            v = v.toTwos(this.size * 8).maskn(this.size * 8);
            //value = value.toTwos(size * 8).maskn(size * 8);
            if (this.signed) {
                v = v.fromTwos(this.size * 8).toTwos(256);
            }
            return bytes_1.padZeros(bytes_1.arrayify(v), 32);
        }
        catch (error) {
            errors.throwError('invalid number value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: value
            });
        }
        return null;
    };
    CoderNumber.prototype.decode = function (data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficient data for ' + this.name + ' type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: bytes_1.hexlify(data.slice(offset, offset + 32))
            });
        }
        var junkLength = 32 - this.size;
        var value = bignumber_1.bigNumberify(data.slice(offset + junkLength, offset + 32));
        if (this.signed) {
            value = value.fromTwos(this.size * 8);
        }
        else {
            value = value.maskn(this.size * 8);
        }
        return {
            consumed: 32,
            value: this.coerceFunc(this.name, value),
        };
    };
    return CoderNumber;
}(Coder));
var uint256Coder = new CoderNumber(function (type, value) { return value; }, 32, false, 'none');
var CoderBoolean = /** @class */ (function (_super) {
    __extends(CoderBoolean, _super);
    function CoderBoolean(coerceFunc, localName) {
        return _super.call(this, coerceFunc, 'bool', 'bool', localName, false) || this;
    }
    CoderBoolean.prototype.encode = function (value) {
        return uint256Coder.encode(!!value ? 1 : 0);
    };
    CoderBoolean.prototype.decode = function (data, offset) {
        try {
            var result = uint256Coder.decode(data, offset);
        }
        catch (error) {
            if (error.reason === 'insufficient data for uint256 type') {
                errors.throwError('insufficient data for boolean type', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'boolean',
                    value: error.value
                });
            }
            throw error;
        }
        return {
            consumed: result.consumed,
            value: this.coerceFunc('bool', !result.value.isZero())
        };
    };
    return CoderBoolean;
}(Coder));
var CoderFixedBytes = /** @class */ (function (_super) {
    __extends(CoderFixedBytes, _super);
    function CoderFixedBytes(coerceFunc, length, localName) {
        var _this = this;
        var name = ('bytes' + length);
        _this = _super.call(this, coerceFunc, name, name, localName, false) || this;
        _this.length = length;
        return _this;
    }
    CoderFixedBytes.prototype.encode = function (value) {
        var result = new Uint8Array(32);
        try {
            var data = bytes_1.arrayify(value);
            if (data.length > 32) {
                throw new Error();
            }
            result.set(data);
        }
        catch (error) {
            errors.throwError('invalid ' + this.name + ' value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: (error.value || value)
            });
        }
        return result;
    };
    CoderFixedBytes.prototype.decode = function (data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficient data for ' + name + ' type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: bytes_1.hexlify(data.slice(offset, offset + 32))
            });
        }
        return {
            consumed: 32,
            value: this.coerceFunc(this.name, bytes_1.hexlify(data.slice(offset, offset + this.length)))
        };
    };
    return CoderFixedBytes;
}(Coder));
var CoderAddress = /** @class */ (function (_super) {
    __extends(CoderAddress, _super);
    function CoderAddress(coerceFunc, localName) {
        return _super.call(this, coerceFunc, 'address', 'address', localName, false) || this;
    }
    CoderAddress.prototype.encode = function (value) {
        var result = new Uint8Array(32);
        try {
            result.set(bytes_1.arrayify(address_1.getAddress(value)), 12);
        }
        catch (error) {
            errors.throwError('invalid address', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'address',
                value: value
            });
        }
        return result;
    };
    CoderAddress.prototype.decode = function (data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficuent data for address type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'address',
                value: bytes_1.hexlify(data.slice(offset, offset + 32))
            });
        }
        return {
            consumed: 32,
            value: this.coerceFunc('address', address_1.getAddress(bytes_1.hexlify(data.slice(offset + 12, offset + 32))))
        };
    };
    return CoderAddress;
}(Coder));
function _encodeDynamicBytes(value) {
    var dataLength = 32 * Math.ceil(value.length / 32);
    var padding = new Uint8Array(dataLength - value.length);
    return bytes_1.concat([
        uint256Coder.encode(value.length),
        value,
        padding
    ]);
}
function _decodeDynamicBytes(data, offset, localName) {
    if (data.length < offset + 32) {
        errors.throwError('insufficient data for dynamicBytes length', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: bytes_1.hexlify(data.slice(offset, offset + 32))
        });
    }
    var length = uint256Coder.decode(data, offset).value;
    try {
        length = length.toNumber();
    }
    catch (error) {
        errors.throwError('dynamic bytes count too large', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: length.toString()
        });
    }
    if (data.length < offset + 32 + length) {
        errors.throwError('insufficient data for dynamicBytes type', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: bytes_1.hexlify(data.slice(offset, offset + 32 + length))
        });
    }
    return {
        consumed: 32 + 32 * Math.ceil(length / 32),
        value: data.slice(offset + 32, offset + 32 + length),
    };
}
var CoderDynamicBytes = /** @class */ (function (_super) {
    __extends(CoderDynamicBytes, _super);
    function CoderDynamicBytes(coerceFunc, localName) {
        return _super.call(this, coerceFunc, 'bytes', 'bytes', localName, true) || this;
    }
    CoderDynamicBytes.prototype.encode = function (value) {
        try {
            return _encodeDynamicBytes(bytes_1.arrayify(value));
        }
        catch (error) {
            errors.throwError('invalid bytes value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'bytes',
                value: error.value
            });
        }
        return null;
    };
    CoderDynamicBytes.prototype.decode = function (data, offset) {
        var result = _decodeDynamicBytes(data, offset, this.localName);
        result.value = this.coerceFunc('bytes', bytes_1.hexlify(result.value));
        return result;
    };
    return CoderDynamicBytes;
}(Coder));
var CoderString = /** @class */ (function (_super) {
    __extends(CoderString, _super);
    function CoderString(coerceFunc, localName) {
        return _super.call(this, coerceFunc, 'string', 'string', localName, true) || this;
    }
    CoderString.prototype.encode = function (value) {
        if (typeof (value) !== 'string') {
            errors.throwError('invalid string value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'string',
                value: value
            });
        }
        return _encodeDynamicBytes(utf8_1.toUtf8Bytes(value));
    };
    CoderString.prototype.decode = function (data, offset) {
        var result = _decodeDynamicBytes(data, offset, this.localName);
        result.value = this.coerceFunc('string', utf8_1.toUtf8String(result.value));
        return result;
    };
    return CoderString;
}(Coder));
function alignSize(size) {
    return 32 * Math.ceil(size / 32);
}
function pack(coders, values) {
    if (Array.isArray(values)) {
        // do nothing
    }
    else if (values && typeof (values) === 'object') {
        var arrayValues = [];
        coders.forEach(function (coder) {
            arrayValues.push(values[coder.localName]);
        });
        values = arrayValues;
    }
    else {
        errors.throwError('invalid tuple value', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            value: values
        });
    }
    if (coders.length !== values.length) {
        errors.throwError('types/value length mismatch', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            value: values
        });
    }
    var parts = [];
    coders.forEach(function (coder, index) {
        parts.push({ dynamic: coder.dynamic, value: coder.encode(values[index]) });
    });
    var staticSize = 0, dynamicSize = 0;
    parts.forEach(function (part) {
        if (part.dynamic) {
            staticSize += 32;
            dynamicSize += alignSize(part.value.length);
        }
        else {
            staticSize += alignSize(part.value.length);
        }
    });
    var offset = 0, dynamicOffset = staticSize;
    var data = new Uint8Array(staticSize + dynamicSize);
    parts.forEach(function (part) {
        if (part.dynamic) {
            //uint256Coder.encode(dynamicOffset).copy(data, offset);
            data.set(uint256Coder.encode(dynamicOffset), offset);
            offset += 32;
            //part.value.copy(data, dynamicOffset);  @TODO
            data.set(part.value, dynamicOffset);
            dynamicOffset += alignSize(part.value.length);
        }
        else {
            //part.value.copy(data, offset);  @TODO
            data.set(part.value, offset);
            offset += alignSize(part.value.length);
        }
    });
    return data;
}
function unpack(coders, data, offset) {
    var baseOffset = offset;
    var consumed = 0;
    var value = [];
    coders.forEach(function (coder) {
        if (coder.dynamic) {
            var dynamicOffset = uint256Coder.decode(data, offset);
            var result = coder.decode(data, baseOffset + dynamicOffset.value.toNumber());
            // The dynamic part is leap-frogged somewhere else; doesn't count towards size
            result.consumed = dynamicOffset.consumed;
        }
        else {
            var result = coder.decode(data, offset);
        }
        if (result.value != undefined) {
            value.push(result.value);
        }
        offset += result.consumed;
        consumed += result.consumed;
    });
    coders.forEach(function (coder, index) {
        var name = coder.localName;
        if (!name) {
            return;
        }
        if (name === 'length') {
            name = '_length';
        }
        if (value[name] != null) {
            return;
        }
        value[name] = value[index];
    });
    return {
        value: value,
        consumed: consumed
    };
}
var CoderArray = /** @class */ (function (_super) {
    __extends(CoderArray, _super);
    function CoderArray(coerceFunc, coder, length, localName) {
        var _this = this;
        var type = (coder.type + '[' + (length >= 0 ? length : '') + ']');
        var dynamic = (length === -1 || coder.dynamic);
        _this = _super.call(this, coerceFunc, 'array', type, localName, dynamic) || this;
        _this.coder = coder;
        _this.length = length;
        return _this;
    }
    CoderArray.prototype.encode = function (value) {
        if (!Array.isArray(value)) {
            errors.throwError('expected array value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'array',
                value: value
            });
        }
        var count = this.length;
        var result = new Uint8Array(0);
        if (count === -1) {
            count = value.length;
            result = uint256Coder.encode(count);
        }
        errors.checkArgumentCount(count, value.length, 'in coder array' + (this.localName ? (" " + this.localName) : ""));
        var coders = [];
        for (var i = 0; i < value.length; i++) {
            coders.push(this.coder);
        }
        return bytes_1.concat([result, pack(coders, value)]);
    };
    CoderArray.prototype.decode = function (data, offset) {
        // @TODO:
        //if (data.length < offset + length * 32) { throw new Error('invalid array'); }
        var consumed = 0;
        var count = this.length;
        if (count === -1) {
            try {
                var decodedLength = uint256Coder.decode(data, offset);
            }
            catch (error) {
                errors.throwError('insufficient data for dynamic array length', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'array',
                    value: error.value
                });
            }
            try {
                count = decodedLength.value.toNumber();
            }
            catch (error) {
                errors.throwError('array count too large', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'array',
                    value: decodedLength.value.toString()
                });
            }
            consumed += decodedLength.consumed;
            offset += decodedLength.consumed;
        }
        var coders = [];
        for (var i = 0; i < count; i++) {
            coders.push(new CoderAnonymous(this.coder));
        }
        var result = unpack(coders, data, offset);
        result.consumed += consumed;
        result.value = this.coerceFunc(this.type, result.value);
        return result;
    };
    return CoderArray;
}(Coder));
var CoderTuple = /** @class */ (function (_super) {
    __extends(CoderTuple, _super);
    function CoderTuple(coerceFunc, coders, localName) {
        var _this = this;
        var dynamic = false;
        var types = [];
        coders.forEach(function (coder) {
            if (coder.dynamic) {
                dynamic = true;
            }
            types.push(coder.type);
        });
        var type = ('tuple(' + types.join(',') + ')');
        _this = _super.call(this, coerceFunc, 'tuple', type, localName, dynamic) || this;
        _this.coders = coders;
        return _this;
    }
    CoderTuple.prototype.encode = function (value) {
        return pack(this.coders, value);
    };
    CoderTuple.prototype.decode = function (data, offset) {
        var result = unpack(this.coders, data, offset);
        result.value = this.coerceFunc(this.type, result.value);
        return result;
    };
    return CoderTuple;
}(Coder));
/*
function getTypes(coders) {
    var type = coderTuple(coders).type;
    return type.substring(6, type.length - 1);
}
*/
function splitNesting(value) {
    var result = [];
    var accum = '';
    var depth = 0;
    for (var offset = 0; offset < value.length; offset++) {
        var c = value[offset];
        if (c === ',' && depth === 0) {
            result.push(accum);
            accum = '';
        }
        else {
            accum += c;
            if (c === '(') {
                depth++;
            }
            else if (c === ')') {
                depth--;
                if (depth === -1) {
                    throw new Error('unbalanced parenthsis');
                }
            }
        }
    }
    result.push(accum);
    return result;
}
// @TODO: Is there a way to return "class"?
var paramTypeSimple = {
    address: CoderAddress,
    bool: CoderBoolean,
    string: CoderString,
    bytes: CoderDynamicBytes,
};
function getTupleParamCoder(coerceFunc, components, localName) {
    if (!components) {
        components = [];
    }
    var coders = [];
    components.forEach(function (component) {
        coders.push(getParamCoder(coerceFunc, component));
    });
    return new CoderTuple(coerceFunc, coders, localName);
}
function getParamCoder(coerceFunc, param) {
    var coder = paramTypeSimple[param.type];
    if (coder) {
        return new coder(coerceFunc, param.name);
    }
    var match = param.type.match(paramTypeNumber);
    if (match) {
        var size = parseInt(match[2] || "256");
        if (size === 0 || size > 256 || (size % 8) !== 0) {
            errors.throwError('invalid ' + match[1] + ' bit length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param
            });
        }
        return new CoderNumber(coerceFunc, size / 8, (match[1] === 'int'), param.name);
    }
    var match = param.type.match(paramTypeBytes);
    if (match) {
        var size = parseInt(match[1]);
        if (size === 0 || size > 32) {
            errors.throwError('invalid bytes length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param
            });
        }
        return new CoderFixedBytes(coerceFunc, size, param.name);
    }
    var match = param.type.match(paramTypeArray);
    if (match) {
        var size = parseInt(match[2] || "-1");
        param = properties_1.jsonCopy(param);
        param.type = match[1];
        return new CoderArray(coerceFunc, getParamCoder(coerceFunc, param), size, param.name);
    }
    if (param.type.substring(0, 5) === 'tuple') {
        return getTupleParamCoder(coerceFunc, param.components, param.name);
    }
    if (param.type === '') {
        return new CoderNull(coerceFunc, param.name);
    }
    errors.throwError('invalid type', errors.INVALID_ARGUMENT, {
        arg: 'type',
        value: param.type
    });
    return null;
}
var AbiCoder = /** @class */ (function () {
    function AbiCoder(coerceFunc) {
        errors.checkNew(this, AbiCoder);
        if (!coerceFunc) {
            coerceFunc = exports.defaultCoerceFunc;
        }
        properties_1.defineReadOnly(this, 'coerceFunc', coerceFunc);
    }
    AbiCoder.prototype.encode = function (types, values) {
        if (types.length !== values.length) {
            errors.throwError('types/values length mismatch', errors.INVALID_ARGUMENT, {
                count: { types: types.length, values: values.length },
                value: { types: types, values: values }
            });
        }
        var coders = [];
        types.forEach(function (type) {
            // Convert types to type objects
            //   - "uint foo" => { type: "uint", name: "foo" }
            //   - "tuple(uint, uint)" => { type: "tuple", components: [ { type: "uint" }, { type: "uint" }, ] }
            var typeObject = null;
            if (typeof (type) === 'string') {
                typeObject = parseParam(type);
            }
            else {
                typeObject = type;
            }
            coders.push(getParamCoder(this.coerceFunc, typeObject));
        }, this);
        return bytes_1.hexlify(new CoderTuple(this.coerceFunc, coders, '_').encode(values));
    };
    AbiCoder.prototype.decode = function (types, data) {
        var coders = [];
        types.forEach(function (type) {
            // See encode for details
            var typeObject = null;
            if (typeof (type) === 'string') {
                typeObject = parseParam(type);
            }
            else {
                typeObject = properties_1.jsonCopy(type);
            }
            coders.push(getParamCoder(this.coerceFunc, typeObject));
        }, this);
        return new CoderTuple(this.coerceFunc, coders, '_').decode(bytes_1.arrayify(data), 0).value;
    };
    return AbiCoder;
}());
exports.AbiCoder = AbiCoder;
exports.defaultAbiCoder = new AbiCoder();


/***/ }),

/***/ "rlKj":
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



var core = __webpack_require__("8e6A");
var Method = __webpack_require__("Ykib");
var utils = __webpack_require__("ETH1");


var Net = function () {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);


    [
        new Method({
            name: 'getId',
            call: 'net_version',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'isListening',
            call: 'net_listening',
            params: 0
        }),
        new Method({
            name: 'getPeerCount',
            call: 'net_peerCount',
            params: 0,
            outputFormatter: utils.hexToNumber
        })
    ].forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager);
    });

};

core.addProviders(Net);


module.exports = Net;




/***/ }),

/***/ "s84P":
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



var core = __webpack_require__("8e6A");
var Method = __webpack_require__("Ykib");
var utils = __webpack_require__("ETH1");
var Net = __webpack_require__("rlKj");

var formatters = __webpack_require__("OdSp").formatters;


var Personal = function Personal() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);

    this.net = new Net(this.currentProvider);

    var defaultAccount = null;
    var defaultBlock = 'latest';

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatters.inputAddressFormatter(val));
            }

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    var methods = [
        new Method({
            name: 'getAccounts',
            call: 'personal_listAccounts',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'newAccount',
            call: 'personal_newAccount',
            params: 1,
            inputFormatter: [null],
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'unlockAccount',
            call: 'personal_unlockAccount',
            params: 3,
            inputFormatter: [formatters.inputAddressFormatter, null, null]
        }),
        new Method({
            name: 'lockAccount',
            call: 'personal_lockAccount',
            params: 1,
            inputFormatter: [formatters.inputAddressFormatter]
        }),
        new Method({
            name: 'importRawKey',
            call: 'personal_importRawKey',
            params: 2
        }),
        new Method({
            name: 'sendTransaction',
            call: 'personal_sendTransaction',
            params: 2,
            inputFormatter: [formatters.inputTransactionFormatter, null]
        }),
        new Method({
            name: 'signTransaction',
            call: 'personal_signTransaction',
            params: 2,
            inputFormatter: [formatters.inputTransactionFormatter, null]
        }),
        new Method({
            name: 'sign',
            call: 'personal_sign',
            params: 3,
            inputFormatter: [formatters.inputSignFormatter, formatters.inputAddressFormatter, null]
        }),
        new Method({
            name: 'ecRecover',
            call: 'personal_ecRecover',
            params: 2,
            inputFormatter: [formatters.inputSignFormatter, null]
        })
    ];
    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager);
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
    });
};

core.addProviders(Personal);



module.exports = Personal;




/***/ }),

/***/ "t6Gu":
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
 * @file Registry.js
 *
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */



var _ = __webpack_require__("F/us");
var Contract = __webpack_require__("0QDG");
var namehash = __webpack_require__("LAvi");
var PromiEvent = __webpack_require__("VWKx");
var REGISTRY_ABI = __webpack_require__("EsSj");
var RESOLVER_ABI = __webpack_require__("IiIQ");


/**
 * A wrapper around the ENS registry contract.
 *
 * @method Registry
 * @param {Ens} ens
 * @constructor
 */
function Registry(ens) {
    var self = this;
    this.ens = ens;
    this.contract = ens.checkNetwork().then(function (address) {
        var contract = new Contract(REGISTRY_ABI, address);
        contract.setProvider(self.ens.eth.currentProvider);

        return contract;
    });
}

/**
 * Returns the address of the owner of an ENS name.
 *
 * @method owner
 * @param {string} name
 * @param {function} callback
 * @return {Promise<any>}
 */
Registry.prototype.owner = function (name, callback) {
    var promiEvent = new PromiEvent(true);

    this.contract.then(function (contract) {
        contract.methods.owner(namehash.hash(name)).call()
            .then(function (receipt) {
                promiEvent.resolve(receipt);

                if (_.isFunction(callback)) {
                    callback(receipt);
                }
            })
            .catch(function (error) {
                promiEvent.reject(error);

                if (_.isFunction(callback)) {
                    callback(error);
                }
            });
    });

    return promiEvent.eventEmitter;
};

/**
 * Returns the resolver contract associated with a name.
 *
 * @method resolver
 * @param {string} name
 * @return {Promise<Contract>}
 */
Registry.prototype.resolver = function (name) {
    var self = this;

    return this.contract.then(function (contract) {
        return contract.methods.resolver(namehash.hash(name)).call();
    }).then(function (address) {
        var contract = new Contract(RESOLVER_ABI, address);
        contract.setProvider(self.ens.eth.currentProvider);
        return contract;
    });
};

module.exports = Registry;


/***/ }),

/***/ "u6/g":
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
/**
 * @file index.js
 * @author Marek Kotewicz <marek@parity.io>
 * @author Fabian Vogelsteller <fabian@frozeman.de>
 * @date 2018
 */

var _ = __webpack_require__("F/us");
var utils = __webpack_require__("ETH1");

var EthersAbi = __webpack_require__("rR0g").AbiCoder;
var ethersAbiCoder = new EthersAbi(function (type, value) {
    if (type.match(/^u?int/) && !_.isArray(value) && (!_.isObject(value) || value.constructor.name !== 'BN')) {
        return value.toString();
    }
    return value;
});

// result method
function Result() {
}

/**
 * ABICoder prototype should be used to encode/decode solidity params of any type
 */
var ABICoder = function () {
};

/**
 * Encodes the function name to its ABI representation, which are the first 4 bytes of the sha3 of the function name including  types.
 *
 * @method encodeFunctionSignature
 * @param {String|Object} functionName
 * @return {String} encoded function name
 */
ABICoder.prototype.encodeFunctionSignature = function (functionName) {
    if (_.isObject(functionName)) {
        functionName = utils._jsonInterfaceMethodToString(functionName);
    }

    return utils.sha3(functionName).slice(0, 10);
};

/**
 * Encodes the function name to its ABI representation, which are the first 4 bytes of the sha3 of the function name including  types.
 *
 * @method encodeEventSignature
 * @param {String|Object} functionName
 * @return {String} encoded function name
 */
ABICoder.prototype.encodeEventSignature = function (functionName) {
    if (_.isObject(functionName)) {
        functionName = utils._jsonInterfaceMethodToString(functionName);
    }

    return utils.sha3(functionName);
};

/**
 * Should be used to encode plain param
 *
 * @method encodeParameter
 * @param {String} type
 * @param {Object} param
 * @return {String} encoded plain param
 */
ABICoder.prototype.encodeParameter = function (type, param) {
    return this.encodeParameters([type], [param]);
};

/**
 * Should be used to encode list of params
 *
 * @method encodeParameters
 * @param {Array} types
 * @param {Array} params
 * @return {String} encoded list of params
 */
ABICoder.prototype.encodeParameters = function (types, params) {
    return ethersAbiCoder.encode(this.mapTypes(types), params);
};

/**
 * Map types if simplified format is used
 *
 * @method mapTypes
 * @param {Array} types
 * @return {Array}
 */
ABICoder.prototype.mapTypes = function (types) {
    var self = this;
    var mappedTypes = [];
    types.forEach(function (type) {
        if (self.isSimplifiedStructFormat(type)) {
            var structName = Object.keys(type)[0];
            mappedTypes.push(
                Object.assign(
                    self.mapStructNameAndType(structName),
                    {
                        components: self.mapStructToCoderFormat(type[structName])
                    }
                )
            );

            return;
        }

        mappedTypes.push(type);
    });

    return mappedTypes;
};

/**
 * Check if type is simplified struct format
 *
 * @method isSimplifiedStructFormat
 * @param {string | Object} type
 * @returns {boolean}
 */
ABICoder.prototype.isSimplifiedStructFormat = function (type) {
    return typeof type === 'object' && typeof type.components === 'undefined' && typeof type.name === 'undefined';
};

/**
 * Maps the correct tuple type and name when the simplified format in encode/decodeParameter is used
 *
 * @method mapStructNameAndType
 * @param {string} structName
 * @return {{type: string, name: *}}
 */
ABICoder.prototype.mapStructNameAndType = function (structName) {
    var type = 'tuple';

    if (structName.indexOf('[]') > -1) {
        type = 'tuple[]';
        structName = structName.slice(0, -2);
    }

    return {type: type, name: structName};
};

/**
 * Maps the simplified format in to the expected format of the ABICoder
 *
 * @method mapStructToCoderFormat
 * @param {Object} struct
 * @return {Array}
 */
ABICoder.prototype.mapStructToCoderFormat = function (struct) {
    var self = this;
    var components = [];
    Object.keys(struct).forEach(function (key) {
        if (typeof struct[key] === 'object') {
            components.push(
                Object.assign(
                    self.mapStructNameAndType(key),
                    {
                        components: self.mapStructToCoderFormat(struct[key])
                    }
                )
            );

            return;
        }

        components.push({
            name: key,
            type: struct[key]
        });
    });

    return components;
};

/**
 * Encodes a function call from its json interface and parameters.
 *
 * @method encodeFunctionCall
 * @param {Array} jsonInterface
 * @param {Array} params
 * @return {String} The encoded ABI for this function call
 */
ABICoder.prototype.encodeFunctionCall = function (jsonInterface, params) {
    return this.encodeFunctionSignature(jsonInterface) + this.encodeParameters(jsonInterface.inputs, params).replace('0x', '');
};

/**
 * Should be used to decode bytes to plain param
 *
 * @method decodeParameter
 * @param {String} type
 * @param {String} bytes
 * @return {Object} plain param
 */
ABICoder.prototype.decodeParameter = function (type, bytes) {
    return this.decodeParameters([type], bytes)[0];
};

/**
 * Should be used to decode list of params
 *
 * @method decodeParameter
 * @param {Array} outputs
 * @param {String} bytes
 * @return {Array} array of plain params
 */
ABICoder.prototype.decodeParameters = function (outputs, bytes) {
    if (outputs.length > 0 && (!bytes || bytes === '0x' || bytes === '0X')) {
        throw new Error('Returned values aren\'t valid, did it run Out of Gas?');
    }

    var res = ethersAbiCoder.decode(this.mapTypes(outputs), '0x' + bytes.replace(/0x/i, ''));
    var returnValue = new Result();
    returnValue.__length__ = 0;

    outputs.forEach(function (output, i) {
        var decodedValue = res[returnValue.__length__];
        decodedValue = (decodedValue === '0x') ? null : decodedValue;

        returnValue[i] = decodedValue;

        if (_.isObject(output) && output.name) {
            returnValue[output.name] = decodedValue;
        }

        returnValue.__length__++;
    });

    return returnValue;
};

/**
 * Decodes events non- and indexed parameters.
 *
 * @method decodeLog
 * @param {Object} inputs
 * @param {String} data
 * @param {Array} topics
 * @return {Array} array of plain params
 */
ABICoder.prototype.decodeLog = function (inputs, data, topics) {
    var _this = this;
    topics = _.isArray(topics) ? topics : [topics];

    data = data || '';

    var notIndexedInputs = [];
    var indexedParams = [];
    var topicCount = 0;

    // TODO check for anonymous logs?

    inputs.forEach(function (input, i) {
        if (input.indexed) {
            indexedParams[i] = (['bool', 'int', 'uint', 'address', 'fixed', 'ufixed'].find(function (staticType) {
                return input.type.indexOf(staticType) !== -1;
            })) ? _this.decodeParameter(input.type, topics[topicCount]) : topics[topicCount];
            topicCount++;
        } else {
            notIndexedInputs[i] = input;
        }
    });


    var nonIndexedData = data;
    var notIndexedParams = (nonIndexedData) ? this.decodeParameters(notIndexedInputs, nonIndexedData) : [];

    var returnValue = new Result();
    returnValue.__length__ = 0;


    inputs.forEach(function (res, i) {
        returnValue[i] = (res.type === 'string') ? '' : null;

        if (typeof notIndexedParams[i] !== 'undefined') {
            returnValue[i] = notIndexedParams[i];
        }
        if (typeof indexedParams[i] !== 'undefined') {
            returnValue[i] = indexedParams[i];
        }

        if (res.name) {
            returnValue[res.name] = returnValue[i];
        }

        returnValue.__length__++;
    });

    return returnValue;
};

var coder = new ABICoder();

module.exports = coder;


/***/ }),

/***/ "zW2h":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var scryptsy = __webpack_require__("/cNO");

var scrypt;

var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
if (isNode) {
    var NODE_MIN_VER_WITH_BUILTIN_SCRYPT = '10.5.0';
    var NODE_MIN_VER_INCOMPAT_SCRYPT_PKG = '12.0.0';
    var semver = __webpack_require__("CC7U");
    var useNodeBuiltin = isNode && semver.Range('>=' + NODE_MIN_VER_WITH_BUILTIN_SCRYPT).test(process.version);

    var tryScryptPkg = (function() {
        var scryptPkg;
        return function() {
            if (scryptPkg !== undefined) { return scryptPkg; }
            try {
                scryptPkg = (function(m) { return __webpack_require__("VucO")(m); })('scrypt');
            } catch (e) {
                if (/was compiled against a different/.test(e.message)) {
                    throw e;
                }
                scryptPkg = null;
            }
            return scryptPkg;
        };
    })();

    var canImprove = function(nodeVer) {
        return 'can improve web3\'s peformance when running Node.js versions older than ' + nodeVer + ' by installing the (deprecated) scrypt package in your project';
    };

    if (useNodeBuiltin) {
        var crypto = __webpack_require__("HEbw");
        var fallbackCount = 0;
        scrypt = function(key, salt, N, r, p, dkLen) {
            try {
                return crypto.scryptSync(key, salt, dkLen, {N: N, r: r, p: p});
            } catch (e) {
                if (/scrypt:memory limit exceeded/.test(e.message)) {
                    var scryptPkg = tryScryptPkg();
                    if (scryptPkg) {
                        return scryptPkg.hashSync(key, {N: N, r: r, p: p}, dkLen, salt);
                    }
                    fallbackCount += 1;
                    console.warn(
                        '\x1b[33m%s\x1b[0m',
                        'Memory limit exceeded for Node\'s built-in crypto.scrypt, falling back to scryptsy (times: ' + fallbackCount + '), if this happens frequently you ' + canImprove(NODE_MIN_VER_INCOMPAT_SCRYPT_PKG)
                    );
                    return scryptsy(key, salt, N, r, p, dkLen);
                }
                throw e;
            }
        };
    } else {
        var scryptPkg = tryScryptPkg();
        if (scryptPkg) {
            scrypt = function(key, salt, N, r, p, dkLen) {
                return scryptPkg.hashSync(key, {N: N, r: r, p: p}, dkLen, salt);
            };
        } else {
            console.warn(
                '\x1b[33m%s\x1b[0m',
                'You ' + canImprove(NODE_MIN_VER_WITH_BUILTIN_SCRYPT)
            );
        }
    }
}

scrypt = scrypt || scryptsy;

module.exports = scrypt;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtZW5zL3NyYy9saWIvUmVzb2x2ZXJNZXRob2RIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1jb250cmFjdC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWliYW4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvbm9kZV9tb2R1bGVzL2V0aGVycy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoL3NyYy9nZXROZXR3b3JrVHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtYWNjb3VudHMvbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFjY291bnRzL25vZGVfbW9kdWxlcy9zZW12ZXIvc2VtdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvbm9kZV9tb2R1bGVzL2V0aGVycy91dGlscy9ieXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtZW5zL3NyYy9yZXNzb3VyY2VzL0FCSS9SZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hY2NvdW50cy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWVucy9zcmMvcmVzc291cmNlcy9BQkkvUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFiaS9ub2RlX21vZHVsZXMvZXRoZXJzL3V0aWxzL3Byb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFjY291bnRzL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvbm9kZV9tb2R1bGVzL2V0aGVycy91dGlscy9iaWdudW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFjY291bnRzL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtYWJpL25vZGVfbW9kdWxlcy9ldGhlcnMvdXRpbHMvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtZW5zL3NyYy9FTlMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFiaS9ub2RlX21vZHVsZXMvZXRoZXJzL3V0aWxzL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWVucy9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvbm9kZV9tb2R1bGVzL2V0aGVycy91dGlscy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtZW5zL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1ldGgtYWJpL25vZGVfbW9kdWxlcy9ldGhlcnMvdXRpbHMva2VjY2FrMjU2LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hY2NvdW50cy9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFjY291bnRzL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvbm9kZV9tb2R1bGVzL2V0aGVycy91dGlscy9ybHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWFiaS9ub2RlX21vZHVsZXMvZXRoZXJzL3V0aWxzL2FiaS1jb2Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy1uZXQvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1wZXJzb25hbC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtZXRoLWVucy9zcmMvY29udHJhY3RzL1JlZ2lzdHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hYmkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzLWV0aC1hY2NvdW50cy9zcmMvc2NyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsTUFBc0I7QUFDL0MsZUFBZSxtQkFBTyxDQUFDLE1BQWtCO0FBQ3pDLFFBQVEsbUJBQU8sQ0FBQyxNQUFZOztBQUU1QjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QixXQUFXLFNBQVM7QUFDcEIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCLFdBQVcsU0FBUztBQUNwQixXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQzVMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7O0FBR2IsUUFBUSxtQkFBTyxDQUFDLE1BQVk7QUFDNUIsV0FBVyxtQkFBTyxDQUFDLE1BQVc7QUFDOUIsYUFBYSxtQkFBTyxDQUFDLE1BQWtCO0FBQ3ZDLFlBQVksbUJBQU8sQ0FBQyxNQUFZO0FBQ2hDLG1CQUFtQixtQkFBTyxDQUFDLE1BQXlCO0FBQ3BELGlCQUFpQixtQkFBTyxDQUFDLE1BQW1CO0FBQzVDLGFBQWEsbUJBQU8sQ0FBQyxNQUFtQjtBQUN4QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFzQjtBQUMvQyxVQUFVLG1CQUFPLENBQUMsTUFBYzs7O0FBR2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7OztBQUdyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU07QUFDZjs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMkZBQTJGOztBQUUzRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdGQUF3Rjs7QUFFeEY7O0FBRUE7QUFDQSxvRkFBb0Y7QUFDcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7OztBQ3g0QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLE1BQVk7QUFDaEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBTzs7O0FBRy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLEtBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLEtBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLHFCQUFxQixFQUFFLGFBQWEsR0FBRyxVQUFVLE1BQU07QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDMVFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGtCQUFrQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLDZDQUE2QztBQUN4SDtBQUNBO0FBQ0EsZ0ZBQWdGLDZDQUE2QztBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLDZCQUE2QjtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNyR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsUUFBUSxtQkFBTyxDQUFDLE1BQVk7O0FBRTVCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOzs7Ozs7OztBQzdFQSxVQUFVLG1CQUFPLENBQUMsTUFBVztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxNQUFtQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9DQUFvQztBQUN4RCwwQkFBMEIsb0NBQW9DO0FBQzlELDBCQUEwQixvQ0FBb0M7QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FB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O0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUM1TUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsUUFBUSxtQkFBTyxDQUFDLE1BQVk7QUFDNUIsV0FBVyxtQkFBTyxDQUFDLE1BQVc7QUFDOUIsY0FBYyxtQkFBTyxDQUFDLE1BQW1CO0FBQ3pDLG9CQUFvQixtQkFBTyxDQUFDLE1BQXlCO0FBQ3JELGFBQWEsbUJBQU8sQ0FBQyxNQUFrQjtBQUN2QyxZQUFZLG1CQUFPLENBQUMsTUFBWTtBQUNoQyxVQUFVLG1CQUFPLENBQUMsTUFBVTs7QUFFNUIsVUFBVSxtQkFBTyxDQUFDLE1BQWM7QUFDaEMsZUFBZSxtQkFBTyxDQUFDLE1BQW1CO0FBQzFDLG1CQUFtQixtQkFBTyxDQUFDLE1BQW1CO0FBQzlDLFdBQVcsbUJBQU8sQ0FBQyxNQUFlO0FBQ2xDLGVBQWUsbUJBQU8sQ0FBQyxNQUFtQjtBQUMxQyxVQUFVLG1CQUFPLENBQUMsTUFBYzs7QUFFaEMscUJBQXFCLG1CQUFPLENBQUMsTUFBcUI7QUFDbEQ7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOzs7QUFHTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsY0FBYyxFQUFFO0FBQ2xHO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7OztBQUdBOzs7Ozs7Ozs7O0FDaGRBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFFBQVEsbUJBQU8sQ0FBQyxNQUFZO0FBQzVCLFdBQVcsbUJBQU8sQ0FBQyxNQUFXO0FBQzlCLGFBQWEsbUJBQU8sQ0FBQyxNQUFrQjtBQUN2QyxjQUFjLG1CQUFPLENBQUMsTUFBYTtBQUNuQyxjQUFjLG1CQUFPLENBQUMsTUFBcUI7QUFDM0MsV0FBVyxtQkFBTyxDQUFDLE1BQWtCO0FBQ3JDLFVBQVUsbUJBQU8sQ0FBQyxNQUFpQjtBQUNuQyxVQUFVLG1CQUFPLENBQUMsTUFBaUI7QUFDbkMsWUFBWSxtQkFBTyxDQUFDLE1BQW1CO0FBQ3ZDLDZDQUE2QyxtQkFBTyxDQUFDLE1BQW1CLElBQUksbUJBQU8sQ0FBQyxNQUFRO0FBQzVGLGFBQWEsbUJBQU8sQ0FBQyxNQUFVO0FBQy9CLFdBQVcsbUJBQU8sQ0FBQyxNQUFNO0FBQ3pCLFlBQVksbUJBQU8sQ0FBQyxNQUFZO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxNQUFtQjs7QUFFekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhLGVBQWUsaUJBQWlCLEVBQUU7QUFDL0MsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvREFBb0Q7QUFDeEYsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwRkFBMEY7QUFDMUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsK0NBQStDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQixFQUFFO0FBQ3BELDZCQUE2QixtQkFBbUIsRUFBRTs7QUFFbEQ7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7O0FDcmhCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFD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QkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFIYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7QUNWYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLDJCQUEyQixFQUFFO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxpQ0FBaUM7QUFDekYsK0RBQStELHdDQUF3QztBQUN2RztBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCwyREFBMkQsY0FBYyxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZEQUE2RDtBQUNqRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBTyxDQUFDLE1BQVE7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBLDBDQUEwQyxRQUFRLDRCQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDL0QsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxNQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxpQkFBaUI7QUFDN0UsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxpQkFBaUI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUJBQWlCO0FBQ2pFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwiZmlsZSI6InZlbmRvcn41NWY1YWY1Ni5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG4gICAgd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBSZXNvbHZlck1ldGhvZEhhbmRsZXIuanNcbiAqXG4gKiBAYXV0aG9yIFNhbXVlbCBGdXJ0ZXIgPHNhbXVlbEBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taUV2ZW50ID0gcmVxdWlyZSgnd2ViMy1jb3JlLXByb21pZXZlbnQnKTtcbnZhciBuYW1laGFzaCA9IHJlcXVpcmUoJ2V0aC1lbnMtbmFtZWhhc2gnKTtcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG4vKipcbiAqIEBwYXJhbSB7UmVnaXN0cnl9IHJlZ2lzdHJ5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUmVzb2x2ZXJNZXRob2RIYW5kbGVyKHJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGFuIHJlc29sdmVyIG1ldGhvZCBhbmQgcmV0dXJucyBhbiBldmVudGlmaWVkUHJvbWlzZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbnNOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZVxuICogQHBhcmFtIHthcnJheX0gbWV0aG9kQXJndW1lbnRzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuUmVzb2x2ZXJNZXRob2RIYW5kbGVyLnByb3RvdHlwZS5tZXRob2QgPSBmdW5jdGlvbiAoZW5zTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNhbGw6IHRoaXMuY2FsbC5iaW5kKHtcbiAgICAgICAgICAgIGVuc05hbWU6IGVuc05hbWUsXG4gICAgICAgICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgbWV0aG9kQXJndW1lbnRzOiBtZXRob2RBcmd1bWVudHMsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgICAgfSksXG4gICAgICAgIHNlbmQ6IHRoaXMuc2VuZC5iaW5kKHtcbiAgICAgICAgICAgIGVuc05hbWU6IGVuc05hbWUsXG4gICAgICAgICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgbWV0aG9kQXJndW1lbnRzOiBtZXRob2RBcmd1bWVudHMsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgICAgfSlcbiAgICB9O1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBjYWxsXG4gKlxuICogQHJldHVybnMge2V2ZW50aWZpZWRQcm9taXNlfVxuICovXG5SZXNvbHZlck1ldGhvZEhhbmRsZXIucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHByb21pRXZlbnQgPSBuZXcgUHJvbWlFdmVudCgpO1xuICAgIHZhciBwcmVwYXJlZEFyZ3VtZW50cyA9IHRoaXMucGFyZW50LnByZXBhcmVBcmd1bWVudHModGhpcy5lbnNOYW1lLCB0aGlzLm1ldGhvZEFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhcmVudC5yZWdpc3RyeS5yZXNvbHZlcih0aGlzLmVuc05hbWUpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmVyKSB7XG4gICAgICAgIHNlbGYucGFyZW50LmhhbmRsZUNhbGwocHJvbWlFdmVudCwgcmVzb2x2ZXIubWV0aG9kc1tzZWxmLm1ldGhvZE5hbWVdLCBwcmVwYXJlZEFyZ3VtZW50cywgY2FsbGJhY2spO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBwcm9taUV2ZW50LnJlamVjdChlcnJvcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlFdmVudC5ldmVudEVtaXR0ZXI7XG59O1xuXG5cbi8qKlxuICogRXhlY3V0ZXMgc2VuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZW5kT3B0aW9uc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtldmVudGlmaWVkUHJvbWlzZX1cbiAqL1xuUmVzb2x2ZXJNZXRob2RIYW5kbGVyLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHNlbmRPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcHJvbWlFdmVudCA9IG5ldyBQcm9taUV2ZW50KCk7XG4gICAgdmFyIHByZXBhcmVkQXJndW1lbnRzID0gdGhpcy5wYXJlbnQucHJlcGFyZUFyZ3VtZW50cyh0aGlzLmVuc05hbWUsIHRoaXMubWV0aG9kQXJndW1lbnRzKTtcblxuICAgIHRoaXMucGFyZW50LnJlZ2lzdHJ5LnJlc29sdmVyKHRoaXMuZW5zTmFtZSkudGhlbihmdW5jdGlvbiAocmVzb2x2ZXIpIHtcbiAgICAgICAgc2VsZi5wYXJlbnQuaGFuZGxlU2VuZChwcm9taUV2ZW50LCByZXNvbHZlci5tZXRob2RzW3NlbGYubWV0aG9kTmFtZV0sIHByZXBhcmVkQXJndW1lbnRzLCBzZW5kT3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBwcm9taUV2ZW50LnJlamVjdChlcnJvcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlFdmVudC5ldmVudEVtaXR0ZXI7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYSBjYWxsIG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7ZXZlbnRpZmllZFByb21pc2V9IHByb21pRXZlbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICogQHBhcmFtIHthcnJheX0gcHJlcGFyZWRBcmd1bWVudHNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cblJlc29sdmVyTWV0aG9kSGFuZGxlci5wcm90b3R5cGUuaGFuZGxlQ2FsbCA9IGZ1bmN0aW9uIChwcm9taUV2ZW50LCBtZXRob2QsIHByZXBhcmVkQXJndW1lbnRzLCBjYWxsYmFjaykge1xuICAgIG1ldGhvZC5hcHBseSh0aGlzLCBwcmVwYXJlZEFyZ3VtZW50cykuY2FsbCgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZWNlaXB0KSB7XG4gICAgICAgICAgICBwcm9taUV2ZW50LnJlc29sdmUocmVjZWlwdCk7XG5cbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVjZWlwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgcHJvbWlFdmVudC5yZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlFdmVudDtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBhIHNlbmQgbWV0aG9kXG4gKlxuICogQHBhcmFtIHtldmVudGlmaWVkUHJvbWlzZX0gcHJvbWlFdmVudFxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gKiBAcGFyYW0ge2FycmF5fSBwcmVwYXJlZEFyZ3VtZW50c1xuICogQHBhcmFtIHtPYmplY3R9IHNlbmRPcHRpb25zXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge2V2ZW50aWZpZWRQcm9taXNlfVxuICovXG5SZXNvbHZlck1ldGhvZEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZVNlbmQgPSBmdW5jdGlvbiAocHJvbWlFdmVudCwgbWV0aG9kLCBwcmVwYXJlZEFyZ3VtZW50cywgc2VuZE9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgbWV0aG9kLmFwcGx5KHRoaXMsIHByZXBhcmVkQXJndW1lbnRzKS5zZW5kKHNlbmRPcHRpb25zKVxuICAgICAgICAub24oJ3RyYW5zYWN0aW9uSGFzaCcsIGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgICAgICBwcm9taUV2ZW50LmV2ZW50RW1pdHRlci5lbWl0KCd0cmFuc2FjdGlvbkhhc2gnLCBoYXNoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjb25maXJtYXRpb24nLCBmdW5jdGlvbiAoY29uZmlybWF0aW9uTnVtYmVyLCByZWNlaXB0KSB7XG4gICAgICAgICAgICBwcm9taUV2ZW50LmV2ZW50RW1pdHRlci5lbWl0KCdjb25maXJtYXRpb24nLCBjb25maXJtYXRpb25OdW1iZXIsIHJlY2VpcHQpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCBmdW5jdGlvbiAocmVjZWlwdCkge1xuICAgICAgICAgICAgcHJvbWlFdmVudC5ldmVudEVtaXR0ZXIuZW1pdCgncmVjZWlwdCcsIHJlY2VpcHQpO1xuICAgICAgICAgICAgcHJvbWlFdmVudC5yZXNvbHZlKHJlY2VpcHQpO1xuXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlY2VpcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBwcm9taUV2ZW50LmV2ZW50RW1pdHRlci5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHByb21pRXZlbnQucmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pRXZlbnQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdGhlIEVOUyBub2RlIHRvIHRoZSBhcmd1bWVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHthcnJheX0gbWV0aG9kQXJndW1lbnRzXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKi9cblJlc29sdmVyTWV0aG9kSGFuZGxlci5wcm90b3R5cGUucHJlcGFyZUFyZ3VtZW50cyA9IGZ1bmN0aW9uIChuYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICB2YXIgbm9kZSA9IG5hbWVoYXNoLmhhc2gobmFtZSk7XG5cbiAgICBpZiAobWV0aG9kQXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbWV0aG9kQXJndW1lbnRzLnVuc2hpZnQobm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIG1ldGhvZEFyZ3VtZW50cztcbiAgICB9XG5cbiAgICByZXR1cm4gW25vZGVdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvbHZlck1ldGhvZEhhbmRsZXI7XG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBjb250cmFjdC5qc1xuICpcbiAqIFRvIGluaXRpYWxpemUgYSBjb250cmFjdCB1c2U6XG4gKlxuICogIHZhciBDb250cmFjdCA9IHJlcXVpcmUoJ3dlYjMtZXRoLWNvbnRyYWN0Jyk7XG4gKiAgQ29udHJhY3Quc2V0UHJvdmlkZXIoJ3dzOi8vbG9jYWxob3N0Ojg1NDYnKTtcbiAqICB2YXIgY29udHJhY3QgPSBuZXcgQ29udHJhY3QoYWJpLCBhZGRyZXNzLCAuLi4pO1xuICpcbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGNvcmUgPSByZXF1aXJlKCd3ZWIzLWNvcmUnKTtcbnZhciBNZXRob2QgPSByZXF1aXJlKCd3ZWIzLWNvcmUtbWV0aG9kJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCd3ZWIzLXV0aWxzJyk7XG52YXIgU3Vic2NyaXB0aW9uID0gcmVxdWlyZSgnd2ViMy1jb3JlLXN1YnNjcmlwdGlvbnMnKS5zdWJzY3JpcHRpb247XG52YXIgZm9ybWF0dGVycyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1oZWxwZXJzJykuZm9ybWF0dGVycztcbnZhciBlcnJvcnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtaGVscGVycycpLmVycm9ycztcbnZhciBwcm9taUV2ZW50ID0gcmVxdWlyZSgnd2ViMy1jb3JlLXByb21pZXZlbnQnKTtcbnZhciBhYmkgPSByZXF1aXJlKCd3ZWIzLWV0aC1hYmknKTtcblxuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gY3JlYXRlIG5ldyBjb250cmFjdCBpbnN0YW5jZVxuICpcbiAqIEBtZXRob2QgQ29udHJhY3RcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0ganNvbkludGVyZmFjZVxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbnZhciBDb250cmFjdCA9IGZ1bmN0aW9uIENvbnRyYWN0KGpzb25JbnRlcmZhY2UsIGFkZHJlc3MsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgIGlmKCEodGhpcyBpbnN0YW5jZW9mIENvbnRyYWN0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2UgdGhlIFwibmV3XCIga2V5d29yZCB0byBpbnN0YW50aWF0ZSBhIHdlYjMuZXRoLmNvbnRyYWN0KCkgb2JqZWN0IScpO1xuICAgIH1cblxuICAgIC8vIHNldHMgX3JlcXVlc3RtYW5hZ2VyXG4gICAgY29yZS5wYWNrYWdlSW5pdCh0aGlzLCBbdGhpcy5jb25zdHJ1Y3Rvci5jdXJyZW50UHJvdmlkZXJdKTtcblxuICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb25zID0gdGhpcy5fcmVxdWVzdE1hbmFnZXIuY2xlYXJTdWJzY3JpcHRpb25zO1xuXG5cblxuICAgIGlmKCFqc29uSW50ZXJmYWNlIHx8ICEoQXJyYXkuaXNBcnJheShqc29uSW50ZXJmYWNlKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIHRoZSBqc29uIGludGVyZmFjZSBvZiB0aGUgY29udHJhY3Qgd2hlbiBpbnN0YW50aWF0aW5nIGEgY29udHJhY3Qgb2JqZWN0LicpO1xuICAgIH1cblxuXG5cbiAgICAvLyBjcmVhdGUgdGhlIG9wdGlvbnMgb2JqZWN0XG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB2YXIgbGFzdEFyZyA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBpZihfLmlzT2JqZWN0KGxhc3RBcmcpICYmICFfLmlzQXJyYXkobGFzdEFyZykpIHtcbiAgICAgICAgb3B0aW9ucyA9IGxhc3RBcmc7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5leHRlbmQodGhpcy5vcHRpb25zLCB0aGlzLl9nZXRPclNldERlZmF1bHRPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgaWYoXy5pc09iamVjdChhZGRyZXNzKSkge1xuICAgICAgICAgICAgYWRkcmVzcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgYWRkcmVzc1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLm9wdGlvbnMsICdhZGRyZXNzJywge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FkZHJlc3MgPSB1dGlscy50b0NoZWNrc3VtQWRkcmVzcyhmb3JtYXR0ZXJzLmlucHV0QWRkcmVzc0Zvcm1hdHRlcih2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX2FkZHJlc3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIGFkZCBtZXRob2QgYW5kIGV2ZW50IHNpZ25hdHVyZXMsIHdoZW4gdGhlIGpzb25JbnRlcmZhY2UgZ2V0cyBzZXRcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5vcHRpb25zLCAnanNvbkludGVyZmFjZScsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICBfdGhpcy5tZXRob2RzID0ge307XG4gICAgICAgICAgICBfdGhpcy5ldmVudHMgPSB7fTtcblxuICAgICAgICAgICAgX3RoaXMuX2pzb25JbnRlcmZhY2UgPSB2YWx1ZS5tYXAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lO1xuXG4gICAgICAgICAgICAgICAgLy8gbWFrZSBjb25zdGFudCBhbmQgcGF5YWJsZSBiYWNrd2FyZHMgY29tcGF0aWJsZVxuICAgICAgICAgICAgICAgIG1ldGhvZC5jb25zdGFudCA9IChtZXRob2Quc3RhdGVNdXRhYmlsaXR5ID09PSBcInZpZXdcIiB8fCBtZXRob2Quc3RhdGVNdXRhYmlsaXR5ID09PSBcInB1cmVcIiB8fCBtZXRob2QuY29uc3RhbnQpO1xuICAgICAgICAgICAgICAgIG1ldGhvZC5wYXlhYmxlID0gKG1ldGhvZC5zdGF0ZU11dGFiaWxpdHkgPT09IFwicGF5YWJsZVwiIHx8IG1ldGhvZC5wYXlhYmxlKTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gdXRpbHMuX2pzb25JbnRlcmZhY2VNZXRob2RUb1N0cmluZyhtZXRob2QpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLnNpZ25hdHVyZSA9IGFiaS5lbmNvZGVGdW5jdGlvblNpZ25hdHVyZShmdW5jTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMgPSBfdGhpcy5fY3JlYXRlVHhPYmplY3QuYmluZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogX3RoaXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbWV0aG9kIG9ubHkgaWYgbm90IG9uZSBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpZighX3RoaXMubWV0aG9kc1ttZXRob2QubmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1ldGhvZHNbbWV0aG9kLm5hbWVdID0gZnVuYztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXNjYWRlRnVuYyA9IF90aGlzLl9jcmVhdGVUeE9iamVjdC5iaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IF90aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRNZXRob2Q6IF90aGlzLm1ldGhvZHNbbWV0aG9kLm5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1ldGhvZHNbbWV0aG9kLm5hbWVdID0gY2FzY2FkZUZ1bmM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZpbml0ZWx5IGFkZCB0aGUgbWV0aG9kIGJhc2VkIG9uIGl0cyBzaWduYXR1cmVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWV0aG9kc1ttZXRob2Quc2lnbmF0dXJlXSA9IGZ1bmM7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG1ldGhvZCBieSBuYW1lXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1ldGhvZHNbZnVuY05hbWVdID0gZnVuYztcblxuXG4gICAgICAgICAgICAgICAgLy8gZXZlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZC50eXBlID09PSAnZXZlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5zaWduYXR1cmUgPSBhYmkuZW5jb2RlRXZlbnRTaWduYXR1cmUoZnVuY05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBfdGhpcy5fb24uYmluZChfdGhpcywgbWV0aG9kLnNpZ25hdHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG1ldGhvZCBvbmx5IGlmIG5vdCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpZighX3RoaXMuZXZlbnRzW21ldGhvZC5uYW1lXSB8fCBfdGhpcy5ldmVudHNbbWV0aG9kLm5hbWVdLm5hbWUgPT09ICdib3VuZCAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRzW21ldGhvZC5uYW1lXSA9IGV2ZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmluaXRlbHkgYWRkIHRoZSBtZXRob2QgYmFzZWQgb24gaXRzIHNpZ25hdHVyZVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ldmVudHNbbWV0aG9kLnNpZ25hdHVyZV0gPSBldmVudDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgZXZlbnQgYnkgbmFtZVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ldmVudHNbZnVuY05hbWVdID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGxFdmVudHNcbiAgICAgICAgICAgIF90aGlzLmV2ZW50cy5hbGxFdmVudHMgPSBfdGhpcy5fb24uYmluZChfdGhpcywgJ2FsbGV2ZW50cycpO1xuXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX2pzb25JbnRlcmZhY2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fanNvbkludGVyZmFjZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gZ2V0IGRlZmF1bHQgYWNjb3VudCBmcm9tIHRoZSBDbGFzc1xuICAgIHZhciBkZWZhdWx0QWNjb3VudCA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdEFjY291bnQ7XG4gICAgdmFyIGRlZmF1bHRCbG9jayA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdEJsb2NrIHx8ICdsYXRlc3QnO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0QWNjb3VudCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEFjY291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYodmFsKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjY291bnQgPSB1dGlscy50b0NoZWNrc3VtQWRkcmVzcyhmb3JtYXR0ZXJzLmlucHV0QWRkcmVzc0Zvcm1hdHRlcih2YWwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdEJsb2NrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QmxvY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgZGVmYXVsdEJsb2NrID0gdmFsO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wZXJ0aWVzXG4gICAgdGhpcy5tZXRob2RzID0ge307XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcblxuICAgIHRoaXMuX2FkZHJlc3MgPSBudWxsO1xuICAgIHRoaXMuX2pzb25JbnRlcmZhY2UgPSBbXTtcblxuICAgIC8vIHNldCBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXNcbiAgICB0aGlzLm9wdGlvbnMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgdGhpcy5vcHRpb25zLmpzb25JbnRlcmZhY2UgPSBqc29uSW50ZXJmYWNlO1xuXG59O1xuXG5Db250cmFjdC5zZXRQcm92aWRlciA9IGZ1bmN0aW9uKHByb3ZpZGVyLCBhY2NvdW50cykge1xuICAgIC8vIENvbnRyYWN0LmN1cnJlbnRQcm92aWRlciA9IHByb3ZpZGVyO1xuICAgIGNvcmUucGFja2FnZUluaXQodGhpcywgW3Byb3ZpZGVyXSk7XG5cbiAgICB0aGlzLl9ldGhBY2NvdW50cyA9IGFjY291bnRzO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsbGJhY2sgYW5kIG1vZGl1ZnkgdGhlIGFycmF5IGlmIG5lY2Vzc2FyeVxuICpcbiAqIEBtZXRob2QgX2dldENhbGxiYWNrXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5fZ2V0Q2FsbGJhY2sgPSBmdW5jdGlvbiBnZXRDYWxsYmFjayhhcmdzKSB7XG4gICAgaWYgKGFyZ3MgJiYgXy5pc0Z1bmN0aW9uKGFyZ3NbYXJncy5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3MucG9wKCk7IC8vIG1vZGlmeSB0aGUgYXJncyBhcnJheSFcbiAgICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyB0aGF0IG5vIGxpc3RlbmVyIHdpdGggbmFtZSBcIm5ld0xpc3RlbmVyXCIgb3IgXCJyZW1vdmVMaXN0ZW5lclwiIGlzIGFkZGVkLlxuICpcbiAqIEBtZXRob2QgX2NoZWNrTGlzdGVuZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGNvbnRyYWN0IGluc3RhbmNlXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5fY2hlY2tMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KXtcbiAgICBpZihldmVudCA9PT0gdHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBldmVudCBcIicrIHR5cGUgKydcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUsIHlvdSBjYW5cXCd0IHVzZSBpdC4nKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogVXNlIGRlZmF1bHQgdmFsdWVzLCBpZiBvcHRpb25zIGFyZSBub3QgYXZhaWxhYmxlXG4gKlxuICogQG1ldGhvZCBfZ2V0T3JTZXREZWZhdWx0T3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdGhlIG9wdGlvbnMgZ2l2ZWQgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIG9wdGlvbnMgd2l0aCBnYXBzIGZpbGxlZCBieSBkZWZhdWx0c1xuICovXG5Db250cmFjdC5wcm90b3R5cGUuX2dldE9yU2V0RGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPclNldERlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB2YXIgZ2FzUHJpY2UgPSBvcHRpb25zLmdhc1ByaWNlID8gU3RyaW5nKG9wdGlvbnMuZ2FzUHJpY2UpOiBudWxsO1xuICAgIHZhciBmcm9tID0gb3B0aW9ucy5mcm9tID8gdXRpbHMudG9DaGVja3N1bUFkZHJlc3MoZm9ybWF0dGVycy5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIob3B0aW9ucy5mcm9tKSkgOiBudWxsO1xuXG4gICAgb3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHRoaXMub3B0aW9ucy5kYXRhO1xuXG4gICAgb3B0aW9ucy5mcm9tID0gZnJvbSB8fCB0aGlzLm9wdGlvbnMuZnJvbTtcbiAgICBvcHRpb25zLmdhc1ByaWNlID0gZ2FzUHJpY2UgfHwgdGhpcy5vcHRpb25zLmdhc1ByaWNlO1xuICAgIG9wdGlvbnMuZ2FzID0gb3B0aW9ucy5nYXMgfHwgb3B0aW9ucy5nYXNMaW1pdCB8fCB0aGlzLm9wdGlvbnMuZ2FzO1xuXG4gICAgLy8gVE9ETyByZXBsYWNlIHdpdGggb25seSBnYXNMaW1pdD9cbiAgICBkZWxldGUgb3B0aW9ucy5nYXNMaW1pdDtcblxuICAgIHJldHVybiBvcHRpb25zO1xufTtcblxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIGVuY29kZSBpbmRleGVkIHBhcmFtcyBhbmQgb3B0aW9ucyB0byBvbmUgZmluYWwgb2JqZWN0XG4gKlxuICogQG1ldGhvZCBfZW5jb2RlRXZlbnRBQklcbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gZXZlcnl0aGluZyBjb21iaW5lZCB0b2dldGhlciBhbmQgZW5jb2RlZFxuICovXG5Db250cmFjdC5wcm90b3R5cGUuX2VuY29kZUV2ZW50QUJJID0gZnVuY3Rpb24gKGV2ZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyIHx8IHt9LFxuICAgICAgICByZXN1bHQgPSB7fTtcblxuICAgIFsnZnJvbUJsb2NrJywgJ3RvQmxvY2snXS5maWx0ZXIoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNbZl0gIT09IHVuZGVmaW5lZDtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJlc3VsdFtmXSA9IGZvcm1hdHRlcnMuaW5wdXRCbG9ja051bWJlckZvcm1hdHRlcihvcHRpb25zW2ZdKTtcbiAgICB9KTtcblxuICAgIC8vIHVzZSBnaXZlbiB0b3BpY3NcbiAgICBpZihfLmlzQXJyYXkob3B0aW9ucy50b3BpY3MpKSB7XG4gICAgICAgIHJlc3VsdC50b3BpY3MgPSBvcHRpb25zLnRvcGljcztcblxuICAgIC8vIGNyZWF0ZSB0b3BpY3MgYmFzZWQgb24gZmlsdGVyXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXN1bHQudG9waWNzID0gW107XG5cbiAgICAgICAgLy8gYWRkIGV2ZW50IHNpZ25hdHVyZVxuICAgICAgICBpZiAoZXZlbnQgJiYgIWV2ZW50LmFub255bW91cyAmJiBldmVudC5uYW1lICE9PSAnQUxMRVZFTlRTJykge1xuICAgICAgICAgICAgcmVzdWx0LnRvcGljcy5wdXNoKGV2ZW50LnNpZ25hdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgZXZlbnQgdG9waWNzIChpbmRleGVkIGFyZ3VtZW50cylcbiAgICAgICAgaWYgKGV2ZW50Lm5hbWUgIT09ICdBTExFVkVOVFMnKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXhlZFRvcGljcyA9IGV2ZW50LmlucHV0cy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaS5pbmRleGVkID09PSB0cnVlO1xuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZmlsdGVyW2kubmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vZXRoZXJldW0vd2ViMy5qcy9pc3N1ZXMvMzQ0XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZGVhbCBwcm9wZXJseSB3aXRoIGNvbXBvbmVudHNcblxuICAgICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhYmkuZW5jb2RlUGFyYW1ldGVyKGkudHlwZSwgdik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWJpLmVuY29kZVBhcmFtZXRlcihpLnR5cGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXN1bHQudG9waWNzID0gcmVzdWx0LnRvcGljcy5jb25jYXQoaW5kZXhlZFRvcGljcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcmVzdWx0LnRvcGljcy5sZW5ndGgpXG4gICAgICAgICAgICBkZWxldGUgcmVzdWx0LnRvcGljcztcbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuYWRkcmVzcykge1xuICAgICAgICByZXN1bHQuYWRkcmVzcyA9IHRoaXMub3B0aW9ucy5hZGRyZXNzLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gZGVjb2RlIGluZGV4ZWQgcGFyYW1zIGFuZCBvcHRpb25zXG4gKlxuICogQG1ldGhvZCBfZGVjb2RlRXZlbnRBQklcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlc3VsdCBvYmplY3Qgd2l0aCBkZWNvZGVkIGluZGV4ZWQgJiYgbm90IGluZGV4ZWQgcGFyYW1zXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5fZGVjb2RlRXZlbnRBQkkgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBldmVudCA9IHRoaXM7XG5cbiAgICBkYXRhLmRhdGEgPSBkYXRhLmRhdGEgfHwgJyc7XG4gICAgZGF0YS50b3BpY3MgPSBkYXRhLnRvcGljcyB8fCBbXTtcbiAgICB2YXIgcmVzdWx0ID0gZm9ybWF0dGVycy5vdXRwdXRMb2dGb3JtYXR0ZXIoZGF0YSk7XG5cbiAgICAvLyBpZiBhbGxFdmVudHMgZ2V0IHRoZSByaWdodCBldmVudFxuICAgIGlmKGV2ZW50Lm5hbWUgPT09ICdBTExFVkVOVFMnKSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQuanNvbkludGVyZmFjZS5maW5kKGZ1bmN0aW9uIChpbnRmKSB7XG4gICAgICAgICAgICByZXR1cm4gKGludGYuc2lnbmF0dXJlID09PSBkYXRhLnRvcGljc1swXSk7XG4gICAgICAgIH0pIHx8IHthbm9ueW1vdXM6IHRydWV9O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBlbXB0eSBpbnB1dHMgaWYgbm9uZSBhcmUgcHJlc2VudCAoZS5nLiBhbm9ueW1vdXMgZXZlbnRzIG9uIGFsbEV2ZW50cylcbiAgICBldmVudC5pbnB1dHMgPSBldmVudC5pbnB1dHMgfHwgW107XG5cblxuICAgIHZhciBhcmdUb3BpY3MgPSBldmVudC5hbm9ueW1vdXMgPyBkYXRhLnRvcGljcyA6IGRhdGEudG9waWNzLnNsaWNlKDEpO1xuXG4gICAgcmVzdWx0LnJldHVyblZhbHVlcyA9IGFiaS5kZWNvZGVMb2coZXZlbnQuaW5wdXRzLCBkYXRhLmRhdGEsIGFyZ1RvcGljcyk7XG4gICAgZGVsZXRlIHJlc3VsdC5yZXR1cm5WYWx1ZXMuX19sZW5ndGhfXztcblxuICAgIC8vIGFkZCBuYW1lXG4gICAgcmVzdWx0LmV2ZW50ID0gZXZlbnQubmFtZTtcblxuICAgIC8vIGFkZCBzaWduYXR1cmVcbiAgICByZXN1bHQuc2lnbmF0dXJlID0gKGV2ZW50LmFub255bW91cyB8fCAhZGF0YS50b3BpY3NbMF0pID8gbnVsbCA6IGRhdGEudG9waWNzWzBdO1xuXG4gICAgLy8gbW92ZSB0aGUgZGF0YSBhbmQgdG9waWNzIHRvIFwicmF3XCJcbiAgICByZXN1bHQucmF3ID0ge1xuICAgICAgICBkYXRhOiByZXN1bHQuZGF0YSxcbiAgICAgICAgdG9waWNzOiByZXN1bHQudG9waWNzXG4gICAgfTtcbiAgICBkZWxldGUgcmVzdWx0LmRhdGE7XG4gICAgZGVsZXRlIHJlc3VsdC50b3BpY3M7XG5cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEVuY29kZXMgYW4gQUJJIGZvciBhIG1ldGhvZCwgaW5jbHVkaW5nIHNpZ25hdHVyZSBvciB0aGUgbWV0aG9kLlxuICogT3Igd2hlbiBjb25zdHJ1Y3RvciBlbmNvZGVzIG9ubHkgdGhlIGNvbnN0cnVjdG9yIHBhcmFtZXRlcnMuXG4gKlxuICogQG1ldGhvZCBfZW5jb2RlTWV0aG9kQUJJXG4gKiBAcGFyYW0ge01peGVkfSBhcmdzIHRoZSBhcmd1bWVudHMgdG8gZW5jb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlIGVuY29kZWQgQUJJXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5fZW5jb2RlTWV0aG9kQUJJID0gZnVuY3Rpb24gX2VuY29kZU1ldGhvZEFCSSgpIHtcbiAgICB2YXIgbWV0aG9kU2lnbmF0dXJlID0gdGhpcy5fbWV0aG9kLnNpZ25hdHVyZSxcbiAgICAgICAgYXJncyA9IHRoaXMuYXJndW1lbnRzIHx8IFtdO1xuXG4gICAgdmFyIHNpZ25hdHVyZSA9IGZhbHNlLFxuICAgICAgICBwYXJhbXNBQkkgPSB0aGlzLl9wYXJlbnQub3B0aW9ucy5qc29uSW50ZXJmYWNlLmZpbHRlcihmdW5jdGlvbiAoanNvbikge1xuICAgICAgICAgICAgcmV0dXJuICgobWV0aG9kU2lnbmF0dXJlID09PSAnY29uc3RydWN0b3InICYmIGpzb24udHlwZSA9PT0gbWV0aG9kU2lnbmF0dXJlKSB8fFxuICAgICAgICAgICAgICAgICgoanNvbi5zaWduYXR1cmUgPT09IG1ldGhvZFNpZ25hdHVyZSB8fCBqc29uLnNpZ25hdHVyZSA9PT0gbWV0aG9kU2lnbmF0dXJlLnJlcGxhY2UoJzB4JywnJykgfHwganNvbi5uYW1lID09PSBtZXRob2RTaWduYXR1cmUpICYmIGpzb24udHlwZSA9PT0gJ2Z1bmN0aW9uJykpO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgICAgIHZhciBpbnB1dExlbmd0aCA9IChfLmlzQXJyYXkoanNvbi5pbnB1dHMpKSA/IGpzb24uaW5wdXRzLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dExlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBudW1iZXIgb2YgYXJndW1lbnRzIGlzIG5vdCBtYXRjaGluZyB0aGUgbWV0aG9kcyByZXF1aXJlZCBudW1iZXIuIFlvdSBuZWVkIHRvIHBhc3MgJysgaW5wdXRMZW5ndGggKycgYXJndW1lbnRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoanNvbi50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlID0ganNvbi5zaWduYXR1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXy5pc0FycmF5KGpzb24uaW5wdXRzKSA/IGpzb24uaW5wdXRzIDogW107XG4gICAgICAgIH0pLm1hcChmdW5jdGlvbiAoaW5wdXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gYWJpLmVuY29kZVBhcmFtZXRlcnMoaW5wdXRzLCBhcmdzKS5yZXBsYWNlKCcweCcsJycpO1xuICAgICAgICB9KVswXSB8fCAnJztcblxuICAgIC8vIHJldHVybiBjb25zdHJ1Y3RvclxuICAgIGlmKG1ldGhvZFNpZ25hdHVyZSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICBpZighdGhpcy5fZGVwbG95RGF0YSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbnRyYWN0IGhhcyBubyBjb250cmFjdCBkYXRhIG9wdGlvbiBzZXQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGFwcGVuZCB0aGUgY29uc3RydWN0b3IgcGFyYW1ldGVycy4nKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZGVwbG95RGF0YSArIHBhcmFtc0FCSTtcblxuICAgIC8vIHJldHVybiBtZXRob2RcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IChzaWduYXR1cmUpID8gc2lnbmF0dXJlICsgcGFyYW1zQUJJIDogcGFyYW1zQUJJO1xuXG4gICAgICAgIGlmKCFyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZG5cXCd0IGZpbmQgYSBtYXRjaGluZyBjb250cmFjdCBtZXRob2QgbmFtZWQgXCInKyB0aGlzLl9tZXRob2QubmFtZSArJ1wiLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICogRGVjb2RlIG1ldGhvZCByZXR1cm4gdmFsdWVzXG4gKlxuICogQG1ldGhvZCBfZGVjb2RlTWV0aG9kUmV0dXJuXG4gKiBAcGFyYW0ge0FycmF5fSBvdXRwdXRzXG4gKiBAcGFyYW0ge1N0cmluZ30gcmV0dXJuVmFsdWVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZWQgb3V0cHV0IHJldHVybiB2YWx1ZXNcbiAqL1xuQ29udHJhY3QucHJvdG90eXBlLl9kZWNvZGVNZXRob2RSZXR1cm4gPSBmdW5jdGlvbiAob3V0cHV0cywgcmV0dXJuVmFsdWVzKSB7XG4gICAgaWYgKCFyZXR1cm5WYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuVmFsdWVzID0gcmV0dXJuVmFsdWVzLmxlbmd0aCA+PSAyID8gcmV0dXJuVmFsdWVzLnNsaWNlKDIpIDogcmV0dXJuVmFsdWVzO1xuICAgIHZhciByZXN1bHQgPSBhYmkuZGVjb2RlUGFyYW1ldGVycyhvdXRwdXRzLCByZXR1cm5WYWx1ZXMpO1xuXG4gICAgaWYgKHJlc3VsdC5fX2xlbmd0aF9fID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5fX2xlbmd0aF9fO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBEZXBsb3lzIGEgY29udHJhY3QgYW5kIGZpcmUgZXZlbnRzIGJhc2VkIG9uIGl0cyBzdGF0ZTogdHJhbnNhY3Rpb25IYXNoLCByZWNlaXB0XG4gKlxuICogQWxsIGV2ZW50IGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQsIG9uY2UgdGhlIGxhc3QgcG9zc2libGUgZXZlbnQgaXMgZmlyZWQgKFwiZXJyb3JcIiwgb3IgXCJyZWNlaXB0XCIpXG4gKlxuICogQG1ldGhvZCBkZXBsb3lcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fSBFdmVudEVtaXR0ZXIgcG9zc2libGUgZXZlbnRzIGFyZSBcImVycm9yXCIsIFwidHJhbnNhY3Rpb25IYXNoXCIgYW5kIFwicmVjZWlwdFwiXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjayl7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIG9wdGlvbnMuYXJndW1lbnRzID0gb3B0aW9ucy5hcmd1bWVudHMgfHwgW107XG4gICAgb3B0aW9ucyA9IHRoaXMuX2dldE9yU2V0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cblxuICAgIC8vIHJldHVybiBlcnJvciwgaWYgbm8gXCJkYXRhXCIgaXMgc3BlY2lmaWVkXG4gICAgaWYoIW9wdGlvbnMuZGF0YSkge1xuICAgICAgICByZXR1cm4gdXRpbHMuX2ZpcmVFcnJvcihuZXcgRXJyb3IoJ05vIFwiZGF0YVwiIHNwZWNpZmllZCBpbiBuZWl0aGVyIHRoZSBnaXZlbiBvcHRpb25zLCBub3IgdGhlIGRlZmF1bHQgb3B0aW9ucy4nKSwgbnVsbCwgbnVsbCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHZhciBjb25zdHJ1Y3RvciA9IF8uZmluZCh0aGlzLm9wdGlvbnMuanNvbkludGVyZmFjZSwgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gKG1ldGhvZC50eXBlID09PSAnY29uc3RydWN0b3InKTtcbiAgICB9KSB8fCB7fTtcbiAgICBjb25zdHJ1Y3Rvci5zaWduYXR1cmUgPSAnY29uc3RydWN0b3InO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVR4T2JqZWN0LmFwcGx5KHtcbiAgICAgICAgbWV0aG9kOiBjb25zdHJ1Y3RvcixcbiAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgICBkZXBsb3lEYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgIF9ldGhBY2NvdW50czogdGhpcy5jb25zdHJ1Y3Rvci5fZXRoQWNjb3VudHNcbiAgICB9LCBvcHRpb25zLmFyZ3VtZW50cyk7XG5cbn07XG5cbi8qKlxuICogR2V0cyB0aGUgZXZlbnQgc2lnbmF0dXJlIGFuZCBvdXRwdXRmb3JtYXR0ZXJzXG4gKlxuICogQG1ldGhvZCBfZ2VuZXJhdGVFdmVudE9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBldmVudCBvcHRpb25zIG9iamVjdFxuICovXG5Db250cmFjdC5wcm90b3R5cGUuX2dlbmVyYXRlRXZlbnRPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjYWxsYmFja1xuICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2dldENhbGxiYWNrKGFyZ3MpO1xuXG4gICAgLy8gZ2V0IHRoZSBvcHRpb25zXG4gICAgdmFyIG9wdGlvbnMgPSAoXy5pc09iamVjdChhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pKSA/IGFyZ3MucG9wKCkgOiB7fTtcblxuICAgIHZhciBldmVudCA9IChfLmlzU3RyaW5nKGFyZ3NbMF0pKSA/IGFyZ3NbMF0gOiAnYWxsZXZlbnRzJztcbiAgICBldmVudCA9IChldmVudC50b0xvd2VyQ2FzZSgpID09PSAnYWxsZXZlbnRzJykgPyB7XG4gICAgICAgICAgICBuYW1lOiAnQUxMRVZFTlRTJyxcbiAgICAgICAgICAgIGpzb25JbnRlcmZhY2U6IHRoaXMub3B0aW9ucy5qc29uSW50ZXJmYWNlXG4gICAgICAgIH0gOiB0aGlzLm9wdGlvbnMuanNvbkludGVyZmFjZS5maW5kKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gKGpzb24udHlwZSA9PT0gJ2V2ZW50JyAmJiAoanNvbi5uYW1lID09PSBldmVudCB8fCBqc29uLnNpZ25hdHVyZSA9PT0gJzB4JysgZXZlbnQucmVwbGFjZSgnMHgnLCcnKSkpO1xuICAgICAgICB9KTtcblxuICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCBcIicgKyBldmVudC5uYW1lICsgJ1wiIGRvZXNuXFwndCBleGlzdCBpbiB0aGlzIGNvbnRyYWN0LicpO1xuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNBZGRyZXNzKHRoaXMub3B0aW9ucy5hZGRyZXNzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgY29udHJhY3Qgb2JqZWN0IGRvZXNuXFwndCBoYXZlIGFkZHJlc3Mgc2V0IHlldCwgcGxlYXNlIHNldCBhbiBhZGRyZXNzIGZpcnN0LicpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcmFtczogdGhpcy5fZW5jb2RlRXZlbnRBQkkoZXZlbnQsIG9wdGlvbnMpLFxuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH07XG59O1xuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIGFuZCBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uLCBhbmQgcmVtb3ZlIGl0IG9uY2UgaXRzIGZpcmVkLlxuICpcbiAqIEBtZXRob2QgY2xvbmVcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGV2ZW50IHN1YnNjcmlwdGlvblxuICovXG5Db250cmFjdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5vcHRpb25zLmpzb25JbnRlcmZhY2UsIHRoaXMub3B0aW9ucy5hZGRyZXNzLCB0aGlzLm9wdGlvbnMpO1xufTtcblxuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIGFuZCBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uLCBhbmQgcmVtb3ZlIGl0IG9uY2UgaXRzIGZpcmVkLlxuICpcbiAqIEBtZXRob2Qgb25jZVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGV2ZW50IHN1YnNjcmlwdGlvblxuICovXG5Db250cmFjdC5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgIC8vIGdldCB0aGUgY2FsbGJhY2tcbiAgICBjYWxsYmFjayA9IHRoaXMuX2dldENhbGxiYWNrKGFyZ3MpO1xuXG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09uY2UgcmVxdWlyZXMgYSBjYWxsYmFjayBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlci4nKTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBhbGxvdyBmcm9tQmxvY2tcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMuZnJvbUJsb2NrO1xuXG4gICAgLy8gZG9uJ3QgcmV0dXJuIGFzIG9uY2Ugc2hvdWxkbid0IHByb3ZpZGUgXCJvblwiXG4gICAgdGhpcy5fb24oZXZlbnQsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIHJlcywgc3ViKSB7XG4gICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICBpZihfLmlzRnVuY3Rpb24oY2FsbGJhY2spKXtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzLCBzdWIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVycyBhbmQgY3JlYXRlcyBhIHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBAbWV0aG9kIF9vblxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGV2ZW50IHN1YnNjcmlwdGlvblxuICovXG5Db250cmFjdC5wcm90b3R5cGUuX29uID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgc3ViT3B0aW9ucyA9IHRoaXMuX2dlbmVyYXRlRXZlbnRPcHRpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblxuICAgIC8vIHByZXZlbnQgdGhlIGV2ZW50IFwibmV3TGlzdGVuZXJcIiBhbmQgXCJyZW1vdmVMaXN0ZW5lclwiIGZyb20gYmVpbmcgb3ZlcndyaXR0ZW5cbiAgICB0aGlzLl9jaGVja0xpc3RlbmVyKCduZXdMaXN0ZW5lcicsIHN1Yk9wdGlvbnMuZXZlbnQubmFtZSwgc3ViT3B0aW9ucy5jYWxsYmFjayk7XG4gICAgdGhpcy5fY2hlY2tMaXN0ZW5lcigncmVtb3ZlTGlzdGVuZXInLCBzdWJPcHRpb25zLmV2ZW50Lm5hbWUsIHN1Yk9wdGlvbnMuY2FsbGJhY2spO1xuXG4gICAgLy8gVE9ETyBjaGVjayBpZiBsaXN0ZW5lciBhbHJlYWR5IGV4aXN0cz8gYW5kIHJldXNlIHN1YnNjcmlwdGlvbiBpZiBvcHRpb25zIGFyZSB0aGUgc2FtZS5cblxuICAgIC8vIGNyZWF0ZSBuZXcgc3Vic2NyaXB0aW9uXG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oe1xuICAgICAgICBzdWJzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHBhcmFtczogMSxcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dExvZ0Zvcm1hdHRlcl0sXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IHRoaXMuX2RlY29kZUV2ZW50QUJJLmJpbmQoc3ViT3B0aW9ucy5ldmVudCksXG4gICAgICAgICAgICAvLyBEVUJMSUNBVEUsIGFsc28gaW4gd2ViMy1ldGhcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbkhhbmRsZXI6IGZ1bmN0aW9uIChvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBpZihvdXRwdXQucmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZWQnLCBvdXRwdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIG91dHB1dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKG51bGwsIG91dHB1dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0eXBlOiAnZXRoJyxcbiAgICAgICAgcmVxdWVzdE1hbmFnZXI6IHRoaXMuX3JlcXVlc3RNYW5hZ2VyXG4gICAgfSk7XG4gICAgc3Vic2NyaXB0aW9uLnN1YnNjcmliZSgnbG9ncycsIHN1Yk9wdGlvbnMucGFyYW1zLCBzdWJPcHRpb25zLmNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9KTtcblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG59O1xuXG4vKipcbiAqIEdldCBwYXN0IGV2ZW50cyBmcm9tIGNvbnRyYWN0c1xuICpcbiAqIEBtZXRob2QgZ2V0UGFzdEV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIHByb21pZXZlbnRcbiAqL1xuQ29udHJhY3QucHJvdG90eXBlLmdldFBhc3RFdmVudHMgPSBmdW5jdGlvbigpe1xuICAgIHZhciBzdWJPcHRpb25zID0gdGhpcy5fZ2VuZXJhdGVFdmVudE9wdGlvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBnZXRQYXN0TG9ncyA9IG5ldyBNZXRob2Qoe1xuICAgICAgICBuYW1lOiAnZ2V0UGFzdExvZ3MnLFxuICAgICAgICBjYWxsOiAnZXRoX2dldExvZ3MnLFxuICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dExvZ0Zvcm1hdHRlcl0sXG4gICAgICAgIG91dHB1dEZvcm1hdHRlcjogdGhpcy5fZGVjb2RlRXZlbnRBQkkuYmluZChzdWJPcHRpb25zLmV2ZW50KVxuICAgIH0pO1xuICAgIGdldFBhc3RMb2dzLnNldFJlcXVlc3RNYW5hZ2VyKHRoaXMuX3JlcXVlc3RNYW5hZ2VyKTtcbiAgICB2YXIgY2FsbCA9IGdldFBhc3RMb2dzLmJ1aWxkQ2FsbCgpO1xuXG4gICAgZ2V0UGFzdExvZ3MgPSBudWxsO1xuXG4gICAgcmV0dXJuIGNhbGwoc3ViT3B0aW9ucy5wYXJhbXMsIHN1Yk9wdGlvbnMuY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIHJldHVybnMgdGhlIGFuIG9iamVjdCB3aXRoIGNhbGwsIHNlbmQsIGVzdGltYXRlIGZ1bmN0aW9uc1xuICpcbiAqIEBtZXRob2QgX2NyZWF0ZVR4T2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhbiBvYmplY3Qgd2l0aCBmdW5jdGlvbnMgdG8gY2FsbCB0aGUgbWV0aG9kc1xuICovXG5Db250cmFjdC5wcm90b3R5cGUuX2NyZWF0ZVR4T2JqZWN0ID0gIGZ1bmN0aW9uIF9jcmVhdGVUeE9iamVjdCgpe1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgdHhPYmplY3QgPSB7fTtcblxuICAgIGlmKHRoaXMubWV0aG9kLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICB0eE9iamVjdC5jYWxsID0gdGhpcy5wYXJlbnQuX2V4ZWN1dGVNZXRob2QuYmluZCh0eE9iamVjdCwgJ2NhbGwnKTtcbiAgICAgICAgdHhPYmplY3QuY2FsbC5yZXF1ZXN0ID0gdGhpcy5wYXJlbnQuX2V4ZWN1dGVNZXRob2QuYmluZCh0eE9iamVjdCwgJ2NhbGwnLCB0cnVlKTsgLy8gdG8gbWFrZSBiYXRjaCByZXF1ZXN0c1xuXG4gICAgfVxuXG4gICAgdHhPYmplY3Quc2VuZCA9IHRoaXMucGFyZW50Ll9leGVjdXRlTWV0aG9kLmJpbmQodHhPYmplY3QsICdzZW5kJyk7XG4gICAgdHhPYmplY3Quc2VuZC5yZXF1ZXN0ID0gdGhpcy5wYXJlbnQuX2V4ZWN1dGVNZXRob2QuYmluZCh0eE9iamVjdCwgJ3NlbmQnLCB0cnVlKTsgLy8gdG8gbWFrZSBiYXRjaCByZXF1ZXN0c1xuICAgIHR4T2JqZWN0LmVuY29kZUFCSSA9IHRoaXMucGFyZW50Ll9lbmNvZGVNZXRob2RBQkkuYmluZCh0eE9iamVjdCk7XG4gICAgdHhPYmplY3QuZXN0aW1hdGVHYXMgPSB0aGlzLnBhcmVudC5fZXhlY3V0ZU1ldGhvZC5iaW5kKHR4T2JqZWN0LCAnZXN0aW1hdGUnKTtcblxuICAgIGlmIChhcmdzICYmIHRoaXMubWV0aG9kLmlucHV0cyAmJiBhcmdzLmxlbmd0aCAhPT0gdGhpcy5tZXRob2QuaW5wdXRzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5uZXh0TWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0TWV0aG9kLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9ycy5JbnZhbGlkTnVtYmVyT2ZQYXJhbXMoYXJncy5sZW5ndGgsIHRoaXMubWV0aG9kLmlucHV0cy5sZW5ndGgsIHRoaXMubWV0aG9kLm5hbWUpO1xuICAgIH1cblxuICAgIHR4T2JqZWN0LmFyZ3VtZW50cyA9IGFyZ3MgfHwgW107XG4gICAgdHhPYmplY3QuX21ldGhvZCA9IHRoaXMubWV0aG9kO1xuICAgIHR4T2JqZWN0Ll9wYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICB0eE9iamVjdC5fZXRoQWNjb3VudHMgPSB0aGlzLnBhcmVudC5jb25zdHJ1Y3Rvci5fZXRoQWNjb3VudHMgfHwgdGhpcy5fZXRoQWNjb3VudHM7XG5cbiAgICBpZih0aGlzLmRlcGxveURhdGEpIHtcbiAgICAgICAgdHhPYmplY3QuX2RlcGxveURhdGEgPSB0aGlzLmRlcGxveURhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR4T2JqZWN0O1xufTtcblxuXG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgb3B0aW9ucyBmb3IgdGhlIGV4ZWN1dGUgY2FsbFxuICpcbiAqIEBtZXRob2QgX3Byb2Nlc3NFeGVjdXRlQXJndW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcGFyYW0ge1Byb21pc2V9IGRlZmVyXG4gKi9cbkNvbnRyYWN0LnByb3RvdHlwZS5fcHJvY2Vzc0V4ZWN1dGVBcmd1bWVudHMgPSBmdW5jdGlvbiBfcHJvY2Vzc0V4ZWN1dGVBcmd1bWVudHMoYXJncywgZGVmZXIpIHtcbiAgICB2YXIgcHJvY2Vzc2VkQXJncyA9IHt9O1xuXG4gICAgcHJvY2Vzc2VkQXJncy50eXBlID0gYXJncy5zaGlmdCgpO1xuXG4gICAgLy8gZ2V0IHRoZSBjYWxsYmFja1xuICAgIHByb2Nlc3NlZEFyZ3MuY2FsbGJhY2sgPSB0aGlzLl9wYXJlbnQuX2dldENhbGxiYWNrKGFyZ3MpO1xuXG4gICAgLy8gZ2V0IGJsb2NrIG51bWJlciB0byB1c2UgZm9yIGNhbGxcbiAgICBpZihwcm9jZXNzZWRBcmdzLnR5cGUgPT09ICdjYWxsJyAmJiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gIT09IHRydWUgJiYgKF8uaXNTdHJpbmcoYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB8fCBpc0Zpbml0ZShhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pKSlcbiAgICAgICAgcHJvY2Vzc2VkQXJncy5kZWZhdWx0QmxvY2sgPSBhcmdzLnBvcCgpO1xuXG4gICAgLy8gZ2V0IHRoZSBvcHRpb25zXG4gICAgcHJvY2Vzc2VkQXJncy5vcHRpb25zID0gKF8uaXNPYmplY3QoYXJnc1thcmdzLmxlbmd0aCAtIDFdKSkgPyBhcmdzLnBvcCgpIDoge307XG5cbiAgICAvLyBnZXQgdGhlIGdlbmVyYXRlUmVxdWVzdCBhcmd1bWVudCBmb3IgYmF0Y2ggcmVxdWVzdHNcbiAgICBwcm9jZXNzZWRBcmdzLmdlbmVyYXRlUmVxdWVzdCA9IChhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IHRydWUpPyBhcmdzLnBvcCgpIDogZmFsc2U7XG5cbiAgICBwcm9jZXNzZWRBcmdzLm9wdGlvbnMgPSB0aGlzLl9wYXJlbnQuX2dldE9yU2V0RGVmYXVsdE9wdGlvbnMocHJvY2Vzc2VkQXJncy5vcHRpb25zKTtcbiAgICBwcm9jZXNzZWRBcmdzLm9wdGlvbnMuZGF0YSA9IHRoaXMuZW5jb2RlQUJJKCk7XG5cbiAgICAvLyBhZGQgY29udHJhY3QgYWRkcmVzc1xuICAgIGlmKCF0aGlzLl9kZXBsb3lEYXRhICYmICF1dGlscy5pc0FkZHJlc3ModGhpcy5fcGFyZW50Lm9wdGlvbnMuYWRkcmVzcykpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBjb250cmFjdCBvYmplY3QgZG9lc25cXCd0IGhhdmUgYWRkcmVzcyBzZXQgeWV0LCBwbGVhc2Ugc2V0IGFuIGFkZHJlc3MgZmlyc3QuJyk7XG5cbiAgICBpZighdGhpcy5fZGVwbG95RGF0YSlcbiAgICAgICAgcHJvY2Vzc2VkQXJncy5vcHRpb25zLnRvID0gdGhpcy5fcGFyZW50Lm9wdGlvbnMuYWRkcmVzcztcblxuICAgIC8vIHJldHVybiBlcnJvciwgaWYgbm8gXCJkYXRhXCIgaXMgc3BlY2lmaWVkXG4gICAgaWYoIXByb2Nlc3NlZEFyZ3Mub3B0aW9ucy5kYXRhKVxuICAgICAgICByZXR1cm4gdXRpbHMuX2ZpcmVFcnJvcihuZXcgRXJyb3IoJ0NvdWxkblxcJ3QgZmluZCBhIG1hdGNoaW5nIGNvbnRyYWN0IG1ldGhvZCwgb3IgdGhlIG51bWJlciBvZiBwYXJhbWV0ZXJzIGlzIHdyb25nLicpLCBkZWZlci5ldmVudEVtaXR0ZXIsIGRlZmVyLnJlamVjdCwgcHJvY2Vzc2VkQXJncy5jYWxsYmFjayk7XG5cbiAgICByZXR1cm4gcHJvY2Vzc2VkQXJncztcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBjYWxsLCB0cmFuc2FjdCBvciBlc3RpbWF0ZUdhcyBvbiBhIGNvbnRyYWN0IGZ1bmN0aW9uXG4gKlxuICogQG1ldGhvZCBfZXhlY3V0ZU1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgdGhlIHR5cGUgdGhpcyBleGVjdXRlIGZ1bmN0aW9uIHNob3VsZCBleGVjdXRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1ha2VSZXF1ZXN0IGlmIHRydWUsIGl0IHNpbXBseSByZXR1cm5zIHRoZSByZXF1ZXN0IHBhcmFtZXRlcnMsIHJhdGhlciB0aGFuIGV4ZWN1dGluZyBpdFxuICovXG5Db250cmFjdC5wcm90b3R5cGUuX2V4ZWN1dGVNZXRob2QgPSBmdW5jdGlvbiBfZXhlY3V0ZU1ldGhvZCgpe1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSB0aGlzLl9wYXJlbnQuX3Byb2Nlc3NFeGVjdXRlQXJndW1lbnRzLmNhbGwodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSwgZGVmZXIpLFxuICAgICAgICBkZWZlciA9IHByb21pRXZlbnQoKGFyZ3MudHlwZSAhPT0gJ3NlbmQnKSksXG4gICAgICAgIGV0aEFjY291bnRzID0gX3RoaXMuY29uc3RydWN0b3IuX2V0aEFjY291bnRzIHx8IF90aGlzLl9ldGhBY2NvdW50cztcblxuICAgIC8vIHNpbXBsZSByZXR1cm4gcmVxdWVzdCBmb3IgYmF0Y2ggcmVxdWVzdHNcbiAgICBpZihhcmdzLmdlbmVyYXRlUmVxdWVzdCkge1xuXG4gICAgICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGFyYW1zOiBbZm9ybWF0dGVycy5pbnB1dENhbGxGb3JtYXR0ZXIuY2FsbCh0aGlzLl9wYXJlbnQsIGFyZ3Mub3B0aW9ucyldLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGFyZ3MuY2FsbGJhY2tcbiAgICAgICAgfTtcblxuICAgICAgICBpZihhcmdzLnR5cGUgPT09ICdjYWxsJykge1xuICAgICAgICAgICAgcGF5bG9hZC5wYXJhbXMucHVzaChmb3JtYXR0ZXJzLmlucHV0RGVmYXVsdEJsb2NrTnVtYmVyRm9ybWF0dGVyLmNhbGwodGhpcy5fcGFyZW50LCBhcmdzLmRlZmF1bHRCbG9jaykpO1xuICAgICAgICAgICAgcGF5bG9hZC5tZXRob2QgPSAnZXRoX2NhbGwnO1xuICAgICAgICAgICAgcGF5bG9hZC5mb3JtYXQgPSB0aGlzLl9wYXJlbnQuX2RlY29kZU1ldGhvZFJldHVybi5iaW5kKG51bGwsIHRoaXMuX21ldGhvZC5vdXRwdXRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBheWxvYWQubWV0aG9kID0gJ2V0aF9zZW5kVHJhbnNhY3Rpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHN3aXRjaCAoYXJncy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdlc3RpbWF0ZSc6XG5cbiAgICAgICAgICAgICAgICB2YXIgZXN0aW1hdGVHYXMgPSAobmV3IE1ldGhvZCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdlc3RpbWF0ZUdhcycsXG4gICAgICAgICAgICAgICAgICAgIGNhbGw6ICdldGhfZXN0aW1hdGVHYXMnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dENhbGxGb3JtYXR0ZXJdLFxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IHV0aWxzLmhleFRvTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0TWFuYWdlcjogX3RoaXMuX3BhcmVudC5fcmVxdWVzdE1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRzOiBldGhBY2NvdW50cywgLy8gaXMgZXRoLmFjY291bnRzIChuZWNlc3NhcnkgZm9yIHdhbGxldCBzaWduaW5nKVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWNjb3VudDogX3RoaXMuX3BhcmVudC5kZWZhdWx0QWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEJsb2NrOiBfdGhpcy5fcGFyZW50LmRlZmF1bHRCbG9ja1xuICAgICAgICAgICAgICAgIH0pKS5jcmVhdGVGdW5jdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzdGltYXRlR2FzKGFyZ3Mub3B0aW9ucywgYXJncy5jYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NhbGwnOlxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBjaGVjayBlcnJvcnM6IG1pc3NpbmcgXCJmcm9tXCIgc2hvdWxkIGdpdmUgZXJyb3Igb24gZGVwbG95IGFuZCBzZW5kLCBjYWxsID9cblxuICAgICAgICAgICAgICAgIHZhciBjYWxsID0gKG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGw6ICdldGhfY2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXJzLmlucHV0Q2FsbEZvcm1hdHRlciwgZm9ybWF0dGVycy5pbnB1dERlZmF1bHRCbG9ja051bWJlckZvcm1hdHRlcl0sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvdXRwdXQgZm9ybWF0dGVyIGZvciBkZWNvZGluZ1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fcGFyZW50Ll9kZWNvZGVNZXRob2RSZXR1cm4oX3RoaXMuX21ldGhvZC5vdXRwdXRzLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0TWFuYWdlcjogX3RoaXMuX3BhcmVudC5fcmVxdWVzdE1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRzOiBldGhBY2NvdW50cywgLy8gaXMgZXRoLmFjY291bnRzIChuZWNlc3NhcnkgZm9yIHdhbGxldCBzaWduaW5nKVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWNjb3VudDogX3RoaXMuX3BhcmVudC5kZWZhdWx0QWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEJsb2NrOiBfdGhpcy5fcGFyZW50LmRlZmF1bHRCbG9ja1xuICAgICAgICAgICAgICAgIH0pKS5jcmVhdGVGdW5jdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGwoYXJncy5vcHRpb25zLCBhcmdzLmRlZmF1bHRCbG9jaywgYXJncy5jYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGNhc2UgJ3NlbmQnOlxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGVycm9yLCBpZiBubyBcImZyb21cIiBpcyBzcGVjaWZpZWRcbiAgICAgICAgICAgICAgICBpZighdXRpbHMuaXNBZGRyZXNzKGFyZ3Mub3B0aW9ucy5mcm9tKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHMuX2ZpcmVFcnJvcihuZXcgRXJyb3IoJ05vIFwiZnJvbVwiIGFkZHJlc3Mgc3BlY2lmaWVkIGluIG5laXRoZXIgdGhlIGdpdmVuIG9wdGlvbnMsIG5vciB0aGUgZGVmYXVsdCBvcHRpb25zLicpLCBkZWZlci5ldmVudEVtaXR0ZXIsIGRlZmVyLnJlamVjdCwgYXJncy5jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNCb29sZWFuKHRoaXMuX21ldGhvZC5wYXlhYmxlKSAmJiAhdGhpcy5fbWV0aG9kLnBheWFibGUgJiYgYXJncy5vcHRpb25zLnZhbHVlICYmIGFyZ3Mub3B0aW9ucy52YWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHV0aWxzLl9maXJlRXJyb3IobmV3IEVycm9yKCdDYW4gbm90IHNlbmQgdmFsdWUgdG8gbm9uLXBheWFibGUgY29udHJhY3QgbWV0aG9kIG9yIGNvbnN0cnVjdG9yJyksIGRlZmVyLmV2ZW50RW1pdHRlciwgZGVmZXIucmVqZWN0LCBhcmdzLmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSByZWNlaXB0IGxvZ3MgYXJlIGRlY29kZWRcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmFGb3JtYXR0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICByZWNlaXB0Rm9ybWF0dGVyOiBmdW5jdGlvbiAocmVjZWlwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheShyZWNlaXB0LmxvZ3MpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWNvZGUgbG9nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBfLm1hcChyZWNlaXB0LmxvZ3MsIGZ1bmN0aW9uKGxvZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX3BhcmVudC5fZGVjb2RlRXZlbnRBQkkuY2FsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQUxMRVZFTlRTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzb25JbnRlcmZhY2U6IF90aGlzLl9wYXJlbnQub3B0aW9ucy5qc29uSW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGxvZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGxvZyBuYW1lcyBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWlwdC5ldmVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmID4gMSBvZiB0aGUgc2FtZSBldmVudCwgZG9uJ3Qgb3ZlcndyaXRlIGFueSBleGlzdGluZyBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNlaXB0LmV2ZW50c1tldi5ldmVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWNlaXB0LmV2ZW50c1sgZXYuZXZlbnQgXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWlwdC5ldmVudHNbIGV2LmV2ZW50IF0ucHVzaChldik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWlwdC5ldmVudHNbZXYuZXZlbnRdID0gW3JlY2VpcHQuZXZlbnRzW2V2LmV2ZW50XSwgZXZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWlwdC5ldmVudHNbIGV2LmV2ZW50IF0gPSBldjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpcHQuZXZlbnRzW2NvdW50XSA9IGV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlY2VpcHQubG9ncztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXB0O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb250cmFjdERlcGxveUZvcm1hdHRlcjogZnVuY3Rpb24gKHJlY2VpcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdDb250cmFjdCA9IF90aGlzLl9wYXJlbnQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRyYWN0Lm9wdGlvbnMuYWRkcmVzcyA9IHJlY2VpcHQuY29udHJhY3RBZGRyZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld0NvbnRyYWN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBzZW5kVHJhbnNhY3Rpb24gPSAobmV3IE1ldGhvZCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzZW5kVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBjYWxsOiAnZXRoX3NlbmRUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogMSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXJzLmlucHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXJdLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0TWFuYWdlcjogX3RoaXMuX3BhcmVudC5fcmVxdWVzdE1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRzOiBfdGhpcy5jb25zdHJ1Y3Rvci5fZXRoQWNjb3VudHMgfHwgX3RoaXMuX2V0aEFjY291bnRzLCAvLyBpcyBldGguYWNjb3VudHMgKG5lY2Vzc2FyeSBmb3Igd2FsbGV0IHNpZ25pbmcpXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY2NvdW50OiBfdGhpcy5fcGFyZW50LmRlZmF1bHRBY2NvdW50LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QmxvY2s6IF90aGlzLl9wYXJlbnQuZGVmYXVsdEJsb2NrLFxuICAgICAgICAgICAgICAgICAgICBleHRyYUZvcm1hdHRlcnM6IGV4dHJhRm9ybWF0dGVyc1xuICAgICAgICAgICAgICAgIH0pKS5jcmVhdGVGdW5jdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbmRUcmFuc2FjdGlvbihhcmdzLm9wdGlvbnMsIGFyZ3MuY2FsbGJhY2spO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250cmFjdDtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGliYW4uanNcbiAqXG4gKiBEZXRhaWxzOiBodHRwczovL2dpdGh1Yi5jb20vZXRoZXJldW0vd2lraS93aWtpL0lDQVA6LUludGVyLWV4Y2hhbmdlLUNsaWVudC1BZGRyZXNzLVByb3RvY29sXG4gKlxuICogQGF1dGhvciBNYXJlayBLb3Rld2ljeiA8bWFyZWtAcGFyaXR5LmlvPlxuICogQGRhdGUgMjAxNVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCd3ZWIzLXV0aWxzJyk7XG52YXIgQmlnTnVtYmVyID0gcmVxdWlyZSgnYm4uanMnKTtcblxuXG52YXIgbGVmdFBhZCA9IGZ1bmN0aW9uIChzdHJpbmcsIGJ5dGVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHN0cmluZztcbiAgICB3aGlsZSAocmVzdWx0Lmxlbmd0aCA8IGJ5dGVzICogMikge1xuICAgICAgICByZXN1bHQgPSAnMCcgKyByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFByZXBhcmUgYW4gSUJBTiBmb3IgbW9kIDk3IGNvbXB1dGF0aW9uIGJ5IG1vdmluZyB0aGUgZmlyc3QgNCBjaGFycyB0byB0aGUgZW5kIGFuZCB0cmFuc2Zvcm1pbmcgdGhlIGxldHRlcnMgdG9cbiAqIG51bWJlcnMgKEEgPSAxMCwgQiA9IDExLCAuLi4sIFogPSAzNSksIGFzIHNwZWNpZmllZCBpbiBJU08xMzYxNi5cbiAqXG4gKiBAbWV0aG9kIGlzbzEzNjE2UHJlcGFyZVxuICogQHBhcmFtIHtTdHJpbmd9IGliYW4gdGhlIElCQU5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBwcmVwYXJlZCBJQkFOXG4gKi9cbnZhciBpc28xMzYxNlByZXBhcmUgPSBmdW5jdGlvbiAoaWJhbikge1xuICAgIHZhciBBID0gJ0EnLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIFogPSAnWicuY2hhckNvZGVBdCgwKTtcblxuICAgIGliYW4gPSBpYmFuLnRvVXBwZXJDYXNlKCk7XG4gICAgaWJhbiA9IGliYW4uc3Vic3RyKDQpICsgaWJhbi5zdWJzdHIoMCw0KTtcblxuICAgIHJldHVybiBpYmFuLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24obil7XG4gICAgICAgIHZhciBjb2RlID0gbi5jaGFyQ29kZUF0KDApO1xuICAgICAgICBpZiAoY29kZSA+PSBBICYmIGNvZGUgPD0gWil7XG4gICAgICAgICAgICAvLyBBID0gMTAsIEIgPSAxMSwgLi4uIFogPSAzNVxuICAgICAgICAgICAgcmV0dXJuIGNvZGUgLSBBICsgMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBNT0QgOTcgMTAgb2YgdGhlIHBhc3NlZCBJQkFOIGFzIHNwZWNpZmllZCBpbiBJU083MDY0LlxuICpcbiAqIEBtZXRob2QgbW9kOTcxMFxuICogQHBhcmFtIHtTdHJpbmd9IGliYW5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbnZhciBtb2Q5NzEwID0gZnVuY3Rpb24gKGliYW4pIHtcbiAgICB2YXIgcmVtYWluZGVyID0gaWJhbixcbiAgICAgICAgYmxvY2s7XG5cbiAgICB3aGlsZSAocmVtYWluZGVyLmxlbmd0aCA+IDIpe1xuICAgICAgICBibG9jayA9IHJlbWFpbmRlci5zbGljZSgwLCA5KTtcbiAgICAgICAgcmVtYWluZGVyID0gcGFyc2VJbnQoYmxvY2ssIDEwKSAlIDk3ICsgcmVtYWluZGVyLnNsaWNlKGJsb2NrLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlSW50KHJlbWFpbmRlciwgMTApICUgOTc7XG59O1xuXG4vKipcbiAqIFRoaXMgcHJvdG90eXBlIHNob3VsZCBiZSB1c2VkIHRvIGNyZWF0ZSBpYmFuIG9iamVjdCBmcm9tIGliYW4gY29ycmVjdCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWJhblxuICovXG52YXIgSWJhbiA9IGZ1bmN0aW9uIEliYW4oaWJhbikge1xuICAgIHRoaXMuX2liYW4gPSBpYmFuO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgdXNlZCB0byBjcmVhdGUgYW4gZXRoZXJldW0gYWRkcmVzcyBmcm9tIGEgZGlyZWN0IGliYW4gYWRkcmVzc1xuICpcbiAqIEBtZXRob2QgdG9BZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gaWJhbiBhZGRyZXNzXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBldGhlcmV1bSBhZGRyZXNzXG4gKi9cbkliYW4udG9BZGRyZXNzID0gZnVuY3Rpb24gKGliKSB7XG4gICAgaWIgPSBuZXcgSWJhbihpYik7XG5cbiAgICBpZighaWIuaXNEaXJlY3QoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lCQU4gaXMgaW5kaXJlY3QgYW5kIGNhblxcJ3QgYmUgY29udmVydGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGliLnRvQWRkcmVzcygpO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgdXNlZCB0byBjcmVhdGUgaWJhbiBhZGRyZXNzIGZyb20gYW4gZXRoZXJldW0gYWRkcmVzc1xuICpcbiAqIEBtZXRob2QgdG9JYmFuXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHJldHVybiB7U3RyaW5nfSB0aGUgSUJBTiBhZGRyZXNzXG4gKi9cbkliYW4udG9JYmFuID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICByZXR1cm4gSWJhbi5mcm9tQWRkcmVzcyhhZGRyZXNzKS50b1N0cmluZygpO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgdXNlZCB0byBjcmVhdGUgaWJhbiBvYmplY3QgZnJvbSBhbiBldGhlcmV1bSBhZGRyZXNzXG4gKlxuICogQG1ldGhvZCBmcm9tQWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEByZXR1cm4ge0liYW59IHRoZSBJQkFOIG9iamVjdFxuICovXG5JYmFuLmZyb21BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICBpZighdXRpbHMuaXNBZGRyZXNzKGFkZHJlc3MpKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlZCBhZGRyZXNzIGlzIG5vdCBhIHZhbGlkIGFkZHJlc3M6ICcrIGFkZHJlc3MpO1xuICAgIH1cblxuICAgIGFkZHJlc3MgPSBhZGRyZXNzLnJlcGxhY2UoJzB4JywnJykucmVwbGFjZSgnMFgnLCcnKTtcblxuICAgIHZhciBhc0JuID0gbmV3IEJpZ051bWJlcihhZGRyZXNzLCAxNik7XG4gICAgdmFyIGJhc2UzNiA9IGFzQm4udG9TdHJpbmcoMzYpO1xuICAgIHZhciBwYWRkZWQgPSBsZWZ0UGFkKGJhc2UzNiwgMTUpO1xuICAgIHJldHVybiBJYmFuLmZyb21CYmFuKHBhZGRlZC50b1VwcGVyQ2FzZSgpKTtcbn07XG5cbi8qKlxuICogQ29udmVydCB0aGUgcGFzc2VkIEJCQU4gdG8gYW4gSUJBTiBmb3IgdGhpcyBjb3VudHJ5IHNwZWNpZmljYXRpb24uXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IDxpPlwiZ2VuZXJhdGlvbiBvZiB0aGUgSUJBTiBzaGFsbCBiZSB0aGUgZXhjbHVzaXZlIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBiYW5rL2JyYW5jaCBzZXJ2aWNpbmcgdGhlIGFjY291bnRcIjwvaT4uXG4gKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBwcmVmZXJyZWQgYWxnb3JpdGhtIGRlc2NyaWJlZCBpbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ludGVybmF0aW9uYWxfQmFua19BY2NvdW50X051bWJlciNHZW5lcmF0aW5nX0lCQU5fY2hlY2tfZGlnaXRzXG4gKlxuICogQG1ldGhvZCBmcm9tQmJhblxuICogQHBhcmFtIHtTdHJpbmd9IGJiYW4gdGhlIEJCQU4gdG8gY29udmVydCB0byBJQkFOXG4gKiBAcmV0dXJucyB7SWJhbn0gdGhlIElCQU4gb2JqZWN0XG4gKi9cbkliYW4uZnJvbUJiYW4gPSBmdW5jdGlvbiAoYmJhbikge1xuICAgIHZhciBjb3VudHJ5Q29kZSA9ICdYRSc7XG5cbiAgICB2YXIgcmVtYWluZGVyID0gbW9kOTcxMChpc28xMzYxNlByZXBhcmUoY291bnRyeUNvZGUgKyAnMDAnICsgYmJhbikpO1xuICAgIHZhciBjaGVja0RpZ2l0ID0gKCcwJyArICg5OCAtIHJlbWFpbmRlcikpLnNsaWNlKC0yKTtcblxuICAgIHJldHVybiBuZXcgSWJhbihjb3VudHJ5Q29kZSArIGNoZWNrRGlnaXQgKyBiYmFuKTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gY3JlYXRlIElCQU4gb2JqZWN0IGZvciBnaXZlbiBpbnN0aXR1dGlvbiBhbmQgaWRlbnRpZmllclxuICpcbiAqIEBtZXRob2QgY3JlYXRlSW5kaXJlY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLCByZXF1aXJlZCBvcHRpb25zIGFyZSBcImluc3RpdHV0aW9uXCIgYW5kIFwiaWRlbnRpZmllclwiXG4gKiBAcmV0dXJuIHtJYmFufSB0aGUgSUJBTiBvYmplY3RcbiAqL1xuSWJhbi5jcmVhdGVJbmRpcmVjdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIEliYW4uZnJvbUJiYW4oJ0VUSCcgKyBvcHRpb25zLmluc3RpdHV0aW9uICsgb3B0aW9ucy5pZGVudGlmaWVyKTtcbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIHVzZWQgdG8gY2hlY2sgaWYgZ2l2ZW4gc3RyaW5nIGlzIHZhbGlkIGliYW4gb2JqZWN0XG4gKlxuICogQG1ldGhvZCBpc1ZhbGlkXG4gKiBAcGFyYW0ge1N0cmluZ30gaWJhbiBzdHJpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgaXQgaXMgdmFsaWQgSUJBTlxuICovXG5JYmFuLmlzVmFsaWQgPSBmdW5jdGlvbiAoaWJhbikge1xuICAgIHZhciBpID0gbmV3IEliYW4oaWJhbik7XG4gICAgcmV0dXJuIGkuaXNWYWxpZCgpO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGNoZWNrIGlmIGliYW4gaXMgY29ycmVjdFxuICpcbiAqIEBtZXRob2QgaXNWYWxpZFxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgaXQgaXMsIG90aGVyd2lzZSBmYWxzZVxuICovXG5JYmFuLnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAvXlhFWzAtOV17Mn0oRVRIWzAtOUEtWl17MTN9fFswLTlBLVpdezMwLDMxfSkkLy50ZXN0KHRoaXMuX2liYW4pICYmXG4gICAgICAgIG1vZDk3MTAoaXNvMTM2MTZQcmVwYXJlKHRoaXMuX2liYW4pKSA9PT0gMTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBjaGVjayBpZiBpYmFuIG51bWJlciBpcyBkaXJlY3RcbiAqXG4gKiBAbWV0aG9kIGlzRGlyZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBpdCBpcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbkliYW4ucHJvdG90eXBlLmlzRGlyZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pYmFuLmxlbmd0aCA9PT0gMzQgfHwgdGhpcy5faWJhbi5sZW5ndGggPT09IDM1O1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGNoZWNrIGlmIGliYW4gbnVtYmVyIGlmIGluZGlyZWN0XG4gKlxuICogQG1ldGhvZCBpc0luZGlyZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBpdCBpcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbkliYW4ucHJvdG90eXBlLmlzSW5kaXJlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2liYW4ubGVuZ3RoID09PSAyMDtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgaWJhbiBjaGVja3N1bVxuICogVXNlcyB0aGUgbW9kLTk3LTEwIGNoZWNrc3VtbWluZyBwcm90b2NvbCAoSVNPL0lFQyA3MDY0OjIwMDMpXG4gKlxuICogQG1ldGhvZCBjaGVja3N1bVxuICogQHJldHVybnMge1N0cmluZ30gY2hlY2tzdW1cbiAqL1xuSWJhbi5wcm90b3R5cGUuY2hlY2tzdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2liYW4uc3Vic3RyKDIsIDIpO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGdldCBpbnN0aXR1dGlvbiBpZGVudGlmaWVyXG4gKiBlZy4gWFJFR1xuICpcbiAqIEBtZXRob2QgaW5zdGl0dXRpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9IGluc3RpdHV0aW9uIGlkZW50aWZpZXJcbiAqL1xuSWJhbi5wcm90b3R5cGUuaW5zdGl0dXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNJbmRpcmVjdCgpID8gdGhpcy5faWJhbi5zdWJzdHIoNywgNCkgOiAnJztcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgY2xpZW50IGlkZW50aWZpZXIgd2l0aGluIGluc3RpdHV0aW9uXG4gKiBlZy4gR0FWT0ZZT1JLXG4gKlxuICogQG1ldGhvZCBjbGllbnRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGNsaWVudCBpZGVudGlmaWVyXG4gKi9cbkliYW4ucHJvdG90eXBlLmNsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0luZGlyZWN0KCkgPyB0aGlzLl9pYmFuLnN1YnN0cigxMSkgOiAnJztcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgY2xpZW50IGRpcmVjdCBhZGRyZXNzXG4gKlxuICogQG1ldGhvZCB0b0FkZHJlc3NcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGV0aGVyZXVtIGFkZHJlc3NcbiAqL1xuSWJhbi5wcm90b3R5cGUudG9BZGRyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzRGlyZWN0KCkpIHtcbiAgICAgICAgdmFyIGJhc2UzNiA9IHRoaXMuX2liYW4uc3Vic3RyKDQpO1xuICAgICAgICB2YXIgYXNCbiA9IG5ldyBCaWdOdW1iZXIoYmFzZTM2LCAzNik7XG4gICAgICAgIHJldHVybiB1dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhc0JuLnRvU3RyaW5nKDE2LCAyMCkpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn07XG5cbkliYW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pYmFuO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJYmFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gVW5rbm93biBFcnJvclxuZXhwb3J0cy5VTktOT1dOX0VSUk9SID0gJ1VOS05PV05fRVJST1InO1xuLy8gTm90IGltcGxlbWVudGVkXG5leHBvcnRzLk5PVF9JTVBMRU1FTlRFRCA9ICdOT1RfSU1QTEVNRU5URUQnO1xuLy8gTWlzc2luZyBuZXcgb3BlcmF0b3IgdG8gYW4gb2JqZWN0XG4vLyAgLSBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgY2xhc3NcbmV4cG9ydHMuTUlTU0lOR19ORVcgPSAnTUlTU0lOR19ORVcnO1xuLy8gQ2FsbCBleGNlcHRpb25cbi8vICAtIHRyYW5zYWN0aW9uOiB0aGUgdHJhbnNhY3Rpb25cbi8vICAtIGFkZHJlc3M/OiB0aGUgY29udHJhY3QgYWRkcmVzc1xuLy8gIC0gYXJncz86IFRoZSBhcmd1bWVudHMgcGFzc2VkIGludG8gdGhlIGZ1bmN0aW9uXG4vLyAgLSBtZXRob2Q/OiBUaGUgU29saWRpdHkgbWV0aG9kIHNpZ25hdHVyZVxuLy8gIC0gZXJyb3JTaWduYXR1cmU/OiBUaGUgRUlQODQ4IGVycm9yIHNpZ25hdHVyZVxuLy8gIC0gZXJyb3JBcmdzPzogVGhlIEVJUDg0OCBlcnJvciBwYXJhbWV0ZXJzXG4vLyAgLSByZWFzb246IFRoZSByZWFzb24gKG9ubHkgZm9yIEVJUDg0OCBcIkVycm9yKHN0cmluZylcIilcbmV4cG9ydHMuQ0FMTF9FWENFUFRJT04gPSAnQ0FMTF9FWENFUFRJT04nO1xuLy8gUmVzcG9uc2UgZnJvbSBhIHNlcnZlciB3YXMgaW52YWxpZFxuLy8gICAtIHJlc3BvbnNlOiBUaGUgYm9keSBvZiB0aGUgcmVzcG9uc2Vcbi8vJ0JBRF9SRVNQT05TRScsXG4vLyBJbnZhbGlkIGFyZ3VtZW50IChlLmcuIHZhbHVlIGlzIGluY29tcGF0aWJsZSB3aXRoIHR5cGUpIHRvIGEgZnVuY3Rpb246XG4vLyAgIC0gYXJnOiBUaGUgYXJndW1lbnQgbmFtZSB0aGF0IHdhcyBpbnZhbGlkXG4vLyAgIC0gdmFsdWU6IFRoZSB2YWx1ZSBvZiB0aGUgYXJndW1lbnRcbmV4cG9ydHMuSU5WQUxJRF9BUkdVTUVOVCA9ICdJTlZBTElEX0FSR1VNRU5UJztcbi8vIE1pc3NpbmcgYXJndW1lbnQgdG8gYSBmdW5jdGlvbjpcbi8vICAgLSBjb3VudDogVGhlIG51bWJlciBvZiBhcmd1bWVudHMgcmVjZWl2ZWRcbi8vICAgLSBleHBlY3RlZENvdW50OiBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyBleHBlY3RlZFxuZXhwb3J0cy5NSVNTSU5HX0FSR1VNRU5UID0gJ01JU1NJTkdfQVJHVU1FTlQnO1xuLy8gVG9vIG1hbnkgYXJndW1lbnRzXG4vLyAgIC0gY291bnQ6IFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHJlY2VpdmVkXG4vLyAgIC0gZXhwZWN0ZWRDb3VudDogVGhlIG51bWJlciBvZiBhcmd1bWVudHMgZXhwZWN0ZWRcbmV4cG9ydHMuVU5FWFBFQ1RFRF9BUkdVTUVOVCA9ICdVTkVYUEVDVEVEX0FSR1VNRU5UJztcbi8vIE51bWVyaWMgRmF1bHRcbi8vICAgLSBvcGVyYXRpb246IHRoZSBvcGVyYXRpb24gYmVpbmcgZXhlY3V0ZWRcbi8vICAgLSBmYXVsdDogdGhlIHJlYXNvbiB0aGlzIGZhdWx0ZWRcbmV4cG9ydHMuTlVNRVJJQ19GQVVMVCA9ICdOVU1FUklDX0ZBVUxUJztcbi8vIFVuc3VwcG9ydGVkIG9wZXJhdGlvblxuLy8gICAtIG9wZXJhdGlvblxuZXhwb3J0cy5VTlNVUFBPUlRFRF9PUEVSQVRJT04gPSAnVU5TVVBQT1JURURfT1BFUkFUSU9OJztcbnZhciBfcGVybWFuZW50Q2Vuc29yRXJyb3JzID0gZmFsc2U7XG52YXIgX2NlbnNvckVycm9ycyA9IGZhbHNlO1xuLy8gQFRPRE86IEVudW1cbmZ1bmN0aW9uIHRocm93RXJyb3IobWVzc2FnZSwgY29kZSwgcGFyYW1zKSB7XG4gICAgaWYgKF9jZW5zb3JFcnJvcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGVycm9yJyk7XG4gICAgfVxuICAgIGlmICghY29kZSkge1xuICAgICAgICBjb2RlID0gZXhwb3J0cy5VTktOT1dOX0VSUk9SO1xuICAgIH1cbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgICBwYXJhbXMgPSB7fTtcbiAgICB9XG4gICAgdmFyIG1lc3NhZ2VEZXRhaWxzID0gW107XG4gICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1lc3NhZ2VEZXRhaWxzLnB1c2goa2V5ICsgJz0nICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zW2tleV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VEZXRhaWxzLnB1c2goa2V5ICsgJz0nICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zW2tleV0udG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHJlYXNvbiA9IG1lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2VEZXRhaWxzLmxlbmd0aCkge1xuICAgICAgICBtZXNzYWdlICs9ICcgKCcgKyBtZXNzYWdlRGV0YWlscy5qb2luKCcsICcpICsgJyknO1xuICAgIH1cbiAgICAvLyBAVE9ETzogQW55Pz9cbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgZXJyb3IucmVhc29uID0gcmVhc29uO1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGVycm9yW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICB9KTtcbiAgICB0aHJvdyBlcnJvcjtcbn1cbmV4cG9ydHMudGhyb3dFcnJvciA9IHRocm93RXJyb3I7XG5mdW5jdGlvbiBjaGVja05ldyhzZWxmLCBraW5kKSB7XG4gICAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIGtpbmQpKSB7XG4gICAgICAgIHRocm93RXJyb3IoJ21pc3NpbmcgbmV3JywgZXhwb3J0cy5NSVNTSU5HX05FVywgeyBuYW1lOiBraW5kLm5hbWUgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5jaGVja05ldyA9IGNoZWNrTmV3O1xuZnVuY3Rpb24gY2hlY2tBcmd1bWVudENvdW50KGNvdW50LCBleHBlY3RlZENvdW50LCBzdWZmaXgpIHtcbiAgICBpZiAoIXN1ZmZpeCkge1xuICAgICAgICBzdWZmaXggPSAnJztcbiAgICB9XG4gICAgaWYgKGNvdW50IDwgZXhwZWN0ZWRDb3VudCkge1xuICAgICAgICB0aHJvd0Vycm9yKCdtaXNzaW5nIGFyZ3VtZW50JyArIHN1ZmZpeCwgZXhwb3J0cy5NSVNTSU5HX0FSR1VNRU5ULCB7IGNvdW50OiBjb3VudCwgZXhwZWN0ZWRDb3VudDogZXhwZWN0ZWRDb3VudCB9KTtcbiAgICB9XG4gICAgaWYgKGNvdW50ID4gZXhwZWN0ZWRDb3VudCkge1xuICAgICAgICB0aHJvd0Vycm9yKCd0b28gbWFueSBhcmd1bWVudHMnICsgc3VmZml4LCBleHBvcnRzLlVORVhQRUNURURfQVJHVU1FTlQsIHsgY291bnQ6IGNvdW50LCBleHBlY3RlZENvdW50OiBleHBlY3RlZENvdW50IH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuY2hlY2tBcmd1bWVudENvdW50ID0gY2hlY2tBcmd1bWVudENvdW50O1xuZnVuY3Rpb24gc2V0Q2Vuc29yc2hpcChjZW5zb3JzaGlwLCBwZXJtYW5lbnQpIHtcbiAgICBpZiAoX3Blcm1hbmVudENlbnNvckVycm9ycykge1xuICAgICAgICB0aHJvd0Vycm9yKCdlcnJvciBjZW5zb3JzaGlwIHBlcm1hbmVudCcsIGV4cG9ydHMuVU5TVVBQT1JURURfT1BFUkFUSU9OLCB7IG9wZXJhdGlvbjogJ3NldENlcnNvcnNoaXAnIH0pO1xuICAgIH1cbiAgICBfY2Vuc29yRXJyb3JzID0gISFjZW5zb3JzaGlwO1xuICAgIF9wZXJtYW5lbnRDZW5zb3JFcnJvcnMgPSAhIXBlcm1hbmVudDtcbn1cbmV4cG9ydHMuc2V0Q2Vuc29yc2hpcCA9IHNldENlbnNvcnNoaXA7XG4iLCIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKlxuICogQGZpbGUgZ2V0TmV0d29ya1R5cGUuanNcbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG5cbnZhciBnZXROZXR3b3JrVHlwZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGlkO1xuXG5cbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0SWQoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZ2l2ZW5JZCkge1xuXG4gICAgICAgICAgICBpZCA9IGdpdmVuSWQ7XG5cbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRCbG9jaygwKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGdlbmVzaXMpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9ICdwcml2YXRlJztcblxuICAgICAgICAgICAgaWYgKGdlbmVzaXMuaGFzaCA9PT0gJzB4ZDRlNTY3NDBmODc2YWVmOGMwMTBiODZhNDBkNWY1Njc0NWExMThkMDkwNmEzNGU2OWFlYzhjMGRiMWNiOGZhMycgJiZcbiAgICAgICAgICAgICAgICBpZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gJ21haW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlbmVzaXMuaGFzaCA9PT0gJzBjZDc4NmEyNDI1ZDE2ZjE1MmM2NTgzMTZjNDIzZTZjZTExODFlMTVjMzI5NTgyNmQ3Yzk5MDRjYmE5Y2UzMDMnICYmXG4gICAgICAgICAgICAgICAgaWQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9ICdtb3JkZW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlbmVzaXMuaGFzaCA9PT0gJzB4NDE5NDEwMjM2ODA5MjNlMGZlNGQ3NGEzNGJkYWM4MTQxZjI1NDBlM2FlOTA2MjM3MThlNDdkNjZkMWNhNGEyZCcgJiZcbiAgICAgICAgICAgICAgICBpZCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gJ3JvcHN0ZW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlbmVzaXMuaGFzaCA9PT0gJzB4NjM0MWZkM2RhZjk0Yjc0OGM3MmNlZDVhNWIyNjAyOGYyNDc0ZjVmMDBkODI0NTA0ZTRmYTM3YTc1NzY3ZTE3NycgJiZcbiAgICAgICAgICAgICAgICBpZCA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gJ3JpbmtlYnknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlbmVzaXMuaGFzaCA9PT0gJzB4YTNjNTY1ZmMxNWM3NDc4ODYyZDUwY2NkNjU2MWUzYzA2YjI0Y2M1MDliZjM4ODk0MWMyNWVhOTg1Y2UzMmNiOScgJiZcbiAgICAgICAgICAgICAgICBpZCA9PT0gNDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9ICdrb3Zhbic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5ldHdvcmtUeXBlO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlclxuXG52YXIgZGVidWdcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgcHJvY2Vzcy5lbnYgJiZcbiAgICBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG4gICAgYXJncy51bnNoaWZ0KCdTRU1WRVInKVxuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpXG4gIH1cbn0gZWxzZSB7XG4gIGRlYnVnID0gZnVuY3Rpb24gKCkge31cbn1cblxuLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuZXhwb3J0cy5TRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJ1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NlxudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fFxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA5MDA3MTk5MjU0NzQwOTkxXG5cbi8vIE1heCBzYWZlIHNlZ21lbnQgbGVuZ3RoIGZvciBjb2VyY2lvbi5cbnZhciBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIID0gMTZcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXVxudmFyIHNyYyA9IGV4cG9ydHMuc3JjID0gW11cbnZhciBSID0gMFxuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKytcbnNyY1tOVU1FUklDSURFTlRJRklFUl0gPSAnMHxbMS05XVxcXFxkKidcbnZhciBOVU1FUklDSURFTlRJRklFUkxPT1NFID0gUisrXG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJ1xuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKytcbnNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKidcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbnZhciBNQUlOVkVSU0lPTiA9IFIrK1xuc3JjW01BSU5WRVJTSU9OXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrXG5zcmNbTUFJTlZFUlNJT05MT09TRV0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKSdcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVIgPSBSKytcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UgPSBSKytcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvblxuLy8gSHlwaGVuLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBkb3Qtc2VwYXJhdGVkIHByZS1yZWxlYXNlIHZlcnNpb25cbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgUFJFUkVMRUFTRSA9IFIrK1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSdcblxudmFyIFBSRVJFTEVBU0VMT09TRSA9IFIrK1xuc3JjW1BSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gKyAnKSopKSdcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrK1xuc3JjW0JVSUxESURFTlRJRklFUl0gPSAnWzAtOUEtWmEtei1dKydcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBCVUlMRCA9IFIrK1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJ1xuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKytcbnZhciBGVUxMUExBSU4gPSAndj8nICsgc3JjW01BSU5WRVJTSU9OXSArXG4gICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nXG5cbnNyY1tGVUxMXSA9ICdeJyArIEZVTExQTEFJTiArICckJ1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/J1xuXG52YXIgTE9PU0UgPSBSKytcbnNyY1tMT09TRV0gPSAnXicgKyBMT09TRVBMQUlOICsgJyQnXG5cbnZhciBHVExUID0gUisrXG5zcmNbR1RMVF0gPSAnKCg/Ojx8Pik/PT8pJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG52YXIgWFJBTkdFSURFTlRJRklFUkxPT1NFID0gUisrXG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJ1xudmFyIFhSQU5HRUlERU5USUZJRVIgPSBSKytcbnNyY1tYUkFOR0VJREVOVElGSUVSXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnfHh8WHxcXFxcKidcblxudmFyIFhSQU5HRVBMQUlOID0gUisrXG5zcmNbWFJBTkdFUExBSU5dID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG52YXIgWFJBTkdFUExBSU5MT09TRSA9IFIrK1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG52YXIgWFJBTkdFID0gUisrXG5zcmNbWFJBTkdFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOXSArICckJ1xudmFyIFhSQU5HRUxPT1NFID0gUisrXG5zcmNbWFJBTkdFTE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ29lcmNpb24uXG4vLyBFeHRyYWN0IGFueXRoaW5nIHRoYXQgY291bGQgY29uY2VpdmFibHkgYmUgYSBwYXJ0IG9mIGEgdmFsaWQgc2VtdmVyXG52YXIgQ09FUkNFID0gUisrXG5zcmNbQ09FUkNFXSA9ICcoXnxbXlxcXFxkXSknICtcbiAgICAgICAgICAgICAgJyhcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pJyArXG4gICAgICAgICAgICAgICcoPzpcXFxcLihcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pKT8nICtcbiAgICAgICAgICAgICAgJyg/OlxcXFwuKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSkpPycgK1xuICAgICAgICAgICAgICAnKD86JHxbXlxcXFxkXSknXG52YXIgQ09FUkNFUlRMID0gUisrXG5yZVtDT0VSQ0VSVExdID0gbmV3IFJlZ0V4cChzcmNbQ09FUkNFXSwgJ2cnKVxuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrK1xuc3JjW0xPTkVUSUxERV0gPSAnKD86fj4/KSdcblxudmFyIFRJTERFVFJJTSA9IFIrK1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJ1xucmVbVElMREVUUklNXSA9IG5ldyBSZWdFeHAoc3JjW1RJTERFVFJJTV0sICdnJylcbnZhciB0aWxkZVRyaW1SZXBsYWNlID0gJyQxfidcblxudmFyIFRJTERFID0gUisrXG5zcmNbVElMREVdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnXG52YXIgVElMREVMT09TRSA9IFIrK1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbnZhciBMT05FQ0FSRVQgPSBSKytcbnNyY1tMT05FQ0FSRVRdID0gJyg/OlxcXFxeKSdcblxudmFyIENBUkVUVFJJTSA9IFIrK1xuc3JjW0NBUkVUVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVDQVJFVF0gKyAnXFxcXHMrJ1xucmVbQ0FSRVRUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NBUkVUVFJJTV0sICdnJylcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXidcblxudmFyIENBUkVUID0gUisrXG5zcmNbQ0FSRVRdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnXG52YXIgQ0FSRVRMT09TRSA9IFIrK1xuc3JjW0NBUkVUTE9PU0VdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbnZhciBDT01QQVJBVE9STE9PU0UgPSBSKytcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCdcbnZhciBDT01QQVJBVE9SID0gUisrXG5zcmNbQ09NUEFSQVRPUl0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBGVUxMUExBSU4gKyAnKSR8XiQnXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG52YXIgQ09NUEFSQVRPUlRSSU0gPSBSKytcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJ1xuXG4vLyB0aGlzIG9uZSBoYXMgdG8gdXNlIHRoZSAvZyBmbGFnXG5yZVtDT01QQVJBVE9SVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDT01QQVJBVE9SVFJJTV0sICdnJylcbnZhciBjb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxudmFyIEhZUEhFTlJBTkdFID0gUisrXG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnXG5cbnZhciBIWVBIRU5SQU5HRUxPT1NFID0gUisrXG5zcmNbSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnXG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrXG5zcmNbU1RBUl0gPSAnKDx8Pik/PT9cXFxccypcXFxcKidcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuZm9yICh2YXIgaSA9IDA7IGkgPCBSOyBpKyspIHtcbiAgZGVidWcoaSwgc3JjW2ldKVxuICBpZiAoIXJlW2ldKSB7XG4gICAgcmVbaV0gPSBuZXcgUmVnRXhwKHNyY1tpXSlcbiAgfVxufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2VcbmZ1bmN0aW9uIHBhcnNlICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXVxuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWRcbmZ1bmN0aW9uIHZhbGlkICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIHZhciB2ID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsXG59XG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhblxuZnVuY3Rpb24gY2xlYW4gKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxuXG5leHBvcnRzLlNlbVZlciA9IFNlbVZlclxuXG5mdW5jdGlvbiBTZW1WZXIgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgaWYgKHZlcnNpb24ubG9vc2UgPT09IG9wdGlvbnMubG9vc2UpIHtcbiAgICAgIHJldHVybiB2ZXJzaW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb25cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbilcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2ZXJzaW9uIGlzIGxvbmdlciB0aGFuICcgKyBNQVhfTEVOR1RIICsgJyBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgfVxuXG4gIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBvcHRpb25zKVxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcblxuICB2YXIgbSA9IHZlcnNpb24udHJpbSgpLm1hdGNoKG9wdGlvbnMubG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSlcblxuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKVxuICB9XG5cbiAgdGhpcy5yYXcgPSB2ZXJzaW9uXG5cbiAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgdGhpcy5tYWpvciA9ICttWzFdXG4gIHRoaXMubWlub3IgPSArbVsyXVxuICB0aGlzLnBhdGNoID0gK21bM11cblxuICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcbiAgfVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG4gIH1cblxuICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgaWYgKCFtWzRdKSB7XG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uIChpZCkge1xuICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgdmFyIG51bSA9ICtpZFxuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlkXG4gICAgfSlcbiAgfVxuXG4gIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW11cbiAgdGhpcy5mb3JtYXQoKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgdGhpcy52ZXJzaW9uICs9ICctJyArIHRoaXMucHJlcmVsZWFzZS5qb2luKCcuJylcbiAgfVxuICByZXR1cm4gdGhpcy52ZXJzaW9uXG59XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZlcnNpb25cbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5vcHRpb25zLCBvdGhlcilcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVNYWluID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaClcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIGRvIHtcbiAgICB2YXIgYSA9IHRoaXMucHJlcmVsZWFzZVtpXVxuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXVxuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICB9XG4gIH0gd2hpbGUgKCsraSlcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlQnVpbGQgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5idWlsZFtpXVxuICAgIHZhciBiID0gb3RoZXIuYnVpbGRbaV1cbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYilcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICBjb250aW51ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgfVxuICB9IHdoaWxlICgrK2kpXG59XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24gKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgdGhpcy5tYWpvcisrXG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yKytcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgIH1cbiAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICB9XG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAvLyBJZiBpdCBpcyBhIHByZS1yZWxlYXNlIGl0IHdpbGwgYnVtcCB1cCB0byB0aGUgc2FtZSBwYXRjaCB2ZXJzaW9uLlxuICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnBhdGNoKytcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICBicmVha1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aFxuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrXG4gICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgLy8gZGlkbid0IGluY3JlbWVudCBhbnl0aGluZ1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKVxuICB9XG4gIHRoaXMuZm9ybWF0KClcbiAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb25cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0cy5pbmMgPSBpbmNcbmZ1bmN0aW9uIGluYyAodmVyc2lvbiwgcmVsZWFzZSwgbG9vc2UsIGlkZW50aWZpZXIpIHtcbiAgaWYgKHR5cGVvZiAobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZVxuICAgIGxvb3NlID0gdW5kZWZpbmVkXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvblxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0cy5kaWZmID0gZGlmZlxuZnVuY3Rpb24gZGlmZiAodmVyc2lvbjEsIHZlcnNpb24yKSB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSlcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMilcbiAgICB2YXIgcHJlZml4ID0gJydcbiAgICBpZiAodjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHByZWZpeCA9ICdwcmUnXG4gICAgICB2YXIgZGVmYXVsdFJlc3VsdCA9ICdwcmVyZWxlYXNlJ1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBrZXlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlc3VsdCAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnNcblxudmFyIG51bWVyaWMgPSAvXlswLTldKyQvXG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgdmFyIGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYilcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthXG4gICAgYiA9ICtiXG4gIH1cblxuICByZXR1cm4gYSA9PT0gYiA/IDBcbiAgICA6IChhbnVtICYmICFibnVtKSA/IC0xXG4gICAgOiAoYm51bSAmJiAhYW51bSkgPyAxXG4gICAgOiBhIDwgYiA/IC0xXG4gICAgOiAxXG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnNcbmZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKVxufVxuXG5leHBvcnRzLm1ham9yID0gbWFqb3JcbmZ1bmN0aW9uIG1ham9yIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3Jcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yXG5mdW5jdGlvbiBtaW5vciAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yXG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaFxuZnVuY3Rpb24gcGF0Y2ggKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxufVxuXG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlXG5mdW5jdGlvbiBjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcbn1cblxuZXhwb3J0cy5jb21wYXJlTG9vc2UgPSBjb21wYXJlTG9vc2VcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZSAoYSwgYikge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCB0cnVlKVxufVxuXG5leHBvcnRzLmNvbXBhcmVCdWlsZCA9IGNvbXBhcmVCdWlsZFxuZnVuY3Rpb24gY29tcGFyZUJ1aWxkIChhLCBiLCBsb29zZSkge1xuICB2YXIgdmVyc2lvbkEgPSBuZXcgU2VtVmVyKGEsIGxvb3NlKVxuICB2YXIgdmVyc2lvbkIgPSBuZXcgU2VtVmVyKGIsIGxvb3NlKVxuICByZXR1cm4gdmVyc2lvbkEuY29tcGFyZSh2ZXJzaW9uQikgfHwgdmVyc2lvbkEuY29tcGFyZUJ1aWxkKHZlcnNpb25CKVxufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmVcbmZ1bmN0aW9uIHJjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSlcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydFxuZnVuY3Rpb24gc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmVCdWlsZChhLCBiLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0XG5mdW5jdGlvbiByc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmVCdWlsZChiLCBhLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5ndCA9IGd0XG5mdW5jdGlvbiBndCAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxufVxuXG5leHBvcnRzLmx0ID0gbHRcbmZ1bmN0aW9uIGx0IChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwXG59XG5cbmV4cG9ydHMuZXEgPSBlcVxuZnVuY3Rpb24gZXEgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxufVxuXG5leHBvcnRzLm5lcSA9IG5lcVxuZnVuY3Rpb24gbmVxIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDBcbn1cblxuZXhwb3J0cy5ndGUgPSBndGVcbmZ1bmN0aW9uIGd0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDBcbn1cblxuZXhwb3J0cy5sdGUgPSBsdGVcbmZ1bmN0aW9uIGx0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXBcbmZ1bmN0aW9uIGNtcCAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgPT09IGJcblxuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3BlcmF0b3I6ICcgKyBvcClcbiAgfVxufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yXG5mdW5jdGlvbiBDb21wYXJhdG9yIChjb21wLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgIHJldHVybiBjb21wXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgfVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIG9wdGlvbnMpXG4gIH1cblxuICBkZWJ1ZygnY29tcGFyYXRvcicsIGNvbXAsIG9wdGlvbnMpXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICB0aGlzLnBhcnNlKGNvbXApXG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICB0aGlzLnZhbHVlID0gJydcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgfVxuXG4gIGRlYnVnKCdjb21wJywgdGhpcylcbn1cblxudmFyIEFOWSA9IHt9XG5Db21wYXJhdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChjb21wKSB7XG4gIHZhciByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdXG4gIHZhciBtID0gY29tcC5tYXRjaChyKVxuXG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY29tcGFyYXRvcjogJyArIGNvbXApXG4gIH1cblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXSAhPT0gdW5kZWZpbmVkID8gbVsxXSA6ICcnXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICB0aGlzLm9wZXJhdG9yID0gJydcbiAgfVxuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pIHtcbiAgICB0aGlzLnNlbXZlciA9IEFOWVxuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLm9wdGlvbnMubG9vc2UpXG4gIH1cbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlXG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodmVyc2lvbikge1xuICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZIHx8IHZlcnNpb24gPT09IEFOWSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGNvbXAsIG9wdGlvbnMpIHtcbiAgaWYgKCEoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHZhciByYW5nZVRtcFxuXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnJykge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmFuZ2VUbXAgPSBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucylcbiAgICByZXR1cm4gc2F0aXNmaWVzKHRoaXMudmFsdWUsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9IGVsc2UgaWYgKGNvbXAub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgaWYgKGNvbXAudmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByYW5nZVRtcCA9IG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKVxuICAgIHJldHVybiBzYXRpc2ZpZXMoY29tcC5zZW12ZXIsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9XG5cbiAgdmFyIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJz49JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPicpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuICB2YXIgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gIHZhciBzYW1lU2VtVmVyID0gdGhpcy5zZW12ZXIudmVyc2lvbiA9PT0gY29tcC5zZW12ZXIudmVyc2lvblxuICB2YXIgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzw9JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPD0nKVxuICB2YXIgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gPVxuICAgIGNtcCh0aGlzLnNlbXZlciwgJzwnLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAoKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPD0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8JykpXG4gIHZhciBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhbiA9XG4gICAgY21wKHRoaXMuc2VtdmVyLCAnPicsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICgodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKSlcblxuICByZXR1cm4gc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgfHwgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgfHxcbiAgICAoc2FtZVNlbVZlciAmJiBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlKSB8fFxuICAgIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuIHx8IG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuXG59XG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZVxuZnVuY3Rpb24gUmFuZ2UgKHJhbmdlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XG4gICAgaWYgKHJhbmdlLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgcmFuZ2UuaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgcmV0dXJuIHJhbmdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnZhbHVlLCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH1cblxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2VcbiAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpXG4gIH0sIHRoaXMpLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGhcbiAgfSlcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpXG4gIH1cblxuICB0aGlzLmZvcm1hdCgpXG59XG5cblJhbmdlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24gKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKClcbiAgfSkuam9pbignfHwnKS50cmltKClcbiAgcmV0dXJuIHRoaXMucmFuZ2Vcbn1cblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZVxufVxuXG5SYW5nZS5wcm90b3R5cGUucGFyc2VSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLm9wdGlvbnMubG9vc2VcbiAgcmFuZ2UgPSByYW5nZS50cmltKClcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV1cbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKGhyLCBoeXBoZW5SZXBsYWNlKVxuICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSlcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSlcbiAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVtDT01QQVJBVE9SVFJJTV0pXG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtUSUxERVRSSU1dLCB0aWxkZVRyaW1SZXBsYWNlKVxuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcblxuICAvLyBub3JtYWxpemUgc3BhY2VzXG4gIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJylcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXVxuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucylcbiAgfSwgdGhpcykuam9pbignICcpLnNwbGl0KC9cXHMrLylcbiAgaWYgKHRoaXMub3B0aW9ucy5sb29zZSkge1xuICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgc2V0ID0gc2V0LmZpbHRlcihmdW5jdGlvbiAoY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpXG4gICAgfSlcbiAgfVxuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucylcbiAgfSwgdGhpcylcblxuICByZXR1cm4gc2V0XG59XG5cblJhbmdlLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKHJhbmdlLCBvcHRpb25zKSB7XG4gIGlmICghKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBSYW5nZSBpcyByZXF1aXJlZCcpXG4gIH1cblxuICByZXR1cm4gdGhpcy5zZXQuc29tZShmdW5jdGlvbiAodGhpc0NvbXBhcmF0b3JzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzU2F0aXNmaWFibGUodGhpc0NvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgcmFuZ2Uuc2V0LnNvbWUoZnVuY3Rpb24gKHJhbmdlQ29tcGFyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBpc1NhdGlzZmlhYmxlKHJhbmdlQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgICAgdGhpc0NvbXBhcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uICh0aGlzQ29tcGFyYXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlQ29tcGFyYXRvcnMuZXZlcnkoZnVuY3Rpb24gKHJhbmdlQ29tcGFyYXRvcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9KVxufVxuXG4vLyB0YWtlIGEgc2V0IG9mIGNvbXBhcmF0b3JzIGFuZCBkZXRlcm1pbmUgd2hldGhlciB0aGVyZVxuLy8gZXhpc3RzIGEgdmVyc2lvbiB3aGljaCBjYW4gc2F0aXNmeSBpdFxuZnVuY3Rpb24gaXNTYXRpc2ZpYWJsZSAoY29tcGFyYXRvcnMsIG9wdGlvbnMpIHtcbiAgdmFyIHJlc3VsdCA9IHRydWVcbiAgdmFyIHJlbWFpbmluZ0NvbXBhcmF0b3JzID0gY29tcGFyYXRvcnMuc2xpY2UoKVxuICB2YXIgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuXG4gIHdoaWxlIChyZXN1bHQgJiYgcmVtYWluaW5nQ29tcGFyYXRvcnMubGVuZ3RoKSB7XG4gICAgcmVzdWx0ID0gcmVtYWluaW5nQ29tcGFyYXRvcnMuZXZlcnkoZnVuY3Rpb24gKG90aGVyQ29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIHRlc3RDb21wYXJhdG9yLmludGVyc2VjdHMob3RoZXJDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgIH0pXG5cbiAgICB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmV4cG9ydHMudG9Db21wYXJhdG9ycyA9IHRvQ29tcGFyYXRvcnNcbmZ1bmN0aW9uIHRvQ29tcGFyYXRvcnMgKHJhbmdlLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gY29tcC5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlXG4gICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpXG4gIH0pXG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmZ1bmN0aW9uIHBhcnNlQ29tcGFyYXRvciAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygnY29tcCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdjYXJldCcsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3N0YXJzJywgY29tcClcbiAgcmV0dXJuIGNvbXBcbn1cblxuZnVuY3Rpb24gaXNYIChpZCkge1xuICByZXR1cm4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonXG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzIChjb21wLCBvcHRpb25zKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZSAoY29tcCwgb3B0aW9ucykge1xuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIHZhciByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICAvLyB+MS4yID09ID49MS4yLjAgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH1cblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0IChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJylcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlIChjb21wLCBvcHRpb25zKSB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKVxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVtYUkFOR0VMT09TRV0gOiByZVtYUkFOR0VdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcilcbiAgICB2YXIgeE0gPSBpc1goTSlcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSlcbiAgICB2YXIgeHAgPSB4bSB8fCBpc1gocClcbiAgICB2YXIgYW55WCA9IHhwXG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpIHtcbiAgICAgIGd0bHQgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIHdlJ3JlIGluY2x1ZGluZyBwcmVyZWxlYXNlcyBpbiB0aGUgbWF0Y2gsIHRoZW4gd2UgbmVlZFxuICAgIC8vIHRvIGZpeCB0aGlzIHRvIC0wLCB0aGUgbG93ZXN0IHBvc3NpYmxlIHByZXJlbGVhc2UgdmFsdWVcbiAgICBwciA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyAnLTAnIDogJydcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAtMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyB3ZSBrbm93IHBhdGNoIGlzIGFuIHgsIGJlY2F1c2Ugd2UgaGF2ZSBhbnkgeCBhdCBhbGwuXG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pIHtcbiAgICAgICAgbSA9IDBcbiAgICAgIH1cbiAgICAgIHAgPSAwXG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgICBtID0gMFxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwclxuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAnICsgcHIgKyAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCcgKyBwclxuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCcgKyBwciArXG4gICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnICsgcHJcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldClcblxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmZ1bmN0aW9uIHJlcGxhY2VTdGFycyAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgb3B0aW9ucylcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJylcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UgKCQwLFxuICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuICBpZiAoaXNYKGZNKSkge1xuICAgIGZyb20gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWChmbSkpIHtcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnXG4gIH0gZWxzZSBpZiAoaXNYKGZwKSkge1xuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCdcbiAgfSBlbHNlIHtcbiAgICBmcm9tID0gJz49JyArIGZyb21cbiAgfVxuXG4gIGlmIChpc1godE0pKSB7XG4gICAgdG8gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWCh0bSkpIHtcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJ1xuICB9IGVsc2UgaWYgKGlzWCh0cCkpIHtcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJ1xuICB9IGVsc2UgaWYgKHRwcikge1xuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwclxuICB9IGVsc2Uge1xuICAgIHRvID0gJzw9JyArIHRvXG4gIH1cblxuICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpXG59XG5cbi8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcblJhbmdlLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gdGVzdFNldCAoc2V0LCB2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggJiYgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKVxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyXG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXNcbmZ1bmN0aW9uIHNhdGlzZmllcyAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nXG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdmFyIG1heCA9IG51bGxcbiAgdmFyIG1heFNWID0gbnVsbFxuICB0cnkge1xuICAgIHZhciByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtYXggfHwgbWF4U1YuY29tcGFyZSh2KSA9PT0gLTEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtYXgsIHYsIHRydWUpXG4gICAgICAgIG1heCA9IHZcbiAgICAgICAgbWF4U1YgPSBuZXcgU2VtVmVyKG1heCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXhcbn1cblxuZXhwb3J0cy5taW5TYXRpc2Z5aW5nID0gbWluU2F0aXNmeWluZ1xuZnVuY3Rpb24gbWluU2F0aXNmeWluZyAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSB7XG4gIHZhciBtaW4gPSBudWxsXG4gIHZhciBtaW5TViA9IG51bGxcbiAgdHJ5IHtcbiAgICB2YXIgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cblxuZXhwb3J0cy5taW5WZXJzaW9uID0gbWluVmVyc2lvblxuZnVuY3Rpb24gbWluVmVyc2lvbiAocmFuZ2UsIGxvb3NlKSB7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSlcblxuICB2YXIgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAtMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBudWxsXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgdmFyIGNvbXB2ZXIgPSBuZXcgU2VtVmVyKGNvbXBhcmF0b3Iuc2VtdmVyLnZlcnNpb24pXG4gICAgICBzd2l0Y2ggKGNvbXBhcmF0b3Iub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGNvbXB2ZXIucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucGF0Y2grK1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wdmVyLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdmVyLnJhdyA9IGNvbXB2ZXIuZm9ybWF0KClcbiAgICAgICAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgaWYgKCFtaW52ZXIgfHwgZ3QobWludmVyLCBjb21wdmVyKSkge1xuICAgICAgICAgICAgbWludmVyID0gY29tcHZlclxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgIC8qIElnbm9yZSBtYXhpbXVtIHZlcnNpb25zICovXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgb3BlcmF0aW9uOiAnICsgY29tcGFyYXRvci5vcGVyYXRvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKG1pbnZlciAmJiByYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlXG5mdW5jdGlvbiB2YWxpZFJhbmdlIChyYW5nZSwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuZXhwb3J0cy5sdHIgPSBsdHJcbmZ1bmN0aW9uIGx0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8Jywgb3B0aW9ucylcbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuZXhwb3J0cy5ndHIgPSBndHJcbmZ1bmN0aW9uIGd0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbn1cblxuZXhwb3J0cy5vdXRzaWRlID0gb3V0c2lkZVxuZnVuY3Rpb24gb3V0c2lkZSAodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIG9wdGlvbnMpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcFxuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndFxuICAgICAgbHRlZm4gPSBsdGVcbiAgICAgIGx0Zm4gPSBsdFxuICAgICAgY29tcCA9ICc+J1xuICAgICAgZWNvbXAgPSAnPj0nXG4gICAgICBicmVha1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0XG4gICAgICBsdGVmbiA9IGd0ZVxuICAgICAgbHRmbiA9IGd0XG4gICAgICBjb21wID0gJzwnXG4gICAgICBlY29tcCA9ICc8PSdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJylcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIHZhciBoaWdoID0gbnVsbFxuICAgIHZhciBsb3cgPSBudWxsXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvclxuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3JcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydHMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbmZ1bmN0aW9uIHByZXJlbGVhc2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGxcbn1cblxuZXhwb3J0cy5pbnRlcnNlY3RzID0gaW50ZXJzZWN0c1xuZnVuY3Rpb24gaW50ZXJzZWN0cyAocjEsIHIyLCBvcHRpb25zKSB7XG4gIHIxID0gbmV3IFJhbmdlKHIxLCBvcHRpb25zKVxuICByMiA9IG5ldyBSYW5nZShyMiwgb3B0aW9ucylcbiAgcmV0dXJuIHIxLmludGVyc2VjdHMocjIpXG59XG5cbmV4cG9ydHMuY29lcmNlID0gY29lcmNlXG5mdW5jdGlvbiBjb2VyY2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnbnVtYmVyJykge1xuICAgIHZlcnNpb24gPSBTdHJpbmcodmVyc2lvbilcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgbWF0Y2ggPSBudWxsXG4gIGlmICghb3B0aW9ucy5ydGwpIHtcbiAgICBtYXRjaCA9IHZlcnNpb24ubWF0Y2gocmVbQ09FUkNFXSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5kIHRoZSByaWdodC1tb3N0IGNvZXJjaWJsZSBzdHJpbmcgdGhhdCBkb2VzIG5vdCBzaGFyZVxuICAgIC8vIGEgdGVybWludXMgd2l0aCBhIG1vcmUgbGVmdC13YXJkIGNvZXJjaWJsZSBzdHJpbmcuXG4gICAgLy8gRWcsICcxLjIuMy40JyB3YW50cyB0byBjb2VyY2UgJzIuMy40Jywgbm90ICczLjQnIG9yICc0J1xuICAgIC8vXG4gICAgLy8gV2FsayB0aHJvdWdoIHRoZSBzdHJpbmcgY2hlY2tpbmcgd2l0aCBhIC9nIHJlZ2V4cFxuICAgIC8vIE1hbnVhbGx5IHNldCB0aGUgaW5kZXggc28gYXMgdG8gcGljayB1cCBvdmVybGFwcGluZyBtYXRjaGVzLlxuICAgIC8vIFN0b3Agd2hlbiB3ZSBnZXQgYSBtYXRjaCB0aGF0IGVuZHMgYXQgdGhlIHN0cmluZyBlbmQsIHNpbmNlIG5vXG4gICAgLy8gY29lcmNpYmxlIHN0cmluZyBjYW4gYmUgbW9yZSByaWdodC13YXJkIHdpdGhvdXQgdGhlIHNhbWUgdGVybWludXMuXG4gICAgdmFyIG5leHRcbiAgICB3aGlsZSAoKG5leHQgPSByZVtDT0VSQ0VSVExdLmV4ZWModmVyc2lvbikpICYmXG4gICAgICAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoICE9PSB2ZXJzaW9uLmxlbmd0aClcbiAgICApIHtcbiAgICAgIGlmICghbWF0Y2ggfHxcbiAgICAgICAgICBuZXh0LmluZGV4ICsgbmV4dFswXS5sZW5ndGggIT09IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoID0gbmV4dFxuICAgICAgfVxuICAgICAgcmVbQ09FUkNFUlRMXS5sYXN0SW5kZXggPSBuZXh0LmluZGV4ICsgbmV4dFsxXS5sZW5ndGggKyBuZXh0WzJdLmxlbmd0aFxuICAgIH1cbiAgICAvLyBsZWF2ZSBpdCBpbiBhIGNsZWFuIHN0YXRlXG4gICAgcmVbQ09FUkNFUlRMXS5sYXN0SW5kZXggPSAtMVxuICB9XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiBwYXJzZShtYXRjaFsyXSArXG4gICAgJy4nICsgKG1hdGNoWzNdIHx8ICcwJykgK1xuICAgICcuJyArIChtYXRjaFs0XSB8fCAnMCcpLCBvcHRpb25zKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqICBDb252ZXJzaW9uIFV0aWxpdGllc1xuICpcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG5leHBvcnRzLkFkZHJlc3NaZXJvID0gJzB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCc7XG5leHBvcnRzLkhhc2haZXJvID0gJzB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCc7XG5mdW5jdGlvbiBpc0JpZ051bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiB0eXBlc18xLkJpZ051bWJlcik7XG59XG5mdW5jdGlvbiBhZGRTbGljZShhcnJheSkge1xuICAgIGlmIChhcnJheS5zbGljZSkge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIGFycmF5LnNsaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJyYXksIGFyZ3MpKTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGlzQXJyYXlpc2godmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHBhcnNlSW50KFN0cmluZyh2YWx1ZS5sZW5ndGgpKSAhPSB2YWx1ZS5sZW5ndGggfHwgdHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdiA9IHZhbHVlW2ldO1xuICAgICAgICBpZiAodiA8IDAgfHwgdiA+PSAyNTYgfHwgcGFyc2VJbnQoU3RyaW5nKHYpKSAhPSB2KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmlzQXJyYXlpc2ggPSBpc0FycmF5aXNoO1xuZnVuY3Rpb24gYXJyYXlpZnkodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignY2Fubm90IGNvbnZlcnQgbnVsbCB2YWx1ZSB0byBhcnJheScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7IGFyZzogJ3ZhbHVlJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgIH1cbiAgICBpZiAoaXNCaWdOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9IZXhTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXigweCk/WzAtOWEtZkEtRl0qJC8pO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBoZXhpZGVjaW1hbCBzdHJpbmcnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hbMV0gIT09ICcweCcpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdoZXggc3RyaW5nIG11c3QgaGF2ZSAweCBwcmVmaXgnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygyKTtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAlIDIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gJzAnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludCh2YWx1ZS5zdWJzdHIoaSwgMiksIDE2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZFNsaWNlKG5ldyBVaW50OEFycmF5KHJlc3VsdCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXlpc2godmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBhZGRTbGljZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgIH1cbiAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBhcnJheWlmeSB2YWx1ZScsIG51bGwsIHsgYXJnOiAndmFsdWUnLCB2YWx1ZTogdmFsdWUsIHR5cGU6IHR5cGVvZiAodmFsdWUpIH0pO1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5hcnJheWlmeSA9IGFycmF5aWZ5O1xuZnVuY3Rpb24gY29uY2F0KG9iamVjdHMpIHtcbiAgICB2YXIgYXJyYXlzID0gW107XG4gICAgdmFyIGxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSBhcnJheWlmeShvYmplY3RzW2ldKTtcbiAgICAgICAgYXJyYXlzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgbGVuZ3RoICs9IG9iamVjdC5sZW5ndGg7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5zZXQoYXJyYXlzW2ldLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gYXJyYXlzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGFkZFNsaWNlKHJlc3VsdCk7XG59XG5leHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcbmZ1bmN0aW9uIHN0cmlwWmVyb3ModmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYXJyYXlpZnkodmFsdWUpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIEZpbmQgdGhlIGZpcnN0IG5vbi16ZXJvIGVudHJ5XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICB3aGlsZSAocmVzdWx0W3N0YXJ0XSA9PT0gMCkge1xuICAgICAgICBzdGFydCsrO1xuICAgIH1cbiAgICAvLyBJZiB3ZSBzdGFydGVkIHdpdGggemVyb3MsIHN0cmlwIHRoZW1cbiAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKHN0YXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuc3RyaXBaZXJvcyA9IHN0cmlwWmVyb3M7XG5mdW5jdGlvbiBwYWRaZXJvcyh2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgdmFsdWUgPSBhcnJheWlmeSh2YWx1ZSk7XG4gICAgaWYgKGxlbmd0aCA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBwYWQnKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgcmVzdWx0LnNldCh2YWx1ZSwgbGVuZ3RoIC0gdmFsdWUubGVuZ3RoKTtcbiAgICByZXR1cm4gYWRkU2xpY2UocmVzdWx0KTtcbn1cbmV4cG9ydHMucGFkWmVyb3MgPSBwYWRaZXJvcztcbmZ1bmN0aW9uIGlzSGV4U3RyaW5nKHZhbHVlLCBsZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mICh2YWx1ZSkgIT09ICdzdHJpbmcnIHx8ICF2YWx1ZS5tYXRjaCgvXjB4WzAtOUEtRmEtZl0qJC8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggIT09IDIgKyAyICogbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmlzSGV4U3RyaW5nID0gaXNIZXhTdHJpbmc7XG52YXIgSGV4Q2hhcmFjdGVycyA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcbmZ1bmN0aW9uIGhleGxpZnkodmFsdWUpIHtcbiAgICBpZiAoaXNCaWdOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b0hleFN0cmluZygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdjYW5ub3QgaGV4bGlmeSBuZWdhdGl2ZSB2YWx1ZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7IGFyZzogJ3ZhbHVlJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoZXggPSAnJztcbiAgICAgICAgd2hpbGUgKHZhbHVlKSB7XG4gICAgICAgICAgICBoZXggPSBIZXhDaGFyYWN0ZXJzW3ZhbHVlICYgMHgwZl0gKyBoZXg7XG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUgLyAxNik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhleC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoZXgubGVuZ3RoICUgMikge1xuICAgICAgICAgICAgICAgIGhleCA9ICcwJyArIGhleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnMHgnICsgaGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnMHgwMCc7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gdmFsdWUubWF0Y2goL14oMHgpP1swLTlhLWZBLUZdKiQvKTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgaGV4aWRlY2ltYWwgc3RyaW5nJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHsgYXJnOiAndmFsdWUnLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoWzFdICE9PSAnMHgnKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaGV4IHN0cmluZyBtdXN0IGhhdmUgMHggcHJlZml4JywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHsgYXJnOiAndmFsdWUnLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAlIDIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gJzB4MCcgKyB2YWx1ZS5zdWJzdHJpbmcoMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheWlzaCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goSGV4Q2hhcmFjdGVyc1sodiAmIDB4ZjApID4+IDRdICsgSGV4Q2hhcmFjdGVyc1t2ICYgMHgwZl0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnMHgnICsgcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBoZXhsaWZ5IHZhbHVlJywgbnVsbCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICByZXR1cm4gJ25ldmVyJztcbn1cbmV4cG9ydHMuaGV4bGlmeSA9IGhleGxpZnk7XG5mdW5jdGlvbiBoZXhEYXRhTGVuZ3RoKGRhdGEpIHtcbiAgICBpZiAoIWlzSGV4U3RyaW5nKGRhdGEpIHx8IChkYXRhLmxlbmd0aCAlIDIpICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGEubGVuZ3RoIC0gMikgLyAyO1xufVxuZXhwb3J0cy5oZXhEYXRhTGVuZ3RoID0gaGV4RGF0YUxlbmd0aDtcbmZ1bmN0aW9uIGhleERhdGFTbGljZShkYXRhLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgIGlmICghaXNIZXhTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgaGV4IGRhdGEnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiBkYXRhIH0pO1xuICAgIH1cbiAgICBpZiAoKGRhdGEubGVuZ3RoICUgMikgIT09IDApIHtcbiAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2hleCBkYXRhIGxlbmd0aCBtdXN0IGJlIGV2ZW4nLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiBkYXRhIH0pO1xuICAgIH1cbiAgICBvZmZzZXQgPSAyICsgMiAqIG9mZnNldDtcbiAgICBpZiAobGVuZ3RoICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcweCcgKyBkYXRhLnN1YnN0cmluZyhvZmZzZXQsIG9mZnNldCArIDIgKiBsZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gJzB4JyArIGRhdGEuc3Vic3RyaW5nKG9mZnNldCk7XG59XG5leHBvcnRzLmhleERhdGFTbGljZSA9IGhleERhdGFTbGljZTtcbmZ1bmN0aW9uIGhleFN0cmlwWmVyb3ModmFsdWUpIHtcbiAgICBpZiAoIWlzSGV4U3RyaW5nKHZhbHVlKSkge1xuICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBoZXggc3RyaW5nJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHsgYXJnOiAndmFsdWUnLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgfVxuICAgIHdoaWxlICh2YWx1ZS5sZW5ndGggPiAzICYmIHZhbHVlLnN1YnN0cmluZygwLCAzKSA9PT0gJzB4MCcpIHtcbiAgICAgICAgdmFsdWUgPSAnMHgnICsgdmFsdWUuc3Vic3RyaW5nKDMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnRzLmhleFN0cmlwWmVyb3MgPSBoZXhTdHJpcFplcm9zO1xuZnVuY3Rpb24gaGV4WmVyb1BhZCh2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgaWYgKCFpc0hleFN0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgaGV4IHN0cmluZycsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7IGFyZzogJ3ZhbHVlJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgIH1cbiAgICB3aGlsZSAodmFsdWUubGVuZ3RoIDwgMiAqIGxlbmd0aCArIDIpIHtcbiAgICAgICAgdmFsdWUgPSAnMHgwJyArIHZhbHVlLnN1YnN0cmluZygyKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0cy5oZXhaZXJvUGFkID0gaGV4WmVyb1BhZDtcbmZ1bmN0aW9uIGlzU2lnbmF0dXJlKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZS5yICE9IG51bGwgJiYgdmFsdWUucyAhPSBudWxsKTtcbn1cbmZ1bmN0aW9uIHNwbGl0U2lnbmF0dXJlKHNpZ25hdHVyZSkge1xuICAgIHZhciB2ID0gMDtcbiAgICB2YXIgciA9ICcweCcsIHMgPSAnMHgnO1xuICAgIGlmIChpc1NpZ25hdHVyZShzaWduYXR1cmUpKSB7XG4gICAgICAgIGlmIChzaWduYXR1cmUudiA9PSBudWxsICYmIHNpZ25hdHVyZS5yZWNvdmVyeVBhcmFtID09IG51bGwpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdhdCBsZWFzdCBvbiBvZiByZWNvdmVyeVBhcmFtIG9yIHYgbXVzdCBiZSBzcGVjaWZpZWQnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmd1bWVudDogJ3NpZ25hdHVyZScsIHZhbHVlOiBzaWduYXR1cmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgciA9IGhleFplcm9QYWQoc2lnbmF0dXJlLnIsIDMyKTtcbiAgICAgICAgcyA9IGhleFplcm9QYWQoc2lnbmF0dXJlLnMsIDMyKTtcbiAgICAgICAgdiA9IHNpZ25hdHVyZS52O1xuICAgICAgICBpZiAodHlwZW9mICh2KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHYgPSBwYXJzZUludCh2LCAxNik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY292ZXJ5UGFyYW0gPSBzaWduYXR1cmUucmVjb3ZlcnlQYXJhbTtcbiAgICAgICAgaWYgKHJlY292ZXJ5UGFyYW0gPT0gbnVsbCAmJiBzaWduYXR1cmUudiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWNvdmVyeVBhcmFtID0gMSAtICh2ICUgMik7XG4gICAgICAgIH1cbiAgICAgICAgdiA9IDI3ICsgcmVjb3ZlcnlQYXJhbTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBieXRlcyA9IGFycmF5aWZ5KHNpZ25hdHVyZSk7XG4gICAgICAgIGlmIChieXRlcy5sZW5ndGggIT09IDY1KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2lnbmF0dXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgciA9IGhleGxpZnkoYnl0ZXMuc2xpY2UoMCwgMzIpKTtcbiAgICAgICAgcyA9IGhleGxpZnkoYnl0ZXMuc2xpY2UoMzIsIDY0KSk7XG4gICAgICAgIHYgPSBieXRlc1s2NF07XG4gICAgICAgIGlmICh2ICE9PSAyNyAmJiB2ICE9PSAyOCkge1xuICAgICAgICAgICAgdiA9IDI3ICsgKHYgJSAyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByOiByLFxuICAgICAgICBzOiBzLFxuICAgICAgICByZWNvdmVyeVBhcmFtOiAodiAtIDI3KSxcbiAgICAgICAgdjogdlxuICAgIH07XG59XG5leHBvcnRzLnNwbGl0U2lnbmF0dXJlID0gc3BsaXRTaWduYXR1cmU7XG5mdW5jdGlvbiBqb2luU2lnbmF0dXJlKHNpZ25hdHVyZSkge1xuICAgIHNpZ25hdHVyZSA9IHNwbGl0U2lnbmF0dXJlKHNpZ25hdHVyZSk7XG4gICAgcmV0dXJuIGhleGxpZnkoY29uY2F0KFtcbiAgICAgICAgc2lnbmF0dXJlLnIsXG4gICAgICAgIHNpZ25hdHVyZS5zLFxuICAgICAgICAoc2lnbmF0dXJlLnJlY292ZXJ5UGFyYW0gPyAnMHgxYycgOiAnMHgxYicpXG4gICAgXSkpO1xufVxuZXhwb3J0cy5qb2luU2lnbmF0dXJlID0gam9pblNpZ25hdHVyZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUkVHSVNUUlkgPSBbXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcInJlc29sdmVyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcIm93bmVyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJvd25lclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJzZXRTdWJub2RlT3duZXJcIixcbiAgICAgICAgXCJvdXRwdXRzXCI6IFtdLFxuICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwidHRsXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDY0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwic2V0VFRMXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwidHRsXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDY0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJlc29sdmVyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcInNldFJlc29sdmVyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm93bmVyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcInNldE93bmVyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiYW5vbnltb3VzXCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImluZGV4ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwib3duZXJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwiVHJhbnNmZXJcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZXZlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImFub255bW91c1wiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm93bmVyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcIk5ld093bmVyXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImV2ZW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJhbm9ueW1vdXNcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImluZGV4ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyZXNvbHZlclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJOZXdSZXNvbHZlclwiLFxuICAgICAgICBcInR5cGVcIjogXCJldmVudFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiYW5vbnltb3VzXCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImluZGV4ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwidHRsXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDY0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwiTmV3VFRMXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImV2ZW50XCJcbiAgICB9XG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJFR0lTVFJZO1xuIiwiLypcbiBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuXG4gd2ViMy5qcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gd2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGNvcmUgPSByZXF1aXJlKCd3ZWIzLWNvcmUnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnd2ViMy1jb3JlLWhlbHBlcnMnKTtcbnZhciBTdWJzY3JpcHRpb25zID0gcmVxdWlyZSgnd2ViMy1jb3JlLXN1YnNjcmlwdGlvbnMnKS5zdWJzY3JpcHRpb25zO1xudmFyIE1ldGhvZCA9IHJlcXVpcmUoJ3dlYjMtY29yZS1tZXRob2QnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ3dlYjMtdXRpbHMnKTtcbnZhciBOZXQgPSByZXF1aXJlKCd3ZWIzLW5ldCcpO1xuXG52YXIgRU5TID0gcmVxdWlyZSgnd2ViMy1ldGgtZW5zJyk7XG52YXIgUGVyc29uYWwgPSByZXF1aXJlKCd3ZWIzLWV0aC1wZXJzb25hbCcpO1xudmFyIEJhc2VDb250cmFjdCA9IHJlcXVpcmUoJ3dlYjMtZXRoLWNvbnRyYWN0Jyk7XG52YXIgSWJhbiA9IHJlcXVpcmUoJ3dlYjMtZXRoLWliYW4nKTtcbnZhciBBY2NvdW50cyA9IHJlcXVpcmUoJ3dlYjMtZXRoLWFjY291bnRzJyk7XG52YXIgYWJpID0gcmVxdWlyZSgnd2ViMy1ldGgtYWJpJyk7XG5cbnZhciBnZXROZXR3b3JrVHlwZSA9IHJlcXVpcmUoJy4vZ2V0TmV0d29ya1R5cGUuanMnKTtcbnZhciBmb3JtYXR0ZXIgPSBoZWxwZXJzLmZvcm1hdHRlcnM7XG5cblxudmFyIGJsb2NrQ2FsbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIChfLmlzU3RyaW5nKGFyZ3NbMF0pICYmIGFyZ3NbMF0uaW5kZXhPZignMHgnKSA9PT0gMCkgPyBcImV0aF9nZXRCbG9ja0J5SGFzaFwiIDogXCJldGhfZ2V0QmxvY2tCeU51bWJlclwiO1xufTtcblxudmFyIHRyYW5zYWN0aW9uRnJvbUJsb2NrQ2FsbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIChfLmlzU3RyaW5nKGFyZ3NbMF0pICYmIGFyZ3NbMF0uaW5kZXhPZignMHgnKSA9PT0gMCkgPyAnZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja0hhc2hBbmRJbmRleCcgOiAnZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja051bWJlckFuZEluZGV4Jztcbn07XG5cbnZhciB1bmNsZUNhbGwgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHJldHVybiAoXy5pc1N0cmluZyhhcmdzWzBdKSAmJiBhcmdzWzBdLmluZGV4T2YoJzB4JykgPT09IDApID8gJ2V0aF9nZXRVbmNsZUJ5QmxvY2tIYXNoQW5kSW5kZXgnIDogJ2V0aF9nZXRVbmNsZUJ5QmxvY2tOdW1iZXJBbmRJbmRleCc7XG59O1xuXG52YXIgZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50Q2FsbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIChfLmlzU3RyaW5nKGFyZ3NbMF0pICYmIGFyZ3NbMF0uaW5kZXhPZignMHgnKSA9PT0gMCkgPyAnZXRoX2dldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5SGFzaCcgOiAnZXRoX2dldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5TnVtYmVyJztcbn07XG5cbnZhciB1bmNsZUNvdW50Q2FsbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIChfLmlzU3RyaW5nKGFyZ3NbMF0pICYmIGFyZ3NbMF0uaW5kZXhPZignMHgnKSA9PT0gMCkgPyAnZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrSGFzaCcgOiAnZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrTnVtYmVyJztcbn07XG5cblxudmFyIEV0aCA9IGZ1bmN0aW9uIEV0aCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gc2V0cyBfcmVxdWVzdG1hbmFnZXJcbiAgICBjb3JlLnBhY2thZ2VJbml0KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBvdmVyd3JpdGUgc2V0UHJvdmlkZXJcbiAgICB2YXIgc2V0UHJvdmlkZXIgPSB0aGlzLnNldFByb3ZpZGVyO1xuICAgIHRoaXMuc2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFByb3ZpZGVyLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBfdGhpcy5uZXQuc2V0UHJvdmlkZXIuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIF90aGlzLnBlcnNvbmFsLnNldFByb3ZpZGVyLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBfdGhpcy5hY2NvdW50cy5zZXRQcm92aWRlci5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgX3RoaXMuQ29udHJhY3Quc2V0UHJvdmlkZXIoX3RoaXMuY3VycmVudFByb3ZpZGVyLCBfdGhpcy5hY2NvdW50cyk7XG4gICAgfTtcblxuXG4gICAgdmFyIGRlZmF1bHRBY2NvdW50ID0gbnVsbDtcbiAgICB2YXIgZGVmYXVsdEJsb2NrID0gJ2xhdGVzdCc7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlZmF1bHRBY2NvdW50Jywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QWNjb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZih2YWwpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWNjb3VudCA9IHV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGZvcm1hdHRlci5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIodmFsKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFsc28gc2V0IG9uIHRoZSBDb250cmFjdCBvYmplY3RcbiAgICAgICAgICAgIF90aGlzLkNvbnRyYWN0LmRlZmF1bHRBY2NvdW50ID0gZGVmYXVsdEFjY291bnQ7XG4gICAgICAgICAgICBfdGhpcy5wZXJzb25hbC5kZWZhdWx0QWNjb3VudCA9IGRlZmF1bHRBY2NvdW50O1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZGVmYXVsdEJsb2NrXG4gICAgICAgICAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmRlZmF1bHRBY2NvdW50ID0gZGVmYXVsdEFjY291bnQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdEJsb2NrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QmxvY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgZGVmYXVsdEJsb2NrID0gdmFsO1xuICAgICAgICAgICAgLy8gYWxzbyBzZXQgb24gdGhlIENvbnRyYWN0IG9iamVjdFxuICAgICAgICAgICAgX3RoaXMuQ29udHJhY3QuZGVmYXVsdEJsb2NrID0gZGVmYXVsdEJsb2NrO1xuICAgICAgICAgICAgX3RoaXMucGVyc29uYWwuZGVmYXVsdEJsb2NrID0gZGVmYXVsdEJsb2NrO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZGVmYXVsdEJsb2NrXG4gICAgICAgICAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmRlZmF1bHRCbG9jayA9IGRlZmF1bHRCbG9jaztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cblxuICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb25zID0gX3RoaXMuX3JlcXVlc3RNYW5hZ2VyLmNsZWFyU3Vic2NyaXB0aW9ucztcblxuICAgIC8vIGFkZCBuZXRcbiAgICB0aGlzLm5ldCA9IG5ldyBOZXQodGhpcy5jdXJyZW50UHJvdmlkZXIpO1xuICAgIC8vIGFkZCBjaGFpbiBkZXRlY3Rpb25cbiAgICB0aGlzLm5ldC5nZXROZXR3b3JrVHlwZSA9IGdldE5ldHdvcmtUeXBlLmJpbmQodGhpcyk7XG5cbiAgICAvLyBhZGQgYWNjb3VudHNcbiAgICB0aGlzLmFjY291bnRzID0gbmV3IEFjY291bnRzKHRoaXMuY3VycmVudFByb3ZpZGVyKTtcblxuICAgIC8vIGFkZCBwZXJzb25hbFxuICAgIHRoaXMucGVyc29uYWwgPSBuZXcgUGVyc29uYWwodGhpcy5jdXJyZW50UHJvdmlkZXIpO1xuICAgIHRoaXMucGVyc29uYWwuZGVmYXVsdEFjY291bnQgPSB0aGlzLmRlZmF1bHRBY2NvdW50O1xuXG4gICAgLy8gY3JlYXRlIGEgcHJveHkgQ29udHJhY3QgdHlwZSBmb3IgdGhpcyBpbnN0YW5jZSwgYXMgYSBDb250cmFjdCdzIHByb3ZpZGVyXG4gICAgLy8gaXMgc3RvcmVkIGFzIGEgY2xhc3MgbWVtYmVyIHJhdGhlciB0aGFuIGFuIGluc3RhbmNlIHZhcmlhYmxlLiBJZiB3ZSBkb1xuICAgIC8vIG5vdCBjcmVhdGUgdGhpcyBwcm94eSB0eXBlLCBjaGFuZ2luZyB0aGUgcHJvdmlkZXIgaW4gb25lIGluc3RhbmNlIG9mXG4gICAgLy8gd2ViMy1ldGggd291bGQgc3Vic2VxdWVudGx5IGNoYW5nZSB0aGUgcHJvdmlkZXIgZm9yIF9hbGxfIGNvbnRyYWN0XG4gICAgLy8gaW5zdGFuY2VzIVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgQ29udHJhY3QgPSBmdW5jdGlvbiBDb250cmFjdCgpIHtcbiAgICAgICAgQmFzZUNvbnRyYWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgLy8gd2hlbiBFdGguc2V0UHJvdmlkZXIgaXMgY2FsbGVkLCBjYWxsIHBhY2thZ2VJbml0XG4gICAgICAgIC8vIG9uIGFsbCBjb250cmFjdCBpbnN0YW5jZXMgaW5zdGFudGlhdGVkIHZpYSB0aGlzIEV0aFxuICAgICAgICAvLyBpbnN0YW5jZXMuIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGN1cnJlbnRQcm92aWRlciBmb3JcbiAgICAgICAgLy8gdGhlIGNvbnRyYWN0IGluc3RhbmNlc1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2V0UHJvdmlkZXIgPSBzZWxmLnNldFByb3ZpZGVyO1xuICAgICAgICBzZWxmLnNldFByb3ZpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2V0UHJvdmlkZXIuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICBjb3JlLnBhY2thZ2VJbml0KF90aGlzLCBbc2VsZi5jdXJyZW50UHJvdmlkZXJdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgQ29udHJhY3Quc2V0UHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgQmFzZUNvbnRyYWN0LnNldFByb3ZpZGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIG1ha2Ugb3VyIHByb3h5IENvbnRyYWN0IGluaGVyaXQgZnJvbSB3ZWIzLWV0aC1jb250cmFjdCBzbyB0aGF0IGl0IGhhcyBhbGxcbiAgICAvLyB0aGUgcmlnaHQgZnVuY3Rpb25hbGl0eSBhbmQgc28gdGhhdCBpbnN0YW5jZW9mIGFuZCBmcmllbmRzIHdvcmsgcHJvcGVybHlcbiAgICBDb250cmFjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VDb250cmFjdC5wcm90b3R5cGUpO1xuICAgIENvbnRyYWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnRyYWN0O1xuXG4gICAgLy8gYWRkIGNvbnRyYWN0XG4gICAgdGhpcy5Db250cmFjdCA9IENvbnRyYWN0O1xuICAgIHRoaXMuQ29udHJhY3QuZGVmYXVsdEFjY291bnQgPSB0aGlzLmRlZmF1bHRBY2NvdW50O1xuICAgIHRoaXMuQ29udHJhY3QuZGVmYXVsdEJsb2NrID0gdGhpcy5kZWZhdWx0QmxvY2s7XG4gICAgdGhpcy5Db250cmFjdC5zZXRQcm92aWRlcih0aGlzLmN1cnJlbnRQcm92aWRlciwgdGhpcy5hY2NvdW50cyk7XG5cbiAgICAvLyBhZGQgSUJBTlxuICAgIHRoaXMuSWJhbiA9IEliYW47XG5cbiAgICAvLyBhZGQgQUJJXG4gICAgdGhpcy5hYmkgPSBhYmk7XG5cbiAgICAvLyBhZGQgRU5TXG4gICAgdGhpcy5lbnMgPSBuZXcgRU5TKHRoaXMpO1xuXG4gICAgdmFyIG1ldGhvZHMgPSBbXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldE5vZGVJbmZvJyxcbiAgICAgICAgICAgIGNhbGw6ICd3ZWIzX2NsaWVudFZlcnNpb24nXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRQcm90b2NvbFZlcnNpb24nLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9wcm90b2NvbFZlcnNpb24nLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRDb2luYmFzZScsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2NvaW5iYXNlJyxcbiAgICAgICAgICAgIHBhcmFtczogMFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnaXNNaW5pbmcnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9taW5pbmcnLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRIYXNocmF0ZScsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2hhc2hyYXRlJyxcbiAgICAgICAgICAgIHBhcmFtczogMCxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMuaGV4VG9OdW1iZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2lzU3luY2luZycsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX3N5bmNpbmcnLFxuICAgICAgICAgICAgcGFyYW1zOiAwLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXIub3V0cHV0U3luY2luZ0Zvcm1hdHRlclxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0R2FzUHJpY2UnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9nYXNQcmljZScsXG4gICAgICAgICAgICBwYXJhbXM6IDAsXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IGZvcm1hdHRlci5vdXRwdXRCaWdOdW1iZXJGb3JtYXR0ZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldEFjY291bnRzJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfYWNjb3VudHMnLFxuICAgICAgICAgICAgcGFyYW1zOiAwLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiB1dGlscy50b0NoZWNrc3VtQWRkcmVzc1xuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0QmxvY2tOdW1iZXInLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9ibG9ja051bWJlcicsXG4gICAgICAgICAgICBwYXJhbXM6IDAsXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IHV0aWxzLmhleFRvTnVtYmVyXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRCYWxhbmNlJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfZ2V0QmFsYW5jZScsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIsIGZvcm1hdHRlci5pbnB1dERlZmF1bHRCbG9ja051bWJlckZvcm1hdHRlcl0sXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IGZvcm1hdHRlci5vdXRwdXRCaWdOdW1iZXJGb3JtYXR0ZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldFN0b3JhZ2VBdCcsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2dldFN0b3JhZ2VBdCcsXG4gICAgICAgICAgICBwYXJhbXM6IDMsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIsIHV0aWxzLm51bWJlclRvSGV4LCBmb3JtYXR0ZXIuaW5wdXREZWZhdWx0QmxvY2tOdW1iZXJGb3JtYXR0ZXJdXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRDb2RlJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfZ2V0Q29kZScsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dEFkZHJlc3NGb3JtYXR0ZXIsIGZvcm1hdHRlci5pbnB1dERlZmF1bHRCbG9ja051bWJlckZvcm1hdHRlcl1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldEJsb2NrJyxcbiAgICAgICAgICAgIGNhbGw6IGJsb2NrQ2FsbCxcbiAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVyLmlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXIsIGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuICEhdmFsOyB9XSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogZm9ybWF0dGVyLm91dHB1dEJsb2NrRm9ybWF0dGVyXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRVbmNsZScsXG4gICAgICAgICAgICBjYWxsOiB1bmNsZUNhbGwsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dEJsb2NrTnVtYmVyRm9ybWF0dGVyLCB1dGlscy5udW1iZXJUb0hleF0sXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IGZvcm1hdHRlci5vdXRwdXRCbG9ja0Zvcm1hdHRlcixcblxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50JyxcbiAgICAgICAgICAgIGNhbGw6IGdldEJsb2NrVHJhbnNhY3Rpb25Db3VudENhbGwsXG4gICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dEJsb2NrTnVtYmVyRm9ybWF0dGVyXSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMuaGV4VG9OdW1iZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldEJsb2NrVW5jbGVDb3VudCcsXG4gICAgICAgICAgICBjYWxsOiB1bmNsZUNvdW50Q2FsbCxcbiAgICAgICAgICAgIHBhcmFtczogMSxcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVyLmlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXJdLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiB1dGlscy5oZXhUb051bWJlclxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5SGFzaCcsXG4gICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW251bGxdLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXIub3V0cHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldFRyYW5zYWN0aW9uRnJvbUJsb2NrJyxcbiAgICAgICAgICAgIGNhbGw6IHRyYW5zYWN0aW9uRnJvbUJsb2NrQ2FsbCxcbiAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVyLmlucHV0QmxvY2tOdW1iZXJGb3JtYXR0ZXIsIHV0aWxzLm51bWJlclRvSGV4XSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogZm9ybWF0dGVyLm91dHB1dFRyYW5zYWN0aW9uRm9ybWF0dGVyXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRUcmFuc2FjdGlvblJlY2VpcHQnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQnLFxuICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtudWxsXSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogZm9ybWF0dGVyLm91dHB1dFRyYW5zYWN0aW9uUmVjZWlwdEZvcm1hdHRlclxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0VHJhbnNhY3Rpb25Db3VudCcsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2dldFRyYW5zYWN0aW9uQ291bnQnLFxuICAgICAgICAgICAgcGFyYW1zOiAyLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXIuaW5wdXRBZGRyZXNzRm9ybWF0dGVyLCBmb3JtYXR0ZXIuaW5wdXREZWZhdWx0QmxvY2tOdW1iZXJGb3JtYXR0ZXJdLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiB1dGlscy5oZXhUb051bWJlclxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnc2VuZFNpZ25lZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfc2VuZFJhd1RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIHBhcmFtczogMSxcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbbnVsbF1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ3NpZ25UcmFuc2FjdGlvbicsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX3NpZ25UcmFuc2FjdGlvbicsXG4gICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dFRyYW5zYWN0aW9uRm9ybWF0dGVyXVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIHBhcmFtczogMSxcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVyLmlucHV0VHJhbnNhY3Rpb25Gb3JtYXR0ZXJdXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdzaWduJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfc2lnbicsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dFNpZ25Gb3JtYXR0ZXIsIGZvcm1hdHRlci5pbnB1dEFkZHJlc3NGb3JtYXR0ZXJdLFxuICAgICAgICAgICAgdHJhbnNmb3JtUGF5bG9hZDogZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnBhcmFtcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdjYWxsJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfY2FsbCcsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dENhbGxGb3JtYXR0ZXIsIGZvcm1hdHRlci5pbnB1dERlZmF1bHRCbG9ja051bWJlckZvcm1hdHRlcl1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2VzdGltYXRlR2FzJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfZXN0aW1hdGVHYXMnLFxuICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXIuaW5wdXRDYWxsRm9ybWF0dGVyXSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMuaGV4VG9OdW1iZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ3N1Ym1pdFdvcmsnLFxuICAgICAgICAgICAgY2FsbDogJ2V0aF9zdWJtaXRXb3JrJyxcbiAgICAgICAgICAgIHBhcmFtczogM1xuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0V29yaycsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2dldFdvcmsnLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRQYXN0TG9ncycsXG4gICAgICAgICAgICBjYWxsOiAnZXRoX2dldExvZ3MnLFxuICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXIuaW5wdXRMb2dGb3JtYXR0ZXJdLFxuICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXIub3V0cHV0TG9nRm9ybWF0dGVyXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgbmV3IFN1YnNjcmlwdGlvbnMoe1xuICAgICAgICAgICAgbmFtZTogJ3N1YnNjcmliZScsXG4gICAgICAgICAgICB0eXBlOiAnZXRoJyxcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAnbmV3QmxvY2tIZWFkZXJzJzoge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIHJlbmFtZSBvbiBSUEMgc2lkZT9cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uTmFtZTogJ25ld0hlYWRzJywgLy8gcmVwbGFjZSBzdWJzY3JpcHRpb24gd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiAwLFxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IGZvcm1hdHRlci5vdXRwdXRCbG9ja0Zvcm1hdHRlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3BlbmRpbmdUcmFuc2FjdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbk5hbWU6ICduZXdQZW5kaW5nVHJhbnNhY3Rpb25zJywgLy8gcmVwbGFjZSBzdWJzY3JpcHRpb24gd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbG9ncyc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlci5pbnB1dExvZ0Zvcm1hdHRlcl0sXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogZm9ybWF0dGVyLm91dHB1dExvZ0Zvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgLy8gRFVCTElDQVRFLCBhbHNvIGluIHdlYjMtZXRoLWNvbnRyYWN0XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkhhbmRsZXI6IGZ1bmN0aW9uIChvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG91dHB1dC5yZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2VkJywgb3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgb3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgb3V0cHV0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3N5bmNpbmcnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogMCxcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXIub3V0cHV0U3luY2luZ0Zvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uSGFuZGxlcjogZnVuY3Rpb24gKG91dHB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlyZSBUUlVFIGF0IHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9pc1N5bmNpbmcgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1N5bmNpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlZCcsIF90aGlzLl9pc1N5bmNpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKG51bGwsIF90aGlzLl9pc1N5bmNpbmcsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KCdkYXRhJywgb3V0cHV0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKF90aGlzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2sobnVsbCwgb3V0cHV0LCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpcmUgc3luYyBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgb3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKF90aGlzLmNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKG51bGwsIG91dHB1dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2FpdCBmb3Igc29tZSB0aW1lIGJlZm9yZSBmaXJlaW5nIHRoZSBGQUxTRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9pc1N5bmNpbmdUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1N5bmNpbmdUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG91dHB1dC5jdXJyZW50QmxvY2sgPiBvdXRwdXQuaGlnaGVzdEJsb2NrIC0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5faXNTeW5jaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KCdjaGFuZ2VkJywgX3RoaXMuX2lzU3luY2luZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oX3RoaXMuY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2sobnVsbCwgX3RoaXMuX2lzU3luY2luZywgX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICBdO1xuXG4gICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuYXR0YWNoVG9PYmplY3QoX3RoaXMpO1xuICAgICAgICBtZXRob2Quc2V0UmVxdWVzdE1hbmFnZXIoX3RoaXMuX3JlcXVlc3RNYW5hZ2VyLCBfdGhpcy5hY2NvdW50cyk7IC8vIHNlY29uZCBwYXJhbSBtZWFucyBpcyBldGguYWNjb3VudHMgKG5lY2Vzc2FyeSBmb3Igd2FsbGV0IHNpZ25pbmcpXG4gICAgICAgIG1ldGhvZC5kZWZhdWx0QmxvY2sgPSBfdGhpcy5kZWZhdWx0QmxvY2s7XG4gICAgICAgIG1ldGhvZC5kZWZhdWx0QWNjb3VudCA9IF90aGlzLmRlZmF1bHRBY2NvdW50O1xuICAgIH0pO1xuXG59O1xuXG5jb3JlLmFkZFByb3ZpZGVycyhFdGgpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gRXRoO1xuXG4iLCIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKlxuICogQGZpbGUgYWNjb3VudHMuanNcbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF8gPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnd2ViMy1jb3JlJyk7XG52YXIgTWV0aG9kID0gcmVxdWlyZSgnd2ViMy1jb3JlLW1ldGhvZCcpO1xudmFyIFByb21pc2UgPSByZXF1aXJlKCdhbnktcHJvbWlzZScpO1xudmFyIEFjY291bnQgPSByZXF1aXJlKFwiZXRoLWxpYi9saWIvYWNjb3VudFwiKTtcbnZhciBIYXNoID0gcmVxdWlyZShcImV0aC1saWIvbGliL2hhc2hcIik7XG52YXIgUkxQID0gcmVxdWlyZShcImV0aC1saWIvbGliL3JscFwiKTtcbnZhciBOYXQgPSByZXF1aXJlKFwiZXRoLWxpYi9saWIvbmF0XCIpO1xudmFyIEJ5dGVzID0gcmVxdWlyZShcImV0aC1saWIvbGliL2J5dGVzXCIpO1xudmFyIGNyeXAgPSAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcpID8gcmVxdWlyZSgnY3J5cHRvLWJyb3dzZXJpZnknKSA6IHJlcXVpcmUoJ2NyeXB0bycpO1xudmFyIHNjcnlwdCA9IHJlcXVpcmUoJy4vc2NyeXB0Jyk7XG52YXIgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ3dlYjMtdXRpbHMnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnd2ViMy1jb3JlLWhlbHBlcnMnKTtcblxudmFyIGlzTm90ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKF8uaXNVbmRlZmluZWQodmFsdWUpIHx8IF8uaXNOdWxsKHZhbHVlKSk7XG59O1xuXG52YXIgdHJpbUxlYWRpbmdaZXJvID0gZnVuY3Rpb24gKGhleCkge1xuICAgIHdoaWxlIChoZXggJiYgaGV4LnN0YXJ0c1dpdGgoJzB4MCcpKSB7XG4gICAgICAgIGhleCA9ICcweCcgKyBoZXguc2xpY2UoMyk7XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG59O1xuXG52YXIgbWFrZUV2ZW4gPSBmdW5jdGlvbiAoaGV4KSB7XG4gICAgaWYoaGV4Lmxlbmd0aCAlIDIgPT09IDEpIHtcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoJzB4JywgJzB4MCcpO1xuICAgIH1cbiAgICByZXR1cm4gaGV4O1xufTtcblxuXG52YXIgQWNjb3VudHMgPSBmdW5jdGlvbiBBY2NvdW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gc2V0cyBfcmVxdWVzdG1hbmFnZXJcbiAgICBjb3JlLnBhY2thZ2VJbml0KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyByZW1vdmUgdW5lY2Vzc2FyeSBjb3JlIGZ1bmN0aW9uc1xuICAgIGRlbGV0ZSB0aGlzLkJhdGNoUmVxdWVzdDtcbiAgICBkZWxldGUgdGhpcy5leHRlbmQ7XG5cbiAgICB2YXIgX2V0aGVyZXVtQ2FsbCA9IFtcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0SWQnLFxuICAgICAgICAgICAgY2FsbDogJ25ldF92ZXJzaW9uJyxcbiAgICAgICAgICAgIHBhcmFtczogMCxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMuaGV4VG9OdW1iZXJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldEdhc1ByaWNlJyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfZ2FzUHJpY2UnLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRUcmFuc2FjdGlvbkNvdW50JyxcbiAgICAgICAgICAgIGNhbGw6ICdldGhfZ2V0VHJhbnNhY3Rpb25Db3VudCcsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Z1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzQWRkcmVzcyhhZGRyZXNzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWRkcmVzcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FkZHJlc3MgJysgYWRkcmVzcyArJyBpcyBub3QgYSB2YWxpZCBhZGRyZXNzIHRvIGdldCB0aGUgXCJ0cmFuc2FjdGlvbkNvdW50XCIuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2xhdGVzdCc7IH1dXG4gICAgICAgIH0pXG4gICAgXTtcbiAgICAvLyBhdHRhY2ggbWV0aG9kcyB0byB0aGlzLl9ldGhlcmV1bUNhbGxcbiAgICB0aGlzLl9ldGhlcmV1bUNhbGwgPSB7fTtcbiAgICBfLmVhY2goX2V0aGVyZXVtQ2FsbCwgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuYXR0YWNoVG9PYmplY3QoX3RoaXMuX2V0aGVyZXVtQ2FsbCk7XG4gICAgICAgIG1ldGhvZC5zZXRSZXF1ZXN0TWFuYWdlcihfdGhpcy5fcmVxdWVzdE1hbmFnZXIpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLndhbGxldCA9IG5ldyBXYWxsZXQodGhpcyk7XG59O1xuXG5BY2NvdW50cy5wcm90b3R5cGUuX2FkZEFjY291bnRGdW5jdGlvbnMgPSBmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBhZGQgc2lnbiBmdW5jdGlvbnNcbiAgICBhY2NvdW50LnNpZ25UcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIHNpZ25UcmFuc2FjdGlvbih0eCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnNpZ25UcmFuc2FjdGlvbih0eCwgYWNjb3VudC5wcml2YXRlS2V5LCBjYWxsYmFjayk7XG4gICAgfTtcbiAgICBhY2NvdW50LnNpZ24gPSBmdW5jdGlvbiBzaWduKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnNpZ24oZGF0YSwgYWNjb3VudC5wcml2YXRlS2V5KTtcbiAgICB9O1xuXG4gICAgYWNjb3VudC5lbmNyeXB0ID0gZnVuY3Rpb24gZW5jcnlwdChwYXNzd29yZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX3RoaXMuZW5jcnlwdChhY2NvdW50LnByaXZhdGVLZXksIHBhc3N3b3JkLCBvcHRpb25zKTtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gYWNjb3VudDtcbn07XG5cbkFjY291bnRzLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoZW50cm9weSkge1xuICAgIHJldHVybiB0aGlzLl9hZGRBY2NvdW50RnVuY3Rpb25zKEFjY291bnQuY3JlYXRlKGVudHJvcHkgfHwgdXRpbHMucmFuZG9tSGV4KDMyKSkpO1xufTtcblxuQWNjb3VudHMucHJvdG90eXBlLnByaXZhdGVLZXlUb0FjY291bnQgPSBmdW5jdGlvbiBwcml2YXRlS2V5VG9BY2NvdW50KHByaXZhdGVLZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkQWNjb3VudEZ1bmN0aW9ucyhBY2NvdW50LmZyb21Qcml2YXRlKHByaXZhdGVLZXkpKTtcbn07XG5cbkFjY291bnRzLnByb3RvdHlwZS5zaWduVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiBzaWduVHJhbnNhY3Rpb24odHgsIHByaXZhdGVLZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgZXJyb3IgPSBmYWxzZSxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblxuICAgIGlmICghdHgpIHtcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ05vIHRyYW5zYWN0aW9uIG9iamVjdCBnaXZlbiEnKTtcblxuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2lnbmVkICh0eCkge1xuXG4gICAgICAgIGlmICghdHguZ2FzICYmICF0eC5nYXNMaW1pdCkge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ1wiZ2FzXCIgaXMgbWlzc2luZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR4Lm5vbmNlICA8IDAgfHxcbiAgICAgICAgICAgIHR4LmdhcyAgPCAwIHx8XG4gICAgICAgICAgICB0eC5nYXNQcmljZSAgPCAwIHx8XG4gICAgICAgICAgICB0eC5jaGFpbklkICA8IDApIHtcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKCdHYXMsIGdhc1ByaWNlLCBub25jZSBvciBjaGFpbklkIGlzIGxvd2VyIHRoYW4gMCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHR4ID0gaGVscGVycy5mb3JtYXR0ZXJzLmlucHV0Q2FsbEZvcm1hdHRlcih0eCk7XG5cbiAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IHR4O1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24udG8gPSB0eC50byB8fCAnMHgnO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24uZGF0YSA9IHR4LmRhdGEgfHwgJzB4JztcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLnZhbHVlID0gdHgudmFsdWUgfHwgJzB4JztcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLmNoYWluSWQgPSB1dGlscy5udW1iZXJUb0hleCh0eC5jaGFpbklkKTtcblxuICAgICAgICAgICAgdmFyIHJscEVuY29kZWQgPSBSTFAuZW5jb2RlKFtcbiAgICAgICAgICAgICAgICBCeXRlcy5mcm9tTmF0KHRyYW5zYWN0aW9uLm5vbmNlKSxcbiAgICAgICAgICAgICAgICBCeXRlcy5mcm9tTmF0KHRyYW5zYWN0aW9uLmdhc1ByaWNlKSxcbiAgICAgICAgICAgICAgICBCeXRlcy5mcm9tTmF0KHRyYW5zYWN0aW9uLmdhcyksXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24udG8udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICBCeXRlcy5mcm9tTmF0KHRyYW5zYWN0aW9uLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5kYXRhLFxuICAgICAgICAgICAgICAgIEJ5dGVzLmZyb21OYXQodHJhbnNhY3Rpb24uY2hhaW5JZCB8fCBcIjB4MVwiKSxcbiAgICAgICAgICAgICAgICBcIjB4XCIsXG4gICAgICAgICAgICAgICAgXCIweFwiXSk7XG5cblxuICAgICAgICAgICAgdmFyIGhhc2ggPSBIYXNoLmtlY2NhazI1NihybHBFbmNvZGVkKTtcblxuICAgICAgICAgICAgdmFyIHNpZ25hdHVyZSA9IEFjY291bnQubWFrZVNpZ25lcihOYXQudG9OdW1iZXIodHJhbnNhY3Rpb24uY2hhaW5JZCB8fCBcIjB4MVwiKSAqIDIgKyAzNSkoSGFzaC5rZWNjYWsyNTYocmxwRW5jb2RlZCksIHByaXZhdGVLZXkpO1xuXG4gICAgICAgICAgICB2YXIgcmF3VHggPSBSTFAuZGVjb2RlKHJscEVuY29kZWQpLnNsaWNlKDAsIDYpLmNvbmNhdChBY2NvdW50LmRlY29kZVNpZ25hdHVyZShzaWduYXR1cmUpKTtcblxuICAgICAgICAgICAgcmF3VHhbNl0gPSBtYWtlRXZlbih0cmltTGVhZGluZ1plcm8ocmF3VHhbNl0pKTtcbiAgICAgICAgICAgIHJhd1R4WzddID0gbWFrZUV2ZW4odHJpbUxlYWRpbmdaZXJvKHJhd1R4WzddKSk7XG4gICAgICAgICAgICByYXdUeFs4XSA9IG1ha2VFdmVuKHRyaW1MZWFkaW5nWmVybyhyYXdUeFs4XSkpO1xuXG4gICAgICAgICAgICB2YXIgcmF3VHJhbnNhY3Rpb24gPSBSTFAuZW5jb2RlKHJhd1R4KTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFJMUC5kZWNvZGUocmF3VHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VIYXNoOiBoYXNoLFxuICAgICAgICAgICAgICAgIHY6IHRyaW1MZWFkaW5nWmVybyh2YWx1ZXNbNl0pLFxuICAgICAgICAgICAgICAgIHI6IHRyaW1MZWFkaW5nWmVybyh2YWx1ZXNbN10pLFxuICAgICAgICAgICAgICAgIHM6IHRyaW1MZWFkaW5nWmVybyh2YWx1ZXNbOF0pLFxuICAgICAgICAgICAgICAgIHJhd1RyYW5zYWN0aW9uOiByYXdUcmFuc2FjdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBSZXNvbHZlIGltbWVkaWF0ZWx5IGlmIG5vbmNlLCBjaGFpbklkIGFuZCBwcmljZSBhcmUgcHJvdmlkZWRcbiAgICBpZiAodHgubm9uY2UgIT09IHVuZGVmaW5lZCAmJiB0eC5jaGFpbklkICE9PSB1bmRlZmluZWQgJiYgdHguZ2FzUHJpY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNpZ25lZCh0eCkpO1xuICAgIH1cblxuXG4gICAgLy8gT3RoZXJ3aXNlLCBnZXQgdGhlIG1pc3NpbmcgaW5mbyBmcm9tIHRoZSBFdGhlcmV1bSBOb2RlXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgaXNOb3QodHguY2hhaW5JZCkgPyBfdGhpcy5fZXRoZXJldW1DYWxsLmdldElkKCkgOiB0eC5jaGFpbklkLFxuICAgICAgICBpc05vdCh0eC5nYXNQcmljZSkgPyBfdGhpcy5fZXRoZXJldW1DYWxsLmdldEdhc1ByaWNlKCkgOiB0eC5nYXNQcmljZSxcbiAgICAgICAgaXNOb3QodHgubm9uY2UpID8gX3RoaXMuX2V0aGVyZXVtQ2FsbC5nZXRUcmFuc2FjdGlvbkNvdW50KF90aGlzLnByaXZhdGVLZXlUb0FjY291bnQocHJpdmF0ZUtleSkuYWRkcmVzcykgOiB0eC5ub25jZVxuICAgIF0pLnRoZW4oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKGlzTm90KGFyZ3NbMF0pIHx8IGlzTm90KGFyZ3NbMV0pIHx8IGlzTm90KGFyZ3NbMl0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09uZSBvZiB0aGUgdmFsdWVzIFwiY2hhaW5JZFwiLCBcImdhc1ByaWNlXCIsIG9yIFwibm9uY2VcIiBjb3VsZG5cXCd0IGJlIGZldGNoZWQ6ICcrIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2lnbmVkKF8uZXh0ZW5kKHR4LCB7Y2hhaW5JZDogYXJnc1swXSwgZ2FzUHJpY2U6IGFyZ3NbMV0sIG5vbmNlOiBhcmdzWzJdfSkpO1xuICAgIH0pO1xufTtcblxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuQWNjb3VudHMucHJvdG90eXBlLnJlY292ZXJUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIHJlY292ZXJUcmFuc2FjdGlvbihyYXdUeCkge1xuICAgIHZhciB2YWx1ZXMgPSBSTFAuZGVjb2RlKHJhd1R4KTtcbiAgICB2YXIgc2lnbmF0dXJlID0gQWNjb3VudC5lbmNvZGVTaWduYXR1cmUodmFsdWVzLnNsaWNlKDYsOSkpO1xuICAgIHZhciByZWNvdmVyeSA9IEJ5dGVzLnRvTnVtYmVyKHZhbHVlc1s2XSk7XG4gICAgdmFyIGV4dHJhRGF0YSA9IHJlY292ZXJ5IDwgMzUgPyBbXSA6IFtCeXRlcy5mcm9tTnVtYmVyKChyZWNvdmVyeSAtIDM1KSA+PiAxKSwgXCIweFwiLCBcIjB4XCJdO1xuICAgIHZhciBzaWduaW5nRGF0YSA9IHZhbHVlcy5zbGljZSgwLDYpLmNvbmNhdChleHRyYURhdGEpO1xuICAgIHZhciBzaWduaW5nRGF0YUhleCA9IFJMUC5lbmNvZGUoc2lnbmluZ0RhdGEpO1xuICAgIHJldHVybiBBY2NvdW50LnJlY292ZXIoSGFzaC5rZWNjYWsyNTYoc2lnbmluZ0RhdGFIZXgpLCBzaWduYXR1cmUpO1xufTtcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cbkFjY291bnRzLnByb3RvdHlwZS5oYXNoTWVzc2FnZSA9IGZ1bmN0aW9uIGhhc2hNZXNzYWdlKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHV0aWxzLmlzSGV4U3RyaWN0KGRhdGEpID8gdXRpbHMuaGV4VG9CeXRlcyhkYXRhKSA6IGRhdGE7XG4gICAgdmFyIG1lc3NhZ2VCdWZmZXIgPSBCdWZmZXIuZnJvbShtZXNzYWdlKTtcbiAgICB2YXIgcHJlYW1ibGUgPSBcIlxceDE5RXRoZXJldW0gU2lnbmVkIE1lc3NhZ2U6XFxuXCIgKyBtZXNzYWdlLmxlbmd0aDtcbiAgICB2YXIgcHJlYW1ibGVCdWZmZXIgPSBCdWZmZXIuZnJvbShwcmVhbWJsZSk7XG4gICAgdmFyIGV0aE1lc3NhZ2UgPSBCdWZmZXIuY29uY2F0KFtwcmVhbWJsZUJ1ZmZlciwgbWVzc2FnZUJ1ZmZlcl0pO1xuICAgIHJldHVybiBIYXNoLmtlY2NhazI1NnMoZXRoTWVzc2FnZSk7XG59O1xuXG5BY2NvdW50cy5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24oZGF0YSwgcHJpdmF0ZUtleSkge1xuICAgIHZhciBoYXNoID0gdGhpcy5oYXNoTWVzc2FnZShkYXRhKTtcbiAgICB2YXIgc2lnbmF0dXJlID0gQWNjb3VudC5zaWduKGhhc2gsIHByaXZhdGVLZXkpO1xuICAgIHZhciB2cnMgPSBBY2NvdW50LmRlY29kZVNpZ25hdHVyZShzaWduYXR1cmUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG1lc3NhZ2U6IGRhdGEsXG4gICAgICAgIG1lc3NhZ2VIYXNoOiBoYXNoLFxuICAgICAgICB2OiB2cnNbMF0sXG4gICAgICAgIHI6IHZyc1sxXSxcbiAgICAgICAgczogdnJzWzJdLFxuICAgICAgICBzaWduYXR1cmU6IHNpZ25hdHVyZVxuICAgIH07XG59O1xuXG5BY2NvdW50cy5wcm90b3R5cGUucmVjb3ZlciA9IGZ1bmN0aW9uIHJlY292ZXIobWVzc2FnZSwgc2lnbmF0dXJlLCBwcmVGaXhlZCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuYXBwbHkoYXJndW1lbnRzKTtcblxuXG4gICAgaWYgKF8uaXNPYmplY3QobWVzc2FnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjb3ZlcihtZXNzYWdlLm1lc3NhZ2VIYXNoLCBBY2NvdW50LmVuY29kZVNpZ25hdHVyZShbbWVzc2FnZS52LCBtZXNzYWdlLnIsIG1lc3NhZ2Uuc10pLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXByZUZpeGVkKSB7XG4gICAgICAgIG1lc3NhZ2UgPSB0aGlzLmhhc2hNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIHByZUZpeGVkID0gYXJncy5zbGljZSgtMSlbMF07XG4gICAgICAgIHByZUZpeGVkID0gXy5pc0Jvb2xlYW4ocHJlRml4ZWQpID8gISFwcmVGaXhlZCA6IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlY292ZXIobWVzc2FnZSwgQWNjb3VudC5lbmNvZGVTaWduYXR1cmUoYXJncy5zbGljZSgxLCA0KSksIHByZUZpeGVkKTsgLy8gdiwgciwgc1xuICAgIH1cbiAgICByZXR1cm4gQWNjb3VudC5yZWNvdmVyKG1lc3NhZ2UsIHNpZ25hdHVyZSk7XG59O1xuXG4vLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bWpzL2V0aGVyZXVtanMtd2FsbGV0XG5BY2NvdW50cy5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uICh2M0tleXN0b3JlLCBwYXNzd29yZCwgbm9uU3RyaWN0KSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6IDEwICovXG5cbiAgICBpZighXy5pc1N0cmluZyhwYXNzd29yZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXNzd29yZCBnaXZlbi4nKTtcbiAgICB9XG5cbiAgICB2YXIganNvbiA9IChfLmlzT2JqZWN0KHYzS2V5c3RvcmUpKSA/IHYzS2V5c3RvcmUgOiBKU09OLnBhcnNlKG5vblN0cmljdCA/IHYzS2V5c3RvcmUudG9Mb3dlckNhc2UoKSA6IHYzS2V5c3RvcmUpO1xuXG4gICAgaWYgKGpzb24udmVyc2lvbiAhPT0gMykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIFYzIHdhbGxldCcpO1xuICAgIH1cblxuICAgIHZhciBkZXJpdmVkS2V5O1xuICAgIHZhciBrZGZwYXJhbXM7XG4gICAgaWYgKGpzb24uY3J5cHRvLmtkZiA9PT0gJ3NjcnlwdCcpIHtcbiAgICAgICAga2RmcGFyYW1zID0ganNvbi5jcnlwdG8ua2RmcGFyYW1zO1xuXG4gICAgICAgIC8vIEZJWE1FOiBzdXBwb3J0IHByb2dyZXNzIHJlcG9ydGluZyBjYWxsYmFja1xuICAgICAgICBkZXJpdmVkS2V5ID0gc2NyeXB0KEJ1ZmZlci5mcm9tKHBhc3N3b3JkKSwgQnVmZmVyLmZyb20oa2RmcGFyYW1zLnNhbHQsICdoZXgnKSwga2RmcGFyYW1zLm4sIGtkZnBhcmFtcy5yLCBrZGZwYXJhbXMucCwga2RmcGFyYW1zLmRrbGVuKTtcbiAgICB9IGVsc2UgaWYgKGpzb24uY3J5cHRvLmtkZiA9PT0gJ3Bia2RmMicpIHtcbiAgICAgICAga2RmcGFyYW1zID0ganNvbi5jcnlwdG8ua2RmcGFyYW1zO1xuXG4gICAgICAgIGlmIChrZGZwYXJhbXMucHJmICE9PSAnaG1hYy1zaGEyNTYnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHBhcmFtZXRlcnMgdG8gUEJLREYyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXJpdmVkS2V5ID0gY3J5cC5wYmtkZjJTeW5jKEJ1ZmZlci5mcm9tKHBhc3N3b3JkKSwgQnVmZmVyLmZyb20oa2RmcGFyYW1zLnNhbHQsICdoZXgnKSwga2RmcGFyYW1zLmMsIGtkZnBhcmFtcy5ka2xlbiwgJ3NoYTI1NicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQga2V5IGRlcml2YXRpb24gc2NoZW1lJyk7XG4gICAgfVxuXG4gICAgdmFyIGNpcGhlcnRleHQgPSBCdWZmZXIuZnJvbShqc29uLmNyeXB0by5jaXBoZXJ0ZXh0LCAnaGV4Jyk7XG5cbiAgICB2YXIgbWFjID0gdXRpbHMuc2hhMyhCdWZmZXIuY29uY2F0KFsgZGVyaXZlZEtleS5zbGljZSgxNiwgMzIpLCBjaXBoZXJ0ZXh0IF0pKS5yZXBsYWNlKCcweCcsJycpO1xuICAgIGlmIChtYWMgIT09IGpzb24uY3J5cHRvLm1hYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBkZXJpdmF0aW9uIGZhaWxlZCAtIHBvc3NpYmx5IHdyb25nIHBhc3N3b3JkJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlY2lwaGVyID0gY3J5cC5jcmVhdGVEZWNpcGhlcml2KGpzb24uY3J5cHRvLmNpcGhlciwgZGVyaXZlZEtleS5zbGljZSgwLCAxNiksIEJ1ZmZlci5mcm9tKGpzb24uY3J5cHRvLmNpcGhlcnBhcmFtcy5pdiwgJ2hleCcpKTtcbiAgICB2YXIgc2VlZCA9ICcweCcrIEJ1ZmZlci5jb25jYXQoWyBkZWNpcGhlci51cGRhdGUoY2lwaGVydGV4dCksIGRlY2lwaGVyLmZpbmFsKCkgXSkudG9TdHJpbmcoJ2hleCcpO1xuXG4gICAgcmV0dXJuIHRoaXMucHJpdmF0ZUtleVRvQWNjb3VudChzZWVkKTtcbn07XG5cbkFjY291bnRzLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24gKHByaXZhdGVLZXksIHBhc3N3b3JkLCBvcHRpb25zKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6IDIwICovXG4gICAgdmFyIGFjY291bnQgPSB0aGlzLnByaXZhdGVLZXlUb0FjY291bnQocHJpdmF0ZUtleSk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgc2FsdCA9IG9wdGlvbnMuc2FsdCB8fCBjcnlwLnJhbmRvbUJ5dGVzKDMyKTtcbiAgICB2YXIgaXYgPSBvcHRpb25zLml2IHx8IGNyeXAucmFuZG9tQnl0ZXMoMTYpO1xuXG4gICAgdmFyIGRlcml2ZWRLZXk7XG4gICAgdmFyIGtkZiA9IG9wdGlvbnMua2RmIHx8ICdzY3J5cHQnO1xuICAgIHZhciBrZGZwYXJhbXMgPSB7XG4gICAgICAgIGRrbGVuOiBvcHRpb25zLmRrbGVuIHx8IDMyLFxuICAgICAgICBzYWx0OiBzYWx0LnRvU3RyaW5nKCdoZXgnKVxuICAgIH07XG5cbiAgICBpZiAoa2RmID09PSAncGJrZGYyJykge1xuICAgICAgICBrZGZwYXJhbXMuYyA9IG9wdGlvbnMuYyB8fCAyNjIxNDQ7XG4gICAgICAgIGtkZnBhcmFtcy5wcmYgPSAnaG1hYy1zaGEyNTYnO1xuICAgICAgICBkZXJpdmVkS2V5ID0gY3J5cC5wYmtkZjJTeW5jKEJ1ZmZlci5mcm9tKHBhc3N3b3JkKSwgQnVmZmVyLmZyb20oa2RmcGFyYW1zLnNhbHQsICdoZXgnKSwga2RmcGFyYW1zLmMsIGtkZnBhcmFtcy5ka2xlbiwgJ3NoYTI1NicpO1xuICAgIH0gZWxzZSBpZiAoa2RmID09PSAnc2NyeXB0Jykge1xuICAgICAgICAvLyBGSVhNRTogc3VwcG9ydCBwcm9ncmVzcyByZXBvcnRpbmcgY2FsbGJhY2tcbiAgICAgICAga2RmcGFyYW1zLm4gPSBvcHRpb25zLm4gfHwgODE5MjsgLy8gMjA0OCA0MDk2IDgxOTIgMTYzODRcbiAgICAgICAga2RmcGFyYW1zLnIgPSBvcHRpb25zLnIgfHwgODtcbiAgICAgICAga2RmcGFyYW1zLnAgPSBvcHRpb25zLnAgfHwgMTtcbiAgICAgICAgZGVyaXZlZEtleSA9IHNjcnlwdChCdWZmZXIuZnJvbShwYXNzd29yZCksIEJ1ZmZlci5mcm9tKGtkZnBhcmFtcy5zYWx0LCAnaGV4JyksIGtkZnBhcmFtcy5uLCBrZGZwYXJhbXMuciwga2RmcGFyYW1zLnAsIGtkZnBhcmFtcy5ka2xlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZGYnKTtcbiAgICB9XG5cbiAgICB2YXIgY2lwaGVyID0gY3J5cC5jcmVhdGVDaXBoZXJpdihvcHRpb25zLmNpcGhlciB8fCAnYWVzLTEyOC1jdHInLCBkZXJpdmVkS2V5LnNsaWNlKDAsIDE2KSwgaXYpO1xuICAgIGlmICghY2lwaGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgY2lwaGVyJyk7XG4gICAgfVxuXG4gICAgdmFyIGNpcGhlcnRleHQgPSBCdWZmZXIuY29uY2F0KFsgY2lwaGVyLnVwZGF0ZShCdWZmZXIuZnJvbShhY2NvdW50LnByaXZhdGVLZXkucmVwbGFjZSgnMHgnLCcnKSwgJ2hleCcpKSwgY2lwaGVyLmZpbmFsKCkgXSk7XG5cbiAgICB2YXIgbWFjID0gdXRpbHMuc2hhMyhCdWZmZXIuY29uY2F0KFsgZGVyaXZlZEtleS5zbGljZSgxNiwgMzIpLCBCdWZmZXIuZnJvbShjaXBoZXJ0ZXh0LCAnaGV4JykgXSkpLnJlcGxhY2UoJzB4JywnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2ZXJzaW9uOiAzLFxuICAgICAgICBpZDogdXVpZC52NCh7IHJhbmRvbTogb3B0aW9ucy51dWlkIHx8IGNyeXAucmFuZG9tQnl0ZXMoMTYpIH0pLFxuICAgICAgICBhZGRyZXNzOiBhY2NvdW50LmFkZHJlc3MudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcweCcsJycpLFxuICAgICAgICBjcnlwdG86IHtcbiAgICAgICAgICAgIGNpcGhlcnRleHQ6IGNpcGhlcnRleHQudG9TdHJpbmcoJ2hleCcpLFxuICAgICAgICAgICAgY2lwaGVycGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgaXY6IGl2LnRvU3RyaW5nKCdoZXgnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNpcGhlcjogb3B0aW9ucy5jaXBoZXIgfHwgJ2Flcy0xMjgtY3RyJyxcbiAgICAgICAgICAgIGtkZjoga2RmLFxuICAgICAgICAgICAga2RmcGFyYW1zOiBrZGZwYXJhbXMsXG4gICAgICAgICAgICBtYWM6IG1hYy50b1N0cmluZygnaGV4JylcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cbi8vIE5vdGU6IHRoaXMgaXMgdHJ5aW5nIHRvIGZvbGxvdyBjbG9zZWx5IHRoZSBzcGVjcyBvblxuLy8gaHR0cDovL3dlYjNqcy5yZWFkdGhlZG9jcy5pby9lbi8xLjAvd2ViMy1ldGgtYWNjb3VudHMuaHRtbFxuXG5mdW5jdGlvbiBXYWxsZXQoYWNjb3VudHMpIHtcbiAgICB0aGlzLl9hY2NvdW50cyA9IGFjY291bnRzO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRlZmF1bHRLZXlOYW1lID0gXCJ3ZWIzanNfd2FsbGV0XCI7XG59XG5cbldhbGxldC5wcm90b3R5cGUuX2ZpbmRTYWZlSW5kZXggPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICAgIHBvaW50ZXIgPSBwb2ludGVyIHx8IDA7XG4gICAgaWYgKF8uaGFzKHRoaXMsIHBvaW50ZXIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maW5kU2FmZUluZGV4KHBvaW50ZXIgKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcG9pbnRlcjtcbiAgICB9XG59O1xuXG5XYWxsZXQucHJvdG90eXBlLl9jdXJyZW50SW5kZXhlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIHZhciBpbmRleGVzID0ga2V5c1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gcGFyc2VJbnQoa2V5KTsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihuKSB7IHJldHVybiAobiA8IDllMjApOyB9KTtcblxuICAgIHJldHVybiBpbmRleGVzO1xufTtcblxuV2FsbGV0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAobnVtYmVyT2ZBY2NvdW50cywgZW50cm9weSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZBY2NvdW50czsgKytpKSB7XG4gICAgICAgIHRoaXMuYWRkKHRoaXMuX2FjY291bnRzLmNyZWF0ZShlbnRyb3B5KS5wcml2YXRlS2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5XYWxsZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChhY2NvdW50KSB7XG5cbiAgICBpZiAoXy5pc1N0cmluZyhhY2NvdW50KSkge1xuICAgICAgICBhY2NvdW50ID0gdGhpcy5fYWNjb3VudHMucHJpdmF0ZUtleVRvQWNjb3VudChhY2NvdW50KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzW2FjY291bnQuYWRkcmVzc10pIHtcbiAgICAgICAgYWNjb3VudCA9IHRoaXMuX2FjY291bnRzLnByaXZhdGVLZXlUb0FjY291bnQoYWNjb3VudC5wcml2YXRlS2V5KTtcbiAgICAgICAgYWNjb3VudC5pbmRleCA9IHRoaXMuX2ZpbmRTYWZlSW5kZXgoKTtcblxuICAgICAgICB0aGlzW2FjY291bnQuaW5kZXhdID0gYWNjb3VudDtcbiAgICAgICAgdGhpc1thY2NvdW50LmFkZHJlc3NdID0gYWNjb3VudDtcbiAgICAgICAgdGhpc1thY2NvdW50LmFkZHJlc3MudG9Mb3dlckNhc2UoKV0gPSBhY2NvdW50O1xuXG4gICAgICAgIHRoaXMubGVuZ3RoKys7XG5cbiAgICAgICAgcmV0dXJuIGFjY291bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbYWNjb3VudC5hZGRyZXNzXTtcbiAgICB9XG59O1xuXG5XYWxsZXQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChhZGRyZXNzT3JJbmRleCkge1xuICAgIHZhciBhY2NvdW50ID0gdGhpc1thZGRyZXNzT3JJbmRleF07XG5cbiAgICBpZiAoYWNjb3VudCAmJiBhY2NvdW50LmFkZHJlc3MpIHtcbiAgICAgICAgLy8gYWRkcmVzc1xuICAgICAgICB0aGlzW2FjY291bnQuYWRkcmVzc10ucHJpdmF0ZUtleSA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2FjY291bnQuYWRkcmVzc107XG4gICAgICAgIC8vIGFkZHJlc3MgbG93ZXJjYXNlXG4gICAgICAgIHRoaXNbYWNjb3VudC5hZGRyZXNzLnRvTG93ZXJDYXNlKCldLnByaXZhdGVLZXkgPSBudWxsO1xuICAgICAgICBkZWxldGUgdGhpc1thY2NvdW50LmFkZHJlc3MudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIC8vIGluZGV4XG4gICAgICAgIHRoaXNbYWNjb3VudC5pbmRleF0ucHJpdmF0ZUtleSA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2FjY291bnQuaW5kZXhdO1xuXG4gICAgICAgIHRoaXMubGVuZ3RoLS07XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbldhbGxldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgaW5kZXhlcyA9IHRoaXMuX2N1cnJlbnRJbmRleGVzKCk7XG5cbiAgICBpbmRleGVzLmZvckVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgX3RoaXMucmVtb3ZlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuV2FsbGV0LnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgaW5kZXhlcyA9IHRoaXMuX2N1cnJlbnRJbmRleGVzKCk7XG5cbiAgICB2YXIgYWNjb3VudHMgPSBpbmRleGVzLm1hcChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXNbaW5kZXhdLmVuY3J5cHQocGFzc3dvcmQsIG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFjY291bnRzO1xufTtcblxuXG5XYWxsZXQucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbiAoZW5jcnlwdGVkV2FsbGV0LCBwYXNzd29yZCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBlbmNyeXB0ZWRXYWxsZXQuZm9yRWFjaChmdW5jdGlvbiAoa2V5c3RvcmUpIHtcbiAgICAgICAgdmFyIGFjY291bnQgPSBfdGhpcy5fYWNjb3VudHMuZGVjcnlwdChrZXlzdG9yZSwgcGFzc3dvcmQpO1xuXG4gICAgICAgIGlmIChhY2NvdW50KSB7XG4gICAgICAgICAgICBfdGhpcy5hZGQoYWNjb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkblxcJ3QgZGVjcnlwdCBhY2NvdW50cy4gUGFzc3dvcmQgd3Jvbmc/Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuV2FsbGV0LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBrZXlOYW1lKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5TmFtZSB8fCB0aGlzLmRlZmF1bHRLZXlOYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmVuY3J5cHQocGFzc3dvcmQpKSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbldhbGxldC5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChwYXNzd29yZCwga2V5TmFtZSkge1xuICAgIHZhciBrZXlzdG9yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleU5hbWUgfHwgdGhpcy5kZWZhdWx0S2V5TmFtZSk7XG5cbiAgICBpZiAoa2V5c3RvcmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGtleXN0b3JlID0gSlNPTi5wYXJzZShrZXlzdG9yZSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kZWNyeXB0KGtleXN0b3JlIHx8IFtdLCBwYXNzd29yZCk7XG59O1xuXG5pZiAodHlwZW9mIGxvY2FsU3RvcmFnZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZWxldGUgV2FsbGV0LnByb3RvdHlwZS5zYXZlO1xuICAgIGRlbGV0ZSBXYWxsZXQucHJvdG90eXBlLmxvYWQ7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUkVTT0xWRVIgPSBbXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJpbnRlcmZhY2VJRFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzNFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcInN1cHBvcnRzSW50ZXJmYWNlXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbnRlbnRUeXBlc1wiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJBQklcIixcbiAgICAgICAgXCJvdXRwdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb250ZW50VHlwZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiaGFzaFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwic2V0TXVsdGloYXNoXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcIm11bHRpaGFzaFwiLFxuICAgICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInlcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwic2V0UHVia2V5XCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwiY29udGVudFwiLFxuICAgICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJldFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJhZGRyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwicmV0XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb250ZW50VHlwZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJzZXRBQklcIixcbiAgICAgICAgXCJvdXRwdXRzXCI6IFtdLFxuICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJuYW1lXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwicmV0XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJzZXROYW1lXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImhhc2hcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwic2V0Q29udGVudFwiLFxuICAgICAgICBcIm91dHB1dHNcIjogW10sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcInB1YmtleVwiLFxuICAgICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYWRkclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJzZXRBZGRyXCIsXG4gICAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlbnNBZGRyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiY29uc3RydWN0b3JcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImFub255bW91c1wiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwiQWRkckNoYW5nZWRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZXZlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImFub255bW91c1wiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImhhc2hcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJuYW1lXCI6IFwiQ29udGVudENoYW5nZWRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZXZlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImFub255bW91c1wiOiBmYWxzZSxcbiAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJOYW1lQ2hhbmdlZFwiLFxuICAgICAgICBcInR5cGVcIjogXCJldmVudFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiYW5vbnltb3VzXCI6IGZhbHNlLFxuICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbmRleGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImluZGV4ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb250ZW50VHlwZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm5hbWVcIjogXCJBQklDaGFuZ2VkXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImV2ZW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJhbm9ueW1vdXNcIjogZmFsc2UsXG4gICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImluZGV4ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJub2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW5kZXhlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ5XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibmFtZVwiOiBcIlB1YmtleUNoYW5nZWRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZXZlbnRcIlxuICAgIH1cbl07XG5cbm1vZHVsZS5leHBvcnRzID0gUkVTT0xWRVI7XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBkZWZpbmVSZWFkT25seShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmaW5lUmVhZE9ubHkgPSBkZWZpbmVSZWFkT25seTtcbmZ1bmN0aW9uIGRlZmluZUZyb3plbihvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGZyb3plbiA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gSlNPTi5wYXJzZShmcm96ZW4pOyB9XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmluZUZyb3plbiA9IGRlZmluZUZyb3plbjtcbmZ1bmN0aW9uIHJlc29sdmVQcm9wZXJ0aWVzKG9iamVjdCkge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh2YWx1ZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVzb2x2ZVByb3BlcnRpZXMgPSByZXNvbHZlUHJvcGVydGllcztcbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KG9iamVjdCkge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLnNoYWxsb3dDb3B5ID0gc2hhbGxvd0NvcHk7XG5mdW5jdGlvbiBqc29uQ29weShvYmplY3QpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbn1cbmV4cG9ydHMuanNvbkNvcHkgPSBqc29uQ29weTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqICBCaWdOdW1iZXJcbiAqXG4gKiAgQSB3cmFwcGVyIGFyb3VuZCB0aGUgQk4uanMgb2JqZWN0LiBXZSB1c2UgdGhlIEJOLmpzIGxpYnJhcnlcbiAqICBiZWNhdXNlIGl0IGlzIHVzZWQgYnkgZWxsaXB0aWMsIHNvIGl0IGlzIHJlcXVpcmVkIHJlZ2FyZGxlcy5cbiAqXG4gKi9cbnZhciBibl9qc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJibi5qc1wiKSk7XG52YXIgYnl0ZXNfMSA9IHJlcXVpcmUoXCIuL2J5dGVzXCIpO1xudmFyIHByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnRpZXNcIik7XG52YXIgdHlwZXNfMSA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xudmFyIGVycm9ycyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xudmFyIEJOXzEgPSBuZXcgYm5fanNfMS5kZWZhdWx0LkJOKC0xKTtcbmZ1bmN0aW9uIHRvSGV4KGJuKSB7XG4gICAgdmFyIHZhbHVlID0gYm4udG9TdHJpbmcoMTYpO1xuICAgIGlmICh2YWx1ZVswXSA9PT0gJy0nKSB7XG4gICAgICAgIGlmICgodmFsdWUubGVuZ3RoICUgMikgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnLTB4MCcgKyB2YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiLTB4XCIgKyB2YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIGlmICgodmFsdWUubGVuZ3RoICUgMikgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuICcweDAnICsgdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiAnMHgnICsgdmFsdWU7XG59XG5mdW5jdGlvbiB0b0JOKHZhbHVlKSB7XG4gICAgcmV0dXJuIGJpZ051bWJlcmlmeSh2YWx1ZSkuX2JuO1xufVxuZnVuY3Rpb24gdG9CaWdOdW1iZXIoYm4pIHtcbiAgICByZXR1cm4gbmV3IEJpZ051bWJlcih0b0hleChibikpO1xufVxudmFyIEJpZ051bWJlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmlnTnVtYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJpZ051bWJlcih2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBlcnJvcnMuY2hlY2tOZXcoX3RoaXMsIEJpZ051bWJlcik7XG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChieXRlc18xLmlzSGV4U3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAnMHgnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJzB4MCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNfMS5kZWZpbmVSZWFkT25seShfdGhpcywgJ19oZXgnLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZVswXSA9PT0gJy0nICYmIGJ5dGVzXzEuaXNIZXhTdHJpbmcodmFsdWUuc3Vic3RyaW5nKDEpKSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNfMS5kZWZpbmVSZWFkT25seShfdGhpcywgJ19oZXgnLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS5tYXRjaCgvXi0/WzAtOV0qJC8pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJzAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzXzEuZGVmaW5lUmVhZE9ubHkoX3RoaXMsICdfaGV4JywgdG9IZXgobmV3IGJuX2pzXzEuZGVmYXVsdC5CTih2YWx1ZSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdpbnZhbGlkIEJpZ051bWJlciBzdHJpbmcgdmFsdWUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChTdHJpbmcodmFsdWUpKSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcigndW5kZXJmbG93JywgZXJyb3JzLk5VTUVSSUNfRkFVTFQsIHsgb3BlcmF0aW9uOiAnc2V0VmFsdWUnLCBmYXVsdDogJ3VuZGVyZmxvdycsIHZhbHVlOiB2YWx1ZSwgb3V0cHV0VmFsdWU6IHBhcnNlSW50KFN0cmluZyh2YWx1ZSkpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzXzEuZGVmaW5lUmVhZE9ubHkoX3RoaXMsICdfaGV4JywgdG9IZXgobmV3IGJuX2pzXzEuZGVmYXVsdC5CTih2YWx1ZSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdvdmVyZmxvdycsIGVycm9ycy5OVU1FUklDX0ZBVUxULCB7IG9wZXJhdGlvbjogJ3NldFZhbHVlJywgZmF1bHQ6ICdvdmVyZmxvdycsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBCaWdOdW1iZXIpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNfMS5kZWZpbmVSZWFkT25seShfdGhpcywgJ19oZXgnLCB2YWx1ZS5faGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0hleFN0cmluZykge1xuICAgICAgICAgICAgcHJvcGVydGllc18xLmRlZmluZVJlYWRPbmx5KF90aGlzLCAnX2hleCcsIHRvSGV4KHRvQk4odmFsdWUudG9IZXhTdHJpbmcoKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChieXRlc18xLmlzQXJyYXlpc2godmFsdWUpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzXzEuZGVmaW5lUmVhZE9ubHkoX3RoaXMsICdfaGV4JywgdG9IZXgobmV3IGJuX2pzXzEuZGVmYXVsdC5CTihieXRlc18xLmhleGxpZnkodmFsdWUpLnN1YnN0cmluZygyKSwgMTYpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBCaWdOdW1iZXIgdmFsdWUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCaWdOdW1iZXIucHJvdG90eXBlLCBcIl9iblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hleFswXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgYm5fanNfMS5kZWZhdWx0LkJOKHRoaXMuX2hleC5zdWJzdHJpbmcoMyksIDE2KSkubXVsKEJOXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBibl9qc18xLmRlZmF1bHQuQk4odGhpcy5faGV4LnN1YnN0cmluZygyKSwgMTYpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBCaWdOdW1iZXIucHJvdG90eXBlLmZyb21Ud29zID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b0JpZ051bWJlcih0aGlzLl9ibi5mcm9tVHdvcyh2YWx1ZSkpO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS50b1R3b3MgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvQmlnTnVtYmVyKHRoaXMuX2JuLnRvVHdvcyh2YWx1ZSkpO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRvQmlnTnVtYmVyKHRoaXMuX2JuLmFkZCh0b0JOKG90aGVyKSkpO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRvQmlnTnVtYmVyKHRoaXMuX2JuLnN1Yih0b0JOKG90aGVyKSkpO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIG8gPSBiaWdOdW1iZXJpZnkob3RoZXIpO1xuICAgICAgICBpZiAoby5pc1plcm8oKSkge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2RpdmlzaW9uIGJ5IHplcm8nLCBlcnJvcnMuTlVNRVJJQ19GQVVMVCwgeyBvcGVyYXRpb246ICdkaXZpZGUnLCBmYXVsdDogJ2RpdmlzaW9uIGJ5IHplcm8nIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b0JpZ051bWJlcih0aGlzLl9ibi5kaXYodG9CTihvdGhlcikpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0b0JpZ051bWJlcih0aGlzLl9ibi5tdWwodG9CTihvdGhlcikpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0b0JpZ051bWJlcih0aGlzLl9ibi5tb2QodG9CTihvdGhlcikpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0b0JpZ051bWJlcih0aGlzLl9ibi5wb3codG9CTihvdGhlcikpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUubWFza24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvQmlnTnVtYmVyKHRoaXMuX2JuLm1hc2tuKHZhbHVlKSk7XG4gICAgfTtcbiAgICBCaWdOdW1iZXIucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibi5lcSh0b0JOKG90aGVyKSk7XG4gICAgfTtcbiAgICBCaWdOdW1iZXIucHJvdG90eXBlLmx0ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibi5sdCh0b0JOKG90aGVyKSk7XG4gICAgfTtcbiAgICBCaWdOdW1iZXIucHJvdG90eXBlLmx0ZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm4ubHRlKHRvQk4ob3RoZXIpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUuZ3QgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JuLmd0KHRvQk4ob3RoZXIpKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUuZ3RlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibi5ndGUodG9CTihvdGhlcikpO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibi5pc1plcm8oKTtcbiAgICB9O1xuICAgIEJpZ051bWJlci5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYm4udG9OdW1iZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdvdmVyZmxvdycsIGVycm9ycy5OVU1FUklDX0ZBVUxULCB7IG9wZXJhdGlvbjogJ3NldFZhbHVlJywgZmF1bHQ6ICdvdmVyZmxvdycsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBCaWdOdW1iZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm4udG9TdHJpbmcoMTApO1xuICAgIH07XG4gICAgQmlnTnVtYmVyLnByb3RvdHlwZS50b0hleFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hleDtcbiAgICB9O1xuICAgIHJldHVybiBCaWdOdW1iZXI7XG59KHR5cGVzXzEuQmlnTnVtYmVyKSk7XG5mdW5jdGlvbiBiaWdOdW1iZXJpZnkodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBCaWdOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEJpZ051bWJlcih2YWx1ZSk7XG59XG5leHBvcnRzLmJpZ051bWJlcmlmeSA9IGJpZ051bWJlcmlmeTtcbmV4cG9ydHMuQ29uc3RhbnROZWdhdGl2ZU9uZSA9IGJpZ051bWJlcmlmeSgtMSk7XG5leHBvcnRzLkNvbnN0YW50WmVybyA9IGJpZ051bWJlcmlmeSgwKTtcbmV4cG9ydHMuQ29uc3RhbnRPbmUgPSBiaWdOdW1iZXJpZnkoMSk7XG5leHBvcnRzLkNvbnN0YW50VHdvID0gYmlnTnVtYmVyaWZ5KDIpO1xuZXhwb3J0cy5Db25zdGFudFdlaVBlckV0aGVyID0gYmlnTnVtYmVyaWZ5KCcxMDAwMDAwMDAwMDAwMDAwMDAwJyk7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gV2UgdXNlIHRoaXMgZm9yIGJhc2UgMzYgbWF0aHNcbnZhciBibl9qc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJibi5qc1wiKSk7XG52YXIgYnl0ZXNfMSA9IHJlcXVpcmUoXCIuL2J5dGVzXCIpO1xudmFyIGtlY2NhazI1Nl8xID0gcmVxdWlyZShcIi4va2VjY2FrMjU2XCIpO1xudmFyIHJscF8xID0gcmVxdWlyZShcIi4vcmxwXCIpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbmZ1bmN0aW9uIGdldENoZWNrc3VtQWRkcmVzcyhhZGRyZXNzKSB7XG4gICAgaWYgKHR5cGVvZiAoYWRkcmVzcykgIT09ICdzdHJpbmcnIHx8ICFhZGRyZXNzLm1hdGNoKC9eMHhbMC05QS1GYS1mXXs0MH0kLykpIHtcbiAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgYWRkcmVzcycsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7IGFyZzogJ2FkZHJlc3MnLCB2YWx1ZTogYWRkcmVzcyB9KTtcbiAgICB9XG4gICAgYWRkcmVzcyA9IGFkZHJlc3MudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgY2hhcnMgPSBhZGRyZXNzLnN1YnN0cmluZygyKS5zcGxpdCgnJyk7XG4gICAgdmFyIGhhc2hlZCA9IG5ldyBVaW50OEFycmF5KDQwKTtcbiAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCA0MDsgaV8xKyspIHtcbiAgICAgICAgaGFzaGVkW2lfMV0gPSBjaGFyc1tpXzFdLmNoYXJDb2RlQXQoMCk7XG4gICAgfVxuICAgIGhhc2hlZCA9IGJ5dGVzXzEuYXJyYXlpZnkoa2VjY2FrMjU2XzEua2VjY2FrMjU2KGhhc2hlZCkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDA7IGkgKz0gMikge1xuICAgICAgICBpZiAoKGhhc2hlZFtpID4+IDFdID4+IDQpID49IDgpIHtcbiAgICAgICAgICAgIGNoYXJzW2ldID0gY2hhcnNbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGhhc2hlZFtpID4+IDFdICYgMHgwZikgPj0gOCkge1xuICAgICAgICAgICAgY2hhcnNbaSArIDFdID0gY2hhcnNbaSArIDFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcweCcgKyBjaGFycy5qb2luKCcnKTtcbn1cbi8vIFNoaW1zIGZvciBlbnZpcm9ubWVudHMgdGhhdCBhcmUgbWlzc2luZyBzb21lIHJlcXVpcmVkIGNvbnN0YW50cyBhbmQgZnVuY3Rpb25zXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MWZmZmZmZmZmZmZmZmY7XG5mdW5jdGlvbiBsb2cxMCh4KSB7XG4gICAgaWYgKE1hdGgubG9nMTApIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubG9nMTAoeCk7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4xMDtcbn1cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSW50ZXJuYXRpb25hbF9CYW5rX0FjY291bnRfTnVtYmVyXG4vLyBDcmVhdGUgbG9va3VwIHRhYmxlXG52YXIgaWJhbkxvb2t1cCA9IHt9O1xuZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgaWJhbkxvb2t1cFtTdHJpbmcoaSldID0gU3RyaW5nKGkpO1xufVxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNjsgaSsrKSB7XG4gICAgaWJhbkxvb2t1cFtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSldID0gU3RyaW5nKDEwICsgaSk7XG59XG4vLyBIb3cgbWFueSBkZWNpbWFsIGRpZ2l0cyBjYW4gd2UgcHJvY2Vzcz8gKGZvciA2NC1iaXQgZmxvYXQsIHRoaXMgaXMgMTUpXG52YXIgc2FmZURpZ2l0cyA9IE1hdGguZmxvb3IobG9nMTAoTUFYX1NBRkVfSU5URUdFUikpO1xuZnVuY3Rpb24gaWJhbkNoZWNrc3VtKGFkZHJlc3MpIHtcbiAgICBhZGRyZXNzID0gYWRkcmVzcy50b1VwcGVyQ2FzZSgpO1xuICAgIGFkZHJlc3MgPSBhZGRyZXNzLnN1YnN0cmluZyg0KSArIGFkZHJlc3Muc3Vic3RyaW5nKDAsIDIpICsgJzAwJztcbiAgICB2YXIgZXhwYW5kZWQgPSAnJztcbiAgICBhZGRyZXNzLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGV4cGFuZGVkICs9IGliYW5Mb29rdXBbY107XG4gICAgfSk7XG4gICAgLy8gSmF2YXNjcmlwdCBjYW4gaGFuZGxlIGludGVnZXJzIHNhZmVseSB1cCB0byAxNSAoZGVjaW1hbCkgZGlnaXRzXG4gICAgd2hpbGUgKGV4cGFuZGVkLmxlbmd0aCA+PSBzYWZlRGlnaXRzKSB7XG4gICAgICAgIHZhciBibG9jayA9IGV4cGFuZGVkLnN1YnN0cmluZygwLCBzYWZlRGlnaXRzKTtcbiAgICAgICAgZXhwYW5kZWQgPSBwYXJzZUludChibG9jaywgMTApICUgOTcgKyBleHBhbmRlZC5zdWJzdHJpbmcoYmxvY2subGVuZ3RoKTtcbiAgICB9XG4gICAgdmFyIGNoZWNrc3VtID0gU3RyaW5nKDk4IC0gKHBhcnNlSW50KGV4cGFuZGVkLCAxMCkgJSA5NykpO1xuICAgIHdoaWxlIChjaGVja3N1bS5sZW5ndGggPCAyKSB7XG4gICAgICAgIGNoZWNrc3VtID0gJzAnICsgY2hlY2tzdW07XG4gICAgfVxuICAgIHJldHVybiBjaGVja3N1bTtcbn1cbjtcbmZ1bmN0aW9uIGdldEFkZHJlc3MoYWRkcmVzcykge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmICh0eXBlb2YgKGFkZHJlc3MpICE9PSAnc3RyaW5nJykge1xuICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBhZGRyZXNzJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHsgYXJnOiAnYWRkcmVzcycsIHZhbHVlOiBhZGRyZXNzIH0pO1xuICAgIH1cbiAgICBpZiAoYWRkcmVzcy5tYXRjaCgvXigweCk/WzAtOWEtZkEtRl17NDB9JC8pKSB7XG4gICAgICAgIC8vIE1pc3NpbmcgdGhlIDB4IHByZWZpeFxuICAgICAgICBpZiAoYWRkcmVzcy5zdWJzdHJpbmcoMCwgMikgIT09ICcweCcpIHtcbiAgICAgICAgICAgIGFkZHJlc3MgPSAnMHgnICsgYWRkcmVzcztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBnZXRDaGVja3N1bUFkZHJlc3MoYWRkcmVzcyk7XG4gICAgICAgIC8vIEl0IGlzIGEgY2hlY2tzdW1tZWQgYWRkcmVzcyB3aXRoIGEgYmFkIGNoZWNrc3VtXG4gICAgICAgIGlmIChhZGRyZXNzLm1hdGNoKC8oW0EtRl0uKlthLWZdKXwoW2EtZl0uKltBLUZdKS8pICYmIHJlc3VsdCAhPT0gYWRkcmVzcykge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2JhZCBhZGRyZXNzIGNoZWNrc3VtJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHsgYXJnOiAnYWRkcmVzcycsIHZhbHVlOiBhZGRyZXNzIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1heWJlIElDQVA/ICh3ZSBvbmx5IHN1cHBvcnQgZGlyZWN0IG1vZGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKGFkZHJlc3MubWF0Y2goL15YRVswLTldezJ9WzAtOUEtWmEtel17MzAsMzF9JC8pKSB7XG4gICAgICAgIC8vIEl0IGlzIGFuIElDQVAgYWRkcmVzcyB3aXRoIGEgYmFkIGNoZWNrc3VtXG4gICAgICAgIGlmIChhZGRyZXNzLnN1YnN0cmluZygyLCA0KSAhPT0gaWJhbkNoZWNrc3VtKGFkZHJlc3MpKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignYmFkIGljYXAgY2hlY2tzdW0nLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwgeyBhcmc6ICdhZGRyZXNzJywgdmFsdWU6IGFkZHJlc3MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gKG5ldyBibl9qc18xLmRlZmF1bHQuQk4oYWRkcmVzcy5zdWJzdHJpbmcoNCksIDM2KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB3aGlsZSAocmVzdWx0Lmxlbmd0aCA8IDQwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAnMCcgKyByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gZ2V0Q2hlY2tzdW1BZGRyZXNzKCcweCcgKyByZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgYWRkcmVzcycsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7IGFyZzogJ2FkZHJlc3MnLCB2YWx1ZTogYWRkcmVzcyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0QWRkcmVzcyA9IGdldEFkZHJlc3M7XG5mdW5jdGlvbiBnZXRJY2FwQWRkcmVzcyhhZGRyZXNzKSB7XG4gICAgdmFyIGJhc2UzNiA9IChuZXcgYm5fanNfMS5kZWZhdWx0LkJOKGdldEFkZHJlc3MoYWRkcmVzcykuc3Vic3RyaW5nKDIpLCAxNikpLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpO1xuICAgIHdoaWxlIChiYXNlMzYubGVuZ3RoIDwgMzApIHtcbiAgICAgICAgYmFzZTM2ID0gJzAnICsgYmFzZTM2O1xuICAgIH1cbiAgICByZXR1cm4gJ1hFJyArIGliYW5DaGVja3N1bSgnWEUwMCcgKyBiYXNlMzYpICsgYmFzZTM2O1xufVxuZXhwb3J0cy5nZXRJY2FwQWRkcmVzcyA9IGdldEljYXBBZGRyZXNzO1xuLy8gaHR0cDovL2V0aGVyZXVtLnN0YWNrZXhjaGFuZ2UuY29tL3F1ZXN0aW9ucy83NjAvaG93LWlzLXRoZS1hZGRyZXNzLW9mLWFuLWV0aGVyZXVtLWNvbnRyYWN0LWNvbXB1dGVkXG5mdW5jdGlvbiBnZXRDb250cmFjdEFkZHJlc3ModHJhbnNhY3Rpb24pIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uLmZyb20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGZyb20gYWRkcmVzcycpO1xuICAgIH1cbiAgICB2YXIgbm9uY2UgPSB0cmFuc2FjdGlvbi5ub25jZTtcbiAgICByZXR1cm4gZ2V0QWRkcmVzcygnMHgnICsga2VjY2FrMjU2XzEua2VjY2FrMjU2KHJscF8xLmVuY29kZShbXG4gICAgICAgIGdldEFkZHJlc3ModHJhbnNhY3Rpb24uZnJvbSksXG4gICAgICAgIGJ5dGVzXzEuc3RyaXBaZXJvcyhieXRlc18xLmhleGxpZnkobm9uY2UpKVxuICAgIF0pKS5zdWJzdHJpbmcoMjYpKTtcbn1cbmV4cG9ydHMuZ2V0Q29udHJhY3RBZGRyZXNzID0gZ2V0Q29udHJhY3RBZGRyZXNzO1xuIiwiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgRU5TLmpzXG4gKlxuICogQGF1dGhvciBTYW11ZWwgRnVydGVyIDxzYW11ZWxAZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxOFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4vY29udHJhY3RzL1JlZ2lzdHJ5Jyk7XG52YXIgUmVzb2x2ZXJNZXRob2RIYW5kbGVyID0gcmVxdWlyZSgnLi9saWIvUmVzb2x2ZXJNZXRob2RIYW5kbGVyJyk7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBpbnN0YW5jZSBvZiBFTlNcbiAqXG4gKiBAbWV0aG9kIEVOU1xuICogQHBhcmFtIHtPYmplY3R9IGV0aFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEVOUyhldGgpIHtcbiAgICB0aGlzLmV0aCA9IGV0aDtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVOUy5wcm90b3R5cGUsICdyZWdpc3RyeScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdpc3RyeSh0aGlzKTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRU5TLnByb3RvdHlwZSwgJ3Jlc29sdmVyTWV0aG9kSGFuZGxlcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNvbHZlck1ldGhvZEhhbmRsZXIodGhpcy5yZWdpc3RyeSk7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge1Byb21pc2U8Q29udHJhY3Q+fVxuICovXG5FTlMucHJvdG90eXBlLnJlc29sdmVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5yZXNvbHZlcihuYW1lKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWRkcmVzcyByZWNvcmQgYXNzb2NpYXRlZCB3aXRoIGEgbmFtZS5cbiAqXG4gKiBAbWV0aG9kIGdldEFkZHJlc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cbkVOUy5wcm90b3R5cGUuZ2V0QWRkcmVzcyA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmVyTWV0aG9kSGFuZGxlci5tZXRob2QobmFtZSwgJ2FkZHInLCBbXSkuY2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFNldHMgYSBuZXcgYWRkcmVzc1xuICpcbiAqIEBtZXRob2Qgc2V0QWRkcmVzc1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gc2VuZE9wdGlvbnNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cbkVOUy5wcm90b3R5cGUuc2V0QWRkcmVzcyA9IGZ1bmN0aW9uIChuYW1lLCBhZGRyZXNzLCBzZW5kT3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlck1ldGhvZEhhbmRsZXIubWV0aG9kKG5hbWUsICdzZXRBZGRyJywgW2FkZHJlc3NdKS5zZW5kKHNlbmRPcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHB1YmxpYyBrZXlcbiAqXG4gKiBAbWV0aG9kIGdldFB1YmtleVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cbkVOUy5wcm90b3R5cGUuZ2V0UHVia2V5ID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXJNZXRob2RIYW5kbGVyLm1ldGhvZChuYW1lLCAncHVia2V5JywgW10sIGNhbGxiYWNrKS5jYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBuZXcgcHVibGljIGtleVxuICpcbiAqIEBtZXRob2Qgc2V0UHVia2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHhcbiAqIEBwYXJhbSB7c3RyaW5nfSB5XG4gKiBAcGFyYW0ge09iamVjdH0gc2VuZE9wdGlvbnNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cbkVOUy5wcm90b3R5cGUuc2V0UHVia2V5ID0gZnVuY3Rpb24gKG5hbWUsIHgsIHksIHNlbmRPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmVyTWV0aG9kSGFuZGxlci5tZXRob2QobmFtZSwgJ3NldFB1YmtleScsIFt4LCB5XSkuc2VuZChzZW5kT3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb250ZW50XG4gKlxuICogQG1ldGhvZCBnZXRDb250ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtldmVudGlmaWVkUHJvbWlzZX1cbiAqL1xuRU5TLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXJNZXRob2RIYW5kbGVyLm1ldGhvZChuYW1lLCAnY29udGVudCcsIFtdKS5jYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb250ZW50XG4gKlxuICogQG1ldGhvZCBzZXRDb250ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gc2VuZE9wdGlvbnNcbiAqIEByZXR1cm5zIHtldmVudGlmaWVkUHJvbWlzZX1cbiAqL1xuRU5TLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKG5hbWUsIGhhc2gsIHNlbmRPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmVyTWV0aG9kSGFuZGxlci5tZXRob2QobmFtZSwgJ3NldENvbnRlbnQnLCBbaGFzaF0pLnNlbmQoc2VuZE9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBtdWx0aWhhc2hcbiAqXG4gKiBAbWV0aG9kIGdldE11bHRpaGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXZlbnRpZmllZFByb21pc2V9XG4gKi9cbkVOUy5wcm90b3R5cGUuZ2V0TXVsdGloYXNoID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXJNZXRob2RIYW5kbGVyLm1ldGhvZChuYW1lLCAnbXVsdGloYXNoJywgW10pLmNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG11bHRpaGFzaFxuICpcbiAqIEBtZXRob2Qgc2V0TXVsdGloYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZW5kT3B0aW9uc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtldmVudGlmaWVkUHJvbWlzZX1cbiAqL1xuRU5TLnByb3RvdHlwZS5zZXRNdWx0aWhhc2ggPSBmdW5jdGlvbiAobmFtZSwgaGFzaCwgc2VuZE9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXJNZXRob2RIYW5kbGVyLm1ldGhvZChuYW1lLCAnbXVsdGloYXNoJywgW2hhc2hdKS5zZW5kKHNlbmRPcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgY3VycmVudCB1c2VkIG5ldHdvcmsgaXMgc3luY2VkIGFuZCBsb29rcyBmb3IgRU5TIHN1cHBvcnQgdGhlcmUuXG4gKiBUaHJvd3MgYW4gZXJyb3IgaWYgbm90LlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPEJsb2NrPn1cbiAqL1xuRU5TLnByb3RvdHlwZS5jaGVja05ldHdvcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBzZWxmLmV0aC5nZXRCbG9jaygnbGF0ZXN0JykudGhlbihmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgdmFyIGhlYWRBZ2UgPSBuZXcgRGF0ZSgpIC8gMTAwMCAtIGJsb2NrLnRpbWVzdGFtcDtcbiAgICAgICAgaWYgKGhlYWRBZ2UgPiAzNjAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIG5vdCBzeW5jZWQ7IGxhc3QgYmxvY2sgd2FzIFwiICsgaGVhZEFnZSArIFwiIHNlY29uZHMgYWdvXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmLmV0aC5uZXQuZ2V0TmV0d29ya1R5cGUoKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChuZXR3b3JrVHlwZSkge1xuICAgICAgICB2YXIgYWRkciA9IGNvbmZpZy5hZGRyZXNzZXNbbmV0d29ya1R5cGVdO1xuICAgICAgICBpZiAodHlwZW9mIGFkZHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFTlMgaXMgbm90IHN1cHBvcnRlZCBvbiBuZXR3b3JrIFwiICsgbmV0d29ya1R5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFkZHI7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVOUztcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBieXRlc18xID0gcmVxdWlyZShcIi4vYnl0ZXNcIik7XG52YXIgVW5pY29kZU5vcm1hbGl6YXRpb25Gb3JtO1xuKGZ1bmN0aW9uIChVbmljb2RlTm9ybWFsaXphdGlvbkZvcm0pIHtcbiAgICBVbmljb2RlTm9ybWFsaXphdGlvbkZvcm1bXCJjdXJyZW50XCJdID0gXCJcIjtcbiAgICBVbmljb2RlTm9ybWFsaXphdGlvbkZvcm1bXCJORkNcIl0gPSBcIk5GQ1wiO1xuICAgIFVuaWNvZGVOb3JtYWxpemF0aW9uRm9ybVtcIk5GRFwiXSA9IFwiTkZEXCI7XG4gICAgVW5pY29kZU5vcm1hbGl6YXRpb25Gb3JtW1wiTkZLQ1wiXSA9IFwiTkZLQ1wiO1xuICAgIFVuaWNvZGVOb3JtYWxpemF0aW9uRm9ybVtcIk5GS0RcIl0gPSBcIk5GS0RcIjtcbn0pKFVuaWNvZGVOb3JtYWxpemF0aW9uRm9ybSA9IGV4cG9ydHMuVW5pY29kZU5vcm1hbGl6YXRpb25Gb3JtIHx8IChleHBvcnRzLlVuaWNvZGVOb3JtYWxpemF0aW9uRm9ybSA9IHt9KSk7XG47XG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4NzI5NDA1L2hvdy10by1jb252ZXJ0LXV0Zjgtc3RyaW5nLXRvLWJ5dGUtYXJyYXlcbmZ1bmN0aW9uIHRvVXRmOEJ5dGVzKHN0ciwgZm9ybSkge1xuICAgIGlmIChmb3JtID09PSB2b2lkIDApIHsgZm9ybSA9IFVuaWNvZGVOb3JtYWxpemF0aW9uRm9ybS5jdXJyZW50OyB9XG4gICAgaWYgKGZvcm0gIT0gVW5pY29kZU5vcm1hbGl6YXRpb25Gb3JtLmN1cnJlbnQpIHtcbiAgICAgICAgc3RyID0gc3RyLm5vcm1hbGl6ZShmb3JtKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgICByZXN1bHRbb2Zmc2V0KytdID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMjA0OCkge1xuICAgICAgICAgICAgcmVzdWx0W29mZnNldCsrXSA9IChjID4+IDYpIHwgMTkyO1xuICAgICAgICAgICAgcmVzdWx0W29mZnNldCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCgoYyAmIDB4RkMwMCkgPT0gMHhEODAwKSAmJiAoaSArIDEpIDwgc3RyLmxlbmd0aCAmJiAoKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4RkMwMCkgPT0gMHhEQzAwKSkge1xuICAgICAgICAgICAgLy8gU3Vycm9nYXRlIFBhaXJcbiAgICAgICAgICAgIGMgPSAweDEwMDAwICsgKChjICYgMHgwM0ZGKSA8PCAxMCkgKyAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4MDNGRik7XG4gICAgICAgICAgICByZXN1bHRbb2Zmc2V0KytdID0gKGMgPj4gMTgpIHwgMjQwO1xuICAgICAgICAgICAgcmVzdWx0W29mZnNldCsrXSA9ICgoYyA+PiAxMikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgICByZXN1bHRbb2Zmc2V0KytdID0gKChjID4+IDYpICYgNjMpIHwgMTI4O1xuICAgICAgICAgICAgcmVzdWx0W29mZnNldCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W29mZnNldCsrXSA9IChjID4+IDEyKSB8IDIyNDtcbiAgICAgICAgICAgIHJlc3VsdFtvZmZzZXQrK10gPSAoKGMgPj4gNikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgICByZXN1bHRbb2Zmc2V0KytdID0gKGMgJiA2MykgfCAxMjg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVzXzEuYXJyYXlpZnkocmVzdWx0KTtcbn1cbmV4cG9ydHMudG9VdGY4Qnl0ZXMgPSB0b1V0ZjhCeXRlcztcbjtcbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTMzNTY0OTMvZGVjb2RlLXV0Zi04LXdpdGgtamF2YXNjcmlwdCMxMzY5MTQ5OVxuZnVuY3Rpb24gdG9VdGY4U3RyaW5nKGJ5dGVzKSB7XG4gICAgYnl0ZXMgPSBieXRlc18xLmFycmF5aWZ5KGJ5dGVzKTtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIC8vIEludmFsaWQgYnl0ZXMgYXJlIGlnbm9yZWRcbiAgICB3aGlsZSAoaSA8IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IGJ5dGVzW2krK107XG4gICAgICAgIGlmIChjID4+IDcgPT0gMCkge1xuICAgICAgICAgICAgLy8gMHh4eCB4eHh4XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludmFsaWQgc3RhcnRpbmcgYnl0ZVxuICAgICAgICBpZiAoYyA+PiA2ID09IDB4MDIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIE11bHRpYnl0ZTsgaG93IG1hbnkgYnl0ZXMgbGVmdCBmb3IgdGh1cyBjaGFyYWN0ZXI/XG4gICAgICAgIHZhciBleHRyYUxlbmd0aCA9IG51bGw7XG4gICAgICAgIGlmIChjID4+IDUgPT0gMHgwNikge1xuICAgICAgICAgICAgZXh0cmFMZW5ndGggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPj4gNCA9PSAweDBlKSB7XG4gICAgICAgICAgICBleHRyYUxlbmd0aCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA+PiAzID09IDB4MWUpIHtcbiAgICAgICAgICAgIGV4dHJhTGVuZ3RoID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjID4+IDIgPT0gMHgzZSkge1xuICAgICAgICAgICAgZXh0cmFMZW5ndGggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPj4gMSA9PSAweDdlKSB7XG4gICAgICAgICAgICBleHRyYUxlbmd0aCA9IDU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyB3ZSBoYXZlIGVub3VnaCBieXRlcyBpbiBvdXIgZGF0YT9cbiAgICAgICAgaWYgKGkgKyBleHRyYUxlbmd0aCA+IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gaW52YWxpZCB1bnByb2Nlc3NlZCBieXRlLCB0cnkgdG8gY29udGludWVcbiAgICAgICAgICAgIGZvciAoOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXNbaV0gPj4gNiAhPSAweDAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICE9IGJ5dGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEFsbCBsZWZ0b3ZlciBieXRlcyBhcmUgdmFsaWQuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgVVRGLTggcHJlZml4IGZyb20gdGhlIGNoYXIgKHJlcylcbiAgICAgICAgdmFyIHJlcyA9IGMgJiAoKDEgPDwgKDggLSBleHRyYUxlbmd0aCAtIDEpKSAtIDEpO1xuICAgICAgICB2YXIgY291bnQ7XG4gICAgICAgIGZvciAoY291bnQgPSAwOyBjb3VudCA8IGV4dHJhTGVuZ3RoOyBjb3VudCsrKSB7XG4gICAgICAgICAgICB2YXIgbmV4dENoYXIgPSBieXRlc1tpKytdO1xuICAgICAgICAgICAgLy8gSXMgdGhlIGNoYXIgdmFsaWQgbXVsdGlieXRlIHBhcnQ/XG4gICAgICAgICAgICBpZiAobmV4dENoYXIgPj4gNiAhPSAweDAyKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICByZXMgPSAocmVzIDw8IDYpIHwgKG5leHRDaGFyICYgMHgzZik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ICE9IGV4dHJhTGVuZ3RoKSB7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzIDw9IDB4ZmZmZikge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocmVzKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlcyAtPSAweDEwMDAwO1xuICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKHJlcyA+PiAxMCkgJiAweDNmZikgKyAweGQ4MDAsIChyZXMgJiAweDNmZikgKyAweGRjMDApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy50b1V0ZjhTdHJpbmcgPSB0b1V0ZjhTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvbmZpZyA9IHtcbiAgICBhZGRyZXNzZXM6IHtcbiAgICAgICAgbWFpbjogXCIweDMxNDE1OTI2NWREOGRiYjMxMDY0MmY5OGY1MEMwNjYxNzNDMTI1OWJcIixcbiAgICAgICAgcm9wc3RlbjogXCIweDExMjIzNDQ1NWMzYTMyZmQxMTIzMGM0MmU3YmNjZDRhODRlMDIwMTBcIixcbiAgICAgICAgcmlua2VieTogXCIweGU3NDEwMTcwZjg3MTAyZGYwMDU1ZWIxOTUxNjNhMDNiN2YyYmZmNGFcIlxuICAgIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQnl0ZXNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEJpZ051bWJlclxudmFyIEJpZ051bWJlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaWdOdW1iZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBCaWdOdW1iZXI7XG59KCkpO1xuZXhwb3J0cy5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XG47XG47XG47XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBJbnRlcmZhY2VcbnZhciBJbmRleGVkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluZGV4ZWQoKSB7XG4gICAgfVxuICAgIHJldHVybiBJbmRleGVkO1xufSgpKTtcbmV4cG9ydHMuSW5kZXhlZCA9IEluZGV4ZWQ7XG4vKipcbiAqICBQcm92aWRlclxuICpcbiAqICBOb3RlOiBXZSB1c2UgYW4gYWJzdHJhY3QgY2xhc3Mgc28gd2UgY2FuIHVzZSBpbnN0YW5jZW9mIHRvIGRldGVybWluZSBpZiBhblxuICogICAgICAgIG9iamVjdCBpcyBhIFByb3ZpZGVyLlxuICovXG52YXIgTWluaW1hbFByb3ZpZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1pbmltYWxQcm92aWRlcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIE1pbmltYWxQcm92aWRlcjtcbn0oKSk7XG5leHBvcnRzLk1pbmltYWxQcm92aWRlciA9IE1pbmltYWxQcm92aWRlcjtcbi8qKlxuICogIFNpZ25lclxuICpcbiAqICBOb3RlOiBXZSB1c2UgYW4gYWJzdHJhY3QgY2xhc3Mgc28gd2UgY2FuIHVzZSBpbnN0YW5jZW9mIHRvIGRldGVybWluZSBpZiBhblxuICogICAgICAgIG9iamVjdCBpcyBhIFNpZ25lci5cbiAqL1xudmFyIFNpZ25lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaWduZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBTaWduZXI7XG59KCkpO1xuZXhwb3J0cy5TaWduZXIgPSBTaWduZXI7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBIRE5vZGVcbnZhciBIRE5vZGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSEROb2RlKCkge1xuICAgIH1cbiAgICByZXR1cm4gSEROb2RlO1xufSgpKTtcbmV4cG9ydHMuSEROb2RlID0gSEROb2RlO1xuIiwiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgaW5kZXguanNcbiAqXG4gKiBAYXV0aG9yIFNhbXVlbCBGdXJ0ZXIgPHNhbXVlbEBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFTlMgPSByZXF1aXJlKCcuL0VOUycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVOUztcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzaGEzID0gcmVxdWlyZShcImpzLXNoYTNcIik7XG52YXIgYnl0ZXNfMSA9IHJlcXVpcmUoXCIuL2J5dGVzXCIpO1xuZnVuY3Rpb24ga2VjY2FrMjU2KGRhdGEpIHtcbiAgICByZXR1cm4gJzB4JyArIHNoYTMua2VjY2FrXzI1NihieXRlc18xLmFycmF5aWZ5KGRhdGEpKTtcbn1cbmV4cG9ydHMua2VjY2FrMjU2ID0ga2VjY2FrMjU2O1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW2J0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1dKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vL1NlZTogaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL3dpa2kvd2lraS9STFBcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBieXRlc18xID0gcmVxdWlyZShcIi4vYnl0ZXNcIik7XG5mdW5jdGlvbiBhcnJheWlmeUludGVnZXIodmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgd2hpbGUgKHZhbHVlKSB7XG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KHZhbHVlICYgMHhmZik7XG4gICAgICAgIHZhbHVlID4+PSA4O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gdW5hcnJheWlmeUludGVnZXIoZGF0YSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IChyZXN1bHQgKiAyNTYpICsgZGF0YVtvZmZzZXQgKyBpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIF9lbmNvZGUob2JqZWN0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICB2YXIgcGF5bG9hZCA9IFtdO1xuICAgICAgICBvYmplY3QuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChfZW5jb2RlKGNoaWxkKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPD0gNTUpIHtcbiAgICAgICAgICAgIHBheWxvYWQudW5zaGlmdCgweGMwICsgcGF5bG9hZC5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IGFycmF5aWZ5SW50ZWdlcihwYXlsb2FkLmxlbmd0aCk7XG4gICAgICAgIGxlbmd0aC51bnNoaWZ0KDB4ZjcgKyBsZW5ndGgubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGxlbmd0aC5jb25jYXQocGF5bG9hZCk7XG4gICAgfVxuICAgIHZhciBkYXRhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXNfMS5hcnJheWlmeShvYmplY3QpKTtcbiAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEgJiYgZGF0YVswXSA8PSAweDdmKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmxlbmd0aCA8PSA1NSkge1xuICAgICAgICBkYXRhLnVuc2hpZnQoMHg4MCArIGRhdGEubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhcnJheWlmeUludGVnZXIoZGF0YS5sZW5ndGgpO1xuICAgIGxlbmd0aC51bnNoaWZ0KDB4YjcgKyBsZW5ndGgubGVuZ3RoKTtcbiAgICByZXR1cm4gbGVuZ3RoLmNvbmNhdChkYXRhKTtcbn1cbmZ1bmN0aW9uIGVuY29kZShvYmplY3QpIHtcbiAgICByZXR1cm4gYnl0ZXNfMS5oZXhsaWZ5KF9lbmNvZGUob2JqZWN0KSk7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbmZ1bmN0aW9uIF9kZWNvZGVDaGlsZHJlbihkYXRhLCBvZmZzZXQsIGNoaWxkT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgd2hpbGUgKGNoaWxkT2Zmc2V0IDwgb2Zmc2V0ICsgMSArIGxlbmd0aCkge1xuICAgICAgICB2YXIgZGVjb2RlZCA9IF9kZWNvZGUoZGF0YSwgY2hpbGRPZmZzZXQpO1xuICAgICAgICByZXN1bHQucHVzaChkZWNvZGVkLnJlc3VsdCk7XG4gICAgICAgIGNoaWxkT2Zmc2V0ICs9IGRlY29kZWQuY29uc3VtZWQ7XG4gICAgICAgIGlmIChjaGlsZE9mZnNldCA+IG9mZnNldCArIDEgKyBsZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBybHAnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjb25zdW1lZDogKDEgKyBsZW5ndGgpLCByZXN1bHQ6IHJlc3VsdCB9O1xufVxuLy8gcmV0dXJucyB7IGNvbnN1bWVkOiBudW1iZXIsIHJlc3VsdDogT2JqZWN0IH1cbmZ1bmN0aW9uIF9kZWNvZGUoZGF0YSwgb2Zmc2V0KSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBybHAgZGF0YScpO1xuICAgIH1cbiAgICAvLyBBcnJheSB3aXRoIGV4dHJhIGxlbmd0aCBwcmVmaXhcbiAgICBpZiAoZGF0YVtvZmZzZXRdID49IDB4ZjgpIHtcbiAgICAgICAgdmFyIGxlbmd0aExlbmd0aCA9IGRhdGFbb2Zmc2V0XSAtIDB4Zjc7XG4gICAgICAgIGlmIChvZmZzZXQgKyAxICsgbGVuZ3RoTGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndG9vIHNob3J0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IHVuYXJyYXlpZnlJbnRlZ2VyKGRhdGEsIG9mZnNldCArIDEsIGxlbmd0aExlbmd0aCk7XG4gICAgICAgIGlmIChvZmZzZXQgKyAxICsgbGVuZ3RoTGVuZ3RoICsgbGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndG8gc2hvcnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2RlY29kZUNoaWxkcmVuKGRhdGEsIG9mZnNldCwgb2Zmc2V0ICsgMSArIGxlbmd0aExlbmd0aCwgbGVuZ3RoTGVuZ3RoICsgbGVuZ3RoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YVtvZmZzZXRdID49IDB4YzApIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGFbb2Zmc2V0XSAtIDB4YzA7XG4gICAgICAgIGlmIChvZmZzZXQgKyAxICsgbGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBybHAgZGF0YScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfZGVjb2RlQ2hpbGRyZW4oZGF0YSwgb2Zmc2V0LCBvZmZzZXQgKyAxLCBsZW5ndGgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhW29mZnNldF0gPj0gMHhiOCkge1xuICAgICAgICB2YXIgbGVuZ3RoTGVuZ3RoID0gZGF0YVtvZmZzZXRdIC0gMHhiNztcbiAgICAgICAgaWYgKG9mZnNldCArIDEgKyBsZW5ndGhMZW5ndGggPiBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJscCBkYXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IHVuYXJyYXlpZnlJbnRlZ2VyKGRhdGEsIG9mZnNldCArIDEsIGxlbmd0aExlbmd0aCk7XG4gICAgICAgIGlmIChvZmZzZXQgKyAxICsgbGVuZ3RoTGVuZ3RoICsgbGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBybHAgZGF0YScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBieXRlc18xLmhleGxpZnkoZGF0YS5zbGljZShvZmZzZXQgKyAxICsgbGVuZ3RoTGVuZ3RoLCBvZmZzZXQgKyAxICsgbGVuZ3RoTGVuZ3RoICsgbGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiB7IGNvbnN1bWVkOiAoMSArIGxlbmd0aExlbmd0aCArIGxlbmd0aCksIHJlc3VsdDogcmVzdWx0IH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFbb2Zmc2V0XSA+PSAweDgwKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhW29mZnNldF0gLSAweDgwO1xuICAgICAgICBpZiAob2Zmc2V0ICsgMSArIGxlbmd0aCA+IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmxhaWQgcmxwIGRhdGEnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gYnl0ZXNfMS5oZXhsaWZ5KGRhdGEuc2xpY2Uob2Zmc2V0ICsgMSwgb2Zmc2V0ICsgMSArIGxlbmd0aCkpO1xuICAgICAgICByZXR1cm4geyBjb25zdW1lZDogKDEgKyBsZW5ndGgpLCByZXN1bHQ6IHJlc3VsdCB9O1xuICAgIH1cbiAgICByZXR1cm4geyBjb25zdW1lZDogMSwgcmVzdWx0OiBieXRlc18xLmhleGxpZnkoZGF0YVtvZmZzZXRdKSB9O1xufVxuZnVuY3Rpb24gZGVjb2RlKGRhdGEpIHtcbiAgICB2YXIgYnl0ZXMgPSBieXRlc18xLmFycmF5aWZ5KGRhdGEpO1xuICAgIHZhciBkZWNvZGVkID0gX2RlY29kZShieXRlcywgMCk7XG4gICAgaWYgKGRlY29kZWQuY29uc3VtZWQgIT09IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcmxwIGRhdGEnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZWQucmVzdWx0O1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL3dpa2kvd2lraS9FdGhlcmV1bS1Db250cmFjdC1BQklcbnZhciBhZGRyZXNzXzEgPSByZXF1aXJlKFwiLi9hZGRyZXNzXCIpO1xudmFyIGJpZ251bWJlcl8xID0gcmVxdWlyZShcIi4vYmlnbnVtYmVyXCIpO1xudmFyIGJ5dGVzXzEgPSByZXF1aXJlKFwiLi9ieXRlc1wiKTtcbnZhciB1dGY4XzEgPSByZXF1aXJlKFwiLi91dGY4XCIpO1xudmFyIHByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnRpZXNcIik7XG52YXIgZXJyb3JzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL2Vycm9yc1wiKSk7XG52YXIgcGFyYW1UeXBlQnl0ZXMgPSBuZXcgUmVnRXhwKC9eYnl0ZXMoWzAtOV0qKSQvKTtcbnZhciBwYXJhbVR5cGVOdW1iZXIgPSBuZXcgUmVnRXhwKC9eKHU/aW50KShbMC05XSopJC8pO1xudmFyIHBhcmFtVHlwZUFycmF5ID0gbmV3IFJlZ0V4cCgvXiguKilcXFsoWzAtOV0qKVxcXSQvKTtcbmV4cG9ydHMuZGVmYXVsdENvZXJjZUZ1bmMgPSBmdW5jdGlvbiAodHlwZSwgdmFsdWUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKHBhcmFtVHlwZU51bWJlcik7XG4gICAgaWYgKG1hdGNoICYmIHBhcnNlSW50KG1hdGNoWzJdKSA8PSA0OCkge1xuICAgICAgICByZXR1cm4gdmFsdWUudG9OdW1iZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQYXJzaW5nIGZvciBTb2xpZGl0eSBTaWduYXR1cmVzXG52YXIgcmVnZXhQYXJlbiA9IG5ldyBSZWdFeHAoXCJeKFteKShdKilcXFxcKCguKilcXFxcKShbXikoXSopJFwiKTtcbnZhciByZWdleElkZW50aWZpZXIgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpfXVtBLVphLXowLTlfXSokXCIpO1xuZnVuY3Rpb24gdmVyaWZ5VHlwZSh0eXBlKSB7XG4gICAgLy8gVGhlc2UgbmVlZCB0byBiZSB0cmFuc2Zvcm1lZCB0byB0aGVpciBmdWxsIGRlc2NyaXB0aW9uXG4gICAgaWYgKHR5cGUubWF0Y2goL151aW50KCR8W14xLTldKS8pKSB7XG4gICAgICAgIHR5cGUgPSAndWludDI1NicgKyB0eXBlLnN1YnN0cmluZyg0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZS5tYXRjaCgvXmludCgkfFteMS05XSkvKSkge1xuICAgICAgICB0eXBlID0gJ2ludDI1NicgKyB0eXBlLnN1YnN0cmluZygzKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGU7XG59XG5mdW5jdGlvbiBwYXJzZVBhcmFtKHBhcmFtLCBhbGxvd0luZGV4ZWQpIHtcbiAgICBmdW5jdGlvbiB0aHJvd0Vycm9yKGkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIGNoYXJhY3RlciBcIicgKyBwYXJhbVtpXSArICdcIiBhdCBwb3NpdGlvbiAnICsgaSArICcgaW4gXCInICsgcGFyYW0gKyAnXCInKTtcbiAgICB9XG4gICAgdmFyIHBhcmVudCA9IHsgdHlwZTogJycsIG5hbWU6ICcnLCBzdGF0ZTogeyBhbGxvd1R5cGU6IHRydWUgfSB9O1xuICAgIHZhciBub2RlID0gcGFyZW50O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBwYXJhbVtpXTtcbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuc3RhdGUuYWxsb3dQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcihpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5hbGxvd1R5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPSB2ZXJpZnlUeXBlKG5vZGUudHlwZSk7XG4gICAgICAgICAgICAgICAgbm9kZS5jb21wb25lbnRzID0gW3sgdHlwZTogJycsIG5hbWU6ICcnLCBwYXJlbnQ6IG5vZGUsIHN0YXRlOiB7IGFsbG93VHlwZTogdHJ1ZSB9IH1dO1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLmNvbXBvbmVudHNbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5zdGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dJbmRleGVkICYmIG5vZGUubmFtZSA9PT0gJ2luZGV4ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaW5kZXhlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPSB2ZXJpZnlUeXBlKG5vZGUudHlwZSk7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZTtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93RXJyb3IoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjaGlsZC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5hbGxvd1BhcmFtcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuYWxsb3dOYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmFsbG93QXJyYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuc3RhdGU7XG4gICAgICAgICAgICAgICAgaWYgKGFsbG93SW5kZXhlZCAmJiBub2RlLm5hbWUgPT09ICdpbmRleGVkJykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmluZGV4ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS50eXBlID0gdmVyaWZ5VHlwZShub2RlLnR5cGUpO1xuICAgICAgICAgICAgICAgIHZhciBzaWJsaW5nID0geyB0eXBlOiAnJywgbmFtZTogJycsIHBhcmVudDogbm9kZS5wYXJlbnQsIHN0YXRlOiB7IGFsbG93VHlwZTogdHJ1ZSB9IH07XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQuY29tcG9uZW50cy5wdXNoKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBub2RlLnBhcmVudDtcbiAgICAgICAgICAgICAgICBub2RlID0gc2libGluZztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEhpdCBhIHNwYWNlLi4uXG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAvLyBJZiByZWFkaW5nIHR5cGUsIHRoZSB0eXBlIGlzIGRvbmUgYW5kIG1heSByZWFkIGEgcGFyYW0gb3IgbmFtZVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnN0YXRlLmFsbG93VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS50eXBlID0gdmVyaWZ5VHlwZShub2RlLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuc3RhdGUuYWxsb3dUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5hbGxvd05hbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5hbGxvd1BhcmFtcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgcmVhZGluZyBuYW1lLCB0aGUgbmFtZSBpcyBkb25lXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuYWxsb3dOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dJbmRleGVkICYmIG5vZGUubmFtZSA9PT0gJ2luZGV4ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbmRleGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuYWxsb3dOYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdbJzpcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuc3RhdGUuYWxsb3dBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgKz0gYztcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmFsbG93QXJyYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmFsbG93TmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUucmVhZEFycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ10nOlxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5zdGF0ZS5yZWFkQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcihpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS50eXBlICs9IGM7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5yZWFkQXJyYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmFsbG93QXJyYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuYWxsb3dOYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuYWxsb3dUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudHlwZSArPSBjO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmFsbG93UGFyYW1zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5hbGxvd0FycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobm9kZS5zdGF0ZS5hbGxvd05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uYW1lICs9IGM7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBub2RlLnN0YXRlLmFsbG93QXJyYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUuc3RhdGUucmVhZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudHlwZSArPSBjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcihpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuZXhwZWN0ZWQgZW9mXCIpO1xuICAgIH1cbiAgICBkZWxldGUgcGFyZW50LnN0YXRlO1xuICAgIGlmIChhbGxvd0luZGV4ZWQgJiYgbm9kZS5uYW1lID09PSAnaW5kZXhlZCcpIHtcbiAgICAgICAgbm9kZS5pbmRleGVkID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5uYW1lID0gJyc7XG4gICAgfVxuICAgIHBhcmVudC50eXBlID0gdmVyaWZ5VHlwZShwYXJlbnQudHlwZSk7XG4gICAgcmV0dXJuIHBhcmVudDtcbn1cbi8vIEBUT0RPOiBCZXR0ZXIgcmV0dXJuIHR5cGVcbmZ1bmN0aW9uIHBhcnNlU2lnbmF0dXJlRXZlbnQoZnJhZ21lbnQpIHtcbiAgICB2YXIgYWJpID0ge1xuICAgICAgICBhbm9ueW1vdXM6IGZhbHNlLFxuICAgICAgICBpbnB1dHM6IFtdLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdHlwZTogJ2V2ZW50J1xuICAgIH07XG4gICAgdmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2gocmVnZXhQYXJlbik7XG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXZlbnQ6ICcgKyBmcmFnbWVudCk7XG4gICAgfVxuICAgIGFiaS5uYW1lID0gbWF0Y2hbMV0udHJpbSgpO1xuICAgIHNwbGl0TmVzdGluZyhtYXRjaFsyXSkuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgcGFyYW0gPSBwYXJzZVBhcmFtKHBhcmFtLCB0cnVlKTtcbiAgICAgICAgcGFyYW0uaW5kZXhlZCA9ICEhcGFyYW0uaW5kZXhlZDtcbiAgICAgICAgYWJpLmlucHV0cy5wdXNoKHBhcmFtKTtcbiAgICB9KTtcbiAgICBtYXRjaFszXS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXIpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Fub255bW91cyc6XG4gICAgICAgICAgICAgICAgYWJpLmFub255bW91cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndW5rbm93biBtb2RpZmllcjogJyArIG1vZGlmaWVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChhYmkubmFtZSAmJiAhYWJpLm5hbWUubWF0Y2gocmVnZXhJZGVudGlmaWVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaWRlbnRpZmllcjogXCInICsgYWJpLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gICAgcmV0dXJuIGFiaTtcbn1cbmZ1bmN0aW9uIHBhcnNlU2lnbmF0dXJlRnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICB2YXIgYWJpID0ge1xuICAgICAgICBjb25zdGFudDogZmFsc2UsXG4gICAgICAgIGlucHV0czogW10sXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBvdXRwdXRzOiBbXSxcbiAgICAgICAgcGF5YWJsZTogZmFsc2UsXG4gICAgICAgIHN0YXRlTXV0YWJpbGl0eTogbnVsbCxcbiAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgIH07XG4gICAgdmFyIGNvbXBzID0gZnJhZ21lbnQuc3BsaXQoJyByZXR1cm5zICcpO1xuICAgIHZhciBsZWZ0ID0gY29tcHNbMF0ubWF0Y2gocmVnZXhQYXJlbik7XG4gICAgaWYgKCFsZWZ0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzaWduYXR1cmUnKTtcbiAgICB9XG4gICAgYWJpLm5hbWUgPSBsZWZ0WzFdLnRyaW0oKTtcbiAgICBpZiAoIWFiaS5uYW1lLm1hdGNoKHJlZ2V4SWRlbnRpZmllcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGlkZW50aWZpZXI6IFwiJyArIGxlZnRbMV0gKyAnXCInKTtcbiAgICB9XG4gICAgc3BsaXROZXN0aW5nKGxlZnRbMl0pLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICAgIGFiaS5pbnB1dHMucHVzaChwYXJzZVBhcmFtKHBhcmFtKSk7XG4gICAgfSk7XG4gICAgbGVmdFszXS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXIpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbnN0YW50JzpcbiAgICAgICAgICAgICAgICBhYmkuY29uc3RhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGF5YWJsZSc6XG4gICAgICAgICAgICAgICAgYWJpLnBheWFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHVyZSc6XG4gICAgICAgICAgICAgICAgYWJpLmNvbnN0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhYmkuc3RhdGVNdXRhYmlsaXR5ID0gJ3B1cmUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndmlldyc6XG4gICAgICAgICAgICAgICAgYWJpLmNvbnN0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhYmkuc3RhdGVNdXRhYmlsaXR5ID0gJ3ZpZXcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Vua25vd24gbW9kaWZpZXI6ICcgKyBtb2RpZmllcik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBXZSBoYXZlIG91dHB1dHNcbiAgICBpZiAoY29tcHMubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgcmlnaHQgPSBjb21wc1sxXS5tYXRjaChyZWdleFBhcmVuKTtcbiAgICAgICAgaWYgKHJpZ2h0WzFdLnRyaW0oKSAhPSAnJyB8fCByaWdodFszXS50cmltKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCB0b2tlbnMnKTtcbiAgICAgICAgfVxuICAgICAgICBzcGxpdE5lc3RpbmcocmlnaHRbMl0pLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICAgICAgICBhYmkub3V0cHV0cy5wdXNoKHBhcnNlUGFyYW0ocGFyYW0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhYmk7XG59XG5mdW5jdGlvbiBwYXJzZVBhcmFtVHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIHBhcnNlUGFyYW0odHlwZSwgdHJ1ZSk7XG59XG5leHBvcnRzLnBhcnNlUGFyYW1UeXBlID0gcGFyc2VQYXJhbVR5cGU7XG4vLyBAVE9ETzogQWxsb3cgYSBzZWNvbmQgYm9vbGVhbiB0byBleHBvc2UgbmFtZXNcbmZ1bmN0aW9uIGZvcm1hdFBhcmFtVHlwZShwYXJhbVR5cGUpIHtcbiAgICByZXR1cm4gZ2V0UGFyYW1Db2RlcihleHBvcnRzLmRlZmF1bHRDb2VyY2VGdW5jLCBwYXJhbVR5cGUpLnR5cGU7XG59XG5leHBvcnRzLmZvcm1hdFBhcmFtVHlwZSA9IGZvcm1hdFBhcmFtVHlwZTtcbi8vIEBUT0RPOiBBbGxvdyBhIHNlY29uZCBib29sZWFuIHRvIGV4cG9zZSBuYW1lcyBhbmQgbW9kaWZpZXJzXG5mdW5jdGlvbiBmb3JtYXRTaWduYXR1cmUoZnJhZ21lbnQpIHtcbiAgICByZXR1cm4gZnJhZ21lbnQubmFtZSArICcoJyArIGZyYWdtZW50LmlucHV0cy5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGZvcm1hdFBhcmFtVHlwZShpKTsgfSkuam9pbignLCcpICsgJyknO1xufVxuZXhwb3J0cy5mb3JtYXRTaWduYXR1cmUgPSBmb3JtYXRTaWduYXR1cmU7XG5mdW5jdGlvbiBwYXJzZVNpZ25hdHVyZShmcmFnbWVudCkge1xuICAgIGlmICh0eXBlb2YgKGZyYWdtZW50KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBcInJldHVybnNcIiBpcyBzdXJyb3VuZGVkIGJ5IGEgc3BhY2UgYW5kIGFsbCB3aGl0ZXNwYWNlIGlzIGV4YWN0bHkgb25lIHNwYWNlXG4gICAgICAgIGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZSgvXFwoL2csICcgKCcpLnJlcGxhY2UoL1xcKS9nLCAnKSAnKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICAgIGZyYWdtZW50ID0gZnJhZ21lbnQudHJpbSgpO1xuICAgICAgICBpZiAoZnJhZ21lbnQuc3Vic3RyaW5nKDAsIDYpID09PSAnZXZlbnQgJykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlU2lnbmF0dXJlRXZlbnQoZnJhZ21lbnQuc3Vic3RyaW5nKDYpLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuc3Vic3RyaW5nKDAsIDkpID09PSAnZnVuY3Rpb24gJykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZnJhZ21lbnQuc3Vic3RyaW5nKDkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlU2lnbmF0dXJlRnVuY3Rpb24oZnJhZ21lbnQudHJpbSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gc2lnbmF0dXJlJyk7XG59XG5leHBvcnRzLnBhcnNlU2lnbmF0dXJlID0gcGFyc2VTaWduYXR1cmU7XG52YXIgQ29kZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29kZXIoY29lcmNlRnVuYywgbmFtZSwgdHlwZSwgbG9jYWxOYW1lLCBkeW5hbWljKSB7XG4gICAgICAgIHRoaXMuY29lcmNlRnVuYyA9IGNvZXJjZUZ1bmM7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubG9jYWxOYW1lID0gbG9jYWxOYW1lO1xuICAgICAgICB0aGlzLmR5bmFtaWMgPSBkeW5hbWljO1xuICAgIH1cbiAgICByZXR1cm4gQ29kZXI7XG59KCkpO1xuLy8gQ2xvbmVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIGFuIGV4aXN0aW5nIENvZGVyLCBidXQgd2l0aG91dCBhIGxvY2FsTmFtZVxudmFyIENvZGVyQW5vbnltb3VzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2RlckFub255bW91cywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2RlckFub255bW91cyhjb2Rlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb2Rlci5jb2VyY2VGdW5jLCBjb2Rlci5uYW1lLCBjb2Rlci50eXBlLCB1bmRlZmluZWQsIGNvZGVyLmR5bmFtaWMpIHx8IHRoaXM7XG4gICAgICAgIHByb3BlcnRpZXNfMS5kZWZpbmVSZWFkT25seShfdGhpcywgJ2NvZGVyJywgY29kZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvZGVyQW5vbnltb3VzLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuY29kZXIuZW5jb2RlKHZhbHVlKTsgfTtcbiAgICBDb2RlckFub255bW91cy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIG9mZnNldCkgeyByZXR1cm4gdGhpcy5jb2Rlci5kZWNvZGUoZGF0YSwgb2Zmc2V0KTsgfTtcbiAgICByZXR1cm4gQ29kZXJBbm9ueW1vdXM7XG59KENvZGVyKSk7XG52YXIgQ29kZXJOdWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2Rlck51bGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29kZXJOdWxsKGNvZXJjZUZ1bmMsIGxvY2FsTmFtZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29lcmNlRnVuYywgJ251bGwnLCAnJywgbG9jYWxOYW1lLCBmYWxzZSkgfHwgdGhpcztcbiAgICB9XG4gICAgQ29kZXJOdWxsLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzXzEuYXJyYXlpZnkoW10pO1xuICAgIH07XG4gICAgQ29kZXJOdWxsLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPiBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uc3VtZWQ6IDAsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jb2VyY2VGdW5jKCdudWxsJywgdW5kZWZpbmVkKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIENvZGVyTnVsbDtcbn0oQ29kZXIpKTtcbnZhciBDb2Rlck51bWJlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29kZXJOdW1iZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29kZXJOdW1iZXIoY29lcmNlRnVuYywgc2l6ZSwgc2lnbmVkLCBsb2NhbE5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG5hbWUgPSAoKHNpZ25lZCA/ICdpbnQnIDogJ3VpbnQnKSArIChzaXplICogOCkpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvZXJjZUZ1bmMsIG5hbWUsIG5hbWUsIGxvY2FsTmFtZSwgZmFsc2UpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNpemUgPSBzaXplO1xuICAgICAgICBfdGhpcy5zaWduZWQgPSBzaWduZWQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29kZXJOdW1iZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHYgPSBiaWdudW1iZXJfMS5iaWdOdW1iZXJpZnkodmFsdWUpO1xuICAgICAgICAgICAgdiA9IHYudG9Ud29zKHRoaXMuc2l6ZSAqIDgpLm1hc2tuKHRoaXMuc2l6ZSAqIDgpO1xuICAgICAgICAgICAgLy92YWx1ZSA9IHZhbHVlLnRvVHdvcyhzaXplICogOCkubWFza24oc2l6ZSAqIDgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgdiA9IHYuZnJvbVR3b3ModGhpcy5zaXplICogOCkudG9Ud29zKDI1Nik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYnl0ZXNfMS5wYWRaZXJvcyhieXRlc18xLmFycmF5aWZ5KHYpLCAzMik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBudW1iZXIgdmFsdWUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgICAgIGFyZzogdGhpcy5sb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgY29kZXJUeXBlOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIENvZGVyTnVtYmVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IG9mZnNldCArIDMyKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW5zdWZmaWNpZW50IGRhdGEgZm9yICcgKyB0aGlzLm5hbWUgKyAnIHR5cGUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgICAgIGFyZzogdGhpcy5sb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgY29kZXJUeXBlOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGJ5dGVzXzEuaGV4bGlmeShkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgMzIpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGp1bmtMZW5ndGggPSAzMiAtIHRoaXMuc2l6ZTtcbiAgICAgICAgdmFyIHZhbHVlID0gYmlnbnVtYmVyXzEuYmlnTnVtYmVyaWZ5KGRhdGEuc2xpY2Uob2Zmc2V0ICsganVua0xlbmd0aCwgb2Zmc2V0ICsgMzIpKTtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmZyb21Ud29zKHRoaXMuc2l6ZSAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXNrbih0aGlzLnNpemUgKiA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uc3VtZWQ6IDMyLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY29lcmNlRnVuYyh0aGlzLm5hbWUsIHZhbHVlKSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBDb2Rlck51bWJlcjtcbn0oQ29kZXIpKTtcbnZhciB1aW50MjU2Q29kZXIgPSBuZXcgQ29kZXJOdW1iZXIoZnVuY3Rpb24gKHR5cGUsIHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfSwgMzIsIGZhbHNlLCAnbm9uZScpO1xudmFyIENvZGVyQm9vbGVhbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29kZXJCb29sZWFuLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvZGVyQm9vbGVhbihjb2VyY2VGdW5jLCBsb2NhbE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvZXJjZUZ1bmMsICdib29sJywgJ2Jvb2wnLCBsb2NhbE5hbWUsIGZhbHNlKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDb2RlckJvb2xlYW4ucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdWludDI1NkNvZGVyLmVuY29kZSghIXZhbHVlID8gMSA6IDApO1xuICAgIH07XG4gICAgQ29kZXJCb29sZWFuLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdWludDI1NkNvZGVyLmRlY29kZShkYXRhLCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlYXNvbiA9PT0gJ2luc3VmZmljaWVudCBkYXRhIGZvciB1aW50MjU2IHR5cGUnKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2luc3VmZmljaWVudCBkYXRhIGZvciBib29sZWFuIHR5cGUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgICAgICAgICBhcmc6IHRoaXMubG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb2RlclR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVycm9yLnZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uc3VtZWQ6IHJlc3VsdC5jb25zdW1lZCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNvZXJjZUZ1bmMoJ2Jvb2wnLCAhcmVzdWx0LnZhbHVlLmlzWmVybygpKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIENvZGVyQm9vbGVhbjtcbn0oQ29kZXIpKTtcbnZhciBDb2RlckZpeGVkQnl0ZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvZGVyRml4ZWRCeXRlcywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2RlckZpeGVkQnl0ZXMoY29lcmNlRnVuYywgbGVuZ3RoLCBsb2NhbE5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG5hbWUgPSAoJ2J5dGVzJyArIGxlbmd0aCk7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29lcmNlRnVuYywgbmFtZSwgbmFtZSwgbG9jYWxOYW1lLCBmYWxzZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvZGVyRml4ZWRCeXRlcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGJ5dGVzXzEuYXJyYXlpZnkodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5zZXQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCAnICsgdGhpcy5uYW1lICsgJyB2YWx1ZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgYXJnOiB0aGlzLmxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICBjb2RlclR5cGU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogKGVycm9yLnZhbHVlIHx8IHZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIENvZGVyRml4ZWRCeXRlcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIG9mZnNldCkge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvZmZzZXQgKyAzMikge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2luc3VmZmljaWVudCBkYXRhIGZvciAnICsgbmFtZSArICcgdHlwZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgYXJnOiB0aGlzLmxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICBjb2RlclR5cGU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYnl0ZXNfMS5oZXhsaWZ5KGRhdGEuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyAzMikpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uc3VtZWQ6IDMyLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY29lcmNlRnVuYyh0aGlzLm5hbWUsIGJ5dGVzXzEuaGV4bGlmeShkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5sZW5ndGgpKSlcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBDb2RlckZpeGVkQnl0ZXM7XG59KENvZGVyKSk7XG52YXIgQ29kZXJBZGRyZXNzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2RlckFkZHJlc3MsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29kZXJBZGRyZXNzKGNvZXJjZUZ1bmMsIGxvY2FsTmFtZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29lcmNlRnVuYywgJ2FkZHJlc3MnLCAnYWRkcmVzcycsIGxvY2FsTmFtZSwgZmFsc2UpIHx8IHRoaXM7XG4gICAgfVxuICAgIENvZGVyQWRkcmVzcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGJ5dGVzXzEuYXJyYXlpZnkoYWRkcmVzc18xLmdldEFkZHJlc3ModmFsdWUpKSwgMTIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgYWRkcmVzcycsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgYXJnOiB0aGlzLmxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICBjb2RlclR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBDb2RlckFkZHJlc3MucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChkYXRhLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgb2Zmc2V0ICsgMzIpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdpbnN1ZmZpY3VlbnQgZGF0YSBmb3IgYWRkcmVzcyB0eXBlJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHtcbiAgICAgICAgICAgICAgICBhcmc6IHRoaXMubG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgIGNvZGVyVHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBieXRlc18xLmhleGxpZnkoZGF0YS5zbGljZShvZmZzZXQsIG9mZnNldCArIDMyKSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25zdW1lZDogMzIsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jb2VyY2VGdW5jKCdhZGRyZXNzJywgYWRkcmVzc18xLmdldEFkZHJlc3MoYnl0ZXNfMS5oZXhsaWZ5KGRhdGEuc2xpY2Uob2Zmc2V0ICsgMTIsIG9mZnNldCArIDMyKSkpKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIENvZGVyQWRkcmVzcztcbn0oQ29kZXIpKTtcbmZ1bmN0aW9uIF9lbmNvZGVEeW5hbWljQnl0ZXModmFsdWUpIHtcbiAgICB2YXIgZGF0YUxlbmd0aCA9IDMyICogTWF0aC5jZWlsKHZhbHVlLmxlbmd0aCAvIDMyKTtcbiAgICB2YXIgcGFkZGluZyA9IG5ldyBVaW50OEFycmF5KGRhdGFMZW5ndGggLSB2YWx1ZS5sZW5ndGgpO1xuICAgIHJldHVybiBieXRlc18xLmNvbmNhdChbXG4gICAgICAgIHVpbnQyNTZDb2Rlci5lbmNvZGUodmFsdWUubGVuZ3RoKSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHBhZGRpbmdcbiAgICBdKTtcbn1cbmZ1bmN0aW9uIF9kZWNvZGVEeW5hbWljQnl0ZXMoZGF0YSwgb2Zmc2V0LCBsb2NhbE5hbWUpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGggPCBvZmZzZXQgKyAzMikge1xuICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW5zdWZmaWNpZW50IGRhdGEgZm9yIGR5bmFtaWNCeXRlcyBsZW5ndGgnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgYXJnOiBsb2NhbE5hbWUsXG4gICAgICAgICAgICBjb2RlclR5cGU6ICdkeW5hbWljQnl0ZXMnLFxuICAgICAgICAgICAgdmFsdWU6IGJ5dGVzXzEuaGV4bGlmeShkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgMzIpKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHVpbnQyNTZDb2Rlci5kZWNvZGUoZGF0YSwgb2Zmc2V0KS52YWx1ZTtcbiAgICB0cnkge1xuICAgICAgICBsZW5ndGggPSBsZW5ndGgudG9OdW1iZXIoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdkeW5hbWljIGJ5dGVzIGNvdW50IHRvbyBsYXJnZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICBhcmc6IGxvY2FsTmFtZSxcbiAgICAgICAgICAgIGNvZGVyVHlwZTogJ2R5bmFtaWNCeXRlcycsXG4gICAgICAgICAgICB2YWx1ZTogbGVuZ3RoLnRvU3RyaW5nKClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRhLmxlbmd0aCA8IG9mZnNldCArIDMyICsgbGVuZ3RoKSB7XG4gICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdpbnN1ZmZpY2llbnQgZGF0YSBmb3IgZHluYW1pY0J5dGVzIHR5cGUnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgYXJnOiBsb2NhbE5hbWUsXG4gICAgICAgICAgICBjb2RlclR5cGU6ICdkeW5hbWljQnl0ZXMnLFxuICAgICAgICAgICAgdmFsdWU6IGJ5dGVzXzEuaGV4bGlmeShkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgMzIgKyBsZW5ndGgpKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uc3VtZWQ6IDMyICsgMzIgKiBNYXRoLmNlaWwobGVuZ3RoIC8gMzIpLFxuICAgICAgICB2YWx1ZTogZGF0YS5zbGljZShvZmZzZXQgKyAzMiwgb2Zmc2V0ICsgMzIgKyBsZW5ndGgpLFxuICAgIH07XG59XG52YXIgQ29kZXJEeW5hbWljQnl0ZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvZGVyRHluYW1pY0J5dGVzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvZGVyRHluYW1pY0J5dGVzKGNvZXJjZUZ1bmMsIGxvY2FsTmFtZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29lcmNlRnVuYywgJ2J5dGVzJywgJ2J5dGVzJywgbG9jYWxOYW1lLCB0cnVlKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDb2RlckR5bmFtaWNCeXRlcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gX2VuY29kZUR5bmFtaWNCeXRlcyhieXRlc18xLmFycmF5aWZ5KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBieXRlcyB2YWx1ZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgYXJnOiB0aGlzLmxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICBjb2RlclR5cGU6ICdieXRlcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVycm9yLnZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIENvZGVyRHluYW1pY0J5dGVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBfZGVjb2RlRHluYW1pY0J5dGVzKGRhdGEsIG9mZnNldCwgdGhpcy5sb2NhbE5hbWUpO1xuICAgICAgICByZXN1bHQudmFsdWUgPSB0aGlzLmNvZXJjZUZ1bmMoJ2J5dGVzJywgYnl0ZXNfMS5oZXhsaWZ5KHJlc3VsdC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIENvZGVyRHluYW1pY0J5dGVzO1xufShDb2RlcikpO1xudmFyIENvZGVyU3RyaW5nID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2RlclN0cmluZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2RlclN0cmluZyhjb2VyY2VGdW5jLCBsb2NhbE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvZXJjZUZ1bmMsICdzdHJpbmcnLCAnc3RyaW5nJywgbG9jYWxOYW1lLCB0cnVlKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDb2RlclN0cmluZy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdpbnZhbGlkIHN0cmluZyB2YWx1ZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgYXJnOiB0aGlzLmxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICBjb2RlclR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9lbmNvZGVEeW5hbWljQnl0ZXModXRmOF8xLnRvVXRmOEJ5dGVzKHZhbHVlKSk7XG4gICAgfTtcbiAgICBDb2RlclN0cmluZy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIG9mZnNldCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gX2RlY29kZUR5bmFtaWNCeXRlcyhkYXRhLCBvZmZzZXQsIHRoaXMubG9jYWxOYW1lKTtcbiAgICAgICAgcmVzdWx0LnZhbHVlID0gdGhpcy5jb2VyY2VGdW5jKCdzdHJpbmcnLCB1dGY4XzEudG9VdGY4U3RyaW5nKHJlc3VsdC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIENvZGVyU3RyaW5nO1xufShDb2RlcikpO1xuZnVuY3Rpb24gYWxpZ25TaXplKHNpemUpIHtcbiAgICByZXR1cm4gMzIgKiBNYXRoLmNlaWwoc2l6ZSAvIDMyKTtcbn1cbmZ1bmN0aW9uIHBhY2soY29kZXJzLCB2YWx1ZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWVzICYmIHR5cGVvZiAodmFsdWVzKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIGFycmF5VmFsdWVzID0gW107XG4gICAgICAgIGNvZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChjb2Rlcikge1xuICAgICAgICAgICAgYXJyYXlWYWx1ZXMucHVzaCh2YWx1ZXNbY29kZXIubG9jYWxOYW1lXSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YWx1ZXMgPSBhcnJheVZhbHVlcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCdpbnZhbGlkIHR1cGxlIHZhbHVlJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHtcbiAgICAgICAgICAgIGNvZGVyVHlwZTogJ3R1cGxlJyxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZXNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjb2RlcnMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCd0eXBlcy92YWx1ZSBsZW5ndGggbWlzbWF0Y2gnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgY29kZXJUeXBlOiAndHVwbGUnLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgY29kZXJzLmZvckVhY2goZnVuY3Rpb24gKGNvZGVyLCBpbmRleCkge1xuICAgICAgICBwYXJ0cy5wdXNoKHsgZHluYW1pYzogY29kZXIuZHluYW1pYywgdmFsdWU6IGNvZGVyLmVuY29kZSh2YWx1ZXNbaW5kZXhdKSB9KTtcbiAgICB9KTtcbiAgICB2YXIgc3RhdGljU2l6ZSA9IDAsIGR5bmFtaWNTaXplID0gMDtcbiAgICBwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgIGlmIChwYXJ0LmR5bmFtaWMpIHtcbiAgICAgICAgICAgIHN0YXRpY1NpemUgKz0gMzI7XG4gICAgICAgICAgICBkeW5hbWljU2l6ZSArPSBhbGlnblNpemUocGFydC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhdGljU2l6ZSArPSBhbGlnblNpemUocGFydC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG9mZnNldCA9IDAsIGR5bmFtaWNPZmZzZXQgPSBzdGF0aWNTaXplO1xuICAgIHZhciBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc3RhdGljU2l6ZSArIGR5bmFtaWNTaXplKTtcbiAgICBwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgIGlmIChwYXJ0LmR5bmFtaWMpIHtcbiAgICAgICAgICAgIC8vdWludDI1NkNvZGVyLmVuY29kZShkeW5hbWljT2Zmc2V0KS5jb3B5KGRhdGEsIG9mZnNldCk7XG4gICAgICAgICAgICBkYXRhLnNldCh1aW50MjU2Q29kZXIuZW5jb2RlKGR5bmFtaWNPZmZzZXQpLCBvZmZzZXQpO1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDMyO1xuICAgICAgICAgICAgLy9wYXJ0LnZhbHVlLmNvcHkoZGF0YSwgZHluYW1pY09mZnNldCk7ICBAVE9ET1xuICAgICAgICAgICAgZGF0YS5zZXQocGFydC52YWx1ZSwgZHluYW1pY09mZnNldCk7XG4gICAgICAgICAgICBkeW5hbWljT2Zmc2V0ICs9IGFsaWduU2l6ZShwYXJ0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3BhcnQudmFsdWUuY29weShkYXRhLCBvZmZzZXQpOyAgQFRPRE9cbiAgICAgICAgICAgIGRhdGEuc2V0KHBhcnQudmFsdWUsIG9mZnNldCk7XG4gICAgICAgICAgICBvZmZzZXQgKz0gYWxpZ25TaXplKHBhcnQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuZnVuY3Rpb24gdW5wYWNrKGNvZGVycywgZGF0YSwgb2Zmc2V0KSB7XG4gICAgdmFyIGJhc2VPZmZzZXQgPSBvZmZzZXQ7XG4gICAgdmFyIGNvbnN1bWVkID0gMDtcbiAgICB2YXIgdmFsdWUgPSBbXTtcbiAgICBjb2RlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29kZXIpIHtcbiAgICAgICAgaWYgKGNvZGVyLmR5bmFtaWMpIHtcbiAgICAgICAgICAgIHZhciBkeW5hbWljT2Zmc2V0ID0gdWludDI1NkNvZGVyLmRlY29kZShkYXRhLCBvZmZzZXQpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNvZGVyLmRlY29kZShkYXRhLCBiYXNlT2Zmc2V0ICsgZHluYW1pY09mZnNldC52YWx1ZS50b051bWJlcigpKTtcbiAgICAgICAgICAgIC8vIFRoZSBkeW5hbWljIHBhcnQgaXMgbGVhcC1mcm9nZ2VkIHNvbWV3aGVyZSBlbHNlOyBkb2Vzbid0IGNvdW50IHRvd2FyZHMgc2l6ZVxuICAgICAgICAgICAgcmVzdWx0LmNvbnN1bWVkID0gZHluYW1pY09mZnNldC5jb25zdW1lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBjb2Rlci5kZWNvZGUoZGF0YSwgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0LnZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCArPSByZXN1bHQuY29uc3VtZWQ7XG4gICAgICAgIGNvbnN1bWVkICs9IHJlc3VsdC5jb25zdW1lZDtcbiAgICB9KTtcbiAgICBjb2RlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29kZXIsIGluZGV4KSB7XG4gICAgICAgIHZhciBuYW1lID0gY29kZXIubG9jYWxOYW1lO1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgICAgICAgIG5hbWUgPSAnX2xlbmd0aCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZVtuYW1lXSA9IHZhbHVlW2luZGV4XTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbnN1bWVkOiBjb25zdW1lZFxuICAgIH07XG59XG52YXIgQ29kZXJBcnJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29kZXJBcnJheSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2RlckFycmF5KGNvZXJjZUZ1bmMsIGNvZGVyLCBsZW5ndGgsIGxvY2FsTmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHlwZSA9IChjb2Rlci50eXBlICsgJ1snICsgKGxlbmd0aCA+PSAwID8gbGVuZ3RoIDogJycpICsgJ10nKTtcbiAgICAgICAgdmFyIGR5bmFtaWMgPSAobGVuZ3RoID09PSAtMSB8fCBjb2Rlci5keW5hbWljKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb2VyY2VGdW5jLCAnYXJyYXknLCB0eXBlLCBsb2NhbE5hbWUsIGR5bmFtaWMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNvZGVyID0gY29kZXI7XG4gICAgICAgIF90aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb2RlckFycmF5LnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2V4cGVjdGVkIGFycmF5IHZhbHVlJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHtcbiAgICAgICAgICAgICAgICBhcmc6IHRoaXMubG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgIGNvZGVyVHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb3VudCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvdW50ID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgcmVzdWx0ID0gdWludDI1NkNvZGVyLmVuY29kZShjb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JzLmNoZWNrQXJndW1lbnRDb3VudChjb3VudCwgdmFsdWUubGVuZ3RoLCAnaW4gY29kZXIgYXJyYXknICsgKHRoaXMubG9jYWxOYW1lID8gKFwiIFwiICsgdGhpcy5sb2NhbE5hbWUpIDogXCJcIikpO1xuICAgICAgICB2YXIgY29kZXJzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvZGVycy5wdXNoKHRoaXMuY29kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlc18xLmNvbmNhdChbcmVzdWx0LCBwYWNrKGNvZGVycywgdmFsdWUpXSk7XG4gICAgfTtcbiAgICBDb2RlckFycmF5LnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIEBUT0RPOlxuICAgICAgICAvL2lmIChkYXRhLmxlbmd0aCA8IG9mZnNldCArIGxlbmd0aCAqIDMyKSB7IHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcnJheScpOyB9XG4gICAgICAgIHZhciBjb25zdW1lZCA9IDA7XG4gICAgICAgIHZhciBjb3VudCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBpZiAoY291bnQgPT09IC0xKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvZGVkTGVuZ3RoID0gdWludDI1NkNvZGVyLmRlY29kZShkYXRhLCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2luc3VmZmljaWVudCBkYXRhIGZvciBkeW5hbWljIGFycmF5IGxlbmd0aCcsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgICAgIGFyZzogdGhpcy5sb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVyVHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVycm9yLnZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gZGVjb2RlZExlbmd0aC52YWx1ZS50b051bWJlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2FycmF5IGNvdW50IHRvbyBsYXJnZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgICAgICAgICAgICAgIGFyZzogdGhpcy5sb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVyVHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRlY29kZWRMZW5ndGgudmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3VtZWQgKz0gZGVjb2RlZExlbmd0aC5jb25zdW1lZDtcbiAgICAgICAgICAgIG9mZnNldCArPSBkZWNvZGVkTGVuZ3RoLmNvbnN1bWVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb2RlcnMucHVzaChuZXcgQ29kZXJBbm9ueW1vdXModGhpcy5jb2RlcikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB1bnBhY2soY29kZXJzLCBkYXRhLCBvZmZzZXQpO1xuICAgICAgICByZXN1bHQuY29uc3VtZWQgKz0gY29uc3VtZWQ7XG4gICAgICAgIHJlc3VsdC52YWx1ZSA9IHRoaXMuY29lcmNlRnVuYyh0aGlzLnR5cGUsIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gQ29kZXJBcnJheTtcbn0oQ29kZXIpKTtcbnZhciBDb2RlclR1cGxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2RlclR1cGxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvZGVyVHVwbGUoY29lcmNlRnVuYywgY29kZXJzLCBsb2NhbE5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGR5bmFtaWMgPSBmYWxzZTtcbiAgICAgICAgdmFyIHR5cGVzID0gW107XG4gICAgICAgIGNvZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChjb2Rlcikge1xuICAgICAgICAgICAgaWYgKGNvZGVyLmR5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICBkeW5hbWljID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzLnB1c2goY29kZXIudHlwZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdHlwZSA9ICgndHVwbGUoJyArIHR5cGVzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29lcmNlRnVuYywgJ3R1cGxlJywgdHlwZSwgbG9jYWxOYW1lLCBkeW5hbWljKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb2RlcnMgPSBjb2RlcnM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29kZXJUdXBsZS5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBwYWNrKHRoaXMuY29kZXJzLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBDb2RlclR1cGxlLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB1bnBhY2sodGhpcy5jb2RlcnMsIGRhdGEsIG9mZnNldCk7XG4gICAgICAgIHJlc3VsdC52YWx1ZSA9IHRoaXMuY29lcmNlRnVuYyh0aGlzLnR5cGUsIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gQ29kZXJUdXBsZTtcbn0oQ29kZXIpKTtcbi8qXG5mdW5jdGlvbiBnZXRUeXBlcyhjb2RlcnMpIHtcbiAgICB2YXIgdHlwZSA9IGNvZGVyVHVwbGUoY29kZXJzKS50eXBlO1xuICAgIHJldHVybiB0eXBlLnN1YnN0cmluZyg2LCB0eXBlLmxlbmd0aCAtIDEpO1xufVxuKi9cbmZ1bmN0aW9uIHNwbGl0TmVzdGluZyh2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYWNjdW0gPSAnJztcbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IHZhbHVlLmxlbmd0aDsgb2Zmc2V0KyspIHtcbiAgICAgICAgdmFyIGMgPSB2YWx1ZVtvZmZzZXRdO1xuICAgICAgICBpZiAoYyA9PT0gJywnICYmIGRlcHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhY2N1bSk7XG4gICAgICAgICAgICBhY2N1bSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWNjdW0gKz0gYztcbiAgICAgICAgICAgIGlmIChjID09PSAnKCcpIHtcbiAgICAgICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYyA9PT0gJyknKSB7XG4gICAgICAgICAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5iYWxhbmNlZCBwYXJlbnRoc2lzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKGFjY3VtKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8gQFRPRE86IElzIHRoZXJlIGEgd2F5IHRvIHJldHVybiBcImNsYXNzXCI/XG52YXIgcGFyYW1UeXBlU2ltcGxlID0ge1xuICAgIGFkZHJlc3M6IENvZGVyQWRkcmVzcyxcbiAgICBib29sOiBDb2RlckJvb2xlYW4sXG4gICAgc3RyaW5nOiBDb2RlclN0cmluZyxcbiAgICBieXRlczogQ29kZXJEeW5hbWljQnl0ZXMsXG59O1xuZnVuY3Rpb24gZ2V0VHVwbGVQYXJhbUNvZGVyKGNvZXJjZUZ1bmMsIGNvbXBvbmVudHMsIGxvY2FsTmFtZSkge1xuICAgIGlmICghY29tcG9uZW50cykge1xuICAgICAgICBjb21wb25lbnRzID0gW107XG4gICAgfVxuICAgIHZhciBjb2RlcnMgPSBbXTtcbiAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICBjb2RlcnMucHVzaChnZXRQYXJhbUNvZGVyKGNvZXJjZUZ1bmMsIGNvbXBvbmVudCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgQ29kZXJUdXBsZShjb2VyY2VGdW5jLCBjb2RlcnMsIGxvY2FsTmFtZSk7XG59XG5mdW5jdGlvbiBnZXRQYXJhbUNvZGVyKGNvZXJjZUZ1bmMsIHBhcmFtKSB7XG4gICAgdmFyIGNvZGVyID0gcGFyYW1UeXBlU2ltcGxlW3BhcmFtLnR5cGVdO1xuICAgIGlmIChjb2Rlcikge1xuICAgICAgICByZXR1cm4gbmV3IGNvZGVyKGNvZXJjZUZ1bmMsIHBhcmFtLm5hbWUpO1xuICAgIH1cbiAgICB2YXIgbWF0Y2ggPSBwYXJhbS50eXBlLm1hdGNoKHBhcmFtVHlwZU51bWJlcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQobWF0Y2hbMl0gfHwgXCIyNTZcIik7XG4gICAgICAgIGlmIChzaXplID09PSAwIHx8IHNpemUgPiAyNTYgfHwgKHNpemUgJSA4KSAhPT0gMCkge1xuICAgICAgICAgICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgJyArIG1hdGNoWzFdICsgJyBiaXQgbGVuZ3RoJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHtcbiAgICAgICAgICAgICAgICBhcmc6ICdwYXJhbScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcmFtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvZGVyTnVtYmVyKGNvZXJjZUZ1bmMsIHNpemUgLyA4LCAobWF0Y2hbMV0gPT09ICdpbnQnKSwgcGFyYW0ubmFtZSk7XG4gICAgfVxuICAgIHZhciBtYXRjaCA9IHBhcmFtLnR5cGUubWF0Y2gocGFyYW1UeXBlQnl0ZXMpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgICAgaWYgKHNpemUgPT09IDAgfHwgc2l6ZSA+IDMyKSB7XG4gICAgICAgICAgICBlcnJvcnMudGhyb3dFcnJvcignaW52YWxpZCBieXRlcyBsZW5ndGgnLCBlcnJvcnMuSU5WQUxJRF9BUkdVTUVOVCwge1xuICAgICAgICAgICAgICAgIGFyZzogJ3BhcmFtJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyYW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ29kZXJGaXhlZEJ5dGVzKGNvZXJjZUZ1bmMsIHNpemUsIHBhcmFtLm5hbWUpO1xuICAgIH1cbiAgICB2YXIgbWF0Y2ggPSBwYXJhbS50eXBlLm1hdGNoKHBhcmFtVHlwZUFycmF5KTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludChtYXRjaFsyXSB8fCBcIi0xXCIpO1xuICAgICAgICBwYXJhbSA9IHByb3BlcnRpZXNfMS5qc29uQ29weShwYXJhbSk7XG4gICAgICAgIHBhcmFtLnR5cGUgPSBtYXRjaFsxXTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2RlckFycmF5KGNvZXJjZUZ1bmMsIGdldFBhcmFtQ29kZXIoY29lcmNlRnVuYywgcGFyYW0pLCBzaXplLCBwYXJhbS5uYW1lKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtLnR5cGUuc3Vic3RyaW5nKDAsIDUpID09PSAndHVwbGUnKSB7XG4gICAgICAgIHJldHVybiBnZXRUdXBsZVBhcmFtQ29kZXIoY29lcmNlRnVuYywgcGFyYW0uY29tcG9uZW50cywgcGFyYW0ubmFtZSk7XG4gICAgfVxuICAgIGlmIChwYXJhbS50eXBlID09PSAnJykge1xuICAgICAgICByZXR1cm4gbmV3IENvZGVyTnVsbChjb2VyY2VGdW5jLCBwYXJhbS5uYW1lKTtcbiAgICB9XG4gICAgZXJyb3JzLnRocm93RXJyb3IoJ2ludmFsaWQgdHlwZScsIGVycm9ycy5JTlZBTElEX0FSR1VNRU5ULCB7XG4gICAgICAgIGFyZzogJ3R5cGUnLFxuICAgICAgICB2YWx1ZTogcGFyYW0udHlwZVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsO1xufVxudmFyIEFiaUNvZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFiaUNvZGVyKGNvZXJjZUZ1bmMpIHtcbiAgICAgICAgZXJyb3JzLmNoZWNrTmV3KHRoaXMsIEFiaUNvZGVyKTtcbiAgICAgICAgaWYgKCFjb2VyY2VGdW5jKSB7XG4gICAgICAgICAgICBjb2VyY2VGdW5jID0gZXhwb3J0cy5kZWZhdWx0Q29lcmNlRnVuYztcbiAgICAgICAgfVxuICAgICAgICBwcm9wZXJ0aWVzXzEuZGVmaW5lUmVhZE9ubHkodGhpcywgJ2NvZXJjZUZ1bmMnLCBjb2VyY2VGdW5jKTtcbiAgICB9XG4gICAgQWJpQ29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uICh0eXBlcywgdmFsdWVzKSB7XG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGggIT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ycy50aHJvd0Vycm9yKCd0eXBlcy92YWx1ZXMgbGVuZ3RoIG1pc21hdGNoJywgZXJyb3JzLklOVkFMSURfQVJHVU1FTlQsIHtcbiAgICAgICAgICAgICAgICBjb3VudDogeyB0eXBlczogdHlwZXMubGVuZ3RoLCB2YWx1ZXM6IHZhbHVlcy5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogeyB0eXBlczogdHlwZXMsIHZhbHVlczogdmFsdWVzIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlcnMgPSBbXTtcbiAgICAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0eXBlcyB0byB0eXBlIG9iamVjdHNcbiAgICAgICAgICAgIC8vICAgLSBcInVpbnQgZm9vXCIgPT4geyB0eXBlOiBcInVpbnRcIiwgbmFtZTogXCJmb29cIiB9XG4gICAgICAgICAgICAvLyAgIC0gXCJ0dXBsZSh1aW50LCB1aW50KVwiID0+IHsgdHlwZTogXCJ0dXBsZVwiLCBjb21wb25lbnRzOiBbIHsgdHlwZTogXCJ1aW50XCIgfSwgeyB0eXBlOiBcInVpbnRcIiB9LCBdIH1cbiAgICAgICAgICAgIHZhciB0eXBlT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHR5cGUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHR5cGVPYmplY3QgPSBwYXJzZVBhcmFtKHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZU9iamVjdCA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlcnMucHVzaChnZXRQYXJhbUNvZGVyKHRoaXMuY29lcmNlRnVuYywgdHlwZU9iamVjdCkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIGJ5dGVzXzEuaGV4bGlmeShuZXcgQ29kZXJUdXBsZSh0aGlzLmNvZXJjZUZ1bmMsIGNvZGVycywgJ18nKS5lbmNvZGUodmFsdWVzKSk7XG4gICAgfTtcbiAgICBBYmlDb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKHR5cGVzLCBkYXRhKSB7XG4gICAgICAgIHZhciBjb2RlcnMgPSBbXTtcbiAgICAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgLy8gU2VlIGVuY29kZSBmb3IgZGV0YWlsc1xuICAgICAgICAgICAgdmFyIHR5cGVPYmplY3QgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAodHlwZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHlwZU9iamVjdCA9IHBhcnNlUGFyYW0odHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlT2JqZWN0ID0gcHJvcGVydGllc18xLmpzb25Db3B5KHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZXJzLnB1c2goZ2V0UGFyYW1Db2Rlcih0aGlzLmNvZXJjZUZ1bmMsIHR5cGVPYmplY3QpKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiBuZXcgQ29kZXJUdXBsZSh0aGlzLmNvZXJjZUZ1bmMsIGNvZGVycywgJ18nKS5kZWNvZGUoYnl0ZXNfMS5hcnJheWlmeShkYXRhKSwgMCkudmFsdWU7XG4gICAgfTtcbiAgICByZXR1cm4gQWJpQ29kZXI7XG59KCkpO1xuZXhwb3J0cy5BYmlDb2RlciA9IEFiaUNvZGVyO1xuZXhwb3J0cy5kZWZhdWx0QWJpQ29kZXIgPSBuZXcgQWJpQ29kZXIoKTtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb3JlID0gcmVxdWlyZSgnd2ViMy1jb3JlJyk7XG52YXIgTWV0aG9kID0gcmVxdWlyZSgnd2ViMy1jb3JlLW1ldGhvZCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnd2ViMy11dGlscycpO1xuXG5cbnZhciBOZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIHNldHMgX3JlcXVlc3RtYW5hZ2VyXG4gICAgY29yZS5wYWNrYWdlSW5pdCh0aGlzLCBhcmd1bWVudHMpO1xuXG5cbiAgICBbXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldElkJyxcbiAgICAgICAgICAgIGNhbGw6ICduZXRfdmVyc2lvbicsXG4gICAgICAgICAgICBwYXJhbXM6IDAsXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IHV0aWxzLmhleFRvTnVtYmVyXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdpc0xpc3RlbmluZycsXG4gICAgICAgICAgICBjYWxsOiAnbmV0X2xpc3RlbmluZycsXG4gICAgICAgICAgICBwYXJhbXM6IDBcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldFBlZXJDb3VudCcsXG4gICAgICAgICAgICBjYWxsOiAnbmV0X3BlZXJDb3VudCcsXG4gICAgICAgICAgICBwYXJhbXM6IDAsXG4gICAgICAgICAgICBvdXRwdXRGb3JtYXR0ZXI6IHV0aWxzLmhleFRvTnVtYmVyXG4gICAgICAgIH0pXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuYXR0YWNoVG9PYmplY3QoX3RoaXMpO1xuICAgICAgICBtZXRob2Quc2V0UmVxdWVzdE1hbmFnZXIoX3RoaXMuX3JlcXVlc3RNYW5hZ2VyKTtcbiAgICB9KTtcblxufTtcblxuY29yZS5hZGRQcm92aWRlcnMoTmV0KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE5ldDtcblxuXG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY29yZSA9IHJlcXVpcmUoJ3dlYjMtY29yZScpO1xudmFyIE1ldGhvZCA9IHJlcXVpcmUoJ3dlYjMtY29yZS1tZXRob2QnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ3dlYjMtdXRpbHMnKTtcbnZhciBOZXQgPSByZXF1aXJlKCd3ZWIzLW5ldCcpO1xuXG52YXIgZm9ybWF0dGVycyA9IHJlcXVpcmUoJ3dlYjMtY29yZS1oZWxwZXJzJykuZm9ybWF0dGVycztcblxuXG52YXIgUGVyc29uYWwgPSBmdW5jdGlvbiBQZXJzb25hbCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gc2V0cyBfcmVxdWVzdG1hbmFnZXJcbiAgICBjb3JlLnBhY2thZ2VJbml0KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLm5ldCA9IG5ldyBOZXQodGhpcy5jdXJyZW50UHJvdmlkZXIpO1xuXG4gICAgdmFyIGRlZmF1bHRBY2NvdW50ID0gbnVsbDtcbiAgICB2YXIgZGVmYXVsdEJsb2NrID0gJ2xhdGVzdCc7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlZmF1bHRBY2NvdW50Jywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QWNjb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZih2YWwpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWNjb3VudCA9IHV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGZvcm1hdHRlcnMuaW5wdXRBZGRyZXNzRm9ybWF0dGVyKHZhbCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZGVmYXVsdEJsb2NrXG4gICAgICAgICAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmRlZmF1bHRBY2NvdW50ID0gZGVmYXVsdEFjY291bnQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdEJsb2NrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QmxvY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgZGVmYXVsdEJsb2NrID0gdmFsO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZGVmYXVsdEJsb2NrXG4gICAgICAgICAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmRlZmF1bHRCbG9jayA9IGRlZmF1bHRCbG9jaztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cblxuICAgIHZhciBtZXRob2RzID0gW1xuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRBY2NvdW50cycsXG4gICAgICAgICAgICBjYWxsOiAncGVyc29uYWxfbGlzdEFjY291bnRzJyxcbiAgICAgICAgICAgIHBhcmFtczogMCxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMudG9DaGVja3N1bUFkZHJlc3NcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ25ld0FjY291bnQnLFxuICAgICAgICAgICAgY2FsbDogJ3BlcnNvbmFsX25ld0FjY291bnQnLFxuICAgICAgICAgICAgcGFyYW1zOiAxLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtudWxsXSxcbiAgICAgICAgICAgIG91dHB1dEZvcm1hdHRlcjogdXRpbHMudG9DaGVja3N1bUFkZHJlc3NcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ3VubG9ja0FjY291bnQnLFxuICAgICAgICAgICAgY2FsbDogJ3BlcnNvbmFsX3VubG9ja0FjY291bnQnLFxuICAgICAgICAgICAgcGFyYW1zOiAzLFxuICAgICAgICAgICAgaW5wdXRGb3JtYXR0ZXI6IFtmb3JtYXR0ZXJzLmlucHV0QWRkcmVzc0Zvcm1hdHRlciwgbnVsbCwgbnVsbF1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2xvY2tBY2NvdW50JyxcbiAgICAgICAgICAgIGNhbGw6ICdwZXJzb25hbF9sb2NrQWNjb3VudCcsXG4gICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlcnMuaW5wdXRBZGRyZXNzRm9ybWF0dGVyXVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnaW1wb3J0UmF3S2V5JyxcbiAgICAgICAgICAgIGNhbGw6ICdwZXJzb25hbF9pbXBvcnRSYXdLZXknLFxuICAgICAgICAgICAgcGFyYW1zOiAyXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdzZW5kVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgY2FsbDogJ3BlcnNvbmFsX3NlbmRUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICBwYXJhbXM6IDIsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlcnMuaW5wdXRUcmFuc2FjdGlvbkZvcm1hdHRlciwgbnVsbF1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ3NpZ25UcmFuc2FjdGlvbicsXG4gICAgICAgICAgICBjYWxsOiAncGVyc29uYWxfc2lnblRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dFRyYW5zYWN0aW9uRm9ybWF0dGVyLCBudWxsXVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnc2lnbicsXG4gICAgICAgICAgICBjYWxsOiAncGVyc29uYWxfc2lnbicsXG4gICAgICAgICAgICBwYXJhbXM6IDMsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlcnMuaW5wdXRTaWduRm9ybWF0dGVyLCBmb3JtYXR0ZXJzLmlucHV0QWRkcmVzc0Zvcm1hdHRlciwgbnVsbF1cbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2VjUmVjb3ZlcicsXG4gICAgICAgICAgICBjYWxsOiAncGVyc29uYWxfZWNSZWNvdmVyJyxcbiAgICAgICAgICAgIHBhcmFtczogMixcbiAgICAgICAgICAgIGlucHV0Rm9ybWF0dGVyOiBbZm9ybWF0dGVycy5pbnB1dFNpZ25Gb3JtYXR0ZXIsIG51bGxdXG4gICAgICAgIH0pXG4gICAgXTtcbiAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIG1ldGhvZC5hdHRhY2hUb09iamVjdChfdGhpcyk7XG4gICAgICAgIG1ldGhvZC5zZXRSZXF1ZXN0TWFuYWdlcihfdGhpcy5fcmVxdWVzdE1hbmFnZXIpO1xuICAgICAgICBtZXRob2QuZGVmYXVsdEJsb2NrID0gX3RoaXMuZGVmYXVsdEJsb2NrO1xuICAgICAgICBtZXRob2QuZGVmYXVsdEFjY291bnQgPSBfdGhpcy5kZWZhdWx0QWNjb3VudDtcbiAgICB9KTtcbn07XG5cbmNvcmUuYWRkUHJvdmlkZXJzKFBlcnNvbmFsKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGVyc29uYWw7XG5cblxuIiwiLypcbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiB3ZWIzLmpzLlxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB3ZWIzLmpzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbi8qKlxuICogQGZpbGUgUmVnaXN0cnkuanNcbiAqXG4gKiBAYXV0aG9yIFNhbXVlbCBGdXJ0ZXIgPHNhbXVlbEBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIENvbnRyYWN0ID0gcmVxdWlyZSgnd2ViMy1ldGgtY29udHJhY3QnKTtcbnZhciBuYW1laGFzaCA9IHJlcXVpcmUoJ2V0aC1lbnMtbmFtZWhhc2gnKTtcbnZhciBQcm9taUV2ZW50ID0gcmVxdWlyZSgnd2ViMy1jb3JlLXByb21pZXZlbnQnKTtcbnZhciBSRUdJU1RSWV9BQkkgPSByZXF1aXJlKCcuLi9yZXNzb3VyY2VzL0FCSS9SZWdpc3RyeScpO1xudmFyIFJFU09MVkVSX0FCSSA9IHJlcXVpcmUoJy4uL3Jlc3NvdXJjZXMvQUJJL1Jlc29sdmVyJyk7XG5cblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIHRoZSBFTlMgcmVnaXN0cnkgY29udHJhY3QuXG4gKlxuICogQG1ldGhvZCBSZWdpc3RyeVxuICogQHBhcmFtIHtFbnN9IGVuc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlZ2lzdHJ5KGVucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmVucyA9IGVucztcbiAgICB0aGlzLmNvbnRyYWN0ID0gZW5zLmNoZWNrTmV0d29yaygpLnRoZW4oZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICAgICAgdmFyIGNvbnRyYWN0ID0gbmV3IENvbnRyYWN0KFJFR0lTVFJZX0FCSSwgYWRkcmVzcyk7XG4gICAgICAgIGNvbnRyYWN0LnNldFByb3ZpZGVyKHNlbGYuZW5zLmV0aC5jdXJyZW50UHJvdmlkZXIpO1xuXG4gICAgICAgIHJldHVybiBjb250cmFjdDtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhZGRyZXNzIG9mIHRoZSBvd25lciBvZiBhbiBFTlMgbmFtZS5cbiAqXG4gKiBAbWV0aG9kIG93bmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAqL1xuUmVnaXN0cnkucHJvdG90eXBlLm93bmVyID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHByb21pRXZlbnQgPSBuZXcgUHJvbWlFdmVudCh0cnVlKTtcblxuICAgIHRoaXMuY29udHJhY3QudGhlbihmdW5jdGlvbiAoY29udHJhY3QpIHtcbiAgICAgICAgY29udHJhY3QubWV0aG9kcy5vd25lcihuYW1laGFzaC5oYXNoKG5hbWUpKS5jYWxsKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZWNlaXB0KSB7XG4gICAgICAgICAgICAgICAgcHJvbWlFdmVudC5yZXNvbHZlKHJlY2VpcHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVjZWlwdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBwcm9taUV2ZW50LnJlamVjdChlcnJvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlFdmVudC5ldmVudEVtaXR0ZXI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc29sdmVyIGNvbnRyYWN0IGFzc29jaWF0ZWQgd2l0aCBhIG5hbWUuXG4gKlxuICogQG1ldGhvZCByZXNvbHZlclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2U8Q29udHJhY3Q+fVxuICovXG5SZWdpc3RyeS5wcm90b3R5cGUucmVzb2x2ZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLmNvbnRyYWN0LnRoZW4oZnVuY3Rpb24gKGNvbnRyYWN0KSB7XG4gICAgICAgIHJldHVybiBjb250cmFjdC5tZXRob2RzLnJlc29sdmVyKG5hbWVoYXNoLmhhc2gobmFtZSkpLmNhbGwoKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgICAgIHZhciBjb250cmFjdCA9IG5ldyBDb250cmFjdChSRVNPTFZFUl9BQkksIGFkZHJlc3MpO1xuICAgICAgICBjb250cmFjdC5zZXRQcm92aWRlcihzZWxmLmVucy5ldGguY3VycmVudFByb3ZpZGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyYWN0O1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RyeTtcbiIsIi8qXG4gVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBNYXJlayBLb3Rld2ljeiA8bWFyZWtAcGFyaXR5LmlvPlxuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZnJvemVtYW4uZGU+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCd3ZWIzLXV0aWxzJyk7XG5cbnZhciBFdGhlcnNBYmkgPSByZXF1aXJlKCdldGhlcnMvdXRpbHMvYWJpLWNvZGVyJykuQWJpQ29kZXI7XG52YXIgZXRoZXJzQWJpQ29kZXIgPSBuZXcgRXRoZXJzQWJpKGZ1bmN0aW9uICh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlLm1hdGNoKC9edT9pbnQvKSAmJiAhXy5pc0FycmF5KHZhbHVlKSAmJiAoIV8uaXNPYmplY3QodmFsdWUpIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdCTicpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59KTtcblxuLy8gcmVzdWx0IG1ldGhvZFxuZnVuY3Rpb24gUmVzdWx0KCkge1xufVxuXG4vKipcbiAqIEFCSUNvZGVyIHByb3RvdHlwZSBzaG91bGQgYmUgdXNlZCB0byBlbmNvZGUvZGVjb2RlIHNvbGlkaXR5IHBhcmFtcyBvZiBhbnkgdHlwZVxuICovXG52YXIgQUJJQ29kZXIgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG4vKipcbiAqIEVuY29kZXMgdGhlIGZ1bmN0aW9uIG5hbWUgdG8gaXRzIEFCSSByZXByZXNlbnRhdGlvbiwgd2hpY2ggYXJlIHRoZSBmaXJzdCA0IGJ5dGVzIG9mIHRoZSBzaGEzIG9mIHRoZSBmdW5jdGlvbiBuYW1lIGluY2x1ZGluZyAgdHlwZXMuXG4gKlxuICogQG1ldGhvZCBlbmNvZGVGdW5jdGlvblNpZ25hdHVyZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmdW5jdGlvbk5hbWVcbiAqIEByZXR1cm4ge1N0cmluZ30gZW5jb2RlZCBmdW5jdGlvbiBuYW1lXG4gKi9cbkFCSUNvZGVyLnByb3RvdHlwZS5lbmNvZGVGdW5jdGlvblNpZ25hdHVyZSA9IGZ1bmN0aW9uIChmdW5jdGlvbk5hbWUpIHtcbiAgICBpZiAoXy5pc09iamVjdChmdW5jdGlvbk5hbWUpKSB7XG4gICAgICAgIGZ1bmN0aW9uTmFtZSA9IHV0aWxzLl9qc29uSW50ZXJmYWNlTWV0aG9kVG9TdHJpbmcoZnVuY3Rpb25OYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuc2hhMyhmdW5jdGlvbk5hbWUpLnNsaWNlKDAsIDEwKTtcbn07XG5cbi8qKlxuICogRW5jb2RlcyB0aGUgZnVuY3Rpb24gbmFtZSB0byBpdHMgQUJJIHJlcHJlc2VudGF0aW9uLCB3aGljaCBhcmUgdGhlIGZpcnN0IDQgYnl0ZXMgb2YgdGhlIHNoYTMgb2YgdGhlIGZ1bmN0aW9uIG5hbWUgaW5jbHVkaW5nICB0eXBlcy5cbiAqXG4gKiBAbWV0aG9kIGVuY29kZUV2ZW50U2lnbmF0dXJlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZ1bmN0aW9uTmFtZVxuICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkIGZ1bmN0aW9uIG5hbWVcbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmVuY29kZUV2ZW50U2lnbmF0dXJlID0gZnVuY3Rpb24gKGZ1bmN0aW9uTmFtZSkge1xuICAgIGlmIChfLmlzT2JqZWN0KGZ1bmN0aW9uTmFtZSkpIHtcbiAgICAgICAgZnVuY3Rpb25OYW1lID0gdXRpbHMuX2pzb25JbnRlcmZhY2VNZXRob2RUb1N0cmluZyhmdW5jdGlvbk5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5zaGEzKGZ1bmN0aW9uTmFtZSk7XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIGVuY29kZSBwbGFpbiBwYXJhbVxuICpcbiAqIEBtZXRob2QgZW5jb2RlUGFyYW1ldGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWQgcGxhaW4gcGFyYW1cbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmVuY29kZVBhcmFtZXRlciA9IGZ1bmN0aW9uICh0eXBlLCBwYXJhbSkge1xuICAgIHJldHVybiB0aGlzLmVuY29kZVBhcmFtZXRlcnMoW3R5cGVdLCBbcGFyYW1dKTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gZW5jb2RlIGxpc3Qgb2YgcGFyYW1zXG4gKlxuICogQG1ldGhvZCBlbmNvZGVQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSB0eXBlc1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWQgbGlzdCBvZiBwYXJhbXNcbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmVuY29kZVBhcmFtZXRlcnMgPSBmdW5jdGlvbiAodHlwZXMsIHBhcmFtcykge1xuICAgIHJldHVybiBldGhlcnNBYmlDb2Rlci5lbmNvZGUodGhpcy5tYXBUeXBlcyh0eXBlcyksIHBhcmFtcyk7XG59O1xuXG4vKipcbiAqIE1hcCB0eXBlcyBpZiBzaW1wbGlmaWVkIGZvcm1hdCBpcyB1c2VkXG4gKlxuICogQG1ldGhvZCBtYXBUeXBlc1xuICogQHBhcmFtIHtBcnJheX0gdHlwZXNcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5BQklDb2Rlci5wcm90b3R5cGUubWFwVHlwZXMgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG1hcHBlZFR5cGVzID0gW107XG4gICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAoc2VsZi5pc1NpbXBsaWZpZWRTdHJ1Y3RGb3JtYXQodHlwZSkpIHtcbiAgICAgICAgICAgIHZhciBzdHJ1Y3ROYW1lID0gT2JqZWN0LmtleXModHlwZSlbMF07XG4gICAgICAgICAgICBtYXBwZWRUeXBlcy5wdXNoKFxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFwU3RydWN0TmFtZUFuZFR5cGUoc3RydWN0TmFtZSksXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IHNlbGYubWFwU3RydWN0VG9Db2RlckZvcm1hdCh0eXBlW3N0cnVjdE5hbWVdKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFwcGVkVHlwZXMucHVzaCh0eXBlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXBwZWRUeXBlcztcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdHlwZSBpcyBzaW1wbGlmaWVkIHN0cnVjdCBmb3JtYXRcbiAqXG4gKiBAbWV0aG9kIGlzU2ltcGxpZmllZFN0cnVjdEZvcm1hdFxuICogQHBhcmFtIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5BQklDb2Rlci5wcm90b3R5cGUuaXNTaW1wbGlmaWVkU3RydWN0Rm9ybWF0ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0eXBlLmNvbXBvbmVudHMgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0eXBlLm5hbWUgPT09ICd1bmRlZmluZWQnO1xufTtcblxuLyoqXG4gKiBNYXBzIHRoZSBjb3JyZWN0IHR1cGxlIHR5cGUgYW5kIG5hbWUgd2hlbiB0aGUgc2ltcGxpZmllZCBmb3JtYXQgaW4gZW5jb2RlL2RlY29kZVBhcmFtZXRlciBpcyB1c2VkXG4gKlxuICogQG1ldGhvZCBtYXBTdHJ1Y3ROYW1lQW5kVHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cnVjdE5hbWVcbiAqIEByZXR1cm4ge3t0eXBlOiBzdHJpbmcsIG5hbWU6ICp9fVxuICovXG5BQklDb2Rlci5wcm90b3R5cGUubWFwU3RydWN0TmFtZUFuZFR5cGUgPSBmdW5jdGlvbiAoc3RydWN0TmFtZSkge1xuICAgIHZhciB0eXBlID0gJ3R1cGxlJztcblxuICAgIGlmIChzdHJ1Y3ROYW1lLmluZGV4T2YoJ1tdJykgPiAtMSkge1xuICAgICAgICB0eXBlID0gJ3R1cGxlW10nO1xuICAgICAgICBzdHJ1Y3ROYW1lID0gc3RydWN0TmFtZS5zbGljZSgwLCAtMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBuYW1lOiBzdHJ1Y3ROYW1lfTtcbn07XG5cbi8qKlxuICogTWFwcyB0aGUgc2ltcGxpZmllZCBmb3JtYXQgaW4gdG8gdGhlIGV4cGVjdGVkIGZvcm1hdCBvZiB0aGUgQUJJQ29kZXJcbiAqXG4gKiBAbWV0aG9kIG1hcFN0cnVjdFRvQ29kZXJGb3JtYXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHJ1Y3RcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5BQklDb2Rlci5wcm90b3R5cGUubWFwU3RydWN0VG9Db2RlckZvcm1hdCA9IGZ1bmN0aW9uIChzdHJ1Y3QpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhzdHJ1Y3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHN0cnVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKFxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFwU3RydWN0TmFtZUFuZFR5cGUoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50czogc2VsZi5tYXBTdHJ1Y3RUb0NvZGVyRm9ybWF0KHN0cnVjdFtrZXldKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgIHR5cGU6IHN0cnVjdFtrZXldXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG59O1xuXG4vKipcbiAqIEVuY29kZXMgYSBmdW5jdGlvbiBjYWxsIGZyb20gaXRzIGpzb24gaW50ZXJmYWNlIGFuZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBtZXRob2QgZW5jb2RlRnVuY3Rpb25DYWxsXG4gKiBAcGFyYW0ge0FycmF5fSBqc29uSW50ZXJmYWNlXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNcbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGVuY29kZWQgQUJJIGZvciB0aGlzIGZ1bmN0aW9uIGNhbGxcbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmVuY29kZUZ1bmN0aW9uQ2FsbCA9IGZ1bmN0aW9uIChqc29uSW50ZXJmYWNlLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGVGdW5jdGlvblNpZ25hdHVyZShqc29uSW50ZXJmYWNlKSArIHRoaXMuZW5jb2RlUGFyYW1ldGVycyhqc29uSW50ZXJmYWNlLmlucHV0cywgcGFyYW1zKS5yZXBsYWNlKCcweCcsICcnKTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gZGVjb2RlIGJ5dGVzIHRvIHBsYWluIHBhcmFtXG4gKlxuICogQG1ldGhvZCBkZWNvZGVQYXJhbWV0ZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gYnl0ZXNcbiAqIEByZXR1cm4ge09iamVjdH0gcGxhaW4gcGFyYW1cbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmRlY29kZVBhcmFtZXRlciA9IGZ1bmN0aW9uICh0eXBlLCBieXRlcykge1xuICAgIHJldHVybiB0aGlzLmRlY29kZVBhcmFtZXRlcnMoW3R5cGVdLCBieXRlcylbMF07XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIHRvIGRlY29kZSBsaXN0IG9mIHBhcmFtc1xuICpcbiAqIEBtZXRob2QgZGVjb2RlUGFyYW1ldGVyXG4gKiBAcGFyYW0ge0FycmF5fSBvdXRwdXRzXG4gKiBAcGFyYW0ge1N0cmluZ30gYnl0ZXNcbiAqIEByZXR1cm4ge0FycmF5fSBhcnJheSBvZiBwbGFpbiBwYXJhbXNcbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmRlY29kZVBhcmFtZXRlcnMgPSBmdW5jdGlvbiAob3V0cHV0cywgYnl0ZXMpIHtcbiAgICBpZiAob3V0cHV0cy5sZW5ndGggPiAwICYmICghYnl0ZXMgfHwgYnl0ZXMgPT09ICcweCcgfHwgYnl0ZXMgPT09ICcwWCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmV0dXJuZWQgdmFsdWVzIGFyZW5cXCd0IHZhbGlkLCBkaWQgaXQgcnVuIE91dCBvZiBHYXM/Jyk7XG4gICAgfVxuXG4gICAgdmFyIHJlcyA9IGV0aGVyc0FiaUNvZGVyLmRlY29kZSh0aGlzLm1hcFR5cGVzKG91dHB1dHMpLCAnMHgnICsgYnl0ZXMucmVwbGFjZSgvMHgvaSwgJycpKTtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBuZXcgUmVzdWx0KCk7XG4gICAgcmV0dXJuVmFsdWUuX19sZW5ndGhfXyA9IDA7XG5cbiAgICBvdXRwdXRzLmZvckVhY2goZnVuY3Rpb24gKG91dHB1dCwgaSkge1xuICAgICAgICB2YXIgZGVjb2RlZFZhbHVlID0gcmVzW3JldHVyblZhbHVlLl9fbGVuZ3RoX19dO1xuICAgICAgICBkZWNvZGVkVmFsdWUgPSAoZGVjb2RlZFZhbHVlID09PSAnMHgnKSA/IG51bGwgOiBkZWNvZGVkVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuVmFsdWVbaV0gPSBkZWNvZGVkVmFsdWU7XG5cbiAgICAgICAgaWYgKF8uaXNPYmplY3Qob3V0cHV0KSAmJiBvdXRwdXQubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWVbb3V0cHV0Lm5hbWVdID0gZGVjb2RlZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuVmFsdWUuX19sZW5ndGhfXysrO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xufTtcblxuLyoqXG4gKiBEZWNvZGVzIGV2ZW50cyBub24tIGFuZCBpbmRleGVkIHBhcmFtZXRlcnMuXG4gKlxuICogQG1ldGhvZCBkZWNvZGVMb2dcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gKiBAcGFyYW0ge0FycmF5fSB0b3BpY3NcbiAqIEByZXR1cm4ge0FycmF5fSBhcnJheSBvZiBwbGFpbiBwYXJhbXNcbiAqL1xuQUJJQ29kZXIucHJvdG90eXBlLmRlY29kZUxvZyA9IGZ1bmN0aW9uIChpbnB1dHMsIGRhdGEsIHRvcGljcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdG9waWNzID0gXy5pc0FycmF5KHRvcGljcykgPyB0b3BpY3MgOiBbdG9waWNzXTtcblxuICAgIGRhdGEgPSBkYXRhIHx8ICcnO1xuXG4gICAgdmFyIG5vdEluZGV4ZWRJbnB1dHMgPSBbXTtcbiAgICB2YXIgaW5kZXhlZFBhcmFtcyA9IFtdO1xuICAgIHZhciB0b3BpY0NvdW50ID0gMDtcblxuICAgIC8vIFRPRE8gY2hlY2sgZm9yIGFub255bW91cyBsb2dzP1xuXG4gICAgaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGlucHV0LCBpKSB7XG4gICAgICAgIGlmIChpbnB1dC5pbmRleGVkKSB7XG4gICAgICAgICAgICBpbmRleGVkUGFyYW1zW2ldID0gKFsnYm9vbCcsICdpbnQnLCAndWludCcsICdhZGRyZXNzJywgJ2ZpeGVkJywgJ3VmaXhlZCddLmZpbmQoZnVuY3Rpb24gKHN0YXRpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudHlwZS5pbmRleE9mKHN0YXRpY1R5cGUpICE9PSAtMTtcbiAgICAgICAgICAgIH0pKSA/IF90aGlzLmRlY29kZVBhcmFtZXRlcihpbnB1dC50eXBlLCB0b3BpY3NbdG9waWNDb3VudF0pIDogdG9waWNzW3RvcGljQ291bnRdO1xuICAgICAgICAgICAgdG9waWNDb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90SW5kZXhlZElucHV0c1tpXSA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHZhciBub25JbmRleGVkRGF0YSA9IGRhdGE7XG4gICAgdmFyIG5vdEluZGV4ZWRQYXJhbXMgPSAobm9uSW5kZXhlZERhdGEpID8gdGhpcy5kZWNvZGVQYXJhbWV0ZXJzKG5vdEluZGV4ZWRJbnB1dHMsIG5vbkluZGV4ZWREYXRhKSA6IFtdO1xuXG4gICAgdmFyIHJldHVyblZhbHVlID0gbmV3IFJlc3VsdCgpO1xuICAgIHJldHVyblZhbHVlLl9fbGVuZ3RoX18gPSAwO1xuXG5cbiAgICBpbnB1dHMuZm9yRWFjaChmdW5jdGlvbiAocmVzLCBpKSB7XG4gICAgICAgIHJldHVyblZhbHVlW2ldID0gKHJlcy50eXBlID09PSAnc3RyaW5nJykgPyAnJyA6IG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBub3RJbmRleGVkUGFyYW1zW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWVbaV0gPSBub3RJbmRleGVkUGFyYW1zW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhlZFBhcmFtc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVyblZhbHVlW2ldID0gaW5kZXhlZFBhcmFtc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXMubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWVbcmVzLm5hbWVdID0gcmV0dXJuVmFsdWVbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5WYWx1ZS5fX2xlbmd0aF9fKys7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG59O1xuXG52YXIgY29kZXIgPSBuZXcgQUJJQ29kZXIoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlcjtcbiIsInZhciBzY3J5cHRzeSA9IHJlcXVpcmUoJ3NjcnlwdHN5Jyk7XG5cbnZhciBzY3J5cHQ7XG5cbnZhciBpc05vZGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnID8gcHJvY2VzcyA6IDApID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5pZiAoaXNOb2RlKSB7XG4gICAgdmFyIE5PREVfTUlOX1ZFUl9XSVRIX0JVSUxUSU5fU0NSWVBUID0gJzEwLjUuMCc7XG4gICAgdmFyIE5PREVfTUlOX1ZFUl9JTkNPTVBBVF9TQ1JZUFRfUEtHID0gJzEyLjAuMCc7XG4gICAgdmFyIHNlbXZlciA9IHJlcXVpcmUoJ3NlbXZlcicpO1xuICAgIHZhciB1c2VOb2RlQnVpbHRpbiA9IGlzTm9kZSAmJiBzZW12ZXIuUmFuZ2UoJz49JyArIE5PREVfTUlOX1ZFUl9XSVRIX0JVSUxUSU5fU0NSWVBUKS50ZXN0KHByb2Nlc3MudmVyc2lvbik7XG5cbiAgICB2YXIgdHJ5U2NyeXB0UGtnID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2NyeXB0UGtnO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2NyeXB0UGtnICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHNjcnlwdFBrZzsgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzY3J5cHRQa2cgPSAoZnVuY3Rpb24obSkgeyByZXR1cm4gcmVxdWlyZShtKTsgfSkoJ3NjcnlwdCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICgvd2FzIGNvbXBpbGVkIGFnYWluc3QgYSBkaWZmZXJlbnQvLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY3J5cHRQa2cgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNjcnlwdFBrZztcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGNhbkltcHJvdmUgPSBmdW5jdGlvbihub2RlVmVyKSB7XG4gICAgICAgIHJldHVybiAnY2FuIGltcHJvdmUgd2ViM1xcJ3MgcGVmb3JtYW5jZSB3aGVuIHJ1bm5pbmcgTm9kZS5qcyB2ZXJzaW9ucyBvbGRlciB0aGFuICcgKyBub2RlVmVyICsgJyBieSBpbnN0YWxsaW5nIHRoZSAoZGVwcmVjYXRlZCkgc2NyeXB0IHBhY2thZ2UgaW4geW91ciBwcm9qZWN0JztcbiAgICB9O1xuXG4gICAgaWYgKHVzZU5vZGVCdWlsdGluKSB7XG4gICAgICAgIHZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbiAgICAgICAgdmFyIGZhbGxiYWNrQ291bnQgPSAwO1xuICAgICAgICBzY3J5cHQgPSBmdW5jdGlvbihrZXksIHNhbHQsIE4sIHIsIHAsIGRrTGVuKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uc2NyeXB0U3luYyhrZXksIHNhbHQsIGRrTGVuLCB7TjogTiwgcjogciwgcDogcH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICgvc2NyeXB0Om1lbW9yeSBsaW1pdCBleGNlZWRlZC8udGVzdChlLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3J5cHRQa2cgPSB0cnlTY3J5cHRQa2coKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcnlwdFBrZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjcnlwdFBrZy5oYXNoU3luYyhrZXksIHtOOiBOLCByOiByLCBwOiBwfSwgZGtMZW4sIHNhbHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ1xceDFiWzMzbSVzXFx4MWJbMG0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ01lbW9yeSBsaW1pdCBleGNlZWRlZCBmb3IgTm9kZVxcJ3MgYnVpbHQtaW4gY3J5cHRvLnNjcnlwdCwgZmFsbGluZyBiYWNrIHRvIHNjcnlwdHN5ICh0aW1lczogJyArIGZhbGxiYWNrQ291bnQgKyAnKSwgaWYgdGhpcyBoYXBwZW5zIGZyZXF1ZW50bHkgeW91ICcgKyBjYW5JbXByb3ZlKE5PREVfTUlOX1ZFUl9JTkNPTVBBVF9TQ1JZUFRfUEtHKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NyeXB0c3koa2V5LCBzYWx0LCBOLCByLCBwLCBka0xlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNjcnlwdFBrZyA9IHRyeVNjcnlwdFBrZygpO1xuICAgICAgICBpZiAoc2NyeXB0UGtnKSB7XG4gICAgICAgICAgICBzY3J5cHQgPSBmdW5jdGlvbihrZXksIHNhbHQsIE4sIHIsIHAsIGRrTGVuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjcnlwdFBrZy5oYXNoU3luYyhrZXksIHtOOiBOLCByOiByLCBwOiBwfSwgZGtMZW4sIHNhbHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAnXFx4MWJbMzNtJXNcXHgxYlswbScsXG4gICAgICAgICAgICAgICAgJ1lvdSAnICsgY2FuSW1wcm92ZShOT0RFX01JTl9WRVJfV0lUSF9CVUlMVElOX1NDUllQVClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnNjcnlwdCA9IHNjcnlwdCB8fCBzY3J5cHRzeTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY3J5cHQ7XG4iXSwic291cmNlUm9vdCI6IiJ9