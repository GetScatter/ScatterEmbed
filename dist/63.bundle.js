(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ "/sK+":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-500b4f50]{padding:50px}.main-panel[data-v-500b4f50]{text-align:center}.fixed-actions .actions[data-v-500b4f50]{display:flex;justify-content:space-between}\n", ""]);


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

/***/ "M/P+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/LinkApp.vue?vue&type=template&id=500b4f50&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"is relinking"}}),_vm._v(" "),_c('section',{staticClass:"fixed-actions"},[_vm._v("\n        Make sure the application name is an application you are interacting with right now.\n        If it isn't it could be a dangerous application trying to act like a different one.\n        "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Deny),"big":"1"},nativeOn:{"click":function($event){return _vm.returnResult(false)}}}),_vm._v(" "),_c('Button',{attrs:{"blue":"1","big":"1","text":_vm.locale(_vm.langKeys.GENERIC.Allow)},nativeOn:{"click":function($event){return _vm.returnResult(true)}}})],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/popouts/LinkApp.vue?vue&type=template&id=500b4f50&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/AuthorizedApp.js
var AuthorizedApp = __webpack_require__("zAsq");
var AuthorizedApp_default = /*#__PURE__*/__webpack_require__.n(AuthorizedApp);

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/LinkApp.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

    
    
    
    

    /* harmony default export */ var LinkAppvue_type_script_lang_js_ = ({
    	components:{
		    PopOutApp: PopOutApp["a" /* default */]
        },
        data () {return {

        }},
        computed:{
            ...Object(vuex_esm["d" /* mapState */])([
                'state'
            ]),
            ...Object(vuex_esm["c" /* mapGetters */])([
                'identities',
                'accounts',
            ]),
	        payload(){ return this.popup.payload(); },
            app(){
                return AuthorizedApp_default.a.fromJson(this.payload);
            }
        },
        mounted(){

        },
        methods: {
            returnResult(result){
                this.$emit('returned', result);
            },
        },
        props:['popup']
    });

// CONCATENATED MODULE: ./src/views/popouts/LinkApp.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_LinkAppvue_type_script_lang_js_ = (LinkAppvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/LinkApp.vue?vue&type=style&index=0&id=500b4f50&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var LinkAppvue_type_style_index_0_id_500b4f50_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("UArs");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/LinkApp.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_LinkAppvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "500b4f50",
  null
  
)

/* harmony default export */ var LinkApp = __webpack_exports__["default"] = (component.exports);

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

/***/ "UArs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkApp_vue_vue_type_style_index_0_id_500b4f50_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z9hB");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkApp_vue_vue_type_style_index_0_id_500b4f50_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkApp_vue_vue_type_style_index_0_id_500b4f50_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkApp_vue_vue_type_style_index_0_id_500b4f50_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "edmm":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".reputation[data-v-24ae06ac]{padding:5px 12px;font-size:10px;margin-bottom:10px;margin-top:-5px;font-weight:bold;background:#f3f6f7;color:#c8c8c8}.reputation.trusted[data-v-24ae06ac]{background:#159F00;color:#fff}.reputation.untrusted[data-v-24ae06ac]{background:#ff0707;color:#fff}.app-details[data-v-24ae06ac]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.app-details .logo[data-v-24ae06ac]{display:flex;align-items:center;justify-content:center;height:100px;width:100px;border-radius:0;padding:5px;margin-bottom:20px}.app-details .logo.border[data-v-24ae06ac]{background:#f3f6f7;border:1px solid #dfe0e1}.app-details .logo img[data-v-24ae06ac]{height:100%;width:100%}.app-details .logo span[data-v-24ae06ac]{font-size:10px;font-weight:bold;color:#7a7a7a}.app-details .logo.scam[data-v-24ae06ac]{font-size:48px;border-radius:50%;color:#ff0707;background:#f3f6f7;border:1px solid #dfe0e1;animation:pulsate 0.5s ease infinite}.app-details .name[data-v-24ae06ac]{font-size:14px}\n", ""]);


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

/***/ }),

