(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[59],{

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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/UpdateIdentity.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		props:['popup'],
		components:{
			RequiredFields: RequiredFields["a" /* default */],
			PopOutApp: PopOutApp["a" /* default */],
			SearchBar: SearchBar["a" /* default */],
		},
		data () {return {

		}},
		created(){

		},
		computed: {
			...Object(vuex_esm["d" /* mapState */])([
				'scatter',
				'balances'
			]),
			...Object(vuex_esm["c" /* mapGetters */])([
				'identity',
				'identities',
				'accounts',
				'networks'
			]),
			payload(){ return this.popup.payload(); },
            kycBlock(){
				if(!this.payload.kyc) return [];
				let c=0;
				return this.payload.kyc.split('::')[1].split('').reduce((acc,x,i) => {
					if(i>1&&i%24===0) c++;
					if(!acc.hasOwnProperty(c)) acc[c]='';
					acc[c] += x;
					return acc;
                }, [])
            }
		},
		methods: {
			returnResult(result){
				this.$emit('returned', result);
			},

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

/***/ "I0EU":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-98aebf22]{padding:50px 50px 20px 50px}.update-identity[data-v-98aebf22]{text-align:center;padding:50px}.update-identity label[data-v-98aebf22]{display:block;font-size:10px}.update-identity .value[data-v-98aebf22]{font-size:12px;font-weight:bold}.fixed-actions[data-v-98aebf22]{justify-content:space-between;display:flex}\n", ""]);


/***/ }),

/***/ "IeaP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=template&id=24ae06ac&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"app-details"},[(!_vm.untrusted)?_c('figure',{staticClass:"logo",class:{'border':_vm.app.applink !== 'Scatter' && !_vm.app.img}},[(_vm.app.applink === 'Scatter')?_c('Scatter'):(_vm.app.img)?_c('img',{attrs:{"src":_vm.app.img}}):_c('span',[_vm._v("No Image")])],1):_c('figure',{staticClass:"logo scam"},[_c('i',{staticClass:"icon-attention"})]),_vm._v(" "),(_vm.ridlEnabled && _vm.app.applink !== 'Scatter')?_c('section',[(_vm.appReputation === false)?_c('figure',{staticClass:"reputation"},[_c('i',{staticClass:"icon-spin4 animate-spin"}),_vm._v(" loading reputation")]):_c('section',[(_vm.unknownReputation)?_c('figure',{staticClass:"reputation"},[_vm._v("Unknown Reputation")]):_vm._e(),_vm._v(" "),(_vm.trusted)?_c('figure',{staticClass:"reputation trusted"},[_vm._v("Trustworthy")]):_vm._e(),_vm._v(" "),(_vm.untrusted)?_c('figure',{staticClass:"reputation untrusted"},[_vm._v("Known Scam")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"name"},[_c('b',[_vm._v(_vm._s(_vm.app.name))]),_vm._v(" "),(_vm.suffix)?_c('span',[_vm._v(_vm._s(_vm.suffix))]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=template&id=24ae06ac&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/svgs/ScatterOutline.vue + 2 modules
var ScatterOutline = __webpack_require__("wg2a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	components:{Scatter: ScatterOutline["a" /* default */]},
	props:['app', 'suffix'],
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'appReputation'
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'ridlEnabled',
		]),
		unknownReputation(){
			return this.appReputation === undefined;
		},
		trusted(){
			return this.appReputation && parseFloat(this.appReputation.decimal) > 0
		},
		untrusted(){
			return this.appReputation && parseFloat(this.appReputation.decimal) < 0
		}
	},
});

// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_PopOutAppvue_type_script_lang_js_ = (PopOutAppvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=style&index=0&id=24ae06ac&scoped=true&lang=scss&
var PopOutAppvue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss_ = __webpack_require__("qEK9");

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
  "24ae06ac",
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

/***/ "Mq7R":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("edmm");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("5b3a30d5", content, true, {});

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

