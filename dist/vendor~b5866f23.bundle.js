(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "6HD3":
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
 * @file utils.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

var _ = __webpack_require__("F/us");
var BN = __webpack_require__("OZ/i");
var numberToBN = __webpack_require__("prZD");
var utf8 = __webpack_require__("8d11");
var Hash = __webpack_require__("ewvk");


/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
var isBN = function (object) {
    return object instanceof BN ||
        (object && object.constructor && object.constructor.name === 'BN');
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object} object
 * @return {Boolean}
 */
var isBigNumber = function (object) {
    return object && object.constructor && object.constructor.name === 'BigNumber';
};

/**
 * Takes an input and transforms it into an BN
 *
 * @method toBN
 * @param {Number|String|BN} number, string, HEX string or BN
 * @return {BN} BN
 */
var toBN = function(number){
    try {
        return numberToBN.apply(null, arguments);
    } catch(e) {
        throw new Error(e + ' Given value: "'+ number +'"');
    }
};


/**
 * Takes and input transforms it into BN and if it is negative value, into two's complement
 *
 * @method toTwosComplement
 * @param {Number|String|BN} number
 * @return {String}
 */
var toTwosComplement = function (number) {
    return '0x'+ toBN(number).toTwos(256).toString(16, 64);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
var isAddress = function (address) {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
        // If it's ALL lowercase or ALL upppercase
    } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
        return true;
        // Otherwise check each case
    } else {
        return checkAddressChecksum(address);
    }
};



/**
 * Checks if the given string is a checksummed address
 *
 * @method checkAddressChecksum
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
var checkAddressChecksum = function (address) {
    // Check each case
    address = address.replace(/^0x/i,'');
    var addressHash = sha3(address.toLowerCase()).replace(/^0x/i,'');

    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Should be called to pad string to expected length
 *
 * @method leftPad
 * @param {String} string to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var leftPad = function (string, chars, sign) {
    var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^0x/i,'');

    var padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;

    return (hasPrefix ? '0x' : '') + new Array(padding).join(sign ? sign : "0") + string;
};

/**
 * Should be called to pad string to expected length
 *
 * @method rightPad
 * @param {String} string to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var rightPad = function (string, chars, sign) {
    var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^0x/i,'');

    var padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;

    return (hasPrefix ? '0x' : '') + string + (new Array(padding).join(sign ? sign : "0"));
};


/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method utf8ToHex
 * @param {String} str
 * @returns {String} hex representation of input string
 */
var utf8ToHex = function(str) {
    str = utf8.encode(str);
    var hex = "";

    // remove \u0000 padding from either side
    str = str.replace(/^(?:\u0000)*/,'');
    str = str.split("").reverse().join("");
    str = str.replace(/^(?:\u0000)*/,'');
    str = str.split("").reverse().join("");

    for(var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        // if (code !== 0) {
        var n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
        // }
    }

    return "0x" + hex;
};

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method hexToUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
var hexToUtf8 = function(hex) {
    if (!isHexStrict(hex))
        throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

    var str = "";
    var code = 0;
    hex = hex.replace(/^0x/i,'');

    // remove 00 padding from either side
    hex = hex.replace(/^(?:00)*/,'');
    hex = hex.split("").reverse().join("");
    hex = hex.replace(/^(?:00)*/,'');
    hex = hex.split("").reverse().join("");

    var l = hex.length;

    for (var i=0; i < l; i+=2) {
        code = parseInt(hex.substr(i, 2), 16);
        // if (code !== 0) {
        str += String.fromCharCode(code);
        // }
    }

    return utf8.decode(str);
};


/**
 * Converts value to it's number representation
 *
 * @method hexToNumber
 * @param {String|Number|BN} value
 * @return {String}
 */
var hexToNumber = function (value) {
    if (!value) {
        return value;
    }

    return toBN(value).toNumber();
};

/**
 * Converts value to it's decimal representation in string
 *
 * @method hexToNumberString
 * @param {String|Number|BN} value
 * @return {String}
 */
var hexToNumberString = function (value) {
    if (!value) return value;

    return toBN(value).toString(10);
};


/**
 * Converts value to it's hex representation
 *
 * @method numberToHex
 * @param {String|Number|BN} value
 * @return {String}
 */
var numberToHex = function (value) {
    if (_.isNull(value) || _.isUndefined(value)) {
        return value;
    }

    if (!isFinite(value) && !isHexStrict(value)) {
        throw new Error('Given input "'+value+'" is not a number.');
    }

    var number = toBN(value);
    var result = number.toString(16);

    return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
};


/**
 * Convert a byte array to a hex string
 *
 * Note: Implementation from crypto-js
 *
 * @method bytesToHex
 * @param {Array} bytes
 * @return {String} the hex string
 */
var bytesToHex = function(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        /* jshint ignore:start */
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
        /* jshint ignore:end */
    }
    return '0x'+ hex.join("");
};

/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 * @param {string} hex
 * @return {Array} the byte array
 */
var hexToBytes = function(hex) {
    hex = hex.toString(16);

    if (!isHexStrict(hex)) {
        throw new Error('Given value "'+ hex +'" is not a valid hex string.');
    }

    hex = hex.replace(/^0x/i,'');

    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

/**
 * Auto converts any given value into it's hex representation.
 *
 * And even stringifys objects before.
 *
 * @method toHex
 * @param {String|Number|BN|Object} value
 * @param {Boolean} returnType
 * @return {String}
 */
var toHex = function (value, returnType) {
    /*jshint maxcomplexity: false */

    if (isAddress(value)) {
        return returnType ? 'address' : '0x'+ value.toLowerCase().replace(/^0x/i,'');
    }

    if (_.isBoolean(value)) {
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }


    if (_.isObject(value) && !isBigNumber(value) && !isBN(value)) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }

    // if its a negative number, pass it through numberToHex
    if (_.isString(value)) {
        if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
            return returnType ? 'int256' : numberToHex(value);
        } else if(value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
            return returnType ? 'bytes' : value;
        } else if (!isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }

    return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};


/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
var isHexStrict = function (hex) {
    return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};

/**
 * Check if string is HEX
 *
 * @method isHex
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
var isHex = function (hex) {
    return ((_.isString(hex) || _.isNumber(hex)) && /^(-0x|0x)?[0-9a-f]*$/i.test(hex));
};


/**
 * Returns true if given string is a valid Ethereum block header bloom.
 *
 * TODO UNDOCUMENTED
 *
 * @method isBloom
 * @param {String} hex encoded bloom filter
 * @return {Boolean}
 */
var isBloom = function (bloom) {
    if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
    }
    return false;
};

/**
 * Returns true if given string is a valid log topic.
 *
 * TODO UNDOCUMENTED
 *
 * @method isTopic
 * @param {String} hex encoded topic
 * @return {Boolean}
 */
var isTopic = function (topic) {
    if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }
    return false;
};


/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

var sha3 = function (value) {
    if (isBN(value)) {
        value = value.toString();
    }

    if (isHexStrict(value) && /^0x/i.test((value).toString())) {
        value = hexToBytes(value);
    }

    var returnValue = Hash.keccak256(value); // jshint ignore:line

    if(returnValue === SHA3_NULL_S) {
        return null;
    } else {
        return returnValue;
    }
};
// expose the under the hood keccak256
sha3._Hash = Hash;


module.exports = {
    BN: BN,
    isBN: isBN,
    isBigNumber: isBigNumber,
    toBN: toBN,
    isAddress: isAddress,
    isBloom: isBloom, // TODO UNDOCUMENTED
    isTopic: isTopic, // TODO UNDOCUMENTED
    checkAddressChecksum: checkAddressChecksum,
    utf8ToHex: utf8ToHex,
    hexToUtf8: hexToUtf8,
    hexToNumber: hexToNumber,
    hexToNumberString: hexToNumberString,
    numberToHex: numberToHex,
    toHex: toHex,
    hexToBytes: hexToBytes,
    bytesToHex: bytesToHex,
    isHex: isHex,
    isHexStrict: isHexStrict,
    leftPad: leftPad,
    rightPad: rightPad,
    toTwosComplement: toTwosComplement,
    sha3: sha3
};


/***/ }),

/***/ "ETH1":
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
 * @file utils.js
 * @author Marek Kotewicz <marek@parity.io>
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */


var _ = __webpack_require__("F/us");
var ethjsUnit = __webpack_require__("cMGI");
var utils = __webpack_require__("6HD3");
var soliditySha3 = __webpack_require__("IJGL");
var randomHex = __webpack_require__("ZXSt");



/**
 * Fires an error in an event emitter and callback and returns the eventemitter
 *
 * @method _fireError
 * @param {Object} error a string, a error, or an object with {message, data}
 * @param {Object} emitter
 * @param {Function} reject
 * @param {Function} callback
 * @return {Object} the emitter
 */
var _fireError = function (error, emitter, reject, callback) {
    /*jshint maxcomplexity: 10 */

    // add data if given
    if(_.isObject(error) && !(error instanceof Error) &&  error.data) {
        if(_.isObject(error.data) || _.isArray(error.data)) {
            error.data = JSON.stringify(error.data, null, 2);
        }

        error = error.message +"\n"+ error.data;
    }

    if(_.isString(error)) {
        error = new Error(error);
    }

    if (_.isFunction(callback)) {
        callback(error);
    }
    if (_.isFunction(reject)) {
        // suppress uncatched error if an error listener is present
        // OR suppress uncatched error if an callback listener is present
        if (emitter &&
            (_.isFunction(emitter.listeners) &&
            emitter.listeners('error').length) || _.isFunction(callback)) {
            emitter.catch(function(){});
        }
        // reject later, to be able to return emitter
        setTimeout(function () {
            reject(error);
        }, 1);
    }

    if(emitter && _.isFunction(emitter.emit)) {
        // emit later, to be able to return emitter
        setTimeout(function () {
            emitter.emit('error', error);
            emitter.removeAllListeners();
        }, 1);
    }

    return emitter;
};

/**
 * Should be used to create full function/event name from json abi
 *
 * @method _jsonInterfaceMethodToString
 * @param {Object} json
 * @return {String} full function/event name
 */
var _jsonInterfaceMethodToString = function (json) {
    if (_.isObject(json) && json.name && json.name.indexOf('(') !== -1) {
        return json.name;
    }

    return json.name + '(' + _flattenTypes(false, json.inputs).join(',') + ')';
};


/**
 * Should be used to flatten json abi inputs/outputs into an array of type-representing-strings
 *
 * @method _flattenTypes
 * @param {bool} includeTuple
 * @param {Object} puts
 * @return {Array} parameters as strings
 */
var _flattenTypes = function(includeTuple, puts)
{
    // console.log("entered _flattenTypes. inputs/outputs: " + puts)
    var types = [];

    puts.forEach(function(param) {
        if (typeof param.components === 'object') {
            if (param.type.substring(0, 5) !== 'tuple') {
                throw new Error('components found but type is not tuple; report on GitHub');
            }
            var suffix = '';
            var arrayBracket = param.type.indexOf('[');
            if (arrayBracket >= 0) { suffix = param.type.substring(arrayBracket); }
            var result = _flattenTypes(includeTuple, param.components);
            // console.log("result should have things: " + result)
            if(_.isArray(result) && includeTuple) {
                // console.log("include tuple word, and its an array. joining...: " + result.types)
                types.push('tuple(' + result.join(',') + ')' + suffix);
            }
            else if(!includeTuple) {
                // console.log("don't include tuple, but its an array. joining...: " + result)
                types.push('(' + result.join(',') + ')' + suffix);
            }
            else {
                // console.log("its a single type within a tuple: " + result.types)
                types.push('(' + result + ')');
            }
        } else {
            // console.log("its a type and not directly in a tuple: " + param.type)
            types.push(param.type);
        }
    });

    return types;
};


/**
 * Should be called to get ascii from it's hex representation
 *
 * @method hexToAscii
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
var hexToAscii = function(hex) {
    if (!utils.isHexStrict(hex))
        throw new Error('The parameter must be a valid HEX string.');

    var str = "";
    var i = 0, l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i+=2) {
        var code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }

    return str;
};

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method asciiToHex
 * @param {String} str
 * @returns {String} hex representation of input string
 */
var asciiToHex = function(str) {
    if(!str)
        return "0x00";
    var hex = "";
    for(var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
    }

    return "0x" + hex;
};



/**
 * Returns value of unit in Wei
 *
 * @method getUnitValue
 * @param {String} unit the unit to convert to, default ether
 * @returns {BN} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
var getUnitValue = function (unit) {
    unit = unit ? unit.toLowerCase() : 'ether';
    if (!ethjsUnit.unitMap[unit]) {
        throw new Error('This unit "'+ unit +'" doesn\'t exist, please use the one of the following units' + JSON.stringify(ethjsUnit.unitMap, null, 2));
    }
    return unit;
};

/**
 * Takes a number of wei and converts it to any other ether unit.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - kwei       femtoether     babbage
 * - mwei       picoether      lovelace
 * - gwei       nanoether      shannon      nano
 * - --         microether     szabo        micro
 * - --         milliether     finney       milli
 * - ether      --             --
 * - kether                    --           grand
 * - mether
 * - gether
 * - tether
 *
 * @method fromWei
 * @param {Number|String} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert to, default ether
 * @return {String|Object} When given a BN object it returns one as well, otherwise a number
 */
var fromWei = function(number, unit) {
    unit = getUnitValue(unit);

    if(!utils.isBN(number) && !_.isString(number)) {
        throw new Error('Please pass numbers as strings or BigNumber objects to avoid precision errors.');
    }

    return utils.isBN(number) ? ethjsUnit.fromWei(number, unit) : ethjsUnit.fromWei(number, unit).toString(10);
};

