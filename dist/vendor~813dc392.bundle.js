(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "0rDn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var PasswordService =
/*#__PURE__*/
function () {
  function PasswordService() {
    (0, _classCallCheck2["default"])(this, PasswordService);
  }

  (0, _createClass2["default"])(PasswordService, null, [{
    key: "isLongEnough",
    value: function isLongEnough(password) {
      var suggested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
      return password.length >= suggested;
    }
  }, {
    key: "uppercaseCount",
    value: function uppercaseCount(password) {
      return password.split('').filter(function (x) {
        return x === x.toUpperCase();
      }).length;
    }
  }, {
    key: "lowercaseCount",
    value: function lowercaseCount(password) {
      return password.split('').filter(function (x) {
        return x !== x.toUpperCase();
      }).length;
    }
  }, {
    key: "specialCharCount",
    value: function specialCharCount(password) {
      return password.replace(/[0-9a-zA-Z]/gi, '').length;
    }
  }, {
    key: "hasError",
    value: function hasError(password) {
      if (!this.isLongEnough(password)) return 'Your password is not long enough (8 characters)';
      if (this.uppercaseCount(password) < 2) return "Passwords must have at least two uppercase letters";
      if (this.lowercaseCount(password) < 2) return "Passwords must have at least two lowercase letters";
      if (this.specialCharCount(password) < 2) return "Passwords must have at least two special characters (like # or @)";
      return false;
    }
  }]);
  return PasswordService;
}();

exports["default"] = PasswordService;

/***/ }),

/***/ "9pT+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var seeder;

var Seeder =
/*#__PURE__*/
function () {
  function Seeder() {
    (0, _classCallCheck2["default"])(this, Seeder);
  }

  (0, _createClass2["default"])(Seeder, null, [{
    key: "init",
    value: function init(_seeder) {
      seeder = _seeder;
    }
  }, {
    key: "getSalt",
    value: function () {
      var _getSalt = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", seeder.getSalt());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getSalt() {
        return _getSalt.apply(this, arguments);
      }

      return getSalt;
    }()
  }, {
    key: "getSeed",
    value: function () {
      var _getSeed = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", seeder.get());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSeed() {
        return _getSeed.apply(this, arguments);
      }

      return getSeed;
    }()
  }, {
    key: "setSeed",
    value: function () {
      var _setSeed = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(seed) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", seeder.set(seed));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setSeed(_x) {
        return _setSeed.apply(this, arguments);
      }

      return setSeed;
    }()
  }, {
    key: "clear",
    value: function () {
      var _clear = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", seeder.clear());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function clear() {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
  }]);
  return Seeder;
}();

exports["default"] = Seeder;

/***/ }),

/***/ "I2xi":
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

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _Blockchains = __webpack_require__("F+MN");

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var ContactService =
/*#__PURE__*/
function () {
  function ContactService() {
    (0, _classCallCheck2["default"])(this, ContactService);
  }

  (0, _createClass2["default"])(ContactService, null, [{
    key: "addOrUpdate",
    value: function () {
      var _addOrUpdate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(contact) {
        var scatter, c;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contact.recipient = contact.recipient.trim();
                contact.name = contact.name.trim();
                scatter = _StoreService["default"].get().state.scatter.clone();

                if (contact.name.length) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  error: 'Invalid contact name'
                });

              case 5:
                if (contact.recipient.length) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  error: 'Invalid contact account / address'
                });

              case 7:
                if (!scatter.contacts.find(function (x) {
                  return x.id !== contact.id && x.recipient.toLowerCase() === contact.recipient.toLowerCase();
                })) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Contact Exists"
                });

              case 9:
                if (!scatter.contacts.find(function (x) {
                  return x.id !== contact.id && x.name.toLowerCase() === contact.name.toLowerCase();
                })) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Contact Name Exists"
                });

              case 11:
                c = scatter.contacts.find(function (x) {
                  return x.id === contact.id;
                });

                if (c) {
                  c.recipient = contact.recipient;
                  c.name = contact.name;
                  c.blockchain = contact.blockchain;
                } else {
                  scatter.contacts.push(contact);
                }

                return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addOrUpdate(_x) {
        return _addOrUpdate.apply(this, arguments);
      }

      return addOrUpdate;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(contact) {
        var scatter;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.contacts = scatter.contacts.filter(function (x) {
                  return x.id !== contact.id;
                });
                return _context2.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function remove(_x2) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "validate",
    value: function validate(blockchain, contact) {
      // You can add unsupported blockchains which we have no logic for,
      // so we will always default to true for those.
      if (!_Blockchains.BlockchainsArray.map(function (x) {
        return x.value;
      }).includes(blockchain)) return true;
      return _PluginRepository["default"].plugin(blockchain).isValidRecipient(contact);
    }
  }]);
  return ContactService;
}();

exports["default"] = ContactService;

/***/ }),

/***/ "O1cq":
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

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _Crypto = _interopRequireDefault(__webpack_require__("lkGv"));

var _Keypair = _interopRequireDefault(__webpack_require__("Hxfq"));

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Seeder = _interopRequireDefault(__webpack_require__("9pT+"));

var _publicToPrivate2;

var KeyPairService =
/*#__PURE__*/
function () {
  function KeyPairService() {
    (0, _classCallCheck2["default"])(this, KeyPairService);
  }

  (0, _createClass2["default"])(KeyPairService, null, [{
    key: "init",
    value: function init(_publicToPrivate) {
      _publicToPrivate2 = _publicToPrivate;
    }
  }, {
    key: "getImportedKeyBlockchains",
    value: function getImportedKeyBlockchains(privateKey) {
      var blockchains = [];

      _Blockchains.BlockchainsArray.map(function (blockchainKV) {
        try {
          var plugin = _PluginRepository["default"].plugin(blockchainKV.value);

          if (plugin.validPrivateKey(privateKey)) blockchains.push(blockchainKV.value);
        } catch (e) {}
      });

      return blockchains;
    }
  }, {
    key: "isValidPrivateKey",
    value: function isValidPrivateKey(keypair) {
      return !!this.getImportedKeyBlockchains(keypair.privateKey).length;
    }
  }, {
    key: "convertHexPrivateToBuffer",
    value: function convertHexPrivateToBuffer(keypair) {
      if (typeof keypair.privateKey !== 'string') return false;
      var buffered = false;

      _Blockchains.BlockchainsArray.map(function (blockchainKV) {
        if (buffered) return;

        try {
          var plugin = _PluginRepository["default"].plugin(blockchainKV.value);

          if (plugin.validPrivateKey(keypair.privateKey)) {
            keypair.privateKey = plugin.hexPrivateToBuffer(keypair.privateKey);
            buffered = true;
          }
        } catch (e) {}
      });
    }
    /***
     * Tries to make a keypair in place from a private key
     * @param keypair
     */

  }, {
    key: "makePublicKeys",
    value: function () {
      var _makePublicKeys = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(keypair) {
        var _this = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                keypair.publicKeys = [];
                return _context.abrupt("return", Promise.all(_Blockchains.BlockchainsArray.map(function (blockchainKV) {
                  return _this.addPublicKey(keypair, blockchainKV.value);
                })));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function makePublicKeys(_x) {
        return _makePublicKeys.apply(this, arguments);
      }

      return makePublicKeys;
    }()
  }, {
    key: "addPublicKey",
    value: function () {
      var _addPublicKey = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(keypair, blockchain) {
        var allowDecryption,
            seed,
            plugin,
            p,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                allowDecryption = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;

                if (!keypair.publicKeys.find(function (x) {
                  return x.blockchain === blockchain;
                })) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", true);

              case 3:
                if (!(keypair.isEncrypted() && !allowDecryption)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", false);

              case 7:
                if (!(keypair.isEncrypted() && allowDecryption)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 10;
                return _Seeder["default"].getSeed();

              case 10:
                seed = _context2.sent;
                keypair.decrypt(seed);

              case 12:
                _context2.prev = 12;
                plugin = _PluginRepository["default"].plugin(blockchain);
                p = keypair.privateKey;
                if (typeof p !== 'string') p = plugin.bufferToHexPrivate(p);
                keypair.publicKeys.push({
                  blockchain: blockchain,
                  key: plugin.privateToPublic(p, keypair.fork)
                });
                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](12);
                console.log('err', _context2.t0);
                return _context2.abrupt("return", false);

              case 23:
                return _context2.abrupt("return", true);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[12, 19]]);
      }));

      function addPublicKey(_x2, _x3) {
        return _addPublicKey.apply(this, arguments);
      }

      return addPublicKey;
    }()
  }, {
    key: "generateKeyPair",
    value: function () {
      var _generateKeyPair = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(keypair) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Crypto["default"].generatePrivateKey();

              case 2:
                keypair.privateKey = _context3.sent;
                return _context3.abrupt("return", true);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function generateKeyPair(_x4) {
        return _generateKeyPair.apply(this, arguments);
      }

      return generateKeyPair;
    }()
  }, {
    key: "convertKey",
    value: function convertKey(keypair, blockchain) {
      var clone = keypair.clone();
      clone.id = _IdGenerator["default"].text(24);
      clone.name = "".concat((0, _Blockchains.blockchainName)(blockchain), " copy of ").concat(keypair.name);
      clone.blockchains = [blockchain];
      clone.createdAt = +new Date();
      return clone;
    }
  }, {
    key: "saveKeyPair",
    value: function () {
      var _saveKeyPair = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(keypair) {
        var scatter;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!keypair.name.length) keypair.name = "Key-".concat(_IdGenerator["default"].text(8));

                if (keypair.isUnique()) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", {
                  error: "Keypair already exists."
                });

              case 3:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.keypairs.push(_Keypair["default"].fromJson(keypair));
                return _context4.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function saveKeyPair(_x5) {
        return _saveKeyPair.apply(this, arguments);
      }

      return saveKeyPair;
    }()
  }, {
    key: "updateKeyPair",
    value: function () {
      var _updateKeyPair = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(keypair) {
        var scatter;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (keypair.name.length) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.keypairs.find(function (x) {
                  return x.unique() === keypair.unique();
                }).name = keypair.name;
                scatter.keychain.keypairs.find(function (x) {
                  return x.unique() === keypair.unique();
                }).blockchains = keypair.blockchains;
                return _context5.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateKeyPair(_x6) {
        return _updateKeyPair.apply(this, arguments);
      }

      return updateKeyPair;
    }()
  }, {
    key: "removeKeyPair",
    value: function () {
      var _removeKeyPair = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(keypair) {
        var scatter;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.keychain.removeKeyPair(keypair);
                return _context6.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function removeKeyPair(_x7) {
        return _removeKeyPair.apply(this, arguments);
      }

      return removeKeyPair;
    }()
  }, {
    key: "getKeyPairFromPublicKey",
    value: function getKeyPairFromPublicKey(publicKey) {
      var decrypt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var keypair = _StoreService["default"].get().state.scatter.keychain.keypairs.find(function (x) {
        return x.publicKeys.find(function (k) {
          return k.key === publicKey;
        });
      });

      if (keypair) return keypair.clone();

      var identity = _StoreService["default"].get().state.scatter.keychain.identities.find(function (x) {
        return x.publicKey === publicKey;
      });

      if (identity) {
        return _Keypair["default"].fromJson({
          name: identity.name,
          publicKeys: [{
            blockchain: _Blockchains.Blockchains.EOSIO,
            key: publicKey
          }],
          privateKey: identity.privateKey
        });
      }

      return null;
    }
  }, {
    key: "publicToPrivate",
    value: function () {
      var _publicToPrivate3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(publicKey) {
        var p, keypair;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!_publicToPrivate2) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 3;
                return _publicToPrivate2(publicKey);

              case 3:
                p = _context7.sent;

                if (!(p !== false)) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", p);

              case 6:
                keypair = this.getKeyPairFromPublicKey(publicKey, true);
                _context7.t0 = keypair;
                _context7.next = 10;
                return _Seeder["default"].getSeed();

              case 10:
                _context7.t1 = _context7.sent;

                _context7.t0.decrypt.call(_context7.t0, _context7.t1);

                if (!keypair) {
                  _context7.next = 14;
                  break;
                }

                return _context7.abrupt("return", keypair.privateKey);

              case 14:
                return _context7.abrupt("return", null);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function publicToPrivate(_x8) {
        return _publicToPrivate3.apply(this, arguments);
      }

      return publicToPrivate;
    }()
  }, {
    key: "getHardwareKeyList",
    value: function () {
      var _getHardwareKeyList = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(external) {
        var _this2 = this;

        var delta,
            tries,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                delta = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 0;
                tries = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 0;

                if (!(typeof external["interface"].getAddress !== 'function')) {
                  _context9.next = 4;
                  break;
                }

                return _context9.abrupt("return", false);

              case 4:
                if (!(tries >= 5)) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", false);

              case 6:
                return _context9.abrupt("return", external["interface"].getAddress(delta)["catch"](
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee8(err) {
                    return _regenerator["default"].wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!(err.toString().match('CLA_NOT_SUPPORTED') || err.toString().match('Cannot write to HID device'))) {
                              _context8.next = 4;
                              break;
                            }

                            _context8.next = 3;
                            return _HardwareService["default"].openConnections();

                          case 3:
                            return _context8.abrupt("return", _this2.getHardwareKeyList(external, delta, tries++));

                          case 4:
                            return _context8.abrupt("return", false);

                          case 5:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x10) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getHardwareKeyList(_x9) {
        return _getHardwareKeyList.apply(this, arguments);
      }

      return getHardwareKeyList;
    }()
  }, {
    key: "loadFromHardware",
    value: function () {
      var _loadFromHardware = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(keypair) {
        var _this3 = this;

        var tries,
            _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                tries = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 0;

                if (!(typeof keypair.external["interface"].getPublicKey !== 'function')) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return", false);

              case 3:
                if (!(tries >= 5)) {
                  _context11.next = 5;
                  break;
                }

                return _context11.abrupt("return", false);

              case 5:
                return _context11.abrupt("return", keypair.external["interface"].getPublicKey().then(function (key) {
                  if (_PluginRepository["default"].plugin(keypair.external.blockchain).validPublicKey(key)) {
                    keypair.external.publicKey = key;
                    keypair.publicKeys.push({
                      blockchain: keypair.external.blockchain,
                      key: key
                    });
                    return true;
                  } else return false;
                })["catch"](
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee10(err) {
                    return _regenerator["default"].wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!err.toString().match('Cannot write to HID device')) {
                              _context10.next = 4;
                              break;
                            }

                            _context10.next = 3;
                            return _HardwareService["default"].openConnections();

                          case 3:
                            return _context10.abrupt("return", _this3.loadFromHardware(keypair, tries++));

                          case 4:
                            return _context10.abrupt("return", false);

                          case 5:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x12) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function loadFromHardware(_x11) {
        return _loadFromHardware.apply(this, arguments);
      }

      return loadFromHardware;
    }()
  }, {
    key: "isHardware",
    value: function isHardware(publicKey) {
      var keypair = this.getKeyPairFromPublicKey(publicKey);
      if (!keypair) throw new Error('Keypair doesnt exist on keychain');
      return keypair.external !== null;
    }
  }]);
  return KeyPairService;
}();

exports["default"] = KeyPairService;

/***/ }),

/***/ "ONSl":
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

var _bignumber = _interopRequireDefault(__webpack_require__("eaOo"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var filterOutToken = function filterOutToken(scatter, token) {
  scatter.settings.tokens = scatter.settings.tokens.filter(function (x) {
    return x.unique() !== token.unique();
  });
  scatter.settings.blacklistTokens = scatter.settings.blacklistTokens.filter(function (x) {
    return x.unique() !== token.unique();
  });
  if (scatter.settings.displayToken === token.unique()) scatter.settings.displayToken = null;
};

var TokenService =
/*#__PURE__*/
function () {
  function TokenService() {
    (0, _classCallCheck2["default"])(this, TokenService);
  }

  (0, _createClass2["default"])(TokenService, null, [{
    key: "addToken",
    value: function () {
      var _addToken = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(token) {
        var blacklist,
            scatter,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                blacklist = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                scatter = _StoreService["default"].get().state.scatter.clone(); // Never adding system tokens.

                if (!_StoreService["default"].get().state.scatter.networkTokens().find(function (x) {
                  return x.unique() === token.unique();
                })) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", true);

              case 4:
                if (token.symbol.length) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Symbol Missing"
                });

              case 6:
                if (token.contract.length) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Contract missing"
                });

              case 8:
                if (!(!blacklist && scatter.settings.tokens.find(function (x) {
                  return x.unique() === token.unique();
                }))) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Token exists already (whitelist)"
                });

              case 10:
                if (!(blacklist && scatter.settings.blacklistTokens.find(function (x) {
                  return x.unique() === token.unique();
                }))) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  error: "Token exists already (blacklist)"
                });

              case 12:
                if (!token.name.trim().length) token.name = token.symbol;
                filterOutToken(scatter, token);
                if (!blacklist) scatter.settings.tokens.unshift(token);else scatter.settings.blacklistTokens.unshift(token);
                return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addToken(_x) {
        return _addToken.apply(this, arguments);
      }

      return addToken;
    }()
  }, {
    key: "removeToken",
    value: function removeToken(token) {
      var scatter = _StoreService["default"].get().state.scatter.clone(); // Never removing system tokens.


      if (_StoreService["default"].get().state.scatter.networkTokens().find(function (x) {
        return x.unique() === token.unique();
      })) return true;
      filterOutToken(scatter, token);

      _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);
    }
  }, {
    key: "hasToken",
    value: function hasToken(token) {
      var scatter = _StoreService["default"].get().state.scatter.clone();

      return !!_BalanceService["default"].totalBalances(true).totals[token.unique()] || !!scatter.settings.tokens.find(function (x) {
        return x.unique() === token.unique();
      }) || !!scatter.settings.blacklistTokens.find(function (x) {
        return x.unique() === token.unique();
      });
    }
  }, {
    key: "setDisplayCurrency",
    value: function () {
      var _setDisplayCurrency = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(ticker) {
        var scatter;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.settings.displayCurrency = ticker;
                return _context2.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function setDisplayCurrency(_x2) {
        return _setDisplayCurrency.apply(this, arguments);
      }

      return setDisplayCurrency;
    }()
  }, {
    key: "setDisplayToken",
    value: function () {
      var _setDisplayToken = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(token) {
        var scatter;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                scatter = _StoreService["default"].get().state.scatter.clone();
                scatter.settings.displayToken = token instanceof _Token["default"] ? token.uniqueWithChain() : token;
                return _context3.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setDisplayToken(_x3) {
        return _setDisplayToken.apply(this, arguments);
      }

      return setDisplayToken;
    }()
  }, {
    key: "formatAmount",
    value: function formatAmount(amount, token) {
      var div = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var operator = div ? 'div' : 'times';
      var decimalString = '';

      for (var i = 0; i < token.decimals; i++) {
        decimalString += '0';
      }

      return new _bignumber["default"](amount.toString(10), 10)[operator]("1".concat(decimalString)).toString(10);
    }
  }]);
  return TokenService;
}();

