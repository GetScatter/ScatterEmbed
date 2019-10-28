(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

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

/***/ "65kt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/Card.vue?vue&type=template&id=3202b564&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"card",on:{"click":function($event){return _vm.$emit('clicked', _vm.card)}}},[_c('section',{staticClass:"head"},[_c('CreditCardIcon',{staticClass:"symbol"})],1),_vm._v(" "),(!_vm.asSelector)?_c('Button',{staticClass:"delete",attrs:{"icon":"icon-trash"}}):_vm._e(),_vm._v(" "),(_vm.asSelector)?_c('Button',{staticClass:"delete",attrs:{"icon":"fas fa-caret-square-down"}}):_vm._e(),_vm._v(" "),_c('section',{staticClass:"info"},[_c('figure',{staticClass:"card-name"},[_vm._v(_vm._s(_vm.card.name))]),_vm._v(" "),_c('figure',{staticClass:"card-number"},[_vm._l(([1,1,1]),function(i){return _c('span',[_vm._v("XXXX")])}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.card.lastFour))])],2),_vm._v(" "),_c('section',{staticClass:"expiration"},[_vm._m(0),_vm._v(" "),_c('figure',{staticClass:"date"},[_vm._v(_vm._s(_vm.card.expiration))])]),_vm._v(" "),_c('section',{staticClass:"identity"},[_c('figure',{staticClass:"full-name"},[_vm._v(_vm._s(_vm.card.identity().fullname()))])])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"valid-until"},[_vm._v("VALID"),_c('br'),_vm._v("UNTIL")])}]


// CONCATENATED MODULE: ./src/components/misc/Card.vue?vue&type=template&id=3202b564&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/svgs/CreditCard.vue + 2 modules
var CreditCard = __webpack_require__("HluJ");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/Card.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Cardvue_type_script_lang_js_ = ({
	props:['card', 'asSelector'],
	components:{CreditCardIcon: CreditCard["a" /* default */]},
	computed:{
		...Object(vuex_esm["c" /* mapGetters */])([

		]),
	},
	methods:{

	}
});

// CONCATENATED MODULE: ./src/components/misc/Card.vue?vue&type=script&lang=js&
 /* harmony default export */ var misc_Cardvue_type_script_lang_js_ = (Cardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/misc/Card.vue?vue&type=style&index=0&id=3202b564&scoped=true&lang=scss&
var Cardvue_type_style_index_0_id_3202b564_scoped_true_lang_scss_ = __webpack_require__("6gQG");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/misc/Card.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  misc_Cardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3202b564",
  null
  
)

/* harmony default export */ var Card = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "6gQG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Card_vue_vue_type_style_index_0_id_3202b564_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("T27a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Card_vue_vue_type_style_index_0_id_3202b564_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Card_vue_vue_type_style_index_0_id_3202b564_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Card_vue_vue_type_style_index_0_id_3202b564_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "H1Sx":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".wallet[data-v-c1a9fb7c]{position:relative;height:calc(100vh - 220px);padding-bottom:50px}.wallet .scroller .keys-and-accounts-list[data-v-c1a9fb7c]{height:calc(100vh - 200px);overflow:hidden}.wallet.no-panels[data-v-c1a9fb7c]{height:calc(100vh - 140px)}.wallet.no-panels .scroller .keys-and-accounts-list[data-v-c1a9fb7c]{height:calc(100vh - 180px)}.wallet.no-accounts[data-v-c1a9fb7c]{height:calc(100vh - 70px)}.wallet.no-accounts .scroller .keys-and-accounts-list[data-v-c1a9fb7c]{height:calc(100vh - 120px)}.wallet .no-keypairs[data-v-c1a9fb7c]{height:100%;overflow-y:auto;padding:30px;background:#f7fafb;padding-bottom:60px;display:flex;justify-content:center;align-items:center;flex-direction:column}.wallet .no-keypairs .container[data-v-c1a9fb7c]{max-width:400px;margin:0 auto;text-align:center}.wallet .no-keypairs .title[data-v-c1a9fb7c]{font-size:24px}.wallet .no-keypairs .description[data-v-c1a9fb7c]{margin-top:10px;font-size:12px}.wallet .no-keypairs .ctas[data-v-c1a9fb7c]{margin-top:20px}.wallet .wallet-actions[data-v-c1a9fb7c]{position:absolute;bottom:0;left:0;right:0;border-top:1px solid #dfe0e1;background:white;display:flex;align-items:center;padding:10px 20px}@media (max-width: 600px){.wallet .wallet-actions[data-v-c1a9fb7c]{flex-direction:column;height:auto;padding:10px}}.wallet .wallet-actions .left[data-v-c1a9fb7c]{flex:1}@media (max-width: 600px){.wallet .wallet-actions .left[data-v-c1a9fb7c]{width:100%;text-align:left}}.wallet .wallet-actions .right[data-v-c1a9fb7c]{display:flex;flex-direction:row;text-align:right;justify-content:end}.wallet .wallet-actions .right button+button[data-v-c1a9fb7c]{margin-left:6px}@media (max-width: 600px){.wallet .wallet-actions .right[data-v-c1a9fb7c]{width:100%;margin-top:10px}.wallet .wallet-actions .right button[data-v-c1a9fb7c]{width:50%}}.wallet .wallet-actions .info .keys[data-v-c1a9fb7c]{font-size:16px;font-family:'Poppins', sans-serif;font-weight:bold}.wallet .wallet-actions .info .accounts[data-v-c1a9fb7c]{font-size:13px}\n", ""]);


/***/ }),

/***/ "JnGr":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".card[data-v-3202b564]{position:relative;cursor:pointer;width:calc(50% - 10px);box-shadow:0 1px 3px rgba(7,155,232,0.23);border:1px solid rgba(0,0,0,0.05);padding:15px;margin-bottom:20px;height:200px;background:#fff;transition:all 0.2s ease;transition-property:box-shadow;display:flex;flex-direction:column;justify-content:space-between}@media (min-width: 1200px){.card[data-v-3202b564]{width:calc(25% - 10px)}}.card .head[data-v-3202b564]{flex:1}.card .head .symbol[data-v-3202b564]{margin-top:-5px;height:30px}.card .info[data-v-3202b564]{display:flex;flex-direction:column;justify-content:center}.card .info .card-name[data-v-3202b564]{margin-top:5px;font-size:18px;font-weight:bold}.card .info .card-name.small[data-v-3202b564]{font-size:12px}.card .info .card-number[data-v-3202b564]{margin-top:2px;font-weight:bold;font-size:12px}.card .info .card-number span[data-v-3202b564]{padding:0 5px}.card .info .card-number span[data-v-3202b564]:first-child{padding-left:0}.card .info .card-number span[data-v-3202b564]:not(:last-child){color:#c8c8c8}.card .info .expiration[data-v-3202b564]{display:flex;margin-top:10px}.card .info .expiration .valid-until[data-v-3202b564]{font-size:9px;font-weight:bold}.card .info .expiration .date[data-v-3202b564]{font-weight:bold;font-size:14px;padding-left:10px}.card .info .identity[data-v-3202b564]{margin-top:25px}.card .info .identity .id-name[data-v-3202b564]{font-size:9px;font-weight:bold}.card .info .identity .full-name[data-v-3202b564]{margin-top:3px;font-size:10px;font-weight:bold}.card .delete[data-v-3202b564]{position:absolute;top:10px;right:10px;text-align:right}.card[data-v-3202b564]:hover{box-shadow:0 8px 18px rgba(7,155,232,0.23)}\n", ""]);