/**
 * Takes a number of a unit and converts it to wei.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - kwei       femtoether     babbage
 * - mwei       picoether      lovelace
 * - gwei       nanoether      shannon      nano
 * - --         microether     szabo        micro
 * - --         microether     szabo        micro
 * - --         milliether     finney       milli
 * - ether      --             --
 * - kether                    --           grand
 * - mether
 * - gether
 * - tether
 *
 * @method toWei
 * @param {Number|String|BN} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert from, default ether
 * @return {String|Object} When given a BN object it returns one as well, otherwise a number
 */
var toWei = function(number, unit) {
    unit = getUnitValue(unit);

    if(!utils.isBN(number) && !_.isString(number)) {
        throw new Error('Please pass numbers as strings or BigNumber objects to avoid precision errors.');
    }

    return utils.isBN(number) ? ethjsUnit.toWei(number, unit) : ethjsUnit.toWei(number, unit).toString(10);
};




/**
 * Converts to a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX address
 * @return {String}
 */
var toChecksumAddress = function (address) {
    if (typeof address === 'undefined') return '';

    if(!/^(0x)?[0-9a-f]{40}$/i.test(address))
        throw new Error('Given address "'+ address +'" is not a valid Ethereum address.');



    address = address.toLowerCase().replace(/^0x/i,'');
    var addressHash = utils.sha3(address).replace(/^0x/i,'');
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++ ) {
        // If ith character is 9 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }
    return checksumAddress;
};



module.exports = {
    _fireError: _fireError,
    _jsonInterfaceMethodToString: _jsonInterfaceMethodToString,
    _flattenTypes: _flattenTypes,
    // extractDisplayName: extractDisplayName,
    // extractTypeName: extractTypeName,
    randomHex: randomHex,
    _: _,
    BN: utils.BN,
    isBN: utils.isBN,
    isBigNumber: utils.isBigNumber,
    isHex: utils.isHex,
    isHexStrict: utils.isHexStrict,
    sha3: utils.sha3,
    keccak256: utils.sha3,
    soliditySha3: soliditySha3,
    isAddress: utils.isAddress,
    checkAddressChecksum: utils.checkAddressChecksum,
    toChecksumAddress: toChecksumAddress,
    toHex: utils.toHex,
    toBN: utils.toBN,

    bytesToHex: utils.bytesToHex,
    hexToBytes: utils.hexToBytes,

    hexToNumberString: utils.hexToNumberString,

    hexToNumber: utils.hexToNumber,
    toDecimal: utils.hexToNumber, // alias

    numberToHex: utils.numberToHex,
    fromDecimal: utils.numberToHex, // alias

    hexToUtf8: utils.hexToUtf8,
    hexToString: utils.hexToUtf8,
    toUtf8: utils.hexToUtf8,

    utf8ToHex: utils.utf8ToHex,
    stringToHex: utils.utf8ToHex,
    fromUtf8: utils.utf8ToHex,

    hexToAscii: hexToAscii,
    toAscii: hexToAscii,
    asciiToHex: asciiToHex,
    fromAscii: asciiToHex,

    unitMap: ethjsUnit.unitMap,
    toWei: toWei,
    fromWei: fromWei,

    padLeft: utils.leftPad,
    leftPad: utils.leftPad,
    padRight: utils.rightPad,
    rightPad: utils.rightPad,
    toTwosComplement: utils.toTwosComplement
};



/***/ }),

/***/ "EWj0":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ugx8").version;


/***/ }),

/***/ "Gz5v":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"web3\",\"version\":\"1.2.1\",\"description\":\"Ethereum JavaScript API\",\"repository\":\"https://github.com/ethereum/web3.js/tree/1.x/packages/web3\",\"license\":\"LGPL-3.0\",\"engines\":{\"node\":\">=8.0.0\"},\"main\":\"src/index.js\",\"bugs\":{\"url\":\"https://github.com/ethereum/web3.js/issues\"},\"keywords\":[\"Ethereum\",\"JavaScript\",\"API\"],\"author\":\"ethereum.org\",\"authors\":[{\"name\":\"Fabian Vogelsteller\",\"email\":\"fabian@ethereum.org\",\"homepage\":\"http://frozeman.de\"},{\"name\":\"Marek Kotewicz\",\"email\":\"marek@parity.io\",\"url\":\"https://github.com/debris\"},{\"name\":\"Marian Oancea\",\"url\":\"https://github.com/cubedro\"},{\"name\":\"Gav Wood\",\"email\":\"g@parity.io\",\"homepage\":\"http://gavwood.com\"},{\"name\":\"Jeffery Wilcke\",\"email\":\"jeffrey.wilcke@ethereum.org\",\"url\":\"https://github.com/obscuren\"}],\"dependencies\":{\"web3-bzz\":\"1.2.1\",\"web3-core\":\"1.2.1\",\"web3-eth\":\"1.2.1\",\"web3-eth-personal\":\"1.2.1\",\"web3-net\":\"1.2.1\",\"web3-shh\":\"1.2.1\",\"web3-utils\":\"1.2.1\"}}");

/***/ }),

/***/ "IJGL":
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
 * @file soliditySha3.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

var _ = __webpack_require__("F/us");
var BN = __webpack_require__("OZ/i");
var utils = __webpack_require__("6HD3");


var _elementaryName = function (name) {
    /*jshint maxcomplexity:false */

    if (name.startsWith('int[')) {
        return 'int256' + name.slice(3);
    } else if (name === 'int') {
        return 'int256';
    } else if (name.startsWith('uint[')) {
        return 'uint256' + name.slice(4);
    } else if (name === 'uint') {
        return 'uint256';
    } else if (name.startsWith('fixed[')) {
        return 'fixed128x128' + name.slice(5);
    } else if (name === 'fixed') {
        return 'fixed128x128';
    } else if (name.startsWith('ufixed[')) {
        return 'ufixed128x128' + name.slice(6);
    } else if (name === 'ufixed') {
        return 'ufixed128x128';
    }
    return name;
};

// Parse N from type<N>
var _parseTypeN = function (type) {
    var typesize = /^\D+(\d+).*$/.exec(type);
    return typesize ? parseInt(typesize[1], 10) : null;
};

// Parse N from type[<N>]
var _parseTypeNArray = function (type) {
    var arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
    return arraySize ? parseInt(arraySize[1], 10) : null;
};

var _parseNumber = function (arg) {
    var type = typeof arg;
    if (type === 'string') {
        if (utils.isHexStrict(arg)) {
            return new BN(arg.replace(/0x/i,''), 16);
        } else {
            return new BN(arg, 10);
        }
    } else if (type === 'number') {
        return new BN(arg);
    } else if (utils.isBigNumber(arg)) {
        return new BN(arg.toString(10));
    } else if (utils.isBN(arg)) {
        return arg;
    } else {
        throw new Error(arg +' is not a number');
    }
};

var _solidityPack = function (type, value, arraySize) {
    /*jshint maxcomplexity:false */

    var size, num;
    type = _elementaryName(type);


    if (type === 'bytes') {

        if (value.replace(/^0x/i,'').length % 2 !== 0) {
            throw new Error('Invalid bytes characters '+ value.length);
        }

        return value;
    } else if (type === 'string') {
        return utils.utf8ToHex(value);
    } else if (type === 'bool') {
        return value ? '01' : '00';
    } else if (type.startsWith('address')) {
        if(arraySize) {
            size = 64;
        } else {
            size = 40;
        }

        if(!utils.isAddress(value)) {
            throw new Error(value +' is not a valid address, or the checksum is invalid.');
        }

        return utils.leftPad(value.toLowerCase(), size);
    }

    size = _parseTypeN(type);

    if (type.startsWith('bytes')) {

        if(!size) {
            throw new Error('bytes[] not yet supported in solidity');
        }

        // must be 32 byte slices when in an array
        if(arraySize) {
            size = 32;
        }

        if (size < 1 || size > 32 || size < value.replace(/^0x/i,'').length / 2 ) {
            throw new Error('Invalid bytes' + size +' for '+ value);
        }

        return utils.rightPad(value, size * 2);
    } else if (type.startsWith('uint')) {

        if ((size % 8) || (size < 8) || (size > 256)) {
            throw new Error('Invalid uint'+size+' size');
        }

        num = _parseNumber(value);
        if (num.bitLength() > size) {
            throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
        }

        if(num.lt(new BN(0))) {
            throw new Error('Supplied uint '+ num.toString() +' is negative');
        }

        return size ? utils.leftPad(num.toString('hex'), size/8 * 2) : num;
    } else if (type.startsWith('int')) {

        if ((size % 8) || (size < 8) || (size > 256)) {
            throw new Error('Invalid int'+size+' size');
        }

        num = _parseNumber(value);
        if (num.bitLength() > size) {
            throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
        }

        if(num.lt(new BN(0))) {
            return num.toTwos(size).toString('hex');
        } else {
            return size ? utils.leftPad(num.toString('hex'), size/8 * 2) : num;
        }

    } else {
        // FIXME: support all other types
        throw new Error('Unsupported or invalid type: ' + type);
    }
};


var _processSoliditySha3Args = function (arg) {
    /*jshint maxcomplexity:false */

    if(_.isArray(arg)) {
        throw new Error('Autodetection of array types is not supported.');
    }

    var type, value = '';
    var hexArg, arraySize;

    // if type is given
    if (_.isObject(arg) && (arg.hasOwnProperty('v') || arg.hasOwnProperty('t') || arg.hasOwnProperty('value') || arg.hasOwnProperty('type'))) {
        type = arg.hasOwnProperty('t') ? arg.t : arg.type;
        value = arg.hasOwnProperty('v') ? arg.v : arg.value;

    // otherwise try to guess the type
    } else {

        type = utils.toHex(arg, true);
        value = utils.toHex(arg);

        if (!type.startsWith('int') && !type.startsWith('uint')) {
            type = 'bytes';
        }
    }

    if ((type.startsWith('int') || type.startsWith('uint')) &&  typeof value === 'string' && !/^(-)?0x/i.test(value)) {
        value = new BN(value);
    }

    // get the array size
    if(_.isArray(value)) {
        arraySize = _parseTypeNArray(type);
        if(arraySize && value.length !== arraySize) {
            throw new Error(type +' is not matching the given array '+ JSON.stringify(value));
        } else {
            arraySize = value.length;
        }
    }


    if (_.isArray(value)) {
        hexArg = value.map(function (val) {
            return _solidityPack(type, val, arraySize).toString('hex').replace('0x','');
        });
        return hexArg.join('');
    } else {
        hexArg = _solidityPack(type, value, arraySize);
        return hexArg.toString('hex').replace('0x','');
    }

};

/**
 * Hashes solidity values to a sha3 hash using keccak 256
 *
 * @method soliditySha3
 * @return {Object} the sha3
 */
var soliditySha3 = function () {
    /*jshint maxcomplexity:false */

    var args = Array.prototype.slice.call(arguments);

    var hexArgs = _.map(args, _processSoliditySha3Args);

    // console.log(args, hexArgs);
    // console.log('0x'+ hexArgs.join(''));

    return utils.sha3('0x'+ hexArgs.join(''));
};


module.exports = soliditySha3;


/***/ }),

/***/ "YuTi":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "YxRf":
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
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Gav Wood <gav@parity.io>
 *   Jeffrey Wilcke <jeffrey.wilcke@ethereum.org>
 *   Marek Kotewicz <marek@parity.io>
 *   Marian Oancea <marian@ethereum.org>
 * @date 2017
 */




var version = __webpack_require__("Gz5v").version;
var core = __webpack_require__("8e6A");
var Eth = __webpack_require__("H8gM");
var Net = __webpack_require__("rlKj");
var Personal = __webpack_require__("s84P");
var Shh = __webpack_require__("q349");
var Bzz = __webpack_require__("UUYS");
var utils = __webpack_require__("ETH1");

var Web3 = function Web3() {
    var _this = this;

    // sets _requestmanager etc
    core.packageInit(this, arguments);

    this.version = version;
    this.utils = utils;

    this.eth = new Eth(this);
    this.shh = new Shh(this);
    this.bzz = new Bzz(this);

    // overwrite package setProvider
    var setProvider = this.setProvider;
    this.setProvider = function (provider, net) {
        setProvider.apply(_this, arguments);

        this.eth.setProvider(provider, net);
        this.shh.setProvider(provider, net);
        this.bzz.setProvider(provider);

        return true;
    };
};

Web3.version = version;
Web3.utils = utils;
Web3.modules = {
    Eth: Eth,
    Net: Net,
    Personal: Personal,
    Shh: Shh,
    Bzz: Bzz
};

core.addProviders(Web3);

module.exports = Web3;



/***/ }),