exports["default"] = TokenService;

/***/ }),

/***/ "SDtL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var nodeCrypto = typeof window === 'undefined' ? __webpack_require__("HEbw") : null;

var getRandomNumber = function getRandomNumber() {
  var nodeJsEnv = function nodeJsEnv() {
    return parseInt(nodeCrypto.randomBytes(8).toString('hex'), 16) / 0xffffffffffffffff;
  };

  var browserEnv = function browserEnv() {
    var arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  };

  return nodeCrypto ? nodeJsEnv() : browserEnv();
};

var IdGenerator =
/*#__PURE__*/
function () {
  function IdGenerator() {
    (0, _classCallCheck2["default"])(this, IdGenerator);
  }

  (0, _createClass2["default"])(IdGenerator, null, [{
    key: "rand",
    value: function rand() {
      return getRandomNumber();
    }
    /***
     * Generates a random string of specified size
     * @param size - The length of the string to generate
     * @returns {string} - The generated random string
     */

  }, {
    key: "text",
    value: function text(size) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < size; i++) {
        text += possible.charAt(Math.floor(IdGenerator.rand() * possible.length));
      }

      return text;
    }
    /***
     * Generates a random number of specified size
     * @param size - The length of the number to generate
     * @returns {string} - The generated random number ( as a string )
     */

  }, {
    key: "numeric",
    value: function numeric(size) {
      var add = 1;
      var max = 12 - add;
      if (size > max) return IdGenerator.numeric(max) + IdGenerator.numeric(size - max);
      max = Math.pow(10, size + add);
      var min = max / 10,
          number = Math.floor(IdGenerator.rand() * (max - min + 1)) + min;
      return ("" + number).substring(add);
    }
  }]);
  return IdGenerator;
}();

exports["default"] = IdGenerator;

/***/ }),

/***/ "SUCZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ContactService = _interopRequireDefault(__webpack_require__("I2xi"));

var _Framework = _interopRequireDefault(__webpack_require__("z/LQ"));

var _SingletonService = _interopRequireDefault(__webpack_require__("b8Vv"));

var _SocketService = _interopRequireDefault(__webpack_require__("btL5"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _TokenService = _interopRequireDefault(__webpack_require__("ONSl"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var _default = {
  ContactService: _ContactService["default"],
  Framework: _Framework["default"],
  SingletonService: _SingletonService["default"],
  SocketService: _SocketService["default"],
  StoreService: _StoreService["default"],
  TokenService: _TokenService["default"],
  EventService: _EventService["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "Srzz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPopupsAsConsole = exports.SHOW_POPUPS_AS_CONSOLE = exports.RUNNING_TESTS = void 0;
var RUNNING_TESTS = "production" === 'testing';
exports.RUNNING_TESTS = RUNNING_TESTS;
var SHOW_POPUPS_AS_CONSOLE = false;
exports.SHOW_POPUPS_AS_CONSOLE = SHOW_POPUPS_AS_CONSOLE;

var setPopupsAsConsole = function setPopupsAsConsole(bool) {
  return exports.SHOW_POPUPS_AS_CONSOLE = SHOW_POPUPS_AS_CONSOLE = bool;
};

exports.setPopupsAsConsole = setPopupsAsConsole;

/***/ }),

/***/ "UYLU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

/***
 * A set of helpers for Objects/Arrays
 */
var ObjectHelpers =
/*#__PURE__*/
function () {
  function ObjectHelpers() {
    (0, _classCallCheck2["default"])(this, ObjectHelpers);
  }

  (0, _createClass2["default"])(ObjectHelpers, null, [{
    key: "distinct",

    /***
     * Makes a single level array distinct
     * @param array
     * @returns {*}
     */
    value: function distinct(array) {
      return array.reduce(function (a, b) {
        return a.includes(b) ? a : a.concat(b);
      }, []);
    }
    /***
     * Flattens an array into a single dimension
     * @param array
     * @returns {*}
     */

  }, {
    key: "flatten",
    value: function flatten(array) {
      var _this = this;

      if (!Array.isArray(array)) return array;
      return array.reduce(function (a, b) {
        return a.concat(Array.isArray(b) ? _this.flatten(b) : b);
      }, []);
    }
    /***
     * Flattens an array into a single dimension
     * @param val
     * @returns {*}
     */

  }, {
    key: "flattenObject",
    value: function flattenObject(val) {
      var _this2 = this;

      if ((0, _typeof2["default"])(val) !== 'object') return this.flatten(val);
      return this.flatten(Object.keys(val).map(function (key) {
        return _this2.flattenObject(val[key]);
      }));
    }
  }, {
    key: "shuffle",
    value: function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [a[j], a[i]];
        a[i] = _ref[0];
        a[j] = _ref[1];
      }

      return a;
    }
  }, {
    key: "objectTake",
    value: function objectTake(obj, limit) {
      var limited = {};
      if (Object.keys(obj).length < limit) return obj;
      Object.keys(obj).map(function (key) {
        if (Object.keys(limited).length >= limit) return;
        limited[key] = obj[key];
      });
      return limited;
    }
  }]);
  return ObjectHelpers;
}();

exports["default"] = ObjectHelpers;

/***/ }),

/***/ "XtJ5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _QRService = _interopRequireDefault(__webpack_require__("sZoq"));

var _Seeder = _interopRequireDefault(__webpack_require__("9pT+"));

var _SigningService = _interopRequireDefault(__webpack_require__("r6PA"));

var _default = {
  HardwareService: _HardwareService["default"],
  KeyPairService: _KeyPairService["default"],
  QRService: _QRService["default"],
  Seeder: _Seeder["default"],
  SigningService: _SigningService["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "YRtA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var eventListener;

var EventService =
/*#__PURE__*/
function () {
  function EventService() {
    (0, _classCallCheck2["default"])(this, EventService);
  }

  (0, _createClass2["default"])(EventService, null, [{
    key: "init",
    value: function init(_service) {
      eventListener = _service;
    }
  }, {
    key: "emit",
    value: function emit(type, data) {
      return eventListener(type, data);
    }
  }]);
  return EventService;
}();

exports["default"] = EventService;

/***/ }),

/***/ "YhWJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Crypto = _interopRequireDefault(__webpack_require__("lkGv"));

var DateHelpers = _interopRequireWildcard(__webpack_require__("upjY"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var Http = _interopRequireWildcard(__webpack_require__("oYQz"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Mnemonic = _interopRequireDefault(__webpack_require__("w+eT"));

var _ObjectHelpers = _interopRequireDefault(__webpack_require__("UYLU"));

var TestingHelper = _interopRequireWildcard(__webpack_require__("Srzz"));

var _default = {
  Crypto: _Crypto["default"],
  DateHelpers: DateHelpers,
  Hasher: _Hasher["default"],
  Http: Http,
  IdGenerator: _IdGenerator["default"],
  Mnemonic: _Mnemonic["default"],
  ObjectHelpers: _ObjectHelpers["default"],
  TestingHelper: TestingHelper
};
exports["default"] = _default;

/***/ }),

/***/ "b8Vv":
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

var _PriceService = _interopRequireDefault(__webpack_require__("TmN8"));

var _PermissionService = _interopRequireDefault(__webpack_require__("eOAV"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _SocketService = _interopRequireDefault(__webpack_require__("btL5"));

var _AppsService = _interopRequireDefault(__webpack_require__("x0xh"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Blockchains = __webpack_require__("F+MN");

var initialized = false;

var SingletonService =
/*#__PURE__*/
function () {
  function SingletonService() {
    (0, _classCallCheck2["default"])(this, SingletonService);
  }

  (0, _createClass2["default"])(SingletonService, null, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!initialized) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", true);

              case 2:
                initialized = true;

                _PluginRepository["default"].plugin(_Blockchains.Blockchains.TRX).init();

                _SocketService["default"].initialize();

                _AppsService["default"].getApps();

                _PriceService["default"].watchPrices();

                _PermissionService["default"].removeDanglingPermissions();

                _AccountService["default"].fixOrphanedAccounts();

                return _context.abrupt("return", true);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);
  return SingletonService;
}();

exports["default"] = SingletonService;

/***/ }),

/***/ "btL5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getCerts = exports.handlePairedResponse = exports.handleApiResponse = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _ApiService = _interopRequireDefault(__webpack_require__("Z4q2"));

var _AuthorizedApp = _interopRequireDefault(__webpack_require__("zAsq"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _EventService = _interopRequireDefault(__webpack_require__("YRtA"));

var service;

var emit = function emit(origin, id, path, data) {
  return service.emit(origin, id, path, data);
};

var getNewKey = function getNewKey(origin, id) {
  return service.getNewKey(origin, id);
};

var handleApiResponse =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(request, id) {
    var existingApp, updateNonce, removeAppPermissions;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 2 way authentication
            existingApp = _StoreService["default"].get().state.scatter.keychain.findApp(request.data.payload.origin);

            updateNonce =
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                var clone;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        clone = _StoreService["default"].get().state.scatter.clone();
                        existingApp.nextNonce = request.data.nextNonce;
                        clone.keychain.updateOrPushApp(existingApp);
                        return _context.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, clone));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function updateNonce() {
                return _ref2.apply(this, arguments);
              };
            }();

            removeAppPermissions =
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2() {
                var clone;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        clone = _StoreService["default"].get().state.scatter.clone();
                        clone.keychain.removeApp(existingApp);
                        return _context2.abrupt("return", _StoreService["default"].get().dispatch(Actions.SET_SCATTER, clone));

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function removeAppPermissions() {
                return _ref3.apply(this, arguments);
              };
            }();

            if (existingApp) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return");

          case 5:
            if (existingApp.checkKey(request.data.appkey)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return");

          case 7:
            if (!(existingApp.nextNonce.length && !existingApp.checkNonce(request.data.nonce))) {
              _context3.next = 12;
              break;
            }

            _context3.next = 10;
            return removeAppPermissions();

          case 10:
            _context3.next = 14;
            break;

          case 12:
            _context3.next = 14;
            return updateNonce();

          case 14:
            _ApiService["default"].handler(Object.assign(request.data, {
              plugin: request.plugin
            })).then(function (result) {
              emit(existingApp.origin, id, 'api', result);
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function handleApiResponse(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleApiResponse = handleApiResponse;

var handlePairedResponse =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(request, id) {
    var scatter, existingApp, linkApp, addAuthorizedApp, repair;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            scatter = _StoreService["default"].get().state.scatter;
            existingApp = scatter.keychain.findApp(request.data.origin);
            linkApp = {
              type: 'linkApp',
              payload: request.data
            };

            if (!request.data.passthrough) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", emit(request.data.origin, id, 'paired', existingApp && existingApp.checkKey(request.data.appkey)));

          case 5:
            addAuthorizedApp =
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4() {
                var newKey,
                    authedApp,
                    clone,
                    _args4 = arguments;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        newKey = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
                        authedApp = new _AuthorizedApp["default"](request.data.origin, newKey ? newKey : request.data.appkey);
                        clone = scatter.clone();
                        clone.keychain.updateOrPushApp(authedApp);
                        _context4.next = 6;
                        return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, clone);

                      case 6:
                        emit(request.data.origin, id, 'paired', true);

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function addAuthorizedApp() {
                return _ref5.apply(this, arguments);
              };
            }();

            repair =
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee5() {
                var newKey;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return getNewKey(request.data.origin, id);

                      case 2:
                        newKey = _context5.sent;

                        if (!(newKey.data.origin !== request.data.origin || newKey.data.appkey.indexOf('appkey:') === -1)) {
                          _context5.next = 5;
                          break;
                        }

                        return _context5.abrupt("return", emit(request.data.origin, id, 'paired', false));

                      case 5:
                        return _context5.abrupt("return", addAuthorizedApp(newKey.data.appkey));

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function repair() {
                return _ref6.apply(this, arguments);
              };
            }();

            if (!existingApp) {
              _context7.next = 15;
              break;
            }

            if (!existingApp.checkKey(request.data.appkey)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", emit(request.data.origin, id, 'paired', true));

          case 12:
            _EventService["default"].emit('popout', linkApp).then(
            /*#__PURE__*/
            function () {
              var _ref8 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee6(_ref7) {
                var result;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        result = _ref7.result;

                        if (!result) {
                          _context6.next = 5;
                          break;
                        }

                        return _context6.abrupt("return", repair());

                      case 5:
                        emit(request.data.origin, id, 'paired', false);

                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x5) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 13:
            _context7.next = 16;
            break;

          case 15:
            return _context7.abrupt("return", repair());

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function handlePairedResponse(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
/***
 * Gets certs that allow for `wss` local connections.
 * @returns {Promise<Response | never | void>}
 */


exports.handlePairedResponse = handlePairedResponse;

var getCerts =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", fetch('https://certs.get-scatter.com?rand=' + Math.round(Math.random() * 100 + 1)).then(function (res) {
              return res.json();
            }).then(function (res) {
              if (res.hasOwnProperty('key') && res.hasOwnProperty('cert')) return res;

              _EventService["default"].emit('no_certs');

              return null;
            })["catch"](function () {
              return console.error('Could not fetch certs. Probably due to a proxy, vpn, or firewall.');
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getCerts() {
    return _ref9.apply(this, arguments);
  };
}();

exports.getCerts = getCerts;

var SocketService =
/*#__PURE__*/
function () {
  function SocketService() {
    (0, _classCallCheck2["default"])(this, SocketService);
  }

  (0, _createClass2["default"])(SocketService, null, [{
    key: "init",
    value: function init(_service) {
      service = _service;
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", service.initialize());

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function initialize() {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10() {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", service.close());

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "sendEvent",
    value: function () {
      var _sendEvent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(event, payload, origin) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", service.sendEvent(event, payload, origin));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function sendEvent(_x6, _x7, _x8) {
        return _sendEvent.apply(this, arguments);
      }

      return sendEvent;
    }()
  }, {
    key: "broadcastEvent",
    value: function () {
      var _broadcastEvent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(event, payload) {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", service.broadcastEvent(event, payload));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function broadcastEvent(_x9, _x10) {
        return _broadcastEvent.apply(this, arguments);
      }

      return broadcastEvent;
    }()
  }]);
  return SocketService;
}();

exports["default"] = SocketService;

/***/ }),

/***/ "gW+t":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var constants = _interopRequireWildcard(__webpack_require__("qjwK"));

var _default = {
  constants: constants
};
exports["default"] = _default;

/***/ }),

/***/ "hfoK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var hardwareService;
var NO_INIT = "You must initialize the hardware service first.";

var HardwareService =
/*#__PURE__*/
function () {
  function HardwareService() {
    (0, _classCallCheck2["default"])(this, HardwareService);
  }

  (0, _createClass2["default"])(HardwareService, null, [{
    key: "init",
    value: function init(_service) {
      hardwareService = _service;
    }
  }, {
    key: "openConnections",
    value: function () {
      var _openConnections = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var onlyIfDisconnected,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onlyIfDisconnected = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                if (hardwareService) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", console.error(NO_INIT));

              case 3:
                return _context.abrupt("return", this.openConnections(onlyIfDisconnected));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function openConnections() {
        return _openConnections.apply(this, arguments);
      }

      return openConnections;
    }()
  }, {
    key: "checkHardware",
    value: function () {
      var _checkHardware = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(account) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (hardwareService) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", console.error(NO_INIT));

              case 2:
                return _context2.abrupt("return", hardwareService.checkHardware(account));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function checkHardware(_x) {
        return _checkHardware.apply(this, arguments);
      }

      return checkHardware;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(network, publicKey, payload) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (hardwareService) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", console.error(NO_INIT));

              case 2:
                return _context3.abrupt("return", hardwareService.sign(network, publicKey, payload));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function sign(_x2, _x3, _x4) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }]);
  return HardwareService;
}();

exports["default"] = HardwareService;

/***/ }),

/***/ "lkGv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _eosjsEcc = _interopRequireDefault(__webpack_require__("Giuh"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var PrivateKey = _eosjsEcc["default"].PrivateKey;

var Crypto =
/*#__PURE__*/
function () {
  function Crypto() {
    (0, _classCallCheck2["default"])(this, Crypto);
  }

  (0, _createClass2["default"])(Crypto, null, [{
    key: "generatePrivateKey",
    value: function () {
      var _generatePrivateKey = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return PrivateKey.randomKey();

              case 2:
                return _context.abrupt("return", _context.sent.toBuffer());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generatePrivateKey() {
        return _generatePrivateKey.apply(this, arguments);
      }

      return generatePrivateKey;
    }()
  }, {
    key: "bufferToPrivateKey",
    value: function bufferToPrivateKey(buffer, blockchain) {
      return _PluginRepository["default"].plugin(blockchain).bufferToHexPrivate(buffer);
    }
  }, {
    key: "privateKeyToBuffer",
    value: function privateKeyToBuffer(privateKey, blockchain) {
      return _PluginRepository["default"].plugin(blockchain).hexPrivateToBuffer(privateKey);
    }
  }, {
    key: "bufferToHash",
    value: function bufferToHash(buffer) {
      return _eosjsEcc["default"].sha256(buffer);
    }
  }]);
  return Crypto;
}();

exports["default"] = Crypto;

/***/ }),

/***/ "oYQz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

/***
 * THIS HTTP SERVICE IS ONLY USED FOR HARDWARE WALLET CONNECTIONS
 *
 */
var get =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(route) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Promise.race([fetch(route).then(function (res) {
              return res.json();
            })["catch"](function () {
              return null;
            }), new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve(null);
              }, 60000);
            })]));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.get = get;

