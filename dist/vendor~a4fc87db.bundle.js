(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "1lSK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {

var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.eosjsUtil = exports.encoderOptions = exports.TextDecoder = exports.TextEncoder = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Plugin2 = _interopRequireDefault(__webpack_require__("MIez"));

var PluginTypes = _interopRequireWildcard(__webpack_require__("ROq3"));

var _Blockchains = __webpack_require__("F+MN");

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var Actions = _interopRequireWildcard(__webpack_require__("+nw1"));

var StoreActions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _AccountAction = _interopRequireDefault(__webpack_require__("CC+F"));

var _AccountService = _interopRequireDefault(__webpack_require__("5lq1"));

var _HistoricAction = _interopRequireDefault(__webpack_require__("wy8C"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var _BackendApiService = __webpack_require__("MPB0");

var _eosjsEcc = _interopRequireDefault(__webpack_require__("Giuh"));

var _eosjs = __webpack_require__("Iqa8");

var numeric = _interopRequireWildcard(__webpack_require__("atws"));

var TextEncoder = __webpack_require__("MCLT") ? __webpack_require__("MCLT").TextEncoder : __webpack_require__("QZTG") ? __webpack_require__("QZTG").TextEncoder : global.TextEncoder;
exports.TextEncoder = TextEncoder;
var TextDecoder = __webpack_require__("MCLT") ? __webpack_require__("MCLT").TextDecoder : __webpack_require__("QZTG") ? __webpack_require__("QZTG").TextDecoder : global.TextDecoder;
exports.TextDecoder = TextDecoder;
var encoderOptions = TextEncoder ? {
  textEncoder: new TextEncoder(),
  textDecoder: new TextDecoder()
} : {};
exports.encoderOptions = encoderOptions;

var getEosjsApi = function getEosjsApi(rpc) {
  var params = rpc ? {
    rpc: rpc
  } : {};
  if (TextEncoder) params = Object.assign(params, encoderOptions);
  return new _eosjs.Api(params);
};

var eosjsUtil = getEosjsApi();
exports.eosjsUtil = eosjsUtil;
var ACCOUNT_AND_TOKEN_API_URL = 'https://api.light.xeos.me/api';
var MAINNET_CHAIN_ID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

var fetchPostParams = function fetchPostParams(params) {
  return {
    method: "POST",
    body: JSON.stringify(params)
  };
};

var getTableRows = function getTableRows(network, params) {
  return fetch("".concat(network.fullhost(), "/v1/chain/get_table_rows"), fetchPostParams(params)).then(function (x) {
    return x.json();
  });
};

var getChainData = function getChainData(network, route, params) {
  return fetch("".concat(network.fullhost(), "/v1/chain/").concat(route), fetchPostParams(params)).then(function (x) {
    return x.json();
  });
};

var getHistoryData = function getHistoryData(network, route, params) {
  return fetch("".concat(network.fullhost(), "/v1/history/").concat(route), fetchPostParams(params)).then(function (x) {
    return x.json();
  });
};

var EosTokenAccountAPI =
/*#__PURE__*/
function () {
  function EosTokenAccountAPI() {
    (0, _classCallCheck2["default"])(this, EosTokenAccountAPI);
  }

  (0, _createClass2["default"])(EosTokenAccountAPI, null, [{
    key: "getAccountsFromPublicKey",
    value: function () {
      var _getAccountsFromPublicKey = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(publicKey) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(null);
                  }, 5000);
                }), fetch("".concat(ACCOUNT_AND_TOKEN_API_URL, "/key/").concat(publicKey)).then(function (r) {
                  return r.json();
                }).then(function (res) {
                  if (!res.eos) return null;
                  var rawAccounts = res.eos.accounts;
                  var accounts = [];
                  Object.keys(rawAccounts).map(function (name) {
                    rawAccounts[name].filter(function (acc) {
                      return acc.auth.keys.some(function (_ref) {
                        var pubkey = _ref.pubkey;
                        return pubkey === publicKey;
                      });
                    }).map(function (acc) {
                      accounts.push({
                        name: name,
                        authority: acc.perm
                      });
                    });
                  });
                  return accounts;
                })["catch"](function (err) {
                  console.error('err', err);
                  return null;
                })]);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAccountsFromPublicKey(_x) {
        return _getAccountsFromPublicKey.apply(this, arguments);
      }

      return getAccountsFromPublicKey;
    }()
  }, {
    key: "getAllTokens",
    value: function () {
      var _getAllTokens = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(account) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(null);
                  }, 5000);
                }), fetch("".concat(ACCOUNT_AND_TOKEN_API_URL, "/account/eos/").concat(account.sendable())).then(function (r) {
                  return r.json();
                }).then(function (res) {
                  return res.balances.map(function (balance) {
                    return _Token["default"].fromJson({
                      blockchain: _Blockchains.Blockchains.EOSIO,
                      contract: balance.contract,
                      symbol: balance.currency,
                      name: balance.currency,
                      amount: balance.amount,
                      decimals: balance.decimals,
                      chainId: account.network().chainId
                    });
                  });
                })["catch"](function (err) {
                  return null;
                })]);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllTokens(_x2) {
        return _getAllTokens.apply(this, arguments);
      }

      return getAllTokens;
    }()
  }]);
  return EosTokenAccountAPI;
}();

var getAccountsFromPublicKey =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(publicKey, network) {
    var fallbackToChain,
        accountsFromApi,
        _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            fallbackToChain = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : false;

            if (!(network.chainId === MAINNET_CHAIN_ID && !fallbackToChain)) {
              _context5.next = 10;
              break;
            }

            _context5.next = 4;
            return EosTokenAccountAPI.getAccountsFromPublicKey(publicKey);

          case 4:
            accountsFromApi = _context5.sent;

            if (accountsFromApi) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", getAccountsFromPublicKey(publicKey, network, true));

          case 9:
            return _context5.abrupt("return", accountsFromApi);

          case 10:
            return _context5.abrupt("return", Promise.race([new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve([]);
              }, 20000);
            }), new Promise(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(resolve, reject) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        getHistoryData(network, 'get_key_accounts', {
                          public_key: publicKey
                        }).then(function (res) {
                          if (!res || !res.hasOwnProperty('account_names')) {
                            resolve([]);
                            return false;
                          }

                          var account_names = res.account_names;
                          Promise.all(account_names.map(
                          /*#__PURE__*/
                          function () {
                            var _ref4 = (0, _asyncToGenerator2["default"])(
                            /*#__PURE__*/
                            _regenerator["default"].mark(function _callee3(name) {
                              var data;
                              return _regenerator["default"].wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      _context3.next = 2;
                                      return getChainData(network, 'get_account', {
                                        account_name: name
                                      })["catch"](function (e) {
                                        return resolve([]);
                                      });

                                    case 2:
                                      data = _context3.sent;
                                      return _context3.abrupt("return", data);

                                    case 4:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            return function (_x7) {
                              return _ref4.apply(this, arguments);
                            };
                          }())).then(function (multires) {
                            var accounts = [];
                            multires.map(function (account) {
                              account.permissions.map(function (perm) {
                                if (!!perm.required_auth.keys.find(function (x) {
                                  return x.key === publicKey;
                                })) {
                                  accounts.push({
                                    name: account.account_name,
                                    authority: perm.perm_name
                                  });
                                }
                              });
                            });
                            resolve(accounts);
                          })["catch"](function (e) {
                            return resolve([]);
                          });
                        })["catch"](function (e) {
                          return resolve([]);
                        });

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }())]));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getAccountsFromPublicKey(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var popupError = function popupError(result) {
  var error;

  try {
    error = JSON.parse(error).error.details[0].message;
  } catch (e) {
    error = result;
  }

  if (error && error.toString().indexOf('assertion failure with message') > -1) {
    error = error.toString().replace('assertion failure with message:', '').trim();
  }

  return error;
};

var EXPLORER = {
  "name": "Bloks",
  "account": "https://bloks.io/account/{x}",
  "transaction": "https://bloks.io/transaction/{x}",
  "block": "https://bloks.io/block/{x}"
};

var EOS =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2["default"])(EOS, _Plugin);

  function EOS() {
    (0, _classCallCheck2["default"])(this, EOS);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(EOS).call(this, _Blockchains.Blockchains.EOSIO, PluginTypes.BLOCKCHAIN_SUPPORT));
  }

  (0, _createClass2["default"])(EOS, [{
    key: "signatureProvider",
    value: function signatureProvider(accounts, reject) {
      var _this = this;

      var isSingleAccount = accounts instanceof _Account["default"];
      return {
        getAvailableKeys: function () {
          var _getAvailableKeys = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee6() {
            return _regenerator["default"].wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt("return", isSingleAccount ? [accounts.publicKey] : accounts.map(function (x) {
                      return x.publicKey;
                    }));

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          function getAvailableKeys() {
            return _getAvailableKeys.apply(this, arguments);
          }

          return getAvailableKeys;
        }(),
        sign: function () {
          var _sign = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee7(transaction) {
            return _regenerator["default"].wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    return _context7.abrupt("return", _this.signerWithPopup({
                      transaction: transaction
                    }, accounts, reject).then(function (signatures) {
                      return {
                        signatures: signatures,
                        serializedTransaction: transaction.serializedTransaction
                      };
                    }));

                  case 1:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          function sign(_x8) {
            return _sign.apply(this, arguments);
          }

          return sign;
        }()
      };
    }
  }, {
    key: "getSignableEosjs",
    value: function getSignableEosjs(accounts, reject) {
      var prompt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var isSingleAccount = accounts instanceof _Account["default"];
      var rpc = new _eosjs.JsonRpc((isSingleAccount ? accounts.network() : accounts[0].network()).fullhost());
      var params = {
        rpc: rpc,
        signatureProvider: this.signatureProvider(accounts, reject)
      };
      if (TextEncoder) params = Object.assign(rpc, {
        textEncoder: new TextEncoder(),
        textDecoder: new TextDecoder()
      });
      return new _eosjs.Api(params);
    }
  }, {
    key: "bip",
    value: function bip() {
      return "44'/194'/0'/0/";
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
      return "".concat(account.name, "@").concat(account.authority);
    }
  }, {
    key: "returnableAccount",
    value: function returnableAccount(account) {
      return {
        name: account.name,
        authority: account.authority,
        publicKey: account.publicKey,
        blockchain: _Blockchains.Blockchains.EOSIO
      };
    }
  }, {
    key: "contractPlaceholder",
    value: function contractPlaceholder() {
      return 'eosio.token';
    }
  }, {
    key: "checkNetwork",
    value: function checkNetwork(network) {
      return Promise.race([new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(null);
        }, 2000);
      }), fetch("".concat(network.fullhost(), "/v1/chain/get_info")).then(function () {
        return true;
      })["catch"](function () {
        return false;
      })]);
    }
  }, {
    key: "getEndorsedNetwork",
    value: function getEndorsedNetwork() {
      return new _Network["default"]('EOS Mainnet', 'https', 'nodes.get-scatter.com', 443, _Blockchains.Blockchains.EOSIO, MAINNET_CHAIN_ID);
    }
  }, {
    key: "isEndorsedNetwork",
    value: function isEndorsedNetwork(network) {
      return network.blockchain === _Blockchains.Blockchains.EOSIO && network.chainId === MAINNET_CHAIN_ID;
    }
  }, {
    key: "getChainId",
    value: function () {
      var _getChainId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(network) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", getChainData(network, 'get_info', {}).then(function (x) {
                  return x.chain_id || '';
                })["catch"](function () {
                  return '';
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getChainId(_x9) {
        return _getChainId.apply(this, arguments);
      }

      return getChainId;
    }()
  }, {
    key: "usesResources",
    value: function usesResources() {
      return true;
    }
  }, {
    key: "hasAccountActions",
    value: function hasAccountActions() {
      return true;
    }
  }, {
    key: "proxyVote",
    value: function () {
      var _proxyVote = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(account, proxyAccount) {
        var _this2 = this;

        var prompt,
            _args10 = arguments;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                prompt = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : false;
                return _context10.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee9(resolve, reject) {
                    var eos;
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            eos = _this2.getSignableEosjs(account, reject, prompt);
                            _context9.next = 3;
                            return eos.transact({
                              actions: [{
                                account: 'eosio',
                                name: 'voteproducer',
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: account.authority
                                }],
                                data: {
                                  voter: account.name,
                                  proxy: proxyAccount,
                                  producers: []
                                }
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            }).then(function (trx) {
                              var history = new _HistoricAction["default"](account, 'proxy', trx.transaction_id);

                              _StoreService["default"].get().dispatch(StoreActions.DELTA_HISTORY, history);

                              resolve(trx.transaction_id);
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            });

                          case 3:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x12, _x13) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function proxyVote(_x10, _x11) {
        return _proxyVote.apply(this, arguments);
      }

      return proxyVote;
    }()
  }, {
    key: "changePermissions",
    value: function () {
      var _changePermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee14(account, keys) {
        var _this3 = this;

        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (keys) {
                  _context14.next = 2;
                  break;
                }

                return _context14.abrupt("return");

              case 2:
                return _context14.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref6 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee13(resolve, reject) {
                    var eos, actions;
                    return _regenerator["default"].wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            eos = _this3.getSignableEosjs(account, reject);
                            actions = Object.keys(keys).map(function (permission) {
                              if (!keys[permission] || !keys[permission].length) return;
                              var keyOrAccount = keys[permission];
                              var auth = {
                                accounts: [],
                                keys: [],
                                threshold: 1,
                                waits: []
                              }; // Public Key

                              if (_this3.validPublicKey(keyOrAccount)) auth.keys.push({
                                key: keyOrAccount,
                                weight: 1
                              }); // Account
                              else {
                                  var _keyOrAccount$split = keyOrAccount.split('@'),
                                      _keyOrAccount$split2 = (0, _slicedToArray2["default"])(_keyOrAccount$split, 2),
                                      actor = _keyOrAccount$split2[0],
                                      perm = _keyOrAccount$split2[1];

                                  auth.accounts.push({
                                    actor: actor,
                                    permission: perm ? perm : 'active'
                                  });
                                }
                              var parent = permission === 'owner' ? '' : 'owner';
                              return {
                                account: 'eosio',
                                name: 'updateauth',
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: permission
                                }],
                                data: {
                                  account: account.name,
                                  permission: permission,
                                  parent: parent,
                                  auth: auth
                                }
                              };
                            }).filter(function (x) {
                              return !!x;
                            });
                            return _context13.abrupt("return", eos.transact({
                              actions: actions
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            }).then(
                            /*#__PURE__*/
                            function () {
                              var _ref7 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee12(res) {
                                var authorities, accounts, addAccount, activeKeypair, ownerKeypair, history;
                                return _regenerator["default"].wrap(function _callee12$(_context12) {
                                  while (1) {
                                    switch (_context12.prev = _context12.next) {
                                      case 0:
                                        authorities = Object.keys(keys).filter(function (x) {
                                          return keys[x] && keys[x].length;
                                        });
                                        accounts = _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
                                          return x.identifiable() === account.identifiable() && authorities.includes(x.authority);
                                        });
                                        _context12.next = 4;
                                        return _AccountService["default"].removeAccounts(accounts);

                                      case 4:
                                        addAccount =
                                        /*#__PURE__*/
                                        function () {
                                          var _ref8 = (0, _asyncToGenerator2["default"])(
                                          /*#__PURE__*/
                                          _regenerator["default"].mark(function _callee11(keypair, authority) {
                                            var acc;
                                            return _regenerator["default"].wrap(function _callee11$(_context11) {
                                              while (1) {
                                                switch (_context11.prev = _context11.next) {
                                                  case 0:
                                                    acc = account.clone();
                                                    acc.publicKey = keypair.publicKeys.find(function (x) {
                                                      return x.blockchain === _Blockchains.Blockchains.EOSIO;
                                                    }).key, acc.keypairUnique = keypair.unique();
                                                    acc.authority = authority;
                                                    return _context11.abrupt("return", _AccountService["default"].addAccount(acc));

                                                  case 4:
                                                  case "end":
                                                    return _context11.stop();
                                                }
                                              }
                                            }, _callee11);
                                          }));

                                          return function addAccount(_x19, _x20) {
                                            return _ref8.apply(this, arguments);
                                          };
                                        }();

                                        activeKeypair = _StoreService["default"].get().state.scatter.keychain.getKeyPairByPublicKey(keys.active);
                                        ownerKeypair = _StoreService["default"].get().state.scatter.keychain.getKeyPairByPublicKey(keys.owner);

                                        if (!activeKeypair) {
                                          _context12.next = 10;
                                          break;
                                        }

                                        _context12.next = 10;
                                        return addAccount(activeKeypair, 'active');

                                      case 10:
                                        if (!ownerKeypair) {
                                          _context12.next = 13;
                                          break;
                                        }

                                        _context12.next = 13;
                                        return addAccount(ownerKeypair, 'owner');

                                      case 13:
                                        history = new _HistoricAction["default"](account, 'permissions', res.transaction_id);

                                        _StoreService["default"].get().dispatch(StoreActions.DELTA_HISTORY, history);

                                        resolve(res.transaction_id);

                                      case 16:
                                      case "end":
                                        return _context12.stop();
                                    }
                                  }
                                }, _callee12);
                              }));

                              return function (_x18) {
                                return _ref7.apply(this, arguments);
                              };
                            }()));

                          case 3:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13);
                  }));

                  return function (_x16, _x17) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function changePermissions(_x14, _x15) {
        return _changePermissions.apply(this, arguments);
      }

      return changePermissions;
    }()
  }, {
    key: "accountActions",
    value: function accountActions(account, callback) {
      return [new _AccountAction["default"]("unlink_account", function () {
        return callback(account);
      }), new _AccountAction["default"]("change_permissions", function () {
        return callback(account);
      }, true), new _AccountAction["default"]("proxy_vote", function () {
        return callback(account);
      }), new _AccountAction["default"]("create_account", function () {
        return function () {
          return callback(account);
        };
      })];
    }
  }, {
    key: "refund",
    value: function () {
      var _refund = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee16(account) {
        var _this4 = this;

        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref9 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee15(resolve, reject) {
                    var eos;
                    return _regenerator["default"].wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            eos = _this4.getSignableEosjs(account, reject);
                            _context15.next = 3;
                            return eos.transact({
                              actions: [{
                                account: 'eosio',
                                name: 'refund',
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: account.authority
                                }],
                                data: {
                                  owner: account.name
                                }
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            }).then(function (trx) {
                              var history = new _HistoricAction["default"](account, 'proxy', trx.transaction_id);

                              _StoreService["default"].get().dispatch(StoreActions.DELTA_HISTORY, history);

                              resolve(trx);
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            });

                          case 3:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15);
                  }));

                  return function (_x22, _x23) {
                    return _ref9.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function refund(_x21) {
        return _refund.apply(this, arguments);
      }

      return refund;
    }()
  }, {
    key: "getResourcesFor",
    value: function () {
      var _getResourcesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee17(account) {
        var data, refund, threeDays, percentage, actionText, resources;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.accountData(account);

              case 2:
                data = _context17.sent;

                if (!(!data || !data.hasOwnProperty('cpu_limit') || !data.cpu_limit.hasOwnProperty('available'))) {
                  _context17.next = 5;
                  break;
                }

                return _context17.abrupt("return", []);

              case 5:
                if (data.hasOwnProperty('refund_request') && data.refund_request) {
                  threeDays = 86400 * 3 * 1000;
                  percentage = (+new Date() - +new Date(data.refund_request.request_time)) * 100 / threeDays;
                  refund = {
                    name: 'Refund',
                    text: new Date(+new Date(data.refund_request.request_time) + 86400 * 3 * 1000).toLocaleDateString(),
                    percentage: percentage,
                    actionable: percentage >= 100,
                    actionText: "Claim Refund"
                  };
                }

                actionText = "Manage";
                resources = [{
                  name: 'CPU',
                  available: data.cpu_limit.available,
                  max: data.cpu_limit.max,
                  percentage: data.cpu_limit.used * 100 / data.cpu_limit.max,
                  actionable: true,
                  actionText: actionText
                }, {
                  name: 'NET',
                  available: data.net_limit.available,
                  max: data.net_limit.max,
                  percentage: data.net_limit.used * 100 / data.net_limit.max,
                  actionable: true,
                  actionText: actionText
                }, {
                  name: 'RAM',
                  available: data.ram_usage,
                  max: data.ram_quota,
                  percentage: data.ram_usage * 100 / data.ram_quota,
                  actionable: true,
                  actionText: actionText
                }];
                if (refund) resources.push(refund);
                return _context17.abrupt("return", resources);

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getResourcesFor(_x24) {
        return _getResourcesFor.apply(this, arguments);
      }

      return getResourcesFor;
    }()
  }, {
    key: "needsResources",
    value: function () {
      var _needsResources = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee18(account) {
        var resources;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.getResourcesFor(account);

              case 2:
                resources = _context18.sent;

                if (resources.length) {
                  _context18.next = 5;
                  break;
                }

                return _context18.abrupt("return", false);

              case 5:
                return _context18.abrupt("return", resources.find(function (x) {
                  return x.name === 'CPU';
                }).available < 6000);

              case 6:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function needsResources(_x25) {
        return _needsResources.apply(this, arguments);
      }

      return needsResources;
    }()
  }, {
    key: "addResources",
    value: function () {
      var _addResources = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee19(account) {
        var symbol;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                symbol = account.network().systemToken().symbol;
                return _context19.abrupt("return", this.stakeOrUnstake(account, "0.1000 ".concat(symbol), "0.0000 ".concat(symbol), true, false));

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function addResources(_x26) {
        return _addResources.apply(this, arguments);
      }

      return addResources;
    }()
  }, {
    key: "accountsAreImported",
    value: function accountsAreImported() {
      return true;
    }
  }, {
    key: "getImportableAccounts",
    value: function getImportableAccounts(keypair, network) {
      return new Promise(function (resolve, reject) {
        var publicKey = keypair.publicKeys.find(function (x) {
          return x.blockchain === _Blockchains.Blockchains.EOSIO;
        });
        if (!publicKey) return resolve([]);
        publicKey = publicKey.key;
        getAccountsFromPublicKey(publicKey, network).then(function (accounts) {
          resolve(accounts.map(function (account) {
            return _Account["default"].fromJson({
              name: account.name,
              authority: account.authority,
              publicKey: publicKey,
              keypairUnique: keypair.unique(),
              networkUnique: network.unique()
            });
          }));
        })["catch"](function (e) {
          return resolve([]);
        });
      });
    }
  }, {
    key: "isValidRecipient",
    value: function isValidRecipient(name) {
      return /(^[a-z1-5.]{1}([a-z1-5.]{0,10}[a-z1-5])?$)/g.test(name);
    }
  }, {
    key: "privateToPublic",
    value: function privateToPublic(privateKey) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _eosjsEcc["default"].PrivateKey(privateKey).toPublic().toString(prefix ? prefix : _Blockchains.Blockchains.EOSIO.toUpperCase());
    }
  }, {
    key: "validPrivateKey",
    value: function validPrivateKey(privateKey) {
      return privateKey.length >= 50 && _eosjsEcc["default"].isValidPrivate(privateKey);
    }
  }, {
    key: "validPublicKey",
    value: function validPublicKey(publicKey) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      try {
        return _eosjsEcc["default"].PublicKey.fromStringOrThrow(publicKey, prefix ? prefix : _Blockchains.Blockchains.EOSIO.toUpperCase());
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "bufferToHexPrivate",
    value: function bufferToHexPrivate(buffer) {
      return _eosjsEcc["default"].PrivateKey.fromBuffer(Buffer.from(buffer)).toString();
    }
  }, {
    key: "hexPrivateToBuffer",
    value: function hexPrivateToBuffer(privateKey) {
      return new _eosjsEcc["default"].PrivateKey(privateKey).toBuffer();
    }
  }, {
    key: "actionParticipants",
    value: function actionParticipants(payload) {
      return _ObjectHelpers["default"].flatten(payload.messages.map(function (message) {
        return message.authorization.map(function (auth) {
          return "".concat(auth.actor, "@").concat(auth.permission);
        });
      }));
    }
  }, {
    key: "accountData",
    value: function () {
      var _accountData = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee20(account) {
        var network,
            accountName,
            getAccount,
            _args20 = arguments;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                network = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : null;
                accountName = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : null;

                getAccount = function getAccount() {
                  return fetch("".concat(network ? network.fullhost() : account.network().fullhost(), "/v1/chain/get_account"), {
                    method: 'POST',
                    body: JSON.stringify({
                      account_name: accountName ? accountName : account.name
                    })
                  }).then(function (res) {
                    return res.json();
                  });
                };

                return _context20.abrupt("return", Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(null);
                  }, 2000);
                }), getAccount()]));

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function accountData(_x27) {
        return _accountData.apply(this, arguments);
      }

      return accountData;
    }()
  }, {
    key: "hasUntouchableTokens",
    value: function hasUntouchableTokens() {
      return true;
    }
  }, {
    key: "untouchableBalance",
    value: function () {
      var _untouchableBalance = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee23(account) {
        var _this5 = this;

        var getCpuAndNet, getRex, cpunet, rex;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                getCpuAndNet =
                /*#__PURE__*/
                function () {
                  var _ref10 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee21() {
                    var accData, token;
                    return _regenerator["default"].wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return _this5.accountData(account)["catch"](function () {
                              return null;
                            });

                          case 2:
                            accData = _context21.sent;

                            if (!(!accData || !accData.hasOwnProperty('self_delegated_bandwidth') || !accData.self_delegated_bandwidth)) {
                              _context21.next = 5;
                              break;
                            }

                            return _context21.abrupt("return", null);

                          case 5:
                            token = account.network().systemToken().clone();
                            token.amount = parseFloat(parseFloat(accData.self_delegated_bandwidth.cpu_weight.split(' ')[0]) + parseFloat(accData.self_delegated_bandwidth.net_weight.split(' ')[0])).toFixed(token.decimals);
                            token.unusable = 'CPU / NET';
                            return _context21.abrupt("return", token);

                          case 9:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    }, _callee21);
                  }));

                  return function getCpuAndNet() {
                    return _ref10.apply(this, arguments);
                  };
                }();

                getRex =
                /*#__PURE__*/
                function () {
                  var _ref11 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee22() {
                    return _regenerator["default"].wrap(function _callee22$(_context22) {
                      while (1) {
                        switch (_context22.prev = _context22.next) {
                          case 0:
                            if (!(account.network().chainId !== MAINNET_CHAIN_ID)) {
                              _context22.next = 2;
                              break;
                            }

                            return _context22.abrupt("return", null);

                          case 2:
                            return _context22.abrupt("return", fetch("".concat(account.network().fullhost(), "/v1/chain/get_table_rows"), {
                              method: "POST",
                              body: JSON.stringify({
                                code: "eosio",
                                index_position: 1,
                                json: true,
                                limit: 1,
                                lower_bound: account.name,
                                scope: "eosio",
                                table: "rexbal"
                              })
                            }).then(function (x) {
                              return x.json();
                            }).then(function (result) {
                              if (!result) return null;
                              var rex = result.rows[0];
                              if (rex.owner !== account.name) return null;
                              var token = account.network().systemToken().clone();
                              token.symbol = 'REX';
                              token.amount = parseFloat(rex.rex_balance.split(' ')[0]).toFixed(4);
                              token.unusable = 'REX';
                              return token;
                            })["catch"](function () {
                              return null;
                            }));

                          case 3:
                          case "end":
                            return _context22.stop();
                        }
                      }
                    }, _callee22);
                  }));

                  return function getRex() {
                    return _ref11.apply(this, arguments);
                  };
                }();

                _context23.next = 4;
                return getCpuAndNet();

              case 4:
                cpunet = _context23.sent;
                _context23.next = 7;
                return getRex();

              case 7:
                rex = _context23.sent;
                return _context23.abrupt("return", [cpunet, rex].filter(function (x) {
                  return !!x;
                }));

              case 9:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      function untouchableBalance(_x28) {
        return _untouchableBalance.apply(this, arguments);
      }

      return untouchableBalance;
    }()
  }, {
    key: "balanceFor",
    value: function () {
      var _balanceFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee24(account, token) {
        var balances, row;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve([]);
                  }, 10000);
                }), getTableRows(account.network(), {
                  json: true,
                  code: token.contract,
                  scope: account.name,
                  table: 'accounts',
                  limit: 500
                }).then(function (res) {
                  return res.rows;
                })["catch"](function () {
                  return [];
                })]);

              case 2:
                balances = _context24.sent;
                row = balances.find(function (row) {
                  return row.balance.split(" ")[1].toLowerCase() === token.symbol.toLowerCase();
                });
                return _context24.abrupt("return", row ? row.balance.split(" ")[0] : 0);

              case 5:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }));

      function balanceFor(_x29, _x30) {
        return _balanceFor.apply(this, arguments);
      }

      return balanceFor;
    }()
  }, {
    key: "balancesFor",
    value: function () {
      var _balancesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee26(account, tokens) {
        var _this6 = this;

        var fallback,
            balances,
            blacklist,
            _args26 = arguments;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                fallback = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : false;

                if (!(!fallback && this.isEndorsedNetwork(account.network()))) {
                  _context26.next = 9;
                  break;
                }

                _context26.next = 4;
                return EosTokenAccountAPI.getAllTokens(account);

              case 4:
                balances = _context26.sent;

                if (balances) {
                  _context26.next = 7;
                  break;
                }

                return _context26.abrupt("return", this.balanceFor(account, tokens, true));

              case 7:
                blacklist = _StoreService["default"].get().state.scatter.settings.blacklistTokens.filter(function (x) {
                  return x.blockchain === _Blockchains.Blockchains.EOSIO;
                }).map(function (x) {
                  return x.unique();
                });
                return _context26.abrupt("return", balances.filter(function (x) {
                  return !blacklist.includes(x.unique());
                }));

              case 9:
                _context26.next = 11;
                return Promise.all(tokens.map(
                /*#__PURE__*/
                function () {
                  var _ref12 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee25(token) {
                    var t;
                    return _regenerator["default"].wrap(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            t = token.clone();
                            _context25.next = 3;
                            return _this6.balanceFor(account, token);

                          case 3:
                            t.amount = _context25.sent;
                            t.chainId = account.network().chainId;
                            return _context25.abrupt("return", t);

                          case 6:
                          case "end":
                            return _context25.stop();
                        }
                      }
                    }, _callee25);
                  }));

                  return function (_x33) {
                    return _ref12.apply(this, arguments);
                  };
                }()));

              case 11:
                return _context26.abrupt("return", _context26.sent);

              case 12:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function balancesFor(_x31, _x32) {
        return _balancesFor.apply(this, arguments);
      }

      return balancesFor;
    }()
  }, {
    key: "defaultDecimals",
    value: function defaultDecimals() {
      return 4;
    }
  }, {
    key: "defaultToken",
    value: function defaultToken() {
      return new _Token["default"](_Blockchains.Blockchains.EOSIO, 'eosio.token', 'EOS', 'EOS', this.defaultDecimals(), MAINNET_CHAIN_ID);
    }
  }, {
    key: "getRamPrice",
    value: function () {
      var _getRamPrice = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee28(network) {
        var parseAsset, getRamInfo, ramInfo;
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                parseAsset = function parseAsset(asset) {
                  return asset.split(' ')[0];
                };

                getRamInfo =
                /*#__PURE__*/
                function () {
                  var _ref13 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee27() {
                    return _regenerator["default"].wrap(function _callee27$(_context27) {
                      while (1) {
                        switch (_context27.prev = _context27.next) {
                          case 0:
                            return _context27.abrupt("return", getTableRows(network, {
                              json: true,
                              code: 'eosio',
                              scope: 'eosio',
                              table: 'rammarket'
                            }).then(function (res) {
                              var ramInfo = res.rows[0];
                              return [parseAsset(ramInfo.quote.balance), parseAsset(ramInfo.base.balance)];
                            }));

                          case 1:
                          case "end":
                            return _context27.stop();
                        }
                      }
                    }, _callee27);
                  }));

                  return function getRamInfo() {
                    return _ref13.apply(this, arguments);
                  };
                }();

                _context28.next = 4;
                return getRamInfo();

              case 4:
                ramInfo = _context28.sent;
                return _context28.abrupt("return", (ramInfo[0] / ramInfo[1]).toFixed(8));

              case 6:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function getRamPrice(_x34) {
        return _getRamPrice.apply(this, arguments);
      }

      return getRamPrice;
    }()
  }, {
    key: "createAccount",
    value: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee30(account, name, owner, active, eosUsed) {
        var _this7 = this;

        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref14 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee29(resolve, reject) {
                    var coreSymbol, net, cpu, eos, authorization, keyPath;
                    return _regenerator["default"].wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            coreSymbol = account.network().systemToken().symbol;
                            net = (eosUsed / 4).toFixed(account.network().systemToken().decimals);
                            cpu = (eosUsed - net).toFixed(account.network().systemToken().decimals);

                            if (!(net <= 0 || cpu <= 0)) {
                              _context29.next = 5;
                              break;
                            }

                            return _context29.abrupt("return", reject("Invalid Resources"));

                          case 5:
                            eos = _this7.getSignableEosjs(account, reject);
                            authorization = [{
                              actor: account.sendable(),
                              permission: account.authority
                            }];

                            keyPath = function keyPath(key) {
                              return {
                                threshold: 1,
                                keys: [{
                                  key: key,
                                  weight: 1
                                }],
                                accounts: [],
                                waits: []
                              };
                            };

                            _context29.next = 10;
                            return eos.transact({
                              actions: [{
                                account: 'eosio',
                                name: 'newaccount',
                                authorization: authorization,
                                data: {
                                  creator: account.name,
                                  name: name,
                                  owner: keyPath(owner),
                                  active: keyPath(active)
                                }
                              }, {
                                account: 'eosio',
                                name: 'buyrambytes',
                                authorization: authorization,
                                data: {
                                  payer: account.name,
                                  receiver: name,
                                  bytes: 4096
                                }
                              }, {
                                account: 'eosio',
                                name: 'delegatebw',
                                authorization: authorization,
                                data: {
                                  from: account.name,
                                  receiver: name,
                                  stake_net_quantity: "".concat(net, " ").concat(coreSymbol),
                                  stake_cpu_quantity: "".concat(cpu, " ").concat(coreSymbol),
                                  transfer: true
                                }
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            }).then(function (trx) {
                              return resolve(trx.transaction_id);
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            });

                          case 10:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29);
                  }));

                  return function (_x40, _x41) {
                    return _ref14.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }));

      function createAccount(_x35, _x36, _x37, _x38, _x39) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }, {
    key: "stakeOrUnstake",
    value: function () {
      var _stakeOrUnstake = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee32(account, cpu, net) {
        var _this8 = this;

        var staking,
            prompt,
            _args32 = arguments;
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                staking = _args32.length > 3 && _args32[3] !== undefined ? _args32[3] : true;
                prompt = _args32.length > 4 && _args32[4] !== undefined ? _args32[4] : true;
                return _context32.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref15 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee31(resolve, reject) {
                    var eos, name, data;
                    return _regenerator["default"].wrap(function _callee31$(_context31) {
                      while (1) {
                        switch (_context31.prev = _context31.next) {
                          case 0:
                            eos = _this8.getSignableEosjs(account, reject, prompt);
                            name = staking ? 'delegatebw' : 'undelegatebw';
                            data = staking ? {
                              from: account.name,
                              receiver: account.name,
                              stake_net_quantity: net,
                              stake_cpu_quantity: cpu,
                              transfer: false
                            } : {
                              from: account.name,
                              receiver: account.name,
                              unstake_net_quantity: net,
                              unstake_cpu_quantity: cpu
                            };
                            _context31.next = 5;
                            return eos.transact({
                              actions: [{
                                account: 'eosio',
                                name: name,
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: account.authority
                                }],
                                data: data
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            }).then(function (trx) {
                              return resolve(trx.transaction_id);
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            });

                          case 5:
                          case "end":
                            return _context31.stop();
                        }
                      }
                    }, _callee31);
                  }));

                  return function (_x45, _x46) {
                    return _ref15.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));

      function stakeOrUnstake(_x42, _x43, _x44) {
        return _stakeOrUnstake.apply(this, arguments);
      }

      return stakeOrUnstake;
    }()
  }, {
    key: "buyOrSellRAM",
    value: function () {
      var _buyOrSellRAM = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee34(account, bytes) {
        var _this9 = this;

        var buying,
            _args34 = arguments;
        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                buying = _args34.length > 2 && _args34[2] !== undefined ? _args34[2] : true;
                return _context34.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref16 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee33(resolve, reject) {
                    var eos, name, data;
                    return _regenerator["default"].wrap(function _callee33$(_context33) {
                      while (1) {
                        switch (_context33.prev = _context33.next) {
                          case 0:
                            eos = _this9.getSignableEosjs(account, reject);
                            name = buying ? 'buyrambytes' : 'sellram';
                            data = buying ? {
                              payer: account.name,
                              receiver: account.name,
                              bytes: bytes
                            } : {
                              account: account.name,
                              bytes: bytes
                            };
                            _context33.next = 5;
                            return eos.transact({
                              actions: [{
                                account: 'eosio',
                                name: name,
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: account.authority
                                }],
                                data: data
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            }).then(function (trx) {
                              return resolve(trx.transaction_id);
                            })["catch"](function (res) {
                              reject({
                                error: popupError(res)
                              });
                            });

                          case 5:
                          case "end":
                            return _context33.stop();
                        }
                      }
                    }, _callee33);
                  }));

                  return function (_x49, _x50) {
                    return _ref16.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34);
      }));

      function buyOrSellRAM(_x47, _x48) {
        return _buyOrSellRAM.apply(this, arguments);
      }

      return buyOrSellRAM;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee36(_ref17) {
        var _this10 = this;

        var account, to, amount, token, memo, _ref17$promptForSigna, promptForSignature, contract, symbol, amountWithSymbol;

        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                account = _ref17.account, to = _ref17.to, amount = _ref17.amount, token = _ref17.token, memo = _ref17.memo, _ref17$promptForSigna = _ref17.promptForSignature, promptForSignature = _ref17$promptForSigna === void 0 ? true : _ref17$promptForSigna;

                if (this.isValidRecipient(to)) {
                  _context36.next = 3;
                  break;
                }

                return _context36.abrupt("return", {
                  error: 'Invalid recipient account name'
                });

              case 3:
                amount = parseFloat(amount).toFixed(token.decimals);
                contract = token.contract, symbol = token.symbol;
                amountWithSymbol = amount.indexOf(symbol) > -1 ? amount : "".concat(amount, " ").concat(symbol);
                return _context36.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref18 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee35(resolve, reject) {
                    var eos, result;
                    return _regenerator["default"].wrap(function _callee35$(_context35) {
                      while (1) {
                        switch (_context35.prev = _context35.next) {
                          case 0:
                            eos = _this10.getSignableEosjs(account, reject, promptForSignature);
                            _context35.next = 3;
                            return eos.transact({
                              actions: [{
                                account: contract,
                                name: 'transfer',
                                authorization: [{
                                  actor: account.sendable(),
                                  permission: account.authority
                                }],
                                data: {
                                  from: account.name,
                                  to: to,
                                  quantity: amountWithSymbol,
                                  memo: memo
                                }
                              }]
                            }, {
                              blocksBehind: 3,
                              expireSeconds: 30
                            })["catch"](function (res) {
                              return resolve({
                                error: popupError(res)
                              });
                            }).then(function (result) {
                              return resolve(result);
                            });

                          case 3:
                            result = _context35.sent;

                          case 4:
                          case "end":
                            return _context35.stop();
                        }
                      }
                    }, _callee35);
                  }));

                  return function (_x52, _x53) {
                    return _ref18.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function transfer(_x51) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "signerWithPopup",
    value: function () {
      var _signerWithPopup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee39(payload, accounts, rejector) {
        var _this11 = this;

        return _regenerator["default"].wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                return _context39.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref19 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee38(resolve) {
                    var request;
                    return _regenerator["default"].wrap(function _callee38$(_context38) {
                      while (1) {
                        switch (_context38.prev = _context38.next) {
                          case 0:
                            if (accounts instanceof _Account["default"]) {
                              accounts = [accounts];
                            }

                            _context38.next = 3;
                            return _this11.requestParser(payload, _Network["default"].fromJson(accounts[0].network()));

                          case 3:
                            payload.messages = _context38.sent;

                            if (payload.messages) {
                              _context38.next = 6;
                              break;
                            }

                            return _context38.abrupt("return", rejector({
                              error: 'Error re-parsing transaction buffer'
                            }));

                          case 6:
                            payload.identityKey = _StoreService["default"].get().state.scatter.keychain.identities[0].publicKey;
                            payload.participants = accounts;
                            payload.network = accounts[0].network();
                            payload.origin = 'Scatter';
                            request = {
                              payload: payload,
                              origin: payload.origin,
                              blockchain: 'eos',
                              requiredFields: {},
                              type: Actions.SIGN,
                              id: 1
                            };

                            _EventService["default"].emit('popout', request).then(
                            /*#__PURE__*/
                            function () {
                              var _ref21 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee37(_ref20) {
                                var result, signatures, i, account;
                                return _regenerator["default"].wrap(function _callee37$(_context37) {
                                  while (1) {
                                    switch (_context37.prev = _context37.next) {
                                      case 0:
                                        result = _ref20.result;

                                        if (!(!result || !result.accepted || false)) {
                                          _context37.next = 3;
                                          break;
                                        }

                                        return _context37.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 3:
                                        signatures = [];
                                        i = 0;

                                      case 5:
                                        if (!(i < accounts.length)) {
                                          _context37.next = 17;
                                          break;
                                        }

                                        account = accounts[i];
                                        _context37.t0 = signatures;
                                        _context37.next = 10;
                                        return _SigningService["default"].sign(payload.network, _KeyPairService["default"].isHardware(account.publicKey) ? payload : {
                                          data: payload.buf
                                        }, account.publicKey, true, false);

                                      case 10:
                                        _context37.t1 = _context37.sent;

                                        _context37.t0.push.call(_context37.t0, _context37.t1);

                                        if (!(signatures.length !== i + 1)) {
                                          _context37.next = 14;
                                          break;
                                        }

                                        return _context37.abrupt("return", rejector({
                                          error: 'Could not get signature'
                                        }));

                                      case 14:
                                        i++;
                                        _context37.next = 5;
                                        break;

                                      case 17:
                                        signatures = signatures.reduce(function (acc, x) {
                                          if (!acc.includes(x)) acc.push(x);
                                          return acc;
                                        }, []);
                                        resolve(signatures);

                                      case 19:
                                      case "end":
                                        return _context37.stop();
                                    }
                                  }
                                }, _callee37);
                              }));

                              return function (_x58) {
                                return _ref21.apply(this, arguments);
                              };
                            }(), true);

                          case 12:
                          case "end":
                            return _context38.stop();
                        }
                      }
                    }, _callee38);
                  }));

                  return function (_x57) {
                    return _ref19.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39);
      }));

      function signerWithPopup(_x54, _x55, _x56) {
        return _signerWithPopup.apply(this, arguments);
      }

      return signerWithPopup;
    }()
  }, {
    key: "signer",
    value: function () {
      var _signer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee40(payload, publicKey) {
        var arbitrary,
            isHash,
            privateKey,
            _args40 = arguments;
        return _regenerator["default"].wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                arbitrary = _args40.length > 2 && _args40[2] !== undefined ? _args40[2] : false;
                isHash = _args40.length > 3 && _args40[3] !== undefined ? _args40[3] : false;
                privateKey = _args40.length > 4 && _args40[4] !== undefined ? _args40[4] : null;

                if (privateKey) {
                  _context40.next = 7;
                  break;
                }

                _context40.next = 6;
                return _KeyPairService["default"].publicToPrivate(publicKey);

              case 6:
                privateKey = _context40.sent;

              case 7:
                if (privateKey) {
                  _context40.next = 9;
                  break;
                }

                return _context40.abrupt("return");

              case 9:
                if (typeof privateKey !== 'string') privateKey = this.bufferToHexPrivate(privateKey);

                if (!(arbitrary && isHash)) {
                  _context40.next = 12;
                  break;
                }

                return _context40.abrupt("return", _eosjsEcc["default"].Signature.signHash(payload.data, privateKey).toString());

              case 12:
                return _context40.abrupt("return", _eosjsEcc["default"].sign(Buffer.from(arbitrary ? payload.data : payload.buf, 'utf8'), privateKey));

              case 13:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));

      function signer(_x59, _x60) {
        return _signer.apply(this, arguments);
      }

      return signer;
    }()
  }, {
    key: "transactionContracts",
    value: function transactionContracts(transaction) {
      return transaction.hasOwnProperty('actions') ? _ObjectHelpers["default"].distinct(transaction.actions.map(function (action) {
        return action.account;
      })) : _ObjectHelpers["default"].distinct(transaction.abis.map(function (x) {
        if (x.hasOwnProperty('account_name')) return x.account_name;
        return x.accountName;
      }));
    }
  }, {
    key: "fetchAbis",
    value: function () {
      var _fetchAbis = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee42(network, contracts) {
        var fallbackToChain,
            abis,
            _args42 = arguments;
        return _regenerator["default"].wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                fallbackToChain = _args42.length > 2 && _args42[2] !== undefined ? _args42[2] : false;

                if (fallbackToChain) {
                  _context42.next = 8;
                  break;
                }

                _context42.next = 4;
                return Promise.race([(0, _BackendApiService.POST)("walletpack/abis", {
                  network: network,
                  accounts: contracts
                })["catch"](function () {
                  return null;
                }), new Promise(function (r) {
                  return setTimeout(function () {
                    return r(null);
                  }, 2000);
                })]);

              case 4:
                abis = _context42.sent;

                if (!(!abis || !abis.length !== contracts.length)) {
                  _context42.next = 7;
                  break;
                }

                return _context42.abrupt("return", this.fetchAbis(network, contracts, true));

              case 7:
                return _context42.abrupt("return", abis);

              case 8:
                _context42.prev = 8;
                _context42.next = 11;
                return Promise.all(contracts.map(
                /*#__PURE__*/
                function () {
                  var _ref22 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee41(account) {
                    var chainAbi, rawAbi, abi;
                    return _regenerator["default"].wrap(function _callee41$(_context41) {
                      while (1) {
                        switch (_context41.prev = _context41.next) {
                          case 0:
                            _context41.next = 2;
                            return getChainData(network, "get_raw_abi", {
                              account_name: account
                            })["catch"](function () {
                              return null;
                            }).then(function (x) {
                              return x.abi;
                            });

                          case 2:
                            chainAbi = _context41.sent;

                            if (chainAbi) {
                              _context41.next = 5;
                              break;
                            }

                            return _context41.abrupt("return", console.error("Could not fetch ABIs for ".concat(account)));

                          case 5:
                            rawAbi = numeric.base64ToBinary(chainAbi);
                            abi = eosjsUtil.rawAbiToJson(rawAbi);
                            return _context41.abrupt("return", {
                              account: account,
                              rawAbi: rawAbi,
                              abi: abi
                            });

                          case 8:
                          case "end":
                            return _context41.stop();
                        }
                      }
                    }, _callee41);
                  }));

                  return function (_x63) {
                    return _ref22.apply(this, arguments);
                  };
                }()));

              case 11:
                return _context42.abrupt("return", _context42.sent);

              case 14:
                _context42.prev = 14;
                _context42.t0 = _context42["catch"](8);
                console.error(_context42.t0);
                return _context42.abrupt("return", null);

              case 18:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this, [[8, 14]]);
      }));

      function fetchAbis(_x61, _x62) {
        return _fetchAbis.apply(this, arguments);
      }

      return fetchAbis;
    }()
  }, {
    key: "parseEosjsRequest",
    value: function () {
      var _parseEosjsRequest = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee43(payload, network) {
        var transaction, api, contracts, abis, actions;
        return _regenerator["default"].wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                _context43.prev = 0;
                transaction = payload.transaction;
                api = getEosjsApi();
                contracts = this.transactionContracts(transaction);
                _context43.next = 6;
                return this.fetchAbis(network, contracts);

              case 6:
                abis = _context43.sent;
                abis.map(function (_ref23) {
                  var account = _ref23.account,
                      rawAbi = _ref23.rawAbi,
                      abi = _ref23.abi;
                  return api.cachedAbis.set(account, {
                    rawAbi: rawAbi,
                    abi: abi
                  });
                });
                _context43.next = 10;
                return api.deserializeActions(transaction.actions);

              case 10:
                actions = _context43.sent;
                actions.map(function (x) {
                  x.code = x.account;
                  x.type = x.name;
                });
                payload.buf = Buffer.concat([Buffer.from(network.chainId, "hex"), // Chain ID
                Buffer.from(api.serializeTransaction(transaction), 'hex'), // Transaction
                Buffer.from(new Uint8Array(32))]);
                payload.transaction.parsed = Object.assign({}, transaction);
                _context43.next = 16;
                return api.serializeActions(actions);

              case 16:
                payload.transaction.parsed.actions = _context43.sent;
                return _context43.abrupt("return", actions);

              case 20:
                _context43.prev = 20;
                _context43.t0 = _context43["catch"](0);
                console.error(_context43.t0);
                return _context43.abrupt("return", null);

              case 24:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this, [[0, 20]]);
      }));

      function parseEosjsRequest(_x64, _x65) {
        return _parseEosjsRequest.apply(this, arguments);
      }

      return parseEosjsRequest;
    }()
  }, {
    key: "parseEosjs2Request",
    value: function () {
      var _parseEosjs2Request = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee44(payload, network) {
        var transaction, api, contracts, abis, buffer, parsed;
        return _regenerator["default"].wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                transaction = payload.transaction;
                api = getEosjsApi();
                contracts = this.transactionContracts(transaction);
                _context44.next = 5;
                return this.fetchAbis(network, contracts);

              case 5:
                abis = _context44.sent;
                abis.map(function (_ref24) {
                  var account = _ref24.account,
                      rawAbi = _ref24.rawAbi,
                      abi = _ref24.abi;
                  return api.cachedAbis.set(account, {
                    rawAbi: rawAbi,
                    abi: abi
                  });
                });
                buffer = Buffer.from(transaction.serializedTransaction, 'hex');
                _context44.next = 10;
                return api.deserializeTransactionWithActions(buffer);

              case 10:
                parsed = _context44.sent;
                parsed.actions.map(function (x) {
                  x.code = x.account;
                  x.type = x.name;
                });
                payload.buf = Buffer.concat([Buffer.from(transaction.chainId, "hex"), // Chain ID
                buffer, // Transaction
                Buffer.from(new Uint8Array(32))]);
                payload.transaction.parsed = Object.assign({}, parsed);
                _context44.next = 16;
                return api.serializeActions(parsed.actions);

              case 16:
                payload.transaction.parsed.actions = _context44.sent;
                delete payload.transaction.abis;
                return _context44.abrupt("return", parsed.actions);

              case 19:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, this);
      }));

      function parseEosjs2Request(_x66, _x67) {
        return _parseEosjs2Request.apply(this, arguments);
      }

      return parseEosjs2Request;
    }()
  }, {
    key: "requestParser",
    value: function () {
      var _requestParser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee45(payload, network) {
        return _regenerator["default"].wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                if (!payload.transaction.hasOwnProperty('serializedTransaction')) {
                  _context45.next = 4;
                  break;
                }

                return _context45.abrupt("return", this.parseEosjs2Request(payload, network));

              case 4:
                return _context45.abrupt("return", this.parseEosjsRequest(payload, network));

              case 5:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45, this);
      }));

      function requestParser(_x68, _x69) {
        return _requestParser.apply(this, arguments);
      }

      return requestParser;
    }()
  }]);
  return EOS;
}(_Plugin2["default"]);

exports["default"] = EOS;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "5KYW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// copyright defined in eosjs/LICENSE.txt
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=eosjs-api-interfaces.js.map

/***/ }),

/***/ "Iqa8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_api_1 = __webpack_require__("SFb+");
exports.Api = eosjs_api_1.Api;
var ApiInterfaces = __webpack_require__("5KYW");
exports.ApiInterfaces = ApiInterfaces;
var eosjs_jsonrpc_1 = __webpack_require__("syPa");
exports.JsonRpc = eosjs_jsonrpc_1.JsonRpc;
var Numeric = __webpack_require__("atws");
exports.Numeric = Numeric;
var RpcInterfaces = __webpack_require__("NwZA");
exports.RpcInterfaces = RpcInterfaces;
var eosjs_rpcerror_1 = __webpack_require__("JdmY");
exports.RpcError = eosjs_rpcerror_1.RpcError;
var Serialize = __webpack_require__("wHkc");
exports.Serialize = Serialize;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "JdmY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module RPC-Error
 */
// copyright defined in eosjs/LICENSE.txt
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
/** Holds detailed error information */
var RpcError = /** @class */ (function (_super) {
    __extends(RpcError, _super);
    function RpcError(json) {
        var _this = this;
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message) {
            _this = _super.call(this, json.error.details[0].message) || this;
        }
        else if (json.processed && json.processed.except && json.processed.except.message) {
            _this = _super.call(this, json.processed.except.message) || this;
        }
        else {
            _this = _super.call(this, json.message) || this;
        }
        Object.setPrototypeOf(_this, RpcError.prototype);
        _this.json = json;
        return _this;
    }
    return RpcError;
}(Error));
exports.RpcError = RpcError;
//# sourceMappingURL=eosjs-rpcerror.js.map

/***/ }),

/***/ "NwZA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// copyright defined in eosjs/LICENSE.txt
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=eosjs-rpc-interfaces.js.map

/***/ }),

/***/ "SFb+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module API
 */
// copyright defined in eosjs/LICENSE.txt
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ser = __webpack_require__("wHkc");
var abiAbi = __webpack_require__("dL2V");
var transactionAbi = __webpack_require__("lmaJ");
var Api = /** @class */ (function () {
    /**
     * @param args
     *    * `rpc`: Issues RPC calls
     *    * `authorityProvider`: Get public keys needed to meet authorities in a transaction
     *    * `abiProvider`: Supplies ABIs in raw form (binary)
     *    * `signatureProvider`: Signs transactions
     *    * `chainId`: Identifies chain
     *    * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     *    * `textDecoder`: `TextDecoder` instance to use. Pass in `null` if running in a browser
     */
    function Api(args) {
        /** Holds information needed to serialize contract actions */
        this.contracts = new Map();
        /** Fetched abis */
        this.cachedAbis = new Map();
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.abiProvider = args.abiProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.textEncoder = args.textEncoder;
        this.textDecoder = args.textDecoder;
        this.abiTypes = ser.getTypesFromAbi(ser.createInitialTypes(), abiAbi);
        this.transactionTypes = ser.getTypesFromAbi(ser.createInitialTypes(), transactionAbi);
    }
    /** Decodes an abi as Uint8Array into json. */
    Api.prototype.rawAbiToJson = function (rawAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
            array: rawAbi,
        });
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        buffer.restartRead();
        return this.abiTypes.get('abi_def').deserialize(buffer);
    };
    /** Get abi in both binary and structured forms. Fetch when needed. */
    Api.prototype.getCachedAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cachedAbi, rawAbi, abi, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!reload && this.cachedAbis.get(accountName)) {
                            return [2 /*return*/, this.cachedAbis.get(accountName)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.abiProvider.getRawAbi(accountName)];
                    case 2:
                        rawAbi = (_a.sent()).abi;
                        abi = this.rawAbiToJson(rawAbi);
                        cachedAbi = { rawAbi: rawAbi, abi: abi };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        e_1.message = "fetching abi for " + accountName + ": " + e_1.message;
                        throw e_1;
                    case 4:
                        if (!cachedAbi) {
                            throw new Error("Missing abi for " + accountName);
                        }
                        this.cachedAbis.set(accountName, cachedAbi);
                        return [2 /*return*/, cachedAbi];
                }
            });
        });
    };
    /** Get abi in structured form. Fetch when needed. */
    Api.prototype.getAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCachedAbi(accountName, reload)];
                    case 1: return [2 /*return*/, (_a.sent()).abi];
                }
            });
        });
    };
    /** Get abis needed by a transaction */
    Api.prototype.getTransactionAbis = function (transaction, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var accounts, uniqueAccounts, actionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                accounts = transaction.actions.map(function (action) { return action.account; });
                uniqueAccounts = new Set(accounts);
                actionPromises = __spread(uniqueAccounts).map(function (account) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {
                                    accountName: account
                                };
                                return [4 /*yield*/, this.getCachedAbi(account, reload)];
                            case 1: return [2 /*return*/, (_a.abi = (_b.sent()).rawAbi,
                                    _a)];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.all(actionPromises)];
            });
        });
    };
    /** Get data needed to serialize actions in a contract */
    Api.prototype.getContract = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, abi, types, actions, _b, _c, _d, name_1, type, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!reload && this.contracts.get(accountName)) {
                            return [2 /*return*/, this.contracts.get(accountName)];
                        }
                        return [4 /*yield*/, this.getAbi(accountName, reload)];
                    case 1:
                        abi = _e.sent();
                        types = ser.getTypesFromAbi(ser.createInitialTypes(), abi);
                        actions = new Map();
                        try {
                            for (_b = __values(abi.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                                _d = _c.value, name_1 = _d.name, type = _d.type;
                                actions.set(name_1, ser.getType(types, type));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        result = { types: types, actions: actions };
                        this.contracts.set(accountName, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /** Convert `value` to binary form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.serialize = function (buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    };
    /** Convert data in `buffer` to structured form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.deserialize = function (buffer, type) {
        return this.transactionTypes.get(type).deserialize(buffer);
    };
    /** Convert a transaction to binary */
    Api.prototype.serializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        this.serialize(buffer, 'transaction', __assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    };
    /** Convert a transaction from binary. Leaves actions in hex. */
    Api.prototype.deserializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushArray(transaction);
        return this.deserialize(buffer, 'transaction');
    };
    /** Convert actions to hex */
    Api.prototype.serializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.serializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert actions from hex */
    Api.prototype.deserializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.deserializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert a transaction from binary. Also deserializes actions. */
    Api.prototype.deserializeTransactionWithActions = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var deserializedTransaction, deserializedActions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof transaction === 'string') {
                            transaction = ser.hexToUint8Array(transaction);
                        }
                        deserializedTransaction = this.deserializeTransaction(transaction);
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.actions)];
                    case 1:
                        deserializedActions = _a.sent();
                        return [2 /*return*/, __assign({}, deserializedTransaction, { actions: deserializedActions })];
                }
            });
        });
    };
    /**
     * Create and optionally broadcast a transaction.
     *
     * Named Parameters:
     *    * `broadcast`: broadcast this transaction?
     *    * `sign`: sign this transaction?
     *    * If both `blocksBehind` and `expireSeconds` are present,
     *      then fetch the block which is `blocksBehind` behind head block,
     *      use it as a reference for TAPoS, and expire the transaction `expireSeconds` after that block's time.
     * @returns node response if `broadcast`, `{signatures, serializedTransaction}` if `!broadcast`
     */
    Api.prototype.transact = function (transaction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.broadcast, broadcast = _c === void 0 ? true : _c, _d = _b.sign, sign = _d === void 0 ? true : _d, blocksBehind = _b.blocksBehind, expireSeconds = _b.expireSeconds;
        return __awaiter(this, void 0, void 0, function () {
            var info, refBlock, abis, _e, _f, serializedTransaction, pushTransactionArgs, availableKeys, requiredKeys;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!!this.chainId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _g.sent();
                        this.chainId = info.chain_id;
                        _g.label = 2;
                    case 2:
                        if (!(typeof blocksBehind === 'number' && expireSeconds)) return [3 /*break*/, 6];
                        if (!!info) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 3:
                        info = _g.sent();
                        _g.label = 4;
                    case 4: return [4 /*yield*/, this.rpc.get_block(info.head_block_num - blocksBehind)];
                    case 5:
                        refBlock = _g.sent();
                        transaction = __assign({}, ser.transactionHeader(refBlock, expireSeconds), transaction);
                        _g.label = 6;
                    case 6:
                        if (!this.hasRequiredTaposFields(transaction)) {
                            throw new Error('Required configuration or TAPOS fields are not present');
                        }
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 7:
                        abis = _g.sent();
                        _e = [{}, transaction];
                        _f = {};
                        return [4 /*yield*/, this.serializeActions(transaction.actions)];
                    case 8:
                        transaction = __assign.apply(void 0, _e.concat([(_f.actions = _g.sent(), _f)]));
                        serializedTransaction = this.serializeTransaction(transaction);
                        pushTransactionArgs = { serializedTransaction: serializedTransaction, signatures: [] };
                        if (!sign) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 9:
                        availableKeys = _g.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 10:
                        requiredKeys = _g.sent();
                        return [4 /*yield*/, this.signatureProvider.sign({
                                chainId: this.chainId,
                                requiredKeys: requiredKeys,
                                serializedTransaction: serializedTransaction,
                                abis: abis,
                            })];
                    case 11:
                        pushTransactionArgs = _g.sent();
                        _g.label = 12;
                    case 12:
                        if (broadcast) {
                            return [2 /*return*/, this.pushSignedTransaction(pushTransactionArgs)];
                        }
                        return [2 /*return*/, pushTransactionArgs];
                }
            });
        });
    };
    /** Broadcast a signed transaction */
    Api.prototype.pushSignedTransaction = function (_a) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        serializedTransaction: serializedTransaction,
                    })];
            });
        });
    };
    // eventually break out into TransactionValidator class
    Api.prototype.hasRequiredTaposFields = function (_a) {
        var expiration = _a.expiration, ref_block_num = _a.ref_block_num, ref_block_prefix = _a.ref_block_prefix, transaction = __rest(_a, ["expiration", "ref_block_num", "ref_block_prefix"]);
        return !!(expiration && ref_block_num && ref_block_prefix);
    };
    return Api;
}()); // Api
exports.Api = Api;
//# sourceMappingURL=eosjs-api.js.map

/***/ }),

/***/ "atws":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Numeric
 */
// copyright defined in eosjs/LICENSE.txt
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ripemd160 = __webpack_require__("cRVo").RIPEMD160.hash;
var base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function create_base58_map() {
    var base58M = Array(256).fill(-1);
    for (var i = 0; i < base58Chars.length; ++i) {
        base58M[base58Chars.charCodeAt(i)] = i;
    }
    return base58M;
}
var base58Map = create_base58_map();
function create_base64_map() {
    var base64M = Array(256).fill(-1);
    for (var i = 0; i < base64Chars.length; ++i) {
        base64M[base64Chars.charCodeAt(i)] = i;
    }
    base64M['='.charCodeAt(0)] = 0;
    return base64M;
}
var base64Map = create_base64_map();
/** Is `bignum` a negative number? */
function isNegative(bignum) {
    return (bignum[bignum.length - 1] & 0x80) !== 0;
}
exports.isNegative = isNegative;
/** Negate `bignum` */
function negate(bignum) {
    var carry = 1;
    for (var i = 0; i < bignum.length; ++i) {
        var x = (~bignum[i] & 0xff) + carry;
        bignum[i] = x;
        carry = x >> 8;
    }
}
exports.negate = negate;
/**
 * Convert an unsigned decimal number in `s` to a bignum
 * @param size bignum size (bytes)
 */
function decimalToBinary(size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0)) {
            throw new Error('invalid number');
        }
        var carry = srcDigit - '0'.charCodeAt(0);
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('number is out of range');
        }
    }
    return result;
}
exports.decimalToBinary = decimalToBinary;
/**
 * Convert a signed decimal number in `s` to a bignum
 * @param size bignum size (bytes)
 */
function signedDecimalToBinary(size, s) {
    var negative = s[0] === '-';
    if (negative) {
        s = s.substr(1);
    }
    var result = decimalToBinary(size, s);
    if (negative) {
        negate(result);
        if (!isNegative(result)) {
            throw new Error('number is out of range');
        }
    }
    else if (isNegative(result)) {
        throw new Error('number is out of range');
    }
    return result;
}
exports.signedDecimalToBinary = signedDecimalToBinary;
/**
 * Convert `bignum` to an unsigned decimal number
 * @param minDigits 0-pad result to this many digits
 */
function binaryToDecimal(bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    var result = Array(minDigits).fill('0'.charCodeAt(0));
    for (var i = bignum.length - 1; i >= 0; --i) {
        var carry = bignum[i];
        for (var j = 0; j < result.length; ++j) {
            var x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread(result));
}
exports.binaryToDecimal = binaryToDecimal;
/**
 * Convert `bignum` to a signed decimal number
 * @param minDigits 0-pad result to this many digits
 */
function signedBinaryToDecimal(bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    if (isNegative(bignum)) {
        var x = bignum.slice();
        negate(x);
        return '-' + binaryToDecimal(x, minDigits);
    }
    return binaryToDecimal(bignum, minDigits);
}
exports.signedBinaryToDecimal = signedBinaryToDecimal;
/**
 * Convert an unsigned base-58 number in `s` to a bignum
 * @param size bignum size (bytes)
 */
function base58ToBinary(size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('base-58 value is out of range');
        }
    }
    result.reverse();
    return result;
}
exports.base58ToBinary = base58ToBinary;
/**
 * Convert `bignum` to a base-58 number
 * @param minDigits 0-pad result to this many digits
 */
function binaryToBase58(bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    var e_1, _a, e_2, _b;
    var result = [];
    try {
        for (var bignum_1 = __values(bignum), bignum_1_1 = bignum_1.next(); !bignum_1_1.done; bignum_1_1 = bignum_1.next()) {
            var byte = bignum_1_1.value;
            var carry = byte;
            for (var j = 0; j < result.length; ++j) {
                var x = (base58Map[result[j]] << 8) + carry;
                result[j] = base58Chars.charCodeAt(x % 58);
                carry = (x / 58) | 0;
            }
            while (carry) {
                result.push(base58Chars.charCodeAt(carry % 58));
                carry = (carry / 58) | 0;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bignum_1_1 && !bignum_1_1.done && (_a = bignum_1.return)) _a.call(bignum_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var bignum_2 = __values(bignum), bignum_2_1 = bignum_2.next(); !bignum_2_1.done; bignum_2_1 = bignum_2.next()) {
            var byte = bignum_2_1.value;
            if (byte) {
                break;
            }
            else {
                result.push('1'.charCodeAt(0));
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bignum_2_1 && !bignum_2_1.done && (_b = bignum_2.return)) _b.call(bignum_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread(result));
}
exports.binaryToBase58 = binaryToBase58;
/** Convert an unsigned base-64 number in `s` to a bignum */
function base64ToBinary(s) {
    var len = s.length;
    if ((len & 3) === 1 && s[len - 1] === '=') {
        len -= 1;
    } // fc appends an extra '='
    if ((len & 3) !== 0) {
        throw new Error('base-64 value is not padded correctly');
    }
    var groups = len >> 2;
    var bytes = groups * 3;
    if (len > 0 && s[len - 1] === '=') {
        if (s[len - 2] === '=') {
            bytes -= 2;
        }
        else {
            bytes -= 1;
        }
    }
    var result = new Uint8Array(bytes);
    for (var group = 0; group < groups; ++group) {
        var digit0 = base64Map[s.charCodeAt(group * 4 + 0)];
        var digit1 = base64Map[s.charCodeAt(group * 4 + 1)];
        var digit2 = base64Map[s.charCodeAt(group * 4 + 2)];
        var digit3 = base64Map[s.charCodeAt(group * 4 + 3)];
        result[group * 3 + 0] = (digit0 << 2) | (digit1 >> 4);
        if (group * 3 + 1 < bytes) {
            result[group * 3 + 1] = ((digit1 & 15) << 4) | (digit2 >> 2);
        }
        if (group * 3 + 2 < bytes) {
            result[group * 3 + 2] = ((digit2 & 3) << 6) | digit3;
        }
    }
    return result;
}
exports.base64ToBinary = base64ToBinary;
/** Key types this library supports */
var KeyType;
(function (KeyType) {
    KeyType[KeyType["k1"] = 0] = "k1";
    KeyType[KeyType["r1"] = 1] = "r1";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
/** Public key data size, excluding type field */
exports.publicKeyDataSize = 33;
/** Private key data size, excluding type field */
exports.privateKeyDataSize = 32;
/** Signature data size, excluding type field */
exports.signatureDataSize = 65;
function digestSuffixRipemd160(data, suffix) {
    var d = new Uint8Array(data.length + suffix.length);
    for (var i = 0; i < data.length; ++i) {
        d[i] = data[i];
    }
    for (var i = 0; i < suffix.length; ++i) {
        d[data.length + i] = suffix.charCodeAt(i);
    }
    return ripemd160(d);
}
function stringToKey(s, type, size, suffix) {
    var whole = base58ToBinary(size + 4, s);
    var result = { type: type, data: new Uint8Array(whole.buffer, 0, size) };
    var digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[size + 0] || digest[1] !== whole[size + 1]
        || digest[2] !== whole[size + 2] || digest[3] !== whole[size + 3]) {
        throw new Error('checksum doesn\'t match');
    }
    return result;
}
function keyToString(key, suffix, prefix) {
    var digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    var whole = new Uint8Array(key.data.length + 4);
    for (var i = 0; i < key.data.length; ++i) {
        whole[i] = key.data[i];
    }
    for (var i = 0; i < 4; ++i) {
        whole[i + key.data.length] = digest[i];
    }
    return prefix + binaryToBase58(whole);
}
/** Convert key in `s` to binary form */
function stringToPublicKey(s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing public key');
    }
    if (s.substr(0, 3) === 'EOS') {
        var whole = base58ToBinary(exports.publicKeyDataSize + 4, s.substr(3));
        var key = { type: KeyType.k1, data: new Uint8Array(exports.publicKeyDataSize) };
        for (var i = 0; i < exports.publicKeyDataSize; ++i) {
            key.data[i] = whole[i];
        }
        var digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[exports.publicKeyDataSize] || digest[1] !== whole[34]
            || digest[2] !== whole[35] || digest[3] !== whole[36]) {
            throw new Error('checksum doesn\'t match');
        }
        return key;
    }
    else if (s.substr(0, 7) === 'PUB_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.publicKeyDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'PUB_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.publicKeyDataSize, 'R1');
    }
    else {
        throw new Error('unrecognized public key format');
    }
}
exports.stringToPublicKey = stringToPublicKey;
/** Convert `key` to string (base-58) form */
function publicKeyToString(key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'K1', 'PUB_K1_');
    }
    else if (key.type === KeyType.r1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'R1', 'PUB_R1_');
    }
    else {
        throw new Error('unrecognized public key format');
    }
}
exports.publicKeyToString = publicKeyToString;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
function convertLegacyPublicKey(s) {
    if (s.substr(0, 3) === 'EOS') {
        return publicKeyToString(stringToPublicKey(s));
    }
    return s;
}
exports.convertLegacyPublicKey = convertLegacyPublicKey;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
function convertLegacyPublicKeys(keys) {
    return keys.map(convertLegacyPublicKey);
}
exports.convertLegacyPublicKeys = convertLegacyPublicKeys;
/** Convert key in `s` to binary form */
function stringToPrivateKey(s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing private key');
    }
    if (s.substr(0, 7) === 'PVT_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.privateKeyDataSize, 'R1');
    }
    else {
        throw new Error('unrecognized private key format');
    }
}
exports.stringToPrivateKey = stringToPrivateKey;
/** Convert `key` to string (base-58) form */
function privateKeyToString(key) {
    if (key.type === KeyType.r1) {
        return keyToString(key, 'R1', 'PVT_R1_');
    }
    else {
        throw new Error('unrecognized private key format');
    }
}
exports.privateKeyToString = privateKeyToString;
/** Convert key in `s` to binary form */
function stringToSignature(s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing signature');
    }
    if (s.substr(0, 7) === 'SIG_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.signatureDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'SIG_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.signatureDataSize, 'R1');
    }
    else {
        throw new Error('unrecognized signature format');
    }
}
exports.stringToSignature = stringToSignature;
/** Convert `signature` to string (base-58) form */
function signatureToString(signature) {
    if (signature.type === KeyType.k1) {
        return keyToString(signature, 'K1', 'SIG_K1_');
    }
    else if (signature.type === KeyType.r1) {
        return keyToString(signature, 'R1', 'SIG_R1_');
    }
    else {
        throw new Error('unrecognized signature format');
    }
}
exports.signatureToString = signatureToString;
//# sourceMappingURL=eosjs-numeric.js.map

/***/ }),

/***/ "cRVo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RIPEMD160 = function () {
	function RIPEMD160() {
		// https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
		// http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf

		_classCallCheck(this, RIPEMD160);
	}

	_createClass(RIPEMD160, null, [{
		key: "get_n_pad_bytes",
		value: function get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */) {
			//  Obtain the number of bytes needed to pad the message.
			// It does not contain the size of the message size information.
			/*
   	https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
   		The Cryptographic Hash Function RIPEMD-160
   		written by
   		Bart Preneel,
   		Hans Dobbertin,
   		Antoon Bosselaers
   	in
   		1997.
   		--------------------------------------------------
   		§5     Description of RIPEMD-160
   		......
   		 In order to guarantee that the total input size is a
   	multiple of 512 bits, the input is padded in the same
   	way as for all the members of the MD4-family: one
   	appends a single 1 followed by a string of 0s (the
   	number of 0s lies between 0 and 511); the last 64 bits
   	of the extended input contain the binary representation
   	of the input size in bits, least significant byte first.
   */
			/*
   	https://tools.ietf.org/rfc/rfc1186.txt
   		RFC 1186: MD4 Message Digest Algorithm.
   		written by
   		Ronald Linn Rivest
   	in
   		October 1990.
   		--------------------------------------------------
   		§3     MD4 Algorithm Description
   		......
   		Step 1. Append padding bits
   		 The message is "padded" (extended) so that its length
   	(in bits) is congruent to 448, modulo 512. That is, the
   	message is extended so that it is just 64 bits shy of
   	being a multiple of 512 bits long. Padding is always
   	performed, even if the length of the message is already
   	congruent to 448, modulo 512 (in which case 512 bits of
   	padding are added).
   		 Padding is performed as follows: a single "1" bit is
   	appended to the message, and then enough zero bits are
   	appended so that the length in bits of the padded
   	message becomes congruent to 448, modulo 512.
   		Step 2. Append length
   		 A 64-bit representation of b (the length of the message
   	before the padding bits were added) is appended to the
   	result of the previous step. In the unlikely event that
   	b is greater than 2^64, then only the low-order 64 bits
   	of b are used. (These bits are appended as two 32-bit
   	words and appended low-order word first in accordance
   	with the previous conventions.)
   		 At this point the resulting message (after padding with
   	bits and with b) has a length that is an exact multiple
   	of 512 bits. Equivalently, this message has a length
   	that is an exact multiple of 16 (32-bit) words. Let
   	M[0 ... N-1] denote the words of the resulting message,
   	where N is a multiple of 16.
   */
			// https://crypto.stackexchange.com/a/32407/54568
			/*
   	Example case  # 1
   		[0 bit: message.]
   		[1 bit: 1.]
   		[447 bits: 0.]
   		[64 bits: message size information.]
   		Example case  # 2
   		[512-bits: message]
   		[1 bit: 1.]
   		[447 bits: 0.]
   		[64 bits: message size information.]
   		Example case  # 3
   		[(512 - 64 = 448) bits: message.]
   		[1 bit: 1.]
   		[511 bits: 0.]
   		[64 bits: message size information.]
   		Example case  # 4
   		[(512 - 65 = 447) bits: message.]
   		[1 bit: 1.]
   		[0 bit: 0.]
   		[64 bits: message size information.]
   */
			// The number of padding zero bits:
			//      511 - [{(message size in bits) + 64} (mod 512)]
			return 64 - (message_size + 8 & 63 /* 63 */);
		}
	}, {
		key: "pad",
		value: function pad(message /* An ArrayBuffer. */) {
			var message_size = message.byteLength;
			var n_pad = RIPEMD160.get_n_pad_bytes(message_size);

			//  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
			// bitwise operation in Javascript is done on 32-bits operands.
			var divmod = function divmod(dividend, divisor) {
				return [Math.floor(dividend / divisor), dividend % divisor];
			};
			/*
   To shift
     00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                      t o
    00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000
   --------------------------------------------------------------------------------
   Method #1
      00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
    [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
    [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                          (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                      (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
    [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
     00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000
   	const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
   const [
   	msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
   	msg_byte_size_least // Value range [0, (2 ** 32) - 1].
   ] = divmod(message_size, uint32_max_plus_1);
   const [
   	carry, // Value range [0, 7].
   	msg_bit_size_least // Value range [0, (2 ** 32) - 8].
   ] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
   const message_bit_size_most = message_byte_size_most * 8
   	+ carry; // Value range [0, (2 ** 24) - 1].
   --------------------------------------------------------------------------------
   Method #2
     00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
       [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                          (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                           (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
     00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000
   	*/

			var _divmod$map = divmod(message_size, 536870912 /* (2 ** 29) */).map(function (x, index) {
				return index ? x * 8 : x;
			}),
			    _divmod$map2 = _slicedToArray(_divmod$map, 2),
			    msg_bit_size_most = _divmod$map2[0],
			    msg_bit_size_least = _divmod$map2[1];

			// `ArrayBuffer.transfer()` is not supported.


			var padded = new Uint8Array(message_size + n_pad + 8);
			padded.set(new Uint8Array(message), 0);
			var data_view = new DataView(padded.buffer);
			data_view.setUint8(message_size, 128);
			data_view.setUint32(message_size + n_pad, msg_bit_size_least, true // Little-endian
			);
			data_view.setUint32(message_size + n_pad + 4, msg_bit_size_most, true // Little-endian
			);

			return padded.buffer;
		}
	}, {
		key: "f",
		value: function f(j, x, y, z) {
			if (0 <= j && j <= 15) {
				// Exclusive-OR
				return x ^ y ^ z;
			}
			if (16 <= j && j <= 31) {
				// Multiplexing (muxing)
				return x & y | ~x & z;
			}
			if (32 <= j && j <= 47) {
				return (x | ~y) ^ z;
			}
			if (48 <= j && j <= 63) {
				// Multiplexing (muxing)
				return x & z | y & ~z;
			}
			if (64 <= j && j <= 79) {
				return x ^ (y | ~z);
			}
		}
	}, {
		key: "K",
		value: function K(j) {
			if (0 <= j && j <= 15) {
				return 0x00000000;
			}
			if (16 <= j && j <= 31) {
				// Math.floor((2 ** 30) * Math.SQRT2)
				return 0x5A827999;
			}
			if (32 <= j && j <= 47) {
				// Math.floor((2 ** 30) * Math.sqrt(3))
				return 0x6ED9EBA1;
			}
			if (48 <= j && j <= 63) {
				// Math.floor((2 ** 30) * Math.sqrt(5))
				return 0x8F1BBCDC;
			}
			if (64 <= j && j <= 79) {
				// Math.floor((2 ** 30) * Math.sqrt(7))
				return 0xA953FD4E;
			}
		}
	}, {
		key: "KP",
		value: function KP(j) // K'
		{
			if (0 <= j && j <= 15) {
				// Math.floor((2 ** 30) * Math.cbrt(2))
				return 0x50A28BE6;
			}
			if (16 <= j && j <= 31) {
				// Math.floor((2 ** 30) * Math.cbrt(3))
				return 0x5C4DD124;
			}
			if (32 <= j && j <= 47) {
				// Math.floor((2 ** 30) * Math.cbrt(5))
				return 0x6D703EF3;
			}
			if (48 <= j && j <= 63) {
				// Math.floor((2 ** 30) * Math.cbrt(7))
				return 0x7A6D76E9;
			}
			if (64 <= j && j <= 79) {
				return 0x00000000;
			}
		}
	}, {
		key: "add_modulo32",
		value: function add_modulo32() /* ...... */{
			// 1.  Modulo addition (addition modulo) is associative.
			//    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
			// 2.  Bitwise operation in Javascript
			//    is done on 32-bits operands
			//    and results in a 32-bits value.
			return Array.from(arguments).reduce(function (a, b) {
				return a + b;
			}, 0) | 0;
		}
	}, {
		key: "rol32",
		value: function rol32(value, count) {
			// Cyclic left shift (rotate) on 32-bits value.
			return value << count | value >>> 32 - count;
		}
	}, {
		key: "hash",
		value: function hash(message /* An ArrayBuffer. */) {
			//////////       Padding       //////////

			// The padded message.
			var padded = RIPEMD160.pad(message);

			//////////     Compression     //////////

			// Message word selectors.
			var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
			var rP = [// r'
			5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];

			// Amounts for 'rotate left' operation.
			var s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
			var sP = [// s'
			8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

			// The size, in bytes, of a word.
			var word_size = 4;

			// The size, in bytes, of a 16-words block.
			var block_size = 64;

			// The number of the 16-words blocks.
			var t = padded.byteLength / block_size;

			//  The message after padding consists of t 16-word blocks that
			// are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
			var X = new Array(t).fill(undefined).map(function (_, i) {
				return function (j) {
					return new DataView(padded, i * block_size, block_size).getUint32(j * word_size, true // Little-endian
					);
				};
			});

			//  The result of RIPEMD-160 is contained in five 32-bit words,
			// which form the internal state of the algorithm. The final
			// content of these five 32-bit words is converted to a 160-bit
			// string, again using the little-endian convention.
			var h = [0x67452301, // h_0
			0xEFCDAB89, // h_1
			0x98BADCFE, // h_2
			0x10325476, // h_3
			0xC3D2E1F0 // h_4
			];

			for (var i = 0; i < t; ++i) {
				var A = h[0],
				    B = h[1],
				    C = h[2],
				    D = h[3],
				    E = h[4];
				var AP = A,
				    BP = B,
				    CP = C,
				    DP = D,
				    EP = E;
				for (var j = 0; j < 80; ++j) {
					// Left rounds
					var _T = RIPEMD160.add_modulo32(RIPEMD160.rol32(RIPEMD160.add_modulo32(A, RIPEMD160.f(j, B, C, D), X[i](r[j]), RIPEMD160.K(j)), s[j]), E);
					A = E;
					E = D;
					D = RIPEMD160.rol32(C, 10);
					C = B;
					B = _T;

					// Right rounds
					_T = RIPEMD160.add_modulo32(RIPEMD160.rol32(RIPEMD160.add_modulo32(AP, RIPEMD160.f(79 - j, BP, CP, DP), X[i](rP[j]), RIPEMD160.KP(j)), sP[j]), EP);
					AP = EP;
					EP = DP;
					DP = RIPEMD160.rol32(CP, 10);
					CP = BP;
					BP = _T;
				}
				var T = RIPEMD160.add_modulo32(h[1], C, DP);
				h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
				h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
				h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
				h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
				h[0] = T;
			}

			//  The final output string then consists of the concatenatation
			// of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
			// 4-byte string using the little-endian convention.
			var result = new ArrayBuffer(20);
			var data_view = new DataView(result);
			h.forEach(function (h_i, i) {
				return data_view.setUint32(i * 4, h_i, true);
			});
			return result;
		}
	}]);

	return RIPEMD160;
}();

module.exports = {
	RIPEMD160: RIPEMD160
};


/***/ }),

/***/ "dL2V":
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.1\",\"structs\":[{\"name\":\"extensions_entry\",\"base\":\"\",\"fields\":[{\"name\":\"tag\",\"type\":\"uint16\"},{\"name\":\"value\",\"type\":\"bytes\"}]},{\"name\":\"type_def\",\"base\":\"\",\"fields\":[{\"name\":\"new_type_name\",\"type\":\"string\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"field_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"struct_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"base\",\"type\":\"string\"},{\"name\":\"fields\",\"type\":\"field_def[]\"}]},{\"name\":\"action_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"name\"},{\"name\":\"type\",\"type\":\"string\"},{\"name\":\"ricardian_contract\",\"type\":\"string\"}]},{\"name\":\"table_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"name\"},{\"name\":\"index_type\",\"type\":\"string\"},{\"name\":\"key_names\",\"type\":\"string[]\"},{\"name\":\"key_types\",\"type\":\"string[]\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"clause_pair\",\"base\":\"\",\"fields\":[{\"name\":\"id\",\"type\":\"string\"},{\"name\":\"body\",\"type\":\"string\"}]},{\"name\":\"error_message\",\"base\":\"\",\"fields\":[{\"name\":\"error_code\",\"type\":\"uint64\"},{\"name\":\"error_msg\",\"type\":\"string\"}]},{\"name\":\"variant_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"types\",\"type\":\"string[]\"}]},{\"name\":\"abi_def\",\"base\":\"\",\"fields\":[{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"types\",\"type\":\"type_def[]\"},{\"name\":\"structs\",\"type\":\"struct_def[]\"},{\"name\":\"actions\",\"type\":\"action_def[]\"},{\"name\":\"tables\",\"type\":\"table_def[]\"},{\"name\":\"ricardian_clauses\",\"type\":\"clause_pair[]\"},{\"name\":\"error_messages\",\"type\":\"error_message[]\"},{\"name\":\"abi_extensions\",\"type\":\"extensions_entry[]\"},{\"name\":\"variants\",\"type\":\"variant_def[]$\"}]}]}");

/***/ }),

/***/ "lmaJ":
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.0\",\"types\":[{\"new_type_name\":\"account_name\",\"type\":\"name\"},{\"new_type_name\":\"action_name\",\"type\":\"name\"},{\"new_type_name\":\"permission_name\",\"type\":\"name\"}],\"structs\":[{\"name\":\"permission_level\",\"base\":\"\",\"fields\":[{\"name\":\"actor\",\"type\":\"account_name\"},{\"name\":\"permission\",\"type\":\"permission_name\"}]},{\"name\":\"action\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"name\",\"type\":\"action_name\"},{\"name\":\"authorization\",\"type\":\"permission_level[]\"},{\"name\":\"data\",\"type\":\"bytes\"}]},{\"name\":\"extension\",\"base\":\"\",\"fields\":[{\"name\":\"type\",\"type\":\"uint16\"},{\"name\":\"data\",\"type\":\"bytes\"}]},{\"name\":\"transaction_header\",\"base\":\"\",\"fields\":[{\"name\":\"expiration\",\"type\":\"time_point_sec\"},{\"name\":\"ref_block_num\",\"type\":\"uint16\"},{\"name\":\"ref_block_prefix\",\"type\":\"uint32\"},{\"name\":\"max_net_usage_words\",\"type\":\"varuint32\"},{\"name\":\"max_cpu_usage_ms\",\"type\":\"uint8\"},{\"name\":\"delay_sec\",\"type\":\"varuint32\"}]},{\"name\":\"transaction\",\"base\":\"transaction_header\",\"fields\":[{\"name\":\"context_free_actions\",\"type\":\"action[]\"},{\"name\":\"actions\",\"type\":\"action[]\"},{\"name\":\"transaction_extensions\",\"type\":\"extension[]\"}]}]}");

/***/ }),

/***/ "syPa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * @module JSON-RPC
 */
// copyright defined in eosjs/LICENSE.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_numeric_1 = __webpack_require__("atws");
var eosjs_rpcerror_1 = __webpack_require__("JdmY");
function arrayToHex(data) {
    var e_1, _a;
    var result = '';
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var x = data_1_1.value;
            result += ('00' + x.toString(16)).slice(-2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
/** Make RPC calls */
var JsonRpc = /** @class */ (function () {
    /**
     * @param args
     *    * `fetch`:
     *    * browsers: leave `null` or `undefined`
     *    * node: provide an implementation
     */
    function JsonRpc(endpoint, args) {
        if (args === void 0) { args = {}; }
        this.endpoint = endpoint;
        if (args.fetch) {
            this.fetchBuiltin = args.fetch;
        }
        else {
            this.fetchBuiltin = global.fetch;
        }
    }
    /** Post `body` to `endpoint + path`. Throws detailed error information in `RpcError` when available. */
    JsonRpc.prototype.fetch = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json, f, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        f = this.fetchBuiltin;
                        return [4 /*yield*/, f(this.endpoint + path, {
                                body: JSON.stringify(body),
                                method: 'POST',
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json.processed && json.processed.except) {
                            throw new eosjs_rpcerror_1.RpcError(json);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        e_2.isFetchError = true;
                        throw e_2;
                    case 4:
                        if (!response.ok) {
                            throw new eosjs_rpcerror_1.RpcError(json);
                        }
                        return [2 /*return*/, json];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_abi` */
    JsonRpc.prototype.get_abi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_abi', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_account` */
    JsonRpc.prototype.get_account = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_account', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_block_header_state` */
    JsonRpc.prototype.get_block_header_state = function (blockNumOrId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_block_header_state', { block_num_or_id: blockNumOrId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_block` */
    JsonRpc.prototype.get_block = function (blockNumOrId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_block', { block_num_or_id: blockNumOrId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_code` */
    JsonRpc.prototype.get_code = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_code', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_currency_balance` */
    JsonRpc.prototype.get_currency_balance = function (code, account, symbol) {
        if (symbol === void 0) { symbol = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_currency_balance', { code: code, account: account, symbol: symbol })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_currency_stats` */
    JsonRpc.prototype.get_currency_stats = function (code, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_currency_stats', { code: code, symbol: symbol })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_info` */
    JsonRpc.prototype.get_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_info', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_producer_schedule` */
    JsonRpc.prototype.get_producer_schedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_producer_schedule', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_producers` */
    JsonRpc.prototype.get_producers = function (json, lowerBound, limit) {
        if (json === void 0) { json = true; }
        if (lowerBound === void 0) { lowerBound = ''; }
        if (limit === void 0) { limit = 50; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_producers', { json: json, lower_bound: lowerBound, limit: limit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_raw_code_and_abi` */
    JsonRpc.prototype.get_raw_code_and_abi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_raw_code_and_abi', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** calls `/v1/chain/get_raw_code_and_abi` and pulls out unneeded raw wasm code */
    // TODO: use `/v1/chain/get_raw_abi` directly when it becomes available
    JsonRpc.prototype.getRawAbi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var rawCodeAndAbi, abi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_raw_code_and_abi(accountName)];
                    case 1:
                        rawCodeAndAbi = _a.sent();
                        abi = eosjs_numeric_1.base64ToBinary(rawCodeAndAbi.abi);
                        return [2 /*return*/, { accountName: rawCodeAndAbi.account_name, abi: abi }];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_table_rows` */
    JsonRpc.prototype.get_table_rows = function (_a) {
        var _b = _a.json, json = _b === void 0 ? true : _b, code = _a.code, scope = _a.scope, table = _a.table, _c = _a.table_key, table_key = _c === void 0 ? '' : _c, _d = _a.lower_bound, lower_bound = _d === void 0 ? '' : _d, _e = _a.upper_bound, upper_bound = _e === void 0 ? '' : _e, _f = _a.index_position, index_position = _f === void 0 ? 1 : _f, _g = _a.key_type, key_type = _g === void 0 ? '' : _g, _h = _a.limit, limit = _h === void 0 ? 10 : _h, _j = _a.reverse, reverse = _j === void 0 ? false : _j, _k = _a.show_payer, show_payer = _k === void 0 ? false : _k;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_table_rows', {
                            json: json,
                            code: code,
                            scope: scope,
                            table: table,
                            table_key: table_key,
                            lower_bound: lower_bound,
                            upper_bound: upper_bound,
                            index_position: index_position,
                            key_type: key_type,
                            limit: limit,
                            reverse: reverse,
                            show_payer: show_payer,
                        })];
                    case 1: return [2 /*return*/, _l.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_table_by_scope` */
    JsonRpc.prototype.get_table_by_scope = function (_a) {
        var code = _a.code, table = _a.table, _b = _a.lower_bound, lower_bound = _b === void 0 ? '' : _b, _c = _a.upper_bound, upper_bound = _c === void 0 ? '' : _c, _d = _a.limit, limit = _d === void 0 ? 10 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_table_by_scope', {
                            code: code,
                            table: table,
                            lower_bound: lower_bound,
                            upper_bound: upper_bound,
                            limit: limit,
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /** Get subset of `availableKeys` needed to meet authorities in `transaction`. Implements `AuthorityProvider` */
    JsonRpc.prototype.getRequiredKeys = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = eosjs_numeric_1.convertLegacyPublicKeys;
                        return [4 /*yield*/, this.fetch('/v1/chain/get_required_keys', {
                                transaction: args.transaction,
                                available_keys: args.availableKeys,
                            })];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).required_keys])];
                }
            });
        });
    };
    /** Push a serialized transaction */
    JsonRpc.prototype.push_transaction = function (_a) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/push_transaction', {
                            signatures: signatures,
                            compression: 0,
                            packed_context_free_data: '',
                            packed_trx: arrayToHex(serializedTransaction),
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/db_size/get` */
    JsonRpc.prototype.db_size_get = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.fetch('/v1/db_size/get', {})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); });
    };
    /** Raw call to `/v1/history/get_actions` */
    JsonRpc.prototype.history_get_actions = function (accountName, pos, offset) {
        if (pos === void 0) { pos = null; }
        if (offset === void 0) { offset = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_actions', { account_name: accountName, pos: pos, offset: offset })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_transaction` */
    JsonRpc.prototype.history_get_transaction = function (id, blockNumHint) {
        if (blockNumHint === void 0) { blockNumHint = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_transaction', { id: id, block_num_hint: blockNumHint })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_key_accounts` */
    JsonRpc.prototype.history_get_key_accounts = function (publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_key_accounts', { public_key: publicKey })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_controlled_accounts` */
    JsonRpc.prototype.history_get_controlled_accounts = function (controllingAccount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_controlled_accounts', { controlling_account: controllingAccount })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JsonRpc;
}()); // JsonRpc
exports.JsonRpc = JsonRpc;
//# sourceMappingURL=eosjs-jsonrpc.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "wHkc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Serialize
 */
// copyright defined in eosjs/LICENSE.txt
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var numeric = __webpack_require__("atws");
/** State for serialize() and deserialize() */
var SerializerState = /** @class */ (function () {
    function SerializerState(options) {
        if (options === void 0) { options = {}; }
        /** Have any binary extensions been skipped? */
        this.skippedBinaryExtension = false;
        this.options = options;
    }
    return SerializerState;
}());
exports.SerializerState = SerializerState;
/** Serialize and deserialize data */
var SerialBuffer = /** @class */ (function () {
    /**
     * @param __namedParameters
     *    * `array`: `null` if serializing, or binary data to deserialize
     *    * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     *    * `textDecoder`: `TextDecider` instance to use. Pass in `null` if running in a browser
     */
    function SerialBuffer(_a) {
        var _b = _a === void 0 ? {} : _a, textEncoder = _b.textEncoder, textDecoder = _b.textDecoder, array = _b.array;
        /** Current position while reading (deserializing) */
        this.readPos = 0;
        this.array = array || new Uint8Array(1024);
        this.length = array ? array.length : 0;
        this.textEncoder = textEncoder || new TextEncoder();
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    /** Resize `array` if needed to have at least `size` bytes free */
    SerialBuffer.prototype.reserve = function (size) {
        if (this.length + size <= this.array.length) {
            return;
        }
        var l = this.array.length;
        while (this.length + size > l) {
            l = Math.ceil(l * 1.5);
        }
        var newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    };
    /** Is there data available to read? */
    SerialBuffer.prototype.haveReadData = function () {
        return this.readPos < this.length;
    };
    /** Restart reading from the beginning */
    SerialBuffer.prototype.restartRead = function () {
        this.readPos = 0;
    };
    /** Return data with excess storage trimmed away */
    SerialBuffer.prototype.asUint8Array = function () {
        return new Uint8Array(this.array.buffer, this.array.byteOffset, this.length);
    };
    /** Append bytes */
    SerialBuffer.prototype.pushArray = function (v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    };
    /** Append bytes */
    SerialBuffer.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.pushArray(v);
    };
    /** Get a single byte */
    SerialBuffer.prototype.get = function () {
        if (this.readPos < this.length) {
            return this.array[this.readPos++];
        }
        throw new Error('Read past end of buffer');
    };
    /** Append bytes in `v`. Throws if `len` doesn't match `v.length` */
    SerialBuffer.prototype.pushUint8ArrayChecked = function (v, len) {
        if (v.length !== len) {
            throw new Error('Binary data has incorrect size');
        }
        this.pushArray(v);
    };
    /** Get `len` bytes */
    SerialBuffer.prototype.getUint8Array = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        var result = new Uint8Array(this.array.buffer, this.array.byteOffset + this.readPos, len);
        this.readPos += len;
        return result;
    };
    /** Append a `uint16` */
    SerialBuffer.prototype.pushUint16 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    };
    /** Get a `uint16` */
    SerialBuffer.prototype.getUint16 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    };
    /** Append a `uint32` */
    SerialBuffer.prototype.pushUint32 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    };
    /** Get a `uint32` */
    SerialBuffer.prototype.getUint32 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    };
    /** Append a `uint64`. *Caution*: `number` only has 53 bits of precision */
    SerialBuffer.prototype.pushNumberAsUint64 = function (v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    };
    /**
     * Get a `uint64` as a `number`. *Caution*: `number` only has 53 bits of precision; some values will change.
     * `numeric.binaryToDecimal(serialBuffer.getUint8Array(8))` recommended instead
     */
    SerialBuffer.prototype.getUint64AsNumber = function () {
        var low = this.getUint32();
        var high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    };
    /** Append a `varuint32` */
    SerialBuffer.prototype.pushVaruint32 = function (v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    };
    /** Get a `varuint32` */
    SerialBuffer.prototype.getVaruint32 = function () {
        var v = 0;
        var bit = 0;
        while (true) {
            var b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80)) {
                break;
            }
        }
        return v >>> 0;
    };
    /** Append a `varint32` */
    SerialBuffer.prototype.pushVarint32 = function (v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    };
    /** Get a `varint32` */
    SerialBuffer.prototype.getVarint32 = function () {
        var v = this.getVaruint32();
        if (v & 1) {
            return ((~v) >> 1) | 2147483648;
        }
        else {
            return v >>> 1;
        }
    };
    /** Append a `float32` */
    SerialBuffer.prototype.pushFloat32 = function (v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    };
    /** Get a `float32` */
    SerialBuffer.prototype.getFloat32 = function () {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    };
    /** Append a `float64` */
    SerialBuffer.prototype.pushFloat64 = function (v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    };
    /** Get a `float64` */
    SerialBuffer.prototype.getFloat64 = function () {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    };
    /** Append a `name` */
    SerialBuffer.prototype.pushName = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing name');
        }
        function charToSymbol(c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
                return (c - 'a'.charCodeAt(0)) + 6;
            }
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
                return (c - '1'.charCodeAt(0)) + 1;
            }
            return 0;
        }
        var a = new Uint8Array(8);
        var bit = 63;
        for (var i = 0; i < s.length; ++i) {
            var c = charToSymbol(s.charCodeAt(i));
            if (bit < 5) {
                c = c << 1;
            }
            for (var j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    };
    /** Get a `name` */
    SerialBuffer.prototype.getName = function () {
        var a = this.getUint8Array(8);
        var result = '';
        for (var bit = 63; bit >= 0;) {
            var c = 0;
            for (var i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6) {
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            }
            else if (c >= 1) {
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            }
            else {
                result += '.';
            }
        }
        while (result.endsWith('.')) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    };
    /** Append length-prefixed binary data */
    SerialBuffer.prototype.pushBytes = function (v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    };
    /** Get length-prefixed binary data */
    SerialBuffer.prototype.getBytes = function () {
        return this.getUint8Array(this.getVaruint32());
    };
    /** Append a string */
    SerialBuffer.prototype.pushString = function (v) {
        this.pushBytes(this.textEncoder.encode(v));
    };
    /** Get a string */
    SerialBuffer.prototype.getString = function () {
        return this.textDecoder.decode(this.getBytes());
    };
    /** Append a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.pushSymbolCode = function (name) {
        if (typeof name !== 'string') {
            throw new Error('Expected string containing symbol_code');
        }
        var a = [];
        a.push.apply(a, __spread(this.textEncoder.encode(name)));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.getSymbolCode = function () {
        var a = this.getUint8Array(8);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    };
    /** Append a `symbol` */
    SerialBuffer.prototype.pushSymbol = function (_a) {
        var name = _a.name, precision = _a.precision;
        var a = [precision & 0xff];
        a.push.apply(a, __spread(this.textEncoder.encode(name)));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol` */
    SerialBuffer.prototype.getSymbol = function () {
        var precision = this.get();
        var a = this.getUint8Array(7);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name: name, precision: precision };
    };
    /** Append an asset */
    SerialBuffer.prototype.pushAsset = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing asset');
        }
        s = s.trim();
        var pos = 0;
        var amount = '';
        var precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        var foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit) {
            throw new Error('Asset must begin with a number');
        }
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        var name = s.substr(pos).trim();
        this.pushArray(numeric.signedDecimalToBinary(8, amount));
        this.pushSymbol({ name: name, precision: precision });
    };
    /** Get an asset */
    SerialBuffer.prototype.getAsset = function () {
        var amount = this.getUint8Array(8);
        var _a = this.getSymbol(), name = _a.name, precision = _a.precision;
        var s = numeric.signedBinaryToDecimal(amount, precision + 1);
        if (precision) {
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        }
        return s + ' ' + name;
    };
    /** Append a public key */
    SerialBuffer.prototype.pushPublicKey = function (s) {
        var key = numeric.stringToPublicKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a public key */
    SerialBuffer.prototype.getPublicKey = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.publicKeyDataSize);
        return numeric.publicKeyToString({ type: type, data: data });
    };
    /** Append a private key */
    SerialBuffer.prototype.pushPrivateKey = function (s) {
        var key = numeric.stringToPrivateKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a private key */
    SerialBuffer.prototype.getPrivateKey = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.privateKeyDataSize);
        return numeric.privateKeyToString({ type: type, data: data });
    };
    /** Append a signature */
    SerialBuffer.prototype.pushSignature = function (s) {
        var key = numeric.stringToSignature(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a signature */
    SerialBuffer.prototype.getSignature = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.signatureDataSize);
        return numeric.signatureToString({ type: type, data: data });
    };
    return SerialBuffer;
}()); // SerialBuffer
exports.SerialBuffer = SerialBuffer;
/** Is this a supported ABI version? */
function supportedAbiVersion(version) {
    return version.startsWith('eosio::abi/1.');
}
exports.supportedAbiVersion = supportedAbiVersion;
function checkDateParse(date) {
    var result = Date.parse(date);
    if (Number.isNaN(result)) {
        throw new Error('Invalid time format');
    }
    return result;
}
/** Convert date in ISO format to `time_point` (miliseconds since epoch) */
function dateToTimePoint(date) {
    return Math.round(checkDateParse(date + 'Z') * 1000);
}
exports.dateToTimePoint = dateToTimePoint;
/** Convert `time_point` (miliseconds since epoch) to date in ISO format */
function timePointToDate(us) {
    var s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
exports.timePointToDate = timePointToDate;
/** Convert date in ISO format to `time_point_sec` (seconds since epoch) */
function dateToTimePointSec(date) {
    return Math.round(checkDateParse(date + 'Z') / 1000);
}
exports.dateToTimePointSec = dateToTimePointSec;
/** Convert `time_point_sec` (seconds since epoch) to to date in ISO format */
function timePointSecToDate(sec) {
    var s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
exports.timePointSecToDate = timePointSecToDate;
/** Convert date in ISO format to `block_timestamp_type` (half-seconds since a different epoch) */
function dateToBlockTimestamp(date) {
    return Math.round((checkDateParse(date + 'Z') - 946684800000) / 500);
}
exports.dateToBlockTimestamp = dateToBlockTimestamp;
/** Convert `block_timestamp_type` (half-seconds since a different epoch) to to date in ISO format */
function blockTimestampToDate(slot) {
    var s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
}
exports.blockTimestampToDate = blockTimestampToDate;
/** Convert `string` to `Symbol`. format: `precision,NAME`. */
function stringToSymbol(s) {
    if (typeof s !== 'string') {
        throw new Error('Expected string containing symbol');
    }
    var m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m) {
        throw new Error('Invalid symbol');
    }
    return { name: m[2], precision: +m[1] };
}
exports.stringToSymbol = stringToSymbol;
/** Convert `Symbol` to `string`. format: `precision,NAME`. */
function symbolToString(_a) {
    var name = _a.name, precision = _a.precision;
    return precision + ',' + name;
}
exports.symbolToString = symbolToString;
/** Convert binary data to hex */
function arrayToHex(data) {
    var e_1, _a;
    var result = '';
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var x = data_1_1.value;
            result += ('00' + x.toString(16)).slice(-2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result.toUpperCase();
}
exports.arrayToHex = arrayToHex;
/** Convert hex to binary data */
function hexToUint8Array(hex) {
    if (typeof hex !== 'string') {
        throw new Error('Expected string containing hex digits');
    }
    if (hex.length % 2) {
        throw new Error('Odd number of hex digits');
    }
    var l = hex.length / 2;
    var result = new Uint8Array(l);
    for (var i = 0; i < l; ++i) {
        var x = parseInt(hex.substr(i * 2, 2), 16);
        if (Number.isNaN(x)) {
            throw new Error('Expected hex string');
        }
        result[i] = x;
    }
    return result;
}
exports.hexToUint8Array = hexToUint8Array;
function serializeUnknown(buffer, data) {
    throw new Error('Don\'t know how to serialize ' + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error('Don\'t know how to deserialize ' + this.name);
}
function serializeStruct(buffer, data, state, allowExtensions) {
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    var e_2, _a;
    if (typeof data !== 'object') {
        throw new Error('expected object containing data: ' + JSON.stringify(data));
    }
    if (this.base) {
        this.base.serialize(buffer, data, state, allowExtensions);
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (field.name in data) {
                if (state.skippedBinaryExtension) {
                    throw new Error('unexpected ' + this.name + '.' + field.name);
                }
                field.type.serialize(buffer, data[field.name], state, allowExtensions && field === this.fields[this.fields.length - 1]);
            }
            else {
                if (allowExtensions && field.type.extensionOf) {
                    state.skippedBinaryExtension = true;
                }
                else {
                    throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function deserializeStruct(buffer, state, allowExtensions) {
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    var e_3, _a;
    var result;
    if (this.base) {
        result = this.base.deserialize(buffer, state, allowExtensions);
    }
    else {
        result = {};
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (allowExtensions && field.type.extensionOf && !buffer.haveReadData()) {
                state.skippedBinaryExtension = true;
            }
            else {
                result[field.name] = field.type.deserialize(buffer, state, allowExtensions);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
function serializeVariant(buffer, data, state, allowExtensions) {
    if (!Array.isArray(data) || data.length !== 2 || typeof data[0] !== 'string') {
        throw new Error('expected variant: ["type", value]');
    }
    var i = this.fields.findIndex(function (field) { return field.name === data[0]; });
    if (i < 0) {
        throw new Error("type \"" + data[0] + "\" is not valid for variant");
    }
    buffer.pushVaruint32(i);
    this.fields[i].type.serialize(buffer, data[1], state, allowExtensions);
}
function deserializeVariant(buffer, state, allowExtensions) {
    var i = buffer.getVaruint32();
    if (i >= this.fields.length) {
        throw new Error("type index " + i + " is not valid for variant");
    }
    var field = this.fields[i];
    return [field.name, field.type.deserialize(buffer, state, allowExtensions)];
}
function serializeArray(buffer, data, state, allowExtensions) {
    var e_4, _a;
    buffer.pushVaruint32(data.length);
    try {
        for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
            var item = data_2_1.value;
            this.arrayOf.serialize(buffer, item, state, false);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function deserializeArray(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push(this.arrayOf.deserialize(buffer, state, false));
    }
    return result;
}
function serializeOptional(buffer, data, state, allowExtensions) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data, state, allowExtensions);
    }
}
function deserializeOptional(buffer, state, allowExtensions) {
    if (buffer.get()) {
        return this.optionalOf.deserialize(buffer, state, allowExtensions);
    }
    else {
        return null;
    }
}
function serializeExtension(buffer, data, state, allowExtensions) {
    this.extensionOf.serialize(buffer, data, state, allowExtensions);
}
function deserializeExtension(buffer, state, allowExtensions) {
    return this.extensionOf.deserialize(buffer, state, allowExtensions);
}
function createType(attrs) {
    return __assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, extensionOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
}
function checkRange(orig, converted) {
    if (Number.isNaN(+orig) || Number.isNaN(+converted) || (typeof orig !== 'number' && typeof orig !== 'string')) {
        throw new Error('Expected number');
    }
    if (+orig !== +converted) {
        throw new Error('Number is out of range');
    }
    return +orig;
}
/** Create the set of types built-in to the abi format */
function createInitialTypes() {
    var result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize: function (buffer, data) {
                if (typeof data !== 'boolean') {
                    throw new Error('Expected true or false');
                }
                buffer.push(data ? 1 : 0);
            },
            deserialize: function (buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data & 0xff)); },
            deserialize: function (buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data << 24 >> 24)); },
            deserialize: function (buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data & 0xffff)); },
            deserialize: function (buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data << 16 >> 16)); },
            deserialize: function (buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.decimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize: function (buffer, data) { buffer.pushVaruint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize: function (buffer, data) { buffer.pushVarint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize: function (buffer, data) { buffer.pushArray(numeric.decimalToBinary(16, '' + data)); },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(16, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize: function (buffer, data) { buffer.pushFloat32(data); },
            deserialize: function (buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize: function (buffer, data) { buffer.pushFloat64(data); },
            deserialize: function (buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 16); },
            deserialize: function (buffer) { return arrayToHex(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize: function (buffer, data) {
                if (data instanceof Uint8Array || Array.isArray(data)) {
                    buffer.pushBytes(data);
                }
                else {
                    buffer.pushBytes(hexToUint8Array(data));
                }
            },
            deserialize: function (buffer, state) {
                if (state && state.options.bytesAsUint8Array) {
                    return buffer.getBytes();
                }
                else {
                    return arrayToHex(buffer.getBytes());
                }
            },
        }),
        string: createType({
            name: 'string',
            serialize: function (buffer, data) { buffer.pushString(data); },
            deserialize: function (buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize: function (buffer, data) { buffer.pushName(data); },
            deserialize: function (buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize: function (buffer, data) { buffer.pushNumberAsUint64(dateToTimePoint(data)); },
            deserialize: function (buffer) { return timePointToDate(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize: function (buffer, data) { buffer.pushUint32(dateToTimePointSec(data)); },
            deserialize: function (buffer) { return timePointSecToDate(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize: function (buffer, data) { buffer.pushUint32(dateToBlockTimestamp(data)); },
            deserialize: function (buffer) { return blockTimestampToDate(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize: function (buffer, data) { buffer.pushSymbolCode(data); },
            deserialize: function (buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize: function (buffer, data) { buffer.pushSymbol(stringToSymbol(data)); },
            deserialize: function (buffer) { return symbolToString(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize: function (buffer, data) { buffer.pushAsset(data); },
            deserialize: function (buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 20); },
            deserialize: function (buffer) { return arrayToHex(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 32); },
            deserialize: function (buffer) { return arrayToHex(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 64); },
            deserialize: function (buffer) { return arrayToHex(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize: function (buffer, data) { buffer.pushPublicKey(data); },
            deserialize: function (buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize: function (buffer, data) { buffer.pushPrivateKey(data); },
            deserialize: function (buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize: function (buffer, data) { buffer.pushSignature(data); },
            deserialize: function (buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
} // createInitialTypes()
exports.createInitialTypes = createInitialTypes;
/** Get type from `types` */
function getType(types, name) {
    var type = types.get(name);
    if (type && type.aliasOfName) {
        return getType(types, type.aliasOfName);
    }
    if (type) {
        return type;
    }
    if (name.endsWith('[]')) {
        return createType({
            name: name,
            arrayOf: getType(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name: name,
            optionalOf: getType(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    if (name.endsWith('$')) {
        return createType({
            name: name,
            extensionOf: getType(types, name.substr(0, name.length - 1)),
            serialize: serializeExtension,
            deserialize: deserializeExtension,
        });
    }
    throw new Error('Unknown type: ' + name);
}
exports.getType = getType;
/**
 * Get types from abi
 * @param initialTypes Set of types to build on.
 *     In most cases, it's best to fill this from a fresh call to `getTypesFromAbi()`.
 */
function getTypesFromAbi(initialTypes, abi) {
    var e_5, _a, e_6, _b, e_7, _c, e_8, _d, e_9, _e;
    var types = new Map(initialTypes);
    if (abi.types) {
        try {
            for (var _f = __values(abi.types), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = _g.value, new_type_name = _h.new_type_name, type = _h.type;
                types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type }));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    if (abi.structs) {
        try {
            for (var _j = __values(abi.structs), _k = _j.next(); !_k.done; _k = _j.next()) {
                var _l = _k.value, name_1 = _l.name, base = _l.base, fields = _l.fields;
                types.set(name_1, createType({
                    name: name_1,
                    baseName: base,
                    fields: fields.map(function (_a) {
                        var n = _a.name, type = _a.type;
                        return ({ name: n, typeName: type, type: null });
                    }),
                    serialize: serializeStruct,
                    deserialize: deserializeStruct,
                }));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
    if (abi.variants) {
        try {
            for (var _m = __values(abi.variants), _o = _m.next(); !_o.done; _o = _m.next()) {
                var _p = _o.value, name_2 = _p.name, t = _p.types;
                types.set(name_2, createType({
                    name: name_2,
                    fields: t.map(function (s) { return ({ name: s, typeName: s, type: null }); }),
                    serialize: serializeVariant,
                    deserialize: deserializeVariant,
                }));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_7) throw e_7.error; }
        }
    }
    try {
        for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
            var _q = __read(types_1_1.value, 2), name_3 = _q[0], type = _q[1];
            if (type.baseName) {
                type.base = getType(types, type.baseName);
            }
            try {
                for (var _r = __values(type.fields), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var field = _s.value;
                    field.type = getType(types, field.typeName);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (types_1_1 && !types_1_1.done && (_d = types_1.return)) _d.call(types_1);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return types;
} // getTypesFromAbi
exports.getTypesFromAbi = getTypesFromAbi;
/** TAPoS: Return transaction fields which reference `refBlock` and expire `expireSeconds` after `refBlock.timestamp` */
function transactionHeader(refBlock, expireSeconds) {
    return {
        expiration: timePointSecToDate(dateToTimePointSec(refBlock.timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num & 0xffff,
        ref_block_prefix: refBlock.ref_block_prefix,
    };
}
exports.transactionHeader = transactionHeader;
/** Convert action data to serialized form (hex) */
function serializeActionData(contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (!action) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textEncoder: textEncoder, textDecoder: textDecoder });
    action.serialize(buffer, data);
    return arrayToHex(buffer.asUint8Array());
}
exports.serializeActionData = serializeActionData;
/** Return action in serialized form */
function serializeAction(contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: serializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
}
exports.serializeAction = serializeAction;
/** Deserialize action data. If `data` is a `string`, then it's assumed to be in hex. */
function deserializeActionData(contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (typeof data === 'string') {
        data = hexToUint8Array(data);
    }
    if (!action) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textDecoder: textDecoder, textEncoder: textEncoder });
    buffer.pushArray(data);
    return action.deserialize(buffer);
}
exports.deserializeActionData = deserializeActionData;
/** Deserialize action. If `data` is a `string`, then it's assumed to be in hex. */
function deserializeAction(contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: deserializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
}
exports.deserializeAction = deserializeAction;
//# sourceMappingURL=eosjs-serialize.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZW9zaW8vZW9zaW8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2Vvc2lvL25vZGVfbW9kdWxlcy9lb3Nqcy9kaXN0L2Vvc2pzLWFwaS1pbnRlcmZhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9lb3Npby9ub2RlX21vZHVsZXMvZW9zanMvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZW9zaW8vbm9kZV9tb2R1bGVzL2Vvc2pzL2Rpc3QvZW9zanMtcnBjZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2Vvc2lvL25vZGVfbW9kdWxlcy9lb3Nqcy9kaXN0L2Vvc2pzLXJwYy1pbnRlcmZhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9lb3Npby9ub2RlX21vZHVsZXMvZW9zanMvZGlzdC9lb3Nqcy1hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2Vvc2lvL25vZGVfbW9kdWxlcy9lb3Nqcy9kaXN0L2Vvc2pzLW51bWVyaWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2Vvc2lvL25vZGVfbW9kdWxlcy9lb3Nqcy9kaXN0L3JpcGVtZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZW9zaW8vbm9kZV9tb2R1bGVzL2Vvc2pzL2Rpc3QvZW9zanMtanNvbnJwYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svZW9zaW8vbm9kZV9tb2R1bGVzL2Vvc2pzL2Rpc3QvZW9zanMtc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUFh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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFFBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEM7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJB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O0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxVQUFVO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFFBQVEsZ0JBQWdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBCQUEwQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUSxnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscURBQXFEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscURBQXFEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQyIsImZpbGUiOiJ2ZW5kb3J+YTRmYzg3ZGIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBleHBvcnRzLmVvc2pzVXRpbCA9IGV4cG9ydHMuZW5jb2Rlck9wdGlvbnMgPSBleHBvcnRzLlRleHREZWNvZGVyID0gZXhwb3J0cy5UZXh0RW5jb2RlciA9IHZvaWQgMDtcblxudmFyIF9zbGljZWRUb0FycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9QbHVnaW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9wbHVnaW5zL1BsdWdpblwiKSk7XG5cbnZhciBQbHVnaW5UeXBlcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3BsdWdpbnMvUGx1Z2luVHlwZXNcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX05ldHdvcmsgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCIpKTtcblxudmFyIF9BY2NvdW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQWNjb3VudFwiKSk7XG5cbnZhciBfS2V5UGFpclNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9LZXlQYWlyU2VydmljZVwiKSk7XG5cbnZhciBfT2JqZWN0SGVscGVycyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvdXRpbC9PYmplY3RIZWxwZXJzXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvYXBpL0FwaUFjdGlvbnNcIikpO1xuXG52YXIgU3RvcmVBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1Rva2VuXCIpKTtcblxudmFyIF9BY2NvdW50QWN0aW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQWNjb3VudEFjdGlvblwiKSk7XG5cbnZhciBfQWNjb3VudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2Jsb2NrY2hhaW4vQWNjb3VudFNlcnZpY2VcIikpO1xuXG52YXIgX0hpc3RvcmljQWN0aW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvaGlzdG9yaWVzL0hpc3RvcmljQWN0aW9uXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9FdmVudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvRXZlbnRTZXJ2aWNlXCIpKTtcblxudmFyIF9TaWduaW5nU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL1NpZ25pbmdTZXJ2aWNlXCIpKTtcblxudmFyIF9CYWNrZW5kQXBpU2VydmljZSA9IHJlcXVpcmUoXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvQmFja2VuZEFwaVNlcnZpY2VcIik7XG5cbnZhciBfZW9zanNFY2MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJlb3Nqcy1lY2NcIikpO1xuXG52YXIgX2Vvc2pzID0gcmVxdWlyZShcImVvc2pzXCIpO1xuXG52YXIgbnVtZXJpYyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJlb3Nqcy9kaXN0L2Vvc2pzLW51bWVyaWNcIikpO1xuXG52YXIgVGV4dEVuY29kZXIgPSByZXF1aXJlKCd1dGlsJykgPyByZXF1aXJlKCd1dGlsJykuVGV4dEVuY29kZXIgOiByZXF1aXJlKCd0ZXh0LWVuY29kaW5nJykgPyByZXF1aXJlKCd0ZXh0LWVuY29kaW5nJykuVGV4dEVuY29kZXIgOiBnbG9iYWwuVGV4dEVuY29kZXI7XG5leHBvcnRzLlRleHRFbmNvZGVyID0gVGV4dEVuY29kZXI7XG52YXIgVGV4dERlY29kZXIgPSByZXF1aXJlKCd1dGlsJykgPyByZXF1aXJlKCd1dGlsJykuVGV4dERlY29kZXIgOiByZXF1aXJlKCd0ZXh0LWVuY29kaW5nJykgPyByZXF1aXJlKCd0ZXh0LWVuY29kaW5nJykuVGV4dERlY29kZXIgOiBnbG9iYWwuVGV4dERlY29kZXI7XG5leHBvcnRzLlRleHREZWNvZGVyID0gVGV4dERlY29kZXI7XG52YXIgZW5jb2Rlck9wdGlvbnMgPSBUZXh0RW5jb2RlciA/IHtcbiAgdGV4dEVuY29kZXI6IG5ldyBUZXh0RW5jb2RlcigpLFxuICB0ZXh0RGVjb2RlcjogbmV3IFRleHREZWNvZGVyKClcbn0gOiB7fTtcbmV4cG9ydHMuZW5jb2Rlck9wdGlvbnMgPSBlbmNvZGVyT3B0aW9ucztcblxudmFyIGdldEVvc2pzQXBpID0gZnVuY3Rpb24gZ2V0RW9zanNBcGkocnBjKSB7XG4gIHZhciBwYXJhbXMgPSBycGMgPyB7XG4gICAgcnBjOiBycGNcbiAgfSA6IHt9O1xuICBpZiAoVGV4dEVuY29kZXIpIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCBlbmNvZGVyT3B0aW9ucyk7XG4gIHJldHVybiBuZXcgX2Vvc2pzLkFwaShwYXJhbXMpO1xufTtcblxudmFyIGVvc2pzVXRpbCA9IGdldEVvc2pzQXBpKCk7XG5leHBvcnRzLmVvc2pzVXRpbCA9IGVvc2pzVXRpbDtcbnZhciBBQ0NPVU5UX0FORF9UT0tFTl9BUElfVVJMID0gJ2h0dHBzOi8vYXBpLmxpZ2h0Lnhlb3MubWUvYXBpJztcbnZhciBNQUlOTkVUX0NIQUlOX0lEID0gJ2FjYTM3NmYyMDZiOGZjMjVhNmVkNDRkYmRjNjY1NDdjMzZjNmMzM2UzYTExOWZmYmVhZWY5NDM2NDJmMGU5MDYnO1xuXG52YXIgZmV0Y2hQb3N0UGFyYW1zID0gZnVuY3Rpb24gZmV0Y2hQb3N0UGFyYW1zKHBhcmFtcykge1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICB9O1xufTtcblxudmFyIGdldFRhYmxlUm93cyA9IGZ1bmN0aW9uIGdldFRhYmxlUm93cyhuZXR3b3JrLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZldGNoKFwiXCIuY29uY2F0KG5ldHdvcmsuZnVsbGhvc3QoKSwgXCIvdjEvY2hhaW4vZ2V0X3RhYmxlX3Jvd3NcIiksIGZldGNoUG9zdFBhcmFtcyhwYXJhbXMpKS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHguanNvbigpO1xuICB9KTtcbn07XG5cbnZhciBnZXRDaGFpbkRhdGEgPSBmdW5jdGlvbiBnZXRDaGFpbkRhdGEobmV0d29yaywgcm91dGUsIHBhcmFtcykge1xuICByZXR1cm4gZmV0Y2goXCJcIi5jb25jYXQobmV0d29yay5mdWxsaG9zdCgpLCBcIi92MS9jaGFpbi9cIikuY29uY2F0KHJvdXRlKSwgZmV0Y2hQb3N0UGFyYW1zKHBhcmFtcykpLnRoZW4oZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geC5qc29uKCk7XG4gIH0pO1xufTtcblxudmFyIGdldEhpc3RvcnlEYXRhID0gZnVuY3Rpb24gZ2V0SGlzdG9yeURhdGEobmV0d29yaywgcm91dGUsIHBhcmFtcykge1xuICByZXR1cm4gZmV0Y2goXCJcIi5jb25jYXQobmV0d29yay5mdWxsaG9zdCgpLCBcIi92MS9oaXN0b3J5L1wiKS5jb25jYXQocm91dGUpLCBmZXRjaFBvc3RQYXJhbXMocGFyYW1zKSkudGhlbihmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4Lmpzb24oKTtcbiAgfSk7XG59O1xuXG52YXIgRW9zVG9rZW5BY2NvdW50QVBJID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW9zVG9rZW5BY2NvdW50QVBJKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgRW9zVG9rZW5BY2NvdW50QVBJKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoRW9zVG9rZW5BY2NvdW50QVBJLCBudWxsLCBbe1xuICAgIGtleTogXCJnZXRBY2NvdW50c0Zyb21QdWJsaWNLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRBY2NvdW50c0Zyb21QdWJsaWNLZXkgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShwdWJsaWNLZXkpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgICAgIH0pLCBmZXRjaChcIlwiLmNvbmNhdChBQ0NPVU5UX0FORF9UT0tFTl9BUElfVVJMLCBcIi9rZXkvXCIpLmNvbmNhdChwdWJsaWNLZXkpKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci5qc29uKCk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJlcy5lb3MpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgdmFyIHJhd0FjY291bnRzID0gcmVzLmVvcy5hY2NvdW50cztcbiAgICAgICAgICAgICAgICAgIHZhciBhY2NvdW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmF3QWNjb3VudHMpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByYXdBY2NvdW50c1tuYW1lXS5maWx0ZXIoZnVuY3Rpb24gKGFjYykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2MuYXV0aC5rZXlzLnNvbWUoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwdWJrZXkgPSBfcmVmLnB1YmtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwdWJrZXkgPT09IHB1YmxpY0tleTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uIChhY2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JpdHk6IGFjYy5wZXJtXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnInLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfSldKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBfY29udGV4dC5zZW50KTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldEFjY291bnRzRnJvbVB1YmxpY0tleShfeCkge1xuICAgICAgICByZXR1cm4gX2dldEFjY291bnRzRnJvbVB1YmxpY0tleS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0QWNjb3VudHNGcm9tUHVibGljS2V5O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImdldEFsbFRva2Vuc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldEFsbFRva2VucyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMihhY2NvdW50KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgICAgIH0pLCBmZXRjaChcIlwiLmNvbmNhdChBQ0NPVU5UX0FORF9UT0tFTl9BUElfVVJMLCBcIi9hY2NvdW50L2Vvcy9cIikuY29uY2F0KGFjY291bnQuc2VuZGFibGUoKSkpLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuYmFsYW5jZXMubWFwKGZ1bmN0aW9uIChiYWxhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfVG9rZW5bXCJkZWZhdWx0XCJdLmZyb21Kc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICBibG9ja2NoYWluOiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuRU9TSU8sXG4gICAgICAgICAgICAgICAgICAgICAgY29udHJhY3Q6IGJhbGFuY2UuY29udHJhY3QsXG4gICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBiYWxhbmNlLmN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGJhbGFuY2UuY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBiYWxhbmNlLmFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogYmFsYW5jZS5kZWNpbWFscyxcbiAgICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiBhY2NvdW50Lm5ldHdvcmsoKS5jaGFpbklkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9KV0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDIuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldEFsbFRva2VucyhfeDIpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRBbGxUb2tlbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEFsbFRva2VucztcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gRW9zVG9rZW5BY2NvdW50QVBJO1xufSgpO1xuXG52YXIgZ2V0QWNjb3VudHNGcm9tUHVibGljS2V5ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAvKiNfX1BVUkVfXyovXG4gIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNShwdWJsaWNLZXksIG5ldHdvcmspIHtcbiAgICB2YXIgZmFsbGJhY2tUb0NoYWluLFxuICAgICAgICBhY2NvdW50c0Zyb21BcGksXG4gICAgICAgIF9hcmdzNSA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU1JChfY29udGV4dDUpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGZhbGxiYWNrVG9DaGFpbiA9IF9hcmdzNS5sZW5ndGggPiAyICYmIF9hcmdzNVsyXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M1WzJdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghKG5ldHdvcmsuY2hhaW5JZCA9PT0gTUFJTk5FVF9DSEFJTl9JRCAmJiAhZmFsbGJhY2tUb0NoYWluKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDEwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA0O1xuICAgICAgICAgICAgcmV0dXJuIEVvc1Rva2VuQWNjb3VudEFQSS5nZXRBY2NvdW50c0Zyb21QdWJsaWNLZXkocHVibGljS2V5KTtcblxuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIGFjY291bnRzRnJvbUFwaSA9IF9jb250ZXh0NS5zZW50O1xuXG4gICAgICAgICAgICBpZiAoYWNjb3VudHNGcm9tQXBpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIGdldEFjY291bnRzRnJvbVB1YmxpY0tleShwdWJsaWNLZXksIG5ldHdvcmssIHRydWUpKTtcblxuICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIGFjY291bnRzRnJvbUFwaSk7XG5cbiAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICB9LCAyMDAwMCk7XG4gICAgICAgICAgICB9KSwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmMyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NC5wcmV2ID0gX2NvbnRleHQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRIaXN0b3J5RGF0YShuZXR3b3JrLCAnZ2V0X2tleV9hY2NvdW50cycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljX2tleTogcHVibGljS2V5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5oYXNPd25Qcm9wZXJ0eSgnYWNjb3VudF9uYW1lcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnRfbmFtZXMgPSByZXMuYWNjb3VudF9uYW1lcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoYWNjb3VudF9uYW1lcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldENoYWluRGF0YShuZXR3b3JrLCAnZ2V0X2FjY291bnQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudF9uYW1lOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfY29udGV4dDMuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSkpLnRoZW4oZnVuY3Rpb24gKG11bHRpcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlyZXMubWFwKGZ1bmN0aW9uIChhY2NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50LnBlcm1pc3Npb25zLm1hcChmdW5jdGlvbiAocGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFwZXJtLnJlcXVpcmVkX2F1dGgua2V5cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgua2V5ID09PSBwdWJsaWNLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhY2NvdW50LmFjY291bnRfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml0eTogcGVybS5wZXJtX25hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhY2NvdW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU0KTtcbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g1LCBfeDYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKSldKSk7XG5cbiAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZTUpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGdldEFjY291bnRzRnJvbVB1YmxpY0tleShfeDMsIF94NCkge1xuICAgIHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG52YXIgcG9wdXBFcnJvciA9IGZ1bmN0aW9uIHBvcHVwRXJyb3IocmVzdWx0KSB7XG4gIHZhciBlcnJvcjtcblxuICB0cnkge1xuICAgIGVycm9yID0gSlNPTi5wYXJzZShlcnJvcikuZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSByZXN1bHQ7XG4gIH1cblxuICBpZiAoZXJyb3IgJiYgZXJyb3IudG9TdHJpbmcoKS5pbmRleE9mKCdhc3NlcnRpb24gZmFpbHVyZSB3aXRoIG1lc3NhZ2UnKSA+IC0xKSB7XG4gICAgZXJyb3IgPSBlcnJvci50b1N0cmluZygpLnJlcGxhY2UoJ2Fzc2VydGlvbiBmYWlsdXJlIHdpdGggbWVzc2FnZTonLCAnJykudHJpbSgpO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yO1xufTtcblxudmFyIEVYUExPUkVSID0ge1xuICBcIm5hbWVcIjogXCJCbG9rc1wiLFxuICBcImFjY291bnRcIjogXCJodHRwczovL2Jsb2tzLmlvL2FjY291bnQve3h9XCIsXG4gIFwidHJhbnNhY3Rpb25cIjogXCJodHRwczovL2Jsb2tzLmlvL3RyYW5zYWN0aW9uL3t4fVwiLFxuICBcImJsb2NrXCI6IFwiaHR0cHM6Ly9ibG9rcy5pby9ibG9jay97eH1cIlxufTtcblxudmFyIEVPUyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1BsdWdpbikge1xuICAoMCwgX2luaGVyaXRzMltcImRlZmF1bHRcIl0pKEVPUywgX1BsdWdpbik7XG5cbiAgZnVuY3Rpb24gRU9TKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgRU9TKTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMltcImRlZmF1bHRcIl0pKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyW1wiZGVmYXVsdFwiXSkoRU9TKS5jYWxsKHRoaXMsIF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTywgUGx1Z2luVHlwZXMuQkxPQ0tDSEFJTl9TVVBQT1JUKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEVPUywgW3tcbiAgICBrZXk6IFwic2lnbmF0dXJlUHJvdmlkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2lnbmF0dXJlUHJvdmlkZXIoYWNjb3VudHMsIHJlamVjdCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGlzU2luZ2xlQWNjb3VudCA9IGFjY291bnRzIGluc3RhbmNlb2YgX0FjY291bnRbXCJkZWZhdWx0XCJdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0QXZhaWxhYmxlS2V5czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBfZ2V0QXZhaWxhYmxlS2V5cyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU2KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDYucHJldiA9IF9jb250ZXh0Ni5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuYWJydXB0KFwicmV0dXJuXCIsIGlzU2luZ2xlQWNjb3VudCA/IFthY2NvdW50cy5wdWJsaWNLZXldIDogYWNjb3VudHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgucHVibGljS2V5O1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfY2FsbGVlNik7XG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0QXZhaWxhYmxlS2V5cygpIHtcbiAgICAgICAgICAgIHJldHVybiBfZ2V0QXZhaWxhYmxlS2V5cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBnZXRBdmFpbGFibGVLZXlzO1xuICAgICAgICB9KCksXG4gICAgICAgIHNpZ246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgX3NpZ24gPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNyh0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNyQoX2NvbnRleHQ3KSB7XG4gICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIF90aGlzLnNpZ25lcldpdGhQb3B1cCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIGFjY291bnRzLCByZWplY3QpLnRoZW4oZnVuY3Rpb24gKHNpZ25hdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogc2lnbmF0dXJlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogdHJhbnNhY3Rpb24uc2VyaWFsaXplZFRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgX2NhbGxlZTcpO1xuICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNpZ24oX3g4KSB7XG4gICAgICAgICAgICByZXR1cm4gX3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc2lnbjtcbiAgICAgICAgfSgpXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTaWduYWJsZUVvc2pzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNpZ25hYmxlRW9zanMoYWNjb3VudHMsIHJlamVjdCkge1xuICAgICAgdmFyIHByb21wdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogdHJ1ZTtcbiAgICAgIHZhciBpc1NpbmdsZUFjY291bnQgPSBhY2NvdW50cyBpbnN0YW5jZW9mIF9BY2NvdW50W1wiZGVmYXVsdFwiXTtcbiAgICAgIHZhciBycGMgPSBuZXcgX2Vvc2pzLkpzb25ScGMoKGlzU2luZ2xlQWNjb3VudCA/IGFjY291bnRzLm5ldHdvcmsoKSA6IGFjY291bnRzWzBdLm5ldHdvcmsoKSkuZnVsbGhvc3QoKSk7XG4gICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICBycGM6IHJwYyxcbiAgICAgICAgc2lnbmF0dXJlUHJvdmlkZXI6IHRoaXMuc2lnbmF0dXJlUHJvdmlkZXIoYWNjb3VudHMsIHJlamVjdClcbiAgICAgIH07XG4gICAgICBpZiAoVGV4dEVuY29kZXIpIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocnBjLCB7XG4gICAgICAgIHRleHRFbmNvZGVyOiBuZXcgVGV4dEVuY29kZXIoKSxcbiAgICAgICAgdGV4dERlY29kZXI6IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgX2Vvc2pzLkFwaShwYXJhbXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJiaXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmlwKCkge1xuICAgICAgcmV0dXJuIFwiNDQnLzE5NCcvMCcvMC9cIjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYnVzdENhY2hlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJ1c3RDYWNoZSgpIHt9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdEV4cGxvcmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRFeHBsb3JlcigpIHtcbiAgICAgIHJldHVybiBFWFBMT1JFUjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudEZvcm1hdHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY2NvdW50Rm9ybWF0dGVyKGFjY291bnQpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChhY2NvdW50Lm5hbWUsIFwiQFwiKS5jb25jYXQoYWNjb3VudC5hdXRob3JpdHkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXR1cm5hYmxlQWNjb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXR1cm5hYmxlQWNjb3VudChhY2NvdW50KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgIGF1dGhvcml0eTogYWNjb3VudC5hdXRob3JpdHksXG4gICAgICAgIHB1YmxpY0tleTogYWNjb3VudC5wdWJsaWNLZXksXG4gICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJT1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29udHJhY3RQbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb250cmFjdFBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuICdlb3Npby50b2tlbic7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja05ldHdvcmsobmV0d29yaykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0pLCBmZXRjaChcIlwiLmNvbmNhdChuZXR3b3JrLmZ1bGxob3N0KCksIFwiL3YxL2NoYWluL2dldF9pbmZvXCIpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSldKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEVuZG9yc2VkTmV0d29yaygpIHtcbiAgICAgIHJldHVybiBuZXcgX05ldHdvcmtbXCJkZWZhdWx0XCJdKCdFT1MgTWFpbm5ldCcsICdodHRwcycsICdub2Rlcy5nZXQtc2NhdHRlci5jb20nLCA0NDMsIF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTywgTUFJTk5FVF9DSEFJTl9JRCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzRW5kb3JzZWROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5kb3JzZWROZXR3b3JrKG5ldHdvcmspIHtcbiAgICAgIHJldHVybiBuZXR3b3JrLmJsb2NrY2hhaW4gPT09IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTyAmJiBuZXR3b3JrLmNoYWluSWQgPT09IE1BSU5ORVRfQ0hBSU5fSUQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENoYWluSWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRDaGFpbklkID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU4KG5ldHdvcmspIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5hYnJ1cHQoXCJyZXR1cm5cIiwgZ2V0Q2hhaW5EYXRhKG5ldHdvcmssICdnZXRfaW5mbycsIHt9KS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC5jaGFpbl9pZCB8fCAnJztcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlOCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldENoYWluSWQoX3g5KSB7XG4gICAgICAgIHJldHVybiBfZ2V0Q2hhaW5JZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Q2hhaW5JZDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJ1c2VzUmVzb3VyY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVzZXNSZXNvdXJjZXMoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzQWNjb3VudEFjdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzQWNjb3VudEFjdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJveHlWb3RlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcHJveHlWb3RlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxMChhY2NvdW50LCBwcm94eUFjY291bnQpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHByb21wdCxcbiAgICAgICAgICAgIF9hcmdzMTAgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEwJChfY29udGV4dDEwKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMC5wcmV2ID0gX2NvbnRleHQxMC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBwcm9tcHQgPSBfYXJnczEwLmxlbmd0aCA+IDIgJiYgX2FyZ3MxMFsyXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MxMFsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWY1ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU5KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW9zO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU5JChfY29udGV4dDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDkucHJldiA9IF9jb250ZXh0OS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlb3MgPSBfdGhpczIuZ2V0U2lnbmFibGVFb3NqcyhhY2NvdW50LCByZWplY3QsIHByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlb3MudHJhbnNhY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ZvdGVwcm9kdWNlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3I6IGFjY291bnQuc2VuZGFibGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBhY2NvdW50LmF1dGhvcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvdGVyOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJveHk6IHByb3h5QWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWNlcnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzQmVoaW5kOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlU2Vjb25kczogMzBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICh0cngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoaXN0b3J5ID0gbmV3IF9IaXN0b3JpY0FjdGlvbltcImRlZmF1bHRcIl0oYWNjb3VudCwgJ3Byb3h5JywgdHJ4LnRyYW5zYWN0aW9uX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goU3RvcmVBY3Rpb25zLkRFTFRBX0hJU1RPUlksIGhpc3RvcnkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRyeC50cmFuc2FjdGlvbl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogcG9wdXBFcnJvcihyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEyLCBfeDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTApO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBwcm94eVZvdGUoX3gxMCwgX3gxMSkge1xuICAgICAgICByZXR1cm4gX3Byb3h5Vm90ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJveHlWb3RlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImNoYW5nZVBlcm1pc3Npb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY2hhbmdlUGVybWlzc2lvbnMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE0KGFjY291bnQsIGtleXMpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTQkKF9jb250ZXh0MTQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDE0LnByZXYgPSBfY29udGV4dDE0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChrZXlzKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDE0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTQuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxNC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmNiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTMocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlb3MsIGFjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEzJChfY29udGV4dDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMy5wcmV2ID0gX2NvbnRleHQxMy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlb3MgPSBfdGhpczMuZ2V0U2lnbmFibGVFb3NqcyhhY2NvdW50LCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBPYmplY3Qua2V5cyhrZXlzKS5tYXAoZnVuY3Rpb24gKHBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5c1twZXJtaXNzaW9uXSB8fCAha2V5c1twZXJtaXNzaW9uXS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlPckFjY291bnQgPSBrZXlzW3Blcm1pc3Npb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF1dGggPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdHM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyAvLyBQdWJsaWMgS2V5XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczMudmFsaWRQdWJsaWNLZXkoa2V5T3JBY2NvdW50KSkgYXV0aC5rZXlzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleU9yQWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgLy8gQWNjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9rZXlPckFjY291bnQkc3BsaXQgPSBrZXlPckFjY291bnQuc3BsaXQoJ0AnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2tleU9yQWNjb3VudCRzcGxpdDIgPSAoMCwgX3NsaWNlZFRvQXJyYXkyW1wiZGVmYXVsdFwiXSkoX2tleU9yQWNjb3VudCRzcGxpdCwgMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yID0gX2tleU9yQWNjb3VudCRzcGxpdDJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm0gPSBfa2V5T3JBY2NvdW50JHNwbGl0MlsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGguYWNjb3VudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcjogYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBwZXJtID8gcGVybSA6ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBwZXJtaXNzaW9uID09PSAnb3duZXInID8gJycgOiAnb3duZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3VwZGF0ZWF1dGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yOiBhY2NvdW50LnNlbmRhYmxlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogcGVybWlzc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGFjY291bnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBwZXJtaXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGg6IGF1dGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTMuYWJydXB0KFwicmV0dXJuXCIsIGVvcy50cmFuc2FjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBhY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzQmVoaW5kOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlU2Vjb25kczogMzBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBwb3B1cEVycm9yKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmNyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTIocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JpdGllcywgYWNjb3VudHMsIGFkZEFjY291bnQsIGFjdGl2ZUtleXBhaXIsIG93bmVyS2V5cGFpciwgaGlzdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTIkKF9jb250ZXh0MTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDEyLnByZXYgPSBfY29udGV4dDEyLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml0aWVzID0gT2JqZWN0LmtleXMoa2V5cykuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5c1t4XSAmJiBrZXlzW3hdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50cyA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5pZGVudGlmaWFibGUoKSA9PT0gYWNjb3VudC5pZGVudGlmaWFibGUoKSAmJiBhdXRob3JpdGllcy5pbmNsdWRlcyh4LmF1dGhvcml0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMi5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0FjY291bnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5yZW1vdmVBY2NvdW50cyhhY2NvdW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEFjY291bnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjggPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTExKGtleXBhaXIsIGF1dGhvcml0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMSQoX2NvbnRleHQxMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTEucHJldiA9IF9jb250ZXh0MTEubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjID0gYWNjb3VudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdWJsaWNLZXkgPSBrZXlwYWlyLnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVPU0lPO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmtleSwgYWNjLmtleXBhaXJVbmlxdWUgPSBrZXlwYWlyLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5hdXRob3JpdHkgPSBhdXRob3JpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIF9BY2NvdW50U2VydmljZVtcImRlZmF1bHRcIl0uYWRkQWNjb3VudChhY2MpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWRkQWNjb3VudChfeDE5LCBfeDIwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmOC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVLZXlwYWlyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5nZXRLZXlQYWlyQnlQdWJsaWNLZXkoa2V5cy5hY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyS2V5cGFpciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uZ2V0S2V5UGFpckJ5UHVibGljS2V5KGtleXMub3duZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmVLZXlwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEyLm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhZGRBY2NvdW50KGFjdGl2ZUtleXBhaXIsICdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3duZXJLZXlwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEyLm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIubmV4dCA9IDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhZGRBY2NvdW50KG93bmVyS2V5cGFpciwgJ293bmVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gbmV3IF9IaXN0b3JpY0FjdGlvbltcImRlZmF1bHRcIl0oYWNjb3VudCwgJ3Blcm1pc3Npb25zJywgcmVzLnRyYW5zYWN0aW9uX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKFN0b3JlQWN0aW9ucy5ERUxUQV9ISVNUT1JZLCBoaXN0b3J5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLnRyYW5zYWN0aW9uX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMTMpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94MTYsIF94MTcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWY2LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUxNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNoYW5nZVBlcm1pc3Npb25zKF94MTQsIF94MTUpIHtcbiAgICAgICAgcmV0dXJuIF9jaGFuZ2VQZXJtaXNzaW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hhbmdlUGVybWlzc2lvbnM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudEFjdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudEFjdGlvbnMoYWNjb3VudCwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBbbmV3IF9BY2NvdW50QWN0aW9uW1wiZGVmYXVsdFwiXShcInVubGlua19hY2NvdW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGFjY291bnQpO1xuICAgICAgfSksIG5ldyBfQWNjb3VudEFjdGlvbltcImRlZmF1bHRcIl0oXCJjaGFuZ2VfcGVybWlzc2lvbnNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soYWNjb3VudCk7XG4gICAgICB9LCB0cnVlKSwgbmV3IF9BY2NvdW50QWN0aW9uW1wiZGVmYXVsdFwiXShcInByb3h5X3ZvdGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soYWNjb3VudCk7XG4gICAgICB9KSwgbmV3IF9BY2NvdW50QWN0aW9uW1wiZGVmYXVsdFwiXShcImNyZWF0ZV9hY2NvdW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soYWNjb3VudCk7XG4gICAgICAgIH07XG4gICAgICB9KV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlZnVuZCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTYoYWNjb3VudCkge1xuICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxNiQoX2NvbnRleHQxNikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTYucHJldiA9IF9jb250ZXh0MTYubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTYuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZjkgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE1KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW9zO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxNSQoX2NvbnRleHQxNSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTUucHJldiA9IF9jb250ZXh0MTUubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW9zID0gX3RoaXM0LmdldFNpZ25hYmxlRW9zanMoYWNjb3VudCwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDE1Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlb3MudHJhbnNhY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3JlZnVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3I6IGFjY291bnQuc2VuZGFibGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBhY2NvdW50LmF1dGhvcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyOiBhY2NvdW50Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3NCZWhpbmQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVTZWNvbmRzOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRyeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhpc3RvcnkgPSBuZXcgX0hpc3RvcmljQWN0aW9uW1wiZGVmYXVsdFwiXShhY2NvdW50LCAncHJveHknLCB0cngudHJhbnNhY3Rpb25faWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChTdG9yZUFjdGlvbnMuREVMVEFfSElTVE9SWSwgaGlzdG9yeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBwb3B1cEVycm9yKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE1LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxNSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gyMiwgX3gyMykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTE2KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcmVmdW5kKF94MjEpIHtcbiAgICAgICAgcmV0dXJuIF9yZWZ1bmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlZnVuZDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRSZXNvdXJjZXNGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRSZXNvdXJjZXNGb3IgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE3KGFjY291bnQpIHtcbiAgICAgICAgdmFyIGRhdGEsIHJlZnVuZCwgdGhyZWVEYXlzLCBwZXJjZW50YWdlLCBhY3Rpb25UZXh0LCByZXNvdXJjZXM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTE3JChfY29udGV4dDE3KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxNy5wcmV2ID0gX2NvbnRleHQxNy5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDE3Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjY291bnREYXRhKGFjY291bnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkYXRhID0gX2NvbnRleHQxNy5zZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCEoIWRhdGEgfHwgIWRhdGEuaGFzT3duUHJvcGVydHkoJ2NwdV9saW1pdCcpIHx8ICFkYXRhLmNwdV9saW1pdC5oYXNPd25Qcm9wZXJ0eSgnYXZhaWxhYmxlJykpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDE3Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTcuYWJydXB0KFwicmV0dXJuXCIsIFtdKTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZnVuZF9yZXF1ZXN0JykgJiYgZGF0YS5yZWZ1bmRfcmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgdGhyZWVEYXlzID0gODY0MDAgKiAzICogMTAwMDtcbiAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAoK25ldyBEYXRlKCkgLSArbmV3IERhdGUoZGF0YS5yZWZ1bmRfcmVxdWVzdC5yZXF1ZXN0X3RpbWUpKSAqIDEwMCAvIHRocmVlRGF5cztcbiAgICAgICAgICAgICAgICAgIHJlZnVuZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1JlZnVuZCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG5ldyBEYXRlKCtuZXcgRGF0ZShkYXRhLnJlZnVuZF9yZXF1ZXN0LnJlcXVlc3RfdGltZSkgKyA4NjQwMCAqIDMgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZTogcGVyY2VudGFnZSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uYWJsZTogcGVyY2VudGFnZSA+PSAxMDAsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblRleHQ6IFwiQ2xhaW0gUmVmdW5kXCJcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWN0aW9uVGV4dCA9IFwiTWFuYWdlXCI7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzID0gW3tcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdDUFUnLFxuICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlOiBkYXRhLmNwdV9saW1pdC5hdmFpbGFibGUsXG4gICAgICAgICAgICAgICAgICBtYXg6IGRhdGEuY3B1X2xpbWl0Lm1heCxcbiAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2U6IGRhdGEuY3B1X2xpbWl0LnVzZWQgKiAxMDAgLyBkYXRhLmNwdV9saW1pdC5tYXgsXG4gICAgICAgICAgICAgICAgICBhY3Rpb25hYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uVGV4dDogYWN0aW9uVGV4dFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdORVQnLFxuICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlOiBkYXRhLm5ldF9saW1pdC5hdmFpbGFibGUsXG4gICAgICAgICAgICAgICAgICBtYXg6IGRhdGEubmV0X2xpbWl0Lm1heCxcbiAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2U6IGRhdGEubmV0X2xpbWl0LnVzZWQgKiAxMDAgLyBkYXRhLm5ldF9saW1pdC5tYXgsXG4gICAgICAgICAgICAgICAgICBhY3Rpb25hYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uVGV4dDogYWN0aW9uVGV4dFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdSQU0nLFxuICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlOiBkYXRhLnJhbV91c2FnZSxcbiAgICAgICAgICAgICAgICAgIG1heDogZGF0YS5yYW1fcXVvdGEsXG4gICAgICAgICAgICAgICAgICBwZXJjZW50YWdlOiBkYXRhLnJhbV91c2FnZSAqIDEwMCAvIGRhdGEucmFtX3F1b3RhLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGFjdGlvblRleHQ6IGFjdGlvblRleHRcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBpZiAocmVmdW5kKSByZXNvdXJjZXMucHVzaChyZWZ1bmQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE3LmFicnVwdChcInJldHVyblwiLCByZXNvdXJjZXMpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxNy5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTcsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZXRSZXNvdXJjZXNGb3IoX3gyNCkge1xuICAgICAgICByZXR1cm4gX2dldFJlc291cmNlc0Zvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0UmVzb3VyY2VzRm9yO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcIm5lZWRzUmVzb3VyY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfbmVlZHNSZXNvdXJjZXMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE4KGFjY291bnQpIHtcbiAgICAgICAgdmFyIHJlc291cmNlcztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTgkKF9jb250ZXh0MTgpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDE4LnByZXYgPSBfY29udGV4dDE4Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0MTgubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VzRm9yKGFjY291bnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMgPSBfY29udGV4dDE4LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQxOC5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE4LmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE4LmFicnVwdChcInJldHVyblwiLCByZXNvdXJjZXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgubmFtZSA9PT0gJ0NQVSc7XG4gICAgICAgICAgICAgICAgfSkuYXZhaWxhYmxlIDwgNjAwMCk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTguc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTE4LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gbmVlZHNSZXNvdXJjZXMoX3gyNSkge1xuICAgICAgICByZXR1cm4gX25lZWRzUmVzb3VyY2VzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZWVkc1Jlc291cmNlcztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJhZGRSZXNvdXJjZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hZGRSZXNvdXJjZXMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE5KGFjY291bnQpIHtcbiAgICAgICAgdmFyIHN5bWJvbDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTkkKF9jb250ZXh0MTkpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDE5LnByZXYgPSBfY29udGV4dDE5Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHN5bWJvbCA9IGFjY291bnQubmV0d29yaygpLnN5c3RlbVRva2VuKCkuc3ltYm9sO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE5LmFicnVwdChcInJldHVyblwiLCB0aGlzLnN0YWtlT3JVbnN0YWtlKGFjY291bnQsIFwiMC4xMDAwIFwiLmNvbmNhdChzeW1ib2wpLCBcIjAuMDAwMCBcIi5jb25jYXQoc3ltYm9sKSwgdHJ1ZSwgZmFsc2UpKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxOS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTksIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBhZGRSZXNvdXJjZXMoX3gyNikge1xuICAgICAgICByZXR1cm4gX2FkZFJlc291cmNlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWRkUmVzb3VyY2VzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImFjY291bnRzQXJlSW1wb3J0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudHNBcmVJbXBvcnRlZCgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRJbXBvcnRhYmxlQWNjb3VudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW1wb3J0YWJsZUFjY291bnRzKGtleXBhaXIsIG5ldHdvcmspIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBwdWJsaWNLZXkgPSBrZXlwYWlyLnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiB4LmJsb2NrY2hhaW4gPT09IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcHVibGljS2V5KSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgIHB1YmxpY0tleSA9IHB1YmxpY0tleS5rZXk7XG4gICAgICAgIGdldEFjY291bnRzRnJvbVB1YmxpY0tleShwdWJsaWNLZXksIG5ldHdvcmspLnRoZW4oZnVuY3Rpb24gKGFjY291bnRzKSB7XG4gICAgICAgICAgcmVzb2x2ZShhY2NvdW50cy5tYXAoZnVuY3Rpb24gKGFjY291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgICAgICBuYW1lOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgIGF1dGhvcml0eTogYWNjb3VudC5hdXRob3JpdHksXG4gICAgICAgICAgICAgIHB1YmxpY0tleTogcHVibGljS2V5LFxuICAgICAgICAgICAgICBrZXlwYWlyVW5pcXVlOiBrZXlwYWlyLnVuaXF1ZSgpLFxuICAgICAgICAgICAgICBuZXR3b3JrVW5pcXVlOiBuZXR3b3JrLnVuaXF1ZSgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzVmFsaWRSZWNpcGllbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZFJlY2lwaWVudChuYW1lKSB7XG4gICAgICByZXR1cm4gLyheW2EtejEtNS5dezF9KFthLXoxLTUuXXswLDEwfVthLXoxLTVdKT8kKS9nLnRlc3QobmFtZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVUb1B1YmxpY1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcml2YXRlVG9QdWJsaWMocHJpdmF0ZUtleSkge1xuICAgICAgdmFyIHByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHJldHVybiBfZW9zanNFY2NbXCJkZWZhdWx0XCJdLlByaXZhdGVLZXkocHJpdmF0ZUtleSkudG9QdWJsaWMoKS50b1N0cmluZyhwcmVmaXggPyBwcmVmaXggOiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuRU9TSU8udG9VcHBlckNhc2UoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInZhbGlkUHJpdmF0ZUtleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZFByaXZhdGVLZXkocHJpdmF0ZUtleSkge1xuICAgICAgcmV0dXJuIHByaXZhdGVLZXkubGVuZ3RoID49IDUwICYmIF9lb3Nqc0VjY1tcImRlZmF1bHRcIl0uaXNWYWxpZFByaXZhdGUocHJpdmF0ZUtleSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInZhbGlkUHVibGljS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkUHVibGljS2V5KHB1YmxpY0tleSkge1xuICAgICAgdmFyIHByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIF9lb3Nqc0VjY1tcImRlZmF1bHRcIl0uUHVibGljS2V5LmZyb21TdHJpbmdPclRocm93KHB1YmxpY0tleSwgcHJlZml4ID8gcHJlZml4IDogX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVPU0lPLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJ1ZmZlclRvSGV4UHJpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBidWZmZXJUb0hleFByaXZhdGUoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gX2Vvc2pzRWNjW1wiZGVmYXVsdFwiXS5Qcml2YXRlS2V5LmZyb21CdWZmZXIoQnVmZmVyLmZyb20oYnVmZmVyKSkudG9TdHJpbmcoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGV4UHJpdmF0ZVRvQnVmZmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhleFByaXZhdGVUb0J1ZmZlcihwcml2YXRlS2V5KSB7XG4gICAgICByZXR1cm4gbmV3IF9lb3Nqc0VjY1tcImRlZmF1bHRcIl0uUHJpdmF0ZUtleShwcml2YXRlS2V5KS50b0J1ZmZlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhY3Rpb25QYXJ0aWNpcGFudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWN0aW9uUGFydGljaXBhbnRzKHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBfT2JqZWN0SGVscGVyc1tcImRlZmF1bHRcIl0uZmxhdHRlbihwYXlsb2FkLm1lc3NhZ2VzLm1hcChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5hdXRob3JpemF0aW9uLm1hcChmdW5jdGlvbiAoYXV0aCkge1xuICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChhdXRoLmFjdG9yLCBcIkBcIikuY29uY2F0KGF1dGgucGVybWlzc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhY2NvdW50RGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FjY291bnREYXRhID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyMChhY2NvdW50KSB7XG4gICAgICAgIHZhciBuZXR3b3JrLFxuICAgICAgICAgICAgYWNjb3VudE5hbWUsXG4gICAgICAgICAgICBnZXRBY2NvdW50LFxuICAgICAgICAgICAgX2FyZ3MyMCA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjAkKF9jb250ZXh0MjApIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIwLnByZXYgPSBfY29udGV4dDIwLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBfYXJnczIwLmxlbmd0aCA+IDEgJiYgX2FyZ3MyMFsxXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MyMFsxXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgYWNjb3VudE5hbWUgPSBfYXJnczIwLmxlbmd0aCA+IDIgJiYgX2FyZ3MyMFsyXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MyMFsyXSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBnZXRBY2NvdW50ID0gZnVuY3Rpb24gZ2V0QWNjb3VudCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaChcIlwiLmNvbmNhdChuZXR3b3JrID8gbmV0d29yay5mdWxsaG9zdCgpIDogYWNjb3VudC5uZXR3b3JrKCkuZnVsbGhvc3QoKSwgXCIvdjEvY2hhaW4vZ2V0X2FjY291bnRcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50X25hbWU6IGFjY291bnROYW1lID8gYWNjb3VudE5hbWUgOiBhY2NvdW50Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMC5hYnJ1cHQoXCJyZXR1cm5cIiwgUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH0pLCBnZXRBY2NvdW50KCldKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIwKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYWNjb3VudERhdGEoX3gyNykge1xuICAgICAgICByZXR1cm4gX2FjY291bnREYXRhLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NvdW50RGF0YTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJoYXNVbnRvdWNoYWJsZVRva2Vuc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNVbnRvdWNoYWJsZVRva2VucygpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1bnRvdWNoYWJsZUJhbGFuY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF91bnRvdWNoYWJsZUJhbGFuY2UgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIzKGFjY291bnQpIHtcbiAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGdldENwdUFuZE5ldCwgZ2V0UmV4LCBjcHVuZXQsIHJleDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjMkKF9jb250ZXh0MjMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIzLnByZXYgPSBfY29udGV4dDIzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGdldENwdUFuZE5ldCA9XG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTAgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIxKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWNjRGF0YSwgdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIxJChfY29udGV4dDIxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyMS5wcmV2ID0gX2NvbnRleHQyMS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIxLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczUuYWNjb3VudERhdGEoYWNjb3VudClbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjRGF0YSA9IF9jb250ZXh0MjEuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKCFhY2NEYXRhIHx8ICFhY2NEYXRhLmhhc093blByb3BlcnR5KCdzZWxmX2RlbGVnYXRlZF9iYW5kd2lkdGgnKSB8fCAhYWNjRGF0YS5zZWxmX2RlbGVnYXRlZF9iYW5kd2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIxLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjEuYWJydXB0KFwicmV0dXJuXCIsIG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGFjY291bnQubmV0d29yaygpLnN5c3RlbVRva2VuKCkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5hbW91bnQgPSBwYXJzZUZsb2F0KHBhcnNlRmxvYXQoYWNjRGF0YS5zZWxmX2RlbGVnYXRlZF9iYW5kd2lkdGguY3B1X3dlaWdodC5zcGxpdCgnICcpWzBdKSArIHBhcnNlRmxvYXQoYWNjRGF0YS5zZWxmX2RlbGVnYXRlZF9iYW5kd2lkdGgubmV0X3dlaWdodC5zcGxpdCgnICcpWzBdKSkudG9GaXhlZCh0b2tlbi5kZWNpbWFscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4udW51c2FibGUgPSAnQ1BVIC8gTkVUJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMS5hYnJ1cHQoXCJyZXR1cm5cIiwgdG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIxLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUyMSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRDcHVBbmROZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgICAgZ2V0UmV4ID1cbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxMSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIyJChfY29udGV4dDIyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyMi5wcmV2ID0gX2NvbnRleHQyMi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShhY2NvdW50Lm5ldHdvcmsoKS5jaGFpbklkICE9PSBNQUlOTkVUX0NIQUlOX0lEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyMi5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIyLmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjIuYWJydXB0KFwicmV0dXJuXCIsIGZldGNoKFwiXCIuY29uY2F0KGFjY291bnQubmV0d29yaygpLmZ1bGxob3N0KCksIFwiL3YxL2NoYWluL2dldF90YWJsZV9yb3dzXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcImVvc2lvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4X3Bvc2l0aW9uOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJfYm91bmQ6IGFjY291bnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6IFwiZW9zaW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IFwicmV4YmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguanNvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJleCA9IHJlc3VsdC5yb3dzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJleC5vd25lciAhPT0gYWNjb3VudC5uYW1lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGFjY291bnQubmV0d29yaygpLnN5c3RlbVRva2VuKCkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLnN5bWJvbCA9ICdSRVgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uYW1vdW50ID0gcGFyc2VGbG9hdChyZXgucmV4X2JhbGFuY2Uuc3BsaXQoJyAnKVswXSkudG9GaXhlZCg0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLnVudXNhYmxlID0gJ1JFWCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTIyKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFJleCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYxMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dDIzLm5leHQgPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRDcHVBbmROZXQoKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgY3B1bmV0ID0gX2NvbnRleHQyMy5zZW50O1xuICAgICAgICAgICAgICAgIF9jb250ZXh0MjMubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFJleCgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICByZXggPSBfY29udGV4dDIzLnNlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjMuYWJydXB0KFwicmV0dXJuXCIsIFtjcHVuZXQsIHJleF0uZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gISF4O1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMy5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMjMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB1bnRvdWNoYWJsZUJhbGFuY2UoX3gyOCkge1xuICAgICAgICByZXR1cm4gX3VudG91Y2hhYmxlQmFsYW5jZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW50b3VjaGFibGVCYWxhbmNlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImJhbGFuY2VGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9iYWxhbmNlRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyNChhY2NvdW50LCB0b2tlbikge1xuICAgICAgICB2YXIgYmFsYW5jZXMsIHJvdztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjQkKF9jb250ZXh0MjQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDI0LnByZXYgPSBfY29udGV4dDI0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0MjQubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgfSwgMTAwMDApO1xuICAgICAgICAgICAgICAgIH0pLCBnZXRUYWJsZVJvd3MoYWNjb3VudC5uZXR3b3JrKCksIHtcbiAgICAgICAgICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb2RlOiB0b2tlbi5jb250cmFjdCxcbiAgICAgICAgICAgICAgICAgIHNjb3BlOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICB0YWJsZTogJ2FjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgIGxpbWl0OiA1MDBcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXMucm93cztcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9KV0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBiYWxhbmNlcyA9IF9jb250ZXh0MjQuc2VudDtcbiAgICAgICAgICAgICAgICByb3cgPSBiYWxhbmNlcy5maW5kKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByb3cuYmFsYW5jZS5zcGxpdChcIiBcIilbMV0udG9Mb3dlckNhc2UoKSA9PT0gdG9rZW4uc3ltYm9sLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjQuYWJydXB0KFwicmV0dXJuXCIsIHJvdyA/IHJvdy5iYWxhbmNlLnNwbGl0KFwiIFwiKVswXSA6IDApO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJhbGFuY2VGb3IoX3gyOSwgX3gzMCkge1xuICAgICAgICByZXR1cm4gX2JhbGFuY2VGb3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJhbGFuY2VGb3I7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYmFsYW5jZXNGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9iYWxhbmNlc0ZvciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjYoYWNjb3VudCwgdG9rZW5zKSB7XG4gICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBmYWxsYmFjayxcbiAgICAgICAgICAgIGJhbGFuY2VzLFxuICAgICAgICAgICAgYmxhY2tsaXN0LFxuICAgICAgICAgICAgX2FyZ3MyNiA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjYkKF9jb250ZXh0MjYpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDI2LnByZXYgPSBfY29udGV4dDI2Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGZhbGxiYWNrID0gX2FyZ3MyNi5sZW5ndGggPiAyICYmIF9hcmdzMjZbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzMjZbMl0gOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICghKCFmYWxsYmFjayAmJiB0aGlzLmlzRW5kb3JzZWROZXR3b3JrKGFjY291bnQubmV0d29yaygpKSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjYubmV4dCA9IDk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dDI2Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBFb3NUb2tlbkFjY291bnRBUEkuZ2V0QWxsVG9rZW5zKGFjY291bnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBiYWxhbmNlcyA9IF9jb250ZXh0MjYuc2VudDtcblxuICAgICAgICAgICAgICAgIGlmIChiYWxhbmNlcykge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNi5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI2LmFicnVwdChcInJldHVyblwiLCB0aGlzLmJhbGFuY2VGb3IoYWNjb3VudCwgdG9rZW5zLCB0cnVlKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGJsYWNrbGlzdCA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MuYmxhY2tsaXN0VG9rZW5zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVPU0lPO1xuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjYuYWJydXB0KFwicmV0dXJuXCIsIGJhbGFuY2VzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICFibGFja2xpc3QuaW5jbHVkZXMoeC51bmlxdWUoKSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBfY29udGV4dDI2Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodG9rZW5zLm1hcChcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjUodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTI1JChfY29udGV4dDI1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyNS5wcmV2ID0gX2NvbnRleHQyNS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gdG9rZW4uY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI1Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczYuYmFsYW5jZUZvcihhY2NvdW50LCB0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuYW1vdW50ID0gX2NvbnRleHQyNS5zZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuY2hhaW5JZCA9IGFjY291bnQubmV0d29yaygpLmNoYWluSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjUuYWJydXB0KFwicmV0dXJuXCIsIHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI1LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUyNSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gzMykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjEyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjYuYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0MjYuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI2LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyNiwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJhbGFuY2VzRm9yKF94MzEsIF94MzIpIHtcbiAgICAgICAgcmV0dXJuIF9iYWxhbmNlc0Zvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFsYW5jZXNGb3I7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdERlY2ltYWxzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHREZWNpbWFscygpIHtcbiAgICAgIHJldHVybiA0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0VG9rZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdFRva2VuKCkge1xuICAgICAgcmV0dXJuIG5ldyBfVG9rZW5bXCJkZWZhdWx0XCJdKF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTywgJ2Vvc2lvLnRva2VuJywgJ0VPUycsICdFT1MnLCB0aGlzLmRlZmF1bHREZWNpbWFscygpLCBNQUlOTkVUX0NIQUlOX0lEKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UmFtUHJpY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRSYW1QcmljZSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjgobmV0d29yaykge1xuICAgICAgICB2YXIgcGFyc2VBc3NldCwgZ2V0UmFtSW5mbywgcmFtSW5mbztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjgkKF9jb250ZXh0MjgpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDI4LnByZXYgPSBfY29udGV4dDI4Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHBhcnNlQXNzZXQgPSBmdW5jdGlvbiBwYXJzZUFzc2V0KGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXNzZXQuc3BsaXQoJyAnKVswXTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZ2V0UmFtSW5mbyA9XG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTI3KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyNyQoX2NvbnRleHQyNykge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MjcucHJldiA9IF9jb250ZXh0MjcubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjcuYWJydXB0KFwicmV0dXJuXCIsIGdldFRhYmxlUm93cyhuZXR3b3JrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiAnZW9zaW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6ICdyYW1tYXJrZXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFtSW5mbyA9IHJlcy5yb3dzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtwYXJzZUFzc2V0KHJhbUluZm8ucXVvdGUuYmFsYW5jZSksIHBhcnNlQXNzZXQocmFtSW5mby5iYXNlLmJhbGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mjcuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTI3KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFJhbUluZm8oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgICAgX2NvbnRleHQyOC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0UmFtSW5mbygpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByYW1JbmZvID0gX2NvbnRleHQyOC5zZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI4LmFicnVwdChcInJldHVyblwiLCAocmFtSW5mb1swXSAvIHJhbUluZm9bMV0pLnRvRml4ZWQoOCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI4LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyOCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFJhbVByaWNlKF94MzQpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRSYW1QcmljZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0UmFtUHJpY2U7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlQWNjb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2NyZWF0ZUFjY291bnQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMwKGFjY291bnQsIG5hbWUsIG93bmVyLCBhY3RpdmUsIGVvc1VzZWQpIHtcbiAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzAkKF9jb250ZXh0MzApIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMwLnByZXYgPSBfY29udGV4dDMwLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMwLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjkocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3JlU3ltYm9sLCBuZXQsIGNwdSwgZW9zLCBhdXRob3JpemF0aW9uLCBrZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyOSQoX2NvbnRleHQyOSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MjkucHJldiA9IF9jb250ZXh0MjkubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZVN5bWJvbCA9IGFjY291bnQubmV0d29yaygpLnN5c3RlbVRva2VuKCkuc3ltYm9sO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldCA9IChlb3NVc2VkIC8gNCkudG9GaXhlZChhY2NvdW50Lm5ldHdvcmsoKS5zeXN0ZW1Ub2tlbigpLmRlY2ltYWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcHUgPSAoZW9zVXNlZCAtIG5ldCkudG9GaXhlZChhY2NvdW50Lm5ldHdvcmsoKS5zeXN0ZW1Ub2tlbigpLmRlY2ltYWxzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG5ldCA8PSAwIHx8IGNwdSA8PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyOS5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI5LmFicnVwdChcInJldHVyblwiLCByZWplY3QoXCJJbnZhbGlkIFJlc291cmNlc1wiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVvcyA9IF90aGlzNy5nZXRTaWduYWJsZUVvc2pzKGFjY291bnQsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcjogYWNjb3VudC5zZW5kYWJsZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogYWNjb3VudC5hdXRob3JpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhdGggPSBmdW5jdGlvbiBrZXlQYXRoKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0czogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjkubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlb3MudHJhbnNhY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25ld2FjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uOiBhdXRob3JpemF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogYWNjb3VudC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3duZXI6IGtleVBhdGgob3duZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZToga2V5UGF0aChhY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2J1eXJhbWJ5dGVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWVyOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXI6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXM6IDQwOTZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50OiAnZW9zaW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZGVsZWdhdGVidycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXI6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rha2VfbmV0X3F1YW50aXR5OiBcIlwiLmNvbmNhdChuZXQsIFwiIFwiKS5jb25jYXQoY29yZVN5bWJvbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rha2VfY3B1X3F1YW50aXR5OiBcIlwiLmNvbmNhdChjcHUsIFwiIFwiKS5jb25jYXQoY29yZVN5bWJvbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmZXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3NCZWhpbmQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVTZWNvbmRzOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRyeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ4LnRyYW5zYWN0aW9uX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBwb3B1cEVycm9yKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyOS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMjkpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94NDAsIF94NDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYxNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzMC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMzApO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVBY2NvdW50KF94MzUsIF94MzYsIF94MzcsIF94MzgsIF94MzkpIHtcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVBY2NvdW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjcmVhdGVBY2NvdW50O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInN0YWtlT3JVbnN0YWtlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc3Rha2VPclVuc3Rha2UgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMyKGFjY291bnQsIGNwdSwgbmV0KSB7XG4gICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICAgIHZhciBzdGFraW5nLFxuICAgICAgICAgICAgcHJvbXB0LFxuICAgICAgICAgICAgX2FyZ3MzMiA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzIkKF9jb250ZXh0MzIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMyLnByZXYgPSBfY29udGV4dDMyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHN0YWtpbmcgPSBfYXJnczMyLmxlbmd0aCA+IDMgJiYgX2FyZ3MzMlszXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MzMlszXSA6IHRydWU7XG4gICAgICAgICAgICAgICAgcHJvbXB0ID0gX2FyZ3MzMi5sZW5ndGggPiA0ICYmIF9hcmdzMzJbNF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzMzJbNF0gOiB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMyLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxNSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMzEocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlb3MsIG5hbWUsIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMxJChfY29udGV4dDMxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzMS5wcmV2ID0gX2NvbnRleHQzMS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlb3MgPSBfdGhpczguZ2V0U2lnbmFibGVFb3NqcyhhY2NvdW50LCByZWplY3QsIHByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHN0YWtpbmcgPyAnZGVsZWdhdGVidycgOiAndW5kZWxlZ2F0ZWJ3JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gc3Rha2luZyA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IGFjY291bnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFrZV9uZXRfcXVhbnRpdHk6IG5ldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWtlX2NwdV9xdWFudGl0eTogY3B1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmZXI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IGFjY291bnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnN0YWtlX25ldF9xdWFudGl0eTogbmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zdGFrZV9jcHVfcXVhbnRpdHk6IGNwdVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzMS5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW9zLnRyYW5zYWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6ICdlb3NpbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3I6IGFjY291bnQuc2VuZGFibGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBhY2NvdW50LmF1dGhvcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3NCZWhpbmQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVTZWNvbmRzOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRyeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ4LnRyYW5zYWN0aW9uX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBwb3B1cEVycm9yKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMxLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzMSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g0NSwgX3g0Nikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjE1LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHN0YWtlT3JVbnN0YWtlKF94NDIsIF94NDMsIF94NDQpIHtcbiAgICAgICAgcmV0dXJuIF9zdGFrZU9yVW5zdGFrZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3Rha2VPclVuc3Rha2U7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYnV5T3JTZWxsUkFNXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYnV5T3JTZWxsUkFNID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzNChhY2NvdW50LCBieXRlcykge1xuICAgICAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgICAgICB2YXIgYnV5aW5nLFxuICAgICAgICAgICAgX2FyZ3MzNCA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzQkKF9jb250ZXh0MzQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDM0LnByZXYgPSBfY29udGV4dDM0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJ1eWluZyA9IF9hcmdzMzQubGVuZ3RoID4gMiAmJiBfYXJnczM0WzJdICE9PSB1bmRlZmluZWQgPyBfYXJnczM0WzJdIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzNC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMzKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW9zLCBuYW1lLCBkYXRhO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzMyQoX2NvbnRleHQzMykge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MzMucHJldiA9IF9jb250ZXh0MzMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW9zID0gX3RoaXM5LmdldFNpZ25hYmxlRW9zanMoYWNjb3VudCwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gYnV5aW5nID8gJ2J1eXJhbWJ5dGVzJyA6ICdzZWxscmFtJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gYnV5aW5nID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5ZXI6IGFjY291bnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyOiBhY2NvdW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlczogYnl0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXM6IGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMzLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlb3MudHJhbnNhY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ2Vvc2lvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcjogYWNjb3VudC5zZW5kYWJsZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGFjY291bnQuYXV0aG9yaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrc0JlaGluZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZVNlY29uZHM6IDMwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAodHJ4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cngudHJhbnNhY3Rpb25faWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHBvcHVwRXJyb3IocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzMuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTMzKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDQ5LCBfeDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTM0KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYnV5T3JTZWxsUkFNKF94NDcsIF94NDgpIHtcbiAgICAgICAgcmV0dXJuIF9idXlPclNlbGxSQU0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1eU9yU2VsbFJBTTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJ0cmFuc2ZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3RyYW5zZmVyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzNihfcmVmMTcpIHtcbiAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICAgIHZhciBhY2NvdW50LCB0bywgYW1vdW50LCB0b2tlbiwgbWVtbywgX3JlZjE3JHByb21wdEZvclNpZ25hLCBwcm9tcHRGb3JTaWduYXR1cmUsIGNvbnRyYWN0LCBzeW1ib2wsIGFtb3VudFdpdGhTeW1ib2w7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzYkKF9jb250ZXh0MzYpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDM2LnByZXYgPSBfY29udGV4dDM2Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFjY291bnQgPSBfcmVmMTcuYWNjb3VudCwgdG8gPSBfcmVmMTcudG8sIGFtb3VudCA9IF9yZWYxNy5hbW91bnQsIHRva2VuID0gX3JlZjE3LnRva2VuLCBtZW1vID0gX3JlZjE3Lm1lbW8sIF9yZWYxNyRwcm9tcHRGb3JTaWduYSA9IF9yZWYxNy5wcm9tcHRGb3JTaWduYXR1cmUsIHByb21wdEZvclNpZ25hdHVyZSA9IF9yZWYxNyRwcm9tcHRGb3JTaWduYSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYxNyRwcm9tcHRGb3JTaWduYTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRSZWNpcGllbnQodG8pKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDM2Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzYuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiAnSW52YWxpZCByZWNpcGllbnQgYWNjb3VudCBuYW1lJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBhbW91bnQgPSBwYXJzZUZsb2F0KGFtb3VudCkudG9GaXhlZCh0b2tlbi5kZWNpbWFscyk7XG4gICAgICAgICAgICAgICAgY29udHJhY3QgPSB0b2tlbi5jb250cmFjdCwgc3ltYm9sID0gdG9rZW4uc3ltYm9sO1xuICAgICAgICAgICAgICAgIGFtb3VudFdpdGhTeW1ib2wgPSBhbW91bnQuaW5kZXhPZihzeW1ib2wpID4gLTEgPyBhbW91bnQgOiBcIlwiLmNvbmNhdChhbW91bnQsIFwiIFwiKS5jb25jYXQoc3ltYm9sKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzNi5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTggPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTM1KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW9zLCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTM1JChfY29udGV4dDM1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzNS5wcmV2ID0gX2NvbnRleHQzNS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlb3MgPSBfdGhpczEwLmdldFNpZ25hYmxlRW9zanMoYWNjb3VudCwgcmVqZWN0LCBwcm9tcHRGb3JTaWduYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzUubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVvcy50cmFuc2FjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50OiBjb250cmFjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RyYW5zZmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcjogYWNjb3VudC5zZW5kYWJsZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGFjY291bnQuYXV0aG9yaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogYWNjb3VudC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogYW1vdW50V2l0aFN5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1vOiBtZW1vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzQmVoaW5kOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlU2Vjb25kczogMzBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHBvcHVwRXJyb3IocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDM1LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzUuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTM1KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDUyLCBfeDUzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTM2LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdHJhbnNmZXIoX3g1MSkge1xuICAgICAgICByZXR1cm4gX3RyYW5zZmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2ZlcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJzaWduZXJXaXRoUG9wdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zaWduZXJXaXRoUG9wdXAgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTM5KHBheWxvYWQsIGFjY291bnRzLCByZWplY3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMxMSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzkkKF9jb250ZXh0MzkpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDM5LnByZXYgPSBfY29udGV4dDM5Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM5LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxOSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMzgocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzgkKF9jb250ZXh0MzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDM4LnByZXYgPSBfY29udGV4dDM4Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY2NvdW50cyBpbnN0YW5jZW9mIF9BY2NvdW50W1wiZGVmYXVsdFwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMgPSBbYWNjb3VudHNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzgubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMTEucmVxdWVzdFBhcnNlcihwYXlsb2FkLCBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24oYWNjb3VudHNbMF0ubmV0d29yaygpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZXMgPSBfY29udGV4dDM4LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5tZXNzYWdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzOC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM4LmFicnVwdChcInJldHVyblwiLCByZWplY3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0Vycm9yIHJlLXBhcnNpbmcgdHJhbnNhY3Rpb24gYnVmZmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pZGVudGl0eUtleSA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uaWRlbnRpdGllc1swXS5wdWJsaWNLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wYXJ0aWNpcGFudHMgPSBhY2NvdW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm5ldHdvcmsgPSBhY2NvdW50c1swXS5uZXR3b3JrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5vcmlnaW4gPSAnU2NhdHRlcic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW46IHBheWxvYWQub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tjaGFpbjogJ2VvcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBY3Rpb25zLlNJR04sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCByZXF1ZXN0KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjIxID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzNyhfcmVmMjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgc2lnbmF0dXJlcywgaSwgYWNjb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzckKF9jb250ZXh0MzcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDM3LnByZXYgPSBfY29udGV4dDM3Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9yZWYyMC5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISghcmVzdWx0IHx8ICFyZXN1bHQuYWNjZXB0ZWQgfHwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzcuYWJydXB0KFwicmV0dXJuXCIsIHJlamVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAnQ291bGQgbm90IGdldCBzaWduYXR1cmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBhY2NvdW50cy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3Lm5leHQgPSAxNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQgPSBhY2NvdW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3LnQwID0gc2lnbmF0dXJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1NpZ25pbmdTZXJ2aWNlW1wiZGVmYXVsdFwiXS5zaWduKHBheWxvYWQubmV0d29yaywgX0tleVBhaXJTZXJ2aWNlW1wiZGVmYXVsdFwiXS5pc0hhcmR3YXJlKGFjY291bnQucHVibGljS2V5KSA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBwYXlsb2FkLmJ1ZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGFjY291bnQucHVibGljS2V5LCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3LnQxID0gX2NvbnRleHQzNy5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzNy50MC5wdXNoLmNhbGwoX2NvbnRleHQzNy50MCwgX2NvbnRleHQzNy50MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShzaWduYXR1cmVzLmxlbmd0aCAhPT0gaSArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3Lm5leHQgPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM3LmFicnVwdChcInJldHVyblwiLCByZWplY3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0NvdWxkIG5vdCBnZXQgc2lnbmF0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDM3Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlcyA9IHNpZ25hdHVyZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWNjLmluY2x1ZGVzKHgpKSBhY2MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc2lnbmF0dXJlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g1OCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIxLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM4LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzOCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3g1Nykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjE5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM5LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzOSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHNpZ25lcldpdGhQb3B1cChfeDU0LCBfeDU1LCBfeDU2KSB7XG4gICAgICAgIHJldHVybiBfc2lnbmVyV2l0aFBvcHVwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWduZXJXaXRoUG9wdXA7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwic2lnbmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2lnbmVyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0MChwYXlsb2FkLCBwdWJsaWNLZXkpIHtcbiAgICAgICAgdmFyIGFyYml0cmFyeSxcbiAgICAgICAgICAgIGlzSGFzaCxcbiAgICAgICAgICAgIHByaXZhdGVLZXksXG4gICAgICAgICAgICBfYXJnczQwID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0MCQoX2NvbnRleHQ0MCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NDAucHJldiA9IF9jb250ZXh0NDAubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYXJiaXRyYXJ5ID0gX2FyZ3M0MC5sZW5ndGggPiAyICYmIF9hcmdzNDBbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzNDBbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc0hhc2ggPSBfYXJnczQwLmxlbmd0aCA+IDMgJiYgX2FyZ3M0MFszXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M0MFszXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBfYXJnczQwLmxlbmd0aCA+IDQgJiYgX2FyZ3M0MFs0XSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M0MFs0XSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJpdmF0ZUtleSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0MC5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9jb250ZXh0NDAubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0ucHVibGljVG9Qcml2YXRlKHB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBfY29udGV4dDQwLnNlbnQ7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGlmIChwcml2YXRlS2V5KSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDQwLm5leHQgPSA5O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDAuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByaXZhdGVLZXkgIT09ICdzdHJpbmcnKSBwcml2YXRlS2V5ID0gdGhpcy5idWZmZXJUb0hleFByaXZhdGUocHJpdmF0ZUtleSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIShhcmJpdHJhcnkgJiYgaXNIYXNoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0MC5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0MC5hYnJ1cHQoXCJyZXR1cm5cIiwgX2Vvc2pzRWNjW1wiZGVmYXVsdFwiXS5TaWduYXR1cmUuc2lnbkhhc2gocGF5bG9hZC5kYXRhLCBwcml2YXRlS2V5KS50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQwLmFicnVwdChcInJldHVyblwiLCBfZW9zanNFY2NbXCJkZWZhdWx0XCJdLnNpZ24oQnVmZmVyLmZyb20oYXJiaXRyYXJ5ID8gcGF5bG9hZC5kYXRhIDogcGF5bG9hZC5idWYsICd1dGY4JyksIHByaXZhdGVLZXkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTQwLCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2lnbmVyKF94NTksIF94NjApIHtcbiAgICAgICAgcmV0dXJuIF9zaWduZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNpZ25lcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJ0cmFuc2FjdGlvbkNvbnRyYWN0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFuc2FjdGlvbkNvbnRyYWN0cyh0cmFuc2FjdGlvbikge1xuICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uLmhhc093blByb3BlcnR5KCdhY3Rpb25zJykgPyBfT2JqZWN0SGVscGVyc1tcImRlZmF1bHRcIl0uZGlzdGluY3QodHJhbnNhY3Rpb24uYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY291bnQ7XG4gICAgICB9KSkgOiBfT2JqZWN0SGVscGVyc1tcImRlZmF1bHRcIl0uZGlzdGluY3QodHJhbnNhY3Rpb24uYWJpcy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKHguaGFzT3duUHJvcGVydHkoJ2FjY291bnRfbmFtZScpKSByZXR1cm4geC5hY2NvdW50X25hbWU7XG4gICAgICAgIHJldHVybiB4LmFjY291bnROYW1lO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmZXRjaEFiaXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9mZXRjaEFiaXMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQyKG5ldHdvcmssIGNvbnRyYWN0cykge1xuICAgICAgICB2YXIgZmFsbGJhY2tUb0NoYWluLFxuICAgICAgICAgICAgYWJpcyxcbiAgICAgICAgICAgIF9hcmdzNDIgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTQyJChfY29udGV4dDQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0Mi5wcmV2ID0gX2NvbnRleHQ0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBmYWxsYmFja1RvQ2hhaW4gPSBfYXJnczQyLmxlbmd0aCA+IDIgJiYgX2FyZ3M0MlsyXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M0MlsyXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhbGxiYWNrVG9DaGFpbikge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Mi5uZXh0ID0gODtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9jb250ZXh0NDIubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbKDAsIF9CYWNrZW5kQXBpU2VydmljZS5QT1NUKShcIndhbGxldHBhY2svYWJpc1wiLCB7XG4gICAgICAgICAgICAgICAgICBuZXR3b3JrOiBuZXR3b3JrLFxuICAgICAgICAgICAgICAgICAgYWNjb3VudHM6IGNvbnRyYWN0c1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfSksIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByKG51bGwpO1xuICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfSldKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgYWJpcyA9IF9jb250ZXh0NDIuc2VudDtcblxuICAgICAgICAgICAgICAgIGlmICghKCFhYmlzIHx8ICFhYmlzLmxlbmd0aCAhPT0gY29udHJhY3RzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0NDIubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgdGhpcy5mZXRjaEFiaXMobmV0d29yaywgY29udHJhY3RzLCB0cnVlKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQyLmFicnVwdChcInJldHVyblwiLCBhYmlzKTtcblxuICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0Mi5wcmV2ID0gODtcbiAgICAgICAgICAgICAgICBfY29udGV4dDQyLm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoY29udHJhY3RzLm1hcChcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNDEoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhaW5BYmksIHJhd0FiaSwgYWJpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0MSQoX2NvbnRleHQ0MSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NDEucHJldiA9IF9jb250ZXh0NDEubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0MS5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0Q2hhaW5EYXRhKG5ldHdvcmssIFwiZ2V0X3Jhd19hYmlcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudF9uYW1lOiBhY2NvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5hYmk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluQWJpID0gX2NvbnRleHQ0MS5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYWluQWJpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQxLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDEuYWJydXB0KFwicmV0dXJuXCIsIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgZmV0Y2ggQUJJcyBmb3IgXCIuY29uY2F0KGFjY291bnQpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd0FiaSA9IG51bWVyaWMuYmFzZTY0VG9CaW5hcnkoY2hhaW5BYmkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFiaSA9IGVvc2pzVXRpbC5yYXdBYmlUb0pzb24ocmF3QWJpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0MS5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd0FiaTogcmF3QWJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJpOiBhYmlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0MS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlNDEpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94NjMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYyMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQyLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDQyLnNlbnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0Mi5wcmV2ID0gMTQ7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0Mi50MCA9IF9jb250ZXh0NDJbXCJjYXRjaFwiXSg4KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKF9jb250ZXh0NDIudDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQyLmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICBjYXNlIDE4OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTQyLCB0aGlzLCBbWzgsIDE0XV0pO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBmZXRjaEFiaXMoX3g2MSwgX3g2Mikge1xuICAgICAgICByZXR1cm4gX2ZldGNoQWJpcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmV0Y2hBYmlzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInBhcnNlRW9zanNSZXF1ZXN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcGFyc2VFb3Nqc1JlcXVlc3QgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQzKHBheWxvYWQsIG5ldHdvcmspIHtcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uLCBhcGksIGNvbnRyYWN0cywgYWJpcywgYWN0aW9ucztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNDMkKF9jb250ZXh0NDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQzLnByZXYgPSBfY29udGV4dDQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0NDMucHJldiA9IDA7XG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBwYXlsb2FkLnRyYW5zYWN0aW9uO1xuICAgICAgICAgICAgICAgIGFwaSA9IGdldEVvc2pzQXBpKCk7XG4gICAgICAgICAgICAgICAgY29udHJhY3RzID0gdGhpcy50cmFuc2FjdGlvbkNvbnRyYWN0cyh0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0My5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEFiaXMobmV0d29yaywgY29udHJhY3RzKTtcblxuICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgYWJpcyA9IF9jb250ZXh0NDMuc2VudDtcbiAgICAgICAgICAgICAgICBhYmlzLm1hcChmdW5jdGlvbiAoX3JlZjIzKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgYWNjb3VudCA9IF9yZWYyMy5hY2NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgIHJhd0FiaSA9IF9yZWYyMy5yYXdBYmksXG4gICAgICAgICAgICAgICAgICAgICAgYWJpID0gX3JlZjIzLmFiaTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhcGkuY2FjaGVkQWJpcy5zZXQoYWNjb3VudCwge1xuICAgICAgICAgICAgICAgICAgICByYXdBYmk6IHJhd0FiaSxcbiAgICAgICAgICAgICAgICAgICAgYWJpOiBhYmlcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0NDMubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcGkuZGVzZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmFjdGlvbnMpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IF9jb250ZXh0NDMuc2VudDtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgeC5jb2RlID0geC5hY2NvdW50O1xuICAgICAgICAgICAgICAgICAgeC50eXBlID0geC5uYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBheWxvYWQuYnVmID0gQnVmZmVyLmNvbmNhdChbQnVmZmVyLmZyb20obmV0d29yay5jaGFpbklkLCBcImhleFwiKSwgLy8gQ2hhaW4gSURcbiAgICAgICAgICAgICAgICBCdWZmZXIuZnJvbShhcGkuc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pLCAnaGV4JyksIC8vIFRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgQnVmZmVyLmZyb20obmV3IFVpbnQ4QXJyYXkoMzIpKV0pO1xuICAgICAgICAgICAgICAgIHBheWxvYWQudHJhbnNhY3Rpb24ucGFyc2VkID0gT2JqZWN0LmFzc2lnbih7fSwgdHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0NDMubmV4dCA9IDE2O1xuICAgICAgICAgICAgICAgIHJldHVybiBhcGkuc2VyaWFsaXplQWN0aW9ucyhhY3Rpb25zKTtcblxuICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgIHBheWxvYWQudHJhbnNhY3Rpb24ucGFyc2VkLmFjdGlvbnMgPSBfY29udGV4dDQzLnNlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDMuYWJydXB0KFwicmV0dXJuXCIsIGFjdGlvbnMpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0My5wcmV2ID0gMjA7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0My50MCA9IF9jb250ZXh0NDNbXCJjYXRjaFwiXSgwKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKF9jb250ZXh0NDMudDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQzLmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICBjYXNlIDI0OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTQzLCB0aGlzLCBbWzAsIDIwXV0pO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBwYXJzZUVvc2pzUmVxdWVzdChfeDY0LCBfeDY1KSB7XG4gICAgICAgIHJldHVybiBfcGFyc2VFb3Nqc1JlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlRW9zanNSZXF1ZXN0O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInBhcnNlRW9zanMyUmVxdWVzdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3BhcnNlRW9zanMyUmVxdWVzdCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNDQocGF5bG9hZCwgbmV0d29yaykge1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24sIGFwaSwgY29udHJhY3RzLCBhYmlzLCBidWZmZXIsIHBhcnNlZDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNDQkKF9jb250ZXh0NDQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQ0LnByZXYgPSBfY29udGV4dDQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gcGF5bG9hZC50cmFuc2FjdGlvbjtcbiAgICAgICAgICAgICAgICBhcGkgPSBnZXRFb3Nqc0FwaSgpO1xuICAgICAgICAgICAgICAgIGNvbnRyYWN0cyA9IHRoaXMudHJhbnNhY3Rpb25Db250cmFjdHModHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0NDQubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hBYmlzKG5ldHdvcmssIGNvbnRyYWN0cyk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGFiaXMgPSBfY29udGV4dDQ0LnNlbnQ7XG4gICAgICAgICAgICAgICAgYWJpcy5tYXAoZnVuY3Rpb24gKF9yZWYyNCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnQgPSBfcmVmMjQuYWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICByYXdBYmkgPSBfcmVmMjQucmF3QWJpLFxuICAgICAgICAgICAgICAgICAgICAgIGFiaSA9IF9yZWYyNC5hYmk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXBpLmNhY2hlZEFiaXMuc2V0KGFjY291bnQsIHtcbiAgICAgICAgICAgICAgICAgICAgcmF3QWJpOiByYXdBYmksXG4gICAgICAgICAgICAgICAgICAgIGFiaTogYWJpXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBCdWZmZXIuZnJvbSh0cmFuc2FjdGlvbi5zZXJpYWxpemVkVHJhbnNhY3Rpb24sICdoZXgnKTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDQ0Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBpLmRlc2VyaWFsaXplVHJhbnNhY3Rpb25XaXRoQWN0aW9ucyhidWZmZXIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgcGFyc2VkID0gX2NvbnRleHQ0NC5zZW50O1xuICAgICAgICAgICAgICAgIHBhcnNlZC5hY3Rpb25zLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgeC5jb2RlID0geC5hY2NvdW50O1xuICAgICAgICAgICAgICAgICAgeC50eXBlID0geC5uYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBheWxvYWQuYnVmID0gQnVmZmVyLmNvbmNhdChbQnVmZmVyLmZyb20odHJhbnNhY3Rpb24uY2hhaW5JZCwgXCJoZXhcIiksIC8vIENoYWluIElEXG4gICAgICAgICAgICAgICAgYnVmZmVyLCAvLyBUcmFuc2FjdGlvblxuICAgICAgICAgICAgICAgIEJ1ZmZlci5mcm9tKG5ldyBVaW50OEFycmF5KDMyKSldKTtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnRyYW5zYWN0aW9uLnBhcnNlZCA9IE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZCk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0NC5uZXh0ID0gMTY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaS5zZXJpYWxpemVBY3Rpb25zKHBhcnNlZC5hY3Rpb25zKTtcblxuICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgIHBheWxvYWQudHJhbnNhY3Rpb24ucGFyc2VkLmFjdGlvbnMgPSBfY29udGV4dDQ0LnNlbnQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQudHJhbnNhY3Rpb24uYWJpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0NC5hYnJ1cHQoXCJyZXR1cm5cIiwgcGFyc2VkLmFjdGlvbnMpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTk6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNDQsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBwYXJzZUVvc2pzMlJlcXVlc3QoX3g2NiwgX3g2Nykge1xuICAgICAgICByZXR1cm4gX3BhcnNlRW9zanMyUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyc2VFb3NqczJSZXF1ZXN0O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInJlcXVlc3RQYXJzZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9yZXF1ZXN0UGFyc2VyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0NShwYXlsb2FkLCBuZXR3b3JrKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTQ1JChfY29udGV4dDQ1KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0NS5wcmV2ID0gX2NvbnRleHQ0NS5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQudHJhbnNhY3Rpb24uaGFzT3duUHJvcGVydHkoJ3NlcmlhbGl6ZWRUcmFuc2FjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDQ1Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDUuYWJydXB0KFwicmV0dXJuXCIsIHRoaXMucGFyc2VFb3NqczJSZXF1ZXN0KHBheWxvYWQsIG5ldHdvcmspKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NDUuYWJydXB0KFwicmV0dXJuXCIsIHRoaXMucGFyc2VFb3Nqc1JlcXVlc3QocGF5bG9hZCwgbmV0d29yaykpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQ1LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU0NSwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlcXVlc3RQYXJzZXIoX3g2OCwgX3g2OSkge1xuICAgICAgICByZXR1cm4gX3JlcXVlc3RQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3RQYXJzZXI7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIEVPUztcbn0oX1BsdWdpbjJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFT1M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW9zanMtYXBpLWludGVyZmFjZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZW9zanNfYXBpXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1hcGlcIik7XG5leHBvcnRzLkFwaSA9IGVvc2pzX2FwaV8xLkFwaTtcbnZhciBBcGlJbnRlcmZhY2VzID0gcmVxdWlyZShcIi4vZW9zanMtYXBpLWludGVyZmFjZXNcIik7XG5leHBvcnRzLkFwaUludGVyZmFjZXMgPSBBcGlJbnRlcmZhY2VzO1xudmFyIGVvc2pzX2pzb25ycGNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWpzb25ycGNcIik7XG5leHBvcnRzLkpzb25ScGMgPSBlb3Nqc19qc29ucnBjXzEuSnNvblJwYztcbnZhciBOdW1lcmljID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcbmV4cG9ydHMuTnVtZXJpYyA9IE51bWVyaWM7XG52YXIgUnBjSW50ZXJmYWNlcyA9IHJlcXVpcmUoXCIuL2Vvc2pzLXJwYy1pbnRlcmZhY2VzXCIpO1xuZXhwb3J0cy5ScGNJbnRlcmZhY2VzID0gUnBjSW50ZXJmYWNlcztcbnZhciBlb3Nqc19ycGNlcnJvcl8xID0gcmVxdWlyZShcIi4vZW9zanMtcnBjZXJyb3JcIik7XG5leHBvcnRzLlJwY0Vycm9yID0gZW9zanNfcnBjZXJyb3JfMS5ScGNFcnJvcjtcbnZhciBTZXJpYWxpemUgPSByZXF1aXJlKFwiLi9lb3Nqcy1zZXJpYWxpemVcIik7XG5leHBvcnRzLlNlcmlhbGl6ZSA9IFNlcmlhbGl6ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAbW9kdWxlIFJQQy1FcnJvclxuICovXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiogSG9sZHMgZGV0YWlsZWQgZXJyb3IgaW5mb3JtYXRpb24gKi9cbnZhciBScGNFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUnBjRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUnBjRXJyb3IoanNvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoanNvbi5lcnJvciAmJiBqc29uLmVycm9yLmRldGFpbHMgJiYganNvbi5lcnJvci5kZXRhaWxzLmxlbmd0aCAmJiBqc29uLmVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSkge1xuICAgICAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBqc29uLmVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChqc29uLnByb2Nlc3NlZCAmJiBqc29uLnByb2Nlc3NlZC5leGNlcHQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0Lm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywganNvbi5wcm9jZXNzZWQuZXhjZXB0Lm1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGpzb24ubWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoX3RoaXMsIFJwY0Vycm9yLnByb3RvdHlwZSk7XG4gICAgICAgIF90aGlzLmpzb24gPSBqc29uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBScGNFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuUnBjRXJyb3IgPSBScGNFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVvc2pzLXJwY2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVvc2pzLXJwYy1pbnRlcmZhY2VzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAbW9kdWxlIEFQSVxuICovXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgIHJldHVybiB0O1xufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNlciA9IHJlcXVpcmUoXCIuL2Vvc2pzLXNlcmlhbGl6ZVwiKTtcbnZhciBhYmlBYmkgPSByZXF1aXJlKCcuLi9zcmMvYWJpLmFiaS5qc29uJyk7XG52YXIgdHJhbnNhY3Rpb25BYmkgPSByZXF1aXJlKCcuLi9zcmMvdHJhbnNhY3Rpb24uYWJpLmpzb24nKTtcbnZhciBBcGkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiAgICAqIGBycGNgOiBJc3N1ZXMgUlBDIGNhbGxzXG4gICAgICogICAgKiBgYXV0aG9yaXR5UHJvdmlkZXJgOiBHZXQgcHVibGljIGtleXMgbmVlZGVkIHRvIG1lZXQgYXV0aG9yaXRpZXMgaW4gYSB0cmFuc2FjdGlvblxuICAgICAqICAgICogYGFiaVByb3ZpZGVyYDogU3VwcGxpZXMgQUJJcyBpbiByYXcgZm9ybSAoYmluYXJ5KVxuICAgICAqICAgICogYHNpZ25hdHVyZVByb3ZpZGVyYDogU2lnbnMgdHJhbnNhY3Rpb25zXG4gICAgICogICAgKiBgY2hhaW5JZGA6IElkZW50aWZpZXMgY2hhaW5cbiAgICAgKiAgICAqIGB0ZXh0RW5jb2RlcmA6IGBUZXh0RW5jb2RlcmAgaW5zdGFuY2UgdG8gdXNlLiBQYXNzIGluIGBudWxsYCBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxuICAgICAqICAgICogYHRleHREZWNvZGVyYDogYFRleHREZWNvZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXBpKGFyZ3MpIHtcbiAgICAgICAgLyoqIEhvbGRzIGluZm9ybWF0aW9uIG5lZWRlZCB0byBzZXJpYWxpemUgY29udHJhY3QgYWN0aW9ucyAqL1xuICAgICAgICB0aGlzLmNvbnRyYWN0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqIEZldGNoZWQgYWJpcyAqL1xuICAgICAgICB0aGlzLmNhY2hlZEFiaXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucnBjID0gYXJncy5ycGM7XG4gICAgICAgIHRoaXMuYXV0aG9yaXR5UHJvdmlkZXIgPSBhcmdzLmF1dGhvcml0eVByb3ZpZGVyIHx8IGFyZ3MucnBjO1xuICAgICAgICB0aGlzLmFiaVByb3ZpZGVyID0gYXJncy5hYmlQcm92aWRlciB8fCBhcmdzLnJwYztcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQcm92aWRlciA9IGFyZ3Muc2lnbmF0dXJlUHJvdmlkZXI7XG4gICAgICAgIHRoaXMuY2hhaW5JZCA9IGFyZ3MuY2hhaW5JZDtcbiAgICAgICAgdGhpcy50ZXh0RW5jb2RlciA9IGFyZ3MudGV4dEVuY29kZXI7XG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSBhcmdzLnRleHREZWNvZGVyO1xuICAgICAgICB0aGlzLmFiaVR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlSW5pdGlhbFR5cGVzKCksIGFiaUFiaSk7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25UeXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZUluaXRpYWxUeXBlcygpLCB0cmFuc2FjdGlvbkFiaSk7XG4gICAgfVxuICAgIC8qKiBEZWNvZGVzIGFuIGFiaSBhcyBVaW50OEFycmF5IGludG8ganNvbi4gKi9cbiAgICBBcGkucHJvdG90eXBlLnJhd0FiaVRvSnNvbiA9IGZ1bmN0aW9uIChyYXdBYmkpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHtcbiAgICAgICAgICAgIHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLFxuICAgICAgICAgICAgdGV4dERlY29kZXI6IHRoaXMudGV4dERlY29kZXIsXG4gICAgICAgICAgICBhcnJheTogcmF3QWJpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzZXIuc3VwcG9ydGVkQWJpVmVyc2lvbihidWZmZXIuZ2V0U3RyaW5nKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFiaSB2ZXJzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyLnJlc3RhcnRSZWFkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFiaVR5cGVzLmdldCgnYWJpX2RlZicpLmRlc2VyaWFsaXplKGJ1ZmZlcik7XG4gICAgfTtcbiAgICAvKiogR2V0IGFiaSBpbiBib3RoIGJpbmFyeSBhbmQgc3RydWN0dXJlZCBmb3Jtcy4gRmV0Y2ggd2hlbiBuZWVkZWQuICovXG4gICAgQXBpLnByb3RvdHlwZS5nZXRDYWNoZWRBYmkgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUsIHJlbG9hZCkge1xuICAgICAgICBpZiAocmVsb2FkID09PSB2b2lkIDApIHsgcmVsb2FkID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNhY2hlZEFiaSwgcmF3QWJpLCBhYmksIGVfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVsb2FkICYmIHRoaXMuY2FjaGVkQWJpcy5nZXQoYWNjb3VudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuY2FjaGVkQWJpcy5nZXQoYWNjb3VudE5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWJpUHJvdmlkZXIuZ2V0UmF3QWJpKGFjY291bnROYW1lKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd0FiaSA9IChfYS5zZW50KCkpLmFiaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaSA9IHRoaXMucmF3QWJpVG9Kc29uKHJhd0FiaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZWRBYmkgPSB7IHJhd0FiaTogcmF3QWJpLCBhYmk6IGFiaSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMS5tZXNzYWdlID0gXCJmZXRjaGluZyBhYmkgZm9yIFwiICsgYWNjb3VudE5hbWUgKyBcIjogXCIgKyBlXzEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVfMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWNoZWRBYmkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGFiaSBmb3IgXCIgKyBhY2NvdW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZEFiaXMuc2V0KGFjY291bnROYW1lLCBjYWNoZWRBYmkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNhY2hlZEFiaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEdldCBhYmkgaW4gc3RydWN0dXJlZCBmb3JtLiBGZXRjaCB3aGVuIG5lZWRlZC4gKi9cbiAgICBBcGkucHJvdG90eXBlLmdldEFiaSA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSwgcmVsb2FkKSB7XG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0Q2FjaGVkQWJpKGFjY291bnROYW1lLCByZWxvYWQpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgKF9hLnNlbnQoKSkuYWJpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGFiaXMgbmVlZGVkIGJ5IGEgdHJhbnNhY3Rpb24gKi9cbiAgICBBcGkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uQWJpcyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcmVsb2FkKSB7XG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYWNjb3VudHMsIHVuaXF1ZUFjY291bnRzLCBhY3Rpb25Qcm9taXNlcztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudHMgPSB0cmFuc2FjdGlvbi5hY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7IHJldHVybiBhY3Rpb24uYWNjb3VudDsgfSk7XG4gICAgICAgICAgICAgICAgdW5pcXVlQWNjb3VudHMgPSBuZXcgU2V0KGFjY291bnRzKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25Qcm9taXNlcyA9IF9fc3ByZWFkKHVuaXF1ZUFjY291bnRzKS5tYXAoZnVuY3Rpb24gKGFjY291bnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiBhY2NvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0Q2FjaGVkQWJpKGFjY291bnQsIHJlbG9hZCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIChfYS5hYmkgPSAoX2Iuc2VudCgpKS5yYXdBYmksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UuYWxsKGFjdGlvblByb21pc2VzKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGRhdGEgbmVlZGVkIHRvIHNlcmlhbGl6ZSBhY3Rpb25zIGluIGEgY29udHJhY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmdldENvbnRyYWN0ID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzIsIF9hLCBhYmksIHR5cGVzLCBhY3Rpb25zLCBfYiwgX2MsIF9kLCBuYW1lXzEsIHR5cGUsIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2UpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVsb2FkICYmIHRoaXMuY29udHJhY3RzLmdldChhY2NvdW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5jb250cmFjdHMuZ2V0KGFjY291bnROYW1lKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldEFiaShhY2NvdW50TmFtZSwgcmVsb2FkKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaSA9IF9lLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlSW5pdGlhbFR5cGVzKCksIGFiaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9iID0gX192YWx1ZXMoYWJpLmFjdGlvbnMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kID0gX2MudmFsdWUsIG5hbWVfMSA9IF9kLm5hbWUsIHR5cGUgPSBfZC50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLnNldChuYW1lXzEsIHNlci5nZXRUeXBlKHR5cGVzLCB0eXBlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyB0eXBlczogdHlwZXMsIGFjdGlvbnM6IGFjdGlvbnMgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJhY3RzLnNldChhY2NvdW50TmFtZSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGB2YWx1ZWAgdG8gYmluYXJ5IGZvcm0uIGB0eXBlYCBtdXN0IGJlIGEgYnVpbHQtaW4gYWJpIHR5cGUgb3IgaW4gYHRyYW5zYWN0aW9uLmFiaS5qc29uYC4gKi9cbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25UeXBlcy5nZXQodHlwZSkuc2VyaWFsaXplKGJ1ZmZlciwgdmFsdWUpO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgZGF0YSBpbiBgYnVmZmVyYCB0byBzdHJ1Y3R1cmVkIGZvcm0uIGB0eXBlYCBtdXN0IGJlIGEgYnVpbHQtaW4gYWJpIHR5cGUgb3IgaW4gYHRyYW5zYWN0aW9uLmFiaS5qc29uYC4gKi9cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24gKGJ1ZmZlciwgdHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvblR5cGVzLmdldCh0eXBlKS5kZXNlcmlhbGl6ZShidWZmZXIpO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYSB0cmFuc2FjdGlvbiB0byBiaW5hcnkgKi9cbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUoYnVmZmVyLCAndHJhbnNhY3Rpb24nLCBfX2Fzc2lnbih7IG1heF9uZXRfdXNhZ2Vfd29yZHM6IDAsIG1heF9jcHVfdXNhZ2VfbXM6IDAsIGRlbGF5X3NlYzogMCwgY29udGV4dF9mcmVlX2FjdGlvbnM6IFtdLCBhY3Rpb25zOiBbXSwgdHJhbnNhY3Rpb25fZXh0ZW5zaW9uczogW10gfSwgdHJhbnNhY3Rpb24pKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGEgdHJhbnNhY3Rpb24gZnJvbSBiaW5hcnkuIExlYXZlcyBhY3Rpb25zIGluIGhleC4gKi9cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xuICAgICAgICBidWZmZXIucHVzaEFycmF5KHRyYW5zYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzZXJpYWxpemUoYnVmZmVyLCAndHJhbnNhY3Rpb24nKTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGFjdGlvbnMgdG8gaGV4ICovXG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnQgPSBfYS5hY2NvdW50LCBuYW1lID0gX2EubmFtZSwgYXV0aG9yaXphdGlvbiA9IF9hLmF1dGhvcml6YXRpb24sIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cmFjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdCA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5zZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRoaXMudGV4dEVuY29kZXIsIHRoaXMudGV4dERlY29kZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGFjdGlvbnMgZnJvbSBoZXggKi9cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplQWN0aW9ucyA9IGZ1bmN0aW9uIChhY3Rpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NvdW50ID0gX2EuYWNjb3VudCwgbmFtZSA9IF9hLm5hbWUsIGF1dGhvcml6YXRpb24gPSBfYS5hdXRob3JpemF0aW9uLCBkYXRhID0gX2EuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJhY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0Q29udHJhY3QoYWNjb3VudCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3QgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzZXIuZGVzZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRoaXMudGV4dEVuY29kZXIsIHRoaXMudGV4dERlY29kZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGEgdHJhbnNhY3Rpb24gZnJvbSBiaW5hcnkuIEFsc28gZGVzZXJpYWxpemVzIGFjdGlvbnMuICovXG4gICAgQXBpLnByb3RvdHlwZS5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uV2l0aEFjdGlvbnMgPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBkZXNlcmlhbGl6ZWRBY3Rpb25zO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmFuc2FjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbiA9IHNlci5oZXhUb1VpbnQ4QXJyYXkodHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLmRlc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXNlcmlhbGl6ZUFjdGlvbnMoZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24uYWN0aW9ucyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6ZWRBY3Rpb25zID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHt9LCBkZXNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgeyBhY3Rpb25zOiBkZXNlcmlhbGl6ZWRBY3Rpb25zIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIG9wdGlvbmFsbHkgYnJvYWRjYXN0IGEgdHJhbnNhY3Rpb24uXG4gICAgICpcbiAgICAgKiBOYW1lZCBQYXJhbWV0ZXJzOlxuICAgICAqICAgICogYGJyb2FkY2FzdGA6IGJyb2FkY2FzdCB0aGlzIHRyYW5zYWN0aW9uP1xuICAgICAqICAgICogYHNpZ25gOiBzaWduIHRoaXMgdHJhbnNhY3Rpb24/XG4gICAgICogICAgKiBJZiBib3RoIGBibG9ja3NCZWhpbmRgIGFuZCBgZXhwaXJlU2Vjb25kc2AgYXJlIHByZXNlbnQsXG4gICAgICogICAgICB0aGVuIGZldGNoIHRoZSBibG9jayB3aGljaCBpcyBgYmxvY2tzQmVoaW5kYCBiZWhpbmQgaGVhZCBibG9jayxcbiAgICAgKiAgICAgIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBmb3IgVEFQb1MsIGFuZCBleHBpcmUgdGhlIHRyYW5zYWN0aW9uIGBleHBpcmVTZWNvbmRzYCBhZnRlciB0aGF0IGJsb2NrJ3MgdGltZS5cbiAgICAgKiBAcmV0dXJucyBub2RlIHJlc3BvbnNlIGlmIGBicm9hZGNhc3RgLCBge3NpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbn1gIGlmIGAhYnJvYWRjYXN0YFxuICAgICAqL1xuICAgIEFwaS5wcm90b3R5cGUudHJhbnNhY3QgPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYyA9IF9iLmJyb2FkY2FzdCwgYnJvYWRjYXN0ID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgX2QgPSBfYi5zaWduLCBzaWduID0gX2QgPT09IHZvaWQgMCA/IHRydWUgOiBfZCwgYmxvY2tzQmVoaW5kID0gX2IuYmxvY2tzQmVoaW5kLCBleHBpcmVTZWNvbmRzID0gX2IuZXhwaXJlU2Vjb25kcztcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZm8sIHJlZkJsb2NrLCBhYmlzLCBfZSwgX2YsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgcHVzaFRyYW5zYWN0aW9uQXJncywgYXZhaWxhYmxlS2V5cywgcmVxdWlyZWRLZXlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2cubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdGhpcy5jaGFpbklkKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9pbmZvKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFpbklkID0gaW5mby5jaGFpbl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGJsb2Nrc0JlaGluZCA9PT0gJ251bWJlcicgJiYgZXhwaXJlU2Vjb25kcykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhaW5mbykgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfaW5mbygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2soaW5mby5oZWFkX2Jsb2NrX251bSAtIGJsb2Nrc0JlaGluZCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZCbG9jayA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gX19hc3NpZ24oe30sIHNlci50cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jaywgZXhwaXJlU2Vjb25kcyksIHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gNjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVkVGFwb3NGaWVsZHModHJhbnNhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBjb25maWd1cmF0aW9uIG9yIFRBUE9TIGZpZWxkcyBhcmUgbm90IHByZXNlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0VHJhbnNhY3Rpb25BYmlzKHRyYW5zYWN0aW9uKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaXMgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZSA9IFt7fSwgdHJhbnNhY3Rpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2YgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2VyaWFsaXplQWN0aW9ucyh0cmFuc2FjdGlvbi5hY3Rpb25zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gX19hc3NpZ24uYXBwbHkodm9pZCAwLCBfZS5jb25jYXQoWyhfZi5hY3Rpb25zID0gX2cuc2VudCgpLCBfZildKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hUcmFuc2FjdGlvbkFyZ3MgPSB7IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBzaWduYXR1cmVzOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaWduKSByZXR1cm4gWzMgLypicmVhayovLCAxMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLmdldEF2YWlsYWJsZUtleXMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZUtleXMgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmF1dGhvcml0eVByb3ZpZGVyLmdldFJlcXVpcmVkS2V5cyh7IHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbiwgYXZhaWxhYmxlS2V5czogYXZhaWxhYmxlS2V5cyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEtleXMgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLnNpZ24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiB0aGlzLmNoYWluSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkS2V5czogcmVxdWlyZWRLZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJpczogYWJpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVHJhbnNhY3Rpb25BcmdzID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChicm9hZGNhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wdXNoU2lnbmVkVHJhbnNhY3Rpb24ocHVzaFRyYW5zYWN0aW9uQXJncyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHB1c2hUcmFuc2FjdGlvbkFyZ3NdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBCcm9hZGNhc3QgYSBzaWduZWQgdHJhbnNhY3Rpb24gKi9cbiAgICBBcGkucHJvdG90eXBlLnB1c2hTaWduZWRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc2lnbmF0dXJlcyA9IF9hLnNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gZXZlbnR1YWxseSBicmVhayBvdXQgaW50byBUcmFuc2FjdGlvblZhbGlkYXRvciBjbGFzc1xuICAgIEFwaS5wcm90b3R5cGUuaGFzUmVxdWlyZWRUYXBvc0ZpZWxkcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZXhwaXJhdGlvbiA9IF9hLmV4cGlyYXRpb24sIHJlZl9ibG9ja19udW0gPSBfYS5yZWZfYmxvY2tfbnVtLCByZWZfYmxvY2tfcHJlZml4ID0gX2EucmVmX2Jsb2NrX3ByZWZpeCwgdHJhbnNhY3Rpb24gPSBfX3Jlc3QoX2EsIFtcImV4cGlyYXRpb25cIiwgXCJyZWZfYmxvY2tfbnVtXCIsIFwicmVmX2Jsb2NrX3ByZWZpeFwiXSk7XG4gICAgICAgIHJldHVybiAhIShleHBpcmF0aW9uICYmIHJlZl9ibG9ja19udW0gJiYgcmVmX2Jsb2NrX3ByZWZpeCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBpO1xufSgpKTsgLy8gQXBpXG5leHBvcnRzLkFwaSA9IEFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVvc2pzLWFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQG1vZHVsZSBOdW1lcmljXG4gKi9cbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByaXBlbWQxNjAgPSByZXF1aXJlKCcuL3JpcGVtZCcpLlJJUEVNRDE2MC5oYXNoO1xudmFyIGJhc2U1OENoYXJzID0gJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonO1xudmFyIGJhc2U2NENoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuZnVuY3Rpb24gY3JlYXRlX2Jhc2U1OF9tYXAoKSB7XG4gICAgdmFyIGJhc2U1OE0gPSBBcnJheSgyNTYpLmZpbGwoLTEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTU4Q2hhcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYmFzZTU4TVtiYXNlNThDaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlNThNO1xufVxudmFyIGJhc2U1OE1hcCA9IGNyZWF0ZV9iYXNlNThfbWFwKCk7XG5mdW5jdGlvbiBjcmVhdGVfYmFzZTY0X21hcCgpIHtcbiAgICB2YXIgYmFzZTY0TSA9IEFycmF5KDI1NikuZmlsbCgtMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRDaGFycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBiYXNlNjRNW2Jhc2U2NENoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICB9XG4gICAgYmFzZTY0TVsnPScuY2hhckNvZGVBdCgwKV0gPSAwO1xuICAgIHJldHVybiBiYXNlNjRNO1xufVxudmFyIGJhc2U2NE1hcCA9IGNyZWF0ZV9iYXNlNjRfbWFwKCk7XG4vKiogSXMgYGJpZ251bWAgYSBuZWdhdGl2ZSBudW1iZXI/ICovXG5mdW5jdGlvbiBpc05lZ2F0aXZlKGJpZ251bSkge1xuICAgIHJldHVybiAoYmlnbnVtW2JpZ251bS5sZW5ndGggLSAxXSAmIDB4ODApICE9PSAwO1xufVxuZXhwb3J0cy5pc05lZ2F0aXZlID0gaXNOZWdhdGl2ZTtcbi8qKiBOZWdhdGUgYGJpZ251bWAgKi9cbmZ1bmN0aW9uIG5lZ2F0ZShiaWdudW0pIHtcbiAgICB2YXIgY2FycnkgPSAxO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmlnbnVtLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciB4ID0gKH5iaWdudW1baV0gJiAweGZmKSArIGNhcnJ5O1xuICAgICAgICBiaWdudW1baV0gPSB4O1xuICAgICAgICBjYXJyeSA9IHggPj4gODtcbiAgICB9XG59XG5leHBvcnRzLm5lZ2F0ZSA9IG5lZ2F0ZTtcbi8qKlxuICogQ29udmVydCBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcbiAqL1xuZnVuY3Rpb24gZGVjaW1hbFRvQmluYXJ5KHNpemUsIHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzcmNEaWdpdCA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKHNyY0RpZ2l0IDwgJzAnLmNoYXJDb2RlQXQoMCkgfHwgc3JjRGlnaXQgPiAnOScuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYXJyeSA9IHNyY0RpZ2l0IC0gJzAnLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDEwICsgY2Fycnk7XG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5kZWNpbWFsVG9CaW5hcnkgPSBkZWNpbWFsVG9CaW5hcnk7XG4vKipcbiAqIENvbnZlcnQgYSBzaWduZWQgZGVjaW1hbCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbmZ1bmN0aW9uIHNpZ25lZERlY2ltYWxUb0JpbmFyeShzaXplLCBzKSB7XG4gICAgdmFyIG5lZ2F0aXZlID0gc1swXSA9PT0gJy0nO1xuICAgIGlmIChuZWdhdGl2ZSkge1xuICAgICAgICBzID0gcy5zdWJzdHIoMSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBkZWNpbWFsVG9CaW5hcnkoc2l6ZSwgcyk7XG4gICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIG5lZ2F0ZShyZXN1bHQpO1xuICAgICAgICBpZiAoIWlzTmVnYXRpdmUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdudW1iZXIgaXMgb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOZWdhdGl2ZShyZXN1bHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5zaWduZWREZWNpbWFsVG9CaW5hcnkgPSBzaWduZWREZWNpbWFsVG9CaW5hcnk7XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYW4gdW5zaWduZWQgZGVjaW1hbCBudW1iZXJcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcbiAqL1xuZnVuY3Rpb24gYmluYXJ5VG9EZWNpbWFsKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobWluRGlnaXRzKS5maWxsKCcwJy5jaGFyQ29kZUF0KDApKTtcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjYXJyeSA9IGJpZ251bVtpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9ICcwJy5jaGFyQ29kZUF0KDApICsgeCAlIDEwO1xuICAgICAgICAgICAgY2FycnkgPSAoeCAvIDEwKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnMCcuY2hhckNvZGVBdCgwKSArIGNhcnJ5ICUgMTApO1xuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBfX3NwcmVhZChyZXN1bHQpKTtcbn1cbmV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gYmluYXJ5VG9EZWNpbWFsO1xuLyoqXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGEgc2lnbmVkIGRlY2ltYWwgbnVtYmVyXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbmZ1bmN0aW9uIHNpZ25lZEJpbmFyeVRvRGVjaW1hbChiaWdudW0sIG1pbkRpZ2l0cykge1xuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XG4gICAgaWYgKGlzTmVnYXRpdmUoYmlnbnVtKSkge1xuICAgICAgICB2YXIgeCA9IGJpZ251bS5zbGljZSgpO1xuICAgICAgICBuZWdhdGUoeCk7XG4gICAgICAgIHJldHVybiAnLScgKyBiaW5hcnlUb0RlY2ltYWwoeCwgbWluRGlnaXRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGJpbmFyeVRvRGVjaW1hbChiaWdudW0sIG1pbkRpZ2l0cyk7XG59XG5leHBvcnRzLnNpZ25lZEJpbmFyeVRvRGVjaW1hbCA9IHNpZ25lZEJpbmFyeVRvRGVjaW1hbDtcbi8qKlxuICogQ29udmVydCBhbiB1bnNpZ25lZCBiYXNlLTU4IG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcbiAqL1xuZnVuY3Rpb24gYmFzZTU4VG9CaW5hcnkoc2l6ZSwgcykge1xuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlLTU4IHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHg7XG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS01OCB2YWx1ZSBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmJhc2U1OFRvQmluYXJ5ID0gYmFzZTU4VG9CaW5hcnk7XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBiYXNlLTU4IG51bWJlclxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xuICovXG5mdW5jdGlvbiBiaW5hcnlUb0Jhc2U1OChiaWdudW0sIG1pbkRpZ2l0cykge1xuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XG4gICAgdmFyIGVfMSwgX2EsIGVfMiwgX2I7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGJpZ251bV8xID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKTsgIWJpZ251bV8xXzEuZG9uZTsgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNhcnJ5ID0gYnl0ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgICAgICByZXN1bHRbal0gPSBiYXNlNThDaGFycy5jaGFyQ29kZUF0KHggJSA1OCk7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoeCAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2FycnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlNThDaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMV8xICYmICFiaWdudW1fMV8xLmRvbmUgJiYgKF9hID0gYmlnbnVtXzEucmV0dXJuKSkgX2EuY2FsbChiaWdudW1fMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBieXRlID0gYmlnbnVtXzJfMS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChieXRlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMl8xICYmICFiaWdudW1fMl8xLmRvbmUgJiYgKF9iID0gYmlnbnVtXzIucmV0dXJuKSkgX2IuY2FsbChiaWdudW1fMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWQocmVzdWx0KSk7XG59XG5leHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gYmluYXJ5VG9CYXNlNTg7XG4vKiogQ29udmVydCBhbiB1bnNpZ25lZCBiYXNlLTY0IG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW0gKi9cbmZ1bmN0aW9uIGJhc2U2NFRvQmluYXJ5KHMpIHtcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgaWYgKChsZW4gJiAzKSA9PT0gMSAmJiBzW2xlbiAtIDFdID09PSAnPScpIHtcbiAgICAgICAgbGVuIC09IDE7XG4gICAgfSAvLyBmYyBhcHBlbmRzIGFuIGV4dHJhICc9J1xuICAgIGlmICgobGVuICYgMykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTY0IHZhbHVlIGlzIG5vdCBwYWRkZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIHZhciBncm91cHMgPSBsZW4gPj4gMjtcbiAgICB2YXIgYnl0ZXMgPSBncm91cHMgKiAzO1xuICAgIGlmIChsZW4gPiAwICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBpZiAoc1tsZW4gLSAyXSA9PT0gJz0nKSB7XG4gICAgICAgICAgICBieXRlcyAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnl0ZXMgLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgIGZvciAodmFyIGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7ICsrZ3JvdXApIHtcbiAgICAgICAgdmFyIGRpZ2l0MCA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMCldO1xuICAgICAgICB2YXIgZGlnaXQxID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAxKV07XG4gICAgICAgIHZhciBkaWdpdDIgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDIpXTtcbiAgICAgICAgdmFyIGRpZ2l0MyA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMyldO1xuICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMF0gPSAoZGlnaXQwIDw8IDIpIHwgKGRpZ2l0MSA+PiA0KTtcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDEgPCBieXRlcykge1xuICAgICAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDFdID0gKChkaWdpdDEgJiAxNSkgPDwgNCkgfCAoZGlnaXQyID4+IDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAqIDMgKyAyIDwgYnl0ZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdFtncm91cCAqIDMgKyAyXSA9ICgoZGlnaXQyICYgMykgPDwgNikgfCBkaWdpdDM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBiYXNlNjRUb0JpbmFyeTtcbi8qKiBLZXkgdHlwZXMgdGhpcyBsaWJyYXJ5IHN1cHBvcnRzICovXG52YXIgS2V5VHlwZTtcbihmdW5jdGlvbiAoS2V5VHlwZSkge1xuICAgIEtleVR5cGVbS2V5VHlwZVtcImsxXCJdID0gMF0gPSBcImsxXCI7XG4gICAgS2V5VHlwZVtLZXlUeXBlW1wicjFcIl0gPSAxXSA9IFwicjFcIjtcbn0pKEtleVR5cGUgPSBleHBvcnRzLktleVR5cGUgfHwgKGV4cG9ydHMuS2V5VHlwZSA9IHt9KSk7XG4vKiogUHVibGljIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXG5leHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gMzM7XG4vKiogUHJpdmF0ZSBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgPSAzMjtcbi8qKiBTaWduYXR1cmUgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IDY1O1xuZnVuY3Rpb24gZGlnZXN0U3VmZml4UmlwZW1kMTYwKGRhdGEsIHN1ZmZpeCkge1xuICAgIHZhciBkID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGggKyBzdWZmaXgubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZFtpXSA9IGRhdGFbaV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VmZml4Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRbZGF0YS5sZW5ndGggKyBpXSA9IHN1ZmZpeC5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmlwZW1kMTYwKGQpO1xufVxuZnVuY3Rpb24gc3RyaW5nVG9LZXkocywgdHlwZSwgc2l6ZSwgc3VmZml4KSB7XG4gICAgdmFyIHdob2xlID0gYmFzZTU4VG9CaW5hcnkoc2l6ZSArIDQsIHMpO1xuICAgIHZhciByZXN1bHQgPSB7IHR5cGU6IHR5cGUsIGRhdGE6IG5ldyBVaW50OEFycmF5KHdob2xlLmJ1ZmZlciwgMCwgc2l6ZSkgfTtcbiAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKHJlc3VsdC5kYXRhLCBzdWZmaXgpKTtcbiAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtzaXplICsgMF0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVtzaXplICsgMV1cbiAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVtzaXplICsgMl0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVtzaXplICsgM10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjaGVja3N1bSBkb2VzblxcJ3QgbWF0Y2gnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGtleVRvU3RyaW5nKGtleSwgc3VmZml4LCBwcmVmaXgpIHtcbiAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKGtleS5kYXRhLCBzdWZmaXgpKTtcbiAgICB2YXIgd2hvbGUgPSBuZXcgVWludDhBcnJheShrZXkuZGF0YS5sZW5ndGggKyA0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5kYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHdob2xlW2ldID0ga2V5LmRhdGFbaV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIHdob2xlW2kgKyBrZXkuZGF0YS5sZW5ndGhdID0gZGlnZXN0W2ldO1xuICAgIH1cbiAgICByZXR1cm4gcHJlZml4ICsgYmluYXJ5VG9CYXNlNTgod2hvbGUpO1xufVxuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xuZnVuY3Rpb24gc3RyaW5nVG9QdWJsaWNLZXkocykge1xuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBwdWJsaWMga2V5Jyk7XG4gICAgfVxuICAgIGlmIChzLnN1YnN0cigwLCAzKSA9PT0gJ0VPUycpIHtcbiAgICAgICAgdmFyIHdob2xlID0gYmFzZTU4VG9CaW5hcnkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSArIDQsIHMuc3Vic3RyKDMpKTtcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xuICAgICAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtleHBvcnRzLnB1YmxpY0tleURhdGFTaXplXSB8fCBkaWdlc3RbMV0gIT09IHdob2xlWzM0XVxuICAgICAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwdWJsaWMga2V5IGZvcm1hdCcpO1xuICAgIH1cbn1cbmV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkgPSBzdHJpbmdUb1B1YmxpY0tleTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZnVuY3Rpb24gcHVibGljS2V5VG9TdHJpbmcoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnSzEnLCAnUFVCX0sxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ1IxJywgJ1BVQl9SMV8nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufVxuZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IHB1YmxpY0tleVRvU3RyaW5nO1xuLyoqIElmIGEga2V5IGlzIGluIHRoZSBsZWdhY3kgZm9ybWF0IChgRU9TYCBwcmVmaXgpLCB0aGVuIGNvbnZlcnQgaXQgdG8gdGhlIG5ldyBmb3JtYXQgKGBQVUJfSzFfYCkuXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcbiAqL1xuZnVuY3Rpb24gY29udmVydExlZ2FjeVB1YmxpY0tleShzKSB7XG4gICAgaWYgKHMuc3Vic3RyKDAsIDMpID09PSAnRU9TJykge1xuICAgICAgICByZXR1cm4gcHVibGljS2V5VG9TdHJpbmcoc3RyaW5nVG9QdWJsaWNLZXkocykpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn1cbmV4cG9ydHMuY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXk7XG4vKiogSWYgYSBrZXkgaXMgaW4gdGhlIGxlZ2FjeSBmb3JtYXQgKGBFT1NgIHByZWZpeCksIHRoZW4gY29udmVydCBpdCB0byB0aGUgbmV3IGZvcm1hdCAoYFBVQl9LMV9gKS5cbiAqIExlYXZlcyBvdGhlciBmb3JtYXRzIHVudG91Y2hlZFxuICovXG5mdW5jdGlvbiBjb252ZXJ0TGVnYWN5UHVibGljS2V5cyhrZXlzKSB7XG4gICAgcmV0dXJuIGtleXMubWFwKGNvbnZlcnRMZWdhY3lQdWJsaWNLZXkpO1xufVxuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzO1xuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xuZnVuY3Rpb24gc3RyaW5nVG9Qcml2YXRlS2V5KHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHJpdmF0ZSBrZXknKTtcbiAgICB9XG4gICAgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFZUX1IxXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSBmb3JtYXQnKTtcbiAgICB9XG59XG5leHBvcnRzLnN0cmluZ1RvUHJpdmF0ZUtleSA9IHN0cmluZ1RvUHJpdmF0ZUtleTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZnVuY3Rpb24gcHJpdmF0ZUtleVRvU3RyaW5nKGtleSkge1xuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFZUX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHJpdmF0ZSBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufVxuZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBwcml2YXRlS2V5VG9TdHJpbmc7XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG5mdW5jdGlvbiBzdHJpbmdUb1NpZ25hdHVyZShzKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHNpZ25hdHVyZScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBzaWduYXR1cmUgZm9ybWF0Jyk7XG4gICAgfVxufVxuZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IHN0cmluZ1RvU2lnbmF0dXJlO1xuLyoqIENvbnZlcnQgYHNpZ25hdHVyZWAgdG8gc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG5mdW5jdGlvbiBzaWduYXR1cmVUb1N0cmluZyhzaWduYXR1cmUpIHtcbiAgICBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUuazEpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ0sxJywgJ1NJR19LMV8nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUucjEpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1IxJywgJ1NJR19SMV8nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcbiAgICB9XG59XG5leHBvcnRzLnNpZ25hdHVyZVRvU3RyaW5nID0gc2lnbmF0dXJlVG9TdHJpbmc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lb3Nqcy1udW1lcmljLmpzLm1hcCIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vd2x6bGEwMDAvYmFjODNkZjZkM2M1MTkxNmM0ZGQwYmM5NDdlNDY5NDcvcmF3LzdlZTM0NjJiMDk1YWIyMjU4MGRkYWYxOTFmNDRhNTkwZGE2ZmUzM2IvUklQRU1ELTE2MC5qc1xuXG4vKlxuXHRSSVBFTUQtMTYwLmpzXG5cblx0XHRkZXZlbG9wZWRcblx0XHRcdGJ5IEsuIChodHRwczovL2dpdGh1Yi5jb20vd2x6bGEwMDApXG5cdFx0XHRvbiBEZWNlbWJlciAyNy0yOSwgMjAxNyxcblxuXHRcdGxpY2Vuc2VkIHVuZGVyXG5cblxuXHRcdHRoZSBNSVQgbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChjKSAyMDE3IEsuXG5cblx0XHQgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cblx0XHRvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuXHRcdGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuXHRcdHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxuXHRcdGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuXHRcdHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG5cdFx0U29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcblx0XHRjb25kaXRpb25zOlxuXG5cdFx0IFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5cdFx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHQgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcblx0XHRFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVNcblx0XHRPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuXHRcdE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG5cdFx0SE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXG5cdFx0V0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5cdFx0RlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuXHRcdE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBSSVBFTUQxNjAgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFJJUEVNRDE2MCgpIHtcblx0XHQvLyBodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXG5cdFx0Ly8gaHR0cDovL3Nob2RoZ2FuZ2EuaW5mbGlibmV0LmFjLmluL2JpdHN0cmVhbS8xMDYwMy8yMjk3OC8xMy8xM19hcHBlbmRpeC5wZGZcblxuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSSVBFTUQxNjApO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKFJJUEVNRDE2MCwgbnVsbCwgW3tcblx0XHRrZXk6IFwiZ2V0X25fcGFkX2J5dGVzXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUgLyogaW4gYnl0ZXMsIDEgYnl0ZSBpcyA4IGJpdHMuICovKSB7XG5cdFx0XHQvLyAgT2J0YWluIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIHBhZCB0aGUgbWVzc2FnZS5cblx0XHRcdC8vIEl0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNpemUgb2YgdGhlIG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5cblx0XHRcdC8qXG4gICBcdGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcbiAgIFx0XHRUaGUgQ3J5cHRvZ3JhcGhpYyBIYXNoIEZ1bmN0aW9uIFJJUEVNRC0xNjBcbiAgIFx0XHR3cml0dGVuIGJ5XG4gICBcdFx0QmFydCBQcmVuZWVsLFxuICAgXHRcdEhhbnMgRG9iYmVydGluLFxuICAgXHRcdEFudG9vbiBCb3NzZWxhZXJzXG4gICBcdGluXG4gICBcdFx0MTk5Ny5cbiAgIFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgXHRcdMKnNSAgICAgRGVzY3JpcHRpb24gb2YgUklQRU1ELTE2MFxuICAgXHRcdC4uLi4uLlxuICAgXHRcdCBJbiBvcmRlciB0byBndWFyYW50ZWUgdGhhdCB0aGUgdG90YWwgaW5wdXQgc2l6ZSBpcyBhXG4gICBcdG11bHRpcGxlIG9mIDUxMiBiaXRzLCB0aGUgaW5wdXQgaXMgcGFkZGVkIGluIHRoZSBzYW1lXG4gICBcdHdheSBhcyBmb3IgYWxsIHRoZSBtZW1iZXJzIG9mIHRoZSBNRDQtZmFtaWx5OiBvbmVcbiAgIFx0YXBwZW5kcyBhIHNpbmdsZSAxIGZvbGxvd2VkIGJ5IGEgc3RyaW5nIG9mIDBzICh0aGVcbiAgIFx0bnVtYmVyIG9mIDBzIGxpZXMgYmV0d2VlbiAwIGFuZCA1MTEpOyB0aGUgbGFzdCA2NCBiaXRzXG4gICBcdG9mIHRoZSBleHRlbmRlZCBpbnB1dCBjb250YWluIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAgIFx0b2YgdGhlIGlucHV0IHNpemUgaW4gYml0cywgbGVhc3Qgc2lnbmlmaWNhbnQgYnl0ZSBmaXJzdC5cbiAgICovXG5cdFx0XHQvKlxuICAgXHRodHRwczovL3Rvb2xzLmlldGYub3JnL3JmYy9yZmMxMTg2LnR4dFxuICAgXHRcdFJGQyAxMTg2OiBNRDQgTWVzc2FnZSBEaWdlc3QgQWxnb3JpdGhtLlxuICAgXHRcdHdyaXR0ZW4gYnlcbiAgIFx0XHRSb25hbGQgTGlubiBSaXZlc3RcbiAgIFx0aW5cbiAgIFx0XHRPY3RvYmVyIDE5OTAuXG4gICBcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgIFx0XHTCpzMgICAgIE1ENCBBbGdvcml0aG0gRGVzY3JpcHRpb25cbiAgIFx0XHQuLi4uLi5cbiAgIFx0XHRTdGVwIDEuIEFwcGVuZCBwYWRkaW5nIGJpdHNcbiAgIFx0XHQgVGhlIG1lc3NhZ2UgaXMgXCJwYWRkZWRcIiAoZXh0ZW5kZWQpIHNvIHRoYXQgaXRzIGxlbmd0aFxuICAgXHQoaW4gYml0cykgaXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi4gVGhhdCBpcywgdGhlXG4gICBcdG1lc3NhZ2UgaXMgZXh0ZW5kZWQgc28gdGhhdCBpdCBpcyBqdXN0IDY0IGJpdHMgc2h5IG9mXG4gICBcdGJlaW5nIGEgbXVsdGlwbGUgb2YgNTEyIGJpdHMgbG9uZy4gUGFkZGluZyBpcyBhbHdheXNcbiAgIFx0cGVyZm9ybWVkLCBldmVuIGlmIHRoZSBsZW5ndGggb2YgdGhlIG1lc3NhZ2UgaXMgYWxyZWFkeVxuICAgXHRjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyIChpbiB3aGljaCBjYXNlIDUxMiBiaXRzIG9mXG4gICBcdHBhZGRpbmcgYXJlIGFkZGVkKS5cbiAgIFx0XHQgUGFkZGluZyBpcyBwZXJmb3JtZWQgYXMgZm9sbG93czogYSBzaW5nbGUgXCIxXCIgYml0IGlzXG4gICBcdGFwcGVuZGVkIHRvIHRoZSBtZXNzYWdlLCBhbmQgdGhlbiBlbm91Z2ggemVybyBiaXRzIGFyZVxuICAgXHRhcHBlbmRlZCBzbyB0aGF0IHRoZSBsZW5ndGggaW4gYml0cyBvZiB0aGUgcGFkZGVkXG4gICBcdG1lc3NhZ2UgYmVjb21lcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLlxuICAgXHRcdFN0ZXAgMi4gQXBwZW5kIGxlbmd0aFxuICAgXHRcdCBBIDY0LWJpdCByZXByZXNlbnRhdGlvbiBvZiBiICh0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlXG4gICBcdGJlZm9yZSB0aGUgcGFkZGluZyBiaXRzIHdlcmUgYWRkZWQpIGlzIGFwcGVuZGVkIHRvIHRoZVxuICAgXHRyZXN1bHQgb2YgdGhlIHByZXZpb3VzIHN0ZXAuIEluIHRoZSB1bmxpa2VseSBldmVudCB0aGF0XG4gICBcdGIgaXMgZ3JlYXRlciB0aGFuIDJeNjQsIHRoZW4gb25seSB0aGUgbG93LW9yZGVyIDY0IGJpdHNcbiAgIFx0b2YgYiBhcmUgdXNlZC4gKFRoZXNlIGJpdHMgYXJlIGFwcGVuZGVkIGFzIHR3byAzMi1iaXRcbiAgIFx0d29yZHMgYW5kIGFwcGVuZGVkIGxvdy1vcmRlciB3b3JkIGZpcnN0IGluIGFjY29yZGFuY2VcbiAgIFx0d2l0aCB0aGUgcHJldmlvdXMgY29udmVudGlvbnMuKVxuICAgXHRcdCBBdCB0aGlzIHBvaW50IHRoZSByZXN1bHRpbmcgbWVzc2FnZSAoYWZ0ZXIgcGFkZGluZyB3aXRoXG4gICBcdGJpdHMgYW5kIHdpdGggYikgaGFzIGEgbGVuZ3RoIHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGVcbiAgIFx0b2YgNTEyIGJpdHMuIEVxdWl2YWxlbnRseSwgdGhpcyBtZXNzYWdlIGhhcyBhIGxlbmd0aFxuICAgXHR0aGF0IGlzIGFuIGV4YWN0IG11bHRpcGxlIG9mIDE2ICgzMi1iaXQpIHdvcmRzLiBMZXRcbiAgIFx0TVswIC4uLiBOLTFdIGRlbm90ZSB0aGUgd29yZHMgb2YgdGhlIHJlc3VsdGluZyBtZXNzYWdlLFxuICAgXHR3aGVyZSBOIGlzIGEgbXVsdGlwbGUgb2YgMTYuXG4gICAqL1xuXHRcdFx0Ly8gaHR0cHM6Ly9jcnlwdG8uc3RhY2tleGNoYW5nZS5jb20vYS8zMjQwNy81NDU2OFxuXHRcdFx0LypcbiAgIFx0RXhhbXBsZSBjYXNlICAjIDFcbiAgIFx0XHRbMCBiaXQ6IG1lc3NhZ2UuXVxuICAgXHRcdFsxIGJpdDogMS5dXG4gICBcdFx0WzQ0NyBiaXRzOiAwLl1cbiAgIFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cbiAgIFx0XHRFeGFtcGxlIGNhc2UgICMgMlxuICAgXHRcdFs1MTItYml0czogbWVzc2FnZV1cbiAgIFx0XHRbMSBiaXQ6IDEuXVxuICAgXHRcdFs0NDcgYml0czogMC5dXG4gICBcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG4gICBcdFx0RXhhbXBsZSBjYXNlICAjIDNcbiAgIFx0XHRbKDUxMiAtIDY0ID0gNDQ4KSBiaXRzOiBtZXNzYWdlLl1cbiAgIFx0XHRbMSBiaXQ6IDEuXVxuICAgXHRcdFs1MTEgYml0czogMC5dXG4gICBcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG4gICBcdFx0RXhhbXBsZSBjYXNlICAjIDRcbiAgIFx0XHRbKDUxMiAtIDY1ID0gNDQ3KSBiaXRzOiBtZXNzYWdlLl1cbiAgIFx0XHRbMSBiaXQ6IDEuXVxuICAgXHRcdFswIGJpdDogMC5dXG4gICBcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG4gICAqL1xuXHRcdFx0Ly8gVGhlIG51bWJlciBvZiBwYWRkaW5nIHplcm8gYml0czpcblx0XHRcdC8vICAgICAgNTExIC0gW3sobWVzc2FnZSBzaXplIGluIGJpdHMpICsgNjR9IChtb2QgNTEyKV1cblx0XHRcdHJldHVybiA2NCAtIChtZXNzYWdlX3NpemUgKyA4ICYgNjMgLyogNjMgKi8pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJwYWRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gcGFkKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKSB7XG5cdFx0XHR2YXIgbWVzc2FnZV9zaXplID0gbWVzc2FnZS5ieXRlTGVuZ3RoO1xuXHRcdFx0dmFyIG5fcGFkID0gUklQRU1EMTYwLmdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUpO1xuXG5cdFx0XHQvLyAgYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYCBpcyAoKDIgKiogNTMpIC0gMSkgYW5kXG5cdFx0XHQvLyBiaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0IGlzIGRvbmUgb24gMzItYml0cyBvcGVyYW5kcy5cblx0XHRcdHZhciBkaXZtb2QgPSBmdW5jdGlvbiBkaXZtb2QoZGl2aWRlbmQsIGRpdmlzb3IpIHtcblx0XHRcdFx0cmV0dXJuIFtNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvciksIGRpdmlkZW5kICUgZGl2aXNvcl07XG5cdFx0XHR9O1xuXHRcdFx0LypcbiAgIFRvIHNoaWZ0XG4gICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgb1xuICAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG4gICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgTWV0aG9kICMxXG4gICAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICBbMDAwMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdICg8QT4gY2FwdHVyZWQpXG4gICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBMDAwXSAoPEE+IHNoaWZ0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cbiAgICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl0gKDxBPiAmIDxCXzI+IG1lcmdlZClcbiAgICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcbiAgIFx0Y29uc3QgdWludDMyX21heF9wbHVzXzEgPSAweDEwMDAwMDAwMDsgLy8gKDIgKiogMzIpXG4gICBjb25zdCBbXG4gICBcdG1zZ19ieXRlX3NpemVfbW9zdCwgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDIxKSAtIDFdLlxuICAgXHRtc2dfYnl0ZV9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSAxXS5cbiAgIF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCB1aW50MzJfbWF4X3BsdXNfMSk7XG4gICBjb25zdCBbXG4gICBcdGNhcnJ5LCAvLyBWYWx1ZSByYW5nZSBbMCwgN10uXG4gICBcdG1zZ19iaXRfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gOF0uXG4gICBdID0gZGl2bW9kKG1lc3NhZ2VfYnl0ZV9zaXplX2xlYXN0ICogOCwgdWludDMyX21heF9wbHVzXzEpO1xuICAgY29uc3QgbWVzc2FnZV9iaXRfc2l6ZV9tb3N0ID0gbWVzc2FnZV9ieXRlX3NpemVfbW9zdCAqIDhcbiAgIFx0KyBjYXJyeTsgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDI0KSAtIDFdLlxuICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgIE1ldGhvZCAjMlxuICAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgICBbMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUEgIEFBQV0gKDxBPiBjYXB0dXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgWzAwMEJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG4gICBcdCovXG5cblx0XHRcdHZhciBfZGl2bW9kJG1hcCA9IGRpdm1vZChtZXNzYWdlX3NpemUsIDUzNjg3MDkxMiAvKiAoMiAqKiAyOSkgKi8pLm1hcChmdW5jdGlvbiAoeCwgaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIGluZGV4ID8geCAqIDggOiB4O1xuXHRcdFx0fSksXG5cdFx0XHQgICAgX2Rpdm1vZCRtYXAyID0gX3NsaWNlZFRvQXJyYXkoX2Rpdm1vZCRtYXAsIDIpLFxuXHRcdFx0ICAgIG1zZ19iaXRfc2l6ZV9tb3N0ID0gX2Rpdm1vZCRtYXAyWzBdLFxuXHRcdFx0ICAgIG1zZ19iaXRfc2l6ZV9sZWFzdCA9IF9kaXZtb2QkbWFwMlsxXTtcblxuXHRcdFx0Ly8gYEFycmF5QnVmZmVyLnRyYW5zZmVyKClgIGlzIG5vdCBzdXBwb3J0ZWQuXG5cblxuXHRcdFx0dmFyIHBhZGRlZCA9IG5ldyBVaW50OEFycmF5KG1lc3NhZ2Vfc2l6ZSArIG5fcGFkICsgOCk7XG5cdFx0XHRwYWRkZWQuc2V0KG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpLCAwKTtcblx0XHRcdHZhciBkYXRhX3ZpZXcgPSBuZXcgRGF0YVZpZXcocGFkZGVkLmJ1ZmZlcik7XG5cdFx0XHRkYXRhX3ZpZXcuc2V0VWludDgobWVzc2FnZV9zaXplLCAxMjgpO1xuXHRcdFx0ZGF0YV92aWV3LnNldFVpbnQzMihtZXNzYWdlX3NpemUgKyBuX3BhZCwgbXNnX2JpdF9zaXplX2xlYXN0LCB0cnVlIC8vIExpdHRsZS1lbmRpYW5cblx0XHRcdCk7XG5cdFx0XHRkYXRhX3ZpZXcuc2V0VWludDMyKG1lc3NhZ2Vfc2l6ZSArIG5fcGFkICsgNCwgbXNnX2JpdF9zaXplX21vc3QsIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIHBhZGRlZC5idWZmZXI7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImZcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZihqLCB4LCB5LCB6KSB7XG5cdFx0XHRpZiAoMCA8PSBqICYmIGogPD0gMTUpIHtcblx0XHRcdFx0Ly8gRXhjbHVzaXZlLU9SXG5cdFx0XHRcdHJldHVybiB4IF4geSBeIHo7XG5cdFx0XHR9XG5cdFx0XHRpZiAoMTYgPD0gaiAmJiBqIDw9IDMxKSB7XG5cdFx0XHRcdC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuXHRcdFx0XHRyZXR1cm4geCAmIHkgfCB+eCAmIHo7XG5cdFx0XHR9XG5cdFx0XHRpZiAoMzIgPD0gaiAmJiBqIDw9IDQ3KSB7XG5cdFx0XHRcdHJldHVybiAoeCB8IH55KSBeIHo7XG5cdFx0XHR9XG5cdFx0XHRpZiAoNDggPD0gaiAmJiBqIDw9IDYzKSB7XG5cdFx0XHRcdC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuXHRcdFx0XHRyZXR1cm4geCAmIHogfCB5ICYgfno7XG5cdFx0XHR9XG5cdFx0XHRpZiAoNjQgPD0gaiAmJiBqIDw9IDc5KSB7XG5cdFx0XHRcdHJldHVybiB4IF4gKHkgfCB+eik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcIktcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gSyhqKSB7XG5cdFx0XHRpZiAoMCA8PSBqICYmIGogPD0gMTUpIHtcblx0XHRcdFx0cmV0dXJuIDB4MDAwMDAwMDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoMTYgPD0gaiAmJiBqIDw9IDMxKSB7XG5cdFx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5TUVJUMilcblx0XHRcdFx0cmV0dXJuIDB4NUE4Mjc5OTk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoMzIgPD0gaiAmJiBqIDw9IDQ3KSB7XG5cdFx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDMpKVxuXHRcdFx0XHRyZXR1cm4gMHg2RUQ5RUJBMTtcblx0XHRcdH1cblx0XHRcdGlmICg0OCA8PSBqICYmIGogPD0gNjMpIHtcblx0XHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNSkpXG5cdFx0XHRcdHJldHVybiAweDhGMUJCQ0RDO1xuXHRcdFx0fVxuXHRcdFx0aWYgKDY0IDw9IGogJiYgaiA8PSA3OSkge1xuXHRcdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg3KSlcblx0XHRcdFx0cmV0dXJuIDB4QTk1M0ZENEU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcIktQXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIEtQKGopIC8vIEsnXG5cdFx0e1xuXHRcdFx0aWYgKDAgPD0gaiAmJiBqIDw9IDE1KSB7XG5cdFx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDIpKVxuXHRcdFx0XHRyZXR1cm4gMHg1MEEyOEJFNjtcblx0XHRcdH1cblx0XHRcdGlmICgxNiA8PSBqICYmIGogPD0gMzEpIHtcblx0XHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMykpXG5cdFx0XHRcdHJldHVybiAweDVDNEREMTI0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKDMyIDw9IGogJiYgaiA8PSA0Nykge1xuXHRcdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg1KSlcblx0XHRcdFx0cmV0dXJuIDB4NkQ3MDNFRjM7XG5cdFx0XHR9XG5cdFx0XHRpZiAoNDggPD0gaiAmJiBqIDw9IDYzKSB7XG5cdFx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDcpKVxuXHRcdFx0XHRyZXR1cm4gMHg3QTZENzZFOTtcblx0XHRcdH1cblx0XHRcdGlmICg2NCA8PSBqICYmIGogPD0gNzkpIHtcblx0XHRcdFx0cmV0dXJuIDB4MDAwMDAwMDA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImFkZF9tb2R1bG8zMlwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBhZGRfbW9kdWxvMzIoKSAvKiAuLi4uLi4gKi97XG5cdFx0XHQvLyAxLiAgTW9kdWxvIGFkZGl0aW9uIChhZGRpdGlvbiBtb2R1bG8pIGlzIGFzc29jaWF0aXZlLlxuXHRcdFx0Ly8gICAgaHR0cHM6Ly9wcm9vZndpa2kub3JnL3dpa2kvTW9kdWxvX0FkZGl0aW9uX2lzX0Fzc29jaWF0aXZlXG5cdFx0XHQvLyAyLiAgQml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdFxuXHRcdFx0Ly8gICAgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzXG5cdFx0XHQvLyAgICBhbmQgcmVzdWx0cyBpbiBhIDMyLWJpdHMgdmFsdWUuXG5cdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShhcmd1bWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHRyZXR1cm4gYSArIGI7XG5cdFx0XHR9LCAwKSB8IDA7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInJvbDMyXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJvbDMyKHZhbHVlLCBjb3VudCkge1xuXHRcdFx0Ly8gQ3ljbGljIGxlZnQgc2hpZnQgKHJvdGF0ZSkgb24gMzItYml0cyB2YWx1ZS5cblx0XHRcdHJldHVybiB2YWx1ZSA8PCBjb3VudCB8IHZhbHVlID4+PiAzMiAtIGNvdW50O1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJoYXNoXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhc2gobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pIHtcblx0XHRcdC8vLy8vLy8vLy8gICAgICAgUGFkZGluZyAgICAgICAvLy8vLy8vLy8vXG5cblx0XHRcdC8vIFRoZSBwYWRkZWQgbWVzc2FnZS5cblx0XHRcdHZhciBwYWRkZWQgPSBSSVBFTUQxNjAucGFkKG1lc3NhZ2UpO1xuXG5cdFx0XHQvLy8vLy8vLy8vICAgICBDb21wcmVzc2lvbiAgICAgLy8vLy8vLy8vL1xuXG5cdFx0XHQvLyBNZXNzYWdlIHdvcmQgc2VsZWN0b3JzLlxuXHRcdFx0dmFyIHIgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgNywgNCwgMTMsIDEsIDEwLCA2LCAxNSwgMywgMTIsIDAsIDksIDUsIDIsIDE0LCAxMSwgOCwgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMiwgMSwgOSwgMTEsIDEwLCAwLCA4LCAxMiwgNCwgMTMsIDMsIDcsIDE1LCAxNCwgNSwgNiwgMiwgNCwgMCwgNSwgOSwgNywgMTIsIDIsIDEwLCAxNCwgMSwgMywgOCwgMTEsIDYsIDE1LCAxM107XG5cdFx0XHR2YXIgclAgPSBbLy8gcidcblx0XHRcdDUsIDE0LCA3LCAwLCA5LCAyLCAxMSwgNCwgMTMsIDYsIDE1LCA4LCAxLCAxMCwgMywgMTIsIDYsIDExLCAzLCA3LCAwLCAxMywgNSwgMTAsIDE0LCAxNSwgOCwgMTIsIDQsIDksIDEsIDIsIDE1LCA1LCAxLCAzLCA3LCAxNCwgNiwgOSwgMTEsIDgsIDEyLCAyLCAxMCwgMCwgNCwgMTMsIDgsIDYsIDQsIDEsIDMsIDExLCAxNSwgMCwgNSwgMTIsIDIsIDEzLCA5LCA3LCAxMCwgMTQsIDEyLCAxNSwgMTAsIDQsIDEsIDUsIDgsIDcsIDYsIDIsIDEzLCAxNCwgMCwgMywgOSwgMTFdO1xuXG5cdFx0XHQvLyBBbW91bnRzIGZvciAncm90YXRlIGxlZnQnIG9wZXJhdGlvbi5cblx0XHRcdHZhciBzID0gWzExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCwgNywgNiwgOCwgMTMsIDExLCA5LCA3LCAxNSwgNywgMTIsIDE1LCA5LCAxMSwgNywgMTMsIDEyLCAxMSwgMTMsIDYsIDcsIDE0LCA5LCAxMywgMTUsIDE0LCA4LCAxMywgNiwgNSwgMTIsIDcsIDUsIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMiwgOSwgMTUsIDUsIDExLCA2LCA4LCAxMywgMTIsIDUsIDEyLCAxMywgMTQsIDExLCA4LCA1LCA2XTtcblx0XHRcdHZhciBzUCA9IFsvLyBzJ1xuXHRcdFx0OCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LCA5LCAxMywgMTUsIDcsIDEyLCA4LCA5LCAxMSwgNywgNywgMTIsIDcsIDYsIDE1LCAxMywgMTEsIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSwgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LCA4LCA1LCAxMiwgOSwgMTIsIDUsIDE0LCA2LCA4LCAxMywgNiwgNSwgMTUsIDEzLCAxMSwgMTFdO1xuXG5cdFx0XHQvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgd29yZC5cblx0XHRcdHZhciB3b3JkX3NpemUgPSA0O1xuXG5cdFx0XHQvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgMTYtd29yZHMgYmxvY2suXG5cdFx0XHR2YXIgYmxvY2tfc2l6ZSA9IDY0O1xuXG5cdFx0XHQvLyBUaGUgbnVtYmVyIG9mIHRoZSAxNi13b3JkcyBibG9ja3MuXG5cdFx0XHR2YXIgdCA9IHBhZGRlZC5ieXRlTGVuZ3RoIC8gYmxvY2tfc2l6ZTtcblxuXHRcdFx0Ly8gIFRoZSBtZXNzYWdlIGFmdGVyIHBhZGRpbmcgY29uc2lzdHMgb2YgdCAxNi13b3JkIGJsb2NrcyB0aGF0XG5cdFx0XHQvLyBhcmUgZGVub3RlZCB3aXRoIFhfaVtqXSwgd2l0aCAw4omkaeKJpCh0IOKIkiAxKSBhbmQgMOKJpGriiaQxNS5cblx0XHRcdHZhciBYID0gbmV3IEFycmF5KHQpLmZpbGwodW5kZWZpbmVkKS5tYXAoZnVuY3Rpb24gKF8sIGkpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChqKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBEYXRhVmlldyhwYWRkZWQsIGkgKiBibG9ja19zaXplLCBibG9ja19zaXplKS5nZXRVaW50MzIoaiAqIHdvcmRfc2l6ZSwgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyAgVGhlIHJlc3VsdCBvZiBSSVBFTUQtMTYwIGlzIGNvbnRhaW5lZCBpbiBmaXZlIDMyLWJpdCB3b3Jkcyxcblx0XHRcdC8vIHdoaWNoIGZvcm0gdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBhbGdvcml0aG0uIFRoZSBmaW5hbFxuXHRcdFx0Ly8gY29udGVudCBvZiB0aGVzZSBmaXZlIDMyLWJpdCB3b3JkcyBpcyBjb252ZXJ0ZWQgdG8gYSAxNjAtYml0XG5cdFx0XHQvLyBzdHJpbmcsIGFnYWluIHVzaW5nIHRoZSBsaXR0bGUtZW5kaWFuIGNvbnZlbnRpb24uXG5cdFx0XHR2YXIgaCA9IFsweDY3NDUyMzAxLCAvLyBoXzBcblx0XHRcdDB4RUZDREFCODksIC8vIGhfMVxuXHRcdFx0MHg5OEJBRENGRSwgLy8gaF8yXG5cdFx0XHQweDEwMzI1NDc2LCAvLyBoXzNcblx0XHRcdDB4QzNEMkUxRjAgLy8gaF80XG5cdFx0XHRdO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHQ7ICsraSkge1xuXHRcdFx0XHR2YXIgQSA9IGhbMF0sXG5cdFx0XHRcdCAgICBCID0gaFsxXSxcblx0XHRcdFx0ICAgIEMgPSBoWzJdLFxuXHRcdFx0XHQgICAgRCA9IGhbM10sXG5cdFx0XHRcdCAgICBFID0gaFs0XTtcblx0XHRcdFx0dmFyIEFQID0gQSxcblx0XHRcdFx0ICAgIEJQID0gQixcblx0XHRcdFx0ICAgIENQID0gQyxcblx0XHRcdFx0ICAgIERQID0gRCxcblx0XHRcdFx0ICAgIEVQID0gRTtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCA4MDsgKytqKSB7XG5cdFx0XHRcdFx0Ly8gTGVmdCByb3VuZHNcblx0XHRcdFx0XHR2YXIgX1QgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFJJUEVNRDE2MC5yb2wzMihSSVBFTUQxNjAuYWRkX21vZHVsbzMyKEEsIFJJUEVNRDE2MC5mKGosIEIsIEMsIEQpLCBYW2ldKHJbal0pLCBSSVBFTUQxNjAuSyhqKSksIHNbal0pLCBFKTtcblx0XHRcdFx0XHRBID0gRTtcblx0XHRcdFx0XHRFID0gRDtcblx0XHRcdFx0XHREID0gUklQRU1EMTYwLnJvbDMyKEMsIDEwKTtcblx0XHRcdFx0XHRDID0gQjtcblx0XHRcdFx0XHRCID0gX1Q7XG5cblx0XHRcdFx0XHQvLyBSaWdodCByb3VuZHNcblx0XHRcdFx0XHRfVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoUklQRU1EMTYwLnJvbDMyKFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoQVAsIFJJUEVNRDE2MC5mKDc5IC0gaiwgQlAsIENQLCBEUCksIFhbaV0oclBbal0pLCBSSVBFTUQxNjAuS1AoaikpLCBzUFtqXSksIEVQKTtcblx0XHRcdFx0XHRBUCA9IEVQO1xuXHRcdFx0XHRcdEVQID0gRFA7XG5cdFx0XHRcdFx0RFAgPSBSSVBFTUQxNjAucm9sMzIoQ1AsIDEwKTtcblx0XHRcdFx0XHRDUCA9IEJQO1xuXHRcdFx0XHRcdEJQID0gX1Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMV0sIEMsIERQKTtcblx0XHRcdFx0aFsxXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsyXSwgRCwgRVApO1xuXHRcdFx0XHRoWzJdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzNdLCBFLCBBUCk7XG5cdFx0XHRcdGhbM10gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbNF0sIEEsIEJQKTtcblx0XHRcdFx0aFs0XSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFswXSwgQiwgQ1ApO1xuXHRcdFx0XHRoWzBdID0gVDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIFRoZSBmaW5hbCBvdXRwdXQgc3RyaW5nIHRoZW4gY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRhdGlvblxuXHRcdFx0Ly8gb2YgaF8wLCBoXzEsIGhfMiwgaF8zLCBhbmQgaF80IGFmdGVyIGNvbnZlcnRpbmcgZWFjaCBoX2kgdG8gYVxuXHRcdFx0Ly8gNC1ieXRlIHN0cmluZyB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBBcnJheUJ1ZmZlcigyMCk7XG5cdFx0XHR2YXIgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG5cdFx0XHRoLmZvckVhY2goZnVuY3Rpb24gKGhfaSwgaSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YV92aWV3LnNldFVpbnQzMihpICogNCwgaF9pLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gUklQRU1EMTYwO1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0UklQRU1EMTYwOiBSSVBFTUQxNjBcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQG1vZHVsZSBKU09OLVJQQ1xuICovXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZW9zanNfbnVtZXJpY18xID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcbnZhciBlb3Nqc19ycGNlcnJvcl8xID0gcmVxdWlyZShcIi4vZW9zanMtcnBjZXJyb3JcIik7XG5mdW5jdGlvbiBhcnJheVRvSGV4KGRhdGEpIHtcbiAgICB2YXIgZV8xLCBfYTtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgZGF0YV8xID0gX192YWx1ZXMoZGF0YSksIGRhdGFfMV8xID0gZGF0YV8xLm5leHQoKTsgIWRhdGFfMV8xLmRvbmU7IGRhdGFfMV8xID0gZGF0YV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIHggPSBkYXRhXzFfMS52YWx1ZTtcbiAgICAgICAgICAgIHJlc3VsdCArPSAoJzAwJyArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhXzFfMSAmJiAhZGF0YV8xXzEuZG9uZSAmJiAoX2EgPSBkYXRhXzEucmV0dXJuKSkgX2EuY2FsbChkYXRhXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKiBNYWtlIFJQQyBjYWxscyAqL1xudmFyIEpzb25ScGMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiAgICAqIGBmZXRjaGA6XG4gICAgICogICAgKiBicm93c2VyczogbGVhdmUgYG51bGxgIG9yIGB1bmRlZmluZWRgXG4gICAgICogICAgKiBub2RlOiBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gSnNvblJwYyhlbmRwb2ludCwgYXJncykge1xuICAgICAgICBpZiAoYXJncyA9PT0gdm9pZCAwKSB7IGFyZ3MgPSB7fTsgfVxuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gICAgICAgIGlmIChhcmdzLmZldGNoKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoQnVpbHRpbiA9IGFyZ3MuZmV0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoQnVpbHRpbiA9IGdsb2JhbC5mZXRjaDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogUG9zdCBgYm9keWAgdG8gYGVuZHBvaW50ICsgcGF0aGAuIFRocm93cyBkZXRhaWxlZCBlcnJvciBpbmZvcm1hdGlvbiBpbiBgUnBjRXJyb3JgIHdoZW4gYXZhaWxhYmxlLiAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24gKHBhdGgsIGJvZHkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBqc29uLCBmLCBlXzI7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZiA9IHRoaXMuZmV0Y2hCdWlsdGluO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZih0aGlzLmVuZHBvaW50ICsgcGF0aCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb24gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNvbi5wcm9jZXNzZWQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVvc2pzX3JwY2Vycm9yXzEuUnBjRXJyb3IoanNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8yLmlzRmV0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZW9zanNfcnBjZXJyb3JfMS5ScGNFcnJvcihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBqc29uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfYWJpYCAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9hYmkgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FiaScsIHsgYWNjb3VudF9uYW1lOiBhY2NvdW50TmFtZSB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X2FjY291bnRgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2FjY291bnQgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FjY291bnQnLCB7IGFjY291bnRfbmFtZTogYWNjb3VudE5hbWUgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9ibG9ja19oZWFkZXJfc3RhdGVgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2Jsb2NrX2hlYWRlcl9zdGF0ZSA9IGZ1bmN0aW9uIChibG9ja051bU9ySWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2Jsb2NrX2hlYWRlcl9zdGF0ZScsIHsgYmxvY2tfbnVtX29yX2lkOiBibG9ja051bU9ySWQgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9ibG9ja2AgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfYmxvY2sgPSBmdW5jdGlvbiAoYmxvY2tOdW1PcklkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9ibG9jaycsIHsgYmxvY2tfbnVtX29yX2lkOiBibG9ja051bU9ySWQgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9jb2RlYCAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9jb2RlID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9jb2RlJywgeyBhY2NvdW50X25hbWU6IGFjY291bnROYW1lIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfY3VycmVuY3lfYmFsYW5jZWAgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfY3VycmVuY3lfYmFsYW5jZSA9IGZ1bmN0aW9uIChjb2RlLCBhY2NvdW50LCBzeW1ib2wpIHtcbiAgICAgICAgaWYgKHN5bWJvbCA9PT0gdm9pZCAwKSB7IHN5bWJvbCA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2N1cnJlbmN5X2JhbGFuY2UnLCB7IGNvZGU6IGNvZGUsIGFjY291bnQ6IGFjY291bnQsIHN5bWJvbDogc3ltYm9sIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfY3VycmVuY3lfc3RhdHNgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2N1cnJlbmN5X3N0YXRzID0gZnVuY3Rpb24gKGNvZGUsIHN5bWJvbCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfY3VycmVuY3lfc3RhdHMnLCB7IGNvZGU6IGNvZGUsIHN5bWJvbDogc3ltYm9sIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfaW5mb2AgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfaW5mbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2luZm8nLCB7fSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9wcm9kdWNlcl9zY2hlZHVsZWAgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfcHJvZHVjZXJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9wcm9kdWNlcl9zY2hlZHVsZScsIHt9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X3Byb2R1Y2Vyc2AgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfcHJvZHVjZXJzID0gZnVuY3Rpb24gKGpzb24sIGxvd2VyQm91bmQsIGxpbWl0KSB7XG4gICAgICAgIGlmIChqc29uID09PSB2b2lkIDApIHsganNvbiA9IHRydWU7IH1cbiAgICAgICAgaWYgKGxvd2VyQm91bmQgPT09IHZvaWQgMCkgeyBsb3dlckJvdW5kID0gJyc7IH1cbiAgICAgICAgaWYgKGxpbWl0ID09PSB2b2lkIDApIHsgbGltaXQgPSA1MDsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfcHJvZHVjZXJzJywgeyBqc29uOiBqc29uLCBsb3dlcl9ib3VuZDogbG93ZXJCb3VuZCwgbGltaXQ6IGxpbWl0IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfcmF3X2NvZGVfYW5kX2FiaWAgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfcmF3X2NvZGVfYW5kX2FiaSA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfcmF3X2NvZGVfYW5kX2FiaScsIHsgYWNjb3VudF9uYW1lOiBhY2NvdW50TmFtZSB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIGNhbGxzIGAvdjEvY2hhaW4vZ2V0X3Jhd19jb2RlX2FuZF9hYmlgIGFuZCBwdWxscyBvdXQgdW5uZWVkZWQgcmF3IHdhc20gY29kZSAqL1xuICAgIC8vIFRPRE86IHVzZSBgL3YxL2NoYWluL2dldF9yYXdfYWJpYCBkaXJlY3RseSB3aGVuIGl0IGJlY29tZXMgYXZhaWxhYmxlXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0UmF3QWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByYXdDb2RlQW5kQWJpLCBhYmk7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0X3Jhd19jb2RlX2FuZF9hYmkoYWNjb3VudE5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3Q29kZUFuZEFiaSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaSA9IGVvc2pzX251bWVyaWNfMS5iYXNlNjRUb0JpbmFyeShyYXdDb2RlQW5kQWJpLmFiaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeyBhY2NvdW50TmFtZTogcmF3Q29kZUFuZEFiaS5hY2NvdW50X25hbWUsIGFiaTogYWJpIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF90YWJsZV9yb3dzYCAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF90YWJsZV9yb3dzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hLmpzb24sIGpzb24gPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBjb2RlID0gX2EuY29kZSwgc2NvcGUgPSBfYS5zY29wZSwgdGFibGUgPSBfYS50YWJsZSwgX2MgPSBfYS50YWJsZV9rZXksIHRhYmxlX2tleSA9IF9jID09PSB2b2lkIDAgPyAnJyA6IF9jLCBfZCA9IF9hLmxvd2VyX2JvdW5kLCBsb3dlcl9ib3VuZCA9IF9kID09PSB2b2lkIDAgPyAnJyA6IF9kLCBfZSA9IF9hLnVwcGVyX2JvdW5kLCB1cHBlcl9ib3VuZCA9IF9lID09PSB2b2lkIDAgPyAnJyA6IF9lLCBfZiA9IF9hLmluZGV4X3Bvc2l0aW9uLCBpbmRleF9wb3NpdGlvbiA9IF9mID09PSB2b2lkIDAgPyAxIDogX2YsIF9nID0gX2Eua2V5X3R5cGUsIGtleV90eXBlID0gX2cgPT09IHZvaWQgMCA/ICcnIDogX2csIF9oID0gX2EubGltaXQsIGxpbWl0ID0gX2ggPT09IHZvaWQgMCA/IDEwIDogX2gsIF9qID0gX2EucmV2ZXJzZSwgcmV2ZXJzZSA9IF9qID09PSB2b2lkIDAgPyBmYWxzZSA6IF9qLCBfayA9IF9hLnNob3dfcGF5ZXIsIHNob3dfcGF5ZXIgPSBfayA9PT0gdm9pZCAwID8gZmFsc2UgOiBfaztcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfbCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2wubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3RhYmxlX3Jvd3MnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbjoganNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVfa2V5OiB0YWJsZV9rZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJfYm91bmQ6IGxvd2VyX2JvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyX2JvdW5kOiB1cHBlcl9ib3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleF9wb3NpdGlvbjogaW5kZXhfcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5X3R5cGU6IGtleV90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlOiByZXZlcnNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dfcGF5ZXI6IHNob3dfcGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9sLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X3RhYmxlX2J5X3Njb3BlYCAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF90YWJsZV9ieV9zY29wZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgY29kZSA9IF9hLmNvZGUsIHRhYmxlID0gX2EudGFibGUsIF9iID0gX2EubG93ZXJfYm91bmQsIGxvd2VyX2JvdW5kID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2IsIF9jID0gX2EudXBwZXJfYm91bmQsIHVwcGVyX2JvdW5kID0gX2MgPT09IHZvaWQgMCA/ICcnIDogX2MsIF9kID0gX2EubGltaXQsIGxpbWl0ID0gX2QgPT09IHZvaWQgMCA/IDEwIDogX2Q7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2UpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF90YWJsZV9ieV9zY29wZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlcl9ib3VuZDogbG93ZXJfYm91bmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXJfYm91bmQ6IHVwcGVyX2JvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Uuc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IHN1YnNldCBvZiBgYXZhaWxhYmxlS2V5c2AgbmVlZGVkIHRvIG1lZXQgYXV0aG9yaXRpZXMgaW4gYHRyYW5zYWN0aW9uYC4gSW1wbGVtZW50cyBgQXV0aG9yaXR5UHJvdmlkZXJgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0UmVxdWlyZWRLZXlzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBlb3Nqc19udW1lcmljXzEuY29udmVydExlZ2FjeVB1YmxpY0tleXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3JlcXVpcmVkX2tleXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBhcmdzLnRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVfa2V5czogYXJncy5hdmFpbGFibGVLZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2EuYXBwbHkodm9pZCAwLCBbKF9iLnNlbnQoKSkucmVxdWlyZWRfa2V5c10pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUHVzaCBhIHNlcmlhbGl6ZWQgdHJhbnNhY3Rpb24gKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5wdXNoX3RyYW5zYWN0aW9uID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBzaWduYXR1cmVzID0gX2Euc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gX2Euc2VyaWFsaXplZFRyYW5zYWN0aW9uO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9wdXNoX3RyYW5zYWN0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja2VkX2NvbnRleHRfZnJlZV9kYXRhOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWNrZWRfdHJ4OiBhcnJheVRvSGV4KHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvZGJfc2l6ZS9nZXRgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZGJfc2l6ZV9nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2RiX3NpemUvZ2V0Jywge30pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9oaXN0b3J5L2dldF9hY3Rpb25zYCAqL1xuICAgIEpzb25ScGMucHJvdG90eXBlLmhpc3RvcnlfZ2V0X2FjdGlvbnMgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUsIHBvcywgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChwb3MgPT09IHZvaWQgMCkgeyBwb3MgPSBudWxsOyB9XG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2hpc3RvcnkvZ2V0X2FjdGlvbnMnLCB7IGFjY291bnRfbmFtZTogYWNjb3VudE5hbWUsIHBvczogcG9zLCBvZmZzZXQ6IG9mZnNldCB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvaGlzdG9yeS9nZXRfdHJhbnNhY3Rpb25gICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuaGlzdG9yeV9nZXRfdHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoaWQsIGJsb2NrTnVtSGludCkge1xuICAgICAgICBpZiAoYmxvY2tOdW1IaW50ID09PSB2b2lkIDApIHsgYmxvY2tOdW1IaW50ID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9oaXN0b3J5L2dldF90cmFuc2FjdGlvbicsIHsgaWQ6IGlkLCBibG9ja19udW1faGludDogYmxvY2tOdW1IaW50IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9oaXN0b3J5L2dldF9rZXlfYWNjb3VudHNgICovXG4gICAgSnNvblJwYy5wcm90b3R5cGUuaGlzdG9yeV9nZXRfa2V5X2FjY291bnRzID0gZnVuY3Rpb24gKHB1YmxpY0tleSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9oaXN0b3J5L2dldF9rZXlfYWNjb3VudHMnLCB7IHB1YmxpY19rZXk6IHB1YmxpY0tleSB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvaGlzdG9yeS9nZXRfY29udHJvbGxlZF9hY2NvdW50c2AgKi9cbiAgICBKc29uUnBjLnByb3RvdHlwZS5oaXN0b3J5X2dldF9jb250cm9sbGVkX2FjY291bnRzID0gZnVuY3Rpb24gKGNvbnRyb2xsaW5nQWNjb3VudCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9oaXN0b3J5L2dldF9jb250cm9sbGVkX2FjY291bnRzJywgeyBjb250cm9sbGluZ19hY2NvdW50OiBjb250cm9sbGluZ0FjY291bnQgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBKc29uUnBjO1xufSgpKTsgLy8gSnNvblJwY1xuZXhwb3J0cy5Kc29uUnBjID0gSnNvblJwYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVvc2pzLWpzb25ycGMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEBtb2R1bGUgU2VyaWFsaXplXG4gKi9cbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbnVtZXJpYyA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XG4vKiogU3RhdGUgZm9yIHNlcmlhbGl6ZSgpIGFuZCBkZXNlcmlhbGl6ZSgpICovXG52YXIgU2VyaWFsaXplclN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlcmlhbGl6ZXJTdGF0ZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIC8qKiBIYXZlIGFueSBiaW5hcnkgZXh0ZW5zaW9ucyBiZWVuIHNraXBwZWQ/ICovXG4gICAgICAgIHRoaXMuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gU2VyaWFsaXplclN0YXRlO1xufSgpKTtcbmV4cG9ydHMuU2VyaWFsaXplclN0YXRlID0gU2VyaWFsaXplclN0YXRlO1xuLyoqIFNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgZGF0YSAqL1xudmFyIFNlcmlhbEJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gX19uYW1lZFBhcmFtZXRlcnNcbiAgICAgKiAgICAqIGBhcnJheWA6IGBudWxsYCBpZiBzZXJpYWxpemluZywgb3IgYmluYXJ5IGRhdGEgdG8gZGVzZXJpYWxpemVcbiAgICAgKiAgICAqIGB0ZXh0RW5jb2RlcmA6IGBUZXh0RW5jb2RlcmAgaW5zdGFuY2UgdG8gdXNlLiBQYXNzIGluIGBudWxsYCBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxuICAgICAqICAgICogYHRleHREZWNvZGVyYDogYFRleHREZWNpZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2VyaWFsQnVmZmVyKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCB0ZXh0RW5jb2RlciA9IF9iLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlciA9IF9iLnRleHREZWNvZGVyLCBhcnJheSA9IF9iLmFycmF5O1xuICAgICAgICAvKiogQ3VycmVudCBwb3NpdGlvbiB3aGlsZSByZWFkaW5nIChkZXNlcmlhbGl6aW5nKSAqL1xuICAgICAgICB0aGlzLnJlYWRQb3MgPSAwO1xuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXkgfHwgbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXIgfHwgbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlciB8fCBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgeyBmYXRhbDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgLyoqIFJlc2l6ZSBgYXJyYXlgIGlmIG5lZWRlZCB0byBoYXZlIGF0IGxlYXN0IGBzaXplYCBieXRlcyBmcmVlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5yZXNlcnZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoICsgc2l6ZSA8PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsID0gdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgICAgIHdoaWxlICh0aGlzLmxlbmd0aCArIHNpemUgPiBsKSB7XG4gICAgICAgICAgICBsID0gTWF0aC5jZWlsKGwgKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdBcnJheSA9IG5ldyBVaW50OEFycmF5KGwpO1xuICAgICAgICBuZXdBcnJheS5zZXQodGhpcy5hcnJheSk7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXdBcnJheTtcbiAgICB9O1xuICAgIC8qKiBJcyB0aGVyZSBkYXRhIGF2YWlsYWJsZSB0byByZWFkPyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuaGF2ZVJlYWREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkUG9zIDwgdGhpcy5sZW5ndGg7XG4gICAgfTtcbiAgICAvKiogUmVzdGFydCByZWFkaW5nIGZyb20gdGhlIGJlZ2lubmluZyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucmVzdGFydFJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVhZFBvcyA9IDA7XG4gICAgfTtcbiAgICAvKiogUmV0dXJuIGRhdGEgd2l0aCBleGNlc3Mgc3RvcmFnZSB0cmltbWVkIGF3YXkgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmFzVWludDhBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQsIHRoaXMubGVuZ3RoKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYnl0ZXMgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBcnJheSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucmVzZXJ2ZSh2Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYXJyYXkuc2V0KHYsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gdi5sZW5ndGg7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGJ5dGVzICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdltfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIHNpbmdsZSBieXRlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlbdGhpcy5yZWFkUG9zKytdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYnl0ZXMgaW4gYHZgLiBUaHJvd3MgaWYgYGxlbmAgZG9lc24ndCBtYXRjaCBgdi5sZW5ndGhgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVWludDhBcnJheUNoZWNrZWQgPSBmdW5jdGlvbiAodiwgbGVuKSB7XG4gICAgICAgIGlmICh2Lmxlbmd0aCAhPT0gbGVuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JpbmFyeSBkYXRhIGhhcyBpbmNvcnJlY3Qgc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xuICAgIH07XG4gICAgLyoqIEdldCBgbGVuYCBieXRlcyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VWludDhBcnJheSA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZFBvcyArIGxlbiA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQgKyB0aGlzLnJlYWRQb3MsIGxlbik7XG4gICAgICAgIHRoaXMucmVhZFBvcyArPSBsZW47XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHVpbnQxNmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hVaW50MTYgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2goKHYgPj4gMCkgJiAweGZmLCAodiA+PiA4KSAmIDB4ZmYpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGB1aW50MTZgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRVaW50MTYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ID0gMDtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDA7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCA4O1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgdWludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFVpbnQzMiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaCgodiA+PiAwKSAmIDB4ZmYsICh2ID4+IDgpICYgMHhmZiwgKHYgPj4gMTYpICYgMHhmZiwgKHYgPj4gMjQpICYgMHhmZik7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYHVpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHYgPSAwO1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgMDtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDg7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAxNjtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDI0O1xuICAgICAgICByZXR1cm4gdiA+Pj4gMDtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgdWludDY0YC4gKkNhdXRpb24qOiBgbnVtYmVyYCBvbmx5IGhhcyA1MyBiaXRzIG9mIHByZWNpc2lvbiAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaE51bWJlckFzVWludDY0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoVWludDMyKHYgPj4+IDApO1xuICAgICAgICB0aGlzLnB1c2hVaW50MzIoTWF0aC5mbG9vcih2IC8gNDI5NDk2NzI5NikgPj4+IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGEgYHVpbnQ2NGAgYXMgYSBgbnVtYmVyYC4gKkNhdXRpb24qOiBgbnVtYmVyYCBvbmx5IGhhcyA1MyBiaXRzIG9mIHByZWNpc2lvbjsgc29tZSB2YWx1ZXMgd2lsbCBjaGFuZ2UuXG4gICAgICogYG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKHNlcmlhbEJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKWAgcmVjb21tZW5kZWQgaW5zdGVhZFxuICAgICAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VWludDY0QXNOdW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb3cgPSB0aGlzLmdldFVpbnQzMigpO1xuICAgICAgICB2YXIgaGlnaCA9IHRoaXMuZ2V0VWludDMyKCk7XG4gICAgICAgIHJldHVybiAoaGlnaCA+Pj4gMCkgKiA0Mjk0OTY3Mjk2ICsgKGxvdyA+Pj4gMCk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHZhcnVpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hWYXJ1aW50MzIgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHYgPj4+IDcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2goMHg4MCB8ICh2ICYgMHg3ZikpO1xuICAgICAgICAgICAgICAgIHYgPSB2ID4+PiA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYHZhcnVpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFZhcnVpbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHYgPSAwO1xuICAgICAgICB2YXIgYml0ID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBiID0gdGhpcy5nZXQoKTtcbiAgICAgICAgICAgIHYgfD0gKGIgJiAweDdmKSA8PCBiaXQ7XG4gICAgICAgICAgICBiaXQgKz0gNztcbiAgICAgICAgICAgIGlmICghKGIgJiAweDgwKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ID4+PiAwO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGB2YXJpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hWYXJpbnQzMiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaFZhcnVpbnQzMigodiA8PCAxKSBeICh2ID4+IDMxKSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYHZhcmludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VmFyaW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5nZXRWYXJ1aW50MzIoKTtcbiAgICAgICAgaWYgKHYgJiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKCh+dikgPj4gMSkgfCAyMTQ3NDgzNjQ4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHYgPj4+IDE7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgZmxvYXQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hGbG9hdDMyID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkobmV3IFVpbnQ4QXJyYXkoKG5ldyBGbG9hdDMyQXJyYXkoW3ZdKSkuYnVmZmVyKSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYGZsb2F0MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRGbG9hdDMyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmdldFVpbnQ4QXJyYXkoNCkuc2xpY2UoKS5idWZmZXIpWzBdO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBmbG9hdDY0YCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEZsb2F0NjQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hBcnJheShuZXcgVWludDhBcnJheSgobmV3IEZsb2F0NjRBcnJheShbdl0pKS5idWZmZXIpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgZmxvYXQ2NGAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldEZsb2F0NjQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuZ2V0VWludDhBcnJheSg4KS5zbGljZSgpLmJ1ZmZlcilbMF07XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYG5hbWVgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoTmFtZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoYXJUb1N5bWJvbChjKSB7XG4gICAgICAgICAgICBpZiAoYyA+PSAnYScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICd6Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjIC0gJ2EnLmNoYXJDb2RlQXQoMCkpICsgNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID49ICcxJy5jaGFyQ29kZUF0KDApICYmIGMgPD0gJzUnLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGMgLSAnMScuY2hhckNvZGVBdCgwKSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGEgPSBuZXcgVWludDhBcnJheSg4KTtcbiAgICAgICAgdmFyIGJpdCA9IDYzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjID0gY2hhclRvU3ltYm9sKHMuY2hhckNvZGVBdChpKSk7XG4gICAgICAgICAgICBpZiAoYml0IDwgNSkge1xuICAgICAgICAgICAgICAgIGMgPSBjIDw8IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gNDsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAgICAgICBpZiAoYml0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYVtNYXRoLmZsb29yKGJpdCAvIDgpXSB8PSAoKGMgPj4gaikgJiAxKSA8PCAoYml0ICUgOCk7XG4gICAgICAgICAgICAgICAgICAgIC0tYml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hBcnJheShhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgbmFtZWAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRVaW50OEFycmF5KDgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAodmFyIGJpdCA9IDYzOyBiaXQgPj0gMDspIHtcbiAgICAgICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJpdCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSAoYyA8PCAxKSB8ICgoYVtNYXRoLmZsb29yKGJpdCAvIDgpXSA+PiAoYml0ICUgOCkpICYgMSk7XG4gICAgICAgICAgICAgICAgICAgIC0tYml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID49IDYpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjICsgJ2EnLmNoYXJDb2RlQXQoMCkgLSA2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGMgPj0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgKyAnMScuY2hhckNvZGVBdCgwKSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAocmVzdWx0LmVuZHNXaXRoKCcuJykpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHIoMCwgcmVzdWx0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGxlbmd0aC1wcmVmaXhlZCBiaW5hcnkgZGF0YSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEJ5dGVzID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoVmFydWludDMyKHYubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkodik7XG4gICAgfTtcbiAgICAvKiogR2V0IGxlbmd0aC1wcmVmaXhlZCBiaW5hcnkgZGF0YSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0Qnl0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQ4QXJyYXkodGhpcy5nZXRWYXJ1aW50MzIoKSk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgc3RyaW5nICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU3RyaW5nID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoQnl0ZXModGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUodikpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIHN0cmluZyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUodGhpcy5nZXRCeXRlcygpKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgc3ltYm9sX2NvZGVgLiBVbmxpa2UgYHN5bWJvbGAsIGBzeW1ib2xfY29kZWAgZG9lc24ndCBpbmNsdWRlIGEgcHJlY2lzaW9uLiAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFN5bWJvbENvZGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHN5bWJvbF9jb2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgYS5wdXNoLmFwcGx5KGEsIF9fc3ByZWFkKHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG5hbWUpKSk7XG4gICAgICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIGEucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hBcnJheShhLnNsaWNlKDAsIDgpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgc3ltYm9sX2NvZGVgLiBVbmxpa2UgYHN5bWJvbGAsIGBzeW1ib2xfY29kZWAgZG9lc24ndCBpbmNsdWRlIGEgcHJlY2lzaW9uLiAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0U3ltYm9sQ29kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHZhciBsZW47XG4gICAgICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKSB7XG4gICAgICAgICAgICBpZiAoIWFbbGVuXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBzeW1ib2xgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU3ltYm9sID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBuYW1lID0gX2EubmFtZSwgcHJlY2lzaW9uID0gX2EucHJlY2lzaW9uO1xuICAgICAgICB2YXIgYSA9IFtwcmVjaXNpb24gJiAweGZmXTtcbiAgICAgICAgYS5wdXNoLmFwcGx5KGEsIF9fc3ByZWFkKHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG5hbWUpKSk7XG4gICAgICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIGEucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hBcnJheShhLnNsaWNlKDAsIDgpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgc3ltYm9sYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0U3ltYm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gdGhpcy5nZXQoKTtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoNyk7XG4gICAgICAgIHZhciBsZW47XG4gICAgICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKSB7XG4gICAgICAgICAgICBpZiAoIWFbbGVuXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XG4gICAgICAgIHJldHVybiB7IG5hbWU6IG5hbWUsIHByZWNpc2lvbjogcHJlY2lzaW9uIH07XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGFuIGFzc2V0ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoQXNzZXQgPSBmdW5jdGlvbiAocykge1xuICAgICAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIGFzc2V0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcyA9IHMudHJpbSgpO1xuICAgICAgICB2YXIgcG9zID0gMDtcbiAgICAgICAgdmFyIGFtb3VudCA9ICcnO1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gMDtcbiAgICAgICAgaWYgKHNbcG9zXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBhbW91bnQgKz0gJy0nO1xuICAgICAgICAgICAgKytwb3M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvdW5kRGlnaXQgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHBvcyA8IHMubGVuZ3RoICYmIHMuY2hhckNvZGVBdChwb3MpID49ICcwJy5jaGFyQ29kZUF0KDApICYmIHMuY2hhckNvZGVBdChwb3MpIDw9ICc5Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICBmb3VuZERpZ2l0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGFtb3VudCArPSBzW3Bvc107XG4gICAgICAgICAgICArK3BvcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kRGlnaXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXNzZXQgbXVzdCBiZWdpbiB3aXRoIGEgbnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNbcG9zXSA9PT0gJy4nKSB7XG4gICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBzLmxlbmd0aCAmJiBzLmNoYXJDb2RlQXQocG9zKSA+PSAnMCcuY2hhckNvZGVBdCgwKSAmJiBzLmNoYXJDb2RlQXQocG9zKSA8PSAnOScuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICAgICAgICAgIGFtb3VudCArPSBzW3Bvc107XG4gICAgICAgICAgICAgICAgKytwcmVjaXNpb247XG4gICAgICAgICAgICAgICAgKytwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSBzLnN1YnN0cihwb3MpLnRyaW0oKTtcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkobnVtZXJpYy5zaWduZWREZWNpbWFsVG9CaW5hcnkoOCwgYW1vdW50KSk7XG4gICAgICAgIHRoaXMucHVzaFN5bWJvbCh7IG5hbWU6IG5hbWUsIHByZWNpc2lvbjogcHJlY2lzaW9uIH0pO1xuICAgIH07XG4gICAgLyoqIEdldCBhbiBhc3NldCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0QXNzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbW91bnQgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHZhciBfYSA9IHRoaXMuZ2V0U3ltYm9sKCksIG5hbWUgPSBfYS5uYW1lLCBwcmVjaXNpb24gPSBfYS5wcmVjaXNpb247XG4gICAgICAgIHZhciBzID0gbnVtZXJpYy5zaWduZWRCaW5hcnlUb0RlY2ltYWwoYW1vdW50LCBwcmVjaXNpb24gKyAxKTtcbiAgICAgICAgaWYgKHByZWNpc2lvbikge1xuICAgICAgICAgICAgcyA9IHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gcHJlY2lzaW9uKSArICcuJyArIHMuc3Vic3RyKHMubGVuZ3RoIC0gcHJlY2lzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcyArICcgJyArIG5hbWU7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgcHVibGljIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFB1YmxpY0tleSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHZhciBrZXkgPSBudW1lcmljLnN0cmluZ1RvUHVibGljS2V5KHMpO1xuICAgICAgICB0aGlzLnB1c2goa2V5LnR5cGUpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgcHVibGljIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0KCk7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHVibGljS2V5RGF0YVNpemUpO1xuICAgICAgICByZXR1cm4gbnVtZXJpYy5wdWJsaWNLZXlUb1N0cmluZyh7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfSk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgcHJpdmF0ZSBrZXkgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hQcml2YXRlS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9Qcml2YXRlS2V5KHMpO1xuICAgICAgICB0aGlzLnB1c2goa2V5LnR5cGUpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgcHJpdmF0ZSBrZXkgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFByaXZhdGVLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXQoKTtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkobnVtZXJpYy5wcml2YXRlS2V5RGF0YVNpemUpO1xuICAgICAgICByZXR1cm4gbnVtZXJpYy5wcml2YXRlS2V5VG9TdHJpbmcoeyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH0pO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIHNpZ25hdHVyZSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFNpZ25hdHVyZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHZhciBrZXkgPSBudW1lcmljLnN0cmluZ1RvU2lnbmF0dXJlKHMpO1xuICAgICAgICB0aGlzLnB1c2goa2V5LnR5cGUpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgc2lnbmF0dXJlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTaWduYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXQoKTtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkobnVtZXJpYy5zaWduYXR1cmVEYXRhU2l6ZSk7XG4gICAgICAgIHJldHVybiBudW1lcmljLnNpZ25hdHVyZVRvU3RyaW5nKHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZXJpYWxCdWZmZXI7XG59KCkpOyAvLyBTZXJpYWxCdWZmZXJcbmV4cG9ydHMuU2VyaWFsQnVmZmVyID0gU2VyaWFsQnVmZmVyO1xuLyoqIElzIHRoaXMgYSBzdXBwb3J0ZWQgQUJJIHZlcnNpb24/ICovXG5mdW5jdGlvbiBzdXBwb3J0ZWRBYmlWZXJzaW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gdmVyc2lvbi5zdGFydHNXaXRoKCdlb3Npbzo6YWJpLzEuJyk7XG59XG5leHBvcnRzLnN1cHBvcnRlZEFiaVZlcnNpb24gPSBzdXBwb3J0ZWRBYmlWZXJzaW9uO1xuZnVuY3Rpb24gY2hlY2tEYXRlUGFyc2UoZGF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBEYXRlLnBhcnNlKGRhdGUpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGltZSBmb3JtYXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgdGltZV9wb2ludGAgKG1pbGlzZWNvbmRzIHNpbmNlIGVwb2NoKSAqL1xuZnVuY3Rpb24gZGF0ZVRvVGltZVBvaW50KGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjaGVja0RhdGVQYXJzZShkYXRlICsgJ1onKSAqIDEwMDApO1xufVxuZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnQgPSBkYXRlVG9UaW1lUG9pbnQ7XG4vKiogQ29udmVydCBgdGltZV9wb2ludGAgKG1pbGlzZWNvbmRzIHNpbmNlIGVwb2NoKSB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cbmZ1bmN0aW9uIHRpbWVQb2ludFRvRGF0ZSh1cykge1xuICAgIHZhciBzID0gKG5ldyBEYXRlKHVzIC8gMTAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59XG5leHBvcnRzLnRpbWVQb2ludFRvRGF0ZSA9IHRpbWVQb2ludFRvRGF0ZTtcbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSAqL1xuZnVuY3Rpb24gZGF0ZVRvVGltZVBvaW50U2VjKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjaGVja0RhdGVQYXJzZShkYXRlICsgJ1onKSAvIDEwMDApO1xufVxuZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnRTZWMgPSBkYXRlVG9UaW1lUG9pbnRTZWM7XG4vKiogQ29udmVydCBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSB0byB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cbmZ1bmN0aW9uIHRpbWVQb2ludFNlY1RvRGF0ZShzZWMpIHtcbiAgICB2YXIgcyA9IChuZXcgRGF0ZShzZWMgKiAxMDAwKSkudG9JU09TdHJpbmcoKTtcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlID0gdGltZVBvaW50U2VjVG9EYXRlO1xuLyoqIENvbnZlcnQgZGF0ZSBpbiBJU08gZm9ybWF0IHRvIGBibG9ja190aW1lc3RhbXBfdHlwZWAgKGhhbGYtc2Vjb25kcyBzaW5jZSBhIGRpZmZlcmVudCBlcG9jaCkgKi9cbmZ1bmN0aW9uIGRhdGVUb0Jsb2NrVGltZXN0YW1wKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoY2hlY2tEYXRlUGFyc2UoZGF0ZSArICdaJykgLSA5NDY2ODQ4MDAwMDApIC8gNTAwKTtcbn1cbmV4cG9ydHMuZGF0ZVRvQmxvY2tUaW1lc3RhbXAgPSBkYXRlVG9CbG9ja1RpbWVzdGFtcDtcbi8qKiBDb252ZXJ0IGBibG9ja190aW1lc3RhbXBfdHlwZWAgKGhhbGYtc2Vjb25kcyBzaW5jZSBhIGRpZmZlcmVudCBlcG9jaCkgdG8gdG8gZGF0ZSBpbiBJU08gZm9ybWF0ICovXG5mdW5jdGlvbiBibG9ja1RpbWVzdGFtcFRvRGF0ZShzbG90KSB7XG4gICAgdmFyIHMgPSAobmV3IERhdGUoc2xvdCAqIDUwMCArIDk0NjY4NDgwMDAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59XG5leHBvcnRzLmJsb2NrVGltZXN0YW1wVG9EYXRlID0gYmxvY2tUaW1lc3RhbXBUb0RhdGU7XG4vKiogQ29udmVydCBgc3RyaW5nYCB0byBgU3ltYm9sYC4gZm9ybWF0OiBgcHJlY2lzaW9uLE5BTUVgLiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9TeW1ib2wocykge1xuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBzeW1ib2wnKTtcbiAgICB9XG4gICAgdmFyIG0gPSBzLm1hdGNoKC9eKFswLTldKyksKFtBLVpdKykkLyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzeW1ib2wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbmFtZTogbVsyXSwgcHJlY2lzaW9uOiArbVsxXSB9O1xufVxuZXhwb3J0cy5zdHJpbmdUb1N5bWJvbCA9IHN0cmluZ1RvU3ltYm9sO1xuLyoqIENvbnZlcnQgYFN5bWJvbGAgdG8gYHN0cmluZ2AuIGZvcm1hdDogYHByZWNpc2lvbixOQU1FYC4gKi9cbmZ1bmN0aW9uIHN5bWJvbFRvU3RyaW5nKF9hKSB7XG4gICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBwcmVjaXNpb24gPSBfYS5wcmVjaXNpb247XG4gICAgcmV0dXJuIHByZWNpc2lvbiArICcsJyArIG5hbWU7XG59XG5leHBvcnRzLnN5bWJvbFRvU3RyaW5nID0gc3ltYm9sVG9TdHJpbmc7XG4vKiogQ29udmVydCBiaW5hcnkgZGF0YSB0byBoZXggKi9cbmZ1bmN0aW9uIGFycmF5VG9IZXgoZGF0YSkge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBkYXRhXzEgPSBfX3ZhbHVlcyhkYXRhKSwgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpOyAhZGF0YV8xXzEuZG9uZTsgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGRhdGFfMV8xLnZhbHVlO1xuICAgICAgICAgICAgcmVzdWx0ICs9ICgnMDAnICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGRhdGFfMV8xICYmICFkYXRhXzFfMS5kb25lICYmIChfYSA9IGRhdGFfMS5yZXR1cm4pKSBfYS5jYWxsKGRhdGFfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnRvVXBwZXJDYXNlKCk7XG59XG5leHBvcnRzLmFycmF5VG9IZXggPSBhcnJheVRvSGV4O1xuLyoqIENvbnZlcnQgaGV4IHRvIGJpbmFyeSBkYXRhICovXG5mdW5jdGlvbiBoZXhUb1VpbnQ4QXJyYXkoaGV4KSB7XG4gICAgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgaGV4IGRpZ2l0cycpO1xuICAgIH1cbiAgICBpZiAoaGV4Lmxlbmd0aCAlIDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPZGQgbnVtYmVyIG9mIGhleCBkaWdpdHMnKTtcbiAgICB9XG4gICAgdmFyIGwgPSBoZXgubGVuZ3RoIC8gMjtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkobCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgdmFyIHggPSBwYXJzZUludChoZXguc3Vic3RyKGkgKiAyLCAyKSwgMTYpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGhleCBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV0gPSB4O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkgPSBoZXhUb1VpbnQ4QXJyYXk7XG5mdW5jdGlvbiBzZXJpYWxpemVVbmtub3duKGJ1ZmZlciwgZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRG9uXFwndCBrbm93IGhvdyB0byBzZXJpYWxpemUgJyArIHRoaXMubmFtZSk7XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVVua25vd24oYnVmZmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEb25cXCd0IGtub3cgaG93IHRvIGRlc2VyaWFsaXplICcgKyB0aGlzLm5hbWUpO1xufVxuZnVuY3Rpb24gc2VyaWFsaXplU3RydWN0KGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gbmV3IFNlcmlhbGl6ZXJTdGF0ZSgpOyB9XG4gICAgaWYgKGFsbG93RXh0ZW5zaW9ucyA9PT0gdm9pZCAwKSB7IGFsbG93RXh0ZW5zaW9ucyA9IHRydWU7IH1cbiAgICB2YXIgZV8yLCBfYTtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgb2JqZWN0IGNvbnRhaW5pbmcgZGF0YTogJyArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYmFzZSkge1xuICAgICAgICB0aGlzLmJhc2Uuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5maWVsZHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChmaWVsZC5uYW1lIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgJyArIHRoaXMubmFtZSArICcuJyArIGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC50eXBlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGFbZmllbGQubmFtZV0sIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMgJiYgZmllbGQgPT09IHRoaXMuZmllbGRzW3RoaXMuZmllbGRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgJiYgZmllbGQudHlwZS5leHRlbnNpb25PZikge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5za2lwcGVkQmluYXJ5RXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyAnICsgdGhpcy5uYW1lICsgJy4nICsgZmllbGQubmFtZSArICcgKHR5cGU9JyArIGZpZWxkLnR5cGUubmFtZSArICcpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplU3RydWN0KGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gbmV3IFNlcmlhbGl6ZXJTdGF0ZSgpOyB9XG4gICAgaWYgKGFsbG93RXh0ZW5zaW9ucyA9PT0gdm9pZCAwKSB7IGFsbG93RXh0ZW5zaW9ucyA9IHRydWU7IH1cbiAgICB2YXIgZV8zLCBfYTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmICh0aGlzLmJhc2UpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5iYXNlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB7fTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzLmZpZWxkcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGFsbG93RXh0ZW5zaW9ucyAmJiBmaWVsZC50eXBlLmV4dGVuc2lvbk9mICYmICFidWZmZXIuaGF2ZVJlYWREYXRhKCkpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5za2lwcGVkQmluYXJ5RXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtmaWVsZC5uYW1lXSA9IGZpZWxkLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZVZhcmlhbnQoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpIHx8IGRhdGEubGVuZ3RoICE9PSAyIHx8IHR5cGVvZiBkYXRhWzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHZhcmlhbnQ6IFtcInR5cGVcIiwgdmFsdWVdJyk7XG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5maWVsZHMuZmluZEluZGV4KGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gZmllbGQubmFtZSA9PT0gZGF0YVswXTsgfSk7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgXFxcIlwiICsgZGF0YVswXSArIFwiXFxcIiBpcyBub3QgdmFsaWQgZm9yIHZhcmlhbnRcIik7XG4gICAgfVxuICAgIGJ1ZmZlci5wdXNoVmFydWludDMyKGkpO1xuICAgIHRoaXMuZmllbGRzW2ldLnR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YVsxXSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVZhcmlhbnQoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGkgPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XG4gICAgaWYgKGkgPj0gdGhpcy5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgaW5kZXggXCIgKyBpICsgXCIgaXMgbm90IHZhbGlkIGZvciB2YXJpYW50XCIpO1xuICAgIH1cbiAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkc1tpXTtcbiAgICByZXR1cm4gW2ZpZWxkLm5hbWUsIGZpZWxkLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKV07XG59XG5mdW5jdGlvbiBzZXJpYWxpemVBcnJheShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgZV80LCBfYTtcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihkYXRhLmxlbmd0aCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgZGF0YV8yID0gX192YWx1ZXMoZGF0YSksIGRhdGFfMl8xID0gZGF0YV8yLm5leHQoKTsgIWRhdGFfMl8xLmRvbmU7IGRhdGFfMl8xID0gZGF0YV8yLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhXzJfMS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZi5zZXJpYWxpemUoYnVmZmVyLCBpdGVtLCBzdGF0ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzRfMSkgeyBlXzQgPSB7IGVycm9yOiBlXzRfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGF0YV8yXzEgJiYgIWRhdGFfMl8xLmRvbmUgJiYgKF9hID0gZGF0YV8yLnJldHVybikpIF9hLmNhbGwoZGF0YV8yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVBcnJheShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgbGVuID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXJyYXlPZi5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBmYWxzZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gc2VyaWFsaXplT3B0aW9uYWwoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgaWYgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoKDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYnVmZmVyLnB1c2goMSk7XG4gICAgICAgIHRoaXMub3B0aW9uYWxPZi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZU9wdGlvbmFsKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIGlmIChidWZmZXIuZ2V0KCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWxPZi5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VyaWFsaXplRXh0ZW5zaW9uKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIHRoaXMuZXh0ZW5zaW9uT2Yuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZUV4dGVuc2lvbihidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25PZi5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xufVxuZnVuY3Rpb24gY3JlYXRlVHlwZShhdHRycykge1xuICAgIHJldHVybiBfX2Fzc2lnbih7IG5hbWU6ICc8bWlzc2luZyBuYW1lPicsIGFsaWFzT2ZOYW1lOiAnJywgYXJyYXlPZjogbnVsbCwgb3B0aW9uYWxPZjogbnVsbCwgZXh0ZW5zaW9uT2Y6IG51bGwsIGJhc2VOYW1lOiAnJywgYmFzZTogbnVsbCwgZmllbGRzOiBbXSwgc2VyaWFsaXplOiBzZXJpYWxpemVVbmtub3duLCBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVVbmtub3duIH0sIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIGNoZWNrUmFuZ2Uob3JpZywgY29udmVydGVkKSB7XG4gICAgaWYgKE51bWJlci5pc05hTigrb3JpZykgfHwgTnVtYmVyLmlzTmFOKCtjb252ZXJ0ZWQpIHx8ICh0eXBlb2Ygb3JpZyAhPT0gJ251bWJlcicgJiYgdHlwZW9mIG9yaWcgIT09ICdzdHJpbmcnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAoK29yaWcgIT09ICtjb252ZXJ0ZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdW1iZXIgaXMgb3V0IG9mIHJhbmdlJyk7XG4gICAgfVxuICAgIHJldHVybiArb3JpZztcbn1cbi8qKiBDcmVhdGUgdGhlIHNldCBvZiB0eXBlcyBidWlsdC1pbiB0byB0aGUgYWJpIGZvcm1hdCAqL1xuZnVuY3Rpb24gY3JlYXRlSW5pdGlhbFR5cGVzKCkge1xuICAgIHZhciByZXN1bHQgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHtcbiAgICAgICAgYm9vbDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYm9vbCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRydWUgb3IgZmFsc2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZGF0YSA/IDEgOiAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gISFidWZmZXIuZ2V0KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB1aW50ODogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndWludDgnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSAmIDB4ZmYpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBpbnQ4OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQ4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaChjaGVja1JhbmdlKGRhdGEsIGRhdGEgPDwgMjQgPj4gMjQpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCkgPDwgMjQgPj4gMjQ7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB1aW50MTY6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3VpbnQxNicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MTYoY2hlY2tSYW5nZShkYXRhLCBkYXRhICYgMHhmZmZmKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQxNigpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50MTY6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2ludDE2JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQxNihjaGVja1JhbmdlKGRhdGEsIGRhdGEgPDwgMTYgPj4gMTYpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDE2KCkgPDwgMTYgPj4gMTY7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB1aW50MzI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3VpbnQzMicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MzIoY2hlY2tSYW5nZShkYXRhLCBkYXRhID4+PiAwKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQzMigpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDY0OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50NjQnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLmRlY2ltYWxUb0JpbmFyeSg4LCAnJyArIGRhdGEpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50NjQ6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2ludDY0JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQXJyYXkobnVtZXJpYy5zaWduZWREZWNpbWFsVG9CaW5hcnkoOCwgJycgKyBkYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQzMicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MzIoY2hlY2tSYW5nZShkYXRhLCBkYXRhIHwgMCkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MzIoKSB8IDA7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB2YXJ1aW50MzI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3ZhcnVpbnQzMicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hWYXJ1aW50MzIoY2hlY2tSYW5nZShkYXRhLCBkYXRhID4+PiAwKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFZhcnVpbnQzMigpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdmFyaW50MzI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3ZhcmludDMyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFZhcmludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSB8IDApKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VmFyaW50MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHVpbnQxMjg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3VpbnQxMjgnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoQXJyYXkobnVtZXJpYy5kZWNpbWFsVG9CaW5hcnkoMTYsICcnICsgZGF0YSkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBpbnQxMjg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2ludDEyOCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDE2LCAnJyArIGRhdGEpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5zaWduZWRCaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGZsb2F0MzI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoRmxvYXQzMihkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQzMigpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgZmxvYXQ2NDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQ2NCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hGbG9hdDY0KGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRGbG9hdDY0KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBmbG9hdDEyODogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQxMjgnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoaGV4VG9VaW50OEFycmF5KGRhdGEpLCAxNik7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgxNikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgYnl0ZXM6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2J5dGVzJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQnl0ZXMoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaEJ5dGVzKGhleFRvVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5vcHRpb25zLmJ5dGVzQXNVaW50OEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXIuZ2V0Qnl0ZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVRvSGV4KGJ1ZmZlci5nZXRCeXRlcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3RyaW5nOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU3RyaW5nKGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIG5hbWU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoTmFtZShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0TmFtZSgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZV9wb2ludDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hOdW1iZXJBc1VpbnQ2NChkYXRlVG9UaW1lUG9pbnQoZGF0YSkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIHRpbWVQb2ludFRvRGF0ZShidWZmZXIuZ2V0VWludDY0QXNOdW1iZXIoKSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lX3BvaW50X3NlYzogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludF9zZWMnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGVUb1RpbWVQb2ludFNlYyhkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gdGltZVBvaW50U2VjVG9EYXRlKGJ1ZmZlci5nZXRVaW50MzIoKSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBibG9ja190aW1lc3RhbXBfdHlwZTogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYmxvY2tfdGltZXN0YW1wX3R5cGUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGVUb0Jsb2NrVGltZXN0YW1wKGRhdGEpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBibG9ja1RpbWVzdGFtcFRvRGF0ZShidWZmZXIuZ2V0VWludDMyKCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3ltYm9sX2NvZGU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3N5bWJvbF9jb2RlJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbENvZGUoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFN5bWJvbENvZGUoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHN5bWJvbDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnc3ltYm9sJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbChzdHJpbmdUb1N5bWJvbChkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gc3ltYm9sVG9TdHJpbmcoYnVmZmVyLmdldFN5bWJvbCgpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGFzc2V0OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hBc3NldChkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0QXNzZXQoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoZWNrc3VtMTYwOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja3N1bTE2MCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChoZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDIwKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBhcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDIwKSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBjaGVja3N1bTI1NjogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnY2hlY2tzdW0yNTYnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoaGV4VG9VaW50OEFycmF5KGRhdGEpLCAzMik7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgY2hlY2tzdW01MTI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2NoZWNrc3VtNTEyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGhleFRvVWludDhBcnJheShkYXRhKSwgNjQpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoNjQpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHB1YmxpY19rZXk6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3B1YmxpY19rZXknLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoUHVibGljS2V5KGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRQdWJsaWNLZXkoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHByaXZhdGVfa2V5OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdwcml2YXRlX2tleScsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hQcml2YXRlS2V5KGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRQcml2YXRlS2V5KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBzaWduYXR1cmU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3NpZ25hdHVyZScsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hTaWduYXR1cmUoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFNpZ25hdHVyZSgpOyB9LFxuICAgICAgICB9KSxcbiAgICB9KSk7XG4gICAgcmVzdWx0LnNldCgnZXh0ZW5kZWRfYXNzZXQnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ2V4dGVuZGVkX2Fzc2V0JyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3F1YW50aXR5JywgdHlwZU5hbWU6ICdhc3NldCcsIHR5cGU6IHJlc3VsdC5nZXQoJ2Fzc2V0JykgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NvbnRyYWN0JywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogcmVzdWx0LmdldCgnbmFtZScpIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59IC8vIGNyZWF0ZUluaXRpYWxUeXBlcygpXG5leHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcyA9IGNyZWF0ZUluaXRpYWxUeXBlcztcbi8qKiBHZXQgdHlwZSBmcm9tIGB0eXBlc2AgKi9cbmZ1bmN0aW9uIGdldFR5cGUodHlwZXMsIG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVzLmdldChuYW1lKTtcbiAgICBpZiAodHlwZSAmJiB0eXBlLmFsaWFzT2ZOYW1lKSB7XG4gICAgICAgIHJldHVybiBnZXRUeXBlKHR5cGVzLCB0eXBlLmFsaWFzT2ZOYW1lKTtcbiAgICB9XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCdbXScpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBhcnJheU9mOiBnZXRUeXBlKHR5cGVzLCBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDIpKSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplQXJyYXksXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVBcnJheSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCc/JykpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG9wdGlvbmFsT2Y6IGdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMSkpLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVPcHRpb25hbCxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZU9wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZXh0ZW5zaW9uT2Y6IGdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMSkpLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVFeHRlbnNpb24sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVFeHRlbnNpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG5hbWUpO1xufVxuZXhwb3J0cy5nZXRUeXBlID0gZ2V0VHlwZTtcbi8qKlxuICogR2V0IHR5cGVzIGZyb20gYWJpXG4gKiBAcGFyYW0gaW5pdGlhbFR5cGVzIFNldCBvZiB0eXBlcyB0byBidWlsZCBvbi5cbiAqICAgICBJbiBtb3N0IGNhc2VzLCBpdCdzIGJlc3QgdG8gZmlsbCB0aGlzIGZyb20gYSBmcmVzaCBjYWxsIHRvIGBnZXRUeXBlc0Zyb21BYmkoKWAuXG4gKi9cbmZ1bmN0aW9uIGdldFR5cGVzRnJvbUFiaShpbml0aWFsVHlwZXMsIGFiaSkge1xuICAgIHZhciBlXzUsIF9hLCBlXzYsIF9iLCBlXzcsIF9jLCBlXzgsIF9kLCBlXzksIF9lO1xuICAgIHZhciB0eXBlcyA9IG5ldyBNYXAoaW5pdGlhbFR5cGVzKTtcbiAgICBpZiAoYWJpLnR5cGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZiA9IF9fdmFsdWVzKGFiaS50eXBlcyksIF9nID0gX2YubmV4dCgpOyAhX2cuZG9uZTsgX2cgPSBfZi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2ggPSBfZy52YWx1ZSwgbmV3X3R5cGVfbmFtZSA9IF9oLm5ld190eXBlX25hbWUsIHR5cGUgPSBfaC50eXBlO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuZXdfdHlwZV9uYW1lLCBjcmVhdGVUeXBlKHsgbmFtZTogbmV3X3R5cGVfbmFtZSwgYWxpYXNPZk5hbWU6IHR5cGUgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2cgJiYgIV9nLmRvbmUgJiYgKF9hID0gX2YucmV0dXJuKSkgX2EuY2FsbChfZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFiaS5zdHJ1Y3RzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaiA9IF9fdmFsdWVzKGFiaS5zdHJ1Y3RzKSwgX2sgPSBfai5uZXh0KCk7ICFfay5kb25lOyBfayA9IF9qLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfbCA9IF9rLnZhbHVlLCBuYW1lXzEgPSBfbC5uYW1lLCBiYXNlID0gX2wuYmFzZSwgZmllbGRzID0gX2wuZmllbGRzO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuYW1lXzEsIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzEsXG4gICAgICAgICAgICAgICAgICAgIGJhc2VOYW1lOiBiYXNlLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IGZpZWxkcy5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IF9hLm5hbWUsIHR5cGUgPSBfYS50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh7IG5hbWU6IG4sIHR5cGVOYW1lOiB0eXBlLCB0eXBlOiBudWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfNl8xKSB7IGVfNiA9IHsgZXJyb3I6IGVfNl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfayAmJiAhX2suZG9uZSAmJiAoX2IgPSBfai5yZXR1cm4pKSBfYi5jYWxsKF9qKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWJpLnZhcmlhbnRzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbSA9IF9fdmFsdWVzKGFiaS52YXJpYW50cyksIF9vID0gX20ubmV4dCgpOyAhX28uZG9uZTsgX28gPSBfbS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3AgPSBfby52YWx1ZSwgbmFtZV8yID0gX3AubmFtZSwgdCA9IF9wLnR5cGVzO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuYW1lXzIsIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogdC5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICh7IG5hbWU6IHMsIHR5cGVOYW1lOiBzLCB0eXBlOiBudWxsIH0pOyB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV83XzEpIHsgZV83ID0geyBlcnJvcjogZV83XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9vICYmICFfby5kb25lICYmIChfYyA9IF9tLnJldHVybikpIF9jLmNhbGwoX20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzcpIHRocm93IGVfNy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIHR5cGVzXzEgPSBfX3ZhbHVlcyh0eXBlcyksIHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpOyAhdHlwZXNfMV8xLmRvbmU7IHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgX3EgPSBfX3JlYWQodHlwZXNfMV8xLnZhbHVlLCAyKSwgbmFtZV8zID0gX3FbMF0sIHR5cGUgPSBfcVsxXTtcbiAgICAgICAgICAgIGlmICh0eXBlLmJhc2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgdHlwZS5iYXNlID0gZ2V0VHlwZSh0eXBlcywgdHlwZS5iYXNlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9yID0gX192YWx1ZXModHlwZS5maWVsZHMpLCBfcyA9IF9yLm5leHQoKTsgIV9zLmRvbmU7IF9zID0gX3IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9zLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC50eXBlID0gZ2V0VHlwZSh0eXBlcywgZmllbGQudHlwZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzlfMSkgeyBlXzkgPSB7IGVycm9yOiBlXzlfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3MgJiYgIV9zLmRvbmUgJiYgKF9lID0gX3IucmV0dXJuKSkgX2UuY2FsbChfcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV85KSB0aHJvdyBlXzkuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV84XzEpIHsgZV84ID0geyBlcnJvcjogZV84XzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVzXzFfMSAmJiAhdHlwZXNfMV8xLmRvbmUgJiYgKF9kID0gdHlwZXNfMS5yZXR1cm4pKSBfZC5jYWxsKHR5cGVzXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV84KSB0aHJvdyBlXzguZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzO1xufSAvLyBnZXRUeXBlc0Zyb21BYmlcbmV4cG9ydHMuZ2V0VHlwZXNGcm9tQWJpID0gZ2V0VHlwZXNGcm9tQWJpO1xuLyoqIFRBUG9TOiBSZXR1cm4gdHJhbnNhY3Rpb24gZmllbGRzIHdoaWNoIHJlZmVyZW5jZSBgcmVmQmxvY2tgIGFuZCBleHBpcmUgYGV4cGlyZVNlY29uZHNgIGFmdGVyIGByZWZCbG9jay50aW1lc3RhbXBgICovXG5mdW5jdGlvbiB0cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jaywgZXhwaXJlU2Vjb25kcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4cGlyYXRpb246IHRpbWVQb2ludFNlY1RvRGF0ZShkYXRlVG9UaW1lUG9pbnRTZWMocmVmQmxvY2sudGltZXN0YW1wKSArIGV4cGlyZVNlY29uZHMpLFxuICAgICAgICByZWZfYmxvY2tfbnVtOiByZWZCbG9jay5ibG9ja19udW0gJiAweGZmZmYsXG4gICAgICAgIHJlZl9ibG9ja19wcmVmaXg6IHJlZkJsb2NrLnJlZl9ibG9ja19wcmVmaXgsXG4gICAgfTtcbn1cbmV4cG9ydHMudHJhbnNhY3Rpb25IZWFkZXIgPSB0cmFuc2FjdGlvbkhlYWRlcjtcbi8qKiBDb252ZXJ0IGFjdGlvbiBkYXRhIHRvIHNlcmlhbGl6ZWQgZm9ybSAoaGV4KSAqL1xuZnVuY3Rpb24gc2VyaWFsaXplQWN0aW9uRGF0YShjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSB7XG4gICAgdmFyIGFjdGlvbiA9IGNvbnRyYWN0LmFjdGlvbnMuZ2V0KG5hbWUpO1xuICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYWN0aW9uIFwiICsgbmFtZSArIFwiIGluIGNvbnRyYWN0IFwiICsgYWNjb3VudCk7XG4gICAgfVxuICAgIHZhciBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGV4dERlY29kZXIgfSk7XG4gICAgYWN0aW9uLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEpO1xuICAgIHJldHVybiBhcnJheVRvSGV4KGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKSk7XG59XG5leHBvcnRzLnNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBzZXJpYWxpemVBY3Rpb25EYXRhO1xuLyoqIFJldHVybiBhY3Rpb24gaW4gc2VyaWFsaXplZCBmb3JtICovXG5mdW5jdGlvbiBzZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgIGRhdGE6IHNlcmlhbGl6ZUFjdGlvbkRhdGEoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlciksXG4gICAgfTtcbn1cbmV4cG9ydHMuc2VyaWFsaXplQWN0aW9uID0gc2VyaWFsaXplQWN0aW9uO1xuLyoqIERlc2VyaWFsaXplIGFjdGlvbiBkYXRhLiBJZiBgZGF0YWAgaXMgYSBgc3RyaW5nYCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgaW4gaGV4LiAqL1xuZnVuY3Rpb24gZGVzZXJpYWxpemVBY3Rpb25EYXRhKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpIHtcbiAgICB2YXIgYWN0aW9uID0gY29udHJhY3QuYWN0aW9ucy5nZXQobmFtZSk7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBkYXRhID0gaGV4VG9VaW50OEFycmF5KGRhdGEpO1xuICAgIH1cbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFjdGlvbiBcIiArIG5hbWUgKyBcIiBpbiBjb250cmFjdCBcIiArIGFjY291bnQpO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyID0gbmV3IFNlcmlhbEJ1ZmZlcih7IHRleHREZWNvZGVyOiB0ZXh0RGVjb2RlciwgdGV4dEVuY29kZXI6IHRleHRFbmNvZGVyIH0pO1xuICAgIGJ1ZmZlci5wdXNoQXJyYXkoZGF0YSk7XG4gICAgcmV0dXJuIGFjdGlvbi5kZXNlcmlhbGl6ZShidWZmZXIpO1xufVxuZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBkZXNlcmlhbGl6ZUFjdGlvbkRhdGE7XG4vKiogRGVzZXJpYWxpemUgYWN0aW9uLiBJZiBgZGF0YWAgaXMgYSBgc3RyaW5nYCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgaW4gaGV4LiAqL1xuZnVuY3Rpb24gZGVzZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgIGRhdGE6IGRlc2VyaWFsaXplQWN0aW9uRGF0YShjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSxcbiAgICB9O1xufVxuZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbiA9IGRlc2VyaWFsaXplQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW9zanMtc2VyaWFsaXplLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=