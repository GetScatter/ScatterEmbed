(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ "3lbk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/reusable/PanelTabs.vue?vue&type=template&id=f9b84e78&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"panel-tabs"},_vm._l((_vm.tabs),function(tab){return _c('figure',{staticClass:"tab-name",class:{'active':tab.state === _vm.state},on:{"click":function($event){return _vm.$emit('selected', tab.state)}}},[_vm._v(_vm._s(tab.name))])}),0)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/reusable/PanelTabs.vue?vue&type=template&id=f9b84e78&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/reusable/PanelTabs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/* harmony default export */ var PanelTabsvue_type_script_lang_js_ = ({
	props:['tabs', 'state']
});

// CONCATENATED MODULE: ./src/components/reusable/PanelTabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var reusable_PanelTabsvue_type_script_lang_js_ = (PanelTabsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/reusable/PanelTabs.vue?vue&type=style&index=0&id=f9b84e78&scoped=true&lang=scss&
var PanelTabsvue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss_ = __webpack_require__("dVin");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/reusable/PanelTabs.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  reusable_PanelTabsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "f9b84e78",
  null
  
)

/* harmony default export */ var PanelTabs = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "4HXs":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".panel-tabs[data-v-f9b84e78]{display:flex;flex-direction:row;align-items:center;justify-content:center;padding:0 0 20px;margin:0 20px;border-bottom:1px solid #dfe0e1}.panel-tabs .tab-name[data-v-f9b84e78]{cursor:pointer;font-size:16px;font-weight:bold;font-family:'Poppins', sans-serif;line-height:68px;color:#0799ff;transition:all 0.1s ease;width:100%;text-align:center;border-bottom:1px solid tranparent;margin-bottom:-21px}.panel-tabs .tab-name[data-v-f9b84e78]:hover,.panel-tabs .tab-name.active[data-v-f9b84e78]{color:black;border-bottom:1px solid #0799ff}\n", ""]);


/***/ }),

/***/ "8YTa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/reusable/Carousel.vue?vue&type=template&id=4398fff8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{ref:"base",staticClass:"carousel"},[(_vm.slides.length > 1)?_c('section',{staticClass:"go-right icon-right-open-big",on:{"click":function($event){return _vm.slide(-1)}}}):_vm._e(),_vm._v(" "),(_vm.slides.length > 1)?_c('section',{staticClass:"go-left icon-left-open-big",on:{"click":function($event){return _vm.slide(1)}}}):_vm._e(),_vm._v(" "),(_vm.slides.length)?_c('section',{staticClass:"slider-container"},[_c('section',{staticClass:"slider",style:({'left':_vm.left+'px'})},_vm._l((_vm.slides),function(slide,i){return _c('section',{staticClass:"slide",style:({'left':i*_vm.slideWidth+'px', 'width':_vm.slideWidth+'px'})},[_c('section',{staticClass:"image-container",class:{'full-height':_vm.noInfo}},[_c('figure',{staticClass:"bg",style:(("background-image:url(" + (slide.img) + ");"))}),_vm._v(" "),_c('figure',{staticClass:"image",style:(("background-image:url(" + (slide.img) + ");"))})]),_vm._v(" "),(!_vm.noInfo)?_c('section',{staticClass:"info"},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(slide.name))]),_vm._v(" "),_c('figure',{staticClass:"description"},[_vm._v(_vm._s(slide.description))])]),_vm._v(" "),_c('section',[_c('Button',{attrs:{"text":"View App","blue":1},nativeOn:{"click":function($event){return _vm.goToApp(slide)}}})],1)]):_vm._e()])}),0)]):_c('section',{staticClass:"slider-container"},[_c('section',{staticClass:"slider dummy"},[_c('section',{staticClass:"slide",style:({'left':0, 'width':_vm.slideWidth+'px'})},[_vm._m(0),_vm._v(" "),_c('section',{staticClass:"info"},[_vm._m(1),_vm._v(" "),_c('section',[_c('Button',{attrs:{"blue":1}})],1)])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"image-container"},[_c('figure',{staticClass:"bg"}),_vm._v(" "),_c('figure',{staticClass:"image"},[_c('i',{staticClass:"icon-spin4 animate-spin"})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('figure',{staticClass:"name animated-gradient"}),_vm._v(" "),_c('figure',{staticClass:"description animated-gradient"})])}]


// CONCATENATED MODULE: ./src/components/reusable/Carousel.vue?vue&type=template&id=4398fff8&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/reusable/Carousel.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



let interval;
/* harmony default export */ var Carouselvue_type_script_lang_js_ = ({
	props:['slides', 'noInfo'],
	data(){return {
		left:0,
		slideWidth:0,
	}},
	mounted(){
		this.$nextTick(() => {
			this.setInterval();
			this.calcBaseWidth();
			window.addEventListener('resize', this.calcBaseWidth);
		})
	},
	destroyed(){
		clearInterval(interval)
		window.removeEventListener('resize', this.calcBaseWidth);
	},
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'sidebarLocked'
		]),
		maxLeft(){
			return -((this.slides.length-1) * this.slideWidth);
		},
		slideIndex(){
			return Math.abs(this.left) / this.slideWidth
		},
	},
	methods:{
		calcBaseWidth(){
			this.$nextTick(() => {
				if(!this.$refs.base) return;
				this.slideWidth = this.$refs.base.clientWidth;
				this.left = 0;
			})
		},
		slide(delta){
			if(delta > 0) this.left += this.slideWidth;
			else this.left -= this.slideWidth;
			if(this.left < this.maxLeft) this.left = 0;
			if(this.left > 0) this.left = this.maxLeft;
			this.setInterval();
		},
		setInterval(){
			clearInterval(interval);
			interval = setInterval(() => {
				this.slide(-1);
			}, 10000);
		},
		goToApp(slide){
			this.$router.push({name:this.RouteNames.APP, params:{applink:slide.applink}});
		}
	},
	watch:{
		['window'](){
			this.calcBaseWidth();
		},
		['sidebarLocked'](){
			setTimeout(() => {
				this.calcBaseWidth();
			}, 200 /* Matches transition time of sidebar */);
		}
	}

});

// CONCATENATED MODULE: ./src/components/reusable/Carousel.vue?vue&type=script&lang=js&
 /* harmony default export */ var reusable_Carouselvue_type_script_lang_js_ = (Carouselvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/reusable/Carousel.vue?vue&type=style&index=0&id=4398fff8&scoped=true&lang=scss&
var Carouselvue_type_style_index_0_id_4398fff8_scoped_true_lang_scss_ = __webpack_require__("VG6g");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/reusable/Carousel.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  reusable_Carouselvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4398fff8",
  null
  
)

/* harmony default export */ var Carousel = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "Gmfg":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".carousel[data-v-4398fff8]{position:relative;height:300px;width:100%;margin:0 auto;margin-top:1px;max-width:900px}@media (max-width: 920px){.carousel[data-v-4398fff8]{height:440px}}.carousel .go-right[data-v-4398fff8],.carousel .go-left[data-v-4398fff8]{cursor:pointer;position:absolute;color:white;font-size:20px;background:rgba(255,255,255,0.12);width:44px;height:44px;line-height:44px;text-align:center;z-index:3;transition:all 0.12s ease-in-out}.carousel .go-right[data-v-4398fff8]:hover,.carousel .go-left[data-v-4398fff8]:hover{width:40px;background:#fff;color:#0799ff}.carousel .go-left[data-v-4398fff8]{left:0px;top:60%;margin-top:-54px;border-top-right-radius:3px;border-bottom-right-radius:3px}.carousel .go-right[data-v-4398fff8]{right:0px;top:60%;margin-top:-54px;border-top-left-radius:3px;border-bottom-left-radius:3px}.carousel .slider-container[data-v-4398fff8]{position:relative;overflow:hidden;height:300px;width:100%;border-radius:0}@media (max-width: 920px){.carousel .slider-container[data-v-4398fff8]{height:440px}}.carousel .slider[data-v-4398fff8]{position:absolute;top:0;bottom:0;left:0;right:0;transition:all 0.6s ease;transition-property:left}.carousel .slider .slide[data-v-4398fff8]{position:absolute;top:0;height:100%}.carousel .slider .slide .image-container[data-v-4398fff8]{position:absolute;top:0;bottom:80px;left:0;right:0;z-index:1;overflow:hidden;background:#333}.carousel .slider .slide .image-container.full-height[data-v-4398fff8]{bottom:0}.carousel .slider .slide .image-container .bg[data-v-4398fff8]{position:absolute;top:-900px;bottom:-900px;left:-900px;right:-900px;background-size:200px;background-position:center;z-index:1;transform:rotateZ(20deg) scale(1.2);opacity:0.1;transition:1s transform ease}.carousel .slider .slide .image-container .image[data-v-4398fff8]{position:absolute;top:0;bottom:0;left:0;right:0;background-size:contain;background-position:center;background-repeat:no-repeat;margin:20px;z-index:1;transition:1s transform ease}.carousel .slider .slide .image-container.full .bg[data-v-4398fff8]{display:none}.carousel .slider .slide .image-container.full .image[data-v-4398fff8]{margin:0;background-size:cover}.carousel .slider .slide .info[data-v-4398fff8]{position:absolute;bottom:0;left:0;right:0;display:flex;padding:20px;z-index:2;flex-direction:row;justify-content:space-between;align-content:center;border-radius:0;background-color:#0799ff;height:80px}@media (max-width: 920px){.carousel .slider .slide .info[data-v-4398fff8]{height:140px;flex-direction:column}}.carousel .slider .slide .info .name[data-v-4398fff8]{font-size:16px;font-family:'Poppins', sans-serif;font-weight:bold;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.carousel .slider .slide .info .description[data-v-4398fff8]{font-size:12px;font-weight:bold;color:white;opacity:0.6;font-size:12px;margin-bottom:10px}.carousel .slider:hover .slide .image-container .bg[data-v-4398fff8]{transition:8s transform ease;transform:rotateZ(50deg) scale(0.5)}.carousel .slider.dummy .slide .image-container[data-v-4398fff8]{background-color:#f3f6f7}.carousel .slider.dummy .slide .image-container .image[data-v-4398fff8]{display:flex;justify-content:center;align-items:center;font-size:48px;color:#dfe0e1}.carousel .slider.dummy .slide .info .name[data-v-4398fff8]{padding:5px 50px;margin-bottom:2px}.carousel .slider.dummy .slide .info .description[data-v-4398fff8]{padding:10px 150px}\n", ""]);


