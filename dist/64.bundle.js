(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[64],{

/***/ "/O5U":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchase_vue_vue_type_style_index_0_id_3171e757_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("iklS");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchase_vue_vue_type_style_index_0_id_3171e757_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchase_vue_vue_type_style_index_0_id_3171e757_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchase_vue_vue_type_style_index_0_id_3171e757_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "JnGr":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".card[data-v-3202b564]{position:relative;cursor:pointer;width:calc(50% - 10px);box-shadow:0 1px 3px rgba(7,155,232,0.23);border:1px solid rgba(0,0,0,0.05);padding:15px;margin-bottom:20px;height:200px;background:#fff;transition:all 0.2s ease;transition-property:box-shadow;display:flex;flex-direction:column;justify-content:space-between}@media (min-width: 1200px){.card[data-v-3202b564]{width:calc(25% - 10px)}}.card .head[data-v-3202b564]{flex:1}.card .head .symbol[data-v-3202b564]{margin-top:-5px;height:30px}.card .info[data-v-3202b564]{display:flex;flex-direction:column;justify-content:center}.card .info .card-name[data-v-3202b564]{margin-top:5px;font-size:18px;font-weight:bold}.card .info .card-name.small[data-v-3202b564]{font-size:12px}.card .info .card-number[data-v-3202b564]{margin-top:2px;font-weight:bold;font-size:12px}.card .info .card-number span[data-v-3202b564]{padding:0 5px}.card .info .card-number span[data-v-3202b564]:first-child{padding-left:0}.card .info .card-number span[data-v-3202b564]:not(:last-child){color:#c8c8c8}.card .info .expiration[data-v-3202b564]{display:flex;margin-top:10px}.card .info .expiration .valid-until[data-v-3202b564]{font-size:9px;font-weight:bold}.card .info .expiration .date[data-v-3202b564]{font-weight:bold;font-size:14px;padding-left:10px}.card .info .identity[data-v-3202b564]{margin-top:25px}.card .info .identity .id-name[data-v-3202b564]{font-size:9px;font-weight:bold}.card .info .identity .full-name[data-v-3202b564]{margin-top:3px;font-size:10px;font-weight:bold}.card .delete[data-v-3202b564]{position:absolute;top:10px;right:10px;text-align:right}.card[data-v-3202b564]:hover{box-shadow:0 8px 18px rgba(7,155,232,0.23)}\n", ""]);


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

/***/ "XL6b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Purchase.vue?vue&type=template&id=3171e757&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"purchase"},[(_vm.canShowBack)?_c('figure',{staticClass:"back",on:{"click":_vm.back}},[_c('i',{staticClass:"icon-left-small"})]):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.AMOUNT)?_c('section',[_c('figure',{staticClass:"title"},[_vm._v("How much do you want to buy?")]),_vm._v(" "),_c('figure',{staticClass:"subtitle"},[_vm._v("You can purchase up to $150 without having to go through KYC.")]),_vm._v(" "),_c('section',{staticClass:"amount"},[_c('Input',{attrs:{"text":_vm.amount,"centered":"1","type":"number","big":"1","placeholder":"$0.00"},on:{"changed":function (x) { return _vm.amount = x; }}})],1),_vm._v(" "),_c('Button',{attrs:{"text":"Select a Card","big":"1","blue":"1"},nativeOn:{"click":function($event){_vm.state = _vm.STATES.SELECT_CARD}}})],1):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.SELECT_CARD)?_c('section',[_c('figure',{staticClass:"title"},[_vm._v("Select a Card")]),_vm._v(" "),_c('figure',{staticClass:"subtitle"},[_vm._v("You can purchase up to $150 without having to go through KYC.")]),_vm._v(" "),(_vm.card)?_c('section',{staticClass:"select-card"},[_c('Card',{attrs:{"as-selector":"1","card":_vm.card}})],1):_vm._e(),_vm._v(" "),_c('Button',{attrs:{"text":("Use " + (_vm.card.name)),"big":"1","blue":"1"},nativeOn:{"click":function($event){_vm.state = _vm.STATES.SELECT_ACCOUNT}}})],1):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.SELECT_ACCOUNT && _vm.account && _vm.token)?_c('section',[_c('figure',{staticClass:"title"},[_vm._v("Select a Token and Account")]),_vm._v(" "),_c('figure',{staticClass:"subtitle"},[_vm._v("This is the token you will get for your fiat currency.")]),_vm._v(" "),_c('section',{staticClass:"select-recipient"},[_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.account.network().name))]),_vm._v(" "),_c('figure',{staticClass:"token"},[_vm._v(_vm._s(_vm.token.symbol))]),_vm._v(" "),_c('figure',{staticClass:"price"},[_vm._v(_vm._s(_vm.token.fiatPrice()))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])])]),_vm._v(" "),_c('figure',{staticClass:"estimated-tokens"},[_vm._v("\n            Estimated "+_vm._s(_vm.token.symbol)+": "+_vm._s(parseFloat(_vm.amount/_vm.token.fiatPrice(false)).toFixed(_vm.token.decimals))+"\n        ")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('Button',{attrs:{"text":("Buy $" + _vm.amount + " of " + (this.token.symbol)),"big":"1","blue":"1"},nativeOn:{"click":function($event){return _vm.purchase($event)}}})],1):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.WORKING)?_c('section',[_c('figure',{staticClass:"title"},[_vm._v("Please Wait")]),_vm._v(" "),_c('figure',{staticClass:"subtitle"},[_vm._v("This can take a few minutes.")]),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(_vm.state === _vm.STATES.COMPLETE)?_c('section',[_vm._m(1),_vm._v(" "),_c('figure',{staticClass:"title"},[_vm._v("Success!")]),_vm._v(" "),_c('figure',{staticClass:"subtitle"},[_vm._v("You have purchased $"+_vm._s(_vm.amount)+" worth of "+_vm._s(_vm.token.symbol)+" for "+_vm._s(_vm.account.sendable())+"!")]),_vm._v(" "),_c('Button',{attrs:{"text":"Buy Again","big":"1","blue":"1"},nativeOn:{"click":function($event){_vm.state = _vm.STATES.AMOUNT}}})],1):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"spinner"},[_c('i',{staticClass:"icon-spin4 animate-spin"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"icon font"},[_c('i',{staticClass:"icon-check"})])}]


// CONCATENATED MODULE: ./src/views/Purchase.vue?vue&type=template&id=3171e757&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/CreditCard.js
var CreditCard = __webpack_require__("zc85");
var CreditCard_default = /*#__PURE__*/__webpack_require__.n(CreditCard);

