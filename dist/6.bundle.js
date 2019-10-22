(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "8Yeu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("M1sK");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C6GT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/UpdateIdentity.vue?vue&type=template&id=98aebf22&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"wants to"}}),_vm._v(" "),_c('section',{staticClass:"update-identity"},[(_vm.payload.name)?_c('section',[_c('label',[_vm._v("Change your identity name")]),_vm._v(" "),_c('figure',{staticClass:"value"},[_vm._v(_vm._s(_vm.payload.name))])]):_vm._e(),_vm._v(" "),(_vm.payload.kyc)?_c('section',[_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',[_vm._v("Add KYC proofs")]),_vm._v(" "),_c('figure',{staticClass:"value"},[_vm._v(_vm._s(_vm.payload.kyc.split('::')[0]))]),_vm._v(" "),_vm._l((_vm.kycBlock),function(b){return _c('figure',{staticClass:"value",staticStyle:{"font-size":"9px","line-height":"6px"}},[_vm._v(_vm._s(b))])})],2):_vm._e(),_vm._v(" "),_c('section',{staticClass:"fixed-actions"},[_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Cancel),"big":"1"},nativeOn:{"click":function($event){return _vm.returnResult(null)}}}),_vm._v(" "),_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Allow),"blue":"1","big":"1"},nativeOn:{"click":function($event){return _vm.returnResult(true)}}})],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/popouts/UpdateIdentity.vue?vue&type=template&id=98aebf22&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// EXTERNAL MODULE: ./src/components/reusable/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("RNqi");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Network.js
var Network = __webpack_require__("78si");

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/UpdateIdentity.vue?vue&type=script&lang=js&


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






/* harmony default export */ var UpdateIdentityvue_type_script_lang_js_ = ({
  props: ['popup'],
  components: {
    RequiredFields: RequiredFields["a" /* default */],
    PopOutApp: PopOutApp["a" /* default */],
    SearchBar: SearchBar["a" /* default */]
  },
  data: function data() {
    return {};
  },
  created: function created() {},
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['scatter', 'balances']), {}, Object(vuex_esm["c" /* mapGetters */])(['identity', 'identities', 'accounts', 'networks']), {
    payload: function payload() {
      return this.popup.payload();
    },
    kycBlock: function kycBlock() {
      if (!this.payload.kyc) return [];
      var c = 0;
      return this.payload.kyc.split('::')[1].split('').reduce(function (acc, x, i) {
        if (i > 1 && i % 24 === 0) c++;
        if (!acc.hasOwnProperty(c)) acc[c] = '';
        acc[c] += x;
        return acc;
      }, []);
    }
  }),
  methods: {
    returnResult: function returnResult(result) {
      this.$emit('returned', result);
    }
  }
});
// CONCATENATED MODULE: ./src/views/popouts/UpdateIdentity.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_UpdateIdentityvue_type_script_lang_js_ = (UpdateIdentityvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/UpdateIdentity.vue?vue&type=style&index=0&id=98aebf22&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var UpdateIdentityvue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("sRAR");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/UpdateIdentity.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_UpdateIdentityvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "98aebf22",
  null
  
)

/* harmony default export */ var UpdateIdentity = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "GM6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ztac");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_22b9e1d6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "I0EU":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-98aebf22]{padding:50px 50px 20px 50px}.update-identity[data-v-98aebf22]{text-align:center;padding:50px}.update-identity label[data-v-98aebf22]{display:block;font-size:10px}.update-identity .value[data-v-98aebf22]{font-size:12px;font-weight:bold}.fixed-actions[data-v-98aebf22]{justify-content:space-between;display:flex}\n", ""]);


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

/***/ "OA5I":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("I0EU");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("3032e533", content, true, {});

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