/***/ "z9hB":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("/sK+");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("59f17560", content, true, {});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9MaW5rQXBwLnZ1ZT9kNGNjIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80YzUzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzQ2MjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL0xpbmtBcHAudnVlP2I0ZjUiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL0xpbmtBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL0xpbmtBcHAudnVlPzNhMmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvTGlua0FwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlP2RmYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvTGlua0FwcC52dWU/MDdmYSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/ZTFhMyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/ODc3ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdmdzL1NjYXR0ZXJPdXRsaW5lLnZ1ZT8xZDYzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvU2NhdHRlck91dGxpbmUudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL0xpbmtBcHAudnVlPzkyMjIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFB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b0MsZUFBZTs7Ozs7Ozs7O0FDRjdoQztBQUFBO0FBQUE7QUFBMlcsQ0FBZ0Isd1pBQUcsRUFBQyxDOzs7Ozs7Ozs7O0FDQS9YLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IsaUJBQWlCLE9BQU8sd0pBQXdKLFVBQVUsT0FBTyxrSkFBa0osVUFBVSxPQUFPLGlDQUFpQyxVQUFVLE9BQU8sYUFBYSxlQUFlLE9BQU8sa0RBQWtELDJCQUEyQixPQUFPLDhsSkFBOGxKO0FBQ3BzSzs7Ozs7Ozs7O0FDRDZGO0FBQzdGOzs7QUFHQTtBQUM2RjtBQUM3RixnQkFBZ0IsOENBQVU7QUFDMUI7QUFDQSxFQUFFLE1BQU07QUFDUixFQUFFLGVBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsK0Y7Ozs7Ozs7QUNqQmY7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBOFQ7QUFDcFYsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFnRTtBQUNsRiw4Q0FBOEMsRSIsImZpbGUiOiI2My5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hcHAtZGV0YWlsc1tkYXRhLXYtNTAwYjRmNTBde3BhZGRpbmc6NTBweH0ubWFpbi1wYW5lbFtkYXRhLXYtNTAwYjRmNTBde3RleHQtYWxpZ246Y2VudGVyfS5maXhlZC1hY3Rpb25zIC5hY3Rpb25zW2RhdGEtdi01MDBiNGY1MF17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwLWRldGFpbHNcIn0sWyghX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nb1wiLGNsYXNzOnsnYm9yZGVyJzpfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyAmJiAhX3ZtLmFwcC5pbWd9fSxbKF92bS5hcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInKT9fYygnU2NhdHRlcicpOihfdm0uYXBwLmltZyk/X2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5hcHAuaW1nfX0pOl9jKCdzcGFuJyxbX3ZtLl92KFwiTm8gSW1hZ2VcIildKV0sMSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibG9nbyBzY2FtXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1hdHRlbnRpb25cIn0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLnJpZGxFbmFibGVkICYmIF92bS5hcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInKT9fYygnc2VjdGlvbicsWyhfdm0uYXBwUmVwdXRhdGlvbiA9PT0gZmFsc2UpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSksX3ZtLl92KFwiIGxvYWRpbmcgcmVwdXRhdGlvblwiKV0pOl9jKCdzZWN0aW9uJyxbKF92bS51bmtub3duUmVwdXRhdGlvbik/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvblwifSxbX3ZtLl92KFwiVW5rbm93biBSZXB1dGF0aW9uXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb24gdHJ1c3RlZFwifSxbX3ZtLl92KFwiVHJ1c3R3b3J0aHlcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0udW50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwifSxbX3ZtLl92KFwiS25vd24gU2NhbVwiKV0pOl92bS5fZSgpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW19jKCdiJyxbX3ZtLl92KF92bS5fcyhfdm0uYXBwLm5hbWUpKV0pLF92bS5fdihcIiBcIiksKF92bS5zdWZmaXgpP19jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uc3VmZml4KSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PCEtLS0tLS0tLS0tLS0gQVBQIERFVEFJTFMgLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImFwcC1kZXRhaWxzXCI+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nb1wiIHYtaWY9XCIhdW50cnVzdGVkXCIgOmNsYXNzPVwieydib3JkZXInOmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIWFwcC5pbWd9XCI+XHJcblx0XHRcdDxTY2F0dGVyIHYtaWY9XCJhcHAuYXBwbGluayA9PT0gJ1NjYXR0ZXInXCIgLz5cclxuXHRcdFx0PGltZyB2LWVsc2UtaWY9XCJhcHAuaW1nXCIgOnNyYz1cImFwcC5pbWdcIiAvPlxyXG5cdFx0XHQ8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJsb2dvIHNjYW1cIiB2LWVsc2U+XHJcblx0XHRcdDxpIGNsYXNzPVwiaWNvbi1hdHRlbnRpb25cIj48L2k+XHJcblx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDxzZWN0aW9uIHYtaWY9XCJyaWRsRW5hYmxlZCAmJiBhcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uXCIgdi1pZj1cImFwcFJlcHV0YXRpb24gPT09IGZhbHNlXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT4gbG9hZGluZyByZXB1dGF0aW9uPC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIHYtZWxzZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJ1bmtub3duUmVwdXRhdGlvblwiPlVua25vd24gUmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHRydXN0ZWRcIiB2LWlmPVwidHJ1c3RlZFwiPlRydXN0d29ydGh5PC9maWd1cmU+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb24gdW50cnVzdGVkXCIgdi1pZj1cInVudHJ1c3RlZFwiPktub3duIFNjYW08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+PGI+e3thcHAubmFtZX19PC9iPiA8c3BhbiB2LWlmPVwic3VmZml4XCI+e3tzdWZmaXh9fTwvc3Bhbj48L2ZpZ3VyZT5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJy4uL3N2Z3MvU2NhdHRlck91dGxpbmUnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6e1NjYXR0ZXJ9LFxyXG5cdFx0cHJvcHM6WydhcHAnLCAnc3VmZml4J10sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnYXBwUmVwdXRhdGlvbidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdyaWRsRW5hYmxlZCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR1bmtub3duUmVwdXRhdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gPT09IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPiAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHVudHJ1c3RlZCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcFJlcHV0YXRpb24gJiYgcGFyc2VGbG9hdCh0aGlzLmFwcFJlcHV0YXRpb24uZGVjaW1hbCkgPCAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQucmVwdXRhdGlvbiB7XHJcblx0XHRwYWRkaW5nOjVweCAxMnB4O1xyXG5cdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRtYXJnaW4tYm90dG9tOjEwcHg7XHJcblx0XHRtYXJnaW4tdG9wOi01cHg7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0Y29sb3I6JGdyZXk7XHJcblxyXG5cdFx0Ji50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokZGFya2dyZWVuO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji51bnRydXN0ZWQge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiRyZWQ7XHJcblx0XHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5hcHAtZGV0YWlscyB7XHJcblx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG5cdFx0JGxvZ286MTAwcHg7XHJcblx0XHQubG9nbyB7XHJcblx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdGhlaWdodDokbG9nbztcclxuXHRcdFx0d2lkdGg6JGxvZ287XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6JHJhZGl1cztcclxuXHRcdFx0cGFkZGluZzo1cHg7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHJcblx0XHRcdCYuYm9yZGVyIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAkbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0Ym9yZGVyOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWcge1xyXG5cdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCYuc2NhbSB7XHJcblx0XHRcdFx0Zm9udC1zaXplOiA0OHB4O1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cdFx0XHRcdGNvbG9yOiRyZWQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHJcblx0XHRcdFx0YW5pbWF0aW9uOiBwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5uYW1lIHtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2U7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyNGFlMDZhY1wiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwb3BvdXQtd2luZG93XCJ9LFtfYygnUG9wT3V0QXBwJyx7YXR0cnM6e1wiYXBwXCI6X3ZtLnBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YSxcInN1ZmZpeFwiOlwiaXMgcmVsaW5raW5nXCJ9fSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZml4ZWQtYWN0aW9uc1wifSxbX3ZtLl92KFwiXFxuICAgICAgICBNYWtlIHN1cmUgdGhlIGFwcGxpY2F0aW9uIG5hbWUgaXMgYW4gYXBwbGljYXRpb24geW91IGFyZSBpbnRlcmFjdGluZyB3aXRoIHJpZ2h0IG5vdy5cXG4gICAgICAgIElmIGl0IGlzbid0IGl0IGNvdWxkIGJlIGEgZGFuZ2Vyb3VzIGFwcGxpY2F0aW9uIHRyeWluZyB0byBhY3QgbGlrZSBhIGRpZmZlcmVudCBvbmUuXFxuICAgICAgICBcIiksX2MoJ2JyJyksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhY3Rpb25zXCJ9LFtfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuRGVueSksXCJiaWdcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmV0dXJuUmVzdWx0KGZhbHNlKX19fSksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1wiYmx1ZVwiOlwiMVwiLFwiYmlnXCI6XCIxXCIsXCJ0ZXh0XCI6X3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuR0VORVJJQy5BbGxvdyl9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdCh0cnVlKX19fSldLDEpXSldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cInBvcG91dC13aW5kb3dcIj5cclxuICAgICAgICA8UG9wT3V0QXBwIDphcHA9XCJwb3B1cC5kYXRhLnByb3BzLmFwcERhdGFcIiBzdWZmaXg9XCJpcyByZWxpbmtpbmdcIiAvPlxyXG5cclxuXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJmaXhlZC1hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgIE1ha2Ugc3VyZSB0aGUgYXBwbGljYXRpb24gbmFtZSBpcyBhbiBhcHBsaWNhdGlvbiB5b3UgYXJlIGludGVyYWN0aW5nIHdpdGggcmlnaHQgbm93LlxyXG4gICAgICAgICAgICBJZiBpdCBpc24ndCBpdCBjb3VsZCBiZSBhIGRhbmdlcm91cyBhcHBsaWNhdGlvbiB0cnlpbmcgdG8gYWN0IGxpa2UgYSBkaWZmZXJlbnQgb25lLlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxicj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBERU5ZIFRSQU5TQUNUSU9OIC0tPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImxvY2FsZShsYW5nS2V5cy5HRU5FUklDLkRlbnkpXCIgYmlnPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJyZXR1cm5SZXN1bHQoZmFsc2UpXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIEFDQ0VQVCBUUkFOU0FDVElPTiAtLT5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gYmx1ZT1cIjFcIiBiaWc9XCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5BbGxvdylcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlPVwicmV0dXJuUmVzdWx0KHRydWUpXCIgLz5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuICAgIGltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnQHdhbGxldHBhY2svY29yZS9zdG9yZS9jb25zdGFudHMnO1xyXG4gICAgaW1wb3J0IEF1dGhvcml6ZWRBcHAgZnJvbSAnQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQXV0aG9yaXplZEFwcCdcclxuICAgIGltcG9ydCBQb3BPdXRBcHAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcCc7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHRjb21wb25lbnRzOntcclxuXHRcdCAgICBQb3BPdXRBcHBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGEgKCkge3JldHVybiB7XHJcblxyXG4gICAgICAgIH19LFxyXG4gICAgICAgIGNvbXB1dGVkOntcclxuICAgICAgICAgICAgLi4ubWFwU3RhdGUoW1xyXG4gICAgICAgICAgICAgICAgJ3N0YXRlJ1xyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyhbXHJcbiAgICAgICAgICAgICAgICAnaWRlbnRpdGllcycsXHJcbiAgICAgICAgICAgICAgICAnYWNjb3VudHMnLFxyXG4gICAgICAgICAgICBdKSxcclxuXHQgICAgICAgIHBheWxvYWQoKXsgcmV0dXJuIHRoaXMucG9wdXAucGF5bG9hZCgpOyB9LFxyXG4gICAgICAgICAgICBhcHAoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBdXRob3JpemVkQXBwLmZyb21Kc29uKHRoaXMucGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKXtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIHJldHVyblJlc3VsdChyZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncmV0dXJuZWQnLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvcHM6Wydwb3B1cCddXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiIHJlbD1cInN0eWxlc2hlZXQvc2Nzc1wiPlxyXG4gICAgQGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcbiAgICAuYXBwLWRldGFpbHMge1xyXG4gICAgICAgIHBhZGRpbmc6NTBweDtcclxuICAgIH1cclxuXHJcbiAgICAubWFpbi1wYW5lbCB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLmZpeGVkLWFjdGlvbnMge1xyXG4gICAgICAgIC5hY3Rpb25zIHtcclxuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTGlua0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaW5rQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vTGlua0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTAwYjRmNTAmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTGlua0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xpbmtBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0xpbmtBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NTAwYjRmNTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNTAwYjRmNTBcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yNGFlMDZhYyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjViM2EzMGQ1XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaW5rQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTUwMGI0ZjUwJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpbmtBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NTAwYjRmNTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnJlcHV0YXRpb25bZGF0YS12LTI0YWUwNmFjXXtwYWRkaW5nOjVweCAxMnB4O2ZvbnQtc2l6ZToxMHB4O21hcmdpbi1ib3R0b206MTBweDttYXJnaW4tdG9wOi01cHg7Zm9udC13ZWlnaHQ6Ym9sZDtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Y29sb3I6I2M4YzhjOH0ucmVwdXRhdGlvbi50cnVzdGVkW2RhdGEtdi0yNGFlMDZhY117YmFja2dyb3VuZDojMTU5RjAwO2NvbG9yOiNmZmZ9LnJlcHV0YXRpb24udW50cnVzdGVkW2RhdGEtdi0yNGFlMDZhY117YmFja2dyb3VuZDojZmYwNzA3O2NvbG9yOiNmZmZ9LmFwcC1kZXRhaWxzW2RhdGEtdi0yNGFlMDZhY117dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYXBwLWRldGFpbHMgLmxvZ29bZGF0YS12LTI0YWUwNmFjXXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7aGVpZ2h0OjEwMHB4O3dpZHRoOjEwMHB4O2JvcmRlci1yYWRpdXM6MDtwYWRkaW5nOjVweDttYXJnaW4tYm90dG9tOjIwcHh9LmFwcC1kZXRhaWxzIC5sb2dvLmJvcmRlcltkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTF9LmFwcC1kZXRhaWxzIC5sb2dvIGltZ1tkYXRhLXYtMjRhZTA2YWNde2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmFwcC1kZXRhaWxzIC5sb2dvIHNwYW5bZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDpib2xkO2NvbG9yOiM3YTdhN2F9LmFwcC1kZXRhaWxzIC5sb2dvLnNjYW1bZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6NDhweDtib3JkZXItcmFkaXVzOjUwJTtjb2xvcjojZmYwNzA3O2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTE7YW5pbWF0aW9uOnB1bHNhdGUgMC41cyBlYXNlIGluZmluaXRlfS5hcHAtZGV0YWlscyAubmFtZVtkYXRhLXYtMjRhZTA2YWNde2ZvbnQtc2l6ZToxNHB4fVxcblwiLCBcIlwiXSk7XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3N2Zycse2F0dHJzOntcIndpZHRoXCI6XCI4OHB4XCIsXCJoZWlnaHRcIjpcIjg4cHhcIixcInZpZXdCb3hcIjpcIjAgMCA4OCA4OFwiLFwidmVyc2lvblwiOlwiMS4xXCIsXCJ4bWxuc1wiOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInhtbG5zOnhsaW5rXCI6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwid2VsY29tZV9zY2F0dGVyXCIsXCJzdHJva2VcIjpcIm5vbmVcIixcInN0cm9rZS13aWR0aFwiOlwiMVwiLFwiZmlsbFwiOlwibm9uZVwiLFwiZmlsbC1ydWxlXCI6XCJldmVub2RkXCIsXCJzdHJva2UtbGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZS1saW5lam9pblwiOlwicm91bmRcIn19LFtfYygnZycse2F0dHJzOntcImlkXCI6XCJHcm91cFwiLFwic3Ryb2tlXCI6XCIjMDBBOEZGXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwiSWNvblwifX0sW19jKCdjaXJjbGUnLHthdHRyczp7XCJpZFwiOlwiQmFzZVwiLFwiY3hcIjpcIjQ0XCIsXCJjeVwiOlwiNDRcIixcInJcIjpcIjQzLjcwNzk2NDZcIn19KV0pLF92bS5fdihcIiBcIiksX2MoJ3BhdGgnLHthdHRyczp7XCJkXCI6XCJNNDAuODE4ODU1OSw3MS41OTMyMjAzIEMzOS4zMDQwMTc4LDcxLjU5MzIyMDMgMzguMDQ1NTU1OSw3MS40MjMxNTMgMzcuMDQzNDMyMiw3MS4wODMwMTMxIEMzNi4wNDEzMDg1LDcwLjc0Mjg3MzIgMzUuMjQ4OTQzNiw3MC4zNjE2ODc3IDM0LjY2NjMxMzYsNjkuOTM5NDQ1MSBDMzQuMDgzNjgzNSw2OS41MTcyMDI1IDMzLjY3NTg0ODYsNjkuMTEyNTU5NCAzMy40NDI3OTY2LDY4LjcyNTUwMzcgQzMzLjIwOTc0NDYsNjguMzM4NDQ4IDMzLjA5MzIyMDMsNjguMDg2Mjc5MSAzMy4wOTMyMjAzLDY3Ljk2ODk4OTUgQzMzLjA5MzIyMDMsNjcuNTQ2NzQ2OSAzMy4xODY0Mzk3LDY3LjA5NTE4ODcgMzMuMzcyODgxNCw2Ni42MTQzMDEzIEMzMy41NTkzMjMsNjYuMTMzNDEzOSAzMy43OTIzNzE1LDY1LjY4NzcyIDM0LjA3MjAzMzksNjUuMjc3MjA2NCBDMzQuMzUxNjk2Myw2NC44NjY2OTI4IDM0LjY1NDY1OTQsNjQuNTIwNjkzNiAzNC45ODA5MzIyLDY0LjIzOTE5ODUgQzM1LjMwNzIwNSw2My45NTc3MDM1IDM1LjU5ODUxNTcsNjMuODE2OTU4IDM1Ljg1NDg3MjksNjMuODE2OTU4IEMzNi4xODExNDU3LDYzLjgxNjk1OCAzNi40NDkxNTE1LDY0LjAyODA3NjIgMzYuNjU4ODk4Myw2NC40NTAzMTg4IEwzNy4wMDg0NzQ2LDY0LjgwMjE4NTggQzM3LjE5NDkxNjIsNjQuOTg5ODQ5MiAzNy40NTcwOTU4LDY1LjE4MzM3NDIgMzcuNzk1MDIxMiw2NS4zODI3NjY1IEMzOC4xMzI5NDY2LDY1LjU4MjE1ODggMzguNTUyNDMzOSw2NS43NjM5NTUgMzkuMDUzNDk1OCw2NS45MjgxNjA1IEMzOS41NTQ1NTc2LDY2LjA5MjM2NTkgNDAuMTQzMDA1MSw2Ni4xNzQ0Njc0IDQwLjgxODg1NTksNjYuMTc0NDY3NCBDNDIuMjg3MDgzNiw2Ni4xNzQ0Njc0IDQzLjQ4NzI4MzUsNjUuNzIyOTA5MiA0NC40MTk0OTE1LDY0LjgxOTc3OTIgQzQ1LjM1MTY5OTYsNjMuOTE2NjQ5MiA0NS44MTc3OTY2LDYyLjY5MDk5MTEgNDUuODE3Nzk2Niw2MS4xNDI3NjgzIEM0NS44MTc3OTY2LDYwLjA2MzcwMzkgNDUuNTY3MjY5NSw1OS4xMDE5NDM1IDQ1LjA2NjIwNzYsNTguMjU3NDU4MyBDNDQuNTY1MTQ1OCw1Ny40MTI5NzMxIDQzLjkwNjc4MzcsNTYuNjI3MTQ0NSA0My4wOTExMDE3LDU1Ljg5OTk0ODkgQzQyLjI3NTQxOTcsNTUuMTcyNzUzMyA0MS4zNDMyMjU2LDU0LjQ2MzE2MTggNDAuMjk0NDkxNSw1My43NzExNTMxIEMzOS4yNDU3NTc1LDUzLjA3OTE0NDQgMzguMTczNzM0Myw1Mi4zNTc4MjQxIDM3LjA3ODM4OTgsNTEuNjA3MTcwNiBDMzUuOTgzMDQ1NCw1MC44NTY1MTcxIDM0LjkxMTAyMjIsNTAuMDQ3MjMwOSAzMy44NjIyODgxLDQ5LjE3OTI4NzggQzMyLjgxMzU1NDEsNDguMzExMzQ0NyAzMS44ODEzNiw0Ny4zMTQzOTggMzEuMDY1Njc4LDQ2LjE4ODQxNzcgQzMwLjI0OTk5NTksNDUuMDYyNDM3NCAyOS41OTE2MzM5LDQzLjc4OTg2NDMgMjkuMDkwNTcyLDQyLjM3MDY2IEMyOC41ODk1MTAyLDQwLjk1MTQ1NTcgMjguMzM4OTgzMSwzOS4zMjcwMTg5IDI4LjMzODk4MzEsMzcuNDk3MzAxIEMyOC4zMzg5ODMxLDM1LjkyNTYyMDIgMjguNjA2OTg4OCwzNC4zNDIyMzQyIDI5LjE0MzAwODUsMzIuNzQ3MDk1NSBDMjkuNjc5MDI4MSwzMS4xNTE5NTY4IDMwLjQxODk1NzEsMjkuNjMzMDc5MiAzMS4zNjI4MTc4LDI4LjE5MDQxNyBDMzIuMzA2Njc4NCwyNi43NDc3NTQ3IDMzLjQxOTQ4NTEsMjUuMzk4OTQ0NSAzNC43MDEyNzEyLDI0LjE0Mzk0NTYgQzM1Ljk4MzA1NzMsMjIuODg4OTQ2OCAzNy4zNjk2OTU5LDIxLjc5ODE2OTggMzguODYxMjI4OCwyMC44NzE1ODE4IEM0MC4zNTI3NjE3LDE5Ljk0NDk5MzkgNDEuOTA4MzYwNSwxOS4yMTc4MDkyIDQzLjUyODA3MiwxOC42OTAwMDYgQzQ1LjE0Nzc4MzUsMTguMTYyMjAyOCA0Ni43NzMyOTY5LDE3Ljg5ODMwNTEgNDguNDA0NjYxLDE3Ljg5ODMwNTEgQzQ5LjgwMjk3MzEsMTcuODk4MzA1MSA1MS4wNjE0MzUxLDE4LjEyMTE1MiA1Mi4xODAwODQ3LDE4LjU2Njg1MjUgQzUzLjI5ODczNDQsMTkuMDEyNTUzIDU0LjI0MjU4MDksMTkuNjQwMDQzIDU1LjAxMTY1MjUsMjAuNDQ5MzQxNCBDNTUuNzgwNzI0MiwyMS4yNTg2Mzk3IDU2LjM3NDk5NzksMjIuMjMyMTI4OCA1Ni43OTQ0OTE1LDIzLjM2OTgzODEgQzU3LjIxMzk4NTEsMjQuNTA3NTQ3MyA1Ny40MjM3Mjg4LDI1Ljc4MDEyMDUgNTcuNDIzNzI4OCwyNy4xODc1OTU4IEM1Ny40MjM3Mjg4LDI4LjUyNDY5NzQgNTcuMTkwNjgwMywyOS44MzgzMjEzIDU2LjcyNDU3NjMsMzEuMTI4NTA3IEM1Ni4yNTg0NzIyLDMyLjQxODY5MjcgNTUuNjQwODkzNywzMy42Mzg0ODY0IDU0Ljg3MTgyMiwzNC43ODc5MjQ2IEM1NC4xMDI3NTA0LDM1LjkzNzM2MjcgNTMuMjM0NjQ0NywzNi45OTg4MTc4IDUyLjI2NzQ3ODgsMzcuOTcyMzIxNiBDNTEuMzAwMzEzLDM4Ljk0NTgyNTMgNTAuMzA5ODU2OCwzOS43OTAyOTc5IDQ5LjI5NjA4MDUsNDAuNTA1NzY0NSBDNDguMjgyMzA0Myw0MS4yMjEyMzExIDQ3LjI5NzY3NDMsNDEuNzc4MzQ4NCA0Ni4zNDIxNjEsNDIuMTc3MTMzMSBDNDUuMzg2NjQ3OCw0Mi41NzU5MTc4IDQ0LjU0NzY3MzEsNDIuNzc1MzA3MSA0My44MjUyMTE5LDQyLjc3NTMwNzEgQzQzLjE5NTk3MTQsNDIuNzc1MzA3MSA0Mi42MzA4Mjg4LDQyLjYyODY5NzMgNDIuMTI5NzY2OSw0Mi4zMzU0NzMzIEM0MS42Mjg3MDUxLDQyLjA0MjI0OTIgNDEuMjA5MjE3OCw0MS42Nzg2NTY5IDQwLjg3MTI5MjQsNDEuMjQ0Njg1MyBDNDAuNTMzMzY3LDQwLjgxMDcxMzggNDAuMjcxMTg3NCw0MC4zNTMyOTEyIDQwLjA4NDc0NTgsMzkuODcyNDAzOCBDMzkuODk4MzA0MiwzOS4zOTE1MTY0IDM5LjgwNTA4NDcsMzguOTYzNDE1NyAzOS44MDUwODQ3LDM4LjU4ODA4ODkgQzM5LjgwNTA4NDcsMzguMjgzMTM2IDM5Ljg0NTg2ODIsMzguMDgzNzQ2NiAzOS45Mjc0MzY0LDM3Ljk4OTkxNDkgQzQwLjAwOTAwNDYsMzcuODk2MDgzMiA0MC4xMjU1Mjg5LDM3Ljg1NTAzMjUgNDAuMjc3MDEyNywzNy44NjY3NjE0IEM0MC40Mjg0OTY1LDM3Ljg3ODQ5MDQgNDAuNjIwNzYxNSwzNy45MTM2NzY4IDQwLjg1MzgxMzYsMzcuOTcyMzIxNiBDNDEuMDg2ODY1NiwzOC4wMzA5NjY0IDQxLjM1NDg3MTQsMzguMDYwMjg4MyA0MS42NTc4MzksMzguMDYwMjg4MyBDNDIuNjM2NjU3NCwzOC4wNjAyODgzIDQzLjcyMDMzMywzNy43MjAxNTM2IDQ0LjkwODg5ODMsMzcuMDM5ODczOCBDNDYuMDk3NDYzNiwzNi4zNTk1OTQxIDQ3LjIxNjA5NjUsMzUuNDkxNjY0IDQ4LjI2NDgzMDUsMzQuNDM2MDU3NSBDNDkuMzEzNTY0NiwzMy4zODA0NTEgNTAuMTkzMzIyNywzMi4yMTkzMDEzIDUwLjkwNDEzMTQsMzAuOTUyNTczNSBDNTEuNjE0OTQsMjkuNjg1ODQ1NyA1MS45NzAzMzksMjguNDU0MzIzMiA1MS45NzAzMzksMjcuMjU3OTY5MiBDNTEuOTcwMzM5LDI2LjAzODE1NzMgNTEuNjczMjAyMSwyNS4wNzYzOTY5IDUxLjA3ODkxOTUsMjQuMzcyNjU5MiBDNTAuNDg0NjM2OSwyMy42Njg5MjE2IDQ5LjQ3NjcwMiwyMy4zMTcwNTggNDguMDU1MDg0NywyMy4zMTcwNTggQzQ3LjE2OTQ4NzEsMjMuMzE3MDU4IDQ2LjIwODE2MiwyMy40ODcxMjU0IDQ1LjE3MTA4MDUsMjMuODI3MjY1MyBDNDQuMTMzOTk5MSwyNC4xNjc0MDUxIDQzLjA5MTEwNjksMjQuNjQyNDIwOSA0Mi4wNDIzNzI5LDI1LjI1MjMyNjkgQzQwLjk5MzYzODgsMjUuODYyMjMyOSAzOS45Nzk4Nzc4LDI2LjYwMTE0NjMgMzkuMDAxMDU5MywyNy40NjkwODk1IEMzOC4wMjIyNDA5LDI4LjMzNzAzMjYgMzcuMTU5OTYxNCwyOS4yOTI5Mjg2IDM2LjQxNDE5NDksMzAuMzM2ODA2MSBDMzUuNjY4NDI4NSwzMS4zODA2ODM2IDM1LjA2ODMyODUsMzIuNTA2NjQ3IDM0LjYxMzg3NzEsMzMuNzE0NzMgQzM0LjE1OTQyNTcsMzQuOTIyODEzIDMzLjkzMjIwMzQsMzYuMTgzNjU3NCAzMy45MzIyMDM0LDM3LjQ5NzMwMSBDMzMuOTMyMjAzNCwzOC44ODEzMTg0IDM0LjE4MjczMDUsNDAuMTE4NzA1MyAzNC42ODM3OTI0LDQxLjIwOTQ5ODYgQzM1LjE4NDg1NDIsNDIuMzAwMjkyIDM1Ljg0OTA0MjUsNDMuMjkxMzc0NCAzNi42NzYzNzcxLDQ0LjE4Mjc3NTQgQzM3LjUwMzcxMTgsNDUuMDc0MTc2NCAzOC40NDE3MzIsNDUuODk1MTkxNCAzOS40OTA0NjYxLDQ2LjY0NTg0NDkgQzQwLjUzOTIwMDIsNDcuMzk2NDk4NCA0MS42MTEyMjMzLDQ4LjE0MTI3NjMgNDIuNzA2NTY3OCw0OC44ODAyMDA4IEM0My44MDE5MTIzLDQ5LjYxOTEyNTQgNDQuODczOTM1NCw1MC4zODE0OTY0IDQ1LjkyMjY2OTUsNTEuMTY3MzM2OCBDNDYuOTcxNDAzNSw1MS45NTMxNzcyIDQ3LjkwOTQyMzgsNTIuODIxMTA3MyA0OC43MzY3NTg1LDUzLjc3MTE1MzEgQzQ5LjU2NDA5MzEsNTQuNzIxMTk5IDUwLjIyODI4MTQsNTUuNzc2Nzg5NiA1MC43MjkzNDMyLDU2LjkzNzk1NjggQzUxLjIzMDQwNSw1OC4wOTkxMjM5IDUxLjQ4MDkzMjIsNTkuNDMwMzQxIDUxLjQ4MDkzMjIsNjAuOTMxNjQ4IEM1MS40ODA5MzIyLDYyLjM4NjAzOTIgNTEuMjA3MTAwMiw2My43NjQxNzE1IDUwLjY1OTQyOCw2NS4wNjYwODYxIEM1MC4xMTE3NTU3LDY2LjM2ODAwMDggNDkuMzYwMTc0Myw2Ny40OTk4Mjg2IDQ4LjQwNDY2MSw2OC40NjE2MDM0IEM0Ny40NDkxNDc4LDY5LjQyMzM3ODIgNDYuMzE4ODYyNSw3MC4xODU3NDkyIDQ1LjAxMzc3MTIsNzAuNzQ4NzM5NCBDNDMuNzA4Njc5OSw3MS4zMTE3Mjk1IDQyLjMxMDM4ODgsNzEuNTkzMjIwMyA0MC44MTg4NTU5LDcxLjU5MzIyMDMgWlwiLFwiaWRcIjpcIlNjYXR0ZXJcIn19KV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TY2F0dGVyT3V0bGluZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzYxOTYwZjUmXCJcbnZhciBzY3JpcHQgPSB7fVxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaW5rQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTUwMGI0ZjUwJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjU5ZjE3NTYwXCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiXSwic291cmNlUm9vdCI6IiJ9