/***/ }),

/***/ "Mazg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CreditCardsList_vue_vue_type_style_index_0_id_0d453a09_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bspf");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CreditCardsList_vue_vue_type_style_index_0_id_0d453a09_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CreditCardsList_vue_vue_type_style_index_0_id_0d453a09_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CreditCardsList_vue_vue_type_style_index_0_id_0d453a09_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "QJE3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("H1Sx");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("0c9d3255", content, true, {});

/***/ }),

/***/ "R3kX":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".cards-list[data-v-0d453a09]{padding:40px 40px 20px 40px;display:flex;flex-wrap:wrap;justify-content:space-between;align-content:flex-start}\n", ""]);


/***/ }),

/***/ "T27a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("JnGr");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("ec379d46", content, true, {});

/***/ }),

/***/ "Tdf5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Wallet.vue?vue&type=template&id=c1a9fb7c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[(_vm.features.creditCards)?_c('PanelTabs',{attrs:{"tabs":_vm.tabs,"state":_vm.state},on:{"selected":function (x) { return _vm.state = x; }}}):_vm._e(),_vm._v(" "),_c('section',{staticClass:"wallet",class:{'no-panels':!_vm.features.creditCards, 'no-accounts':!_vm.accounts.length}},[_c('section',{staticClass:"scroller"},[(_vm.state === _vm.STATES.KEYS && _vm.keypairs.length)?_c('KeysAndAccountList',{on:{"account":_vm.goToAccount}}):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.KEYS && !_vm.keypairs.length)?_c('section',{staticClass:"keys-and-accounts-list"},[_vm._m(0)]):_vm._e(),_vm._v(" "),(_vm.features.creditCards && _vm.state === _vm.STATES.CARDS)?_c('CreditCardsList'):_vm._e()],1),_vm._v(" "),(_vm.state === _vm.STATES.KEYS)?_c('section',{staticClass:"wallet-actions"},[_c('section',{staticClass:"left"},[_c('section',{staticClass:"info"},[_c('figure',{staticClass:"keys"},[_vm._v(_vm._s(_vm.keypairs.length)+" keys")]),_vm._v(" "),_c('figure',{staticClass:"accounts"},[_vm._v(_vm._s(_vm.accounts.length)+" accounts")])])]),_vm._v(" "),_c('section',{staticClass:"right"},[_c('Button',{attrs:{"text":"Generate Key"},nativeOn:{"click":function($event){return _vm.generateKeypair($event)}}}),_vm._v(" "),_c('Button',{attrs:{"blue":"1","text":"Import Key"},nativeOn:{"click":function($event){return _vm.importKeypair($event)}}})],1)]):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.CARDS)?_c('section',{staticClass:"wallet-actions"},[_c('section',{staticClass:"left"},[_c('section',{staticClass:"info"},[_c('figure',{staticClass:"keys"},[_vm._v(_vm._s(_vm.cards.length)+" cards")]),_vm._v(" "),_c('figure',{staticClass:"accounts"},[_vm._v("0 expired")])])]),_vm._v(" "),_c('section',{staticClass:"right"},[_c('Button',{attrs:{"blue":"1","text":"Add Credit Card"},nativeOn:{"click":function($event){return _vm.importKeypair($event)}}})],1)]):_vm._e()])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"no-keypairs"},[_c('section',{staticClass:"container"},[_c('figure',{staticClass:"title"},[_vm._v("You don't have any Keys")]),_vm._v(" "),_c('figure',{staticClass:"description"},[_vm._v("Click one of the buttons below to import a key you already have, or generate a brand new one.")])])])}]


// CONCATENATED MODULE: ./src/views/Wallet.vue?vue&type=template&id=c1a9fb7c&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./src/components/reusable/PanelTabs.vue + 4 modules
var PanelTabs = __webpack_require__("3lbk");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./src/components/misc/KeysAndAccountList.vue + 4 modules
var KeysAndAccountList = __webpack_require__("EfjO");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/CreditCardsList.vue?vue&type=template&id=0d453a09&scoped=true&
var CreditCardsListvue_type_template_id_0d453a09_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"cards-list"},_vm._l((_vm.filteredCards),function(card){return _c('Card',{key:card.id,attrs:{"card":card}})}),1)}
var CreditCardsListvue_type_template_id_0d453a09_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/misc/CreditCardsList.vue?vue&type=template&id=0d453a09&scoped=true&

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/CreditCard.js
var CreditCard = __webpack_require__("zc85");
var CreditCard_default = /*#__PURE__*/__webpack_require__.n(CreditCard);

// EXTERNAL MODULE: ./src/components/svgs/CreditCard.vue + 2 modules
var svgs_CreditCard = __webpack_require__("HluJ");

// EXTERNAL MODULE: ./src/components/misc/Card.vue + 4 modules
var Card = __webpack_require__("65kt");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/CreditCardsList.vue?vue&type=script&lang=js&
//
//
//
//
//
//






/* harmony default export */ var CreditCardsListvue_type_script_lang_js_ = ({
	components:{Card: Card["a" /* default */], CreditCardIcon: svgs_CreditCard["a" /* default */]},
	computed:{
		...Object(vuex_esm["c" /* mapGetters */])([
			'identities'
		]),
		filteredCards(){
			return [
				CreditCard_default.a.fromJson({
					identityId:this.identities[0].id,
					name:'Test Card',
					lastFour:'1234',
					expiration:'04/20',
					cardHash:'asdljkfasjklhdfhaskljdfhjksalhfdjlhasljfhlhaksdflkj',
					secure:{
						number:'1234123412341234',
						cvx:'1234',
						authTokens:{},
					}
				})
			]
		}
	},
	methods:{

	}
});

// CONCATENATED MODULE: ./src/components/misc/CreditCardsList.vue?vue&type=script&lang=js&
 /* harmony default export */ var misc_CreditCardsListvue_type_script_lang_js_ = (CreditCardsListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/misc/CreditCardsList.vue?vue&type=style&index=0&id=0d453a09&scoped=true&lang=scss&
var CreditCardsListvue_type_style_index_0_id_0d453a09_scoped_true_lang_scss_ = __webpack_require__("Mazg");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/misc/CreditCardsList.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  misc_CreditCardsListvue_type_script_lang_js_,
  CreditCardsListvue_type_template_id_0d453a09_scoped_true_render,
  CreditCardsListvue_type_template_id_0d453a09_scoped_true_staticRenderFns,
  false,
  null,
  "0d453a09",
  null
  
)

/* harmony default export */ var CreditCardsList = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Wallet.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		KEYS:'keys',
		CARDS:'cards',
	}
	let saveTimeout;
	/* harmony default export */ var Walletvue_type_script_lang_js_ = ({
		components:{
			CreditCardsList: CreditCardsList,
			KeysAndAccountList: KeysAndAccountList["a" /* default */],
			PanelTabs: PanelTabs["a" /* default */]
		},
		data () {return {
			state:STATES.KEYS,
			STATES,
			tab:null,
			blockchainFilter:null,
			keypairFilter:null,
			terms:'',
			clonedKeypairs:[],
			refreshingAccounts:null,
		}},
		computed:{
			...Object(vuex_esm["d" /* mapState */])([
				'scatter',
			]),
			...Object(vuex_esm["c" /* mapGetters */])([
				'keypairs',
				'networks',
				'cards',
                'accounts',
			]),
			tabs(){
				return [
					{name:'Blockchain Accounts', state:STATES.KEYS},
					{name:'Credit Cards', state:STATES.CARDS},
				]
			},
			accounts(){
				return this.networks.map(x => x.accounts(true)).reduce((acc, accounts) => {
					acc = acc.concat(accounts);
					return acc;
				}, []);
			}
		},
		mounted(){
		},
		methods:{
			generateKeypair(){
				PopupService["a" /* default */].push(Popup["a" /* Popup */].generateKeypair({}, keypair => {
					if(!keypair) return;
					PopupService["a" /* default */].push(Popup["a" /* Popup */].exportPrivateKey(keypair));
				}));
			},
			importKeypair(){
				PopupService["a" /* default */].push(Popup["a" /* Popup */].importKeypair({}, keypair => {}));
			},
			goToAccount(account){
				this.$router.push({name:this.RouteNames.ACCOUNT, params:{unique:account.unique()}});
			},
		},
	});

