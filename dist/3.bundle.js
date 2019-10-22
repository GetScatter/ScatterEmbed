(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "2qTD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/GetPublicKey.vue?vue&type=template&id=180b6938&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"wants you to provide a public key"}}),_vm._v(" "),_c('section',{staticClass:"get-public-key"},[_c('Button',{attrs:{"blue":"1","big":"1","text":"Select a Key"},nativeOn:{"click":function($event){return _vm.selectKeypair($event)}}}),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('Button',{attrs:{"blue":"1","big":"1","text":"Generate a Key"},nativeOn:{"click":function($event){return _vm.generateNewKey($event)}}})],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"or"},[_c('figure',{staticClass:"text"},[_vm._v("or")])])}]


// CONCATENATED MODULE: ./src/views/popouts/GetPublicKey.vue?vue&type=template&id=180b6938&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("o0o1");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/reusable/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("RNqi");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Network.js
var Network = __webpack_require__("78si");

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");
var KeyPairService_default = /*#__PURE__*/__webpack_require__.n(KeyPairService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Keypair.js
var Keypair = __webpack_require__("Hxfq");
var Keypair_default = /*#__PURE__*/__webpack_require__.n(Keypair);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/IdGenerator.js
var IdGenerator = __webpack_require__("SDtL");
var IdGenerator_default = /*#__PURE__*/__webpack_require__.n(IdGenerator);

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/GetPublicKey.vue?vue&type=script&lang=js&




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











/* harmony default export */ var GetPublicKeyvue_type_script_lang_js_ = ({
  props: ['popup', 'expanded'],
  components: {
    PopOutApp: PopOutApp["a" /* default */],
    RequiredFields: RequiredFields["a" /* default */],
    SearchBar: SearchBar["a" /* default */]
  },
  data: function data() {
    return {
      searchTerms: ''
    };
  },
  created: function created() {},
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['scatter']), {}, Object(vuex_esm["c" /* mapGetters */])(['identities', 'accounts', 'networks', 'keypairs']), {
    payload: function payload() {
      return this.popup.payload();
    },
    blockchain: function blockchain() {
      return this.payload.blockchain;
    }
  }),
  methods: {
    returnResult: function returnResult(result) {
      this.$emit('returned', result);
    },
    selectKeypair: function selectKeypair() {
      var _this = this;

      PopupService["a" /* default */].push(Popup["a" /* Popup */].selectKeypair(function (keypair) {
        if (keypair) _this.returnResult({
          keypair: keypair,
          isNew: false
        });
      }, [this.blockchain]));
    },
    generateNewKey: function () {
      var _generateNewKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2() {
        var _this2 = this;

        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setWorkingScreen(true);
                setTimeout(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee() {
                  var keypair;
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          keypair = Keypair_default.a.placeholder();
                          keypair.name = "".concat(_this2.popup.origin(), "-").concat(IdGenerator_default.a.text(4));
                          _context.next = 4;
                          return KeyPairService_default.a.generateKeyPair(keypair);

                        case 4:
                          _context.next = 6;
                          return KeyPairService_default.a.makePublicKeys(keypair);

                        case 6:
                          keypair.blockchains = [_this2.blockchain];

                          _this2.returnResult({
                            keypair: keypair,
                            isNew: true
                          });

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), 50);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generateNewKey() {
        return _generateNewKey.apply(this, arguments);
      }

      return generateNewKey;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/popouts/GetPublicKey.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_GetPublicKeyvue_type_script_lang_js_ = (GetPublicKeyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/GetPublicKey.vue?vue&type=style&index=0&id=180b6938&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var GetPublicKeyvue_type_style_index_0_id_180b6938_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("H6O3");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/GetPublicKey.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_GetPublicKeyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "180b6938",
  null
  
)

/* harmony default export */ var GetPublicKey = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "7cM5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-180b6938]{padding:50px 50px 20px 50px}.get-public-key[data-v-180b6938]{text-align:center;padding:50px}\n", ""]);


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

/***/ "H6O3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GetPublicKey_vue_vue_type_style_index_0_id_180b6938_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("PujY");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GetPublicKey_vue_vue_type_style_index_0_id_180b6938_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GetPublicKey_vue_vue_type_style_index_0_id_180b6938_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GetPublicKey_vue_vue_type_style_index_0_id_180b6938_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "PujY":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7cM5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("ad0f2e66", content, true, {});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9HZXRQdWJsaWNLZXkudnVlPzRkOGYiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL0dldFB1YmxpY0tleS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT84NTdhIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL0dldFB1YmxpY0tleS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT9lYzk0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlPzM0YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzQ1YjciLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT82OWM4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9mYmMyIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzhiZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2Y5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT84Y2QwIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/ZmJmMCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/NGQ2OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NTEwZCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NGYwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQiw0QkFBNEIsa0JBQWtCLE9BQU8saUZBQWlGLDRCQUE0Qiw2QkFBNkIsZUFBZSxPQUFPLDJDQUEyQyxXQUFXLHlCQUF5QixtQ0FBbUMsaURBQWlELE9BQU8sNkNBQTZDLFdBQVcseUJBQXlCLG9DQUFvQztBQUNsbUIsb0NBQW9DLGFBQWEsMEJBQTBCLHdCQUF3QixvQkFBb0IsaUJBQWlCLGVBQWUsbUJBQW1CLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZ0I3TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSw4QkFEQTtBQUVBO0FBQ0EsMkNBREE7QUFFQSxxREFGQTtBQUdBO0FBSEEsR0FGQTtBQU9BLE1BUEEsa0JBT0E7QUFBQTtBQUNBO0FBREE7QUFFQSxHQVRBO0FBVUEsU0FWQSxxQkFVQSxDQUVBLENBWkE7QUFhQSw4QkFDQSxzQ0FDQSxTQURBLEVBREEsTUFJQSx3Q0FDQSxZQURBLEVBRUEsVUFGQSxFQUdBLFVBSEEsRUFJQSxVQUpBLEVBSkE7QUFVQSxX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Qix5QkFBeUIsd0NBQXdDLFlBQVksV0FBVyx5Q0FBeUMsZUFBZSxpQkFBaUIsY0FBYyx5Q0FBeUMsZUFBZSxrQkFBa0IsY0FBYyxtQkFBbUIseUJBQXlCLHFDQUFxQyxvQ0FBb0MsZUFBZTs7Ozs7Ozs7QUNGbmpDOztBQUVBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLE1BQTBTO0FBQ2hVLDRDQUE0QyxRQUFTO0FBQ3JEO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsTUFBZ0U7QUFDbEYsOENBQThDLEUiLCJmaWxlIjoiMy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicG9wb3V0LXdpbmRvd1wifSxbX2MoJ1BvcE91dEFwcCcse2F0dHJzOntcImFwcFwiOl92bS5wb3B1cC5kYXRhLnByb3BzLmFwcERhdGEsXCJzdWZmaXhcIjpcIndhbnRzIHlvdSB0byBwcm92aWRlIGEgcHVibGljIGtleVwifX0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImdldC1wdWJsaWMta2V5XCJ9LFtfYygnQnV0dG9uJyx7YXR0cnM6e1wiYmx1ZVwiOlwiMVwiLFwiYmlnXCI6XCIxXCIsXCJ0ZXh0XCI6XCJTZWxlY3QgYSBLZXlcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uc2VsZWN0S2V5cGFpcigkZXZlbnQpfX19KSxfdm0uX3YoXCIgXCIpLF92bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF9jKCdCdXR0b24nLHthdHRyczp7XCJibHVlXCI6XCIxXCIsXCJiaWdcIjpcIjFcIixcInRleHRcIjpcIkdlbmVyYXRlIGEgS2V5XCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLmdlbmVyYXRlTmV3S2V5KCRldmVudCl9fX0pXSwxKV0sMSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW2Z1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwib3JcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRleHRcIn0sW192bS5fdihcIm9yXCIpXSldKX1dXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cInBvcG91dC13aW5kb3dcIj5cclxuICAgICAgICA8UG9wT3V0QXBwIDphcHA9XCJwb3B1cC5kYXRhLnByb3BzLmFwcERhdGFcIiBzdWZmaXg9XCJ3YW50cyB5b3UgdG8gcHJvdmlkZSBhIHB1YmxpYyBrZXlcIiAvPlxyXG5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImdldC1wdWJsaWMta2V5XCI+XHJcblxyXG4gICAgICAgICAgICA8QnV0dG9uIGJsdWU9XCIxXCIgYmlnPVwiMVwiIHRleHQ9XCJTZWxlY3QgYSBLZXlcIiBAY2xpY2submF0aXZlPVwic2VsZWN0S2V5cGFpclwiIC8+XHJcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJvclwiPlxyXG4gICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInRleHRcIj5vcjwvZmlndXJlPlxyXG4gICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgPEJ1dHRvbiBibHVlPVwiMVwiIGJpZz1cIjFcIiB0ZXh0PVwiR2VuZXJhdGUgYSBLZXlcIiBAY2xpY2submF0aXZlPVwiZ2VuZXJhdGVOZXdLZXlcIiAvPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHRpbXBvcnQgU2VhcmNoQmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmV1c2FibGUvU2VhcmNoQmFyJztcclxuXHRpbXBvcnQge0lkZW50aXR5UmVxdWlyZWRGaWVsZHN9IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9JZGVudGl0eVwiO1xyXG5cdGltcG9ydCBOZXR3b3JrIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCI7XHJcblx0aW1wb3J0IFJlcXVpcmVkRmllbGRzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHNcIjtcclxuXHRpbXBvcnQgS2V5UGFpclNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvc2VjdXJlL0tleVBhaXJTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IEtleXBhaXIgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0tleXBhaXJcIjtcclxuXHRpbXBvcnQgSWRHZW5lcmF0b3IgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvdXRpbC9JZEdlbmVyYXRvclwiO1xyXG5cdGltcG9ydCBQb3BPdXRBcHAgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHBcIjtcclxuXHRpbXBvcnQgUG9wdXBTZXJ2aWNlIGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91dGlsaXR5L1BvcHVwU2VydmljZVwiO1xyXG5cdGltcG9ydCB7UG9wdXB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcG9wdXBzL1BvcHVwXCI7XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsncG9wdXAnLCAnZXhwYW5kZWQnXSxcclxuXHRcdGNvbXBvbmVudHM6e1xyXG5cdFx0XHRQb3BPdXRBcHAsXHJcblx0XHRcdFJlcXVpcmVkRmllbGRzLFxyXG5cdFx0XHRTZWFyY2hCYXIsXHJcblx0XHR9LFxyXG5cdFx0ZGF0YSAoKSB7cmV0dXJuIHtcclxuXHRcdFx0c2VhcmNoVGVybXM6JycsXHJcblx0XHR9fSxcclxuXHRcdGNyZWF0ZWQoKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y29tcHV0ZWQ6IHtcclxuXHRcdFx0Li4ubWFwU3RhdGUoW1xyXG5cdFx0XHRcdCdzY2F0dGVyJ1xyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2lkZW50aXRpZXMnLFxyXG5cdFx0XHRcdCdhY2NvdW50cycsXHJcblx0XHRcdFx0J25ldHdvcmtzJyxcclxuICAgICAgICAgICAgICAgICdrZXlwYWlycycsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRwYXlsb2FkKCl7IHJldHVybiB0aGlzLnBvcHVwLnBheWxvYWQoKTsgfSxcclxuICAgICAgICAgICAgYmxvY2tjaGFpbigpeyByZXR1cm4gdGhpcy5wYXlsb2FkLmJsb2NrY2hhaW47IH0sXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQocmVzdWx0KXtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KCdyZXR1cm5lZCcsIHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdEtleXBhaXIoKXtcclxuICAgICAgICAgICAgICAgIFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLnNlbGVjdEtleXBhaXIoa2V5cGFpciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoa2V5cGFpcikgdGhpcy5yZXR1cm5SZXN1bHQoe2tleXBhaXIsIGlzTmV3OmZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICB9LCBbdGhpcy5ibG9ja2NoYWluXSkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhc3luYyBnZW5lcmF0ZU5ld0tleSgpe1xyXG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZ1NjcmVlbih0cnVlKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IGtleXBhaXIgPSBLZXlwYWlyLnBsYWNlaG9sZGVyKCk7XHJcblx0XHRcdFx0XHRrZXlwYWlyLm5hbWUgPSBgJHt0aGlzLnBvcHVwLm9yaWdpbigpfS0ke0lkR2VuZXJhdG9yLnRleHQoNCl9YDtcclxuXHRcdFx0XHRcdGF3YWl0IEtleVBhaXJTZXJ2aWNlLmdlbmVyYXRlS2V5UGFpcihrZXlwYWlyKTtcclxuXHRcdFx0XHRcdGF3YWl0IEtleVBhaXJTZXJ2aWNlLm1ha2VQdWJsaWNLZXlzKGtleXBhaXIpO1xyXG5cdFx0XHRcdFx0a2V5cGFpci5ibG9ja2NoYWlucyA9IFt0aGlzLmJsb2NrY2hhaW5dO1xyXG5cdFx0XHRcdFx0dGhpcy5yZXR1cm5SZXN1bHQoe2tleXBhaXIsIGlzTmV3OnRydWV9KTtcclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSxcclxuXHRcdH1cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiIHJlbD1cInN0eWxlc2hlZXQvc2Nzc1wiPlxyXG4gICAgQGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcbiAgICAuYXBwLWRldGFpbHMge1xyXG4gICAgICAgIHBhZGRpbmc6NTBweCA1MHB4IDIwcHggNTBweDtcclxuICAgIH1cclxuXHJcbiAgICAuZ2V0LXB1YmxpYy1rZXkge1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6NTBweDtcclxuICAgIH1cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vR2V0UHVibGljS2V5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vR2V0UHVibGljS2V5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xODBiNjkzOCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xODBiNjkzOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxODBiNjkzOFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi0xODBiNjkzOF17cGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4fS5nZXQtcHVibGljLWtleVtkYXRhLXYtMTgwYjY5Mzhde3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6NTBweH1cXG5cIiwgXCJcIl0pO1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MTgwYjY5Mzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vR2V0UHVibGljS2V5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTE4MGI2OTM4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwLWRldGFpbHNcIn0sWyghX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nb1wiLGNsYXNzOnsnYm9yZGVyJzpfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhX3ZtLmFwcC5pbWd9fSxbKF92bS5hcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInKT9fYygnU2NhdHRlcicpOihfdm0uYXBwLmltZyk/X2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5hcHAuaW1nfX0pOl9jKCdzcGFuJyxbX3ZtLl92KFwiTm8gSW1hZ2VcIildKV0sMSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nbyBzY2FtXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1hdHRlbnRpb25cIn0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnJpZGxFbmFibGVkICYmIF92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInKT9fYygnc2VjdGlvbicsWyhfdm0uYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2UpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSksX3ZtLl92KFwiIGxvYWRpbmcgcmVwdXRhdGlvblwiKV0pOl9jKCdzZWN0aW9uJyxbKF92bS51bmtub3duUmVwdXRhdGlvbik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX3ZtLl92KFwiVW5rbm93biBSZXB1dGF0aW9uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdHJ1c3RlZFwifSxbX3ZtLl92KFwiVHJ1c3R3b3J0aHlcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwifSxbX3ZtLl92KFwiS25vd24gU2NhbVwiKV0pOl92bS5fZSgpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW19jKCdiJyxbX3ZtLl92KF92bS5fcyhfdm0uYXBwLm5hbWUpKV0pLF92bS5fdihcIiBcIiksKF92bS5zdWZmaXgpP19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uc3VmZml4KSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0gQVBQIERFVEFJTFMgLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImFwcC1kZXRhaWxzXCI+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nb1wiIHYtaWY9XCIhdW50cnVzdGVkXCIgOmNsYXNzPVwieydib3JkZXInOmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIWFwcC5pbWd9XCI+XHJcblx0XHRcdDxTY2F0dGVyIHYtaWY9XCJhcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInXCIgLz5cclxuXHRcdFx0PGltZyB2LWVsc2UtaWY9XCJhcHAuaW1nXCIgOnNyYz1cImFwcC5pbWdcIiAvPlxyXG5cdFx0XHQ8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvIHNjYW1cIiB2LWVsc2U+XHJcblx0XHRcdDxpIGNsYXNzPVwiaWNvbi1hdHRlbnRpb25cIj48L2k+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxzZWN0aW9uIHYtaWY9XCJyaWRsRW5hYmxlZCAmJiBhcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cImFwcFJlcHV0YXRpb24gPT09IGZhbHNlXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT4gbG9hZGluZyByZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIHYtZWxzZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJ1bmtub3duUmVwdXRhdGlvblwiPlVua25vd24gUmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHRydXN0ZWRcIiB2LWlmPVwidHJ1c3RlZFwiPlRydXN0d29ydGh5PC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdW50cnVzdGVkXCIgdi1pZj1cInVudHJ1c3RlZFwiPktub3duIFNjYW08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+PGI+e3thcHAubmFtZX19PC9iPiA8c3BhbiB2LWlmPVwic3VmZml4XCI+e3tzdWZmaXh9fTwvc3Bhbj48L2ZpZ3VyZT5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJy4uL3N2Z3MvU2NhdHRlck91dGxpbmUnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6e1NjYXR0ZXJ9LFxyXG5cdFx0cHJvcHM6WydhcHAnLCAnc3VmZml4J10sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnYXBwUmVwdXRhdGlvbidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdyaWRsRW5hYmxlZCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR1bmtub3duUmVwdXRhdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gPT09IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPiAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHVudHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPCAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQucmVwdXRhdGlvbiB7XHJcblx0XHRwYWRkaW5nOjVweCAxMnB4O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czo0MHB4O1xyXG5cdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRtYXJnaW4tYm90dG9tOjEwcHg7XHJcblx0XHRtYXJnaW4tdG9wOi01cHg7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0Y29sb3I6JGdyZXk7XHJcblxyXG5cdFx0Ji50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokZGFya2dyZWVuO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji51bnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRyZWQ7XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5hcHAtZGV0YWlscyB7XHJcblx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG5cdFx0JGxvZ286MTAwcHg7XHJcblx0XHQubG9nbyB7XHJcblx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdGhlaWdodDokbG9nbztcclxuXHRcdFx0d2lkdGg6JGxvZ287XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6JHJhZGl1cztcclxuXHRcdFx0cGFkZGluZzo1cHg7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHJcblx0XHRcdCYuYm9yZGVyIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWcge1xyXG5cdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCYuc2NhbSB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiA0OHB4O1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cdFx0XHRcdGNvbG9yOiRyZWQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHJcblx0XHRcdFx0YW5pbWF0aW9uOiBwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5uYW1lIHtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2U7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjIyYjllMWQ2XCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI2NmJiN2M3OFwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MTgwYjY5Mzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiYWQwZjJlNjZcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmZpZWxkcy10aXRsZVtkYXRhLXYtMGEyOWEzZmRde21hcmdpbjotMjBweCAtMzBweCAwO3BhZGRpbmc6MjBweCAzMHB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzAwN2ZkNyAwJSwgIzA3OTlmZiAxMDAlKTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxOHB4O21hcmdpbi1ib3R0b206MjBweH0ucmVxdWlyZWQtZmllbGRzW2RhdGEtdi0wYTI5YTNmZF17cGFkZGluZzoyMHB4IDAgMH1cXG5cIiwgXCJcIl0pO1xuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJlcXVpcmVkLWZpZWxkc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImZpZWxkcy10aXRsZVwifSxbX3ZtLl92KFwiXFxuXFx0XFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXFxuXFx0XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicsW19jKCdsYWJlbCcsW192bS5fdihcIlBlcnNvbmFsIGluZm9ybWF0aW9uOlwiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbX3ZtLl92KFwiXFxuXFx0XFx0XFx0XCIrX3ZtLl9zKF92bS5pZGVudGl0eVJlcXVpcmVtZW50cykrXCJcXG5cXHRcXHRcIildKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cInJlcXVpcmVkLWZpZWxkc1wiPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwiZmllbGRzLXRpdGxlXCI+XHJcblx0XHRcdFJlcXVpcmVkIElkZW50aXR5IEZpZWxkc1xyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxzZWN0aW9uPlxyXG5cdFx0XHQ8bGFiZWw+UGVyc29uYWwgaW5mb3JtYXRpb246PC9sYWJlbD5cclxuXHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRleHRcIj5cclxuXHRcdFx0XHR7e2lkZW50aXR5UmVxdWlyZW1lbnRzfX1cclxuXHRcdFx0PC9maWd1cmU+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsnZmllbGRzJywgJ2lkZW50aXR5JywgJ3NlbGVjdGVkSWRlbnRpdHknLCAnc2VsZWN0ZWRMb2NhdGlvbicsICdjbG9uZWRMb2NhdGlvbiddLFxyXG5cclxuXHRcdGRhdGEoKXtyZXR1cm4ge1xyXG5cclxuXHRcdH19LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cclxuXHRcdFx0aWRlbnRpdHlSZXF1aXJlbWVudHMoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGVyc29uYWxGaWVsZHMuY29uY2F0KHRoaXMubG9jYXRpb25GaWVsZHMpLmpvaW4oJywgJyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwZXJzb25hbEZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5wZXJzb25hbDtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9jYXRpb25GaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMubG9jYXRpb247XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblxyXG5cdFx0XHRmaWVsZFZhbHVlRm9yKGZpZWxkLCB1c2VVbmNsb25lZElkZW50aXR5ID0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiB1c2VVbmNsb25lZElkZW50aXR5XHJcblx0XHRcdFx0XHQ/IHRoaXMuaWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5zZWxlY3RlZExvY2F0aW9uKVxyXG5cdFx0XHRcdFx0OiB0aGlzLnNlbGVjdGVkSWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5jbG9uZWRMb2NhdGlvbik7XHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmZpZWxkcy10aXRsZSB7XHJcblx0XHRtYXJnaW46LTIwcHggLTMwcHggMDtcclxuXHRcdHBhZGRpbmc6MjBweCAzMHB4O1xyXG5cdFx0YmFja2dyb3VuZDokYmx1ZS1ncmFkaWVudDtcclxuXHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdGZvbnQtc2l6ZTogMThweDtcclxuXHJcblx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblx0fVxyXG5cclxuXHQucmVxdWlyZWQtZmllbGRzIHtcclxuXHRcdHBhZGRpbmc6MjBweCAwIDA7XHJcblx0fVxyXG5cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMGEyOWEzZmRcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yZXB1dGF0aW9uW2RhdGEtdi0yMmI5ZTFkNl17cGFkZGluZzo1cHggMTJweDtib3JkZXItcmFkaXVzOjQwcHg7Zm9udC1zaXplOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4O21hcmdpbi10b3A6LTVweDtmb250LXdlaWdodDpib2xkO2JhY2tncm91bmQ6I2YzZjZmNztjb2xvcjojYzhjOGM4fS5yZXB1dGF0aW9uLnRydXN0ZWRbZGF0YS12LTIyYjllMWQ2XXtiYWNrZ3JvdW5kOiMxNTlGMDA7Y29sb3I6I2ZmZn0ucmVwdXRhdGlvbi51bnRydXN0ZWRbZGF0YS12LTIyYjllMWQ2XXtiYWNrZ3JvdW5kOiNmZjA3MDc7Y29sb3I6I2ZmZn0uYXBwLWRldGFpbHNbZGF0YS12LTIyYjllMWQ2XXt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5hcHAtZGV0YWlscyAubG9nb1tkYXRhLXYtMjJiOWUxZDZde2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtoZWlnaHQ6MTAwcHg7d2lkdGg6MTAwcHg7Ym9yZGVyLXJhZGl1czoxMHB4O3BhZGRpbmc6NXB4O21hcmdpbi1ib3R0b206MjBweH0uYXBwLWRldGFpbHMgLmxvZ28uYm9yZGVyW2RhdGEtdi0yMmI5ZTFkNl17YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMX0uYXBwLWRldGFpbHMgLmxvZ28gaW1nW2RhdGEtdi0yMmI5ZTFkNl17aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uYXBwLWRldGFpbHMgLmxvZ28gc3BhbltkYXRhLXYtMjJiOWUxZDZde2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6IzdhN2E3YX0uYXBwLWRldGFpbHMgLmxvZ28uc2NhbVtkYXRhLXYtMjJiOWUxZDZde2ZvbnQtc2l6ZTo0OHB4O2JvcmRlci1yYWRpdXM6NTAlO2NvbG9yOiNmZjA3MDc7YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMTthbmltYXRpb246cHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGV9LmFwcC1kZXRhaWxzIC5uYW1lW2RhdGEtdi0yMmI5ZTFkNl17Zm9udC1zaXplOjE0cHh9XFxuXCIsIFwiXCJdKTtcbiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiZWZlNDlmYzhcIiwgY29udGVudCwgdHJ1ZSwge30pOyJdLCJzb3VyY2VSb290IjoiIn0=