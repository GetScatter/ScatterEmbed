(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "5lq1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _Blockchains = __webpack_require__("F+MN");

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var checkedOrphanedAccounts = false;

var AccountService =
/*#__PURE__*/
function () {
  function AccountService() {
    (0, _classCallCheck2["default"])(this, AccountService);
  }

  (0, _createClass2["default"])(AccountService, null, [{
    key: "addAccount",
    value: function () {
      var _addAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(account) {
        var scatter;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.addAccount(account);
                return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addAccount(_x) {
        return _addAccount.apply(this, arguments);
      }

      return addAccount;
    }()
  }, {
    key: "removeAccounts",
    value: function () {
      var _removeAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(accounts) {
        var scatter;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                accounts.map(function (account) {
                  return scatter.keychain.removeAccount(account);
                });
                _context2.next = 4;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 4:
                return _context2.abrupt("return", _BalanceService["default"].removeStaleBalances());

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function removeAccounts(_x2) {
        return _removeAccounts.apply(this, arguments);
      }

      return removeAccounts;
    }()
  }, {
    key: "importAllAccounts",
    value: function () {
      var _importAllAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(keypair) {
        var isNewKeypair,
            blockchains,
            networks,
            addOnly,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                isNewKeypair = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
                blockchains = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : null;
                networks = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : null;
                addOnly = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : false;
                return _context5.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4(resolve) {
                    var scatter, accounts, uniques, accountsToRemove;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            scatter = _StoreService["default"].get().state.scatter.clone();
                            accounts = [];
                            if (!networks) networks = scatter.settings.networks;
                            if (!blockchains) blockchains = keypair.blockchains;
                            _context4.next = 6;
                            return Promise.all(blockchains.map(
                            /*#__PURE__*/
                            function () {
                              var _ref2 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee3(blockchain) {
                                var plugin, filteredNetworks;
                                return _regenerator["default"].wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        plugin = _PluginRepository["default"].plugin(blockchain);
                                        filteredNetworks = networks.filter(function (x) {
                                          return x.blockchain === blockchain;
                                        });

                                        if (!(isNewKeypair && plugin.accountsAreImported())) {
                                          _context3.next = 4;
                                          break;
                                        }

                                        return _context3.abrupt("return", true);

                                      case 4:
                                        return _context3.abrupt("return", AccountService.accountsFrom(plugin, filteredNetworks, accounts, keypair));

                                      case 5:
                                      case "end":
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3);
                              }));

                              return function (_x5) {
                                return _ref2.apply(this, arguments);
                              };
                            }()));

                          case 6:
                            uniques = accounts.map(function (x) {
                              return x.unique();
                            });
                            accountsToRemove = scatter.keychain.accounts.filter(function (x) {
                              return x.keypairUnique === keypair.unique() && !uniques.includes(x.unique()) && blockchains.includes(x.blockchain);
                            }); // This method takes a while, re-cloning to make sure we're
                            // always up to date before committing the data to storage.

                            scatter = _StoreService["default"].get().state.scatter.clone();
                            if (!addOnly) accountsToRemove.map(function (account) {
                              return scatter.keychain.removeAccount(account);
                            });
                            accounts.map(function (account) {
                              return scatter.keychain.addAccount(account);
                            });
                            _context4.next = 13;
                            return _BalanceService["default"].removeStaleBalances();

                          case 13:
                            _context4.next = 15;
                            return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

                          case 15:
                            setTimeout(function () {
                              resolve(accounts);
                            }, 100);

                          case 16:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function importAllAccounts(_x3) {
        return _importAllAccounts.apply(this, arguments);
      }

      return importAllAccounts;
    }()
  }, {
    key: "importAllAccountsForNetwork",
    value: function () {
      var _importAllAccountsForNetwork = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(network) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee7(resolve) {
                    var scatter, blockchain, keypairs, accounts, plugin;
                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            scatter = _StoreService["default"].get().state.scatter.clone();
                            blockchain = network.blockchain;
                            keypairs = scatter.keychain.keypairs.filter(function (x) {
                              return x.blockchains.includes(blockchain);
                            });
                            accounts = [];
                            plugin = _PluginRepository["default"].plugin(network.blockchain);
                            _context7.next = 7;
                            return Promise.all(keypairs.map(
                            /*#__PURE__*/
                            function () {
                              var _ref4 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee6(keypair) {
                                return _regenerator["default"].wrap(function _callee6$(_context6) {
                                  while (1) {
                                    switch (_context6.prev = _context6.next) {
                                      case 0:
                                        return _context6.abrupt("return", AccountService.accountsFrom(plugin, [network], accounts, keypair));

                                      case 1:
                                      case "end":
                                        return _context6.stop();
                                    }
                                  }
                                }, _callee6);
                              }));

                              return function (_x8) {
                                return _ref4.apply(this, arguments);
                              };
                            }()));

                          case 7:
                            // This method takes a while, re-cloning to make sure we're
                            // always up to date before committing the data to storage.
                            scatter = _StoreService["default"].get().state.scatter.clone();
                            accounts.map(function (account) {
                              return scatter.keychain.addAccount(account);
                            });
                            _context7.next = 11;
                            return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

                          case 11:
                            resolve(true);

                          case 12:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x7) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function importAllAccountsForNetwork(_x6) {
        return _importAllAccountsForNetwork.apply(this, arguments);
      }

      return importAllAccountsForNetwork;
    }()
    /***
        * Gets accounts from networks
     * @param plugin - Blockchain plugin
     * @param networks - Networks to fetch from
     * @param accounts - (OUT) accounts array to append to
     * @param keypair - Associated keypair
     * @returns {Promise<*>}
     */

  }, {
    key: "accountsFrom",
    value: function () {
      var _accountsFrom = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(plugin, networks, accounts, keypair) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee10(resolve) {
                    return _regenerator["default"].wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!plugin.accountsAreImported()) {
                              _context10.next = 9;
                              break;
                            }

                            _context10.next = 3;
                            return Promise.all(networks.map(
                            /*#__PURE__*/
                            function () {
                              var _ref6 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee9(network) {
                                return _regenerator["default"].wrap(function _callee9$(_context9) {
                                  while (1) {
                                    switch (_context9.prev = _context9.next) {
                                      case 0:
                                        _context9.next = 2;
                                        return plugin.getImportableAccounts(keypair, network);

                                      case 2:
                                        return _context9.abrupt("return", _context9.sent);

                                      case 3:
                                      case "end":
                                        return _context9.stop();
                                    }
                                  }
                                }, _callee9);
                              }));

                              return function (_x14) {
                                return _ref6.apply(this, arguments);
                              };
                            }()));

                          case 3:
                            _context10.t0 = function (acc, arr) {
                              arr.map(function (account) {
                                accounts.push(account);
                              });
                              return acc;
                            };

                            _context10.t1 = [];

                            _context10.sent.reduce(_context10.t0, _context10.t1);

                            resolve(true);
                            _context10.next = 11;
                            break;

                          case 9:
                            networks.map(function (network) {
                              var key = keypair.publicKeys.find(function (x) {
                                return x.blockchain === network.blockchain;
                              });

                              if (key) {
                                accounts.push(_Account["default"].fromJson({
                                  keypairUnique: keypair.unique(),
                                  networkUnique: network.unique(),
                                  publicKey: key.key
                                }));
                              }
                            });
                            resolve(true);

                          case 11:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x13) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function accountsFrom(_x9, _x10, _x11, _x12) {
        return _accountsFrom.apply(this, arguments);
      }

      return accountsFrom;
    }()
  }, {
    key: "incrementAccountLogins",
    value: function () {
      var _incrementAccountLogins = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(accounts) {
        var ids, scatter;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                ids = accounts.map(function (x) {
                  return x.unique();
                });
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.accounts.filter(function (x) {
                  return ids.includes(x.unique());
                }).map(function (x) {
                  return x.logins++;
                });
                return _context12.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function incrementAccountLogins(_x15) {
        return _incrementAccountLogins.apply(this, arguments);
      }

      return incrementAccountLogins;
    }()
  }, {
    key: "fixOrphanedAccounts",
    value: function () {
      var _fixOrphanedAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee13() {
        var scatter, keypairs, orphaned;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!checkedOrphanedAccounts) {
                  _context13.next = 2;
                  break;
                }

                return _context13.abrupt("return", true);

              case 2:
                checkedOrphanedAccounts = true;
                scatter = _StoreService["default"].get().state.scatter.clone();
                keypairs = scatter.keychain.keypairs.map(function (x) {
                  return x.unique();
                });
                orphaned = scatter.keychain.accounts.filter(function (x) {
                  return !keypairs.includes(x.keypairUnique);
                });

                if (orphaned.length) {
                  _context13.next = 8;
                  break;
                }

                return _context13.abrupt("return", true);

              case 8:
                orphaned.map(function (x) {
                  return scatter.keychain.removeAccount(x);
                });
                _context13.next = 11;
                return _BalanceService["default"].removeStaleBalances();

              case 11:
                return _context13.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function fixOrphanedAccounts() {
        return _fixOrphanedAccounts.apply(this, arguments);
      }

      return fixOrphanedAccounts;
    }()
  }]);
  return AccountService;
}();

exports["default"] = AccountService;

/***/ }),

/***/ "7OSH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__("Wyx5"));

var _index2 = _interopRequireDefault(__webpack_require__("fEu1"));

var _index3 = _interopRequireDefault(__webpack_require__("F52L"));

var _index4 = _interopRequireDefault(__webpack_require__("XtJ5"));

var _index5 = _interopRequireDefault(__webpack_require__("SUCZ"));

var _default = {
  apis: _index["default"],
  apps: _index2["default"],
  blockchain: _index3["default"],
  secure: _index4["default"],
  utility: _index5["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "9s7N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Blockchains = __webpack_require__("F+MN");

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Explorer = _interopRequireDefault(__webpack_require__("DgqZ"));

var _BackendApiService = __webpack_require__("MPB0");

var ExplorerService =
/*#__PURE__*/
function () {
  function ExplorerService() {
    (0, _classCallCheck2["default"])(this, ExplorerService);
  }

  (0, _createClass2["default"])(ExplorerService, null, [{
    key: "getExplorers",
    value: function getExplorers() {
      var explorers = {};

      _Blockchains.BlockchainsArray.map(function (_ref) {
        var blockchain = _ref.value;
        return explorers[blockchain] = [];
      });

      var setDefaultExplorers = function setDefaultExplorers() {
        explorers = _PluginRepository["default"].defaultExplorers();
      };

      return Promise.race([new Promise(function (resolve) {
        return setTimeout(function () {
          setDefaultExplorers();
          resolve(explorers);
        }, 3000);
      }), (0, _BackendApiService.GET)("explorers").then(function (res) {
        _Blockchains.BlockchainsArray.map(function (_ref2) {
          var blockchain = _ref2.value;
          res[(0, _Blockchains.blockchainName)(blockchain)].map(function (rawExplorer) {
            explorers[blockchain].push(_Explorer["default"].fromRaw(rawExplorer));
          });
        });

        return explorers;
      })["catch"](function (err) {
        setDefaultExplorers();
        return explorers;
      })]);
    }
  }]);
  return ExplorerService;
}();

exports["default"] = ExplorerService;

/***/ }),

/***/ "B9Ha":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _AccountService = _interopRequireDefault(__webpack_require__("5lq1"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var NetworkService =
/*#__PURE__*/
function () {
  function NetworkService() {
    (0, _classCallCheck2["default"])(this, NetworkService);
  }

  (0, _createClass2["default"])(NetworkService, null, [{
    key: "addNetwork",
    value: function () {
      var _addNetwork = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(network) {
        var scatter, networks;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Can't modify existing networks.
                scatter = _StoreService["default"].get().state.scatter.clone();
                networks = scatter.settings.networks;

                if (!networks.find(function (x) {
                  return x.id === network.id;
                })) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                if (network.name.length) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Missing Name"
                });

              case 6:
                if (network.host.length) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Missing Host"
                });

              case 8:
                if (network.port) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Missing Port"
                });

              case 10:
                if (network.chainId) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Missing Chain"
                });

              case 12:
                network.setPort();

                if (!networks.find(function (x) {
                  return x.blockchain === network.blockchain && x.chainId === network.chainId;
                })) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Chain Exists"
                });

              case 15:
                if (!networks.find(function (x) {
                  return x.name.toLowerCase() === network.name.toLowerCase();
                })) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Name Exists"
                });

              case 17:
                scatter.settings.updateOrPushNetwork(network);
                _context.next = 20;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 20:
                _context.next = 22;
                return _AccountService["default"].importAllAccountsForNetwork(network);

              case 22:
                setTimeout(function () {
                  _BalanceService["default"].loadAllBalances(true);
                }, 100);

                _PluginRepository["default"].bustCaches();

                return _context.abrupt("return", true);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addNetwork(_x) {
        return _addNetwork.apply(this, arguments);
      }

      return addNetwork;
    }()
  }, {
    key: "removeNetwork",
    value: function () {
      var _removeNetwork = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(network) {
        var scatter, accounts;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _PluginRepository["default"].bustCaches();

                scatter = _StoreService["default"].get().state.scatter.clone(); // Removing accounts and permissions for this network

                accounts = scatter.keychain.accounts.filter(function (x) {
                  return x.networkUnique === network.unique();
                });
                accounts.map(function (account) {
                  return scatter.keychain.removeAccount(account);
                });
                scatter.settings.removeNetwork(network);

                _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

                _BalanceService["default"].removeStaleBalances();

                return _context2.abrupt("return", true);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function removeNetwork(_x2) {
        return _removeNetwork.apply(this, arguments);
      }

      return removeNetwork;
    }()
  }, {
    key: "updateNetwork",
    value: function () {
      var _updateNetwork = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(network) {
        var scatter;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.settings.updateOrPushNetwork(network);
                _context3.next = 4;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 4:
                _PluginRepository["default"].bustCaches();

                return _context3.abrupt("return", true);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateNetwork(_x3) {
        return _updateNetwork.apply(this, arguments);
      }

      return updateNetwork;
    }()
  }]);
  return NetworkService;
}();

exports["default"] = NetworkService;

/***/ }),

/***/ "F52L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AccountService = _interopRequireDefault(__webpack_require__("5lq1"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var _ExplorerService = _interopRequireDefault(__webpack_require__("9s7N"));

var _NetworkService = _interopRequireDefault(__webpack_require__("B9Ha"));

var _ResourceService = _interopRequireDefault(__webpack_require__("diYo"));

var _TransferService = _interopRequireDefault(__webpack_require__("M1Dr"));

var _default = {
  AccountService: _AccountService["default"],
  BalanceService: _BalanceService["default"],
  ExplorerService: _ExplorerService["default"],
  NetworkService: _NetworkService["default"],
  ResourceService: _ResourceService["default"],
  TransferService: _TransferService["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "KLk5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var lastBalanceTime;

var BalanceService =
/*#__PURE__*/
function () {
  function BalanceService() {
    (0, _classCallCheck2["default"])(this, BalanceService);
  }

  (0, _createClass2["default"])(BalanceService, null, [{
    key: "loadBalancesFor",
    value: function () {
      var _loadBalancesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(account) {
        var blockchain, plugin, tokens, balances;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                blockchain = account.blockchain();
                plugin = _PluginRepository["default"].plugin(blockchain);
                tokens = _StoreService["default"].get().state.scatter.allTokens().filter(function (x) {
                  return x.blockchain === blockchain;
                }).filter(function (x) {
                  return x.chainId === account.network().chainId;
                });
                _context.next = 6;
                return plugin.balancesFor(account, tokens);

              case 6:
                balances = _context.sent;
                _context.next = 9;
                return this.loadUntouchables(account);

              case 9:
                _context.t0 = function (x) {
                  return balances.push(x);
                };

                _context.sent.map(_context.t0);

                return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_BALANCES, {
                  account: account.identifiable(),
                  balances: balances
                }));

              case 14:
                _context.prev = 14;
                _context.t1 = _context["catch"](0);
                return _context.abrupt("return", null);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
      }));

      function loadBalancesFor(_x) {
        return _loadBalancesFor.apply(this, arguments);
      }

      return loadBalancesFor;
    }()
  }, {
    key: "loadAllBalances",
    value: function () {
      var _loadAllBalances = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var force,
            accounts,
            i,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                force = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;

                if (!(!force && lastBalanceTime < +new Date() + 1000 * 60 * 5)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                lastBalanceTime = +new Date();
                accounts = _StoreService["default"].get().state.scatter.keychain.accounts.reduce(function (acc, account) {
                  // Filtering out permission based accounts
                  if (!acc.find(function (x) {
                    return x.identifiable() === account.identifiable();
                  })) acc.push(account);
                  return acc;
                }, []).sort(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee2(account) {
                    var isMainnet;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            // Sorting mainnets first.
                            isMainnet = _PluginRepository["default"].plugin(account.blockchain()).isEndorsedNetwork(account.network());
                            return _context2.abrupt("return", isMainnet ? -1 : 1);

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
                i = 0;

              case 6:
                if (!(i < accounts.length)) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 9;
                return Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve();
                  }, 20000);
                }), this.loadBalancesFor(accounts[i])]);

              case 9:
                i++;
                _context3.next = 6;
                break;

              case 12:
                return _context3.abrupt("return", true);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadAllBalances() {
        return _loadAllBalances.apply(this, arguments);
      }

      return loadAllBalances;
    }()
  }, {
    key: "removeStaleBalances",
    value: function removeStaleBalances() {
      var accountKeys = _StoreService["default"].get().state.scatter.keychain.accounts.map(function (x) {
        return x.identifiable();
      });

      var keysToRemove = Object.keys(_StoreService["default"].get().state.balances).filter(function (key) {
        return !accountKeys.includes(key);
      });
      return _StoreService["default"].get().dispatch(Actions.REMOVE_BALANCES, keysToRemove);
    }
  }, {
    key: "loadUntouchables",
    value: function () {
      var _loadUntouchables = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(account) {
        var plugin;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                plugin = _PluginRepository["default"].plugin(account.blockchain());
                return _context4.abrupt("return", plugin.hasUntouchableTokens() ? plugin.untouchableBalance(account) : []);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function loadUntouchables(_x3) {
        return _loadUntouchables.apply(this, arguments);
      }

      return loadUntouchables;
    }()
  }, {
    key: "totalBalances",
    value: function totalBalances() {
      var allNetworks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tokens = {};
      tokens['totals'] = {};

      var balances = _StoreService["default"].get().state.balances;

      Object.keys(balances).map(
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee5(accountUnique) {
          var account;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  account = _StoreService["default"].get().state.scatter.keychain.accounts.find(function (x) {
                    return x.identifiable() === accountUnique;
                  });

                  if (account) {
                    _context5.next = 3;
                    break;
                  }

                  return _context5.abrupt("return");

                case 3:
                  if (!(!allNetworks && _StoreService["default"].get().state.scatter.settings.showMainnetsOnly)) {
                    _context5.next = 6;
                    break;
                  }

                  if (_PluginRepository["default"].plugin(account.blockchain()).isEndorsedNetwork(account.network())) {
                    _context5.next = 6;
                    break;
                  }

                  return _context5.abrupt("return");

                case 6:
                  if (!tokens.hasOwnProperty(account.networkUnique)) {
                    tokens[account.networkUnique] = {};
                  }

                  if (!(!balances.hasOwnProperty(accountUnique) || !balances[accountUnique])) {
                    _context5.next = 9;
                    break;
                  }

                  return _context5.abrupt("return");

                case 9:
                  balances[accountUnique].map(function (token) {
                    if (!tokens[account.networkUnique].hasOwnProperty(token.uniqueWithChain())) {
                      tokens[account.networkUnique][token.uniqueWithChain()] = token.clone();
                      tokens['totals'][token.uniqueWithChain()] = token.clone();
                    } else {
                      tokens[account.networkUnique][token.uniqueWithChain()].add(token.amount);
                      tokens['totals'][token.uniqueWithChain()].add(token.amount);
                    }
                  });

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x4) {
          return _ref2.apply(this, arguments);
        };
      }());
      return tokens;
    }
  }]);
  return BalanceService;
}();

exports["default"] = BalanceService;

/***/ }),

/***/ "M1Dr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _Blockchains = __webpack_require__("F+MN");

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _HistoricTransfer = _interopRequireDefault(__webpack_require__("ssXz"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var TransferService =
/*#__PURE__*/
function () {
  function TransferService() {
    (0, _classCallCheck2["default"])(this, TransferService);
  }

  (0, _createClass2["default"])(TransferService, null, [{
    key: _Blockchains.Blockchains.BTC,
    value: function () {
      var _value = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(params) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.baseTransfer(params));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function value(_x) {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: _Blockchains.Blockchains.ETH,
    value: function () {
      var _value2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(params) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.baseTransfer(params));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function value(_x2) {
        return _value2.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: _Blockchains.Blockchains.TRX,
    value: function () {
      var _value3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(params) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.baseTransfer(params));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function value(_x3) {
        return _value3.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: _Blockchains.Blockchains.EOSIO,
    value: function () {
      var _value4 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(params) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params.recipient = params.recipient.toLowerCase();
                return _context4.abrupt("return", this.baseTransfer(params));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function value(_x4) {
        return _value4.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: "baseTransfer",
    value: function () {
      var _baseTransfer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(params) {
        var account, recipient, amount, memo, token, plugin, transfer, history;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                account = params.account, recipient = params.recipient, amount = params.amount, memo = params.memo, token = params.token;
                plugin = _PluginRepository["default"].plugin(account.blockchain());
                _context5.next = 4;
                return _PluginRepository["default"].plugin(account.blockchain()).transfer({
                  account: account,
                  to: recipient,
                  amount: amount,
                  token: token,
                  memo: memo
                })["catch"](function (x) {
                  return x;
                });

              case 4:
                transfer = _context5.sent;

                if (!(transfer !== null)) {
                  _context5.next = 12;
                  break;
                }

                if (!transfer.hasOwnProperty('error')) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", transfer);

              case 10:
                if (!params.bypassHistory) {
                  history = new _HistoricTransfer["default"](account, recipient, token, amount, memo, this.getTransferId(transfer, token.blockchain));

                  _StoreService["default"].get().dispatch(Actions.DELTA_HISTORY, history);
                }

                return _context5.abrupt("return", transfer);

              case 12:
                return _context5.abrupt("return", null);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function baseTransfer(_x5) {
        return _baseTransfer.apply(this, arguments);
      }

      return baseTransfer;
    }()
  }, {
    key: "getTransferId",
    value: function getTransferId(transfer, blockchain) {
      switch (blockchain) {
        case _Blockchains.Blockchains.EOSIO:
          return transfer.transaction_id;

        case _Blockchains.Blockchains.TRX:
          return transfer.txID;

        case _Blockchains.Blockchains.ETH:
          return transfer.transactionHash;

        case _Blockchains.Blockchains.BTC:
          return transfer.txid;
      }

      return null;
    }
  }]);
  return TransferService;
}();

exports["default"] = TransferService;

/***/ }),

/***/ "MPB0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.POST = exports.GET = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _eosjsEcc = _interopRequireDefault(__webpack_require__("Giuh"));

// const baseUrl = `http://localhost:6547/v1/`;
var baseUrl = "https://api.get-scatter.com/v1/";
var PROOF_KEY = 'EOS62b3WxfuRyP7JYaDbF3gr49joLWYpsF3kPmo2HPxPuGRDiRUwj';

var getHeaders = function getHeaders() {
  var proof = _IdGenerator["default"].text(64);

  return [proof, {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    proof: proof
  }];
}; // All API requests must come back signed with the known
// public key associated with the Scatter API


var validate = function validate(proof, res) {
  try {
    var signedProof = res.headers.get('proof');
    if (!signedProof) throw 'Invalid API Request';
    if (_eosjsEcc["default"].recover(signedProof, proof) !== PROOF_KEY) throw 'Invalid API Request';
    return res.json();
  } catch (e) {
    throw "Invalid API Request";
  }
};

var GET = function GET(route) {
  var _getHeaders = getHeaders(),
      _getHeaders2 = (0, _slicedToArray2["default"])(_getHeaders, 2),
      proof = _getHeaders2[0],
      headers = _getHeaders2[1];

  return fetch("".concat(baseUrl).concat(route), {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }).then(function (res) {
    return validate(proof, res);
  });
};

exports.GET = GET;

var POST = function POST(route, data) {
  var _getHeaders3 = getHeaders(),
      _getHeaders4 = (0, _slicedToArray2["default"])(_getHeaders3, 2),
      proof = _getHeaders4[0],
      headers = _getHeaders4[1];

  return fetch("".concat(baseUrl).concat(route), {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(data)
  }).then(function (res) {
    return validate(proof, res);
  });
};

exports.POST = POST;

var BackendApiService =
/*#__PURE__*/
function () {
  function BackendApiService() {
    (0, _classCallCheck2["default"])(this, BackendApiService);
  }

  (0, _createClass2["default"])(BackendApiService, null, [{
    key: "apps",
    // Add an array of applinks to filter only those results.
    value: function () {
      var _apps2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _apps,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _apps = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
                return _context.abrupt("return", POST("apps", {
                  apps: _apps
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function apps() {
        return _apps2.apply(this, arguments);
      }

      return apps;
    }() // ACCOUNT CREATION

  }, {
    key: "checkMachineId",
    value: function () {
      var _checkMachineId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", GET("machine/".concat(id)));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function checkMachineId(_x) {
        return _checkMachineId.apply(this, arguments);
      }

      return checkMachineId;
    }()
  }, {
    key: "createAccount",
    value: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(payload) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", POST("create_bridge", payload));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createAccount(_x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }]);
  return BackendApiService;
}();

exports["default"] = BackendApiService;

/***/ }),

/***/ "TmN8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _BackendApiService = __webpack_require__("MPB0");

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _DateHelpers = __webpack_require__("upjY");

// Once every 30 minutes.
var intervalTime = 60000 * 30;
var priceInterval;

var PriceService =
/*#__PURE__*/
function () {
  function PriceService() {
    (0, _classCallCheck2["default"])(this, PriceService);
  }

  (0, _createClass2["default"])(PriceService, null, [{
    key: "watchPrices",
    value: function () {
      var _watchPrices = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var enable,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                enable = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                clearInterval(priceInterval);

                if (enable) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return");

              case 4:
                return _context4.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(resolve) {
                    var setPrices;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            setPrices =
                            /*#__PURE__*/
                            function () {
                              var _ref2 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee() {
                                return _regenerator["default"].wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        _context.next = 2;
                                        return PriceService.setPrices();

                                      case 2:
                                        resolve(true);

                                      case 3:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              return function setPrices() {
                                return _ref2.apply(this, arguments);
                              };
                            }();

                            _context3.next = 3;
                            return setPrices();

                          case 3:
                            priceInterval = setInterval(
                            /*#__PURE__*/
                            (0, _asyncToGenerator2["default"])(
                            /*#__PURE__*/
                            _regenerator["default"].mark(function _callee2() {
                              return _regenerator["default"].wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return setPrices();

                                    case 2:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2);
                            })), intervalTime);

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function watchPrices() {
        return _watchPrices.apply(this, arguments);
      }

      return watchPrices;
    }()
  }, {
    key: "setPrices",
    value: function () {
      var _setPrices = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var prices;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return PriceService.getAll();

              case 2:
                prices = _context5.sent;

                if (!(prices && Object.keys(prices).length)) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 6;
                return _StoreService["default"].get().dispatch(Actions.SET_PRICES, prices);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function setPrices() {
        return _setPrices.apply(this, arguments);
      }

      return setPrices;
    }()
  }, {
    key: "getAll",
    value: function getAll() {
      return Promise.race([new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(false);
        }, 10000);
      }), (0, _BackendApiService.GET)("prices?v2=true")["catch"](function () {
        return {
          error: "Problem connecting to Prices API"
        };
      })]);
    }
  }, {
    key: "getCurrencies",
    value: function () {
      var _getCurrencies = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(false);
                  }, 10000);
                }), (0, _BackendApiService.GET)('currencies')["catch"](function () {
                  return ['USD'];
                })]));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getCurrencies() {
        return _getCurrencies.apply(this, arguments);
      }

      return getCurrencies;
    }()
  }, {
    key: "getCurrencyPrices",
    value: function () {
      var _getCurrencyPrices = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(false);
                  }, 10000);
                }), (0, _BackendApiService.GET)('currencies/prices')["catch"](function () {
                  return null;
                })]));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getCurrencyPrices() {
        return _getCurrencyPrices.apply(this, arguments);
      }

      return getCurrencyPrices;
    }()
  }, {
    key: "loadPriceTimelineData",
    value: function () {
      var _loadPriceTimelineData = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var prices, yesterday, today;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return PriceService.getCurrencyPrices();

              case 2:
                prices = _context8.sent;
                _context8.next = 5;
                return PriceService.getTimeline((0, _DateHelpers.dateId)(1));

              case 5:
                yesterday = _context8.sent;
                _context8.next = 8;
                return PriceService.getTimeline();

              case 8:
                today = _context8.sent;
                _context8.next = 11;
                return _StoreService["default"].get().dispatch(Actions.SET_PRICE_DATA, {
                  prices: prices,
                  yesterday: yesterday,
                  today: today
                });

              case 11:
                return _context8.abrupt("return", {
                  prices: prices,
                  yesterday: yesterday,
                  today: today
                });

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function loadPriceTimelineData() {
        return _loadPriceTimelineData.apply(this, arguments);
      }

      return loadPriceTimelineData;
    }()
  }, {
    key: "getTimeline",
    value: function () {
      var _getTimeline = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9() {
        var date,
            query,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                date = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : null;
                query = date ? "?date=".concat(date) : '';
                return _context9.abrupt("return", Promise.race([new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve(false);
                  }, 10000);
                }), (0, _BackendApiService.GET)('prices/timeline' + query)["catch"](function () {})]));

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getTimeline() {
        return _getTimeline.apply(this, arguments);
      }

      return getTimeline;
    }()
  }, {
    key: "getTotal",
    value: function getTotal(totals, displayCurrency, bypassDisplayToken, displayToken) {
      if (!displayCurrency) displayCurrency = _StoreService["default"].get().state.scatter.settings.displayCurrency;

      if (!bypassDisplayToken && displayToken) {
        if (totals.hasOwnProperty(displayToken)) return totals[displayToken];else {
          var token = (displayToken instanceof _Token["default"] ? displayToken : _Token["default"].fromUnique(displayToken)).clone();
          token.amount = parseFloat(0).toFixed(token.decimals);
          return token;
        }
      } else {
        var total = 0;
        Object.keys(_StoreService["default"].get().state.prices).map(function (tokenUnique) {
          var balance = totals[tokenUnique];

          if (balance) {
            var price = _StoreService["default"].get().state.prices[tokenUnique][displayCurrency];

            var value = parseFloat(parseFloat(balance.amount) * parseFloat(price));
            if (isNaN(value)) return;
            total += value;
          }
        });
        return _Token["default"].fromJson({
          symbol: this.fiatSymbol(displayCurrency),
          amount: total.toFixed(2),
          decimals: 2
        });
      }
    }
  }, {
    key: "fiatSymbol",
    value: function fiatSymbol(currency) {
      if (!currency) currency = _StoreService["default"].get().state.scatter.settings.displayCurrency;

      switch (currency) {
        case 'USD':
        case 'AUD':
        case 'CAD':
          return '$';

        case 'CNY':
        case 'JPY':
          return '¥';

        case 'EUR':
          return '€';

        case 'GBP':
          return '£';

        default:
          return currency;
      }
    }
  }]);
  return PriceService;
}();

exports["default"] = PriceService;

/***/ }),

/***/ "Wyx5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(__webpack_require__("Z4q2"));

var _BackendApiService = _interopRequireDefault(__webpack_require__("MPB0"));

var _ExchangeService = _interopRequireDefault(__webpack_require__("l31u"));

var _PriceService = _interopRequireDefault(__webpack_require__("TmN8"));

