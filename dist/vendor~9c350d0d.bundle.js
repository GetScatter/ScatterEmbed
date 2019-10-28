(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "+Dqx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mathematicalVersion = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var mathematicalVersion = function mathematicalVersion(version) {
  if (!version || version === '0') return 0;
  var parts = version.replace(/[.]/g, '_').replace(/[m]/g, '').split('_');
  if (parts.length !== 3) throw new Error("Migration error, invalid version");
  var total = 0;
  parts.map(function (v, i) {
    var multiplier = i === 0 ? 100 : i === 1 ? 10 : 1;
    total += parseFloat(v) * multiplier;
  });
  return total;
};

exports.mathematicalVersion = mathematicalVersion;

var fnToVersion = function fnToVersion(fnName) {
  return fnName.replace(/[m]/g, '').replace(/[_]/g, '.');
};

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(scatter, migrators) {
    var lastVersion, nextVersions, i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            scatter.meta.regenerateVersion();

            if (!scatter.isEncrypted()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            if (scatter.meta.needsUpdating()) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", false);

          case 5:
            lastVersion = mathematicalVersion(scatter.meta.lastVersion);
            nextVersions = Object.keys(migrators).filter(function (v) {
              return mathematicalVersion(v) > lastVersion;
            }).sort(function (a, b) {
              return mathematicalVersion(a) - mathematicalVersion(b);
            });

            if (!nextVersions.length) {
              _context.next = 16;
              break;
            }

            i = 0;

          case 9:
            if (!(i < nextVersions.length)) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return migrators[nextVersions[i]](scatter);

          case 12:
            i++;
            _context.next = 9;
            break;

          case 15:
            scatter.meta.lastVersion = fnToVersion(nextVersions[nextVersions.length - 1]);

          case 16:
            return _context.abrupt("return", nextVersions.length > 0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;

/***/ }),

/***/ "+Ze5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExternalWalletInterface = exports["default"] = exports.EXT_WALLET_TYPES = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("yXPU"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("lSNA"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var EXT_WALLET_TYPES = {}; // Format [ {type,name,wallet}, {type,name,wallet} ]

exports.EXT_WALLET_TYPES = EXT_WALLET_TYPES;
var WALLETS = [];

var ExternalWallet =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(ExternalWallet, null, [{
    key: "loadWallets",
    value: function loadWallets(_wallets) {
      exports.EXT_WALLET_TYPES = EXT_WALLET_TYPES = _wallets.map(function (x) {
        return (0, _defineProperty2["default"])({}, x.type, x.name);
      });
      WALLETS = _wallets;
    }
  }]);

  function ExternalWallet() {
    var _type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _blockchain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    (0, _classCallCheck2["default"])(this, ExternalWallet);
    this.id = _IdGenerator["default"].text(64);
    this.type = _type;
    this.blockchain = _blockchain;
    this.addressIndex = 0;
  }

  (0, _createClass2["default"])(ExternalWallet, [{
    key: "setup",
    value: function setup() {
      this["interface"] = getInterface(this.type, this.blockchain);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new ExternalWallet();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return ExternalWallet;
}();

exports["default"] = ExternalWallet;

var getInterface = function getInterface(type, blockchain) {
  if (EXT_WALLET_TYPES.hasOwnProperty(type)) return WALLETS[type].wallet.typeToInterface(blockchain);
  return console.error('Type not defined in hardware wallets');
};

var ExternalWalletInterface =
/*#__PURE__*/
function () {
  function ExternalWalletInterface(handler) {
    (0, _classCallCheck2["default"])(this, ExternalWalletInterface);
    this.handler = handler;
  }

  (0, _createClass2["default"])(ExternalWalletInterface, [{
    key: "open",
    value: function () {
      var _open = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.handler.open();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open() {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.handler.close();

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "canConnect",
    value: function () {
      var _canConnect = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.handler.canConnect();

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function canConnect() {
        return _canConnect.apply(this, arguments);
      }

      return canConnect;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(publicKey, transaction, abi, network) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.handler.sign(publicKey, transaction, abi, network);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sign(_x, _x2, _x3, _x4) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }, {
    key: "getPublicKey",
    value: function () {
      var _getPublicKey = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.handler.getPublicKey();

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getPublicKey() {
        return _getPublicKey.apply(this, arguments);
      }

      return getPublicKey;
    }()
  }, {
    key: "setAddressIndex",
    value: function setAddressIndex(path) {
      return this.handler.setAddressIndex(path);
    }
  }, {
    key: "availableBlockchains",
    value: function availableBlockchains() {
      return this.handler.availableBlockchains();
    }
  }]);
  return ExternalWalletInterface;
}();

exports.ExternalWalletInterface = ExternalWalletInterface;

/***/ }),

/***/ "+nw1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_IDENTITY = exports.AUTHENTICATE = exports.SUGGEST_NETWORK = exports.SIGN_ARBITRARY = exports.ADD_TOKEN = exports.SIGN = exports.TRANSFER = exports.LOGOUT = exports.IDENTITY_FROM_PERMISSIONS = exports.GET_AVATAR = exports.LOGIN_ALL = exports.LOGIN = exports.HAS_ACCOUNT_FOR = exports.LINK_ACCOUNT = exports.GET_PUBLIC_KEY = exports.GET_VERSION = void 0;
var GET_VERSION = 'getVersion';
exports.GET_VERSION = GET_VERSION;
var GET_PUBLIC_KEY = 'getPublicKey';
exports.GET_PUBLIC_KEY = GET_PUBLIC_KEY;
var LINK_ACCOUNT = 'linkAccount';
exports.LINK_ACCOUNT = LINK_ACCOUNT;
var HAS_ACCOUNT_FOR = 'hasAccountFor';
exports.HAS_ACCOUNT_FOR = HAS_ACCOUNT_FOR;
var LOGIN = 'getOrRequestIdentity';
exports.LOGIN = LOGIN;
var LOGIN_ALL = 'getAllAccountsFor';
exports.LOGIN_ALL = LOGIN_ALL;
var GET_AVATAR = 'getAvatar';
exports.GET_AVATAR = GET_AVATAR;
var IDENTITY_FROM_PERMISSIONS = 'identityFromPermissions';
exports.IDENTITY_FROM_PERMISSIONS = IDENTITY_FROM_PERMISSIONS;
var LOGOUT = 'forgetIdentity';
exports.LOGOUT = LOGOUT;
var TRANSFER = 'requestTransfer';
exports.TRANSFER = TRANSFER;
var SIGN = 'requestSignature';
exports.SIGN = SIGN;
var ADD_TOKEN = 'addToken';
exports.ADD_TOKEN = ADD_TOKEN;
var SIGN_ARBITRARY = 'requestArbitrarySignature';
exports.SIGN_ARBITRARY = SIGN_ARBITRARY;
var SUGGEST_NETWORK = 'requestAddNetwork';
exports.SUGGEST_NETWORK = SUGGEST_NETWORK;
var AUTHENTICATE = 'authenticate';
exports.AUTHENTICATE = AUTHENTICATE;
var UPDATE_IDENTITY = 'updateIdentity';
exports.UPDATE_IDENTITY = UPDATE_IDENTITY;

/***/ }),

/***/ "/gdi":
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

var _Identity = _interopRequireWildcard(__webpack_require__("EY8S"));

var _Permission = _interopRequireDefault(__webpack_require__("Ouh5"));

var _Keypair = _interopRequireDefault(__webpack_require__("Hxfq"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _AuthorizedApp = _interopRequireDefault(__webpack_require__("zAsq"));

var _CreditCard = _interopRequireDefault(__webpack_require__("zc85"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

var Keychain =
/*#__PURE__*/
function () {
  function Keychain() {
    (0, _classCallCheck2["default"])(this, Keychain);
    this.keypairs = [];
    this.accounts = [];
    this.identities = [];
    this.locations = [];
    this.permissions = [];
    this.cards = [];
    this.apps = [];
    this.avatars = {};
    this.lastUsedIdentity = null;
  }

  (0, _createClass2["default"])(Keychain, [{
    key: "clone",
    value: function clone() {
      return Keychain.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "findIdentity",
    value: function findIdentity(id) {
      return this.identities.find(function (identity) {
        return identity.id === id;
      });
    }
  }, {
    key: "updateOrPushApp",
    value: function updateOrPushApp(app) {
      this.apps.find(function (x) {
        return x.origin === app.origin;
      }) ? this.apps = this.apps.map(function (x) {
        return x.origin === app.origin ? app : x;
      }) : this.apps.unshift(app);
    }
  }, {
    key: "removeApp",
    value: function removeApp(app) {
      this.apps = this.apps.filter(function (x) {
        return x.origin !== app.origin;
      });
    }
  }, {
    key: "findApp",
    value: function findApp(origin) {
      return this.apps.find(function (x) {
        return x.origin === origin;
      });
    }
  }, {
    key: "updateOrPushIdentity",
    value: function updateOrPushIdentity(identity) {
      this.identities.find(function (id) {
        return id.id === identity.id;
      }) ? this.identities = this.identities.map(function (id) {
        return id.id === identity.id ? identity : id;
      }) : this.identities.unshift(identity);
    }
  }, {
    key: "removeIdentity",
    value: function removeIdentity(identity) {
      this.identities = this.identities.filter(function (id) {
        return id.id !== identity.id;
      });
      this.permissions = this.permissions.filter(function (perm) {
        return perm.identity !== identity.id;
      });
      delete this.avatars[identity.id];
    }
  }, {
    key: "updateOrPushLocation",
    value: function updateOrPushLocation(location) {
      this.locations.find(function (id) {
        return id.id === location.id;
      }) ? this.locations = this.locations.map(function (id) {
        return id.id === location.id ? location : id;
      }) : this.locations.unshift(location);
    }
  }, {
    key: "removeLocation",
    value: function removeLocation(location) {
      this.locations = this.locations.filter(function (x) {
        return x.id !== location.id;
      });
      this.identities.map(function (identity) {
        if (identity.location === location.id) {
          identity.location = null;
        }
      });
    }
  }, {
    key: "getKeyPairByName",
    value: function getKeyPairByName(name) {
      return this.keypairs.find(function (key) {
        return key.name.toLowerCase() === name.toLowerCase();
      });
    }
  }, {
    key: "getKeyPairByPublicKey",
    value: function getKeyPairByPublicKey(publicKey) {
      if (!publicKey) return;
      return this.keypairs.find(function (key) {
        return key.publicKeys.find(function (x) {
          return x.key.toLowerCase() === publicKey.toLowerCase();
        });
      });
    }
  }, {
    key: "removeKeyPair",
    value: function removeKeyPair(keypair) {
      var accountsToRemove = this.accounts.filter(function (x) {
        return x.keypairUnique === keypair.unique();
      }).map(function (x) {
        return x.unique();
      });
      this.permissions = this.permissions.filter(function (x) {
        return !x.accounts.some(function (a) {
          return accountsToRemove.includes(a);
        });
      });
      this.accounts = this.accounts.filter(function (x) {
        return x.keypairUnique !== keypair.unique();
      });
      this.keypairs = this.keypairs.filter(function (key) {
        return key.unique() !== keypair.unique();
      });
      this.correctHistories();
      this.correctAppLinks();
    }
  }, {
    key: "addAccount",
    value: function addAccount(account) {
      if (!this.accounts.find(function (a) {
        return a.unique() === account.unique();
      })) this.accounts.push(account);
    }
  }, {
    key: "removeAccount",
    value: function removeAccount(account) {
      var accountsToRemove = this.accounts.filter(function (x) {
        return x.unique() === account.unique();
      }).map(function (x) {
        return x.unique();
      });
      this.permissions = this.permissions.filter(function (x) {
        return !x.accounts.some(function (a) {
          return accountsToRemove.includes(a);
        });
      });
      this.accounts = this.accounts.filter(function (a) {
        return a.unique() !== account.unique();
      });
      this.correctHistories();
      this.correctAppLinks();
    }
  }, {
    key: "correctHistories",
    value: function correctHistories() {
      var keypairUniques = this.keypairs.map(function (x) {
        return x.unique();
      });
      var accountUniques = this.accounts.map(function (x) {
        return x.unique();
      });

      _StoreService["default"].get().state.history.map(function (x) {
        var acc = _Account["default"].fromJson(x.type === 'action' ? x.account : x.from);

        if (!keypairUniques.includes(acc.keypairUnique) || !accountUniques.includes(acc.unique())) {
          _StoreService["default"].get().dispatch(Actions.DELTA_HISTORY, x);
        }
      });
    }
  }, {
    key: "correctAppLinks",
    value: function correctAppLinks() {
      var origins = this.permissions.map(function (x) {
        return x.origin;
      });
      this.apps = this.apps.filter(function (x) {
        return origins.includes(function (x) {
          return x.origin;
        });
      });
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Keychain();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (json.hasOwnProperty('keypairs')) p.keypairs = json.keypairs.map(function (x) {
        return _Keypair["default"].fromJson(x);
      });
      if (json.hasOwnProperty('accounts')) p.accounts = json.accounts.map(function (x) {
        return _Account["default"].fromJson(x);
      });
      if (json.hasOwnProperty('identities')) p.identities = json.identities.map(function (x) {
        return _Identity["default"].fromJson(x);
      });
      if (json.hasOwnProperty('locations')) p.locations = json.locations.map(function (x) {
        return _Identity.LocationInformation.fromJson(x);
      });
      if (json.hasOwnProperty('permissions')) p.permissions = json.permissions.map(function (x) {
        return _Permission["default"].fromJson(x);
      });
      if (json.hasOwnProperty('cards')) p.cards = json.cards.map(function (x) {
        return _CreditCard["default"].fromJson(x);
      });
      if (json.hasOwnProperty('apps')) p.apps = json.apps.map(function (x) {
        return _AuthorizedApp["default"].fromJson(x);
      });
      return p;
    }
  }]);
  return Keychain;
}();

exports["default"] = Keychain;

/***/ }),

/***/ "0/ky":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HistoricAction = _interopRequireDefault(__webpack_require__("wy8C"));

var _HistoricExchange = _interopRequireDefault(__webpack_require__("GGPC"));

var _HistoricTransfer = _interopRequireDefault(__webpack_require__("ssXz"));

var _History = _interopRequireDefault(__webpack_require__("EnWD"));

var _default = {
  HistoricAction: _HistoricAction["default"],
  HistoricExchange: _HistoricExchange["default"],
  HistoricTransfer: _HistoricTransfer["default"],
  History: _History["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "0fbR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ExternalWallet = _interopRequireDefault(__webpack_require__("+Ze5"));

var _default = {
  ExternalWallet: _ExternalWallet["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "6NZL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Framework = _interopRequireDefault(__webpack_require__("z/LQ"));

var Meta =
/*#__PURE__*/
function () {
  function Meta() {
    (0, _classCallCheck2["default"])(this, Meta);
    this.version = _Framework["default"].getVersion();
    this.lastVersion = _Framework["default"].getVersion();
    this.acceptedTerms = false;
    this.lastSuggestedVersion = null;
  }

  (0, _createClass2["default"])(Meta, [{
    key: "getVersion",
    value: function getVersion() {
      return _Framework["default"].getVersion();
    }
  }, {
    key: "regenerateVersion",
    value: function regenerateVersion() {
      this.version = _Framework["default"].getVersion();
    }
  }, {
    key: "needsUpdating",
    value: function needsUpdating() {
      return this.version !== this.lastVersion;
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Meta();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return Meta;
}();

exports["default"] = Meta;

/***/ }),

/***/ "78si":
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

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Network =
/*#__PURE__*/
function () {
  function Network() {
    var _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https';

    var _host = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var _port = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var blockchain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var chainId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

    var _path = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

    (0, _classCallCheck2["default"])(this, Network);
    this.id = _IdGenerator["default"].numeric(12);
    this.name = _name;
    this.protocol = _protocol;
    this.host = _host;
    this.port = _port;
    this.path = _path;
    this.blockchain = blockchain;
    this.chainId = chainId.toString();
    this.fromOrigin = null;
    this.createdAt = +new Date();
    this.token = null;
  }

  (0, _createClass2["default"])(Network, [{
    key: "unique",
    value: function unique() {
      return ("".concat(this.blockchain, ":") + (this.chainId.length ? "chain:".concat(this.chainId) : "".concat(this.host, ":").concat(this.port))).toLowerCase();
    }
  }, {
    key: "fullhost",
    value: function fullhost() {
      return "".concat(this.protocol, "://").concat(this.host).concat(this.port ? ':' : '').concat(this.port).concat(this.path ? this.path : '');
    }
  }, {
    key: "clone",
    value: function clone() {
      return Network.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "isValid",
    value: function isValid() {
      if (!_Blockchains.BlockchainsArray.map(function (x) {
        return x.value;
      }).includes(this.blockchain)) return false;
      return this.host.length && this.port.toString().length && this.chainId.length;
    }
  }, {
    key: "setPort",
    value: function setPort() {
      if (!this.port) this.port = 80;
      if (![80, 443].includes(parseInt(this.port))) return;
      this.port = this.protocol === 'http' ? 80 : 443;
    }
  }, {
    key: "systemToken",
    value: function systemToken() {
      if (this.token) return this.token;

      var token = _PluginRepository["default"].plugin(this.blockchain).defaultToken();

      token.chainId = this.chainId;
      return token;
    }
  }, {
    key: "accounts",
    value: function accounts() {
      var _this = this;

      var unique = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var accounts = _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
        return x.networkUnique === _this.unique();
      });

      if (!unique) return accounts;
      return accounts.reduce(function (acc, account) {
        if (!acc.find(function (x) {
          return account.network().unique() === x.network().unique() && account.sendable() === x.sendable();
        })) acc.push(account);
        return acc;
      }, []);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Network();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(Network.placeholder(), json);
      p.chainId = p.chainId ? p.chainId.toString() : '';
      p.token = json.hasOwnProperty('token') && json.token ? _Token["default"].fromJson(json.token) : null;
      return p;
    }
  }, {
    key: "fromUnique",
    value: function fromUnique(netString) {
      var blockchain = netString.split(':')[0];
      if (netString.indexOf(':chain:') > -1) return new Network('', '', '', '', blockchain, netString.replace("".concat(blockchain, ":chain:"), ''));
      var splits = netString.replace("".concat(blockchain, ":"), '').split(':');
      return new Network('', '', splits[0], parseInt(splits[1] || 80), blockchain);
    }
  }]);
  return Network;
}();

exports["default"] = Network;

/***/ }),

/***/ "CC+F":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var AccountAction =
/*#__PURE__*/
function () {
  function AccountAction(type) {
    var onclick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var danger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck2["default"])(this, AccountAction);
    this.type = type;
    this.onclick = onclick;
    this.isDangerous = danger;
  }

  (0, _createClass2["default"])(AccountAction, null, [{
    key: "placeholder",
    value: function placeholder() {
      return new AccountAction();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return AccountAction;
}();

exports["default"] = AccountAction;

/***/ }),

/***/ "DgqZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var Explorer =
/*#__PURE__*/
function () {
  function Explorer() {
    (0, _classCallCheck2["default"])(this, Explorer);
    this.raw = null;
    this.name = null;
    this.account = null;
    this.transaction = null;
    this.block = null;
  }

  (0, _createClass2["default"])(Explorer, [{
    key: "parsed",
    value: function parsed() {
      return Explorer.fromRaw(this.raw);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Explorer();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }, {
    key: "fromRaw",
    value: function fromRaw(rawExplorer) {
      if (!rawExplorer) return this.placeholder();
      return this.fromJson({
        raw: rawExplorer,
        name: rawExplorer.name,
        account: function account(x) {
          return rawExplorer.account.replace('{x}', x);
        },
        transaction: function transaction(x) {
          return rawExplorer.transaction.replace('{x}', x);
        },
        block: function block(x) {
          return rawExplorer.block.replace('{x}', x);
        }
      });
    }
  }]);
  return Explorer;
}();

exports["default"] = Explorer;

/***/ }),

/***/ "EY8S":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LocationInformation = exports.PersonalInformation = exports.IdentityRequiredFields = exports.LocationFields = exports.PersonalFields = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _aesOop = _interopRequireDefault(__webpack_require__("5lvq"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Actions = _interopRequireWildcard(__webpack_require__("qjwK"));

/********************************************/

/*            REQUIREABLE FIELDS            */

/********************************************/
var PersonalFields = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  birthdate: 'birthdate'
};
exports.PersonalFields = PersonalFields;
var LocationFields = {
  phone: 'phone',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  zipcode: 'zipcode'
};
exports.LocationFields = LocationFields;

var IdentityRequiredFields =
/*#__PURE__*/
function () {
  function IdentityRequiredFields() {
    (0, _classCallCheck2["default"])(this, IdentityRequiredFields);
    this.accounts = [];
    this.personal = [];
    this.location = [];
  }

  (0, _createClass2["default"])(IdentityRequiredFields, [{
    key: "clone",
    value: function clone() {
      return IdentityRequiredFields.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this.personal.length && !this.location.length;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      if (JSON.stringify(Object.keys(new IdentityRequiredFields())) !== JSON.stringify(Object.keys(this))) return false;
      if (!this.personal.every(function (field) {
        return Object.keys(PersonalFields).includes(field);
      })) return false;
      if (!this.location.every(function (field) {
        return Object.keys(LocationFields).includes(field);
      })) return false;
      return true;
    }
  }, {
    key: "forPermission",
    value: function forPermission() {
      var fields = [];
      this.accounts.map(function (x) {
        return fields.push("account:".concat(_Network["default"].fromJson(x).unique()));
      });
      this.location.map(function (x) {
        return fields.push("location:".concat(x));
      });
      this.personal.map(function (x) {
        return fields.push("personal:".concat(x));
      });
      return fields.sort();
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new IdentityRequiredFields();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(new IdentityRequiredFields(), json);
    }
  }, {
    key: "fromPermission",
    value: function fromPermission(requirements) {
      var p = IdentityRequiredFields.placeholder();
      p.accounts = requirements.filter(function (x) {
        return x.indexOf('account:') > -1;
      }).map(function (x) {
        return _Network["default"].fromUnique(x.split('account:')[1]);
      });
      p.personal = requirements.filter(function (x) {
        return x.indexOf('personal:') > -1;
      }).map(function (x) {
        return x.split('personal:')[1];
      });
      p.location = requirements.filter(function (x) {
        return x.indexOf('location:') > -1;
      }).map(function (x) {
        return x.split('location:')[1];
      });
      return p;
    }
  }]);
  return IdentityRequiredFields;
}();
/********************************************/

/*          Personal Information            */

/********************************************/


exports.IdentityRequiredFields = IdentityRequiredFields;

var PersonalInformation =
/*#__PURE__*/
function () {
  function PersonalInformation() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, PersonalInformation);
    Object.keys(PersonalFields).forEach(function (fieldName) {
      return _this[fieldName] = '';
    });
  }

  (0, _createClass2["default"])(PersonalInformation, [{
    key: "findFields",
    value: function findFields(fields) {
      var _this2 = this;

      return fields.filter(function (field) {
        return _this2.hasOwnProperty(field) && _this2[field].length;
      });
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new PersonalInformation();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return PersonalInformation;
}();
/********************************************/

/*          Location Information            */

/********************************************/


exports.PersonalInformation = PersonalInformation;

var LocationInformation =
/*#__PURE__*/
function () {
  function LocationInformation() {
    var _this3 = this;

    (0, _classCallCheck2["default"])(this, LocationInformation);
    this.id = _IdGenerator["default"].numeric(10);
    this.name = 'Unnamed Location';
    this.isDefault = false;
    Object.keys(LocationFields).forEach(function (fieldName) {
      return _this3[fieldName] = '';
    });
  }

  (0, _createClass2["default"])(LocationInformation, [{
    key: "clone",
    value: function clone() {
      return LocationInformation.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "findFields",
    value: function findFields(fields) {
      var _this4 = this;

      var foundFields = fields.filter(function (field) {
        return field !== LocationFields.country;
      }).filter(function (field) {
        return _this4.hasOwnProperty(field) && _this4[field].length;
      });
      if (fields.includes(LocationFields.country) && this.hasOwnProperty('country') && typeof this.country !== 'string') foundFields.push(LocationFields.country);
      return foundFields;
    }
  }, {
    key: "hasFields",
    value: function hasFields(fields) {
      return this.findFields(fields).length === fields.length;
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new LocationInformation();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return LocationInformation;
}();
/********************************************/

/*                 Identity                 */

/********************************************/


exports.LocationInformation = LocationInformation;

var _require = __webpack_require__("Giuh"),
    PrivateKey = _require.PrivateKey;

var Identity =
/*#__PURE__*/
function () {
  function Identity() {
    (0, _classCallCheck2["default"])(this, Identity);
    // Basic fields
    this.id = _IdGenerator["default"].text(24);
    this.hash = '';
    this.privateKey = '';
    this.publicKey = '';
    this.name = ''; // Requireable fields

    this.personal = PersonalInformation.placeholder(); // this.locations = [LocationInformation.placeholder()];

    this.location = null; // KYC

    this.kyc = false;
    this.ridl = -1;
  }

  (0, _createClass2["default"])(Identity, [{
    key: "initialize",
    value: function initialize(hash) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        PrivateKey.randomKey().then(function (privateKey) {
          _this5.privateKey = privateKey.toWif();
          _this5.publicKey = privateKey.toPublic().toString();
          _this5.hash = hash;
          resolve(true);
        });
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      return Identity.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "isEncrypted",
    value: function isEncrypted() {
      return this.privateKey.length > 70;
    }
  }, {
    key: "encrypt",
    value: function encrypt(seed) {
      if (!this.isEncrypted()) this.privateKey = _aesOop["default"].encrypt(this.privateKey, seed);
    }
  }, {
    key: "decrypt",
    value: function decrypt(seed) {
      if (this.isEncrypted()) this.privateKey = _aesOop["default"].decrypt(this.privateKey, seed);
    }
  }, {
    key: "defaultLocation",
    value: function defaultLocation() {
      return this.getLocation() || _StoreService["default"].get().state.scatter.keychain.locations[0];
    }
    /***
     * Checks if an Identity has specified fields.
     * This is used when an interacting application requires specific information.
     * @param fields - The fields to check for
     * @param selectedLocation
     * @returns {boolean}
     */

  }, {
    key: "hasRequiredFields",
    value: function hasRequiredFields(fields) {
      var _this6 = this;

      var selectedLocation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var requiredFields = IdentityRequiredFields.fromJson(fields);
      if (!requiredFields.isValid()) return false;
      if (requiredFields.personal.length) if (!requiredFields.personal.every(function (field) {
        return _this6.personal[field].length;
      })) return false;

      if (selectedLocation) {
        if (!selectedLocation.hasFields(fields.location)) return false;
      } else {
        if (requiredFields.location.length) {
          if (this.getLocation()) {
            return !!this.getLocation().hasFields(requiredFields.location);
          } else {
            return false;
          }
        }
      }

      return true;
    }
    /***
     * Returns an object with only the required fields from this Identity
     * @param fields
     * @param location
     */

  }, {
    key: "asOnlyRequiredFields",
    value: function asOnlyRequiredFields(fields) {
      var _this7 = this;

      var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var requiredFields = IdentityRequiredFields.fromJson(fields);
      if (!requiredFields.isValid()) return null;
      var identity = {
        hash: this.hash,
        publicKey: this.publicKey,
        name: this.name
      };

      if (requiredFields.personal.length) {
        identity.personal = {};
        requiredFields.personal.map(function (field) {
          return identity.personal[field] = _this7.personal[field];
        });
      }

      if (requiredFields.location.length) {
        identity.location = {};
        if (!location) location = this.defaultLocation();

        if (location) {
          requiredFields.location.map(function (field) {
            return identity.location[field] = location[field];
          });
        }
      }

      return identity;
    }
    /***
     * Sets up the fields returned to the application
     * @param requiredFields
     * @param identity
     * @param selectedLocation
     */

  }, {
    key: "getPropertyValueByName",

    /***
     * Returns the value of a property based on the requirable name.
     * @param requirable
     * @param location
     */
    value: function getPropertyValueByName(requirable) {
      var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (Object.keys(this).includes(requirable)) return this[requirable];else if (Object.keys(this.personal).includes(requirable)) return this.personal[requirable];else {
        var field = (location ? location : this.defaultLocation())[requirable];
        return (0, _typeof2["default"])(field) === 'object' ? field.name : field;
      }
    }
  }, {
    key: "fullname",
    value: function fullname() {
      return "".concat(this.personal.firstname || '[NO FIRST NAME]', " ").concat(this.personal.lastname || '[NO LAST NAME]');
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      var _this8 = this;

      if (!this.location) return;
      return _StoreService["default"].get().state.scatter.keychain.locations.find(function (x) {
        return x.id === _this8.location;
      });
    }
  }, {
    key: "setAsLastUsed",
    value: function setAsLastUsed() {
      var scatter = _StoreService["default"].get().state.scatter.clone();

      scatter.keychain.lastUsedIdentity = this.id;
      return _StoreService["default"].get().dispatch(Actions.SET_SCATTER, scatter);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Identity();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      p.personal = PersonalInformation.fromJson(json.personal); // if(json.hasOwnProperty('locations')) p.locations = json.locations.map(location => LocationInformation.fromJson(location));
      // else p.locations = [LocationInformation.placeholder()];

      return p;
    }
  }, {
    key: "asReturnedFields",
    value: function asReturnedFields(requiredFields, identity) {
      var selectedLocation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var returnedFields = identity.asOnlyRequiredFields(requiredFields, selectedLocation);
      delete returnedFields.hash;
      delete returnedFields.name;
      delete returnedFields.publicKey;
      delete returnedFields.kyc;
      delete returnedFields.ridl;
      return returnedFields;
    }
  }, {
    key: "nameIsValid",
    value: function nameIsValid(name) {
      return /^[a-zA-Z0-9_-]{3,20}$/.test(name);
    }
  }]);
  return Identity;
}();

exports["default"] = Identity;

/***/ }),

/***/ "EnWD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HISTORY_TYPES = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var HISTORY_TYPES = {
  Transfer: 'transfer',
  Exchange: 'exchange',
  Action: 'action'
};
exports.HISTORY_TYPES = HISTORY_TYPES;

var History = function History(type) {
  var txid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _classCallCheck2["default"])(this, History);
  this.id = _IdGenerator["default"].text(24);
  this.type = type;
  this.timestamp = +new Date();
  this.txid = typeof txid === 'string' ? txid : '';
};

exports["default"] = History;

/***/ }),

/***/ "F+MN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBlockchains = exports.blockchainName = exports.BlockchainsArray = exports.Blockchains = void 0;
var Blockchains = {
  EOSIO: 'eos',
  ETH: 'eth',
  TRX: 'trx',
  BTC: 'btc'
};
exports.Blockchains = Blockchains;
var BlockchainsArray = Object.keys(Blockchains).map(function (key) {
  return {
    key: key,
    value: Blockchains[key]
  };
});
exports.BlockchainsArray = BlockchainsArray;

var blockchainName = function blockchainName(x) {
  switch (x) {
    case 'btc':
      return 'Bitcoin';

    case Blockchains.EOSIO:
      return 'EOSIO';

    case Blockchains.ETH:
      return 'Ethereum';

    case Blockchains.TRX:
      return 'Tron';

    case Blockchains.BTC:
      return 'Bitcoin';

    default:
      return x;
  }
};

exports.blockchainName = blockchainName;

var setBlockchains = function setBlockchains(_Blockchains) {
  var _blockchainNameParser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  exports.Blockchains = Blockchains = _Blockchains;
  exports.BlockchainsArray = BlockchainsArray = Object.keys(Blockchains).map(function (key) {
    return {
      key: key,
      value: Blockchains[key]
    };
  });
  if (_blockchainNameParser) exports.blockchainName = blockchainName = _blockchainNameParser;
};

exports.setBlockchains = setBlockchains;

/***/ }),

/***/ "GGPC":
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

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _History2 = _interopRequireWildcard(__webpack_require__("EnWD"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var HistoricExchange =
/*#__PURE__*/
function (_History) {
  (0, _inherits2["default"])(HistoricExchange, _History);

  function HistoricExchange(from, to, fromToken, toToken, orderDetails) {
    var _this;

    var txid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    (0, _classCallCheck2["default"])(this, HistoricExchange);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HistoricExchange).call(this, _History2.HISTORY_TYPES.Exchange, txid));
    _this.from = from;
    _this.to = to;
    _this.fromToken = fromToken;
    _this.toToken = toToken;
    _this.orderDetails = orderDetails;
    _this.status = 'pending';
    return _this;
  }

  (0, _createClass2["default"])(HistoricExchange, null, [{
    key: "placeholder",
    value: function placeholder() {
      return new HistoricExchange();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      p.from = _Account["default"].fromJson(json.from);
      p.fromToken = _Token["default"].fromJson(json.fromToken);
      p.toToken = _Token["default"].fromJson(json.toToken);
      return p;
    }
  }]);
  return HistoricExchange;
}(_History2["default"]);

exports["default"] = HistoricExchange;

/***/ }),

/***/ "GwxU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Blockchains = __webpack_require__("F+MN");

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _BalanceService = _interopRequireDefault(__webpack_require__("KLk5"));

var Token =
/*#__PURE__*/
function () {
  function Token() {
    var blockchain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var contract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var decimals = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var chainId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    (0, _classCallCheck2["default"])(this, Token);
    this.id = _IdGenerator["default"].text(24);
    this.blockchain = blockchain;
    this.contract = contract;
    this.symbol = symbol;
    this.name = name ? name : symbol;
    this.decimals = decimals ? decimals : 2;
    this.amount = 0;
    this.chainId = chainId;
    this.unusable = null;
    this.fromOrigin = '';
    this.createdAt = +new Date();
  }

  (0, _createClass2["default"])(Token, [{
    key: "isValid",
    value: function isValid() {
      if (Object.keys(this).length !== 11) return false;
      return _Blockchains.BlockchainsArray.map(function (x) {
        return x.value;
      }).includes(this.blockchain) && this.contract.length && this.symbol.length && this.name.length && this.decimals.toString().length && this.chainId.length;
    }
  }, {
    key: "clone",
    value: function clone() {
      return Token.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "unique",
    value: function unique() {
      return "".concat(this.blockchain, ":").concat(this.contract.toLowerCase(), ":").concat(this.symbol.toLowerCase());
    }
  }, {
    key: "uniqueWithChain",
    value: function uniqueWithChain() {
      var includeUnusable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return "".concat(this.blockchain, ":").concat(this.contract.toLowerCase(), ":").concat(this.symbol.toLowerCase(), ":").concat(this.chainId).concat(includeUnusable && this.unusable ? ":".concat(this.unusable) : '');
    }
  }, {
    key: "identifiable",
    value: function identifiable() {
      return "".concat(this.blockchain, ":").concat(this.contract.toLowerCase());
    }
  }, {
    key: "add",
    value: function add(quantity) {
      this.amount = (parseFloat(this.amount) + parseFloat(quantity)).toFixed(this.decimals);
    }
  }, {
    key: "network",
    value: function network() {
      var _this = this;

      var networks = _StoreService["default"].get().state.scatter.settings.networks;

      if (!this.chainId || !this.chainId.length) return networks.find(function (x) {
        return x.unique() === _PluginRepository["default"].plugin(_this.blockchain).getEndorsedNetwork().unique();
      });
      return networks.find(function (x) {
        return x.blockchain === _this.blockchain && x.chainId === _this.chainId;
      });
    }
  }, {
    key: "formatted",
    value: function formatted() {
      return "".concat(this.amount, " ").concat(this.symbol);
    }
  }, {
    key: "fiatBalance",
    value: function fiatBalance() {
      var withSymbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var price = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var unusableReplacement = this.uniqueWithChain().replace(":".concat(this.unusable), '');

      if (_StoreService["default"].get().state.prices.hasOwnProperty(this.uniqueWithChain())) {
        price = price ? price : parseFloat(_StoreService["default"].get().state.prices[this.uniqueWithChain()][_StoreService["default"].get().state.scatter.settings.displayCurrency]);
        return "".concat(parseFloat(price * parseFloat(this.amount)).toFixed(4), " ").concat(withSymbol ? _StoreService["default"].get().state.scatter.settings.displayCurrency : '');
      } else if (this.unusable && _StoreService["default"].get().state.prices.hasOwnProperty(unusableReplacement)) {
        price = price ? price : parseFloat(_StoreService["default"].get().state.prices[unusableReplacement][_StoreService["default"].get().state.scatter.settings.displayCurrency]);
        return "".concat(parseFloat(price * parseFloat(this.amount)).toFixed(4), " ").concat(withSymbol ? _StoreService["default"].get().state.scatter.settings.displayCurrency : '');
      } else {
        return null;
      }
    }
  }, {
    key: "fiatPrice",
    value: function fiatPrice() {
      var withSymbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (_StoreService["default"].get().state.prices.hasOwnProperty(this.uniqueWithChain())) {
        var price = parseFloat(_StoreService["default"].get().state.prices[this.uniqueWithChain()][_StoreService["default"].get().state.scatter.settings.displayCurrency]);
        return "".concat(parseFloat(price).toFixed(4), " ").concat(withSymbol ? _StoreService["default"].get().state.scatter.settings.displayCurrency : '');
      } else {
        return null;
      }
    }
  }, {
    key: "baseTokenPrice",
    value: function baseTokenPrice() {
      var withSymbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (_StoreService["default"].get().state.prices.hasOwnProperty(this.uniqueWithChain())) {
        var systemToken = this.network().systemToken();
        if (this.uniqueWithChain(false) === systemToken.uniqueWithChain(false)) return null;
        var baseTokenPrice = parseFloat(_StoreService["default"].get().state.prices[systemToken.uniqueWithChain()][_StoreService["default"].get().state.scatter.settings.displayCurrency]);
        var price = parseFloat(_StoreService["default"].get().state.prices[this.uniqueWithChain()][_StoreService["default"].get().state.scatter.settings.displayCurrency]);
        return "".concat(parseFloat(price / baseTokenPrice).toFixed(10), " ").concat(withSymbol ? systemToken.symbol : '');
      } else {
        return null;
      }
    }
  }, {
    key: "totalBalance",
    value: function totalBalance() {
      if (_BalanceService["default"].totalBalances(false).totals.hasOwnProperty(this.uniqueWithChain())) {
        return _BalanceService["default"].totalBalances(false).totals[this.uniqueWithChain()];
      } else {
        return null;
      }
    }
  }, {
    key: "symbolClass",
    value: function symbolClass() {
      var iconSearch = "".concat(this.blockchain, "-").concat(this.symbol).toLowerCase();
      var icons = ['eth-tusd', 'btc-btc', 'eos-eos', 'eth-dai', 'trx-trx', 'eth-eth'];
      return icons.includes(iconSearch) ? "token-icon token-".concat(iconSearch) : null;
    }
  }, {
    key: "truncatedSymbol",
    value: function truncatedSymbol() {
      return this.symbol.length > 4 ? this.symbol.substr(0, 4) : this.symbol;
    }
  }, {
    key: "accounts",
    value: function accounts() {
      var _this2 = this;

      return _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
        return x.blockchain() === _this2.blockchain && x.network().chainId === _this2.chainId;
      }).reduce(function (acc, x) {
        if (!acc.find(function (y) {
          return y.sendable() === x.sendable();
        })) acc.push(x);
        return acc;
      }, []); // Problem with doing this is that if the balance checks fail then accounts never show up.
      // const state = StoreService.get().state;
      // if(!state.balances) return [];
      // return Object.keys(state.balances).reduce((acc,accountUnique) => {
      // 	if(state.balances[accountUnique].find(token => token.uniqueWithChain() === this.uniqueWithChain())){
      // 		if(!acc.find(x => x.identifiable() === accountUnique)){
      // 			acc.push(state.scatter.keychain.accounts.find(x => x.identifiable() === accountUnique));
      // 		}
      // 	}
      // 	return acc;
      // }, []);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Token();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (!json.hasOwnProperty('name') || !json.name.length) p.name = json.symbol;
      return p;
    }
  }, {
    key: "fromUnique",
    value: function fromUnique(unique) {
      var p = this.placeholder();

      var _unique$split = unique.split(':'),
          _unique$split2 = (0, _slicedToArray2["default"])(_unique$split, 4),
          blockchain = _unique$split2[0],
          contract = _unique$split2[1],
          symbol = _unique$split2[2],
          chainId = _unique$split2[3];

      p.blockchain = blockchain;
      p.contract = contract;
      p.symbol = symbol ? symbol.toUpperCase() : 'INVALID_TOKEN';
      p.chainId = chainId;
      p.decimals = _PluginRepository["default"].plugin(blockchain).defaultDecimals();
      return p;
    }
  }, {
    key: "sorter",
    value: function sorter(a, b) {
      var untouchable = !!b.unusable ? 1 : !!a.unusable ? -1 : 0;

      var systemTokenUniques = _StoreService["default"].get().state.scatter.networkTokens().map(function (x) {
        return x.uniqueWithChain(false);
      });

      var isSelfSystem = systemTokenUniques.includes(b.uniqueWithChain(false)) ? 1 : systemTokenUniques.includes(a.uniqueWithChain(false)) ? -1 : 0;
      return isSelfSystem || untouchable || (b.fiatBalance(false) || 0) - (a.fiatBalance(false) || 0);
    }
  }]);
  return Token;
}();

exports["default"] = Token;

/***/ }),

/***/ "Hxfq":
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

var _aesOop = _interopRequireDefault(__webpack_require__("5lvq"));

var _Blockchains = __webpack_require__("F+MN");

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _ExternalWallet = _interopRequireDefault(__webpack_require__("+Ze5"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Keypair =
/*#__PURE__*/
function () {
  function Keypair() {
    var blockchains = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2["default"])(this, Keypair);
    this.id = _IdGenerator["default"].text(24);
    this.name = '';
    this.privateKey = '';
    this.external = null;
    this.fork = null;
    this.publicKeys = [];
    this.blockchains = blockchains;
    this.createdAt = +new Date();
  }

  (0, _createClass2["default"])(Keypair, [{
    key: "resetExternal",
    value: function resetExternal() {
      this.external["interface"].close();
      this.external["interface"].open(); // this.external = ExternalWallet.fromJson(this.external);
    }
  }, {
    key: "accounts",
    value: function accounts() {
      var _this = this;

      var unique = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var accounts = _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
        return x.keypairUnique === _this.unique();
      });

      if (!unique) return accounts;
      return accounts.reduce(function (acc, account) {
        if (!acc.find(function (x) {
          return account.network().unique() === x.network().unique() && account.sendable() === x.sendable();
        })) acc.push(account);
        return acc;
      }, []);
    }
  }, {
    key: "enabledKey",
    value: function enabledKey() {
      var _this2 = this;

      return this.publicKeys.find(function (x) {
        return x.blockchain === _this2.blockchains[0];
      });
    }
  }, {
    key: "isUnique",
    value: function isUnique() {
      var _this3 = this;

      return !_StoreService["default"].get().state.scatter.keychain.keypairs.find(function (x) {
        return x.enabledKey().key === _this3.enabledKey().key;
      });
    }
  }, {
    key: "setName",
    value: function setName() {
      this.name = "".concat((0, _Blockchains.blockchainName)(this.enabledKey().blockchain), " Key - ").concat(new Date().toDateString(), " - ").concat(_IdGenerator["default"].text(4));
    }
  }, {
    key: "unique",
    value: function unique() {
      return this.id;
    }
  }, {
    key: "clone",
    value: function clone() {
      return Keypair.fromJson(JSON.parse(JSON.stringify(this)));
    }
    /***
     * Checks whether a private key is encrypted
     * @returns {boolean}
     */

  }, {
    key: "isEncrypted",
    value: function isEncrypted() {
      return typeof this.privateKey === 'string' && this.privateKey.length > 100;
    }
    /***
     * Encrypts this Keypair's Private Key
     * @param seed - The seed to encrypt with
     */

  }, {
    key: "encrypt",
    value: function encrypt(seed) {
      if (!this.isEncrypted()) this.privateKey = _aesOop["default"].encrypt(this.privateKey, seed);
    }
    /***
     * Decrypts this Keypair's Private Key
     * @param seed - The seed to decrypt with
     */

  }, {
    key: "decrypt",
    value: function decrypt(seed) {
      if (this.isEncrypted()) {
        this.privateKey = _aesOop["default"].decrypt(this.privateKey, seed);
        if ((0, _typeof2["default"])(this.privateKey) === 'object' && this.privateKey.hasOwnProperty('data')) this.privateKey = this.privateKey.data;
      }
    }
  }], [{
    key: "placeholder",
    value: function placeholder(blockchains) {
      return new Keypair(blockchains);
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (json.hasOwnProperty('external') && !!json.external) p.external = _ExternalWallet["default"].fromJson(json.external);
      return p;
    }
  }]);
  return Keypair;
}();

exports["default"] = Keypair;

/***/ }),

/***/ "IMve":
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

var PluginTypes = _interopRequireWildcard(__webpack_require__("ROq3"));

var _Blockchains = __webpack_require__("F+MN");

var _TestingHelper = __webpack_require__("Srzz");

var _Explorer = _interopRequireDefault(__webpack_require__("DgqZ"));

/***
 * Setting up for plugin based generators,
 * this will add more blockchain compatibility in the future.
 */
var PluginRepositorySingleton =
/*#__PURE__*/
function () {
  function PluginRepositorySingleton() {
    (0, _classCallCheck2["default"])(this, PluginRepositorySingleton);
    this.plugins = [];
  }

  (0, _createClass2["default"])(PluginRepositorySingleton, [{
    key: "loadPlugins",
    value: function loadPlugins(plugins) {
      var _this = this;

      plugins.map(function (plugin) {
        return _this.plugins.push(new plugin());
      });
    }
  }, {
    key: "signatureProviders",
    value: function signatureProviders() {
      return this.plugins.filter(function (plugin) {
        return plugin.type === PluginTypes.BLOCKCHAIN_SUPPORT;
      });
    }
  }, {
    key: "plugin",
    value: function plugin(name) {
      return this.plugins.find(function (plugin) {
        return plugin.name === name;
      });
    }
  }, {
    key: "defaultExplorers",
    value: function defaultExplorers() {
      var _this2 = this;

      return _Blockchains.BlockchainsArray.reduce(function (acc, x) {
        if (_this2.plugin(x.value)) {
          acc[x.value] = _Explorer["default"].fromJson({
            raw: _this2.plugin(x.value).defaultExplorer()
          });
        }

        return acc;
      }, {});
    }
  }, {
    key: "bustCaches",
    value: function bustCaches() {
      this.signatureProviders().map(function (sp) {
        return sp.bustCache();
      });
    }
  }]);
  return PluginRepositorySingleton;
}();

var PluginRepository = new PluginRepositorySingleton();
var _default = PluginRepository;
exports["default"] = _default;

/***/ }),

/***/ "Jimu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ErrorCodes = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var ErrorTypes = _interopRequireWildcard(__webpack_require__("nfii"));

var ErrorCodes = {
  NO_SIGNATURE: 402,
  FORBIDDEN: 403,
  TIMED_OUT: 408,
  LOCKED: 423,
  UPGRADE_REQUIRED: 426,
  TOO_MANY_REQUESTS: 429
};
exports.ErrorCodes = ErrorCodes;

var Error =
/*#__PURE__*/
function () {
  function Error(_type, _message) {
    var _code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ErrorCodes.LOCKED;

    (0, _classCallCheck2["default"])(this, Error);
    this.type = _type;
    this.message = _message;
    this.code = _code;
    this.isError = true;
  }

  (0, _createClass2["default"])(Error, null, [{
    key: "locked",
    value: function locked() {
      return new Error(ErrorTypes.LOCKED, "The user's Scatter is locked. They have been notified and should unlock before continuing.");
    }
  }, {
    key: "signatureError",
    value: function signatureError(_type, _message) {
      return new Error(_type, _message, ErrorCodes.NO_SIGNATURE);
    }
  }, {
    key: "malicious",
    value: function malicious(_message) {
      return new Error(ErrorTypes.MALICIOUS, _message, ErrorCodes.FORBIDDEN);
    }
  }, {
    key: "rejected",
    value: function rejected() {
      return new Error(ErrorTypes.REJECTED, 'The user rejected the request.', ErrorCodes.NO_SIGNATURE);
    }
  }, {
    key: "identityMissing",
    value: function identityMissing() {
      return this.signatureError("identity_missing", "Identity no longer exists on the user's keychain or user is not logged in.");
    }
  }, {
    key: "badNetwork",
    value: function badNetwork() {
      return this.signatureError("bad_network", "The network you provided is malformed.");
    }
  }, {
    key: "noKeypair",
    value: function noKeypair() {
      return this.signatureError("no_keypair", "The public key you provided does not exist on the user's keychain.");
    }
  }, {
    key: "signatureAccountMissing",
    value: function signatureAccountMissing() {
      return this.signatureError("account_missing", "You are trying to sign a request with an account that isn't currently linked or doesn't exist in the user's Scatter");
    }
  }, {
    key: "cantParseTransaction",
    value: function cantParseTransaction() {
      return this.signatureError("parsing_error", "Something happened while trying to parse the transaction internally.");
    }
  }, {
    key: "noNetwork",
    value: function noNetwork() {
      return this.signatureError("no_network", "This user does not have this network in their Scatter.");
    }
  }]);
  return Error;
}();

exports["default"] = Error;

/***/ }),

/***/ "MG8j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var Locale =
/*#__PURE__*/
function () {
  function Locale() {
    (0, _classCallCheck2["default"])(this, Locale);
    this.raw = null;
    this.name = null;
    this.methods = {};
    this.locales = {};
  }

  (0, _createClass2["default"])(Locale, [{
    key: "parsed",
    value: function parsed() {
      return Locale.fromRaw(JSON.parse(this.raw));
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Locale();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }, {
    key: "fromRaw",
    value: function fromRaw(raw) {
      if (!raw) return this.placeholder();
      var p = this.placeholder();
      p.raw = raw;
      p.name = raw.name;
      raw.methods.map(function (x) {
        p.methods[x.name] = new Function(x.args, x.body);
      });
      Object.keys(raw.locales).map(function (key) {
        p.locales[key] = function (x) {
          var parseString = function parseString(s) {
            s = s.replace('{x}', x);
            Object.keys(p.methods).map(function (method) {
              return s = s.replace("{".concat(method, "}"), p.methods[method](x));
            });
            return s;
          };

          if (typeof raw.locales[key] === 'string') return parseString(raw.locales[key]);else return raw.locales[key].map(function (x) {
            return parseString(x);
          });
        };
      });
      return p;
    }
  }]);
  return Locale;
}();

exports["default"] = Locale;

/***/ }),

/***/ "MIez":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var Plugin = function Plugin() {
  var _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _classCallCheck2["default"])(this, Plugin);
  this.name = _name;
  this.type = _type;
};

exports["default"] = Plugin;

/***/ }),

/***/ "Mb++":
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

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Meta = _interopRequireDefault(__webpack_require__("6NZL"));

var _Keychain = _interopRequireDefault(__webpack_require__("/gdi"));

var _Settings = _interopRequireDefault(__webpack_require__("gbBq"));

var _aesOop = _interopRequireDefault(__webpack_require__("5lvq"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Identity = _interopRequireWildcard(__webpack_require__("EY8S"));

var _Contact = _interopRequireDefault(__webpack_require__("hS4g"));

var Scatter =
/*#__PURE__*/
function () {
  function Scatter() {
    (0, _classCallCheck2["default"])(this, Scatter);
    this.meta = _Meta["default"].placeholder();
    this.keychain = _Keychain["default"].placeholder();
    this.settings = _Settings["default"].placeholder();
    this.contacts = [];
    this.hash = _Hasher["default"].unsaltedQuickHash(_IdGenerator["default"].text(2048));
    this.onboarded = false;
    this.pin = null;
    this.pinForAll = false;
  }

  (0, _createClass2["default"])(Scatter, [{
    key: "clone",
    value: function clone() {
      return Scatter.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "isEncrypted",
    value: function isEncrypted() {
      return (0, _typeof2["default"])(this.keychain) !== 'object';
    }
    /***
     * Encrypts the entire keychain
     * @param seed - The seed to encrypt with
     */

  }, {
    key: "decrypt",
    value: function decrypt(seed) {
      if (this.isEncrypted()) this.keychain = _Keychain["default"].fromJson(_aesOop["default"].decrypt(this.keychain, seed));
    }
    /***
     * Decrypts the entire keychain
     * @param seed - The seed to decrypt with
     */

  }, {
    key: "encrypt",
    value: function encrypt(seed) {
      if (!this.isEncrypted()) this.keychain = _aesOop["default"].encrypt(this.keychain, seed);
    }
  }, {
    key: "savable",
    value: function savable(seed) {
      // Encrypting in-place.
      this.keychain.cards.map(function (card) {
        return card.encrypt(seed);
      });
      this.keychain.keypairs.map(function (keypair) {
        return keypair.encrypt(seed);
      });
      this.keychain.identities.map(function (id) {
        return id.encrypt(seed);
      }); // Encrypting clone

      var clone = this.clone();
      clone.encrypt(seed);
      return clone;
    }
    /*************************************/

    /************  HELPERS   *************/

    /*************************************/

  }, {
    key: "networkTokens",
    value: function networkTokens() {
      return this.settings.networks.map(function (x) {
        var token = x.systemToken();
        token.chainId = x.chainId;
        return token;
      }).reduce(function (acc, token) {
        var exists = acc.find(function (x) {
          return x.unique() === token.unique() && x.chainId === token.chainId;
        });
        if (!exists) acc.push(token);
        return acc;
      }, []);
    }
  }, {
    key: "allTokens",
    value: function allTokens() {
      return this.networkTokens().concat(this.settings.tokens);
    }
  }], [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var scatter, firstIdentity;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scatter = new Scatter();
                _context2.next = 3;
                return Promise.all(_PluginRepository["default"].signatureProviders().map(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(plugin) {
                    var network;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            network = plugin.getEndorsedNetwork();
                            scatter.settings.networks.push(network);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 3:
                firstIdentity = _Identity["default"].placeholder();
                _context2.next = 6;
                return firstIdentity.initialize(scatter.hash);

              case 6:
                firstIdentity.name = 'MyFirstIdentity';
                scatter.keychain.locations = [_Identity.LocationInformation.fromJson({
                  name: 'Home'
                })];
                firstIdentity.location = scatter.keychain.locations[0];
                scatter.keychain.updateOrPushIdentity(firstIdentity);
                return _context2.abrupt("return", scatter);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "placeholder",
    value: function placeholder() {
      return new Scatter();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (json.hasOwnProperty('meta')) p.meta = _Meta["default"].fromJson(json.meta);
      if (json.hasOwnProperty('settings')) p.settings = _Settings["default"].fromJson(json.settings);
      if (json.hasOwnProperty('keychain')) p.keychain = typeof json.keychain === 'string' ? json.keychain : _Keychain["default"].fromJson(json.keychain);
      if (json.hasOwnProperty('contacts')) p.contacts = json.contacts.map(function (x) {
        return _Contact["default"].fromJson(x);
      });
      return p;
    }
  }]);
  return Scatter;
}();

exports["default"] = Scatter;

/***/ }),

/***/ "Ouh5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var _Identity = __webpack_require__("EY8S");

var Permission =
/*#__PURE__*/
function () {
  function Permission() {
    (0, _classCallCheck2["default"])(this, Permission);
    this.id = _IdGenerator["default"].numeric(24); // Mandatory

    this.origin = '';
    this.identity = '';
    this.accounts = []; // Optional

    this.contract = null;
    this.contractHash = null;
    this.action = null;
    this.mutableActionFields = [];
    this.immutableActionFields = [];
    this.timestamp = 0;
    this.identityRequirements = [];
    this.isIdentity = false;
    this.isIdentityRequirements = false;
    this.isContractAction = false;
  }

  (0, _createClass2["default"])(Permission, [{
    key: "clone",
    value: function clone() {
      return Permission.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "checksum",
    value: function checksum() {
      return _Hasher["default"].unsaltedQuickHash(this.origin + this.identity + (this.accounts || []).join(',') + this.contract + this.contractHash + this.action + (this.identityRequirements || []).join(','));
    }
  }, {
    key: "getIdentity",
    value: function getIdentity() {
      return _StoreService["default"].get().state.scatter.keychain.findIdentity(this.identity);
    }
  }, {
    key: "getAccounts",
    value: function getAccounts() {
      var accounts = _StoreService["default"].get().state.scatter.keychain.accounts;

      return this.accounts.map(function (unique) {
        return accounts.find(function (x) {
          return x.unique() === unique;
        });
      });
    }
  }, {
    key: "isIdentityPermissionFor",
    value: function isIdentityPermissionFor(origin) {
      return this.isIdentity && this.origin === origin;
    }
  }, {
    key: "asIdentityRequirements",
    value: function asIdentityRequirements() {
      return _Identity.IdentityRequiredFields.fromPermission(this.identityRequirements);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Permission();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }, {
    key: "fromAction",
    value: function fromAction(origin, identity, accounts, added) {
      var base = Permission.fromJson({
        origin: origin,
        identity: identity.id,
        accounts: accounts.map(function (x) {
          return x.unique();
        })
      });
      return Object.assign(base, added);
    }
  }, {
    key: "createImmutableFieldsHash",
    value: function createImmutableFieldsHash(allFields, mutableFields) {
      return _Hasher["default"].unsaltedQuickHash(Object.keys(allFields).map(function (key) {
        if (!mutableFields.includes(key)) return allFields[key];else return null;
      }).filter(function (x) {
        return x;
      }).sort().join(','));
    }
  }]);
  return Permission;
}();

exports["default"] = Permission;

/***/ }),

/***/ "ROq3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BLOCKCHAIN_SUPPORT = void 0;
var BLOCKCHAIN_SUPPORT = 'blockchain_support';
exports.BLOCKCHAIN_SUPPORT = BLOCKCHAIN_SUPPORT;

/***/ }),

/***/ "Z4IU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Plugin = _interopRequireDefault(__webpack_require__("MIez"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var PluginTypes = _interopRequireWildcard(__webpack_require__("ROq3"));

var _default = {
  Plugin: _Plugin["default"],
  PluginRepository: _PluginRepository["default"],
  PluginTypes: PluginTypes
};
exports["default"] = _default;

/***/ }),

/***/ "bUKF":
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

var _Blockchains = __webpack_require__("F+MN");

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _StoreService = _interopRequireDefault(__webpack_require__("pk5N"));

var Account =
/*#__PURE__*/
function () {
  function Account() {
    (0, _classCallCheck2["default"])(this, Account);
    this.keypairUnique = '';
    this.networkUnique = '';
    this.publicKey = '';
    this.name = '';
    this.authority = '';
    this.logins = 0;
    this.createdAt = +new Date();
    this.fromOrigin = null;
  }

  (0, _createClass2["default"])(Account, [{
    key: "sendable",
    value: function sendable() {
      return _PluginRepository["default"].plugin(this.blockchain()).accountsAreImported() ? this.name : this.publicKey;
    }
  }, {
    key: "formatted",
    value: function formatted() {
      return _PluginRepository["default"].plugin(this.blockchain()).accountFormatter(this);
    }
  }, {
    key: "network",
    value: function network() {
      var _this = this;

      return _StoreService["default"].get().state.scatter.settings.networks.find(function (x) {
        return x.unique() === _this.networkUnique;
      });
    }
  }, {
    key: "keypair",
    value: function keypair() {
      var _this2 = this;

      return _StoreService["default"].get().state.scatter.keychain.keypairs.find(function (x) {
        return x.unique() === _this2.keypairUnique;
      });
    }
  }, {
    key: "blockchain",
    value: function blockchain() {
      var _this3 = this;

      if (!this.keypair()) return console.error('account.blockchain() error');
      return this.keypair().publicKeys.find(function (x) {
        return x.key === _this3.publicKey;
      }).blockchain;
    }
  }, {
    key: "authorities",
    value: function authorities() {
      var _this4 = this;

      var thisKeyOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.authority.length) return [];
      return _StoreService["default"].get().state.scatter.keychain.accounts.filter(function (x) {
        return x.identifiable() === _this4.identifiable() && (!thisKeyOnly || x.keypairUnique === _this4.keypairUnique);
      }).sort(function (a, b) {
        return a.authority.localeCompare(b.authority);
      });
    }
  }, {
    key: "hasDangerousAuthority",
    value: function hasDangerousAuthority() {
      return this.authorities().find(function (x) {
        return x.authority === 'owner';
      });
    }
  }, {
    key: "unique",
    value: function unique() {
      return this.keypairUnique + this.networkUnique + this.name + this.authority + this.publicKey;
    }
  }, {
    key: "identifiable",
    value: function identifiable() {
      return this.networkUnique + this.sendable();
    }
  }, {
    key: "clone",
    value: function clone() {
      return Account.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "asReturnable",
    value: function asReturnable() {
      var returnable = _PluginRepository["default"].plugin(this.blockchain()).returnableAccount(this);

      returnable.chainId = this.network().chainId;
      returnable.isHardware = !!this.keypair().external;
      return returnable;
    }
  }, {
    key: "tokenCount",
    value: function tokenCount() {
      var systemToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!_StoreService["default"].get().state.balances) return 0;
      if (!_StoreService["default"].get().state.balances.hasOwnProperty(this.identifiable())) return 0;
      if (!_StoreService["default"].get().state.balances[this.identifiable()]) return 0;
      return _StoreService["default"].get().state.balances[this.identifiable()].filter(function (x) {
        return !systemToken ? true : x.identifiable() !== systemToken.identifiable();
      }).length;
    }
  }, {
    key: "tokens",
    value: function tokens() {
      var base = [this.network().systemToken()];
      if (!_StoreService["default"].get().state.balances) return base;
      if (!_StoreService["default"].get().state.balances.hasOwnProperty(this.identifiable())) return base;
      if (!_StoreService["default"].get().state.balances[this.identifiable()]) return base;
      return _StoreService["default"].get().state.balances[this.identifiable()];
    }
  }, {
    key: "balanceFor",
    value: function balanceFor(token) {
      return this.tokens().find(function (x) {
        return x.uniqueWithChain() === token.uniqueWithChain();
      });
    }
  }, {
    key: "systemBalance",
    value: function systemBalance() {
      var _this5 = this;

      var withSymbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!_StoreService["default"].get().state.balances) return 0;
      if (!_StoreService["default"].get().state.balances.hasOwnProperty(this.identifiable())) return 0;
      if (!_StoreService["default"].get().state.balances[this.identifiable()]) return 0;

      var systemBalance = _StoreService["default"].get().state.balances[this.identifiable()].find(function (x) {
        return _Token["default"].fromJson(x).identifiable() === _this5.network().systemToken().identifiable();
      });

      if (!systemBalance) return 0;
      return "".concat(systemBalance.amount, " ").concat(withSymbol ? systemBalance.symbol : '');
    }
  }, {
    key: "totalFiatBalance",
    value: function totalFiatBalance() {
      return this.tokens().reduce(function (acc, x) {
        acc += x.fiatBalance(false) ? parseFloat(x.fiatBalance(false)) : 0;
        return acc;
      }, 0).toFixed(2);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Account();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return Account;
}();

exports["default"] = Account;

/***/ }),

/***/ "eaOo":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v9.0.0
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if only one character,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var n,
        i = 1,
        m = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "fWDP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var migrator = _interopRequireWildcard(__webpack_require__("+Dqx"));

var _default = migrator;
exports["default"] = _default;

/***/ }),

/***/ "gbBq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SETTINGS_OPTIONS = exports.BACKUP_STRATEGIES = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _PluginRepository = _interopRequireDefault(__webpack_require__("IMve"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _Explorer = _interopRequireDefault(__webpack_require__("DgqZ"));

var BACKUP_STRATEGIES = {
  MANUAL: 'manual',
  AUTOMATIC: 'auto'
};
exports.BACKUP_STRATEGIES = BACKUP_STRATEGIES;
var SETTINGS_OPTIONS = {
  GENERAL: {
    locked: false,
    name: 'General'
  },
  TOKENS: {
    locked: false,
    name: 'Tokens'
  },
  EXPLORER: {
    locked: false,
    name: 'Explorers'
  },
  BACKUP: {
    locked: false,
    name: 'Backup'
  },
  FIREWALL: {
    locked: true,
    name: 'Firewall'
  },
  PASSWORD: {
    locked: true,
    name: 'Password'
  },
  DESTROY: {
    locked: true,
    name: 'Destroy'
  }
};
exports.SETTINGS_OPTIONS = SETTINGS_OPTIONS;

var Settings =
/*#__PURE__*/
function () {
  function Settings() {
    (0, _classCallCheck2["default"])(this, Settings);
    this.networks = [];
    this.language = 'English';
    this.autoBackup = BACKUP_STRATEGIES.AUTOMATIC;
    this.backupLocation = '';
    this.explorers = _PluginRepository["default"].defaultExplorers();
    this.showNotifications = true; // Tokens

    this.showMainnetsOnly = true;
    this.displayToken = null;
    this.displayCurrency = 'USD';
    this.tokens = [];
    this.blacklistTokens = []; // {contract:[actions]}

    this.blacklistActions = {
      'eos::eosio': ['updateauth'],
      'eos::eosio.msig': ['approve']
    };
    this.balanceFilters = {};
    this.hideMainBalance = false;
    this.simpleMode = false;
  }

  (0, _createClass2["default"])(Settings, [{
    key: "updateOrPushNetwork",
    value: function updateOrPushNetwork(network) {
      this.networks.find(function (n) {
        return n.id === network.id;
      }) ? this.networks = this.networks.map(function (n) {
        return n.id === network.id ? network : n;
      }) : this.networks.unshift(network);
    }
  }, {
    key: "removeNetwork",
    value: function removeNetwork(network) {
      this.networks = this.networks.filter(function (n) {
        return n.id !== network.id;
      });
    }
  }, {
    key: "blacklistAction",
    value: function blacklistAction(blockchain, contract, action) {
      if (!contract.length || !action.length) return;

      if (!this.blacklistActions.hasOwnProperty("".concat(blockchain, "::").concat(contract))) {
        this.blacklistActions["".concat(blockchain, "::").concat(contract)] = [];
      }

      this.blacklistActions["".concat(blockchain, "::").concat(contract)].push(action);
    }
  }, {
    key: "removeBlacklistedAction",
    value: function removeBlacklistedAction(blockchain, contract, action) {
      if (!this.blacklistActions.hasOwnProperty("".concat(blockchain, "::").concat(contract))) return;
      if (!this.blacklistActions["".concat(blockchain, "::").concat(contract)].includes(action)) return;
      if (this.blacklistActions["".concat(blockchain, "::").concat(contract)].length === 1) return delete this.blacklistActions["".concat(blockchain, "::").concat(contract)];
      this.blacklistActions["".concat(blockchain, "::").concat(contract)] = this.blacklistActions["".concat(blockchain, "::").concat(contract)].filter(function (x) {
        return x !== action;
      });
    }
  }, {
    key: "isActionBlacklisted",
    value: function isActionBlacklisted(actionTag) {
      var _actionTag$split = actionTag.split('::'),
          _actionTag$split2 = (0, _slicedToArray2["default"])(_actionTag$split, 3),
          blockchain = _actionTag$split2[0],
          contract = _actionTag$split2[1],
          action = _actionTag$split2[2];

      return this.blacklistActions.hasOwnProperty("".concat(blockchain, "::").concat(contract)) && this.blacklistActions["".concat(blockchain, "::").concat(contract)].includes(action);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Settings();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (json.hasOwnProperty('networks')) p.networks = json.networks.map(function (x) {
        return _Network["default"].fromJson(x);
      });
      if (json.hasOwnProperty('tokens')) p.tokens = json.tokens.map(function (x) {
        return _Token["default"].fromJson(x);
      });
      if (json.hasOwnProperty('blacklistTokens')) p.blacklistTokens = json.blacklistTokens.map(function (x) {
        return _Token["default"].fromJson(x);
      });
      if (json.hasOwnProperty('explorers')) p.explorers = Object.keys(json.explorers).reduce(function (acc, blockchain) {
        acc[blockchain] = _Explorer["default"].fromRaw(json.explorers[blockchain].raw);
        return acc;
      }, {});
      return p;
    }
  }]);
  return Settings;
}();

exports["default"] = Settings;

/***/ }),

/***/ "hS4g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Blockchains = __webpack_require__("F+MN");

var Contact =
/*#__PURE__*/
function () {
  function Contact() {
    var _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _recipient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _blockchain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    (0, _classCallCheck2["default"])(this, Contact);
    this.id = _IdGenerator["default"].text(24);
    this.name = _name;
    this.recipient = _recipient;
    this.blockchain = _blockchain;
  }

  (0, _createClass2["default"])(Contact, [{
    key: "unique",
    value: function unique() {
      return "".concat(this.blockchain, "::").concat(this.recipient, "::").concat(this.name).toLowerCase().trim();
    }
  }, {
    key: "clone",
    value: function clone() {
      return Contact.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new Contact();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return Contact;
}();

exports["default"] = Contact;

/***/ }),

/***/ "knbK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__("rcxp"));

var _index2 = _interopRequireDefault(__webpack_require__("0fbR"));

var _index3 = _interopRequireDefault(__webpack_require__("0/ky"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _AccountAction = _interopRequireDefault(__webpack_require__("CC+F"));

var _AuthorizedApp = _interopRequireDefault(__webpack_require__("zAsq"));

var Blockchains = _interopRequireWildcard(__webpack_require__("F+MN"));

var _Contact = _interopRequireDefault(__webpack_require__("hS4g"));

var _CreditCard = _interopRequireDefault(__webpack_require__("zc85"));

var _Explorer = _interopRequireDefault(__webpack_require__("DgqZ"));

var _Identity = _interopRequireDefault(__webpack_require__("EY8S"));

var _Keychain = _interopRequireDefault(__webpack_require__("/gdi"));

var _Keypair = _interopRequireDefault(__webpack_require__("Hxfq"));

var _Locale = _interopRequireDefault(__webpack_require__("MG8j"));

var _Meta = _interopRequireDefault(__webpack_require__("6NZL"));

var _Network = _interopRequireDefault(__webpack_require__("78si"));

var _Permission = _interopRequireDefault(__webpack_require__("Ouh5"));

var _Scatter = _interopRequireDefault(__webpack_require__("Mb++"));

var _Settings = _interopRequireDefault(__webpack_require__("gbBq"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var _default = {
  api: _index["default"],
  hardware: _index2["default"],
  histories: _index3["default"],
  Account: _Account["default"],
  AccountAction: _AccountAction["default"],
  AuthorizedApp: _AuthorizedApp["default"],
  Blockchains: Blockchains,
  Contact: _Contact["default"],
  CreditCard: _CreditCard["default"],
  Explorer: _Explorer["default"],
  Identity: _Identity["default"],
  Keychain: _Keychain["default"],
  Keypair: _Keypair["default"],
  Locale: _Locale["default"],
  Meta: _Meta["default"],
  Network: _Network["default"],
  Permission: _Permission["default"],
  Scatter: _Scatter["default"],
  Settings: _Settings["default"],
  Token: _Token["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "nfii":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REJECTED = exports.UPGRADE_REQUIRED = exports.PROMPT_CLOSED = exports.LOCKED = exports.MALICIOUS = void 0;
var MALICIOUS = 'malicious';
exports.MALICIOUS = MALICIOUS;
var LOCKED = 'locked';
exports.LOCKED = LOCKED;
var PROMPT_CLOSED = 'prompt_closed';
exports.PROMPT_CLOSED = PROMPT_CLOSED;
var UPGRADE_REQUIRED = 'upgrade_required';
exports.UPGRADE_REQUIRED = UPGRADE_REQUIRED;
var REJECTED = 'rejected';
exports.REJECTED = REJECTED;

/***/ }),

/***/ "rcxp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ApiActions = _interopRequireWildcard(__webpack_require__("+nw1"));

var _default = {
  ApiActions: ApiActions
};
exports["default"] = _default;

/***/ }),

/***/ "ssXz":
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

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _History2 = _interopRequireWildcard(__webpack_require__("EnWD"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var _Token = _interopRequireDefault(__webpack_require__("GwxU"));

var HistoricTransfer =
/*#__PURE__*/
function (_History) {
  (0, _inherits2["default"])(HistoricTransfer, _History);

  function HistoricTransfer(from, to, token, amount) {
    var _this;

    var memo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var txid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    (0, _classCallCheck2["default"])(this, HistoricTransfer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HistoricTransfer).call(this, _History2.HISTORY_TYPES.Transfer, txid));
    _this.from = from;
    _this.to = to;
    _this.token = token;
    _this.amount = amount;
    _this.memo = memo;
    return _this;
  }

  (0, _createClass2["default"])(HistoricTransfer, null, [{
    key: "placeholder",
    value: function placeholder() {
      return new HistoricTransfer();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      p.from = _Account["default"].fromJson(json.from);
      p.token = _Token["default"].fromJson(json.token);
      return p;
    }
  }]);
  return HistoricTransfer;
}(_History2["default"]);

exports["default"] = HistoricTransfer;

/***/ }),

/***/ "wy8C":
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

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _History2 = _interopRequireWildcard(__webpack_require__("EnWD"));

var _Account = _interopRequireDefault(__webpack_require__("bUKF"));

var HistoricAction =
/*#__PURE__*/
function (_History) {
  (0, _inherits2["default"])(HistoricAction, _History);

  function HistoricAction(account, action) {
    var _this;

    var txid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    (0, _classCallCheck2["default"])(this, HistoricAction);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HistoricAction).call(this, _History2.HISTORY_TYPES.Action, txid));
    _this.account = account instanceof _Account["default"] ? account.unique() : account;
    _this.action = action;
    return _this;
  }

  (0, _createClass2["default"])(HistoricAction, [{
    key: "clone",
    value: function clone() {
      return HistoricAction.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new HistoricAction();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return HistoricAction;
}(_History2["default"]);

exports["default"] = HistoricAction;

/***/ }),

/***/ "zAsq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Hasher = _interopRequireDefault(__webpack_require__("zugy"));

var AuthorizedApp =
/*#__PURE__*/
function () {
  function AuthorizedApp(_origin, _appkey) {
    (0, _classCallCheck2["default"])(this, AuthorizedApp);
    this.origin = _origin;
    this.appkey = _appkey;
    this.nextNonce = '';
    this.createdAt = +new Date();
  }

  (0, _createClass2["default"])(AuthorizedApp, [{
    key: "checkKey",
    value: function checkKey(hashed) {
      return hashed === this.hashed();
    }
  }, {
    key: "hashed",
    value: function hashed() {
      return _Hasher["default"].unsaltedQuickHash(this.appkey);
    }
  }, {
    key: "checkNonce",
    value: function checkNonce(nonce) {
      return this.nextNonce === _Hasher["default"].unsaltedQuickHash(nonce);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new AuthorizedApp();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return AuthorizedApp;
}();

exports["default"] = AuthorizedApp;

/***/ }),

/***/ "zc85":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CreditCardSecureProperties = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _aesOop = _interopRequireDefault(__webpack_require__("5lvq"));

var _IdGenerator = _interopRequireDefault(__webpack_require__("SDtL"));

var _Crypto = _interopRequireDefault(__webpack_require__("lkGv"));

var _Keychain = _interopRequireDefault(__webpack_require__("/gdi"));

var CreditCardSecureProperties =
/*#__PURE__*/
function () {
  function CreditCardSecureProperties() {
    (0, _classCallCheck2["default"])(this, CreditCardSecureProperties);
    this.number = '';
    this.authTokens = {};
    this.expiration = '';
    this.cardHash = '';
    this.personalInformation = {};
  }

  (0, _createClass2["default"])(CreditCardSecureProperties, [{
    key: "clone",
    value: function clone() {
      return CreditCardSecureProperties.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new CreditCardSecureProperties();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      return Object.assign(this.placeholder(), json);
    }
  }]);
  return CreditCardSecureProperties;
}();

exports.CreditCardSecureProperties = CreditCardSecureProperties;

var CreditCard =
/*#__PURE__*/
function () {
  function CreditCard() {
    (0, _classCallCheck2["default"])(this, CreditCard);
    this.id = _IdGenerator["default"].text(24);
    this.name = '';
    this.lastFour = '';
    this.secure = CreditCardSecureProperties.placeholder();
    this.createdAt = +new Date();
  }

  (0, _createClass2["default"])(CreditCard, [{
    key: "unique",
    value: function unique() {
      return this.id;
    }
  }, {
    key: "clone",
    value: function clone() {
      return CreditCard.fromJson(JSON.parse(JSON.stringify(this)));
    }
  }, {
    key: "hash",
    value: function hash() {
      this.cardHash = _Crypto["default"].bufferToHash(this.secure.number);
    }
  }, {
    key: "isEncrypted",
    value: function isEncrypted() {
      return typeof this.secure === 'string';
    }
  }, {
    key: "encrypt",
    value: function encrypt(seed) {
      if (!this.isEncrypted()) this.secure = _aesOop["default"].encrypt(this.secure, seed);
    }
  }, {
    key: "decrypt",
    value: function decrypt(seed) {
      if (this.isEncrypted()) this.secure = _aesOop["default"].decrypt(this.secure, seed);
    }
  }], [{
    key: "placeholder",
    value: function placeholder() {
      return new CreditCard();
    }
  }, {
    key: "fromJson",
    value: function fromJson(json) {
      var p = Object.assign(this.placeholder(), json);
      if (json.hasOwnProperty('secure')) p.secure = typeof json.secure === 'string' ? json.secure : CreditCardSecureProperties.fromJson(json.secure);
      return p;
    }
  }]);
  return CreditCard;
}();

exports["default"] = CreditCard;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9taWdyYXRpb25zL21pZ3JhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9oYXJkd2FyZS9FeHRlcm5hbFdhbGxldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvYXBpL0FwaUFjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0tleWNoYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9oaXN0b3JpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2hhcmR3YXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9NZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9BY2NvdW50QWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9FeHBsb3Jlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvSWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2hpc3Rvcmllcy9IaXN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9CbG9ja2NoYWlucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvaGlzdG9yaWVzL0hpc3RvcmljRXhjaGFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1Rva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9LZXlwYWlyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL3BsdWdpbnMvUGx1Z2luUmVwb3NpdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvZXJyb3JzL0Vycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9Mb2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvcGx1Z2lucy9QbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1NjYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1Blcm1pc3Npb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvcGx1Z2lucy9QbHVnaW5UeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9BY2NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL25vZGVfbW9kdWxlcy9iaWdudW1iZXIuanMvYmlnbnVtYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21pZ3JhdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9Db250YWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2FsbGV0cGFjay9jb3JlL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvZXJyb3JzL0Vycm9yVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvaGlzdG9yaWVzL0hpc3RvcmljVHJhbnNmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2hpc3Rvcmllcy9IaXN0b3JpY0FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQXV0aG9yaXplZEFwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQ3JlZGl0Q2FyZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYiw2QkFBNkIsbUJBQU8sQ0FBQyxNQUE4Qzs7QUFFbkY7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSwwQ0FBMEMsbUJBQU8sQ0FBQyxNQUE0Qjs7QUFFOUUsZ0RBQWdELG1CQUFPLENBQUMsTUFBeUM7O0FBRWpHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsOEI7Ozs7Ozs7O0FDM0dhOztBQUViLDZCQUE2QixtQkFBTyxDQUFDLE1BQThDOztBQUVuRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDBDQUEwQyxtQkFBTyxDQUFDLE1BQTRCOztBQUU5RSxnREFBZ0QsbUJBQU8sQ0FBQyxNQUF5Qzs7QUFFakcsOENBQThDLG1CQUFPLENBQUMsTUFBdUM7O0FBRTdGLDhDQUE4QyxtQkFBTyxDQUFDLE1BQXVDOztBQUU3RiwyQ0FBMkMsbUJBQU8sQ0FBQyxNQUFvQzs7QUFFdkYsMENBQTBDLG1CQUFPLENBQUMsTUFBd0I7O0FBRTFFLDBCQUEwQixjQUFjLGlCQUFpQixHQUFHLGlCQUFpQjs7QUFFN0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCwwRDs7Ozs7Ozs7QUN6UGE7O0FBRWI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7O0FDckNhOztBQUViLDhCQUE4QixtQkFBTyxDQUFDLE1BQStDOztBQUVyRiw2QkFBNkIsbUJBQU8sQ0FBQyxNQUE4Qzs7QUFFbkY7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSw4Q0FBOEMsbUJBQU8sQ0FBQyxNQUF1Qzs7QUFFN0YsMkNBQTJDLG1CQUFPLENBQUMsTUFBb0M7O0FBRXZGLHdDQUF3QyxtQkFBTyxDQUFDLE1BQVk7O0FBRTVELHlDQUF5QyxtQkFBTyxDQUFDLE1BQWM7O0FBRS9ELHNDQUFzQyxtQkFBTyxDQUFDLE1BQVc7O0FBRXpELHNDQUFzQyxtQkFBTyxDQUFDLE1BQVc7O0FBRXpELDRDQUE0QyxtQkFBTyxDQUFDLE1BQWlCOztBQUVyRSx5Q0FBeUMsbUJBQU8sQ0FBQyxNQUFjOztBQUUvRCwyQ0FBMkMsbUJBQU8sQ0FBQyxNQUFrQzs7QUFFckYsc0NBQXNDLG1CQUFPLENBQUMsTUFBb0I7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFP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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCw2Qjs7Ozs7OztBQ3hMQSxtQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7QUFHZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHdEQUF3RDtBQUN6Rjs7O0FBR0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHdCQUF3QjtBQUNsQyxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLFNBQVM7O0FBRXZDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUCxvQ0FBb0MsbURBQW1ELEdBQUcsRUFBRTtBQUM1Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx1RkFBdUYsRUFBRTtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixTQUFTO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsMEJBQTBCOztBQUUzQztBQUNBLDRCQUE0Qiw4QkFBOEI7O0FBRTFEO0FBQ0E7O0FBRUEscUZBQXFGLEVBQUU7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsaUNBQWlDLFNBQVM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDLDJCQUEyQixPQUFPO0FBQ2xDLDJCQUEyQixnQkFBZ0I7QUFDM0MsMkJBQTJCLGdCQUFnQjtBQUMzQywyQkFBMkIsUUFBUTtBQUNuQywyQkFBMkIsT0FBTztBQUNsQyw4QkFBOEIsT0FBTztBQUNyQywyQkFBMkIsT0FBTztBQUNsQztBQUNBLDJCQUEyQixPQUFPO0FBQ2xDLG1DQUFtQztBQUNuQyxtQ0FBbUM7QUFDbkMsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxtQ0FBbUM7QUFDbkMsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUNBQXlDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDZCQUE2QixPQUFPO0FBQ3BDLGdEQUFnRCxtREFBbUQsR0FBRyxFQUFFO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLE9BQU87QUFDbkMsK0NBQStDLG1EQUFtRCxHQUFHLEVBQUU7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLGdEQUFnRCxtREFBbUQsR0FBRyxFQUFFO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQSx1Q0FBdUMsa0VBQWtFLEdBQUcsRUFBRTtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsUUFBUTtBQUM3QiwyREFBMkQsRUFBRTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLE9BQU87QUFDakMsNkNBQTZDLG1EQUFtRCxHQUFHLEVBQUU7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsT0FBTztBQUNuQywrQ0FBK0MsbURBQW1ELEdBQUcsRUFBRTtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQix1REFBdUQsRUFBRTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCLG1EQUFtRCxFQUFFO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVCxrREFBa0QsRUFBRTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSw4Q0FBOEMsRUFBRTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0Esb0NBQW9DLG1EQUFtRCxHQUFHLEdBQUc7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQ0FBMkM7QUFDakUsc0JBQXNCO0FBQ3RCLHdDQUF3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLE9BQU87O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBOztBQUVBLGtCQUFrQixPQUFPOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsWUFBWTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLHVCQUF1QixZQUFZOztBQUVuQztBQUNBLCtCQUErQixTQUFTOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUJBQWlCO0FBQzdCO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkIsaUNBQWlDLFFBQVE7O0FBRXpDOztBQUVBLHFCQUFxQixnQkFBZ0I7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLGNBQWM7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLFVBQVU7O0FBRXZDO0FBQ0EsK0JBQStCLFFBQVE7O0FBRXZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCwyQkFBMkIsUUFBUTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsdUJBQXVCO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCOztBQUUxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQWdDLFNBQVM7O0FBRXpDOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsU0FBUztBQUN6Qjs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsS0FBSztBQUM5QyxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGlCQUFpQjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLFNBQVM7O0FBRXJCO0FBQ0Esb0JBQW9CLFNBQVM7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBK0MsRUFBRTtBQUNqRCw0Q0FBNEMsRUFBRSxVQUFVLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSx5QkFBeUIsU0FBUzs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsRUFBRTs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0EsMkJBQTJCLFNBQVM7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsZUFBZTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBLG9DQUFvQyxtREFBbUQsR0FBRyxNQUFNO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsd0JBQXdCO0FBQ2xDLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0Esb0RBQW9ELEVBQUU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVksRUFBRTs7QUFFZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWCx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxvQ0FBb0MsbURBQW1ELEdBQUcsR0FBRztBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQSx1QkFBdUIsT0FBTzs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixLQUFLO0FBQzVCOztBQUVBO0FBQ0EsWUFBWSxPQUFPOztBQUVuQjtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxZQUFZOztBQUV4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsS0FBSzs7QUFFdkM7QUFDQTs7QUFFQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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QUNIO0FBQ0EsQ0FBQzs7QUFFRCxnQyIsImZpbGUiOiJ2ZW5kb3J+OWMzNTBkMGQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBleHBvcnRzLm1hdGhlbWF0aWNhbFZlcnNpb24gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgbWF0aGVtYXRpY2FsVmVyc2lvbiA9IGZ1bmN0aW9uIG1hdGhlbWF0aWNhbFZlcnNpb24odmVyc2lvbikge1xuICBpZiAoIXZlcnNpb24gfHwgdmVyc2lvbiA9PT0gJzAnKSByZXR1cm4gMDtcbiAgdmFyIHBhcnRzID0gdmVyc2lvbi5yZXBsYWNlKC9bLl0vZywgJ18nKS5yZXBsYWNlKC9bbV0vZywgJycpLnNwbGl0KCdfJyk7XG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHRocm93IG5ldyBFcnJvcihcIk1pZ3JhdGlvbiBlcnJvciwgaW52YWxpZCB2ZXJzaW9uXCIpO1xuICB2YXIgdG90YWwgPSAwO1xuICBwYXJ0cy5tYXAoZnVuY3Rpb24gKHYsIGkpIHtcbiAgICB2YXIgbXVsdGlwbGllciA9IGkgPT09IDAgPyAxMDAgOiBpID09PSAxID8gMTAgOiAxO1xuICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodikgKiBtdWx0aXBsaWVyO1xuICB9KTtcbiAgcmV0dXJuIHRvdGFsO1xufTtcblxuZXhwb3J0cy5tYXRoZW1hdGljYWxWZXJzaW9uID0gbWF0aGVtYXRpY2FsVmVyc2lvbjtcblxudmFyIGZuVG9WZXJzaW9uID0gZnVuY3Rpb24gZm5Ub1ZlcnNpb24oZm5OYW1lKSB7XG4gIHJldHVybiBmbk5hbWUucmVwbGFjZSgvW21dL2csICcnKS5yZXBsYWNlKC9bX10vZywgJy4nKTtcbn07XG5cbnZhciBfZGVmYXVsdCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAvKiNfX1BVUkVfXyovXG4gIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKHNjYXR0ZXIsIG1pZ3JhdG9ycykge1xuICAgIHZhciBsYXN0VmVyc2lvbiwgbmV4dFZlcnNpb25zLCBpO1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBzY2F0dGVyLm1ldGEucmVnZW5lcmF0ZVZlcnNpb24oKTtcblxuICAgICAgICAgICAgaWYgKCFzY2F0dGVyLmlzRW5jcnlwdGVkKCkpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGZhbHNlKTtcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGlmIChzY2F0dGVyLm1ldGEubmVlZHNVcGRhdGluZygpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBmYWxzZSk7XG5cbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBsYXN0VmVyc2lvbiA9IG1hdGhlbWF0aWNhbFZlcnNpb24oc2NhdHRlci5tZXRhLmxhc3RWZXJzaW9uKTtcbiAgICAgICAgICAgIG5leHRWZXJzaW9ucyA9IE9iamVjdC5rZXlzKG1pZ3JhdG9ycykuZmlsdGVyKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXRoZW1hdGljYWxWZXJzaW9uKHYpID4gbGFzdFZlcnNpb247XG4gICAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXRoZW1hdGljYWxWZXJzaW9uKGEpIC0gbWF0aGVtYXRpY2FsVmVyc2lvbihiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW5leHRWZXJzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBpZiAoIShpIDwgbmV4dFZlcnNpb25zLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEyO1xuICAgICAgICAgICAgcmV0dXJuIG1pZ3JhdG9yc1tuZXh0VmVyc2lvbnNbaV1dKHNjYXR0ZXIpO1xuXG4gICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA5O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgc2NhdHRlci5tZXRhLmxhc3RWZXJzaW9uID0gZm5Ub1ZlcnNpb24obmV4dFZlcnNpb25zW25leHRWZXJzaW9ucy5sZW5ndGggLSAxXSk7XG5cbiAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBuZXh0VmVyc2lvbnMubGVuZ3RoID4gMCk7XG5cbiAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBfY2FsbGVlKTtcbiAgfSkpO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3gsIF94Mikge1xuICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5FeHRlcm5hbFdhbGxldEludGVyZmFjZSA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5FWFRfV0FMTEVUX1RZUEVTID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9JZEdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWwvSWRHZW5lcmF0b3JcIikpO1xuXG52YXIgRVhUX1dBTExFVF9UWVBFUyA9IHt9OyAvLyBGb3JtYXQgWyB7dHlwZSxuYW1lLHdhbGxldH0sIHt0eXBlLG5hbWUsd2FsbGV0fSBdXG5cbmV4cG9ydHMuRVhUX1dBTExFVF9UWVBFUyA9IEVYVF9XQUxMRVRfVFlQRVM7XG52YXIgV0FMTEVUUyA9IFtdO1xuXG52YXIgRXh0ZXJuYWxXYWxsZXQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEV4dGVybmFsV2FsbGV0LCBudWxsLCBbe1xuICAgIGtleTogXCJsb2FkV2FsbGV0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkV2FsbGV0cyhfd2FsbGV0cykge1xuICAgICAgZXhwb3J0cy5FWFRfV0FMTEVUX1RZUEVTID0gRVhUX1dBTExFVF9UWVBFUyA9IF93YWxsZXRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh7fSwgeC50eXBlLCB4Lm5hbWUpO1xuICAgICAgfSk7XG4gICAgICBXQUxMRVRTID0gX3dhbGxldHM7XG4gICAgfVxuICB9XSk7XG5cbiAgZnVuY3Rpb24gRXh0ZXJuYWxXYWxsZXQoKSB7XG4gICAgdmFyIF90eXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuXG4gICAgdmFyIF9ibG9ja2NoYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBFeHRlcm5hbFdhbGxldCk7XG4gICAgdGhpcy5pZCA9IF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0udGV4dCg2NCk7XG4gICAgdGhpcy50eXBlID0gX3R5cGU7XG4gICAgdGhpcy5ibG9ja2NoYWluID0gX2Jsb2NrY2hhaW47XG4gICAgdGhpcy5hZGRyZXNzSW5kZXggPSAwO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShFeHRlcm5hbFdhbGxldCwgW3tcbiAgICBrZXk6IFwic2V0dXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICB0aGlzW1wiaW50ZXJmYWNlXCJdID0gZ2V0SW50ZXJmYWNlKHRoaXMudHlwZSwgdGhpcy5ibG9ja2NoYWluKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgRXh0ZXJuYWxXYWxsZXQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEV4dGVybmFsV2FsbGV0O1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4dGVybmFsV2FsbGV0O1xuXG52YXIgZ2V0SW50ZXJmYWNlID0gZnVuY3Rpb24gZ2V0SW50ZXJmYWNlKHR5cGUsIGJsb2NrY2hhaW4pIHtcbiAgaWYgKEVYVF9XQUxMRVRfVFlQRVMuaGFzT3duUHJvcGVydHkodHlwZSkpIHJldHVybiBXQUxMRVRTW3R5cGVdLndhbGxldC50eXBlVG9JbnRlcmZhY2UoYmxvY2tjaGFpbik7XG4gIHJldHVybiBjb25zb2xlLmVycm9yKCdUeXBlIG5vdCBkZWZpbmVkIGluIGhhcmR3YXJlIHdhbGxldHMnKTtcbn07XG5cbnZhciBFeHRlcm5hbFdhbGxldEludGVyZmFjZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV4dGVybmFsV2FsbGV0SW50ZXJmYWNlKGhhbmRsZXIpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEV4dGVybmFsV2FsbGV0SW50ZXJmYWNlKTtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShFeHRlcm5hbFdhbGxldEludGVyZmFjZSwgW3tcbiAgICBrZXk6IFwib3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX29wZW4gPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSgpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm9wZW4oKTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCBfY29udGV4dC5zZW50KTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2NhbGxlZSwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiBfb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3BlbjtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJjbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2Nsb3NlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKCkge1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDIuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMiwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gX2Nsb3NlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbG9zZTtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJjYW5Db25uZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY2FuQ29ubmVjdCA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMygpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuY2FuQ29ubmVjdCgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDMuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlMywgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNhbkNvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiBfY2FuQ29ubmVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FuQ29ubmVjdDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogXCJzaWduXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfc2lnbiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNChwdWJsaWNLZXksIHRyYW5zYWN0aW9uLCBhYmksIG5ldHdvcmspIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNCQoX2NvbnRleHQ0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuc2lnbihwdWJsaWNLZXksIHRyYW5zYWN0aW9uLCBhYmksIG5ldHdvcmspO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LmFicnVwdChcInJldHVyblwiLCBfY29udGV4dDQuc2VudCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlNCwgdGhpcyk7XG4gICAgICB9KSk7XG5cbiAgICAgIGZ1bmN0aW9uIHNpZ24oX3gsIF94MiwgX3gzLCBfeDQpIHtcbiAgICAgICAgcmV0dXJuIF9zaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWduO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcImdldFB1YmxpY0tleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2dldFB1YmxpY0tleSA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlNSgpIHtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ1LnByZXYgPSBfY29udGV4dDUubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQ1Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0UHVibGljS2V5KCk7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDUuYWJydXB0KFwicmV0dXJuXCIsIF9jb250ZXh0NS5zZW50KTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWU1LCB0aGlzKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0UHVibGljS2V5KCkge1xuICAgICAgICByZXR1cm4gX2dldFB1YmxpY0tleS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0UHVibGljS2V5O1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInNldEFkZHJlc3NJbmRleFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBZGRyZXNzSW5kZXgocGF0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5zZXRBZGRyZXNzSW5kZXgocGF0aCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImF2YWlsYWJsZUJsb2NrY2hhaW5zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF2YWlsYWJsZUJsb2NrY2hhaW5zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5hdmFpbGFibGVCbG9ja2NoYWlucygpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRXh0ZXJuYWxXYWxsZXRJbnRlcmZhY2U7XG59KCk7XG5cbmV4cG9ydHMuRXh0ZXJuYWxXYWxsZXRJbnRlcmZhY2UgPSBFeHRlcm5hbFdhbGxldEludGVyZmFjZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVVBEQVRFX0lERU5USVRZID0gZXhwb3J0cy5BVVRIRU5USUNBVEUgPSBleHBvcnRzLlNVR0dFU1RfTkVUV09SSyA9IGV4cG9ydHMuU0lHTl9BUkJJVFJBUlkgPSBleHBvcnRzLkFERF9UT0tFTiA9IGV4cG9ydHMuU0lHTiA9IGV4cG9ydHMuVFJBTlNGRVIgPSBleHBvcnRzLkxPR09VVCA9IGV4cG9ydHMuSURFTlRJVFlfRlJPTV9QRVJNSVNTSU9OUyA9IGV4cG9ydHMuR0VUX0FWQVRBUiA9IGV4cG9ydHMuTE9HSU5fQUxMID0gZXhwb3J0cy5MT0dJTiA9IGV4cG9ydHMuSEFTX0FDQ09VTlRfRk9SID0gZXhwb3J0cy5MSU5LX0FDQ09VTlQgPSBleHBvcnRzLkdFVF9QVUJMSUNfS0VZID0gZXhwb3J0cy5HRVRfVkVSU0lPTiA9IHZvaWQgMDtcbnZhciBHRVRfVkVSU0lPTiA9ICdnZXRWZXJzaW9uJztcbmV4cG9ydHMuR0VUX1ZFUlNJT04gPSBHRVRfVkVSU0lPTjtcbnZhciBHRVRfUFVCTElDX0tFWSA9ICdnZXRQdWJsaWNLZXknO1xuZXhwb3J0cy5HRVRfUFVCTElDX0tFWSA9IEdFVF9QVUJMSUNfS0VZO1xudmFyIExJTktfQUNDT1VOVCA9ICdsaW5rQWNjb3VudCc7XG5leHBvcnRzLkxJTktfQUNDT1VOVCA9IExJTktfQUNDT1VOVDtcbnZhciBIQVNfQUNDT1VOVF9GT1IgPSAnaGFzQWNjb3VudEZvcic7XG5leHBvcnRzLkhBU19BQ0NPVU5UX0ZPUiA9IEhBU19BQ0NPVU5UX0ZPUjtcbnZhciBMT0dJTiA9ICdnZXRPclJlcXVlc3RJZGVudGl0eSc7XG5leHBvcnRzLkxPR0lOID0gTE9HSU47XG52YXIgTE9HSU5fQUxMID0gJ2dldEFsbEFjY291bnRzRm9yJztcbmV4cG9ydHMuTE9HSU5fQUxMID0gTE9HSU5fQUxMO1xudmFyIEdFVF9BVkFUQVIgPSAnZ2V0QXZhdGFyJztcbmV4cG9ydHMuR0VUX0FWQVRBUiA9IEdFVF9BVkFUQVI7XG52YXIgSURFTlRJVFlfRlJPTV9QRVJNSVNTSU9OUyA9ICdpZGVudGl0eUZyb21QZXJtaXNzaW9ucyc7XG5leHBvcnRzLklERU5USVRZX0ZST01fUEVSTUlTU0lPTlMgPSBJREVOVElUWV9GUk9NX1BFUk1JU1NJT05TO1xudmFyIExPR09VVCA9ICdmb3JnZXRJZGVudGl0eSc7XG5leHBvcnRzLkxPR09VVCA9IExPR09VVDtcbnZhciBUUkFOU0ZFUiA9ICdyZXF1ZXN0VHJhbnNmZXInO1xuZXhwb3J0cy5UUkFOU0ZFUiA9IFRSQU5TRkVSO1xudmFyIFNJR04gPSAncmVxdWVzdFNpZ25hdHVyZSc7XG5leHBvcnRzLlNJR04gPSBTSUdOO1xudmFyIEFERF9UT0tFTiA9ICdhZGRUb2tlbic7XG5leHBvcnRzLkFERF9UT0tFTiA9IEFERF9UT0tFTjtcbnZhciBTSUdOX0FSQklUUkFSWSA9ICdyZXF1ZXN0QXJiaXRyYXJ5U2lnbmF0dXJlJztcbmV4cG9ydHMuU0lHTl9BUkJJVFJBUlkgPSBTSUdOX0FSQklUUkFSWTtcbnZhciBTVUdHRVNUX05FVFdPUksgPSAncmVxdWVzdEFkZE5ldHdvcmsnO1xuZXhwb3J0cy5TVUdHRVNUX05FVFdPUksgPSBTVUdHRVNUX05FVFdPUks7XG52YXIgQVVUSEVOVElDQVRFID0gJ2F1dGhlbnRpY2F0ZSc7XG5leHBvcnRzLkFVVEhFTlRJQ0FURSA9IEFVVEhFTlRJQ0FURTtcbnZhciBVUERBVEVfSURFTlRJVFkgPSAndXBkYXRlSWRlbnRpdHknO1xuZXhwb3J0cy5VUERBVEVfSURFTlRJVFkgPSBVUERBVEVfSURFTlRJVFk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfSWRlbnRpdHkgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9JZGVudGl0eVwiKSk7XG5cbnZhciBfUGVybWlzc2lvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vUGVybWlzc2lvblwiKSk7XG5cbnZhciBfS2V5cGFpciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vS2V5cGFpclwiKSk7XG5cbnZhciBfQWNjb3VudCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQWNjb3VudFwiKSk7XG5cbnZhciBfQXV0aG9yaXplZEFwcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQXV0aG9yaXplZEFwcFwiKSk7XG5cbnZhciBfQ3JlZGl0Q2FyZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQ3JlZGl0Q2FyZFwiKSk7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2VydmljZXMvdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi9zdG9yZS9jb25zdGFudHNcIikpO1xuXG52YXIgS2V5Y2hhaW4gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBLZXljaGFpbigpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEtleWNoYWluKTtcbiAgICB0aGlzLmtleXBhaXJzID0gW107XG4gICAgdGhpcy5hY2NvdW50cyA9IFtdO1xuICAgIHRoaXMuaWRlbnRpdGllcyA9IFtdO1xuICAgIHRoaXMubG9jYXRpb25zID0gW107XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IFtdO1xuICAgIHRoaXMuY2FyZHMgPSBbXTtcbiAgICB0aGlzLmFwcHMgPSBbXTtcbiAgICB0aGlzLmF2YXRhcnMgPSB7fTtcbiAgICB0aGlzLmxhc3RVc2VkSWRlbnRpdHkgPSBudWxsO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShLZXljaGFpbiwgW3tcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gS2V5Y2hhaW4uZnJvbUpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaW5kSWRlbnRpdHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZElkZW50aXR5KGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZGVudGl0aWVzLmZpbmQoZnVuY3Rpb24gKGlkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiBpZGVudGl0eS5pZCA9PT0gaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlT3JQdXNoQXBwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZU9yUHVzaEFwcChhcHApIHtcbiAgICAgIHRoaXMuYXBwcy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4Lm9yaWdpbiA9PT0gYXBwLm9yaWdpbjtcbiAgICAgIH0pID8gdGhpcy5hcHBzID0gdGhpcy5hcHBzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5vcmlnaW4gPT09IGFwcC5vcmlnaW4gPyBhcHAgOiB4O1xuICAgICAgfSkgOiB0aGlzLmFwcHMudW5zaGlmdChhcHApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVBcHBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlQXBwKGFwcCkge1xuICAgICAgdGhpcy5hcHBzID0gdGhpcy5hcHBzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5vcmlnaW4gIT09IGFwcC5vcmlnaW47XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmluZEFwcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kQXBwKG9yaWdpbikge1xuICAgICAgcmV0dXJuIHRoaXMuYXBwcy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4Lm9yaWdpbiA9PT0gb3JpZ2luO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZU9yUHVzaElkZW50aXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZU9yUHVzaElkZW50aXR5KGlkZW50aXR5KSB7XG4gICAgICB0aGlzLmlkZW50aXRpZXMuZmluZChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkLmlkID09PSBpZGVudGl0eS5pZDtcbiAgICAgIH0pID8gdGhpcy5pZGVudGl0aWVzID0gdGhpcy5pZGVudGl0aWVzLm1hcChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkLmlkID09PSBpZGVudGl0eS5pZCA/IGlkZW50aXR5IDogaWQ7XG4gICAgICB9KSA6IHRoaXMuaWRlbnRpdGllcy51bnNoaWZ0KGlkZW50aXR5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlSWRlbnRpdHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlSWRlbnRpdHkoaWRlbnRpdHkpIHtcbiAgICAgIHRoaXMuaWRlbnRpdGllcyA9IHRoaXMuaWRlbnRpdGllcy5maWx0ZXIoZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBpZC5pZCAhPT0gaWRlbnRpdHkuaWQ7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGVybWlzc2lvbnMgPSB0aGlzLnBlcm1pc3Npb25zLmZpbHRlcihmdW5jdGlvbiAocGVybSkge1xuICAgICAgICByZXR1cm4gcGVybS5pZGVudGl0eSAhPT0gaWRlbnRpdHkuaWQ7XG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZSB0aGlzLmF2YXRhcnNbaWRlbnRpdHkuaWRdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVPclB1c2hMb2NhdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVPclB1c2hMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgdGhpcy5sb2NhdGlvbnMuZmluZChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkLmlkID09PSBsb2NhdGlvbi5pZDtcbiAgICAgIH0pID8gdGhpcy5sb2NhdGlvbnMgPSB0aGlzLmxvY2F0aW9ucy5tYXAoZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBpZC5pZCA9PT0gbG9jYXRpb24uaWQgPyBsb2NhdGlvbiA6IGlkO1xuICAgICAgfSkgOiB0aGlzLmxvY2F0aW9ucy51bnNoaWZ0KGxvY2F0aW9uKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlTG9jYXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgIHRoaXMubG9jYXRpb25zID0gdGhpcy5sb2NhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmlkICE9PSBsb2NhdGlvbi5pZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pZGVudGl0aWVzLm1hcChmdW5jdGlvbiAoaWRlbnRpdHkpIHtcbiAgICAgICAgaWYgKGlkZW50aXR5LmxvY2F0aW9uID09PSBsb2NhdGlvbi5pZCkge1xuICAgICAgICAgIGlkZW50aXR5LmxvY2F0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEtleVBhaXJCeU5hbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0S2V5UGFpckJ5TmFtZShuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5rZXlwYWlycy5maW5kKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRLZXlQYWlyQnlQdWJsaWNLZXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0S2V5UGFpckJ5UHVibGljS2V5KHB1YmxpY0tleSkge1xuICAgICAgaWYgKCFwdWJsaWNLZXkpIHJldHVybjtcbiAgICAgIHJldHVybiB0aGlzLmtleXBhaXJzLmZpbmQoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnB1YmxpY0tleXMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiB4LmtleS50b0xvd2VyQ2FzZSgpID09PSBwdWJsaWNLZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlS2V5UGFpclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVLZXlQYWlyKGtleXBhaXIpIHtcbiAgICAgIHZhciBhY2NvdW50c1RvUmVtb3ZlID0gdGhpcy5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2V5cGFpclVuaXF1ZSA9PT0ga2V5cGFpci51bmlxdWUoKTtcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IHRoaXMucGVybWlzc2lvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiAheC5hY2NvdW50cy5zb21lKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIGFjY291bnRzVG9SZW1vdmUuaW5jbHVkZXMoYSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFjY291bnRzID0gdGhpcy5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2V5cGFpclVuaXF1ZSAhPT0ga2V5cGFpci51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5rZXlwYWlycyA9IHRoaXMua2V5cGFpcnMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS51bmlxdWUoKSAhPT0ga2V5cGFpci51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb3JyZWN0SGlzdG9yaWVzKCk7XG4gICAgICB0aGlzLmNvcnJlY3RBcHBMaW5rcygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRBY2NvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFjY291bnQoYWNjb3VudCkge1xuICAgICAgaWYgKCF0aGlzLmFjY291bnRzLmZpbmQoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIGEudW5pcXVlKCkgPT09IGFjY291bnQudW5pcXVlKCk7XG4gICAgICB9KSkgdGhpcy5hY2NvdW50cy5wdXNoKGFjY291bnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVBY2NvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUFjY291bnQoYWNjb3VudCkge1xuICAgICAgdmFyIGFjY291bnRzVG9SZW1vdmUgPSB0aGlzLmFjY291bnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gYWNjb3VudC51bmlxdWUoKTtcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IHRoaXMucGVybWlzc2lvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiAheC5hY2NvdW50cy5zb21lKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIGFjY291bnRzVG9SZW1vdmUuaW5jbHVkZXMoYSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFjY291bnRzID0gdGhpcy5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIGEudW5pcXVlKCkgIT09IGFjY291bnQudW5pcXVlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29ycmVjdEhpc3RvcmllcygpO1xuICAgICAgdGhpcy5jb3JyZWN0QXBwTGlua3MoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29ycmVjdEhpc3Rvcmllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb3JyZWN0SGlzdG9yaWVzKCkge1xuICAgICAgdmFyIGtleXBhaXJVbmlxdWVzID0gdGhpcy5rZXlwYWlycy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudW5pcXVlKCk7XG4gICAgICB9KTtcbiAgICAgIHZhciBhY2NvdW50VW5pcXVlcyA9IHRoaXMuYWNjb3VudHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnVuaXF1ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmhpc3RvcnkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciBhY2MgPSBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oeC50eXBlID09PSAnYWN0aW9uJyA/IHguYWNjb3VudCA6IHguZnJvbSk7XG5cbiAgICAgICAgaWYgKCFrZXlwYWlyVW5pcXVlcy5pbmNsdWRlcyhhY2Mua2V5cGFpclVuaXF1ZSkgfHwgIWFjY291bnRVbmlxdWVzLmluY2x1ZGVzKGFjYy51bmlxdWUoKSkpIHtcbiAgICAgICAgICBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5kaXNwYXRjaChBY3Rpb25zLkRFTFRBX0hJU1RPUlksIHgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29ycmVjdEFwcExpbmtzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvcnJlY3RBcHBMaW5rcygpIHtcbiAgICAgIHZhciBvcmlnaW5zID0gdGhpcy5wZXJtaXNzaW9ucy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgub3JpZ2luO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFwcHMgPSB0aGlzLmFwcHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5zLmluY2x1ZGVzKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgcmV0dXJuIHgub3JpZ2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBLZXljaGFpbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICB2YXIgcCA9IE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICAgIGlmIChqc29uLmhhc093blByb3BlcnR5KCdrZXlwYWlycycpKSBwLmtleXBhaXJzID0ganNvbi5rZXlwYWlycy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9LZXlwYWlyW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih4KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGpzb24uaGFzT3duUHJvcGVydHkoJ2FjY291bnRzJykpIHAuYWNjb3VudHMgPSBqc29uLmFjY291bnRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gX0FjY291bnRbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnaWRlbnRpdGllcycpKSBwLmlkZW50aXRpZXMgPSBqc29uLmlkZW50aXRpZXMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBfSWRlbnRpdHlbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnbG9jYXRpb25zJykpIHAubG9jYXRpb25zID0ganNvbi5sb2NhdGlvbnMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBfSWRlbnRpdHkuTG9jYXRpb25JbmZvcm1hdGlvbi5mcm9tSnNvbih4KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGpzb24uaGFzT3duUHJvcGVydHkoJ3Blcm1pc3Npb25zJykpIHAucGVybWlzc2lvbnMgPSBqc29uLnBlcm1pc3Npb25zLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gX1Blcm1pc3Npb25bXCJkZWZhdWx0XCJdLmZyb21Kc29uKHgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnY2FyZHMnKSkgcC5jYXJkcyA9IGpzb24uY2FyZHMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBfQ3JlZGl0Q2FyZFtcImRlZmF1bHRcIl0uZnJvbUpzb24oeCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmhhc093blByb3BlcnR5KCdhcHBzJykpIHAuYXBwcyA9IGpzb24uYXBwcy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9BdXRob3JpemVkQXBwW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih4KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBLZXljaGFpbjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBLZXljaGFpbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9IaXN0b3JpY0FjdGlvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vSGlzdG9yaWNBY3Rpb25cIikpO1xuXG52YXIgX0hpc3RvcmljRXhjaGFuZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0hpc3RvcmljRXhjaGFuZ2VcIikpO1xuXG52YXIgX0hpc3RvcmljVHJhbnNmZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0hpc3RvcmljVHJhbnNmZXJcIikpO1xuXG52YXIgX0hpc3RvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0hpc3RvcnlcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIEhpc3RvcmljQWN0aW9uOiBfSGlzdG9yaWNBY3Rpb25bXCJkZWZhdWx0XCJdLFxuICBIaXN0b3JpY0V4Y2hhbmdlOiBfSGlzdG9yaWNFeGNoYW5nZVtcImRlZmF1bHRcIl0sXG4gIEhpc3RvcmljVHJhbnNmZXI6IF9IaXN0b3JpY1RyYW5zZmVyW1wiZGVmYXVsdFwiXSxcbiAgSGlzdG9yeTogX0hpc3RvcnlbXCJkZWZhdWx0XCJdXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9FeHRlcm5hbFdhbGxldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vRXh0ZXJuYWxXYWxsZXRcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIEV4dGVybmFsV2FsbGV0OiBfRXh0ZXJuYWxXYWxsZXRbXCJkZWZhdWx0XCJdXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9GcmFtZXdvcmsgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsaXR5L0ZyYW1ld29ya1wiKSk7XG5cbnZhciBNZXRhID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWV0YSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIE1ldGEpO1xuICAgIHRoaXMudmVyc2lvbiA9IF9GcmFtZXdvcmtbXCJkZWZhdWx0XCJdLmdldFZlcnNpb24oKTtcbiAgICB0aGlzLmxhc3RWZXJzaW9uID0gX0ZyYW1ld29ya1tcImRlZmF1bHRcIl0uZ2V0VmVyc2lvbigpO1xuICAgIHRoaXMuYWNjZXB0ZWRUZXJtcyA9IGZhbHNlO1xuICAgIHRoaXMubGFzdFN1Z2dlc3RlZFZlcnNpb24gPSBudWxsO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShNZXRhLCBbe1xuICAgIGtleTogXCJnZXRWZXJzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZlcnNpb24oKSB7XG4gICAgICByZXR1cm4gX0ZyYW1ld29ya1tcImRlZmF1bHRcIl0uZ2V0VmVyc2lvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWdlbmVyYXRlVmVyc2lvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWdlbmVyYXRlVmVyc2lvbigpIHtcbiAgICAgIHRoaXMudmVyc2lvbiA9IF9GcmFtZXdvcmtbXCJkZWZhdWx0XCJdLmdldFZlcnNpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmVlZHNVcGRhdGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZWVkc1VwZGF0aW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbiAhPT0gdGhpcy5sYXN0VmVyc2lvbjtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgTWV0YSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWV0YTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBNZXRhOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIi4vQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfSWRHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsL0lkR2VuZXJhdG9yXCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVG9rZW5cIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX1N0b3JlU2VydmljZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3NlcnZpY2VzL3V0aWxpdHkvU3RvcmVTZXJ2aWNlXCIpKTtcblxudmFyIE5ldHdvcmsgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBOZXR3b3JrKCkge1xuICAgIHZhciBfbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG5cbiAgICB2YXIgX3Byb3RvY29sID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnaHR0cHMnO1xuXG4gICAgdmFyIF9ob3N0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnJztcblxuICAgIHZhciBfcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogMDtcblxuICAgIHZhciBibG9ja2NoYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBudWxsO1xuICAgIHZhciBjaGFpbklkID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiAnJztcblxuICAgIHZhciBfcGF0aCA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIGFyZ3VtZW50c1s2XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzZdIDogJyc7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIE5ldHdvcmspO1xuICAgIHRoaXMuaWQgPSBfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm51bWVyaWMoMTIpO1xuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xuICAgIHRoaXMucHJvdG9jb2wgPSBfcHJvdG9jb2w7XG4gICAgdGhpcy5ob3N0ID0gX2hvc3Q7XG4gICAgdGhpcy5wb3J0ID0gX3BvcnQ7XG4gICAgdGhpcy5wYXRoID0gX3BhdGg7XG4gICAgdGhpcy5ibG9ja2NoYWluID0gYmxvY2tjaGFpbjtcbiAgICB0aGlzLmNoYWluSWQgPSBjaGFpbklkLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5mcm9tT3JpZ2luID0gbnVsbDtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9ICtuZXcgRGF0ZSgpO1xuICAgIHRoaXMudG9rZW4gPSBudWxsO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShOZXR3b3JrLCBbe1xuICAgIGtleTogXCJ1bmlxdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5pcXVlKCkge1xuICAgICAgcmV0dXJuIChcIlwiLmNvbmNhdCh0aGlzLmJsb2NrY2hhaW4sIFwiOlwiKSArICh0aGlzLmNoYWluSWQubGVuZ3RoID8gXCJjaGFpbjpcIi5jb25jYXQodGhpcy5jaGFpbklkKSA6IFwiXCIuY29uY2F0KHRoaXMuaG9zdCwgXCI6XCIpLmNvbmNhdCh0aGlzLnBvcnQpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnVsbGhvc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnVsbGhvc3QoKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQodGhpcy5wcm90b2NvbCwgXCI6Ly9cIikuY29uY2F0KHRoaXMuaG9zdCkuY29uY2F0KHRoaXMucG9ydCA/ICc6JyA6ICcnKS5jb25jYXQodGhpcy5wb3J0KS5jb25jYXQodGhpcy5wYXRoID8gdGhpcy5wYXRoIDogJycpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9uZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHJldHVybiBOZXR3b3JrLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNWYWxpZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgaWYgKCFfQmxvY2tjaGFpbnMuQmxvY2tjaGFpbnNBcnJheS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudmFsdWU7XG4gICAgICB9KS5pbmNsdWRlcyh0aGlzLmJsb2NrY2hhaW4pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5ob3N0Lmxlbmd0aCAmJiB0aGlzLnBvcnQudG9TdHJpbmcoKS5sZW5ndGggJiYgdGhpcy5jaGFpbklkLmxlbmd0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UG9ydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQb3J0KCkge1xuICAgICAgaWYgKCF0aGlzLnBvcnQpIHRoaXMucG9ydCA9IDgwO1xuICAgICAgaWYgKCFbODAsIDQ0M10uaW5jbHVkZXMocGFyc2VJbnQodGhpcy5wb3J0KSkpIHJldHVybjtcbiAgICAgIHRoaXMucG9ydCA9IHRoaXMucHJvdG9jb2wgPT09ICdodHRwJyA/IDgwIDogNDQzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzeXN0ZW1Ub2tlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzeXN0ZW1Ub2tlbigpIHtcbiAgICAgIGlmICh0aGlzLnRva2VuKSByZXR1cm4gdGhpcy50b2tlbjtcblxuICAgICAgdmFyIHRva2VuID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbih0aGlzLmJsb2NrY2hhaW4pLmRlZmF1bHRUb2tlbigpO1xuXG4gICAgICB0b2tlbi5jaGFpbklkID0gdGhpcy5jaGFpbklkO1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhY2NvdW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY2NvdW50cygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciB1bmlxdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgICB2YXIgYWNjb3VudHMgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmFjY291bnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5uZXR3b3JrVW5pcXVlID09PSBfdGhpcy51bmlxdWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXVuaXF1ZSkgcmV0dXJuIGFjY291bnRzO1xuICAgICAgcmV0dXJuIGFjY291bnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBhY2NvdW50KSB7XG4gICAgICAgIGlmICghYWNjLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4gYWNjb3VudC5uZXR3b3JrKCkudW5pcXVlKCkgPT09IHgubmV0d29yaygpLnVuaXF1ZSgpICYmIGFjY291bnQuc2VuZGFibGUoKSA9PT0geC5zZW5kYWJsZSgpO1xuICAgICAgICB9KSkgYWNjLnB1c2goYWNjb3VudCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IE5ldHdvcmsoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgdmFyIHAgPSBPYmplY3QuYXNzaWduKE5ldHdvcmsucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgICBwLmNoYWluSWQgPSBwLmNoYWluSWQgPyBwLmNoYWluSWQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgcC50b2tlbiA9IGpzb24uaGFzT3duUHJvcGVydHkoJ3Rva2VuJykgJiYganNvbi50b2tlbiA/IF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oanNvbi50b2tlbikgOiBudWxsO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21VbmlxdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbVVuaXF1ZShuZXRTdHJpbmcpIHtcbiAgICAgIHZhciBibG9ja2NoYWluID0gbmV0U3RyaW5nLnNwbGl0KCc6JylbMF07XG4gICAgICBpZiAobmV0U3RyaW5nLmluZGV4T2YoJzpjaGFpbjonKSA+IC0xKSByZXR1cm4gbmV3IE5ldHdvcmsoJycsICcnLCAnJywgJycsIGJsb2NrY2hhaW4sIG5ldFN0cmluZy5yZXBsYWNlKFwiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOmNoYWluOlwiKSwgJycpKTtcbiAgICAgIHZhciBzcGxpdHMgPSBuZXRTdHJpbmcucmVwbGFjZShcIlwiLmNvbmNhdChibG9ja2NoYWluLCBcIjpcIiksICcnKS5zcGxpdCgnOicpO1xuICAgICAgcmV0dXJuIG5ldyBOZXR3b3JrKCcnLCAnJywgc3BsaXRzWzBdLCBwYXJzZUludChzcGxpdHNbMV0gfHwgODApLCBibG9ja2NoYWluKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE5ldHdvcms7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gTmV0d29yazsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIEFjY291bnRBY3Rpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBY2NvdW50QWN0aW9uKHR5cGUpIHtcbiAgICB2YXIgb25jbGljayA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZnVuY3Rpb24gKCkge307XG4gICAgdmFyIGRhbmdlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBBY2NvdW50QWN0aW9uKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMub25jbGljayA9IG9uY2xpY2s7XG4gICAgdGhpcy5pc0Rhbmdlcm91cyA9IGRhbmdlcjtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoQWNjb3VudEFjdGlvbiwgbnVsbCwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IEFjY291bnRBY3Rpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEFjY291bnRBY3Rpb247XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQWNjb3VudEFjdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIEV4cGxvcmVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXhwbG9yZXIoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBFeHBsb3Jlcik7XG4gICAgdGhpcy5yYXcgPSBudWxsO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5hY2NvdW50ID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmJsb2NrID0gbnVsbDtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoRXhwbG9yZXIsIFt7XG4gICAga2V5OiBcInBhcnNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXJzZWQoKSB7XG4gICAgICByZXR1cm4gRXhwbG9yZXIuZnJvbVJhdyh0aGlzLnJhdyk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IEV4cGxvcmVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21SYXdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbVJhdyhyYXdFeHBsb3Jlcikge1xuICAgICAgaWYgKCFyYXdFeHBsb3JlcikgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIoKTtcbiAgICAgIHJldHVybiB0aGlzLmZyb21Kc29uKHtcbiAgICAgICAgcmF3OiByYXdFeHBsb3JlcixcbiAgICAgICAgbmFtZTogcmF3RXhwbG9yZXIubmFtZSxcbiAgICAgICAgYWNjb3VudDogZnVuY3Rpb24gYWNjb3VudCh4KSB7XG4gICAgICAgICAgcmV0dXJuIHJhd0V4cGxvcmVyLmFjY291bnQucmVwbGFjZSgne3h9JywgeCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zYWN0aW9uOiBmdW5jdGlvbiB0cmFuc2FjdGlvbih4KSB7XG4gICAgICAgICAgcmV0dXJuIHJhd0V4cGxvcmVyLnRyYW5zYWN0aW9uLnJlcGxhY2UoJ3t4fScsIHgpO1xuICAgICAgICB9LFxuICAgICAgICBibG9jazogZnVuY3Rpb24gYmxvY2soeCkge1xuICAgICAgICAgIHJldHVybiByYXdFeHBsb3Jlci5ibG9jay5yZXBsYWNlKCd7eH0nLCB4KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFeHBsb3Jlcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFeHBsb3JlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGV4cG9ydHMuTG9jYXRpb25JbmZvcm1hdGlvbiA9IGV4cG9ydHMuUGVyc29uYWxJbmZvcm1hdGlvbiA9IGV4cG9ydHMuSWRlbnRpdHlSZXF1aXJlZEZpZWxkcyA9IGV4cG9ydHMuTG9jYXRpb25GaWVsZHMgPSBleHBvcnRzLlBlcnNvbmFsRmllbGRzID0gdm9pZCAwO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfYWVzT29wID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYWVzLW9vcFwiKSk7XG5cbnZhciBfSWRHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsL0lkR2VuZXJhdG9yXCIpKTtcblxudmFyIF9OZXR3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9OZXR3b3JrXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBBY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uL3N0b3JlL2NvbnN0YW50c1wiKSk7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyogICAgICAgICAgICBSRVFVSVJFQUJMRSBGSUVMRFMgICAgICAgICAgICAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgUGVyc29uYWxGaWVsZHMgPSB7XG4gIGZpcnN0bmFtZTogJ2ZpcnN0bmFtZScsXG4gIGxhc3RuYW1lOiAnbGFzdG5hbWUnLFxuICBlbWFpbDogJ2VtYWlsJyxcbiAgYmlydGhkYXRlOiAnYmlydGhkYXRlJ1xufTtcbmV4cG9ydHMuUGVyc29uYWxGaWVsZHMgPSBQZXJzb25hbEZpZWxkcztcbnZhciBMb2NhdGlvbkZpZWxkcyA9IHtcbiAgcGhvbmU6ICdwaG9uZScsXG4gIGFkZHJlc3M6ICdhZGRyZXNzJyxcbiAgY2l0eTogJ2NpdHknLFxuICBzdGF0ZTogJ3N0YXRlJyxcbiAgY291bnRyeTogJ2NvdW50cnknLFxuICB6aXBjb2RlOiAnemlwY29kZSdcbn07XG5leHBvcnRzLkxvY2F0aW9uRmllbGRzID0gTG9jYXRpb25GaWVsZHM7XG5cbnZhciBJZGVudGl0eVJlcXVpcmVkRmllbGRzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSWRlbnRpdHlSZXF1aXJlZEZpZWxkcygpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIElkZW50aXR5UmVxdWlyZWRGaWVsZHMpO1xuICAgIHRoaXMuYWNjb3VudHMgPSBbXTtcbiAgICB0aGlzLnBlcnNvbmFsID0gW107XG4gICAgdGhpcy5sb2NhdGlvbiA9IFtdO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShJZGVudGl0eVJlcXVpcmVkRmllbGRzLCBbe1xuICAgIGtleTogXCJjbG9uZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHJldHVybiBJZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNFbXB0eVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgcmV0dXJuICF0aGlzLnBlcnNvbmFsLmxlbmd0aCAmJiAhdGhpcy5sb2NhdGlvbi5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzVmFsaWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIGlmIChKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhuZXcgSWRlbnRpdHlSZXF1aXJlZEZpZWxkcygpKSkgIT09IEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRoaXMpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCF0aGlzLnBlcnNvbmFsLmV2ZXJ5KGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoUGVyc29uYWxGaWVsZHMpLmluY2x1ZGVzKGZpZWxkKTtcbiAgICAgIH0pKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIXRoaXMubG9jYXRpb24uZXZlcnkoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhMb2NhdGlvbkZpZWxkcykuaW5jbHVkZXMoZmllbGQpO1xuICAgICAgfSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmb3JQZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvclBlcm1pc3Npb24oKSB7XG4gICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICB0aGlzLmFjY291bnRzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gZmllbGRzLnB1c2goXCJhY2NvdW50OlwiLmNvbmNhdChfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24oeCkudW5pcXVlKCkpKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5sb2NhdGlvbi5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkcy5wdXNoKFwibG9jYXRpb246XCIuY29uY2F0KHgpKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZXJzb25hbC5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkcy5wdXNoKFwicGVyc29uYWw6XCIuY29uY2F0KHgpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZpZWxkcy5zb3J0KCk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IElkZW50aXR5UmVxdWlyZWRGaWVsZHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IElkZW50aXR5UmVxdWlyZWRGaWVsZHMoKSwganNvbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21QZXJtaXNzaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21QZXJtaXNzaW9uKHJlcXVpcmVtZW50cykge1xuICAgICAgdmFyIHAgPSBJZGVudGl0eVJlcXVpcmVkRmllbGRzLnBsYWNlaG9sZGVyKCk7XG4gICAgICBwLmFjY291bnRzID0gcmVxdWlyZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5pbmRleE9mKCdhY2NvdW50OicpID4gLTE7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9OZXR3b3JrW1wiZGVmYXVsdFwiXS5mcm9tVW5pcXVlKHguc3BsaXQoJ2FjY291bnQ6JylbMV0pO1xuICAgICAgfSk7XG4gICAgICBwLnBlcnNvbmFsID0gcmVxdWlyZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5pbmRleE9mKCdwZXJzb25hbDonKSA+IC0xO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnNwbGl0KCdwZXJzb25hbDonKVsxXTtcbiAgICAgIH0pO1xuICAgICAgcC5sb2NhdGlvbiA9IHJlcXVpcmVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHguaW5kZXhPZignbG9jYXRpb246JykgPiAtMTtcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5zcGxpdCgnbG9jYXRpb246JylbMV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSWRlbnRpdHlSZXF1aXJlZEZpZWxkcztcbn0oKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyogICAgICAgICAgUGVyc29uYWwgSW5mb3JtYXRpb24gICAgICAgICAgICAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuZXhwb3J0cy5JZGVudGl0eVJlcXVpcmVkRmllbGRzID0gSWRlbnRpdHlSZXF1aXJlZEZpZWxkcztcblxudmFyIFBlcnNvbmFsSW5mb3JtYXRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQZXJzb25hbEluZm9ybWF0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFBlcnNvbmFsSW5mb3JtYXRpb24pO1xuICAgIE9iamVjdC5rZXlzKFBlcnNvbmFsRmllbGRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgIHJldHVybiBfdGhpc1tmaWVsZE5hbWVdID0gJyc7XG4gICAgfSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFBlcnNvbmFsSW5mb3JtYXRpb24sIFt7XG4gICAga2V5OiBcImZpbmRGaWVsZHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZEZpZWxkcyhmaWVsZHMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZmllbGRzLmZpbHRlcihmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5oYXNPd25Qcm9wZXJ0eShmaWVsZCkgJiYgX3RoaXMyW2ZpZWxkXS5sZW5ndGg7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgUGVyc29uYWxJbmZvcm1hdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gUGVyc29uYWxJbmZvcm1hdGlvbjtcbn0oKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyogICAgICAgICAgTG9jYXRpb24gSW5mb3JtYXRpb24gICAgICAgICAgICAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuZXhwb3J0cy5QZXJzb25hbEluZm9ybWF0aW9uID0gUGVyc29uYWxJbmZvcm1hdGlvbjtcblxudmFyIExvY2F0aW9uSW5mb3JtYXRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMb2NhdGlvbkluZm9ybWF0aW9uKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBMb2NhdGlvbkluZm9ybWF0aW9uKTtcbiAgICB0aGlzLmlkID0gX0lkR2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5udW1lcmljKDEwKTtcbiAgICB0aGlzLm5hbWUgPSAnVW5uYW1lZCBMb2NhdGlvbic7XG4gICAgdGhpcy5pc0RlZmF1bHQgPSBmYWxzZTtcbiAgICBPYmplY3Qua2V5cyhMb2NhdGlvbkZpZWxkcykuZm9yRWFjaChmdW5jdGlvbiAoZmllbGROYW1lKSB7XG4gICAgICByZXR1cm4gX3RoaXMzW2ZpZWxkTmFtZV0gPSAnJztcbiAgICB9KTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoTG9jYXRpb25JbmZvcm1hdGlvbiwgW3tcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gTG9jYXRpb25JbmZvcm1hdGlvbi5mcm9tSnNvbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpbmRGaWVsZHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZEZpZWxkcyhmaWVsZHMpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgZm91bmRGaWVsZHMgPSBmaWVsZHMuZmlsdGVyKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gZmllbGQgIT09IExvY2F0aW9uRmllbGRzLmNvdW50cnk7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiBfdGhpczQuaGFzT3duUHJvcGVydHkoZmllbGQpICYmIF90aGlzNFtmaWVsZF0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBpZiAoZmllbGRzLmluY2x1ZGVzKExvY2F0aW9uRmllbGRzLmNvdW50cnkpICYmIHRoaXMuaGFzT3duUHJvcGVydHkoJ2NvdW50cnknKSAmJiB0eXBlb2YgdGhpcy5jb3VudHJ5ICE9PSAnc3RyaW5nJykgZm91bmRGaWVsZHMucHVzaChMb2NhdGlvbkZpZWxkcy5jb3VudHJ5KTtcbiAgICAgIHJldHVybiBmb3VuZEZpZWxkcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzRmllbGRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0ZpZWxkcyhmaWVsZHMpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmRGaWVsZHMoZmllbGRzKS5sZW5ndGggPT09IGZpZWxkcy5sZW5ndGg7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IExvY2F0aW9uSW5mb3JtYXRpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExvY2F0aW9uSW5mb3JtYXRpb247XG59KCk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qICAgICAgICAgICAgICAgICBJZGVudGl0eSAgICAgICAgICAgICAgICAgKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbmV4cG9ydHMuTG9jYXRpb25JbmZvcm1hdGlvbiA9IExvY2F0aW9uSW5mb3JtYXRpb247XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ2Vvc2pzLWVjYycpLFxuICAgIFByaXZhdGVLZXkgPSBfcmVxdWlyZS5Qcml2YXRlS2V5O1xuXG52YXIgSWRlbnRpdHkgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJZGVudGl0eSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIElkZW50aXR5KTtcbiAgICAvLyBCYXNpYyBmaWVsZHNcbiAgICB0aGlzLmlkID0gX0lkR2VuZXJhdG9yW1wiZGVmYXVsdFwiXS50ZXh0KDI0KTtcbiAgICB0aGlzLmhhc2ggPSAnJztcbiAgICB0aGlzLnByaXZhdGVLZXkgPSAnJztcbiAgICB0aGlzLnB1YmxpY0tleSA9ICcnO1xuICAgIHRoaXMubmFtZSA9ICcnOyAvLyBSZXF1aXJlYWJsZSBmaWVsZHNcblxuICAgIHRoaXMucGVyc29uYWwgPSBQZXJzb25hbEluZm9ybWF0aW9uLnBsYWNlaG9sZGVyKCk7IC8vIHRoaXMubG9jYXRpb25zID0gW0xvY2F0aW9uSW5mb3JtYXRpb24ucGxhY2Vob2xkZXIoKV07XG5cbiAgICB0aGlzLmxvY2F0aW9uID0gbnVsbDsgLy8gS1lDXG5cbiAgICB0aGlzLmt5YyA9IGZhbHNlO1xuICAgIHRoaXMucmlkbCA9IC0xO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShJZGVudGl0eSwgW3tcbiAgICBrZXk6IFwiaW5pdGlhbGl6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0aWFsaXplKGhhc2gpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBQcml2YXRlS2V5LnJhbmRvbUtleSgpLnRoZW4oZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgICAgICAgICBfdGhpczUucHJpdmF0ZUtleSA9IHByaXZhdGVLZXkudG9XaWYoKTtcbiAgICAgICAgICBfdGhpczUucHVibGljS2V5ID0gcHJpdmF0ZUtleS50b1B1YmxpYygpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgX3RoaXM1Lmhhc2ggPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIElkZW50aXR5LmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNFbmNyeXB0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNFbmNyeXB0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcml2YXRlS2V5Lmxlbmd0aCA+IDcwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmNyeXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY3J5cHQoc2VlZCkge1xuICAgICAgaWYgKCF0aGlzLmlzRW5jcnlwdGVkKCkpIHRoaXMucHJpdmF0ZUtleSA9IF9hZXNPb3BbXCJkZWZhdWx0XCJdLmVuY3J5cHQodGhpcy5wcml2YXRlS2V5LCBzZWVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVjcnlwdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWNyeXB0KHNlZWQpIHtcbiAgICAgIGlmICh0aGlzLmlzRW5jcnlwdGVkKCkpIHRoaXMucHJpdmF0ZUtleSA9IF9hZXNPb3BbXCJkZWZhdWx0XCJdLmRlY3J5cHQodGhpcy5wcml2YXRlS2V5LCBzZWVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdExvY2F0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRMb2NhdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvY2F0aW9uKCkgfHwgX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5sb2NhdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKipcclxuICAgICAqIENoZWNrcyBpZiBhbiBJZGVudGl0eSBoYXMgc3BlY2lmaWVkIGZpZWxkcy5cclxuICAgICAqIFRoaXMgaXMgdXNlZCB3aGVuIGFuIGludGVyYWN0aW5nIGFwcGxpY2F0aW9uIHJlcXVpcmVzIHNwZWNpZmljIGluZm9ybWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGZpZWxkcyAtIFRoZSBmaWVsZHMgdG8gY2hlY2sgZm9yXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0ZWRMb2NhdGlvblxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImhhc1JlcXVpcmVkRmllbGRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc1JlcXVpcmVkRmllbGRzKGZpZWxkcykge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIHZhciBzZWxlY3RlZExvY2F0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuICAgICAgdmFyIHJlcXVpcmVkRmllbGRzID0gSWRlbnRpdHlSZXF1aXJlZEZpZWxkcy5mcm9tSnNvbihmaWVsZHMpO1xuICAgICAgaWYgKCFyZXF1aXJlZEZpZWxkcy5pc1ZhbGlkKCkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChyZXF1aXJlZEZpZWxkcy5wZXJzb25hbC5sZW5ndGgpIGlmICghcmVxdWlyZWRGaWVsZHMucGVyc29uYWwuZXZlcnkoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiBfdGhpczYucGVyc29uYWxbZmllbGRdLmxlbmd0aDtcbiAgICAgIH0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmIChzZWxlY3RlZExvY2F0aW9uKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWRMb2NhdGlvbi5oYXNGaWVsZHMoZmllbGRzLmxvY2F0aW9uKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcXVpcmVkRmllbGRzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmdldExvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuZ2V0TG9jYXRpb24oKS5oYXNGaWVsZHMocmVxdWlyZWRGaWVsZHMubG9jYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKioqXHJcbiAgICAgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIG9ubHkgdGhlIHJlcXVpcmVkIGZpZWxkcyBmcm9tIHRoaXMgSWRlbnRpdHlcclxuICAgICAqIEBwYXJhbSBmaWVsZHNcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvblxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJhc09ubHlSZXF1aXJlZEZpZWxkc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc09ubHlSZXF1aXJlZEZpZWxkcyhmaWVsZHMpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICB2YXIgbG9jYXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICAgICB2YXIgcmVxdWlyZWRGaWVsZHMgPSBJZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21Kc29uKGZpZWxkcyk7XG4gICAgICBpZiAoIXJlcXVpcmVkRmllbGRzLmlzVmFsaWQoKSkgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgaWRlbnRpdHkgPSB7XG4gICAgICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICAgICAgcHVibGljS2V5OiB0aGlzLnB1YmxpY0tleSxcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lXG4gICAgICB9O1xuXG4gICAgICBpZiAocmVxdWlyZWRGaWVsZHMucGVyc29uYWwubGVuZ3RoKSB7XG4gICAgICAgIGlkZW50aXR5LnBlcnNvbmFsID0ge307XG4gICAgICAgIHJlcXVpcmVkRmllbGRzLnBlcnNvbmFsLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4gaWRlbnRpdHkucGVyc29uYWxbZmllbGRdID0gX3RoaXM3LnBlcnNvbmFsW2ZpZWxkXTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1aXJlZEZpZWxkcy5sb2NhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgaWRlbnRpdHkubG9jYXRpb24gPSB7fTtcbiAgICAgICAgaWYgKCFsb2NhdGlvbikgbG9jYXRpb24gPSB0aGlzLmRlZmF1bHRMb2NhdGlvbigpO1xuXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgIHJlcXVpcmVkRmllbGRzLmxvY2F0aW9uLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZGVudGl0eS5sb2NhdGlvbltmaWVsZF0gPSBsb2NhdGlvbltmaWVsZF07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICAvKioqXHJcbiAgICAgKiBTZXRzIHVwIHRoZSBmaWVsZHMgcmV0dXJuZWQgdG8gdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0gcmVxdWlyZWRGaWVsZHNcclxuICAgICAqIEBwYXJhbSBpZGVudGl0eVxyXG4gICAgICogQHBhcmFtIHNlbGVjdGVkTG9jYXRpb25cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZVwiLFxuXG4gICAgLyoqKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcmVxdWlyYWJsZSBuYW1lLlxyXG4gICAgICogQHBhcmFtIHJlcXVpcmFibGVcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvblxyXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFByb3BlcnR5VmFsdWVCeU5hbWUocmVxdWlyYWJsZSkge1xuICAgICAgdmFyIGxvY2F0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMpLmluY2x1ZGVzKHJlcXVpcmFibGUpKSByZXR1cm4gdGhpc1tyZXF1aXJhYmxlXTtlbHNlIGlmIChPYmplY3Qua2V5cyh0aGlzLnBlcnNvbmFsKS5pbmNsdWRlcyhyZXF1aXJhYmxlKSkgcmV0dXJuIHRoaXMucGVyc29uYWxbcmVxdWlyYWJsZV07ZWxzZSB7XG4gICAgICAgIHZhciBmaWVsZCA9IChsb2NhdGlvbiA/IGxvY2F0aW9uIDogdGhpcy5kZWZhdWx0TG9jYXRpb24oKSlbcmVxdWlyYWJsZV07XG4gICAgICAgIHJldHVybiAoMCwgX3R5cGVvZjJbXCJkZWZhdWx0XCJdKShmaWVsZCkgPT09ICdvYmplY3QnID8gZmllbGQubmFtZSA6IGZpZWxkO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmdWxsbmFtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmdWxsbmFtZSgpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLnBlcnNvbmFsLmZpcnN0bmFtZSB8fCAnW05PIEZJUlNUIE5BTUVdJywgXCIgXCIpLmNvbmNhdCh0aGlzLnBlcnNvbmFsLmxhc3RuYW1lIHx8ICdbTk8gTEFTVCBOQU1FXScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRMb2NhdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRMb2NhdGlvbigpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMubG9jYXRpb24pIHJldHVybjtcbiAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmtleWNoYWluLmxvY2F0aW9ucy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmlkID09PSBfdGhpczgubG9jYXRpb247XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0QXNMYXN0VXNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBc0xhc3RVc2VkKCkge1xuICAgICAgdmFyIHNjYXR0ZXIgPSBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLmNsb25lKCk7XG5cbiAgICAgIHNjYXR0ZXIua2V5Y2hhaW4ubGFzdFVzZWRJZGVudGl0eSA9IHRoaXMuaWQ7XG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuZGlzcGF0Y2goQWN0aW9ucy5TRVRfU0NBVFRFUiwgc2NhdHRlcik7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IElkZW50aXR5KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHZhciBwID0gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgICAgcC5wZXJzb25hbCA9IFBlcnNvbmFsSW5mb3JtYXRpb24uZnJvbUpzb24oanNvbi5wZXJzb25hbCk7IC8vIGlmKGpzb24uaGFzT3duUHJvcGVydHkoJ2xvY2F0aW9ucycpKSBwLmxvY2F0aW9ucyA9IGpzb24ubG9jYXRpb25zLm1hcChsb2NhdGlvbiA9PiBMb2NhdGlvbkluZm9ybWF0aW9uLmZyb21Kc29uKGxvY2F0aW9uKSk7XG4gICAgICAvLyBlbHNlIHAubG9jYXRpb25zID0gW0xvY2F0aW9uSW5mb3JtYXRpb24ucGxhY2Vob2xkZXIoKV07XG5cbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhc1JldHVybmVkRmllbGRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzUmV0dXJuZWRGaWVsZHMocmVxdWlyZWRGaWVsZHMsIGlkZW50aXR5KSB7XG4gICAgICB2YXIgc2VsZWN0ZWRMb2NhdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogbnVsbDtcbiAgICAgIHZhciByZXR1cm5lZEZpZWxkcyA9IGlkZW50aXR5LmFzT25seVJlcXVpcmVkRmllbGRzKHJlcXVpcmVkRmllbGRzLCBzZWxlY3RlZExvY2F0aW9uKTtcbiAgICAgIGRlbGV0ZSByZXR1cm5lZEZpZWxkcy5oYXNoO1xuICAgICAgZGVsZXRlIHJldHVybmVkRmllbGRzLm5hbWU7XG4gICAgICBkZWxldGUgcmV0dXJuZWRGaWVsZHMucHVibGljS2V5O1xuICAgICAgZGVsZXRlIHJldHVybmVkRmllbGRzLmt5YztcbiAgICAgIGRlbGV0ZSByZXR1cm5lZEZpZWxkcy5yaWRsO1xuICAgICAgcmV0dXJuIHJldHVybmVkRmllbGRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYW1lSXNWYWxpZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuYW1lSXNWYWxpZChuYW1lKSB7XG4gICAgICByZXR1cm4gL15bYS16QS1aMC05Xy1dezMsMjB9JC8udGVzdChuYW1lKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIElkZW50aXR5O1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IElkZW50aXR5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5ISVNUT1JZX1RZUEVTID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX0lkR2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbC9JZEdlbmVyYXRvclwiKSk7XG5cbnZhciBISVNUT1JZX1RZUEVTID0ge1xuICBUcmFuc2ZlcjogJ3RyYW5zZmVyJyxcbiAgRXhjaGFuZ2U6ICdleGNoYW5nZScsXG4gIEFjdGlvbjogJ2FjdGlvbidcbn07XG5leHBvcnRzLkhJU1RPUllfVFlQRVMgPSBISVNUT1JZX1RZUEVTO1xuXG52YXIgSGlzdG9yeSA9IGZ1bmN0aW9uIEhpc3RvcnkodHlwZSkge1xuICB2YXIgdHhpZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG4gICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgSGlzdG9yeSk7XG4gIHRoaXMuaWQgPSBfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLnRleHQoMjQpO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLnRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuICB0aGlzLnR4aWQgPSB0eXBlb2YgdHhpZCA9PT0gJ3N0cmluZycgPyB0eGlkIDogJyc7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEhpc3Rvcnk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNldEJsb2NrY2hhaW5zID0gZXhwb3J0cy5ibG9ja2NoYWluTmFtZSA9IGV4cG9ydHMuQmxvY2tjaGFpbnNBcnJheSA9IGV4cG9ydHMuQmxvY2tjaGFpbnMgPSB2b2lkIDA7XG52YXIgQmxvY2tjaGFpbnMgPSB7XG4gIEVPU0lPOiAnZW9zJyxcbiAgRVRIOiAnZXRoJyxcbiAgVFJYOiAndHJ4JyxcbiAgQlRDOiAnYnRjJ1xufTtcbmV4cG9ydHMuQmxvY2tjaGFpbnMgPSBCbG9ja2NoYWlucztcbnZhciBCbG9ja2NoYWluc0FycmF5ID0gT2JqZWN0LmtleXMoQmxvY2tjaGFpbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB7XG4gICAga2V5OiBrZXksXG4gICAgdmFsdWU6IEJsb2NrY2hhaW5zW2tleV1cbiAgfTtcbn0pO1xuZXhwb3J0cy5CbG9ja2NoYWluc0FycmF5ID0gQmxvY2tjaGFpbnNBcnJheTtcblxudmFyIGJsb2NrY2hhaW5OYW1lID0gZnVuY3Rpb24gYmxvY2tjaGFpbk5hbWUoeCkge1xuICBzd2l0Y2ggKHgpIHtcbiAgICBjYXNlICdidGMnOlxuICAgICAgcmV0dXJuICdCaXRjb2luJztcblxuICAgIGNhc2UgQmxvY2tjaGFpbnMuRU9TSU86XG4gICAgICByZXR1cm4gJ0VPU0lPJztcblxuICAgIGNhc2UgQmxvY2tjaGFpbnMuRVRIOlxuICAgICAgcmV0dXJuICdFdGhlcmV1bSc7XG5cbiAgICBjYXNlIEJsb2NrY2hhaW5zLlRSWDpcbiAgICAgIHJldHVybiAnVHJvbic7XG5cbiAgICBjYXNlIEJsb2NrY2hhaW5zLkJUQzpcbiAgICAgIHJldHVybiAnQml0Y29pbic7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHg7XG4gIH1cbn07XG5cbmV4cG9ydHMuYmxvY2tjaGFpbk5hbWUgPSBibG9ja2NoYWluTmFtZTtcblxudmFyIHNldEJsb2NrY2hhaW5zID0gZnVuY3Rpb24gc2V0QmxvY2tjaGFpbnMoX0Jsb2NrY2hhaW5zKSB7XG4gIHZhciBfYmxvY2tjaGFpbk5hbWVQYXJzZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG5cbiAgZXhwb3J0cy5CbG9ja2NoYWlucyA9IEJsb2NrY2hhaW5zID0gX0Jsb2NrY2hhaW5zO1xuICBleHBvcnRzLkJsb2NrY2hhaW5zQXJyYXkgPSBCbG9ja2NoYWluc0FycmF5ID0gT2JqZWN0LmtleXMoQmxvY2tjaGFpbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgdmFsdWU6IEJsb2NrY2hhaW5zW2tleV1cbiAgICB9O1xuICB9KTtcbiAgaWYgKF9ibG9ja2NoYWluTmFtZVBhcnNlcikgZXhwb3J0cy5ibG9ja2NoYWluTmFtZSA9IGJsb2NrY2hhaW5OYW1lID0gX2Jsb2NrY2hhaW5OYW1lUGFyc2VyO1xufTtcblxuZXhwb3J0cy5zZXRCbG9ja2NoYWlucyA9IHNldEJsb2NrY2hhaW5zOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9IaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL0hpc3RvcnlcIikpO1xuXG52YXIgX0FjY291bnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9BY2NvdW50XCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL1Rva2VuXCIpKTtcblxudmFyIEhpc3RvcmljRXhjaGFuZ2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9IaXN0b3J5KSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoSGlzdG9yaWNFeGNoYW5nZSwgX0hpc3RvcnkpO1xuXG4gIGZ1bmN0aW9uIEhpc3RvcmljRXhjaGFuZ2UoZnJvbSwgdG8sIGZyb21Ub2tlbiwgdG9Ub2tlbiwgb3JkZXJEZXRhaWxzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIHR4aWQgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6ICcnO1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgSGlzdG9yaWNFeGNoYW5nZSk7XG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yW1wiZGVmYXVsdFwiXSkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjJbXCJkZWZhdWx0XCJdKShIaXN0b3JpY0V4Y2hhbmdlKS5jYWxsKHRoaXMsIF9IaXN0b3J5Mi5ISVNUT1JZX1RZUEVTLkV4Y2hhbmdlLCB0eGlkKSk7XG4gICAgX3RoaXMuZnJvbSA9IGZyb207XG4gICAgX3RoaXMudG8gPSB0bztcbiAgICBfdGhpcy5mcm9tVG9rZW4gPSBmcm9tVG9rZW47XG4gICAgX3RoaXMudG9Ub2tlbiA9IHRvVG9rZW47XG4gICAgX3RoaXMub3JkZXJEZXRhaWxzID0gb3JkZXJEZXRhaWxzO1xuICAgIF90aGlzLnN0YXR1cyA9ICdwZW5kaW5nJztcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEhpc3RvcmljRXhjaGFuZ2UsIG51bGwsIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBIaXN0b3JpY0V4Y2hhbmdlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHZhciBwID0gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgICAgcC5mcm9tID0gX0FjY291bnRbXCJkZWZhdWx0XCJdLmZyb21Kc29uKGpzb24uZnJvbSk7XG4gICAgICBwLmZyb21Ub2tlbiA9IF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oanNvbi5mcm9tVG9rZW4pO1xuICAgICAgcC50b1Rva2VuID0gX1Rva2VuW1wiZGVmYXVsdFwiXS5mcm9tSnNvbihqc29uLnRvVG9rZW4pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBIaXN0b3JpY0V4Y2hhbmdlO1xufShfSGlzdG9yeTJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBIaXN0b3JpY0V4Y2hhbmdlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9JZEdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWwvSWRHZW5lcmF0b3JcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIi4vQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfU3RvcmVTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2VydmljZXMvdXRpbGl0eS9TdG9yZVNlcnZpY2VcIikpO1xuXG52YXIgX0JhbGFuY2VTZXJ2aWNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2VydmljZXMvYmxvY2tjaGFpbi9CYWxhbmNlU2VydmljZVwiKSk7XG5cbnZhciBUb2tlbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRva2VuKCkge1xuICAgIHZhciBibG9ja2NoYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuICAgIHZhciBjb250cmFjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG4gICAgdmFyIHN5bWJvbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJyc7XG4gICAgdmFyIG5hbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG4gICAgdmFyIGRlY2ltYWxzID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBudWxsO1xuICAgIHZhciBjaGFpbklkID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiAnJztcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFRva2VuKTtcbiAgICB0aGlzLmlkID0gX0lkR2VuZXJhdG9yW1wiZGVmYXVsdFwiXS50ZXh0KDI0KTtcbiAgICB0aGlzLmJsb2NrY2hhaW4gPSBibG9ja2NoYWluO1xuICAgIHRoaXMuY29udHJhY3QgPSBjb250cmFjdDtcbiAgICB0aGlzLnN5bWJvbCA9IHN5bWJvbDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lID8gbmFtZSA6IHN5bWJvbDtcbiAgICB0aGlzLmRlY2ltYWxzID0gZGVjaW1hbHMgPyBkZWNpbWFscyA6IDI7XG4gICAgdGhpcy5hbW91bnQgPSAwO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNoYWluSWQ7XG4gICAgdGhpcy51bnVzYWJsZSA9IG51bGw7XG4gICAgdGhpcy5mcm9tT3JpZ2luID0gJyc7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSArbmV3IERhdGUoKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoVG9rZW4sIFt7XG4gICAga2V5OiBcImlzVmFsaWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzKS5sZW5ndGggIT09IDExKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gX0Jsb2NrY2hhaW5zLkJsb2NrY2hhaW5zQXJyYXkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnZhbHVlO1xuICAgICAgfSkuaW5jbHVkZXModGhpcy5ibG9ja2NoYWluKSAmJiB0aGlzLmNvbnRyYWN0Lmxlbmd0aCAmJiB0aGlzLnN5bWJvbC5sZW5ndGggJiYgdGhpcy5uYW1lLmxlbmd0aCAmJiB0aGlzLmRlY2ltYWxzLnRvU3RyaW5nKCkubGVuZ3RoICYmIHRoaXMuY2hhaW5JZC5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIFRva2VuLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidW5pcXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLmJsb2NrY2hhaW4sIFwiOlwiKS5jb25jYXQodGhpcy5jb250cmFjdC50b0xvd2VyQ2FzZSgpLCBcIjpcIikuY29uY2F0KHRoaXMuc3ltYm9sLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1bmlxdWVXaXRoQ2hhaW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5pcXVlV2l0aENoYWluKCkge1xuICAgICAgdmFyIGluY2x1ZGVVbnVzYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLmJsb2NrY2hhaW4sIFwiOlwiKS5jb25jYXQodGhpcy5jb250cmFjdC50b0xvd2VyQ2FzZSgpLCBcIjpcIikuY29uY2F0KHRoaXMuc3ltYm9sLnRvTG93ZXJDYXNlKCksIFwiOlwiKS5jb25jYXQodGhpcy5jaGFpbklkKS5jb25jYXQoaW5jbHVkZVVudXNhYmxlICYmIHRoaXMudW51c2FibGUgPyBcIjpcIi5jb25jYXQodGhpcy51bnVzYWJsZSkgOiAnJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlkZW50aWZpYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmaWFibGUoKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQodGhpcy5ibG9ja2NoYWluLCBcIjpcIikuY29uY2F0KHRoaXMuY29udHJhY3QudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQocXVhbnRpdHkpIHtcbiAgICAgIHRoaXMuYW1vdW50ID0gKHBhcnNlRmxvYXQodGhpcy5hbW91bnQpICsgcGFyc2VGbG9hdChxdWFudGl0eSkpLnRvRml4ZWQodGhpcy5kZWNpbWFscyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5ldHdvcmtcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmV0d29yaygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXR3b3JrcyA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3M7XG5cbiAgICAgIGlmICghdGhpcy5jaGFpbklkIHx8ICF0aGlzLmNoYWluSWQubGVuZ3RoKSByZXR1cm4gbmV0d29ya3MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLnBsdWdpbihfdGhpcy5ibG9ja2NoYWluKS5nZXRFbmRvcnNlZE5ldHdvcmsoKS51bmlxdWUoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldHdvcmtzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHguYmxvY2tjaGFpbiA9PT0gX3RoaXMuYmxvY2tjaGFpbiAmJiB4LmNoYWluSWQgPT09IF90aGlzLmNoYWluSWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0dGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvcm1hdHRlZCgpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLmFtb3VudCwgXCIgXCIpLmNvbmNhdCh0aGlzLnN5bWJvbCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpYXRCYWxhbmNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpYXRCYWxhbmNlKCkge1xuICAgICAgdmFyIHdpdGhTeW1ib2wgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG4gICAgICB2YXIgcHJpY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICAgICB2YXIgdW51c2FibGVSZXBsYWNlbWVudCA9IHRoaXMudW5pcXVlV2l0aENoYWluKCkucmVwbGFjZShcIjpcIi5jb25jYXQodGhpcy51bnVzYWJsZSksICcnKTtcblxuICAgICAgaWYgKF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnByaWNlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnVuaXF1ZVdpdGhDaGFpbigpKSkge1xuICAgICAgICBwcmljZSA9IHByaWNlID8gcHJpY2UgOiBwYXJzZUZsb2F0KF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnByaWNlc1t0aGlzLnVuaXF1ZVdpdGhDaGFpbigpXVtfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlDdXJyZW5jeV0pO1xuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQocGFyc2VGbG9hdChwcmljZSAqIHBhcnNlRmxvYXQodGhpcy5hbW91bnQpKS50b0ZpeGVkKDQpLCBcIiBcIikuY29uY2F0KHdpdGhTeW1ib2wgPyBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlDdXJyZW5jeSA6ICcnKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51bnVzYWJsZSAmJiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5wcmljZXMuaGFzT3duUHJvcGVydHkodW51c2FibGVSZXBsYWNlbWVudCkpIHtcbiAgICAgICAgcHJpY2UgPSBwcmljZSA/IHByaWNlIDogcGFyc2VGbG9hdChfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5wcmljZXNbdW51c2FibGVSZXBsYWNlbWVudF1bX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5kaXNwbGF5Q3VycmVuY3ldKTtcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHBhcnNlRmxvYXQocHJpY2UgKiBwYXJzZUZsb2F0KHRoaXMuYW1vdW50KSkudG9GaXhlZCg0KSwgXCIgXCIpLmNvbmNhdCh3aXRoU3ltYm9sID8gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5kaXNwbGF5Q3VycmVuY3kgOiAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmlhdFByaWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpYXRQcmljZSgpIHtcbiAgICAgIHZhciB3aXRoU3ltYm9sID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICBpZiAoX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUucHJpY2VzLmhhc093blByb3BlcnR5KHRoaXMudW5pcXVlV2l0aENoYWluKCkpKSB7XG4gICAgICAgIHZhciBwcmljZSA9IHBhcnNlRmxvYXQoX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUucHJpY2VzW3RoaXMudW5pcXVlV2l0aENoYWluKCldW19TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIuc2V0dGluZ3MuZGlzcGxheUN1cnJlbmN5XSk7XG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChwYXJzZUZsb2F0KHByaWNlKS50b0ZpeGVkKDQpLCBcIiBcIikuY29uY2F0KHdpdGhTeW1ib2wgPyBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5zY2F0dGVyLnNldHRpbmdzLmRpc3BsYXlDdXJyZW5jeSA6ICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJiYXNlVG9rZW5QcmljZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiYXNlVG9rZW5QcmljZSgpIHtcbiAgICAgIHZhciB3aXRoU3ltYm9sID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICBpZiAoX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUucHJpY2VzLmhhc093blByb3BlcnR5KHRoaXMudW5pcXVlV2l0aENoYWluKCkpKSB7XG4gICAgICAgIHZhciBzeXN0ZW1Ub2tlbiA9IHRoaXMubmV0d29yaygpLnN5c3RlbVRva2VuKCk7XG4gICAgICAgIGlmICh0aGlzLnVuaXF1ZVdpdGhDaGFpbihmYWxzZSkgPT09IHN5c3RlbVRva2VuLnVuaXF1ZVdpdGhDaGFpbihmYWxzZSkpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgYmFzZVRva2VuUHJpY2UgPSBwYXJzZUZsb2F0KF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnByaWNlc1tzeXN0ZW1Ub2tlbi51bmlxdWVXaXRoQ2hhaW4oKV1bX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5kaXNwbGF5Q3VycmVuY3ldKTtcbiAgICAgICAgdmFyIHByaWNlID0gcGFyc2VGbG9hdChfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5wcmljZXNbdGhpcy51bmlxdWVXaXRoQ2hhaW4oKV1bX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5kaXNwbGF5Q3VycmVuY3ldKTtcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHBhcnNlRmxvYXQocHJpY2UgLyBiYXNlVG9rZW5QcmljZSkudG9GaXhlZCgxMCksIFwiIFwiKS5jb25jYXQod2l0aFN5bWJvbCA/IHN5c3RlbVRva2VuLnN5bWJvbCA6ICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0b3RhbEJhbGFuY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG90YWxCYWxhbmNlKCkge1xuICAgICAgaWYgKF9CYWxhbmNlU2VydmljZVtcImRlZmF1bHRcIl0udG90YWxCYWxhbmNlcyhmYWxzZSkudG90YWxzLmhhc093blByb3BlcnR5KHRoaXMudW5pcXVlV2l0aENoYWluKCkpKSB7XG4gICAgICAgIHJldHVybiBfQmFsYW5jZVNlcnZpY2VbXCJkZWZhdWx0XCJdLnRvdGFsQmFsYW5jZXMoZmFsc2UpLnRvdGFsc1t0aGlzLnVuaXF1ZVdpdGhDaGFpbigpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzeW1ib2xDbGFzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzeW1ib2xDbGFzcygpIHtcbiAgICAgIHZhciBpY29uU2VhcmNoID0gXCJcIi5jb25jYXQodGhpcy5ibG9ja2NoYWluLCBcIi1cIikuY29uY2F0KHRoaXMuc3ltYm9sKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGljb25zID0gWydldGgtdHVzZCcsICdidGMtYnRjJywgJ2Vvcy1lb3MnLCAnZXRoLWRhaScsICd0cngtdHJ4JywgJ2V0aC1ldGgnXTtcbiAgICAgIHJldHVybiBpY29ucy5pbmNsdWRlcyhpY29uU2VhcmNoKSA/IFwidG9rZW4taWNvbiB0b2tlbi1cIi5jb25jYXQoaWNvblNlYXJjaCkgOiBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cnVuY2F0ZWRTeW1ib2xcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJ1bmNhdGVkU3ltYm9sKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ltYm9sLmxlbmd0aCA+IDQgPyB0aGlzLnN5bWJvbC5zdWJzdHIoMCwgNCkgOiB0aGlzLnN5bWJvbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudHMoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4uYWNjb3VudHMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmJsb2NrY2hhaW4oKSA9PT0gX3RoaXMyLmJsb2NrY2hhaW4gJiYgeC5uZXR3b3JrKCkuY2hhaW5JZCA9PT0gX3RoaXMyLmNoYWluSWQ7XG4gICAgICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgeCkge1xuICAgICAgICBpZiAoIWFjYy5maW5kKGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgcmV0dXJuIHkuc2VuZGFibGUoKSA9PT0geC5zZW5kYWJsZSgpO1xuICAgICAgICB9KSkgYWNjLnB1c2goeCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBbXSk7IC8vIFByb2JsZW0gd2l0aCBkb2luZyB0aGlzIGlzIHRoYXQgaWYgdGhlIGJhbGFuY2UgY2hlY2tzIGZhaWwgdGhlbiBhY2NvdW50cyBuZXZlciBzaG93IHVwLlxuICAgICAgLy8gY29uc3Qgc3RhdGUgPSBTdG9yZVNlcnZpY2UuZ2V0KCkuc3RhdGU7XG4gICAgICAvLyBpZighc3RhdGUuYmFsYW5jZXMpIHJldHVybiBbXTtcbiAgICAgIC8vIHJldHVybiBPYmplY3Qua2V5cyhzdGF0ZS5iYWxhbmNlcykucmVkdWNlKChhY2MsYWNjb3VudFVuaXF1ZSkgPT4ge1xuICAgICAgLy8gXHRpZihzdGF0ZS5iYWxhbmNlc1thY2NvdW50VW5pcXVlXS5maW5kKHRva2VuID0+IHRva2VuLnVuaXF1ZVdpdGhDaGFpbigpID09PSB0aGlzLnVuaXF1ZVdpdGhDaGFpbigpKSl7XG4gICAgICAvLyBcdFx0aWYoIWFjYy5maW5kKHggPT4geC5pZGVudGlmaWFibGUoKSA9PT0gYWNjb3VudFVuaXF1ZSkpe1xuICAgICAgLy8gXHRcdFx0YWNjLnB1c2goc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5maW5kKHggPT4geC5pZGVudGlmaWFibGUoKSA9PT0gYWNjb3VudFVuaXF1ZSkpO1xuICAgICAgLy8gXHRcdH1cbiAgICAgIC8vIFx0fVxuICAgICAgLy8gXHRyZXR1cm4gYWNjO1xuICAgICAgLy8gfSwgW10pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBUb2tlbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICB2YXIgcCA9IE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLCBqc29uKTtcbiAgICAgIGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpIHx8ICFqc29uLm5hbWUubGVuZ3RoKSBwLm5hbWUgPSBqc29uLnN5bWJvbDtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tVW5pcXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21VbmlxdWUodW5pcXVlKSB7XG4gICAgICB2YXIgcCA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgdmFyIF91bmlxdWUkc3BsaXQgPSB1bmlxdWUuc3BsaXQoJzonKSxcbiAgICAgICAgICBfdW5pcXVlJHNwbGl0MiA9ICgwLCBfc2xpY2VkVG9BcnJheTJbXCJkZWZhdWx0XCJdKShfdW5pcXVlJHNwbGl0LCA0KSxcbiAgICAgICAgICBibG9ja2NoYWluID0gX3VuaXF1ZSRzcGxpdDJbMF0sXG4gICAgICAgICAgY29udHJhY3QgPSBfdW5pcXVlJHNwbGl0MlsxXSxcbiAgICAgICAgICBzeW1ib2wgPSBfdW5pcXVlJHNwbGl0MlsyXSxcbiAgICAgICAgICBjaGFpbklkID0gX3VuaXF1ZSRzcGxpdDJbM107XG5cbiAgICAgIHAuYmxvY2tjaGFpbiA9IGJsb2NrY2hhaW47XG4gICAgICBwLmNvbnRyYWN0ID0gY29udHJhY3Q7XG4gICAgICBwLnN5bWJvbCA9IHN5bWJvbCA/IHN5bWJvbC50b1VwcGVyQ2FzZSgpIDogJ0lOVkFMSURfVE9LRU4nO1xuICAgICAgcC5jaGFpbklkID0gY2hhaW5JZDtcbiAgICAgIHAuZGVjaW1hbHMgPSBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKGJsb2NrY2hhaW4pLmRlZmF1bHREZWNpbWFscygpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNvcnRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgdmFyIHVudG91Y2hhYmxlID0gISFiLnVudXNhYmxlID8gMSA6ICEhYS51bnVzYWJsZSA/IC0xIDogMDtcblxuICAgICAgdmFyIHN5c3RlbVRva2VuVW5pcXVlcyA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIubmV0d29ya1Rva2VucygpLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC51bmlxdWVXaXRoQ2hhaW4oZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBpc1NlbGZTeXN0ZW0gPSBzeXN0ZW1Ub2tlblVuaXF1ZXMuaW5jbHVkZXMoYi51bmlxdWVXaXRoQ2hhaW4oZmFsc2UpKSA/IDEgOiBzeXN0ZW1Ub2tlblVuaXF1ZXMuaW5jbHVkZXMoYS51bmlxdWVXaXRoQ2hhaW4oZmFsc2UpKSA/IC0xIDogMDtcbiAgICAgIHJldHVybiBpc1NlbGZTeXN0ZW0gfHwgdW50b3VjaGFibGUgfHwgKGIuZmlhdEJhbGFuY2UoZmFsc2UpIHx8IDApIC0gKGEuZmlhdEJhbGFuY2UoZmFsc2UpIHx8IDApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9rZW47XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVG9rZW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9hZXNPb3AgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJhZXMtb29wXCIpKTtcblxudmFyIF9CbG9ja2NoYWlucyA9IHJlcXVpcmUoXCIuL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX0lkR2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbC9JZEdlbmVyYXRvclwiKSk7XG5cbnZhciBfRXh0ZXJuYWxXYWxsZXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hhcmR3YXJlL0V4dGVybmFsV2FsbGV0XCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBLZXlwYWlyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gS2V5cGFpcigpIHtcbiAgICB2YXIgYmxvY2tjaGFpbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgS2V5cGFpcik7XG4gICAgdGhpcy5pZCA9IF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0udGV4dCgyNCk7XG4gICAgdGhpcy5uYW1lID0gJyc7XG4gICAgdGhpcy5wcml2YXRlS2V5ID0gJyc7XG4gICAgdGhpcy5leHRlcm5hbCA9IG51bGw7XG4gICAgdGhpcy5mb3JrID0gbnVsbDtcbiAgICB0aGlzLnB1YmxpY0tleXMgPSBbXTtcbiAgICB0aGlzLmJsb2NrY2hhaW5zID0gYmxvY2tjaGFpbnM7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSArbmV3IERhdGUoKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoS2V5cGFpciwgW3tcbiAgICBrZXk6IFwicmVzZXRFeHRlcm5hbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldEV4dGVybmFsKCkge1xuICAgICAgdGhpcy5leHRlcm5hbFtcImludGVyZmFjZVwiXS5jbG9zZSgpO1xuICAgICAgdGhpcy5leHRlcm5hbFtcImludGVyZmFjZVwiXS5vcGVuKCk7IC8vIHRoaXMuZXh0ZXJuYWwgPSBFeHRlcm5hbFdhbGxldC5mcm9tSnNvbih0aGlzLmV4dGVybmFsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWNjb3VudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjb3VudHMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgdW5pcXVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcblxuICAgICAgdmFyIGFjY291bnRzID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2V5cGFpclVuaXF1ZSA9PT0gX3RoaXMudW5pcXVlKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCF1bmlxdWUpIHJldHVybiBhY2NvdW50cztcbiAgICAgIHJldHVybiBhY2NvdW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYWNjb3VudCkge1xuICAgICAgICBpZiAoIWFjYy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgcmV0dXJuIGFjY291bnQubmV0d29yaygpLnVuaXF1ZSgpID09PSB4Lm5ldHdvcmsoKS51bmlxdWUoKSAmJiBhY2NvdW50LnNlbmRhYmxlKCkgPT09IHguc2VuZGFibGUoKTtcbiAgICAgICAgfSkpIGFjYy5wdXNoKGFjY291bnQpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVkS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZWRLZXkoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXMucHVibGljS2V5cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmJsb2NrY2hhaW4gPT09IF90aGlzMi5ibG9ja2NoYWluc1swXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc1VuaXF1ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1VuaXF1ZSgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLnNjYXR0ZXIua2V5Y2hhaW4ua2V5cGFpcnMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5lbmFibGVkS2V5KCkua2V5ID09PSBfdGhpczMuZW5hYmxlZEtleSgpLmtleTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXROYW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE5hbWUoKSB7XG4gICAgICB0aGlzLm5hbWUgPSBcIlwiLmNvbmNhdCgoMCwgX0Jsb2NrY2hhaW5zLmJsb2NrY2hhaW5OYW1lKSh0aGlzLmVuYWJsZWRLZXkoKS5ibG9ja2NoYWluKSwgXCIgS2V5IC0gXCIpLmNvbmNhdChuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpLCBcIiAtIFwiKS5jb25jYXQoX0lkR2VuZXJhdG9yW1wiZGVmYXVsdFwiXS50ZXh0KDQpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidW5pcXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9uZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHJldHVybiBLZXlwYWlyLmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gICAgLyoqKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgYSBwcml2YXRlIGtleSBpcyBlbmNyeXB0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJpc0VuY3J5cHRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VuY3J5cHRlZCgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcml2YXRlS2V5ID09PSAnc3RyaW5nJyAmJiB0aGlzLnByaXZhdGVLZXkubGVuZ3RoID4gMTAwO1xuICAgIH1cbiAgICAvKioqXHJcbiAgICAgKiBFbmNyeXB0cyB0aGlzIEtleXBhaXIncyBQcml2YXRlIEtleVxyXG4gICAgICogQHBhcmFtIHNlZWQgLSBUaGUgc2VlZCB0byBlbmNyeXB0IHdpdGhcclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZW5jcnlwdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNyeXB0KHNlZWQpIHtcbiAgICAgIGlmICghdGhpcy5pc0VuY3J5cHRlZCgpKSB0aGlzLnByaXZhdGVLZXkgPSBfYWVzT29wW1wiZGVmYXVsdFwiXS5lbmNyeXB0KHRoaXMucHJpdmF0ZUtleSwgc2VlZCk7XG4gICAgfVxuICAgIC8qKipcclxuICAgICAqIERlY3J5cHRzIHRoaXMgS2V5cGFpcidzIFByaXZhdGUgS2V5XHJcbiAgICAgKiBAcGFyYW0gc2VlZCAtIFRoZSBzZWVkIHRvIGRlY3J5cHQgd2l0aFxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkZWNyeXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlY3J5cHQoc2VlZCkge1xuICAgICAgaWYgKHRoaXMuaXNFbmNyeXB0ZWQoKSkge1xuICAgICAgICB0aGlzLnByaXZhdGVLZXkgPSBfYWVzT29wW1wiZGVmYXVsdFwiXS5kZWNyeXB0KHRoaXMucHJpdmF0ZUtleSwgc2VlZCk7XG4gICAgICAgIGlmICgoMCwgX3R5cGVvZjJbXCJkZWZhdWx0XCJdKSh0aGlzLnByaXZhdGVLZXkpID09PSAnb2JqZWN0JyAmJiB0aGlzLnByaXZhdGVLZXkuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkgdGhpcy5wcml2YXRlS2V5ID0gdGhpcy5wcml2YXRlS2V5LmRhdGE7XG4gICAgICB9XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoYmxvY2tjaGFpbnMpIHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcihibG9ja2NoYWlucyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHZhciBwID0gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgICAgaWYgKGpzb24uaGFzT3duUHJvcGVydHkoJ2V4dGVybmFsJykgJiYgISFqc29uLmV4dGVybmFsKSBwLmV4dGVybmFsID0gX0V4dGVybmFsV2FsbGV0W1wiZGVmYXVsdFwiXS5mcm9tSnNvbihqc29uLmV4dGVybmFsKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gS2V5cGFpcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBLZXlwYWlyOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgUGx1Z2luVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9QbHVnaW5UeXBlc1wiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0Jsb2NrY2hhaW5zXCIpO1xuXG52YXIgX1Rlc3RpbmdIZWxwZXIgPSByZXF1aXJlKFwiLi4vdXRpbC9UZXN0aW5nSGVscGVyXCIpO1xuXG52YXIgX0V4cGxvcmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vbW9kZWxzL0V4cGxvcmVyXCIpKTtcblxuLyoqKlxyXG4gKiBTZXR0aW5nIHVwIGZvciBwbHVnaW4gYmFzZWQgZ2VuZXJhdG9ycyxcclxuICogdGhpcyB3aWxsIGFkZCBtb3JlIGJsb2NrY2hhaW4gY29tcGF0aWJpbGl0eSBpbiB0aGUgZnV0dXJlLlxyXG4gKi9cbnZhciBQbHVnaW5SZXBvc2l0b3J5U2luZ2xldG9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGx1Z2luUmVwb3NpdG9yeVNpbmdsZXRvbigpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFBsdWdpblJlcG9zaXRvcnlTaW5nbGV0b24pO1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShQbHVnaW5SZXBvc2l0b3J5U2luZ2xldG9uLCBbe1xuICAgIGtleTogXCJsb2FkUGx1Z2luc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkUGx1Z2lucyhwbHVnaW5zKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBwbHVnaW5zLm1hcChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wbHVnaW5zLnB1c2gobmV3IHBsdWdpbigpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaWduYXR1cmVQcm92aWRlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2lnbmF0dXJlUHJvdmlkZXJzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGx1Z2lucy5maWx0ZXIoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLnR5cGUgPT09IFBsdWdpblR5cGVzLkJMT0NLQ0hBSU5fU1VQUE9SVDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwbHVnaW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGx1Z2luKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnBsdWdpbnMuZmluZChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0RXhwbG9yZXJzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRFeHBsb3JlcnMoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIF9CbG9ja2NoYWlucy5CbG9ja2NoYWluc0FycmF5LnJlZHVjZShmdW5jdGlvbiAoYWNjLCB4KSB7XG4gICAgICAgIGlmIChfdGhpczIucGx1Z2luKHgudmFsdWUpKSB7XG4gICAgICAgICAgYWNjW3gudmFsdWVdID0gX0V4cGxvcmVyW1wiZGVmYXVsdFwiXS5mcm9tSnNvbih7XG4gICAgICAgICAgICByYXc6IF90aGlzMi5wbHVnaW4oeC52YWx1ZSkuZGVmYXVsdEV4cGxvcmVyKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJ1c3RDYWNoZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVzdENhY2hlcygpIHtcbiAgICAgIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJzKCkubWFwKGZ1bmN0aW9uIChzcCkge1xuICAgICAgICByZXR1cm4gc3AuYnVzdENhY2hlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFBsdWdpblJlcG9zaXRvcnlTaW5nbGV0b247XG59KCk7XG5cbnZhciBQbHVnaW5SZXBvc2l0b3J5ID0gbmV3IFBsdWdpblJlcG9zaXRvcnlTaW5nbGV0b24oKTtcbnZhciBfZGVmYXVsdCA9IFBsdWdpblJlcG9zaXRvcnk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5FcnJvckNvZGVzID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgRXJyb3JUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL0Vycm9yVHlwZXNcIikpO1xuXG52YXIgRXJyb3JDb2RlcyA9IHtcbiAgTk9fU0lHTkFUVVJFOiA0MDIsXG4gIEZPUkJJRERFTjogNDAzLFxuICBUSU1FRF9PVVQ6IDQwOCxcbiAgTE9DS0VEOiA0MjMsXG4gIFVQR1JBREVfUkVRVUlSRUQ6IDQyNixcbiAgVE9PX01BTllfUkVRVUVTVFM6IDQyOVxufTtcbmV4cG9ydHMuRXJyb3JDb2RlcyA9IEVycm9yQ29kZXM7XG5cbnZhciBFcnJvciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVycm9yKF90eXBlLCBfbWVzc2FnZSkge1xuICAgIHZhciBfY29kZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogRXJyb3JDb2Rlcy5MT0NLRUQ7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEVycm9yKTtcbiAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcbiAgICB0aGlzLmNvZGUgPSBfY29kZTtcbiAgICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShFcnJvciwgbnVsbCwgW3tcbiAgICBrZXk6IFwibG9ja2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvY2tlZCgpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoRXJyb3JUeXBlcy5MT0NLRUQsIFwiVGhlIHVzZXIncyBTY2F0dGVyIGlzIGxvY2tlZC4gVGhleSBoYXZlIGJlZW4gbm90aWZpZWQgYW5kIHNob3VsZCB1bmxvY2sgYmVmb3JlIGNvbnRpbnVpbmcuXCIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaWduYXR1cmVFcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaWduYXR1cmVFcnJvcihfdHlwZSwgX21lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoX3R5cGUsIF9tZXNzYWdlLCBFcnJvckNvZGVzLk5PX1NJR05BVFVSRSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1hbGljaW91c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYWxpY2lvdXMoX21lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoRXJyb3JUeXBlcy5NQUxJQ0lPVVMsIF9tZXNzYWdlLCBFcnJvckNvZGVzLkZPUkJJRERFTik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlamVjdGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlamVjdGVkKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihFcnJvclR5cGVzLlJFSkVDVEVELCAnVGhlIHVzZXIgcmVqZWN0ZWQgdGhlIHJlcXVlc3QuJywgRXJyb3JDb2Rlcy5OT19TSUdOQVRVUkUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpZGVudGl0eU1pc3NpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpdHlNaXNzaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlRXJyb3IoXCJpZGVudGl0eV9taXNzaW5nXCIsIFwiSWRlbnRpdHkgbm8gbG9uZ2VyIGV4aXN0cyBvbiB0aGUgdXNlcidzIGtleWNoYWluIG9yIHVzZXIgaXMgbm90IGxvZ2dlZCBpbi5cIik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJhZE5ldHdvcmtcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmFkTmV0d29yaygpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZUVycm9yKFwiYmFkX25ldHdvcmtcIiwgXCJUaGUgbmV0d29yayB5b3UgcHJvdmlkZWQgaXMgbWFsZm9ybWVkLlwiKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibm9LZXlwYWlyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5vS2V5cGFpcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZUVycm9yKFwibm9fa2V5cGFpclwiLCBcIlRoZSBwdWJsaWMga2V5IHlvdSBwcm92aWRlZCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgdXNlcidzIGtleWNoYWluLlwiKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2lnbmF0dXJlQWNjb3VudE1pc3NpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2lnbmF0dXJlQWNjb3VudE1pc3NpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVFcnJvcihcImFjY291bnRfbWlzc2luZ1wiLCBcIllvdSBhcmUgdHJ5aW5nIHRvIHNpZ24gYSByZXF1ZXN0IHdpdGggYW4gYWNjb3VudCB0aGF0IGlzbid0IGN1cnJlbnRseSBsaW5rZWQgb3IgZG9lc24ndCBleGlzdCBpbiB0aGUgdXNlcidzIFNjYXR0ZXJcIik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNhbnRQYXJzZVRyYW5zYWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbnRQYXJzZVRyYW5zYWN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlRXJyb3IoXCJwYXJzaW5nX2Vycm9yXCIsIFwiU29tZXRoaW5nIGhhcHBlbmVkIHdoaWxlIHRyeWluZyB0byBwYXJzZSB0aGUgdHJhbnNhY3Rpb24gaW50ZXJuYWxseS5cIik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5vTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBub05ldHdvcmsoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVFcnJvcihcIm5vX25ldHdvcmtcIiwgXCJUaGlzIHVzZXIgZG9lcyBub3QgaGF2ZSB0aGlzIG5ldHdvcmsgaW4gdGhlaXIgU2NhdHRlci5cIik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFcnJvcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFcnJvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIExvY2FsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExvY2FsZSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIExvY2FsZSk7XG4gICAgdGhpcy5yYXcgPSBudWxsO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5tZXRob2RzID0ge307XG4gICAgdGhpcy5sb2NhbGVzID0ge307XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKExvY2FsZSwgW3tcbiAgICBrZXk6IFwicGFyc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhcnNlZCgpIHtcbiAgICAgIHJldHVybiBMb2NhbGUuZnJvbVJhdyhKU09OLnBhcnNlKHRoaXMucmF3KSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tUmF3XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21SYXcocmF3KSB7XG4gICAgICBpZiAoIXJhdykgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIoKTtcbiAgICAgIHZhciBwID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuICAgICAgcC5yYXcgPSByYXc7XG4gICAgICBwLm5hbWUgPSByYXcubmFtZTtcbiAgICAgIHJhdy5tZXRob2RzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICBwLm1ldGhvZHNbeC5uYW1lXSA9IG5ldyBGdW5jdGlvbih4LmFyZ3MsIHguYm9keSk7XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5rZXlzKHJhdy5sb2NhbGVzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBwLmxvY2FsZXNba2V5XSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgdmFyIHBhcnNlU3RyaW5nID0gZnVuY3Rpb24gcGFyc2VTdHJpbmcocykge1xuICAgICAgICAgICAgcyA9IHMucmVwbGFjZSgne3h9JywgeCk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwLm1ldGhvZHMpLm1hcChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzID0gcy5yZXBsYWNlKFwie1wiLmNvbmNhdChtZXRob2QsIFwifVwiKSwgcC5tZXRob2RzW21ldGhvZF0oeCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiByYXcubG9jYWxlc1trZXldID09PSAnc3RyaW5nJykgcmV0dXJuIHBhcnNlU3RyaW5nKHJhdy5sb2NhbGVzW2tleV0pO2Vsc2UgcmV0dXJuIHJhdy5sb2NhbGVzW2tleV0ubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VTdHJpbmcoeCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTG9jYWxlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IExvY2FsZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIFBsdWdpbiA9IGZ1bmN0aW9uIFBsdWdpbigpIHtcbiAgdmFyIF9uYW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcblxuICB2YXIgX3R5cGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuXG4gICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgUGx1Z2luKTtcbiAgdGhpcy5uYW1lID0gX25hbWU7XG4gIHRoaXMudHlwZSA9IF90eXBlO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQbHVnaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfTWV0YSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vTWV0YVwiKSk7XG5cbnZhciBfS2V5Y2hhaW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0tleWNoYWluXCIpKTtcblxudmFyIF9TZXR0aW5ncyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vU2V0dGluZ3NcIikpO1xuXG52YXIgX2Flc09vcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImFlcy1vb3BcIikpO1xuXG52YXIgX0hhc2hlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWwvSGFzaGVyXCIpKTtcblxudmFyIF9JZEdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWwvSWRHZW5lcmF0b3JcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX0lkZW50aXR5ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vSWRlbnRpdHlcIikpO1xuXG52YXIgX0NvbnRhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0NvbnRhY3RcIikpO1xuXG52YXIgU2NhdHRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNjYXR0ZXIoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBTY2F0dGVyKTtcbiAgICB0aGlzLm1ldGEgPSBfTWV0YVtcImRlZmF1bHRcIl0ucGxhY2Vob2xkZXIoKTtcbiAgICB0aGlzLmtleWNoYWluID0gX0tleWNoYWluW1wiZGVmYXVsdFwiXS5wbGFjZWhvbGRlcigpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBfU2V0dGluZ3NbXCJkZWZhdWx0XCJdLnBsYWNlaG9sZGVyKCk7XG4gICAgdGhpcy5jb250YWN0cyA9IFtdO1xuICAgIHRoaXMuaGFzaCA9IF9IYXNoZXJbXCJkZWZhdWx0XCJdLnVuc2FsdGVkUXVpY2tIYXNoKF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0udGV4dCgyMDQ4KSk7XG4gICAgdGhpcy5vbmJvYXJkZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBpbiA9IG51bGw7XG4gICAgdGhpcy5waW5Gb3JBbGwgPSBmYWxzZTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoU2NhdHRlciwgW3tcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gU2NhdHRlci5mcm9tSnNvbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzRW5jcnlwdGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5jcnlwdGVkKCkge1xuICAgICAgcmV0dXJuICgwLCBfdHlwZW9mMltcImRlZmF1bHRcIl0pKHRoaXMua2V5Y2hhaW4pICE9PSAnb2JqZWN0JztcbiAgICB9XG4gICAgLyoqKlxyXG4gICAgICogRW5jcnlwdHMgdGhlIGVudGlyZSBrZXljaGFpblxyXG4gICAgICogQHBhcmFtIHNlZWQgLSBUaGUgc2VlZCB0byBlbmNyeXB0IHdpdGhcclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVjcnlwdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWNyeXB0KHNlZWQpIHtcbiAgICAgIGlmICh0aGlzLmlzRW5jcnlwdGVkKCkpIHRoaXMua2V5Y2hhaW4gPSBfS2V5Y2hhaW5bXCJkZWZhdWx0XCJdLmZyb21Kc29uKF9hZXNPb3BbXCJkZWZhdWx0XCJdLmRlY3J5cHQodGhpcy5rZXljaGFpbiwgc2VlZCkpO1xuICAgIH1cbiAgICAvKioqXHJcbiAgICAgKiBEZWNyeXB0cyB0aGUgZW50aXJlIGtleWNoYWluXHJcbiAgICAgKiBAcGFyYW0gc2VlZCAtIFRoZSBzZWVkIHRvIGRlY3J5cHQgd2l0aFxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJlbmNyeXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY3J5cHQoc2VlZCkge1xuICAgICAgaWYgKCF0aGlzLmlzRW5jcnlwdGVkKCkpIHRoaXMua2V5Y2hhaW4gPSBfYWVzT29wW1wiZGVmYXVsdFwiXS5lbmNyeXB0KHRoaXMua2V5Y2hhaW4sIHNlZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzYXZhYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmFibGUoc2VlZCkge1xuICAgICAgLy8gRW5jcnlwdGluZyBpbi1wbGFjZS5cbiAgICAgIHRoaXMua2V5Y2hhaW4uY2FyZHMubWFwKGZ1bmN0aW9uIChjYXJkKSB7XG4gICAgICAgIHJldHVybiBjYXJkLmVuY3J5cHQoc2VlZCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMua2V5Y2hhaW4ua2V5cGFpcnMubWFwKGZ1bmN0aW9uIChrZXlwYWlyKSB7XG4gICAgICAgIHJldHVybiBrZXlwYWlyLmVuY3J5cHQoc2VlZCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMua2V5Y2hhaW4uaWRlbnRpdGllcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBpZC5lbmNyeXB0KHNlZWQpO1xuICAgICAgfSk7IC8vIEVuY3J5cHRpbmcgY2xvbmVcblxuICAgICAgdmFyIGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAgICAgY2xvbmUuZW5jcnlwdChzZWVkKTtcbiAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9XG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKioqKioqKioqKioqICBIRUxQRVJTICAgKioqKioqKioqKioqKi9cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibmV0d29ya1Rva2Vuc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZXR3b3JrVG9rZW5zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubmV0d29ya3MubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHguc3lzdGVtVG9rZW4oKTtcbiAgICAgICAgdG9rZW4uY2hhaW5JZCA9IHguY2hhaW5JZDtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHRva2VuKSB7XG4gICAgICAgIHZhciBleGlzdHMgPSBhY2MuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSB0b2tlbi51bmlxdWUoKSAmJiB4LmNoYWluSWQgPT09IHRva2VuLmNoYWluSWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV4aXN0cykgYWNjLnB1c2godG9rZW4pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhbGxUb2tlbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWxsVG9rZW5zKCkge1xuICAgICAgcmV0dXJuIHRoaXMubmV0d29ya1Rva2VucygpLmNvbmNhdCh0aGlzLnNldHRpbmdzLnRva2Vucyk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiY3JlYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfY3JlYXRlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKFxuICAgICAgLyojX19QVVJFX18qL1xuICAgICAgX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKCkge1xuICAgICAgICB2YXIgc2NhdHRlciwgZmlyc3RJZGVudGl0eTtcbiAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgc2NhdHRlciA9IG5ldyBTY2F0dGVyKCk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0uc2lnbmF0dXJlUHJvdmlkZXJzKCkubWFwKFxuICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlZiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKShcbiAgICAgICAgICAgICAgICAgIC8qI19fUFVSRV9fKi9cbiAgICAgICAgICAgICAgICAgIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlKHBsdWdpbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV0d29yaztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrID0gcGx1Z2luLmdldEVuZG9yc2VkTmV0d29yaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXIuc2V0dGluZ3MubmV0d29ya3MucHVzaChuZXR3b3JrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSgpKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGZpcnN0SWRlbnRpdHkgPSBfSWRlbnRpdHlbXCJkZWZhdWx0XCJdLnBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA2O1xuICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdElkZW50aXR5LmluaXRpYWxpemUoc2NhdHRlci5oYXNoKTtcblxuICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgZmlyc3RJZGVudGl0eS5uYW1lID0gJ015Rmlyc3RJZGVudGl0eSc7XG4gICAgICAgICAgICAgICAgc2NhdHRlci5rZXljaGFpbi5sb2NhdGlvbnMgPSBbX0lkZW50aXR5LkxvY2F0aW9uSW5mb3JtYXRpb24uZnJvbUpzb24oe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ0hvbWUnXG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGZpcnN0SWRlbnRpdHkubG9jYXRpb24gPSBzY2F0dGVyLmtleWNoYWluLmxvY2F0aW9uc1swXTtcbiAgICAgICAgICAgICAgICBzY2F0dGVyLmtleWNoYWluLnVwZGF0ZU9yUHVzaElkZW50aXR5KGZpcnN0SWRlbnRpdHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIHNjYXR0ZXIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUyKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gX2NyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3JlYXRlO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBTY2F0dGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHZhciBwID0gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgICAgaWYgKGpzb24uaGFzT3duUHJvcGVydHkoJ21ldGEnKSkgcC5tZXRhID0gX01ldGFbXCJkZWZhdWx0XCJdLmZyb21Kc29uKGpzb24ubWV0YSk7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnc2V0dGluZ3MnKSkgcC5zZXR0aW5ncyA9IF9TZXR0aW5nc1tcImRlZmF1bHRcIl0uZnJvbUpzb24oanNvbi5zZXR0aW5ncyk7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgna2V5Y2hhaW4nKSkgcC5rZXljaGFpbiA9IHR5cGVvZiBqc29uLmtleWNoYWluID09PSAnc3RyaW5nJyA/IGpzb24ua2V5Y2hhaW4gOiBfS2V5Y2hhaW5bXCJkZWZhdWx0XCJdLmZyb21Kc29uKGpzb24ua2V5Y2hhaW4pO1xuICAgICAgaWYgKGpzb24uaGFzT3duUHJvcGVydHkoJ2NvbnRhY3RzJykpIHAuY29udGFjdHMgPSBqc29uLmNvbnRhY3RzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gX0NvbnRhY3RbXCJkZWZhdWx0XCJdLmZyb21Kc29uKHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNjYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2NhdHRlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9IYXNoZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsL0hhc2hlclwiKSk7XG5cbnZhciBfSWRHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi91dGlsL0lkR2VuZXJhdG9yXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBfSWRlbnRpdHkgPSByZXF1aXJlKFwiLi9JZGVudGl0eVwiKTtcblxudmFyIFBlcm1pc3Npb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQZXJtaXNzaW9uKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgUGVybWlzc2lvbik7XG4gICAgdGhpcy5pZCA9IF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0ubnVtZXJpYygyNCk7IC8vIE1hbmRhdG9yeVxuXG4gICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICB0aGlzLmlkZW50aXR5ID0gJyc7XG4gICAgdGhpcy5hY2NvdW50cyA9IFtdOyAvLyBPcHRpb25hbFxuXG4gICAgdGhpcy5jb250cmFjdCA9IG51bGw7XG4gICAgdGhpcy5jb250cmFjdEhhc2ggPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLm11dGFibGVBY3Rpb25GaWVsZHMgPSBbXTtcbiAgICB0aGlzLmltbXV0YWJsZUFjdGlvbkZpZWxkcyA9IFtdO1xuICAgIHRoaXMudGltZXN0YW1wID0gMDtcbiAgICB0aGlzLmlkZW50aXR5UmVxdWlyZW1lbnRzID0gW107XG4gICAgdGhpcy5pc0lkZW50aXR5ID0gZmFsc2U7XG4gICAgdGhpcy5pc0lkZW50aXR5UmVxdWlyZW1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbnRyYWN0QWN0aW9uID0gZmFsc2U7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFBlcm1pc3Npb24sIFt7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIFBlcm1pc3Npb24uZnJvbUpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjaGVja3N1bVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja3N1bSgpIHtcbiAgICAgIHJldHVybiBfSGFzaGVyW1wiZGVmYXVsdFwiXS51bnNhbHRlZFF1aWNrSGFzaCh0aGlzLm9yaWdpbiArIHRoaXMuaWRlbnRpdHkgKyAodGhpcy5hY2NvdW50cyB8fCBbXSkuam9pbignLCcpICsgdGhpcy5jb250cmFjdCArIHRoaXMuY29udHJhY3RIYXNoICsgdGhpcy5hY3Rpb24gKyAodGhpcy5pZGVudGl0eVJlcXVpcmVtZW50cyB8fCBbXSkuam9pbignLCcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0SWRlbnRpdHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SWRlbnRpdHkoKSB7XG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5maW5kSWRlbnRpdHkodGhpcy5pZGVudGl0eSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEFjY291bnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFjY291bnRzKCkge1xuICAgICAgdmFyIGFjY291bnRzID0gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cztcblxuICAgICAgcmV0dXJuIHRoaXMuYWNjb3VudHMubWFwKGZ1bmN0aW9uICh1bmlxdWUpIHtcbiAgICAgICAgcmV0dXJuIGFjY291bnRzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4geC51bmlxdWUoKSA9PT0gdW5pcXVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc0lkZW50aXR5UGVybWlzc2lvbkZvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0lkZW50aXR5UGVybWlzc2lvbkZvcihvcmlnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmlzSWRlbnRpdHkgJiYgdGhpcy5vcmlnaW4gPT09IG9yaWdpbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNJZGVudGl0eVJlcXVpcmVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc0lkZW50aXR5UmVxdWlyZW1lbnRzKCkge1xuICAgICAgcmV0dXJuIF9JZGVudGl0eS5JZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21QZXJtaXNzaW9uKHRoaXMuaWRlbnRpdHlSZXF1aXJlbWVudHMpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBQZXJtaXNzaW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21BY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUFjdGlvbihvcmlnaW4sIGlkZW50aXR5LCBhY2NvdW50cywgYWRkZWQpIHtcbiAgICAgIHZhciBiYXNlID0gUGVybWlzc2lvbi5mcm9tSnNvbih7XG4gICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICBpZGVudGl0eTogaWRlbnRpdHkuaWQsXG4gICAgICAgIGFjY291bnRzOiBhY2NvdW50cy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4geC51bmlxdWUoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYmFzZSwgYWRkZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVJbW11dGFibGVGaWVsZHNIYXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUltbXV0YWJsZUZpZWxkc0hhc2goYWxsRmllbGRzLCBtdXRhYmxlRmllbGRzKSB7XG4gICAgICByZXR1cm4gX0hhc2hlcltcImRlZmF1bHRcIl0udW5zYWx0ZWRRdWlja0hhc2goT2JqZWN0LmtleXMoYWxsRmllbGRzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIW11dGFibGVGaWVsZHMuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIGFsbEZpZWxkc1trZXldO2Vsc2UgcmV0dXJuIG51bGw7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9KS5zb3J0KCkuam9pbignLCcpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFBlcm1pc3Npb247XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGVybWlzc2lvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQkxPQ0tDSEFJTl9TVVBQT1JUID0gdm9pZCAwO1xudmFyIEJMT0NLQ0hBSU5fU1VQUE9SVCA9ICdibG9ja2NoYWluX3N1cHBvcnQnO1xuZXhwb3J0cy5CTE9DS0NIQUlOX1NVUFBPUlQgPSBCTE9DS0NIQUlOX1NVUFBPUlQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfUGx1Z2luID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9QbHVnaW5cIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgUGx1Z2luVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9QbHVnaW5UeXBlc1wiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgUGx1Z2luOiBfUGx1Z2luW1wiZGVmYXVsdFwiXSxcbiAgUGx1Z2luUmVwb3NpdG9yeTogX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLFxuICBQbHVnaW5UeXBlczogUGx1Z2luVHlwZXNcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX1BsdWdpblJlcG9zaXRvcnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnlcIikpO1xuXG52YXIgX0Jsb2NrY2hhaW5zID0gcmVxdWlyZShcIi4vQmxvY2tjaGFpbnNcIik7XG5cbnZhciBfVG9rZW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1Rva2VuXCIpKTtcblxudmFyIF9TdG9yZVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1N0b3JlU2VydmljZVwiKSk7XG5cbnZhciBBY2NvdW50ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWNjb3VudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEFjY291bnQpO1xuICAgIHRoaXMua2V5cGFpclVuaXF1ZSA9ICcnO1xuICAgIHRoaXMubmV0d29ya1VuaXF1ZSA9ICcnO1xuICAgIHRoaXMucHVibGljS2V5ID0gJyc7XG4gICAgdGhpcy5uYW1lID0gJyc7XG4gICAgdGhpcy5hdXRob3JpdHkgPSAnJztcbiAgICB0aGlzLmxvZ2lucyA9IDA7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSArbmV3IERhdGUoKTtcbiAgICB0aGlzLmZyb21PcmlnaW4gPSBudWxsO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShBY2NvdW50LCBbe1xuICAgIGtleTogXCJzZW5kYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZW5kYWJsZSgpIHtcbiAgICAgIHJldHVybiBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKHRoaXMuYmxvY2tjaGFpbigpKS5hY2NvdW50c0FyZUltcG9ydGVkKCkgPyB0aGlzLm5hbWUgOiB0aGlzLnB1YmxpY0tleTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0dGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvcm1hdHRlZCgpIHtcbiAgICAgIHJldHVybiBfUGx1Z2luUmVwb3NpdG9yeVtcImRlZmF1bHRcIl0ucGx1Z2luKHRoaXMuYmxvY2tjaGFpbigpKS5hY2NvdW50Rm9ybWF0dGVyKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuZXR3b3JrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5ldHdvcmsoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5zZXR0aW5ncy5uZXR3b3Jrcy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSBfdGhpcy5uZXR3b3JrVW5pcXVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImtleXBhaXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24ga2V5cGFpcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5rZXlwYWlycy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnVuaXF1ZSgpID09PSBfdGhpczIua2V5cGFpclVuaXF1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJibG9ja2NoYWluXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJsb2NrY2hhaW4oKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmtleXBhaXIoKSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ2FjY291bnQuYmxvY2tjaGFpbigpIGVycm9yJyk7XG4gICAgICByZXR1cm4gdGhpcy5rZXlwYWlyKCkucHVibGljS2V5cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmtleSA9PT0gX3RoaXMzLnB1YmxpY0tleTtcbiAgICAgIH0pLmJsb2NrY2hhaW47XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImF1dGhvcml0aWVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF1dGhvcml0aWVzKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciB0aGlzS2V5T25seSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5hdXRob3JpdHkubGVuZ3RoKSByZXR1cm4gW107XG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuc2NhdHRlci5rZXljaGFpbi5hY2NvdW50cy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHguaWRlbnRpZmlhYmxlKCkgPT09IF90aGlzNC5pZGVudGlmaWFibGUoKSAmJiAoIXRoaXNLZXlPbmx5IHx8IHgua2V5cGFpclVuaXF1ZSA9PT0gX3RoaXM0LmtleXBhaXJVbmlxdWUpO1xuICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5hdXRob3JpdHkubG9jYWxlQ29tcGFyZShiLmF1dGhvcml0eSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFzRGFuZ2Vyb3VzQXV0aG9yaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0Rhbmdlcm91c0F1dGhvcml0eSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhvcml0aWVzKCkuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5hdXRob3JpdHkgPT09ICdvd25lcic7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidW5pcXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmtleXBhaXJVbmlxdWUgKyB0aGlzLm5ldHdvcmtVbmlxdWUgKyB0aGlzLm5hbWUgKyB0aGlzLmF1dGhvcml0eSArIHRoaXMucHVibGljS2V5O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpZGVudGlmaWFibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZmlhYmxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMubmV0d29ya1VuaXF1ZSArIHRoaXMuc2VuZGFibGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gQWNjb3VudC5mcm9tSnNvbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFzUmV0dXJuYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc1JldHVybmFibGUoKSB7XG4gICAgICB2YXIgcmV0dXJuYWJsZSA9IF9QbHVnaW5SZXBvc2l0b3J5W1wiZGVmYXVsdFwiXS5wbHVnaW4odGhpcy5ibG9ja2NoYWluKCkpLnJldHVybmFibGVBY2NvdW50KHRoaXMpO1xuXG4gICAgICByZXR1cm5hYmxlLmNoYWluSWQgPSB0aGlzLm5ldHdvcmsoKS5jaGFpbklkO1xuICAgICAgcmV0dXJuYWJsZS5pc0hhcmR3YXJlID0gISF0aGlzLmtleXBhaXIoKS5leHRlcm5hbDtcbiAgICAgIHJldHVybiByZXR1cm5hYmxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0b2tlbkNvdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRva2VuQ291bnQoKSB7XG4gICAgICB2YXIgc3lzdGVtVG9rZW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG4gICAgICBpZiAoIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmJhbGFuY2VzKSByZXR1cm4gMDtcbiAgICAgIGlmICghX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuYmFsYW5jZXMuaGFzT3duUHJvcGVydHkodGhpcy5pZGVudGlmaWFibGUoKSkpIHJldHVybiAwO1xuICAgICAgaWYgKCFfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5iYWxhbmNlc1t0aGlzLmlkZW50aWZpYWJsZSgpXSkgcmV0dXJuIDA7XG4gICAgICByZXR1cm4gX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuYmFsYW5jZXNbdGhpcy5pZGVudGlmaWFibGUoKV0uZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiAhc3lzdGVtVG9rZW4gPyB0cnVlIDogeC5pZGVudGlmaWFibGUoKSAhPT0gc3lzdGVtVG9rZW4uaWRlbnRpZmlhYmxlKCk7XG4gICAgICB9KS5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRva2Vuc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b2tlbnMoKSB7XG4gICAgICB2YXIgYmFzZSA9IFt0aGlzLm5ldHdvcmsoKS5zeXN0ZW1Ub2tlbigpXTtcbiAgICAgIGlmICghX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuYmFsYW5jZXMpIHJldHVybiBiYXNlO1xuICAgICAgaWYgKCFfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5iYWxhbmNlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmlkZW50aWZpYWJsZSgpKSkgcmV0dXJuIGJhc2U7XG4gICAgICBpZiAoIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmJhbGFuY2VzW3RoaXMuaWRlbnRpZmlhYmxlKCldKSByZXR1cm4gYmFzZTtcbiAgICAgIHJldHVybiBfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5iYWxhbmNlc1t0aGlzLmlkZW50aWZpYWJsZSgpXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYmFsYW5jZUZvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiYWxhbmNlRm9yKHRva2VuKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbnMoKS5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnVuaXF1ZVdpdGhDaGFpbigpID09PSB0b2tlbi51bmlxdWVXaXRoQ2hhaW4oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzeXN0ZW1CYWxhbmNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN5c3RlbUJhbGFuY2UoKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIHdpdGhTeW1ib2wgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuICAgICAgaWYgKCFfU3RvcmVTZXJ2aWNlW1wiZGVmYXVsdFwiXS5nZXQoKS5zdGF0ZS5iYWxhbmNlcykgcmV0dXJuIDA7XG4gICAgICBpZiAoIV9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmJhbGFuY2VzLmhhc093blByb3BlcnR5KHRoaXMuaWRlbnRpZmlhYmxlKCkpKSByZXR1cm4gMDtcbiAgICAgIGlmICghX1N0b3JlU2VydmljZVtcImRlZmF1bHRcIl0uZ2V0KCkuc3RhdGUuYmFsYW5jZXNbdGhpcy5pZGVudGlmaWFibGUoKV0pIHJldHVybiAwO1xuXG4gICAgICB2YXIgc3lzdGVtQmFsYW5jZSA9IF9TdG9yZVNlcnZpY2VbXCJkZWZhdWx0XCJdLmdldCgpLnN0YXRlLmJhbGFuY2VzW3RoaXMuaWRlbnRpZmlhYmxlKCldLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oeCkuaWRlbnRpZmlhYmxlKCkgPT09IF90aGlzNS5uZXR3b3JrKCkuc3lzdGVtVG9rZW4oKS5pZGVudGlmaWFibGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXN5c3RlbUJhbGFuY2UpIHJldHVybiAwO1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHN5c3RlbUJhbGFuY2UuYW1vdW50LCBcIiBcIikuY29uY2F0KHdpdGhTeW1ib2wgPyBzeXN0ZW1CYWxhbmNlLnN5bWJvbCA6ICcnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidG90YWxGaWF0QmFsYW5jZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b3RhbEZpYXRCYWxhbmNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5zKCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICAgICAgYWNjICs9IHguZmlhdEJhbGFuY2UoZmFsc2UpID8gcGFyc2VGbG9hdCh4LmZpYXRCYWxhbmNlKGZhbHNlKSkgOiAwO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgMCkudG9GaXhlZCgyKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgQWNjb3VudCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWNjb3VudDtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBY2NvdW50OyIsIjsoZnVuY3Rpb24gKGdsb2JhbE9iamVjdCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbi8qXHJcbiAqICAgICAgYmlnbnVtYmVyLmpzIHY5LjAuMFxyXG4gKiAgICAgIEEgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBhcmJpdHJhcnktcHJlY2lzaW9uIGFyaXRobWV0aWMuXHJcbiAqICAgICAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvYmlnbnVtYmVyLmpzXHJcbiAqICAgICAgQ29weXJpZ2h0IChjKSAyMDE5IE1pY2hhZWwgTWNsYXVnaGxpbiA8TThjaDg4bEBnbWFpbC5jb20+XHJcbiAqICAgICAgTUlUIExpY2Vuc2VkLlxyXG4gKlxyXG4gKiAgICAgIEJpZ051bWJlci5wcm90b3R5cGUgbWV0aG9kcyAgICAgfCAgQmlnTnVtYmVyIG1ldGhvZHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBhYnNvbHV0ZVZhbHVlICAgICAgICAgICAgYWJzICAgIHwgIGNsb25lXHJcbiAqICAgICAgY29tcGFyZWRUbyAgICAgICAgICAgICAgICAgICAgICB8ICBjb25maWcgICAgICAgICAgICAgICBzZXRcclxuICogICAgICBkZWNpbWFsUGxhY2VzICAgICAgICAgICAgZHAgICAgIHwgICAgICBERUNJTUFMX1BMQUNFU1xyXG4gKiAgICAgIGRpdmlkZWRCeSAgICAgICAgICAgICAgICBkaXYgICAgfCAgICAgIFJPVU5ESU5HX01PREVcclxuICogICAgICBkaXZpZGVkVG9JbnRlZ2VyQnkgICAgICAgaWRpdiAgIHwgICAgICBFWFBPTkVOVElBTF9BVFxyXG4gKiAgICAgIGV4cG9uZW50aWF0ZWRCeSAgICAgICAgICBwb3cgICAgfCAgICAgIFJBTkdFXHJcbiAqICAgICAgaW50ZWdlclZhbHVlICAgICAgICAgICAgICAgICAgICB8ICAgICAgQ1JZUFRPXHJcbiAqICAgICAgaXNFcXVhbFRvICAgICAgICAgICAgICAgIGVxICAgICB8ICAgICAgTU9EVUxPX01PREVcclxuICogICAgICBpc0Zpbml0ZSAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICBQT1dfUFJFQ0lTSU9OXHJcbiAqICAgICAgaXNHcmVhdGVyVGhhbiAgICAgICAgICAgIGd0ICAgICB8ICAgICAgRk9STUFUXHJcbiAqICAgICAgaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyAgIGd0ZSAgICB8ICAgICAgQUxQSEFCRVRcclxuICogICAgICBpc0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgIHwgIGlzQmlnTnVtYmVyXHJcbiAqICAgICAgaXNMZXNzVGhhbiAgICAgICAgICAgICAgIGx0ICAgICB8ICBtYXhpbXVtICAgICAgICAgICAgICBtYXhcclxuICogICAgICBpc0xlc3NUaGFuT3JFcXVhbFRvICAgICAgbHRlICAgIHwgIG1pbmltdW0gICAgICAgICAgICAgIG1pblxyXG4gKiAgICAgIGlzTmFOICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgcmFuZG9tXHJcbiAqICAgICAgaXNOZWdhdGl2ZSAgICAgICAgICAgICAgICAgICAgICB8ICBzdW1cclxuICogICAgICBpc1Bvc2l0aXZlICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBpc1plcm8gICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBtaW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBtb2R1bG8gICAgICAgICAgICAgICAgICAgbW9kICAgIHxcclxuICogICAgICBtdWx0aXBsaWVkQnkgICAgICAgICAgICAgdGltZXMgIHxcclxuICogICAgICBuZWdhdGVkICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBwbHVzICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBwcmVjaXNpb24gICAgICAgICAgICAgICAgc2QgICAgIHxcclxuICogICAgICBzaGlmdGVkQnkgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBzcXVhcmVSb290ICAgICAgICAgICAgICAgc3FydCAgIHxcclxuICogICAgICB0b0V4cG9uZW50aWFsICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0ZpeGVkICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0Zvcm1hdCAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0ZyYWN0aW9uICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0pTT04gICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b051bWJlciAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b1ByZWNpc2lvbiAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b1N0cmluZyAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB2YWx1ZU9mICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICpcclxuICovXHJcblxyXG5cclxuICB2YXIgQmlnTnVtYmVyLFxyXG4gICAgaXNOdW1lcmljID0gL14tPyg/OlxcZCsoPzpcXC5cXGQqKT98XFwuXFxkKykoPzplWystXT9cXGQrKT8kL2ksXHJcbiAgICBtYXRoY2VpbCA9IE1hdGguY2VpbCxcclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcblxyXG4gICAgYmlnbnVtYmVyRXJyb3IgPSAnW0JpZ051bWJlciBFcnJvcl0gJyxcclxuICAgIHRvb01hbnlEaWdpdHMgPSBiaWdudW1iZXJFcnJvciArICdOdW1iZXIgcHJpbWl0aXZlIGhhcyBtb3JlIHRoYW4gMTUgc2lnbmlmaWNhbnQgZGlnaXRzOiAnLFxyXG5cclxuICAgIEJBU0UgPSAxZTE0LFxyXG4gICAgTE9HX0JBU0UgPSAxNCxcclxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFmZmZmZmZmZmZmZmZmLCAgICAgICAgIC8vIDJeNTMgLSAxXHJcbiAgICAvLyBNQVhfSU5UMzIgPSAweDdmZmZmZmZmLCAgICAgICAgICAgICAgICAgICAvLyAyXjMxIC0gMVxyXG4gICAgUE9XU19URU4gPSBbMSwgMTAsIDEwMCwgMWUzLCAxZTQsIDFlNSwgMWU2LCAxZTcsIDFlOCwgMWU5LCAxZTEwLCAxZTExLCAxZTEyLCAxZTEzXSxcclxuICAgIFNRUlRfQkFTRSA9IDFlNyxcclxuXHJcbiAgICAvLyBFRElUQUJMRVxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBERUNJTUFMX1BMQUNFUywgVE9fRVhQX05FRywgVE9fRVhQX1BPUywgTUlOX0VYUCwgTUFYX0VYUCwgYW5kXHJcbiAgICAvLyB0aGUgYXJndW1lbnRzIHRvIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0LCBhbmQgdG9QcmVjaXNpb24uXHJcbiAgICBNQVggPSAxRTk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWF9JTlQzMlxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIEJpZ051bWJlciBjb25zdHJ1Y3Rvci5cclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShjb25maWdPYmplY3QpIHtcclxuICAgIHZhciBkaXYsIGNvbnZlcnRCYXNlLCBwYXJzZU51bWVyaWMsXHJcbiAgICAgIFAgPSBCaWdOdW1iZXIucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvcjogQmlnTnVtYmVyLCB0b1N0cmluZzogbnVsbCwgdmFsdWVPZjogbnVsbCB9LFxyXG4gICAgICBPTkUgPSBuZXcgQmlnTnVtYmVyKDEpLFxyXG5cclxuXHJcbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRURJVEFCTEUgQ09ORklHIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZXMgYmVsb3cgbXVzdCBiZSBpbnRlZ2VycyB3aXRoaW4gdGhlIGluY2x1c2l2ZSByYW5nZXMgc3RhdGVkLlxyXG4gICAgICAvLyBUaGUgdmFsdWVzIGNhbiBhbHNvIGJlIGNoYW5nZWQgYXQgcnVuLXRpbWUgdXNpbmcgQmlnTnVtYmVyLnNldC5cclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBmb3Igb3BlcmF0aW9ucyBpbnZvbHZpbmcgZGl2aXNpb24uXHJcbiAgICAgIERFQ0lNQUxfUExBQ0VTID0gMjAsICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgd2hlbiByb3VuZGluZyB0byB0aGUgYWJvdmUgZGVjaW1hbCBwbGFjZXMsIGFuZCB3aGVuIHVzaW5nXHJcbiAgICAgIC8vIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0IGFuZCB0b1ByZWNpc2lvbiwgYW5kIHJvdW5kIChkZWZhdWx0IHZhbHVlKS5cclxuICAgICAgLy8gVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBDRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBIQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIEhBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEhBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIFJPVU5ESU5HX01PREUgPSA0LCAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA4XHJcblxyXG4gICAgICAvLyBFWFBPTkVOVElBTF9BVCA6IFtUT19FWFBfTkVHICwgVE9fRVhQX1BPU11cclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCB0b1N0cmluZyByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogLTdcclxuICAgICAgVE9fRVhQX05FRyA9IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggdG9TdHJpbmcgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6IDIxXHJcbiAgICAgIFRPX0VYUF9QT1MgPSAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFJBTkdFIDogW01JTl9FWFAsIE1BWF9FWFBdXHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBleHBvbmVudCB2YWx1ZSwgYmVuZWF0aCB3aGljaCB1bmRlcmZsb3cgdG8gemVybyBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAtMzI0ICAoNWUtMzI0KVxyXG4gICAgICBNSU5fRVhQID0gLTFlNywgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0xIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIGV4cG9uZW50IHZhbHVlLCBhYm92ZSB3aGljaCBvdmVyZmxvdyB0byBJbmZpbml0eSBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAgMzA4ICAoMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpXHJcbiAgICAgIC8vIEZvciBNQVhfRVhQID4gMWU3LCBlLmcuIG5ldyBCaWdOdW1iZXIoJzFlMTAwMDAwMDAwJykucGx1cygxKSBtYXkgYmUgc2xvdy5cclxuICAgICAgTUFYX0VYUCA9IDFlNywgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxIHRvIE1BWFxyXG5cclxuICAgICAgLy8gV2hldGhlciB0byB1c2UgY3J5cHRvZ3JhcGhpY2FsbHktc2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbiwgaWYgYXZhaWxhYmxlLlxyXG4gICAgICBDUllQVE8gPSBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICAgIC8vIFRoZSBtb2R1bG8gbW9kZSB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgdGhlIG1vZHVsdXM6IGEgbW9kIG4uXHJcbiAgICAgIC8vIFRoZSBxdW90aWVudCAocSA9IGEgLyBuKSBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgY29ycmVzcG9uZGluZyByb3VuZGluZyBtb2RlLlxyXG4gICAgICAvLyBUaGUgcmVtYWluZGVyIChyKSBpcyBjYWxjdWxhdGVkIGFzOiByID0gYSAtIG4gKiBxLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBVUCAgICAgICAgMCBUaGUgcmVtYWluZGVyIGlzIHBvc2l0aXZlIGlmIHRoZSBkaXZpZGVuZCBpcyBuZWdhdGl2ZSwgZWxzZSBpcyBuZWdhdGl2ZS5cclxuICAgICAgLy8gRE9XTiAgICAgIDEgVGhlIHJlbWFpbmRlciBoYXMgdGhlIHNhbWUgc2lnbiBhcyB0aGUgZGl2aWRlbmQuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoaXMgbW9kdWxvIG1vZGUgaXMgY29tbW9ubHkga25vd24gYXMgJ3RydW5jYXRlZCBkaXZpc2lvbicgYW5kIGlzXHJcbiAgICAgIC8vICAgICAgICAgICAgIGVxdWl2YWxlbnQgdG8gKGEgJSBuKSBpbiBKYXZhU2NyaXB0LlxyXG4gICAgICAvLyBGTE9PUiAgICAgMyBUaGUgcmVtYWluZGVyIGhhcyB0aGUgc2FtZSBzaWduIGFzIHRoZSBkaXZpc29yIChQeXRob24gJSkuXHJcbiAgICAgIC8vIEhBTEZfRVZFTiA2IFRoaXMgbW9kdWxvIG1vZGUgaW1wbGVtZW50cyB0aGUgSUVFRSA3NTQgcmVtYWluZGVyIGZ1bmN0aW9uLlxyXG4gICAgICAvLyBFVUNMSUQgICAgOSBFdWNsaWRpYW4gZGl2aXNpb24uIHEgPSBzaWduKG4pICogZmxvb3IoYSAvIGFicyhuKSkuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoZSByZW1haW5kZXIgaXMgYWx3YXlzIHBvc2l0aXZlLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBUaGUgdHJ1bmNhdGVkIGRpdmlzaW9uLCBmbG9vcmVkIGRpdmlzaW9uLCBFdWNsaWRpYW4gZGl2aXNpb24gYW5kIElFRUUgNzU0IHJlbWFpbmRlclxyXG4gICAgICAvLyBtb2RlcyBhcmUgY29tbW9ubHkgdXNlZCBmb3IgdGhlIG1vZHVsdXMgb3BlcmF0aW9uLlxyXG4gICAgICAvLyBBbHRob3VnaCB0aGUgb3RoZXIgcm91bmRpbmcgbW9kZXMgY2FuIGFsc28gYmUgdXNlZCwgdGhleSBtYXkgbm90IGdpdmUgdXNlZnVsIHJlc3VsdHMuXHJcbiAgICAgIE1PRFVMT19NT0RFID0gMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA5XHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0ZWRCeSBvcGVyYXRpb24uXHJcbiAgICAgIC8vIElmIFBPV19QUkVDSVNJT04gaXMgMCwgdGhlcmUgd2lsbCBiZSB1bmxpbWl0ZWQgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICBQT1dfUFJFQ0lTSU9OID0gMCwgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgICAvLyBUaGUgZm9ybWF0IHNwZWNpZmljYXRpb24gdXNlZCBieSB0aGUgQmlnTnVtYmVyLnByb3RvdHlwZS50b0Zvcm1hdCBtZXRob2QuXHJcbiAgICAgIEZPUk1BVCA9IHtcclxuICAgICAgICBwcmVmaXg6ICcnLFxyXG4gICAgICAgIGdyb3VwU2l6ZTogMyxcclxuICAgICAgICBzZWNvbmRhcnlHcm91cFNpemU6IDAsXHJcbiAgICAgICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiAnLicsXHJcbiAgICAgICAgZnJhY3Rpb25Hcm91cFNpemU6IDAsXHJcbiAgICAgICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvcjogJ1xceEEwJywgICAgICAvLyBub24tYnJlYWtpbmcgc3BhY2VcclxuICAgICAgICBzdWZmaXg6ICcnXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBUaGUgYWxwaGFiZXQgdXNlZCBmb3IgYmFzZSBjb252ZXJzaW9uLiBJdCBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBsb25nLCB3aXRoIG5vICcrJyxcclxuICAgICAgLy8gJy0nLCAnLicsIHdoaXRlc3BhY2UsIG9yIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgLy8gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJF8nXHJcbiAgICAgIEFMUEhBQkVUID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgQmlnTnVtYmVyIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IGluc3RhbmNlIG9mIGEgQmlnTnVtYmVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiB2IHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICogW2JdIHtudW1iZXJ9IFRoZSBiYXNlIG9mIHYuIEludGVnZXIsIDIgdG8gQUxQSEFCRVQubGVuZ3RoIGluY2x1c2l2ZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQmlnTnVtYmVyKHYsIGIpIHtcclxuICAgICAgdmFyIGFscGhhYmV0LCBjLCBjYXNlQ2hhbmdlZCwgZSwgaSwgaXNOdW0sIGxlbiwgc3RyLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRW5hYmxlIGNvbnN0cnVjdG9yIGNhbGwgd2l0aG91dCBgbmV3YC5cclxuICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIEJpZ051bWJlcikpIHJldHVybiBuZXcgQmlnTnVtYmVyKHYsIGIpO1xyXG5cclxuICAgICAgaWYgKGIgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAodiAmJiB2Ll9pc0JpZ051bWJlciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgeC5zID0gdi5zO1xyXG5cclxuICAgICAgICAgIGlmICghdi5jIHx8IHYuZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodi5lIDwgTUlOX0VYUCkge1xyXG4gICAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4LmUgPSB2LmU7XHJcbiAgICAgICAgICAgIHguYyA9IHYuYy5zbGljZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoaXNOdW0gPSB0eXBlb2YgdiA9PSAnbnVtYmVyJykgJiYgdiAqIDAgPT0gMCkge1xyXG5cclxuICAgICAgICAgIC8vIFVzZSBgMSAvIG5gIHRvIGhhbmRsZSBtaW51cyB6ZXJvIGFsc28uXHJcbiAgICAgICAgICB4LnMgPSAxIC8gdiA8IDAgPyAodiA9IC12LCAtMSkgOiAxO1xyXG5cclxuICAgICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgaW50ZWdlcnMsIHdoZXJlIG4gPCAyMTQ3NDgzNjQ4ICgyKiozMSkuXHJcbiAgICAgICAgICBpZiAodiA9PT0gfn52KSB7XHJcbiAgICAgICAgICAgIGZvciAoZSA9IDAsIGkgPSB2OyBpID49IDEwOyBpIC89IDEwLCBlKyspO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUgPiBNQVhfRVhQKSB7XHJcbiAgICAgICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB4LmUgPSBlO1xyXG4gICAgICAgICAgICAgIHguYyA9IFt2XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0ciA9IFN0cmluZyh2KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIGlmICghaXNOdW1lcmljLnRlc3Qoc3RyID0gU3RyaW5nKHYpKSkgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBzdHIsIGlzTnVtKTtcclxuXHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcblxyXG4gICAgICAgIC8vIEFsbG93IGV4cG9uZW50aWFsIG5vdGF0aW9uIHRvIGJlIHVzZWQgd2l0aCBiYXNlIDEwIGFyZ3VtZW50LCB3aGlsZVxyXG4gICAgICAgIC8vIGFsc28gcm91bmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYXMgd2l0aCBvdGhlciBiYXNlcy5cclxuICAgICAgICBpZiAoYiA9PSAxMCkge1xyXG4gICAgICAgICAgeCA9IG5ldyBCaWdOdW1iZXIodik7XHJcbiAgICAgICAgICByZXR1cm4gcm91bmQoeCwgREVDSU1BTF9QTEFDRVMgKyB4LmUgKyAxLCBST1VORElOR19NT0RFKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ciA9IFN0cmluZyh2KTtcclxuXHJcbiAgICAgICAgaWYgKGlzTnVtID0gdHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgICAvLyBBdm9pZCBwb3RlbnRpYWwgaW50ZXJwcmV0YXRpb24gb2YgSW5maW5pdHkgYW5kIE5hTiBhcyBiYXNlIDQ0KyB2YWx1ZXMuXHJcbiAgICAgICAgICBpZiAodiAqIDAgIT0gMCkgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBzdHIsIGlzTnVtLCBiKTtcclxuXHJcbiAgICAgICAgICB4LnMgPSAxIC8gdiA8IDAgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOdW1iZXIgcHJpbWl0aXZlIGhhcyBtb3JlIHRoYW4gMTUgc2lnbmlmaWNhbnQgZGlnaXRzOiB7bn0nXHJcbiAgICAgICAgICBpZiAoQmlnTnVtYmVyLkRFQlVHICYmIHN0ci5yZXBsYWNlKC9eMFxcLjAqfFxcLi8sICcnKS5sZW5ndGggPiAxNSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKHRvb01hbnlEaWdpdHMgKyB2KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5zID0gc3RyLmNoYXJDb2RlQXQoMCkgPT09IDQ1ID8gKHN0ciA9IHN0ci5zbGljZSgxKSwgLTEpIDogMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFscGhhYmV0ID0gQUxQSEFCRVQuc2xpY2UoMCwgYik7XHJcbiAgICAgICAgZSA9IGkgPSAwO1xyXG5cclxuICAgICAgICAvLyBDaGVjayB0aGF0IHN0ciBpcyBhIHZhbGlkIGJhc2UgYiBudW1iZXIuXHJcbiAgICAgICAgLy8gRG9uJ3QgdXNlIFJlZ0V4cCwgc28gYWxwaGFiZXQgY2FuIGNvbnRhaW4gc3BlY2lhbCBjaGFyYWN0ZXJzLlxyXG4gICAgICAgIGZvciAobGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoYWxwaGFiZXQuaW5kZXhPZihjID0gc3RyLmNoYXJBdChpKSkgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjID09ICcuJykge1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiAnLicgaXMgbm90IHRoZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIGl0IGhhcyBub3QgYmUgZm91bmQgYmVmb3JlLlxyXG4gICAgICAgICAgICAgIGlmIChpID4gZSkge1xyXG4gICAgICAgICAgICAgICAgZSA9IGxlbjtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICghY2FzZUNoYW5nZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQWxsb3cgZS5nLiBoZXhhZGVjaW1hbCAnRkYnIGFzIHdlbGwgYXMgJ2ZmJy5cclxuICAgICAgICAgICAgICBpZiAoc3RyID09IHN0ci50b1VwcGVyQ2FzZSgpICYmIChzdHIgPSBzdHIudG9Mb3dlckNhc2UoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgc3RyID09IHN0ci50b0xvd2VyQ2FzZSgpICYmIChzdHIgPSBzdHIudG9VcHBlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2VDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgICAgIGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VOdW1lcmljKHgsIFN0cmluZyh2KSwgaXNOdW0sIGIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUHJldmVudCBsYXRlciBjaGVjayBmb3IgbGVuZ3RoIG9uIGNvbnZlcnRlZCBudW1iZXIuXHJcbiAgICAgICAgaXNOdW0gPSBmYWxzZTtcclxuICAgICAgICBzdHIgPSBjb252ZXJ0QmFzZShzdHIsIGIsIDEwLCB4LnMpO1xyXG5cclxuICAgICAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgIGVsc2UgZSA9IHN0ci5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERldGVybWluZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKGkgPSAwOyBzdHIuY2hhckNvZGVBdChpKSA9PT0gNDg7IGkrKyk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgIGZvciAobGVuID0gc3RyLmxlbmd0aDsgc3RyLmNoYXJDb2RlQXQoLS1sZW4pID09PSA0ODspO1xyXG5cclxuICAgICAgaWYgKHN0ciA9IHN0ci5zbGljZShpLCArK2xlbikpIHtcclxuICAgICAgICBsZW4gLT0gaTtcclxuXHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE51bWJlciBwcmltaXRpdmUgaGFzIG1vcmUgdGhhbiAxNSBzaWduaWZpY2FudCBkaWdpdHM6IHtufSdcclxuICAgICAgICBpZiAoaXNOdW0gJiYgQmlnTnVtYmVyLkRFQlVHICYmXHJcbiAgICAgICAgICBsZW4gPiAxNSAmJiAodiA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdiAhPT0gbWF0aGZsb29yKHYpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKHRvb01hbnlEaWdpdHMgKyAoeC5zICogdikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIE92ZXJmbG93P1xyXG4gICAgICAgIGlmICgoZSA9IGUgLSBpIC0gMSkgPiBNQVhfRVhQKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW5maW5pdHkuXHJcbiAgICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBVbmRlcmZsb3c/XHJcbiAgICAgICAgfSBlbHNlIGlmIChlIDwgTUlOX0VYUCkge1xyXG5cclxuICAgICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHguZSA9IGU7XHJcbiAgICAgICAgICB4LmMgPSBbXTtcclxuXHJcbiAgICAgICAgICAvLyBUcmFuc2Zvcm0gYmFzZVxyXG5cclxuICAgICAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgICAgICAvLyBpIGlzIHdoZXJlIHRvIHNsaWNlIHN0ciB0byBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGNvZWZmaWNpZW50IGFycmF5LlxyXG4gICAgICAgICAgaSA9IChlICsgMSkgJSBMT0dfQkFTRTtcclxuICAgICAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTsgIC8vIGkgPCAxXHJcblxyXG4gICAgICAgICAgaWYgKGkgPCBsZW4pIHtcclxuICAgICAgICAgICAgaWYgKGkpIHguYy5wdXNoKCtzdHIuc2xpY2UoMCwgaSkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZW4gLT0gTE9HX0JBU0U7IGkgPCBsZW47KSB7XHJcbiAgICAgICAgICAgICAgeC5jLnB1c2goK3N0ci5zbGljZShpLCBpICs9IExPR19CQVNFKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGkgPSBMT0dfQkFTRSAtIChzdHIgPSBzdHIuc2xpY2UoaSkpLmxlbmd0aDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgLT0gbGVuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAoOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgICAgeC5jLnB1c2goK3N0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBDT05TVFJVQ1RPUiBQUk9QRVJUSUVTXHJcblxyXG5cclxuICAgIEJpZ051bWJlci5jbG9uZSA9IGNsb25lO1xyXG5cclxuICAgIEJpZ051bWJlci5ST1VORF9VUCA9IDA7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfRE9XTiA9IDE7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfQ0VJTCA9IDI7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfRkxPT1IgPSAzO1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfVVAgPSA0O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfRE9XTiA9IDU7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9FVkVOID0gNjtcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0NFSUwgPSA3O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfRkxPT1IgPSA4O1xyXG4gICAgQmlnTnVtYmVyLkVVQ0xJRCA9IDk7XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDb25maWd1cmUgaW5mcmVxdWVudGx5LWNoYW5naW5nIGxpYnJhcnktd2lkZSBzZXR0aW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBBY2NlcHQgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBvcHRpb25hbCBwcm9wZXJ0aWVzIChpZiB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpc1xyXG4gICAgICogYSBudW1iZXIsIGl0IG11c3QgYmUgYW4gaW50ZWdlciB3aXRoaW4gdGhlIGluY2x1c2l2ZSByYW5nZSBzdGF0ZWQpOlxyXG4gICAgICpcclxuICAgICAqICAgREVDSU1BTF9QTEFDRVMgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byBNQVhcclxuICAgICAqICAgUk9VTkRJTkdfTU9ERSAgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byA4XHJcbiAgICAgKiAgIEVYUE9ORU5USUFMX0FUICAge251bWJlcnxudW1iZXJbXX0gIC1NQVggdG8gTUFYICBvciAgWy1NQVggdG8gMCwgMCB0byBNQVhdXHJcbiAgICAgKiAgIFJBTkdFICAgICAgICAgICAge251bWJlcnxudW1iZXJbXX0gIC1NQVggdG8gTUFYIChub3QgemVybykgIG9yICBbLU1BWCB0byAtMSwgMSB0byBNQVhdXHJcbiAgICAgKiAgIENSWVBUTyAgICAgICAgICAge2Jvb2xlYW59ICAgICAgICAgIHRydWUgb3IgZmFsc2VcclxuICAgICAqICAgTU9EVUxPX01PREUgICAgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byA5XHJcbiAgICAgKiAgIFBPV19QUkVDSVNJT04gICAgICAge251bWJlcn0gICAgICAgICAgIDAgdG8gTUFYXHJcbiAgICAgKiAgIEFMUEhBQkVUICAgICAgICAge3N0cmluZ30gICAgICAgICAgIEEgc3RyaW5nIG9mIHR3byBvciBtb3JlIHVuaXF1ZSBjaGFyYWN0ZXJzIHdoaWNoIGRvZXNcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IGNvbnRhaW4gJy4nLlxyXG4gICAgICogICBGT1JNQVQgICAgICAgICAgIHtvYmplY3R9ICAgICAgICAgICBBbiBvYmplY3Qgd2l0aCBzb21lIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgICAqICAgICBwcmVmaXggICAgICAgICAgICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgZ3JvdXBTaXplICAgICAgICAgICAgICB7bnVtYmVyfVxyXG4gICAgICogICAgIHNlY29uZGFyeUdyb3VwU2l6ZSAgICAge251bWJlcn1cclxuICAgICAqICAgICBncm91cFNlcGFyYXRvciAgICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgZGVjaW1hbFNlcGFyYXRvciAgICAgICB7c3RyaW5nfVxyXG4gICAgICogICAgIGZyYWN0aW9uR3JvdXBTaXplICAgICAge251bWJlcn1cclxuICAgICAqICAgICBmcmFjdGlvbkdyb3VwU2VwYXJhdG9yIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgc3VmZml4ICAgICAgICAgICAgICAgICB7c3RyaW5nfVxyXG4gICAgICpcclxuICAgICAqIChUaGUgdmFsdWVzIGFzc2lnbmVkIHRvIHRoZSBhYm92ZSBGT1JNQVQgb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdCBjaGVja2VkIGZvciB2YWxpZGl0eS4pXHJcbiAgICAgKlxyXG4gICAgICogRS5nLlxyXG4gICAgICogQmlnTnVtYmVyLmNvbmZpZyh7IERFQ0lNQUxfUExBQ0VTIDogMjAsIFJPVU5ESU5HX01PREUgOiA0IH0pXHJcbiAgICAgKlxyXG4gICAgICogSWdub3JlIHByb3BlcnRpZXMvcGFyYW1ldGVycyBzZXQgdG8gbnVsbCBvciB1bmRlZmluZWQsIGV4Y2VwdCBmb3IgQUxQSEFCRVQuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIGN1cnJlbnQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuY29uZmlnID0gQmlnTnVtYmVyLnNldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgdmFyIHAsIHY7XHJcblxyXG4gICAgICBpZiAob2JqICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgICAvLyBERUNJTUFMX1BMQUNFUyB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gREVDSU1BTF9QTEFDRVMge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0RFQ0lNQUxfUExBQ0VTJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgREVDSU1BTF9QTEFDRVMgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJPVU5ESU5HX01PREUge251bWJlcn0gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBST1VORElOR19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdST1VORElOR19NT0RFJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgOCwgcCk7XHJcbiAgICAgICAgICAgIFJPVU5ESU5HX01PREUgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEVYUE9ORU5USUFMX0FUIHtudW1iZXJ8bnVtYmVyW119XHJcbiAgICAgICAgICAvLyBJbnRlZ2VyLCAtTUFYIHRvIE1BWCBpbmNsdXNpdmUgb3JcclxuICAgICAgICAgIC8vIFtpbnRlZ2VyIC1NQVggdG8gMCBpbmNsdXNpdmUsIDAgdG8gTUFYIGluY2x1c2l2ZV0uXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gRVhQT05FTlRJQUxfQVQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0VYUE9ORU5USUFMX0FUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHYgJiYgdi5wb3ApIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzBdLCAtTUFYLCAwLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9ORUcgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9QT1MgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgVE9fRVhQX05FRyA9IC0oVE9fRVhQX1BPUyA9IHYgPCAwID8gLXYgOiB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJBTkdFIHtudW1iZXJ8bnVtYmVyW119IE5vbi16ZXJvIGludGVnZXIsIC1NQVggdG8gTUFYIGluY2x1c2l2ZSBvclxyXG4gICAgICAgICAgLy8gW2ludGVnZXIgLU1BWCB0byAtMSBpbmNsdXNpdmUsIGludGVnZXIgMSB0byBNQVggaW5jbHVzaXZlXS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBSQU5HRSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V8Y2Fubm90IGJlIHplcm99OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUkFOR0UnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAodiAmJiB2LnBvcCkge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMF0sIC1NQVgsIC0xLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAxLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIE1JTl9FWFAgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIE1BWF9FWFAgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgICAgICAgIE1JTl9FWFAgPSAtKE1BWF9FWFAgPSB2IDwgMCA/IC12IDogdik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgY2Fubm90IGJlIHplcm86ICcgKyB2KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDUllQVE8ge2Jvb2xlYW59IHRydWUgb3IgZmFsc2UuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gQ1JZUFRPIG5vdCB0cnVlIG9yIGZhbHNlOiB7dn0nXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gY3J5cHRvIHVuYXZhaWxhYmxlJ1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0NSWVBUTycpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh2ID09PSAhIXYpIHtcclxuICAgICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvICYmXHJcbiAgICAgICAgICAgICAgICAgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgfHwgY3J5cHRvLnJhbmRvbUJ5dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgICBDUllQVE8gPSB2O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgQ1JZUFRPID0gIXY7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnY3J5cHRvIHVuYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIENSWVBUTyA9IHY7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCB0cnVlIG9yIGZhbHNlOiAnICsgdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBNT0RVTE9fTU9ERSB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIDkgaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE1PRFVMT19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdNT0RVTE9fTU9ERScpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIDksIHApO1xyXG4gICAgICAgICAgICBNT0RVTE9fTU9ERSA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUE9XX1BSRUNJU0lPTiB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUE9XX1BSRUNJU0lPTiB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUE9XX1BSRUNJU0lPTicpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgIFBPV19QUkVDSVNJT04gPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEZPUk1BVCB7b2JqZWN0fVxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEZPUk1BVCBub3QgYW4gb2JqZWN0OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnRk9STUFUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSBGT1JNQVQgPSB2O1xyXG4gICAgICAgICAgICBlbHNlIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBub3QgYW4gb2JqZWN0OiAnICsgdik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQUxQSEFCRVQge3N0cmluZ31cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBBTFBIQUJFVCBpbnZhbGlkOiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnQUxQSEFCRVQnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWxsb3cgaWYgb25seSBvbmUgY2hhcmFjdGVyLFxyXG4gICAgICAgICAgICAvLyBvciBpZiBpdCBjb250YWlucyAnKycsICctJywgJy4nLCB3aGl0ZXNwYWNlLCBvciBhIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdzdHJpbmcnICYmICEvXi4kfFsrLS5cXHNdfCguKS4qXFwxLy50ZXN0KHYpKSB7XHJcbiAgICAgICAgICAgICAgQUxQSEFCRVQgPSB2O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIGludmFsaWQ6ICcgKyB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBPYmplY3QgZXhwZWN0ZWQ6IHt2fSdcclxuICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ09iamVjdCBleHBlY3RlZDogJyArIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIERFQ0lNQUxfUExBQ0VTOiBERUNJTUFMX1BMQUNFUyxcclxuICAgICAgICBST1VORElOR19NT0RFOiBST1VORElOR19NT0RFLFxyXG4gICAgICAgIEVYUE9ORU5USUFMX0FUOiBbVE9fRVhQX05FRywgVE9fRVhQX1BPU10sXHJcbiAgICAgICAgUkFOR0U6IFtNSU5fRVhQLCBNQVhfRVhQXSxcclxuICAgICAgICBDUllQVE86IENSWVBUTyxcclxuICAgICAgICBNT0RVTE9fTU9ERTogTU9EVUxPX01PREUsXHJcbiAgICAgICAgUE9XX1BSRUNJU0lPTjogUE9XX1BSRUNJU0lPTixcclxuICAgICAgICBGT1JNQVQ6IEZPUk1BVCxcclxuICAgICAgICBBTFBIQUJFVDogQUxQSEFCRVRcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB2IGlzIGEgQmlnTnVtYmVyIGluc3RhbmNlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIElmIEJpZ051bWJlci5ERUJVRyBpcyB0cnVlLCB0aHJvdyBpZiBhIEJpZ051bWJlciBpbnN0YW5jZSBpcyBub3Qgd2VsbC1mb3JtZWQuXHJcbiAgICAgKlxyXG4gICAgICogdiB7YW55fVxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBJbnZhbGlkIEJpZ051bWJlcjoge3Z9J1xyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuaXNCaWdOdW1iZXIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICBpZiAoIXYgfHwgdi5faXNCaWdOdW1iZXIgIT09IHRydWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFCaWdOdW1iZXIuREVCVUcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgdmFyIGksIG4sXHJcbiAgICAgICAgYyA9IHYuYyxcclxuICAgICAgICBlID0gdi5lLFxyXG4gICAgICAgIHMgPSB2LnM7XHJcblxyXG4gICAgICBvdXQ6IGlmICh7fS50b1N0cmluZy5jYWxsKGMpID09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuXHJcbiAgICAgICAgaWYgKChzID09PSAxIHx8IHMgPT09IC0xKSAmJiBlID49IC1NQVggJiYgZSA8PSBNQVggJiYgZSA9PT0gbWF0aGZsb29yKGUpKSB7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGVsZW1lbnQgaXMgemVybywgdGhlIEJpZ051bWJlciB2YWx1ZSBtdXN0IGJlIHplcm8uXHJcbiAgICAgICAgICBpZiAoY1swXSA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gMCAmJiBjLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrIG91dDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgbnVtYmVyIG9mIGRpZ2l0cyB0aGF0IGNbMF0gc2hvdWxkIGhhdmUsIGJhc2VkIG9uIHRoZSBleHBvbmVudC5cclxuICAgICAgICAgIGkgPSAoZSArIDEpICUgTE9HX0JBU0U7XHJcbiAgICAgICAgICBpZiAoaSA8IDEpIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIG51bWJlciBvZiBkaWdpdHMgb2YgY1swXS5cclxuICAgICAgICAgIC8vaWYgKE1hdGguY2VpbChNYXRoLmxvZyhjWzBdICsgMSkgLyBNYXRoLkxOMTApID09IGkpIHtcclxuICAgICAgICAgIGlmIChTdHJpbmcoY1swXSkubGVuZ3RoID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgbiA9IGNbaV07XHJcbiAgICAgICAgICAgICAgaWYgKG4gPCAwIHx8IG4gPj0gQkFTRSB8fCBuICE9PSBtYXRoZmxvb3IobikpIGJyZWFrIG91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGFzdCBlbGVtZW50IGNhbm5vdCBiZSB6ZXJvLCB1bmxlc3MgaXQgaXMgdGhlIG9ubHkgZWxlbWVudC5cclxuICAgICAgICAgICAgaWYgKG4gIT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluZmluaXR5L05hTlxyXG4gICAgICB9IGVsc2UgaWYgKGMgPT09IG51bGwgJiYgZSA9PT0gbnVsbCAmJiAocyA9PT0gbnVsbCB8fCBzID09PSAxIHx8IHMgPT09IC0xKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgIChiaWdudW1iZXJFcnJvciArICdJbnZhbGlkIEJpZ051bWJlcjogJyArIHYpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1heGltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWF4aW11bSA9IEJpZ051bWJlci5tYXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAubHQpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1pbmltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWluaW11bSA9IEJpZ051bWJlci5taW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAuZ3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsXHJcbiAgICAgKiBhbmQgd2l0aCBkcCwgb3IgREVDSU1BTF9QTEFDRVMgaWYgZHAgaXMgb21pdHRlZCwgZGVjaW1hbCBwbGFjZXMgKG9yIGxlc3MgaWYgdHJhaWxpbmdcclxuICAgICAqIHplcm9zIGFyZSBwcm9kdWNlZCkuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB9J1xyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIGNyeXB0byB1bmF2YWlsYWJsZSdcclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLnJhbmRvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBwb3cyXzUzID0gMHgyMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIC8vIFJldHVybiBhIDUzIGJpdCBpbnRlZ2VyIG4sIHdoZXJlIDAgPD0gbiA8IDkwMDcxOTkyNTQ3NDA5OTIuXHJcbiAgICAgIC8vIENoZWNrIGlmIE1hdGgucmFuZG9tKCkgcHJvZHVjZXMgbW9yZSB0aGFuIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cclxuICAgICAgLy8gSWYgaXQgZG9lcywgYXNzdW1lIGF0IGxlYXN0IDUzIGJpdHMgYXJlIHByb2R1Y2VkLCBvdGhlcndpc2UgYXNzdW1lIGF0IGxlYXN0IDMwIGJpdHMuXHJcbiAgICAgIC8vIDB4NDAwMDAwMDAgaXMgMl4zMCwgMHg4MDAwMDAgaXMgMl4yMywgMHgxZmZmZmYgaXMgMl4yMSAtIDEuXHJcbiAgICAgIHZhciByYW5kb201M2JpdEludCA9IChNYXRoLnJhbmRvbSgpICogcG93Ml81MykgJiAweDFmZmZmZlxyXG4gICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRoZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdzJfNTMpOyB9XHJcbiAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIDB4NDAwMDAwMDAgfCAwKSAqIDB4ODAwMDAwKSArXHJcbiAgICAgICAgIChNYXRoLnJhbmRvbSgpICogMHg4MDAwMDAgfCAwKTsgfTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZHApIHtcclxuICAgICAgICB2YXIgYSwgYiwgZSwgaywgdixcclxuICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgYyA9IFtdLFxyXG4gICAgICAgICAgcmFuZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAgICAgaWYgKGRwID09IG51bGwpIGRwID0gREVDSU1BTF9QTEFDRVM7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKGRwIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICBpZiAoQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgLy8gQnJvd3NlcnMgc3VwcG9ydGluZyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLlxyXG4gICAgICAgICAgaWYgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGEgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrICo9IDIpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gNTMgYml0czpcclxuICAgICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpICogTWF0aC5wb3coMiwgMjEpKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTAwMDAwIDAwMDAwMDAwIDAwMDAwMDAwXHJcbiAgICAgICAgICAgICAgLy8gKChNYXRoLnBvdygyLCAzMikgLSAxKSA+Pj4gMTEpLnRvU3RyaW5nKDIpXHJcbiAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgICAvLyAweDIwMDAwIGlzIDJeMjEuXHJcbiAgICAgICAgICAgICAgdiA9IGFbaV0gKiAweDIwMDAwICsgKGFbaSArIDFdID4+PiAxMSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFJlamVjdGlvbiBzYW1wbGluZzpcclxuICAgICAgICAgICAgICAvLyAwIDw9IHYgPCA5MDA3MTk5MjU0NzQwOTkyXHJcbiAgICAgICAgICAgICAgLy8gUHJvYmFiaWxpdHkgdGhhdCB2ID49IDllMTUsIGlzXHJcbiAgICAgICAgICAgICAgLy8gNzE5OTI1NDc0MDk5MiAvIDkwMDcxOTkyNTQ3NDA5OTIgfj0gMC4wMDA4LCBpLmUuIDEgaW4gMTI1MVxyXG4gICAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICAgIGIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgyKSk7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gYlswXTtcclxuICAgICAgICAgICAgICAgIGFbaSArIDFdID0gYlsxXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDAgPD0gdiA8PSA4OTk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb2RlLmpzIHN1cHBvcnRpbmcgY3J5cHRvLnJhbmRvbUJ5dGVzLlxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjcnlwdG8ucmFuZG9tQnl0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJ1ZmZlclxyXG4gICAgICAgICAgICBhID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGsgKj0gNyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDB4MTAwMDAwMDAwMDAwMCBpcyAyXjQ4LCAweDEwMDAwMDAwMDAwIGlzIDJeNDBcclxuICAgICAgICAgICAgICAvLyAweDEwMDAwMDAwMCBpcyAyXjMyLCAweDEwMDAwMDAgaXMgMl4yNFxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExXHJcbiAgICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAgIHYgPSAoKGFbaV0gJiAzMSkgKiAweDEwMDAwMDAwMDAwMDApICsgKGFbaSArIDFdICogMHgxMDAwMDAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyAyXSAqIDB4MTAwMDAwMDAwKSArIChhW2kgKyAzXSAqIDB4MTAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyA0XSA8PCAxNikgKyAoYVtpICsgNV0gPDwgOCkgKyBhW2kgKyA2XTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHYgPj0gOWUxNSkge1xyXG4gICAgICAgICAgICAgICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDcpLmNvcHkoYSwgaSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gNztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIENSWVBUTyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ2NyeXB0byB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIE1hdGgucmFuZG9tLlxyXG4gICAgICAgIGlmICghQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG4gICAgICAgICAgICB2ID0gcmFuZG9tNTNiaXRJbnQoKTtcclxuICAgICAgICAgICAgaWYgKHYgPCA5ZTE1KSBjW2krK10gPSB2ICUgMWUxNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBjWy0taV07XHJcbiAgICAgICAgZHAgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdHJhaWxpbmcgZGlnaXRzIHRvIHplcm9zIGFjY29yZGluZyB0byBkcC5cclxuICAgICAgICBpZiAoayAmJiBkcCkge1xyXG4gICAgICAgICAgdiA9IFBPV1NfVEVOW0xPR19CQVNFIC0gZHBdO1xyXG4gICAgICAgICAgY1tpXSA9IG1hdGhmbG9vcihrIC8gdikgKiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGVsZW1lbnRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgICAgIGZvciAoOyBjW2ldID09PSAwOyBjLnBvcCgpLCBpLS0pO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgYyA9IFtlID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVybyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgICAgZm9yIChlID0gLTEgOyBjWzBdID09PSAwOyBjLnNwbGljZSgwLCAxKSwgZSAtPSBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgLy8gQ291bnQgdGhlIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiBjIHRvIGRldGVybWluZSBsZWFkaW5nIHplcm9zLCBhbmQuLi5cclxuICAgICAgICAgIGZvciAoaSA9IDEsIHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAgIC8vIGFkanVzdCB0aGUgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgICBpZiAoaSA8IExPR19CQVNFKSBlIC09IExPR19CQVNFIC0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmQuZSA9IGU7XHJcbiAgICAgICAgcmFuZC5jID0gYztcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHN1bSBvZiB0aGUgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIGFyZ3VtZW50cyB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5zdW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpID0gMSxcclxuICAgICAgICBhcmdzID0gYXJndW1lbnRzLFxyXG4gICAgICAgIHN1bSA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcbiAgICAgIGZvciAoOyBpIDwgYXJncy5sZW5ndGg7KSBzdW0gPSBzdW0ucGx1cyhhcmdzW2krK10pO1xyXG4gICAgICByZXR1cm4gc3VtO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gUFJJVkFURSBGVU5DVElPTlNcclxuXHJcblxyXG4gICAgLy8gQ2FsbGVkIGJ5IEJpZ051bWJlciBhbmQgQmlnTnVtYmVyLnByb3RvdHlwZS50b1N0cmluZy5cclxuICAgIGNvbnZlcnRCYXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGRlY2ltYWwgPSAnMDEyMzQ1Njc4OSc7XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgKiBDb252ZXJ0IHN0cmluZyBvZiBiYXNlSW4gdG8gYW4gYXJyYXkgb2YgbnVtYmVycyBvZiBiYXNlT3V0LlxyXG4gICAgICAgKiBFZy4gdG9CYXNlT3V0KCcyNTUnLCAxMCwgMTYpIHJldHVybnMgWzE1LCAxNV0uXHJcbiAgICAgICAqIEVnLiB0b0Jhc2VPdXQoJ2ZmJywgMTYsIDEwKSByZXR1cm5zIFsyLCA1LCA1XS5cclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIHRvQmFzZU91dChzdHIsIGJhc2VJbiwgYmFzZU91dCwgYWxwaGFiZXQpIHtcclxuICAgICAgICB2YXIgaixcclxuICAgICAgICAgIGFyciA9IFswXSxcclxuICAgICAgICAgIGFyckwsXHJcbiAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOykge1xyXG4gICAgICAgICAgZm9yIChhcnJMID0gYXJyLmxlbmd0aDsgYXJyTC0tOyBhcnJbYXJyTF0gKj0gYmFzZUluKTtcclxuXHJcbiAgICAgICAgICBhcnJbMF0gKz0gYWxwaGFiZXQuaW5kZXhPZihzdHIuY2hhckF0KGkrKykpO1xyXG5cclxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcnJbal0gPiBiYXNlT3V0IC0gMSkge1xyXG4gICAgICAgICAgICAgIGlmIChhcnJbaiArIDFdID09IG51bGwpIGFycltqICsgMV0gPSAwO1xyXG4gICAgICAgICAgICAgIGFycltqICsgMV0gKz0gYXJyW2pdIC8gYmFzZU91dCB8IDA7XHJcbiAgICAgICAgICAgICAgYXJyW2pdICU9IGJhc2VPdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDb252ZXJ0IGEgbnVtZXJpYyBzdHJpbmcgb2YgYmFzZUluIHRvIGEgbnVtZXJpYyBzdHJpbmcgb2YgYmFzZU91dC5cclxuICAgICAgLy8gSWYgdGhlIGNhbGxlciBpcyB0b1N0cmluZywgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlIDEwIHRvIGJhc2VPdXQuXHJcbiAgICAgIC8vIElmIHRoZSBjYWxsZXIgaXMgQmlnTnVtYmVyLCB3ZSBhcmUgY29udmVydGluZyBmcm9tIGJhc2VJbiB0byBiYXNlIDEwLlxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHN0ciwgYmFzZUluLCBiYXNlT3V0LCBzaWduLCBjYWxsZXJJc1RvU3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGFscGhhYmV0LCBkLCBlLCBrLCByLCB4LCB4YywgeSxcclxuICAgICAgICAgIGkgPSBzdHIuaW5kZXhPZignLicpLFxyXG4gICAgICAgICAgZHAgPSBERUNJTUFMX1BMQUNFUyxcclxuICAgICAgICAgIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuXHJcbiAgICAgICAgLy8gTm9uLWludGVnZXIuXHJcbiAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgayA9IFBPV19QUkVDSVNJT047XHJcblxyXG4gICAgICAgICAgLy8gVW5saW1pdGVkIHByZWNpc2lvbi5cclxuICAgICAgICAgIFBPV19QUkVDSVNJT04gPSAwO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgICB5ID0gbmV3IEJpZ051bWJlcihiYXNlSW4pO1xyXG4gICAgICAgICAgeCA9IHkucG93KHN0ci5sZW5ndGggLSBpKTtcclxuICAgICAgICAgIFBPV19QUkVDSVNJT04gPSBrO1xyXG5cclxuICAgICAgICAgIC8vIENvbnZlcnQgc3RyIGFzIGlmIGFuIGludGVnZXIsIHRoZW4gcmVzdG9yZSB0aGUgZnJhY3Rpb24gcGFydCBieSBkaXZpZGluZyB0aGVcclxuICAgICAgICAgIC8vIHJlc3VsdCBieSBpdHMgYmFzZSByYWlzZWQgdG8gYSBwb3dlci5cclxuXHJcbiAgICAgICAgICB5LmMgPSB0b0Jhc2VPdXQodG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcoeC5jKSwgeC5lLCAnMCcpLFxyXG4gICAgICAgICAgIDEwLCBiYXNlT3V0LCBkZWNpbWFsKTtcclxuICAgICAgICAgIHkuZSA9IHkuYy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBudW1iZXIgYXMgaW50ZWdlci5cclxuXHJcbiAgICAgICAgeGMgPSB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGNhbGxlcklzVG9TdHJpbmdcclxuICAgICAgICAgPyAoYWxwaGFiZXQgPSBBTFBIQUJFVCwgZGVjaW1hbClcclxuICAgICAgICAgOiAoYWxwaGFiZXQgPSBkZWNpbWFsLCBBTFBIQUJFVCkpO1xyXG5cclxuICAgICAgICAvLyB4YyBub3cgcmVwcmVzZW50cyBzdHIgYXMgYW4gaW50ZWdlciBhbmQgY29udmVydGVkIHRvIGJhc2VPdXQuIGUgaXMgdGhlIGV4cG9uZW50LlxyXG4gICAgICAgIGUgPSBrID0geGMubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7IHhjWy0ta10gPT0gMDsgeGMucG9wKCkpO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmICgheGNbMF0pIHJldHVybiBhbHBoYWJldC5jaGFyQXQoMCk7XHJcblxyXG4gICAgICAgIC8vIERvZXMgc3RyIHJlcHJlc2VudCBhbiBpbnRlZ2VyPyBJZiBzbywgbm8gbmVlZCBmb3IgdGhlIGRpdmlzaW9uLlxyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgLS1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LmMgPSB4YztcclxuICAgICAgICAgIHguZSA9IGU7XHJcblxyXG4gICAgICAgICAgLy8gVGhlIHNpZ24gaXMgbmVlZGVkIGZvciBjb3JyZWN0IHJvdW5kaW5nLlxyXG4gICAgICAgICAgeC5zID0gc2lnbjtcclxuICAgICAgICAgIHggPSBkaXYoeCwgeSwgZHAsIHJtLCBiYXNlT3V0KTtcclxuICAgICAgICAgIHhjID0geC5jO1xyXG4gICAgICAgICAgciA9IHgucjtcclxuICAgICAgICAgIGUgPSB4LmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB4YyBub3cgcmVwcmVzZW50cyBzdHIgY29udmVydGVkIHRvIGJhc2VPdXQuXHJcblxyXG4gICAgICAgIC8vIFRIZSBpbmRleCBvZiB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgZCA9IGUgKyBkcCArIDE7XHJcblxyXG4gICAgICAgIC8vIFRoZSByb3VuZGluZyBkaWdpdDogdGhlIGRpZ2l0IHRvIHRoZSByaWdodCBvZiB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgICBpID0geGNbZF07XHJcblxyXG4gICAgICAgIC8vIExvb2sgYXQgdGhlIHJvdW5kaW5nIGRpZ2l0cyBhbmQgbW9kZSB0byBkZXRlcm1pbmUgd2hldGhlciB0byByb3VuZCB1cC5cclxuXHJcbiAgICAgICAgayA9IGJhc2VPdXQgLyAyO1xyXG4gICAgICAgIHIgPSByIHx8IGQgPCAwIHx8IHhjW2QgKyAxXSAhPSBudWxsO1xyXG5cclxuICAgICAgICByID0gcm0gPCA0ID8gKGkgIT0gbnVsbCB8fCByKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICAgICAgICA6IGkgPiBrIHx8IGkgPT0gayAmJihybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJiB4Y1tkIC0gMV0gJiAxIHx8XHJcbiAgICAgICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGluZGV4IG9mIHRoZSByb3VuZGluZyBkaWdpdCBpcyBub3QgZ3JlYXRlciB0aGFuIHplcm8sIG9yIHhjIHJlcHJlc2VudHNcclxuICAgICAgICAvLyB6ZXJvLCB0aGVuIHRoZSByZXN1bHQgb2YgdGhlIGJhc2UgY29udmVyc2lvbiBpcyB6ZXJvIG9yLCBpZiByb3VuZGluZyB1cCwgYSB2YWx1ZVxyXG4gICAgICAgIC8vIHN1Y2ggYXMgMC4wMDAwMS5cclxuICAgICAgICBpZiAoZCA8IDEgfHwgIXhjWzBdKSB7XHJcblxyXG4gICAgICAgICAgLy8gMV4tZHAgb3IgMFxyXG4gICAgICAgICAgc3RyID0gciA/IHRvRml4ZWRQb2ludChhbHBoYWJldC5jaGFyQXQoMSksIC1kcCwgYWxwaGFiZXQuY2hhckF0KDApKSA6IGFscGhhYmV0LmNoYXJBdCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIFRydW5jYXRlIHhjIHRvIHRoZSByZXF1aXJlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICB4Yy5sZW5ndGggPSBkO1xyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJvdW5kaW5nIHVwIG1heSBtZWFuIHRoZSBwcmV2aW91cyBkaWdpdCBoYXMgdG8gYmUgcm91bmRlZCB1cCBhbmQgc28gb24uXHJcbiAgICAgICAgICAgIGZvciAoLS1iYXNlT3V0OyArK3hjWy0tZF0gPiBiYXNlT3V0Oykge1xyXG4gICAgICAgICAgICAgIHhjW2RdID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFkKSB7XHJcbiAgICAgICAgICAgICAgICArK2U7XHJcbiAgICAgICAgICAgICAgICB4YyA9IFsxXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICAgIGZvciAoayA9IHhjLmxlbmd0aDsgIXhjWy0ta107KTtcclxuXHJcbiAgICAgICAgICAvLyBFLmcuIFs0LCAxMSwgMTVdIGJlY29tZXMgNGJmLlxyXG4gICAgICAgICAgZm9yIChpID0gMCwgc3RyID0gJyc7IGkgPD0gazsgc3RyICs9IGFscGhhYmV0LmNoYXJBdCh4Y1tpKytdKSk7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIGxlYWRpbmcgemVyb3MsIGRlY2ltYWwgcG9pbnQgYW5kIHRyYWlsaW5nIHplcm9zIGFzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgYWxwaGFiZXQuY2hhckF0KDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBjYWxsZXIgd2lsbCBhZGQgdGhlIHNpZ24uXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBlcmZvcm0gZGl2aXNpb24gaW4gdGhlIHNwZWNpZmllZCBiYXNlLiBDYWxsZWQgYnkgZGl2IGFuZCBjb252ZXJ0QmFzZS5cclxuICAgIGRpdiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAvLyBBc3N1bWUgbm9uLXplcm8geCBhbmQgay5cclxuICAgICAgZnVuY3Rpb24gbXVsdGlwbHkoeCwgaywgYmFzZSkge1xyXG4gICAgICAgIHZhciBtLCB0ZW1wLCB4bG8sIHhoaSxcclxuICAgICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICAgIGkgPSB4Lmxlbmd0aCxcclxuICAgICAgICAgIGtsbyA9IGsgJSBTUVJUX0JBU0UsXHJcbiAgICAgICAgICBraGkgPSBrIC8gU1FSVF9CQVNFIHwgMDtcclxuXHJcbiAgICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgICB4bG8gPSB4W2ldICUgU1FSVF9CQVNFO1xyXG4gICAgICAgICAgeGhpID0geFtpXSAvIFNRUlRfQkFTRSB8IDA7XHJcbiAgICAgICAgICBtID0ga2hpICogeGxvICsgeGhpICoga2xvO1xyXG4gICAgICAgICAgdGVtcCA9IGtsbyAqIHhsbyArICgobSAlIFNRUlRfQkFTRSkgKiBTUVJUX0JBU0UpICsgY2Fycnk7XHJcbiAgICAgICAgICBjYXJyeSA9ICh0ZW1wIC8gYmFzZSB8IDApICsgKG0gLyBTUVJUX0JBU0UgfCAwKSArIGtoaSAqIHhoaTtcclxuICAgICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXJyeSkgeCA9IFtjYXJyeV0uY29uY2F0KHgpO1xyXG5cclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBhTCwgYkwpIHtcclxuICAgICAgICB2YXIgaSwgY21wO1xyXG5cclxuICAgICAgICBpZiAoYUwgIT0gYkwpIHtcclxuICAgICAgICAgIGNtcCA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBmb3IgKGkgPSBjbXAgPSAwOyBpIDwgYUw7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICAgIGNtcCA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY21wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCwgYmFzZSkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgICBhW2FMXSAtPSBpO1xyXG4gICAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICAgIGFbYUxdID0gaSAqIGJhc2UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTsgYS5zcGxpY2UoMCwgMSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4OiBkaXZpZGVuZCwgeTogZGl2aXNvci5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBkcCwgcm0sIGJhc2UpIHtcclxuICAgICAgICB2YXIgY21wLCBlLCBpLCBtb3JlLCBuLCBwcm9kLCBwcm9kTCwgcSwgcWMsIHJlbSwgcmVtTCwgcmVtMCwgeGksIHhMLCB5YzAsXHJcbiAgICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgICBzID0geC5zID09IHkucyA/IDEgOiAtMSxcclxuICAgICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBOYU4sIEluZmluaXR5IG9yIDA/XHJcbiAgICAgICAgaWYgKCF4YyB8fCAheGNbMF0gfHwgIXljIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKFxyXG5cclxuICAgICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBOYU4sIG9yIGJvdGggSW5maW5pdHkgb3IgMC5cclxuICAgICAgICAgICAheC5zIHx8ICF5LnMgfHwgKHhjID8geWMgJiYgeGNbMF0gPT0geWNbMF0gOiAheWMpID8gTmFOIDpcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgeCBpcyDCsTAgb3IgeSBpcyDCsUluZmluaXR5LCBvciByZXR1cm4gwrFJbmZpbml0eSBhcyB5IGlzIMKxMC5cclxuICAgICAgICAgICAgeGMgJiYgeGNbMF0gPT0gMCB8fCAheWMgPyBzICogMCA6IHMgLyAwXHJcbiAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBxID0gbmV3IEJpZ051bWJlcihzKTtcclxuICAgICAgICBxYyA9IHEuYyA9IFtdO1xyXG4gICAgICAgIGUgPSB4LmUgLSB5LmU7XHJcbiAgICAgICAgcyA9IGRwICsgZSArIDE7XHJcblxyXG4gICAgICAgIGlmICghYmFzZSkge1xyXG4gICAgICAgICAgYmFzZSA9IEJBU0U7XHJcbiAgICAgICAgICBlID0gYml0Rmxvb3IoeC5lIC8gTE9HX0JBU0UpIC0gYml0Rmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgICAgICAgcyA9IHMgLyBMT0dfQkFTRSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoZW4gdGhlIGN1cnJlbnQgdmFsdWUgb2YgZS5cclxuICAgICAgICAvLyBUaGUgY29lZmZpY2llbnRzIG9mIHRoZSBCaWdOdW1iZXJzIGZyb20gY29udmVydEJhc2UgbWF5IGhhdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yIChpID0gMDsgeWNbaV0gPT0gKHhjW2ldIHx8IDApOyBpKyspO1xyXG5cclxuICAgICAgICBpZiAoeWNbaV0gPiAoeGNbaV0gfHwgMCkpIGUtLTtcclxuXHJcbiAgICAgICAgaWYgKHMgPCAwKSB7XHJcbiAgICAgICAgICBxYy5wdXNoKDEpO1xyXG4gICAgICAgICAgbW9yZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhMID0geGMubGVuZ3RoO1xyXG4gICAgICAgICAgeUwgPSB5Yy5sZW5ndGg7XHJcbiAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgIHMgKz0gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb3JtYWxpc2UgeGMgYW5kIHljIHNvIGhpZ2hlc3Qgb3JkZXIgZGlnaXQgb2YgeWMgaXMgPj0gYmFzZSAvIDIuXHJcblxyXG4gICAgICAgICAgbiA9IG1hdGhmbG9vcihiYXNlIC8gKHljWzBdICsgMSkpO1xyXG5cclxuICAgICAgICAgIC8vIE5vdCBuZWNlc3NhcnksIGJ1dCB0byBoYW5kbGUgb2RkIGJhc2VzIHdoZXJlIHljWzBdID09IChiYXNlIC8gMikgLSAxLlxyXG4gICAgICAgICAgLy8gaWYgKG4gPiAxIHx8IG4rKyA9PSAxICYmIHljWzBdIDwgYmFzZSAvIDIpIHtcclxuICAgICAgICAgIGlmIChuID4gMSkge1xyXG4gICAgICAgICAgICB5YyA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgeGMgPSBtdWx0aXBseSh4YywgbiwgYmFzZSk7XHJcbiAgICAgICAgICAgIHlMID0geWMubGVuZ3RoO1xyXG4gICAgICAgICAgICB4TCA9IHhjLmxlbmd0aDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgICAgcmVtID0geGMuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICAgIGZvciAoOyByZW1MIDwgeUw7IHJlbVtyZW1MKytdID0gMCk7XHJcbiAgICAgICAgICB5eiA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICB5eiA9IFswXS5jb25jYXQoeXopO1xyXG4gICAgICAgICAgeWMwID0geWNbMF07XHJcbiAgICAgICAgICBpZiAoeWNbMV0gPj0gYmFzZSAvIDIpIHljMCsrO1xyXG4gICAgICAgICAgLy8gTm90IG5lY2Vzc2FyeSwgYnV0IHRvIHByZXZlbnQgdHJpYWwgZGlnaXQgbiA+IGJhc2UsIHdoZW4gdXNpbmcgYmFzZSAzLlxyXG4gICAgICAgICAgLy8gZWxzZSBpZiAoYmFzZSA9PSAzICYmIHljMCA9PSAxKSB5YzAgPSAxICsgMWUtMTU7XHJcblxyXG4gICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBuID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBjbXAgPSBjb21wYXJlKHljLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgbi5cclxuXHJcbiAgICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBiYXNlICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gbiBpcyBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIG4gPSBtYXRoZmxvb3IocmVtMCAvIHljMCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vICBBbGdvcml0aG06XHJcbiAgICAgICAgICAgICAgLy8gIHByb2R1Y3QgPSBkaXZpc29yIG11bHRpcGxpZWQgYnkgdHJpYWwgZGlnaXQgKG4pLlxyXG4gICAgICAgICAgICAgIC8vICBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyAgSWYgcHJvZHVjdCBpcyBncmVhdGVyIHRoYW4gcmVtYWluZGVyOlxyXG4gICAgICAgICAgICAgIC8vICAgIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LCBkZWNyZW1lbnQgdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgLy8gIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgLy8gIElmIHByb2R1Y3Qgd2FzIGxlc3MgdGhhbiByZW1haW5kZXIgYXQgdGhlIGxhc3QgY29tcGFyZTpcclxuICAgICAgICAgICAgICAvLyAgICBDb21wYXJlIG5ldyByZW1haW5kZXIgYW5kIGRpdmlzb3IuXHJcbiAgICAgICAgICAgICAgLy8gICAgSWYgcmVtYWluZGVyIGlzIGdyZWF0ZXIgdGhhbiBkaXZpc29yOlxyXG4gICAgICAgICAgICAgIC8vICAgICAgU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlciwgaW5jcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG5cclxuICAgICAgICAgICAgICBpZiAobiA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIG1heSBiZSA+IGJhc2Ugb25seSB3aGVuIGJhc2UgaXMgMy5cclxuICAgICAgICAgICAgICAgIGlmIChuID49IGJhc2UpIG4gPSBiYXNlIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvciAqIHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3QgPiByZW1haW5kZXIgdGhlbiB0cmlhbCBkaWdpdCBuIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgICAgLy8gbiBpcyAxIHRvbyBoaWdoIGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgaXMgbm90IGtub3duIHRvIGhhdmVcclxuICAgICAgICAgICAgICAgIC8vIGV2ZXIgYmVlbiBtb3JlIHRoYW4gMSB0b28gaGlnaC5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgbi0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHByb2R1Y3QuXHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHljLCBwcm9kTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgIGNtcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIGlzIDAgb3IgMSwgY21wIGlzIC0xLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbiBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWMgYW5kIHJlbSBhZ2FpbiBiZWxvdyxcclxuICAgICAgICAgICAgICAgIC8vIHNvIGNoYW5nZSBjbXAgdG8gMSB0byBhdm9pZCBpdC5cclxuICAgICAgICAgICAgICAgIC8vIElmIG4gaXMgMSwgbGVhdmUgY21wIGFzIC0xLCBzbyB5YyBhbmQgcmVtIGFyZSBjb21wYXJlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgIGlmIChuID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGRpdmlzb3IgPCByZW1haW5kZXIsIHNvIG4gbXVzdCBiZSBhdCBsZWFzdCAxLlxyXG4gICAgICAgICAgICAgICAgICBjbXAgPSBuID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvclxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKHByb2RMIDwgcmVtTCkgcHJvZCA9IFswXS5jb25jYXQocHJvZCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCBwcm9kLCByZW1MLCBiYXNlKTtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIG5ldyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWFsIGRpZ2l0IG4gdG9vIGxvdy5cclxuICAgICAgICAgICAgICAgIC8vIG4gaXMgMSB0b28gbG93IGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgdmVyeSByYXJlbHkgMiB0b28gbG93LlxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoeWMsIHJlbSwgeUwsIHJlbUwpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICBuKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWMsIHJlbUwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY21wID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgICAgfSAvLyBlbHNlIGNtcCA9PT0gMSBhbmQgbiB3aWxsIGJlIDBcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgbiwgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgICAgcWNbaSsrXSA9IG47XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKHJlbVswXSkge1xyXG4gICAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGNbeGldIHx8IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVtID0gW3hjW3hpXV07XHJcbiAgICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gd2hpbGUgKCh4aSsrIDwgeEwgfHwgcmVtWzBdICE9IG51bGwpICYmIHMtLSk7XHJcblxyXG4gICAgICAgICAgbW9yZSA9IHJlbVswXSAhPSBudWxsO1xyXG5cclxuICAgICAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgICAgIGlmICghcWNbMF0pIHFjLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXNlID09IEJBU0UpIHtcclxuXHJcbiAgICAgICAgICAvLyBUbyBjYWxjdWxhdGUgcS5lLCBmaXJzdCBnZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgcWNbMF0uXHJcbiAgICAgICAgICBmb3IgKGkgPSAxLCBzID0gcWNbMF07IHMgPj0gMTA7IHMgLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAgICAgcm91bmQocSwgZHAgKyAocS5lID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpICsgMSwgcm0sIG1vcmUpO1xyXG5cclxuICAgICAgICAvLyBDYWxsZXIgaXMgY29udmVydEJhc2UuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHEuZSA9IGU7XHJcbiAgICAgICAgICBxLnIgPSArbW9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBxO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIEJpZ051bWJlciBuIGluIGZpeGVkLXBvaW50IG9yIGV4cG9uZW50aWFsXHJcbiAgICAgKiBub3RhdGlvbiByb3VuZGVkIHRvIHRoZSBzcGVjaWZpZWQgZGVjaW1hbCBwbGFjZXMgb3Igc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICpcclxuICAgICAqIG46IGEgQmlnTnVtYmVyLlxyXG4gICAgICogaTogdGhlIGluZGV4IG9mIHRoZSBsYXN0IGRpZ2l0IHJlcXVpcmVkIChpLmUuIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwKS5cclxuICAgICAqIHJtOiB0aGUgcm91bmRpbmcgbW9kZS5cclxuICAgICAqIGlkOiAxICh0b0V4cG9uZW50aWFsKSBvciAyICh0b1ByZWNpc2lvbikuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGZvcm1hdChuLCBpLCBybSwgaWQpIHtcclxuICAgICAgdmFyIGMwLCBlLCBuZSwgbGVuLCBzdHI7XHJcblxyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIGlmICghbi5jKSByZXR1cm4gbi50b1N0cmluZygpO1xyXG5cclxuICAgICAgYzAgPSBuLmNbMF07XHJcbiAgICAgIG5lID0gbi5lO1xyXG5cclxuICAgICAgaWYgKGkgPT0gbnVsbCkge1xyXG4gICAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgICBzdHIgPSBpZCA9PSAxIHx8IGlkID09IDIgJiYgKG5lIDw9IFRPX0VYUF9ORUcgfHwgbmUgPj0gVE9fRVhQX1BPUylcclxuICAgICAgICAgPyB0b0V4cG9uZW50aWFsKHN0ciwgbmUpXHJcbiAgICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgbmUsICcwJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHJvdW5kKG5ldyBCaWdOdW1iZXIobiksIGksIHJtKTtcclxuXHJcbiAgICAgICAgLy8gbi5lIG1heSBoYXZlIGNoYW5nZWQgaWYgdGhlIHZhbHVlIHdhcyByb3VuZGVkIHVwLlxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyB0b1ByZWNpc2lvbiByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIHRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICAgICAgLy8gc3BlY2lmaWVkIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBuZWNlc3NhcnkgdG8gcmVwcmVzZW50IHRoZSBpbnRlZ2VyXHJcbiAgICAgICAgLy8gcGFydCBvZiB0aGUgdmFsdWUgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24uXHJcblxyXG4gICAgICAgIC8vIEV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAgIGlmIChpZCA9PSAxIHx8IGlkID09IDIgJiYgKGkgPD0gZSB8fCBlIDw9IFRPX0VYUF9ORUcpKSB7XHJcblxyXG4gICAgICAgICAgLy8gQXBwZW5kIHplcm9zP1xyXG4gICAgICAgICAgZm9yICg7IGxlbiA8IGk7IHN0ciArPSAnMCcsIGxlbisrKTtcclxuICAgICAgICAgIHN0ciA9IHRvRXhwb25lbnRpYWwoc3RyLCBlKTtcclxuXHJcbiAgICAgICAgLy8gRml4ZWQtcG9pbnQgbm90YXRpb24uXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGkgLT0gbmU7XHJcbiAgICAgICAgICBzdHIgPSB0b0ZpeGVkUG9pbnQoc3RyLCBlLCAnMCcpO1xyXG5cclxuICAgICAgICAgIC8vIEFwcGVuZCB6ZXJvcz9cclxuICAgICAgICAgIGlmIChlICsgMSA+IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoLS1pID4gMCkgZm9yIChzdHIgKz0gJy4nOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSArPSBlIC0gbGVuO1xyXG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZSArIDEgPT0gbGVuKSBzdHIgKz0gJy4nO1xyXG4gICAgICAgICAgICAgIGZvciAoOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbi5zIDwgMCAmJiBjMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSGFuZGxlIEJpZ051bWJlci5tYXggYW5kIEJpZ051bWJlci5taW4uXHJcbiAgICBmdW5jdGlvbiBtYXhPck1pbihhcmdzLCBtZXRob2QpIHtcclxuICAgICAgdmFyIG4sXHJcbiAgICAgICAgaSA9IDEsXHJcbiAgICAgICAgbSA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcblxyXG4gICAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuID0gbmV3IEJpZ051bWJlcihhcmdzW2ldKTtcclxuXHJcbiAgICAgICAgLy8gSWYgYW55IG51bWJlciBpcyBOYU4sIHJldHVybiBOYU4uXHJcbiAgICAgICAgaWYgKCFuLnMpIHtcclxuICAgICAgICAgIG0gPSBuO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QuY2FsbChtLCBuKSkge1xyXG4gICAgICAgICAgbSA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFN0cmlwIHRyYWlsaW5nIHplcm9zLCBjYWxjdWxhdGUgYmFzZSAxMCBleHBvbmVudCBhbmQgY2hlY2sgYWdhaW5zdCBNSU5fRVhQIGFuZCBNQVhfRVhQLlxyXG4gICAgICogQ2FsbGVkIGJ5IG1pbnVzLCBwbHVzIGFuZCB0aW1lcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXNlKG4sIGMsIGUpIHtcclxuICAgICAgdmFyIGkgPSAxLFxyXG4gICAgICAgIGogPSBjLmxlbmd0aDtcclxuXHJcbiAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhY1stLWpdOyBjLnBvcCgpKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudC4gRmlyc3QgZ2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIGNbMF0uXHJcbiAgICAgIGZvciAoaiA9IGNbMF07IGogPj0gMTA7IGogLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdz9cclxuICAgICAgaWYgKChlID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpID4gTUFYX0VYUCkge1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICBuLmMgPSBuLmUgPSBudWxsO1xyXG5cclxuICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBNSU5fRVhQKSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgbi5jID0gW24uZSA9IDBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4uZSA9IGU7XHJcbiAgICAgICAgbi5jID0gYztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEhhbmRsZSB2YWx1ZXMgdGhhdCBmYWlsIHRoZSB2YWxpZGl0eSB0ZXN0IGluIEJpZ051bWJlci5cclxuICAgIHBhcnNlTnVtZXJpYyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBiYXNlUHJlZml4ID0gL14oLT8pMChbeGJvXSkoPz1cXHdbXFx3Ll0qJCkvaSxcclxuICAgICAgICBkb3RBZnRlciA9IC9eKFteLl0rKVxcLiQvLFxyXG4gICAgICAgIGRvdEJlZm9yZSA9IC9eXFwuKFteLl0rKSQvLFxyXG4gICAgICAgIGlzSW5maW5pdHlPck5hTiA9IC9eLT8oSW5maW5pdHl8TmFOKSQvLFxyXG4gICAgICAgIHdoaXRlc3BhY2VPclBsdXMgPSAvXlxccypcXCsoPz1bXFx3Ll0pfF5cXHMrfFxccyskL2c7XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHN0ciwgaXNOdW0sIGIpIHtcclxuICAgICAgICB2YXIgYmFzZSxcclxuICAgICAgICAgIHMgPSBpc051bSA/IHN0ciA6IHN0ci5yZXBsYWNlKHdoaXRlc3BhY2VPclBsdXMsICcnKTtcclxuXHJcbiAgICAgICAgLy8gTm8gZXhjZXB0aW9uIG9uIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICAgIGlmIChpc0luZmluaXR5T3JOYU4udGVzdChzKSkge1xyXG4gICAgICAgICAgeC5zID0gaXNOYU4ocykgPyBudWxsIDogcyA8IDAgPyAtMSA6IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghaXNOdW0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJhc2VQcmVmaXggPSAvXigtPykwKFt4Ym9dKSg/PVxcd1tcXHcuXSokKS9pXHJcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoYmFzZVByZWZpeCwgZnVuY3Rpb24gKG0sIHAxLCBwMikge1xyXG4gICAgICAgICAgICAgIGJhc2UgPSAocDIgPSBwMi50b0xvd2VyQ2FzZSgpKSA9PSAneCcgPyAxNiA6IHAyID09ICdiJyA/IDIgOiA4O1xyXG4gICAgICAgICAgICAgIHJldHVybiAhYiB8fCBiID09IGJhc2UgPyBwMSA6IG07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGIpIHtcclxuICAgICAgICAgICAgICBiYXNlID0gYjtcclxuXHJcbiAgICAgICAgICAgICAgLy8gRS5nLiAnMS4nIHRvICcxJywgJy4xJyB0byAnMC4xJ1xyXG4gICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoZG90QWZ0ZXIsICckMScpLnJlcGxhY2UoZG90QmVmb3JlLCAnMC4kMScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyICE9IHMpIHJldHVybiBuZXcgQmlnTnVtYmVyKHMsIGJhc2UpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOb3QgYSBudW1iZXI6IHtufSdcclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOb3QgYSBiYXNlIHtifSBudW1iZXI6IHtufSdcclxuICAgICAgICAgIGlmIChCaWdOdW1iZXIuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnTm90IGEnICsgKGIgPyAnIGJhc2UgJyArIGIgOiAnJykgKyAnIG51bWJlcjogJyArIHN0cik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTmFOXHJcbiAgICAgICAgICB4LnMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJvdW5kIHggdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0uIENoZWNrIGZvciBvdmVyL3VuZGVyLWZsb3cuXHJcbiAgICAgKiBJZiByIGlzIHRydXRoeSwgaXQgaXMga25vd24gdGhhdCB0aGVyZSBhcmUgbW9yZSBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByb3VuZCh4LCBzZCwgcm0sIHIpIHtcclxuICAgICAgdmFyIGQsIGksIGosIGssIG4sIG5pLCByZCxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICBwb3dzMTAgPSBQT1dTX1RFTjtcclxuXHJcbiAgICAgIC8vIGlmIHggaXMgbm90IEluZmluaXR5IG9yIE5hTi4uLlxyXG4gICAgICBpZiAoeGMpIHtcclxuXHJcbiAgICAgICAgLy8gcmQgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBpLmUuIHRoZSBkaWdpdCBhZnRlciB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgICAvLyBuIGlzIGEgYmFzZSAxZTE0IG51bWJlciwgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IG9mIGFycmF5IHguYyBjb250YWluaW5nIHJkLlxyXG4gICAgICAgIC8vIG5pIGlzIHRoZSBpbmRleCBvZiBuIHdpdGhpbiB4LmMuXHJcbiAgICAgICAgLy8gZCBpcyB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAgIC8vIGkgaXMgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiBuIGluY2x1ZGluZyBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAgIC8vIGogaXMgdGhlIGFjdHVhbCBpbmRleCBvZiByZCB3aXRoaW4gbiAoaWYgPCAwLCByZCBpcyBhIGxlYWRpbmcgemVybykuXHJcbiAgICAgICAgb3V0OiB7XHJcblxyXG4gICAgICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLlxyXG4gICAgICAgICAgZm9yIChkID0gMSwgayA9IHhjWzBdOyBrID49IDEwOyBrIC89IDEwLCBkKyspO1xyXG4gICAgICAgICAgaSA9IHNkIC0gZDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgaW4gdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuLi5cclxuICAgICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgICBpICs9IExPR19CQVNFO1xyXG4gICAgICAgICAgICBqID0gc2Q7XHJcbiAgICAgICAgICAgIG4gPSB4Y1tuaSA9IDBdO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIG4uXHJcbiAgICAgICAgICAgIHJkID0gbiAvIHBvd3MxMFtkIC0gaiAtIDFdICUgMTAgfCAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmkgPSBtYXRoY2VpbCgoaSArIDEpIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5pID49IHhjLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICBpZiAocikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5lZWRlZCBieSBzcXJ0LlxyXG4gICAgICAgICAgICAgICAgZm9yICg7IHhjLmxlbmd0aCA8PSBuaTsgeGMucHVzaCgwKSk7XHJcbiAgICAgICAgICAgICAgICBuID0gcmQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IDE7XHJcbiAgICAgICAgICAgICAgICBpICU9IExPR19CQVNFO1xyXG4gICAgICAgICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIDE7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrIG91dDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbiA9IGsgPSB4Y1tuaV07XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAgICAgICAgIGZvciAoZCA9IDE7IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4uXHJcbiAgICAgICAgICAgICAgaSAlPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbiwgYWRqdXN0ZWQgZm9yIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgICAgICAgLy8gVGhlIG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIG4gaXMgZ2l2ZW4gYnkgTE9HX0JBU0UgLSBkLlxyXG4gICAgICAgICAgICAgIGogPSBpIC0gTE9HX0JBU0UgKyBkO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygbi5cclxuICAgICAgICAgICAgICByZCA9IGogPCAwID8gMCA6IG4gLyBwb3dzMTBbZCAtIGogLSAxXSAlIDEwIHwgMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHIgPSByIHx8IHNkIDwgMCB8fFxyXG5cclxuICAgICAgICAgIC8vIEFyZSB0aGVyZSBhbnkgbm9uLXplcm8gZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdD9cclxuICAgICAgICAgIC8vIFRoZSBleHByZXNzaW9uICBuICUgcG93czEwW2QgLSBqIC0gMV0gIHJldHVybnMgYWxsIGRpZ2l0cyBvZiBuIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgLy8gb2YgdGhlIGRpZ2l0IGF0IGosIGUuZy4gaWYgbiBpcyA5MDg3MTQgYW5kIGogaXMgMiwgdGhlIGV4cHJlc3Npb24gZ2l2ZXMgNzE0LlxyXG4gICAgICAgICAgIHhjW25pICsgMV0gIT0gbnVsbCB8fCAoaiA8IDAgPyBuIDogbiAlIHBvd3MxMFtkIC0gaiAtIDFdKTtcclxuXHJcbiAgICAgICAgICByID0gcm0gPCA0XHJcbiAgICAgICAgICAgPyAocmQgfHwgcikgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgICAgOiByZCA+IDUgfHwgcmQgPT0gNSAmJiAocm0gPT0gNCB8fCByIHx8IHJtID09IDYgJiZcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGRpZ2l0IHRvIHRoZSBsZWZ0IG9mIHRoZSByb3VuZGluZyBkaWdpdCBpcyBvZGQuXHJcbiAgICAgICAgICAgICgoaSA+IDAgPyBqID4gMCA/IG4gLyBwb3dzMTBbZCAtIGpdIDogMCA6IHhjW25pIC0gMV0pICUgMTApICYgMSB8fFxyXG4gICAgICAgICAgICAgcm0gPT0gKHgucyA8IDAgPyA4IDogNykpO1xyXG5cclxuICAgICAgICAgIGlmIChzZCA8IDEgfHwgIXhjWzBdKSB7XHJcbiAgICAgICAgICAgIHhjLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAocikge1xyXG5cclxuICAgICAgICAgICAgICAvLyBDb252ZXJ0IHNkIHRvIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICAgICAgICAgIHNkIC09IHguZSArIDE7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDEsIDAuMSwgMC4wMSwgMC4wMDEsIDAuMDAwMSBldGMuXHJcbiAgICAgICAgICAgICAgeGNbMF0gPSBwb3dzMTBbKExPR19CQVNFIC0gc2QgJSBMT0dfQkFTRSkgJSBMT0dfQkFTRV07XHJcbiAgICAgICAgICAgICAgeC5lID0gLXNkIHx8IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgICAgICAgeGNbMF0gPSB4LmUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgZXhjZXNzIGRpZ2l0cy5cclxuICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgeGMubGVuZ3RoID0gbmk7XHJcbiAgICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgICAgICBuaS0tO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeGMubGVuZ3RoID0gbmkgKyAxO1xyXG4gICAgICAgICAgICBrID0gcG93czEwW0xPR19CQVNFIC0gaV07XHJcblxyXG4gICAgICAgICAgICAvLyBFLmcuIDU2NzAwIGJlY29tZXMgNTYwMDAgaWYgNyBpcyB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgICAgIC8vIGogPiAwIG1lYW5zIGkgPiBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiBuLlxyXG4gICAgICAgICAgICB4Y1tuaV0gPSBqID4gMCA/IG1hdGhmbG9vcihuIC8gcG93czEwW2QgLSBqXSAlIHBvd3MxMFtqXSkgKiBrIDogMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSb3VuZCB1cD9cclxuICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgOykge1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiB0aGUgZGlnaXQgdG8gYmUgcm91bmRlZCB1cCBpcyBpbiB0aGUgZmlyc3QgZWxlbWVudCBvZiB4Yy4uLlxyXG4gICAgICAgICAgICAgIGlmIChuaSA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaSB3aWxsIGJlIHRoZSBsZW5ndGggb2YgeGNbMF0gYmVmb3JlIGsgaXMgYWRkZWQuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBqID0geGNbMF07IGogPj0gMTA7IGogLz0gMTAsIGkrKyk7XHJcbiAgICAgICAgICAgICAgICBqID0geGNbMF0gKz0gaztcclxuICAgICAgICAgICAgICAgIGZvciAoayA9IDE7IGogPj0gMTA7IGogLz0gMTAsIGsrKyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgaSAhPSBrIHRoZSBsZW5ndGggaGFzIGluY3JlYXNlZC5cclxuICAgICAgICAgICAgICAgIGlmIChpICE9IGspIHtcclxuICAgICAgICAgICAgICAgICAgeC5lKys7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh4Y1swXSA9PSBCQVNFKSB4Y1swXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHhjW25pXSArPSBrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHhjW25pXSAhPSBCQVNFKSBicmVhaztcclxuICAgICAgICAgICAgICAgIHhjW25pLS1dID0gMDtcclxuICAgICAgICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICAgIGZvciAoaSA9IHhjLmxlbmd0aDsgeGNbLS1pXSA9PT0gMDsgeGMucG9wKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3ZlcmZsb3c/IEluZmluaXR5LlxyXG4gICAgICAgIGlmICh4LmUgPiBNQVhfRVhQKSB7XHJcbiAgICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBVbmRlcmZsb3c/IFplcm8uXHJcbiAgICAgICAgfSBlbHNlIGlmICh4LmUgPCBNSU5fRVhQKSB7XHJcbiAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gdmFsdWVPZihuKSB7XHJcbiAgICAgIHZhciBzdHIsXHJcbiAgICAgICAgZSA9IG4uZTtcclxuXHJcbiAgICAgIGlmIChlID09PSBudWxsKSByZXR1cm4gbi50b1N0cmluZygpO1xyXG5cclxuICAgICAgc3RyID0gY29lZmZUb1N0cmluZyhuLmMpO1xyXG5cclxuICAgICAgc3RyID0gZSA8PSBUT19FWFBfTkVHIHx8IGUgPj0gVE9fRVhQX1BPU1xyXG4gICAgICAgID8gdG9FeHBvbmVudGlhbChzdHIsIGUpXHJcbiAgICAgICAgOiB0b0ZpeGVkUG9pbnQoc3RyLCBlLCAnMCcpO1xyXG5cclxuICAgICAgcmV0dXJuIG4ucyA8IDAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFBST1RPVFlQRS9JTlNUQU5DRSBNRVRIT0RTXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlci5cclxuICAgICAqL1xyXG4gICAgUC5hYnNvbHV0ZVZhbHVlID0gUC5hYnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB4ID0gbmV3IEJpZ051bWJlcih0aGlzKTtcclxuICAgICAgaWYgKHgucyA8IDApIHgucyA9IDE7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVyblxyXG4gICAgICogICAxIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqICAgLTEgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogICAwIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZSxcclxuICAgICAqICAgb3IgbnVsbCBpZiB0aGUgdmFsdWUgb2YgZWl0aGVyIGlzIE5hTi5cclxuICAgICAqL1xyXG4gICAgUC5jb21wYXJlZFRvID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogSWYgZHAgaXMgdW5kZWZpbmVkIG9yIG51bGwgb3IgdHJ1ZSBvciBmYWxzZSwgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgb2YgdGhlXHJcbiAgICAgKiB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciwgb3IgbnVsbCBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgwrFJbmZpbml0eSBvciBOYU4uXHJcbiAgICAgKlxyXG4gICAgICogT3RoZXJ3aXNlLCBpZiBkcCBpcyBhIG51bWJlciwgcmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpc1xyXG4gICAgICogQmlnTnVtYmVyIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIGRwIGRlY2ltYWwgcGxhY2VzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yXHJcbiAgICAgKiBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlczogaW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICovXHJcbiAgICBQLmRlY2ltYWxQbGFjZXMgPSBQLmRwID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgICB2YXIgYywgbiwgdixcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChkcCAhPSBudWxsKSB7XHJcbiAgICAgICAgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcbiAgICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdW5kKG5ldyBCaWdOdW1iZXIoeCksIGRwICsgeC5lICsgMSwgcm0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIShjID0geC5jKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIG4gPSAoKHYgPSBjLmxlbmd0aCAtIDEpIC0gYml0Rmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpKSAqIExPR19CQVNFO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCBudW1iZXIuXHJcbiAgICAgIGlmICh2ID0gY1t2XSkgZm9yICg7IHYgJSAxMCA9PSAwOyB2IC89IDEwLCBuLS0pO1xyXG4gICAgICBpZiAobiA8IDApIG4gPSAwO1xyXG5cclxuICAgICAgcmV0dXJuIG47XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gLyAwID0gSVxyXG4gICAgICogIG4gLyBOID0gTlxyXG4gICAgICogIG4gLyBJID0gMFxyXG4gICAgICogIDAgLyBuID0gMFxyXG4gICAgICogIDAgLyAwID0gTlxyXG4gICAgICogIDAgLyBOID0gTlxyXG4gICAgICogIDAgLyBJID0gMFxyXG4gICAgICogIE4gLyBuID0gTlxyXG4gICAgICogIE4gLyAwID0gTlxyXG4gICAgICogIE4gLyBOID0gTlxyXG4gICAgICogIE4gLyBJID0gTlxyXG4gICAgICogIEkgLyBuID0gSVxyXG4gICAgICogIEkgLyAwID0gSVxyXG4gICAgICogIEkgLyBOID0gTlxyXG4gICAgICogIEkgLyBJID0gTlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGRpdmlkZWQgYnkgdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYiksIHJvdW5kZWQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZCBST1VORElOR19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLmRpdmlkZWRCeSA9IFAuZGl2ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGRpdih0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpLCBERUNJTUFMX1BMQUNFUywgUk9VTkRJTkdfTU9ERSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgaW50ZWdlciBwYXJ0IG9mIGRpdmlkaW5nIHRoZSB2YWx1ZSBvZiB0aGlzXHJcbiAgICAgKiBCaWdOdW1iZXIgYnkgdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5kaXZpZGVkVG9JbnRlZ2VyQnkgPSBQLmlkaXYgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gZGl2KHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYiksIDAsIDEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgZXhwb25lbnRpYXRlZCBieSBuLlxyXG4gICAgICpcclxuICAgICAqIElmIG0gaXMgcHJlc2VudCwgcmV0dXJuIHRoZSByZXN1bHQgbW9kdWxvIG0uXHJcbiAgICAgKiBJZiBuIGlzIG5lZ2F0aXZlIHJvdW5kIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqIElmIFBPV19QUkVDSVNJT04gaXMgbm9uLXplcm8gYW5kIG0gaXMgbm90IHByZXNlbnQsIHJvdW5kIHRvIFBPV19QUkVDSVNJT04gdXNpbmcgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgbW9kdWxhciBwb3dlciBvcGVyYXRpb24gd29ya3MgZWZmaWNpZW50bHkgd2hlbiB4LCBuLCBhbmQgbSBhcmUgaW50ZWdlcnMsIG90aGVyd2lzZSBpdFxyXG4gICAgICogaXMgZXF1aXZhbGVudCB0byBjYWxjdWxhdGluZyB4LmV4cG9uZW50aWF0ZWRCeShuKS5tb2R1bG8obSkgd2l0aCBhIFBPV19QUkVDSVNJT04gb2YgMC5cclxuICAgICAqXHJcbiAgICAgKiBuIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gVGhlIGV4cG9uZW50LiBBbiBpbnRlZ2VyLlxyXG4gICAgICogW21dIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gVGhlIG1vZHVsdXMuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEV4cG9uZW50IG5vdCBhbiBpbnRlZ2VyOiB7bn0nXHJcbiAgICAgKi9cclxuICAgIFAuZXhwb25lbnRpYXRlZEJ5ID0gUC5wb3cgPSBmdW5jdGlvbiAobiwgbSkge1xyXG4gICAgICB2YXIgaGFsZiwgaXNNb2RFeHAsIGksIGssIG1vcmUsIG5Jc0JpZywgbklzTmVnLCBuSXNPZGQsIHksXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICBuID0gbmV3IEJpZ051bWJlcihuKTtcclxuXHJcbiAgICAgIC8vIEFsbG93IE5hTiBhbmQgwrFJbmZpbml0eSwgYnV0IG5vdCBvdGhlciBub24taW50ZWdlcnMuXHJcbiAgICAgIGlmIChuLmMgJiYgIW4uaXNJbnRlZ2VyKCkpIHtcclxuICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0V4cG9uZW50IG5vdCBhbiBpbnRlZ2VyOiAnICsgdmFsdWVPZihuKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtICE9IG51bGwpIG0gPSBuZXcgQmlnTnVtYmVyKG0pO1xyXG5cclxuICAgICAgLy8gRXhwb25lbnQgb2YgTUFYX1NBRkVfSU5URUdFUiBpcyAxNS5cclxuICAgICAgbklzQmlnID0gbi5lID4gMTQ7XHJcblxyXG4gICAgICAvLyBJZiB4IGlzIE5hTiwgwrFJbmZpbml0eSwgwrEwIG9yIMKxMSwgb3IgbiBpcyDCsUluZmluaXR5LCBOYU4gb3IgwrEwLlxyXG4gICAgICBpZiAoIXguYyB8fCAheC5jWzBdIHx8IHguY1swXSA9PSAxICYmICF4LmUgJiYgeC5jLmxlbmd0aCA9PSAxIHx8ICFuLmMgfHwgIW4uY1swXSkge1xyXG5cclxuICAgICAgICAvLyBUaGUgc2lnbiBvZiB0aGUgcmVzdWx0IG9mIHBvdyB3aGVuIHggaXMgbmVnYXRpdmUgZGVwZW5kcyBvbiB0aGUgZXZlbm5lc3Mgb2Ygbi5cclxuICAgICAgICAvLyBJZiArbiBvdmVyZmxvd3MgdG8gwrFJbmZpbml0eSwgdGhlIGV2ZW5uZXNzIG9mIG4gd291bGQgYmUgbm90IGJlIGtub3duLlxyXG4gICAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE1hdGgucG93KCt2YWx1ZU9mKHgpLCBuSXNCaWcgPyAyIC0gaXNPZGQobikgOiArdmFsdWVPZihuKSkpO1xyXG4gICAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuSXNOZWcgPSBuLnMgPCAwO1xyXG5cclxuICAgICAgaWYgKG0pIHtcclxuXHJcbiAgICAgICAgLy8geCAlIG0gcmV0dXJucyBOYU4gaWYgYWJzKG0pIGlzIHplcm8sIG9yIG0gaXMgTmFOLlxyXG4gICAgICAgIGlmIChtLmMgPyAhbS5jWzBdIDogIW0ucykgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgICAgaXNNb2RFeHAgPSAhbklzTmVnICYmIHguaXNJbnRlZ2VyKCkgJiYgbS5pc0ludGVnZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTW9kRXhwKSB4ID0geC5tb2QobSk7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdyB0byDCsUluZmluaXR5OiA+PTIqKjFlMTAgb3IgPj0xLjAwMDAwMjQqKjFlMTUuXHJcbiAgICAgIC8vIFVuZGVyZmxvdyB0byDCsTA6IDw9MC43OSoqMWUxMCBvciA8PTAuOTk5OTk3NSoqMWUxNS5cclxuICAgICAgfSBlbHNlIGlmIChuLmUgPiA5ICYmICh4LmUgPiAwIHx8IHguZSA8IC0xIHx8ICh4LmUgPT0gMFxyXG4gICAgICAgIC8vIFsxLCAyNDAwMDAwMDBdXHJcbiAgICAgICAgPyB4LmNbMF0gPiAxIHx8IG5Jc0JpZyAmJiB4LmNbMV0gPj0gMjRlN1xyXG4gICAgICAgIC8vIFs4MDAwMDAwMDAwMDAwMF0gIFs5OTk5OTc1MDAwMDAwMF1cclxuICAgICAgICA6IHguY1swXSA8IDhlMTMgfHwgbklzQmlnICYmIHguY1swXSA8PSA5OTk5OTc1ZTcpKSkge1xyXG5cclxuICAgICAgICAvLyBJZiB4IGlzIG5lZ2F0aXZlIGFuZCBuIGlzIG9kZCwgayA9IC0wLCBlbHNlIGsgPSAwLlxyXG4gICAgICAgIGsgPSB4LnMgPCAwICYmIGlzT2RkKG4pID8gLTAgOiAwO1xyXG5cclxuICAgICAgICAvLyBJZiB4ID49IDEsIGsgPSDCsUluZmluaXR5LlxyXG4gICAgICAgIGlmICh4LmUgPiAtMSkgayA9IDEgLyBrO1xyXG5cclxuICAgICAgICAvLyBJZiBuIGlzIG5lZ2F0aXZlIHJldHVybiDCsTAsIGVsc2UgcmV0dXJuIMKxSW5maW5pdHkuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIobklzTmVnID8gMSAvIGsgOiBrKTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoUE9XX1BSRUNJU0lPTikge1xyXG5cclxuICAgICAgICAvLyBUcnVuY2F0aW5nIGVhY2ggY29lZmZpY2llbnQgYXJyYXkgdG8gYSBsZW5ndGggb2YgayBhZnRlciBlYWNoIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgLy8gZXF1YXRlcyB0byB0cnVuY2F0aW5nIHNpZ25pZmljYW50IGRpZ2l0cyB0byBQT1dfUFJFQ0lTSU9OICsgWzI4LCA0MV0sXHJcbiAgICAgICAgLy8gaS5lLiB0aGVyZSB3aWxsIGJlIGEgbWluaW11bSBvZiAyOCBndWFyZCBkaWdpdHMgcmV0YWluZWQuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKFBPV19QUkVDSVNJT04gLyBMT0dfQkFTRSArIDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobklzQmlnKSB7XHJcbiAgICAgICAgaGFsZiA9IG5ldyBCaWdOdW1iZXIoMC41KTtcclxuICAgICAgICBpZiAobklzTmVnKSBuLnMgPSAxO1xyXG4gICAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgPSBNYXRoLmFicygrdmFsdWVPZihuKSk7XHJcbiAgICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE9ORSk7XHJcblxyXG4gICAgICAvLyBQZXJmb3JtcyA1NCBsb29wIGl0ZXJhdGlvbnMgZm9yIG4gb2YgOTAwNzE5OTI1NDc0MDk5MS5cclxuICAgICAgZm9yICg7IDspIHtcclxuXHJcbiAgICAgICAgaWYgKG5Jc09kZCkge1xyXG4gICAgICAgICAgeSA9IHkudGltZXMoeCk7XHJcbiAgICAgICAgICBpZiAoIXkuYykgYnJlYWs7XHJcblxyXG4gICAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgICAgaWYgKHkuYy5sZW5ndGggPiBrKSB5LmMubGVuZ3RoID0gaztcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNb2RFeHApIHtcclxuICAgICAgICAgICAgeSA9IHkubW9kKG0pOyAgICAvL3kgPSB5Lm1pbnVzKGRpdih5LCBtLCAwLCBNT0RVTE9fTU9ERSkudGltZXMobSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGkpIHtcclxuICAgICAgICAgIGkgPSBtYXRoZmxvb3IoaSAvIDIpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIGJyZWFrO1xyXG4gICAgICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG4gPSBuLnRpbWVzKGhhbGYpO1xyXG4gICAgICAgICAgcm91bmQobiwgbi5lICsgMSwgMSk7XHJcblxyXG4gICAgICAgICAgaWYgKG4uZSA+IDE0KSB7XHJcbiAgICAgICAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSA9ICt2YWx1ZU9mKG4pO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgYnJlYWs7XHJcbiAgICAgICAgICAgIG5Jc09kZCA9IGkgJSAyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcblxyXG4gICAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgICBpZiAoeC5jICYmIHguYy5sZW5ndGggPiBrKSB4LmMubGVuZ3RoID0gaztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTW9kRXhwKSB7XHJcbiAgICAgICAgICB4ID0geC5tb2QobSk7ICAgIC8veCA9IHgubWludXMoZGl2KHgsIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNNb2RFeHApIHJldHVybiB5O1xyXG4gICAgICBpZiAobklzTmVnKSB5ID0gT05FLmRpdih5KTtcclxuXHJcbiAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiBrID8gcm91bmQoeSwgUE9XX1BSRUNJU0lPTiwgUk9VTkRJTkdfTU9ERSwgbW9yZSkgOiB5O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gYW4gaW50ZWdlclxyXG4gICAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3JtfSdcclxuICAgICAqL1xyXG4gICAgUC5pbnRlZ2VyVmFsdWUgPSBmdW5jdGlvbiAocm0pIHtcclxuICAgICAgdmFyIG4gPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuICAgICAgcmV0dXJuIHJvdW5kKG4sIG4uZSArIDEsIHJtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNFcXVhbFRvID0gUC5lcSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBhIGZpbml0ZSBudW1iZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNGaW5pdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuYztcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzR3JlYXRlclRoYW4gPSBQLmd0ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPiAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYiksIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyA9IFAuZ3RlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIChiID0gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSkgPT09IDEgfHwgYiA9PT0gMDtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGFuIGludGVnZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNJbnRlZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgYml0Rmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpID4gdGhpcy5jLmxlbmd0aCAtIDI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0xlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAtMSB8fCBiID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBOYU4sIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNOYU4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5zO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc05lZ2F0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgcG9zaXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNQb3NpdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucyA+IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIDAgb3IgLTAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgdGhpcy5jWzBdID09IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gLSAwID0gblxyXG4gICAgICogIG4gLSBOID0gTlxyXG4gICAgICogIG4gLSBJID0gLUlcclxuICAgICAqICAwIC0gbiA9IC1uXHJcbiAgICAgKiAgMCAtIDAgPSAwXHJcbiAgICAgKiAgMCAtIE4gPSBOXHJcbiAgICAgKiAgMCAtIEkgPSAtSVxyXG4gICAgICogIE4gLSBuID0gTlxyXG4gICAgICogIE4gLSAwID0gTlxyXG4gICAgICogIE4gLSBOID0gTlxyXG4gICAgICogIE4gLSBJID0gTlxyXG4gICAgICogIEkgLSBuID0gSVxyXG4gICAgICogIEkgLSAwID0gSVxyXG4gICAgICogIEkgLSBOID0gTlxyXG4gICAgICogIEkgLSBJID0gTlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG1pbnVzIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLm1pbnVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGksIGosIHQsIHhMVHksXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYSA9IHgucztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgICBiID0geS5zO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTj9cclxuICAgICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgICBpZiAoYSAhPSBiKSB7XHJcbiAgICAgICAgeS5zID0gLWI7XHJcbiAgICAgICAgcmV0dXJuIHgucGx1cyh5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHhlID0geC5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9IHkuYztcclxuXHJcbiAgICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBJbmZpbml0eT9cclxuICAgICAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIHhjID8gKHkucyA9IC1iLCB5KSA6IG5ldyBCaWdOdW1iZXIoeWMgPyB4IDogTmFOKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLCB4IGlmIHggaXMgbm9uLXplcm8sIG9yIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgICAgIHJldHVybiB5Y1swXSA/ICh5LnMgPSAtYiwgeSkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6XHJcblxyXG4gICAgICAgICAgIC8vIElFRUUgNzU0ICgyMDA4KSA2LjM6IG4gLSBuID0gLTAgd2hlbiByb3VuZGluZyB0byAtSW5maW5pdHlcclxuICAgICAgICAgICBST1VORElOR19NT0RFID09IDMgPyAtMCA6IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG5cclxuICAgICAgICBpZiAoeExUeSA9IGEgPCAwKSB7XHJcbiAgICAgICAgICBhID0gLWE7XHJcbiAgICAgICAgICB0ID0geGM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHllID0geGU7XHJcbiAgICAgICAgICB0ID0geWM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuXHJcbiAgICAgICAgZm9yIChiID0gYTsgYi0tOyB0LnB1c2goMCkpO1xyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudHMgZXF1YWwuIENoZWNrIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgICAgIGogPSAoeExUeSA9IChhID0geGMubGVuZ3RoKSA8IChiID0geWMubGVuZ3RoKSkgPyBhIDogYjtcclxuXHJcbiAgICAgICAgZm9yIChhID0gYiA9IDA7IGIgPCBqOyBiKyspIHtcclxuXHJcbiAgICAgICAgICBpZiAoeGNbYl0gIT0geWNbYl0pIHtcclxuICAgICAgICAgICAgeExUeSA9IHhjW2JdIDwgeWNbYl07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8geCA8IHk/IFBvaW50IHhjIHRvIHRoZSBhcnJheSBvZiB0aGUgYmlnZ2VyIG51bWJlci5cclxuICAgICAgaWYgKHhMVHkpIHQgPSB4YywgeGMgPSB5YywgeWMgPSB0LCB5LnMgPSAteS5zO1xyXG5cclxuICAgICAgYiA9IChqID0geWMubGVuZ3RoKSAtIChpID0geGMubGVuZ3RoKTtcclxuXHJcbiAgICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4YyBpZiBzaG9ydGVyLlxyXG4gICAgICAvLyBObyBuZWVkIHRvIGFkZCB6ZXJvcyB0byB5YyBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0IG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWMubGVuZ3RoLlxyXG4gICAgICBpZiAoYiA+IDApIGZvciAoOyBiLS07IHhjW2krK10gPSAwKTtcclxuICAgICAgYiA9IEJBU0UgLSAxO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgeWMgZnJvbSB4Yy5cclxuICAgICAgZm9yICg7IGogPiBhOykge1xyXG5cclxuICAgICAgICBpZiAoeGNbLS1qXSA8IHljW2pdKSB7XHJcbiAgICAgICAgICBmb3IgKGkgPSBqOyBpICYmICF4Y1stLWldOyB4Y1tpXSA9IGIpO1xyXG4gICAgICAgICAgLS14Y1tpXTtcclxuICAgICAgICAgIHhjW2pdICs9IEJBU0U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4Y1tqXSAtPSB5Y1tqXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MgYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgICAgZm9yICg7IHhjWzBdID09IDA7IHhjLnNwbGljZSgwLCAxKSwgLS15ZSk7XHJcblxyXG4gICAgICAvLyBaZXJvP1xyXG4gICAgICBpZiAoIXhjWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIEZvbGxvd2luZyBJRUVFIDc1NCAoMjAwOCkgNi4zLFxyXG4gICAgICAgIC8vIG4gLSBuID0gKzAgIGJ1dCAgbiAtIG4gPSAtMCAgd2hlbiByb3VuZGluZyB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgICB5LnMgPSBST1VORElOR19NT0RFID09IDMgPyAtMSA6IDE7XHJcbiAgICAgICAgeS5jID0gW3kuZSA9IDBdO1xyXG4gICAgICAgIHJldHVybiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciBJbmZpbml0eSBhcyAreCAtICt5ICE9IEluZmluaXR5ICYmIC14IC0gLXkgIT0gSW5maW5pdHlcclxuICAgICAgLy8gZm9yIGZpbml0ZSB4IGFuZCB5LlxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHhjLCB5ZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogICBuICUgMCA9ICBOXHJcbiAgICAgKiAgIG4gJSBOID0gIE5cclxuICAgICAqICAgbiAlIEkgPSAgblxyXG4gICAgICogICAwICUgbiA9ICAwXHJcbiAgICAgKiAgLTAgJSBuID0gLTBcclxuICAgICAqICAgMCAlIDAgPSAgTlxyXG4gICAgICogICAwICUgTiA9ICBOXHJcbiAgICAgKiAgIDAgJSBJID0gIDBcclxuICAgICAqICAgTiAlIG4gPSAgTlxyXG4gICAgICogICBOICUgMCA9ICBOXHJcbiAgICAgKiAgIE4gJSBOID0gIE5cclxuICAgICAqICAgTiAlIEkgPSAgTlxyXG4gICAgICogICBJICUgbiA9ICBOXHJcbiAgICAgKiAgIEkgJSAwID0gIE5cclxuICAgICAqICAgSSAlIE4gPSAgTlxyXG4gICAgICogICBJICUgSSA9ICBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbW9kdWxvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLiBUaGUgcmVzdWx0IGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIE1PRFVMT19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLm1vZHVsbyA9IFAubW9kID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIHEsIHMsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiBOYU4gaWYgeCBpcyBJbmZpbml0eSBvciBOYU4sIG9yIHkgaXMgTmFOIG9yIHplcm8uXHJcbiAgICAgIGlmICgheC5jIHx8ICF5LnMgfHwgeS5jICYmICF5LmNbMF0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyBJbmZpbml0eSBvciB4IGlzIHplcm8uXHJcbiAgICAgIH0gZWxzZSBpZiAoIXkuYyB8fCB4LmMgJiYgIXguY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoTU9EVUxPX01PREUgPT0gOSkge1xyXG5cclxuICAgICAgICAvLyBFdWNsaWRpYW4gZGl2aXNpb246IHEgPSBzaWduKHkpICogZmxvb3IoeCAvIGFicyh5KSlcclxuICAgICAgICAvLyByID0geCAtIHF5ICAgIHdoZXJlICAwIDw9IHIgPCBhYnMoeSlcclxuICAgICAgICBzID0geS5zO1xyXG4gICAgICAgIHkucyA9IDE7XHJcbiAgICAgICAgcSA9IGRpdih4LCB5LCAwLCAzKTtcclxuICAgICAgICB5LnMgPSBzO1xyXG4gICAgICAgIHEucyAqPSBzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHEgPSBkaXYoeCwgeSwgMCwgTU9EVUxPX01PREUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5ID0geC5taW51cyhxLnRpbWVzKHkpKTtcclxuXHJcbiAgICAgIC8vIFRvIG1hdGNoIEphdmFTY3JpcHQgJSwgZW5zdXJlIHNpZ24gb2YgemVybyBpcyBzaWduIG9mIGRpdmlkZW5kLlxyXG4gICAgICBpZiAoIXkuY1swXSAmJiBNT0RVTE9fTU9ERSA9PSAxKSB5LnMgPSB4LnM7XHJcblxyXG4gICAgICByZXR1cm4geTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAqIDAgPSAwXHJcbiAgICAgKiAgbiAqIE4gPSBOXHJcbiAgICAgKiAgbiAqIEkgPSBJXHJcbiAgICAgKiAgMCAqIG4gPSAwXHJcbiAgICAgKiAgMCAqIDAgPSAwXHJcbiAgICAgKiAgMCAqIE4gPSBOXHJcbiAgICAgKiAgMCAqIEkgPSBOXHJcbiAgICAgKiAgTiAqIG4gPSBOXHJcbiAgICAgKiAgTiAqIDAgPSBOXHJcbiAgICAgKiAgTiAqIE4gPSBOXHJcbiAgICAgKiAgTiAqIEkgPSBOXHJcbiAgICAgKiAgSSAqIG4gPSBJXHJcbiAgICAgKiAgSSAqIDAgPSBOXHJcbiAgICAgKiAgSSAqIE4gPSBOXHJcbiAgICAgKiAgSSAqIEkgPSBJXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbXVsdGlwbGllZCBieSB0aGUgdmFsdWVcclxuICAgICAqIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5tdWx0aXBsaWVkQnkgPSBQLnRpbWVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGMsIGUsIGksIGosIGssIG0sIHhjTCwgeGxvLCB4aGksIHljTCwgeWxvLCB5aGksIHpjLFxyXG4gICAgICAgIGJhc2UsIHNxcnRCYXNlLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0gKHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpKS5jO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTiwgwrFJbmZpbml0eSBvciDCsTA/XHJcbiAgICAgIGlmICgheGMgfHwgIXljIHx8ICF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgaXMgTmFOLCBvciBvbmUgaXMgMCBhbmQgdGhlIG90aGVyIGlzIEluZmluaXR5LlxyXG4gICAgICAgIGlmICgheC5zIHx8ICF5LnMgfHwgeGMgJiYgIXhjWzBdICYmICF5YyB8fCB5YyAmJiAheWNbMF0gJiYgIXhjKSB7XHJcbiAgICAgICAgICB5LmMgPSB5LmUgPSB5LnMgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5LnMgKj0geC5zO1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiDCsUluZmluaXR5IGlmIGVpdGhlciBpcyDCsUluZmluaXR5LlxyXG4gICAgICAgICAgaWYgKCF4YyB8fCAheWMpIHtcclxuICAgICAgICAgICAgeS5jID0geS5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gwrEwIGlmIGVpdGhlciBpcyDCsTAuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5LmMgPSBbMF07XHJcbiAgICAgICAgICAgIHkuZSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZSA9IGJpdEZsb29yKHguZSAvIExPR19CQVNFKSArIGJpdEZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuICAgICAgeS5zICo9IHgucztcclxuICAgICAgeGNMID0geGMubGVuZ3RoO1xyXG4gICAgICB5Y0wgPSB5Yy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBFbnN1cmUgeGMgcG9pbnRzIHRvIGxvbmdlciBhcnJheSBhbmQgeGNMIHRvIGl0cyBsZW5ndGguXHJcbiAgICAgIGlmICh4Y0wgPCB5Y0wpIHpjID0geGMsIHhjID0geWMsIHljID0gemMsIGkgPSB4Y0wsIHhjTCA9IHljTCwgeWNMID0gaTtcclxuXHJcbiAgICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgICBmb3IgKGkgPSB4Y0wgKyB5Y0wsIHpjID0gW107IGktLTsgemMucHVzaCgwKSk7XHJcblxyXG4gICAgICBiYXNlID0gQkFTRTtcclxuICAgICAgc3FydEJhc2UgPSBTUVJUX0JBU0U7XHJcblxyXG4gICAgICBmb3IgKGkgPSB5Y0w7IC0taSA+PSAwOykge1xyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgICAgIHlsbyA9IHljW2ldICUgc3FydEJhc2U7XHJcbiAgICAgICAgeWhpID0geWNbaV0gLyBzcXJ0QmFzZSB8IDA7XHJcblxyXG4gICAgICAgIGZvciAoayA9IHhjTCwgaiA9IGkgKyBrOyBqID4gaTspIHtcclxuICAgICAgICAgIHhsbyA9IHhjWy0ta10gJSBzcXJ0QmFzZTtcclxuICAgICAgICAgIHhoaSA9IHhjW2tdIC8gc3FydEJhc2UgfCAwO1xyXG4gICAgICAgICAgbSA9IHloaSAqIHhsbyArIHhoaSAqIHlsbztcclxuICAgICAgICAgIHhsbyA9IHlsbyAqIHhsbyArICgobSAlIHNxcnRCYXNlKSAqIHNxcnRCYXNlKSArIHpjW2pdICsgYztcclxuICAgICAgICAgIGMgPSAoeGxvIC8gYmFzZSB8IDApICsgKG0gLyBzcXJ0QmFzZSB8IDApICsgeWhpICogeGhpO1xyXG4gICAgICAgICAgemNbai0tXSA9IHhsbyAlIGJhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6Y1tqXSA9IGM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjKSB7XHJcbiAgICAgICAgKytlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHpjLnNwbGljZSgwLCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB6YywgZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbmVnYXRlZCxcclxuICAgICAqIGkuZS4gbXVsdGlwbGllZCBieSAtMS5cclxuICAgICAqL1xyXG4gICAgUC5uZWdhdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIHgucyA9IC14LnMgfHwgbnVsbDtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gKyAwID0gblxyXG4gICAgICogIG4gKyBOID0gTlxyXG4gICAgICogIG4gKyBJID0gSVxyXG4gICAgICogIDAgKyBuID0gblxyXG4gICAgICogIDAgKyAwID0gMFxyXG4gICAgICogIDAgKyBOID0gTlxyXG4gICAgICogIDAgKyBJID0gSVxyXG4gICAgICogIE4gKyBuID0gTlxyXG4gICAgICogIE4gKyAwID0gTlxyXG4gICAgICogIE4gKyBOID0gTlxyXG4gICAgICogIE4gKyBJID0gTlxyXG4gICAgICogIEkgKyBuID0gSVxyXG4gICAgICogIEkgKyAwID0gSVxyXG4gICAgICogIEkgKyBOID0gTlxyXG4gICAgICogIEkgKyBJID0gSVxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHBsdXMgdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAucGx1cyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHZhciB0LFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIGEgPSB4LnM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuICAgICAgYiA9IHkucztcclxuXHJcbiAgICAgIC8vIEVpdGhlciBOYU4/XHJcbiAgICAgIGlmICghYSB8fCAhYikgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgICAgIGlmIChhICE9IGIpIHtcclxuICAgICAgICB5LnMgPSAtYjtcclxuICAgICAgICByZXR1cm4geC5taW51cyh5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHhlID0geC5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9IHkuYztcclxuXHJcbiAgICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiDCsUluZmluaXR5IGlmIGVpdGhlciDCsUluZmluaXR5LlxyXG4gICAgICAgIGlmICgheGMgfHwgIXljKSByZXR1cm4gbmV3IEJpZ051bWJlcihhIC8gMCk7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciB6ZXJvP1xyXG4gICAgICAgIC8vIFJldHVybiB5IGlmIHkgaXMgbm9uLXplcm8sIHggaWYgeCBpcyBub24temVybywgb3IgemVybyBpZiBib3RoIGFyZSB6ZXJvLlxyXG4gICAgICAgIGlmICgheGNbMF0gfHwgIXljWzBdKSByZXR1cm4geWNbMF0gPyB5IDogbmV3IEJpZ051bWJlcih4Y1swXSA/IHggOiBhICogMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhlID0gYml0Rmxvb3IoeGUpO1xyXG4gICAgICB5ZSA9IGJpdEZsb29yKHllKTtcclxuICAgICAgeGMgPSB4Yy5zbGljZSgpO1xyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuIEZhc3RlciB0byB1c2UgcmV2ZXJzZSB0aGVuIGRvIHVuc2hpZnRzLlxyXG4gICAgICBpZiAoYSA9IHhlIC0geWUpIHtcclxuICAgICAgICBpZiAoYSA+IDApIHtcclxuICAgICAgICAgIHllID0geGU7XHJcbiAgICAgICAgICB0ID0geWM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGEgPSAtYTtcclxuICAgICAgICAgIHQgPSB4YztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG4gICAgICAgIGZvciAoOyBhLS07IHQucHVzaCgwKSk7XHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGEgPSB4Yy5sZW5ndGg7XHJcbiAgICAgIGIgPSB5Yy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBQb2ludCB4YyB0byB0aGUgbG9uZ2VyIGFycmF5LCBhbmQgYiB0byB0aGUgc2hvcnRlciBsZW5ndGguXHJcbiAgICAgIGlmIChhIC0gYiA8IDApIHQgPSB5YywgeWMgPSB4YywgeGMgPSB0LCBiID0gYTtcclxuXHJcbiAgICAgIC8vIE9ubHkgc3RhcnQgYWRkaW5nIGF0IHljLmxlbmd0aCAtIDEgYXMgdGhlIGZ1cnRoZXIgZGlnaXRzIG9mIHhjIGNhbiBiZSBpZ25vcmVkLlxyXG4gICAgICBmb3IgKGEgPSAwOyBiOykge1xyXG4gICAgICAgIGEgPSAoeGNbLS1iXSA9IHhjW2JdICsgeWNbYl0gKyBhKSAvIEJBU0UgfCAwO1xyXG4gICAgICAgIHhjW2JdID0gQkFTRSA9PT0geGNbYl0gPyAwIDogeGNbYl0gJSBCQVNFO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYSkge1xyXG4gICAgICAgIHhjID0gW2FdLmNvbmNhdCh4Yyk7XHJcbiAgICAgICAgKyt5ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTm8gbmVlZCB0byBjaGVjayBmb3IgemVybywgYXMgK3ggKyAreSAhPSAwICYmIC14ICsgLXkgIT0gMFxyXG4gICAgICAvLyB5ZSA9IE1BWF9FWFAgKyAxIHBvc3NpYmxlXHJcbiAgICAgIHJldHVybiBub3JtYWxpc2UoeSwgeGMsIHllKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJZiBzZCBpcyB1bmRlZmluZWQgb3IgbnVsbCBvciB0cnVlIG9yIGZhbHNlLCByZXR1cm4gdGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2ZcclxuICAgICAqIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciwgb3IgbnVsbCBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgwrFJbmZpbml0eSBvciBOYU4uXHJcbiAgICAgKiBJZiBzZCBpcyB0cnVlIGluY2x1ZGUgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zIGluIHRoZSBjb3VudC5cclxuICAgICAqXHJcbiAgICAgKiBPdGhlcndpc2UsIGlmIHNkIGlzIGEgbnVtYmVyLCByZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzXHJcbiAgICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2Ygc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yXHJcbiAgICAgKiBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogc2Qge251bWJlcnxib29sZWFufSBudW1iZXI6IHNpZ25pZmljYW50IGRpZ2l0czogaW50ZWdlciwgMSB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICBib29sZWFuOiB3aGV0aGVyIHRvIGNvdW50IGludGVnZXItcGFydCB0cmFpbGluZyB6ZXJvczogdHJ1ZSBvciBmYWxzZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3NkfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgICB2YXIgYywgbiwgdixcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChzZCAhPSBudWxsICYmIHNkICE9PSAhIXNkKSB7XHJcbiAgICAgICAgaW50Q2hlY2soc2QsIDEsIE1BWCk7XHJcbiAgICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdW5kKG5ldyBCaWdOdW1iZXIoeCksIHNkLCBybSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghKGMgPSB4LmMpKSByZXR1cm4gbnVsbDtcclxuICAgICAgdiA9IGMubGVuZ3RoIC0gMTtcclxuICAgICAgbiA9IHYgKiBMT0dfQkFTRSArIDE7XHJcblxyXG4gICAgICBpZiAodiA9IGNbdl0pIHtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCBlbGVtZW50LlxyXG4gICAgICAgIGZvciAoOyB2ICUgMTAgPT0gMDsgdiAvPSAxMCwgbi0tKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50LlxyXG4gICAgICAgIGZvciAodiA9IGNbMF07IHYgPj0gMTA7IHYgLz0gMTAsIG4rKyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZCAmJiB4LmUgKyAxID4gbikgbiA9IHguZSArIDE7XHJcblxyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBzaGlmdGVkIGJ5IGsgcGxhY2VzXHJcbiAgICAgKiAocG93ZXJzIG9mIDEwKS4gU2hpZnQgdG8gdGhlIHJpZ2h0IGlmIG4gPiAwLCBhbmQgdG8gdGhlIGxlZnQgaWYgbiA8IDAuXHJcbiAgICAgKlxyXG4gICAgICogayB7bnVtYmVyfSBJbnRlZ2VyLCAtTUFYX1NBRkVfSU5URUdFUiB0byBNQVhfU0FGRV9JTlRFR0VSIGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2t9J1xyXG4gICAgICovXHJcbiAgICBQLnNoaWZ0ZWRCeSA9IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgIGludENoZWNrKGssIC1NQVhfU0FGRV9JTlRFR0VSLCBNQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgICAgcmV0dXJuIHRoaXMudGltZXMoJzFlJyArIGspO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBzcXJ0KC1uKSA9ICBOXHJcbiAgICAgKiAgc3FydChOKSA9ICBOXHJcbiAgICAgKiAgc3FydCgtSSkgPSAgTlxyXG4gICAgICogIHNxcnQoSSkgPSAgSVxyXG4gICAgICogIHNxcnQoMCkgPSAgMFxyXG4gICAgICogIHNxcnQoLTApID0gLTBcclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsXHJcbiAgICAgKiByb3VuZGVkIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqL1xyXG4gICAgUC5zcXVhcmVSb290ID0gUC5zcXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgbSwgbiwgciwgcmVwLCB0LFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIGMgPSB4LmMsXHJcbiAgICAgICAgcyA9IHgucyxcclxuICAgICAgICBlID0geC5lLFxyXG4gICAgICAgIGRwID0gREVDSU1BTF9QTEFDRVMgKyA0LFxyXG4gICAgICAgIGhhbGYgPSBuZXcgQmlnTnVtYmVyKCcwLjUnKTtcclxuXHJcbiAgICAgIC8vIE5lZ2F0aXZlL05hTi9JbmZpbml0eS96ZXJvP1xyXG4gICAgICBpZiAocyAhPT0gMSB8fCAhYyB8fCAhY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKCFzIHx8IHMgPCAwICYmICghYyB8fCBjWzBdKSA/IE5hTiA6IGMgPyB4IDogMSAvIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJbml0aWFsIGVzdGltYXRlLlxyXG4gICAgICBzID0gTWF0aC5zcXJ0KCt2YWx1ZU9mKHgpKTtcclxuXHJcbiAgICAgIC8vIE1hdGguc3FydCB1bmRlcmZsb3cvb3ZlcmZsb3c/XHJcbiAgICAgIC8vIFBhc3MgeCB0byBNYXRoLnNxcnQgYXMgaW50ZWdlciwgdGhlbiBhZGp1c3QgdGhlIGV4cG9uZW50IG9mIHRoZSByZXN1bHQuXHJcbiAgICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICAgIG4gPSBjb2VmZlRvU3RyaW5nKGMpO1xyXG4gICAgICAgIGlmICgobi5sZW5ndGggKyBlKSAlIDIgPT0gMCkgbiArPSAnMCc7XHJcbiAgICAgICAgcyA9IE1hdGguc3FydCgrbik7XHJcbiAgICAgICAgZSA9IGJpdEZsb29yKChlICsgMSkgLyAyKSAtIChlIDwgMCB8fCBlICUgMik7XHJcblxyXG4gICAgICAgIGlmIChzID09IDEgLyAwKSB7XHJcbiAgICAgICAgICBuID0gJzFlJyArIGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG4gPSBzLnRvRXhwb25lbnRpYWwoKTtcclxuICAgICAgICAgIG4gPSBuLnNsaWNlKDAsIG4uaW5kZXhPZignZScpICsgMSkgKyBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgciA9IG5ldyBCaWdOdW1iZXIobik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgciA9IG5ldyBCaWdOdW1iZXIocyArICcnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgZm9yIHplcm8uXHJcbiAgICAgIC8vIHIgY291bGQgYmUgemVybyBpZiBNSU5fRVhQIGlzIGNoYW5nZWQgYWZ0ZXIgdGhlIHRoaXMgdmFsdWUgd2FzIGNyZWF0ZWQuXHJcbiAgICAgIC8vIFRoaXMgd291bGQgY2F1c2UgYSBkaXZpc2lvbiBieSB6ZXJvICh4L3QpIGFuZCBoZW5jZSBJbmZpbml0eSBiZWxvdywgd2hpY2ggd291bGQgY2F1c2VcclxuICAgICAgLy8gY29lZmZUb1N0cmluZyB0byB0aHJvdy5cclxuICAgICAgaWYgKHIuY1swXSkge1xyXG4gICAgICAgIGUgPSByLmU7XHJcbiAgICAgICAgcyA9IGUgKyBkcDtcclxuICAgICAgICBpZiAocyA8IDMpIHMgPSAwO1xyXG5cclxuICAgICAgICAvLyBOZXd0b24tUmFwaHNvbiBpdGVyYXRpb24uXHJcbiAgICAgICAgZm9yICg7IDspIHtcclxuICAgICAgICAgIHQgPSByO1xyXG4gICAgICAgICAgciA9IGhhbGYudGltZXModC5wbHVzKGRpdih4LCB0LCBkcCwgMSkpKTtcclxuXHJcbiAgICAgICAgICBpZiAoY29lZmZUb1N0cmluZyh0LmMpLnNsaWNlKDAsIHMpID09PSAobiA9IGNvZWZmVG9TdHJpbmcoci5jKSkuc2xpY2UoMCwgcykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBleHBvbmVudCBvZiByIG1heSBoZXJlIGJlIG9uZSBsZXNzIHRoYW4gdGhlIGZpbmFsIHJlc3VsdCBleHBvbmVudCxcclxuICAgICAgICAgICAgLy8gZS5nIDAuMDAwOTk5OSAoZS00KSAtLT4gMC4wMDEgKGUtMyksIHNvIGFkanVzdCBzIHNvIHRoZSByb3VuZGluZyBkaWdpdHNcclxuICAgICAgICAgICAgLy8gYXJlIGluZGV4ZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICBpZiAoci5lIDwgZSkgLS1zO1xyXG4gICAgICAgICAgICBuID0gbi5zbGljZShzIC0gMywgcyArIDEpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlIDR0aCByb3VuZGluZyBkaWdpdCBtYXkgYmUgaW4gZXJyb3IgYnkgLTEgc28gaWYgdGhlIDQgcm91bmRpbmcgZGlnaXRzXHJcbiAgICAgICAgICAgIC8vIGFyZSA5OTk5IG9yIDQ5OTkgKGkuZS4gYXBwcm9hY2hpbmcgYSByb3VuZGluZyBib3VuZGFyeSkgY29udGludWUgdGhlXHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGlvbi5cclxuICAgICAgICAgICAgaWYgKG4gPT0gJzk5OTknIHx8ICFyZXAgJiYgbiA9PSAnNDk5OScpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gT24gdGhlIGZpcnN0IGl0ZXJhdGlvbiBvbmx5LCBjaGVjayB0byBzZWUgaWYgcm91bmRpbmcgdXAgZ2l2ZXMgdGhlXHJcbiAgICAgICAgICAgICAgLy8gZXhhY3QgcmVzdWx0IGFzIHRoZSBuaW5lcyBtYXkgaW5maW5pdGVseSByZXBlYXQuXHJcbiAgICAgICAgICAgICAgaWYgKCFyZXApIHtcclxuICAgICAgICAgICAgICAgIHJvdW5kKHQsIHQuZSArIERFQ0lNQUxfUExBQ0VTICsgMiwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHQudGltZXModCkuZXEoeCkpIHtcclxuICAgICAgICAgICAgICAgICAgciA9IHQ7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgZHAgKz0gNDtcclxuICAgICAgICAgICAgICBzICs9IDQ7XHJcbiAgICAgICAgICAgICAgcmVwID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgcm91bmRpbmcgZGlnaXRzIGFyZSBudWxsLCAwezAsNH0gb3IgNTB7MCwzfSwgY2hlY2sgZm9yIGV4YWN0XHJcbiAgICAgICAgICAgICAgLy8gcmVzdWx0LiBJZiBub3QsIHRoZW4gdGhlcmUgYXJlIGZ1cnRoZXIgZGlnaXRzIGFuZCBtIHdpbGwgYmUgdHJ1dGh5LlxyXG4gICAgICAgICAgICAgIGlmICghK24gfHwgIStuLnNsaWNlKDEpICYmIG4uY2hhckF0KDApID09ICc1Jykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRydW5jYXRlIHRvIHRoZSBmaXJzdCByb3VuZGluZyBkaWdpdC5cclxuICAgICAgICAgICAgICAgIHJvdW5kKHIsIHIuZSArIERFQ0lNQUxfUExBQ0VTICsgMiwgMSk7XHJcbiAgICAgICAgICAgICAgICBtID0gIXIudGltZXMocikuZXEoeCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJvdW5kKHIsIHIuZSArIERFQ0lNQUxfUExBQ0VTICsgMSwgUk9VTkRJTkdfTU9ERSwgbSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZXhwb25lbnRpYWwgbm90YXRpb24gYW5kXHJcbiAgICAgKiByb3VuZGVkIHVzaW5nIFJPVU5ESU5HX01PREUgdG8gZHAgZml4ZWQgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnRvRXhwb25lbnRpYWwgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICAgIGlmIChkcCAhPSBudWxsKSB7XHJcbiAgICAgICAgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcbiAgICAgICAgZHArKztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGRwLCBybSwgMSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24gcm91bmRpbmdcclxuICAgICAqIHRvIGRwIGZpeGVkIGRlY2ltYWwgcGxhY2VzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBOb3RlOiBhcyB3aXRoIEphdmFTY3JpcHQncyBudW1iZXIgdHlwZSwgKC0wKS50b0ZpeGVkKDApIGlzICcwJyxcclxuICAgICAqIGJ1dCBlLmcuICgtMC4wMDAwMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b0ZpeGVkID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICAgIGludENoZWNrKGRwLCAwLCBNQVgpO1xyXG4gICAgICAgIGRwID0gZHAgKyB0aGlzLmUgKyAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmb3JtYXQodGhpcywgZHAsIHJtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiByb3VuZGVkXHJcbiAgICAgKiB1c2luZyBybSBvciBST1VORElOR19NT0RFIHRvIGRwIGRlY2ltYWwgcGxhY2VzLCBhbmQgZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgcHJvcGVydGllc1xyXG4gICAgICogb2YgdGhlIGZvcm1hdCBvciBGT1JNQVQgb2JqZWN0IChzZWUgQmlnTnVtYmVyLnNldCkuXHJcbiAgICAgKlxyXG4gICAgICogVGhlIGZvcm1hdHRpbmcgb2JqZWN0IG1heSBjb250YWluIHNvbWUgb3IgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIHNob3duIGJlbG93LlxyXG4gICAgICpcclxuICAgICAqIEZPUk1BVCA9IHtcclxuICAgICAqICAgcHJlZml4OiAnJyxcclxuICAgICAqICAgZ3JvdXBTaXplOiAzLFxyXG4gICAgICogICBzZWNvbmRhcnlHcm91cFNpemU6IDAsXHJcbiAgICAgKiAgIGdyb3VwU2VwYXJhdG9yOiAnLCcsXHJcbiAgICAgKiAgIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcclxuICAgICAqICAgZnJhY3Rpb25Hcm91cFNpemU6IDAsXHJcbiAgICAgKiAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3I6ICdcXHhBMCcsICAgICAgLy8gbm9uLWJyZWFraW5nIHNwYWNlXHJcbiAgICAgKiAgIHN1ZmZpeDogJydcclxuICAgICAqIH07XHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICogW2Zvcm1hdF0ge29iamVjdH0gRm9ybWF0dGluZyBvcHRpb25zLiBTZWUgRk9STUFUIHBiamVjdCBhYm92ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCBub3QgYW4gb2JqZWN0OiB7Zm9ybWF0fSdcclxuICAgICAqL1xyXG4gICAgUC50b0Zvcm1hdCA9IGZ1bmN0aW9uIChkcCwgcm0sIGZvcm1hdCkge1xyXG4gICAgICB2YXIgc3RyLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGRwICE9IG51bGwgJiYgcm0gJiYgdHlwZW9mIHJtID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBybTtcclxuICAgICAgICAgIHJtID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKGRwICYmIHR5cGVvZiBkcCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgZm9ybWF0ID0gZHA7XHJcbiAgICAgICAgICBkcCA9IHJtID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRk9STUFUO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm9ybWF0ICE9ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdBcmd1bWVudCBub3QgYW4gb2JqZWN0OiAnICsgZm9ybWF0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RyID0geC50b0ZpeGVkKGRwLCBybSk7XHJcblxyXG4gICAgICBpZiAoeC5jKSB7XHJcbiAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICBhcnIgPSBzdHIuc3BsaXQoJy4nKSxcclxuICAgICAgICAgIGcxID0gK2Zvcm1hdC5ncm91cFNpemUsXHJcbiAgICAgICAgICBnMiA9ICtmb3JtYXQuc2Vjb25kYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgICAgZ3JvdXBTZXBhcmF0b3IgPSBmb3JtYXQuZ3JvdXBTZXBhcmF0b3IgfHwgJycsXHJcbiAgICAgICAgICBpbnRQYXJ0ID0gYXJyWzBdLFxyXG4gICAgICAgICAgZnJhY3Rpb25QYXJ0ID0gYXJyWzFdLFxyXG4gICAgICAgICAgaXNOZWcgPSB4LnMgPCAwLFxyXG4gICAgICAgICAgaW50RGlnaXRzID0gaXNOZWcgPyBpbnRQYXJ0LnNsaWNlKDEpIDogaW50UGFydCxcclxuICAgICAgICAgIGxlbiA9IGludERpZ2l0cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChnMikgaSA9IGcxLCBnMSA9IGcyLCBnMiA9IGksIGxlbiAtPSBpO1xyXG5cclxuICAgICAgICBpZiAoZzEgPiAwICYmIGxlbiA+IDApIHtcclxuICAgICAgICAgIGkgPSBsZW4gJSBnMSB8fCBnMTtcclxuICAgICAgICAgIGludFBhcnQgPSBpbnREaWdpdHMuc3Vic3RyKDAsIGkpO1xyXG4gICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkgKz0gZzEpIGludFBhcnQgKz0gZ3JvdXBTZXBhcmF0b3IgKyBpbnREaWdpdHMuc3Vic3RyKGksIGcxKTtcclxuICAgICAgICAgIGlmIChnMiA+IDApIGludFBhcnQgKz0gZ3JvdXBTZXBhcmF0b3IgKyBpbnREaWdpdHMuc2xpY2UoaSk7XHJcbiAgICAgICAgICBpZiAoaXNOZWcpIGludFBhcnQgPSAnLScgKyBpbnRQYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RyID0gZnJhY3Rpb25QYXJ0XHJcbiAgICAgICAgID8gaW50UGFydCArIChmb3JtYXQuZGVjaW1hbFNlcGFyYXRvciB8fCAnJykgKyAoKGcyID0gK2Zvcm1hdC5mcmFjdGlvbkdyb3VwU2l6ZSlcclxuICAgICAgICAgID8gZnJhY3Rpb25QYXJ0LnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXGR7JyArIGcyICsgJ31cXFxcQicsICdnJyksXHJcbiAgICAgICAgICAgJyQmJyArIChmb3JtYXQuZnJhY3Rpb25Hcm91cFNlcGFyYXRvciB8fCAnJykpXHJcbiAgICAgICAgICA6IGZyYWN0aW9uUGFydClcclxuICAgICAgICAgOiBpbnRQYXJ0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKGZvcm1hdC5wcmVmaXggfHwgJycpICsgc3RyICsgKGZvcm1hdC5zdWZmaXggfHwgJycpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhbiBhcnJheSBvZiB0d28gQmlnTnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGFzIGEgc2ltcGxlXHJcbiAgICAgKiBmcmFjdGlvbiB3aXRoIGFuIGludGVnZXIgbnVtZXJhdG9yIGFuZCBhbiBpbnRlZ2VyIGRlbm9taW5hdG9yLlxyXG4gICAgICogVGhlIGRlbm9taW5hdG9yIHdpbGwgYmUgYSBwb3NpdGl2ZSBub24temVybyB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNwZWNpZmllZFxyXG4gICAgICogbWF4aW11bSBkZW5vbWluYXRvci4gSWYgYSBtYXhpbXVtIGRlbm9taW5hdG9yIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBkZW5vbWluYXRvciB3aWxsIGJlXHJcbiAgICAgKiB0aGUgbG93ZXN0IHZhbHVlIG5lY2Vzc2FyeSB0byByZXByZXNlbnQgdGhlIG51bWJlciBleGFjdGx5LlxyXG4gICAgICpcclxuICAgICAqIFttZF0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBJbnRlZ2VyID49IDEsIG9yIEluZmluaXR5LiBUaGUgbWF4aW11bSBkZW5vbWluYXRvci5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX0gOiB7bWR9J1xyXG4gICAgICovXHJcbiAgICBQLnRvRnJhY3Rpb24gPSBmdW5jdGlvbiAobWQpIHtcclxuICAgICAgdmFyIGQsIGQwLCBkMSwgZDIsIGUsIGV4cCwgbiwgbjAsIG4xLCBxLCByLCBzLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jO1xyXG5cclxuICAgICAgaWYgKG1kICE9IG51bGwpIHtcclxuICAgICAgICBuID0gbmV3IEJpZ051bWJlcihtZCk7XHJcblxyXG4gICAgICAgIC8vIFRocm93IGlmIG1kIGlzIGxlc3MgdGhhbiBvbmUgb3IgaXMgbm90IGFuIGludGVnZXIsIHVubGVzcyBpdCBpcyBJbmZpbml0eS5cclxuICAgICAgICBpZiAoIW4uaXNJbnRlZ2VyKCkgJiYgKG4uYyB8fCBuLnMgIT09IDEpIHx8IG4ubHQoT05FKSkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0FyZ3VtZW50ICcgK1xyXG4gICAgICAgICAgICAgIChuLmlzSW50ZWdlcigpID8gJ291dCBvZiByYW5nZTogJyA6ICdub3QgYW4gaW50ZWdlcjogJykgKyB2YWx1ZU9mKG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgheGMpIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG5cclxuICAgICAgZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgbjEgPSBkMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgZDEgPSBuMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgcyA9IGNvZWZmVG9TdHJpbmcoeGMpO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGluaXRpYWwgZGVub21pbmF0b3IuXHJcbiAgICAgIC8vIGQgaXMgYSBwb3dlciBvZiAxMCBhbmQgdGhlIG1pbmltdW0gbWF4IGRlbm9taW5hdG9yIHRoYXQgc3BlY2lmaWVzIHRoZSB2YWx1ZSBleGFjdGx5LlxyXG4gICAgICBlID0gZC5lID0gcy5sZW5ndGggLSB4LmUgLSAxO1xyXG4gICAgICBkLmNbMF0gPSBQT1dTX1RFTlsoZXhwID0gZSAlIExPR19CQVNFKSA8IDAgPyBMT0dfQkFTRSArIGV4cCA6IGV4cF07XHJcbiAgICAgIG1kID0gIW1kIHx8IG4uY29tcGFyZWRUbyhkKSA+IDAgPyAoZSA+IDAgPyBkIDogbjEpIDogbjtcclxuXHJcbiAgICAgIGV4cCA9IE1BWF9FWFA7XHJcbiAgICAgIE1BWF9FWFAgPSAxIC8gMDtcclxuICAgICAgbiA9IG5ldyBCaWdOdW1iZXIocyk7XHJcblxyXG4gICAgICAvLyBuMCA9IGQxID0gMFxyXG4gICAgICBuMC5jWzBdID0gMDtcclxuXHJcbiAgICAgIGZvciAoOyA7KSAge1xyXG4gICAgICAgIHEgPSBkaXYobiwgZCwgMCwgMSk7XHJcbiAgICAgICAgZDIgPSBkMC5wbHVzKHEudGltZXMoZDEpKTtcclxuICAgICAgICBpZiAoZDIuY29tcGFyZWRUbyhtZCkgPT0gMSkgYnJlYWs7XHJcbiAgICAgICAgZDAgPSBkMTtcclxuICAgICAgICBkMSA9IGQyO1xyXG4gICAgICAgIG4xID0gbjAucGx1cyhxLnRpbWVzKGQyID0gbjEpKTtcclxuICAgICAgICBuMCA9IGQyO1xyXG4gICAgICAgIGQgPSBuLm1pbnVzKHEudGltZXMoZDIgPSBkKSk7XHJcbiAgICAgICAgbiA9IGQyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkMiA9IGRpdihtZC5taW51cyhkMCksIGQxLCAwLCAxKTtcclxuICAgICAgbjAgPSBuMC5wbHVzKGQyLnRpbWVzKG4xKSk7XHJcbiAgICAgIGQwID0gZDAucGx1cyhkMi50aW1lcyhkMSkpO1xyXG4gICAgICBuMC5zID0gbjEucyA9IHgucztcclxuICAgICAgZSA9IGUgKiAyO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGZyYWN0aW9uIGlzIGNsb3NlciB0byB4LCBuMC9kMCBvciBuMS9kMVxyXG4gICAgICByID0gZGl2KG4xLCBkMSwgZSwgUk9VTkRJTkdfTU9ERSkubWludXMoeCkuYWJzKCkuY29tcGFyZWRUbyhcclxuICAgICAgICAgIGRpdihuMCwgZDAsIGUsIFJPVU5ESU5HX01PREUpLm1pbnVzKHgpLmFicygpKSA8IDEgPyBbbjEsIGQxXSA6IFtuMCwgZDBdO1xyXG5cclxuICAgICAgTUFYX0VYUCA9IGV4cDtcclxuXHJcbiAgICAgIHJldHVybiByO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgY29udmVydGVkIHRvIGEgbnVtYmVyIHByaW1pdGl2ZS5cclxuICAgICAqL1xyXG4gICAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICt2YWx1ZU9mKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICAgKiB1c2luZyByb3VuZGluZyBtb2RlIHJtIG9yIFJPVU5ESU5HX01PREUuIElmIHNkIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0c1xyXG4gICAgICogbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiwgdGhlbiB1c2VcclxuICAgICAqIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9QcmVjaXNpb24gPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICAgIGlmIChzZCAhPSBudWxsKSBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBzZCwgcm0sIDIpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGJhc2UgYiwgb3IgYmFzZSAxMCBpZiBiIGlzXHJcbiAgICAgKiBvbWl0dGVkLiBJZiBhIGJhc2UgaXMgc3BlY2lmaWVkLCBpbmNsdWRpbmcgYmFzZSAxMCwgcm91bmQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZFxyXG4gICAgICogUk9VTkRJTkdfTU9ERS4gSWYgYSBiYXNlIGlzIG5vdCBzcGVjaWZpZWQsIGFuZCB0aGlzIEJpZ051bWJlciBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudFxyXG4gICAgICogdGhhdCBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gVE9fRVhQX1BPUywgb3IgYSBuZWdhdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBsZXNzIHRoYW5cclxuICAgICAqIFRPX0VYUF9ORUcsIHJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBbYl0ge251bWJlcn0gSW50ZWdlciwgMiB0byBBTFBIQUJFVC5sZW5ndGggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAqL1xyXG4gICAgUC50b1N0cmluZyA9IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgIHZhciBzdHIsXHJcbiAgICAgICAgbiA9IHRoaXMsXHJcbiAgICAgICAgcyA9IG4ucyxcclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgLy8gSW5maW5pdHkgb3IgTmFOP1xyXG4gICAgICBpZiAoZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgICBzdHIgPSAnSW5maW5pdHknO1xyXG4gICAgICAgICAgaWYgKHMgPCAwKSBzdHIgPSAnLScgKyBzdHI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0ciA9ICdOYU4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoYiA9PSBudWxsKSB7XHJcbiAgICAgICAgICBzdHIgPSBlIDw9IFRPX0VYUF9ORUcgfHwgZSA+PSBUT19FWFBfUE9TXHJcbiAgICAgICAgICAgPyB0b0V4cG9uZW50aWFsKGNvZWZmVG9TdHJpbmcobi5jKSwgZSlcclxuICAgICAgICAgICA6IHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKG4uYyksIGUsICcwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChiID09PSAxMCkge1xyXG4gICAgICAgICAgbiA9IHJvdW5kKG5ldyBCaWdOdW1iZXIobiksIERFQ0lNQUxfUExBQ0VTICsgZSArIDEsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcobi5jKSwgbi5lLCAnMCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcbiAgICAgICAgICBzdHIgPSBjb252ZXJ0QmFzZSh0b0ZpeGVkUG9pbnQoY29lZmZUb1N0cmluZyhuLmMpLCBlLCAnMCcpLCAxMCwgYiwgcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocyA8IDAgJiYgbi5jWzBdKSBzdHIgPSAnLScgKyBzdHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGFzIHRvU3RyaW5nLCBidXQgZG8gbm90IGFjY2VwdCBhIGJhc2UgYXJndW1lbnQsIGFuZCBpbmNsdWRlIHRoZSBtaW51cyBzaWduIGZvclxyXG4gICAgICogbmVnYXRpdmUgemVyby5cclxuICAgICAqL1xyXG4gICAgUC52YWx1ZU9mID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgUC5faXNCaWdOdW1iZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChjb25maWdPYmplY3QgIT0gbnVsbCkgQmlnTnVtYmVyLnNldChjb25maWdPYmplY3QpO1xyXG5cclxuICAgIHJldHVybiBCaWdOdW1iZXI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUFJJVkFURSBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG4gIC8vIFRoZXNlIGZ1bmN0aW9ucyBkb24ndCBuZWVkIGFjY2VzcyB0byB2YXJpYWJsZXMsXHJcbiAgLy8gZS5nLiBERUNJTUFMX1BMQUNFUywgaW4gdGhlIHNjb3BlIG9mIHRoZSBgY2xvbmVgIGZ1bmN0aW9uIGFib3ZlLlxyXG5cclxuXHJcbiAgZnVuY3Rpb24gYml0Rmxvb3Iobikge1xyXG4gICAgdmFyIGkgPSBuIHwgMDtcclxuICAgIHJldHVybiBuID4gMCB8fCBuID09PSBpID8gaSA6IGkgLSAxO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFJldHVybiBhIGNvZWZmaWNpZW50IGFycmF5IGFzIGEgc3RyaW5nIG9mIGJhc2UgMTAgZGlnaXRzLlxyXG4gIGZ1bmN0aW9uIGNvZWZmVG9TdHJpbmcoYSkge1xyXG4gICAgdmFyIHMsIHosXHJcbiAgICAgIGkgPSAxLFxyXG4gICAgICBqID0gYS5sZW5ndGgsXHJcbiAgICAgIHIgPSBhWzBdICsgJyc7XHJcblxyXG4gICAgZm9yICg7IGkgPCBqOykge1xyXG4gICAgICBzID0gYVtpKytdICsgJyc7XHJcbiAgICAgIHogPSBMT0dfQkFTRSAtIHMubGVuZ3RoO1xyXG4gICAgICBmb3IgKDsgei0tOyBzID0gJzAnICsgcyk7XHJcbiAgICAgIHIgKz0gcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGogPSByLmxlbmd0aDsgci5jaGFyQ29kZUF0KC0taikgPT09IDQ4Oyk7XHJcblxyXG4gICAgcmV0dXJuIHIuc2xpY2UoMCwgaiArIDEgfHwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ29tcGFyZSB0aGUgdmFsdWUgb2YgQmlnTnVtYmVycyB4IGFuZCB5LlxyXG4gIGZ1bmN0aW9uIGNvbXBhcmUoeCwgeSkge1xyXG4gICAgdmFyIGEsIGIsXHJcbiAgICAgIHhjID0geC5jLFxyXG4gICAgICB5YyA9IHkuYyxcclxuICAgICAgaSA9IHgucyxcclxuICAgICAgaiA9IHkucyxcclxuICAgICAgayA9IHguZSxcclxuICAgICAgbCA9IHkuZTtcclxuXHJcbiAgICAvLyBFaXRoZXIgTmFOP1xyXG4gICAgaWYgKCFpIHx8ICFqKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBhID0geGMgJiYgIXhjWzBdO1xyXG4gICAgYiA9IHljICYmICF5Y1swXTtcclxuXHJcbiAgICAvLyBFaXRoZXIgemVybz9cclxuICAgIGlmIChhIHx8IGIpIHJldHVybiBhID8gYiA/IDAgOiAtaiA6IGk7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKGkgIT0gaikgcmV0dXJuIGk7XHJcblxyXG4gICAgYSA9IGkgPCAwO1xyXG4gICAgYiA9IGsgPT0gbDtcclxuXHJcbiAgICAvLyBFaXRoZXIgSW5maW5pdHk/XHJcbiAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIGIgPyAwIDogIXhjIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICAvLyBDb21wYXJlIGV4cG9uZW50cy5cclxuICAgIGlmICghYikgcmV0dXJuIGsgPiBsIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICBqID0gKGsgPSB4Yy5sZW5ndGgpIDwgKGwgPSB5Yy5sZW5ndGgpID8gayA6IGw7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBkaWdpdCBieSBkaWdpdC5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBqOyBpKyspIGlmICh4Y1tpXSAhPSB5Y1tpXSkgcmV0dXJuIHhjW2ldID4geWNbaV0gXiBhID8gMSA6IC0xO1xyXG5cclxuICAgIC8vIENvbXBhcmUgbGVuZ3Rocy5cclxuICAgIHJldHVybiBrID09IGwgPyAwIDogayA+IGwgXiBhID8gMSA6IC0xO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ2hlY2sgdGhhdCBuIGlzIGEgcHJpbWl0aXZlIG51bWJlciwgYW4gaW50ZWdlciwgYW5kIGluIHJhbmdlLCBvdGhlcndpc2UgdGhyb3cuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaW50Q2hlY2sobiwgbWluLCBtYXgsIG5hbWUpIHtcclxuICAgIGlmIChuIDwgbWluIHx8IG4gPiBtYXggfHwgbiAhPT0gbWF0aGZsb29yKG4pKSB7XHJcbiAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAobmFtZSB8fCAnQXJndW1lbnQnKSArICh0eXBlb2YgbiA9PSAnbnVtYmVyJ1xyXG4gICAgICAgICA/IG4gPCBtaW4gfHwgbiA+IG1heCA/ICcgb3V0IG9mIHJhbmdlOiAnIDogJyBub3QgYW4gaW50ZWdlcjogJ1xyXG4gICAgICAgICA6ICcgbm90IGEgcHJpbWl0aXZlIG51bWJlcjogJykgKyBTdHJpbmcobikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIEFzc3VtZXMgZmluaXRlIG4uXHJcbiAgZnVuY3Rpb24gaXNPZGQobikge1xyXG4gICAgdmFyIGsgPSBuLmMubGVuZ3RoIC0gMTtcclxuICAgIHJldHVybiBiaXRGbG9vcihuLmUgLyBMT0dfQkFTRSkgPT0gayAmJiBuLmNba10gJSAyICE9IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gdG9FeHBvbmVudGlhbChzdHIsIGUpIHtcclxuICAgIHJldHVybiAoc3RyLmxlbmd0aCA+IDEgPyBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpIDogc3RyKSArXHJcbiAgICAgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvRml4ZWRQb2ludChzdHIsIGUsIHopIHtcclxuICAgIHZhciBsZW4sIHpzO1xyXG5cclxuICAgIC8vIE5lZ2F0aXZlIGV4cG9uZW50P1xyXG4gICAgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zLlxyXG4gICAgICBmb3IgKHpzID0geiArICcuJzsgKytlOyB6cyArPSB6KTtcclxuICAgICAgc3RyID0genMgKyBzdHI7XHJcblxyXG4gICAgLy8gUG9zaXRpdmUgZXhwb25lbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBBcHBlbmQgemVyb3MuXHJcbiAgICAgIGlmICgrK2UgPiBsZW4pIHtcclxuICAgICAgICBmb3IgKHpzID0geiwgZSAtPSBsZW47IC0tZTsgenMgKz0geik7XHJcbiAgICAgICAgc3RyICs9IHpzO1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBsZW4pIHtcclxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwgZSkgKyAnLicgKyBzdHIuc2xpY2UoZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIEVYUE9SVFxyXG5cclxuXHJcbiAgQmlnTnVtYmVyID0gY2xvbmUoKTtcclxuICBCaWdOdW1iZXJbJ2RlZmF1bHQnXSA9IEJpZ051bWJlci5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEFNRC5cclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBCaWdOdW1iZXI7IH0pO1xyXG5cclxuICAvLyBOb2RlLmpzIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsT2JqZWN0KSB7XHJcbiAgICAgIGdsb2JhbE9iamVjdCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgPyBzZWxmIDogd2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbE9iamVjdC5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcbiAgfVxyXG59KSh0aGlzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIG1pZ3JhdG9yID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbWlncmF0b3JcIikpO1xuXG52YXIgX2RlZmF1bHQgPSBtaWdyYXRvcjtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBleHBvcnRzLlNFVFRJTkdTX09QVElPTlMgPSBleHBvcnRzLkJBQ0tVUF9TVFJBVEVHSUVTID0gdm9pZCAwO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9OZXR3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9OZXR3b3JrXCIpKTtcblxudmFyIF9QbHVnaW5SZXBvc2l0b3J5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vcGx1Z2lucy9QbHVnaW5SZXBvc2l0b3J5XCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVG9rZW5cIikpO1xuXG52YXIgX0V4cGxvcmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FeHBsb3JlclwiKSk7XG5cbnZhciBCQUNLVVBfU1RSQVRFR0lFUyA9IHtcbiAgTUFOVUFMOiAnbWFudWFsJyxcbiAgQVVUT01BVElDOiAnYXV0bydcbn07XG5leHBvcnRzLkJBQ0tVUF9TVFJBVEVHSUVTID0gQkFDS1VQX1NUUkFURUdJRVM7XG52YXIgU0VUVElOR1NfT1BUSU9OUyA9IHtcbiAgR0VORVJBTDoge1xuICAgIGxvY2tlZDogZmFsc2UsXG4gICAgbmFtZTogJ0dlbmVyYWwnXG4gIH0sXG4gIFRPS0VOUzoge1xuICAgIGxvY2tlZDogZmFsc2UsXG4gICAgbmFtZTogJ1Rva2VucydcbiAgfSxcbiAgRVhQTE9SRVI6IHtcbiAgICBsb2NrZWQ6IGZhbHNlLFxuICAgIG5hbWU6ICdFeHBsb3JlcnMnXG4gIH0sXG4gIEJBQ0tVUDoge1xuICAgIGxvY2tlZDogZmFsc2UsXG4gICAgbmFtZTogJ0JhY2t1cCdcbiAgfSxcbiAgRklSRVdBTEw6IHtcbiAgICBsb2NrZWQ6IHRydWUsXG4gICAgbmFtZTogJ0ZpcmV3YWxsJ1xuICB9LFxuICBQQVNTV09SRDoge1xuICAgIGxvY2tlZDogdHJ1ZSxcbiAgICBuYW1lOiAnUGFzc3dvcmQnXG4gIH0sXG4gIERFU1RST1k6IHtcbiAgICBsb2NrZWQ6IHRydWUsXG4gICAgbmFtZTogJ0Rlc3Ryb3knXG4gIH1cbn07XG5leHBvcnRzLlNFVFRJTkdTX09QVElPTlMgPSBTRVRUSU5HU19PUFRJT05TO1xuXG52YXIgU2V0dGluZ3MgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZXR0aW5ncygpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIFNldHRpbmdzKTtcbiAgICB0aGlzLm5ldHdvcmtzID0gW107XG4gICAgdGhpcy5sYW5ndWFnZSA9ICdFbmdsaXNoJztcbiAgICB0aGlzLmF1dG9CYWNrdXAgPSBCQUNLVVBfU1RSQVRFR0lFUy5BVVRPTUFUSUM7XG4gICAgdGhpcy5iYWNrdXBMb2NhdGlvbiA9ICcnO1xuICAgIHRoaXMuZXhwbG9yZXJzID0gX1BsdWdpblJlcG9zaXRvcnlbXCJkZWZhdWx0XCJdLmRlZmF1bHRFeHBsb3JlcnMoKTtcbiAgICB0aGlzLnNob3dOb3RpZmljYXRpb25zID0gdHJ1ZTsgLy8gVG9rZW5zXG5cbiAgICB0aGlzLnNob3dNYWlubmV0c09ubHkgPSB0cnVlO1xuICAgIHRoaXMuZGlzcGxheVRva2VuID0gbnVsbDtcbiAgICB0aGlzLmRpc3BsYXlDdXJyZW5jeSA9ICdVU0QnO1xuICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgdGhpcy5ibGFja2xpc3RUb2tlbnMgPSBbXTsgLy8ge2NvbnRyYWN0OlthY3Rpb25zXX1cblxuICAgIHRoaXMuYmxhY2tsaXN0QWN0aW9ucyA9IHtcbiAgICAgICdlb3M6OmVvc2lvJzogWyd1cGRhdGVhdXRoJ10sXG4gICAgICAnZW9zOjplb3Npby5tc2lnJzogWydhcHByb3ZlJ11cbiAgICB9O1xuICAgIHRoaXMuYmFsYW5jZUZpbHRlcnMgPSB7fTtcbiAgICB0aGlzLmhpZGVNYWluQmFsYW5jZSA9IGZhbHNlO1xuICAgIHRoaXMuc2ltcGxlTW9kZSA9IGZhbHNlO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShTZXR0aW5ncywgW3tcbiAgICBrZXk6IFwidXBkYXRlT3JQdXNoTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVPclB1c2hOZXR3b3JrKG5ldHdvcmspIHtcbiAgICAgIHRoaXMubmV0d29ya3MuZmluZChmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbi5pZCA9PT0gbmV0d29yay5pZDtcbiAgICAgIH0pID8gdGhpcy5uZXR3b3JrcyA9IHRoaXMubmV0d29ya3MubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuLmlkID09PSBuZXR3b3JrLmlkID8gbmV0d29yayA6IG47XG4gICAgICB9KSA6IHRoaXMubmV0d29ya3MudW5zaGlmdChuZXR3b3JrKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlTmV0d29ya1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVOZXR3b3JrKG5ldHdvcmspIHtcbiAgICAgIHRoaXMubmV0d29ya3MgPSB0aGlzLm5ldHdvcmtzLmZpbHRlcihmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbi5pZCAhPT0gbmV0d29yay5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJibGFja2xpc3RBY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmxhY2tsaXN0QWN0aW9uKGJsb2NrY2hhaW4sIGNvbnRyYWN0LCBhY3Rpb24pIHtcbiAgICAgIGlmICghY29udHJhY3QubGVuZ3RoIHx8ICFhY3Rpb24ubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgIGlmICghdGhpcy5ibGFja2xpc3RBY3Rpb25zLmhhc093blByb3BlcnR5KFwiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KSkpIHtcbiAgICAgICAgdGhpcy5ibGFja2xpc3RBY3Rpb25zW1wiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ibGFja2xpc3RBY3Rpb25zW1wiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KV0ucHVzaChhY3Rpb24pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVCbGFja2xpc3RlZEFjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVCbGFja2xpc3RlZEFjdGlvbihibG9ja2NoYWluLCBjb250cmFjdCwgYWN0aW9uKSB7XG4gICAgICBpZiAoIXRoaXMuYmxhY2tsaXN0QWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShcIlwiLmNvbmNhdChibG9ja2NoYWluLCBcIjo6XCIpLmNvbmNhdChjb250cmFjdCkpKSByZXR1cm47XG4gICAgICBpZiAoIXRoaXMuYmxhY2tsaXN0QWN0aW9uc1tcIlwiLmNvbmNhdChibG9ja2NoYWluLCBcIjo6XCIpLmNvbmNhdChjb250cmFjdCldLmluY2x1ZGVzKGFjdGlvbikpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmJsYWNrbGlzdEFjdGlvbnNbXCJcIi5jb25jYXQoYmxvY2tjaGFpbiwgXCI6OlwiKS5jb25jYXQoY29udHJhY3QpXS5sZW5ndGggPT09IDEpIHJldHVybiBkZWxldGUgdGhpcy5ibGFja2xpc3RBY3Rpb25zW1wiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KV07XG4gICAgICB0aGlzLmJsYWNrbGlzdEFjdGlvbnNbXCJcIi5jb25jYXQoYmxvY2tjaGFpbiwgXCI6OlwiKS5jb25jYXQoY29udHJhY3QpXSA9IHRoaXMuYmxhY2tsaXN0QWN0aW9uc1tcIlwiLmNvbmNhdChibG9ja2NoYWluLCBcIjo6XCIpLmNvbmNhdChjb250cmFjdCldLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geCAhPT0gYWN0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzQWN0aW9uQmxhY2tsaXN0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNBY3Rpb25CbGFja2xpc3RlZChhY3Rpb25UYWcpIHtcbiAgICAgIHZhciBfYWN0aW9uVGFnJHNwbGl0ID0gYWN0aW9uVGFnLnNwbGl0KCc6OicpLFxuICAgICAgICAgIF9hY3Rpb25UYWckc3BsaXQyID0gKDAsIF9zbGljZWRUb0FycmF5MltcImRlZmF1bHRcIl0pKF9hY3Rpb25UYWckc3BsaXQsIDMpLFxuICAgICAgICAgIGJsb2NrY2hhaW4gPSBfYWN0aW9uVGFnJHNwbGl0MlswXSxcbiAgICAgICAgICBjb250cmFjdCA9IF9hY3Rpb25UYWckc3BsaXQyWzFdLFxuICAgICAgICAgIGFjdGlvbiA9IF9hY3Rpb25UYWckc3BsaXQyWzJdO1xuXG4gICAgICByZXR1cm4gdGhpcy5ibGFja2xpc3RBY3Rpb25zLmhhc093blByb3BlcnR5KFwiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KSkgJiYgdGhpcy5ibGFja2xpc3RBY3Rpb25zW1wiXCIuY29uY2F0KGJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KGNvbnRyYWN0KV0uaW5jbHVkZXMoYWN0aW9uKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgU2V0dGluZ3MoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgdmFyIHAgPSBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnbmV0d29ya3MnKSkgcC5uZXR3b3JrcyA9IGpzb24ubmV0d29ya3MubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBfTmV0d29ya1tcImRlZmF1bHRcIl0uZnJvbUpzb24oeCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmhhc093blByb3BlcnR5KCd0b2tlbnMnKSkgcC50b2tlbnMgPSBqc29uLnRva2Vucy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oeCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmhhc093blByb3BlcnR5KCdibGFja2xpc3RUb2tlbnMnKSkgcC5ibGFja2xpc3RUb2tlbnMgPSBqc29uLmJsYWNrbGlzdFRva2Vucy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIF9Ub2tlbltcImRlZmF1bHRcIl0uZnJvbUpzb24oeCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmhhc093blByb3BlcnR5KCdleHBsb3JlcnMnKSkgcC5leHBsb3JlcnMgPSBPYmplY3Qua2V5cyhqc29uLmV4cGxvcmVycykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGJsb2NrY2hhaW4pIHtcbiAgICAgICAgYWNjW2Jsb2NrY2hhaW5dID0gX0V4cGxvcmVyW1wiZGVmYXVsdFwiXS5mcm9tUmF3KGpzb24uZXhwbG9yZXJzW2Jsb2NrY2hhaW5dLnJhdyk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNldHRpbmdzO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNldHRpbmdzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX0lkR2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbC9JZEdlbmVyYXRvclwiKSk7XG5cbnZhciBfQmxvY2tjaGFpbnMgPSByZXF1aXJlKFwiLi9CbG9ja2NoYWluc1wiKTtcblxudmFyIENvbnRhY3QgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb250YWN0KCkge1xuICAgIHZhciBfbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG5cbiAgICB2YXIgX3JlY2lwaWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgICB2YXIgX2Jsb2NrY2hhaW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG51bGw7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIENvbnRhY3QpO1xuICAgIHRoaXMuaWQgPSBfSWRHZW5lcmF0b3JbXCJkZWZhdWx0XCJdLnRleHQoMjQpO1xuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xuICAgIHRoaXMucmVjaXBpZW50ID0gX3JlY2lwaWVudDtcbiAgICB0aGlzLmJsb2NrY2hhaW4gPSBfYmxvY2tjaGFpbjtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoQ29udGFjdCwgW3tcbiAgICBrZXk6IFwidW5pcXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLmJsb2NrY2hhaW4sIFwiOjpcIikuY29uY2F0KHRoaXMucmVjaXBpZW50LCBcIjo6XCIpLmNvbmNhdCh0aGlzLm5hbWUpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9uZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHJldHVybiBDb250YWN0LmZyb21Kc29uKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJwbGFjZWhvbGRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGFjdCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29udGFjdDtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDb250YWN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2luZGV4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9hcGkvaW5kZXhcIikpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaGFyZHdhcmUvaW5kZXhcIikpO1xuXG52YXIgX2luZGV4MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaGlzdG9yaWVzL2luZGV4XCIpKTtcblxudmFyIF9BY2NvdW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9BY2NvdW50XCIpKTtcblxudmFyIF9BY2NvdW50QWN0aW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9BY2NvdW50QWN0aW9uXCIpKTtcblxudmFyIF9BdXRob3JpemVkQXBwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9BdXRob3JpemVkQXBwXCIpKTtcblxudmFyIEJsb2NrY2hhaW5zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vQmxvY2tjaGFpbnNcIikpO1xuXG52YXIgX0NvbnRhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0NvbnRhY3RcIikpO1xuXG52YXIgX0NyZWRpdENhcmQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0NyZWRpdENhcmRcIikpO1xuXG52YXIgX0V4cGxvcmVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FeHBsb3JlclwiKSk7XG5cbnZhciBfSWRlbnRpdHkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0lkZW50aXR5XCIpKTtcblxudmFyIF9LZXljaGFpbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vS2V5Y2hhaW5cIikpO1xuXG52YXIgX0tleXBhaXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0tleXBhaXJcIikpO1xuXG52YXIgX0xvY2FsZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vTG9jYWxlXCIpKTtcblxudmFyIF9NZXRhID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9NZXRhXCIpKTtcblxudmFyIF9OZXR3b3JrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9OZXR3b3JrXCIpKTtcblxudmFyIF9QZXJtaXNzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9QZXJtaXNzaW9uXCIpKTtcblxudmFyIF9TY2F0dGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TY2F0dGVyXCIpKTtcblxudmFyIF9TZXR0aW5ncyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vU2V0dGluZ3NcIikpO1xuXG52YXIgX1Rva2VuID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9Ub2tlblwiKSk7XG5cbnZhciBfZGVmYXVsdCA9IHtcbiAgYXBpOiBfaW5kZXhbXCJkZWZhdWx0XCJdLFxuICBoYXJkd2FyZTogX2luZGV4MltcImRlZmF1bHRcIl0sXG4gIGhpc3RvcmllczogX2luZGV4M1tcImRlZmF1bHRcIl0sXG4gIEFjY291bnQ6IF9BY2NvdW50W1wiZGVmYXVsdFwiXSxcbiAgQWNjb3VudEFjdGlvbjogX0FjY291bnRBY3Rpb25bXCJkZWZhdWx0XCJdLFxuICBBdXRob3JpemVkQXBwOiBfQXV0aG9yaXplZEFwcFtcImRlZmF1bHRcIl0sXG4gIEJsb2NrY2hhaW5zOiBCbG9ja2NoYWlucyxcbiAgQ29udGFjdDogX0NvbnRhY3RbXCJkZWZhdWx0XCJdLFxuICBDcmVkaXRDYXJkOiBfQ3JlZGl0Q2FyZFtcImRlZmF1bHRcIl0sXG4gIEV4cGxvcmVyOiBfRXhwbG9yZXJbXCJkZWZhdWx0XCJdLFxuICBJZGVudGl0eTogX0lkZW50aXR5W1wiZGVmYXVsdFwiXSxcbiAgS2V5Y2hhaW46IF9LZXljaGFpbltcImRlZmF1bHRcIl0sXG4gIEtleXBhaXI6IF9LZXlwYWlyW1wiZGVmYXVsdFwiXSxcbiAgTG9jYWxlOiBfTG9jYWxlW1wiZGVmYXVsdFwiXSxcbiAgTWV0YTogX01ldGFbXCJkZWZhdWx0XCJdLFxuICBOZXR3b3JrOiBfTmV0d29ya1tcImRlZmF1bHRcIl0sXG4gIFBlcm1pc3Npb246IF9QZXJtaXNzaW9uW1wiZGVmYXVsdFwiXSxcbiAgU2NhdHRlcjogX1NjYXR0ZXJbXCJkZWZhdWx0XCJdLFxuICBTZXR0aW5nczogX1NldHRpbmdzW1wiZGVmYXVsdFwiXSxcbiAgVG9rZW46IF9Ub2tlbltcImRlZmF1bHRcIl1cbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5SRUpFQ1RFRCA9IGV4cG9ydHMuVVBHUkFERV9SRVFVSVJFRCA9IGV4cG9ydHMuUFJPTVBUX0NMT1NFRCA9IGV4cG9ydHMuTE9DS0VEID0gZXhwb3J0cy5NQUxJQ0lPVVMgPSB2b2lkIDA7XG52YXIgTUFMSUNJT1VTID0gJ21hbGljaW91cyc7XG5leHBvcnRzLk1BTElDSU9VUyA9IE1BTElDSU9VUztcbnZhciBMT0NLRUQgPSAnbG9ja2VkJztcbmV4cG9ydHMuTE9DS0VEID0gTE9DS0VEO1xudmFyIFBST01QVF9DTE9TRUQgPSAncHJvbXB0X2Nsb3NlZCc7XG5leHBvcnRzLlBST01QVF9DTE9TRUQgPSBQUk9NUFRfQ0xPU0VEO1xudmFyIFVQR1JBREVfUkVRVUlSRUQgPSAndXBncmFkZV9yZXF1aXJlZCc7XG5leHBvcnRzLlVQR1JBREVfUkVRVUlSRUQgPSBVUEdSQURFX1JFUVVJUkVEO1xudmFyIFJFSkVDVEVEID0gJ3JlamVjdGVkJztcbmV4cG9ydHMuUkVKRUNURUQgPSBSRUpFQ1RFRDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgQXBpQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL0FwaUFjdGlvbnNcIikpO1xuXG52YXIgX2RlZmF1bHQgPSB7XG4gIEFwaUFjdGlvbnM6IEFwaUFjdGlvbnNcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9IaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL0hpc3RvcnlcIikpO1xuXG52YXIgX0FjY291bnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9BY2NvdW50XCIpKTtcblxudmFyIF9Ub2tlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL1Rva2VuXCIpKTtcblxudmFyIEhpc3RvcmljVHJhbnNmZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9IaXN0b3J5KSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoSGlzdG9yaWNUcmFuc2ZlciwgX0hpc3RvcnkpO1xuXG4gIGZ1bmN0aW9uIEhpc3RvcmljVHJhbnNmZXIoZnJvbSwgdG8sIHRva2VuLCBhbW91bnQpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgbWVtbyA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogbnVsbDtcbiAgICB2YXIgdHhpZCA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogJyc7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBIaXN0b3JpY1RyYW5zZmVyKTtcbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMltcImRlZmF1bHRcIl0pKEhpc3RvcmljVHJhbnNmZXIpLmNhbGwodGhpcywgX0hpc3RvcnkyLkhJU1RPUllfVFlQRVMuVHJhbnNmZXIsIHR4aWQpKTtcbiAgICBfdGhpcy5mcm9tID0gZnJvbTtcbiAgICBfdGhpcy50byA9IHRvO1xuICAgIF90aGlzLnRva2VuID0gdG9rZW47XG4gICAgX3RoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgIF90aGlzLm1lbW8gPSBtZW1vO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoSGlzdG9yaWNUcmFuc2ZlciwgbnVsbCwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IEhpc3RvcmljVHJhbnNmZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgdmFyIHAgPSBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgICBwLmZyb20gPSBfQWNjb3VudFtcImRlZmF1bHRcIl0uZnJvbUpzb24oanNvbi5mcm9tKTtcbiAgICAgIHAudG9rZW4gPSBfVG9rZW5bXCJkZWZhdWx0XCJdLmZyb21Kc29uKGpzb24udG9rZW4pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBIaXN0b3JpY1RyYW5zZmVyO1xufShfSGlzdG9yeTJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBIaXN0b3JpY1RyYW5zZmVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9IaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL0hpc3RvcnlcIikpO1xuXG52YXIgX0FjY291bnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9BY2NvdW50XCIpKTtcblxudmFyIEhpc3RvcmljQWN0aW9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfSGlzdG9yeSkge1xuICAoMCwgX2luaGVyaXRzMltcImRlZmF1bHRcIl0pKEhpc3RvcmljQWN0aW9uLCBfSGlzdG9yeSk7XG5cbiAgZnVuY3Rpb24gSGlzdG9yaWNBY3Rpb24oYWNjb3VudCwgYWN0aW9uKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIHR4aWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICcnO1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgSGlzdG9yaWNBY3Rpb24pO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMltcImRlZmF1bHRcIl0pKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyW1wiZGVmYXVsdFwiXSkoSGlzdG9yaWNBY3Rpb24pLmNhbGwodGhpcywgX0hpc3RvcnkyLkhJU1RPUllfVFlQRVMuQWN0aW9uLCB0eGlkKSk7XG4gICAgX3RoaXMuYWNjb3VudCA9IGFjY291bnQgaW5zdGFuY2VvZiBfQWNjb3VudFtcImRlZmF1bHRcIl0gPyBhY2NvdW50LnVuaXF1ZSgpIDogYWNjb3VudDtcbiAgICBfdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShIaXN0b3JpY0FjdGlvbiwgW3tcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gSGlzdG9yaWNBY3Rpb24uZnJvbUpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBIaXN0b3JpY0FjdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSGlzdG9yaWNBY3Rpb247XG59KF9IaXN0b3J5MltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEhpc3RvcmljQWN0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX0hhc2hlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3V0aWwvSGFzaGVyXCIpKTtcblxudmFyIEF1dGhvcml6ZWRBcHAgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBdXRob3JpemVkQXBwKF9vcmlnaW4sIF9hcHBrZXkpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEF1dGhvcml6ZWRBcHApO1xuICAgIHRoaXMub3JpZ2luID0gX29yaWdpbjtcbiAgICB0aGlzLmFwcGtleSA9IF9hcHBrZXk7XG4gICAgdGhpcy5uZXh0Tm9uY2UgPSAnJztcbiAgICB0aGlzLmNyZWF0ZWRBdCA9ICtuZXcgRGF0ZSgpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShBdXRob3JpemVkQXBwLCBbe1xuICAgIGtleTogXCJjaGVja0tleVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0tleShoYXNoZWQpIHtcbiAgICAgIHJldHVybiBoYXNoZWQgPT09IHRoaXMuaGFzaGVkKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhc2hlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNoZWQoKSB7XG4gICAgICByZXR1cm4gX0hhc2hlcltcImRlZmF1bHRcIl0udW5zYWx0ZWRRdWlja0hhc2godGhpcy5hcHBrZXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjaGVja05vbmNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrTm9uY2Uobm9uY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLm5leHROb25jZSA9PT0gX0hhc2hlcltcImRlZmF1bHRcIl0udW5zYWx0ZWRRdWlja0hhc2gobm9uY2UpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBBdXRob3JpemVkQXBwKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb24pIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBdXRob3JpemVkQXBwO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEF1dGhvcml6ZWRBcHA7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBleHBvcnRzLkNyZWRpdENhcmRTZWN1cmVQcm9wZXJ0aWVzID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX2Flc09vcCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImFlcy1vb3BcIikpO1xuXG52YXIgX0lkR2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbC9JZEdlbmVyYXRvclwiKSk7XG5cbnZhciBfQ3J5cHRvID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbC9DcnlwdG9cIikpO1xuXG52YXIgX0tleWNoYWluID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9LZXljaGFpblwiKSk7XG5cbnZhciBDcmVkaXRDYXJkU2VjdXJlUHJvcGVydGllcyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENyZWRpdENhcmRTZWN1cmVQcm9wZXJ0aWVzKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXMpO1xuICAgIHRoaXMubnVtYmVyID0gJyc7XG4gICAgdGhpcy5hdXRoVG9rZW5zID0ge307XG4gICAgdGhpcy5leHBpcmF0aW9uID0gJyc7XG4gICAgdGhpcy5jYXJkSGFzaCA9ICcnO1xuICAgIHRoaXMucGVyc29uYWxJbmZvcm1hdGlvbiA9IHt9O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShDcmVkaXRDYXJkU2VjdXJlUHJvcGVydGllcywgW3tcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXMuZnJvbUpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInBsYWNlaG9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBDcmVkaXRDYXJkU2VjdXJlUHJvcGVydGllcygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmcm9tSnNvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbihqc29uKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnBsYWNlaG9sZGVyKCksIGpzb24pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXM7XG59KCk7XG5cbmV4cG9ydHMuQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXMgPSBDcmVkaXRDYXJkU2VjdXJlUHJvcGVydGllcztcblxudmFyIENyZWRpdENhcmQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDcmVkaXRDYXJkKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgQ3JlZGl0Q2FyZCk7XG4gICAgdGhpcy5pZCA9IF9JZEdlbmVyYXRvcltcImRlZmF1bHRcIl0udGV4dCgyNCk7XG4gICAgdGhpcy5uYW1lID0gJyc7XG4gICAgdGhpcy5sYXN0Rm91ciA9ICcnO1xuICAgIHRoaXMuc2VjdXJlID0gQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXMucGxhY2Vob2xkZXIoKTtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9ICtuZXcgRGF0ZSgpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShDcmVkaXRDYXJkLCBbe1xuICAgIGtleTogXCJ1bmlxdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5pcXVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIENyZWRpdENhcmQuZnJvbUpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc2goKSB7XG4gICAgICB0aGlzLmNhcmRIYXNoID0gX0NyeXB0b1tcImRlZmF1bHRcIl0uYnVmZmVyVG9IYXNoKHRoaXMuc2VjdXJlLm51bWJlcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzRW5jcnlwdGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5jcnlwdGVkKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNlY3VyZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVuY3J5cHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jcnlwdChzZWVkKSB7XG4gICAgICBpZiAoIXRoaXMuaXNFbmNyeXB0ZWQoKSkgdGhpcy5zZWN1cmUgPSBfYWVzT29wW1wiZGVmYXVsdFwiXS5lbmNyeXB0KHRoaXMuc2VjdXJlLCBzZWVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVjcnlwdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWNyeXB0KHNlZWQpIHtcbiAgICAgIGlmICh0aGlzLmlzRW5jcnlwdGVkKCkpIHRoaXMuc2VjdXJlID0gX2Flc09vcFtcImRlZmF1bHRcIl0uZGVjcnlwdCh0aGlzLnNlY3VyZSwgc2VlZCk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwicGxhY2Vob2xkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IENyZWRpdENhcmQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZnJvbUpzb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb24oanNvbikge1xuICAgICAgdmFyIHAgPSBPYmplY3QuYXNzaWduKHRoaXMucGxhY2Vob2xkZXIoKSwganNvbik7XG4gICAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnc2VjdXJlJykpIHAuc2VjdXJlID0gdHlwZW9mIGpzb24uc2VjdXJlID09PSAnc3RyaW5nJyA/IGpzb24uc2VjdXJlIDogQ3JlZGl0Q2FyZFNlY3VyZVByb3BlcnRpZXMuZnJvbUpzb24oanNvbi5zZWN1cmUpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDcmVkaXRDYXJkO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENyZWRpdENhcmQ7Il0sInNvdXJjZVJvb3QiOiIifQ==