/***/ "fjyx":
/***/ (function(module, exports, __webpack_require__) {

var _globalThis;
try {
	_globalThis = __webpack_require__("Z4fQ");
} catch (error) {
} finally {
	if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
	if (!_globalThis) { throw new Error('Could not determine global this'); }
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__("EWj0");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "pQ88":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var bs58check = __webpack_require__("b3gk")

function decodeRaw (buffer, version) {
  // check version only if defined
  if (version !== undefined && buffer[0] !== version) throw new Error('Invalid network version')

  // uncompressed
  if (buffer.length === 33) {
    return {
      version: buffer[0],
      privateKey: buffer.slice(1, 33),
      compressed: false
    }
  }

  // invalid length
  if (buffer.length !== 34) throw new Error('Invalid WIF length')

  // invalid compression flag
  if (buffer[33] !== 0x01) throw new Error('Invalid compression flag')

  return {
    version: buffer[0],
    privateKey: buffer.slice(1, 33),
    compressed: true
  }
}

function encodeRaw (version, privateKey, compressed) {
  var result = new Buffer(compressed ? 34 : 33)

  result.writeUInt8(version, 0)
  privateKey.copy(result, 1)

  if (compressed) {
    result[33] = 0x01
  }

  return result
}

function decode (string, version) {
  return decodeRaw(bs58check.decode(string), version)
}

function encode (version, privateKey, compressed) {
  if (typeof version === 'number') return bs58check.encode(encodeRaw(version, privateKey, compressed))

  return bs58check.encode(
    encodeRaw(
      version.version,
      version.privateKey,
      version.compressed
    )
  )
}

module.exports = {
  decode: decode,
  decodeRaw: decodeRaw,
  encode: encode,
  encodeRaw: encodeRaw
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "q349":
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
var Subscriptions = __webpack_require__("SSMb").subscriptions;
var Method = __webpack_require__("Ykib");
// var formatters = require('web3-core-helpers').formatters;
var Net = __webpack_require__("rlKj");


var Shh = function Shh() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
    };

    this.net = new Net(this.currentProvider);

    [
        new Subscriptions({
            name: 'subscribe',
            type: 'shh',
            subscriptions: {
                'messages': {
                    params: 1
                    // inputFormatter: [formatters.inputPostFormatter],
                    // outputFormatter: formatters.outputPostFormatter
                }
            }
        }),

        new Method({
            name: 'getVersion',
            call: 'shh_version',
            params: 0
        }),
        new Method({
            name: 'getInfo',
            call: 'shh_info',
            params: 0
        }),
        new Method({
            name: 'setMaxMessageSize',
            call: 'shh_setMaxMessageSize',
            params: 1
        }),
        new Method({
            name: 'setMinPoW',
            call: 'shh_setMinPoW',
            params: 1
        }),
        new Method({
            name: 'markTrustedPeer',
            call: 'shh_markTrustedPeer',
            params: 1
        }),
        new Method({
            name: 'newKeyPair',
            call: 'shh_newKeyPair',
            params: 0
        }),
        new Method({
            name: 'addPrivateKey',
            call: 'shh_addPrivateKey',
            params: 1
        }),
        new Method({
            name: 'deleteKeyPair',
            call: 'shh_deleteKeyPair',
            params: 1
        }),
        new Method({
            name: 'hasKeyPair',
            call: 'shh_hasKeyPair',
            params: 1
        }),
        new Method({
            name: 'getPublicKey',
            call: 'shh_getPublicKey',
            params: 1
        }),
        new Method({
            name: 'getPrivateKey',
            call: 'shh_getPrivateKey',
            params: 1
        }),
        new Method({
            name: 'newSymKey',
            call: 'shh_newSymKey',
            params: 0
        }),
        new Method({
            name: 'addSymKey',
            call: 'shh_addSymKey',
            params: 1
        }),
        new Method({
            name: 'generateSymKeyFromPassword',
            call: 'shh_generateSymKeyFromPassword',
            params: 1
        }),
        new Method({
            name: 'hasSymKey',
            call: 'shh_hasSymKey',
            params: 1
        }),
        new Method({
            name: 'getSymKey',
            call: 'shh_getSymKey',
            params: 1
        }),
        new Method({
            name: 'deleteSymKey',
            call: 'shh_deleteSymKey',
            params: 1
        }),

        new Method({
            name: 'newMessageFilter',
            call: 'shh_newMessageFilter',
            params: 1
        }),
        new Method({
            name: 'getFilterMessages',
            call: 'shh_getFilterMessages',
            params: 1
        }),
        new Method({
            name: 'deleteMessageFilter',
            call: 'shh_deleteMessageFilter',
            params: 1
        }),

        new Method({
            name: 'post',
            call: 'shh_post',
            params: 1,
            inputFormatter: [null]
        }),

        new Method({
            name: 'unsubscribe',
            call: 'shh_unsubscribe',
            params: 1
        })
    ].forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager);
    });
};

Shh.prototype.clearSubscriptions = function () {
     this._requestManager.clearSubscriptions();
};

core.addProviders(Shh);



module.exports = Shh;




/***/ }),

