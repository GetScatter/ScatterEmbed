(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "+0iO":
/***/ (function(module) {

module.exports = JSON.parse("[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]");

/***/ }),

/***/ "5lvq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const sjcl = __webpack_require__("+7+6");
class AES {
    static encrypt(data, key) {
        if (typeof data === 'object')
            data = JSON.stringify(data);
        const { iv, salt, ct } = JSON.parse(sjcl.encrypt(key, data, { mode: 'gcm' }));
        return JSON.stringify({ iv, salt, ct });
    }
    static decrypt(encryptedData, key) {
        encryptedData = JSON.stringify(Object.assign(JSON.parse(encryptedData), { mode: 'gcm' }));
        let clear = sjcl.decrypt(key, encryptedData);
        try {
            return JSON.parse(clear);
        }
        catch (e) {
            return clear;
        }
    }
}
exports.AES = AES;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AES;
//# sourceMappingURL=AES.js.map

/***/ }),

/***/ "6mh5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_util_1 = __webpack_require__("y3zn");
var buffer_1 = __webpack_require__("HDXh");
var transaction_1 = __webpack_require__("YHbk");
/**
 * Creates a new transaction object that doesn't need to be signed.
 *
 * @param data - A transaction can be initialized with its rlp representation, an array containing
 * the value of its fields in order, or an object containing them by name.
 *
 * @param opts - The transaction's options, used to indicate the chain and hardfork the
 * transactions belongs to.
 *
 * @see Transaction
 */
var FakeTransaction = /** @class */ (function (_super) {
    __extends(FakeTransaction, _super);
    function FakeTransaction(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, data, opts) || this;
        Object.defineProperty(_this, 'from', {
            enumerable: true,
            configurable: true,
            get: function () { return _this.getSenderAddress(); },
            set: function (val) {
                if (val) {
                    _this._from = ethereumjs_util_1.toBuffer(val);
                }
            },
        });
        var txData = data;
        if (txData.from) {
            _this.from = ethereumjs_util_1.toBuffer(txData.from);
        }
        return _this;
    }
    /**
     * Computes a sha3-256 hash of the serialized tx, using the sender address to generate a fake
     * signature.
     *
     * @param includeSignature - Whether or not to include the signature
     */
    FakeTransaction.prototype.hash = function (includeSignature) {
        if (includeSignature === void 0) { includeSignature = true; }
        if (includeSignature && this._from && this._from.toString('hex') !== '') {
            // include a fake signature using the from address as a private key
            var fakeKey = buffer_1.Buffer.concat([this._from, this._from.slice(0, 12)]);
            this.sign(fakeKey);
        }
        return _super.prototype.hash.call(this, includeSignature);
    };
    return FakeTransaction;
}(transaction_1.default));
exports.default = FakeTransaction;
//# sourceMappingURL=fake.js.map

/***/ }),

/***/ "9TkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __webpack_require__("YHbk");
exports.Transaction = transaction_1.default;
var fake_1 = __webpack_require__("6mh5");
exports.FakeTransaction = fake_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "L8hn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__("eK4W")(window, loadImplementation)

/**
 * Browser specific loadImplementation.  Always uses `window.Promise`
 *
 * To register a custom implementation, must register with `Promise` option.
 */
function loadImplementation(){
  if(typeof window.Promise === 'undefined'){
    throw new Error("any-promise browser requires a polyfill or explicit registration"+
      " e.g: require('any-promise/register/bluebird')")
  }
  return {
    Promise: window.Promise,
    implementation: 'window.Promise'
  }
}


/***/ }),

/***/ "OsH3":
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

/***/ "YHbk":
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
var ethereumjs_util_1 = __webpack_require__("y3zn");
var ethereumjs_common_1 = __webpack_require__("pi6U");
var buffer_1 = __webpack_require__("HDXh");
// secp256k1n/2
var N_DIV_2 = new ethereumjs_util_1.BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
/**
 * An Ethereum transaction.
 */
var Transaction = /** @class */ (function () {
    /**
     * Creates a new transaction from an object with its fields' values.
     *
     * @param data - A transaction can be initialized with its rlp representation, an array containing
     * the value of its fields in order, or an object containing them by name.
     *
     * @param opts - The transaction's options, used to indicate the chain and hardfork the
     * transactions belongs to.
     *
     * @note Transaction objects implement EIP155 by default. To disable it, use the constructor's
     * second parameter to set a chain and hardfork before EIP155 activation (i.e. before Spurious
     * Dragon.)
     *
     * @example
     * ```js
     * const txData = {
     *   nonce: '0x00',
     *   gasPrice: '0x09184e72a000',
     *   gasLimit: '0x2710',
     *   to: '0x0000000000000000000000000000000000000000',
     *   value: '0x00',
     *   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
     *   v: '0x1c',
     *   r: '0x5e1d3a76fbf824220eafc8c79ad578ad2b67d01b0c2425eb1f1347e8f50882ab',
     *   s: '0x5bd428537f05f9830e93792f90ea6a3e2d1ee84952dd96edbae9f658f831ab13'
     * };
     * const tx = new Transaction(txData);
     * ```
     */
    function Transaction(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        // instantiate Common class instance based on passed options
        if (opts.common) {
            if (opts.chain || opts.hardfork) {
                throw new Error('Instantiation with both opts.common, and opts.chain and opts.hardfork parameter not allowed!');
            }
            this._common = opts.common;
        }
        else {
            var chain = opts.chain ? opts.chain : 'mainnet';
            var hardfork = opts.hardfork ? opts.hardfork : 'petersburg';
            this._common = new ethereumjs_common_1.default(chain, hardfork);
        }
        // Define Properties
        var fields = [
            {
                name: 'nonce',
                length: 32,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'gasPrice',
                length: 32,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'gasLimit',
                alias: 'gas',
                length: 32,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'to',
                allowZero: true,
                length: 20,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'value',
                length: 32,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'data',
                alias: 'input',
                allowZero: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'v',
                allowZero: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 'r',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
            {
                name: 's',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new buffer_1.Buffer([]),
            },
        ];
        // attached serialize
        ethereumjs_util_1.defineProperties(this, fields, data);
        /**
         * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
         * @name from
         * @memberof Transaction
         */
        Object.defineProperty(this, 'from', {
            enumerable: true,
            configurable: true,
            get: this.getSenderAddress.bind(this),
        });
        this._validateV(this.v);
        this._overrideVSetterWithValidation();
    }
    /**
     * If the tx's `to` is to the creation address
     */
    Transaction.prototype.toCreationAddress = function () {
        return this.to.toString('hex') === '';
    };
    /**
     * Computes a sha3-256 hash of the serialized tx
     * @param includeSignature - Whether or not to include the signature
     */
    Transaction.prototype.hash = function (includeSignature) {
        if (includeSignature === void 0) { includeSignature = true; }
        var items;
        if (includeSignature) {
            items = this.raw;
        }
        else {
            if (this._implementsEIP155()) {
                items = this.raw.slice(0, 6).concat([
                    ethereumjs_util_1.toBuffer(this.getChainId()),
                    // TODO: stripping zeros should probably be a responsibility of the rlp module
                    ethereumjs_util_1.stripZeros(ethereumjs_util_1.toBuffer(0)),
                    ethereumjs_util_1.stripZeros(ethereumjs_util_1.toBuffer(0)),
                ]);
            }
            else {
                items = this.raw.slice(0, 6);
            }
        }
        // create hash
        return ethereumjs_util_1.rlphash(items);
    };
    /**
     * returns chain ID
     */
    Transaction.prototype.getChainId = function () {
        return this._common.chainId();
    };
    /**
     * returns the sender's address
     */
    Transaction.prototype.getSenderAddress = function () {
        if (this._from) {
            return this._from;
        }
        var pubkey = this.getSenderPublicKey();
        this._from = ethereumjs_util_1.publicToAddress(pubkey);
        return this._from;
    };
    /**
     * returns the public key of the sender
     */
    Transaction.prototype.getSenderPublicKey = function () {
        if (!this.verifySignature()) {
            throw new Error('Invalid Signature');
        }
        // If the signature was verified successfully the _senderPubKey field is defined
        return this._senderPubKey;
    };
    /**
     * Determines if the signature is valid
     */
    Transaction.prototype.verifySignature = function () {
        var msgHash = this.hash(false);
        // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
        if (this._common.gteHardfork('homestead') && new ethereumjs_util_1.BN(this.s).cmp(N_DIV_2) === 1) {
            return false;
        }
        try {
            var v = ethereumjs_util_1.bufferToInt(this.v);
            var useChainIdWhileRecoveringPubKey = v >= this.getChainId() * 2 + 35 && this._common.gteHardfork('spuriousDragon');
            this._senderPubKey = ethereumjs_util_1.ecrecover(msgHash, v, this.r, this.s, useChainIdWhileRecoveringPubKey ? this.getChainId() : undefined);
        }
        catch (e) {
            return false;
        }
        return !!this._senderPubKey;
    };
    /**
     * sign a transaction with a given private key
     * @param privateKey - Must be 32 bytes in length
     */
    Transaction.prototype.sign = function (privateKey) {
        // We clear any previous signature before signing it. Otherwise, _implementsEIP155's can give
        // different results if this tx was already signed.
        this.v = new buffer_1.Buffer([]);
        this.s = new buffer_1.Buffer([]);
        this.r = new buffer_1.Buffer([]);
        var msgHash = this.hash(false);
        var sig = ethereumjs_util_1.ecsign(msgHash, privateKey);
        if (this._implementsEIP155()) {
            sig.v += this.getChainId() * 2 + 8;
        }
        Object.assign(this, sig);
    };
    /**
     * The amount of gas paid for the data in this tx
     */
    Transaction.prototype.getDataFee = function () {
        var data = this.raw[5];
        var cost = new ethereumjs_util_1.BN(0);
        for (var i = 0; i < data.length; i++) {
            data[i] === 0
                ? cost.iaddn(this._common.param('gasPrices', 'txDataZero'))
                : cost.iaddn(this._common.param('gasPrices', 'txDataNonZero'));
        }
        return cost;
    };
    /**
     * the minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
     */
    Transaction.prototype.getBaseFee = function () {
        var fee = this.getDataFee().iaddn(this._common.param('gasPrices', 'tx'));
        if (this._common.gteHardfork('homestead') && this.toCreationAddress()) {
            fee.iaddn(this._common.param('gasPrices', 'txCreation'));
        }
        return fee;
    };
    /**
     * the up front amount that an account must have for this transaction to be valid
     */
    Transaction.prototype.getUpfrontCost = function () {
        return new ethereumjs_util_1.BN(this.gasLimit).imul(new ethereumjs_util_1.BN(this.gasPrice)).iadd(new ethereumjs_util_1.BN(this.value));
    };
    Transaction.prototype.validate = function (stringError) {
        if (stringError === void 0) { stringError = false; }
        var errors = [];
        if (!this.verifySignature()) {
            errors.push('Invalid Signature');
        }
        if (this.getBaseFee().cmp(new ethereumjs_util_1.BN(this.gasLimit)) > 0) {
            errors.push(["gas limit is too low. Need at least " + this.getBaseFee()]);
        }
        if (stringError === false) {
            return errors.length === 0;
        }
        else {
            return errors.join(' ');
        }
    };
    /**
     * Returns the rlp encoding of the transaction
     */
    Transaction.prototype.serialize = function () {
        // Note: This never gets executed, defineProperties overwrites it.
        return ethereumjs_util_1.rlp.encode(this.raw);
    };
    /**
     * Returns the transaction in JSON format
     * @see {@link https://github.com/ethereumjs/ethereumjs-util/blob/master/docs/index.md#defineproperties|ethereumjs-util}
     */
    Transaction.prototype.toJSON = function (labels) {
        if (labels === void 0) { labels = false; }
        // Note: This never gets executed, defineProperties overwrites it.
        return {};
    };
    Transaction.prototype._validateV = function (v) {
        if (v === undefined || v.length === 0) {
            return;
        }
        if (!this._common.gteHardfork('spuriousDragon')) {
            return;
        }
        var vInt = ethereumjs_util_1.bufferToInt(v);
        if (vInt === 27 || vInt === 28) {
            return;
        }
        var isValidEIP155V = vInt === this.getChainId() * 2 + 35 || vInt === this.getChainId() * 2 + 36;
        if (!isValidEIP155V) {
            throw new Error("Incompatible EIP155-based V " + vInt + " and chain id " + this.getChainId() + ". See the second parameter of the Transaction constructor to set the chain id.");
        }
    };
    Transaction.prototype._isSigned = function () {
        return this.v.length > 0 && this.r.length > 0 && this.s.length > 0;
    };
    Transaction.prototype._overrideVSetterWithValidation = function () {
        var _this = this;
        var vDescriptor = Object.getOwnPropertyDescriptor(this, 'v');
        Object.defineProperty(this, 'v', __assign({}, vDescriptor, { set: function (v) {
                if (v !== undefined) {
                    _this._validateV(ethereumjs_util_1.toBuffer(v));
                }
                vDescriptor.set(v);
            } }));
    };
    Transaction.prototype._implementsEIP155 = function () {
        var onEIP155BlockOrLater = this._common.gteHardfork('spuriousDragon');
        if (!this._isSigned()) {
            // We sign with EIP155 all unsigned transactions after spuriousDragon
            return onEIP155BlockOrLater;
        }
        // EIP155 spec:
        // If block.number >= 2,675,000 and v = CHAIN_ID * 2 + 35 or v = CHAIN_ID * 2 + 36, then when computing
        // the hash of a transaction for purposes of signing or recovering, instead of hashing only the first six
        // elements (i.e. nonce, gasprice, startgas, to, value, data), hash nine elements, with v replaced by
        // CHAIN_ID, r = 0 and s = 0.
        var v = ethereumjs_util_1.bufferToInt(this.v);
        var vAndChainIdMeetEIP155Conditions = v === this.getChainId() * 2 + 35 || v === this.getChainId() * 2 + 36;
        return vAndChainIdMeetEIP155Conditions && onEIP155BlockOrLater;
    };
    return Transaction;
}());
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map

/***/ }),

/***/ "dI+u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _Plugin2 = _interopRequireDefault(__webpack_require__("MIez"));

var PluginTypes = _interopRequireWildcard(__webpack_require__("ROq3"));

var _Blockchains = __webpack_require__("F+MN");

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var Actions = _interopRequireWildcard(__webpack_require__("+nw1"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var _TokenService = _interopRequireDefault(__webpack_require__("ONSl"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var _web = _interopRequireDefault(__webpack_require__("YxRf"));

var _web3ProviderEngine = _interopRequireDefault(__webpack_require__("f4g2"));

var _rpc = _interopRequireDefault(__webpack_require__("WPTD"));

var _hookedWallet = _interopRequireDefault(__webpack_require__("Rlsf"));

var erc20abi = __webpack_require__("+0iO");

var EthTx = __webpack_require__("9TkW").Transaction;

var ethUtil = __webpack_require__("y3zn");

var web3util = new _web["default"]();

var toBuffer = function toBuffer(key) {
  return ethUtil.toBuffer(ethUtil.addHexPrefix(key));
};

var cachedInstances = {};

var getCachedInstance = function getCachedInstance(network) {
  var wallet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var key = network.unique() + (wallet ? wallet.getAccounts()[0] : '');
  if (cachedInstances.hasOwnProperty(key)) return cachedInstances[key];else {
    var engine = new _web3ProviderEngine["default"]();
    var web3 = new _web["default"](engine);
    if (wallet) engine.addProvider(new _hookedWallet["default"](wallet));
    var rpcUrl = network.host === 'ethnodes.get-scatter.com' ? 'https://commonly-classic-katydid.quiknode.io/d0bf98e7-a866-43d4-ac71-2397fd1b3aba/dQsznyrZRg2dr4DQJNPDgw==/' : network.fullhost();
    engine.addProvider(new _rpc["default"]({
      rpcUrl: rpcUrl
    }));
    engine.start();
    cachedInstances[key] = [web3, engine];
    return cachedInstances[key];
  }
};

var killCachedInstance = function killCachedInstance(network) {
  var wallet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var key = network.unique() + (wallet ? wallet.getAccounts()[0] : '');

  if (cachedInstances.hasOwnProperty(key)) {
    var _cachedInstances$key = (0, _slicedToArray2["default"])(cachedInstances[key], 2),
        web3 = _cachedInstances$key[0],
        engine = _cachedInstances$key[1];

    engine.stop();
    delete cachedInstances[key];
  }
};

var EXPLORER = {
  "name": "Etherscan",
  "account": "https://etherscan.io/address/{x}",
  "transaction": "https://etherscan.io/tx/{x}",
  "block": "https://etherscan.io/block/{x}"
};

var strtodec = function strtodec(amount, dec) {
  var stringf = "";

  for (var i = 0; i < dec; i++) {
    stringf = stringf + "0";
  }

  return amount + stringf;
};

var ETH =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2["default"])(ETH, _Plugin);

  function ETH() {
    (0, _classCallCheck2["default"])(this, ETH);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ETH).call(this, _Blockchains.Blockchains.ETH, PluginTypes.BLOCKCHAIN_SUPPORT));
  }

  (0, _createClass2["default"])(ETH, [{
    key: "bip",
    value: function bip() {
      return "44'/60'/0'/0/";
    }
  }, {
    key: "bustCache",
    value: function bustCache() {
      cachedInstances = {};
    }
  }, {
    key: "defaultExplorer",
    value: function defaultExplorer() {
      return EXPLORER;
    }
  }, {
    key: "accountFormatter",
    value: function accountFormatter(account) {
      return "".concat(account.publicKey);
    }
  }, {
    key: "returnableAccount",
    value: function returnableAccount(account) {
      return {
        address: account.publicKey,
        blockchain: _Blockchains.Blockchains.ETH
      };
    }
  }, {
    key: "contractPlaceholder",
    value: function contractPlaceholder() {
      return '0x.....';
    }
  }, {
    key: "recipientLabel",
    value: function recipientLabel() {
      return "Address";
    }
  }, {
    key: "checkNetwork",
    value: function checkNetwork(network) {
      return Promise.race([new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(null);
        }, 2000);
      }), //TODO:
      new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(true);
        }, 10);
      })]);
    }
  }, {
    key: "getEndorsedNetwork",
    value: function getEndorsedNetwork() {
      return new _Network["default"]('ETH Mainnet', 'https', 'ethnodes.get-scatter.com', 443, _Blockchains.Blockchains.ETH, '1');
    }
  }, {
    key: "isEndorsedNetwork",
    value: function isEndorsedNetwork(network) {
      var endorsedNetwork = this.getEndorsedNetwork();
      return network.blockchain === _Blockchains.Blockchains.ETH && network.chainId === endorsedNetwork.chainId;
    }
  }, {
    key: "getChainId",
    value: function () {
      var _getChainId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(network) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getChainId(_x) {
        return _getChainId.apply(this, arguments);
      }

      return getChainId;
    }()
  }, {
    key: "usesResources",
    value: function usesResources() {
      return false;
    }
  }, {
    key: "hasAccountActions",
    value: function hasAccountActions() {
      return false;
    }
  }, {
    key: "accountsAreImported",
    value: function accountsAreImported() {
      return false;
    }
  }, {
    key: "isValidRecipient",
    value: function isValidRecipient(address) {
      return this.validPublicKey(address);
    }
  }, {
    key: "privateToPublic",
    value: function privateToPublic(privateKey) {
      return ethUtil.addHexPrefix(ethUtil.privateToAddress(toBuffer(privateKey)).toString('hex'));
    }
  }, {
    key: "validPrivateKey",
    value: function validPrivateKey(privateKey) {
      return privateKey.length === 64 && ethUtil.isValidPrivate(toBuffer(privateKey));
    }
  }, {
    key: "validPublicKey",
    value: function validPublicKey(publicKey) {
      return ethUtil.isValidAddress(publicKey);
    }
  }, {
    key: "bufferToHexPrivate",
    value: function bufferToHexPrivate(buffer) {
      return Buffer.from(buffer).toString('hex');
    }
  }, {
    key: "hexPrivateToBuffer",
    value: function hexPrivateToBuffer(privateKey) {
      return Buffer.from(privateKey, 'hex');
    }
  }, {
    key: "hasUntouchableTokens",
    value: function hasUntouchableTokens() {
      return false;
    }
  }, {
    key: "balanceFor",
    value: function () {
      var _balanceFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(account, token) {
        var _this = this;

        var web3,
            killInstance,
            balance,
            _getCachedInstance,
            _getCachedInstance2,
            w,
            e,
            _args3 = arguments;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                web3 = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
                killInstance = !web3;

                if (!web3) {
                  _getCachedInstance = getCachedInstance(account.network()), _getCachedInstance2 = (0, _slicedToArray2["default"])(_getCachedInstance, 2), w = _getCachedInstance2[0], e = _getCachedInstance2[1];
                  web3 = e;
                }

                _context3.next = 5;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve();
                  }, 10000);
                }), new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee2(resolve) {
                    var contract;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(token.uniqueWithChain() === _this.defaultToken().uniqueWithChain())) {
                              _context2.next = 10;
                              break;
                            }

                            _context2.t0 = web3.utils;
                            _context2.next = 4;
                            return web3.eth.getBalance(account.publicKey);

                          case 4:
                            _context2.t1 = _context2.sent;
                            _context2.next = 7;
                            return _context2.t0.fromWei.call(_context2.t0, _context2.t1);

                          case 7:
                            balance = _context2.sent;
                            _context2.next = 24;
                            break;

                          case 10:
                            contract = new web3.eth.Contract(erc20abi, token.contract);
                            _context2.prev = 11;
                            _context2.t2 = _TokenService["default"];
                            _context2.next = 15;
                            return contract.methods.balanceOf(account.sendable()).call();

                          case 15:
                            _context2.t3 = _context2.sent;
                            _context2.t4 = token;
                            balance = _context2.t2.formatAmount.call(_context2.t2, _context2.t3, _context2.t4, true);
                            _context2.next = 24;
                            break;

                          case 20:
                            _context2.prev = 20;
                            _context2.t5 = _context2["catch"](11);
                            console.error("".concat(token.name, " is not an ERC20 token"), _context2.t5);
                            balance = _TokenService["default"].formatAmount('0', token, true);

                          case 24:
                            resolve();

                          case 25:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[11, 20]]);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }())]);

              case 5:
                if (killInstance) killCachedInstance(account.network());
                return _context3.abrupt("return", balance);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function balanceFor(_x2, _x3) {
        return _balanceFor.apply(this, arguments);
      }

      return balanceFor;
    }()
  }, {
    key: "balancesFor",
    value: function () {
      var _balancesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(account, tokens) {
        var _getCachedInstance3, _getCachedInstance4, web3, engine, balances, i, t;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _getCachedInstance3 = getCachedInstance(account.network()), _getCachedInstance4 = (0, _slicedToArray2["default"])(_getCachedInstance3, 2), web3 = _getCachedInstance4[0], engine = _getCachedInstance4[1];
                balances = [];
                i = 0;

              case 3:
                if (!(i < tokens.length)) {
                  _context4.next = 13;
                  break;
                }

                t = tokens[i].clone();
                _context4.next = 7;
                return this.balanceFor(account, tokens[i], web3);

              case 7:
                t.amount = _context4.sent;
                t.chainId = account.network().chainId;
                balances.push(t);

              case 10:
                i++;
                _context4.next = 3;
                break;

              case 13:
                killCachedInstance(account.network());
                return _context4.abrupt("return", balances);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function balancesFor(_x5, _x6) {
        return _balancesFor.apply(this, arguments);
      }

      return balancesFor;
    }()
  }, {
    key: "defaultDecimals",
    value: function defaultDecimals() {
      return 18;
    }
  }, {
    key: "defaultToken",
    value: function defaultToken() {
      return new _Token["default"](_Blockchains.Blockchains.ETH, 'eth', 'ETH', 'ETH', this.defaultDecimals(), '1');
    }
  }, {
    key: "actionParticipants",
    value: function actionParticipants(payload) {
      return _ObjectHelpers["default"].flatten(payload.messages.map(function (message) {
        return message.authorization;
      }));
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(_ref2) {
        var _this2 = this;

        var account, to, amount, token, _ref2$promptForSignat, promptForSignature, contract, symbol, isEth;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                account = _ref2.account, to = _ref2.to, amount = _ref2.amount, token = _ref2.token, _ref2$promptForSignat = _ref2.promptForSignature, promptForSignature = _ref2$promptForSignat === void 0 ? true : _ref2$promptForSignat;
                contract = token.contract, symbol = token.symbol;
                isEth = token.uniqueWithChain() === this.defaultToken().uniqueWithChain();
                return _context7.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee6(resolve, reject) {
                    var wallet, finished, _getCachedInstance5, _getCachedInstance6, web3, engine, value, _value, _contract;

                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            wallet = new ScatterEthereumWallet(account,
                            /*#__PURE__*/
                            function () {
                              var _ref4 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee5(transaction, callback) {
                                var payload, signatures;
                                return _regenerator["default"].wrap(function _callee5$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        payload = {
                                          transaction: transaction,
                                          blockchain: _Blockchains.Blockchains.TRX,
                                          network: account.network(),
                                          requiredFields: {},
                                          abi: isEth ? null : erc20abi
                                        };

                                        if (!promptForSignature) {
                                          _context5.next = 7;
                                          break;
                                        }

                                        _context5.next = 4;
                                        return _this2.signerWithPopup(payload, account, function (x) {
                                          return finished(x);
                                        }, token);

                                      case 4:
                                        _context5.t0 = _context5.sent;
                                        _context5.next = 10;
                                        break;

                                      case 7:
                                        _context5.next = 9;
                                        return _SigningService["default"].sign(account.network(), payload, account.publicKey, false, false);

                                      case 9:
                                        _context5.t0 = _context5.sent;

                                      case 10:
                                        signatures = _context5.t0;
                                        if (callback) callback(null, signatures);
                                        return _context5.abrupt("return", signatures);

                                      case 13:
                                      case "end":
                                        return _context5.stop();
                                    }
                                  }
                                }, _callee5);
                              }));

                              return function (_x10, _x11) {
                                return _ref4.apply(this, arguments);
                              };
                            }());

                            finished = function finished(x) {
                              killCachedInstance(account.network(), wallet);
                              resolve(x);
                            };

                            _getCachedInstance5 = getCachedInstance(account.network(), wallet), _getCachedInstance6 = (0, _slicedToArray2["default"])(_getCachedInstance5, 2), web3 = _getCachedInstance6[0], engine = _getCachedInstance6[1];

                            try {
                              if (isEth) {
                                value = web3util.utils.toWei(amount.toString());
                                web3.eth.sendTransaction({
                                  from: account.publicKey,
                                  to: to,
                                  value: value
                                }).on('transactionHash', function (transactionHash) {
                                  return finished({
                                    transactionHash: transactionHash
                                  });
                                }).on('error', function (error) {
                                  return finished({
                                    error: error
                                  });
                                });
                              } else {
                                _value = strtodec(amount.toString(), token.decimals);
                                _contract = new web3.eth.Contract(erc20abi, token.contract, {
                                  from: account.sendable()
                                });

                                _contract.methods.transfer(to, _value).send({
                                  gasLimit: 250000
                                }).on('transactionHash', function (transactionHash) {
                                  return finished({
                                    transactionHash: transactionHash
                                  });
                                }).on('error', function (error) {
                                  return finished({
                                    error: error
                                  });
                                });
                              }
                            } catch (e) {
                              finished({
                                error: e
                              });
                            }

                          case 4:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x8, _x9) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function transfer(_x7) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "signer",
    value: function () {
      var _signer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(transaction, publicKey) {
        var arbitrary,
            isHash,
            privateKey,
            tx,
            formattedKey,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                arbitrary = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : false;
                isHash = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : false;
                privateKey = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : null;

                if (privateKey) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 6;
                return _KeyPairService["default"].publicToPrivate(publicKey);

              case 6:
                privateKey = _context8.sent;

              case 7:
                if (privateKey) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return");

              case 9:
                tx = new EthTx(transaction);
                formattedKey = ethUtil.addHexPrefix(privateKey);
                tx.sign(ethUtil.toBuffer(formattedKey));
                return _context8.abrupt("return", ethUtil.addHexPrefix(tx.serialize().toString('hex')));

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function signer(_x12, _x13) {
        return _signer.apply(this, arguments);
      }

      return signer;
    }()
  }, {
    key: "signerWithPopup",
    value: function () {
      var _signerWithPopup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(payload, account, rejector) {
        var _this3 = this;

        var token,
            _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                token = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : null;
                return _context11.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee10(resolve) {
                    var request;
                    return _regenerator["default"].wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return _this3.requestParser(payload.transaction, payload.hasOwnProperty('abi') ? payload.abi : null, token);

                          case 2:
                            payload.messages = _context10.sent;
                            payload.identityKey = _StoreService["default"].get().state.scatter.keychain.identities[0].publicKey;
                            payload.participants = [account];
                            payload.network = account.network();
                            payload.origin = 'Scatter';
                            request = {
                              payload: payload,
                              origin: payload.origin,
                              blockchain: _Blockchains.Blockchains.ETH,
                              requiredFields: {},
                              type: Actions.SIGN,
                              id: 1
                            };

                            _EventService["default"].emit('popout', request).then(
                            /*#__PURE__*/
                            function () {
                              var _ref7 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee9(_ref6) {
                                var result, signature;
                                return _regenerator["default"].wrap(function _callee9$(_context9) {
                                  while (1) {
                                    switch (_context9.prev = _context9.next) {
                                      case 0:
                                        result = _ref6.result;

                                        if (!(!result || !result.accepted || false)) {
                                          _context9.next = 3;
                                          break;
                                        }

                                        return _context9.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 3:
                                        signature = null;

                                        if (!_KeyPairService["default"].isHardware(account.publicKey)) {
                                          _context9.next = 10;
                                          break;
                                        }

                                        _context9.next = 7;
                                        return _HardwareService["default"].sign(account, payload);

                                      case 7:
                                        signature = _context9.sent;
                                        _context9.next = 13;
                                        break;

                                      case 10:
                                        _context9.next = 12;
                                        return _SigningService["default"].sign(payload.network, payload.transaction, account.publicKey, true);

                                      case 12:
                                        signature = _context9.sent;

                                      case 13:
                                        if (signature) {
                                          _context9.next = 15;
                                          break;
                                        }

                                        return _context9.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 15:
                                        resolve(signature);

                                      case 16:
                                      case "end":
                                        return _context9.stop();
                                    }
                                  }
                                }, _callee9);
                              }));

                              return function (_x18) {
                                return _ref7.apply(this, arguments);
                              };
                            }(), true);

                          case 9:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x17) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function signerWithPopup(_x14, _x15, _x16) {
        return _signerWithPopup.apply(this, arguments);
      }

      return signerWithPopup;
    }()
  }, {
    key: "requestParser",
    value: function () {
      var _requestParser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(transaction, abi) {
        var token,
            params,
            methodABI,
            trimmedData,
            h2n,
            data,
            valueParam,
            objParam,
            _args12 = arguments;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                token = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : null;
                params = {};

                if (!abi) {
                  _context12.next = 10;
                  break;
                }

                methodABI = abi.find(function (method) {
                  return transaction.data.indexOf(method.signature) !== -1;
                });

                if (methodABI) {
                  _context12.next = 6;
                  break;
                }

                throw Error.signatureError('no_abi_method', "No method signature on the abi you provided matched the data for this transaction");

              case 6:
                trimmedData = transaction.data.replace(methodABI.signature, '');
                if (trimmedData.indexOf('0x') !== 0) trimmedData = '0x' + trimmedData;
                params = web3util.eth.abi.decodeParameters(methodABI.inputs, trimmedData); //.replace(methodABI.signature, '')

                params = Object.keys(params).reduce(function (acc, key) {
                  if (methodABI.inputs.map(function (input) {
                    return input.name;
                  }).includes(key)) acc[key] = params[key];
                  return acc;
                }, {});

              case 10:
                h2n = web3util.utils.hexToNumberString;
                data = Object.assign(params, {
                  // gas:h2n(transaction.gas),
                  gasLimit: h2n(transaction.gasLimit),
                  gasPrice: web3util.utils.fromWei(h2n(transaction.gasPrice))
                });
                valueParam = data.hasOwnProperty('value') ? 'value' : data.hasOwnProperty('_value') ? '_value' : null;

                if (valueParam) {
                  if (typeof data[valueParam] === "number" && data[valueParam] > 0) {
                    data[valueParam] = h2n(data[valueParam]);
                  }

                  if ((0, _typeof2["default"])(data[valueParam]) === "object") {
                    objParam = data[valueParam].hasOwnProperty('hex') ? 'hex' : data[valueParam].hasOwnProperty('_hex') ? '_hex' : null;
                    if (objParam) data[valueParam] = data[valueParam].toString();
                  }
                }

                if (transaction.hasOwnProperty('value') && transaction.value > 0) data.value = web3util.utils.fromWei(h2n(transaction.value)) + ' ETH';
                return _context12.abrupt("return", [{
                  data: data,
                  code: token ? token.name : transaction.to,
                  type: abi ? methodABI.name : 'transfer',
                  authorization: transaction.from
                }]);

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function requestParser(_x19, _x20) {
        return _requestParser.apply(this, arguments);
      }

      return requestParser;
    }()
  }]);
  return ETH;
}(_Plugin2["default"]);

