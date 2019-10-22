(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "2lmI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_61d8b9e8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("v0zd");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_61d8b9e8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_61d8b9e8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_61d8b9e8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "82eg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/Signature.vue?vue&type=template&id=61d8b9e8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('section',{staticClass:"multi-pane popout-window"},[_c('section',{staticClass:"main-panel"},[_c('PopOutApp',{attrs:{"app":_vm.appData}}),_vm._v(" "),(_vm.limitedMessages.total > 1)?_c('figure',{staticClass:"has-more"},[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.ActionsTotal,_vm.limitedMessages.total)))]):_vm._e(),_vm._v(" "),(_vm.participantAccounts)?_c('section',{staticClass:"participants"},[_c('label',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.AccountsInvolved)))]),_vm._v(" "),(!_vm.participantsAsSelector)?_c('section',[_vm._l((_vm.participantAccounts.slice(0,2)),function(p){return _c('section',{staticClass:"participant"},[_vm._v("\n                        "+_vm._s(p.network().name)+" - "),_c('b',[_vm._v(_vm._s(p.sendable()))])])}),_vm._v(" "),(_vm.participantAccounts.length > 2)?_c('figure',{staticClass:"more-participants",on:{"click":function($event){_vm.participantsAsSelector = true}}},[_vm._v("\n                        +"+_vm._s(_vm.participantAccounts.length)+" more accounts\n                    ")]):_vm._e()],2):_c('Select',{attrs:{"bordered":"1","options":_vm.participantAccounts,"parser":function (x) { return ((x.network().name) + " - " + (x.sendable())); }}})],1):_vm._e(),_vm._v(" "),(_vm.isArbitrarySignature)?_c('section',{staticClass:"participants"},[_c('label',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.KeysInvolved)))]),_vm._v(" "),_c('section',{staticClass:"participant"},[_vm._v(_vm._s(_vm.arbitraryKeypair.name))])]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"fixed-actions"},[(_vm.isDangerous)?_c('section',{staticClass:"disclaimer less-pad red centered",staticStyle:{"margin-bottom":"10px"}},[_vm._v("\n                    One of the actions included within this transaction is "),_c('b',[_vm._v("dangerous")]),_vm._v(".\n                ")]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"accept-deny"},[(!_vm.pinning)?_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Deny),"big":"1"},nativeOn:{"click":function($event){return _vm.returnResult(false)}}}):_vm._e(),_vm._v(" "),(!_vm.pinning)?_c('Button',{attrs:{"red":_vm.isDangerous || (_vm.reputation && _vm.reputation.decimal < 0),"big":"1","blue":"1","disabled":_vm.cannotSignArbitrary,"text":_vm.locale(_vm.langKeys.GENERIC.Allow)},nativeOn:{"click":function($event){return _vm.accepted($event)}}}):_vm._e()],1)])],1),_vm._v(" "),(!_vm.expanded)?_c('section',{staticClass:"side-panel"},[_c('section',{staticClass:"messages-scroller"},[(!_vm.isArbitrarySignature && (_vm.personalFields.length || _vm.locationFields.length))?_c('RequiredFields',{attrs:{"identity":_vm.identity,"fields":_vm.fields,"selected-identity":_vm.selectedIdentity,"cloned-location":_vm.clonedLocation,"selected-location":_vm.selectedLocation,"split-panels":"1"},on:{"selectLocation":function (x) { _vm.selectedLocation = x; _vm.clonedLocation = x.clone(); },"locationField":function (key, val) { return _vm.clonedLocation[key] = val; },"personalField":function (key, val) { return _vm.selectedIdentity.personal[key] = val; }}}):_vm._e(),_vm._v(" "),_vm._l((_vm.messages),function(message,index){return _c('section',{ref:("message_" + index),refInFor:true,staticClass:"messages",class:{'dangerous':_vm.isDangerous || (_vm.reputable(message) && _vm.reputable(message).decimal < 0)}},[(_vm.isPreviouslyWhitelisted(message))?_c('section',{staticClass:"whitelist-overlay"},[_c('section',{staticClass:"box"},[_c('figure',{staticClass:"info"},[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.PreviouslyWhitelisted)))])])]):_vm._e(),_vm._v(" "),_c('section',{class:{'previous-whitelist':_vm.isPreviouslyWhitelisted(message)}},[_c('section',{staticClass:"details contract-action"},[(_vm.isDangerous)?_c('section',{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:({content:_vm.isDangerous, classes:['dangertip']}),expression:"{content:isDangerous, classes:['dangertip']}",modifiers:{"right":true}}],staticClass:"danger wiggle"},[_c('i',{staticClass:"icon-help"})]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"title"},[(_vm.whitelisted && !_vm.isPreviouslyWhitelisted(message))?_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":!!_vm.getWhitelist(message)},on:{"change":function($event){return _vm.addWhitelist(message)}}}):_vm._e(),_vm._v(" "),_c('ReputationScore',{staticClass:"score",attrs:{"reputable":_vm.reputable(message),"small":"1"}}),_vm._v(" "),_c('span',{on:{"click":function($event){return _vm.collapse(message)}}},[_vm._v(_vm._s(message.code)+" "),_c('i',{staticClass:"contract-split icon-right-open-big"}),_vm._v(" "+_vm._s(message.type))])],1),_vm._v(" "),(_vm.isDangerous)?_c('span',{staticClass:"danger-title"},[_vm._v("This action is "),_c('b',[_vm._v("dangerous")]),_vm._v("!")]):_vm._e()]),_vm._v(" "),(!_vm.isCollapsed(message))?_c('section',[_c('br'),_vm._v(" "),_vm._l((message.data),function(value,key){return (_vm.viewType === _vm.VIEW_TYPES.HUMAN)?_c('section',{staticClass:"properties"},[_c('label',[_vm._v(_vm._s(key))]),_vm._v(" "),_c('section',{staticClass:"split-inputs"},[(_vm.whitelisted && !_vm.isPreviouslyWhitelisted(message))?_c('input',{attrs:{"type":"checkbox"},on:{"change":function($event){_vm.toggleWhitelistProp(_vm.getWhitelist(message), key)}}}):_vm._e(),_vm._v(" "),(typeof value === 'object')?_c('figure',{staticClass:"value object"},[_c('div',{ref:_vm.hash(JSON.stringify(message)) + key + _vm.hash(value),refInFor:true,attrs:{"v-html":_vm.formatJson(value, _vm.hash(JSON.stringify(message))+key)}})]):_c('figure',{staticClass:"value"},[_vm._v(_vm._s(value))])])]):_vm._e()}),_vm._v(" "),(_vm.viewType === _vm.VIEW_TYPES.JSON)?_c('section',{staticClass:"properties"},[_c('div',{ref:_vm.hash(message.data),refInFor:true,staticClass:"value object",attrs:{"v-html":_vm.formatJson(message.data)}})]):_vm._e(),_vm._v(" "),(_vm.viewType === _vm.VIEW_TYPES.RICARDIAN)?_c('section',{staticClass:"properties"},[(!_vm.hasRicardianContract(message))?_c('figure',{staticClass:"collapsed"},[_vm._v("No Ricardian Contract")]):_c('figure',{staticClass:"ricardian"},[_vm._v(_vm._s(message.ricardian))])]):_vm._e()],2):_c('section',{staticClass:"collapsed"},[_vm._v("\n                            "+_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.HiddenActions))+"\n                        ")])])])})],2),_vm._v(" "),(!_vm.isArbitrarySignature && !_vm.isDangerous)?_c('section',{staticClass:"whitelist-bar"},[(!_vm.whitelisted)?_c('figure',{staticClass:"text"},[_vm._v("You can whitelist this so that you don't have to keep re-accepting this transaction.")]):_vm._e(),_vm._v(" "),(_vm.whitelisted)?_c('figure',{staticClass:"text blue"},[_vm._v("Checkboxes that are checked can have their values changed without breaking the whitelist.")]):_vm._e(),_vm._v(" "),_c('Switcher',{attrs:{"state":_vm.whitelisted},nativeOn:{"click":function($event){return _vm.whitelist($event)}}})],1):_vm._e()]):_vm._e()]),_vm._v(" "),(_vm.showingRidlWarning)?_c('section',{staticClass:"ridl-popup"},[_c('figure',{staticClass:"bg",on:{"click":function($event){_vm.showingRidlWarning = false}}}),_vm._v(" "),_c('section',{staticClass:"box"},[_c('h2',[_vm._v("Danger!")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticStyle:{"font-size":"9px"}},[_vm._v("Related Entities")]),_vm._v(" "),_vm._l((_vm.reputation.reputables.filter(function (x) { return x.decimal < 0; })),function(reputable){return _c('i',{staticClass:"link",on:{"click":function($event){_vm.openInBrowser(_vm.ridlLink(reputable))}}},[_vm._v("View "),_c('b',[_vm._v(_vm._s(reputable.entity))]),_vm._v(" on RIDL.")])})],2)]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticStyle:{"font-size":"11px","line-height":"13px"}},[_vm._v("\n                Users of RIDL have rated contracts and/or actions within this transaction negatively.\n                "),_c('b',[_vm._v("This does not mean indefinitely that it is a scam, just that it is dangerous in some way.")])])}]


// CONCATENATED MODULE: ./src/views/popouts/Signature.vue?vue&type=template&id=61d8b9e8&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("o0o1");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./src/components/reusable/ReputationScore.vue + 4 modules
var ReputationScore = __webpack_require__("T/cf");

// EXTERNAL MODULE: ./src/components/reusable/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("RNqi");

// EXTERNAL MODULE: ./node_modules/json-formatter-js/dist/json-formatter.js
var json_formatter = __webpack_require__("6IJF");
var json_formatter_default = /*#__PURE__*/__webpack_require__.n(json_formatter);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/Hasher.js
var Hasher = __webpack_require__("zugy");
var Hasher_default = /*#__PURE__*/__webpack_require__.n(Hasher);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Account.js
var Account = __webpack_require__("bUKF");
var Account_default = /*#__PURE__*/__webpack_require__.n(Account);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apps/PermissionService.js
var PermissionService = __webpack_require__("eOAV");
var PermissionService_default = /*#__PURE__*/__webpack_require__.n(PermissionService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");
var KeyPairService_default = /*#__PURE__*/__webpack_require__.n(KeyPairService);

// EXTERNAL MODULE: ./src/services/utility/RIDLService.js
var RIDLService = __webpack_require__("bcyO");

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/Signature.vue?vue&type=script&lang=js&




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
















var VIEW_TYPES = {
  HUMAN: 'human',
  JSON: 'json',
  RICARDIAN: 'ricardian'
};
/* harmony default export */ var Signaturevue_type_script_lang_js_ = ({
  props: ['popup', 'expanded', 'pinning'],
  components: {
    PopOutApp: PopOutApp["a" /* default */],
    ReputationScore: ReputationScore["a" /* default */],
    RequiredFields: RequiredFields["a" /* default */],
    SearchBar: SearchBar["a" /* default */]
  },
  data: function data() {
    return {
      Blockchains: Blockchains["Blockchains"],
      whitelisted: false,
      whitelists: [],
      actionList: [],
      viewType: VIEW_TYPES.HUMAN,
      VIEW_TYPES: VIEW_TYPES,
      selectedIdentity: null,
      selectedLocation: null,
      clonedLocation: null,
      hideCloseButton: false,
      reputation: null,
      showingRidlWarning: false,
      participantsAsSelector: false
    };
  },
  created: function created() {
    var _this = this;

    this.selectedIdentity = this.identity.clone();
    this.selectedLocation = this.selectedIdentity.getLocation() || this.locations[0];
    this.clonedLocation = this.selectedLocation.clone();
    setTimeout(
    /*#__PURE__*/
    asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee() {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loadingReputation = true;
              _context.next = 3;
              return RIDLService["b" /* default */].checkContracts(_this.payload.network, _this.messages);

            case 3:
              _this.reputation = _context.sent;
              if (_this.reputation && _this.reputation.decimal < 0) _this.showingRidlWarning = true;
              _this.loadingReputation = false;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), 50);
  },
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['scatter']), {}, Object(vuex_esm["c" /* mapGetters */])(['identity', 'identities', 'accounts', 'networks', 'locations']), {
    appData: function appData() {
      return this.popup.data.props.appData;
    },
    viewTypesArray: function viewTypesArray() {
      var hasEos = !this.isArbitrarySignature && !!this.payload.participants.find(function (x) {
        return Account_default.a.fromJson(x).blockchain() === Blockchains["Blockchains"].EOSIO;
      });
      var arrMap = [VIEW_TYPES.HUMAN, VIEW_TYPES.JSON];
      if (hasEos) arrMap.push(VIEW_TYPES.RICARDIAN);
      return arrMap;
    },
    payload: function payload() {
      return this.popup.payload();
    },
    participantAccounts: function participantAccounts() {
      if (!this.payload.hasOwnProperty('participants')) return null;
      return this.payload.participants.map(function (x) {
        return Account_default.a.fromJson(x);
      });
    },
    messages: function messages() {
      return this.payload.messages;
    },
    limitedMessages: function limitedMessages() {
      return {
        actions: this.messages.slice(0, 3).map(function (x) {
          return x.type;
        }).join(', '),
        total: this.messages.length
      };
    },
    isArbitrarySignature: function isArbitrarySignature() {
      return !this.payload.hasOwnProperty('participants');
    },
    fields: function fields() {
      return Identity["IdentityRequiredFields"].fromJson(this.payload.requiredFields || {});
    },
    personalFields: function personalFields() {
      return this.fields.personal;
    },
    locationFields: function locationFields() {
      return this.fields.location;
    },
    missingFields: function missingFields() {
      if (!this.personalFields.length && !this.locationFields.length) return false;
      return !this.identity.hasRequiredFields(this.fields);
    },
    isValidIdentity: function isValidIdentity() {
      return this.selectedIdentity.hasRequiredFields(this.fields, this.clonedLocation);
    },
    arbitraryKeypair: function arbitraryKeypair() {
      return KeyPairService_default.a.getKeyPairFromPublicKey(this.payload.publicKey);
    },
    cannotSignArbitrary: function cannotSignArbitrary() {
      if (!this.isArbitrarySignature) return false;
      return this.payload.messages[0].data.signing.split(' ').some(function (x) {
        return x.length > 12;
      });
    },
    isDangerous: function isDangerous() {
      if (this.messages.find(function (x) {
        return x.code === 'eosio' && x.type === 'updateauth';
      })) {
        return "This action is dangerous. Accepting it will change your keys and possibly give your account to someone else. <br><br><b>Check to make sure the keys are correct.</b>";
      }

      return false;
    }
  }),
  methods: _objectSpread({
    returnResult: function returnResult(result) {
      this.$emit('returned', result);
    },
    reputable: function reputable(message) {
      if (!this.reputation) return;
      return this.reputation.reputables.find(function (x) {
        return x.code === "".concat(message.code).concat(message.type);
      });
    },
    ridlLink: function ridlLink(reputable) {
      return "".concat(RIDLService["a" /* RIDL_API */], "/reputable?id=").concat(reputable.id);
    },
    formatViewType: function formatViewType(type) {
      switch (type) {
        case VIEW_TYPES.HUMAN:
          return 'Human Readable';

        case VIEW_TYPES.JSON:
          return 'JSON Format';

        case VIEW_TYPES.RICARDIAN:
          return 'Ricardian Contracts';
      }
    },
    collapse: function collapse(message) {
      this.toggleAction(message, 'collapsed');
    },
    isCollapsed: function isCollapsed(message) {
      var _this2 = this;

      return this.actionList.find(function (x) {
        return x === _this2.getMessageUnique(message, 'collapsed');
      });
    },
    accepted: function () {
      var _accepted = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2() {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.returnResult({
                  whitelists: this.whitelists,
                  identity: this.selectedIdentity,
                  location: this.clonedLocation,
                  missingFields: this.missingFields,
                  accepted: true,
                  needResources: false
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function accepted() {
        return _accepted.apply(this, arguments);
      }

      return accepted;
    }(),
    hash: function hash(json) {
      return Hasher_default.a.unsaltedQuickHash(JSON.stringify(json));
    },
    formatJson: function formatJson(json) {
      var _this3 = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$nextTick(function () {
        var refKey = (key ? key : '') + _this3.hash(json);

        var formatter = new json_formatter_default.a(json, 99999, {
          hoverPreviewEnabled: true,
          hoverPreviewArrayCount: 10,
          hoverPreviewFieldCount: 5,
          useToJSON: true
        });
        var elem = _this3.$refs[refKey][0];
        if (elem.children.length >= 1) return false;
        elem.appendChild(formatter.render());
      });
    },
    whitelist: function whitelist() {
      var _this4 = this;

      this.whitelisted = !this.whitelisted;
      this.messages.map(function (message) {
        if (!_this4.isPreviouslyWhitelisted(message)) _this4.addWhitelist(message);
      });
    },
    getMessageUnique: function getMessageUnique(message, action) {
      return "".concat(message.code, ":").concat(message.type, ":").concat(action);
    },
    getWhitelist: function getWhitelist(message) {
      var unique = this.getMessageUnique(message, 'whitelist');
      return this.whitelists.find(function (x) {
        return x.unique === unique;
      });
    },
    toggleAction: function toggleAction(message, action) {
      var unique = this.getMessageUnique(message, action);
      if (this.actionList.includes(unique)) this.actionList = this.actionList.filter(function (x) {
        return x !== unique;
      });else this.actionList.push(unique);
    },
    getAction: function getAction(message, action) {
      var _this5 = this;

      return this.actionList.find(function (x) {
        return x === _this5.getMessageUnique(message, action);
      });
    },
    addWhitelist: function addWhitelist(message) {
      if (this.isPreviouslyWhitelisted(message)) return false;
      this.toggleAction(message, 'whitelist');
      var unique = this.getMessageUnique(message, 'whitelist');
      var whitelist = {
        unique: unique,
        props: [],
        code: message.code,
        type: message.type,
        fields: message.data
      };
      if (this.whitelists.find(function (x) {
        return x.unique === whitelist.unique;
      })) this.whitelists = this.whitelists.filter(function (x) {
        return x.unique !== unique;
      });else this.whitelists.push(whitelist);
      if (this.whitelists.length === 0) this.whitelisted = false;
    },
    toggleWhitelistProp: function toggleWhitelistProp(whitelist, prop) {
      if (whitelist.props.includes(prop)) whitelist.props = whitelist.props.filter(function (x) {
        return x !== prop;
      });else whitelist.props.push(prop);
    },
    isPreviouslyWhitelisted: function isPreviouslyWhitelisted(message) {
      if (this.isArbitrarySignature) return false;
      return PermissionService_default.a.hasActionPermission(this.payload.origin, this.identity, this.participantAccounts, message);
    },
    hasRicardianContract: function hasRicardianContract(message) {
      return message.hasOwnProperty('ricardian') && message.ricardian.length;
    }
  }, Object(vuex_esm["b" /* mapActions */])([constants["ADD_RESOURCES"]]))
});
// CONCATENATED MODULE: ./src/views/popouts/Signature.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_Signaturevue_type_script_lang_js_ = (Signaturevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/Signature.vue?vue&type=style&index=0&id=61d8b9e8&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Signaturevue_type_style_index_0_id_61d8b9e8_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("2lmI");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/Signature.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_Signaturevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "61d8b9e8",
  null
  
)

/* harmony default export */ var Signature = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8Yeu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("M1sK");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "EmAJ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-61d8b9e8]{padding:60px 60px 30px}.ridl-popup[data-v-61d8b9e8]{position:fixed;top:79px;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;align-items:center}.ridl-popup .bg[data-v-61d8b9e8]{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(255,0,0,0.8);z-index:-1}.ridl-popup .box[data-v-61d8b9e8]{background:#fff;border-radius:4px;padding:30px;text-align:center;min-width:250px;max-width:450px;width:100%;box-shadow:0 0 0 3px red, 0 0 0 6px white}.ridl-popup .box .link[data-v-61d8b9e8]{cursor:pointer;display:block;text-decoration:underline}.view-types[data-v-61d8b9e8]{position:relative;margin-top:-10px;margin-left:-30px;margin-right:-30px;background:#fff;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05),0 10px 20px rgba(0,0,0,0.02)}input[type=checkbox][data-v-61d8b9e8]{flex:0 0 auto;align-self:flex-start;margin-right:10px;width:20px;height:20px;cursor:pointer}.has-more[data-v-61d8b9e8]{text-align:center;font-size:10px;font-weight:bold;color:#7a7a7a;border-radius:4px;border:1px solid #c8c8c8;display:table;padding:5px 8px;margin:-25px auto 0}.messages[data-v-61d8b9e8]{padding:20px 0 20px;position:relative}.messages[data-v-61d8b9e8]:not(:first-child){margin-top:60px}.messages .previous-whitelist[data-v-61d8b9e8]{opacity:0.4;cursor:not-allowed}.messages .collapsed[data-v-61d8b9e8]{padding-top:10px;font-size:11px}.messages .whitelist-overlay[data-v-61d8b9e8]{position:absolute;top:50px;right:0;z-index:2;display:flex;justify-content:center;align-items:center}.messages .whitelist-overlay .box[data-v-61d8b9e8]{width:150px;padding:20px;background:#fff;text-align:center;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1),0 10px 20px rgba(0,0,0,0.03);font-size:13px;font-weight:bold}.messages .details .title[data-v-61d8b9e8]{align-items:center;display:flex;font-size:14px;cursor:pointer}.messages .details .title[data-v-61d8b9e8]:hover{text-decoration:underline}.messages .details .contract-split[data-v-61d8b9e8]{padding:0 5px;font-size:13px;display:inline-block;animation:bounce-data-v-61d8b9e8 0.7s infinite}@keyframes bounce-data-v-61d8b9e8{0%,100%{transform:translateX(-2px)}50%{transform:translateX(2px)}}.messages .properties .ricardian[data-v-61d8b9e8]{background:rgba(0,0,0,0.05);border:1px solid rgba(0,0,0,0.15);border-radius:4px;padding:10px}.messages .properties label[data-v-61d8b9e8]{margin-bottom:5px}.messages .properties .value[data-v-61d8b9e8]{overflow-x:auto;min-height:16px;font-size:16px;font-weight:bold}.messages .properties .value.object[data-v-61d8b9e8]{font-size:13px;font-weight:500}.messages .properties:not(:last-child) .value[data-v-61d8b9e8]{margin-bottom:20px}.messages.dangerous .danger[data-v-61d8b9e8]{cursor:pointer;float:left;padding:6px 5px 5px;background:rgba(0,0,0,0.1);box-shadow:inset 0 5px 10px rgba(0,0,0,0.1);text-shadow:0 2px 0 rgba(0,0,0,0.1);border-radius:4px;margin-top:7px;margin-right:10px}.messages.dangerous .details.contract-action[data-v-61d8b9e8]{background:red;background:linear-gradient(-180deg, #ff0707 -20%, #e23b3b 100%);border-bottom:1px solid darkred;color:#fff}.messages.dangerous .danger-title[data-v-61d8b9e8]{font-size:11px;width:100%}.json-formatter-dark.json-formatter-row[data-v-61d8b9e8]{padding:0}.contract-action[data-v-61d8b9e8]{margin:-20px -30px 0;border-top:1px solid rgba(0,0,0,0.04);padding:20px 30px;background:linear-gradient(180deg, #007fd7 0%, #0799ff 100%);color:#fff}.contract-action .title span[data-v-61d8b9e8]{font-size:18px}\n", ""]);


/***/ }),

/***/ "GM6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ztac");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "IeaP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=template&id=22b9e1d6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"app-details"},[(!_vm.untrusted)?_c('figure',{staticClass:"logo",class:{'border':_vm.app.applink !== 'Scatter' && !_vm.app.img}},[(_vm.app.applink === 'Scatter')?_c('Scatter'):(_vm.app.img)?_c('img',{attrs:{"src":_vm.app.img}}):_c('span',[_vm._v("No Image")])],1):_c('figure',{staticClass:"logo scam"},[_c('i',{staticClass:"icon-attention"})]),_vm._v(" "),(_vm.ridlEnabled && _vm.app.applink !== 'Scatter')?_c('section',[(_vm.appReputation === false)?_c('figure',{staticClass:"reputation"},[_c('i',{staticClass:"icon-spin4 animate-spin"}),_vm._v(" loading reputation")]):_c('section',[(_vm.unknownReputation)?_c('figure',{staticClass:"reputation"},[_vm._v("Unknown Reputation")]):_vm._e(),_vm._v(" "),(_vm.trusted)?_c('figure',{staticClass:"reputation trusted"},[_vm._v("Trustworthy")]):_vm._e(),_vm._v(" "),(_vm.untrusted)?_c('figure',{staticClass:"reputation untrusted"},[_vm._v("Known Scam")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"name"},[_c('b',[_vm._v(_vm._s(_vm.app.name))]),_vm._v(" "),(_vm.suffix)?_c('span',[_vm._v(_vm._s(_vm.suffix))]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=template&id=22b9e1d6&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/svgs/ScatterOutline.vue + 2 modules
var ScatterOutline = __webpack_require__("wg2a");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var PopOutAppvue_type_script_lang_js_ = ({
  components: {
    Scatter: ScatterOutline["a" /* default */]
  },
  props: ['app', 'suffix'],
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['appReputation']), {}, Object(vuex_esm["c" /* mapGetters */])(['ridlEnabled']), {
    unknownReputation: function unknownReputation() {
      return this.appReputation === undefined;
    },
    trusted: function trusted() {
      return this.appReputation && parseFloat(this.appReputation.decimal) > 0;
    },
    untrusted: function untrusted() {
      return this.appReputation && parseFloat(this.appReputation.decimal) < 0;
    }
  })
});
// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_PopOutAppvue_type_script_lang_js_ = (PopOutAppvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=style&index=0&id=22b9e1d6&scoped=true&lang=scss&
var PopOutAppvue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss_ = __webpack_require__("GM6d");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_PopOutAppvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "22b9e1d6",
  null
  
)

/* harmony default export */ var PopOutApp = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "M1sK":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("QBFQ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("66bb7c78", content, true, {});

/***/ }),