/***/ }),

/***/ "MzH4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("xagP");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("5236edfc", content, true, {});

/***/ }),

/***/ "Pwn8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_db710ed0_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MzH4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_db710ed0_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_db710ed0_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_db710ed0_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "QIy7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4HXs");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("bbbacdd6", content, true, {});

/***/ }),

/***/ "VG6g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_style_index_0_id_4398fff8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eSad");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_style_index_0_id_4398fff8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_style_index_0_id_4398fff8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_style_index_0_id_4398fff8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "dVin":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QIy7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "eSad":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Gmfg");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("2bf51abc", content, true, {});

/***/ }),

/***/ "kYyy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/App.vue?vue&type=template&id=db710ed0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"app"},[_c('PanelTabs',{attrs:{"tabs":_vm.tabs,"state":_vm.state},on:{"selected":_vm.tabSelected}}),_vm._v(" "),(_vm.state === _vm.applink)?_c('section',{staticClass:"scroller"},[_c('section',{staticClass:"padder"},[(_vm.getAppData(_vm.applink).hasOwnProperty('img'))?_c('section',{staticClass:"featured"},[_c('Carousel',{attrs:{"no-info":true,"slides":[_vm.getAppData(_vm.applink)]}})],1):_vm._e(),_vm._v(" "),_c('section',{staticClass:"info"},[_c('section',{staticClass:"actions"},[(_vm.canOpenApp(_vm.applink))?_c('section',[_c('Button',{attrs:{"text":"Open","blue":true},nativeOn:{"click":function($event){return _vm.openApp(_vm.applink)}}})],1):_vm._e(),_vm._v(" "),(_vm.permissionsList.length)?_c('section',[_c('Button',{attrs:{"text":"Revoke access"},nativeOn:{"click":function($event){return _vm.removeAll($event)}}})],1):_vm._e()]),_vm._v(" "),(_vm.getAppData(_vm.applink).type)?_c('section',[_c('figure',{staticClass:"category"},[_vm._v(_vm._s(_vm.getAppData(_vm.applink).type))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.getAppData(_vm.applink).description))])]):_c('section',[_c('figure',{staticClass:"category"},[_vm._v("No Data")]),_vm._v(" "),_c('p',[_vm._v("This app doesn't have any registered data available.")])])])])]):_vm._e(),_vm._v(" "),(_vm.state === 'permissions')?_c('section',{staticClass:"permissions scroller"},[_c('section',{staticClass:"perms-list"},_vm._l((_vm.permissionsList),function(item){return _c('section',{staticClass:"badge-item hoverable",class:{'active':_vm.selected.id === item.id},on:{"click":function($event){return _vm.selectPermission(item)}}},[_c('section',{staticClass:"details"},[_c('figure',{staticClass:"title"},[_vm._v(_vm._s(item.title))]),_vm._v(" "),_c('figure',{staticClass:"row",staticStyle:{"margin-top":"0"}},[_c('figure',{staticClass:"secondary"},[_vm._v(_vm._s(item.description))])])])])}),0),_vm._v(" "),_c('section',{staticClass:"selected-permission"},[(_vm.isIdentity && _vm.selected.accounts.length)?_c('section',{staticClass:"key-val"},[_c('figure',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.AccountsLabel)))]),_vm._v(" "),_c('figure',[_vm._v(_vm._s(_vm.selected.getAccounts().map(function (x) { return x.formatted(); }).join(', ')))]),_vm._v(" "),_c('br'),_vm._v(" "),_c('figure',[_vm._v(_vm._s(_vm.selected.asIdentityRequirements().personal.concat(_vm.selected.asIdentityRequirements().location).join(', ')))])]):_vm._e(),_vm._v(" "),(_vm.selected.isIdentityRequirements)?_c('section',{staticClass:"key-val"},[_c('figure',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.RequiredFieldsLabel)))]),_vm._v(" "),_c('figure',[_vm._v(_vm._s(_vm.selected.identityRequirements.join(', ')))])]):_vm._e(),_vm._v(" "),(_vm.isAction)?_c('section',{staticClass:"key-val"},[_c('figure',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.MutableFieldsLabel)))]),_vm._v(" "),_c('figure',[_vm._v(_vm._s(_vm.selected.mutableActionFields.join(', ')))])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('section',{staticClass:"action-box"},[_c('section',{staticClass:"key-val"},[_c('figure',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.RemoveLabel)))]),_vm._v(" "),(_vm.isIdentity)?_c('p',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.RemoveIdentityText)))]):_vm._e(),_vm._v(" "),(_vm.isAction)?_c('p',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.PERMISSIONS.RemoveWhitelistLabel)))]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Remove),"red":"1"},nativeOn:{"click":function($event){return _vm.removeSelected($event)}}})],1)])])]):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/App.vue?vue&type=template&id=db710ed0&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./src/components/reusable/PanelTabs.vue + 4 modules
var PanelTabs = __webpack_require__("3lbk");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/ObjectHelpers.js
var ObjectHelpers = __webpack_require__("UYLU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apps/AppsService.js
var AppsService = __webpack_require__("x0xh");
var AppsService_default = /*#__PURE__*/__webpack_require__.n(AppsService);

// EXTERNAL MODULE: ./src/components/reusable/Carousel.vue + 4 modules
var Carousel = __webpack_require__("8YTa");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apps/PermissionService.js
var PermissionService = __webpack_require__("eOAV");
var PermissionService_default = /*#__PURE__*/__webpack_require__.n(PermissionService);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

    
    
    
    
    
    
    


    /* harmony default export */ var Appvue_type_script_lang_js_ = ({
	    components: {Carousel: Carousel["a" /* default */], PanelTabs: PanelTabs["a" /* default */]},
	    data () {return {
		    state:null,
		    selected:null,
        }},
        computed:{
            ...Object(vuex_esm["d" /* mapState */])([
            	'scatter',
	            'dappLogos',
	            'dappData',
            ]),
            ...Object(vuex_esm["c" /* mapGetters */])([
            	'permissions',
            ]),
	        applink(){
                return this.$route.params.applink;
            },
	        tabs(){
		        return [
			        {name:this.getAppData(this.applink).name, state:this.applink},
			        this.perms.length ? {name:'Permissions', state:'permissions'} : null,
		        ].filter(x => !!x)
	        },
	        perms(){
		        return this.permissions.filter(x => x.origin === this.applink);
	        },
	        identityPermission(){
		        return this.perms.find(x => x.isIdentity);
	        },
	        contractPermissions(){
		        return this.perms.filter(x => x.isContractAction);
	        },
	        identityRequirementPermissions(){
		        return this.perms.filter(x => x.isIdentityRequirements);
	        },
	        isIdentity(){ return this.selected.isIdentity; },
	        isAction(){ return this.selected.isContractAction; },
	        permissionsList(){
		        return ((this.identityPermission ? [this.identityPermission] : []).concat(this.contractPermissions)).map(permission => ({
			        id:permission ? permission.id : null,
			        title:this.permissionTitle(permission),
			        description:this.permissionDescription(permission),
                    icon:this.permissionIcon(permission),
		        }));
	        }
        },
	    mounted(){
	    	this.state = this.applink;
            this.selected = this.identityPermission;
	    },
        methods:{
	        getAppData:AppsService_default.a.getAppData,
            tabSelected(tab){
	        	this.state = tab;
            },
	        selectPermission(item){
		        this.selected = this.permissions.find(x => x.id === item.id);
	        },
	        permissionTitle(permission){
		        if(!permission) return;
		        return permission.isIdentity
			        ? this.locale(this.langKeys.PERMISSIONS.LoginPermission) :
			        `${permission.action}`;
	        },
	        permissionDescription(permission){
		        if(!permission) return;
		        return permission.isContractAction ? permission.contract : '';
	        },
            permissionIcon(permission){
	        	if(!permission) return;
	        	return permission.isIdentity ? 'icon-user' : 'icon-flow-tree'

            },
	        async removeSelected(){
	        	if(this.perms.length === 1) return this.removeAll();

		        await PermissionService_default.a.removePermission(this.selected);
		        if(!this.perms.length) return this.back();
		        this.selected = this.perms[0];
	        },
	        async removeAll(){
		        await PermissionService_default.a.removeAllPermissionsFor(this.applink)
                this.back();
	        }
        },
    });

// CONCATENATED MODULE: ./src/views/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/App.vue?vue&type=style&index=0&id=db710ed0&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Appvue_type_style_index_0_id_db710ed0_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("Pwn8");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "db710ed0",
  null
  
)