var post =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(route, data) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", Promise.race([fetch(route, {
              method: "POST",
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then(function (res) {
              return res.json();
            })["catch"](function () {
              return null;
            }), new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve(null);
              }, 120000);
            })]));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function post(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.post = post;

/***/ }),

/***/ "pk5N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var store;
/***
 * This is a helper service which returns the store
 * but allows for testing suites to be run without vuex
 */

var StoreService =
/*#__PURE__*/
function () {
  function StoreService() {
    (0, _classCallCheck2["default"])(this, StoreService);
  }

  (0, _createClass2["default"])(StoreService, null, [{
    key: "init",
    value: function init(_store) {
      store = _store;
    }
  }, {
    key: "get",
    value: function get() {
      return store;
    }
  }]);
  return StoreService;
}();

exports["default"] = StoreService;

/***/ }),

/***/ "qjwK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_PRICE_DATA = exports.LOAD_HISTORY = exports.DELTA_HISTORY = exports.UPDATE_HISTORY = exports.SET_PRICES = exports.REMOVE_BALANCES = exports.SET_BALANCES = exports.HOLD_SCATTER = exports.LOAD_SCATTER = exports.SET_SCATTER = exports.ADD_RESOURCES = exports.SET_RESOURCES = exports.SET_DAPP_LOGO = exports.SET_DAPP_DATA = void 0;
var SET_DAPP_DATA = 'setDappData';
exports.SET_DAPP_DATA = SET_DAPP_DATA;
var SET_DAPP_LOGO = 'setDappLogo';
exports.SET_DAPP_LOGO = SET_DAPP_LOGO;
var SET_RESOURCES = 'setResources';
exports.SET_RESOURCES = SET_RESOURCES;
var ADD_RESOURCES = 'addResources';
exports.ADD_RESOURCES = ADD_RESOURCES;
var SET_SCATTER = 'setScatter';
exports.SET_SCATTER = SET_SCATTER;
var LOAD_SCATTER = 'loadScatter';
exports.LOAD_SCATTER = LOAD_SCATTER;
var HOLD_SCATTER = 'holdScatter';
exports.HOLD_SCATTER = HOLD_SCATTER;
var SET_BALANCES = 'setBalances';
exports.SET_BALANCES = SET_BALANCES;
var REMOVE_BALANCES = 'removeBalances';
exports.REMOVE_BALANCES = REMOVE_BALANCES;
var SET_PRICES = 'setPrices';
exports.SET_PRICES = SET_PRICES;
var UPDATE_HISTORY = 'updateHistory';
exports.UPDATE_HISTORY = UPDATE_HISTORY;
var DELTA_HISTORY = 'deltaHistory';
exports.DELTA_HISTORY = DELTA_HISTORY;
var LOAD_HISTORY = 'loadHistory';
exports.LOAD_HISTORY = LOAD_HISTORY;
var SET_PRICE_DATA = 'setPriceData';
exports.SET_PRICE_DATA = SET_PRICE_DATA;

/***/ }),

/***/ "r6PA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _KeyPairService = _interopRequireDefault(__webpack_require__("O1cq"));

var _HardwareService = _interopRequireDefault(__webpack_require__("hfoK"));

var signer;

var SigningService =
/*#__PURE__*/
function () {
  function SigningService() {
    (0, _classCallCheck2["default"])(this, SigningService);
  }

  (0, _createClass2["default"])(SigningService, null, [{
    key: "init",
    value: function init(_signer) {
      signer = _signer;
    }
  }, {
    key: "sign",
    value: function sign(network, payload, publicKey) {
      var arbitrary = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isHash = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      // payload, publicKey, arbitrary = false, isHash = false, account = null
      if (!signer) {
        if (_KeyPairService["default"].isHardware(publicKey)) {
          return _HardwareService["default"].sign(network, publicKey, payload);
        } else return _PluginRepository["default"].plugin(network.blockchain).signer(payload, publicKey, arbitrary, isHash);
      } else return signer(network, publicKey, payload, arbitrary, isHash);
    }
  }]);
  return SigningService;
}();

exports["default"] = SigningService;

/***/ }),

/***/ "sZoq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _qrcode = _interopRequireDefault(__webpack_require__("0FX9"));

var _aesOop = _interopRequireDefault(__webpack_require__("5lvq"));

var _Mnemonic = _interopRequireDefault(__webpack_require__("w+eT"));

var _Seeder = _interopRequireDefault(__webpack_require__("9pT+"));

var QRService =
/*#__PURE__*/
function () {
  function QRService() {
    (0, _classCallCheck2["default"])(this, QRService);
  }

  (0, _createClass2["default"])(QRService, null, [{
    key: "createQR",
    value: function createQR(data) {
      var pass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new Promise(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(resolve) {
          var oldSeed, newSeed, dData;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(!pass || !pass.length)) {
                    _context.next = 4;
                    break;
                  }

                  resolve(_qrcode["default"].toDataURL(JSON.stringify({
                    data: data,
                    salt: _Seeder["default"].getSalt()
                  }), {
                    errorCorrectionLevel: 'L'
                  }));
                  _context.next = 12;
                  break;

                case 4:
                  _context.next = 6;
                  return _Seeder["default"].getSeed();

                case 6:
                  oldSeed = _context.sent;
                  _context.next = 9;
                  return _Mnemonic["default"].generateMnemonic(pass, _Seeder["default"].getSalt());

                case 9:
                  newSeed = _context.sent[1];
                  dData = _aesOop["default"].encrypt(_aesOop["default"].decrypt(data, oldSeed), newSeed);
                  resolve(_qrcode["default"].toDataURL(JSON.stringify({
                    data: dData,
                    salt: _Seeder["default"].getSalt()
                  }), {
                    errorCorrectionLevel: 'L'
                  }));

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createUnEncryptedQR",
    value: function () {
      var _createUnEncryptedQR = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _qrcode["default"].toDataURL(JSON.stringify(data), {
                  errorCorrectionLevel: 'L'
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createUnEncryptedQR(_x2) {
        return _createUnEncryptedQR.apply(this, arguments);
      }

      return createUnEncryptedQR;
    }()
  }, {
    key: "decryptQR",
    value: function () {
      var _decryptQR = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(data, salt, password) {
        var _ref2, _ref3, mnemonic, seed;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Mnemonic["default"].generateMnemonic(password, salt);

              case 2:
                _ref2 = _context3.sent;
                _ref3 = (0, _slicedToArray2["default"])(_ref2, 2);
                mnemonic = _ref3[0];
                seed = _ref3[1];
                _context3.prev = 6;
                return _context3.abrupt("return", _aesOop["default"].decrypt(data, seed));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](6);
                console.error('Error decrypting QR: ', _context3.t0);
                return _context3.abrupt("return", null);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 10]]);
      }));

      function decryptQR(_x3, _x4, _x5) {
        return _decryptQR.apply(this, arguments);
      }

      return decryptQR;
    }()
  }]);
  return QRService;
}();

exports["default"] = QRService;

/***/ }),

/***/ "upjY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcToLocal = exports.daysOld = exports.hourNow = exports.dateId = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var dateId = function dateId() {
  var minusDays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var d = new Date();
  d.setDate(d.getDate() - minusDays);
  var date = d.getUTCDate();
  var month = d.getUTCMonth() + 1;
  var year = d.getUTCFullYear();
  return "".concat(date, "-").concat(month, "-").concat(year);
};

exports.dateId = dateId;

var hourNow = function hourNow() {
  var d = new Date();
  return d.getHours();
};

exports.hourNow = hourNow;

var daysOld = function daysOld(id, days) {
  var _id$split = id.split('-'),
      _id$split2 = (0, _slicedToArray2["default"])(_id$split, 3),
      d2 = _id$split2[0],
      m2 = _id$split2[1],
      y2 = _id$split2[2];

  var d = new Date();
  var ago = new Date(d.getTime() - days * 24 * 60 * 60 * 1000);
  var then = new Date(y2, m2 - 1, d2, 0, 0, 0, 0);
  return then < ago;
};

exports.daysOld = daysOld;

var utcToLocal = function utcToLocal(id) {
  var hour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var _id$split3 = id.split('-'),
      _id$split4 = (0, _slicedToArray2["default"])(_id$split3, 3),
      d2 = _id$split4[0],
      m2 = _id$split4[1],
      y2 = _id$split4[2];

  var d = new Date();
  d.setUTCDate(d2);
  d.setUTCMonth(m2);
  d.setUTCFullYear(y2);
  d.setUTCHours(hour);
  var date = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  return ["".concat(date, "-").concat(month, "-").concat(year), d.getHours()];
};

exports.utcToLocal = utcToLocal;

/***/ }),

/***/ "w+eT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Mnemonic = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var _bip = _interopRequireDefault(__webpack_require__("AKX1"));

var Mnemonic =
/*#__PURE__*/
function () {
  function Mnemonic() {
    (0, _classCallCheck2["default"])(this, Mnemonic);
  }

  (0, _createClass2["default"])(Mnemonic, null, [{
    key: "generateMnemonic",

    /***
     * Generates a mnemonic from a password
     * @param password
     * @param salt
     * @returns {[string,string]}
     */
    value: function () {
      var _generateMnemonic = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(password) {
        var salt,
            hash,
            mnemonic,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                salt = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                _context.next = 3;
                return _Hasher["default"].secureHash(password, salt);

              case 3:
                hash = _context.sent;
                mnemonic = _bip["default"].entropyToMnemonic(hash);
                return _context.abrupt("return", [mnemonic, _bip["default"].mnemonicToSeedHex(mnemonic)]);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateMnemonic(_x) {
        return _generateMnemonic.apply(this, arguments);
      }

      return generateMnemonic;
    }()
  }, {
    key: "mnemonicToSeed",
    value: function () {
      var _mnemonicToSeed = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(mnemonic) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _bip["default"].mnemonicToSeedHex(mnemonic));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function mnemonicToSeed(_x2) {
        return _mnemonicToSeed.apply(this, arguments);
      }

      return mnemonicToSeed;
    }()
  }]);
  return Mnemonic;
}();

exports.Mnemonic = Mnemonic;
var _default = Mnemonic;
exports["default"] = _default;

/***/ }),

/***/ "z/LQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var framework;

var Framework =
/*#__PURE__*/
function () {
  function Framework() {
    (0, _classCallCheck2["default"])(this, Framework);
  }

  (0, _createClass2["default"])(Framework, null, [{
    key: "init",
    value: function init(_framework) {
      framework = _framework;
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return framework.getVersion();
    }
  }, {
    key: "pushNotification",
    value: function pushNotification(title, description) {
      return framework.pushNotification(title, description);
    }
  }, {
    key: "triggerDeepLink",
    value: function triggerDeepLink(deepLink) {}
  }]);
  return Framework;
}();

exports["default"] = Framework;

/***/ }),

/***/ "zugy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Seeder = _interopRequireDefault(__webpack_require__("9pT+"));

var ecc = __webpack_require__("Giuh");

var scrypt = __webpack_require__("agzX");