exports["default"] = ETH;

var ScatterEthereumWallet = function ScatterEthereumWallet(account, signer) {
  (0, _classCallCheck2["default"])(this, ScatterEthereumWallet);
  this.signTransaction = signer;

  this.getAccounts = function (callback) {
    var accounts = [account.sendable()];
    if (callback) callback(null, accounts);
    return accounts;
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "eK4W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

    // global key for user preferred registration
var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
    // Prior registration (preferred or detected)
    registered = null

/**
 * Registers the given implementation.  An implementation must
 * be registered prior to any call to `require("any-promise")`,
 * typically on application load.
 *
 * If called with no arguments, will return registration in
 * following priority:
 *
 * For Node.js:
 *
 * 1. Previous registration
 * 2. global.Promise if node.js version >= 0.12
 * 3. Auto detected promise based on first sucessful require of
 *    known promise libraries. Note this is a last resort, as the
 *    loaded library is non-deterministic. node.js >= 0.12 will
 *    always use global.Promise over this priority list.
 * 4. Throws error.
 *
 * For Browser:
 *
 * 1. Previous registration
 * 2. window.Promise
 * 3. Throws error.
 *
 * Options:
 *
 * Promise: Desired Promise constructor
 * global: Boolean - Should the registration be cached in a global variable to
 * allow cross dependency/bundle registration?  (default true)
 */
module.exports = function(root, loadImplementation){
  return function register(implementation, opts){
    implementation = implementation || null
    opts = opts || {}
    // global registration unless explicitly  {global: false} in options (default true)
    var registerGlobal = opts.global !== false;

    // load any previous global registration
    if(registered === null && registerGlobal){
      registered = root[REGISTRATION_KEY] || null
    }

    if(registered !== null
        && implementation !== null
        && registered.implementation !== implementation){
      // Throw error if attempting to redefine implementation
      throw new Error('any-promise already defined as "'+registered.implementation+
        '".  You can only register an implementation before the first '+
        ' call to require("any-promise") and an implementation cannot be changed')
    }

    if(registered === null){
      // use provided implementation
      if(implementation !== null && typeof opts.Promise !== 'undefined'){
        registered = {
          Promise: opts.Promise,
          implementation: implementation
        }
      } else {
        // require implementation if implementation is specified but not provided
        registered = loadImplementation(implementation)
      }

      if(registerGlobal){
        // register preference globally in case multiple installations
        root[REGISTRATION_KEY] = registered
      }
    }

    return registered
  }
}


/***/ }),

/***/ "m6mq":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("L8hn")().Promise


/***/ }),

/***/ "tz1k":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _Plugin2 = _interopRequireDefault(__webpack_require__("MIez"));

var PluginTypes = _interopRequireWildcard(__webpack_require__("ROq3"));

var Actions = _interopRequireWildcard(__webpack_require__("+nw1"));

var _Blockchains = __webpack_require__("F+MN");

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _TokenService = _interopRequireDefault(__webpack_require__("ONSl"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var _tronweb = _interopRequireDefault(__webpack_require__("0BtN"));

var ethUtil = __webpack_require__("OsH3");

var toBuffer = function toBuffer(key) {
  return ethUtil.toBuffer(ethUtil.addHexPrefix(key));
};

var utils; // const utils = tronWeb.utils;

var cachedInstances = {};

var getCachedInstance = function getCachedInstance(network) {
  if (cachedInstances.hasOwnProperty(network.unique())) return cachedInstances[network.unique()];else {
    var provider = new _tronweb["default"].providers.HttpProvider(network.fullhost());
    var tronWeb = new _tronweb["default"](provider, provider, network.fullhost());
    cachedInstances[network.unique()] = tronWeb;
    return tronWeb;
  }
};

var EXPLORER = {
  "name": "Tronscan",
  "account": "https://tronscan.org/#/address/{x}",
  "transaction": "https://tronscan.org/#/transaction/{x}",
  "block": "https://tronscan.org/#/block/{x}"
};

var TRX =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2["default"])(TRX, _Plugin);

  function TRX() {
    (0, _classCallCheck2["default"])(this, TRX);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TRX).call(this, _Blockchains.Blockchains.TRX, PluginTypes.BLOCKCHAIN_SUPPORT));
  }

  (0, _createClass2["default"])(TRX, [{
    key: "init",
    value: function init() {
      var DUMMY_NET = 'https://api.shasta.trongrid.io';
      var provider = new _tronweb["default"].providers.HttpProvider(DUMMY_NET);
      var tronWeb = new _tronweb["default"](provider, provider, DUMMY_NET);
      utils = tronWeb.utils;
    }
  }, {
    key: "bip",
    value: function bip() {
      return "44'/195'/0'/0/";
    }
  }, {
    key: "bustCache",
    value: function bustCache() {
      cachedInstances = {};
    }
  }, {
    key: "defaultExplorer",
    value: function defaultExplorer() {
      return EXPLORER;
    }
  }, {
    key: "accountFormatter",
    value: function accountFormatter(account) {
      return "".concat(account.publicKey);
    }
  }, {
    key: "returnableAccount",
    value: function returnableAccount(account) {
      return {
        address: account.publicKey,
        blockchain: _Blockchains.Blockchains.TRX
      };
    }
  }, {
    key: "contractPlaceholder",
    value: function contractPlaceholder() {
      return '0x.....';
    }
  }, {
    key: "checkNetwork",
    value: function checkNetwork(network) {
      return Promise.race([new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(null);
        }, 2000);
      }), //TODO:
      new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(true);
        }, 10);
      })]);
    }
  }, {
    key: "getEndorsedNetwork",
    value: function getEndorsedNetwork() {
      return new _Network["default"]('Tron Mainnet', 'https', 'api.trongrid.io', 443, _Blockchains.Blockchains.TRX, '1');
    }
  }, {
    key: "isEndorsedNetwork",
    value: function isEndorsedNetwork(network) {
      var endorsedNetwork = this.getEndorsedNetwork();
      return network.blockchain === _Blockchains.Blockchains.TRX && network.chainId === endorsedNetwork.chainId;
    }
  }, {
    key: "getChainId",
    value: function () {
      var _getChainId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(network) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getChainId(_x) {
        return _getChainId.apply(this, arguments);
      }

      return getChainId;
    }()
  }, {
    key: "usesResources",
    value: function usesResources() {
      return false;
    }
  }, {
    key: "hasAccountActions",
    value: function hasAccountActions() {
      return false;
    }
  }, {
    key: "accountsAreImported",
    value: function accountsAreImported() {
      return false;
    }
  }, {
    key: "isValidRecipient",
    value: function isValidRecipient(address) {
      return utils.crypto.isAddressValid(address);
    }
  }, {
    key: "privateToPublic",
    value: function privateToPublic(privateKey) {
      if (typeof privateKey === 'string') privateKey = this.hexPrivateToBuffer(privateKey);
      return utils.crypto.getBase58CheckAddress(utils.crypto.getAddressFromPriKey(privateKey));
    }
  }, {
    key: "validPrivateKey",
    value: function validPrivateKey(privateKey) {
      return privateKey.length === 64 && ethUtil.isValidPrivate(toBuffer(privateKey));
    }
  }, {
    key: "validPublicKey",
    value: function validPublicKey(address) {
      return utils.crypto.isAddressValid(address);
    }
  }, {
    key: "bufferToHexPrivate",
    value: function bufferToHexPrivate(buffer) {
      return new Buffer(buffer).toString('hex');
    }
  }, {
    key: "hexPrivateToBuffer",
    value: function hexPrivateToBuffer(privateKey) {
      return Buffer.from(privateKey, 'hex');
    }
  }, {
    key: "hasUntouchableTokens",
    value: function hasUntouchableTokens() {
      return false;
    }
  }, {
    key: "balanceFor",
    value: function () {
      var _balanceFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(account, token) {
        var tron, clone, bal;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tron = getCachedInstance(account.network());
                clone = token.clone();

                if (!(token.uniqueWithChain() === this.defaultToken().uniqueWithChain())) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return tron.trx.getBalance(account.publicKey);

              case 5:
                bal = _context2.sent;
                clone.amount = tron.toBigNumber(bal).div(1000000).toFixed(6).toString(10);

              case 7:
                return _context2.abrupt("return", clone);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function balanceFor(_x2, _x3) {
        return _balanceFor.apply(this, arguments);
      }

      return balanceFor;
    }()
  }, {
    key: "balancesFor",
    value: function () {
      var _balancesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(account, tokens) {
        var _this = this;

        var tron, formatBalance, trx, _ref, asset, balance, altTokens;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                tron = getCachedInstance(account.network());

                formatBalance = function formatBalance(n) {
                  return tron.toBigNumber(n).div(1000000).toFixed(6).toString(10);
                };

                trx = this.defaultToken();
                _context3.next = 5;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve({
                      asset: [],
                      balance: 0
                    });
                  }, 2000);
                }), tron.trx.getAccount(account.sendable())["catch"](function () {
                  return {
                    asset: [],
                    balance: 0
                  };
                })]);

              case 5:
                _ref = _context3.sent;
                asset = _ref.asset;
                balance = _ref.balance;
                trx.amount = formatBalance(balance);

                if (asset) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", [trx]);

              case 11:
                altTokens = asset.map(function (_ref2) {
                  var symbol = _ref2.key,
                      value = _ref2.value;
                  return _Token["default"].fromJson({
                    blockchain: _Blockchains.Blockchains.TRX,
                    contract: '',
                    symbol: symbol,
                    name: symbol,
                    decimals: _this.defaultDecimals(),
                    amount: formatBalance(value),
                    chainId: account.network().chainId
                  });
                });
                return _context3.abrupt("return", [trx].concat(altTokens));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function balancesFor(_x4, _x5) {
        return _balancesFor.apply(this, arguments);
      }

      return balancesFor;
    }()
  }, {
    key: "defaultDecimals",
    value: function defaultDecimals() {
      return 6;
    }
  }, {
    key: "defaultToken",
    value: function defaultToken() {
      return new _Token["default"](_Blockchains.Blockchains.TRX, 'trx', 'TRX', 'TRX', this.defaultDecimals(), '1');
    }
  }, {
    key: "actionParticipants",
    value: function actionParticipants(payload) {
      return payload.transaction.participants;
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(_ref3) {
        var _this2 = this;

        var account, to, amount, token, _ref3$promptForSignat, promptForSignature, symbol;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                account = _ref3.account, to = _ref3.to, amount = _ref3.amount, token = _ref3.token, _ref3$promptForSignat = _ref3.promptForSignature, promptForSignature = _ref3$promptForSignat === void 0 ? true : _ref3$promptForSignat;
                amount = _TokenService["default"].formatAmount(amount, token);
                symbol = token.symbol;
                return _context6.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee5(resolve, reject) {
                    var tron, unsignedTransaction, signed, sent;
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            tron = getCachedInstance(account.network());

                            tron.trx.sign =
                            /*#__PURE__*/
                            function () {
                              var _ref5 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee4(signargs) {
                                var transaction, payload;
                                return _regenerator["default"].wrap(function _callee4$(_context4) {
                                  while (1) {
                                    switch (_context4.prev = _context4.next) {
                                      case 0:
                                        transaction = {
                                          transaction: signargs,
                                          participants: [account.publicKey]
                                        };
                                        payload = {
                                          transaction: transaction,
                                          blockchain: _Blockchains.Blockchains.TRX,
                                          network: account.network(),
                                          requiredFields: {}
                                        };

                                        if (!promptForSignature) {
                                          _context4.next = 8;
                                          break;
                                        }

                                        _context4.next = 5;
                                        return _this2.signerWithPopup(payload, account, reject);

                                      case 5:
                                        _context4.t0 = _context4.sent;
                                        _context4.next = 11;
                                        break;

                                      case 8:
                                        _context4.next = 10;
                                        return _SigningService["default"].sign(account.network(), payload, account.publicKey, false, false);

                                      case 10:
                                        _context4.t0 = _context4.sent;

                                      case 11:
                                        return _context4.abrupt("return", _context4.t0);

                                      case 12:
                                      case "end":
                                        return _context4.stop();
                                    }
                                  }
                                }, _callee4);
                              }));

                              return function (_x9) {
                                return _ref5.apply(this, arguments);
                              };
                            }();

                            if (!(token.unique() === _this2.defaultToken().unique())) {
                              _context5.next = 8;
                              break;
                            }

                            _context5.next = 5;
                            return tron.transactionBuilder.sendTrx(to, amount, account.publicKey);

                          case 5:
                            unsignedTransaction = _context5.sent;
                            _context5.next = 12;
                            break;

                          case 8:
                            tron.setAddress(account.sendable());
                            _context5.next = 11;
                            return tron.transactionBuilder.sendToken(to, amount, symbol);

                          case 11:
                            unsignedTransaction = _context5.sent;

                          case 12:
                            _context5.next = 14;
                            return tron.trx.sign(unsignedTransaction).then(function (x) {
                              return {
                                success: true,
                                result: x
                              };
                            })["catch"](function (error) {
                              return {
                                success: false,
                                result: error
                              };
                            });

                          case 14:
                            signed = _context5.sent;

                            if (signed.success) {
                              _context5.next = 19;
                              break;
                            }

                            return _context5.abrupt("return", resolve({
                              error: signed.result
                            }));

                          case 19:
                            _context5.next = 21;
                            return tron.trx.sendRawTransaction(signed.result).then(function (x) {
                              return x.result;
                            });

                          case 21:
                            sent = _context5.sent;
                            resolve(sent ? signed.result : {
                              error: 'Failed to send.'
                            });

                          case 23:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x7, _x8) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function transfer(_x6) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "signer",
    value: function () {
      var _signer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(payload, publicKey) {
        var arbitrary,
            isHash,
            privateKey,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                arbitrary = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : false;
                isHash = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : false;
                privateKey = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : null;

                if (privateKey) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 6;
                return _KeyPairService["default"].publicToPrivate(publicKey);

              case 6:
                privateKey = _context7.sent;

              case 7:
                if (privateKey) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return");

              case 9:
                if (typeof privateKey !== 'string') privateKey = this.bufferToHexPrivate(privateKey);
                return _context7.abrupt("return", utils.crypto.signTransaction(privateKey, payload.transaction.transaction));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function signer(_x10, _x11) {
        return _signer.apply(this, arguments);
      }

      return signer;
    }()
  }, {
    key: "signerWithPopup",
    value: function () {
      var _signerWithPopup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(payload, account, rejector) {
        var _this3 = this;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref6 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee9(resolve) {
                    var request;
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.next = 2;
                            return _this3.requestParser(payload);

                          case 2:
                            payload.messages = _context9.sent;
                            payload.identityKey = _StoreService["default"].get().state.scatter.keychain.identities[0].publicKey;
                            payload.participants = [account];
                            payload.network = account.network();
                            payload.origin = 'Scatter';
                            request = {
                              payload: payload,
                              origin: payload.origin,
                              blockchain: _Blockchains.Blockchains.TRX,
                              requiredFields: {},
                              type: Actions.SIGN,
                              id: 1
                            };

                            _EventService["default"].emit('popout', request).then(
                            /*#__PURE__*/
                            function () {
                              var _ref8 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee8(_ref7) {
                                var result, signature;
                                return _regenerator["default"].wrap(function _callee8$(_context8) {
                                  while (1) {
                                    switch (_context8.prev = _context8.next) {
                                      case 0:
                                        result = _ref7.result;

                                        if (!(!result || !result.accepted || false)) {
                                          _context8.next = 3;
                                          break;
                                        }

                                        return _context8.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 3:
                                        signature = null;

                                        if (!_KeyPairService["default"].isHardware(account.publicKey)) {
                                          _context8.next = 10;
                                          break;
                                        }

                                        _context8.next = 7;
                                        return _HardwareService["default"].sign(account, payload);

                                      case 7:
                                        signature = _context8.sent;
                                        _context8.next = 13;
                                        break;

                                      case 10:
                                        _context8.next = 12;
                                        return _SigningService["default"].sign(payload.network, payload, account.publicKey);

                                      case 12:
                                        signature = _context8.sent;

                                      case 13:
                                        if (signature) {
                                          _context8.next = 15;
                                          break;
                                        }

                                        return _context8.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 15:
                                        resolve(signature);

                                      case 16:
                                      case "end":
                                        return _context8.stop();
                                    }
                                  }
                                }, _callee8);
                              }));

                              return function (_x16) {
                                return _ref8.apply(this, arguments);
                              };
                            }(), true);

                          case 9:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x15) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function signerWithPopup(_x12, _x13, _x14) {
        return _signerWithPopup.apply(this, arguments);
      }

      return signerWithPopup;
    }()
  }, {
    key: "requestParser",
    value: function () {
      var _requestParser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(transaction, abiData) {
        var network, txID, tron;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                network = _Network["default"].fromJson(transaction.network);
                txID = transaction.transaction.transaction.txID;
                transaction = transaction.transaction.transaction.raw_data;
                tron = getCachedInstance(network);
                return _context11.abrupt("return", transaction.contract.map(function (contract) {
                  var data = contract.parameter.value;
                  var address = data.hasOwnProperty('contract_address') ? data.contract_address : 'system';
                  var quantity = data.hasOwnProperty('call_value') ? {
                    paying: tron.fromSun(data.call_value) + ' TRX'
                  } : {};
                  var params = {};
                  var methodABI;

                  if (abiData) {
                    var abi = abiData.abi,
                        _address = abiData.address,
                        method = abiData.method;
                    methodABI = abi.find(function (x) {
                      return x.name === method;
                    });
                    if (!methodABI) throw Error.signatureError('no_abi_method', "No method signature on the abi you provided matched the data for this transaction");
                    var names = methodABI.inputs.map(function (x) {
                      return x.name;
                    });
                    var types = methodABI.inputs.map(function (x) {
                      return x.type;
                    });
                    data = tron.utils.abi.decodeParams(names, types, data.data, true);
                    data = Object.assign(data, quantity);
                    Object.keys(data).map(function (key) {
                      if (tron.utils.isBigNumber(data[key])) data[key] = data[key].toString();
                    });
                  }

                  return {
                    data: data,
                    code: address,
                    type: methodABI ? methodABI.name : 'transfer'
                  };
                }));

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function requestParser(_x17, _x18) {
        return _requestParser.apply(this, arguments);
      }

      return requestParser;
    }()
  }]);
  return TRX;
}(_Plugin2["default"]);