/***/ "ugx8":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"websocket\",\"description\":\"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.\",\"keywords\":[\"websocket\",\"websockets\",\"socket\",\"networking\",\"comet\",\"push\",\"RFC-6455\",\"realtime\",\"server\",\"client\"],\"author\":\"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)\",\"contributors\":[\"Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)\"],\"version\":\"1.0.29\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/theturtle32/WebSocket-Node.git\"},\"homepage\":\"https://github.com/theturtle32/WebSocket-Node\",\"engines\":{\"node\":\">=0.10.0\"},\"dependencies\":{\"debug\":\"^2.2.0\",\"es5-ext\":\"^0.10.50\",\"nan\":\"^2.14.0\",\"typedarray-to-buffer\":\"^3.1.5\",\"yaeti\":\"^0.0.6\"},\"devDependencies\":{\"buffer-equal\":\"^1.0.0\",\"faucet\":\"^0.0.1\",\"gulp\":\"^4.0.2\",\"gulp-jshint\":\"^2.0.4\",\"jshint-stylish\":\"^2.2.1\",\"jshint\":\"^2.0.0\",\"tape\":\"^4.9.1\"},\"config\":{\"verbose\":false},\"scripts\":{\"install\":\"(node-gyp rebuild 2> builderror.log) || (exit 0)\",\"test\":\"faucet test/unit\",\"gulp\":\"gulp\"},\"main\":\"index\",\"directories\":{\"lib\":\"./lib\"},\"browser\":\"lib/browser.js\",\"license\":\"Apache-2.0\"}");

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViMy11dGlscy9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtdXRpbHMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtdXRpbHMvc3JjL3NvbGlkaXR5U2hhMy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWIzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYjMtc2hoL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxtQkFBTyxDQUFDLE1BQVk7QUFDNUIsU0FBUyxtQkFBTyxDQUFDLE1BQU87QUFDeEIsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QyxXQUFXLG1CQUFPLENBQUMsTUFBTTtBQUN6QixXQUFXLG1CQUFPLENBQUMsTUFBa0I7OztBQUdyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZ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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFXQSxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFpQjs7Ozs7Ozs7Ozs7Ozs7O0FDQTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsbUJBQU8sQ0FBQyxNQUFZO0FBQzVCLFNBQVMsbUJBQU8sQ0FBQyxNQUFPO0FBQ3hCLFlBQVksbUJBQU8sQ0FBQyxNQUFZOzs7QUFHaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNB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Q0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6InZlbmRvcn5iNTg2NmYyMy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKlxuICogQGZpbGUgdXRpbHMuanNcbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgbnVtYmVyVG9CTiA9IHJlcXVpcmUoJ251bWJlci10by1ibicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCd1dGY4Jyk7XG52YXIgSGFzaCA9IHJlcXVpcmUoXCJldGgtbGliL2xpYi9oYXNoXCIpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iamVjdCBpcyBCTiwgb3RoZXJ3aXNlIGZhbHNlXG4gKlxuICogQG1ldGhvZCBpc0JOXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG52YXIgaXNCTiA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgQk4gfHxcbiAgICAgICAgKG9iamVjdCAmJiBvYmplY3QuY29uc3RydWN0b3IgJiYgb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdCTicpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqZWN0IGlzIEJpZ051bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKlxuICogQG1ldGhvZCBpc0JpZ051bWJlclxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzQmlnTnVtYmVyID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yICYmIG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQmlnTnVtYmVyJztcbn07XG5cbi8qKlxuICogVGFrZXMgYW4gaW5wdXQgYW5kIHRyYW5zZm9ybXMgaXQgaW50byBhbiBCTlxuICpcbiAqIEBtZXRob2QgdG9CTlxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfEJOfSBudW1iZXIsIHN0cmluZywgSEVYIHN0cmluZyBvciBCTlxuICogQHJldHVybiB7Qk59IEJOXG4gKi9cbnZhciB0b0JOID0gZnVuY3Rpb24obnVtYmVyKXtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbnVtYmVyVG9CTi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSArICcgR2l2ZW4gdmFsdWU6IFwiJysgbnVtYmVyICsnXCInKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogVGFrZXMgYW5kIGlucHV0IHRyYW5zZm9ybXMgaXQgaW50byBCTiBhbmQgaWYgaXQgaXMgbmVnYXRpdmUgdmFsdWUsIGludG8gdHdvJ3MgY29tcGxlbWVudFxuICpcbiAqIEBtZXRob2QgdG9Ud29zQ29tcGxlbWVudFxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfEJOfSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xudmFyIHRvVHdvc0NvbXBsZW1lbnQgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgcmV0dXJuICcweCcrIHRvQk4obnVtYmVyKS50b1R3b3MoMjU2KS50b1N0cmluZygxNiwgNjQpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhbiBhZGRyZXNzXG4gKlxuICogQG1ldGhvZCBpc0FkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIHRoZSBnaXZlbiBIRVggYWRkcmVzc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgLy8gY2hlY2sgaWYgaXQgaGFzIHRoZSBiYXNpYyByZXF1aXJlbWVudHMgb2YgYW4gYWRkcmVzc1xuICAgIGlmICghL14oMHgpP1swLTlhLWZdezQwfSQvaS50ZXN0KGFkZHJlc3MpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gSWYgaXQncyBBTEwgbG93ZXJjYXNlIG9yIEFMTCB1cHBwZXJjYXNlXG4gICAgfSBlbHNlIGlmICgvXigweHwwWCk/WzAtOWEtZl17NDB9JC8udGVzdChhZGRyZXNzKSB8fCAvXigweHwwWCk/WzAtOUEtRl17NDB9JC8udGVzdChhZGRyZXNzKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGNoZWNrIGVhY2ggY2FzZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjaGVja0FkZHJlc3NDaGVja3N1bShhZGRyZXNzKTtcbiAgICB9XG59O1xuXG5cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIGNoZWNrc3VtbWVkIGFkZHJlc3NcbiAqXG4gKiBAbWV0aG9kIGNoZWNrQWRkcmVzc0NoZWNrc3VtXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyB0aGUgZ2l2ZW4gSEVYIGFkZHJlc3NcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBjaGVja0FkZHJlc3NDaGVja3N1bSA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgLy8gQ2hlY2sgZWFjaCBjYXNlXG4gICAgYWRkcmVzcyA9IGFkZHJlc3MucmVwbGFjZSgvXjB4L2ksJycpO1xuICAgIHZhciBhZGRyZXNzSGFzaCA9IHNoYTMoYWRkcmVzcy50b0xvd2VyQ2FzZSgpKS5yZXBsYWNlKC9eMHgvaSwnJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQwOyBpKysgKSB7XG4gICAgICAgIC8vIHRoZSBudGggbGV0dGVyIHNob3VsZCBiZSB1cHBlcmNhc2UgaWYgdGhlIG50aCBkaWdpdCBvZiBjYXNlbWFwIGlzIDFcbiAgICAgICAgaWYgKChwYXJzZUludChhZGRyZXNzSGFzaFtpXSwgMTYpID4gNyAmJiBhZGRyZXNzW2ldLnRvVXBwZXJDYXNlKCkgIT09IGFkZHJlc3NbaV0pIHx8IChwYXJzZUludChhZGRyZXNzSGFzaFtpXSwgMTYpIDw9IDcgJiYgYWRkcmVzc1tpXS50b0xvd2VyQ2FzZSgpICE9PSBhZGRyZXNzW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIHBhZCBzdHJpbmcgdG8gZXhwZWN0ZWQgbGVuZ3RoXG4gKlxuICogQG1ldGhvZCBsZWZ0UGFkXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRvIGJlIHBhZGRlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGNoYXJzIHRoYXQgcmVzdWx0IHN0cmluZyBzaG91bGQgaGF2ZVxuICogQHBhcmFtIHtTdHJpbmd9IHNpZ24sIGJ5IGRlZmF1bHQgMFxuICogQHJldHVybnMge1N0cmluZ30gcmlnaHQgYWxpZ25lZCBzdHJpbmdcbiAqL1xudmFyIGxlZnRQYWQgPSBmdW5jdGlvbiAoc3RyaW5nLCBjaGFycywgc2lnbikge1xuICAgIHZhciBoYXNQcmVmaXggPSAvXjB4L2kudGVzdChzdHJpbmcpIHx8IHR5cGVvZiBzdHJpbmcgPT09ICdudW1iZXInO1xuICAgIHN0cmluZyA9IHN0cmluZy50b1N0cmluZygxNikucmVwbGFjZSgvXjB4L2ksJycpO1xuXG4gICAgdmFyIHBhZGRpbmcgPSAoY2hhcnMgLSBzdHJpbmcubGVuZ3RoICsgMSA+PSAwKSA/IGNoYXJzIC0gc3RyaW5nLmxlbmd0aCArIDEgOiAwO1xuXG4gICAgcmV0dXJuIChoYXNQcmVmaXggPyAnMHgnIDogJycpICsgbmV3IEFycmF5KHBhZGRpbmcpLmpvaW4oc2lnbiA/IHNpZ24gOiBcIjBcIikgKyBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gcGFkIHN0cmluZyB0byBleHBlY3RlZCBsZW5ndGhcbiAqXG4gKiBAbWV0aG9kIHJpZ2h0UGFkXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRvIGJlIHBhZGRlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGNoYXJzIHRoYXQgcmVzdWx0IHN0cmluZyBzaG91bGQgaGF2ZVxuICogQHBhcmFtIHtTdHJpbmd9IHNpZ24sIGJ5IGRlZmF1bHQgMFxuICogQHJldHVybnMge1N0cmluZ30gcmlnaHQgYWxpZ25lZCBzdHJpbmdcbiAqL1xudmFyIHJpZ2h0UGFkID0gZnVuY3Rpb24gKHN0cmluZywgY2hhcnMsIHNpZ24pIHtcbiAgICB2YXIgaGFzUHJlZml4ID0gL14weC9pLnRlc3Qoc3RyaW5nKSB8fCB0eXBlb2Ygc3RyaW5nID09PSAnbnVtYmVyJztcbiAgICBzdHJpbmcgPSBzdHJpbmcudG9TdHJpbmcoMTYpLnJlcGxhY2UoL14weC9pLCcnKTtcblxuICAgIHZhciBwYWRkaW5nID0gKGNoYXJzIC0gc3RyaW5nLmxlbmd0aCArIDEgPj0gMCkgPyBjaGFycyAtIHN0cmluZy5sZW5ndGggKyAxIDogMDtcblxuICAgIHJldHVybiAoaGFzUHJlZml4ID8gJzB4JyA6ICcnKSArIHN0cmluZyArIChuZXcgQXJyYXkocGFkZGluZykuam9pbihzaWduID8gc2lnbiA6IFwiMFwiKSk7XG59O1xuXG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgaGV4IHJlcHJlc2VudGF0aW9uIChwcmVmaXhlZCBieSAweCkgb2YgdXRmOCBzdHJpbmdcbiAqXG4gKiBAbWV0aG9kIHV0ZjhUb0hleFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ30gaGV4IHJlcHJlc2VudGF0aW9uIG9mIGlucHV0IHN0cmluZ1xuICovXG52YXIgdXRmOFRvSGV4ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgc3RyID0gdXRmOC5lbmNvZGUoc3RyKTtcbiAgICB2YXIgaGV4ID0gXCJcIjtcblxuICAgIC8vIHJlbW92ZSBcXHUwMDAwIHBhZGRpbmcgZnJvbSBlaXRoZXIgc2lkZVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eKD86XFx1MDAwMCkqLywnJyk7XG4gICAgc3RyID0gc3RyLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eKD86XFx1MDAwMCkqLywnJyk7XG4gICAgc3RyID0gc3RyLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAvLyBpZiAoY29kZSAhPT0gMCkge1xuICAgICAgICB2YXIgbiA9IGNvZGUudG9TdHJpbmcoMTYpO1xuICAgICAgICBoZXggKz0gbi5sZW5ndGggPCAyID8gJzAnICsgbiA6IG47XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICByZXR1cm4gXCIweFwiICsgaGV4O1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgY2FsbGVkIHRvIGdldCB1dGY4IGZyb20gaXQncyBoZXggcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAbWV0aG9kIGhleFRvVXRmOFxuICogQHBhcmFtIHtTdHJpbmd9IGhleFxuICogQHJldHVybnMge1N0cmluZ30gYXNjaWkgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGhleCB2YWx1ZVxuICovXG52YXIgaGV4VG9VdGY4ID0gZnVuY3Rpb24oaGV4KSB7XG4gICAgaWYgKCFpc0hleFN0cmljdChoZXgpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYXJhbWV0ZXIgXCInKyBoZXggKydcIiBtdXN0IGJlIGEgdmFsaWQgSEVYIHN0cmluZy4nKTtcblxuICAgIHZhciBzdHIgPSBcIlwiO1xuICAgIHZhciBjb2RlID0gMDtcbiAgICBoZXggPSBoZXgucmVwbGFjZSgvXjB4L2ksJycpO1xuXG4gICAgLy8gcmVtb3ZlIDAwIHBhZGRpbmcgZnJvbSBlaXRoZXIgc2lkZVxuICAgIGhleCA9IGhleC5yZXBsYWNlKC9eKD86MDApKi8sJycpO1xuICAgIGhleCA9IGhleC5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICBoZXggPSBoZXgucmVwbGFjZSgvXig/OjAwKSovLCcnKTtcbiAgICBoZXggPSBoZXguc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG5cbiAgICB2YXIgbCA9IGhleC5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpPTA7IGkgPCBsOyBpKz0yKSB7XG4gICAgICAgIGNvZGUgPSBwYXJzZUludChoZXguc3Vic3RyKGksIDIpLCAxNik7XG4gICAgICAgIC8vIGlmIChjb2RlICE9PSAwKSB7XG4gICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0ZjguZGVjb2RlKHN0cik7XG59O1xuXG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgdG8gaXQncyBudW1iZXIgcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAbWV0aG9kIGhleFRvTnVtYmVyXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8Qk59IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbnZhciBoZXhUb051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB0b0JOKHZhbHVlKS50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSB0byBpdCdzIGRlY2ltYWwgcmVwcmVzZW50YXRpb24gaW4gc3RyaW5nXG4gKlxuICogQG1ldGhvZCBoZXhUb051bWJlclN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEJOfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52YXIgaGV4VG9OdW1iZXJTdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gdmFsdWU7XG5cbiAgICByZXR1cm4gdG9CTih2YWx1ZSkudG9TdHJpbmcoMTApO1xufTtcblxuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIHRvIGl0J3MgaGV4IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQG1ldGhvZCBudW1iZXJUb0hleFxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEJOfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52YXIgbnVtYmVyVG9IZXggPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoXy5pc051bGwodmFsdWUpIHx8IF8uaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzRmluaXRlKHZhbHVlKSAmJiAhaXNIZXhTdHJpY3QodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignR2l2ZW4gaW5wdXQgXCInK3ZhbHVlKydcIiBpcyBub3QgYSBudW1iZXIuJyk7XG4gICAgfVxuXG4gICAgdmFyIG51bWJlciA9IHRvQk4odmFsdWUpO1xuICAgIHZhciByZXN1bHQgPSBudW1iZXIudG9TdHJpbmcoMTYpO1xuXG4gICAgcmV0dXJuIG51bWJlci5sdChuZXcgQk4oMCkpID8gJy0weCcgKyByZXN1bHQuc3Vic3RyKDEpIDogJzB4JyArIHJlc3VsdDtcbn07XG5cblxuLyoqXG4gKiBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAqXG4gKiBOb3RlOiBJbXBsZW1lbnRhdGlvbiBmcm9tIGNyeXB0by1qc1xuICpcbiAqIEBtZXRob2QgYnl0ZXNUb0hleFxuICogQHBhcmFtIHtBcnJheX0gYnl0ZXNcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIGhleCBzdHJpbmdcbiAqL1xudmFyIGJ5dGVzVG9IZXggPSBmdW5jdGlvbihieXRlcykge1xuICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgfVxuICAgIHJldHVybiAnMHgnKyBoZXguam9pbihcIlwiKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gKlxuICogTm90ZTogSW1wbGVtZW50YXRpb24gZnJvbSBjcnlwdG8tanNcbiAqXG4gKiBAbWV0aG9kIGhleFRvQnl0ZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBoZXhcbiAqIEByZXR1cm4ge0FycmF5fSB0aGUgYnl0ZSBhcnJheVxuICovXG52YXIgaGV4VG9CeXRlcyA9IGZ1bmN0aW9uKGhleCkge1xuICAgIGhleCA9IGhleC50b1N0cmluZygxNik7XG5cbiAgICBpZiAoIWlzSGV4U3RyaWN0KGhleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHaXZlbiB2YWx1ZSBcIicrIGhleCArJ1wiIGlzIG5vdCBhIHZhbGlkIGhleCBzdHJpbmcuJyk7XG4gICAgfVxuXG4gICAgaGV4ID0gaGV4LnJlcGxhY2UoL14weC9pLCcnKTtcblxuICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgcmV0dXJuIGJ5dGVzO1xufTtcblxuLyoqXG4gKiBBdXRvIGNvbnZlcnRzIGFueSBnaXZlbiB2YWx1ZSBpbnRvIGl0J3MgaGV4IHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIEFuZCBldmVuIHN0cmluZ2lmeXMgb2JqZWN0cyBiZWZvcmUuXG4gKlxuICogQG1ldGhvZCB0b0hleFxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEJOfE9iamVjdH0gdmFsdWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcmV0dXJuVHlwZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52YXIgdG9IZXggPSBmdW5jdGlvbiAodmFsdWUsIHJldHVyblR5cGUpIHtcbiAgICAvKmpzaGludCBtYXhjb21wbGV4aXR5OiBmYWxzZSAqL1xuXG4gICAgaWYgKGlzQWRkcmVzcyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHJldHVyblR5cGUgPyAnYWRkcmVzcycgOiAnMHgnKyB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL14weC9pLCcnKTtcbiAgICB9XG5cbiAgICBpZiAoXy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5UeXBlID8gJ2Jvb2wnIDogdmFsdWUgPyAnMHgwMScgOiAnMHgwMCc7XG4gICAgfVxuXG5cbiAgICBpZiAoXy5pc09iamVjdCh2YWx1ZSkgJiYgIWlzQmlnTnVtYmVyKHZhbHVlKSAmJiAhaXNCTih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHJldHVyblR5cGUgPyAnc3RyaW5nJyA6IHV0ZjhUb0hleChKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIG5lZ2F0aXZlIG51bWJlciwgcGFzcyBpdCB0aHJvdWdoIG51bWJlclRvSGV4XG4gICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCctMHgnKSA9PT0gMCB8fCB2YWx1ZS5pbmRleE9mKCctMFgnKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblR5cGUgPyAnaW50MjU2JyA6IG51bWJlclRvSGV4KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmKHZhbHVlLmluZGV4T2YoJzB4JykgPT09IDAgfHwgdmFsdWUuaW5kZXhPZignMFgnKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblR5cGUgPyAnYnl0ZXMnIDogdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblR5cGUgPyAnc3RyaW5nJyA6IHV0ZjhUb0hleCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVHlwZSA/ICh2YWx1ZSA8IDAgPyAnaW50MjU2JyA6ICd1aW50MjU2JykgOiBudW1iZXJUb0hleCh2YWx1ZSk7XG59O1xuXG5cbi8qKlxuICogQ2hlY2sgaWYgc3RyaW5nIGlzIEhFWCwgcmVxdWlyZXMgYSAweCBpbiBmcm9udFxuICpcbiAqIEBtZXRob2QgaXNIZXhTdHJpY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZXggdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbnZhciBpc0hleFN0cmljdCA9IGZ1bmN0aW9uIChoZXgpIHtcbiAgICByZXR1cm4gKChfLmlzU3RyaW5nKGhleCkgfHwgXy5pc051bWJlcihoZXgpKSAmJiAvXigtKT8weFswLTlhLWZdKiQvaS50ZXN0KGhleCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBzdHJpbmcgaXMgSEVYXG4gKlxuICogQG1ldGhvZCBpc0hleFxuICogQHBhcmFtIHtTdHJpbmd9IGhleCB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzSGV4ID0gZnVuY3Rpb24gKGhleCkge1xuICAgIHJldHVybiAoKF8uaXNTdHJpbmcoaGV4KSB8fCBfLmlzTnVtYmVyKGhleCkpICYmIC9eKC0weHwweCk/WzAtOWEtZl0qJC9pLnRlc3QoaGV4KSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIEV0aGVyZXVtIGJsb2NrIGhlYWRlciBibG9vbS5cbiAqXG4gKiBUT0RPIFVORE9DVU1FTlRFRFxuICpcbiAqIEBtZXRob2QgaXNCbG9vbVxuICogQHBhcmFtIHtTdHJpbmd9IGhleCBlbmNvZGVkIGJsb29tIGZpbHRlclxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzQmxvb20gPSBmdW5jdGlvbiAoYmxvb20pIHtcbiAgICBpZiAoIS9eKDB4KT9bMC05YS1mXXs1MTJ9JC9pLnRlc3QoYmxvb20pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKC9eKDB4KT9bMC05YS1mXXs1MTJ9JC8udGVzdChibG9vbSkgfHwgL14oMHgpP1swLTlBLUZdezUxMn0kLy50ZXN0KGJsb29tKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgbG9nIHRvcGljLlxuICpcbiAqIFRPRE8gVU5ET0NVTUVOVEVEXG4gKlxuICogQG1ldGhvZCBpc1RvcGljXG4gKiBAcGFyYW0ge1N0cmluZ30gaGV4IGVuY29kZWQgdG9waWNcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc1RvcGljID0gZnVuY3Rpb24gKHRvcGljKSB7XG4gICAgaWYgKCEvXigweCk/WzAtOWEtZl17NjR9JC9pLnRlc3QodG9waWMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKC9eKDB4KT9bMC05YS1mXXs2NH0kLy50ZXN0KHRvcGljKSB8fCAvXigweCk/WzAtOUEtRl17NjR9JC8udGVzdCh0b3BpYykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBIYXNoZXMgdmFsdWVzIHRvIGEgc2hhMyBoYXNoIHVzaW5nIGtlY2NhayAyNTZcbiAqXG4gKiBUbyBoYXNoIGEgSEVYIHN0cmluZyB0aGUgaGV4IG11c3QgaGF2ZSAweCBpbiBmcm9udC5cbiAqXG4gKiBAbWV0aG9kIHNoYTNcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHNoYTMgc3RyaW5nXG4gKi9cbnZhciBTSEEzX05VTExfUyA9ICcweGM1ZDI0NjAxODZmNzIzM2M5MjdlN2RiMmRjYzcwM2MwZTUwMGI2NTNjYTgyMjczYjdiZmFkODA0NWQ4NWE0NzAnO1xuXG52YXIgc2hhMyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmIChpc0JOKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzSGV4U3RyaWN0KHZhbHVlKSAmJiAvXjB4L2kudGVzdCgodmFsdWUpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgIHZhbHVlID0gaGV4VG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIHJldHVyblZhbHVlID0gSGFzaC5rZWNjYWsyNTYodmFsdWUpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIGlmKHJldHVyblZhbHVlID09PSBTSEEzX05VTExfUykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfVxufTtcbi8vIGV4cG9zZSB0aGUgdW5kZXIgdGhlIGhvb2Qga2VjY2FrMjU2XG5zaGEzLl9IYXNoID0gSGFzaDtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBCTjogQk4sXG4gICAgaXNCTjogaXNCTixcbiAgICBpc0JpZ051bWJlcjogaXNCaWdOdW1iZXIsXG4gICAgdG9CTjogdG9CTixcbiAgICBpc0FkZHJlc3M6IGlzQWRkcmVzcyxcbiAgICBpc0Jsb29tOiBpc0Jsb29tLCAvLyBUT0RPIFVORE9DVU1FTlRFRFxuICAgIGlzVG9waWM6IGlzVG9waWMsIC8vIFRPRE8gVU5ET0NVTUVOVEVEXG4gICAgY2hlY2tBZGRyZXNzQ2hlY2tzdW06IGNoZWNrQWRkcmVzc0NoZWNrc3VtLFxuICAgIHV0ZjhUb0hleDogdXRmOFRvSGV4LFxuICAgIGhleFRvVXRmODogaGV4VG9VdGY4LFxuICAgIGhleFRvTnVtYmVyOiBoZXhUb051bWJlcixcbiAgICBoZXhUb051bWJlclN0cmluZzogaGV4VG9OdW1iZXJTdHJpbmcsXG4gICAgbnVtYmVyVG9IZXg6IG51bWJlclRvSGV4LFxuICAgIHRvSGV4OiB0b0hleCxcbiAgICBoZXhUb0J5dGVzOiBoZXhUb0J5dGVzLFxuICAgIGJ5dGVzVG9IZXg6IGJ5dGVzVG9IZXgsXG4gICAgaXNIZXg6IGlzSGV4LFxuICAgIGlzSGV4U3RyaWN0OiBpc0hleFN0cmljdCxcbiAgICBsZWZ0UGFkOiBsZWZ0UGFkLFxuICAgIHJpZ2h0UGFkOiByaWdodFBhZCxcbiAgICB0b1R3b3NDb21wbGVtZW50OiB0b1R3b3NDb21wbGVtZW50LFxuICAgIHNoYTM6IHNoYTNcbn07XG4iLCIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKlxuICogQGZpbGUgdXRpbHMuanNcbiAqIEBhdXRob3IgTWFyZWsgS290ZXdpY3ogPG1hcmVrQHBhcml0eS5pbz5cbiAqIEBhdXRob3IgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqIEBkYXRlIDIwMTdcbiAqL1xuXG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGV0aGpzVW5pdCA9IHJlcXVpcmUoJ2V0aGpzLXVuaXQnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcbnZhciBzb2xpZGl0eVNoYTMgPSByZXF1aXJlKCcuL3NvbGlkaXR5U2hhMy5qcycpO1xudmFyIHJhbmRvbUhleCA9IHJlcXVpcmUoJ3JhbmRvbWhleCcpO1xuXG5cblxuLyoqXG4gKiBGaXJlcyBhbiBlcnJvciBpbiBhbiBldmVudCBlbWl0dGVyIGFuZCBjYWxsYmFjayBhbmQgcmV0dXJucyB0aGUgZXZlbnRlbWl0dGVyXG4gKlxuICogQG1ldGhvZCBfZmlyZUVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZXJyb3IgYSBzdHJpbmcsIGEgZXJyb3IsIG9yIGFuIG9iamVjdCB3aXRoIHttZXNzYWdlLCBkYXRhfVxuICogQHBhcmFtIHtPYmplY3R9IGVtaXR0ZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGVtaXR0ZXJcbiAqL1xudmFyIF9maXJlRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IsIGVtaXR0ZXIsIHJlamVjdCwgY2FsbGJhY2spIHtcbiAgICAvKmpzaGludCBtYXhjb21wbGV4aXR5OiAxMCAqL1xuXG4gICAgLy8gYWRkIGRhdGEgaWYgZ2l2ZW5cbiAgICBpZihfLmlzT2JqZWN0KGVycm9yKSAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpICYmICBlcnJvci5kYXRhKSB7XG4gICAgICAgIGlmKF8uaXNPYmplY3QoZXJyb3IuZGF0YSkgfHwgXy5pc0FycmF5KGVycm9yLmRhdGEpKSB7XG4gICAgICAgICAgICBlcnJvci5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IuZGF0YSwgbnVsbCwgMik7XG4gICAgICAgIH1cblxuICAgICAgICBlcnJvciA9IGVycm9yLm1lc3NhZ2UgK1wiXFxuXCIrIGVycm9yLmRhdGE7XG4gICAgfVxuXG4gICAgaWYoXy5pc1N0cmluZyhlcnJvcikpIHtcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICB9XG4gICAgaWYgKF8uaXNGdW5jdGlvbihyZWplY3QpKSB7XG4gICAgICAgIC8vIHN1cHByZXNzIHVuY2F0Y2hlZCBlcnJvciBpZiBhbiBlcnJvciBsaXN0ZW5lciBpcyBwcmVzZW50XG4gICAgICAgIC8vIE9SIHN1cHByZXNzIHVuY2F0Y2hlZCBlcnJvciBpZiBhbiBjYWxsYmFjayBsaXN0ZW5lciBpcyBwcmVzZW50XG4gICAgICAgIGlmIChlbWl0dGVyICYmXG4gICAgICAgICAgICAoXy5pc0Z1bmN0aW9uKGVtaXR0ZXIubGlzdGVuZXJzKSAmJlxuICAgICAgICAgICAgZW1pdHRlci5saXN0ZW5lcnMoJ2Vycm9yJykubGVuZ3RoKSB8fCBfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBlbWl0dGVyLmNhdGNoKGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVqZWN0IGxhdGVyLCB0byBiZSBhYmxlIHRvIHJldHVybiBlbWl0dGVyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuXG4gICAgaWYoZW1pdHRlciAmJiBfLmlzRnVuY3Rpb24oZW1pdHRlci5lbWl0KSkge1xuICAgICAgICAvLyBlbWl0IGxhdGVyLCB0byBiZSBhYmxlIHRvIHJldHVybiBlbWl0dGVyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIGVtaXR0ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIH0sIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBlbWl0dGVyO1xufTtcblxuLyoqXG4gKiBTaG91bGQgYmUgdXNlZCB0byBjcmVhdGUgZnVsbCBmdW5jdGlvbi9ldmVudCBuYW1lIGZyb20ganNvbiBhYmlcbiAqXG4gKiBAbWV0aG9kIF9qc29uSW50ZXJmYWNlTWV0aG9kVG9TdHJpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBqc29uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZ1bGwgZnVuY3Rpb24vZXZlbnQgbmFtZVxuICovXG52YXIgX2pzb25JbnRlcmZhY2VNZXRob2RUb1N0cmluZyA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgaWYgKF8uaXNPYmplY3QoanNvbikgJiYganNvbi5uYW1lICYmIGpzb24ubmFtZS5pbmRleE9mKCcoJykgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBqc29uLm5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzb24ubmFtZSArICcoJyArIF9mbGF0dGVuVHlwZXMoZmFsc2UsIGpzb24uaW5wdXRzKS5qb2luKCcsJykgKyAnKSc7XG59O1xuXG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgdG8gZmxhdHRlbiBqc29uIGFiaSBpbnB1dHMvb3V0cHV0cyBpbnRvIGFuIGFycmF5IG9mIHR5cGUtcmVwcmVzZW50aW5nLXN0cmluZ3NcbiAqXG4gKiBAbWV0aG9kIF9mbGF0dGVuVHlwZXNcbiAqIEBwYXJhbSB7Ym9vbH0gaW5jbHVkZVR1cGxlXG4gKiBAcGFyYW0ge09iamVjdH0gcHV0c1xuICogQHJldHVybiB7QXJyYXl9IHBhcmFtZXRlcnMgYXMgc3RyaW5nc1xuICovXG52YXIgX2ZsYXR0ZW5UeXBlcyA9IGZ1bmN0aW9uKGluY2x1ZGVUdXBsZSwgcHV0cylcbntcbiAgICAvLyBjb25zb2xlLmxvZyhcImVudGVyZWQgX2ZsYXR0ZW5UeXBlcy4gaW5wdXRzL291dHB1dHM6IFwiICsgcHV0cylcbiAgICB2YXIgdHlwZXMgPSBbXTtcblxuICAgIHB1dHMuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmFtLmNvbXBvbmVudHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAocGFyYW0udHlwZS5zdWJzdHJpbmcoMCwgNSkgIT09ICd0dXBsZScpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvbmVudHMgZm91bmQgYnV0IHR5cGUgaXMgbm90IHR1cGxlOyByZXBvcnQgb24gR2l0SHViJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gJyc7XG4gICAgICAgICAgICB2YXIgYXJyYXlCcmFja2V0ID0gcGFyYW0udHlwZS5pbmRleE9mKCdbJyk7XG4gICAgICAgICAgICBpZiAoYXJyYXlCcmFja2V0ID49IDApIHsgc3VmZml4ID0gcGFyYW0udHlwZS5zdWJzdHJpbmcoYXJyYXlCcmFja2V0KTsgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9mbGF0dGVuVHlwZXMoaW5jbHVkZVR1cGxlLCBwYXJhbS5jb21wb25lbnRzKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzdWx0IHNob3VsZCBoYXZlIHRoaW5nczogXCIgKyByZXN1bHQpXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocmVzdWx0KSAmJiBpbmNsdWRlVHVwbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImluY2x1ZGUgdHVwbGUgd29yZCwgYW5kIGl0cyBhbiBhcnJheS4gam9pbmluZy4uLjogXCIgKyByZXN1bHQudHlwZXMpXG4gICAgICAgICAgICAgICAgdHlwZXMucHVzaCgndHVwbGUoJyArIHJlc3VsdC5qb2luKCcsJykgKyAnKScgKyBzdWZmaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZighaW5jbHVkZVR1cGxlKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkb24ndCBpbmNsdWRlIHR1cGxlLCBidXQgaXRzIGFuIGFycmF5LiBqb2luaW5nLi4uOiBcIiArIHJlc3VsdClcbiAgICAgICAgICAgICAgICB0eXBlcy5wdXNoKCcoJyArIHJlc3VsdC5qb2luKCcsJykgKyAnKScgKyBzdWZmaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdHMgYSBzaW5nbGUgdHlwZSB3aXRoaW4gYSB0dXBsZTogXCIgKyByZXN1bHQudHlwZXMpXG4gICAgICAgICAgICAgICAgdHlwZXMucHVzaCgnKCcgKyByZXN1bHQgKyAnKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdHMgYSB0eXBlIGFuZCBub3QgZGlyZWN0bHkgaW4gYSB0dXBsZTogXCIgKyBwYXJhbS50eXBlKVxuICAgICAgICAgICAgdHlwZXMucHVzaChwYXJhbS50eXBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHR5cGVzO1xufTtcblxuXG4vKipcbiAqIFNob3VsZCBiZSBjYWxsZWQgdG8gZ2V0IGFzY2lpIGZyb20gaXQncyBoZXggcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAbWV0aG9kIGhleFRvQXNjaWlcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZXhcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGFzY2lpIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBoZXggdmFsdWVcbiAqL1xudmFyIGhleFRvQXNjaWkgPSBmdW5jdGlvbihoZXgpIHtcbiAgICBpZiAoIXV0aWxzLmlzSGV4U3RyaWN0KGhleCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHBhcmFtZXRlciBtdXN0IGJlIGEgdmFsaWQgSEVYIHN0cmluZy4nKTtcblxuICAgIHZhciBzdHIgPSBcIlwiO1xuICAgIHZhciBpID0gMCwgbCA9IGhleC5sZW5ndGg7XG4gICAgaWYgKGhleC5zdWJzdHJpbmcoMCwgMikgPT09ICcweCcpIHtcbiAgICAgICAgaSA9IDI7XG4gICAgfVxuICAgIGZvciAoOyBpIDwgbDsgaSs9Mikge1xuICAgICAgICB2YXIgY29kZSA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSwgMiksIDE2KTtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn07XG5cbi8qKlxuICogU2hvdWxkIGJlIGNhbGxlZCB0byBnZXQgaGV4IHJlcHJlc2VudGF0aW9uIChwcmVmaXhlZCBieSAweCkgb2YgYXNjaWkgc3RyaW5nXG4gKlxuICogQG1ldGhvZCBhc2NpaVRvSGV4XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBoZXggcmVwcmVzZW50YXRpb24gb2YgaW5wdXQgc3RyaW5nXG4gKi9cbnZhciBhc2NpaVRvSGV4ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYoIXN0cilcbiAgICAgICAgcmV0dXJuIFwiMHgwMFwiO1xuICAgIHZhciBoZXggPSBcIlwiO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIG4gPSBjb2RlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaGV4ICs9IG4ubGVuZ3RoIDwgMiA/ICcwJyArIG4gOiBuO1xuICAgIH1cblxuICAgIHJldHVybiBcIjB4XCIgKyBoZXg7XG59O1xuXG5cblxuLyoqXG4gKiBSZXR1cm5zIHZhbHVlIG9mIHVuaXQgaW4gV2VpXG4gKlxuICogQG1ldGhvZCBnZXRVbml0VmFsdWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB1bml0IHRoZSB1bml0IHRvIGNvbnZlcnQgdG8sIGRlZmF1bHQgZXRoZXJcbiAqIEByZXR1cm5zIHtCTn0gdmFsdWUgb2YgdGhlIHVuaXQgKGluIFdlaSlcbiAqIEB0aHJvd3MgZXJyb3IgaWYgdGhlIHVuaXQgaXMgbm90IGNvcnJlY3Q6d1xuICovXG52YXIgZ2V0VW5pdFZhbHVlID0gZnVuY3Rpb24gKHVuaXQpIHtcbiAgICB1bml0ID0gdW5pdCA/IHVuaXQudG9Mb3dlckNhc2UoKSA6ICdldGhlcic7XG4gICAgaWYgKCFldGhqc1VuaXQudW5pdE1hcFt1bml0XSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdW5pdCBcIicrIHVuaXQgKydcIiBkb2VzblxcJ3QgZXhpc3QsIHBsZWFzZSB1c2UgdGhlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHVuaXRzJyArIEpTT04uc3RyaW5naWZ5KGV0aGpzVW5pdC51bml0TWFwLCBudWxsLCAyKSk7XG4gICAgfVxuICAgIHJldHVybiB1bml0O1xufTtcblxuLyoqXG4gKiBUYWtlcyBhIG51bWJlciBvZiB3ZWkgYW5kIGNvbnZlcnRzIGl0IHRvIGFueSBvdGhlciBldGhlciB1bml0LlxuICpcbiAqIFBvc3NpYmxlIHVuaXRzIGFyZTpcbiAqICAgU0kgU2hvcnQgICBTSSBGdWxsICAgICAgICBFZmZpZ3kgICAgICAgT3RoZXJcbiAqIC0ga3dlaSAgICAgICBmZW10b2V0aGVyICAgICBiYWJiYWdlXG4gKiAtIG13ZWkgICAgICAgcGljb2V0aGVyICAgICAgbG92ZWxhY2VcbiAqIC0gZ3dlaSAgICAgICBuYW5vZXRoZXIgICAgICBzaGFubm9uICAgICAgbmFub1xuICogLSAtLSAgICAgICAgIG1pY3JvZXRoZXIgICAgIHN6YWJvICAgICAgICBtaWNyb1xuICogLSAtLSAgICAgICAgIG1pbGxpZXRoZXIgICAgIGZpbm5leSAgICAgICBtaWxsaVxuICogLSBldGhlciAgICAgIC0tICAgICAgICAgICAgIC0tXG4gKiAtIGtldGhlciAgICAgICAgICAgICAgICAgICAgLS0gICAgICAgICAgIGdyYW5kXG4gKiAtIG1ldGhlclxuICogLSBnZXRoZXJcbiAqIC0gdGV0aGVyXG4gKlxuICogQG1ldGhvZCBmcm9tV2VpXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IG51bWJlciBjYW4gYmUgYSBudW1iZXIsIG51bWJlciBzdHJpbmcgb3IgYSBIRVggb2YgYSBkZWNpbWFsXG4gKiBAcGFyYW0ge1N0cmluZ30gdW5pdCB0aGUgdW5pdCB0byBjb252ZXJ0IHRvLCBkZWZhdWx0IGV0aGVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8T2JqZWN0fSBXaGVuIGdpdmVuIGEgQk4gb2JqZWN0IGl0IHJldHVybnMgb25lIGFzIHdlbGwsIG90aGVyd2lzZSBhIG51bWJlclxuICovXG52YXIgZnJvbVdlaSA9IGZ1bmN0aW9uKG51bWJlciwgdW5pdCkge1xuICAgIHVuaXQgPSBnZXRVbml0VmFsdWUodW5pdCk7XG5cbiAgICBpZighdXRpbHMuaXNCTihudW1iZXIpICYmICFfLmlzU3RyaW5nKG51bWJlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcGFzcyBudW1iZXJzIGFzIHN0cmluZ3Mgb3IgQmlnTnVtYmVyIG9iamVjdHMgdG8gYXZvaWQgcHJlY2lzaW9uIGVycm9ycy4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuaXNCTihudW1iZXIpID8gZXRoanNVbml0LmZyb21XZWkobnVtYmVyLCB1bml0KSA6IGV0aGpzVW5pdC5mcm9tV2VpKG51bWJlciwgdW5pdCkudG9TdHJpbmcoMTApO1xufTtcblxuLyoqXG4gKiBUYWtlcyBhIG51bWJlciBvZiBhIHVuaXQgYW5kIGNvbnZlcnRzIGl0IHRvIHdlaS5cbiAqXG4gKiBQb3NzaWJsZSB1bml0cyBhcmU6XG4gKiAgIFNJIFNob3J0ICAgU0kgRnVsbCAgICAgICAgRWZmaWd5ICAgICAgIE90aGVyXG4gKiAtIGt3ZWkgICAgICAgZmVtdG9ldGhlciAgICAgYmFiYmFnZVxuICogLSBtd2VpICAgICAgIHBpY29ldGhlciAgICAgIGxvdmVsYWNlXG4gKiAtIGd3ZWkgICAgICAgbmFub2V0aGVyICAgICAgc2hhbm5vbiAgICAgIG5hbm9cbiAqIC0gLS0gICAgICAgICBtaWNyb2V0aGVyICAgICBzemFibyAgICAgICAgbWljcm9cbiAqIC0gLS0gICAgICAgICBtaWNyb2V0aGVyICAgICBzemFibyAgICAgICAgbWljcm9cbiAqIC0gLS0gICAgICAgICBtaWxsaWV0aGVyICAgICBmaW5uZXkgICAgICAgbWlsbGlcbiAqIC0gZXRoZXIgICAgICAtLSAgICAgICAgICAgICAtLVxuICogLSBrZXRoZXIgICAgICAgICAgICAgICAgICAgIC0tICAgICAgICAgICBncmFuZFxuICogLSBtZXRoZXJcbiAqIC0gZ2V0aGVyXG4gKiAtIHRldGhlclxuICpcbiAqIEBtZXRob2QgdG9XZWlcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xCTn0gbnVtYmVyIGNhbiBiZSBhIG51bWJlciwgbnVtYmVyIHN0cmluZyBvciBhIEhFWCBvZiBhIGRlY2ltYWxcbiAqIEBwYXJhbSB7U3RyaW5nfSB1bml0IHRoZSB1bml0IHRvIGNvbnZlcnQgZnJvbSwgZGVmYXVsdCBldGhlclxuICogQHJldHVybiB7U3RyaW5nfE9iamVjdH0gV2hlbiBnaXZlbiBhIEJOIG9iamVjdCBpdCByZXR1cm5zIG9uZSBhcyB3ZWxsLCBvdGhlcndpc2UgYSBudW1iZXJcbiAqL1xudmFyIHRvV2VpID0gZnVuY3Rpb24obnVtYmVyLCB1bml0KSB7XG4gICAgdW5pdCA9IGdldFVuaXRWYWx1ZSh1bml0KTtcblxuICAgIGlmKCF1dGlscy5pc0JOKG51bWJlcikgJiYgIV8uaXNTdHJpbmcobnVtYmVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwYXNzIG51bWJlcnMgYXMgc3RyaW5ncyBvciBCaWdOdW1iZXIgb2JqZWN0cyB0byBhdm9pZCBwcmVjaXNpb24gZXJyb3JzLicpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5pc0JOKG51bWJlcikgPyBldGhqc1VuaXQudG9XZWkobnVtYmVyLCB1bml0KSA6IGV0aGpzVW5pdC50b1dlaShudW1iZXIsIHVuaXQpLnRvU3RyaW5nKDEwKTtcbn07XG5cblxuXG5cbi8qKlxuICogQ29udmVydHMgdG8gYSBjaGVja3N1bSBhZGRyZXNzXG4gKlxuICogQG1ldGhvZCB0b0NoZWNrc3VtQWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgdGhlIGdpdmVuIEhFWCBhZGRyZXNzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbnZhciB0b0NoZWNrc3VtQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgaWYgKHR5cGVvZiBhZGRyZXNzID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuXG4gICAgaWYoIS9eKDB4KT9bMC05YS1mXXs0MH0kL2kudGVzdChhZGRyZXNzKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHaXZlbiBhZGRyZXNzIFwiJysgYWRkcmVzcyArJ1wiIGlzIG5vdCBhIHZhbGlkIEV0aGVyZXVtIGFkZHJlc3MuJyk7XG5cblxuXG4gICAgYWRkcmVzcyA9IGFkZHJlc3MudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eMHgvaSwnJyk7XG4gICAgdmFyIGFkZHJlc3NIYXNoID0gdXRpbHMuc2hhMyhhZGRyZXNzKS5yZXBsYWNlKC9eMHgvaSwnJyk7XG4gICAgdmFyIGNoZWNrc3VtQWRkcmVzcyA9ICcweCc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkZHJlc3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIC8vIElmIGl0aCBjaGFyYWN0ZXIgaXMgOSB0byBmIHRoZW4gbWFrZSBpdCB1cHBlcmNhc2VcbiAgICAgICAgaWYgKHBhcnNlSW50KGFkZHJlc3NIYXNoW2ldLCAxNikgPiA3KSB7XG4gICAgICAgICAgICBjaGVja3N1bUFkZHJlc3MgKz0gYWRkcmVzc1tpXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tzdW1BZGRyZXNzICs9IGFkZHJlc3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrc3VtQWRkcmVzcztcbn07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfZmlyZUVycm9yOiBfZmlyZUVycm9yLFxuICAgIF9qc29uSW50ZXJmYWNlTWV0aG9kVG9TdHJpbmc6IF9qc29uSW50ZXJmYWNlTWV0aG9kVG9TdHJpbmcsXG4gICAgX2ZsYXR0ZW5UeXBlczogX2ZsYXR0ZW5UeXBlcyxcbiAgICAvLyBleHRyYWN0RGlzcGxheU5hbWU6IGV4dHJhY3REaXNwbGF5TmFtZSxcbiAgICAvLyBleHRyYWN0VHlwZU5hbWU6IGV4dHJhY3RUeXBlTmFtZSxcbiAgICByYW5kb21IZXg6IHJhbmRvbUhleCxcbiAgICBfOiBfLFxuICAgIEJOOiB1dGlscy5CTixcbiAgICBpc0JOOiB1dGlscy5pc0JOLFxuICAgIGlzQmlnTnVtYmVyOiB1dGlscy5pc0JpZ051bWJlcixcbiAgICBpc0hleDogdXRpbHMuaXNIZXgsXG4gICAgaXNIZXhTdHJpY3Q6IHV0aWxzLmlzSGV4U3RyaWN0LFxuICAgIHNoYTM6IHV0aWxzLnNoYTMsXG4gICAga2VjY2FrMjU2OiB1dGlscy5zaGEzLFxuICAgIHNvbGlkaXR5U2hhMzogc29saWRpdHlTaGEzLFxuICAgIGlzQWRkcmVzczogdXRpbHMuaXNBZGRyZXNzLFxuICAgIGNoZWNrQWRkcmVzc0NoZWNrc3VtOiB1dGlscy5jaGVja0FkZHJlc3NDaGVja3N1bSxcbiAgICB0b0NoZWNrc3VtQWRkcmVzczogdG9DaGVja3N1bUFkZHJlc3MsXG4gICAgdG9IZXg6IHV0aWxzLnRvSGV4LFxuICAgIHRvQk46IHV0aWxzLnRvQk4sXG5cbiAgICBieXRlc1RvSGV4OiB1dGlscy5ieXRlc1RvSGV4LFxuICAgIGhleFRvQnl0ZXM6IHV0aWxzLmhleFRvQnl0ZXMsXG5cbiAgICBoZXhUb051bWJlclN0cmluZzogdXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcsXG5cbiAgICBoZXhUb051bWJlcjogdXRpbHMuaGV4VG9OdW1iZXIsXG4gICAgdG9EZWNpbWFsOiB1dGlscy5oZXhUb051bWJlciwgLy8gYWxpYXNcblxuICAgIG51bWJlclRvSGV4OiB1dGlscy5udW1iZXJUb0hleCxcbiAgICBmcm9tRGVjaW1hbDogdXRpbHMubnVtYmVyVG9IZXgsIC8vIGFsaWFzXG5cbiAgICBoZXhUb1V0Zjg6IHV0aWxzLmhleFRvVXRmOCxcbiAgICBoZXhUb1N0cmluZzogdXRpbHMuaGV4VG9VdGY4LFxuICAgIHRvVXRmODogdXRpbHMuaGV4VG9VdGY4LFxuXG4gICAgdXRmOFRvSGV4OiB1dGlscy51dGY4VG9IZXgsXG4gICAgc3RyaW5nVG9IZXg6IHV0aWxzLnV0ZjhUb0hleCxcbiAgICBmcm9tVXRmODogdXRpbHMudXRmOFRvSGV4LFxuXG4gICAgaGV4VG9Bc2NpaTogaGV4VG9Bc2NpaSxcbiAgICB0b0FzY2lpOiBoZXhUb0FzY2lpLFxuICAgIGFzY2lpVG9IZXg6IGFzY2lpVG9IZXgsXG4gICAgZnJvbUFzY2lpOiBhc2NpaVRvSGV4LFxuXG4gICAgdW5pdE1hcDogZXRoanNVbml0LnVuaXRNYXAsXG4gICAgdG9XZWk6IHRvV2VpLFxuICAgIGZyb21XZWk6IGZyb21XZWksXG5cbiAgICBwYWRMZWZ0OiB1dGlscy5sZWZ0UGFkLFxuICAgIGxlZnRQYWQ6IHV0aWxzLmxlZnRQYWQsXG4gICAgcGFkUmlnaHQ6IHV0aWxzLnJpZ2h0UGFkLFxuICAgIHJpZ2h0UGFkOiB1dGlscy5yaWdodFBhZCxcbiAgICB0b1R3b3NDb21wbGVtZW50OiB1dGlscy50b1R3b3NDb21wbGVtZW50XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4iLCIvKlxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qKlxuICogQGZpbGUgc29saWRpdHlTaGEzLmpzXG4gKiBAYXV0aG9yIEZhYmlhbiBWb2dlbHN0ZWxsZXIgPGZhYmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG5cbnZhciBfZWxlbWVudGFyeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIC8qanNoaW50IG1heGNvbXBsZXhpdHk6ZmFsc2UgKi9cblxuICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2ludFsnKSkge1xuICAgICAgICByZXR1cm4gJ2ludDI1NicgKyBuYW1lLnNsaWNlKDMpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2ludCcpIHtcbiAgICAgICAgcmV0dXJuICdpbnQyNTYnO1xuICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCd1aW50WycpKSB7XG4gICAgICAgIHJldHVybiAndWludDI1NicgKyBuYW1lLnNsaWNlKDQpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3VpbnQnKSB7XG4gICAgICAgIHJldHVybiAndWludDI1Nic7XG4gICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2ZpeGVkWycpKSB7XG4gICAgICAgIHJldHVybiAnZml4ZWQxMjh4MTI4JyArIG5hbWUuc2xpY2UoNSk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnZml4ZWQnKSB7XG4gICAgICAgIHJldHVybiAnZml4ZWQxMjh4MTI4JztcbiAgICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgndWZpeGVkWycpKSB7XG4gICAgICAgIHJldHVybiAndWZpeGVkMTI4eDEyOCcgKyBuYW1lLnNsaWNlKDYpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3VmaXhlZCcpIHtcbiAgICAgICAgcmV0dXJuICd1Zml4ZWQxMjh4MTI4JztcbiAgICB9XG4gICAgcmV0dXJuIG5hbWU7XG59O1xuXG4vLyBQYXJzZSBOIGZyb20gdHlwZTxOPlxudmFyIF9wYXJzZVR5cGVOID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdHlwZXNpemUgPSAvXlxcRCsoXFxkKykuKiQvLmV4ZWModHlwZSk7XG4gICAgcmV0dXJuIHR5cGVzaXplID8gcGFyc2VJbnQodHlwZXNpemVbMV0sIDEwKSA6IG51bGw7XG59O1xuXG4vLyBQYXJzZSBOIGZyb20gdHlwZVs8Tj5dXG52YXIgX3BhcnNlVHlwZU5BcnJheSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGFycmF5U2l6ZSA9IC9eXFxEK1xcZCpcXFsoXFxkKylcXF0kLy5leGVjKHR5cGUpO1xuICAgIHJldHVybiBhcnJheVNpemUgPyBwYXJzZUludChhcnJheVNpemVbMV0sIDEwKSA6IG51bGw7XG59O1xuXG52YXIgX3BhcnNlTnVtYmVyID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIGFyZztcbiAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzSGV4U3RyaWN0KGFyZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQk4oYXJnLnJlcGxhY2UoLzB4L2ksJycpLCAxNik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJOKGFyZywgMTApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gbmV3IEJOKGFyZyk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0JpZ051bWJlcihhcmcpKSB7XG4gICAgICAgIHJldHVybiBuZXcgQk4oYXJnLnRvU3RyaW5nKDEwKSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0JOKGFyZykpIHtcbiAgICAgICAgcmV0dXJuIGFyZztcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXJnICsnIGlzIG5vdCBhIG51bWJlcicpO1xuICAgIH1cbn07XG5cbnZhciBfc29saWRpdHlQYWNrID0gZnVuY3Rpb24gKHR5cGUsIHZhbHVlLCBhcnJheVNpemUpIHtcbiAgICAvKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5cbiAgICB2YXIgc2l6ZSwgbnVtO1xuICAgIHR5cGUgPSBfZWxlbWVudGFyeU5hbWUodHlwZSk7XG5cblxuICAgIGlmICh0eXBlID09PSAnYnl0ZXMnKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlLnJlcGxhY2UoL14weC9pLCcnKS5sZW5ndGggJSAyICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYnl0ZXMgY2hhcmFjdGVycyAnKyB2YWx1ZS5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnV0ZjhUb0hleCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYm9vbCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gJzAxJyA6ICcwMCc7XG4gICAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ2FkZHJlc3MnKSkge1xuICAgICAgICBpZihhcnJheVNpemUpIHtcbiAgICAgICAgICAgIHNpemUgPSA2NDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpemUgPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF1dGlscy5pc0FkZHJlc3ModmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodmFsdWUgKycgaXMgbm90IGEgdmFsaWQgYWRkcmVzcywgb3IgdGhlIGNoZWNrc3VtIGlzIGludmFsaWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXRpbHMubGVmdFBhZCh2YWx1ZS50b0xvd2VyQ2FzZSgpLCBzaXplKTtcbiAgICB9XG5cbiAgICBzaXplID0gX3BhcnNlVHlwZU4odHlwZSk7XG5cbiAgICBpZiAodHlwZS5zdGFydHNXaXRoKCdieXRlcycpKSB7XG5cbiAgICAgICAgaWYoIXNpemUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYnl0ZXNbXSBub3QgeWV0IHN1cHBvcnRlZCBpbiBzb2xpZGl0eScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbXVzdCBiZSAzMiBieXRlIHNsaWNlcyB3aGVuIGluIGFuIGFycmF5XG4gICAgICAgIGlmKGFycmF5U2l6ZSkge1xuICAgICAgICAgICAgc2l6ZSA9IDMyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiAzMiB8fCBzaXplIDwgdmFsdWUucmVwbGFjZSgvXjB4L2ksJycpLmxlbmd0aCAvIDIgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYnl0ZXMnICsgc2l6ZSArJyBmb3IgJysgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHV0aWxzLnJpZ2h0UGFkKHZhbHVlLCBzaXplICogMik7XG4gICAgfSBlbHNlIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ3VpbnQnKSkge1xuXG4gICAgICAgIGlmICgoc2l6ZSAlIDgpIHx8IChzaXplIDwgOCkgfHwgKHNpemUgPiAyNTYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdWludCcrc2l6ZSsnIHNpemUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG51bSA9IF9wYXJzZU51bWJlcih2YWx1ZSk7XG4gICAgICAgIGlmIChudW0uYml0TGVuZ3RoKCkgPiBzaXplKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIHVpbnQgZXhjZWVkcyB3aWR0aDogJyArIHNpemUgKyAnIHZzICcgKyBudW0uYml0TGVuZ3RoKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobnVtLmx0KG5ldyBCTigwKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcGxpZWQgdWludCAnKyBudW0udG9TdHJpbmcoKSArJyBpcyBuZWdhdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNpemUgPyB1dGlscy5sZWZ0UGFkKG51bS50b1N0cmluZygnaGV4JyksIHNpemUvOCAqIDIpIDogbnVtO1xuICAgIH0gZWxzZSBpZiAodHlwZS5zdGFydHNXaXRoKCdpbnQnKSkge1xuXG4gICAgICAgIGlmICgoc2l6ZSAlIDgpIHx8IChzaXplIDwgOCkgfHwgKHNpemUgPiAyNTYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50JytzaXplKycgc2l6ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbnVtID0gX3BhcnNlTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgaWYgKG51bS5iaXRMZW5ndGgoKSA+IHNpemUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcGxpZWQgaW50IGV4Y2VlZHMgd2lkdGg6ICcgKyBzaXplICsgJyB2cyAnICsgbnVtLmJpdExlbmd0aCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG51bS5sdChuZXcgQk4oMCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtLnRvVHdvcyhzaXplKS50b1N0cmluZygnaGV4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2l6ZSA/IHV0aWxzLmxlZnRQYWQobnVtLnRvU3RyaW5nKCdoZXgnKSwgc2l6ZS84ICogMikgOiBudW07XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZJWE1FOiBzdXBwb3J0IGFsbCBvdGhlciB0eXBlc1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIG9yIGludmFsaWQgdHlwZTogJyArIHR5cGUpO1xuICAgIH1cbn07XG5cblxudmFyIF9wcm9jZXNzU29saWRpdHlTaGEzQXJncyA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAvKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5cbiAgICBpZihfLmlzQXJyYXkoYXJnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dG9kZXRlY3Rpb24gb2YgYXJyYXkgdHlwZXMgaXMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSwgdmFsdWUgPSAnJztcbiAgICB2YXIgaGV4QXJnLCBhcnJheVNpemU7XG5cbiAgICAvLyBpZiB0eXBlIGlzIGdpdmVuXG4gICAgaWYgKF8uaXNPYmplY3QoYXJnKSAmJiAoYXJnLmhhc093blByb3BlcnR5KCd2JykgfHwgYXJnLmhhc093blByb3BlcnR5KCd0JykgfHwgYXJnLmhhc093blByb3BlcnR5KCd2YWx1ZScpIHx8IGFyZy5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSkge1xuICAgICAgICB0eXBlID0gYXJnLmhhc093blByb3BlcnR5KCd0JykgPyBhcmcudCA6IGFyZy50eXBlO1xuICAgICAgICB2YWx1ZSA9IGFyZy5oYXNPd25Qcm9wZXJ0eSgndicpID8gYXJnLnYgOiBhcmcudmFsdWU7XG5cbiAgICAvLyBvdGhlcndpc2UgdHJ5IHRvIGd1ZXNzIHRoZSB0eXBlXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB0eXBlID0gdXRpbHMudG9IZXgoYXJnLCB0cnVlKTtcbiAgICAgICAgdmFsdWUgPSB1dGlscy50b0hleChhcmcpO1xuXG4gICAgICAgIGlmICghdHlwZS5zdGFydHNXaXRoKCdpbnQnKSAmJiAhdHlwZS5zdGFydHNXaXRoKCd1aW50JykpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYnl0ZXMnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCh0eXBlLnN0YXJ0c1dpdGgoJ2ludCcpIHx8IHR5cGUuc3RhcnRzV2l0aCgndWludCcpKSAmJiAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhL14oLSk/MHgvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IG5ldyBCTih2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBhcnJheSBzaXplXG4gICAgaWYoXy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBhcnJheVNpemUgPSBfcGFyc2VUeXBlTkFycmF5KHR5cGUpO1xuICAgICAgICBpZihhcnJheVNpemUgJiYgdmFsdWUubGVuZ3RoICE9PSBhcnJheVNpemUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0eXBlICsnIGlzIG5vdCBtYXRjaGluZyB0aGUgZ2l2ZW4gYXJyYXkgJysgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5U2l6ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaGV4QXJnID0gdmFsdWUubWFwKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBfc29saWRpdHlQYWNrKHR5cGUsIHZhbCwgYXJyYXlTaXplKS50b1N0cmluZygnaGV4JykucmVwbGFjZSgnMHgnLCcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBoZXhBcmcuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaGV4QXJnID0gX3NvbGlkaXR5UGFjayh0eXBlLCB2YWx1ZSwgYXJyYXlTaXplKTtcbiAgICAgICAgcmV0dXJuIGhleEFyZy50b1N0cmluZygnaGV4JykucmVwbGFjZSgnMHgnLCcnKTtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogSGFzaGVzIHNvbGlkaXR5IHZhbHVlcyB0byBhIHNoYTMgaGFzaCB1c2luZyBrZWNjYWsgMjU2XG4gKlxuICogQG1ldGhvZCBzb2xpZGl0eVNoYTNcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIHNoYTNcbiAqL1xudmFyIHNvbGlkaXR5U2hhMyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgaGV4QXJncyA9IF8ubWFwKGFyZ3MsIF9wcm9jZXNzU29saWRpdHlTaGEzQXJncyk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhhcmdzLCBoZXhBcmdzKTtcbiAgICAvLyBjb25zb2xlLmxvZygnMHgnKyBoZXhBcmdzLmpvaW4oJycpKTtcblxuICAgIHJldHVybiB1dGlscy5zaGEzKCcweCcrIGhleEFyZ3Muam9pbignJykpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvbGlkaXR5U2hhMztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8qXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2Ygd2ViMy5qcy5cblxuICAgIHdlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gICAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIHdlYjMuanMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICAgIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgICBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICAgIGFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG4vKipcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yczpcbiAqICAgRmFiaWFuIFZvZ2Vsc3RlbGxlciA8ZmFiaWFuQGV0aGVyZXVtLm9yZz5cbiAqICAgR2F2IFdvb2QgPGdhdkBwYXJpdHkuaW8+XG4gKiAgIEplZmZyZXkgV2lsY2tlIDxqZWZmcmV5LndpbGNrZUBldGhlcmV1bS5vcmc+XG4gKiAgIE1hcmVrIEtvdGV3aWN6IDxtYXJla0BwYXJpdHkuaW8+XG4gKiAgIE1hcmlhbiBPYW5jZWEgPG1hcmlhbkBldGhlcmV1bS5vcmc+XG4gKiBAZGF0ZSAyMDE3XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xudmFyIGNvcmUgPSByZXF1aXJlKCd3ZWIzLWNvcmUnKTtcbnZhciBFdGggPSByZXF1aXJlKCd3ZWIzLWV0aCcpO1xudmFyIE5ldCA9IHJlcXVpcmUoJ3dlYjMtbmV0Jyk7XG52YXIgUGVyc29uYWwgPSByZXF1aXJlKCd3ZWIzLWV0aC1wZXJzb25hbCcpO1xudmFyIFNoaCA9IHJlcXVpcmUoJ3dlYjMtc2hoJyk7XG52YXIgQnp6ID0gcmVxdWlyZSgnd2ViMy1ienonKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ3dlYjMtdXRpbHMnKTtcblxudmFyIFdlYjMgPSBmdW5jdGlvbiBXZWIzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBzZXRzIF9yZXF1ZXN0bWFuYWdlciBldGNcbiAgICBjb3JlLnBhY2thZ2VJbml0KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMudXRpbHMgPSB1dGlscztcblxuICAgIHRoaXMuZXRoID0gbmV3IEV0aCh0aGlzKTtcbiAgICB0aGlzLnNoaCA9IG5ldyBTaGgodGhpcyk7XG4gICAgdGhpcy5ienogPSBuZXcgQnp6KHRoaXMpO1xuXG4gICAgLy8gb3ZlcndyaXRlIHBhY2thZ2Ugc2V0UHJvdmlkZXJcbiAgICB2YXIgc2V0UHJvdmlkZXIgPSB0aGlzLnNldFByb3ZpZGVyO1xuICAgIHRoaXMuc2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIG5ldCkge1xuICAgICAgICBzZXRQcm92aWRlci5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICB0aGlzLmV0aC5zZXRQcm92aWRlcihwcm92aWRlciwgbmV0KTtcbiAgICAgICAgdGhpcy5zaGguc2V0UHJvdmlkZXIocHJvdmlkZXIsIG5ldCk7XG4gICAgICAgIHRoaXMuYnp6LnNldFByb3ZpZGVyKHByb3ZpZGVyKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xufTtcblxuV2ViMy52ZXJzaW9uID0gdmVyc2lvbjtcbldlYjMudXRpbHMgPSB1dGlscztcbldlYjMubW9kdWxlcyA9IHtcbiAgICBFdGg6IEV0aCxcbiAgICBOZXQ6IE5ldCxcbiAgICBQZXJzb25hbDogUGVyc29uYWwsXG4gICAgU2hoOiBTaGgsXG4gICAgQnp6OiBCenpcbn07XG5cbmNvcmUuYWRkUHJvdmlkZXJzKFdlYjMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYjM7XG5cbiIsInZhciBfZ2xvYmFsVGhpcztcbnRyeSB7XG5cdF9nbG9iYWxUaGlzID0gcmVxdWlyZSgnZXM1LWV4dC9nbG9iYWwnKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG59IGZpbmFsbHkge1xuXHRpZiAoIV9nbG9iYWxUaGlzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IF9nbG9iYWxUaGlzID0gd2luZG93OyB9XG5cdGlmICghX2dsb2JhbFRoaXMpIHsgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZGV0ZXJtaW5lIGdsb2JhbCB0aGlzJyk7IH1cbn1cblxudmFyIE5hdGl2ZVdlYlNvY2tldCA9IF9nbG9iYWxUaGlzLldlYlNvY2tldCB8fCBfZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG52YXIgd2Vic29ja2V0X3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxuXG4vKipcbiAqIEV4cG9zZSBhIFczQyBXZWJTb2NrZXQgY2xhc3Mgd2l0aCBqdXN0IG9uZSBvciB0d28gYXJndW1lbnRzLlxuICovXG5mdW5jdGlvbiBXM0NXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpIHtcblx0dmFyIG5hdGl2ZV9pbnN0YW5jZTtcblxuXHRpZiAocHJvdG9jb2xzKSB7XG5cdFx0bmF0aXZlX2luc3RhbmNlID0gbmV3IE5hdGl2ZVdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bmF0aXZlX2luc3RhbmNlID0gbmV3IE5hdGl2ZVdlYlNvY2tldCh1cmkpO1xuXHR9XG5cblx0LyoqXG5cdCAqICduYXRpdmVfaW5zdGFuY2UnIGlzIGFuIGluc3RhbmNlIG9mIG5hdGl2ZVdlYlNvY2tldCAodGhlIGJyb3dzZXIncyBXZWJTb2NrZXRcblx0ICogY2xhc3MpLiBTaW5jZSBpdCBpcyBhbiBPYmplY3QgaXQgd2lsbCBiZSByZXR1cm5lZCBhcyBpdCBpcyB3aGVuIGNyZWF0aW5nIGFuXG5cdCAqIGluc3RhbmNlIG9mIFczQ1dlYlNvY2tldCB2aWEgJ25ldyBXM0NXZWJTb2NrZXQoKScuXG5cdCAqXG5cdCAqIEVDTUFTY3JpcHQgNTogaHR0cDovL2JjbGFyeS5jb20vMjAwNC8xMS8wNy8jYS0xMy4yLjJcblx0ICovXG5cdHJldHVybiBuYXRpdmVfaW5zdGFuY2U7XG59XG5pZiAoTmF0aXZlV2ViU29ja2V0KSB7XG5cdFsnQ09OTkVDVElORycsICdPUEVOJywgJ0NMT1NJTkcnLCAnQ0xPU0VEJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFczQ1dlYlNvY2tldCwgcHJvcCwge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIE5hdGl2ZVdlYlNvY2tldFtwcm9wXTsgfVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ3czY3dlYnNvY2tldCcgOiBOYXRpdmVXZWJTb2NrZXQgPyBXM0NXZWJTb2NrZXQgOiBudWxsLFxuICAgICd2ZXJzaW9uJyAgICAgIDogd2Vic29ja2V0X3ZlcnNpb25cbn07XG4iLCJ2YXIgYnM1OGNoZWNrID0gcmVxdWlyZSgnYnM1OGNoZWNrJylcblxuZnVuY3Rpb24gZGVjb2RlUmF3IChidWZmZXIsIHZlcnNpb24pIHtcbiAgLy8gY2hlY2sgdmVyc2lvbiBvbmx5IGlmIGRlZmluZWRcbiAgaWYgKHZlcnNpb24gIT09IHVuZGVmaW5lZCAmJiBidWZmZXJbMF0gIT09IHZlcnNpb24pIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBuZXR3b3JrIHZlcnNpb24nKVxuXG4gIC8vIHVuY29tcHJlc3NlZFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMzMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmVyc2lvbjogYnVmZmVyWzBdLFxuICAgICAgcHJpdmF0ZUtleTogYnVmZmVyLnNsaWNlKDEsIDMzKSxcbiAgICAgIGNvbXByZXNzZWQ6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgLy8gaW52YWxpZCBsZW5ndGhcbiAgaWYgKGJ1ZmZlci5sZW5ndGggIT09IDM0KSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgV0lGIGxlbmd0aCcpXG5cbiAgLy8gaW52YWxpZCBjb21wcmVzc2lvbiBmbGFnXG4gIGlmIChidWZmZXJbMzNdICE9PSAweDAxKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29tcHJlc3Npb24gZmxhZycpXG5cbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBidWZmZXJbMF0sXG4gICAgcHJpdmF0ZUtleTogYnVmZmVyLnNsaWNlKDEsIDMzKSxcbiAgICBjb21wcmVzc2VkOiB0cnVlXG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlUmF3ICh2ZXJzaW9uLCBwcml2YXRlS2V5LCBjb21wcmVzc2VkKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQnVmZmVyKGNvbXByZXNzZWQgPyAzNCA6IDMzKVxuXG4gIHJlc3VsdC53cml0ZVVJbnQ4KHZlcnNpb24sIDApXG4gIHByaXZhdGVLZXkuY29weShyZXN1bHQsIDEpXG5cbiAgaWYgKGNvbXByZXNzZWQpIHtcbiAgICByZXN1bHRbMzNdID0gMHgwMVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBkZWNvZGUgKHN0cmluZywgdmVyc2lvbikge1xuICByZXR1cm4gZGVjb2RlUmF3KGJzNThjaGVjay5kZWNvZGUoc3RyaW5nKSwgdmVyc2lvbilcbn1cblxuZnVuY3Rpb24gZW5jb2RlICh2ZXJzaW9uLCBwcml2YXRlS2V5LCBjb21wcmVzc2VkKSB7XG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ251bWJlcicpIHJldHVybiBiczU4Y2hlY2suZW5jb2RlKGVuY29kZVJhdyh2ZXJzaW9uLCBwcml2YXRlS2V5LCBjb21wcmVzc2VkKSlcblxuICByZXR1cm4gYnM1OGNoZWNrLmVuY29kZShcbiAgICBlbmNvZGVSYXcoXG4gICAgICB2ZXJzaW9uLnZlcnNpb24sXG4gICAgICB2ZXJzaW9uLnByaXZhdGVLZXksXG4gICAgICB2ZXJzaW9uLmNvbXByZXNzZWRcbiAgICApXG4gIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlY29kZTogZGVjb2RlLFxuICBkZWNvZGVSYXc6IGRlY29kZVJhdyxcbiAgZW5jb2RlOiBlbmNvZGUsXG4gIGVuY29kZVJhdzogZW5jb2RlUmF3XG59XG4iLCIvKlxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbiAgICB3ZWIzLmpzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICB3ZWIzLmpzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHdlYjMuanMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuLyoqXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBGYWJpYW4gVm9nZWxzdGVsbGVyIDxmYWJpYW5AZXRoZXJldW0ub3JnPlxuICogQGRhdGUgMjAxN1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY29yZSA9IHJlcXVpcmUoJ3dlYjMtY29yZScpO1xudmFyIFN1YnNjcmlwdGlvbnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtc3Vic2NyaXB0aW9ucycpLnN1YnNjcmlwdGlvbnM7XG52YXIgTWV0aG9kID0gcmVxdWlyZSgnd2ViMy1jb3JlLW1ldGhvZCcpO1xuLy8gdmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKCd3ZWIzLWNvcmUtaGVscGVycycpLmZvcm1hdHRlcnM7XG52YXIgTmV0ID0gcmVxdWlyZSgnd2ViMy1uZXQnKTtcblxuXG52YXIgU2hoID0gZnVuY3Rpb24gU2hoKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBzZXRzIF9yZXF1ZXN0bWFuYWdlclxuICAgIGNvcmUucGFja2FnZUluaXQodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIG92ZXJ3cml0ZSBzZXRQcm92aWRlclxuICAgIHZhciBzZXRQcm92aWRlciA9IHRoaXMuc2V0UHJvdmlkZXI7XG4gICAgdGhpcy5zZXRQcm92aWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0UHJvdmlkZXIuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIF90aGlzLm5ldC5zZXRQcm92aWRlci5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5uZXQgPSBuZXcgTmV0KHRoaXMuY3VycmVudFByb3ZpZGVyKTtcblxuICAgIFtcbiAgICAgICAgbmV3IFN1YnNjcmlwdGlvbnMoe1xuICAgICAgICAgICAgbmFtZTogJ3N1YnNjcmliZScsXG4gICAgICAgICAgICB0eXBlOiAnc2hoJyxcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAnbWVzc2FnZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dEZvcm1hdHRlcjogW2Zvcm1hdHRlcnMuaW5wdXRQb3N0Rm9ybWF0dGVyXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gb3V0cHV0Rm9ybWF0dGVyOiBmb3JtYXR0ZXJzLm91dHB1dFBvc3RGb3JtYXR0ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldFZlcnNpb24nLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF92ZXJzaW9uJyxcbiAgICAgICAgICAgIHBhcmFtczogMFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0SW5mbycsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX2luZm8nLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdzZXRNYXhNZXNzYWdlU2l6ZScsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX3NldE1heE1lc3NhZ2VTaXplJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnc2V0TWluUG9XJyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfc2V0TWluUG9XJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnbWFya1RydXN0ZWRQZWVyJyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfbWFya1RydXN0ZWRQZWVyJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnbmV3S2V5UGFpcicsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX25ld0tleVBhaXInLFxuICAgICAgICAgICAgcGFyYW1zOiAwXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdhZGRQcml2YXRlS2V5JyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfYWRkUHJpdmF0ZUtleScsXG4gICAgICAgICAgICBwYXJhbXM6IDFcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2RlbGV0ZUtleVBhaXInLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9kZWxldGVLZXlQYWlyJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnaGFzS2V5UGFpcicsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX2hhc0tleVBhaXInLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRQdWJsaWNLZXknLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9nZXRQdWJsaWNLZXknLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRQcml2YXRlS2V5JyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfZ2V0UHJpdmF0ZUtleScsXG4gICAgICAgICAgICBwYXJhbXM6IDFcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ25ld1N5bUtleScsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX25ld1N5bUtleScsXG4gICAgICAgICAgICBwYXJhbXM6IDBcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2FkZFN5bUtleScsXG4gICAgICAgICAgICBjYWxsOiAnc2hoX2FkZFN5bUtleScsXG4gICAgICAgICAgICBwYXJhbXM6IDFcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dlbmVyYXRlU3ltS2V5RnJvbVBhc3N3b3JkJyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfZ2VuZXJhdGVTeW1LZXlGcm9tUGFzc3dvcmQnLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdoYXNTeW1LZXknLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9oYXNTeW1LZXknLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRTeW1LZXknLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9nZXRTeW1LZXknLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdkZWxldGVTeW1LZXknLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9kZWxldGVTeW1LZXknLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pLFxuXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ25ld01lc3NhZ2VGaWx0ZXInLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9uZXdNZXNzYWdlRmlsdGVyJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE1ldGhvZCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0RmlsdGVyTWVzc2FnZXMnLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9nZXRGaWx0ZXJNZXNzYWdlcycsXG4gICAgICAgICAgICBwYXJhbXM6IDFcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ2RlbGV0ZU1lc3NhZ2VGaWx0ZXInLFxuICAgICAgICAgICAgY2FsbDogJ3NoaF9kZWxldGVNZXNzYWdlRmlsdGVyJyxcbiAgICAgICAgICAgIHBhcmFtczogMVxuICAgICAgICB9KSxcblxuICAgICAgICBuZXcgTWV0aG9kKHtcbiAgICAgICAgICAgIG5hbWU6ICdwb3N0JyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfcG9zdCcsXG4gICAgICAgICAgICBwYXJhbXM6IDEsXG4gICAgICAgICAgICBpbnB1dEZvcm1hdHRlcjogW251bGxdXG4gICAgICAgIH0pLFxuXG4gICAgICAgIG5ldyBNZXRob2Qoe1xuICAgICAgICAgICAgbmFtZTogJ3Vuc3Vic2NyaWJlJyxcbiAgICAgICAgICAgIGNhbGw6ICdzaGhfdW5zdWJzY3JpYmUnLFxuICAgICAgICAgICAgcGFyYW1zOiAxXG4gICAgICAgIH0pXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuYXR0YWNoVG9PYmplY3QoX3RoaXMpO1xuICAgICAgICBtZXRob2Quc2V0UmVxdWVzdE1hbmFnZXIoX3RoaXMuX3JlcXVlc3RNYW5hZ2VyKTtcbiAgICB9KTtcbn07XG5cblNoaC5wcm90b3R5cGUuY2xlYXJTdWJzY3JpcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICB0aGlzLl9yZXF1ZXN0TWFuYWdlci5jbGVhclN1YnNjcmlwdGlvbnMoKTtcbn07XG5cbmNvcmUuYWRkUHJvdmlkZXJzKFNoaCk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaDtcblxuXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwic291cmNlUm9vdCI6IiJ9