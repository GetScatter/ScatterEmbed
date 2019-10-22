(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "5Pnu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/TransferRequest.vue?vue&type=template&id=f21564e2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window transfer"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"is requesting a transfer"}}),_vm._v(" "),(!_vm.account)?_c('section',[_c('section',{staticClass:"padded"},[_c('Input',{attrs:{"disabled":_vm.amount > 0,"red":_vm.inputError,"big":"1","centered":"1","text":_vm.amount > 0 ? _vm.amount : _vm.customAmount,"placeholder":parseFloat(1).toFixed(_vm.decimals)},on:{"changed":function (x) { return _vm.customAmount = x; }}}),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v("Select Account")]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.network.name))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])])],1)]):_c('section',{staticClass:"padded"},[_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('section',{staticClass:"transfer-details"},[(_vm.amount > 0)?_c('div',[_vm._v(_vm._s(parseFloat(_vm.amount).toFixed(_vm.decimals))+" "+_vm._s(_vm.token.symbol))]):_c('div',[_vm._v(_vm._s(_vm.customAmount)+" "+_vm._s(_vm.token.symbol))]),_vm._v(" "),_c('span',{class:{'small':_vm.to.length > 12}},[_vm._v(_vm._s(_vm.to))])]),_vm._v(" "),(_vm.memo && _vm.memo.length)?_c('section',{staticClass:"memo"},[_c('section',{staticClass:"info-line"},[_c('span',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.GENERIC.Memo)))])]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.memo))])]):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.network.name))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])]),_vm._v(" "),(!_vm.pinning)?_c('section',{staticClass:"fixed-actions"},[_c('Button',{attrs:{"blue":"1","text":_vm.locale(_vm.langKeys.GENERIC.Confirm)},nativeOn:{"click":function($event){return _vm.returnResult(true)}}}),_vm._v(" "),_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Deny)},nativeOn:{"click":function($event){return _vm.returnResult(null)}}})],1):_vm._e()])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"info-line"},[_c('span',[_vm._v("From")])])}]


// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=template&id=f21564e2&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Network.js
var Network = __webpack_require__("78si");
var Network_default = /*#__PURE__*/__webpack_require__.n(Network);

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Keypair.js
var Keypair = __webpack_require__("Hxfq");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/IdGenerator.js
var IdGenerator = __webpack_require__("SDtL");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Token.js
var Token = __webpack_require__("GwxU");
var Token_default = /*#__PURE__*/__webpack_require__.n(Token);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/utility/TokenService.js
var TokenService = __webpack_require__("ONSl");
var TokenService_default = /*#__PURE__*/__webpack_require__.n(TokenService);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/TransferRequest.vue?vue&type=script&lang=js&


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

 // import SearchBar from '../../components/reusable/SearchBar';












/* harmony default export */ var TransferRequestvue_type_script_lang_js_ = ({
  props: ['popup', 'expanded', 'pinning'],
  components: {
    RequiredFields: RequiredFields["a" /* default */],
    PopOutApp: PopOutApp["a" /* default */] // SearchBar,

  },
  data: function data() {
    return {
      searchTerms: '',
      account: null,
      customAmount: 0,
      inputError: false
    };
  },
  created: function created() {
    this.customAmount = parseFloat(0).toFixed(this.decimals);
  },
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['scatter']), {}, Object(vuex_esm["c" /* mapGetters */])(['identity', 'identities', 'accounts', 'networks', 'keypairs']), {
    payload: function payload() {
      return this.popup.payload();
    },
    network: function network() {
      var _this = this;

      return this.networks.find(function (x) {
        return x.unique() === Network_default.a.fromJson(_this.payload.network).unique();
      });
    },
    blockchain: function blockchain() {
      return this.network.blockchain;
    },
    to: function to() {
      return this.payload.to;
    },
    amount: function amount() {
      return parseFloat(this.payload.amount).toFixed(this.decimals);
    },
    options: function options() {
      return this.payload.options || {};
    },
    memo: function memo() {
      return this.payload.memo;
    },
    decimals: function decimals() {
      return this.options.decimals || 4;
    },
    token: function token() {
      return Token_default.a.fromJson({
        contract: this.payload.contract,
        blockchain: this.blockchain,
        symbol: this.payload.symbol,
        decimals: this.options.decimals || PluginRepository.plugin(this.blockchain).defaultDecimals(),
        name: this.payload.symbol
      });
    },
    validAccounts: function validAccounts() {
      var _this2 = this;

      return this.accounts.filter(function (x) {
        return [_this2.network.unique()].includes(x.networkUnique);
      }).filter(function (x) {
        return [_this2.network.blockchain].includes(x.blockchain().toLowerCase());
      }).filter(function (id) {
        return JSON.stringify(id).toLowerCase().indexOf(_this2.searchTerms.toLowerCase()) > -1;
      }).reduce(function (acc, account) {
        if (!acc.find(function (x) {
          return account.network().unique() === x.network().unique() && account.sendable() === x.sendable();
        })) acc.push(account);
        return acc;
      }, []);
    },
    selectedAccounts: function selectedAccounts() {
      var _this3 = this;

      return [this.account].map(function (x) {
        return _this3.formatAccount(x, false);
      });
    },
    currentAmount: function currentAmount() {
      return this.amount > 0 ? this.amount : this.customAmount;
    }
  }),
  methods: {
    returnResult: function returnResult(result) {
      if (!result) return this.$emit('returned', null);
      var amount = this.currentAmount;

      if (this.blockchain === Blockchains["Blockchains"].EOSIO) {
        amount = parseFloat(amount).toFixed(this.decimals);
      } else {
        amount = TokenService_default.a.formatAmount(amount, this.token);
      }

      this.$emit('returned', {
        account: this.account,
        amount: amount
      });
    },
    selectTokenAndAccount: function selectTokenAndAccount() {
      var _this4 = this;

      PopupService["a" /* default */].push(Popup["a" /* Popup */].selectAccount(function (account) {
        if (!account) return;
        _this4.account = account;
      }, this.validAccounts));
    },
    selectAccount: function selectAccount(account) {
      this.inputError = false;
      if (account && this.currentAmount <= 0) return this.inputError = true;
      this.account = account;
    },
    formatAccount: function formatAccount(account) {
      var _this5 = this;

      var select = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return {
        title: account.sendable(),
        description: "",
        actions: [{
          name: select ? this.locale(this.langKeys.GENERIC.Select) : this.locale(this.langKeys.GENERIC.Unselect),
          handler: function handler() {
            return _this5.selectAccount(select ? account : null);
          },
          blue: select,
          red: !select,
          small: 1
        }]
      };
    }
  },
  watch: defineProperty_default()({}, 'customAmount', function customAmount() {
    this.inputError = false;
  })
});
// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_TransferRequestvue_type_script_lang_js_ = (TransferRequestvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=style&index=0&id=f21564e2&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var TransferRequestvue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("zBGh");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_TransferRequestvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "f21564e2",
  null
  
)