var Hasher =
/*#__PURE__*/
function () {
  function Hasher() {
    (0, _classCallCheck2["default"])(this, Hasher);
  }

  (0, _createClass2["default"])(Hasher, null, [{
    key: "unsaltedQuickHash",

    /***
     * Hashes a cleartext using the SHA-256 algorithm.
     * This is INSECURE and should only be used for fingerprinting.
     * @param cleartext
     */
    value: function unsaltedQuickHash(cleartext) {
      return ecc.sha256(cleartext);
    }
    /***
     * Hashes a cleartext using scrypt.
     * @param cleartext
     * @param salt
     */

  }, {
    key: "secureHash",
    value: function () {
      var _secureHash = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(cleartext) {
        var salt,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                salt = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                return _context2.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(resolve) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (salt) {
                              _context.next = 7;
                              break;
                            }

                            _context.next = 3;
                            return _Seeder["default"].getSalt();

                          case 3:
                            _context.t0 = _context.sent;

                            if (_context.t0) {
                              _context.next = 6;
                              break;
                            }

                            _context.t0 = 'SALT_ME';

                          case 6:
                            salt = _context.t0;

                          case 7:
                            scrypt(cleartext, salt, {
                              N: 16384,
                              r: 8,
                              p: 1,
                              dkLen: 16,
                              encoding: 'hex'
                            }, function (derivedKey) {
                              resolve(derivedKey);
                            });

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function secureHash(_x) {
        return _secureHash.apply(this, arguments);
      }

      return secureHash;
    }()
  }]);
  return Hasher;
}();

exports["default"] = Hasher;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvUGFzc3dvcmRTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9TZWVkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9Db250YWN0U2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9Ub2tlblNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvdXRpbC9JZEdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy91dGlsaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3V0aWwvVGVzdGluZ0hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS91dGlsL09iamVjdEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvRXZlbnRTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9TaW5nbGV0b25TZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvU29ja2V0U2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvSGFyZHdhcmVTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3V0aWwvQ3J5cHRvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3V0aWwvSHR0cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy91dGlsaXR5L1N0b3JlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9zdG9yZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL1NpZ25pbmdTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9RUlNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvdXRpbC9EYXRlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS91dGlsL01uZW1vbmljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3V0aWxpdHkvRnJhbWV3b3JrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3V0aWwvSGFzaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFhOztBQUViLDZCQUE2QixtQkFBTyxDQUFDLE1BQThDOztBQUVuRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDhDQUE4QyxtQkFBTyxDQUFDLE1BQXVDOztBQUU3RiwyQ0FBMkMsbUJBQU8sQ0FBQyxNQUFvQzs7QUFFdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCxxQzs7Ozs7Ozs7QUMxRGE7O0FBRWIsNkJBQTZCLG1CQUFPLENBQUMsTUFBOEM7O0FBRW5GO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsMENBQTBDLG1CQUFPLENBQUMsTUFBNEI7O0FBRTlFLGdEQUFnRCxtQkFBTyxDQUFDLE1BQXlDOztBQUVqRyw4Q0FBOEMsbUJBQU8sQ0FBQyxNQUF1Qzs7QUFFN0YsMkNBQTJDLG1CQUFPLENBQUMsTUFBb0M7O0FBRXZGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGFBQWE7QUFDYjs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLENB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R0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCw0QiIsImZpbGUiOiJ2ZW5kb3J+ODEzZGMzOTIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBQYXNzd29yZFNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQYXNzd29yZFNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBQYXNzd29yZFNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShQYXNzd29yZFNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImlzTG9uZ0Vub3VnaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0xvbmdFbm91Z2gocGFzc3dvcmQpIHtcbiAgICAgIHZhciBzdWdnZXN0ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDg7XG4gICAgICByZXR1cm4gcGFzc3dvcmQubGVuZ3RoID49IHN1Z2dlc3RlZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBwZXJjYXNlQ291bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBwZXJjYXNlQ291bnQocGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBwYXNzd29yZC5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4ID09PSB4LnRvVXBwZXJDYXNlKCk7XG4gICAgICB9KS5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxvd2VyY2FzZUNvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvd2VyY2FzZUNvdW50KHBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gcGFzc3dvcmQuc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geCAhPT0geC50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSkubGVuZ3RoO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzcGVjaWFsQ2hhckNvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNwZWNpYWxDaGFyQ291bnQocGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBwYXNzd29yZC5yZXBsYWNlKC9bMC05YS16QS1aXS9naSwgJycpLmxlbmd0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzRXJyb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzRXJyb3IocGFzc3dvcmQpIHtcbiAgICAgIGlmICghdGhpcy5pc0xvbmdFbm91Z2gocGFzc3dvcmQpKSByZXR1cm4gJ1lvdXIgcGFzc3dvcmQgaXMgbm90IGxvbmcgZW5vdWdoICg4IGNoYXJhY3RlcnMpJztcbiAgICAgIGlmICh0aGlzLnVwcGVyY2FzZUNvdW50KHBhc3N3b3JkKSA8IDIpIHJldHVybiBcIlBhc3N3b3JkcyBtdXN0IGhhdmUgYXQgbGVhc3QgdHdvIHVwcGVyY2FzZSBsZXR0ZXJzXCI7XG4gICAgICBpZiAodGhpcy5sb3dlcmNhc2VDb3VudChwYXNzd29yZCkgPCAyKSByZXR1cm4gXCJQYXNzd29yZHMgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBsb3dlcmNhc2UgbGV0dGVyc1wiO1xuICAgICAgaWYgKHRoaXMuc3BlY2lhbENoYXJDb3VudChwYXNzd29yZCkgPCAyKSByZXR1cm4gXCJQYXNzd29yZHMgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBzcGVjaWFsIGNoYXJhY3RlcnMgKGxpa2UgIyBvciBAKVwiO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gUGFzc3dvcmRTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFBhc3N3b3JkU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBzZWVkZXI7XG5cbnZhciBTZWVkZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZWVkZXIoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBTZWVkZXIpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShTZWVkZXIsIG51bGwsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChfc2VlZGVyKSB7XG4gICAgICBzZWVkZXIgPSBfc2VlZGVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTYWx0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0U2FsdCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgc2VlZGVyLmdldFNhbHQoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZXRTYWx0KCkge1xuICAgICAgICByZXR1cm4gX2dldFNhbHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldFNhbHQ7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2VlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldFNlZWQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHNlZWRlci5nZXQoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFNlZWQoKSB7XG4gICAgICAgIHJldHVybiBfZ2V0U2VlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0U2VlZDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJzZXRTZWVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2V0U2VlZCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMyhzZWVkKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMkKF9jb250ZXh0Mykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIHNlZWRlci5zZXQoc2VlZCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzZXRTZWVkKF94KSB7XG4gICAgICAgIHJldHVybiBfc2V0U2VlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0U2VlZDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2NsZWFyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCBzZWVkZXIuY2xlYXIoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gX2NsZWFyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbGVhcjtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gU2VlZGVyO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNlZWRlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uL3N0b3JlL2NvbnN0YW50c1wiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIi4uLy4uL21vZGVscy9CbG9ja2NoYWluc1wiKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIENvbnRhY3RTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29udGFjdFNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBDb250YWN0U2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKENvbnRhY3RTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJhZGRPclVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FkZE9yVXBkYXRlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoY29udGFjdCkge1xuICAgICAgICB2YXIgc2NhdHRlciwgYztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjb250YWN0LnJlY2lwaWVudCA9IGNvbnRhY3QucmVjaXBpZW50LnRyaW0oKTtcbiAgICAgICAgICAgICAgICBjb250YWN0Lm5hbWUgPSBjb250YWN0Lm5hbWUudHJpbSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFjdC5uYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiAnSW52YWxpZCBjb250YWN0IG5hbWUnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGlmIChjb250YWN0LnJlY2lwaWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogJ0ludmFsaWQgY29udGFjdCBhY2NvdW50IC8gYWRkcmVzcydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgaWYgKCFzY2F0dGVyLmNvbnRhY3RzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4LmlkICE9PSBjb250YWN0LmlkICYmIHgucmVjaXBpZW50LnRvTG93ZXJDYXNlKCkgPT09IGNvbnRhY3QucmVjaXBpZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA5O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogXCJDb250YWN0IEV4aXN0c1wiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGlmICghc2NhdHRlci5jb250YWN0cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC5pZCAhPT0gY29udGFjdC5pZCAmJiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gY29udGFjdC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiQ29udGFjdCBOYW1lIEV4aXN0c1wiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICBjID0gc2NhdHRlci5jb250YWN0cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC5pZCA9PT0gY29udGFjdC5pZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICBjLnJlY2lwaWVudCA9IGNvbnRhY3QucmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgYy5uYW1lID0gY29udGFjdC5uYW1lO1xuICAgICAgICAgICAgICAgICAgYy5ibG9ja2NoYWluID0gY29udGFjdC5ibG9ja2NoYWluO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzY2F0dGVyLmNvbnRhY3RzLnB1c2goY29udGFjdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gYWRkT3JVcGRhdGUoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9hZGRPclVwZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWRkT3JVcGRhdGU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcmVtb3ZlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGNvbnRhY3QpIHtcbiAgICAgICAgdmFyIHNjYXR0ZXI7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgc2NhdHRlci5jb250YWN0cyA9IHNjYXR0ZXIuY29udGFjdHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC5pZCAhPT0gY29udGFjdC5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZShfeDIpIHtcbiAgICAgICAgcmV0dXJuIF9yZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbW92ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJ2YWxpZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZGF0ZShibG9ja2NoYWluLCBjb250YWN0KSB7XG4gICAgICAvLyBZb3UgY2FuIGFkZCB1bnN1cHBvcnRlZCBibG9ja2NoYWlucyB3aGljaCB3ZSBoYXZlIG5vIGxvZ2ljIGZvcixcbiAgICAgIC8vIHNvIHdlIHdpbGwgYWx3YXlzIGRlZmF1bHQgdG8gdHJ1ZSBmb3IgdGhvc2UuXG4gICAgICBpZiAoIV9CbG9ja2NoYWlucy5CbG9ja2NoYWluc0FycmF5Lm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgIH0pLmluY2x1ZGVzKGJsb2NrY2hhaW4pKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGJsb2NrY2hhaW4pLmlzVmFsaWRSZWNpcGllbnQoY29udGFjdCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb250YWN0U2VydmljZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDb250YWN0U2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi9zdG9yZS9jb25zdGFudHNcIikpO1xuXG52YXIgX0NyeXB0byA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWwvQ3J5cHRvXCIpKTtcblxudmFyIF9LZXlwYWlyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0tleXBhaXJcIikpO1xuXG52YXIgX0hhcmR3YXJlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vSGFyZHdhcmVTZXJ2aWNlXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBfSWRHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsL0lkR2VuZXJhdG9yXCIpKTtcblxudmFyIF9TZWVkZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1NlZWRlclwiKSk7XG5cbnZhciBfcHVibGljVG9Qcml2YXRlMjtcblxudmFyIEtleVBhaXJTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gS2V5UGFpclNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBLZXlQYWlyU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEtleVBhaXJTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoX3B1YmxpY1RvUHJpdmF0ZSkge1xuICAgICAgX3B1YmxpY1RvUHJpdmF0ZTIgPSBfcHVibGljVG9Qcml2YXRlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRJbXBvcnRlZEtleUJsb2NrY2hhaW5zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEltcG9ydGVkS2V5QmxvY2tjaGFpbnMocHJpdmF0ZUtleSkge1xuICAgICAgdmFyIGJsb2NrY2hhaW5zID0gW107XG5cbiAgICAgIF9CbG9ja2NoYWlucy5CbG9ja2NoYWluc0FycmF5Lm1hcChmdW5jdGlvbiAoYmxvY2tjaGFpbktWKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHBsdWdpbiA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYmxvY2tjaGFpbktWLnZhbHVlKTtcblxuICAgICAgICAgIGlmIChwbHVnaW4udmFsaWRQcml2YXRlS2V5KHByaXZhdGVLZXkpKSBibG9ja2NoYWlucy5wdXNoKGJsb2NrY2hhaW5LVi52YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGJsb2NrY2hhaW5zO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc1ZhbGlkUHJpdmF0ZUtleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkUHJpdmF0ZUtleShrZXlwYWlyKSB7XG4gICAgICByZXR1cm4gISF0aGlzLmdldEltcG9ydGVkS2V5QmxvY2tjaGFpbnMoa2V5cGFpci5wcml2YXRlS2V5KS5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnZlcnRIZXhQcml2YXRlVG9CdWZmZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29udmVydEhleFByaXZhdGVUb0J1ZmZlcihrZXlwYWlyKSB7XG4gICAgICBpZiAodHlwZW9mIGtleXBhaXIucHJpdmF0ZUtleSAhPT0gJ3N0cmluZycpIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBidWZmZXJlZCA9IGZhbHNlO1xuXG4gICAgICBfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnNBcnJheS5tYXAoZnVuY3Rpb24gKGJsb2NrY2hhaW5LVikge1xuICAgICAgICBpZiAoYnVmZmVyZWQpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBwbHVnaW4gPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGJsb2NrY2hhaW5LVi52YWx1ZSk7XG5cbiAgICAgICAgICBpZiAocGx1Z2luLnZhbGlkUHJpdmF0ZUtleShrZXlwYWlyLnByaXZhdGVLZXkpKSB7XG4gICAgICAgICAgICBrZXlwYWlyLnByaXZhdGVLZXkgPSBwbHVnaW4uaGV4UHJpdmF0ZVRvQnVmZmVyKGtleXBhaXIucHJpdmF0ZUtleSk7XG4gICAgICAgICAgICBidWZmZXJlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKipcclxuICAgICAqIFRyaWVzIHRvIG1ha2UgYSBrZXlwYWlyIGluIHBsYWNlIGZyb20gYSBwcml2YXRlIGtleVxyXG4gICAgICogQHBhcmFtIGtleXBhaXJcclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibWFrZVB1YmxpY0tleXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9tYWtlUHVibGljS2V5cyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKGtleXBhaXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGtleXBhaXIucHVibGljS2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgUHJvbWlzZS5hbGwoX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zQXJyYXkubWFwKGZ1bmN0aW9uIChibG9ja2NoYWluS1YpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5hZGRQdWJsaWNLZXkoa2V5cGFpciwgYmxvY2tjaGFpbktWLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gbWFrZVB1YmxpY0tleXMoX3gpIHtcbiAgICAgICAgcmV0dXJuIF9tYWtlUHVibGljS2V5cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFrZVB1YmxpY0tleXM7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkUHVibGljS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYWRkUHVibGljS2V5ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGtleXBhaXIsIGJsb2NrY2hhaW4pIHtcbiAgICAgICAgdmFyIGFsbG93RGVjcnlwdGlvbixcbiAgICAgICAgICAgIHNlZWQsXG4gICAgICAgICAgICBwbHVnaW4sXG4gICAgICAgICAgICBwLFxuICAgICAgICAgICAgX2FyZ3MyID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBhbGxvd0RlY3J5cHRpb24gPSBfYXJnczIubGVuZ3RoID4gMiAmJiBfYXJnczJbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzMlsyXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFrZXlwYWlyLnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gYmxvY2tjaGFpbjtcbiAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGlmICghKGtleXBhaXIuaXNFbmNyeXB0ZWQoKSAmJiAhYWxsb3dEZWNyeXB0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICBpZiAoIShrZXlwYWlyLmlzRW5jcnlwdGVkKCkgJiYgYWxsb3dEZWNyeXB0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9TZWVkZXJbXCJkZWZhdWx0XCJdLmdldFNlZWQoKTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIHNlZWQgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgICBrZXlwYWlyLmRlY3J5cHQoc2VlZCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICBfY29udGV4dDIucHJldiA9IDEyO1xuICAgICAgICAgICAgICAgIHBsdWdpbiA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYmxvY2tjaGFpbik7XG4gICAgICAgICAgICAgICAgcCA9IGtleXBhaXIucHJpdmF0ZUtleTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSBwID0gcGx1Z2luLmJ1ZmZlclRvSGV4UHJpdmF0ZShwKTtcbiAgICAgICAgICAgICAgICBrZXlwYWlyLnB1YmxpY0tleXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBibG9ja2NoYWluOiBibG9ja2NoYWluLFxuICAgICAgICAgICAgICAgICAga2V5OiBwbHVnaW4ucHJpdmF0ZVRvUHVibGljKHAsIGtleXBhaXIuZm9yaylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDIzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTk6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLnByZXYgPSAxOTtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIudDAgPSBfY29udGV4dDJbXCJjYXRjaFwiXSgxMik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VycicsIF9jb250ZXh0Mi50MCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIsIG51bGwsIFtbMTIsIDE5XV0pO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBhZGRQdWJsaWNLZXkoX3gyLCBfeDMpIHtcbiAgICAgICAgcmV0dXJuIF9hZGRQdWJsaWNLZXkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFkZFB1YmxpY0tleTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZW5lcmF0ZUtleVBhaXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZW5lcmF0ZUtleVBhaXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMoa2V5cGFpcikge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9DcnlwdG9bXCJkZWZhdWx0XCJdLmdlbmVyYXRlUHJpdmF0ZUtleSgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBrZXlwYWlyLnByaXZhdGVLZXkgPSBfY29udGV4dDMuc2VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlQYWlyKF94NCkge1xuICAgICAgICByZXR1cm4gX2dlbmVyYXRlS2V5UGFpci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2VuZXJhdGVLZXlQYWlyO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImNvbnZlcnRLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29udmVydEtleShrZXlwYWlyLCBibG9ja2NoYWluKSB7XG4gICAgICB2YXIgY2xvbmUgPSBrZXlwYWlyLmNsb25lKCk7XG4gICAgICBjbG9uZS5pZCA9IF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0udGV4dCgyNCk7XG4gICAgICBjbG9uZS5uYW1lID0gXCJcIi5jb25jYXQoKDAsIF9CbG9ja2NoYWlucy5ibG9ja2NoYWluTmFtZSkoYmxvY2tjaGFpbiksIFwiIGNvcHkgb2YgXCIpLmNvbmNhdChrZXlwYWlyLm5hbWUpO1xuICAgICAgY2xvbmUuYmxvY2tjaGFpbnMgPSBbYmxvY2tjaGFpbl07XG4gICAgICBjbG9uZS5jcmVhdGVkQXQgPSArbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2F2ZUtleVBhaXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zYXZlS2V5UGFpciA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNChrZXlwYWlyKSB7XG4gICAgICAgIHZhciBzY2F0dGVyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDQucHJldiA9IF9jb250ZXh0NC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoIWtleXBhaXIubmFtZS5sZW5ndGgpIGtleXBhaXIubmFtZSA9IFwiS2V5LVwiLmNvbmNhdChfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLnRleHQoOCkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleXBhaXIuaXNVbmlxdWUoKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiS2V5cGFpciBhbHJlYWR5IGV4aXN0cy5cIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIua2V5Y2hhaW4ua2V5cGFpcnMucHVzaChfS2V5cGFpcltcImRlZmF1bHRcIl0uZnJvbUpzb24oa2V5cGFpcikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU0KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2F2ZUtleVBhaXIoX3g1KSB7XG4gICAgICAgIHJldHVybiBfc2F2ZUtleVBhaXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNhdmVLZXlQYWlyO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZUtleVBhaXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF91cGRhdGVLZXlQYWlyID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU1KGtleXBhaXIpIHtcbiAgICAgICAgdmFyIHNjYXR0ZXI7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NS5wcmV2ID0gX2NvbnRleHQ1Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChrZXlwYWlyLm5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLmtleXBhaXJzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSBrZXlwYWlyLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgIH0pLm5hbWUgPSBrZXlwYWlyLm5hbWU7XG4gICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5rZXlwYWlycy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0ga2V5cGFpci51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICB9KS5ibG9ja2NoYWlucyA9IGtleXBhaXIuYmxvY2tjaGFpbnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVLZXlQYWlyKF94Nikge1xuICAgICAgICByZXR1cm4gX3VwZGF0ZUtleVBhaXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwZGF0ZUtleVBhaXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlS2V5UGFpclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3JlbW92ZUtleVBhaXIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTYoa2V5cGFpcikge1xuICAgICAgICB2YXIgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ2LnByZXYgPSBfY29udGV4dDYubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnJlbW92ZUtleVBhaXIoa2V5cGFpcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTYpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVLZXlQYWlyKF94Nykge1xuICAgICAgICByZXR1cm4gX3JlbW92ZUtleVBhaXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbW92ZUtleVBhaXI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0S2V5UGFpckZyb21QdWJsaWNLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0S2V5UGFpckZyb21QdWJsaWNLZXkocHVibGljS2V5KSB7XG4gICAgICB2YXIgZGVjcnlwdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICAgIHZhciBrZXlwYWlyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5rZXlwYWlycy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoaykge1xuICAgICAgICAgIHJldHVybiBrLmtleSA9PT0gcHVibGljS2V5O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoa2V5cGFpcikgcmV0dXJuIGtleXBhaXIuY2xvbmUoKTtcblxuICAgICAgdmFyIGlkZW50aXR5ID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5pZGVudGl0aWVzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgucHVibGljS2V5ID09PSBwdWJsaWNLZXk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiBfS2V5cGFpcltcImRlZmF1bHRcIl0uZnJvbUpzb24oe1xuICAgICAgICAgIG5hbWU6IGlkZW50aXR5Lm5hbWUsXG4gICAgICAgICAgcHVibGljS2V5czogW3tcbiAgICAgICAgICAgIGJsb2NrY2hhaW46IF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5FT1NJTyxcbiAgICAgICAgICAgIGtleTogcHVibGljS2V5XG4gICAgICAgICAgfV0sXG4gICAgICAgICAgcHJpdmF0ZUtleTogaWRlbnRpdHkucHJpdmF0ZUtleVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInB1YmxpY1RvUHJpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3B1YmxpY1RvUHJpdmF0ZTMgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcocHVibGljS2V5KSB7XG4gICAgICAgIHZhciBwLCBrZXlwYWlyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDcucHJldiA9IF9jb250ZXh0Ny5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoIV9wdWJsaWNUb1ByaXZhdGUyKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wdWJsaWNUb1ByaXZhdGUyKHB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHAgPSBfY29udGV4dDcuc2VudDtcblxuICAgICAgICAgICAgICAgIGlmICghKHAgIT09IGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwgcCk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGtleXBhaXIgPSB0aGlzLmdldEtleVBhaXJGcm9tUHVibGljS2V5KHB1YmxpY0tleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ3LnQwID0ga2V5cGFpcjtcbiAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgIHJldHVybiBfU2VlZGVyW1wiZGVmYXVsdFwiXS5nZXRTZWVkKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDcudDEgPSBfY29udGV4dDcuc2VudDtcblxuICAgICAgICAgICAgICAgIF9jb250ZXh0Ny50MC5kZWNyeXB0LmNhbGwoX2NvbnRleHQ3LnQwLCBfY29udGV4dDcudDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFrZXlwYWlyKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDcubmV4dCA9IDE0O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwga2V5cGFpci5wcml2YXRlS2V5KTtcblxuICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIG51bGwpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU3LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gcHVibGljVG9Qcml2YXRlKF94OCkge1xuICAgICAgICByZXR1cm4gX3B1YmxpY1RvUHJpdmF0ZTMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHB1YmxpY1RvUHJpdmF0ZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJnZXRIYXJkd2FyZUtleUxpc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZXRIYXJkd2FyZUtleUxpc3QgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTkoZXh0ZXJuYWwpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGRlbHRhLFxuICAgICAgICAgICAgdHJpZXMsXG4gICAgICAgICAgICBfYXJnczkgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTkkKF9jb250ZXh0OSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0OS5wcmV2ID0gX2NvbnRleHQ5Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRlbHRhID0gX2FyZ3M5Lmxlbmd0aCA+IDEgJiYgX2FyZ3M5WzFdICE9PSB1bmRlZmluZWQgPyBfYXJnczlbMV0gOiAwO1xuICAgICAgICAgICAgICAgIHRyaWVzID0gX2FyZ3M5Lmxlbmd0aCA+IDIgJiYgX2FyZ3M5WzJdICE9PSB1bmRlZmluZWQgPyBfYXJnczlbMl0gOiAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGV4dGVybmFsW1wiaW50ZXJmYWNlXCJdLmdldEFkZHJlc3MgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICghKHRyaWVzID49IDUpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDkubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuYWJydXB0KFwicmV0dXJuXCIsIGV4dGVybmFsW1wiaW50ZXJmYWNlXCJdLmdldEFkZHJlc3MoZGVsdGEpW1wiY2F0Y2hcIl0oXG4gICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU4KGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU4JChfY29udGV4dDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDgucHJldiA9IF9jb250ZXh0OC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShlcnIudG9TdHJpbmcoKS5tYXRjaCgnQ0xBX05PVF9TVVBQT1JURUQnKSB8fCBlcnIudG9TdHJpbmcoKS5tYXRjaCgnQ2Fubm90IHdyaXRlIHRvIEhJRCBkZXZpY2UnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0OC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0hhcmR3YXJlU2VydmljZVtcImRlZmF1bHRcIl0ub3BlbkNvbm5lY3Rpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguYWJydXB0KFwicmV0dXJuXCIsIF90aGlzMi5nZXRIYXJkd2FyZUtleUxpc3QoZXh0ZXJuYWwsIGRlbHRhLCB0cmllcysrKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguYWJydXB0KFwicmV0dXJuXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU4KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTkpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZXRIYXJkd2FyZUtleUxpc3QoX3g5KSB7XG4gICAgICAgIHJldHVybiBfZ2V0SGFyZHdhcmVLZXlMaXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRIYXJkd2FyZUtleUxpc3Q7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwibG9hZEZyb21IYXJkd2FyZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2xvYWRGcm9tSGFyZHdhcmUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTExKGtleXBhaXIpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRyaWVzLFxuICAgICAgICAgICAgX2FyZ3MxMSA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMTEkKF9jb250ZXh0MTEpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDExLnByZXYgPSBfY29udGV4dDExLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRyaWVzID0gX2FyZ3MxMS5sZW5ndGggPiAxICYmIF9hcmdzMTFbMV0gIT09IHVuZGVmaW5lZCA/IF9hcmdzMTFbMV0gOiAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGtleXBhaXIuZXh0ZXJuYWxbXCJpbnRlcmZhY2VcIl0uZ2V0UHVibGljS2V5ICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMS5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDExLmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGlmICghKHRyaWVzID49IDUpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dDExLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIGtleXBhaXIuZXh0ZXJuYWxbXCJpbnRlcmZhY2VcIl0uZ2V0UHVibGljS2V5KCkudGhlbihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihrZXlwYWlyLmV4dGVybmFsLmJsb2NrY2hhaW4pLnZhbGlkUHVibGljS2V5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGFpci5leHRlcm5hbC5wdWJsaWNLZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhaXIucHVibGljS2V5cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICBibG9ja2NoYWluOiBrZXlwYWlyLmV4dGVybmFsLmJsb2NrY2hhaW4sXG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEwKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMCQoX2NvbnRleHQxMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTAucHJldiA9IF9jb250ZXh0MTAubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIudG9TdHJpbmcoKS5tYXRjaCgnQ2Fubm90IHdyaXRlIHRvIEhJRCBkZXZpY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQxMC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0MTAubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9IYXJkd2FyZVNlcnZpY2VbXCJkZWZhdWx0XCJdLm9wZW5Db25uZWN0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMC5hYnJ1cHQoXCJyZXR1cm5cIiwgX3RoaXMzLmxvYWRGcm9tSGFyZHdhcmUoa2V5cGFpciwgdHJpZXMrKykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMC5hYnJ1cHQoXCJyZXR1cm5cIiwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEwLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUxMCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gxMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTExKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gbG9hZEZyb21IYXJkd2FyZShfeDExKSB7XG4gICAgICAgIHJldHVybiBfbG9hZEZyb21IYXJkd2FyZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbG9hZEZyb21IYXJkd2FyZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJpc0hhcmR3YXJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzSGFyZHdhcmUocHVibGljS2V5KSB7XG4gICAgICB2YXIga2V5cGFpciA9IHRoaXMuZ2V0S2V5UGFpckZyb21QdWJsaWNLZXkocHVibGljS2V5KTtcbiAgICAgIGlmICgha2V5cGFpcikgdGhyb3cgbmV3IEVycm9yKCdLZXlwYWlyIGRvZXNudCBleGlzdCBvbiBrZXljaGFpbicpO1xuICAgICAgcmV0dXJuIGtleXBhaXIuZXh0ZXJuYWwgIT09IG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBLZXlQYWlyU2VydmljZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBLZXlQYWlyU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uL3N0b3JlL2NvbnN0YW50c1wiKSk7XG5cbnZhciBfYmlnbnVtYmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYmlnbnVtYmVyLmpzXCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9Ub2tlblwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX0JhbGFuY2VTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYmxvY2tjaGFpbi9CYWxhbmNlU2VydmljZVwiKSk7XG5cbnZhciBmaWx0ZXJPdXRUb2tlbiA9IGZ1bmN0aW9uIGZpbHRlck91dFRva2VuKHNjYXR0ZXIsIHRva2VuKSB7XG4gIHNjYXR0ZXIuc2V0dGluZ3MudG9rZW5zID0gc2NhdHRlci5zZXR0aW5ncy50b2tlbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHgudW5pcXVlKCkgIT09IHRva2VuLnVuaXF1ZSgpO1xuICB9KTtcbiAgc2NhdHRlci5zZXR0aW5ncy5ibGFja2xpc3RUb2tlbnMgPSBzY2F0dGVyLnNldHRpbmdzLmJsYWNrbGlzdFRva2Vucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geC51bmlxdWUoKSAhPT0gdG9rZW4udW5pcXVlKCk7XG4gIH0pO1xuICBpZiAoc2NhdHRlci5zZXR0aW5ncy5kaXNwbGF5VG9rZW4gPT09IHRva2VuLnVuaXF1ZSgpKSBzY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlUb2tlbiA9IG51bGw7XG59O1xuXG52YXIgVG9rZW5TZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVG9rZW5TZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgVG9rZW5TZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoVG9rZW5TZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJhZGRUb2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FkZFRva2VuID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUodG9rZW4pIHtcbiAgICAgICAgdmFyIGJsYWNrbGlzdCxcbiAgICAgICAgICAgIHNjYXR0ZXIsXG4gICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBibGFja2xpc3QgPSBfYXJncy5sZW5ndGggPiAxICYmIF9hcmdzWzFdICE9PSB1bmRlZmluZWQgPyBfYXJnc1sxXSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7IC8vIE5ldmVyIGFkZGluZyBzeXN0ZW0gdG9rZW5zLlxuXG4gICAgICAgICAgICAgICAgaWYgKCFfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLm5ldHdvcmtUb2tlbnMoKS5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gdG9rZW4udW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnN5bWJvbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogXCJTeW1ib2wgTWlzc2luZ1wiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi5jb250cmFjdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA4O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogXCJDb250cmFjdCBtaXNzaW5nXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgaWYgKCEoIWJsYWNrbGlzdCAmJiBzY2F0dGVyLnNldHRpbmdzLnRva2Vucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gdG9rZW4udW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlRva2VuIGV4aXN0cyBhbHJlYWR5ICh3aGl0ZWxpc3QpXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIGlmICghKGJsYWNrbGlzdCAmJiBzY2F0dGVyLnNldHRpbmdzLmJsYWNrbGlzdFRva2Vucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gdG9rZW4udW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlRva2VuIGV4aXN0cyBhbHJlYWR5IChibGFja2xpc3QpXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIGlmICghdG9rZW4ubmFtZS50cmltKCkubGVuZ3RoKSB0b2tlbi5uYW1lID0gdG9rZW4uc3ltYm9sO1xuICAgICAgICAgICAgICAgIGZpbHRlck91dFRva2VuKHNjYXR0ZXIsIHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrbGlzdCkgc2NhdHRlci5zZXR0aW5ncy50b2tlbnMudW5zaGlmdCh0b2tlbik7ZWxzZSBzY2F0dGVyLnNldHRpbmdzLmJsYWNrbGlzdFRva2Vucy51bnNoaWZ0KHRva2VuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBhZGRUb2tlbihfeCkge1xuICAgICAgICByZXR1cm4gX2FkZFRva2VuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRUb2tlbjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVUb2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVUb2tlbih0b2tlbikge1xuICAgICAgdmFyIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7IC8vIE5ldmVyIHJlbW92aW5nIHN5c3RlbSB0b2tlbnMuXG5cblxuICAgICAgaWYgKF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIubmV0d29ya1Rva2VucygpLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudW5pcXVlKCkgPT09IHRva2VuLnVuaXF1ZSgpO1xuICAgICAgfSkpIHJldHVybiB0cnVlO1xuICAgICAgZmlsdGVyT3V0VG9rZW4oc2NhdHRlciwgdG9rZW4pO1xuXG4gICAgICBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBzY2F0dGVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzVG9rZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzVG9rZW4odG9rZW4pIHtcbiAgICAgIHZhciBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuXG4gICAgICByZXR1cm4gISFfQmFsYW5jZVNlcnZpY2VbXCJkZWZhdWx0XCJdLnRvdGFsQmFsYW5jZXModHJ1ZSkudG90YWxzW3Rva2VuLnVuaXF1ZSgpXSB8fCAhIXNjYXR0ZXIuc2V0dGluZ3MudG9rZW5zLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudW5pcXVlKCkgPT09IHRva2VuLnVuaXF1ZSgpO1xuICAgICAgfSkgfHwgISFzY2F0dGVyLnNldHRpbmdzLmJsYWNrbGlzdFRva2Vucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSB0b2tlbi51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXREaXNwbGF5Q3VycmVuY3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zZXREaXNwbGF5Q3VycmVuY3kgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIodGlja2VyKSB7XG4gICAgICAgIHZhciBzY2F0dGVyO1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzY2F0dGVyID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYXR0ZXIuc2V0dGluZ3MuZGlzcGxheUN1cnJlbmN5ID0gdGlja2VyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIHNjYXR0ZXIpKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2V0RGlzcGxheUN1cnJlbmN5KF94Mikge1xuICAgICAgICByZXR1cm4gX3NldERpc3BsYXlDdXJyZW5jeS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0RGlzcGxheUN1cnJlbmN5O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInNldERpc3BsYXlUb2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NldERpc3BsYXlUb2tlbiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMyh0b2tlbikge1xuICAgICAgICB2YXIgc2NhdHRlcjtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlUb2tlbiA9IHRva2VuIGluc3RhbmNlb2YgX1Rva2VuW1wiZGVmYXVsdFwiXSA/IHRva2VuLnVuaXF1ZVdpdGhDaGFpbigpIDogdG9rZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcikpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTMpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzZXREaXNwbGF5VG9rZW4oX3gzKSB7XG4gICAgICAgIHJldHVybiBfc2V0RGlzcGxheVRva2VuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXREaXNwbGF5VG9rZW47XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0QW1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQsIHRva2VuKSB7XG4gICAgICB2YXIgZGl2ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICAgIHZhciBvcGVyYXRvciA9IGRpdiA/ICdkaXYnIDogJ3RpbWVzJztcbiAgICAgIHZhciBkZWNpbWFsU3RyaW5nID0gJyc7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4uZGVjaW1hbHM7IGkrKykge1xuICAgICAgICBkZWNpbWFsU3RyaW5nICs9ICcwJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBfYmlnbnVtYmVyW1wiZGVmYXVsdFwiXShhbW91bnQudG9TdHJpbmcoMTApLCAxMClbb3BlcmF0b3JdKFwiMVwiLmNvbmNhdChkZWNpbWFsU3RyaW5nKSkudG9TdHJpbmcoMTApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9rZW5TZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFRva2VuU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIG5vZGVDcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ2NyeXB0bycpIDogbnVsbDtcblxudmFyIGdldFJhbmRvbU51bWJlciA9IGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlcigpIHtcbiAgdmFyIG5vZGVKc0VudiA9IGZ1bmN0aW9uIG5vZGVKc0VudigpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQobm9kZUNyeXB0by5yYW5kb21CeXRlcyg4KS50b1N0cmluZygnaGV4JyksIDE2KSAvIDB4ZmZmZmZmZmZmZmZmZmZmZjtcbiAgfTtcblxuICB2YXIgYnJvd3NlckVudiA9IGZ1bmN0aW9uIGJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50MzJBcnJheSgxKTtcbiAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnIpO1xuICAgIHJldHVybiBhcnJbMF0gLyAoMHhmZmZmZmZmZiArIDEpO1xuICB9O1xuXG4gIHJldHVybiBub2RlQ3J5cHRvID8gbm9kZUpzRW52KCkgOiBicm93c2VyRW52KCk7XG59O1xuXG52YXIgSWRHZW5lcmF0b3IgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJZEdlbmVyYXRvcigpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIElkR2VuZXJhdG9yKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoSWRHZW5lcmF0b3IsIG51bGwsIFt7XG4gICAga2V5OiBcInJhbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmFuZCgpIHtcbiAgICAgIHJldHVybiBnZXRSYW5kb21OdW1iZXIoKTtcbiAgICB9XG4gICAgLyoqKlxyXG4gICAgICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZyBvZiBzcGVjaWZpZWQgc2l6ZVxyXG4gICAgICogQHBhcmFtIHNpemUgLSBUaGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgdG8gZ2VuZXJhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGdlbmVyYXRlZCByYW5kb20gc3RyaW5nXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInRleHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGV4dChzaXplKSB7XG4gICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICB2YXIgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoSWRHZW5lcmF0b3IucmFuZCgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICAvKioqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9mIHNwZWNpZmllZCBzaXplXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIFRoZSBsZW5ndGggb2YgdGhlIG51bWJlciB0byBnZW5lcmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgZ2VuZXJhdGVkIHJhbmRvbSBudW1iZXIgKCBhcyBhIHN0cmluZyApXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm51bWVyaWNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbnVtZXJpYyhzaXplKSB7XG4gICAgICB2YXIgYWRkID0gMTtcbiAgICAgIHZhciBtYXggPSAxMiAtIGFkZDtcbiAgICAgIGlmIChzaXplID4gbWF4KSByZXR1cm4gSWRHZW5lcmF0b3IubnVtZXJpYyhtYXgpICsgSWRHZW5lcmF0b3IubnVtZXJpYyhzaXplIC0gbWF4KTtcbiAgICAgIG1heCA9IE1hdGgucG93KDEwLCBzaXplICsgYWRkKTtcbiAgICAgIHZhciBtaW4gPSBtYXggLyAxMCxcbiAgICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKElkR2VuZXJhdG9yLnJhbmQoKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgICByZXR1cm4gKFwiXCIgKyBudW1iZXIpLnN1YnN0cmluZyhhZGQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSWRHZW5lcmF0b3I7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSWRHZW5lcmF0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfQ29udGFjdFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0NvbnRhY3RTZXJ2aWNlXCIpKTtcblxudmFyIF9GcmFtZXdvcmsgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0ZyYW1ld29ya1wiKSk7XG5cbnZhciBfU2luZ2xldG9uU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vU2luZ2xldG9uU2VydmljZVwiKSk7XG5cbnZhciBfU29ja2V0U2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vU29ja2V0U2VydmljZVwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX1Rva2VuU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVG9rZW5TZXJ2aWNlXCIpKTtcblxudmFyIF9FdmVudFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50U2VydmljZVwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgQ29udGFjdFNlcnZpY2U6IF9Db250YWN0U2VydmljZVtcImRlZmF1bHRcIl0sXG4gIEZyYW1ld29yazogX0ZyYW1ld29ya1tcImRlZmF1bHRcIl0sXG4gIFNpbmdsZXRvblNlcnZpY2U6IF9TaW5nbGV0b25TZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgU29ja2V0U2VydmljZTogX1NvY2tldFNlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBTdG9yZVNlcnZpY2U6IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBUb2tlblNlcnZpY2U6IF9Ub2tlblNlcnZpY2VbXCJkZWZhdWx0XCJdLFxuICBFdmVudFNlcnZpY2U6IF9FdmVudFNlcnZpY2VbXCJkZWZhdWx0XCJdXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc2V0UG9wdXBzQXNDb25zb2xlID0gZXhwb3J0cy5TSE9XX1BPUFVQU19BU19DT05TT0xFID0gZXhwb3J0cy5SVU5OSU5HX1RFU1RTID0gdm9pZCAwO1xudmFyIFJVTk5JTkdfVEVTVFMgPSBwcm9jZXNzLmVudlsnTk9ERV9FTlYnXSA9PT0gJ3Rlc3RpbmcnO1xuZXhwb3J0cy5SVU5OSU5HX1RFU1RTID0gUlVOTklOR19URVNUUztcbnZhciBTSE9XX1BPUFVQU19BU19DT05TT0xFID0gZmFsc2U7XG5leHBvcnRzLlNIT1dfUE9QVVBTX0FTX0NPTlNPTEUgPSBTSE9XX1BPUFVQU19BU19DT05TT0xFO1xuXG52YXIgc2V0UG9wdXBzQXNDb25zb2xlID0gZnVuY3Rpb24gc2V0UG9wdXBzQXNDb25zb2xlKGJvb2wpIHtcbiAgcmV0dXJuIGV4cG9ydHMuU0hPV19QT1BVUFNfQVNfQ09OU09MRSA9IFNIT1dfUE9QVVBTX0FTX0NPTlNPTEUgPSBib29sO1xufTtcblxuZXhwb3J0cy5zZXRQb3B1cHNBc0NvbnNvbGUgPSBzZXRQb3B1cHNBc0NvbnNvbGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxuLyoqKlxyXG4gKiBBIHNldCBvZiBoZWxwZXJzIGZvciBPYmplY3RzL0FycmF5c1xyXG4gKi9cbnZhciBPYmplY3RIZWxwZXJzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gT2JqZWN0SGVscGVycygpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIE9iamVjdEhlbHBlcnMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShPYmplY3RIZWxwZXJzLCBudWxsLCBbe1xuICAgIGtleTogXCJkaXN0aW5jdFwiLFxuXG4gICAgLyoqKlxyXG4gICAgICogTWFrZXMgYSBzaW5nbGUgbGV2ZWwgYXJyYXkgZGlzdGluY3RcclxuICAgICAqIEBwYXJhbSBhcnJheVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzdGluY3QoYXJyYXkpIHtcbiAgICAgIHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuaW5jbHVkZXMoYikgPyBhIDogYS5jb25jYXQoYik7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICAgIC8qKipcclxuICAgICAqIEZsYXR0ZW5zIGFuIGFycmF5IGludG8gYSBzaW5nbGUgZGltZW5zaW9uXHJcbiAgICAgKiBAcGFyYW0gYXJyYXlcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJmbGF0dGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHJldHVybiBhcnJheTtcbiAgICAgIHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBfdGhpcy5mbGF0dGVuKGIpIDogYik7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICAgIC8qKipcclxuICAgICAqIEZsYXR0ZW5zIGFuIGFycmF5IGludG8gYSBzaW5nbGUgZGltZW5zaW9uXHJcbiAgICAgKiBAcGFyYW0gdmFsXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZmxhdHRlbk9iamVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KHZhbCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICgoMCwgX3R5cGVvZjJbXCJkZWZhdWx0XCJdKSh2YWwpICE9PSAnb2JqZWN0JykgcmV0dXJuIHRoaXMuZmxhdHRlbih2YWwpO1xuICAgICAgcmV0dXJuIHRoaXMuZmxhdHRlbihPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZmxhdHRlbk9iamVjdCh2YWxba2V5XSk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNodWZmbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2h1ZmZsZShhKSB7XG4gICAgICBmb3IgKHZhciBpID0gYS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHZhciBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIHZhciBfcmVmID0gW2Fbal0sIGFbaV1dO1xuICAgICAgICBhW2ldID0gX3JlZlswXTtcbiAgICAgICAgYVtqXSA9IF9yZWZbMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvYmplY3RUYWtlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9iamVjdFRha2Uob2JqLCBsaW1pdCkge1xuICAgICAgdmFyIGxpbWl0ZWQgPSB7fTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA8IGxpbWl0KSByZXR1cm4gb2JqO1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGltaXRlZCkubGVuZ3RoID49IGxpbWl0KSByZXR1cm47XG4gICAgICAgIGxpbWl0ZWRba2V5XSA9IG9ialtrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGltaXRlZDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE9iamVjdEhlbHBlcnM7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gT2JqZWN0SGVscGVyczsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9IYXJkd2FyZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0hhcmR3YXJlU2VydmljZVwiKSk7XG5cbnZhciBfS2V5UGFpclNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0tleVBhaXJTZXJ2aWNlXCIpKTtcblxudmFyIF9RUlNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1FSU2VydmljZVwiKSk7XG5cbnZhciBfU2VlZGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TZWVkZXJcIikpO1xuXG52YXIgX1NpZ25pbmdTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TaWduaW5nU2VydmljZVwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgSGFyZHdhcmVTZXJ2aWNlOiBfSGFyZHdhcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXSxcbiAgS2V5UGFpclNlcnZpY2U6IF9LZXlQYWlyU2VydmljZVtcImRlZmF1bHRcIl0sXG4gIFFSU2VydmljZTogX1FSU2VydmljZVtcImRlZmF1bHRcIl0sXG4gIFNlZWRlcjogX1NlZWRlcltcImRlZmF1bHRcIl0sXG4gIFNpZ25pbmdTZXJ2aWNlOiBfU2lnbmluZ1NlcnZpY2VbXCJkZWZhdWx0XCJdXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIGV2ZW50TGlzdGVuZXI7XG5cbnZhciBFdmVudFNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudFNlcnZpY2UoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBFdmVudFNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShFdmVudFNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChfc2VydmljZSkge1xuICAgICAgZXZlbnRMaXN0ZW5lciA9IF9zZXJ2aWNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbWl0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXIodHlwZSwgZGF0YSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudFNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRXZlbnRTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX0NyeXB0byA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQ3J5cHRvXCIpKTtcblxudmFyIERhdGVIZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vRGF0ZUhlbHBlcnNcIikpO1xuXG52YXIgX0hhc2hlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vSGFzaGVyXCIpKTtcblxudmFyIEh0dHAgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9IdHRwXCIpKTtcblxudmFyIF9JZEdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vSWRHZW5lcmF0b3JcIikpO1xuXG52YXIgX01uZW1vbmljID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9NbmVtb25pY1wiKSk7XG5cbnZhciBfT2JqZWN0SGVscGVycyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vT2JqZWN0SGVscGVyc1wiKSk7XG5cbnZhciBUZXN0aW5nSGVscGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vVGVzdGluZ0hlbHBlclwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgQ3J5cHRvOiBfQ3J5cHRvW1wiZGVmYXVsdFwiXSxcbiAgRGF0ZUhlbHBlcnM6IERhdGVIZWxwZXJzLFxuICBIYXNoZXI6IF9IYXNoZXJbXCJkZWZhdWx0XCJdLFxuICBIdHRwOiBIdHRwLFxuICBJZEdlbmVyYXRvcjogX0lkR2VuZXJhdG9yW1wiZGVmYXVsdFwiXSxcbiAgTW5lbW9uaWM6IF9NbmVtb25pY1tcImRlZmF1bHRcIl0sXG4gIE9iamVjdEhlbHBlcnM6IF9PYmplY3RIZWxwZXJzW1wiZGVmYXVsdFwiXSxcbiAgVGVzdGluZ0hlbHBlcjogVGVzdGluZ0hlbHBlclxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi9zdG9yZS9jb25zdGFudHNcIikpO1xuXG52YXIgX0FjY291bnRTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYmxvY2tjaGFpbi9BY2NvdW50U2VydmljZVwiKSk7XG5cbnZhciBfUHJpY2VTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYXBpcy9QcmljZVNlcnZpY2VcIikpO1xuXG52YXIgX1Blcm1pc3Npb25TZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYXBwcy9QZXJtaXNzaW9uU2VydmljZVwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX1NvY2tldFNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1NvY2tldFNlcnZpY2VcIikpO1xuXG52YXIgX0FwcHNTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYXBwcy9BcHBzU2VydmljZVwiKSk7XG5cbnZhciBfUGx1Z2luUmVwb3NpdG9yeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3BsdWdpbnMvUGx1Z2luUmVwb3NpdG9yeVwiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi4vLi4vbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxudmFyIFNpbmdsZXRvblNlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTaW5nbGV0b25TZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgU2luZ2xldG9uU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFNpbmdsZXRvblNlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9pbml0ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCFpbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKF9CbG9ja2NoYWlucy5CbG9ja2NoYWlucy5UUlgpLmluaXQoKTtcblxuICAgICAgICAgICAgICAgIF9Tb2NrZXRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgICAgICAgICBfQXBwc1NlcnZpY2VbXCJkZWZhdWx0XCJdLmdldEFwcHMoKTtcblxuICAgICAgICAgICAgICAgIF9QcmljZVNlcnZpY2VbXCJkZWZhdWx0XCJdLndhdGNoUHJpY2VzKCk7XG5cbiAgICAgICAgICAgICAgICBfUGVybWlzc2lvblNlcnZpY2VbXCJkZWZhdWx0XCJdLnJlbW92ZURhbmdsaW5nUGVybWlzc2lvbnMoKTtcblxuICAgICAgICAgICAgICAgIF9BY2NvdW50U2VydmljZVtcImRlZmF1bHRcIl0uZml4T3JwaGFuZWRBY2NvdW50cygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICByZXR1cm4gX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluaXQ7XG4gICAgfSgpXG4gIH1dKTtcbiAgcmV0dXJuIFNpbmdsZXRvblNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2luZ2xldG9uU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGV4cG9ydHMuZ2V0Q2VydHMgPSBleHBvcnRzLmhhbmRsZVBhaXJlZFJlc3BvbnNlID0gZXhwb3J0cy5oYW5kbGVBcGlSZXNwb25zZSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfQXBpU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FwaXMvQXBpU2VydmljZVwiKSk7XG5cbnZhciBfQXV0aG9yaXplZEFwcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL21vZGVscy9BdXRob3JpemVkQXBwXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBfRXZlbnRTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FdmVudFNlcnZpY2VcIikpO1xuXG52YXIgc2VydmljZTtcblxudmFyIGVtaXQgPSBmdW5jdGlvbiBlbWl0KG9yaWdpbiwgaWQsIHBhdGgsIGRhdGEpIHtcbiAgcmV0dXJuIHNlcnZpY2UuZW1pdChvcmlnaW4sIGlkLCBwYXRoLCBkYXRhKTtcbn07XG5cbnZhciBnZXROZXdLZXkgPSBmdW5jdGlvbiBnZXROZXdLZXkob3JpZ2luLCBpZCkge1xuICByZXR1cm4gc2VydmljZS5nZXROZXdLZXkob3JpZ2luLCBpZCk7XG59O1xuXG52YXIgaGFuZGxlQXBpUmVzcG9uc2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICB2YXIgX3JlZiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgLyojX19QVVJFX18qL1xuICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMocmVxdWVzdCwgaWQpIHtcbiAgICB2YXIgZXhpc3RpbmdBcHAsIHVwZGF0ZU5vbmNlLCByZW1vdmVBcHBQZXJtaXNzaW9ucztcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIDIgd2F5IGF1dGhlbnRpY2F0aW9uXG4gICAgICAgICAgICBleGlzdGluZ0FwcCA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uZmluZEFwcChyZXF1ZXN0LmRhdGEucGF5bG9hZC5vcmlnaW4pO1xuXG4gICAgICAgICAgICB1cGRhdGVOb25jZSA9XG4gICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdBcHAubmV4dE5vbmNlID0gcmVxdWVzdC5kYXRhLm5leHROb25jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lLmtleWNoYWluLnVwZGF0ZU9yUHVzaEFwcChleGlzdGluZ0FwcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLmRpc3BhdGNoKEFjdGlvbnMuU0VUX1NDQVRURVIsIGNsb25lKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZU5vbmNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICByZW1vdmVBcHBQZXJtaXNzaW9ucyA9XG4gICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmMyA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsb25lO1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZS5rZXljaGFpbi5yZW1vdmVBcHAoZXhpc3RpbmdBcHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgY2xvbmUpKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiByZW1vdmVBcHBQZXJtaXNzaW9ucygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKTtcblxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXBwKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXBwLmNoZWNrS2V5KHJlcXVlc3QuZGF0YS5hcHBrZXkpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gNztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIpO1xuXG4gICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgaWYgKCEoZXhpc3RpbmdBcHAubmV4dE5vbmNlLmxlbmd0aCAmJiAhZXhpc3RpbmdBcHAuY2hlY2tOb25jZShyZXF1ZXN0LmRhdGEubm9uY2UpKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAxMDtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVBcHBQZXJtaXNzaW9ucygpO1xuXG4gICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMTQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDE0O1xuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5vbmNlKCk7XG5cbiAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgX0FwaVNlcnZpY2VbXCJkZWZhdWx0XCJdLmhhbmRsZXIoT2JqZWN0LmFzc2lnbihyZXF1ZXN0LmRhdGEsIHtcbiAgICAgICAgICAgICAgcGx1Z2luOiByZXF1ZXN0LnBsdWdpblxuICAgICAgICAgICAgfSkpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICBlbWl0KGV4aXN0aW5nQXBwLm9yaWdpbiwgaWQsICdhcGknLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZTMpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUFwaVJlc3BvbnNlKF94LCBfeDIpIHtcbiAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmhhbmRsZUFwaVJlc3BvbnNlID0gaGFuZGxlQXBpUmVzcG9uc2U7XG5cbnZhciBoYW5kbGVQYWlyZWRSZXNwb25zZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmNCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgLyojX19QVVJFX18qL1xuICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTcocmVxdWVzdCwgaWQpIHtcbiAgICB2YXIgc2NhdHRlciwgZXhpc3RpbmdBcHAsIGxpbmtBcHAsIGFkZEF1dGhvcml6ZWRBcHAsIHJlcGFpcjtcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU3JChfY29udGV4dDcpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQ3LnByZXYgPSBfY29udGV4dDcubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyO1xuICAgICAgICAgICAgZXhpc3RpbmdBcHAgPSBzY2F0dGVyLmtleWNoYWluLmZpbmRBcHAocmVxdWVzdC5kYXRhLm9yaWdpbik7XG4gICAgICAgICAgICBsaW5rQXBwID0ge1xuICAgICAgICAgICAgICB0eXBlOiAnbGlua0FwcCcsXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHJlcXVlc3QuZGF0YVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LmRhdGEucGFzc3Rocm91Z2gpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5hYnJ1cHQoXCJyZXR1cm5cIiwgZW1pdChyZXF1ZXN0LmRhdGEub3JpZ2luLCBpZCwgJ3BhaXJlZCcsIGV4aXN0aW5nQXBwICYmIGV4aXN0aW5nQXBwLmNoZWNrS2V5KHJlcXVlc3QuZGF0YS5hcHBrZXkpKSk7XG5cbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBhZGRBdXRob3JpemVkQXBwID1cbiAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY1ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3S2V5LFxuICAgICAgICAgICAgICAgICAgICBhdXRoZWRBcHAsXG4gICAgICAgICAgICAgICAgICAgIGNsb25lLFxuICAgICAgICAgICAgICAgICAgICBfYXJnczQgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NC5wcmV2ID0gX2NvbnRleHQ0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBfYXJnczQubGVuZ3RoID4gMCAmJiBfYXJnczRbMF0gIT09IHVuZGVmaW5lZCA/IF9hcmdzNFswXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRoZWRBcHAgPSBuZXcgX0F1dGhvcml6ZWRBcHBbXCJkZWZhdWx0XCJdKHJlcXVlc3QuZGF0YS5vcmlnaW4sIG5ld0tleSA/IG5ld0tleSA6IHJlcXVlc3QuZGF0YS5hcHBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzY2F0dGVyLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZS5rZXljaGFpbi51cGRhdGVPclB1c2hBcHAoYXV0aGVkQXBwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLlNFVF9TQ0FUVEVSLCBjbG9uZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0KHJlcXVlc3QuZGF0YS5vcmlnaW4sIGlkLCAncGFpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBfY2FsbGVlNCk7XG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWRkQXV0aG9yaXplZEFwcCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKTtcblxuICAgICAgICAgICAgcmVwYWlyID1cbiAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY2ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3S2V5O1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTUkKF9jb250ZXh0NSkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDUucHJldiA9IF9jb250ZXh0NS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE5ld0tleShyZXF1ZXN0LmRhdGEub3JpZ2luLCBpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBfY29udGV4dDUuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEobmV3S2V5LmRhdGEub3JpZ2luICE9PSByZXF1ZXN0LmRhdGEub3JpZ2luIHx8IG5ld0tleS5kYXRhLmFwcGtleS5pbmRleE9mKCdhcHBrZXk6JykgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LmFicnVwdChcInJldHVyblwiLCBlbWl0KHJlcXVlc3QuZGF0YS5vcmlnaW4sIGlkLCAncGFpcmVkJywgZmFsc2UpKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIGFkZEF1dGhvcml6ZWRBcHAobmV3S2V5LmRhdGEuYXBwa2V5KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBfY2FsbGVlNSk7XG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gcmVwYWlyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nQXBwKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Ny5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nQXBwLmNoZWNrS2V5KHJlcXVlc3QuZGF0YS5hcHBrZXkpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Ny5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ3LmFicnVwdChcInJldHVyblwiLCBlbWl0KHJlcXVlc3QuZGF0YS5vcmlnaW4sIGlkLCAncGFpcmVkJywgdHJ1ZSkpO1xuXG4gICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgIF9FdmVudFNlcnZpY2VbXCJkZWZhdWx0XCJdLmVtaXQoJ3BvcG91dCcsIGxpbmtBcHApLnRoZW4oXG4gICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmOCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgLyojX19QVVJFX18qL1xuICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTYoX3JlZjcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTYkKF9jb250ZXh0Nikge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDYucHJldiA9IF9jb250ZXh0Ni5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZjcucmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDYubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LmFicnVwdChcInJldHVyblwiLCByZXBhaXIoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0KHJlcXVlc3QuZGF0YS5vcmlnaW4sIGlkLCAncGFpcmVkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDYuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgX2NhbGxlZTYpO1xuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgX2NvbnRleHQ3Lm5leHQgPSAxNjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDcuYWJydXB0KFwicmV0dXJuXCIsIHJlcGFpcigpKTtcblxuICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ny5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBfY2FsbGVlNyk7XG4gIH0pKTtcblxuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlUGFpcmVkUmVzcG9uc2UoX3gzLCBfeDQpIHtcbiAgICByZXR1cm4gX3JlZjQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0oKTtcbi8qKipcclxuICogR2V0cyBjZXJ0cyB0aGF0IGFsbG93IGZvciBgd3NzYCBsb2NhbCBjb25uZWN0aW9ucy5cclxuICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2UgfCBuZXZlciB8IHZvaWQ+fVxyXG4gKi9cblxuXG5leHBvcnRzLmhhbmRsZVBhaXJlZFJlc3BvbnNlID0gaGFuZGxlUGFpcmVkUmVzcG9uc2U7XG5cbnZhciBnZXRDZXJ0cyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmOSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgLyojX19QVVJFX18qL1xuICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTgoKSB7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlOCQoX2NvbnRleHQ4KSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0OC5wcmV2ID0gX2NvbnRleHQ4Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ4LmFicnVwdChcInJldHVyblwiLCBmZXRjaCgnaHR0cHM6Ly9jZXJ0cy5nZXQtc2NhdHRlci5jb20/cmFuZD0nICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwICsgMSkpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmhhc093blByb3BlcnR5KCdrZXknKSAmJiByZXMuaGFzT3duUHJvcGVydHkoJ2NlcnQnKSkgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgICBfRXZlbnRTZXJ2aWNlW1wiZGVmYXVsdFwiXS5lbWl0KCdub19jZXJ0cycpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZmV0Y2ggY2VydHMuIFByb2JhYmx5IGR1ZSB0byBhIHByb3h5LCB2cG4sIG9yIGZpcmV3YWxsLicpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDguc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZTgpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGdldENlcnRzKCkge1xuICAgIHJldHVybiBfcmVmOS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmdldENlcnRzID0gZ2V0Q2VydHM7XG5cbnZhciBTb2NrZXRTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU29ja2V0U2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFNvY2tldFNlcnZpY2UpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShTb2NrZXRTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoX3NlcnZpY2UpIHtcbiAgICAgIHNlcnZpY2UgPSBfc2VydmljZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5pdGlhbGl6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2luaXRpYWxpemUgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTkoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTkkKF9jb250ZXh0OSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0OS5wcmV2ID0gX2NvbnRleHQ5Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDkuYWJydXB0KFwicmV0dXJuXCIsIHNlcnZpY2UuaW5pdGlhbGl6ZSgpKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ5LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU5KTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIF9pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbml0aWFsaXplO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY2xvc2UgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEwKCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMCQoX2NvbnRleHQxMCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTAucHJldiA9IF9jb250ZXh0MTAubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuYWJydXB0KFwicmV0dXJuXCIsIHNlcnZpY2UuY2xvc2UoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTEwKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiBfY2xvc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNsb3NlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInNlbmRFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NlbmRFdmVudCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMTEoZXZlbnQsIHBheWxvYWQsIG9yaWdpbikge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUxMSQoX2NvbnRleHQxMSkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0MTEucHJldiA9IF9jb250ZXh0MTEubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0MTEuYWJydXB0KFwicmV0dXJuXCIsIHNlcnZpY2Uuc2VuZEV2ZW50KGV2ZW50LCBwYXlsb2FkLCBvcmlnaW4pKTtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMTEpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzZW5kRXZlbnQoX3g2LCBfeDcsIF94OCkge1xuICAgICAgICByZXR1cm4gX3NlbmRFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VuZEV2ZW50O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImJyb2FkY2FzdEV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfYnJvYWRjYXN0RXZlbnQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTEyKGV2ZW50LCBwYXlsb2FkKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTEyJChfY29udGV4dDEyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQxMi5wcmV2ID0gX2NvbnRleHQxMi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQxMi5hYnJ1cHQoXCJyZXR1cm5cIiwgc2VydmljZS5icm9hZGNhc3RFdmVudChldmVudCwgcGF5bG9hZCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDEyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUxMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGJyb2FkY2FzdEV2ZW50KF94OSwgX3gxMCkge1xuICAgICAgICByZXR1cm4gX2Jyb2FkY2FzdEV2ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBicm9hZGNhc3RFdmVudDtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gU29ja2V0U2VydmljZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBTb2NrZXRTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBjb25zdGFudHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9jb25zdGFudHNcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIGNvbnN0YW50czogY29uc3RhbnRzXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBoYXJkd2FyZVNlcnZpY2U7XG52YXIgTk9fSU5JVCA9IFwiWW91IG11c3QgaW5pdGlhbGl6ZSB0aGUgaGFyZHdhcmUgc2VydmljZSBmaXJzdC5cIjtcblxudmFyIEhhcmR3YXJlU2VydmljZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEhhcmR3YXJlU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEhhcmR3YXJlU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEhhcmR3YXJlU2VydmljZSwgbnVsbCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KF9zZXJ2aWNlKSB7XG4gICAgICBoYXJkd2FyZVNlcnZpY2UgPSBfc2VydmljZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib3BlbkNvbm5lY3Rpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfb3BlbkNvbm5lY3Rpb25zID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgIHZhciBvbmx5SWZEaXNjb25uZWN0ZWQsXG4gICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBvbmx5SWZEaXNjb25uZWN0ZWQgPSBfYXJncy5sZW5ndGggPiAwICYmIF9hcmdzWzBdICE9PSB1bmRlZmluZWQgPyBfYXJnc1swXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhcmR3YXJlU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnNvbGUuZXJyb3IoTk9fSU5JVCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHRoaXMub3BlbkNvbm5lY3Rpb25zKG9ubHlJZkRpc2Nvbm5lY3RlZCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlLCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gb3BlbkNvbm5lY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gX29wZW5Db25uZWN0aW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3BlbkNvbm5lY3Rpb25zO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrSGFyZHdhcmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9jaGVja0hhcmR3YXJlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGFjY291bnQpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKGhhcmR3YXJlU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgY29uc29sZS5lcnJvcihOT19JTklUKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIGhhcmR3YXJlU2VydmljZS5jaGVja0hhcmR3YXJlKGFjY291bnQpKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gY2hlY2tIYXJkd2FyZShfeCkge1xuICAgICAgICByZXR1cm4gX2NoZWNrSGFyZHdhcmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoZWNrSGFyZHdhcmU7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwic2lnblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NpZ24gPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMobmV0d29yaywgcHVibGljS2V5LCBwYXlsb2FkKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMkKF9jb250ZXh0Mykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChoYXJkd2FyZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIGNvbnNvbGUuZXJyb3IoTk9fSU5JVCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBoYXJkd2FyZVNlcnZpY2Uuc2lnbihuZXR3b3JrLCBwdWJsaWNLZXksIHBheWxvYWQpKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gc2lnbihfeDIsIF94MywgX3g0KSB7XG4gICAgICAgIHJldHVybiBfc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2lnbjtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gSGFyZHdhcmVTZXJ2aWNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEhhcmR3YXJlU2VydmljZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfZW9zanNFY2MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJlb3Nqcy1lY2NcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgUHJpdmF0ZUtleSA9IF9lb3Nqc0VjY1tcImRlZmF1bHRcIl0uUHJpdmF0ZUtleTtcblxudmFyIENyeXB0byA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENyeXB0bygpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIENyeXB0byk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKENyeXB0bywgbnVsbCwgW3tcbiAgICBrZXk6IFwiZ2VuZXJhdGVQcml2YXRlS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2VuZXJhdGVQcml2YXRlS2V5ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkucmFuZG9tS2V5KCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgX2NvbnRleHQuc2VudC50b0J1ZmZlcigpKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlUHJpdmF0ZUtleSgpIHtcbiAgICAgICAgcmV0dXJuIF9nZW5lcmF0ZVByaXZhdGVLZXkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdlbmVyYXRlUHJpdmF0ZUtleTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJidWZmZXJUb1ByaXZhdGVLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVmZmVyVG9Qcml2YXRlS2V5KGJ1ZmZlciwgYmxvY2tjaGFpbikge1xuICAgICAgcmV0dXJuIF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYmxvY2tjaGFpbikuYnVmZmVyVG9IZXhQcml2YXRlKGJ1ZmZlcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVLZXlUb0J1ZmZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcml2YXRlS2V5VG9CdWZmZXIocHJpdmF0ZUtleSwgYmxvY2tjaGFpbikge1xuICAgICAgcmV0dXJuIF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4oYmxvY2tjaGFpbikuaGV4UHJpdmF0ZVRvQnVmZmVyKHByaXZhdGVLZXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJidWZmZXJUb0hhc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVmZmVyVG9IYXNoKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIF9lb3Nqc0VjY1tcImRlZmF1bHRcIl0uc2hhMjU2KGJ1ZmZlcik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDcnlwdG87XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ3J5cHRvOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucG9zdCA9IGV4cG9ydHMuZ2V0ID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxuLyoqKlxyXG4gKiBUSElTIEhUVFAgU0VSVklDRSBJUyBPTkxZIFVTRUQgRk9SIEhBUkRXQVJFIFdBTExFVCBDT05ORUNUSU9OU1xyXG4gKlxyXG4gKi9cbnZhciBnZXQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICB2YXIgX3JlZiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgLyojX19QVVJFX18qL1xuICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShyb3V0ZSkge1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIFByb21pc2UucmFjZShbZmV0Y2gocm91dGUpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgIH0sIDYwMDAwKTtcbiAgICAgICAgICAgIH0pXSkpO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBfY2FsbGVlKTtcbiAgfSkpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBnZXQoX3gpIHtcbiAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmdldCA9IGdldDtcblxudmFyIHBvc3QgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICB2YXIgX3JlZjIgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gIC8qI19fUFVSRV9fKi9cbiAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKHJvdXRlLCBkYXRhKSB7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBQcm9taXNlLnJhY2UoW2ZldGNoKHJvdXRlLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSksIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfSwgMTIwMDAwKTtcbiAgICAgICAgICAgIH0pXSkpO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZTIpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHBvc3QoX3gyLCBfeDMpIHtcbiAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0cy5wb3N0ID0gcG9zdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIEFjdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vc3RvcmUvY29uc3RhbnRzXCIpKTtcblxudmFyIHN0b3JlO1xuLyoqKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIHNlcnZpY2Ugd2hpY2ggcmV0dXJucyB0aGUgc3RvcmVcclxuICogYnV0IGFsbG93cyBmb3IgdGVzdGluZyBzdWl0ZXMgdG8gYmUgcnVuIHdpdGhvdXQgdnVleFxyXG4gKi9cblxudmFyIFN0b3JlU2VydmljZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0b3JlU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFN0b3JlU2VydmljZSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFN0b3JlU2VydmljZSwgbnVsbCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KF9zdG9yZSkge1xuICAgICAgc3RvcmUgPSBfc3RvcmU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gc3RvcmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdG9yZVNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU3RvcmVTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TRVRfUFJJQ0VfREFUQSA9IGV4cG9ydHMuTE9BRF9ISVNUT1JZID0gZXhwb3J0cy5ERUxUQV9ISVNUT1JZID0gZXhwb3J0cy5VUERBVEVfSElTVE9SWSA9IGV4cG9ydHMuU0VUX1BSSUNFUyA9IGV4cG9ydHMuUkVNT1ZFX0JBTEFOQ0VTID0gZXhwb3J0cy5TRVRfQkFMQU5DRVMgPSBleHBvcnRzLkhPTERfU0NBVFRFUiA9IGV4cG9ydHMuTE9BRF9TQ0FUVEVSID0gZXhwb3J0cy5TRVRfU0NBVFRFUiA9IGV4cG9ydHMuQUREX1JFU09VUkNFUyA9IGV4cG9ydHMuU0VUX1JFU09VUkNFUyA9IGV4cG9ydHMuU0VUX0RBUFBfTE9HTyA9IGV4cG9ydHMuU0VUX0RBUFBfREFUQSA9IHZvaWQgMDtcbnZhciBTRVRfREFQUF9EQVRBID0gJ3NldERhcHBEYXRhJztcbmV4cG9ydHMuU0VUX0RBUFBfREFUQSA9IFNFVF9EQVBQX0RBVEE7XG52YXIgU0VUX0RBUFBfTE9HTyA9ICdzZXREYXBwTG9nbyc7XG5leHBvcnRzLlNFVF9EQVBQX0xPR08gPSBTRVRfREFQUF9MT0dPO1xudmFyIFNFVF9SRVNPVVJDRVMgPSAnc2V0UmVzb3VyY2VzJztcbmV4cG9ydHMuU0VUX1JFU09VUkNFUyA9IFNFVF9SRVNPVVJDRVM7XG52YXIgQUREX1JFU09VUkNFUyA9ICdhZGRSZXNvdXJjZXMnO1xuZXhwb3J0cy5BRERfUkVTT1VSQ0VTID0gQUREX1JFU09VUkNFUztcbnZhciBTRVRfU0NBVFRFUiA9ICdzZXRTY2F0dGVyJztcbmV4cG9ydHMuU0VUX1NDQVRURVIgPSBTRVRfU0NBVFRFUjtcbnZhciBMT0FEX1NDQVRURVIgPSAnbG9hZFNjYXR0ZXInO1xuZXhwb3J0cy5MT0FEX1NDQVRURVIgPSBMT0FEX1NDQVRURVI7XG52YXIgSE9MRF9TQ0FUVEVSID0gJ2hvbGRTY2F0dGVyJztcbmV4cG9ydHMuSE9MRF9TQ0FUVEVSID0gSE9MRF9TQ0FUVEVSO1xudmFyIFNFVF9CQUxBTkNFUyA9ICdzZXRCYWxhbmNlcyc7XG5leHBvcnRzLlNFVF9CQUxBTkNFUyA9IFNFVF9CQUxBTkNFUztcbnZhciBSRU1PVkVfQkFMQU5DRVMgPSAncmVtb3ZlQmFsYW5jZXMnO1xuZXhwb3J0cy5SRU1PVkVfQkFMQU5DRVMgPSBSRU1PVkVfQkFMQU5DRVM7XG52YXIgU0VUX1BSSUNFUyA9ICdzZXRQcmljZXMnO1xuZXhwb3J0cy5TRVRfUFJJQ0VTID0gU0VUX1BSSUNFUztcbnZhciBVUERBVEVfSElTVE9SWSA9ICd1cGRhdGVIaXN0b3J5JztcbmV4cG9ydHMuVVBEQVRFX0hJU1RPUlkgPSBVUERBVEVfSElTVE9SWTtcbnZhciBERUxUQV9ISVNUT1JZID0gJ2RlbHRhSGlzdG9yeSc7XG5leHBvcnRzLkRFTFRBX0hJU1RPUlkgPSBERUxUQV9ISVNUT1JZO1xudmFyIExPQURfSElTVE9SWSA9ICdsb2FkSGlzdG9yeSc7XG5leHBvcnRzLkxPQURfSElTVE9SWSA9IExPQURfSElTVE9SWTtcbnZhciBTRVRfUFJJQ0VfREFUQSA9ICdzZXRQcmljZURhdGEnO1xuZXhwb3J0cy5TRVRfUFJJQ0VfREFUQSA9IFNFVF9QUklDRV9EQVRBOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX0tleVBhaXJTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9LZXlQYWlyU2VydmljZVwiKSk7XG5cbnZhciBfSGFyZHdhcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9IYXJkd2FyZVNlcnZpY2VcIikpO1xuXG52YXIgc2lnbmVyO1xuXG52YXIgU2lnbmluZ1NlcnZpY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTaWduaW5nU2VydmljZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFNpZ25pbmdTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoU2lnbmluZ1NlcnZpY2UsIG51bGwsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChfc2lnbmVyKSB7XG4gICAgICBzaWduZXIgPSBfc2lnbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaWduXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNpZ24obmV0d29yaywgcGF5bG9hZCwgcHVibGljS2V5KSB7XG4gICAgICB2YXIgYXJiaXRyYXJ5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcbiAgICAgIHZhciBpc0hhc2ggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IGZhbHNlO1xuXG4gICAgICAvLyBwYXlsb2FkLCBwdWJsaWNLZXksIGFyYml0cmFyeSA9IGZhbHNlLCBpc0hhc2ggPSBmYWxzZSwgYWNjb3VudCA9IG51bGxcbiAgICAgIGlmICghc2lnbmVyKSB7XG4gICAgICAgIGlmIChfS2V5UGFpclNlcnZpY2VbXCJkZWZhdWx0XCJdLmlzSGFyZHdhcmUocHVibGljS2V5KSkge1xuICAgICAgICAgIHJldHVybiBfSGFyZHdhcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5zaWduKG5ldHdvcmssIHB1YmxpY0tleSwgcGF5bG9hZCk7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihuZXR3b3JrLmJsb2NrY2hhaW4pLnNpZ25lcihwYXlsb2FkLCBwdWJsaWNLZXksIGFyYml0cmFyeSwgaXNIYXNoKTtcbiAgICAgIH0gZWxzZSByZXR1cm4gc2lnbmVyKG5ldHdvcmssIHB1YmxpY0tleSwgcGF5bG9hZCwgYXJiaXRyYXJ5LCBpc0hhc2gpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2lnbmluZ1NlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2lnbmluZ1NlcnZpY2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfc2xpY2VkVG9BcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIikpO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9xcmNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJxcmNvZGVcIikpO1xuXG52YXIgX2Flc09vcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImFlcy1vb3BcIikpO1xuXG52YXIgX01uZW1vbmljID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbC9NbmVtb25pY1wiKSk7XG5cbnZhciBfU2VlZGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TZWVkZXJcIikpO1xuXG52YXIgUVJTZXJ2aWNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUVJTZXJ2aWNlKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgUVJTZXJ2aWNlKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoUVJTZXJ2aWNlLCBudWxsLCBbe1xuICAgIGtleTogXCJjcmVhdGVRUlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVRUihkYXRhKSB7XG4gICAgICB2YXIgcGFzcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9yZWYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBvbGRTZWVkLCBuZXdTZWVkLCBkRGF0YTtcbiAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgaWYgKCEoIXBhc3MgfHwgIXBhc3MubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3FyY29kZVtcImRlZmF1bHRcIl0udG9EYXRhVVJMKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc2FsdDogX1NlZWRlcltcImRlZmF1bHRcIl0uZ2V0U2FsdCgpXG4gICAgICAgICAgICAgICAgICB9KSwge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbDogJ0wnXG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA2O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TZWVkZXJbXCJkZWZhdWx0XCJdLmdldFNlZWQoKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgIG9sZFNlZWQgPSBfY29udGV4dC5zZW50O1xuICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX01uZW1vbmljW1wiZGVmYXVsdFwiXS5nZW5lcmF0ZU1uZW1vbmljKHBhc3MsIF9TZWVkZXJbXCJkZWZhdWx0XCJdLmdldFNhbHQoKSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICBuZXdTZWVkID0gX2NvbnRleHQuc2VudFsxXTtcbiAgICAgICAgICAgICAgICAgIGREYXRhID0gX2Flc09vcFtcImRlZmF1bHRcIl0uZW5jcnlwdChfYWVzT29wW1wiZGVmYXVsdFwiXS5kZWNyeXB0KGRhdGEsIG9sZFNlZWQpLCBuZXdTZWVkKTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3FyY29kZVtcImRlZmF1bHRcIl0udG9EYXRhVVJMKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZERhdGEsXG4gICAgICAgICAgICAgICAgICAgIHNhbHQ6IF9TZWVkZXJbXCJkZWZhdWx0XCJdLmdldFNhbHQoKVxuICAgICAgICAgICAgICAgICAgfSksIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6ICdMJ1xuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKF94KSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0oKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVVuRW5jcnlwdGVkUVJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9jcmVhdGVVbkVuY3J5cHRlZFFSID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgX3FyY29kZVtcImRlZmF1bHRcIl0udG9EYXRhVVJMKEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7XG4gICAgICAgICAgICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbDogJ0wnXG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVVbkVuY3J5cHRlZFFSKF94Mikge1xuICAgICAgICByZXR1cm4gX2NyZWF0ZVVuRW5jcnlwdGVkUVIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNyZWF0ZVVuRW5jcnlwdGVkUVI7XG4gICAgfSgpXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVjcnlwdFFSXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZGVjcnlwdFFSID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGRhdGEsIHNhbHQsIHBhc3N3b3JkKSB7XG4gICAgICAgIHZhciBfcmVmMiwgX3JlZjMsIG1uZW1vbmljLCBzZWVkO1xuXG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTMkKF9jb250ZXh0Mykge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0My5wcmV2ID0gX2NvbnRleHQzLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gX01uZW1vbmljW1wiZGVmYXVsdFwiXS5nZW5lcmF0ZU1uZW1vbmljKHBhc3N3b3JkLCBzYWx0KTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgX3JlZjIgPSBfY29udGV4dDMuc2VudDtcbiAgICAgICAgICAgICAgICBfcmVmMyA9ICgwLCBfc2xpY2VkVG9BcnJheTJbXCJkZWZhdWx0XCJdKShfcmVmMiwgMik7XG4gICAgICAgICAgICAgICAgbW5lbW9uaWMgPSBfcmVmM1swXTtcbiAgICAgICAgICAgICAgICBzZWVkID0gX3JlZjNbMV07XG4gICAgICAgICAgICAgICAgX2NvbnRleHQzLnByZXYgPSA2O1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIF9hZXNPb3BbXCJkZWZhdWx0XCJdLmRlY3J5cHQoZGF0YSwgc2VlZCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQzLnByZXYgPSAxMDtcbiAgICAgICAgICAgICAgICBfY29udGV4dDMudDAgPSBfY29udGV4dDNbXCJjYXRjaFwiXSg2KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWNyeXB0aW5nIFFSOiAnLCBfY29udGV4dDMudDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuYWJydXB0KFwicmV0dXJuXCIsIG51bGwpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUzLCBudWxsLCBbWzYsIDEwXV0pO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBkZWNyeXB0UVIoX3gzLCBfeDQsIF94NSkge1xuICAgICAgICByZXR1cm4gX2RlY3J5cHRRUi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjcnlwdFFSO1xuICAgIH0oKVxuICB9XSk7XG4gIHJldHVybiBRUlNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUVJTZXJ2aWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudXRjVG9Mb2NhbCA9IGV4cG9ydHMuZGF5c09sZCA9IGV4cG9ydHMuaG91ck5vdyA9IGV4cG9ydHMuZGF0ZUlkID0gdm9pZCAwO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIGRhdGVJZCA9IGZ1bmN0aW9uIGRhdGVJZCgpIHtcbiAgdmFyIG1pbnVzRGF5cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICBkLnNldERhdGUoZC5nZXREYXRlKCkgLSBtaW51c0RheXMpO1xuICB2YXIgZGF0ZSA9IGQuZ2V0VVRDRGF0ZSgpO1xuICB2YXIgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICB2YXIgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KGRhdGUsIFwiLVwiKS5jb25jYXQobW9udGgsIFwiLVwiKS5jb25jYXQoeWVhcik7XG59O1xuXG5leHBvcnRzLmRhdGVJZCA9IGRhdGVJZDtcblxudmFyIGhvdXJOb3cgPSBmdW5jdGlvbiBob3VyTm93KCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHJldHVybiBkLmdldEhvdXJzKCk7XG59O1xuXG5leHBvcnRzLmhvdXJOb3cgPSBob3VyTm93O1xuXG52YXIgZGF5c09sZCA9IGZ1bmN0aW9uIGRheXNPbGQoaWQsIGRheXMpIHtcbiAgdmFyIF9pZCRzcGxpdCA9IGlkLnNwbGl0KCctJyksXG4gICAgICBfaWQkc3BsaXQyID0gKDAsIF9zbGljZWRUb0FycmF5MltcImRlZmF1bHRcIl0pKF9pZCRzcGxpdCwgMyksXG4gICAgICBkMiA9IF9pZCRzcGxpdDJbMF0sXG4gICAgICBtMiA9IF9pZCRzcGxpdDJbMV0sXG4gICAgICB5MiA9IF9pZCRzcGxpdDJbMl07XG5cbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgYWdvID0gbmV3IERhdGUoZC5nZXRUaW1lKCkgLSBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gIHZhciB0aGVuID0gbmV3IERhdGUoeTIsIG0yIC0gMSwgZDIsIDAsIDAsIDAsIDApO1xuICByZXR1cm4gdGhlbiA8IGFnbztcbn07XG5cbmV4cG9ydHMuZGF5c09sZCA9IGRheXNPbGQ7XG5cbnZhciB1dGNUb0xvY2FsID0gZnVuY3Rpb24gdXRjVG9Mb2NhbChpZCkge1xuICB2YXIgaG91ciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICB2YXIgX2lkJHNwbGl0MyA9IGlkLnNwbGl0KCctJyksXG4gICAgICBfaWQkc3BsaXQ0ID0gKDAsIF9zbGljZWRUb0FycmF5MltcImRlZmF1bHRcIl0pKF9pZCRzcGxpdDMsIDMpLFxuICAgICAgZDIgPSBfaWQkc3BsaXQ0WzBdLFxuICAgICAgbTIgPSBfaWQkc3BsaXQ0WzFdLFxuICAgICAgeTIgPSBfaWQkc3BsaXQ0WzJdO1xuXG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgZC5zZXRVVENEYXRlKGQyKTtcbiAgZC5zZXRVVENNb250aChtMik7XG4gIGQuc2V0VVRDRnVsbFllYXIoeTIpO1xuICBkLnNldFVUQ0hvdXJzKGhvdXIpO1xuICB2YXIgZGF0ZSA9IGQuZ2V0RGF0ZSgpO1xuICB2YXIgbW9udGggPSBkLmdldE1vbnRoKCk7XG4gIHZhciB5ZWFyID0gZC5nZXRGdWxsWWVhcigpO1xuICByZXR1cm4gW1wiXCIuY29uY2F0KGRhdGUsIFwiLVwiKS5jb25jYXQobW9udGgsIFwiLVwiKS5jb25jYXQoeWVhciksIGQuZ2V0SG91cnMoKV07XG59O1xuXG5leHBvcnRzLnV0Y1RvTG9jYWwgPSB1dGNUb0xvY2FsOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5NbmVtb25pYyA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfSGFzaGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9IYXNoZXJcIikpO1xuXG52YXIgX2JpcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImJpcDM5XCIpKTtcblxudmFyIE1uZW1vbmljID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTW5lbW9uaWMoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBNbmVtb25pYyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKE1uZW1vbmljLCBudWxsLCBbe1xuICAgIGtleTogXCJnZW5lcmF0ZU1uZW1vbmljXCIsXG5cbiAgICAvKioqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSBtbmVtb25pYyBmcm9tIGEgcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFxyXG4gICAgICogQHBhcmFtIHNhbHRcclxuICAgICAqIEByZXR1cm5zIHtbc3RyaW5nLHN0cmluZ119XHJcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9nZW5lcmF0ZU1uZW1vbmljID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUocGFzc3dvcmQpIHtcbiAgICAgICAgdmFyIHNhbHQsXG4gICAgICAgICAgICBoYXNoLFxuICAgICAgICAgICAgbW5lbW9uaWMsXG4gICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzYWx0ID0gX2FyZ3MubGVuZ3RoID4gMSAmJiBfYXJnc1sxXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3NbMV0gOiBudWxsO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgIHJldHVybiBfSGFzaGVyW1wiZGVmYXVsdFwiXS5zZWN1cmVIYXNoKHBhc3N3b3JkLCBzYWx0KTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgaGFzaCA9IF9jb250ZXh0LnNlbnQ7XG4gICAgICAgICAgICAgICAgbW5lbW9uaWMgPSBfYmlwW1wiZGVmYXVsdFwiXS5lbnRyb3B5VG9NbmVtb25pYyhoYXNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIFttbmVtb25pYywgX2JpcFtcImRlZmF1bHRcIl0ubW5lbW9uaWNUb1NlZWRIZXgobW5lbW9uaWMpXSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1uZW1vbmljKF94KSB7XG4gICAgICAgIHJldHVybiBfZ2VuZXJhdGVNbmVtb25pYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2VuZXJhdGVNbmVtb25pYztcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJtbmVtb25pY1RvU2VlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX21uZW1vbmljVG9TZWVkID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKG1uZW1vbmljKSB7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIF9iaXBbXCJkZWZhdWx0XCJdLm1uZW1vbmljVG9TZWVkSGV4KG1uZW1vbmljKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMik7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIG1uZW1vbmljVG9TZWVkKF94Mikge1xuICAgICAgICByZXR1cm4gX21uZW1vbmljVG9TZWVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtbmVtb25pY1RvU2VlZDtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gTW5lbW9uaWM7XG59KCk7XG5cbmV4cG9ydHMuTW5lbW9uaWMgPSBNbmVtb25pYztcbnZhciBfZGVmYXVsdCA9IE1uZW1vbmljO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIGZyYW1ld29yaztcblxudmFyIEZyYW1ld29yayA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEZyYW1ld29yaygpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEZyYW1ld29yayk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEZyYW1ld29yaywgbnVsbCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KF9mcmFtZXdvcmspIHtcbiAgICAgIGZyYW1ld29yayA9IF9mcmFtZXdvcms7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFZlcnNpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcbiAgICAgIHJldHVybiBmcmFtZXdvcmsuZ2V0VmVyc2lvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwdXNoTm90aWZpY2F0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHB1c2hOb3RpZmljYXRpb24odGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gZnJhbWV3b3JrLnB1c2hOb3RpZmljYXRpb24odGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJpZ2dlckRlZXBMaW5rXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJEZWVwTGluayhkZWVwTGluaykge31cbiAgfV0pO1xuICByZXR1cm4gRnJhbWV3b3JrO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEZyYW1ld29yazsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfU2VlZGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2VydmljZXMvc2VjdXJlL1NlZWRlclwiKSk7XG5cbnZhciBlY2MgPSByZXF1aXJlKCdlb3Nqcy1lY2MnKTtcblxudmFyIHNjcnlwdCA9IHJlcXVpcmUoJ3NjcnlwdC1hc3luYycpO1xuXG52YXIgSGFzaGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSGFzaGVyKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgSGFzaGVyKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoSGFzaGVyLCBudWxsLCBbe1xuICAgIGtleTogXCJ1bnNhbHRlZFF1aWNrSGFzaFwiLFxuXG4gICAgLyoqKlxyXG4gICAgICogSGFzaGVzIGEgY2xlYXJ0ZXh0IHVzaW5nIHRoZSBTSEEtMjU2IGFsZ29yaXRobS5cclxuICAgICAqIFRoaXMgaXMgSU5TRUNVUkUgYW5kIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGZpbmdlcnByaW50aW5nLlxyXG4gICAgICogQHBhcmFtIGNsZWFydGV4dFxyXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuc2FsdGVkUXVpY2tIYXNoKGNsZWFydGV4dCkge1xuICAgICAgcmV0dXJuIGVjYy5zaGEyNTYoY2xlYXJ0ZXh0KTtcbiAgICB9XG4gICAgLyoqKlxyXG4gICAgICogSGFzaGVzIGEgY2xlYXJ0ZXh0IHVzaW5nIHNjcnlwdC5cclxuICAgICAqIEBwYXJhbSBjbGVhcnRleHRcclxuICAgICAqIEBwYXJhbSBzYWx0XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNlY3VyZUhhc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9zZWN1cmVIYXNoID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGNsZWFydGV4dCkge1xuICAgICAgICB2YXIgc2FsdCxcbiAgICAgICAgICAgIF9hcmdzMiA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2FsdCA9IF9hcmdzMi5sZW5ndGggPiAxICYmIF9hcmdzMlsxXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3MyWzFdIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAgICAgICAgICAgICAvKiNfX1BVUkVfXyovXG4gICAgICAgICAgICAgICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhbHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9TZWVkZXJbXCJkZWZhdWx0XCJdLmdldFNhbHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDAgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jb250ZXh0LnQwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gJ1NBTFRfTUUnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWx0ID0gX2NvbnRleHQudDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcnlwdChjbGVhcnRleHQsIHNhbHQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE46IDE2Mzg0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogOCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHA6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBka0xlbjogMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGluZzogJ2hleCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZGVyaXZlZEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkZXJpdmVkS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZTIpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiBzZWN1cmVIYXNoKF94KSB7XG4gICAgICAgIHJldHVybiBfc2VjdXJlSGFzaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VjdXJlSGFzaDtcbiAgICB9KClcbiAgfV0pO1xuICByZXR1cm4gSGFzaGVyO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEhhc2hlcjsiXSwic291cmNlUm9vdCI6IiJ9