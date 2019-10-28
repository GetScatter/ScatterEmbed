(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

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

/***/ "4ILN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Apps.vue?vue&type=template&id=4f7821b6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"apps"},[_c('PanelTabs',{attrs:{"tabs":_vm.tabs,"state":this.selectedCategory ? this.selectedCategory : _vm.state},on:{"selected":_vm.setState}}),_vm._v(" "),(_vm.state === _vm.STATES.EXPLORE)?_c('section',{staticClass:"search-icon",class:{'visible':_vm.exploreTerms.length}},[_c('i',{staticClass:"icon-search"}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.exploreTerms),expression:"exploreTerms"}],domProps:{"value":(_vm.exploreTerms)},on:{"input":function($event){if($event.target.composing){ return; }_vm.exploreTerms=$event.target.value}}})]):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.EXPLORE)?_c('section',{ref:"scroller",staticClass:"scroller"},[_c('section',{staticClass:"padder"},[(!_vm.exploreTerms.length && !_vm.selectedCategory && _vm.featuredApps.length)?_c('section',{staticClass:"featured"},_vm._l((_vm.featuredApps),function(app){return _c('section',{staticClass:"featured-app",on:{"click":function($event){return _vm.openInBrowser(app.url)}}},[_c('img',{staticClass:"featured-background",attrs:{"src":app.img}}),_vm._v(" "),_c('figure',{staticClass:"tag"},[_vm._v("Promoted")])])}),0):_vm._e(),_vm._v(" "),(!_vm.categories.length)?_c('section',[_c('section',{staticClass:"categories"},[_c('section',{staticClass:"category"},[_c('section',{staticClass:"apps"},_vm._l((new Array(5).keys()),function(i){return _c('figure',{staticClass:"app"},[_c('figure',{staticClass:"image no-image animated-gradient"}),_vm._v(" "),_c('figure',{staticClass:"name"})])}),0)])])]):_c('section',[(_vm.exploreTerms.length)?_c('section',{staticClass:"categories"},[_c('section',{staticClass:"category singular"},[_c('section',{staticClass:"info"},[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.terms))])]),_vm._v(" "),_c('section',{staticClass:"apps"},_vm._l((_vm.filteredApps),function(app){return _c('router-link',{key:app.applink,staticClass:"app",attrs:{"to":{name:_vm.RouteNames.APP, params:{applink:app.applink}}}},[_c('figure',{staticClass:"image",class:{'no-image':!_vm.getAppData(app.applink).hasOwnProperty('img')}},[(_vm.getAppData(app.applink).hasOwnProperty('img'))?_c('img',{attrs:{"src":_vm.getAppData(app.applink).img}}):_vm._e()]),_vm._v(" "),_c('figure',{staticClass:"name"},[_vm._v(_vm._s(app.name))])])}),1)])]):_vm._e(),_vm._v(" "),(!_vm.exploreTerms.length)?_c('section',{staticClass:"categories"},_vm._l((_vm.categories),function(category){return (!_vm.selectedCategory || _vm.selectedCategory === category.type)?_c('section',{staticClass:"category",class:{'singular':_vm.selectedCategory}},[(!_vm.selectedCategory)?_c('section',{staticClass:"info"},[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(category.type))]),_vm._v(" "),(category.apps.length > 4)?_c('figure',{staticClass:"view-all",on:{"click":function($event){return _vm.selectCategory(category)}}},[_vm._v("View all "+_vm._s(category.apps.length)+" apps "),_c('i',{staticClass:"icon-right-open-big"})]):_vm._e()]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"apps"},_vm._l((_vm.selectedCategory ? category.apps : category.apps.slice(0,10)),function(app){return _c('router-link',{key:app.applink,staticClass:"app",attrs:{"to":{name:_vm.RouteNames.APP, params:{applink:app.applink}}}},[_c('figure',{staticClass:"image",class:{'no-image':!_vm.getAppData(app.applink).hasOwnProperty('img')}},[(_vm.getAppData(app.applink).hasOwnProperty('img'))?_c('img',{attrs:{"src":_vm.getAppData(app.applink).img}}):_vm._e()]),_vm._v(" "),_c('figure',{staticClass:"name"},[_vm._v(_vm._s(app.name))])])}),1)]):_vm._e()}),0):_vm._e()])])]):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.MINE)?_c('section',[_c('SearchAndFilter',{attrs:{"filters":_vm.filters},on:{"terms":function (x) { return _vm.terms = x; }}}),_vm._v(" "),_c('section',{staticClass:"scroller with-search"},[_c('section',{staticClass:"linked-apps"},_vm._l((_vm.linkedApps),function(app){return _c('section',{staticClass:"app"},[_c('figure',{staticClass:"image",on:{"click":function($event){return _vm.goToApp(app)}}},[(_vm.getAppData(app.applink).hasOwnProperty('img'))?_c('img',{attrs:{"src":_vm.getAppData(app.applink).img}}):_c('figure',{staticClass:"dummy-image"})]),_vm._v(" "),_c('section',{staticClass:"info",on:{"click":function($event){return _vm.goToApp(app)}}},[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(app.name))]),_vm._v(" "),_c('figure',{staticClass:"category"},[_vm._v(_vm._s(app.type))])]),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('Button',{attrs:{"text":"Remove"},nativeOn:{"click":function($event){return _vm.removeApp(app)}}}),_vm._v(" "),_c('Button',{attrs:{"text":"Manage"},nativeOn:{"click":function($event){return _vm.goToApp(app)}}}),_vm._v(" "),(_vm.canOpenApp(app.applink))?_c('Button',{attrs:{"text":"Open","blue":"1"},nativeOn:{"click":function($event){return _vm.openApp(app.applink)}}}):_vm._e()],1)])}),0)])],1):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Apps.vue?vue&type=template&id=4f7821b6&scoped=true&

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

// EXTERNAL MODULE: ./src/vue/Routing.js
var Routing = __webpack_require__("HLB/");

// EXTERNAL MODULE: ./src/store/ui_actions.js
var ui_actions = __webpack_require__("q+A3");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Apps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












const STATES = {
	EXPLORE:'explore',
	MINE:'mine',
}

/* harmony default export */ var Appsvue_type_script_lang_js_ = ({
	components: {Carousel: Carousel["a" /* default */], PanelTabs: PanelTabs["a" /* default */]},
	data () {return {
		state:STATES.EXPLORE,
		STATES,
		selectedCategory:null,
		terms:'',
		exploreTerms:'',
		typeFilter:null,
	}},
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'scatter',
			'dappLogos',
			'dappData',
			'featuredApps',
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'permissions',
			'apps',
			'accounts',
		]),
		tabs(){
			let tabs = [
				{name:'Explore', state:STATES.EXPLORE},
			];
			if(this.selectedCategory) tabs.splice(1, 0, { name:this.selectedCategory, state:this.selectedCategory });
			if(this.permissions.filter(x => x.isIdentity).length) tabs.push({name:'My Apps', state:STATES.MINE});
			return tabs;
		},
		categories(){
			return AppsService_default.a.appsByCategory(this.selectedCategory);
		},
		filteredApps(){
			return AppsService_default.a.appsByTerm(this.exploreTerms);
		},
		filters(){
			return [
				{
					selected:this.typeFilter,
					options:[null].concat(AppsService_default.a.categories(this.selectedCategory)),
					parser:x => x === null ? 'All Categories' : x,
					onSelect:x => this.typeFilter = x,
				}
			]
		},
		linkedApps(){
			return AppsService_default.a.linkedApps(this.terms, this.typeFilter);
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		async init(){
			if(!this.featuredApps || !this.featuredApps.length) {
				this[ui_actions["k" /* SET_FEATURED_APPS */]](await AppsService_default.a.getFeaturedApps());
			}


			if(!this.accounts.length){
				return this.$router.push({name:this.RouteNames.WALLET});
			}
			if(this.$route.query.hasOwnProperty('state')){
				this.state = this.$route.query.state;
				if(this.state === STATES.MINE && !this.linkedApps.length){
					this.state = STATES.EXPLORE;
				}
			}

			if(this.$route.query.hasOwnProperty('category')){
				this.selectedCategory = this.$route.query.category;
			}

		},
		goToApp(app){
			this.$router.push({name:this.RouteNames.APP, params:{applink:app.applink}})
		},
		getAppData:AppsService_default.a.getAppData,
		setState(state){
			if(state === this.selectedCategory) return;
			this.$router.push({ query: {state} });
			this.state = state;
			this.selectedCategory = null;
			this.scrollToTop();
		},
		selectCategory(category){
			this.$router.push({ query: {category:category.type} });
			this.selectedCategory = category.type;
			this.scrollToTop();
		},
		scrollToTop(){
			this.$nextTick(() => {
				if(!this.$refs.scroller) return;
				this.$refs.scroller.scrollTop = 0;
			})
		},
		async removeApp(app){
			await PermissionService_default.a.removeAllPermissionsFor(app.applink);
			if(!this.permissions.filter(x => x.isIdentity).length){
				this.state = STATES.EXPLORE;
			}
		},
		...Object(vuex_esm["b" /* mapActions */])([
			ui_actions["k" /* SET_FEATURED_APPS */]
		])
	},
	created(){
	},
});

// CONCATENATED MODULE: ./src/views/Apps.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Appsvue_type_script_lang_js_ = (Appsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Apps.vue?vue&type=style&index=0&id=4f7821b6&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Appsvue_type_style_index_0_id_4f7821b6_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("U9wo");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Apps.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Appsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4f7821b6",
  null
  
)

/* harmony default export */ var Apps = __webpack_exports__["default"] = (component.exports);

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