/* harmony default export */ var TransferRequest = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8Yeu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("M1sK");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "q1LW":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-f21564e2]{padding:50px 50px 20px 50px}.boxes[data-v-f21564e2]{width:100%}.boxes .box[data-v-f21564e2]{width:100%}.memo[data-v-f21564e2]{text-align:center}.memo>span[data-v-f21564e2]{font-size:13px;color:#0799ff;font-weight:bold}.padded[data-v-f21564e2]{padding:0 30px}.transfer-details[data-v-f21564e2]{text-align:center}.transfer-details span[data-v-f21564e2]{display:block;font-size:22px}.transfer-details div[data-v-f21564e2]{font-size:36px}.transfer-details .blue[data-v-f21564e2]{color:#0799ff}.transfer-details .small[data-v-f21564e2]{font-size:13px}.transfer-details .bold[data-v-f21564e2]{font-weight:800}.popout-list[data-v-f21564e2]{padding-top:0}.popout-list.done[data-v-f21564e2]{opacity:0.3}.popout-list.done[data-v-f21564e2]:hover{opacity:1}.popout-list .search-bar[data-v-f21564e2]{margin-left:-30px}\n", ""]);


/***/ }),

/***/ "q9U9":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".reputation[data-v-22b9e1d6]{padding:5px 12px;border-radius:40px;font-size:10px;margin-bottom:10px;margin-top:-5px;font-weight:bold;background:#f3f6f7;color:#c8c8c8}.reputation.trusted[data-v-22b9e1d6]{background:#159F00;color:#fff}.reputation.untrusted[data-v-22b9e1d6]{background:#ff0707;color:#fff}.app-details[data-v-22b9e1d6]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.app-details .logo[data-v-22b9e1d6]{display:flex;align-items:center;justify-content:center;height:100px;width:100px;border-radius:10px;padding:5px;margin-bottom:20px}.app-details .logo.border[data-v-22b9e1d6]{background:#f3f6f7;border:1px solid #dfe0e1}.app-details .logo img[data-v-22b9e1d6]{height:100%;width:100%}.app-details .logo span[data-v-22b9e1d6]{font-size:10px;font-weight:bold;color:#7a7a7a}.app-details .logo.scam[data-v-22b9e1d6]{font-size:48px;border-radius:50%;color:#ff0707;background:#f3f6f7;border:1px solid #dfe0e1;animation:pulsate 0.5s ease infinite}.app-details .name[data-v-22b9e1d6]{font-size:14px}\n", ""]);


/***/ }),