/***/ "edmm":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".reputation[data-v-24ae06ac]{padding:5px 12px;font-size:10px;margin-bottom:10px;margin-top:-5px;font-weight:bold;background:#f3f6f7;color:#c8c8c8}.reputation.trusted[data-v-24ae06ac]{background:#159F00;color:#fff}.reputation.untrusted[data-v-24ae06ac]{background:#ff0707;color:#fff}.app-details[data-v-24ae06ac]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.app-details .logo[data-v-24ae06ac]{display:flex;align-items:center;justify-content:center;height:100px;width:100px;border-radius:0;padding:5px;margin-bottom:20px}.app-details .logo.border[data-v-24ae06ac]{background:#f3f6f7;border:1px solid #dfe0e1}.app-details .logo img[data-v-24ae06ac]{height:100%;width:100%}.app-details .logo span[data-v-24ae06ac]{font-size:10px;font-weight:bold;color:#7a7a7a}.app-details .logo.scam[data-v-24ae06ac]{font-size:48px;border-radius:50%;color:#ff0707;background:#f3f6f7;border:1px solid #dfe0e1;animation:pulsate 0.5s ease infinite}.app-details .name[data-v-24ae06ac]{font-size:14px}\n", ""]);


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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/RequiredFields.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
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
	props:['fields', 'identity', 'selectedIdentity', 'selectedLocation', 'clonedLocation'],

	data(){return {

	}},
	computed:{

		identityRequirements() {
			return this.personalFields.concat(this.locationFields).join(', ');
		},

		personalFields(){
			return this.fields.personal;
		},
		locationFields(){
			return this.fields.location;
		},
	},
	methods:{

		fieldValueFor(field, useUnclonedIdentity = false){
			return useUnclonedIdentity
				? this.identity.getPropertyValueByName(field, this.selectedLocation)
				: this.selectedIdentity.getPropertyValueByName(field, this.clonedLocation);
		},
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

/***/ "qEK9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Mq7R");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "sRAR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("OA5I");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateIdentity_vue_vue_type_style_index_0_id_98aebf22_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "wg2a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgs/ScatterOutline.vue?vue&type=template&id=361960f5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":"88px","height":"88px","viewBox":"0 0 88 88","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('g',{attrs:{"id":"welcome_scatter","stroke":"none","stroke-width":"1","fill":"none","fill-rule":"evenodd","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('g',{attrs:{"id":"Group","stroke":"#00A8FF"}},[_c('g',{attrs:{"id":"Icon"}},[_c('circle',{attrs:{"id":"Base","cx":"44","cy":"44","r":"43.7079646"}})]),_vm._v(" "),_c('path',{attrs:{"d":"M40.8188559,71.5932203 C39.3040178,71.5932203 38.0455559,71.423153 37.0434322,71.0830131 C36.0413085,70.7428732 35.2489436,70.3616877 34.6663136,69.9394451 C34.0836835,69.5172025 33.6758486,69.1125594 33.4427966,68.7255037 C33.2097446,68.338448 33.0932203,68.0862791 33.0932203,67.9689895 C33.0932203,67.5467469 33.1864397,67.0951887 33.3728814,66.6143013 C33.559323,66.1334139 33.7923715,65.68772 34.0720339,65.2772064 C34.3516963,64.8666928 34.6546594,64.5206936 34.9809322,64.2391985 C35.307205,63.9577035 35.5985157,63.816958 35.8548729,63.816958 C36.1811457,63.816958 36.4491515,64.0280762 36.6588983,64.4503188 L37.0084746,64.8021858 C37.1949162,64.9898492 37.4570958,65.1833742 37.7950212,65.3827665 C38.1329466,65.5821588 38.5524339,65.763955 39.0534958,65.9281605 C39.5545576,66.0923659 40.1430051,66.1744674 40.8188559,66.1744674 C42.2870836,66.1744674 43.4872835,65.7229092 44.4194915,64.8197792 C45.3516996,63.9166492 45.8177966,62.6909911 45.8177966,61.1427683 C45.8177966,60.0637039 45.5672695,59.1019435 45.0662076,58.2574583 C44.5651458,57.4129731 43.9067837,56.6271445 43.0911017,55.8999489 C42.2754197,55.1727533 41.3432256,54.4631618 40.2944915,53.7711531 C39.2457575,53.0791444 38.1737343,52.3578241 37.0783898,51.6071706 C35.9830454,50.8565171 34.9110222,50.0472309 33.8622881,49.1792878 C32.8135541,48.3113447 31.88136,47.314398 31.065678,46.1884177 C30.2499959,45.0624374 29.5916339,43.7898643 29.090572,42.37066 C28.5895102,40.9514557 28.3389831,39.3270189 28.3389831,37.497301 C28.3389831,35.9256202 28.6069888,34.3422342 29.1430085,32.7470955 C29.6790281,31.1519568 30.4189571,29.6330792 31.3628178,28.190417 C32.3066784,26.7477547 33.4194851,25.3989445 34.7012712,24.1439456 C35.9830573,22.8889468 37.3696959,21.7981698 38.8612288,20.8715818 C40.3527617,19.9449939 41.9083605,19.2178092 43.528072,18.690006 C45.1477835,18.1622028 46.7732969,17.8983051 48.404661,17.8983051 C49.8029731,17.8983051 51.0614351,18.121152 52.1800847,18.5668525 C53.2987344,19.012553 54.2425809,19.640043 55.0116525,20.4493414 C55.7807242,21.2586397 56.3749979,22.2321288 56.7944915,23.3698381 C57.2139851,24.5075473 57.4237288,25.7801205 57.4237288,27.1875958 C57.4237288,28.5246974 57.1906803,29.8383213 56.7245763,31.128507 C56.2584722,32.4186927 55.6408937,33.6384864 54.871822,34.7879246 C54.1027504,35.9373627 53.2346447,36.9988178 52.2674788,37.9723216 C51.300313,38.9458253 50.3098568,39.7902979 49.2960805,40.5057645 C48.2823043,41.2212311 47.2976743,41.7783484 46.342161,42.1771331 C45.3866478,42.5759178 44.5476731,42.7753071 43.8252119,42.7753071 C43.1959714,42.7753071 42.6308288,42.6286973 42.1297669,42.3354733 C41.6287051,42.0422492 41.2092178,41.6786569 40.8712924,41.2446853 C40.533367,40.8107138 40.2711874,40.3532912 40.0847458,39.8724038 C39.8983042,39.3915164 39.8050847,38.9634157 39.8050847,38.5880889 C39.8050847,38.283136 39.8458682,38.0837466 39.9274364,37.9899149 C40.0090046,37.8960832 40.1255289,37.8550325 40.2770127,37.8667614 C40.4284965,37.8784904 40.6207615,37.9136768 40.8538136,37.9723216 C41.0868656,38.0309664 41.3548714,38.0602883 41.657839,38.0602883 C42.6366574,38.0602883 43.720333,37.7201536 44.9088983,37.0398738 C46.0974636,36.3595941 47.2160965,35.491664 48.2648305,34.4360575 C49.3135646,33.380451 50.1933227,32.2193013 50.9041314,30.9525735 C51.61494,29.6858457 51.970339,28.4543232 51.970339,27.2579692 C51.970339,26.0381573 51.6732021,25.0763969 51.0789195,24.3726592 C50.4846369,23.6689216 49.476702,23.317058 48.0550847,23.317058 C47.1694871,23.317058 46.208162,23.4871254 45.1710805,23.8272653 C44.1339991,24.1674051 43.0911069,24.6424209 42.0423729,25.2523269 C40.9936388,25.8622329 39.9798778,26.6011463 39.0010593,27.4690895 C38.0222409,28.3370326 37.1599614,29.2929286 36.4141949,30.3368061 C35.6684285,31.3806836 35.0683285,32.506647 34.6138771,33.71473 C34.1594257,34.922813 33.9322034,36.1836574 33.9322034,37.497301 C33.9322034,38.8813184 34.1827305,40.1187053 34.6837924,41.2094986 C35.1848542,42.300292 35.8490425,43.2913744 36.6763771,44.1827754 C37.5037118,45.0741764 38.441732,45.8951914 39.4904661,46.6458449 C40.5392002,47.3964984 41.6112233,48.1412763 42.7065678,48.8802008 C43.8019123,49.6191254 44.8739354,50.3814964 45.9226695,51.1673368 C46.9714035,51.9531772 47.9094238,52.8211073 48.7367585,53.7711531 C49.5640931,54.721199 50.2282814,55.7767896 50.7293432,56.9379568 C51.230405,58.0991239 51.4809322,59.430341 51.4809322,60.931648 C51.4809322,62.3860392 51.2071002,63.7641715 50.659428,65.0660861 C50.1117557,66.3680008 49.3601743,67.4998286 48.404661,68.4616034 C47.4491478,69.4233782 46.3188625,70.1857492 45.0137712,70.7487394 C43.7086799,71.3117295 42.3103888,71.5932203 40.8188559,71.5932203 Z","id":"Scatter"}})])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgs/ScatterOutline.vue?vue&type=template&id=361960f5&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/svgs/ScatterOutline.vue

var script = {}


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ScatterOutline = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT8zNGEwIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT9kZGE0Iiwid2VicGFjazovLy9zcmMvdmlld3MvcG9wb3V0cy9VcGRhdGVJZGVudGl0eS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlPzkzNjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT83NWY0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80YzUzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzQ2MjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2Y5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlP2RmYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVXBkYXRlSWRlbnRpdHkudnVlPzIxOWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/Y2ExYSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/ZTFhMyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mYmYwIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT8yNDkyIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT84NzdlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5LnZ1ZT9mM2Y2Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvU2NhdHRlck91dGxpbmUudnVlPzFkNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Zncy9TY2F0dGVyT3V0bGluZS52dWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQXNZLENBQWdCLG1iQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7QUNBMVosMEJBQTBCLGFBQWEsMEJBQTBCLHdCQUF3QixxQkFBcUIsNEJBQTRCLGtCQUFrQixPQUFPLHdEQUF3RCw0QkFBNEIsOEJBQThCLDhHQUE4RyxvQkFBb0Isc01BQXNNLG9CQUFvQixpR0FBaUcsb0JBQW9CLGlDQUFpQyx1Q0FBdUMsc0JBQXNCLHlDQUF5Qyw0QkFBNEIsZUFBZSxPQUFPLHlEQUF5RCxXQUFXLHlCQUF5QixnQ0FBZ0MsMkJBQTJCLE9BQU8sbUVBQW1FLFdBQVcseUJBQXlCLGdDQUFnQztBQUNyc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNEJBLENBQXdEO0FBQ3hELENBQTREO0FBQzVELENBQTZEO0FBQzdELENBQXlFO0FBQ3pFLENBQXVEO0FBQ3ZELENBQXNFOztBQUV0RSxDQUFnQjtBQUNoQjtBQUNBO0FB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QUFDQTtBQUNBOztBQUVBOztBQUVlLCtGIiwiZmlsZSI6IjU5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicG9wb3V0LXdpbmRvd1wifSxbX2MoJ1BvcE91dEFwcCcse2F0dHJzOntcImFwcFwiOl92bS5wb3B1cC5kYXRhLnByb3BzLmFwcERhdGEsXCJzdWZmaXhcIjpcIndhbnRzIHRvXCJ9fSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwidXBkYXRlLWlkZW50aXR5XCJ9LFsoX3ZtLnBheWxvYWQubmFtZSk/X2MoJ3NlY3Rpb24nLFtfYygnbGFiZWwnLFtfdm0uX3YoXCJDaGFuZ2UgeW91ciBpZGVudGl0eSBuYW1lXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ2YWx1ZVwifSxbX3ZtLl92KF92bS5fcyhfdm0ucGF5bG9hZC5uYW1lKSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wYXlsb2FkLmt5Yyk/X2MoJ3NlY3Rpb24nLFtfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ2xhYmVsJyxbX3ZtLl92KFwiQWRkIEtZQyBwcm9vZnNcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZhbHVlXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5wYXlsb2FkLmt5Yy5zcGxpdCgnOjonKVswXSkpXSksX3ZtLl92KFwiIFwiKSxfdm0uX2woKF92bS5reWNCbG9jayksZnVuY3Rpb24oYil7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZhbHVlXCIsc3RhdGljU3R5bGU6e1wiZm9udC1zaXplXCI6XCI5cHhcIixcImxpbmUtaGVpZ2h0XCI6XCI2cHhcIn19LFtfdm0uX3YoX3ZtLl9zKGIpKV0pfSldLDIpOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImZpeGVkLWFjdGlvbnNcIn0sW19jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6X3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuR0VORVJJQy5DYW5jZWwpLFwiYmlnXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdChudWxsKX19fSksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuQWxsb3cpLFwiYmx1ZVwiOlwiMVwiLFwiYmlnXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdCh0cnVlKX19fSldLDEpXSldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cInBvcG91dC13aW5kb3dcIj5cclxuICAgICAgICA8UG9wT3V0QXBwIDphcHA9XCJwb3B1cC5kYXRhLnByb3BzLmFwcERhdGFcIiBzdWZmaXg9XCJ3YW50cyB0b1wiIC8+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1cGRhdGUtaWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gdi1pZj1cInBheWxvYWQubmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPkNoYW5nZSB5b3VyIGlkZW50aXR5IG5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInZhbHVlXCI+e3twYXlsb2FkLm5hbWV9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8c2VjdGlvbiB2LWlmPVwicGF5bG9hZC5reWNcIj5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5BZGQgS1lDIHByb29mczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidmFsdWVcIj57e3BheWxvYWQua3ljLnNwbGl0KCc6OicpWzBdfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgIDxmaWd1cmUgc3R5bGU9XCJmb250LXNpemU6IDlweDsgbGluZS1oZWlnaHQ6NnB4O1wiIHYtZm9yPVwiYiBpbiBreWNCbG9ja1wiIGNsYXNzPVwidmFsdWVcIj57e2J9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImZpeGVkLWFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gOnRleHQ9XCJsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5DYW5jZWwpXCIgYmlnPVwiMVwiIEBjbGljay5uYXRpdmU9XCJyZXR1cm5SZXN1bHQobnVsbClcIiAvPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImxvY2FsZShsYW5nS2V5cy5HRU5FUklDLkFsbG93KVwiIGJsdWU9XCIxXCIgYmlnPVwiMVwiIEBjbGljay5uYXRpdmU9XCJyZXR1cm5SZXN1bHQodHJ1ZSlcIiAvPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuXHJcblxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblx0aW1wb3J0IFBvcE91dEFwcCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwJztcclxuXHRpbXBvcnQgU2VhcmNoQmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmV1c2FibGUvU2VhcmNoQmFyJztcclxuXHRpbXBvcnQge0lkZW50aXR5UmVxdWlyZWRGaWVsZHN9IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9JZGVudGl0eVwiO1xyXG5cdGltcG9ydCBOZXR3b3JrIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCI7XHJcblx0aW1wb3J0IFJlcXVpcmVkRmllbGRzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHNcIjtcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wydwb3B1cCddLFxyXG5cdFx0Y29tcG9uZW50czp7XHJcblx0XHRcdFJlcXVpcmVkRmllbGRzLFxyXG5cdFx0XHRQb3BPdXRBcHAsXHJcblx0XHRcdFNlYXJjaEJhcixcclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtyZXR1cm4ge1xyXG5cclxuXHRcdH19LFxyXG5cdFx0Y3JlYXRlZCgpe1xyXG5cclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDoge1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NjYXR0ZXInLFxyXG5cdFx0XHRcdCdiYWxhbmNlcydcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdpZGVudGl0eScsXHJcblx0XHRcdFx0J2lkZW50aXRpZXMnLFxyXG5cdFx0XHRcdCdhY2NvdW50cycsXHJcblx0XHRcdFx0J25ldHdvcmtzJ1xyXG5cdFx0XHRdKSxcclxuXHRcdFx0cGF5bG9hZCgpeyByZXR1cm4gdGhpcy5wb3B1cC5wYXlsb2FkKCk7IH0sXHJcbiAgICAgICAgICAgIGt5Y0Jsb2NrKCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucGF5bG9hZC5reWMpIHJldHVybiBbXTtcclxuXHRcdFx0XHRsZXQgYz0wO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBheWxvYWQua3ljLnNwbGl0KCc6OicpWzFdLnNwbGl0KCcnKS5yZWR1Y2UoKGFjYyx4LGkpID0+IHtcclxuXHRcdFx0XHRcdGlmKGk+MSYmaSUyND09PTApIGMrKztcclxuXHRcdFx0XHRcdGlmKCFhY2MuaGFzT3duUHJvcGVydHkoYykpIGFjY1tjXT0nJztcclxuXHRcdFx0XHRcdGFjY1tjXSArPSB4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuICAgICAgICAgICAgICAgIH0sIFtdKVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQocmVzdWx0KXtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KCdyZXR1cm5lZCcsIHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcbiAgICBAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuICAgIC5hcHAtZGV0YWlscyB7XHJcbiAgICAgICAgcGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC51cGRhdGUtaWRlbnRpdHkge1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6NTBweDtcclxuXHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBmb250LXNpemU6ICRzbWFsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJG1lZGl1bTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5maXhlZC1hY3Rpb25zIHtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgfVxyXG5cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9VcGRhdGVJZGVudGl0eS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9VcGRhdGVJZGVudGl0eS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD05OGFlYmYyMiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9VcGRhdGVJZGVudGl0eS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9VcGRhdGVJZGVudGl0eS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD05OGFlYmYyMiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI5OGFlYmYyMlwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi05OGFlYmYyMl17cGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4fS51cGRhdGUtaWRlbnRpdHlbZGF0YS12LTk4YWViZjIyXXt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjUwcHh9LnVwZGF0ZS1pZGVudGl0eSBsYWJlbFtkYXRhLXYtOThhZWJmMjJde2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEwcHh9LnVwZGF0ZS1pZGVudGl0eSAudmFsdWVbZGF0YS12LTk4YWViZjIyXXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDpib2xkfS5maXhlZC1hY3Rpb25zW2RhdGEtdi05OGFlYmYyMl17anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47ZGlzcGxheTpmbGV4fVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwLWRldGFpbHNcIn0sWyghX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nb1wiLGNsYXNzOnsnYm9yZGVyJzpfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhX3ZtLmFwcC5pbWd9fSxbKF92bS5hcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInKT9fYygnU2NhdHRlcicpOihfdm0uYXBwLmltZyk/X2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5hcHAuaW1nfX0pOl9jKCdzcGFuJyxbX3ZtLl92KFwiTm8gSW1hZ2VcIildKV0sMSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nbyBzY2FtXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1hdHRlbnRpb25cIn0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnJpZGxFbmFibGVkICYmIF92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInKT9fYygnc2VjdGlvbicsWyhfdm0uYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2UpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSksX3ZtLl92KFwiIGxvYWRpbmcgcmVwdXRhdGlvblwiKV0pOl9jKCdzZWN0aW9uJyxbKF92bS51bmtub3duUmVwdXRhdGlvbik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX3ZtLl92KFwiVW5rbm93biBSZXB1dGF0aW9uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdHJ1c3RlZFwifSxbX3ZtLl92KFwiVHJ1c3R3b3J0aHlcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwifSxbX3ZtLl92KFwiS25vd24gU2NhbVwiKV0pOl92bS5fZSgpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW19jKCdiJyxbX3ZtLl92KF92bS5fcyhfdm0uYXBwLm5hbWUpKV0pLF92bS5fdihcIiBcIiksKF92bS5zdWZmaXgpP19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uc3VmZml4KSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0gQVBQIERFVEFJTFMgLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImFwcC1kZXRhaWxzXCI+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nb1wiIHYtaWY9XCIhdW50cnVzdGVkXCIgOmNsYXNzPVwieydib3JkZXInOmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIWFwcC5pbWd9XCI+XHJcblx0XHRcdDxTY2F0dGVyIHYtaWY9XCJhcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInXCIgLz5cclxuXHRcdFx0PGltZyB2LWVsc2UtaWY9XCJhcHAuaW1nXCIgOnNyYz1cImFwcC5pbWdcIiAvPlxyXG5cdFx0XHQ8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvIHNjYW1cIiB2LWVsc2U+XHJcblx0XHRcdDxpIGNsYXNzPVwiaWNvbi1hdHRlbnRpb25cIj48L2k+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxzZWN0aW9uIHYtaWY9XCJyaWRsRW5hYmxlZCAmJiBhcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cImFwcFJlcHV0YXRpb24gPT09IGZhbHNlXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT4gbG9hZGluZyByZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIHYtZWxzZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJ1bmtub3duUmVwdXRhdGlvblwiPlVua25vd24gUmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHRydXN0ZWRcIiB2LWlmPVwidHJ1c3RlZFwiPlRydXN0d29ydGh5PC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdW50cnVzdGVkXCIgdi1pZj1cInVudHJ1c3RlZFwiPktub3duIFNjYW08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+PGI+e3thcHAubmFtZX19PC9iPiA8c3BhbiB2LWlmPVwic3VmZml4XCI+e3tzdWZmaXh9fTwvc3Bhbj48L2ZpZ3VyZT5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJy4uL3N2Z3MvU2NhdHRlck91dGxpbmUnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6e1NjYXR0ZXJ9LFxyXG5cdFx0cHJvcHM6WydhcHAnLCAnc3VmZml4J10sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnYXBwUmVwdXRhdGlvbidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdyaWRsRW5hYmxlZCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR1bmtub3duUmVwdXRhdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gPT09IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPiAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHVudHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPCAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQucmVwdXRhdGlvbiB7XHJcblx0XHRwYWRkaW5nOjVweCAxMnB4O1xyXG5cdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRtYXJnaW4tYm90dG9tOjEwcHg7XHJcblx0XHRtYXJnaW4tdG9wOi01cHg7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0Y29sb3I6JGdyZXk7XHJcblxyXG5cdFx0Ji50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokZGFya2dyZWVuO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji51bnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRyZWQ7XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5hcHAtZGV0YWlscyB7XHJcblx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG5cdFx0JGxvZ286MTAwcHg7XHJcblx0XHQubG9nbyB7XHJcblx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdGhlaWdodDokbG9nbztcclxuXHRcdFx0d2lkdGg6JGxvZ287XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6JHJhZGl1cztcclxuXHRcdFx0cGFkZGluZzo1cHg7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHJcblx0XHRcdCYuYm9yZGVyIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWcge1xyXG5cdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCYuc2NhbSB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiA0OHB4O1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cdFx0XHRcdGNvbG9yOiRyZWQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHJcblx0XHRcdFx0YW5pbWF0aW9uOiBwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5uYW1lIHtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2U7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyNGFlMDZhY1wiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiNjZiYjdjNzhcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiNWIzYTMwZDVcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXBkYXRlSWRlbnRpdHkudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9OThhZWJmMjImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiMzAzMmU1MzNcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmZpZWxkcy10aXRsZVtkYXRhLXYtMGEyOWEzZmRde21hcmdpbjotMjBweCAtMzBweCAwO3BhZGRpbmc6MjBweCAzMHB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzAwN2ZkNyAwJSwgIzA3OTlmZiAxMDAlKTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxOHB4O21hcmdpbi1ib3R0b206MjBweH0ucmVxdWlyZWQtZmllbGRzW2RhdGEtdi0wYTI5YTNmZF17cGFkZGluZzoyMHB4IDAgMH1cXG5cIiwgXCJcIl0pO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIucmVwdXRhdGlvbltkYXRhLXYtMjRhZTA2YWNde3BhZGRpbmc6NXB4IDEycHg7Zm9udC1zaXplOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4O21hcmdpbi10b3A6LTVweDtmb250LXdlaWdodDpib2xkO2JhY2tncm91bmQ6I2YzZjZmNztjb2xvcjojYzhjOGM4fS5yZXB1dGF0aW9uLnRydXN0ZWRbZGF0YS12LTI0YWUwNmFjXXtiYWNrZ3JvdW5kOiMxNTlGMDA7Y29sb3I6I2ZmZn0ucmVwdXRhdGlvbi51bnRydXN0ZWRbZGF0YS12LTI0YWUwNmFjXXtiYWNrZ3JvdW5kOiNmZjA3MDc7Y29sb3I6I2ZmZn0uYXBwLWRldGFpbHNbZGF0YS12LTI0YWUwNmFjXXt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5hcHAtZGV0YWlscyAubG9nb1tkYXRhLXYtMjRhZTA2YWNde2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtoZWlnaHQ6MTAwcHg7d2lkdGg6MTAwcHg7Ym9yZGVyLXJhZGl1czowO3BhZGRpbmc6NXB4O21hcmdpbi1ib3R0b206MjBweH0uYXBwLWRldGFpbHMgLmxvZ28uYm9yZGVyW2RhdGEtdi0yNGFlMDZhY117YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMX0uYXBwLWRldGFpbHMgLmxvZ28gaW1nW2RhdGEtdi0yNGFlMDZhY117aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uYXBwLWRldGFpbHMgLmxvZ28gc3BhbltkYXRhLXYtMjRhZTA2YWNde2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6IzdhN2E3YX0uYXBwLWRldGFpbHMgLmxvZ28uc2NhbVtkYXRhLXYtMjRhZTA2YWNde2ZvbnQtc2l6ZTo0OHB4O2JvcmRlci1yYWRpdXM6NTAlO2NvbG9yOiNmZjA3MDc7YmFja2dyb3VuZDojZjNmNmY3O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMTthbmltYXRpb246cHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGV9LmFwcC1kZXRhaWxzIC5uYW1lW2RhdGEtdi0yNGFlMDZhY117Zm9udC1zaXplOjE0cHh9XFxuXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJyZXF1aXJlZC1maWVsZHNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJmaWVsZHMtdGl0bGVcIn0sW192bS5fdihcIlxcblxcdFxcdFJlcXVpcmVkIElkZW50aXR5IEZpZWxkc1xcblxcdFwiKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLFtfYygnbGFiZWwnLFtfdm0uX3YoXCJQZXJzb25hbCBpbmZvcm1hdGlvbjpcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRleHRcIn0sW192bS5fdihcIlxcblxcdFxcdFxcdFwiK192bS5fcyhfdm0uaWRlbnRpdHlSZXF1aXJlbWVudHMpK1wiXFxuXFx0XFx0XCIpXSldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJyZXF1aXJlZC1maWVsZHNcIj5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cImZpZWxkcy10aXRsZVwiPlxyXG5cdFx0XHRSZXF1aXJlZCBJZGVudGl0eSBGaWVsZHNcclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0PGxhYmVsPlBlcnNvbmFsIGluZm9ybWF0aW9uOjwvbGFiZWw+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJ0ZXh0XCI+XHJcblx0XHRcdFx0e3tpZGVudGl0eVJlcXVpcmVtZW50c319XHJcblx0XHRcdDwvZmlndXJlPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHsgbWFwQWN0aW9ucywgbWFwR2V0dGVycywgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRwcm9wczpbJ2ZpZWxkcycsICdpZGVudGl0eScsICdzZWxlY3RlZElkZW50aXR5JywgJ3NlbGVjdGVkTG9jYXRpb24nLCAnY2xvbmVkTG9jYXRpb24nXSxcclxuXHJcblx0XHRkYXRhKCl7cmV0dXJuIHtcclxuXHJcblx0XHR9fSxcclxuXHRcdGNvbXB1dGVkOntcclxuXHJcblx0XHRcdGlkZW50aXR5UmVxdWlyZW1lbnRzKCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBlcnNvbmFsRmllbGRzLmNvbmNhdCh0aGlzLmxvY2F0aW9uRmllbGRzKS5qb2luKCcsICcpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cGVyc29uYWxGaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMucGVyc29uYWw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGxvY2F0aW9uRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLmxvY2F0aW9uO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6e1xyXG5cclxuXHRcdFx0ZmllbGRWYWx1ZUZvcihmaWVsZCwgdXNlVW5jbG9uZWRJZGVudGl0eSA9IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gdXNlVW5jbG9uZWRJZGVudGl0eVxyXG5cdFx0XHRcdFx0PyB0aGlzLmlkZW50aXR5LmdldFByb3BlcnR5VmFsdWVCeU5hbWUoZmllbGQsIHRoaXMuc2VsZWN0ZWRMb2NhdGlvbilcclxuXHRcdFx0XHRcdDogdGhpcy5zZWxlY3RlZElkZW50aXR5LmdldFByb3BlcnR5VmFsdWVCeU5hbWUoZmllbGQsIHRoaXMuY2xvbmVkTG9jYXRpb24pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiIHJlbD1cInN0eWxlc2hlZXQvc2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5maWVsZHMtdGl0bGUge1xyXG5cdFx0bWFyZ2luOi0yMHB4IC0zMHB4IDA7XHJcblx0XHRwYWRkaW5nOjIwcHggMzBweDtcclxuXHRcdGJhY2tncm91bmQ6JGJsdWUtZ3JhZGllbnQ7XHJcblx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHRmb250LXNpemU6IDE4cHg7XHJcblxyXG5cdFx0bWFyZ2luLWJvdHRvbToyMHB4O1xyXG5cdH1cclxuXHJcblx0LnJlcXVpcmVkLWZpZWxkcyB7XHJcblx0XHRwYWRkaW5nOjIwcHggMCAwO1xyXG5cdH1cclxuXHJcbjwvc3R5bGU+IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjBhMjlhM2ZkXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTk4YWViZjIyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VwZGF0ZUlkZW50aXR5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTk4YWViZjIyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc3ZnJyx7YXR0cnM6e1wid2lkdGhcIjpcIjg4cHhcIixcImhlaWdodFwiOlwiODhweFwiLFwidmlld0JveFwiOlwiMCAwIDg4IDg4XCIsXCJ2ZXJzaW9uXCI6XCIxLjFcIixcInhtbG5zXCI6XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwieG1sbnM6eGxpbmtcIjpcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIn19LFtfYygnZycse2F0dHJzOntcImlkXCI6XCJ3ZWxjb21lX3NjYXR0ZXJcIixcInN0cm9rZVwiOlwibm9uZVwiLFwic3Ryb2tlLXdpZHRoXCI6XCIxXCIsXCJmaWxsXCI6XCJub25lXCIsXCJmaWxsLXJ1bGVcIjpcImV2ZW5vZGRcIixcInN0cm9rZS1saW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlLWxpbmVqb2luXCI6XCJyb3VuZFwifX0sW19jKCdnJyx7YXR0cnM6e1wiaWRcIjpcIkdyb3VwXCIsXCJzdHJva2VcIjpcIiMwMEE4RkZcIn19LFtfYygnZycse2F0dHJzOntcImlkXCI6XCJJY29uXCJ9fSxbX2MoJ2NpcmNsZScse2F0dHJzOntcImlkXCI6XCJCYXNlXCIsXCJjeFwiOlwiNDRcIixcImN5XCI6XCI0NFwiLFwiclwiOlwiNDMuNzA3OTY0NlwifX0pXSksX3ZtLl92KFwiIFwiKSxfYygncGF0aCcse2F0dHJzOntcImRcIjpcIk00MC44MTg4NTU5LDcxLjU5MzIyMDMgQzM5LjMwNDAxNzgsNzEuNTkzMjIwMyAzOC4wNDU1NTU5LDcxLjQyMzE1MyAzNy4wNDM0MzIyLDcxLjA4MzAxMzEgQzM2LjA0MTMwODUsNzAuNzQyODczMiAzNS4yNDg5NDM2LDcwLjM2MTY4NzcgMzQuNjY2MzEzNiw2OS45Mzk0NDUxIEMzNC4wODM2ODM1LDY5LjUxNzIwMjUgMzMuNjc1ODQ4Niw2OS4xMTI1NTk0IDMzLjQ0Mjc5NjYsNjguNzI1NTAzNyBDMzMuMjA5NzQ0Niw2OC4zMzg0NDggMzMuMDkzMjIwMyw2OC4wODYyNzkxIDMzLjA5MzIyMDMsNjcuOTY4OTg5NSBDMzMuMDkzMjIwMyw2Ny41NDY3NDY5IDMzLjE4NjQzOTcsNjcuMDk1MTg4NyAzMy4zNzI4ODE0LDY2LjYxNDMwMTMgQzMzLjU1OTMyMyw2Ni4xMzM0MTM5IDMzLjc5MjM3MTUsNjUuNjg3NzIgMzQuMDcyMDMzOSw2NS4yNzcyMDY0IEMzNC4zNTE2OTYzLDY0Ljg2NjY5MjggMzQuNjU0NjU5NCw2NC41MjA2OTM2IDM0Ljk4MDkzMjIsNjQuMjM5MTk4NSBDMzUuMzA3MjA1LDYzLjk1NzcwMzUgMzUuNTk4NTE1Nyw2My44MTY5NTggMzUuODU0ODcyOSw2My44MTY5NTggQzM2LjE4MTE0NTcsNjMuODE2OTU4IDM2LjQ0OTE1MTUsNjQuMDI4MDc2MiAzNi42NTg4OTgzLDY0LjQ1MDMxODggTDM3LjAwODQ3NDYsNjQuODAyMTg1OCBDMzcuMTk0OTE2Miw2NC45ODk4NDkyIDM3LjQ1NzA5NTgsNjUuMTgzMzc0MiAzNy43OTUwMjEyLDY1LjM4Mjc2NjUgQzM4LjEzMjk0NjYsNjUuNTgyMTU4OCAzOC41NTI0MzM5LDY1Ljc2Mzk1NSAzOS4wNTM0OTU4LDY1LjkyODE2MDUgQzM5LjU1NDU1NzYsNjYuMDkyMzY1OSA0MC4xNDMwMDUxLDY2LjE3NDQ2NzQgNDAuODE4ODU1OSw2Ni4xNzQ0Njc0IEM0Mi4yODcwODM2LDY2LjE3NDQ2NzQgNDMuNDg3MjgzNSw2NS43MjI5MDkyIDQ0LjQxOTQ5MTUsNjQuODE5Nzc5MiBDNDUuMzUxNjk5Niw2My45MTY2NDkyIDQ1LjgxNzc5NjYsNjIuNjkwOTkxMSA0NS44MTc3OTY2LDYxLjE0Mjc2ODMgQzQ1LjgxNzc5NjYsNjAuMDYzNzAzOSA0NS41NjcyNjk1LDU5LjEwMTk0MzUgNDUuMDY2MjA3Niw1OC4yNTc0NTgzIEM0NC41NjUxNDU4LDU3LjQxMjk3MzEgNDMuOTA2NzgzNyw1Ni42MjcxNDQ1IDQzLjA5MTEwMTcsNTUuODk5OTQ4OSBDNDIuMjc1NDE5Nyw1NS4xNzI3NTMzIDQxLjM0MzIyNTYsNTQuNDYzMTYxOCA0MC4yOTQ0OTE1LDUzLjc3MTE1MzEgQzM5LjI0NTc1NzUsNTMuMDc5MTQ0NCAzOC4xNzM3MzQzLDUyLjM1NzgyNDEgMzcuMDc4Mzg5OCw1MS42MDcxNzA2IEMzNS45ODMwNDU0LDUwLjg1NjUxNzEgMzQuOTExMDIyMiw1MC4wNDcyMzA5IDMzLjg2MjI4ODEsNDkuMTc5Mjg3OCBDMzIuODEzNTU0MSw0OC4zMTEzNDQ3IDMxLjg4MTM2LDQ3LjMxNDM5OCAzMS4wNjU2NzgsNDYuMTg4NDE3NyBDMzAuMjQ5OTk1OSw0NS4wNjI0Mzc0IDI5LjU5MTYzMzksNDMuNzg5ODY0MyAyOS4wOTA1NzIsNDIuMzcwNjYgQzI4LjU4OTUxMDIsNDAuOTUxNDU1NyAyOC4zMzg5ODMxLDM5LjMyNzAxODkgMjguMzM4OTgzMSwzNy40OTczMDEgQzI4LjMzODk4MzEsMzUuOTI1NjIwMiAyOC42MDY5ODg4LDM0LjM0MjIzNDIgMjkuMTQzMDA4NSwzMi43NDcwOTU1IEMyOS42NzkwMjgxLDMxLjE1MTk1NjggMzAuNDE4OTU3MSwyOS42MzMwNzkyIDMxLjM2MjgxNzgsMjguMTkwNDE3IEMzMi4zMDY2Nzg0LDI2Ljc0Nzc1NDcgMzMuNDE5NDg1MSwyNS4zOTg5NDQ1IDM0LjcwMTI3MTIsMjQuMTQzOTQ1NiBDMzUuOTgzMDU3MywyMi44ODg5NDY4IDM3LjM2OTY5NTksMjEuNzk4MTY5OCAzOC44NjEyMjg4LDIwLjg3MTU4MTggQzQwLjM1Mjc2MTcsMTkuOTQ0OTkzOSA0MS45MDgzNjA1LDE5LjIxNzgwOTIgNDMuNTI4MDcyLDE4LjY5MDAwNiBDNDUuMTQ3NzgzNSwxOC4xNjIyMDI4IDQ2Ljc3MzI5NjksMTcuODk4MzA1MSA0OC40MDQ2NjEsMTcuODk4MzA1MSBDNDkuODAyOTczMSwxNy44OTgzMDUxIDUxLjA2MTQzNTEsMTguMTIxMTUyIDUyLjE4MDA4NDcsMTguNTY2ODUyNSBDNTMuMjk4NzM0NCwxOS4wMTI1NTMgNTQuMjQyNTgwOSwxOS42NDAwNDMgNTUuMDExNjUyNSwyMC40NDkzNDE0IEM1NS43ODA3MjQyLDIxLjI1ODYzOTcgNTYuMzc0OTk3OSwyMi4yMzIxMjg4IDU2Ljc5NDQ5MTUsMjMuMzY5ODM4MSBDNTcuMjEzOTg1MSwyNC41MDc1NDczIDU3LjQyMzcyODgsMjUuNzgwMTIwNSA1Ny40MjM3Mjg4LDI3LjE4NzU5NTggQzU3LjQyMzcyODgsMjguNTI0Njk3NCA1Ny4xOTA2ODAzLDI5LjgzODMyMTMgNTYuNzI0NTc2MywzMS4xMjg1MDcgQzU2LjI1ODQ3MjIsMzIuNDE4NjkyNyA1NS42NDA4OTM3LDMzLjYzODQ4NjQgNTQuODcxODIyLDM0Ljc4NzkyNDYgQzU0LjEwMjc1MDQsMzUuOTM3MzYyNyA1My4yMzQ2NDQ3LDM2Ljk5ODgxNzggNTIuMjY3NDc4OCwzNy45NzIzMjE2IEM1MS4zMDAzMTMsMzguOTQ1ODI1MyA1MC4zMDk4NTY4LDM5Ljc5MDI5NzkgNDkuMjk2MDgwNSw0MC41MDU3NjQ1IEM0OC4yODIzMDQzLDQxLjIyMTIzMTEgNDcuMjk3Njc0Myw0MS43NzgzNDg0IDQ2LjM0MjE2MSw0Mi4xNzcxMzMxIEM0NS4zODY2NDc4LDQyLjU3NTkxNzggNDQuNTQ3NjczMSw0Mi43NzUzMDcxIDQzLjgyNTIxMTksNDIuNzc1MzA3MSBDNDMuMTk1OTcxNCw0Mi43NzUzMDcxIDQyLjYzMDgyODgsNDIuNjI4Njk3MyA0Mi4xMjk3NjY5LDQyLjMzNTQ3MzMgQzQxLjYyODcwNTEsNDIuMDQyMjQ5MiA0MS4yMDkyMTc4LDQxLjY3ODY1NjkgNDAuODcxMjkyNCw0MS4yNDQ2ODUzIEM0MC41MzMzNjcsNDAuODEwNzEzOCA0MC4yNzExODc0LDQwLjM1MzI5MTIgNDAuMDg0NzQ1OCwzOS44NzI0MDM4IEMzOS44OTgzMDQyLDM5LjM5MTUxNjQgMzkuODA1MDg0NywzOC45NjM0MTU3IDM5LjgwNTA4NDcsMzguNTg4MDg4OSBDMzkuODA1MDg0NywzOC4yODMxMzYgMzkuODQ1ODY4MiwzOC4wODM3NDY2IDM5LjkyNzQzNjQsMzcuOTg5OTE0OSBDNDAuMDA5MDA0NiwzNy44OTYwODMyIDQwLjEyNTUyODksMzcuODU1MDMyNSA0MC4yNzcwMTI3LDM3Ljg2Njc2MTQgQzQwLjQyODQ5NjUsMzcuODc4NDkwNCA0MC42MjA3NjE1LDM3LjkxMzY3NjggNDAuODUzODEzNiwzNy45NzIzMjE2IEM0MS4wODY4NjU2LDM4LjAzMDk2NjQgNDEuMzU0ODcxNCwzOC4wNjAyODgzIDQxLjY1NzgzOSwzOC4wNjAyODgzIEM0Mi42MzY2NTc0LDM4LjA2MDI4ODMgNDMuNzIwMzMzLDM3LjcyMDE1MzYgNDQuOTA4ODk4MywzNy4wMzk4NzM4IEM0Ni4wOTc0NjM2LDM2LjM1OTU5NDEgNDcuMjE2MDk2NSwzNS40OTE2NjQgNDguMjY0ODMwNSwzNC40MzYwNTc1IEM0OS4zMTM1NjQ2LDMzLjM4MDQ1MSA1MC4xOTMzMjI3LDMyLjIxOTMwMTMgNTAuOTA0MTMxNCwzMC45NTI1NzM1IEM1MS42MTQ5NCwyOS42ODU4NDU3IDUxLjk3MDMzOSwyOC40NTQzMjMyIDUxLjk3MDMzOSwyNy4yNTc5NjkyIEM1MS45NzAzMzksMjYuMDM4MTU3MyA1MS42NzMyMDIxLDI1LjA3NjM5NjkgNTEuMDc4OTE5NSwyNC4zNzI2NTkyIEM1MC40ODQ2MzY5LDIzLjY2ODkyMTYgNDkuNDc2NzAyLDIzLjMxNzA1OCA0OC4wNTUwODQ3LDIzLjMxNzA1OCBDNDcuMTY5NDg3MSwyMy4zMTcwNTggNDYuMjA4MTYyLDIzLjQ4NzEyNTQgNDUuMTcxMDgwNSwyMy44MjcyNjUzIEM0NC4xMzM5OTkxLDI0LjE2NzQwNTEgNDMuMDkxMTA2OSwyNC42NDI0MjA5IDQyLjA0MjM3MjksMjUuMjUyMzI2OSBDNDAuOTkzNjM4OCwyNS44NjIyMzI5IDM5Ljk3OTg3NzgsMjYuNjAxMTQ2MyAzOS4wMDEwNTkzLDI3LjQ2OTA4OTUgQzM4LjAyMjI0MDksMjguMzM3MDMyNiAzNy4xNTk5NjE0LDI5LjI5MjkyODYgMzYuNDE0MTk0OSwzMC4zMzY4MDYxIEMzNS42Njg0Mjg1LDMxLjM4MDY4MzYgMzUuMDY4MzI4NSwzMi41MDY2NDcgMzQuNjEzODc3MSwzMy43MTQ3MyBDMzQuMTU5NDI1NywzNC45MjI4MTMgMzMuOTMyMjAzNCwzNi4xODM2NTc0IDMzLjkzMjIwMzQsMzcuNDk3MzAxIEMzMy45MzIyMDM0LDM4Ljg4MTMxODQgMzQuMTgyNzMwNSw0MC4xMTg3MDUzIDM0LjY4Mzc5MjQsNDEuMjA5NDk4NiBDMzUuMTg0ODU0Miw0Mi4zMDAyOTIgMzUuODQ5MDQyNSw0My4yOTEzNzQ0IDM2LjY3NjM3NzEsNDQuMTgyNzc1NCBDMzcuNTAzNzExOCw0NS4wNzQxNzY0IDM4LjQ0MTczMiw0NS44OTUxOTE0IDM5LjQ5MDQ2NjEsNDYuNjQ1ODQ0OSBDNDAuNTM5MjAwMiw0Ny4zOTY0OTg0IDQxLjYxMTIyMzMsNDguMTQxMjc2MyA0Mi43MDY1Njc4LDQ4Ljg4MDIwMDggQzQzLjgwMTkxMjMsNDkuNjE5MTI1NCA0NC44NzM5MzU0LDUwLjM4MTQ5NjQgNDUuOTIyNjY5NSw1MS4xNjczMzY4IEM0Ni45NzE0MDM1LDUxLjk1MzE3NzIgNDcuOTA5NDIzOCw1Mi44MjExMDczIDQ4LjczNjc1ODUsNTMuNzcxMTUzMSBDNDkuNTY0MDkzMSw1NC43MjExOTkgNTAuMjI4MjgxNCw1NS43NzY3ODk2IDUwLjcyOTM0MzIsNTYuOTM3OTU2OCBDNTEuMjMwNDA1LDU4LjA5OTEyMzkgNTEuNDgwOTMyMiw1OS40MzAzNDEgNTEuNDgwOTMyMiw2MC45MzE2NDggQzUxLjQ4MDkzMjIsNjIuMzg2MDM5MiA1MS4yMDcxMDAyLDYzLjc2NDE3MTUgNTAuNjU5NDI4LDY1LjA2NjA4NjEgQzUwLjExMTc1NTcsNjYuMzY4MDAwOCA0OS4zNjAxNzQzLDY3LjQ5OTgyODYgNDguNDA0NjYxLDY4LjQ2MTYwMzQgQzQ3LjQ0OTE0NzgsNjkuNDIzMzc4MiA0Ni4zMTg4NjI1LDcwLjE4NTc0OTIgNDUuMDEzNzcxMiw3MC43NDg3Mzk0IEM0My43MDg2Nzk5LDcxLjMxMTcyOTUgNDIuMzEwMzg4OCw3MS41OTMyMjAzIDQwLjgxODg1NTksNzEuNTkzMjIwMyBaXCIsXCJpZFwiOlwiU2NhdHRlclwifX0pXSldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1NjYXR0ZXJPdXRsaW5lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zNjE5NjBmNSZcIlxudmFyIHNjcmlwdCA9IHt9XG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9