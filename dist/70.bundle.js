(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "GBVr":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("iAhP");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("34fc9f18", content, true, {});

/***/ }),

/***/ "HVo+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Exchange_vue_vue_type_style_index_0_id_3fe7dbfa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("GBVr");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Exchange_vue_vue_type_style_index_0_id_3fe7dbfa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Exchange_vue_vue_type_style_index_0_id_3fe7dbfa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Exchange_vue_vue_type_style_index_0_id_3fe7dbfa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "LHAq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Exchange.vue?vue&type=template&id=3fe7dbfa&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[(_vm.account && _vm.token && _vm.toSend)?_c('section',{staticClass:"exchange"},[_c('section',{staticClass:"scroller"},[_c('section',{staticClass:"greyback"},[_c('section',{staticClass:"limit-width"},[_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box-container"},[_c('label',[_vm._v("From & Token")]),_vm._v(" "),_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.account.network().name))]),_vm._v(" "),_c('figure',{staticClass:"token"},[_vm._v(_vm._s(_vm.token.amount)+" "+_vm._s(_vm.token.symbol))]),_vm._v(" "),_c('figure',{staticClass:"price"},[_vm._v(_vm._s(_vm.token.fiatPrice()))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])]),_vm._v(" "),_c('section',{staticClass:"box-container"},[_c('label',[_vm._v("Receiver")]),_vm._v(" "),_c('section',{staticClass:"box nested"},[_c('section',{staticClass:"padded recipient-selector",on:{"click":_vm.selectRecipient}},[_c('figure',{staticClass:"name"},[_vm._v("Contacts")]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})]),_vm._v(" "),_c('figure',{staticClass:"line"}),_vm._v(" "),_c('section',{staticClass:"input-container"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.recipient),expression:"recipient"}],staticClass:"input",attrs:{"placeholder":"Address / Account"},domProps:{"value":(_vm.recipient)},on:{"input":function($event){if($event.target.composing){ return; }_vm.recipient=$event.target.value}}})])])])])])]),_vm._v(" "),_c('section',{staticClass:"whiteback"},[_c('section',{staticClass:"limit-width"},[_c('section',{staticClass:"boxes",staticStyle:{"margin":"0"}},[_c('section',{staticClass:"box",class:{'not-allowed':!_vm.rate}},[_c('section',{staticClass:"input-container"},[_c('figure',{staticClass:"label"},[_vm._v(_vm._s(_vm.token.truncatedSymbol()))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.toSend.amount),expression:"toSend.amount"}],staticClass:"input",attrs:{"disabled":!_vm.rate,"placeholder":"0.00"},domProps:{"value":(_vm.toSend.amount)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.toSend, "amount", $event.target.value)},_vm.changedAmount]}})]),_vm._v(" "),_c('figure',{staticClass:"line"}),_vm._v(" "),_c('section',{staticClass:"input-container"},[_c('figure',{staticClass:"label"},[_vm._v(_vm._s(_vm.displayCurrency))]),_vm._v(" "),(_vm.toSend.fiatPrice())?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fiat),expression:"fiat"}],staticClass:"input",attrs:{"disabled":!_vm.rate,"placeholder":"0.00"},domProps:{"value":(_vm.fiat)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.fiat=$event.target.value},_vm.changedFiat]}}):_c('figure',{staticClass:"input not-available"},[_vm._v("Price not available")])])]),_vm._v(" "),(_vm.loadingPairs)?_c('section',{staticClass:"box account-selector"},[_vm._m(0),_vm._v(" "),_vm._m(1)]):_vm._e(),_vm._v(" "),(!_vm.loadingPairs)?_c('section',{staticClass:"box account-selector",on:{"click":_vm.selectToken}},[(!_vm.pair)?_c('section',{staticClass:"symbol icon-attention-circled"}):(_vm.loadingRate)?_c('section',{staticClass:"symbol"},[_c('i',{staticClass:"icon-spin4 animate-spin"})]):_c('section',{staticClass:"symbol"},[_c('TokenSymbol',{attrs:{"token":_vm.pair}})],1),_vm._v(" "),(!_vm.pair)?_c('section',[(_vm.pairs.length)?_c('figure',{staticClass:"name"},[_vm._v("Select a Token")]):_c('figure',{staticClass:"name"},[_vm._v("No pairs found")])]):_vm._e(),_vm._v(" "),(_vm.pair)?_c('section',[(!_vm.loadingRate)?_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.estimatedAmount))]):_vm._e(),_vm._v(" "),(_vm.loadingRate)?_c('figure',{staticClass:"name"},[_vm._v("Loading Rate")]):_vm._e(),_vm._v(" "),(_vm.pair)?_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.pair.symbol))]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.pairs.length)?_c('figure',{staticClass:"chevron fas fa-caret-square-down"}):_vm._e()]):_vm._e()])])])]),_vm._v(" "),_c('section',{staticClass:"tail"},[_c('Button',{attrs:{"disabled":!_vm.canExchange,"big":"1","text":"Exchange","blue":"1"},nativeOn:{"click":function($event){return _vm.exchange($event)}}})],1)]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"symbol"},[_c('i',{staticClass:"icon-spin4 animate-spin"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('figure',{staticClass:"name"},[_vm._v("Loading Pairs")]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v("Please wait")])])}]


// CONCATENATED MODULE: ./src/views/Exchange.vue?vue&type=template&id=3fe7dbfa&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/BalanceService.js
var BalanceService = __webpack_require__("KLk5");
var BalanceService_default = /*#__PURE__*/__webpack_require__.n(BalanceService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apis/PriceService.js
var PriceService = __webpack_require__("TmN8");
var PriceService_default = /*#__PURE__*/__webpack_require__.n(PriceService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Token.js
var Token = __webpack_require__("GwxU");
var Token_default = /*#__PURE__*/__webpack_require__.n(Token);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apis/ExchangeService.js
var ExchangeService = __webpack_require__("l31u");
var ExchangeService_default = /*#__PURE__*/__webpack_require__.n(ExchangeService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/utility/TokenService.js
var TokenService = __webpack_require__("ONSl");
var TokenService_default = /*#__PURE__*/__webpack_require__.n(TokenService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/TransferService.js
var TransferService = __webpack_require__("M1Dr");
var TransferService_default = /*#__PURE__*/__webpack_require__.n(TransferService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/histories/HistoricExchange.js
var HistoricExchange = __webpack_require__("GGPC");
var HistoricExchange_default = /*#__PURE__*/__webpack_require__.n(HistoricExchange);

// EXTERNAL MODULE: ./src/components/reusable/TokenSymbol.vue + 4 modules
var TokenSymbol = __webpack_require__("AZxv");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Exchange.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













__webpack_require__("8olR");

/* harmony default export */ var Exchangevue_type_script_lang_js_ = ({
	components: {TokenSymbol: TokenSymbol["a" /* default */]},
	data(){return {
		account:null,
		recipient:null,
		memo:'',

		token:null,
		toSend:null,
		fiat:0,

		sending:false,

		rawPairs:[],
		pairs:[],
		pair:null,
		rate:null,
		loadingPairs:false,
		loadingRate:false,

	}},
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'history',
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'accounts',
			'displayCurrency'
		]),
		sendableTokens(){
			return this.account.tokens().filter(x => !x.unusable).sort((a,b) => {
				return Token_default.a.sorter(a,b);
			});
		},
		canExchange(){
			return !!this.rate &&
				!!this.pair &&
				!this.sending &&
				this.recipient &&
				this.toSend.amount > 0 &&
				(this.rate.min === null || this.rate.min <= this.estimatedAmount) &&
				(this.rate.max === null || this.rate.max >= this.estimatedAmount)
		},
		estimatedAmount(){
			if(!this.rate) return 0;
			if(!this.pair) return 0;
			return parseFloat(this.rate.rate * this.toSend.amount).toFixed(this.pair.decimals);
		},
		rawPair(){
			if(!this.pair) return;
			return this.rawPairs.find(x => x.token.id === this.pair.id);
		}
	},
	mounted(){
		const history = this.$route.query.history ? this.history.find(x => x.id === this.$route.query.history) : null;
		if(history){
			setTimeout(async () => {
				this.account = history.from;
				this.recipient = history.to;
				this.setToken(history.fromToken);
				await this.getPairs();
				if(this.rawPairs.length){
					const pair = this.rawPairs.find(x => x.token.uniqueWithChain() === history.toToken.uniqueWithChain());
					if(pair) this.setPair(pair.token);
				}
			})
			return;
		}

		if(this.$route.query.account){
			this.account = this.accounts.find(x => x.identifiable() === this.$route.query.account);

			if(this.$route.query.token){
				const token = this.account.tokens().find(x => x.uniqueWithChain() === this.$route.query.token);
				this.setToken(token);
				this.recipient = this.account.sendable();
				return;
			}
		}

		if(!this.account){
			this.account = this.accounts.filter(x => x.tokens().length)
				.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0];
		}

		this.recipient = this.account.sendable();
		this.setToken(this.sendableTokens[0]);
	},
	methods:{
		selectTokenAndAccount(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectTokenAndAccount(result => {
				if(!result) return;
				const {token, account} = result;
				this.account = account;
				this.setToken(token);

				this.recipient = this.account.sendable();
			}))
		},
		selectRecipient(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectRecipient(this.account ? this.account.blockchain() : null, recipient => {
				if(!recipient) return;
				this.recipient = recipient;
			}));
		},
		selectToken(){
			if(!this.pairs.length) return;
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectToken(this.pairs, token => {
				if(!token) return;
				this.setPair(token.clone());
			}))
		},
		setToken(token){
			PriceService_default.a.setPrices();
			this.token = this.account.tokens().find(x => x.uniqueWithChain() === token.uniqueWithChain()).clone();
			this.toSend = this.token.clone();
			this.toSend.amount = 0;
			this.fiat = 0;
			this.rate = null;
			this.pair = null;
			// this.recipient = null;
		},
		changedFiat(){
			this.toSend.amount = parseFloat(this.fiat / this.toSend.fiatPrice(false)).toFixed(this.toSend.decimals);
		},
		changedAmount(){
			this.fiat = !this.toSend.amount || this.toSend.amount === '' ? null : this.toSend.fiatBalance(false)
		},







		cantConnect(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].prompt(
				this.locale(this.langKeys.EXCHANGE.ExchangeError),
				this.locale(this.langKeys.EXCHANGE.CantConnect)
			));
			this.$router.push({name:this.RouteNames.HOME});
		},
		setPair(pair){
			this.pair = pair;
			this.getRate();
		},

		async getPairs(){
			this.pair = null;
			this.pairs = {};
			this.loadingPairs = true;
			let pairs = await ExchangeService_default.a.pairs(this.token);
			let {base, stable, eth, eos, trx} = pairs;

			this.rawPairs = Object.keys(pairs).reduce((acc,key) => {
				acc = acc.concat(pairs[key]);
				return acc;
			}, []);

			if(!pairs) {
				this.cantConnect();
			} else {

				let categories = [];

				let bases = [];
				if(base) bases = bases.concat(base.map(x => x.token));
				if(stable) bases = bases.concat(stable.map(x => x.token));
				if(bases.length) categories.push({ tokens:bases })

				const swaps = [eth,eos,trx].filter(x => !!x).reduce((acc,x) => {
					x.map(t => acc.push(t.token));
					return acc;
				}, []);
				if(swaps.length) categories.push({ tokens:swaps });

				this.pairs = categories;
			}
			if(!this.rawPairs.length) this.rate = null;
			if(this.rawPairs.length === 1) this.setPair(this.rawPairs[0].token);
			this.loadingPairs = false;
			return true;
		},
		async getRate(){
			this.loadingRate = true;
			this.rate = null;
			this.rate = await ExchangeService_default.a.rate(this.token, this.rawPair.symbol, this.rawPair.service);
			this.loadingRate = false;
		},




		async exchange(){
			if(!this.canExchange) return;
			this.sending = true;
			const from = { account:this.account.sendable() };
			const to = { account:this.recipient };
			const amount = this.toSend.amount;
			const order = await ExchangeService_default.a.order(this.rawPair.service, this.token, this.pair.symbol, amount, from, to);

			if(!order) {
				this.cantConnect();
				this.sending = false;
				return;
			}
			const accounts = {
				from:from.account,
				to:to.account,
			}
			const symbols = {
				from:this.token.symbol,
				to:this.pair.symbol
			}

			ExchangeService_default.a.accepted(order.id);
			const sent = await TransferService_default.a[this.account.blockchain()]({
				account:this.account,
				recipient:order.account,
				amount,
				memo:order.memo,
				token:this.token,
				promptForSignature:false,
				bypassHistory:true,
			}).catch(() => false);
			if(sent){

				PopupService["a" /* default */].push(Popup["a" /* Popup */].transactionSuccess(this.token.blockchain, TransferService_default.a.getTransferId(sent, this.token.blockchain)));


				if(!TokenService_default.a.hasToken(this.rawPair.token)){
					if(!!this.rawPair.token.contract && !!this.rawPair.token.contract.length) {
						await TokenService_default.a.addToken(this.rawPair.token, false, false);
					}
				}
				const history = new HistoricExchange_default.a(this.account, this.recipient, this.toSend, this.pair, order, TransferService_default.a.getTransferId(sent, this.token.blockchain));
				this[constants["DELTA_HISTORY"]](history);
				setTimeout(() => {
					ExchangeService_default.a.watch(history);
					BalanceService_default.a.loadBalancesFor(this.account);
				}, 1000);
			}
			this.sending = false;
		},


		...Object(vuex_esm["b" /* mapActions */])([
			constants["DELTA_HISTORY"]
		])
	},
	watch:{
		['token.symbol'](){
			this.getPairs();
		}
	},
});

// CONCATENATED MODULE: ./src/views/Exchange.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Exchangevue_type_script_lang_js_ = (Exchangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Exchange.vue?vue&type=style&index=0&id=3fe7dbfa&scoped=true&lang=scss&
var Exchangevue_type_style_index_0_id_3fe7dbfa_scoped_true_lang_scss_ = __webpack_require__("HVo+");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Exchange.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Exchangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3fe7dbfa",
  null
  
)

/* harmony default export */ var Exchange = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "iAhP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, "", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRXhjaGFuZ2UudnVlPzNmYTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0V4Y2hhbmdlLnZ1ZT84MzAwIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9FeGNoYW5nZS52dWU/YWEyNyIsIndlYnBhY2s6Ly8vc3JjL3ZpZXdzL0V4Y2hhbmdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRXhjaGFuZ2UudnVlP2FkZDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0V4Y2hhbmdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRXhjaGFuZ2UudnVlPzlkNzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUE2UjtBQUNuVCw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7OztBQ1I5QztBQUFBO0FBQUE7QUFBMlYsQ0FBZ0IsdVpBQUcsRUFBQyxDOzs7Ozs7Ozs7OztBQ0EvVywwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLDRFQUE0RSx1QkFBdUIsZ0JBQWdCLHVCQUF1QixnQkFBZ0IsdUJBQXVCLGdCQUFnQiwwQkFBMEIsZ0JBQWdCLG9CQUFvQixnQkFBZ0IsNEJBQTRCLGlFQUFpRSw4Q0FBOEMsbUNBQW1DLDZCQUE2QixtQkFBbUIsb0VBQW9FLHNCQUFzQix3RUFBd0Usb0JBQW9CLDJGQUEyRixvQkFBb0IscUVBQXFFLCtDQUErQyxnQ0FBZ0MsNEJBQTRCLDZEQUE2RCx5QkFBeUIsZ0JBQWdCLDRDQUE0Qyw2QkFBNkIsZUFBZSxtQkFBbUIsZ0RBQWdELCtDQUErQyw2QkFBNkIsbUJBQW1CLDRCQUE0Qiw4QkFBOEIsY0FBYyxhQUFhLDRFQUE0RSw2QkFBNkIsa0NBQWtDLFdBQVcsd0JBQXdCLEtBQUsseUJBQXlCLDRCQUE0QixRQUFRLEVBQUUsb0NBQW9DLHdDQUF3Qyx3QkFBd0IsZ0JBQWdCLDBCQUEwQixnQkFBZ0IsaUNBQWlDLGNBQWMsZ0JBQWdCLHlCQUF5Qix5QkFBeUIsZ0JBQWdCLDhCQUE4QixlQUFlLG9CQUFvQix3RUFBd0UsYUFBYSxvRkFBb0YsNkJBQTZCLDBDQUEwQyxXQUFXLDRCQUE0QixLQUFLLDBCQUEwQiw0QkFBNEIsUUFBUSxFQUFFLG9EQUFvRCxxQkFBcUIsNkJBQTZCLG1CQUFtQiw0QkFBNEIsOEJBQThCLGVBQWUsb0JBQW9CLHlGQUF5RixhQUFhLGtFQUFrRSw2QkFBNkIsMENBQTBDLFdBQVcsbUJBQW1CLEtBQUssMEJBQTBCLDRCQUE0QixRQUFRLEVBQUUsNkJBQTZCLG1CQUFtQixlQUFlLGtDQUFrQyxtRkFBbUYsbUNBQW1DLDJGQUEyRix1Q0FBdUMseUJBQXlCLDRCQUE0Qiw0Q0FBNEMsa0NBQWtDLHFCQUFxQixVQUFVLHNDQUFzQyxrQkFBa0IscUJBQXFCLG9CQUFvQixPQUFPLGtCQUFrQiw0RUFBNEUsbUJBQW1CLDBDQUEwQyxtQkFBbUIsNkdBQTZHLG1CQUFtQiw0RkFBNEYsbUJBQW1CLHdFQUF3RSxzQkFBc0Isb0dBQW9HLCtDQUErQyx3REFBd0QsbUJBQW1CLGVBQWUsT0FBTyxtRUFBbUUsV0FBVyx5QkFBeUIsOEJBQThCO0FBQzczSSxvQ0FBb0MsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQixxQkFBcUIsVUFBVSxzQ0FBc0MsSUFBSSxjQUFjLGFBQWEsMEJBQTBCLHdCQUF3QixrQ0FBa0MsbUJBQW1CLHFEQUFxRCxzQkFBc0IsNEJBQTRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMEgxYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hZMkgsQ0FBZ0IsMkdBQUcsRUFBQyxDOzs7Ozs7OztBQ0E1QztBQUN2QztBQUNMO0FBQ3NDOzs7QUFHN0Y7QUFDMEY7QUFDMUYsZ0JBQWdCLDhDQUFVO0FBQzFCLEVBQUUsc0NBQU07QUFDUixFQUFFLE1BQU07QUFDUixFQUFFLGVBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsK0Y7Ozs7Ozs7QUNuQmYsMkJBQTJCLG1CQUFPLENBQUMsTUFBbUQ7QUFDdEY7QUFDQSxjQUFjLFFBQVMiLCJmaWxlIjoiNzAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FeGNoYW5nZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zZmU3ZGJmYSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjM0ZmM5ZjE4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FeGNoYW5nZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zZmU3ZGJmYSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0V4Y2hhbmdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTNmZTdkYmZhJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyxbKF92bS5hY2NvdW50ICYmIF92bS50b2tlbiAmJiBfdm0udG9TZW5kKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZXhjaGFuZ2VcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzY3JvbGxlclwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImdyZXliYWNrXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibGltaXQtd2lkdGhcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hlc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveC1jb250YWluZXJcIn0sW19jKCdsYWJlbCcsW192bS5fdihcIkZyb20gJiBUb2tlblwiKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveCBuZXN0ZWQgYWNjb3VudC1zZWxlY3RvclwiLG9uOntcImNsaWNrXCI6X3ZtLnNlbGVjdFRva2VuQW5kQWNjb3VudH19LFtfYygnc2VjdGlvbicsW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmFjY291bnQuc2VuZGFibGUoKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuZXR3b3JrXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50Lm5ldHdvcmsoKS5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRva2VuXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50b2tlbi5hbW91bnQpK1wiIFwiK192bS5fcyhfdm0udG9rZW4uc3ltYm9sKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInByaWNlXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50b2tlbi5maWF0UHJpY2UoKSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94LWNvbnRhaW5lclwifSxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiUmVjZWl2ZXJcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3ggbmVzdGVkXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicGFkZGVkIHJlY2lwaWVudC1zZWxlY3RvclwiLG9uOntcImNsaWNrXCI6X3ZtLnNlbGVjdFJlY2lwaWVudH19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoXCJDb250YWN0c1wiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIn0pXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJsaW5lXCJ9KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbnB1dC1jb250YWluZXJcIn0sW19jKCdpbnB1dCcse2RpcmVjdGl2ZXM6W3tuYW1lOlwibW9kZWxcIixyYXdOYW1lOlwidi1tb2RlbFwiLHZhbHVlOihfdm0ucmVjaXBpZW50KSxleHByZXNzaW9uOlwicmVjaXBpZW50XCJ9XSxzdGF0aWNDbGFzczpcImlucHV0XCIsYXR0cnM6e1wicGxhY2Vob2xkZXJcIjpcIkFkZHJlc3MgLyBBY2NvdW50XCJ9LGRvbVByb3BzOntcInZhbHVlXCI6KF92bS5yZWNpcGllbnQpfSxvbjp7XCJpbnB1dFwiOmZ1bmN0aW9uKCRldmVudCl7aWYoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpeyByZXR1cm47IH1fdm0ucmVjaXBpZW50PSRldmVudC50YXJnZXQudmFsdWV9fX0pXSldKV0pXSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIndoaXRlYmFja1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImxpbWl0LXdpZHRoXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIixzdGF0aWNTdHlsZTp7XCJtYXJnaW5cIjpcIjBcIn19LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94XCIsY2xhc3M6eydub3QtYWxsb3dlZCc6IV92bS5yYXRlfX0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbnB1dC1jb250YWluZXJcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxhYmVsXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50b2tlbi50cnVuY2F0ZWRTeW1ib2woKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnaW5wdXQnLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTooX3ZtLnRvU2VuZC5hbW91bnQpLGV4cHJlc3Npb246XCJ0b1NlbmQuYW1vdW50XCJ9XSxzdGF0aWNDbGFzczpcImlucHV0XCIsYXR0cnM6e1wiZGlzYWJsZWRcIjohX3ZtLnJhdGUsXCJwbGFjZWhvbGRlclwiOlwiMC4wMFwifSxkb21Qcm9wczp7XCJ2YWx1ZVwiOihfdm0udG9TZW5kLmFtb3VudCl9LG9uOntcImlucHV0XCI6W2Z1bmN0aW9uKCRldmVudCl7aWYoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpeyByZXR1cm47IH1fdm0uJHNldChfdm0udG9TZW5kLCBcImFtb3VudFwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKX0sX3ZtLmNoYW5nZWRBbW91bnRdfX0pXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJsaW5lXCJ9KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbnB1dC1jb250YWluZXJcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxhYmVsXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5kaXNwbGF5Q3VycmVuY3kpKV0pLF92bS5fdihcIiBcIiksKF92bS50b1NlbmQuZmlhdFByaWNlKCkpP19jKCdpbnB1dCcse2RpcmVjdGl2ZXM6W3tuYW1lOlwibW9kZWxcIixyYXdOYW1lOlwidi1tb2RlbFwiLHZhbHVlOihfdm0uZmlhdCksZXhwcmVzc2lvbjpcImZpYXRcIn1dLHN0YXRpY0NsYXNzOlwiaW5wdXRcIixhdHRyczp7XCJkaXNhYmxlZFwiOiFfdm0ucmF0ZSxcInBsYWNlaG9sZGVyXCI6XCIwLjAwXCJ9LGRvbVByb3BzOntcInZhbHVlXCI6KF92bS5maWF0KX0sb246e1wiaW5wdXRcIjpbZnVuY3Rpb24oJGV2ZW50KXtpZigkZXZlbnQudGFyZ2V0LmNvbXBvc2luZyl7IHJldHVybjsgfV92bS5maWF0PSRldmVudC50YXJnZXQudmFsdWV9LF92bS5jaGFuZ2VkRmlhdF19fSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiaW5wdXQgbm90LWF2YWlsYWJsZVwifSxbX3ZtLl92KFwiUHJpY2Ugbm90IGF2YWlsYWJsZVwiKV0pXSldKSxfdm0uX3YoXCIgXCIpLChfdm0ubG9hZGluZ1BhaXJzKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94IGFjY291bnQtc2VsZWN0b3JcIn0sW192bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF92bS5fbSgxKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKCFfdm0ubG9hZGluZ1BhaXJzKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94IGFjY291bnQtc2VsZWN0b3JcIixvbjp7XCJjbGlja1wiOl92bS5zZWxlY3RUb2tlbn19LFsoIV92bS5wYWlyKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic3ltYm9sIGljb24tYXR0ZW50aW9uLWNpcmNsZWRcIn0pOihfdm0ubG9hZGluZ1JhdGUpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzeW1ib2xcIn0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwifSldKTpfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic3ltYm9sXCJ9LFtfYygnVG9rZW5TeW1ib2wnLHthdHRyczp7XCJ0b2tlblwiOl92bS5wYWlyfX0pXSwxKSxfdm0uX3YoXCIgXCIpLCghX3ZtLnBhaXIpP19jKCdzZWN0aW9uJyxbKF92bS5wYWlycy5sZW5ndGgpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5hbWVcIn0sW192bS5fdihcIlNlbGVjdCBhIFRva2VuXCIpXSk6X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KFwiTm8gcGFpcnMgZm91bmRcIildKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wYWlyKT9fYygnc2VjdGlvbicsWyghX3ZtLmxvYWRpbmdSYXRlKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5lc3RpbWF0ZWRBbW91bnQpKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5sb2FkaW5nUmF0ZSk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KFwiTG9hZGluZyBSYXRlXCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnBhaXIpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5ldHdvcmtcIn0sW192bS5fdihfdm0uX3MoX3ZtLnBhaXIuc3ltYm9sKSldKTpfdm0uX2UoKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wYWlycy5sZW5ndGgpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KTpfdm0uX2UoKV0pOl92bS5fZSgpXSldKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwidGFpbFwifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcImRpc2FibGVkXCI6IV92bS5jYW5FeGNoYW5nZSxcImJpZ1wiOlwiMVwiLFwidGV4dFwiOlwiRXhjaGFuZ2VcIixcImJsdWVcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uZXhjaGFuZ2UoJGV2ZW50KX19fSldLDEpXSk6X3ZtLl9lKCldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic3ltYm9sXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pXSl9LGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoXCJMb2FkaW5nIFBhaXJzXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuZXR3b3JrXCJ9LFtfdm0uX3YoXCJQbGVhc2Ugd2FpdFwiKV0pXSl9XVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uPlxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJleGNoYW5nZVwiIHYtaWY9XCJhY2NvdW50ICYmIHRva2VuICYmIHRvU2VuZFwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNjcm9sbGVyXCI+XHJcblx0XHRcdFx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHRcdFx0XHQ8IS0tLS0tLS0tLSBGUk9NIC0tLS0tLS0tPlxyXG5cdFx0XHRcdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJncmV5YmFja1wiPlxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJsaW1pdC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJveGVzXCI+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3gtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+RnJvbSAmIFRva2VuPC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZCBhY2NvdW50LXNlbGVjdG9yXCIgQGNsaWNrPVwic2VsZWN0VG9rZW5BbmRBY2NvdW50XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thY2NvdW50LnNlbmRhYmxlKCl9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCI+e3thY2NvdW50Lm5ldHdvcmsoKS5uYW1lfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwidG9rZW5cIj57e3Rva2VuLmFtb3VudH19IHt7dG9rZW4uc3ltYm9sfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicHJpY2VcIj57e3Rva2VuLmZpYXRQcmljZSgpfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3gtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+UmVjZWl2ZXI8L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3ggbmVzdGVkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwicGFkZGVkIHJlY2lwaWVudC1zZWxlY3RvclwiIEBjbGljaz1cInNlbGVjdFJlY2lwaWVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+Q29udGFjdHM8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibGluZVwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBwbGFjZWhvbGRlcj1cIkFkZHJlc3MgLyBBY2NvdW50XCIgdi1tb2RlbD1cInJlY2lwaWVudFwiIGNsYXNzPVwiaW5wdXRcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHJcblxyXG5cdFx0XHRcdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0XHRcdFx0PCEtLS0tLS0tLS0tIFRPIC0tLS0tLS0tLT5cclxuXHRcdFx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwid2hpdGViYWNrXCI+XHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImxpbWl0LXdpZHRoXCI+XHJcblx0XHRcdFx0XHRcdDwhLS08c2VjdGlvbiBjbGFzcz1cInNwbGl0LWZsZXhcIj4tLT5cclxuXHRcdFx0XHRcdFx0PCEtLTxsYWJlbD5UbyBUb2tlbjwvbGFiZWw+LS0+XHJcblx0XHRcdFx0XHRcdDwhLS08c2VjdGlvbiBjbGFzcz1cIm1pbi1tYXhcIj4tLT5cclxuXHRcdFx0XHRcdFx0PCEtLTxkaXY+TWluPHNwYW4+MTIwLjAwMDA8L3NwYW4+PC9kaXY+LS0+XHJcblx0XHRcdFx0XHRcdDwhLS08ZGl2Pk1heDxzcGFuPjEyMC4wMDAwPC9zcGFuPjwvZGl2Pi0tPlxyXG5cdFx0XHRcdFx0XHQ8IS0tPC9zZWN0aW9uPi0tPlxyXG5cdFx0XHRcdFx0XHQ8IS0tPC9zZWN0aW9uPi0tPlxyXG5cclxuXHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94ZXNcIiBzdHlsZT1cIm1hcmdpbjowO1wiPlxyXG5cclxuXHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3hcIiA6Y2xhc3M9XCJ7J25vdC1hbGxvd2VkJzohcmF0ZX1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJsYWJlbFwiPnt7dG9rZW4udHJ1bmNhdGVkU3ltYm9sKCl9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgOmRpc2FibGVkPVwiIXJhdGVcIiBwbGFjZWhvbGRlcj1cIjAuMDBcIiB2LW9uOmlucHV0PVwiY2hhbmdlZEFtb3VudFwiIHYtbW9kZWw9XCJ0b1NlbmQuYW1vdW50XCIgY2xhc3M9XCJpbnB1dFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibGluZVwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImxhYmVsXCI+e3tkaXNwbGF5Q3VycmVuY3l9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgOmRpc2FibGVkPVwiIXJhdGVcIiBwbGFjZWhvbGRlcj1cIjAuMDBcIiB2LWlmPVwidG9TZW5kLmZpYXRQcmljZSgpXCIgdi1vbjppbnB1dD1cImNoYW5nZWRGaWF0XCIgdi1tb2RlbD1cImZpYXRcIiBjbGFzcz1cImlucHV0XCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImlucHV0IG5vdC1hdmFpbGFibGVcIiB2LWVsc2U+UHJpY2Ugbm90IGF2YWlsYWJsZTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblxyXG5cclxuXHJcblx0XHRcdFx0XHRcdFx0PCEtLS0gTE9BRElORyBQQUlSUyAtLS0+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3ggYWNjb3VudC1zZWxlY3RvclwiIHYtaWY9XCJsb2FkaW5nUGFpcnNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwic3ltYm9sXCI+PGkgY2xhc3M9XCJpY29uLXNwaW40IGFuaW1hdGUtc3BpblwiPjwvaT48L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cIm5hbWVcIj5Mb2FkaW5nIFBhaXJzPC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCI+UGxlYXNlIHdhaXQ8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDwhLS0tIFBBSVJTIExPQURFRCAtLS0+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3ggYWNjb3VudC1zZWxlY3RvclwiIEBjbGljaz1cInNlbGVjdFRva2VuXCIgdi1pZj1cIiFsb2FkaW5nUGFpcnNcIj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInN5bWJvbCBpY29uLWF0dGVudGlvbi1jaXJjbGVkXCIgdi1pZj1cIiFwYWlyXCI+PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJzeW1ib2xcIiB2LWVsc2UtaWY9XCJsb2FkaW5nUmF0ZVwiPjxpIGNsYXNzPVwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIj48L2k+PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJzeW1ib2xcIiB2LWVsc2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxUb2tlblN5bWJvbCA6dG9rZW49XCJwYWlyXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PCEtLTxmaWd1cmUgY2xhc3M9XCJpY29uXCIgOmNsYXNzPVwiW3snc21hbGwnOnBhaXIgJiYgcGFpci5zeW1ib2wubGVuZ3RoID49IDR9LCBwYWlyLnN5bWJvbENsYXNzKCldXCI+LS0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PCEtLTxzcGFuIHYtaWY9XCIhcGFpci5zeW1ib2xDbGFzcygpXCI+e3twYWlyLnRydW5jYXRlZFN5bWJvbCgpfX08L3NwYW4+LS0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwhLS08L2ZpZ3VyZT4tLT5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gdi1pZj1cIiFwYWlyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCIgdi1pZj1cInBhaXJzLmxlbmd0aFwiPlNlbGVjdCBhIFRva2VuPC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCIgdi1lbHNlPk5vIHBhaXJzIGZvdW5kPC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiB2LWlmPVwicGFpclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiIHYtaWY9XCIhbG9hZGluZ1JhdGVcIj57e2VzdGltYXRlZEFtb3VudH19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCIgdi1pZj1cImxvYWRpbmdSYXRlXCI+TG9hZGluZyBSYXRlPC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCIgdi1pZj1cInBhaXJcIj57e3BhaXIuc3ltYm9sfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJjaGV2cm9uIGZhcyBmYS1jYXJldC1zcXVhcmUtZG93blwiIHYtaWY9XCJwYWlycy5sZW5ndGhcIj48L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cclxuXHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJ0YWlsXCI+XHJcblx0XHRcdFx0PEJ1dHRvbiA6ZGlzYWJsZWQ9XCIhY2FuRXhjaGFuZ2VcIiBiaWc9XCIxXCIgdGV4dD1cIkV4Y2hhbmdlXCIgYmx1ZT1cIjFcIiBAY2xpY2submF0aXZlPVwiZXhjaGFuZ2VcIiAvPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHttYXBHZXR0ZXJzLCBtYXBBY3Rpb25zLCBtYXBTdGF0ZX0gZnJvbSAndnVleCc7XHJcblx0aW1wb3J0IFBvcHVwU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvdXRpbGl0eS9Qb3B1cFNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG5cdGltcG9ydCBCYWxhbmNlU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9ibG9ja2NoYWluL0JhbGFuY2VTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFByaWNlU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcGlzL1ByaWNlU2VydmljZVwiO1xyXG5cdGltcG9ydCBUb2tlbiBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvVG9rZW5cIjtcclxuXHRpbXBvcnQgRXhjaGFuZ2VTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvRXhjaGFuZ2VTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFRva2VuU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy91dGlsaXR5L1Rva2VuU2VydmljZVwiO1xyXG5cdGltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc3RvcmUvY29uc3RhbnRzXCI7XHJcblx0aW1wb3J0IFRyYW5zZmVyU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9ibG9ja2NoYWluL1RyYW5zZmVyU2VydmljZVwiO1xyXG5cdGltcG9ydCBIaXN0b3JpY0V4Y2hhbmdlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9oaXN0b3JpZXMvSGlzdG9yaWNFeGNoYW5nZVwiO1xyXG5cdGltcG9ydCBUb2tlblN5bWJvbCBmcm9tIFwiLi4vY29tcG9uZW50cy9yZXVzYWJsZS9Ub2tlblN5bWJvbFwiO1xyXG5cdHJlcXVpcmUoJy4uL3N0eWxlcy90cmFuc2ZlcnMuc2NzcycpO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOiB7VG9rZW5TeW1ib2x9LFxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblx0XHRcdGFjY291bnQ6bnVsbCxcclxuXHRcdFx0cmVjaXBpZW50Om51bGwsXHJcblx0XHRcdG1lbW86JycsXHJcblxyXG5cdFx0XHR0b2tlbjpudWxsLFxyXG5cdFx0XHR0b1NlbmQ6bnVsbCxcclxuXHRcdFx0ZmlhdDowLFxyXG5cclxuXHRcdFx0c2VuZGluZzpmYWxzZSxcclxuXHJcblx0XHRcdHJhd1BhaXJzOltdLFxyXG5cdFx0XHRwYWlyczpbXSxcclxuXHRcdFx0cGFpcjpudWxsLFxyXG5cdFx0XHRyYXRlOm51bGwsXHJcblx0XHRcdGxvYWRpbmdQYWlyczpmYWxzZSxcclxuXHRcdFx0bG9hZGluZ1JhdGU6ZmFsc2UsXHJcblxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnaGlzdG9yeScsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQnYWNjb3VudHMnLFxyXG5cdFx0XHRcdCdkaXNwbGF5Q3VycmVuY3knXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRzZW5kYWJsZVRva2Vucygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFjY291bnQudG9rZW5zKCkuZmlsdGVyKHggPT4gIXgudW51c2FibGUpLnNvcnQoKGEsYikgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIFRva2VuLnNvcnRlcihhLGIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5FeGNoYW5nZSgpe1xyXG5cdFx0XHRcdHJldHVybiAhIXRoaXMucmF0ZSAmJlxyXG5cdFx0XHRcdFx0ISF0aGlzLnBhaXIgJiZcclxuXHRcdFx0XHRcdCF0aGlzLnNlbmRpbmcgJiZcclxuXHRcdFx0XHRcdHRoaXMucmVjaXBpZW50ICYmXHJcblx0XHRcdFx0XHR0aGlzLnRvU2VuZC5hbW91bnQgPiAwICYmXHJcblx0XHRcdFx0XHQodGhpcy5yYXRlLm1pbiA9PT0gbnVsbCB8fCB0aGlzLnJhdGUubWluIDw9IHRoaXMuZXN0aW1hdGVkQW1vdW50KSAmJlxyXG5cdFx0XHRcdFx0KHRoaXMucmF0ZS5tYXggPT09IG51bGwgfHwgdGhpcy5yYXRlLm1heCA+PSB0aGlzLmVzdGltYXRlZEFtb3VudClcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXN0aW1hdGVkQW1vdW50KCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucmF0ZSkgcmV0dXJuIDA7XHJcblx0XHRcdFx0aWYoIXRoaXMucGFpcikgcmV0dXJuIDA7XHJcblx0XHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodGhpcy5yYXRlLnJhdGUgKiB0aGlzLnRvU2VuZC5hbW91bnQpLnRvRml4ZWQodGhpcy5wYWlyLmRlY2ltYWxzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cmF3UGFpcigpe1xyXG5cdFx0XHRcdGlmKCF0aGlzLnBhaXIpIHJldHVybjtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yYXdQYWlycy5maW5kKHggPT4geC50b2tlbi5pZCA9PT0gdGhpcy5wYWlyLmlkKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG1vdW50ZWQoKXtcclxuXHRcdFx0Y29uc3QgaGlzdG9yeSA9IHRoaXMuJHJvdXRlLnF1ZXJ5Lmhpc3RvcnkgPyB0aGlzLmhpc3RvcnkuZmluZCh4ID0+IHguaWQgPT09IHRoaXMuJHJvdXRlLnF1ZXJ5Lmhpc3RvcnkpIDogbnVsbDtcclxuXHRcdFx0aWYoaGlzdG9yeSl7XHJcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmFjY291bnQgPSBoaXN0b3J5LmZyb207XHJcblx0XHRcdFx0XHR0aGlzLnJlY2lwaWVudCA9IGhpc3RvcnkudG87XHJcblx0XHRcdFx0XHR0aGlzLnNldFRva2VuKGhpc3RvcnkuZnJvbVRva2VuKTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuZ2V0UGFpcnMoKTtcclxuXHRcdFx0XHRcdGlmKHRoaXMucmF3UGFpcnMubGVuZ3RoKXtcclxuXHRcdFx0XHRcdFx0Y29uc3QgcGFpciA9IHRoaXMucmF3UGFpcnMuZmluZCh4ID0+IHgudG9rZW4udW5pcXVlV2l0aENoYWluKCkgPT09IGhpc3RvcnkudG9Ub2tlbi51bmlxdWVXaXRoQ2hhaW4oKSk7XHJcblx0XHRcdFx0XHRcdGlmKHBhaXIpIHRoaXMuc2V0UGFpcihwYWlyLnRva2VuKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodGhpcy4kcm91dGUucXVlcnkuYWNjb3VudCl7XHJcblx0XHRcdFx0dGhpcy5hY2NvdW50ID0gdGhpcy5hY2NvdW50cy5maW5kKHggPT4geC5pZGVudGlmaWFibGUoKSA9PT0gdGhpcy4kcm91dGUucXVlcnkuYWNjb3VudCk7XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuJHJvdXRlLnF1ZXJ5LnRva2VuKXtcclxuXHRcdFx0XHRcdGNvbnN0IHRva2VuID0gdGhpcy5hY2NvdW50LnRva2VucygpLmZpbmQoeCA9PiB4LnVuaXF1ZVdpdGhDaGFpbigpID09PSB0aGlzLiRyb3V0ZS5xdWVyeS50b2tlbik7XHJcblx0XHRcdFx0XHR0aGlzLnNldFRva2VuKHRva2VuKTtcclxuXHRcdFx0XHRcdHRoaXMucmVjaXBpZW50ID0gdGhpcy5hY2NvdW50LnNlbmRhYmxlKCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZighdGhpcy5hY2NvdW50KXtcclxuXHRcdFx0XHR0aGlzLmFjY291bnQgPSB0aGlzLmFjY291bnRzLmZpbHRlcih4ID0+IHgudG9rZW5zKCkubGVuZ3RoKVxyXG5cdFx0XHRcdFx0LnNvcnQoKGEsYikgPT4gYi50b3RhbEZpYXRCYWxhbmNlKCkgLSBhLnRvdGFsRmlhdEJhbGFuY2UoKSlbMF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVjaXBpZW50ID0gdGhpcy5hY2NvdW50LnNlbmRhYmxlKCk7XHJcblx0XHRcdHRoaXMuc2V0VG9rZW4odGhpcy5zZW5kYWJsZVRva2Vuc1swXSk7XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblx0XHRcdHNlbGVjdFRva2VuQW5kQWNjb3VudCgpe1xyXG5cdFx0XHRcdFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLnNlbGVjdFRva2VuQW5kQWNjb3VudChyZXN1bHQgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXJlc3VsdCkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0Y29uc3Qge3Rva2VuLCBhY2NvdW50fSA9IHJlc3VsdDtcclxuXHRcdFx0XHRcdHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XHJcblx0XHRcdFx0XHR0aGlzLnNldFRva2VuKHRva2VuKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnJlY2lwaWVudCA9IHRoaXMuYWNjb3VudC5zZW5kYWJsZSgpO1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RSZWNpcGllbnQoKXtcclxuXHRcdFx0XHRQb3B1cFNlcnZpY2UucHVzaChQb3B1cC5zZWxlY3RSZWNpcGllbnQodGhpcy5hY2NvdW50ID8gdGhpcy5hY2NvdW50LmJsb2NrY2hhaW4oKSA6IG51bGwsIHJlY2lwaWVudCA9PiB7XHJcblx0XHRcdFx0XHRpZighcmVjaXBpZW50KSByZXR1cm47XHJcblx0XHRcdFx0XHR0aGlzLnJlY2lwaWVudCA9IHJlY2lwaWVudDtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdFRva2VuKCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucGFpcnMubGVuZ3RoKSByZXR1cm47XHJcblx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc2VsZWN0VG9rZW4odGhpcy5wYWlycywgdG9rZW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRva2VuKSByZXR1cm47XHJcblx0XHRcdFx0XHR0aGlzLnNldFBhaXIodG9rZW4uY2xvbmUoKSk7XHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNldFRva2VuKHRva2VuKXtcclxuXHRcdFx0XHRQcmljZVNlcnZpY2Uuc2V0UHJpY2VzKCk7XHJcblx0XHRcdFx0dGhpcy50b2tlbiA9IHRoaXMuYWNjb3VudC50b2tlbnMoKS5maW5kKHggPT4geC51bmlxdWVXaXRoQ2hhaW4oKSA9PT0gdG9rZW4udW5pcXVlV2l0aENoYWluKCkpLmNsb25lKCk7XHJcblx0XHRcdFx0dGhpcy50b1NlbmQgPSB0aGlzLnRva2VuLmNsb25lKCk7XHJcblx0XHRcdFx0dGhpcy50b1NlbmQuYW1vdW50ID0gMDtcclxuXHRcdFx0XHR0aGlzLmZpYXQgPSAwO1xyXG5cdFx0XHRcdHRoaXMucmF0ZSA9IG51bGw7XHJcblx0XHRcdFx0dGhpcy5wYWlyID0gbnVsbDtcclxuXHRcdFx0XHQvLyB0aGlzLnJlY2lwaWVudCA9IG51bGw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNoYW5nZWRGaWF0KCl7XHJcblx0XHRcdFx0dGhpcy50b1NlbmQuYW1vdW50ID0gcGFyc2VGbG9hdCh0aGlzLmZpYXQgLyB0aGlzLnRvU2VuZC5maWF0UHJpY2UoZmFsc2UpKS50b0ZpeGVkKHRoaXMudG9TZW5kLmRlY2ltYWxzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2hhbmdlZEFtb3VudCgpe1xyXG5cdFx0XHRcdHRoaXMuZmlhdCA9ICF0aGlzLnRvU2VuZC5hbW91bnQgfHwgdGhpcy50b1NlbmQuYW1vdW50ID09PSAnJyA/IG51bGwgOiB0aGlzLnRvU2VuZC5maWF0QmFsYW5jZShmYWxzZSlcclxuXHRcdFx0fSxcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0XHRcdGNhbnRDb25uZWN0KCl7XHJcblx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAucHJvbXB0KFxyXG5cdFx0XHRcdFx0dGhpcy5sb2NhbGUodGhpcy5sYW5nS2V5cy5FWENIQU5HRS5FeGNoYW5nZUVycm9yKSxcclxuXHRcdFx0XHRcdHRoaXMubG9jYWxlKHRoaXMubGFuZ0tleXMuRVhDSEFOR0UuQ2FudENvbm5lY3QpXHJcblx0XHRcdFx0KSk7XHJcblx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6dGhpcy5Sb3V0ZU5hbWVzLkhPTUV9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0UGFpcihwYWlyKXtcclxuXHRcdFx0XHR0aGlzLnBhaXIgPSBwYWlyO1xyXG5cdFx0XHRcdHRoaXMuZ2V0UmF0ZSgpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YXN5bmMgZ2V0UGFpcnMoKXtcclxuXHRcdFx0XHR0aGlzLnBhaXIgPSBudWxsO1xyXG5cdFx0XHRcdHRoaXMucGFpcnMgPSB7fTtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmdQYWlycyA9IHRydWU7XHJcblx0XHRcdFx0bGV0IHBhaXJzID0gYXdhaXQgRXhjaGFuZ2VTZXJ2aWNlLnBhaXJzKHRoaXMudG9rZW4pO1xyXG5cdFx0XHRcdGxldCB7YmFzZSwgc3RhYmxlLCBldGgsIGVvcywgdHJ4fSA9IHBhaXJzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnJhd1BhaXJzID0gT2JqZWN0LmtleXMocGFpcnMpLnJlZHVjZSgoYWNjLGtleSkgPT4ge1xyXG5cdFx0XHRcdFx0YWNjID0gYWNjLmNvbmNhdChwYWlyc1trZXldKTtcclxuXHRcdFx0XHRcdHJldHVybiBhY2M7XHJcblx0XHRcdFx0fSwgW10pO1xyXG5cclxuXHRcdFx0XHRpZighcGFpcnMpIHtcclxuXHRcdFx0XHRcdHRoaXMuY2FudENvbm5lY3QoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gW107XHJcblxyXG5cdFx0XHRcdFx0bGV0IGJhc2VzID0gW107XHJcblx0XHRcdFx0XHRpZihiYXNlKSBiYXNlcyA9IGJhc2VzLmNvbmNhdChiYXNlLm1hcCh4ID0+IHgudG9rZW4pKTtcclxuXHRcdFx0XHRcdGlmKHN0YWJsZSkgYmFzZXMgPSBiYXNlcy5jb25jYXQoc3RhYmxlLm1hcCh4ID0+IHgudG9rZW4pKTtcclxuXHRcdFx0XHRcdGlmKGJhc2VzLmxlbmd0aCkgY2F0ZWdvcmllcy5wdXNoKHsgdG9rZW5zOmJhc2VzIH0pXHJcblxyXG5cdFx0XHRcdFx0Y29uc3Qgc3dhcHMgPSBbZXRoLGVvcyx0cnhdLmZpbHRlcih4ID0+ICEheCkucmVkdWNlKChhY2MseCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR4Lm1hcCh0ID0+IGFjYy5wdXNoKHQudG9rZW4pKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHRcdH0sIFtdKTtcclxuXHRcdFx0XHRcdGlmKHN3YXBzLmxlbmd0aCkgY2F0ZWdvcmllcy5wdXNoKHsgdG9rZW5zOnN3YXBzIH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMucGFpcnMgPSBjYXRlZ29yaWVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZighdGhpcy5yYXdQYWlycy5sZW5ndGgpIHRoaXMucmF0ZSA9IG51bGw7XHJcblx0XHRcdFx0aWYodGhpcy5yYXdQYWlycy5sZW5ndGggPT09IDEpIHRoaXMuc2V0UGFpcih0aGlzLnJhd1BhaXJzWzBdLnRva2VuKTtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmdQYWlycyA9IGZhbHNlO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhc3luYyBnZXRSYXRlKCl7XHJcblx0XHRcdFx0dGhpcy5sb2FkaW5nUmF0ZSA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5yYXRlID0gbnVsbDtcclxuXHRcdFx0XHR0aGlzLnJhdGUgPSBhd2FpdCBFeGNoYW5nZVNlcnZpY2UucmF0ZSh0aGlzLnRva2VuLCB0aGlzLnJhd1BhaXIuc3ltYm9sLCB0aGlzLnJhd1BhaXIuc2VydmljZSk7XHJcblx0XHRcdFx0dGhpcy5sb2FkaW5nUmF0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0YXN5bmMgZXhjaGFuZ2UoKXtcclxuXHRcdFx0XHRpZighdGhpcy5jYW5FeGNoYW5nZSkgcmV0dXJuO1xyXG5cdFx0XHRcdHRoaXMuc2VuZGluZyA9IHRydWU7XHJcblx0XHRcdFx0Y29uc3QgZnJvbSA9IHsgYWNjb3VudDp0aGlzLmFjY291bnQuc2VuZGFibGUoKSB9O1xyXG5cdFx0XHRcdGNvbnN0IHRvID0geyBhY2NvdW50OnRoaXMucmVjaXBpZW50IH07XHJcblx0XHRcdFx0Y29uc3QgYW1vdW50ID0gdGhpcy50b1NlbmQuYW1vdW50O1xyXG5cdFx0XHRcdGNvbnN0IG9yZGVyID0gYXdhaXQgRXhjaGFuZ2VTZXJ2aWNlLm9yZGVyKHRoaXMucmF3UGFpci5zZXJ2aWNlLCB0aGlzLnRva2VuLCB0aGlzLnBhaXIuc3ltYm9sLCBhbW91bnQsIGZyb20sIHRvKTtcclxuXHJcblx0XHRcdFx0aWYoIW9yZGVyKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNhbnRDb25uZWN0KCk7XHJcblx0XHRcdFx0XHR0aGlzLnNlbmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y29uc3QgYWNjb3VudHMgPSB7XHJcblx0XHRcdFx0XHRmcm9tOmZyb20uYWNjb3VudCxcclxuXHRcdFx0XHRcdHRvOnRvLmFjY291bnQsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHN5bWJvbHMgPSB7XHJcblx0XHRcdFx0XHRmcm9tOnRoaXMudG9rZW4uc3ltYm9sLFxyXG5cdFx0XHRcdFx0dG86dGhpcy5wYWlyLnN5bWJvbFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0RXhjaGFuZ2VTZXJ2aWNlLmFjY2VwdGVkKG9yZGVyLmlkKTtcclxuXHRcdFx0XHRjb25zdCBzZW50ID0gYXdhaXQgVHJhbnNmZXJTZXJ2aWNlW3RoaXMuYWNjb3VudC5ibG9ja2NoYWluKCldKHtcclxuXHRcdFx0XHRcdGFjY291bnQ6dGhpcy5hY2NvdW50LFxyXG5cdFx0XHRcdFx0cmVjaXBpZW50Om9yZGVyLmFjY291bnQsXHJcblx0XHRcdFx0XHRhbW91bnQsXHJcblx0XHRcdFx0XHRtZW1vOm9yZGVyLm1lbW8sXHJcblx0XHRcdFx0XHR0b2tlbjp0aGlzLnRva2VuLFxyXG5cdFx0XHRcdFx0cHJvbXB0Rm9yU2lnbmF0dXJlOmZhbHNlLFxyXG5cdFx0XHRcdFx0YnlwYXNzSGlzdG9yeTp0cnVlLFxyXG5cdFx0XHRcdH0pLmNhdGNoKCgpID0+IGZhbHNlKTtcclxuXHRcdFx0XHRpZihzZW50KXtcclxuXHJcblx0XHRcdFx0XHRQb3B1cFNlcnZpY2UucHVzaChQb3B1cC50cmFuc2FjdGlvblN1Y2Nlc3ModGhpcy50b2tlbi5ibG9ja2NoYWluLCBUcmFuc2ZlclNlcnZpY2UuZ2V0VHJhbnNmZXJJZChzZW50LCB0aGlzLnRva2VuLmJsb2NrY2hhaW4pKSk7XHJcblxyXG5cclxuXHRcdFx0XHRcdGlmKCFUb2tlblNlcnZpY2UuaGFzVG9rZW4odGhpcy5yYXdQYWlyLnRva2VuKSl7XHJcblx0XHRcdFx0XHRcdGlmKCEhdGhpcy5yYXdQYWlyLnRva2VuLmNvbnRyYWN0ICYmICEhdGhpcy5yYXdQYWlyLnRva2VuLmNvbnRyYWN0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdGF3YWl0IFRva2VuU2VydmljZS5hZGRUb2tlbih0aGlzLnJhd1BhaXIudG9rZW4sIGZhbHNlLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IGhpc3RvcnkgPSBuZXcgSGlzdG9yaWNFeGNoYW5nZSh0aGlzLmFjY291bnQsIHRoaXMucmVjaXBpZW50LCB0aGlzLnRvU2VuZCwgdGhpcy5wYWlyLCBvcmRlciwgVHJhbnNmZXJTZXJ2aWNlLmdldFRyYW5zZmVySWQoc2VudCwgdGhpcy50b2tlbi5ibG9ja2NoYWluKSk7XHJcblx0XHRcdFx0XHR0aGlzW0FjdGlvbnMuREVMVEFfSElTVE9SWV0oaGlzdG9yeSk7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0RXhjaGFuZ2VTZXJ2aWNlLndhdGNoKGhpc3RvcnkpO1xyXG5cdFx0XHRcdFx0XHRCYWxhbmNlU2VydmljZS5sb2FkQmFsYW5jZXNGb3IodGhpcy5hY2NvdW50KTtcclxuXHRcdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnNlbmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0fSxcclxuXHJcblxyXG5cdFx0XHQuLi5tYXBBY3Rpb25zKFtcclxuXHRcdFx0XHRBY3Rpb25zLkRFTFRBX0hJU1RPUllcclxuXHRcdFx0XSlcclxuXHRcdH0sXHJcblx0XHR3YXRjaDp7XHJcblx0XHRcdFsndG9rZW4uc3ltYm9sJ10oKXtcclxuXHRcdFx0XHR0aGlzLmdldFBhaXJzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0V4Y2hhbmdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0V4Y2hhbmdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRXhjaGFuZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNmZTdkYmZhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0V4Y2hhbmdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRXhjaGFuZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0V4Y2hhbmdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTNmZTdkYmZhJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiM2ZlN2RiZmFcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG4iXSwic291cmNlUm9vdCI6IiJ9