/***/ "TbGq":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".apps[data-v-4f7821b6]{position:relative;height:100%}.apps .search-icon[data-v-4f7821b6]{margin:20px 20px 0;color:#0799ff;font-size:22px;cursor:pointer;border-radius:0;position:relative}.apps .search-icon .icon-search[data-v-4f7821b6]{right:10px;top:16px;position:absolute}.apps .search-icon input[data-v-4f7821b6]{font-size:14px;width:100%;-webkit-appearance:none;transition:opacity 0.5s ease}.apps .search-icon:hover input[data-v-4f7821b6],.apps .search-icon.visible input[data-v-4f7821b6],.apps .search-icon:active input[data-v-4f7821b6],.apps .search-icon:focus input[data-v-4f7821b6]{border-color:#0799ff}.apps .scroller[data-v-4f7821b6]{position:relative;height:calc(100vh - 288px);margin-top:10px;overflow-x:hidden;overflow-y:auto}.apps .scroller.with-search[data-v-4f7821b6]{height:calc(100vh - 290px)}.apps .scroller .padder[data-v-4f7821b6]{padding:20px;position:relative;z-index:2}.apps .scroller .featured[data-v-4f7821b6]{overflow:visible;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between}.apps .scroller .featured .featured-app[data-v-4f7821b6]{overflow:hidden;border-radius:0 0 0 0;width:calc(33.3333% - 10px);padding-bottom:15%;position:relative;margin-bottom:20px;cursor:pointer}@media (max-width: 920px){.apps .scroller .featured .featured-app[data-v-4f7821b6]{width:calc(50% - 10px);padding-bottom:25%}}@media (max-width: 600px){.apps .scroller .featured .featured-app[data-v-4f7821b6]{width:100%;padding-bottom:50%}}.apps .scroller .featured .featured-app img[data-v-4f7821b6]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%}.apps .scroller .featured .featured-app .tag[data-v-4f7821b6]{position:absolute;top:0;right:0;background:white;padding:4px;font-size:9px;text-transform:uppercase;font-weight:bold;color:#333}.apps .scroller .categories[data-v-4f7821b6]{margin-top:40px}@media (max-width: 600px){.apps .scroller .categories[data-v-4f7821b6]{margin-top:20px}}.apps .scroller .categories .category[data-v-4f7821b6]{margin:0 -20px 40px;padding:40px}@media (max-width: 600px){.apps .scroller .categories .category[data-v-4f7821b6]{margin:0 -20px 20px;padding:20px}}.apps .scroller .categories .category[data-v-4f7821b6]:nth-child(even){background:#f3f6f7}.apps .scroller .categories .category .info[data-v-4f7821b6]{display:flex;justify-content:space-between;font-size:12px;font-weight:bold;margin-bottom:15px}.apps .scroller .categories .category .info .name[data-v-4f7821b6]{font-size:16px;font-family:'Poppins', sans-serif;font-weight:bold}.apps .scroller .categories .category .info .view-all[data-v-4f7821b6]{color:#0799ff;cursor:pointer}.apps .scroller .categories .category .apps[data-v-4f7821b6]{white-space:nowrap;overflow-y:auto;padding-bottom:20px}.apps .scroller .categories .category .apps[data-v-4f7821b6]:after{content:\"\";flex:auto}.apps .scroller .categories .category .apps .app[data-v-4f7821b6]{display:inline-block;width:calc(20% - 10px);max-width:100px}@media (max-width: 920px){.apps .scroller .categories .category .apps .app[data-v-4f7821b6]{width:calc(50% - 5px);max-width:80px}}.apps .scroller .categories .category .apps .app .image[data-v-4f7821b6]{border-radius:0;overflow:hidden;position:relative}.apps .scroller .categories .category .apps .app .image[data-v-4f7821b6]:after{content:\"\";display:block;padding-bottom:100%}.apps .scroller .categories .category .apps .app .image img[data-v-4f7821b6]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%}.apps .scroller .categories .category .apps .app .name[data-v-4f7821b6]{margin-top:10px;text-align:center;font-size:10px;font-weight:bold}.apps .scroller .categories .category:not(.singular) .apps .app[data-v-4f7821b6]{margin-right:20px}@media (max-width: 920px){.apps .scroller .categories .category:not(.singular) .apps .app[data-v-4f7821b6]{margin-right:10px}}.apps .scroller .categories .category:not(.singular) .apps .app[data-v-4f7821b6]:last-child{margin-right:0}.apps .scroller .categories .category.singular .apps[data-v-4f7821b6]{white-space:normal;display:flex;flex-wrap:wrap;justify-content:space-between}.apps .scroller .categories .category.singular .apps .app[data-v-4f7821b6]{margin-bottom:50px}.apps .scroller .categories .category.singular .apps .app[data-v-4f7821b6]:last-child{margin-left:20px}.apps .scroller .linked-apps[data-v-4f7821b6]{padding:40px}@media (max-width: 600px){.apps .scroller .linked-apps[data-v-4f7821b6]{padding:20px}}.apps .scroller .linked-apps .app[data-v-4f7821b6]{display:flex;align-items:center;margin-bottom:20px}@media (max-width: 600px){.apps .scroller .linked-apps .app[data-v-4f7821b6]{padding:20px;flex-direction:column}}.apps .scroller .linked-apps .app .image[data-v-4f7821b6]{flex:0 0 auto;height:90px;width:90px;border-radius:0;overflow:hidden;cursor:pointer}.apps .scroller .linked-apps .app .image.no-image[data-v-4f7821b6]{background:rgba(0,0,0,0.02)}.apps .scroller .linked-apps .app .image img[data-v-4f7821b6],.apps .scroller .linked-apps .app .image .dummy-image[data-v-4f7821b6]{height:90px;width:90px}.apps .scroller .linked-apps .app .image .dummy-image[data-v-4f7821b6]{background:#f3f6f7}.apps .scroller .linked-apps .app .info[data-v-4f7821b6]{flex:1;padding:0 20px;cursor:pointer;font-size:13px;font-family:'Poppins', sans-serif}.apps .scroller .linked-apps .app .info .name[data-v-4f7821b6]{font-size:12px;font-weight:bold;color:black;font-size:13px}.apps .scroller .linked-apps .app .info .category[data-v-4f7821b6]{font-size:12px;opacity:0.6;color:black}.apps .scroller .linked-apps .app .actions[data-v-4f7821b6]{flex:0 0 auto}@media (max-width: 600px){.apps .scroller .linked-apps .app .actions[data-v-4f7821b6]{margin:10px -10px 0 0}}.apps .scroller .linked-apps .app .actions button+button[data-v-4f7821b6]{margin-left:10px}\n", ""]);


/***/ }),