/***/ "zBGh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zT7j");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "zT7j":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("q1LW");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("8a96d28e", content, true, {});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9UcmFuc2ZlclJlcXVlc3QudnVlPzZjN2UiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL1RyYW5zZmVyUmVxdWVzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVHJhbnNmZXJSZXF1ZXN0LnZ1ZT9hOTMyIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1RyYW5zZmVyUmVxdWVzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/MzRhMCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NDViNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/ZmJjMiIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT84YmQ1Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mOTc4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/ZmJmMCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/NGQ2OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9UcmFuc2ZlclJlcXVlc3QudnVlP2U1YmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzUxMGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVHJhbnNmZXJSZXF1ZXN0LnZ1ZT8xMzFiIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1RyYW5zZmVyUmVxdWVzdC52dWU/ZDk1MiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NGYwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQixxQ0FBcUMsa0JBQWtCLE9BQU8sd0VBQXdFLHlEQUF5RCxxQkFBcUIsY0FBYyxPQUFPLGdMQUFnTCxLQUFLLHdCQUF3Qiw2QkFBNkIsSUFBSSw0QkFBNEIsb0JBQW9CLGdCQUFnQiw4Q0FBOEMsbUNBQW1DLDZCQUE2QixtQkFBbUIsc0RBQXNELHNCQUFzQixnRUFBZ0UsK0NBQStDLDBCQUEwQixxQkFBcUIsMERBQTBELCtCQUErQiwwTkFBME4sT0FBTyw0QkFBNEIscUZBQXFGLG1CQUFtQixnQkFBZ0Isd0JBQXdCLG9MQUFvTCxvQkFBb0IsZ0JBQWdCLDhDQUE4QyxtQ0FBbUMsNkJBQTZCLG1CQUFtQixvRUFBb0Usc0JBQXNCLGdFQUFnRSwrQ0FBK0MsK0NBQStDLDRCQUE0QixlQUFlLE9BQU8sMkRBQTJELFdBQVcseUJBQXlCLGdDQUFnQywyQkFBMkIsT0FBTyw2Q0FBNkMsV0FBVyx5QkFBeUIsZ0NBQWdDO0FBQzMyRSxvQ0FBb0MsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQix3QkFBd0IsZ0NBQWdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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bUIsY0FBYyxxQ0FBcUMsbUJBQW1CLFdBQVcsdUNBQXVDLG1CQUFtQixXQUFXLDhCQUE4QixrQkFBa0IsYUFBYSxzQkFBc0IsdUJBQXVCLG1CQUFtQixvQ0FBb0MsYUFBYSxtQkFBbUIsdUJBQXVCLGFBQWEsWUFBWSxtQkFBbUIsWUFBWSxtQkFBbUIsMkNBQTJDLG1CQUFtQix5QkFBeUIsd0NBQXdDLFlBQVksV0FBVyx5Q0FBeUMsZUFBZSxpQkFBaUIsY0FBYyx5Q0FBeUMsZUFBZSxrQkFBa0IsY0FBYyxtQkFBbUIseUJBQXlCLHFDQUFxQyxvQ0FBb0MsZUFBZTs7Ozs7Ozs7O0FDRm5qQztBQUFBO0FBQUE7QUFBdVksQ0FBZ0Isb2JBQUcsRUFBQyxDOzs7Ozs7O0FDQTNaOztBQUVBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLE1BQXNVO0FBQzVWLDRDQUE0QyxRQUFTO0FBQ3JEO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsTUFBZ0U7QUFDbEYsOENBQThDLEU7Ozs7Ozs7QUNSOUM7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBMFM7QUFDaFUsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFnRTtBQUNsRiw4Q0FBOEMsRSIsImZpbGUiOiI1LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwb3BvdXQtd2luZG93IHRyYW5zZmVyXCJ9LFtfYygnUG9wT3V0QXBwJyx7YXR0cnM6e1wiYXBwXCI6X3ZtLnBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YSxcInN1ZmZpeFwiOlwiaXMgcmVxdWVzdGluZyBhIHRyYW5zZmVyXCJ9fSksX3ZtLl92KFwiIFwiKSwoIV92bS5hY2NvdW50KT9fYygnc2VjdGlvbicsW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYWRkZWRcIn0sW19jKCdJbnB1dCcse2F0dHJzOntcImRpc2FibGVkXCI6X3ZtLmFtb3VudCA+IDAsXCJyZWRcIjpfdm0uaW5wdXRFcnJvcixcImJpZ1wiOlwiMVwiLFwiY2VudGVyZWRcIjpcIjFcIixcInRleHRcIjpfdm0uYW1vdW50ID4gMCA/IF92bS5hbW91bnQgOiBfdm0uY3VzdG9tQW1vdW50LFwicGxhY2Vob2xkZXJcIjpwYXJzZUZsb2F0KDEpLnRvRml4ZWQoX3ZtLmRlY2ltYWxzKX0sb246e1wiY2hhbmdlZFwiOmZ1bmN0aW9uICh4KSB7IHJldHVybiBfdm0uY3VzdG9tQW1vdW50ID0geDsgfX19KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hlc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveCBuZXN0ZWQgYWNjb3VudC1zZWxlY3RvclwiLG9uOntcImNsaWNrXCI6X3ZtLnNlbGVjdFRva2VuQW5kQWNjb3VudH19LFtfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihcIlNlbGVjdCBBY2NvdW50XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuZXR3b3JrXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5uZXR3b3JrLm5hbWUpKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJjaGV2cm9uIGZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwifSldKV0pXSwxKV0pOl9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYWRkZWRcIn0sW19jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ2JyJyksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwidHJhbnNmZXItZGV0YWlsc1wifSxbKF92bS5hbW91bnQgPiAwKT9fYygnZGl2JyxbX3ZtLl92KF92bS5fcyhwYXJzZUZsb2F0KF92bS5hbW91bnQpLnRvRml4ZWQoX3ZtLmRlY2ltYWxzKSkrXCIgXCIrX3ZtLl9zKF92bS50b2tlbi5zeW1ib2wpKV0pOl9jKCdkaXYnLFtfdm0uX3YoX3ZtLl9zKF92bS5jdXN0b21BbW91bnQpK1wiIFwiK192bS5fcyhfdm0udG9rZW4uc3ltYm9sKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzcGFuJyx7Y2xhc3M6eydzbWFsbCc6X3ZtLnRvLmxlbmd0aCA+IDEyfX0sW192bS5fdihfdm0uX3MoX3ZtLnRvKSldKV0pLF92bS5fdihcIiBcIiksKF92bS5tZW1vICYmIF92bS5tZW1vLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIm1lbW9cIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvLWxpbmVcIn0sW19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLk1lbW8pKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NwYW4nLFtfdm0uX3YoX3ZtLl9zKF92bS5tZW1vKSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX3ZtLl9tKDApLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveGVzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94IG5lc3RlZCBhY2NvdW50LXNlbGVjdG9yXCIsb246e1wiY2xpY2tcIjpfdm0uc2VsZWN0VG9rZW5BbmRBY2NvdW50fX0sW19jKCdzZWN0aW9uJyxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KF92bS5fcyhfdm0uYWNjb3VudC5zZW5kYWJsZSgpKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5ldHdvcmtcIn0sW192bS5fdihfdm0uX3MoX3ZtLm5ldHdvcmsubmFtZSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pXSksX3ZtLl92KFwiIFwiKSwoIV92bS5waW5uaW5nKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZml4ZWQtYWN0aW9uc1wifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcImJsdWVcIjpcIjFcIixcInRleHRcIjpfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLkNvbmZpcm0pfSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5yZXR1cm5SZXN1bHQodHJ1ZSl9fX0pLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLkRlbnkpfSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5yZXR1cm5SZXN1bHQobnVsbCl9fX0pXSwxKTpfdm0uX2UoKV0pXSwxKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5mby1saW5lXCJ9LFtfYygnc3BhbicsW192bS5fdihcIkZyb21cIildKV0pfV1cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwicG9wb3V0LXdpbmRvdyB0cmFuc2ZlclwiPlxyXG4gICAgICAgIDxQb3BPdXRBcHAgOmFwcD1cInBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YVwiIHN1ZmZpeD1cImlzIHJlcXVlc3RpbmcgYSB0cmFuc2ZlclwiIC8+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCIhYWNjb3VudFwiPlxyXG5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXQgOmRpc2FibGVkPVwiYW1vdW50ID4gMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIDpyZWQ9XCJpbnB1dEVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgYmlnPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgIGNlbnRlcmVkPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgIDp0ZXh0PVwiYW1vdW50ID4gMCA/IGFtb3VudCA6IGN1c3RvbUFtb3VudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIHYtb246Y2hhbmdlZD1cInggPT4gY3VzdG9tQW1vdW50ID0geFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cInBhcnNlRmxvYXQoMSkudG9GaXhlZChkZWNpbWFscylcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImJveCBuZXN0ZWQgYWNjb3VudC1zZWxlY3RvclwiIEBjbGljaz1cInNlbGVjdFRva2VuQW5kQWNjb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+U2VsZWN0IEFjY291bnQ8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCI+e3tuZXR3b3JrLm5hbWV9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjaGV2cm9uIGZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwiPjwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuXHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBhZGRlZFwiIHYtZWxzZT5cclxuICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwidHJhbnNmZXItZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiYW1vdW50ID4gMFwiPnt7cGFyc2VGbG9hdChhbW91bnQpLnRvRml4ZWQoZGVjaW1hbHMpfX0ge3t0b2tlbi5zeW1ib2x9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiB2LWVsc2U+e3tjdXN0b21BbW91bnR9fSB7e3Rva2VuLnN5bWJvbH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJ7J3NtYWxsJzp0by5sZW5ndGggPiAxMn1cIj57e3RvfX08L3NwYW4+XHJcblxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwibWVtb1wiIHYtaWY9XCJtZW1vICYmIG1lbW8ubGVuZ3RoXCI+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImluZm8tbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7bG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuTWVtbyl9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnt7bWVtb319PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiaW5mby1saW5lXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5Gcm9tPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImJveGVzXCI+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImJveCBuZXN0ZWQgYWNjb3VudC1zZWxlY3RvclwiIEBjbGljaz1cInNlbGVjdFRva2VuQW5kQWNjb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwibmFtZVwiPnt7YWNjb3VudC5zZW5kYWJsZSgpfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm5ldHdvcmtcIj57e25ldHdvcmsubmFtZX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjaGV2cm9uIGZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwiPjwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImZpeGVkLWFjdGlvbnNcIiB2LWlmPVwiIXBpbm5pbmdcIj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gYmx1ZT1cIjFcIiA6dGV4dD1cImxvY2FsZShsYW5nS2V5cy5HRU5FUklDLkNvbmZpcm0pXCIgQGNsaWNrLm5hdGl2ZT1cInJldHVyblJlc3VsdCh0cnVlKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIDp0ZXh0PVwibG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuRGVueSlcIiBAY2xpY2submF0aXZlPVwicmV0dXJuUmVzdWx0KG51bGwpXCIgLz5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHRpbXBvcnQgUG9wT3V0QXBwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAnO1xyXG5cdC8vIGltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZXVzYWJsZS9TZWFyY2hCYXInO1xyXG5cdGltcG9ydCB7SWRlbnRpdHlSZXF1aXJlZEZpZWxkc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0lkZW50aXR5XCI7XHJcblx0aW1wb3J0IE5ldHdvcmsgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL05ldHdvcmtcIjtcclxuXHRpbXBvcnQgUmVxdWlyZWRGaWVsZHMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkc1wiO1xyXG5cdGltcG9ydCBLZXlQYWlyU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIjtcclxuXHRpbXBvcnQgS2V5cGFpciBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvS2V5cGFpclwiO1xyXG5cdGltcG9ydCBJZEdlbmVyYXRvciBmcm9tIFwiQHdhbGxldHBhY2svY29yZS91dGlsL0lkR2VuZXJhdG9yXCI7XHJcblx0aW1wb3J0IFRva2VuIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9Ub2tlblwiO1xyXG5cdGltcG9ydCB7QmxvY2tjaGFpbnN9IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9CbG9ja2NoYWluc1wiO1xyXG5cdGltcG9ydCBUb2tlblNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvdXRpbGl0eS9Ub2tlblNlcnZpY2VcIjtcclxuXHRpbXBvcnQgUG9wdXBTZXJ2aWNlIGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91dGlsaXR5L1BvcHVwU2VydmljZVwiO1xyXG5cdGltcG9ydCB7UG9wdXB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcG9wdXBzL1BvcHVwXCI7XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsncG9wdXAnLCAnZXhwYW5kZWQnLCAncGlubmluZyddLFxyXG5cdFx0Y29tcG9uZW50czp7XHJcblx0XHRcdFJlcXVpcmVkRmllbGRzLFxyXG5cdFx0XHRQb3BPdXRBcHAsXHJcblx0XHRcdC8vIFNlYXJjaEJhcixcclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtyZXR1cm4ge1xyXG5cdFx0XHRzZWFyY2hUZXJtczonJyxcclxuICAgICAgICAgICAgYWNjb3VudDpudWxsLFxyXG5cdFx0XHRjdXN0b21BbW91bnQ6MCxcclxuXHRcdFx0aW5wdXRFcnJvcjpmYWxzZSxcclxuXHRcdH19LFxyXG5cdFx0Y3JlYXRlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUFtb3VudCA9IHBhcnNlRmxvYXQoMCkudG9GaXhlZCh0aGlzLmRlY2ltYWxzKTtcclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDoge1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NjYXR0ZXInXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQnaWRlbnRpdHknLFxyXG5cdFx0XHRcdCdpZGVudGl0aWVzJyxcclxuXHRcdFx0XHQnYWNjb3VudHMnLFxyXG5cdFx0XHRcdCduZXR3b3JrcycsXHJcblx0XHRcdFx0J2tleXBhaXJzJyxcclxuXHRcdFx0XSksXHJcblx0XHRcdHBheWxvYWQoKXsgcmV0dXJuIHRoaXMucG9wdXAucGF5bG9hZCgpOyB9LFxyXG5cdFx0XHRuZXR3b3JrKCl7IHJldHVybiB0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4LnVuaXF1ZSgpID09PSBOZXR3b3JrLmZyb21Kc29uKHRoaXMucGF5bG9hZC5uZXR3b3JrKS51bmlxdWUoKSk7IH0sXHJcbiAgICAgICAgICAgIGJsb2NrY2hhaW4oKXsgcmV0dXJuIHRoaXMubmV0d29yay5ibG9ja2NoYWluOyB9LFxyXG5cdFx0XHR0bygpeyByZXR1cm4gdGhpcy5wYXlsb2FkLnRvOyB9LFxyXG5cdFx0XHRhbW91bnQoKXsgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5wYXlsb2FkLmFtb3VudCkudG9GaXhlZCh0aGlzLmRlY2ltYWxzKTsgfSxcclxuXHRcdFx0b3B0aW9ucygpeyByZXR1cm4gdGhpcy5wYXlsb2FkLm9wdGlvbnMgfHwge307IH0sXHJcblx0XHRcdG1lbW8oKXsgcmV0dXJuIHRoaXMucGF5bG9hZC5tZW1vOyB9LFxyXG5cdFx0XHRkZWNpbWFscygpeyByZXR1cm4gdGhpcy5vcHRpb25zLmRlY2ltYWxzIHx8IDQ7IH0sXHJcbiAgICAgICAgICAgIHRva2VuKCl7XHJcblx0XHRcdCAgICByZXR1cm4gVG9rZW4uZnJvbUpzb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0OnRoaXMucGF5bG9hZC5jb250cmFjdCxcclxuXHRcdFx0XHQgICAgYmxvY2tjaGFpbjp0aGlzLmJsb2NrY2hhaW4sXHJcblx0XHRcdFx0ICAgIHN5bWJvbDp0aGlzLnBheWxvYWQuc3ltYm9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOnRoaXMub3B0aW9ucy5kZWNpbWFscyB8fCBQbHVnaW5SZXBvc2l0b3J5LnBsdWdpbih0aGlzLmJsb2NrY2hhaW4pLmRlZmF1bHREZWNpbWFscygpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6dGhpcy5wYXlsb2FkLnN5bWJvbFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuXHRcdFx0dmFsaWRBY2NvdW50cygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFjY291bnRzXHJcblx0XHRcdFx0XHQuZmlsdGVyKHggPT4gW3RoaXMubmV0d29yay51bmlxdWUoKV0uaW5jbHVkZXMoeC5uZXR3b3JrVW5pcXVlKSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiBbdGhpcy5uZXR3b3JrLmJsb2NrY2hhaW5dLmluY2x1ZGVzKHguYmxvY2tjaGFpbigpLnRvTG93ZXJDYXNlKCkpKVxyXG5cdFx0XHRcdFx0LmZpbHRlcihpZCA9PiBKU09OLnN0cmluZ2lmeShpZCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGVybXMudG9Mb3dlckNhc2UoKSkgPiAtMSlcclxuXHRcdFx0XHRcdC5yZWR1Y2UoKGFjYywgYWNjb3VudCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZighYWNjLmZpbmQoeCA9PiBhY2NvdW50Lm5ldHdvcmsoKS51bmlxdWUoKSA9PT0geC5uZXR3b3JrKCkudW5pcXVlKClcclxuXHRcdFx0XHRcdFx0XHQmJiBhY2NvdW50LnNlbmRhYmxlKCkgPT09IHguc2VuZGFibGUoKSkpIGFjYy5wdXNoKGFjY291bnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHRcdH0sIFtdKVxyXG5cdFx0XHR9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZEFjY291bnRzKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuYWNjb3VudF1cclxuXHQgICAgICAgICAgICAgICAgLm1hcCh4ID0+IHRoaXMuZm9ybWF0QWNjb3VudCh4LCBmYWxzZSkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRBbW91bnQoKXtcclxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5hbW91bnQgPiAwID8gdGhpcy5hbW91bnQgOiB0aGlzLmN1c3RvbUFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6IHtcclxuXHRcdFx0cmV0dXJuUmVzdWx0KHJlc3VsdCl7XHJcblx0XHRcdFx0aWYoIXJlc3VsdCkgcmV0dXJuIHRoaXMuJGVtaXQoJ3JldHVybmVkJywgbnVsbCk7XHJcblxyXG5cdFx0XHRcdGxldCBhbW91bnQgPSB0aGlzLmN1cnJlbnRBbW91bnQ7XHJcblx0XHRcdFx0aWYodGhpcy5ibG9ja2NoYWluID09PSBCbG9ja2NoYWlucy5FT1NJTyl7XHJcblx0XHRcdFx0XHRhbW91bnQgPSBwYXJzZUZsb2F0KGFtb3VudCkudG9GaXhlZCh0aGlzLmRlY2ltYWxzKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YW1vdW50ID0gVG9rZW5TZXJ2aWNlLmZvcm1hdEFtb3VudChhbW91bnQsIHRoaXMudG9rZW4pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLiRlbWl0KCdyZXR1cm5lZCcsIHtcclxuXHRcdFx0XHRcdGFjY291bnQ6dGhpcy5hY2NvdW50LFxyXG5cdFx0XHRcdFx0YW1vdW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdFRva2VuQW5kQWNjb3VudCgpe1xyXG5cdFx0XHRcdFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLnNlbGVjdEFjY291bnQoYWNjb3VudCA9PiB7XHJcblx0XHRcdFx0XHRpZighYWNjb3VudCkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dGhpcy5hY2NvdW50ID0gYWNjb3VudDtcclxuXHRcdFx0XHR9LCB0aGlzLnZhbGlkQWNjb3VudHMpKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RBY2NvdW50KGFjY291bnQpe1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRFcnJvciA9IGZhbHNlO1xyXG5cdFx0XHRcdGlmKGFjY291bnQgJiYgdGhpcy5jdXJyZW50QW1vdW50IDw9IDApXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pbnB1dEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xyXG5cdFx0XHR9LFxyXG4gICAgICAgICAgICBmb3JtYXRBY2NvdW50KGFjY291bnQsIHNlbGVjdCA9IHRydWUpe1xyXG5cdCAgICAgICAgICAgIHJldHVybiB7XHJcblx0XHQgICAgICAgICAgICB0aXRsZTphY2NvdW50LnNlbmRhYmxlKCksXHJcblx0XHQgICAgICAgICAgICBkZXNjcmlwdGlvbjpgYCxcclxuXHRcdCAgICAgICAgICAgIGFjdGlvbnM6W3tcclxuXHRcdFx0ICAgICAgICAgICAgbmFtZTpzZWxlY3RcclxuXHRcdFx0XHRcdFx0XHQ/IHRoaXMubG9jYWxlKHRoaXMubGFuZ0tleXMuR0VORVJJQy5TZWxlY3QpXHJcblx0XHRcdFx0XHRcdFx0OiB0aGlzLmxvY2FsZSh0aGlzLmxhbmdLZXlzLkdFTkVSSUMuVW5zZWxlY3QpLFxyXG5cdFx0XHQgICAgICAgICAgICBoYW5kbGVyOigpID0+IHRoaXMuc2VsZWN0QWNjb3VudChzZWxlY3QgPyBhY2NvdW50IDogbnVsbCksXHJcblx0XHRcdCAgICAgICAgICAgIGJsdWU6c2VsZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWQ6IXNlbGVjdCxcclxuXHRcdFx0ICAgICAgICAgICAgc21hbGw6MSxcclxuXHRcdCAgICAgICAgICAgIH1dXHJcblx0ICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9LFxyXG4gICAgICAgIHdhdGNoOntcclxuXHRcdFx0WydjdXN0b21BbW91bnQnXSgpe1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcbiAgICBAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuICAgIC5hcHAtZGV0YWlscyB7XHJcbiAgICAgICAgcGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5ib3hlcyB7XHJcbiAgICAgICAgd2lkdGg6MTAwJTtcclxuXHJcbiAgICAgICAgLmJveCB7XHJcbiAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLm1lbW8ge1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG5cclxuICAgICAgICA+IHNwYW4ge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkYmx1ZTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5wYWRkZWQge1xyXG4gICAgICAgIHBhZGRpbmc6MCAzMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC50cmFuc2Zlci1kZXRhaWxzIHtcclxuICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGl2IHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmJsdWUge1xyXG4gICAgICAgICAgICBjb2xvcjogJGJsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc21hbGwge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYm9sZCB7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5wb3BvdXQtbGlzdCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6MDtcclxuXHJcbiAgICAgICAgJi5kb25lIHtcclxuICAgICAgICAgICAgb3BhY2l0eTowLjM7XHJcblxyXG4gICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC5zZWFyY2gtYmFyIHtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6LTMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2ZlclJlcXVlc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UcmFuc2ZlclJlcXVlc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWYyMTU2NGUyJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWYyMTU2NGUyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImYyMTU2NGUyXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwLWRldGFpbHNcIn0sWyghX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nb1wiLGNsYXNzOnsnYm9yZGVyJzpfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhX3ZtLmFwcC5pbWd9fSxbKF92bS5hcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInKT9fYygnU2NhdHRlcicpOihfdm0uYXBwLmltZyk/X2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5hcHAuaW1nfX0pOl9jKCdzcGFuJyxbX3ZtLl92KFwiTm8gSW1hZ2VcIildKV0sMSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nbyBzY2FtXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1hdHRlbnRpb25cIn0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnJpZGxFbmFibGVkICYmIF92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInKT9fYygnc2VjdGlvbicsWyhfdm0uYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2UpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSksX3ZtLl92KFwiIGxvYWRpbmcgcmVwdXRhdGlvblwiKV0pOl9jKCdzZWN0aW9uJyxbKF92bS51bmtub3duUmVwdXRhdGlvbik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX3ZtLl92KFwiVW5rbm93biBSZXB1dGF0aW9uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdHJ1c3RlZFwifSxbX3ZtLl92KFwiVHJ1c3R3b3J0aHlcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwifSxbX3ZtLl92KFwiS25vd24gU2NhbVwiKV0pOl92bS5fZSgpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW19jKCdiJyxbX3ZtLl92KF92bS5fcyhfdm0uYXBwLm5hbWUpKV0pLF92bS5fdihcIiBcIiksKF92bS5zdWZmaXgpP19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uc3VmZml4KSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0gQVBQIERFVEFJTFMgLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImFwcC1kZXRhaWxzXCI+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nb1wiIHYtaWY9XCIhdW50cnVzdGVkXCIgOmNsYXNzPVwieydib3JkZXInOmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIWFwcC5pbWd9XCI+XHJcblx0XHRcdDxTY2F0dGVyIHYtaWY9XCJhcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInXCIgLz5cclxuXHRcdFx0PGltZyB2LWVsc2UtaWY9XCJhcHAuaW1nXCIgOnNyYz1cImFwcC5pbWdcIiAvPlxyXG5cdFx0XHQ8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvIHNjYW1cIiB2LWVsc2U+XHJcblx0XHRcdDxpIGNsYXNzPVwiaWNvbi1hdHRlbnRpb25cIj48L2k+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxzZWN0aW9uIHYtaWY9XCJyaWRsRW5hYmxlZCAmJiBhcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cImFwcFJlcHV0YXRpb24gPT09IGZhbHNlXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT4gbG9hZGluZyByZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIHYtZWxzZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJ1bmtub3duUmVwdXRhdGlvblwiPlVua25vd24gUmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHRydXN0ZWRcIiB2LWlmPVwidHJ1c3RlZFwiPlRydXN0d29ydGh5PC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdW50cnVzdGVkXCIgdi1pZj1cInVudHJ1c3RlZFwiPktub3duIFNjYW08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+PGI+e3thcHAubmFtZX19PC9iPiA8c3BhbiB2LWlmPVwic3VmZml4XCI+e3tzdWZmaXh9fTwvc3Bhbj48L2ZpZ3VyZT5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJy4uL3N2Z3MvU2NhdHRlck91dGxpbmUnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6e1NjYXR0ZXJ9LFxyXG5cdFx0cHJvcHM6WydhcHAnLCAnc3VmZml4J10sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnYXBwUmVwdXRhdGlvbidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdyaWRsRW5hYmxlZCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR1bmtub3duUmVwdXRhdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gPT09IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPiAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHVudHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPCAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQucmVwdXRhdGlvbiB7XHJcblx0XHRwYWRkaW5nOjVweCAxMnB4O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czo0MHB4O1xyXG5cdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRtYXJnaW4tYm90dG9tOjEwcHg7XHJcblx0XHRtYXJnaW4tdG9wOi01cHg7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0Y29sb3I6JGdyZXk7XHJcblxyXG5cdFx0Ji50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokZGFya2dyZWVuO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji51bnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRyZWQ7XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5hcHAtZGV0YWlscyB7XHJcblx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG5cdFx0JGxvZ286MTAwcHg7XHJcblx0XHQubG9nbyB7XHJcblx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdGhlaWdodDokbG9nbztcclxuXHRcdFx0d2lkdGg6JGxvZ287XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6JHJhZGl1cztcclxuXHRcdFx0cGFkZGluZzo1cHg7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHJcblx0XHRcdCYuYm9yZGVyIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWcge1xyXG5cdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCYuc2NhbSB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiA0OHB4O1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cdFx0XHRcdGNvbG9yOiRyZWQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHJcblx0XHRcdFx0YW5pbWF0aW9uOiBwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5uYW1lIHtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2U7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjIyYjllMWQ2XCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI2NmJiN2M3OFwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZmllbGRzLXRpdGxlW2RhdGEtdi0wYTI5YTNmZF17bWFyZ2luOi0yMHB4IC0zMHB4IDA7cGFkZGluZzoyMHB4IDMwcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMDA3ZmQ3IDAlLCAjMDc5OWZmIDEwMCUpO2NvbG9yOiNmZmY7Zm9udC1zaXplOjE4cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5yZXF1aXJlZC1maWVsZHNbZGF0YS12LTBhMjlhM2ZkXXtwYWRkaW5nOjIwcHggMCAwfVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicmVxdWlyZWQtZmllbGRzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZmllbGRzLXRpdGxlXCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRSZXF1aXJlZCBJZGVudGl0eSBGaWVsZHNcXG5cXHRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiUGVyc29uYWwgaW5mb3JtYXRpb246XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0XCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRcXHRcIitfdm0uX3MoX3ZtLmlkZW50aXR5UmVxdWlyZW1lbnRzKStcIlxcblxcdFxcdFwiKV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwicmVxdWlyZWQtZmllbGRzXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJmaWVsZHMtdGl0bGVcIj5cclxuXHRcdFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0PHNlY3Rpb24+XHJcblx0XHRcdDxsYWJlbD5QZXJzb25hbCBpbmZvcm1hdGlvbjo8L2xhYmVsPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwidGV4dFwiPlxyXG5cdFx0XHRcdHt7aWRlbnRpdHlSZXF1aXJlbWVudHN9fVxyXG5cdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydmaWVsZHMnLCAnaWRlbnRpdHknLCAnc2VsZWN0ZWRJZGVudGl0eScsICdzZWxlY3RlZExvY2F0aW9uJywgJ2Nsb25lZExvY2F0aW9uJ10sXHJcblxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblxyXG5cdFx0XHRpZGVudGl0eVJlcXVpcmVtZW50cygpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wZXJzb25hbEZpZWxkcy5jb25jYXQodGhpcy5sb2NhdGlvbkZpZWxkcykuam9pbignLCAnKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBlcnNvbmFsRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLnBlcnNvbmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb2NhdGlvbkZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5sb2NhdGlvbjtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHJcblx0XHRcdGZpZWxkVmFsdWVGb3IoZmllbGQsIHVzZVVuY2xvbmVkSWRlbnRpdHkgPSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIHVzZVVuY2xvbmVkSWRlbnRpdHlcclxuXHRcdFx0XHRcdD8gdGhpcy5pZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLnNlbGVjdGVkTG9jYXRpb24pXHJcblx0XHRcdFx0XHQ6IHRoaXMuc2VsZWN0ZWRJZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLmNsb25lZExvY2F0aW9uKTtcclxuXHRcdFx0fSxcclxuXHRcdH1cclxuXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQuZmllbGRzLXRpdGxlIHtcclxuXHRcdG1hcmdpbjotMjBweCAtMzBweCAwO1xyXG5cdFx0cGFkZGluZzoyMHB4IDMwcHg7XHJcblx0XHRiYWNrZ3JvdW5kOiRibHVlLWdyYWRpZW50O1xyXG5cdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0Zm9udC1zaXplOiAxOHB4O1xyXG5cclxuXHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHR9XHJcblxyXG5cdC5yZXF1aXJlZC1maWVsZHMge1xyXG5cdFx0cGFkZGluZzoyMHB4IDAgMDtcclxuXHR9XHJcblxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwYTI5YTNmZFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4fS5ib3hlc1tkYXRhLXYtZjIxNTY0ZTJde3dpZHRoOjEwMCV9LmJveGVzIC5ib3hbZGF0YS12LWYyMTU2NGUyXXt3aWR0aDoxMDAlfS5tZW1vW2RhdGEtdi1mMjE1NjRlMl17dGV4dC1hbGlnbjpjZW50ZXJ9Lm1lbW8+c3BhbltkYXRhLXYtZjIxNTY0ZTJde2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiMwNzk5ZmY7Zm9udC13ZWlnaHQ6Ym9sZH0ucGFkZGVkW2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZzowIDMwcHh9LnRyYW5zZmVyLWRldGFpbHNbZGF0YS12LWYyMTU2NGUyXXt0ZXh0LWFsaWduOmNlbnRlcn0udHJhbnNmZXItZGV0YWlscyBzcGFuW2RhdGEtdi1mMjE1NjRlMl17ZGlzcGxheTpibG9jaztmb250LXNpemU6MjJweH0udHJhbnNmZXItZGV0YWlscyBkaXZbZGF0YS12LWYyMTU2NGUyXXtmb250LXNpemU6MzZweH0udHJhbnNmZXItZGV0YWlscyAuYmx1ZVtkYXRhLXYtZjIxNTY0ZTJde2NvbG9yOiMwNzk5ZmZ9LnRyYW5zZmVyLWRldGFpbHMgLnNtYWxsW2RhdGEtdi1mMjE1NjRlMl17Zm9udC1zaXplOjEzcHh9LnRyYW5zZmVyLWRldGFpbHMgLmJvbGRbZGF0YS12LWYyMTU2NGUyXXtmb250LXdlaWdodDo4MDB9LnBvcG91dC1saXN0W2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZy10b3A6MH0ucG9wb3V0LWxpc3QuZG9uZVtkYXRhLXYtZjIxNTY0ZTJde29wYWNpdHk6MC4zfS5wb3BvdXQtbGlzdC5kb25lW2RhdGEtdi1mMjE1NjRlMl06aG92ZXJ7b3BhY2l0eToxfS5wb3BvdXQtbGlzdCAuc2VhcmNoLWJhcltkYXRhLXYtZjIxNTY0ZTJde21hcmdpbi1sZWZ0Oi0zMHB4fVxcblwiLCBcIlwiXSk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yZXB1dGF0aW9uW2RhdGEtdi0yMmI5ZTFkNl17cGFkZGluZzo1cHggMTJweDtib3JkZXItcmFkaXVzOjQwcHg7Zm9udC1zaXplOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4O21hcmdpbi10b3A6LTVweDtmb250LXdlaWdodDpib2xkO2JhY2tncm91bmQ6I2YzZjZmNztjb2xvcjojYzhjOGM4fS5yZXB1dGF0aW9uLnRydXN0ZWRbZGF0YS12LTIyYjllMWQ2XXtiYWNrZ3JvdW5kOiMxNTlGMDA7Y29sb3I6I2ZmZn0ucmVwdXRhdGlvbi51bnRydXN0ZWRbZGF0YS12LTIyYjllMWQ2XXtiYWNrZ3JvdW5kOiNmZjA3MDc7Y29sb3I6I2ZmZn0uYXBwLWRldGFpbHNbZGF0YS12LTIyYjllMWQ2XXt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5hcHAtZGV0YWlscyAubG9nb1tkYXRhLXYtMjJiOWUxZDZde2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtoZWlnaHQ6MTAwcHg7d2lkdGg6MTAwcHg7Ym9yZGVyLXJhZGl1czoxMHB4O3BhZGRpbmc6NXB4O21hcmdpbi1ib3R0b206MjBweH0uYXBwLWRldGFpbHMgLmxvZ28uYm9yZGVyW2RhdGEtdi0yMmI5ZTFkNl17YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMX0uYXBwLWRldGFpbHMgLmxvZ28gaW1nW2RhdGEtdi0yMmI5ZTFkNl17aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uYXBwLWRldGFpbHMgLmxvZ28gc3BhbltkYXRhLXYtMjJiOWUxZDZde2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6IzdhN2E3YX0uYXBwLWRldGFpbHMgLmxvZ28uc2NhbVtkYXRhLXYtMjJiOWUxZDZde2ZvbnQtc2l6ZTo0OHB4O2JvcmRlci1yYWRpdXM6NTAlO2NvbG9yOiNmZjA3MDc7YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMTthbmltYXRpb246cHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGV9LmFwcC1kZXRhaWxzIC5uYW1lW2RhdGEtdi0yMmI5ZTFkNl17Zm9udC1zaXplOjE0cHh9XFxuXCIsIFwiXCJdKTtcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1mMjE1NjRlMiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2ZlclJlcXVlc3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjIxNTY0ZTImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWYyMTU2NGUyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjhhOTZkMjhlXCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcImVmZTQ5ZmM4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiXSwic291cmNlUm9vdCI6IiJ9