var _default = {
  ApiService: _ApiService["default"],
  BackendApiService: _BackendApiService["default"],
  ExchangeService: _ExchangeService["default"],
  PriceService: _PriceService["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "Z4q2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Actions = _interopRequireWildcard(__webpack_require__("+nw1"));

var StoreActions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _AccountService = _interopRequireDefault(__webpack_require__("5lq1"));

var _PermissionService = _interopRequireDefault(__webpack_require__("eOAV"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _ResourceService = _interopRequireDefault(__webpack_require__("diYo"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Blockchains = __webpack_require__("F+MN");

var _Keypair = _interopRequireDefault(__webpack_require__("Hxfq"));

var _Identity = _interopRequireWildcard(__webpack_require__("EY8S"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _Error = _interopRequireDefault(__webpack_require__("Jimu"));

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _TokenService = _interopRequireDefault(__webpack_require__("ONSl"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _Framework = _interopRequireDefault(__webpack_require__("z/LQ"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var blocked = [];

var ApiService =
/*#__PURE__*/
function () {
  function ApiService() {
    (0, _classCallCheck2["default"])(this, ApiService);
  }

  (0, _createClass2["default"])(ApiService, null, [{
    key: "blockRoutes",
    value: function blockRoutes(routes) {
      blocked = routes;
    }
  }, {
    key: "handler",
    value: function () {
      var _handler = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(request) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (Object.keys(Actions).map(function (key) {
                  return Actions[key];
                }).includes(request.type)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!blocked.includes(request.type)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", {
                  id: request.id,
                  result: _Error["default"].malicious('This wallet has turned this API route off.')
                });

              case 4:
                _context.next = 6;
                return this[request.type](request);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handler(_x) {
        return _handler.apply(this, arguments);
      }

      return handler;
    }()
    /******************************************************************************/

    /**                                                                          **/

    /**                                                                          **/

    /**                              POPOUT METHODS                              **/

    /**                    These routes cause popups for the user                **/

    /**                                                                          **/

    /**                                                                          **/

    /******************************************************************************/

  }, {
    key: Actions.LOGIN,
    value: function () {
      var _value = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.loginHandler(request, false));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function value(_x2) {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.LOGIN_ALL,
    value: function () {
      var _value2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(request) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.loginHandler(request, true));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function value(_x3) {
        return _value2.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: "loginHandler",
    value: function () {
      var _loginHandler = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(request, loginAll) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve) {
                  var badResult = function badResult() {
                    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                    return resolve({
                      id: request.id,
                      result: _Error["default"].malicious(msg)
                    });
                  };

                  if (Object.keys(request.payload).length !== 2) return badResult();
                  if (!request.payload.hasOwnProperty('fields')) return badResult();
                  if ((0, _typeof2["default"])(request.payload.fields) !== 'object') return badResult();
                  var _request$payload = request.payload,
                      origin = _request$payload.origin,
                      fields = _request$payload.fields;
                  if (!fields.hasOwnProperty('personal')) fields.personal = [];
                  if (!fields.hasOwnProperty('location')) fields.location = [];
                  if (!fields.hasOwnProperty('accounts')) fields.accounts = [];
                  fields.personal = fields.personal.filter(function (x) {
                    return !!x;
                  });
                  fields.location = fields.location.filter(function (x) {
                    return !!x;
                  });
                  fields.accounts = fields.accounts.filter(function (x) {
                    return !!x;
                  });
                  var requiredNetworks = fields.accounts.map(function (x) {
                    return _Network["default"].fromJson(x);
                  }).map(function (x) {
                    return x.unique();
                  }).reduce(function (acc, x) {
                    if (!acc.includes(x)) acc.push(x);
                    return acc;
                  }, []); // Deprecating the ability to log in with multiple networks, citing bad UX

                  if (!loginAll && requiredNetworks.length > 1) {
                    return resolve({
                      id: request.id,
                      result: _Error["default"].signatureError("too_many_accounts", "To login more than one account you must use the `getAllAccounts()` API method.")
                    });
                  }

                  var existingNetworks = _StoreService["default"].get().state.scatter.settings.networks.filter(function (x) {
                    return requiredNetworks.includes(x.unique());
                  });

                  if (existingNetworks.length !== requiredNetworks.length) {
                    return resolve({
                      id: request.id,
                      result: _Error["default"].noNetwork()
                    });
                  }

                  var availableAccounts = existingNetworks.map(function (x) {
                    return x.accounts();
                  }).reduce(function (acc, accounts) {
                    acc = acc.concat(accounts);
                    return acc;
                  }, []);

                  var possibleId = _PermissionService["default"].identityFromPermissions(origin);

                  if (possibleId) {
                    var samePersonal = fields.personal.every(function (key) {
                      return possibleId.hasOwnProperty('personal') && possibleId.personal.hasOwnProperty(key);
                    });
                    var sameLocation = fields.location.every(function (key) {
                      return possibleId.hasOwnProperty('location') && possibleId.location.hasOwnProperty(key);
                    });
                    var sameAccounts = true;
                    if (loginAll && availableAccounts.length !== possibleId.accounts.length) sameAccounts = false;else if (!loginAll && possibleId.accounts.length > 1) sameAccounts = false;
                    if (samePersonal && sameLocation && sameAccounts) return resolve({
                      id: request.id,
                      result: possibleId
                    });
                  }

                  _EventService["default"].emit('popout', request).then(
                  /*#__PURE__*/
                  function () {
                    var _ref2 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee4(_ref) {
                      var result, identity, location, accounts, returnableIdentity;
                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              result = _ref.result;

                              if (result) {
                                _context4.next = 3;
                                break;
                              }

                              return _context4.abrupt("return", resolve({
                                id: request.id,
                                result: _Error["default"].signatureError("identity_rejected", "User rejected the provision of an Identity")
                              }));

                            case 3:
                              // await updateIdentity(result);
                              // const identity = Identity.fromJson(result.identity);
                              identity = _StoreService["default"].get().state.scatter.keychain.identities.find(function (x) {
                                return x.id === result.identity.id;
                              });
                              _context4.next = 6;
                              return identity.setAsLastUsed();

                            case 6:
                              location = _Identity.LocationInformation.fromJson(result.location);
                              accounts = loginAll ? availableAccounts : (result.accounts || []).map(function (x) {
                                return _Account["default"].fromJson(x);
                              });
                              _context4.next = 10;
                              return _PermissionService["default"].addIdentityOriginPermission(identity, accounts, fields, origin);

                            case 10:
                              returnableIdentity = identity.asOnlyRequiredFields(fields, location);
                              returnableIdentity.accounts = accounts.map(function (x) {
                                return x.asReturnable();
                              });
                              if (!loginAll && accounts.length) _AccountService["default"].incrementAccountLogins(accounts);
                              resolve({
                                id: request.id,
                                result: returnableIdentity
                              });

                            case 14:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x6) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function loginHandler(_x4, _x5) {
        return _loginHandler.apply(this, arguments);
      }

      return loginHandler;
    }()
  }, {
    key: Actions.SIGN,
    value: function () {
      var _value3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(request) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee10(resolve) {
                    var payload, origin, requiredFields, blockchain, possibleId, plugin, network, blacklisted, availableAccounts, participants, identity, fillIdentity, signAndReturn, existingApp, hasHardwareKeys, sendableRequest;
                    return _regenerator["default"].wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            payload = request.payload;
                            origin = payload.origin, requiredFields = payload.requiredFields, blockchain = payload.blockchain;
                            possibleId = _PermissionService["default"].identityFromPermissions(origin, false);

                            if (possibleId) {
                              _context10.next = 5;
                              break;
                            }

                            return _context10.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].identityMissing()
                            }));

                          case 5:
                            payload.identityKey = possibleId.publicKey; // Blockchain specific plugin

                            plugin = _PluginRepository["default"].plugin(blockchain);
                            network = _StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                              return x.unique() === _Network["default"].fromJson(payload.network).unique();
                            });

                            if (network) {
                              _context10.next = 10;
                              break;
                            }

                            return _context10.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].noNetwork()
                            }));

                          case 10:
                            payload.network = network; // Convert buf and abi to messages

                            _context10.next = 13;
                            return plugin.requestParser(payload, network, payload.abi || null);

                          case 13:
                            payload.messages = _context10.sent;

                            if (payload.messages) {
                              _context10.next = 16;
                              break;
                            }

                            return _context10.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].cantParseTransaction()
                            }));

                          case 16:
                            // CHECKING FOR BLACKLISTED ACTIONS
                            blacklisted = payload.messages.map(function (x) {
                              return "".concat(blockchain, "::").concat(x.code, "::").concat(x.type);
                            }).filter(function (actionTag) {
                              return _StoreService["default"].get().state.scatter.settings.isActionBlacklisted(actionTag);
                            });

                            if (!blacklisted.length) {
                              _context10.next = 20;
                              break;
                            }

                            _EventService["default"].emit('firewalled', {
                              actions: parsed,
                              payload: payload
                            });

                            return _context10.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].malicious('firewalled')
                            }));

                          case 20:
                            availableAccounts = possibleId.accounts.map(function (x) {
                              return x.formatted();
                            });
                            participants = _ObjectHelpers["default"].distinct(plugin.actionParticipants(payload)).filter(function (x) {
                              return availableAccounts.includes(x);
                            }).map(function (x) {
                              return possibleId.accounts.find(function (acc) {
                                return acc.formatted() === x;
                              });
                            }); // Must have the proper account participants.

                            if (participants.length) {
                              _context10.next = 24;
                              break;
                            }

                            return _context10.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].signatureAccountMissing()
                            }));

                          case 24:
                            payload.participants = participants; // Getting the identity for this transaction

                            fillIdentity = function fillIdentity() {
                              return identity = _StoreService["default"].get().state.scatter.keychain.identities.find(function (x) {
                                return x.publicKey === possibleId.publicKey;
                              });
                            };

                            fillIdentity();

                            signAndReturn =
                            /*#__PURE__*/
                            function () {
                              var _ref4 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee7(selectedLocation) {
                                var signatures, returnedFields;
                                return _regenerator["default"].wrap(function _callee7$(_context7) {
                                  while (1) {
                                    switch (_context7.prev = _context7.next) {
                                      case 0:
                                        _context7.next = 2;
                                        return Promise.all(participants.map(
                                        /*#__PURE__*/
                                        function () {
                                          var _ref5 = (0, _asyncToGenerator2["default"])(
                                          /*#__PURE__*/
                                          _regenerator["default"].mark(function _callee6(account) {
                                            return _regenerator["default"].wrap(function _callee6$(_context6) {
                                              while (1) {
                                                switch (_context6.prev = _context6.next) {
                                                  case 0:
                                                    return _context6.abrupt("return", _SigningService["default"].sign(network, payload, account.publicKey));

                                                  case 1:
                                                  case "end":
                                                    return _context6.stop();
                                                }
                                              }
                                            }, _callee6);
                                          }));

                                          return function (_x10) {
                                            return _ref5.apply(this, arguments);
                                          };
                                        }()));

                                      case 2:
                                        signatures = _context7.sent;

                                        if (!(signatures.length !== participants.length)) {
                                          _context7.next = 5;
                                          break;
                                        }

                                        return _context7.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureAccountMissing()
                                        }));

                                      case 5:
                                        if (!(signatures.length === 1 && signatures[0] === null)) {
                                          _context7.next = 7;
                                          break;
                                        }

                                        return _context7.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureError("signature_rejected", "User rejected the signature request")
                                        }));

                                      case 7:
                                        if (!signatures.some(function (x) {
                                          return !x;
                                        })) {
                                          _context7.next = 9;
                                          break;
                                        }

                                        return _context7.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureError('missing_sig', 'A signature for this request was missing')
                                        }));

                                      case 9:
                                        returnedFields = _Identity["default"].asReturnedFields(requiredFields, identity, selectedLocation);
                                        resolve({
                                          id: request.id,
                                          result: {
                                            signatures: signatures,
                                            returnedFields: returnedFields
                                          }
                                        });

                                      case 11:
                                      case "end":
                                        return _context7.stop();
                                    }
                                  }
                                }, _callee7);
                              }));

                              return function signAndReturn(_x9) {
                                return _ref4.apply(this, arguments);
                              };
                            }(); // Only allowing whitelist permissions for origin authed apps


                            existingApp = _StoreService["default"].get().state.scatter.keychain.findApp(origin);
                            hasHardwareKeys = participants.some(function (x) {
                              return _KeyPairService["default"].isHardware(x.publicKey);
                            });

                            if (!(existingApp && !hasHardwareKeys && _PermissionService["default"].isWhitelistedTransaction(origin, identity, participants, payload.messages, requiredFields))) {
                              _context10.next = 35;
                              break;
                            }

                            if (_StoreService["default"].get().state.scatter.settings.showNotifications) _Framework["default"].pushNotification('Signed Transaction', "".concat(origin, " - ").concat(participants.map(function (x) {
                              return x.sendable();
                            }).join(',')));
                            _context10.next = 34;
                            return signAndReturn(identity.getLocation());

                          case 34:
                            return _context10.abrupt("return", _context10.sent);

                          case 35:
                            sendableRequest = {};
                            sendableRequest.type = request.type;
                            sendableRequest.appkey = request.appkey;
                            sendableRequest.payload = {
                              messages: request.payload.messages,
                              network: request.payload.network,
                              origin: request.payload.origin,
                              participants: request.payload.participants,
                              requiredFields: request.payload.requiredFields
                            };

                            _EventService["default"].emit('popout', sendableRequest).then(
                            /*#__PURE__*/
                            function () {
                              var _ref7 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee9(_ref6) {
                                var result;
                                return _regenerator["default"].wrap(function _callee9$(_context9) {
                                  while (1) {
                                    switch (_context9.prev = _context9.next) {
                                      case 0:
                                        result = _ref6.result;

                                        if (result) {
                                          _context9.next = 3;
                                          break;
                                        }

                                        return _context9.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureError("signature_rejected", "User rejected the signature request")
                                        }));

                                      case 3:
                                        // await updateIdentity(result);
                                        fillIdentity();

                                        if (!result.needResources) {
                                          _context9.next = 7;
                                          break;
                                        }

                                        _context9.next = 7;
                                        return Promise.all(result.needResources.map(
                                        /*#__PURE__*/
                                        function () {
                                          var _ref8 = (0, _asyncToGenerator2["default"])(
                                          /*#__PURE__*/
                                          _regenerator["default"].mark(function _callee8(account) {
                                            return _regenerator["default"].wrap(function _callee8$(_context8) {
                                              while (1) {
                                                switch (_context8.prev = _context8.next) {
                                                  case 0:
                                                    _context8.next = 2;
                                                    return _ResourceService["default"].addResources(account);

                                                  case 2:
                                                    return _context8.abrupt("return", _context8.sent);

                                                  case 3:
                                                  case "end":
                                                    return _context8.stop();
                                                }
                                              }
                                            }, _callee8);
                                          }));

                                          return function (_x12) {
                                            return _ref8.apply(this, arguments);
                                          };
                                        }()));

                                      case 7:
                                        _context9.next = 9;
                                        return _PermissionService["default"].addIdentityRequirementsPermission(origin, identity, requiredFields);

                                      case 9:
                                        _context9.next = 11;
                                        return _PermissionService["default"].addActionPermissions(origin, identity, participants, result.whitelists);

                                      case 11:
                                        _context9.next = 13;
                                        return signAndReturn(result.selectedLocation);

                                      case 13:
                                      case "end":
                                        return _context9.stop();
                                    }
                                  }
                                }, _callee9);
                              }));

                              return function (_x11) {
                                return _ref7.apply(this, arguments);
                              };
                            }());

                          case 40:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x8) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function value(_x7) {
        return _value3.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.SIGN_ARBITRARY,
    value: function () {
      var _value4 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee14(request) {
        var identityKey,
            _args14 = arguments;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                identityKey = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : null;
                return _context14.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref9 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee13(resolve) {
                    var payload, _request$payload2, origin, publicKey, data, _possibleId, keypair, blockchain, network;

                    return _regenerator["default"].wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            payload = request.payload;
                            _request$payload2 = request.payload, origin = _request$payload2.origin, publicKey = _request$payload2.publicKey, data = _request$payload2.data;

                            if (!data.split(' ').some(function (x) {
                              return x.length > 12;
                            })) {
                              _context13.next = 4;
                              break;
                            }

                            return _context13.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].malicious('You can not sign strings where any of the words are over 12 characters.')
                            }));

                          case 4:
                            if (!identityKey) {
                              _context13.next = 8;
                              break;
                            }

                            payload.identityKey = identityKey;
                            _context13.next = 12;
                            break;

                          case 8:
                            _possibleId = _PermissionService["default"].identityFromPermissions(origin, false);

                            if (_possibleId) {
                              _context13.next = 11;
                              break;
                            }

                            return _context13.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].identityMissing()
                            }));

                          case 11:
                            payload.identityKey = _possibleId.publicKey;

                          case 12:
                            keypair = _KeyPairService["default"].getKeyPairFromPublicKey(publicKey);

                            if (keypair) {
                              _context13.next = 15;
                              break;
                            }

                            return _context13.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].signatureError("signature_rejected", "User rejected the signature request")
                            }));

                          case 15:
                            blockchain = keypair.publicKeys.find(function (x) {
                              return x.key === publicKey;
                            }).blockchain;
                            network = _Network["default"].fromJson({
                              blockchain: blockchain
                            }); // Convert buf and abi to messages

                            payload.messages = [{
                              code: "".concat((0, _Blockchains.blockchainName)(blockchain), " Key"),
                              type: 'Arbitrary Signature',
                              data: {
                                signing: data
                              }
                            }];

                            _EventService["default"].emit('popout', Object.assign(request, {})).then(
                            /*#__PURE__*/
                            function () {
                              var _ref11 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee12(_ref10) {
                                var result;
                                return _regenerator["default"].wrap(function _callee12$(_context12) {
                                  while (1) {
                                    switch (_context12.prev = _context12.next) {
                                      case 0:
                                        result = _ref10.result;

                                        if (!(!result || !result.accepted || false)) {
                                          _context12.next = 3;
                                          break;
                                        }

                                        return _context12.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureError("signature_rejected", "User rejected the signature request")
                                        }));

                                      case 3:
                                        _context12.t0 = resolve;
                                        _context12.t1 = request.id;
                                        _context12.next = 7;
                                        return _SigningService["default"].sign(network, payload, publicKey, true, false);

                                      case 7:
                                        _context12.t2 = _context12.sent;
                                        _context12.t3 = {
                                          id: _context12.t1,
                                          result: _context12.t2
                                        };
                                        (0, _context12.t0)(_context12.t3);

                                      case 10:
                                      case "end":
                                        return _context12.stop();
                                    }
                                  }
                                }, _callee12);
                              }));

                              return function (_x15) {
                                return _ref11.apply(this, arguments);
                              };
                            }());

                          case 19:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13);
                  }));

                  return function (_x14) {
                    return _ref9.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function value(_x13) {
        return _value4.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.TRANSFER,
    value: function () {
      var _value5 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee16(request) {
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", new Promise(function (resolve) {
                  var _request$payload3 = request.payload,
                      to = _request$payload3.to,
                      network = _request$payload3.network,
                      amount = _request$payload3.amount,
                      options = _request$payload3.options;
                  if (!options) options = {};
                  network = _StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                    return x.unique() === _Network["default"].fromJson(network).unique();
                  });
                  if (!network) return resolve({
                    id: request.id,
                    result: _Error["default"].noNetwork()
                  });
                  var symbol = '';
                  if (options.hasOwnProperty('symbol')) symbol = options.symbol;
                  symbol = network.systemToken().symbol;
                  var contract = '';
                  if (options.hasOwnProperty('contract')) contract = options.contract;
                  contract = network.systemToken().contract;
                  request.payload.memo = network.blockchain === 'eos' ? options.hasOwnProperty('memo') ? options.memo : '' : '';
                  request.payload.symbol = symbol;
                  request.payload.contract = contract;

                  _EventService["default"].emit('popout', request).then(
                  /*#__PURE__*/
                  function () {
                    var _ref13 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee15(_ref12) {
                      var result, account, plugin, options, token, sent;
                      return _regenerator["default"].wrap(function _callee15$(_context15) {
                        while (1) {
                          switch (_context15.prev = _context15.next) {
                            case 0:
                              result = _ref12.result;

                              if (result) {
                                _context15.next = 3;
                                break;
                              }

                              return _context15.abrupt("return", resolve({
                                id: request.id,
                                result: _Error["default"].signatureError("signature_rejected", "User rejected the transfer request")
                              }));

                            case 3:
                              account = _Account["default"].fromJson(result.account);
                              plugin = _PluginRepository["default"].plugin(network.blockchain);
                              options = request.payload || {};
                              token = _Token["default"].fromJson({
                                contract: contract,
                                blockchain: network.blockchain,
                                symbol: symbol,
                                decimals: options.decimals || _PluginRepository["default"].plugin(network.blockchain).defaultDecimals(),
                                chainId: account.network().chainId
                              });
                              _context15.next = 9;
                              return _PluginRepository["default"].plugin(network.blockchain).transfer({
                                account: account,
                                to: to,
                                amount: result.amount,
                                token: token,
                                memo: request.payload.memo,
                                promptForSignature: false
                              })["catch"](function (error) {
                                return {
                                  error: error
                                };
                              });

                            case 9:
                              sent = _context15.sent;

                              _EventService["default"].emit('transfer', request.payload);

                              resolve({
                                id: request.id,
                                result: sent
                              });

                            case 12:
                            case "end":
                              return _context15.stop();
                          }
                        }
                      }, _callee15);
                    }));

                    return function (_x17) {
                      return _ref13.apply(this, arguments);
                    };
                  }());
                }));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function value(_x16) {
        return _value5.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.GET_PUBLIC_KEY,
    value: function () {
      var _value6 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee18(request) {
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", new Promise(function (resolve, reject) {
                  var badResult = function badResult() {
                    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                    return resolve({
                      id: request.id,
                      result: _Error["default"].malicious(msg)
                    });
                  };

                  if (Object.keys(request.payload).length !== 2) return badResult();
                  if (!request.payload.hasOwnProperty('blockchain')) return badResult();
                  if (typeof request.payload.blockchain !== 'string') return badResult();
                  if (!_Blockchains.BlockchainsArray.map(function (x) {
                    return x.value;
                  }).includes(request.payload.blockchain)) return badResult('no such blockchain');

                  _EventService["default"].emit('popout', request).then(
                  /*#__PURE__*/
                  function () {
                    var _ref15 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee17(_ref14) {
                      var result, keypair, publicKey;
                      return _regenerator["default"].wrap(function _callee17$(_context17) {
                        while (1) {
                          switch (_context17.prev = _context17.next) {
                            case 0:
                              result = _ref14.result;

                              if (result) {
                                _context17.next = 3;
                                break;
                              }

                              return _context17.abrupt("return", resolve({
                                id: request.id,
                                result: _Error["default"].rejected()
                              }));

                            case 3:
                              keypair = _Keypair["default"].fromJson(result.keypair);
                              publicKey = keypair.publicKeys.find(function (x) {
                                return x.blockchain === request.payload.blockchain;
                              }).key;

                              if (!result.isNew) {
                                _context17.next = 11;
                                break;
                              }

                              _context17.next = 8;
                              return _KeyPairService["default"].saveKeyPair(keypair);

                            case 8:
                              // TODO: Need to solve this with callbacks to the wrapping wallet
                              //router.push({name:RouteNames.KEYPAIR, params:{id:keypair.id}});
                              resolve({
                                id: request.id,
                                result: publicKey
                              });
                              _context17.next = 12;
                              break;

                            case 11:
                              resolve({
                                id: request.id,
                                result: publicKey
                              });

                            case 12:
                            case "end":
                              return _context17.stop();
                          }
                        }
                      }, _callee17);
                    }));

                    return function (_x19) {
                      return _ref15.apply(this, arguments);
                    };
                  }());
                }));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function value(_x18) {
        return _value6.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.UPDATE_IDENTITY,
    value: function () {
      var _value7 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee21(request) {
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                return _context21.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref16 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee20(resolve) {
                    var _request$payload4, origin, name, kyc, ridl, possibleId;

                    return _regenerator["default"].wrap(function _callee20$(_context20) {
                      while (1) {
                        switch (_context20.prev = _context20.next) {
                          case 0:
                            _request$payload4 = request.payload, origin = _request$payload4.origin, name = _request$payload4.name, kyc = _request$payload4.kyc, ridl = _request$payload4.ridl;

                            if (!(name && (name.length < 2 || name.length > 21))) {
                              _context20.next = 3;
                              break;
                            }

                            return _context20.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].signatureError("invalid_name", "Invalid name length (2 - 21)")
                            }));

                          case 3:
                            if (!(kyc && kyc.length)) {
                              _context20.next = 8;
                              break;
                            }

                            if (!(kyc.indexOf('::') === -1)) {
                              _context20.next = 6;
                              break;
                            }

                            return _context20.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].signatureError("invalid_kyc", "KYC properties must be formatted as: domain::hash")
                            }));

                          case 6:
                            if (/^([A-Za-z0-9:-]+)$/.test(kyc)) {
                              _context20.next = 8;
                              break;
                            }

                            return _context20.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].signatureError("invalid_kyc", "Invalid kyc value ([^A-Za-z0-9:-])")
                            }));

                          case 8:
                            possibleId = _PermissionService["default"].identityFromPermissions(origin, false);

                            if (possibleId) {
                              _context20.next = 11;
                              break;
                            }

                            return _context20.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].identityMissing()
                            }));

                          case 11:
                            // if(possibleId.ridl < +new Date())
                            // 	return resolve({id:request.id, result:Error.signatureError("ridl_enabled", "This user already has a RIDL enabled identity and can't change their name externally.")});
                            _EventService["default"].emit('popout', Object.assign(request, {})).then(
                            /*#__PURE__*/
                            function () {
                              var _ref18 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee19(_ref17) {
                                var result, scatter, identity;
                                return _regenerator["default"].wrap(function _callee19$(_context19) {
                                  while (1) {
                                    switch (_context19.prev = _context19.next) {
                                      case 0:
                                        result = _ref17.result;

                                        if (result) {
                                          _context19.next = 3;
                                          break;
                                        }

                                        return _context19.abrupt("return", resolve({
                                          id: request.id,
                                          result: _Error["default"].signatureError("update_rejected", "User rejected the update request")
                                        }));

                                      case 3:
                                        scatter = _StoreService["default"].get().state.scatter.clone();
                                        identity = scatter.keychain.identities.find(function (x) {
                                          return x.id === possibleId.id;
                                        });
                                        if (name && name.length) identity.name = name;
                                        if (kyc && kyc.length) identity.name = name;
                                        scatter.keychain.updateOrPushIdentity(identity);
                                        _context19.next = 10;
                                        return _StoreService["default"].get().dispatch(StoreActions.SET_SCATTER, scatter);

                                      case 10:
                                        resolve({
                                          id: request.id,
                                          result: _PermissionService["default"].identityFromPermissions(origin, true)
                                        });

                                      case 11:
                                      case "end":
                                        return _context19.stop();
                                    }
                                  }
                                }, _callee19);
                              }));

                              return function (_x22) {
                                return _ref18.apply(this, arguments);
                              };
                            }());

                          case 12:
                          case "end":
                            return _context20.stop();
                        }
                      }
                    }, _callee20);
                  }));

                  return function (_x21) {
                    return _ref16.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      function value(_x20) {
        return _value7.apply(this, arguments);
      }

      return value;
    }()
    /******************************************************************************/

    /**                                                                          **/

    /**                                                                          **/

    /**                              HELPER METHODS                              **/

    /**                     These routes do not cause popups                     **/

    /**                                                                          **/

    /**                                                                          **/

    /******************************************************************************/

  }, {
    key: Actions.IDENTITY_FROM_PERMISSIONS,
    value: function () {
      var _value8 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee22(request) {
        var result;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                result = _PermissionService["default"].identityFromPermissions(request.payload.origin, true);
                return _context22.abrupt("return", {
                  id: request.id,
                  result: result
                });

              case 2:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function value(_x23) {
        return _value8.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.GET_AVATAR,
    value: function () {
      var _value9 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee23(request) {
        var payload, origin, possibleId;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                payload = request.payload;
                origin = payload.origin;
                possibleId = _PermissionService["default"].identityFromPermissions(origin, false);

                if (possibleId) {
                  _context23.next = 5;
                  break;
                }

                return _context23.abrupt("return", {
                  id: request.id,
                  result: _Error["default"].identityMissing()
                });

              case 5:
                return _context23.abrupt("return", {
                  id: request.id,
                  result: _StoreService["default"].get().state.scatter.keychain.avatars[possibleId.id]
                });

              case 6:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      function value(_x24) {
        return _value9.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.AUTHENTICATE,
    value: function () {
      var _value10 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee25(request) {
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                return _context25.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref19 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee24(resolve) {
                    var identity, nonceError, publicKey, keypair, isHash, toSign, data, network, signed;
                    return _regenerator["default"].wrap(function _callee24$(_context24) {
                      while (1) {
                        switch (_context24.prev = _context24.next) {
                          case 0:
                            identity = _PermissionService["default"].identityFromPermissions(request.payload.origin);

                            if (identity) {
                              _context24.next = 3;
                              break;
                            }

                            return _context24.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].identityMissing()
                            }));

                          case 3:
                            nonceError = new _Error["default"]('invalid_nonce', 'You must provide a 12 character nonce for authentication');

                            if (request.payload.hasOwnProperty('nonce')) {
                              _context24.next = 6;
                              break;
                            }

                            return _context24.abrupt("return", resolve({
                              id: request,
                              result: nonceError
                            }));

                          case 6:
                            if (!(request.payload.nonce.length !== 12)) {
                              _context24.next = 8;
                              break;
                            }

                            return _context24.abrupt("return", resolve({
                              id: request,
                              result: nonceError
                            }));

                          case 8:
                            publicKey = request.payload.hasOwnProperty('publicKey') && request.payload.publicKey && request.payload.publicKey.length ? request.payload.publicKey : identity.publicKey;
                            keypair = _KeyPairService["default"].getKeyPairFromPublicKey(publicKey);

                            if (keypair) {
                              _context24.next = 12;
                              break;
                            }

                            return _context24.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].noKeypair()
                            }));

                          case 12:
                            isHash = request.payload.hasOwnProperty('data') && request.payload.data && request.payload.data.length;
                            toSign = isHash ? request.payload.data : origin; // Prevention of origins being able to send data buffers to be
                            // signed by the identity which could change to a real balance holding
                            // key in the future.

                            data = _Hasher["default"].unsaltedQuickHash(_Hasher["default"].unsaltedQuickHash(toSign) + _Hasher["default"].unsaltedQuickHash(request.payload.nonce));
                            network = _Network["default"].fromJson({
                              blockchain: keypair.publicKeys.find(function (x) {
                                return x.key === publicKey;
                              }).blockchain
                            });
                            _context24.next = 18;
                            return _SigningService["default"].sign(network, {
                              data: data
                            }, publicKey, true, !!isHash);

                          case 18:
                            signed = _context24.sent;
                            resolve({
                              id: request.id,
                              result: signed
                            });

                          case 20:
                          case "end":
                            return _context24.stop();
                        }
                      }
                    }, _callee24);
                  }));

                  return function (_x26) {
                    return _ref19.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      }));

      function value(_x25) {
        return _value10.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.LOGOUT,
    value: function () {
      var _value11 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee26(request) {
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return _PermissionService["default"].removeIdentityPermission(request.payload.origin);

              case 2:
                return _context26.abrupt("return", {
                  id: request.id,
                  result: true
                });

              case 3:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function value(_x27) {
        return _value11.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.LINK_ACCOUNT,
    value: function () {
      var _value12 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee28(request) {
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                return _context28.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref20 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee27(resolve, reject) {
                    var badResult, scatter, _request$payload5, account, network, origin, keypair, newAccount;

                    return _regenerator["default"].wrap(function _callee27$(_context27) {
                      while (1) {
                        switch (_context27.prev = _context27.next) {
                          case 0:
                            badResult = function badResult() {
                              var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                              return resolve({
                                id: request.id,
                                result: _Error["default"].malicious(msg)
                              });
                            };

                            if (!(Object.keys(request.payload).length !== 3)) {
                              _context27.next = 3;
                              break;
                            }

                            return _context27.abrupt("return", badResult());

                          case 3:
                            if (request.payload.hasOwnProperty('account')) {
                              _context27.next = 5;
                              break;
                            }

                            return _context27.abrupt("return", badResult());

                          case 5:
                            if (request.payload.hasOwnProperty('network')) {
                              _context27.next = 7;
                              break;
                            }

                            return _context27.abrupt("return", badResult());

                          case 7:
                            if (request.payload.account.hasOwnProperty('publicKey')) {
                              _context27.next = 9;
                              break;
                            }

                            return _context27.abrupt("return", badResult());

                          case 9:
                            scatter = _StoreService["default"].get().state.scatter.clone();
                            _request$payload5 = request.payload, account = _request$payload5.account, network = _request$payload5.network, origin = _request$payload5.origin;
                            network = _StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                              return x.unique() === _Network["default"].fromJson(network).unique();
                            });

                            if (network) {
                              _context27.next = 14;
                              break;
                            }

                            return _context27.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].noNetwork()
                            }));

                          case 14:
                            keypair = scatter.keychain.keypairs.find(function (x) {
                              return x.publicKeys.some(function (y) {
                                return y.key === account.publicKey;
                              });
                            });

                            if (keypair) {
                              _context27.next = 17;
                              break;
                            }

                            return _context27.abrupt("return", resolve({
                              id: request.id,
                              result: _Error["default"].noKeypair()
                            }));

                          case 17:
                            newAccount = _Account["default"].fromJson({
                              keypairUnique: keypair.unique(),
                              networkUnique: network.unique(),
                              publicKey: account.publicKey,
                              name: account.name || '',
                              authority: account.authority || '',
                              fromOrigin: origin
                            }); // Applications can only add one network every hour.

                            if (!scatter.keychain.accounts.find(function (x) {
                              return x.fromOrigin === origin && x.createdAt > +new Date() - 3600 * 1000;
                            })) {
                              _context27.next = 20;
                              break;
                            }

                            return _context27.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("link_account_timeout", "You can only add 1 account every hour.")
                            }));

                          case 20:
                            _context27.next = 22;
                            return _AccountService["default"].addAccount(newAccount);

                          case 22:
                            return _context27.abrupt("return", resolve({
                              id: request.id,
                              result: true
                            }));

                          case 23:
                          case "end":
                            return _context27.stop();
                        }
                      }
                    }, _callee27);
                  }));

                  return function (_x29, _x30) {
                    return _ref20.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function value(_x28) {
        return _value12.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.SUGGEST_NETWORK,
    value: function () {
      var _value13 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee30(request) {
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref21 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee29(resolve) {
                    var badResult, network, scatter;
                    return _regenerator["default"].wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            badResult = function badResult() {
                              var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                              return resolve({
                                id: request.id,
                                result: _Error["default"].malicious(msg)
                              });
                            };

                            if (!(Object.keys(request.payload).length !== 2)) {
                              _context29.next = 3;
                              break;
                            }

                            return _context29.abrupt("return", badResult());

                          case 3:
                            if (request.payload.hasOwnProperty('network')) {
                              _context29.next = 5;
                              break;
                            }

                            return _context29.abrupt("return", badResult());

                          case 5:
                            network = request.payload.network;
                            network = _Network["default"].fromJson(network);
                            network.name = request.payload.origin + _IdGenerator["default"].text(4);

                            if (network.hasOwnProperty('token') && network.token) {
                              network.token.blockchain = network.blockchain;
                              network.token.name = network.token.name.length ? network.token.name : network.token.symbol;
                            }

                            if (network.isValid()) {
                              _context29.next = 11;
                              break;
                            }

                            return _context29.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("bad_network", "The network being suggested is invalid")
                            }));

                          case 11:
                            if (!_StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                              return x.unique() === network.unique();
                            })) {
                              _context29.next = 13;
                              break;
                            }

                            return _context29.abrupt("return", resolve({
                              id: request.id,
                              result: true
                            }));

                          case 13:
                            if (!_StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                              return x.fromOrigin === request.payload.origin && x.createdAt > +new Date() - 3600 * 12 * 1000;
                            })) {
                              _context29.next = 15;
                              break;
                            }

                            return _context29.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("network_timeout", "You can only add 1 network every 12 hours.")
                            }));

                          case 15:
                            if (!(_StoreService["default"].get().state.scatter.settings.networks.filter(function (x) {
                              return x.createdAt > +new Date() - 3600 * 12 * 1000;
                            }) > 5)) {
                              _context29.next = 17;
                              break;
                            }

                            return _context29.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("network_timeout", "Too many networks were added over the past 12 hours")
                            }));

                          case 17:
                            network.fromOrigin = request.payload.origin;
                            scatter = _StoreService["default"].get().state.scatter.clone();
                            scatter.settings.networks.push(network);
                            _context29.next = 22;
                            return _StoreService["default"].get().dispatch(StoreActions.SET_SCATTER, scatter);

                          case 22:
                            _context29.next = 24;
                            return _AccountService["default"].importAllAccountsForNetwork(network);

                          case 24:
                            resolve({
                              id: request.id,
                              result: true
                            });

                          case 25:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29);
                  }));

                  return function (_x32) {
                    return _ref21.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }));

      function value(_x31) {
        return _value13.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.ADD_TOKEN,
    value: function () {
      var _value14 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee32(request) {
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref22 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee31(resolve) {
                    var badResult, _request$payload6, network, token, exists;

                    return _regenerator["default"].wrap(function _callee31$(_context31) {
                      while (1) {
                        switch (_context31.prev = _context31.next) {
                          case 0:
                            badResult = function badResult() {
                              var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                              return resolve({
                                id: request.id,
                                result: _Error["default"].malicious(msg)
                              });
                            };

                            if (!(Object.keys(request.payload).length !== 3)) {
                              _context31.next = 3;
                              break;
                            }

                            return _context31.abrupt("return", badResult());

                          case 3:
                            if (request.payload.hasOwnProperty('network')) {
                              _context31.next = 5;
                              break;
                            }

                            return _context31.abrupt("return", badResult());

                          case 5:
                            if (request.payload.hasOwnProperty('token')) {
                              _context31.next = 7;
                              break;
                            }

                            return _context31.abrupt("return", badResult());

                          case 7:
                            _request$payload6 = request.payload, network = _request$payload6.network, token = _request$payload6.token;
                            network = _Network["default"].fromJson(network);
                            token = _Token["default"].fromJson(token);
                            token.name = token.name.length ? token.name : token.symbol;
                            token.blockchain = network.blockchain;
                            token.chainId = network.chainId;
                            token.fromOrigin = request.payload.origin;

                            if (token.isValid()) {
                              _context31.next = 16;
                              break;
                            }

                            return _context31.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("invalid_token", "The token specified is not a valid token object.")
                            }));

                          case 16:
                            if (!(_StoreService["default"].get().state.scatter.settings.tokens.filter(function (x) {
                              return x.fromOrigin === request.payload.origin && x.createdAt > +new Date() - 3600 * 12 * 1000;
                            }).length > 5)) {
                              _context31.next = 18;
                              break;
                            }

                            return _context31.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("token_timeout", "You can only add up to 5 tokens every 12 hours.")
                            }));

                          case 18:
                            if (!(_StoreService["default"].get().state.scatter.settings.tokens.filter(function (x) {
                              return x.createdAt > +new Date() - 3600 * 12 * 1000;
                            }).length > 15)) {
                              _context31.next = 20;
                              break;
                            }

                            return _context31.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("token_timeout", "Too many tokens were added over the past 12 hours.")
                            }));

                          case 20:
                            _context31.next = 22;
                            return _TokenService["default"].hasToken(token);

                          case 22:
                            exists = _context31.sent;

                            if (!exists) {
                              _context31.next = 25;
                              break;
                            }

                            return _context31.abrupt("return", resolve({
                              id: request.id,
                              result: new _Error["default"]("token_exists", "The user already has this token in their Scatter.")
                            }));

                          case 25:
                            _context31.next = 27;
                            return _TokenService["default"].addToken(token);

                          case 27:
                            _BalanceService["default"].loadAllBalances(true);

                            resolve({
                              id: request.id,
                              result: true
                            });

                          case 29:
                          case "end":
                            return _context31.stop();
                        }
                      }
                    }, _callee31);
                  }));

                  return function (_x34) {
                    return _ref22.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));

      function value(_x33) {
        return _value14.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.HAS_ACCOUNT_FOR,
    value: function () {
      var _value15 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee33(request) {
        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", new Promise(function (resolve) {
                  var badResult = function badResult() {
                    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid format';
                    return resolve({
                      id: request.id,
                      result: _Error["default"].malicious(msg)
                    });
                  };

                  if (Object.keys(request.payload).length !== 2) return badResult();
                  if (!request.payload.hasOwnProperty('network')) return badResult();
                  var network = request.payload.network;
                  network = _StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
                    return x.unique() === _Network["default"].fromJson(network).unique();
                  });
                  if (!network) return resolve({
                    id: request.id,
                    result: _Error["default"].noNetwork()
                  });
                  resolve({
                    id: request.id,
                    result: !!_StoreService["default"].get().state.scatter.keychain.accounts.find(function (x) {
                      return x.networkUnique === network.unique();
                    })
                  });
                }));

              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33);
      }));

      function value(_x35) {
        return _value15.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: Actions.GET_VERSION,
    value: function () {
      var _value16 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee34(request) {
        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                return _context34.abrupt("return", new Promise(function (resolve) {
                  resolve({
                    id: request.id,
                    result: _StoreService["default"].get().state.scatter.meta.version
                  });
                }));

              case 1:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34);
      }));

      function value(_x36) {
        return _value16.apply(this, arguments);
      }

      return value;
    }()
  }]);
  return ApiService;
}();