/***/ "QBFQ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".fields-title[data-v-0a29a3fd]{margin:-20px -30px 0;padding:20px 30px;background:linear-gradient(180deg, #007fd7 0%, #0799ff 100%);color:#fff;font-size:18px;margin-bottom:20px}.required-fields[data-v-0a29a3fd]{padding:20px 0 0}\n", ""]);


/***/ }),

/***/ "psvp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/RequiredFields.vue?vue&type=template&id=0a29a3fd&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"required-fields"},[_c('section',{staticClass:"fields-title"},[_vm._v("\n\t\tRequired Identity Fields\n\t")]),_vm._v(" "),_c('section',[_c('label',[_vm._v("Personal information:")]),_vm._v(" "),_c('figure',{staticClass:"text"},[_vm._v("\n\t\t\t"+_vm._s(_vm.identityRequirements)+"\n\t\t")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=template&id=0a29a3fd&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/RequiredFields.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var RequiredFieldsvue_type_script_lang_js_ = ({
  props: ['fields', 'identity', 'selectedIdentity', 'selectedLocation', 'clonedLocation'],
  data: function data() {
    return {};
  },
  computed: {
    identityRequirements: function identityRequirements() {
      return this.personalFields.concat(this.locationFields).join(', ');
    },
    personalFields: function personalFields() {
      return this.fields.personal;
    },
    locationFields: function locationFields() {
      return this.fields.location;
    }
  },
  methods: {
    fieldValueFor: function fieldValueFor(field) {
      var useUnclonedIdentity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return useUnclonedIdentity ? this.identity.getPropertyValueByName(field, this.selectedLocation) : this.selectedIdentity.getPropertyValueByName(field, this.clonedLocation);
    }
  }
});
// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_RequiredFieldsvue_type_script_lang_js_ = (RequiredFieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=style&index=0&id=0a29a3fd&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var RequiredFieldsvue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("8Yeu");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_RequiredFieldsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0a29a3fd",
  null
  
)