/***/ "sRAR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("OA5I");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT8zNGEwIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT9kZGE0Iiwid2VicGFjazovLy9zcmMvdmlld3MvcG9wb3V0cy9VcGRhdGVJZGVudGl0eS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlP2UyYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80NWI3Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT83NWY0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9mYmMyIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzhiZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2Y5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlPzIxOWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/Y2ExYSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mYmYwIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT80ZDY4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT81MTBkIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT9mM2Y2Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80ZjA3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFzWSxDQUFnQixtYkFBRyxFQUFDLEM7Ozs7Ozs7Ozs7O0FDQTFaLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IscUJBQXFCLDRCQUE0QixrQkFBa0IsT0FBTyx3REFBd0QsNEJBQTRCLDhCQUE4Qiw4R0FBOEcsb0JBQW9CLHNNQUFzTSxvQkFBb0IsaUdBQWlHLG9CQUFvQixpQ0FBaUMsdUNBQXVDLHNCQUFzQix5Q0FBeUMsNEJBQTRCLGVBQWUsT0FBTyx5REFBeUQsV0FBVyx5QkFBeUIsZ0NBQWdDLDJCQUEyQixPQUFPLG1FQUFtRSxXQUFXLHlCQUF5QixnQ0FBZ0M7QUFDcnNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLGtCQURBO0FBRUE7QUFDQSxxREFEQTtBQUVBLDJDQUZBO0FBR0E7QUFIQSxHQUZBO0FBT0EsTUFQQSxrQkFPQTtBQUFBO0FBRUEsR0FUQTtBQVVBLFNBVkEscUJBVUEsQ0FFQSxDQVpBO0FBYUEsOEJBQ0Esc0NBQ0EsU0FEQSxFQUVBLFVBRkEsRUFEQSxNQUtBLHdDQUNBLFVBREEsRUFF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QUFDQTtBQUNBO0FBWEEsR0FOQTtBQW1CQTtBQUVBLGlCQUZBLHlCQUVBLEtBRkEsRUFFQTtBQUFBO0FBQ0EsbUNBQ0Esa0VBREEsR0FFQSx3RUFGQTtBQUdBO0FBTkE7QUFuQkEsRzs7QUNuQm9MLENBQWdCLHlIQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBL0Y7QUFDdkM7QUFDTDtBQUM0RDs7O0FBR3pIO0FBQzZGO0FBQzdGLGdCQUFnQiw4Q0FBVTtBQUMxQixFQUFFLDhDQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLCtGOzs7Ozs7O0FDbkJmLDJCQUEyQixtQkFBTyxDQUFDLE1BQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLGdDQUFnQyxpQkFBaUIsbUJBQW1CLGVBQWUsbUJBQW1CLGdCQUFnQixpQkFBaUIsbUJBQW1CLGNBQWMscUNBQXFDLG1CQUFtQixXQUFXLHVDQUF1QyxtQkFBbUIsV0FBVyw4QkFBOEIsa0JBQWtCLGFBQWEsc0JBQXNCLHVCQUF1QixtQkFBbUIsb0NBQW9DLGFBQWEsbUJBQW1CLHVCQUF1QixhQUFhLFlBQVksbUJBQW1CLFlBQVksbUJBQW1CLDJDQUEyQyxtQkFBbUIseUJBQXlCLHdDQUF3QyxZQUFZLFdBQVcseUNBQXlDLGVBQWUsaUJBQWlCLGNBQWMseUNBQXlDLGVBQWUsa0JBQWtCLGNBQWMsbUJBQW1CLHlCQUF5QixxQ0FBcUMsb0NBQW9DLGVBQWU7Ozs7Ozs7OztBQ0ZuakM7QUFBQTtBQUFBO0FBQXNZLENBQWdCLG1iQUFHLEVBQUMsQzs7Ozs7OztBQ0ExWjs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUEwUztBQUNoVSw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQWdFO0FBQ2xGLDhDQUE4QyxFIiwiZmlsZSI6IjYuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwb3BvdXQtd2luZG93XCJ9LFtfYygnUG9wT3V0QXBwJyx7YXR0cnM6e1wiYXBwXCI6X3ZtLnBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YSxcInN1ZmZpeFwiOlwid2FudHMgdG9cIn19KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ1cGRhdGUtaWRlbnRpdHlcIn0sWyhfdm0ucGF5bG9hZC5uYW1lKT9fYygnc2VjdGlvbicsW19jKCdsYWJlbCcsW192bS5fdihcIkNoYW5nZSB5b3VyIGlkZW50aXR5IG5hbWVcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZhbHVlXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5wYXlsb2FkLm5hbWUpKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnBheWxvYWQua3ljKT9fYygnc2VjdGlvbicsW19jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ2JyJyksX3ZtLl92KFwiIFwiKSxfYygnbGFiZWwnLFtfdm0uX3YoXCJBZGQgS1lDIHByb29mc1wiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidmFsdWVcIn0sW192bS5fdihfdm0uX3MoX3ZtLnBheWxvYWQua3ljLnNwbGl0KCc6OicpWzBdKSldKSxfdm0uX3YoXCIgXCIpLF92bS5fbCgoX3ZtLmt5Y0Jsb2NrKSxmdW5jdGlvbihiKXtyZXR1cm4gX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidmFsdWVcIixzdGF0aWNTdHlsZTp7XCJmb250LXNpemVcIjpcIjlweFwiLFwibGluZS1oZWlnaHRcIjpcIjZweFwifX0sW192bS5fdihfdm0uX3MoYikpXSl9KV0sMik6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZml4ZWQtYWN0aW9uc1wifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLkNhbmNlbCksXCJiaWdcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmV0dXJuUmVzdWx0KG51bGwpfX19KSxfdm0uX3YoXCIgXCIpLF9jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6X3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuR0VORVJJQy5BbGxvdyksXCJibHVlXCI6XCIxXCIsXCJiaWdcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmV0dXJuUmVzdWx0KHRydWUpfX19KV0sMSldKV0sMSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwicG9wb3V0LXdpbmRvd1wiPlxyXG4gICAgICAgIDxQb3BPdXRBcHAgOmFwcD1cInBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YVwiIHN1ZmZpeD1cIndhbnRzIHRvXCIgLz5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInVwZGF0ZS1pZGVudGl0eVwiPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiB2LWlmPVwicGF5bG9hZC5uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWw+Q2hhbmdlIHlvdXIgaWRlbnRpdHkgbmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidmFsdWVcIj57e3BheWxvYWQubmFtZX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIHYtaWY9XCJwYXlsb2FkLmt5Y1wiPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPkFkZCBLWUMgcHJvb2ZzPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ2YWx1ZVwiPnt7cGF5bG9hZC5reWMuc3BsaXQoJzo6JylbMF19fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgPGZpZ3VyZSBzdHlsZT1cImZvbnQtc2l6ZTogOXB4OyBsaW5lLWhlaWdodDo2cHg7XCIgdi1mb3I9XCJiIGluIGt5Y0Jsb2NrXCIgY2xhc3M9XCJ2YWx1ZVwiPnt7Yn19PC9maWd1cmU+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZml4ZWQtYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImxvY2FsZShsYW5nS2V5cy5HRU5FUklDLkNhbmNlbClcIiBiaWc9XCIxXCIgQGNsaWNrLm5hdGl2ZT1cInJldHVyblJlc3VsdChudWxsKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIDp0ZXh0PVwibG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuQWxsb3cpXCIgYmx1ZT1cIjFcIiBiaWc9XCIxXCIgQGNsaWNrLm5hdGl2ZT1cInJldHVyblJlc3VsdCh0cnVlKVwiIC8+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuXHJcbiAgICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHRpbXBvcnQgUG9wT3V0QXBwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAnO1xyXG5cdGltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZXVzYWJsZS9TZWFyY2hCYXInO1xyXG5cdGltcG9ydCB7SWRlbnRpdHlSZXF1aXJlZEZpZWxkc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0lkZW50aXR5XCI7XHJcblx0aW1wb3J0IE5ldHdvcmsgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL05ldHdvcmtcIjtcclxuXHRpbXBvcnQgUmVxdWlyZWRGaWVsZHMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkc1wiO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRwcm9wczpbJ3BvcHVwJ10sXHJcblx0XHRjb21wb25lbnRzOntcclxuXHRcdFx0UmVxdWlyZWRGaWVsZHMsXHJcblx0XHRcdFBvcE91dEFwcCxcclxuXHRcdFx0U2VhcmNoQmFyLFxyXG5cdFx0fSxcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblxyXG5cdFx0fX0sXHJcblx0XHRjcmVhdGVkKCl7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNvbXB1dGVkOiB7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnc2NhdHRlcicsXHJcblx0XHRcdFx0J2JhbGFuY2VzJ1xyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2lkZW50aXR5JyxcclxuXHRcdFx0XHQnaWRlbnRpdGllcycsXHJcblx0XHRcdFx0J2FjY291bnRzJyxcclxuXHRcdFx0XHQnbmV0d29ya3MnXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRwYXlsb2FkKCl7IHJldHVybiB0aGlzLnBvcHVwLnBheWxvYWQoKTsgfSxcclxuICAgICAgICAgICAga3ljQmxvY2soKXtcclxuXHRcdFx0XHRpZighdGhpcy5wYXlsb2FkLmt5YykgcmV0dXJuIFtdO1xyXG5cdFx0XHRcdGxldCBjPTA7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGF5bG9hZC5reWMuc3BsaXQoJzo6JylbMV0uc3BsaXQoJycpLnJlZHVjZSgoYWNjLHgsaSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoaT4xJiZpJTI0PT09MCkgYysrO1xyXG5cdFx0XHRcdFx0aWYoIWFjYy5oYXNPd25Qcm9wZXJ0eShjKSkgYWNjW2NdPScnO1xyXG5cdFx0XHRcdFx0YWNjW2NdICs9IHg7XHJcblx0XHRcdFx0XHRyZXR1cm4gYWNjO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdHJldHVyblJlc3VsdChyZXN1bHQpe1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoJ3JldHVybmVkJywgcmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuICAgIEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG4gICAgLmFwcC1kZXRhaWxzIHtcclxuICAgICAgICBwYWRkaW5nOjUwcHggNTBweCAyMHB4IDUwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnVwZGF0ZS1pZGVudGl0eSB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzo1MHB4O1xyXG5cclxuICAgICAgICBsYWJlbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJHNtYWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnZhbHVlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAkbWVkaXVtO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmZpeGVkLWFjdGlvbnMge1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICB9XHJcblxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVXBkYXRlSWRlbnRpdHkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTk4YWViZjIyJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVXBkYXRlSWRlbnRpdHkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTk4YWViZjIyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjk4YWViZjIyXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi05OGFlYmYyMl17cGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4fS51cGRhdGUtaWRlbnRpdHlbZGF0YS12LTk4YWViZjIyXXt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjUwcHh9LnVwZGF0ZS1pZGVudGl0eSBsYWJlbFtkYXRhLXYtOThhZWJmMjJde2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEwcHh9LnVwZGF0ZS1pZGVudGl0eSAudmFsdWVbZGF0YS12LTk4YWViZjIyXXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDpib2xkfS5maXhlZC1hY3Rpb25zW2RhdGEtdi05OGFlYmYyMl17anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47ZGlzcGxheTpmbGV4fVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwLWRldGFpbHNcIn0sWyghX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nb1wiLGNsYXNzOnsnYm9yZGVyJzpfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhX3ZtLmFwcC5pbWd9fSxbKF92bS5hcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInKT9fYygnU2NhdHRlcicpOihfdm0uYXBwLmltZyk/X2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5hcHAuaW1nfX0pOl9jKCdzcGFuJyxbX3ZtLl92KFwiTm8gSW1hZ2VcIildKV0sMSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nbyBzY2FtXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1hdHRlbnRpb25cIn0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnJpZGxFbmFibGVkICYmIF92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInKT9fYygnc2VjdGlvbicsWyhfdm0uYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2UpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSksX3ZtLl92KFwiIGxvYWRpbmcgcmVwdXRhdGlvblwiKV0pOl9jKCdzZWN0aW9uJyxbKF92bS51bmtub3duUmVwdXRhdGlvbik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX3ZtLl92KFwiVW5rbm93biBSZXB1dGF0aW9uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdHJ1c3RlZFwifSxbX3ZtLl92KFwiVHJ1c3R3b3J0aHlcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwifSxbX3ZtLl92KFwiS25vd24gU2NhbVwiKV0pOl92bS5fZSgpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW19jKCdiJyxbX3ZtLl92KF92bS5fcyhfdm0uYXBwLm5hbWUpKV0pLF92bS5fdihcIiBcIiksKF92bS5zdWZmaXgpP19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uc3VmZml4KSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0gQVBQIERFVEFJTFMgLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImFwcC1kZXRhaWxzXCI+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nb1wiIHYtaWY9XCIhdW50cnVzdGVkXCIgOmNsYXNzPVwieydib3JkZXInOmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIWFwcC5pbWd9XCI+XHJcblx0XHRcdDxTY2F0dGVyIHYtaWY9XCJhcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInXCIgLz5cclxuXHRcdFx0PGltZyB2LWVsc2UtaWY9XCJhcHAuaW1nXCIgOnNyYz1cImFwcC5pbWdcIiAvPlxyXG5cdFx0XHQ8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvIHNjYW1cIiB2LWVsc2U+XHJcblx0XHRcdDxpIGNsYXNzPVwiaWNvbi1hdHRlbnRpb25cIj48L2k+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxzZWN0aW9uIHYtaWY9XCJyaWRsRW5hYmxlZCAmJiBhcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cImFwcFJlcHV0YXRpb24gPT09IGZhbHNlXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT4gbG9hZGluZyByZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIHYtZWxzZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJ1bmtub3duUmVwdXRhdGlvblwiPlVua25vd24gUmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHRydXN0ZWRcIiB2LWlmPVwidHJ1c3RlZFwiPlRydXN0d29ydGh5PC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdW50cnVzdGVkXCIgdi1pZj1cInVudHJ1c3RlZFwiPktub3duIFNjYW08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+PGI+e3thcHAubmFtZX19PC9iPiA8c3BhbiB2LWlmPVwic3VmZml4XCI+e3tzdWZmaXh9fTwvc3Bhbj48L2ZpZ3VyZT5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJy4uL3N2Z3MvU2NhdHRlck91dGxpbmUnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6e1NjYXR0ZXJ9LFxyXG5cdFx0cHJvcHM6WydhcHAnLCAnc3VmZml4J10sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnYXBwUmVwdXRhdGlvbidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdyaWRsRW5hYmxlZCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR1bmtub3duUmVwdXRhdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gPT09IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPiAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHVudHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPCAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQucmVwdXRhdGlvbiB7XHJcblx0XHRwYWRkaW5nOjVweCAxMnB4O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czo0MHB4O1xyXG5cdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRtYXJnaW4tYm90dG9tOjEwcHg7XHJcblx0XHRtYXJnaW4tdG9wOi01cHg7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0Y29sb3I6JGdyZXk7XHJcblxyXG5cdFx0Ji50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokZGFya2dyZWVuO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji51bnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRyZWQ7XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5hcHAtZGV0YWlscyB7XHJcblx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG5cdFx0JGxvZ286MTAwcHg7XHJcblx0XHQubG9nbyB7XHJcblx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdGhlaWdodDokbG9nbztcclxuXHRcdFx0d2lkdGg6JGxvZ287XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6JHJhZGl1cztcclxuXHRcdFx0cGFkZGluZzo1cHg7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHJcblx0XHRcdCYuYm9yZGVyIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWcge1xyXG5cdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCYuc2NhbSB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiA0OHB4O1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cdFx0XHRcdGNvbG9yOiRyZWQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHJcblx0XHRcdFx0YW5pbWF0aW9uOiBwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5uYW1lIHtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2U7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMmI5ZTFkNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjIyYjllMWQ2XCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI2NmJiN2M3OFwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9VcGRhdGVJZGVudGl0eS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD05OGFlYmYyMiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCIzMDMyZTUzM1wiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZmllbGRzLXRpdGxlW2RhdGEtdi0wYTI5YTNmZF17bWFyZ2luOi0yMHB4IC0zMHB4IDA7cGFkZGluZzoyMHB4IDMwcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMDA3ZmQ3IDAlLCAjMDc5OWZmIDEwMCUpO2NvbG9yOiNmZmY7Zm9udC1zaXplOjE4cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5yZXF1aXJlZC1maWVsZHNbZGF0YS12LTBhMjlhM2ZkXXtwYWRkaW5nOjIwcHggMCAwfVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicmVxdWlyZWQtZmllbGRzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZmllbGRzLXRpdGxlXCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRSZXF1aXJlZCBJZGVudGl0eSBGaWVsZHNcXG5cXHRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiUGVyc29uYWwgaW5mb3JtYXRpb246XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0XCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRcXHRcIitfdm0uX3MoX3ZtLmlkZW50aXR5UmVxdWlyZW1lbnRzKStcIlxcblxcdFxcdFwiKV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwicmVxdWlyZWQtZmllbGRzXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJmaWVsZHMtdGl0bGVcIj5cclxuXHRcdFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0PHNlY3Rpb24+XHJcblx0XHRcdDxsYWJlbD5QZXJzb25hbCBpbmZvcm1hdGlvbjo8L2xhYmVsPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwidGV4dFwiPlxyXG5cdFx0XHRcdHt7aWRlbnRpdHlSZXF1aXJlbWVudHN9fVxyXG5cdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydmaWVsZHMnLCAnaWRlbnRpdHknLCAnc2VsZWN0ZWRJZGVudGl0eScsICdzZWxlY3RlZExvY2F0aW9uJywgJ2Nsb25lZExvY2F0aW9uJ10sXHJcblxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblxyXG5cdFx0XHRpZGVudGl0eVJlcXVpcmVtZW50cygpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wZXJzb25hbEZpZWxkcy5jb25jYXQodGhpcy5sb2NhdGlvbkZpZWxkcykuam9pbignLCAnKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBlcnNvbmFsRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLnBlcnNvbmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb2NhdGlvbkZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5sb2NhdGlvbjtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHJcblx0XHRcdGZpZWxkVmFsdWVGb3IoZmllbGQsIHVzZVVuY2xvbmVkSWRlbnRpdHkgPSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIHVzZVVuY2xvbmVkSWRlbnRpdHlcclxuXHRcdFx0XHRcdD8gdGhpcy5pZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLnNlbGVjdGVkTG9jYXRpb24pXHJcblx0XHRcdFx0XHQ6IHRoaXMuc2VsZWN0ZWRJZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLmNsb25lZExvY2F0aW9uKTtcclxuXHRcdFx0fSxcclxuXHRcdH1cclxuXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQuZmllbGRzLXRpdGxlIHtcclxuXHRcdG1hcmdpbjotMjBweCAtMzBweCAwO1xyXG5cdFx0cGFkZGluZzoyMHB4IDMwcHg7XHJcblx0XHRiYWNrZ3JvdW5kOiRibHVlLWdyYWRpZW50O1xyXG5cdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0Zm9udC1zaXplOiAxOHB4O1xyXG5cclxuXHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHR9XHJcblxyXG5cdC5yZXF1aXJlZC1maWVsZHMge1xyXG5cdFx0cGFkZGluZzoyMHB4IDAgMDtcclxuXHR9XHJcblxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwYTI5YTNmZFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnJlcHV0YXRpb25bZGF0YS12LTIyYjllMWQ2XXtwYWRkaW5nOjVweCAxMnB4O2JvcmRlci1yYWRpdXM6NDBweDtmb250LXNpemU6MTBweDttYXJnaW4tYm90dG9tOjEwcHg7bWFyZ2luLXRvcDotNXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZDojZjNmNmY3O2NvbG9yOiNjOGM4Yzh9LnJlcHV0YXRpb24udHJ1c3RlZFtkYXRhLXYtMjJiOWUxZDZde2JhY2tncm91bmQ6IzE1OUYwMDtjb2xvcjojZmZmfS5yZXB1dGF0aW9uLnVudHJ1c3RlZFtkYXRhLXYtMjJiOWUxZDZde2JhY2tncm91bmQ6I2ZmMDcwNztjb2xvcjojZmZmfS5hcHAtZGV0YWlsc1tkYXRhLXYtMjJiOWUxZDZde3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFwcC1kZXRhaWxzIC5sb2dvW2RhdGEtdi0yMmI5ZTFkNl17ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2hlaWdodDoxMDBweDt3aWR0aDoxMDBweDtib3JkZXItcmFkaXVzOjEwcHg7cGFkZGluZzo1cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5hcHAtZGV0YWlscyAubG9nby5ib3JkZXJbZGF0YS12LTIyYjllMWQ2XXtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxfS5hcHAtZGV0YWlscyAubG9nbyBpbWdbZGF0YS12LTIyYjllMWQ2XXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5hcHAtZGV0YWlscyAubG9nbyBzcGFuW2RhdGEtdi0yMmI5ZTFkNl17Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojN2E3YTdhfS5hcHAtZGV0YWlscyAubG9nby5zY2FtW2RhdGEtdi0yMmI5ZTFkNl17Zm9udC1zaXplOjQ4cHg7Ym9yZGVyLXJhZGl1czo1MCU7Y29sb3I6I2ZmMDcwNztiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxO2FuaW1hdGlvbjpwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZX0uYXBwLWRldGFpbHMgLm5hbWVbZGF0YS12LTIyYjllMWQ2XXtmb250LXNpemU6MTRweH1cXG5cIiwgXCJcIl0pO1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXBkYXRlSWRlbnRpdHkudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9OThhZWJmMjImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXBkYXRlSWRlbnRpdHkudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9OThhZWJmMjImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyYjllMWQ2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiZWZlNDlmYzhcIiwgY29udGVudCwgdHJ1ZSwge30pOyJdLCJzb3VyY2VSb290IjoiIn0=