exports["default"] = ApiService;

/***/ }),

/***/ "diYo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Blockchains = __webpack_require__("F+MN");

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var ResourceService =
/*#__PURE__*/
function () {
  function ResourceService() {
    (0, _classCallCheck2["default"])(this, ResourceService);
  }

  (0, _createClass2["default"])(ResourceService, null, [{
    key: "usesResources",
    value: function usesResources(account) {
      account = _Account["default"].fromJson(account);

      var plugin = _PluginRepository["default"].plugin(account.blockchain());

      return plugin.usesResources();
    }
  }, {
    key: "needsResources",
    value: function () {
      var _needsResources = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(account) {
        var plugin;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                account = _Account["default"].fromJson(account);
                plugin = _PluginRepository["default"].plugin(account.blockchain());

                if (plugin.usesResources()) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", false);

              case 4:
                return _context.abrupt("return", plugin.needsResources(account));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function needsResources(_x) {
        return _needsResources.apply(this, arguments);
      }

      return needsResources;
    }()
  }, {
    key: "addResources",
    value: function () {
      var _addResources = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(account) {
        var plugin;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                account = _Account["default"].fromJson(account);
                plugin = _PluginRepository["default"].plugin(account.blockchain());

                if (plugin.usesResources()) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", false);

              case 4:
                return _context2.abrupt("return", plugin.addResources(account));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addResources(_x2) {
        return _addResources.apply(this, arguments);
      }

      return addResources;
    }()
  }, {
    key: "getResourcesFor",
    value: function () {
      var _getResourcesFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(account) {
        var plugin;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                account = _Account["default"].fromJson(account);
                plugin = _PluginRepository["default"].plugin(account.blockchain());

                if (plugin.usesResources()) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", []);

              case 4:
                return _context3.abrupt("return", plugin.getResourcesFor(account));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getResourcesFor(_x3) {
        return _getResourcesFor.apply(this, arguments);
      }

      return getResourcesFor;
    }()
  }, {
    key: "cacheResourceFor",
    value: function () {
      var _cacheResourceFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(account) {
        var resources;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (account) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return ResourceService.getResourcesFor(account);

              case 4:
                resources = _context4.sent;

                _StoreService["default"].get().dispatch(Actions.ADD_RESOURCES, {
                  acc: account.identifiable(),
                  res: resources
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function cacheResourceFor(_x4) {
        return _cacheResourceFor.apply(this, arguments);
      }

      return cacheResourceFor;
    }()
  }]);
  return ResourceService;
}();

exports["default"] = ResourceService;

/***/ }),

/***/ "eOAV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _Permission = _interopRequireDefault(__webpack_require__("Ouh5"));

var _Identity = __webpack_require__("EY8S");

var _SocketService = _interopRequireDefault(__webpack_require__("btL5"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var PermissionService =
/*#__PURE__*/
function () {
  function PermissionService() {
    (0, _classCallCheck2["default"])(this, PermissionService);
  }

  (0, _createClass2["default"])(PermissionService, null, [{
    key: "identityFromPermissions",
    value: function identityFromPermissions(origin) {
      var formatForResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var permissions = _StoreService["default"].get().state.scatter.keychain.permissions;

      var possibleId = permissions.find(function (x) {
        return x.isIdentityPermissionFor(origin);
      });

      if (possibleId) {
        var identityRequirements = _Identity.IdentityRequiredFields.fromPermission(possibleId.identityRequirements);

        var identity = formatForResult ? possibleId.getIdentity().asOnlyRequiredFields(identityRequirements) : possibleId.getIdentity();
        if (!identity) return null;
        identity.accounts = possibleId.getAccounts().map(function (x) {
          return formatForResult ? x.asReturnable() : x;
        });
        return identity;
      }

      return null;
    }
  }, {
    key: "addIdentityOriginPermission",
    value: function () {
      var _addIdentityOriginPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(identity, accounts, identityRequirements, origin) {
        var scatter, permission;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                identityRequirements = _Identity.IdentityRequiredFields.fromJson(identityRequirements);
                identityRequirements = identityRequirements.forPermission();
                _context.next = 4;
                return this.removeIdentityPermission(origin);

              case 4:
                scatter = _StoreService["default"].get().state.scatter.clone();
                permission = _Permission["default"].fromAction(origin, identity, accounts, {
                  identityRequirements: identityRequirements,
                  isIdentity: true
                });
                scatter.keychain.permissions.push(permission);
                return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addIdentityOriginPermission(_x, _x2, _x3, _x4) {
        return _addIdentityOriginPermission.apply(this, arguments);
      }

      return addIdentityOriginPermission;
    }()
  }, {
    key: "removeIdentityPermission",
    value: function () {
      var _removeIdentityPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(origin) {
        var scatter;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone(); // const idPermissions = scatter.keychain.permissions.find(x => x.isIdentity && x.origin === origin);
                // if(!idPermissions) return true;

                scatter.keychain.permissions = scatter.keychain.permissions.filter(function (x) {
                  return !x.isIdentity || x.isIdentity && x.origin !== origin;
                });
                return _context2.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function removeIdentityPermission(_x5) {
        return _removeIdentityPermission.apply(this, arguments);
      }

      return removeIdentityPermission;
    }()
  }, {
    key: "addIdentityRequirementsPermission",
    value: function () {
      var _addIdentityRequirementsPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(origin, identity, identityRequirements) {
        var scatter, permission;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                identityRequirements = _Identity.IdentityRequiredFields.fromJson(identityRequirements); // No need for a permission.

                if (!identityRequirements.isEmpty()) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                identityRequirements = identityRequirements.forPermission();
                scatter = _StoreService["default"].get().state.scatter.clone();
                permission = _Permission["default"].fromJson({
                  origin: origin,
                  identity: identity.id,
                  identityRequirements: identityRequirements,
                  isIdentityRequirements: true
                }); // Don't duplicate requirements.

                if (!scatter.keychain.permissions.find(function (x) {
                  return x.checksum() === permission.checksum();
                })) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return");

              case 8:
                scatter.keychain.permissions.push(permission);
                return _context3.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addIdentityRequirementsPermission(_x6, _x7, _x8) {
        return _addIdentityRequirementsPermission.apply(this, arguments);
      }

      return addIdentityRequirementsPermission;
    }()
  }, {
    key: "hasIdentityRequirementsPermission",
    value: function hasIdentityRequirementsPermission(origin, identity, identityRequirements) {
      identityRequirements = _Identity.IdentityRequiredFields.fromJson(identityRequirements);
      identityRequirements = identityRequirements.forPermission();

      var permission = _Permission["default"].fromJson({
        origin: origin,
        identity: identity.id,
        identityRequirements: identityRequirements,
        isIdentityRequirements: true
      });

      return _StoreService["default"].get().state.scatter.keychain.permissions.find(function (x) {
        return x.checksum() === permission.checksum();
      });
    }
  }, {
    key: "createActionPermission",
    value: function createActionPermission(origin, identity, accounts, whitelistData) {
      var immutableActionFields = _Permission["default"].createImmutableFieldsHash(whitelistData.fields, whitelistData.props);

      var permission = _Permission["default"].fromAction(origin, identity, accounts, {
        contract: whitelistData.code,
        contractHash: whitelistData.hash || null,
        action: whitelistData.type,
        immutableActionFields: immutableActionFields,
        mutableActionFields: whitelistData.props,
        timestamp: +new Date(),
        isContractAction: true
      });

      var scatter = _StoreService["default"].get().state.scatter.clone();

      return permission;
    }
  }, {
    key: "addActionPermissions",
    value: function () {
      var _addActionPermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(origin, identity, accounts, whitelists) {
        var permissions, scatter;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!whitelists || !whitelists.length)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                permissions = whitelists.map(function (whitelist) {
                  return PermissionService.createActionPermission(origin, identity, accounts, whitelist);
                }).filter(function (x) {
                  return x;
                });

                if (!permissions.length) {
                  _context4.next = 8;
                  break;
                }

                scatter = _StoreService["default"].get().state.scatter.clone();
                permissions.map(function (perm) {
                  // Removing all similar permissions for this action
                  var similar = scatter.keychain.permissions.filter(function (x) {
                    return x.origin === origin && x.isContractAction && x.contract === perm.contract && x.action === perm.action;
                  }).map(function (x) {
                    return x.id;
                  });
                  scatter.keychain.permissions = scatter.keychain.permissions.filter(function (x) {
                    return !similar.includes(x.id);
                  });
                  scatter.keychain.permissions.push(perm);
                });
                _context4.next = 8;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addActionPermissions(_x9, _x10, _x11, _x12) {
        return _addActionPermissions.apply(this, arguments);
      }

      return addActionPermissions;
    }()
  }, {
    key: "hasActionPermission",
    value: function hasActionPermission(origin, identity, accounts, message) {
      var contract = message.code;
      var action = message.type;
      var contractHash = null;

      var permission = _Permission["default"].fromAction(origin, identity, accounts, {
        contract: contract,
        contractHash: contractHash,
        action: action,
        isContractAction: true
      });

      var matchingPermissions = _StoreService["default"].get().state.scatter.keychain.permissions.filter(function (x) {
        return x.checksum() === permission.checksum();
      });

      if (!matchingPermissions.length) return false;
      return matchingPermissions.some(function (perm) {
        var immutableActionFields = _Permission["default"].createImmutableFieldsHash(message.data, perm.mutableActionFields);

        return perm.immutableActionFields === immutableActionFields;
      });
    }
  }, {
    key: "isWhitelistedTransaction",
    value: function isWhitelistedTransaction(origin, identity, accounts, messages, requiredFields) {
      requiredFields = _Identity.IdentityRequiredFields.fromJson(requiredFields); // Checking for permissions

      var whitelistedActions = messages.every(function (message) {
        return PermissionService.hasActionPermission(origin, identity, accounts, message);
      }); // Not all actions are whitelisted

      if (!whitelistedActions) return false; // Dont need to check for required fields

      if (requiredFields.isEmpty()) return true;
      return PermissionService.hasIdentityRequirementsPermission(origin, identity, requiredFields);
    }
  }, {
    key: "checkAppLinkPermissions",
    value: function checkAppLinkPermissions(origin) {
      var permissions = _StoreService["default"].get().state.scatter.keychain.permissions.filter(function (x) {
        return x.origin === origin;
      });

      if (!permissions.length) _SocketService["default"].sendEvent('logout', {}, origin);
    }
  }, {
    key: "removeAllPermissions",
    value: function () {
      var _removeAllPermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var scatter;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.permissions = [];
                scatter.keychain.apps.map(function (app) {
                  scatter.keychain.removeApp(app);

                  _SocketService["default"].sendEvent('logout', {}, app.origin);
                });
                return _context5.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function removeAllPermissions() {
        return _removeAllPermissions.apply(this, arguments);
      }

      return removeAllPermissions;
    }()
  }, {
    key: "removeAllPermissionsFor",
    value: function () {
      var _removeAllPermissionsFor = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(origin) {
        var scatter, app;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                app = scatter.keychain.apps.find(function (x) {
                  return x.origin === origin;
                });
                if (app) scatter.keychain.removeApp(app);
                scatter.keychain.permissions = scatter.keychain.permissions.filter(function (x) {
                  return x.origin !== origin;
                });
                _context6.next = 6;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 6:
                this.checkAppLinkPermissions(origin);
                return _context6.abrupt("return", true);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeAllPermissionsFor(_x13) {
        return _removeAllPermissionsFor.apply(this, arguments);
      }

      return removeAllPermissionsFor;
    }()
  }, {
    key: "removePermission",
    value: function () {
      var _removePermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(permission) {
        var scatter;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.permissions = scatter.keychain.permissions.filter(function (x) {
                  return x.id !== permission.id;
                });
                _context7.next = 4;
                return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);

              case 4:
                this.checkAppLinkPermissions(permission.origin);
                return _context7.abrupt("return", true);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removePermission(_x14) {
        return _removePermission.apply(this, arguments);
      }

      return removePermission;
    }()
  }, {
    key: "removeDanglingPermissions",
    value: function () {
      var _removeDanglingPermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var scatter, origins;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                origins = scatter.keychain.permissions.map(function (x) {
                  return x.origin;
                });
                scatter.keychain.apps = scatter.keychain.apps.filter(function (x) {
                  return origins.includes(x.origin);
                });
                return _context8.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function removeDanglingPermissions() {
        return _removeDanglingPermissions.apply(this, arguments);
      }

      return removeDanglingPermissions;
    }()
  }]);
  return PermissionService;
}();

exports["default"] = PermissionService;

/***/ }),

/***/ "fEu1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AppsService = _interopRequireDefault(__webpack_require__("x0xh"));

var _PermissionService = _interopRequireDefault(__webpack_require__("eOAV"));

var _default = {
  AppsService: _AppsService["default"],
  PermissionService: _PermissionService["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "l31u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var _BackendApiService = __webpack_require__("MPB0");

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _Framework = _interopRequireDefault(__webpack_require__("z/LQ"));

var timeout = function timeout(rq) {
  var caughtValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return Promise.race([new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(caughtValue);
    }, 10000);
  }), rq["catch"](function () {
    return caughtValue;
  })]);
};

var watchers = [];
var watchTimeout;

var ExchangeService =
/*#__PURE__*/
function () {
  function ExchangeService() {
    (0, _classCallCheck2["default"])(this, ExchangeService);
  }

  (0, _createClass2["default"])(ExchangeService, null, [{
    key: "pairs",
    value: function () {
      var _pairs = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(token) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", timeout((0, _BackendApiService.POST)('exchange/pairs', {
                  token: token
                })).then(function (pairs) {
                  if (!pairs) return [];
                  Object.keys(pairs).map(function (key) {
                    return pairs[key].map(function (x) {
                      return x.token = _Token["default"].fromJson(x.token);
                    });
                  });
                  return pairs;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function pairs(_x) {
        return _pairs.apply(this, arguments);
      }

      return pairs;
    }()
  }, {
    key: "rate",
    value: function () {
      var _rate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(token, other, service) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", timeout((0, _BackendApiService.POST)('exchange/rate', {
                  token: token,
                  other: other,
                  service: service
                })));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function rate(_x2, _x3, _x4) {
        return _rate.apply(this, arguments);
      }

      return rate;
    }()
  }, {
    key: "order",
    value: function () {
      var _order = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(service, token, other, amount, from, to) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", timeout((0, _BackendApiService.POST)('exchange/order', {
                  service: service,
                  token: token,
                  other: other,
                  amount: amount,
                  from: from,
                  to: to
                })));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function order(_x5, _x6, _x7, _x8, _x9, _x10) {
        return _order.apply(this, arguments);
      }

      return order;
    }()
  }, {
    key: "accepted",
    value: function () {
      var _accepted = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", timeout((0, _BackendApiService.GET)("exchange/accepted/".concat(id))));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function accepted(_x11) {
        return _accepted.apply(this, arguments);
      }

      return accepted;
    }()
  }, {
    key: "cancelled",
    value: function () {
      var _cancelled = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(id) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", timeout((0, _BackendApiService.GET)("exchange/cancelled/".concat(id))));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function cancelled(_x12) {
        return _cancelled.apply(this, arguments);
      }

      return cancelled;
    }()
  }, {
    key: "orderStatus",
    value: function () {
      var _orderStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(id) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", timeout((0, _BackendApiService.GET)("exchange/order/".concat(id)).then(function (res) {
                  return res.updated.status;
                })));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function orderStatus(_x13) {
        return _orderStatus.apply(this, arguments);
      }

      return orderStatus;
    }()
  }, {
    key: "stablePaths",
    value: function () {
      var _stablePaths = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", timeout((0, _BackendApiService.GET)("exchange/stabilize/paths"), []));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function stablePaths() {
        return _stablePaths.apply(this, arguments);
      }

      return stablePaths;
    }()
  }, {
    key: "pairable",
    value: function () {
      var _pairable = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", timeout((0, _BackendApiService.GET)("exchange/pairable"), []));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function pairable() {
        return _pairable.apply(this, arguments);
      }

      return pairable;
    }()
  }, {
    key: "watch",
    value: function watch(history) {
      watchers.push(history);
      this.checkExchanges();
      return true;
    }
  }, {
    key: "checkExchanges",
    value: function () {
      var _checkExchanges = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9() {
        var _this = this;

        var _loop, i;

        return _regenerator["default"].wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                clearTimeout(watchTimeout);

                if (watchers.length) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return");

              case 3:
                _loop =
                /*#__PURE__*/
                _regenerator["default"].mark(function _loop(i) {
                  var history, status, accounts, n;
                  return _regenerator["default"].wrap(function _loop$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          history = watchers[i];
                          _context9.next = 3;
                          return _this.orderStatus(history.orderDetails.id);

                        case 3:
                          status = _context9.sent;

                          if (!(status !== history.status)) {
                            _context9.next = 20;
                            break;
                          }

                          history.status = status;
                          _context9.next = 8;
                          return _StoreService["default"].get().dispatch(Actions.UPDATE_HISTORY, history);

                        case 8:
                          if (!(status === 'complete')) {
                            _context9.next = 20;
                            break;
                          }

                          // TODO: need to solve this with an injected sound service
                          //SoundService.ding();
                          _Framework["default"].pushNotification('Exchange Complete', "Your token exchange has just completed.");

                          watchers = watchers.filter(function (x) {
                            return x.id !== history.id;
                          });
                          accounts = _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
                            return x.sendable() === history.to;
                          });

                          if (!accounts.length) {
                            _context9.next = 20;
                            break;
                          }

                          n = 0;

                        case 14:
                          if (!(n < accounts.length)) {
                            _context9.next = 20;
                            break;
                          }

                          _context9.next = 17;
                          return _BalanceService["default"].loadBalancesFor(accounts[n]);

                        case 17:
                          n++;
                          _context9.next = 14;
                          break;

                        case 20:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _loop);
                });
                i = 0;

              case 5:
                if (!(i < watchers.length)) {
                  _context10.next = 10;
                  break;
                }

                return _context10.delegateYield(_loop(i), "t0", 7);

              case 7:
                i++;
                _context10.next = 5;
                break;

              case 10:
                setTimeout(function () {
                  return _this.checkExchanges();
                }, 1000 * 30);

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9);
      }));

      function checkExchanges() {
        return _checkExchanges.apply(this, arguments);
      }

      return checkExchanges;
    }()
  }]);
  return ExchangeService;
}();

exports["default"] = ExchangeService;

/***/ }),

/***/ "x0xh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Blockchains = __webpack_require__("F+MN");

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _BackendApiService = _interopRequireWildcard(__webpack_require__("MPB0"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var storeApps = function storeApps(res) {};

var AppsService =
/*#__PURE__*/
function () {
  function AppsService() {
    (0, _classCallCheck2["default"])(this, AppsService);
  }

  (0, _createClass2["default"])(AppsService, null, [{
    key: "getApps",

    /***
     * Gets apps and binds them to state,
     * falls back to github if API is failing.
     * @returns {Promise<boolean>}
     */
    value: function () {
      var _getApps = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var include,
            store,
            imageBackend,
            filetype,
            apps,
            formattedApps,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                include = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
                store = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                imageBackend = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'https://rawgit.com/GetScatter/ScatterApps/master/logos';
                filetype = _args.length > 3 && _args[3] !== undefined ? _args[3] : 'svg';
                _context.next = 6;
                return _BackendApiService["default"].apps(include);

              case 6:
                apps = _context.sent;
                formattedApps = apps.reduce(function (acc, x) {
                  if (x.hasOwnProperty('hasimage')) x.img = "".concat(imageBackend, "/").concat(x.applink, ".").concat(filetype);
                  acc[x.applink] = x;
                  return acc;
                }, {});

                if (store && _StoreService["default"].get()) {
                  _StoreService["default"].get().dispatch(Actions.SET_DAPP_DATA, formattedApps);
                }

                return _context.abrupt("return", formattedApps);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getApps() {
        return _getApps.apply(this, arguments);
      }

      return getApps;
    }()
  }, {
    key: "getFeaturedApps",
    value: function () {
      var _getFeaturedApps = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _BackendApiService.GET)('apps/featured');

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getFeaturedApps() {
        return _getFeaturedApps.apply(this, arguments);
      }

      return getFeaturedApps;
    }()
  }, {
    key: "getAppDataFromServer",
    value: function () {
      var _getAppDataFromServer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(origin) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", (0, _BackendApiService.GET)("app/".concat(origin)));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAppDataFromServer(_x) {
        return _getAppDataFromServer.apply(this, arguments);
      }

      return getAppDataFromServer;
    }()
  }, {
    key: "appIsInLocalData",
    value: function appIsInLocalData(origin) {
      var dappData = _StoreService["default"].get().state.dappData || {};
      var found = dappData[origin];

      if (!found) {
        (function () {
          // Checking subdomains
          if (origin.split('.').length < 2) return;

          var _origin$split = origin.split('.'),
              _origin$split2 = (0, _slicedToArray2["default"])(_origin$split, 3),
              subdomain = _origin$split2[0],
              domain = _origin$split2[1],
              suffix = _origin$split2[2];

          Object.keys(dappData).map(function (applink) {
            if (origin.indexOf(applink) === -1) return;
            var dapp = dappData[applink];
            if (!dapp.hasOwnProperty('subdomains') || !dapp.subdomains.length) return; // Checking wildcards

            if (dapp.subdomains.find(function (x) {
              return x === '*';
            })) {
              if ("*.".concat(applink) === "*.".concat(domain, ".").concat(suffix)) return found = dapp;
            } // Checking hardcoded domains
            else {
                dapp.subdomains.map(function (sub) {
                  if ("".concat(sub, ".").concat(applink) === origin) return found = dapp;
                });
              }
          });
        })();
      }

      return found;
    }
  }, {
    key: "getAppData",
    value: function getAppData(origin) {
      var emptyResult = {
        applink: origin,
        type: '',
        name: origin,
        description: '',
        logo: '',
        url: ''
      };
      var found = AppsService.appIsInLocalData(origin);
      if (!found) return emptyResult;
      var maxDescriptionLength = 70;

      if (found.description.length > maxDescriptionLength) {
        found.description = "".concat(found.description.substr(0, 70)).concat(found.description.length > 70 ? '...' : '');
      }

      return found;
    }
  }, {
    key: "categories",
    value: function categories() {
      var selectedCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return AppsService.appsByCategory(selectedCategory).map(function (x) {
        return x.type;
      });
    }
  }, {
    key: "appsByCategory",
    value: function appsByCategory() {
      var selectedCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var dappData = _StoreService["default"].get().state.dappData;

      if (!dappData) return {};
      return Object.keys(dappData).reduce(function (acc, key) {
        var item = dappData[key];
        if (!acc.find(function (x) {
          return x.type === item.type;
        })) acc.push({
          type: item.type,
          apps: []
        });
        acc.find(function (x) {
          return x.type === item.type;
        }).apps.push(item);
        return acc;
      }, []).map(function (cat) {
        _ObjectHelpers["default"].shuffle(cat.apps);

        if (selectedCategory) return cat;
        cat.apps = cat.apps.filter(function (_ref) {
          var applink = _ref.applink;
          return AppsService.getAppData(applink).hasOwnProperty('img');
        });
        return cat;
      }).sort(function (a, b) {
        return b.apps.length - a.apps.length;
      });
    }
  }, {
    key: "appsByTerm",
    value: function appsByTerm(searchTerm) {
      var dappData = _StoreService["default"].get().state.dappData;

      if (!dappData) return {};
      return Object.keys(dappData).reduce(function (acc, key) {
        var item = dappData[key];

        var found = function found(prop) {
          return prop.toLowerCase().trim().indexOf(searchTerm.toLowerCase().trim()) > -1;
        };

        if (found(item.applink) || found(item.name) || found(item.description)) acc.push(item);
        return acc;
      }, []);
    }
  }, {
    key: "linkedApps",
    value: function linkedApps() {
      var terms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var typeFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _StoreService["default"].get().state.scatter.keychain.permissions.filter(function (x) {
        return x.isIdentity;
      }).map(function (_ref2) {
        var applink = _ref2.origin;
        return AppsService.getAppData(applink);
      }).filter(function (app) {
        return app.type === typeFilter || !typeFilter;
      }).filter(function (app) {
        return app.name.toLowerCase().indexOf(terms) > -1;
      });
    }
  }]);
  return AppsService;
}();