/* harmony default export */ var RequiredFields = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "q9U9":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".reputation[data-v-22b9e1d6]{padding:5px 12px;border-radius:40px;font-size:10px;margin-bottom:10px;margin-top:-5px;font-weight:bold;background:#f3f6f7;color:#c8c8c8}.reputation.trusted[data-v-22b9e1d6]{background:#159F00;color:#fff}.reputation.untrusted[data-v-22b9e1d6]{background:#ff0707;color:#fff}.app-details[data-v-22b9e1d6]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.app-details .logo[data-v-22b9e1d6]{display:flex;align-items:center;justify-content:center;height:100px;width:100px;border-radius:10px;padding:5px;margin-bottom:20px}.app-details .logo.border[data-v-22b9e1d6]{background:#f3f6f7;border:1px solid #dfe0e1}.app-details .logo img[data-v-22b9e1d6]{height:100%;width:100%}.app-details .logo span[data-v-22b9e1d6]{font-size:10px;font-weight:bold;color:#7a7a7a}.app-details .logo.scam[data-v-22b9e1d6]{font-size:48px;border-radius:50%;color:#ff0707;background:#f3f6f7;border:1px solid #dfe0e1;animation:pulsate 0.5s ease infinite}.app-details .name[data-v-22b9e1d6]{font-size:14px}\n", ""]);


/***/ }),

/***/ "v0zd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("EmAJ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("675b40a3", content, true, {});

/***/ }),

