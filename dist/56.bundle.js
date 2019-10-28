(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "2qTD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/GetPublicKey.vue?vue&type=template&id=180b6938&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"wants you to provide a public key"}}),_vm._v(" "),_c('section',{staticClass:"get-public-key"},[_c('Button',{attrs:{"blue":"1","big":"1","text":"Select a Key"},nativeOn:{"click":function($event){return _vm.selectKeypair($event)}}}),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('Button',{attrs:{"blue":"1","big":"1","text":"Generate a Key"},nativeOn:{"click":function($event){return _vm.generateNewKey($event)}}})],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"or"},[_c('figure',{staticClass:"text"},[_vm._v("or")])])}]


// CONCATENATED MODULE: ./src/views/popouts/GetPublicKey.vue?vue&type=template&id=180b6938&scoped=true&

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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/GetPublicKey.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
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
		props:['popup', 'expanded'],
		components:{
			PopOutApp: PopOutApp["a" /* default */],
			RequiredFields: RequiredFields["a" /* default */],
			SearchBar: SearchBar["a" /* default */],
		},
		data () {return {
			searchTerms:'',
		}},
		created(){

		},
		computed: {
			...Object(vuex_esm["d" /* mapState */])([
				'scatter'
			]),
			...Object(vuex_esm["c" /* mapGetters */])([
				'identities',
				'accounts',
				'networks',
                'keypairs',
			]),
			payload(){ return this.popup.payload(); },
            blockchain(){ return this.payload.blockchain; },
		},
		methods: {
			returnResult(result){
				this.$emit('returned', result);
			},
			selectKeypair(){
                PopupService["a" /* default */].push(Popup["a" /* Popup */].selectKeypair(keypair => {
                    if(keypair) this.returnResult({keypair, isNew:false});
                }, [this.blockchain]));
			},
			async generateNewKey(){
				this.setWorkingScreen(true);
				setTimeout(async () => {
					const keypair = Keypair_default.a.placeholder();
					keypair.name = `${this.popup.origin()}-${IdGenerator_default.a.text(4)}`;
					await KeyPairService_default.a.generateKeyPair(keypair);
					await KeyPairService_default.a.makePublicKeys(keypair);
					keypair.blockchains = [this.blockchain];
					this.returnResult({keypair, isNew:true});
                }, 50);
            },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9HZXRQdWJsaWNLZXkudnVlPzRkOGYiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL0dldFB1YmxpY0tleS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT80M2MzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL0dldFB1YmxpY0tleS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT9lYzk0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlPzM0YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT82OWM4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80YzUzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzQ2MjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2Y5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlP2RmYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvR2V0UHVibGljS2V5LnZ1ZT84Y2QwIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlP2UxYTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/ZmJmMCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/MjQ5MiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/ODc3ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdmdzL1NjYXR0ZXJPdXRsaW5lLnZ1ZT8xZDYzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvU2NhdHRlck91dGxpbmUudnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IscUJBQXFCLDRCQUE0QixrQkFBa0IsT0FBTyxpRkFBaUYsNEJBQTRCLDZCQUE2QixlQUFlLE9BQU8sMkNBQTJDLFdBQVcseUJBQXlCLG1DQUFtQyxpREFBaUQsT0FBTyw2Q0FBNkMsV0FBVyx5QkFBeUIsb0NBQW9DO0FBQ2xtQixvQ0FBb0MsYUFBYSwwQkFBMEIsd0JBQXdCLG9CQUFvQixpQkFBaUIsZUFBZSxtQkFBbUIsbUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2dCN0wsQ0FBd0Q7QUFDeEQsQ0FBNkQ7QUFDN0QsQ0FBeUU7QUFDekUsQ0FBdUQ7QUFDdkQsQ0FBc0U7QUFDdEUsQ0FBOEU7QUFDOUUsQ0FBdUQ7QUFDdkQsQ0FBNkQ7QUFDN0QsQ0FBNEQ7QUFDNUQsQ0FBZ0U7QUFDaEUsQ0FBaUQ7O0FBRWpELENBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLHVDQUFT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Q0Q2RjtBQUM3Rjs7O0FBR0E7QUFDNkY7QUFDN0YsZ0JBQWdCLDhDQUFVO0FBQzFCO0FBQ0EsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLCtGIiwiZmlsZSI6IjU2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwb3BvdXQtd2luZG93XCJ9LFtfYygnUG9wT3V0QXBwJyx7YXR0cnM6e1wiYXBwXCI6X3ZtLnBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YSxcInN1ZmZpeFwiOlwid2FudHMgeW91IHRvIHByb3ZpZGUgYSBwdWJsaWMga2V5XCJ9fSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZ2V0LXB1YmxpYy1rZXlcIn0sW19jKCdCdXR0b24nLHthdHRyczp7XCJibHVlXCI6XCIxXCIsXCJiaWdcIjpcIjFcIixcInRleHRcIjpcIlNlbGVjdCBhIEtleVwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5zZWxlY3RLZXlwYWlyKCRldmVudCl9fX0pLF92bS5fdihcIiBcIiksX3ZtLl9tKDApLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcImJsdWVcIjpcIjFcIixcImJpZ1wiOlwiMVwiLFwidGV4dFwiOlwiR2VuZXJhdGUgYSBLZXlcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uZ2VuZXJhdGVOZXdLZXkoJGV2ZW50KX19fSldLDEpXSwxKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJvclwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbX3ZtLl92KFwib3JcIildKV0pfV1cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwicG9wb3V0LXdpbmRvd1wiPlxyXG4gICAgICAgIDxQb3BPdXRBcHAgOmFwcD1cInBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YVwiIHN1ZmZpeD1cIndhbnRzIHlvdSB0byBwcm92aWRlIGEgcHVibGljIGtleVwiIC8+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZ2V0LXB1YmxpYy1rZXlcIj5cclxuXHJcbiAgICAgICAgICAgIDxCdXR0b24gYmx1ZT1cIjFcIiBiaWc9XCIxXCIgdGV4dD1cIlNlbGVjdCBhIEtleVwiIEBjbGljay5uYXRpdmU9XCJzZWxlY3RLZXlwYWlyXCIgLz5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm9yXCI+XHJcbiAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGV4dFwiPm9yPC9maWd1cmU+XHJcbiAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICA8QnV0dG9uIGJsdWU9XCIxXCIgYmlnPVwiMVwiIHRleHQ9XCJHZW5lcmF0ZSBhIEtleVwiIEBjbGljay5uYXRpdmU9XCJnZW5lcmF0ZU5ld0tleVwiIC8+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHsgbWFwQWN0aW9ucywgbWFwR2V0dGVycywgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cdGltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZXVzYWJsZS9TZWFyY2hCYXInO1xyXG5cdGltcG9ydCB7SWRlbnRpdHlSZXF1aXJlZEZpZWxkc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0lkZW50aXR5XCI7XHJcblx0aW1wb3J0IE5ldHdvcmsgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL05ldHdvcmtcIjtcclxuXHRpbXBvcnQgUmVxdWlyZWRGaWVsZHMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkc1wiO1xyXG5cdGltcG9ydCBLZXlQYWlyU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIjtcclxuXHRpbXBvcnQgS2V5cGFpciBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvS2V5cGFpclwiO1xyXG5cdGltcG9ydCBJZEdlbmVyYXRvciBmcm9tIFwiQHdhbGxldHBhY2svY29yZS91dGlsL0lkR2VuZXJhdG9yXCI7XHJcblx0aW1wb3J0IFBvcE91dEFwcCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcFwiO1xyXG5cdGltcG9ydCBQb3B1cFNlcnZpY2UgZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3V0aWxpdHkvUG9wdXBTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4uLy4uL21vZGVscy9wb3B1cHMvUG9wdXBcIjtcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wydwb3B1cCcsICdleHBhbmRlZCddLFxyXG5cdFx0Y29tcG9uZW50czp7XHJcblx0XHRcdFBvcE91dEFwcCxcclxuXHRcdFx0UmVxdWlyZWRGaWVsZHMsXHJcblx0XHRcdFNlYXJjaEJhcixcclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtyZXR1cm4ge1xyXG5cdFx0XHRzZWFyY2hUZXJtczonJyxcclxuXHRcdH19LFxyXG5cdFx0Y3JlYXRlZCgpe1xyXG5cclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDoge1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NjYXR0ZXInXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQnaWRlbnRpdGllcycsXHJcblx0XHRcdFx0J2FjY291bnRzJyxcclxuXHRcdFx0XHQnbmV0d29ya3MnLFxyXG4gICAgICAgICAgICAgICAgJ2tleXBhaXJzJyxcclxuXHRcdFx0XSksXHJcblx0XHRcdHBheWxvYWQoKXsgcmV0dXJuIHRoaXMucG9wdXAucGF5bG9hZCgpOyB9LFxyXG4gICAgICAgICAgICBibG9ja2NoYWluKCl7IHJldHVybiB0aGlzLnBheWxvYWQuYmxvY2tjaGFpbjsgfSxcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdHJldHVyblJlc3VsdChyZXN1bHQpe1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoJ3JldHVybmVkJywgcmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0S2V5cGFpcigpe1xyXG4gICAgICAgICAgICAgICAgUG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc2VsZWN0S2V5cGFpcihrZXlwYWlyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihrZXlwYWlyKSB0aGlzLnJldHVyblJlc3VsdCh7a2V5cGFpciwgaXNOZXc6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIH0sIFt0aGlzLmJsb2NrY2hhaW5dKSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIGdlbmVyYXRlTmV3S2V5KCl7XHJcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nU2NyZWVuKHRydWUpO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3Qga2V5cGFpciA9IEtleXBhaXIucGxhY2Vob2xkZXIoKTtcclxuXHRcdFx0XHRcdGtleXBhaXIubmFtZSA9IGAke3RoaXMucG9wdXAub3JpZ2luKCl9LSR7SWRHZW5lcmF0b3IudGV4dCg0KX1gO1xyXG5cdFx0XHRcdFx0YXdhaXQgS2V5UGFpclNlcnZpY2UuZ2VuZXJhdGVLZXlQYWlyKGtleXBhaXIpO1xyXG5cdFx0XHRcdFx0YXdhaXQgS2V5UGFpclNlcnZpY2UubWFrZVB1YmxpY0tleXMoa2V5cGFpcik7XHJcblx0XHRcdFx0XHRrZXlwYWlyLmJsb2NrY2hhaW5zID0gW3RoaXMuYmxvY2tjaGFpbl07XHJcblx0XHRcdFx0XHR0aGlzLnJldHVyblJlc3VsdCh7a2V5cGFpciwgaXNOZXc6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9LFxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcbiAgICBAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuICAgIC5hcHAtZGV0YWlscyB7XHJcbiAgICAgICAgcGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5nZXQtcHVibGljLWtleSB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzo1MHB4O1xyXG4gICAgfVxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9HZXRQdWJsaWNLZXkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE4MGI2OTM4JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vR2V0UHVibGljS2V5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTE4MGI2OTM4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjE4MGI2OTM4XCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXBwLWRldGFpbHNbZGF0YS12LTE4MGI2OTM4XXtwYWRkaW5nOjUwcHggNTBweCAyMHB4IDUwcHh9LmdldC1wdWJsaWMta2V5W2RhdGEtdi0xODBiNjkzOF17dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo1MHB4fVxcblwiLCBcIlwiXSk7XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vR2V0UHVibGljS2V5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTE4MGI2OTM4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xODBiNjkzOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFwcC1kZXRhaWxzXCJ9LFsoIV92bS51bnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ29cIixjbGFzczp7J2JvcmRlcic6X3ZtLmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIV92bS5hcHAuaW1nfX0sWyhfdm0uYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJyk/X2MoJ1NjYXR0ZXInKTooX3ZtLmFwcC5pbWcpP19jKCdpbWcnLHthdHRyczp7XCJzcmNcIjpfdm0uYXBwLmltZ319KTpfYygnc3BhbicsW192bS5fdihcIk5vIEltYWdlXCIpXSldLDEpOl9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ28gc2NhbVwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tYXR0ZW50aW9uXCJ9KV0pLF92bS5fdihcIiBcIiksKF92bS5yaWRsRW5hYmxlZCAmJiBfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyk/X2MoJ3NlY3Rpb24nLFsoX3ZtLmFwcFJlcHV0YXRpb24gPT09IGZhbHNlKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pLF92bS5fdihcIiBsb2FkaW5nIHJlcHV0YXRpb25cIildKTpfYygnc2VjdGlvbicsWyhfdm0udW5rbm93blJlcHV0YXRpb24pP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW192bS5fdihcIlVua25vd24gUmVwdXRhdGlvblwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHRydXN0ZWRcIn0sW192bS5fdihcIlRydXN0d29ydGh5XCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvbiB1bnRydXN0ZWRcIn0sW192bS5fdihcIktub3duIFNjYW1cIildKTpfdm0uX2UoKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfYygnYicsW192bS5fdihfdm0uX3MoX3ZtLmFwcC5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLChfdm0uc3VmZml4KT9fYygnc3BhbicsW192bS5fdihfdm0uX3MoX3ZtLnN1ZmZpeCkpXSk6X3ZtLl9lKCldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tIEFQUCBERVRBSUxTIC0tLS0tLS0tLS0tLT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJhcHAtZGV0YWlsc1wiPlxyXG5cdFx0PGZpZ3VyZSBjbGFzcz1cImxvZ29cIiB2LWlmPVwiIXVudHJ1c3RlZFwiIDpjbGFzcz1cInsnYm9yZGVyJzphcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInICYmICFhcHAuaW1nfVwiPlxyXG5cdFx0XHQ8U2NhdHRlciB2LWlmPVwiYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJ1wiIC8+XHJcblx0XHRcdDxpbWcgdi1lbHNlLWlmPVwiYXBwLmltZ1wiIDpzcmM9XCJhcHAuaW1nXCIgLz5cclxuXHRcdFx0PHNwYW4gdi1lbHNlPk5vIEltYWdlPC9zcGFuPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nbyBzY2FtXCIgdi1lbHNlPlxyXG5cdFx0XHQ8aSBjbGFzcz1cImljb24tYXR0ZW50aW9uXCI+PC9pPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8c2VjdGlvbiB2LWlmPVwicmlkbEVuYWJsZWQgJiYgYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJ1wiPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJhcHBSZXB1dGF0aW9uID09PSBmYWxzZVwiPjxpIGNsYXNzPVwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIj48L2k+IGxvYWRpbmcgcmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHQ8c2VjdGlvbiB2LWVsc2U+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb25cIiB2LWlmPVwidW5rbm93blJlcHV0YXRpb25cIj5Vbmtub3duIFJlcHV0YXRpb248L2ZpZ3VyZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvbiB0cnVzdGVkXCIgdi1pZj1cInRydXN0ZWRcIj5UcnVzdHdvcnRoeTwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwiIHYtaWY9XCJ1bnRydXN0ZWRcIj5Lbm93biBTY2FtPC9maWd1cmU+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPjxiPnt7YXBwLm5hbWV9fTwvYj4gPHNwYW4gdi1pZj1cInN1ZmZpeFwiPnt7c3VmZml4fX08L3NwYW4+PC9maWd1cmU+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQge21hcFN0YXRlLCBtYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQgU2NhdHRlciBmcm9tICcuLi9zdmdzL1NjYXR0ZXJPdXRsaW5lJ1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOntTY2F0dGVyfSxcclxuXHRcdHByb3BzOlsnYXBwJywgJ3N1ZmZpeCddLFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J2FwcFJlcHV0YXRpb24nXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQncmlkbEVuYWJsZWQnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0dW5rbm93blJlcHV0YXRpb24oKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uID09PSB1bmRlZmluZWQ7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpID4gMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR1bnRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpIDwgMFxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LnJlcHV0YXRpb24ge1xyXG5cdFx0cGFkZGluZzo1cHggMTJweDtcclxuXHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0bWFyZ2luLWJvdHRvbToxMHB4O1xyXG5cdFx0bWFyZ2luLXRvcDotNXB4O1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRiYWNrZ3JvdW5kOiRsaWdodGVyZ3JleTtcclxuXHRcdGNvbG9yOiRncmV5O1xyXG5cclxuXHRcdCYudHJ1c3RlZCB7XHJcblx0XHRcdGJhY2tncm91bmQ6JGRhcmtncmVlbjtcclxuXHRcdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdCYudW50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokcmVkO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQuYXBwLWRldGFpbHMge1xyXG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XHJcblx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuXHRcdCRsb2dvOjEwMHB4O1xyXG5cdFx0LmxvZ28ge1xyXG5cdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHRoZWlnaHQ6JGxvZ287XHJcblx0XHRcdHdpZHRoOiRsb2dvO1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiRyYWRpdXM7XHJcblx0XHRcdHBhZGRpbmc6NXB4O1xyXG5cdFx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblxyXG5cdFx0XHQmLmJvcmRlciB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW1nIHtcclxuXHRcdFx0XHRoZWlnaHQ6MTAwJTtcclxuXHRcdFx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzcGFuIHtcclxuXHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRjb2xvcjokc2lsdmVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQmLnNjYW0ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogNDhweDtcclxuXHRcdFx0XHRib3JkZXItcmFkaXVzOjUwJTtcclxuXHRcdFx0XHRjb2xvcjokcmVkO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICRsaWdodGVyZ3JleTtcclxuXHRcdFx0XHRib3JkZXI6MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblxyXG5cdFx0XHRcdGFuaW1hdGlvbjogcHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQubmFtZSB7XHJcblx0XHRcdGZvbnQtc2l6ZTogJGxhcmdlO1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMjRhZTA2YWNcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjY2YmI3Yzc4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yNGFlMDZhYyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjViM2EzMGQ1XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0dldFB1YmxpY0tleS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xODBiNjkzOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJhZDBmMmU2NlwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZmllbGRzLXRpdGxlW2RhdGEtdi0wYTI5YTNmZF17bWFyZ2luOi0yMHB4IC0zMHB4IDA7cGFkZGluZzoyMHB4IDMwcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMDA3ZmQ3IDAlLCAjMDc5OWZmIDEwMCUpO2NvbG9yOiNmZmY7Zm9udC1zaXplOjE4cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5yZXF1aXJlZC1maWVsZHNbZGF0YS12LTBhMjlhM2ZkXXtwYWRkaW5nOjIwcHggMCAwfVxcblwiLCBcIlwiXSk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yZXB1dGF0aW9uW2RhdGEtdi0yNGFlMDZhY117cGFkZGluZzo1cHggMTJweDtmb250LXNpemU6MTBweDttYXJnaW4tYm90dG9tOjEwcHg7bWFyZ2luLXRvcDotNXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZDojZjNmNmY3O2NvbG9yOiNjOGM4Yzh9LnJlcHV0YXRpb24udHJ1c3RlZFtkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6IzE1OUYwMDtjb2xvcjojZmZmfS5yZXB1dGF0aW9uLnVudHJ1c3RlZFtkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6I2ZmMDcwNztjb2xvcjojZmZmfS5hcHAtZGV0YWlsc1tkYXRhLXYtMjRhZTA2YWNde3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFwcC1kZXRhaWxzIC5sb2dvW2RhdGEtdi0yNGFlMDZhY117ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2hlaWdodDoxMDBweDt3aWR0aDoxMDBweDtib3JkZXItcmFkaXVzOjA7cGFkZGluZzo1cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5hcHAtZGV0YWlscyAubG9nby5ib3JkZXJbZGF0YS12LTI0YWUwNmFjXXtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxfS5hcHAtZGV0YWlscyAubG9nbyBpbWdbZGF0YS12LTI0YWUwNmFjXXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5hcHAtZGV0YWlscyAubG9nbyBzcGFuW2RhdGEtdi0yNGFlMDZhY117Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojN2E3YTdhfS5hcHAtZGV0YWlscyAubG9nby5zY2FtW2RhdGEtdi0yNGFlMDZhY117Zm9udC1zaXplOjQ4cHg7Ym9yZGVyLXJhZGl1czo1MCU7Y29sb3I6I2ZmMDcwNztiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxO2FuaW1hdGlvbjpwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZX0uYXBwLWRldGFpbHMgLm5hbWVbZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6MTRweH1cXG5cIiwgXCJcIl0pO1xuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJlcXVpcmVkLWZpZWxkc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImZpZWxkcy10aXRsZVwifSxbX3ZtLl92KFwiXFxuXFx0XFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXFxuXFx0XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicsW19jKCdsYWJlbCcsW192bS5fdihcIlBlcnNvbmFsIGluZm9ybWF0aW9uOlwiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbX3ZtLl92KFwiXFxuXFx0XFx0XFx0XCIrX3ZtLl9zKF92bS5pZGVudGl0eVJlcXVpcmVtZW50cykrXCJcXG5cXHRcXHRcIildKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cInJlcXVpcmVkLWZpZWxkc1wiPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwiZmllbGRzLXRpdGxlXCI+XHJcblx0XHRcdFJlcXVpcmVkIElkZW50aXR5IEZpZWxkc1xyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxzZWN0aW9uPlxyXG5cdFx0XHQ8bGFiZWw+UGVyc29uYWwgaW5mb3JtYXRpb246PC9sYWJlbD5cclxuXHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRleHRcIj5cclxuXHRcdFx0XHR7e2lkZW50aXR5UmVxdWlyZW1lbnRzfX1cclxuXHRcdFx0PC9maWd1cmU+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsnZmllbGRzJywgJ2lkZW50aXR5JywgJ3NlbGVjdGVkSWRlbnRpdHknLCAnc2VsZWN0ZWRMb2NhdGlvbicsICdjbG9uZWRMb2NhdGlvbiddLFxyXG5cclxuXHRcdGRhdGEoKXtyZXR1cm4ge1xyXG5cclxuXHRcdH19LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cclxuXHRcdFx0aWRlbnRpdHlSZXF1aXJlbWVudHMoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGVyc29uYWxGaWVsZHMuY29uY2F0KHRoaXMubG9jYXRpb25GaWVsZHMpLmpvaW4oJywgJyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwZXJzb25hbEZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5wZXJzb25hbDtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9jYXRpb25GaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMubG9jYXRpb247XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblxyXG5cdFx0XHRmaWVsZFZhbHVlRm9yKGZpZWxkLCB1c2VVbmNsb25lZElkZW50aXR5ID0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiB1c2VVbmNsb25lZElkZW50aXR5XHJcblx0XHRcdFx0XHQ/IHRoaXMuaWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5zZWxlY3RlZExvY2F0aW9uKVxyXG5cdFx0XHRcdFx0OiB0aGlzLnNlbGVjdGVkSWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5jbG9uZWRMb2NhdGlvbik7XHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmZpZWxkcy10aXRsZSB7XHJcblx0XHRtYXJnaW46LTIwcHggLTMwcHggMDtcclxuXHRcdHBhZGRpbmc6MjBweCAzMHB4O1xyXG5cdFx0YmFja2dyb3VuZDokYmx1ZS1ncmFkaWVudDtcclxuXHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdGZvbnQtc2l6ZTogMThweDtcclxuXHJcblx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblx0fVxyXG5cclxuXHQucmVxdWlyZWQtZmllbGRzIHtcclxuXHRcdHBhZGRpbmc6MjBweCAwIDA7XHJcblx0fVxyXG5cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMGEyOWEzZmRcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3N2Zycse2F0dHJzOntcIndpZHRoXCI6XCI4OHB4XCIsXCJoZWlnaHRcIjpcIjg4cHhcIixcInZpZXdCb3hcIjpcIjAgMCA4OCA4OFwiLFwidmVyc2lvblwiOlwiMS4xXCIsXCJ4bWxuc1wiOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInhtbG5zOnhsaW5rXCI6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwid2VsY29tZV9zY2F0dGVyXCIsXCJzdHJva2VcIjpcIm5vbmVcIixcInN0cm9rZS13aWR0aFwiOlwiMVwiLFwiZmlsbFwiOlwibm9uZVwiLFwiZmlsbC1ydWxlXCI6XCJldmVub2RkXCIsXCJzdHJva2UtbGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZS1saW5lam9pblwiOlwicm91bmRcIn19LFtfYygnZycse2F0dHJzOntcImlkXCI6XCJHcm91cFwiLFwic3Ryb2tlXCI6XCIjMDBBOEZGXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwiSWNvblwifX0sW19jKCdjaXJjbGUnLHthdHRyczp7XCJpZFwiOlwiQmFzZVwiLFwiY3hcIjpcIjQ0XCIsXCJjeVwiOlwiNDRcIixcInJcIjpcIjQzLjcwNzk2NDZcIn19KV0pLF92bS5fdihcIiBcIiksX2MoJ3BhdGgnLHthdHRyczp7XCJkXCI6XCJNNDAuODE4ODU1OSw3MS41OTMyMjAzIEMzOS4zMDQwMTc4LDcxLjU5MzIyMDMgMzguMDQ1NTU1OSw3MS40MjMxNTMgMzcuMDQzNDMyMiw3MS4wODMwMTMxIEMzNi4wNDEzMDg1LDcwLjc0Mjg3MzIgMzUuMjQ4OTQzNiw3MC4zNjE2ODc3IDM0LjY2NjMxMzYsNjkuOTM5NDQ1MSBDMzQuMDgzNjgzNSw2OS41MTcyMDI1IDMzLjY3NTg0ODYsNjkuMTEyNTU5NCAzMy40NDI3OTY2LDY4LjcyNTUwMzcgQzMzLjIwOTc0NDYsNjguMzM4NDQ4IDMzLjA5MzIyMDMsNjguMDg2Mjc5MSAzMy4wOTMyMjAzLDY3Ljk2ODk4OTUgQzMzLjA5MzIyMDMsNjcuNTQ2NzQ2OSAzMy4xODY0Mzk3LDY3LjA5NTE4ODcgMzMuMzcyODgxNCw2Ni42MTQzMDEzIEMzMy41NTkzMjMsNjYuMTMzNDEzOSAzMy43OTIzNzE1LDY1LjY4NzcyIDM0LjA3MjAzMzksNjUuMjc3MjA2NCBDMzQuMzUxNjk2Myw2NC44NjY2OTI4IDM0LjY1NDY1OTQsNjQuNTIwNjkzNiAzNC45ODA5MzIyLDY0LjIzOTE5ODUgQzM1LjMwNzIwNSw2My45NTc3MDM1IDM1LjU5ODUxNTcsNjMuODE2OTU4IDM1Ljg1NDg3MjksNjMuODE2OTU4IEMzNi4xODExNDU3LDYzLjgxNjk1OCAzNi40NDkxNTE1LDY0LjAyODA3NjIgMzYuNjU4ODk4Myw2NC40NTAzMTg4IEwzNy4wMDg0NzQ2LDY0LjgwMjE4NTggQzM3LjE5NDkxNjIsNjQuOTg5ODQ5MiAzNy40NTcwOTU4LDY1LjE4MzM3NDIgMzcuNzk1MDIxMiw2NS4zODI3NjY1IEMzOC4xMzI5NDY2LDY1LjU4MjE1ODggMzguNTUyNDMzOSw2NS43NjM5NTUgMzkuMDUzNDk1OCw2NS45MjgxNjA1IEMzOS41NTQ1NTc2LDY2LjA5MjM2NTkgNDAuMTQzMDA1MSw2Ni4xNzQ0Njc0IDQwLjgxODg1NTksNjYuMTc0NDY3NCBDNDIuMjg3MDgzNiw2Ni4xNzQ0Njc0IDQzLjQ4NzI4MzUsNjUuNzIyOTA5MiA0NC40MTk0OTE1LDY0LjgxOTc3OTIgQzQ1LjM1MTY5OTYsNjMuOTE2NjQ5MiA0NS44MTc3OTY2LDYyLjY5MDk5MTEgNDUuODE3Nzk2Niw2MS4xNDI3NjgzIEM0NS44MTc3OTY2LDYwLjA2MzcwMzkgNDUuNTY3MjY5NSw1OS4xMDE5NDM1IDQ1LjA2NjIwNzYsNTguMjU3NDU4MyBDNDQuNTY1MTQ1OCw1Ny40MTI5NzMxIDQzLjkwNjc4MzcsNTYuNjI3MTQ0NSA0My4wOTExMDE3LDU1Ljg5OTk0ODkgQzQyLjI3NTQxOTcsNTUuMTcyNzUzMyA0MS4zNDMyMjU2LDU0LjQ2MzE2MTggNDAuMjk0NDkxNSw1My43NzExNTMxIEMzOS4yNDU3NTc1LDUzLjA3OTE0NDQgMzguMTczNzM0Myw1Mi4zNTc4MjQxIDM3LjA3ODM4OTgsNTEuNjA3MTcwNiBDMzUuOTgzMDQ1NCw1MC44NTY1MTcxIDM0LjkxMTAyMjIsNTAuMDQ3MjMwOSAzMy44NjIyODgxLDQ5LjE3OTI4NzggQzMyLjgxMzU1NDEsNDguMzExMzQ0NyAzMS44ODEzNiw0Ny4zMTQzOTggMzEuMDY1Njc4LDQ2LjE4ODQxNzcgQzMwLjI0OTk5NTksNDUuMDYyNDM3NCAyOS41OTE2MzM5LDQzLjc4OTg2NDMgMjkuMDkwNTcyLDQyLjM3MDY2IEMyOC41ODk1MTAyLDQwLjk1MTQ1NTcgMjguMzM4OTgzMSwzOS4zMjcwMTg5IDI4LjMzODk4MzEsMzcuNDk3MzAxIEMyOC4zMzg5ODMxLDM1LjkyNTYyMDIgMjguNjA2OTg4OCwzNC4zNDIyMzQyIDI5LjE0MzAwODUsMzIuNzQ3MDk1NSBDMjkuNjc5MDI4MSwzMS4xNTE5NTY4IDMwLjQxODk1NzEsMjkuNjMzMDc5MiAzMS4zNjI4MTc4LDI4LjE5MDQxNyBDMzIuMzA2Njc4NCwyNi43NDc3NTQ3IDMzLjQxOTQ4NTEsMjUuMzk4OTQ0NSAzNC43MDEyNzEyLDI0LjE0Mzk0NTYgQzM1Ljk4MzA1NzMsMjIuODg4OTQ2OCAzNy4zNjk2OTU5LDIxLjc5ODE2OTggMzguODYxMjI4OCwyMC44NzE1ODE4IEM0MC4zNTI3NjE3LDE5Ljk0NDk5MzkgNDEuOTA4MzYwNSwxOS4yMTc4MDkyIDQzLjUyODA3MiwxOC42OTAwMDYgQzQ1LjE0Nzc4MzUsMTguMTYyMjAyOCA0Ni43NzMyOTY5LDE3Ljg5ODMwNTEgNDguNDA0NjYxLDE3Ljg5ODMwNTEgQzQ5LjgwMjk3MzEsMTcuODk4MzA1MSA1MS4wNjE0MzUxLDE4LjEyMTE1MiA1Mi4xODAwODQ3LDE4LjU2Njg1MjUgQzUzLjI5ODczNDQsMTkuMDEyNTUzIDU0LjI0MjU4MDksMTkuNjQwMDQzIDU1LjAxMTY1MjUsMjAuNDQ5MzQxNCBDNTUuNzgwNzI0MiwyMS4yNTg2Mzk3IDU2LjM3NDk5NzksMjIuMjMyMTI4OCA1Ni43OTQ0OTE1LDIzLjM2OTgzODEgQzU3LjIxMzk4NTEsMjQuNTA3NTQ3MyA1Ny40MjM3Mjg4LDI1Ljc4MDEyMDUgNTcuNDIzNzI4OCwyNy4xODc1OTU4IEM1Ny40MjM3Mjg4LDI4LjUyNDY5NzQgNTcuMTkwNjgwMywyOS44MzgzMjEzIDU2LjcyNDU3NjMsMzEuMTI4NTA3IEM1Ni4yNTg0NzIyLDMyLjQxODY5MjcgNTUuNjQwODkzNywzMy42Mzg0ODY0IDU0Ljg3MTgyMiwzNC43ODc5MjQ2IEM1NC4xMDI3NTA0LDM1LjkzNzM2MjcgNTMuMjM0NjQ0NywzNi45OTg4MTc4IDUyLjI2NzQ3ODgsMzcuOTcyMzIxNiBDNTEuMzAwMzEzLDM4Ljk0NTgyNTMgNTAuMzA5ODU2OCwzOS43OTAyOTc5IDQ5LjI5NjA4MDUsNDAuNTA1NzY0NSBDNDguMjgyMzA0Myw0MS4yMjEyMzExIDQ3LjI5NzY3NDMsNDEuNzc4MzQ4NCA0Ni4zNDIxNjEsNDIuMTc3MTMzMSBDNDUuMzg2NjQ3OCw0Mi41NzU5MTc4IDQ0LjU0NzY3MzEsNDIuNzc1MzA3MSA0My44MjUyMTE5LDQyLjc3NTMwNzEgQzQzLjE5NTk3MTQsNDIuNzc1MzA3MSA0Mi42MzA4Mjg4LDQyLjYyODY5NzMgNDIuMTI5NzY2OSw0Mi4zMzU0NzMzIEM0MS42Mjg3MDUxLDQyLjA0MjI0OTIgNDEuMjA5MjE3OCw0MS42Nzg2NTY5IDQwLjg3MTI5MjQsNDEuMjQ0Njg1MyBDNDAuNTMzMzY3LDQwLjgxMDcxMzggNDAuMjcxMTg3NCw0MC4zNTMyOTEyIDQwLjA4NDc0NTgsMzkuODcyNDAzOCBDMzkuODk4MzA0MiwzOS4zOTE1MTY0IDM5LjgwNTA4NDcsMzguOTYzNDE1NyAzOS44MDUwODQ3LDM4LjU4ODA4ODkgQzM5LjgwNTA4NDcsMzguMjgzMTM2IDM5Ljg0NTg2ODIsMzguMDgzNzQ2NiAzOS45Mjc0MzY0LDM3Ljk4OTkxNDkgQzQwLjAwOTAwNDYsMzcuODk2MDgzMiA0MC4xMjU1Mjg5LDM3Ljg1NTAzMjUgNDAuMjc3MDEyNywzNy44NjY3NjE0IEM0MC40Mjg0OTY1LDM3Ljg3ODQ5MDQgNDAuNjIwNzYxNSwzNy45MTM2NzY4IDQwLjg1MzgxMzYsMzcuOTcyMzIxNiBDNDEuMDg2ODY1NiwzOC4wMzA5NjY0IDQxLjM1NDg3MTQsMzguMDYwMjg4MyA0MS42NTc4MzksMzguMDYwMjg4MyBDNDIuNjM2NjU3NCwzOC4wNjAyODgzIDQzLjcyMDMzMywzNy43MjAxNTM2IDQ0LjkwODg5ODMsMzcuMDM5ODczOCBDNDYuMDk3NDYzNiwzNi4zNTk1OTQxIDQ3LjIxNjA5NjUsMzUuNDkxNjY0IDQ4LjI2NDgzMDUsMzQuNDM2MDU3NSBDNDkuMzEzNTY0NiwzMy4zODA0NTEgNTAuMTkzMzIyNywzMi4yMTkzMDEzIDUwLjkwNDEzMTQsMzAuOTUyNTczNSBDNTEuNjE0OTQsMjkuNjg1ODQ1NyA1MS45NzAzMzksMjguNDU0MzIzMiA1MS45NzAzMzksMjcuMjU3OTY5MiBDNTEuOTcwMzM5LDI2LjAzODE1NzMgNTEuNjczMjAyMSwyNS4wNzYzOTY5IDUxLjA3ODkxOTUsMjQuMzcyNjU5MiBDNTAuNDg0NjM2OSwyMy42Njg5MjE2IDQ5LjQ3NjcwMiwyMy4zMTcwNTggNDguMDU1MDg0NywyMy4zMTcwNTggQzQ3LjE2OTQ4NzEsMjMuMzE3MDU4IDQ2LjIwODE2MiwyMy40ODcxMjU0IDQ1LjE3MTA4MDUsMjMuODI3MjY1MyBDNDQuMTMzOTk5MSwyNC4xNjc0MDUxIDQzLjA5MTEwNjksMjQuNjQyNDIwOSA0Mi4wNDIzNzI5LDI1LjI1MjMyNjkgQzQwLjk5MzYzODgsMjUuODYyMjMyOSAzOS45Nzk4Nzc4LDI2LjYwMTE0NjMgMzkuMDAxMDU5MywyNy40NjkwODk1IEMzOC4wMjIyNDA5LDI4LjMzNzAzMjYgMzcuMTU5OTYxNCwyOS4yOTI5Mjg2IDM2LjQxNDE5NDksMzAuMzM2ODA2MSBDMzUuNjY4NDI4NSwzMS4zODA2ODM2IDM1LjA2ODMyODUsMzIuNTA2NjQ3IDM0LjYxMzg3NzEsMzMuNzE0NzMgQzM0LjE1OTQyNTcsMzQuOTIyODEzIDMzLjkzMjIwMzQsMzYuMTgzNjU3NCAzMy45MzIyMDM0LDM3LjQ5NzMwMSBDMzMuOTMyMjAzNCwzOC44ODEzMTg0IDM0LjE4MjczMDUsNDAuMTE4NzA1MyAzNC42ODM3OTI0LDQxLjIwOTQ5ODYgQzM1LjE4NDg1NDIsNDIuMzAwMjkyIDM1Ljg0OTA0MjUsNDMuMjkxMzc0NCAzNi42NzYzNzcxLDQ0LjE4Mjc3NTQgQzM3LjUwMzcxMTgsNDUuMDc0MTc2NCAzOC40NDE3MzIsNDUuODk1MTkxNCAzOS40OTA0NjYxLDQ2LjY0NTg0NDkgQzQwLjUzOTIwMDIsNDcuMzk2NDk4NCA0MS42MTEyMjMzLDQ4LjE0MTI3NjMgNDIuNzA2NTY3OCw0OC44ODAyMDA4IEM0My44MDE5MTIzLDQ5LjYxOTEyNTQgNDQuODczOTM1NCw1MC4zODE0OTY0IDQ1LjkyMjY2OTUsNTEuMTY3MzM2OCBDNDYuOTcxNDAzNSw1MS45NTMxNzcyIDQ3LjkwOTQyMzgsNTIuODIxMTA3MyA0OC43MzY3NTg1LDUzLjc3MTE1MzEgQzQ5LjU2NDA5MzEsNTQuNzIxMTk5IDUwLjIyODI4MTQsNTUuNzc2Nzg5NiA1MC43MjkzNDMyLDU2LjkzNzk1NjggQzUxLjIzMDQwNSw1OC4wOTkxMjM5IDUxLjQ4MDkzMjIsNTkuNDMwMzQxIDUxLjQ4MDkzMjIsNjAuOTMxNjQ4IEM1MS40ODA5MzIyLDYyLjM4NjAzOTIgNTEuMjA3MTAwMiw2My43NjQxNzE1IDUwLjY1OTQyOCw2NS4wNjYwODYxIEM1MC4xMTE3NTU3LDY2LjM2ODAwMDggNDkuMzYwMTc0Myw2Ny40OTk4Mjg2IDQ4LjQwNDY2MSw2OC40NjE2MDM0IEM0Ny40NDkxNDc4LDY5LjQyMzM3ODIgNDYuMzE4ODYyNSw3MC4xODU3NDkyIDQ1LjAxMzc3MTIsNzAuNzQ4NzM5NCBDNDMuNzA4Njc5OSw3MS4zMTE3Mjk1IDQyLjMxMDM4ODgsNzEuNTkzMjIwMyA0MC44MTg4NTU5LDcxLjU5MzIyMDMgWlwiLFwiaWRcIjpcIlNjYXR0ZXJcIn19KV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TY2F0dGVyT3V0bGluZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzYxOTYwZjUmXCJcbnZhciBzY3JpcHQgPSB7fVxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==