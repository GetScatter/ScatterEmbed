(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "c925":
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

var _Blockchains = __webpack_require__("F+MN");

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Actions = _interopRequireWildcard(__webpack_require__("+nw1"));

var _BackendApiService = __webpack_require__("MPB0");

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var bitcoin = __webpack_require__("WdoV");

var SELECTED_CHAIN = 0;
var SELECTED_NETWORK = SELECTED_CHAIN === 0 ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
var EXPLORER = {
  "name": "Blockcypher",
  "account": "https://live.blockcypher.com/btc/address/{x}",
  "transaction": "https://live.blockcypher.com/btc/tx/{x}",
  "block": "https://live.blockcypher.com/btc/block/{x}"
};

var BTC =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2["default"])(BTC, _Plugin);

  function BTC() {
    (0, _classCallCheck2["default"])(this, BTC);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BTC).call(this, _Blockchains.Blockchains.BTC, PluginTypes.BLOCKCHAIN_SUPPORT));
  }

  (0, _createClass2["default"])(BTC, [{
    key: "bip",
    value: function bip() {
      return "44'/0'/0'/0/";
    }
  }, {
    key: "bustCache",
    value: function bustCache() {}
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
        blockchain: _Blockchains.Blockchains.BTC
      };
    }
  }, {
    key: "contractPlaceholder",
    value: function contractPlaceholder() {
      return '...';
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
      return new _Network["default"]('Bitcoin Mainnet', 'https', 'btcnodes.get-scatter.com', 443, _Blockchains.Blockchains.BTC, '1');
    }
  }, {
    key: "isEndorsedNetwork",
    value: function isEndorsedNetwork(network) {
      var endorsedNetwork = this.getEndorsedNetwork();
      return network.blockchain === _Blockchains.Blockchains.BTC && network.chainId === endorsedNetwork.chainId;
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
      var pubkey = function () {
        if (typeof privateKey === 'string') return bitcoin.ECPair.fromWIF(privateKey, SELECTED_NETWORK);else return bitcoin.ECPair.fromPrivateKey(privateKey, {
          network: SELECTED_NETWORK
        });
      }().publicKey;

      var _bitcoin$payments$p2p = bitcoin.payments.p2pkh({
        pubkey: pubkey,
        network: SELECTED_NETWORK
      }),
          address = _bitcoin$payments$p2p.address;

      return address;
    }
  }, {
    key: "validPrivateKey",
    value: function validPrivateKey(privateKey) {
      return (typeof privateKey === 'string' ? privateKey : this.bufferToHexPrivate(privateKey)).length === 52;
    }
  }, {
    key: "validPublicKey",
    value: function validPublicKey(publicKey) {
      return publicKey.length === 34;
    }
  }, {
    key: "bufferToHexPrivate",
    value: function bufferToHexPrivate(buffer) {
      return bitcoin.ECPair.fromPrivateKey(Buffer.from(buffer), {
        network: SELECTED_NETWORK
      }).toWIF();
    }
  }, {
    key: "hexPrivateToBuffer",
    value: function hexPrivateToBuffer(privateKey) {
      return bitcoin.ECPair.fromWIF(privateKey, SELECTED_NETWORK).privateKey;
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
      _regenerator["default"].mark(function _callee2(account) {
        var _this = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", (0, _BackendApiService.GET)("btc/balance/".concat(account.publicKey)).then(function (res) {
                  var token = _this.defaultToken().clone();

                  token.amount = parseInt(res[account.publicKey].final_balance) / 100000000;
                  return token;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function balanceFor(_x2) {
        return _balanceFor.apply(this, arguments);
      }

      return balanceFor;
    }()
  }, {
    key: "balancesFor",
    value: function () {
      var _balancesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(account) {
        var balance;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.balanceFor(account);

              case 2:
                balance = _context3.sent;
                return _context3.abrupt("return", balance ? [balance] : []);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function balancesFor(_x3) {
        return _balancesFor.apply(this, arguments);
      }

      return balancesFor;
    }()
  }, {
    key: "defaultDecimals",
    value: function defaultDecimals() {
      return 8;
    }
  }, {
    key: "defaultToken",
    value: function defaultToken() {
      return new _Token["default"](_Blockchains.Blockchains.BTC, 'btc', 'BTC', 'BTC', this.defaultDecimals(), '1');
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
      _regenerator["default"].mark(function _callee5(_ref) {
        var _this2 = this;

        var account, to, amount, _ref$promptForSignatu, promptForSignature;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                account = _ref.account, to = _ref.to, amount = _ref.amount, _ref$promptForSignatu = _ref.promptForSignature, promptForSignature = _ref$promptForSignatu === void 0 ? true : _ref$promptForSignatu;
                amount = amount * 100000000;
                _context5.prev = 2;
                return _context5.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4(resolve, reject) {
                    var txb, utxos, inputs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, utx, bestFee, fee, change, payload, signed;

                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            txb = new bitcoin.TransactionBuilder(SELECTED_NETWORK);
                            txb.setVersion(1); // The amount you are sending to the recipient.

                            txb.addOutput(to, amount); // Calculating unspent inputs

                            _context4.next = 5;
                            return (0, _BackendApiService.GET)("btc/unspent/".concat(account.publicKey)).then(function (x) {
                              return x.unspent_outputs;
                            })["catch"](function () {
                              return null;
                            });

                          case 5:
                            utxos = _context4.sent;

                            if (utxos) {
                              _context4.next = 8;
                              break;
                            }

                            return _context4.abrupt("return", resolve({
                              error: "There was a problem loading UTXOs for ".concat(account.publicKey)
                            }));

                          case 8:
                            inputs = 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context4.prev = 12;
                            _iterator = utxos[Symbol.iterator]();

                          case 14:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context4.next = 23;
                              break;
                            }

                            utx = _step.value;
                            txb.addInput(utx.tx_hash_big_endian, utx.tx_output_n);
                            inputs += utx.value;

                            if (!(inputs >= amount)) {
                              _context4.next = 20;
                              break;
                            }

                            return _context4.abrupt("break", 23);

                          case 20:
                            _iteratorNormalCompletion = true;
                            _context4.next = 14;
                            break;

                          case 23:
                            _context4.next = 29;
                            break;

                          case 25:
                            _context4.prev = 25;
                            _context4.t0 = _context4["catch"](12);
                            _didIteratorError = true;
                            _iteratorError = _context4.t0;

                          case 29:
                            _context4.prev = 29;
                            _context4.prev = 30;

                            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                              _iterator["return"]();
                            }

                          case 32:
                            _context4.prev = 32;

                            if (!_didIteratorError) {
                              _context4.next = 35;
                              break;
                            }

                            throw _iteratorError;

                          case 35:
                            return _context4.finish(32);

                          case 36:
                            return _context4.finish(29);

                          case 37:
                            _context4.next = 39;
                            return (0, _BackendApiService.GET)("fees").then(function (x) {
                              return x.btc;
                            })["catch"](function () {
                              return null;
                            });

                          case 39:
                            bestFee = _context4.sent;

                            if (bestFee) {
                              _context4.next = 42;
                              break;
                            }

                            return _context4.abrupt("return", resolve({
                              error: "Couldn't get fee"
                            }));

                          case 42:
                            // Sats * bytes
                            fee = txb.buildIncomplete().toHex().length * bestFee; // Returning unspent to sender.

                            change = inputs - (amount + fee);

                            if (!(change < 0)) {
                              _context4.next = 46;
                              break;
                            }

                            return _context4.abrupt("return", resolve({
                              error: "Insufficient BTC: ".concat(inputs, ". (Most likely due to fees, you need to leave ").concat(fee, " worth)")
                            }));

                          case 46:
                            if (change) txb.addOutput(account.publicKey, change);
                            payload = {
                              transaction: {
                                from: account.publicKey,
                                to: to,
                                amount: amount / 100000000,
                                fee: fee / 100000000
                              },
                              unsigned: txb.buildIncomplete().toHex(),
                              blockchain: _Blockchains.Blockchains.BTC,
                              network: account.network(),
                              requiredFields: {},
                              abi: null
                            };

                            if (!promptForSignature) {
                              _context4.next = 54;
                              break;
                            }

                            _context4.next = 51;
                            return _this2.signerWithPopup(payload, account, function (x) {
                              return resolve(x);
                            }, null);

                          case 51:
                            _context4.t1 = _context4.sent;
                            _context4.next = 57;
                            break;

                          case 54:
                            _context4.next = 56;
                            return _SigningService["default"].sign(account.network(), payload.unsigned, account.publicKey, false, false);

                          case 56:
                            _context4.t1 = _context4.sent;

                          case 57:
                            signed = _context4.t1;

                            if (signed) {
                              _context4.next = 60;
                              break;
                            }

                            return _context4.abrupt("return");

                          case 60:
                            _context4.next = 62;
                            return (0, _BackendApiService.POST)("btc/pushtx", {
                              signed: signed
                            }).then(function (res) {
                              if (res.indexOf('Transaction Submitted') > -1) {
                                resolve({
                                  txid: bitcoin.Transaction.fromHex(signed).getId()
                                });
                              } else {
                                resolve({
                                  error: res
                                });
                              }
                            })["catch"](function (error) {
                              console.error(error);
                              resolve({
                                error: error
                              });
                            });

                          case 62:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, null, [[12, 25, 29, 37], [30,, 32, 36]]);
                  }));

                  return function (_x5, _x6) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](2);
                console.error(_context5.t0);
                resolve({
                  error: _context5.t0
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 6]]);
      }));

      function transfer(_x4) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "signer",
    value: function () {
      var _signer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(transaction, publicKey) {
        var arbitrary,
            isHash,
            privateKey,
            key,
            txb,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                arbitrary = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : false;
                isHash = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
                privateKey = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : null;
                _context6.prev = 3;

                if (privateKey) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 7;
                return _KeyPairService["default"].publicToPrivate(publicKey);

              case 7:
                privateKey = _context6.sent;

              case 8:
                if (privateKey) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return");

              case 10:
                key = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey), {
                  network: SELECTED_NETWORK
                });
                txb = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(transaction), SELECTED_NETWORK);

                if (Object.keys(txb.__PREV_TX_SET).length > 1) {
                  Object.keys(txb.__PREV_TX_SET).map(function (x, i) {
                    txb.sign(i, key);
                  });
                } else txb.sign(0, key);

                return _context6.abrupt("return", txb.build().toHex());

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](3);
                console.error(_context6.t0);
                return _context6.abrupt("return", null);

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 16]]);
      }));

      function signer(_x7, _x8) {
        return _signer.apply(this, arguments);
      }

      return signer;
    }()
  }, {
    key: "signerWithPopup",
    value: function () {
      var _signerWithPopup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(payload, account, rejector) {
        var token,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                token = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : null;
                return _context9.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee8(resolve) {
                    var request;
                    return _regenerator["default"].wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            payload.messages = [{
                              data: payload.transaction,
                              code: payload.transaction.to,
                              type: 'transfer',
                              authorization: payload.transaction.from
                            }];
                            payload.identityKey = _StoreService["default"].get().state.scatter.keychain.identities[0].publicKey;
                            payload.participants = [account];
                            payload.network = account.network();
                            payload.origin = 'Scatter';
                            request = {
                              payload: payload,
                              origin: payload.origin,
                              blockchain: _Blockchains.Blockchains.BTC,
                              requiredFields: {},
                              type: Actions.SIGN,
                              id: 1
                            };

                            _EventService["default"].emit('popout', request).then(
                            /*#__PURE__*/
                            function () {
                              var _ref5 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee7(_ref4) {
                                var result, signature;
                                return _regenerator["default"].wrap(function _callee7$(_context7) {
                                  while (1) {
                                    switch (_context7.prev = _context7.next) {
                                      case 0:
                                        result = _ref4.result;

                                        if (!(!result || !result.accepted || false)) {
                                          _context7.next = 3;
                                          break;
                                        }

                                        return _context7.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 3:
                                        _context7.next = 5;
                                        return _SigningService["default"].sign(payload.network, payload.unsigned, account.publicKey, true);

                                      case 5:
                                        signature = _context7.sent;

                                        if (signature) {
                                          _context7.next = 8;
                                          break;
                                        }

                                        return _context7.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 8:
                                        resolve(signature);

                                      case 9:
                                      case "end":
                                        return _context7.stop();
                                    }
                                  }
                                }, _callee7);
                              }));

                              return function (_x13) {
                                return _ref5.apply(this, arguments);
                              };
                            }());

                          case 7:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x12) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function signerWithPopup(_x9, _x10, _x11) {
        return _signerWithPopup.apply(this, arguments);
      }

      return signerWithPopup;
    }()
  }, {
    key: "requestParser",
    value: function () {
      var _requestParser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(transaction) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                throw new Error("Bitcoin not yet supported externally");

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function requestParser(_x14) {
        return _requestParser.apply(this, arguments);
      }

      return requestParser;
    }()
  }]);
  return BTC;
}(_Plugin2["default"]);