exports["default"] = AppsService;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9ibG9ja2NoYWluL0FjY291bnRTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2Jsb2NrY2hhaW4vRXhwbG9yZXJTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2Jsb2NrY2hhaW4vTmV0d29ya1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYmxvY2tjaGFpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9ibG9ja2NoYWluL0JhbGFuY2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2Jsb2NrY2hhaW4vVHJhbnNmZXJTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvQmFja2VuZEFwaVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYXBpcy9QcmljZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYXBpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcGlzL0FwaVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYmxvY2tjaGFpbi9SZXNvdXJjZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYXBwcy9QZXJtaXNzaW9uU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcHBzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvRXhjaGFuZ2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwcHMvQXBwc1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsOEJBQThCLG1CQUFPLENBQUMsTUFBK0M7O0FBRXJGLDZCQUE2QixtQkFBTyxDQUFDLE1BQThDOztBQUVuRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDBDQUEwQyxtQkFBTyxDQUFDLE1BQTRCOztBQUU5RSxnREFBZ0QsbUJBQU8sQ0FBQyxNQUF5Qzs7QUFFakcsOENBQThDLG1CQUFPLENBQUMsTUFBdUM7O0FBRTdGLDJDQUEyQyxtQkFBTyxDQUFDLE1BQW9DOztBQUV2RixzQ0FBc0MsbUJBQU8sQ0FBQyxNQUFzQjs7QUFFcEUsK0NBQStDLG1CQUFPLENBQUMsTUFBZ0M7O0FBRXZGLHNDQUFzQyxtQkFBTyxDQUFDLE1BQXVCOztBQUVyRSxtQkFBbUIsbUJBQU8sQ0FBQyxNQUEwQjs7QUFFckQsMkNBQTJDLG1CQUFPLENBQUMsTUFBeUI7O0FBRTVFLDZDQUE2QyxtQkFBTyxDQUFDLE1BQWtCOztBQUV2RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQiw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixFQUFFOztBQUUvQjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQkFBbUI7QUFDbkIsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCxnQzs7Ozs7Ozs7QUNwaUVhOztBQUViLDhCQUE4QixtQkFBTyxDQUFDLE1BQStDOztBQUVyRiw2QkFBNkIsbUJBQU8sQ0FBQyxNQUE4Qzs7QUFFbkY7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSwwQ0FBMEMsbUJBQU8sQ0FBQyxNQUE0Qjs7QUFFOUUsZ0RBQWdELG1CQUFPLENBQUMsTUFBeUM7O0FBRWpHLDhDQUE4QyxtQkFBTyxDQUFDLE1BQXVDOztBQUU3RiwyQ0FBMkMsbUJBQU8sQ0FBQyxNQUFvQzs7QUFFdkYsK0NBQStDLG1CQUFPLENBQUMsTUFBZ0M7O0FBRXZGLG1CQUFtQixtQkFBTyxDQUFDLE1BQTBCOztBQUVyRCxzQ0FBc0MsbUJBQU8sQ0FBQyxNQUFzQjs7QUFFcEUsc0NBQXNDLG1CQUFPLENBQUMsTUFBdUI7O0FBRXJFLDJDQUEyQyxtQkFBTyxDQUFDLE1BQXlCOztBQUU1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFP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QkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCxxQzs7Ozs7Ozs7QUNyYWE7O0FBRWIsOEJBQThCLG1CQUFPLENBQUMsTUFBK0M7O0FBRXJGLDZCQUE2QixtQkFBTyxDQUFDLE1BQThDOztBQUVuRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDZDQUE2QyxtQkFBTyxDQUFDLE1BQXNDOztBQUUzRiwwQ0FBMEMsbUJBQU8sQ0FBQyxNQUE0Qjs7QUFFOUUsZ0RBQWdELG1CQUFPLENBQUMsTUFBeUM7O0FBRWpHLDhDQUE4QyxtQkFBTyxDQUFDLE1BQXVDOztBQUU3RiwyQ0FBMkMsbUJBQU8sQ0FBQyxNQUFvQzs7QUFFdkYsbUJBQW1CLG1CQUFPLENBQUMsTUFBMEI7O0FBRXJELHNDQUFzQyxtQkFBTyxDQUFDLE1BQXVCOztBQUVyRSxpREFBaUQsbUJBQU8sQ0FBQyxNQUEyQjs7QUFFcEYsMkNBQTJDLG1CQUFPLENBQUMsTUFBeUI7O0FBRTVFLDRDQUE0QyxtQkFBTyxDQUFDLE1BQTBCOztBQUU5RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7O0FBRXRGO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVELGlDIiwiZmlsZSI6InZlbmRvcn4xM2I1N2JiZi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfQWNjb3VudCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9BY2NvdW50XCIpKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9CbG9ja2NoYWlucyA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX0JhbGFuY2VTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9CYWxhbmNlU2VydmljZVwiKSk7XG5cbnZhciBjaGVja2VkT3JwaGFuZWRBY2NvdW50cyA9IGZhbHNlO1xuXG52YXIgQWNjb3VudFNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBY2NvdW50U2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEFjY291bnRTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoQWNjb3VudFNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImFkZEFjY291bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hZGRBY2NvdW50ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoYWNjb3VudCkge1xuICAgICAgICB2YXIgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4uYWRkQWNjb3VudChhY2NvdW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEFjY291bnQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9hZGRBY2NvdW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRBY2NvdW50O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZUFjY291bnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcmVtb3ZlQWNjb3VudHMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoYWNjb3VudHMpIHtcbiAgICAgICAgdmFyIHNjYXR0ZXI7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgYWNjb3VudHMubWFwKGZ1bmN0aW9uIChhY2NvdW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2NhdHRlci5rZXljaGFpbi5yZW1vdmVBY2NvdW50KGFjY291bnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIF9CYWxhbmNlU2VydmljZVtcImRlZmF1bHRcIl0ucmVtb3ZlU3RhbGVCYWxhbmNlcygpKTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlQWNjb3VudHMoX3gyKSB7XG4gICAgICAgIHJldHVybiBfcmVtb3ZlQWNjb3VudHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbW92ZUFjY291bnRzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImltcG9ydEFsbEFjY291bnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfaW1wb3J0QWxsQWNjb3VudHMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTUoa2V5cGFpcikge1xuICAgICAgICB2YXIgaXNOZXdLZXlwYWlyLFxuICAgICAgICAgICAgYmxvY2tjaGFpbnMsXG4gICAgICAgICAgICBuZXR3b3JrcyxcbiAgICAgICAgICAgIGFkZE9ubHksXG4gICAgICAgICAgICBfYXJnczUgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NS5wcmV2ID0gX2NvbnRleHQ1Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlzTmV3S2V5cGFpciA9IF9hcmdzNS5sZW5ndGggPiAxICYmIF9hcmdzNVsxXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M1WzFdIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgYmxvY2tjaGFpbnMgPSBfYXJnczUubGVuZ3RoID4gMiAmJiBfYXJnczVbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzNVsyXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbmV0d29ya3MgPSBfYXJnczUubGVuZ3RoID4gMyAmJiBfYXJnczVbM10gIT09IHVuZGVmaW5lZCA/IF9hcmdzNVszXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgYWRkT25seSA9IF9hcmdzNS5sZW5ndGggPiA0ICYmIF9hcmdzNVs0XSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M1WzRdIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjYXR0ZXIsIGFjY291bnRzLCB1bmlxdWVzLCBhY2NvdW50c1RvUmVtb3ZlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXR3b3JrcykgbmV0d29ya3MgPSBzY2F0dGVyLnNldHRpbmdzLm5ldHdvcmtzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmxvY2tjaGFpbnMpIGJsb2NrY2hhaW5zID0ga2V5cGFpci5ibG9ja2NoYWlucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGJsb2NrY2hhaW5zLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGJsb2NrY2hhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsdWdpbiwgZmlsdGVyZWROZXR3b3JrcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihibG9ja2NoYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE5ldHdvcmtzID0gbmV0d29ya3MuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5ibG9ja2NoYWluID09PSBibG9ja2NoYWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNOZXdLZXlwYWlyICYmIHBsdWdpbi5hY2NvdW50c0FyZUltcG9ydGVkKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgQWNjb3VudFNlcnZpY2UuYWNjb3VudHNGcm9tKHBsdWdpbiwgZmlsdGVyZWROZXR3b3JrcywgYWNjb3VudHMsIGtleXBhaXIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWVzID0gYWNjb3VudHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50c1RvUmVtb3ZlID0gc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmtleXBhaXJVbmlxdWUgPT09IGtleXBhaXIudW5pcXVlKCkgJiYgIXVuaXF1ZXMuaW5jbHVkZXMoeC51bmlxdWUoKSkgJiYgYmxvY2tjaGFpbnMuaW5jbHVkZXMoeC5ibG9ja2NoYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgLy8gVGhpcyBtZXRob2QgdGFrZXMgYSB3aGlsZSwgcmUtY2xvbmluZyB0byBtYWtlIHN1cmUgd2UncmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHdheXMgdXAgdG8gZGF0ZSBiZWZvcmUgY29tbWl0dGluZyB0aGUgZGF0YSB0byBzdG9yYWdlLlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFkZE9ubHkpIGFjY291bnRzVG9SZW1vdmUubWFwKGZ1bmN0aW9uIChhY2NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhdHRlci5rZXljaGFpbi5yZW1vdmVBY2NvdW50KGFjY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRzLm1hcChmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYXR0ZXIua2V5Y2hhaW4uYWRkQWNjb3VudChhY2NvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfQmFsYW5jZVNlcnZpY2VbXCJkZWZhdWx0XCJdLnJlbW92ZVN0YWxlQmFsYW5jZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFjY291bnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU0KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGltcG9ydEFsbEFjY291bnRzKF94Mykge1xuICAgICAgICByZXR1cm4gX2ltcG9ydEFsbEFjY291bnRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbXBvcnRBbGxBY2NvdW50cztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJpbXBvcnRBbGxBY2NvdW50c0Zvck5ldHdvcmtcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9pbXBvcnRBbGxBY2NvdW50c0Zvck5ldHdvcmsgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTgobmV0d29yaykge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU4JChfY29udGV4dDgpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDgucHJldiA9IF9jb250ZXh0OC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU3KHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjYXR0ZXIsIGJsb2NrY2hhaW4sIGtleXBhaXJzLCBhY2NvdW50cywgcGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW4gPSBuZXR3b3JrLmJsb2NrY2hhaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cGFpcnMgPSBzY2F0dGVyLmtleWNoYWluLmtleXBhaXJzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbnMuaW5jbHVkZXMoYmxvY2tjaGFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKG5ldHdvcmsuYmxvY2tjaGFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChrZXlwYWlycy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNihrZXlwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTYkKF9jb250ZXh0Nikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Ni5wcmV2ID0gX2NvbnRleHQ2Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuYWJydXB0KFwicmV0dXJuXCIsIEFjY291bnRTZXJ2aWNlLmFjY291bnRzRnJvbShwbHVnaW4sIFtuZXR3b3JrXSwgYWNjb3VudHMsIGtleXBhaXIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWY0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIG1ldGhvZCB0YWtlcyBhIHdoaWxlLCByZS1jbG9uaW5nIHRvIG1ha2Ugc3VyZSB3ZSdyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsd2F5cyB1cCB0byBkYXRlIGJlZm9yZSBjb21taXR0aW5nIHRoZSBkYXRhIHRvIHN0b3JhZ2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50cy5tYXAoZnVuY3Rpb24gKGFjY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2F0dGVyLmtleWNoYWluLmFkZEFjY291bnQoYWNjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU3KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTgpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBpbXBvcnRBbGxBY2NvdW50c0Zvck5ldHdvcmsoX3g2KSB7XG4gICAgICAgIHJldHVybiBfaW1wb3J0QWxsQWNjb3VudHNGb3JOZXR3b3JrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbXBvcnRBbGxBY2NvdW50c0Zvck5ldHdvcms7XG4gICAgfSgpXG4gICAgLyoqKlxyXG4gICAgICAgICogR2V0cyBhY2NvdW50cyBmcm9tIG5ldHdvcmtzXHJcbiAgICAgKiBAcGFyYW0gcGx1Z2luIC0gQmxvY2tjaGFpbiBwbHVnaW5cclxuICAgICAqIEBwYXJhbSBuZXR3b3JrcyAtIE5ldHdvcmtzIHRvIGZldGNoIGZyb21cclxuICAgICAqIEBwYXJhbSBhY2NvdW50cyAtIChPVVQpIGFjY291bnRzIGFycmF5IHRvIGFwcGVuZCB0b1xyXG4gICAgICogQHBhcmFtIGtleXBhaXIgLSBBc3NvY2lhdGVkIGtleXBhaXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJhY2NvdW50c0Zyb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hY2NvdW50c0Zyb20gPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTExKHBsdWdpbiwgbmV0d29ya3MsIGFjY291bnRzLCBrZXlwYWlyKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTExJChfY29udGV4dDExKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMS5wcmV2ID0gX2NvbnRleHQxMS5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMS5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmNSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMCQoX2NvbnRleHQxMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTAucHJldiA9IF9jb250ZXh0MTAubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwbHVnaW4uYWNjb3VudHNBcmVJbXBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobmV0d29ya3MubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTkobmV0d29yaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU5JChfY29udGV4dDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDkucHJldiA9IF9jb250ZXh0OS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5nZXRJbXBvcnRhYmxlQWNjb3VudHMoa2V5cGFpciwgbmV0d29yayk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0OS5zZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMC50MCA9IGZ1bmN0aW9uIChhY2MsIGFycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLm1hcChmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50cy5wdXNoKGFjY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLnQxID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLnNlbnQucmVkdWNlKF9jb250ZXh0MTAudDAsIF9jb250ZXh0MTAudDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya3MubWFwKGZ1bmN0aW9uIChuZXR3b3JrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cGFpci5wdWJsaWNLZXlzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gbmV0d29yay5ibG9ja2NoYWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMucHVzaChfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhaXJVbmlxdWU6IGtleXBhaXIudW5pcXVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1VuaXF1ZTogbmV0d29yay51bmlxdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNLZXk6IGtleS5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxMCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxMykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTExKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYWNjb3VudHNGcm9tKF94OSwgX3gxMCwgX3gxMSwgX3gxMikge1xuICAgICAgICByZXR1cm4gX2FjY291bnRzRnJvbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjb3VudHNGcm9tO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImluY3JlbWVudEFjY291bnRMb2dpbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9pbmNyZW1lbnRBY2NvdW50TG9naW5zID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxMihhY2NvdW50cykge1xuICAgICAgICB2YXIgaWRzLCBzY2F0dGVyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMiQoX2NvbnRleHQxMikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTIucHJldiA9IF9jb250ZXh0MTIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWRzID0gYWNjb3VudHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaWRzLmluY2x1ZGVzKHgudW5pcXVlKCkpO1xuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgubG9naW5zKys7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTIuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBpbmNyZW1lbnRBY2NvdW50TG9naW5zKF94MTUpIHtcbiAgICAgICAgcmV0dXJuIF9pbmNyZW1lbnRBY2NvdW50TG9naW5zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmNyZW1lbnRBY2NvdW50TG9naW5zO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImZpeE9ycGhhbmVkQWNjb3VudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9maXhPcnBoYW5lZEFjY291bnRzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxMygpIHtcbiAgICAgICAgdmFyIHNjYXR0ZXIsIGtleXBhaXJzLCBvcnBoYW5lZDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTMkKF9jb250ZXh0MTMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDEzLnByZXYgPSBfY29udGV4dDEzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmICghY2hlY2tlZE9ycGhhbmVkQWNjb3VudHMpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTMubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNoZWNrZWRPcnBoYW5lZEFjY291bnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGtleXBhaXJzID0gc2NhdHRlci5rZXljaGFpbi5rZXlwYWlycy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ycGhhbmVkID0gc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAha2V5cGFpcnMuaW5jbHVkZXMoeC5rZXlwYWlyVW5pcXVlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChvcnBoYW5lZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTMubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIG9ycGhhbmVkLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYXR0ZXIua2V5Y2hhaW4ucmVtb3ZlQWNjb3VudCh4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDEzLm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX0JhbGFuY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXS5yZW1vdmVTdGFsZUJhbGFuY2VzKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBmaXhPcnBoYW5lZEFjY291bnRzKCkge1xuICAgICAgICByZXR1cm4gX2ZpeE9ycGhhbmVkQWNjb3VudHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZpeE9ycGhhbmVkQWNjb3VudHM7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIEFjY291bnRTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEFjY291bnRTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2luZGV4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9hcGlzL2luZGV4XCIpKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2FwcHMvaW5kZXhcIikpO1xuXG52YXIgX2luZGV4MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vYmxvY2tjaGFpbi9pbmRleFwiKSk7XG5cbnZhciBfaW5kZXg0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zZWN1cmUvaW5kZXhcIikpO1xuXG52YXIgX2luZGV4NSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbGl0eS9pbmRleFwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgYXBpczogX2luZGV4W1wiZGVmYXVsdFwiXSxcbiAgYXBwczogX2luZGV4MltcImRlZmF1bHRcIl0sXG4gIGJsb2NrY2hhaW46IF9pbmRleDNbXCJkZWZhdWx0XCJdLFxuICBzZWN1cmU6IF9pbmRleDRbXCJkZWZhdWx0XCJdLFxuICB1dGlsaXR5OiBfaW5kZXg1W1wiZGVmYXVsdFwiXVxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX0V4cGxvcmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0V4cGxvcmVyXCIpKTtcblxudmFyIF9CYWNrZW5kQXBpU2VydmljZSA9IHJlcXVpcmUoXCIuLi9hcGlzL0JhY2tlbmRBcGlTZXJ2aWNlXCIpO1xuXG52YXIgRXhwbG9yZXJTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXhwbG9yZXJTZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgRXhwbG9yZXJTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoRXhwbG9yZXJTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJnZXRFeHBsb3JlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RXhwbG9yZXJzKCkge1xuICAgICAgdmFyIGV4cGxvcmVycyA9IHt9O1xuXG4gICAgICBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnNBcnJheS5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIGJsb2NrY2hhaW4gPSBfcmVmLnZhbHVlO1xuICAgICAgICByZXR1cm4gZXhwbG9yZXJzW2Jsb2NrY2hhaW5dID0gW107XG4gICAgICB9KTtcblxuICAgICAgdmFyIHNldERlZmF1bHRFeHBsb3JlcnMgPSBmdW5jdGlvbiBzZXREZWZhdWx0RXhwbG9yZXJzKCkge1xuICAgICAgICBleHBsb3JlcnMgPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0uZGVmYXVsdEV4cGxvcmVycygpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldERlZmF1bHRFeHBsb3JlcnMoKTtcbiAgICAgICAgICByZXNvbHZlKGV4cGxvcmVycyk7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgfSksICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcImV4cGxvcmVyc1wiKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zQXJyYXkubWFwKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgIHZhciBibG9ja2NoYWluID0gX3JlZjIudmFsdWU7XG4gICAgICAgICAgcmVzWygwLCBfQmxvY2tjaGFpbnMuYmxvY2tjaGFpbk5hbWUpKGJsb2NrY2hhaW4pXS5tYXAoZnVuY3Rpb24gKHJhd0V4cGxvcmVyKSB7XG4gICAgICAgICAgICBleHBsb3JlcnNbYmxvY2tjaGFpbl0ucHVzaChfRXhwbG9yZXJbXCJkZWZhdWx0XCJdLmZyb21SYXcocmF3RXhwbG9yZXIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGV4cGxvcmVycztcbiAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICBzZXREZWZhdWx0RXhwbG9yZXJzKCk7XG4gICAgICAgIHJldHVybiBleHBsb3JlcnM7XG4gICAgICB9KV0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRXhwbG9yZXJTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4cGxvcmVyU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uL3N0b3JlL2NvbnN0YW50c1wiKSk7XG5cbnZhciBfQWNjb3VudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0FjY291bnRTZXJ2aWNlXCIpKTtcblxudmFyIF9CYWxhbmNlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQmFsYW5jZVNlcnZpY2VcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX1N0b3JlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIE5ldHdvcmtTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTmV0d29ya1NlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBOZXR3b3JrU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKE5ldHdvcmtTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJhZGROZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYWRkTmV0d29yayA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKG5ldHdvcmspIHtcbiAgICAgICAgdmFyIHNjYXR0ZXIsIG5ldHdvcmtzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIC8vIENhbid0IG1vZGlmeSBleGlzdGluZyBuZXR3b3Jrcy5cbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIG5ldHdvcmtzID0gc2NhdHRlci5zZXR0aW5ncy5uZXR3b3JrcztcblxuICAgICAgICAgICAgICAgIGlmICghbmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguaWQgPT09IG5ldHdvcmsuaWQ7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmsubmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogXCJNaXNzaW5nIE5hbWVcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBpZiAobmV0d29yay5ob3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBcIk1pc3NpbmcgSG9zdFwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrLnBvcnQpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiTWlzc2luZyBQb3J0XCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrLmNoYWluSWQpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiTWlzc2luZyBDaGFpblwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICBuZXR3b3JrLnNldFBvcnQoKTtcblxuICAgICAgICAgICAgICAgIGlmICghbmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gbmV0d29yay5ibG9ja2NoYWluICYmIHguY2hhaW5JZCA9PT0gbmV0d29yay5jaGFpbklkO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBcIkNoYWluIEV4aXN0c1wiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICBpZiAoIW5ldHdvcmtzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmV0d29yay5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiTmFtZSBFeGlzdHNcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgICAgc2NhdHRlci5zZXR0aW5ncy51cGRhdGVPclB1c2hOZXR3b3JrKG5ldHdvcmspO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9BY2NvdW50U2VydmljZVtcImRlZmF1bHRcIl0uaW1wb3J0QWxsQWNjb3VudHNGb3JOZXR3b3JrKG5ldHdvcmspO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjI6XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBfQmFsYW5jZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmxvYWRBbGxCYWxhbmNlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLmJ1c3RDYWNoZXMoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYWRkTmV0d29yayhfeCkge1xuICAgICAgICByZXR1cm4gX2FkZE5ldHdvcmsuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFkZE5ldHdvcms7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlbW92ZU5ldHdvcmsgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIobmV0d29yaykge1xuICAgICAgICB2YXIgc2NhdHRlciwgYWNjb3VudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5idXN0Q2FjaGVzKCk7XG5cbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpOyAvLyBSZW1vdmluZyBhY2NvdW50cyBhbmQgcGVybWlzc2lvbnMgZm9yIHRoaXMgbmV0d29ya1xuXG4gICAgICAgICAgICAgICAgYWNjb3VudHMgPSBzY2F0dGVyLmtleWNoYWluLmFjY291bnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgubmV0d29ya1VuaXF1ZSA9PT0gbmV0d29yay51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhY2NvdW50cy5tYXAoZnVuY3Rpb24gKGFjY291bnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzY2F0dGVyLmtleWNoYWluLnJlbW92ZUFjY291bnQoYWNjb3VudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2NhdHRlci5zZXR0aW5ncy5yZW1vdmVOZXR3b3JrKG5ldHdvcmspO1xuXG4gICAgICAgICAgICAgICAgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgICBfQmFsYW5jZVNlcnZpY2VbXCJkZWZhdWx0XCJdLnJlbW92ZVN0YWxlQmFsYW5jZXMoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVOZXR3b3JrKF94Mikge1xuICAgICAgICByZXR1cm4gX3JlbW92ZU5ldHdvcmsuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbW92ZU5ldHdvcms7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3VwZGF0ZU5ldHdvcmsgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMobmV0d29yaykge1xuICAgICAgICB2YXIgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLnNldHRpbmdzLnVwZGF0ZU9yUHVzaE5ldHdvcmsobmV0d29yayk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLmJ1c3RDYWNoZXMoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVOZXR3b3JrKF94Mykge1xuICAgICAgICByZXR1cm4gX3VwZGF0ZU5ldHdvcmsuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwZGF0ZU5ldHdvcms7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIE5ldHdvcmtTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE5ldHdvcmtTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX0FjY291bnRTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9BY2NvdW50U2VydmljZVwiKSk7XG5cbnZhciBfQmFsYW5jZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0JhbGFuY2VTZXJ2aWNlXCIpKTtcblxudmFyIF9FeHBsb3JlclNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0V4cGxvcmVyU2VydmljZVwiKSk7XG5cbnZhciBfTmV0d29ya1NlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL05ldHdvcmtTZXJ2aWNlXCIpKTtcblxudmFyIF9SZXNvdXJjZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1Jlc291cmNlU2VydmljZVwiKSk7XG5cbnZhciBfVHJhbnNmZXJTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9UcmFuc2ZlclNlcnZpY2VcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIEFjY291bnRTZXJ2aWNlOiBfQWNjb3VudFNlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBCYWxhbmNlU2VydmljZTogX0JhbGFuY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgRXhwbG9yZXJTZXJ2aWNlOiBfRXhwbG9yZXJTZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgTmV0d29ya1NlcnZpY2U6IF9OZXR3b3JrU2VydmljZVtcImRlZmF1bHRcIl0sXG4gIFJlc291cmNlU2VydmljZTogX1Jlc291cmNlU2VydmljZVtcImRlZmF1bHRcIl0sXG4gIFRyYW5zZmVyU2VydmljZTogX1RyYW5zZmVyU2VydmljZVtcImRlZmF1bHRcIl1cbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBsYXN0QmFsYW5jZVRpbWU7XG5cbnZhciBCYWxhbmNlU2VydmljZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJhbGFuY2VTZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgQmFsYW5jZVNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShCYWxhbmNlU2VydmljZSwgbnVsbCwgW3tcbiAgICBrZXk6IFwibG9hZEJhbGFuY2VzRm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfbG9hZEJhbGFuY2VzRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoYWNjb3VudCkge1xuICAgICAgICB2YXIgYmxvY2tjaGFpbiwgcGx1Z2luLCB0b2tlbnMsIGJhbGFuY2VzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAwO1xuICAgICAgICAgICAgICAgIGJsb2NrY2hhaW4gPSBhY2NvdW50LmJsb2NrY2hhaW4oKTtcbiAgICAgICAgICAgICAgICBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGJsb2NrY2hhaW4pO1xuICAgICAgICAgICAgICAgIHRva2VucyA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuYWxsVG9rZW5zKCkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC5ibG9ja2NoYWluID09PSBibG9ja2NoYWluO1xuICAgICAgICAgICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguY2hhaW5JZCA9PT0gYWNjb3VudC5uZXR3b3JrKCkuY2hhaW5JZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLmJhbGFuY2VzRm9yKGFjY291bnQsIHRva2Vucyk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGJhbGFuY2VzID0gX2NvbnRleHQuc2VudDtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVW50b3VjaGFibGVzKGFjY291bnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBfY29udGV4dC50MCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYmFsYW5jZXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgX2NvbnRleHQuc2VudC5tYXAoX2NvbnRleHQudDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9CQUxBTkNFUywge1xuICAgICAgICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudC5pZGVudGlmaWFibGUoKSxcbiAgICAgICAgICAgICAgICAgIGJhbGFuY2VzOiBiYWxhbmNlc1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAxNDtcbiAgICAgICAgICAgICAgICBfY29udGV4dC50MSA9IF9jb250ZXh0W1wiY2F0Y2hcIl0oMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUsIHRoaXMsIFtbMCwgMTRdXSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGxvYWRCYWxhbmNlc0ZvcihfeCkge1xuICAgICAgICByZXR1cm4gX2xvYWRCYWxhbmNlc0Zvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbG9hZEJhbGFuY2VzRm9yO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImxvYWRBbGxCYWxhbmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2xvYWRBbGxCYWxhbmNlcyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMygpIHtcbiAgICAgICAgdmFyIGZvcmNlLFxuICAgICAgICAgICAgYWNjb3VudHMsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgX2FyZ3MzID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBmb3JjZSA9IF9hcmdzMy5sZW5ndGggPiAwICYmIF9hcmdzM1swXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MzWzBdIDogZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoISghZm9yY2UgJiYgbGFzdEJhbGFuY2VUaW1lIDwgK25ldyBEYXRlKCkgKyAxMDAwICogNjAgKiA1KSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIik7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGxhc3RCYWxhbmNlVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGFjY291bnRzID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyaW5nIG91dCBwZXJtaXNzaW9uIGJhc2VkIGFjY291bnRzXG4gICAgICAgICAgICAgICAgICBpZiAoIWFjYy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmlkZW50aWZpYWJsZSgpID09PSBhY2NvdW50LmlkZW50aWZpYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgfSkpIGFjYy5wdXNoKGFjY291bnQpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCBbXSkuc29ydChcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNNYWlubmV0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTb3J0aW5nIG1haW5uZXRzIGZpcnN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTWFpbm5ldCA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYWNjb3VudC5ibG9ja2NoYWluKCkpLmlzRW5kb3JzZWROZXR3b3JrKGFjY291bnQubmV0d29yaygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBpc01haW5uZXQgPyAtMSA6IDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94Mikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBpZiAoIShpIDwgYWNjb3VudHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgfSwgMjAwMDApO1xuICAgICAgICAgICAgICAgIH0pLCB0aGlzLmxvYWRCYWxhbmNlc0ZvcihhY2NvdW50c1tpXSldKTtcblxuICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzLCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gbG9hZEFsbEJhbGFuY2VzKCkge1xuICAgICAgICByZXR1cm4gX2xvYWRBbGxCYWxhbmNlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbG9hZEFsbEJhbGFuY2VzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZVN0YWxlQmFsYW5jZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlU3RhbGVCYWxhbmNlcygpIHtcbiAgICAgIHZhciBhY2NvdW50S2V5cyA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmlkZW50aWZpYWJsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBrZXlzVG9SZW1vdmUgPSBPYmplY3Qua2V5cyhfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5iYWxhbmNlcykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuICFhY2NvdW50S2V5cy5pbmNsdWRlcyhrZXkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5SRU1PVkVfQkFMQU5DRVMsIGtleXNUb1JlbW92ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxvYWRVbnRvdWNoYWJsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9sb2FkVW50b3VjaGFibGVzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KGFjY291bnQpIHtcbiAgICAgICAgdmFyIHBsdWdpbjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcGx1Z2luID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihhY2NvdW50LmJsb2NrY2hhaW4oKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIiwgcGx1Z2luLmhhc1VudG91Y2hhYmxlVG9rZW5zKCkgPyBwbHVnaW4udW50b3VjaGFibGVCYWxhbmNlKGFjY291bnQpIDogW10pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTQpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBsb2FkVW50b3VjaGFibGVzKF94Mykge1xuICAgICAgICByZXR1cm4gX2xvYWRVbnRvdWNoYWJsZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxvYWRVbnRvdWNoYWJsZXM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwidG90YWxCYWxhbmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b3RhbEJhbGFuY2VzKCkge1xuICAgICAgdmFyIGFsbE5ldHdvcmtzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcbiAgICAgIHZhciB0b2tlbnMgPSB7fTtcbiAgICAgIHRva2Vuc1sndG90YWxzJ10gPSB7fTtcblxuICAgICAgdmFyIGJhbGFuY2VzID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuYmFsYW5jZXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGJhbGFuY2VzKS5tYXAoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcmVmMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTUoYWNjb3VudFVuaXF1ZSkge1xuICAgICAgICAgIHZhciBhY2NvdW50O1xuICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDUucHJldiA9IF9jb250ZXh0NS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgYWNjb3VudCA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5pZGVudGlmaWFibGUoKSA9PT0gYWNjb3VudFVuaXF1ZTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgIGlmICghKCFhbGxOZXR3b3JrcyAmJiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLnNob3dNYWlubmV0c09ubHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGFjY291bnQuYmxvY2tjaGFpbigpKS5pc0VuZG9yc2VkTmV0d29yayhhY2NvdW50Lm5ldHdvcmsoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIik7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICBpZiAoIXRva2Vucy5oYXNPd25Qcm9wZXJ0eShhY2NvdW50Lm5ldHdvcmtVbmlxdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2Vuc1thY2NvdW50Lm5ldHdvcmtVbmlxdWVdID0ge307XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICghKCFiYWxhbmNlcy5oYXNPd25Qcm9wZXJ0eShhY2NvdW50VW5pcXVlKSB8fCAhYmFsYW5jZXNbYWNjb3VudFVuaXF1ZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgYmFsYW5jZXNbYWNjb3VudFVuaXF1ZV0ubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRva2Vuc1thY2NvdW50Lm5ldHdvcmtVbmlxdWVdLmhhc093blByb3BlcnR5KHRva2VuLnVuaXF1ZVdpdGhDaGFpbigpKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRva2Vuc1thY2NvdW50Lm5ldHdvcmtVbmlxdWVdW3Rva2VuLnVuaXF1ZVdpdGhDaGFpbigpXSA9IHRva2VuLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgdG9rZW5zWyd0b3RhbHMnXVt0b2tlbi51bmlxdWVXaXRoQ2hhaW4oKV0gPSB0b2tlbi5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRva2Vuc1thY2NvdW50Lm5ldHdvcmtVbmlxdWVdW3Rva2VuLnVuaXF1ZVdpdGhDaGFpbigpXS5hZGQodG9rZW4uYW1vdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICB0b2tlbnNbJ3RvdGFscyddW3Rva2VuLnVuaXF1ZVdpdGhDaGFpbigpXS5hZGQodG9rZW4uYW1vdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuc3RvcCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgX2NhbGxlZTUpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDQpIHtcbiAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0oKSk7XG4gICAgICByZXR1cm4gdG9rZW5zO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQmFsYW5jZVNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQmFsYW5jZVNlcnZpY2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIi4uLy4uL21vZGVscy9CbG9ja2NoYWluc1wiKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIF9IaXN0b3JpY1RyYW5zZmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vbW9kZWxzL2hpc3Rvcmllcy9IaXN0b3JpY1RyYW5zZmVyXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBUcmFuc2ZlclNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUcmFuc2ZlclNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBUcmFuc2ZlclNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShUcmFuc2ZlclNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuQlRDLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB0aGlzLmJhc2VUcmFuc2ZlcihwYXJhbXMpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94KSB7XG4gICAgICAgIHJldHVybiBfdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuRVRILFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgdGhpcy5iYXNlVHJhbnNmZXIocGFyYW1zKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMiwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94Mikge1xuICAgICAgICByZXR1cm4gX3ZhbHVlMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5UUlgsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdmFsdWUzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCB0aGlzLmJhc2VUcmFuc2ZlcihwYXJhbXMpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzLCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3gzKSB7XG4gICAgICAgIHJldHVybiBfdmFsdWUzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVPU0lPLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNChwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcGFyYW1zLnJlY2lwaWVudCA9IHBhcmFtcy5yZWNpcGllbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCB0aGlzLmJhc2VUcmFuc2ZlcihwYXJhbXMpKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU0LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3g0KSB7XG4gICAgICAgIHJldHVybiBfdmFsdWU0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJiYXNlVHJhbnNmZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9iYXNlVHJhbnNmZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTUocGFyYW1zKSB7XG4gICAgICAgIHZhciBhY2NvdW50LCByZWNpcGllbnQsIGFtb3VudCwgbWVtbywgdG9rZW4sIHBsdWdpbiwgdHJhbnNmZXIsIGhpc3Rvcnk7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NS5wcmV2ID0gX2NvbnRleHQ1Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFjY291bnQgPSBwYXJhbXMuYWNjb3VudCwgcmVjaXBpZW50ID0gcGFyYW1zLnJlY2lwaWVudCwgYW1vdW50ID0gcGFyYW1zLmFtb3VudCwgbWVtbyA9IHBhcmFtcy5tZW1vLCB0b2tlbiA9IHBhcmFtcy50b2tlbjtcbiAgICAgICAgICAgICAgICBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGFjY291bnQuYmxvY2tjaGFpbigpKTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYWNjb3VudC5ibG9ja2NoYWluKCkpLnRyYW5zZmVyKHtcbiAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgICAgICAgICAgICB0bzogcmVjaXBpZW50LFxuICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICBtZW1vOiBtZW1vXG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRyYW5zZmVyID0gX2NvbnRleHQ1LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoISh0cmFuc2ZlciAhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zZmVyLmhhc093blByb3BlcnR5KCdlcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJhbnNmZXIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJhbXMuYnlwYXNzSGlzdG9yeSkge1xuICAgICAgICAgICAgICAgICAgaGlzdG9yeSA9IG5ldyBfSGlzdG9yaWNUcmFuc2ZlcltcImRlZmF1bHRcIl0oYWNjb3VudCwgcmVjaXBpZW50LCB0b2tlbiwgYW1vdW50LCBtZW1vLCB0aGlzLmdldFRyYW5zZmVySWQodHJhbnNmZXIsIHRva2VuLmJsb2NrY2hhaW4pKTtcblxuICAgICAgICAgICAgICAgICAgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5ERUxUQV9ISVNUT1JZLCBoaXN0b3J5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiLCB0cmFuc2Zlcik7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiLCBudWxsKTtcblxuICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNSwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJhc2VUcmFuc2ZlcihfeDUpIHtcbiAgICAgICAgcmV0dXJuIF9iYXNlVHJhbnNmZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJhc2VUcmFuc2ZlcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRUcmFuc2ZlcklkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRyYW5zZmVySWQodHJhbnNmZXIsIGJsb2NrY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoYmxvY2tjaGFpbikge1xuICAgICAgICBjYXNlIF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTzpcbiAgICAgICAgICByZXR1cm4gdHJhbnNmZXIudHJhbnNhY3Rpb25faWQ7XG5cbiAgICAgICAgY2FzZSBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnMuVFJYOlxuICAgICAgICAgIHJldHVybiB0cmFuc2Zlci50eElEO1xuXG4gICAgICAgIGNhc2UgX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkVUSDpcbiAgICAgICAgICByZXR1cm4gdHJhbnNmZXIudHJhbnNhY3Rpb25IYXNoO1xuXG4gICAgICAgIGNhc2UgX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zLkJUQzpcbiAgICAgICAgICByZXR1cm4gdHJhbnNmZXIudHhpZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUcmFuc2ZlclNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVHJhbnNmZXJTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5QT1NUID0gZXhwb3J0cy5HRVQgPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIF9JZEdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWwvSWRHZW5lcmF0b3JcIikpO1xuXG52YXIgX2Vvc2pzRWNjID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiZW9zanMtZWNjXCIpKTtcblxuLy8gY29uc3QgYmFzZVVybCA9IGBodHRwOi8vbG9jYWxob3N0OjY1NDcvdjEvYDtcbnZhciBiYXNlVXJsID0gXCJodHRwczovL2FwaS5nZXQtc2NhdHRlci5jb20vdjEvXCI7XG52YXIgUFJPT0ZfS0VZID0gJ0VPUzYyYjNXeGZ1UnlQN0pZYURiRjNncjQ5am9MV1lwc0Yza1BtbzJIUHhQdUdSRGlSVXdqJztcblxudmFyIGdldEhlYWRlcnMgPSBmdW5jdGlvbiBnZXRIZWFkZXJzKCkge1xuICB2YXIgcHJvb2YgPSBfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLnRleHQoNjQpO1xuXG4gIHJldHVybiBbcHJvb2YsIHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgcHJvb2Y6IHByb29mXG4gIH1dO1xufTsgLy8gQWxsIEFQSSByZXF1ZXN0cyBtdXN0IGNvbWUgYmFjayBzaWduZWQgd2l0aCB0aGUga25vd25cbi8vIHB1YmxpYyBrZXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBTY2F0dGVyIEFQSVxuXG5cbnZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uIHZhbGlkYXRlKHByb29mLCByZXMpIHtcbiAgdHJ5IHtcbiAgICB2YXIgc2lnbmVkUHJvb2YgPSByZXMuaGVhZGVycy5nZXQoJ3Byb29mJyk7XG4gICAgaWYgKCFzaWduZWRQcm9vZikgdGhyb3cgJ0ludmFsaWQgQVBJIFJlcXVlc3QnO1xuICAgIGlmIChfZW9zanNFY2NbXCJkZWZhdWx0XCJdLnJlY292ZXIoc2lnbmVkUHJvb2YsIHByb29mKSAhPT0gUFJPT0ZfS0VZKSB0aHJvdyAnSW52YWxpZCBBUEkgUmVxdWVzdCc7XG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBcIkludmFsaWQgQVBJIFJlcXVlc3RcIjtcbiAgfVxufTtcblxudmFyIEdFVCA9IGZ1bmN0aW9uIEdFVChyb3V0ZSkge1xuICB2YXIgX2dldEhlYWRlcnMgPSBnZXRIZWFkZXJzKCksXG4gICAgICBfZ2V0SGVhZGVyczIgPSAoMCwgX3NsaWNlZFRvQXJyYXkyW1wiZGVmYXVsdFwiXSkoX2dldEhlYWRlcnMsIDIpLFxuICAgICAgcHJvb2YgPSBfZ2V0SGVhZGVyczJbMF0sXG4gICAgICBoZWFkZXJzID0gX2dldEhlYWRlcnMyWzFdO1xuXG4gIHJldHVybiBmZXRjaChcIlwiLmNvbmNhdChiYXNlVXJsKS5jb25jYXQocm91dGUpLCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBtb2RlOiAnY29ycycsXG4gICAgaGVhZGVyczogaGVhZGVyc1xuICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZXR1cm4gdmFsaWRhdGUocHJvb2YsIHJlcyk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5HRVQgPSBHRVQ7XG5cbnZhciBQT1NUID0gZnVuY3Rpb24gUE9TVChyb3V0ZSwgZGF0YSkge1xuICB2YXIgX2dldEhlYWRlcnMzID0gZ2V0SGVhZGVycygpLFxuICAgICAgX2dldEhlYWRlcnM0ID0gKDAsIF9zbGljZWRUb0FycmF5MltcImRlZmF1bHRcIl0pKF9nZXRIZWFkZXJzMywgMiksXG4gICAgICBwcm9vZiA9IF9nZXRIZWFkZXJzNFswXSxcbiAgICAgIGhlYWRlcnMgPSBfZ2V0SGVhZGVyczRbMV07XG5cbiAgcmV0dXJuIGZldGNoKFwiXCIuY29uY2F0KGJhc2VVcmwpLmNvbmNhdChyb3V0ZSksIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBtb2RlOiAnY29ycycsXG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZXR1cm4gdmFsaWRhdGUocHJvb2YsIHJlcyk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5QT1NUID0gUE9TVDtcblxudmFyIEJhY2tlbmRBcGlTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmFja2VuZEFwaVNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBCYWNrZW5kQXBpU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEJhY2tlbmRBcGlTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJhcHBzXCIsXG4gICAgLy8gQWRkIGFuIGFycmF5IG9mIGFwcGxpbmtzIHRvIGZpbHRlciBvbmx5IHRob3NlIHJlc3VsdHMuXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYXBwczIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSgpIHtcbiAgICAgICAgdmFyIF9hcHBzLFxuICAgICAgICAgICAgX2FyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfYXBwcyA9IF9hcmdzLmxlbmd0aCA+IDAgJiYgX2FyZ3NbMF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzWzBdIDogW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBQT1NUKFwiYXBwc1wiLCB7XG4gICAgICAgICAgICAgICAgICBhcHBzOiBfYXBwc1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGFwcHMoKSB7XG4gICAgICAgIHJldHVybiBfYXBwczIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFwcHM7XG4gICAgfSgpIC8vIEFDQ09VTlQgQ1JFQVRJT05cblxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrTWFjaGluZUlkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY2hlY2tNYWNoaW5lSWQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgR0VUKFwibWFjaGluZS9cIi5jb25jYXQoaWQpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrTWFjaGluZUlkKF94KSB7XG4gICAgICAgIHJldHVybiBfY2hlY2tNYWNoaW5lSWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoZWNrTWFjaGluZUlkO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUFjY291bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9jcmVhdGVBY2NvdW50ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKHBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgUE9TVChcImNyZWF0ZV9icmlkZ2VcIiwgcGF5bG9hZCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVBY2NvdW50KF94Mikge1xuICAgICAgICByZXR1cm4gX2NyZWF0ZUFjY291bnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNyZWF0ZUFjY291bnQ7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIEJhY2tlbmRBcGlTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJhY2tlbmRBcGlTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9Ub2tlblwiKSk7XG5cbnZhciBfQmFja2VuZEFwaVNlcnZpY2UgPSByZXF1aXJlKFwiLi9CYWNrZW5kQXBpU2VydmljZVwiKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBfRGF0ZUhlbHBlcnMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9EYXRlSGVscGVyc1wiKTtcblxuLy8gT25jZSBldmVyeSAzMCBtaW51dGVzLlxudmFyIGludGVydmFsVGltZSA9IDYwMDAwICogMzA7XG52YXIgcHJpY2VJbnRlcnZhbDtcblxudmFyIFByaWNlU2VydmljZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFByaWNlU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFByaWNlU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFByaWNlU2VydmljZSwgbnVsbCwgW3tcbiAgICBrZXk6IFwid2F0Y2hQcmljZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF93YXRjaFByaWNlcyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNCgpIHtcbiAgICAgICAgdmFyIGVuYWJsZSxcbiAgICAgICAgICAgIF9hcmdzNCA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZW5hYmxlID0gX2FyZ3M0Lmxlbmd0aCA+IDAgJiYgX2FyZ3M0WzBdICE9PSB1bmRlZmluZWQgPyBfYXJnczRbMF0gOiB0cnVlO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocHJpY2VJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldFByaWNlcztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJpY2VzID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByaWNlU2VydmljZS5zZXRQcmljZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcmljZXMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFByaWNlcygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZUludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFByaWNlcygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgaW50ZXJ2YWxUaW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU0KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gd2F0Y2hQcmljZXMoKSB7XG4gICAgICAgIHJldHVybiBfd2F0Y2hQcmljZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhdGNoUHJpY2VzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInNldFByaWNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NldFByaWNlcyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNSgpIHtcbiAgICAgICAgdmFyIHByaWNlcztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcmljZVNlcnZpY2UuZ2V0QWxsKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHByaWNlcyA9IF9jb250ZXh0NS5zZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCEocHJpY2VzICYmIE9iamVjdC5rZXlzKHByaWNlcykubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9QUklDRVMsIHByaWNlcyk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHNldFByaWNlcygpIHtcbiAgICAgICAgcmV0dXJuIF9zZXRQcmljZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldFByaWNlcztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRBbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMTAwMDApO1xuICAgICAgfSksICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcInByaWNlcz92Mj10cnVlXCIpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVycm9yOiBcIlByb2JsZW0gY29ubmVjdGluZyB0byBQcmljZXMgQVBJXCJcbiAgICAgICAgfTtcbiAgICAgIH0pXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEN1cnJlbmNpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRDdXJyZW5jaWVzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU2KCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU2JChfY29udGV4dDYpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDYucHJldiA9IF9jb250ZXh0Ni5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCBQcm9taXNlLnJhY2UoW25ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDAwKTtcbiAgICAgICAgICAgICAgICB9KSwgKDAsIF9CYWNrZW5kQXBpU2VydmljZS5HRVQpKCdjdXJyZW5jaWVzJylbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gWydVU0QnXTtcbiAgICAgICAgICAgICAgICB9KV0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU2KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVuY2llcygpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRDdXJyZW5jaWVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRDdXJyZW5jaWVzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImdldEN1cnJlbmN5UHJpY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0Q3VycmVuY3lQcmljZXMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTckKF9jb250ZXh0Nykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Ny5wcmV2ID0gX2NvbnRleHQ3Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfSwgMTAwMDApO1xuICAgICAgICAgICAgICAgIH0pLCAoMCwgX0JhY2tlbmRBcGlTZXJ2aWNlLkdFVCkoJ2N1cnJlbmNpZXMvcHJpY2VzJylbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9KV0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU3KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVuY3lQcmljZXMoKSB7XG4gICAgICAgIHJldHVybiBfZ2V0Q3VycmVuY3lQcmljZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEN1cnJlbmN5UHJpY2VzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImxvYWRQcmljZVRpbWVsaW5lRGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2xvYWRQcmljZVRpbWVsaW5lRGF0YSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOCgpIHtcbiAgICAgICAgdmFyIHByaWNlcywgeWVzdGVyZGF5LCB0b2RheTtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcmljZVNlcnZpY2UuZ2V0Q3VycmVuY3lQcmljZXMoKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcHJpY2VzID0gX2NvbnRleHQ4LnNlbnQ7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgIHJldHVybiBQcmljZVNlcnZpY2UuZ2V0VGltZWxpbmUoKDAsIF9EYXRlSGVscGVycy5kYXRlSWQpKDEpKTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgeWVzdGVyZGF5ID0gX2NvbnRleHQ4LnNlbnQ7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgIHJldHVybiBQcmljZVNlcnZpY2UuZ2V0VGltZWxpbmUoKTtcblxuICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgdG9kYXkgPSBfY29udGV4dDguc2VudDtcbiAgICAgICAgICAgICAgICBfY29udGV4dDgubmV4dCA9IDExO1xuICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9QUklDRV9EQVRBLCB7XG4gICAgICAgICAgICAgICAgICBwcmljZXM6IHByaWNlcyxcbiAgICAgICAgICAgICAgICAgIHllc3RlcmRheTogeWVzdGVyZGF5LFxuICAgICAgICAgICAgICAgICAgdG9kYXk6IHRvZGF5XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBwcmljZXM6IHByaWNlcyxcbiAgICAgICAgICAgICAgICAgIHllc3RlcmRheTogeWVzdGVyZGF5LFxuICAgICAgICAgICAgICAgICAgdG9kYXk6IHRvZGF5XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTgpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBsb2FkUHJpY2VUaW1lbGluZURhdGEoKSB7XG4gICAgICAgIHJldHVybiBfbG9hZFByaWNlVGltZWxpbmVEYXRhLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsb2FkUHJpY2VUaW1lbGluZURhdGE7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VGltZWxpbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRUaW1lbGluZSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOSgpIHtcbiAgICAgICAgdmFyIGRhdGUsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIF9hcmdzOSA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOSQoX2NvbnRleHQ5KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ5LnByZXYgPSBfY29udGV4dDkubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZGF0ZSA9IF9hcmdzOS5sZW5ndGggPiAwICYmIF9hcmdzOVswXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3M5WzBdIDogbnVsbDtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IGRhdGUgPyBcIj9kYXRlPVwiLmNvbmNhdChkYXRlKSA6ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuYWJydXB0KFwicmV0dXJuXCIsIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfSwgMTAwMDApO1xuICAgICAgICAgICAgICAgIH0pLCAoMCwgX0JhY2tlbmRBcGlTZXJ2aWNlLkdFVCkoJ3ByaWNlcy90aW1lbGluZScgKyBxdWVyeSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7fSldKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlOSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFRpbWVsaW5lKCkge1xuICAgICAgICByZXR1cm4gX2dldFRpbWVsaW5lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRUaW1lbGluZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRUb3RhbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUb3RhbCh0b3RhbHMsIGRpc3BsYXlDdXJyZW5jeSwgYnlwYXNzRGlzcGxheVRva2VuLCBkaXNwbGF5VG9rZW4pIHtcbiAgICAgIGlmICghZGlzcGxheUN1cnJlbmN5KSBkaXNwbGF5Q3VycmVuY3kgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlDdXJyZW5jeTtcblxuICAgICAgaWYgKCFieXBhc3NEaXNwbGF5VG9rZW4gJiYgZGlzcGxheVRva2VuKSB7XG4gICAgICAgIGlmICh0b3RhbHMuaGFzT3duUHJvcGVydHkoZGlzcGxheVRva2VuKSkgcmV0dXJuIHRvdGFsc1tkaXNwbGF5VG9rZW5dO2Vsc2Uge1xuICAgICAgICAgIHZhciB0b2tlbiA9IChkaXNwbGF5VG9rZW4gaW5zdGFuY2VvZiBfVG9rZW5bXCJkZWZhdWx0XCJdID8gZGlzcGxheVRva2VuIDogX1Rva2VuW1wiZGVmYXVsdFwiXS5mcm9tVW5pcXVlKGRpc3BsYXlUb2tlbikpLmNsb25lKCk7XG4gICAgICAgICAgdG9rZW4uYW1vdW50ID0gcGFyc2VGbG9hdCgwKS50b0ZpeGVkKHRva2VuLmRlY2ltYWxzKTtcbiAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgIE9iamVjdC5rZXlzKF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnByaWNlcykubWFwKGZ1bmN0aW9uICh0b2tlblVuaXF1ZSkge1xuICAgICAgICAgIHZhciBiYWxhbmNlID0gdG90YWxzW3Rva2VuVW5pcXVlXTtcblxuICAgICAgICAgIGlmIChiYWxhbmNlKSB7XG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5wcmljZXNbdG9rZW5VbmlxdWVdW2Rpc3BsYXlDdXJyZW5jeV07XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQocGFyc2VGbG9hdChiYWxhbmNlLmFtb3VudCkgKiBwYXJzZUZsb2F0KHByaWNlKSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XG4gICAgICAgICAgICB0b3RhbCArPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX1Rva2VuW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih7XG4gICAgICAgICAgc3ltYm9sOiB0aGlzLmZpYXRTeW1ib2woZGlzcGxheUN1cnJlbmN5KSxcbiAgICAgICAgICBhbW91bnQ6IHRvdGFsLnRvRml4ZWQoMiksXG4gICAgICAgICAgZGVjaW1hbHM6IDJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpYXRTeW1ib2xcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlhdFN5bWJvbChjdXJyZW5jeSkge1xuICAgICAgaWYgKCFjdXJyZW5jeSkgY3VycmVuY3kgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlDdXJyZW5jeTtcblxuICAgICAgc3dpdGNoIChjdXJyZW5jeSkge1xuICAgICAgICBjYXNlICdVU0QnOlxuICAgICAgICBjYXNlICdBVUQnOlxuICAgICAgICBjYXNlICdDQUQnOlxuICAgICAgICAgIHJldHVybiAnJCc7XG5cbiAgICAgICAgY2FzZSAnQ05ZJzpcbiAgICAgICAgY2FzZSAnSlBZJzpcbiAgICAgICAgICByZXR1cm4gJ8KlJztcblxuICAgICAgICBjYXNlICdFVVInOlxuICAgICAgICAgIHJldHVybiAn4oKsJztcblxuICAgICAgICBjYXNlICdHQlAnOlxuICAgICAgICAgIHJldHVybiAnwqMnO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbmN5O1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gUHJpY2VTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFByaWNlU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9BcGlTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9BcGlTZXJ2aWNlXCIpKTtcblxudmFyIF9CYWNrZW5kQXBpU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQmFja2VuZEFwaVNlcnZpY2VcIikpO1xuXG52YXIgX0V4Y2hhbmdlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vRXhjaGFuZ2VTZXJ2aWNlXCIpKTtcblxudmFyIF9QcmljZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1ByaWNlU2VydmljZVwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgQXBpU2VydmljZTogX0FwaVNlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBCYWNrZW5kQXBpU2VydmljZTogX0JhY2tlbmRBcGlTZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgRXhjaGFuZ2VTZXJ2aWNlOiBfRXhjaGFuZ2VTZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgUHJpY2VTZXJ2aWNlOiBfUHJpY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXVxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uL21vZGVscy9hcGkvQXBpQWN0aW9uc1wiKSk7XG5cbnZhciBTdG9yZUFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9PYmplY3RIZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbC9PYmplY3RIZWxwZXJzXCIpKTtcblxudmFyIF9IYXNoZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsL0hhc2hlclwiKSk7XG5cbnZhciBfSWRHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsL0lkR2VuZXJhdG9yXCIpKTtcblxudmFyIF9BY2NvdW50U2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2Jsb2NrY2hhaW4vQWNjb3VudFNlcnZpY2VcIikpO1xuXG52YXIgX1Blcm1pc3Npb25TZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYXBwcy9QZXJtaXNzaW9uU2VydmljZVwiKSk7XG5cbnZhciBfS2V5UGFpclNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIikpO1xuXG52YXIgX1Jlc291cmNlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2Jsb2NrY2hhaW4vUmVzb3VyY2VTZXJ2aWNlXCIpKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIF9CbG9ja2NoYWlucyA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfS2V5cGFpciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9LZXlwYWlyXCIpKTtcblxudmFyIF9JZGVudGl0eSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvSWRlbnRpdHlcIikpO1xuXG52YXIgX0FjY291bnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvQWNjb3VudFwiKSk7XG5cbnZhciBfRXJyb3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvZXJyb3JzL0Vycm9yXCIpKTtcblxudmFyIF9OZXR3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vbW9kZWxzL05ldHdvcmtcIikpO1xuXG52YXIgX0hhcmR3YXJlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3NlY3VyZS9IYXJkd2FyZVNlcnZpY2VcIikpO1xuXG52YXIgX1Rva2VuID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vbW9kZWxzL1Rva2VuXCIpKTtcblxudmFyIF9Ub2tlblNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1Rva2VuU2VydmljZVwiKSk7XG5cbnZhciBfQmFsYW5jZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9ibG9ja2NoYWluL0JhbGFuY2VTZXJ2aWNlXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBfRnJhbWV3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbGl0eS9GcmFtZXdvcmtcIikpO1xuXG52YXIgX0V2ZW50U2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvRXZlbnRTZXJ2aWNlXCIpKTtcblxudmFyIF9TaWduaW5nU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3NlcnZpY2VzL3NlY3VyZS9TaWduaW5nU2VydmljZVwiKSk7XG5cbnZhciBibG9ja2VkID0gW107XG5cbnZhciBBcGlTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXBpU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEFwaVNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShBcGlTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJibG9ja1JvdXRlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBibG9ja1JvdXRlcyhyb3V0ZXMpIHtcbiAgICAgIGJsb2NrZWQgPSByb3V0ZXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9oYW5kbGVyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhBY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIEFjdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICB9KS5pbmNsdWRlcyhyZXF1ZXN0LnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIik7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICghYmxvY2tlZC5pbmNsdWRlcyhyZXF1ZXN0LnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0ubWFsaWNpb3VzKCdUaGlzIHdhbGxldCBoYXMgdHVybmVkIHRoaXMgQVBJIHJvdXRlIG9mZi4nKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tyZXF1ZXN0LnR5cGVdKHJlcXVlc3QpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0LnNlbnQpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlLCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcihfeCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgfSgpXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiovXG5cbiAgICAvKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqL1xuXG4gICAgLyoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUE9QT1VUIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKi9cblxuICAgIC8qKiAgICAgICAgICAgICAgICAgICAgVGhlc2Ugcm91dGVzIGNhdXNlIHBvcHVwcyBmb3IgdGhlIHVzZXIgICAgICAgICAgICAgICAgKiovXG5cbiAgICAvKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqL1xuXG4gICAgLyoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKi9cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5MT0dJTixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMihyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHRoaXMubG9naW5IYW5kbGVyKHJlcXVlc3QsIGZhbHNlKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMiwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94Mikge1xuICAgICAgICByZXR1cm4gX3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5MT0dJTl9BTEwsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdmFsdWUyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgdGhpcy5sb2dpbkhhbmRsZXIocmVxdWVzdCwgdHJ1ZSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB2YWx1ZShfeDMpIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImxvZ2luSGFuZGxlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2xvZ2luSGFuZGxlciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNShyZXF1ZXN0LCBsb2dpbkFsbCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU1JChfY29udGV4dDUpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDUucHJldiA9IF9jb250ZXh0NS5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGJhZFJlc3VsdCA9IGZ1bmN0aW9uIGJhZFJlc3VsdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ0ludmFsaWQgZm9ybWF0JztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5tYWxpY2lvdXMobXNnKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXF1ZXN0LnBheWxvYWQpLmxlbmd0aCAhPT0gMikgcmV0dXJuIGJhZFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnBheWxvYWQuaGFzT3duUHJvcGVydHkoJ2ZpZWxkcycpKSByZXR1cm4gYmFkUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoKDAsIF90eXBlb2YyW1wiZGVmYXVsdFwiXSkocmVxdWVzdC5wYXlsb2FkLmZpZWxkcykgIT09ICdvYmplY3QnKSByZXR1cm4gYmFkUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlcXVlc3QkcGF5bG9hZCA9IHJlcXVlc3QucGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgICBvcmlnaW4gPSBfcmVxdWVzdCRwYXlsb2FkLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMgPSBfcmVxdWVzdCRwYXlsb2FkLmZpZWxkcztcbiAgICAgICAgICAgICAgICAgIGlmICghZmllbGRzLmhhc093blByb3BlcnR5KCdwZXJzb25hbCcpKSBmaWVsZHMucGVyc29uYWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgIGlmICghZmllbGRzLmhhc093blByb3BlcnR5KCdsb2NhdGlvbicpKSBmaWVsZHMubG9jYXRpb24gPSBbXTtcbiAgICAgICAgICAgICAgICAgIGlmICghZmllbGRzLmhhc093blByb3BlcnR5KCdhY2NvdW50cycpKSBmaWVsZHMuYWNjb3VudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkcy5wZXJzb25hbCA9IGZpZWxkcy5wZXJzb25hbC5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEheDtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgZmllbGRzLmxvY2F0aW9uID0gZmllbGRzLmxvY2F0aW9uLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF4O1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBmaWVsZHMuYWNjb3VudHMgPSBmaWVsZHMuYWNjb3VudHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIXg7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZE5ldHdvcmtzID0gZmllbGRzLmFjY291bnRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX05ldHdvcmtbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHgpO1xuICAgICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhY2MuaW5jbHVkZXMoeCkpIGFjYy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgICAgfSwgW10pOyAvLyBEZXByZWNhdGluZyB0aGUgYWJpbGl0eSB0byBsb2cgaW4gd2l0aCBtdWx0aXBsZSBuZXR3b3JrcywgY2l0aW5nIGJhZCBVWFxuXG4gICAgICAgICAgICAgICAgICBpZiAoIWxvZ2luQWxsICYmIHJlcXVpcmVkTmV0d29ya3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnNpZ25hdHVyZUVycm9yKFwidG9vX21hbnlfYWNjb3VudHNcIiwgXCJUbyBsb2dpbiBtb3JlIHRoYW4gb25lIGFjY291bnQgeW91IG11c3QgdXNlIHRoZSBgZ2V0QWxsQWNjb3VudHMoKWAgQVBJIG1ldGhvZC5cIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ05ldHdvcmtzID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5uZXR3b3Jrcy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkTmV0d29ya3MuaW5jbHVkZXMoeC51bmlxdWUoKSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nTmV0d29ya3MubGVuZ3RoICE9PSByZXF1aXJlZE5ldHdvcmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm5vTmV0d29yaygpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YXIgYXZhaWxhYmxlQWNjb3VudHMgPSBleGlzdGluZ05ldHdvcmtzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5hY2NvdW50cygpO1xuICAgICAgICAgICAgICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGFjY291bnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IGFjYy5jb25jYXQoYWNjb3VudHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJZCA9IF9QZXJtaXNzaW9uU2VydmljZVtcImRlZmF1bHRcIl0uaWRlbnRpdHlGcm9tUGVybWlzc2lvbnMob3JpZ2luKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhbWVQZXJzb25hbCA9IGZpZWxkcy5wZXJzb25hbC5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlSWQuaGFzT3duUHJvcGVydHkoJ3BlcnNvbmFsJykgJiYgcG9zc2libGVJZC5wZXJzb25hbC5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhbWVMb2NhdGlvbiA9IGZpZWxkcy5sb2NhdGlvbi5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlSWQuaGFzT3duUHJvcGVydHkoJ2xvY2F0aW9uJykgJiYgcG9zc2libGVJZC5sb2NhdGlvbi5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhbWVBY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2dpbkFsbCAmJiBhdmFpbGFibGVBY2NvdW50cy5sZW5ndGggIT09IHBvc3NpYmxlSWQuYWNjb3VudHMubGVuZ3RoKSBzYW1lQWNjb3VudHMgPSBmYWxzZTtlbHNlIGlmICghbG9naW5BbGwgJiYgcG9zc2libGVJZC5hY2NvdW50cy5sZW5ndGggPiAxKSBzYW1lQWNjb3VudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVQZXJzb25hbCAmJiBzYW1lTG9jYXRpb24gJiYgc2FtZUFjY291bnRzKSByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBwb3NzaWJsZUlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCByZXF1ZXN0KS50aGVuKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KF9yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCBpZGVudGl0eSwgbG9jYXRpb24sIGFjY291bnRzLCByZXR1cm5hYmxlSWRlbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NC5wcmV2ID0gX2NvbnRleHQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmLnJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5zaWduYXR1cmVFcnJvcihcImlkZW50aXR5X3JlamVjdGVkXCIsIFwiVXNlciByZWplY3RlZCB0aGUgcHJvdmlzaW9uIG9mIGFuIElkZW50aXR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhd2FpdCB1cGRhdGVJZGVudGl0eShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgaWRlbnRpdHkgPSBJZGVudGl0eS5mcm9tSnNvbihyZXN1bHQuaWRlbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHkgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmlkZW50aXRpZXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5pZCA9PT0gcmVzdWx0LmlkZW50aXR5LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWRlbnRpdHkuc2V0QXNMYXN0VXNlZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBfSWRlbnRpdHkuTG9jYXRpb25JbmZvcm1hdGlvbi5mcm9tSnNvbihyZXN1bHQubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMgPSBsb2dpbkFsbCA/IGF2YWlsYWJsZUFjY291bnRzIDogKHJlc3VsdC5hY2NvdW50cyB8fCBbXSkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5hZGRJZGVudGl0eU9yaWdpblBlcm1pc3Npb24oaWRlbnRpdHksIGFjY291bnRzLCBmaWVsZHMsIG9yaWdpbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuYWJsZUlkZW50aXR5ID0gaWRlbnRpdHkuYXNPbmx5UmVxdWlyZWRGaWVsZHMoZmllbGRzLCBsb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5hYmxlSWRlbnRpdHkuYWNjb3VudHMgPSBhY2NvdW50cy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYXNSZXR1cm5hYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9naW5BbGwgJiYgYWNjb3VudHMubGVuZ3RoKSBfQWNjb3VudFNlcnZpY2VbXCJkZWZhdWx0XCJdLmluY3JlbWVudEFjY291bnRMb2dpbnMoYWNjb3VudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJldHVybmFibGVJZGVudGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTQpO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBsb2dpbkhhbmRsZXIoX3g0LCBfeDUpIHtcbiAgICAgICAgcmV0dXJuIF9sb2dpbkhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxvZ2luSGFuZGxlcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5TSUdOLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlMyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTEocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMSQoX2NvbnRleHQxMSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTEucHJldiA9IF9jb250ZXh0MTEubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZjMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEwKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQsIG9yaWdpbiwgcmVxdWlyZWRGaWVsZHMsIGJsb2NrY2hhaW4sIHBvc3NpYmxlSWQsIHBsdWdpbiwgbmV0d29yaywgYmxhY2tsaXN0ZWQsIGF2YWlsYWJsZUFjY291bnRzLCBwYXJ0aWNpcGFudHMsIGlkZW50aXR5LCBmaWxsSWRlbnRpdHksIHNpZ25BbmRSZXR1cm4sIGV4aXN0aW5nQXBwLCBoYXNIYXJkd2FyZUtleXMsIHNlbmRhYmxlUmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTAkKF9jb250ZXh0MTApIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDEwLnByZXYgPSBfY29udGV4dDEwLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSByZXF1ZXN0LnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luID0gcGF5bG9hZC5vcmlnaW4sIHJlcXVpcmVkRmllbGRzID0gcGF5bG9hZC5yZXF1aXJlZEZpZWxkcywgYmxvY2tjaGFpbiA9IHBheWxvYWQuYmxvY2tjaGFpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUlkID0gX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5pZGVudGl0eUZyb21QZXJtaXNzaW9ucyhvcmlnaW4sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uaWRlbnRpdHlNaXNzaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaWRlbnRpdHlLZXkgPSBwb3NzaWJsZUlkLnB1YmxpY0tleTsgLy8gQmxvY2tjaGFpbiBzcGVjaWZpYyBwbHVnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbiA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYmxvY2tjaGFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yayA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudW5pcXVlKCkgPT09IF9OZXR3b3JrW1wiZGVmYXVsdFwiXS5mcm9tSnNvbihwYXlsb2FkLm5ldHdvcmspLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0ubm9OZXR3b3JrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm5ldHdvcmsgPSBuZXR3b3JrOyAvLyBDb252ZXJ0IGJ1ZiBhbmQgYWJpIHRvIG1lc3NhZ2VzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnJlcXVlc3RQYXJzZXIocGF5bG9hZCwgbmV0d29yaywgcGF5bG9hZC5hYmkgfHwgbnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2VzID0gX2NvbnRleHQxMC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQubWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDE2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uY2FudFBhcnNlVHJhbnNhY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENIRUNLSU5HIEZPUiBCTEFDS0xJU1RFRCBBQ1RJT05TXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhY2tsaXN0ZWQgPSBwYXlsb2FkLm1lc3NhZ2VzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KHguY29kZSwgXCI6OlwiKS5jb25jYXQoeC50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGFjdGlvblRhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MuaXNBY3Rpb25CbGFja2xpc3RlZChhY3Rpb25UYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFibGFja2xpc3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0V2ZW50U2VydmljZVtcImRlZmF1bHRcIl0uZW1pdCgnZmlyZXdhbGxlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHBhcnNlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm1hbGljaW91cygnZmlyZXdhbGxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlQWNjb3VudHMgPSBwb3NzaWJsZUlkLmFjY291bnRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguZm9ybWF0dGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnRzID0gX09iamVjdEhlbHBlcnNbXCJkZWZhdWx0XCJdLmRpc3RpbmN0KHBsdWdpbi5hY3Rpb25QYXJ0aWNpcGFudHMocGF5bG9hZCkpLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUFjY291bnRzLmluY2x1ZGVzKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlSWQuYWNjb3VudHMuZmluZChmdW5jdGlvbiAoYWNjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2MuZm9ybWF0dGVkKCkgPT09IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgLy8gTXVzdCBoYXZlIHRoZSBwcm9wZXIgYWNjb3VudCBwYXJ0aWNpcGFudHMuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydGljaXBhbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMC5uZXh0ID0gMjQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5zaWduYXR1cmVBY2NvdW50TWlzc2luZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wYXJ0aWNpcGFudHMgPSBwYXJ0aWNpcGFudHM7IC8vIEdldHRpbmcgdGhlIGlkZW50aXR5IGZvciB0aGlzIHRyYW5zYWN0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsSWRlbnRpdHkgPSBmdW5jdGlvbiBmaWxsSWRlbnRpdHkoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWRlbnRpdHkgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmlkZW50aXRpZXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5wdWJsaWNLZXkgPT09IHBvc3NpYmxlSWQucHVibGljS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxJZGVudGl0eSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbkFuZFJldHVybiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNyhzZWxlY3RlZExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWduYXR1cmVzLCByZXR1cm5lZEZpZWxkcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNyQoX2NvbnRleHQ3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ3LnByZXYgPSBfY29udGV4dDcubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwYXJ0aWNpcGFudHMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTYoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU2JChfY29udGV4dDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDYucHJldiA9IF9jb250ZXh0Ni5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCBfU2lnbmluZ1NlcnZpY2VbXCJkZWZhdWx0XCJdLnNpZ24obmV0d29yaywgcGF5bG9hZCwgYWNjb3VudC5wdWJsaWNLZXkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlcyA9IF9jb250ZXh0Ny5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoc2lnbmF0dXJlcy5sZW5ndGggIT09IHBhcnRpY2lwYW50cy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnNpZ25hdHVyZUFjY291bnRNaXNzaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHNpZ25hdHVyZXMubGVuZ3RoID09PSAxICYmIHNpZ25hdHVyZXNbMF0gPT09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnNpZ25hdHVyZUVycm9yKFwic2lnbmF0dXJlX3JlamVjdGVkXCIsIFwiVXNlciByZWplY3RlZCB0aGUgc2lnbmF0dXJlIHJlcXVlc3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2lnbmF0dXJlcy5zb21lKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Ny5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uc2lnbmF0dXJlRXJyb3IoJ21pc3Npbmdfc2lnJywgJ0Egc2lnbmF0dXJlIGZvciB0aGlzIHJlcXVlc3Qgd2FzIG1pc3NpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWRGaWVsZHMgPSBfSWRlbnRpdHlbXCJkZWZhdWx0XCJdLmFzUmV0dXJuZWRGaWVsZHMocmVxdWlyZWRGaWVsZHMsIGlkZW50aXR5LCBzZWxlY3RlZExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkRmllbGRzOiByZXR1cm5lZEZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNpZ25BbmRSZXR1cm4oX3g5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCk7IC8vIE9ubHkgYWxsb3dpbmcgd2hpdGVsaXN0IHBlcm1pc3Npb25zIGZvciBvcmlnaW4gYXV0aGVkIGFwcHNcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdBcHAgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmZpbmRBcHAob3JpZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNIYXJkd2FyZUtleXMgPSBwYXJ0aWNpcGFudHMuc29tZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0uaXNIYXJkd2FyZSh4LnB1YmxpY0tleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShleGlzdGluZ0FwcCAmJiAhaGFzSGFyZHdhcmVLZXlzICYmIF9QZXJtaXNzaW9uU2VydmljZVtcImRlZmF1bHRcIl0uaXNXaGl0ZWxpc3RlZFRyYW5zYWN0aW9uKG9yaWdpbiwgaWRlbnRpdHksIHBhcnRpY2lwYW50cywgcGF5bG9hZC5tZXNzYWdlcywgcmVxdWlyZWRGaWVsZHMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMC5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5zaG93Tm90aWZpY2F0aW9ucykgX0ZyYW1ld29ya1tcImRlZmF1bHRcIl0ucHVzaE5vdGlmaWNhdGlvbignU2lnbmVkIFRyYW5zYWN0aW9uJywgXCJcIi5jb25jYXQob3JpZ2luLCBcIiAtIFwiKS5jb25jYXQocGFydGljaXBhbnRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguc2VuZGFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsJykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2lnbkFuZFJldHVybihpZGVudGl0eS5nZXRMb2NhdGlvbigpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDEwLnNlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGFibGVSZXF1ZXN0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGFibGVSZXF1ZXN0LnR5cGUgPSByZXF1ZXN0LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGFibGVSZXF1ZXN0LmFwcGtleSA9IHJlcXVlc3QuYXBwa2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRhYmxlUmVxdWVzdC5wYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IHJlcXVlc3QucGF5bG9hZC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcms6IHJlcXVlc3QucGF5bG9hZC5uZXR3b3JrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiByZXF1ZXN0LnBheWxvYWQub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnRzOiByZXF1ZXN0LnBheWxvYWQucGFydGljaXBhbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHM6IHJlcXVlc3QucGF5bG9hZC5yZXF1aXJlZEZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCBzZW5kYWJsZVJlcXVlc3QpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmNyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOShfcmVmNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU5JChfY29udGV4dDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDkucHJldiA9IF9jb250ZXh0OS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmNi5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnNpZ25hdHVyZUVycm9yKFwic2lnbmF0dXJlX3JlamVjdGVkXCIsIFwiVXNlciByZWplY3RlZCB0aGUgc2lnbmF0dXJlIHJlcXVlc3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF3YWl0IHVwZGF0ZUlkZW50aXR5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbElkZW50aXR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5uZWVkUmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdC5uZWVkUmVzb3VyY2VzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWY4ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU4KGFjY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ4Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfUmVzb3VyY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXS5hZGRSZXNvdXJjZXMoYWNjb3VudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0OC5zZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmOC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfUGVybWlzc2lvblNlcnZpY2VbXCJkZWZhdWx0XCJdLmFkZElkZW50aXR5UmVxdWlyZW1lbnRzUGVybWlzc2lvbihvcmlnaW4sIGlkZW50aXR5LCByZXF1aXJlZEZpZWxkcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9QZXJtaXNzaW9uU2VydmljZVtcImRlZmF1bHRcIl0uYWRkQWN0aW9uUGVybWlzc2lvbnMob3JpZ2luLCBpZGVudGl0eSwgcGFydGljaXBhbnRzLCByZXN1bHQud2hpdGVsaXN0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWduQW5kUmV0dXJuKHJlc3VsdC5zZWxlY3RlZExvY2F0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlOSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTEwKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDExLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUxMSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94Nykge1xuICAgICAgICByZXR1cm4gX3ZhbHVlMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IEFjdGlvbnMuU0lHTl9BUkJJVFJBUlksXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdmFsdWU0ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxNChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBpZGVudGl0eUtleSxcbiAgICAgICAgICAgIF9hcmdzMTQgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTE0JChfY29udGV4dDE0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxNC5wcmV2ID0gX2NvbnRleHQxNC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZGVudGl0eUtleSA9IF9hcmdzMTQubGVuZ3RoID4gMSAmJiBfYXJnczE0WzFdICE9PSB1bmRlZmluZWQgPyBfYXJnczE0WzFdIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxNC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmOSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTMocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCwgX3JlcXVlc3QkcGF5bG9hZDIsIG9yaWdpbiwgcHVibGljS2V5LCBkYXRhLCBfcG9zc2libGVJZCwga2V5cGFpciwgYmxvY2tjaGFpbiwgbmV0d29yaztcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMyQoX2NvbnRleHQxMykge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTMucHJldiA9IF9jb250ZXh0MTMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHJlcXVlc3QucGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVxdWVzdCRwYXlsb2FkMiA9IHJlcXVlc3QucGF5bG9hZCwgb3JpZ2luID0gX3JlcXVlc3QkcGF5bG9hZDIub3JpZ2luLCBwdWJsaWNLZXkgPSBfcmVxdWVzdCRwYXlsb2FkMi5wdWJsaWNLZXksIGRhdGEgPSBfcmVxdWVzdCRwYXlsb2FkMi5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLnNwbGl0KCcgJykuc29tZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgubGVuZ3RoID4gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTMubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5tYWxpY2lvdXMoJ1lvdSBjYW4gbm90IHNpZ24gc3RyaW5ncyB3aGVyZSBhbnkgb2YgdGhlIHdvcmRzIGFyZSBvdmVyIDEyIGNoYXJhY3RlcnMuJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaWRlbnRpdHlLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTMubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmlkZW50aXR5S2V5ID0gaWRlbnRpdHlLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMy5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wb3NzaWJsZUlkID0gX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5pZGVudGl0eUZyb21QZXJtaXNzaW9ucyhvcmlnaW4sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcG9zc2libGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMy5uZXh0ID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMy5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5pZGVudGl0eU1pc3NpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaWRlbnRpdHlLZXkgPSBfcG9zc2libGVJZC5wdWJsaWNLZXk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlwYWlyID0gX0tleVBhaXJTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXRLZXlQYWlyRnJvbVB1YmxpY0tleShwdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXBhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTMubmV4dCA9IDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTMuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uc2lnbmF0dXJlRXJyb3IoXCJzaWduYXR1cmVfcmVqZWN0ZWRcIiwgXCJVc2VyIHJlamVjdGVkIHRoZSBzaWduYXR1cmUgcmVxdWVzdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW4gPSBrZXlwYWlyLnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgua2V5ID09PSBwdWJsaWNLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYmxvY2tjaGFpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrID0gX05ldHdvcmtbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IGJsb2NrY2hhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgLy8gQ29udmVydCBidWYgYW5kIGFiaSB0byBtZXNzYWdlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcIlwiLmNvbmNhdCgoMCwgX0Jsb2NrY2hhaW5zLmJsb2NrY2hhaW5OYW1lKShibG9ja2NoYWluKSwgXCIgS2V5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FyYml0cmFyeSBTaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduaW5nOiBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHt9KSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxMSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTIoX3JlZjEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEyJChfY29udGV4dDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMi5wcmV2ID0gX2NvbnRleHQxMi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmMTAucmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoIXJlc3VsdCB8fCAhcmVzdWx0LmFjY2VwdGVkIHx8IGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMi5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEyLmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnNpZ25hdHVyZUVycm9yKFwic2lnbmF0dXJlX3JlamVjdGVkXCIsIFwiVXNlciByZWplY3RlZCB0aGUgc2lnbmF0dXJlIHJlcXVlc3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIudDAgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIudDEgPSByZXF1ZXN0LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTIubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TaWduaW5nU2VydmljZVtcImRlZmF1bHRcIl0uc2lnbihuZXR3b3JrLCBwYXlsb2FkLCBwdWJsaWNLZXksIHRydWUsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMi50MiA9IF9jb250ZXh0MTIuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDEyLnQzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IF9jb250ZXh0MTIudDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9jb250ZXh0MTIudDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBfY29udGV4dDEyLnQwKShfY29udGV4dDEyLnQzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTMuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTEzKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDE0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmOS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxNC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTQpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB2YWx1ZShfeDEzKSB7XG4gICAgICAgIHJldHVybiBfdmFsdWU0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5UUkFOU0ZFUixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTE2KHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTYkKF9jb250ZXh0MTYpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDE2LnByZXYgPSBfY29udGV4dDE2Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE2LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZXF1ZXN0JHBheWxvYWQzID0gcmVxdWVzdC5wYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgIHRvID0gX3JlcXVlc3QkcGF5bG9hZDMudG8sXG4gICAgICAgICAgICAgICAgICAgICAgbmV0d29yayA9IF9yZXF1ZXN0JHBheWxvYWQzLm5ldHdvcmssXG4gICAgICAgICAgICAgICAgICAgICAgYW1vdW50ID0gX3JlcXVlc3QkcGF5bG9hZDMuYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBfcmVxdWVzdCRwYXlsb2FkMy5vcHRpb25zO1xuICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgICBuZXR3b3JrID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5uZXR3b3Jrcy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24obmV0d29yaykudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmICghbmV0d29yaykgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm5vTmV0d29yaygpXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHZhciBzeW1ib2wgPSAnJztcbiAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdzeW1ib2wnKSkgc3ltYm9sID0gb3B0aW9ucy5zeW1ib2w7XG4gICAgICAgICAgICAgICAgICBzeW1ib2wgPSBuZXR3b3JrLnN5c3RlbVRva2VuKCkuc3ltYm9sO1xuICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyYWN0ID0gJyc7XG4gICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnY29udHJhY3QnKSkgY29udHJhY3QgPSBvcHRpb25zLmNvbnRyYWN0O1xuICAgICAgICAgICAgICAgICAgY29udHJhY3QgPSBuZXR3b3JrLnN5c3RlbVRva2VuKCkuY29udHJhY3Q7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQubWVtbyA9IG5ldHdvcmsuYmxvY2tjaGFpbiA9PT0gJ2VvcycgPyBvcHRpb25zLmhhc093blByb3BlcnR5KCdtZW1vJykgPyBvcHRpb25zLm1lbW8gOiAnJyA6ICcnO1xuICAgICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN5bWJvbCA9IHN5bWJvbDtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250cmFjdCA9IGNvbnRyYWN0O1xuXG4gICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCByZXF1ZXN0KS50aGVuKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjEzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTUoX3JlZjEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgYWNjb3VudCwgcGx1Z2luLCBvcHRpb25zLCB0b2tlbiwgc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxNSQoX2NvbnRleHQxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDE1LnByZXYgPSBfY29udGV4dDE1Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVmMTIucmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTUubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxNS5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uc2lnbmF0dXJlRXJyb3IoXCJzaWduYXR1cmVfcmVqZWN0ZWRcIiwgXCJVc2VyIHJlamVjdGVkIHRoZSB0cmFuc2ZlciByZXF1ZXN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50ID0gX0FjY291bnRbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHJlc3VsdC5hY2NvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbiA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4obmV0d29yay5ibG9ja2NoYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSByZXF1ZXN0LnBheWxvYWQgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdDogY29udHJhY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrY2hhaW46IG5ldHdvcmsuYmxvY2tjaGFpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBzeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiBvcHRpb25zLmRlY2ltYWxzIHx8IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4obmV0d29yay5ibG9ja2NoYWluKS5kZWZhdWx0RGVjaW1hbHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5JZDogYWNjb3VudC5uZXR3b3JrKCkuY2hhaW5JZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDE1Lm5leHQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4obmV0d29yay5ibG9ja2NoYWluKS50cmFuc2Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiByZXN1bHQuYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbW86IHJlcXVlc3QucGF5bG9hZC5tZW1vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRGb3JTaWduYXR1cmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW50ID0gX2NvbnRleHQxNS5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCd0cmFuc2ZlcicsIHJlcXVlc3QucGF5bG9hZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTUuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTE1KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxNykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE2LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUxNik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94MTYpIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBBY3Rpb25zLkdFVF9QVUJMSUNfS0VZLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlNiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTgocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxOCQoX2NvbnRleHQxOCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTgucHJldiA9IF9jb250ZXh0MTgubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTguYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBiYWRSZXN1bHQgPSBmdW5jdGlvbiBiYWRSZXN1bHQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdJbnZhbGlkIGZvcm1hdCc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0ubWFsaWNpb3VzKG1zZylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVxdWVzdC5wYXlsb2FkKS5sZW5ndGggIT09IDIpIHJldHVybiBiYWRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgIGlmICghcmVxdWVzdC5wYXlsb2FkLmhhc093blByb3BlcnR5KCdibG9ja2NoYWluJykpIHJldHVybiBiYWRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdC5wYXlsb2FkLmJsb2NrY2hhaW4gIT09ICdzdHJpbmcnKSByZXR1cm4gYmFkUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIV9CbG9ja2NoYWlucy5CbG9ja2NoYWluc0FycmF5Lm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIH0pLmluY2x1ZGVzKHJlcXVlc3QucGF5bG9hZC5ibG9ja2NoYWluKSkgcmV0dXJuIGJhZFJlc3VsdCgnbm8gc3VjaCBibG9ja2NoYWluJyk7XG5cbiAgICAgICAgICAgICAgICAgIF9FdmVudFNlcnZpY2VbXCJkZWZhdWx0XCJdLmVtaXQoJ3BvcG91dCcsIHJlcXVlc3QpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUxNyhfcmVmMTQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCBrZXlwYWlyLCBwdWJsaWNLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTckKF9jb250ZXh0MTcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxNy5wcmV2ID0gX2NvbnRleHQxNy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZjE0LnJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDE3Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTcuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLnJlamVjdGVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhaXIgPSBfS2V5cGFpcltcImRlZmF1bHRcIl0uZnJvbUpzb24ocmVzdWx0LmtleXBhaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljS2V5ID0ga2V5cGFpci5wdWJsaWNLZXlzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gcmVxdWVzdC5wYXlsb2FkLmJsb2NrY2hhaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5rZXk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmlzTmV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTcubmV4dCA9IDExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxNy5uZXh0ID0gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfS2V5UGFpclNlcnZpY2VbXCJkZWZhdWx0XCJdLnNhdmVLZXlQYWlyKGtleXBhaXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBzb2x2ZSB0aGlzIHdpdGggY2FsbGJhY2tzIHRvIHRoZSB3cmFwcGluZyB3YWxsZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcm91dGVyLnB1c2goe25hbWU6Um91dGVOYW1lcy5LRVlQQUlSLCBwYXJhbXM6e2lkOmtleXBhaXIuaWR9fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcHVibGljS2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTcubmV4dCA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHB1YmxpY0tleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxNyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94MTkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjE1LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxOC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTgpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB2YWx1ZShfeDE4KSB7XG4gICAgICAgIHJldHVybiBfdmFsdWU2LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5VUERBVEVfSURFTlRJVFksXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdmFsdWU3ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyMShyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIxJChfY29udGV4dDIxKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyMS5wcmV2ID0gX2NvbnRleHQyMS5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMS5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMTYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIwKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9yZXF1ZXN0JHBheWxvYWQ0LCBvcmlnaW4sIG5hbWUsIGt5YywgcmlkbCwgcG9zc2libGVJZDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyMCQoX2NvbnRleHQyMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MjAucHJldiA9IF9jb250ZXh0MjAubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlcXVlc3QkcGF5bG9hZDQgPSByZXF1ZXN0LnBheWxvYWQsIG9yaWdpbiA9IF9yZXF1ZXN0JHBheWxvYWQ0Lm9yaWdpbiwgbmFtZSA9IF9yZXF1ZXN0JHBheWxvYWQ0Lm5hbWUsIGt5YyA9IF9yZXF1ZXN0JHBheWxvYWQ0Lmt5YywgcmlkbCA9IF9yZXF1ZXN0JHBheWxvYWQ0LnJpZGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShuYW1lICYmIChuYW1lLmxlbmd0aCA8IDIgfHwgbmFtZS5sZW5ndGggPiAyMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIwLm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjAuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uc2lnbmF0dXJlRXJyb3IoXCJpbnZhbGlkX25hbWVcIiwgXCJJbnZhbGlkIG5hbWUgbGVuZ3RoICgyIC0gMjEpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShreWMgJiYga3ljLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjAubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShreWMuaW5kZXhPZignOjonKSA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIwLm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjAuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0uc2lnbmF0dXJlRXJyb3IoXCJpbnZhbGlkX2t5Y1wiLCBcIktZQyBwcm9wZXJ0aWVzIG11c3QgYmUgZm9ybWF0dGVkIGFzOiBkb21haW46Omhhc2hcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXihbQS1aYS16MC05Oi1dKykkLy50ZXN0KGt5YykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjAubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5zaWduYXR1cmVFcnJvcihcImludmFsaWRfa3ljXCIsIFwiSW52YWxpZCBreWMgdmFsdWUgKFteQS1aYS16MC05Oi1dKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVJZCA9IF9QZXJtaXNzaW9uU2VydmljZVtcImRlZmF1bHRcIl0uaWRlbnRpdHlGcm9tUGVybWlzc2lvbnMob3JpZ2luLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyMC5uZXh0ID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5pZGVudGl0eU1pc3NpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHBvc3NpYmxlSWQucmlkbCA8ICtuZXcgRGF0ZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx0cmV0dXJuIHJlc29sdmUoe2lkOnJlcXVlc3QuaWQsIHJlc3VsdDpFcnJvci5zaWduYXR1cmVFcnJvcihcInJpZGxfZW5hYmxlZFwiLCBcIlRoaXMgdXNlciBhbHJlYWR5IGhhcyBhIFJJREwgZW5hYmxlZCBpZGVudGl0eSBhbmQgY2FuJ3QgY2hhbmdlIHRoZWlyIG5hbWUgZXh0ZXJuYWxseS5cIil9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdwb3BvdXQnLCBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHt9KSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxOCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTkoX3JlZjE3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQsIHNjYXR0ZXIsIGlkZW50aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxOSQoX2NvbnRleHQxOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTkucHJldiA9IF9jb250ZXh0MTkubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZjE3LnJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTkubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxOS5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5zaWduYXR1cmVFcnJvcihcInVwZGF0ZV9yZWplY3RlZFwiLCBcIlVzZXIgcmVqZWN0ZWQgdGhlIHVwZGF0ZSByZXF1ZXN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5ID0gc2NhdHRlci5rZXljaGFpbi5pZGVudGl0aWVzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmlkID09PSBwb3NzaWJsZUlkLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoKSBpZGVudGl0eS5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa3ljICYmIGt5Yy5sZW5ndGgpIGlkZW50aXR5Lm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4udXBkYXRlT3JQdXNoSWRlbnRpdHkoaWRlbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTkubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChTdG9yZUFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5pZGVudGl0eUZyb21QZXJtaXNzaW9ucyhvcmlnaW4sIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDE5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxOSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gyMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjE4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIwLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUyMCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gyMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjE2LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIxLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyMSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94MjApIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqL1xuXG4gICAgLyoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKi9cblxuICAgIC8qKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhFTFBFUiBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiovXG5cbiAgICAvKiogICAgICAgICAgICAgICAgICAgICBUaGVzZSByb3V0ZXMgZG8gbm90IGNhdXNlIHBvcHVwcyAgICAgICAgICAgICAgICAgICAgICoqL1xuXG4gICAgLyoqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKi9cblxuICAgIC8qKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiovXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIH0sIHtcbiAgICBrZXk6IEFjdGlvbnMuSURFTlRJVFlfRlJPTV9QRVJNSVNTSU9OUyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTggPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIyKHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjIkKF9jb250ZXh0MjIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIyLnByZXYgPSBfY29udGV4dDIyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9QZXJtaXNzaW9uU2VydmljZVtcImRlZmF1bHRcIl0uaWRlbnRpdHlGcm9tUGVybWlzc2lvbnMocmVxdWVzdC5wYXlsb2FkLm9yaWdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjIuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyMi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMjIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB2YWx1ZShfeDIzKSB7XG4gICAgICAgIHJldHVybiBfdmFsdWU4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5HRVRfQVZBVEFSLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlOSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjMocmVxdWVzdCkge1xuICAgICAgICB2YXIgcGF5bG9hZCwgb3JpZ2luLCBwb3NzaWJsZUlkO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyMyQoX2NvbnRleHQyMykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MjMucHJldiA9IF9jb250ZXh0MjMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IHJlcXVlc3QucGF5bG9hZDtcbiAgICAgICAgICAgICAgICBvcmlnaW4gPSBwYXlsb2FkLm9yaWdpbjtcbiAgICAgICAgICAgICAgICBwb3NzaWJsZUlkID0gX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5pZGVudGl0eUZyb21QZXJtaXNzaW9ucyhvcmlnaW4sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUlkKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDIzLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjMuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLmlkZW50aXR5TWlzc2luZygpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIzLmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdDogX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hdmF0YXJzW3Bvc3NpYmxlSWQuaWRdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3gyNCkge1xuICAgICAgICByZXR1cm4gX3ZhbHVlOS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IEFjdGlvbnMuQVVUSEVOVElDQVRFLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlMTAgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTI1KHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjUkKF9jb250ZXh0MjUpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDI1LnByZXYgPSBfY29udGV4dDI1Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI1LmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYxOSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjQocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRlbnRpdHksIG5vbmNlRXJyb3IsIHB1YmxpY0tleSwga2V5cGFpciwgaXNIYXNoLCB0b1NpZ24sIGRhdGEsIG5ldHdvcmssIHNpZ25lZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMjQkKF9jb250ZXh0MjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDI0LnByZXYgPSBfY29udGV4dDI0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5ID0gX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXS5pZGVudGl0eUZyb21QZXJtaXNzaW9ucyhyZXF1ZXN0LnBheWxvYWQub3JpZ2luKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZGVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI0LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLmlkZW50aXR5TWlzc2luZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub25jZUVycm9yID0gbmV3IF9FcnJvcltcImRlZmF1bHRcIl0oJ2ludmFsaWRfbm9uY2UnLCAnWW91IG11c3QgcHJvdmlkZSBhIDEyIGNoYXJhY3RlciBub25jZSBmb3IgYXV0aGVudGljYXRpb24nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnBheWxvYWQuaGFzT3duUHJvcGVydHkoJ25vbmNlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjQubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyNC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbm9uY2VFcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVxdWVzdC5wYXlsb2FkLm5vbmNlLmxlbmd0aCAhPT0gMTIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI0Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjQuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IG5vbmNlRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY0tleSA9IHJlcXVlc3QucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgncHVibGljS2V5JykgJiYgcmVxdWVzdC5wYXlsb2FkLnB1YmxpY0tleSAmJiByZXF1ZXN0LnBheWxvYWQucHVibGljS2V5Lmxlbmd0aCA/IHJlcXVlc3QucGF5bG9hZC5wdWJsaWNLZXkgOiBpZGVudGl0eS5wdWJsaWNLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cGFpciA9IF9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0S2V5UGFpckZyb21QdWJsaWNLZXkocHVibGljS2V5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI0Lm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI0LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm5vS2V5cGFpcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXNoID0gcmVxdWVzdC5wYXlsb2FkLmhhc093blByb3BlcnR5KCdkYXRhJykgJiYgcmVxdWVzdC5wYXlsb2FkLmRhdGEgJiYgcmVxdWVzdC5wYXlsb2FkLmRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvU2lnbiA9IGlzSGFzaCA/IHJlcXVlc3QucGF5bG9hZC5kYXRhIDogb3JpZ2luOyAvLyBQcmV2ZW50aW9uIG9mIG9yaWdpbnMgYmVpbmcgYWJsZSB0byBzZW5kIGRhdGEgYnVmZmVycyB0byBiZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpZ25lZCBieSB0aGUgaWRlbnRpdHkgd2hpY2ggY291bGQgY2hhbmdlIHRvIGEgcmVhbCBiYWxhbmNlIGhvbGRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBrZXkgaW4gdGhlIGZ1dHVyZS5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfSGFzaGVyW1wiZGVmYXVsdFwiXS51bnNhbHRlZFF1aWNrSGFzaChfSGFzaGVyW1wiZGVmYXVsdFwiXS51bnNhbHRlZFF1aWNrSGFzaCh0b1NpZ24pICsgX0hhc2hlcltcImRlZmF1bHRcIl0udW5zYWx0ZWRRdWlja0hhc2gocmVxdWVzdC5wYXlsb2FkLm5vbmNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yayA9IF9OZXR3b3JrW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2NoYWluOiBrZXlwYWlyLnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5rZXkgPT09IHB1YmxpY0tleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJsb2NrY2hhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI0Lm5leHQgPSAxODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1NpZ25pbmdTZXJ2aWNlW1wiZGVmYXVsdFwiXS5zaWduKG5ldHdvcmssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBwdWJsaWNLZXksIHRydWUsICEhaXNIYXNoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25lZCA9IF9jb250ZXh0MjQuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBzaWduZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTI0KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDI2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMTkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjUuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTI1KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3gyNSkge1xuICAgICAgICByZXR1cm4gX3ZhbHVlMTAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBBY3Rpb25zLkxPR09VVCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTExID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyNihyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTI2JChfY29udGV4dDI2KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyNi5wcmV2ID0gX2NvbnRleHQyNi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDI2Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfUGVybWlzc2lvblNlcnZpY2VbXCJkZWZhdWx0XCJdLnJlbW92ZUlkZW50aXR5UGVybWlzc2lvbihyZXF1ZXN0LnBheWxvYWQub3JpZ2luKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjYuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTI2KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3gyNykge1xuICAgICAgICByZXR1cm4gX3ZhbHVlMTEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBBY3Rpb25zLkxJTktfQUNDT1VOVCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTEyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyOChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTI4JChfY29udGV4dDI4KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyOC5wcmV2ID0gX2NvbnRleHQyOC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyOC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMjAgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTI3KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFkUmVzdWx0LCBzY2F0dGVyLCBfcmVxdWVzdCRwYXlsb2FkNSwgYWNjb3VudCwgbmV0d29yaywgb3JpZ2luLCBrZXlwYWlyLCBuZXdBY2NvdW50O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTI3JChfY29udGV4dDI3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyNy5wcmV2ID0gX2NvbnRleHQyNy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWRSZXN1bHQgPSBmdW5jdGlvbiBiYWRSZXN1bHQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnSW52YWxpZCBmb3JtYXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm1hbGljaW91cyhtc2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoT2JqZWN0LmtleXMocmVxdWVzdC5wYXlsb2FkKS5sZW5ndGggIT09IDMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI3Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjcuYWJydXB0KFwicmV0dXJuXCIsIGJhZFJlc3VsdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgnYWNjb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI3Lm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjcuYWJydXB0KFwicmV0dXJuXCIsIGJhZFJlc3VsdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgnbmV0d29yaycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI3Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjcuYWJydXB0KFwicmV0dXJuXCIsIGJhZFJlc3VsdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucGF5bG9hZC5hY2NvdW50Lmhhc093blByb3BlcnR5KCdwdWJsaWNLZXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNy5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI3LmFicnVwdChcInJldHVyblwiLCBiYWRSZXN1bHQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlcXVlc3QkcGF5bG9hZDUgPSByZXF1ZXN0LnBheWxvYWQsIGFjY291bnQgPSBfcmVxdWVzdCRwYXlsb2FkNS5hY2NvdW50LCBuZXR3b3JrID0gX3JlcXVlc3QkcGF5bG9hZDUubmV0d29yaywgb3JpZ2luID0gX3JlcXVlc3QkcGF5bG9hZDUub3JpZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLm5ldHdvcmtzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24obmV0d29yaykudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV0d29yaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNy5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyNy5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5ub05ldHdvcmsoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhaXIgPSBzY2F0dGVyLmtleWNoYWluLmtleXBhaXJzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnB1YmxpY0tleXMuc29tZShmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geS5rZXkgPT09IGFjY291bnQucHVibGljS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNy5uZXh0ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyNy5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5ub0tleXBhaXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjY291bnQgPSBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cGFpclVuaXF1ZToga2V5cGFpci51bmlxdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtVbmlxdWU6IG5ldHdvcmsudW5pcXVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNLZXk6IGFjY291bnQucHVibGljS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYWNjb3VudC5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXR5OiBhY2NvdW50LmF1dGhvcml0eSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21PcmlnaW46IG9yaWdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAvLyBBcHBsaWNhdGlvbnMgY2FuIG9ubHkgYWRkIG9uZSBuZXR3b3JrIGV2ZXJ5IGhvdXIuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguZnJvbU9yaWdpbiA9PT0gb3JpZ2luICYmIHguY3JlYXRlZEF0ID4gK25ldyBEYXRlKCkgLSAzNjAwICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNy5uZXh0ID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyNy5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbmV3IF9FcnJvcltcImRlZmF1bHRcIl0oXCJsaW5rX2FjY291bnRfdGltZW91dFwiLCBcIllvdSBjYW4gb25seSBhZGQgMSBhY2NvdW50IGV2ZXJ5IGhvdXIuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyNy5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9BY2NvdW50U2VydmljZVtcImRlZmF1bHRcIl0uYWRkQWNjb3VudChuZXdBY2NvdW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI3LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyNy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMjcpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94MjksIF94MzApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYyMC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KCkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyOC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMjgpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB2YWx1ZShfeDI4KSB7XG4gICAgICAgIHJldHVybiBfdmFsdWUxMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IEFjdGlvbnMuU1VHR0VTVF9ORVRXT1JLLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbHVlMTMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMwKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzAkKF9jb250ZXh0MzApIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMwLnByZXYgPSBfY29udGV4dDMwLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMwLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyMSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMjkocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFkUmVzdWx0LCBuZXR3b3JrLCBzY2F0dGVyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyOSQoX2NvbnRleHQyOSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MjkucHJldiA9IF9jb250ZXh0MjkubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkUmVzdWx0ID0gZnVuY3Rpb24gYmFkUmVzdWx0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ0ludmFsaWQgZm9ybWF0JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5tYWxpY2lvdXMobXNnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKE9iamVjdC5rZXlzKHJlcXVlc3QucGF5bG9hZCkubGVuZ3RoICE9PSAyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyOS5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI5LmFicnVwdChcInJldHVyblwiLCBiYWRSZXN1bHQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnBheWxvYWQuaGFzT3duUHJvcGVydHkoJ25ldHdvcmsnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyOS5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI5LmFicnVwdChcInJldHVyblwiLCBiYWRSZXN1bHQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsgPSByZXF1ZXN0LnBheWxvYWQubmV0d29yaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrID0gX05ldHdvcmtbXCJkZWZhdWx0XCJdLmZyb21Kc29uKG5ldHdvcmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsubmFtZSA9IHJlcXVlc3QucGF5bG9hZC5vcmlnaW4gKyBfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLnRleHQoNCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV0d29yay5oYXNPd25Qcm9wZXJ0eSgndG9rZW4nKSAmJiBuZXR3b3JrLnRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnRva2VuLmJsb2NrY2hhaW4gPSBuZXR3b3JrLmJsb2NrY2hhaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnRva2VuLm5hbWUgPSBuZXR3b3JrLnRva2VuLm5hbWUubGVuZ3RoID8gbmV0d29yay50b2tlbi5uYW1lIDogbmV0d29yay50b2tlbi5zeW1ib2w7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmsuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI5Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDI5LmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBuZXcgX0Vycm9yW1wiZGVmYXVsdFwiXShcImJhZF9uZXR3b3JrXCIsIFwiVGhlIG5ldHdvcmsgYmVpbmcgc3VnZ2VzdGVkIGlzIGludmFsaWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudW5pcXVlKCkgPT09IG5ldHdvcmsudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjkubmV4dCA9IDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjkuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguZnJvbU9yaWdpbiA9PT0gcmVxdWVzdC5wYXlsb2FkLm9yaWdpbiAmJiB4LmNyZWF0ZWRBdCA+ICtuZXcgRGF0ZSgpIC0gMzYwMCAqIDEyICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyOS5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyOS5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbmV3IF9FcnJvcltcImRlZmF1bHRcIl0oXCJuZXR3b3JrX3RpbWVvdXRcIiwgXCJZb3UgY2FuIG9ubHkgYWRkIDEgbmV0d29yayBldmVyeSAxMiBob3Vycy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLm5ldHdvcmtzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguY3JlYXRlZEF0ID4gK25ldyBEYXRlKCkgLSAzNjAwICogMTIgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pID4gNSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjkubmV4dCA9IDE3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MjkuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IG5ldyBfRXJyb3JbXCJkZWZhdWx0XCJdKFwibmV0d29ya190aW1lb3V0XCIsIFwiVG9vIG1hbnkgbmV0d29ya3Mgd2VyZSBhZGRlZCBvdmVyIHRoZSBwYXN0IDEyIGhvdXJzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5mcm9tT3JpZ2luID0gcmVxdWVzdC5wYXlsb2FkLm9yaWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MucHVzaChuZXR3b3JrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDI5Lm5leHQgPSAyMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goU3RvcmVBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MjkubmV4dCA9IDI0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfQWNjb3VudFNlcnZpY2VbXCJkZWZhdWx0XCJdLmltcG9ydEFsbEFjY291bnRzRm9yTmV0d29yayhuZXR3b3JrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mjkuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZTI5KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDMyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMwKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gdmFsdWUoX3gzMSkge1xuICAgICAgICByZXR1cm4gX3ZhbHVlMTMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBBY3Rpb25zLkFERF9UT0tFTixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTE0ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzMihyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMyJChfY29udGV4dDMyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzMi5wcmV2ID0gX2NvbnRleHQzMi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzMi5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmMjIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMxKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhZFJlc3VsdCwgX3JlcXVlc3QkcGF5bG9hZDYsIG5ldHdvcmssIHRva2VuLCBleGlzdHM7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMzEkKF9jb250ZXh0MzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMxLnByZXYgPSBfY29udGV4dDMxLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhZFJlc3VsdCA9IGZ1bmN0aW9uIGJhZFJlc3VsdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdJbnZhbGlkIGZvcm1hdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IF9FcnJvcltcImRlZmF1bHRcIl0ubWFsaWNpb3VzKG1zZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShPYmplY3Qua2V5cyhyZXF1ZXN0LnBheWxvYWQpLmxlbmd0aCAhPT0gMykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzEubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzMS5hYnJ1cHQoXCJyZXR1cm5cIiwgYmFkUmVzdWx0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5wYXlsb2FkLmhhc093blByb3BlcnR5KCduZXR3b3JrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzEubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzMS5hYnJ1cHQoXCJyZXR1cm5cIiwgYmFkUmVzdWx0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5wYXlsb2FkLmhhc093blByb3BlcnR5KCd0b2tlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMxLm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzEuYWJydXB0KFwicmV0dXJuXCIsIGJhZFJlc3VsdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlcXVlc3QkcGF5bG9hZDYgPSByZXF1ZXN0LnBheWxvYWQsIG5ldHdvcmsgPSBfcmVxdWVzdCRwYXlsb2FkNi5uZXR3b3JrLCB0b2tlbiA9IF9yZXF1ZXN0JHBheWxvYWQ2LnRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24obmV0d29yayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfVG9rZW5bXCJkZWZhdWx0XCJdLmZyb21Kc29uKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5uYW1lID0gdG9rZW4ubmFtZS5sZW5ndGggPyB0b2tlbi5uYW1lIDogdG9rZW4uc3ltYm9sO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLmJsb2NrY2hhaW4gPSBuZXR3b3JrLmJsb2NrY2hhaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uY2hhaW5JZCA9IG5ldHdvcmsuY2hhaW5JZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5mcm9tT3JpZ2luID0gcmVxdWVzdC5wYXlsb2FkLm9yaWdpbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzEubmV4dCA9IDE2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzEuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IG5ldyBfRXJyb3JbXCJkZWZhdWx0XCJdKFwiaW52YWxpZF90b2tlblwiLCBcIlRoZSB0b2tlbiBzcGVjaWZpZWQgaXMgbm90IGEgdmFsaWQgdG9rZW4gb2JqZWN0LlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MudG9rZW5zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguZnJvbU9yaWdpbiA9PT0gcmVxdWVzdC5wYXlsb2FkLm9yaWdpbiAmJiB4LmNyZWF0ZWRBdCA+ICtuZXcgRGF0ZSgpIC0gMzYwMCAqIDEyICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPiA1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzMS5uZXh0ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzMS5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbmV3IF9FcnJvcltcImRlZmF1bHRcIl0oXCJ0b2tlbl90aW1lb3V0XCIsIFwiWW91IGNhbiBvbmx5IGFkZCB1cCB0byA1IHRva2VucyBldmVyeSAxMiBob3Vycy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLnRva2Vucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmNyZWF0ZWRBdCA+ICtuZXcgRGF0ZSgpIC0gMzYwMCAqIDEyICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPiAxNSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MzEubmV4dCA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzEuYWJydXB0KFwicmV0dXJuXCIsIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IG5ldyBfRXJyb3JbXCJkZWZhdWx0XCJdKFwidG9rZW5fdGltZW91dFwiLCBcIlRvbyBtYW55IHRva2VucyB3ZXJlIGFkZGVkIG92ZXIgdGhlIHBhc3QgMTIgaG91cnMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzMS5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9Ub2tlblNlcnZpY2VbXCJkZWZhdWx0XCJdLmhhc1Rva2VuKHRva2VuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0cyA9IF9jb250ZXh0MzEuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMxLm5leHQgPSAyNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMxLmFicnVwdChcInJldHVyblwiLCByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBuZXcgX0Vycm9yW1wiZGVmYXVsdFwiXShcInRva2VuX2V4aXN0c1wiLCBcIlRoZSB1c2VyIGFscmVhZHkgaGFzIHRoaXMgdG9rZW4gaW4gdGhlaXIgU2NhdHRlci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMxLm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1Rva2VuU2VydmljZVtcImRlZmF1bHRcIl0uYWRkVG9rZW4odG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0JhbGFuY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXS5sb2FkQWxsQmFsYW5jZXModHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMxLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUzMSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gzNCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94MzMpIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTE0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5IQVNfQUNDT1VOVF9GT1IsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdmFsdWUxNSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMzMocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzMyQoX2NvbnRleHQzMykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MzMucHJldiA9IF9jb250ZXh0MzMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MzMuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgYmFkUmVzdWx0ID0gZnVuY3Rpb24gYmFkUmVzdWx0KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnSW52YWxpZCBmb3JtYXQnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfRXJyb3JbXCJkZWZhdWx0XCJdLm1hbGljaW91cyhtc2cpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlcXVlc3QucGF5bG9hZCkubGVuZ3RoICE9PSAyKSByZXR1cm4gYmFkUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgnbmV0d29yaycpKSByZXR1cm4gYmFkUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICB2YXIgbmV0d29yayA9IHJlcXVlc3QucGF5bG9hZC5uZXR3b3JrO1xuICAgICAgICAgICAgICAgICAgbmV0d29yayA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gX05ldHdvcmtbXCJkZWZhdWx0XCJdLmZyb21Kc29uKG5ldHdvcmspLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIW5ldHdvcmspIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogX0Vycm9yW1wiZGVmYXVsdFwiXS5ub05ldHdvcmsoKVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogISFfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmFjY291bnRzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5uZXR3b3JrVW5pcXVlID09PSBuZXR3b3JrLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzMyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94MzUpIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTE1LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogQWN0aW9ucy5HRVRfVkVSU0lPTixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWx1ZTE2ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzNChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTM0JChfY29udGV4dDM0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzNC5wcmV2ID0gX2NvbnRleHQzNC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzNC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLm1ldGEudmVyc2lvblxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDM0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlKF94MzYpIHtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTE2LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gQXBpU2VydmljZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBcGlTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIF9CbG9ja2NoYWlucyA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfQWNjb3VudCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9BY2NvdW50XCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBSZXNvdXJjZVNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZXNvdXJjZVNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBSZXNvdXJjZVNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShSZXNvdXJjZVNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcInVzZXNSZXNvdXJjZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlc1Jlc291cmNlcyhhY2NvdW50KSB7XG4gICAgICBhY2NvdW50ID0gX0FjY291bnRbXCJkZWZhdWx0XCJdLmZyb21Kc29uKGFjY291bnQpO1xuXG4gICAgICB2YXIgcGx1Z2luID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihhY2NvdW50LmJsb2NrY2hhaW4oKSk7XG5cbiAgICAgIHJldHVybiBwbHVnaW4udXNlc1Jlc291cmNlcygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuZWVkc1Jlc291cmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX25lZWRzUmVzb3VyY2VzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoYWNjb3VudCkge1xuICAgICAgICB2YXIgcGx1Z2luO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFjY291bnQgPSBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oYWNjb3VudCk7XG4gICAgICAgICAgICAgICAgcGx1Z2luID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihhY2NvdW50LmJsb2NrY2hhaW4oKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luLnVzZXNSZXNvdXJjZXMoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBwbHVnaW4ubmVlZHNSZXNvdXJjZXMoYWNjb3VudCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gbmVlZHNSZXNvdXJjZXMoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9uZWVkc1Jlc291cmNlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmVlZHNSZXNvdXJjZXM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkUmVzb3VyY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYWRkUmVzb3VyY2VzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGFjY291bnQpIHtcbiAgICAgICAgdmFyIHBsdWdpbjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYWNjb3VudCA9IF9BY2NvdW50W1wiZGVmYXVsdFwiXS5mcm9tSnNvbihhY2NvdW50KTtcbiAgICAgICAgICAgICAgICBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGFjY291bnQuYmxvY2tjaGFpbigpKTtcblxuICAgICAgICAgICAgICAgIGlmIChwbHVnaW4udXNlc1Jlc291cmNlcygpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHBsdWdpbi5hZGRSZXNvdXJjZXMoYWNjb3VudCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBhZGRSZXNvdXJjZXMoX3gyKSB7XG4gICAgICAgIHJldHVybiBfYWRkUmVzb3VyY2VzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRSZXNvdXJjZXM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UmVzb3VyY2VzRm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0UmVzb3VyY2VzRm9yID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGFjY291bnQpIHtcbiAgICAgICAgdmFyIHBsdWdpbjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYWNjb3VudCA9IF9BY2NvdW50W1wiZGVmYXVsdFwiXS5mcm9tSnNvbihhY2NvdW50KTtcbiAgICAgICAgICAgICAgICBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGFjY291bnQuYmxvY2tjaGFpbigpKTtcblxuICAgICAgICAgICAgICAgIGlmIChwbHVnaW4udXNlc1Jlc291cmNlcygpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBbXSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIHBsdWdpbi5nZXRSZXNvdXJjZXNGb3IoYWNjb3VudCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZXRSZXNvdXJjZXNGb3IoX3gzKSB7XG4gICAgICAgIHJldHVybiBfZ2V0UmVzb3VyY2VzRm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRSZXNvdXJjZXNGb3I7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiY2FjaGVSZXNvdXJjZUZvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2NhY2hlUmVzb3VyY2VGb3IgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTQoYWNjb3VudCkge1xuICAgICAgICB2YXIgcmVzb3VyY2VzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIik7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlc0ZvcihhY2NvdW50KTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzID0gX2NvbnRleHQ0LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLkFERF9SRVNPVVJDRVMsIHtcbiAgICAgICAgICAgICAgICAgIGFjYzogYWNjb3VudC5pZGVudGlmaWFibGUoKSxcbiAgICAgICAgICAgICAgICAgIHJlczogcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNhY2hlUmVzb3VyY2VGb3IoX3g0KSB7XG4gICAgICAgIHJldHVybiBfY2FjaGVSZXNvdXJjZUZvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FjaGVSZXNvdXJjZUZvcjtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gUmVzb3VyY2VTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFJlc291cmNlU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uL3N0b3JlL2NvbnN0YW50c1wiKSk7XG5cbnZhciBfUGVybWlzc2lvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9QZXJtaXNzaW9uXCIpKTtcblxudmFyIF9JZGVudGl0eSA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvSWRlbnRpdHlcIik7XG5cbnZhciBfU29ja2V0U2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvU29ja2V0U2VydmljZVwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgUGVybWlzc2lvblNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQZXJtaXNzaW9uU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFBlcm1pc3Npb25TZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoUGVybWlzc2lvblNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImlkZW50aXR5RnJvbVBlcm1pc3Npb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aXR5RnJvbVBlcm1pc3Npb25zKG9yaWdpbikge1xuICAgICAgdmFyIGZvcm1hdEZvclJlc3VsdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgdmFyIHBlcm1pc3Npb25zID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucztcblxuICAgICAgdmFyIHBvc3NpYmxlSWQgPSBwZXJtaXNzaW9ucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmlzSWRlbnRpdHlQZXJtaXNzaW9uRm9yKG9yaWdpbik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHBvc3NpYmxlSWQpIHtcbiAgICAgICAgdmFyIGlkZW50aXR5UmVxdWlyZW1lbnRzID0gX0lkZW50aXR5LklkZW50aXR5UmVxdWlyZWRGaWVsZHMuZnJvbVBlcm1pc3Npb24ocG9zc2libGVJZC5pZGVudGl0eVJlcXVpcmVtZW50cyk7XG5cbiAgICAgICAgdmFyIGlkZW50aXR5ID0gZm9ybWF0Rm9yUmVzdWx0ID8gcG9zc2libGVJZC5nZXRJZGVudGl0eSgpLmFzT25seVJlcXVpcmVkRmllbGRzKGlkZW50aXR5UmVxdWlyZW1lbnRzKSA6IHBvc3NpYmxlSWQuZ2V0SWRlbnRpdHkoKTtcbiAgICAgICAgaWYgKCFpZGVudGl0eSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlkZW50aXR5LmFjY291bnRzID0gcG9zc2libGVJZC5nZXRBY2NvdW50cygpLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiBmb3JtYXRGb3JSZXN1bHQgPyB4LmFzUmV0dXJuYWJsZSgpIDogeDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpZGVudGl0eTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZElkZW50aXR5T3JpZ2luUGVybWlzc2lvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FkZElkZW50aXR5T3JpZ2luUGVybWlzc2lvbiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKGlkZW50aXR5LCBhY2NvdW50cywgaWRlbnRpdHlSZXF1aXJlbWVudHMsIG9yaWdpbikge1xuICAgICAgICB2YXIgc2NhdHRlciwgcGVybWlzc2lvbjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50cyA9IF9JZGVudGl0eS5JZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21Kc29uKGlkZW50aXR5UmVxdWlyZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50cyA9IGlkZW50aXR5UmVxdWlyZW1lbnRzLmZvclBlcm1pc3Npb24oKTtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVJZGVudGl0eVBlcm1pc3Npb24ob3JpZ2luKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uID0gX1Blcm1pc3Npb25bXCJkZWZhdWx0XCJdLmZyb21BY3Rpb24ob3JpZ2luLCBpZGVudGl0eSwgYWNjb3VudHMsIHtcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5UmVxdWlyZW1lbnRzOiBpZGVudGl0eVJlcXVpcmVtZW50cyxcbiAgICAgICAgICAgICAgICAgIGlzSWRlbnRpdHk6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUsIHRoaXMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBhZGRJZGVudGl0eU9yaWdpblBlcm1pc3Npb24oX3gsIF94MiwgX3gzLCBfeDQpIHtcbiAgICAgICAgcmV0dXJuIF9hZGRJZGVudGl0eU9yaWdpblBlcm1pc3Npb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFkZElkZW50aXR5T3JpZ2luUGVybWlzc2lvbjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVJZGVudGl0eVBlcm1pc3Npb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9yZW1vdmVJZGVudGl0eVBlcm1pc3Npb24gPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIob3JpZ2luKSB7XG4gICAgICAgIHZhciBzY2F0dGVyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpOyAvLyBjb25zdCBpZFBlcm1pc3Npb25zID0gc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5maW5kKHggPT4geC5pc0lkZW50aXR5ICYmIHgub3JpZ2luID09PSBvcmlnaW4pO1xuICAgICAgICAgICAgICAgIC8vIGlmKCFpZFBlcm1pc3Npb25zKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4ucGVybWlzc2lvbnMgPSBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICF4LmlzSWRlbnRpdHkgfHwgeC5pc0lkZW50aXR5ICYmIHgub3JpZ2luICE9PSBvcmlnaW47XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVJZGVudGl0eVBlcm1pc3Npb24oX3g1KSB7XG4gICAgICAgIHJldHVybiBfcmVtb3ZlSWRlbnRpdHlQZXJtaXNzaW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZW1vdmVJZGVudGl0eVBlcm1pc3Npb247XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkSWRlbnRpdHlSZXF1aXJlbWVudHNQZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYWRkSWRlbnRpdHlSZXF1aXJlbWVudHNQZXJtaXNzaW9uID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKG9yaWdpbiwgaWRlbnRpdHksIGlkZW50aXR5UmVxdWlyZW1lbnRzKSB7XG4gICAgICAgIHZhciBzY2F0dGVyLCBwZXJtaXNzaW9uO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50cyA9IF9JZGVudGl0eS5JZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21Kc29uKGlkZW50aXR5UmVxdWlyZW1lbnRzKTsgLy8gTm8gbmVlZCBmb3IgYSBwZXJtaXNzaW9uLlxuXG4gICAgICAgICAgICAgICAgaWYgKCFpZGVudGl0eVJlcXVpcmVtZW50cy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50cyA9IGlkZW50aXR5UmVxdWlyZW1lbnRzLmZvclBlcm1pc3Npb24oKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb24gPSBfUGVybWlzc2lvbltcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgICAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eTogaWRlbnRpdHkuaWQsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50czogaWRlbnRpdHlSZXF1aXJlbWVudHMsXG4gICAgICAgICAgICAgICAgICBpc0lkZW50aXR5UmVxdWlyZW1lbnRzOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7IC8vIERvbid0IGR1cGxpY2F0ZSByZXF1aXJlbWVudHMuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXNjYXR0ZXIua2V5Y2hhaW4ucGVybWlzc2lvbnMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguY2hlY2tzdW0oKSA9PT0gcGVybWlzc2lvbi5jaGVja3N1bSgpO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGFkZElkZW50aXR5UmVxdWlyZW1lbnRzUGVybWlzc2lvbihfeDYsIF94NywgX3g4KSB7XG4gICAgICAgIHJldHVybiBfYWRkSWRlbnRpdHlSZXF1aXJlbWVudHNQZXJtaXNzaW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRJZGVudGl0eVJlcXVpcmVtZW50c1Blcm1pc3Npb247XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzSWRlbnRpdHlSZXF1aXJlbWVudHNQZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0lkZW50aXR5UmVxdWlyZW1lbnRzUGVybWlzc2lvbihvcmlnaW4sIGlkZW50aXR5LCBpZGVudGl0eVJlcXVpcmVtZW50cykge1xuICAgICAgaWRlbnRpdHlSZXF1aXJlbWVudHMgPSBfSWRlbnRpdHkuSWRlbnRpdHlSZXF1aXJlZEZpZWxkcy5mcm9tSnNvbihpZGVudGl0eVJlcXVpcmVtZW50cyk7XG4gICAgICBpZGVudGl0eVJlcXVpcmVtZW50cyA9IGlkZW50aXR5UmVxdWlyZW1lbnRzLmZvclBlcm1pc3Npb24oKTtcblxuICAgICAgdmFyIHBlcm1pc3Npb24gPSBfUGVybWlzc2lvbltcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgaWRlbnRpdHk6IGlkZW50aXR5LmlkLFxuICAgICAgICBpZGVudGl0eVJlcXVpcmVtZW50czogaWRlbnRpdHlSZXF1aXJlbWVudHMsXG4gICAgICAgIGlzSWRlbnRpdHlSZXF1aXJlbWVudHM6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmNoZWNrc3VtKCkgPT09IHBlcm1pc3Npb24uY2hlY2tzdW0oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVBY3Rpb25QZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvblBlcm1pc3Npb24ob3JpZ2luLCBpZGVudGl0eSwgYWNjb3VudHMsIHdoaXRlbGlzdERhdGEpIHtcbiAgICAgIHZhciBpbW11dGFibGVBY3Rpb25GaWVsZHMgPSBfUGVybWlzc2lvbltcImRlZmF1bHRcIl0uY3JlYXRlSW1tdXRhYmxlRmllbGRzSGFzaCh3aGl0ZWxpc3REYXRhLmZpZWxkcywgd2hpdGVsaXN0RGF0YS5wcm9wcyk7XG5cbiAgICAgIHZhciBwZXJtaXNzaW9uID0gX1Blcm1pc3Npb25bXCJkZWZhdWx0XCJdLmZyb21BY3Rpb24ob3JpZ2luLCBpZGVudGl0eSwgYWNjb3VudHMsIHtcbiAgICAgICAgY29udHJhY3Q6IHdoaXRlbGlzdERhdGEuY29kZSxcbiAgICAgICAgY29udHJhY3RIYXNoOiB3aGl0ZWxpc3REYXRhLmhhc2ggfHwgbnVsbCxcbiAgICAgICAgYWN0aW9uOiB3aGl0ZWxpc3REYXRhLnR5cGUsXG4gICAgICAgIGltbXV0YWJsZUFjdGlvbkZpZWxkczogaW1tdXRhYmxlQWN0aW9uRmllbGRzLFxuICAgICAgICBtdXRhYmxlQWN0aW9uRmllbGRzOiB3aGl0ZWxpc3REYXRhLnByb3BzLFxuICAgICAgICB0aW1lc3RhbXA6ICtuZXcgRGF0ZSgpLFxuICAgICAgICBpc0NvbnRyYWN0QWN0aW9uOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgdmFyIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG5cbiAgICAgIHJldHVybiBwZXJtaXNzaW9uO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRBY3Rpb25QZXJtaXNzaW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FkZEFjdGlvblBlcm1pc3Npb25zID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KG9yaWdpbiwgaWRlbnRpdHksIGFjY291bnRzLCB3aGl0ZWxpc3RzKSB7XG4gICAgICAgIHZhciBwZXJtaXNzaW9ucywgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCEoIXdoaXRlbGlzdHMgfHwgIXdoaXRlbGlzdHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIik7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zID0gd2hpdGVsaXN0cy5tYXAoZnVuY3Rpb24gKHdoaXRlbGlzdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFBlcm1pc3Npb25TZXJ2aWNlLmNyZWF0ZUFjdGlvblBlcm1pc3Npb24ob3JpZ2luLCBpZGVudGl0eSwgYWNjb3VudHMsIHdoaXRlbGlzdCk7XG4gICAgICAgICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghcGVybWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDQubmV4dCA9IDg7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLm1hcChmdW5jdGlvbiAocGVybSkge1xuICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZpbmcgYWxsIHNpbWlsYXIgcGVybWlzc2lvbnMgZm9yIHRoaXMgYWN0aW9uXG4gICAgICAgICAgICAgICAgICB2YXIgc2ltaWxhciA9IHNjYXR0ZXIua2V5Y2hhaW4ucGVybWlzc2lvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4Lm9yaWdpbiA9PT0gb3JpZ2luICYmIHguaXNDb250cmFjdEFjdGlvbiAmJiB4LmNvbnRyYWN0ID09PSBwZXJtLmNvbnRyYWN0ICYmIHguYWN0aW9uID09PSBwZXJtLmFjdGlvbjtcbiAgICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5pZDtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucyA9IHNjYXR0ZXIua2V5Y2hhaW4ucGVybWlzc2lvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhc2ltaWxhci5pbmNsdWRlcyh4LmlkKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5wdXNoKHBlcm0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gODtcbiAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEFjdGlvblBlcm1pc3Npb25zKF94OSwgX3gxMCwgX3gxMSwgX3gxMikge1xuICAgICAgICByZXR1cm4gX2FkZEFjdGlvblBlcm1pc3Npb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRBY3Rpb25QZXJtaXNzaW9ucztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJoYXNBY3Rpb25QZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0FjdGlvblBlcm1pc3Npb24ob3JpZ2luLCBpZGVudGl0eSwgYWNjb3VudHMsIG1lc3NhZ2UpIHtcbiAgICAgIHZhciBjb250cmFjdCA9IG1lc3NhZ2UuY29kZTtcbiAgICAgIHZhciBhY3Rpb24gPSBtZXNzYWdlLnR5cGU7XG4gICAgICB2YXIgY29udHJhY3RIYXNoID0gbnVsbDtcblxuICAgICAgdmFyIHBlcm1pc3Npb24gPSBfUGVybWlzc2lvbltcImRlZmF1bHRcIl0uZnJvbUFjdGlvbihvcmlnaW4sIGlkZW50aXR5LCBhY2NvdW50cywge1xuICAgICAgICBjb250cmFjdDogY29udHJhY3QsXG4gICAgICAgIGNvbnRyYWN0SGFzaDogY29udHJhY3RIYXNoLFxuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgaXNDb250cmFjdEFjdGlvbjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBtYXRjaGluZ1Blcm1pc3Npb25zID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHguY2hlY2tzdW0oKSA9PT0gcGVybWlzc2lvbi5jaGVja3N1bSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghbWF0Y2hpbmdQZXJtaXNzaW9ucy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBtYXRjaGluZ1Blcm1pc3Npb25zLnNvbWUoZnVuY3Rpb24gKHBlcm0pIHtcbiAgICAgICAgdmFyIGltbXV0YWJsZUFjdGlvbkZpZWxkcyA9IF9QZXJtaXNzaW9uW1wiZGVmYXVsdFwiXS5jcmVhdGVJbW11dGFibGVGaWVsZHNIYXNoKG1lc3NhZ2UuZGF0YSwgcGVybS5tdXRhYmxlQWN0aW9uRmllbGRzKTtcblxuICAgICAgICByZXR1cm4gcGVybS5pbW11dGFibGVBY3Rpb25GaWVsZHMgPT09IGltbXV0YWJsZUFjdGlvbkZpZWxkcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc1doaXRlbGlzdGVkVHJhbnNhY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZFRyYW5zYWN0aW9uKG9yaWdpbiwgaWRlbnRpdHksIGFjY291bnRzLCBtZXNzYWdlcywgcmVxdWlyZWRGaWVsZHMpIHtcbiAgICAgIHJlcXVpcmVkRmllbGRzID0gX0lkZW50aXR5LklkZW50aXR5UmVxdWlyZWRGaWVsZHMuZnJvbUpzb24ocmVxdWlyZWRGaWVsZHMpOyAvLyBDaGVja2luZyBmb3IgcGVybWlzc2lvbnNcblxuICAgICAgdmFyIHdoaXRlbGlzdGVkQWN0aW9ucyA9IG1lc3NhZ2VzLmV2ZXJ5KGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBQZXJtaXNzaW9uU2VydmljZS5oYXNBY3Rpb25QZXJtaXNzaW9uKG9yaWdpbiwgaWRlbnRpdHksIGFjY291bnRzLCBtZXNzYWdlKTtcbiAgICAgIH0pOyAvLyBOb3QgYWxsIGFjdGlvbnMgYXJlIHdoaXRlbGlzdGVkXG5cbiAgICAgIGlmICghd2hpdGVsaXN0ZWRBY3Rpb25zKSByZXR1cm4gZmFsc2U7IC8vIERvbnQgbmVlZCB0byBjaGVjayBmb3IgcmVxdWlyZWQgZmllbGRzXG5cbiAgICAgIGlmIChyZXF1aXJlZEZpZWxkcy5pc0VtcHR5KCkpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIFBlcm1pc3Npb25TZXJ2aWNlLmhhc0lkZW50aXR5UmVxdWlyZW1lbnRzUGVybWlzc2lvbihvcmlnaW4sIGlkZW50aXR5LCByZXF1aXJlZEZpZWxkcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrQXBwTGlua1Blcm1pc3Npb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrQXBwTGlua1Blcm1pc3Npb25zKG9yaWdpbikge1xuICAgICAgdmFyIHBlcm1pc3Npb25zID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgub3JpZ2luID09PSBvcmlnaW47XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFwZXJtaXNzaW9ucy5sZW5ndGgpIF9Tb2NrZXRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5zZW5kRXZlbnQoJ2xvZ291dCcsIHt9LCBvcmlnaW4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVBbGxQZXJtaXNzaW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlbW92ZUFsbFBlcm1pc3Npb25zID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU1KCkge1xuICAgICAgICB2YXIgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zID0gW107XG4gICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5hcHBzLm1hcChmdW5jdGlvbiAoYXBwKSB7XG4gICAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnJlbW92ZUFwcChhcHApO1xuXG4gICAgICAgICAgICAgICAgICBfU29ja2V0U2VydmljZVtcImRlZmF1bHRcIl0uc2VuZEV2ZW50KCdsb2dvdXQnLCB7fSwgYXBwLm9yaWdpbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVBbGxQZXJtaXNzaW9ucygpIHtcbiAgICAgICAgcmV0dXJuIF9yZW1vdmVBbGxQZXJtaXNzaW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVtb3ZlQWxsUGVybWlzc2lvbnM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlQWxsUGVybWlzc2lvbnNGb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9yZW1vdmVBbGxQZXJtaXNzaW9uc0ZvciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNihvcmlnaW4pIHtcbiAgICAgICAgdmFyIHNjYXR0ZXIsIGFwcDtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ2LnByZXYgPSBfY29udGV4dDYubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBhcHAgPSBzY2F0dGVyLmtleWNoYWluLmFwcHMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgub3JpZ2luID09PSBvcmlnaW47XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGFwcCkgc2NhdHRlci5rZXljaGFpbi5yZW1vdmVBcHAoYXBwKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zID0gc2NhdHRlci5rZXljaGFpbi5wZXJtaXNzaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4Lm9yaWdpbiAhPT0gb3JpZ2luO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Ni5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBcHBMaW5rUGVybWlzc2lvbnMob3JpZ2luKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU2LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlQWxsUGVybWlzc2lvbnNGb3IoX3gxMykge1xuICAgICAgICByZXR1cm4gX3JlbW92ZUFsbFBlcm1pc3Npb25zRm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZW1vdmVBbGxQZXJtaXNzaW9uc0ZvcjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVQZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcmVtb3ZlUGVybWlzc2lvbiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNyhwZXJtaXNzaW9uKSB7XG4gICAgICAgIHZhciBzY2F0dGVyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4ucGVybWlzc2lvbnMgPSBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguaWQgIT09IHBlcm1pc3Npb24uaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0FwcExpbmtQZXJtaXNzaW9ucyhwZXJtaXNzaW9uLm9yaWdpbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNywgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZVBlcm1pc3Npb24oX3gxNCkge1xuICAgICAgICByZXR1cm4gX3JlbW92ZVBlcm1pc3Npb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbW92ZVBlcm1pc3Npb247XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlRGFuZ2xpbmdQZXJtaXNzaW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlbW92ZURhbmdsaW5nUGVybWlzc2lvbnMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTgoKSB7XG4gICAgICAgIHZhciBzY2F0dGVyLCBvcmlnaW5zO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU4JChfY29udGV4dDgpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDgucHJldiA9IF9jb250ZXh0OC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIG9yaWdpbnMgPSBzY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHgub3JpZ2luO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4uYXBwcyA9IHNjYXR0ZXIua2V5Y2hhaW4uYXBwcy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5zLmluY2x1ZGVzKHgub3JpZ2luKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlOCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZURhbmdsaW5nUGVybWlzc2lvbnMoKSB7XG4gICAgICAgIHJldHVybiBfcmVtb3ZlRGFuZ2xpbmdQZXJtaXNzaW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVtb3ZlRGFuZ2xpbmdQZXJtaXNzaW9ucztcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gUGVybWlzc2lvblNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGVybWlzc2lvblNlcnZpY2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfQXBwc1NlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0FwcHNTZXJ2aWNlXCIpKTtcblxudmFyIF9QZXJtaXNzaW9uU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vUGVybWlzc2lvblNlcnZpY2VcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIEFwcHNTZXJ2aWNlOiBfQXBwc1NlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBQZXJtaXNzaW9uU2VydmljZTogX1Blcm1pc3Npb25TZXJ2aWNlW1wiZGVmYXVsdFwiXVxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi9zdG9yZS9jb25zdGFudHNcIikpO1xuXG52YXIgX0JhbGFuY2VTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYmxvY2tjaGFpbi9CYWxhbmNlU2VydmljZVwiKSk7XG5cbnZhciBfQmFja2VuZEFwaVNlcnZpY2UgPSByZXF1aXJlKFwiLi9CYWNrZW5kQXBpU2VydmljZVwiKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9Ub2tlblwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX0ZyYW1ld29yayA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvRnJhbWV3b3JrXCIpKTtcblxudmFyIHRpbWVvdXQgPSBmdW5jdGlvbiB0aW1lb3V0KHJxKSB7XG4gIHZhciBjYXVnaHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgcmV0dXJuIFByb21pc2UucmFjZShbbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShjYXVnaHRWYWx1ZSk7XG4gICAgfSwgMTAwMDApO1xuICB9KSwgcnFbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhdWdodFZhbHVlO1xuICB9KV0pO1xufTtcblxudmFyIHdhdGNoZXJzID0gW107XG52YXIgd2F0Y2hUaW1lb3V0O1xuXG52YXIgRXhjaGFuZ2VTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXhjaGFuZ2VTZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgRXhjaGFuZ2VTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoRXhjaGFuZ2VTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJwYWlyc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3BhaXJzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHRpbWVvdXQoKDAsIF9CYWNrZW5kQXBpU2VydmljZS5QT1NUKSgnZXhjaGFuZ2UvcGFpcnMnLCB7XG4gICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW5cbiAgICAgICAgICAgICAgICB9KSkudGhlbihmdW5jdGlvbiAocGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghcGFpcnMpIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhaXJzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFpcnNba2V5XS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC50b2tlbiA9IF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oeC50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcGFpcnMoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9wYWlycy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JhdGUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIodG9rZW4sIG90aGVyLCBzZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHRpbWVvdXQoKDAsIF9CYWNrZW5kQXBpU2VydmljZS5QT1NUKSgnZXhjaGFuZ2UvcmF0ZScsIHtcbiAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICAgIG90aGVyOiBvdGhlcixcbiAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2VcbiAgICAgICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiByYXRlKF94MiwgX3gzLCBfeDQpIHtcbiAgICAgICAgcmV0dXJuIF9yYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByYXRlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcIm9yZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfb3JkZXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMoc2VydmljZSwgdG9rZW4sIG90aGVyLCBhbW91bnQsIGZyb20sIHRvKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMkKF9jb250ZXh0Mykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIHRpbWVvdXQoKDAsIF9CYWNrZW5kQXBpU2VydmljZS5QT1NUKSgnZXhjaGFuZ2Uvb3JkZXInLCB7XG4gICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICAgICAgICAgICAgb3RoZXI6IG90aGVyLFxuICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgICAgICAgdG86IHRvXG4gICAgICAgICAgICAgICAgfSkpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gb3JkZXIoX3g1LCBfeDYsIF94NywgX3g4LCBfeDksIF94MTApIHtcbiAgICAgICAgcmV0dXJuIF9vcmRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3JkZXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjZXB0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hY2NlcHRlZCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNChpZCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCB0aW1lb3V0KCgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcImV4Y2hhbmdlL2FjY2VwdGVkL1wiLmNvbmNhdChpZCkpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGFjY2VwdGVkKF94MTEpIHtcbiAgICAgICAgcmV0dXJuIF9hY2NlcHRlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjZXB0ZWQ7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiY2FuY2VsbGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU1KGlkKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NS5wcmV2ID0gX2NvbnRleHQ1Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIHRpbWVvdXQoKDAsIF9CYWNrZW5kQXBpU2VydmljZS5HRVQpKFwiZXhjaGFuZ2UvY2FuY2VsbGVkL1wiLmNvbmNhdChpZCkpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNhbmNlbGxlZChfeDEyKSB7XG4gICAgICAgIHJldHVybiBfY2FuY2VsbGVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYW5jZWxsZWQ7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwib3JkZXJTdGF0dXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9vcmRlclN0YXR1cyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNihpZCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU2JChfY29udGV4dDYpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDYucHJldiA9IF9jb250ZXh0Ni5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCB0aW1lb3V0KCgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKShcImV4Y2hhbmdlL29yZGVyL1wiLmNvbmNhdChpZCkpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy51cGRhdGVkLnN0YXR1cztcbiAgICAgICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTYpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBvcmRlclN0YXR1cyhfeDEzKSB7XG4gICAgICAgIHJldHVybiBfb3JkZXJTdGF0dXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9yZGVyU3RhdHVzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInN0YWJsZVBhdGhzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc3RhYmxlUGF0aHMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTckKF9jb250ZXh0Nykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Ny5wcmV2ID0gX2NvbnRleHQ3Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIHRpbWVvdXQoKDAsIF9CYWNrZW5kQXBpU2VydmljZS5HRVQpKFwiZXhjaGFuZ2Uvc3RhYmlsaXplL3BhdGhzXCIpLCBbXSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTcpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzdGFibGVQYXRocygpIHtcbiAgICAgICAgcmV0dXJuIF9zdGFibGVQYXRocy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhYmxlUGF0aHM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicGFpcmFibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9wYWlyYWJsZSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOCgpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ4LnByZXYgPSBfY29udGV4dDgubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0OC5hYnJ1cHQoXCJyZXR1cm5cIiwgdGltZW91dCgoMCwgX0JhY2tlbmRBcGlTZXJ2aWNlLkdFVCkoXCJleGNoYW5nZS9wYWlyYWJsZVwiKSwgW10pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU4KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcGFpcmFibGUoKSB7XG4gICAgICAgIHJldHVybiBfcGFpcmFibGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhaXJhYmxlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcIndhdGNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhdGNoKGhpc3RvcnkpIHtcbiAgICAgIHdhdGNoZXJzLnB1c2goaGlzdG9yeSk7XG4gICAgICB0aGlzLmNoZWNrRXhjaGFuZ2VzKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tFeGNoYW5nZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9jaGVja0V4Y2hhbmdlcyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlOSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgX2xvb3AsIGk7XG5cbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOSQoX2NvbnRleHQxMCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTAucHJldiA9IF9jb250ZXh0MTAubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHdhdGNoVGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAod2F0Y2hlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDEwLm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBfbG9vcCA9XG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgaGlzdG9yeSwgc3RhdHVzLCBhY2NvdW50cywgbjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2xvb3AkKF9jb250ZXh0OSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ5LnByZXYgPSBfY29udGV4dDkubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gd2F0Y2hlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLm9yZGVyU3RhdHVzKGhpc3Rvcnkub3JkZXJEZXRhaWxzLmlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBfY29udGV4dDkuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShzdGF0dXMgIT09IGhpc3Rvcnkuc3RhdHVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5VUERBVEVfSElTVE9SWSwgaGlzdG9yeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoc3RhdHVzID09PSAnY29tcGxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIHNvbHZlIHRoaXMgd2l0aCBhbiBpbmplY3RlZCBzb3VuZCBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vU291bmRTZXJ2aWNlLmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX0ZyYW1ld29ya1tcImRlZmF1bHRcIl0ucHVzaE5vdGlmaWNhdGlvbignRXhjaGFuZ2UgQ29tcGxldGUnLCBcIllvdXIgdG9rZW4gZXhjaGFuZ2UgaGFzIGp1c3QgY29tcGxldGVkLlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICB3YXRjaGVycyA9IHdhdGNoZXJzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmlkICE9PSBoaXN0b3J5LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmFjY291bnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnNlbmRhYmxlKCkgPT09IGhpc3RvcnkudG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWNjb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ5Lm5leHQgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShuIDwgYWNjb3VudHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDE3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0JhbGFuY2VTZXJ2aWNlW1wiZGVmYXVsdFwiXS5sb2FkQmFsYW5jZXNGb3IoYWNjb3VudHNbbl0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OS5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sIF9sb29wKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgaWYgKCEoaSA8IHdhdGNoZXJzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuZGVsZWdhdGVZaWVsZChfbG9vcChpKSwgXCJ0MFwiLCA3KTtcblxuICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jaGVja0V4Y2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDAgKiAzMCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gY2hlY2tFeGNoYW5nZXMoKSB7XG4gICAgICAgIHJldHVybiBfY2hlY2tFeGNoYW5nZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoZWNrRXhjaGFuZ2VzO1xuICAgIH0oKVxuICB9XSk7XG4gIHJldHVybiBFeGNoYW5nZVNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRXhjaGFuZ2VTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi9zdG9yZS9jb25zdGFudHNcIikpO1xuXG52YXIgX0JhY2tlbmRBcGlTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uL2FwaXMvQmFja2VuZEFwaVNlcnZpY2VcIikpO1xuXG52YXIgX1N0b3JlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9PYmplY3RIZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbC9PYmplY3RIZWxwZXJzXCIpKTtcblxudmFyIHN0b3JlQXBwcyA9IGZ1bmN0aW9uIHN0b3JlQXBwcyhyZXMpIHt9O1xuXG52YXIgQXBwc1NlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBcHBzU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEFwcHNTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoQXBwc1NlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImdldEFwcHNcIixcblxuICAgIC8qKipcclxuICAgICAqIEdldHMgYXBwcyBhbmQgYmluZHMgdGhlbSB0byBzdGF0ZSxcclxuICAgICAqIGZhbGxzIGJhY2sgdG8gZ2l0aHViIGlmIEFQSSBpcyBmYWlsaW5nLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRBcHBzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgIHZhciBpbmNsdWRlLFxuICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICBpbWFnZUJhY2tlbmQsXG4gICAgICAgICAgICBmaWxldHlwZSxcbiAgICAgICAgICAgIGFwcHMsXG4gICAgICAgICAgICBmb3JtYXR0ZWRBcHBzLFxuICAgICAgICAgICAgX2FyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA9IF9hcmdzLmxlbmd0aCA+IDAgJiYgX2FyZ3NbMF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzWzBdIDogW107XG4gICAgICAgICAgICAgICAgc3RvcmUgPSBfYXJncy5sZW5ndGggPiAxICYmIF9hcmdzWzFdICE9PSB1bmRlZmluZWQgPyBfYXJnc1sxXSA6IHRydWU7XG4gICAgICAgICAgICAgICAgaW1hZ2VCYWNrZW5kID0gX2FyZ3MubGVuZ3RoID4gMiAmJiBfYXJnc1syXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3NbMl0gOiAnaHR0cHM6Ly9yYXdnaXQuY29tL0dldFNjYXR0ZXIvU2NhdHRlckFwcHMvbWFzdGVyL2xvZ29zJztcbiAgICAgICAgICAgICAgICBmaWxldHlwZSA9IF9hcmdzLmxlbmd0aCA+IDMgJiYgX2FyZ3NbM10gIT09IHVuZGVmaW5lZCA/IF9hcmdzWzNdIDogJ3N2Zyc7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9CYWNrZW5kQXBpU2VydmljZVtcImRlZmF1bHRcIl0uYXBwcyhpbmNsdWRlKTtcblxuICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgYXBwcyA9IF9jb250ZXh0LnNlbnQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkQXBwcyA9IGFwcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh4Lmhhc093blByb3BlcnR5KCdoYXNpbWFnZScpKSB4LmltZyA9IFwiXCIuY29uY2F0KGltYWdlQmFja2VuZCwgXCIvXCIpLmNvbmNhdCh4LmFwcGxpbmssIFwiLlwiKS5jb25jYXQoZmlsZXR5cGUpO1xuICAgICAgICAgICAgICAgICAgYWNjW3guYXBwbGlua10gPSB4O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RvcmUgJiYgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkpIHtcbiAgICAgICAgICAgICAgICAgIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX0RBUFBfREFUQSwgZm9ybWF0dGVkQXBwcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBmb3JtYXR0ZWRBcHBzKTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZXRBcHBzKCkge1xuICAgICAgICByZXR1cm4gX2dldEFwcHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEFwcHM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RmVhdHVyZWRBcHBzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0RmVhdHVyZWRBcHBzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfQmFja2VuZEFwaVNlcnZpY2UuR0VUKSgnYXBwcy9mZWF0dXJlZCcpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDIuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZlYXR1cmVkQXBwcygpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRGZWF0dXJlZEFwcHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEZlYXR1cmVkQXBwcztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRBcHBEYXRhRnJvbVNlcnZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldEFwcERhdGFGcm9tU2VydmVyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKG9yaWdpbikge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCAoMCwgX0JhY2tlbmRBcGlTZXJ2aWNlLkdFVCkoXCJhcHAvXCIuY29uY2F0KG9yaWdpbikpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0QXBwRGF0YUZyb21TZXJ2ZXIoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRBcHBEYXRhRnJvbVNlcnZlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0QXBwRGF0YUZyb21TZXJ2ZXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYXBwSXNJbkxvY2FsRGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBJc0luTG9jYWxEYXRhKG9yaWdpbikge1xuICAgICAgdmFyIGRhcHBEYXRhID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuZGFwcERhdGEgfHwge307XG4gICAgICB2YXIgZm91bmQgPSBkYXBwRGF0YVtvcmlnaW5dO1xuXG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gQ2hlY2tpbmcgc3ViZG9tYWluc1xuICAgICAgICAgIGlmIChvcmlnaW4uc3BsaXQoJy4nKS5sZW5ndGggPCAyKSByZXR1cm47XG5cbiAgICAgICAgICB2YXIgX29yaWdpbiRzcGxpdCA9IG9yaWdpbi5zcGxpdCgnLicpLFxuICAgICAgICAgICAgICBfb3JpZ2luJHNwbGl0MiA9ICgwLCBfc2xpY2VkVG9BcnJheTJbXCJkZWZhdWx0XCJdKShfb3JpZ2luJHNwbGl0LCAzKSxcbiAgICAgICAgICAgICAgc3ViZG9tYWluID0gX29yaWdpbiRzcGxpdDJbMF0sXG4gICAgICAgICAgICAgIGRvbWFpbiA9IF9vcmlnaW4kc3BsaXQyWzFdLFxuICAgICAgICAgICAgICBzdWZmaXggPSBfb3JpZ2luJHNwbGl0MlsyXTtcblxuICAgICAgICAgIE9iamVjdC5rZXlzKGRhcHBEYXRhKS5tYXAoZnVuY3Rpb24gKGFwcGxpbmspIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW4uaW5kZXhPZihhcHBsaW5rKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBkYXBwID0gZGFwcERhdGFbYXBwbGlua107XG4gICAgICAgICAgICBpZiAoIWRhcHAuaGFzT3duUHJvcGVydHkoJ3N1YmRvbWFpbnMnKSB8fCAhZGFwcC5zdWJkb21haW5zLmxlbmd0aCkgcmV0dXJuOyAvLyBDaGVja2luZyB3aWxkY2FyZHNcblxuICAgICAgICAgICAgaWYgKGRhcHAuc3ViZG9tYWlucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgIHJldHVybiB4ID09PSAnKic7XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICBpZiAoXCIqLlwiLmNvbmNhdChhcHBsaW5rKSA9PT0gXCIqLlwiLmNvbmNhdChkb21haW4sIFwiLlwiKS5jb25jYXQoc3VmZml4KSkgcmV0dXJuIGZvdW5kID0gZGFwcDtcbiAgICAgICAgICAgIH0gLy8gQ2hlY2tpbmcgaGFyZGNvZGVkIGRvbWFpbnNcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhcHAuc3ViZG9tYWlucy5tYXAoZnVuY3Rpb24gKHN1Yikge1xuICAgICAgICAgICAgICAgICAgaWYgKFwiXCIuY29uY2F0KHN1YiwgXCIuXCIpLmNvbmNhdChhcHBsaW5rKSA9PT0gb3JpZ2luKSByZXR1cm4gZm91bmQgPSBkYXBwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXBwRGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBcHBEYXRhKG9yaWdpbikge1xuICAgICAgdmFyIGVtcHR5UmVzdWx0ID0ge1xuICAgICAgICBhcHBsaW5rOiBvcmlnaW4sXG4gICAgICAgIHR5cGU6ICcnLFxuICAgICAgICBuYW1lOiBvcmlnaW4sXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgbG9nbzogJycsXG4gICAgICAgIHVybDogJydcbiAgICAgIH07XG4gICAgICB2YXIgZm91bmQgPSBBcHBzU2VydmljZS5hcHBJc0luTG9jYWxEYXRhKG9yaWdpbik7XG4gICAgICBpZiAoIWZvdW5kKSByZXR1cm4gZW1wdHlSZXN1bHQ7XG4gICAgICB2YXIgbWF4RGVzY3JpcHRpb25MZW5ndGggPSA3MDtcblxuICAgICAgaWYgKGZvdW5kLmRlc2NyaXB0aW9uLmxlbmd0aCA+IG1heERlc2NyaXB0aW9uTGVuZ3RoKSB7XG4gICAgICAgIGZvdW5kLmRlc2NyaXB0aW9uID0gXCJcIi5jb25jYXQoZm91bmQuZGVzY3JpcHRpb24uc3Vic3RyKDAsIDcwKSkuY29uY2F0KGZvdW5kLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDcwID8gJy4uLicgOiAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2F0ZWdvcmllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYXRlZ29yaWVzKCkge1xuICAgICAgdmFyIHNlbGVjdGVkQ2F0ZWdvcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG4gICAgICByZXR1cm4gQXBwc1NlcnZpY2UuYXBwc0J5Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnR5cGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXBwc0J5Q2F0ZWdvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXBwc0J5Q2F0ZWdvcnkoKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRDYXRlZ29yeSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblxuICAgICAgdmFyIGRhcHBEYXRhID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuZGFwcERhdGE7XG5cbiAgICAgIGlmICghZGFwcERhdGEpIHJldHVybiB7fTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXBwRGF0YSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgaXRlbSA9IGRhcHBEYXRhW2tleV07XG4gICAgICAgIGlmICghYWNjLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4geC50eXBlID09PSBpdGVtLnR5cGU7XG4gICAgICAgIH0pKSBhY2MucHVzaCh7XG4gICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgIGFwcHM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICBhY2MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiB4LnR5cGUgPT09IGl0ZW0udHlwZTtcbiAgICAgICAgfSkuYXBwcy5wdXNoKGl0ZW0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgW10pLm1hcChmdW5jdGlvbiAoY2F0KSB7XG4gICAgICAgIF9PYmplY3RIZWxwZXJzW1wiZGVmYXVsdFwiXS5zaHVmZmxlKGNhdC5hcHBzKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSkgcmV0dXJuIGNhdDtcbiAgICAgICAgY2F0LmFwcHMgPSBjYXQuYXBwcy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICB2YXIgYXBwbGluayA9IF9yZWYuYXBwbGluaztcbiAgICAgICAgICByZXR1cm4gQXBwc1NlcnZpY2UuZ2V0QXBwRGF0YShhcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2F0O1xuICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYi5hcHBzLmxlbmd0aCAtIGEuYXBwcy5sZW5ndGg7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXBwc0J5VGVybVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBzQnlUZXJtKHNlYXJjaFRlcm0pIHtcbiAgICAgIHZhciBkYXBwRGF0YSA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmRhcHBEYXRhO1xuXG4gICAgICBpZiAoIWRhcHBEYXRhKSByZXR1cm4ge307XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGFwcERhdGEpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBkYXBwRGF0YVtrZXldO1xuXG4gICAgICAgIHZhciBmb3VuZCA9IGZ1bmN0aW9uIGZvdW5kKHByb3ApIHtcbiAgICAgICAgICByZXR1cm4gcHJvcC50b0xvd2VyQ2FzZSgpLnRyaW0oKS5pbmRleE9mKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKS50cmltKCkpID4gLTE7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZvdW5kKGl0ZW0uYXBwbGluaykgfHwgZm91bmQoaXRlbS5uYW1lKSB8fCBmb3VuZChpdGVtLmRlc2NyaXB0aW9uKSkgYWNjLnB1c2goaXRlbSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxpbmtlZEFwcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGlua2VkQXBwcygpIHtcbiAgICAgIHZhciB0ZXJtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG4gICAgICB2YXIgdHlwZUZpbHRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLnBlcm1pc3Npb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5pc0lkZW50aXR5O1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICB2YXIgYXBwbGluayA9IF9yZWYyLm9yaWdpbjtcbiAgICAgICAgcmV0dXJuIEFwcHNTZXJ2aWNlLmdldEFwcERhdGEoYXBwbGluayk7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGFwcCkge1xuICAgICAgICByZXR1cm4gYXBwLnR5cGUgPT09IHR5cGVGaWx0ZXIgfHwgIXR5cGVGaWx0ZXI7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGFwcCkge1xuICAgICAgICByZXR1cm4gYXBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm1zKSA+IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBcHBzU2VydmljZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBcHBzU2VydmljZTsiXSwic291cmNlUm9vdCI6IiJ9