exports["default"] = TRX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "y3zn":
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWVzLW9vcC9kaXN0L0FFUy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZXRoZXJldW0vbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtdHgvZGlzdC9mYWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9ldGhlcmV1bS9ub2RlX21vZHVsZXMvZXRoZXJldW1qcy10eC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnktcHJvbWlzZS9yZWdpc3Rlci1zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay90cm9uL25vZGVfbW9kdWxlcy9ldGhlcmV1bWpzLXV0aWwvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZXRoZXJldW0vbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtdHgvZGlzdC90cmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZXRoZXJldW0vZXRoZXJldW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FueS1wcm9taXNlL2xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW55LXByb21pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL3Ryb24vdHJvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZXRoZXJldW0vbm9kZV9tb2R1bGVzL2V0aGVyZXVtanMtdXRpbC9kaXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLGFBQWEsbUJBQU8sQ0FBQyxNQUFNO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFl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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixHQUFHO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MseUJBQXlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7O0FDcmxCYTtBQUNiO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsd0JBQXdCLG1CQUFPLENBQUMsTUFBaUI7QUFDakQsMEJBQTBCLG1CQUFPLENBQUMsTUFBbUI7QUFDckQsZUFBZSxtQkFBTyxDQUFDLE1BQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVc7QUFDekMsOEJBQThCLFdBQVc7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseUJBQXlCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQywrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQseUI7Ozs7Ozs7OztBQ3J5QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxTQUFTLG1CQUFPLENBQUMsTUFBTztBQUN4QjtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFLO0FBQ3ZCO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsTUFBUTtBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLE1BQVE7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsTUFBYTtBQUN0QyxhQUFhLG1CQUFPLENBQUMsTUFBYTtBQUNsQyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGVBQWU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDIiwiZmlsZSI6InZlbmRvcn4yNTNhZTIxMC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuY29uc3Qgc2pjbCA9IHJlcXVpcmUoJ3NqY2wnKTtcclxuY2xhc3MgQUVTIHtcclxuICAgIHN0YXRpYyBlbmNyeXB0KGRhdGEsIGtleSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICBjb25zdCB7IGl2LCBzYWx0LCBjdCB9ID0gSlNPTi5wYXJzZShzamNsLmVuY3J5cHQoa2V5LCBkYXRhLCB7IG1vZGU6ICdnY20nIH0pKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBpdiwgc2FsdCwgY3QgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVjcnlwdChlbmNyeXB0ZWREYXRhLCBrZXkpIHtcclxuICAgICAgICBlbmNyeXB0ZWREYXRhID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihKU09OLnBhcnNlKGVuY3J5cHRlZERhdGEpLCB7IG1vZGU6ICdnY20nIH0pKTtcclxuICAgICAgICBsZXQgY2xlYXIgPSBzamNsLmRlY3J5cHQoa2V5LCBlbmNyeXB0ZWREYXRhKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjbGVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGVhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5BRVMgPSBBRVM7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQUVTO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BRVMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBldGhlcmV1bWpzX3V0aWxfMSA9IHJlcXVpcmUoXCJldGhlcmV1bWpzLXV0aWxcIik7XG52YXIgYnVmZmVyXzEgPSByZXF1aXJlKFwiYnVmZmVyXCIpO1xudmFyIHRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKFwiLi90cmFuc2FjdGlvblwiKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0cmFuc2FjdGlvbiBvYmplY3QgdGhhdCBkb2Vzbid0IG5lZWQgdG8gYmUgc2lnbmVkLlxuICpcbiAqIEBwYXJhbSBkYXRhIC0gQSB0cmFuc2FjdGlvbiBjYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCBpdHMgcmxwIHJlcHJlc2VudGF0aW9uLCBhbiBhcnJheSBjb250YWluaW5nXG4gKiB0aGUgdmFsdWUgb2YgaXRzIGZpZWxkcyBpbiBvcmRlciwgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlbSBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSBvcHRzIC0gVGhlIHRyYW5zYWN0aW9uJ3Mgb3B0aW9ucywgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY2hhaW4gYW5kIGhhcmRmb3JrIHRoZVxuICogdHJhbnNhY3Rpb25zIGJlbG9uZ3MgdG8uXG4gKlxuICogQHNlZSBUcmFuc2FjdGlvblxuICovXG52YXIgRmFrZVRyYW5zYWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGYWtlVHJhbnNhY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRmFrZVRyYW5zYWN0aW9uKGRhdGEsIG9wdHMpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0ge307IH1cbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGF0YSwgb3B0cykgfHwgdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF90aGlzLCAnZnJvbScsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmdldFNlbmRlckFkZHJlc3MoKTsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zyb20gPSBldGhlcmV1bWpzX3V0aWxfMS50b0J1ZmZlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdHhEYXRhID0gZGF0YTtcbiAgICAgICAgaWYgKHR4RGF0YS5mcm9tKSB7XG4gICAgICAgICAgICBfdGhpcy5mcm9tID0gZXRoZXJldW1qc191dGlsXzEudG9CdWZmZXIodHhEYXRhLmZyb20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgYSBzaGEzLTI1NiBoYXNoIG9mIHRoZSBzZXJpYWxpemVkIHR4LCB1c2luZyB0aGUgc2VuZGVyIGFkZHJlc3MgdG8gZ2VuZXJhdGUgYSBmYWtlXG4gICAgICogc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluY2x1ZGVTaWduYXR1cmUgLSBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBzaWduYXR1cmVcbiAgICAgKi9cbiAgICBGYWtlVHJhbnNhY3Rpb24ucHJvdG90eXBlLmhhc2ggPSBmdW5jdGlvbiAoaW5jbHVkZVNpZ25hdHVyZSkge1xuICAgICAgICBpZiAoaW5jbHVkZVNpZ25hdHVyZSA9PT0gdm9pZCAwKSB7IGluY2x1ZGVTaWduYXR1cmUgPSB0cnVlOyB9XG4gICAgICAgIGlmIChpbmNsdWRlU2lnbmF0dXJlICYmIHRoaXMuX2Zyb20gJiYgdGhpcy5fZnJvbS50b1N0cmluZygnaGV4JykgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBpbmNsdWRlIGEgZmFrZSBzaWduYXR1cmUgdXNpbmcgdGhlIGZyb20gYWRkcmVzcyBhcyBhIHByaXZhdGUga2V5XG4gICAgICAgICAgICB2YXIgZmFrZUtleSA9IGJ1ZmZlcl8xLkJ1ZmZlci5jb25jYXQoW3RoaXMuX2Zyb20sIHRoaXMuX2Zyb20uc2xpY2UoMCwgMTIpXSk7XG4gICAgICAgICAgICB0aGlzLnNpZ24oZmFrZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaGFzaC5jYWxsKHRoaXMsIGluY2x1ZGVTaWduYXR1cmUpO1xuICAgIH07XG4gICAgcmV0dXJuIEZha2VUcmFuc2FjdGlvbjtcbn0odHJhbnNhY3Rpb25fMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGYWtlVHJhbnNhY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKFwiLi90cmFuc2FjdGlvblwiKTtcbmV4cG9ydHMuVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbl8xLmRlZmF1bHQ7XG52YXIgZmFrZV8xID0gcmVxdWlyZShcIi4vZmFrZVwiKTtcbmV4cG9ydHMuRmFrZVRyYW5zYWN0aW9uID0gZmFrZV8xLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2FkZXInKSh3aW5kb3csIGxvYWRJbXBsZW1lbnRhdGlvbilcblxuLyoqXG4gKiBCcm93c2VyIHNwZWNpZmljIGxvYWRJbXBsZW1lbnRhdGlvbi4gIEFsd2F5cyB1c2VzIGB3aW5kb3cuUHJvbWlzZWBcbiAqXG4gKiBUbyByZWdpc3RlciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiwgbXVzdCByZWdpc3RlciB3aXRoIGBQcm9taXNlYCBvcHRpb24uXG4gKi9cbmZ1bmN0aW9uIGxvYWRJbXBsZW1lbnRhdGlvbigpe1xuICBpZih0eXBlb2Ygd2luZG93LlByb21pc2UgPT09ICd1bmRlZmluZWQnKXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnktcHJvbWlzZSBicm93c2VyIHJlcXVpcmVzIGEgcG9seWZpbGwgb3IgZXhwbGljaXQgcmVnaXN0cmF0aW9uXCIrXG4gICAgICBcIiBlLmc6IHJlcXVpcmUoJ2FueS1wcm9taXNlL3JlZ2lzdGVyL2JsdWViaXJkJylcIilcbiAgfVxuICByZXR1cm4ge1xuICAgIFByb21pc2U6IHdpbmRvdy5Qcm9taXNlLFxuICAgIGltcGxlbWVudGF0aW9uOiAnd2luZG93LlByb21pc2UnXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJOID0gcmVxdWlyZShcImJuLmpzXCIpO1xuZXhwb3J0cy5CTiA9IEJOO1xudmFyIHJscCA9IHJlcXVpcmUoXCJybHBcIik7XG5leHBvcnRzLnJscCA9IHJscDtcbnZhciBjcmVhdGVLZWNjYWtIYXNoID0gcmVxdWlyZSgna2VjY2FrJyk7XG52YXIgc2VjcDI1NmsxID0gcmVxdWlyZSgnc2VjcDI1NmsxJyk7XG5leHBvcnRzLnNlY3AyNTZrMSA9IHNlY3AyNTZrMTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciBjcmVhdGVIYXNoID0gcmVxdWlyZSgnY3JlYXRlLWhhc2gnKTtcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBldGhqc1V0aWwgPSByZXF1aXJlKCdldGhqcy11dGlsJyk7XG5PYmplY3QuYXNzaWduKGV4cG9ydHMsIGV0aGpzVXRpbCk7XG4vKipcbiAqIFRoZSBtYXggaW50ZWdlciB0aGF0IHRoaXMgVk0gY2FuIGhhbmRsZVxuICovXG5leHBvcnRzLk1BWF9JTlRFR0VSID0gbmV3IEJOKCdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmJywgMTYpO1xuLyoqXG4gKiAyXjI1NlxuICovXG5leHBvcnRzLlRXT19QT1cyNTYgPSBuZXcgQk4oJzEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJywgMTYpO1xuLyoqXG4gKiBLZWNjYWstMjU2IGhhc2ggb2YgbnVsbFxuICovXG5leHBvcnRzLktFQ0NBSzI1Nl9OVUxMX1MgPSAnYzVkMjQ2MDE4NmY3MjMzYzkyN2U3ZGIyZGNjNzAzYzBlNTAwYjY1M2NhODIyNzNiN2JmYWQ4MDQ1ZDg1YTQ3MCc7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiBudWxsXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X05VTEwgPSBCdWZmZXIuZnJvbShleHBvcnRzLktFQ0NBSzI1Nl9OVUxMX1MsICdoZXgnKTtcbi8qKlxuICogS2VjY2FrLTI1NiBvZiBhbiBSTFAgb2YgYW4gZW1wdHkgYXJyYXlcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQX0FSUkFZX1MgPSAnMWRjYzRkZThkZWM3NWQ3YWFiODViNTY3YjZjY2Q0MWFkMzEyNDUxYjk0OGE3NDEzZjBhMTQyZmQ0MGQ0OTM0Nyc7XG4vKipcbiAqIEtlY2Nhay0yNTYgb2YgYW4gUkxQIG9mIGFuIGVtcHR5IGFycmF5XG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWSA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWV9TLCAnaGV4Jyk7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgUkxQIG9mIG51bGxcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1MgPSAnNTZlODFmMTcxYmNjNTVhNmZmODM0NWU2OTJjMGY4NmU1YjQ4ZTAxYjk5NmNhZGMwMDE2MjJmYjVlMzYzYjQyMSc7XG4vKipcbiAqIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgUkxQIG9mIG51bGxcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfUkxQID0gQnVmZmVyLmZyb20oZXhwb3J0cy5LRUNDQUsyNTZfUkxQX1MsICdoZXgnKTtcbi8qKlxuICogUmV0dXJucyBhIGJ1ZmZlciBmaWxsZWQgd2l0aCAwcy5cbiAqIEBwYXJhbSBieXRlcyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBidWZmZXIgc2hvdWxkIGJlXG4gKi9cbmV4cG9ydHMuemVyb3MgPSBmdW5jdGlvbiAoYnl0ZXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jVW5zYWZlKGJ5dGVzKS5maWxsKDApO1xufTtcbi8qKlxuICogUmV0dXJucyBhIHplcm8gYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy56ZXJvQWRkcmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRkcmVzc0xlbmd0aCA9IDIwO1xuICAgIHZhciBhZGRyID0gZXhwb3J0cy56ZXJvcyhhZGRyZXNzTGVuZ3RoKTtcbiAgICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleChhZGRyKTtcbn07XG4vKipcbiAqIExlZnQgUGFkcyBhbiBgQXJyYXlgIG9yIGBCdWZmZXJgIHdpdGggbGVhZGluZyB6ZXJvcyB0aWxsIGl0IGhhcyBgbGVuZ3RoYCBieXRlcy5cbiAqIE9yIGl0IHRydW5jYXRlcyB0aGUgYmVnaW5uaW5nIGlmIGl0IGV4Y2VlZHMuXG4gKiBAcGFyYW0gbXNnIHRoZSB2YWx1ZSB0byBwYWQgKEJ1ZmZlcnxBcnJheSlcbiAqIEBwYXJhbSBsZW5ndGggdGhlIG51bWJlciBvZiBieXRlcyB0aGUgb3V0cHV0IHNob3VsZCBiZVxuICogQHBhcmFtIHJpZ2h0IHdoZXRoZXIgdG8gc3RhcnQgcGFkZGluZyBmb3JtIHRoZSBsZWZ0IG9yIHJpZ2h0XG4gKiBAcmV0dXJuIChCdWZmZXJ8QXJyYXkpXG4gKi9cbmV4cG9ydHMuc2V0TGVuZ3RoTGVmdCA9IGZ1bmN0aW9uIChtc2csIGxlbmd0aCwgcmlnaHQpIHtcbiAgICBpZiAocmlnaHQgPT09IHZvaWQgMCkgeyByaWdodCA9IGZhbHNlOyB9XG4gICAgdmFyIGJ1ZiA9IGV4cG9ydHMuemVyb3MobGVuZ3RoKTtcbiAgICBtc2cgPSBleHBvcnRzLnRvQnVmZmVyKG1zZyk7XG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICAgIGlmIChtc2cubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBtc2cuY29weShidWYpO1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNnLnNsaWNlKDAsIGxlbmd0aCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAobXNnLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgbXNnLmNvcHkoYnVmLCBsZW5ndGggLSBtc2cubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZy5zbGljZSgtbGVuZ3RoKTtcbiAgICB9XG59O1xuZXhwb3J0cy5zZXRMZW5ndGggPSBleHBvcnRzLnNldExlbmd0aExlZnQ7XG4vKipcbiAqIFJpZ2h0IFBhZHMgYW4gYEFycmF5YCBvciBgQnVmZmVyYCB3aXRoIGxlYWRpbmcgemVyb3MgdGlsbCBpdCBoYXMgYGxlbmd0aGAgYnl0ZXMuXG4gKiBPciBpdCB0cnVuY2F0ZXMgdGhlIGJlZ2lubmluZyBpZiBpdCBleGNlZWRzLlxuICogQHBhcmFtIG1zZyB0aGUgdmFsdWUgdG8gcGFkIChCdWZmZXJ8QXJyYXkpXG4gKiBAcGFyYW0gbGVuZ3RoIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIG91dHB1dCBzaG91bGQgYmVcbiAqIEByZXR1cm4gKEJ1ZmZlcnxBcnJheSlcbiAqL1xuZXhwb3J0cy5zZXRMZW5ndGhSaWdodCA9IGZ1bmN0aW9uIChtc2csIGxlbmd0aCkge1xuICAgIHJldHVybiBleHBvcnRzLnNldExlbmd0aChtc2csIGxlbmd0aCwgdHJ1ZSk7XG59O1xuLyoqXG4gKiBUcmltcyBsZWFkaW5nIHplcm9zIGZyb20gYSBgQnVmZmVyYCBvciBhbiBgQXJyYXlgLlxuICogQHBhcmFtIGEgKEJ1ZmZlcnxBcnJheXxTdHJpbmcpXG4gKiBAcmV0dXJuIChCdWZmZXJ8QXJyYXl8U3RyaW5nKVxuICovXG5leHBvcnRzLnVucGFkID0gZnVuY3Rpb24gKGEpIHtcbiAgICBhID0gZXRoanNVdGlsLnN0cmlwSGV4UHJlZml4KGEpO1xuICAgIHZhciBmaXJzdCA9IGFbMF07XG4gICAgd2hpbGUgKGEubGVuZ3RoID4gMCAmJiBmaXJzdC50b1N0cmluZygpID09PSAnMCcpIHtcbiAgICAgICAgYSA9IGEuc2xpY2UoMSk7XG4gICAgICAgIGZpcnN0ID0gYVswXTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xuZXhwb3J0cy5zdHJpcFplcm9zID0gZXhwb3J0cy51bnBhZDtcbi8qKlxuICogQXR0ZW1wdHMgdG8gdHVybiBhIHZhbHVlIGludG8gYSBgQnVmZmVyYC4gQXMgaW5wdXQgaXQgc3VwcG9ydHMgYEJ1ZmZlcmAsIGBTdHJpbmdgLCBgTnVtYmVyYCwgbnVsbC91bmRlZmluZWQsIGBCTmAgYW5kIG90aGVyIG9iamVjdHMgd2l0aCBhIGB0b0FycmF5KClgIG1ldGhvZC5cbiAqIEBwYXJhbSB2IHRoZSB2YWx1ZVxuICovXG5leHBvcnRzLnRvQnVmZmVyID0gZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih2KSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgdiA9IEJ1ZmZlci5mcm9tKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaXNIZXhTdHJpbmcodikpIHtcbiAgICAgICAgICAgICAgICB2ID0gQnVmZmVyLmZyb20oZXhwb3J0cy5wYWRUb0V2ZW4oZXhwb3J0cy5zdHJpcEhleFByZWZpeCh2KSksICdoZXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHYgPSBCdWZmZXIuZnJvbSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHYgPSBleHBvcnRzLmludFRvQnVmZmVyKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHYgPT09IG51bGwgfHwgdiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2ID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEJOLmlzQk4odikpIHtcbiAgICAgICAgICAgIHYgPSB2LnRvQXJyYXlMaWtlKEJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodi50b0FycmF5KSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0cyBhIEJOIHRvIGEgQnVmZmVyXG4gICAgICAgICAgICB2ID0gQnVmZmVyLmZyb20odi50b0FycmF5KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHR5cGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgYEJ1ZmZlcmAgdG8gYSBgTnVtYmVyYC5cbiAqIEBwYXJhbSBidWYgYEJ1ZmZlcmAgb2JqZWN0IHRvIGNvbnZlcnRcbiAqIEB0aHJvd3MgSWYgdGhlIGlucHV0IG51bWJlciBleGNlZWRzIDUzIGJpdHMuXG4gKi9cbmV4cG9ydHMuYnVmZmVyVG9JbnQgPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgcmV0dXJuIG5ldyBCTihleHBvcnRzLnRvQnVmZmVyKGJ1ZikpLnRvTnVtYmVyKCk7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIGludG8gYSBoZXggYFN0cmluZ2AuXG4gKiBAcGFyYW0gYnVmIGBCdWZmZXJgIG9iamVjdCB0byBjb252ZXJ0XG4gKi9cbmV4cG9ydHMuYnVmZmVyVG9IZXggPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgYnVmID0gZXhwb3J0cy50b0J1ZmZlcihidWYpO1xuICAgIHJldHVybiAnMHgnICsgYnVmLnRvU3RyaW5nKCdoZXgnKTtcbn07XG4vKipcbiAqIEludGVycHJldHMgYSBgQnVmZmVyYCBhcyBhIHNpZ25lZCBpbnRlZ2VyIGFuZCByZXR1cm5zIGEgYEJOYC4gQXNzdW1lcyAyNTYtYml0IG51bWJlcnMuXG4gKiBAcGFyYW0gbnVtIFNpZ25lZCBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydHMuZnJvbVNpZ25lZCA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICByZXR1cm4gbmV3IEJOKG51bSkuZnJvbVR3b3MoMjU2KTtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgYEJOYCB0byBhbiB1bnNpZ25lZCBpbnRlZ2VyIGFuZCByZXR1cm5zIGl0IGFzIGEgYEJ1ZmZlcmAuIEFzc3VtZXMgMjU2LWJpdCBudW1iZXJzLlxuICogQHBhcmFtIG51bVxuICovXG5leHBvcnRzLnRvVW5zaWduZWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKG51bS50b1R3b3MoMjU2KS50b0FycmF5KCkpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBLZWNjYWsgaGFzaCBvZiB0aGUgaW5wdXRcbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhIChCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcilcbiAqIEBwYXJhbSBiaXRzIFRoZSBLZWNjYWsgd2lkdGhcbiAqL1xuZXhwb3J0cy5rZWNjYWsgPSBmdW5jdGlvbiAoYSwgYml0cykge1xuICAgIGlmIChiaXRzID09PSB2b2lkIDApIHsgYml0cyA9IDI1NjsgfVxuICAgIGEgPSBleHBvcnRzLnRvQnVmZmVyKGEpO1xuICAgIGlmICghYml0cylcbiAgICAgICAgYml0cyA9IDI1NjtcbiAgICByZXR1cm4gY3JlYXRlS2VjY2FrSGFzaChcImtlY2Nha1wiICsgYml0cylcbiAgICAgICAgLnVwZGF0ZShhKVxuICAgICAgICAuZGlnZXN0KCk7XG59O1xuLyoqXG4gKiBDcmVhdGVzIEtlY2Nhay0yNTYgaGFzaCBvZiB0aGUgaW5wdXQsIGFsaWFzIGZvciBrZWNjYWsoYSwgMjU2KS5cbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhIChCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcilcbiAqL1xuZXhwb3J0cy5rZWNjYWsyNTYgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBleHBvcnRzLmtlY2NhayhhKTtcbn07XG4vKipcbiAqIENyZWF0ZXMgU0hBMjU2IGhhc2ggb2YgdGhlIGlucHV0LlxuICogQHBhcmFtIGEgVGhlIGlucHV0IGRhdGEgKEJ1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyKVxuICovXG5leHBvcnRzLnNoYTI1NiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gICAgcmV0dXJuIGNyZWF0ZUhhc2goJ3NoYTI1NicpXG4gICAgICAgIC51cGRhdGUoYSlcbiAgICAgICAgLmRpZ2VzdCgpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBSSVBFTUQxNjAgaGFzaCBvZiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gYSBUaGUgaW5wdXQgZGF0YSAoQnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXIpXG4gKiBAcGFyYW0gcGFkZGVkIFdoZXRoZXIgaXQgc2hvdWxkIGJlIHBhZGRlZCB0byAyNTYgYml0cyBvciBub3RcbiAqL1xuZXhwb3J0cy5yaXBlbWQxNjAgPSBmdW5jdGlvbiAoYSwgcGFkZGVkKSB7XG4gICAgYSA9IGV4cG9ydHMudG9CdWZmZXIoYSk7XG4gICAgdmFyIGhhc2ggPSBjcmVhdGVIYXNoKCdybWQxNjAnKVxuICAgICAgICAudXBkYXRlKGEpXG4gICAgICAgIC5kaWdlc3QoKTtcbiAgICBpZiAocGFkZGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnNldExlbmd0aChoYXNoLCAzMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9XG59O1xuLyoqXG4gKiBDcmVhdGVzIFNIQS0zIGhhc2ggb2YgdGhlIFJMUCBlbmNvZGVkIHZlcnNpb24gb2YgdGhlIGlucHV0LlxuICogQHBhcmFtIGEgVGhlIGlucHV0IGRhdGFcbiAqL1xuZXhwb3J0cy5ybHBoYXNoID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5rZWNjYWsocmxwLmVuY29kZShhKSk7XG59O1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByaXZhdGUga2V5IHNhdGlzZmllcyB0aGUgcnVsZXMgb2YgdGhlIGN1cnZlIHNlY3AyNTZrMS5cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkUHJpdmF0ZSA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wcml2YXRlS2V5VmVyaWZ5KHByaXZhdGVLZXkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwdWJsaWMga2V5IHNhdGlzZmllcyB0aGUgcnVsZXMgb2YgdGhlIGN1cnZlIHNlY3AyNTZrMVxuICogYW5kIHRoZSByZXF1aXJlbWVudHMgb2YgRXRoZXJldW0uXG4gKiBAcGFyYW0gcHVibGljS2V5IFRoZSB0d28gcG9pbnRzIG9mIGFuIHVuY29tcHJlc3NlZCBrZXksIHVubGVzcyBzYW5pdGl6ZSBpcyBlbmFibGVkXG4gKiBAcGFyYW0gc2FuaXRpemUgQWNjZXB0IHB1YmxpYyBrZXlzIGluIG90aGVyIGZvcm1hdHNcbiAqL1xuZXhwb3J0cy5pc1ZhbGlkUHVibGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSwgc2FuaXRpemUpIHtcbiAgICBpZiAoc2FuaXRpemUgPT09IHZvaWQgMCkgeyBzYW5pdGl6ZSA9IGZhbHNlOyB9XG4gICAgaWYgKHB1YmxpY0tleS5sZW5ndGggPT09IDY0KSB7XG4gICAgICAgIC8vIENvbnZlcnQgdG8gU0VDMSBmb3Igc2VjcDI1NmsxXG4gICAgICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VmVyaWZ5KEJ1ZmZlci5jb25jYXQoW0J1ZmZlci5mcm9tKFs0XSksIHB1YmxpY0tleV0pKTtcbiAgICB9XG4gICAgaWYgKCFzYW5pdGl6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5VmVyaWZ5KHB1YmxpY0tleSk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBldGhlcmV1bSBhZGRyZXNzIG9mIGEgZ2l2ZW4gcHVibGljIGtleS5cbiAqIEFjY2VwdHMgXCJFdGhlcmV1bSBwdWJsaWMga2V5c1wiIGFuZCBTRUMxIGVuY29kZWQga2V5cy5cbiAqIEBwYXJhbSBwdWJLZXkgVGhlIHR3byBwb2ludHMgb2YgYW4gdW5jb21wcmVzc2VkIGtleSwgdW5sZXNzIHNhbml0aXplIGlzIGVuYWJsZWRcbiAqIEBwYXJhbSBzYW5pdGl6ZSBBY2NlcHQgcHVibGljIGtleXMgaW4gb3RoZXIgZm9ybWF0c1xuICovXG5leHBvcnRzLnB1YlRvQWRkcmVzcyA9IGZ1bmN0aW9uIChwdWJLZXksIHNhbml0aXplKSB7XG4gICAgaWYgKHNhbml0aXplID09PSB2b2lkIDApIHsgc2FuaXRpemUgPSBmYWxzZTsgfVxuICAgIHB1YktleSA9IGV4cG9ydHMudG9CdWZmZXIocHViS2V5KTtcbiAgICBpZiAoc2FuaXRpemUgJiYgcHViS2V5Lmxlbmd0aCAhPT0gNjQpIHtcbiAgICAgICAgcHViS2V5ID0gc2VjcDI1NmsxLnB1YmxpY0tleUNvbnZlcnQocHViS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG4gICAgfVxuICAgIGFzc2VydChwdWJLZXkubGVuZ3RoID09PSA2NCk7XG4gICAgLy8gT25seSB0YWtlIHRoZSBsb3dlciAxNjBiaXRzIG9mIHRoZSBoYXNoXG4gICAgcmV0dXJuIGV4cG9ydHMua2VjY2FrKHB1YktleSkuc2xpY2UoLTIwKTtcbn07XG5leHBvcnRzLnB1YmxpY1RvQWRkcmVzcyA9IGV4cG9ydHMucHViVG9BZGRyZXNzO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBldGhlcmV1bSBwdWJsaWMga2V5IG9mIGEgZ2l2ZW4gcHJpdmF0ZSBrZXkuXG4gKiBAcGFyYW0gcHJpdmF0ZUtleSBBIHByaXZhdGUga2V5IG11c3QgYmUgMjU2IGJpdHMgd2lkZVxuICovXG5leHBvcnRzLnByaXZhdGVUb1B1YmxpYyA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgcHJpdmF0ZUtleSA9IGV4cG9ydHMudG9CdWZmZXIocHJpdmF0ZUtleSk7XG4gICAgLy8gc2tpcCB0aGUgdHlwZSBmbGFnIGFuZCB1c2UgdGhlIFgsIFkgcG9pbnRzXG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlDcmVhdGUocHJpdmF0ZUtleSwgZmFsc2UpLnNsaWNlKDEpO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBwdWJsaWMga2V5IHRvIHRoZSBFdGhlcmV1bSBmb3JtYXQuXG4gKi9cbmV4cG9ydHMuaW1wb3J0UHVibGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSkge1xuICAgIHB1YmxpY0tleSA9IGV4cG9ydHMudG9CdWZmZXIocHVibGljS2V5KTtcbiAgICBpZiAocHVibGljS2V5Lmxlbmd0aCAhPT0gNjQpIHtcbiAgICAgICAgcHVibGljS2V5ID0gc2VjcDI1NmsxLnB1YmxpY0tleUNvbnZlcnQocHVibGljS2V5LCBmYWxzZSkuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaWNLZXk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBFQ0RTQSBzaWduYXR1cmUgb2YgYSBtZXNzYWdlIGhhc2guXG4gKi9cbmV4cG9ydHMuZWNzaWduID0gZnVuY3Rpb24gKG1zZ0hhc2gsIHByaXZhdGVLZXksIGNoYWluSWQpIHtcbiAgICB2YXIgc2lnID0gc2VjcDI1NmsxLnNpZ24obXNnSGFzaCwgcHJpdmF0ZUtleSk7XG4gICAgdmFyIHJlY292ZXJ5ID0gc2lnLnJlY292ZXJ5O1xuICAgIHZhciByZXQgPSB7XG4gICAgICAgIHI6IHNpZy5zaWduYXR1cmUuc2xpY2UoMCwgMzIpLFxuICAgICAgICBzOiBzaWcuc2lnbmF0dXJlLnNsaWNlKDMyLCA2NCksXG4gICAgICAgIHY6IGNoYWluSWQgPyByZWNvdmVyeSArIChjaGFpbklkICogMiArIDM1KSA6IHJlY292ZXJ5ICsgMjcsXG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUga2VjY2FrLTI1NiBoYXNoIG9mIGBtZXNzYWdlYCwgcHJlZml4ZWQgd2l0aCB0aGUgaGVhZGVyIHVzZWQgYnkgdGhlIGBldGhfc2lnbmAgUlBDIGNhbGwuXG4gKiBUaGUgb3V0cHV0IG9mIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGZlZCBpbnRvIGBlY3NpZ25gIHRvIHByb2R1Y2UgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHRoZSBgZXRoX3NpZ25gXG4gKiBjYWxsIGZvciBhIGdpdmVuIGBtZXNzYWdlYCwgb3IgZmVkIHRvIGBlY3JlY292ZXJgIGFsb25nIHdpdGggYSBzaWduYXR1cmUgdG8gcmVjb3ZlciB0aGUgcHVibGljIGtleVxuICogdXNlZCB0byBwcm9kdWNlIHRoZSBzaWduYXR1cmUuXG4gKi9cbmV4cG9ydHMuaGFzaFBlcnNvbmFsTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdmFyIHByZWZpeCA9IGV4cG9ydHMudG9CdWZmZXIoXCJcXHUwMDE5RXRoZXJldW0gU2lnbmVkIE1lc3NhZ2U6XFxuXCIgKyBtZXNzYWdlLmxlbmd0aC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gZXhwb3J0cy5rZWNjYWsoQnVmZmVyLmNvbmNhdChbcHJlZml4LCBtZXNzYWdlXSkpO1xufTtcbi8qKlxuICogRUNEU0EgcHVibGljIGtleSByZWNvdmVyeSBmcm9tIHNpZ25hdHVyZS5cbiAqIEByZXR1cm5zIFJlY292ZXJlZCBwdWJsaWMga2V5XG4gKi9cbmV4cG9ydHMuZWNyZWNvdmVyID0gZnVuY3Rpb24gKG1zZ0hhc2gsIHYsIHIsIHMsIGNoYWluSWQpIHtcbiAgICB2YXIgc2lnbmF0dXJlID0gQnVmZmVyLmNvbmNhdChbZXhwb3J0cy5zZXRMZW5ndGgociwgMzIpLCBleHBvcnRzLnNldExlbmd0aChzLCAzMildLCA2NCk7XG4gICAgdmFyIHJlY292ZXJ5ID0gY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCk7XG4gICAgaWYgKCFpc1ZhbGlkU2lnUmVjb3ZlcnkocmVjb3ZlcnkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzaWduYXR1cmUgdiB2YWx1ZScpO1xuICAgIH1cbiAgICB2YXIgc2VuZGVyUHViS2V5ID0gc2VjcDI1NmsxLnJlY292ZXIobXNnSGFzaCwgc2lnbmF0dXJlLCByZWNvdmVyeSk7XG4gICAgcmV0dXJuIHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KHNlbmRlclB1YktleSwgZmFsc2UpLnNsaWNlKDEpO1xufTtcbi8qKlxuICogQ29udmVydCBzaWduYXR1cmUgcGFyYW1ldGVycyBpbnRvIHRoZSBmb3JtYXQgb2YgYGV0aF9zaWduYCBSUEMgbWV0aG9kLlxuICogQHJldHVybnMgU2lnbmF0dXJlXG4gKi9cbmV4cG9ydHMudG9ScGNTaWcgPSBmdW5jdGlvbiAodiwgciwgcywgY2hhaW5JZCkge1xuICAgIHZhciByZWNvdmVyeSA9IGNhbGN1bGF0ZVNpZ1JlY292ZXJ5KHYsIGNoYWluSWQpO1xuICAgIGlmICghaXNWYWxpZFNpZ1JlY292ZXJ5KHJlY292ZXJ5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIHYgdmFsdWUnKTtcbiAgICB9XG4gICAgLy8gZ2V0aCAoYW5kIHRoZSBSUEMgZXRoX3NpZ24gbWV0aG9kKSB1c2VzIHRoZSA2NSBieXRlIGZvcm1hdCB1c2VkIGJ5IEJpdGNvaW5cbiAgICByZXR1cm4gZXhwb3J0cy5idWZmZXJUb0hleChCdWZmZXIuY29uY2F0KFtleHBvcnRzLnNldExlbmd0aExlZnQociwgMzIpLCBleHBvcnRzLnNldExlbmd0aExlZnQocywgMzIpLCBleHBvcnRzLnRvQnVmZmVyKHYpXSkpO1xufTtcbi8qKlxuICogQ29udmVydCBzaWduYXR1cmUgZm9ybWF0IG9mIHRoZSBgZXRoX3NpZ25gIFJQQyBtZXRob2QgdG8gc2lnbmF0dXJlIHBhcmFtZXRlcnNcbiAqIE5PVEU6IGFsbCBiZWNhdXNlIG9mIGEgYnVnIGluIGdldGg6IGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bS9nby1ldGhlcmV1bS9pc3N1ZXMvMjA1M1xuICovXG5leHBvcnRzLmZyb21ScGNTaWcgPSBmdW5jdGlvbiAoc2lnKSB7XG4gICAgdmFyIGJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoc2lnKTtcbiAgICAvLyBOT1RFOiB3aXRoIHBvdGVudGlhbCBpbnRyb2R1Y3Rpb24gb2YgY2hhaW5JZCB0aGlzIG1pZ2h0IG5lZWQgdG8gYmUgdXBkYXRlZFxuICAgIGlmIChidWYubGVuZ3RoICE9PSA2NSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIGxlbmd0aCcpO1xuICAgIH1cbiAgICB2YXIgdiA9IGJ1Zls2NF07XG4gICAgLy8gc3VwcG9ydCBib3RoIHZlcnNpb25zIG9mIGBldGhfc2lnbmAgcmVzcG9uc2VzXG4gICAgaWYgKHYgPCAyNykge1xuICAgICAgICB2ICs9IDI3O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2OiB2LFxuICAgICAgICByOiBidWYuc2xpY2UoMCwgMzIpLFxuICAgICAgICBzOiBidWYuc2xpY2UoMzIsIDY0KSxcbiAgICB9O1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gYWRkcmVzcyBvZiBhIGdpdmVuIHByaXZhdGUga2V5LlxuICogQHBhcmFtIHByaXZhdGVLZXkgQSBwcml2YXRlIGtleSBtdXN0IGJlIDI1NiBiaXRzIHdpZGVcbiAqL1xuZXhwb3J0cy5wcml2YXRlVG9BZGRyZXNzID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5wdWJsaWNUb0FkZHJlc3MoZXhwb3J0cy5wcml2YXRlVG9QdWJsaWMocHJpdmF0ZUtleSkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBhZGRyZXNzIGlzIGEgdmFsaWQuIEFjY2VwdHMgY2hlY2tzdW1tZWQgYWRkcmVzc2VzIHRvby5cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgcmV0dXJuIC9eMHhbMC05YS1mQS1GXXs0MH0kLy50ZXN0KGFkZHJlc3MpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYWRkcmVzcyBpcyBhIHplcm8gYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy5pc1plcm9BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICB2YXIgemVyb0FkZHIgPSBleHBvcnRzLnplcm9BZGRyZXNzKCk7XG4gICAgcmV0dXJuIHplcm9BZGRyID09PSBleHBvcnRzLmFkZEhleFByZWZpeChhZGRyZXNzKTtcbn07XG4vKipcbiAqIFJldHVybnMgYSBjaGVja3N1bW1lZCBhZGRyZXNzLlxuICovXG5leHBvcnRzLnRvQ2hlY2tzdW1BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICBhZGRyZXNzID0gZXRoanNVdGlsLnN0cmlwSGV4UHJlZml4KGFkZHJlc3MpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGhhc2ggPSBleHBvcnRzLmtlY2NhayhhZGRyZXNzKS50b1N0cmluZygnaGV4Jyk7XG4gICAgdmFyIHJldCA9ICcweCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRyZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJzZUludChoYXNoW2ldLCAxNikgPj0gOCkge1xuICAgICAgICAgICAgcmV0ICs9IGFkZHJlc3NbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldCArPSBhZGRyZXNzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGFkZHJlc3MgaXMgYSB2YWxpZCBjaGVja3N1bW1lZCBhZGRyZXNzLlxuICovXG5leHBvcnRzLmlzVmFsaWRDaGVja3N1bUFkZHJlc3MgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgIHJldHVybiBleHBvcnRzLmlzVmFsaWRBZGRyZXNzKGFkZHJlc3MpICYmIGV4cG9ydHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcykgPT09IGFkZHJlc3M7XG59O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gYWRkcmVzcyBvZiBhIG5ld2x5IGNyZWF0ZWQgY29udHJhY3QuXG4gKiBAcGFyYW0gZnJvbSBUaGUgYWRkcmVzcyB3aGljaCBpcyBjcmVhdGluZyB0aGlzIG5ldyBhZGRyZXNzXG4gKiBAcGFyYW0gbm9uY2UgVGhlIG5vbmNlIG9mIHRoZSBmcm9tIGFjY291bnRcbiAqL1xuZXhwb3J0cy5nZW5lcmF0ZUFkZHJlc3MgPSBmdW5jdGlvbiAoZnJvbSwgbm9uY2UpIHtcbiAgICBmcm9tID0gZXhwb3J0cy50b0J1ZmZlcihmcm9tKTtcbiAgICB2YXIgbm9uY2VCTiA9IG5ldyBCTihub25jZSk7XG4gICAgaWYgKG5vbmNlQk4uaXNaZXJvKCkpIHtcbiAgICAgICAgLy8gaW4gUkxQIHdlIHdhbnQgdG8gZW5jb2RlIG51bGwgaW4gdGhlIGNhc2Ugb2YgemVybyBub25jZVxuICAgICAgICAvLyByZWFkIHRoZSBSTFAgZG9jdW1lbnRhdGlvbiBmb3IgYW4gYW5zd2VyIGlmIHlvdSBkYXJlXG4gICAgICAgIHJldHVybiBleHBvcnRzLnJscGhhc2goW2Zyb20sIG51bGxdKS5zbGljZSgtMjApO1xuICAgIH1cbiAgICAvLyBPbmx5IHRha2UgdGhlIGxvd2VyIDE2MGJpdHMgb2YgdGhlIGhhc2hcbiAgICByZXR1cm4gZXhwb3J0cy5ybHBoYXNoKFtmcm9tLCBCdWZmZXIuZnJvbShub25jZUJOLnRvQXJyYXkoKSldKS5zbGljZSgtMjApO1xufTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIGFkZHJlc3MgZm9yIGEgY29udHJhY3QgY3JlYXRlZCB1c2luZyBDUkVBVEUyLlxuICogQHBhcmFtIGZyb20gVGhlIGFkZHJlc3Mgd2hpY2ggaXMgY3JlYXRpbmcgdGhpcyBuZXcgYWRkcmVzc1xuICogQHBhcmFtIHNhbHQgQSBzYWx0XG4gKiBAcGFyYW0gaW5pdENvZGUgVGhlIGluaXQgY29kZSBvZiB0aGUgY29udHJhY3QgYmVpbmcgY3JlYXRlZFxuICovXG5leHBvcnRzLmdlbmVyYXRlQWRkcmVzczIgPSBmdW5jdGlvbiAoZnJvbSwgc2FsdCwgaW5pdENvZGUpIHtcbiAgICB2YXIgZnJvbUJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoZnJvbSk7XG4gICAgdmFyIHNhbHRCdWYgPSBleHBvcnRzLnRvQnVmZmVyKHNhbHQpO1xuICAgIHZhciBpbml0Q29kZUJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoaW5pdENvZGUpO1xuICAgIGFzc2VydChmcm9tQnVmLmxlbmd0aCA9PT0gMjApO1xuICAgIGFzc2VydChzYWx0QnVmLmxlbmd0aCA9PT0gMzIpO1xuICAgIHZhciBhZGRyZXNzID0gZXhwb3J0cy5rZWNjYWsyNTYoQnVmZmVyLmNvbmNhdChbQnVmZmVyLmZyb20oJ2ZmJywgJ2hleCcpLCBmcm9tQnVmLCBzYWx0QnVmLCBleHBvcnRzLmtlY2NhazI1Nihpbml0Q29kZUJ1ZildKSk7XG4gICAgcmV0dXJuIGFkZHJlc3Muc2xpY2UoLTIwKTtcbn07XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3VwcGxpZWQgYWRkcmVzcyBiZWxvbmdzIHRvIGEgcHJlY29tcGlsZWQgYWNjb3VudCAoQnl6YW50aXVtKS5cbiAqL1xuZXhwb3J0cy5pc1ByZWNvbXBpbGVkID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICB2YXIgYSA9IGV4cG9ydHMudW5wYWQoYWRkcmVzcyk7XG4gICAgcmV0dXJuIGEubGVuZ3RoID09PSAxICYmIGFbMF0gPj0gMSAmJiBhWzBdIDw9IDg7XG59O1xuLyoqXG4gKiBBZGRzIFwiMHhcIiB0byBhIGdpdmVuIGBTdHJpbmdgIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgc3RhcnQgd2l0aCBcIjB4XCIuXG4gKi9cbmV4cG9ydHMuYWRkSGV4UHJlZml4ID0gZnVuY3Rpb24gKHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gZXRoanNVdGlsLmlzSGV4UHJlZml4ZWQoc3RyKSA/IHN0ciA6ICcweCcgKyBzdHI7XG59O1xuLyoqXG4gKiBWYWxpZGF0ZSBhIEVDRFNBIHNpZ25hdHVyZS5cbiAqIEBwYXJhbSBob21lc3RlYWRPckxhdGVyIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgaXMgYmVpbmcgdXNlZCBvbiBlaXRoZXIgdGhlIGhvbWVzdGVhZCBoYXJkZm9yayBvciBhIGxhdGVyIG9uZVxuICovXG5leHBvcnRzLmlzVmFsaWRTaWduYXR1cmUgPSBmdW5jdGlvbiAodiwgciwgcywgaG9tZXN0ZWFkT3JMYXRlciwgY2hhaW5JZCkge1xuICAgIGlmIChob21lc3RlYWRPckxhdGVyID09PSB2b2lkIDApIHsgaG9tZXN0ZWFkT3JMYXRlciA9IHRydWU7IH1cbiAgICB2YXIgU0VDUDI1NksxX05fRElWXzIgPSBuZXcgQk4oJzdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmNWQ1NzZlNzM1N2E0NTAxZGRmZTkyZjQ2NjgxYjIwYTAnLCAxNik7XG4gICAgdmFyIFNFQ1AyNTZLMV9OID0gbmV3IEJOKCdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxJywgMTYpO1xuICAgIGlmIChyLmxlbmd0aCAhPT0gMzIgfHwgcy5sZW5ndGggIT09IDMyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFpc1ZhbGlkU2lnUmVjb3ZlcnkoY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHJCTiA9IG5ldyBCTihyKTtcbiAgICB2YXIgc0JOID0gbmV3IEJOKHMpO1xuICAgIGlmIChyQk4uaXNaZXJvKCkgfHwgckJOLmd0KFNFQ1AyNTZLMV9OKSB8fCBzQk4uaXNaZXJvKCkgfHwgc0JOLmd0KFNFQ1AyNTZLMV9OKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChob21lc3RlYWRPckxhdGVyICYmIHNCTi5jbXAoU0VDUDI1NksxX05fRElWXzIpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIG9yIGBBcnJheWAgdG8gSlNPTi5cbiAqIEBwYXJhbSBiYSAoQnVmZmVyfEFycmF5KVxuICogQHJldHVybiAoQXJyYXl8U3RyaW5nfG51bGwpXG4gKi9cbmV4cG9ydHMuYmFUb0pTT04gPSBmdW5jdGlvbiAoYmEpIHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJhKSkge1xuICAgICAgICByZXR1cm4gXCIweFwiICsgYmEudG9TdHJpbmcoJ2hleCcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChiYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGV4cG9ydHMuYmFUb0pTT04oYmFbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufTtcbi8qKlxuICogRGVmaW5lcyBwcm9wZXJ0aWVzIG9uIGEgYE9iamVjdGAuIEl0IG1ha2UgdGhlIGFzc3VtcHRpb24gdGhhdCB1bmRlcmx5aW5nIGRhdGEgaXMgYmluYXJ5LlxuICogQHBhcmFtIHNlbGYgdGhlIGBPYmplY3RgIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uXG4gKiBAcGFyYW0gZmllbGRzIGFuIGFycmF5IGZpZWxkcyB0byBkZWZpbmUuIEZpZWxkcyBjYW4gY29udGFpbjpcbiAqICogYG5hbWVgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnRpZXNcbiAqICogYGxlbmd0aGAgLSB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBmaWVsZCBjYW4gaGF2ZVxuICogKiBgYWxsb3dMZXNzYCAtIGlmIHRoZSBmaWVsZCBjYW4gYmUgbGVzcyB0aGFuIHRoZSBsZW5ndGhcbiAqICogYGFsbG93RW1wdHlgXG4gKiBAcGFyYW0gZGF0YSBkYXRhIHRvIGJlIHZhbGlkYXRlZCBhZ2FpbnN0IHRoZSBkZWZpbml0aW9uc1xuICovXG5leHBvcnRzLmRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoc2VsZiwgZmllbGRzLCBkYXRhKSB7XG4gICAgc2VsZi5yYXcgPSBbXTtcbiAgICBzZWxmLl9maWVsZHMgPSBbXTtcbiAgICAvLyBhdHRhY2ggdGhlIGB0b0pTT05gXG4gICAgc2VsZi50b0pTT04gPSBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgaWYgKGxhYmVsID09PSB2b2lkIDApIHsgbGFiZWwgPSBmYWxzZTsgfVxuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIHZhciBvYmpfMSA9IHt9O1xuICAgICAgICAgICAgc2VsZi5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgb2JqXzFbZmllbGRdID0gXCIweFwiICsgc2VsZltmaWVsZF0udG9TdHJpbmcoJ2hleCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqXzE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYmFUb0pTT04oc2VsZi5yYXcpO1xuICAgIH07XG4gICAgc2VsZi5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gICAgICAgIHJldHVybiBybHAuZW5jb2RlKHNlbGYucmF3KTtcbiAgICB9O1xuICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgaSkge1xuICAgICAgICBzZWxmLl9maWVsZHMucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0dGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYucmF3W2ldO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNldHRlcih2KSB7XG4gICAgICAgICAgICB2ID0gZXhwb3J0cy50b0J1ZmZlcih2KTtcbiAgICAgICAgICAgIGlmICh2LnRvU3RyaW5nKCdoZXgnKSA9PT0gJzAwJyAmJiAhZmllbGQuYWxsb3daZXJvKSB7XG4gICAgICAgICAgICAgICAgdiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWVsZC5hbGxvd0xlc3MgJiYgZmllbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdiA9IGV4cG9ydHMuc3RyaXBaZXJvcyh2KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZmllbGQubGVuZ3RoID49IHYubGVuZ3RoLCBcIlRoZSBmaWVsZCBcIiArIGZpZWxkLm5hbWUgKyBcIiBtdXN0IG5vdCBoYXZlIG1vcmUgXCIgKyBmaWVsZC5sZW5ndGggKyBcIiBieXRlc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEoZmllbGQuYWxsb3daZXJvICYmIHYubGVuZ3RoID09PSAwKSAmJiBmaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZmllbGQubGVuZ3RoID09PSB2Lmxlbmd0aCwgXCJUaGUgZmllbGQgXCIgKyBmaWVsZC5uYW1lICsgXCIgbXVzdCBoYXZlIGJ5dGUgbGVuZ3RoIG9mIFwiICsgZmllbGQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucmF3W2ldID0gdjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgZmllbGQubmFtZSwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmllbGQuZGVmYXVsdCkge1xuICAgICAgICAgICAgc2VsZltmaWVsZC5uYW1lXSA9IGZpZWxkLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXR0YWNoIGFsaWFzXG4gICAgICAgIGlmIChmaWVsZC5hbGlhcykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGZpZWxkLmFsaWFzLCB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpZiB0aGUgY29uc3R1Y3RvciBpcyBwYXNzZWQgZGF0YVxuICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShldGhqc1V0aWwuc3RyaXBIZXhQcmVmaXgoZGF0YSksICdoZXgnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gcmxwLmRlY29kZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gc2VsZi5fZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgbnVtYmVyIG9mIGZpZWxkcyBpbiBkYXRhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIHRoZSBpdGVtcyBhcmUgYnVmZmVyc1xuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgc2VsZltzZWxmLl9maWVsZHNbaV1dID0gZXhwb3J0cy50b0J1ZmZlcihkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIGtleXNfMSA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXNfMS5pbmRleE9mKGZpZWxkLm5hbWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZltmaWVsZC5uYW1lXSA9IGRhdGFbZmllbGQubmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGtleXNfMS5pbmRleE9mKGZpZWxkLmFsaWFzKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHNlbGZbZmllbGQuYWxpYXNdID0gZGF0YVtmaWVsZC5hbGlhc107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gY2FsY3VsYXRlU2lnUmVjb3ZlcnkodiwgY2hhaW5JZCkge1xuICAgIHJldHVybiBjaGFpbklkID8gdiAtICgyICogY2hhaW5JZCArIDM1KSA6IHYgLSAyNztcbn1cbmZ1bmN0aW9uIGlzVmFsaWRTaWdSZWNvdmVyeShyZWNvdmVyeSkge1xuICAgIHJldHVybiByZWNvdmVyeSA9PT0gMCB8fCByZWNvdmVyeSA9PT0gMTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBldGhlcmV1bWpzX3V0aWxfMSA9IHJlcXVpcmUoXCJldGhlcmV1bWpzLXV0aWxcIik7XG52YXIgZXRoZXJldW1qc19jb21tb25fMSA9IHJlcXVpcmUoXCJldGhlcmV1bWpzLWNvbW1vblwiKTtcbnZhciBidWZmZXJfMSA9IHJlcXVpcmUoXCJidWZmZXJcIik7XG4vLyBzZWNwMjU2azFuLzJcbnZhciBOX0RJVl8yID0gbmV3IGV0aGVyZXVtanNfdXRpbF8xLkJOKCc3ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjVkNTc2ZTczNTdhNDUwMWRkZmU5MmY0NjY4MWIyMGEwJywgMTYpO1xuLyoqXG4gKiBBbiBFdGhlcmV1bSB0cmFuc2FjdGlvbi5cbiAqL1xudmFyIFRyYW5zYWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdHJhbnNhY3Rpb24gZnJvbSBhbiBvYmplY3Qgd2l0aCBpdHMgZmllbGRzJyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSAtIEEgdHJhbnNhY3Rpb24gY2FuIGJlIGluaXRpYWxpemVkIHdpdGggaXRzIHJscCByZXByZXNlbnRhdGlvbiwgYW4gYXJyYXkgY29udGFpbmluZ1xuICAgICAqIHRoZSB2YWx1ZSBvZiBpdHMgZmllbGRzIGluIG9yZGVyLCBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGVtIGJ5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0cyAtIFRoZSB0cmFuc2FjdGlvbidzIG9wdGlvbnMsIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGNoYWluIGFuZCBoYXJkZm9yayB0aGVcbiAgICAgKiB0cmFuc2FjdGlvbnMgYmVsb25ncyB0by5cbiAgICAgKlxuICAgICAqIEBub3RlIFRyYW5zYWN0aW9uIG9iamVjdHMgaW1wbGVtZW50IEVJUDE1NSBieSBkZWZhdWx0LiBUbyBkaXNhYmxlIGl0LCB1c2UgdGhlIGNvbnN0cnVjdG9yJ3NcbiAgICAgKiBzZWNvbmQgcGFyYW1ldGVyIHRvIHNldCBhIGNoYWluIGFuZCBoYXJkZm9yayBiZWZvcmUgRUlQMTU1IGFjdGl2YXRpb24gKGkuZS4gYmVmb3JlIFNwdXJpb3VzXG4gICAgICogRHJhZ29uLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBjb25zdCB0eERhdGEgPSB7XG4gICAgICogICBub25jZTogJzB4MDAnLFxuICAgICAqICAgZ2FzUHJpY2U6ICcweDA5MTg0ZTcyYTAwMCcsXG4gICAgICogICBnYXNMaW1pdDogJzB4MjcxMCcsXG4gICAgICogICB0bzogJzB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgICogICB2YWx1ZTogJzB4MDAnLFxuICAgICAqICAgZGF0YTogJzB4N2Y3NDY1NzM3NDMyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNjAwMDU3JyxcbiAgICAgKiAgIHY6ICcweDFjJyxcbiAgICAgKiAgIHI6ICcweDVlMWQzYTc2ZmJmODI0MjIwZWFmYzhjNzlhZDU3OGFkMmI2N2QwMWIwYzI0MjVlYjFmMTM0N2U4ZjUwODgyYWInLFxuICAgICAqICAgczogJzB4NWJkNDI4NTM3ZjA1Zjk4MzBlOTM3OTJmOTBlYTZhM2UyZDFlZTg0OTUyZGQ5NmVkYmFlOWY2NThmODMxYWIxMydcbiAgICAgKiB9O1xuICAgICAqIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHR4RGF0YSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oZGF0YSwgb3B0cykge1xuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSB7fTsgfVxuICAgICAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSB7fTsgfVxuICAgICAgICAvLyBpbnN0YW50aWF0ZSBDb21tb24gY2xhc3MgaW5zdGFuY2UgYmFzZWQgb24gcGFzc2VkIG9wdGlvbnNcbiAgICAgICAgaWYgKG9wdHMuY29tbW9uKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5jaGFpbiB8fCBvcHRzLmhhcmRmb3JrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnN0YW50aWF0aW9uIHdpdGggYm90aCBvcHRzLmNvbW1vbiwgYW5kIG9wdHMuY2hhaW4gYW5kIG9wdHMuaGFyZGZvcmsgcGFyYW1ldGVyIG5vdCBhbGxvd2VkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY29tbW9uID0gb3B0cy5jb21tb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2hhaW4gPSBvcHRzLmNoYWluID8gb3B0cy5jaGFpbiA6ICdtYWlubmV0JztcbiAgICAgICAgICAgIHZhciBoYXJkZm9yayA9IG9wdHMuaGFyZGZvcmsgPyBvcHRzLmhhcmRmb3JrIDogJ3BldGVyc2J1cmcnO1xuICAgICAgICAgICAgdGhpcy5fY29tbW9uID0gbmV3IGV0aGVyZXVtanNfY29tbW9uXzEuZGVmYXVsdChjaGFpbiwgaGFyZGZvcmspO1xuICAgICAgICB9XG4gICAgICAgIC8vIERlZmluZSBQcm9wZXJ0aWVzXG4gICAgICAgIHZhciBmaWVsZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ25vbmNlJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMyLFxuICAgICAgICAgICAgICAgIGFsbG93TGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBuZXcgYnVmZmVyXzEuQnVmZmVyKFtdKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2dhc1ByaWNlJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMyLFxuICAgICAgICAgICAgICAgIGFsbG93TGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBuZXcgYnVmZmVyXzEuQnVmZmVyKFtdKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2dhc0xpbWl0JyxcbiAgICAgICAgICAgICAgICBhbGlhczogJ2dhcycsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzMixcbiAgICAgICAgICAgICAgICBhbGxvd0xlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0bycsXG4gICAgICAgICAgICAgICAgYWxsb3daZXJvOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMjAsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzMixcbiAgICAgICAgICAgICAgICBhbGxvd0xlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdkYXRhJyxcbiAgICAgICAgICAgICAgICBhbGlhczogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhbGxvd1plcm86IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd2JyxcbiAgICAgICAgICAgICAgICBhbGxvd1plcm86IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMyLFxuICAgICAgICAgICAgICAgIGFsbG93WmVybzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd0xlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMyLFxuICAgICAgICAgICAgICAgIGFsbG93WmVybzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd0xlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICAvLyBhdHRhY2hlZCBzZXJpYWxpemVcbiAgICAgICAgZXRoZXJldW1qc191dGlsXzEuZGVmaW5lUHJvcGVydGllcyh0aGlzLCBmaWVsZHMsIGRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtCdWZmZXJ9IGZyb20gKHJlYWQgb25seSkgc2VuZGVyIGFkZHJlc3Mgb2YgdGhpcyB0cmFuc2FjdGlvbiwgbWF0aGVtYXRpY2FsbHkgZGVyaXZlZCBmcm9tIG90aGVyIHBhcmFtZXRlcnMuXG4gICAgICAgICAqIEBuYW1lIGZyb21cbiAgICAgICAgICogQG1lbWJlcm9mIFRyYW5zYWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Zyb20nLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiB0aGlzLmdldFNlbmRlckFkZHJlc3MuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlVih0aGlzLnYpO1xuICAgICAgICB0aGlzLl9vdmVycmlkZVZTZXR0ZXJXaXRoVmFsaWRhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgdHgncyBgdG9gIGlzIHRvIHRoZSBjcmVhdGlvbiBhZGRyZXNzXG4gICAgICovXG4gICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLnRvQ3JlYXRpb25BZGRyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50by50b1N0cmluZygnaGV4JykgPT09ICcnO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgYSBzaGEzLTI1NiBoYXNoIG9mIHRoZSBzZXJpYWxpemVkIHR4XG4gICAgICogQHBhcmFtIGluY2x1ZGVTaWduYXR1cmUgLSBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBzaWduYXR1cmVcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuaGFzaCA9IGZ1bmN0aW9uIChpbmNsdWRlU2lnbmF0dXJlKSB7XG4gICAgICAgIGlmIChpbmNsdWRlU2lnbmF0dXJlID09PSB2b2lkIDApIHsgaW5jbHVkZVNpZ25hdHVyZSA9IHRydWU7IH1cbiAgICAgICAgdmFyIGl0ZW1zO1xuICAgICAgICBpZiAoaW5jbHVkZVNpZ25hdHVyZSkge1xuICAgICAgICAgICAgaXRlbXMgPSB0aGlzLnJhdztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbXBsZW1lbnRzRUlQMTU1KCkpIHtcbiAgICAgICAgICAgICAgICBpdGVtcyA9IHRoaXMucmF3LnNsaWNlKDAsIDYpLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgICAgIGV0aGVyZXVtanNfdXRpbF8xLnRvQnVmZmVyKHRoaXMuZ2V0Q2hhaW5JZCgpKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogc3RyaXBwaW5nIHplcm9zIHNob3VsZCBwcm9iYWJseSBiZSBhIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBybHAgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIGV0aGVyZXVtanNfdXRpbF8xLnN0cmlwWmVyb3MoZXRoZXJldW1qc191dGlsXzEudG9CdWZmZXIoMCkpLFxuICAgICAgICAgICAgICAgICAgICBldGhlcmV1bWpzX3V0aWxfMS5zdHJpcFplcm9zKGV0aGVyZXVtanNfdXRpbF8xLnRvQnVmZmVyKDApKSxcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1zID0gdGhpcy5yYXcuc2xpY2UoMCwgNik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY3JlYXRlIGhhc2hcbiAgICAgICAgcmV0dXJuIGV0aGVyZXVtanNfdXRpbF8xLnJscGhhc2goaXRlbXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBjaGFpbiBJRFxuICAgICAqL1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5nZXRDaGFpbklkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbW9uLmNoYWluSWQoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIHNlbmRlcidzIGFkZHJlc3NcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVyQWRkcmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zyb20pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcm9tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwdWJrZXkgPSB0aGlzLmdldFNlbmRlclB1YmxpY0tleSgpO1xuICAgICAgICB0aGlzLl9mcm9tID0gZXRoZXJldW1qc191dGlsXzEucHVibGljVG9BZGRyZXNzKHB1YmtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcm9tO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgcHVibGljIGtleSBvZiB0aGUgc2VuZGVyXG4gICAgICovXG4gICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlclB1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZlcmlmeVNpZ25hdHVyZSgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgU2lnbmF0dXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIHNpZ25hdHVyZSB3YXMgdmVyaWZpZWQgc3VjY2Vzc2Z1bGx5IHRoZSBfc2VuZGVyUHViS2V5IGZpZWxkIGlzIGRlZmluZWRcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRlclB1YktleTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIHNpZ25hdHVyZSBpcyB2YWxpZFxuICAgICAqL1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS52ZXJpZnlTaWduYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtc2dIYXNoID0gdGhpcy5oYXNoKGZhbHNlKTtcbiAgICAgICAgLy8gQWxsIHRyYW5zYWN0aW9uIHNpZ25hdHVyZXMgd2hvc2Ugcy12YWx1ZSBpcyBncmVhdGVyIHRoYW4gc2VjcDI1Nmsxbi8yIGFyZSBjb25zaWRlcmVkIGludmFsaWQuXG4gICAgICAgIGlmICh0aGlzLl9jb21tb24uZ3RlSGFyZGZvcmsoJ2hvbWVzdGVhZCcpICYmIG5ldyBldGhlcmV1bWpzX3V0aWxfMS5CTih0aGlzLnMpLmNtcChOX0RJVl8yKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgdiA9IGV0aGVyZXVtanNfdXRpbF8xLmJ1ZmZlclRvSW50KHRoaXMudik7XG4gICAgICAgICAgICB2YXIgdXNlQ2hhaW5JZFdoaWxlUmVjb3ZlcmluZ1B1YktleSA9IHYgPj0gdGhpcy5nZXRDaGFpbklkKCkgKiAyICsgMzUgJiYgdGhpcy5fY29tbW9uLmd0ZUhhcmRmb3JrKCdzcHVyaW91c0RyYWdvbicpO1xuICAgICAgICAgICAgdGhpcy5fc2VuZGVyUHViS2V5ID0gZXRoZXJldW1qc191dGlsXzEuZWNyZWNvdmVyKG1zZ0hhc2gsIHYsIHRoaXMuciwgdGhpcy5zLCB1c2VDaGFpbklkV2hpbGVSZWNvdmVyaW5nUHViS2V5ID8gdGhpcy5nZXRDaGFpbklkKCkgOiB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhdGhpcy5fc2VuZGVyUHViS2V5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2lnbiBhIHRyYW5zYWN0aW9uIHdpdGggYSBnaXZlbiBwcml2YXRlIGtleVxuICAgICAqIEBwYXJhbSBwcml2YXRlS2V5IC0gTXVzdCBiZSAzMiBieXRlcyBpbiBsZW5ndGhcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgICAgIC8vIFdlIGNsZWFyIGFueSBwcmV2aW91cyBzaWduYXR1cmUgYmVmb3JlIHNpZ25pbmcgaXQuIE90aGVyd2lzZSwgX2ltcGxlbWVudHNFSVAxNTUncyBjYW4gZ2l2ZVxuICAgICAgICAvLyBkaWZmZXJlbnQgcmVzdWx0cyBpZiB0aGlzIHR4IHdhcyBhbHJlYWR5IHNpZ25lZC5cbiAgICAgICAgdGhpcy52ID0gbmV3IGJ1ZmZlcl8xLkJ1ZmZlcihbXSk7XG4gICAgICAgIHRoaXMucyA9IG5ldyBidWZmZXJfMS5CdWZmZXIoW10pO1xuICAgICAgICB0aGlzLnIgPSBuZXcgYnVmZmVyXzEuQnVmZmVyKFtdKTtcbiAgICAgICAgdmFyIG1zZ0hhc2ggPSB0aGlzLmhhc2goZmFsc2UpO1xuICAgICAgICB2YXIgc2lnID0gZXRoZXJldW1qc191dGlsXzEuZWNzaWduKG1zZ0hhc2gsIHByaXZhdGVLZXkpO1xuICAgICAgICBpZiAodGhpcy5faW1wbGVtZW50c0VJUDE1NSgpKSB7XG4gICAgICAgICAgICBzaWcudiArPSB0aGlzLmdldENoYWluSWQoKSAqIDIgKyA4O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgc2lnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgZ2FzIHBhaWQgZm9yIHRoZSBkYXRhIGluIHRoaXMgdHhcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuZ2V0RGF0YUZlZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnJhd1s1XTtcbiAgICAgICAgdmFyIGNvc3QgPSBuZXcgZXRoZXJldW1qc191dGlsXzEuQk4oMCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9PT0gMFxuICAgICAgICAgICAgICAgID8gY29zdC5pYWRkbih0aGlzLl9jb21tb24ucGFyYW0oJ2dhc1ByaWNlcycsICd0eERhdGFaZXJvJykpXG4gICAgICAgICAgICAgICAgOiBjb3N0LmlhZGRuKHRoaXMuX2NvbW1vbi5wYXJhbSgnZ2FzUHJpY2VzJywgJ3R4RGF0YU5vblplcm8nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0aGUgbWluaW11bSBhbW91bnQgb2YgZ2FzIHRoZSB0eCBtdXN0IGhhdmUgKERhdGFGZWUgKyBUeEZlZSArIENyZWF0aW9uIEZlZSlcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuZ2V0QmFzZUZlZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlZSA9IHRoaXMuZ2V0RGF0YUZlZSgpLmlhZGRuKHRoaXMuX2NvbW1vbi5wYXJhbSgnZ2FzUHJpY2VzJywgJ3R4JykpO1xuICAgICAgICBpZiAodGhpcy5fY29tbW9uLmd0ZUhhcmRmb3JrKCdob21lc3RlYWQnKSAmJiB0aGlzLnRvQ3JlYXRpb25BZGRyZXNzKCkpIHtcbiAgICAgICAgICAgIGZlZS5pYWRkbih0aGlzLl9jb21tb24ucGFyYW0oJ2dhc1ByaWNlcycsICd0eENyZWF0aW9uJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0aGUgdXAgZnJvbnQgYW1vdW50IHRoYXQgYW4gYWNjb3VudCBtdXN0IGhhdmUgZm9yIHRoaXMgdHJhbnNhY3Rpb24gdG8gYmUgdmFsaWRcbiAgICAgKi9cbiAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuZ2V0VXBmcm9udENvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgZXRoZXJldW1qc191dGlsXzEuQk4odGhpcy5nYXNMaW1pdCkuaW11bChuZXcgZXRoZXJldW1qc191dGlsXzEuQk4odGhpcy5nYXNQcmljZSkpLmlhZGQobmV3IGV0aGVyZXVtanNfdXRpbF8xLkJOKHRoaXMudmFsdWUpKTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIChzdHJpbmdFcnJvcikge1xuICAgICAgICBpZiAoc3RyaW5nRXJyb3IgPT09IHZvaWQgMCkgeyBzdHJpbmdFcnJvciA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLnZlcmlmeVNpZ25hdHVyZSgpKSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaCgnSW52YWxpZCBTaWduYXR1cmUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nZXRCYXNlRmVlKCkuY21wKG5ldyBldGhlcmV1bWpzX3V0aWxfMS5CTih0aGlzLmdhc0xpbWl0KSkgPiAwKSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChbXCJnYXMgbGltaXQgaXMgdG9vIGxvdy4gTmVlZCBhdCBsZWFzdCBcIiArIHRoaXMuZ2V0QmFzZUZlZSgpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmluZ0Vycm9yID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5sZW5ndGggPT09IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcmxwIGVuY29kaW5nIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgICAqL1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE5vdGU6IFRoaXMgbmV2ZXIgZ2V0cyBleGVjdXRlZCwgZGVmaW5lUHJvcGVydGllcyBvdmVyd3JpdGVzIGl0LlxuICAgICAgICByZXR1cm4gZXRoZXJldW1qc191dGlsXzEucmxwLmVuY29kZSh0aGlzLnJhdyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFuc2FjdGlvbiBpbiBKU09OIGZvcm1hdFxuICAgICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bWpzL2V0aGVyZXVtanMtdXRpbC9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI2RlZmluZXByb3BlcnRpZXN8ZXRoZXJldW1qcy11dGlsfVxuICAgICAqL1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAobGFiZWxzKSB7XG4gICAgICAgIGlmIChsYWJlbHMgPT09IHZvaWQgMCkgeyBsYWJlbHMgPSBmYWxzZTsgfVxuICAgICAgICAvLyBOb3RlOiBUaGlzIG5ldmVyIGdldHMgZXhlY3V0ZWQsIGRlZmluZVByb3BlcnRpZXMgb3ZlcndyaXRlcyBpdC5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLl92YWxpZGF0ZVYgPSBmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jb21tb24uZ3RlSGFyZGZvcmsoJ3NwdXJpb3VzRHJhZ29uJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdkludCA9IGV0aGVyZXVtanNfdXRpbF8xLmJ1ZmZlclRvSW50KHYpO1xuICAgICAgICBpZiAodkludCA9PT0gMjcgfHwgdkludCA9PT0gMjgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNWYWxpZEVJUDE1NVYgPSB2SW50ID09PSB0aGlzLmdldENoYWluSWQoKSAqIDIgKyAzNSB8fCB2SW50ID09PSB0aGlzLmdldENoYWluSWQoKSAqIDIgKyAzNjtcbiAgICAgICAgaWYgKCFpc1ZhbGlkRUlQMTU1Vikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb21wYXRpYmxlIEVJUDE1NS1iYXNlZCBWIFwiICsgdkludCArIFwiIGFuZCBjaGFpbiBpZCBcIiArIHRoaXMuZ2V0Q2hhaW5JZCgpICsgXCIuIFNlZSB0aGUgc2Vjb25kIHBhcmFtZXRlciBvZiB0aGUgVHJhbnNhY3Rpb24gY29uc3RydWN0b3IgdG8gc2V0IHRoZSBjaGFpbiBpZC5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5faXNTaWduZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnYubGVuZ3RoID4gMCAmJiB0aGlzLnIubGVuZ3RoID4gMCAmJiB0aGlzLnMubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5fb3ZlcnJpZGVWU2V0dGVyV2l0aFZhbGlkYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB2RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgJ3YnKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2JywgX19hc3NpZ24oe30sIHZEZXNjcmlwdG9yLCB7IHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl92YWxpZGF0ZVYoZXRoZXJldW1qc191dGlsXzEudG9CdWZmZXIodikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2RGVzY3JpcHRvci5zZXQodik7XG4gICAgICAgICAgICB9IH0pKTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5faW1wbGVtZW50c0VJUDE1NSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9uRUlQMTU1QmxvY2tPckxhdGVyID0gdGhpcy5fY29tbW9uLmd0ZUhhcmRmb3JrKCdzcHVyaW91c0RyYWdvbicpO1xuICAgICAgICBpZiAoIXRoaXMuX2lzU2lnbmVkKCkpIHtcbiAgICAgICAgICAgIC8vIFdlIHNpZ24gd2l0aCBFSVAxNTUgYWxsIHVuc2lnbmVkIHRyYW5zYWN0aW9ucyBhZnRlciBzcHVyaW91c0RyYWdvblxuICAgICAgICAgICAgcmV0dXJuIG9uRUlQMTU1QmxvY2tPckxhdGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVJUDE1NSBzcGVjOlxuICAgICAgICAvLyBJZiBibG9jay5udW1iZXIgPj0gMiw2NzUsMDAwIGFuZCB2ID0gQ0hBSU5fSUQgKiAyICsgMzUgb3IgdiA9IENIQUlOX0lEICogMiArIDM2LCB0aGVuIHdoZW4gY29tcHV0aW5nXG4gICAgICAgIC8vIHRoZSBoYXNoIG9mIGEgdHJhbnNhY3Rpb24gZm9yIHB1cnBvc2VzIG9mIHNpZ25pbmcgb3IgcmVjb3ZlcmluZywgaW5zdGVhZCBvZiBoYXNoaW5nIG9ubHkgdGhlIGZpcnN0IHNpeFxuICAgICAgICAvLyBlbGVtZW50cyAoaS5lLiBub25jZSwgZ2FzcHJpY2UsIHN0YXJ0Z2FzLCB0bywgdmFsdWUsIGRhdGEpLCBoYXNoIG5pbmUgZWxlbWVudHMsIHdpdGggdiByZXBsYWNlZCBieVxuICAgICAgICAvLyBDSEFJTl9JRCwgciA9IDAgYW5kIHMgPSAwLlxuICAgICAgICB2YXIgdiA9IGV0aGVyZXVtanNfdXRpbF8xLmJ1ZmZlclRvSW50KHRoaXMudik7XG4gICAgICAgIHZhciB2QW5kQ2hhaW5JZE1lZXRFSVAxNTVDb25kaXRpb25zID0gdiA9PT0gdGhpcy5nZXRDaGFpbklkKCkgKiAyICsgMzUgfHwgdiA9PT0gdGhpcy5nZXRDaGFpbklkKCkgKiAyICsgMzY7XG4gICAgICAgIHJldHVybiB2QW5kQ2hhaW5JZE1lZXRFSVAxNTVDb25kaXRpb25zICYmIG9uRUlQMTU1QmxvY2tPckxhdGVyO1xuICAgIH07XG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRyYW5zYWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNhY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIF9QbHVnaW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9wbHVnaW5zL1BsdWdpblwiKSk7XG5cbnZhciBQbHVnaW5UeXBlcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3BsdWdpbnMvUGx1Z2luVHlwZXNcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX05ldHdvcmsgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvYXBpL0FwaUFjdGlvbnNcIikpO1xuXG52YXIgX0tleVBhaXJTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIikpO1xuXG52YXIgX09iamVjdEhlbHBlcnMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3V0aWwvT2JqZWN0SGVscGVyc1wiKSk7XG5cbnZhciBfVG9rZW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9Ub2tlblwiKSk7XG5cbnZhciBfSGFyZHdhcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvSGFyZHdhcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9Ub2tlblNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvVG9rZW5TZXJ2aWNlXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9FdmVudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvRXZlbnRTZXJ2aWNlXCIpKTtcblxudmFyIF9TaWduaW5nU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL1NpZ25pbmdTZXJ2aWNlXCIpKTtcblxudmFyIF93ZWIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ3ZWIzXCIpKTtcblxudmFyIF93ZWIzUHJvdmlkZXJFbmdpbmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ3ZWIzLXByb3ZpZGVyLWVuZ2luZVwiKSk7XG5cbnZhciBfcnBjID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwid2ViMy1wcm92aWRlci1lbmdpbmUvc3VicHJvdmlkZXJzL3JwY1wiKSk7XG5cbnZhciBfaG9va2VkV2FsbGV0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwid2ViMy1wcm92aWRlci1lbmdpbmUvc3VicHJvdmlkZXJzL2hvb2tlZC13YWxsZXRcIikpO1xuXG52YXIgZXJjMjBhYmkgPSByZXF1aXJlKCcuL2VyYzIwJyk7XG5cbnZhciBFdGhUeCA9IHJlcXVpcmUoJ2V0aGVyZXVtanMtdHgnKS5UcmFuc2FjdGlvbjtcblxudmFyIGV0aFV0aWwgPSByZXF1aXJlKCdldGhlcmV1bWpzLXV0aWwnKTtcblxudmFyIHdlYjN1dGlsID0gbmV3IF93ZWJbXCJkZWZhdWx0XCJdKCk7XG5cbnZhciB0b0J1ZmZlciA9IGZ1bmN0aW9uIHRvQnVmZmVyKGtleSkge1xuICByZXR1cm4gZXRoVXRpbC50b0J1ZmZlcihldGhVdGlsLmFkZEhleFByZWZpeChrZXkpKTtcbn07XG5cbnZhciBjYWNoZWRJbnN0YW5jZXMgPSB7fTtcblxudmFyIGdldENhY2hlZEluc3RhbmNlID0gZnVuY3Rpb24gZ2V0Q2FjaGVkSW5zdGFuY2UobmV0d29yaykge1xuICB2YXIgd2FsbGV0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuICB2YXIga2V5ID0gbmV0d29yay51bmlxdWUoKSArICh3YWxsZXQgPyB3YWxsZXQuZ2V0QWNjb3VudHMoKVswXSA6ICcnKTtcbiAgaWYgKGNhY2hlZEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm4gY2FjaGVkSW5zdGFuY2VzW2tleV07ZWxzZSB7XG4gICAgdmFyIGVuZ2luZSA9IG5ldyBfd2ViM1Byb3ZpZGVyRW5naW5lW1wiZGVmYXVsdFwiXSgpO1xuICAgIHZhciB3ZWIzID0gbmV3IF93ZWJbXCJkZWZhdWx0XCJdKGVuZ2luZSk7XG4gICAgaWYgKHdhbGxldCkgZW5naW5lLmFkZFByb3ZpZGVyKG5ldyBfaG9va2VkV2FsbGV0W1wiZGVmYXVsdFwiXSh3YWxsZXQpKTtcbiAgICB2YXIgcnBjVXJsID0gbmV0d29yay5ob3N0ID09PSAnZXRobm9kZXMuZ2V0LXNjYXR0ZXIuY29tJyA/ICdodHRwczovL2NvbW1vbmx5LWNsYXNzaWMta2F0eWRpZC5xdWlrbm9kZS5pby9kMGJmOThlNy1hODY2LTQzZDQtYWM3MS0yMzk3ZmQxYjNhYmEvZFFzem55clpSZzJkcjREUUpOUERndz09LycgOiBuZXR3b3JrLmZ1bGxob3N0KCk7XG4gICAgZW5naW5lLmFkZFByb3ZpZGVyKG5ldyBfcnBjW1wiZGVmYXVsdFwiXSh7XG4gICAgICBycGNVcmw6IHJwY1VybFxuICAgIH0pKTtcbiAgICBlbmdpbmUuc3RhcnQoKTtcbiAgICBjYWNoZWRJbnN0YW5jZXNba2V5XSA9IFt3ZWIzLCBlbmdpbmVdO1xuICAgIHJldHVybiBjYWNoZWRJbnN0YW5jZXNba2V5XTtcbiAgfVxufTtcblxudmFyIGtpbGxDYWNoZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGtpbGxDYWNoZWRJbnN0YW5jZShuZXR3b3JrKSB7XG4gIHZhciB3YWxsZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gIHZhciBrZXkgPSBuZXR3b3JrLnVuaXF1ZSgpICsgKHdhbGxldCA/IHdhbGxldC5nZXRBY2NvdW50cygpWzBdIDogJycpO1xuXG4gIGlmIChjYWNoZWRJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIHZhciBfY2FjaGVkSW5zdGFuY2VzJGtleSA9ICgwLCBfc2xpY2VkVG9BcnJheTJbXCJkZWZhdWx0XCJdKShjYWNoZWRJbnN0YW5jZXNba2V5XSwgMiksXG4gICAgICAgIHdlYjMgPSBfY2FjaGVkSW5zdGFuY2VzJGtleVswXSxcbiAgICAgICAgZW5naW5lID0gX2NhY2hlZEluc3RhbmNlcyRrZXlbMV07XG5cbiAgICBlbmdpbmUuc3RvcCgpO1xuICAgIGRlbGV0ZSBjYWNoZWRJbnN0YW5jZXNba2V5XTtcbiAgfVxufTtcblxudmFyIEVYUExPUkVSID0ge1xuICBcIm5hbWVcIjogXCJFdGhlcnNjYW5cIixcbiAgXCJhY2NvdW50XCI6IFwiaHR0cHM6Ly9ldGhlcnNjYW4uaW8vYWRkcmVzcy97eH1cIixcbiAgXCJ0cmFuc2FjdGlvblwiOiBcImh0dHBzOi8vZXRoZXJzY2FuLmlvL3R4L3t4fVwiLFxuICBcImJsb2NrXCI6IFwiaHR0cHM6Ly9ldGhlcnNjYW4uaW8vYmxvY2sve3h9XCJcbn07XG5cbnZhciBzdHJ0b2RlYyA9IGZ1bmN0aW9uIHN0cnRvZGVjKGFtb3VudCwgZGVjKSB7XG4gIHZhciBzdHJpbmdmID0gXCJcIjtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlYzsgaSsrKSB7XG4gICAgc3RyaW5nZiA9IHN0cmluZ2YgKyBcIjBcIjtcbiAgfVxuXG4gIHJldHVybiBhbW91bnQgKyBzdHJpbmdmO1xufTtcblxudmFyIEVUSCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1BsdWdpbikge1xuICAoMCwgX2luaGVyaXRzMltcImRlZmF1bHRcIl0pKEVUSCwgX1BsdWdpbik7XG5cbiAgZnVuY3Rpb24gRVRIKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgRVRIKTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMltcImRlZmF1bHRcIl0pKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyW1wiZGVmYXVsdFwiXSkoRVRIKS5jYWxsKHRoaXMsIF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FVEgsIFBsdWdpblR5cGVzLkJMT0NLQ0hBSU5fU1VQUE9SVCkpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShFVEgsIFt7XG4gICAga2V5OiBcImJpcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaXAoKSB7XG4gICAgICByZXR1cm4gXCI0NCcvNjAnLzAnLzAvXCI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJ1c3RDYWNoZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBidXN0Q2FjaGUoKSB7XG4gICAgICBjYWNoZWRJbnN0YW5jZXMgPSB7fTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdEV4cGxvcmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRFeHBsb3JlcigpIHtcbiAgICAgIHJldHVybiBFWFBMT1JFUjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudEZvcm1hdHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY2NvdW50Rm9ybWF0dGVyKGFjY291bnQpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChhY2NvdW50LnB1YmxpY0tleSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJldHVybmFibGVBY2NvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJldHVybmFibGVBY2NvdW50KGFjY291bnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IGFjY291bnQucHVibGljS2V5LFxuICAgICAgICBibG9ja2NoYWluOiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuRVRIXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250cmFjdFBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRyYWN0UGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gJzB4Li4uLi4nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWNpcGllbnRMYWJlbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNpcGllbnRMYWJlbCgpIHtcbiAgICAgIHJldHVybiBcIkFkZHJlc3NcIjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tOZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrTmV0d29yayhuZXR3b3JrKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSksIC8vVE9ETzpcbiAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSldKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEVuZG9yc2VkTmV0d29yaygpIHtcbiAgICAgIHJldHVybiBuZXcgX05ldHdvcmtbXCJkZWZhdWx0XCJdKCdFVEggTWFpbm5ldCcsICdodHRwcycsICdldGhub2Rlcy5nZXQtc2NhdHRlci5jb20nLCA0NDMsIF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FVEgsICcxJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzRW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5kb3JzZWROZXR3b3JrKG5ldHdvcmspIHtcbiAgICAgIHZhciBlbmRvcnNlZE5ldHdvcmsgPSB0aGlzLmdldEVuZG9yc2VkTmV0d29yaygpO1xuICAgICAgcmV0dXJuIG5ldHdvcmsuYmxvY2tjaGFpbiA9PT0gX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVUSCAmJiBuZXR3b3JrLmNoYWluSWQgPT09IGVuZG9yc2VkTmV0d29yay5jaGFpbklkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDaGFpbklkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0Q2hhaW5JZCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKG5ldHdvcmspIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIDEpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0Q2hhaW5JZChfeCkge1xuICAgICAgICByZXR1cm4gX2dldENoYWluSWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldENoYWluSWQ7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwidXNlc1Jlc291cmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2VzUmVzb3VyY2VzKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYXNBY2NvdW50QWN0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNBY2NvdW50QWN0aW9ucygpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudHNBcmVJbXBvcnRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY2NvdW50c0FyZUltcG9ydGVkKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc1ZhbGlkUmVjaXBpZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWRSZWNpcGllbnQoYWRkcmVzcykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRQdWJsaWNLZXkoYWRkcmVzcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVUb1B1YmxpY1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcml2YXRlVG9QdWJsaWMocHJpdmF0ZUtleSkge1xuICAgICAgcmV0dXJuIGV0aFV0aWwuYWRkSGV4UHJlZml4KGV0aFV0aWwucHJpdmF0ZVRvQWRkcmVzcyh0b0J1ZmZlcihwcml2YXRlS2V5KSkudG9TdHJpbmcoJ2hleCcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmFsaWRQcml2YXRlS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkUHJpdmF0ZUtleShwcml2YXRlS2V5KSB7XG4gICAgICByZXR1cm4gcHJpdmF0ZUtleS5sZW5ndGggPT09IDY0ICYmIGV0aFV0aWwuaXNWYWxpZFByaXZhdGUodG9CdWZmZXIocHJpdmF0ZUtleSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ2YWxpZFB1YmxpY0tleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZFB1YmxpY0tleShwdWJsaWNLZXkpIHtcbiAgICAgIHJldHVybiBldGhVdGlsLmlzVmFsaWRBZGRyZXNzKHB1YmxpY0tleSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJ1ZmZlclRvSGV4UHJpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBidWZmZXJUb0hleFByaXZhdGUoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oYnVmZmVyKS50b1N0cmluZygnaGV4Jyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhleFByaXZhdGVUb0J1ZmZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoZXhQcml2YXRlVG9CdWZmZXIocHJpdmF0ZUtleSkge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHByaXZhdGVLZXksICdoZXgnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzVW50b3VjaGFibGVUb2tlbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzVW50b3VjaGFibGVUb2tlbnMoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJhbGFuY2VGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9iYWxhbmNlRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGFjY291bnQsIHRva2VuKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHdlYjMsXG4gICAgICAgICAgICBraWxsSW5zdGFuY2UsXG4gICAgICAgICAgICBiYWxhbmNlLFxuICAgICAgICAgICAgX2dldENhY2hlZEluc3RhbmNlLFxuICAgICAgICAgICAgX2dldENhY2hlZEluc3RhbmNlMixcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBlLFxuICAgICAgICAgICAgX2FyZ3MzID0gYXJndW1lbnRzO1xuXG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMkKF9jb250ZXh0Mykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdlYjMgPSBfYXJnczMubGVuZ3RoID4gMiAmJiBfYXJnczNbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzM1syXSA6IG51bGw7XG4gICAgICAgICAgICAgICAga2lsbEluc3RhbmNlID0gIXdlYjM7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXdlYjMpIHtcbiAgICAgICAgICAgICAgICAgIF9nZXRDYWNoZWRJbnN0YW5jZSA9IGdldENhY2hlZEluc3RhbmNlKGFjY291bnQubmV0d29yaygpKSwgX2dldENhY2hlZEluc3RhbmNlMiA9ICgwLCBfc2xpY2VkVG9BcnJheTJbXCJkZWZhdWx0XCJdKShfZ2V0Q2FjaGVkSW5zdGFuY2UsIDIpLCB3ID0gX2dldENhY2hlZEluc3RhbmNlMlswXSwgZSA9IF9nZXRDYWNoZWRJbnN0YW5jZTJbMV07XG4gICAgICAgICAgICAgICAgICB3ZWIzID0gZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDAwKTtcbiAgICAgICAgICAgICAgICB9KSwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyYWN0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0b2tlbi51bmlxdWVXaXRoQ2hhaW4oKSA9PT0gX3RoaXMuZGVmYXVsdFRva2VuKCkudW5pcXVlV2l0aENoYWluKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLnQwID0gd2ViMy51dGlscztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdlYjMuZXRoLmdldEJhbGFuY2UoYWNjb3VudC5wdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIudDEgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi50MC5mcm9tV2VpLmNhbGwoX2NvbnRleHQyLnQwLCBfY29udGV4dDIudDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlID0gX2NvbnRleHQyLnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0ID0gbmV3IHdlYjMuZXRoLkNvbnRyYWN0KGVyYzIwYWJpLCB0b2tlbi5jb250cmFjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLnByZXYgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIudDIgPSBfVG9rZW5TZXJ2aWNlW1wiZGVmYXVsdFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250cmFjdC5tZXRob2RzLmJhbGFuY2VPZihhY2NvdW50LnNlbmRhYmxlKCkpLmNhbGwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi50MyA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi50NCA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbGFuY2UgPSBfY29udGV4dDIudDIuZm9ybWF0QW1vdW50LmNhbGwoX2NvbnRleHQyLnQyLCBfY29udGV4dDIudDMsIF9jb250ZXh0Mi50NCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5wcmV2ID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLnQ1ID0gX2NvbnRleHQyW1wiY2F0Y2hcIl0oMTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcIi5jb25jYXQodG9rZW4ubmFtZSwgXCIgaXMgbm90IGFuIEVSQzIwIHRva2VuXCIpLCBfY29udGV4dDIudDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbGFuY2UgPSBfVG9rZW5TZXJ2aWNlW1wiZGVmYXVsdFwiXS5mb3JtYXRBbW91bnQoJzAnLCB0b2tlbiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTIsIG51bGwsIFtbMTEsIDIwXV0pO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94NCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpXSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGlmIChraWxsSW5zdGFuY2UpIGtpbGxDYWNoZWRJbnN0YW5jZShhY2NvdW50Lm5ldHdvcmsoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgYmFsYW5jZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJhbGFuY2VGb3IoX3gyLCBfeDMpIHtcbiAgICAgICAgcmV0dXJuIF9iYWxhbmNlRm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiYWxhbmNlRm9yO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImJhbGFuY2VzRm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYmFsYW5jZXNGb3IgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQoYWNjb3VudCwgdG9rZW5zKSB7XG4gICAgICAgIHZhciBfZ2V0Q2FjaGVkSW5zdGFuY2UzLCBfZ2V0Q2FjaGVkSW5zdGFuY2U0LCB3ZWIzLCBlbmdpbmUsIGJhbGFuY2VzLCBpLCB0O1xuXG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTQkKF9jb250ZXh0NCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NC5wcmV2ID0gX2NvbnRleHQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9nZXRDYWNoZWRJbnN0YW5jZTMgPSBnZXRDYWNoZWRJbnN0YW5jZShhY2NvdW50Lm5ldHdvcmsoKSksIF9nZXRDYWNoZWRJbnN0YW5jZTQgPSAoMCwgX3NsaWNlZFRvQXJyYXkyW1wiZGVmYXVsdFwiXSkoX2dldENhY2hlZEluc3RhbmNlMywgMiksIHdlYjMgPSBfZ2V0Q2FjaGVkSW5zdGFuY2U0WzBdLCBlbmdpbmUgPSBfZ2V0Q2FjaGVkSW5zdGFuY2U0WzFdO1xuICAgICAgICAgICAgICAgIGJhbGFuY2VzID0gW107XG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGlmICghKGkgPCB0b2tlbnMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHQgPSB0b2tlbnNbaV0uY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFsYW5jZUZvcihhY2NvdW50LCB0b2tlbnNbaV0sIHdlYjMpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICB0LmFtb3VudCA9IF9jb250ZXh0NC5zZW50O1xuICAgICAgICAgICAgICAgIHQuY2hhaW5JZCA9IGFjY291bnQubmV0d29yaygpLmNoYWluSWQ7XG4gICAgICAgICAgICAgICAgYmFsYW5jZXMucHVzaCh0KTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICBraWxsQ2FjaGVkSW5zdGFuY2UoYWNjb3VudC5uZXR3b3JrKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsIGJhbGFuY2VzKTtcblxuICAgICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJhbGFuY2VzRm9yKF94NSwgX3g2KSB7XG4gICAgICAgIHJldHVybiBfYmFsYW5jZXNGb3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJhbGFuY2VzRm9yO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHREZWNpbWFsc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0RGVjaW1hbHMoKSB7XG4gICAgICByZXR1cm4gMTg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRUb2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VG9rZW4oKSB7XG4gICAgICByZXR1cm4gbmV3IF9Ub2tlbltcImRlZmF1bHRcIl0oX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVUSCwgJ2V0aCcsICdFVEgnLCAnRVRIJywgdGhpcy5kZWZhdWx0RGVjaW1hbHMoKSwgJzEnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWN0aW9uUGFydGljaXBhbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFjdGlvblBhcnRpY2lwYW50cyhwYXlsb2FkKSB7XG4gICAgICByZXR1cm4gX09iamVjdEhlbHBlcnNbXCJkZWZhdWx0XCJdLmZsYXR0ZW4ocGF5bG9hZC5tZXNzYWdlcy5tYXAoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuYXV0aG9yaXphdGlvbjtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhbnNmZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90cmFuc2ZlciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNyhfcmVmMikge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgYWNjb3VudCwgdG8sIGFtb3VudCwgdG9rZW4sIF9yZWYyJHByb21wdEZvclNpZ25hdCwgcHJvbXB0Rm9yU2lnbmF0dXJlLCBjb250cmFjdCwgc3ltYm9sLCBpc0V0aDtcblxuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBhY2NvdW50ID0gX3JlZjIuYWNjb3VudCwgdG8gPSBfcmVmMi50bywgYW1vdW50ID0gX3JlZjIuYW1vdW50LCB0b2tlbiA9IF9yZWYyLnRva2VuLCBfcmVmMiRwcm9tcHRGb3JTaWduYXQgPSBfcmVmMi5wcm9tcHRGb3JTaWduYXR1cmUsIHByb21wdEZvclNpZ25hdHVyZSA9IF9yZWYyJHByb21wdEZvclNpZ25hdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYyJHByb21wdEZvclNpZ25hdDtcbiAgICAgICAgICAgICAgICBjb250cmFjdCA9IHRva2VuLmNvbnRyYWN0LCBzeW1ib2wgPSB0b2tlbi5zeW1ib2w7XG4gICAgICAgICAgICAgICAgaXNFdGggPSB0b2tlbi51bmlxdWVXaXRoQ2hhaW4oKSA9PT0gdGhpcy5kZWZhdWx0VG9rZW4oKS51bmlxdWVXaXRoQ2hhaW4oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU2KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2FsbGV0LCBmaW5pc2hlZCwgX2dldENhY2hlZEluc3RhbmNlNSwgX2dldENhY2hlZEluc3RhbmNlNiwgd2ViMywgZW5naW5lLCB2YWx1ZSwgX3ZhbHVlLCBfY29udHJhY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ2LnByZXYgPSBfY29udGV4dDYubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0ID0gbmV3IFNjYXR0ZXJFdGhlcmV1bVdhbGxldChhY2NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTUodHJhbnNhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkLCBzaWduYXR1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU1JChfY29udGV4dDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDUucHJldiA9IF9jb250ZXh0NS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tjaGFpbjogX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLlRSWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcms6IGFjY291bnQubmV0d29yaygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJpOiBpc0V0aCA/IG51bGwgOiBlcmMyMGFiaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByb21wdEZvclNpZ25hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuc2lnbmVyV2l0aFBvcHVwKHBheWxvYWQsIGFjY291bnQsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoZWQoeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUudDAgPSBfY29udGV4dDUuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TaWduaW5nU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihhY2NvdW50Lm5ldHdvcmsoKSwgcGF5bG9hZCwgYWNjb3VudC5wdWJsaWNLZXksIGZhbHNlLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS50MCA9IF9jb250ZXh0NS5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlcyA9IF9jb250ZXh0NS50MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKG51bGwsIHNpZ25hdHVyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIHNpZ25hdHVyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEwLCBfeDExKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoZWQgPSBmdW5jdGlvbiBmaW5pc2hlZCh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraWxsQ2FjaGVkSW5zdGFuY2UoYWNjb3VudC5uZXR3b3JrKCksIHdhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZ2V0Q2FjaGVkSW5zdGFuY2U1ID0gZ2V0Q2FjaGVkSW5zdGFuY2UoYWNjb3VudC5uZXR3b3JrKCksIHdhbGxldCksIF9nZXRDYWNoZWRJbnN0YW5jZTYgPSAoMCwgX3NsaWNlZFRvQXJyYXkyW1wiZGVmYXVsdFwiXSkoX2dldENhY2hlZEluc3RhbmNlNSwgMiksIHdlYjMgPSBfZ2V0Q2FjaGVkSW5zdGFuY2U2WzBdLCBlbmdpbmUgPSBfZ2V0Q2FjaGVkSW5zdGFuY2U2WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHdlYjN1dGlsLnV0aWxzLnRvV2VpKGFtb3VudC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViMy5ldGguc2VuZFRyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBhY2NvdW50LnB1YmxpY0tleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uKCd0cmFuc2FjdGlvbkhhc2gnLCBmdW5jdGlvbiAodHJhbnNhY3Rpb25IYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaGVkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uSGFzaDogdHJhbnNhY3Rpb25IYXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5pc2hlZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBzdHJ0b2RlYyhhbW91bnQudG9TdHJpbmcoKSwgdG9rZW4uZGVjaW1hbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udHJhY3QgPSBuZXcgd2ViMy5ldGguQ29udHJhY3QoZXJjMjBhYmksIHRva2VuLmNvbnRyYWN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogYWNjb3VudC5zZW5kYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250cmFjdC5tZXRob2RzLnRyYW5zZmVyKHRvLCBfdmFsdWUpLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhc0xpbWl0OiAyNTAwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkub24oJ3RyYW5zYWN0aW9uSGFzaCcsIGZ1bmN0aW9uICh0cmFuc2FjdGlvbkhhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoZWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25IYXNoOiB0cmFuc2FjdGlvbkhhc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaGVkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5pc2hlZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlNik7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g4LCBfeDkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTcsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB0cmFuc2ZlcihfeDcpIHtcbiAgICAgICAgcmV0dXJuIF90cmFuc2Zlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNmZXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwic2lnbmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2lnbmVyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU4KHRyYW5zYWN0aW9uLCBwdWJsaWNLZXkpIHtcbiAgICAgICAgdmFyIGFyYml0cmFyeSxcbiAgICAgICAgICAgIGlzSGFzaCxcbiAgICAgICAgICAgIHByaXZhdGVLZXksXG4gICAgICAgICAgICB0eCxcbiAgICAgICAgICAgIGZvcm1hdHRlZEtleSxcbiAgICAgICAgICAgIF9hcmdzOCA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYXJiaXRyYXJ5ID0gX2FyZ3M4Lmxlbmd0aCA+IDIgJiYgX2FyZ3M4WzJdICE9PSB1bmRlZmluZWQgPyBfYXJnczhbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc0hhc2ggPSBfYXJnczgubGVuZ3RoID4gMyAmJiBfYXJnczhbM10gIT09IHVuZGVmaW5lZCA/IF9hcmdzOFszXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBfYXJnczgubGVuZ3RoID4gNCAmJiBfYXJnczhbNF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzOFs0XSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJpdmF0ZUtleSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgIHJldHVybiBfS2V5UGFpclNlcnZpY2VbXCJkZWZhdWx0XCJdLnB1YmxpY1RvUHJpdmF0ZShwdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBwcml2YXRlS2V5ID0gX2NvbnRleHQ4LnNlbnQ7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGlmIChwcml2YXRlS2V5KSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDgubmV4dCA9IDk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgdHggPSBuZXcgRXRoVHgodHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZEtleSA9IGV0aFV0aWwuYWRkSGV4UHJlZml4KHByaXZhdGVLZXkpO1xuICAgICAgICAgICAgICAgIHR4LnNpZ24oZXRoVXRpbC50b0J1ZmZlcihmb3JtYXR0ZWRLZXkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCBldGhVdGlsLmFkZEhleFByZWZpeCh0eC5zZXJpYWxpemUoKS50b1N0cmluZygnaGV4JykpKTtcblxuICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlOCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHNpZ25lcihfeDEyLCBfeDEzKSB7XG4gICAgICAgIHJldHVybiBfc2lnbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWduZXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwic2lnbmVyV2l0aFBvcHVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2lnbmVyV2l0aFBvcHVwID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxMShwYXlsb2FkLCBhY2NvdW50LCByZWplY3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgdG9rZW4sXG4gICAgICAgICAgICBfYXJnczExID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMSQoX2NvbnRleHQxMSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTEucHJldiA9IF9jb250ZXh0MTEubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBfYXJnczExLmxlbmd0aCA+IDMgJiYgX2FyZ3MxMVszXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MxMVszXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZjUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEwKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEwJChfY29udGV4dDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMC5wcmV2ID0gX2NvbnRleHQxMC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczMucmVxdWVzdFBhcnNlcihwYXlsb2FkLnRyYW5zYWN0aW9uLCBwYXlsb2FkLmhhc093blByb3BlcnR5KCdhYmknKSA/IHBheWxvYWQuYWJpIDogbnVsbCwgdG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2VzID0gX2NvbnRleHQxMC5zZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaWRlbnRpdHlLZXkgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmlkZW50aXRpZXNbMF0ucHVibGljS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQucGFydGljaXBhbnRzID0gW2FjY291bnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQubmV0d29yayA9IGFjY291bnQubmV0d29yaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQub3JpZ2luID0gJ1NjYXR0ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiBwYXlsb2FkLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBY3Rpb25zLlNJR04sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCByZXF1ZXN0KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjcgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTkoX3JlZjYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgc2lnbmF0dXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU5JChfY29udGV4dDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDkucHJldiA9IF9jb250ZXh0OS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmNi5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISghcmVzdWx0IHx8ICFyZXN1bHQuYWNjZXB0ZWQgfHwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LmFicnVwdChcInJldHVyblwiLCByZWplY3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0NvdWxkIG5vdCBnZXQgc2lnbmF0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX0tleVBhaXJTZXJ2aWNlW1wiZGVmYXVsdFwiXS5pc0hhcmR3YXJlKGFjY291bnQucHVibGljS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0hhcmR3YXJlU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihhY2NvdW50LCBwYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlID0gX2NvbnRleHQ5LnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TaWduaW5nU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihwYXlsb2FkLm5ldHdvcmssIHBheWxvYWQudHJhbnNhY3Rpb24sIGFjY291bnQucHVibGljS2V5LCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSA9IF9jb250ZXh0OS5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuYWJydXB0KFwicmV0dXJuXCIsIHJlamVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAnQ291bGQgbm90IGdldCBzaWduYXR1cmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzaWduYXR1cmUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCksIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxMCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxNykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTExKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2lnbmVyV2l0aFBvcHVwKF94MTQsIF94MTUsIF94MTYpIHtcbiAgICAgICAgcmV0dXJuIF9zaWduZXJXaXRoUG9wdXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNpZ25lcldpdGhQb3B1cDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0UGFyc2VyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcmVxdWVzdFBhcnNlciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTIodHJhbnNhY3Rpb24sIGFiaSkge1xuICAgICAgICB2YXIgdG9rZW4sXG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBtZXRob2RBQkksXG4gICAgICAgICAgICB0cmltbWVkRGF0YSxcbiAgICAgICAgICAgIGgybixcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICB2YWx1ZVBhcmFtLFxuICAgICAgICAgICAgb2JqUGFyYW0sXG4gICAgICAgICAgICBfYXJnczEyID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMiQoX2NvbnRleHQxMikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTIucHJldiA9IF9jb250ZXh0MTIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBfYXJnczEyLmxlbmd0aCA+IDIgJiYgX2FyZ3MxMlsyXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MxMlsyXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoIWFiaSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMi5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZXRob2RBQkkgPSBhYmkuZmluZChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb24uZGF0YS5pbmRleE9mKG1ldGhvZC5zaWduYXR1cmUpICE9PSAtMTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2RBQkkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvci5zaWduYXR1cmVFcnJvcignbm9fYWJpX21ldGhvZCcsIFwiTm8gbWV0aG9kIHNpZ25hdHVyZSBvbiB0aGUgYWJpIHlvdSBwcm92aWRlZCBtYXRjaGVkIHRoZSBkYXRhIGZvciB0aGlzIHRyYW5zYWN0aW9uXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICB0cmltbWVkRGF0YSA9IHRyYW5zYWN0aW9uLmRhdGEucmVwbGFjZShtZXRob2RBQkkuc2lnbmF0dXJlLCAnJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRyaW1tZWREYXRhLmluZGV4T2YoJzB4JykgIT09IDApIHRyaW1tZWREYXRhID0gJzB4JyArIHRyaW1tZWREYXRhO1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHdlYjN1dGlsLmV0aC5hYmkuZGVjb2RlUGFyYW1ldGVycyhtZXRob2RBQkkuaW5wdXRzLCB0cmltbWVkRGF0YSk7IC8vLnJlcGxhY2UobWV0aG9kQUJJLnNpZ25hdHVyZSwgJycpXG5cbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChtZXRob2RBQkkuaW5wdXRzLm1hcChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICB9KS5pbmNsdWRlcyhrZXkpKSBhY2Nba2V5XSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICBoMm4gPSB3ZWIzdXRpbC51dGlscy5oZXhUb051bWJlclN0cmluZztcbiAgICAgICAgICAgICAgICBkYXRhID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcbiAgICAgICAgICAgICAgICAgIC8vIGdhczpoMm4odHJhbnNhY3Rpb24uZ2FzKSxcbiAgICAgICAgICAgICAgICAgIGdhc0xpbWl0OiBoMm4odHJhbnNhY3Rpb24uZ2FzTGltaXQpLFxuICAgICAgICAgICAgICAgICAgZ2FzUHJpY2U6IHdlYjN1dGlsLnV0aWxzLmZyb21XZWkoaDJuKHRyYW5zYWN0aW9uLmdhc1ByaWNlKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YWx1ZVBhcmFtID0gZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/ICd2YWx1ZScgOiBkYXRhLmhhc093blByb3BlcnR5KCdfdmFsdWUnKSA/ICdfdmFsdWUnIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbdmFsdWVQYXJhbV0gPT09IFwibnVtYmVyXCIgJiYgZGF0YVt2YWx1ZVBhcmFtXSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVt2YWx1ZVBhcmFtXSA9IGgybihkYXRhW3ZhbHVlUGFyYW1dKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKCgwLCBfdHlwZW9mMltcImRlZmF1bHRcIl0pKGRhdGFbdmFsdWVQYXJhbV0pID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialBhcmFtID0gZGF0YVt2YWx1ZVBhcmFtXS5oYXNPd25Qcm9wZXJ0eSgnaGV4JykgPyAnaGV4JyA6IGRhdGFbdmFsdWVQYXJhbV0uaGFzT3duUHJvcGVydHkoJ19oZXgnKSA/ICdfaGV4JyA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpQYXJhbSkgZGF0YVt2YWx1ZVBhcmFtXSA9IGRhdGFbdmFsdWVQYXJhbV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgJiYgdHJhbnNhY3Rpb24udmFsdWUgPiAwKSBkYXRhLnZhbHVlID0gd2ViM3V0aWwudXRpbHMuZnJvbVdlaShoMm4odHJhbnNhY3Rpb24udmFsdWUpKSArICcgRVRIJztcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMi5hYnJ1cHQoXCJyZXR1cm5cIiwgW3tcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICBjb2RlOiB0b2tlbiA/IHRva2VuLm5hbWUgOiB0cmFuc2FjdGlvbi50byxcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFiaSA/IG1ldGhvZEFCSS5uYW1lIDogJ3RyYW5zZmVyJyxcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHRyYW5zYWN0aW9uLmZyb21cbiAgICAgICAgICAgICAgICB9XSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUxMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlcXVlc3RQYXJzZXIoX3gxOSwgX3gyMCkge1xuICAgICAgICByZXR1cm4gX3JlcXVlc3RQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3RQYXJzZXI7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIEVUSDtcbn0oX1BsdWdpbjJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFVEg7XG5cbnZhciBTY2F0dGVyRXRoZXJldW1XYWxsZXQgPSBmdW5jdGlvbiBTY2F0dGVyRXRoZXJldW1XYWxsZXQoYWNjb3VudCwgc2lnbmVyKSB7XG4gICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgU2NhdHRlckV0aGVyZXVtV2FsbGV0KTtcbiAgdGhpcy5zaWduVHJhbnNhY3Rpb24gPSBzaWduZXI7XG5cbiAgdGhpcy5nZXRBY2NvdW50cyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciBhY2NvdW50cyA9IFthY2NvdW50LnNlbmRhYmxlKCldO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sobnVsbCwgYWNjb3VudHMpO1xuICAgIHJldHVybiBhY2NvdW50cztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcbiAgICAvLyBnbG9iYWwga2V5IGZvciB1c2VyIHByZWZlcnJlZCByZWdpc3RyYXRpb25cbnZhciBSRUdJU1RSQVRJT05fS0VZID0gJ0BAYW55LXByb21pc2UvUkVHSVNUUkFUSU9OJyxcbiAgICAvLyBQcmlvciByZWdpc3RyYXRpb24gKHByZWZlcnJlZCBvciBkZXRlY3RlZClcbiAgICByZWdpc3RlcmVkID0gbnVsbFxuXG4vKipcbiAqIFJlZ2lzdGVycyB0aGUgZ2l2ZW4gaW1wbGVtZW50YXRpb24uICBBbiBpbXBsZW1lbnRhdGlvbiBtdXN0XG4gKiBiZSByZWdpc3RlcmVkIHByaW9yIHRvIGFueSBjYWxsIHRvIGByZXF1aXJlKFwiYW55LXByb21pc2VcIilgLFxuICogdHlwaWNhbGx5IG9uIGFwcGxpY2F0aW9uIGxvYWQuXG4gKlxuICogSWYgY2FsbGVkIHdpdGggbm8gYXJndW1lbnRzLCB3aWxsIHJldHVybiByZWdpc3RyYXRpb24gaW5cbiAqIGZvbGxvd2luZyBwcmlvcml0eTpcbiAqXG4gKiBGb3IgTm9kZS5qczpcbiAqXG4gKiAxLiBQcmV2aW91cyByZWdpc3RyYXRpb25cbiAqIDIuIGdsb2JhbC5Qcm9taXNlIGlmIG5vZGUuanMgdmVyc2lvbiA+PSAwLjEyXG4gKiAzLiBBdXRvIGRldGVjdGVkIHByb21pc2UgYmFzZWQgb24gZmlyc3Qgc3VjZXNzZnVsIHJlcXVpcmUgb2ZcbiAqICAgIGtub3duIHByb21pc2UgbGlicmFyaWVzLiBOb3RlIHRoaXMgaXMgYSBsYXN0IHJlc29ydCwgYXMgdGhlXG4gKiAgICBsb2FkZWQgbGlicmFyeSBpcyBub24tZGV0ZXJtaW5pc3RpYy4gbm9kZS5qcyA+PSAwLjEyIHdpbGxcbiAqICAgIGFsd2F5cyB1c2UgZ2xvYmFsLlByb21pc2Ugb3ZlciB0aGlzIHByaW9yaXR5IGxpc3QuXG4gKiA0LiBUaHJvd3MgZXJyb3IuXG4gKlxuICogRm9yIEJyb3dzZXI6XG4gKlxuICogMS4gUHJldmlvdXMgcmVnaXN0cmF0aW9uXG4gKiAyLiB3aW5kb3cuUHJvbWlzZVxuICogMy4gVGhyb3dzIGVycm9yLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogUHJvbWlzZTogRGVzaXJlZCBQcm9taXNlIGNvbnN0cnVjdG9yXG4gKiBnbG9iYWw6IEJvb2xlYW4gLSBTaG91bGQgdGhlIHJlZ2lzdHJhdGlvbiBiZSBjYWNoZWQgaW4gYSBnbG9iYWwgdmFyaWFibGUgdG9cbiAqIGFsbG93IGNyb3NzIGRlcGVuZGVuY3kvYnVuZGxlIHJlZ2lzdHJhdGlvbj8gIChkZWZhdWx0IHRydWUpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocm9vdCwgbG9hZEltcGxlbWVudGF0aW9uKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlZ2lzdGVyKGltcGxlbWVudGF0aW9uLCBvcHRzKXtcbiAgICBpbXBsZW1lbnRhdGlvbiA9IGltcGxlbWVudGF0aW9uIHx8IG51bGxcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIC8vIGdsb2JhbCByZWdpc3RyYXRpb24gdW5sZXNzIGV4cGxpY2l0bHkgIHtnbG9iYWw6IGZhbHNlfSBpbiBvcHRpb25zIChkZWZhdWx0IHRydWUpXG4gICAgdmFyIHJlZ2lzdGVyR2xvYmFsID0gb3B0cy5nbG9iYWwgIT09IGZhbHNlO1xuXG4gICAgLy8gbG9hZCBhbnkgcHJldmlvdXMgZ2xvYmFsIHJlZ2lzdHJhdGlvblxuICAgIGlmKHJlZ2lzdGVyZWQgPT09IG51bGwgJiYgcmVnaXN0ZXJHbG9iYWwpe1xuICAgICAgcmVnaXN0ZXJlZCA9IHJvb3RbUkVHSVNUUkFUSU9OX0tFWV0gfHwgbnVsbFxuICAgIH1cblxuICAgIGlmKHJlZ2lzdGVyZWQgIT09IG51bGxcbiAgICAgICAgJiYgaW1wbGVtZW50YXRpb24gIT09IG51bGxcbiAgICAgICAgJiYgcmVnaXN0ZXJlZC5pbXBsZW1lbnRhdGlvbiAhPT0gaW1wbGVtZW50YXRpb24pe1xuICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYXR0ZW1wdGluZyB0byByZWRlZmluZSBpbXBsZW1lbnRhdGlvblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhbnktcHJvbWlzZSBhbHJlYWR5IGRlZmluZWQgYXMgXCInK3JlZ2lzdGVyZWQuaW1wbGVtZW50YXRpb24rXG4gICAgICAgICdcIi4gIFlvdSBjYW4gb25seSByZWdpc3RlciBhbiBpbXBsZW1lbnRhdGlvbiBiZWZvcmUgdGhlIGZpcnN0ICcrXG4gICAgICAgICcgY2FsbCB0byByZXF1aXJlKFwiYW55LXByb21pc2VcIikgYW5kIGFuIGltcGxlbWVudGF0aW9uIGNhbm5vdCBiZSBjaGFuZ2VkJylcbiAgICB9XG5cbiAgICBpZihyZWdpc3RlcmVkID09PSBudWxsKXtcbiAgICAgIC8vIHVzZSBwcm92aWRlZCBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYoaW1wbGVtZW50YXRpb24gIT09IG51bGwgJiYgdHlwZW9mIG9wdHMuUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICByZWdpc3RlcmVkID0ge1xuICAgICAgICAgIFByb21pc2U6IG9wdHMuUHJvbWlzZSxcbiAgICAgICAgICBpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb25cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVxdWlyZSBpbXBsZW1lbnRhdGlvbiBpZiBpbXBsZW1lbnRhdGlvbiBpcyBzcGVjaWZpZWQgYnV0IG5vdCBwcm92aWRlZFxuICAgICAgICByZWdpc3RlcmVkID0gbG9hZEltcGxlbWVudGF0aW9uKGltcGxlbWVudGF0aW9uKVxuICAgICAgfVxuXG4gICAgICBpZihyZWdpc3Rlckdsb2JhbCl7XG4gICAgICAgIC8vIHJlZ2lzdGVyIHByZWZlcmVuY2UgZ2xvYmFsbHkgaW4gY2FzZSBtdWx0aXBsZSBpbnN0YWxsYXRpb25zXG4gICAgICAgIHJvb3RbUkVHSVNUUkFUSU9OX0tFWV0gPSByZWdpc3RlcmVkXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlZ2lzdGVyJykoKS5Qcm9taXNlXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX1BsdWdpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3BsdWdpbnMvUGx1Z2luXCIpKTtcblxudmFyIFBsdWdpblR5cGVzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvcGx1Z2lucy9QbHVnaW5UeXBlc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2FwaS9BcGlBY3Rpb25zXCIpKTtcblxudmFyIF9CbG9ja2NoYWlucyA9IHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9CbG9ja2NoYWluc1wiKTtcblxudmFyIF9OZXR3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvTmV0d29ya1wiKSk7XG5cbnZhciBfS2V5UGFpclNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9LZXlQYWlyU2VydmljZVwiKSk7XG5cbnZhciBfVG9rZW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9Ub2tlblwiKSk7XG5cbnZhciBfSGFyZHdhcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvSGFyZHdhcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9Ub2tlblNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvVG9rZW5TZXJ2aWNlXCIpKTtcblxudmFyIF9FdmVudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvRXZlbnRTZXJ2aWNlXCIpKTtcblxudmFyIF9TaWduaW5nU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL1NpZ25pbmdTZXJ2aWNlXCIpKTtcblxudmFyIF90cm9ud2ViID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidHJvbndlYlwiKSk7XG5cbnZhciBldGhVdGlsID0gcmVxdWlyZSgnZXRoZXJldW1qcy11dGlsJyk7XG5cbnZhciB0b0J1ZmZlciA9IGZ1bmN0aW9uIHRvQnVmZmVyKGtleSkge1xuICByZXR1cm4gZXRoVXRpbC50b0J1ZmZlcihldGhVdGlsLmFkZEhleFByZWZpeChrZXkpKTtcbn07XG5cbnZhciB1dGlsczsgLy8gY29uc3QgdXRpbHMgPSB0cm9uV2ViLnV0aWxzO1xuXG52YXIgY2FjaGVkSW5zdGFuY2VzID0ge307XG5cbnZhciBnZXRDYWNoZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGdldENhY2hlZEluc3RhbmNlKG5ldHdvcmspIHtcbiAgaWYgKGNhY2hlZEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShuZXR3b3JrLnVuaXF1ZSgpKSkgcmV0dXJuIGNhY2hlZEluc3RhbmNlc1tuZXR3b3JrLnVuaXF1ZSgpXTtlbHNlIHtcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgX3Ryb253ZWJbXCJkZWZhdWx0XCJdLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIobmV0d29yay5mdWxsaG9zdCgpKTtcbiAgICB2YXIgdHJvbldlYiA9IG5ldyBfdHJvbndlYltcImRlZmF1bHRcIl0ocHJvdmlkZXIsIHByb3ZpZGVyLCBuZXR3b3JrLmZ1bGxob3N0KCkpO1xuICAgIGNhY2hlZEluc3RhbmNlc1tuZXR3b3JrLnVuaXF1ZSgpXSA9IHRyb25XZWI7XG4gICAgcmV0dXJuIHRyb25XZWI7XG4gIH1cbn07XG5cbnZhciBFWFBMT1JFUiA9IHtcbiAgXCJuYW1lXCI6IFwiVHJvbnNjYW5cIixcbiAgXCJhY2NvdW50XCI6IFwiaHR0cHM6Ly90cm9uc2Nhbi5vcmcvIy9hZGRyZXNzL3t4fVwiLFxuICBcInRyYW5zYWN0aW9uXCI6IFwiaHR0cHM6Ly90cm9uc2Nhbi5vcmcvIy90cmFuc2FjdGlvbi97eH1cIixcbiAgXCJibG9ja1wiOiBcImh0dHBzOi8vdHJvbnNjYW4ub3JnLyMvYmxvY2sve3h9XCJcbn07XG5cbnZhciBUUlggPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9QbHVnaW4pIHtcbiAgKDAsIF9pbmhlcml0czJbXCJkZWZhdWx0XCJdKShUUlgsIF9QbHVnaW4pO1xuXG4gIGZ1bmN0aW9uIFRSWCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFRSWCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMltcImRlZmF1bHRcIl0pKFRSWCkuY2FsbCh0aGlzLCBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuVFJYLCBQbHVnaW5UeXBlcy5CTE9DS0NIQUlOX1NVUFBPUlQpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoVFJYLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgRFVNTVlfTkVUID0gJ2h0dHBzOi8vYXBpLnNoYXN0YS50cm9uZ3JpZC5pbyc7XG4gICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgX3Ryb253ZWJbXCJkZWZhdWx0XCJdLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIoRFVNTVlfTkVUKTtcbiAgICAgIHZhciB0cm9uV2ViID0gbmV3IF90cm9ud2ViW1wiZGVmYXVsdFwiXShwcm92aWRlciwgcHJvdmlkZXIsIERVTU1ZX05FVCk7XG4gICAgICB1dGlscyA9IHRyb25XZWIudXRpbHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJpcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaXAoKSB7XG4gICAgICByZXR1cm4gXCI0NCcvMTk1Jy8wJy8wL1wiO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJidXN0Q2FjaGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVzdENhY2hlKCkge1xuICAgICAgY2FjaGVkSW5zdGFuY2VzID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRFeHBsb3JlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0RXhwbG9yZXIoKSB7XG4gICAgICByZXR1cm4gRVhQTE9SRVI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFjY291bnRGb3JtYXR0ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudEZvcm1hdHRlcihhY2NvdW50KSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoYWNjb3VudC5wdWJsaWNLZXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXR1cm5hYmxlQWNjb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXR1cm5hYmxlQWNjb3VudChhY2NvdW50KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBhY2NvdW50LnB1YmxpY0tleSxcbiAgICAgICAgYmxvY2tjaGFpbjogX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLlRSWFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29udHJhY3RQbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb250cmFjdFBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuICcweC4uLi4uJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tOZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrTmV0d29yayhuZXR3b3JrKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSksIC8vVE9ETzpcbiAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSldKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEVuZG9yc2VkTmV0d29yaygpIHtcbiAgICAgIHJldHVybiBuZXcgX05ldHdvcmtbXCJkZWZhdWx0XCJdKCdUcm9uIE1haW5uZXQnLCAnaHR0cHMnLCAnYXBpLnRyb25ncmlkLmlvJywgNDQzLCBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuVFJYLCAnMScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc0VuZG9yc2VkTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VuZG9yc2VkTmV0d29yayhuZXR3b3JrKSB7XG4gICAgICB2YXIgZW5kb3JzZWROZXR3b3JrID0gdGhpcy5nZXRFbmRvcnNlZE5ldHdvcmsoKTtcbiAgICAgIHJldHVybiBuZXR3b3JrLmJsb2NrY2hhaW4gPT09IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5UUlggJiYgbmV0d29yay5jaGFpbklkID09PSBlbmRvcnNlZE5ldHdvcmsuY2hhaW5JZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2hhaW5JZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldENoYWluSWQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShuZXR3b3JrKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCAxKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldENoYWluSWQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRDaGFpbklkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRDaGFpbklkO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInVzZXNSZXNvdXJjZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlc1Jlc291cmNlcygpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzQWNjb3VudEFjdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzQWNjb3VudEFjdGlvbnMoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFjY291bnRzQXJlSW1wb3J0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudHNBcmVJbXBvcnRlZCgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNWYWxpZFJlY2lwaWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkUmVjaXBpZW50KGFkZHJlc3MpIHtcbiAgICAgIHJldHVybiB1dGlscy5jcnlwdG8uaXNBZGRyZXNzVmFsaWQoYWRkcmVzcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVUb1B1YmxpY1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcml2YXRlVG9QdWJsaWMocHJpdmF0ZUtleSkge1xuICAgICAgaWYgKHR5cGVvZiBwcml2YXRlS2V5ID09PSAnc3RyaW5nJykgcHJpdmF0ZUtleSA9IHRoaXMuaGV4UHJpdmF0ZVRvQnVmZmVyKHByaXZhdGVLZXkpO1xuICAgICAgcmV0dXJuIHV0aWxzLmNyeXB0by5nZXRCYXNlNThDaGVja0FkZHJlc3ModXRpbHMuY3J5cHRvLmdldEFkZHJlc3NGcm9tUHJpS2V5KHByaXZhdGVLZXkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmFsaWRQcml2YXRlS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkUHJpdmF0ZUtleShwcml2YXRlS2V5KSB7XG4gICAgICByZXR1cm4gcHJpdmF0ZUtleS5sZW5ndGggPT09IDY0ICYmIGV0aFV0aWwuaXNWYWxpZFByaXZhdGUodG9CdWZmZXIocHJpdmF0ZUtleSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ2YWxpZFB1YmxpY0tleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZFB1YmxpY0tleShhZGRyZXNzKSB7XG4gICAgICByZXR1cm4gdXRpbHMuY3J5cHRvLmlzQWRkcmVzc1ZhbGlkKGFkZHJlc3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJidWZmZXJUb0hleFByaXZhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVmZmVyVG9IZXhQcml2YXRlKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoYnVmZmVyKS50b1N0cmluZygnaGV4Jyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhleFByaXZhdGVUb0J1ZmZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoZXhQcml2YXRlVG9CdWZmZXIocHJpdmF0ZUtleSkge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHByaXZhdGVLZXksICdoZXgnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzVW50b3VjaGFibGVUb2tlbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzVW50b3VjaGFibGVUb2tlbnMoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJhbGFuY2VGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9iYWxhbmNlRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGFjY291bnQsIHRva2VuKSB7XG4gICAgICAgIHZhciB0cm9uLCBjbG9uZSwgYmFsO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0cm9uID0gZ2V0Q2FjaGVkSW5zdGFuY2UoYWNjb3VudC5uZXR3b3JrKCkpO1xuICAgICAgICAgICAgICAgIGNsb25lID0gdG9rZW4uY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgIGlmICghKHRva2VuLnVuaXF1ZVdpdGhDaGFpbigpID09PSB0aGlzLmRlZmF1bHRUb2tlbigpLnVuaXF1ZVdpdGhDaGFpbigpKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cm9uLnRyeC5nZXRCYWxhbmNlKGFjY291bnQucHVibGljS2V5KTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgYmFsID0gX2NvbnRleHQyLnNlbnQ7XG4gICAgICAgICAgICAgICAgY2xvbmUuYW1vdW50ID0gdHJvbi50b0JpZ051bWJlcihiYWwpLmRpdigxMDAwMDAwKS50b0ZpeGVkKDYpLnRvU3RyaW5nKDEwKTtcblxuICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgY2xvbmUpO1xuXG4gICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBiYWxhbmNlRm9yKF94MiwgX3gzKSB7XG4gICAgICAgIHJldHVybiBfYmFsYW5jZUZvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFsYW5jZUZvcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJiYWxhbmNlc0ZvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2JhbGFuY2VzRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGFjY291bnQsIHRva2Vucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciB0cm9uLCBmb3JtYXRCYWxhbmNlLCB0cngsIF9yZWYsIGFzc2V0LCBiYWxhbmNlLCBhbHRUb2tlbnM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdHJvbiA9IGdldENhY2hlZEluc3RhbmNlKGFjY291bnQubmV0d29yaygpKTtcblxuICAgICAgICAgICAgICAgIGZvcm1hdEJhbGFuY2UgPSBmdW5jdGlvbiBmb3JtYXRCYWxhbmNlKG4pIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cm9uLnRvQmlnTnVtYmVyKG4pLmRpdigxMDAwMDAwKS50b0ZpeGVkKDYpLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdHJ4ID0gdGhpcy5kZWZhdWx0VG9rZW4oKTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgIGFzc2V0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlOiAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfSksIHRyb24udHJ4LmdldEFjY291bnQoYWNjb3VudC5zZW5kYWJsZSgpKVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgYmFsYW5jZTogMFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KV0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBfcmVmID0gX2NvbnRleHQzLnNlbnQ7XG4gICAgICAgICAgICAgICAgYXNzZXQgPSBfcmVmLmFzc2V0O1xuICAgICAgICAgICAgICAgIGJhbGFuY2UgPSBfcmVmLmJhbGFuY2U7XG4gICAgICAgICAgICAgICAgdHJ4LmFtb3VudCA9IGZvcm1hdEJhbGFuY2UoYmFsYW5jZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMTE7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBbdHJ4XSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICBhbHRUb2tlbnMgPSBhc3NldC5tYXAoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgc3ltYm9sID0gX3JlZjIua2V5LFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX1Rva2VuW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5UUlgsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBzeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHN5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IF90aGlzLmRlZmF1bHREZWNpbWFscygpLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZvcm1hdEJhbGFuY2UodmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiBhY2NvdW50Lm5ldHdvcmsoKS5jaGFpbklkXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBbdHJ4XS5jb25jYXQoYWx0VG9rZW5zKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBiYWxhbmNlc0ZvcihfeDQsIF94NSkge1xuICAgICAgICByZXR1cm4gX2JhbGFuY2VzRm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiYWxhbmNlc0ZvcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0RGVjaW1hbHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdERlY2ltYWxzKCkge1xuICAgICAgcmV0dXJuIDY7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRUb2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VG9rZW4oKSB7XG4gICAgICByZXR1cm4gbmV3IF9Ub2tlbltcImRlZmF1bHRcIl0oX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLlRSWCwgJ3RyeCcsICdUUlgnLCAnVFJYJywgdGhpcy5kZWZhdWx0RGVjaW1hbHMoKSwgJzEnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWN0aW9uUGFydGljaXBhbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFjdGlvblBhcnRpY2lwYW50cyhwYXlsb2FkKSB7XG4gICAgICByZXR1cm4gcGF5bG9hZC50cmFuc2FjdGlvbi5wYXJ0aWNpcGFudHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYW5zZmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdHJhbnNmZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTYoX3JlZjMpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGFjY291bnQsIHRvLCBhbW91bnQsIHRva2VuLCBfcmVmMyRwcm9tcHRGb3JTaWduYXQsIHByb21wdEZvclNpZ25hdHVyZSwgc3ltYm9sO1xuXG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTYkKF9jb250ZXh0Nikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Ni5wcmV2ID0gX2NvbnRleHQ2Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFjY291bnQgPSBfcmVmMy5hY2NvdW50LCB0byA9IF9yZWYzLnRvLCBhbW91bnQgPSBfcmVmMy5hbW91bnQsIHRva2VuID0gX3JlZjMudG9rZW4sIF9yZWYzJHByb21wdEZvclNpZ25hdCA9IF9yZWYzLnByb21wdEZvclNpZ25hdHVyZSwgcHJvbXB0Rm9yU2lnbmF0dXJlID0gX3JlZjMkcHJvbXB0Rm9yU2lnbmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZjMkcHJvbXB0Rm9yU2lnbmF0O1xuICAgICAgICAgICAgICAgIGFtb3VudCA9IF9Ub2tlblNlcnZpY2VbXCJkZWZhdWx0XCJdLmZvcm1hdEFtb3VudChhbW91bnQsIHRva2VuKTtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSB0b2tlbi5zeW1ib2w7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNShyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyb24sIHVuc2lnbmVkVHJhbnNhY3Rpb24sIHNpZ25lZCwgc2VudDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJvbiA9IGdldENhY2hlZEluc3RhbmNlKGFjY291bnQubmV0d29yaygpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyb24udHJ4LnNpZ24gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQoc2lnbmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zYWN0aW9uLCBwYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBzaWduYXJncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50czogW2FjY291bnQucHVibGljS2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5UUlgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrOiBhY2NvdW50Lm5ldHdvcmsoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByb21wdEZvclNpZ25hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuc2lnbmVyV2l0aFBvcHVwKHBheWxvYWQsIGFjY291bnQsIHJlamVjdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC50MCA9IF9jb250ZXh0NC5zZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TaWduaW5nU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihhY2NvdW50Lm5ldHdvcmsoKSwgcGF5bG9hZCwgYWNjb3VudC5wdWJsaWNLZXksIGZhbHNlLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQudDAgPSBfY29udGV4dDQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0NC50MCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94OSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodG9rZW4udW5pcXVlKCkgPT09IF90aGlzMi5kZWZhdWx0VG9rZW4oKS51bmlxdWUoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJvbi50cmFuc2FjdGlvbkJ1aWxkZXIuc2VuZFRyeCh0bywgYW1vdW50LCBhY2NvdW50LnB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2lnbmVkVHJhbnNhY3Rpb24gPSBfY29udGV4dDUuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cm9uLnNldEFkZHJlc3MoYWNjb3VudC5zZW5kYWJsZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cm9uLnRyYW5zYWN0aW9uQnVpbGRlci5zZW5kVG9rZW4odG8sIGFtb3VudCwgc3ltYm9sKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2lnbmVkVHJhbnNhY3Rpb24gPSBfY29udGV4dDUuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyb24udHJ4LnNpZ24odW5zaWduZWRUcmFuc2FjdGlvbikudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25lZCA9IF9jb250ZXh0NS5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25lZC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDE5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogc2lnbmVkLnJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gMjE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyb24udHJ4LnNlbmRSYXdUcmFuc2FjdGlvbihzaWduZWQucmVzdWx0KS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW50ID0gX2NvbnRleHQ1LnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzZW50ID8gc2lnbmVkLnJlc3VsdCA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIHNlbmQuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU1KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDcsIF94OCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHRyYW5zZmVyKF94Nikge1xuICAgICAgICByZXR1cm4gX3RyYW5zZmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2ZlcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJzaWduZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zaWduZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcocGF5bG9hZCwgcHVibGljS2V5KSB7XG4gICAgICAgIHZhciBhcmJpdHJhcnksXG4gICAgICAgICAgICBpc0hhc2gsXG4gICAgICAgICAgICBwcml2YXRlS2V5LFxuICAgICAgICAgICAgX2FyZ3M3ID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBhcmJpdHJhcnkgPSBfYXJnczcubGVuZ3RoID4gMiAmJiBfYXJnczdbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzN1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlzSGFzaCA9IF9hcmdzNy5sZW5ndGggPiAzICYmIF9hcmdzN1szXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M3WzNdIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgcHJpdmF0ZUtleSA9IF9hcmdzNy5sZW5ndGggPiA0ICYmIF9hcmdzN1s0XSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M3WzRdIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChwcml2YXRlS2V5KSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0ucHVibGljVG9Qcml2YXRlKHB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBfY29udGV4dDcuc2VudDtcblxuICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgaWYgKHByaXZhdGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Ny5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByaXZhdGVLZXkgIT09ICdzdHJpbmcnKSBwcml2YXRlS2V5ID0gdGhpcy5idWZmZXJUb0hleFByaXZhdGUocHJpdmF0ZUtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwgdXRpbHMuY3J5cHRvLnNpZ25UcmFuc2FjdGlvbihwcml2YXRlS2V5LCBwYXlsb2FkLnRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTcsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzaWduZXIoX3gxMCwgX3gxMSkge1xuICAgICAgICByZXR1cm4gX3NpZ25lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2lnbmVyO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInNpZ25lcldpdGhQb3B1cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NpZ25lcldpdGhQb3B1cCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTAocGF5bG9hZCwgYWNjb3VudCwgcmVqZWN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTAkKF9jb250ZXh0MTApIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDEwLnByZXYgPSBfY29udGV4dDEwLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWY2ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU5KHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTkkKF9jb250ZXh0OSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0OS5wcmV2ID0gX2NvbnRleHQ5Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLnJlcXVlc3RQYXJzZXIocGF5bG9hZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZXMgPSBfY29udGV4dDkuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmlkZW50aXR5S2V5ID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5pZGVudGl0aWVzWzBdLnB1YmxpY0tleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnBhcnRpY2lwYW50cyA9IFthY2NvdW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm5ldHdvcmsgPSBhY2NvdW50Lm5ldHdvcmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm9yaWdpbiA9ICdTY2F0dGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogcGF5bG9hZC5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2NoYWluOiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuVFJYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQWN0aW9ucy5TSUdOLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0V2ZW50U2VydmljZVtcImRlZmF1bHRcIl0uZW1pdCgncG9wb3V0JywgcmVxdWVzdCkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWY4ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU4KF9yZWY3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQsIHNpZ25hdHVyZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZjcucmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoIXJlc3VsdCB8fCAhcmVzdWx0LmFjY2VwdGVkIHx8IGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVqZWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICdDb3VsZCBub3QgZ2V0IHNpZ25hdHVyZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0uaXNIYXJkd2FyZShhY2NvdW50LnB1YmxpY0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDgubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9IYXJkd2FyZVNlcnZpY2VbXCJkZWZhdWx0XCJdLnNpZ24oYWNjb3VudCwgcGF5bG9hZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSA9IF9jb250ZXh0OC5zZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OC5uZXh0ID0gMTM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDgubmV4dCA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfU2lnbmluZ1NlcnZpY2VbXCJkZWZhdWx0XCJdLnNpZ24ocGF5bG9hZC5uZXR3b3JrLCBwYXlsb2FkLCBhY2NvdW50LnB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmUgPSBfY29udGV4dDguc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWduYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OC5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCByZWplY3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0NvdWxkIG5vdCBnZXQgc2lnbmF0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc2lnbmF0dXJlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTApO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzaWduZXJXaXRoUG9wdXAoX3gxMiwgX3gxMywgX3gxNCkge1xuICAgICAgICByZXR1cm4gX3NpZ25lcldpdGhQb3B1cC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2lnbmVyV2l0aFBvcHVwO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInJlcXVlc3RQYXJzZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9yZXF1ZXN0UGFyc2VyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxMSh0cmFuc2FjdGlvbiwgYWJpRGF0YSkge1xuICAgICAgICB2YXIgbmV0d29yaywgdHhJRCwgdHJvbjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTEkKF9jb250ZXh0MTEpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDExLnByZXYgPSBfY29udGV4dDExLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24odHJhbnNhY3Rpb24ubmV0d29yayk7XG4gICAgICAgICAgICAgICAgdHhJRCA9IHRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uLnR4SUQ7XG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi50cmFuc2FjdGlvbi50cmFuc2FjdGlvbi5yYXdfZGF0YTtcbiAgICAgICAgICAgICAgICB0cm9uID0gZ2V0Q2FjaGVkSW5zdGFuY2UobmV0d29yayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIHRyYW5zYWN0aW9uLmNvbnRyYWN0Lm1hcChmdW5jdGlvbiAoY29udHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gY29udHJhY3QucGFyYW1ldGVyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFyIGFkZHJlc3MgPSBkYXRhLmhhc093blByb3BlcnR5KCdjb250cmFjdF9hZGRyZXNzJykgPyBkYXRhLmNvbnRyYWN0X2FkZHJlc3MgOiAnc3lzdGVtJztcbiAgICAgICAgICAgICAgICAgIHZhciBxdWFudGl0eSA9IGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxfdmFsdWUnKSA/IHtcbiAgICAgICAgICAgICAgICAgICAgcGF5aW5nOiB0cm9uLmZyb21TdW4oZGF0YS5jYWxsX3ZhbHVlKSArICcgVFJYJ1xuICAgICAgICAgICAgICAgICAgfSA6IHt9O1xuICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgdmFyIG1ldGhvZEFCSTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGFiaURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFiaSA9IGFiaURhdGEuYWJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2FkZHJlc3MgPSBhYmlEYXRhLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSBhYmlEYXRhLm1ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kQUJJID0gYWJpLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5uYW1lID09PSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1ldGhvZEFCSSkgdGhyb3cgRXJyb3Iuc2lnbmF0dXJlRXJyb3IoJ25vX2FiaV9tZXRob2QnLCBcIk5vIG1ldGhvZCBzaWduYXR1cmUgb24gdGhlIGFiaSB5b3UgcHJvdmlkZWQgbWF0Y2hlZCB0aGUgZGF0YSBmb3IgdGhpcyB0cmFuc2FjdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gbWV0aG9kQUJJLmlucHV0cy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGVzID0gbWV0aG9kQUJJLmlucHV0cy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC50eXBlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRyb24udXRpbHMuYWJpLmRlY29kZVBhcmFtcyhuYW1lcywgdHlwZXMsIGRhdGEuZGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKGRhdGEsIHF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHJvbi51dGlscy5pc0JpZ051bWJlcihkYXRhW2tleV0pKSBkYXRhW2tleV0gPSBkYXRhW2tleV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG1ldGhvZEFCSSA/IG1ldGhvZEFCSS5uYW1lIDogJ3RyYW5zZmVyJ1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTExKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcmVxdWVzdFBhcnNlcihfeDE3LCBfeDE4KSB7XG4gICAgICAgIHJldHVybiBfcmVxdWVzdFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVxdWVzdFBhcnNlcjtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gVFJYO1xufShfUGx1Z2luMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFRSWDsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCTiA9IHJlcXVpcmUoXCJibi5qc1wiKTtcbmV4cG9ydHMuQk4gPSBCTjtcbnZhciBybHAgPSByZXF1aXJlKFwicmxwXCIpO1xuZXhwb3J0cy5ybHAgPSBybHA7XG52YXIgY3JlYXRlS2VjY2FrSGFzaCA9IHJlcXVpcmUoJ2tlY2NhaycpO1xudmFyIHNlY3AyNTZrMSA9IHJlcXVpcmUoJ3NlY3AyNTZrMScpO1xuZXhwb3J0cy5zZWNwMjU2azEgPSBzZWNwMjU2azE7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgY3JlYXRlSGFzaCA9IHJlcXVpcmUoJ2NyZWF0ZS1oYXNoJyk7XG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgZXRoanNVdGlsID0gcmVxdWlyZSgnZXRoanMtdXRpbCcpO1xuT2JqZWN0LmFzc2lnbihleHBvcnRzLCBldGhqc1V0aWwpO1xuLyoqXG4gKiBUaGUgbWF4IGludGVnZXIgdGhhdCB0aGlzIFZNIGNhbiBoYW5kbGVcbiAqL1xuZXhwb3J0cy5NQVhfSU5URUdFUiA9IG5ldyBCTignZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZicsIDE2KTtcbi8qKlxuICogMl4yNTZcbiAqL1xuZXhwb3J0cy5UV09fUE9XMjU2ID0gbmV3IEJOKCcxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsIDE2KTtcbi8qKlxuICogS2VjY2FrLTI1NiBoYXNoIG9mIG51bGxcbiAqL1xuZXhwb3J0cy5LRUNDQUsyNTZfTlVMTF9TID0gJ2M1ZDI0NjAxODZmNzIzM2M5MjdlN2RiMmRjYzcwM2MwZTUwMGI2NTNjYTgyMjczYjdiZmFkODA0NWQ4NWE0NzAnO1xuLyoqXG4gKiBLZWNjYWstMjU2IGhhc2ggb2YgbnVsbFxuICovXG5leHBvcnRzLktFQ0NBSzI1Nl9OVUxMID0gQnVmZmVyLmZyb20oZXhwb3J0cy5LRUNDQUsyNTZfTlVMTF9TLCAnaGV4Jyk7XG4vKipcbiAqIEtlY2Nhay0yNTYgb2YgYW4gUkxQIG9mIGFuIGVtcHR5IGFycmF5XG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9BUlJBWV9TID0gJzFkY2M0ZGU4ZGVjNzVkN2FhYjg1YjU2N2I2Y2NkNDFhZDMxMjQ1MWI5NDhhNzQxM2YwYTE0MmZkNDBkNDkzNDcnO1xuLyoqXG4gKiBLZWNjYWstMjU2IG9mIGFuIFJMUCBvZiBhbiBlbXB0eSBhcnJheVxuICovXG5leHBvcnRzLktFQ0NBSzI1Nl9STFBfQVJSQVkgPSBCdWZmZXIuZnJvbShleHBvcnRzLktFQ0NBSzI1Nl9STFBfQVJSQVlfUywgJ2hleCcpO1xuLyoqXG4gKiBLZWNjYWstMjU2IGhhc2ggb2YgdGhlIFJMUCBvZiBudWxsXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9TID0gJzU2ZTgxZjE3MWJjYzU1YTZmZjgzNDVlNjkyYzBmODZlNWI0OGUwMWI5OTZjYWRjMDAxNjIyZmI1ZTM2M2I0MjEnO1xuLyoqXG4gKiBLZWNjYWstMjU2IGhhc2ggb2YgdGhlIFJMUCBvZiBudWxsXG4gKi9cbmV4cG9ydHMuS0VDQ0FLMjU2X1JMUCA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMuS0VDQ0FLMjU2X1JMUF9TLCAnaGV4Jyk7XG4vKipcbiAqIFJldHVybnMgYSBidWZmZXIgZmlsbGVkIHdpdGggMHMuXG4gKiBAcGFyYW0gYnl0ZXMgdGhlIG51bWJlciBvZiBieXRlcyB0aGUgYnVmZmVyIHNob3VsZCBiZVxuICovXG5leHBvcnRzLnplcm9zID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZShieXRlcykuZmlsbCgwKTtcbn07XG4vKipcbiAqIFJldHVybnMgYSB6ZXJvIGFkZHJlc3MuXG4gKi9cbmV4cG9ydHMuemVyb0FkZHJlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkZHJlc3NMZW5ndGggPSAyMDtcbiAgICB2YXIgYWRkciA9IGV4cG9ydHMuemVyb3MoYWRkcmVzc0xlbmd0aCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuYnVmZmVyVG9IZXgoYWRkcik7XG59O1xuLyoqXG4gKiBMZWZ0IFBhZHMgYW4gYEFycmF5YCBvciBgQnVmZmVyYCB3aXRoIGxlYWRpbmcgemVyb3MgdGlsbCBpdCBoYXMgYGxlbmd0aGAgYnl0ZXMuXG4gKiBPciBpdCB0cnVuY2F0ZXMgdGhlIGJlZ2lubmluZyBpZiBpdCBleGNlZWRzLlxuICogQHBhcmFtIG1zZyB0aGUgdmFsdWUgdG8gcGFkIChCdWZmZXJ8QXJyYXkpXG4gKiBAcGFyYW0gbGVuZ3RoIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIG91dHB1dCBzaG91bGQgYmVcbiAqIEBwYXJhbSByaWdodCB3aGV0aGVyIHRvIHN0YXJ0IHBhZGRpbmcgZm9ybSB0aGUgbGVmdCBvciByaWdodFxuICogQHJldHVybiAoQnVmZmVyfEFycmF5KVxuICovXG5leHBvcnRzLnNldExlbmd0aExlZnQgPSBmdW5jdGlvbiAobXNnLCBsZW5ndGgsIHJpZ2h0KSB7XG4gICAgaWYgKHJpZ2h0ID09PSB2b2lkIDApIHsgcmlnaHQgPSBmYWxzZTsgfVxuICAgIHZhciBidWYgPSBleHBvcnRzLnplcm9zKGxlbmd0aCk7XG4gICAgbXNnID0gZXhwb3J0cy50b0J1ZmZlcihtc2cpO1xuICAgIGlmIChyaWdodCkge1xuICAgICAgICBpZiAobXNnLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgbXNnLmNvcHkoYnVmKTtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZy5zbGljZSgwLCBsZW5ndGgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKG1zZy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIG1zZy5jb3B5KGJ1ZiwgbGVuZ3RoIC0gbXNnLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtc2cuc2xpY2UoLWxlbmd0aCk7XG4gICAgfVxufTtcbmV4cG9ydHMuc2V0TGVuZ3RoID0gZXhwb3J0cy5zZXRMZW5ndGhMZWZ0O1xuLyoqXG4gKiBSaWdodCBQYWRzIGFuIGBBcnJheWAgb3IgYEJ1ZmZlcmAgd2l0aCBsZWFkaW5nIHplcm9zIHRpbGwgaXQgaGFzIGBsZW5ndGhgIGJ5dGVzLlxuICogT3IgaXQgdHJ1bmNhdGVzIHRoZSBiZWdpbm5pbmcgaWYgaXQgZXhjZWVkcy5cbiAqIEBwYXJhbSBtc2cgdGhlIHZhbHVlIHRvIHBhZCAoQnVmZmVyfEFycmF5KVxuICogQHBhcmFtIGxlbmd0aCB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBvdXRwdXQgc2hvdWxkIGJlXG4gKiBAcmV0dXJuIChCdWZmZXJ8QXJyYXkpXG4gKi9cbmV4cG9ydHMuc2V0TGVuZ3RoUmlnaHQgPSBmdW5jdGlvbiAobXNnLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5zZXRMZW5ndGgobXNnLCBsZW5ndGgsIHRydWUpO1xufTtcbi8qKlxuICogVHJpbXMgbGVhZGluZyB6ZXJvcyBmcm9tIGEgYEJ1ZmZlcmAgb3IgYW4gYEFycmF5YC5cbiAqIEBwYXJhbSBhIChCdWZmZXJ8QXJyYXl8U3RyaW5nKVxuICogQHJldHVybiAoQnVmZmVyfEFycmF5fFN0cmluZylcbiAqL1xuZXhwb3J0cy51bnBhZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgYSA9IGV0aGpzVXRpbC5zdHJpcEhleFByZWZpeChhKTtcbiAgICB2YXIgZmlyc3QgPSBhWzBdO1xuICAgIHdoaWxlIChhLmxlbmd0aCA+IDAgJiYgZmlyc3QudG9TdHJpbmcoKSA9PT0gJzAnKSB7XG4gICAgICAgIGEgPSBhLnNsaWNlKDEpO1xuICAgICAgICBmaXJzdCA9IGFbMF07XG4gICAgfVxuICAgIHJldHVybiBhO1xufTtcbmV4cG9ydHMuc3RyaXBaZXJvcyA9IGV4cG9ydHMudW5wYWQ7XG4vKipcbiAqIEF0dGVtcHRzIHRvIHR1cm4gYSB2YWx1ZSBpbnRvIGEgYEJ1ZmZlcmAuIEFzIGlucHV0IGl0IHN1cHBvcnRzIGBCdWZmZXJgLCBgU3RyaW5nYCwgYE51bWJlcmAsIG51bGwvdW5kZWZpbmVkLCBgQk5gIGFuZCBvdGhlciBvYmplY3RzIHdpdGggYSBgdG9BcnJheSgpYCBtZXRob2QuXG4gKiBAcGFyYW0gdiB0aGUgdmFsdWVcbiAqL1xuZXhwb3J0cy50b0J1ZmZlciA9IGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodikpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIHYgPSBCdWZmZXIuZnJvbSh2KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmlzSGV4U3RyaW5nKHYpKSB7XG4gICAgICAgICAgICAgICAgdiA9IEJ1ZmZlci5mcm9tKGV4cG9ydHMucGFkVG9FdmVuKGV4cG9ydHMuc3RyaXBIZXhQcmVmaXgodikpLCAnaGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ID0gQnVmZmVyLmZyb20odik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2ID0gZXhwb3J0cy5pbnRUb0J1ZmZlcih2KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ID09PSBudWxsIHx8IHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChCTi5pc0JOKHYpKSB7XG4gICAgICAgICAgICB2ID0gdi50b0FycmF5TGlrZShCdWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHYudG9BcnJheSkge1xuICAgICAgICAgICAgLy8gY29udmVydHMgYSBCTiB0byBhIEJ1ZmZlclxuICAgICAgICAgICAgdiA9IEJ1ZmZlci5mcm9tKHYudG9BcnJheSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0eXBlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCdWZmZXJgIHRvIGEgYE51bWJlcmAuXG4gKiBAcGFyYW0gYnVmIGBCdWZmZXJgIG9iamVjdCB0byBjb252ZXJ0XG4gKiBAdGhyb3dzIElmIHRoZSBpbnB1dCBudW1iZXIgZXhjZWVkcyA1MyBiaXRzLlxuICovXG5leHBvcnRzLmJ1ZmZlclRvSW50ID0gZnVuY3Rpb24gKGJ1Zikge1xuICAgIHJldHVybiBuZXcgQk4oZXhwb3J0cy50b0J1ZmZlcihidWYpKS50b051bWJlcigpO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBgQnVmZmVyYCBpbnRvIGEgaGV4IGBTdHJpbmdgLlxuICogQHBhcmFtIGJ1ZiBgQnVmZmVyYCBvYmplY3QgdG8gY29udmVydFxuICovXG5leHBvcnRzLmJ1ZmZlclRvSGV4ID0gZnVuY3Rpb24gKGJ1Zikge1xuICAgIGJ1ZiA9IGV4cG9ydHMudG9CdWZmZXIoYnVmKTtcbiAgICByZXR1cm4gJzB4JyArIGJ1Zi50b1N0cmluZygnaGV4Jyk7XG59O1xuLyoqXG4gKiBJbnRlcnByZXRzIGEgYEJ1ZmZlcmAgYXMgYSBzaWduZWQgaW50ZWdlciBhbmQgcmV0dXJucyBhIGBCTmAuIEFzc3VtZXMgMjU2LWJpdCBudW1iZXJzLlxuICogQHBhcmFtIG51bSBTaWduZWQgaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnRzLmZyb21TaWduZWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgcmV0dXJuIG5ldyBCTihudW0pLmZyb21Ud29zKDI1Nik7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIGBCTmAgdG8gYW4gdW5zaWduZWQgaW50ZWdlciBhbmQgcmV0dXJucyBpdCBhcyBhIGBCdWZmZXJgLiBBc3N1bWVzIDI1Ni1iaXQgbnVtYmVycy5cbiAqIEBwYXJhbSBudW1cbiAqL1xuZXhwb3J0cy50b1Vuc2lnbmVkID0gZnVuY3Rpb24gKG51bSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShudW0udG9Ud29zKDI1NikudG9BcnJheSgpKTtcbn07XG4vKipcbiAqIENyZWF0ZXMgS2VjY2FrIGhhc2ggb2YgdGhlIGlucHV0XG4gKiBAcGFyYW0gYSBUaGUgaW5wdXQgZGF0YSAoQnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXIpXG4gKiBAcGFyYW0gYml0cyBUaGUgS2VjY2FrIHdpZHRoXG4gKi9cbmV4cG9ydHMua2VjY2FrID0gZnVuY3Rpb24gKGEsIGJpdHMpIHtcbiAgICBpZiAoYml0cyA9PT0gdm9pZCAwKSB7IGJpdHMgPSAyNTY7IH1cbiAgICBhID0gZXhwb3J0cy50b0J1ZmZlcihhKTtcbiAgICBpZiAoIWJpdHMpXG4gICAgICAgIGJpdHMgPSAyNTY7XG4gICAgcmV0dXJuIGNyZWF0ZUtlY2Nha0hhc2goXCJrZWNjYWtcIiArIGJpdHMpXG4gICAgICAgIC51cGRhdGUoYSlcbiAgICAgICAgLmRpZ2VzdCgpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBLZWNjYWstMjU2IGhhc2ggb2YgdGhlIGlucHV0LCBhbGlhcyBmb3Iga2VjY2FrKGEsIDI1NikuXG4gKiBAcGFyYW0gYSBUaGUgaW5wdXQgZGF0YSAoQnVmZmVyfEFycmF5fFN0cmluZ3xOdW1iZXIpXG4gKi9cbmV4cG9ydHMua2VjY2FrMjU2ID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5rZWNjYWsoYSk7XG59O1xuLyoqXG4gKiBDcmVhdGVzIFNIQTI1NiBoYXNoIG9mIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhIChCdWZmZXJ8QXJyYXl8U3RyaW5nfE51bWJlcilcbiAqL1xuZXhwb3J0cy5zaGEyNTYgPSBmdW5jdGlvbiAoYSkge1xuICAgIGEgPSBleHBvcnRzLnRvQnVmZmVyKGEpO1xuICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGEyNTYnKVxuICAgICAgICAudXBkYXRlKGEpXG4gICAgICAgIC5kaWdlc3QoKTtcbn07XG4vKipcbiAqIENyZWF0ZXMgUklQRU1EMTYwIGhhc2ggb2YgdGhlIGlucHV0LlxuICogQHBhcmFtIGEgVGhlIGlucHV0IGRhdGEgKEJ1ZmZlcnxBcnJheXxTdHJpbmd8TnVtYmVyKVxuICogQHBhcmFtIHBhZGRlZCBXaGV0aGVyIGl0IHNob3VsZCBiZSBwYWRkZWQgdG8gMjU2IGJpdHMgb3Igbm90XG4gKi9cbmV4cG9ydHMucmlwZW1kMTYwID0gZnVuY3Rpb24gKGEsIHBhZGRlZCkge1xuICAgIGEgPSBleHBvcnRzLnRvQnVmZmVyKGEpO1xuICAgIHZhciBoYXNoID0gY3JlYXRlSGFzaCgncm1kMTYwJylcbiAgICAgICAgLnVwZGF0ZShhKVxuICAgICAgICAuZGlnZXN0KCk7XG4gICAgaWYgKHBhZGRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5zZXRMZW5ndGgoaGFzaCwgMzIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxufTtcbi8qKlxuICogQ3JlYXRlcyBTSEEtMyBoYXNoIG9mIHRoZSBSTFAgZW5jb2RlZCB2ZXJzaW9uIG9mIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBhIFRoZSBpbnB1dCBkYXRhXG4gKi9cbmV4cG9ydHMucmxwaGFzaCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMua2VjY2FrKHJscC5lbmNvZGUoYSkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcml2YXRlIGtleSBzYXRpc2ZpZXMgdGhlIHJ1bGVzIG9mIHRoZSBjdXJ2ZSBzZWNwMjU2azEuXG4gKi9cbmV4cG9ydHMuaXNWYWxpZFByaXZhdGUgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICAgIHJldHVybiBzZWNwMjU2azEucHJpdmF0ZUtleVZlcmlmeShwcml2YXRlS2V5KTtcbn07XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHVibGljIGtleSBzYXRpc2ZpZXMgdGhlIHJ1bGVzIG9mIHRoZSBjdXJ2ZSBzZWNwMjU2azFcbiAqIGFuZCB0aGUgcmVxdWlyZW1lbnRzIG9mIEV0aGVyZXVtLlxuICogQHBhcmFtIHB1YmxpY0tleSBUaGUgdHdvIHBvaW50cyBvZiBhbiB1bmNvbXByZXNzZWQga2V5LCB1bmxlc3Mgc2FuaXRpemUgaXMgZW5hYmxlZFxuICogQHBhcmFtIHNhbml0aXplIEFjY2VwdCBwdWJsaWMga2V5cyBpbiBvdGhlciBmb3JtYXRzXG4gKi9cbmV4cG9ydHMuaXNWYWxpZFB1YmxpYyA9IGZ1bmN0aW9uIChwdWJsaWNLZXksIHNhbml0aXplKSB7XG4gICAgaWYgKHNhbml0aXplID09PSB2b2lkIDApIHsgc2FuaXRpemUgPSBmYWxzZTsgfVxuICAgIGlmIChwdWJsaWNLZXkubGVuZ3RoID09PSA2NCkge1xuICAgICAgICAvLyBDb252ZXJ0IHRvIFNFQzEgZm9yIHNlY3AyNTZrMVxuICAgICAgICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleVZlcmlmeShCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbNF0pLCBwdWJsaWNLZXldKSk7XG4gICAgfVxuICAgIGlmICghc2FuaXRpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleVZlcmlmeShwdWJsaWNLZXkpO1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gYWRkcmVzcyBvZiBhIGdpdmVuIHB1YmxpYyBrZXkuXG4gKiBBY2NlcHRzIFwiRXRoZXJldW0gcHVibGljIGtleXNcIiBhbmQgU0VDMSBlbmNvZGVkIGtleXMuXG4gKiBAcGFyYW0gcHViS2V5IFRoZSB0d28gcG9pbnRzIG9mIGFuIHVuY29tcHJlc3NlZCBrZXksIHVubGVzcyBzYW5pdGl6ZSBpcyBlbmFibGVkXG4gKiBAcGFyYW0gc2FuaXRpemUgQWNjZXB0IHB1YmxpYyBrZXlzIGluIG90aGVyIGZvcm1hdHNcbiAqL1xuZXhwb3J0cy5wdWJUb0FkZHJlc3MgPSBmdW5jdGlvbiAocHViS2V5LCBzYW5pdGl6ZSkge1xuICAgIGlmIChzYW5pdGl6ZSA9PT0gdm9pZCAwKSB7IHNhbml0aXplID0gZmFsc2U7IH1cbiAgICBwdWJLZXkgPSBleHBvcnRzLnRvQnVmZmVyKHB1YktleSk7XG4gICAgaWYgKHNhbml0aXplICYmIHB1YktleS5sZW5ndGggIT09IDY0KSB7XG4gICAgICAgIHB1YktleSA9IHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KHB1YktleSwgZmFsc2UpLnNsaWNlKDEpO1xuICAgIH1cbiAgICBhc3NlcnQocHViS2V5Lmxlbmd0aCA9PT0gNjQpO1xuICAgIC8vIE9ubHkgdGFrZSB0aGUgbG93ZXIgMTYwYml0cyBvZiB0aGUgaGFzaFxuICAgIHJldHVybiBleHBvcnRzLmtlY2NhayhwdWJLZXkpLnNsaWNlKC0yMCk7XG59O1xuZXhwb3J0cy5wdWJsaWNUb0FkZHJlc3MgPSBleHBvcnRzLnB1YlRvQWRkcmVzcztcbi8qKlxuICogUmV0dXJucyB0aGUgZXRoZXJldW0gcHVibGljIGtleSBvZiBhIGdpdmVuIHByaXZhdGUga2V5LlxuICogQHBhcmFtIHByaXZhdGVLZXkgQSBwcml2YXRlIGtleSBtdXN0IGJlIDI1NiBiaXRzIHdpZGVcbiAqL1xuZXhwb3J0cy5wcml2YXRlVG9QdWJsaWMgPSBmdW5jdGlvbiAocHJpdmF0ZUtleSkge1xuICAgIHByaXZhdGVLZXkgPSBleHBvcnRzLnRvQnVmZmVyKHByaXZhdGVLZXkpO1xuICAgIC8vIHNraXAgdGhlIHR5cGUgZmxhZyBhbmQgdXNlIHRoZSBYLCBZIHBvaW50c1xuICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5Q3JlYXRlKHByaXZhdGVLZXksIGZhbHNlKS5zbGljZSgxKTtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgcHVibGljIGtleSB0byB0aGUgRXRoZXJldW0gZm9ybWF0LlxuICovXG5leHBvcnRzLmltcG9ydFB1YmxpYyA9IGZ1bmN0aW9uIChwdWJsaWNLZXkpIHtcbiAgICBwdWJsaWNLZXkgPSBleHBvcnRzLnRvQnVmZmVyKHB1YmxpY0tleSk7XG4gICAgaWYgKHB1YmxpY0tleS5sZW5ndGggIT09IDY0KSB7XG4gICAgICAgIHB1YmxpY0tleSA9IHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KHB1YmxpY0tleSwgZmFsc2UpLnNsaWNlKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGljS2V5O1xufTtcbi8qKlxuICogUmV0dXJucyB0aGUgRUNEU0Egc2lnbmF0dXJlIG9mIGEgbWVzc2FnZSBoYXNoLlxuICovXG5leHBvcnRzLmVjc2lnbiA9IGZ1bmN0aW9uIChtc2dIYXNoLCBwcml2YXRlS2V5LCBjaGFpbklkKSB7XG4gICAgdmFyIHNpZyA9IHNlY3AyNTZrMS5zaWduKG1zZ0hhc2gsIHByaXZhdGVLZXkpO1xuICAgIHZhciByZWNvdmVyeSA9IHNpZy5yZWNvdmVyeTtcbiAgICB2YXIgcmV0ID0ge1xuICAgICAgICByOiBzaWcuc2lnbmF0dXJlLnNsaWNlKDAsIDMyKSxcbiAgICAgICAgczogc2lnLnNpZ25hdHVyZS5zbGljZSgzMiwgNjQpLFxuICAgICAgICB2OiBjaGFpbklkID8gcmVjb3ZlcnkgKyAoY2hhaW5JZCAqIDIgKyAzNSkgOiByZWNvdmVyeSArIDI3LFxuICAgIH07XG4gICAgcmV0dXJuIHJldDtcbn07XG4vKipcbiAqIFJldHVybnMgdGhlIGtlY2Nhay0yNTYgaGFzaCBvZiBgbWVzc2FnZWAsIHByZWZpeGVkIHdpdGggdGhlIGhlYWRlciB1c2VkIGJ5IHRoZSBgZXRoX3NpZ25gIFJQQyBjYWxsLlxuICogVGhlIG91dHB1dCBvZiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBmZWQgaW50byBgZWNzaWduYCB0byBwcm9kdWNlIHRoZSBzYW1lIHNpZ25hdHVyZSBhcyB0aGUgYGV0aF9zaWduYFxuICogY2FsbCBmb3IgYSBnaXZlbiBgbWVzc2FnZWAsIG9yIGZlZCB0byBgZWNyZWNvdmVyYCBhbG9uZyB3aXRoIGEgc2lnbmF0dXJlIHRvIHJlY292ZXIgdGhlIHB1YmxpYyBrZXlcbiAqIHVzZWQgdG8gcHJvZHVjZSB0aGUgc2lnbmF0dXJlLlxuICovXG5leHBvcnRzLmhhc2hQZXJzb25hbE1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHZhciBwcmVmaXggPSBleHBvcnRzLnRvQnVmZmVyKFwiXFx1MDAxOUV0aGVyZXVtIFNpZ25lZCBNZXNzYWdlOlxcblwiICsgbWVzc2FnZS5sZW5ndGgudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIGV4cG9ydHMua2VjY2FrKEJ1ZmZlci5jb25jYXQoW3ByZWZpeCwgbWVzc2FnZV0pKTtcbn07XG4vKipcbiAqIEVDRFNBIHB1YmxpYyBrZXkgcmVjb3ZlcnkgZnJvbSBzaWduYXR1cmUuXG4gKiBAcmV0dXJucyBSZWNvdmVyZWQgcHVibGljIGtleVxuICovXG5leHBvcnRzLmVjcmVjb3ZlciA9IGZ1bmN0aW9uIChtc2dIYXNoLCB2LCByLCBzLCBjaGFpbklkKSB7XG4gICAgdmFyIHNpZ25hdHVyZSA9IEJ1ZmZlci5jb25jYXQoW2V4cG9ydHMuc2V0TGVuZ3RoKHIsIDMyKSwgZXhwb3J0cy5zZXRMZW5ndGgocywgMzIpXSwgNjQpO1xuICAgIHZhciByZWNvdmVyeSA9IGNhbGN1bGF0ZVNpZ1JlY292ZXJ5KHYsIGNoYWluSWQpO1xuICAgIGlmICghaXNWYWxpZFNpZ1JlY292ZXJ5KHJlY292ZXJ5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2lnbmF0dXJlIHYgdmFsdWUnKTtcbiAgICB9XG4gICAgdmFyIHNlbmRlclB1YktleSA9IHNlY3AyNTZrMS5yZWNvdmVyKG1zZ0hhc2gsIHNpZ25hdHVyZSwgcmVjb3ZlcnkpO1xuICAgIHJldHVybiBzZWNwMjU2azEucHVibGljS2V5Q29udmVydChzZW5kZXJQdWJLZXksIGZhbHNlKS5zbGljZSgxKTtcbn07XG4vKipcbiAqIENvbnZlcnQgc2lnbmF0dXJlIHBhcmFtZXRlcnMgaW50byB0aGUgZm9ybWF0IG9mIGBldGhfc2lnbmAgUlBDIG1ldGhvZC5cbiAqIEByZXR1cm5zIFNpZ25hdHVyZVxuICovXG5leHBvcnRzLnRvUnBjU2lnID0gZnVuY3Rpb24gKHYsIHIsIHMsIGNoYWluSWQpIHtcbiAgICB2YXIgcmVjb3ZlcnkgPSBjYWxjdWxhdGVTaWdSZWNvdmVyeSh2LCBjaGFpbklkKTtcbiAgICBpZiAoIWlzVmFsaWRTaWdSZWNvdmVyeShyZWNvdmVyeSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNpZ25hdHVyZSB2IHZhbHVlJyk7XG4gICAgfVxuICAgIC8vIGdldGggKGFuZCB0aGUgUlBDIGV0aF9zaWduIG1ldGhvZCkgdXNlcyB0aGUgNjUgYnl0ZSBmb3JtYXQgdXNlZCBieSBCaXRjb2luXG4gICAgcmV0dXJuIGV4cG9ydHMuYnVmZmVyVG9IZXgoQnVmZmVyLmNvbmNhdChbZXhwb3J0cy5zZXRMZW5ndGhMZWZ0KHIsIDMyKSwgZXhwb3J0cy5zZXRMZW5ndGhMZWZ0KHMsIDMyKSwgZXhwb3J0cy50b0J1ZmZlcih2KV0pKTtcbn07XG4vKipcbiAqIENvbnZlcnQgc2lnbmF0dXJlIGZvcm1hdCBvZiB0aGUgYGV0aF9zaWduYCBSUEMgbWV0aG9kIHRvIHNpZ25hdHVyZSBwYXJhbWV0ZXJzXG4gKiBOT1RFOiBhbGwgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBnZXRoOiBodHRwczovL2dpdGh1Yi5jb20vZXRoZXJldW0vZ28tZXRoZXJldW0vaXNzdWVzLzIwNTNcbiAqL1xuZXhwb3J0cy5mcm9tUnBjU2lnID0gZnVuY3Rpb24gKHNpZykge1xuICAgIHZhciBidWYgPSBleHBvcnRzLnRvQnVmZmVyKHNpZyk7XG4gICAgLy8gTk9URTogd2l0aCBwb3RlbnRpYWwgaW50cm9kdWN0aW9uIG9mIGNoYWluSWQgdGhpcyBtaWdodCBuZWVkIHRvIGJlIHVwZGF0ZWRcbiAgICBpZiAoYnVmLmxlbmd0aCAhPT0gNjUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNpZ25hdHVyZSBsZW5ndGgnKTtcbiAgICB9XG4gICAgdmFyIHYgPSBidWZbNjRdO1xuICAgIC8vIHN1cHBvcnQgYm90aCB2ZXJzaW9ucyBvZiBgZXRoX3NpZ25gIHJlc3BvbnNlc1xuICAgIGlmICh2IDwgMjcpIHtcbiAgICAgICAgdiArPSAyNztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdjogdixcbiAgICAgICAgcjogYnVmLnNsaWNlKDAsIDMyKSxcbiAgICAgICAgczogYnVmLnNsaWNlKDMyLCA2NCksXG4gICAgfTtcbn07XG4vKipcbiAqIFJldHVybnMgdGhlIGV0aGVyZXVtIGFkZHJlc3Mgb2YgYSBnaXZlbiBwcml2YXRlIGtleS5cbiAqIEBwYXJhbSBwcml2YXRlS2V5IEEgcHJpdmF0ZSBrZXkgbXVzdCBiZSAyNTYgYml0cyB3aWRlXG4gKi9cbmV4cG9ydHMucHJpdmF0ZVRvQWRkcmVzcyA9IGZ1bmN0aW9uIChwcml2YXRlS2V5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucHVibGljVG9BZGRyZXNzKGV4cG9ydHMucHJpdmF0ZVRvUHVibGljKHByaXZhdGVLZXkpKTtcbn07XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgYWRkcmVzcyBpcyBhIHZhbGlkLiBBY2NlcHRzIGNoZWNrc3VtbWVkIGFkZHJlc3NlcyB0b28uXG4gKi9cbmV4cG9ydHMuaXNWYWxpZEFkZHJlc3MgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgIHJldHVybiAvXjB4WzAtOWEtZkEtRl17NDB9JC8udGVzdChhZGRyZXNzKTtcbn07XG4vKipcbiAqIENoZWNrcyBpZiBhIGdpdmVuIGFkZHJlc3MgaXMgYSB6ZXJvIGFkZHJlc3MuXG4gKi9cbmV4cG9ydHMuaXNaZXJvQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgdmFyIHplcm9BZGRyID0gZXhwb3J0cy56ZXJvQWRkcmVzcygpO1xuICAgIHJldHVybiB6ZXJvQWRkciA9PT0gZXhwb3J0cy5hZGRIZXhQcmVmaXgoYWRkcmVzcyk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGEgY2hlY2tzdW1tZWQgYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy50b0NoZWNrc3VtQWRkcmVzcyA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgYWRkcmVzcyA9IGV0aGpzVXRpbC5zdHJpcEhleFByZWZpeChhZGRyZXNzKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBoYXNoID0gZXhwb3J0cy5rZWNjYWsoYWRkcmVzcykudG9TdHJpbmcoJ2hleCcpO1xuICAgIHZhciByZXQgPSAnMHgnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRkcmVzcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGFyc2VJbnQoaGFzaFtpXSwgMTYpID49IDgpIHtcbiAgICAgICAgICAgIHJldCArPSBhZGRyZXNzW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXQgKz0gYWRkcmVzc1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBhZGRyZXNzIGlzIGEgdmFsaWQgY2hlY2tzdW1tZWQgYWRkcmVzcy5cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkQ2hlY2tzdW1BZGRyZXNzID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc1ZhbGlkQWRkcmVzcyhhZGRyZXNzKSAmJiBleHBvcnRzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MpID09PSBhZGRyZXNzO1xufTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIGFkZHJlc3Mgb2YgYSBuZXdseSBjcmVhdGVkIGNvbnRyYWN0LlxuICogQHBhcmFtIGZyb20gVGhlIGFkZHJlc3Mgd2hpY2ggaXMgY3JlYXRpbmcgdGhpcyBuZXcgYWRkcmVzc1xuICogQHBhcmFtIG5vbmNlIFRoZSBub25jZSBvZiB0aGUgZnJvbSBhY2NvdW50XG4gKi9cbmV4cG9ydHMuZ2VuZXJhdGVBZGRyZXNzID0gZnVuY3Rpb24gKGZyb20sIG5vbmNlKSB7XG4gICAgZnJvbSA9IGV4cG9ydHMudG9CdWZmZXIoZnJvbSk7XG4gICAgdmFyIG5vbmNlQk4gPSBuZXcgQk4obm9uY2UpO1xuICAgIGlmIChub25jZUJOLmlzWmVybygpKSB7XG4gICAgICAgIC8vIGluIFJMUCB3ZSB3YW50IHRvIGVuY29kZSBudWxsIGluIHRoZSBjYXNlIG9mIHplcm8gbm9uY2VcbiAgICAgICAgLy8gcmVhZCB0aGUgUkxQIGRvY3VtZW50YXRpb24gZm9yIGFuIGFuc3dlciBpZiB5b3UgZGFyZVxuICAgICAgICByZXR1cm4gZXhwb3J0cy5ybHBoYXNoKFtmcm9tLCBudWxsXSkuc2xpY2UoLTIwKTtcbiAgICB9XG4gICAgLy8gT25seSB0YWtlIHRoZSBsb3dlciAxNjBiaXRzIG9mIHRoZSBoYXNoXG4gICAgcmV0dXJuIGV4cG9ydHMucmxwaGFzaChbZnJvbSwgQnVmZmVyLmZyb20obm9uY2VCTi50b0FycmF5KCkpXSkuc2xpY2UoLTIwKTtcbn07XG4vKipcbiAqIEdlbmVyYXRlcyBhbiBhZGRyZXNzIGZvciBhIGNvbnRyYWN0IGNyZWF0ZWQgdXNpbmcgQ1JFQVRFMi5cbiAqIEBwYXJhbSBmcm9tIFRoZSBhZGRyZXNzIHdoaWNoIGlzIGNyZWF0aW5nIHRoaXMgbmV3IGFkZHJlc3NcbiAqIEBwYXJhbSBzYWx0IEEgc2FsdFxuICogQHBhcmFtIGluaXRDb2RlIFRoZSBpbml0IGNvZGUgb2YgdGhlIGNvbnRyYWN0IGJlaW5nIGNyZWF0ZWRcbiAqL1xuZXhwb3J0cy5nZW5lcmF0ZUFkZHJlc3MyID0gZnVuY3Rpb24gKGZyb20sIHNhbHQsIGluaXRDb2RlKSB7XG4gICAgdmFyIGZyb21CdWYgPSBleHBvcnRzLnRvQnVmZmVyKGZyb20pO1xuICAgIHZhciBzYWx0QnVmID0gZXhwb3J0cy50b0J1ZmZlcihzYWx0KTtcbiAgICB2YXIgaW5pdENvZGVCdWYgPSBleHBvcnRzLnRvQnVmZmVyKGluaXRDb2RlKTtcbiAgICBhc3NlcnQoZnJvbUJ1Zi5sZW5ndGggPT09IDIwKTtcbiAgICBhc3NlcnQoc2FsdEJ1Zi5sZW5ndGggPT09IDMyKTtcbiAgICB2YXIgYWRkcmVzcyA9IGV4cG9ydHMua2VjY2FrMjU2KEJ1ZmZlci5jb25jYXQoW0J1ZmZlci5mcm9tKCdmZicsICdoZXgnKSwgZnJvbUJ1Ziwgc2FsdEJ1ZiwgZXhwb3J0cy5rZWNjYWsyNTYoaW5pdENvZGVCdWYpXSkpO1xuICAgIHJldHVybiBhZGRyZXNzLnNsaWNlKC0yMCk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHN1cHBsaWVkIGFkZHJlc3MgYmVsb25ncyB0byBhIHByZWNvbXBpbGVkIGFjY291bnQgKEJ5emFudGl1bSkuXG4gKi9cbmV4cG9ydHMuaXNQcmVjb21waWxlZCA9IGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gICAgdmFyIGEgPSBleHBvcnRzLnVucGFkKGFkZHJlc3MpO1xuICAgIHJldHVybiBhLmxlbmd0aCA9PT0gMSAmJiBhWzBdID49IDEgJiYgYVswXSA8PSA4O1xufTtcbi8qKlxuICogQWRkcyBcIjB4XCIgdG8gYSBnaXZlbiBgU3RyaW5nYCBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IHN0YXJ0IHdpdGggXCIweFwiLlxuICovXG5leHBvcnRzLmFkZEhleFByZWZpeCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIGV0aGpzVXRpbC5pc0hleFByZWZpeGVkKHN0cikgPyBzdHIgOiAnMHgnICsgc3RyO1xufTtcbi8qKlxuICogVmFsaWRhdGUgYSBFQ0RTQSBzaWduYXR1cmUuXG4gKiBAcGFyYW0gaG9tZXN0ZWFkT3JMYXRlciBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGlzIGJlaW5nIHVzZWQgb24gZWl0aGVyIHRoZSBob21lc3RlYWQgaGFyZGZvcmsgb3IgYSBsYXRlciBvbmVcbiAqL1xuZXhwb3J0cy5pc1ZhbGlkU2lnbmF0dXJlID0gZnVuY3Rpb24gKHYsIHIsIHMsIGhvbWVzdGVhZE9yTGF0ZXIsIGNoYWluSWQpIHtcbiAgICBpZiAoaG9tZXN0ZWFkT3JMYXRlciA9PT0gdm9pZCAwKSB7IGhvbWVzdGVhZE9yTGF0ZXIgPSB0cnVlOyB9XG4gICAgdmFyIFNFQ1AyNTZLMV9OX0RJVl8yID0gbmV3IEJOKCc3ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjVkNTc2ZTczNTdhNDUwMWRkZmU5MmY0NjY4MWIyMGEwJywgMTYpO1xuICAgIHZhciBTRUNQMjU2SzFfTiA9IG5ldyBCTignZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MScsIDE2KTtcbiAgICBpZiAoci5sZW5ndGggIT09IDMyIHx8IHMubGVuZ3RoICE9PSAzMikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghaXNWYWxpZFNpZ1JlY292ZXJ5KGNhbGN1bGF0ZVNpZ1JlY292ZXJ5KHYsIGNoYWluSWQpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciByQk4gPSBuZXcgQk4ocik7XG4gICAgdmFyIHNCTiA9IG5ldyBCTihzKTtcbiAgICBpZiAockJOLmlzWmVybygpIHx8IHJCTi5ndChTRUNQMjU2SzFfTikgfHwgc0JOLmlzWmVybygpIHx8IHNCTi5ndChTRUNQMjU2SzFfTikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaG9tZXN0ZWFkT3JMYXRlciAmJiBzQk4uY21wKFNFQ1AyNTZLMV9OX0RJVl8yKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBgQnVmZmVyYCBvciBgQXJyYXlgIHRvIEpTT04uXG4gKiBAcGFyYW0gYmEgKEJ1ZmZlcnxBcnJheSlcbiAqIEByZXR1cm4gKEFycmF5fFN0cmluZ3xudWxsKVxuICovXG5leHBvcnRzLmJhVG9KU09OID0gZnVuY3Rpb24gKGJhKSB7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihiYSkpIHtcbiAgICAgICAgcmV0dXJuIFwiMHhcIiArIGJhLnRvU3RyaW5nKCdoZXgnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYmEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChleHBvcnRzLmJhVG9KU09OKGJhW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbn07XG4vKipcbiAqIERlZmluZXMgcHJvcGVydGllcyBvbiBhIGBPYmplY3RgLiBJdCBtYWtlIHRoZSBhc3N1bXB0aW9uIHRoYXQgdW5kZXJseWluZyBkYXRhIGlzIGJpbmFyeS5cbiAqIEBwYXJhbSBzZWxmIHRoZSBgT2JqZWN0YCB0byBkZWZpbmUgcHJvcGVydGllcyBvblxuICogQHBhcmFtIGZpZWxkcyBhbiBhcnJheSBmaWVsZHMgdG8gZGVmaW5lLiBGaWVsZHMgY2FuIGNvbnRhaW46XG4gKiAqIGBuYW1lYCAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0aWVzXG4gKiAqIGBsZW5ndGhgIC0gdGhlIG51bWJlciBvZiBieXRlcyB0aGUgZmllbGQgY2FuIGhhdmVcbiAqICogYGFsbG93TGVzc2AgLSBpZiB0aGUgZmllbGQgY2FuIGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoXG4gKiAqIGBhbGxvd0VtcHR5YFxuICogQHBhcmFtIGRhdGEgZGF0YSB0byBiZSB2YWxpZGF0ZWQgYWdhaW5zdCB0aGUgZGVmaW5pdGlvbnNcbiAqL1xuZXhwb3J0cy5kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHNlbGYsIGZpZWxkcywgZGF0YSkge1xuICAgIHNlbGYucmF3ID0gW107XG4gICAgc2VsZi5fZmllbGRzID0gW107XG4gICAgLy8gYXR0YWNoIHRoZSBgdG9KU09OYFxuICAgIHNlbGYudG9KU09OID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIGlmIChsYWJlbCA9PT0gdm9pZCAwKSB7IGxhYmVsID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICB2YXIgb2JqXzEgPSB7fTtcbiAgICAgICAgICAgIHNlbGYuX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgIG9ial8xW2ZpZWxkXSA9IFwiMHhcIiArIHNlbGZbZmllbGRdLnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9ial8xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHBvcnRzLmJhVG9KU09OKHNlbGYucmF3KTtcbiAgICB9O1xuICAgIHNlbGYuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4gcmxwLmVuY29kZShzZWxmLnJhdyk7XG4gICAgfTtcbiAgICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgICAgc2VsZi5fZmllbGRzLnB1c2goZmllbGQubmFtZSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldHRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnJhd1tpXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzZXR0ZXIodikge1xuICAgICAgICAgICAgdiA9IGV4cG9ydHMudG9CdWZmZXIodik7XG4gICAgICAgICAgICBpZiAodi50b1N0cmluZygnaGV4JykgPT09ICcwMCcgJiYgIWZpZWxkLmFsbG93WmVybykge1xuICAgICAgICAgICAgICAgIHYgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmllbGQuYWxsb3dMZXNzICYmIGZpZWxkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHYgPSBleHBvcnRzLnN0cmlwWmVyb3Modik7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGZpZWxkLmxlbmd0aCA+PSB2Lmxlbmd0aCwgXCJUaGUgZmllbGQgXCIgKyBmaWVsZC5uYW1lICsgXCIgbXVzdCBub3QgaGF2ZSBtb3JlIFwiICsgZmllbGQubGVuZ3RoICsgXCIgYnl0ZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghKGZpZWxkLmFsbG93WmVybyAmJiB2Lmxlbmd0aCA9PT0gMCkgJiYgZmllbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGZpZWxkLmxlbmd0aCA9PT0gdi5sZW5ndGgsIFwiVGhlIGZpZWxkIFwiICsgZmllbGQubmFtZSArIFwiIG11c3QgaGF2ZSBieXRlIGxlbmd0aCBvZiBcIiArIGZpZWxkLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnJhd1tpXSA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGZpZWxkLm5hbWUsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZpZWxkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIHNlbGZbZmllbGQubmFtZV0gPSBmaWVsZC5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGF0dGFjaCBhbGlhc1xuICAgICAgICBpZiAoZmllbGQuYWxpYXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBmaWVsZC5hbGlhcywge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXQ6IHNldHRlcixcbiAgICAgICAgICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gaWYgdGhlIGNvbnN0dWN0b3IgaXMgcGFzc2VkIGRhdGFcbiAgICBpZiAoZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhID0gQnVmZmVyLmZyb20oZXRoanNVdGlsLnN0cmlwSGV4UHJlZml4KGRhdGEpLCAnaGV4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICAgICAgZGF0YSA9IHJscC5kZWNvZGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IHNlbGYuX2ZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIG51bWJlciBvZiBmaWVsZHMgaW4gZGF0YScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGFsbCB0aGUgaXRlbXMgYXJlIGJ1ZmZlcnNcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHNlbGZbc2VsZi5fZmllbGRzW2ldXSA9IGV4cG9ydHMudG9CdWZmZXIoZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBrZXlzXzEgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzXzEuaW5kZXhPZihmaWVsZC5uYW1lKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHNlbGZbZmllbGQubmFtZV0gPSBkYXRhW2ZpZWxkLm5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChrZXlzXzEuaW5kZXhPZihmaWVsZC5hbGlhcykgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBzZWxmW2ZpZWxkLmFsaWFzXSA9IGRhdGFbZmllbGQuYWxpYXNdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZGF0YScpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpZ1JlY292ZXJ5KHYsIGNoYWluSWQpIHtcbiAgICByZXR1cm4gY2hhaW5JZCA/IHYgLSAoMiAqIGNoYWluSWQgKyAzNSkgOiB2IC0gMjc7XG59XG5mdW5jdGlvbiBpc1ZhbGlkU2lnUmVjb3ZlcnkocmVjb3ZlcnkpIHtcbiAgICByZXR1cm4gcmVjb3ZlcnkgPT09IDAgfHwgcmVjb3ZlcnkgPT09IDE7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9