/* harmony default export */ var App = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "xagP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app .scroller[data-v-db710ed0]{position:relative;height:calc(100vh - 220px);overflow-y:auto}.app .scroller .padder[data-v-db710ed0]{padding:20px}.app .scroller .info[data-v-db710ed0]{margin-top:20px}.app .scroller .info .actions[data-v-db710ed0]{display:flex;justify-content:space-between}.app .scroller .info .category[data-v-db710ed0]{margin:20px 0 10px 0;font-size:10px;color:#7a7a7a}.app .scroller .info p[data-v-db710ed0]{font-size:12px}.permissions[data-v-db710ed0]{display:flex}.permissions .perms-list[data-v-db710ed0]{flex:0 0 auto;width:260px;padding:20px;border-right:1px solid #dfe0e1}.permissions .selected-permission[data-v-db710ed0]{flex:1;padding:30px}\n", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9QYW5lbFRhYnMudnVlPzIwZjgiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT9lMmMzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT8zN2MxIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsLnZ1ZT9iNjRlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9DYXJvdXNlbC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlPzRlY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsLnZ1ZT9lOThjIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9BcHAudnVlPzRmZjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcC52dWU/MmNmNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9QYW5lbFRhYnMudnVlPzAzYzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlPzg3M2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT9hYTg2Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsLnZ1ZT81ZDYzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9BcHAudnVlP2UzNGEiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9BcHAudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9BcHAudnVlPzkzNWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcC52dWU/ZWIxOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IscUJBQXFCLHlCQUF5QixpQ0FBaUMsb0JBQW9CLDhCQUE4QixpQ0FBaUMsS0FBSyx5QkFBeUIsMENBQTBDLDZCQUE2QjtBQUNoVzs7Ozs7Ozs7Ozs7Ozs7OztBQ1NBO0FBQ0E7QUFDQTs7O0FDWitILENBQWdCLGdIQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBL0M7QUFDdkM7QUFDTDtBQUNzQzs7O0FBRzlGO0FBQzZGO0FBQzdGLGdCQUFnQiw4Q0FBVTtBQUMxQixFQUFFLDBDQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLDBGOzs7Ozs7O0FDbkJmLDJCQUEyQixtQkFBTyxDQUFDLE1BQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLGdDQUFnQyxhQUFhLG1CQUFtQixtQkFBbUIsdUJBQXVCLGlCQUFpQixjQUFjLGdDQUFnQyx1Q0FBdUMsZUFBZSxlQUFlLGlCQUFpQixrQ0FBa0MsaUJBQWlCLGNBQWMseUJBQXlCLFdBQVcsa0JBQWtCLG1DQUFtQyxvQkFBb0IsMkZBQTJGLFlBQVksZ0NBQWdDOzs7Ozs7Ozs7OztBQ0Yza0IsMEJBQTBCLGFBQWEsMEJBQTBCLHdCQUF3QixxQkFBcUIsa0NBQWtDLHdDQUF3QywrQ0FBK0MseUJBQXlCLHVCQUF1Qiw2REFBNkQsNkNBQTZDLHlCQUF5QixzQkFBc0IseURBQXlELCtCQUErQixnQkFBZ0IsNkJBQTZCLHFCQUFxQixFQUFFLHVDQUF1QyxxQkFBcUIsNEJBQTRCLDBEQUEwRCxFQUFFLGdCQUFnQixxQ0FB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLDJCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FDaE1pSCxDQUFnQixpR0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQTVDO0FBQ3ZDO0FBQ0w7QUFDNEQ7OztBQUc5RztBQUMwRjtBQUMxRixnQkFBZ0IsOENBQVU7QUFDMUIsRUFBRSxpQ0FBTTtBQUNSLEVBQUUsTUFBTTtBQUNSLEVBQUUsZUFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSwwRjs7Ozs7OztBQ25CZiwyQkFBMkIsbUJBQU8sQ0FBQyxNQUFtRDtBQUN0RjtBQUNBLGNBQWMsUUFBUyxtQ0FBbUMsa0JBQWtCLDJCQUEyQixnQkFBZ0Isd0NBQXdDLGFBQWEsc0NBQXNDLGdCQUFnQiwrQ0FBK0MsYUFBYSw4QkFBOEIsZ0RBQWdELHFCQUFxQixlQUFlLGNBQWMsd0NBQXdDLGVBQWUsOEJBQThCLGFBQWEsMENBQTBDLGNBQWMsWUFBWSxhQUFhLCtCQUErQixtREFBbUQsT0FBTyxhQUFhIiwiZmlsZSI6IjYwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYW5lbC10YWJzXCJ9LF92bS5fbCgoX3ZtLnRhYnMpLGZ1bmN0aW9uKHRhYil7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRhYi1uYW1lXCIsY2xhc3M6eydhY3RpdmUnOnRhYi5zdGF0ZSA9PT0gX3ZtLnN0YXRlfSxvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS4kZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpfX19LFtfdm0uX3YoX3ZtLl9zKHRhYi5uYW1lKSldKX0pLDApfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC10YWJzXCI+XHJcblx0XHQ8ZmlndXJlIHYtZm9yPVwidGFiIGluIHRhYnNcIlxyXG5cdFx0ICAgICAgICA6Y2xhc3M9XCJ7J2FjdGl2ZSc6dGFiLnN0YXRlID09PSBzdGF0ZX1cIlxyXG5cdFx0ICAgICAgICBAY2xpY2s9XCIkZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpXCJcclxuXHRcdCAgICAgICAgY2xhc3M9XCJ0YWItbmFtZVwiPnt7dGFiLm5hbWV9fTwvZmlndXJlPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wyd0YWJzJywgJ3N0YXRlJ11cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5wYW5lbC10YWJzIHtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOnJvdztcclxuXHRcdGFsaWduLWl0ZW1zOmNlbnRlcjtcclxuXHRcdGp1c3RpZnktY29udGVudDpjZW50ZXI7XHJcblx0XHRwYWRkaW5nOjAgMCAyMHB4O1xyXG5cdFx0bWFyZ2luOjAgMjBweDtcclxuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cclxuXHRcdC50YWItbmFtZSB7XHJcblx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2VyO1xyXG5cdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0Zm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuXHRcdFx0bGluZS1oZWlnaHQ6NjhweDtcclxuXHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdHRyYW5zaXRpb246YWxsIDAuMXMgZWFzZTtcclxuXHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5wYXJlbnQ7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206LTIxcHg7XHJcblxyXG5cdFx0XHQmOmhvdmVyLCAmLmFjdGl2ZSB7XHJcblx0XHRcdFx0Y29sb3I6IGJsYWNrO1xyXG5cdFx0XHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYmx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJmOWI4NGU3OFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnBhbmVsLXRhYnNbZGF0YS12LWY5Yjg0ZTc4XXtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3BhZGRpbmc6MCAwIDIwcHg7bWFyZ2luOjAgMjBweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZGZlMGUxfS5wYW5lbC10YWJzIC50YWItbmFtZVtkYXRhLXYtZjliODRlNzhde2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6J1BvcHBpbnMnLCBzYW5zLXNlcmlmO2xpbmUtaGVpZ2h0OjY4cHg7Y29sb3I6IzA3OTlmZjt0cmFuc2l0aW9uOmFsbCAwLjFzIGVhc2U7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCB0cmFucGFyZW50O21hcmdpbi1ib3R0b206LTIxcHh9LnBhbmVsLXRhYnMgLnRhYi1uYW1lW2RhdGEtdi1mOWI4NGU3OF06aG92ZXIsLnBhbmVsLXRhYnMgLnRhYi1uYW1lLmFjdGl2ZVtkYXRhLXYtZjliODRlNzhde2NvbG9yOmJsYWNrO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwNzk5ZmZ9XFxuXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7cmVmOlwiYmFzZVwiLHN0YXRpY0NsYXNzOlwiY2Fyb3VzZWxcIn0sWyhfdm0uc2xpZGVzLmxlbmd0aCA+IDEpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJnby1yaWdodCBpY29uLXJpZ2h0LW9wZW4tYmlnXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uc2xpZGUoLTEpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc2xpZGVzLmxlbmd0aCA+IDEpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJnby1sZWZ0IGljb24tbGVmdC1vcGVuLWJpZ1wiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnNsaWRlKDEpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc2xpZGVzLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNsaWRlci1jb250YWluZXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZXJcIixzdHlsZTooeydsZWZ0Jzpfdm0ubGVmdCsncHgnfSl9LF92bS5fbCgoX3ZtLnNsaWRlcyksZnVuY3Rpb24oc2xpZGUsaSl7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZVwiLHN0eWxlOih7J2xlZnQnOmkqX3ZtLnNsaWRlV2lkdGgrJ3B4JywgJ3dpZHRoJzpfdm0uc2xpZGVXaWR0aCsncHgnfSl9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW1hZ2UtY29udGFpbmVyXCIsY2xhc3M6eydmdWxsLWhlaWdodCc6X3ZtLm5vSW5mb319LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJiZ1wiLHN0eWxlOigoXCJiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIChzbGlkZS5pbWcpICsgXCIpO1wiKSl9KSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImltYWdlXCIsc3R5bGU6KChcImJhY2tncm91bmQtaW1hZ2U6dXJsKFwiICsgKHNsaWRlLmltZykgKyBcIik7XCIpKX0pXSksX3ZtLl92KFwiIFwiKSwoIV92bS5ub0luZm8pP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihfdm0uX3Moc2xpZGUubmFtZSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJkZXNjcmlwdGlvblwifSxbX3ZtLl92KF92bS5fcyhzbGlkZS5kZXNjcmlwdGlvbikpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIlZpZXcgQXBwXCIsXCJibHVlXCI6MX0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uZ29Ub0FwcChzbGlkZSl9fX0pXSwxKV0pOl92bS5fZSgpXSl9KSwwKV0pOl9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZXItY29udGFpbmVyXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2xpZGVyIGR1bW15XCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2xpZGVcIixzdHlsZTooeydsZWZ0JzowLCAnd2lkdGgnOl92bS5zbGlkZVdpZHRoKydweCd9KX0sW192bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfdm0uX20oMSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicsW19jKCdCdXR0b24nLHthdHRyczp7XCJibHVlXCI6MX19KV0sMSldKV0pXSldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbWFnZS1jb250YWluZXJcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImJnXCJ9KSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImltYWdlXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pXSldKX0sZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWUgYW5pbWF0ZWQtZ3JhZGllbnRcIn0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZGVzY3JpcHRpb24gYW5pbWF0ZWQtZ3JhZGllbnRcIn0pXSl9XVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwiY2Fyb3VzZWxcIiByZWY9XCJiYXNlXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInNsaWRlcy5sZW5ndGggPiAxXCIgQGNsaWNrPVwic2xpZGUoLTEpXCIgY2xhc3M9XCJnby1yaWdodCBpY29uLXJpZ2h0LW9wZW4tYmlnXCI+PC9zZWN0aW9uPlxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInNsaWRlcy5sZW5ndGggPiAxXCIgQGNsaWNrPVwic2xpZGUoMSlcIiBjbGFzcz1cImdvLWxlZnQgaWNvbi1sZWZ0LW9wZW4tYmlnXCI+PC9zZWN0aW9uPlxyXG5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlci1jb250YWluZXJcIiB2LWlmPVwic2xpZGVzLmxlbmd0aFwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlclwiIDpzdHlsZT1cInsnbGVmdCc6bGVmdCsncHgnfVwiPlxyXG5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlXCIgdi1mb3I9XCIoc2xpZGUsaSkgaW4gc2xpZGVzXCIgOnN0eWxlPVwieydsZWZ0JzppKnNsaWRlV2lkdGgrJ3B4JywgJ3dpZHRoJzpzbGlkZVdpZHRoKydweCd9XCI+XHJcblxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIiA6Y2xhc3M9XCJ7J2Z1bGwtaGVpZ2h0Jzpub0luZm99XCI+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJiZ1wiIDpzdHlsZT1cImBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3NsaWRlLmltZ30pO2BcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImltYWdlXCIgOnN0eWxlPVwiYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7c2xpZGUuaW1nfSk7YFwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5mb1wiIHYtaWY9XCIhbm9JbmZvXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3tzbGlkZS5uYW1lfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e3NsaWRlLmRlc2NyaXB0aW9ufX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIHRleHQ9XCJWaWV3IEFwcFwiIDpibHVlPVwiMVwiIEBjbGljay5uYXRpdmU9XCJnb1RvQXBwKHNsaWRlKVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlci1jb250YWluZXJcIiB2LWVsc2U+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwic2xpZGVyIGR1bW15XCI+XHJcblxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwic2xpZGVcIiA6c3R5bGU9XCJ7J2xlZnQnOjAsICd3aWR0aCc6c2xpZGVXaWR0aCsncHgnfVwiPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJiZ1wiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiaW1hZ2VcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCI+PC9pPlxyXG5cdFx0XHRcdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImluZm9cIj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cIm5hbWUgYW5pbWF0ZWQtZ3JhZGllbnRcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZGVzY3JpcHRpb24gYW5pbWF0ZWQtZ3JhZGllbnRcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIDpibHVlPVwiMVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGV9IGZyb20gJ3Z1ZXgnO1xyXG5cclxuXHRsZXQgaW50ZXJ2YWw7XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydzbGlkZXMnLCAnbm9JbmZvJ10sXHJcblx0XHRkYXRhKCl7cmV0dXJuIHtcclxuXHRcdFx0bGVmdDowLFxyXG5cdFx0XHRzbGlkZVdpZHRoOjAsXHJcblx0XHR9fSxcclxuXHRcdG1vdW50ZWQoKXtcclxuXHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0SW50ZXJ2YWwoKTtcclxuXHRcdFx0XHR0aGlzLmNhbGNCYXNlV2lkdGgoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjQmFzZVdpZHRoKTtcclxuXHRcdFx0fSlcclxuXHRcdH0sXHJcblx0XHRkZXN0cm95ZWQoKXtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbClcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY0Jhc2VXaWR0aCk7XHJcblx0XHR9LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NpZGViYXJMb2NrZWQnXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRtYXhMZWZ0KCl7XHJcblx0XHRcdFx0cmV0dXJuIC0oKHRoaXMuc2xpZGVzLmxlbmd0aC0xKSAqIHRoaXMuc2xpZGVXaWR0aCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNsaWRlSW5kZXgoKXtcclxuXHRcdFx0XHRyZXR1cm4gTWF0aC5hYnModGhpcy5sZWZ0KSAvIHRoaXMuc2xpZGVXaWR0aFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6e1xyXG5cdFx0XHRjYWxjQmFzZVdpZHRoKCl7XHJcblx0XHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRoaXMuJHJlZnMuYmFzZSkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZVdpZHRoID0gdGhpcy4kcmVmcy5iYXNlLmNsaWVudFdpZHRoO1xyXG5cdFx0XHRcdFx0dGhpcy5sZWZ0ID0gMDtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzbGlkZShkZWx0YSl7XHJcblx0XHRcdFx0aWYoZGVsdGEgPiAwKSB0aGlzLmxlZnQgKz0gdGhpcy5zbGlkZVdpZHRoO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy5sZWZ0IC09IHRoaXMuc2xpZGVXaWR0aDtcclxuXHRcdFx0XHRpZih0aGlzLmxlZnQgPCB0aGlzLm1heExlZnQpIHRoaXMubGVmdCA9IDA7XHJcblx0XHRcdFx0aWYodGhpcy5sZWZ0ID4gMCkgdGhpcy5sZWZ0ID0gdGhpcy5tYXhMZWZ0O1xyXG5cdFx0XHRcdHRoaXMuc2V0SW50ZXJ2YWwoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0SW50ZXJ2YWwoKXtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGUoLTEpO1xyXG5cdFx0XHRcdH0sIDEwMDAwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z29Ub0FwcChzbGlkZSl7XHJcblx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6dGhpcy5Sb3V0ZU5hbWVzLkFQUCwgcGFyYW1zOnthcHBsaW5rOnNsaWRlLmFwcGxpbmt9fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR3YXRjaDp7XHJcblx0XHRcdFsnd2luZG93J10oKXtcclxuXHRcdFx0XHR0aGlzLmNhbGNCYXNlV2lkdGgoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0WydzaWRlYmFyTG9ja2VkJ10oKXtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuY2FsY0Jhc2VXaWR0aCgpO1xyXG5cdFx0XHRcdH0sIDIwMCAvKiBNYXRjaGVzIHRyYW5zaXRpb24gdGltZSBvZiBzaWRlYmFyICovKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5jYXJvdXNlbCB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRoZWlnaHQ6MzAwcHg7XHJcblx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0bWFyZ2luOjAgYXV0bztcclxuXHRcdG1hcmdpbi10b3A6MXB4O1xyXG5cdFx0bWF4LXdpZHRoOjkwMHB4O1xyXG5cclxuXHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC10YWJsZXQpIHtcclxuXHRcdFx0aGVpZ2h0OjQ0MHB4O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5nby1yaWdodCwgLmdvLWxlZnQge1xyXG5cdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0Y29sb3I6d2hpdGU7XHJcblx0XHRcdGZvbnQtc2l6ZTogMjBweDtcclxuXHRcdFx0YmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEyKTtcclxuXHRcdFx0d2lkdGg6NDRweDtcclxuXHRcdFx0aGVpZ2h0OjQ0cHg7XHJcblx0XHRcdGxpbmUtaGVpZ2h0OjQ0cHg7XHJcblx0XHRcdHRleHQtYWxpZ246Y2VudGVyO1xyXG5cdFx0XHR6LWluZGV4OjM7XHJcblx0XHRcdHRyYW5zaXRpb246YWxsIDAuMTJzIGVhc2UtaW4tb3V0O1xyXG5cclxuXHRcdFx0Jjpob3ZlciB7XHJcblx0XHRcdFx0d2lkdGg6NDBweDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDEpO1xyXG5cdFx0XHRcdGNvbG9yOiRibHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LmdvLWxlZnQge1xyXG5cdFx0XHRsZWZ0OjBweDtcclxuXHRcdFx0dG9wOjYwJTtcclxuXHRcdFx0bWFyZ2luLXRvcDotNTRweDtcclxuXHRcdFx0Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDNweDtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcclxuXHRcdH1cclxuXHJcblx0XHQuZ28tcmlnaHQge1xyXG5cdFx0XHRyaWdodDowcHg7XHJcblx0XHRcdHRvcDo2MCU7XHJcblx0XHRcdG1hcmdpbi10b3A6LTU0cHg7XHJcblx0XHRcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5zbGlkZXItY29udGFpbmVyIHtcclxuXHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRvdmVyZmxvdzpoaWRkZW47XHJcblx0XHRcdGhlaWdodDozMDBweDtcclxuXHRcdFx0d2lkdGg6MTAwJTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czokcmFkaXVzLWJpZztcclxuXHJcblx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC10YWJsZXQpIHtcclxuXHRcdFx0XHRoZWlnaHQ6NDQwcHg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQuc2xpZGVyIHtcclxuXHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHR0b3A6MDtcclxuXHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdGxlZnQ6MDtcclxuXHRcdFx0cmlnaHQ6MDtcclxuXHJcblx0XHRcdHRyYW5zaXRpb246IGFsbCAwLjZzIGVhc2U7XHJcblx0XHRcdHRyYW5zaXRpb24tcHJvcGVydHk6IGxlZnQ7XHJcblxyXG5cdFx0XHQuc2xpZGUge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRoZWlnaHQ6MTAwJTtcclxuXHJcblx0XHRcdFx0LmltYWdlLWNvbnRhaW5lciB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRcdGJvdHRvbTo4MHB4O1xyXG5cdFx0XHRcdFx0bGVmdDowO1xyXG5cdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdHotaW5kZXg6MTtcclxuXHRcdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kOiRibGFjaztcclxuXHJcblx0XHRcdFx0XHQmLmZ1bGwtaGVpZ2h0IHtcclxuXHRcdFx0XHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmJnIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdFx0XHR0b3A6LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRib3R0b206LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRsZWZ0Oi05MDBweDtcclxuXHRcdFx0XHRcdFx0cmlnaHQ6LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXNpemU6IDIwMHB4O1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdHotaW5kZXg6MTtcclxuXHRcdFx0XHRcdFx0dHJhbnNmb3JtOnJvdGF0ZVooMjBkZWcpIHNjYWxlKDEuMik7XHJcblx0XHRcdFx0XHRcdG9wYWNpdHk6MC4xO1xyXG5cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbjogMXMgdHJhbnNmb3JtIGVhc2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmltYWdlIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdFx0XHRcdGxlZnQ6MDtcclxuXHRcdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBjb250YWluO1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcblx0XHRcdFx0XHRcdG1hcmdpbjoyMHB4O1xyXG5cdFx0XHRcdFx0XHR6LWluZGV4OjE7XHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb246IDFzIHRyYW5zZm9ybSBlYXNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCYuZnVsbCB7XHJcblx0XHRcdFx0XHRcdC5iZyB7XHJcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTpub25lO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQuaW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRcdG1hcmdpbjowO1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5pbmZvIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRcdGJvdHRvbTowO1xyXG5cdFx0XHRcdFx0bGVmdDowO1xyXG5cdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0XHRcdHBhZGRpbmc6MjBweDtcclxuXHRcdFx0XHRcdHotaW5kZXg6MjtcclxuXHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0XHRcdFx0XHRhbGlnbi1jb250ZW50OmNlbnRlcjtcclxuXHRcdFx0XHRcdGJvcmRlci1yYWRpdXM6MDtcclxuXHRcdFx0XHRcdGJhY2tncm91bmQtY29sb3I6JGJsdWU7XHJcblx0XHRcdFx0XHRoZWlnaHQ6IDgwcHg7XHJcblxyXG5cdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LXRhYmxldCkge1xyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6MTQwcHg7XHJcblx0XHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQubmFtZSB7XHJcblx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1tZWRpdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcblx0XHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdFx0XHRjb2xvcjp3aGl0ZTtcclxuXHRcdFx0XHRcdFx0d2hpdGUtc3BhY2U6bm93cmFwO1xyXG5cdFx0XHRcdFx0XHRvdmVyZmxvdzpoaWRkZW47XHJcblx0XHRcdFx0XHRcdHRleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmRlc2NyaXB0aW9uIHtcclxuXHRcdFx0XHRcdFx0Zm9udC1zaXplOiAkbWVkaXVtO1xyXG5cdFx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRcdFx0Y29sb3I6d2hpdGU7XHJcblx0XHRcdFx0XHRcdG9wYWNpdHk6MC42O1xyXG5cdFx0XHRcdFx0XHRmb250LXNpemU6ICRmb250LXNpemUtc21hbGw7XHJcblx0XHRcdFx0XHRcdG1hcmdpbi1ib3R0b206MTBweDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCY6aG92ZXIge1xyXG5cdFx0XHRcdC5zbGlkZSB7XHJcblx0XHRcdFx0XHQuaW1hZ2UtY29udGFpbmVyIHtcclxuXHRcdFx0XHRcdFx0LmJnIHtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2l0aW9uOiA4cyB0cmFuc2Zvcm0gZWFzZTtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2Zvcm06cm90YXRlWig1MGRlZykgc2NhbGUoMC41KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ji5kdW1teSB7XHJcblx0XHRcdFx0LnNsaWRlIHtcclxuXHRcdFx0XHRcdC5pbWFnZS1jb250YWluZXIge1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiRsaWdodGVyZ3JleTtcclxuXHJcblxyXG5cclxuXHRcdFx0XHRcdFx0LmltYWdlIHtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdFx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0XHRcdFx0XHRmb250LXNpemU6IDQ4cHg7XHJcblx0XHRcdFx0XHRcdFx0Y29sb3I6JGxpZ2h0Z3JleTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC5pbmZvIHtcclxuXHRcdFx0XHRcdFx0Lm5hbWUge1xyXG5cdFx0XHRcdFx0XHRcdHBhZGRpbmc6NXB4IDUwcHg7XHJcblx0XHRcdFx0XHRcdFx0bWFyZ2luLWJvdHRvbTogMnB4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC5kZXNjcmlwdGlvbiB7XHJcblx0XHRcdFx0XHRcdFx0cGFkZGluZzoxMHB4IDE1MHB4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzOThmZmY4JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzOThmZmY4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDM5OGZmZjhcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jYXJvdXNlbFtkYXRhLXYtNDM5OGZmZjhde3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDozMDBweDt3aWR0aDoxMDAlO21hcmdpbjowIGF1dG87bWFyZ2luLXRvcDoxcHg7bWF4LXdpZHRoOjkwMHB4fUBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCl7LmNhcm91c2VsW2RhdGEtdi00Mzk4ZmZmOF17aGVpZ2h0OjQ0MHB4fX0uY2Fyb3VzZWwgLmdvLXJpZ2h0W2RhdGEtdi00Mzk4ZmZmOF0sLmNhcm91c2VsIC5nby1sZWZ0W2RhdGEtdi00Mzk4ZmZmOF17Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7Y29sb3I6d2hpdGU7Zm9udC1zaXplOjIwcHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMTIpO3dpZHRoOjQ0cHg7aGVpZ2h0OjQ0cHg7bGluZS1oZWlnaHQ6NDRweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4OjM7dHJhbnNpdGlvbjphbGwgMC4xMnMgZWFzZS1pbi1vdXR9LmNhcm91c2VsIC5nby1yaWdodFtkYXRhLXYtNDM5OGZmZjhdOmhvdmVyLC5jYXJvdXNlbCAuZ28tbGVmdFtkYXRhLXYtNDM5OGZmZjhdOmhvdmVye3dpZHRoOjQwcHg7YmFja2dyb3VuZDojZmZmO2NvbG9yOiMwNzk5ZmZ9LmNhcm91c2VsIC5nby1sZWZ0W2RhdGEtdi00Mzk4ZmZmOF17bGVmdDowcHg7dG9wOjYwJTttYXJnaW4tdG9wOi01NHB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjNweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czozcHh9LmNhcm91c2VsIC5nby1yaWdodFtkYXRhLXYtNDM5OGZmZjhde3JpZ2h0OjBweDt0b3A6NjAlO21hcmdpbi10b3A6LTU0cHg7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czozcHg7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czozcHh9LmNhcm91c2VsIC5zbGlkZXItY29udGFpbmVyW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDozMDBweDt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MH1AbWVkaWEgKG1heC13aWR0aDogOTIwcHgpey5jYXJvdXNlbCAuc2xpZGVyLWNvbnRhaW5lcltkYXRhLXYtNDM5OGZmZjhde2hlaWdodDo0NDBweH19LmNhcm91c2VsIC5zbGlkZXJbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt0cmFuc2l0aW9uOmFsbCAwLjZzIGVhc2U7dHJhbnNpdGlvbi1wcm9wZXJ0eTpsZWZ0fS5jYXJvdXNlbCAuc2xpZGVyIC5zbGlkZVtkYXRhLXYtNDM5OGZmZjhde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDoxMDAlfS5jYXJvdXNlbCAuc2xpZGVyIC5zbGlkZSAuaW1hZ2UtY29udGFpbmVyW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjgwcHg7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxO292ZXJmbG93OmhpZGRlbjtiYWNrZ3JvdW5kOiMzMzN9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbC1oZWlnaHRbZGF0YS12LTQzOThmZmY4XXtib3R0b206MH0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmltYWdlLWNvbnRhaW5lciAuYmdbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTkwMHB4O2JvdHRvbTotOTAwcHg7bGVmdDotOTAwcHg7cmlnaHQ6LTkwMHB4O2JhY2tncm91bmQtc2l6ZToyMDBweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjt6LWluZGV4OjE7dHJhbnNmb3JtOnJvdGF0ZVooMjBkZWcpIHNjYWxlKDEuMik7b3BhY2l0eTowLjE7dHJhbnNpdGlvbjoxcyB0cmFuc2Zvcm0gZWFzZX0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmltYWdlLWNvbnRhaW5lciAuaW1hZ2VbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7bWFyZ2luOjIwcHg7ei1pbmRleDoxO3RyYW5zaXRpb246MXMgdHJhbnNmb3JtIGVhc2V9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbCAuYmdbZGF0YS12LTQzOThmZmY4XXtkaXNwbGF5Om5vbmV9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbCAuaW1hZ2VbZGF0YS12LTQzOThmZmY4XXttYXJnaW46MDtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbmZvW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ZGlzcGxheTpmbGV4O3BhZGRpbmc6MjBweDt6LWluZGV4OjI7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWNvbnRlbnQ6Y2VudGVyO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLWNvbG9yOiMwNzk5ZmY7aGVpZ2h0OjgwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KXsuY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmluZm9bZGF0YS12LTQzOThmZmY4XXtoZWlnaHQ6MTQwcHg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufX0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmluZm8gLm5hbWVbZGF0YS12LTQzOThmZmY4XXtmb250LXNpemU6MTZweDtmb250LWZhbWlseTonUG9wcGlucycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjp3aGl0ZTt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbmZvIC5kZXNjcmlwdGlvbltkYXRhLXYtNDM5OGZmZjhde2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6d2hpdGU7b3BhY2l0eTowLjY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbToxMHB4fS5jYXJvdXNlbCAuc2xpZGVyOmhvdmVyIC5zbGlkZSAuaW1hZ2UtY29udGFpbmVyIC5iZ1tkYXRhLXYtNDM5OGZmZjhde3RyYW5zaXRpb246OHMgdHJhbnNmb3JtIGVhc2U7dHJhbnNmb3JtOnJvdGF0ZVooNTBkZWcpIHNjYWxlKDAuNSl9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbWFnZS1jb250YWluZXJbZGF0YS12LTQzOThmZmY4XXtiYWNrZ3JvdW5kLWNvbG9yOiNmM2Y2Zjd9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbWFnZS1jb250YWluZXIgLmltYWdlW2RhdGEtdi00Mzk4ZmZmOF17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZvbnQtc2l6ZTo0OHB4O2NvbG9yOiNkZmUwZTF9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbmZvIC5uYW1lW2RhdGEtdi00Mzk4ZmZmOF17cGFkZGluZzo1cHggNTBweDttYXJnaW4tYm90dG9tOjJweH0uY2Fyb3VzZWwgLnNsaWRlci5kdW1teSAuc2xpZGUgLmluZm8gLmRlc2NyaXB0aW9uW2RhdGEtdi00Mzk4ZmZmOF17cGFkZGluZzoxMHB4IDE1MHB4fVxcblwiLCBcIlwiXSk7XG4iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1kYjcxMGVkMCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI1MjM2ZWRmY1wiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRiNzEwZWQwJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1kYjcxMGVkMCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJiYmJhY2RkNlwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDM5OGZmZjgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXJvdXNlbC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00Mzk4ZmZmOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXJvdXNlbC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00Mzk4ZmZmOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjJiZjUxYWJjXCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwXCJ9LFtfYygnUGFuZWxUYWJzJyx7YXR0cnM6e1widGFic1wiOl92bS50YWJzLFwic3RhdGVcIjpfdm0uc3RhdGV9LG9uOntcInNlbGVjdGVkXCI6X3ZtLnRhYlNlbGVjdGVkfX0pLF92bS5fdihcIiBcIiksKF92bS5zdGF0ZSA9PT0gX3ZtLmFwcGxpbmspP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzY3JvbGxlclwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhZGRlclwifSxbKF92bS5nZXRBcHBEYXRhKF92bS5hcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJykpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJmZWF0dXJlZFwifSxbX2MoJ0Nhcm91c2VsJyx7YXR0cnM6e1wibm8taW5mb1wiOnRydWUsXCJzbGlkZXNcIjpbX3ZtLmdldEFwcERhdGEoX3ZtLmFwcGxpbmspXX19KV0sMSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5mb1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjdGlvbnNcIn0sWyhfdm0uY2FuT3BlbkFwcChfdm0uYXBwbGluaykpP19jKCdzZWN0aW9uJyxbX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIk9wZW5cIixcImJsdWVcIjp0cnVlfSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5vcGVuQXBwKF92bS5hcHBsaW5rKX19fSldLDEpOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wZXJtaXNzaW9uc0xpc3QubGVuZ3RoKT9fYygnc2VjdGlvbicsW19jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6XCJSZXZva2UgYWNjZXNzXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJlbW92ZUFsbCgkZXZlbnQpfX19KV0sMSk6X3ZtLl9lKCldKSxfdm0uX3YoXCIgXCIpLChfdm0uZ2V0QXBwRGF0YShfdm0uYXBwbGluaykudHlwZSk/X2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJjYXRlZ29yeVwifSxbX3ZtLl92KF92bS5fcyhfdm0uZ2V0QXBwRGF0YShfdm0uYXBwbGluaykudHlwZSkpXSksX3ZtLl92KFwiIFwiKSxfYygncCcsW192bS5fdihfdm0uX3MoX3ZtLmdldEFwcERhdGEoX3ZtLmFwcGxpbmspLmRlc2NyaXB0aW9uKSldKV0pOl9jKCdzZWN0aW9uJyxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY2F0ZWdvcnlcIn0sW192bS5fdihcIk5vIERhdGFcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdwJyxbX3ZtLl92KFwiVGhpcyBhcHAgZG9lc24ndCBoYXZlIGFueSByZWdpc3RlcmVkIGRhdGEgYXZhaWxhYmxlLlwiKV0pXSldKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnN0YXRlID09PSAncGVybWlzc2lvbnMnKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicGVybWlzc2lvbnMgc2Nyb2xsZXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwZXJtcy1saXN0XCJ9LF92bS5fbCgoX3ZtLnBlcm1pc3Npb25zTGlzdCksZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJiYWRnZS1pdGVtIGhvdmVyYWJsZVwiLGNsYXNzOnsnYWN0aXZlJzpfdm0uc2VsZWN0ZWQuaWQgPT09IGl0ZW0uaWR9LG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnNlbGVjdFBlcm1pc3Npb24oaXRlbSl9fX0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJkZXRhaWxzXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbX3ZtLl92KF92bS5fcyhpdGVtLnRpdGxlKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJvd1wiLHN0YXRpY1N0eWxlOntcIm1hcmdpbi10b3BcIjpcIjBcIn19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJzZWNvbmRhcnlcIn0sW192bS5fdihfdm0uX3MoaXRlbS5kZXNjcmlwdGlvbikpXSldKV0pXSl9KSwwKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzZWxlY3RlZC1wZXJtaXNzaW9uXCJ9LFsoX3ZtLmlzSWRlbnRpdHkgJiYgX3ZtLnNlbGVjdGVkLmFjY291bnRzLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImtleS12YWxcIn0sW19jKCdmaWd1cmUnLFtfdm0uX3YoX3ZtLl9zKF92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLlBFUk1JU1NJT05TLkFjY291bnRzTGFiZWwpKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLFtfdm0uX3YoX3ZtLl9zKF92bS5zZWxlY3RlZC5nZXRBY2NvdW50cygpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5mb3JtYXR0ZWQoKTsgfSkuam9pbignLCAnKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLFtfdm0uX3YoX3ZtLl9zKF92bS5zZWxlY3RlZC5hc0lkZW50aXR5UmVxdWlyZW1lbnRzKCkucGVyc29uYWwuY29uY2F0KF92bS5zZWxlY3RlZC5hc0lkZW50aXR5UmVxdWlyZW1lbnRzKCkubG9jYXRpb24pLmpvaW4oJywgJykpKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnNlbGVjdGVkLmlzSWRlbnRpdHlSZXF1aXJlbWVudHMpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJrZXktdmFsXCJ9LFtfYygnZmlndXJlJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QRVJNSVNTSU9OUy5SZXF1aXJlZEZpZWxkc0xhYmVsKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyxbX3ZtLl92KF92bS5fcyhfdm0uc2VsZWN0ZWQuaWRlbnRpdHlSZXF1aXJlbWVudHMuam9pbignLCAnKSkpXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uaXNBY3Rpb24pP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJrZXktdmFsXCJ9LFtfYygnZmlndXJlJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QRVJNSVNTSU9OUy5NdXRhYmxlRmllbGRzTGFiZWwpKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLFtfdm0uX3YoX3ZtLl9zKF92bS5zZWxlY3RlZC5tdXRhYmxlQWN0aW9uRmllbGRzLmpvaW4oJywgJykpKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjdGlvbi1ib3hcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJrZXktdmFsXCJ9LFtfYygnZmlndXJlJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QRVJNSVNTSU9OUy5SZW1vdmVMYWJlbCkpKV0pLF92bS5fdihcIiBcIiksKF92bS5pc0lkZW50aXR5KT9fYygncCcsW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUEVSTUlTU0lPTlMuUmVtb3ZlSWRlbnRpdHlUZXh0KSkpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLmlzQWN0aW9uKT9fYygncCcsW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUEVSTUlTU0lPTlMuUmVtb3ZlV2hpdGVsaXN0TGFiZWwpKSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5HRU5FUklDLlJlbW92ZSksXCJyZWRcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmVtb3ZlU2VsZWN0ZWQoJGV2ZW50KX19fSldLDEpXSldKV0pOl92bS5fZSgpXSwxKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJhcHBcIj5cclxuICAgICAgICA8UGFuZWxUYWJzIDp0YWJzPVwidGFic1wiIDpzdGF0ZT1cInN0YXRlXCIgdi1vbjpzZWxlY3RlZD1cInRhYlNlbGVjdGVkXCIgLz5cclxuXHJcblxyXG4gICAgICAgIDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG4gICAgICAgIDwhLS0tLS0tLS0tLS0tIEFQUCBEQVRBIC0tLS0tLS0tLS0tPlxyXG4gICAgICAgIDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2Nyb2xsZXJcIiB2LWlmPVwic3RhdGUgPT09IGFwcGxpbmtcIj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwYWRkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZmVhdHVyZWRcIiB2LWlmPVwiZ2V0QXBwRGF0YShhcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJylcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Q2Fyb3VzZWwgOm5vLWluZm89XCJ0cnVlXCIgOnNsaWRlcz1cIltnZXRBcHBEYXRhKGFwcGxpbmspXVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJpbmZvXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiB2LWlmPVwiY2FuT3BlbkFwcChhcHBsaW5rKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBAY2xpY2submF0aXZlPVwib3BlbkFwcChhcHBsaW5rKVwiIHRleHQ9XCJPcGVuXCIgOmJsdWU9XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiB2LWlmPVwicGVybWlzc2lvbnNMaXN0Lmxlbmd0aFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiUmV2b2tlIGFjY2Vzc1wiIEBjbGljay5uYXRpdmU9XCJyZW1vdmVBbGxcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiB2LWlmPVwiZ2V0QXBwRGF0YShhcHBsaW5rKS50eXBlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjYXRlZ29yeVwiPnt7Z2V0QXBwRGF0YShhcHBsaW5rKS50eXBlfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3tnZXRBcHBEYXRhKGFwcGxpbmspLmRlc2NyaXB0aW9ufX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIHYtZWxzZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNhdGVnb3J5XCI+Tm8gRGF0YTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGlzIGFwcCBkb2Vzbid0IGhhdmUgYW55IHJlZ2lzdGVyZWQgZGF0YSBhdmFpbGFibGUuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICA8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuICAgICAgICA8IS0tLS0tLS0tLS0gUEVSTUlTU0lPTlMgLS0tLS0tLS0tLT5cclxuICAgICAgICA8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBlcm1pc3Npb25zIHNjcm9sbGVyXCIgdi1pZj1cInN0YXRlID09PSAncGVybWlzc2lvbnMnXCI+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGVybXMtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJiYWRnZS1pdGVtIGhvdmVyYWJsZVwiIDpjbGFzcz1cInsnYWN0aXZlJzpzZWxlY3RlZC5pZCA9PT0gaXRlbS5pZH1cIiB2LWZvcj1cIml0ZW0gaW4gcGVybWlzc2lvbnNMaXN0XCIgQGNsaWNrPVwic2VsZWN0UGVybWlzc2lvbihpdGVtKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08ZmlndXJlIGNsYXNzPVwiYmFkZ2UgaWNvbmVkXCIgOmNsYXNzPVwiaXRlbS5pY29uXCI+PC9maWd1cmU+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJkZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ0aXRsZVwiPnt7aXRlbS50aXRsZX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIm1hcmdpbi10b3A6MDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJzZWNvbmRhcnlcIj57e2l0ZW0uZGVzY3JpcHRpb259fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2VsZWN0ZWQtcGVybWlzc2lvblwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwia2V5LXZhbFwiIHYtaWY9XCJpc0lkZW50aXR5ICYmIHNlbGVjdGVkLmFjY291bnRzLmxlbmd0aFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmU+e3tsb2NhbGUobGFuZ0tleXMuUEVSTUlTU0lPTlMuQWNjb3VudHNMYWJlbCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmU+e3tzZWxlY3RlZC5nZXRBY2NvdW50cygpLm1hcCh4ID0+IHguZm9ybWF0dGVkKCkpLmpvaW4oJywgJyl9fTwvZmlndXJlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZT57e3NlbGVjdGVkLmFzSWRlbnRpdHlSZXF1aXJlbWVudHMoKS5wZXJzb25hbC5jb25jYXQoc2VsZWN0ZWQuYXNJZGVudGl0eVJlcXVpcmVtZW50cygpLmxvY2F0aW9uKS5qb2luKCcsICcpfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImtleS12YWxcIiB2LWlmPVwic2VsZWN0ZWQuaXNJZGVudGl0eVJlcXVpcmVtZW50c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmU+e3tsb2NhbGUobGFuZ0tleXMuUEVSTUlTU0lPTlMuUmVxdWlyZWRGaWVsZHNMYWJlbCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmU+e3tzZWxlY3RlZC5pZGVudGl0eVJlcXVpcmVtZW50cy5qb2luKCcsICcpfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImtleS12YWxcIiB2LWlmPVwiaXNBY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlPnt7bG9jYWxlKGxhbmdLZXlzLlBFUk1JU1NJT05TLk11dGFibGVGaWVsZHNMYWJlbCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmU+e3tzZWxlY3RlZC5tdXRhYmxlQWN0aW9uRmllbGRzLmpvaW4oJywgJyl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImFjdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImtleS12YWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZT57e2xvY2FsZShsYW5nS2V5cy5QRVJNSVNTSU9OUy5SZW1vdmVMYWJlbCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCB2LWlmPVwiaXNJZGVudGl0eVwiPnt7bG9jYWxlKGxhbmdLZXlzLlBFUk1JU1NJT05TLlJlbW92ZUlkZW50aXR5VGV4dCl9fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgdi1pZj1cImlzQWN0aW9uXCI+e3tsb2NhbGUobGFuZ0tleXMuUEVSTUlTU0lPTlMuUmVtb3ZlV2hpdGVsaXN0TGFiZWwpfX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIDp0ZXh0PVwibG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuUmVtb3ZlKVwiIHJlZD1cIjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJyZW1vdmVTZWxlY3RlZFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcbiAgICBpbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJ0B3YWxsZXRwYWNrL2NvcmUvc3RvcmUvY29uc3RhbnRzJztcclxuICAgIGltcG9ydCBQYW5lbFRhYnMgZnJvbSBcIi4uL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzXCI7XHJcbiAgICBpbXBvcnQgT2JqZWN0SGVscGVycyBmcm9tIFwiQHdhbGxldHBhY2svY29yZS91dGlsL09iamVjdEhlbHBlcnNcIjtcclxuICAgIGltcG9ydCBBcHBzU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcHBzL0FwcHNTZXJ2aWNlXCI7XHJcbiAgICBpbXBvcnQgQ2Fyb3VzZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWxcIjtcclxuICAgIGltcG9ydCBQZXJtaXNzaW9uU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcHBzL1Blcm1pc3Npb25TZXJ2aWNlXCI7XHJcblxyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuXHQgICAgY29tcG9uZW50czoge0Nhcm91c2VsLCBQYW5lbFRhYnN9LFxyXG5cdCAgICBkYXRhICgpIHtyZXR1cm4ge1xyXG5cdFx0ICAgIHN0YXRlOm51bGwsXHJcblx0XHQgICAgc2VsZWN0ZWQ6bnVsbCxcclxuICAgICAgICB9fSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIC4uLm1hcFN0YXRlKFtcclxuICAgICAgICAgICAgXHQnc2NhdHRlcicsXHJcblx0ICAgICAgICAgICAgJ2RhcHBMb2dvcycsXHJcblx0ICAgICAgICAgICAgJ2RhcHBEYXRhJyxcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoW1xyXG4gICAgICAgICAgICBcdCdwZXJtaXNzaW9ucycsXHJcbiAgICAgICAgICAgIF0pLFxyXG5cdCAgICAgICAgYXBwbGluaygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnBhcmFtcy5hcHBsaW5rO1xyXG4gICAgICAgICAgICB9LFxyXG5cdCAgICAgICAgdGFicygpe1xyXG5cdFx0ICAgICAgICByZXR1cm4gW1xyXG5cdFx0XHQgICAgICAgIHtuYW1lOnRoaXMuZ2V0QXBwRGF0YSh0aGlzLmFwcGxpbmspLm5hbWUsIHN0YXRlOnRoaXMuYXBwbGlua30sXHJcblx0XHRcdCAgICAgICAgdGhpcy5wZXJtcy5sZW5ndGggPyB7bmFtZTonUGVybWlzc2lvbnMnLCBzdGF0ZToncGVybWlzc2lvbnMnfSA6IG51bGwsXHJcblx0XHQgICAgICAgIF0uZmlsdGVyKHggPT4gISF4KVxyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIHBlcm1zKCl7XHJcblx0XHQgICAgICAgIHJldHVybiB0aGlzLnBlcm1pc3Npb25zLmZpbHRlcih4ID0+IHgub3JpZ2luID09PSB0aGlzLmFwcGxpbmspO1xyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIGlkZW50aXR5UGVybWlzc2lvbigpe1xyXG5cdFx0ICAgICAgICByZXR1cm4gdGhpcy5wZXJtcy5maW5kKHggPT4geC5pc0lkZW50aXR5KTtcclxuXHQgICAgICAgIH0sXHJcblx0ICAgICAgICBjb250cmFjdFBlcm1pc3Npb25zKCl7XHJcblx0XHQgICAgICAgIHJldHVybiB0aGlzLnBlcm1zLmZpbHRlcih4ID0+IHguaXNDb250cmFjdEFjdGlvbik7XHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgaWRlbnRpdHlSZXF1aXJlbWVudFBlcm1pc3Npb25zKCl7XHJcblx0XHQgICAgICAgIHJldHVybiB0aGlzLnBlcm1zLmZpbHRlcih4ID0+IHguaXNJZGVudGl0eVJlcXVpcmVtZW50cyk7XHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgaXNJZGVudGl0eSgpeyByZXR1cm4gdGhpcy5zZWxlY3RlZC5pc0lkZW50aXR5OyB9LFxyXG5cdCAgICAgICAgaXNBY3Rpb24oKXsgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuaXNDb250cmFjdEFjdGlvbjsgfSxcclxuXHQgICAgICAgIHBlcm1pc3Npb25zTGlzdCgpe1xyXG5cdFx0ICAgICAgICByZXR1cm4gKCh0aGlzLmlkZW50aXR5UGVybWlzc2lvbiA/IFt0aGlzLmlkZW50aXR5UGVybWlzc2lvbl0gOiBbXSkuY29uY2F0KHRoaXMuY29udHJhY3RQZXJtaXNzaW9ucykpLm1hcChwZXJtaXNzaW9uID0+ICh7XHJcblx0XHRcdCAgICAgICAgaWQ6cGVybWlzc2lvbiA/IHBlcm1pc3Npb24uaWQgOiBudWxsLFxyXG5cdFx0XHQgICAgICAgIHRpdGxlOnRoaXMucGVybWlzc2lvblRpdGxlKHBlcm1pc3Npb24pLFxyXG5cdFx0XHQgICAgICAgIGRlc2NyaXB0aW9uOnRoaXMucGVybWlzc2lvbkRlc2NyaXB0aW9uKHBlcm1pc3Npb24pLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246dGhpcy5wZXJtaXNzaW9uSWNvbihwZXJtaXNzaW9uKSxcclxuXHRcdCAgICAgICAgfSkpO1xyXG5cdCAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblx0ICAgIG1vdW50ZWQoKXtcclxuXHQgICAgXHR0aGlzLnN0YXRlID0gdGhpcy5hcHBsaW5rO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pZGVudGl0eVBlcm1pc3Npb247XHJcblx0ICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcblx0ICAgICAgICBnZXRBcHBEYXRhOkFwcHNTZXJ2aWNlLmdldEFwcERhdGEsXHJcbiAgICAgICAgICAgIHRhYlNlbGVjdGVkKHRhYil7XHJcblx0ICAgICAgICBcdHRoaXMuc3RhdGUgPSB0YWI7XHJcbiAgICAgICAgICAgIH0sXHJcblx0ICAgICAgICBzZWxlY3RQZXJtaXNzaW9uKGl0ZW0pe1xyXG5cdFx0ICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5wZXJtaXNzaW9ucy5maW5kKHggPT4geC5pZCA9PT0gaXRlbS5pZCk7XHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgcGVybWlzc2lvblRpdGxlKHBlcm1pc3Npb24pe1xyXG5cdFx0ICAgICAgICBpZighcGVybWlzc2lvbikgcmV0dXJuO1xyXG5cdFx0ICAgICAgICByZXR1cm4gcGVybWlzc2lvbi5pc0lkZW50aXR5XHJcblx0XHRcdCAgICAgICAgPyB0aGlzLmxvY2FsZSh0aGlzLmxhbmdLZXlzLlBFUk1JU1NJT05TLkxvZ2luUGVybWlzc2lvbikgOlxyXG5cdFx0XHQgICAgICAgIGAke3Blcm1pc3Npb24uYWN0aW9ufWA7XHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgcGVybWlzc2lvbkRlc2NyaXB0aW9uKHBlcm1pc3Npb24pe1xyXG5cdFx0ICAgICAgICBpZighcGVybWlzc2lvbikgcmV0dXJuO1xyXG5cdFx0ICAgICAgICByZXR1cm4gcGVybWlzc2lvbi5pc0NvbnRyYWN0QWN0aW9uID8gcGVybWlzc2lvbi5jb250cmFjdCA6ICcnO1xyXG5cdCAgICAgICAgfSxcclxuICAgICAgICAgICAgcGVybWlzc2lvbkljb24ocGVybWlzc2lvbil7XHJcblx0ICAgICAgICBcdGlmKCFwZXJtaXNzaW9uKSByZXR1cm47XHJcblx0ICAgICAgICBcdHJldHVybiBwZXJtaXNzaW9uLmlzSWRlbnRpdHkgPyAnaWNvbi11c2VyJyA6ICdpY29uLWZsb3ctdHJlZSdcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblx0ICAgICAgICBhc3luYyByZW1vdmVTZWxlY3RlZCgpe1xyXG5cdCAgICAgICAgXHRpZih0aGlzLnBlcm1zLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRoaXMucmVtb3ZlQWxsKCk7XHJcblxyXG5cdFx0ICAgICAgICBhd2FpdCBQZXJtaXNzaW9uU2VydmljZS5yZW1vdmVQZXJtaXNzaW9uKHRoaXMuc2VsZWN0ZWQpO1xyXG5cdFx0ICAgICAgICBpZighdGhpcy5wZXJtcy5sZW5ndGgpIHJldHVybiB0aGlzLmJhY2soKTtcclxuXHRcdCAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMucGVybXNbMF07XHJcblx0ICAgICAgICB9LFxyXG5cdCAgICAgICAgYXN5bmMgcmVtb3ZlQWxsKCl7XHJcblx0XHQgICAgICAgIGF3YWl0IFBlcm1pc3Npb25TZXJ2aWNlLnJlbW92ZUFsbFBlcm1pc3Npb25zRm9yKHRoaXMuYXBwbGluaylcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFjaygpO1xyXG5cdCAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiIHJlbD1cInN0eWxlc2hlZXQvc2Nzc1wiPlxyXG4gICAgQGltcG9ydCBcIi4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcbiAgICAuYXBwIHtcclxuICAgICAgICAuc2Nyb2xsZXIge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGhlaWdodDpjYWxjKDEwMHZoIC0gMjIwcHgpO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OmF1dG87XHJcblxyXG4gICAgICAgICAgICAucGFkZGVyIHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MjBweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmZlYXR1cmVkIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5pbmZvIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6MjBweDtcclxuXHJcbiAgICAgICAgICAgICAgICAuYWN0aW9ucyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuY2F0ZWdvcnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjoyMHB4IDAgMTBweCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogJHNtYWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiRzaWx2ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAkbWVkaXVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnBlcm1pc3Npb25zIHtcclxuICAgICAgICBkaXNwbGF5OmZsZXg7XHJcblxyXG4gICAgICAgIC5wZXJtcy1saXN0IHtcclxuICAgICAgICAgICAgZmxleDowIDAgYXV0bztcclxuICAgICAgICAgICAgd2lkdGg6MjYwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MjBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNlbGVjdGVkLXBlcm1pc3Npb24ge1xyXG4gICAgICAgICAgICBmbGV4OjE7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MzBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRiNzEwZWQwJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRiNzEwZWQwJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImRiNzEwZWQwXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXBwIC5zY3JvbGxlcltkYXRhLXYtZGI3MTBlZDBde3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDpjYWxjKDEwMHZoIC0gMjIwcHgpO292ZXJmbG93LXk6YXV0b30uYXBwIC5zY3JvbGxlciAucGFkZGVyW2RhdGEtdi1kYjcxMGVkMF17cGFkZGluZzoyMHB4fS5hcHAgLnNjcm9sbGVyIC5pbmZvW2RhdGEtdi1kYjcxMGVkMF17bWFyZ2luLXRvcDoyMHB4fS5hcHAgLnNjcm9sbGVyIC5pbmZvIC5hY3Rpb25zW2RhdGEtdi1kYjcxMGVkMF17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hcHAgLnNjcm9sbGVyIC5pbmZvIC5jYXRlZ29yeVtkYXRhLXYtZGI3MTBlZDBde21hcmdpbjoyMHB4IDAgMTBweCAwO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiM3YTdhN2F9LmFwcCAuc2Nyb2xsZXIgLmluZm8gcFtkYXRhLXYtZGI3MTBlZDBde2ZvbnQtc2l6ZToxMnB4fS5wZXJtaXNzaW9uc1tkYXRhLXYtZGI3MTBlZDBde2Rpc3BsYXk6ZmxleH0ucGVybWlzc2lvbnMgLnBlcm1zLWxpc3RbZGF0YS12LWRiNzEwZWQwXXtmbGV4OjAgMCBhdXRvO3dpZHRoOjI2MHB4O3BhZGRpbmc6MjBweDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNkZmUwZTF9LnBlcm1pc3Npb25zIC5zZWxlY3RlZC1wZXJtaXNzaW9uW2RhdGEtdi1kYjcxMGVkMF17ZmxleDoxO3BhZGRpbmc6MzBweH1cXG5cIiwgXCJcIl0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==