// CONCATENATED MODULE: ./src/views/Wallet.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Walletvue_type_script_lang_js_ = (Walletvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Wallet.vue?vue&type=style&index=0&id=c1a9fb7c&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Walletvue_type_style_index_0_id_c1a9fb7c_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("evqv");

// CONCATENATED MODULE: ./src/views/Wallet.vue






/* normalize component */

var Wallet_component = Object(componentNormalizer["a" /* default */])(
  views_Walletvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c1a9fb7c",
  null
  
)

/* harmony default export */ var Wallet = __webpack_exports__["default"] = (Wallet_component.exports);

/***/ }),

/***/ "bspf":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("R3kX");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("1a2bdff1", content, true, {});

/***/ }),

/***/ "dVin":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QIy7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelTabs_vue_vue_type_style_index_0_id_f9b84e78_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "evqv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_c1a9fb7c_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QJE3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_c1a9fb7c_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_c1a9fb7c_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_c1a9fb7c_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXVzYWJsZS9QYW5lbFRhYnMudnVlPzIwZjgiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT9lMmMzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT8zN2MxIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21pc2MvQ2FyZC52dWU/ODExYSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvbWlzYy9DYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlPzBhNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlPzIyNTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1dhbGxldC52dWU/NzFlNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlPzI5NDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DcmVkaXRDYXJkc0xpc3QudnVlPzQ2MjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT8wM2M3Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9XYWxsZXQudnVlPzMzYmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DcmVkaXRDYXJkc0xpc3QudnVlPzVjNmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DYXJkLnZ1ZT84ZGFhIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9XYWxsZXQudnVlP2NmMzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DcmVkaXRDYXJkc0xpc3QudnVlP2NmMzYiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL21pc2MvQ3JlZGl0Q2FyZHNMaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NyZWRpdENhcmRzTGlzdC52dWU/OTQ4NCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NyZWRpdENhcmRzTGlzdC52dWUiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9XYWxsZXQudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9XYWxsZXQudnVlP2M1YTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1dhbGxldC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DcmVkaXRDYXJkc0xpc3QudnVlP2IyOGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmV1c2FibGUvUGFuZWxUYWJzLnZ1ZT9hYTg2Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9XYWxsZXQudnVlPzA4NjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQix5QkFBeUIsaUNBQWlDLG9CQUFvQiw4QkFBOEIsaUNBQWlDLEtBQUsseUJBQXlCLDBDQUEwQyw2QkFBNkI7QUFDaFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNTQTtBQUNBO0FBQ0E7OztBQ1orSCxDQUFnQixnSEFBRyxFQUFDLEM7Ozs7Ozs7O0FDQS9DO0FBQ3ZDO0FBQ0w7QUFDc0M7OztBQUc5RjtBQUM2RjtBQUM3RixnQkFBZ0IsOENBQVU7QUFDMUIsRUFBRSwwQ0FBTTtBQUNSLEVBQUUsTUFBTTtBQUNSLEVBQUUsZUFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSwwRjs7Ozs7OztBQ25CZiwyQkFBMkIsbUJBQU8sQ0FB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QixHQUFHLHVDQUFTO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxvQ0FBUTtBQUNkO0FBQ0E7QUFDQSxNQUFNLHNDQUFVO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQkFBWSxNQUFNLHNCQUFLO0FBQzNCO0FBQ0EsS0FBSywrQkFBWSxNQUFNLHNCQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUksK0JBQVksTUFBTSxzQkFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FDMUh1SCxDQUFnQix1R0FBRyxFQUFDLEM7Ozs7O0FDQTVDO0FBQ3ZDO0FBQ0w7QUFDNEQ7OztBQUdqSDtBQUMwRjtBQUMxRixJQUFJLGdCQUFTLEdBQUcsOENBQVU7QUFDMUIsRUFBRSxvQ0FBTTtBQUNSLEVBQUUsTUFBTTtBQUNSLEVBQUUsZUFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSw0RkFBUyxROzs7Ozs7O0FDbkJ4Qjs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFnVDtBQUN0VSw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQWdFO0FBQ2xGLDhDQUE4QyxFOzs7Ozs7OztBQ1I5QztBQUFBO0FBQUE7QUFBMlcsQ0FBZ0Isd1pBQUcsRUFBQyxDOzs7Ozs7OztBQ0EvWDtBQUFBO0FBQUE7QUFBK1csQ0FBZ0IsMmFBQUcsRUFBQyxDIiwiZmlsZSI6IjU0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYW5lbC10YWJzXCJ9LF92bS5fbCgoX3ZtLnRhYnMpLGZ1bmN0aW9uKHRhYil7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRhYi1uYW1lXCIsY2xhc3M6eydhY3RpdmUnOnRhYi5zdGF0ZSA9PT0gX3ZtLnN0YXRlfSxvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS4kZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpfX19LFtfdm0uX3YoX3ZtLl9zKHRhYi5uYW1lKSldKX0pLDApfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC10YWJzXCI+XHJcblx0XHQ8ZmlndXJlIHYtZm9yPVwidGFiIGluIHRhYnNcIlxyXG5cdFx0ICAgICAgICA6Y2xhc3M9XCJ7J2FjdGl2ZSc6dGFiLnN0YXRlID09PSBzdGF0ZX1cIlxyXG5cdFx0ICAgICAgICBAY2xpY2s9XCIkZW1pdCgnc2VsZWN0ZWQnLCB0YWIuc3RhdGUpXCJcclxuXHRcdCAgICAgICAgY2xhc3M9XCJ0YWItbmFtZVwiPnt7dGFiLm5hbWV9fTwvZmlndXJlPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wyd0YWJzJywgJ3N0YXRlJ11cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cdC5wYW5lbC10YWJzIHtcclxuXHRcdGRpc3BsYXk6ZmxleDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOnJvdztcclxuXHRcdGFsaWduLWl0ZW1zOmNlbnRlcjtcclxuXHRcdGp1c3RpZnktY29udGVudDpjZW50ZXI7XHJcblx0XHRwYWRkaW5nOjAgMCAyMHB4O1xyXG5cdFx0bWFyZ2luOjAgMjBweDtcclxuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG5cclxuXHRcdC50YWItbmFtZSB7XHJcblx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0Zm9udC1zaXplOiAkbGFyZ2VyO1xyXG5cdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0Zm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuXHRcdFx0bGluZS1oZWlnaHQ6NjhweDtcclxuXHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdHRyYW5zaXRpb246YWxsIDAuMXMgZWFzZTtcclxuXHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5wYXJlbnQ7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206LTIxcHg7XHJcblxyXG5cdFx0XHQmOmhvdmVyLCAmLmFjdGl2ZSB7XHJcblx0XHRcdFx0Y29sb3I6IGJsYWNrO1xyXG5cdFx0XHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYmx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1BhbmVsVGFicy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9QYW5lbFRhYnMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjliODRlNzgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJmOWI4NGU3OFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnBhbmVsLXRhYnNbZGF0YS12LWY5Yjg0ZTc4XXtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3BhZGRpbmc6MCAwIDIwcHg7bWFyZ2luOjAgMjBweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZGZlMGUxfS5wYW5lbC10YWJzIC50YWItbmFtZVtkYXRhLXYtZjliODRlNzhde2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6J1BvcHBpbnMnLCBzYW5zLXNlcmlmO2xpbmUtaGVpZ2h0OjY4cHg7Y29sb3I6IzA3OTlmZjt0cmFuc2l0aW9uOmFsbCAwLjFzIGVhc2U7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCB0cmFucGFyZW50O21hcmdpbi1ib3R0b206LTIxcHh9LnBhbmVsLXRhYnMgLnRhYi1uYW1lW2RhdGEtdi1mOWI4NGU3OF06aG92ZXIsLnBhbmVsLXRhYnMgLnRhYi1uYW1lLmFjdGl2ZVtkYXRhLXYtZjliODRlNzhde2NvbG9yOmJsYWNrO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwNzk5ZmZ9XFxuXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJjYXJkXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uJGVtaXQoJ2NsaWNrZWQnLCBfdm0uY2FyZCl9fX0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJoZWFkXCJ9LFtfYygnQ3JlZGl0Q2FyZEljb24nLHtzdGF0aWNDbGFzczpcInN5bWJvbFwifSldLDEpLF92bS5fdihcIiBcIiksKCFfdm0uYXNTZWxlY3Rvcik/X2MoJ0J1dHRvbicse3N0YXRpY0NsYXNzOlwiZGVsZXRlXCIsYXR0cnM6e1wiaWNvblwiOlwiaWNvbi10cmFzaFwifX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5hc1NlbGVjdG9yKT9fYygnQnV0dG9uJyx7c3RhdGljQ2xhc3M6XCJkZWxldGVcIixhdHRyczp7XCJpY29uXCI6XCJmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIn19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJjYXJkLW5hbWVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmNhcmQubmFtZSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJjYXJkLW51bWJlclwifSxbX3ZtLl9sKChbMSwxLDFdKSxmdW5jdGlvbihpKXtyZXR1cm4gX2MoJ3NwYW4nLFtfdm0uX3YoXCJYWFhYXCIpXSl9KSxfdm0uX3YoXCIgXCIpLF9jKCdzcGFuJyxbX3ZtLl92KF92bS5fcyhfdm0uY2FyZC5sYXN0Rm91cikpXSldLDIpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImV4cGlyYXRpb25cIn0sW192bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImRhdGVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmNhcmQuZXhwaXJhdGlvbikpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpZGVudGl0eVwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZnVsbC1uYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5jYXJkLmlkZW50aXR5KCkuZnVsbG5hbWUoKSkpXSldKV0pXSwxKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ2YWxpZC11bnRpbFwifSxbX3ZtLl92KFwiVkFMSURcIiksX2MoJ2JyJyksX3ZtLl92KFwiVU5USUxcIildKX1dXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJjYXJkXCIgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrZWQnLCBjYXJkKVwiPlxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJoZWFkXCI+XHJcblx0XHRcdDxDcmVkaXRDYXJkSWNvbiBjbGFzcz1cInN5bWJvbFwiIC8+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0PEJ1dHRvbiB2LWlmPVwiIWFzU2VsZWN0b3JcIiBjbGFzcz1cImRlbGV0ZVwiIGljb249XCJpY29uLXRyYXNoXCIgLz5cclxuXHRcdDxCdXR0b24gdi1pZj1cImFzU2VsZWN0b3JcIiBjbGFzcz1cImRlbGV0ZVwiIGljb249XCJmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIiAvPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5mb1wiPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwiY2FyZC1uYW1lXCI+e3tjYXJkLm5hbWV9fTwvZmlndXJlPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwiY2FyZC1udW1iZXJcIj5cclxuXHRcdFx0XHQ8c3BhbiB2LWZvcj1cImkgaW4gWzEsMSwxXVwiPlhYWFg8L3NwYW4+XHJcblx0XHRcdFx0PHNwYW4+e3tjYXJkLmxhc3RGb3VyfX08L3NwYW4+XHJcblx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImV4cGlyYXRpb25cIj5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwidmFsaWQtdW50aWxcIj5WQUxJRDxici8+VU5USUw8L2ZpZ3VyZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZGF0ZVwiPnt7Y2FyZC5leHBpcmF0aW9ufX08L2ZpZ3VyZT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImlkZW50aXR5XCI+XHJcblx0XHRcdFx0PCEtLTxmaWd1cmUgY2xhc3M9XCJpZC1uYW1lXCI+e3tjYXJkLmlkZW50aXR5KCkubmFtZX19PC9maWd1cmU+LS0+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImZ1bGwtbmFtZVwiPnt7Y2FyZC5pZGVudGl0eSgpLmZ1bGxuYW1lKCl9fTwvZmlndXJlPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBDcmVkaXRDYXJkSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3N2Z3MvQ3JlZGl0Q2FyZCc7XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsnY2FyZCcsICdhc1NlbGVjdG9yJ10sXHJcblx0XHRjb21wb25lbnRzOntDcmVkaXRDYXJkSWNvbn0sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cclxuXHRcdFx0XSksXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmNhcmQge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0d2lkdGg6Y2FsYyg1MCUgLSAxMHB4KTtcclxuXHRcdGJveC1zaGFkb3c6MCAxcHggM3B4ICRibHVlLXNoYWRvdztcclxuXHRcdGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjA1KTtcclxuXHRcdHBhZGRpbmc6MTVweDtcclxuXHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHRcdGhlaWdodDoyMDBweDtcclxuXHRcdGJhY2tncm91bmQ6JHdoaXRlO1xyXG5cdFx0QG1lZGlhIChtaW4td2lkdGg6JGJyZWFrcG9pbnQtbGFyZ2UtZGVza3RvcCl7XHJcblx0XHRcdHdpZHRoOmNhbGMoMjUlIC0gMTBweCk7XHJcblx0XHR9XHJcblx0XHR0cmFuc2l0aW9uOmFsbCAwLjJzIGVhc2U7XHJcblx0XHR0cmFuc2l0aW9uLXByb3BlcnR5OiBib3gtc2hhZG93O1xyXG5cdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcblx0XHQuaGVhZCB7XHJcblx0XHRcdGZsZXg6MTtcclxuXHJcblx0XHRcdC5zeW1ib2wge1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6LTVweDtcclxuXHRcdFx0XHRoZWlnaHQ6MzBweDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5pbmZvIHtcclxuXHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcblx0XHRcdC5jYXJkLW5hbWUge1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6NXB4O1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogMThweDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHQmLnNtYWxsIHtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogJG1lZGl1bTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5jYXJkLW51bWJlciB7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDoycHg7XHJcblx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0Zm9udC1zaXplOiAkbWVkaXVtO1xyXG5cclxuXHRcdFx0XHRzcGFuIHtcclxuXHRcdFx0XHRcdHBhZGRpbmc6MCA1cHg7XHJcblxyXG5cdFx0XHRcdFx0JjpmaXJzdC1jaGlsZCB7XHJcblx0XHRcdFx0XHRcdHBhZGRpbmctbGVmdDowO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCY6bm90KDpsYXN0LWNoaWxkKXtcclxuXHRcdFx0XHRcdFx0Y29sb3I6JGdyZXk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQuZXhwaXJhdGlvbiB7XHJcblx0XHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6MTBweDtcclxuXHJcblx0XHRcdFx0LnZhbGlkLXVudGlsIHtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogJHRpbnk7XHJcblx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0LmRhdGUge1xyXG5cdFx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0XHRmb250LXNpemU6ICRsYXJnZTtcclxuXHRcdFx0XHRcdHBhZGRpbmctbGVmdDoxMHB4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmlkZW50aXR5IHtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOjI1cHg7XHJcblxyXG5cclxuXHRcdFx0XHQuaWQtbmFtZSB7XHJcblx0XHRcdFx0XHRmb250LXNpemU6ICR0aW55O1xyXG5cdFx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQuZnVsbC1uYW1lIHtcclxuXHRcdFx0XHRcdG1hcmdpbi10b3A6M3B4O1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQuZGVsZXRlIHtcclxuXHRcdFx0cG9zaXRpb246YWJzb2x1dGU7XHJcblx0XHRcdHRvcDoxMHB4O1xyXG5cdFx0XHRyaWdodDoxMHB4O1xyXG5cdFx0XHR0ZXh0LWFsaWduOnJpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdCY6aG92ZXIge1xyXG5cdFx0XHRib3gtc2hhZG93OjAgOHB4IDE4cHggJGJsdWUtc2hhZG93O1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0NhcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTMyMDJiNTY0JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0NhcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9DYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9DYXJkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTMyMDJiNTY0JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMzIwMmI1NjRcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXJkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTMyMDJiNTY0JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FyZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zMjAyYjU2NCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi53YWxsZXRbZGF0YS12LWMxYTlmYjdjXXtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6Y2FsYygxMDB2aCAtIDIyMHB4KTtwYWRkaW5nLWJvdHRvbTo1MHB4fS53YWxsZXQgLnNjcm9sbGVyIC5rZXlzLWFuZC1hY2NvdW50cy1saXN0W2RhdGEtdi1jMWE5ZmI3Y117aGVpZ2h0OmNhbGMoMTAwdmggLSAyMDBweCk7b3ZlcmZsb3c6aGlkZGVufS53YWxsZXQubm8tcGFuZWxzW2RhdGEtdi1jMWE5ZmI3Y117aGVpZ2h0OmNhbGMoMTAwdmggLSAxNDBweCl9LndhbGxldC5uby1wYW5lbHMgLnNjcm9sbGVyIC5rZXlzLWFuZC1hY2NvdW50cy1saXN0W2RhdGEtdi1jMWE5ZmI3Y117aGVpZ2h0OmNhbGMoMTAwdmggLSAxODBweCl9LndhbGxldC5uby1hY2NvdW50c1tkYXRhLXYtYzFhOWZiN2Nde2hlaWdodDpjYWxjKDEwMHZoIC0gNzBweCl9LndhbGxldC5uby1hY2NvdW50cyAuc2Nyb2xsZXIgLmtleXMtYW5kLWFjY291bnRzLWxpc3RbZGF0YS12LWMxYTlmYjdjXXtoZWlnaHQ6Y2FsYygxMDB2aCAtIDEyMHB4KX0ud2FsbGV0IC5uby1rZXlwYWlyc1tkYXRhLXYtYzFhOWZiN2Nde2hlaWdodDoxMDAlO292ZXJmbG93LXk6YXV0bztwYWRkaW5nOjMwcHg7YmFja2dyb3VuZDojZjdmYWZiO3BhZGRpbmctYm90dG9tOjYwcHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0ud2FsbGV0IC5uby1rZXlwYWlycyAuY29udGFpbmVyW2RhdGEtdi1jMWE5ZmI3Y117bWF4LXdpZHRoOjQwMHB4O21hcmdpbjowIGF1dG87dGV4dC1hbGlnbjpjZW50ZXJ9LndhbGxldCAubm8ta2V5cGFpcnMgLnRpdGxlW2RhdGEtdi1jMWE5ZmI3Y117Zm9udC1zaXplOjI0cHh9LndhbGxldCAubm8ta2V5cGFpcnMgLmRlc2NyaXB0aW9uW2RhdGEtdi1jMWE5ZmI3Y117bWFyZ2luLXRvcDoxMHB4O2ZvbnQtc2l6ZToxMnB4fS53YWxsZXQgLm5vLWtleXBhaXJzIC5jdGFzW2RhdGEtdi1jMWE5ZmI3Y117bWFyZ2luLXRvcDoyMHB4fS53YWxsZXQgLndhbGxldC1hY3Rpb25zW2RhdGEtdi1jMWE5ZmI3Y117cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2RmZTBlMTtiYWNrZ3JvdW5kOndoaXRlO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzoxMHB4IDIwcHh9QG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KXsud2FsbGV0IC53YWxsZXQtYWN0aW9uc1tkYXRhLXYtYzFhOWZiN2Nde2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtoZWlnaHQ6YXV0bztwYWRkaW5nOjEwcHh9fS53YWxsZXQgLndhbGxldC1hY3Rpb25zIC5sZWZ0W2RhdGEtdi1jMWE5ZmI3Y117ZmxleDoxfUBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCl7LndhbGxldCAud2FsbGV0LWFjdGlvbnMgLmxlZnRbZGF0YS12LWMxYTlmYjdjXXt3aWR0aDoxMDAlO3RleHQtYWxpZ246bGVmdH19LndhbGxldCAud2FsbGV0LWFjdGlvbnMgLnJpZ2h0W2RhdGEtdi1jMWE5ZmI3Y117ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzt0ZXh0LWFsaWduOnJpZ2h0O2p1c3RpZnktY29udGVudDplbmR9LndhbGxldCAud2FsbGV0LWFjdGlvbnMgLnJpZ2h0IGJ1dHRvbitidXR0b25bZGF0YS12LWMxYTlmYjdjXXttYXJnaW4tbGVmdDo2cHh9QG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KXsud2FsbGV0IC53YWxsZXQtYWN0aW9ucyAucmlnaHRbZGF0YS12LWMxYTlmYjdjXXt3aWR0aDoxMDAlO21hcmdpbi10b3A6MTBweH0ud2FsbGV0IC53YWxsZXQtYWN0aW9ucyAucmlnaHQgYnV0dG9uW2RhdGEtdi1jMWE5ZmI3Y117d2lkdGg6NTAlfX0ud2FsbGV0IC53YWxsZXQtYWN0aW9ucyAuaW5mbyAua2V5c1tkYXRhLXYtYzFhOWZiN2Nde2ZvbnQtc2l6ZToxNnB4O2ZvbnQtZmFtaWx5OidQb3BwaW5zJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDpib2xkfS53YWxsZXQgLndhbGxldC1hY3Rpb25zIC5pbmZvIC5hY2NvdW50c1tkYXRhLXYtYzFhOWZiN2Nde2ZvbnQtc2l6ZToxM3B4fVxcblwiLCBcIlwiXSk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jYXJkW2RhdGEtdi0zMjAyYjU2NF17cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6Y2FsYyg1MCUgLSAxMHB4KTtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDcsMTU1LDIzMiwwLjIzKTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4wNSk7cGFkZGluZzoxNXB4O21hcmdpbi1ib3R0b206MjBweDtoZWlnaHQ6MjAwcHg7YmFja2dyb3VuZDojZmZmO3RyYW5zaXRpb246YWxsIDAuMnMgZWFzZTt0cmFuc2l0aW9uLXByb3BlcnR5OmJveC1zaGFkb3c7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn1AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KXsuY2FyZFtkYXRhLXYtMzIwMmI1NjRde3dpZHRoOmNhbGMoMjUlIC0gMTBweCl9fS5jYXJkIC5oZWFkW2RhdGEtdi0zMjAyYjU2NF17ZmxleDoxfS5jYXJkIC5oZWFkIC5zeW1ib2xbZGF0YS12LTMyMDJiNTY0XXttYXJnaW4tdG9wOi01cHg7aGVpZ2h0OjMwcHh9LmNhcmQgLmluZm9bZGF0YS12LTMyMDJiNTY0XXtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmNhcmQgLmluZm8gLmNhcmQtbmFtZVtkYXRhLXYtMzIwMmI1NjRde21hcmdpbi10b3A6NXB4O2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OmJvbGR9LmNhcmQgLmluZm8gLmNhcmQtbmFtZS5zbWFsbFtkYXRhLXYtMzIwMmI1NjRde2ZvbnQtc2l6ZToxMnB4fS5jYXJkIC5pbmZvIC5jYXJkLW51bWJlcltkYXRhLXYtMzIwMmI1NjRde21hcmdpbi10b3A6MnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHh9LmNhcmQgLmluZm8gLmNhcmQtbnVtYmVyIHNwYW5bZGF0YS12LTMyMDJiNTY0XXtwYWRkaW5nOjAgNXB4fS5jYXJkIC5pbmZvIC5jYXJkLW51bWJlciBzcGFuW2RhdGEtdi0zMjAyYjU2NF06Zmlyc3QtY2hpbGR7cGFkZGluZy1sZWZ0OjB9LmNhcmQgLmluZm8gLmNhcmQtbnVtYmVyIHNwYW5bZGF0YS12LTMyMDJiNTY0XTpub3QoOmxhc3QtY2hpbGQpe2NvbG9yOiNjOGM4Yzh9LmNhcmQgLmluZm8gLmV4cGlyYXRpb25bZGF0YS12LTMyMDJiNTY0XXtkaXNwbGF5OmZsZXg7bWFyZ2luLXRvcDoxMHB4fS5jYXJkIC5pbmZvIC5leHBpcmF0aW9uIC52YWxpZC11bnRpbFtkYXRhLXYtMzIwMmI1NjRde2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZH0uY2FyZCAuaW5mbyAuZXhwaXJhdGlvbiAuZGF0ZVtkYXRhLXYtMzIwMmI1NjRde2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE0cHg7cGFkZGluZy1sZWZ0OjEwcHh9LmNhcmQgLmluZm8gLmlkZW50aXR5W2RhdGEtdi0zMjAyYjU2NF17bWFyZ2luLXRvcDoyNXB4fS5jYXJkIC5pbmZvIC5pZGVudGl0eSAuaWQtbmFtZVtkYXRhLXYtMzIwMmI1NjRde2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZH0uY2FyZCAuaW5mbyAuaWRlbnRpdHkgLmZ1bGwtbmFtZVtkYXRhLXYtMzIwMmI1NjRde21hcmdpbi10b3A6M3B4O2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGR9LmNhcmQgLmRlbGV0ZVtkYXRhLXYtMzIwMmI1NjRde3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMHB4O3JpZ2h0OjEwcHg7dGV4dC1hbGlnbjpyaWdodH0uY2FyZFtkYXRhLXYtMzIwMmI1NjRdOmhvdmVye2JveC1zaGFkb3c6MCA4cHggMThweCByZ2JhKDcsMTU1LDIzMiwwLjIzKX1cXG5cIiwgXCJcIl0pO1xuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ3JlZGl0Q2FyZHNMaXN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBkNDUzYTA5JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ3JlZGl0Q2FyZHNMaXN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBkNDUzYTA5JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWY5Yjg0ZTc4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiYmJiYWNkZDZcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vV2FsbGV0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWMxYTlmYjdjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjBjOWQzMjU1XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jYXJkcy1saXN0W2RhdGEtdi0wZDQ1M2EwOV17cGFkZGluZzo0MHB4IDQwcHggMjBweCA0MHB4O2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1jb250ZW50OmZsZXgtc3RhcnR9XFxuXCIsIFwiXCJdKTtcbiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FyZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zMjAyYjU2NCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcImVjMzc5ZDQ2XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicsWyhfdm0uZmVhdHVyZXMuY3JlZGl0Q2FyZHMpP19jKCdQYW5lbFRhYnMnLHthdHRyczp7XCJ0YWJzXCI6X3ZtLnRhYnMsXCJzdGF0ZVwiOl92bS5zdGF0ZX0sb246e1wic2VsZWN0ZWRcIjpmdW5jdGlvbiAoeCkgeyByZXR1cm4gX3ZtLnN0YXRlID0geDsgfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ3YWxsZXRcIixjbGFzczp7J25vLXBhbmVscyc6IV92bS5mZWF0dXJlcy5jcmVkaXRDYXJkcywgJ25vLWFjY291bnRzJzohX3ZtLmFjY291bnRzLmxlbmd0aH19LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2Nyb2xsZXJcIn0sWyhfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuS0VZUyAmJiBfdm0ua2V5cGFpcnMubGVuZ3RoKT9fYygnS2V5c0FuZEFjY291bnRMaXN0Jyx7b246e1wiYWNjb3VudFwiOl92bS5nb1RvQWNjb3VudH19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuS0VZUyAmJiAhX3ZtLmtleXBhaXJzLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImtleXMtYW5kLWFjY291bnRzLWxpc3RcIn0sW192bS5fbSgwKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5mZWF0dXJlcy5jcmVkaXRDYXJkcyAmJiBfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuQ0FSRFMpP19jKCdDcmVkaXRDYXJkc0xpc3QnKTpfdm0uX2UoKV0sMSksX3ZtLl92KFwiIFwiKSwoX3ZtLnN0YXRlID09PSBfdm0uU1RBVEVTLktFWVMpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ3YWxsZXQtYWN0aW9uc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImxlZnRcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJrZXlzXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5rZXlwYWlycy5sZW5ndGgpK1wiIGtleXNcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImFjY291bnRzXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50cy5sZW5ndGgpK1wiIGFjY291bnRzXCIpXSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJpZ2h0XCJ9LFtfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOlwiR2VuZXJhdGUgS2V5XCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLmdlbmVyYXRlS2V5cGFpcigkZXZlbnQpfX19KSxfdm0uX3YoXCIgXCIpLF9jKCdCdXR0b24nLHthdHRyczp7XCJibHVlXCI6XCIxXCIsXCJ0ZXh0XCI6XCJJbXBvcnQgS2V5XCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLmltcG9ydEtleXBhaXIoJGV2ZW50KX19fSldLDEpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnN0YXRlID09PSBfdm0uU1RBVEVTLkNBUkRTKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwid2FsbGV0LWFjdGlvbnNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJsZWZ0XCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5mb1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwia2V5c1wifSxbX3ZtLl92KF92bS5fcyhfdm0uY2FyZHMubGVuZ3RoKStcIiBjYXJkc1wiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiYWNjb3VudHNcIn0sW192bS5fdihcIjAgZXhwaXJlZFwiKV0pXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJyaWdodFwifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcImJsdWVcIjpcIjFcIixcInRleHRcIjpcIkFkZCBDcmVkaXQgQ2FyZFwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5pbXBvcnRLZXlwYWlyKCRldmVudCl9fX0pXSwxKV0pOl92bS5fZSgpXSldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJuby1rZXlwYWlyc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImNvbnRhaW5lclwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW192bS5fdihcIllvdSBkb24ndCBoYXZlIGFueSBLZXlzXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJkZXNjcmlwdGlvblwifSxbX3ZtLl92KFwiQ2xpY2sgb25lIG9mIHRoZSBidXR0b25zIGJlbG93IHRvIGltcG9ydCBhIGtleSB5b3UgYWxyZWFkeSBoYXZlLCBvciBnZW5lcmF0ZSBhIGJyYW5kIG5ldyBvbmUuXCIpXSldKV0pfV1cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJjYXJkcy1saXN0XCJ9LF92bS5fbCgoX3ZtLmZpbHRlcmVkQ2FyZHMpLGZ1bmN0aW9uKGNhcmQpe3JldHVybiBfYygnQ2FyZCcse2tleTpjYXJkLmlkLGF0dHJzOntcImNhcmRcIjpjYXJkfX0pfSksMSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImNhcmRzLWxpc3RcIj5cclxuXHRcdDxDYXJkIDprZXk9XCJjYXJkLmlkXCIgOmNhcmQ9XCJjYXJkXCIgdi1mb3I9XCJjYXJkIGluIGZpbHRlcmVkQ2FyZHNcIiAvPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQgQ3JlZGl0Q2FyZCBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQ3JlZGl0Q2FyZFwiO1xyXG5cdGltcG9ydCBDcmVkaXRDYXJkSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3N2Z3MvQ3JlZGl0Q2FyZCc7XHJcblx0aW1wb3J0IENhcmQgZnJvbSAnLi9DYXJkJztcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0Y29tcG9uZW50czp7Q2FyZCwgQ3JlZGl0Q2FyZEljb259LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQnaWRlbnRpdGllcydcclxuXHRcdFx0XSksXHJcblx0XHRcdGZpbHRlcmVkQ2FyZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdFx0Q3JlZGl0Q2FyZC5mcm9tSnNvbih7XHJcblx0XHRcdFx0XHRcdGlkZW50aXR5SWQ6dGhpcy5pZGVudGl0aWVzWzBdLmlkLFxyXG5cdFx0XHRcdFx0XHRuYW1lOidUZXN0IENhcmQnLFxyXG5cdFx0XHRcdFx0XHRsYXN0Rm91cjonMTIzNCcsXHJcblx0XHRcdFx0XHRcdGV4cGlyYXRpb246JzA0LzIwJyxcclxuXHRcdFx0XHRcdFx0Y2FyZEhhc2g6J2FzZGxqa2Zhc2prbGhkZmhhc2tsamRmaGprc2FsaGZkamxoYXNsamZobGhha3NkZmxraicsXHJcblx0XHRcdFx0XHRcdHNlY3VyZTp7XHJcblx0XHRcdFx0XHRcdFx0bnVtYmVyOicxMjM0MTIzNDEyMzQxMjM0JyxcclxuXHRcdFx0XHRcdFx0XHRjdng6JzEyMzQnLFxyXG5cdFx0XHRcdFx0XHRcdGF1dGhUb2tlbnM6e30sXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmNhcmRzLWxpc3Qge1xyXG5cdFx0cGFkZGluZzo0MHB4IDQwcHggMjBweCA0MHB4O1xyXG5cdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdFx0YWxpZ24tY29udGVudDogZmxleC1zdGFydDtcclxuXHJcblxyXG5cdH1cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ3JlZGl0Q2FyZHNMaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NyZWRpdENhcmRzTGlzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0NyZWRpdENhcmRzTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGQ0NTNhMDkmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ3JlZGl0Q2FyZHNMaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ3JlZGl0Q2FyZHNMaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9DcmVkaXRDYXJkc0xpc3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGQ0NTNhMDkmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwZDQ1M2EwOVwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICAgIDxQYW5lbFRhYnMgdi1pZj1cImZlYXR1cmVzLmNyZWRpdENhcmRzXCIgOnRhYnM9XCJ0YWJzXCIgOnN0YXRlPVwic3RhdGVcIiB2LW9uOnNlbGVjdGVkPVwieCA9PiBzdGF0ZSA9IHhcIiAvPlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwid2FsbGV0XCIgOmNsYXNzPVwieyduby1wYW5lbHMnOiFmZWF0dXJlcy5jcmVkaXRDYXJkcywgJ25vLWFjY291bnRzJzohYWNjb3VudHMubGVuZ3RofVwiPlxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzY3JvbGxlclwiPlxyXG4gICAgICAgICAgICAgICAgPEtleXNBbmRBY2NvdW50TGlzdCB2LW9uOmFjY291bnQ9XCJnb1RvQWNjb3VudFwiIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLktFWVMgJiYga2V5cGFpcnMubGVuZ3RoXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImtleXMtYW5kLWFjY291bnRzLWxpc3RcIiB2LWlmPVwic3RhdGUgPT09IFNUQVRFUy5LRVlTICYmICFrZXlwYWlycy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm5vLWtleXBhaXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGl0bGVcIj5Zb3UgZG9uJ3QgaGF2ZSBhbnkgS2V5czwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImRlc2NyaXB0aW9uXCI+Q2xpY2sgb25lIG9mIHRoZSBidXR0b25zIGJlbG93IHRvIGltcG9ydCBhIGtleSB5b3UgYWxyZWFkeSBoYXZlLCBvciBnZW5lcmF0ZSBhIGJyYW5kIG5ldyBvbmUuPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkc0xpc3Qgdi1pZj1cImZlYXR1cmVzLmNyZWRpdENhcmRzICYmIHN0YXRlID09PSBTVEFURVMuQ0FSRFNcIiAvPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ3YWxsZXQtYWN0aW9uc1wiIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLktFWVNcIj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwia2V5c1wiPnt7a2V5cGFpcnMubGVuZ3RofX0ga2V5czwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiYWNjb3VudHNcIj57e2FjY291bnRzLmxlbmd0aH19IGFjY291bnRzPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gICAgICAgICAgdGV4dD1cIkdlbmVyYXRlIEtleVwiIEBjbGljay5uYXRpdmU9XCJnZW5lcmF0ZUtleXBhaXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gYmx1ZT1cIjFcIiB0ZXh0PVwiSW1wb3J0IEtleVwiIEBjbGljay5uYXRpdmU9XCJpbXBvcnRLZXlwYWlyXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ3YWxsZXQtYWN0aW9uc1wiIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLkNBUkRTXCI+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImtleXNcIj57e2NhcmRzLmxlbmd0aH19IGNhcmRzPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJhY2NvdW50c1wiPjAgZXhwaXJlZDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJsdWU9XCIxXCIgQGNsaWNrLm5hdGl2ZT1cImltcG9ydEtleXBhaXJcIiB0ZXh0PVwiQWRkIENyZWRpdCBDYXJkXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuXHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblx0aW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICdAd2FsbGV0cGFjay9jb3JlL3N0b3JlL2NvbnN0YW50cyc7XHJcblx0aW1wb3J0IFBhbmVsVGFicyBmcm9tICcuLi9jb21wb25lbnRzL3JldXNhYmxlL1BhbmVsVGFicyc7XHJcblx0aW1wb3J0IHtCbG9ja2NoYWlucywgYmxvY2tjaGFpbk5hbWUsIEJsb2NrY2hhaW5zQXJyYXl9IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9CbG9ja2NoYWluc1wiO1xyXG5cdGltcG9ydCBQb3B1cFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3V0aWxpdHkvUG9wdXBTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4uL21vZGVscy9wb3B1cHMvUG9wdXBcIjtcclxuXHRpbXBvcnQgS2V5c0FuZEFjY291bnRMaXN0IGZyb20gXCIuLi9jb21wb25lbnRzL21pc2MvS2V5c0FuZEFjY291bnRMaXN0XCI7XHJcblx0aW1wb3J0IEtleVBhaXJTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9LZXlQYWlyU2VydmljZVwiO1xyXG5cdGltcG9ydCBDcmVkaXRDYXJkc0xpc3QgZnJvbSBcIi4uL2NvbXBvbmVudHMvbWlzYy9DcmVkaXRDYXJkc0xpc3RcIjtcclxuXHRjb25zdCBTVEFURVMgPSB7XHJcblx0XHRLRVlTOidrZXlzJyxcclxuXHRcdENBUkRTOidjYXJkcycsXHJcblx0fVxyXG5cdGxldCBzYXZlVGltZW91dDtcclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOntcclxuXHRcdFx0Q3JlZGl0Q2FyZHNMaXN0LFxyXG5cdFx0XHRLZXlzQW5kQWNjb3VudExpc3QsXHJcblx0XHRcdFBhbmVsVGFic1xyXG5cdFx0fSxcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblx0XHRcdHN0YXRlOlNUQVRFUy5LRVlTLFxyXG5cdFx0XHRTVEFURVMsXHJcblx0XHRcdHRhYjpudWxsLFxyXG5cdFx0XHRibG9ja2NoYWluRmlsdGVyOm51bGwsXHJcblx0XHRcdGtleXBhaXJGaWx0ZXI6bnVsbCxcclxuXHRcdFx0dGVybXM6JycsXHJcblx0XHRcdGNsb25lZEtleXBhaXJzOltdLFxyXG5cdFx0XHRyZWZyZXNoaW5nQWNjb3VudHM6bnVsbCxcclxuXHRcdH19LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J3NjYXR0ZXInLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2tleXBhaXJzJyxcclxuXHRcdFx0XHQnbmV0d29ya3MnLFxyXG5cdFx0XHRcdCdjYXJkcycsXHJcbiAgICAgICAgICAgICAgICAnYWNjb3VudHMnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0dGFicygpe1xyXG5cdFx0XHRcdHJldHVybiBbXHJcblx0XHRcdFx0XHR7bmFtZTonQmxvY2tjaGFpbiBBY2NvdW50cycsIHN0YXRlOlNUQVRFUy5LRVlTfSxcclxuXHRcdFx0XHRcdHtuYW1lOidDcmVkaXQgQ2FyZHMnLCBzdGF0ZTpTVEFURVMuQ0FSRFN9LFxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0YWNjb3VudHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5uZXR3b3Jrcy5tYXAoeCA9PiB4LmFjY291bnRzKHRydWUpKS5yZWR1Y2UoKGFjYywgYWNjb3VudHMpID0+IHtcclxuXHRcdFx0XHRcdGFjYyA9IGFjYy5jb25jYXQoYWNjb3VudHMpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHR9LCBbXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtb3VudGVkKCl7XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblx0XHRcdGdlbmVyYXRlS2V5cGFpcigpe1xyXG5cdFx0XHRcdFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLmdlbmVyYXRlS2V5cGFpcih7fSwga2V5cGFpciA9PiB7XHJcblx0XHRcdFx0XHRpZigha2V5cGFpcikgcmV0dXJuO1xyXG5cdFx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuZXhwb3J0UHJpdmF0ZUtleShrZXlwYWlyKSk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbXBvcnRLZXlwYWlyKCl7XHJcblx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuaW1wb3J0S2V5cGFpcih7fSwga2V5cGFpciA9PiB7fSkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnb1RvQWNjb3VudChhY2NvdW50KXtcclxuXHRcdFx0XHR0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTp0aGlzLlJvdXRlTmFtZXMuQUNDT1VOVCwgcGFyYW1zOnt1bmlxdWU6YWNjb3VudC51bmlxdWUoKX19KTtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuICAgIEBpbXBvcnQgXCIuLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG4gICAgLndhbGxldCB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGhlaWdodDpjYWxjKDEwMHZoIC0gMjIwcHgpO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOjUwcHg7XHJcblxyXG4gICAgICAgIC5zY3JvbGxlciB7XHJcblxyXG4gICAgICAgICAgICAua2V5cy1hbmQtYWNjb3VudHMtbGlzdCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAyMDBweCk7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLm5vLXBhbmVscyB7XHJcbiAgICAgICAgICAgIGhlaWdodDpjYWxjKDEwMHZoIC0gMTQwcHgpO1xyXG5cclxuICAgICAgICAgICAgLnNjcm9sbGVyIHtcclxuXHJcbiAgICAgICAgICAgICAgICAua2V5cy1hbmQtYWNjb3VudHMtbGlzdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OmNhbGMoMTAwdmggLSAxODBweCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYubm8tYWNjb3VudHMge1xyXG4gICAgICAgICAgICBoZWlnaHQ6Y2FsYygxMDB2aCAtIDcwcHgpO1xyXG5cclxuICAgICAgICAgICAgLnNjcm9sbGVyIHtcclxuXHJcbiAgICAgICAgICAgICAgICAua2V5cy1hbmQtYWNjb3VudHMtbGlzdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OmNhbGMoMTAwdmggLSAxMjBweCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5uby1rZXlwYWlycyB7XHJcbiAgICAgICAgICAgIGhlaWdodDoxMDAlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OmF1dG87XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MzBweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDokbGlnaHRlc3RncmV5O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTo2MHB4O1xyXG5cclxuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAgICAgICAgIC5jb250YWluZXIge1xyXG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOjQwMHB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOjAgYXV0bztcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24ge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDoxMHB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAkbWVkaXVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuY3RhcyB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOjIwcHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC53YWxsZXQtYWN0aW9ucyB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgICAgICAgICBib3R0b206MDtcclxuICAgICAgICAgICAgbGVmdDowO1xyXG4gICAgICAgICAgICByaWdodDowO1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOjFweCBzb2xpZCAkbGlnaHRncmV5O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOndoaXRlO1xyXG5cclxuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBwYWRkaW5nOjEwcHggMjBweDtcclxuXHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAkYnJlYWtwb2ludC1tb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcclxuICAgICAgICAgICAgICAgIGhlaWdodDphdXRvO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzoxMHB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAubGVmdCB7XHJcbiAgICAgICAgICAgICAgICBmbGV4OjE7XHJcblxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LW1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjpsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAucmlnaHQge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246cm93O1xyXG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjpyaWdodDtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDplbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYnV0dG9uICsgYnV0dG9uIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDo2cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6ICRicmVha3BvaW50LW1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDoxMHB4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidXR0b24ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDo1MCU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAuaW5mbyB7XHJcbiAgICAgICAgICAgICAgICAua2V5cyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udC1zaXplLW1lZGl1bTtcclxuICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC5hY2NvdW50cyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udC1zaXplLXN0YW5kYXJkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1dhbGxldC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9XYWxsZXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9XYWxsZXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMxYTlmYjdjJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1dhbGxldC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1dhbGxldC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vV2FsbGV0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWMxYTlmYjdjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImMxYTlmYjdjXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DcmVkaXRDYXJkc0xpc3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGQ0NTNhMDkmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCIxYTJiZGZmMVwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWY5Yjg0ZTc4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFuZWxUYWJzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWY5Yjg0ZTc4JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1dhbGxldC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jMWE5ZmI3YyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9XYWxsZXQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YzFhOWZiN2Mmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiJdLCJzb3VyY2VSb290IjoiIn0=