exports["default"] = BTC;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "x628":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _migrations = _interopRequireDefault(__webpack_require__("fWDP"));

var _models = _interopRequireDefault(__webpack_require__("knbK"));

var _plugins2 = _interopRequireDefault(__webpack_require__("Z4IU"));

var _services = _interopRequireDefault(__webpack_require__("7OSH"));

var _store = _interopRequireDefault(__webpack_require__("gW+t"));

var _util = _interopRequireDefault(__webpack_require__("YhWJ"));

var ScatterCore = {
  initialize: function initialize(_ref, store, security, framework, eventListener, _ref2) {
    var blockchains = _ref.blockchains,
        _plugins = _ref.plugins,
        _ref$nameParser = _ref.nameParser,
        nameParser = _ref$nameParser === void 0 ? null : _ref$nameParser;
    var _ref2$socketService = _ref2.socketService,
        socketService = _ref2$socketService === void 0 ? null : _ref2$socketService,
        _ref2$hardwareService = _ref2.hardwareService,
        hardwareService = _ref2$hardwareService === void 0 ? null : _ref2$hardwareService,
        _ref2$publicToPrivate = _ref2.publicToPrivate,
        publicToPrivate = _ref2$publicToPrivate === void 0 ? null : _ref2$publicToPrivate,
        _ref2$signer = _ref2.signer,
        signer = _ref2$signer === void 0 ? null : _ref2$signer;

    _models["default"].Blockchains.setBlockchains(blockchains, nameParser);

    _plugins2["default"].PluginRepository.loadPlugins(_plugins);

    _services["default"].utility.StoreService.init(store);

    _services["default"].secure.Seeder.init(security);

    _services["default"].utility.Framework.init(framework);

    _services["default"].utility.EventService.init(eventListener); // Some wallets don't require dapp integration.


    if (socketService) _services["default"].utility.SocketService.init(socketService); // Some wallets aren't targeting hardware wallets.

    if (hardwareService) _services["default"].secure.HardwareService.init(hardwareService); // Optional method for providing extra ways to create private keys
    // from public keys. If only used for certain keys, return `false` on normal keys.
    // If it returns `null` or `PRIV_KEY` it will resolve that instead of falling back to internals.

    if (publicToPrivate) _services["default"].secure.KeyPairService.init(publicToPrivate);
    if (signer) _services["default"].secure.SigningService.init(signer);
    return true;
  },
  migrations: _migrations["default"],
  models: _models["default"],
  plugins: _plugins2["default"],
  services: _services["default"],
  store: _store["default"],
  util: _util["default"]
};
var _default = ScatterCore;
exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svYml0Y29pbi9iaXRjb2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL2NvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQWE7O0FBRWIsOEJBQThCLG1CQUFPLENBQUMsTUFBK0M7O0FBRXJGLDZCQUE2QixtQkFBTyxDQUFDLE1BQThDOztBQUVuRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDBDQUEwQyxtQkFBTyxDQUFDLE1BQTRCOztBQUU5RSxnREFBZ0QsbUJBQU8sQ0FBQyxNQUF5Qzs7QUFFakcsOENBQThDLG1CQUFPLENBQUMsTUFBdUM7O0FBRTdGLDJDQUEyQyxtQkFBTyxDQUFDLE1BQW9DOztBQUV2Rix5REFBeUQsbUJBQU8sQ0FBQyxNQUFrRDs7QUFFbkgsOENBQThDLG1CQUFPLENBQUMsTUFBdUM7O0FBRTdGLHdDQUF3QyxtQkFBTyxDQUFDLE1BQWlDOztBQUVqRixzQ0FBc0MsbUJBQU8sQ0FBQyxNQUFpQzs7QUFFL0UsMENBQTBDLG1CQUFPLENBQUMsTUFBc0M7O0FBRXhGLG1CQUFtQixtQkFBTyxDQUFDLE1BQXFDOztBQUVoRSxzQ0FBc0MsbUJBQU8sQ0FBQyxNQUFpQzs7QUFFL0Usb0NBQW9DLG1CQUFPLENBQUMsTUFBK0I7O0FBRTNFLDRDQUE0QyxtQkFBTyxDQUFDLE1BQXFDOztBQUV6Riw2Q0FBNkMsbUJBQU8sQ0FBQyxNQUFpRDs7QUFFdEcsMkNBQTJDLG1CQUFPLENBQUMsTUFBZ0Q7O0FBRW5HLHNDQUFzQyxtQkFBTyxDQUFDLE1BQXdDOztBQUV0Rix5QkFBeUIsbUJBQU8sQ0FBQyxNQUFrRDs7QUFFbkYsMkNBQTJDLG1CQUFPLENBQUMsTUFBZ0Q7O0FBRW5HLDZDQUE2QyxtQkFBTyxDQUFDLE1BQWlEOztBQUV0RyxjQUFjLG1CQUFPLENBQUMsTUFBZTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsRUFBRTtBQUMxRCx1REFBdUQsRUFBRTtBQUN6RCxvREFBb0QsRUFBRTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHdHQUF3RztBQUN4RztBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCx5Qjs7Ozs7Ozs7O0FDOXdCYTs7QUFFYiw2QkFBNkIsbUJBQU8sQ0FBQyxNQUE4Qzs7QUFFbkY7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSx5Q0FBeUMsbUJBQU8sQ0FBQyxNQUFjOztBQUUvRCxxQ0FBcUMsbUJBQU8sQ0FBQyxNQUFVOztBQUV2RCx1Q0FBdUMsbUJBQU8sQ0FBQyxNQUFXOztBQUUxRCx1Q0FBdUMsbUJBQU8sQ0FBQyxNQUFZOztBQUUzRCxvQ0FBb0MsbUJBQU8sQ0FBQyxNQUFTOztBQUVyRCxtQ0FBbUMsbUJBQU8sQ0FBQyxNQUFROztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGtFQUFrRTs7O0FBR2xFLHNGQUFzRjs7QUFFdEYsMkZBQTJGO0FBQzNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QiIsImZpbGUiOiJ2ZW5kb3J+NTJlZGM1ZDcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9QbHVnaW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9wbHVnaW5zL1BsdWdpblwiKSk7XG5cbnZhciBQbHVnaW5UeXBlcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3BsdWdpbnMvUGx1Z2luVHlwZXNcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX05ldHdvcmsgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1Rva2VuXCIpKTtcblxudmFyIF9PYmplY3RIZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS91dGlsL09iamVjdEhlbHBlcnNcIikpO1xuXG52YXIgX0tleVBhaXJTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIikpO1xuXG52YXIgX1N0b3JlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9hcGkvQXBpQWN0aW9uc1wiKSk7XG5cbnZhciBfQmFja2VuZEFwaVNlcnZpY2UgPSByZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcGlzL0JhY2tlbmRBcGlTZXJ2aWNlXCIpO1xuXG52YXIgX0V2ZW50U2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9FdmVudFNlcnZpY2VcIikpO1xuXG52YXIgX1NpZ25pbmdTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvU2lnbmluZ1NlcnZpY2VcIikpO1xuXG52YXIgYml0Y29pbiA9IHJlcXVpcmUoJ2JpdGNvaW5qcy1saWInKTtcblxudmFyIFNFTEVDVEVEX0NIQUlOID0gMDtcbnZhciBTRUxFQ1RFRF9ORVRXT1JLID0gU0VMRUNURURfQ0hBSU4gPT09IDAgPyBiaXRjb2luLm5ldHdvcmtzLmJpdGNvaW4gOiBiaXRjb2luLm5ldHdvcmtzLnRlc3RuZXQ7XG52YXIgRVhQTE9SRVIgPSB7XG4gIFwibmFtZVwiOiBcIkJsb2NrY3lwaGVyXCIsXG4gIFwiYWNjb3VudFwiOiBcImh0dHBzOi8vbGl2ZS5ibG9ja2N5cGhlci5jb20vYnRjL2FkZHJlc3Mve3h9XCIsXG4gIFwidHJhbnNhY3Rpb25cIjogXCJodHRwczovL2xpdmUuYmxvY2tjeXBoZXIuY29tL2J0Yy90eC97eH1cIixcbiAgXCJibG9ja1wiOiBcImh0dHBzOi8vbGl2ZS5ibG9ja2N5cGhlci5jb20vYnRjL2Jsb2NrL3t4fVwiXG59O1xuXG52YXIgQlRDID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUGx1Z2luKSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoQlRDLCBfUGx1Z2luKTtcblxuICBmdW5jdGlvbiBCVEMoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBCVEMpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yW1wiZGVmYXVsdFwiXSkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjJbXCJkZWZhdWx0XCJdKShCVEMpLmNhbGwodGhpcywgX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkJUQywgUGx1Z2luVHlwZXMuQkxPQ0tDSEFJTl9TVVBQT1JUKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEJUQywgW3tcbiAgICBrZXk6IFwiYmlwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpcCgpIHtcbiAgICAgIHJldHVybiBcIjQ0Jy8wJy8wJy8wL1wiO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJidXN0Q2FjaGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVzdENhY2hlKCkge31cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0RXhwbG9yZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdEV4cGxvcmVyKCkge1xuICAgICAgcmV0dXJuIEVYUExPUkVSO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhY2NvdW50Rm9ybWF0dGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFjY291bnRGb3JtYXR0ZXIoYWNjb3VudCkge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGFjY291bnQucHVibGljS2V5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmV0dXJuYWJsZUFjY291bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmV0dXJuYWJsZUFjY291bnQoYWNjb3VudCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogYWNjb3VudC5wdWJsaWNLZXksXG4gICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5CVENcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnRyYWN0UGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29udHJhY3RQbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiAnLi4uJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tOZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrTmV0d29yayhuZXR3b3JrKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSksIC8vVE9ETzpcbiAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSldKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEVuZG9yc2VkTmV0d29yaygpIHtcbiAgICAgIHJldHVybiBuZXcgX05ldHdvcmtbXCJkZWZhdWx0XCJdKCdCaXRjb2luIE1haW5uZXQnLCAnaHR0cHMnLCAnYnRjbm9kZXMuZ2V0LXNjYXR0ZXIuY29tJywgNDQzLCBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuQlRDLCAnMScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc0VuZG9yc2VkTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VuZG9yc2VkTmV0d29yayhuZXR3b3JrKSB7XG4gICAgICB2YXIgZW5kb3JzZWROZXR3b3JrID0gdGhpcy5nZXRFbmRvcnNlZE5ldHdvcmsoKTtcbiAgICAgIHJldHVybiBuZXR3b3JrLmJsb2NrY2hhaW4gPT09IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5CVEMgJiYgbmV0d29yay5jaGFpbklkID09PSBlbmRvcnNlZE5ldHdvcmsuY2hhaW5JZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2hhaW5JZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldENoYWluSWQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShuZXR3b3JrKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCAxKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldENoYWluSWQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRDaGFpbklkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRDaGFpbklkO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInVzZXNSZXNvdXJjZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlc1Jlc291cmNlcygpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzQWNjb3VudEFjdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzQWNjb3VudEFjdGlvbnMoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFjY291bnRzQXJlSW1wb3J0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudHNBcmVJbXBvcnRlZCgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNWYWxpZFJlY2lwaWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkUmVjaXBpZW50KGFkZHJlc3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkUHVibGljS2V5KGFkZHJlc3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcml2YXRlVG9QdWJsaWNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJpdmF0ZVRvUHVibGljKHByaXZhdGVLZXkpIHtcbiAgICAgIHZhciBwdWJrZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJpdmF0ZUtleSA9PT0gJ3N0cmluZycpIHJldHVybiBiaXRjb2luLkVDUGFpci5mcm9tV0lGKHByaXZhdGVLZXksIFNFTEVDVEVEX05FVFdPUkspO2Vsc2UgcmV0dXJuIGJpdGNvaW4uRUNQYWlyLmZyb21Qcml2YXRlS2V5KHByaXZhdGVLZXksIHtcbiAgICAgICAgICBuZXR3b3JrOiBTRUxFQ1RFRF9ORVRXT1JLXG4gICAgICAgIH0pO1xuICAgICAgfSgpLnB1YmxpY0tleTtcblxuICAgICAgdmFyIF9iaXRjb2luJHBheW1lbnRzJHAycCA9IGJpdGNvaW4ucGF5bWVudHMucDJwa2goe1xuICAgICAgICBwdWJrZXk6IHB1YmtleSxcbiAgICAgICAgbmV0d29yazogU0VMRUNURURfTkVUV09SS1xuICAgICAgfSksXG4gICAgICAgICAgYWRkcmVzcyA9IF9iaXRjb2luJHBheW1lbnRzJHAycC5hZGRyZXNzO1xuXG4gICAgICByZXR1cm4gYWRkcmVzcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmFsaWRQcml2YXRlS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkUHJpdmF0ZUtleShwcml2YXRlS2V5KSB7XG4gICAgICByZXR1cm4gKHR5cGVvZiBwcml2YXRlS2V5ID09PSAnc3RyaW5nJyA/IHByaXZhdGVLZXkgOiB0aGlzLmJ1ZmZlclRvSGV4UHJpdmF0ZShwcml2YXRlS2V5KSkubGVuZ3RoID09PSA1MjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmFsaWRQdWJsaWNLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRQdWJsaWNLZXkocHVibGljS2V5KSB7XG4gICAgICByZXR1cm4gcHVibGljS2V5Lmxlbmd0aCA9PT0gMzQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJ1ZmZlclRvSGV4UHJpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBidWZmZXJUb0hleFByaXZhdGUoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gYml0Y29pbi5FQ1BhaXIuZnJvbVByaXZhdGVLZXkoQnVmZmVyLmZyb20oYnVmZmVyKSwge1xuICAgICAgICBuZXR3b3JrOiBTRUxFQ1RFRF9ORVRXT1JLXG4gICAgICB9KS50b1dJRigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoZXhQcml2YXRlVG9CdWZmZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGV4UHJpdmF0ZVRvQnVmZmVyKHByaXZhdGVLZXkpIHtcbiAgICAgIHJldHVybiBiaXRjb2luLkVDUGFpci5mcm9tV0lGKHByaXZhdGVLZXksIFNFTEVDVEVEX05FVFdPUkspLnByaXZhdGVLZXk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhc1VudG91Y2hhYmxlVG9rZW5zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc1VudG91Y2hhYmxlVG9rZW5zKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJiYWxhbmNlRm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYmFsYW5jZUZvciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMihhY2NvdW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9CYWNrZW5kQXBpU2VydmljZS5HRVQpKFwiYnRjL2JhbGFuY2UvXCIuY29uY2F0KGFjY291bnQucHVibGljS2V5KSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBfdGhpcy5kZWZhdWx0VG9rZW4oKS5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICB0b2tlbi5hbW91bnQgPSBwYXJzZUludChyZXNbYWNjb3VudC5wdWJsaWNLZXldLmZpbmFsX2JhbGFuY2UpIC8gMTAwMDAwMDAwO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYmFsYW5jZUZvcihfeDIpIHtcbiAgICAgICAgcmV0dXJuIF9iYWxhbmNlRm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiYWxhbmNlRm9yO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImJhbGFuY2VzRm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYmFsYW5jZXNGb3IgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMoYWNjb3VudCkge1xuICAgICAgICB2YXIgYmFsYW5jZTtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhbGFuY2VGb3IoYWNjb3VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJhbGFuY2UgPSBfY29udGV4dDMuc2VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBiYWxhbmNlID8gW2JhbGFuY2VdIDogW10pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBiYWxhbmNlc0ZvcihfeDMpIHtcbiAgICAgICAgcmV0dXJuIF9iYWxhbmNlc0Zvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFsYW5jZXNGb3I7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdERlY2ltYWxzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHREZWNpbWFscygpIHtcbiAgICAgIHJldHVybiA4O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0VG9rZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdFRva2VuKCkge1xuICAgICAgcmV0dXJuIG5ldyBfVG9rZW5bXCJkZWZhdWx0XCJdKF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5CVEMsICdidGMnLCAnQlRDJywgJ0JUQycsIHRoaXMuZGVmYXVsdERlY2ltYWxzKCksICcxJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFjdGlvblBhcnRpY2lwYW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY3Rpb25QYXJ0aWNpcGFudHMocGF5bG9hZCkge1xuICAgICAgcmV0dXJuIF9PYmplY3RIZWxwZXJzW1wiZGVmYXVsdFwiXS5mbGF0dGVuKHBheWxvYWQubWVzc2FnZXMubWFwKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLmF1dGhvcml6YXRpb247XG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYW5zZmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdHJhbnNmZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTUoX3JlZikge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgYWNjb3VudCwgdG8sIGFtb3VudCwgX3JlZiRwcm9tcHRGb3JTaWduYXR1LCBwcm9tcHRGb3JTaWduYXR1cmU7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYWNjb3VudCA9IF9yZWYuYWNjb3VudCwgdG8gPSBfcmVmLnRvLCBhbW91bnQgPSBfcmVmLmFtb3VudCwgX3JlZiRwcm9tcHRGb3JTaWduYXR1ID0gX3JlZi5wcm9tcHRGb3JTaWduYXR1cmUsIHByb21wdEZvclNpZ25hdHVyZSA9IF9yZWYkcHJvbXB0Rm9yU2lnbmF0dSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYkcHJvbXB0Rm9yU2lnbmF0dTtcbiAgICAgICAgICAgICAgICBhbW91bnQgPSBhbW91bnQgKiAxMDAwMDAwMDA7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ1LnByZXYgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eGIsIHV0eG9zLCBpbnB1dHMsIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24sIF9kaWRJdGVyYXRvckVycm9yLCBfaXRlcmF0b3JFcnJvciwgX2l0ZXJhdG9yLCBfc3RlcCwgdXR4LCBiZXN0RmVlLCBmZWUsIGNoYW5nZSwgcGF5bG9hZCwgc2lnbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTQkKF9jb250ZXh0NCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NC5wcmV2ID0gX2NvbnRleHQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4YiA9IG5ldyBiaXRjb2luLlRyYW5zYWN0aW9uQnVpbGRlcihTRUxFQ1RFRF9ORVRXT1JLKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eGIuc2V0VmVyc2lvbigxKTsgLy8gVGhlIGFtb3VudCB5b3UgYXJlIHNlbmRpbmcgdG8gdGhlIHJlY2lwaWVudC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4Yi5hZGRPdXRwdXQodG8sIGFtb3VudCk7IC8vIENhbGN1bGF0aW5nIHVuc3BlbnQgaW5wdXRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcImJ0Yy91bnNwZW50L1wiLmNvbmNhdChhY2NvdW50LnB1YmxpY0tleSkpLnRoZW4oZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuc3BlbnRfb3V0cHV0cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dHhvcyA9IF9jb250ZXh0NC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0eG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gbG9hZGluZyBVVFhPcyBmb3IgXCIuY29uY2F0KGFjY291bnQucHVibGljS2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5wcmV2ID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yID0gdXR4b3NbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDIzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXR4ID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHhiLmFkZElucHV0KHV0eC50eF9oYXNoX2JpZ19lbmRpYW4sIHV0eC50eF9vdXRwdXRfbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzICs9IHV0eC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlucHV0cyA+PSBhbW91bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJicmVha1wiLCAyMyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDE0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5wcmV2ID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0LnQwID0gX2NvbnRleHQ0W1wiY2F0Y2hcIl0oMTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IF9jb250ZXh0NC50MDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5wcmV2ID0gMjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0LnByZXYgPSAzMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0LnByZXYgPSAzMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuZmluaXNoKDMyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuZmluaXNoKDI5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMzk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcImZlZXNcIikudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYnRjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0RmVlID0gX2NvbnRleHQ0LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdEZlZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA0MjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiQ291bGRuJ3QgZ2V0IGZlZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2F0cyAqIGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlID0gdHhiLmJ1aWxkSW5jb21wbGV0ZSgpLnRvSGV4KCkubGVuZ3RoICogYmVzdEZlZTsgLy8gUmV0dXJuaW5nIHVuc3BlbnQgdG8gc2VuZGVyLlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlID0gaW5wdXRzIC0gKGFtb3VudCArIGZlZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGFuZ2UgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA0NjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiSW5zdWZmaWNpZW50IEJUQzogXCIuY29uY2F0KGlucHV0cywgXCIuIChNb3N0IGxpa2VseSBkdWUgdG8gZmVlcywgeW91IG5lZWQgdG8gbGVhdmUgXCIpLmNvbmNhdChmZWUsIFwiIHdvcnRoKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHR4Yi5hZGRPdXRwdXQoYWNjb3VudC5wdWJsaWNLZXksIGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IGFjY291bnQucHVibGljS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50IC8gMTAwMDAwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWU6IGZlZSAvIDEwMDAwMDAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2lnbmVkOiB0eGIuYnVpbGRJbmNvbXBsZXRlKCkudG9IZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5CVEMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrOiBhY2NvdW50Lm5ldHdvcmsoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFiaTogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByb21wdEZvclNpZ25hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA1NDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5zaWduZXJXaXRoUG9wdXAocGF5bG9hZCwgYWNjb3VudCwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0LnQxID0gX2NvbnRleHQ0LnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA1NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNTY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TaWduaW5nU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihhY2NvdW50Lm5ldHdvcmsoKSwgcGF5bG9hZC51bnNpZ25lZCwgYWNjb3VudC5wdWJsaWNLZXksIGZhbHNlLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1NjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQudDEgPSBfY29udGV4dDQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25lZCA9IF9jb250ZXh0NC50MTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWduZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDYwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNjI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuUE9TVCkoXCJidGMvcHVzaHR4XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25lZDogc2lnbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmluZGV4T2YoJ1RyYW5zYWN0aW9uIFN1Ym1pdHRlZCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHhpZDogYml0Y29pbi5UcmFuc2FjdGlvbi5mcm9tSGV4KHNpZ25lZCkuZ2V0SWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2MjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTQsIG51bGwsIFtbMTIsIDI1LCAyOSwgMzddLCBbMzAsLCAzMiwgMzZdXSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g1LCBfeDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBfY29udGV4dDUucHJldiA9IDY7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ1LnQwID0gX2NvbnRleHQ1W1wiY2F0Y2hcIl0oMik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihfY29udGV4dDUudDApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IF9jb250ZXh0NS50MFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU1LCBudWxsLCBbWzIsIDZdXSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHRyYW5zZmVyKF94NCkge1xuICAgICAgICByZXR1cm4gX3RyYW5zZmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2ZlcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJzaWduZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zaWduZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTYodHJhbnNhY3Rpb24sIHB1YmxpY0tleSkge1xuICAgICAgICB2YXIgYXJiaXRyYXJ5LFxuICAgICAgICAgICAgaXNIYXNoLFxuICAgICAgICAgICAgcHJpdmF0ZUtleSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHR4YixcbiAgICAgICAgICAgIF9hcmdzNiA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ2LnByZXYgPSBfY29udGV4dDYubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYXJiaXRyYXJ5ID0gX2FyZ3M2Lmxlbmd0aCA+IDIgJiYgX2FyZ3M2WzJdICE9PSB1bmRlZmluZWQgPyBfYXJnczZbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc0hhc2ggPSBfYXJnczYubGVuZ3RoID4gMyAmJiBfYXJnczZbM10gIT09IHVuZGVmaW5lZCA/IF9hcmdzNlszXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBfYXJnczYubGVuZ3RoID4gNCAmJiBfYXJnczZbNF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzNls0XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ2LnByZXYgPSAzO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByaXZhdGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Ni5uZXh0ID0gODtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9jb250ZXh0Ni5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICByZXR1cm4gX0tleVBhaXJTZXJ2aWNlW1wiZGVmYXVsdFwiXS5wdWJsaWNUb1ByaXZhdGUocHVibGljS2V5KTtcblxuICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgcHJpdmF0ZUtleSA9IF9jb250ZXh0Ni5zZW50O1xuXG4gICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBpZiAocHJpdmF0ZUtleSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ2Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAga2V5ID0gYml0Y29pbi5FQ1BhaXIuZnJvbVByaXZhdGVLZXkoQnVmZmVyLmZyb20ocHJpdmF0ZUtleSksIHtcbiAgICAgICAgICAgICAgICAgIG5ldHdvcms6IFNFTEVDVEVEX05FVFdPUktcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0eGIgPSBiaXRjb2luLlRyYW5zYWN0aW9uQnVpbGRlci5mcm9tVHJhbnNhY3Rpb24oYml0Y29pbi5UcmFuc2FjdGlvbi5mcm9tSGV4KHRyYW5zYWN0aW9uKSwgU0VMRUNURURfTkVUV09SSyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModHhiLl9fUFJFVl9UWF9TRVQpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHR4Yi5fX1BSRVZfVFhfU0VUKS5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHhiLnNpZ24oaSwga2V5KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB0eGIuc2lnbigwLCBrZXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5hYnJ1cHQoXCJyZXR1cm5cIiwgdHhiLmJ1aWxkKCkudG9IZXgoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgICAgICBfY29udGV4dDYucHJldiA9IDE2O1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Ni50MCA9IF9jb250ZXh0NltcImNhdGNoXCJdKDMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX2NvbnRleHQ2LnQwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNiwgbnVsbCwgW1szLCAxNl1dKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2lnbmVyKF94NywgX3g4KSB7XG4gICAgICAgIHJldHVybiBfc2lnbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWduZXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwic2lnbmVyV2l0aFBvcHVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2lnbmVyV2l0aFBvcHVwID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU5KHBheWxvYWQsIGFjY291bnQsIHJlamVjdG9yKSB7XG4gICAgICAgIHZhciB0b2tlbixcbiAgICAgICAgICAgIF9hcmdzOSA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOSQoX2NvbnRleHQ5KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ5LnByZXYgPSBfY29udGV4dDkubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBfYXJnczkubGVuZ3RoID4gMyAmJiBfYXJnczlbM10gIT09IHVuZGVmaW5lZCA/IF9hcmdzOVszXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OS5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU4JChfY29udGV4dDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDgucHJldiA9IF9jb250ZXh0OC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2VzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHBheWxvYWQudHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBwYXlsb2FkLnRyYW5zYWN0aW9uLnRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RyYW5zZmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHBheWxvYWQudHJhbnNhY3Rpb24uZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaWRlbnRpdHlLZXkgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmlkZW50aXRpZXNbMF0ucHVibGljS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQucGFydGljaXBhbnRzID0gW2FjY291bnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQubmV0d29yayA9IGFjY291bnQubmV0d29yaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQub3JpZ2luID0gJ1NjYXR0ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiBwYXlsb2FkLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5CVEMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBY3Rpb25zLlNJR04sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCByZXF1ZXN0KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcoX3JlZjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgc2lnbmF0dXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmNC5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISghcmVzdWx0IHx8ICFyZXN1bHQuYWNjZXB0ZWQgfHwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LmFicnVwdChcInJldHVyblwiLCByZWplY3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0NvdWxkIG5vdCBnZXQgc2lnbmF0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfU2lnbmluZ1NlcnZpY2VbXCJkZWZhdWx0XCJdLnNpZ24ocGF5bG9hZC5uZXR3b3JrLCBwYXlsb2FkLnVuc2lnbmVkLCBhY2NvdW50LnB1YmxpY0tleSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSA9IF9jb250ZXh0Ny5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVqZWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICdDb3VsZCBub3QgZ2V0IHNpZ25hdHVyZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc2lnbmF0dXJlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTgpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94MTIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTkpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzaWduZXJXaXRoUG9wdXAoX3g5LCBfeDEwLCBfeDExKSB7XG4gICAgICAgIHJldHVybiBfc2lnbmVyV2l0aFBvcHVwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWduZXJXaXRoUG9wdXA7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVxdWVzdFBhcnNlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlcXVlc3RQYXJzZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEwKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEwJChfY29udGV4dDEwKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMC5wcmV2ID0gX2NvbnRleHQxMC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaXRjb2luIG5vdCB5ZXQgc3VwcG9ydGVkIGV4dGVybmFsbHlcIik7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTEwKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcmVxdWVzdFBhcnNlcihfeDE0KSB7XG4gICAgICAgIHJldHVybiBfcmVxdWVzdFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVxdWVzdFBhcnNlcjtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gQlRDO1xufShfUGx1Z2luMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJUQzsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9taWdyYXRpb25zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9taWdyYXRpb25zXCIpKTtcblxudmFyIF9tb2RlbHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL21vZGVsc1wiKSk7XG5cbnZhciBfcGx1Z2luczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BsdWdpbnNcIikpO1xuXG52YXIgX3NlcnZpY2VzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zZXJ2aWNlc1wiKSk7XG5cbnZhciBfc3RvcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0b3JlXCIpKTtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsXCIpKTtcblxudmFyIFNjYXR0ZXJDb3JlID0ge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKF9yZWYsIHN0b3JlLCBzZWN1cml0eSwgZnJhbWV3b3JrLCBldmVudExpc3RlbmVyLCBfcmVmMikge1xuICAgIHZhciBibG9ja2NoYWlucyA9IF9yZWYuYmxvY2tjaGFpbnMsXG4gICAgICAgIF9wbHVnaW5zID0gX3JlZi5wbHVnaW5zLFxuICAgICAgICBfcmVmJG5hbWVQYXJzZXIgPSBfcmVmLm5hbWVQYXJzZXIsXG4gICAgICAgIG5hbWVQYXJzZXIgPSBfcmVmJG5hbWVQYXJzZXIgPT09IHZvaWQgMCA/IG51bGwgOiBfcmVmJG5hbWVQYXJzZXI7XG4gICAgdmFyIF9yZWYyJHNvY2tldFNlcnZpY2UgPSBfcmVmMi5zb2NrZXRTZXJ2aWNlLFxuICAgICAgICBzb2NrZXRTZXJ2aWNlID0gX3JlZjIkc29ja2V0U2VydmljZSA9PT0gdm9pZCAwID8gbnVsbCA6IF9yZWYyJHNvY2tldFNlcnZpY2UsXG4gICAgICAgIF9yZWYyJGhhcmR3YXJlU2VydmljZSA9IF9yZWYyLmhhcmR3YXJlU2VydmljZSxcbiAgICAgICAgaGFyZHdhcmVTZXJ2aWNlID0gX3JlZjIkaGFyZHdhcmVTZXJ2aWNlID09PSB2b2lkIDAgPyBudWxsIDogX3JlZjIkaGFyZHdhcmVTZXJ2aWNlLFxuICAgICAgICBfcmVmMiRwdWJsaWNUb1ByaXZhdGUgPSBfcmVmMi5wdWJsaWNUb1ByaXZhdGUsXG4gICAgICAgIHB1YmxpY1RvUHJpdmF0ZSA9IF9yZWYyJHB1YmxpY1RvUHJpdmF0ZSA9PT0gdm9pZCAwID8gbnVsbCA6IF9yZWYyJHB1YmxpY1RvUHJpdmF0ZSxcbiAgICAgICAgX3JlZjIkc2lnbmVyID0gX3JlZjIuc2lnbmVyLFxuICAgICAgICBzaWduZXIgPSBfcmVmMiRzaWduZXIgPT09IHZvaWQgMCA/IG51bGwgOiBfcmVmMiRzaWduZXI7XG5cbiAgICBfbW9kZWxzW1wiZGVmYXVsdFwiXS5CbG9ja2NoYWlucy5zZXRCbG9ja2NoYWlucyhibG9ja2NoYWlucywgbmFtZVBhcnNlcik7XG5cbiAgICBfcGx1Z2luczJbXCJkZWZhdWx0XCJdLlBsdWdpblJlcG9zaXRvcnkubG9hZFBsdWdpbnMoX3BsdWdpbnMpO1xuXG4gICAgX3NlcnZpY2VzW1wiZGVmYXVsdFwiXS51dGlsaXR5LlN0b3JlU2VydmljZS5pbml0KHN0b3JlKTtcblxuICAgIF9zZXJ2aWNlc1tcImRlZmF1bHRcIl0uc2VjdXJlLlNlZWRlci5pbml0KHNlY3VyaXR5KTtcblxuICAgIF9zZXJ2aWNlc1tcImRlZmF1bHRcIl0udXRpbGl0eS5GcmFtZXdvcmsuaW5pdChmcmFtZXdvcmspO1xuXG4gICAgX3NlcnZpY2VzW1wiZGVmYXVsdFwiXS51dGlsaXR5LkV2ZW50U2VydmljZS5pbml0KGV2ZW50TGlzdGVuZXIpOyAvLyBTb21lIHdhbGxldHMgZG9uJ3QgcmVxdWlyZSBkYXBwIGludGVncmF0aW9uLlxuXG5cbiAgICBpZiAoc29ja2V0U2VydmljZSkgX3NlcnZpY2VzW1wiZGVmYXVsdFwiXS51dGlsaXR5LlNvY2tldFNlcnZpY2UuaW5pdChzb2NrZXRTZXJ2aWNlKTsgLy8gU29tZSB3YWxsZXRzIGFyZW4ndCB0YXJnZXRpbmcgaGFyZHdhcmUgd2FsbGV0cy5cblxuICAgIGlmIChoYXJkd2FyZVNlcnZpY2UpIF9zZXJ2aWNlc1tcImRlZmF1bHRcIl0uc2VjdXJlLkhhcmR3YXJlU2VydmljZS5pbml0KGhhcmR3YXJlU2VydmljZSk7IC8vIE9wdGlvbmFsIG1ldGhvZCBmb3IgcHJvdmlkaW5nIGV4dHJhIHdheXMgdG8gY3JlYXRlIHByaXZhdGUga2V5c1xuICAgIC8vIGZyb20gcHVibGljIGtleXMuIElmIG9ubHkgdXNlZCBmb3IgY2VydGFpbiBrZXlzLCByZXR1cm4gYGZhbHNlYCBvbiBub3JtYWwga2V5cy5cbiAgICAvLyBJZiBpdCByZXR1cm5zIGBudWxsYCBvciBgUFJJVl9LRVlgIGl0IHdpbGwgcmVzb2x2ZSB0aGF0IGluc3RlYWQgb2YgZmFsbGluZyBiYWNrIHRvIGludGVybmFscy5cblxuICAgIGlmIChwdWJsaWNUb1ByaXZhdGUpIF9zZXJ2aWNlc1tcImRlZmF1bHRcIl0uc2VjdXJlLktleVBhaXJTZXJ2aWNlLmluaXQocHVibGljVG9Qcml2YXRlKTtcbiAgICBpZiAoc2lnbmVyKSBfc2VydmljZXNbXCJkZWZhdWx0XCJdLnNlY3VyZS5TaWduaW5nU2VydmljZS5pbml0KHNpZ25lcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIG1pZ3JhdGlvbnM6IF9taWdyYXRpb25zW1wiZGVmYXVsdFwiXSxcbiAgbW9kZWxzOiBfbW9kZWxzW1wiZGVmYXVsdFwiXSxcbiAgcGx1Z2luczogX3BsdWdpbnMyW1wiZGVmYXVsdFwiXSxcbiAgc2VydmljZXM6IF9zZXJ2aWNlc1tcImRlZmF1bHRcIl0sXG4gIHN0b3JlOiBfc3RvcmVbXCJkZWZhdWx0XCJdLFxuICB1dGlsOiBfdXRpbFtcImRlZmF1bHRcIl1cbn07XG52YXIgX2RlZmF1bHQgPSBTY2F0dGVyQ29yZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7Il0sInNvdXJjZVJvb3QiOiIifQ==