(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "07fN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__("14Xm");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = __webpack_require__("EJiy");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ecc = __webpack_require__("Giuh");
var Fcbuffer = __webpack_require__("Mlzg");
var EosApi = __webpack_require__("LXZV");
var assert = __webpack_require__("9lTW");

var Structs = __webpack_require__("k7df");
var AbiCache = __webpack_require__("Y9UJ");
var writeApiGen = __webpack_require__("VHJ7");
var format = __webpack_require__("3Jjq");
var schema = __webpack_require__("DQ3l");

var token = __webpack_require__("MeIZ");
var system = __webpack_require__("26ZA");
var eosio_null = __webpack_require__("QTbZ");

var Eos = function Eos() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var configDefaults = {
    httpEndpoint: 'http://127.0.0.1:8888',
    debug: false,
    verbose: false,
    broadcast: true,
    logger: {
      log: function log() {
        var _console;

        return config.verbose ? (_console = console).log.apply(_console, arguments) : null;
      },
      error: function error() {
        var _console2;

        return config.verbose ? (_console2 = console).error.apply(_console2, arguments) : null;
      }
    },
    sign: true
  };

  function applyDefaults(target, defaults) {
    Object.keys(defaults).forEach(function (key) {
      if (target[key] === undefined) {
        target[key] = defaults[key];
      }
    });
  }

  applyDefaults(config, configDefaults);
  applyDefaults(config.logger, configDefaults.logger);
  return createEos(config);
};

module.exports = Eos;

Object.assign(Eos, {
  version: '16.0.0',
  modules: {
    format: format,
    api: EosApi,
    ecc: ecc,
    json: {
      api: EosApi.api,
      schema: schema
    },
    Fcbuffer: Fcbuffer
  },

  /** @deprecated */
  Testnet: function Testnet(config) {
    console.error('deprecated, change Eos.Testnet(..) to just Eos(..)');
    return Eos(config);
  },

  /** @deprecated */
  Localnet: function Localnet(config) {
    console.error('deprecated, change Eos.Localnet(..) to just Eos(..)');
    return Eos(config);
  }
});

function createEos(config) {
  var network = config.httpEndpoint != null ? EosApi(config) : null;
  config.network = network;

  var abis = [];
  var abiCache = AbiCache(network, config);
  abis.push(abiCache.abi('eosio.null', eosio_null));
  abis.push(abiCache.abi('eosio.token', token));
  abis.push(abiCache.abi('eosio', system));

  if (!config.chainId) {
    config.chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
  }

  if (network) {
    checkChainId(network, config.chainId, config.logger);
  }

  if (config.mockTransactions != null) {
    if (typeof config.mockTransactions === 'string') {
      var mock = config.mockTransactions;
      config.mockTransactions = function () {
        return mock;
      };
    }
    assert.equal((0, _typeof3.default)(config.mockTransactions), 'function', 'config.mockTransactions');
  }

  var _Structs = Structs(config),
      structs = _Structs.structs,
      types = _Structs.types,
      fromBuffer = _Structs.fromBuffer,
      toBuffer = _Structs.toBuffer;

  var eos = mergeWriteFunctions(config, EosApi, structs, abis);

  Object.assign(eos, {
    config: safeConfig(config),
    fc: {
      structs: structs,
      types: types,
      fromBuffer: fromBuffer,
      toBuffer: toBuffer,
      abiCache: abiCache
    },
    // Repeat of static Eos.modules, help apps that use dependency injection
    modules: {
      format: format
    }
  });

  if (!config.signProvider) {
    config.signProvider = defaultSignProvider(eos, config);
  }

  return eos;
}

/**
  Set each property as read-only, read-write, no-access.  This is shallow
  in that it applies only to the root object and does not limit access
  to properties under a given object.
*/
function safeConfig(config) {
  // access control is shallow references only
  var readOnly = new Set(['httpEndpoint', 'abiCache', 'chainId', 'expireInSeconds']);
  var readWrite = new Set(['verbose', 'debug', 'broadcast', 'logger', 'sign']);
  var protectedConfig = {};

  Object.keys(config).forEach(function (key) {
    Object.defineProperty(protectedConfig, key, {
      set: function set(value) {
        if (readWrite.has(key)) {
          config[key] = value;
          return;
        }
        throw new Error('Access denied');
      },

      get: function get() {
        if (readOnly.has(key) || readWrite.has(key)) {
          return config[key];
        }
        throw new Error('Access denied');
      }
    });
  });
  return protectedConfig;
}

/**
  Merge in write functions (operations).  Tested against existing methods for
  name conflicts.

  @arg {object} config.network - read-only api calls
  @arg {object} EosApi - api[EosApi] read-only api calls
  @return {object} - read and write method calls (create and sign transactions)
  @throw {TypeError} if a funciton name conflicts
*/
function mergeWriteFunctions(config, EosApi, structs, abis) {
  var network = config.network;


  var merge = Object.assign({}, network);

  var writeApi = writeApiGen(EosApi, network, structs, config, abis);
  throwOnDuplicate(merge, writeApi, 'Conflicting methods in EosApi and Transaction Api');
  Object.assign(merge, writeApi);

  return merge;
}

function throwOnDuplicate(o1, o2, msg) {
  for (var key in o1) {
    if (o2[key]) {
      throw new TypeError(msg + ': ' + key);
    }
  }
}

/**
  The default sign provider is designed to interact with the available public
  keys (maybe just one), the transaction, and the blockchain to figure out
  the minimum set of signing keys.

  If only one key is available, the blockchain API calls are skipped and that
  key is used to sign the transaction.
*/
var defaultSignProvider = function defaultSignProvider(eos, config) {
  return function _callee(_ref) {
    var sign = _ref.sign,
        buf = _ref.buf,
        transaction = _ref.transaction,
        optionsKeyProvider = _ref.optionsKeyProvider;

    var keyProvider, keys, pvt, sigs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, keyMap, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _key, isPrivate, isPublic, pubkeys;

    return _regenerator2.default.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // optionsKeyProvider is a per-action key: await eos.someAction('user2' .., {keyProvider: privateKey2})
            keyProvider = optionsKeyProvider ? optionsKeyProvider : config.keyProvider;

            if (keyProvider) {
              _context.next = 3;
              break;
            }

            throw new TypeError('This transaction requires a keyProvider for signing');

          case 3:
            keys = keyProvider;

            if (typeof keyProvider === 'function') {
              keys = keyProvider({ transaction: transaction });
            }

            // keyProvider may return keys or Promise<keys>
            _context.next = 7;
            return _regenerator2.default.awrap(Promise.resolve(keys));

          case 7:
            keys = _context.sent;


            if (!Array.isArray(keys)) {
              keys = [keys];
            }

            keys = keys.map(function (key) {
              try {
                // normalize format (WIF => PVT_K1_base58privateKey)
                return { private: ecc.PrivateKey(key).toString() };
              } catch (e) {
                // normalize format (EOSKey => PUB_K1_base58publicKey)
                return { public: ecc.PublicKey(key).toString() };
              }
              assert(false, 'expecting public or private keys from keyProvider');
            });

            if (keys.length) {
              _context.next = 12;
              break;
            }

            throw new Error('missing key, check your keyProvider');

          case 12:
            if (!(keys.length === 1 && keys[0].private)) {
              _context.next = 15;
              break;
            }

            pvt = keys[0].private;
            return _context.abrupt('return', sign(buf, pvt));

          case 15:
            if (!(config.httpEndpoint == null)) {
              _context.next = 37;
              break;
            }

            sigs = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 20;

            for (_iterator = keys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              key = _step.value;

              sigs.push(sign(buf, key.private));
            }
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](20);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 28:
            _context.prev = 28;
            _context.prev = 29;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 31:
            _context.prev = 31;

            if (!_didIteratorError) {
              _context.next = 34;
              break;
            }

            throw _iteratorError;

          case 34:
            return _context.finish(31);

          case 35:
            return _context.finish(28);

          case 36:
            return _context.abrupt('return', sigs);

          case 37:
            keyMap = new Map();

            // keys are either public or private keys

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 41;
            for (_iterator2 = keys[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _key = _step2.value;
              isPrivate = _key.private != null;
              isPublic = _key.public != null;


              if (isPrivate) {
                keyMap.set(ecc.privateToPublic(_key.private), _key.private);
              } else {
                keyMap.set(_key.public, null);
              }
            }

            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context['catch'](41);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError2) {
              _context.next = 55;
              break;
            }

            throw _iteratorError2;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            pubkeys = Array.from(keyMap.keys());
            return _context.abrupt('return', eos.getRequiredKeys(transaction, pubkeys).then(function (_ref2) {
              var required_keys = _ref2.required_keys;

              if (!required_keys.length) {
                throw new Error('missing required keys for ' + JSON.stringify(transaction));
              }

              var pvts = [],
                  missingKeys = [];

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = required_keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var requiredKey = _step3.value;

                  // normalize (EOSKey.. => PUB_K1_Key..)
                  requiredKey = ecc.PublicKey(requiredKey).toString();

                  var wif = keyMap.get(requiredKey);
                  if (wif) {
                    pvts.push(wif);
                  } else {
                    missingKeys.push(requiredKey);
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              if (missingKeys.length !== 0) {
                assert(typeof keyProvider === 'function', 'keyProvider function is needed for private key lookup');

                // const pubkeys = missingKeys.map(key => ecc.PublicKey(key).toStringLegacy())
                keyProvider({ pubkeys: missingKeys }).forEach(function (pvt) {
                  pvts.push(pvt);
                });
              }

              var sigs = [];
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = pvts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var _pvt = _step4.value;

                  sigs.push(sign(buf, _pvt));
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }

              return sigs;
            }));

          case 59:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this, [[20, 24, 28, 36], [29,, 31, 35], [41, 45, 49, 57], [50,, 52, 56]]);
  };
};

function checkChainId(network, chainId, logger) {
  network.getInfo({}).then(function (info) {
    if (info.chain_id !== chainId) {
      if (logger.log) {
        logger.log('chainId mismatch, signatures will not match transaction authority. ' + ('expected ' + chainId + ' !== actual ' + info.chain_id));
      }
    }
  }).catch(function (error) {
    if (logger.error) {
      logger.error('Warning, unable to validate chainId: ' + error.message);
    }
  });
}

/***/ }),

/***/ "15xT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Aes = __webpack_require__("1ux4");
var PrivateKey = __webpack_require__("tHJk");
var PublicKey = __webpack_require__("zEA4");
var Signature = __webpack_require__("eFFR");
var key_utils = __webpack_require__("nDWd");

module.exports = {
    Aes: Aes, PrivateKey: PrivateKey, PublicKey: PublicKey,
    Signature: Signature, key_utils: key_utils
};

/***/ }),

/***/ "1ux4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var randomBytes = __webpack_require__("Edxu");
var ByteBuffer = __webpack_require__("DGy1");
var crypto = __webpack_require__("/ab2");
var assert = __webpack_require__("9lTW");
var PublicKey = __webpack_require__("zEA4");
var PrivateKey = __webpack_require__("tHJk");
var hash = __webpack_require__("3HdZ");

var Long = ByteBuffer.Long;

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt

    /**
        Spec: http://localhost:3002/steem/@dantheman/how-to-encrypt-a-memo-when-transferring-steem
    
        @throws {Error|TypeError} - "Invalid Key, ..."
    
        @arg {PrivateKey} private_key - required and used for decryption
        @arg {PublicKey} public_key - required and used to calcualte the shared secret
        @arg {string} [nonce = uniqueNonce()] - assigned a random unique uint64
    
        @return {object}
        @property {string} nonce - random or unique uint64, provides entropy when re-using the same private/public keys.
        @property {Buffer} message - Plain text message
        @property {number} checksum - shared secret checksum
    */
};function encrypt(private_key, public_key, message) {
    var nonce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : uniqueNonce();

    return crypt(private_key, public_key, nonce, message);
}

/**
    Spec: http://localhost:3002/steem/@dantheman/how-to-encrypt-a-memo-when-transferring-steem

    @arg {PrivateKey} private_key - required and used for decryption
    @arg {PublicKey} public_key - required and used to calcualte the shared secret
    @arg {string} nonce - random or unique uint64, provides entropy when re-using the same private/public keys.
    @arg {Buffer} message - Encrypted or plain text message
    @arg {number} checksum - shared secret checksum

    @throws {Error|TypeError} - "Invalid Key, ..."

    @return {Buffer} - message
*/
function decrypt(private_key, public_key, nonce, message, checksum) {
    return crypt(private_key, public_key, nonce, message, checksum).message;
}

/**
    @arg {Buffer} message - Encrypted or plain text message (see checksum)
    @arg {number} checksum - shared secret checksum (null to encrypt, non-null to decrypt)
    @private
*/
function crypt(private_key, public_key, nonce, message, checksum) {
    private_key = PrivateKey(private_key);
    if (!private_key) throw new TypeError('private_key is required');

    public_key = PublicKey(public_key);
    if (!public_key) throw new TypeError('public_key is required');

    nonce = toLongObj(nonce);
    if (!nonce) throw new TypeError('nonce is required');

    if (!Buffer.isBuffer(message)) {
        if (typeof message !== 'string') throw new TypeError('message should be buffer or string');
        message = new Buffer(message, 'binary');
    }
    if (checksum && typeof checksum !== 'number') throw new TypeError('checksum should be a number');

    var S = private_key.getSharedSecret(public_key);
    var ebuf = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    ebuf.writeUint64(nonce);
    ebuf.append(S.toString('binary'), 'binary');
    ebuf = new Buffer(ebuf.copy(0, ebuf.offset).toBinary(), 'binary');
    var encryption_key = hash.sha512(ebuf);

    // D E B U G
    // console.log('crypt', {
    //     priv_to_pub: private_key.toPublic().toString(),
    //     pub: public_key.toString(),
    //     nonce: nonce.toString(),
    //     message: message.length,
    //     checksum,
    //     S: S.toString('hex'),
    //     encryption_key: encryption_key.toString('hex'),
    // })

    var iv = encryption_key.slice(32, 48);
    var key = encryption_key.slice(0, 32);

    // check is first 64 bit of sha256 hash treated as uint64_t truncated to 32 bits.
    var check = hash.sha256(encryption_key);
    check = check.slice(0, 4);
    var cbuf = ByteBuffer.fromBinary(check.toString('binary'), ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    check = cbuf.readUint32();

    if (checksum) {
        if (check !== checksum) throw new Error('Invalid key');
        message = cryptoJsDecrypt(message, key, iv);
    } else {
        message = cryptoJsEncrypt(message, key, iv);
    }
    return { nonce: nonce, message: message, checksum: check };
}

/** This method does not use a checksum, the returned data must be validated some other way.

    @arg {string|Buffer} message - ciphertext binary format
    @arg {string<utf8>|Buffer} key - 256bit
    @arg {string<utf8>|Buffer} iv - 128bit

    @return {Buffer}
*/
function cryptoJsDecrypt(message, key, iv) {
    assert(message, "Missing cipher text");
    message = toBinaryBuffer(message);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // decipher.setAutoPadding(true)
    message = Buffer.concat([decipher.update(message), decipher.final()]);
    return message;
}

/** This method does not use a checksum, the returned data must be validated some other way.
    @arg {string|Buffer} message - plaintext binary format
    @arg {string<utf8>|Buffer} key - 256bit
    @arg {string<utf8>|Buffer} iv - 128bit

    @return {Buffer}
*/
function cryptoJsEncrypt(message, key, iv) {
    assert(message, "Missing plain text");
    message = toBinaryBuffer(message);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    // cipher.setAutoPadding(true)
    message = Buffer.concat([cipher.update(message), cipher.final()]);
    return message;
}

/** @return {string} unique 64 bit unsigned number string.  Being time based, this is careful to never choose the same nonce twice.  This value could be recorded in the blockchain for a long time.
*/
function uniqueNonce() {
    if (unique_nonce_entropy === null) {
        var b = new Uint8Array(randomBytes(2));
        unique_nonce_entropy = parseInt(b[0] << 8 | b[1], 10);
    }
    var long = Long.fromNumber(Date.now());
    var entropy = ++unique_nonce_entropy % 0xFFFF;
    // console.log('uniqueNonce date\t', ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    // console.log('uniqueNonce entropy\t', ByteBuffer.allocate(8).writeUint64(Long.fromNumber(entropy)).toHex(0))
    long = long.shiftLeft(16).or(Long.fromNumber(entropy));
    // console.log('uniqueNonce final\t', ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    return long.toString();
}
var unique_nonce_entropy = null;
// for(let i=1; i < 10; i++) key.uniqueNonce()

var toLongObj = function toLongObj(o) {
    return o ? Long.isLong(o) ? o : Long.fromString(o) : o;
};
var toBinaryBuffer = function toBinaryBuffer(o) {
    return o ? Buffer.isBuffer(o) ? o : new Buffer(o, 'binary') : o;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "26ZA":
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.0\",\"types\":[{\"new_type_name\":\"account_name\",\"type\":\"name\"},{\"new_type_name\":\"permission_name\",\"type\":\"name\"},{\"new_type_name\":\"action_name\",\"type\":\"name\"},{\"new_type_name\":\"transaction_id_type\",\"type\":\"checksum256\"},{\"new_type_name\":\"weight_type\",\"type\":\"uint16\"}],\"____comment\":\"eosio.bios structs: set_account_limits, setpriv, set_global_limits, producer_key, set_producers, require_auth are provided so abi available for deserialization in future.\",\"structs\":[{\"name\":\"permission_level\",\"base\":\"\",\"fields\":[{\"name\":\"actor\",\"type\":\"account_name\"},{\"name\":\"permission\",\"type\":\"permission_name\"}]},{\"name\":\"key_weight\",\"base\":\"\",\"fields\":[{\"name\":\"key\",\"type\":\"public_key\"},{\"name\":\"weight\",\"type\":\"weight_type\"}]},{\"name\":\"bidname\",\"base\":\"\",\"fields\":[{\"name\":\"bidder\",\"type\":\"account_name\"},{\"name\":\"newname\",\"type\":\"account_name\"},{\"name\":\"bid\",\"type\":\"asset\"}]},{\"name\":\"permission_level_weight\",\"base\":\"\",\"fields\":[{\"name\":\"permission\",\"type\":\"permission_level\"},{\"name\":\"weight\",\"type\":\"weight_type\"}]},{\"name\":\"wait_weight\",\"base\":\"\",\"fields\":[{\"name\":\"wait_sec\",\"type\":\"uint32\"},{\"name\":\"weight\",\"type\":\"weight_type\"}]},{\"name\":\"authority\",\"base\":\"\",\"fields\":[{\"name\":\"threshold\",\"type\":\"uint32\"},{\"name\":\"keys\",\"type\":\"key_weight[]\"},{\"name\":\"accounts\",\"type\":\"permission_level_weight[]\"},{\"name\":\"waits\",\"type\":\"wait_weight[]\"}]},{\"name\":\"newaccount\",\"base\":\"\",\"fields\":[{\"name\":\"creator\",\"type\":\"account_name\"},{\"name\":\"name\",\"type\":\"account_name\"},{\"name\":\"owner\",\"type\":\"authority\"},{\"name\":\"active\",\"type\":\"authority\"}]},{\"name\":\"setcode\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"vmtype\",\"type\":\"uint8\"},{\"name\":\"vmversion\",\"type\":\"uint8\"},{\"name\":\"code\",\"type\":\"bytes\"}]},{\"name\":\"setabi\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"abi\",\"type\":\"bytes\"}]},{\"name\":\"updateauth\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"permission\",\"type\":\"permission_name\"},{\"name\":\"parent\",\"type\":\"permission_name\"},{\"name\":\"auth\",\"type\":\"authority\"}]},{\"name\":\"deleteauth\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"permission\",\"type\":\"permission_name\"}]},{\"name\":\"linkauth\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"code\",\"type\":\"account_name\"},{\"name\":\"type\",\"type\":\"action_name\"},{\"name\":\"requirement\",\"type\":\"permission_name\"}]},{\"name\":\"unlinkauth\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"code\",\"type\":\"account_name\"},{\"name\":\"type\",\"type\":\"action_name\"}]},{\"name\":\"canceldelay\",\"base\":\"\",\"fields\":[{\"name\":\"canceling_auth\",\"type\":\"permission_level\"},{\"name\":\"trx_id\",\"type\":\"transaction_id_type\"}]},{\"name\":\"onerror\",\"base\":\"\",\"fields\":[{\"name\":\"sender_id\",\"type\":\"uint128\"},{\"name\":\"sent_trx\",\"type\":\"bytes\"}]},{\"name\":\"buyrambytes\",\"base\":\"\",\"fields\":[{\"name\":\"payer\",\"type\":\"account_name\"},{\"name\":\"receiver\",\"type\":\"account_name\"},{\"name\":\"bytes\",\"type\":\"uint32\"}]},{\"name\":\"sellram\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"bytes\",\"type\":\"uint64\"}]},{\"name\":\"buyram\",\"base\":\"\",\"fields\":[{\"name\":\"payer\",\"type\":\"account_name\"},{\"name\":\"receiver\",\"type\":\"account_name\"},{\"name\":\"quant\",\"type\":\"asset\"}]},{\"name\":\"delegatebw\",\"base\":\"\",\"fields\":[{\"name\":\"from\",\"type\":\"account_name\"},{\"name\":\"receiver\",\"type\":\"account_name\"},{\"name\":\"stake_net_quantity\",\"type\":\"asset\"},{\"name\":\"stake_cpu_quantity\",\"type\":\"asset\"},{\"name\":\"transfer\",\"type\":\"bool\"}]},{\"name\":\"undelegatebw\",\"base\":\"\",\"fields\":[{\"name\":\"from\",\"type\":\"account_name\"},{\"name\":\"receiver\",\"type\":\"account_name\"},{\"name\":\"unstake_net_quantity\",\"type\":\"asset\"},{\"name\":\"unstake_cpu_quantity\",\"type\":\"asset\"}]},{\"name\":\"refund\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"}]},{\"name\":\"delegated_bandwidth\",\"base\":\"\",\"fields\":[{\"name\":\"from\",\"type\":\"account_name\"},{\"name\":\"to\",\"type\":\"account_name\"},{\"name\":\"net_weight\",\"type\":\"asset\"},{\"name\":\"cpu_weight\",\"type\":\"asset\"}]},{\"name\":\"user_resources\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"},{\"name\":\"net_weight\",\"type\":\"asset\"},{\"name\":\"cpu_weight\",\"type\":\"asset\"},{\"name\":\"ram_bytes\",\"type\":\"uint64\"}]},{\"name\":\"total_resources\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"},{\"name\":\"net_weight\",\"type\":\"asset\"},{\"name\":\"cpu_weight\",\"type\":\"asset\"},{\"name\":\"ram_bytes\",\"type\":\"uint64\"}]},{\"name\":\"refund_request\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"},{\"name\":\"request_time\",\"type\":\"time_point_sec\"},{\"name\":\"net_amount\",\"type\":\"asset\"},{\"name\":\"cpu_amount\",\"type\":\"asset\"}]},{\"name\":\"blockchain_parameters\",\"base\":\"\",\"fields\":[{\"name\":\"max_block_net_usage\",\"type\":\"uint64\"},{\"name\":\"target_block_net_usage_pct\",\"type\":\"uint32\"},{\"name\":\"max_transaction_net_usage\",\"type\":\"uint32\"},{\"name\":\"base_per_transaction_net_usage\",\"type\":\"uint32\"},{\"name\":\"net_usage_leeway\",\"type\":\"uint32\"},{\"name\":\"context_free_discount_net_usage_num\",\"type\":\"uint32\"},{\"name\":\"context_free_discount_net_usage_den\",\"type\":\"uint32\"},{\"name\":\"max_block_cpu_usage\",\"type\":\"uint32\"},{\"name\":\"target_block_cpu_usage_pct\",\"type\":\"uint32\"},{\"name\":\"max_transaction_cpu_usage\",\"type\":\"uint32\"},{\"name\":\"min_transaction_cpu_usage\",\"type\":\"uint32\"},{\"name\":\"max_transaction_lifetime\",\"type\":\"uint32\"},{\"name\":\"deferred_trx_expiration_window\",\"type\":\"uint32\"},{\"name\":\"max_transaction_delay\",\"type\":\"uint32\"},{\"name\":\"max_inline_action_size\",\"type\":\"uint32\"},{\"name\":\"max_inline_action_depth\",\"type\":\"uint16\"},{\"name\":\"max_authority_depth\",\"type\":\"uint16\"}]},{\"name\":\"eosio_global_state\",\"base\":\"blockchain_parameters\",\"fields\":[{\"name\":\"max_ram_size\",\"type\":\"uint64\"},{\"name\":\"total_ram_bytes_reserved\",\"type\":\"uint64\"},{\"name\":\"total_ram_stake\",\"type\":\"int64\"},{\"name\":\"last_producer_schedule_update\",\"type\":\"block_timestamp_type\"},{\"name\":\"last_pervote_bucket_fill\",\"type\":\"uint64\"},{\"name\":\"pervote_bucket\",\"type\":\"int64\"},{\"name\":\"perblock_bucket\",\"type\":\"int64\"},{\"name\":\"total_unpaid_blocks\",\"type\":\"uint32\"},{\"name\":\"total_activated_stake\",\"type\":\"int64\"},{\"name\":\"thresh_activated_stake_time\",\"type\":\"uint64\"},{\"name\":\"last_producer_schedule_size\",\"type\":\"uint16\"},{\"name\":\"total_producer_vote_weight\",\"type\":\"float64\"},{\"name\":\"last_name_close\",\"type\":\"block_timestamp_type\"}]},{\"name\":\"producer_info\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"},{\"name\":\"total_votes\",\"type\":\"float64\"},{\"name\":\"producer_key\",\"type\":\"public_key\"},{\"name\":\"is_active\",\"type\":\"bool\"},{\"name\":\"url\",\"type\":\"string\"},{\"name\":\"unpaid_blocks\",\"type\":\"uint32\"},{\"name\":\"last_claim_time\",\"type\":\"uint64\"},{\"name\":\"location\",\"type\":\"uint16\"}]},{\"name\":\"regproducer\",\"base\":\"\",\"fields\":[{\"name\":\"producer\",\"type\":\"account_name\"},{\"name\":\"producer_key\",\"type\":\"public_key\"},{\"name\":\"url\",\"type\":\"string\"},{\"name\":\"location\",\"type\":\"uint16\"}]},{\"name\":\"unregprod\",\"base\":\"\",\"fields\":[{\"name\":\"producer\",\"type\":\"account_name\"}]},{\"name\":\"setram\",\"base\":\"\",\"fields\":[{\"name\":\"max_ram_size\",\"type\":\"uint64\"}]},{\"name\":\"regproxy\",\"base\":\"\",\"fields\":[{\"name\":\"proxy\",\"type\":\"account_name\"},{\"name\":\"isproxy\",\"type\":\"bool\"}]},{\"name\":\"voteproducer\",\"base\":\"\",\"fields\":[{\"name\":\"voter\",\"type\":\"account_name\"},{\"name\":\"proxy\",\"type\":\"account_name\"},{\"name\":\"producers\",\"type\":\"account_name[]\"}]},{\"name\":\"voter_info\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"},{\"name\":\"proxy\",\"type\":\"account_name\"},{\"name\":\"producers\",\"type\":\"account_name[]\"},{\"name\":\"staked\",\"type\":\"int64\"},{\"name\":\"last_vote_weight\",\"type\":\"float64\"},{\"name\":\"proxied_vote_weight\",\"type\":\"float64\"},{\"name\":\"is_proxy\",\"type\":\"bool\"}]},{\"name\":\"claimrewards\",\"base\":\"\",\"fields\":[{\"name\":\"owner\",\"type\":\"account_name\"}]},{\"name\":\"setpriv\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"is_priv\",\"type\":\"int8\"}]},{\"name\":\"rmvproducer\",\"base\":\"\",\"fields\":[{\"name\":\"producer\",\"type\":\"account_name\"}]},{\"name\":\"set_account_limits\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"ram_bytes\",\"type\":\"int64\"},{\"name\":\"net_weight\",\"type\":\"int64\"},{\"name\":\"cpu_weight\",\"type\":\"int64\"}]},{\"name\":\"set_global_limits\",\"base\":\"\",\"fields\":[{\"name\":\"cpu_usec_per_period\",\"type\":\"int64\"}]},{\"name\":\"producer_key\",\"base\":\"\",\"fields\":[{\"name\":\"producer_name\",\"type\":\"account_name\"},{\"name\":\"block_signing_key\",\"type\":\"public_key\"}]},{\"name\":\"set_producers\",\"base\":\"\",\"fields\":[{\"name\":\"schedule\",\"type\":\"producer_key[]\"}]},{\"name\":\"require_auth\",\"base\":\"\",\"fields\":[{\"name\":\"from\",\"type\":\"account_name\"}]},{\"name\":\"setparams\",\"base\":\"\",\"fields\":[{\"name\":\"params\",\"type\":\"blockchain_parameters\"}]},{\"name\":\"connector\",\"base\":\"\",\"fields\":[{\"name\":\"balance\",\"type\":\"asset\"},{\"name\":\"weight\",\"type\":\"float64\"}]},{\"name\":\"exchange_state\",\"base\":\"\",\"fields\":[{\"name\":\"supply\",\"type\":\"asset\"},{\"name\":\"base\",\"type\":\"connector\"},{\"name\":\"quote\",\"type\":\"connector\"}]},{\"name\":\"namebid_info\",\"base\":\"\",\"fields\":[{\"name\":\"newname\",\"type\":\"account_name\"},{\"name\":\"high_bidder\",\"type\":\"account_name\"},{\"name\":\"high_bid\",\"type\":\"int64\"},{\"name\":\"last_bid_time\",\"type\":\"uint64\"}]}],\"actions\":[{\"name\":\"newaccount\",\"type\":\"newaccount\",\"ricardian_contract\":\"\"},{\"name\":\"setcode\",\"type\":\"setcode\",\"ricardian_contract\":\"\"},{\"name\":\"setabi\",\"type\":\"setabi\",\"ricardian_contract\":\"\"},{\"name\":\"updateauth\",\"type\":\"updateauth\",\"ricardian_contract\":\"\"},{\"name\":\"deleteauth\",\"type\":\"deleteauth\",\"ricardian_contract\":\"\"},{\"name\":\"linkauth\",\"type\":\"linkauth\",\"ricardian_contract\":\"\"},{\"name\":\"unlinkauth\",\"type\":\"unlinkauth\",\"ricardian_contract\":\"\"},{\"name\":\"canceldelay\",\"type\":\"canceldelay\",\"ricardian_contract\":\"\"},{\"name\":\"onerror\",\"type\":\"onerror\",\"ricardian_contract\":\"\"},{\"name\":\"buyrambytes\",\"type\":\"buyrambytes\",\"ricardian_contract\":\"\"},{\"name\":\"buyram\",\"type\":\"buyram\",\"ricardian_contract\":\"\"},{\"name\":\"sellram\",\"type\":\"sellram\",\"ricardian_contract\":\"\"},{\"name\":\"delegatebw\",\"type\":\"delegatebw\",\"ricardian_contract\":\"\"},{\"name\":\"undelegatebw\",\"type\":\"undelegatebw\",\"ricardian_contract\":\"\"},{\"name\":\"refund\",\"type\":\"refund\",\"ricardian_contract\":\"\"},{\"name\":\"regproducer\",\"type\":\"regproducer\",\"ricardian_contract\":\"\"},{\"name\":\"setram\",\"type\":\"setram\",\"ricardian_contract\":\"\"},{\"name\":\"bidname\",\"type\":\"bidname\",\"ricardian_contract\":\"\"},{\"name\":\"unregprod\",\"type\":\"unregprod\",\"ricardian_contract\":\"\"},{\"name\":\"regproxy\",\"type\":\"regproxy\",\"ricardian_contract\":\"\"},{\"name\":\"voteproducer\",\"type\":\"voteproducer\",\"ricardian_contract\":\"\"},{\"name\":\"claimrewards\",\"type\":\"claimrewards\",\"ricardian_contract\":\"\"},{\"name\":\"setpriv\",\"type\":\"setpriv\",\"ricardian_contract\":\"\"},{\"name\":\"rmvproducer\",\"type\":\"rmvproducer\",\"ricardian_contract\":\"\"},{\"name\":\"setalimits\",\"type\":\"set_account_limits\",\"ricardian_contract\":\"\"},{\"name\":\"setglimits\",\"type\":\"set_global_limits\",\"ricardian_contract\":\"\"},{\"name\":\"setprods\",\"type\":\"set_producers\",\"ricardian_contract\":\"\"},{\"name\":\"reqauth\",\"type\":\"require_auth\",\"ricardian_contract\":\"\"},{\"name\":\"setparams\",\"type\":\"setparams\",\"ricardian_contract\":\"\"}],\"tables\":[{\"name\":\"producers\",\"type\":\"producer_info\",\"index_type\":\"i64\",\"key_names\":[\"owner\"],\"key_types\":[\"uint64\"]},{\"name\":\"global\",\"type\":\"eosio_global_state\",\"index_type\":\"i64\",\"key_names\":[],\"key_types\":[]},{\"name\":\"voters\",\"type\":\"voter_info\",\"index_type\":\"i64\",\"key_names\":[\"owner\"],\"key_types\":[\"account_name\"]},{\"name\":\"userres\",\"type\":\"user_resources\",\"index_type\":\"i64\",\"key_names\":[\"owner\"],\"key_types\":[\"uint64\"]},{\"name\":\"delband\",\"type\":\"delegated_bandwidth\",\"index_type\":\"i64\",\"key_names\":[\"to\"],\"key_types\":[\"uint64\"]},{\"name\":\"rammarket\",\"type\":\"exchange_state\",\"index_type\":\"i64\",\"key_names\":[\"supply\"],\"key_types\":[\"uint64\"]},{\"name\":\"refunds\",\"type\":\"refund_request\",\"index_type\":\"i64\",\"key_names\":[\"owner\"],\"key_types\":[\"uint64\"]},{\"name\":\"namebids\",\"type\":\"namebid_info\",\"index_type\":\"i64\",\"key_names\":[\"newname\"],\"key_types\":[\"account_name\"]}],\"ricardian_clauses\":[],\"abi_extensions\":[]}");

/***/ }),

/***/ "3HdZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createHash = __webpack_require__("mObS");
var createHmac = __webpack_require__("Giow");

/** @namespace hash */

/** @arg {string|Buffer} data
    @arg {string} [resultEncoding = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when resultEncoding is null, or string
*/
function sha1(data, resultEncoding) {
    return createHash('sha1').update(data).digest(resultEncoding);
}

/** @arg {string|Buffer} data
    @arg {string} [resultEncoding = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when resultEncoding is null, or string
*/
function sha256(data, resultEncoding) {
    return createHash('sha256').update(data).digest(resultEncoding);
}

/** @arg {string|Buffer} data
    @arg {string} [resultEncoding = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when resultEncoding is null, or string
*/
function sha512(data, resultEncoding) {
    return createHash('sha512').update(data).digest(resultEncoding);
}

function HmacSHA256(buffer, secret) {
    return createHmac('sha256', secret).update(buffer).digest();
}

function ripemd160(data) {
    return createHash('rmd160').update(data).digest();
}

// function hash160(buffer) {
//   return ripemd160(sha256(buffer))
// }
//
// function hash256(buffer) {
//   return sha256(sha256(buffer))
// }

//
// function HmacSHA512(buffer, secret) {
//   return crypto.createHmac('sha512', secret).update(buffer).digest()
// }

module.exports = {
    sha1: sha1,
    sha256: sha256,
    sha512: sha512,
    HmacSHA256: HmacSHA256,
    ripemd160: ripemd160
    // hash160: hash160,
    // hash256: hash256,
    // HmacSHA512: HmacSHA512
};

/***/ }),

/***/ "3Jjq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__("sk9p");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = __webpack_require__("EJiy");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = __webpack_require__("9lTW");

var _require = __webpack_require__("DGy1"),
    Long = _require.Long;

module.exports = {
  ULong: ULong,
  isName: isName,
  encodeName: encodeName, // encode human readable name to uint64 (number string)
  decodeName: decodeName, // decode from uint64 to human readable
  encodeNameHex: function encodeNameHex(name) {
    return Long.fromString(encodeName(name), true).toString(16);
  },
  decodeNameHex: function decodeNameHex(hex) {
    var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return decodeName(Long.fromString(hex, true, 16).toString(), littleEndian);
  },
  DecimalString: DecimalString,
  DecimalPad: DecimalPad,
  DecimalImply: DecimalImply,
  DecimalUnimply: DecimalUnimply,
  printAsset: printAsset,
  parseAsset: parseAsset

  /** @private */
};var signed = function signed(fn) {
  return function () {};
};

function ULong(value) {
  var unsigned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  if (typeof value === 'number') {
    // Some JSON libs use numbers for values under 53 bits or strings for larger.
    // Accomidate but double-check it..
    if (value > Number.MAX_SAFE_INTEGER) throw new TypeError('value parameter overflow');

    value = Long.fromString(String(value), unsigned, radix);
  } else if (typeof value === 'string') {
    value = Long.fromString(value, unsigned, radix);
  } else if (!Long.isLong(value)) {
    throw new TypeError('value parameter is a requied Long, Number or String');
  }
  return value;
}

function isName(str, err) {
  try {
    encodeName(str);
    return true;
  } catch (error) {
    if (err) {
      err(error);
    }
    return false;
  }
}

var charmap = '.12345abcdefghijklmnopqrstuvwxyz';
var charidx = function charidx(ch) {
  var idx = charmap.indexOf(ch);
  if (idx === -1) throw new TypeError('Invalid character: \'' + ch + '\'');

  return idx;
};

/** Original Name encode and decode logic is in github.com/eosio/eos  native.hpp */

/**
  Encode a name (a base32 string) to a number.

  For performance reasons, the blockchain uses the numerical encoding of strings
  for very common types like account names.

  @see types.hpp string_to_name

  @arg {string} name - A string to encode, up to 12 characters long.
  @arg {string} [littleEndian = true] - Little or Bigendian encoding

  @return {string<uint64>} - compressed string (from name arg).  A string is
    always used because a number could exceed JavaScript's 52 bit limit.
*/
function encodeName(name) {
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof name !== 'string') throw new TypeError('name parameter is a required string');

  if (name.length > 12) throw new TypeError('A name can be up to 12 characters long');

  var bitstr = '';
  for (var i = 0; i <= 12; i++) {
    // process all 64 bits (even if name is short)
    var c = i < name.length ? charidx(name[i]) : 0;
    var bitlen = i < 12 ? 5 : 4;
    var bits = Number(c).toString(2);
    if (bits.length > bitlen) {
      throw new TypeError('Invalid name ' + name);
    }
    bits = '0'.repeat(bitlen - bits.length) + bits;
    bitstr += bits;
  }

  var value = Long.fromString(bitstr, true, 2);

  // convert to LITTLE_ENDIAN
  var leHex = '';
  var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = bytes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var b = _step.value;

      var n = Number(b).toString(16);
      leHex += (n.length === 1 ? '0' : '') + n;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var ulName = Long.fromString(leHex, true, 16).toString();

  // console.log('encodeName', name, value.toString(), ulName.toString(), JSON.stringify(bitstr.split(/(.....)/).slice(1)))

  return ulName.toString();
}

/**
  @arg {Long|String|number} value uint64
  @arg {string} [littleEndian = true] - Little or Bigendian encoding

  @return {string}
*/
function decodeName(value) {
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  value = ULong(value);

  // convert from LITTLE_ENDIAN
  var beHex = '';
  var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = bytes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var b = _step2.value;

      var n = Number(b).toString(16);
      beHex += (n.length === 1 ? '0' : '') + n;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  beHex += '0'.repeat(16 - beHex.length);

  var fiveBits = Long.fromNumber(0x1f, true);
  var fourBits = Long.fromNumber(0x0f, true);
  var beValue = Long.fromString(beHex, true, 16);

  var str = '';
  var tmp = beValue;

  for (var i = 0; i <= 12; i++) {
    var c = charmap[tmp.and(i === 0 ? fourBits : fiveBits)];
    str = c + str;
    tmp = tmp.shiftRight(i === 0 ? 4 : 5);
  }
  str = str.replace(/\.+$/, ''); // remove trailing dots (all of them)

  // console.log('decodeName', str, beValue.toString(), value.toString(), JSON.stringify(beValue.toString(2).split(/(.....)/).slice(1)))

  return str;
}

/**
  Normalize and validate decimal string (potentially large values).  Should
  avoid internationalization issues if possible but will be safe and
  throw an error for an invalid number.

  Normalization removes extra zeros or decimal.

  @return {string} value
*/
function DecimalString(value) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);

  var neg = /^-/.test(value);
  if (neg) {
    value = value.substring(1);
  }

  if (value[0] === '.') {
    value = '0' + value;
  }

  var part = value.split('.');
  assert(part.length <= 2, 'invalid decimal ' + value);
  assert(/^\d+(,?\d)*\d*$/.test(part[0]), 'invalid decimal ' + value);

  if (part.length === 2) {
    assert(/^\d*$/.test(part[1]), 'invalid decimal ' + value);
    part[1] = part[1].replace(/0+$/, ''); // remove suffixing zeros
    if (part[1] === '') {
      part.pop();
    }
  }

  part[0] = part[0].replace(/^0*/, ''); // remove leading zeros
  if (part[0] === '') {
    part[0] = '0';
  }
  return (neg ? '-' : '') + part.join('.');
}

/**
  Ensure a fixed number of decimal places.  Safe for large numbers.

  @see ./format.test.js

  @example DecimalPad(10.2, 3) === '10.200'

  @arg {number|string|object.toString} num
  @arg {number} [precision = null] - number of decimal places.  Null skips
    padding suffix but still applies number format normalization.
  @return {string} decimal part is added and zero padded to match precision
*/
function DecimalPad(num, precision) {
  var value = DecimalString(num);
  if (precision == null) {
    return value;
  }

  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  var part = value.split('.');

  if (precision === 0 && part.length === 1) {
    return part[0];
  }

  if (part.length === 1) {
    return part[0] + '.' + '0'.repeat(precision);
  } else {
    var pad = precision - part[1].length;
    assert(pad >= 0, 'decimal \'' + value + '\' exceeds precision ' + precision);
    return part[0] + '.' + part[1] + '0'.repeat(pad);
  }
}

/** Ensures proper trailing zeros then removes decimal place. */
function DecimalImply(value, precision) {
  return DecimalPad(value, precision).replace('.', '');
}

/**
  Put the decimal place back in its position and return the normalized number
  string (with any unnecessary zeros or an unnecessary decimal removed).

  @arg {string|number|value.toString} value 10000
  @arg {number} precision 4
  @return {number} 1.0000
*/
function DecimalUnimply(value, precision) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);
  var neg = /^-/.test(value);
  if (neg) {
    value = value.substring(1);
  }
  assert(/^\d+$/.test(value), 'invalid whole number ' + value);
  assert(precision != null, 'precision required');
  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  // Ensure minimum length
  var pad = precision - value.length;
  if (pad > 0) {
    value = '' + '0'.repeat(pad) + value;
  }

  var dotIdx = value.length - precision;
  value = value.slice(0, dotIdx) + '.' + value.slice(dotIdx);
  return (neg ? '-' : '') + DecimalPad(value, precision); // Normalize
}

/** @private for now, support for asset strings is limited
*/
function printAsset(_ref) {
  var amount = _ref.amount,
      precision = _ref.precision,
      symbol = _ref.symbol,
      contract = _ref.contract;

  assert.equal(typeof symbol === 'undefined' ? 'undefined' : (0, _typeof3.default)(symbol), 'string', 'symbol is a required string');

  if (amount != null && precision != null) {
    amount = DecimalPad(amount, precision);
  }

  var join = function join(e1, e2) {
    return e1 == null ? '' : e2 == null ? '' : e1 + e2;
  };

  if (amount != null) {
    // the amount contains the precision
    return join(amount, ' ') + symbol + join('@', contract);
  }

  return join(precision, ',') + symbol + join('@', contract);
}

/**
  Attempts to parse all forms of the asset strings (symbol, asset, or extended
  versions).  If the provided string contains any additional or appears to have
  invalid information an error is thrown.

  @return {object} {amount, precision, symbol, contract}
  @throws AssertionError
*/
function parseAsset(str) {
  var _str$split = str.split(' '),
      _str$split2 = (0, _slicedToArray3.default)(_str$split, 1),
      amountRaw = _str$split2[0];

  var amountMatch = amountRaw.match(/^(-?[0-9]+(\.[0-9]+)?)( |$)/);
  var amount = amountMatch ? amountMatch[1] : null;

  var precisionMatch = str.match(/(^| )([0-9]+),([A-Z]+)(@|$)/);
  var precisionSymbol = precisionMatch ? Number(precisionMatch[2]) : null;
  var precisionAmount = amount ? (amount.split('.')[1] || '').length : null;
  var precision = precisionSymbol != null ? precisionSymbol : precisionAmount;

  var symbolMatch = str.match(/(^| |,)([A-Z]+)(@|$)/);
  var symbol = symbolMatch ? symbolMatch[2] : null;

  var _str$split3 = str.split('@'),
      _str$split4 = (0, _slicedToArray3.default)(_str$split3, 2),
      _str$split4$ = _str$split4[1],
      contractRaw = _str$split4$ === undefined ? '' : _str$split4$;

  var contract = /^[a-z0-5]+(\.[a-z0-5]+)*$/.test(contractRaw) ? contractRaw : null;

  var check = printAsset({ amount: amount, precision: precision, symbol: symbol, contract: contract });

  assert.equal(str, check, 'Invalid asset string: ' + str + ' !== ' + check);

  if (precision != null) {
    assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');
  }
  if (symbol != null) {
    assert(symbol.length <= 7, 'Asset symbol is 7 characters or less');
  }
  if (contract != null) {
    assert(contract.length <= 12, 'Contract is 12 characters or less');
  }

  return { amount: amount, precision: precision, symbol: symbol, contract: contract };
}

/***/ }),

/***/ "6ayh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Set,
	Map,
	WeakSet,
	WeakMap,

	Promise,

	Symbol,
	Proxy,

	Atomics,
	SharedArrayBuffer,

	ArrayBuffer,
	DataView,
	Uint8Array,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new TypeError(); };

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};


/***/ }),

/***/ "Ce98":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"uint64\",\"checksum160\":\"fixed_bytes20\",\"checksum256\":\"fixed_bytes32\",\"checksum512\":\"fixed_bytes64\",\"signature\":\"fixed_bytes65\",\"public_key\":\"fixed_bytes33\",\"message_type\":\"fixed_string16\",\"symbol\":\"uint64\",\"symbol_code\":\"uint64\",\"field_name\":\"string\",\"account_name\":\"name\",\"permission_name\":\"name\",\"type_name\":\"string\",\"token_name\":\"name\",\"table_name\":\"name\",\"scope_name\":\"name\",\"action_name\":\"name\",\"time_point\":\"int64\",\"time_point_sec\":\"time\",\"timestamp\":\"uint32\",\"block_timestamp_type\":\"timestamp\",\"block_id\":\"fixed_bytes32\",\"checksum_type\":\"fixed_bytes32\",\"checksum256_type\":\"fixed_bytes32\",\"checksum512_type\":\"fixed_bytes64\",\"checksum160_type\":\"fixed_bytes20\",\"sha256\":\"fixed_bytes32\",\"sha512\":\"fixed_bytes64\",\"sha160\":\"fixed_bytes20\",\"weight_type\":\"uint16\",\"block_num_type\":\"uint32\",\"share_type\":\"int64\",\"digest_type\":\"checksum_type\",\"context_free_type\":\"bytes\",\"unsigned_int\":\"varuint32\",\"bool\":\"uint8\",\"extensions_type\":{\"base\":\"\",\"fields\":{\"type\":\"uint16\",\"data\":\"bytes\"}},\"transaction_header\":{\"base\":\"\",\"fields\":{\"expiration\":\"time\",\"ref_block_num\":\"uint16\",\"ref_block_prefix\":\"uint32\",\"max_net_usage_words\":\"unsigned_int\",\"max_cpu_usage_ms\":\"uint8\",\"delay_sec\":\"unsigned_int\"}},\"transaction\":{\"base\":\"transaction_header\",\"fields\":{\"context_free_actions\":\"action[]\",\"actions\":\"action[]\",\"transaction_extensions\":\"extensions_type[]\"}},\"signed_transaction\":{\"base\":\"transaction\",\"fields\":{\"signatures\":\"signature[]\",\"context_free_data\":\"bytes[]\"}},\"fields\":\"field_def[]\",\"field_def\":{\"fields\":{\"name\":\"field_name\",\"type\":\"type_name\"}},\"asset\":{\"fields\":{\"amount\":\"share_type\",\"sym\":\"symbol\"}},\"producer_key\":{\"fields\":{\"producer_name\":\"account_name\",\"block_signing_key\":\"public_key\"}},\"producer_schedule\":{\"fields\":{\"version\":\"uint32\",\"producers\":\"producer_key[]\"}},\"chain_config\":{\"fields\":{\"target_block_size\":\"uint32\",\"max_block_size\":\"uint32\",\"target_block_acts_per_scope\":\"uint32\",\"max_block_acts_per_scope\":\"uint32\",\"target_block_acts\":\"uint32\",\"max_block_acts\":\"uint32\",\"real_threads\":\"uint64\",\"max_storage_size\":\"uint64\",\"max_transaction_lifetime\":\"uint32\",\"max_authority_depth\":\"uint16\",\"max_transaction_exec_time\":\"uint32\",\"max_inline_depth\":\"uint16\",\"max_inline_action_size\":\"uint32\",\"max_generated_transaction_size\":\"uint32\"}},\"type_def\":{\"base\":\"\",\"fields\":{\"new_type_name\":\"type_name\",\"type\":\"type_name\"}},\"struct_def\":{\"base\":\"\",\"fields\":{\"name\":\"type_name\",\"base\":\"type_name\",\"fields\":\"field_def[]\"}},\"clause_pair\":{\"base\":\"\",\"fields\":{\"id\":\"string\",\"body\":\"string\"}},\"error_message\":{\"base\":\"\",\"fields\":{\"error_code\":\"uint64\",\"error_msg\":\"string\"}},\"abi_def\":{\"base\":\"\",\"fields\":{\"version\":\"string\",\"types\":\"type_def[]\",\"structs\":\"struct_def[]\",\"actions\":\"action_def[]\",\"tables\":\"table_def[]\",\"ricardian_clauses\":\"clause_pair[]\",\"error_messages\":\"error_message[]\",\"abi_extensions\":\"extensions_type[]\"}},\"table_def\":{\"base\":\"\",\"fields\":{\"name\":\"table_name\",\"index_type\":\"type_name\",\"key_names\":\"field_name[]\",\"key_types\":\"type_name[]\",\"type\":\"type_name\"}},\"permission_level\":{\"base\":\"\",\"fields\":{\"actor\":\"account_name\",\"permission\":\"permission_name\"}},\"action\":{\"base\":\"\",\"fields\":{\"account\":\"account_name\",\"name\":\"action_name\",\"authorization\":\"permission_level[]\",\"data\":\"bytes\"}},\"action_def\":{\"base\":\"\",\"fields\":{\"name\":\"action_name\",\"type\":\"type_name\",\"ricardian_contract\":\"string\"}},\"block_header\":{\"base\":\"\",\"fields\":{\"previous\":\"checksum256\",\"timestamp\":\"timestamp\",\"transaction_mroot\":\"checksum256\",\"action_mroot\":\"checksum256\",\"block_mroot\":\"checksum256\",\"producer\":\"account_name\",\"schedule_version\":\"uint32\",\"new_producers\":\"producer_schedule?\"}},\"packed_transaction\":{\"fields\":{\"signatures\":\"signature[]\",\"compression\":\"uint8\",\"packed_context_free_data\":\"bytes\",\"packed_trx\":\"bytes\"}}}");

/***/ }),

/***/ "DQ3l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var schema = Object.assign({}, __webpack_require__("Ce98"));

module.exports = schema;

/***/ }),

/***/ "DwGB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("6ayh");

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');

var assertRecord = __webpack_require__("xG2L");
var $isNaN = __webpack_require__("IFfy");
var $isFinite = __webpack_require__("xhJ2");

var sign = __webpack_require__("WXWk");
var mod = __webpack_require__("u1Mj");

var IsCallable = __webpack_require__("IdCN");
var toPrimitive = __webpack_require__("Lxf3");

var has = __webpack_require__("oNNP");

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;


/***/ }),

/***/ "Giuh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var commonApi = __webpack_require__("lNPF");
var objectApi = __webpack_require__("15xT");

var ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc;

/***/ }),

/***/ "IFfy":
/***/ (function(module, exports) {

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),

/***/ "LXZV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var api = __webpack_require__("O2iB");
var apiGen = __webpack_require__("wBD3");
var processArgs = __webpack_require__("uEnK");

var EosApi = function EosApi(config) {
  return apiGen('v1', api, config);
};

Object.assign(EosApi, {
  processArgs: processArgs,
  api: api,

  /** @deprecated */
  Testnet: function Testnet(config) {
    console.error('deprecated, change EosApi.Testnet(..) to just EosApi(..)');
    return EosApi(config);
  },

  /** @deprecated */
  Localnet: function Localnet(config) {
    console.error('deprecated, change EosApi.Localnet(..) to just EosApi(..)');
    return EosApi(config);
  }
});

module.exports = EosApi;

/***/ }),

/***/ "Lxf3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__("Teho");

var isCallable = __webpack_require__("IdCN");

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};


/***/ }),

/***/ "MeIZ":
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.0\",\"types\":[{\"new_type_name\":\"account_name\",\"type\":\"name\"}],\"structs\":[{\"name\":\"transfer\",\"base\":\"\",\"fields\":[{\"name\":\"from\",\"type\":\"account_name\"},{\"name\":\"to\",\"type\":\"account_name\"},{\"name\":\"quantity\",\"type\":\"asset\"},{\"name\":\"memo\",\"type\":\"string\"}]},{\"name\":\"create\",\"base\":\"\",\"fields\":[{\"name\":\"issuer\",\"type\":\"account_name\"},{\"name\":\"maximum_supply\",\"type\":\"asset\"}]},{\"name\":\"issue\",\"base\":\"\",\"fields\":[{\"name\":\"to\",\"type\":\"account_name\"},{\"name\":\"quantity\",\"type\":\"asset\"},{\"name\":\"memo\",\"type\":\"string\"}]},{\"name\":\"account\",\"base\":\"\",\"fields\":[{\"name\":\"balance\",\"type\":\"asset\"}]},{\"name\":\"currency_stats\",\"base\":\"\",\"fields\":[{\"name\":\"supply\",\"type\":\"asset\"},{\"name\":\"max_supply\",\"type\":\"asset\"},{\"name\":\"issuer\",\"type\":\"account_name\"}]}],\"actions\":[{\"name\":\"transfer\",\"type\":\"transfer\",\"ricardian_contract\":\"\"},{\"name\":\"issue\",\"type\":\"issue\",\"ricardian_contract\":\"\"},{\"name\":\"create\",\"type\":\"create\",\"ricardian_contract\":\"\"}],\"tables\":[{\"name\":\"accounts\",\"type\":\"account\",\"index_type\":\"i64\",\"key_names\":[\"currency\"],\"key_types\":[\"uint64\"]},{\"name\":\"stat\",\"type\":\"currency_stats\",\"index_type\":\"i64\",\"key_names\":[\"currency\"],\"key_types\":[\"uint64\"]}],\"ricardian_clauses\":[],\"abi_extensions\":[]}");

/***/ }),

/***/ "O2iB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  chain: __webpack_require__("aPT5"),
  history: __webpack_require__("bu87")
};

/***/ }),

/***/ "QTbZ":
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.0\",\"types\":[],\"structs\":[{\"name\":\"nonce\",\"base\":\"\",\"fields\":[{\"name\":\"value\",\"type\":\"string\"}]}],\"actions\":[{\"name\":\"nonce\",\"type\":\"nonce\",\"ricardian_contract\":\"\"}],\"tables\":[],\"ricardian_clauses\":[],\"abi_extensions\":[]}");

/***/ }),

/***/ "Re1D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  // Under "api:" all functions must take api as their 1st parameter
  api: {
    createTransaction: createTransaction
  }

  /**
    @typedef {object} headers
    @property {number} ref_block_num - Last irreversible block number.  The
    bit-wise AND operation is used to keep this value with the size of a Uint16
    size (a block num in the last 2^16 blocks).  Example:
    `get_info.last_irreversible_block_num & 0xFFFF`
  
    @property {number} ref_block_prefix - get_block.ref_block_prefix .. This is
    a 32 bit number identifier (identify the same block referenced in `ref_block_num`).
  
    @property {string} expiration - This is based on the head block time from the
    blockchain.  Be careful to suffix a Z if required (as with Firefox and JavaScript)
    to ensure this date string is interpreted as Zulu time.
  
    Example: `new Date(new Date(info.head_block_time + 'Z').getTime() + expireInSeconds * 1000).toISOString().split('.')[0]`
  */

  /**
    Consult the blockchain and gather information for use in a new signed transaction.
    For Transaction as Proof of Stake (TaPOS), 32 bits of a recent block Id is included.
    Because all transactions use TaPOS, this solves the nothing at stake attack.
  
    This is usually called for every transaction or maybe cached per block.  Although
    longer caching is possible, a longer cache time increases the risk of a
    transaction replay attack.
  
    @arg {number} expireInSeconds - How many seconds until expiration
    @arg {function(error, headers)} callback {@link headers}
    @see {headers}
    @example eos.createTransaction(60, (error, headers) => {})
  */
};function createTransaction(api) {
  var expireInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  var callback = arguments[2];

  if (!callback) {
    throw new TypeError('callback parameter is required');
  }
  api.getInfo(checkError(callback, function (info) {
    var chainDate = new Date(info.head_block_time + 'Z');

    api.getBlock(info.last_irreversible_block_num, checkError(callback, function (block) {
      var expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);

      var ref_block_num = info.last_irreversible_block_num & 0xFFFF;

      var headers = {
        expiration: expiration.toISOString().split('.')[0],
        ref_block_num: ref_block_num,
        ref_block_prefix: block.ref_block_prefix,
        max_net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        actions: [],
        signatures: [],
        transaction_extensions: []
      };
      callback(null, headers);
    }));
  }));
}

var checkError = function checkError(parentErr, parrentRes) {
  return function (error, result) {
    if (error) {
      parentErr(error);
    } else {
      parrentRes(result);
    }
  };
};

/***/ }),

/***/ "Teho":
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),

/***/ "VHJ7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray2 = __webpack_require__("sk9p");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__("14Xm");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = __webpack_require__("EJiy");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = __webpack_require__("9lTW");
var ecc = __webpack_require__("Giuh");
var Fcbuffer = __webpack_require__("Mlzg");
var createHash = __webpack_require__("mObS");

var _require = __webpack_require__("LXZV"),
    processArgs = _require.processArgs;

var Structs = __webpack_require__("k7df");

module.exports = writeApiGen;

var sign = ecc.sign;


function writeApiGen(Network, network, structs, config, abis) {
  if (typeof config.chainId !== 'string') {
    throw new TypeError('config.chainId is required');
  }
  var writeApi = WriteApi(Network, network, config, structs.transaction);
  var reserveFunctions = new Set(['transaction', 'contract']);

  var merge = {};
  // sends transactions, can act as an action collecting wrapper
  merge.transaction = writeApi.genTransaction(structs, merge);

  // Immediate send operations automatically calls merge.transaction
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = abis[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var abi = _step.value;

      for (var type in abi.schema) {
        var typeStruct = abi.schema[type];
        if (typeof typeStruct === 'string') {
          // skip types like; name, account_name, etc..
          continue;
        }

        assert.equal(typeof typeStruct === 'undefined' ? 'undefined' : (0, _typeof3.default)(typeStruct), 'object', 'abi.schema[type = ' + type + ']');

        var action = typeStruct.action;

        if (action === undefined) {
          // ABI private struct
          continue;
        }

        if (reserveFunctions.has(action.name)) {
          throw new TypeError('Conflicting Api function: ' + type);
        }

        var definition = schemaFields(abi.schema, type);
        merge[action.name] = writeApi.genMethod(type, definition, merge.transaction, action.account, action.name);
      }
    }

    /**
      Immedate send contract actions.
       @example eos.contract('mycontract', [options], [callback])
      @example eos.contract('mycontract').then(mycontract => mycontract.myaction(...))
    */
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  merge.contract = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _processArgs = processArgs(args, ['account'], 'contract', optionsFormatter),
        params = _processArgs.params,
        options = _processArgs.options,
        returnPromise = _processArgs.returnPromise,
        callback = _processArgs.callback;

    var account = params.account;

    // sends transactions via its own transaction function

    writeApi.genContractActions(account).then(function (r) {
      callback(null, r);
    }).catch(function (r) {
      callback(r);
    });

    return returnPromise;
  };

  return merge;
}

function WriteApi(Network, network, config, Transaction) {
  /**
    @arg {array} [args.contracts]
    @arg {callback|object} args.transaction tr => {tr.transfer .. }
    @arg {object} [args.options]
    @arg {function} [args.callback]
  */
  var genTransaction = function genTransaction(structs, merge) {
    return function _callee() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var contracts, options, callback, isContractArray, accounts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, action, abiPromises, cachedCode, arg, contractPromises, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, account;

      return _regenerator2.default.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contracts = void 0, options = void 0, callback = void 0;


              if (args[args.length - 1] == null) {
                // callback may be undefined
                args = args.slice(0, args.length - 1);
              }

              isContractArray = isStringArray(args[0]);

              if (!isContractArray) {
                _context.next = 8;
                break;
              }

              contracts = args[0];
              args = args.slice(1);
              _context.next = 39;
              break;

            case 8:
              if (!(typeof args[0] === 'string')) {
                _context.next = 13;
                break;
              }

              contracts = [args[0]];
              args = args.slice(1);
              _context.next = 39;
              break;

            case 13:
              if (!((0, _typeof3.default)(args[0]) === 'object' && Array.isArray(args[0].actions))) {
                _context.next = 39;
                break;
              }

              // full transaction, lookup ABIs used by each action
              accounts = new Set(); // make a unique list

              // TODO: Add args[0].context_free_actions to accounts too?

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 18;
              for (_iterator2 = args[0].actions[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                action = _step2.value;

                accounts.add(action.account);
              }

              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context['catch'](18);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 26:
              _context.prev = 26;
              _context.prev = 27;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 29:
              _context.prev = 29;

              if (!_didIteratorError2) {
                _context.next = 32;
                break;
              }

              throw _iteratorError2;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(26);

            case 34:
              abiPromises = [];

              // Eos contract operations are cached (efficient and offline transactions)

              cachedCode = new Set(['eosio', 'eosio.token', 'eosio.null']);

              accounts.forEach(function (account) {
                if (!cachedCode.has(account)) {
                  abiPromises.push(config.abiCache.abiAsync(account));
                }
              });
              _context.next = 39;
              return _regenerator2.default.awrap(Promise.all(abiPromises));

            case 39:

              if (args.length > 1 && typeof args[args.length - 1] === 'function') {
                callback = args.pop();
              }

              if (args.length > 1 && (0, _typeof3.default)(args[args.length - 1]) === 'object') {
                options = args.pop();
              }

              assert.equal(args.length, 1, 'transaction args: contracts<string|array>, transaction<callback|object>, [options], [callback]');
              arg = args[0];

              if (!contracts) {
                _context.next = 67;
                break;
              }

              assert(!callback, 'callback with contracts are not supported');
              assert.equal('function', typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg), 'provide function callback following contracts array parameter');

              contractPromises = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 50;

              for (_iterator3 = contracts[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                account = _step3.value;

                // setup wrapper functions to collect contract api calls
                contractPromises.push(genContractActions(account, merge.transaction));
              }

              _context.next = 58;
              break;

            case 54:
              _context.prev = 54;
              _context.t1 = _context['catch'](50);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t1;

            case 58:
              _context.prev = 58;
              _context.prev = 59;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 61:
              _context.prev = 61;

              if (!_didIteratorError3) {
                _context.next = 64;
                break;
              }

              throw _iteratorError3;

            case 64:
              return _context.finish(61);

            case 65:
              return _context.finish(58);

            case 66:
              return _context.abrupt('return', Promise.all(contractPromises).then(function (actions) {
                var merges = {};
                actions.forEach(function (m, i) {
                  merges[contracts[i]] = m;
                });
                var param = isContractArray ? merges : merges[contracts[0]];
                // collect and invoke api calls
                return trMessageCollector(arg, options, param);
              }));

            case 67:
              if (!(typeof arg === 'function')) {
                _context.next = 69;
                break;
              }

              return _context.abrupt('return', trMessageCollector(arg, options, merge));

            case 69:
              if (!((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object')) {
                _context.next = 71;
                break;
              }

              return _context.abrupt('return', transaction(arg, options, callback));

            case 71:
              throw new Error('first transaction argument unrecognized', arg);

            case 72:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[18, 22, 26, 34], [27,, 29, 33], [50, 54, 58, 66], [59,, 61, 65]]);
    };
  };

  function genContractActions(account) {
    var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return config.abiCache.abiAsync(account).then(function (cache) {
      assert(Array.isArray(cache.abi.actions) && cache.abi.actions.length, 'No actions');

      var contractMerge = {};
      contractMerge.transaction = transaction ? transaction : genTransaction(cache.structs, contractMerge);

      cache.abi.actions.forEach(function (_ref) {
        var name = _ref.name,
            type = _ref.type;

        var definition = schemaFields(cache.schema, type);
        contractMerge[name] = genMethod(type, definition, contractMerge.transaction, account, name);
      });

      contractMerge.fc = cache;

      return contractMerge;
    });
  }

  function genMethod(type, definition, transactionArg) {
    var account = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'eosio.token';
    var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : type;

    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) {
        console.log(usage({ name: name, type: type }, definition, Network, account, config));
        return;
      }

      // Special case like multi-action transactions where this lib needs
      // to be sure the broadcast is off.
      var optionOverrides = {};
      var lastArg = args[args.length - 1];
      if ((typeof lastArg === 'undefined' ? 'undefined' : (0, _typeof3.default)(lastArg)) === 'object' && (0, _typeof3.default)(lastArg.__optionOverrides) === 'object') {
        // pop() fixes the args.length
        Object.assign(optionOverrides, args.pop().__optionOverrides);
      }

      var processedArgs = processArgs(args, Object.keys(definition), type, optionsFormatter);

      var options = processedArgs.options;
      var params = processedArgs.params,
          returnPromise = processedArgs.returnPromise,
          callback = processedArgs.callback;


      var optionDefaults = { // From config and configDefaults
        broadcast: config.broadcast,
        sign: config.sign

        // internal options (ex: multi-action transaction)
      };options = Object.assign({}, optionDefaults, options, optionOverrides);
      if (optionOverrides.noCallback && !returnPromise) {
        throw new Error('Callback during a transaction are not supported');
      }

      var authorization = [];
      var providedAuth = options.authorization ? options.authorization : config.authorization;
      var addDefaultAuths = providedAuth == null;

      // Often if the first field in an action is an account name it is
      // also the required authorization.
      function firstAccount() {
        var fieldKeys = Object.keys(definition);
        var f1 = fieldKeys[0];

        if (definition[f1] === 'account_name') {
          return params[f1];
        }
      }

      if (providedAuth) {
        var authArray = void 0;
        if (typeof providedAuth === 'string') {
          authArray = [providedAuth];
        } else if (Array.isArray(providedAuth)) {
          authArray = providedAuth;
        }

        if (authArray) {
          authArray.forEach(function (auth) {
            if (typeof auth === 'string') {
              var _auth$split = auth.split('@'),
                  _auth$split2 = (0, _slicedToArray3.default)(_auth$split, 2),
                  actor = _auth$split2[0],
                  _auth$split2$ = _auth$split2[1],
                  permission = _auth$split2$ === undefined ? 'active' : _auth$split2$;

              if (actor === '') {
                actor = firstAccount();
              }
              if (actor) {
                authorization.push({ actor: actor, permission: permission });
              }
            } else if ((typeof auth === 'undefined' ? 'undefined' : (0, _typeof3.default)(auth)) === 'object') {
              authorization.push(auth);
            }
          });
        }

        assert.equal(authorization.length, authArray.length, 'invalid authorization in: ' + JSON.stringify(providedAuth));
      }

      var tr = {
        actions: [{
          account: account,
          name: name,
          authorization: authorization,
          data: params
        }]
      };

      if (addDefaultAuths) {
        var actor = firstAccount();
        if (actor) {
          // Default authorization (since user did not provide one)
          tr.actions[0].authorization.push({
            actor: actor,
            permission: 'active'
          });
        }
      }

      tr.actions[0].authorization.sort(function (a, b) {
        return a.actor > b.actor ? 1 : a.actor < b.actor ? -1 : 0;
      });

      // multi-action transaction support
      if (!optionOverrides.messageOnly) {
        transactionArg(tr, options, callback);
      } else {
        callback(null, tr);
      }

      return returnPromise;
    };
  }

  /**
    Transaction Message Collector
     Wrap merge.functions adding optionOverrides that will suspend
    transaction broadcast.
  */
  function trMessageCollector(trCallback) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var merges = arguments[2];

    assert.equal('function', typeof trCallback === 'undefined' ? 'undefined' : (0, _typeof3.default)(trCallback), 'trCallback');
    assert.equal('object', typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options), 'options');
    assert.equal('object', typeof merges === 'undefined' ? 'undefined' : (0, _typeof3.default)(merges), 'merges');
    assert(!Array.isArray(merges), 'merges should not be an array');
    assert.equal('function', typeof transaction === 'undefined' ? 'undefined' : (0, _typeof3.default)(transaction), 'transaction');

    var messageList = [];
    var messageCollector = {};

    var wrap = function wrap(opFunction) {
      return function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        // call the original function but force-disable a lot of stuff
        var ret = opFunction.apply(undefined, args.concat([{
          __optionOverrides: {
            broadcast: false,
            messageOnly: true,
            noCallback: true
          }
        }]));
        if (ret == null) {
          // double-check (code can change)
          throw new Error('Callbacks can not be used when creating a multi-action transaction');
        }
        messageList.push(ret);
      };
    };

    // merges can be an object of functions (as in the main eos contract)
    // or an object of contract names with functions under those
    for (var key in merges) {
      var value = merges[key];
      var variableName = key.replace(/\./, '_');
      if (typeof value === 'function') {
        // Native operations (eos contract for example)
        messageCollector[variableName] = wrap(value);
      } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        // other contract(s) (currency contract for example)
        if (messageCollector[variableName] == null) {
          messageCollector[variableName] = {};
        }
        for (var key2 in value) {
          if (key2 === 'transaction') {
            continue;
          }
          messageCollector[variableName][key2] = wrap(value[key2]);
        }
      }
    }

    var promiseCollector = void 0;
    try {
      // caller will load this up with actions
      promiseCollector = trCallback(messageCollector);
    } catch (error) {
      promiseCollector = Promise.reject(error);
    }

    return Promise.resolve(promiseCollector).then(function () {
      return Promise.all(messageList).then(function (resolvedMessageList) {
        var actions = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = resolvedMessageList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var m = _step4.value;

            var _m$actions = (0, _slicedToArray3.default)(m.actions, 1),
                action = _m$actions[0];

            actions.push(action);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var trObject = {};
        trObject.actions = actions;
        return transaction(trObject, options);
      });
    });
  }

  function transaction(arg, options, callback) {
    var defaultExpiration, optionDefault, returnPromise, superCallback, rawTx, _arr, _i, txField, txObject, buf, tr, transactionId, sigs, chainIdBuf, packedContextFreeData, signBuf;

    return _regenerator2.default.async(function transaction$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            defaultExpiration = config.expireInSeconds ? config.expireInSeconds : 60;
            optionDefault = { expireInSeconds: defaultExpiration, broadcast: true, sign: true };

            options = Object.assign({} /*clone*/, optionDefault, options);

            returnPromise = void 0;

            if (typeof callback !== 'function') {
              returnPromise = new Promise(function (resolve, reject) {
                callback = function callback(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                };
              });
            }

            if (!((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) !== 'object')) {
              _context4.next = 7;
              break;
            }

            throw new TypeError('First transaction argument should be an object or function');

          case 7:
            if (Array.isArray(arg.actions)) {
              _context4.next = 9;
              break;
            }

            throw new TypeError('Expecting actions array');

          case 9:

            if (config.logger.log || config.logger.error) {
              // wrap the callback with the logger
              superCallback = callback;

              callback = function callback(error, tr) {
                if (error && config.logger.error) {
                  config.logger.error(error);
                }
                if (config.logger.log) {
                  config.logger.log(JSON.stringify(tr));
                }
                superCallback(error, tr);
              };
            }

            arg.actions.forEach(function (action) {
              if (!Array.isArray(action.authorization)) {
                throw new TypeError('Expecting action.authorization array', action);
              }
            });

            if (!(options.sign && typeof config.signProvider !== 'function')) {
              _context4.next = 13;
              break;
            }

            throw new TypeError('Expecting config.signProvider function (disable using {sign: false})');

          case 13:
            rawTx = {
              max_net_usage_words: 0,
              max_cpu_usage_ms: 0,
              delay_sec: 0,
              context_free_actions: [],
              actions: [],
              signatures: [],
              transaction_extensions: []

              // global transaction headers
            };

            if (!config.transactionHeaders) {
              _context4.next = 25;
              break;
            }

            if (!((0, _typeof3.default)(config.transactionHeaders) === 'object')) {
              _context4.next = 19;
              break;
            }

            Object.assign(rawTx, config.transactionHeaders);
            _context4.next = 25;
            break;

          case 19:
            if (!(typeof config.transactionHeaders === 'function')) {
              _context4.next = 24;
              break;
            }

            _context4.next = 22;
            return _regenerator2.default.awrap(config.transactionHeaders(options.expireInSeconds, checkError(callback, config.logger, function _callee2(headers) {
              return _regenerator2.default.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      assert.equal(typeof headers === 'undefined' ? 'undefined' : (0, _typeof3.default)(headers), 'object', 'expecting transaction header object');
                      Object.assign(rawTx, headers);

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, null, this);
            })));

          case 22:
            _context4.next = 25;
            break;

          case 24:
            assert(false, 'config.transactionHeaders should be an object or function');

          case 25:

            // per transaction headers
            _arr = ['expiration', 'ref_block_num', 'ref_block_prefix', 'delay_sec', 'max_net_usage_words', 'max_cpu_usage_ms'];
            for (_i = 0; _i < _arr.length; _i++) {
              txField = _arr[_i];

              if (arg[txField] !== undefined) {
                // eos.transaction('eosio', eosio => { eosio.myaction(..) }, {delay_sec: 369})
                // eos.transaction({delay_sec: 369, actions: [...]})
                rawTx[txField] = arg[txField];
              } else if (options[txField] !== undefined) {
                // eos.transaction(tr => {tr.transfer(...)}, {delay_sec: 369})
                rawTx[txField] = options[txField];
              }
            }

            // eosjs calcualted headers

            if (!( // minimum required headers
            rawTx.expiration === undefined || rawTx.ref_block_num === undefined || rawTx.ref_block_prefix === undefined)) {
              _context4.next = 31;
              break;
            }

            assert(network, 'Network is required, provide httpEndpoint or own transaction headers');
            _context4.next = 31;
            return _regenerator2.default.awrap(new Promise(function (resolve) {
              network.createTransaction(options.expireInSeconds, checkError(callback, config.logger, function _callee3(headers) {
                var _arr2, _i2, txField;

                return _regenerator2.default.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _arr2 = ['expiration', 'ref_block_num', 'ref_block_prefix'];

                        for (_i2 = 0; _i2 < _arr2.length; _i2++) {
                          txField = _arr2[_i2];

                          // console.log(txField, headers[txField]);
                          if (rawTx[txField] === undefined) {
                            rawTx[txField] = headers[txField];
                          }
                        }
                        resolve();

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, this);
              }));
            }));

          case 31:

            // console.log('rawTx', rawTx)

            assert.equal((0, _typeof3.default)(rawTx.expiration), 'string', 'expecting expiration: iso date time string');
            assert.equal((0, _typeof3.default)(rawTx.ref_block_num), 'number', 'expecting ref_block_num number');
            assert.equal((0, _typeof3.default)(rawTx.ref_block_prefix), 'number', 'expecting ref_block_prefix number');

            rawTx.context_free_actions = arg.context_free_actions;
            rawTx.actions = arg.actions;
            rawTx.transaction_extensions = arg.transaction_extensions;

            // Resolve shorthand
            txObject = Transaction.fromObject(rawTx);
            // console.log('txObject', txObject)

            buf = Fcbuffer.toBuffer(Transaction, txObject);
            tr = Transaction.toObject(txObject);
            transactionId = createHash('sha256').update(buf).digest().toString('hex');
            sigs = [];

            if (options.sign) {
              chainIdBuf = Buffer.from(config.chainId, 'hex');
              packedContextFreeData = Buffer.from(new Uint8Array(32)); // TODO

              signBuf = Buffer.concat([chainIdBuf, buf, packedContextFreeData]);


              sigs = config.signProvider({ transaction: tr, buf: signBuf, sign: sign,
                optionsKeyProvider: options.keyProvider });

              if (!Array.isArray(sigs)) {
                sigs = [sigs];
              }
            }

            // sigs can be strings or Promises
            Promise.all(sigs).then(function (sigs) {
              sigs = [].concat.apply([], sigs); // flatten arrays in array

              for (var i = 0; i < sigs.length; i++) {
                var sig = sigs[i];
                // normalize (hex to base58 format for example)
                if (typeof sig === 'string' && sig.length === 130) {
                  sigs[i] = ecc.Signature.from(sig).toString();
                }
              }

              var packedTr = {
                compression: 'none',
                transaction: tr,
                signatures: sigs
              };

              var mock = config.mockTransactions ? config.mockTransactions() : null;
              if (mock != null) {
                assert(/pass|fail/.test(mock), 'mockTransactions should return a string: pass or fail');
                if (mock === 'pass') {
                  callback(null, {
                    transaction_id: transactionId,
                    mockTransaction: true,
                    broadcast: false,
                    transaction: packedTr
                  });
                }
                if (mock === 'fail') {
                  var error = '[push_transaction mock error] \'fake error\', digest \'' + buf.toString('hex') + '\'';

                  if (config.logger.error) {
                    config.logger.error(error);
                  }

                  callback(error);
                }
                return;
              }

              if (!options.broadcast || !network) {
                callback(null, {
                  transaction_id: transactionId,
                  broadcast: false,
                  transaction: packedTr
                });
              } else {
                network.pushTransaction(packedTr, function (error, processedTransaction) {
                  if (!error) {
                    callback(null, Object.assign({
                      broadcast: true,
                      transaction: packedTr,
                      transaction_id: transactionId
                    }, processedTransaction));
                  } else {
                    if (config.logger.error) {
                      config.logger.error('[push_transaction error] \'' + error.message + '\', transaction \'' + buf.toString('hex') + '\'');
                    }
                    callback(error.message);
                  }
                });
              }
            }).catch(function (error) {
              if (config.logger.error) {
                config.logger.error(error);
              }
              callback(error);
            });
            return _context4.abrupt('return', returnPromise);

          case 45:
          case 'end':
            return _context4.stop();
        }
      }
    }, null, this);
  }

  // return WriteApi
  return {
    genTransaction: genTransaction,
    genContractActions: genContractActions,
    genMethod: genMethod
  };
}

var isStringArray = function isStringArray(o) {
  return Array.isArray(o) && o.length > 0 && o.findIndex(function (o) {
    return typeof o !== 'string';
  }) === -1;
};

// Normalize the extra optional options argument
var optionsFormatter = function optionsFormatter(option) {
  if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
    return option; // {debug, broadcast, etc} (etc my overwrite tr below)
  }
  if (typeof option === 'boolean') {
    // broadcast argument as a true false value, back-end cli will use this shorthand
    return { broadcast: option };
  }
};

function usage(action, definition, Network, account, config) {
  var usage = '';
  var out = function out() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    usage += str + '\n';
  };
  out('CONTRACT');
  out(account);
  out();

  out('ACTION');
  out(action.name);
  out();

  var cache = config.abiCache.abi(account);

  out('PARAMETERS');
  out(JSON.stringify(schemaFields(cache.schema, action.type), null, 4));
  out();

  var struct = cache.structs[action.type];

  out('EXAMPLE');
  out(account + '.' + action.name + '(' + JSON.stringify(struct.toObject(), null, 4) + ')');

  return usage;
}

var checkError = function checkError(parentErr, logger, parrentRes) {
  return function (error, result) {
    if (error) {
      if (logger.error) {
        logger.error('error', error);
      }
      parentErr(error);
    } else {
      Promise.resolve(parrentRes(result)).catch(function (error) {
        parentErr(error);
      });
    }
  };
};

/** Collapse inheritance (via "base") putting all the fields in one object. */
function schemaFields(schema, type) {
  var _schema$type = schema[type],
      base = _schema$type.base,
      fields = _schema$type.fields;

  var def = {};
  if (base && base !== '') {
    Object.assign(def, schemaFields(schema, base));
  }
  Object.assign(def, fields);
  return def;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "WXWk":
/***/ (function(module, exports) {

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ }),

/***/ "Y9UJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof2 = __webpack_require__("EJiy");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = __webpack_require__("9lTW");
var Structs = __webpack_require__("k7df");

module.exports = AbiCache;

function AbiCache(network, config) {
  config.abiCache = {
    abiAsync: abiAsync,
    abi: abi

    // Help (or "usage") needs {defaults: true}
  };var abiCacheConfig = Object.assign({}, { defaults: true }, config);

  var cache = {};

  /**
    Asynchronously fetch and cache an ABI from the blockchain.
     @arg {string} account - blockchain account with deployed contract
    @arg {boolean} [force = true] false when ABI is immutable.
  */
  function abiAsync(account) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    assert.equal(typeof account === 'undefined' ? 'undefined' : (0, _typeof3.default)(account), 'string', 'account string required');

    if (force == false && cache[account] != null) {
      return Promise.resolve(cache[account]);
    }

    if (network == null) {
      var _abi = cache[account];
      assert(_abi, 'Missing ABI for account: ' + account + ', provide httpEndpoint or add to abiCache');
      return Promise.resolve(_abi);
    }

    return network.getAbi(account).then(function (code) {
      assert(code.abi, 'Missing ABI for account: ' + account);
      return abi(account, code.abi);
    });
  }

  /**
    Synchronously set or fetch an ABI from local cache.
     @arg {string} account - blockchain account with deployed contract
    @arg {string} [abi] - blockchain ABI json data.  Null to fetch or non-null to cache
  */
  function abi(account, abi) {
    assert.equal(typeof account === 'undefined' ? 'undefined' : (0, _typeof3.default)(account), 'string', 'account string required');
    if (abi) {
      assert.equal(typeof abi === 'undefined' ? 'undefined' : (0, _typeof3.default)(abi), 'object', 'abi');
      if (Buffer.isBuffer(abi)) {
        abi = JSON.parse(abi);
      }
      var fcSchema = abiToFcSchema(abi, account);
      var structs = Structs(abiCacheConfig, fcSchema); // returns {structs, types}
      return cache[account] = Object.assign({ abi: abi, schema: fcSchema }, structs);
    }
    var c = cache[account];
    if (c == null) {
      throw new Error('Abi \'' + account + '\' is not cached');
    }
    return c;
  }

  return config.abiCache;
}

function abiToFcSchema(abi, account) {
  // customTypes
  // For FcBuffer
  var abiSchema = {};

  // convert abi types to Fcbuffer schema
  if (abi.types) {
    // aliases
    abi.types.forEach(function (e) {
      // "account_name" = "name"
      abiSchema[e.new_type_name] = e.type;
    });
  }

  if (abi.structs) {
    // transaction_header = fields[actor, permission] extends base "transaction"
    abi.structs.forEach(function (e) {
      var fields = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = e.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          fields[field.name] = field.type;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      abiSchema[e.name] = { base: e.base, fields: fields };
      if (e.base === '') {
        delete abiSchema[e.name].base;
      }
    });
  }

  if (abi.actions) {
    // setprods = set_producers
    abi.actions.forEach(function (action) {
      // @example action = {name: 'setprods', type: 'set_producers'}
      var type = abiSchema[action.type];
      if (!type) {
        console.error('Missing abiSchema type', action.type, account); //, abi, abiSchema)
      } else {
        type.action = {
          name: action.name,
          account: account
        };
      }
    });
    // console.log('abiSchema', abiSchema);
  }

  return abiSchema;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "aPT5":
/***/ (function(module) {

module.exports = JSON.parse("{\"get_info\":{\"brief\":\"Return general network information.\",\"params\":null,\"results\":\"string\"},\"get_account\":{\"brief\":\"Fetch a blockchain account\",\"params\":{\"account_name\":\"name\"},\"results\":\"string\"},\"get_code\":{\"brief\":\"Fetch smart contract code\",\"params\":{\"account_name\":\"name\",\"code_as_wasm\":{\"type\":\"bool\",\"default\":false}},\"results\":{\"account_name\":\"name\",\"wast\":\"string\",\"wasm\":\"string\",\"code_hash\":\"sha256\",\"abi\":\"optional<abi_def>\"}},\"get_code_hash\":{\"brief\":\"\",\"params\":{\"account_name\":\"name\"},\"results\":{\"account_name\":\"name\",\"code_hash\":\"sha256\"}},\"get_abi\":{\"params\":{\"account_name\":\"name\"},\"results\":{\"account_name\":\"name\",\"abi\":\"abi_def?\"}},\"get_raw_code_and_abi\":{\"params\":{\"account_name\":\"name\"},\"results\":{\"account_name\":\"name\",\"wasm\":\"bytes\",\"abi\":\"abi_def?\"}},\"abi_json_to_bin\":{\"brief\":\"Manually serialize json into binary hex.  The binayargs is usually stored in Action.data.\",\"params\":{\"code\":\"name\",\"action\":\"name\",\"args\":\"bytes\"},\"results\":{\"binargs\":\"bytes\"}},\"abi_bin_to_json\":{\"brief\":\"Convert bin hex back into Abi json definition.\",\"params\":{\"code\":\"name\",\"action\":\"name\",\"binargs\":\"bytes\"},\"results\":{\"args\":\"bytes\"}},\"get_required_keys\":{\"params\":{\"transaction\":\"transaction\",\"available_keys\":\"set[public_key]\"},\"results\":\"Set[public_key]\"},\"get_block\":{\"brief\":\"Fetch a block from the blockchain.\",\"params\":{\"block_num_or_id\":\"string\"},\"results\":\"variant\",\"errors\":{\"unknown block\":null}},\"get_block_header_state\":{\"brief\":\"Fetch the minimum state necessary to validate transaction headers.\",\"params\":{\"block_num_or_id\":\"string\"},\"results\":\"string\",\"errors\":{\"block_id_type_exception\":\"Invalid block ID\",\"unknown_block_exception\":\"Could not find reversible block\"}},\"get_table_rows\":{\"brief\":\"Fetch smart contract data from an account.\",\"params\":{\"json\":{\"type\":\"bool\",\"default\":false},\"code\":\"name\",\"scope\":\"string\",\"table\":\"name\",\"table_key\":\"string\",\"lower_bound\":{\"type\":\"string\",\"default\":\"0\"},\"upper_bound\":{\"type\":\"string\",\"default\":\"-1\"},\"limit\":{\"type\":\"uint32\",\"default\":\"10\"},\"key_type\":{\"type\":\"string\",\"doc\":\"The key type of --index, primary only supports (i64), all others support (i64, i128, i256, float64, float128). Special type 'name' indicates an account name.\"},\"index_position\":{\"type\":\"string\",\"doc\":\"1 - primary (first), 2 - secondary index (in order defined by multi_index), 3 - third index, etc\"}},\"results\":{\"rows\":{\"type\":\"vector\",\"doc\":\"One row per item, either encoded as hex String or JSON object\"},\"more\":{\"type\":\"bool\",\"doc\":\"True if last element in data is not the end and sizeof data() < limit\"}}},\"get_currency_balance\":{\"params\":{\"code\":\"name\",\"account\":\"name\",\"symbol\":\"optional<string>\"},\"results\":\"asset[]\"},\"get_currency_stats\":{\"params\":{\"code\":\"name\",\"symbol\":\"string\"},\"results\":{\"supply\":\"asset\",\"max_supply\":\"asset\",\"issuer\":\"account_name\"}},\"get_producers\":{\"brief\":\"Fetch smart contract data from producer.\",\"params\":{\"json\":{\"type\":\"bool\",\"default\":false},\"lower_bound\":\"string\",\"limit\":{\"type\":\"uint32\",\"default\":\"50\"}},\"results\":{\"rows\":{\"type\":\"vector\",\"doc\":\"one row per item, either encoded as hex String or JSON object\"},\"total_producer_vote_weight\":{\"type\":\"double\",\"doc\":\"total vote\"},\"more\":{\"type\":\"string\",\"doc\":\"fill lower_bound with this value to fetch more rows\"}}},\"get_producer_schedule\":{\"brief\":\"\",\"params\":{},\"results\":{\"vector\":\"proposed\"}},\"get_scheduled_transactions\":{\"brief\":\"\",\"params\":{\"json\":{\"type\":\"bool\",\"default\":false},\"lower_bound\":{\"type\":\"string\",\"doc\":\"timestamp OR transaction ID\"},\"limit\":{\"type\":\"uint32\",\"default\":\"50\"}},\"results\":{\"vector\":\"transactions\",\"more\":{\"type\":\"string\",\"doc\":\"fill lower_bound with this to fetch next set of transactions\"}}},\"push_block\":{\"brief\":\"Append a block to the chain database.\",\"params\":{\"block\":\"signed_block\"},\"results\":null},\"push_transaction\":{\"brief\":\"Attempts to push the transaction into the pending queue.\",\"params\":{\"signed_transaction\":\"signed_transaction\"},\"results\":{\"transaction_id\":\"fixed_bytes32\",\"processed\":\"bytes\"}},\"push_transactions\":{\"brief\":\"Attempts to push transactions into the pending queue.\",\"params\":{\"signed_transaction[]\":\"signed_transaction\"},\"results\":\"vector[push_transaction.results]\"}}");

/***/ }),

/***/ "bu87":
/***/ (function(module) {

module.exports = JSON.parse("{\"get_actions\":{\"params\":{\"account_name\":\"account_name\",\"pos\":{\"type\":\"int32?\",\"doc\":\"An absolute sequence positon -1 is the end/last action\"},\"offset\":{\"type\":\"int32?\",\"doc\":\"The number of actions relative to pos, negative numbers return [pos-offset,pos), positive numbers return [pos,pos+offset)\"}},\"results\":{\"actions\":\"ordered_action_result[]\",\"last_irreversible_block\":\"uint32\",\"time_limit_exceeded_error\":\"bool?\"},\"structs\":[{\"name\":\"ordered_action_result\",\"fields\":{\"global_action_seq\":\"uint64\",\"account_action_seq\":\"int32\",\"block_num\":\"uint32\",\"block_time\":\"block_timestamp_type\",\"action_trace\":\"variant\"}}]},\"get_transaction\":{\"brief\":\"Retrieve a transaction from the blockchain.\",\"params\":{\"id\":\"transaction_id_type\",\"block_num_hint\":{\"type\":\"uint32?\",\"default\":0,\"doc\":\"A non-zero block number allows shorter transaction IDs (8 hex, 4 bytes)\"}},\"results\":{\"id\":\"transaction_id_type\",\"trx\":\"variant\",\"block_time\":\"block_timestamp_type\",\"block_num\":\"uint32\",\"last_irreversible_block\":\"uint32\",\"traces\":\"variant[]\"}},\"get_key_accounts\":{\"params\":{\"public_key\":\"public_key_type\"},\"results\":{\"account_names\":\"account_name[]\"}},\"get_controlled_accounts\":{\"params\":{\"controlling_account\":\"account_name\"},\"results\":{\"controlled_accounts\":\"account_name[]\"}}}");

/***/ }),

/***/ "eFFR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ecdsa = __webpack_require__("r751");
var hash = __webpack_require__("3HdZ");
var curve = __webpack_require__("eKop").getCurveByName('secp256k1');
var assert = __webpack_require__("9lTW");
var BigInteger = __webpack_require__("7Vg5");
var keyUtils = __webpack_require__("nDWd");
var PublicKey = __webpack_require__("zEA4");
var PrivateKey = __webpack_require__("tHJk");

module.exports = Signature;

function Signature(r, s, i) {
    assert.equal(r != null, true, 'Missing parameter');
    assert.equal(s != null, true, 'Missing parameter');
    assert.equal(i != null, true, 'Missing parameter');

    /**
        Verify signed data.
         @arg {String|Buffer} data - full data
        @arg {pubkey|PublicKey} pubkey - EOSKey..
        @arg {String} [encoding = 'utf8'] - data encoding (if data is a string)
         @return {boolean}
    */
    function verify(data, pubkey) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';

        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        assert(Buffer.isBuffer(data), 'data is a required String or Buffer');
        data = hash.sha256(data);
        return verifyHash(data, pubkey);
    }

    /**
        Verify a buffer of exactally 32 bytes in size (sha256(text))
         @arg {String|Buffer} dataSha256 - 32 byte buffer or string
        @arg {String|PublicKey} pubkey - EOSKey..
        @arg {String} [encoding = 'hex'] - dataSha256 encoding (if string)
         @return {boolean}
    */
    function verifyHash(dataSha256, pubkey) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';

        if (typeof dataSha256 === 'string') {
            dataSha256 = Buffer.from(dataSha256, encoding);
        }
        if (dataSha256.length !== 32 || !Buffer.isBuffer(dataSha256)) throw new Error("dataSha256: 32 bytes required");

        var publicKey = PublicKey(pubkey);
        assert(publicKey, 'pubkey required');

        return ecdsa.verify(curve, dataSha256, { r: r, s: s }, publicKey.Q);
    };

    /** @deprecated
         Verify hex data by converting to a buffer then hashing.
         @return {boolean}
    */
    function verifyHex(hex, pubkey) {
        console.log('Deprecated: use verify(data, pubkey, "hex")');

        var buf = Buffer.from(hex, 'hex');
        return verify(buf, pubkey);
    };

    /**
        Recover the public key used to create this signature using full data.
         @arg {String|Buffer} data - full data
        @arg {String} [encoding = 'utf8'] - data encoding (if string)
         @return {PublicKey}
    */
    function recover(data) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        assert(Buffer.isBuffer(data), 'data is a required String or Buffer');
        data = hash.sha256(data);

        return recoverHash(data);
    };

    /**
        @arg {String|Buffer} dataSha256 - sha256 hash 32 byte buffer or hex string
        @arg {String} [encoding = 'hex'] - dataSha256 encoding (if string)
         @return {PublicKey}
    */
    function recoverHash(dataSha256) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hex';

        if (typeof dataSha256 === 'string') {
            dataSha256 = Buffer.from(dataSha256, encoding);
        }
        if (dataSha256.length !== 32 || !Buffer.isBuffer(dataSha256)) {
            throw new Error("dataSha256: 32 byte String or buffer requred");
        }

        var e = BigInteger.fromBuffer(dataSha256);
        var i2 = i;
        i2 -= 27;
        i2 = i2 & 3;
        var Q = ecdsa.recoverPubKey(curve, e, { r: r, s: s, i: i }, i2);
        return PublicKey.fromPoint(Q);
    };

    function toBuffer() {
        var buf;
        buf = new Buffer(65);
        buf.writeUInt8(i, 0);
        r.toBuffer(32).copy(buf, 1);
        s.toBuffer(32).copy(buf, 33);
        return buf;
    };

    function toHex() {
        return toBuffer().toString("hex");
    };

    var signatureCache = void 0;

    function toString() {
        if (signatureCache) {
            return signatureCache;
        }
        signatureCache = 'SIG_K1_' + keyUtils.checkEncode(toBuffer(), 'K1');
        return signatureCache;
    }

    return {
        r: r, s: s, i: i,
        toBuffer: toBuffer,
        verify: verify,
        verifyHash: verifyHash,
        verifyHex: verifyHex, // deprecated
        recover: recover,
        recoverHash: recoverHash,
        toHex: toHex,
        toString: toString,

        /** @deprecated use verify (same arguments and return) */
        verifyBuffer: function verifyBuffer() {
            console.log('Deprecated: use signature.verify instead (same arguments)');
            return verify.apply(undefined, arguments);
        },

        /** @deprecated use recover (same arguments and return) */
        recoverPublicKey: function recoverPublicKey() {
            console.log('Deprecated: use signature.recover instead (same arguments)');
            return recover.apply(undefined, arguments);
        },

        /** @deprecated use recoverHash (same arguments and return) */
        recoverPublicKeyFromBuffer: function recoverPublicKeyFromBuffer() {
            console.log('Deprecated: use signature.recoverHash instead (same arguments)');
            return recoverHash.apply(undefined, arguments);
        }
    };
}

/**
    Hash and sign arbitrary data.

    @arg {string|Buffer} data - full data
    @arg {wif|PrivateKey} privateKey
    @arg {String} [encoding = 'utf8'] - data encoding (if string)

    @return {Signature}
*/
Signature.sign = function (data, privateKey) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';

    if (typeof data === 'string') {
        data = Buffer.from(data, encoding);
    }
    assert(Buffer.isBuffer(data), 'data is a required String or Buffer');
    data = hash.sha256(data);
    return Signature.signHash(data, privateKey);
};

/**
    Sign a buffer of exactally 32 bytes in size (sha256(text))

    @arg {string|Buffer} dataSha256 - 32 byte buffer or string
    @arg {wif|PrivateKey} privateKey
    @arg {String} [encoding = 'hex'] - dataSha256 encoding (if string)

    @return {Signature}
*/
Signature.signHash = function (dataSha256, privateKey) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';

    if (typeof dataSha256 === 'string') {
        dataSha256 = Buffer.from(dataSha256, encoding);
    }
    if (dataSha256.length !== 32 || !Buffer.isBuffer(dataSha256)) throw new Error("dataSha256: 32 byte buffer requred");

    privateKey = PrivateKey(privateKey);
    assert(privateKey, 'privateKey required');

    var der, e, ecsignature, i, lenR, lenS, nonce;
    i = null;
    nonce = 0;
    e = BigInteger.fromBuffer(dataSha256);
    while (true) {
        ecsignature = ecdsa.sign(curve, dataSha256, privateKey.d, nonce++);
        der = ecsignature.toDER();
        lenR = der[3];
        lenS = der[5 + lenR];
        if (lenR === 32 && lenS === 32) {
            i = ecdsa.calcPubKeyRecoveryParam(curve, e, ecsignature, privateKey.toPublic().Q);
            i += 4; // compressed
            i += 27; // compact  //  24 or 27 :( forcing odd-y 2nd key candidate)
            break;
        }
        if (nonce % 10 === 0) {
            console.log("WARN: " + nonce + " attempts to find canonical signature");
        }
    }
    return Signature(ecsignature.r, ecsignature.s, i);
};

Signature.fromBuffer = function (buf) {
    var i, r, s;
    assert(Buffer.isBuffer(buf), 'Buffer is required');
    assert.equal(buf.length, 65, 'Invalid signature length');
    i = buf.readUInt8(0);
    assert.equal(i - 27, i - 27 & 7, 'Invalid signature parameter');
    r = BigInteger.fromBuffer(buf.slice(1, 33));
    s = BigInteger.fromBuffer(buf.slice(33));
    return Signature(r, s, i);
};

Signature.fromHex = function (hex) {
    return Signature.fromBuffer(Buffer.from(hex, "hex"));
};

/**
    @arg {string} signature - like SIG_K1_base58signature..
    @return {Signature} or `null` (invalid)
*/
Signature.fromString = function (signature) {
    try {
        return Signature.fromStringOrThrow(signature);
    } catch (e) {
        return null;
    }
};

/**
    @arg {string} signature - like SIG_K1_base58signature..
    @throws {Error} invalid
    @return {Signature}
*/
Signature.fromStringOrThrow = function (signature) {
    assert.equal(typeof signature === 'undefined' ? 'undefined' : _typeof(signature), 'string', 'signature');
    var match = signature.match(/^SIG_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);
    assert(match != null && match.length === 3, 'Expecting signature like: SIG_K1_base58signature..');

    var _match = _slicedToArray(match, 3),
        keyType = _match[1],
        keyString = _match[2];

    assert.equal(keyType, 'K1', 'K1 signature expected');
    return Signature.fromBuffer(keyUtils.checkDecode(keyString, keyType));
};

/**
    @arg {String|Signature} o - hex string
    @return {Signature}
*/
Signature.from = function (o) {
    var signature = o ? o.r && o.s && o.i ? o : typeof o === 'string' && o.length === 130 ? Signature.fromHex(o) : typeof o === 'string' && o.length !== 130 ? Signature.fromStringOrThrow(o) : Buffer.isBuffer(o) ? Signature.fromBuffer(o) : null : o; /*null or undefined*/

    if (!signature) {
        throw new TypeError('signature should be a hex string or buffer');
    }
    return signature;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "ekB5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var assert = __webpack_require__("9lTW"); // from https://github.com/bitcoinjs/bitcoinjs-lib
var enforceType = __webpack_require__("rSjz");

var BigInteger = __webpack_require__("7Vg5");

function ECSignature(r, s) {
  enforceType(BigInteger, r);
  enforceType(BigInteger, s);

  function toCompact(i, compressed) {
    if (compressed) i += 4;
    i += 27;

    var buffer = new Buffer(65);
    buffer.writeUInt8(i, 0);

    r.toBuffer(32).copy(buffer, 1);
    s.toBuffer(32).copy(buffer, 33);

    return buffer;
  }

  function toDER() {
    var rBa = r.toDERInteger();
    var sBa = s.toDERInteger();

    var sequence = [];

    // INTEGER
    sequence.push(0x02, rBa.length);
    sequence = sequence.concat(rBa);

    // INTEGER
    sequence.push(0x02, sBa.length);
    sequence = sequence.concat(sBa);

    // SEQUENCE
    sequence.unshift(0x30, sequence.length);

    return new Buffer(sequence);
  }

  function toScriptSignature(hashType) {
    var hashTypeBuffer = new Buffer(1);
    hashTypeBuffer.writeUInt8(hashType, 0);

    return Buffer.concat([toDER(), hashTypeBuffer]);
  }

  return { r: r, s: s, toCompact: toCompact, toDER: toDER, toScriptSignature: toScriptSignature };
}

// Import operations
ECSignature.parseCompact = function (buffer) {
  assert.equal(buffer.length, 65, 'Invalid signature length');
  var i = buffer.readUInt8(0) - 27;

  // At most 3 bits
  assert.equal(i, i & 7, 'Invalid signature parameter');
  var compressed = !!(i & 4);

  // Recovery param only
  i = i & 3;

  var r = BigInteger.fromBuffer(buffer.slice(1, 33));
  var s = BigInteger.fromBuffer(buffer.slice(33));

  return {
    compressed: compressed,
    i: i,
    signature: ECSignature(r, s)
  };
};

ECSignature.fromDER = function (buffer) {
  assert.equal(buffer.readUInt8(0), 0x30, 'Not a DER sequence');
  assert.equal(buffer.readUInt8(1), buffer.length - 2, 'Invalid sequence length');
  assert.equal(buffer.readUInt8(2), 0x02, 'Expected a DER integer');

  var rLen = buffer.readUInt8(3);
  assert(rLen > 0, 'R length is zero');

  var offset = 4 + rLen;
  assert.equal(buffer.readUInt8(offset), 0x02, 'Expected a DER integer (2)');

  var sLen = buffer.readUInt8(offset + 1);
  assert(sLen > 0, 'S length is zero');

  var rB = buffer.slice(4, offset);
  var sB = buffer.slice(offset + 2);
  offset += 2 + sLen;

  if (rLen > 1 && rB.readUInt8(0) === 0x00) {
    assert(rB.readUInt8(1) & 0x80, 'R value excessively padded');
  }

  if (sLen > 1 && sB.readUInt8(0) === 0x00) {
    assert(sB.readUInt8(1) & 0x80, 'S value excessively padded');
  }

  assert.equal(offset, buffer.length, 'Invalid DER encoding');
  var r = BigInteger.fromDERInteger(rB);
  var s = BigInteger.fromDERInteger(sB);

  assert(r.signum() >= 0, 'R value is negative');
  assert(s.signum() >= 0, 'S value is negative');

  return ECSignature(r, s);
};

// FIXME: 0x00, 0x04, 0x80 are SIGHASH_* boundary constants, importing Transaction causes a circular dependency
ECSignature.parseScriptSignature = function (buffer) {
  var hashType = buffer.readUInt8(buffer.length - 1);
  var hashTypeMod = hashType & ~0x80;

  assert(hashTypeMod > 0x00 && hashTypeMod < 0x04, 'Invalid hashType');

  return {
    signature: ECSignature.fromDER(buffer.slice(0, -1)),
    hashType: hashType
  };
};

module.exports = ECSignature;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "k7df":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray2 = __webpack_require__("sk9p");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = __webpack_require__("EJiy");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__("Giuh"),
    Signature = _require.Signature,
    PublicKey = _require.PublicKey;

var Fcbuffer = __webpack_require__("Mlzg");
var ByteBuffer = __webpack_require__("DGy1");
var assert = __webpack_require__("9lTW");

var schema = __webpack_require__("DQ3l");

var _require2 = __webpack_require__("3Jjq"),
    isName = _require2.isName,
    encodeName = _require2.encodeName,
    decodeName = _require2.decodeName,
    DecimalPad = _require2.DecimalPad,
    DecimalImply = _require2.DecimalImply,
    DecimalUnimply = _require2.DecimalUnimply,
    printAsset = _require2.printAsset,
    parseAsset = _require2.parseAsset;

/** Configures Fcbuffer for EOS specific structs and types. */


module.exports = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var extendedSchema = arguments[1];

  var structLookup = function structLookup(lookupName, account) {
    var cache = config.abiCache.abi(account);

    // Lookup by ABI action "name"
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = cache.abi.actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var action = _step.value;

        if (action.name === lookupName) {
          var _struct = cache.structs[action.type];
          if (_struct != null) {
            return _struct;
          }
        }
      }

      // Lookup struct by "type"
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var struct = cache.structs[lookupName];
    if (struct != null) {
      return struct;
    }

    throw new Error('Missing ABI action: ' + lookupName);
  };

  // If nodeos does not have an ABI setup for a certain action.type, it will throw
  // an error: `Invalid cast from object_type to string` .. forceActionDataHex
  // may be used to until native ABI is added or fixed.
  var forceActionDataHex = config.forceActionDataHex != null ? config.forceActionDataHex : true;

  var override = Object.assign({}, authorityOverride(config), abiOverride(structLookup), wasmCodeOverride(config), actionDataOverride(structLookup, forceActionDataHex), config.override);

  var eosTypes = {
    name: function name() {
      return [Name];
    },
    public_key: function public_key() {
      return [variant(PublicKeyEcc)];
    },

    symbol: function symbol() {
      return [_Symbol];
    },
    symbol_code: function symbol_code() {
      return [SymbolCode];
    },
    extended_symbol: function extended_symbol() {
      return [ExtendedSymbol];
    },

    asset: function asset() {
      return [Asset];
    }, // After Symbol: amount, precision, symbol, contract
    extended_asset: function extended_asset() {
      return [ExtendedAsset];
    }, // After Asset: amount, precision, symbol, contract

    signature: function signature() {
      return [variant(SignatureType)];
    }
  };

  var customTypes = Object.assign({}, eosTypes, config.customTypes);
  config = Object.assign({ override: override }, { customTypes: customTypes }, config);

  // Do not sort transaction actions
  config.sort = Object.assign({}, config.sort);
  config.sort['action.authorization'] = true;
  config.sort['signed_transaction.signature'] = true;
  config.sort['authority.accounts'] = true;
  config.sort['authority.keys'] = true;

  var fullSchema = Object.assign({}, schema, extendedSchema);

  var _Fcbuffer = Fcbuffer(fullSchema, config),
      structs = _Fcbuffer.structs,
      types = _Fcbuffer.types,
      errors = _Fcbuffer.errors,
      fromBuffer = _Fcbuffer.fromBuffer,
      toBuffer = _Fcbuffer.toBuffer;

  if (errors.length !== 0) {
    throw new Error(JSON.stringify(errors, null, 4));
  }

  return { structs: structs, types: types, fromBuffer: fromBuffer, toBuffer: toBuffer };
};

/**
  Name eos::types native.hpp
*/
var Name = function Name(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var n = decodeName(b.readUint64(), false); // b is already in littleEndian
      // if(validation.debug) {
      //   console.error(`${n}`, '(Name.fromByteBuffer)')
      // }
      return n;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      // if(validation.debug) {
      //   console.error(`${value}`, (Name.appendByteBuffer))
      // }
      b.writeUint64(encodeName(value, false)); // b is already in littleEndian
    },
    fromObject: function fromObject(value) {
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return '';
      }
      return value;
    }
  };
};

/**
  A variant is like having a version of an object.  A varint comes
  first and identifies which type of object this is.

  @arg {Array} variantArray array of types
*/
var variant = function variant() {
  for (var _len = arguments.length, variantArray = Array(_len), _key = 0; _key < _len; _key++) {
    variantArray[_key] = arguments[_key];
  }

  return function (validation, baseTypes, customTypes) {
    var variants = variantArray.map(function (Type) {
      return Type(validation, baseTypes, customTypes);
    });
    var staticVariant = baseTypes.static_variant(variants);

    return {
      fromByteBuffer: function fromByteBuffer(b) {
        return staticVariant.fromByteBuffer(b);
      },
      appendByteBuffer: function appendByteBuffer(b, value) {
        if (!Array.isArray(value)) {
          value = [0, value];
        }
        staticVariant.appendByteBuffer(b, value);
      },
      fromObject: function fromObject(value) {
        if (!Array.isArray(value)) {
          value = [0, value];
        }
        return staticVariant.fromObject(value)[1];
      },
      toObject: function toObject(value) {
        if (!Array.isArray(value)) {
          value = [0, value];
        }
        return staticVariant.toObject(value)[1];
      }
    };
  };
};

var PublicKeyEcc = function PublicKeyEcc(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var bcopy = b.copy(b.offset, b.offset + 33);
      b.skip(33);
      var pubbuf = Buffer.from(bcopy.toBinary(), 'binary');
      return PublicKey.fromBuffer(pubbuf).toString(validation.keyPrefix);
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      // if(validation.debug) {
      //   console.error(`${value}`, 'PublicKeyType.appendByteBuffer')
      // }
      var buf = PublicKey.fromStringOrThrow(value, validation.keyPrefix).toBuffer();
      b.append(buf.toString('binary'), 'binary');
    },
    fromObject: function fromObject(value) {
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        var keyPrefix = validation.keyPrefix ? validation.keyPrefix : 'EOS';
        return keyPrefix + '6MRy..';
      }
      return value;
    }
  };
};

/**
  Internal: precision, symbol
  External: symbol
  @example 'SYS'
*/
var _Symbol = function _Symbol(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var bcopy = b.copy(b.offset, b.offset + 8);
      b.skip(8);

      var precision = bcopy.readUint8();
      var bin = bcopy.toBinary();

      var symbol = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = bin[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var code = _step2.value;

          if (code == '\0') {
            break;
          }
          symbol += code;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return precision + ',' + symbol;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      var _parseAsset = parseAsset(value),
          symbol = _parseAsset.symbol,
          precision = _parseAsset.precision;

      assert(precision != null, 'Precision unknown for symbol: ' + value);
      var pad = '\0'.repeat(7 - symbol.length);
      b.append(String.fromCharCode(precision) + symbol + pad);
    },
    fromObject: function fromObject(value) {
      assert(value != null, 'Symbol is required: ' + value);

      var _parseAsset2 = parseAsset(value),
          symbol = _parseAsset2.symbol,
          precision = _parseAsset2.precision;

      if (precision == null) {
        return symbol;
      } else {
        // Internal object, this can have the precision prefix
        return precision + ',' + symbol;
      }
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return 'SYS';
      }
      // symbol only (without precision prefix)
      return parseAsset(value).symbol;
    }
  };
};

/** Symbol type without the precision */
var SymbolCode = function SymbolCode(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var bcopy = b.copy(b.offset, b.offset + 8);
      b.skip(8);

      var bin = bcopy.toBinary();

      var symbol = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = bin[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var code = _step3.value;

          if (code == '\0') {
            break;
          }
          symbol += code;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return '' + symbol;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      var _parseAsset3 = parseAsset(value),
          symbol = _parseAsset3.symbol;

      var pad = '\0'.repeat(8 - symbol.length);
      b.append(symbol + pad);
    },
    fromObject: function fromObject(value) {
      assert(value != null, 'Symbol is required: ' + value);

      var _parseAsset4 = parseAsset(value),
          symbol = _parseAsset4.symbol;

      return symbol;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return 'SYS';
      }
      return parseAsset(value).symbol;
    }
  };
};

/**
  Internal: precision, symbol, contract
  External: symbol, contract
  @example 'SYS@contract'
*/
var ExtendedSymbol = function ExtendedSymbol(validation, baseTypes, customTypes) {
  var symbolType = customTypes.symbol(validation);
  var contractName = customTypes.name(validation);

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var symbol = symbolType.fromByteBuffer(b);
      var contract = contractName.fromByteBuffer(b);
      return symbol + '@' + contract;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      assert.equal(typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value), 'string', 'Invalid extended symbol: ' + value);

      var _value$split = value.split('@'),
          _value$split2 = (0, _slicedToArray3.default)(_value$split, 2),
          symbol = _value$split2[0],
          contract = _value$split2[1];

      assert(contract != null, 'Missing @contract suffix in extended symbol: ' + value);

      symbolType.appendByteBuffer(b, symbol);
      contractName.appendByteBuffer(b, contract);
    },
    fromObject: function fromObject(value) {
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return 'SYS@contract';
      }
      return value;
    }
  };
};

/**
  Internal: amount, precision, symbol, contract
  @example '1.0000 SYS'
*/
var Asset = function Asset(validation, baseTypes, customTypes) {
  var amountType = baseTypes.int64(validation);
  var symbolType = customTypes.symbol(validation);

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var amount = amountType.fromByteBuffer(b);
      assert(amount != null, 'amount');

      var sym = symbolType.fromByteBuffer(b);

      var _parseAsset5 = parseAsset('' + sym),
          precision = _parseAsset5.precision,
          symbol = _parseAsset5.symbol;

      assert(precision != null, 'precision');
      assert(symbol != null, 'symbol');

      return DecimalUnimply(amount, precision) + ' ' + symbol;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      var _parseAsset6 = parseAsset(value),
          amount = _parseAsset6.amount,
          precision = _parseAsset6.precision,
          symbol = _parseAsset6.symbol;

      assert(amount != null, 'amount');
      assert(precision != null, 'precision');
      assert(symbol != null, 'symbol');

      amountType.appendByteBuffer(b, DecimalImply(amount, precision));
      symbolType.appendByteBuffer(b, precision + ',' + symbol);
    },
    fromObject: function fromObject(value) {
      var _parseAsset7 = parseAsset(value),
          amount = _parseAsset7.amount,
          precision = _parseAsset7.precision,
          symbol = _parseAsset7.symbol;

      assert(amount != null, 'amount');
      assert(precision != null, 'precision');
      assert(symbol != null, 'symbol');

      return DecimalPad(amount, precision) + ' ' + symbol;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return '0.0001 SYS';
      }

      var _parseAsset8 = parseAsset(value),
          amount = _parseAsset8.amount,
          precision = _parseAsset8.precision,
          symbol = _parseAsset8.symbol;

      assert(amount != null, 'amount');
      assert(precision != null, 'precision');
      assert(symbol != null, 'symbol');

      return DecimalPad(amount, precision) + ' ' + symbol;
    }
  };
};

/**
  @example '1.0000 SYS@contract'
*/
var ExtendedAsset = function ExtendedAsset(validation, baseTypes, customTypes) {
  var assetType = customTypes.asset(validation);
  var contractName = customTypes.name(validation);

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var asset = assetType.fromByteBuffer(b);
      var contract = contractName.fromByteBuffer(b);
      return parseAsset(asset + '@' + contract);
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      assert.equal(typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value), 'object', 'expecting extended_asset object, got ' + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));

      var asset = printAsset(value);

      var _asset$split = asset.split('@'),
          _asset$split2 = (0, _slicedToArray3.default)(_asset$split, 2),
          contract = _asset$split2[1];

      assert.equal(typeof contract === 'undefined' ? 'undefined' : (0, _typeof3.default)(contract), 'string', 'Invalid extended asset: ' + value);

      // asset includes contract (assetType needs this)
      assetType.appendByteBuffer(b, asset);
      contractName.appendByteBuffer(b, contract);
    },
    fromObject: function fromObject(value) {
      // like: 1.0000 SYS@contract or 1 SYS@contract
      var asset = {};
      if (typeof value === 'string') {
        Object.assign(asset, parseAsset(value));
      } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        Object.assign(asset, value);
      } else {
        assert(false, 'expecting extended_asset<object|string>, got: ' + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));
      }

      var amount = asset.amount,
          precision = asset.precision,
          symbol = asset.symbol,
          contract = asset.contract;

      assert(amount != null, 'missing amount');
      assert(precision != null, 'missing precision');
      assert(symbol != null, 'missing symbol');
      assert(contract != null, 'missing contract');

      return { amount: amount, precision: precision, symbol: symbol, contract: contract };
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return {
          amount: '1.0000',
          precision: 4,
          symbol: 'SYS',
          contract: 'eosio.token'
        };
      }

      assert.equal(typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value), 'object', 'expecting extended_asset object');
      var amount = value.amount,
          precision = value.precision,
          symbol = value.symbol,
          contract = value.contract;


      return {
        amount: DecimalPad(amount, precision),
        precision: precision,
        symbol: symbol,
        contract: contract
      };
    }
  };
};

var SignatureType = function SignatureType(validation, baseTypes) {
  var signatureType = baseTypes.fixed_bytes65(validation);
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var signatureBuffer = signatureType.fromByteBuffer(b);
      var signature = Signature.from(signatureBuffer);
      return signature.toString();
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      var signature = Signature.from(value);
      signatureType.appendByteBuffer(b, signature.toBuffer());
    },
    fromObject: function fromObject(value) {
      var signature = Signature.from(value);
      return signature.toString();
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return 'SIG_K1_bas58signature..';
      }
      var signature = Signature.from(value);
      return signature.toString();
    }
  };
};

var authorityOverride = function authorityOverride(config) {
  return {
    /** shorthand `EOS6MRyAj..` */
    'authority.fromObject': function authorityFromObject(value) {
      if (PublicKey.fromString(value, config.keyPrefix)) {
        return {
          threshold: 1,
          keys: [{ key: value, weight: 1 }]
        };
      }
      if (typeof value === 'string') {
        var _value$split3 = value.split('@'),
            _value$split4 = (0, _slicedToArray3.default)(_value$split3, 2),
            account = _value$split4[0],
            _value$split4$ = _value$split4[1],
            permission = _value$split4$ === undefined ? 'active' : _value$split4$;

        return {
          threshold: 1,
          accounts: [{
            permission: {
              actor: account,
              permission: permission
            },
            weight: 1
          }]
        };
      }
    }
  };
};

var abiOverride = function abiOverride(structLookup) {
  return {
    'abi_def.fromObject': function abi_defFromObject(value) {
      if (typeof value === 'string') {
        var json = Buffer.from(value, 'hex').toString();
        if (json.length === 0) {
          json = Buffer.from(value).toString();
        }
        return JSON.parse(json);
      }
      if (Buffer.isBuffer(value)) {
        return JSON.parse(value.toString());
      }
      return null; // let the default type take care of it
    },

    'setabi.abi.appendByteBuffer': function setabiAbiAppendByteBuffer(_ref) {
      var fields = _ref.fields,
          object = _ref.object,
          b = _ref.b;

      var ser = structLookup('abi_def', 'eosio');
      var b2 = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);

      if (Buffer.isBuffer(object.abi)) {
        b2.append(object.abi);
      } else if ((0, _typeof3.default)(object.abi) == 'object') {
        ser.appendByteBuffer(b2, object.abi);
      }

      b.writeVarint32(b2.offset); // length prefix
      b.append(b2.copy(0, b2.offset), 'binary');
    }
  };
};

var wasmCodeOverride = function wasmCodeOverride(config) {
  return {
    'setcode.code.fromObject': function setcodeCodeFromObject(_ref2) {
      var object = _ref2.object,
          result = _ref2.result;

      try {
        var code = object.code.toString();
        if (/^\s*\(module/.test(code)) {
          var binaryen = config.binaryen;

          assert(binaryen != null, 'required: config.binaryen = require("binaryen")');
          if (config.debug) {
            console.log('Assembling WASM..');
          }
          var wasm = Buffer.from(binaryen.parseText(code).emitBinary());
          result.code = wasm;
        } else {
          result.code = object.code;
        }
      } catch (error) {
        console.error(error, object.code);
        throw error;
      }
    }
  };
};

/**
  Nested serialized structure.  Nested struct may be in HEX or object format.
*/
var actionDataOverride = function actionDataOverride(structLookup, forceActionDataHex) {
  return {
    'action.data.fromByteBuffer': function actionDataFromByteBuffer(_ref3) {
      var fields = _ref3.fields,
          object = _ref3.object,
          b = _ref3.b,
          config = _ref3.config;

      var ser = (object.name || '') == '' ? fields.data : structLookup(object.name, object.account);
      if (ser) {
        b.readVarint32(); // length prefix (usefull if object.name is unknown)
        object.data = ser.fromByteBuffer(b, config);
      } else {
        // console.log(`Unknown Action.name ${object.name}`)
        var lenPrefix = b.readVarint32();
        var bCopy = b.copy(b.offset, b.offset + lenPrefix);
        b.skip(lenPrefix);
        object.data = Buffer.from(bCopy.toBinary(), 'binary');
      }
    },

    'action.data.appendByteBuffer': function actionDataAppendByteBuffer(_ref4) {
      var fields = _ref4.fields,
          object = _ref4.object,
          b = _ref4.b;

      var ser = (object.name || '') == '' ? fields.data : structLookup(object.name, object.account);
      if (ser) {
        var b2 = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        ser.appendByteBuffer(b2, object.data);
        b.writeVarint32(b2.offset);
        b.append(b2.copy(0, b2.offset), 'binary');
      } else {
        // console.log(`Unknown Action.name ${object.name}`)
        var data = typeof object.data === 'string' ? Buffer.from(object.data, 'hex') : object.data;
        if (!Buffer.isBuffer(data)) {
          throw new TypeError('Unknown struct \'' + object.name + '\' for contract \'' + object.account + '\', locate this struct or provide serialized action.data');
        }
        b.writeVarint32(data.length);
        b.append(data.toString('binary'), 'binary');
      }
    },

    'action.data.fromObject': function actionDataFromObject(_ref5) {
      var fields = _ref5.fields,
          object = _ref5.object,
          result = _ref5.result;
      var data = object.data,
          name = object.name;

      var ser = (name || '') == '' ? fields.data : structLookup(name, object.account);
      if (ser) {
        if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
          result.data = ser.fromObject(data); // resolve shorthand
        } else if (typeof data === 'string') {
          var buf = Buffer.from(data, 'hex');
          result.data = Fcbuffer.fromBuffer(ser, buf);
        } else {
          throw new TypeError('Expecting hex string or object in action.data');
        }
      } else {
        // console.log(`Unknown Action.name ${object.name}`)
        result.data = data;
      }
    },

    'action.data.toObject': function actionDataToObject(_ref6) {
      var fields = _ref6.fields,
          object = _ref6.object,
          result = _ref6.result,
          config = _ref6.config;

      var _ref7 = object || {},
          data = _ref7.data,
          name = _ref7.name;

      var ser = (name || '') == '' ? fields.data : structLookup(name, object.account);
      if (!ser) {
        // Types without an ABI will accept hex
        result.data = Buffer.isBuffer(data) ? data.toString('hex') : data;
        return;
      }

      if (forceActionDataHex) {
        var b2 = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        if (data) {
          ser.appendByteBuffer(b2, data);
        }
        result.data = b2.copy(0, b2.offset).toString('hex');
        // console.log('result.data', result.data)
        return;
      }

      // Serializable JSON
      result.data = ser.toObject(data, config);
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "lF8Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  Convert a synchronous function into a asynchronous one (via setTimeout)
  wrapping it in a promise.  This does not expect the function to have a
  callback paramter.

  @arg {function} func - non-callback function

  @example promiseAsync(myfunction)
*/
module.exports = function (func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          resolve(func.apply(undefined, args));
        } catch (err) {
          reject(err);
        }
      });
    });
  };
};

/***/ }),

/***/ "lNPF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Aes = __webpack_require__("1ux4");
var PrivateKey = __webpack_require__("tHJk");
var PublicKey = __webpack_require__("zEA4");
var Signature = __webpack_require__("eFFR");
var key_utils = __webpack_require__("nDWd");
var hash = __webpack_require__("3HdZ");

/**
    [Wallet Import Format](https://en.bitcoin.it/wiki/Wallet_import_format)
    @typedef {string} wif
*/
/**
    EOSKey..
    @typedef {string} pubkey
*/

/** @namespace */
var ecc = {
    /**
      Initialize by running some self-checking code.  This should take a
      second to gather additional CPU entropy used during private key
      generation.
       Initialization happens once even if called multiple times.
       @return {Promise}
    */
    initialize: PrivateKey.initialize,

    /**
      Does not pause to gather CPU entropy.
      @return {Promise<PrivateKey>} test key
    */
    unsafeRandomKey: function unsafeRandomKey() {
        return PrivateKey.unsafeRandomKey().then(function (key) {
            return key.toString();
        });
    },

    /**
        @arg {number} [cpuEntropyBits = 0] gather additional entropy
        from a CPU mining algorithm.  This will already happen once by
        default.
         @return {Promise<wif>}
         @example
    ecc.randomKey().then(privateKey => {
    console.log('Private Key:\t', privateKey) // wif
    console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
    })
    */
    randomKey: function randomKey(cpuEntropyBits) {
        return PrivateKey.randomKey(cpuEntropyBits).then(function (key) {
            return key.toString();
        });
    },

    /**
         @arg {string} seed - any length string.  This is private.  The same
        seed produces the same private key every time.  At least 128 random
        bits should be used to produce a good private key.
        @return {wif}
         @example ecc.seedPrivate('secret') === wif
    */
    seedPrivate: function seedPrivate(seed) {
        return PrivateKey.fromSeed(seed).toString();
    },

    /**
        @arg {wif} wif
        @arg {string} [pubkey_prefix = 'EOS'] - public key prefix
         @return {pubkey}
         @example ecc.privateToPublic(wif) === pubkey
    */
    privateToPublic: function privateToPublic(wif) {
        var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';
        return PrivateKey(wif).toPublic().toString(pubkey_prefix);
    },

    /**
        @arg {pubkey} pubkey - like EOSKey..
        @arg {string} [pubkey_prefix = 'EOS']
         @return {boolean} valid
         @example ecc.isValidPublic(pubkey) === true
    */
    isValidPublic: function isValidPublic(pubkey) {
        var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';
        return PublicKey.isValid(pubkey, pubkey_prefix);
    },

    /**
        @arg {wif} wif
        @return {boolean} valid
         @example ecc.isValidPrivate(wif) === true
    */
    isValidPrivate: function isValidPrivate(wif) {
        return PrivateKey.isValid(wif);
    },

    /**
        Create a signature using data or a hash.
         @arg {string|Buffer} data
        @arg {wif|PrivateKey} privateKey
        @arg {String} [encoding = 'utf8'] - data encoding (if string)
         @return {string} string signature
         @example ecc.sign('I am alive', wif)
    */
    sign: function sign(data, privateKey) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';

        if (encoding === true) {
            throw new TypeError('API changed, use signHash(..) instead');
        } else {
            if (encoding === false) {
                console.log('Warning: ecc.sign hashData parameter was removed');
            }
        }
        return Signature.sign(data, privateKey, encoding).toString();
    },

    /**
        @arg {String|Buffer} dataSha256 - sha256 hash 32 byte buffer or string
        @arg {wif|PrivateKey} privateKey
        @arg {String} [encoding = 'hex'] - dataSha256 encoding (if string)
         @return {string} string signature
    */
    signHash: function signHash(dataSha256, privateKey) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';

        return Signature.signHash(dataSha256, privateKey, encoding).toString();
    },

    /**
        Verify signed data.
         @arg {string|Buffer} signature - buffer or hex string
        @arg {string|Buffer} data
        @arg {pubkey|PublicKey} pubkey
        @arg {boolean} [hashData = true] - sha256 hash data before verify
        @return {boolean}
         @example ecc.verify(signature, 'I am alive', pubkey) === true
    */
    verify: function verify(signature, data, pubkey) {
        var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf8';

        if (encoding === true) {
            throw new TypeError('API changed, use verifyHash(..) instead');
        } else {
            if (encoding === false) {
                console.log('Warning: ecc.verify hashData parameter was removed');
            }
        }
        signature = Signature.from(signature);
        return signature.verify(data, pubkey, encoding);
    },

    verifyHash: function verifyHash(signature, dataSha256, pubkey) {
        var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hex';

        signature = Signature.from(signature);
        return signature.verifyHash(dataSha256, pubkey, encoding);
    },


    /**
        Recover the public key used to create the signature.
         @arg {String|Buffer} signature (EOSbase58sig.., Hex, Buffer)
        @arg {String|Buffer} data - full data
        @arg {String} [encoding = 'utf8'] - data encoding (if data is a string)
         @return {pubkey}
         @example ecc.recover(signature, 'I am alive') === pubkey
    */
    recover: function recover(signature, data) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';

        if (encoding === true) {
            throw new TypeError('API changed, use recoverHash(signature, data) instead');
        } else {
            if (encoding === false) {
                console.log('Warning: ecc.recover hashData parameter was removed');
            }
        }
        signature = Signature.from(signature);
        return signature.recover(data, encoding).toString();
    },

    /**
        @arg {String|Buffer} signature (EOSbase58sig.., Hex, Buffer)
        @arg {String|Buffer} dataSha256 - sha256 hash 32 byte buffer or hex string
        @arg {String} [encoding = 'hex'] - dataSha256 encoding (if dataSha256 is a string)
         @return {PublicKey}
    */
    recoverHash: function recoverHash(signature, dataSha256) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';

        signature = Signature.from(signature);
        return signature.recoverHash(dataSha256, encoding).toString();
    },

    /** @arg {string|Buffer} data - always binary, you may need Buffer.from(data, 'hex')
        @arg {string} [encoding = 'hex'] - result encoding 'hex', 'binary' or 'base64'
        @return {string|Buffer} - Buffer when encoding is null, or string
         @example ecc.sha256('hashme') === '02208b..'
        @example ecc.sha256(Buffer.from('02208b', 'hex')) === '29a23..'
    */
    sha256: function sha256(data) {
        var resultEncoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hex';
        return hash.sha256(data, resultEncoding);
    }
};

module.exports = ecc;

/***/ }),

/***/ "nDWd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var base58 = __webpack_require__("B3Rj");
var assert = __webpack_require__("9lTW");
var randomBytes = __webpack_require__("Edxu");

var hash = __webpack_require__("3HdZ");

module.exports = {
    random32ByteBuffer: random32ByteBuffer,
    addEntropy: addEntropy,
    cpuEntropy: cpuEntropy,
    entropyCount: function entropyCount() {
        return _entropyCount;
    },
    checkDecode: checkDecode,
    checkEncode: checkEncode
};

var entropyPos = 0,
    _entropyCount = 0;

var externalEntropyArray = randomBytes(101);

/**
    Additional forms of entropy are used.  A week random number generator can run out of entropy.  This should ensure even the worst random number implementation will be reasonably safe.

    @arg {number} [cpuEntropyBits = 0] generate entropy on the fly.  This is
    not required, entropy can be added in advanced via addEntropy or initialize().

    @arg {boolean} [safe = true] false for testing, otherwise this will be
    true to ensure initialize() was called.

    @return a random buffer obtained from the secure random number generator.  Additional entropy is used.
*/
function random32ByteBuffer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$cpuEntropyBits = _ref.cpuEntropyBits,
        cpuEntropyBits = _ref$cpuEntropyBits === undefined ? 0 : _ref$cpuEntropyBits,
        _ref$safe = _ref.safe,
        safe = _ref$safe === undefined ? true : _ref$safe;

    assert.equal(typeof cpuEntropyBits === 'undefined' ? 'undefined' : _typeof(cpuEntropyBits), 'number', 'cpuEntropyBits');
    assert.equal(typeof safe === 'undefined' ? 'undefined' : _typeof(safe), 'boolean', 'boolean');

    if (safe) {
        assert(_entropyCount >= 128, 'Call initialize() to add entropy');
    }

    // if(entropyCount > 0) {
    //     console.log(`Additional private key entropy: ${entropyCount} events`)
    // }

    var hash_array = [];
    hash_array.push(randomBytes(32));
    hash_array.push(Buffer.from(cpuEntropy(cpuEntropyBits)));
    hash_array.push(externalEntropyArray);
    hash_array.push(browserEntropy());
    return hash.sha256(Buffer.concat(hash_array));
}

/**
    Adds entropy.  This may be called many times while the amount of data saved
    is accumulatively reduced to 101 integers.  Data is retained in RAM for the
    life of this module.

    @example React <code>
    componentDidMount() {
        this.refs.MyComponent.addEventListener("mousemove", this.onEntropyEvent, {capture: false, passive: true})
    }
    componentWillUnmount() {
        this.refs.MyComponent.removeEventListener("mousemove", this.onEntropyEvent);
    }
    onEntropyEvent = (e) => {
        if(e.type === 'mousemove')
            key_utils.addEntropy(e.pageX, e.pageY, e.screenX, e.screenY)
        else
            console.log('onEntropyEvent Unknown', e.type, e)
    }
    </code>
*/
function addEntropy() {
    assert.equal(externalEntropyArray.length, 101, 'externalEntropyArray');

    for (var _len = arguments.length, ints = Array(_len), _key = 0; _key < _len; _key++) {
        ints[_key] = arguments[_key];
    }

    _entropyCount += ints.length;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            var pos = entropyPos++ % 101;
            var i2 = externalEntropyArray[pos] += i;
            if (i2 > 9007199254740991) externalEntropyArray[pos] = 0;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/**
    This runs in just under 1 second and ensures a minimum of cpuEntropyBits
    bits of entropy are gathered.

    Based on more-entropy. @see https://github.com/keybase/more-entropy/blob/master/src/generator.iced

    @arg {number} [cpuEntropyBits = 128]
    @return {array} counts gathered by measuring variations in the CPU speed during floating point operations.
*/
function cpuEntropy() {
    var cpuEntropyBits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;

    var collected = [];
    var lastCount = null;
    var lowEntropySamples = 0;
    while (collected.length < cpuEntropyBits) {
        var count = floatingPointCount();
        if (lastCount != null) {
            var delta = count - lastCount;
            if (Math.abs(delta) < 1) {
                lowEntropySamples++;
                continue;
            }
            // how many bits of entropy were in this sample
            var bits = Math.floor(log2(Math.abs(delta)) + 1);
            if (bits < 4) {
                if (bits < 2) {
                    lowEntropySamples++;
                }
                continue;
            }
            collected.push(delta);
        }
        lastCount = count;
    }
    if (lowEntropySamples > 10) {
        var pct = Number(lowEntropySamples / cpuEntropyBits * 100).toFixed(2);
        // Is this algorithm getting inefficient?
        console.warn('WARN: ' + pct + '% low CPU entropy re-sampled');
    }
    return collected;
}

/**
    @private
    Count while performing floating point operations during a fixed time
    (7 ms for example).  Using a fixed time makes this algorithm
    predictable in runtime.
*/
function floatingPointCount() {
    var workMinMs = 7;
    var d = Date.now();
    var i = 0,
        x = 0;
    while (Date.now() < d + workMinMs + 1) {
        x = Math.sin(Math.sqrt(Math.log(++i + x)));
    }
    return i;
}

var log2 = function log2(x) {
    return Math.log(x) / Math.LN2;
};

/**
    @private
    Attempt to gather and hash information from the browser's window, history, and supported mime types.  For non-browser environments this simply includes secure random data.  In any event, the information is re-hashed in a loop for 25 milliseconds seconds.

    @return {Buffer} 32 bytes
*/
function browserEntropy() {
    var entropyStr = Array(randomBytes(101)).join();
    try {
        entropyStr += new Date().toString() + " " + window.screen.height + " " + window.screen.width + " " + window.screen.colorDepth + " " + " " + window.screen.availHeight + " " + window.screen.availWidth + " " + window.screen.pixelDepth + navigator.language + " " + window.location + " " + window.history.length;

        for (var i = 0, mimeType; i < navigator.mimeTypes.length; i++) {
            mimeType = navigator.mimeTypes[i];
            entropyStr += mimeType.description + " " + mimeType.type + " " + mimeType.suffixes + " ";
        }
    } catch (error) {
        //nodejs:ReferenceError: window is not defined
        entropyStr += hash.sha256(new Date().toString());
    }

    var b = new Buffer(entropyStr);
    entropyStr += b.toString('binary') + " " + new Date().toString();

    var entropy = entropyStr;
    var start_t = Date.now();
    while (Date.now() - start_t < 25) {
        entropy = hash.sha256(entropy);
    }return entropy;
}

/**
  @arg {Buffer} keyBuffer data
  @arg {string} keyType = sha256x2, K1, etc
  @return {string} checksum encoded base58 string
*/
function checkEncode(keyBuffer) {
    var keyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    assert(Buffer.isBuffer(keyBuffer), 'expecting keyBuffer<Buffer>');
    if (keyType === 'sha256x2') {
        // legacy
        var checksum = hash.sha256(hash.sha256(keyBuffer)).slice(0, 4);
        return base58.encode(Buffer.concat([keyBuffer, checksum]));
    } else {
        var check = [keyBuffer];
        if (keyType) {
            check.push(Buffer.from(keyType));
        }
        var _checksum = hash.ripemd160(Buffer.concat(check)).slice(0, 4);
        return base58.encode(Buffer.concat([keyBuffer, _checksum]));
    }
}

/**
  @arg {Buffer} keyString data
  @arg {string} keyType = sha256x2, K1, etc
  @return {string} checksum encoded base58 string
*/
function checkDecode(keyString) {
    var keyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    assert(keyString != null, 'private key expected');
    var buffer = new Buffer(base58.decode(keyString));
    var checksum = buffer.slice(-4);
    var key = buffer.slice(0, -4);

    var newCheck = void 0;
    if (keyType === 'sha256x2') {
        // legacy
        newCheck = hash.sha256(hash.sha256(key)).slice(0, 4); // WIF (legacy)
    } else {
        var check = [key];
        if (keyType) {
            check.push(Buffer.from(keyType));
        }
        newCheck = hash.ripemd160(Buffer.concat(check)).slice(0, 4); //PVT
    }

    if (checksum.toString() !== newCheck.toString()) {
        throw new Error('Invalid checksum, ' + (checksum.toString('hex') + ' != ' + newCheck.toString('hex')));
    }

    return key;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "r751":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var assert = __webpack_require__("9lTW"); // from github.com/bitcoinjs/bitcoinjs-lib from github.com/cryptocoinjs/ecdsa
var crypto = __webpack_require__("3HdZ");
var enforceType = __webpack_require__("rSjz");

var BigInteger = __webpack_require__("7Vg5");
var ECSignature = __webpack_require__("ekB5");

// https://tools.ietf.org/html/rfc6979#section-3.2
function deterministicGenerateK(curve, hash, d, checkSig, nonce) {

  enforceType('Buffer', hash);
  enforceType(BigInteger, d);

  if (nonce) {
    hash = crypto.sha256(Buffer.concat([hash, new Buffer(nonce)]));
  }

  // sanity check
  assert.equal(hash.length, 32, 'Hash must be 256 bit');

  var x = d.toBuffer(32);
  var k = new Buffer(32);
  var v = new Buffer(32);

  // Step B
  v.fill(1);

  // Step C
  k.fill(0);

  // Step D
  k = crypto.HmacSHA256(Buffer.concat([v, new Buffer([0]), x, hash]), k);

  // Step E
  v = crypto.HmacSHA256(v, k);

  // Step F
  k = crypto.HmacSHA256(Buffer.concat([v, new Buffer([1]), x, hash]), k);

  // Step G
  v = crypto.HmacSHA256(v, k);

  // Step H1/H2a, ignored as tlen === qlen (256 bit)
  // Step H2b
  v = crypto.HmacSHA256(v, k);

  var T = BigInteger.fromBuffer(v);

  // Step H3, repeat until T is within the interval [1, n - 1]
  while (T.signum() <= 0 || T.compareTo(curve.n) >= 0 || !checkSig(T)) {
    k = crypto.HmacSHA256(Buffer.concat([v, new Buffer([0])]), k);
    v = crypto.HmacSHA256(v, k);

    // Step H1/H2a, again, ignored as tlen === qlen (256 bit)
    // Step H2b again
    v = crypto.HmacSHA256(v, k);

    T = BigInteger.fromBuffer(v);
  }

  return T;
}

function sign(curve, hash, d, nonce) {

  var e = BigInteger.fromBuffer(hash);
  var n = curve.n;
  var G = curve.G;

  var r, s;
  var k = deterministicGenerateK(curve, hash, d, function (k) {
    // find canonically valid signature
    var Q = G.multiply(k);

    if (curve.isInfinity(Q)) return false;

    r = Q.affineX.mod(n);
    if (r.signum() === 0) return false;

    s = k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);
    if (s.signum() === 0) return false;

    return true;
  }, nonce);

  var N_OVER_TWO = n.shiftRight(1);

  // enforce low S values, see bip62: 'low s values in signatures'
  if (s.compareTo(N_OVER_TWO) > 0) {
    s = n.subtract(s);
  }

  return ECSignature(r, s);
}

function verifyRaw(curve, e, signature, Q) {
  var n = curve.n;
  var G = curve.G;

  var r = signature.r;
  var s = signature.s;

  // 1.4.1 Enforce r and s are both integers in the interval [1, n − 1]
  if (r.signum() <= 0 || r.compareTo(n) >= 0) return false;
  if (s.signum() <= 0 || s.compareTo(n) >= 0) return false;

  // c = s^-1 mod n
  var c = s.modInverse(n);

  // 1.4.4 Compute u1 = es^−1 mod n
  //               u2 = rs^−1 mod n
  var u1 = e.multiply(c).mod(n);
  var u2 = r.multiply(c).mod(n);

  // 1.4.5 Compute R = (xR, yR) = u1G + u2Q
  var R = G.multiplyTwo(u1, Q, u2);

  // 1.4.5 (cont.) Enforce R is not at infinity
  if (curve.isInfinity(R)) return false;

  // 1.4.6 Convert the field element R.x to an integer
  var xR = R.affineX;

  // 1.4.7 Set v = xR mod n
  var v = xR.mod(n);

  // 1.4.8 If v = r, output "valid", and if v != r, output "invalid"
  return v.equals(r);
}

function verify(curve, hash, signature, Q) {
  // 1.4.2 H = Hash(M), already done by the user
  // 1.4.3 e = H
  var e = BigInteger.fromBuffer(hash);
  return verifyRaw(curve, e, signature, Q);
}

/**
  * Recover a public key from a signature.
  *
  * See SEC 1: Elliptic Curve Cryptography, section 4.1.6, "Public
  * Key Recovery Operation".
  *
  * http://www.secg.org/download/aid-780/sec1-v2.pdf
  */
function recoverPubKey(curve, e, signature, i) {
  assert.strictEqual(i & 3, i, 'Recovery param is more than two bits');

  var n = curve.n;
  var G = curve.G;

  var r = signature.r;
  var s = signature.s;

  assert(r.signum() > 0 && r.compareTo(n) < 0, 'Invalid r value');
  assert(s.signum() > 0 && s.compareTo(n) < 0, 'Invalid s value');

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = i & 1;

  // The more significant bit specifies whether we should use the
  // first or second candidate key.
  var isSecondKey = i >> 1;

  // 1.1 Let x = r + jn
  var x = isSecondKey ? r.add(n) : r;
  var R = curve.pointFromX(isYOdd, x);

  // 1.4 Check that nR is at infinity
  var nR = R.multiply(n);
  assert(curve.isInfinity(nR), 'nR is not a valid curve point');

  // Compute -e from e
  var eNeg = e.negate().mod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  var rInv = r.modInverse(n);

  var Q = R.multiplyTwo(s, G, eNeg).multiply(rInv);
  curve.validate(Q);

  return Q;
}

/**
  * Calculate pubkey extraction parameter.
  *
  * When extracting a pubkey from a signature, we have to
  * distinguish four different cases. Rather than putting this
  * burden on the verifier, Bitcoin includes a 2-bit value with the
  * signature.
  *
  * This function simply tries all four cases and returns the value
  * that resulted in a successful pubkey recovery.
  */
function calcPubKeyRecoveryParam(curve, e, signature, Q) {
  for (var i = 0; i < 4; i++) {
    var Qprime = recoverPubKey(curve, e, signature, i);

    // 1.6.2 Verify Q
    if (Qprime.equals(Q)) {
      return i;
    }
  }

  throw new Error('Unable to find valid recovery factor');
}

module.exports = {
  calcPubKeyRecoveryParam: calcPubKeyRecoveryParam,
  deterministicGenerateK: deterministicGenerateK,
  recoverPubKey: recoverPubKey,
  sign: sign,
  verify: verify,
  verifyRaw: verifyRaw
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "rSjz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function enforce(type, value) {
  // Copied from https://github.com/bitcoinjs/bitcoinjs-lib
  switch (type) {
    case 'Array':
      {
        if (Array.isArray(value)) return;
        break;
      }

    case 'Boolean':
      {
        if (typeof value === 'boolean') return;
        break;
      }

    case 'Buffer':
      {
        if (Buffer.isBuffer(value)) return;
        break;
      }

    case 'Number':
      {
        if (typeof value === 'number') return;
        break;
      }

    case 'String':
      {
        if (typeof value === 'string') return;
        break;
      }

    default:
      {
        if (getName(value.constructor) === getName(type)) return;
      }
  }

  throw new TypeError('Expected ' + (getName(type) || type) + ', got ' + value);
};

function getName(fn) {
  // Why not fn.name: https://kangax.github.io/compat-table/es6/#function_name_property
  var match = fn.toString().match(/function (.*?)\(/);
  return match ? match[1] : null;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "tHJk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ecurve = __webpack_require__("eKop");
var Point = ecurve.Point;
var secp256k1 = ecurve.getCurveByName('secp256k1');
var BigInteger = __webpack_require__("7Vg5");
var assert = __webpack_require__("9lTW");

var hash = __webpack_require__("3HdZ");
var PublicKey = __webpack_require__("zEA4");
var keyUtils = __webpack_require__("nDWd");
var createHash = __webpack_require__("mObS");
var promiseAsync = __webpack_require__("lF8Q");

var G = secp256k1.G;
var n = secp256k1.n;

module.exports = PrivateKey;

/**
  @typedef {string} wif - https://en.bitcoin.it/wiki/Wallet_import_format
  @typedef {string} pubkey - EOSKey..
  @typedef {ecurve.Point} Point
*/

/**
  @param {BigInteger} d
*/
function PrivateKey(d) {
    if (typeof d === 'string') {
        return PrivateKey.fromString(d);
    } else if (Buffer.isBuffer(d)) {
        return PrivateKey.fromBuffer(d);
    } else if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && BigInteger.isBigInteger(d.d)) {
        return PrivateKey(d.d);
    }

    if (!BigInteger.isBigInteger(d)) {
        throw new TypeError('Invalid private key');
    }

    /** @return {string} private key like PVT_K1_base58privatekey.. */
    function toString() {
        // todo, use PVT_K1_
        // return 'PVT_K1_' + keyUtils.checkEncode(toBuffer(), 'K1')
        return toWif();
    }

    /**
        @return  {wif}
    */
    function toWif() {
        var private_key = toBuffer();
        // checksum includes the version
        private_key = Buffer.concat([new Buffer([0x80]), private_key]);
        return keyUtils.checkEncode(private_key, 'sha256x2');
    }

    var public_key = void 0;

    /**
        @return {Point}
    */
    function toPublic() {
        if (public_key) {
            // cache
            // S L O W in the browser
            return public_key;
        }
        var Q = secp256k1.G.multiply(d);
        return public_key = PublicKey.fromPoint(Q);
    }

    function toBuffer() {
        return d.toBuffer(32);
    }

    /**
      ECIES
      @arg {string|Object} pubkey wif, PublicKey object
      @return {Buffer} 64 byte shared secret
    */
    function getSharedSecret(public_key) {
        public_key = PublicKey(public_key);
        var KB = public_key.toUncompressed().toBuffer();
        var KBP = Point.fromAffine(secp256k1, BigInteger.fromBuffer(KB.slice(1, 33)), // x
        BigInteger.fromBuffer(KB.slice(33, 65)) // y
        );
        var r = toBuffer();
        var P = KBP.multiply(BigInteger.fromBuffer(r));
        var S = P.affineX.toBuffer({ size: 32 });
        // SHA512 used in ECIES
        return hash.sha512(S);
    }

    // /** ECIES TODO unit test
    //   @arg {string|Object} pubkey wif, PublicKey object
    //   @return {Buffer} 64 byte shared secret
    // */
    // function getSharedSecret(public_key) {
    //     public_key = PublicKey(public_key).toUncompressed()
    //     var P = public_key.Q.multiply( d );
    //     var S = P.affineX.toBuffer({size: 32});
    //     // ECIES, adds an extra sha512
    //     return hash.sha512(S);
    // }

    /**
      @arg {string} name - child key name.
      @return {PrivateKey}
       @example activePrivate = masterPrivate.getChildKey('owner').getChildKey('active')
      @example activePrivate.getChildKey('mycontract').getChildKey('myperm')
    */
    function getChildKey(name) {
        // console.error('WARNING: getChildKey untested against eosd'); // no eosd impl yet
        var index = createHash('sha256').update(toBuffer()).update(name).digest();
        return PrivateKey(index);
    }

    function toHex() {
        return toBuffer().toString('hex');
    }

    return {
        d: d,
        toWif: toWif,
        toString: toString,
        toPublic: toPublic,
        toBuffer: toBuffer,
        getSharedSecret: getSharedSecret,
        getChildKey: getChildKey
    };
}

/** @private */
function parseKey(privateStr) {
    assert.equal(typeof privateStr === 'undefined' ? 'undefined' : _typeof(privateStr), 'string', 'privateStr');
    var match = privateStr.match(/^PVT_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);

    if (match === null) {
        // legacy WIF - checksum includes the version
        var versionKey = keyUtils.checkDecode(privateStr, 'sha256x2');
        var version = versionKey.readUInt8(0);
        assert.equal(0x80, version, 'Expected version ' + 0x80 + ', instead got ' + version);
        var _privateKey = PrivateKey.fromBuffer(versionKey.slice(1));
        var _keyType = 'K1';
        var format = 'WIF';
        return { privateKey: _privateKey, format: format, keyType: _keyType };
    }

    assert(match.length === 3, 'Expecting private key like: PVT_K1_base58privateKey..');

    var _match = _slicedToArray(match, 3),
        keyType = _match[1],
        keyString = _match[2];

    assert.equal(keyType, 'K1', 'K1 private key expected');
    var privateKey = PrivateKey.fromBuffer(keyUtils.checkDecode(keyString, keyType));
    return { privateKey: privateKey, format: 'PVT', keyType: keyType };
}

PrivateKey.fromHex = function (hex) {
    return PrivateKey.fromBuffer(new Buffer(hex, 'hex'));
};

PrivateKey.fromBuffer = function (buf) {
    if (!Buffer.isBuffer(buf)) {
        throw new Error("Expecting parameter to be a Buffer type");
    }
    if (buf.length === 33 && buf[32] === 1) {
        // remove compression flag
        buf = buf.slice(0, -1);
    }
    if (32 !== buf.length) {
        throw new Error('Expecting 32 bytes, instead got ' + buf.length);
    }
    return PrivateKey(BigInteger.fromBuffer(buf));
};

/**
    @arg {string} seed - any length string.  This is private, the same seed
    produces the same private key every time.

    @return {PrivateKey}
*/
PrivateKey.fromSeed = function (seed) {
    // generate_private_key
    if (!(typeof seed === 'string')) {
        throw new Error('seed must be of type string');
    }
    return PrivateKey.fromBuffer(hash.sha256(seed));
};

/**
  @arg {wif} key
  @return {boolean} true if key is in the Wallet Import Format
*/
PrivateKey.isWif = function (text) {
    try {
        assert(parseKey(text).format === 'WIF');
        return true;
    } catch (e) {
        return false;
    }
};

/**
  @arg {wif|Buffer|PrivateKey} key
  @return {boolean} true if key is convertable to a private key object.
*/
PrivateKey.isValid = function (key) {
    try {
        PrivateKey(key);
        return true;
    } catch (e) {
        return false;
    }
};

/** @deprecated */
PrivateKey.fromWif = function (str) {
    console.log('PrivateKey.fromWif is deprecated, please use PrivateKey.fromString');
    return PrivateKey.fromString(str);
};

/**
    @throws {AssertError|Error} parsing key
    @arg {string} privateStr Eosio or Wallet Import Format (wif) -- a secret
*/
PrivateKey.fromString = function (privateStr) {
    return parseKey(privateStr).privateKey;
};

/**
  Create a new random private key.

  Call initialize() first to run some self-checking code and gather some CPU
  entropy.

  @arg {number} [cpuEntropyBits = 0] - additional CPU entropy, this already
  happens once so it should not be needed again.

  @return {Promise<PrivateKey>} - random private key
*/
PrivateKey.randomKey = function () {
    var cpuEntropyBits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return PrivateKey.initialize().then(function () {
        return PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({ cpuEntropyBits: cpuEntropyBits }));
    });
};

/**
  @return {Promise<PrivateKey>} for testing, does not require initialize().
*/
PrivateKey.unsafeRandomKey = function () {
    return Promise.resolve(PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({ safe: false })));
};

var initialized = false,
    unitTested = false;

/**
  Run self-checking code and gather CPU entropy.

  Initialization happens once even if called multiple times.

  @return {Promise}
*/
function initialize() {
    if (initialized) {
        return;
    }

    unitTest();
    keyUtils.addEntropy.apply(keyUtils, _toConsumableArray(keyUtils.cpuEntropy()));
    assert(keyUtils.entropyCount() >= 128, 'insufficient entropy');

    initialized = true;
}

PrivateKey.initialize = promiseAsync(initialize);

/**
  Unit test basic private and public key functionality.

  @throws {AssertError}
*/
function unitTest() {
    var pvt = PrivateKey(hash.sha256(''));

    var pvtError = 'key comparison test failed on a known private key';
    assert.equal(pvt.toWif(), '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss', pvtError);
    assert.equal(pvt.toString(), '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss', pvtError);
    // assert.equal(pvt.toString(), 'PVT_K1_2jH3nnhxhR3zPUcsKaWWZC9ZmZAnKm3GAnFD1xynGJE1Znuvjd', pvtError)

    var pub = pvt.toPublic();
    var pubError = 'pubkey string comparison test failed on a known public key';
    assert.equal(pub.toString(), 'EOS859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM', pubError);
    // assert.equal(pub.toString(), 'PUB_K1_859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2Ht7beeX', pubError)
    // assert.equal(pub.toStringLegacy(), 'EOS859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM', pubError)

    doesNotThrow(function () {
        return PrivateKey.fromString(pvt.toWif());
    }, 'converting known wif from string');
    doesNotThrow(function () {
        return PrivateKey.fromString(pvt.toString());
    }, 'converting known pvt from string');
    doesNotThrow(function () {
        return PublicKey.fromString(pub.toString());
    }, 'converting known public key from string');
    // doesNotThrow(() => PublicKey.fromString(pub.toStringLegacy()), 'converting known public key from string')

    unitTested = true;
}

/** @private */
var doesNotThrow = function doesNotThrow(cb, msg) {
    try {
        cb();
    } catch (error) {
        error.message = msg + ' ==> ' + error.message;
        throw error;
    }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "u1Mj":
/***/ (function(module, exports) {

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ }),

/***/ "uEnK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = processArgs;

/**
  @typedef {object} processedArgs - Normalized object containing arguments, and
  a chained promise and a callback.

  @property {object} params - normalized args only, parameters by name, no extra options or callback.

  @property {object} options - non-null or non-undefined return value from invocation of
  optionsFormatter(optionsParam).

  @property {function} callback -chained to optional callback provided in args.  Resolves
  or rejects returnPromise.

  @property {Promise} returnPromise - promise is returned when no callback is provided in
  args[args.length - 1].  Undefined when a callback is provided.
*/
/**
  Convert args array or object into a normalized value object.  Suppoorts extra
  options and(or) callback parameters.

  Per the Promise API feature promisifyAll (see also sb-promisify), the callback
  (if provided) must always be last.

  @arg {Array|object} args - User-provided parameter object or array of parameters
  @arg {Array} defParams - Names for the parameters.
  @arg {string} methodName - for error reporting
  @arg {function} [optionsFormatter(extraParam) = null] - optional callback used if an
    extra optional (non-callback) parameter is provided.


  @return {processedArgs} processedArgs
  @throws TypeError - when parameter count is not exact (after adjusting for
  options and callback)

  @example api.processArgs(args, ['account'], 'contract', optionsFormatter)
*/
function processArgs(args, defParams) {
  var methodName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'method';
  var optionsFormatter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var params = {};
  var options = {};

  var expectedArgCount = defParams.length;

  // Extra callback argument?  Last per promisifyAll standard.
  var callbackArg = void 0;
  if (typeof args[args.length - 1] === 'function') {
    callbackArg = args[args.length - 1];
    args = args.slice(0, args.length - 1);
  }

  var callback = void 0;
  var returnPromise = void 0;
  if (callbackArg) {
    callback = function callback(err, result) {
      if (err) {
        callbackArg(err);
      } else {
        callbackArg(null, result);
      }
    };
  } else {
    returnPromise = new Promise(function (resolve, reject) {
      callback = function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
    });
  }

  // Look for the options parameter (after potential callback was removed)
  if (typeof optionsFormatter === 'function' && args.length > 0 && (_typeof(args[0]) === 'object' && args.length === 2 || args.length === expectedArgCount + 1)) {
    //An extra options argument
    options = optionsFormatter(args[args.length - 1]);
    if (options != null) {
      // It is valid, remove it to avoid parameter count an error below
      args = args.slice(0, args.length - 1);
    }
  }

  // Parameteters (args) can be ordered or an object
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    params = args[0];
  } else {
    // give ordered paramaters names

    if (args.length > expectedArgCount) {
      // console.log('typeof defParams[expectedArgCount]', args)
      throw new TypeError(methodName + ' is expecting ' + expectedArgCount + ' parameters but ' + args.length + ' where provided');
    }

    // convert ordered parameters into a value object by parameter name
    var pos = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = defParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var defParam = _step.value;

        params[defParam] = args[pos];
        pos++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return { params: params, options: options, callback: callback, returnPromise: returnPromise };
}

/***/ }),

/***/ "wBD3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("LpSC");
var camelCase = __webpack_require__("hZA9");
var helpers = __webpack_require__("Re1D");
var processArgs = __webpack_require__("uEnK");

module.exports = apiGen;

function apiGen(version, definitions) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var configDefaults = {
    httpEndpoint: 'http://127.0.0.1:8888',
    verbose: false,
    logger: {
      log: function log() {
        var _console;

        return config.verbose ? (_console = console).log.apply(_console, arguments) : null;
      },
      error: function error() {
        var _console2;

        return config.verbose ? (_console2 = console).error.apply(_console2, arguments) : null;
      }
    }
  };

  function applyDefaults(target, defaults) {
    Object.keys(defaults).forEach(function (key) {
      if (target[key] === undefined) {
        target[key] = defaults[key];
      }
    });
  }

  applyDefaults(config, configDefaults);
  applyDefaults(config.logger, configDefaults.logger);

  var api = {};
  var httpEndpoint = config.httpEndpoint;


  for (var apiGroup in definitions) {
    for (var apiMethod in definitions[apiGroup]) {
      var methodName = camelCase(apiMethod);
      var url = httpEndpoint + '/' + version + '/' + apiGroup + '/' + apiMethod;
      api[methodName] = fetchMethod(methodName, url, definitions[apiGroup][apiMethod], config);
    }
  }

  var _loop = function _loop(helper) {
    // Insert `api` as the first parameter to all API helpers
    api[helper] = function () {
      var _helpers$api;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_helpers$api = helpers.api)[helper].apply(_helpers$api, [api].concat(args));
    };
  };

  for (var helper in helpers.api) {
    _loop(helper);
  }
  return api;
}

function fetchMethod(methodName, url, definition, config) {
  var logger = config.logger;


  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length === 0) {
      console.log(usage(methodName, definition));
      return;
    }

    var optionsFormatter = function optionsFormatter(option) {
      if (typeof option === 'boolean') {
        return { broadcast: option };
      }
    };

    var processedArgs = processArgs(args, Object.keys(definition.params || []), methodName, optionsFormatter);

    var params = processedArgs.params,
        options = processedArgs.options,
        returnPromise = processedArgs.returnPromise;
    var callback = processedArgs.callback;


    var body = JSON.stringify(params);
    if (logger.log) {
      logger.log('api >', 'post', '\t', url, body);
    }
    var fetchConfiguration = { body: body, method: 'POST' };
    Object.assign(fetchConfiguration, config.fetchConfiguration);

    fetch(url, fetchConfiguration).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.text().then(function (bodyResp) {
          var error = new Error(bodyResp);
          error.status = response.status;
          error.statusText = response.statusText;
          throw error;
        });
      }
    }).then(function (objectResp) {
      if (logger.log) {
        logger.log('api <', 'response', '\t', url, JSON.stringify(objectResp));
      }
      try {
        callback(null, objectResp);
      } catch (callbackError) {
        if (logger.error) {
          logger.error('api <', 'result callback', ':', callbackError);
        }
      }
    }).catch(function (error) {
      var message = '';
      try {
        // nodeos format (fail safe)
        message = JSON.parse(error.message).error.details[0];
      } catch (e2) {}

      if (logger.error) {
        logger.error('api <', 'error', '\t', message, url, body);
        logger.error(error);
      }

      try {
        callback(error);
      } catch (callbackError) {
        if (logger.error) {
          logger.error('api <', 'error callback', ':', callbackError);
        }
      }
    });

    return returnPromise;
  };
}

function usage(methodName, definition) {
  var usage = '';
  var out = function out(str) {
    usage += str + '\n';
  };

  out('USAGE');
  out(methodName + ' - ' + definition.brief);

  out('\nPARAMETERS');
  if (definition.params) {
    out(JSON.stringify(definition.params, null, 2));
  } else {
    out('none');
  }

  out('\nRETURNS');
  if (definition.results) {
    out('' + JSON.stringify(definition.results, null, 2));
  } else {
    out('no data');
  }

  out('\nERRORS');
  if (definition.errors) {
    for (var error in definition.errors) {
      var errorDesc = definition.errors[error];
      out('' + error + (errorDesc ? ' - ' + errorDesc : ''));
    }
  } else {
    out('nothing special');
  }

  return usage;
}

/***/ }),

/***/ "xG2L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("6ayh");

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = __webpack_require__("oNNP");

var predicates = {
  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
  'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
    if (ES.Type(Desc) !== 'Object') {
      return false;
    }
    var allowed = {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Get]]': true,
      '[[Set]]': true,
      '[[Value]]': true,
      '[[Writable]]': true
    };

    for (var key in Desc) { // eslint-disable-line
      if (has(Desc, key) && !allowed[key]) {
        return false;
      }
    }

    var isData = has(Desc, '[[Value]]');
    var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
    if (isData && IsAccessor) {
      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
    }
    return true;
  }
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
  var predicate = predicates[recordType];
  if (typeof predicate !== 'function') {
    throw new $SyntaxError('unknown record type: ' + recordType);
  }
  if (!predicate(ES, value)) {
    throw new $TypeError(argumentName + ' must be a ' + recordType);
  }
  console.log(predicate(ES, value), value);
};


/***/ }),

/***/ "xhJ2":
/***/ (function(module, exports) {

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ }),

/***/ "zEA4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__("9lTW");
var ecurve = __webpack_require__("eKop");
var BigInteger = __webpack_require__("7Vg5");
var secp256k1 = ecurve.getCurveByName('secp256k1');

var hash = __webpack_require__("3HdZ");
var keyUtils = __webpack_require__("nDWd");

var G = secp256k1.G;
var n = secp256k1.n;

module.exports = PublicKey;

/**
  @param {string|Buffer|PublicKey|ecurve.Point} public key
  @param {string} [pubkey_prefix = 'EOS']
*/
function PublicKey(Q) {
    var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';

    if (typeof Q === 'string') {
        var publicKey = PublicKey.fromString(Q, pubkey_prefix);
        assert(publicKey != null, 'Invalid public key');
        return publicKey;
    } else if (Buffer.isBuffer(Q)) {
        return PublicKey.fromBuffer(Q);
    } else if ((typeof Q === 'undefined' ? 'undefined' : _typeof(Q)) === 'object' && Q.Q) {
        return PublicKey(Q.Q);
    }

    assert.equal(typeof Q === 'undefined' ? 'undefined' : _typeof(Q), 'object', 'Invalid public key');
    assert.equal(_typeof(Q.compressed), 'boolean', 'Invalid public key');

    function toBuffer() {
        var compressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Q.compressed;

        return Q.getEncoded(compressed);
    }

    var pubdata = void 0; // cache

    // /**
    //     @todo secp224r1
    //     @return {string} PUB_K1_base58pubkey..
    // */
    // function toString() {
    //     if(pubdata) {
    //         return pubdata
    //     }
    //     pubdata = `PUB_K1_` + keyUtils.checkEncode(toBuffer(), 'K1')
    //     return pubdata;
    // }

    /** @todo rename to toStringLegacy
     * @arg {string} [pubkey_prefix = 'EOS'] - public key prefix
    */
    function toString() {
        var pubkey_prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EOS';

        return pubkey_prefix + keyUtils.checkEncode(toBuffer());
    }

    function toUncompressed() {
        var buf = Q.getEncoded(false);
        var point = ecurve.Point.decodeFrom(secp256k1, buf);
        return PublicKey.fromPoint(point);
    }

    /** @deprecated */
    function child(offset) {
        console.error('Deprecated warning: PublicKey.child');

        assert(Buffer.isBuffer(offset), "Buffer required: offset");
        assert.equal(offset.length, 32, "offset length");

        offset = Buffer.concat([toBuffer(), offset]);
        offset = hash.sha256(offset);

        var c = BigInteger.fromBuffer(offset);

        if (c.compareTo(n) >= 0) throw new Error("Child offset went out of bounds, try again");

        var cG = G.multiply(c);
        var Qprime = Q.add(cG);

        if (secp256k1.isInfinity(Qprime)) throw new Error("Child offset derived to an invalid key, try again");

        return PublicKey.fromPoint(Qprime);
    }

    function toHex() {
        return toBuffer().toString('hex');
    }

    return {
        Q: Q,
        toString: toString,
        // toStringLegacy,
        toUncompressed: toUncompressed,
        toBuffer: toBuffer,
        child: child,
        toHex: toHex
    };
}

/**
  @param {string|Buffer|PublicKey|ecurve.Point} pubkey - public key
  @param {string} [pubkey_prefix = 'EOS']
*/
PublicKey.isValid = function (pubkey) {
    var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';

    try {
        PublicKey(pubkey, pubkey_prefix);
        return true;
    } catch (e) {
        return false;
    }
};

PublicKey.fromBinary = function (bin) {
    return PublicKey.fromBuffer(new Buffer(bin, 'binary'));
};

PublicKey.fromBuffer = function (buffer) {
    return PublicKey(ecurve.Point.decodeFrom(secp256k1, buffer));
};

PublicKey.fromPoint = function (point) {
    return PublicKey(point);
};

/**
    @arg {string} public_key - like PUB_K1_base58pubkey..
    @arg {string} [pubkey_prefix = 'EOS'] - public key prefix
    @return PublicKey or `null` (invalid)
*/
PublicKey.fromString = function (public_key) {
    var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';

    try {
        return PublicKey.fromStringOrThrow(public_key, pubkey_prefix);
    } catch (e) {
        return null;
    }
};

/**
    @arg {string} public_key - like PUB_K1_base58pubkey..
    @arg {string} [pubkey_prefix = 'EOS'] - public key prefix

    @throws {Error} if public key is invalid

    @return PublicKey
*/
PublicKey.fromStringOrThrow = function (public_key) {
    var pubkey_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';

    assert.equal(typeof public_key === 'undefined' ? 'undefined' : _typeof(public_key), 'string', 'public_key');
    var match = public_key.match(/^PUB_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);
    if (match === null) {
        // legacy
        var prefix_match = new RegExp("^" + pubkey_prefix);
        if (prefix_match.test(public_key)) {
            public_key = public_key.substring(pubkey_prefix.length);
        }
        return PublicKey.fromBuffer(keyUtils.checkDecode(public_key));
    }
    assert(match.length === 3, 'Expecting public key like: PUB_K1_base58pubkey..');

    var _match = _slicedToArray(match, 3),
        keyType = _match[1],
        keyString = _match[2];

    assert.equal(keyType, 'K1', 'K1 private key expected');
    return PublicKey.fromBuffer(keyUtils.checkDecode(keyString, keyType));
};

PublicKey.fromHex = function (hex) {
    return PublicKey.fromBuffer(new Buffer(hex, 'hex'));
};

PublicKey.fromStringHex = function (hex) {
    return PublicKey.fromString(new Buffer(hex, 'hex'));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL2FwaV9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Vvc2pzLWVjYy9saWIvYWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Vvc2pzL2xpYi9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L0dldEludHJpbnNpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMvbGliL3NjaGVtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvZXM1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2lzTmFOLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1hcGkvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy10by1wcmltaXRpdmUvZXM1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1hcGkvbGliL2FwaS92MS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtYXBpL2xpYi9leHBvcnRlZC1oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy10by1wcmltaXRpdmUvaGVscGVycy9pc1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMvbGliL3dyaXRlLWFwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvaGVscGVycy9zaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy9saWIvYWJpLWNhY2hlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL3NpZ25hdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtZWNjL2xpYi9lY3NpZ25hdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMvbGliL3N0cnVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Vvc2pzLWVjYy9saWIvcHJvbWlzZS1hc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtZWNjL2xpYi9hcGlfY29tbW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL2tleV91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtZWNjL2xpYi9lY2RzYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtZWNjL2xpYi9lbmZvcmNlX3R5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lb3Nqcy1lY2MvbGliL2tleV9wcml2YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL21vZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9zanMtYXBpL2xpYi9wcm9jZXNzLWFyZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Vvc2pzLWFwaS9saWIvYXBpZ2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2Fzc2VydFJlY29yZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvaGVscGVycy9pc0Zpbml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMv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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVDQUF1QztBQUMzRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEUsZUFBZTtBQUN6RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0VBQStFLG1FQUFtRTtBQUNsSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFD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Q0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkRBQTZELG1FQUFtRTtBQUNoSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZEQUE2RCxtRUFBbUU7QUFDaEk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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a0IsbUJBQU8sQ0FBQyxNQUFlOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7OztBQzFOQSw4Q0FBYTs7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O0FBQ0E7O0FBRUE7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLHFDQUFxQztBQUMvQyxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTzs7QUFFakIsYUFBYSxNQUFNOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFIiwiZmlsZSI6InZlbmRvcn4zNTlmNTEzOC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yJyk7XG5cbnZhciBfcmVnZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVnZW5lcmF0b3IpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mJyk7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZWNjID0gcmVxdWlyZSgnZW9zanMtZWNjJyk7XG52YXIgRmNidWZmZXIgPSByZXF1aXJlKCdmY2J1ZmZlcicpO1xudmFyIEVvc0FwaSA9IHJlcXVpcmUoJ2Vvc2pzLWFwaScpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuXG52YXIgU3RydWN0cyA9IHJlcXVpcmUoJy4vc3RydWN0cycpO1xudmFyIEFiaUNhY2hlID0gcmVxdWlyZSgnLi9hYmktY2FjaGUnKTtcbnZhciB3cml0ZUFwaUdlbiA9IHJlcXVpcmUoJy4vd3JpdGUtYXBpJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnLi9mb3JtYXQnKTtcbnZhciBzY2hlbWEgPSByZXF1aXJlKCcuL3NjaGVtYScpO1xuXG52YXIgdG9rZW4gPSByZXF1aXJlKCcuL3NjaGVtYS9lb3Npby50b2tlbi5hYmkuanNvbicpO1xudmFyIHN5c3RlbSA9IHJlcXVpcmUoJy4vc2NoZW1hL2Vvc2lvLnN5c3RlbS5hYmkuanNvbicpO1xudmFyIGVvc2lvX251bGwgPSByZXF1aXJlKCcuL3NjaGVtYS9lb3Npby5udWxsLmFiaS5qc29uJyk7XG5cbnZhciBFb3MgPSBmdW5jdGlvbiBFb3MoKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBjb25maWdEZWZhdWx0cyA9IHtcbiAgICBodHRwRW5kcG9pbnQ6ICdodHRwOi8vMTI3LjAuMC4xOjg4ODgnLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICB2ZXJib3NlOiBmYWxzZSxcbiAgICBicm9hZGNhc3Q6IHRydWUsXG4gICAgbG9nZ2VyOiB7XG4gICAgICBsb2c6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgICAgdmFyIF9jb25zb2xlO1xuXG4gICAgICAgIHJldHVybiBjb25maWcudmVyYm9zZSA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICB2YXIgX2NvbnNvbGUyO1xuXG4gICAgICAgIHJldHVybiBjb25maWcudmVyYm9zZSA/IChfY29uc29sZTIgPSBjb25zb2xlKS5lcnJvci5hcHBseShfY29uc29sZTIsIGFyZ3VtZW50cykgOiBudWxsO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2lnbjogdHJ1ZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFwcGx5RGVmYXVsdHModGFyZ2V0LCBkZWZhdWx0cykge1xuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICh0YXJnZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gZGVmYXVsdHNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFwcGx5RGVmYXVsdHMoY29uZmlnLCBjb25maWdEZWZhdWx0cyk7XG4gIGFwcGx5RGVmYXVsdHMoY29uZmlnLmxvZ2dlciwgY29uZmlnRGVmYXVsdHMubG9nZ2VyKTtcbiAgcmV0dXJuIGNyZWF0ZUVvcyhjb25maWcpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFb3M7XG5cbk9iamVjdC5hc3NpZ24oRW9zLCB7XG4gIHZlcnNpb246ICcxNi4wLjAnLFxuICBtb2R1bGVzOiB7XG4gICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgYXBpOiBFb3NBcGksXG4gICAgZWNjOiBlY2MsXG4gICAganNvbjoge1xuICAgICAgYXBpOiBFb3NBcGkuYXBpLFxuICAgICAgc2NoZW1hOiBzY2hlbWFcbiAgICB9LFxuICAgIEZjYnVmZmVyOiBGY2J1ZmZlclxuICB9LFxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBUZXN0bmV0OiBmdW5jdGlvbiBUZXN0bmV0KGNvbmZpZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2RlcHJlY2F0ZWQsIGNoYW5nZSBFb3MuVGVzdG5ldCguLikgdG8ganVzdCBFb3MoLi4pJyk7XG4gICAgcmV0dXJuIEVvcyhjb25maWcpO1xuICB9LFxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBMb2NhbG5ldDogZnVuY3Rpb24gTG9jYWxuZXQoY29uZmlnKSB7XG4gICAgY29uc29sZS5lcnJvcignZGVwcmVjYXRlZCwgY2hhbmdlIEVvcy5Mb2NhbG5ldCguLikgdG8ganVzdCBFb3MoLi4pJyk7XG4gICAgcmV0dXJuIEVvcyhjb25maWcpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlRW9zKGNvbmZpZykge1xuICB2YXIgbmV0d29yayA9IGNvbmZpZy5odHRwRW5kcG9pbnQgIT0gbnVsbCA/IEVvc0FwaShjb25maWcpIDogbnVsbDtcbiAgY29uZmlnLm5ldHdvcmsgPSBuZXR3b3JrO1xuXG4gIHZhciBhYmlzID0gW107XG4gIHZhciBhYmlDYWNoZSA9IEFiaUNhY2hlKG5ldHdvcmssIGNvbmZpZyk7XG4gIGFiaXMucHVzaChhYmlDYWNoZS5hYmkoJ2Vvc2lvLm51bGwnLCBlb3Npb19udWxsKSk7XG4gIGFiaXMucHVzaChhYmlDYWNoZS5hYmkoJ2Vvc2lvLnRva2VuJywgdG9rZW4pKTtcbiAgYWJpcy5wdXNoKGFiaUNhY2hlLmFiaSgnZW9zaW8nLCBzeXN0ZW0pKTtcblxuICBpZiAoIWNvbmZpZy5jaGFpbklkKSB7XG4gICAgY29uZmlnLmNoYWluSWQgPSAnY2YwNTdiYmZiNzI2NDA0NzFmZDkxMGJjYjY3NjM5YzIyZGY5ZjkyNDcwOTM2Y2RkYzFhZGUwZTJmMmU3ZGM0Zic7XG4gIH1cblxuICBpZiAobmV0d29yaykge1xuICAgIGNoZWNrQ2hhaW5JZChuZXR3b3JrLCBjb25maWcuY2hhaW5JZCwgY29uZmlnLmxvZ2dlcik7XG4gIH1cblxuICBpZiAoY29uZmlnLm1vY2tUcmFuc2FjdGlvbnMgIT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm1vY2tUcmFuc2FjdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbW9jayA9IGNvbmZpZy5tb2NrVHJhbnNhY3Rpb25zO1xuICAgICAgY29uZmlnLm1vY2tUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtb2NrO1xuICAgICAgfTtcbiAgICB9XG4gICAgYXNzZXJ0LmVxdWFsKCgwLCBfdHlwZW9mMy5kZWZhdWx0KShjb25maWcubW9ja1RyYW5zYWN0aW9ucyksICdmdW5jdGlvbicsICdjb25maWcubW9ja1RyYW5zYWN0aW9ucycpO1xuICB9XG5cbiAgdmFyIF9TdHJ1Y3RzID0gU3RydWN0cyhjb25maWcpLFxuICAgICAgc3RydWN0cyA9IF9TdHJ1Y3RzLnN0cnVjdHMsXG4gICAgICB0eXBlcyA9IF9TdHJ1Y3RzLnR5cGVzLFxuICAgICAgZnJvbUJ1ZmZlciA9IF9TdHJ1Y3RzLmZyb21CdWZmZXIsXG4gICAgICB0b0J1ZmZlciA9IF9TdHJ1Y3RzLnRvQnVmZmVyO1xuXG4gIHZhciBlb3MgPSBtZXJnZVdyaXRlRnVuY3Rpb25zKGNvbmZpZywgRW9zQXBpLCBzdHJ1Y3RzLCBhYmlzKTtcblxuICBPYmplY3QuYXNzaWduKGVvcywge1xuICAgIGNvbmZpZzogc2FmZUNvbmZpZyhjb25maWcpLFxuICAgIGZjOiB7XG4gICAgICBzdHJ1Y3RzOiBzdHJ1Y3RzLFxuICAgICAgdHlwZXM6IHR5cGVzLFxuICAgICAgZnJvbUJ1ZmZlcjogZnJvbUJ1ZmZlcixcbiAgICAgIHRvQnVmZmVyOiB0b0J1ZmZlcixcbiAgICAgIGFiaUNhY2hlOiBhYmlDYWNoZVxuICAgIH0sXG4gICAgLy8gUmVwZWF0IG9mIHN0YXRpYyBFb3MubW9kdWxlcywgaGVscCBhcHBzIHRoYXQgdXNlIGRlcGVuZGVuY3kgaW5qZWN0aW9uXG4gICAgbW9kdWxlczoge1xuICAgICAgZm9ybWF0OiBmb3JtYXRcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghY29uZmlnLnNpZ25Qcm92aWRlcikge1xuICAgIGNvbmZpZy5zaWduUHJvdmlkZXIgPSBkZWZhdWx0U2lnblByb3ZpZGVyKGVvcywgY29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBlb3M7XG59XG5cbi8qKlxuICBTZXQgZWFjaCBwcm9wZXJ0eSBhcyByZWFkLW9ubHksIHJlYWQtd3JpdGUsIG5vLWFjY2Vzcy4gIFRoaXMgaXMgc2hhbGxvd1xuICBpbiB0aGF0IGl0IGFwcGxpZXMgb25seSB0byB0aGUgcm9vdCBvYmplY3QgYW5kIGRvZXMgbm90IGxpbWl0IGFjY2Vzc1xuICB0byBwcm9wZXJ0aWVzIHVuZGVyIGEgZ2l2ZW4gb2JqZWN0LlxuKi9cbmZ1bmN0aW9uIHNhZmVDb25maWcoY29uZmlnKSB7XG4gIC8vIGFjY2VzcyBjb250cm9sIGlzIHNoYWxsb3cgcmVmZXJlbmNlcyBvbmx5XG4gIHZhciByZWFkT25seSA9IG5ldyBTZXQoWydodHRwRW5kcG9pbnQnLCAnYWJpQ2FjaGUnLCAnY2hhaW5JZCcsICdleHBpcmVJblNlY29uZHMnXSk7XG4gIHZhciByZWFkV3JpdGUgPSBuZXcgU2V0KFsndmVyYm9zZScsICdkZWJ1ZycsICdicm9hZGNhc3QnLCAnbG9nZ2VyJywgJ3NpZ24nXSk7XG4gIHZhciBwcm90ZWN0ZWRDb25maWcgPSB7fTtcblxuICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90ZWN0ZWRDb25maWcsIGtleSwge1xuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgaWYgKHJlYWRXcml0ZS5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWNjZXNzIGRlbmllZCcpO1xuICAgICAgfSxcblxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIGlmIChyZWFkT25seS5oYXMoa2V5KSB8fCByZWFkV3JpdGUuaGFzKGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcHJvdGVjdGVkQ29uZmlnO1xufVxuXG4vKipcbiAgTWVyZ2UgaW4gd3JpdGUgZnVuY3Rpb25zIChvcGVyYXRpb25zKS4gIFRlc3RlZCBhZ2FpbnN0IGV4aXN0aW5nIG1ldGhvZHMgZm9yXG4gIG5hbWUgY29uZmxpY3RzLlxuXG4gIEBhcmcge29iamVjdH0gY29uZmlnLm5ldHdvcmsgLSByZWFkLW9ubHkgYXBpIGNhbGxzXG4gIEBhcmcge29iamVjdH0gRW9zQXBpIC0gYXBpW0Vvc0FwaV0gcmVhZC1vbmx5IGFwaSBjYWxsc1xuICBAcmV0dXJuIHtvYmplY3R9IC0gcmVhZCBhbmQgd3JpdGUgbWV0aG9kIGNhbGxzIChjcmVhdGUgYW5kIHNpZ24gdHJhbnNhY3Rpb25zKVxuICBAdGhyb3cge1R5cGVFcnJvcn0gaWYgYSBmdW5jaXRvbiBuYW1lIGNvbmZsaWN0c1xuKi9cbmZ1bmN0aW9uIG1lcmdlV3JpdGVGdW5jdGlvbnMoY29uZmlnLCBFb3NBcGksIHN0cnVjdHMsIGFiaXMpIHtcbiAgdmFyIG5ldHdvcmsgPSBjb25maWcubmV0d29yaztcblxuXG4gIHZhciBtZXJnZSA9IE9iamVjdC5hc3NpZ24oe30sIG5ldHdvcmspO1xuXG4gIHZhciB3cml0ZUFwaSA9IHdyaXRlQXBpR2VuKEVvc0FwaSwgbmV0d29yaywgc3RydWN0cywgY29uZmlnLCBhYmlzKTtcbiAgdGhyb3dPbkR1cGxpY2F0ZShtZXJnZSwgd3JpdGVBcGksICdDb25mbGljdGluZyBtZXRob2RzIGluIEVvc0FwaSBhbmQgVHJhbnNhY3Rpb24gQXBpJyk7XG4gIE9iamVjdC5hc3NpZ24obWVyZ2UsIHdyaXRlQXBpKTtcblxuICByZXR1cm4gbWVyZ2U7XG59XG5cbmZ1bmN0aW9uIHRocm93T25EdXBsaWNhdGUobzEsIG8yLCBtc2cpIHtcbiAgZm9yICh2YXIga2V5IGluIG8xKSB7XG4gICAgaWYgKG8yW2tleV0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IobXNnICsgJzogJyArIGtleSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICBUaGUgZGVmYXVsdCBzaWduIHByb3ZpZGVyIGlzIGRlc2lnbmVkIHRvIGludGVyYWN0IHdpdGggdGhlIGF2YWlsYWJsZSBwdWJsaWNcbiAga2V5cyAobWF5YmUganVzdCBvbmUpLCB0aGUgdHJhbnNhY3Rpb24sIGFuZCB0aGUgYmxvY2tjaGFpbiB0byBmaWd1cmUgb3V0XG4gIHRoZSBtaW5pbXVtIHNldCBvZiBzaWduaW5nIGtleXMuXG5cbiAgSWYgb25seSBvbmUga2V5IGlzIGF2YWlsYWJsZSwgdGhlIGJsb2NrY2hhaW4gQVBJIGNhbGxzIGFyZSBza2lwcGVkIGFuZCB0aGF0XG4gIGtleSBpcyB1c2VkIHRvIHNpZ24gdGhlIHRyYW5zYWN0aW9uLlxuKi9cbnZhciBkZWZhdWx0U2lnblByb3ZpZGVyID0gZnVuY3Rpb24gZGVmYXVsdFNpZ25Qcm92aWRlcihlb3MsIGNvbmZpZykge1xuICByZXR1cm4gZnVuY3Rpb24gX2NhbGxlZShfcmVmKSB7XG4gICAgdmFyIHNpZ24gPSBfcmVmLnNpZ24sXG4gICAgICAgIGJ1ZiA9IF9yZWYuYnVmLFxuICAgICAgICB0cmFuc2FjdGlvbiA9IF9yZWYudHJhbnNhY3Rpb24sXG4gICAgICAgIG9wdGlvbnNLZXlQcm92aWRlciA9IF9yZWYub3B0aW9uc0tleVByb3ZpZGVyO1xuXG4gICAgdmFyIGtleVByb3ZpZGVyLCBrZXlzLCBwdnQsIHNpZ3MsIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24sIF9kaWRJdGVyYXRvckVycm9yLCBfaXRlcmF0b3JFcnJvciwgX2l0ZXJhdG9yLCBfc3RlcCwga2V5LCBrZXlNYXAsIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yLCBfZGlkSXRlcmF0b3JFcnJvcjIsIF9pdGVyYXRvckVycm9yMiwgX2l0ZXJhdG9yMiwgX3N0ZXAyLCBfa2V5LCBpc1ByaXZhdGUsIGlzUHVibGljLCBwdWJrZXlzO1xuXG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC5hc3luYyhmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIG9wdGlvbnNLZXlQcm92aWRlciBpcyBhIHBlci1hY3Rpb24ga2V5OiBhd2FpdCBlb3Muc29tZUFjdGlvbigndXNlcjInIC4uLCB7a2V5UHJvdmlkZXI6IHByaXZhdGVLZXkyfSlcbiAgICAgICAgICAgIGtleVByb3ZpZGVyID0gb3B0aW9uc0tleVByb3ZpZGVyID8gb3B0aW9uc0tleVByb3ZpZGVyIDogY29uZmlnLmtleVByb3ZpZGVyO1xuXG4gICAgICAgICAgICBpZiAoa2V5UHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIHRyYW5zYWN0aW9uIHJlcXVpcmVzIGEga2V5UHJvdmlkZXIgZm9yIHNpZ25pbmcnKTtcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGtleXMgPSBrZXlQcm92aWRlcjtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlQcm92aWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBrZXlzID0ga2V5UHJvdmlkZXIoeyB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb24gfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGtleVByb3ZpZGVyIG1heSByZXR1cm4ga2V5cyBvciBQcm9taXNlPGtleXM+XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNztcbiAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3IyLmRlZmF1bHQuYXdyYXAoUHJvbWlzZS5yZXNvbHZlKGtleXMpKTtcblxuICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGtleXMgPSBfY29udGV4dC5zZW50O1xuXG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShrZXlzKSkge1xuICAgICAgICAgICAgICBrZXlzID0gW2tleXNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBmb3JtYXQgKFdJRiA9PiBQVlRfSzFfYmFzZTU4cHJpdmF0ZUtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4geyBwcml2YXRlOiBlY2MuUHJpdmF0ZUtleShrZXkpLnRvU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBmb3JtYXQgKEVPU0tleSA9PiBQVUJfSzFfYmFzZTU4cHVibGljS2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHB1YmxpYzogZWNjLlB1YmxpY0tleShrZXkpLnRvU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhc3NlcnQoZmFsc2UsICdleHBlY3RpbmcgcHVibGljIG9yIHByaXZhdGUga2V5cyBmcm9tIGtleVByb3ZpZGVyJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBrZXksIGNoZWNrIHlvdXIga2V5UHJvdmlkZXInKTtcblxuICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICBpZiAoIShrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdLnByaXZhdGUpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB2dCA9IGtleXNbMF0ucHJpdmF0ZTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIHNpZ24oYnVmLCBwdnQpKTtcblxuICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICBpZiAoIShjb25maWcuaHR0cEVuZHBvaW50ID09IG51bGwpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzNztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNpZ3MgPSBbXTtcbiAgICAgICAgICAgIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDIwO1xuXG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvciA9IGtleXNbU3ltYm9sLml0ZXJhdG9yXSgpOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAga2V5ID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgc2lncy5wdXNoKHNpZ24oYnVmLCBrZXkucHJpdmF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI4O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDI0OlxuICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDI0O1xuICAgICAgICAgICAgX2NvbnRleHQudDAgPSBfY29udGV4dFsnY2F0Y2gnXSgyMCk7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IF9jb250ZXh0LnQwO1xuXG4gICAgICAgICAgY2FzZSAyODpcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAyODtcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAyOTtcblxuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSAzMTpcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAzMTtcblxuICAgICAgICAgICAgaWYgKCFfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMzQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDMxKTtcblxuICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDI4KTtcblxuICAgICAgICAgIGNhc2UgMzY6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBzaWdzKTtcblxuICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBrZXlNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgIC8vIGtleXMgYXJlIGVpdGhlciBwdWJsaWMgb3IgcHJpdmF0ZSBrZXlzXG5cbiAgICAgICAgICAgIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDQxO1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3IyID0ga2V5c1tTeW1ib2wuaXRlcmF0b3JdKCk7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgX2tleSA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgICAgaXNQcml2YXRlID0gX2tleS5wcml2YXRlICE9IG51bGw7XG4gICAgICAgICAgICAgIGlzUHVibGljID0gX2tleS5wdWJsaWMgIT0gbnVsbDtcblxuXG4gICAgICAgICAgICAgIGlmIChpc1ByaXZhdGUpIHtcbiAgICAgICAgICAgICAgICBrZXlNYXAuc2V0KGVjYy5wcml2YXRlVG9QdWJsaWMoX2tleS5wcml2YXRlKSwgX2tleS5wcml2YXRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXlNYXAuc2V0KF9rZXkucHVibGljLCBudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gNDU7XG4gICAgICAgICAgICBfY29udGV4dC50MSA9IF9jb250ZXh0WydjYXRjaCddKDQxKTtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBfY29udGV4dC50MTtcblxuICAgICAgICAgIGNhc2UgNDk6XG4gICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gNDk7XG4gICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gNTA7XG5cbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgNTI6XG4gICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gNTI7XG5cbiAgICAgICAgICAgIGlmICghX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1NTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcblxuICAgICAgICAgIGNhc2UgNTU6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDUyKTtcblxuICAgICAgICAgIGNhc2UgNTY6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDQ5KTtcblxuICAgICAgICAgIGNhc2UgNTc6XG4gICAgICAgICAgICBwdWJrZXlzID0gQXJyYXkuZnJvbShrZXlNYXAua2V5cygpKTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIGVvcy5nZXRSZXF1aXJlZEtleXModHJhbnNhY3Rpb24sIHB1YmtleXMpLnRoZW4oZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciByZXF1aXJlZF9rZXlzID0gX3JlZjIucmVxdWlyZWRfa2V5cztcblxuICAgICAgICAgICAgICBpZiAoIXJlcXVpcmVkX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIGtleXMgZm9yICcgKyBKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIHB2dHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgIG1pc3NpbmdLZXlzID0gW107XG5cbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IHJlcXVpcmVkX2tleXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZEtleSA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgLy8gbm9ybWFsaXplIChFT1NLZXkuLiA9PiBQVUJfSzFfS2V5Li4pXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZEtleSA9IGVjYy5QdWJsaWNLZXkocmVxdWlyZWRLZXkpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciB3aWYgPSBrZXlNYXAuZ2V0KHJlcXVpcmVkS2V5KTtcbiAgICAgICAgICAgICAgICAgIGlmICh3aWYpIHtcbiAgICAgICAgICAgICAgICAgICAgcHZ0cy5wdXNoKHdpZik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtaXNzaW5nS2V5cy5wdXNoKHJlcXVpcmVkS2V5KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjMucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChtaXNzaW5nS2V5cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQodHlwZW9mIGtleVByb3ZpZGVyID09PSAnZnVuY3Rpb24nLCAna2V5UHJvdmlkZXIgZnVuY3Rpb24gaXMgbmVlZGVkIGZvciBwcml2YXRlIGtleSBsb29rdXAnKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHB1YmtleXMgPSBtaXNzaW5nS2V5cy5tYXAoa2V5ID0+IGVjYy5QdWJsaWNLZXkoa2V5KS50b1N0cmluZ0xlZ2FjeSgpKVxuICAgICAgICAgICAgICAgIGtleVByb3ZpZGVyKHsgcHVia2V5czogbWlzc2luZ0tleXMgfSkuZm9yRWFjaChmdW5jdGlvbiAocHZ0KSB7XG4gICAgICAgICAgICAgICAgICBwdnRzLnB1c2gocHZ0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBzaWdzID0gW107XG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBwdnRzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3B2dCA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgc2lncy5wdXNoKHNpZ24oYnVmLCBfcHZ0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0LnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gc2lncztcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBudWxsLCB0aGlzLCBbWzIwLCAyNCwgMjgsIDM2XSwgWzI5LCwgMzEsIDM1XSwgWzQxLCA0NSwgNDksIDU3XSwgWzUwLCwgNTIsIDU2XV0pO1xuICB9O1xufTtcblxuZnVuY3Rpb24gY2hlY2tDaGFpbklkKG5ldHdvcmssIGNoYWluSWQsIGxvZ2dlcikge1xuICBuZXR3b3JrLmdldEluZm8oe30pLnRoZW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICBpZiAoaW5mby5jaGFpbl9pZCAhPT0gY2hhaW5JZCkge1xuICAgICAgaWYgKGxvZ2dlci5sb2cpIHtcbiAgICAgICAgbG9nZ2VyLmxvZygnY2hhaW5JZCBtaXNtYXRjaCwgc2lnbmF0dXJlcyB3aWxsIG5vdCBtYXRjaCB0cmFuc2FjdGlvbiBhdXRob3JpdHkuICcgKyAoJ2V4cGVjdGVkICcgKyBjaGFpbklkICsgJyAhPT0gYWN0dWFsICcgKyBpbmZvLmNoYWluX2lkKSk7XG4gICAgICB9XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBpZiAobG9nZ2VyLmVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ1dhcm5pbmcsIHVuYWJsZSB0byB2YWxpZGF0ZSBjaGFpbklkOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9KTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEFlcyA9IHJlcXVpcmUoXCIuL2Flc1wiKTtcbnZhciBQcml2YXRlS2V5ID0gcmVxdWlyZShcIi4va2V5X3ByaXZhdGVcIik7XG52YXIgUHVibGljS2V5ID0gcmVxdWlyZShcIi4va2V5X3B1YmxpY1wiKTtcbnZhciBTaWduYXR1cmUgPSByZXF1aXJlKFwiLi9zaWduYXR1cmVcIik7XG52YXIga2V5X3V0aWxzID0gcmVxdWlyZShcIi4va2V5X3V0aWxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBBZXM6IEFlcywgUHJpdmF0ZUtleTogUHJpdmF0ZUtleSwgUHVibGljS2V5OiBQdWJsaWNLZXksXG4gICAgU2lnbmF0dXJlOiBTaWduYXR1cmUsIGtleV91dGlsczoga2V5X3V0aWxzXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUJ5dGVzID0gcmVxdWlyZSgncmFuZG9tYnl0ZXMnKTtcbnZhciBCeXRlQnVmZmVyID0gcmVxdWlyZSgnYnl0ZWJ1ZmZlcicpO1xudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2Jyb3dzZXJpZnktYWVzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgUHVibGljS2V5ID0gcmVxdWlyZSgnLi9rZXlfcHVibGljJyk7XG52YXIgUHJpdmF0ZUtleSA9IHJlcXVpcmUoJy4va2V5X3ByaXZhdGUnKTtcbnZhciBoYXNoID0gcmVxdWlyZSgnLi9oYXNoJyk7XG5cbnZhciBMb25nID0gQnl0ZUJ1ZmZlci5Mb25nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbmNyeXB0OiBlbmNyeXB0LFxuICAgIGRlY3J5cHQ6IGRlY3J5cHRcblxuICAgIC8qKlxuICAgICAgICBTcGVjOiBodHRwOi8vbG9jYWxob3N0OjMwMDIvc3RlZW0vQGRhbnRoZW1hbi9ob3ctdG8tZW5jcnlwdC1hLW1lbW8td2hlbi10cmFuc2ZlcnJpbmctc3RlZW1cbiAgICBcbiAgICAgICAgQHRocm93cyB7RXJyb3J8VHlwZUVycm9yfSAtIFwiSW52YWxpZCBLZXksIC4uLlwiXG4gICAgXG4gICAgICAgIEBhcmcge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5IC0gcmVxdWlyZWQgYW5kIHVzZWQgZm9yIGRlY3J5cHRpb25cbiAgICAgICAgQGFyZyB7UHVibGljS2V5fSBwdWJsaWNfa2V5IC0gcmVxdWlyZWQgYW5kIHVzZWQgdG8gY2FsY3VhbHRlIHRoZSBzaGFyZWQgc2VjcmV0XG4gICAgICAgIEBhcmcge3N0cmluZ30gW25vbmNlID0gdW5pcXVlTm9uY2UoKV0gLSBhc3NpZ25lZCBhIHJhbmRvbSB1bmlxdWUgdWludDY0XG4gICAgXG4gICAgICAgIEByZXR1cm4ge29iamVjdH1cbiAgICAgICAgQHByb3BlcnR5IHtzdHJpbmd9IG5vbmNlIC0gcmFuZG9tIG9yIHVuaXF1ZSB1aW50NjQsIHByb3ZpZGVzIGVudHJvcHkgd2hlbiByZS11c2luZyB0aGUgc2FtZSBwcml2YXRlL3B1YmxpYyBrZXlzLlxuICAgICAgICBAcHJvcGVydHkge0J1ZmZlcn0gbWVzc2FnZSAtIFBsYWluIHRleHQgbWVzc2FnZVxuICAgICAgICBAcHJvcGVydHkge251bWJlcn0gY2hlY2tzdW0gLSBzaGFyZWQgc2VjcmV0IGNoZWNrc3VtXG4gICAgKi9cbn07ZnVuY3Rpb24gZW5jcnlwdChwcml2YXRlX2tleSwgcHVibGljX2tleSwgbWVzc2FnZSkge1xuICAgIHZhciBub25jZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogdW5pcXVlTm9uY2UoKTtcblxuICAgIHJldHVybiBjcnlwdChwcml2YXRlX2tleSwgcHVibGljX2tleSwgbm9uY2UsIG1lc3NhZ2UpO1xufVxuXG4vKipcbiAgICBTcGVjOiBodHRwOi8vbG9jYWxob3N0OjMwMDIvc3RlZW0vQGRhbnRoZW1hbi9ob3ctdG8tZW5jcnlwdC1hLW1lbW8td2hlbi10cmFuc2ZlcnJpbmctc3RlZW1cblxuICAgIEBhcmcge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5IC0gcmVxdWlyZWQgYW5kIHVzZWQgZm9yIGRlY3J5cHRpb25cbiAgICBAYXJnIHtQdWJsaWNLZXl9IHB1YmxpY19rZXkgLSByZXF1aXJlZCBhbmQgdXNlZCB0byBjYWxjdWFsdGUgdGhlIHNoYXJlZCBzZWNyZXRcbiAgICBAYXJnIHtzdHJpbmd9IG5vbmNlIC0gcmFuZG9tIG9yIHVuaXF1ZSB1aW50NjQsIHByb3ZpZGVzIGVudHJvcHkgd2hlbiByZS11c2luZyB0aGUgc2FtZSBwcml2YXRlL3B1YmxpYyBrZXlzLlxuICAgIEBhcmcge0J1ZmZlcn0gbWVzc2FnZSAtIEVuY3J5cHRlZCBvciBwbGFpbiB0ZXh0IG1lc3NhZ2VcbiAgICBAYXJnIHtudW1iZXJ9IGNoZWNrc3VtIC0gc2hhcmVkIHNlY3JldCBjaGVja3N1bVxuXG4gICAgQHRocm93cyB7RXJyb3J8VHlwZUVycm9yfSAtIFwiSW52YWxpZCBLZXksIC4uLlwiXG5cbiAgICBAcmV0dXJuIHtCdWZmZXJ9IC0gbWVzc2FnZVxuKi9cbmZ1bmN0aW9uIGRlY3J5cHQocHJpdmF0ZV9rZXksIHB1YmxpY19rZXksIG5vbmNlLCBtZXNzYWdlLCBjaGVja3N1bSkge1xuICAgIHJldHVybiBjcnlwdChwcml2YXRlX2tleSwgcHVibGljX2tleSwgbm9uY2UsIG1lc3NhZ2UsIGNoZWNrc3VtKS5tZXNzYWdlO1xufVxuXG4vKipcbiAgICBAYXJnIHtCdWZmZXJ9IG1lc3NhZ2UgLSBFbmNyeXB0ZWQgb3IgcGxhaW4gdGV4dCBtZXNzYWdlIChzZWUgY2hlY2tzdW0pXG4gICAgQGFyZyB7bnVtYmVyfSBjaGVja3N1bSAtIHNoYXJlZCBzZWNyZXQgY2hlY2tzdW0gKG51bGwgdG8gZW5jcnlwdCwgbm9uLW51bGwgdG8gZGVjcnlwdClcbiAgICBAcHJpdmF0ZVxuKi9cbmZ1bmN0aW9uIGNyeXB0KHByaXZhdGVfa2V5LCBwdWJsaWNfa2V5LCBub25jZSwgbWVzc2FnZSwgY2hlY2tzdW0pIHtcbiAgICBwcml2YXRlX2tleSA9IFByaXZhdGVLZXkocHJpdmF0ZV9rZXkpO1xuICAgIGlmICghcHJpdmF0ZV9rZXkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByaXZhdGVfa2V5IGlzIHJlcXVpcmVkJyk7XG5cbiAgICBwdWJsaWNfa2V5ID0gUHVibGljS2V5KHB1YmxpY19rZXkpO1xuICAgIGlmICghcHVibGljX2tleSkgdGhyb3cgbmV3IFR5cGVFcnJvcigncHVibGljX2tleSBpcyByZXF1aXJlZCcpO1xuXG4gICAgbm9uY2UgPSB0b0xvbmdPYmoobm9uY2UpO1xuICAgIGlmICghbm9uY2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vbmNlIGlzIHJlcXVpcmVkJyk7XG5cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihtZXNzYWdlKSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtZXNzYWdlIHNob3VsZCBiZSBidWZmZXIgb3Igc3RyaW5nJyk7XG4gICAgICAgIG1lc3NhZ2UgPSBuZXcgQnVmZmVyKG1lc3NhZ2UsICdiaW5hcnknKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrc3VtICYmIHR5cGVvZiBjaGVja3N1bSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NoZWNrc3VtIHNob3VsZCBiZSBhIG51bWJlcicpO1xuXG4gICAgdmFyIFMgPSBwcml2YXRlX2tleS5nZXRTaGFyZWRTZWNyZXQocHVibGljX2tleSk7XG4gICAgdmFyIGVidWYgPSBuZXcgQnl0ZUJ1ZmZlcihCeXRlQnVmZmVyLkRFRkFVTFRfQ0FQQUNJVFksIEJ5dGVCdWZmZXIuTElUVExFX0VORElBTik7XG4gICAgZWJ1Zi53cml0ZVVpbnQ2NChub25jZSk7XG4gICAgZWJ1Zi5hcHBlbmQoUy50b1N0cmluZygnYmluYXJ5JyksICdiaW5hcnknKTtcbiAgICBlYnVmID0gbmV3IEJ1ZmZlcihlYnVmLmNvcHkoMCwgZWJ1Zi5vZmZzZXQpLnRvQmluYXJ5KCksICdiaW5hcnknKTtcbiAgICB2YXIgZW5jcnlwdGlvbl9rZXkgPSBoYXNoLnNoYTUxMihlYnVmKTtcblxuICAgIC8vIEQgRSBCIFUgR1xuICAgIC8vIGNvbnNvbGUubG9nKCdjcnlwdCcsIHtcbiAgICAvLyAgICAgcHJpdl90b19wdWI6IHByaXZhdGVfa2V5LnRvUHVibGljKCkudG9TdHJpbmcoKSxcbiAgICAvLyAgICAgcHViOiBwdWJsaWNfa2V5LnRvU3RyaW5nKCksXG4gICAgLy8gICAgIG5vbmNlOiBub25jZS50b1N0cmluZygpLFxuICAgIC8vICAgICBtZXNzYWdlOiBtZXNzYWdlLmxlbmd0aCxcbiAgICAvLyAgICAgY2hlY2tzdW0sXG4gICAgLy8gICAgIFM6IFMudG9TdHJpbmcoJ2hleCcpLFxuICAgIC8vICAgICBlbmNyeXB0aW9uX2tleTogZW5jcnlwdGlvbl9rZXkudG9TdHJpbmcoJ2hleCcpLFxuICAgIC8vIH0pXG5cbiAgICB2YXIgaXYgPSBlbmNyeXB0aW9uX2tleS5zbGljZSgzMiwgNDgpO1xuICAgIHZhciBrZXkgPSBlbmNyeXB0aW9uX2tleS5zbGljZSgwLCAzMik7XG5cbiAgICAvLyBjaGVjayBpcyBmaXJzdCA2NCBiaXQgb2Ygc2hhMjU2IGhhc2ggdHJlYXRlZCBhcyB1aW50NjRfdCB0cnVuY2F0ZWQgdG8gMzIgYml0cy5cbiAgICB2YXIgY2hlY2sgPSBoYXNoLnNoYTI1NihlbmNyeXB0aW9uX2tleSk7XG4gICAgY2hlY2sgPSBjaGVjay5zbGljZSgwLCA0KTtcbiAgICB2YXIgY2J1ZiA9IEJ5dGVCdWZmZXIuZnJvbUJpbmFyeShjaGVjay50b1N0cmluZygnYmluYXJ5JyksIEJ5dGVCdWZmZXIuREVGQVVMVF9DQVBBQ0lUWSwgQnl0ZUJ1ZmZlci5MSVRUTEVfRU5ESUFOKTtcbiAgICBjaGVjayA9IGNidWYucmVhZFVpbnQzMigpO1xuXG4gICAgaWYgKGNoZWNrc3VtKSB7XG4gICAgICAgIGlmIChjaGVjayAhPT0gY2hlY2tzdW0pIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBrZXknKTtcbiAgICAgICAgbWVzc2FnZSA9IGNyeXB0b0pzRGVjcnlwdChtZXNzYWdlLCBrZXksIGl2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gY3J5cHRvSnNFbmNyeXB0KG1lc3NhZ2UsIGtleSwgaXYpO1xuICAgIH1cbiAgICByZXR1cm4geyBub25jZTogbm9uY2UsIG1lc3NhZ2U6IG1lc3NhZ2UsIGNoZWNrc3VtOiBjaGVjayB9O1xufVxuXG4vKiogVGhpcyBtZXRob2QgZG9lcyBub3QgdXNlIGEgY2hlY2tzdW0sIHRoZSByZXR1cm5lZCBkYXRhIG11c3QgYmUgdmFsaWRhdGVkIHNvbWUgb3RoZXIgd2F5LlxuXG4gICAgQGFyZyB7c3RyaW5nfEJ1ZmZlcn0gbWVzc2FnZSAtIGNpcGhlcnRleHQgYmluYXJ5IGZvcm1hdFxuICAgIEBhcmcge3N0cmluZzx1dGY4PnxCdWZmZXJ9IGtleSAtIDI1NmJpdFxuICAgIEBhcmcge3N0cmluZzx1dGY4PnxCdWZmZXJ9IGl2IC0gMTI4Yml0XG5cbiAgICBAcmV0dXJuIHtCdWZmZXJ9XG4qL1xuZnVuY3Rpb24gY3J5cHRvSnNEZWNyeXB0KG1lc3NhZ2UsIGtleSwgaXYpIHtcbiAgICBhc3NlcnQobWVzc2FnZSwgXCJNaXNzaW5nIGNpcGhlciB0ZXh0XCIpO1xuICAgIG1lc3NhZ2UgPSB0b0JpbmFyeUJ1ZmZlcihtZXNzYWdlKTtcbiAgICB2YXIgZGVjaXBoZXIgPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXJpdignYWVzLTI1Ni1jYmMnLCBrZXksIGl2KTtcbiAgICAvLyBkZWNpcGhlci5zZXRBdXRvUGFkZGluZyh0cnVlKVxuICAgIG1lc3NhZ2UgPSBCdWZmZXIuY29uY2F0KFtkZWNpcGhlci51cGRhdGUobWVzc2FnZSksIGRlY2lwaGVyLmZpbmFsKCldKTtcbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLyoqIFRoaXMgbWV0aG9kIGRvZXMgbm90IHVzZSBhIGNoZWNrc3VtLCB0aGUgcmV0dXJuZWQgZGF0YSBtdXN0IGJlIHZhbGlkYXRlZCBzb21lIG90aGVyIHdheS5cbiAgICBAYXJnIHtzdHJpbmd8QnVmZmVyfSBtZXNzYWdlIC0gcGxhaW50ZXh0IGJpbmFyeSBmb3JtYXRcbiAgICBAYXJnIHtzdHJpbmc8dXRmOD58QnVmZmVyfSBrZXkgLSAyNTZiaXRcbiAgICBAYXJnIHtzdHJpbmc8dXRmOD58QnVmZmVyfSBpdiAtIDEyOGJpdFxuXG4gICAgQHJldHVybiB7QnVmZmVyfVxuKi9cbmZ1bmN0aW9uIGNyeXB0b0pzRW5jcnlwdChtZXNzYWdlLCBrZXksIGl2KSB7XG4gICAgYXNzZXJ0KG1lc3NhZ2UsIFwiTWlzc2luZyBwbGFpbiB0ZXh0XCIpO1xuICAgIG1lc3NhZ2UgPSB0b0JpbmFyeUJ1ZmZlcihtZXNzYWdlKTtcbiAgICB2YXIgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KCdhZXMtMjU2LWNiYycsIGtleSwgaXYpO1xuICAgIC8vIGNpcGhlci5zZXRBdXRvUGFkZGluZyh0cnVlKVxuICAgIG1lc3NhZ2UgPSBCdWZmZXIuY29uY2F0KFtjaXBoZXIudXBkYXRlKG1lc3NhZ2UpLCBjaXBoZXIuZmluYWwoKV0pO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuXG4vKiogQHJldHVybiB7c3RyaW5nfSB1bmlxdWUgNjQgYml0IHVuc2lnbmVkIG51bWJlciBzdHJpbmcuICBCZWluZyB0aW1lIGJhc2VkLCB0aGlzIGlzIGNhcmVmdWwgdG8gbmV2ZXIgY2hvb3NlIHRoZSBzYW1lIG5vbmNlIHR3aWNlLiAgVGhpcyB2YWx1ZSBjb3VsZCBiZSByZWNvcmRlZCBpbiB0aGUgYmxvY2tjaGFpbiBmb3IgYSBsb25nIHRpbWUuXG4qL1xuZnVuY3Rpb24gdW5pcXVlTm9uY2UoKSB7XG4gICAgaWYgKHVuaXF1ZV9ub25jZV9lbnRyb3B5ID09PSBudWxsKSB7XG4gICAgICAgIHZhciBiID0gbmV3IFVpbnQ4QXJyYXkocmFuZG9tQnl0ZXMoMikpO1xuICAgICAgICB1bmlxdWVfbm9uY2VfZW50cm9weSA9IHBhcnNlSW50KGJbMF0gPDwgOCB8IGJbMV0sIDEwKTtcbiAgICB9XG4gICAgdmFyIGxvbmcgPSBMb25nLmZyb21OdW1iZXIoRGF0ZS5ub3coKSk7XG4gICAgdmFyIGVudHJvcHkgPSArK3VuaXF1ZV9ub25jZV9lbnRyb3B5ICUgMHhGRkZGO1xuICAgIC8vIGNvbnNvbGUubG9nKCd1bmlxdWVOb25jZSBkYXRlXFx0JywgQnl0ZUJ1ZmZlci5hbGxvY2F0ZSg4KS53cml0ZVVpbnQ2NChsb25nKS50b0hleCgwKSlcbiAgICAvLyBjb25zb2xlLmxvZygndW5pcXVlTm9uY2UgZW50cm9weVxcdCcsIEJ5dGVCdWZmZXIuYWxsb2NhdGUoOCkud3JpdGVVaW50NjQoTG9uZy5mcm9tTnVtYmVyKGVudHJvcHkpKS50b0hleCgwKSlcbiAgICBsb25nID0gbG9uZy5zaGlmdExlZnQoMTYpLm9yKExvbmcuZnJvbU51bWJlcihlbnRyb3B5KSk7XG4gICAgLy8gY29uc29sZS5sb2coJ3VuaXF1ZU5vbmNlIGZpbmFsXFx0JywgQnl0ZUJ1ZmZlci5hbGxvY2F0ZSg4KS53cml0ZVVpbnQ2NChsb25nKS50b0hleCgwKSlcbiAgICByZXR1cm4gbG9uZy50b1N0cmluZygpO1xufVxudmFyIHVuaXF1ZV9ub25jZV9lbnRyb3B5ID0gbnVsbDtcbi8vIGZvcihsZXQgaT0xOyBpIDwgMTA7IGkrKykga2V5LnVuaXF1ZU5vbmNlKClcblxudmFyIHRvTG9uZ09iaiA9IGZ1bmN0aW9uIHRvTG9uZ09iaihvKSB7XG4gICAgcmV0dXJuIG8gPyBMb25nLmlzTG9uZyhvKSA/IG8gOiBMb25nLmZyb21TdHJpbmcobykgOiBvO1xufTtcbnZhciB0b0JpbmFyeUJ1ZmZlciA9IGZ1bmN0aW9uIHRvQmluYXJ5QnVmZmVyKG8pIHtcbiAgICByZXR1cm4gbyA/IEJ1ZmZlci5pc0J1ZmZlcihvKSA/IG8gOiBuZXcgQnVmZmVyKG8sICdiaW5hcnknKSA6IG87XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUhhc2ggPSByZXF1aXJlKCdjcmVhdGUtaGFzaCcpO1xudmFyIGNyZWF0ZUhtYWMgPSByZXF1aXJlKCdjcmVhdGUtaG1hYycpO1xuXG4vKiogQG5hbWVzcGFjZSBoYXNoICovXG5cbi8qKiBAYXJnIHtzdHJpbmd8QnVmZmVyfSBkYXRhXG4gICAgQGFyZyB7c3RyaW5nfSBbcmVzdWx0RW5jb2RpbmcgPSBudWxsXSAtICdoZXgnLCAnYmluYXJ5JyBvciAnYmFzZTY0J1xuICAgIEByZXR1cm4ge3N0cmluZ3xCdWZmZXJ9IC0gQnVmZmVyIHdoZW4gcmVzdWx0RW5jb2RpbmcgaXMgbnVsbCwgb3Igc3RyaW5nXG4qL1xuZnVuY3Rpb24gc2hhMShkYXRhLCByZXN1bHRFbmNvZGluZykge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGExJykudXBkYXRlKGRhdGEpLmRpZ2VzdChyZXN1bHRFbmNvZGluZyk7XG59XG5cbi8qKiBAYXJnIHtzdHJpbmd8QnVmZmVyfSBkYXRhXG4gICAgQGFyZyB7c3RyaW5nfSBbcmVzdWx0RW5jb2RpbmcgPSBudWxsXSAtICdoZXgnLCAnYmluYXJ5JyBvciAnYmFzZTY0J1xuICAgIEByZXR1cm4ge3N0cmluZ3xCdWZmZXJ9IC0gQnVmZmVyIHdoZW4gcmVzdWx0RW5jb2RpbmcgaXMgbnVsbCwgb3Igc3RyaW5nXG4qL1xuZnVuY3Rpb24gc2hhMjU2KGRhdGEsIHJlc3VsdEVuY29kaW5nKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShkYXRhKS5kaWdlc3QocmVzdWx0RW5jb2RpbmcpO1xufVxuXG4vKiogQGFyZyB7c3RyaW5nfEJ1ZmZlcn0gZGF0YVxuICAgIEBhcmcge3N0cmluZ30gW3Jlc3VsdEVuY29kaW5nID0gbnVsbF0gLSAnaGV4JywgJ2JpbmFyeScgb3IgJ2Jhc2U2NCdcbiAgICBAcmV0dXJuIHtzdHJpbmd8QnVmZmVyfSAtIEJ1ZmZlciB3aGVuIHJlc3VsdEVuY29kaW5nIGlzIG51bGwsIG9yIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIHNoYTUxMihkYXRhLCByZXN1bHRFbmNvZGluZykge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGE1MTInKS51cGRhdGUoZGF0YSkuZGlnZXN0KHJlc3VsdEVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gSG1hY1NIQTI1NihidWZmZXIsIHNlY3JldCkge1xuICAgIHJldHVybiBjcmVhdGVIbWFjKCdzaGEyNTYnLCBzZWNyZXQpLnVwZGF0ZShidWZmZXIpLmRpZ2VzdCgpO1xufVxuXG5mdW5jdGlvbiByaXBlbWQxNjAoZGF0YSkge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKCdybWQxNjAnKS51cGRhdGUoZGF0YSkuZGlnZXN0KCk7XG59XG5cbi8vIGZ1bmN0aW9uIGhhc2gxNjAoYnVmZmVyKSB7XG4vLyAgIHJldHVybiByaXBlbWQxNjAoc2hhMjU2KGJ1ZmZlcikpXG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gaGFzaDI1NihidWZmZXIpIHtcbi8vICAgcmV0dXJuIHNoYTI1NihzaGEyNTYoYnVmZmVyKSlcbi8vIH1cblxuLy9cbi8vIGZ1bmN0aW9uIEhtYWNTSEE1MTIoYnVmZmVyLCBzZWNyZXQpIHtcbi8vICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIbWFjKCdzaGE1MTInLCBzZWNyZXQpLnVwZGF0ZShidWZmZXIpLmRpZ2VzdCgpXG4vLyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNoYTE6IHNoYTEsXG4gICAgc2hhMjU2OiBzaGEyNTYsXG4gICAgc2hhNTEyOiBzaGE1MTIsXG4gICAgSG1hY1NIQTI1NjogSG1hY1NIQTI1NixcbiAgICByaXBlbWQxNjA6IHJpcGVtZDE2MFxuICAgIC8vIGhhc2gxNjA6IGhhc2gxNjAsXG4gICAgLy8gaGFzaDI1NjogaGFzaDI1NixcbiAgICAvLyBIbWFjU0hBNTEyOiBIbWFjU0hBNTEyXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5Jyk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbGljZWRUb0FycmF5Mik7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YnKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnYnl0ZWJ1ZmZlcicpLFxuICAgIExvbmcgPSBfcmVxdWlyZS5Mb25nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVUxvbmc6IFVMb25nLFxuICBpc05hbWU6IGlzTmFtZSxcbiAgZW5jb2RlTmFtZTogZW5jb2RlTmFtZSwgLy8gZW5jb2RlIGh1bWFuIHJlYWRhYmxlIG5hbWUgdG8gdWludDY0IChudW1iZXIgc3RyaW5nKVxuICBkZWNvZGVOYW1lOiBkZWNvZGVOYW1lLCAvLyBkZWNvZGUgZnJvbSB1aW50NjQgdG8gaHVtYW4gcmVhZGFibGVcbiAgZW5jb2RlTmFtZUhleDogZnVuY3Rpb24gZW5jb2RlTmFtZUhleChuYW1lKSB7XG4gICAgcmV0dXJuIExvbmcuZnJvbVN0cmluZyhlbmNvZGVOYW1lKG5hbWUpLCB0cnVlKS50b1N0cmluZygxNik7XG4gIH0sXG4gIGRlY29kZU5hbWVIZXg6IGZ1bmN0aW9uIGRlY29kZU5hbWVIZXgoaGV4KSB7XG4gICAgdmFyIGxpdHRsZUVuZGlhbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgICByZXR1cm4gZGVjb2RlTmFtZShMb25nLmZyb21TdHJpbmcoaGV4LCB0cnVlLCAxNikudG9TdHJpbmcoKSwgbGl0dGxlRW5kaWFuKTtcbiAgfSxcbiAgRGVjaW1hbFN0cmluZzogRGVjaW1hbFN0cmluZyxcbiAgRGVjaW1hbFBhZDogRGVjaW1hbFBhZCxcbiAgRGVjaW1hbEltcGx5OiBEZWNpbWFsSW1wbHksXG4gIERlY2ltYWxVbmltcGx5OiBEZWNpbWFsVW5pbXBseSxcbiAgcHJpbnRBc3NldDogcHJpbnRBc3NldCxcbiAgcGFyc2VBc3NldDogcGFyc2VBc3NldFxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xufTt2YXIgc2lnbmVkID0gZnVuY3Rpb24gc2lnbmVkKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7fTtcbn07XG5cbmZ1bmN0aW9uIFVMb25nKHZhbHVlKSB7XG4gIHZhciB1bnNpZ25lZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgdmFyIHJhZGl4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAxMDtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNvbWUgSlNPTiBsaWJzIHVzZSBudW1iZXJzIGZvciB2YWx1ZXMgdW5kZXIgNTMgYml0cyBvciBzdHJpbmdzIGZvciBsYXJnZXIuXG4gICAgLy8gQWNjb21pZGF0ZSBidXQgZG91YmxlLWNoZWNrIGl0Li5cbiAgICBpZiAodmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsdWUgcGFyYW1ldGVyIG92ZXJmbG93Jyk7XG5cbiAgICB2YWx1ZSA9IExvbmcuZnJvbVN0cmluZyhTdHJpbmcodmFsdWUpLCB1bnNpZ25lZCwgcmFkaXgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IExvbmcuZnJvbVN0cmluZyh2YWx1ZSwgdW5zaWduZWQsIHJhZGl4KTtcbiAgfSBlbHNlIGlmICghTG9uZy5pc0xvbmcodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsdWUgcGFyYW1ldGVyIGlzIGEgcmVxdWllZCBMb25nLCBOdW1iZXIgb3IgU3RyaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc05hbWUoc3RyLCBlcnIpIHtcbiAgdHJ5IHtcbiAgICBlbmNvZGVOYW1lKHN0cik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgZXJyKGVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBjaGFybWFwID0gJy4xMjM0NWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcbnZhciBjaGFyaWR4ID0gZnVuY3Rpb24gY2hhcmlkeChjaCkge1xuICB2YXIgaWR4ID0gY2hhcm1hcC5pbmRleE9mKGNoKTtcbiAgaWYgKGlkeCA9PT0gLTEpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyOiBcXCcnICsgY2ggKyAnXFwnJyk7XG5cbiAgcmV0dXJuIGlkeDtcbn07XG5cbi8qKiBPcmlnaW5hbCBOYW1lIGVuY29kZSBhbmQgZGVjb2RlIGxvZ2ljIGlzIGluIGdpdGh1Yi5jb20vZW9zaW8vZW9zICBuYXRpdmUuaHBwICovXG5cbi8qKlxuICBFbmNvZGUgYSBuYW1lIChhIGJhc2UzMiBzdHJpbmcpIHRvIGEgbnVtYmVyLlxuXG4gIEZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB0aGUgYmxvY2tjaGFpbiB1c2VzIHRoZSBudW1lcmljYWwgZW5jb2Rpbmcgb2Ygc3RyaW5nc1xuICBmb3IgdmVyeSBjb21tb24gdHlwZXMgbGlrZSBhY2NvdW50IG5hbWVzLlxuXG4gIEBzZWUgdHlwZXMuaHBwIHN0cmluZ190b19uYW1lXG5cbiAgQGFyZyB7c3RyaW5nfSBuYW1lIC0gQSBzdHJpbmcgdG8gZW5jb2RlLCB1cCB0byAxMiBjaGFyYWN0ZXJzIGxvbmcuXG4gIEBhcmcge3N0cmluZ30gW2xpdHRsZUVuZGlhbiA9IHRydWVdIC0gTGl0dGxlIG9yIEJpZ2VuZGlhbiBlbmNvZGluZ1xuXG4gIEByZXR1cm4ge3N0cmluZzx1aW50NjQ+fSAtIGNvbXByZXNzZWQgc3RyaW5nIChmcm9tIG5hbWUgYXJnKS4gIEEgc3RyaW5nIGlzXG4gICAgYWx3YXlzIHVzZWQgYmVjYXVzZSBhIG51bWJlciBjb3VsZCBleGNlZWQgSmF2YVNjcmlwdCdzIDUyIGJpdCBsaW1pdC5cbiovXG5mdW5jdGlvbiBlbmNvZGVOYW1lKG5hbWUpIHtcbiAgdmFyIGxpdHRsZUVuZGlhbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCduYW1lIHBhcmFtZXRlciBpcyBhIHJlcXVpcmVkIHN0cmluZycpO1xuXG4gIGlmIChuYW1lLmxlbmd0aCA+IDEyKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIG5hbWUgY2FuIGJlIHVwIHRvIDEyIGNoYXJhY3RlcnMgbG9uZycpO1xuXG4gIHZhciBiaXRzdHIgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMTI7IGkrKykge1xuICAgIC8vIHByb2Nlc3MgYWxsIDY0IGJpdHMgKGV2ZW4gaWYgbmFtZSBpcyBzaG9ydClcbiAgICB2YXIgYyA9IGkgPCBuYW1lLmxlbmd0aCA/IGNoYXJpZHgobmFtZVtpXSkgOiAwO1xuICAgIHZhciBiaXRsZW4gPSBpIDwgMTIgPyA1IDogNDtcbiAgICB2YXIgYml0cyA9IE51bWJlcihjKS50b1N0cmluZygyKTtcbiAgICBpZiAoYml0cy5sZW5ndGggPiBiaXRsZW4pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbmFtZSAnICsgbmFtZSk7XG4gICAgfVxuICAgIGJpdHMgPSAnMCcucmVwZWF0KGJpdGxlbiAtIGJpdHMubGVuZ3RoKSArIGJpdHM7XG4gICAgYml0c3RyICs9IGJpdHM7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBMb25nLmZyb21TdHJpbmcoYml0c3RyLCB0cnVlLCAyKTtcblxuICAvLyBjb252ZXJ0IHRvIExJVFRMRV9FTkRJQU5cbiAgdmFyIGxlSGV4ID0gJyc7XG4gIHZhciBieXRlcyA9IGxpdHRsZUVuZGlhbiA/IHZhbHVlLnRvQnl0ZXNMRSgpIDogdmFsdWUudG9CeXRlc0JFKCk7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGJ5dGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdmFyIG4gPSBOdW1iZXIoYikudG9TdHJpbmcoMTYpO1xuICAgICAgbGVIZXggKz0gKG4ubGVuZ3RoID09PSAxID8gJzAnIDogJycpICsgbjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHVsTmFtZSA9IExvbmcuZnJvbVN0cmluZyhsZUhleCwgdHJ1ZSwgMTYpLnRvU3RyaW5nKCk7XG5cbiAgLy8gY29uc29sZS5sb2coJ2VuY29kZU5hbWUnLCBuYW1lLCB2YWx1ZS50b1N0cmluZygpLCB1bE5hbWUudG9TdHJpbmcoKSwgSlNPTi5zdHJpbmdpZnkoYml0c3RyLnNwbGl0KC8oLi4uLi4pLykuc2xpY2UoMSkpKVxuXG4gIHJldHVybiB1bE5hbWUudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gIEBhcmcge0xvbmd8U3RyaW5nfG51bWJlcn0gdmFsdWUgdWludDY0XG4gIEBhcmcge3N0cmluZ30gW2xpdHRsZUVuZGlhbiA9IHRydWVdIC0gTGl0dGxlIG9yIEJpZ2VuZGlhbiBlbmNvZGluZ1xuXG4gIEByZXR1cm4ge3N0cmluZ31cbiovXG5mdW5jdGlvbiBkZWNvZGVOYW1lKHZhbHVlKSB7XG4gIHZhciBsaXR0bGVFbmRpYW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgdmFsdWUgPSBVTG9uZyh2YWx1ZSk7XG5cbiAgLy8gY29udmVydCBmcm9tIExJVFRMRV9FTkRJQU5cbiAgdmFyIGJlSGV4ID0gJyc7XG4gIHZhciBieXRlcyA9IGxpdHRsZUVuZGlhbiA/IHZhbHVlLnRvQnl0ZXNMRSgpIDogdmFsdWUudG9CeXRlc0JFKCk7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBieXRlc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIGIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIHZhciBuID0gTnVtYmVyKGIpLnRvU3RyaW5nKDE2KTtcbiAgICAgIGJlSGV4ICs9IChuLmxlbmd0aCA9PT0gMSA/ICcwJyA6ICcnKSArIG47XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiZUhleCArPSAnMCcucmVwZWF0KDE2IC0gYmVIZXgubGVuZ3RoKTtcblxuICB2YXIgZml2ZUJpdHMgPSBMb25nLmZyb21OdW1iZXIoMHgxZiwgdHJ1ZSk7XG4gIHZhciBmb3VyQml0cyA9IExvbmcuZnJvbU51bWJlcigweDBmLCB0cnVlKTtcbiAgdmFyIGJlVmFsdWUgPSBMb25nLmZyb21TdHJpbmcoYmVIZXgsIHRydWUsIDE2KTtcblxuICB2YXIgc3RyID0gJyc7XG4gIHZhciB0bXAgPSBiZVZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDw9IDEyOyBpKyspIHtcbiAgICB2YXIgYyA9IGNoYXJtYXBbdG1wLmFuZChpID09PSAwID8gZm91ckJpdHMgOiBmaXZlQml0cyldO1xuICAgIHN0ciA9IGMgKyBzdHI7XG4gICAgdG1wID0gdG1wLnNoaWZ0UmlnaHQoaSA9PT0gMCA/IDQgOiA1KTtcbiAgfVxuICBzdHIgPSBzdHIucmVwbGFjZSgvXFwuKyQvLCAnJyk7IC8vIHJlbW92ZSB0cmFpbGluZyBkb3RzIChhbGwgb2YgdGhlbSlcblxuICAvLyBjb25zb2xlLmxvZygnZGVjb2RlTmFtZScsIHN0ciwgYmVWYWx1ZS50b1N0cmluZygpLCB2YWx1ZS50b1N0cmluZygpLCBKU09OLnN0cmluZ2lmeShiZVZhbHVlLnRvU3RyaW5nKDIpLnNwbGl0KC8oLi4uLi4pLykuc2xpY2UoMSkpKVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICBOb3JtYWxpemUgYW5kIHZhbGlkYXRlIGRlY2ltYWwgc3RyaW5nIChwb3RlbnRpYWxseSBsYXJnZSB2YWx1ZXMpLiAgU2hvdWxkXG4gIGF2b2lkIGludGVybmF0aW9uYWxpemF0aW9uIGlzc3VlcyBpZiBwb3NzaWJsZSBidXQgd2lsbCBiZSBzYWZlIGFuZFxuICB0aHJvdyBhbiBlcnJvciBmb3IgYW4gaW52YWxpZCBudW1iZXIuXG5cbiAgTm9ybWFsaXphdGlvbiByZW1vdmVzIGV4dHJhIHplcm9zIG9yIGRlY2ltYWwuXG5cbiAgQHJldHVybiB7c3RyaW5nfSB2YWx1ZVxuKi9cbmZ1bmN0aW9uIERlY2ltYWxTdHJpbmcodmFsdWUpIHtcbiAgYXNzZXJ0KHZhbHVlICE9IG51bGwsICd2YWx1ZSBpcyByZXF1aXJlZCcpO1xuICB2YWx1ZSA9IHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS50b1N0cmluZyA/IHZhbHVlLnRvU3RyaW5nKCkgOiBTdHJpbmcodmFsdWUpO1xuXG4gIHZhciBuZWcgPSAvXi0vLnRlc3QodmFsdWUpO1xuICBpZiAobmVnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICBpZiAodmFsdWVbMF0gPT09ICcuJykge1xuICAgIHZhbHVlID0gJzAnICsgdmFsdWU7XG4gIH1cblxuICB2YXIgcGFydCA9IHZhbHVlLnNwbGl0KCcuJyk7XG4gIGFzc2VydChwYXJ0Lmxlbmd0aCA8PSAyLCAnaW52YWxpZCBkZWNpbWFsICcgKyB2YWx1ZSk7XG4gIGFzc2VydCgvXlxcZCsoLD9cXGQpKlxcZCokLy50ZXN0KHBhcnRbMF0pLCAnaW52YWxpZCBkZWNpbWFsICcgKyB2YWx1ZSk7XG5cbiAgaWYgKHBhcnQubGVuZ3RoID09PSAyKSB7XG4gICAgYXNzZXJ0KC9eXFxkKiQvLnRlc3QocGFydFsxXSksICdpbnZhbGlkIGRlY2ltYWwgJyArIHZhbHVlKTtcbiAgICBwYXJ0WzFdID0gcGFydFsxXS5yZXBsYWNlKC8wKyQvLCAnJyk7IC8vIHJlbW92ZSBzdWZmaXhpbmcgemVyb3NcbiAgICBpZiAocGFydFsxXSA9PT0gJycpIHtcbiAgICAgIHBhcnQucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgcGFydFswXSA9IHBhcnRbMF0ucmVwbGFjZSgvXjAqLywgJycpOyAvLyByZW1vdmUgbGVhZGluZyB6ZXJvc1xuICBpZiAocGFydFswXSA9PT0gJycpIHtcbiAgICBwYXJ0WzBdID0gJzAnO1xuICB9XG4gIHJldHVybiAobmVnID8gJy0nIDogJycpICsgcGFydC5qb2luKCcuJyk7XG59XG5cbi8qKlxuICBFbnN1cmUgYSBmaXhlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuICBTYWZlIGZvciBsYXJnZSBudW1iZXJzLlxuXG4gIEBzZWUgLi9mb3JtYXQudGVzdC5qc1xuXG4gIEBleGFtcGxlIERlY2ltYWxQYWQoMTAuMiwgMykgPT09ICcxMC4yMDAnXG5cbiAgQGFyZyB7bnVtYmVyfHN0cmluZ3xvYmplY3QudG9TdHJpbmd9IG51bVxuICBAYXJnIHtudW1iZXJ9IFtwcmVjaXNpb24gPSBudWxsXSAtIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcy4gIE51bGwgc2tpcHNcbiAgICBwYWRkaW5nIHN1ZmZpeCBidXQgc3RpbGwgYXBwbGllcyBudW1iZXIgZm9ybWF0IG5vcm1hbGl6YXRpb24uXG4gIEByZXR1cm4ge3N0cmluZ30gZGVjaW1hbCBwYXJ0IGlzIGFkZGVkIGFuZCB6ZXJvIHBhZGRlZCB0byBtYXRjaCBwcmVjaXNpb25cbiovXG5mdW5jdGlvbiBEZWNpbWFsUGFkKG51bSwgcHJlY2lzaW9uKSB7XG4gIHZhciB2YWx1ZSA9IERlY2ltYWxTdHJpbmcobnVtKTtcbiAgaWYgKHByZWNpc2lvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgYXNzZXJ0KHByZWNpc2lvbiA+PSAwICYmIHByZWNpc2lvbiA8PSAxOCwgJ1ByZWNpc2lvbiBzaG91bGQgYmUgMTggY2hhcmFjdGVycyBvciBsZXNzJyk7XG5cbiAgdmFyIHBhcnQgPSB2YWx1ZS5zcGxpdCgnLicpO1xuXG4gIGlmIChwcmVjaXNpb24gPT09IDAgJiYgcGFydC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gcGFydFswXTtcbiAgfVxuXG4gIGlmIChwYXJ0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBwYXJ0WzBdICsgJy4nICsgJzAnLnJlcGVhdChwcmVjaXNpb24pO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYWQgPSBwcmVjaXNpb24gLSBwYXJ0WzFdLmxlbmd0aDtcbiAgICBhc3NlcnQocGFkID49IDAsICdkZWNpbWFsIFxcJycgKyB2YWx1ZSArICdcXCcgZXhjZWVkcyBwcmVjaXNpb24gJyArIHByZWNpc2lvbik7XG4gICAgcmV0dXJuIHBhcnRbMF0gKyAnLicgKyBwYXJ0WzFdICsgJzAnLnJlcGVhdChwYWQpO1xuICB9XG59XG5cbi8qKiBFbnN1cmVzIHByb3BlciB0cmFpbGluZyB6ZXJvcyB0aGVuIHJlbW92ZXMgZGVjaW1hbCBwbGFjZS4gKi9cbmZ1bmN0aW9uIERlY2ltYWxJbXBseSh2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gIHJldHVybiBEZWNpbWFsUGFkKHZhbHVlLCBwcmVjaXNpb24pLnJlcGxhY2UoJy4nLCAnJyk7XG59XG5cbi8qKlxuICBQdXQgdGhlIGRlY2ltYWwgcGxhY2UgYmFjayBpbiBpdHMgcG9zaXRpb24gYW5kIHJldHVybiB0aGUgbm9ybWFsaXplZCBudW1iZXJcbiAgc3RyaW5nICh3aXRoIGFueSB1bm5lY2Vzc2FyeSB6ZXJvcyBvciBhbiB1bm5lY2Vzc2FyeSBkZWNpbWFsIHJlbW92ZWQpLlxuXG4gIEBhcmcge3N0cmluZ3xudW1iZXJ8dmFsdWUudG9TdHJpbmd9IHZhbHVlIDEwMDAwXG4gIEBhcmcge251bWJlcn0gcHJlY2lzaW9uIDRcbiAgQHJldHVybiB7bnVtYmVyfSAxLjAwMDBcbiovXG5mdW5jdGlvbiBEZWNpbWFsVW5pbXBseSh2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gIGFzc2VydCh2YWx1ZSAhPSBudWxsLCAndmFsdWUgaXMgcmVxdWlyZWQnKTtcbiAgdmFsdWUgPSB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUudG9TdHJpbmcgPyB2YWx1ZS50b1N0cmluZygpIDogU3RyaW5nKHZhbHVlKTtcbiAgdmFyIG5lZyA9IC9eLS8udGVzdCh2YWx1ZSk7XG4gIGlmIChuZWcpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxKTtcbiAgfVxuICBhc3NlcnQoL15cXGQrJC8udGVzdCh2YWx1ZSksICdpbnZhbGlkIHdob2xlIG51bWJlciAnICsgdmFsdWUpO1xuICBhc3NlcnQocHJlY2lzaW9uICE9IG51bGwsICdwcmVjaXNpb24gcmVxdWlyZWQnKTtcbiAgYXNzZXJ0KHByZWNpc2lvbiA+PSAwICYmIHByZWNpc2lvbiA8PSAxOCwgJ1ByZWNpc2lvbiBzaG91bGQgYmUgMTggY2hhcmFjdGVycyBvciBsZXNzJyk7XG5cbiAgLy8gRW5zdXJlIG1pbmltdW0gbGVuZ3RoXG4gIHZhciBwYWQgPSBwcmVjaXNpb24gLSB2YWx1ZS5sZW5ndGg7XG4gIGlmIChwYWQgPiAwKSB7XG4gICAgdmFsdWUgPSAnJyArICcwJy5yZXBlYXQocGFkKSArIHZhbHVlO1xuICB9XG5cbiAgdmFyIGRvdElkeCA9IHZhbHVlLmxlbmd0aCAtIHByZWNpc2lvbjtcbiAgdmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBkb3RJZHgpICsgJy4nICsgdmFsdWUuc2xpY2UoZG90SWR4KTtcbiAgcmV0dXJuIChuZWcgPyAnLScgOiAnJykgKyBEZWNpbWFsUGFkKHZhbHVlLCBwcmVjaXNpb24pOyAvLyBOb3JtYWxpemVcbn1cblxuLyoqIEBwcml2YXRlIGZvciBub3csIHN1cHBvcnQgZm9yIGFzc2V0IHN0cmluZ3MgaXMgbGltaXRlZFxuKi9cbmZ1bmN0aW9uIHByaW50QXNzZXQoX3JlZikge1xuICB2YXIgYW1vdW50ID0gX3JlZi5hbW91bnQsXG4gICAgICBwcmVjaXNpb24gPSBfcmVmLnByZWNpc2lvbixcbiAgICAgIHN5bWJvbCA9IF9yZWYuc3ltYm9sLFxuICAgICAgY29udHJhY3QgPSBfcmVmLmNvbnRyYWN0O1xuXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygc3ltYm9sID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN5bWJvbCksICdzdHJpbmcnLCAnc3ltYm9sIGlzIGEgcmVxdWlyZWQgc3RyaW5nJyk7XG5cbiAgaWYgKGFtb3VudCAhPSBudWxsICYmIHByZWNpc2lvbiAhPSBudWxsKSB7XG4gICAgYW1vdW50ID0gRGVjaW1hbFBhZChhbW91bnQsIHByZWNpc2lvbik7XG4gIH1cblxuICB2YXIgam9pbiA9IGZ1bmN0aW9uIGpvaW4oZTEsIGUyKSB7XG4gICAgcmV0dXJuIGUxID09IG51bGwgPyAnJyA6IGUyID09IG51bGwgPyAnJyA6IGUxICsgZTI7XG4gIH07XG5cbiAgaWYgKGFtb3VudCAhPSBudWxsKSB7XG4gICAgLy8gdGhlIGFtb3VudCBjb250YWlucyB0aGUgcHJlY2lzaW9uXG4gICAgcmV0dXJuIGpvaW4oYW1vdW50LCAnICcpICsgc3ltYm9sICsgam9pbignQCcsIGNvbnRyYWN0KTtcbiAgfVxuXG4gIHJldHVybiBqb2luKHByZWNpc2lvbiwgJywnKSArIHN5bWJvbCArIGpvaW4oJ0AnLCBjb250cmFjdCk7XG59XG5cbi8qKlxuICBBdHRlbXB0cyB0byBwYXJzZSBhbGwgZm9ybXMgb2YgdGhlIGFzc2V0IHN0cmluZ3MgKHN5bWJvbCwgYXNzZXQsIG9yIGV4dGVuZGVkXG4gIHZlcnNpb25zKS4gIElmIHRoZSBwcm92aWRlZCBzdHJpbmcgY29udGFpbnMgYW55IGFkZGl0aW9uYWwgb3IgYXBwZWFycyB0byBoYXZlXG4gIGludmFsaWQgaW5mb3JtYXRpb24gYW4gZXJyb3IgaXMgdGhyb3duLlxuXG4gIEByZXR1cm4ge29iamVjdH0ge2Ftb3VudCwgcHJlY2lzaW9uLCBzeW1ib2wsIGNvbnRyYWN0fVxuICBAdGhyb3dzIEFzc2VydGlvbkVycm9yXG4qL1xuZnVuY3Rpb24gcGFyc2VBc3NldChzdHIpIHtcbiAgdmFyIF9zdHIkc3BsaXQgPSBzdHIuc3BsaXQoJyAnKSxcbiAgICAgIF9zdHIkc3BsaXQyID0gKDAsIF9zbGljZWRUb0FycmF5My5kZWZhdWx0KShfc3RyJHNwbGl0LCAxKSxcbiAgICAgIGFtb3VudFJhdyA9IF9zdHIkc3BsaXQyWzBdO1xuXG4gIHZhciBhbW91bnRNYXRjaCA9IGFtb3VudFJhdy5tYXRjaCgvXigtP1swLTldKyhcXC5bMC05XSspPykoIHwkKS8pO1xuICB2YXIgYW1vdW50ID0gYW1vdW50TWF0Y2ggPyBhbW91bnRNYXRjaFsxXSA6IG51bGw7XG5cbiAgdmFyIHByZWNpc2lvbk1hdGNoID0gc3RyLm1hdGNoKC8oXnwgKShbMC05XSspLChbQS1aXSspKEB8JCkvKTtcbiAgdmFyIHByZWNpc2lvblN5bWJvbCA9IHByZWNpc2lvbk1hdGNoID8gTnVtYmVyKHByZWNpc2lvbk1hdGNoWzJdKSA6IG51bGw7XG4gIHZhciBwcmVjaXNpb25BbW91bnQgPSBhbW91bnQgPyAoYW1vdW50LnNwbGl0KCcuJylbMV0gfHwgJycpLmxlbmd0aCA6IG51bGw7XG4gIHZhciBwcmVjaXNpb24gPSBwcmVjaXNpb25TeW1ib2wgIT0gbnVsbCA/IHByZWNpc2lvblN5bWJvbCA6IHByZWNpc2lvbkFtb3VudDtcblxuICB2YXIgc3ltYm9sTWF0Y2ggPSBzdHIubWF0Y2goLyhefCB8LCkoW0EtWl0rKShAfCQpLyk7XG4gIHZhciBzeW1ib2wgPSBzeW1ib2xNYXRjaCA/IHN5bWJvbE1hdGNoWzJdIDogbnVsbDtcblxuICB2YXIgX3N0ciRzcGxpdDMgPSBzdHIuc3BsaXQoJ0AnKSxcbiAgICAgIF9zdHIkc3BsaXQ0ID0gKDAsIF9zbGljZWRUb0FycmF5My5kZWZhdWx0KShfc3RyJHNwbGl0MywgMiksXG4gICAgICBfc3RyJHNwbGl0NCQgPSBfc3RyJHNwbGl0NFsxXSxcbiAgICAgIGNvbnRyYWN0UmF3ID0gX3N0ciRzcGxpdDQkID09PSB1bmRlZmluZWQgPyAnJyA6IF9zdHIkc3BsaXQ0JDtcblxuICB2YXIgY29udHJhY3QgPSAvXlthLXowLTVdKyhcXC5bYS16MC01XSspKiQvLnRlc3QoY29udHJhY3RSYXcpID8gY29udHJhY3RSYXcgOiBudWxsO1xuXG4gIHZhciBjaGVjayA9IHByaW50QXNzZXQoeyBhbW91bnQ6IGFtb3VudCwgcHJlY2lzaW9uOiBwcmVjaXNpb24sIHN5bWJvbDogc3ltYm9sLCBjb250cmFjdDogY29udHJhY3QgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKHN0ciwgY2hlY2ssICdJbnZhbGlkIGFzc2V0IHN0cmluZzogJyArIHN0ciArICcgIT09ICcgKyBjaGVjayk7XG5cbiAgaWYgKHByZWNpc2lvbiAhPSBudWxsKSB7XG4gICAgYXNzZXJ0KHByZWNpc2lvbiA+PSAwICYmIHByZWNpc2lvbiA8PSAxOCwgJ1ByZWNpc2lvbiBzaG91bGQgYmUgMTggY2hhcmFjdGVycyBvciBsZXNzJyk7XG4gIH1cbiAgaWYgKHN5bWJvbCAhPSBudWxsKSB7XG4gICAgYXNzZXJ0KHN5bWJvbC5sZW5ndGggPD0gNywgJ0Fzc2V0IHN5bWJvbCBpcyA3IGNoYXJhY3RlcnMgb3IgbGVzcycpO1xuICB9XG4gIGlmIChjb250cmFjdCAhPSBudWxsKSB7XG4gICAgYXNzZXJ0KGNvbnRyYWN0Lmxlbmd0aCA8PSAxMiwgJ0NvbnRyYWN0IGlzIDEyIGNoYXJhY3RlcnMgb3IgbGVzcycpO1xuICB9XG5cbiAgcmV0dXJuIHsgYW1vdW50OiBhbW91bnQsIHByZWNpc2lvbjogcHJlY2lzaW9uLCBzeW1ib2w6IHN5bWJvbCwgY29udHJhY3Q6IGNvbnRyYWN0IH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWxzXG5cdFNldCxcblx0TWFwLFxuXHRXZWFrU2V0LFxuXHRXZWFrTWFwLFxuXG5cdFByb21pc2UsXG5cblx0U3ltYm9sLFxuXHRQcm94eSxcblxuXHRBdG9taWNzLFxuXHRTaGFyZWRBcnJheUJ1ZmZlcixcblxuXHRBcnJheUJ1ZmZlcixcblx0RGF0YVZpZXcsXG5cdFVpbnQ4QXJyYXksXG5cdEZsb2F0MzJBcnJheSxcblx0RmxvYXQ2NEFycmF5LFxuXHRJbnQ4QXJyYXksXG5cdEludDE2QXJyYXksXG5cdEludDMyQXJyYXksXG5cdFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHRVaW50MTZBcnJheSxcblx0VWludDMyQXJyYXksXG4qL1xuXG52YXIgdW5kZWZpbmVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvdy1yZXN0cmljdGVkLW5hbWVzXG5cbnZhciBUaHJvd1R5cGVFcnJvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Jcblx0PyAoZnVuY3Rpb24gKCkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7IH0oKSlcblx0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoKTsgfTtcblxudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBnZW5lcmF0b3I7IC8vID0gZnVuY3Rpb24gKiAoKSB7fTtcbnZhciBnZW5lcmF0b3JGdW5jdGlvbiA9IGdlbmVyYXRvciA/IGdldFByb3RvKGdlbmVyYXRvcikgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNGbjsgLy8gYXN5bmMgZnVuY3Rpb24oKSB7fTtcbnZhciBhc3luY0Z1bmN0aW9uID0gYXN5bmNGbiA/IGFzeW5jRm4uY29uc3RydWN0b3IgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNHZW47IC8vIGFzeW5jIGZ1bmN0aW9uICogKCkge307XG52YXIgYXN5bmNHZW5GdW5jdGlvbiA9IGFzeW5jR2VuID8gZ2V0UHJvdG8oYXN5bmNHZW4pIDogdW5kZWZpbmVkO1xudmFyIGFzeW5jR2VuSXRlcmF0b3IgPSBhc3luY0dlbiA/IGFzeW5jR2VuKCkgOiB1bmRlZmluZWQ7XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJCAlQXJyYXklJzogQXJyYXksXG5cdCckICVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCckICVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIucHJvdG90eXBlLFxuXHQnJCAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyQgJUFycmF5UHJvdG90eXBlJSc6IEFycmF5LnByb3RvdHlwZSxcblx0JyQgJUFycmF5UHJvdG9fZW50cmllcyUnOiBBcnJheS5wcm90b3R5cGUuZW50cmllcyxcblx0JyQgJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCxcblx0JyQgJUFycmF5UHJvdG9fa2V5cyUnOiBBcnJheS5wcm90b3R5cGUua2V5cyxcblx0JyQgJUFycmF5UHJvdG9fdmFsdWVzJSc6IEFycmF5LnByb3RvdHlwZS52YWx1ZXMsXG5cdCckICVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJCAlQXN5bmNGdW5jdGlvbiUnOiBhc3luY0Z1bmN0aW9uLFxuXHQnJCAlQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBhc3luY0Z1bmN0aW9uID8gYXN5bmNGdW5jdGlvbi5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG5cdCckICVBc3luY0dlbmVyYXRvciUnOiBhc3luY0dlbiA/IGdldFByb3RvKGFzeW5jR2VuSXRlcmF0b3IpIDogdW5kZWZpbmVkLFxuXHQnJCAlQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBhc3luY0dlbkZ1bmN0aW9uLFxuXHQnJCAlQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogYXN5bmNHZW5GdW5jdGlvbiA/IGFzeW5jR2VuRnVuY3Rpb24ucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuXHQnJCAlQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBhc3luY0dlbkl0ZXJhdG9yICYmIGhhc1N5bWJvbHMgJiYgU3ltYm9sLmFzeW5jSXRlcmF0b3IgPyBhc3luY0dlbkl0ZXJhdG9yW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIDogdW5kZWZpbmVkLFxuXHQnJCAlQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJCAlQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJCAlQm9vbGVhblByb3RvdHlwZSUnOiBCb29sZWFuLnByb3RvdHlwZSxcblx0JyQgJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyQgJURhdGFWaWV3UHJvdG90eXBlJSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldy5wcm90b3R5cGUsXG5cdCckICVEYXRlJSc6IERhdGUsXG5cdCckICVEYXRlUHJvdG90eXBlJSc6IERhdGUucHJvdG90eXBlLFxuXHQnJCAlZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyQgJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCckICVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJCAlZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyQgJUVycm9yJSc6IEVycm9yLFxuXHQnJCAlRXJyb3JQcm90b3R5cGUlJzogRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyQgJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCckICVFdmFsRXJyb3JQcm90b3R5cGUlJzogRXZhbEVycm9yLnByb3RvdHlwZSxcblx0JyQgJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyQgJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheS5wcm90b3R5cGUsXG5cdCckICVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCckICVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXkucHJvdG90eXBlLFxuXHQnJCAlRnVuY3Rpb24lJzogRnVuY3Rpb24sXG5cdCckICVGdW5jdGlvblByb3RvdHlwZSUnOiBGdW5jdGlvbi5wcm90b3R5cGUsXG5cdCckICVHZW5lcmF0b3IlJzogZ2VuZXJhdG9yID8gZ2V0UHJvdG8oZ2VuZXJhdG9yKCkpIDogdW5kZWZpbmVkLFxuXHQnJCAlR2VuZXJhdG9yRnVuY3Rpb24lJzogZ2VuZXJhdG9yRnVuY3Rpb24sXG5cdCckICVHZW5lcmF0b3JQcm90b3R5cGUlJzogZ2VuZXJhdG9yRnVuY3Rpb24gPyBnZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG5cdCckICVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCckICVJbnQ4QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXkucHJvdG90eXBlLFxuXHQnJCAlSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJCAlSW50MTZBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXkucHJvdG90eXBlLFxuXHQnJCAlSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJCAlSW50MzJBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LnByb3RvdHlwZSxcblx0JyQgJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJCAlaXNOYU4lJzogaXNOYU4sXG5cdCckICVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCckICVKU09OJSc6IEpTT04sXG5cdCckICVKU09OUGFyc2UlJzogSlNPTi5wYXJzZSxcblx0JyQgJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyQgJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCckICVNYXBQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNYXAucHJvdG90eXBlLFxuXHQnJCAlTWF0aCUnOiBNYXRoLFxuXHQnJCAlTnVtYmVyJSc6IE51bWJlcixcblx0JyQgJU51bWJlclByb3RvdHlwZSUnOiBOdW1iZXIucHJvdG90eXBlLFxuXHQnJCAlT2JqZWN0JSc6IE9iamVjdCxcblx0JyQgJU9iamVjdFByb3RvdHlwZSUnOiBPYmplY3QucHJvdG90eXBlLFxuXHQnJCAlT2JqUHJvdG9fdG9TdHJpbmclJzogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcblx0JyQgJU9ialByb3RvX3ZhbHVlT2YlJzogT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLFxuXHQnJCAlcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJCAlcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCckICVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCckICVQcm9taXNlUHJvdG90eXBlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UucHJvdG90eXBlLFxuXHQnJCAlUHJvbWlzZVByb3RvX3RoZW4lJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5wcm90b3R5cGUudGhlbixcblx0JyQgJVByb21pc2VfYWxsJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UuYWxsLFxuXHQnJCAlUHJvbWlzZV9yZWplY3QlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5yZWplY3QsXG5cdCckICVQcm9taXNlX3Jlc29sdmUlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5yZXNvbHZlLFxuXHQnJCAlUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJCAlUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJCAlUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBSYW5nZUVycm9yLnByb3RvdHlwZSxcblx0JyQgJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJCAlUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogUmVmZXJlbmNlRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJCAlUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyQgJVJlZ0V4cFByb3RvdHlwZSUnOiBSZWdFeHAucHJvdG90eXBlLFxuXHQnJCAlU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJCAlU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyQgJVNldFByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldC5wcm90b3R5cGUsXG5cdCckICVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCckICVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIucHJvdG90eXBlLFxuXHQnJCAlU3RyaW5nJSc6IFN0cmluZyxcblx0JyQgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJCAlU3RyaW5nUHJvdG90eXBlJSc6IFN0cmluZy5wcm90b3R5cGUsXG5cdCckICVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyQgJVN5bWJvbFByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyQgJVN5bnRheEVycm9yJSc6IFN5bnRheEVycm9yLFxuXHQnJCAlU3ludGF4RXJyb3JQcm90b3R5cGUlJzogU3ludGF4RXJyb3IucHJvdG90eXBlLFxuXHQnJCAlVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCckICVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCckICVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFR5cGVkQXJyYXkgPyBUeXBlZEFycmF5LnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyQgJVR5cGVFcnJvciUnOiBUeXBlRXJyb3IsXG5cdCckICVUeXBlRXJyb3JQcm90b3R5cGUlJzogVHlwZUVycm9yLnByb3RvdHlwZSxcblx0JyQgJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyQgJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheS5wcm90b3R5cGUsXG5cdCckICVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCckICVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXkucHJvdG90eXBlLFxuXHQnJCAlVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJCAlVWludDE2QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LnByb3RvdHlwZSxcblx0JyQgJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyQgJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheS5wcm90b3R5cGUsXG5cdCckICVVUklFcnJvciUnOiBVUklFcnJvcixcblx0JyQgJVVSSUVycm9yUHJvdG90eXBlJSc6IFVSSUVycm9yLnByb3RvdHlwZSxcblx0JyQgJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyQgJVdlYWtNYXBQcm90b3R5cGUlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcC5wcm90b3R5cGUsXG5cdCckICVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXQsXG5cdCckICVXZWFrU2V0UHJvdG90eXBlJSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXQucHJvdG90eXBlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBrZXkgPSAnJCAnICsgbmFtZTtcblx0aWYgKCEoa2V5IGluIElOVFJJTlNJQ1MpKSB7XG5cdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xuXHR9XG5cblx0Ly8gaXN0YW5idWwgaWdub3JlIGlmIC8vIGhvcGVmdWxseSB0aGlzIGlzIGltcG9zc2libGUgdG8gdGVzdCA6LSlcblx0aWYgKHR5cGVvZiBJTlRSSU5TSUNTW2tleV0gPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHR9XG5cdHJldHVybiBJTlRSSU5TSUNTW2tleV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NoZW1hID0gT2JqZWN0LmFzc2lnbih7fSwgcmVxdWlyZSgnLi9jaGFpbl90eXBlcy5qc29uJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjaGVtYTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCcuL0dldEludHJpbnNpYycpO1xuXG52YXIgJE9iamVjdCA9IEdldEludHJpbnNpYygnJU9iamVjdCUnKTtcbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRTdHJpbmcgPSBHZXRJbnRyaW5zaWMoJyVTdHJpbmclJyk7XG5cbnZhciBhc3NlcnRSZWNvcmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYXNzZXJ0UmVjb3JkJyk7XG52YXIgJGlzTmFOID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzTmFOJyk7XG52YXIgJGlzRmluaXRlID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzRmluaXRlJyk7XG5cbnZhciBzaWduID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NpZ24nKTtcbnZhciBtb2QgPSByZXF1aXJlKCcuL2hlbHBlcnMvbW9kJyk7XG5cbnZhciBJc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJ2VzLXRvLXByaW1pdGl2ZS9lczUnKTtcblxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuXG4vLyBodHRwczovL2VzNS5naXRodWIuaW8vI3g5XG52YXIgRVM1ID0ge1xuXHRUb1ByaW1pdGl2ZTogdG9QcmltaXRpdmUsXG5cblx0VG9Cb29sZWFuOiBmdW5jdGlvbiBUb0Jvb2xlYW4odmFsdWUpIHtcblx0XHRyZXR1cm4gISF2YWx1ZTtcblx0fSxcblx0VG9OdW1iZXI6IGZ1bmN0aW9uIFRvTnVtYmVyKHZhbHVlKSB7XG5cdFx0cmV0dXJuICt2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHR9LFxuXHRUb0ludGVnZXI6IGZ1bmN0aW9uIFRvSW50ZWdlcih2YWx1ZSkge1xuXHRcdHZhciBudW1iZXIgPSB0aGlzLlRvTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoJGlzTmFOKG51bWJlcikpIHsgcmV0dXJuIDA7IH1cblx0XHRpZiAobnVtYmVyID09PSAwIHx8ICEkaXNGaW5pdGUobnVtYmVyKSkgeyByZXR1cm4gbnVtYmVyOyB9XG5cdFx0cmV0dXJuIHNpZ24obnVtYmVyKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG5cdH0sXG5cdFRvSW50MzI6IGZ1bmN0aW9uIFRvSW50MzIoeCkge1xuXHRcdHJldHVybiB0aGlzLlRvTnVtYmVyKHgpID4+IDA7XG5cdH0sXG5cdFRvVWludDMyOiBmdW5jdGlvbiBUb1VpbnQzMih4KSB7XG5cdFx0cmV0dXJuIHRoaXMuVG9OdW1iZXIoeCkgPj4+IDA7XG5cdH0sXG5cdFRvVWludDE2OiBmdW5jdGlvbiBUb1VpbnQxNih2YWx1ZSkge1xuXHRcdHZhciBudW1iZXIgPSB0aGlzLlRvTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoJGlzTmFOKG51bWJlcikgfHwgbnVtYmVyID09PSAwIHx8ICEkaXNGaW5pdGUobnVtYmVyKSkgeyByZXR1cm4gMDsgfVxuXHRcdHZhciBwb3NJbnQgPSBzaWduKG51bWJlcikgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xuXHRcdHJldHVybiBtb2QocG9zSW50LCAweDEwMDAwKTtcblx0fSxcblx0VG9TdHJpbmc6IGZ1bmN0aW9uIFRvU3RyaW5nKHZhbHVlKSB7XG5cdFx0cmV0dXJuICRTdHJpbmcodmFsdWUpO1xuXHR9LFxuXHRUb09iamVjdDogZnVuY3Rpb24gVG9PYmplY3QodmFsdWUpIHtcblx0XHR0aGlzLkNoZWNrT2JqZWN0Q29lcmNpYmxlKHZhbHVlKTtcblx0XHRyZXR1cm4gJE9iamVjdCh2YWx1ZSk7XG5cdH0sXG5cdENoZWNrT2JqZWN0Q29lcmNpYmxlOiBmdW5jdGlvbiBDaGVja09iamVjdENvZXJjaWJsZSh2YWx1ZSwgb3B0TWVzc2FnZSkge1xuXHRcdC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcihvcHRNZXNzYWdlIHx8ICdDYW5ub3QgY2FsbCBtZXRob2Qgb24gJyArIHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRJc0NhbGxhYmxlOiBJc0NhbGxhYmxlLFxuXHRTYW1lVmFsdWU6IGZ1bmN0aW9uIFNhbWVWYWx1ZSh4LCB5KSB7XG5cdFx0aWYgKHggPT09IHkpIHsgLy8gMCA9PT0gLTAsIGJ1dCB0aGV5IGFyZSBub3QgaWRlbnRpY2FsLlxuXHRcdFx0aWYgKHggPT09IDApIHsgcmV0dXJuIDEgLyB4ID09PSAxIC8geTsgfVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiAkaXNOYU4oeCkgJiYgJGlzTmFOKHkpO1xuXHR9LFxuXG5cdC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOFxuXHRUeXBlOiBmdW5jdGlvbiBUeXBlKHgpIHtcblx0XHRpZiAoeCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuICdOdWxsJztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB4ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuICdVbmRlZmluZWQnO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ09iamVjdCc7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcblx0XHRcdHJldHVybiAnTnVtYmVyJztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB4ID09PSAnYm9vbGVhbicpIHtcblx0XHRcdHJldHVybiAnQm9vbGVhbic7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnU3RyaW5nJztcblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXByb3BlcnR5LWRlc2NyaXB0b3Itc3BlY2lmaWNhdGlvbi10eXBlXG5cdElzUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBJc1Byb3BlcnR5RGVzY3JpcHRvcihEZXNjKSB7XG5cdFx0aWYgKHRoaXMuVHlwZShEZXNjKSAhPT0gJ09iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dmFyIGFsbG93ZWQgPSB7XG5cdFx0XHQnW1tDb25maWd1cmFibGVdXSc6IHRydWUsXG5cdFx0XHQnW1tFbnVtZXJhYmxlXV0nOiB0cnVlLFxuXHRcdFx0J1tbR2V0XV0nOiB0cnVlLFxuXHRcdFx0J1tbU2V0XV0nOiB0cnVlLFxuXHRcdFx0J1tbVmFsdWVdXSc6IHRydWUsXG5cdFx0XHQnW1tXcml0YWJsZV1dJzogdHJ1ZVxuXHRcdH07XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gRGVzYykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHRpZiAoaGFzKERlc2MsIGtleSkgJiYgIWFsbG93ZWRba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGlzRGF0YSA9IGhhcyhEZXNjLCAnW1tWYWx1ZV1dJyk7XG5cdFx0dmFyIElzQWNjZXNzb3IgPSBoYXMoRGVzYywgJ1tbR2V0XV0nKSB8fCBoYXMoRGVzYywgJ1tbU2V0XV0nKTtcblx0XHRpZiAoaXNEYXRhICYmIElzQWNjZXNzb3IpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdQcm9wZXJ0eSBEZXNjcmlwdG9ycyBtYXkgbm90IGJlIGJvdGggYWNjZXNzb3IgYW5kIGRhdGEgZGVzY3JpcHRvcnMnKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuMVxuXHRJc0FjY2Vzc29yRGVzY3JpcHRvcjogZnVuY3Rpb24gSXNBY2Nlc3NvckRlc2NyaXB0b3IoRGVzYykge1xuXHRcdGlmICh0eXBlb2YgRGVzYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKCFoYXMoRGVzYywgJ1tbR2V0XV0nKSAmJiAhaGFzKERlc2MsICdbW1NldF1dJykpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMC4yXG5cdElzRGF0YURlc2NyaXB0b3I6IGZ1bmN0aW9uIElzRGF0YURlc2NyaXB0b3IoRGVzYykge1xuXHRcdGlmICh0eXBlb2YgRGVzYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKCFoYXMoRGVzYywgJ1tbVmFsdWVdXScpICYmICFoYXMoRGVzYywgJ1tbV3JpdGFibGVdXScpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuM1xuXHRJc0dlbmVyaWNEZXNjcmlwdG9yOiBmdW5jdGlvbiBJc0dlbmVyaWNEZXNjcmlwdG9yKERlc2MpIHtcblx0XHRpZiAodHlwZW9mIERlc2MgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0YXNzZXJ0UmVjb3JkKHRoaXMsICdQcm9wZXJ0eSBEZXNjcmlwdG9yJywgJ0Rlc2MnLCBEZXNjKTtcblxuXHRcdGlmICghdGhpcy5Jc0FjY2Vzc29yRGVzY3JpcHRvcihEZXNjKSAmJiAhdGhpcy5Jc0RhdGFEZXNjcmlwdG9yKERlc2MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuNFxuXHRGcm9tUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBGcm9tUHJvcGVydHlEZXNjcmlwdG9yKERlc2MpIHtcblx0XHRpZiAodHlwZW9mIERlc2MgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gRGVzYztcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKHRoaXMuSXNEYXRhRGVzY3JpcHRvcihEZXNjKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmFsdWU6IERlc2NbJ1tbVmFsdWVdXSddLFxuXHRcdFx0XHR3cml0YWJsZTogISFEZXNjWydbW1dyaXRhYmxlXV0nXSxcblx0XHRcdFx0ZW51bWVyYWJsZTogISFEZXNjWydbW0VudW1lcmFibGVdXSddLFxuXHRcdFx0XHRjb25maWd1cmFibGU6ICEhRGVzY1snW1tDb25maWd1cmFibGVdXSddXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAodGhpcy5Jc0FjY2Vzc29yRGVzY3JpcHRvcihEZXNjKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Z2V0OiBEZXNjWydbW0dldF1dJ10sXG5cdFx0XHRcdHNldDogRGVzY1snW1tTZXRdXSddLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiAhIURlc2NbJ1tbRW51bWVyYWJsZV1dJ10sXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogISFEZXNjWydbW0NvbmZpZ3VyYWJsZV1dJ11cblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdGcm9tUHJvcGVydHlEZXNjcmlwdG9yIG11c3QgYmUgY2FsbGVkIHdpdGggYSBmdWxseSBwb3B1bGF0ZWQgUHJvcGVydHkgRGVzY3JpcHRvcicpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMC41XG5cdFRvUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBUb1Byb3BlcnR5RGVzY3JpcHRvcihPYmopIHtcblx0XHRpZiAodGhpcy5UeXBlKE9iaikgIT09ICdPYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignVG9Qcm9wZXJ0eURlc2NyaXB0b3IgcmVxdWlyZXMgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIGRlc2MgPSB7fTtcblx0XHRpZiAoaGFzKE9iaiwgJ2VudW1lcmFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tFbnVtZXJhYmxlXV0nXSA9IHRoaXMuVG9Cb29sZWFuKE9iai5lbnVtZXJhYmxlKTtcblx0XHR9XG5cdFx0aWYgKGhhcyhPYmosICdjb25maWd1cmFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tDb25maWd1cmFibGVdXSddID0gdGhpcy5Ub0Jvb2xlYW4oT2JqLmNvbmZpZ3VyYWJsZSk7XG5cdFx0fVxuXHRcdGlmIChoYXMoT2JqLCAndmFsdWUnKSkge1xuXHRcdFx0ZGVzY1snW1tWYWx1ZV1dJ10gPSBPYmoudmFsdWU7XG5cdFx0fVxuXHRcdGlmIChoYXMoT2JqLCAnd3JpdGFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tXcml0YWJsZV1dJ10gPSB0aGlzLlRvQm9vbGVhbihPYmoud3JpdGFibGUpO1xuXHRcdH1cblx0XHRpZiAoaGFzKE9iaiwgJ2dldCcpKSB7XG5cdFx0XHR2YXIgZ2V0dGVyID0gT2JqLmdldDtcblx0XHRcdGlmICh0eXBlb2YgZ2V0dGVyICE9PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5Jc0NhbGxhYmxlKGdldHRlcikpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0dGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdFx0fVxuXHRcdFx0ZGVzY1snW1tHZXRdXSddID0gZ2V0dGVyO1xuXHRcdH1cblx0XHRpZiAoaGFzKE9iaiwgJ3NldCcpKSB7XG5cdFx0XHR2YXIgc2V0dGVyID0gT2JqLnNldDtcblx0XHRcdGlmICh0eXBlb2Ygc2V0dGVyICE9PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5Jc0NhbGxhYmxlKHNldHRlcikpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ3NldHRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblx0XHRcdH1cblx0XHRcdGRlc2NbJ1tbU2V0XV0nXSA9IHNldHRlcjtcblx0XHR9XG5cblx0XHRpZiAoKGhhcyhkZXNjLCAnW1tHZXRdXScpIHx8IGhhcyhkZXNjLCAnW1tTZXRdXScpKSAmJiAoaGFzKGRlc2MsICdbW1ZhbHVlXV0nKSB8fCBoYXMoZGVzYywgJ1tbV3JpdGFibGVdXScpKSkge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0ludmFsaWQgcHJvcGVydHkgZGVzY3JpcHRvci4gQ2Fubm90IGJvdGggc3BlY2lmeSBhY2Nlc3NvcnMgYW5kIGEgdmFsdWUgb3Igd3JpdGFibGUgYXR0cmlidXRlJyk7XG5cdFx0fVxuXHRcdHJldHVybiBkZXNjO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVTNTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbW1vbkFwaSA9IHJlcXVpcmUoJy4vYXBpX2NvbW1vbicpO1xudmFyIG9iamVjdEFwaSA9IHJlcXVpcmUoJy4vYXBpX29iamVjdCcpO1xuXG52YXIgZWNjID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uQXBpLCBvYmplY3RBcGkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVjYzsiLCJtb2R1bGUuZXhwb3J0cyA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBpc05hTihhKSB7XG5cdHJldHVybiBhICE9PSBhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFwaSA9IHJlcXVpcmUoJy4vYXBpL3YxJyk7XG52YXIgYXBpR2VuID0gcmVxdWlyZSgnLi9hcGlnZW4nKTtcbnZhciBwcm9jZXNzQXJncyA9IHJlcXVpcmUoJy4vcHJvY2Vzcy1hcmdzJyk7XG5cbnZhciBFb3NBcGkgPSBmdW5jdGlvbiBFb3NBcGkoY29uZmlnKSB7XG4gIHJldHVybiBhcGlHZW4oJ3YxJywgYXBpLCBjb25maWcpO1xufTtcblxuT2JqZWN0LmFzc2lnbihFb3NBcGksIHtcbiAgcHJvY2Vzc0FyZ3M6IHByb2Nlc3NBcmdzLFxuICBhcGk6IGFwaSxcblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgVGVzdG5ldDogZnVuY3Rpb24gVGVzdG5ldChjb25maWcpIHtcbiAgICBjb25zb2xlLmVycm9yKCdkZXByZWNhdGVkLCBjaGFuZ2UgRW9zQXBpLlRlc3RuZXQoLi4pIHRvIGp1c3QgRW9zQXBpKC4uKScpO1xuICAgIHJldHVybiBFb3NBcGkoY29uZmlnKTtcbiAgfSxcblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgTG9jYWxuZXQ6IGZ1bmN0aW9uIExvY2FsbmV0KGNvbmZpZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2RlcHJlY2F0ZWQsIGNoYW5nZSBFb3NBcGkuTG9jYWxuZXQoLi4pIHRvIGp1c3QgRW9zQXBpKC4uKScpO1xuICAgIHJldHVybiBFb3NBcGkoY29uZmlnKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW9zQXBpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzUHJpbWl0aXZlJyk7XG5cbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcblxuLy8gaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMi44XG52YXIgRVM1aW50ZXJuYWxTbG90cyA9IHtcblx0J1tbRGVmYXVsdFZhbHVlXV0nOiBmdW5jdGlvbiAoTykge1xuXHRcdHZhciBhY3R1YWxIaW50O1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YWN0dWFsSGludCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0dWFsSGludCA9IHRvU3RyLmNhbGwoTykgPT09ICdbb2JqZWN0IERhdGVdJyA/IFN0cmluZyA6IE51bWJlcjtcblx0XHR9XG5cblx0XHRpZiAoYWN0dWFsSGludCA9PT0gU3RyaW5nIHx8IGFjdHVhbEhpbnQgPT09IE51bWJlcikge1xuXHRcdFx0dmFyIG1ldGhvZHMgPSBhY3R1YWxIaW50ID09PSBTdHJpbmcgPyBbJ3RvU3RyaW5nJywgJ3ZhbHVlT2YnXSA6IFsndmFsdWVPZicsICd0b1N0cmluZyddO1xuXHRcdFx0dmFyIHZhbHVlLCBpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKGlzQ2FsbGFibGUoT1ttZXRob2RzW2ldXSkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IE9bbWV0aG9kc1tpXV0oKTtcblx0XHRcdFx0XHRpZiAoaXNQcmltaXRpdmUodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBkZWZhdWx0IHZhbHVlJyk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgW1tEZWZhdWx0VmFsdWVdXSBoaW50IHN1cHBsaWVkJyk7XG5cdH1cbn07XG5cbi8vIGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTkuMVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb1ByaW1pdGl2ZShpbnB1dCkge1xuXHRpZiAoaXNQcmltaXRpdmUoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdHJldHVybiBFUzVpbnRlcm5hbFNsb3RzWydbW0RlZmF1bHRWYWx1ZV1dJ10oaW5wdXQsIGFyZ3VtZW50c1sxXSk7XG5cdH1cblx0cmV0dXJuIEVTNWludGVybmFsU2xvdHNbJ1tbRGVmYXVsdFZhbHVlXV0nXShpbnB1dCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2hhaW46IHJlcXVpcmUoJy4vY2hhaW4uanNvbicpLFxuICBoaXN0b3J5OiByZXF1aXJlKCcuL2hpc3RvcnkuanNvbicpXG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLy8gVW5kZXIgXCJhcGk6XCIgYWxsIGZ1bmN0aW9ucyBtdXN0IHRha2UgYXBpIGFzIHRoZWlyIDFzdCBwYXJhbWV0ZXJcbiAgYXBpOiB7XG4gICAgY3JlYXRlVHJhbnNhY3Rpb246IGNyZWF0ZVRyYW5zYWN0aW9uXG4gIH1cblxuICAvKipcbiAgICBAdHlwZWRlZiB7b2JqZWN0fSBoZWFkZXJzXG4gICAgQHByb3BlcnR5IHtudW1iZXJ9IHJlZl9ibG9ja19udW0gLSBMYXN0IGlycmV2ZXJzaWJsZSBibG9jayBudW1iZXIuICBUaGVcbiAgICBiaXQtd2lzZSBBTkQgb3BlcmF0aW9uIGlzIHVzZWQgdG8ga2VlcCB0aGlzIHZhbHVlIHdpdGggdGhlIHNpemUgb2YgYSBVaW50MTZcbiAgICBzaXplIChhIGJsb2NrIG51bSBpbiB0aGUgbGFzdCAyXjE2IGJsb2NrcykuICBFeGFtcGxlOlxuICAgIGBnZXRfaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0gJiAweEZGRkZgXG4gIFxuICAgIEBwcm9wZXJ0eSB7bnVtYmVyfSByZWZfYmxvY2tfcHJlZml4IC0gZ2V0X2Jsb2NrLnJlZl9ibG9ja19wcmVmaXggLi4gVGhpcyBpc1xuICAgIGEgMzIgYml0IG51bWJlciBpZGVudGlmaWVyIChpZGVudGlmeSB0aGUgc2FtZSBibG9jayByZWZlcmVuY2VkIGluIGByZWZfYmxvY2tfbnVtYCkuXG4gIFxuICAgIEBwcm9wZXJ0eSB7c3RyaW5nfSBleHBpcmF0aW9uIC0gVGhpcyBpcyBiYXNlZCBvbiB0aGUgaGVhZCBibG9jayB0aW1lIGZyb20gdGhlXG4gICAgYmxvY2tjaGFpbi4gIEJlIGNhcmVmdWwgdG8gc3VmZml4IGEgWiBpZiByZXF1aXJlZCAoYXMgd2l0aCBGaXJlZm94IGFuZCBKYXZhU2NyaXB0KVxuICAgIHRvIGVuc3VyZSB0aGlzIGRhdGUgc3RyaW5nIGlzIGludGVycHJldGVkIGFzIFp1bHUgdGltZS5cbiAgXG4gICAgRXhhbXBsZTogYG5ldyBEYXRlKG5ldyBEYXRlKGluZm8uaGVhZF9ibG9ja190aW1lICsgJ1onKS5nZXRUaW1lKCkgKyBleHBpcmVJblNlY29uZHMgKiAxMDAwKS50b0lTT1N0cmluZygpLnNwbGl0KCcuJylbMF1gXG4gICovXG5cbiAgLyoqXG4gICAgQ29uc3VsdCB0aGUgYmxvY2tjaGFpbiBhbmQgZ2F0aGVyIGluZm9ybWF0aW9uIGZvciB1c2UgaW4gYSBuZXcgc2lnbmVkIHRyYW5zYWN0aW9uLlxuICAgIEZvciBUcmFuc2FjdGlvbiBhcyBQcm9vZiBvZiBTdGFrZSAoVGFQT1MpLCAzMiBiaXRzIG9mIGEgcmVjZW50IGJsb2NrIElkIGlzIGluY2x1ZGVkLlxuICAgIEJlY2F1c2UgYWxsIHRyYW5zYWN0aW9ucyB1c2UgVGFQT1MsIHRoaXMgc29sdmVzIHRoZSBub3RoaW5nIGF0IHN0YWtlIGF0dGFjay5cbiAgXG4gICAgVGhpcyBpcyB1c3VhbGx5IGNhbGxlZCBmb3IgZXZlcnkgdHJhbnNhY3Rpb24gb3IgbWF5YmUgY2FjaGVkIHBlciBibG9jay4gIEFsdGhvdWdoXG4gICAgbG9uZ2VyIGNhY2hpbmcgaXMgcG9zc2libGUsIGEgbG9uZ2VyIGNhY2hlIHRpbWUgaW5jcmVhc2VzIHRoZSByaXNrIG9mIGFcbiAgICB0cmFuc2FjdGlvbiByZXBsYXkgYXR0YWNrLlxuICBcbiAgICBAYXJnIHtudW1iZXJ9IGV4cGlyZUluU2Vjb25kcyAtIEhvdyBtYW55IHNlY29uZHMgdW50aWwgZXhwaXJhdGlvblxuICAgIEBhcmcge2Z1bmN0aW9uKGVycm9yLCBoZWFkZXJzKX0gY2FsbGJhY2sge0BsaW5rIGhlYWRlcnN9XG4gICAgQHNlZSB7aGVhZGVyc31cbiAgICBAZXhhbXBsZSBlb3MuY3JlYXRlVHJhbnNhY3Rpb24oNjAsIChlcnJvciwgaGVhZGVycykgPT4ge30pXG4gICovXG59O2Z1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uKGFwaSkge1xuICB2YXIgZXhwaXJlSW5TZWNvbmRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiA2MDtcbiAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzJdO1xuXG4gIGlmICghY2FsbGJhY2spIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBhcGkuZ2V0SW5mbyhjaGVja0Vycm9yKGNhbGxiYWNrLCBmdW5jdGlvbiAoaW5mbykge1xuICAgIHZhciBjaGFpbkRhdGUgPSBuZXcgRGF0ZShpbmZvLmhlYWRfYmxvY2tfdGltZSArICdaJyk7XG5cbiAgICBhcGkuZ2V0QmxvY2soaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0sIGNoZWNrRXJyb3IoY2FsbGJhY2ssIGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgdmFyIGV4cGlyYXRpb24gPSBuZXcgRGF0ZShjaGFpbkRhdGUuZ2V0VGltZSgpICsgZXhwaXJlSW5TZWNvbmRzICogMTAwMCk7XG5cbiAgICAgIHZhciByZWZfYmxvY2tfbnVtID0gaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0gJiAweEZGRkY7XG5cbiAgICAgIHZhciBoZWFkZXJzID0ge1xuICAgICAgICBleHBpcmF0aW9uOiBleHBpcmF0aW9uLnRvSVNPU3RyaW5nKCkuc3BsaXQoJy4nKVswXSxcbiAgICAgICAgcmVmX2Jsb2NrX251bTogcmVmX2Jsb2NrX251bSxcbiAgICAgICAgcmVmX2Jsb2NrX3ByZWZpeDogYmxvY2sucmVmX2Jsb2NrX3ByZWZpeCxcbiAgICAgICAgbWF4X25ldF91c2FnZV93b3JkczogMCxcbiAgICAgICAgbWF4X2NwdV91c2FnZV9tczogMCxcbiAgICAgICAgZGVsYXlfc2VjOiAwLFxuICAgICAgICBjb250ZXh0X2ZyZWVfYWN0aW9uczogW10sXG4gICAgICAgIGFjdGlvbnM6IFtdLFxuICAgICAgICBzaWduYXR1cmVzOiBbXSxcbiAgICAgICAgdHJhbnNhY3Rpb25fZXh0ZW5zaW9uczogW11cbiAgICAgIH07XG4gICAgICBjYWxsYmFjayhudWxsLCBoZWFkZXJzKTtcbiAgICB9KSk7XG4gIH0pKTtcbn1cblxudmFyIGNoZWNrRXJyb3IgPSBmdW5jdGlvbiBjaGVja0Vycm9yKHBhcmVudEVyciwgcGFycmVudFJlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHBhcmVudEVycihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnJlbnRSZXMocmVzdWx0KTtcbiAgICB9XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlID09PSBudWxsIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXknKTtcblxudmFyIF9zbGljZWRUb0FycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NsaWNlZFRvQXJyYXkyKTtcblxudmFyIF9yZWdlbmVyYXRvciA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3InKTtcblxudmFyIF9yZWdlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWdlbmVyYXRvcik7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YnKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciBlY2MgPSByZXF1aXJlKCdlb3Nqcy1lY2MnKTtcbnZhciBGY2J1ZmZlciA9IHJlcXVpcmUoJ2ZjYnVmZmVyJyk7XG52YXIgY3JlYXRlSGFzaCA9IHJlcXVpcmUoJ2NyZWF0ZS1oYXNoJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ2Vvc2pzLWFwaScpLFxuICAgIHByb2Nlc3NBcmdzID0gX3JlcXVpcmUucHJvY2Vzc0FyZ3M7XG5cbnZhciBTdHJ1Y3RzID0gcmVxdWlyZSgnLi9zdHJ1Y3RzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gd3JpdGVBcGlHZW47XG5cbnZhciBzaWduID0gZWNjLnNpZ247XG5cblxuZnVuY3Rpb24gd3JpdGVBcGlHZW4oTmV0d29yaywgbmV0d29yaywgc3RydWN0cywgY29uZmlnLCBhYmlzKSB7XG4gIGlmICh0eXBlb2YgY29uZmlnLmNoYWluSWQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29uZmlnLmNoYWluSWQgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICB2YXIgd3JpdGVBcGkgPSBXcml0ZUFwaShOZXR3b3JrLCBuZXR3b3JrLCBjb25maWcsIHN0cnVjdHMudHJhbnNhY3Rpb24pO1xuICB2YXIgcmVzZXJ2ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoWyd0cmFuc2FjdGlvbicsICdjb250cmFjdCddKTtcblxuICB2YXIgbWVyZ2UgPSB7fTtcbiAgLy8gc2VuZHMgdHJhbnNhY3Rpb25zLCBjYW4gYWN0IGFzIGFuIGFjdGlvbiBjb2xsZWN0aW5nIHdyYXBwZXJcbiAgbWVyZ2UudHJhbnNhY3Rpb24gPSB3cml0ZUFwaS5nZW5UcmFuc2FjdGlvbihzdHJ1Y3RzLCBtZXJnZSk7XG5cbiAgLy8gSW1tZWRpYXRlIHNlbmQgb3BlcmF0aW9ucyBhdXRvbWF0aWNhbGx5IGNhbGxzIG1lcmdlLnRyYW5zYWN0aW9uXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFiaXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgYWJpID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGZvciAodmFyIHR5cGUgaW4gYWJpLnNjaGVtYSkge1xuICAgICAgICB2YXIgdHlwZVN0cnVjdCA9IGFiaS5zY2hlbWFbdHlwZV07XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZVN0cnVjdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBza2lwIHR5cGVzIGxpa2U7IG5hbWUsIGFjY291bnRfbmFtZSwgZXRjLi5cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdHlwZVN0cnVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KSh0eXBlU3RydWN0KSwgJ29iamVjdCcsICdhYmkuc2NoZW1hW3R5cGUgPSAnICsgdHlwZSArICddJyk7XG5cbiAgICAgICAgdmFyIGFjdGlvbiA9IHR5cGVTdHJ1Y3QuYWN0aW9uO1xuXG4gICAgICAgIGlmIChhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIEFCSSBwcml2YXRlIHN0cnVjdFxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc2VydmVGdW5jdGlvbnMuaGFzKGFjdGlvbi5uYW1lKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbmZsaWN0aW5nIEFwaSBmdW5jdGlvbjogJyArIHR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZmluaXRpb24gPSBzY2hlbWFGaWVsZHMoYWJpLnNjaGVtYSwgdHlwZSk7XG4gICAgICAgIG1lcmdlW2FjdGlvbi5uYW1lXSA9IHdyaXRlQXBpLmdlbk1ldGhvZCh0eXBlLCBkZWZpbml0aW9uLCBtZXJnZS50cmFuc2FjdGlvbiwgYWN0aW9uLmFjY291bnQsIGFjdGlvbi5uYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgIEltbWVkYXRlIHNlbmQgY29udHJhY3QgYWN0aW9ucy5cbiAgICAgICBAZXhhbXBsZSBlb3MuY29udHJhY3QoJ215Y29udHJhY3QnLCBbb3B0aW9uc10sIFtjYWxsYmFja10pXG4gICAgICBAZXhhbXBsZSBlb3MuY29udHJhY3QoJ215Y29udHJhY3QnKS50aGVuKG15Y29udHJhY3QgPT4gbXljb250cmFjdC5teWFjdGlvbiguLi4pKVxuICAgICovXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWVyZ2UuY29udHJhY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIF9wcm9jZXNzQXJncyA9IHByb2Nlc3NBcmdzKGFyZ3MsIFsnYWNjb3VudCddLCAnY29udHJhY3QnLCBvcHRpb25zRm9ybWF0dGVyKSxcbiAgICAgICAgcGFyYW1zID0gX3Byb2Nlc3NBcmdzLnBhcmFtcyxcbiAgICAgICAgb3B0aW9ucyA9IF9wcm9jZXNzQXJncy5vcHRpb25zLFxuICAgICAgICByZXR1cm5Qcm9taXNlID0gX3Byb2Nlc3NBcmdzLnJldHVyblByb21pc2UsXG4gICAgICAgIGNhbGxiYWNrID0gX3Byb2Nlc3NBcmdzLmNhbGxiYWNrO1xuXG4gICAgdmFyIGFjY291bnQgPSBwYXJhbXMuYWNjb3VudDtcblxuICAgIC8vIHNlbmRzIHRyYW5zYWN0aW9ucyB2aWEgaXRzIG93biB0cmFuc2FjdGlvbiBmdW5jdGlvblxuXG4gICAgd3JpdGVBcGkuZ2VuQ29udHJhY3RBY3Rpb25zKGFjY291bnQpLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHIpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICBjYWxsYmFjayhyKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXR1cm5Qcm9taXNlO1xuICB9O1xuXG4gIHJldHVybiBtZXJnZTtcbn1cblxuZnVuY3Rpb24gV3JpdGVBcGkoTmV0d29yaywgbmV0d29yaywgY29uZmlnLCBUcmFuc2FjdGlvbikge1xuICAvKipcbiAgICBAYXJnIHthcnJheX0gW2FyZ3MuY29udHJhY3RzXVxuICAgIEBhcmcge2NhbGxiYWNrfG9iamVjdH0gYXJncy50cmFuc2FjdGlvbiB0ciA9PiB7dHIudHJhbnNmZXIgLi4gfVxuICAgIEBhcmcge29iamVjdH0gW2FyZ3Mub3B0aW9uc11cbiAgICBAYXJnIHtmdW5jdGlvbn0gW2FyZ3MuY2FsbGJhY2tdXG4gICovXG4gIHZhciBnZW5UcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIGdlblRyYW5zYWN0aW9uKHN0cnVjdHMsIG1lcmdlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250cmFjdHMsIG9wdGlvbnMsIGNhbGxiYWNrLCBpc0NvbnRyYWN0QXJyYXksIGFjY291bnRzLCBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiwgX2RpZEl0ZXJhdG9yRXJyb3IyLCBfaXRlcmF0b3JFcnJvcjIsIF9pdGVyYXRvcjIsIF9zdGVwMiwgYWN0aW9uLCBhYmlQcm9taXNlcywgY2FjaGVkQ29kZSwgYXJnLCBjb250cmFjdFByb21pc2VzLCBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMywgX2RpZEl0ZXJhdG9yRXJyb3IzLCBfaXRlcmF0b3JFcnJvcjMsIF9pdGVyYXRvcjMsIF9zdGVwMywgYWNjb3VudDtcblxuICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC5hc3luYyhmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgY29udHJhY3RzID0gdm9pZCAwLCBvcHRpb25zID0gdm9pZCAwLCBjYWxsYmFjayA9IHZvaWQgMDtcblxuXG4gICAgICAgICAgICAgIGlmIChhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIG1heSBiZSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaXNDb250cmFjdEFycmF5ID0gaXNTdHJpbmdBcnJheShhcmdzWzBdKTtcblxuICAgICAgICAgICAgICBpZiAoIWlzQ29udHJhY3RBcnJheSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29udHJhY3RzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnRyYWN0cyA9IFthcmdzWzBdXTtcbiAgICAgICAgICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgIGlmICghKCgwLCBfdHlwZW9mMy5kZWZhdWx0KShhcmdzWzBdKSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdLmFjdGlvbnMpKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIGZ1bGwgdHJhbnNhY3Rpb24sIGxvb2t1cCBBQklzIHVzZWQgYnkgZWFjaCBhY3Rpb25cbiAgICAgICAgICAgICAgYWNjb3VudHMgPSBuZXcgU2V0KCk7IC8vIG1ha2UgYSB1bmlxdWUgbGlzdFxuXG4gICAgICAgICAgICAgIC8vIFRPRE86IEFkZCBhcmdzWzBdLmNvbnRleHRfZnJlZV9hY3Rpb25zIHRvIGFjY291bnRzIHRvbz9cblxuICAgICAgICAgICAgICBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAxODtcbiAgICAgICAgICAgICAgZm9yIChfaXRlcmF0b3IyID0gYXJnc1swXS5hY3Rpb25zW1N5bWJvbC5pdGVyYXRvcl0oKTsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGFjY291bnRzLmFkZChhY3Rpb24uYWNjb3VudCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gMjI7XG4gICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gX2NvbnRleHRbJ2NhdGNoJ10oMTgpO1xuICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBfY29udGV4dC50MDtcblxuICAgICAgICAgICAgY2FzZSAyNjpcbiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDI2O1xuICAgICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gMjc7XG5cbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAyOTpcbiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDI5O1xuXG4gICAgICAgICAgICAgIGlmICghX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuXG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDI5KTtcblxuICAgICAgICAgICAgY2FzZSAzMzpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmZpbmlzaCgyNik7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgIGFiaVByb21pc2VzID0gW107XG5cbiAgICAgICAgICAgICAgLy8gRW9zIGNvbnRyYWN0IG9wZXJhdGlvbnMgYXJlIGNhY2hlZCAoZWZmaWNpZW50IGFuZCBvZmZsaW5lIHRyYW5zYWN0aW9ucylcblxuICAgICAgICAgICAgICBjYWNoZWRDb2RlID0gbmV3IFNldChbJ2Vvc2lvJywgJ2Vvc2lvLnRva2VuJywgJ2Vvc2lvLm51bGwnXSk7XG5cbiAgICAgICAgICAgICAgYWNjb3VudHMuZm9yRWFjaChmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgIGlmICghY2FjaGVkQ29kZS5oYXMoYWNjb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgIGFiaVByb21pc2VzLnB1c2goY29uZmlnLmFiaUNhY2hlLmFiaUFzeW5jKGFjY291bnQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMzk7XG4gICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3IyLmRlZmF1bHQuYXdyYXAoUHJvbWlzZS5hbGwoYWJpUHJvbWlzZXMpKTtcblxuICAgICAgICAgICAgY2FzZSAzOTpcblxuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAxICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAxICYmICgwLCBfdHlwZW9mMy5kZWZhdWx0KShhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGFyZ3MubGVuZ3RoLCAxLCAndHJhbnNhY3Rpb24gYXJnczogY29udHJhY3RzPHN0cmluZ3xhcnJheT4sIHRyYW5zYWN0aW9uPGNhbGxiYWNrfG9iamVjdD4sIFtvcHRpb25zXSwgW2NhbGxiYWNrXScpO1xuICAgICAgICAgICAgICBhcmcgPSBhcmdzWzBdO1xuXG4gICAgICAgICAgICAgIGlmICghY29udHJhY3RzKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDY3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYXNzZXJ0KCFjYWxsYmFjaywgJ2NhbGxiYWNrIHdpdGggY29udHJhY3RzIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICAgIGFzc2VydC5lcXVhbCgnZnVuY3Rpb24nLCB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGFyZyksICdwcm92aWRlIGZ1bmN0aW9uIGNhbGxiYWNrIGZvbGxvd2luZyBjb250cmFjdHMgYXJyYXkgcGFyYW1ldGVyJyk7XG5cbiAgICAgICAgICAgICAgY29udHJhY3RQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSA1MDtcblxuICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjMgPSBjb250cmFjdHNbU3ltYm9sLml0ZXJhdG9yXSgpOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudCA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHdyYXBwZXIgZnVuY3Rpb25zIHRvIGNvbGxlY3QgY29udHJhY3QgYXBpIGNhbGxzXG4gICAgICAgICAgICAgICAgY29udHJhY3RQcm9taXNlcy5wdXNoKGdlbkNvbnRyYWN0QWN0aW9ucyhhY2NvdW50LCBtZXJnZS50cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDU4O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA1NDpcbiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDU0O1xuICAgICAgICAgICAgICBfY29udGV4dC50MSA9IF9jb250ZXh0WydjYXRjaCddKDUwKTtcbiAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gX2NvbnRleHQudDE7XG5cbiAgICAgICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSA1ODtcbiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDU5O1xuXG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgNjE6XG4gICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSA2MTtcblxuICAgICAgICAgICAgICBpZiAoIV9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA2NDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcblxuICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmZpbmlzaCg2MSk7XG5cbiAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5maW5pc2goNTgpO1xuXG4gICAgICAgICAgICBjYXNlIDY2OlxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBQcm9taXNlLmFsbChjb250cmFjdFByb21pc2VzKS50aGVuKGZ1bmN0aW9uIChhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lcmdlcyA9IHt9O1xuICAgICAgICAgICAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobSwgaSkge1xuICAgICAgICAgICAgICAgICAgbWVyZ2VzW2NvbnRyYWN0c1tpXV0gPSBtO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IGlzQ29udHJhY3RBcnJheSA/IG1lcmdlcyA6IG1lcmdlc1tjb250cmFjdHNbMF1dO1xuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgYW5kIGludm9rZSBhcGkgY2FsbHNcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJNZXNzYWdlQ29sbGVjdG9yKGFyZywgb3B0aW9ucywgcGFyYW0pO1xuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGNhc2UgNjc6XG4gICAgICAgICAgICAgIGlmICghKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDY5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdCgncmV0dXJuJywgdHJNZXNzYWdlQ29sbGVjdG9yKGFyZywgb3B0aW9ucywgbWVyZ2UpKTtcblxuICAgICAgICAgICAgY2FzZSA2OTpcbiAgICAgICAgICAgICAgaWYgKCEoKHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoYXJnKSkgPT09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA3MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIHRyYW5zYWN0aW9uKGFyZywgb3B0aW9ucywgY2FsbGJhY2spKTtcblxuICAgICAgICAgICAgY2FzZSA3MTpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaXJzdCB0cmFuc2FjdGlvbiBhcmd1bWVudCB1bnJlY29nbml6ZWQnLCBhcmcpO1xuXG4gICAgICAgICAgICBjYXNlIDcyOlxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIG51bGwsIHRoaXMsIFtbMTgsIDIyLCAyNiwgMzRdLCBbMjcsLCAyOSwgMzNdLCBbNTAsIDU0LCA1OCwgNjZdLCBbNTksLCA2MSwgNjVdXSk7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZW5Db250cmFjdEFjdGlvbnMoYWNjb3VudCkge1xuICAgIHZhciB0cmFuc2FjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuICAgIHJldHVybiBjb25maWcuYWJpQ2FjaGUuYWJpQXN5bmMoYWNjb3VudCkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgIGFzc2VydChBcnJheS5pc0FycmF5KGNhY2hlLmFiaS5hY3Rpb25zKSAmJiBjYWNoZS5hYmkuYWN0aW9ucy5sZW5ndGgsICdObyBhY3Rpb25zJyk7XG5cbiAgICAgIHZhciBjb250cmFjdE1lcmdlID0ge307XG4gICAgICBjb250cmFjdE1lcmdlLnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb24gPyB0cmFuc2FjdGlvbiA6IGdlblRyYW5zYWN0aW9uKGNhY2hlLnN0cnVjdHMsIGNvbnRyYWN0TWVyZ2UpO1xuXG4gICAgICBjYWNoZS5hYmkuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICAgICAgdHlwZSA9IF9yZWYudHlwZTtcblxuICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHNjaGVtYUZpZWxkcyhjYWNoZS5zY2hlbWEsIHR5cGUpO1xuICAgICAgICBjb250cmFjdE1lcmdlW25hbWVdID0gZ2VuTWV0aG9kKHR5cGUsIGRlZmluaXRpb24sIGNvbnRyYWN0TWVyZ2UudHJhbnNhY3Rpb24sIGFjY291bnQsIG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRyYWN0TWVyZ2UuZmMgPSBjYWNoZTtcblxuICAgICAgcmV0dXJuIGNvbnRyYWN0TWVyZ2U7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5NZXRob2QodHlwZSwgZGVmaW5pdGlvbiwgdHJhbnNhY3Rpb25BcmcpIHtcbiAgICB2YXIgYWNjb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogJ2Vvc2lvLnRva2VuJztcbiAgICB2YXIgbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogdHlwZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyh1c2FnZSh7IG5hbWU6IG5hbWUsIHR5cGU6IHR5cGUgfSwgZGVmaW5pdGlvbiwgTmV0d29yaywgYWNjb3VudCwgY29uZmlnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU3BlY2lhbCBjYXNlIGxpa2UgbXVsdGktYWN0aW9uIHRyYW5zYWN0aW9ucyB3aGVyZSB0aGlzIGxpYiBuZWVkc1xuICAgICAgLy8gdG8gYmUgc3VyZSB0aGUgYnJvYWRjYXN0IGlzIG9mZi5cbiAgICAgIHZhciBvcHRpb25PdmVycmlkZXMgPSB7fTtcbiAgICAgIHZhciBsYXN0QXJnID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKCh0eXBlb2YgbGFzdEFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShsYXN0QXJnKSkgPT09ICdvYmplY3QnICYmICgwLCBfdHlwZW9mMy5kZWZhdWx0KShsYXN0QXJnLl9fb3B0aW9uT3ZlcnJpZGVzKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gcG9wKCkgZml4ZXMgdGhlIGFyZ3MubGVuZ3RoXG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9uT3ZlcnJpZGVzLCBhcmdzLnBvcCgpLl9fb3B0aW9uT3ZlcnJpZGVzKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb2Nlc3NlZEFyZ3MgPSBwcm9jZXNzQXJncyhhcmdzLCBPYmplY3Qua2V5cyhkZWZpbml0aW9uKSwgdHlwZSwgb3B0aW9uc0Zvcm1hdHRlcik7XG5cbiAgICAgIHZhciBvcHRpb25zID0gcHJvY2Vzc2VkQXJncy5vcHRpb25zO1xuICAgICAgdmFyIHBhcmFtcyA9IHByb2Nlc3NlZEFyZ3MucGFyYW1zLFxuICAgICAgICAgIHJldHVyblByb21pc2UgPSBwcm9jZXNzZWRBcmdzLnJldHVyblByb21pc2UsXG4gICAgICAgICAgY2FsbGJhY2sgPSBwcm9jZXNzZWRBcmdzLmNhbGxiYWNrO1xuXG5cbiAgICAgIHZhciBvcHRpb25EZWZhdWx0cyA9IHsgLy8gRnJvbSBjb25maWcgYW5kIGNvbmZpZ0RlZmF1bHRzXG4gICAgICAgIGJyb2FkY2FzdDogY29uZmlnLmJyb2FkY2FzdCxcbiAgICAgICAgc2lnbjogY29uZmlnLnNpZ25cblxuICAgICAgICAvLyBpbnRlcm5hbCBvcHRpb25zIChleDogbXVsdGktYWN0aW9uIHRyYW5zYWN0aW9uKVxuICAgICAgfTtvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9uRGVmYXVsdHMsIG9wdGlvbnMsIG9wdGlvbk92ZXJyaWRlcyk7XG4gICAgICBpZiAob3B0aW9uT3ZlcnJpZGVzLm5vQ2FsbGJhY2sgJiYgIXJldHVyblByb21pc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsYmFjayBkdXJpbmcgYSB0cmFuc2FjdGlvbiBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXV0aG9yaXphdGlvbiA9IFtdO1xuICAgICAgdmFyIHByb3ZpZGVkQXV0aCA9IG9wdGlvbnMuYXV0aG9yaXphdGlvbiA/IG9wdGlvbnMuYXV0aG9yaXphdGlvbiA6IGNvbmZpZy5hdXRob3JpemF0aW9uO1xuICAgICAgdmFyIGFkZERlZmF1bHRBdXRocyA9IHByb3ZpZGVkQXV0aCA9PSBudWxsO1xuXG4gICAgICAvLyBPZnRlbiBpZiB0aGUgZmlyc3QgZmllbGQgaW4gYW4gYWN0aW9uIGlzIGFuIGFjY291bnQgbmFtZSBpdCBpc1xuICAgICAgLy8gYWxzbyB0aGUgcmVxdWlyZWQgYXV0aG9yaXphdGlvbi5cbiAgICAgIGZ1bmN0aW9uIGZpcnN0QWNjb3VudCgpIHtcbiAgICAgICAgdmFyIGZpZWxkS2V5cyA9IE9iamVjdC5rZXlzKGRlZmluaXRpb24pO1xuICAgICAgICB2YXIgZjEgPSBmaWVsZEtleXNbMF07XG5cbiAgICAgICAgaWYgKGRlZmluaXRpb25bZjFdID09PSAnYWNjb3VudF9uYW1lJykge1xuICAgICAgICAgIHJldHVybiBwYXJhbXNbZjFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm92aWRlZEF1dGgpIHtcbiAgICAgICAgdmFyIGF1dGhBcnJheSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlZEF1dGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYXV0aEFycmF5ID0gW3Byb3ZpZGVkQXV0aF07XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm92aWRlZEF1dGgpKSB7XG4gICAgICAgICAgYXV0aEFycmF5ID0gcHJvdmlkZWRBdXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF1dGhBcnJheSkge1xuICAgICAgICAgIGF1dGhBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF1dGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHZhciBfYXV0aCRzcGxpdCA9IGF1dGguc3BsaXQoJ0AnKSxcbiAgICAgICAgICAgICAgICAgIF9hdXRoJHNwbGl0MiA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoX2F1dGgkc3BsaXQsIDIpLFxuICAgICAgICAgICAgICAgICAgYWN0b3IgPSBfYXV0aCRzcGxpdDJbMF0sXG4gICAgICAgICAgICAgICAgICBfYXV0aCRzcGxpdDIkID0gX2F1dGgkc3BsaXQyWzFdLFxuICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbiA9IF9hdXRoJHNwbGl0MiQgPT09IHVuZGVmaW5lZCA/ICdhY3RpdmUnIDogX2F1dGgkc3BsaXQyJDtcblxuICAgICAgICAgICAgICBpZiAoYWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgYWN0b3IgPSBmaXJzdEFjY291bnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYWN0b3IpIHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uLnB1c2goeyBhY3RvcjogYWN0b3IsIHBlcm1pc3Npb246IHBlcm1pc3Npb24gfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBhdXRoID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGF1dGgpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbi5wdXNoKGF1dGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0LmVxdWFsKGF1dGhvcml6YXRpb24ubGVuZ3RoLCBhdXRoQXJyYXkubGVuZ3RoLCAnaW52YWxpZCBhdXRob3JpemF0aW9uIGluOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvdmlkZWRBdXRoKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0ciA9IHtcbiAgICAgICAgYWN0aW9uczogW3tcbiAgICAgICAgICBhY2NvdW50OiBhY2NvdW50LFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcbiAgICAgICAgICBkYXRhOiBwYXJhbXNcbiAgICAgICAgfV1cbiAgICAgIH07XG5cbiAgICAgIGlmIChhZGREZWZhdWx0QXV0aHMpIHtcbiAgICAgICAgdmFyIGFjdG9yID0gZmlyc3RBY2NvdW50KCk7XG4gICAgICAgIGlmIChhY3Rvcikge1xuICAgICAgICAgIC8vIERlZmF1bHQgYXV0aG9yaXphdGlvbiAoc2luY2UgdXNlciBkaWQgbm90IHByb3ZpZGUgb25lKVxuICAgICAgICAgIHRyLmFjdGlvbnNbMF0uYXV0aG9yaXphdGlvbi5wdXNoKHtcbiAgICAgICAgICAgIGFjdG9yOiBhY3RvcixcbiAgICAgICAgICAgIHBlcm1pc3Npb246ICdhY3RpdmUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHIuYWN0aW9uc1swXS5hdXRob3JpemF0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuYWN0b3IgPiBiLmFjdG9yID8gMSA6IGEuYWN0b3IgPCBiLmFjdG9yID8gLTEgOiAwO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIG11bHRpLWFjdGlvbiB0cmFuc2FjdGlvbiBzdXBwb3J0XG4gICAgICBpZiAoIW9wdGlvbk92ZXJyaWRlcy5tZXNzYWdlT25seSkge1xuICAgICAgICB0cmFuc2FjdGlvbkFyZyh0ciwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdHIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuUHJvbWlzZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAgVHJhbnNhY3Rpb24gTWVzc2FnZSBDb2xsZWN0b3JcbiAgICAgV3JhcCBtZXJnZS5mdW5jdGlvbnMgYWRkaW5nIG9wdGlvbk92ZXJyaWRlcyB0aGF0IHdpbGwgc3VzcGVuZFxuICAgIHRyYW5zYWN0aW9uIGJyb2FkY2FzdC5cbiAgKi9cbiAgZnVuY3Rpb24gdHJNZXNzYWdlQ29sbGVjdG9yKHRyQ2FsbGJhY2spIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIG1lcmdlcyA9IGFyZ3VtZW50c1syXTtcblxuICAgIGFzc2VydC5lcXVhbCgnZnVuY3Rpb24nLCB0eXBlb2YgdHJDYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KSh0ckNhbGxiYWNrKSwgJ3RyQ2FsbGJhY2snKTtcbiAgICBhc3NlcnQuZXF1YWwoJ29iamVjdCcsIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKG9wdGlvbnMpLCAnb3B0aW9ucycpO1xuICAgIGFzc2VydC5lcXVhbCgnb2JqZWN0JywgdHlwZW9mIG1lcmdlcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShtZXJnZXMpLCAnbWVyZ2VzJyk7XG4gICAgYXNzZXJ0KCFBcnJheS5pc0FycmF5KG1lcmdlcyksICdtZXJnZXMgc2hvdWxkIG5vdCBiZSBhbiBhcnJheScpO1xuICAgIGFzc2VydC5lcXVhbCgnZnVuY3Rpb24nLCB0eXBlb2YgdHJhbnNhY3Rpb24gPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkodHJhbnNhY3Rpb24pLCAndHJhbnNhY3Rpb24nKTtcblxuICAgIHZhciBtZXNzYWdlTGlzdCA9IFtdO1xuICAgIHZhciBtZXNzYWdlQ29sbGVjdG9yID0ge307XG5cbiAgICB2YXIgd3JhcCA9IGZ1bmN0aW9uIHdyYXAob3BGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxsIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBidXQgZm9yY2UtZGlzYWJsZSBhIGxvdCBvZiBzdHVmZlxuICAgICAgICB2YXIgcmV0ID0gb3BGdW5jdGlvbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MuY29uY2F0KFt7XG4gICAgICAgICAgX19vcHRpb25PdmVycmlkZXM6IHtcbiAgICAgICAgICAgIGJyb2FkY2FzdDogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlT25seTogdHJ1ZSxcbiAgICAgICAgICAgIG5vQ2FsbGJhY2s6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1dKSk7XG4gICAgICAgIGlmIChyZXQgPT0gbnVsbCkge1xuICAgICAgICAgIC8vIGRvdWJsZS1jaGVjayAoY29kZSBjYW4gY2hhbmdlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FsbGJhY2tzIGNhbiBub3QgYmUgdXNlZCB3aGVuIGNyZWF0aW5nIGEgbXVsdGktYWN0aW9uIHRyYW5zYWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZUxpc3QucHVzaChyZXQpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gbWVyZ2VzIGNhbiBiZSBhbiBvYmplY3Qgb2YgZnVuY3Rpb25zIChhcyBpbiB0aGUgbWFpbiBlb3MgY29udHJhY3QpXG4gICAgLy8gb3IgYW4gb2JqZWN0IG9mIGNvbnRyYWN0IG5hbWVzIHdpdGggZnVuY3Rpb25zIHVuZGVyIHRob3NlXG4gICAgZm9yICh2YXIga2V5IGluIG1lcmdlcykge1xuICAgICAgdmFyIHZhbHVlID0gbWVyZ2VzW2tleV07XG4gICAgICB2YXIgdmFyaWFibGVOYW1lID0ga2V5LnJlcGxhY2UoL1xcLi8sICdfJyk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIE5hdGl2ZSBvcGVyYXRpb25zIChlb3MgY29udHJhY3QgZm9yIGV4YW1wbGUpXG4gICAgICAgIG1lc3NhZ2VDb2xsZWN0b3JbdmFyaWFibGVOYW1lXSA9IHdyYXAodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIG90aGVyIGNvbnRyYWN0KHMpIChjdXJyZW5jeSBjb250cmFjdCBmb3IgZXhhbXBsZSlcbiAgICAgICAgaWYgKG1lc3NhZ2VDb2xsZWN0b3JbdmFyaWFibGVOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgbWVzc2FnZUNvbGxlY3Rvclt2YXJpYWJsZU5hbWVdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIga2V5MiBpbiB2YWx1ZSkge1xuICAgICAgICAgIGlmIChrZXkyID09PSAndHJhbnNhY3Rpb24nKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVzc2FnZUNvbGxlY3Rvclt2YXJpYWJsZU5hbWVdW2tleTJdID0gd3JhcCh2YWx1ZVtrZXkyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZUNvbGxlY3RvciA9IHZvaWQgMDtcbiAgICB0cnkge1xuICAgICAgLy8gY2FsbGVyIHdpbGwgbG9hZCB0aGlzIHVwIHdpdGggYWN0aW9uc1xuICAgICAgcHJvbWlzZUNvbGxlY3RvciA9IHRyQ2FsbGJhY2sobWVzc2FnZUNvbGxlY3Rvcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHByb21pc2VDb2xsZWN0b3IgPSBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9taXNlQ29sbGVjdG9yKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChtZXNzYWdlTGlzdCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZWRNZXNzYWdlTGlzdCkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gcmVzb2x2ZWRNZXNzYWdlTGlzdFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIG0gPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgIHZhciBfbSRhY3Rpb25zID0gKDAsIF9zbGljZWRUb0FycmF5My5kZWZhdWx0KShtLmFjdGlvbnMsIDEpLFxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IF9tJGFjdGlvbnNbMF07XG5cbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gdHJ1ZTtcbiAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yNC5yZXR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyT2JqZWN0ID0ge307XG4gICAgICAgIHRyT2JqZWN0LmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb24odHJPYmplY3QsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2FjdGlvbihhcmcsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRlZmF1bHRFeHBpcmF0aW9uLCBvcHRpb25EZWZhdWx0LCByZXR1cm5Qcm9taXNlLCBzdXBlckNhbGxiYWNrLCByYXdUeCwgX2FyciwgX2ksIHR4RmllbGQsIHR4T2JqZWN0LCBidWYsIHRyLCB0cmFuc2FjdGlvbklkLCBzaWdzLCBjaGFpbklkQnVmLCBwYWNrZWRDb250ZXh0RnJlZURhdGEsIHNpZ25CdWY7XG5cbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yMi5kZWZhdWx0LmFzeW5jKGZ1bmN0aW9uIHRyYW5zYWN0aW9uJChfY29udGV4dDQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGRlZmF1bHRFeHBpcmF0aW9uID0gY29uZmlnLmV4cGlyZUluU2Vjb25kcyA/IGNvbmZpZy5leHBpcmVJblNlY29uZHMgOiA2MDtcbiAgICAgICAgICAgIG9wdGlvbkRlZmF1bHQgPSB7IGV4cGlyZUluU2Vjb25kczogZGVmYXVsdEV4cGlyYXRpb24sIGJyb2FkY2FzdDogdHJ1ZSwgc2lnbjogdHJ1ZSB9O1xuXG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSAvKmNsb25lKi8sIG9wdGlvbkRlZmF1bHQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm5Qcm9taXNlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHJldHVyblByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoKHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoYXJnKSkgIT09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCB0cmFuc2FjdGlvbiBhcmd1bWVudCBzaG91bGQgYmUgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uJyk7XG5cbiAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcuYWN0aW9ucykpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0aW5nIGFjdGlvbnMgYXJyYXknKTtcblxuICAgICAgICAgIGNhc2UgOTpcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5sb2dnZXIubG9nIHx8IGNvbmZpZy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgLy8gd3JhcCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgbG9nZ2VyXG4gICAgICAgICAgICAgIHN1cGVyQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVycm9yLCB0cikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiBjb25maWcubG9nZ2VyLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBjb25maWcubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5sb2dnZXIubG9nKSB7XG4gICAgICAgICAgICAgICAgICBjb25maWcubG9nZ2VyLmxvZyhKU09OLnN0cmluZ2lmeSh0cikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdXBlckNhbGxiYWNrKGVycm9yLCB0cik7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFyZy5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9uLmF1dGhvcml6YXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0aW5nIGFjdGlvbi5hdXRob3JpemF0aW9uIGFycmF5JywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMuc2lnbiAmJiB0eXBlb2YgY29uZmlnLnNpZ25Qcm92aWRlciAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAxMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGluZyBjb25maWcuc2lnblByb3ZpZGVyIGZ1bmN0aW9uIChkaXNhYmxlIHVzaW5nIHtzaWduOiBmYWxzZX0pJyk7XG5cbiAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgcmF3VHggPSB7XG4gICAgICAgICAgICAgIG1heF9uZXRfdXNhZ2Vfd29yZHM6IDAsXG4gICAgICAgICAgICAgIG1heF9jcHVfdXNhZ2VfbXM6IDAsXG4gICAgICAgICAgICAgIGRlbGF5X3NlYzogMCxcbiAgICAgICAgICAgICAgY29udGV4dF9mcmVlX2FjdGlvbnM6IFtdLFxuICAgICAgICAgICAgICBhY3Rpb25zOiBbXSxcbiAgICAgICAgICAgICAgc2lnbmF0dXJlczogW10sXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uX2V4dGVuc2lvbnM6IFtdXG5cbiAgICAgICAgICAgICAgLy8gZ2xvYmFsIHRyYW5zYWN0aW9uIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghY29uZmlnLnRyYW5zYWN0aW9uSGVhZGVycykge1xuICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDI1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNvbmZpZy50cmFuc2FjdGlvbkhlYWRlcnMpID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAxOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmF3VHgsIGNvbmZpZy50cmFuc2FjdGlvbkhlYWRlcnMpO1xuICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyNTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICAgIGlmICghKHR5cGVvZiBjb25maWcudHJhbnNhY3Rpb25IZWFkZXJzID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDI0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyMjtcbiAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3IyLmRlZmF1bHQuYXdyYXAoY29uZmlnLnRyYW5zYWN0aW9uSGVhZGVycyhvcHRpb25zLmV4cGlyZUluU2Vjb25kcywgY2hlY2tFcnJvcihjYWxsYmFjaywgY29uZmlnLmxvZ2dlciwgZnVuY3Rpb24gX2NhbGxlZTIoaGVhZGVycykge1xuICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yMi5kZWZhdWx0LmFzeW5jKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGhlYWRlcnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoaGVhZGVycyksICdvYmplY3QnLCAnZXhwZWN0aW5nIHRyYW5zYWN0aW9uIGhlYWRlciBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJhd1R4LCBoZWFkZXJzKTtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LCBudWxsLCB0aGlzKTtcbiAgICAgICAgICAgIH0pKSk7XG5cbiAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyNTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgJ2NvbmZpZy50cmFuc2FjdGlvbkhlYWRlcnMgc2hvdWxkIGJlIGFuIG9iamVjdCBvciBmdW5jdGlvbicpO1xuXG4gICAgICAgICAgY2FzZSAyNTpcblxuICAgICAgICAgICAgLy8gcGVyIHRyYW5zYWN0aW9uIGhlYWRlcnNcbiAgICAgICAgICAgIF9hcnIgPSBbJ2V4cGlyYXRpb24nLCAncmVmX2Jsb2NrX251bScsICdyZWZfYmxvY2tfcHJlZml4JywgJ2RlbGF5X3NlYycsICdtYXhfbmV0X3VzYWdlX3dvcmRzJywgJ21heF9jcHVfdXNhZ2VfbXMnXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwOyBfaSA8IF9hcnIubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgIHR4RmllbGQgPSBfYXJyW19pXTtcblxuICAgICAgICAgICAgICBpZiAoYXJnW3R4RmllbGRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBlb3MudHJhbnNhY3Rpb24oJ2Vvc2lvJywgZW9zaW8gPT4geyBlb3Npby5teWFjdGlvbiguLikgfSwge2RlbGF5X3NlYzogMzY5fSlcbiAgICAgICAgICAgICAgICAvLyBlb3MudHJhbnNhY3Rpb24oe2RlbGF5X3NlYzogMzY5LCBhY3Rpb25zOiBbLi4uXX0pXG4gICAgICAgICAgICAgICAgcmF3VHhbdHhGaWVsZF0gPSBhcmdbdHhGaWVsZF07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uc1t0eEZpZWxkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gZW9zLnRyYW5zYWN0aW9uKHRyID0+IHt0ci50cmFuc2ZlciguLi4pfSwge2RlbGF5X3NlYzogMzY5fSlcbiAgICAgICAgICAgICAgICByYXdUeFt0eEZpZWxkXSA9IG9wdGlvbnNbdHhGaWVsZF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZW9zanMgY2FsY3VhbHRlZCBoZWFkZXJzXG5cbiAgICAgICAgICAgIGlmICghKCAvLyBtaW5pbXVtIHJlcXVpcmVkIGhlYWRlcnNcbiAgICAgICAgICAgIHJhd1R4LmV4cGlyYXRpb24gPT09IHVuZGVmaW5lZCB8fCByYXdUeC5yZWZfYmxvY2tfbnVtID09PSB1bmRlZmluZWQgfHwgcmF3VHgucmVmX2Jsb2NrX3ByZWZpeCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDMxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXNzZXJ0KG5ldHdvcmssICdOZXR3b3JrIGlzIHJlcXVpcmVkLCBwcm92aWRlIGh0dHBFbmRwb2ludCBvciBvd24gdHJhbnNhY3Rpb24gaGVhZGVycycpO1xuICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAzMTtcbiAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3IyLmRlZmF1bHQuYXdyYXAobmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgbmV0d29yay5jcmVhdGVUcmFuc2FjdGlvbihvcHRpb25zLmV4cGlyZUluU2Vjb25kcywgY2hlY2tFcnJvcihjYWxsYmFjaywgY29uZmlnLmxvZ2dlciwgZnVuY3Rpb24gX2NhbGxlZTMoaGVhZGVycykge1xuICAgICAgICAgICAgICAgIHZhciBfYXJyMiwgX2kyLCB0eEZpZWxkO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC5hc3luYyhmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYXJyMiA9IFsnZXhwaXJhdGlvbicsICdyZWZfYmxvY2tfbnVtJywgJ3JlZl9ibG9ja19wcmVmaXgnXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfaTIgPSAwOyBfaTIgPCBfYXJyMi5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR4RmllbGQgPSBfYXJyMltfaTJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR4RmllbGQsIGhlYWRlcnNbdHhGaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF3VHhbdHhGaWVsZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd1R4W3R4RmllbGRdID0gaGVhZGVyc1t0eEZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBjYXNlIDMxOlxuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmF3VHgnLCByYXdUeClcblxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKCgwLCBfdHlwZW9mMy5kZWZhdWx0KShyYXdUeC5leHBpcmF0aW9uKSwgJ3N0cmluZycsICdleHBlY3RpbmcgZXhwaXJhdGlvbjogaXNvIGRhdGUgdGltZSBzdHJpbmcnKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbCgoMCwgX3R5cGVvZjMuZGVmYXVsdCkocmF3VHgucmVmX2Jsb2NrX251bSksICdudW1iZXInLCAnZXhwZWN0aW5nIHJlZl9ibG9ja19udW0gbnVtYmVyJyk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoKDAsIF90eXBlb2YzLmRlZmF1bHQpKHJhd1R4LnJlZl9ibG9ja19wcmVmaXgpLCAnbnVtYmVyJywgJ2V4cGVjdGluZyByZWZfYmxvY2tfcHJlZml4IG51bWJlcicpO1xuXG4gICAgICAgICAgICByYXdUeC5jb250ZXh0X2ZyZWVfYWN0aW9ucyA9IGFyZy5jb250ZXh0X2ZyZWVfYWN0aW9ucztcbiAgICAgICAgICAgIHJhd1R4LmFjdGlvbnMgPSBhcmcuYWN0aW9ucztcbiAgICAgICAgICAgIHJhd1R4LnRyYW5zYWN0aW9uX2V4dGVuc2lvbnMgPSBhcmcudHJhbnNhY3Rpb25fZXh0ZW5zaW9ucztcblxuICAgICAgICAgICAgLy8gUmVzb2x2ZSBzaG9ydGhhbmRcbiAgICAgICAgICAgIHR4T2JqZWN0ID0gVHJhbnNhY3Rpb24uZnJvbU9iamVjdChyYXdUeCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndHhPYmplY3QnLCB0eE9iamVjdClcblxuICAgICAgICAgICAgYnVmID0gRmNidWZmZXIudG9CdWZmZXIoVHJhbnNhY3Rpb24sIHR4T2JqZWN0KTtcbiAgICAgICAgICAgIHRyID0gVHJhbnNhY3Rpb24udG9PYmplY3QodHhPYmplY3QpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25JZCA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShidWYpLmRpZ2VzdCgpLnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgICAgICAgIHNpZ3MgPSBbXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2lnbikge1xuICAgICAgICAgICAgICBjaGFpbklkQnVmID0gQnVmZmVyLmZyb20oY29uZmlnLmNoYWluSWQsICdoZXgnKTtcbiAgICAgICAgICAgICAgcGFja2VkQ29udGV4dEZyZWVEYXRhID0gQnVmZmVyLmZyb20obmV3IFVpbnQ4QXJyYXkoMzIpKTsgLy8gVE9ET1xuXG4gICAgICAgICAgICAgIHNpZ25CdWYgPSBCdWZmZXIuY29uY2F0KFtjaGFpbklkQnVmLCBidWYsIHBhY2tlZENvbnRleHRGcmVlRGF0YV0pO1xuXG5cbiAgICAgICAgICAgICAgc2lncyA9IGNvbmZpZy5zaWduUHJvdmlkZXIoeyB0cmFuc2FjdGlvbjogdHIsIGJ1Zjogc2lnbkJ1Ziwgc2lnbjogc2lnbixcbiAgICAgICAgICAgICAgICBvcHRpb25zS2V5UHJvdmlkZXI6IG9wdGlvbnMua2V5UHJvdmlkZXIgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNpZ3MpKSB7XG4gICAgICAgICAgICAgICAgc2lncyA9IFtzaWdzXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzaWdzIGNhbiBiZSBzdHJpbmdzIG9yIFByb21pc2VzXG4gICAgICAgICAgICBQcm9taXNlLmFsbChzaWdzKS50aGVuKGZ1bmN0aW9uIChzaWdzKSB7XG4gICAgICAgICAgICAgIHNpZ3MgPSBbXS5jb25jYXQuYXBwbHkoW10sIHNpZ3MpOyAvLyBmbGF0dGVuIGFycmF5cyBpbiBhcnJheVxuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzaWcgPSBzaWdzW2ldO1xuICAgICAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSAoaGV4IHRvIGJhc2U1OCBmb3JtYXQgZm9yIGV4YW1wbGUpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzaWcgPT09ICdzdHJpbmcnICYmIHNpZy5sZW5ndGggPT09IDEzMCkge1xuICAgICAgICAgICAgICAgICAgc2lnc1tpXSA9IGVjYy5TaWduYXR1cmUuZnJvbShzaWcpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIHBhY2tlZFRyID0ge1xuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyLFxuICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ3NcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICB2YXIgbW9jayA9IGNvbmZpZy5tb2NrVHJhbnNhY3Rpb25zID8gY29uZmlnLm1vY2tUcmFuc2FjdGlvbnMoKSA6IG51bGw7XG4gICAgICAgICAgICAgIGlmIChtb2NrICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoL3Bhc3N8ZmFpbC8udGVzdChtb2NrKSwgJ21vY2tUcmFuc2FjdGlvbnMgc2hvdWxkIHJldHVybiBhIHN0cmluZzogcGFzcyBvciBmYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKG1vY2sgPT09ICdwYXNzJykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbl9pZDogdHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgbW9ja1RyYW5zYWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogcGFja2VkVHJcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9jayA9PT0gJ2ZhaWwnKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAnW3B1c2hfdHJhbnNhY3Rpb24gbW9jayBlcnJvcl0gXFwnZmFrZSBlcnJvclxcJywgZGlnZXN0IFxcJycgKyBidWYudG9TdHJpbmcoJ2hleCcpICsgJ1xcJyc7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChjb25maWcubG9nZ2VyLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghb3B0aW9ucy5icm9hZGNhc3QgfHwgIW5ldHdvcmspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbl9pZDogdHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogcGFja2VkVHJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2hUcmFuc2FjdGlvbihwYWNrZWRUciwgZnVuY3Rpb24gKGVycm9yLCBwcm9jZXNzZWRUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHBhY2tlZFRyLFxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uX2lkOiB0cmFuc2FjdGlvbklkXG4gICAgICAgICAgICAgICAgICAgIH0sIHByb2Nlc3NlZFRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sb2dnZXIuZXJyb3IoJ1twdXNoX3RyYW5zYWN0aW9uIGVycm9yXSBcXCcnICsgZXJyb3IubWVzc2FnZSArICdcXCcsIHRyYW5zYWN0aW9uIFxcJycgKyBidWYudG9TdHJpbmcoJ2hleCcpICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGNvbmZpZy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25maWcubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KCdyZXR1cm4nLCByZXR1cm5Qcm9taXNlKTtcblxuICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgbnVsbCwgdGhpcyk7XG4gIH1cblxuICAvLyByZXR1cm4gV3JpdGVBcGlcbiAgcmV0dXJuIHtcbiAgICBnZW5UcmFuc2FjdGlvbjogZ2VuVHJhbnNhY3Rpb24sXG4gICAgZ2VuQ29udHJhY3RBY3Rpb25zOiBnZW5Db250cmFjdEFjdGlvbnMsXG4gICAgZ2VuTWV0aG9kOiBnZW5NZXRob2RcbiAgfTtcbn1cblxudmFyIGlzU3RyaW5nQXJyYXkgPSBmdW5jdGlvbiBpc1N0cmluZ0FycmF5KG8pIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobykgJiYgby5sZW5ndGggPiAwICYmIG8uZmluZEluZGV4KGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvICE9PSAnc3RyaW5nJztcbiAgfSkgPT09IC0xO1xufTtcblxuLy8gTm9ybWFsaXplIHRoZSBleHRyYSBvcHRpb25hbCBvcHRpb25zIGFyZ3VtZW50XG52YXIgb3B0aW9uc0Zvcm1hdHRlciA9IGZ1bmN0aW9uIG9wdGlvbnNGb3JtYXR0ZXIob3B0aW9uKSB7XG4gIGlmICgodHlwZW9mIG9wdGlvbiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShvcHRpb24pKSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0aW9uOyAvLyB7ZGVidWcsIGJyb2FkY2FzdCwgZXRjfSAoZXRjIG15IG92ZXJ3cml0ZSB0ciBiZWxvdylcbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gYnJvYWRjYXN0IGFyZ3VtZW50IGFzIGEgdHJ1ZSBmYWxzZSB2YWx1ZSwgYmFjay1lbmQgY2xpIHdpbGwgdXNlIHRoaXMgc2hvcnRoYW5kXG4gICAgcmV0dXJuIHsgYnJvYWRjYXN0OiBvcHRpb24gfTtcbiAgfVxufTtcblxuZnVuY3Rpb24gdXNhZ2UoYWN0aW9uLCBkZWZpbml0aW9uLCBOZXR3b3JrLCBhY2NvdW50LCBjb25maWcpIHtcbiAgdmFyIHVzYWdlID0gJyc7XG4gIHZhciBvdXQgPSBmdW5jdGlvbiBvdXQoKSB7XG4gICAgdmFyIHN0ciA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG5cbiAgICB1c2FnZSArPSBzdHIgKyAnXFxuJztcbiAgfTtcbiAgb3V0KCdDT05UUkFDVCcpO1xuICBvdXQoYWNjb3VudCk7XG4gIG91dCgpO1xuXG4gIG91dCgnQUNUSU9OJyk7XG4gIG91dChhY3Rpb24ubmFtZSk7XG4gIG91dCgpO1xuXG4gIHZhciBjYWNoZSA9IGNvbmZpZy5hYmlDYWNoZS5hYmkoYWNjb3VudCk7XG5cbiAgb3V0KCdQQVJBTUVURVJTJyk7XG4gIG91dChKU09OLnN0cmluZ2lmeShzY2hlbWFGaWVsZHMoY2FjaGUuc2NoZW1hLCBhY3Rpb24udHlwZSksIG51bGwsIDQpKTtcbiAgb3V0KCk7XG5cbiAgdmFyIHN0cnVjdCA9IGNhY2hlLnN0cnVjdHNbYWN0aW9uLnR5cGVdO1xuXG4gIG91dCgnRVhBTVBMRScpO1xuICBvdXQoYWNjb3VudCArICcuJyArIGFjdGlvbi5uYW1lICsgJygnICsgSlNPTi5zdHJpbmdpZnkoc3RydWN0LnRvT2JqZWN0KCksIG51bGwsIDQpICsgJyknKTtcblxuICByZXR1cm4gdXNhZ2U7XG59XG5cbnZhciBjaGVja0Vycm9yID0gZnVuY3Rpb24gY2hlY2tFcnJvcihwYXJlbnRFcnIsIGxvZ2dlciwgcGFycmVudFJlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlmIChsb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdlcnJvcicsIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudEVycihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShwYXJyZW50UmVzKHJlc3VsdCkpLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBwYXJlbnRFcnIoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcblxuLyoqIENvbGxhcHNlIGluaGVyaXRhbmNlICh2aWEgXCJiYXNlXCIpIHB1dHRpbmcgYWxsIHRoZSBmaWVsZHMgaW4gb25lIG9iamVjdC4gKi9cbmZ1bmN0aW9uIHNjaGVtYUZpZWxkcyhzY2hlbWEsIHR5cGUpIHtcbiAgdmFyIF9zY2hlbWEkdHlwZSA9IHNjaGVtYVt0eXBlXSxcbiAgICAgIGJhc2UgPSBfc2NoZW1hJHR5cGUuYmFzZSxcbiAgICAgIGZpZWxkcyA9IF9zY2hlbWEkdHlwZS5maWVsZHM7XG5cbiAgdmFyIGRlZiA9IHt9O1xuICBpZiAoYmFzZSAmJiBiYXNlICE9PSAnJykge1xuICAgIE9iamVjdC5hc3NpZ24oZGVmLCBzY2hlbWFGaWVsZHMoc2NoZW1hLCBiYXNlKSk7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihkZWYsIGZpZWxkcyk7XG4gIHJldHVybiBkZWY7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaWduKG51bWJlcikge1xuXHRyZXR1cm4gbnVtYmVyID49IDAgPyAxIDogLTE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mJyk7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgU3RydWN0cyA9IHJlcXVpcmUoJy4vc3RydWN0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFiaUNhY2hlO1xuXG5mdW5jdGlvbiBBYmlDYWNoZShuZXR3b3JrLCBjb25maWcpIHtcbiAgY29uZmlnLmFiaUNhY2hlID0ge1xuICAgIGFiaUFzeW5jOiBhYmlBc3luYyxcbiAgICBhYmk6IGFiaVxuXG4gICAgLy8gSGVscCAob3IgXCJ1c2FnZVwiKSBuZWVkcyB7ZGVmYXVsdHM6IHRydWV9XG4gIH07dmFyIGFiaUNhY2hlQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgeyBkZWZhdWx0czogdHJ1ZSB9LCBjb25maWcpO1xuXG4gIHZhciBjYWNoZSA9IHt9O1xuXG4gIC8qKlxuICAgIEFzeW5jaHJvbm91c2x5IGZldGNoIGFuZCBjYWNoZSBhbiBBQkkgZnJvbSB0aGUgYmxvY2tjaGFpbi5cbiAgICAgQGFyZyB7c3RyaW5nfSBhY2NvdW50IC0gYmxvY2tjaGFpbiBhY2NvdW50IHdpdGggZGVwbG95ZWQgY29udHJhY3RcbiAgICBAYXJnIHtib29sZWFufSBbZm9yY2UgPSB0cnVlXSBmYWxzZSB3aGVuIEFCSSBpcyBpbW11dGFibGUuXG4gICovXG4gIGZ1bmN0aW9uIGFiaUFzeW5jKGFjY291bnQpIHtcbiAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGFjY291bnQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoYWNjb3VudCksICdzdHJpbmcnLCAnYWNjb3VudCBzdHJpbmcgcmVxdWlyZWQnKTtcblxuICAgIGlmIChmb3JjZSA9PSBmYWxzZSAmJiBjYWNoZVthY2NvdW50XSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNhY2hlW2FjY291bnRdKTtcbiAgICB9XG5cbiAgICBpZiAobmV0d29yayA9PSBudWxsKSB7XG4gICAgICB2YXIgX2FiaSA9IGNhY2hlW2FjY291bnRdO1xuICAgICAgYXNzZXJ0KF9hYmksICdNaXNzaW5nIEFCSSBmb3IgYWNjb3VudDogJyArIGFjY291bnQgKyAnLCBwcm92aWRlIGh0dHBFbmRwb2ludCBvciBhZGQgdG8gYWJpQ2FjaGUnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX2FiaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldHdvcmsuZ2V0QWJpKGFjY291bnQpLnRoZW4oZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgIGFzc2VydChjb2RlLmFiaSwgJ01pc3NpbmcgQUJJIGZvciBhY2NvdW50OiAnICsgYWNjb3VudCk7XG4gICAgICByZXR1cm4gYWJpKGFjY291bnQsIGNvZGUuYWJpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgIFN5bmNocm9ub3VzbHkgc2V0IG9yIGZldGNoIGFuIEFCSSBmcm9tIGxvY2FsIGNhY2hlLlxuICAgICBAYXJnIHtzdHJpbmd9IGFjY291bnQgLSBibG9ja2NoYWluIGFjY291bnQgd2l0aCBkZXBsb3llZCBjb250cmFjdFxuICAgIEBhcmcge3N0cmluZ30gW2FiaV0gLSBibG9ja2NoYWluIEFCSSBqc29uIGRhdGEuICBOdWxsIHRvIGZldGNoIG9yIG5vbi1udWxsIHRvIGNhY2hlXG4gICovXG4gIGZ1bmN0aW9uIGFiaShhY2NvdW50LCBhYmkpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGFjY291bnQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoYWNjb3VudCksICdzdHJpbmcnLCAnYWNjb3VudCBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICBpZiAoYWJpKSB7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGFiaSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShhYmkpLCAnb2JqZWN0JywgJ2FiaScpO1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihhYmkpKSB7XG4gICAgICAgIGFiaSA9IEpTT04ucGFyc2UoYWJpKTtcbiAgICAgIH1cbiAgICAgIHZhciBmY1NjaGVtYSA9IGFiaVRvRmNTY2hlbWEoYWJpLCBhY2NvdW50KTtcbiAgICAgIHZhciBzdHJ1Y3RzID0gU3RydWN0cyhhYmlDYWNoZUNvbmZpZywgZmNTY2hlbWEpOyAvLyByZXR1cm5zIHtzdHJ1Y3RzLCB0eXBlc31cbiAgICAgIHJldHVybiBjYWNoZVthY2NvdW50XSA9IE9iamVjdC5hc3NpZ24oeyBhYmk6IGFiaSwgc2NoZW1hOiBmY1NjaGVtYSB9LCBzdHJ1Y3RzKTtcbiAgICB9XG4gICAgdmFyIGMgPSBjYWNoZVthY2NvdW50XTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FiaSBcXCcnICsgYWNjb3VudCArICdcXCcgaXMgbm90IGNhY2hlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIHJldHVybiBjb25maWcuYWJpQ2FjaGU7XG59XG5cbmZ1bmN0aW9uIGFiaVRvRmNTY2hlbWEoYWJpLCBhY2NvdW50KSB7XG4gIC8vIGN1c3RvbVR5cGVzXG4gIC8vIEZvciBGY0J1ZmZlclxuICB2YXIgYWJpU2NoZW1hID0ge307XG5cbiAgLy8gY29udmVydCBhYmkgdHlwZXMgdG8gRmNidWZmZXIgc2NoZW1hXG4gIGlmIChhYmkudHlwZXMpIHtcbiAgICAvLyBhbGlhc2VzXG4gICAgYWJpLnR5cGVzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vIFwiYWNjb3VudF9uYW1lXCIgPSBcIm5hbWVcIlxuICAgICAgYWJpU2NoZW1hW2UubmV3X3R5cGVfbmFtZV0gPSBlLnR5cGU7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoYWJpLnN0cnVjdHMpIHtcbiAgICAvLyB0cmFuc2FjdGlvbl9oZWFkZXIgPSBmaWVsZHNbYWN0b3IsIHBlcm1pc3Npb25dIGV4dGVuZHMgYmFzZSBcInRyYW5zYWN0aW9uXCJcbiAgICBhYmkuc3RydWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgZmllbGRzID0ge307XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gZS5maWVsZHNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGZpZWxkID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBmaWVsZHNbZmllbGQubmFtZV0gPSBmaWVsZC50eXBlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWJpU2NoZW1hW2UubmFtZV0gPSB7IGJhc2U6IGUuYmFzZSwgZmllbGRzOiBmaWVsZHMgfTtcbiAgICAgIGlmIChlLmJhc2UgPT09ICcnKSB7XG4gICAgICAgIGRlbGV0ZSBhYmlTY2hlbWFbZS5uYW1lXS5iYXNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGFiaS5hY3Rpb25zKSB7XG4gICAgLy8gc2V0cHJvZHMgPSBzZXRfcHJvZHVjZXJzXG4gICAgYWJpLmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAvLyBAZXhhbXBsZSBhY3Rpb24gPSB7bmFtZTogJ3NldHByb2RzJywgdHlwZTogJ3NldF9wcm9kdWNlcnMnfVxuICAgICAgdmFyIHR5cGUgPSBhYmlTY2hlbWFbYWN0aW9uLnR5cGVdO1xuICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgYWJpU2NoZW1hIHR5cGUnLCBhY3Rpb24udHlwZSwgYWNjb3VudCk7IC8vLCBhYmksIGFiaVNjaGVtYSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUuYWN0aW9uID0ge1xuICAgICAgICAgIG5hbWU6IGFjdGlvbi5uYW1lLFxuICAgICAgICAgIGFjY291bnQ6IGFjY291bnRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZygnYWJpU2NoZW1hJywgYWJpU2NoZW1hKTtcbiAgfVxuXG4gIHJldHVybiBhYmlTY2hlbWE7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGVjZHNhID0gcmVxdWlyZSgnLi9lY2RzYScpO1xudmFyIGhhc2ggPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBjdXJ2ZSA9IHJlcXVpcmUoJ2VjdXJ2ZScpLmdldEN1cnZlQnlOYW1lKCdzZWNwMjU2azEnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciBCaWdJbnRlZ2VyID0gcmVxdWlyZSgnYmlnaScpO1xudmFyIGtleVV0aWxzID0gcmVxdWlyZSgnLi9rZXlfdXRpbHMnKTtcbnZhciBQdWJsaWNLZXkgPSByZXF1aXJlKCcuL2tleV9wdWJsaWMnKTtcbnZhciBQcml2YXRlS2V5ID0gcmVxdWlyZSgnLi9rZXlfcHJpdmF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hdHVyZTtcblxuZnVuY3Rpb24gU2lnbmF0dXJlKHIsIHMsIGkpIHtcbiAgICBhc3NlcnQuZXF1YWwociAhPSBudWxsLCB0cnVlLCAnTWlzc2luZyBwYXJhbWV0ZXInKTtcbiAgICBhc3NlcnQuZXF1YWwocyAhPSBudWxsLCB0cnVlLCAnTWlzc2luZyBwYXJhbWV0ZXInKTtcbiAgICBhc3NlcnQuZXF1YWwoaSAhPSBudWxsLCB0cnVlLCAnTWlzc2luZyBwYXJhbWV0ZXInKTtcblxuICAgIC8qKlxuICAgICAgICBWZXJpZnkgc2lnbmVkIGRhdGEuXG4gICAgICAgICBAYXJnIHtTdHJpbmd8QnVmZmVyfSBkYXRhIC0gZnVsbCBkYXRhXG4gICAgICAgIEBhcmcge3B1YmtleXxQdWJsaWNLZXl9IHB1YmtleSAtIEVPU0tleS4uXG4gICAgICAgIEBhcmcge1N0cmluZ30gW2VuY29kaW5nID0gJ3V0ZjgnXSAtIGRhdGEgZW5jb2RpbmcgKGlmIGRhdGEgaXMgYSBzdHJpbmcpXG4gICAgICAgICBAcmV0dXJuIHtib29sZWFufVxuICAgICovXG4gICAgZnVuY3Rpb24gdmVyaWZ5KGRhdGEsIHB1YmtleSkge1xuICAgICAgICB2YXIgZW5jb2RpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICd1dGY4JztcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhID0gQnVmZmVyLmZyb20oZGF0YSwgZW5jb2RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydChCdWZmZXIuaXNCdWZmZXIoZGF0YSksICdkYXRhIGlzIGEgcmVxdWlyZWQgU3RyaW5nIG9yIEJ1ZmZlcicpO1xuICAgICAgICBkYXRhID0gaGFzaC5zaGEyNTYoZGF0YSk7XG4gICAgICAgIHJldHVybiB2ZXJpZnlIYXNoKGRhdGEsIHB1YmtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAgIFZlcmlmeSBhIGJ1ZmZlciBvZiBleGFjdGFsbHkgMzIgYnl0ZXMgaW4gc2l6ZSAoc2hhMjU2KHRleHQpKVxuICAgICAgICAgQGFyZyB7U3RyaW5nfEJ1ZmZlcn0gZGF0YVNoYTI1NiAtIDMyIGJ5dGUgYnVmZmVyIG9yIHN0cmluZ1xuICAgICAgICBAYXJnIHtTdHJpbmd8UHVibGljS2V5fSBwdWJrZXkgLSBFT1NLZXkuLlxuICAgICAgICBAYXJnIHtTdHJpbmd9IFtlbmNvZGluZyA9ICdoZXgnXSAtIGRhdGFTaGEyNTYgZW5jb2RpbmcgKGlmIHN0cmluZylcbiAgICAgICAgIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgKi9cbiAgICBmdW5jdGlvbiB2ZXJpZnlIYXNoKGRhdGFTaGEyNTYsIHB1YmtleSkge1xuICAgICAgICB2YXIgZW5jb2RpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICdoZXgnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVNoYTI1NiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFTaGEyNTYgPSBCdWZmZXIuZnJvbShkYXRhU2hhMjU2LCBlbmNvZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFTaGEyNTYubGVuZ3RoICE9PSAzMiB8fCAhQnVmZmVyLmlzQnVmZmVyKGRhdGFTaGEyNTYpKSB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhU2hhMjU2OiAzMiBieXRlcyByZXF1aXJlZFwiKTtcblxuICAgICAgICB2YXIgcHVibGljS2V5ID0gUHVibGljS2V5KHB1YmtleSk7XG4gICAgICAgIGFzc2VydChwdWJsaWNLZXksICdwdWJrZXkgcmVxdWlyZWQnKTtcblxuICAgICAgICByZXR1cm4gZWNkc2EudmVyaWZ5KGN1cnZlLCBkYXRhU2hhMjU2LCB7IHI6IHIsIHM6IHMgfSwgcHVibGljS2V5LlEpO1xuICAgIH07XG5cbiAgICAvKiogQGRlcHJlY2F0ZWRcbiAgICAgICAgIFZlcmlmeSBoZXggZGF0YSBieSBjb252ZXJ0aW5nIHRvIGEgYnVmZmVyIHRoZW4gaGFzaGluZy5cbiAgICAgICAgIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgKi9cbiAgICBmdW5jdGlvbiB2ZXJpZnlIZXgoaGV4LCBwdWJrZXkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlcHJlY2F0ZWQ6IHVzZSB2ZXJpZnkoZGF0YSwgcHVia2V5LCBcImhleFwiKScpO1xuXG4gICAgICAgIHZhciBidWYgPSBCdWZmZXIuZnJvbShoZXgsICdoZXgnKTtcbiAgICAgICAgcmV0dXJuIHZlcmlmeShidWYsIHB1YmtleSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAgICBSZWNvdmVyIHRoZSBwdWJsaWMga2V5IHVzZWQgdG8gY3JlYXRlIHRoaXMgc2lnbmF0dXJlIHVzaW5nIGZ1bGwgZGF0YS5cbiAgICAgICAgIEBhcmcge1N0cmluZ3xCdWZmZXJ9IGRhdGEgLSBmdWxsIGRhdGFcbiAgICAgICAgQGFyZyB7U3RyaW5nfSBbZW5jb2RpbmcgPSAndXRmOCddIC0gZGF0YSBlbmNvZGluZyAoaWYgc3RyaW5nKVxuICAgICAgICAgQHJldHVybiB7UHVibGljS2V5fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVjb3ZlcihkYXRhKSB7XG4gICAgICAgIHZhciBlbmNvZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ3V0ZjgnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0KEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSwgJ2RhdGEgaXMgYSByZXF1aXJlZCBTdHJpbmcgb3IgQnVmZmVyJyk7XG4gICAgICAgIGRhdGEgPSBoYXNoLnNoYTI1NihkYXRhKTtcblxuICAgICAgICByZXR1cm4gcmVjb3Zlckhhc2goZGF0YSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAgICBAYXJnIHtTdHJpbmd8QnVmZmVyfSBkYXRhU2hhMjU2IC0gc2hhMjU2IGhhc2ggMzIgYnl0ZSBidWZmZXIgb3IgaGV4IHN0cmluZ1xuICAgICAgICBAYXJnIHtTdHJpbmd9IFtlbmNvZGluZyA9ICdoZXgnXSAtIGRhdGFTaGEyNTYgZW5jb2RpbmcgKGlmIHN0cmluZylcbiAgICAgICAgIEByZXR1cm4ge1B1YmxpY0tleX1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlY292ZXJIYXNoKGRhdGFTaGEyNTYpIHtcbiAgICAgICAgdmFyIGVuY29kaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnaGV4JztcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGFTaGEyNTYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhU2hhMjU2ID0gQnVmZmVyLmZyb20oZGF0YVNoYTI1NiwgZW5jb2RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhU2hhMjU2Lmxlbmd0aCAhPT0gMzIgfHwgIUJ1ZmZlci5pc0J1ZmZlcihkYXRhU2hhMjU2KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YVNoYTI1NjogMzIgYnl0ZSBTdHJpbmcgb3IgYnVmZmVyIHJlcXVyZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZSA9IEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihkYXRhU2hhMjU2KTtcbiAgICAgICAgdmFyIGkyID0gaTtcbiAgICAgICAgaTIgLT0gMjc7XG4gICAgICAgIGkyID0gaTIgJiAzO1xuICAgICAgICB2YXIgUSA9IGVjZHNhLnJlY292ZXJQdWJLZXkoY3VydmUsIGUsIHsgcjogciwgczogcywgaTogaSB9LCBpMik7XG4gICAgICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbVBvaW50KFEpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0b0J1ZmZlcigpIHtcbiAgICAgICAgdmFyIGJ1ZjtcbiAgICAgICAgYnVmID0gbmV3IEJ1ZmZlcig2NSk7XG4gICAgICAgIGJ1Zi53cml0ZVVJbnQ4KGksIDApO1xuICAgICAgICByLnRvQnVmZmVyKDMyKS5jb3B5KGJ1ZiwgMSk7XG4gICAgICAgIHMudG9CdWZmZXIoMzIpLmNvcHkoYnVmLCAzMyk7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRvSGV4KCkge1xuICAgICAgICByZXR1cm4gdG9CdWZmZXIoKS50b1N0cmluZyhcImhleFwiKTtcbiAgICB9O1xuXG4gICAgdmFyIHNpZ25hdHVyZUNhY2hlID0gdm9pZCAwO1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIGlmIChzaWduYXR1cmVDYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpZ25hdHVyZUNhY2hlO1xuICAgICAgICB9XG4gICAgICAgIHNpZ25hdHVyZUNhY2hlID0gJ1NJR19LMV8nICsga2V5VXRpbHMuY2hlY2tFbmNvZGUodG9CdWZmZXIoKSwgJ0sxJyk7XG4gICAgICAgIHJldHVybiBzaWduYXR1cmVDYWNoZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByOiByLCBzOiBzLCBpOiBpLFxuICAgICAgICB0b0J1ZmZlcjogdG9CdWZmZXIsXG4gICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICB2ZXJpZnlIYXNoOiB2ZXJpZnlIYXNoLFxuICAgICAgICB2ZXJpZnlIZXg6IHZlcmlmeUhleCwgLy8gZGVwcmVjYXRlZFxuICAgICAgICByZWNvdmVyOiByZWNvdmVyLFxuICAgICAgICByZWNvdmVySGFzaDogcmVjb3Zlckhhc2gsXG4gICAgICAgIHRvSGV4OiB0b0hleCxcbiAgICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuXG4gICAgICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgdmVyaWZ5IChzYW1lIGFyZ3VtZW50cyBhbmQgcmV0dXJuKSAqL1xuICAgICAgICB2ZXJpZnlCdWZmZXI6IGZ1bmN0aW9uIHZlcmlmeUJ1ZmZlcigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXByZWNhdGVkOiB1c2Ugc2lnbmF0dXJlLnZlcmlmeSBpbnN0ZWFkIChzYW1lIGFyZ3VtZW50cyknKTtcbiAgICAgICAgICAgIHJldHVybiB2ZXJpZnkuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgcmVjb3ZlciAoc2FtZSBhcmd1bWVudHMgYW5kIHJldHVybikgKi9cbiAgICAgICAgcmVjb3ZlclB1YmxpY0tleTogZnVuY3Rpb24gcmVjb3ZlclB1YmxpY0tleSgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXByZWNhdGVkOiB1c2Ugc2lnbmF0dXJlLnJlY292ZXIgaW5zdGVhZCAoc2FtZSBhcmd1bWVudHMpJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3Zlci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIEBkZXByZWNhdGVkIHVzZSByZWNvdmVySGFzaCAoc2FtZSBhcmd1bWVudHMgYW5kIHJldHVybikgKi9cbiAgICAgICAgcmVjb3ZlclB1YmxpY0tleUZyb21CdWZmZXI6IGZ1bmN0aW9uIHJlY292ZXJQdWJsaWNLZXlGcm9tQnVmZmVyKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlcHJlY2F0ZWQ6IHVzZSBzaWduYXR1cmUucmVjb3Zlckhhc2ggaW5zdGVhZCAoc2FtZSBhcmd1bWVudHMpJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3Zlckhhc2guYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLyoqXG4gICAgSGFzaCBhbmQgc2lnbiBhcmJpdHJhcnkgZGF0YS5cblxuICAgIEBhcmcge3N0cmluZ3xCdWZmZXJ9IGRhdGEgLSBmdWxsIGRhdGFcbiAgICBAYXJnIHt3aWZ8UHJpdmF0ZUtleX0gcHJpdmF0ZUtleVxuICAgIEBhcmcge1N0cmluZ30gW2VuY29kaW5nID0gJ3V0ZjgnXSAtIGRhdGEgZW5jb2RpbmcgKGlmIHN0cmluZylcblxuICAgIEByZXR1cm4ge1NpZ25hdHVyZX1cbiovXG5TaWduYXR1cmUuc2lnbiA9IGZ1bmN0aW9uIChkYXRhLCBwcml2YXRlS2V5KSB7XG4gICAgdmFyIGVuY29kaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAndXRmOCc7XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XG4gICAgfVxuICAgIGFzc2VydChCdWZmZXIuaXNCdWZmZXIoZGF0YSksICdkYXRhIGlzIGEgcmVxdWlyZWQgU3RyaW5nIG9yIEJ1ZmZlcicpO1xuICAgIGRhdGEgPSBoYXNoLnNoYTI1NihkYXRhKTtcbiAgICByZXR1cm4gU2lnbmF0dXJlLnNpZ25IYXNoKGRhdGEsIHByaXZhdGVLZXkpO1xufTtcblxuLyoqXG4gICAgU2lnbiBhIGJ1ZmZlciBvZiBleGFjdGFsbHkgMzIgYnl0ZXMgaW4gc2l6ZSAoc2hhMjU2KHRleHQpKVxuXG4gICAgQGFyZyB7c3RyaW5nfEJ1ZmZlcn0gZGF0YVNoYTI1NiAtIDMyIGJ5dGUgYnVmZmVyIG9yIHN0cmluZ1xuICAgIEBhcmcge3dpZnxQcml2YXRlS2V5fSBwcml2YXRlS2V5XG4gICAgQGFyZyB7U3RyaW5nfSBbZW5jb2RpbmcgPSAnaGV4J10gLSBkYXRhU2hhMjU2IGVuY29kaW5nIChpZiBzdHJpbmcpXG5cbiAgICBAcmV0dXJuIHtTaWduYXR1cmV9XG4qL1xuU2lnbmF0dXJlLnNpZ25IYXNoID0gZnVuY3Rpb24gKGRhdGFTaGEyNTYsIHByaXZhdGVLZXkpIHtcbiAgICB2YXIgZW5jb2RpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICdoZXgnO1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhU2hhMjU2ID09PSAnc3RyaW5nJykge1xuICAgICAgICBkYXRhU2hhMjU2ID0gQnVmZmVyLmZyb20oZGF0YVNoYTI1NiwgZW5jb2RpbmcpO1xuICAgIH1cbiAgICBpZiAoZGF0YVNoYTI1Ni5sZW5ndGggIT09IDMyIHx8ICFCdWZmZXIuaXNCdWZmZXIoZGF0YVNoYTI1NikpIHRocm93IG5ldyBFcnJvcihcImRhdGFTaGEyNTY6IDMyIGJ5dGUgYnVmZmVyIHJlcXVyZWRcIik7XG5cbiAgICBwcml2YXRlS2V5ID0gUHJpdmF0ZUtleShwcml2YXRlS2V5KTtcbiAgICBhc3NlcnQocHJpdmF0ZUtleSwgJ3ByaXZhdGVLZXkgcmVxdWlyZWQnKTtcblxuICAgIHZhciBkZXIsIGUsIGVjc2lnbmF0dXJlLCBpLCBsZW5SLCBsZW5TLCBub25jZTtcbiAgICBpID0gbnVsbDtcbiAgICBub25jZSA9IDA7XG4gICAgZSA9IEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihkYXRhU2hhMjU2KTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBlY3NpZ25hdHVyZSA9IGVjZHNhLnNpZ24oY3VydmUsIGRhdGFTaGEyNTYsIHByaXZhdGVLZXkuZCwgbm9uY2UrKyk7XG4gICAgICAgIGRlciA9IGVjc2lnbmF0dXJlLnRvREVSKCk7XG4gICAgICAgIGxlblIgPSBkZXJbM107XG4gICAgICAgIGxlblMgPSBkZXJbNSArIGxlblJdO1xuICAgICAgICBpZiAobGVuUiA9PT0gMzIgJiYgbGVuUyA9PT0gMzIpIHtcbiAgICAgICAgICAgIGkgPSBlY2RzYS5jYWxjUHViS2V5UmVjb3ZlcnlQYXJhbShjdXJ2ZSwgZSwgZWNzaWduYXR1cmUsIHByaXZhdGVLZXkudG9QdWJsaWMoKS5RKTtcbiAgICAgICAgICAgIGkgKz0gNDsgLy8gY29tcHJlc3NlZFxuICAgICAgICAgICAgaSArPSAyNzsgLy8gY29tcGFjdCAgLy8gIDI0IG9yIDI3IDooIGZvcmNpbmcgb2RkLXkgMm5kIGtleSBjYW5kaWRhdGUpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9uY2UgJSAxMCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBcIiArIG5vbmNlICsgXCIgYXR0ZW1wdHMgdG8gZmluZCBjYW5vbmljYWwgc2lnbmF0dXJlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTaWduYXR1cmUoZWNzaWduYXR1cmUuciwgZWNzaWduYXR1cmUucywgaSk7XG59O1xuXG5TaWduYXR1cmUuZnJvbUJ1ZmZlciA9IGZ1bmN0aW9uIChidWYpIHtcbiAgICB2YXIgaSwgciwgcztcbiAgICBhc3NlcnQoQnVmZmVyLmlzQnVmZmVyKGJ1ZiksICdCdWZmZXIgaXMgcmVxdWlyZWQnKTtcbiAgICBhc3NlcnQuZXF1YWwoYnVmLmxlbmd0aCwgNjUsICdJbnZhbGlkIHNpZ25hdHVyZSBsZW5ndGgnKTtcbiAgICBpID0gYnVmLnJlYWRVSW50OCgwKTtcbiAgICBhc3NlcnQuZXF1YWwoaSAtIDI3LCBpIC0gMjcgJiA3LCAnSW52YWxpZCBzaWduYXR1cmUgcGFyYW1ldGVyJyk7XG4gICAgciA9IEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihidWYuc2xpY2UoMSwgMzMpKTtcbiAgICBzID0gQmlnSW50ZWdlci5mcm9tQnVmZmVyKGJ1Zi5zbGljZSgzMykpO1xuICAgIHJldHVybiBTaWduYXR1cmUociwgcywgaSk7XG59O1xuXG5TaWduYXR1cmUuZnJvbUhleCA9IGZ1bmN0aW9uIChoZXgpIHtcbiAgICByZXR1cm4gU2lnbmF0dXJlLmZyb21CdWZmZXIoQnVmZmVyLmZyb20oaGV4LCBcImhleFwiKSk7XG59O1xuXG4vKipcbiAgICBAYXJnIHtzdHJpbmd9IHNpZ25hdHVyZSAtIGxpa2UgU0lHX0sxX2Jhc2U1OHNpZ25hdHVyZS4uXG4gICAgQHJldHVybiB7U2lnbmF0dXJlfSBvciBgbnVsbGAgKGludmFsaWQpXG4qL1xuU2lnbmF0dXJlLmZyb21TdHJpbmcgPSBmdW5jdGlvbiAoc2lnbmF0dXJlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIFNpZ25hdHVyZS5mcm9tU3RyaW5nT3JUaHJvdyhzaWduYXR1cmUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gICAgQGFyZyB7c3RyaW5nfSBzaWduYXR1cmUgLSBsaWtlIFNJR19LMV9iYXNlNThzaWduYXR1cmUuLlxuICAgIEB0aHJvd3Mge0Vycm9yfSBpbnZhbGlkXG4gICAgQHJldHVybiB7U2lnbmF0dXJlfVxuKi9cblNpZ25hdHVyZS5mcm9tU3RyaW5nT3JUaHJvdyA9IGZ1bmN0aW9uIChzaWduYXR1cmUpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHNpZ25hdHVyZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc2lnbmF0dXJlKSwgJ3N0cmluZycsICdzaWduYXR1cmUnKTtcbiAgICB2YXIgbWF0Y2ggPSBzaWduYXR1cmUubWF0Y2goL15TSUdfKFtBLVphLXowLTldKylfKFtBLVphLXowLTldKykkLyk7XG4gICAgYXNzZXJ0KG1hdGNoICE9IG51bGwgJiYgbWF0Y2gubGVuZ3RoID09PSAzLCAnRXhwZWN0aW5nIHNpZ25hdHVyZSBsaWtlOiBTSUdfSzFfYmFzZTU4c2lnbmF0dXJlLi4nKTtcblxuICAgIHZhciBfbWF0Y2ggPSBfc2xpY2VkVG9BcnJheShtYXRjaCwgMyksXG4gICAgICAgIGtleVR5cGUgPSBfbWF0Y2hbMV0sXG4gICAgICAgIGtleVN0cmluZyA9IF9tYXRjaFsyXTtcblxuICAgIGFzc2VydC5lcXVhbChrZXlUeXBlLCAnSzEnLCAnSzEgc2lnbmF0dXJlIGV4cGVjdGVkJyk7XG4gICAgcmV0dXJuIFNpZ25hdHVyZS5mcm9tQnVmZmVyKGtleVV0aWxzLmNoZWNrRGVjb2RlKGtleVN0cmluZywga2V5VHlwZSkpO1xufTtcblxuLyoqXG4gICAgQGFyZyB7U3RyaW5nfFNpZ25hdHVyZX0gbyAtIGhleCBzdHJpbmdcbiAgICBAcmV0dXJuIHtTaWduYXR1cmV9XG4qL1xuU2lnbmF0dXJlLmZyb20gPSBmdW5jdGlvbiAobykge1xuICAgIHZhciBzaWduYXR1cmUgPSBvID8gby5yICYmIG8ucyAmJiBvLmkgPyBvIDogdHlwZW9mIG8gPT09ICdzdHJpbmcnICYmIG8ubGVuZ3RoID09PSAxMzAgPyBTaWduYXR1cmUuZnJvbUhleChvKSA6IHR5cGVvZiBvID09PSAnc3RyaW5nJyAmJiBvLmxlbmd0aCAhPT0gMTMwID8gU2lnbmF0dXJlLmZyb21TdHJpbmdPclRocm93KG8pIDogQnVmZmVyLmlzQnVmZmVyKG8pID8gU2lnbmF0dXJlLmZyb21CdWZmZXIobykgOiBudWxsIDogbzsgLypudWxsIG9yIHVuZGVmaW5lZCovXG5cbiAgICBpZiAoIXNpZ25hdHVyZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzaWduYXR1cmUgc2hvdWxkIGJlIGEgaGV4IHN0cmluZyBvciBidWZmZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpZ25hdHVyZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7IC8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JpdGNvaW5qcy9iaXRjb2luanMtbGliXG52YXIgZW5mb3JjZVR5cGUgPSByZXF1aXJlKCcuL2VuZm9yY2VfdHlwZXMnKTtcblxudmFyIEJpZ0ludGVnZXIgPSByZXF1aXJlKCdiaWdpJyk7XG5cbmZ1bmN0aW9uIEVDU2lnbmF0dXJlKHIsIHMpIHtcbiAgZW5mb3JjZVR5cGUoQmlnSW50ZWdlciwgcik7XG4gIGVuZm9yY2VUeXBlKEJpZ0ludGVnZXIsIHMpO1xuXG4gIGZ1bmN0aW9uIHRvQ29tcGFjdChpLCBjb21wcmVzc2VkKSB7XG4gICAgaWYgKGNvbXByZXNzZWQpIGkgKz0gNDtcbiAgICBpICs9IDI3O1xuXG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIoNjUpO1xuICAgIGJ1ZmZlci53cml0ZVVJbnQ4KGksIDApO1xuXG4gICAgci50b0J1ZmZlcigzMikuY29weShidWZmZXIsIDEpO1xuICAgIHMudG9CdWZmZXIoMzIpLmNvcHkoYnVmZmVyLCAzMyk7XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9ERVIoKSB7XG4gICAgdmFyIHJCYSA9IHIudG9ERVJJbnRlZ2VyKCk7XG4gICAgdmFyIHNCYSA9IHMudG9ERVJJbnRlZ2VyKCk7XG5cbiAgICB2YXIgc2VxdWVuY2UgPSBbXTtcblxuICAgIC8vIElOVEVHRVJcbiAgICBzZXF1ZW5jZS5wdXNoKDB4MDIsIHJCYS5sZW5ndGgpO1xuICAgIHNlcXVlbmNlID0gc2VxdWVuY2UuY29uY2F0KHJCYSk7XG5cbiAgICAvLyBJTlRFR0VSXG4gICAgc2VxdWVuY2UucHVzaCgweDAyLCBzQmEubGVuZ3RoKTtcbiAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlLmNvbmNhdChzQmEpO1xuXG4gICAgLy8gU0VRVUVOQ0VcbiAgICBzZXF1ZW5jZS51bnNoaWZ0KDB4MzAsIHNlcXVlbmNlLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzZXF1ZW5jZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b1NjcmlwdFNpZ25hdHVyZShoYXNoVHlwZSkge1xuICAgIHZhciBoYXNoVHlwZUJ1ZmZlciA9IG5ldyBCdWZmZXIoMSk7XG4gICAgaGFzaFR5cGVCdWZmZXIud3JpdGVVSW50OChoYXNoVHlwZSwgMCk7XG5cbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChbdG9ERVIoKSwgaGFzaFR5cGVCdWZmZXJdKTtcbiAgfVxuXG4gIHJldHVybiB7IHI6IHIsIHM6IHMsIHRvQ29tcGFjdDogdG9Db21wYWN0LCB0b0RFUjogdG9ERVIsIHRvU2NyaXB0U2lnbmF0dXJlOiB0b1NjcmlwdFNpZ25hdHVyZSB9O1xufVxuXG4vLyBJbXBvcnQgb3BlcmF0aW9uc1xuRUNTaWduYXR1cmUucGFyc2VDb21wYWN0ID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICBhc3NlcnQuZXF1YWwoYnVmZmVyLmxlbmd0aCwgNjUsICdJbnZhbGlkIHNpZ25hdHVyZSBsZW5ndGgnKTtcbiAgdmFyIGkgPSBidWZmZXIucmVhZFVJbnQ4KDApIC0gMjc7XG5cbiAgLy8gQXQgbW9zdCAzIGJpdHNcbiAgYXNzZXJ0LmVxdWFsKGksIGkgJiA3LCAnSW52YWxpZCBzaWduYXR1cmUgcGFyYW1ldGVyJyk7XG4gIHZhciBjb21wcmVzc2VkID0gISEoaSAmIDQpO1xuXG4gIC8vIFJlY292ZXJ5IHBhcmFtIG9ubHlcbiAgaSA9IGkgJiAzO1xuXG4gIHZhciByID0gQmlnSW50ZWdlci5mcm9tQnVmZmVyKGJ1ZmZlci5zbGljZSgxLCAzMykpO1xuICB2YXIgcyA9IEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihidWZmZXIuc2xpY2UoMzMpKTtcblxuICByZXR1cm4ge1xuICAgIGNvbXByZXNzZWQ6IGNvbXByZXNzZWQsXG4gICAgaTogaSxcbiAgICBzaWduYXR1cmU6IEVDU2lnbmF0dXJlKHIsIHMpXG4gIH07XG59O1xuXG5FQ1NpZ25hdHVyZS5mcm9tREVSID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICBhc3NlcnQuZXF1YWwoYnVmZmVyLnJlYWRVSW50OCgwKSwgMHgzMCwgJ05vdCBhIERFUiBzZXF1ZW5jZScpO1xuICBhc3NlcnQuZXF1YWwoYnVmZmVyLnJlYWRVSW50OCgxKSwgYnVmZmVyLmxlbmd0aCAtIDIsICdJbnZhbGlkIHNlcXVlbmNlIGxlbmd0aCcpO1xuICBhc3NlcnQuZXF1YWwoYnVmZmVyLnJlYWRVSW50OCgyKSwgMHgwMiwgJ0V4cGVjdGVkIGEgREVSIGludGVnZXInKTtcblxuICB2YXIgckxlbiA9IGJ1ZmZlci5yZWFkVUludDgoMyk7XG4gIGFzc2VydChyTGVuID4gMCwgJ1IgbGVuZ3RoIGlzIHplcm8nKTtcblxuICB2YXIgb2Zmc2V0ID0gNCArIHJMZW47XG4gIGFzc2VydC5lcXVhbChidWZmZXIucmVhZFVJbnQ4KG9mZnNldCksIDB4MDIsICdFeHBlY3RlZCBhIERFUiBpbnRlZ2VyICgyKScpO1xuXG4gIHZhciBzTGVuID0gYnVmZmVyLnJlYWRVSW50OChvZmZzZXQgKyAxKTtcbiAgYXNzZXJ0KHNMZW4gPiAwLCAnUyBsZW5ndGggaXMgemVybycpO1xuXG4gIHZhciByQiA9IGJ1ZmZlci5zbGljZSg0LCBvZmZzZXQpO1xuICB2YXIgc0IgPSBidWZmZXIuc2xpY2Uob2Zmc2V0ICsgMik7XG4gIG9mZnNldCArPSAyICsgc0xlbjtcblxuICBpZiAockxlbiA+IDEgJiYgckIucmVhZFVJbnQ4KDApID09PSAweDAwKSB7XG4gICAgYXNzZXJ0KHJCLnJlYWRVSW50OCgxKSAmIDB4ODAsICdSIHZhbHVlIGV4Y2Vzc2l2ZWx5IHBhZGRlZCcpO1xuICB9XG5cbiAgaWYgKHNMZW4gPiAxICYmIHNCLnJlYWRVSW50OCgwKSA9PT0gMHgwMCkge1xuICAgIGFzc2VydChzQi5yZWFkVUludDgoMSkgJiAweDgwLCAnUyB2YWx1ZSBleGNlc3NpdmVseSBwYWRkZWQnKTtcbiAgfVxuXG4gIGFzc2VydC5lcXVhbChvZmZzZXQsIGJ1ZmZlci5sZW5ndGgsICdJbnZhbGlkIERFUiBlbmNvZGluZycpO1xuICB2YXIgciA9IEJpZ0ludGVnZXIuZnJvbURFUkludGVnZXIockIpO1xuICB2YXIgcyA9IEJpZ0ludGVnZXIuZnJvbURFUkludGVnZXIoc0IpO1xuXG4gIGFzc2VydChyLnNpZ251bSgpID49IDAsICdSIHZhbHVlIGlzIG5lZ2F0aXZlJyk7XG4gIGFzc2VydChzLnNpZ251bSgpID49IDAsICdTIHZhbHVlIGlzIG5lZ2F0aXZlJyk7XG5cbiAgcmV0dXJuIEVDU2lnbmF0dXJlKHIsIHMpO1xufTtcblxuLy8gRklYTUU6IDB4MDAsIDB4MDQsIDB4ODAgYXJlIFNJR0hBU0hfKiBib3VuZGFyeSBjb25zdGFudHMsIGltcG9ydGluZyBUcmFuc2FjdGlvbiBjYXVzZXMgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG5FQ1NpZ25hdHVyZS5wYXJzZVNjcmlwdFNpZ25hdHVyZSA9IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgdmFyIGhhc2hUeXBlID0gYnVmZmVyLnJlYWRVSW50OChidWZmZXIubGVuZ3RoIC0gMSk7XG4gIHZhciBoYXNoVHlwZU1vZCA9IGhhc2hUeXBlICYgfjB4ODA7XG5cbiAgYXNzZXJ0KGhhc2hUeXBlTW9kID4gMHgwMCAmJiBoYXNoVHlwZU1vZCA8IDB4MDQsICdJbnZhbGlkIGhhc2hUeXBlJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBzaWduYXR1cmU6IEVDU2lnbmF0dXJlLmZyb21ERVIoYnVmZmVyLnNsaWNlKDAsIC0xKSksXG4gICAgaGFzaFR5cGU6IGhhc2hUeXBlXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVDU2lnbmF0dXJlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5Jyk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbGljZWRUb0FycmF5Mik7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YnKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ2Vvc2pzLWVjYycpLFxuICAgIFNpZ25hdHVyZSA9IF9yZXF1aXJlLlNpZ25hdHVyZSxcbiAgICBQdWJsaWNLZXkgPSBfcmVxdWlyZS5QdWJsaWNLZXk7XG5cbnZhciBGY2J1ZmZlciA9IHJlcXVpcmUoJ2ZjYnVmZmVyJyk7XG52YXIgQnl0ZUJ1ZmZlciA9IHJlcXVpcmUoJ2J5dGVidWZmZXInKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxudmFyIHNjaGVtYSA9IHJlcXVpcmUoJy4vc2NoZW1hJyk7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuL2Zvcm1hdCcpLFxuICAgIGlzTmFtZSA9IF9yZXF1aXJlMi5pc05hbWUsXG4gICAgZW5jb2RlTmFtZSA9IF9yZXF1aXJlMi5lbmNvZGVOYW1lLFxuICAgIGRlY29kZU5hbWUgPSBfcmVxdWlyZTIuZGVjb2RlTmFtZSxcbiAgICBEZWNpbWFsUGFkID0gX3JlcXVpcmUyLkRlY2ltYWxQYWQsXG4gICAgRGVjaW1hbEltcGx5ID0gX3JlcXVpcmUyLkRlY2ltYWxJbXBseSxcbiAgICBEZWNpbWFsVW5pbXBseSA9IF9yZXF1aXJlMi5EZWNpbWFsVW5pbXBseSxcbiAgICBwcmludEFzc2V0ID0gX3JlcXVpcmUyLnByaW50QXNzZXQsXG4gICAgcGFyc2VBc3NldCA9IF9yZXF1aXJlMi5wYXJzZUFzc2V0O1xuXG4vKiogQ29uZmlndXJlcyBGY2J1ZmZlciBmb3IgRU9TIHNwZWNpZmljIHN0cnVjdHMgYW5kIHR5cGVzLiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgdmFyIGV4dGVuZGVkU2NoZW1hID0gYXJndW1lbnRzWzFdO1xuXG4gIHZhciBzdHJ1Y3RMb29rdXAgPSBmdW5jdGlvbiBzdHJ1Y3RMb29rdXAobG9va3VwTmFtZSwgYWNjb3VudCkge1xuICAgIHZhciBjYWNoZSA9IGNvbmZpZy5hYmlDYWNoZS5hYmkoYWNjb3VudCk7XG5cbiAgICAvLyBMb29rdXAgYnkgQUJJIGFjdGlvbiBcIm5hbWVcIlxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2FjaGUuYWJpLmFjdGlvbnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgPT09IGxvb2t1cE5hbWUpIHtcbiAgICAgICAgICB2YXIgX3N0cnVjdCA9IGNhY2hlLnN0cnVjdHNbYWN0aW9uLnR5cGVdO1xuICAgICAgICAgIGlmIChfc3RydWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3RydWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBMb29rdXAgc3RydWN0IGJ5IFwidHlwZVwiXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN0cnVjdCA9IGNhY2hlLnN0cnVjdHNbbG9va3VwTmFtZV07XG4gICAgaWYgKHN0cnVjdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gc3RydWN0O1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBBQkkgYWN0aW9uOiAnICsgbG9va3VwTmFtZSk7XG4gIH07XG5cbiAgLy8gSWYgbm9kZW9zIGRvZXMgbm90IGhhdmUgYW4gQUJJIHNldHVwIGZvciBhIGNlcnRhaW4gYWN0aW9uLnR5cGUsIGl0IHdpbGwgdGhyb3dcbiAgLy8gYW4gZXJyb3I6IGBJbnZhbGlkIGNhc3QgZnJvbSBvYmplY3RfdHlwZSB0byBzdHJpbmdgIC4uIGZvcmNlQWN0aW9uRGF0YUhleFxuICAvLyBtYXkgYmUgdXNlZCB0byB1bnRpbCBuYXRpdmUgQUJJIGlzIGFkZGVkIG9yIGZpeGVkLlxuICB2YXIgZm9yY2VBY3Rpb25EYXRhSGV4ID0gY29uZmlnLmZvcmNlQWN0aW9uRGF0YUhleCAhPSBudWxsID8gY29uZmlnLmZvcmNlQWN0aW9uRGF0YUhleCA6IHRydWU7XG5cbiAgdmFyIG92ZXJyaWRlID0gT2JqZWN0LmFzc2lnbih7fSwgYXV0aG9yaXR5T3ZlcnJpZGUoY29uZmlnKSwgYWJpT3ZlcnJpZGUoc3RydWN0TG9va3VwKSwgd2FzbUNvZGVPdmVycmlkZShjb25maWcpLCBhY3Rpb25EYXRhT3ZlcnJpZGUoc3RydWN0TG9va3VwLCBmb3JjZUFjdGlvbkRhdGFIZXgpLCBjb25maWcub3ZlcnJpZGUpO1xuXG4gIHZhciBlb3NUeXBlcyA9IHtcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lKCkge1xuICAgICAgcmV0dXJuIFtOYW1lXTtcbiAgICB9LFxuICAgIHB1YmxpY19rZXk6IGZ1bmN0aW9uIHB1YmxpY19rZXkoKSB7XG4gICAgICByZXR1cm4gW3ZhcmlhbnQoUHVibGljS2V5RWNjKV07XG4gICAgfSxcblxuICAgIHN5bWJvbDogZnVuY3Rpb24gc3ltYm9sKCkge1xuICAgICAgcmV0dXJuIFtfU3ltYm9sXTtcbiAgICB9LFxuICAgIHN5bWJvbF9jb2RlOiBmdW5jdGlvbiBzeW1ib2xfY29kZSgpIHtcbiAgICAgIHJldHVybiBbU3ltYm9sQ29kZV07XG4gICAgfSxcbiAgICBleHRlbmRlZF9zeW1ib2w6IGZ1bmN0aW9uIGV4dGVuZGVkX3N5bWJvbCgpIHtcbiAgICAgIHJldHVybiBbRXh0ZW5kZWRTeW1ib2xdO1xuICAgIH0sXG5cbiAgICBhc3NldDogZnVuY3Rpb24gYXNzZXQoKSB7XG4gICAgICByZXR1cm4gW0Fzc2V0XTtcbiAgICB9LCAvLyBBZnRlciBTeW1ib2w6IGFtb3VudCwgcHJlY2lzaW9uLCBzeW1ib2wsIGNvbnRyYWN0XG4gICAgZXh0ZW5kZWRfYXNzZXQ6IGZ1bmN0aW9uIGV4dGVuZGVkX2Fzc2V0KCkge1xuICAgICAgcmV0dXJuIFtFeHRlbmRlZEFzc2V0XTtcbiAgICB9LCAvLyBBZnRlciBBc3NldDogYW1vdW50LCBwcmVjaXNpb24sIHN5bWJvbCwgY29udHJhY3RcblxuICAgIHNpZ25hdHVyZTogZnVuY3Rpb24gc2lnbmF0dXJlKCkge1xuICAgICAgcmV0dXJuIFt2YXJpYW50KFNpZ25hdHVyZVR5cGUpXTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGN1c3RvbVR5cGVzID0gT2JqZWN0LmFzc2lnbih7fSwgZW9zVHlwZXMsIGNvbmZpZy5jdXN0b21UeXBlcyk7XG4gIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBvdmVycmlkZTogb3ZlcnJpZGUgfSwgeyBjdXN0b21UeXBlczogY3VzdG9tVHlwZXMgfSwgY29uZmlnKTtcblxuICAvLyBEbyBub3Qgc29ydCB0cmFuc2FjdGlvbiBhY3Rpb25zXG4gIGNvbmZpZy5zb3J0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLnNvcnQpO1xuICBjb25maWcuc29ydFsnYWN0aW9uLmF1dGhvcml6YXRpb24nXSA9IHRydWU7XG4gIGNvbmZpZy5zb3J0WydzaWduZWRfdHJhbnNhY3Rpb24uc2lnbmF0dXJlJ10gPSB0cnVlO1xuICBjb25maWcuc29ydFsnYXV0aG9yaXR5LmFjY291bnRzJ10gPSB0cnVlO1xuICBjb25maWcuc29ydFsnYXV0aG9yaXR5LmtleXMnXSA9IHRydWU7XG5cbiAgdmFyIGZ1bGxTY2hlbWEgPSBPYmplY3QuYXNzaWduKHt9LCBzY2hlbWEsIGV4dGVuZGVkU2NoZW1hKTtcblxuICB2YXIgX0ZjYnVmZmVyID0gRmNidWZmZXIoZnVsbFNjaGVtYSwgY29uZmlnKSxcbiAgICAgIHN0cnVjdHMgPSBfRmNidWZmZXIuc3RydWN0cyxcbiAgICAgIHR5cGVzID0gX0ZjYnVmZmVyLnR5cGVzLFxuICAgICAgZXJyb3JzID0gX0ZjYnVmZmVyLmVycm9ycyxcbiAgICAgIGZyb21CdWZmZXIgPSBfRmNidWZmZXIuZnJvbUJ1ZmZlcixcbiAgICAgIHRvQnVmZmVyID0gX0ZjYnVmZmVyLnRvQnVmZmVyO1xuXG4gIGlmIChlcnJvcnMubGVuZ3RoICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9ycywgbnVsbCwgNCkpO1xuICB9XG5cbiAgcmV0dXJuIHsgc3RydWN0czogc3RydWN0cywgdHlwZXM6IHR5cGVzLCBmcm9tQnVmZmVyOiBmcm9tQnVmZmVyLCB0b0J1ZmZlcjogdG9CdWZmZXIgfTtcbn07XG5cbi8qKlxuICBOYW1lIGVvczo6dHlwZXMgbmF0aXZlLmhwcFxuKi9cbnZhciBOYW1lID0gZnVuY3Rpb24gTmFtZSh2YWxpZGF0aW9uKSB7XG4gIHJldHVybiB7XG4gICAgZnJvbUJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGZyb21CeXRlQnVmZmVyKGIpIHtcbiAgICAgIHZhciBuID0gZGVjb2RlTmFtZShiLnJlYWRVaW50NjQoKSwgZmFsc2UpOyAvLyBiIGlzIGFscmVhZHkgaW4gbGl0dGxlRW5kaWFuXG4gICAgICAvLyBpZih2YWxpZGF0aW9uLmRlYnVnKSB7XG4gICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoYCR7bn1gLCAnKE5hbWUuZnJvbUJ5dGVCdWZmZXIpJylcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgLy8gaWYodmFsaWRhdGlvbi5kZWJ1Zykge1xuICAgICAgLy8gICBjb25zb2xlLmVycm9yKGAke3ZhbHVlfWAsIChOYW1lLmFwcGVuZEJ5dGVCdWZmZXIpKVxuICAgICAgLy8gfVxuICAgICAgYi53cml0ZVVpbnQ2NChlbmNvZGVOYW1lKHZhbHVlLCBmYWxzZSkpOyAvLyBiIGlzIGFscmVhZHkgaW4gbGl0dGxlRW5kaWFuXG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICBBIHZhcmlhbnQgaXMgbGlrZSBoYXZpbmcgYSB2ZXJzaW9uIG9mIGFuIG9iamVjdC4gIEEgdmFyaW50IGNvbWVzXG4gIGZpcnN0IGFuZCBpZGVudGlmaWVzIHdoaWNoIHR5cGUgb2Ygb2JqZWN0IHRoaXMgaXMuXG5cbiAgQGFyZyB7QXJyYXl9IHZhcmlhbnRBcnJheSBhcnJheSBvZiB0eXBlc1xuKi9cbnZhciB2YXJpYW50ID0gZnVuY3Rpb24gdmFyaWFudCgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhcmlhbnRBcnJheSA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhcmlhbnRBcnJheVtfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAodmFsaWRhdGlvbiwgYmFzZVR5cGVzLCBjdXN0b21UeXBlcykge1xuICAgIHZhciB2YXJpYW50cyA9IHZhcmlhbnRBcnJheS5tYXAoZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAgIHJldHVybiBUeXBlKHZhbGlkYXRpb24sIGJhc2VUeXBlcywgY3VzdG9tVHlwZXMpO1xuICAgIH0pO1xuICAgIHZhciBzdGF0aWNWYXJpYW50ID0gYmFzZVR5cGVzLnN0YXRpY192YXJpYW50KHZhcmlhbnRzKTtcblxuICAgIHJldHVybiB7XG4gICAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgICByZXR1cm4gc3RhdGljVmFyaWFudC5mcm9tQnl0ZUJ1ZmZlcihiKTtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFswLCB2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljVmFyaWFudC5hcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFswLCB2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRpY1ZhcmlhbnQuZnJvbU9iamVjdCh2YWx1ZSlbMV07XG4gICAgICB9LFxuICAgICAgdG9PYmplY3Q6IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFswLCB2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRpY1ZhcmlhbnQudG9PYmplY3QodmFsdWUpWzFdO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59O1xuXG52YXIgUHVibGljS2V5RWNjID0gZnVuY3Rpb24gUHVibGljS2V5RWNjKHZhbGlkYXRpb24pIHtcbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIGJjb3B5ID0gYi5jb3B5KGIub2Zmc2V0LCBiLm9mZnNldCArIDMzKTtcbiAgICAgIGIuc2tpcCgzMyk7XG4gICAgICB2YXIgcHViYnVmID0gQnVmZmVyLmZyb20oYmNvcHkudG9CaW5hcnkoKSwgJ2JpbmFyeScpO1xuICAgICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tQnVmZmVyKHB1YmJ1ZikudG9TdHJpbmcodmFsaWRhdGlvbi5rZXlQcmVmaXgpO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgLy8gaWYodmFsaWRhdGlvbi5kZWJ1Zykge1xuICAgICAgLy8gICBjb25zb2xlLmVycm9yKGAke3ZhbHVlfWAsICdQdWJsaWNLZXlUeXBlLmFwcGVuZEJ5dGVCdWZmZXInKVxuICAgICAgLy8gfVxuICAgICAgdmFyIGJ1ZiA9IFB1YmxpY0tleS5mcm9tU3RyaW5nT3JUaHJvdyh2YWx1ZSwgdmFsaWRhdGlvbi5rZXlQcmVmaXgpLnRvQnVmZmVyKCk7XG4gICAgICBiLmFwcGVuZChidWYudG9TdHJpbmcoJ2JpbmFyeScpLCAnYmluYXJ5Jyk7XG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdmFyIGtleVByZWZpeCA9IHZhbGlkYXRpb24ua2V5UHJlZml4ID8gdmFsaWRhdGlvbi5rZXlQcmVmaXggOiAnRU9TJztcbiAgICAgICAgcmV0dXJuIGtleVByZWZpeCArICc2TVJ5Li4nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICBJbnRlcm5hbDogcHJlY2lzaW9uLCBzeW1ib2xcbiAgRXh0ZXJuYWw6IHN5bWJvbFxuICBAZXhhbXBsZSAnU1lTJ1xuKi9cbnZhciBfU3ltYm9sID0gZnVuY3Rpb24gX1N5bWJvbCh2YWxpZGF0aW9uKSB7XG4gIHJldHVybiB7XG4gICAgZnJvbUJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGZyb21CeXRlQnVmZmVyKGIpIHtcbiAgICAgIHZhciBiY29weSA9IGIuY29weShiLm9mZnNldCwgYi5vZmZzZXQgKyA4KTtcbiAgICAgIGIuc2tpcCg4KTtcblxuICAgICAgdmFyIHByZWNpc2lvbiA9IGJjb3B5LnJlYWRVaW50OCgpO1xuICAgICAgdmFyIGJpbiA9IGJjb3B5LnRvQmluYXJ5KCk7XG5cbiAgICAgIHZhciBzeW1ib2wgPSAnJztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYmluW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvZGUgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBpZiAoY29kZSA9PSAnXFwwJykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN5bWJvbCArPSBjb2RlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmVjaXNpb24gKyAnLCcgKyBzeW1ib2w7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICB2YXIgX3BhcnNlQXNzZXQgPSBwYXJzZUFzc2V0KHZhbHVlKSxcbiAgICAgICAgICBzeW1ib2wgPSBfcGFyc2VBc3NldC5zeW1ib2wsXG4gICAgICAgICAgcHJlY2lzaW9uID0gX3BhcnNlQXNzZXQucHJlY2lzaW9uO1xuXG4gICAgICBhc3NlcnQocHJlY2lzaW9uICE9IG51bGwsICdQcmVjaXNpb24gdW5rbm93biBmb3Igc3ltYm9sOiAnICsgdmFsdWUpO1xuICAgICAgdmFyIHBhZCA9ICdcXDAnLnJlcGVhdCg3IC0gc3ltYm9sLmxlbmd0aCk7XG4gICAgICBiLmFwcGVuZChTdHJpbmcuZnJvbUNoYXJDb2RlKHByZWNpc2lvbikgKyBzeW1ib2wgKyBwYWQpO1xuICAgIH0sXG4gICAgZnJvbU9iamVjdDogZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZSkge1xuICAgICAgYXNzZXJ0KHZhbHVlICE9IG51bGwsICdTeW1ib2wgaXMgcmVxdWlyZWQ6ICcgKyB2YWx1ZSk7XG5cbiAgICAgIHZhciBfcGFyc2VBc3NldDIgPSBwYXJzZUFzc2V0KHZhbHVlKSxcbiAgICAgICAgICBzeW1ib2wgPSBfcGFyc2VBc3NldDIuc3ltYm9sLFxuICAgICAgICAgIHByZWNpc2lvbiA9IF9wYXJzZUFzc2V0Mi5wcmVjaXNpb247XG5cbiAgICAgIGlmIChwcmVjaXNpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3ltYm9sO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW50ZXJuYWwgb2JqZWN0LCB0aGlzIGNhbiBoYXZlIHRoZSBwcmVjaXNpb24gcHJlZml4XG4gICAgICAgIHJldHVybiBwcmVjaXNpb24gKyAnLCcgKyBzeW1ib2w7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdTWVMnO1xuICAgICAgfVxuICAgICAgLy8gc3ltYm9sIG9ubHkgKHdpdGhvdXQgcHJlY2lzaW9uIHByZWZpeClcbiAgICAgIHJldHVybiBwYXJzZUFzc2V0KHZhbHVlKS5zeW1ib2w7XG4gICAgfVxuICB9O1xufTtcblxuLyoqIFN5bWJvbCB0eXBlIHdpdGhvdXQgdGhlIHByZWNpc2lvbiAqL1xudmFyIFN5bWJvbENvZGUgPSBmdW5jdGlvbiBTeW1ib2xDb2RlKHZhbGlkYXRpb24pIHtcbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIGJjb3B5ID0gYi5jb3B5KGIub2Zmc2V0LCBiLm9mZnNldCArIDgpO1xuICAgICAgYi5za2lwKDgpO1xuXG4gICAgICB2YXIgYmluID0gYmNvcHkudG9CaW5hcnkoKTtcblxuICAgICAgdmFyIHN5bWJvbCA9ICcnO1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBiaW5bU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29kZSA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgIGlmIChjb2RlID09ICdcXDAnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgc3ltYm9sICs9IGNvZGU7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjMucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnICsgc3ltYm9sO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgdmFyIF9wYXJzZUFzc2V0MyA9IHBhcnNlQXNzZXQodmFsdWUpLFxuICAgICAgICAgIHN5bWJvbCA9IF9wYXJzZUFzc2V0My5zeW1ib2w7XG5cbiAgICAgIHZhciBwYWQgPSAnXFwwJy5yZXBlYXQoOCAtIHN5bWJvbC5sZW5ndGgpO1xuICAgICAgYi5hcHBlbmQoc3ltYm9sICsgcGFkKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIGFzc2VydCh2YWx1ZSAhPSBudWxsLCAnU3ltYm9sIGlzIHJlcXVpcmVkOiAnICsgdmFsdWUpO1xuXG4gICAgICB2YXIgX3BhcnNlQXNzZXQ0ID0gcGFyc2VBc3NldCh2YWx1ZSksXG4gICAgICAgICAgc3ltYm9sID0gX3BhcnNlQXNzZXQ0LnN5bWJvbDtcblxuICAgICAgcmV0dXJuIHN5bWJvbDtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1NZUyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VBc3NldCh2YWx1ZSkuc3ltYm9sO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICBJbnRlcm5hbDogcHJlY2lzaW9uLCBzeW1ib2wsIGNvbnRyYWN0XG4gIEV4dGVybmFsOiBzeW1ib2wsIGNvbnRyYWN0XG4gIEBleGFtcGxlICdTWVNAY29udHJhY3QnXG4qL1xudmFyIEV4dGVuZGVkU3ltYm9sID0gZnVuY3Rpb24gRXh0ZW5kZWRTeW1ib2wodmFsaWRhdGlvbiwgYmFzZVR5cGVzLCBjdXN0b21UeXBlcykge1xuICB2YXIgc3ltYm9sVHlwZSA9IGN1c3RvbVR5cGVzLnN5bWJvbCh2YWxpZGF0aW9uKTtcbiAgdmFyIGNvbnRyYWN0TmFtZSA9IGN1c3RvbVR5cGVzLm5hbWUodmFsaWRhdGlvbik7XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIHN5bWJvbCA9IHN5bWJvbFR5cGUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgICB2YXIgY29udHJhY3QgPSBjb250cmFjdE5hbWUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgICByZXR1cm4gc3ltYm9sICsgJ0AnICsgY29udHJhY3Q7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHZhbHVlKSwgJ3N0cmluZycsICdJbnZhbGlkIGV4dGVuZGVkIHN5bWJvbDogJyArIHZhbHVlKTtcblxuICAgICAgdmFyIF92YWx1ZSRzcGxpdCA9IHZhbHVlLnNwbGl0KCdAJyksXG4gICAgICAgICAgX3ZhbHVlJHNwbGl0MiA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoX3ZhbHVlJHNwbGl0LCAyKSxcbiAgICAgICAgICBzeW1ib2wgPSBfdmFsdWUkc3BsaXQyWzBdLFxuICAgICAgICAgIGNvbnRyYWN0ID0gX3ZhbHVlJHNwbGl0MlsxXTtcblxuICAgICAgYXNzZXJ0KGNvbnRyYWN0ICE9IG51bGwsICdNaXNzaW5nIEBjb250cmFjdCBzdWZmaXggaW4gZXh0ZW5kZWQgc3ltYm9sOiAnICsgdmFsdWUpO1xuXG4gICAgICBzeW1ib2xUeXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgc3ltYm9sKTtcbiAgICAgIGNvbnRyYWN0TmFtZS5hcHBlbmRCeXRlQnVmZmVyKGIsIGNvbnRyYWN0KTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1NZU0Bjb250cmFjdCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gIEludGVybmFsOiBhbW91bnQsIHByZWNpc2lvbiwgc3ltYm9sLCBjb250cmFjdFxuICBAZXhhbXBsZSAnMS4wMDAwIFNZUydcbiovXG52YXIgQXNzZXQgPSBmdW5jdGlvbiBBc3NldCh2YWxpZGF0aW9uLCBiYXNlVHlwZXMsIGN1c3RvbVR5cGVzKSB7XG4gIHZhciBhbW91bnRUeXBlID0gYmFzZVR5cGVzLmludDY0KHZhbGlkYXRpb24pO1xuICB2YXIgc3ltYm9sVHlwZSA9IGN1c3RvbVR5cGVzLnN5bWJvbCh2YWxpZGF0aW9uKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgYW1vdW50ID0gYW1vdW50VHlwZS5mcm9tQnl0ZUJ1ZmZlcihiKTtcbiAgICAgIGFzc2VydChhbW91bnQgIT0gbnVsbCwgJ2Ftb3VudCcpO1xuXG4gICAgICB2YXIgc3ltID0gc3ltYm9sVHlwZS5mcm9tQnl0ZUJ1ZmZlcihiKTtcblxuICAgICAgdmFyIF9wYXJzZUFzc2V0NSA9IHBhcnNlQXNzZXQoJycgKyBzeW0pLFxuICAgICAgICAgIHByZWNpc2lvbiA9IF9wYXJzZUFzc2V0NS5wcmVjaXNpb24sXG4gICAgICAgICAgc3ltYm9sID0gX3BhcnNlQXNzZXQ1LnN5bWJvbDtcblxuICAgICAgYXNzZXJ0KHByZWNpc2lvbiAhPSBudWxsLCAncHJlY2lzaW9uJyk7XG4gICAgICBhc3NlcnQoc3ltYm9sICE9IG51bGwsICdzeW1ib2wnKTtcblxuICAgICAgcmV0dXJuIERlY2ltYWxVbmltcGx5KGFtb3VudCwgcHJlY2lzaW9uKSArICcgJyArIHN5bWJvbDtcbiAgICB9LFxuICAgIGFwcGVuZEJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGFwcGVuZEJ5dGVCdWZmZXIoYiwgdmFsdWUpIHtcbiAgICAgIHZhciBfcGFyc2VBc3NldDYgPSBwYXJzZUFzc2V0KHZhbHVlKSxcbiAgICAgICAgICBhbW91bnQgPSBfcGFyc2VBc3NldDYuYW1vdW50LFxuICAgICAgICAgIHByZWNpc2lvbiA9IF9wYXJzZUFzc2V0Ni5wcmVjaXNpb24sXG4gICAgICAgICAgc3ltYm9sID0gX3BhcnNlQXNzZXQ2LnN5bWJvbDtcblxuICAgICAgYXNzZXJ0KGFtb3VudCAhPSBudWxsLCAnYW1vdW50Jyk7XG4gICAgICBhc3NlcnQocHJlY2lzaW9uICE9IG51bGwsICdwcmVjaXNpb24nKTtcbiAgICAgIGFzc2VydChzeW1ib2wgIT0gbnVsbCwgJ3N5bWJvbCcpO1xuXG4gICAgICBhbW91bnRUeXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgRGVjaW1hbEltcGx5KGFtb3VudCwgcHJlY2lzaW9uKSk7XG4gICAgICBzeW1ib2xUeXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgcHJlY2lzaW9uICsgJywnICsgc3ltYm9sKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHZhciBfcGFyc2VBc3NldDcgPSBwYXJzZUFzc2V0KHZhbHVlKSxcbiAgICAgICAgICBhbW91bnQgPSBfcGFyc2VBc3NldDcuYW1vdW50LFxuICAgICAgICAgIHByZWNpc2lvbiA9IF9wYXJzZUFzc2V0Ny5wcmVjaXNpb24sXG4gICAgICAgICAgc3ltYm9sID0gX3BhcnNlQXNzZXQ3LnN5bWJvbDtcblxuICAgICAgYXNzZXJ0KGFtb3VudCAhPSBudWxsLCAnYW1vdW50Jyk7XG4gICAgICBhc3NlcnQocHJlY2lzaW9uICE9IG51bGwsICdwcmVjaXNpb24nKTtcbiAgICAgIGFzc2VydChzeW1ib2wgIT0gbnVsbCwgJ3N5bWJvbCcpO1xuXG4gICAgICByZXR1cm4gRGVjaW1hbFBhZChhbW91bnQsIHByZWNpc2lvbikgKyAnICcgKyBzeW1ib2w7XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcwLjAwMDEgU1lTJztcbiAgICAgIH1cblxuICAgICAgdmFyIF9wYXJzZUFzc2V0OCA9IHBhcnNlQXNzZXQodmFsdWUpLFxuICAgICAgICAgIGFtb3VudCA9IF9wYXJzZUFzc2V0OC5hbW91bnQsXG4gICAgICAgICAgcHJlY2lzaW9uID0gX3BhcnNlQXNzZXQ4LnByZWNpc2lvbixcbiAgICAgICAgICBzeW1ib2wgPSBfcGFyc2VBc3NldDguc3ltYm9sO1xuXG4gICAgICBhc3NlcnQoYW1vdW50ICE9IG51bGwsICdhbW91bnQnKTtcbiAgICAgIGFzc2VydChwcmVjaXNpb24gIT0gbnVsbCwgJ3ByZWNpc2lvbicpO1xuICAgICAgYXNzZXJ0KHN5bWJvbCAhPSBudWxsLCAnc3ltYm9sJyk7XG5cbiAgICAgIHJldHVybiBEZWNpbWFsUGFkKGFtb3VudCwgcHJlY2lzaW9uKSArICcgJyArIHN5bWJvbDtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAgQGV4YW1wbGUgJzEuMDAwMCBTWVNAY29udHJhY3QnXG4qL1xudmFyIEV4dGVuZGVkQXNzZXQgPSBmdW5jdGlvbiBFeHRlbmRlZEFzc2V0KHZhbGlkYXRpb24sIGJhc2VUeXBlcywgY3VzdG9tVHlwZXMpIHtcbiAgdmFyIGFzc2V0VHlwZSA9IGN1c3RvbVR5cGVzLmFzc2V0KHZhbGlkYXRpb24pO1xuICB2YXIgY29udHJhY3ROYW1lID0gY3VzdG9tVHlwZXMubmFtZSh2YWxpZGF0aW9uKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgYXNzZXQgPSBhc3NldFR5cGUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgICB2YXIgY29udHJhY3QgPSBjb250cmFjdE5hbWUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgICByZXR1cm4gcGFyc2VBc3NldChhc3NldCArICdAJyArIGNvbnRyYWN0KTtcbiAgICB9LFxuICAgIGFwcGVuZEJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGFwcGVuZEJ5dGVCdWZmZXIoYiwgdmFsdWUpIHtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkodmFsdWUpLCAnb2JqZWN0JywgJ2V4cGVjdGluZyBleHRlbmRlZF9hc3NldCBvYmplY3QsIGdvdCAnICsgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KSh2YWx1ZSkpKTtcblxuICAgICAgdmFyIGFzc2V0ID0gcHJpbnRBc3NldCh2YWx1ZSk7XG5cbiAgICAgIHZhciBfYXNzZXQkc3BsaXQgPSBhc3NldC5zcGxpdCgnQCcpLFxuICAgICAgICAgIF9hc3NldCRzcGxpdDIgPSAoMCwgX3NsaWNlZFRvQXJyYXkzLmRlZmF1bHQpKF9hc3NldCRzcGxpdCwgMiksXG4gICAgICAgICAgY29udHJhY3QgPSBfYXNzZXQkc3BsaXQyWzFdO1xuXG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNvbnRyYWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNvbnRyYWN0KSwgJ3N0cmluZycsICdJbnZhbGlkIGV4dGVuZGVkIGFzc2V0OiAnICsgdmFsdWUpO1xuXG4gICAgICAvLyBhc3NldCBpbmNsdWRlcyBjb250cmFjdCAoYXNzZXRUeXBlIG5lZWRzIHRoaXMpXG4gICAgICBhc3NldFR5cGUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCBhc3NldCk7XG4gICAgICBjb250cmFjdE5hbWUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCBjb250cmFjdCk7XG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICAvLyBsaWtlOiAxLjAwMDAgU1lTQGNvbnRyYWN0IG9yIDEgU1lTQGNvbnRyYWN0XG4gICAgICB2YXIgYXNzZXQgPSB7fTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oYXNzZXQsIHBhcnNlQXNzZXQodmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KSh2YWx1ZSkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICBPYmplY3QuYXNzaWduKGFzc2V0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc3NlcnQoZmFsc2UsICdleHBlY3RpbmcgZXh0ZW5kZWRfYXNzZXQ8b2JqZWN0fHN0cmluZz4sIGdvdDogJyArICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkodmFsdWUpKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbW91bnQgPSBhc3NldC5hbW91bnQsXG4gICAgICAgICAgcHJlY2lzaW9uID0gYXNzZXQucHJlY2lzaW9uLFxuICAgICAgICAgIHN5bWJvbCA9IGFzc2V0LnN5bWJvbCxcbiAgICAgICAgICBjb250cmFjdCA9IGFzc2V0LmNvbnRyYWN0O1xuXG4gICAgICBhc3NlcnQoYW1vdW50ICE9IG51bGwsICdtaXNzaW5nIGFtb3VudCcpO1xuICAgICAgYXNzZXJ0KHByZWNpc2lvbiAhPSBudWxsLCAnbWlzc2luZyBwcmVjaXNpb24nKTtcbiAgICAgIGFzc2VydChzeW1ib2wgIT0gbnVsbCwgJ21pc3Npbmcgc3ltYm9sJyk7XG4gICAgICBhc3NlcnQoY29udHJhY3QgIT0gbnVsbCwgJ21pc3NpbmcgY29udHJhY3QnKTtcblxuICAgICAgcmV0dXJuIHsgYW1vdW50OiBhbW91bnQsIHByZWNpc2lvbjogcHJlY2lzaW9uLCBzeW1ib2w6IHN5bWJvbCwgY29udHJhY3Q6IGNvbnRyYWN0IH07XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhbW91bnQ6ICcxLjAwMDAnLFxuICAgICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgICAgICBzeW1ib2w6ICdTWVMnLFxuICAgICAgICAgIGNvbnRyYWN0OiAnZW9zaW8udG9rZW4nXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkodmFsdWUpLCAnb2JqZWN0JywgJ2V4cGVjdGluZyBleHRlbmRlZF9hc3NldCBvYmplY3QnKTtcbiAgICAgIHZhciBhbW91bnQgPSB2YWx1ZS5hbW91bnQsXG4gICAgICAgICAgcHJlY2lzaW9uID0gdmFsdWUucHJlY2lzaW9uLFxuICAgICAgICAgIHN5bWJvbCA9IHZhbHVlLnN5bWJvbCxcbiAgICAgICAgICBjb250cmFjdCA9IHZhbHVlLmNvbnRyYWN0O1xuXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFtb3VudDogRGVjaW1hbFBhZChhbW91bnQsIHByZWNpc2lvbiksXG4gICAgICAgIHByZWNpc2lvbjogcHJlY2lzaW9uLFxuICAgICAgICBzeW1ib2w6IHN5bWJvbCxcbiAgICAgICAgY29udHJhY3Q6IGNvbnRyYWN0XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBTaWduYXR1cmVUeXBlID0gZnVuY3Rpb24gU2lnbmF0dXJlVHlwZSh2YWxpZGF0aW9uLCBiYXNlVHlwZXMpIHtcbiAgdmFyIHNpZ25hdHVyZVR5cGUgPSBiYXNlVHlwZXMuZml4ZWRfYnl0ZXM2NSh2YWxpZGF0aW9uKTtcbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIHNpZ25hdHVyZUJ1ZmZlciA9IHNpZ25hdHVyZVR5cGUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgICB2YXIgc2lnbmF0dXJlID0gU2lnbmF0dXJlLmZyb20oc2lnbmF0dXJlQnVmZmVyKTtcbiAgICAgIHJldHVybiBzaWduYXR1cmUudG9TdHJpbmcoKTtcbiAgICB9LFxuICAgIGFwcGVuZEJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGFwcGVuZEJ5dGVCdWZmZXIoYiwgdmFsdWUpIHtcbiAgICAgIHZhciBzaWduYXR1cmUgPSBTaWduYXR1cmUuZnJvbSh2YWx1ZSk7XG4gICAgICBzaWduYXR1cmVUeXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgc2lnbmF0dXJlLnRvQnVmZmVyKCkpO1xuICAgIH0sXG4gICAgZnJvbU9iamVjdDogZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZSkge1xuICAgICAgdmFyIHNpZ25hdHVyZSA9IFNpZ25hdHVyZS5mcm9tKHZhbHVlKTtcbiAgICAgIHJldHVybiBzaWduYXR1cmUudG9TdHJpbmcoKTtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1NJR19LMV9iYXM1OHNpZ25hdHVyZS4uJztcbiAgICAgIH1cbiAgICAgIHZhciBzaWduYXR1cmUgPSBTaWduYXR1cmUuZnJvbSh2YWx1ZSk7XG4gICAgICByZXR1cm4gc2lnbmF0dXJlLnRvU3RyaW5nKCk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIGF1dGhvcml0eU92ZXJyaWRlID0gZnVuY3Rpb24gYXV0aG9yaXR5T3ZlcnJpZGUoY29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgLyoqIHNob3J0aGFuZCBgRU9TNk1SeUFqLi5gICovXG4gICAgJ2F1dGhvcml0eS5mcm9tT2JqZWN0JzogZnVuY3Rpb24gYXV0aG9yaXR5RnJvbU9iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKFB1YmxpY0tleS5mcm9tU3RyaW5nKHZhbHVlLCBjb25maWcua2V5UHJlZml4KSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgICBrZXlzOiBbeyBrZXk6IHZhbHVlLCB3ZWlnaHQ6IDEgfV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBfdmFsdWUkc3BsaXQzID0gdmFsdWUuc3BsaXQoJ0AnKSxcbiAgICAgICAgICAgIF92YWx1ZSRzcGxpdDQgPSAoMCwgX3NsaWNlZFRvQXJyYXkzLmRlZmF1bHQpKF92YWx1ZSRzcGxpdDMsIDIpLFxuICAgICAgICAgICAgYWNjb3VudCA9IF92YWx1ZSRzcGxpdDRbMF0sXG4gICAgICAgICAgICBfdmFsdWUkc3BsaXQ0JCA9IF92YWx1ZSRzcGxpdDRbMV0sXG4gICAgICAgICAgICBwZXJtaXNzaW9uID0gX3ZhbHVlJHNwbGl0NCQgPT09IHVuZGVmaW5lZCA/ICdhY3RpdmUnIDogX3ZhbHVlJHNwbGl0NCQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IDEsXG4gICAgICAgICAgYWNjb3VudHM6IFt7XG4gICAgICAgICAgICBwZXJtaXNzaW9uOiB7XG4gICAgICAgICAgICAgIGFjdG9yOiBhY2NvdW50LFxuICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBwZXJtaXNzaW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2VpZ2h0OiAxXG4gICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG52YXIgYWJpT3ZlcnJpZGUgPSBmdW5jdGlvbiBhYmlPdmVycmlkZShzdHJ1Y3RMb29rdXApIHtcbiAgcmV0dXJuIHtcbiAgICAnYWJpX2RlZi5mcm9tT2JqZWN0JzogZnVuY3Rpb24gYWJpX2RlZkZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBqc29uID0gQnVmZmVyLmZyb20odmFsdWUsICdoZXgnKS50b1N0cmluZygpO1xuICAgICAgICBpZiAoanNvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBqc29uID0gQnVmZmVyLmZyb20odmFsdWUpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XG4gICAgICB9XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsOyAvLyBsZXQgdGhlIGRlZmF1bHQgdHlwZSB0YWtlIGNhcmUgb2YgaXRcbiAgICB9LFxuXG4gICAgJ3NldGFiaS5hYmkuYXBwZW5kQnl0ZUJ1ZmZlcic6IGZ1bmN0aW9uIHNldGFiaUFiaUFwcGVuZEJ5dGVCdWZmZXIoX3JlZikge1xuICAgICAgdmFyIGZpZWxkcyA9IF9yZWYuZmllbGRzLFxuICAgICAgICAgIG9iamVjdCA9IF9yZWYub2JqZWN0LFxuICAgICAgICAgIGIgPSBfcmVmLmI7XG5cbiAgICAgIHZhciBzZXIgPSBzdHJ1Y3RMb29rdXAoJ2FiaV9kZWYnLCAnZW9zaW8nKTtcbiAgICAgIHZhciBiMiA9IG5ldyBCeXRlQnVmZmVyKEJ5dGVCdWZmZXIuREVGQVVMVF9DQVBBQ0lUWSwgQnl0ZUJ1ZmZlci5MSVRUTEVfRU5ESUFOKTtcblxuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmplY3QuYWJpKSkge1xuICAgICAgICBiMi5hcHBlbmQob2JqZWN0LmFiaSk7XG4gICAgICB9IGVsc2UgaWYgKCgwLCBfdHlwZW9mMy5kZWZhdWx0KShvYmplY3QuYWJpKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBzZXIuYXBwZW5kQnl0ZUJ1ZmZlcihiMiwgb2JqZWN0LmFiaSk7XG4gICAgICB9XG5cbiAgICAgIGIud3JpdGVWYXJpbnQzMihiMi5vZmZzZXQpOyAvLyBsZW5ndGggcHJlZml4XG4gICAgICBiLmFwcGVuZChiMi5jb3B5KDAsIGIyLm9mZnNldCksICdiaW5hcnknKTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgd2FzbUNvZGVPdmVycmlkZSA9IGZ1bmN0aW9uIHdhc21Db2RlT3ZlcnJpZGUoY29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgJ3NldGNvZGUuY29kZS5mcm9tT2JqZWN0JzogZnVuY3Rpb24gc2V0Y29kZUNvZGVGcm9tT2JqZWN0KF9yZWYyKSB7XG4gICAgICB2YXIgb2JqZWN0ID0gX3JlZjIub2JqZWN0LFxuICAgICAgICAgIHJlc3VsdCA9IF9yZWYyLnJlc3VsdDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNvZGUgPSBvYmplY3QuY29kZS50b1N0cmluZygpO1xuICAgICAgICBpZiAoL15cXHMqXFwobW9kdWxlLy50ZXN0KGNvZGUpKSB7XG4gICAgICAgICAgdmFyIGJpbmFyeWVuID0gY29uZmlnLmJpbmFyeWVuO1xuXG4gICAgICAgICAgYXNzZXJ0KGJpbmFyeWVuICE9IG51bGwsICdyZXF1aXJlZDogY29uZmlnLmJpbmFyeWVuID0gcmVxdWlyZShcImJpbmFyeWVuXCIpJyk7XG4gICAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fzc2VtYmxpbmcgV0FTTS4uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXNtID0gQnVmZmVyLmZyb20oYmluYXJ5ZW4ucGFyc2VUZXh0KGNvZGUpLmVtaXRCaW5hcnkoKSk7XG4gICAgICAgICAgcmVzdWx0LmNvZGUgPSB3YXNtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5jb2RlID0gb2JqZWN0LmNvZGU7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IsIG9iamVjdC5jb2RlKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gIE5lc3RlZCBzZXJpYWxpemVkIHN0cnVjdHVyZS4gIE5lc3RlZCBzdHJ1Y3QgbWF5IGJlIGluIEhFWCBvciBvYmplY3QgZm9ybWF0LlxuKi9cbnZhciBhY3Rpb25EYXRhT3ZlcnJpZGUgPSBmdW5jdGlvbiBhY3Rpb25EYXRhT3ZlcnJpZGUoc3RydWN0TG9va3VwLCBmb3JjZUFjdGlvbkRhdGFIZXgpIHtcbiAgcmV0dXJuIHtcbiAgICAnYWN0aW9uLmRhdGEuZnJvbUJ5dGVCdWZmZXInOiBmdW5jdGlvbiBhY3Rpb25EYXRhRnJvbUJ5dGVCdWZmZXIoX3JlZjMpIHtcbiAgICAgIHZhciBmaWVsZHMgPSBfcmVmMy5maWVsZHMsXG4gICAgICAgICAgb2JqZWN0ID0gX3JlZjMub2JqZWN0LFxuICAgICAgICAgIGIgPSBfcmVmMy5iLFxuICAgICAgICAgIGNvbmZpZyA9IF9yZWYzLmNvbmZpZztcblxuICAgICAgdmFyIHNlciA9IChvYmplY3QubmFtZSB8fCAnJykgPT0gJycgPyBmaWVsZHMuZGF0YSA6IHN0cnVjdExvb2t1cChvYmplY3QubmFtZSwgb2JqZWN0LmFjY291bnQpO1xuICAgICAgaWYgKHNlcikge1xuICAgICAgICBiLnJlYWRWYXJpbnQzMigpOyAvLyBsZW5ndGggcHJlZml4ICh1c2VmdWxsIGlmIG9iamVjdC5uYW1lIGlzIHVua25vd24pXG4gICAgICAgIG9iamVjdC5kYXRhID0gc2VyLmZyb21CeXRlQnVmZmVyKGIsIGNvbmZpZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgVW5rbm93biBBY3Rpb24ubmFtZSAke29iamVjdC5uYW1lfWApXG4gICAgICAgIHZhciBsZW5QcmVmaXggPSBiLnJlYWRWYXJpbnQzMigpO1xuICAgICAgICB2YXIgYkNvcHkgPSBiLmNvcHkoYi5vZmZzZXQsIGIub2Zmc2V0ICsgbGVuUHJlZml4KTtcbiAgICAgICAgYi5za2lwKGxlblByZWZpeCk7XG4gICAgICAgIG9iamVjdC5kYXRhID0gQnVmZmVyLmZyb20oYkNvcHkudG9CaW5hcnkoKSwgJ2JpbmFyeScpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAnYWN0aW9uLmRhdGEuYXBwZW5kQnl0ZUJ1ZmZlcic6IGZ1bmN0aW9uIGFjdGlvbkRhdGFBcHBlbmRCeXRlQnVmZmVyKF9yZWY0KSB7XG4gICAgICB2YXIgZmllbGRzID0gX3JlZjQuZmllbGRzLFxuICAgICAgICAgIG9iamVjdCA9IF9yZWY0Lm9iamVjdCxcbiAgICAgICAgICBiID0gX3JlZjQuYjtcblxuICAgICAgdmFyIHNlciA9IChvYmplY3QubmFtZSB8fCAnJykgPT0gJycgPyBmaWVsZHMuZGF0YSA6IHN0cnVjdExvb2t1cChvYmplY3QubmFtZSwgb2JqZWN0LmFjY291bnQpO1xuICAgICAgaWYgKHNlcikge1xuICAgICAgICB2YXIgYjIgPSBuZXcgQnl0ZUJ1ZmZlcihCeXRlQnVmZmVyLkRFRkFVTFRfQ0FQQUNJVFksIEJ5dGVCdWZmZXIuTElUVExFX0VORElBTik7XG4gICAgICAgIHNlci5hcHBlbmRCeXRlQnVmZmVyKGIyLCBvYmplY3QuZGF0YSk7XG4gICAgICAgIGIud3JpdGVWYXJpbnQzMihiMi5vZmZzZXQpO1xuICAgICAgICBiLmFwcGVuZChiMi5jb3B5KDAsIGIyLm9mZnNldCksICdiaW5hcnknKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBVbmtub3duIEFjdGlvbi5uYW1lICR7b2JqZWN0Lm5hbWV9YClcbiAgICAgICAgdmFyIGRhdGEgPSB0eXBlb2Ygb2JqZWN0LmRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqZWN0LmRhdGEsICdoZXgnKSA6IG9iamVjdC5kYXRhO1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gc3RydWN0IFxcJycgKyBvYmplY3QubmFtZSArICdcXCcgZm9yIGNvbnRyYWN0IFxcJycgKyBvYmplY3QuYWNjb3VudCArICdcXCcsIGxvY2F0ZSB0aGlzIHN0cnVjdCBvciBwcm92aWRlIHNlcmlhbGl6ZWQgYWN0aW9uLmRhdGEnKTtcbiAgICAgICAgfVxuICAgICAgICBiLndyaXRlVmFyaW50MzIoZGF0YS5sZW5ndGgpO1xuICAgICAgICBiLmFwcGVuZChkYXRhLnRvU3RyaW5nKCdiaW5hcnknKSwgJ2JpbmFyeScpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAnYWN0aW9uLmRhdGEuZnJvbU9iamVjdCc6IGZ1bmN0aW9uIGFjdGlvbkRhdGFGcm9tT2JqZWN0KF9yZWY1KSB7XG4gICAgICB2YXIgZmllbGRzID0gX3JlZjUuZmllbGRzLFxuICAgICAgICAgIG9iamVjdCA9IF9yZWY1Lm9iamVjdCxcbiAgICAgICAgICByZXN1bHQgPSBfcmVmNS5yZXN1bHQ7XG4gICAgICB2YXIgZGF0YSA9IG9iamVjdC5kYXRhLFxuICAgICAgICAgIG5hbWUgPSBvYmplY3QubmFtZTtcblxuICAgICAgdmFyIHNlciA9IChuYW1lIHx8ICcnKSA9PSAnJyA/IGZpZWxkcy5kYXRhIDogc3RydWN0TG9va3VwKG5hbWUsIG9iamVjdC5hY2NvdW50KTtcbiAgICAgIGlmIChzZXIpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShkYXRhKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmVzdWx0LmRhdGEgPSBzZXIuZnJvbU9iamVjdChkYXRhKTsgLy8gcmVzb2x2ZSBzaG9ydGhhbmRcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB2YXIgYnVmID0gQnVmZmVyLmZyb20oZGF0YSwgJ2hleCcpO1xuICAgICAgICAgIHJlc3VsdC5kYXRhID0gRmNidWZmZXIuZnJvbUJ1ZmZlcihzZXIsIGJ1Zik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0aW5nIGhleCBzdHJpbmcgb3Igb2JqZWN0IGluIGFjdGlvbi5kYXRhJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBVbmtub3duIEFjdGlvbi5uYW1lICR7b2JqZWN0Lm5hbWV9YClcbiAgICAgICAgcmVzdWx0LmRhdGEgPSBkYXRhO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAnYWN0aW9uLmRhdGEudG9PYmplY3QnOiBmdW5jdGlvbiBhY3Rpb25EYXRhVG9PYmplY3QoX3JlZjYpIHtcbiAgICAgIHZhciBmaWVsZHMgPSBfcmVmNi5maWVsZHMsXG4gICAgICAgICAgb2JqZWN0ID0gX3JlZjYub2JqZWN0LFxuICAgICAgICAgIHJlc3VsdCA9IF9yZWY2LnJlc3VsdCxcbiAgICAgICAgICBjb25maWcgPSBfcmVmNi5jb25maWc7XG5cbiAgICAgIHZhciBfcmVmNyA9IG9iamVjdCB8fCB7fSxcbiAgICAgICAgICBkYXRhID0gX3JlZjcuZGF0YSxcbiAgICAgICAgICBuYW1lID0gX3JlZjcubmFtZTtcblxuICAgICAgdmFyIHNlciA9IChuYW1lIHx8ICcnKSA9PSAnJyA/IGZpZWxkcy5kYXRhIDogc3RydWN0TG9va3VwKG5hbWUsIG9iamVjdC5hY2NvdW50KTtcbiAgICAgIGlmICghc2VyKSB7XG4gICAgICAgIC8vIFR5cGVzIHdpdGhvdXQgYW4gQUJJIHdpbGwgYWNjZXB0IGhleFxuICAgICAgICByZXN1bHQuZGF0YSA9IEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSA/IGRhdGEudG9TdHJpbmcoJ2hleCcpIDogZGF0YTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9yY2VBY3Rpb25EYXRhSGV4KSB7XG4gICAgICAgIHZhciBiMiA9IG5ldyBCeXRlQnVmZmVyKEJ5dGVCdWZmZXIuREVGQVVMVF9DQVBBQ0lUWSwgQnl0ZUJ1ZmZlci5MSVRUTEVfRU5ESUFOKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICBzZXIuYXBwZW5kQnl0ZUJ1ZmZlcihiMiwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LmRhdGEgPSBiMi5jb3B5KDAsIGIyLm9mZnNldCkudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzdWx0LmRhdGEnLCByZXN1bHQuZGF0YSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXJpYWxpemFibGUgSlNPTlxuICAgICAgcmVzdWx0LmRhdGEgPSBzZXIudG9PYmplY3QoZGF0YSwgY29uZmlnKTtcbiAgICB9XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAgQ29udmVydCBhIHN5bmNocm9ub3VzIGZ1bmN0aW9uIGludG8gYSBhc3luY2hyb25vdXMgb25lICh2aWEgc2V0VGltZW91dClcbiAgd3JhcHBpbmcgaXQgaW4gYSBwcm9taXNlLiAgVGhpcyBkb2VzIG5vdCBleHBlY3QgdGhlIGZ1bmN0aW9uIHRvIGhhdmUgYVxuICBjYWxsYmFjayBwYXJhbXRlci5cblxuICBAYXJnIHtmdW5jdGlvbn0gZnVuYyAtIG5vbi1jYWxsYmFjayBmdW5jdGlvblxuXG4gIEBleGFtcGxlIHByb21pc2VBc3luYyhteWZ1bmN0aW9uKVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzb2x2ZShmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncykpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQWVzID0gcmVxdWlyZShcIi4vYWVzXCIpO1xudmFyIFByaXZhdGVLZXkgPSByZXF1aXJlKFwiLi9rZXlfcHJpdmF0ZVwiKTtcbnZhciBQdWJsaWNLZXkgPSByZXF1aXJlKFwiLi9rZXlfcHVibGljXCIpO1xudmFyIFNpZ25hdHVyZSA9IHJlcXVpcmUoXCIuL3NpZ25hdHVyZVwiKTtcbnZhciBrZXlfdXRpbHMgPSByZXF1aXJlKFwiLi9rZXlfdXRpbHNcIik7XG52YXIgaGFzaCA9IHJlcXVpcmUoXCIuL2hhc2hcIik7XG5cbi8qKlxuICAgIFtXYWxsZXQgSW1wb3J0IEZvcm1hdF0oaHR0cHM6Ly9lbi5iaXRjb2luLml0L3dpa2kvV2FsbGV0X2ltcG9ydF9mb3JtYXQpXG4gICAgQHR5cGVkZWYge3N0cmluZ30gd2lmXG4qL1xuLyoqXG4gICAgRU9TS2V5Li5cbiAgICBAdHlwZWRlZiB7c3RyaW5nfSBwdWJrZXlcbiovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZWNjID0ge1xuICAgIC8qKlxuICAgICAgSW5pdGlhbGl6ZSBieSBydW5uaW5nIHNvbWUgc2VsZi1jaGVja2luZyBjb2RlLiAgVGhpcyBzaG91bGQgdGFrZSBhXG4gICAgICBzZWNvbmQgdG8gZ2F0aGVyIGFkZGl0aW9uYWwgQ1BVIGVudHJvcHkgdXNlZCBkdXJpbmcgcHJpdmF0ZSBrZXlcbiAgICAgIGdlbmVyYXRpb24uXG4gICAgICAgSW5pdGlhbGl6YXRpb24gaGFwcGVucyBvbmNlIGV2ZW4gaWYgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICAgKi9cbiAgICBpbml0aWFsaXplOiBQcml2YXRlS2V5LmluaXRpYWxpemUsXG5cbiAgICAvKipcbiAgICAgIERvZXMgbm90IHBhdXNlIHRvIGdhdGhlciBDUFUgZW50cm9weS5cbiAgICAgIEByZXR1cm4ge1Byb21pc2U8UHJpdmF0ZUtleT59IHRlc3Qga2V5XG4gICAgKi9cbiAgICB1bnNhZmVSYW5kb21LZXk6IGZ1bmN0aW9uIHVuc2FmZVJhbmRvbUtleSgpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkudW5zYWZlUmFuZG9tS2V5KCkudGhlbihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICAgQGFyZyB7bnVtYmVyfSBbY3B1RW50cm9weUJpdHMgPSAwXSBnYXRoZXIgYWRkaXRpb25hbCBlbnRyb3B5XG4gICAgICAgIGZyb20gYSBDUFUgbWluaW5nIGFsZ29yaXRobS4gIFRoaXMgd2lsbCBhbHJlYWR5IGhhcHBlbiBvbmNlIGJ5XG4gICAgICAgIGRlZmF1bHQuXG4gICAgICAgICBAcmV0dXJuIHtQcm9taXNlPHdpZj59XG4gICAgICAgICBAZXhhbXBsZVxuICAgIGVjYy5yYW5kb21LZXkoKS50aGVuKHByaXZhdGVLZXkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdQcml2YXRlIEtleTpcXHQnLCBwcml2YXRlS2V5KSAvLyB3aWZcbiAgICBjb25zb2xlLmxvZygnUHVibGljIEtleTpcXHQnLCBlY2MucHJpdmF0ZVRvUHVibGljKHByaXZhdGVLZXkpKSAvLyBFT1NrZXkuLi5cbiAgICB9KVxuICAgICovXG4gICAgcmFuZG9tS2V5OiBmdW5jdGlvbiByYW5kb21LZXkoY3B1RW50cm9weUJpdHMpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkucmFuZG9tS2V5KGNwdUVudHJvcHlCaXRzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAgICAgQGFyZyB7c3RyaW5nfSBzZWVkIC0gYW55IGxlbmd0aCBzdHJpbmcuICBUaGlzIGlzIHByaXZhdGUuICBUaGUgc2FtZVxuICAgICAgICBzZWVkIHByb2R1Y2VzIHRoZSBzYW1lIHByaXZhdGUga2V5IGV2ZXJ5IHRpbWUuICBBdCBsZWFzdCAxMjggcmFuZG9tXG4gICAgICAgIGJpdHMgc2hvdWxkIGJlIHVzZWQgdG8gcHJvZHVjZSBhIGdvb2QgcHJpdmF0ZSBrZXkuXG4gICAgICAgIEByZXR1cm4ge3dpZn1cbiAgICAgICAgIEBleGFtcGxlIGVjYy5zZWVkUHJpdmF0ZSgnc2VjcmV0JykgPT09IHdpZlxuICAgICovXG4gICAgc2VlZFByaXZhdGU6IGZ1bmN0aW9uIHNlZWRQcml2YXRlKHNlZWQpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkuZnJvbVNlZWQoc2VlZCkudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAgIEBhcmcge3dpZn0gd2lmXG4gICAgICAgIEBhcmcge3N0cmluZ30gW3B1YmtleV9wcmVmaXggPSAnRU9TJ10gLSBwdWJsaWMga2V5IHByZWZpeFxuICAgICAgICAgQHJldHVybiB7cHVia2V5fVxuICAgICAgICAgQGV4YW1wbGUgZWNjLnByaXZhdGVUb1B1YmxpYyh3aWYpID09PSBwdWJrZXlcbiAgICAqL1xuICAgIHByaXZhdGVUb1B1YmxpYzogZnVuY3Rpb24gcHJpdmF0ZVRvUHVibGljKHdpZikge1xuICAgICAgICB2YXIgcHVia2V5X3ByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ0VPUyc7XG4gICAgICAgIHJldHVybiBQcml2YXRlS2V5KHdpZikudG9QdWJsaWMoKS50b1N0cmluZyhwdWJrZXlfcHJlZml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAgIEBhcmcge3B1YmtleX0gcHVia2V5IC0gbGlrZSBFT1NLZXkuLlxuICAgICAgICBAYXJnIHtzdHJpbmd9IFtwdWJrZXlfcHJlZml4ID0gJ0VPUyddXG4gICAgICAgICBAcmV0dXJuIHtib29sZWFufSB2YWxpZFxuICAgICAgICAgQGV4YW1wbGUgZWNjLmlzVmFsaWRQdWJsaWMocHVia2V5KSA9PT0gdHJ1ZVxuICAgICovXG4gICAgaXNWYWxpZFB1YmxpYzogZnVuY3Rpb24gaXNWYWxpZFB1YmxpYyhwdWJrZXkpIHtcbiAgICAgICAgdmFyIHB1YmtleV9wcmVmaXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdFT1MnO1xuICAgICAgICByZXR1cm4gUHVibGljS2V5LmlzVmFsaWQocHVia2V5LCBwdWJrZXlfcHJlZml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAgIEBhcmcge3dpZn0gd2lmXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IHZhbGlkXG4gICAgICAgICBAZXhhbXBsZSBlY2MuaXNWYWxpZFByaXZhdGUod2lmKSA9PT0gdHJ1ZVxuICAgICovXG4gICAgaXNWYWxpZFByaXZhdGU6IGZ1bmN0aW9uIGlzVmFsaWRQcml2YXRlKHdpZikge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZUtleS5pc1ZhbGlkKHdpZik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAgICBDcmVhdGUgYSBzaWduYXR1cmUgdXNpbmcgZGF0YSBvciBhIGhhc2guXG4gICAgICAgICBAYXJnIHtzdHJpbmd8QnVmZmVyfSBkYXRhXG4gICAgICAgIEBhcmcge3dpZnxQcml2YXRlS2V5fSBwcml2YXRlS2V5XG4gICAgICAgIEBhcmcge1N0cmluZ30gW2VuY29kaW5nID0gJ3V0ZjgnXSAtIGRhdGEgZW5jb2RpbmcgKGlmIHN0cmluZylcbiAgICAgICAgIEByZXR1cm4ge3N0cmluZ30gc3RyaW5nIHNpZ25hdHVyZVxuICAgICAgICAgQGV4YW1wbGUgZWNjLnNpZ24oJ0kgYW0gYWxpdmUnLCB3aWYpXG4gICAgKi9cbiAgICBzaWduOiBmdW5jdGlvbiBzaWduKGRhdGEsIHByaXZhdGVLZXkpIHtcbiAgICAgICAgdmFyIGVuY29kaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAndXRmOCc7XG5cbiAgICAgICAgaWYgKGVuY29kaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBUEkgY2hhbmdlZCwgdXNlIHNpZ25IYXNoKC4uKSBpbnN0ZWFkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhcm5pbmc6IGVjYy5zaWduIGhhc2hEYXRhIHBhcmFtZXRlciB3YXMgcmVtb3ZlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTaWduYXR1cmUuc2lnbihkYXRhLCBwcml2YXRlS2V5LCBlbmNvZGluZykudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAgIEBhcmcge1N0cmluZ3xCdWZmZXJ9IGRhdGFTaGEyNTYgLSBzaGEyNTYgaGFzaCAzMiBieXRlIGJ1ZmZlciBvciBzdHJpbmdcbiAgICAgICAgQGFyZyB7d2lmfFByaXZhdGVLZXl9IHByaXZhdGVLZXlcbiAgICAgICAgQGFyZyB7U3RyaW5nfSBbZW5jb2RpbmcgPSAnaGV4J10gLSBkYXRhU2hhMjU2IGVuY29kaW5nIChpZiBzdHJpbmcpXG4gICAgICAgICBAcmV0dXJuIHtzdHJpbmd9IHN0cmluZyBzaWduYXR1cmVcbiAgICAqL1xuICAgIHNpZ25IYXNoOiBmdW5jdGlvbiBzaWduSGFzaChkYXRhU2hhMjU2LCBwcml2YXRlS2V5KSB7XG4gICAgICAgIHZhciBlbmNvZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ2hleCc7XG5cbiAgICAgICAgcmV0dXJuIFNpZ25hdHVyZS5zaWduSGFzaChkYXRhU2hhMjU2LCBwcml2YXRlS2V5LCBlbmNvZGluZykudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAgIFZlcmlmeSBzaWduZWQgZGF0YS5cbiAgICAgICAgIEBhcmcge3N0cmluZ3xCdWZmZXJ9IHNpZ25hdHVyZSAtIGJ1ZmZlciBvciBoZXggc3RyaW5nXG4gICAgICAgIEBhcmcge3N0cmluZ3xCdWZmZXJ9IGRhdGFcbiAgICAgICAgQGFyZyB7cHVia2V5fFB1YmxpY0tleX0gcHVia2V5XG4gICAgICAgIEBhcmcge2Jvb2xlYW59IFtoYXNoRGF0YSA9IHRydWVdIC0gc2hhMjU2IGhhc2ggZGF0YSBiZWZvcmUgdmVyaWZ5XG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICBAZXhhbXBsZSBlY2MudmVyaWZ5KHNpZ25hdHVyZSwgJ0kgYW0gYWxpdmUnLCBwdWJrZXkpID09PSB0cnVlXG4gICAgKi9cbiAgICB2ZXJpZnk6IGZ1bmN0aW9uIHZlcmlmeShzaWduYXR1cmUsIGRhdGEsIHB1YmtleSkge1xuICAgICAgICB2YXIgZW5jb2RpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6ICd1dGY4JztcblxuICAgICAgICBpZiAoZW5jb2RpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FQSSBjaGFuZ2VkLCB1c2UgdmVyaWZ5SGFzaCguLikgaW5zdGVhZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVuY29kaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXYXJuaW5nOiBlY2MudmVyaWZ5IGhhc2hEYXRhIHBhcmFtZXRlciB3YXMgcmVtb3ZlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNpZ25hdHVyZSA9IFNpZ25hdHVyZS5mcm9tKHNpZ25hdHVyZSk7XG4gICAgICAgIHJldHVybiBzaWduYXR1cmUudmVyaWZ5KGRhdGEsIHB1YmtleSwgZW5jb2RpbmcpO1xuICAgIH0sXG5cbiAgICB2ZXJpZnlIYXNoOiBmdW5jdGlvbiB2ZXJpZnlIYXNoKHNpZ25hdHVyZSwgZGF0YVNoYTI1NiwgcHVia2V5KSB7XG4gICAgICAgIHZhciBlbmNvZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogJ2hleCc7XG5cbiAgICAgICAgc2lnbmF0dXJlID0gU2lnbmF0dXJlLmZyb20oc2lnbmF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZS52ZXJpZnlIYXNoKGRhdGFTaGEyNTYsIHB1YmtleSwgZW5jb2RpbmcpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAgICBSZWNvdmVyIHRoZSBwdWJsaWMga2V5IHVzZWQgdG8gY3JlYXRlIHRoZSBzaWduYXR1cmUuXG4gICAgICAgICBAYXJnIHtTdHJpbmd8QnVmZmVyfSBzaWduYXR1cmUgKEVPU2Jhc2U1OHNpZy4uLCBIZXgsIEJ1ZmZlcilcbiAgICAgICAgQGFyZyB7U3RyaW5nfEJ1ZmZlcn0gZGF0YSAtIGZ1bGwgZGF0YVxuICAgICAgICBAYXJnIHtTdHJpbmd9IFtlbmNvZGluZyA9ICd1dGY4J10gLSBkYXRhIGVuY29kaW5nIChpZiBkYXRhIGlzIGEgc3RyaW5nKVxuICAgICAgICAgQHJldHVybiB7cHVia2V5fVxuICAgICAgICAgQGV4YW1wbGUgZWNjLnJlY292ZXIoc2lnbmF0dXJlLCAnSSBhbSBhbGl2ZScpID09PSBwdWJrZXlcbiAgICAqL1xuICAgIHJlY292ZXI6IGZ1bmN0aW9uIHJlY292ZXIoc2lnbmF0dXJlLCBkYXRhKSB7XG4gICAgICAgIHZhciBlbmNvZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ3V0ZjgnO1xuXG4gICAgICAgIGlmIChlbmNvZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQVBJIGNoYW5nZWQsIHVzZSByZWNvdmVySGFzaChzaWduYXR1cmUsIGRhdGEpIGluc3RlYWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlbmNvZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV2FybmluZzogZWNjLnJlY292ZXIgaGFzaERhdGEgcGFyYW1ldGVyIHdhcyByZW1vdmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2lnbmF0dXJlID0gU2lnbmF0dXJlLmZyb20oc2lnbmF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZS5yZWNvdmVyKGRhdGEsIGVuY29kaW5nKS50b1N0cmluZygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICAgQGFyZyB7U3RyaW5nfEJ1ZmZlcn0gc2lnbmF0dXJlIChFT1NiYXNlNThzaWcuLiwgSGV4LCBCdWZmZXIpXG4gICAgICAgIEBhcmcge1N0cmluZ3xCdWZmZXJ9IGRhdGFTaGEyNTYgLSBzaGEyNTYgaGFzaCAzMiBieXRlIGJ1ZmZlciBvciBoZXggc3RyaW5nXG4gICAgICAgIEBhcmcge1N0cmluZ30gW2VuY29kaW5nID0gJ2hleCddIC0gZGF0YVNoYTI1NiBlbmNvZGluZyAoaWYgZGF0YVNoYTI1NiBpcyBhIHN0cmluZylcbiAgICAgICAgIEByZXR1cm4ge1B1YmxpY0tleX1cbiAgICAqL1xuICAgIHJlY292ZXJIYXNoOiBmdW5jdGlvbiByZWNvdmVySGFzaChzaWduYXR1cmUsIGRhdGFTaGEyNTYpIHtcbiAgICAgICAgdmFyIGVuY29kaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnaGV4JztcblxuICAgICAgICBzaWduYXR1cmUgPSBTaWduYXR1cmUuZnJvbShzaWduYXR1cmUpO1xuICAgICAgICByZXR1cm4gc2lnbmF0dXJlLnJlY292ZXJIYXNoKGRhdGFTaGEyNTYsIGVuY29kaW5nKS50b1N0cmluZygpO1xuICAgIH0sXG5cbiAgICAvKiogQGFyZyB7c3RyaW5nfEJ1ZmZlcn0gZGF0YSAtIGFsd2F5cyBiaW5hcnksIHlvdSBtYXkgbmVlZCBCdWZmZXIuZnJvbShkYXRhLCAnaGV4JylcbiAgICAgICAgQGFyZyB7c3RyaW5nfSBbZW5jb2RpbmcgPSAnaGV4J10gLSByZXN1bHQgZW5jb2RpbmcgJ2hleCcsICdiaW5hcnknIG9yICdiYXNlNjQnXG4gICAgICAgIEByZXR1cm4ge3N0cmluZ3xCdWZmZXJ9IC0gQnVmZmVyIHdoZW4gZW5jb2RpbmcgaXMgbnVsbCwgb3Igc3RyaW5nXG4gICAgICAgICBAZXhhbXBsZSBlY2Muc2hhMjU2KCdoYXNobWUnKSA9PT0gJzAyMjA4Yi4uJ1xuICAgICAgICBAZXhhbXBsZSBlY2Muc2hhMjU2KEJ1ZmZlci5mcm9tKCcwMjIwOGInLCAnaGV4JykpID09PSAnMjlhMjMuLidcbiAgICAqL1xuICAgIHNoYTI1NjogZnVuY3Rpb24gc2hhMjU2KGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdEVuY29kaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnaGV4JztcbiAgICAgICAgcmV0dXJuIGhhc2guc2hhMjU2KGRhdGEsIHJlc3VsdEVuY29kaW5nKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVjYzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGJhc2U1OCA9IHJlcXVpcmUoJ2JzNTgnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciByYW5kb21CeXRlcyA9IHJlcXVpcmUoJ3JhbmRvbWJ5dGVzJyk7XG5cbnZhciBoYXNoID0gcmVxdWlyZSgnLi9oYXNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJhbmRvbTMyQnl0ZUJ1ZmZlcjogcmFuZG9tMzJCeXRlQnVmZmVyLFxuICAgIGFkZEVudHJvcHk6IGFkZEVudHJvcHksXG4gICAgY3B1RW50cm9weTogY3B1RW50cm9weSxcbiAgICBlbnRyb3B5Q291bnQ6IGZ1bmN0aW9uIGVudHJvcHlDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIF9lbnRyb3B5Q291bnQ7XG4gICAgfSxcbiAgICBjaGVja0RlY29kZTogY2hlY2tEZWNvZGUsXG4gICAgY2hlY2tFbmNvZGU6IGNoZWNrRW5jb2RlXG59O1xuXG52YXIgZW50cm9weVBvcyA9IDAsXG4gICAgX2VudHJvcHlDb3VudCA9IDA7XG5cbnZhciBleHRlcm5hbEVudHJvcHlBcnJheSA9IHJhbmRvbUJ5dGVzKDEwMSk7XG5cbi8qKlxuICAgIEFkZGl0aW9uYWwgZm9ybXMgb2YgZW50cm9weSBhcmUgdXNlZC4gIEEgd2VlayByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBjYW4gcnVuIG91dCBvZiBlbnRyb3B5LiAgVGhpcyBzaG91bGQgZW5zdXJlIGV2ZW4gdGhlIHdvcnN0IHJhbmRvbSBudW1iZXIgaW1wbGVtZW50YXRpb24gd2lsbCBiZSByZWFzb25hYmx5IHNhZmUuXG5cbiAgICBAYXJnIHtudW1iZXJ9IFtjcHVFbnRyb3B5Qml0cyA9IDBdIGdlbmVyYXRlIGVudHJvcHkgb24gdGhlIGZseS4gIFRoaXMgaXNcbiAgICBub3QgcmVxdWlyZWQsIGVudHJvcHkgY2FuIGJlIGFkZGVkIGluIGFkdmFuY2VkIHZpYSBhZGRFbnRyb3B5IG9yIGluaXRpYWxpemUoKS5cblxuICAgIEBhcmcge2Jvb2xlYW59IFtzYWZlID0gdHJ1ZV0gZmFsc2UgZm9yIHRlc3RpbmcsIG90aGVyd2lzZSB0aGlzIHdpbGwgYmVcbiAgICB0cnVlIHRvIGVuc3VyZSBpbml0aWFsaXplKCkgd2FzIGNhbGxlZC5cblxuICAgIEByZXR1cm4gYSByYW5kb20gYnVmZmVyIG9idGFpbmVkIGZyb20gdGhlIHNlY3VyZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvci4gIEFkZGl0aW9uYWwgZW50cm9weSBpcyB1c2VkLlxuKi9cbmZ1bmN0aW9uIHJhbmRvbTMyQnl0ZUJ1ZmZlcigpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICAgIF9yZWYkY3B1RW50cm9weUJpdHMgPSBfcmVmLmNwdUVudHJvcHlCaXRzLFxuICAgICAgICBjcHVFbnRyb3B5Qml0cyA9IF9yZWYkY3B1RW50cm9weUJpdHMgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJGNwdUVudHJvcHlCaXRzLFxuICAgICAgICBfcmVmJHNhZmUgPSBfcmVmLnNhZmUsXG4gICAgICAgIHNhZmUgPSBfcmVmJHNhZmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNhZmU7XG5cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNwdUVudHJvcHlCaXRzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjcHVFbnRyb3B5Qml0cyksICdudW1iZXInLCAnY3B1RW50cm9weUJpdHMnKTtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHNhZmUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNhZmUpLCAnYm9vbGVhbicsICdib29sZWFuJyk7XG5cbiAgICBpZiAoc2FmZSkge1xuICAgICAgICBhc3NlcnQoX2VudHJvcHlDb3VudCA+PSAxMjgsICdDYWxsIGluaXRpYWxpemUoKSB0byBhZGQgZW50cm9weScpO1xuICAgIH1cblxuICAgIC8vIGlmKGVudHJvcHlDb3VudCA+IDApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYEFkZGl0aW9uYWwgcHJpdmF0ZSBrZXkgZW50cm9weTogJHtlbnRyb3B5Q291bnR9IGV2ZW50c2ApXG4gICAgLy8gfVxuXG4gICAgdmFyIGhhc2hfYXJyYXkgPSBbXTtcbiAgICBoYXNoX2FycmF5LnB1c2gocmFuZG9tQnl0ZXMoMzIpKTtcbiAgICBoYXNoX2FycmF5LnB1c2goQnVmZmVyLmZyb20oY3B1RW50cm9weShjcHVFbnRyb3B5Qml0cykpKTtcbiAgICBoYXNoX2FycmF5LnB1c2goZXh0ZXJuYWxFbnRyb3B5QXJyYXkpO1xuICAgIGhhc2hfYXJyYXkucHVzaChicm93c2VyRW50cm9weSgpKTtcbiAgICByZXR1cm4gaGFzaC5zaGEyNTYoQnVmZmVyLmNvbmNhdChoYXNoX2FycmF5KSk7XG59XG5cbi8qKlxuICAgIEFkZHMgZW50cm9weS4gIFRoaXMgbWF5IGJlIGNhbGxlZCBtYW55IHRpbWVzIHdoaWxlIHRoZSBhbW91bnQgb2YgZGF0YSBzYXZlZFxuICAgIGlzIGFjY3VtdWxhdGl2ZWx5IHJlZHVjZWQgdG8gMTAxIGludGVnZXJzLiAgRGF0YSBpcyByZXRhaW5lZCBpbiBSQU0gZm9yIHRoZVxuICAgIGxpZmUgb2YgdGhpcyBtb2R1bGUuXG5cbiAgICBAZXhhbXBsZSBSZWFjdCA8Y29kZT5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZWZzLk15Q29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5vbkVudHJvcHlFdmVudCwge2NhcHR1cmU6IGZhbHNlLCBwYXNzaXZlOiB0cnVlfSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVmcy5NeUNvbXBvbmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25FbnRyb3B5RXZlbnQpO1xuICAgIH1cbiAgICBvbkVudHJvcHlFdmVudCA9IChlKSA9PiB7XG4gICAgICAgIGlmKGUudHlwZSA9PT0gJ21vdXNlbW92ZScpXG4gICAgICAgICAgICBrZXlfdXRpbHMuYWRkRW50cm9weShlLnBhZ2VYLCBlLnBhZ2VZLCBlLnNjcmVlblgsIGUuc2NyZWVuWSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRW50cm9weUV2ZW50IFVua25vd24nLCBlLnR5cGUsIGUpXG4gICAgfVxuICAgIDwvY29kZT5cbiovXG5mdW5jdGlvbiBhZGRFbnRyb3B5KCkge1xuICAgIGFzc2VydC5lcXVhbChleHRlcm5hbEVudHJvcHlBcnJheS5sZW5ndGgsIDEwMSwgJ2V4dGVybmFsRW50cm9weUFycmF5Jyk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgaW50cyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBpbnRzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF9lbnRyb3B5Q291bnQgKz0gaW50cy5sZW5ndGg7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGludHNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgaSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICB2YXIgcG9zID0gZW50cm9weVBvcysrICUgMTAxO1xuICAgICAgICAgICAgdmFyIGkyID0gZXh0ZXJuYWxFbnRyb3B5QXJyYXlbcG9zXSArPSBpO1xuICAgICAgICAgICAgaWYgKGkyID4gOTAwNzE5OTI1NDc0MDk5MSkgZXh0ZXJuYWxFbnRyb3B5QXJyYXlbcG9zXSA9IDA7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gICAgVGhpcyBydW5zIGluIGp1c3QgdW5kZXIgMSBzZWNvbmQgYW5kIGVuc3VyZXMgYSBtaW5pbXVtIG9mIGNwdUVudHJvcHlCaXRzXG4gICAgYml0cyBvZiBlbnRyb3B5IGFyZSBnYXRoZXJlZC5cblxuICAgIEJhc2VkIG9uIG1vcmUtZW50cm9weS4gQHNlZSBodHRwczovL2dpdGh1Yi5jb20va2V5YmFzZS9tb3JlLWVudHJvcHkvYmxvYi9tYXN0ZXIvc3JjL2dlbmVyYXRvci5pY2VkXG5cbiAgICBAYXJnIHtudW1iZXJ9IFtjcHVFbnRyb3B5Qml0cyA9IDEyOF1cbiAgICBAcmV0dXJuIHthcnJheX0gY291bnRzIGdhdGhlcmVkIGJ5IG1lYXN1cmluZyB2YXJpYXRpb25zIGluIHRoZSBDUFUgc3BlZWQgZHVyaW5nIGZsb2F0aW5nIHBvaW50IG9wZXJhdGlvbnMuXG4qL1xuZnVuY3Rpb24gY3B1RW50cm9weSgpIHtcbiAgICB2YXIgY3B1RW50cm9weUJpdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDEyODtcblxuICAgIHZhciBjb2xsZWN0ZWQgPSBbXTtcbiAgICB2YXIgbGFzdENvdW50ID0gbnVsbDtcbiAgICB2YXIgbG93RW50cm9weVNhbXBsZXMgPSAwO1xuICAgIHdoaWxlIChjb2xsZWN0ZWQubGVuZ3RoIDwgY3B1RW50cm9weUJpdHMpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gZmxvYXRpbmdQb2ludENvdW50KCk7XG4gICAgICAgIGlmIChsYXN0Q291bnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gY291bnQgLSBsYXN0Q291bnQ7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpIDwgMSkge1xuICAgICAgICAgICAgICAgIGxvd0VudHJvcHlTYW1wbGVzKys7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBob3cgbWFueSBiaXRzIG9mIGVudHJvcHkgd2VyZSBpbiB0aGlzIHNhbXBsZVxuICAgICAgICAgICAgdmFyIGJpdHMgPSBNYXRoLmZsb29yKGxvZzIoTWF0aC5hYnMoZGVsdGEpKSArIDEpO1xuICAgICAgICAgICAgaWYgKGJpdHMgPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGJpdHMgPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvd0VudHJvcHlTYW1wbGVzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29sbGVjdGVkLnB1c2goZGVsdGEpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RDb3VudCA9IGNvdW50O1xuICAgIH1cbiAgICBpZiAobG93RW50cm9weVNhbXBsZXMgPiAxMCkge1xuICAgICAgICB2YXIgcGN0ID0gTnVtYmVyKGxvd0VudHJvcHlTYW1wbGVzIC8gY3B1RW50cm9weUJpdHMgKiAxMDApLnRvRml4ZWQoMik7XG4gICAgICAgIC8vIElzIHRoaXMgYWxnb3JpdGhtIGdldHRpbmcgaW5lZmZpY2llbnQ/XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTjogJyArIHBjdCArICclIGxvdyBDUFUgZW50cm9weSByZS1zYW1wbGVkJyk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0ZWQ7XG59XG5cbi8qKlxuICAgIEBwcml2YXRlXG4gICAgQ291bnQgd2hpbGUgcGVyZm9ybWluZyBmbG9hdGluZyBwb2ludCBvcGVyYXRpb25zIGR1cmluZyBhIGZpeGVkIHRpbWVcbiAgICAoNyBtcyBmb3IgZXhhbXBsZSkuICBVc2luZyBhIGZpeGVkIHRpbWUgbWFrZXMgdGhpcyBhbGdvcml0aG1cbiAgICBwcmVkaWN0YWJsZSBpbiBydW50aW1lLlxuKi9cbmZ1bmN0aW9uIGZsb2F0aW5nUG9pbnRDb3VudCgpIHtcbiAgICB2YXIgd29ya01pbk1zID0gNztcbiAgICB2YXIgZCA9IERhdGUubm93KCk7XG4gICAgdmFyIGkgPSAwLFxuICAgICAgICB4ID0gMDtcbiAgICB3aGlsZSAoRGF0ZS5ub3coKSA8IGQgKyB3b3JrTWluTXMgKyAxKSB7XG4gICAgICAgIHggPSBNYXRoLnNpbihNYXRoLnNxcnQoTWF0aC5sb2coKytpICsgeCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG59XG5cbnZhciBsb2cyID0gZnVuY3Rpb24gbG9nMih4KSB7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG59O1xuXG4vKipcbiAgICBAcHJpdmF0ZVxuICAgIEF0dGVtcHQgdG8gZ2F0aGVyIGFuZCBoYXNoIGluZm9ybWF0aW9uIGZyb20gdGhlIGJyb3dzZXIncyB3aW5kb3csIGhpc3RvcnksIGFuZCBzdXBwb3J0ZWQgbWltZSB0eXBlcy4gIEZvciBub24tYnJvd3NlciBlbnZpcm9ubWVudHMgdGhpcyBzaW1wbHkgaW5jbHVkZXMgc2VjdXJlIHJhbmRvbSBkYXRhLiAgSW4gYW55IGV2ZW50LCB0aGUgaW5mb3JtYXRpb24gaXMgcmUtaGFzaGVkIGluIGEgbG9vcCBmb3IgMjUgbWlsbGlzZWNvbmRzIHNlY29uZHMuXG5cbiAgICBAcmV0dXJuIHtCdWZmZXJ9IDMyIGJ5dGVzXG4qL1xuZnVuY3Rpb24gYnJvd3NlckVudHJvcHkoKSB7XG4gICAgdmFyIGVudHJvcHlTdHIgPSBBcnJheShyYW5kb21CeXRlcygxMDEpKS5qb2luKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZW50cm9weVN0ciArPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCkgKyBcIiBcIiArIHdpbmRvdy5zY3JlZW4uaGVpZ2h0ICsgXCIgXCIgKyB3aW5kb3cuc2NyZWVuLndpZHRoICsgXCIgXCIgKyB3aW5kb3cuc2NyZWVuLmNvbG9yRGVwdGggKyBcIiBcIiArIFwiIFwiICsgd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCArIFwiIFwiICsgd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICsgXCIgXCIgKyB3aW5kb3cuc2NyZWVuLnBpeGVsRGVwdGggKyBuYXZpZ2F0b3IubGFuZ3VhZ2UgKyBcIiBcIiArIHdpbmRvdy5sb2NhdGlvbiArIFwiIFwiICsgd2luZG93Lmhpc3RvcnkubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBtaW1lVHlwZTsgaSA8IG5hdmlnYXRvci5taW1lVHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1pbWVUeXBlID0gbmF2aWdhdG9yLm1pbWVUeXBlc1tpXTtcbiAgICAgICAgICAgIGVudHJvcHlTdHIgKz0gbWltZVR5cGUuZGVzY3JpcHRpb24gKyBcIiBcIiArIG1pbWVUeXBlLnR5cGUgKyBcIiBcIiArIG1pbWVUeXBlLnN1ZmZpeGVzICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvL25vZGVqczpSZWZlcmVuY2VFcnJvcjogd2luZG93IGlzIG5vdCBkZWZpbmVkXG4gICAgICAgIGVudHJvcHlTdHIgKz0gaGFzaC5zaGEyNTYobmV3IERhdGUoKS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICB2YXIgYiA9IG5ldyBCdWZmZXIoZW50cm9weVN0cik7XG4gICAgZW50cm9weVN0ciArPSBiLnRvU3RyaW5nKCdiaW5hcnknKSArIFwiIFwiICsgbmV3IERhdGUoKS50b1N0cmluZygpO1xuXG4gICAgdmFyIGVudHJvcHkgPSBlbnRyb3B5U3RyO1xuICAgIHZhciBzdGFydF90ID0gRGF0ZS5ub3coKTtcbiAgICB3aGlsZSAoRGF0ZS5ub3coKSAtIHN0YXJ0X3QgPCAyNSkge1xuICAgICAgICBlbnRyb3B5ID0gaGFzaC5zaGEyNTYoZW50cm9weSk7XG4gICAgfXJldHVybiBlbnRyb3B5O1xufVxuXG4vKipcbiAgQGFyZyB7QnVmZmVyfSBrZXlCdWZmZXIgZGF0YVxuICBAYXJnIHtzdHJpbmd9IGtleVR5cGUgPSBzaGEyNTZ4MiwgSzEsIGV0Y1xuICBAcmV0dXJuIHtzdHJpbmd9IGNoZWNrc3VtIGVuY29kZWQgYmFzZTU4IHN0cmluZ1xuKi9cbmZ1bmN0aW9uIGNoZWNrRW5jb2RlKGtleUJ1ZmZlcikge1xuICAgIHZhciBrZXlUeXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG4gICAgYXNzZXJ0KEJ1ZmZlci5pc0J1ZmZlcihrZXlCdWZmZXIpLCAnZXhwZWN0aW5nIGtleUJ1ZmZlcjxCdWZmZXI+Jyk7XG4gICAgaWYgKGtleVR5cGUgPT09ICdzaGEyNTZ4MicpIHtcbiAgICAgICAgLy8gbGVnYWN5XG4gICAgICAgIHZhciBjaGVja3N1bSA9IGhhc2guc2hhMjU2KGhhc2guc2hhMjU2KGtleUJ1ZmZlcikpLnNsaWNlKDAsIDQpO1xuICAgICAgICByZXR1cm4gYmFzZTU4LmVuY29kZShCdWZmZXIuY29uY2F0KFtrZXlCdWZmZXIsIGNoZWNrc3VtXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjaGVjayA9IFtrZXlCdWZmZXJdO1xuICAgICAgICBpZiAoa2V5VHlwZSkge1xuICAgICAgICAgICAgY2hlY2sucHVzaChCdWZmZXIuZnJvbShrZXlUeXBlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9jaGVja3N1bSA9IGhhc2gucmlwZW1kMTYwKEJ1ZmZlci5jb25jYXQoY2hlY2spKS5zbGljZSgwLCA0KTtcbiAgICAgICAgcmV0dXJuIGJhc2U1OC5lbmNvZGUoQnVmZmVyLmNvbmNhdChba2V5QnVmZmVyLCBfY2hlY2tzdW1dKSk7XG4gICAgfVxufVxuXG4vKipcbiAgQGFyZyB7QnVmZmVyfSBrZXlTdHJpbmcgZGF0YVxuICBAYXJnIHtzdHJpbmd9IGtleVR5cGUgPSBzaGEyNTZ4MiwgSzEsIGV0Y1xuICBAcmV0dXJuIHtzdHJpbmd9IGNoZWNrc3VtIGVuY29kZWQgYmFzZTU4IHN0cmluZ1xuKi9cbmZ1bmN0aW9uIGNoZWNrRGVjb2RlKGtleVN0cmluZykge1xuICAgIHZhciBrZXlUeXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG4gICAgYXNzZXJ0KGtleVN0cmluZyAhPSBudWxsLCAncHJpdmF0ZSBrZXkgZXhwZWN0ZWQnKTtcbiAgICB2YXIgYnVmZmVyID0gbmV3IEJ1ZmZlcihiYXNlNTguZGVjb2RlKGtleVN0cmluZykpO1xuICAgIHZhciBjaGVja3N1bSA9IGJ1ZmZlci5zbGljZSgtNCk7XG4gICAgdmFyIGtleSA9IGJ1ZmZlci5zbGljZSgwLCAtNCk7XG5cbiAgICB2YXIgbmV3Q2hlY2sgPSB2b2lkIDA7XG4gICAgaWYgKGtleVR5cGUgPT09ICdzaGEyNTZ4MicpIHtcbiAgICAgICAgLy8gbGVnYWN5XG4gICAgICAgIG5ld0NoZWNrID0gaGFzaC5zaGEyNTYoaGFzaC5zaGEyNTYoa2V5KSkuc2xpY2UoMCwgNCk7IC8vIFdJRiAobGVnYWN5KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjaGVjayA9IFtrZXldO1xuICAgICAgICBpZiAoa2V5VHlwZSkge1xuICAgICAgICAgICAgY2hlY2sucHVzaChCdWZmZXIuZnJvbShrZXlUeXBlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q2hlY2sgPSBoYXNoLnJpcGVtZDE2MChCdWZmZXIuY29uY2F0KGNoZWNrKSkuc2xpY2UoMCwgNCk7IC8vUFZUXG4gICAgfVxuXG4gICAgaWYgKGNoZWNrc3VtLnRvU3RyaW5nKCkgIT09IG5ld0NoZWNrLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNoZWNrc3VtLCAnICsgKGNoZWNrc3VtLnRvU3RyaW5nKCdoZXgnKSArICcgIT0gJyArIG5ld0NoZWNrLnRvU3RyaW5nKCdoZXgnKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7IC8vIGZyb20gZ2l0aHViLmNvbS9iaXRjb2luanMvYml0Y29pbmpzLWxpYiBmcm9tIGdpdGh1Yi5jb20vY3J5cHRvY29pbmpzL2VjZHNhXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnLi9oYXNoJyk7XG52YXIgZW5mb3JjZVR5cGUgPSByZXF1aXJlKCcuL2VuZm9yY2VfdHlwZXMnKTtcblxudmFyIEJpZ0ludGVnZXIgPSByZXF1aXJlKCdiaWdpJyk7XG52YXIgRUNTaWduYXR1cmUgPSByZXF1aXJlKCcuL2Vjc2lnbmF0dXJlJyk7XG5cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2OTc5I3NlY3Rpb24tMy4yXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljR2VuZXJhdGVLKGN1cnZlLCBoYXNoLCBkLCBjaGVja1NpZywgbm9uY2UpIHtcblxuICBlbmZvcmNlVHlwZSgnQnVmZmVyJywgaGFzaCk7XG4gIGVuZm9yY2VUeXBlKEJpZ0ludGVnZXIsIGQpO1xuXG4gIGlmIChub25jZSkge1xuICAgIGhhc2ggPSBjcnlwdG8uc2hhMjU2KEJ1ZmZlci5jb25jYXQoW2hhc2gsIG5ldyBCdWZmZXIobm9uY2UpXSkpO1xuICB9XG5cbiAgLy8gc2FuaXR5IGNoZWNrXG4gIGFzc2VydC5lcXVhbChoYXNoLmxlbmd0aCwgMzIsICdIYXNoIG11c3QgYmUgMjU2IGJpdCcpO1xuXG4gIHZhciB4ID0gZC50b0J1ZmZlcigzMik7XG4gIHZhciBrID0gbmV3IEJ1ZmZlcigzMik7XG4gIHZhciB2ID0gbmV3IEJ1ZmZlcigzMik7XG5cbiAgLy8gU3RlcCBCXG4gIHYuZmlsbCgxKTtcblxuICAvLyBTdGVwIENcbiAgay5maWxsKDApO1xuXG4gIC8vIFN0ZXAgRFxuICBrID0gY3J5cHRvLkhtYWNTSEEyNTYoQnVmZmVyLmNvbmNhdChbdiwgbmV3IEJ1ZmZlcihbMF0pLCB4LCBoYXNoXSksIGspO1xuXG4gIC8vIFN0ZXAgRVxuICB2ID0gY3J5cHRvLkhtYWNTSEEyNTYodiwgayk7XG5cbiAgLy8gU3RlcCBGXG4gIGsgPSBjcnlwdG8uSG1hY1NIQTI1NihCdWZmZXIuY29uY2F0KFt2LCBuZXcgQnVmZmVyKFsxXSksIHgsIGhhc2hdKSwgayk7XG5cbiAgLy8gU3RlcCBHXG4gIHYgPSBjcnlwdG8uSG1hY1NIQTI1Nih2LCBrKTtcblxuICAvLyBTdGVwIEgxL0gyYSwgaWdub3JlZCBhcyB0bGVuID09PSBxbGVuICgyNTYgYml0KVxuICAvLyBTdGVwIEgyYlxuICB2ID0gY3J5cHRvLkhtYWNTSEEyNTYodiwgayk7XG5cbiAgdmFyIFQgPSBCaWdJbnRlZ2VyLmZyb21CdWZmZXIodik7XG5cbiAgLy8gU3RlcCBIMywgcmVwZWF0IHVudGlsIFQgaXMgd2l0aGluIHRoZSBpbnRlcnZhbCBbMSwgbiAtIDFdXG4gIHdoaWxlIChULnNpZ251bSgpIDw9IDAgfHwgVC5jb21wYXJlVG8oY3VydmUubikgPj0gMCB8fCAhY2hlY2tTaWcoVCkpIHtcbiAgICBrID0gY3J5cHRvLkhtYWNTSEEyNTYoQnVmZmVyLmNvbmNhdChbdiwgbmV3IEJ1ZmZlcihbMF0pXSksIGspO1xuICAgIHYgPSBjcnlwdG8uSG1hY1NIQTI1Nih2LCBrKTtcblxuICAgIC8vIFN0ZXAgSDEvSDJhLCBhZ2FpbiwgaWdub3JlZCBhcyB0bGVuID09PSBxbGVuICgyNTYgYml0KVxuICAgIC8vIFN0ZXAgSDJiIGFnYWluXG4gICAgdiA9IGNyeXB0by5IbWFjU0hBMjU2KHYsIGspO1xuXG4gICAgVCA9IEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcih2KTtcbiAgfVxuXG4gIHJldHVybiBUO1xufVxuXG5mdW5jdGlvbiBzaWduKGN1cnZlLCBoYXNoLCBkLCBub25jZSkge1xuXG4gIHZhciBlID0gQmlnSW50ZWdlci5mcm9tQnVmZmVyKGhhc2gpO1xuICB2YXIgbiA9IGN1cnZlLm47XG4gIHZhciBHID0gY3VydmUuRztcblxuICB2YXIgciwgcztcbiAgdmFyIGsgPSBkZXRlcm1pbmlzdGljR2VuZXJhdGVLKGN1cnZlLCBoYXNoLCBkLCBmdW5jdGlvbiAoaykge1xuICAgIC8vIGZpbmQgY2Fub25pY2FsbHkgdmFsaWQgc2lnbmF0dXJlXG4gICAgdmFyIFEgPSBHLm11bHRpcGx5KGspO1xuXG4gICAgaWYgKGN1cnZlLmlzSW5maW5pdHkoUSkpIHJldHVybiBmYWxzZTtcblxuICAgIHIgPSBRLmFmZmluZVgubW9kKG4pO1xuICAgIGlmIChyLnNpZ251bSgpID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzID0gay5tb2RJbnZlcnNlKG4pLm11bHRpcGx5KGUuYWRkKGQubXVsdGlwbHkocikpKS5tb2Qobik7XG4gICAgaWYgKHMuc2lnbnVtKCkgPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9LCBub25jZSk7XG5cbiAgdmFyIE5fT1ZFUl9UV08gPSBuLnNoaWZ0UmlnaHQoMSk7XG5cbiAgLy8gZW5mb3JjZSBsb3cgUyB2YWx1ZXMsIHNlZSBiaXA2MjogJ2xvdyBzIHZhbHVlcyBpbiBzaWduYXR1cmVzJ1xuICBpZiAocy5jb21wYXJlVG8oTl9PVkVSX1RXTykgPiAwKSB7XG4gICAgcyA9IG4uc3VidHJhY3Qocyk7XG4gIH1cblxuICByZXR1cm4gRUNTaWduYXR1cmUociwgcyk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeVJhdyhjdXJ2ZSwgZSwgc2lnbmF0dXJlLCBRKSB7XG4gIHZhciBuID0gY3VydmUubjtcbiAgdmFyIEcgPSBjdXJ2ZS5HO1xuXG4gIHZhciByID0gc2lnbmF0dXJlLnI7XG4gIHZhciBzID0gc2lnbmF0dXJlLnM7XG5cbiAgLy8gMS40LjEgRW5mb3JjZSByIGFuZCBzIGFyZSBib3RoIGludGVnZXJzIGluIHRoZSBpbnRlcnZhbCBbMSwgbiDiiJIgMV1cbiAgaWYgKHIuc2lnbnVtKCkgPD0gMCB8fCByLmNvbXBhcmVUbyhuKSA+PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmIChzLnNpZ251bSgpIDw9IDAgfHwgcy5jb21wYXJlVG8obikgPj0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIGMgPSBzXi0xIG1vZCBuXG4gIHZhciBjID0gcy5tb2RJbnZlcnNlKG4pO1xuXG4gIC8vIDEuNC40IENvbXB1dGUgdTEgPSBlc17iiJIxIG1vZCBuXG4gIC8vICAgICAgICAgICAgICAgdTIgPSByc17iiJIxIG1vZCBuXG4gIHZhciB1MSA9IGUubXVsdGlwbHkoYykubW9kKG4pO1xuICB2YXIgdTIgPSByLm11bHRpcGx5KGMpLm1vZChuKTtcblxuICAvLyAxLjQuNSBDb21wdXRlIFIgPSAoeFIsIHlSKSA9IHUxRyArIHUyUVxuICB2YXIgUiA9IEcubXVsdGlwbHlUd28odTEsIFEsIHUyKTtcblxuICAvLyAxLjQuNSAoY29udC4pIEVuZm9yY2UgUiBpcyBub3QgYXQgaW5maW5pdHlcbiAgaWYgKGN1cnZlLmlzSW5maW5pdHkoUikpIHJldHVybiBmYWxzZTtcblxuICAvLyAxLjQuNiBDb252ZXJ0IHRoZSBmaWVsZCBlbGVtZW50IFIueCB0byBhbiBpbnRlZ2VyXG4gIHZhciB4UiA9IFIuYWZmaW5lWDtcblxuICAvLyAxLjQuNyBTZXQgdiA9IHhSIG1vZCBuXG4gIHZhciB2ID0geFIubW9kKG4pO1xuXG4gIC8vIDEuNC44IElmIHYgPSByLCBvdXRwdXQgXCJ2YWxpZFwiLCBhbmQgaWYgdiAhPSByLCBvdXRwdXQgXCJpbnZhbGlkXCJcbiAgcmV0dXJuIHYuZXF1YWxzKHIpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnkoY3VydmUsIGhhc2gsIHNpZ25hdHVyZSwgUSkge1xuICAvLyAxLjQuMiBIID0gSGFzaChNKSwgYWxyZWFkeSBkb25lIGJ5IHRoZSB1c2VyXG4gIC8vIDEuNC4zIGUgPSBIXG4gIHZhciBlID0gQmlnSW50ZWdlci5mcm9tQnVmZmVyKGhhc2gpO1xuICByZXR1cm4gdmVyaWZ5UmF3KGN1cnZlLCBlLCBzaWduYXR1cmUsIFEpO1xufVxuXG4vKipcbiAgKiBSZWNvdmVyIGEgcHVibGljIGtleSBmcm9tIGEgc2lnbmF0dXJlLlxuICAqXG4gICogU2VlIFNFQyAxOiBFbGxpcHRpYyBDdXJ2ZSBDcnlwdG9ncmFwaHksIHNlY3Rpb24gNC4xLjYsIFwiUHVibGljXG4gICogS2V5IFJlY292ZXJ5IE9wZXJhdGlvblwiLlxuICAqXG4gICogaHR0cDovL3d3dy5zZWNnLm9yZy9kb3dubG9hZC9haWQtNzgwL3NlYzEtdjIucGRmXG4gICovXG5mdW5jdGlvbiByZWNvdmVyUHViS2V5KGN1cnZlLCBlLCBzaWduYXR1cmUsIGkpIHtcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKGkgJiAzLCBpLCAnUmVjb3ZlcnkgcGFyYW0gaXMgbW9yZSB0aGFuIHR3byBiaXRzJyk7XG5cbiAgdmFyIG4gPSBjdXJ2ZS5uO1xuICB2YXIgRyA9IGN1cnZlLkc7XG5cbiAgdmFyIHIgPSBzaWduYXR1cmUucjtcbiAgdmFyIHMgPSBzaWduYXR1cmUucztcblxuICBhc3NlcnQoci5zaWdudW0oKSA+IDAgJiYgci5jb21wYXJlVG8obikgPCAwLCAnSW52YWxpZCByIHZhbHVlJyk7XG4gIGFzc2VydChzLnNpZ251bSgpID4gMCAmJiBzLmNvbXBhcmVUbyhuKSA8IDAsICdJbnZhbGlkIHMgdmFsdWUnKTtcblxuICAvLyBBIHNldCBMU0Igc2lnbmlmaWVzIHRoYXQgdGhlIHktY29vcmRpbmF0ZSBpcyBvZGRcbiAgdmFyIGlzWU9kZCA9IGkgJiAxO1xuXG4gIC8vIFRoZSBtb3JlIHNpZ25pZmljYW50IGJpdCBzcGVjaWZpZXMgd2hldGhlciB3ZSBzaG91bGQgdXNlIHRoZVxuICAvLyBmaXJzdCBvciBzZWNvbmQgY2FuZGlkYXRlIGtleS5cbiAgdmFyIGlzU2Vjb25kS2V5ID0gaSA+PiAxO1xuXG4gIC8vIDEuMSBMZXQgeCA9IHIgKyBqblxuICB2YXIgeCA9IGlzU2Vjb25kS2V5ID8gci5hZGQobikgOiByO1xuICB2YXIgUiA9IGN1cnZlLnBvaW50RnJvbVgoaXNZT2RkLCB4KTtcblxuICAvLyAxLjQgQ2hlY2sgdGhhdCBuUiBpcyBhdCBpbmZpbml0eVxuICB2YXIgblIgPSBSLm11bHRpcGx5KG4pO1xuICBhc3NlcnQoY3VydmUuaXNJbmZpbml0eShuUiksICduUiBpcyBub3QgYSB2YWxpZCBjdXJ2ZSBwb2ludCcpO1xuXG4gIC8vIENvbXB1dGUgLWUgZnJvbSBlXG4gIHZhciBlTmVnID0gZS5uZWdhdGUoKS5tb2Qobik7XG5cbiAgLy8gMS42LjEgQ29tcHV0ZSBRID0gcl4tMSAoc1IgLSAgZUcpXG4gIC8vICAgICAgICAgICAgICAgUSA9IHJeLTEgKHNSICsgLWVHKVxuICB2YXIgckludiA9IHIubW9kSW52ZXJzZShuKTtcblxuICB2YXIgUSA9IFIubXVsdGlwbHlUd28ocywgRywgZU5lZykubXVsdGlwbHkockludik7XG4gIGN1cnZlLnZhbGlkYXRlKFEpO1xuXG4gIHJldHVybiBRO1xufVxuXG4vKipcbiAgKiBDYWxjdWxhdGUgcHVia2V5IGV4dHJhY3Rpb24gcGFyYW1ldGVyLlxuICAqXG4gICogV2hlbiBleHRyYWN0aW5nIGEgcHVia2V5IGZyb20gYSBzaWduYXR1cmUsIHdlIGhhdmUgdG9cbiAgKiBkaXN0aW5ndWlzaCBmb3VyIGRpZmZlcmVudCBjYXNlcy4gUmF0aGVyIHRoYW4gcHV0dGluZyB0aGlzXG4gICogYnVyZGVuIG9uIHRoZSB2ZXJpZmllciwgQml0Y29pbiBpbmNsdWRlcyBhIDItYml0IHZhbHVlIHdpdGggdGhlXG4gICogc2lnbmF0dXJlLlxuICAqXG4gICogVGhpcyBmdW5jdGlvbiBzaW1wbHkgdHJpZXMgYWxsIGZvdXIgY2FzZXMgYW5kIHJldHVybnMgdGhlIHZhbHVlXG4gICogdGhhdCByZXN1bHRlZCBpbiBhIHN1Y2Nlc3NmdWwgcHVia2V5IHJlY292ZXJ5LlxuICAqL1xuZnVuY3Rpb24gY2FsY1B1YktleVJlY292ZXJ5UGFyYW0oY3VydmUsIGUsIHNpZ25hdHVyZSwgUSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIHZhciBRcHJpbWUgPSByZWNvdmVyUHViS2V5KGN1cnZlLCBlLCBzaWduYXR1cmUsIGkpO1xuXG4gICAgLy8gMS42LjIgVmVyaWZ5IFFcbiAgICBpZiAoUXByaW1lLmVxdWFscyhRKSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCB2YWxpZCByZWNvdmVyeSBmYWN0b3InKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNhbGNQdWJLZXlSZWNvdmVyeVBhcmFtOiBjYWxjUHViS2V5UmVjb3ZlcnlQYXJhbSxcbiAgZGV0ZXJtaW5pc3RpY0dlbmVyYXRlSzogZGV0ZXJtaW5pc3RpY0dlbmVyYXRlSyxcbiAgcmVjb3ZlclB1YktleTogcmVjb3ZlclB1YktleSxcbiAgc2lnbjogc2lnbixcbiAgdmVyaWZ5OiB2ZXJpZnksXG4gIHZlcmlmeVJhdzogdmVyaWZ5UmF3XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmZvcmNlKHR5cGUsIHZhbHVlKSB7XG4gIC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRjb2luanMvYml0Y29pbmpzLWxpYlxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdBcnJheSc6XG4gICAgICB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHJldHVybjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBjYXNlICdCdWZmZXInOlxuICAgICAge1xuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkgcmV0dXJuO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGNhc2UgJ051bWJlcic6XG4gICAgICB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm47XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAge1xuICAgICAgICBpZiAoZ2V0TmFtZSh2YWx1ZS5jb25zdHJ1Y3RvcikgPT09IGdldE5hbWUodHlwZSkpIHJldHVybjtcbiAgICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkICcgKyAoZ2V0TmFtZSh0eXBlKSB8fCB0eXBlKSArICcsIGdvdCAnICsgdmFsdWUpO1xufTtcblxuZnVuY3Rpb24gZ2V0TmFtZShmbikge1xuICAvLyBXaHkgbm90IGZuLm5hbWU6IGh0dHBzOi8va2FuZ2F4LmdpdGh1Yi5pby9jb21wYXQtdGFibGUvZXM2LyNmdW5jdGlvbl9uYW1lX3Byb3BlcnR5XG4gIHZhciBtYXRjaCA9IGZuLnRvU3RyaW5nKCkubWF0Y2goL2Z1bmN0aW9uICguKj8pXFwoLyk7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxudmFyIGVjdXJ2ZSA9IHJlcXVpcmUoJ2VjdXJ2ZScpO1xudmFyIFBvaW50ID0gZWN1cnZlLlBvaW50O1xudmFyIHNlY3AyNTZrMSA9IGVjdXJ2ZS5nZXRDdXJ2ZUJ5TmFtZSgnc2VjcDI1NmsxJyk7XG52YXIgQmlnSW50ZWdlciA9IHJlcXVpcmUoJ2JpZ2knKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxudmFyIGhhc2ggPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBQdWJsaWNLZXkgPSByZXF1aXJlKCcuL2tleV9wdWJsaWMnKTtcbnZhciBrZXlVdGlscyA9IHJlcXVpcmUoJy4va2V5X3V0aWxzJyk7XG52YXIgY3JlYXRlSGFzaCA9IHJlcXVpcmUoJ2NyZWF0ZS1oYXNoJyk7XG52YXIgcHJvbWlzZUFzeW5jID0gcmVxdWlyZSgnLi9wcm9taXNlLWFzeW5jJyk7XG5cbnZhciBHID0gc2VjcDI1NmsxLkc7XG52YXIgbiA9IHNlY3AyNTZrMS5uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhdGVLZXk7XG5cbi8qKlxuICBAdHlwZWRlZiB7c3RyaW5nfSB3aWYgLSBodHRwczovL2VuLmJpdGNvaW4uaXQvd2lraS9XYWxsZXRfaW1wb3J0X2Zvcm1hdFxuICBAdHlwZWRlZiB7c3RyaW5nfSBwdWJrZXkgLSBFT1NLZXkuLlxuICBAdHlwZWRlZiB7ZWN1cnZlLlBvaW50fSBQb2ludFxuKi9cblxuLyoqXG4gIEBwYXJhbSB7QmlnSW50ZWdlcn0gZFxuKi9cbmZ1bmN0aW9uIFByaXZhdGVLZXkoZCkge1xuICAgIGlmICh0eXBlb2YgZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkuZnJvbVN0cmluZyhkKTtcbiAgICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkKSkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZUtleS5mcm9tQnVmZmVyKGQpO1xuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBkID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihkKSkgPT09ICdvYmplY3QnICYmIEJpZ0ludGVnZXIuaXNCaWdJbnRlZ2VyKGQuZCkpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkoZC5kKTtcbiAgICB9XG5cbiAgICBpZiAoIUJpZ0ludGVnZXIuaXNCaWdJbnRlZ2VyKGQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcHJpdmF0ZSBrZXknKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB7c3RyaW5nfSBwcml2YXRlIGtleSBsaWtlIFBWVF9LMV9iYXNlNThwcml2YXRla2V5Li4gKi9cbiAgICBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgLy8gdG9kbywgdXNlIFBWVF9LMV9cbiAgICAgICAgLy8gcmV0dXJuICdQVlRfSzFfJyArIGtleVV0aWxzLmNoZWNrRW5jb2RlKHRvQnVmZmVyKCksICdLMScpXG4gICAgICAgIHJldHVybiB0b1dpZigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAgICBAcmV0dXJuICB7d2lmfVxuICAgICovXG4gICAgZnVuY3Rpb24gdG9XaWYoKSB7XG4gICAgICAgIHZhciBwcml2YXRlX2tleSA9IHRvQnVmZmVyKCk7XG4gICAgICAgIC8vIGNoZWNrc3VtIGluY2x1ZGVzIHRoZSB2ZXJzaW9uXG4gICAgICAgIHByaXZhdGVfa2V5ID0gQnVmZmVyLmNvbmNhdChbbmV3IEJ1ZmZlcihbMHg4MF0pLCBwcml2YXRlX2tleV0pO1xuICAgICAgICByZXR1cm4ga2V5VXRpbHMuY2hlY2tFbmNvZGUocHJpdmF0ZV9rZXksICdzaGEyNTZ4MicpO1xuICAgIH1cblxuICAgIHZhciBwdWJsaWNfa2V5ID0gdm9pZCAwO1xuXG4gICAgLyoqXG4gICAgICAgIEByZXR1cm4ge1BvaW50fVxuICAgICovXG4gICAgZnVuY3Rpb24gdG9QdWJsaWMoKSB7XG4gICAgICAgIGlmIChwdWJsaWNfa2V5KSB7XG4gICAgICAgICAgICAvLyBjYWNoZVxuICAgICAgICAgICAgLy8gUyBMIE8gVyBpbiB0aGUgYnJvd3NlclxuICAgICAgICAgICAgcmV0dXJuIHB1YmxpY19rZXk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFEgPSBzZWNwMjU2azEuRy5tdWx0aXBseShkKTtcbiAgICAgICAgcmV0dXJuIHB1YmxpY19rZXkgPSBQdWJsaWNLZXkuZnJvbVBvaW50KFEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvQnVmZmVyKCkge1xuICAgICAgICByZXR1cm4gZC50b0J1ZmZlcigzMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICBFQ0lFU1xuICAgICAgQGFyZyB7c3RyaW5nfE9iamVjdH0gcHVia2V5IHdpZiwgUHVibGljS2V5IG9iamVjdFxuICAgICAgQHJldHVybiB7QnVmZmVyfSA2NCBieXRlIHNoYXJlZCBzZWNyZXRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFNoYXJlZFNlY3JldChwdWJsaWNfa2V5KSB7XG4gICAgICAgIHB1YmxpY19rZXkgPSBQdWJsaWNLZXkocHVibGljX2tleSk7XG4gICAgICAgIHZhciBLQiA9IHB1YmxpY19rZXkudG9VbmNvbXByZXNzZWQoKS50b0J1ZmZlcigpO1xuICAgICAgICB2YXIgS0JQID0gUG9pbnQuZnJvbUFmZmluZShzZWNwMjU2azEsIEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihLQi5zbGljZSgxLCAzMykpLCAvLyB4XG4gICAgICAgIEJpZ0ludGVnZXIuZnJvbUJ1ZmZlcihLQi5zbGljZSgzMywgNjUpKSAvLyB5XG4gICAgICAgICk7XG4gICAgICAgIHZhciByID0gdG9CdWZmZXIoKTtcbiAgICAgICAgdmFyIFAgPSBLQlAubXVsdGlwbHkoQmlnSW50ZWdlci5mcm9tQnVmZmVyKHIpKTtcbiAgICAgICAgdmFyIFMgPSBQLmFmZmluZVgudG9CdWZmZXIoeyBzaXplOiAzMiB9KTtcbiAgICAgICAgLy8gU0hBNTEyIHVzZWQgaW4gRUNJRVNcbiAgICAgICAgcmV0dXJuIGhhc2guc2hhNTEyKFMpO1xuICAgIH1cblxuICAgIC8vIC8qKiBFQ0lFUyBUT0RPIHVuaXQgdGVzdFxuICAgIC8vICAgQGFyZyB7c3RyaW5nfE9iamVjdH0gcHVia2V5IHdpZiwgUHVibGljS2V5IG9iamVjdFxuICAgIC8vICAgQHJldHVybiB7QnVmZmVyfSA2NCBieXRlIHNoYXJlZCBzZWNyZXRcbiAgICAvLyAqL1xuICAgIC8vIGZ1bmN0aW9uIGdldFNoYXJlZFNlY3JldChwdWJsaWNfa2V5KSB7XG4gICAgLy8gICAgIHB1YmxpY19rZXkgPSBQdWJsaWNLZXkocHVibGljX2tleSkudG9VbmNvbXByZXNzZWQoKVxuICAgIC8vICAgICB2YXIgUCA9IHB1YmxpY19rZXkuUS5tdWx0aXBseSggZCApO1xuICAgIC8vICAgICB2YXIgUyA9IFAuYWZmaW5lWC50b0J1ZmZlcih7c2l6ZTogMzJ9KTtcbiAgICAvLyAgICAgLy8gRUNJRVMsIGFkZHMgYW4gZXh0cmEgc2hhNTEyXG4gICAgLy8gICAgIHJldHVybiBoYXNoLnNoYTUxMihTKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgIEBhcmcge3N0cmluZ30gbmFtZSAtIGNoaWxkIGtleSBuYW1lLlxuICAgICAgQHJldHVybiB7UHJpdmF0ZUtleX1cbiAgICAgICBAZXhhbXBsZSBhY3RpdmVQcml2YXRlID0gbWFzdGVyUHJpdmF0ZS5nZXRDaGlsZEtleSgnb3duZXInKS5nZXRDaGlsZEtleSgnYWN0aXZlJylcbiAgICAgIEBleGFtcGxlIGFjdGl2ZVByaXZhdGUuZ2V0Q2hpbGRLZXkoJ215Y29udHJhY3QnKS5nZXRDaGlsZEtleSgnbXlwZXJtJylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENoaWxkS2V5KG5hbWUpIHtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcignV0FSTklORzogZ2V0Q2hpbGRLZXkgdW50ZXN0ZWQgYWdhaW5zdCBlb3NkJyk7IC8vIG5vIGVvc2QgaW1wbCB5ZXRcbiAgICAgICAgdmFyIGluZGV4ID0gY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHRvQnVmZmVyKCkpLnVwZGF0ZShuYW1lKS5kaWdlc3QoKTtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkoaW5kZXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSGV4KCkge1xuICAgICAgICByZXR1cm4gdG9CdWZmZXIoKS50b1N0cmluZygnaGV4Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZDogZCxcbiAgICAgICAgdG9XaWY6IHRvV2lmLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIHRvUHVibGljOiB0b1B1YmxpYyxcbiAgICAgICAgdG9CdWZmZXI6IHRvQnVmZmVyLFxuICAgICAgICBnZXRTaGFyZWRTZWNyZXQ6IGdldFNoYXJlZFNlY3JldCxcbiAgICAgICAgZ2V0Q2hpbGRLZXk6IGdldENoaWxkS2V5XG4gICAgfTtcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBwYXJzZUtleShwcml2YXRlU3RyKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBwcml2YXRlU3RyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwcml2YXRlU3RyKSwgJ3N0cmluZycsICdwcml2YXRlU3RyJyk7XG4gICAgdmFyIG1hdGNoID0gcHJpdmF0ZVN0ci5tYXRjaCgvXlBWVF8oW0EtWmEtejAtOV0rKV8oW0EtWmEtejAtOV0rKSQvKTtcblxuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAvLyBsZWdhY3kgV0lGIC0gY2hlY2tzdW0gaW5jbHVkZXMgdGhlIHZlcnNpb25cbiAgICAgICAgdmFyIHZlcnNpb25LZXkgPSBrZXlVdGlscy5jaGVja0RlY29kZShwcml2YXRlU3RyLCAnc2hhMjU2eDInKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB2ZXJzaW9uS2V5LnJlYWRVSW50OCgwKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKDB4ODAsIHZlcnNpb24sICdFeHBlY3RlZCB2ZXJzaW9uICcgKyAweDgwICsgJywgaW5zdGVhZCBnb3QgJyArIHZlcnNpb24pO1xuICAgICAgICB2YXIgX3ByaXZhdGVLZXkgPSBQcml2YXRlS2V5LmZyb21CdWZmZXIodmVyc2lvbktleS5zbGljZSgxKSk7XG4gICAgICAgIHZhciBfa2V5VHlwZSA9ICdLMSc7XG4gICAgICAgIHZhciBmb3JtYXQgPSAnV0lGJztcbiAgICAgICAgcmV0dXJuIHsgcHJpdmF0ZUtleTogX3ByaXZhdGVLZXksIGZvcm1hdDogZm9ybWF0LCBrZXlUeXBlOiBfa2V5VHlwZSB9O1xuICAgIH1cblxuICAgIGFzc2VydChtYXRjaC5sZW5ndGggPT09IDMsICdFeHBlY3RpbmcgcHJpdmF0ZSBrZXkgbGlrZTogUFZUX0sxX2Jhc2U1OHByaXZhdGVLZXkuLicpO1xuXG4gICAgdmFyIF9tYXRjaCA9IF9zbGljZWRUb0FycmF5KG1hdGNoLCAzKSxcbiAgICAgICAga2V5VHlwZSA9IF9tYXRjaFsxXSxcbiAgICAgICAga2V5U3RyaW5nID0gX21hdGNoWzJdO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGtleVR5cGUsICdLMScsICdLMSBwcml2YXRlIGtleSBleHBlY3RlZCcpO1xuICAgIHZhciBwcml2YXRlS2V5ID0gUHJpdmF0ZUtleS5mcm9tQnVmZmVyKGtleVV0aWxzLmNoZWNrRGVjb2RlKGtleVN0cmluZywga2V5VHlwZSkpO1xuICAgIHJldHVybiB7IHByaXZhdGVLZXk6IHByaXZhdGVLZXksIGZvcm1hdDogJ1BWVCcsIGtleVR5cGU6IGtleVR5cGUgfTtcbn1cblxuUHJpdmF0ZUtleS5mcm9tSGV4ID0gZnVuY3Rpb24gKGhleCkge1xuICAgIHJldHVybiBQcml2YXRlS2V5LmZyb21CdWZmZXIobmV3IEJ1ZmZlcihoZXgsICdoZXgnKSk7XG59O1xuXG5Qcml2YXRlS2V5LmZyb21CdWZmZXIgPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RpbmcgcGFyYW1ldGVyIHRvIGJlIGEgQnVmZmVyIHR5cGVcIik7XG4gICAgfVxuICAgIGlmIChidWYubGVuZ3RoID09PSAzMyAmJiBidWZbMzJdID09PSAxKSB7XG4gICAgICAgIC8vIHJlbW92ZSBjb21wcmVzc2lvbiBmbGFnXG4gICAgICAgIGJ1ZiA9IGJ1Zi5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIGlmICgzMiAhPT0gYnVmLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGluZyAzMiBieXRlcywgaW5zdGVhZCBnb3QgJyArIGJ1Zi5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gUHJpdmF0ZUtleShCaWdJbnRlZ2VyLmZyb21CdWZmZXIoYnVmKSk7XG59O1xuXG4vKipcbiAgICBAYXJnIHtzdHJpbmd9IHNlZWQgLSBhbnkgbGVuZ3RoIHN0cmluZy4gIFRoaXMgaXMgcHJpdmF0ZSwgdGhlIHNhbWUgc2VlZFxuICAgIHByb2R1Y2VzIHRoZSBzYW1lIHByaXZhdGUga2V5IGV2ZXJ5IHRpbWUuXG5cbiAgICBAcmV0dXJuIHtQcml2YXRlS2V5fVxuKi9cblByaXZhdGVLZXkuZnJvbVNlZWQgPSBmdW5jdGlvbiAoc2VlZCkge1xuICAgIC8vIGdlbmVyYXRlX3ByaXZhdGVfa2V5XG4gICAgaWYgKCEodHlwZW9mIHNlZWQgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlZWQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gUHJpdmF0ZUtleS5mcm9tQnVmZmVyKGhhc2guc2hhMjU2KHNlZWQpKTtcbn07XG5cbi8qKlxuICBAYXJnIHt3aWZ9IGtleVxuICBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGtleSBpcyBpbiB0aGUgV2FsbGV0IEltcG9ydCBGb3JtYXRcbiovXG5Qcml2YXRlS2V5LmlzV2lmID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICB0cnkge1xuICAgICAgICBhc3NlcnQocGFyc2VLZXkodGV4dCkuZm9ybWF0ID09PSAnV0lGJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8qKlxuICBAYXJnIHt3aWZ8QnVmZmVyfFByaXZhdGVLZXl9IGtleVxuICBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGtleSBpcyBjb252ZXJ0YWJsZSB0byBhIHByaXZhdGUga2V5IG9iamVjdC5cbiovXG5Qcml2YXRlS2V5LmlzVmFsaWQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgUHJpdmF0ZUtleShrZXkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vKiogQGRlcHJlY2F0ZWQgKi9cblByaXZhdGVLZXkuZnJvbVdpZiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBjb25zb2xlLmxvZygnUHJpdmF0ZUtleS5mcm9tV2lmIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgUHJpdmF0ZUtleS5mcm9tU3RyaW5nJyk7XG4gICAgcmV0dXJuIFByaXZhdGVLZXkuZnJvbVN0cmluZyhzdHIpO1xufTtcblxuLyoqXG4gICAgQHRocm93cyB7QXNzZXJ0RXJyb3J8RXJyb3J9IHBhcnNpbmcga2V5XG4gICAgQGFyZyB7c3RyaW5nfSBwcml2YXRlU3RyIEVvc2lvIG9yIFdhbGxldCBJbXBvcnQgRm9ybWF0ICh3aWYpIC0tIGEgc2VjcmV0XG4qL1xuUHJpdmF0ZUtleS5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHByaXZhdGVTdHIpIHtcbiAgICByZXR1cm4gcGFyc2VLZXkocHJpdmF0ZVN0cikucHJpdmF0ZUtleTtcbn07XG5cbi8qKlxuICBDcmVhdGUgYSBuZXcgcmFuZG9tIHByaXZhdGUga2V5LlxuXG4gIENhbGwgaW5pdGlhbGl6ZSgpIGZpcnN0IHRvIHJ1biBzb21lIHNlbGYtY2hlY2tpbmcgY29kZSBhbmQgZ2F0aGVyIHNvbWUgQ1BVXG4gIGVudHJvcHkuXG5cbiAgQGFyZyB7bnVtYmVyfSBbY3B1RW50cm9weUJpdHMgPSAwXSAtIGFkZGl0aW9uYWwgQ1BVIGVudHJvcHksIHRoaXMgYWxyZWFkeVxuICBoYXBwZW5zIG9uY2Ugc28gaXQgc2hvdWxkIG5vdCBiZSBuZWVkZWQgYWdhaW4uXG5cbiAgQHJldHVybiB7UHJvbWlzZTxQcml2YXRlS2V5Pn0gLSByYW5kb20gcHJpdmF0ZSBrZXlcbiovXG5Qcml2YXRlS2V5LnJhbmRvbUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3B1RW50cm9weUJpdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG5cbiAgICByZXR1cm4gUHJpdmF0ZUtleS5pbml0aWFsaXplKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBQcml2YXRlS2V5LmZyb21CdWZmZXIoa2V5VXRpbHMucmFuZG9tMzJCeXRlQnVmZmVyKHsgY3B1RW50cm9weUJpdHM6IGNwdUVudHJvcHlCaXRzIH0pKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICBAcmV0dXJuIHtQcm9taXNlPFByaXZhdGVLZXk+fSBmb3IgdGVzdGluZywgZG9lcyBub3QgcmVxdWlyZSBpbml0aWFsaXplKCkuXG4qL1xuUHJpdmF0ZUtleS51bnNhZmVSYW5kb21LZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShQcml2YXRlS2V5LmZyb21CdWZmZXIoa2V5VXRpbHMucmFuZG9tMzJCeXRlQnVmZmVyKHsgc2FmZTogZmFsc2UgfSkpKTtcbn07XG5cbnZhciBpbml0aWFsaXplZCA9IGZhbHNlLFxuICAgIHVuaXRUZXN0ZWQgPSBmYWxzZTtcblxuLyoqXG4gIFJ1biBzZWxmLWNoZWNraW5nIGNvZGUgYW5kIGdhdGhlciBDUFUgZW50cm9weS5cblxuICBJbml0aWFsaXphdGlvbiBoYXBwZW5zIG9uY2UgZXZlbiBpZiBjYWxsZWQgbXVsdGlwbGUgdGltZXMuXG5cbiAgQHJldHVybiB7UHJvbWlzZX1cbiovXG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdW5pdFRlc3QoKTtcbiAgICBrZXlVdGlscy5hZGRFbnRyb3B5LmFwcGx5KGtleVV0aWxzLCBfdG9Db25zdW1hYmxlQXJyYXkoa2V5VXRpbHMuY3B1RW50cm9weSgpKSk7XG4gICAgYXNzZXJ0KGtleVV0aWxzLmVudHJvcHlDb3VudCgpID49IDEyOCwgJ2luc3VmZmljaWVudCBlbnRyb3B5Jyk7XG5cbiAgICBpbml0aWFsaXplZCA9IHRydWU7XG59XG5cblByaXZhdGVLZXkuaW5pdGlhbGl6ZSA9IHByb21pc2VBc3luYyhpbml0aWFsaXplKTtcblxuLyoqXG4gIFVuaXQgdGVzdCBiYXNpYyBwcml2YXRlIGFuZCBwdWJsaWMga2V5IGZ1bmN0aW9uYWxpdHkuXG5cbiAgQHRocm93cyB7QXNzZXJ0RXJyb3J9XG4qL1xuZnVuY3Rpb24gdW5pdFRlc3QoKSB7XG4gICAgdmFyIHB2dCA9IFByaXZhdGVLZXkoaGFzaC5zaGEyNTYoJycpKTtcblxuICAgIHZhciBwdnRFcnJvciA9ICdrZXkgY29tcGFyaXNvbiB0ZXN0IGZhaWxlZCBvbiBhIGtub3duIHByaXZhdGUga2V5JztcbiAgICBhc3NlcnQuZXF1YWwocHZ0LnRvV2lmKCksICc1S1laZFVFbzM5ejNGUHJ0dVgyUWJid0duTlA1elRkN3l5cjJTQzFqMjk5c0JDbldqc3MnLCBwdnRFcnJvcik7XG4gICAgYXNzZXJ0LmVxdWFsKHB2dC50b1N0cmluZygpLCAnNUtZWmRVRW8zOXozRlBydHVYMlFiYndHbk5QNXpUZDd5eXIyU0MxajI5OXNCQ25XanNzJywgcHZ0RXJyb3IpO1xuICAgIC8vIGFzc2VydC5lcXVhbChwdnQudG9TdHJpbmcoKSwgJ1BWVF9LMV8yakgzbm5oeGhSM3pQVWNzS2FXV1pDOVptWkFuS20zR0FuRkQxeHluR0pFMVpudXZqZCcsIHB2dEVycm9yKVxuXG4gICAgdmFyIHB1YiA9IHB2dC50b1B1YmxpYygpO1xuICAgIHZhciBwdWJFcnJvciA9ICdwdWJrZXkgc3RyaW5nIGNvbXBhcmlzb24gdGVzdCBmYWlsZWQgb24gYSBrbm93biBwdWJsaWMga2V5JztcbiAgICBhc3NlcnQuZXF1YWwocHViLnRvU3RyaW5nKCksICdFT1M4NTlneGZuWHlVcmlNZ1VlVGhoMWZXdjNvcWNwTEZ5SGEzVGZGWUM0UEsySHFoVG9WTScsIHB1YkVycm9yKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwocHViLnRvU3RyaW5nKCksICdQVUJfSzFfODU5Z3hmblh5VXJpTWdVZVRoaDFmV3Yzb3FjcExGeUhhM1RmRllDNFBLMkh0N2JlZVgnLCBwdWJFcnJvcilcbiAgICAvLyBhc3NlcnQuZXF1YWwocHViLnRvU3RyaW5nTGVnYWN5KCksICdFT1M4NTlneGZuWHlVcmlNZ1VlVGhoMWZXdjNvcWNwTEZ5SGEzVGZGWUM0UEsySHFoVG9WTScsIHB1YkVycm9yKVxuXG4gICAgZG9lc05vdFRocm93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkuZnJvbVN0cmluZyhwdnQudG9XaWYoKSk7XG4gICAgfSwgJ2NvbnZlcnRpbmcga25vd24gd2lmIGZyb20gc3RyaW5nJyk7XG4gICAgZG9lc05vdFRocm93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkuZnJvbVN0cmluZyhwdnQudG9TdHJpbmcoKSk7XG4gICAgfSwgJ2NvbnZlcnRpbmcga25vd24gcHZ0IGZyb20gc3RyaW5nJyk7XG4gICAgZG9lc05vdFRocm93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tU3RyaW5nKHB1Yi50b1N0cmluZygpKTtcbiAgICB9LCAnY29udmVydGluZyBrbm93biBwdWJsaWMga2V5IGZyb20gc3RyaW5nJyk7XG4gICAgLy8gZG9lc05vdFRocm93KCgpID0+IFB1YmxpY0tleS5mcm9tU3RyaW5nKHB1Yi50b1N0cmluZ0xlZ2FjeSgpKSwgJ2NvbnZlcnRpbmcga25vd24gcHVibGljIGtleSBmcm9tIHN0cmluZycpXG5cbiAgICB1bml0VGVzdGVkID0gdHJ1ZTtcbn1cblxuLyoqIEBwcml2YXRlICovXG52YXIgZG9lc05vdFRocm93ID0gZnVuY3Rpb24gZG9lc05vdFRocm93KGNiLCBtc2cpIHtcbiAgICB0cnkge1xuICAgICAgICBjYigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSBtc2cgKyAnID09PiAnICsgZXJyb3IubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1vZChudW1iZXIsIG1vZHVsbykge1xuXHR2YXIgcmVtYWluID0gbnVtYmVyICUgbW9kdWxvO1xuXHRyZXR1cm4gTWF0aC5mbG9vcihyZW1haW4gPj0gMCA/IHJlbWFpbiA6IHJlbWFpbiArIG1vZHVsbyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvY2Vzc0FyZ3M7XG5cbi8qKlxuICBAdHlwZWRlZiB7b2JqZWN0fSBwcm9jZXNzZWRBcmdzIC0gTm9ybWFsaXplZCBvYmplY3QgY29udGFpbmluZyBhcmd1bWVudHMsIGFuZFxuICBhIGNoYWluZWQgcHJvbWlzZSBhbmQgYSBjYWxsYmFjay5cblxuICBAcHJvcGVydHkge29iamVjdH0gcGFyYW1zIC0gbm9ybWFsaXplZCBhcmdzIG9ubHksIHBhcmFtZXRlcnMgYnkgbmFtZSwgbm8gZXh0cmEgb3B0aW9ucyBvciBjYWxsYmFjay5cblxuICBAcHJvcGVydHkge29iamVjdH0gb3B0aW9ucyAtIG5vbi1udWxsIG9yIG5vbi11bmRlZmluZWQgcmV0dXJuIHZhbHVlIGZyb20gaW52b2NhdGlvbiBvZlxuICBvcHRpb25zRm9ybWF0dGVyKG9wdGlvbnNQYXJhbSkuXG5cbiAgQHByb3BlcnR5IHtmdW5jdGlvbn0gY2FsbGJhY2sgLWNoYWluZWQgdG8gb3B0aW9uYWwgY2FsbGJhY2sgcHJvdmlkZWQgaW4gYXJncy4gIFJlc29sdmVzXG4gIG9yIHJlamVjdHMgcmV0dXJuUHJvbWlzZS5cblxuICBAcHJvcGVydHkge1Byb21pc2V9IHJldHVyblByb21pc2UgLSBwcm9taXNlIGlzIHJldHVybmVkIHdoZW4gbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQgaW5cbiAgYXJnc1thcmdzLmxlbmd0aCAtIDFdLiAgVW5kZWZpbmVkIHdoZW4gYSBjYWxsYmFjayBpcyBwcm92aWRlZC5cbiovXG4vKipcbiAgQ29udmVydCBhcmdzIGFycmF5IG9yIG9iamVjdCBpbnRvIGEgbm9ybWFsaXplZCB2YWx1ZSBvYmplY3QuICBTdXBwb29ydHMgZXh0cmFcbiAgb3B0aW9ucyBhbmQob3IpIGNhbGxiYWNrIHBhcmFtZXRlcnMuXG5cbiAgUGVyIHRoZSBQcm9taXNlIEFQSSBmZWF0dXJlIHByb21pc2lmeUFsbCAoc2VlIGFsc28gc2ItcHJvbWlzaWZ5KSwgdGhlIGNhbGxiYWNrXG4gIChpZiBwcm92aWRlZCkgbXVzdCBhbHdheXMgYmUgbGFzdC5cblxuICBAYXJnIHtBcnJheXxvYmplY3R9IGFyZ3MgLSBVc2VyLXByb3ZpZGVkIHBhcmFtZXRlciBvYmplY3Qgb3IgYXJyYXkgb2YgcGFyYW1ldGVyc1xuICBAYXJnIHtBcnJheX0gZGVmUGFyYW1zIC0gTmFtZXMgZm9yIHRoZSBwYXJhbWV0ZXJzLlxuICBAYXJnIHtzdHJpbmd9IG1ldGhvZE5hbWUgLSBmb3IgZXJyb3IgcmVwb3J0aW5nXG4gIEBhcmcge2Z1bmN0aW9ufSBbb3B0aW9uc0Zvcm1hdHRlcihleHRyYVBhcmFtKSA9IG51bGxdIC0gb3B0aW9uYWwgY2FsbGJhY2sgdXNlZCBpZiBhblxuICAgIGV4dHJhIG9wdGlvbmFsIChub24tY2FsbGJhY2spIHBhcmFtZXRlciBpcyBwcm92aWRlZC5cblxuXG4gIEByZXR1cm4ge3Byb2Nlc3NlZEFyZ3N9IHByb2Nlc3NlZEFyZ3NcbiAgQHRocm93cyBUeXBlRXJyb3IgLSB3aGVuIHBhcmFtZXRlciBjb3VudCBpcyBub3QgZXhhY3QgKGFmdGVyIGFkanVzdGluZyBmb3JcbiAgb3B0aW9ucyBhbmQgY2FsbGJhY2spXG5cbiAgQGV4YW1wbGUgYXBpLnByb2Nlc3NBcmdzKGFyZ3MsIFsnYWNjb3VudCddLCAnY29udHJhY3QnLCBvcHRpb25zRm9ybWF0dGVyKVxuKi9cbmZ1bmN0aW9uIHByb2Nlc3NBcmdzKGFyZ3MsIGRlZlBhcmFtcykge1xuICB2YXIgbWV0aG9kTmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ21ldGhvZCc7XG4gIHZhciBvcHRpb25zRm9ybWF0dGVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuXG4gIHZhciBwYXJhbXMgPSB7fTtcbiAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICB2YXIgZXhwZWN0ZWRBcmdDb3VudCA9IGRlZlBhcmFtcy5sZW5ndGg7XG5cbiAgLy8gRXh0cmEgY2FsbGJhY2sgYXJndW1lbnQ/ICBMYXN0IHBlciBwcm9taXNpZnlBbGwgc3RhbmRhcmQuXG4gIHZhciBjYWxsYmFja0FyZyA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFja0FyZyA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBhcmdzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgdmFyIGNhbGxiYWNrID0gdm9pZCAwO1xuICB2YXIgcmV0dXJuUHJvbWlzZSA9IHZvaWQgMDtcbiAgaWYgKGNhbGxiYWNrQXJnKSB7XG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIsIHJlc3VsdCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYWxsYmFja0FyZyhlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tBcmcobnVsbCwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVyblByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvLyBMb29rIGZvciB0aGUgb3B0aW9ucyBwYXJhbWV0ZXIgKGFmdGVyIHBvdGVudGlhbCBjYWxsYmFjayB3YXMgcmVtb3ZlZClcbiAgaWYgKHR5cGVvZiBvcHRpb25zRm9ybWF0dGVyID09PSAnZnVuY3Rpb24nICYmIGFyZ3MubGVuZ3RoID4gMCAmJiAoX3R5cGVvZihhcmdzWzBdKSA9PT0gJ29iamVjdCcgJiYgYXJncy5sZW5ndGggPT09IDIgfHwgYXJncy5sZW5ndGggPT09IGV4cGVjdGVkQXJnQ291bnQgKyAxKSkge1xuICAgIC8vQW4gZXh0cmEgb3B0aW9ucyBhcmd1bWVudFxuICAgIG9wdGlvbnMgPSBvcHRpb25zRm9ybWF0dGVyKGFyZ3NbYXJncy5sZW5ndGggLSAxXSk7XG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgLy8gSXQgaXMgdmFsaWQsIHJlbW92ZSBpdCB0byBhdm9pZCBwYXJhbWV0ZXIgY291bnQgYW4gZXJyb3IgYmVsb3dcbiAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyYW1ldGV0ZXJzIChhcmdzKSBjYW4gYmUgb3JkZXJlZCBvciBhbiBvYmplY3RcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIF90eXBlb2YoYXJnc1swXSkgPT09ICdvYmplY3QnKSB7XG4gICAgcGFyYW1zID0gYXJnc1swXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBnaXZlIG9yZGVyZWQgcGFyYW1hdGVycyBuYW1lc1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gZXhwZWN0ZWRBcmdDb3VudCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGVvZiBkZWZQYXJhbXNbZXhwZWN0ZWRBcmdDb3VudF0nLCBhcmdzKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtZXRob2ROYW1lICsgJyBpcyBleHBlY3RpbmcgJyArIGV4cGVjdGVkQXJnQ291bnQgKyAnIHBhcmFtZXRlcnMgYnV0ICcgKyBhcmdzLmxlbmd0aCArICcgd2hlcmUgcHJvdmlkZWQnKTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IG9yZGVyZWQgcGFyYW1ldGVycyBpbnRvIGEgdmFsdWUgb2JqZWN0IGJ5IHBhcmFtZXRlciBuYW1lXG4gICAgdmFyIHBvcyA9IDA7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBkZWZQYXJhbXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBkZWZQYXJhbSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIHBhcmFtc1tkZWZQYXJhbV0gPSBhcmdzW3Bvc107XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4geyBwYXJhbXM6IHBhcmFtcywgb3B0aW9uczogb3B0aW9ucywgY2FsbGJhY2s6IGNhbGxiYWNrLCByZXR1cm5Qcm9taXNlOiByZXR1cm5Qcm9taXNlIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCdpc29tb3JwaGljLWZldGNoJyk7XG52YXIgY2FtZWxDYXNlID0gcmVxdWlyZSgnY2FtZWwtY2FzZScpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2V4cG9ydGVkLWhlbHBlcnMnKTtcbnZhciBwcm9jZXNzQXJncyA9IHJlcXVpcmUoJy4vcHJvY2Vzcy1hcmdzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpR2VuO1xuXG5mdW5jdGlvbiBhcGlHZW4odmVyc2lvbiwgZGVmaW5pdGlvbnMpIHtcbiAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgdmFyIGNvbmZpZ0RlZmF1bHRzID0ge1xuICAgIGh0dHBFbmRwb2ludDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODg4OCcsXG4gICAgdmVyYm9zZTogZmFsc2UsXG4gICAgbG9nZ2VyOiB7XG4gICAgICBsb2c6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgICAgdmFyIF9jb25zb2xlO1xuXG4gICAgICAgIHJldHVybiBjb25maWcudmVyYm9zZSA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICB2YXIgX2NvbnNvbGUyO1xuXG4gICAgICAgIHJldHVybiBjb25maWcudmVyYm9zZSA/IChfY29uc29sZTIgPSBjb25zb2xlKS5lcnJvci5hcHBseShfY29uc29sZTIsIGFyZ3VtZW50cykgOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBhcHBseURlZmF1bHRzKHRhcmdldCwgZGVmYXVsdHMpIHtcbiAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAodGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IGRlZmF1bHRzW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhcHBseURlZmF1bHRzKGNvbmZpZywgY29uZmlnRGVmYXVsdHMpO1xuICBhcHBseURlZmF1bHRzKGNvbmZpZy5sb2dnZXIsIGNvbmZpZ0RlZmF1bHRzLmxvZ2dlcik7XG5cbiAgdmFyIGFwaSA9IHt9O1xuICB2YXIgaHR0cEVuZHBvaW50ID0gY29uZmlnLmh0dHBFbmRwb2ludDtcblxuXG4gIGZvciAodmFyIGFwaUdyb3VwIGluIGRlZmluaXRpb25zKSB7XG4gICAgZm9yICh2YXIgYXBpTWV0aG9kIGluIGRlZmluaXRpb25zW2FwaUdyb3VwXSkge1xuICAgICAgdmFyIG1ldGhvZE5hbWUgPSBjYW1lbENhc2UoYXBpTWV0aG9kKTtcbiAgICAgIHZhciB1cmwgPSBodHRwRW5kcG9pbnQgKyAnLycgKyB2ZXJzaW9uICsgJy8nICsgYXBpR3JvdXAgKyAnLycgKyBhcGlNZXRob2Q7XG4gICAgICBhcGlbbWV0aG9kTmFtZV0gPSBmZXRjaE1ldGhvZChtZXRob2ROYW1lLCB1cmwsIGRlZmluaXRpb25zW2FwaUdyb3VwXVthcGlNZXRob2RdLCBjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGhlbHBlcikge1xuICAgIC8vIEluc2VydCBgYXBpYCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGFsbCBBUEkgaGVscGVyc1xuICAgIGFwaVtoZWxwZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9oZWxwZXJzJGFwaTtcblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChfaGVscGVycyRhcGkgPSBoZWxwZXJzLmFwaSlbaGVscGVyXS5hcHBseShfaGVscGVycyRhcGksIFthcGldLmNvbmNhdChhcmdzKSk7XG4gICAgfTtcbiAgfTtcblxuICBmb3IgKHZhciBoZWxwZXIgaW4gaGVscGVycy5hcGkpIHtcbiAgICBfbG9vcChoZWxwZXIpO1xuICB9XG4gIHJldHVybiBhcGk7XG59XG5cbmZ1bmN0aW9uIGZldGNoTWV0aG9kKG1ldGhvZE5hbWUsIHVybCwgZGVmaW5pdGlvbiwgY29uZmlnKSB7XG4gIHZhciBsb2dnZXIgPSBjb25maWcubG9nZ2VyO1xuXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2codXNhZ2UobWV0aG9kTmFtZSwgZGVmaW5pdGlvbikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBvcHRpb25zRm9ybWF0dGVyID0gZnVuY3Rpb24gb3B0aW9uc0Zvcm1hdHRlcihvcHRpb24pIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHsgYnJvYWRjYXN0OiBvcHRpb24gfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHByb2Nlc3NlZEFyZ3MgPSBwcm9jZXNzQXJncyhhcmdzLCBPYmplY3Qua2V5cyhkZWZpbml0aW9uLnBhcmFtcyB8fCBbXSksIG1ldGhvZE5hbWUsIG9wdGlvbnNGb3JtYXR0ZXIpO1xuXG4gICAgdmFyIHBhcmFtcyA9IHByb2Nlc3NlZEFyZ3MucGFyYW1zLFxuICAgICAgICBvcHRpb25zID0gcHJvY2Vzc2VkQXJncy5vcHRpb25zLFxuICAgICAgICByZXR1cm5Qcm9taXNlID0gcHJvY2Vzc2VkQXJncy5yZXR1cm5Qcm9taXNlO1xuICAgIHZhciBjYWxsYmFjayA9IHByb2Nlc3NlZEFyZ3MuY2FsbGJhY2s7XG5cblxuICAgIHZhciBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcbiAgICBpZiAobG9nZ2VyLmxvZykge1xuICAgICAgbG9nZ2VyLmxvZygnYXBpID4nLCAncG9zdCcsICdcXHQnLCB1cmwsIGJvZHkpO1xuICAgIH1cbiAgICB2YXIgZmV0Y2hDb25maWd1cmF0aW9uID0geyBib2R5OiBib2R5LCBtZXRob2Q6ICdQT1NUJyB9O1xuICAgIE9iamVjdC5hc3NpZ24oZmV0Y2hDb25maWd1cmF0aW9uLCBjb25maWcuZmV0Y2hDb25maWd1cmF0aW9uKTtcblxuICAgIGZldGNoKHVybCwgZmV0Y2hDb25maWd1cmF0aW9uKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpLnRoZW4oZnVuY3Rpb24gKGJvZHlSZXNwKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGJvZHlSZXNwKTtcbiAgICAgICAgICBlcnJvci5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgZXJyb3Iuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKG9iamVjdFJlc3ApIHtcbiAgICAgIGlmIChsb2dnZXIubG9nKSB7XG4gICAgICAgIGxvZ2dlci5sb2coJ2FwaSA8JywgJ3Jlc3BvbnNlJywgJ1xcdCcsIHVybCwgSlNPTi5zdHJpbmdpZnkob2JqZWN0UmVzcCkpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgb2JqZWN0UmVzcCk7XG4gICAgICB9IGNhdGNoIChjYWxsYmFja0Vycm9yKSB7XG4gICAgICAgIGlmIChsb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2FwaSA8JywgJ3Jlc3VsdCBjYWxsYmFjaycsICc6JywgY2FsbGJhY2tFcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBub2Rlb3MgZm9ybWF0IChmYWlsIHNhZmUpXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGVycm9yLm1lc3NhZ2UpLmVycm9yLmRldGFpbHNbMF07XG4gICAgICB9IGNhdGNoIChlMikge31cblxuICAgICAgaWYgKGxvZ2dlci5lcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ2FwaSA8JywgJ2Vycm9yJywgJ1xcdCcsIG1lc3NhZ2UsIHVybCwgYm9keSk7XG4gICAgICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH0gY2F0Y2ggKGNhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgaWYgKGxvZ2dlci5lcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignYXBpIDwnLCAnZXJyb3IgY2FsbGJhY2snLCAnOicsIGNhbGxiYWNrRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuUHJvbWlzZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNhZ2UobWV0aG9kTmFtZSwgZGVmaW5pdGlvbikge1xuICB2YXIgdXNhZ2UgPSAnJztcbiAgdmFyIG91dCA9IGZ1bmN0aW9uIG91dChzdHIpIHtcbiAgICB1c2FnZSArPSBzdHIgKyAnXFxuJztcbiAgfTtcblxuICBvdXQoJ1VTQUdFJyk7XG4gIG91dChtZXRob2ROYW1lICsgJyAtICcgKyBkZWZpbml0aW9uLmJyaWVmKTtcblxuICBvdXQoJ1xcblBBUkFNRVRFUlMnKTtcbiAgaWYgKGRlZmluaXRpb24ucGFyYW1zKSB7XG4gICAgb3V0KEpTT04uc3RyaW5naWZ5KGRlZmluaXRpb24ucGFyYW1zLCBudWxsLCAyKSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0KCdub25lJyk7XG4gIH1cblxuICBvdXQoJ1xcblJFVFVSTlMnKTtcbiAgaWYgKGRlZmluaXRpb24ucmVzdWx0cykge1xuICAgIG91dCgnJyArIEpTT04uc3RyaW5naWZ5KGRlZmluaXRpb24ucmVzdWx0cywgbnVsbCwgMikpO1xuICB9IGVsc2Uge1xuICAgIG91dCgnbm8gZGF0YScpO1xuICB9XG5cbiAgb3V0KCdcXG5FUlJPUlMnKTtcbiAgaWYgKGRlZmluaXRpb24uZXJyb3JzKSB7XG4gICAgZm9yICh2YXIgZXJyb3IgaW4gZGVmaW5pdGlvbi5lcnJvcnMpIHtcbiAgICAgIHZhciBlcnJvckRlc2MgPSBkZWZpbml0aW9uLmVycm9yc1tlcnJvcl07XG4gICAgICBvdXQoJycgKyBlcnJvciArIChlcnJvckRlc2MgPyAnIC0gJyArIGVycm9yRGVzYyA6ICcnKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG91dCgnbm90aGluZyBzcGVjaWFsJyk7XG4gIH1cblxuICByZXR1cm4gdXNhZ2U7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnLi4vR2V0SW50cmluc2ljJyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRTeW50YXhFcnJvciA9IEdldEludHJpbnNpYygnJVN5bnRheEVycm9yJScpO1xuXG52YXIgaGFzID0gcmVxdWlyZSgnaGFzJyk7XG5cbnZhciBwcmVkaWNhdGVzID0ge1xuICAvLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcHJvcGVydHktZGVzY3JpcHRvci1zcGVjaWZpY2F0aW9uLXR5cGVcbiAgJ1Byb3BlcnR5IERlc2NyaXB0b3InOiBmdW5jdGlvbiBpc1Byb3BlcnR5RGVzY3JpcHRvcihFUywgRGVzYykge1xuICAgIGlmIChFUy5UeXBlKERlc2MpICE9PSAnT2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWxsb3dlZCA9IHtcbiAgICAgICdbW0NvbmZpZ3VyYWJsZV1dJzogdHJ1ZSxcbiAgICAgICdbW0VudW1lcmFibGVdXSc6IHRydWUsXG4gICAgICAnW1tHZXRdXSc6IHRydWUsXG4gICAgICAnW1tTZXRdXSc6IHRydWUsXG4gICAgICAnW1tWYWx1ZV1dJzogdHJ1ZSxcbiAgICAgICdbW1dyaXRhYmxlXV0nOiB0cnVlXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBEZXNjKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChoYXMoRGVzYywga2V5KSAmJiAhYWxsb3dlZFtrZXldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaXNEYXRhID0gaGFzKERlc2MsICdbW1ZhbHVlXV0nKTtcbiAgICB2YXIgSXNBY2Nlc3NvciA9IGhhcyhEZXNjLCAnW1tHZXRdXScpIHx8IGhhcyhEZXNjLCAnW1tTZXRdXScpO1xuICAgIGlmIChpc0RhdGEgJiYgSXNBY2Nlc3Nvcikge1xuICAgICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1Byb3BlcnR5IERlc2NyaXB0b3JzIG1heSBub3QgYmUgYm90aCBhY2Nlc3NvciBhbmQgZGF0YSBkZXNjcmlwdG9ycycpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc3NlcnRSZWNvcmQoRVMsIHJlY29yZFR5cGUsIGFyZ3VtZW50TmFtZSwgdmFsdWUpIHtcbiAgdmFyIHByZWRpY2F0ZSA9IHByZWRpY2F0ZXNbcmVjb3JkVHlwZV07XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3ICRTeW50YXhFcnJvcigndW5rbm93biByZWNvcmQgdHlwZTogJyArIHJlY29yZFR5cGUpO1xuICB9XG4gIGlmICghcHJlZGljYXRlKEVTLCB2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcihhcmd1bWVudE5hbWUgKyAnIG11c3QgYmUgYSAnICsgcmVjb3JkVHlwZSk7XG4gIH1cbiAgY29uc29sZS5sb2cocHJlZGljYXRlKEVTLCB2YWx1ZSksIHZhbHVlKTtcbn07XG4iLCJ2YXIgJGlzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIChhKSB7IHJldHVybiBhICE9PSBhOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlci5pc0Zpbml0ZSB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInICYmICEkaXNOYU4oeCkgJiYgeCAhPT0gSW5maW5pdHkgJiYgeCAhPT0gLUluZmluaXR5OyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xudmFyIGVjdXJ2ZSA9IHJlcXVpcmUoJ2VjdXJ2ZScpO1xudmFyIEJpZ0ludGVnZXIgPSByZXF1aXJlKCdiaWdpJyk7XG52YXIgc2VjcDI1NmsxID0gZWN1cnZlLmdldEN1cnZlQnlOYW1lKCdzZWNwMjU2azEnKTtcblxudmFyIGhhc2ggPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBrZXlVdGlscyA9IHJlcXVpcmUoJy4va2V5X3V0aWxzJyk7XG5cbnZhciBHID0gc2VjcDI1NmsxLkc7XG52YXIgbiA9IHNlY3AyNTZrMS5uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFB1YmxpY0tleTtcblxuLyoqXG4gIEBwYXJhbSB7c3RyaW5nfEJ1ZmZlcnxQdWJsaWNLZXl8ZWN1cnZlLlBvaW50fSBwdWJsaWMga2V5XG4gIEBwYXJhbSB7c3RyaW5nfSBbcHVia2V5X3ByZWZpeCA9ICdFT1MnXVxuKi9cbmZ1bmN0aW9uIFB1YmxpY0tleShRKSB7XG4gICAgdmFyIHB1YmtleV9wcmVmaXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdFT1MnO1xuXG4gICAgaWYgKHR5cGVvZiBRID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgcHVibGljS2V5ID0gUHVibGljS2V5LmZyb21TdHJpbmcoUSwgcHVia2V5X3ByZWZpeCk7XG4gICAgICAgIGFzc2VydChwdWJsaWNLZXkgIT0gbnVsbCwgJ0ludmFsaWQgcHVibGljIGtleScpO1xuICAgICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKFEpKSB7XG4gICAgICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbUJ1ZmZlcihRKTtcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgUSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoUSkpID09PSAnb2JqZWN0JyAmJiBRLlEpIHtcbiAgICAgICAgcmV0dXJuIFB1YmxpY0tleShRLlEpO1xuICAgIH1cblxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgUSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoUSksICdvYmplY3QnLCAnSW52YWxpZCBwdWJsaWMga2V5Jyk7XG4gICAgYXNzZXJ0LmVxdWFsKF90eXBlb2YoUS5jb21wcmVzc2VkKSwgJ2Jvb2xlYW4nLCAnSW52YWxpZCBwdWJsaWMga2V5Jyk7XG5cbiAgICBmdW5jdGlvbiB0b0J1ZmZlcigpIHtcbiAgICAgICAgdmFyIGNvbXByZXNzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFEuY29tcHJlc3NlZDtcblxuICAgICAgICByZXR1cm4gUS5nZXRFbmNvZGVkKGNvbXByZXNzZWQpO1xuICAgIH1cblxuICAgIHZhciBwdWJkYXRhID0gdm9pZCAwOyAvLyBjYWNoZVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICAgIEB0b2RvIHNlY3AyMjRyMVxuICAgIC8vICAgICBAcmV0dXJuIHtzdHJpbmd9IFBVQl9LMV9iYXNlNThwdWJrZXkuLlxuICAgIC8vICovXG4gICAgLy8gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgLy8gICAgIGlmKHB1YmRhdGEpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBwdWJkYXRhXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcHViZGF0YSA9IGBQVUJfSzFfYCArIGtleVV0aWxzLmNoZWNrRW5jb2RlKHRvQnVmZmVyKCksICdLMScpXG4gICAgLy8gICAgIHJldHVybiBwdWJkYXRhO1xuICAgIC8vIH1cblxuICAgIC8qKiBAdG9kbyByZW5hbWUgdG8gdG9TdHJpbmdMZWdhY3lcbiAgICAgKiBAYXJnIHtzdHJpbmd9IFtwdWJrZXlfcHJlZml4ID0gJ0VPUyddIC0gcHVibGljIGtleSBwcmVmaXhcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICB2YXIgcHVia2V5X3ByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ0VPUyc7XG5cbiAgICAgICAgcmV0dXJuIHB1YmtleV9wcmVmaXggKyBrZXlVdGlscy5jaGVja0VuY29kZSh0b0J1ZmZlcigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1VuY29tcHJlc3NlZCgpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IFEuZ2V0RW5jb2RlZChmYWxzZSk7XG4gICAgICAgIHZhciBwb2ludCA9IGVjdXJ2ZS5Qb2ludC5kZWNvZGVGcm9tKHNlY3AyNTZrMSwgYnVmKTtcbiAgICAgICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tUG9pbnQocG9pbnQpO1xuICAgIH1cblxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGZ1bmN0aW9uIGNoaWxkKG9mZnNldCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEZXByZWNhdGVkIHdhcm5pbmc6IFB1YmxpY0tleS5jaGlsZCcpO1xuXG4gICAgICAgIGFzc2VydChCdWZmZXIuaXNCdWZmZXIob2Zmc2V0KSwgXCJCdWZmZXIgcmVxdWlyZWQ6IG9mZnNldFwiKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKG9mZnNldC5sZW5ndGgsIDMyLCBcIm9mZnNldCBsZW5ndGhcIik7XG5cbiAgICAgICAgb2Zmc2V0ID0gQnVmZmVyLmNvbmNhdChbdG9CdWZmZXIoKSwgb2Zmc2V0XSk7XG4gICAgICAgIG9mZnNldCA9IGhhc2guc2hhMjU2KG9mZnNldCk7XG5cbiAgICAgICAgdmFyIGMgPSBCaWdJbnRlZ2VyLmZyb21CdWZmZXIob2Zmc2V0KTtcblxuICAgICAgICBpZiAoYy5jb21wYXJlVG8obikgPj0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2hpbGQgb2Zmc2V0IHdlbnQgb3V0IG9mIGJvdW5kcywgdHJ5IGFnYWluXCIpO1xuXG4gICAgICAgIHZhciBjRyA9IEcubXVsdGlwbHkoYyk7XG4gICAgICAgIHZhciBRcHJpbWUgPSBRLmFkZChjRyk7XG5cbiAgICAgICAgaWYgKHNlY3AyNTZrMS5pc0luZmluaXR5KFFwcmltZSkpIHRocm93IG5ldyBFcnJvcihcIkNoaWxkIG9mZnNldCBkZXJpdmVkIHRvIGFuIGludmFsaWQga2V5LCB0cnkgYWdhaW5cIik7XG5cbiAgICAgICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tUG9pbnQoUXByaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0hleCgpIHtcbiAgICAgICAgcmV0dXJuIHRvQnVmZmVyKCkudG9TdHJpbmcoJ2hleCcpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIFE6IFEsXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgLy8gdG9TdHJpbmdMZWdhY3ksXG4gICAgICAgIHRvVW5jb21wcmVzc2VkOiB0b1VuY29tcHJlc3NlZCxcbiAgICAgICAgdG9CdWZmZXI6IHRvQnVmZmVyLFxuICAgICAgICBjaGlsZDogY2hpbGQsXG4gICAgICAgIHRvSGV4OiB0b0hleFxuICAgIH07XG59XG5cbi8qKlxuICBAcGFyYW0ge3N0cmluZ3xCdWZmZXJ8UHVibGljS2V5fGVjdXJ2ZS5Qb2ludH0gcHVia2V5IC0gcHVibGljIGtleVxuICBAcGFyYW0ge3N0cmluZ30gW3B1YmtleV9wcmVmaXggPSAnRU9TJ11cbiovXG5QdWJsaWNLZXkuaXNWYWxpZCA9IGZ1bmN0aW9uIChwdWJrZXkpIHtcbiAgICB2YXIgcHVia2V5X3ByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ0VPUyc7XG5cbiAgICB0cnkge1xuICAgICAgICBQdWJsaWNLZXkocHVia2V5LCBwdWJrZXlfcHJlZml4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuUHVibGljS2V5LmZyb21CaW5hcnkgPSBmdW5jdGlvbiAoYmluKSB7XG4gICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tQnVmZmVyKG5ldyBCdWZmZXIoYmluLCAnYmluYXJ5JykpO1xufTtcblxuUHVibGljS2V5LmZyb21CdWZmZXIgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgcmV0dXJuIFB1YmxpY0tleShlY3VydmUuUG9pbnQuZGVjb2RlRnJvbShzZWNwMjU2azEsIGJ1ZmZlcikpO1xufTtcblxuUHVibGljS2V5LmZyb21Qb2ludCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIHJldHVybiBQdWJsaWNLZXkocG9pbnQpO1xufTtcblxuLyoqXG4gICAgQGFyZyB7c3RyaW5nfSBwdWJsaWNfa2V5IC0gbGlrZSBQVUJfSzFfYmFzZTU4cHVia2V5Li5cbiAgICBAYXJnIHtzdHJpbmd9IFtwdWJrZXlfcHJlZml4ID0gJ0VPUyddIC0gcHVibGljIGtleSBwcmVmaXhcbiAgICBAcmV0dXJuIFB1YmxpY0tleSBvciBgbnVsbGAgKGludmFsaWQpXG4qL1xuUHVibGljS2V5LmZyb21TdHJpbmcgPSBmdW5jdGlvbiAocHVibGljX2tleSkge1xuICAgIHZhciBwdWJrZXlfcHJlZml4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnRU9TJztcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbVN0cmluZ09yVGhyb3cocHVibGljX2tleSwgcHVia2V5X3ByZWZpeCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAgICBAYXJnIHtzdHJpbmd9IHB1YmxpY19rZXkgLSBsaWtlIFBVQl9LMV9iYXNlNThwdWJrZXkuLlxuICAgIEBhcmcge3N0cmluZ30gW3B1YmtleV9wcmVmaXggPSAnRU9TJ10gLSBwdWJsaWMga2V5IHByZWZpeFxuXG4gICAgQHRocm93cyB7RXJyb3J9IGlmIHB1YmxpYyBrZXkgaXMgaW52YWxpZFxuXG4gICAgQHJldHVybiBQdWJsaWNLZXlcbiovXG5QdWJsaWNLZXkuZnJvbVN0cmluZ09yVGhyb3cgPSBmdW5jdGlvbiAocHVibGljX2tleSkge1xuICAgIHZhciBwdWJrZXlfcHJlZml4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnRU9TJztcblxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgcHVibGljX2tleSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocHVibGljX2tleSksICdzdHJpbmcnLCAncHVibGljX2tleScpO1xuICAgIHZhciBtYXRjaCA9IHB1YmxpY19rZXkubWF0Y2goL15QVUJfKFtBLVphLXowLTldKylfKFtBLVphLXowLTldKykkLyk7XG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgIC8vIGxlZ2FjeVxuICAgICAgICB2YXIgcHJlZml4X21hdGNoID0gbmV3IFJlZ0V4cChcIl5cIiArIHB1YmtleV9wcmVmaXgpO1xuICAgICAgICBpZiAocHJlZml4X21hdGNoLnRlc3QocHVibGljX2tleSkpIHtcbiAgICAgICAgICAgIHB1YmxpY19rZXkgPSBwdWJsaWNfa2V5LnN1YnN0cmluZyhwdWJrZXlfcHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFB1YmxpY0tleS5mcm9tQnVmZmVyKGtleVV0aWxzLmNoZWNrRGVjb2RlKHB1YmxpY19rZXkpKTtcbiAgICB9XG4gICAgYXNzZXJ0KG1hdGNoLmxlbmd0aCA9PT0gMywgJ0V4cGVjdGluZyBwdWJsaWMga2V5IGxpa2U6IFBVQl9LMV9iYXNlNThwdWJrZXkuLicpO1xuXG4gICAgdmFyIF9tYXRjaCA9IF9zbGljZWRUb0FycmF5KG1hdGNoLCAzKSxcbiAgICAgICAga2V5VHlwZSA9IF9tYXRjaFsxXSxcbiAgICAgICAga2V5U3RyaW5nID0gX21hdGNoWzJdO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGtleVR5cGUsICdLMScsICdLMSBwcml2YXRlIGtleSBleHBlY3RlZCcpO1xuICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbUJ1ZmZlcihrZXlVdGlscy5jaGVja0RlY29kZShrZXlTdHJpbmcsIGtleVR5cGUpKTtcbn07XG5cblB1YmxpY0tleS5mcm9tSGV4ID0gZnVuY3Rpb24gKGhleCkge1xuICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbUJ1ZmZlcihuZXcgQnVmZmVyKGhleCwgJ2hleCcpKTtcbn07XG5cblB1YmxpY0tleS5mcm9tU3RyaW5nSGV4ID0gZnVuY3Rpb24gKGhleCkge1xuICAgIHJldHVybiBQdWJsaWNLZXkuZnJvbVN0cmluZyhuZXcgQnVmZmVyKGhleCwgJ2hleCcpKTtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==