// EXTERNAL MODULE: ./src/components/misc/Card.vue + 4 modules
var Card = __webpack_require__("65kt");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Purchase.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

    
    
    
    
    
    
    // import PurchasingService from "../services/creditcards/PurchasingService";
    __webpack_require__("8olR");

    const STATES = {
    	AMOUNT:'amount',
	    SELECT_CARD:'selectCard',
	    SELECT_ACCOUNT:'selectAccount',
	    WORKING:'working',
	    COMPLETE:'complete',
    };

    /* harmony default export */ var Purchasevue_type_script_lang_js_ = ({
	    components: {Card: Card["a" /* default */]},
	    data(){return {
		    STATES,
            state:STATES.AMOUNT,
            card:null,
		    account:null,
		    token:null,
		    amount:10,
        }},
        computed:{
            ...Object(vuex_esm["c" /* mapGetters */])([
            	'identities',
                'accounts',

            ]),
	        purchasableToken(){
		        return this.account.network().systemToken();
	        },
            canShowBack(){
            	return (this.state === STATES.SELECT_CARD || this.state === STATES.SELECT_ACCOUNT);

            }
        },
        mounted(){
	    	this.card = CreditCard_default.a.fromJson({
			    identityId:this.identities[0].id,
			    name:'Test Card',
			    lastFour:'1234',
			    expiration:'12/20',
			    cardHash:'asdljkfasjklhdfhaskljdfhjksalhfdjlhasljfhlhaksdflkj',
			    secure:{
			    	// Dummy Moonpay card
				    number:'4012001037490014',
				    cvx:'123',
                    authTokens:{},
                }
		    })
	        this.account = this.accounts.filter(x => x.tokens().length)
		        .sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0];
	        this.token = this.purchasableToken;
        },
        methods:{
	        back(){
                this.state = (() => {
	                switch(this.state){
		                case STATES.SELECT_CARD: return STATES.AMOUNT;
		                case STATES.SELECT_ACCOUNT: return STATES.SELECT_CARD;
                        default: return STATES.AMOUNT;
	                }
                })();
            },
	        selectTokenAndAccount(){
		        PopupService["a" /* default */].push(Popup["a" /* Popup */].selectAccount(account => {
			        if(!account) return;
			        this.account = account;
			        this.token = this.purchasableToken;
		        }))
	        },
            async purchase(){
	        	this.state = STATES.WORKING;

	        	// await PurchasingService.init();
                // const result = await PurchasingService.purchase(this.amount, this.token, this.account, this.card);
                // console.log('res', result);

	        	setTimeout(() => {
	        		this.state = STATES.SELECT_ACCOUNT;
                }, 2000);
            }
        }
    });

// CONCATENATED MODULE: ./src/views/Purchase.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Purchasevue_type_script_lang_js_ = (Purchasevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Purchase.vue?vue&type=style&index=0&id=3171e757&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Purchasevue_type_style_index_0_id_3171e757_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("/O5U");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Purchase.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Purchasevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3171e757",
  null
  
)

/* harmony default export */ var Purchase = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "iklS":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("nF9+");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("62abc4b3", content, true, {});

/***/ }),