/***/ "U9wo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Apps_vue_vue_type_style_index_0_id_4f7821b6_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hBBl");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Apps_vue_vue_type_style_index_0_id_4f7821b6_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Apps_vue_vue_type_style_index_0_id_4f7821b6_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Apps_vue_vue_type_style_index_0_id_4f7821b6_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "hBBl":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("TbGq");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("b4ea19a6", content, true, {});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9QYW5lbFRhYnMudnVlPzIwZjgiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT9lMmMzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT8zN2MxIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9BcHBzLnZ1ZT81MTNiIiwid2VicGFjazovLy9zcmMvdmlld3MvQXBwcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcHMudnVlPzk0MzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcHMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsLnZ1ZT9iNjRlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9DYXJvdXNlbC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlPzRlY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsLnZ1ZT9lOThjIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWU/MDNjNyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvQXBwcy52dWU/YjFiMyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvQXBwcy52dWU/MDIxMSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9DYXJvdXNlbC52dWU/ODczZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9QYW5lbFRhYnMudnVlP2FhODYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvQ2Fyb3VzZWwudnVlPzVkNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0FwcHMudnVlPzY4NTIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQix5QkFBeUIsaUNBQWlDLG9CQUFvQiw4QkFBOEIsaUNBQWlDLEtBQUsseUJBQXlCLDBDQUEwQyw2QkFBNkI7QUFDaFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNTQTtBQUNBO0FBQ0E7OztBQ1orSCxDQUFnQixnSEFBRyxFQUFDLEM7Ozs7Ozs7O0FDQS9DO0FBQ3ZDO0FBQ0w7QUFDc0M7OztBQUc5RjtBQUM2RjtBQUM3RixnQkFBZ0IsOENBQVU7QUFDMUIsRUFBRSwwQ0FBTTtBQUNSLEVBQUUsTUFBTTtBQUNSLEVBQUUsZUFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSwwRjs7Ozs7OztBQ25CZiwyQkFBMkIsbUJBQU8sQ0FBQyxNQUFzRDtBQUN6RjtBQUNBLGNBQWMsUUFBUyxnQ0FBZ0MsYUFBYSxtQkFBbUIsbUJBQW1CLHVCQUF1QixpQkFBaUIsY0FBYyxnQ0FBZ0MsdUNBQXVDLGVBQWUsZUFBZSxpQkFBaUIsa0NBQWtDLGlCQUFpQixjQUFjLHlCQUF5QixXQUFXLGtCQUFrQixtQ0FBbUMsb0JBQW9CLDJGQUEyRixZQUFZLGdDQUFnQzs7Ozs7Ozs7Ozs7O0FDRjNrQiwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQixtQkFBbUIsa0JBQWtCLE9BQU8sa0ZBQWtGLEtBQUsseUJBQXlCLCtEQUErRCxpQ0FBaUMsbUNBQW1DLFVBQVUsMEJBQTBCLDBCQUEwQixhQUFhLGtGQUFrRixZQUFZLDJCQUEyQixLQUFLLHlCQUF5Qiw0QkFBNEIsUUFBUSxFQUFFLHVDQUF1Qyww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QUF1QiwwRUFBMEUsaUJBQWlCOzs7Ozs7Ozs7QUNGMXFMO0FBQUE7QUFBQTtBQUE2VyxDQUFnQix5YUFBRyxFQUFDLEM7Ozs7Ozs7O0FDQWpZO0FBQUE7QUFBQTtBQUEwVyxDQUFnQix1WkFBRyxFQUFDLEM7Ozs7Ozs7O0FDQTlYO0FBQUE7QUFBQTtBQUEyVyxDQUFnQix3WkFBRyxFQUFDLEM7Ozs7Ozs7QUNBL1g7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBeVM7QUFDL1QsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFnRTtBQUNsRiw4Q0FBOEMsRTs7Ozs7OztBQ1I5Qzs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUErUztBQUNyVSw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFIiwiZmlsZSI6IjYxLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYW5lbC10YWJzXCJ9LF92bS5fbCgoX3ZtLnRhYnMpLGZ1bmN0aW9uKHRhYil7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRhYi1uYW1lXCIsY2xhc3M6eydhY3RpdmUnOnRhYi5zdGF0ZSA9PT0gX3ZtLnN0YXRlfSxvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS4kZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpfX19LFtfdm0uX3YoX3ZtLl9zKHRhYi5uYW1lKSldKX0pLDApfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC10YWJzXCI+XHJcblx0XHQ8ZmlndXJlIHYtZm9yPVwidGFiIGluIHRhYnNcIlxyXG5cdFx0ICAgICAgICA6Y2xhc3M9XCJ7J2FjdGl2ZSc6dGFiLnN0YXRlID09PSBzdGF0ZX1cIlxyXG5cdFx0ICAgICAgICBAY2xpY2s9XCIkZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpXCJcclxuXHRcdCAgICAgICAgY2xhc3M9XCJ0YWItbmFtZVwiPnt7dGFiLm5hbWV9fTwvZmlndXJlPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wyd0YWJzJywgJ3N0YXRlJ11cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5wYW5lbC10YWJzIHtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOnJvdztcclxuXHRcdGFsaWduLWl0ZW1zOmNlbnRlcjtcclxuXHRcdGp1c3RpZnktY29udGVudDpjZW50ZXI7XHJcblx0XHRwYWRkaW5nOjAgMCAyMHB4O1xyXG5cdFx0bWFyZ2luOjAgMjBweDtcclxuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cclxuXHRcdC50YWItbmFtZSB7XHJcblx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2VyO1xyXG5cdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0Zm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuXHRcdFx0bGluZS1oZWlnaHQ6NjhweDtcclxuXHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdHRyYW5zaXRpb246YWxsIDAuMXMgZWFzZTtcclxuXHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5wYXJlbnQ7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206LTIxcHg7XHJcblxyXG5cdFx0XHQmOmhvdmVyLCAmLmFjdGl2ZSB7XHJcblx0XHRcdFx0Y29sb3I6IGJsYWNrO1xyXG5cdFx0XHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYmx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJmOWI4NGU3OFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnBhbmVsLXRhYnNbZGF0YS12LWY5Yjg0ZTc4XXtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3BhZGRpbmc6MCAwIDIwcHg7bWFyZ2luOjAgMjBweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZGZlMGUxfS5wYW5lbC10YWJzIC50YWItbmFtZVtkYXRhLXYtZjliODRlNzhde2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6J1BvcHBpbnMnLCBzYW5zLXNlcmlmO2xpbmUtaGVpZ2h0OjY4cHg7Y29sb3I6IzA3OTlmZjt0cmFuc2l0aW9uOmFsbCAwLjFzIGVhc2U7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCB0cmFucGFyZW50O21hcmdpbi1ib3R0b206LTIxcHh9LnBhbmVsLXRhYnMgLnRhYi1uYW1lW2RhdGEtdi1mOWI4NGU3OF06aG92ZXIsLnBhbmVsLXRhYnMgLnRhYi1uYW1lLmFjdGl2ZVtkYXRhLXYtZjliODRlNzhde2NvbG9yOmJsYWNrO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwNzk5ZmZ9XFxuXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhcHBzXCJ9LFtfYygnUGFuZWxUYWJzJyx7YXR0cnM6e1widGFic1wiOl92bS50YWJzLFwic3RhdGVcIjp0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPyB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgOiBfdm0uc3RhdGV9LG9uOntcInNlbGVjdGVkXCI6X3ZtLnNldFN0YXRlfX0pLF92bS5fdihcIiBcIiksKF92bS5zdGF0ZSA9PT0gX3ZtLlNUQVRFUy5FWFBMT1JFKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2VhcmNoLWljb25cIixjbGFzczp7J3Zpc2libGUnOl92bS5leHBsb3JlVGVybXMubGVuZ3RofX0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNlYXJjaFwifSksX3ZtLl92KFwiIFwiKSxfYygnaW5wdXQnLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTooX3ZtLmV4cGxvcmVUZXJtcyksZXhwcmVzc2lvbjpcImV4cGxvcmVUZXJtc1wifV0sZG9tUHJvcHM6e1widmFsdWVcIjooX3ZtLmV4cGxvcmVUZXJtcyl9LG9uOntcImlucHV0XCI6ZnVuY3Rpb24oJGV2ZW50KXtpZigkZXZlbnQudGFyZ2V0LmNvbXBvc2luZyl7IHJldHVybjsgfV92bS5leHBsb3JlVGVybXM9JGV2ZW50LnRhcmdldC52YWx1ZX19fSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuRVhQTE9SRSk/X2MoJ3NlY3Rpb24nLHtyZWY6XCJzY3JvbGxlclwiLHN0YXRpY0NsYXNzOlwic2Nyb2xsZXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYWRkZXJcIn0sWyghX3ZtLmV4cGxvcmVUZXJtcy5sZW5ndGggJiYgIV92bS5zZWxlY3RlZENhdGVnb3J5ICYmIF92bS5mZWF0dXJlZEFwcHMubGVuZ3RoKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZmVhdHVyZWRcIn0sX3ZtLl9sKChfdm0uZmVhdHVyZWRBcHBzKSxmdW5jdGlvbihhcHApe3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZmVhdHVyZWQtYXBwXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ub3BlbkluQnJvd3NlcihhcHAudXJsKX19fSxbX2MoJ2ltZycse3N0YXRpY0NsYXNzOlwiZmVhdHVyZWQtYmFja2dyb3VuZFwiLGF0dHJzOntcInNyY1wiOmFwcC5pbWd9fSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0YWdcIn0sW192bS5fdihcIlByb21vdGVkXCIpXSldKX0pLDApOl92bS5fZSgpLF92bS5fdihcIiBcIiksKCFfdm0uY2F0ZWdvcmllcy5sZW5ndGgpP19jKCdzZWN0aW9uJyxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImNhdGVnb3JpZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJjYXRlZ29yeVwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFwcHNcIn0sX3ZtLl9sKChuZXcgQXJyYXkoNSkua2V5cygpKSxmdW5jdGlvbihpKXtyZXR1cm4gX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiYXBwXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJpbWFnZSBuby1pbWFnZSBhbmltYXRlZC1ncmFkaWVudFwifSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9KV0pfSksMCldKV0pXSk6X2MoJ3NlY3Rpb24nLFsoX3ZtLmV4cGxvcmVUZXJtcy5sZW5ndGgpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJjYXRlZ29yaWVzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiY2F0ZWdvcnkgc2luZ3VsYXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50ZXJtcykpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhcHBzXCJ9LF92bS5fbCgoX3ZtLmZpbHRlcmVkQXBwcyksZnVuY3Rpb24oYXBwKXtyZXR1cm4gX2MoJ3JvdXRlci1saW5rJyx7a2V5OmFwcC5hcHBsaW5rLHN0YXRpY0NsYXNzOlwiYXBwXCIsYXR0cnM6e1widG9cIjp7bmFtZTpfdm0uUm91dGVOYW1lcy5BUFAsIHBhcmFtczp7YXBwbGluazphcHAuYXBwbGlua319fX0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImltYWdlXCIsY2xhc3M6eyduby1pbWFnZSc6IV92bS5nZXRBcHBEYXRhKGFwcC5hcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJyl9fSxbKF92bS5nZXRBcHBEYXRhKGFwcC5hcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJykpP19jKCdpbWcnLHthdHRyczp7XCJzcmNcIjpfdm0uZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaW1nfX0pOl92bS5fZSgpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKGFwcC5uYW1lKSldKV0pfSksMSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKCFfdm0uZXhwbG9yZVRlcm1zLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImNhdGVnb3JpZXNcIn0sX3ZtLl9sKChfdm0uY2F0ZWdvcmllcyksZnVuY3Rpb24oY2F0ZWdvcnkpe3JldHVybiAoIV92bS5zZWxlY3RlZENhdGVnb3J5IHx8IF92bS5zZWxlY3RlZENhdGVnb3J5ID09PSBjYXRlZ29yeS50eXBlKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiY2F0ZWdvcnlcIixjbGFzczp7J3Npbmd1bGFyJzpfdm0uc2VsZWN0ZWRDYXRlZ29yeX19LFsoIV92bS5zZWxlY3RlZENhdGVnb3J5KT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5mb1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KF92bS5fcyhjYXRlZ29yeS50eXBlKSldKSxfdm0uX3YoXCIgXCIpLChjYXRlZ29yeS5hcHBzLmxlbmd0aCA+IDQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZpZXctYWxsXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpfX19LFtfdm0uX3YoXCJWaWV3IGFsbCBcIitfdm0uX3MoY2F0ZWdvcnkuYXBwcy5sZW5ndGgpK1wiIGFwcHMgXCIpLF9jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXJpZ2h0LW9wZW4tYmlnXCJ9KV0pOl92bS5fZSgpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYXBwc1wifSxfdm0uX2woKF92bS5zZWxlY3RlZENhdGVnb3J5ID8gY2F0ZWdvcnkuYXBwcyA6IGNhdGVnb3J5LmFwcHMuc2xpY2UoMCwxMCkpLGZ1bmN0aW9uKGFwcCl7cmV0dXJuIF9jKCdyb3V0ZXItbGluaycse2tleTphcHAuYXBwbGluayxzdGF0aWNDbGFzczpcImFwcFwiLGF0dHJzOntcInRvXCI6e25hbWU6X3ZtLlJvdXRlTmFtZXMuQVBQLCBwYXJhbXM6e2FwcGxpbms6YXBwLmFwcGxpbmt9fX19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJpbWFnZVwiLGNsYXNzOnsnbm8taW1hZ2UnOiFfdm0uZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaGFzT3duUHJvcGVydHkoJ2ltZycpfX0sWyhfdm0uZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaGFzT3duUHJvcGVydHkoJ2ltZycpKT9fYygnaW1nJyx7YXR0cnM6e1wic3JjXCI6X3ZtLmdldEFwcERhdGEoYXBwLmFwcGxpbmspLmltZ319KTpfdm0uX2UoKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KF92bS5fcyhhcHAubmFtZSkpXSldKX0pLDEpXSk6X3ZtLl9lKCl9KSwwKTpfdm0uX2UoKV0pXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuTUlORSk/X2MoJ3NlY3Rpb24nLFtfYygnU2VhcmNoQW5kRmlsdGVyJyx7YXR0cnM6e1wiZmlsdGVyc1wiOl92bS5maWx0ZXJzfSxvbjp7XCJ0ZXJtc1wiOmZ1bmN0aW9uICh4KSB7IHJldHVybiBfdm0udGVybXMgPSB4OyB9fX0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNjcm9sbGVyIHdpdGgtc2VhcmNoXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibGlua2VkLWFwcHNcIn0sX3ZtLl9sKChfdm0ubGlua2VkQXBwcyksZnVuY3Rpb24oYXBwKXtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFwcFwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiaW1hZ2VcIixvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5nb1RvQXBwKGFwcCl9fX0sWyhfdm0uZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaGFzT3duUHJvcGVydHkoJ2ltZycpKT9fYygnaW1nJyx7YXR0cnM6e1wic3JjXCI6X3ZtLmdldEFwcERhdGEoYXBwLmFwcGxpbmspLmltZ319KTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJkdW1teS1pbWFnZVwifSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uZ29Ub0FwcChhcHApfX19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKGFwcC5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNhdGVnb3J5XCJ9LFtfdm0uX3YoX3ZtLl9zKGFwcC50eXBlKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjdGlvbnNcIn0sW19jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6XCJSZW1vdmVcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmVtb3ZlQXBwKGFwcCl9fX0pLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIk1hbmFnZVwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5nb1RvQXBwKGFwcCl9fX0pLF92bS5fdihcIiBcIiksKF92bS5jYW5PcGVuQXBwKGFwcC5hcHBsaW5rKSk/X2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIk9wZW5cIixcImJsdWVcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ub3BlbkFwcChhcHAuYXBwbGluayl9fX0pOl92bS5fZSgpXSwxKV0pfSksMCldKV0sMSk6X3ZtLl9lKCldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJhcHBzXCI+XHJcblx0XHQ8UGFuZWxUYWJzIDp0YWJzPVwidGFic1wiIDpzdGF0ZT1cInRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA/IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA6IHN0YXRlXCIgdi1vbjpzZWxlY3RlZD1cInNldFN0YXRlXCIgLz5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNlYXJjaC1pY29uXCIgOmNsYXNzPVwieyd2aXNpYmxlJzpleHBsb3JlVGVybXMubGVuZ3RofVwiIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLkVYUExPUkVcIj5cclxuXHRcdFx0PGkgY2xhc3M9XCJpY29uLXNlYXJjaFwiPjwvaT5cclxuXHRcdFx0PGlucHV0IHYtbW9kZWw9XCJleHBsb3JlVGVybXNcIiAvPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwic2Nyb2xsZXJcIiByZWY9XCJzY3JvbGxlclwiIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLkVYUExPUkVcIj5cclxuXHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJwYWRkZXJcIj5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImZlYXR1cmVkXCIgdi1pZj1cIiFleHBsb3JlVGVybXMubGVuZ3RoICYmICFzZWxlY3RlZENhdGVnb3J5ICYmIGZlYXR1cmVkQXBwcy5sZW5ndGhcIj5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIEBjbGljaz1cIm9wZW5JbkJyb3dzZXIoYXBwLnVybClcIiBjbGFzcz1cImZlYXR1cmVkLWFwcFwiIHYtZm9yPVwiYXBwIGluIGZlYXR1cmVkQXBwc1wiPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwiZmVhdHVyZWQtYmFja2dyb3VuZFwiIDpzcmM9XCJhcHAuaW1nXCIgLz5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRhZ1wiPlByb21vdGVkPC9maWd1cmU+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHQ8c2VjdGlvbiB2LWlmPVwiIWNhdGVnb3JpZXMubGVuZ3RoXCI+XHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImNhdGVnb3JpZXNcIj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJjYXRlZ29yeVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYXBwc1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImFwcFwiIHYtZm9yPVwiaSBpbiBuZXcgQXJyYXkoNSkua2V5cygpXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJpbWFnZSBuby1pbWFnZSBhbmltYXRlZC1ncmFkaWVudFwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHQ8c2VjdGlvbiB2LWVsc2U+XHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImNhdGVnb3JpZXNcIiB2LWlmPVwiZXhwbG9yZVRlcm1zLmxlbmd0aFwiPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImNhdGVnb3J5IHNpbmd1bGFyXCI+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbmZvXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPnt7dGVybXN9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcHBzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8cm91dGVyLWxpbmsgOnRvPVwie25hbWU6Um91dGVOYW1lcy5BUFAsIHBhcmFtczp7YXBwbGluazphcHAuYXBwbGlua319XCIgY2xhc3M9XCJhcHBcIiA6a2V5PVwiYXBwLmFwcGxpbmtcIiB2LWZvcj1cImFwcCBpbiBmaWx0ZXJlZEFwcHNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImltYWdlXCIgOmNsYXNzPVwieyduby1pbWFnZSc6IWdldEFwcERhdGEoYXBwLmFwcGxpbmspLmhhc093blByb3BlcnR5KCdpbWcnKX1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHYtaWY9XCJnZXRBcHBEYXRhKGFwcC5hcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJylcIiA6c3JjPVwiZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaW1nXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thcHAubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3JvdXRlci1saW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImNhdGVnb3JpZXNcIiB2LWlmPVwiIWV4cGxvcmVUZXJtcy5sZW5ndGhcIj5cclxuXHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiY2F0ZWdvcnlcIiA6Y2xhc3M9XCJ7J3Npbmd1bGFyJzpzZWxlY3RlZENhdGVnb3J5fVwiIHYtZm9yPVwiY2F0ZWdvcnkgaW4gY2F0ZWdvcmllc1wiIHYtaWY9XCIhc2VsZWN0ZWRDYXRlZ29yeSB8fCBzZWxlY3RlZENhdGVnb3J5ID09PSBjYXRlZ29yeS50eXBlXCI+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbmZvXCIgdi1pZj1cIiFzZWxlY3RlZENhdGVnb3J5XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPnt7Y2F0ZWdvcnkudHlwZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwidmlldy1hbGxcIiB2LWlmPVwiY2F0ZWdvcnkuYXBwcy5sZW5ndGggPiA0XCIgQGNsaWNrPVwic2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpXCI+VmlldyBhbGwge3tjYXRlZ29yeS5hcHBzLmxlbmd0aH19IGFwcHMgPGkgY2xhc3M9XCJpY29uLXJpZ2h0LW9wZW4tYmlnXCI+PC9pPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcHBzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8cm91dGVyLWxpbmsgOnRvPVwie25hbWU6Um91dGVOYW1lcy5BUFAsIHBhcmFtczp7YXBwbGluazphcHAuYXBwbGlua319XCIgY2xhc3M9XCJhcHBcIiA6a2V5PVwiYXBwLmFwcGxpbmtcIiB2LWZvcj1cImFwcCBpbiBzZWxlY3RlZENhdGVnb3J5ID8gY2F0ZWdvcnkuYXBwcyA6IGNhdGVnb3J5LmFwcHMuc2xpY2UoMCwxMClcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImltYWdlXCIgOmNsYXNzPVwieyduby1pbWFnZSc6IWdldEFwcERhdGEoYXBwLmFwcGxpbmspLmhhc093blByb3BlcnR5KCdpbWcnKX1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHYtaWY9XCJnZXRBcHBEYXRhKGFwcC5hcHBsaW5rKS5oYXNPd25Qcm9wZXJ0eSgnaW1nJylcIiA6c3JjPVwiZ2V0QXBwRGF0YShhcHAuYXBwbGluaykuaW1nXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thcHAubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3JvdXRlci1saW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHJcblxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInN0YXRlID09PSBTVEFURVMuTUlORVwiPlxyXG5cdFx0XHQ8U2VhcmNoQW5kRmlsdGVyIHYtb246dGVybXM9XCJ4ID0+IHRlcm1zID0geFwiIDpmaWx0ZXJzPVwiZmlsdGVyc1wiIC8+XHJcblxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNjcm9sbGVyIHdpdGgtc2VhcmNoXCI+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJsaW5rZWQtYXBwc1wiPlxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcHBcIiB2LWZvcj1cImFwcCBpbiBsaW5rZWRBcHBzXCI+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJpbWFnZVwiIEBjbGljaz1cImdvVG9BcHAoYXBwKVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgdi1pZj1cImdldEFwcERhdGEoYXBwLmFwcGxpbmspLmhhc093blByb3BlcnR5KCdpbWcnKVwiIDpzcmM9XCJnZXRBcHBEYXRhKGFwcC5hcHBsaW5rKS5pbWdcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgdi1lbHNlIGNsYXNzPVwiZHVtbXktaW1hZ2VcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5mb1wiIEBjbGljaz1cImdvVG9BcHAoYXBwKVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thcHAubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImNhdGVnb3J5XCI+e3thcHAudHlwZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhY3Rpb25zXCI+XHJcblx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBAY2xpY2submF0aXZlPVwicmVtb3ZlQXBwKGFwcClcIiB0ZXh0PVwiUmVtb3ZlXCIgLz5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIEBjbGljay5uYXRpdmU9XCJnb1RvQXBwKGFwcClcIiB0ZXh0PVwiTWFuYWdlXCIgLz5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIHYtaWY9XCJjYW5PcGVuQXBwKGFwcC5hcHBsaW5rKVwiIEBjbGljay5uYXRpdmU9XCJvcGVuQXBwKGFwcC5hcHBsaW5rKVwiIHRleHQ9XCJPcGVuXCIgYmx1ZT1cIjFcIiAvPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHRpbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJ0B3YWxsZXRwYWNrL2NvcmUvc3RvcmUvY29uc3RhbnRzJztcclxuXHRpbXBvcnQgUGFuZWxUYWJzIGZyb20gXCIuLi9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFic1wiO1xyXG5cdGltcG9ydCBPYmplY3RIZWxwZXJzIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3V0aWwvT2JqZWN0SGVscGVyc1wiO1xyXG5cdGltcG9ydCBBcHBzU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcHBzL0FwcHNTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IENhcm91c2VsIGZyb20gXCIuLi9jb21wb25lbnRzL3JldXNhYmxlL0Nhcm91c2VsXCI7XHJcblx0aW1wb3J0IFBlcm1pc3Npb25TZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwcHMvUGVybWlzc2lvblNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1JvdXRlTmFtZXN9IGZyb20gXCIuLi92dWUvUm91dGluZ1wiO1xyXG5cdGltcG9ydCAqIGFzIFVJQWN0aW9ucyBmcm9tIFwiLi4vc3RvcmUvdWlfYWN0aW9uc1wiO1xyXG5cclxuXHJcblx0Y29uc3QgU1RBVEVTID0ge1xyXG5cdFx0RVhQTE9SRTonZXhwbG9yZScsXHJcblx0XHRNSU5FOidtaW5lJyxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGNvbXBvbmVudHM6IHtDYXJvdXNlbCwgUGFuZWxUYWJzfSxcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblx0XHRcdHN0YXRlOlNUQVRFUy5FWFBMT1JFLFxyXG5cdFx0XHRTVEFURVMsXHJcblx0XHRcdHNlbGVjdGVkQ2F0ZWdvcnk6bnVsbCxcclxuXHRcdFx0dGVybXM6JycsXHJcblx0XHRcdGV4cGxvcmVUZXJtczonJyxcclxuXHRcdFx0dHlwZUZpbHRlcjpudWxsLFxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnc2NhdHRlcicsXHJcblx0XHRcdFx0J2RhcHBMb2dvcycsXHJcblx0XHRcdFx0J2RhcHBEYXRhJyxcclxuXHRcdFx0XHQnZmVhdHVyZWRBcHBzJyxcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdwZXJtaXNzaW9ucycsXHJcblx0XHRcdFx0J2FwcHMnLFxyXG5cdFx0XHRcdCdhY2NvdW50cycsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR0YWJzKCl7XHJcblx0XHRcdFx0bGV0IHRhYnMgPSBbXHJcblx0XHRcdFx0XHR7bmFtZTonRXhwbG9yZScsIHN0YXRlOlNUQVRFUy5FWFBMT1JFfSxcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHRcdGlmKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSkgdGFicy5zcGxpY2UoMSwgMCwgeyBuYW1lOnRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgc3RhdGU6dGhpcy5zZWxlY3RlZENhdGVnb3J5IH0pO1xyXG5cdFx0XHRcdGlmKHRoaXMucGVybWlzc2lvbnMuZmlsdGVyKHggPT4geC5pc0lkZW50aXR5KS5sZW5ndGgpIHRhYnMucHVzaCh7bmFtZTonTXkgQXBwcycsIHN0YXRlOlNUQVRFUy5NSU5FfSk7XHJcblx0XHRcdFx0cmV0dXJuIHRhYnM7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNhdGVnb3JpZXMoKXtcclxuXHRcdFx0XHRyZXR1cm4gQXBwc1NlcnZpY2UuYXBwc0J5Q2F0ZWdvcnkodGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmlsdGVyZWRBcHBzKCl7XHJcblx0XHRcdFx0cmV0dXJuIEFwcHNTZXJ2aWNlLmFwcHNCeVRlcm0odGhpcy5leHBsb3JlVGVybXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRmaWx0ZXJzKCl7XHJcblx0XHRcdFx0cmV0dXJuIFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ6dGhpcy50eXBlRmlsdGVyLFxyXG5cdFx0XHRcdFx0XHRvcHRpb25zOltudWxsXS5jb25jYXQoQXBwc1NlcnZpY2UuY2F0ZWdvcmllcyh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpKSxcclxuXHRcdFx0XHRcdFx0cGFyc2VyOnggPT4geCA9PT0gbnVsbCA/ICdBbGwgQ2F0ZWdvcmllcycgOiB4LFxyXG5cdFx0XHRcdFx0XHRvblNlbGVjdDp4ID0+IHRoaXMudHlwZUZpbHRlciA9IHgsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsaW5rZWRBcHBzKCl7XHJcblx0XHRcdFx0cmV0dXJuIEFwcHNTZXJ2aWNlLmxpbmtlZEFwcHModGhpcy50ZXJtcywgdGhpcy50eXBlRmlsdGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG1vdW50ZWQoKXtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblx0XHRcdGFzeW5jIGluaXQoKXtcclxuXHRcdFx0XHRpZighdGhpcy5mZWF0dXJlZEFwcHMgfHwgIXRoaXMuZmVhdHVyZWRBcHBzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0dGhpc1tVSUFjdGlvbnMuU0VUX0ZFQVRVUkVEX0FQUFNdKGF3YWl0IEFwcHNTZXJ2aWNlLmdldEZlYXR1cmVkQXBwcygpKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRpZighdGhpcy5hY2NvdW50cy5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOnRoaXMuUm91dGVOYW1lcy5XQUxMRVR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYodGhpcy4kcm91dGUucXVlcnkuaGFzT3duUHJvcGVydHkoJ3N0YXRlJykpe1xyXG5cdFx0XHRcdFx0dGhpcy5zdGF0ZSA9IHRoaXMuJHJvdXRlLnF1ZXJ5LnN0YXRlO1xyXG5cdFx0XHRcdFx0aWYodGhpcy5zdGF0ZSA9PT0gU1RBVEVTLk1JTkUgJiYgIXRoaXMubGlua2VkQXBwcy5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlID0gU1RBVEVTLkVYUExPUkU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZih0aGlzLiRyb3V0ZS5xdWVyeS5oYXNPd25Qcm9wZXJ0eSgnY2F0ZWdvcnknKSl7XHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSB0aGlzLiRyb3V0ZS5xdWVyeS5jYXRlZ29yeTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRnb1RvQXBwKGFwcCl7XHJcblx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6dGhpcy5Sb3V0ZU5hbWVzLkFQUCwgcGFyYW1zOnthcHBsaW5rOmFwcC5hcHBsaW5rfX0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGdldEFwcERhdGE6QXBwc1NlcnZpY2UuZ2V0QXBwRGF0YSxcclxuXHRcdFx0c2V0U3RhdGUoc3RhdGUpe1xyXG5cdFx0XHRcdGlmKHN0YXRlID09PSB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpIHJldHVybjtcclxuXHRcdFx0XHR0aGlzLiRyb3V0ZXIucHVzaCh7IHF1ZXJ5OiB7c3RhdGV9IH0pO1xyXG5cdFx0XHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBudWxsO1xyXG5cdFx0XHRcdHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xyXG5cdFx0XHRcdHRoaXMuJHJvdXRlci5wdXNoKHsgcXVlcnk6IHtjYXRlZ29yeTpjYXRlZ29yeS50eXBlfSB9KTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBjYXRlZ29yeS50eXBlO1xyXG5cdFx0XHRcdHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2Nyb2xsVG9Ub3AoKXtcclxuXHRcdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRpZighdGhpcy4kcmVmcy5zY3JvbGxlcikgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dGhpcy4kcmVmcy5zY3JvbGxlci5zY3JvbGxUb3AgPSAwO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIHJlbW92ZUFwcChhcHApe1xyXG5cdFx0XHRcdGF3YWl0IFBlcm1pc3Npb25TZXJ2aWNlLnJlbW92ZUFsbFBlcm1pc3Npb25zRm9yKGFwcC5hcHBsaW5rKTtcclxuXHRcdFx0XHRpZighdGhpcy5wZXJtaXNzaW9ucy5maWx0ZXIoeCA9PiB4LmlzSWRlbnRpdHkpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHR0aGlzLnN0YXRlID0gU1RBVEVTLkVYUExPUkU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQuLi5tYXBBY3Rpb25zKFtcclxuXHRcdFx0XHRVSUFjdGlvbnMuU0VUX0ZFQVRVUkVEX0FQUFNcclxuXHRcdFx0XSlcclxuXHRcdH0sXHJcblx0XHRjcmVhdGVkKCl7XHJcblx0XHR9LFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmFwcHMge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0aGVpZ2h0OiAxMDAlO1xyXG5cclxuXHRcdC5zZWFyY2gtaWNvbiB7XHJcblx0XHRcdG1hcmdpbjoyMHB4IDIwcHggMDtcclxuXHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdGZvbnQtc2l6ZTogMjJweDtcclxuXHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiRyYWRpdXM7XHJcblx0XHRcdHBvc2l0aW9uOnJlbGF0aXZlO1xyXG5cclxuXHRcdFx0Lmljb24tc2VhcmNoIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6MTZweDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlucHV0IHtcclxuXHRcdFx0XHRmb250LXNpemU6ICRsYXJnZTtcclxuXHRcdFx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0XHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOm9wYWNpdHkgMC41cyBlYXNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQmOmhvdmVyLCAmLnZpc2libGUsICY6YWN0aXZlLCAmOmZvY3VzIHtcclxuXHRcdFx0XHRpbnB1dCB7XHJcblx0XHRcdFx0XHRib3JkZXItY29sb3I6JGJsdWU7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5zY3JvbGxlciB7XHJcblx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0aGVpZ2h0OiBjYWxjKDEwMHZoIC0gMjg4cHgpO1xyXG5cdFx0XHRtYXJnaW4tdG9wOjEwcHg7XHJcblx0XHRcdG92ZXJmbG93LXg6IGhpZGRlbjtcclxuXHRcdFx0b3ZlcmZsb3cteTogYXV0bztcclxuXHJcblx0XHRcdCYud2l0aC1zZWFyY2gge1xyXG5cdFx0XHRcdGhlaWdodDpjYWxjKDEwMHZoIC0gMjkwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucGFkZGVyIHtcclxuXHRcdFx0XHRwYWRkaW5nOjIwcHg7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHotaW5kZXg6MjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmZlYXR1cmVkIHtcclxuXHRcdFx0XHRvdmVyZmxvdzp2aXNpYmxlO1xyXG5cdFx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0XHRmbGV4LWRpcmVjdGlvbjpyb3c7XHJcblx0XHRcdFx0ZmxleC13cmFwOndyYXA7XHJcblx0XHRcdFx0anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47XHJcblxyXG5cclxuXHRcdFx0XHQuZmVhdHVyZWQtYXBwIHtcclxuXHRcdFx0XHRcdG92ZXJmbG93OmhpZGRlbjtcclxuXHRcdFx0XHRcdGJvcmRlci1yYWRpdXM6ICRyYWRpdXMgMCAkcmFkaXVzICRyYWRpdXM7XHJcblx0XHRcdFx0XHR3aWR0aDpjYWxjKDMzLjMzMzMlIC0gMTBweCk7XHJcblx0XHRcdFx0XHRwYWRkaW5nLWJvdHRvbToxNSU7XHJcblx0XHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblx0XHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG5cdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LXRhYmxldCkge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDpjYWxjKDUwJSAtIDEwcHgpO1xyXG5cdFx0XHRcdFx0XHRwYWRkaW5nLWJvdHRvbTogMjUlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC1tb2JpbGUpIHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6MTAwJTtcclxuXHRcdFx0XHRcdFx0cGFkZGluZy1ib3R0b206IDUwJTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpbWcge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbjphYnNvbHV0ZTtcclxuXHRcdFx0XHRcdFx0dG9wOjA7XHJcblx0XHRcdFx0XHRcdGJvdHRvbTowO1xyXG5cdFx0XHRcdFx0XHRsZWZ0OjA7XHJcblx0XHRcdFx0XHRcdHJpZ2h0OjA7XHJcblx0XHRcdFx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdFx0XHRcdGhlaWdodDoxMDAlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC50YWcge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRcdFx0cmlnaHQ6IDA7XHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmQ6IHdoaXRlO1xyXG5cdFx0XHRcdFx0XHRwYWRkaW5nOiA0cHg7XHJcblx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogOXB4O1xyXG5cdFx0XHRcdFx0XHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG5cdFx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRcdFx0Y29sb3I6ICRibGFjaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5jYXRlZ29yaWVzIHtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOjQwcHg7XHJcblxyXG5cdFx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC1tb2JpbGUpIHtcclxuXHQgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDoyMHB4O1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdFx0LmNhdGVnb3J5IHtcclxuXHRcdFx0XHRcdG1hcmdpbjowIC0yMHB4IDQwcHg7XHJcblx0XHRcdFx0XHRwYWRkaW5nOjQwcHg7XHJcblxyXG5cdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LW1vYmlsZSkge1xyXG5cdFx0ICAgICAgICAgICAgICAgIG1hcmdpbjowIC0yMHB4IDIwcHg7XHJcblx0XHRcdFx0XHRcdHBhZGRpbmc6MjBweDtcclxuXHRcdCAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdFx0XHQmOm50aC1jaGlsZChldmVuKSB7XHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmQ6JGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC5pbmZvIHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogJG1lZGl1bTtcclxuXHRcdFx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0XHRcdG1hcmdpbi1ib3R0b206MTVweDtcclxuXHJcblx0XHRcdFx0XHRcdC5uYW1lIHtcclxuXHRcdFx0XHRcdFx0XHRmb250LXNpemU6ICRmb250LXNpemUtbWVkaXVtO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC52aWV3LWFsbCB7XHJcblx0XHRcdFx0XHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdFx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmFwcHMge1xyXG5cdFx0XHRcdFx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cdFx0XHRcdFx0XHRvdmVyZmxvdy15OmF1dG87XHJcblx0XHRcdFx0XHRcdHBhZGRpbmctYm90dG9tOjIwcHg7XHJcblxyXG5cdFx0XHRcdFx0XHQmOmFmdGVyIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGZsZXg6IGF1dG87XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHQuYXBwIHtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OmlubGluZS1ibG9jaztcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDpjYWxjKDIwJSAtIDEwcHgpO1xyXG5cdFx0XHRcdFx0XHRcdG1heC13aWR0aDoxMDBweDtcclxuXHJcblx0XHRcdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LXRhYmxldCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg6Y2FsYyg1MCUgLSA1cHgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bWF4LXdpZHRoOjgwcHg7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQuaW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyLXJhZGl1czokcmFkaXVzO1xyXG5cdFx0XHRcdFx0XHRcdFx0b3ZlcmZsb3c6aGlkZGVuO1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCY6YWZ0ZXIge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZW50OiBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBibG9jaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGFkZGluZy1ib3R0b206IDEwMCU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aW1nIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3A6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcmlnaHQ6MDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg6MTAwJTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OjEwMCU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Lm5hbWUge1xyXG5cdFx0XHRcdFx0XHRcdFx0bWFyZ2luLXRvcDoxMHB4O1xyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dC1hbGlnbjpjZW50ZXI7XHJcblx0XHRcdFx0XHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQmOm5vdCguc2luZ3VsYXIpe1xyXG5cdFx0XHRcdFx0XHQuYXBwcyB7XHJcblx0XHRcdFx0XHRcdFx0LmFwcCB7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXJnaW4tcmlnaHQ6MjBweDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogJGJyZWFrcG9pbnQtdGFibGV0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmdpbi1yaWdodDoxMHB4O1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCY6bGFzdC1jaGlsZCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmdpbi1yaWdodDowO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCYuc2luZ3VsYXIge1xyXG5cdFx0XHRcdFx0XHQuYXBwcyB7XHJcblx0XHRcdFx0XHRcdFx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdFx0XHRcdFx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdFx0XHRcdFx0XHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcblx0XHRcdFx0XHRcdFx0LmFwcCB7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXJnaW4tYm90dG9tOjUwcHg7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0JjpsYXN0LWNoaWxkIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWFyZ2luLWxlZnQ6MjBweDtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5saW5rZWQtYXBwcyB7XHJcblx0XHRcdFx0cGFkZGluZzo0MHB4O1xyXG5cclxuXHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogJGJyZWFrcG9pbnQtbW9iaWxlKSB7XHJcblx0XHRcdFx0XHRwYWRkaW5nOjIwcHg7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQuYXBwIHtcclxuXHRcdFx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblxyXG5cdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LW1vYmlsZSkge1xyXG5cdFx0XHRcdFx0XHRwYWRkaW5nOjIwcHg7XHJcblx0XHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQuaW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRmbGV4OjAgMCBhdXRvO1xyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6OTBweDtcclxuXHRcdFx0XHRcdFx0d2lkdGg6OTBweDtcclxuXHRcdFx0XHRcdFx0Ym9yZGVyLXJhZGl1czokcmFkaXVzO1xyXG5cdFx0XHRcdFx0XHRvdmVyZmxvdzpoaWRkZW47XHJcblx0XHRcdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHJcblx0XHRcdFx0XHRcdCYubm8taW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjAyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aW1nLCAuZHVtbXktaW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRcdGhlaWdodDo5MHB4O1xyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOjkwcHg7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC5kdW1teS1pbWFnZSB7XHJcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZDokbGlnaHRlcmdyZXk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQuaW5mbyB7XHJcblx0XHRcdFx0XHRcdGZsZXg6MTtcclxuXHRcdFx0XHRcdFx0cGFkZGluZzowIDIwcHg7XHJcblx0XHRcdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRcdFx0Zm9udC1zaXplOiAkZm9udC1zaXplLXN0YW5kYXJkO1xyXG5cdFx0XHRcdFx0XHRmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG5cclxuXHRcdFx0XHRcdFx0Lm5hbWUge1xyXG5cdFx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogJG1lZGl1bTtcclxuXHRcdFx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRcdFx0XHRjb2xvcjpibGFjaztcclxuXHRcdFx0XHRcdFx0XHRmb250LXNpemU6ICRmb250LXNpemUtc3RhbmRhcmQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC5jYXRlZ29yeSB7XHJcblx0XHRcdFx0XHRcdFx0Zm9udC1zaXplOiAkZm9udC1zaXplLXNtYWxsO1xyXG5cdFx0XHRcdFx0XHRcdG9wYWNpdHk6MC42O1xyXG5cdFx0XHRcdFx0XHRcdGNvbG9yOmJsYWNrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmFjdGlvbnMge1xyXG5cdFx0XHRcdFx0XHRmbGV4OjAgMCBhdXRvO1xyXG5cclxuXHRcdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LW1vYmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdG1hcmdpbjoxMHB4IC0xMHB4IDAgMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0YnV0dG9uICsgYnV0dG9uIHtcclxuXHRcdFx0XHRcdFx0XHRtYXJnaW4tbGVmdDoxMHB4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHBzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00Zjc4MjFiNiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHBzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXBwcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXBwcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00Zjc4MjFiNiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0Zjc4MjFiNlwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7cmVmOlwiYmFzZVwiLHN0YXRpY0NsYXNzOlwiY2Fyb3VzZWxcIn0sWyhfdm0uc2xpZGVzLmxlbmd0aCA+IDEpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJnby1yaWdodCBpY29uLXJpZ2h0LW9wZW4tYmlnXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uc2xpZGUoLTEpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc2xpZGVzLmxlbmd0aCA+IDEpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJnby1sZWZ0IGljb24tbGVmdC1vcGVuLWJpZ1wiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnNsaWRlKDEpfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc2xpZGVzLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNsaWRlci1jb250YWluZXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZXJcIixzdHlsZTooeydsZWZ0Jzpfdm0ubGVmdCsncHgnfSl9LF92bS5fbCgoX3ZtLnNsaWRlcyksZnVuY3Rpb24oc2xpZGUsaSl7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZVwiLHN0eWxlOih7J2xlZnQnOmkqX3ZtLnNsaWRlV2lkdGgrJ3B4JywgJ3dpZHRoJzpfdm0uc2xpZGVXaWR0aCsncHgnfSl9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW1hZ2UtY29udGFpbmVyXCIsY2xhc3M6eydmdWxsLWhlaWdodCc6X3ZtLm5vSW5mb319LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJiZ1wiLHN0eWxlOigoXCJiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIChzbGlkZS5pbWcpICsgXCIpO1wiKSl9KSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImltYWdlXCIsc3R5bGU6KChcImJhY2tncm91bmQtaW1hZ2U6dXJsKFwiICsgKHNsaWRlLmltZykgKyBcIik7XCIpKX0pXSksX3ZtLl92KFwiIFwiKSwoIV92bS5ub0luZm8pP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihfdm0uX3Moc2xpZGUubmFtZSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJkZXNjcmlwdGlvblwifSxbX3ZtLl92KF92bS5fcyhzbGlkZS5kZXNjcmlwdGlvbikpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIlZpZXcgQXBwXCIsXCJibHVlXCI6MX0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uZ29Ub0FwcChzbGlkZSl9fX0pXSwxKV0pOl92bS5fZSgpXSl9KSwwKV0pOl9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzbGlkZXItY29udGFpbmVyXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2xpZGVyIGR1bW15XCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2xpZGVcIixzdHlsZTooeydsZWZ0JzowLCAnd2lkdGgnOl92bS5zbGlkZVdpZHRoKydweCd9KX0sW192bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfdm0uX20oMSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicsW19jKCdCdXR0b24nLHthdHRyczp7XCJibHVlXCI6MX19KV0sMSldKV0pXSldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbWFnZS1jb250YWluZXJcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImJnXCJ9KSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImltYWdlXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pXSldKX0sZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWUgYW5pbWF0ZWQtZ3JhZGllbnRcIn0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZGVzY3JpcHRpb24gYW5pbWF0ZWQtZ3JhZGllbnRcIn0pXSl9XVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwiY2Fyb3VzZWxcIiByZWY9XCJiYXNlXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInNsaWRlcy5sZW5ndGggPiAxXCIgQGNsaWNrPVwic2xpZGUoLTEpXCIgY2xhc3M9XCJnby1yaWdodCBpY29uLXJpZ2h0LW9wZW4tYmlnXCI+PC9zZWN0aW9uPlxyXG5cdFx0PHNlY3Rpb24gdi1pZj1cInNsaWRlcy5sZW5ndGggPiAxXCIgQGNsaWNrPVwic2xpZGUoMSlcIiBjbGFzcz1cImdvLWxlZnQgaWNvbi1sZWZ0LW9wZW4tYmlnXCI+PC9zZWN0aW9uPlxyXG5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlci1jb250YWluZXJcIiB2LWlmPVwic2xpZGVzLmxlbmd0aFwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlclwiIDpzdHlsZT1cInsnbGVmdCc6bGVmdCsncHgnfVwiPlxyXG5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlXCIgdi1mb3I9XCIoc2xpZGUsaSkgaW4gc2xpZGVzXCIgOnN0eWxlPVwieydsZWZ0JzppKnNsaWRlV2lkdGgrJ3B4JywgJ3dpZHRoJzpzbGlkZVdpZHRoKydweCd9XCI+XHJcblxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIiA6Y2xhc3M9XCJ7J2Z1bGwtaGVpZ2h0Jzpub0luZm99XCI+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJiZ1wiIDpzdHlsZT1cImBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3NsaWRlLmltZ30pO2BcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImltYWdlXCIgOnN0eWxlPVwiYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7c2xpZGUuaW1nfSk7YFwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5mb1wiIHYtaWY9XCIhbm9JbmZvXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3tzbGlkZS5uYW1lfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e3NsaWRlLmRlc2NyaXB0aW9ufX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIHRleHQ9XCJWaWV3IEFwcFwiIDpibHVlPVwiMVwiIEBjbGljay5uYXRpdmU9XCJnb1RvQXBwKHNsaWRlKVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNsaWRlci1jb250YWluZXJcIiB2LWVsc2U+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwic2xpZGVyIGR1bW15XCI+XHJcblxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwic2xpZGVcIiA6c3R5bGU9XCJ7J2xlZnQnOjAsICd3aWR0aCc6c2xpZGVXaWR0aCsncHgnfVwiPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJiZ1wiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiaW1hZ2VcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCI+PC9pPlxyXG5cdFx0XHRcdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImluZm9cIj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cIm5hbWUgYW5pbWF0ZWQtZ3JhZGllbnRcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZGVzY3JpcHRpb24gYW5pbWF0ZWQtZ3JhZGllbnRcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8QnV0dG9uIDpibHVlPVwiMVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGV9IGZyb20gJ3Z1ZXgnO1xyXG5cclxuXHRsZXQgaW50ZXJ2YWw7XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydzbGlkZXMnLCAnbm9JbmZvJ10sXHJcblx0XHRkYXRhKCl7cmV0dXJuIHtcclxuXHRcdFx0bGVmdDowLFxyXG5cdFx0XHRzbGlkZVdpZHRoOjAsXHJcblx0XHR9fSxcclxuXHRcdG1vdW50ZWQoKXtcclxuXHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0SW50ZXJ2YWwoKTtcclxuXHRcdFx0XHR0aGlzLmNhbGNCYXNlV2lkdGgoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjQmFzZVdpZHRoKTtcclxuXHRcdFx0fSlcclxuXHRcdH0sXHJcblx0XHRkZXN0cm95ZWQoKXtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbClcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY0Jhc2VXaWR0aCk7XHJcblx0XHR9LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NpZGViYXJMb2NrZWQnXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRtYXhMZWZ0KCl7XHJcblx0XHRcdFx0cmV0dXJuIC0oKHRoaXMuc2xpZGVzLmxlbmd0aC0xKSAqIHRoaXMuc2xpZGVXaWR0aCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNsaWRlSW5kZXgoKXtcclxuXHRcdFx0XHRyZXR1cm4gTWF0aC5hYnModGhpcy5sZWZ0KSAvIHRoaXMuc2xpZGVXaWR0aFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6e1xyXG5cdFx0XHRjYWxjQmFzZVdpZHRoKCl7XHJcblx0XHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRoaXMuJHJlZnMuYmFzZSkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZVdpZHRoID0gdGhpcy4kcmVmcy5iYXNlLmNsaWVudFdpZHRoO1xyXG5cdFx0XHRcdFx0dGhpcy5sZWZ0ID0gMDtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzbGlkZShkZWx0YSl7XHJcblx0XHRcdFx0aWYoZGVsdGEgPiAwKSB0aGlzLmxlZnQgKz0gdGhpcy5zbGlkZVdpZHRoO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy5sZWZ0IC09IHRoaXMuc2xpZGVXaWR0aDtcclxuXHRcdFx0XHRpZih0aGlzLmxlZnQgPCB0aGlzLm1heExlZnQpIHRoaXMubGVmdCA9IDA7XHJcblx0XHRcdFx0aWYodGhpcy5sZWZ0ID4gMCkgdGhpcy5sZWZ0ID0gdGhpcy5tYXhMZWZ0O1xyXG5cdFx0XHRcdHRoaXMuc2V0SW50ZXJ2YWwoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0SW50ZXJ2YWwoKXtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGUoLTEpO1xyXG5cdFx0XHRcdH0sIDEwMDAwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z29Ub0FwcChzbGlkZSl7XHJcblx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6dGhpcy5Sb3V0ZU5hbWVzLkFQUCwgcGFyYW1zOnthcHBsaW5rOnNsaWRlLmFwcGxpbmt9fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR3YXRjaDp7XHJcblx0XHRcdFsnd2luZG93J10oKXtcclxuXHRcdFx0XHR0aGlzLmNhbGNCYXNlV2lkdGgoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0WydzaWRlYmFyTG9ja2VkJ10oKXtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuY2FsY0Jhc2VXaWR0aCgpO1xyXG5cdFx0XHRcdH0sIDIwMCAvKiBNYXRjaGVzIHRyYW5zaXRpb24gdGltZSBvZiBzaWRlYmFyICovKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5jYXJvdXNlbCB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRoZWlnaHQ6MzAwcHg7XHJcblx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0bWFyZ2luOjAgYXV0bztcclxuXHRcdG1hcmdpbi10b3A6MXB4O1xyXG5cdFx0bWF4LXdpZHRoOjkwMHB4O1xyXG5cclxuXHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC10YWJsZXQpIHtcclxuXHRcdFx0aGVpZ2h0OjQ0MHB4O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5nby1yaWdodCwgLmdvLWxlZnQge1xyXG5cdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0Y29sb3I6d2hpdGU7XHJcblx0XHRcdGZvbnQtc2l6ZTogMjBweDtcclxuXHRcdFx0YmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEyKTtcclxuXHRcdFx0d2lkdGg6NDRweDtcclxuXHRcdFx0aGVpZ2h0OjQ0cHg7XHJcblx0XHRcdGxpbmUtaGVpZ2h0OjQ0cHg7XHJcblx0XHRcdHRleHQtYWxpZ246Y2VudGVyO1xyXG5cdFx0XHR6LWluZGV4OjM7XHJcblx0XHRcdHRyYW5zaXRpb246YWxsIDAuMTJzIGVhc2UtaW4tb3V0O1xyXG5cclxuXHRcdFx0Jjpob3ZlciB7XHJcblx0XHRcdFx0d2lkdGg6NDBweDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDEpO1xyXG5cdFx0XHRcdGNvbG9yOiRibHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LmdvLWxlZnQge1xyXG5cdFx0XHRsZWZ0OjBweDtcclxuXHRcdFx0dG9wOjYwJTtcclxuXHRcdFx0bWFyZ2luLXRvcDotNTRweDtcclxuXHRcdFx0Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDNweDtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcclxuXHRcdH1cclxuXHJcblx0XHQuZ28tcmlnaHQge1xyXG5cdFx0XHRyaWdodDowcHg7XHJcblx0XHRcdHRvcDo2MCU7XHJcblx0XHRcdG1hcmdpbi10b3A6LTU0cHg7XHJcblx0XHRcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5zbGlkZXItY29udGFpbmVyIHtcclxuXHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRvdmVyZmxvdzpoaWRkZW47XHJcblx0XHRcdGhlaWdodDozMDBweDtcclxuXHRcdFx0d2lkdGg6MTAwJTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czokcmFkaXVzLWJpZztcclxuXHJcblx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC10YWJsZXQpIHtcclxuXHRcdFx0XHRoZWlnaHQ6NDQwcHg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQuc2xpZGVyIHtcclxuXHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHR0b3A6MDtcclxuXHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdGxlZnQ6MDtcclxuXHRcdFx0cmlnaHQ6MDtcclxuXHJcblx0XHRcdHRyYW5zaXRpb246IGFsbCAwLjZzIGVhc2U7XHJcblx0XHRcdHRyYW5zaXRpb24tcHJvcGVydHk6IGxlZnQ7XHJcblxyXG5cdFx0XHQuc2xpZGUge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRoZWlnaHQ6MTAwJTtcclxuXHJcblx0XHRcdFx0LmltYWdlLWNvbnRhaW5lciB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRcdGJvdHRvbTo4MHB4O1xyXG5cdFx0XHRcdFx0bGVmdDowO1xyXG5cdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdHotaW5kZXg6MTtcclxuXHRcdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kOiRibGFjaztcclxuXHJcblx0XHRcdFx0XHQmLmZ1bGwtaGVpZ2h0IHtcclxuXHRcdFx0XHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmJnIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdFx0XHR0b3A6LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRib3R0b206LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRsZWZ0Oi05MDBweDtcclxuXHRcdFx0XHRcdFx0cmlnaHQ6LTkwMHB4O1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXNpemU6IDIwMHB4O1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdHotaW5kZXg6MTtcclxuXHRcdFx0XHRcdFx0dHJhbnNmb3JtOnJvdGF0ZVooMjBkZWcpIHNjYWxlKDEuMik7XHJcblx0XHRcdFx0XHRcdG9wYWNpdHk6MC4xO1xyXG5cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbjogMXMgdHJhbnNmb3JtIGVhc2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmltYWdlIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdFx0XHR0b3A6MDtcclxuXHRcdFx0XHRcdFx0Ym90dG9tOjA7XHJcblx0XHRcdFx0XHRcdGxlZnQ6MDtcclxuXHRcdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBjb250YWluO1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcblx0XHRcdFx0XHRcdG1hcmdpbjoyMHB4O1xyXG5cdFx0XHRcdFx0XHR6LWluZGV4OjE7XHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb246IDFzIHRyYW5zZm9ybSBlYXNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCYuZnVsbCB7XHJcblx0XHRcdFx0XHRcdC5iZyB7XHJcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTpub25lO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQuaW1hZ2Uge1xyXG5cdFx0XHRcdFx0XHRcdG1hcmdpbjowO1xyXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5pbmZvIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRcdGJvdHRvbTowO1xyXG5cdFx0XHRcdFx0bGVmdDowO1xyXG5cdFx0XHRcdFx0cmlnaHQ6MDtcclxuXHRcdFx0XHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdFx0XHRcdHBhZGRpbmc6MjBweDtcclxuXHRcdFx0XHRcdHotaW5kZXg6MjtcclxuXHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0XHRcdFx0XHRhbGlnbi1jb250ZW50OmNlbnRlcjtcclxuXHRcdFx0XHRcdGJvcmRlci1yYWRpdXM6MDtcclxuXHRcdFx0XHRcdGJhY2tncm91bmQtY29sb3I6JGJsdWU7XHJcblx0XHRcdFx0XHRoZWlnaHQ6IDgwcHg7XHJcblxyXG5cdFx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LXRhYmxldCkge1xyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6MTQwcHg7XHJcblx0XHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQubmFtZSB7XHJcblx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1tZWRpdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcblx0XHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdFx0XHRjb2xvcjp3aGl0ZTtcclxuXHRcdFx0XHRcdFx0d2hpdGUtc3BhY2U6bm93cmFwO1xyXG5cdFx0XHRcdFx0XHRvdmVyZmxvdzpoaWRkZW47XHJcblx0XHRcdFx0XHRcdHRleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LmRlc2NyaXB0aW9uIHtcclxuXHRcdFx0XHRcdFx0Zm9udC1zaXplOiAkbWVkaXVtO1xyXG5cdFx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRcdFx0Y29sb3I6d2hpdGU7XHJcblx0XHRcdFx0XHRcdG9wYWNpdHk6MC42O1xyXG5cdFx0XHRcdFx0XHRmb250LXNpemU6ICRmb250LXNpemUtc21hbGw7XHJcblx0XHRcdFx0XHRcdG1hcmdpbi1ib3R0b206MTBweDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCY6aG92ZXIge1xyXG5cdFx0XHRcdC5zbGlkZSB7XHJcblx0XHRcdFx0XHQuaW1hZ2UtY29udGFpbmVyIHtcclxuXHRcdFx0XHRcdFx0LmJnIHtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2l0aW9uOiA4cyB0cmFuc2Zvcm0gZWFzZTtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2Zvcm06cm90YXRlWig1MGRlZykgc2NhbGUoMC41KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ji5kdW1teSB7XHJcblx0XHRcdFx0LnNsaWRlIHtcclxuXHRcdFx0XHRcdC5pbWFnZS1jb250YWluZXIge1xyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiRsaWdodGVyZ3JleTtcclxuXHJcblxyXG5cclxuXHRcdFx0XHRcdFx0LmltYWdlIHtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdFx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdFx0XHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0XHRcdFx0XHRmb250LXNpemU6IDQ4cHg7XHJcblx0XHRcdFx0XHRcdFx0Y29sb3I6JGxpZ2h0Z3JleTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC5pbmZvIHtcclxuXHRcdFx0XHRcdFx0Lm5hbWUge1xyXG5cdFx0XHRcdFx0XHRcdHBhZGRpbmc6NXB4IDUwcHg7XHJcblx0XHRcdFx0XHRcdFx0bWFyZ2luLWJvdHRvbTogMnB4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC5kZXNjcmlwdGlvbiB7XHJcblx0XHRcdFx0XHRcdFx0cGFkZGluZzoxMHB4IDE1MHB4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzOThmZmY4JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzOThmZmY4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDM5OGZmZjhcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jYXJvdXNlbFtkYXRhLXYtNDM5OGZmZjhde3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDozMDBweDt3aWR0aDoxMDAlO21hcmdpbjowIGF1dG87bWFyZ2luLXRvcDoxcHg7bWF4LXdpZHRoOjkwMHB4fUBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCl7LmNhcm91c2VsW2RhdGEtdi00Mzk4ZmZmOF17aGVpZ2h0OjQ0MHB4fX0uY2Fyb3VzZWwgLmdvLXJpZ2h0W2RhdGEtdi00Mzk4ZmZmOF0sLmNhcm91c2VsIC5nby1sZWZ0W2RhdGEtdi00Mzk4ZmZmOF17Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7Y29sb3I6d2hpdGU7Zm9udC1zaXplOjIwcHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMTIpO3dpZHRoOjQ0cHg7aGVpZ2h0OjQ0cHg7bGluZS1oZWlnaHQ6NDRweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4OjM7dHJhbnNpdGlvbjphbGwgMC4xMnMgZWFzZS1pbi1vdXR9LmNhcm91c2VsIC5nby1yaWdodFtkYXRhLXYtNDM5OGZmZjhdOmhvdmVyLC5jYXJvdXNlbCAuZ28tbGVmdFtkYXRhLXYtNDM5OGZmZjhdOmhvdmVye3dpZHRoOjQwcHg7YmFja2dyb3VuZDojZmZmO2NvbG9yOiMwNzk5ZmZ9LmNhcm91c2VsIC5nby1sZWZ0W2RhdGEtdi00Mzk4ZmZmOF17bGVmdDowcHg7dG9wOjYwJTttYXJnaW4tdG9wOi01NHB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjNweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czozcHh9LmNhcm91c2VsIC5nby1yaWdodFtkYXRhLXYtNDM5OGZmZjhde3JpZ2h0OjBweDt0b3A6NjAlO21hcmdpbi10b3A6LTU0cHg7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czozcHg7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czozcHh9LmNhcm91c2VsIC5zbGlkZXItY29udGFpbmVyW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDozMDBweDt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MH1AbWVkaWEgKG1heC13aWR0aDogOTIwcHgpey5jYXJvdXNlbCAuc2xpZGVyLWNvbnRhaW5lcltkYXRhLXYtNDM5OGZmZjhde2hlaWdodDo0NDBweH19LmNhcm91c2VsIC5zbGlkZXJbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt0cmFuc2l0aW9uOmFsbCAwLjZzIGVhc2U7dHJhbnNpdGlvbi1wcm9wZXJ0eTpsZWZ0fS5jYXJvdXNlbCAuc2xpZGVyIC5zbGlkZVtkYXRhLXYtNDM5OGZmZjhde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDoxMDAlfS5jYXJvdXNlbCAuc2xpZGVyIC5zbGlkZSAuaW1hZ2UtY29udGFpbmVyW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjgwcHg7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxO292ZXJmbG93OmhpZGRlbjtiYWNrZ3JvdW5kOiMzMzN9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbC1oZWlnaHRbZGF0YS12LTQzOThmZmY4XXtib3R0b206MH0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmltYWdlLWNvbnRhaW5lciAuYmdbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTkwMHB4O2JvdHRvbTotOTAwcHg7bGVmdDotOTAwcHg7cmlnaHQ6LTkwMHB4O2JhY2tncm91bmQtc2l6ZToyMDBweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjt6LWluZGV4OjE7dHJhbnNmb3JtOnJvdGF0ZVooMjBkZWcpIHNjYWxlKDEuMik7b3BhY2l0eTowLjE7dHJhbnNpdGlvbjoxcyB0cmFuc2Zvcm0gZWFzZX0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmltYWdlLWNvbnRhaW5lciAuaW1hZ2VbZGF0YS12LTQzOThmZmY4XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7bWFyZ2luOjIwcHg7ei1pbmRleDoxO3RyYW5zaXRpb246MXMgdHJhbnNmb3JtIGVhc2V9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbCAuYmdbZGF0YS12LTQzOThmZmY4XXtkaXNwbGF5Om5vbmV9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbWFnZS1jb250YWluZXIuZnVsbCAuaW1hZ2VbZGF0YS12LTQzOThmZmY4XXttYXJnaW46MDtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbmZvW2RhdGEtdi00Mzk4ZmZmOF17cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ZGlzcGxheTpmbGV4O3BhZGRpbmc6MjBweDt6LWluZGV4OjI7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWNvbnRlbnQ6Y2VudGVyO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLWNvbG9yOiMwNzk5ZmY7aGVpZ2h0OjgwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KXsuY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmluZm9bZGF0YS12LTQzOThmZmY4XXtoZWlnaHQ6MTQwcHg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufX0uY2Fyb3VzZWwgLnNsaWRlciAuc2xpZGUgLmluZm8gLm5hbWVbZGF0YS12LTQzOThmZmY4XXtmb250LXNpemU6MTZweDtmb250LWZhbWlseTonUG9wcGlucycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjp3aGl0ZTt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmNhcm91c2VsIC5zbGlkZXIgLnNsaWRlIC5pbmZvIC5kZXNjcmlwdGlvbltkYXRhLXYtNDM5OGZmZjhde2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6d2hpdGU7b3BhY2l0eTowLjY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbToxMHB4fS5jYXJvdXNlbCAuc2xpZGVyOmhvdmVyIC5zbGlkZSAuaW1hZ2UtY29udGFpbmVyIC5iZ1tkYXRhLXYtNDM5OGZmZjhde3RyYW5zaXRpb246OHMgdHJhbnNmb3JtIGVhc2U7dHJhbnNmb3JtOnJvdGF0ZVooNTBkZWcpIHNjYWxlKDAuNSl9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbWFnZS1jb250YWluZXJbZGF0YS12LTQzOThmZmY4XXtiYWNrZ3JvdW5kLWNvbG9yOiNmM2Y2Zjd9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbWFnZS1jb250YWluZXIgLmltYWdlW2RhdGEtdi00Mzk4ZmZmOF17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZvbnQtc2l6ZTo0OHB4O2NvbG9yOiNkZmUwZTF9LmNhcm91c2VsIC5zbGlkZXIuZHVtbXkgLnNsaWRlIC5pbmZvIC5uYW1lW2RhdGEtdi00Mzk4ZmZmOF17cGFkZGluZzo1cHggNTBweDttYXJnaW4tYm90dG9tOjJweH0uY2Fyb3VzZWwgLnNsaWRlci5kdW1teSAuc2xpZGUgLmluZm8gLmRlc2NyaXB0aW9uW2RhdGEtdi00Mzk4ZmZmOF17cGFkZGluZzoxMHB4IDE1MHB4fVxcblwiLCBcIlwiXSk7XG4iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1mOWI4NGU3OCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcImJiYmFjZGQ2XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hcHBzW2RhdGEtdi00Zjc4MjFiNl17cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCV9LmFwcHMgLnNlYXJjaC1pY29uW2RhdGEtdi00Zjc4MjFiNl17bWFyZ2luOjIwcHggMjBweCAwO2NvbG9yOiMwNzk5ZmY7Zm9udC1zaXplOjIycHg7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLXJhZGl1czowO3Bvc2l0aW9uOnJlbGF0aXZlfS5hcHBzIC5zZWFyY2gtaWNvbiAuaWNvbi1zZWFyY2hbZGF0YS12LTRmNzgyMWI2XXtyaWdodDoxMHB4O3RvcDoxNnB4O3Bvc2l0aW9uOmFic29sdXRlfS5hcHBzIC5zZWFyY2gtaWNvbiBpbnB1dFtkYXRhLXYtNGY3ODIxYjZde2ZvbnQtc2l6ZToxNHB4O3dpZHRoOjEwMCU7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXMgZWFzZX0uYXBwcyAuc2VhcmNoLWljb246aG92ZXIgaW5wdXRbZGF0YS12LTRmNzgyMWI2XSwuYXBwcyAuc2VhcmNoLWljb24udmlzaWJsZSBpbnB1dFtkYXRhLXYtNGY3ODIxYjZdLC5hcHBzIC5zZWFyY2gtaWNvbjphY3RpdmUgaW5wdXRbZGF0YS12LTRmNzgyMWI2XSwuYXBwcyAuc2VhcmNoLWljb246Zm9jdXMgaW5wdXRbZGF0YS12LTRmNzgyMWI2XXtib3JkZXItY29sb3I6IzA3OTlmZn0uYXBwcyAuc2Nyb2xsZXJbZGF0YS12LTRmNzgyMWI2XXtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6Y2FsYygxMDB2aCAtIDI4OHB4KTttYXJnaW4tdG9wOjEwcHg7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTphdXRvfS5hcHBzIC5zY3JvbGxlci53aXRoLXNlYXJjaFtkYXRhLXYtNGY3ODIxYjZde2hlaWdodDpjYWxjKDEwMHZoIC0gMjkwcHgpfS5hcHBzIC5zY3JvbGxlciAucGFkZGVyW2RhdGEtdi00Zjc4MjFiNl17cGFkZGluZzoyMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6Mn0uYXBwcyAuc2Nyb2xsZXIgLmZlYXR1cmVkW2RhdGEtdi00Zjc4MjFiNl17b3ZlcmZsb3c6dmlzaWJsZTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtd3JhcDp3cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hcHBzIC5zY3JvbGxlciAuZmVhdHVyZWQgLmZlYXR1cmVkLWFwcFtkYXRhLXYtNGY3ODIxYjZde292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjAgMCAwIDA7d2lkdGg6Y2FsYygzMy4zMzMzJSAtIDEwcHgpO3BhZGRpbmctYm90dG9tOjE1JTtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW4tYm90dG9tOjIwcHg7Y3Vyc29yOnBvaW50ZXJ9QG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KXsuYXBwcyAuc2Nyb2xsZXIgLmZlYXR1cmVkIC5mZWF0dXJlZC1hcHBbZGF0YS12LTRmNzgyMWI2XXt3aWR0aDpjYWxjKDUwJSAtIDEwcHgpO3BhZGRpbmctYm90dG9tOjI1JX19QG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KXsuYXBwcyAuc2Nyb2xsZXIgLmZlYXR1cmVkIC5mZWF0dXJlZC1hcHBbZGF0YS12LTRmNzgyMWI2XXt3aWR0aDoxMDAlO3BhZGRpbmctYm90dG9tOjUwJX19LmFwcHMgLnNjcm9sbGVyIC5mZWF0dXJlZCAuZmVhdHVyZWQtYXBwIGltZ1tkYXRhLXYtNGY3ODIxYjZde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmFwcHMgLnNjcm9sbGVyIC5mZWF0dXJlZCAuZmVhdHVyZWQtYXBwIC50YWdbZGF0YS12LTRmNzgyMWI2XXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO2JhY2tncm91bmQ6d2hpdGU7cGFkZGluZzo0cHg7Zm9udC1zaXplOjlweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojMzMzfS5hcHBzIC5zY3JvbGxlciAuY2F0ZWdvcmllc1tkYXRhLXYtNGY3ODIxYjZde21hcmdpbi10b3A6NDBweH1AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpey5hcHBzIC5zY3JvbGxlciAuY2F0ZWdvcmllc1tkYXRhLXYtNGY3ODIxYjZde21hcmdpbi10b3A6MjBweH19LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeVtkYXRhLXYtNGY3ODIxYjZde21hcmdpbjowIC0yMHB4IDQwcHg7cGFkZGluZzo0MHB4fUBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCl7LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeVtkYXRhLXYtNGY3ODIxYjZde21hcmdpbjowIC0yMHB4IDIwcHg7cGFkZGluZzoyMHB4fX0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5W2RhdGEtdi00Zjc4MjFiNl06bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6I2YzZjZmN30uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5IC5pbmZvW2RhdGEtdi00Zjc4MjFiNl17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7bWFyZ2luLWJvdHRvbToxNXB4fS5hcHBzIC5zY3JvbGxlciAuY2F0ZWdvcmllcyAuY2F0ZWdvcnkgLmluZm8gLm5hbWVbZGF0YS12LTRmNzgyMWI2XXtmb250LXNpemU6MTZweDtmb250LWZhbWlseTonUG9wcGlucycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6Ym9sZH0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5IC5pbmZvIC52aWV3LWFsbFtkYXRhLXYtNGY3ODIxYjZde2NvbG9yOiMwNzk5ZmY7Y3Vyc29yOnBvaW50ZXJ9LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeSAuYXBwc1tkYXRhLXYtNGY3ODIxYjZde3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdy15OmF1dG87cGFkZGluZy1ib3R0b206MjBweH0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5IC5hcHBzW2RhdGEtdi00Zjc4MjFiNl06YWZ0ZXJ7Y29udGVudDpcXFwiXFxcIjtmbGV4OmF1dG99LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeSAuYXBwcyAuYXBwW2RhdGEtdi00Zjc4MjFiNl17ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6Y2FsYygyMCUgLSAxMHB4KTttYXgtd2lkdGg6MTAwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KXsuYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5IC5hcHBzIC5hcHBbZGF0YS12LTRmNzgyMWI2XXt3aWR0aDpjYWxjKDUwJSAtIDVweCk7bWF4LXdpZHRoOjgwcHh9fS5hcHBzIC5zY3JvbGxlciAuY2F0ZWdvcmllcyAuY2F0ZWdvcnkgLmFwcHMgLmFwcCAuaW1hZ2VbZGF0YS12LTRmNzgyMWI2XXtib3JkZXItcmFkaXVzOjA7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlfS5hcHBzIC5zY3JvbGxlciAuY2F0ZWdvcmllcyAuY2F0ZWdvcnkgLmFwcHMgLmFwcCAuaW1hZ2VbZGF0YS12LTRmNzgyMWI2XTphZnRlcntjb250ZW50OlxcXCJcXFwiO2Rpc3BsYXk6YmxvY2s7cGFkZGluZy1ib3R0b206MTAwJX0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5IC5hcHBzIC5hcHAgLmltYWdlIGltZ1tkYXRhLXYtNGY3ODIxYjZde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeSAuYXBwcyAuYXBwIC5uYW1lW2RhdGEtdi00Zjc4MjFiNl17bWFyZ2luLXRvcDoxMHB4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGR9LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeTpub3QoLnNpbmd1bGFyKSAuYXBwcyAuYXBwW2RhdGEtdi00Zjc4MjFiNl17bWFyZ2luLXJpZ2h0OjIwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KXsuYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5Om5vdCguc2luZ3VsYXIpIC5hcHBzIC5hcHBbZGF0YS12LTRmNzgyMWI2XXttYXJnaW4tcmlnaHQ6MTBweH19LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeTpub3QoLnNpbmd1bGFyKSAuYXBwcyAuYXBwW2RhdGEtdi00Zjc4MjFiNl06bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MH0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5LnNpbmd1bGFyIC5hcHBzW2RhdGEtdi00Zjc4MjFiNl17d2hpdGUtc3BhY2U6bm9ybWFsO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYXBwcyAuc2Nyb2xsZXIgLmNhdGVnb3JpZXMgLmNhdGVnb3J5LnNpbmd1bGFyIC5hcHBzIC5hcHBbZGF0YS12LTRmNzgyMWI2XXttYXJnaW4tYm90dG9tOjUwcHh9LmFwcHMgLnNjcm9sbGVyIC5jYXRlZ29yaWVzIC5jYXRlZ29yeS5zaW5ndWxhciAuYXBwcyAuYXBwW2RhdGEtdi00Zjc4MjFiNl06bGFzdC1jaGlsZHttYXJnaW4tbGVmdDoyMHB4fS5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHNbZGF0YS12LTRmNzgyMWI2XXtwYWRkaW5nOjQwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KXsuYXBwcyAuc2Nyb2xsZXIgLmxpbmtlZC1hcHBzW2RhdGEtdi00Zjc4MjFiNl17cGFkZGluZzoyMHB4fX0uYXBwcyAuc2Nyb2xsZXIgLmxpbmtlZC1hcHBzIC5hcHBbZGF0YS12LTRmNzgyMWI2XXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MjBweH1AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpey5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcFtkYXRhLXYtNGY3ODIxYjZde3BhZGRpbmc6MjBweDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59fS5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcCAuaW1hZ2VbZGF0YS12LTRmNzgyMWI2XXtmbGV4OjAgMCBhdXRvO2hlaWdodDo5MHB4O3dpZHRoOjkwcHg7Ym9yZGVyLXJhZGl1czowO292ZXJmbG93OmhpZGRlbjtjdXJzb3I6cG9pbnRlcn0uYXBwcyAuc2Nyb2xsZXIgLmxpbmtlZC1hcHBzIC5hcHAgLmltYWdlLm5vLWltYWdlW2RhdGEtdi00Zjc4MjFiNl17YmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDIpfS5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcCAuaW1hZ2UgaW1nW2RhdGEtdi00Zjc4MjFiNl0sLmFwcHMgLnNjcm9sbGVyIC5saW5rZWQtYXBwcyAuYXBwIC5pbWFnZSAuZHVtbXktaW1hZ2VbZGF0YS12LTRmNzgyMWI2XXtoZWlnaHQ6OTBweDt3aWR0aDo5MHB4fS5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcCAuaW1hZ2UgLmR1bW15LWltYWdlW2RhdGEtdi00Zjc4MjFiNl17YmFja2dyb3VuZDojZjNmNmY3fS5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcCAuaW5mb1tkYXRhLXYtNGY3ODIxYjZde2ZsZXg6MTtwYWRkaW5nOjAgMjBweDtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTNweDtmb250LWZhbWlseTonUG9wcGlucycsIHNhbnMtc2VyaWZ9LmFwcHMgLnNjcm9sbGVyIC5saW5rZWQtYXBwcyAuYXBwIC5pbmZvIC5uYW1lW2RhdGEtdi00Zjc4MjFiNl17Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjpibGFjaztmb250LXNpemU6MTNweH0uYXBwcyAuc2Nyb2xsZXIgLmxpbmtlZC1hcHBzIC5hcHAgLmluZm8gLmNhdGVnb3J5W2RhdGEtdi00Zjc4MjFiNl17Zm9udC1zaXplOjEycHg7b3BhY2l0eTowLjY7Y29sb3I6YmxhY2t9LmFwcHMgLnNjcm9sbGVyIC5saW5rZWQtYXBwcyAuYXBwIC5hY3Rpb25zW2RhdGEtdi00Zjc4MjFiNl17ZmxleDowIDAgYXV0b31AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpey5hcHBzIC5zY3JvbGxlciAubGlua2VkLWFwcHMgLmFwcCAuYWN0aW9uc1tkYXRhLXYtNGY3ODIxYjZde21hcmdpbjoxMHB4IC0xMHB4IDAgMH19LmFwcHMgLnNjcm9sbGVyIC5saW5rZWQtYXBwcyAuYXBwIC5hY3Rpb25zIGJ1dHRvbitidXR0b25bZGF0YS12LTRmNzgyMWI2XXttYXJnaW4tbGVmdDoxMHB4fVxcblwiLCBcIlwiXSk7XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTRmNzgyMWI2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NGY3ODIxYjYmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhcm91c2VsLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzOThmZmY4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDM5OGZmZjgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWY5Yjg0ZTc4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWY5Yjg0ZTc4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2Fyb3VzZWwudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDM5OGZmZjgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCIyYmY1MWFiY1wiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTRmNzgyMWI2JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcImI0ZWExOWE2XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiXSwic291cmNlUm9vdCI6IiJ9