/***/ "ztac":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("q9U9");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("efe49fc8", content, true, {});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9TaWduYXR1cmUudnVlPzZmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvU2lnbmF0dXJlLnZ1ZT9jNTdiIiwid2VicGFjazovLy9zcmMvdmlld3MvcG9wb3V0cy9TaWduYXR1cmUudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1NpZ25hdHVyZS52dWU/YmVjNSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9TaWduYXR1cmUudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlPzM0YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvU2lnbmF0dXJlLnZ1ZT9lZDVmIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80NWI3Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9mYmMyIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzhiZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2Y5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/Y2ExYSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mYmYwIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT80ZDY4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT81MTBkIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1NpZ25hdHVyZS52dWU/NmI2NCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NGYwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBaVksQ0FBZ0IsOGFBQUcsRUFBQyxDOzs7Ozs7Ozs7OztBQ0FyWiwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLG1DQUFtQyx1Q0FBdUMsZ0JBQWdCLHlCQUF5QixrQkFBa0IsT0FBTyxtQkFBbUIsMkRBQTJELHVCQUF1QixtS0FBbUssMkJBQTJCLDRNQUE0TSxxQkFBcUIsMEJBQTBCLCtHQUErRyxnRUFBZ0Usb0NBQW9DLHlCQUF5QixvQ0FBb0Msa0pBQWtKLE9BQU8sd0VBQXdFLHNEQUFzRCxJQUFJLG9FQUFvRSwyQkFBMkIsa0hBQWtILDBCQUEwQixtRkFBbUYsNEJBQTRCLGtDQUFrQyw0REFBNEQsd0JBQXdCLDJMQUEyTCwwQkFBMEIsOEJBQThCLE9BQU8sdURBQXVELFdBQVcseUJBQXlCLGlDQUFpQyxtREFBbUQsT0FBTyw4S0FBOEssV0FBVyx5QkFBeUIsOEJBQThCLCtEQUErRCx5QkFBeUIsZ0JBQWdCLGdDQUFnQywrR0FBK0csT0FBTyxzTEFBc0wsS0FBSywrQkFBK0IsMEJBQTBCLGdDQUFnQyxFQUFFLHNDQUFzQyxzQ0FBc0MsRUFBRSxzQ0FBc0MsaURBQWlELElBQUkscUVBQXFFLHFCQUFxQixxRUFBcUUsK0ZBQStGLHVEQUF1RCxnQ0FBZ0MsZ0JBQWdCLGtCQUFrQixlQUFlLG1CQUFtQiw0SEFB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QUNBOztBQUVBOztBQUVlLCtGOzs7Ozs7O0FDbkJmLDJCQUEyQixtQkFBTyxDQUFDLE1BQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLGdDQUFnQyxpQkFBaUIsbUJBQW1CLGVBQWUsbUJBQW1CLGdCQUFnQixpQkFBaUIsbUJBQW1CLGNBQWMscUNBQXFDLG1CQUFtQixXQUFXLHVDQUF1QyxtQkFBbUIsV0FBVyw4QkFBOEIsa0JBQWtCLGFBQWEsc0JBQXNCLHVCQUF1QixtQkFBbUIsb0NBQW9DLGFBQWEsbUJBQW1CLHVCQUF1QixhQUFhLFlBQVksbUJBQW1CLFlBQVksbUJBQW1CLDJDQUEyQyxtQkFBbUIseUJBQXlCLHdDQUF3QyxZQUFZLFdBQVcseUNBQXlDLGVBQWUsaUJBQWlCLGNBQWMseUNBQXlDLGVBQWUsa0JBQWtCLGNBQWMsbUJBQW1CLHlCQUF5QixxQ0FBcUMsb0NBQW9DLGVBQWU7Ozs7Ozs7O0FDRm5qQzs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFnVTtBQUN0Viw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQWdFO0FBQ2xGLDhDQUE4QyxFOzs7Ozs7O0FDUjlDOztBQUVBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLE1BQTBTO0FBQ2hVLDRDQUE0QyxRQUFTO0FBQ3JEO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsTUFBZ0U7QUFDbEYsOENBQThDLEUiLCJmaWxlIjoiNC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NjFkOGI5ZTgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTYxZDhiOWU4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicsW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJtdWx0aS1wYW5lIHBvcG91dC13aW5kb3dcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJtYWluLXBhbmVsXCJ9LFtfYygnUG9wT3V0QXBwJyx7YXR0cnM6e1wiYXBwXCI6X3ZtLmFwcERhdGF9fSksX3ZtLl92KFwiIFwiKSwoX3ZtLmxpbWl0ZWRNZXNzYWdlcy50b3RhbCA+IDEpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImhhcy1tb3JlXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLkFjdGlvbnNUb3RhbCxfdm0ubGltaXRlZE1lc3NhZ2VzLnRvdGFsKSkpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnBhcnRpY2lwYW50QWNjb3VudHMpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYXJ0aWNpcGFudHNcIn0sW19jKCdsYWJlbCcsW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuQWNjb3VudHNJbnZvbHZlZCkpKV0pLF92bS5fdihcIiBcIiksKCFfdm0ucGFydGljaXBhbnRzQXNTZWxlY3Rvcik/X2MoJ3NlY3Rpb24nLFtfdm0uX2woKF92bS5wYXJ0aWNpcGFudEFjY291bnRzLnNsaWNlKDAsMikpLGZ1bmN0aW9uKHApe3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicGFydGljaXBhbnRcIn0sW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiK192bS5fcyhwLm5ldHdvcmsoKS5uYW1lKStcIiAtIFwiKSxfYygnYicsW192bS5fdihfdm0uX3MocC5zZW5kYWJsZSgpKSldKV0pfSksX3ZtLl92KFwiIFwiKSwoX3ZtLnBhcnRpY2lwYW50QWNjb3VudHMubGVuZ3RoID4gMik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibW9yZS1wYXJ0aWNpcGFudHNcIixvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7X3ZtLnBhcnRpY2lwYW50c0FzU2VsZWN0b3IgPSB0cnVlfX19LFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICArXCIrX3ZtLl9zKF92bS5wYXJ0aWNpcGFudEFjY291bnRzLmxlbmd0aCkrXCIgbW9yZSBhY2NvdW50c1xcbiAgICAgICAgICAgICAgICAgICAgXCIpXSk6X3ZtLl9lKCldLDIpOl9jKCdTZWxlY3QnLHthdHRyczp7XCJib3JkZXJlZFwiOlwiMVwiLFwib3B0aW9uc1wiOl92bS5wYXJ0aWNpcGFudEFjY291bnRzLFwicGFyc2VyXCI6ZnVuY3Rpb24gKHgpIHsgcmV0dXJuICgoeC5uZXR3b3JrKCkubmFtZSkgKyBcIiAtIFwiICsgKHguc2VuZGFibGUoKSkpOyB9fX0pXSwxKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uaXNBcmJpdHJhcnlTaWduYXR1cmUpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYXJ0aWNpcGFudHNcIn0sW19jKCdsYWJlbCcsW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuS2V5c0ludm9sdmVkKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicGFydGljaXBhbnRcIn0sW192bS5fdihfdm0uX3MoX3ZtLmFyYml0cmFyeUtleXBhaXIubmFtZSkpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJmaXhlZC1hY3Rpb25zXCJ9LFsoX3ZtLmlzRGFuZ2Vyb3VzKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZGlzY2xhaW1lciBsZXNzLXBhZCByZWQgY2VudGVyZWRcIixzdGF0aWNTdHlsZTp7XCJtYXJnaW4tYm90dG9tXCI6XCIxMHB4XCJ9fSxbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgICAgICBPbmUgb2YgdGhlIGFjdGlvbnMgaW5jbHVkZWQgd2l0aGluIHRoaXMgdHJhbnNhY3Rpb24gaXMgXCIpLF9jKCdiJyxbX3ZtLl92KFwiZGFuZ2Vyb3VzXCIpXSksX3ZtLl92KFwiLlxcbiAgICAgICAgICAgICAgICBcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhY2NlcHQtZGVueVwifSxbKCFfdm0ucGlubmluZyk/X2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLkRlbnkpLFwiYmlnXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdChmYWxzZSl9fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKCFfdm0ucGlubmluZyk/X2MoJ0J1dHRvbicse2F0dHJzOntcInJlZFwiOl92bS5pc0Rhbmdlcm91cyB8fCAoX3ZtLnJlcHV0YXRpb24gJiYgX3ZtLnJlcHV0YXRpb24uZGVjaW1hbCA8IDApLFwiYmlnXCI6XCIxXCIsXCJibHVlXCI6XCIxXCIsXCJkaXNhYmxlZFwiOl92bS5jYW5ub3RTaWduQXJiaXRyYXJ5LFwidGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuQWxsb3cpfSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5hY2NlcHRlZCgkZXZlbnQpfX19KTpfdm0uX2UoKV0sMSldKV0sMSksX3ZtLl92KFwiIFwiKSwoIV92bS5leHBhbmRlZCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNpZGUtcGFuZWxcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJtZXNzYWdlcy1zY3JvbGxlclwifSxbKCFfdm0uaXNBcmJpdHJhcnlTaWduYXR1cmUgJiYgKF92bS5wZXJzb25hbEZpZWxkcy5sZW5ndGggfHwgX3ZtLmxvY2F0aW9uRmllbGRzLmxlbmd0aCkpP19jKCdSZXF1aXJlZEZpZWxkcycse2F0dHJzOntcImlkZW50aXR5XCI6X3ZtLmlkZW50aXR5LFwiZmllbGRzXCI6X3ZtLmZpZWxkcyxcInNlbGVjdGVkLWlkZW50aXR5XCI6X3ZtLnNlbGVjdGVkSWRlbnRpdHksXCJjbG9uZWQtbG9jYXRpb25cIjpfdm0uY2xvbmVkTG9jYXRpb24sXCJzZWxlY3RlZC1sb2NhdGlvblwiOl92bS5zZWxlY3RlZExvY2F0aW9uLFwic3BsaXQtcGFuZWxzXCI6XCIxXCJ9LG9uOntcInNlbGVjdExvY2F0aW9uXCI6ZnVuY3Rpb24gKHgpIHsgX3ZtLnNlbGVjdGVkTG9jYXRpb24gPSB4OyBfdm0uY2xvbmVkTG9jYXRpb24gPSB4LmNsb25lKCk7IH0sXCJsb2NhdGlvbkZpZWxkXCI6ZnVuY3Rpb24gKGtleSwgdmFsKSB7IHJldHVybiBfdm0uY2xvbmVkTG9jYXRpb25ba2V5XSA9IHZhbDsgfSxcInBlcnNvbmFsRmllbGRcIjpmdW5jdGlvbiAoa2V5LCB2YWwpIHsgcmV0dXJuIF92bS5zZWxlY3RlZElkZW50aXR5LnBlcnNvbmFsW2tleV0gPSB2YWw7IH19fSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfdm0uX2woKF92bS5tZXNzYWdlcyksZnVuY3Rpb24obWVzc2FnZSxpbmRleCl7cmV0dXJuIF9jKCdzZWN0aW9uJyx7cmVmOihcIm1lc3NhZ2VfXCIgKyBpbmRleCkscmVmSW5Gb3I6dHJ1ZSxzdGF0aWNDbGFzczpcIm1lc3NhZ2VzXCIsY2xhc3M6eydkYW5nZXJvdXMnOl92bS5pc0Rhbmdlcm91cyB8fCAoX3ZtLnJlcHV0YWJsZShtZXNzYWdlKSAmJiBfdm0ucmVwdXRhYmxlKG1lc3NhZ2UpLmRlY2ltYWwgPCAwKX19LFsoX3ZtLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwid2hpdGVsaXN0LW92ZXJsYXlcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImluZm9cIn0sW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuUHJldmlvdXNseVdoaXRlbGlzdGVkKSkpXSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtjbGFzczp7J3ByZXZpb3VzLXdoaXRlbGlzdCc6X3ZtLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpfX0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJkZXRhaWxzIGNvbnRyYWN0LWFjdGlvblwifSxbKF92bS5pc0Rhbmdlcm91cyk/X2MoJ3NlY3Rpb24nLHtkaXJlY3RpdmVzOlt7bmFtZTpcInRvb2x0aXBcIixyYXdOYW1lOlwidi10b29sdGlwLnJpZ2h0XCIsdmFsdWU6KHtjb250ZW50Ol92bS5pc0Rhbmdlcm91cywgY2xhc3NlczpbJ2RhbmdlcnRpcCddfSksZXhwcmVzc2lvbjpcIntjb250ZW50OmlzRGFuZ2Vyb3VzLCBjbGFzc2VzOlsnZGFuZ2VydGlwJ119XCIsbW9kaWZpZXJzOntcInJpZ2h0XCI6dHJ1ZX19XSxzdGF0aWNDbGFzczpcImRhbmdlciB3aWdnbGVcIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLWhlbHBcIn0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbKF92bS53aGl0ZWxpc3RlZCAmJiAhX3ZtLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpKT9fYygnaW5wdXQnLHthdHRyczp7XCJ0eXBlXCI6XCJjaGVja2JveFwifSxkb21Qcm9wczp7XCJjaGVja2VkXCI6ISFfdm0uZ2V0V2hpdGVsaXN0KG1lc3NhZ2UpfSxvbjp7XCJjaGFuZ2VcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uYWRkV2hpdGVsaXN0KG1lc3NhZ2UpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdSZXB1dGF0aW9uU2NvcmUnLHtzdGF0aWNDbGFzczpcInNjb3JlXCIsYXR0cnM6e1wicmVwdXRhYmxlXCI6X3ZtLnJlcHV0YWJsZShtZXNzYWdlKSxcInNtYWxsXCI6XCIxXCJ9fSksX3ZtLl92KFwiIFwiKSxfYygnc3Bhbicse29uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLmNvbGxhcHNlKG1lc3NhZ2UpfX19LFtfdm0uX3YoX3ZtLl9zKG1lc3NhZ2UuY29kZSkrXCIgXCIpLF9jKCdpJyx7c3RhdGljQ2xhc3M6XCJjb250cmFjdC1zcGxpdCBpY29uLXJpZ2h0LW9wZW4tYmlnXCJ9KSxfdm0uX3YoXCIgXCIrX3ZtLl9zKG1lc3NhZ2UudHlwZSkpXSldLDEpLF92bS5fdihcIiBcIiksKF92bS5pc0Rhbmdlcm91cyk/X2MoJ3NwYW4nLHtzdGF0aWNDbGFzczpcImRhbmdlci10aXRsZVwifSxbX3ZtLl92KFwiVGhpcyBhY3Rpb24gaXMgXCIpLF9jKCdiJyxbX3ZtLl92KFwiZGFuZ2Vyb3VzXCIpXSksX3ZtLl92KFwiIVwiKV0pOl92bS5fZSgpXSksX3ZtLl92KFwiIFwiKSwoIV92bS5pc0NvbGxhcHNlZChtZXNzYWdlKSk/X2MoJ3NlY3Rpb24nLFtfYygnYnInKSxfdm0uX3YoXCIgXCIpLF92bS5fbCgobWVzc2FnZS5kYXRhKSxmdW5jdGlvbih2YWx1ZSxrZXkpe3JldHVybiAoX3ZtLnZpZXdUeXBlID09PSBfdm0uVklFV19UWVBFUy5IVU1BTik/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInByb3BlcnRpZXNcIn0sW19jKCdsYWJlbCcsW192bS5fdihfdm0uX3Moa2V5KSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzcGxpdC1pbnB1dHNcIn0sWyhfdm0ud2hpdGVsaXN0ZWQgJiYgIV92bS5pc1ByZXZpb3VzbHlXaGl0ZWxpc3RlZChtZXNzYWdlKSk/X2MoJ2lucHV0Jyx7YXR0cnM6e1widHlwZVwiOlwiY2hlY2tib3hcIn0sb246e1wiY2hhbmdlXCI6ZnVuY3Rpb24oJGV2ZW50KXtfdm0udG9nZ2xlV2hpdGVsaXN0UHJvcChfdm0uZ2V0V2hpdGVsaXN0KG1lc3NhZ2UpLCBrZXkpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLCh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ2YWx1ZSBvYmplY3RcIn0sW19jKCdkaXYnLHtyZWY6X3ZtLmhhc2goSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpICsga2V5ICsgX3ZtLmhhc2godmFsdWUpLHJlZkluRm9yOnRydWUsYXR0cnM6e1widi1odG1sXCI6X3ZtLmZvcm1hdEpzb24odmFsdWUsIF92bS5oYXNoKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKStrZXkpfX0pXSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidmFsdWVcIn0sW192bS5fdihfdm0uX3ModmFsdWUpKV0pXSldKTpfdm0uX2UoKX0pLF92bS5fdihcIiBcIiksKF92bS52aWV3VHlwZSA9PT0gX3ZtLlZJRVdfVFlQRVMuSlNPTik/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInByb3BlcnRpZXNcIn0sW19jKCdkaXYnLHtyZWY6X3ZtLmhhc2gobWVzc2FnZS5kYXRhKSxyZWZJbkZvcjp0cnVlLHN0YXRpY0NsYXNzOlwidmFsdWUgb2JqZWN0XCIsYXR0cnM6e1widi1odG1sXCI6X3ZtLmZvcm1hdEpzb24obWVzc2FnZS5kYXRhKX19KV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS52aWV3VHlwZSA9PT0gX3ZtLlZJRVdfVFlQRVMuUklDQVJESUFOKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicHJvcGVydGllc1wifSxbKCFfdm0uaGFzUmljYXJkaWFuQ29udHJhY3QobWVzc2FnZSkpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNvbGxhcHNlZFwifSxbX3ZtLl92KFwiTm8gUmljYXJkaWFuIENvbnRyYWN0XCIpXSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmljYXJkaWFuXCJ9LFtfdm0uX3YoX3ZtLl9zKG1lc3NhZ2UucmljYXJkaWFuKSldKV0pOl92bS5fZSgpXSwyKTpfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiY29sbGFwc2VkXCJ9LFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIrX3ZtLl9zKF92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLkhpZGRlbkFjdGlvbnMpKStcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKV0pXSldKX0pXSwyKSxfdm0uX3YoXCIgXCIpLCghX3ZtLmlzQXJiaXRyYXJ5U2lnbmF0dXJlICYmICFfdm0uaXNEYW5nZXJvdXMpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ3aGl0ZWxpc3QtYmFyXCJ9LFsoIV92bS53aGl0ZWxpc3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbX3ZtLl92KFwiWW91IGNhbiB3aGl0ZWxpc3QgdGhpcyBzbyB0aGF0IHlvdSBkb24ndCBoYXZlIHRvIGtlZXAgcmUtYWNjZXB0aW5nIHRoaXMgdHJhbnNhY3Rpb24uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLndoaXRlbGlzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0IGJsdWVcIn0sW192bS5fdihcIkNoZWNrYm94ZXMgdGhhdCBhcmUgY2hlY2tlZCBjYW4gaGF2ZSB0aGVpciB2YWx1ZXMgY2hhbmdlZCB3aXRob3V0IGJyZWFraW5nIHRoZSB3aGl0ZWxpc3QuXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnU3dpdGNoZXInLHthdHRyczp7XCJzdGF0ZVwiOl92bS53aGl0ZWxpc3RlZH0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ud2hpdGVsaXN0KCRldmVudCl9fX0pXSwxKTpfdm0uX2UoKV0pOl92bS5fZSgpXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnNob3dpbmdSaWRsV2FybmluZyk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJpZGwtcG9wdXBcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImJnXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe192bS5zaG93aW5nUmlkbFdhcm5pbmcgPSBmYWxzZX19fSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94XCJ9LFtfYygnaDInLFtfdm0uX3YoXCJEYW5nZXIhXCIpXSksX3ZtLl92KFwiIFwiKSxfdm0uX20oMCksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdzcGFuJyx7c3RhdGljU3R5bGU6e1wiZm9udC1zaXplXCI6XCI5cHhcIn19LFtfdm0uX3YoXCJSZWxhdGVkIEVudGl0aWVzXCIpXSksX3ZtLl92KFwiIFwiKSxfdm0uX2woKF92bS5yZXB1dGF0aW9uLnJlcHV0YWJsZXMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmRlY2ltYWwgPCAwOyB9KSksZnVuY3Rpb24ocmVwdXRhYmxlKXtyZXR1cm4gX2MoJ2knLHtzdGF0aWNDbGFzczpcImxpbmtcIixvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7X3ZtLm9wZW5JbkJyb3dzZXIoX3ZtLnJpZGxMaW5rKHJlcHV0YWJsZSkpfX19LFtfdm0uX3YoXCJWaWV3IFwiKSxfYygnYicsW192bS5fdihfdm0uX3MocmVwdXRhYmxlLmVudGl0eSkpXSksX3ZtLl92KFwiIG9uIFJJREwuXCIpXSl9KV0sMildKTpfdm0uX2UoKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdwJyx7c3RhdGljU3R5bGU6e1wiZm9udC1zaXplXCI6XCIxMXB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMTNweFwifX0sW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICBVc2VycyBvZiBSSURMIGhhdmUgcmF0ZWQgY29udHJhY3RzIGFuZC9vciBhY3Rpb25zIHdpdGhpbiB0aGlzIHRyYW5zYWN0aW9uIG5lZ2F0aXZlbHkuXFxuICAgICAgICAgICAgICAgIFwiKSxfYygnYicsW192bS5fdihcIlRoaXMgZG9lcyBub3QgbWVhbiBpbmRlZmluaXRlbHkgdGhhdCBpdCBpcyBhIHNjYW0sIGp1c3QgdGhhdCBpdCBpcyBkYW5nZXJvdXMgaW4gc29tZSB3YXkuXCIpXSldKX1dXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcbiAgICA8c2VjdGlvbj5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm11bHRpLXBhbmUgcG9wb3V0LXdpbmRvd1wiPlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwhLS0gTUFJTiBQQU5FTCAtLT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtYWluLXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICA8UG9wT3V0QXBwIDphcHA9XCJhcHBEYXRhXCIgLz5cclxuICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJoYXMtbW9yZVwiIHYtaWY9XCJsaW1pdGVkTWVzc2FnZXMudG90YWwgPiAxXCI+e3tsb2NhbGUobGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuQWN0aW9uc1RvdGFsLGxpbWl0ZWRNZXNzYWdlcy50b3RhbCl9fTwvZmlndXJlPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBhcnRpY2lwYW50c1wiIHYtaWY9XCJwYXJ0aWNpcGFudEFjY291bnRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7bG9jYWxlKGxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLkFjY291bnRzSW52b2x2ZWQpfX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIHYtaWY9XCIhcGFydGljaXBhbnRzQXNTZWxlY3RvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBhcnRpY2lwYW50XCIgdi1mb3I9XCJwIGluIHBhcnRpY2lwYW50QWNjb3VudHMuc2xpY2UoMCwyKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3twLm5ldHdvcmsoKS5uYW1lfX0gLSA8Yj57e3Auc2VuZGFibGUoKX19PC9iPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJtb3JlLXBhcnRpY2lwYW50c1wiIHYtaWY9XCJwYXJ0aWNpcGFudEFjY291bnRzLmxlbmd0aCA+IDJcIiBAY2xpY2s9XCJwYXJ0aWNpcGFudHNBc1NlbGVjdG9yID0gdHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgK3t7cGFydGljaXBhbnRBY2NvdW50cy5sZW5ndGh9fSBtb3JlIGFjY291bnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0IHYtZWxzZSBib3JkZXJlZD1cIjFcIiA6b3B0aW9ucz1cInBhcnRpY2lwYW50QWNjb3VudHNcIiA6cGFyc2VyPVwieCA9PiBgJHt4Lm5ldHdvcmsoKS5uYW1lfSAtICR7eC5zZW5kYWJsZSgpfWBcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGFydGljaXBhbnRzXCIgdi1pZj1cImlzQXJiaXRyYXJ5U2lnbmF0dXJlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7bG9jYWxlKGxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLktleXNJbnZvbHZlZCl9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwYXJ0aWNpcGFudFwiPnt7YXJiaXRyYXJ5S2V5cGFpci5uYW1lfX08L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJmaXhlZC1hY3Rpb25zXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIHYtaWY9XCJpc0Rhbmdlcm91c1wiIGNsYXNzPVwiZGlzY2xhaW1lciBsZXNzLXBhZCByZWQgY2VudGVyZWRcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206MTBweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT25lIG9mIHRoZSBhY3Rpb25zIGluY2x1ZGVkIHdpdGhpbiB0aGlzIHRyYW5zYWN0aW9uIGlzIDxiPmRhbmdlcm91czwvYj4uXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJhY2NlcHQtZGVueVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIERFTlkgVFJBTlNBQ1RJT04gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gOnRleHQ9XCJsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5EZW55KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlnPVwiMVwiIHYtaWY9XCIhcGlubmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cInJldHVyblJlc3VsdChmYWxzZSlcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBBQ0NFUFQgVFJBTlNBQ1RJT04gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gOnJlZD1cImlzRGFuZ2Vyb3VzIHx8IChyZXB1dGF0aW9uICYmIHJlcHV0YXRpb24uZGVjaW1hbCA8IDApXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWc9XCIxXCIgYmx1ZT1cIjFcIiB2LWlmPVwiIXBpbm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImNhbm5vdFNpZ25BcmJpdHJhcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0ZXh0PVwibG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuQWxsb3cpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlPVwiYWNjZXB0ZWRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwhLS1TSURFIFBBTkVMLS0+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2lkZS1wYW5lbFwiIHYtaWY9XCIhZXhwYW5kZWRcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tPHNlY3Rpb24gY2xhc3M9XCJ2aWV3LXR5cGVzXCI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxTZWxlY3QgOnNlbGVjdGVkPVwidmlld1R5cGVcIiBib3JkZXJlZD1cIjFcIi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTpvcHRpb25zPVwidmlld1R5cGVzQXJyYXlcIi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTpwYXJzZXI9XCJ4ID0+IGZvcm1hdFZpZXdUeXBlKHgpXCItLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS12LW9uOnNlbGVjdGVkPVwieCA9PiB2aWV3VHlwZSA9IHhcIj48L1NlbGVjdD4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08L3NlY3Rpb24+LS0+XHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtZXNzYWdlcy1zY3JvbGxlclwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8UmVxdWlyZWRGaWVsZHMgdi1pZj1cIiFpc0FyYml0cmFyeVNpZ25hdHVyZSAmJiAocGVyc29uYWxGaWVsZHMubGVuZ3RoIHx8IGxvY2F0aW9uRmllbGRzLmxlbmd0aClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWRlbnRpdHk9XCJpZGVudGl0eVwiIDpmaWVsZHM9XCJmaWVsZHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c2VsZWN0ZWQtaWRlbnRpdHk9XCJzZWxlY3RlZElkZW50aXR5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsb25lZC1sb2NhdGlvbj1cImNsb25lZExvY2F0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNlbGVjdGVkLWxvY2F0aW9uPVwic2VsZWN0ZWRMb2NhdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGl0LXBhbmVscz1cIjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOnNlbGVjdExvY2F0aW9uPVwieCA9PiB7IHNlbGVjdGVkTG9jYXRpb24gPSB4OyBjbG9uZWRMb2NhdGlvbiA9IHguY2xvbmUoKTsgfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246bG9jYXRpb25GaWVsZD1cIihrZXksIHZhbCkgPT4gY2xvbmVkTG9jYXRpb25ba2V5XSA9IHZhbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246cGVyc29uYWxGaWVsZD1cIihrZXksIHZhbCkgPT4gc2VsZWN0ZWRJZGVudGl0eS5wZXJzb25hbFtrZXldID0gdmFsXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtZXNzYWdlc1wiIDpjbGFzcz1cInsnZGFuZ2Vyb3VzJzppc0Rhbmdlcm91cyB8fCAocmVwdXRhYmxlKG1lc3NhZ2UpICYmIHJlcHV0YWJsZShtZXNzYWdlKS5kZWNpbWFsIDwgMCl9XCIgOnJlZj1cImBtZXNzYWdlXyR7aW5kZXh9YFwiIHYtZm9yPVwiKG1lc3NhZ2UsIGluZGV4KSBpbiBtZXNzYWdlc1wiPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwid2hpdGVsaXN0LW92ZXJsYXlcIiB2LWlmPVwiaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImluZm9cIj57e2xvY2FsZShsYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5QcmV2aW91c2x5V2hpdGVsaXN0ZWQpfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gOmNsYXNzPVwieydwcmV2aW91cy13aGl0ZWxpc3QnOmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpfVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZGV0YWlscyBjb250cmFjdC1hY3Rpb25cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJkYW5nZXIgd2lnZ2xlXCIgdi1pZj1cImlzRGFuZ2Vyb3VzXCIgdi10b29sdGlwLnJpZ2h0PVwie2NvbnRlbnQ6aXNEYW5nZXJvdXMsIGNsYXNzZXM6WydkYW5nZXJ0aXAnXX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uLWhlbHBcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtaWY9XCJ3aGl0ZWxpc3RlZCAmJiAhaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNoZWNrZWQ9XCIhIWdldFdoaXRlbGlzdChtZXNzYWdlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cImFkZFdoaXRlbGlzdChtZXNzYWdlKVwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVwdXRhdGlvblNjb3JlIGNsYXNzPVwic2NvcmVcIiA6cmVwdXRhYmxlPVwicmVwdXRhYmxlKG1lc3NhZ2UpXCIgc21hbGw9XCIxXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gQGNsaWNrPVwiY29sbGFwc2UobWVzc2FnZSlcIj57e21lc3NhZ2UuY29kZX19IDxpIGNsYXNzPVwiY29udHJhY3Qtc3BsaXQgaWNvbi1yaWdodC1vcGVuLWJpZ1wiPjwvaT4ge3ttZXNzYWdlLnR5cGV9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhbmdlci10aXRsZVwiIHYtaWY9XCJpc0Rhbmdlcm91c1wiPlRoaXMgYWN0aW9uIGlzIDxiPmRhbmdlcm91czwvYj4hPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIHYtaWY9XCIhaXNDb2xsYXBzZWQobWVzc2FnZSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9wZXJ0aWVzXCIgdi1mb3I9XCIodmFsdWUsa2V5KSBpbiBtZXNzYWdlLmRhdGFcIiB2LWlmPVwidmlld1R5cGUgPT09IFZJRVdfVFlQRVMuSFVNQU5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7a2V5fX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInNwbGl0LWlucHV0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtaWY9XCJ3aGl0ZWxpc3RlZCAmJiAhaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSlcIiB0eXBlPVwiY2hlY2tib3hcIiBAY2hhbmdlPVwidG9nZ2xlV2hpdGVsaXN0UHJvcChnZXRXaGl0ZWxpc3QobWVzc2FnZSksIGtleSlcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInZhbHVlIG9iamVjdFwiIHYtaWY9XCJ0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6cmVmPVwiaGFzaChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSkgKyBrZXkgKyBoYXNoKHZhbHVlKVwiIDp2LWh0bWw9XCJmb3JtYXRKc29uKHZhbHVlLCBoYXNoKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKStrZXkpXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ2YWx1ZVwiIHYtZWxzZT57e3ZhbHVlfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByb3BlcnRpZXNcIiB2LWlmPVwidmlld1R5cGUgPT09IFZJRVdfVFlQRVMuSlNPTlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUgb2JqZWN0XCIgOnJlZj1cImhhc2gobWVzc2FnZS5kYXRhKVwiIDp2LWh0bWw9XCJmb3JtYXRKc29uKG1lc3NhZ2UuZGF0YSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9wZXJ0aWVzXCIgdi1pZj1cInZpZXdUeXBlID09PSBWSUVXX1RZUEVTLlJJQ0FSRElBTlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY29sbGFwc2VkXCIgdi1pZj1cIiFoYXNSaWNhcmRpYW5Db250cmFjdChtZXNzYWdlKVwiPk5vIFJpY2FyZGlhbiBDb250cmFjdDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwicmljYXJkaWFuXCIgdi1lbHNlPnt7bWVzc2FnZS5yaWNhcmRpYW59fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbGxhcHNlZFwiIHYtZWxzZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2xvY2FsZShsYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5IaWRkZW5BY3Rpb25zKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ3aGl0ZWxpc3QtYmFyXCIgdi1pZj1cIiFpc0FyYml0cmFyeVNpZ25hdHVyZSAmJiAhaXNEYW5nZXJvdXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGV4dFwiIHYtaWY9XCIhd2hpdGVsaXN0ZWRcIj5Zb3UgY2FuIHdoaXRlbGlzdCB0aGlzIHNvIHRoYXQgeW91IGRvbid0IGhhdmUgdG8ga2VlcCByZS1hY2NlcHRpbmcgdGhpcyB0cmFuc2FjdGlvbi48L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGV4dCBibHVlXCIgdi1pZj1cIndoaXRlbGlzdGVkXCI+Q2hlY2tib3hlcyB0aGF0IGFyZSBjaGVja2VkIGNhbiBoYXZlIHRoZWlyIHZhbHVlcyBjaGFuZ2VkIHdpdGhvdXQgYnJlYWtpbmcgdGhlIHdoaXRlbGlzdC48L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICA8U3dpdGNoZXIgOnN0YXRlPVwid2hpdGVsaXN0ZWRcIiBAY2xpY2submF0aXZlPVwid2hpdGVsaXN0XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInJpZGwtcG9wdXBcIiB2LWlmPVwic2hvd2luZ1JpZGxXYXJuaW5nXCI+XHJcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJiZ1wiIEBjbGljaz1cInNob3dpbmdSaWRsV2FybmluZyA9IGZhbHNlXCI+PC9maWd1cmU+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+RGFuZ2VyITwvaDI+XHJcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTFweDsgbGluZS1oZWlnaHQ6IDEzcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgVXNlcnMgb2YgUklETCBoYXZlIHJhdGVkIGNvbnRyYWN0cyBhbmQvb3IgYWN0aW9ucyB3aXRoaW4gdGhpcyB0cmFuc2FjdGlvbiBuZWdhdGl2ZWx5LlxyXG4gICAgICAgICAgICAgICAgICAgIDxiPlRoaXMgZG9lcyBub3QgbWVhbiBpbmRlZmluaXRlbHkgdGhhdCBpdCBpcyBhIHNjYW0sIGp1c3QgdGhhdCBpdCBpcyBkYW5nZXJvdXMgaW4gc29tZSB3YXkuPC9iPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiA5cHg7XCI+UmVsYXRlZCBFbnRpdGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibGlua1wiIHYtZm9yPVwicmVwdXRhYmxlIGluIHJlcHV0YXRpb24ucmVwdXRhYmxlcy5maWx0ZXIoeCA9PiB4LmRlY2ltYWwgPCAwKVwiIEBjbGljaz1cIm9wZW5JbkJyb3dzZXIocmlkbExpbmsocmVwdXRhYmxlKSlcIj5WaWV3IDxiPnt7cmVwdXRhYmxlLmVudGl0eX19PC9iPiBvbiBSSURMLjwvaT5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuICAgIGltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnQHdhbGxldHBhY2svY29yZS9zdG9yZS9jb25zdGFudHMnO1xyXG5cdGltcG9ydCBSZXB1dGF0aW9uU2NvcmUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZXVzYWJsZS9SZXB1dGF0aW9uU2NvcmUnO1xyXG5cdGltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZXVzYWJsZS9TZWFyY2hCYXInO1xyXG5cdGltcG9ydCBKU09ORm9ybWF0dGVyIGZyb20gJ2pzb24tZm9ybWF0dGVyLWpzJ1xyXG5cdGltcG9ydCBIYXNoZXIgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvdXRpbC9IYXNoZXJcIjtcclxuXHRpbXBvcnQgQWNjb3VudCBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQWNjb3VudFwiO1xyXG5cdGltcG9ydCBQb3B1cFNlcnZpY2UgZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3V0aWxpdHkvUG9wdXBTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4uLy4uL21vZGVscy9wb3B1cHMvUG9wdXBcIjtcclxuXHRpbXBvcnQgUGVybWlzc2lvblNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYXBwcy9QZXJtaXNzaW9uU2VydmljZVwiO1xyXG5cdGltcG9ydCB7QmxvY2tjaGFpbnN9IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9CbG9ja2NoYWluc1wiO1xyXG5cdGltcG9ydCB7SWRlbnRpdHlSZXF1aXJlZEZpZWxkc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0lkZW50aXR5XCI7XHJcblx0aW1wb3J0IFJlcXVpcmVkRmllbGRzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHNcIjtcclxuXHRpbXBvcnQgS2V5UGFpclNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL0tleVBhaXJTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFJJRExTZXJ2aWNlLCB7UklETF9BUEl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91dGlsaXR5L1JJRExTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFBvcE91dEFwcCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcFwiO1xyXG5cclxuXHRjb25zdCBWSUVXX1RZUEVTID0ge1xyXG5cdCAgICBIVU1BTjonaHVtYW4nLFxyXG4gICAgICAgIEpTT046J2pzb24nLFxyXG4gICAgICAgIFJJQ0FSRElBTjoncmljYXJkaWFuJyxcclxuICAgIH07XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsncG9wdXAnLCAnZXhwYW5kZWQnLCAncGlubmluZyddLFxyXG5cdFx0Y29tcG9uZW50czp7XHJcblx0XHRcdFBvcE91dEFwcCxcclxuXHRcdFx0UmVwdXRhdGlvblNjb3JlLFxyXG5cdFx0XHRSZXF1aXJlZEZpZWxkcyxcclxuXHRcdFx0U2VhcmNoQmFyLFxyXG5cdFx0fSxcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblx0XHRcdEJsb2NrY2hhaW5zLFxyXG4gICAgICAgICAgICB3aGl0ZWxpc3RlZDpmYWxzZSxcclxuXHRcdFx0d2hpdGVsaXN0czpbXSxcclxuXHRcdFx0YWN0aW9uTGlzdDpbXSxcclxuXHJcbiAgICAgICAgICAgIHZpZXdUeXBlOlZJRVdfVFlQRVMuSFVNQU4sXHJcbiAgICAgICAgICAgIFZJRVdfVFlQRVMsXHJcblxyXG5cdFx0XHRzZWxlY3RlZElkZW50aXR5Om51bGwsXHJcblx0XHRcdHNlbGVjdGVkTG9jYXRpb246bnVsbCxcclxuXHRcdFx0Y2xvbmVkTG9jYXRpb246bnVsbCxcclxuXHRcdFx0aGlkZUNsb3NlQnV0dG9uOmZhbHNlLFxyXG5cclxuXHRcdFx0cmVwdXRhdGlvbjpudWxsLFxyXG4gICAgICAgICAgICBzaG93aW5nUmlkbFdhcm5pbmc6ZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudHNBc1NlbGVjdG9yOmZhbHNlLFxyXG5cdFx0fX0sXHJcblx0XHRjcmVhdGVkKCl7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJZGVudGl0eSA9IHRoaXMuaWRlbnRpdHkuY2xvbmUoKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZExvY2F0aW9uID0gdGhpcy5zZWxlY3RlZElkZW50aXR5LmdldExvY2F0aW9uKCkgfHwgdGhpcy5sb2NhdGlvbnNbMF07XHJcblx0XHRcdHRoaXMuY2xvbmVkTG9jYXRpb24gPSB0aGlzLnNlbGVjdGVkTG9jYXRpb24uY2xvbmUoKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoYXN5bmMoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5sb2FkaW5nUmVwdXRhdGlvbiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5yZXB1dGF0aW9uID0gYXdhaXQgUklETFNlcnZpY2UuY2hlY2tDb250cmFjdHModGhpcy5wYXlsb2FkLm5ldHdvcmssIHRoaXMubWVzc2FnZXMpO1xyXG5cdFx0XHRcdGlmKHRoaXMucmVwdXRhdGlvbiAmJiB0aGlzLnJlcHV0YXRpb24uZGVjaW1hbCA8IDApIHRoaXMuc2hvd2luZ1JpZGxXYXJuaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmdSZXB1dGF0aW9uID0gZmFsc2U7XHJcblx0XHRcdH0sIDUwKTtcclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDoge1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NjYXR0ZXInLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2lkZW50aXR5JyxcclxuXHRcdFx0XHQnaWRlbnRpdGllcycsXHJcblx0XHRcdFx0J2FjY291bnRzJyxcclxuXHRcdFx0XHQnbmV0d29ya3MnLFxyXG4gICAgICAgICAgICAgICAgJ2xvY2F0aW9ucycsXHJcblx0XHRcdF0pLFxyXG5cclxuXHJcblx0XHRcdGFwcERhdGEoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wb3B1cC5kYXRhLnByb3BzLmFwcERhdGE7XHJcblx0XHRcdH0sXHJcblxyXG4gICAgICAgICAgICB2aWV3VHlwZXNBcnJheSgpe1xyXG5cdFx0XHQgICAgY29uc3QgaGFzRW9zID0gIXRoaXMuaXNBcmJpdHJhcnlTaWduYXR1cmUgJiYgISF0aGlzLnBheWxvYWQucGFydGljaXBhbnRzLmZpbmQoeCA9PiBBY2NvdW50LmZyb21Kc29uKHgpLmJsb2NrY2hhaW4oKSA9PT0gQmxvY2tjaGFpbnMuRU9TSU8pO1xyXG5cdFx0XHQgICAgY29uc3QgYXJyTWFwID0gW1ZJRVdfVFlQRVMuSFVNQU4sIFZJRVdfVFlQRVMuSlNPTl07XHJcblx0XHRcdCAgICBpZihoYXNFb3MpIGFyck1hcC5wdXNoKFZJRVdfVFlQRVMuUklDQVJESUFOKTtcclxuXHRcdFx0ICAgIHJldHVybiBhcnJNYXA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBheWxvYWQoKXsgcmV0dXJuIHRoaXMucG9wdXAucGF5bG9hZCgpOyB9LFxyXG5cdFx0XHRwYXJ0aWNpcGFudEFjY291bnRzKCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgncGFydGljaXBhbnRzJykpIHJldHVybiBudWxsO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBheWxvYWQucGFydGljaXBhbnRzLm1hcCh4ID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBBY2NvdW50LmZyb21Kc29uKHgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHRcdFx0fSxcclxuXHRcdFx0bWVzc2FnZXMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXlsb2FkLm1lc3NhZ2VzO1xyXG5cdFx0XHR9LFxyXG4gICAgICAgICAgICBsaW1pdGVkTWVzc2FnZXMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBcdGFjdGlvbnM6dGhpcy5tZXNzYWdlcy5zbGljZSgwLCAzKS5tYXAoeCA9PiB4LnR5cGUpLmpvaW4oJywgJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6dGhpcy5tZXNzYWdlcy5sZW5ndGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHRcdFx0aXNBcmJpdHJhcnlTaWduYXR1cmUoKXtcclxuXHRcdFx0XHRyZXR1cm4gIXRoaXMucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgncGFydGljaXBhbnRzJyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiBJZGVudGl0eVJlcXVpcmVkRmllbGRzLmZyb21Kc29uKHRoaXMucGF5bG9hZC5yZXF1aXJlZEZpZWxkcyB8fCB7fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHBlcnNvbmFsRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLnBlcnNvbmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb2NhdGlvbkZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5sb2NhdGlvbjtcclxuXHRcdFx0fSxcclxuXHRcdFx0bWlzc2luZ0ZpZWxkcygpe1xyXG5cdFx0XHRcdGlmKCF0aGlzLnBlcnNvbmFsRmllbGRzLmxlbmd0aCAmJiAhdGhpcy5sb2NhdGlvbkZpZWxkcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRyZXR1cm4gIXRoaXMuaWRlbnRpdHkuaGFzUmVxdWlyZWRGaWVsZHModGhpcy5maWVsZHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc1ZhbGlkSWRlbnRpdHkoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWRJZGVudGl0eS5oYXNSZXF1aXJlZEZpZWxkcyh0aGlzLmZpZWxkcywgdGhpcy5jbG9uZWRMb2NhdGlvbik7XHJcblx0XHRcdH0sXHJcbiAgICAgICAgICAgIGFyYml0cmFyeUtleXBhaXIoKXtcclxuXHQgICAgICAgICAgICByZXR1cm4gS2V5UGFpclNlcnZpY2UuZ2V0S2V5UGFpckZyb21QdWJsaWNLZXkodGhpcy5wYXlsb2FkLnB1YmxpY0tleSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbm5vdFNpZ25BcmJpdHJhcnkoKXtcclxuXHRcdFx0XHRpZighdGhpcy5pc0FyYml0cmFyeVNpZ25hdHVyZSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBheWxvYWQubWVzc2FnZXNbMF0uZGF0YS5zaWduaW5nLnNwbGl0KCcgJykuc29tZSh4ID0+IHgubGVuZ3RoID4gMTIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0Rhbmdlcm91cygpe1xyXG5cdFx0XHRcdGlmKHRoaXMubWVzc2FnZXMuZmluZCh4ID0+IHguY29kZSA9PT0gJ2Vvc2lvJyAmJiB4LnR5cGUgPT09ICd1cGRhdGVhdXRoJykpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGBUaGlzIGFjdGlvbiBpcyBkYW5nZXJvdXMuIEFjY2VwdGluZyBpdCB3aWxsIGNoYW5nZSB5b3VyIGtleXMgYW5kIHBvc3NpYmx5IGdpdmUgeW91ciBhY2NvdW50IHRvIHNvbWVvbmUgZWxzZS4gPGJyPjxicj48Yj5DaGVjayB0byBtYWtlIHN1cmUgdGhlIGtleXMgYXJlIGNvcnJlY3QuPC9iPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQocmVzdWx0KXtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KCdyZXR1cm5lZCcsIHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblxyXG4gICAgICAgICAgICByZXB1dGFibGUobWVzc2FnZSl7XHJcblx0XHRcdFx0aWYoIXRoaXMucmVwdXRhdGlvbikgcmV0dXJuO1xyXG5cdFx0XHQgICAgcmV0dXJuIHRoaXMucmVwdXRhdGlvbi5yZXB1dGFibGVzLmZpbmQoeCA9PiB4LmNvZGUgPT09IGAke21lc3NhZ2UuY29kZX0ke21lc3NhZ2UudHlwZX1gKTtcclxuICAgICAgICAgICAgfSxcclxuXHRcdFx0cmlkbExpbmsocmVwdXRhYmxlKXtcclxuXHRcdFx0ICAgIHJldHVybiBgJHtSSURMX0FQSX0vcmVwdXRhYmxlP2lkPSR7cmVwdXRhYmxlLmlkfWBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGZvcm1hdFZpZXdUeXBlKHR5cGUpe1xyXG5cdFx0XHQgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVklFV19UWVBFUy5IVU1BTjogcmV0dXJuICdIdW1hbiBSZWFkYWJsZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWSUVXX1RZUEVTLkpTT046IHJldHVybiAnSlNPTiBGb3JtYXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVklFV19UWVBFUy5SSUNBUkRJQU46IHJldHVybiAnUmljYXJkaWFuIENvbnRyYWN0cyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cdFx0XHRjb2xsYXBzZShtZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aW9uKG1lc3NhZ2UsICdjb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNDb2xsYXBzZWQobWVzc2FnZSl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWN0aW9uTGlzdC5maW5kKHggPT4geCA9PT0gdGhpcy5nZXRNZXNzYWdlVW5pcXVlKG1lc3NhZ2UsICdjb2xsYXBzZWQnKSlcclxuICAgICAgICAgICAgfSxcclxuXHJcblx0XHRcdGFzeW5jIGFjY2VwdGVkKCl7XHJcblx0XHRcdFx0dGhpcy5yZXR1cm5SZXN1bHQoe1xyXG5cdFx0XHRcdFx0d2hpdGVsaXN0czp0aGlzLndoaXRlbGlzdHMsXHJcblxyXG5cdFx0XHRcdFx0aWRlbnRpdHk6dGhpcy5zZWxlY3RlZElkZW50aXR5LFxyXG5cdFx0XHRcdFx0bG9jYXRpb246dGhpcy5jbG9uZWRMb2NhdGlvbixcclxuXHRcdFx0XHRcdG1pc3NpbmdGaWVsZHM6dGhpcy5taXNzaW5nRmllbGRzLFxyXG5cclxuXHRcdFx0XHRcdGFjY2VwdGVkOnRydWUsXHJcblx0XHRcdFx0XHRuZWVkUmVzb3VyY2VzOmZhbHNlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0aGFzaChqc29uKXtcclxuXHRcdFx0XHRyZXR1cm4gSGFzaGVyLnVuc2FsdGVkUXVpY2tIYXNoKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Zm9ybWF0SnNvbihqc29uLCBrZXkgPSBudWxsKXtcclxuXHRcdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZWZLZXkgPSAoa2V5ID8ga2V5IDogJycpICsgdGhpcy5oYXNoKGpzb24pO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKGpzb24sIDk5OTk5LCB7XHJcblx0XHRcdFx0XHRcdGhvdmVyUHJldmlld0VuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdGhvdmVyUHJldmlld0FycmF5Q291bnQ6IDEwLFxyXG5cdFx0XHRcdFx0XHRob3ZlclByZXZpZXdGaWVsZENvdW50OiA1LFxyXG5cdFx0XHRcdFx0XHR1c2VUb0pTT046IHRydWVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Y29uc3QgZWxlbSA9IHRoaXMuJHJlZnNbcmVmS2V5XVswXTtcclxuXHRcdFx0XHRcdGlmKGVsZW0uY2hpbGRyZW4ubGVuZ3RoID49IDEpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQoZm9ybWF0dGVyLnJlbmRlcigpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdoaXRlbGlzdCgpe1xyXG5cdFx0XHRcdHRoaXMud2hpdGVsaXN0ZWQgPSAhdGhpcy53aGl0ZWxpc3RlZDtcclxuXHRcdFx0XHR0aGlzLm1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IHtcclxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpKSB0aGlzLmFkZFdoaXRlbGlzdChtZXNzYWdlKTtcclxuXHRcdFx0XHR9KVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHJcblx0XHRcdGdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgYWN0aW9uKXtcclxuXHRcdFx0XHRyZXR1cm4gYCR7bWVzc2FnZS5jb2RlfToke21lc3NhZ2UudHlwZX06JHthY3Rpb259YFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXRXaGl0ZWxpc3QobWVzc2FnZSl7XHJcblx0XHRcdFx0Y29uc3QgdW5pcXVlID0gdGhpcy5nZXRNZXNzYWdlVW5pcXVlKG1lc3NhZ2UsICd3aGl0ZWxpc3QnKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy53aGl0ZWxpc3RzLmZpbmQoeCA9PiB4LnVuaXF1ZSA9PT0gdW5pcXVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0dG9nZ2xlQWN0aW9uKG1lc3NhZ2UsIGFjdGlvbil7XHJcblx0XHRcdFx0Y29uc3QgdW5pcXVlID0gdGhpcy5nZXRNZXNzYWdlVW5pcXVlKG1lc3NhZ2UsIGFjdGlvbik7XHJcblx0XHRcdFx0aWYodGhpcy5hY3Rpb25MaXN0LmluY2x1ZGVzKHVuaXF1ZSkpIHRoaXMuYWN0aW9uTGlzdCA9IHRoaXMuYWN0aW9uTGlzdC5maWx0ZXIoeCA9PiB4ICE9PSB1bmlxdWUpO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy5hY3Rpb25MaXN0LnB1c2godW5pcXVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0QWN0aW9uKG1lc3NhZ2UsIGFjdGlvbil7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWN0aW9uTGlzdC5maW5kKHggPT4geCA9PT0gdGhpcy5nZXRNZXNzYWdlVW5pcXVlKG1lc3NhZ2UsIGFjdGlvbikpXHJcblx0XHRcdH0sXHJcblx0XHRcdGFkZFdoaXRlbGlzdChtZXNzYWdlKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHRoaXMudG9nZ2xlQWN0aW9uKG1lc3NhZ2UsICd3aGl0ZWxpc3QnKTtcclxuXHRcdFx0XHRjb25zdCB1bmlxdWUgPSB0aGlzLmdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgJ3doaXRlbGlzdCcpO1xyXG5cdFx0XHRcdGNvbnN0IHdoaXRlbGlzdCA9IHt1bmlxdWUsIHByb3BzOltdLCBjb2RlOm1lc3NhZ2UuY29kZSwgdHlwZTptZXNzYWdlLnR5cGUsIGZpZWxkczptZXNzYWdlLmRhdGF9O1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLndoaXRlbGlzdHMuZmluZCh4ID0+IHgudW5pcXVlID09PSB3aGl0ZWxpc3QudW5pcXVlKSlcclxuXHRcdFx0XHRcdCB0aGlzLndoaXRlbGlzdHMgPSB0aGlzLndoaXRlbGlzdHMuZmlsdGVyKHggPT4geC51bmlxdWUgIT09IHVuaXF1ZSk7XHJcblx0XHRcdFx0ZWxzZSB0aGlzLndoaXRlbGlzdHMucHVzaCh3aGl0ZWxpc3QpO1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLndoaXRlbGlzdHMubGVuZ3RoID09PSAwKSB0aGlzLndoaXRlbGlzdGVkID0gZmFsc2U7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRvZ2dsZVdoaXRlbGlzdFByb3Aod2hpdGVsaXN0LCBwcm9wKXtcclxuXHRcdFx0XHRpZih3aGl0ZWxpc3QucHJvcHMuaW5jbHVkZXMocHJvcCkpXHJcblx0XHRcdFx0XHR3aGl0ZWxpc3QucHJvcHMgPSB3aGl0ZWxpc3QucHJvcHMuZmlsdGVyKHggPT4geCAhPT0gcHJvcCk7XHJcblx0XHRcdFx0ZWxzZSB3aGl0ZWxpc3QucHJvcHMucHVzaChwcm9wKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSl7XHJcblx0XHRcdFx0aWYodGhpcy5pc0FyYml0cmFyeVNpZ25hdHVyZSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdHJldHVybiBQZXJtaXNzaW9uU2VydmljZS5oYXNBY3Rpb25QZXJtaXNzaW9uKHRoaXMucGF5bG9hZC5vcmlnaW4sIHRoaXMuaWRlbnRpdHksIHRoaXMucGFydGljaXBhbnRBY2NvdW50cywgbWVzc2FnZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGhhc1JpY2FyZGlhbkNvbnRyYWN0KG1lc3NhZ2Upe1xyXG5cdFx0XHRcdHJldHVybiBtZXNzYWdlLmhhc093blByb3BlcnR5KCdyaWNhcmRpYW4nKSAmJiBtZXNzYWdlLnJpY2FyZGlhbi5sZW5ndGhcclxuXHRcdFx0fSxcclxuXHJcbiAgICAgICAgICAgIC4uLm1hcEFjdGlvbnMoW1xyXG4gICAgICAgICAgICBcdEFjdGlvbnMuQUREX1JFU09VUkNFU1xyXG4gICAgICAgICAgICBdKVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcbiAgICBAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuICAgIC5hcHAtZGV0YWlscyB7XHJcbiAgICAgICAgcGFkZGluZzo2MHB4IDYwcHggMzBweDtcclxuICAgIH1cclxuXHJcbiAgICAucmlkbC1wb3B1cCB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHRvcDo3OXB4O1xyXG4gICAgICAgIGxlZnQ6MDtcclxuICAgICAgICByaWdodDowO1xyXG4gICAgICAgIGJvdHRvbTowO1xyXG4gICAgICAgIHotaW5kZXg6OTk5OTtcclxuICAgICAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgLmJnIHtcclxuICAgICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDowO1xyXG4gICAgICAgICAgICBib3R0b206MDtcclxuICAgICAgICAgICAgbGVmdDowO1xyXG4gICAgICAgICAgICByaWdodDowO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMCwgMCwgMC44KTtcclxuICAgICAgICAgICAgei1pbmRleDotMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5ib3gge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiNmZmY7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6NHB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOjMwcHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICBtaW4td2lkdGg6MjUwcHg7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDo0NTBweDtcclxuICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzowIDAgMCAzcHggcmVkLCAwIDAgMCA2cHggd2hpdGU7XHJcblxyXG4gICAgICAgICAgICAubGluayB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnZpZXctdHlwZXMge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBtYXJnaW4tdG9wOi0xMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0Oi0zMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDotMzBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiNmZmY7XHJcbiAgICAgICAgcGFkZGluZzoxMHB4O1xyXG4gICAgICAgIGJveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNSksIDAgMTBweCAyMHB4IHJnYmEoMCwwLDAsMC4wMik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRbdHlwZT1jaGVja2JveF0ge1xyXG4gICAgICAgIGZsZXg6MCAwIGF1dG87XHJcbiAgICAgICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6MTBweDtcclxuICAgICAgICB3aWR0aDoyMHB4O1xyXG4gICAgICAgIGhlaWdodDoyMHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAuaGFzLW1vcmUge1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTokc21hbGw7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgY29sb3I6JHNpbHZlcjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOjRweDtcclxuICAgICAgICBib3JkZXI6MXB4IHNvbGlkICRncmV5O1xyXG4gICAgICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICAgICAgcGFkZGluZzo1cHggOHB4O1xyXG4gICAgICAgIG1hcmdpbjotMjVweCBhdXRvIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLm1lc3NhZ2VzIHtcclxuICAgICAgICBwYWRkaW5nOjIwcHggMCAyMHB4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgICAgICAgJjpub3QoOmZpcnN0LWNoaWxkKXtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDo2MHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnByZXZpb3VzLXdoaXRlbGlzdCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6MC40O1xyXG4gICAgICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNvbGxhcHNlZCB7XHJcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOjEwcHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC53aGl0ZWxpc3Qtb3ZlcmxheSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgICAgICAgICB0b3A6NTBweDtcclxuICAgICAgICAgICAgcmlnaHQ6MDtcclxuICAgICAgICAgICAgei1pbmRleDoyO1xyXG4gICAgICAgICAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICAgICAgICAgLmJveCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDoxNTBweDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MjBweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6I2ZmZjtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICAgICAgLy9ib3JkZXI6MXB4IHNvbGlkICRwcmltYXJ5O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czo0cHg7XHJcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OjAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSksIDAgMTBweCAyMHB4IHJnYmEoMCwwLDAsMC4wMyk7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRldGFpbHMge1xyXG4gICAgICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5jb250cmFjdC1zcGxpdCB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjAgNXB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IGJvdW5jZSAwLjdzIGluZmluaXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBAa2V5ZnJhbWVzIGJvdW5jZSB7XHJcbiAgICAgICAgICAgICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTJweCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgNTAlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgycHgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnByb3BlcnRpZXMge1xyXG5cclxuICAgICAgICAgICAgLnJpY2FyZGlhbiB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC4wNSk7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xNSk7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOjRweDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MTBweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTo1cHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdy14OmF1dG87XHJcbiAgICAgICAgICAgICAgICBtaW4taGVpZ2h0OjE2cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuXHJcbiAgICAgICAgICAgICAgICAmLm9iamVjdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICY6bm90KDpsYXN0LWNoaWxkKXtcclxuICAgICAgICAgICAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbToyMHB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmRhbmdlcm91cyB7XHJcblxyXG4gICAgICAgICAgICAuZGFuZ2VyIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjZweCA1cHggNXB4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93Omluc2V0IDAgNXB4IDEwcHggcmdiYSgwLDAsMCwwLjEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1zaGFkb3c6MCAycHggMCByZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOjRweDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6N3B4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OjEwcHg7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuZGV0YWlscyB7XHJcbiAgICAgICAgICAgICAgICAmLmNvbnRyYWN0LWFjdGlvbiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDpyZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDokcmVkLWdyYWRpZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIGRhcmtyZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6I2ZmZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmRhbmdlci10aXRsZSB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDoxMDAlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyB7XHJcbiAgICAgICAgcGFkZGluZzowO1xyXG4gICAgfVxyXG5cclxuICAgIC5jb250cmFjdC1hY3Rpb24ge1xyXG4gICAgICAgIG1hcmdpbjotMjBweCAtMzBweCAwO1xyXG4gICAgICAgIGJvcmRlci10b3A6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4wNCk7XHJcbiAgICAgICAgcGFkZGluZzoyMHB4IDMwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDokYmx1ZS1ncmFkaWVudDtcclxuICAgICAgICBjb2xvcjokd2hpdGU7XHJcblxyXG4gICAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02MWQ4YjllOCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1NpZ25hdHVyZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD02MWQ4YjllOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI2MWQ4YjllOFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hcHAtZGV0YWlsc1tkYXRhLXYtNjFkOGI5ZThde3BhZGRpbmc6NjBweCA2MHB4IDMwcHh9LnJpZGwtcG9wdXBbZGF0YS12LTYxZDhiOWU4XXtwb3NpdGlvbjpmaXhlZDt0b3A6NzlweDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDt6LWluZGV4Ojk5OTk7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5yaWRsLXBvcHVwIC5iZ1tkYXRhLXYtNjFkOGI5ZThde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgyNTUsMCwwLDAuOCk7ei1pbmRleDotMX0ucmlkbC1wb3B1cCAuYm94W2RhdGEtdi02MWQ4YjllOF17YmFja2dyb3VuZDojZmZmO2JvcmRlci1yYWRpdXM6NHB4O3BhZGRpbmc6MzBweDt0ZXh0LWFsaWduOmNlbnRlcjttaW4td2lkdGg6MjUwcHg7bWF4LXdpZHRoOjQ1MHB4O3dpZHRoOjEwMCU7Ym94LXNoYWRvdzowIDAgMCAzcHggcmVkLCAwIDAgMCA2cHggd2hpdGV9LnJpZGwtcG9wdXAgLmJveCAubGlua1tkYXRhLXYtNjFkOGI5ZThde2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6YmxvY2s7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udmlldy10eXBlc1tkYXRhLXYtNjFkOGI5ZThde3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbi10b3A6LTEwcHg7bWFyZ2luLWxlZnQ6LTMwcHg7bWFyZ2luLXJpZ2h0Oi0zMHB4O2JhY2tncm91bmQ6I2ZmZjtwYWRkaW5nOjEwcHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwwLjA1KSwwIDEwcHggMjBweCByZ2JhKDAsMCwwLDAuMDIpfWlucHV0W3R5cGU9Y2hlY2tib3hdW2RhdGEtdi02MWQ4YjllOF17ZmxleDowIDAgYXV0bzthbGlnbi1zZWxmOmZsZXgtc3RhcnQ7bWFyZ2luLXJpZ2h0OjEwcHg7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcn0uaGFzLW1vcmVbZGF0YS12LTYxZDhiOWU4XXt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTBweDtmb250LXdlaWdodDpib2xkO2NvbG9yOiM3YTdhN2E7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyOjFweCBzb2xpZCAjYzhjOGM4O2Rpc3BsYXk6dGFibGU7cGFkZGluZzo1cHggOHB4O21hcmdpbjotMjVweCBhdXRvIDB9Lm1lc3NhZ2VzW2RhdGEtdi02MWQ4YjllOF17cGFkZGluZzoyMHB4IDAgMjBweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubWVzc2FnZXNbZGF0YS12LTYxZDhiOWU4XTpub3QoOmZpcnN0LWNoaWxkKXttYXJnaW4tdG9wOjYwcHh9Lm1lc3NhZ2VzIC5wcmV2aW91cy13aGl0ZWxpc3RbZGF0YS12LTYxZDhiOWU4XXtvcGFjaXR5OjAuNDtjdXJzb3I6bm90LWFsbG93ZWR9Lm1lc3NhZ2VzIC5jb2xsYXBzZWRbZGF0YS12LTYxZDhiOWU4XXtwYWRkaW5nLXRvcDoxMHB4O2ZvbnQtc2l6ZToxMXB4fS5tZXNzYWdlcyAud2hpdGVsaXN0LW92ZXJsYXlbZGF0YS12LTYxZDhiOWU4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTBweDtyaWdodDowO3otaW5kZXg6MjtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9Lm1lc3NhZ2VzIC53aGl0ZWxpc3Qtb3ZlcmxheSAuYm94W2RhdGEtdi02MWQ4YjllOF17d2lkdGg6MTUwcHg7cGFkZGluZzoyMHB4O2JhY2tncm91bmQ6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjRweDtib3gtc2hhZG93OjAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSksMCAxMHB4IDIwcHggcmdiYSgwLDAsMCwwLjAzKTtmb250LXNpemU6MTNweDtmb250LXdlaWdodDpib2xkfS5tZXNzYWdlcyAuZGV0YWlscyAudGl0bGVbZGF0YS12LTYxZDhiOWU4XXthbGlnbi1pdGVtczpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZvbnQtc2l6ZToxNHB4O2N1cnNvcjpwb2ludGVyfS5tZXNzYWdlcyAuZGV0YWlscyAudGl0bGVbZGF0YS12LTYxZDhiOWU4XTpob3Zlcnt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS5tZXNzYWdlcyAuZGV0YWlscyAuY29udHJhY3Qtc3BsaXRbZGF0YS12LTYxZDhiOWU4XXtwYWRkaW5nOjAgNXB4O2ZvbnQtc2l6ZToxM3B4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2FuaW1hdGlvbjpib3VuY2UtZGF0YS12LTYxZDhiOWU4IDAuN3MgaW5maW5pdGV9QGtleWZyYW1lcyBib3VuY2UtZGF0YS12LTYxZDhiOWU4ezAlLDEwMCV7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTJweCl9NTAle3RyYW5zZm9ybTp0cmFuc2xhdGVYKDJweCl9fS5tZXNzYWdlcyAucHJvcGVydGllcyAucmljYXJkaWFuW2RhdGEtdi02MWQ4YjllOF17YmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDUpO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjE1KTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjEwcHh9Lm1lc3NhZ2VzIC5wcm9wZXJ0aWVzIGxhYmVsW2RhdGEtdi02MWQ4YjllOF17bWFyZ2luLWJvdHRvbTo1cHh9Lm1lc3NhZ2VzIC5wcm9wZXJ0aWVzIC52YWx1ZVtkYXRhLXYtNjFkOGI5ZThde292ZXJmbG93LXg6YXV0bzttaW4taGVpZ2h0OjE2cHg7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6Ym9sZH0ubWVzc2FnZXMgLnByb3BlcnRpZXMgLnZhbHVlLm9iamVjdFtkYXRhLXYtNjFkOGI5ZThde2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjUwMH0ubWVzc2FnZXMgLnByb3BlcnRpZXM6bm90KDpsYXN0LWNoaWxkKSAudmFsdWVbZGF0YS12LTYxZDhiOWU4XXttYXJnaW4tYm90dG9tOjIwcHh9Lm1lc3NhZ2VzLmRhbmdlcm91cyAuZGFuZ2VyW2RhdGEtdi02MWQ4YjllOF17Y3Vyc29yOnBvaW50ZXI7ZmxvYXQ6bGVmdDtwYWRkaW5nOjZweCA1cHggNXB4O2JhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjEpO2JveC1zaGFkb3c6aW5zZXQgMCA1cHggMTBweCByZ2JhKDAsMCwwLDAuMSk7dGV4dC1zaGFkb3c6MCAycHggMCByZ2JhKDAsMCwwLDAuMSk7Ym9yZGVyLXJhZGl1czo0cHg7bWFyZ2luLXRvcDo3cHg7bWFyZ2luLXJpZ2h0OjEwcHh9Lm1lc3NhZ2VzLmRhbmdlcm91cyAuZGV0YWlscy5jb250cmFjdC1hY3Rpb25bZGF0YS12LTYxZDhiOWU4XXtiYWNrZ3JvdW5kOnJlZDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZmYwNzA3IC0yMCUsICNlMjNiM2IgMTAwJSk7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgZGFya3JlZDtjb2xvcjojZmZmfS5tZXNzYWdlcy5kYW5nZXJvdXMgLmRhbmdlci10aXRsZVtkYXRhLXYtNjFkOGI5ZThde2ZvbnQtc2l6ZToxMXB4O3dpZHRoOjEwMCV9Lmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93W2RhdGEtdi02MWQ4YjllOF17cGFkZGluZzowfS5jb250cmFjdC1hY3Rpb25bZGF0YS12LTYxZDhiOWU4XXttYXJnaW46LTIwcHggLTMwcHggMDtib3JkZXItdG9wOjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDQpO3BhZGRpbmc6MjBweCAzMHB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzAwN2ZkNyAwJSwgIzA3OTlmZiAxMDAlKTtjb2xvcjojZmZmfS5jb250cmFjdC1hY3Rpb24gLnRpdGxlIHNwYW5bZGF0YS12LTYxZDhiOWU4XXtmb250LXNpemU6MThweH1cXG5cIiwgXCJcIl0pO1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhcHAtZGV0YWlsc1wifSxbKCFfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJsb2dvXCIsY2xhc3M6eydib3JkZXInOl92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInICYmICFfdm0uYXBwLmltZ319LFsoX3ZtLmFwcC5hcHBsaW5rID09PSAnU2NhdHRlcicpP19jKCdTY2F0dGVyJyk6KF92bS5hcHAuaW1nKT9fYygnaW1nJyx7YXR0cnM6e1wic3JjXCI6X3ZtLmFwcC5pbWd9fSk6X2MoJ3NwYW4nLFtfdm0uX3YoXCJObyBJbWFnZVwiKV0pXSwxKTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJsb2dvIHNjYW1cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLWF0dGVudGlvblwifSldKSxfdm0uX3YoXCIgXCIpLChfdm0ucmlkbEVuYWJsZWQgJiYgX3ZtLmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicpP19jKCdzZWN0aW9uJyxbKF92bS5hcHBSZXB1dGF0aW9uID09PSBmYWxzZSk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCJ9KSxfdm0uX3YoXCIgbG9hZGluZyByZXB1dGF0aW9uXCIpXSk6X2MoJ3NlY3Rpb24nLFsoX3ZtLnVua25vd25SZXB1dGF0aW9uKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uXCJ9LFtfdm0uX3YoXCJVbmtub3duIFJlcHV0YXRpb25cIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvbiB0cnVzdGVkXCJ9LFtfdm0uX3YoXCJUcnVzdHdvcnRoeVwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS51bnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdW50cnVzdGVkXCJ9LFtfdm0uX3YoXCJLbm93biBTY2FtXCIpXSk6X3ZtLl9lKCldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX2MoJ2InLFtfdm0uX3YoX3ZtLl9zKF92bS5hcHAubmFtZSkpXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnN1ZmZpeCk/X2MoJ3NwYW4nLFtfdm0uX3YoX3ZtLl9zKF92bS5zdWZmaXgpKV0pOl92bS5fZSgpXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8IS0tLS0tLS0tLS0tLSBBUFAgREVUQUlMUyAtLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwiYXBwLWRldGFpbHNcIj5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvXCIgdi1pZj1cIiF1bnRydXN0ZWRcIiA6Y2xhc3M9XCJ7J2JvcmRlcic6YXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhYXBwLmltZ31cIj5cclxuXHRcdFx0PFNjYXR0ZXIgdi1pZj1cImFwcC5hcHBsaW5rID09PSAnU2NhdHRlcidcIiAvPlxyXG5cdFx0XHQ8aW1nIHYtZWxzZS1pZj1cImFwcC5pbWdcIiA6c3JjPVwiYXBwLmltZ1wiIC8+XHJcblx0XHRcdDxzcGFuIHYtZWxzZT5ObyBJbWFnZTwvc3Bhbj5cclxuXHRcdDwvZmlndXJlPlxyXG5cdFx0PGZpZ3VyZSBjbGFzcz1cImxvZ28gc2NhbVwiIHYtZWxzZT5cclxuXHRcdFx0PGkgY2xhc3M9XCJpY29uLWF0dGVudGlvblwiPjwvaT5cclxuXHRcdDwvZmlndXJlPlxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInJpZGxFbmFibGVkICYmIGFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcidcIj5cclxuXHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb25cIiB2LWlmPVwiYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2VcIj48aSBjbGFzcz1cImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCI+PC9pPiBsb2FkaW5nIHJlcHV0YXRpb248L2ZpZ3VyZT5cclxuXHRcdFx0PHNlY3Rpb24gdi1lbHNlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cInVua25vd25SZXB1dGF0aW9uXCI+VW5rbm93biBSZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdHJ1c3RlZFwiIHYtaWY9XCJ0cnVzdGVkXCI+VHJ1c3R3b3J0aHk8L2ZpZ3VyZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvbiB1bnRydXN0ZWRcIiB2LWlmPVwidW50cnVzdGVkXCI+S25vd24gU2NhbTwvZmlndXJlPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0PGZpZ3VyZSBjbGFzcz1cIm5hbWVcIj48Yj57e2FwcC5uYW1lfX08L2I+IDxzcGFuIHYtaWY9XCJzdWZmaXhcIj57e3N1ZmZpeH19PC9zcGFuPjwvZmlndXJlPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHttYXBTdGF0ZSwgbWFwR2V0dGVyc30gZnJvbSAndnVleCc7XHJcblx0aW1wb3J0IFNjYXR0ZXIgZnJvbSAnLi4vc3Zncy9TY2F0dGVyT3V0bGluZSdcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0Y29tcG9uZW50czp7U2NhdHRlcn0sXHJcblx0XHRwcm9wczpbJ2FwcCcsICdzdWZmaXgnXSxcclxuXHRcdGNvbXB1dGVkOntcclxuXHRcdFx0Li4ubWFwU3RhdGUoW1xyXG5cdFx0XHRcdCdhcHBSZXB1dGF0aW9uJ1xyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J3JpZGxFbmFibGVkJyxcclxuXHRcdFx0XSksXHJcblx0XHRcdHVua25vd25SZXB1dGF0aW9uKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwUmVwdXRhdGlvbiA9PT0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0cnVzdGVkKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwUmVwdXRhdGlvbiAmJiBwYXJzZUZsb2F0KHRoaXMuYXBwUmVwdXRhdGlvbi5kZWNpbWFsKSA+IDBcclxuXHRcdFx0fSxcclxuXHRcdFx0dW50cnVzdGVkKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwUmVwdXRhdGlvbiAmJiBwYXJzZUZsb2F0KHRoaXMuYXBwUmVwdXRhdGlvbi5kZWNpbWFsKSA8IDBcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5yZXB1dGF0aW9uIHtcclxuXHRcdHBhZGRpbmc6NXB4IDEycHg7XHJcblx0XHRib3JkZXItcmFkaXVzOjQwcHg7XHJcblx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdG1hcmdpbi1ib3R0b206MTBweDtcclxuXHRcdG1hcmdpbi10b3A6LTVweDtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0YmFja2dyb3VuZDokbGlnaHRlcmdyZXk7XHJcblx0XHRjb2xvcjokZ3JleTtcclxuXHJcblx0XHQmLnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRkYXJrZ3JlZW47XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHJcblx0XHQmLnVudHJ1c3RlZCB7XHJcblx0XHRcdGJhY2tncm91bmQ6JHJlZDtcclxuXHRcdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LmFwcC1kZXRhaWxzIHtcclxuXHRcdHRleHQtYWxpZ246Y2VudGVyO1xyXG5cdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcblx0XHQkbG9nbzoxMDBweDtcclxuXHRcdC5sb2dvIHtcclxuXHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdFx0aGVpZ2h0OiRsb2dvO1xyXG5cdFx0XHR3aWR0aDokbG9nbztcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czokcmFkaXVzO1xyXG5cdFx0XHRwYWRkaW5nOjVweDtcclxuXHRcdFx0bWFyZ2luLWJvdHRvbToyMHB4O1xyXG5cclxuXHRcdFx0Ji5ib3JkZXIge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICRsaWdodGVyZ3JleTtcclxuXHRcdFx0XHRib3JkZXI6MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGltZyB7XHJcblx0XHRcdFx0aGVpZ2h0OjEwMCU7XHJcblx0XHRcdFx0d2lkdGg6MTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3BhbiB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0Y29sb3I6JHNpbHZlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ji5zY2FtIHtcclxuXHRcdFx0XHRmb250LXNpemU6IDQ4cHg7XHJcblx0XHRcdFx0Ym9yZGVyLXJhZGl1czo1MCU7XHJcblx0XHRcdFx0Y29sb3I6JHJlZDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cclxuXHRcdFx0XHRhbmltYXRpb246IHB1bHNhdGUgMC41cyBlYXNlIGluZmluaXRlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Lm5hbWUge1xyXG5cdFx0XHRmb250LXNpemU6ICRsYXJnZTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMjJiOWUxZDZcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjY2YmI3Yzc4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5maWVsZHMtdGl0bGVbZGF0YS12LTBhMjlhM2ZkXXttYXJnaW46LTIwcHggLTMwcHggMDtwYWRkaW5nOjIwcHggMzBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwMDdmZDcgMCUsICMwNzk5ZmYgMTAwJSk7Y29sb3I6I2ZmZjtmb250LXNpemU6MThweDttYXJnaW4tYm90dG9tOjIwcHh9LnJlcXVpcmVkLWZpZWxkc1tkYXRhLXYtMGEyOWEzZmRde3BhZGRpbmc6MjBweCAwIDB9XFxuXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJyZXF1aXJlZC1maWVsZHNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJmaWVsZHMtdGl0bGVcIn0sW192bS5fdihcIlxcblxcdFxcdFJlcXVpcmVkIElkZW50aXR5IEZpZWxkc1xcblxcdFwiKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLFtfYygnbGFiZWwnLFtfdm0uX3YoXCJQZXJzb25hbCBpbmZvcm1hdGlvbjpcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRleHRcIn0sW192bS5fdihcIlxcblxcdFxcdFxcdFwiK192bS5fcyhfdm0uaWRlbnRpdHlSZXF1aXJlbWVudHMpK1wiXFxuXFx0XFx0XCIpXSldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJyZXF1aXJlZC1maWVsZHNcIj5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cImZpZWxkcy10aXRsZVwiPlxyXG5cdFx0XHRSZXF1aXJlZCBJZGVudGl0eSBGaWVsZHNcclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0PGxhYmVsPlBlcnNvbmFsIGluZm9ybWF0aW9uOjwvbGFiZWw+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJ0ZXh0XCI+XHJcblx0XHRcdFx0e3tpZGVudGl0eVJlcXVpcmVtZW50c319XHJcblx0XHRcdDwvZmlndXJlPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHsgbWFwQWN0aW9ucywgbWFwR2V0dGVycywgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRwcm9wczpbJ2ZpZWxkcycsICdpZGVudGl0eScsICdzZWxlY3RlZElkZW50aXR5JywgJ3NlbGVjdGVkTG9jYXRpb24nLCAnY2xvbmVkTG9jYXRpb24nXSxcclxuXHJcblx0XHRkYXRhKCl7cmV0dXJuIHtcclxuXHJcblx0XHR9fSxcclxuXHRcdGNvbXB1dGVkOntcclxuXHJcblx0XHRcdGlkZW50aXR5UmVxdWlyZW1lbnRzKCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBlcnNvbmFsRmllbGRzLmNvbmNhdCh0aGlzLmxvY2F0aW9uRmllbGRzKS5qb2luKCcsICcpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cGVyc29uYWxGaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMucGVyc29uYWw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGxvY2F0aW9uRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLmxvY2F0aW9uO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6e1xyXG5cclxuXHRcdFx0ZmllbGRWYWx1ZUZvcihmaWVsZCwgdXNlVW5jbG9uZWRJZGVudGl0eSA9IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gdXNlVW5jbG9uZWRJZGVudGl0eVxyXG5cdFx0XHRcdFx0PyB0aGlzLmlkZW50aXR5LmdldFByb3BlcnR5VmFsdWVCeU5hbWUoZmllbGQsIHRoaXMuc2VsZWN0ZWRMb2NhdGlvbilcclxuXHRcdFx0XHRcdDogdGhpcy5zZWxlY3RlZElkZW50aXR5LmdldFByb3BlcnR5VmFsdWVCeU5hbWUoZmllbGQsIHRoaXMuY2xvbmVkTG9jYXRpb24pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiIHJlbD1cInN0eWxlc2hlZXQvc2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5maWVsZHMtdGl0bGUge1xyXG5cdFx0bWFyZ2luOi0yMHB4IC0zMHB4IDA7XHJcblx0XHRwYWRkaW5nOjIwcHggMzBweDtcclxuXHRcdGJhY2tncm91bmQ6JGJsdWUtZ3JhZGllbnQ7XHJcblx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHRmb250LXNpemU6IDE4cHg7XHJcblxyXG5cdFx0bWFyZ2luLWJvdHRvbToyMHB4O1xyXG5cdH1cclxuXHJcblx0LnJlcXVpcmVkLWZpZWxkcyB7XHJcblx0XHRwYWRkaW5nOjIwcHggMCAwO1xyXG5cdH1cclxuXHJcbjwvc3R5bGU+IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjBhMjlhM2ZkXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIucmVwdXRhdGlvbltkYXRhLXYtMjJiOWUxZDZde3BhZGRpbmc6NXB4IDEycHg7Ym9yZGVyLXJhZGl1czo0MHB4O2ZvbnQtc2l6ZToxMHB4O21hcmdpbi1ib3R0b206MTBweDttYXJnaW4tdG9wOi01cHg7Zm9udC13ZWlnaHQ6Ym9sZDtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Y29sb3I6I2M4YzhjOH0ucmVwdXRhdGlvbi50cnVzdGVkW2RhdGEtdi0yMmI5ZTFkNl17YmFja2dyb3VuZDojMTU5RjAwO2NvbG9yOiNmZmZ9LnJlcHV0YXRpb24udW50cnVzdGVkW2RhdGEtdi0yMmI5ZTFkNl17YmFja2dyb3VuZDojZmYwNzA3O2NvbG9yOiNmZmZ9LmFwcC1kZXRhaWxzW2RhdGEtdi0yMmI5ZTFkNl17dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYXBwLWRldGFpbHMgLmxvZ29bZGF0YS12LTIyYjllMWQ2XXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7aGVpZ2h0OjEwMHB4O3dpZHRoOjEwMHB4O2JvcmRlci1yYWRpdXM6MTBweDtwYWRkaW5nOjVweDttYXJnaW4tYm90dG9tOjIwcHh9LmFwcC1kZXRhaWxzIC5sb2dvLmJvcmRlcltkYXRhLXYtMjJiOWUxZDZde2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTF9LmFwcC1kZXRhaWxzIC5sb2dvIGltZ1tkYXRhLXYtMjJiOWUxZDZde2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmFwcC1kZXRhaWxzIC5sb2dvIHNwYW5bZGF0YS12LTIyYjllMWQ2XXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDpib2xkO2NvbG9yOiM3YTdhN2F9LmFwcC1kZXRhaWxzIC5sb2dvLnNjYW1bZGF0YS12LTIyYjllMWQ2XXtmb250LXNpemU6NDhweDtib3JkZXItcmFkaXVzOjUwJTtjb2xvcjojZmYwNzA3O2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTE7YW5pbWF0aW9uOnB1bHNhdGUgMC41cyBlYXNlIGluZmluaXRlfS5hcHAtZGV0YWlscyAubmFtZVtkYXRhLXYtMjJiOWUxZDZde2ZvbnQtc2l6ZToxNHB4fVxcblwiLCBcIlwiXSk7XG4iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NpZ25hdHVyZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD02MWQ4YjllOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI2NzViNDBhM1wiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjJiOWUxZDYmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJlZmU0OWZjOFwiLCBjb250ZW50LCB0cnVlLCB7fSk7Il0sInNvdXJjZVJvb3QiOiIifQ==