/***/ "nF9+":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".purchase[data-v-3171e757]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:calc(100vh - 0px);text-align:center;width:100%;position:relative}.purchase .back[data-v-3171e757]{position:absolute;top:30px;left:30px;font-size:48px;color:#c8c8c8;cursor:pointer}.purchase .back[data-v-3171e757]:hover{color:#333}.purchase .icon[data-v-3171e757]{width:120px;height:120px;margin:0 auto;margin-bottom:30px;margin-top:-50px}.purchase .icon.font[data-v-3171e757]{width:90px;height:90px;font-size:48px;box-shadow:0 1px 2px rgba(7,155,232,0.23),0 8px 20px rgba(7,155,232,0.23);border-radius:50%;display:flex;justify-content:center;align-items:center;color:#0799ff;margin-bottom:20px}.purchase .title[data-v-3171e757]{font-size:24px;font-weight:bold;margin-bottom:10px}.purchase .subtitle[data-v-3171e757]{font-size:10px;color:#7a7a7a;margin-bottom:30px}.purchase .select-card[data-v-3171e757]{width:400px;text-align:left}.purchase .select-card .card[data-v-3171e757]{width:100%}.purchase .select-recipient[data-v-3171e757]{width:500px;text-align:left}.purchase .select-recipient .box[data-v-3171e757]{width:100%}.purchase .estimated-tokens[data-v-3171e757]{font-size:10px;margin-top:10px;font-weight:bold;color:#0799ff}.purchase .spinner[data-v-3171e757]{padding:30px;font-size:64px}\n", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUHVyY2hhc2UudnVlPzM5YzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DYXJkLnZ1ZT84MTFhIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21pc2MvQ2FyZC52dWU/MGE2OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21pc2MvQ2FyZC52dWU/MjI1OSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9taXNjL0NhcmQudnVlPzI5NDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9DYXJkLnZ1ZT84ZGFhIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9QdXJjaGFzZS52dWU/N2Q1OCIsIndlYnBhY2s6Ly8vc3JjL3ZpZXdzL1B1cmNoYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUHVyY2hhc2UudnVlP2EwYmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1B1cmNoYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUHVyY2hhc2UudnVlP2FlNDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1B1cmNoYXNlLnZ1ZT84ZmI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFpWCxDQUFnQiw2YUFBRyxFQUFDLEM7Ozs7Ozs7Ozs7QUNBclksMEJBQTBCLGFBQWEsMEJBQTBCLHdCQUF3QixxQkFBcUIsdUJBQXVCLHlCQUF5Qix3Q0FBd0MsZ0JBQWdCLG1CQUFtQix1QkFBdUIscUJBQXFCLGlEQUFpRCw0QkFBNEIscUJBQXFCLHFEQUFxRCw0QkFBNEIsbUNBQW1DLHFDQUFxQyxtQkFBbUIsZUFBZSx3QkFBd0IsMkRBQTJELDBCQUEwQiwrQkFBK0Is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VSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7O0FDUjlDLDJCQUEyQixtQkFBTyxDQUFDLE1BQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTLDhCQUE4QixhQUFhLHNCQUFzQix1QkFBdUIsbUJBQW1CLHlCQUF5QixrQkFBa0IsV0FBVyxrQkFBa0IsaUNBQWlDLGtCQUFrQixTQUFTLFVBQVUsZUFBZSxjQUFjLGVBQWUsdUNBQXVDLFdBQVcsaUNBQWlDLFlBQVksYUFBYSxjQUFjLG1CQUFtQixpQkFBaUIsc0NBQXNDLFdBQVcsWUFBWSxlQUFlLDBFQUEwRSxrQkFBa0IsYUFBYSx1QkFBdUIsbUJBQW1CLGNBQWMsbUJBQW1CLGtDQUFrQyxlQUFlLGlCQUFpQixtQkFBbUIscUNBQXFDLGVBQWUsY0FBYyxtQkFBbUIsd0NBQXdDLFlBQVksZ0JBQWdCLDhDQUE4QyxXQUFXLDZDQUE2QyxZQUFZLGdCQUFnQixrREFBa0QsV0FBVyw2Q0FBNkMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsb0NBQW9DLGFBQWEsZUFBZSIsImZpbGUiOiI2NC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QdXJjaGFzZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zMTcxZTc1NyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QdXJjaGFzZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zMTcxZTc1NyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImNhcmRcIixvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS4kZW1pdCgnY2xpY2tlZCcsIF92bS5jYXJkKX19fSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImhlYWRcIn0sW19jKCdDcmVkaXRDYXJkSWNvbicse3N0YXRpY0NsYXNzOlwic3ltYm9sXCJ9KV0sMSksX3ZtLl92KFwiIFwiKSwoIV92bS5hc1NlbGVjdG9yKT9fYygnQnV0dG9uJyx7c3RhdGljQ2xhc3M6XCJkZWxldGVcIixhdHRyczp7XCJpY29uXCI6XCJpY29uLXRyYXNoXCJ9fSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLmFzU2VsZWN0b3IpP19jKCdCdXR0b24nLHtzdGF0aWNDbGFzczpcImRlbGV0ZVwiLGF0dHJzOntcImljb25cIjpcImZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwifX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImluZm9cIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNhcmQtbmFtZVwifSxbX3ZtLl92KF92bS5fcyhfdm0uY2FyZC5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNhcmQtbnVtYmVyXCJ9LFtfdm0uX2woKFsxLDEsMV0pLGZ1bmN0aW9uKGkpe3JldHVybiBfYygnc3BhbicsW192bS5fdihcIlhYWFhcIildKX0pLF92bS5fdihcIiBcIiksX2MoJ3NwYW4nLFtfdm0uX3YoX3ZtLl9zKF92bS5jYXJkLmxhc3RGb3VyKSldKV0sMiksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZXhwaXJhdGlvblwifSxbX3ZtLl9tKDApLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZGF0ZVwifSxbX3ZtLl92KF92bS5fcyhfdm0uY2FyZC5leHBpcmF0aW9uKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImlkZW50aXR5XCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJmdWxsLW5hbWVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmNhcmQuaWRlbnRpdHkoKS5mdWxsbmFtZSgpKSldKV0pXSldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZhbGlkLXVudGlsXCJ9LFtfdm0uX3YoXCJWQUxJRFwiKSxfYygnYnInKSxfdm0uX3YoXCJVTlRJTFwiKV0pfV1cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cImNhcmRcIiBAY2xpY2s9XCIkZW1pdCgnY2xpY2tlZCcsIGNhcmQpXCI+XHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cImhlYWRcIj5cclxuXHRcdFx0PENyZWRpdENhcmRJY29uIGNsYXNzPVwic3ltYm9sXCIgLz5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8QnV0dG9uIHYtaWY9XCIhYXNTZWxlY3RvclwiIGNsYXNzPVwiZGVsZXRlXCIgaWNvbj1cImljb24tdHJhc2hcIiAvPlxyXG5cdFx0PEJ1dHRvbiB2LWlmPVwiYXNTZWxlY3RvclwiIGNsYXNzPVwiZGVsZXRlXCIgaWNvbj1cImZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwiIC8+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJpbmZvXCI+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJjYXJkLW5hbWVcIj57e2NhcmQubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdDxmaWd1cmUgY2xhc3M9XCJjYXJkLW51bWJlclwiPlxyXG5cdFx0XHRcdDxzcGFuIHYtZm9yPVwiaSBpbiBbMSwxLDFdXCI+WFhYWDwvc3Bhbj5cclxuXHRcdFx0XHQ8c3Bhbj57e2NhcmQubGFzdEZvdXJ9fTwvc3Bhbj5cclxuXHRcdFx0PC9maWd1cmU+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZXhwaXJhdGlvblwiPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJ2YWxpZC11bnRpbFwiPlZBTElEPGJyLz5VTlRJTDwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJkYXRlXCI+e3tjYXJkLmV4cGlyYXRpb259fTwvZmlndXJlPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaWRlbnRpdHlcIj5cclxuXHRcdFx0XHQ8IS0tPGZpZ3VyZSBjbGFzcz1cImlkLW5hbWVcIj57e2NhcmQuaWRlbnRpdHkoKS5uYW1lfX08L2ZpZ3VyZT4tLT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiZnVsbC1uYW1lXCI+e3tjYXJkLmlkZW50aXR5KCkuZnVsbG5hbWUoKX19PC9maWd1cmU+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwR2V0dGVyc30gZnJvbSAndnVleCc7XHJcblx0aW1wb3J0IENyZWRpdENhcmRJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Zncy9DcmVkaXRDYXJkJztcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydjYXJkJywgJ2FzU2VsZWN0b3InXSxcclxuXHRcdGNvbXBvbmVudHM6e0NyZWRpdENhcmRJY29ufSxcclxuXHRcdGNvbXB1dGVkOntcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblxyXG5cdFx0XHRdKSxcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQuY2FyZCB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHR3aWR0aDpjYWxjKDUwJSAtIDEwcHgpO1xyXG5cdFx0Ym94LXNoYWRvdzowIDFweCAzcHggJGJsdWUtc2hhZG93O1xyXG5cdFx0Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDUpO1xyXG5cdFx0cGFkZGluZzoxNXB4O1xyXG5cdFx0bWFyZ2luLWJvdHRvbToyMHB4O1xyXG5cdFx0aGVpZ2h0OjIwMHB4O1xyXG5cdFx0YmFja2dyb3VuZDokd2hpdGU7XHJcblx0XHRAbWVkaWEgKG1pbi13aWR0aDokYnJlYWtwb2ludC1sYXJnZS1kZXNrdG9wKXtcclxuXHRcdFx0d2lkdGg6Y2FsYygyNSUgLSAxMHB4KTtcclxuXHRcdH1cclxuXHRcdHRyYW5zaXRpb246YWxsIDAuMnMgZWFzZTtcclxuXHRcdHRyYW5zaXRpb24tcHJvcGVydHk6IGJveC1zaGFkb3c7XHJcblx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cclxuXHRcdC5oZWFkIHtcclxuXHRcdFx0ZmxleDoxO1xyXG5cclxuXHRcdFx0LnN5bWJvbCB7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDotNXB4O1xyXG5cdFx0XHRcdGhlaWdodDozMHB4O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LmluZm8ge1xyXG5cdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuXHRcdFx0LmNhcmQtbmFtZSB7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDo1cHg7XHJcblx0XHRcdFx0Zm9udC1zaXplOiAxOHB4O1xyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdCYuc21hbGwge1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiAkbWVkaXVtO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmNhcmQtbnVtYmVyIHtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOjJweDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRmb250LXNpemU6ICRtZWRpdW07XHJcblxyXG5cdFx0XHRcdHNwYW4ge1xyXG5cdFx0XHRcdFx0cGFkZGluZzowIDVweDtcclxuXHJcblx0XHRcdFx0XHQmOmZpcnN0LWNoaWxkIHtcclxuXHRcdFx0XHRcdFx0cGFkZGluZy1sZWZ0OjA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Jjpub3QoOmxhc3QtY2hpbGQpe1xyXG5cdFx0XHRcdFx0XHRjb2xvcjokZ3JleTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5leHBpcmF0aW9uIHtcclxuXHRcdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDoxMHB4O1xyXG5cclxuXHRcdFx0XHQudmFsaWQtdW50aWwge1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiAkdGlueTtcclxuXHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQuZGF0ZSB7XHJcblx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogJGxhcmdlO1xyXG5cdFx0XHRcdFx0cGFkZGluZy1sZWZ0OjEwcHg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQuaWRlbnRpdHkge1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6MjVweDtcclxuXHJcblxyXG5cdFx0XHRcdC5pZC1uYW1lIHtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogJHRpbnk7XHJcblx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5mdWxsLW5hbWUge1xyXG5cdFx0XHRcdFx0bWFyZ2luLXRvcDozcHg7XHJcblx0XHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5kZWxldGUge1xyXG5cdFx0XHRwb3NpdGlvbjphYnNvbHV0ZTtcclxuXHRcdFx0dG9wOjEwcHg7XHJcblx0XHRcdHJpZ2h0OjEwcHg7XHJcblx0XHRcdHRleHQtYWxpZ246cmlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Jjpob3ZlciB7XHJcblx0XHRcdGJveC1zaGFkb3c6MCA4cHggMThweCAkYmx1ZS1zaGFkb3c7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2FyZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzIwMmI1NjQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0NhcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0NhcmQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MzIwMmI1NjQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIzMjAyYjU2NFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhcmQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MzIwMmI1NjQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXJkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTMyMDJiNTY0JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNhcmRbZGF0YS12LTMyMDJiNTY0XXtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjt3aWR0aDpjYWxjKDUwJSAtIDEwcHgpO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoNywxNTUsMjMyLDAuMjMpO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjA1KTtwYWRkaW5nOjE1cHg7bWFyZ2luLWJvdHRvbToyMHB4O2hlaWdodDoyMDBweDtiYWNrZ3JvdW5kOiNmZmY7dHJhbnNpdGlvbjphbGwgMC4ycyBlYXNlO3RyYW5zaXRpb24tcHJvcGVydHk6Ym94LXNoYWRvdztkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufUBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpey5jYXJkW2RhdGEtdi0zMjAyYjU2NF17d2lkdGg6Y2FsYygyNSUgLSAxMHB4KX19LmNhcmQgLmhlYWRbZGF0YS12LTMyMDJiNTY0XXtmbGV4OjF9LmNhcmQgLmhlYWQgLnN5bWJvbFtkYXRhLXYtMzIwMmI1NjRde21hcmdpbi10b3A6LTVweDtoZWlnaHQ6MzBweH0uY2FyZCAuaW5mb1tkYXRhLXYtMzIwMmI1NjRde2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcn0uY2FyZCAuaW5mbyAuY2FyZC1uYW1lW2RhdGEtdi0zMjAyYjU2NF17bWFyZ2luLXRvcDo1cHg7Zm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6Ym9sZH0uY2FyZCAuaW5mbyAuY2FyZC1uYW1lLnNtYWxsW2RhdGEtdi0zMjAyYjU2NF17Zm9udC1zaXplOjEycHh9LmNhcmQgLmluZm8gLmNhcmQtbnVtYmVyW2RhdGEtdi0zMjAyYjU2NF17bWFyZ2luLXRvcDoycHg7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweH0uY2FyZCAuaW5mbyAuY2FyZC1udW1iZXIgc3BhbltkYXRhLXYtMzIwMmI1NjRde3BhZGRpbmc6MCA1cHh9LmNhcmQgLmluZm8gLmNhcmQtbnVtYmVyIHNwYW5bZGF0YS12LTMyMDJiNTY0XTpmaXJzdC1jaGlsZHtwYWRkaW5nLWxlZnQ6MH0uY2FyZCAuaW5mbyAuY2FyZC1udW1iZXIgc3BhbltkYXRhLXYtMzIwMmI1NjRdOm5vdCg6bGFzdC1jaGlsZCl7Y29sb3I6I2M4YzhjOH0uY2FyZCAuaW5mbyAuZXhwaXJhdGlvbltkYXRhLXYtMzIwMmI1NjRde2Rpc3BsYXk6ZmxleDttYXJnaW4tdG9wOjEwcHh9LmNhcmQgLmluZm8gLmV4cGlyYXRpb24gLnZhbGlkLXVudGlsW2RhdGEtdi0zMjAyYjU2NF17Zm9udC1zaXplOjlweDtmb250LXdlaWdodDpib2xkfS5jYXJkIC5pbmZvIC5leHBpcmF0aW9uIC5kYXRlW2RhdGEtdi0zMjAyYjU2NF17Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTRweDtwYWRkaW5nLWxlZnQ6MTBweH0uY2FyZCAuaW5mbyAuaWRlbnRpdHlbZGF0YS12LTMyMDJiNTY0XXttYXJnaW4tdG9wOjI1cHh9LmNhcmQgLmluZm8gLmlkZW50aXR5IC5pZC1uYW1lW2RhdGEtdi0zMjAyYjU2NF17Zm9udC1zaXplOjlweDtmb250LXdlaWdodDpib2xkfS5jYXJkIC5pbmZvIC5pZGVudGl0eSAuZnVsbC1uYW1lW2RhdGEtdi0zMjAyYjU2NF17bWFyZ2luLXRvcDozcHg7Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6Ym9sZH0uY2FyZCAuZGVsZXRlW2RhdGEtdi0zMjAyYjU2NF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwcHg7cmlnaHQ6MTBweDt0ZXh0LWFsaWduOnJpZ2h0fS5jYXJkW2RhdGEtdi0zMjAyYjU2NF06aG92ZXJ7Ym94LXNoYWRvdzowIDhweCAxOHB4IHJnYmEoNywxNTUsMjMyLDAuMjMpfVxcblwiLCBcIlwiXSk7XG4iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhcmQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MzIwMmI1NjQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJlYzM3OWQ0NlwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInB1cmNoYXNlXCJ9LFsoX3ZtLmNhblNob3dCYWNrKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJiYWNrXCIsb246e1wiY2xpY2tcIjpfdm0uYmFja319LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1sZWZ0LXNtYWxsXCJ9KV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5zdGF0ZSA9PT0gX3ZtLlNUQVRFUy5BTU9VTlQpP19jKCdzZWN0aW9uJyxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW192bS5fdihcIkhvdyBtdWNoIGRvIHlvdSB3YW50IHRvIGJ1eT9cIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInN1YnRpdGxlXCJ9LFtfdm0uX3YoXCJZb3UgY2FuIHB1cmNoYXNlIHVwIHRvICQxNTAgd2l0aG91dCBoYXZpbmcgdG8gZ28gdGhyb3VnaCBLWUMuXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYW1vdW50XCJ9LFtfYygnSW5wdXQnLHthdHRyczp7XCJ0ZXh0XCI6X3ZtLmFtb3VudCxcImNlbnRlcmVkXCI6XCIxXCIsXCJ0eXBlXCI6XCJudW1iZXJcIixcImJpZ1wiOlwiMVwiLFwicGxhY2Vob2xkZXJcIjpcIiQwLjAwXCJ9LG9uOntcImNoYW5nZWRcIjpmdW5jdGlvbiAoeCkgeyByZXR1cm4gX3ZtLmFtb3VudCA9IHg7IH19fSldLDEpLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIlNlbGVjdCBhIENhcmRcIixcImJpZ1wiOlwiMVwiLFwiYmx1ZVwiOlwiMVwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7X3ZtLnN0YXRlID0gX3ZtLlNUQVRFUy5TRUxFQ1RfQ0FSRH19fSldLDEpOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5zdGF0ZSA9PT0gX3ZtLlNUQVRFUy5TRUxFQ1RfQ0FSRCk/X2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbX3ZtLl92KFwiU2VsZWN0IGEgQ2FyZFwiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwic3VidGl0bGVcIn0sW192bS5fdihcIllvdSBjYW4gcHVyY2hhc2UgdXAgdG8gJDE1MCB3aXRob3V0IGhhdmluZyB0byBnbyB0aHJvdWdoIEtZQy5cIildKSxfdm0uX3YoXCIgXCIpLChfdm0uY2FyZCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNlbGVjdC1jYXJkXCJ9LFtfYygnQ2FyZCcse2F0dHJzOntcImFzLXNlbGVjdG9yXCI6XCIxXCIsXCJjYXJkXCI6X3ZtLmNhcmR9fSldLDEpOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjooXCJVc2UgXCIgKyAoX3ZtLmNhcmQubmFtZSkpLFwiYmlnXCI6XCIxXCIsXCJibHVlXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtfdm0uc3RhdGUgPSBfdm0uU1RBVEVTLlNFTEVDVF9BQ0NPVU5UfX19KV0sMSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnN0YXRlID09PSBfdm0uU1RBVEVTLlNFTEVDVF9BQ0NPVU5UICYmIF92bS5hY2NvdW50ICYmIF92bS50b2tlbik/X2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbX3ZtLl92KFwiU2VsZWN0IGEgVG9rZW4gYW5kIEFjY291bnRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInN1YnRpdGxlXCJ9LFtfdm0uX3YoXCJUaGlzIGlzIHRoZSB0b2tlbiB5b3Ugd2lsbCBnZXQgZm9yIHlvdXIgZmlhdCBjdXJyZW5jeS5cIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzZWxlY3QtcmVjaXBpZW50XCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3ggYWNjb3VudC1zZWxlY3RvclwiLG9uOntcImNsaWNrXCI6X3ZtLnNlbGVjdFRva2VuQW5kQWNjb3VudH19LFtfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmFjY291bnQuc2VuZGFibGUoKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuZXR3b3JrXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50Lm5ldHdvcmsoKS5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRva2VuXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50b2tlbi5zeW1ib2wpKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicHJpY2VcIn0sW192bS5fdihfdm0uX3MoX3ZtLnRva2VuLmZpYXRQcmljZSgpKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIn0pXSldKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZXN0aW1hdGVkLXRva2Vuc1wifSxbX3ZtLl92KFwiXFxuICAgICAgICAgICAgRXN0aW1hdGVkIFwiK192bS5fcyhfdm0udG9rZW4uc3ltYm9sKStcIjogXCIrX3ZtLl9zKHBhcnNlRmxvYXQoX3ZtLmFtb3VudC9fdm0udG9rZW4uZmlhdFByaWNlKGZhbHNlKSkudG9GaXhlZChfdm0udG9rZW4uZGVjaW1hbHMpKStcIlxcbiAgICAgICAgXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6KFwiQnV5ICRcIiArIF92bS5hbW91bnQgKyBcIiBvZiBcIiArICh0aGlzLnRva2VuLnN5bWJvbCkpLFwiYmlnXCI6XCIxXCIsXCJibHVlXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnB1cmNoYXNlKCRldmVudCl9fX0pXSwxKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuV09SS0lORyk/X2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbX3ZtLl92KFwiUGxlYXNlIFdhaXRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInN1YnRpdGxlXCJ9LFtfdm0uX3YoXCJUaGlzIGNhbiB0YWtlIGEgZmV3IG1pbnV0ZXMuXCIpXSksX3ZtLl92KFwiIFwiKSxfdm0uX20oMCldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uc3RhdGUgPT09IF92bS5TVEFURVMuQ09NUExFVEUpP19jKCdzZWN0aW9uJyxbX3ZtLl9tKDEpLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW192bS5fdihcIlN1Y2Nlc3MhXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJzdWJ0aXRsZVwifSxbX3ZtLl92KFwiWW91IGhhdmUgcHVyY2hhc2VkICRcIitfdm0uX3MoX3ZtLmFtb3VudCkrXCIgd29ydGggb2YgXCIrX3ZtLl9zKF92bS50b2tlbi5zeW1ib2wpK1wiIGZvciBcIitfdm0uX3MoX3ZtLmFjY291bnQuc2VuZGFibGUoKSkrXCIhXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOlwiQnV5IEFnYWluXCIsXCJiaWdcIjpcIjFcIixcImJsdWVcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe192bS5zdGF0ZSA9IF92bS5TVEFURVMuQU1PVU5UfX19KV0sMSk6X3ZtLl9lKCldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic3Bpbm5lclwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCJ9KV0pfSxmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImljb24gZm9udFwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tY2hlY2tcIn0pXSl9XVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwdXJjaGFzZVwiPlxyXG5cclxuICAgICAgICA8ZmlndXJlIGNsYXNzPVwiYmFja1wiIHYtaWY9XCJjYW5TaG93QmFja1wiIEBjbGljaz1cImJhY2tcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uLWxlZnQtc21hbGxcIj48L2k+XHJcbiAgICAgICAgPC9maWd1cmU+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLkFNT1VOVFwiPlxyXG4gICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGl0bGVcIj5Ib3cgbXVjaCBkbyB5b3Ugd2FudCB0byBidXk/PC9maWd1cmU+XHJcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJzdWJ0aXRsZVwiPllvdSBjYW4gcHVyY2hhc2UgdXAgdG8gJDE1MCB3aXRob3V0IGhhdmluZyB0byBnbyB0aHJvdWdoIEtZQy48L2ZpZ3VyZT5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYW1vdW50XCI+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXQgOnRleHQ9XCJhbW91bnRcIiB2LW9uOmNoYW5nZWQ9XCJ4ID0+IGFtb3VudCA9IHhcIiBjZW50ZXJlZD1cIjFcIiB0eXBlPVwibnVtYmVyXCIgYmlnPVwiMVwiIHBsYWNlaG9sZGVyPVwiJDAuMDBcIiAvPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8QnV0dG9uIEBjbGljay5uYXRpdmU9XCJzdGF0ZSA9IFNUQVRFUy5TRUxFQ1RfQ0FSRFwiIHRleHQ9XCJTZWxlY3QgYSBDYXJkXCIgYmlnPVwiMVwiIGJsdWU9XCIxXCIgLz5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLlNFTEVDVF9DQVJEXCI+XHJcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ0aXRsZVwiPlNlbGVjdCBhIENhcmQ8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInN1YnRpdGxlXCI+WW91IGNhbiBwdXJjaGFzZSB1cCB0byAkMTUwIHdpdGhvdXQgaGF2aW5nIHRvIGdvIHRocm91Z2ggS1lDLjwvZmlndXJlPlxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzZWxlY3QtY2FyZFwiIHYtaWY9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICA8Q2FyZCBhcy1zZWxlY3Rvcj1cIjFcIiA6Y2FyZD1cImNhcmRcIiAvPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8QnV0dG9uIEBjbGljay5uYXRpdmU9XCJzdGF0ZSA9IFNUQVRFUy5TRUxFQ1RfQUNDT1VOVFwiIDp0ZXh0PVwiYFVzZSAke2NhcmQubmFtZX1gXCIgYmlnPVwiMVwiIGJsdWU9XCIxXCIgLz5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLlNFTEVDVF9BQ0NPVU5UICYmIGFjY291bnQgJiYgdG9rZW5cIj5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInRpdGxlXCI+U2VsZWN0IGEgVG9rZW4gYW5kIEFjY291bnQ8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInN1YnRpdGxlXCI+VGhpcyBpcyB0aGUgdG9rZW4geW91IHdpbGwgZ2V0IGZvciB5b3VyIGZpYXQgY3VycmVuY3kuPC9maWd1cmU+XHJcblxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInNlbGVjdC1yZWNpcGllbnRcIj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImJveCBhY2NvdW50LXNlbGVjdG9yXCIgQGNsaWNrPVwic2VsZWN0VG9rZW5BbmRBY2NvdW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm5hbWVcIj57e2FjY291bnQuc2VuZGFibGUoKX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwibmV0d29ya1wiPnt7YWNjb3VudC5uZXR3b3JrKCkubmFtZX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidG9rZW5cIj57e3Rva2VuLnN5bWJvbH19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwicHJpY2VcIj57e3Rva2VuLmZpYXRQcmljZSgpfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIj48L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJlc3RpbWF0ZWQtdG9rZW5zXCI+XHJcbiAgICAgICAgICAgICAgICBFc3RpbWF0ZWQge3t0b2tlbi5zeW1ib2x9fToge3twYXJzZUZsb2F0KGFtb3VudC90b2tlbi5maWF0UHJpY2UoZmFsc2UpKS50b0ZpeGVkKHRva2VuLmRlY2ltYWxzKX19XHJcbiAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxCdXR0b24gQGNsaWNrLm5hdGl2ZT1cInB1cmNoYXNlXCIgOnRleHQ9XCJgQnV5ICQke2Ftb3VudH0gb2YgJHt0aGlzLnRva2VuLnN5bWJvbH1gXCIgYmlnPVwiMVwiIGJsdWU9XCIxXCIgLz5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCJzdGF0ZSA9PT0gU1RBVEVTLldPUktJTkdcIj5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInRpdGxlXCI+UGxlYXNlIFdhaXQ8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInN1YnRpdGxlXCI+VGhpcyBjYW4gdGFrZSBhIGZldyBtaW51dGVzLjwvZmlndXJlPlxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzcGlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24tc3BpbjQgYW5pbWF0ZS1zcGluXCI+PC9pPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICA8c2VjdGlvbiB2LWlmPVwic3RhdGUgPT09IFNUQVRFUy5DT01QTEVURVwiPlxyXG4gICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiaWNvbiBmb250XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24tY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidGl0bGVcIj5TdWNjZXNzITwvZmlndXJlPlxyXG4gICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwic3VidGl0bGVcIj5Zb3UgaGF2ZSBwdXJjaGFzZWQgJHt7YW1vdW50fX0gd29ydGggb2Yge3t0b2tlbi5zeW1ib2x9fSBmb3Ige3thY2NvdW50LnNlbmRhYmxlKCl9fSE8L2ZpZ3VyZT5cclxuXHJcbiAgICAgICAgICAgIDxCdXR0b24gQGNsaWNrLm5hdGl2ZT1cInN0YXRlID0gU1RBVEVTLkFNT1VOVFwiIHRleHQ9XCJCdXkgQWdhaW5cIiBiaWc9XCIxXCIgYmx1ZT1cIjFcIiAvPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPCEtLTxzZWN0aW9uIGNsYXNzPVwiaW5wdXRzXCI+LS0+XHJcbiAgICAgICAgICAgIDwhLS08SW5wdXQgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZD1cIjQ0NDRcIiBsYWJlbD1cIkNhcmQgTnVtYmVyXCIgLz4tLT5cclxuICAgICAgICAgICAgPCEtLTxzZWN0aW9uIGNsYXNzPVwic3BsaXQtaW5wdXRzXCI+LS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPElucHV0IGxhYmVsPVwiRXhwaXJhdGlvblwiIC8+LS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPElucHV0IGxhYmVsPVwiQ1ZWXCIgLz4tLT5cclxuICAgICAgICAgICAgPCEtLTwvc2VjdGlvbj4tLT5cclxuICAgICAgICA8IS0tPC9zZWN0aW9uPi0tPlxyXG5cclxuICAgIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcbiAgICBpbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJ0B3YWxsZXRwYWNrL2NvcmUvc3RvcmUvY29uc3RhbnRzJztcclxuICAgIGltcG9ydCBDcmVkaXRDYXJkIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9DcmVkaXRDYXJkXCI7XHJcbiAgICBpbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9taXNjL0NhcmRcIjtcclxuICAgIGltcG9ydCBQb3B1cFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3V0aWxpdHkvUG9wdXBTZXJ2aWNlXCI7XHJcbiAgICBpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG4gICAgLy8gaW1wb3J0IFB1cmNoYXNpbmdTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9jcmVkaXRjYXJkcy9QdXJjaGFzaW5nU2VydmljZVwiO1xyXG4gICAgcmVxdWlyZSgnLi4vc3R5bGVzL3RyYW5zZmVycy5zY3NzJyk7XHJcblxyXG4gICAgY29uc3QgU1RBVEVTID0ge1xyXG4gICAgXHRBTU9VTlQ6J2Ftb3VudCcsXHJcblx0ICAgIFNFTEVDVF9DQVJEOidzZWxlY3RDYXJkJyxcclxuXHQgICAgU0VMRUNUX0FDQ09VTlQ6J3NlbGVjdEFjY291bnQnLFxyXG5cdCAgICBXT1JLSU5HOid3b3JraW5nJyxcclxuXHQgICAgQ09NUExFVEU6J2NvbXBsZXRlJyxcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG5cdCAgICBjb21wb25lbnRzOiB7Q2FyZH0sXHJcblx0ICAgIGRhdGEoKXtyZXR1cm4ge1xyXG5cdFx0ICAgIFNUQVRFUyxcclxuICAgICAgICAgICAgc3RhdGU6U1RBVEVTLkFNT1VOVCxcclxuICAgICAgICAgICAgY2FyZDpudWxsLFxyXG5cdFx0ICAgIGFjY291bnQ6bnVsbCxcclxuXHRcdCAgICB0b2tlbjpudWxsLFxyXG5cdFx0ICAgIGFtb3VudDoxMCxcclxuICAgICAgICB9fSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoW1xyXG4gICAgICAgICAgICBcdCdpZGVudGl0aWVzJyxcclxuICAgICAgICAgICAgICAgICdhY2NvdW50cycsXHJcblxyXG4gICAgICAgICAgICBdKSxcclxuXHQgICAgICAgIHB1cmNoYXNhYmxlVG9rZW4oKXtcclxuXHRcdCAgICAgICAgcmV0dXJuIHRoaXMuYWNjb3VudC5uZXR3b3JrKCkuc3lzdGVtVG9rZW4oKTtcclxuXHQgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhblNob3dCYWNrKCl7XHJcbiAgICAgICAgICAgIFx0cmV0dXJuICh0aGlzLnN0YXRlID09PSBTVEFURVMuU0VMRUNUX0NBUkQgfHwgdGhpcy5zdGF0ZSA9PT0gU1RBVEVTLlNFTEVDVF9BQ0NPVU5UKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKXtcclxuXHQgICAgXHR0aGlzLmNhcmQgPSBDcmVkaXRDYXJkLmZyb21Kc29uKHtcclxuXHRcdFx0ICAgIGlkZW50aXR5SWQ6dGhpcy5pZGVudGl0aWVzWzBdLmlkLFxyXG5cdFx0XHQgICAgbmFtZTonVGVzdCBDYXJkJyxcclxuXHRcdFx0ICAgIGxhc3RGb3VyOicxMjM0JyxcclxuXHRcdFx0ICAgIGV4cGlyYXRpb246JzEyLzIwJyxcclxuXHRcdFx0ICAgIGNhcmRIYXNoOidhc2RsamtmYXNqa2xoZGZoYXNrbGpkZmhqa3NhbGhmZGpsaGFzbGpmaGxoYWtzZGZsa2onLFxyXG5cdFx0XHQgICAgc2VjdXJlOntcclxuXHRcdFx0ICAgIFx0Ly8gRHVtbXkgTW9vbnBheSBjYXJkXHJcblx0XHRcdFx0ICAgIG51bWJlcjonNDAxMjAwMTAzNzQ5MDAxNCcsXHJcblx0XHRcdFx0ICAgIGN2eDonMTIzJyxcclxuICAgICAgICAgICAgICAgICAgICBhdXRoVG9rZW5zOnt9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0ICAgIH0pXHJcblx0ICAgICAgICB0aGlzLmFjY291bnQgPSB0aGlzLmFjY291bnRzLmZpbHRlcih4ID0+IHgudG9rZW5zKCkubGVuZ3RoKVxyXG5cdFx0ICAgICAgICAuc29ydCgoYSxiKSA9PiBiLnRvdGFsRmlhdEJhbGFuY2UoKSAtIGEudG90YWxGaWF0QmFsYW5jZSgpKVswXTtcclxuXHQgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLnB1cmNoYXNhYmxlVG9rZW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuXHQgICAgICAgIGJhY2soKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAoKCkgPT4ge1xyXG5cdCAgICAgICAgICAgICAgICBzd2l0Y2godGhpcy5zdGF0ZSl7XHJcblx0XHQgICAgICAgICAgICAgICAgY2FzZSBTVEFURVMuU0VMRUNUX0NBUkQ6IHJldHVybiBTVEFURVMuQU1PVU5UO1xyXG5cdFx0ICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVTLlNFTEVDVF9BQ0NPVU5UOiByZXR1cm4gU1RBVEVTLlNFTEVDVF9DQVJEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gU1RBVEVTLkFNT1VOVDtcclxuXHQgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgfSxcclxuXHQgICAgICAgIHNlbGVjdFRva2VuQW5kQWNjb3VudCgpe1xyXG5cdFx0ICAgICAgICBQb3B1cFNlcnZpY2UucHVzaChQb3B1cC5zZWxlY3RBY2NvdW50KGFjY291bnQgPT4ge1xyXG5cdFx0XHQgICAgICAgIGlmKCFhY2NvdW50KSByZXR1cm47XHJcblx0XHRcdCAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcclxuXHRcdFx0ICAgICAgICB0aGlzLnRva2VuID0gdGhpcy5wdXJjaGFzYWJsZVRva2VuO1xyXG5cdFx0ICAgICAgICB9KSlcclxuXHQgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jIHB1cmNoYXNlKCl7XHJcblx0ICAgICAgICBcdHRoaXMuc3RhdGUgPSBTVEFURVMuV09SS0lORztcclxuXHJcblx0ICAgICAgICBcdC8vIGF3YWl0IFB1cmNoYXNpbmdTZXJ2aWNlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFB1cmNoYXNpbmdTZXJ2aWNlLnB1cmNoYXNlKHRoaXMuYW1vdW50LCB0aGlzLnRva2VuLCB0aGlzLmFjY291bnQsIHRoaXMuY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzJywgcmVzdWx0KTtcclxuXHJcblx0ICAgICAgICBcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdCAgICAgICAgXHRcdHRoaXMuc3RhdGUgPSBTVEFURVMuU0VMRUNUX0FDQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcbiAgICBAaW1wb3J0IFwiLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuICAgIC5wdXJjaGFzZSB7XHJcbiAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBoZWlnaHQ6JGZ1bGxoZWlnaHQ7XHJcbiAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAgIC5iYWNrIHtcclxuICAgICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDozMHB4O1xyXG4gICAgICAgICAgICBsZWZ0OjMwcHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNDhweDtcclxuICAgICAgICAgICAgY29sb3I6JGdyZXk7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgICAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6JGJsYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuaWNvbiB7XHJcbiAgICAgICAgICAgIHdpZHRoOjEyMHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6MTIwcHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjowIGF1dG87XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206MzBweDtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDotNTBweDtcclxuXHJcbiAgICAgICAgICAgICYuZm9udCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDo5MHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OjkwcHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OjAgMXB4IDJweCAkYmx1ZS1zaGFkb3csIDAgOHB4IDIwcHggJGJsdWUtc2hhZG93O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czo1MCU7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjokYmx1ZTtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206MjBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnRpdGxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbToxMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnN1YnRpdGxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAkc21hbGw7XHJcbiAgICAgICAgICAgIGNvbG9yOiRzaWx2ZXI7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206MzBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hbW91bnQge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNlbGVjdC1jYXJkIHtcclxuICAgICAgICAgICAgd2lkdGg6NDAwcHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246bGVmdDtcclxuXHJcbiAgICAgICAgICAgIC5jYXJkIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zZWxlY3QtcmVjaXBpZW50IHtcclxuICAgICAgICAgICAgd2lkdGg6NTAwcHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246bGVmdDtcclxuXHJcbiAgICAgICAgICAgIC5ib3gge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmVzdGltYXRlZC10b2tlbnMge1xyXG4gICAgICAgICAgICBmb250LXNpemU6ICRzbWFsbDtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDoxMHB4O1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgICAgY29sb3I6JGJsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc3Bpbm5lciB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6MzBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiA2NHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHVyY2hhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHVyY2hhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9QdXJjaGFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzE3MWU3NTcmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHVyY2hhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9QdXJjaGFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUHVyY2hhc2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MzE3MWU3NTcmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMzE3MWU3NTdcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1B1cmNoYXNlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTMxNzFlNzU3JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjYyYWJjNGIzXCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5wdXJjaGFzZVtkYXRhLXYtMzE3MWU3NTdde2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OmNhbGMoMTAwdmggLSAwcHgpO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmV9LnB1cmNoYXNlIC5iYWNrW2RhdGEtdi0zMTcxZTc1N117cG9zaXRpb246YWJzb2x1dGU7dG9wOjMwcHg7bGVmdDozMHB4O2ZvbnQtc2l6ZTo0OHB4O2NvbG9yOiNjOGM4Yzg7Y3Vyc29yOnBvaW50ZXJ9LnB1cmNoYXNlIC5iYWNrW2RhdGEtdi0zMTcxZTc1N106aG92ZXJ7Y29sb3I6IzMzM30ucHVyY2hhc2UgLmljb25bZGF0YS12LTMxNzFlNzU3XXt3aWR0aDoxMjBweDtoZWlnaHQ6MTIwcHg7bWFyZ2luOjAgYXV0bzttYXJnaW4tYm90dG9tOjMwcHg7bWFyZ2luLXRvcDotNTBweH0ucHVyY2hhc2UgLmljb24uZm9udFtkYXRhLXYtMzE3MWU3NTdde3dpZHRoOjkwcHg7aGVpZ2h0OjkwcHg7Zm9udC1zaXplOjQ4cHg7Ym94LXNoYWRvdzowIDFweCAycHggcmdiYSg3LDE1NSwyMzIsMC4yMyksMCA4cHggMjBweCByZ2JhKDcsMTU1LDIzMiwwLjIzKTtib3JkZXItcmFkaXVzOjUwJTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7Y29sb3I6IzA3OTlmZjttYXJnaW4tYm90dG9tOjIwcHh9LnB1cmNoYXNlIC50aXRsZVtkYXRhLXYtMzE3MWU3NTdde2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7bWFyZ2luLWJvdHRvbToxMHB4fS5wdXJjaGFzZSAuc3VidGl0bGVbZGF0YS12LTMxNzFlNzU3XXtmb250LXNpemU6MTBweDtjb2xvcjojN2E3YTdhO21hcmdpbi1ib3R0b206MzBweH0ucHVyY2hhc2UgLnNlbGVjdC1jYXJkW2RhdGEtdi0zMTcxZTc1N117d2lkdGg6NDAwcHg7dGV4dC1hbGlnbjpsZWZ0fS5wdXJjaGFzZSAuc2VsZWN0LWNhcmQgLmNhcmRbZGF0YS12LTMxNzFlNzU3XXt3aWR0aDoxMDAlfS5wdXJjaGFzZSAuc2VsZWN0LXJlY2lwaWVudFtkYXRhLXYtMzE3MWU3NTdde3dpZHRoOjUwMHB4O3RleHQtYWxpZ246bGVmdH0ucHVyY2hhc2UgLnNlbGVjdC1yZWNpcGllbnQgLmJveFtkYXRhLXYtMzE3MWU3NTdde3dpZHRoOjEwMCV9LnB1cmNoYXNlIC5lc3RpbWF0ZWQtdG9rZW5zW2RhdGEtdi0zMTcxZTc1N117Zm9udC1zaXplOjEwcHg7bWFyZ2luLXRvcDoxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6IzA3OTlmZn0ucHVyY2hhc2UgLnNwaW5uZXJbZGF0YS12LTMxNzFlNzU3XXtwYWRkaW5nOjMwcHg7Zm9udC1zaXplOjY0cHh9XFxuXCIsIFwiXCJdKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=