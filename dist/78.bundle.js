(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[78],{

/***/ "10ce":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("uT+w");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("3d09ed46", content, true, {});

/***/ }),

/***/ "Y9V5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Transfer_vue_vue_type_style_index_0_id_9bf4cfc0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("10ce");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Transfer_vue_vue_type_style_index_0_id_9bf4cfc0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Transfer_vue_vue_type_style_index_0_id_9bf4cfc0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Transfer_vue_vue_type_style_index_0_id_9bf4cfc0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "aaq0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Transfer.vue?vue&type=template&id=9bf4cfc0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"transfer"},[_c('section',{staticClass:"scroller"},[(_vm.account && _vm.token && _vm.toSend)?_c('section',{staticClass:"greyback"},[_c('section',{staticClass:"limit-width"},[_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box-container"},[_c('label',[_vm._v("Sending from")]),_vm._v(" "),_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.account.network().name))]),_vm._v(" "),_c('figure',{staticClass:"token"},[_vm._v(_vm._s(_vm.token.amount)+" "+_vm._s(_vm.token.symbol))]),_vm._v(" "),_c('figure',{staticClass:"price"},[_vm._v(_vm._s(_vm.token.fiatPrice() || '--'))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])]),_vm._v(" "),_c('section',{staticClass:"box-container"},[_c('label',[_vm._v("Receiving to")]),_vm._v(" "),_c('section',{staticClass:"box nested"},[_c('section',{staticClass:"padded recipient-selector",on:{"click":_vm.selectRecipient}},[_c('figure',{staticClass:"name"},[_vm._v("Contacts")]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})]),_vm._v(" "),_c('figure',{staticClass:"line"}),_vm._v(" "),_c('section',{staticClass:"input-container"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.recipient),expression:"recipient"}],staticClass:"input",attrs:{"placeholder":"Address / Account"},domProps:{"value":(_vm.recipient)},on:{"input":function($event){if($event.target.composing){ return; }_vm.recipient=$event.target.value}}})])])])])])]):_vm._e(),_vm._v(" "),(_vm.account && _vm.token && _vm.toSend)?_c('section',{staticClass:"whiteback"},[_c('section',{staticClass:"limit-width"},[_c('label',[_vm._v("Amount & Details")]),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box"},[_c('section',{staticClass:"input-container"},[_c('figure',{staticClass:"label"},[_vm._v(_vm._s(_vm.token.truncatedSymbol()))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.toSend.amount),expression:"toSend.amount"}],staticClass:"input",attrs:{"placeholder":"0.00"},domProps:{"value":(_vm.toSend.amount)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.toSend, "amount", $event.target.value)},_vm.changedAmount]}})]),_vm._v(" "),_c('figure',{staticClass:"line"}),_vm._v(" "),_c('section',{staticClass:"input-container"},[_c('figure',{staticClass:"label"},[_vm._v(_vm._s(_vm.displayCurrency))]),_vm._v(" "),(_vm.toSend.fiatPrice())?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fiat),expression:"fiat"}],staticClass:"input",attrs:{"placeholder":"0.00"},domProps:{"value":(_vm.fiat)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.fiat=$event.target.value},_vm.changedFiat]}}):_c('figure',{staticClass:"input not-available"},[_vm._v("Price not available")])])]),_vm._v(" "),_c('section',{staticClass:"box"},[_c('section',{staticClass:"input-container"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.memo),expression:"memo"}],staticClass:"input",attrs:{"placeholder":"optional memo"},domProps:{"value":(_vm.memo)},on:{"input":function($event){if($event.target.composing){ return; }_vm.memo=$event.target.value}}})])])])])]):_vm._e()]),_vm._v(" "),_c('section',{staticClass:"tail"},[_c('Button',{attrs:{"disabled":!_vm.canSend,"big":"1","text":"Send","blue":"1"},nativeOn:{"click":function($event){return _vm.send($event)}}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Transfer.vue?vue&type=template&id=9bf4cfc0&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Token.js
var Token = __webpack_require__("GwxU");
var Token_default = /*#__PURE__*/__webpack_require__.n(Token);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/BalanceService.js
var BalanceService = __webpack_require__("KLk5");
var BalanceService_default = /*#__PURE__*/__webpack_require__.n(BalanceService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/TransferService.js
var TransferService = __webpack_require__("M1Dr");
var TransferService_default = /*#__PURE__*/__webpack_require__.n(TransferService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apis/PriceService.js
var PriceService = __webpack_require__("TmN8");
var PriceService_default = /*#__PURE__*/__webpack_require__.n(PriceService);

// EXTERNAL MODULE: ./src/services/utility/PasswordHelpers.js
var PasswordHelpers = __webpack_require__("48Ae");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Transfer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ var Transfervue_type_script_lang_js_ = ({
	data(){return {
		account:null,
		token:null,
		recipient:null,
		memo:'',

		toSend:null,
		fiat:0,

		sending:false,
	}},
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'history',
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'accounts',
			'displayCurrency',
			'contacts',
		]),
		sendableTokens(){
			return this.account.tokens().filter(x => !x.unusable).sort((a,b) => {
				return Token_default.a.sorter(a,b);
			});
		},
		canSend(){
			return !this.sending && this.recipient && this.recipient.length && this.toSend && this.toSend.amount > 0;
		},
	},
	mounted(){
		const history = this.$route.query.history ? this.history.find(x => x.id === this.$route.query.history) : null;
		const accountAndToken = this.$route.query.account ? (() => {
			const account = this.accounts.find(x => x.identifiable() === this.$route.query.account);
			if(!account) return null;
			return {
				account,
				token:this.$route.query.token ? account.tokens().find(x => x.uniqueWithChain() === this.$route.query.token) : null
			}
		})() : null;

		const recipient = this.$route.query.recipient;


		if(history){
			this.account = history.from;
			this.recipient = history.to;
			this.memo = history.memo;
			this.token = this.account.tokens().find(x => x.uniqueWithChain() === history.token.uniqueWithChain());
			this.toSend = history.token.clone();
			this.toSend.amount = history.amount;
			this.changedAmount();
		}
		else if(accountAndToken){
			this.account = accountAndToken.account;
			if(accountAndToken.token) this.setToken(accountAndToken.token);
			else this.setToken(this.sendableTokens[0]);
		}
		else if (recipient){
			const contact = this.contacts.find(x => x.id === recipient);
			this.recipient = contact.recipient;
			this.account = this.accounts.filter(x => contact.blockchain ? x.blockchain() === contact.blockchain : true)
				.filter(x => x.tokens().length)
				.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0];
			this.setToken(this.sendableTokens[0]);
		}
		else {
			this.account = this.accounts.filter(x => x.tokens().length)
				.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0];
			this.setToken(this.sendableTokens[0]);
		}

		// this.recipient = 'safetransfer';
		// this.account = this.accounts.find(x => x.name === 'scatterhwtst');
		// this.memo = 'scatterhwtst';
		// this.toSend.quantity = '1.0000';
		// this.setToken(this.sendableTokens[0]);
	},
	methods:{
		selectTokenAndAccount(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectTokenAndAccount(result => {
				if(!result) return;
				const {token, account} = result;
				this.account = account;
				this.setToken(token);
			}))
		},
		selectRecipient(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectRecipient(this.account ? this.account.blockchain() : null, recipient => {
				if(!recipient) return;
				this.recipient = recipient;
			}));
		},
		setToken(token){
			if(!token) return;
			PriceService_default.a.setPrices();
			this.token = (() => {
				const t = this.account.tokens().find(x => x.uniqueWithChain() === token.uniqueWithChain());
				if(t) return t.clone();
				const clone = token.clone();
				clone.amount = 0;
				return clone;
			})();
			this.toSend = this.token.clone();
			this.toSend.amount = 0;
			this.fiat = 0;
		},
		changedFiat(){
			this.toSend.amount = parseFloat(this.fiat / this.toSend.fiatPrice(false)).toFixed(this.toSend.decimals);
		},
		changedAmount(){
			this.fiat = !this.toSend.amount || this.toSend.amount === '' ? null : this.toSend.fiatBalance(false)
		},
		async send(){
			const reset = () => this.sending = false;
			if(!this.canSend) return;
			// this.sending = true;
			// if(!await PasswordHelpers.verifyPIN()) return reset();
			// this.setWorkingScreen(true);
			const blockchain = this.account.blockchain();
			const sent = await TransferService_default.a[blockchain]({
				account:this.account,
				recipient:this.recipient,
				amount:this.toSend.amount,
				memo:this.memo,
				token:this.token,
				promptForSignature:false,
			}).catch(error => {
				console.error('Transfer error', error);
				return false;
			});

			reset();
			this.setWorkingScreen(false);
			if(sent) {
				if(sent.hasOwnProperty('error')){
					PopupService["a" /* default */].push(Popup["a" /* Popup */].snackbar(sent.error, "attention-circled"));
				} else if (sent) {
					PopupService["a" /* default */].push(Popup["a" /* Popup */].transactionSuccess(blockchain, TransferService_default.a.getTransferId(sent, blockchain)));
					setTimeout(() => {
						BalanceService_default.a.loadBalancesFor(this.account);
					}, 500);
				} else {
					PopupService["a" /* default */].push(Popup["a" /* Popup */].snackbar("An error occurred while trying to transfer these tokens.", "attention-circled"));
				}

			}
		},
	},
});

// CONCATENATED MODULE: ./src/views/Transfer.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Transfervue_type_script_lang_js_ = (Transfervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Transfer.vue?vue&type=style&index=0&id=9bf4cfc0&scoped=true&lang=scss&
var Transfervue_type_style_index_0_id_9bf4cfc0_scoped_true_lang_scss_ = __webpack_require__("Y9V5");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Transfer.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Transfervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "9bf4cfc0",
  null
  
)

/* harmony default export */ var Transfer = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "uT+w":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, "", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvVHJhbnNmZXIudnVlPzk2YWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1RyYW5zZmVyLnZ1ZT8yYjA2Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9UcmFuc2Zlci52dWU/Y2E1NSIsIndlYnBhY2s6Ly8vc3JjL3ZpZXdzL1RyYW5zZmVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvVHJhbnNmZXIudnVlPzQwY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1RyYW5zZmVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvVHJhbnNmZXIudnVlPzBiNjciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUE2UjtBQUNuVCw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7OztBQ1I5QztBQUFBO0FBQUE7QUFBMlYsQ0FBZ0IsdVpBQUcsRUFBQyxDOzs7Ozs7Ozs7OztBQ0EvVywwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQix1QkFBdUIsZ0JBQWdCLHVCQUF1Qix5REFBeUQsdUJBQXVCLGdCQUFnQiwwQkFBMEIsZ0JBQWdCLG9CQUFvQixnQkFBZ0IsNEJBQTRCLGlFQUFpRSw4Q0FBOEMsbUNBQW1DLDZCQUE2QixtQkFBbUIsb0VBQW9FLHNCQUFzQix3RUFBd0Usb0JBQW9CLDJGQUEyRixvQkFBb0IsNkVBQTZFLCtDQUErQyxnQ0FBZ0MsNEJBQTRCLGlFQUFpRSx5QkFBeUIsZ0JBQWdCLDRDQUE0Qyw2QkFBNkIsZUFBZSxtQkFBbUIsZ0RBQWdELCtDQUErQyw2QkFBNkIsbUJBQW1CLDRCQUE0Qiw4QkFBOEIsY0FBYyxhQUFhLDRFQUE0RSw2QkFBNkIsa0NBQWtDLFdBQVcsd0JBQXdCLEtBQUsseUJBQXlCLDRCQUE0QixRQUFRLEVBQUUsb0NBQW9DLDBGQUEwRix3QkFBd0IsZ0JBQWdCLDBCQUEwQixxRUFBcUUsb0JBQW9CLGdCQUFnQixrQkFBa0IsZ0JBQWdCLDhCQUE4QixlQUFlLG9CQUFvQix3RUFBd0UsYUFBYSxvRkFBb0YsNkJBQTZCLHFCQUFxQixXQUFXLDRCQUE0QixLQUFLLDBCQUEwQiw0QkFBNEIsUUFBUSxFQUFFLG9EQUFvRCxxQkFBcUIsNkJBQTZCLG1CQUFtQiw0QkFBNEIsOEJBQThCLGVBQWUsb0JBQW9CLHlGQUF5RixhQUFhLGtFQUFrRSw2QkFBNkIscUJBQXFCLFdBQVcsbUJBQW1CLEtBQUssMEJBQTBCLDRCQUE0QixRQUFRLEVBQUUsNkJBQTZCLG1CQUFtQixlQUFlLGtDQUFrQyxnRUFBZ0Usa0JBQWtCLGdCQUFnQiw4QkFBOEIsaUJBQWlCLGFBQWEsa0VBQWtFLDZCQUE2Qiw4QkFBOEIsV0FBVyxtQkFBbUIsS0FBSyx5QkFBeUIsNEJBQTRCLFFBQVEsRUFBRSwrQkFBK0IsaURBQWlELG1CQUFtQixlQUFlLE9BQU8sMkRBQTJELFdBQVcseUJBQXlCLDBCQUEwQjtBQUN0bkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQzlPMkgsQ0FBZ0IsMkdBQUcsRUFBQyxDOzs7Ozs7OztBQ0E1QztBQUN2QztBQUNMO0FBQ3NDOzs7QUFHN0Y7QUFDMEY7QUFDMUYsZ0JBQWdCLDhDQUFVO0FBQzFCLEVBQUUsc0NBQU07QUFDUixFQUFFLE1BQU07QUFDUixFQUFFLGVBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsK0Y7Ozs7Ozs7QUNuQmYsMkJBQTJCLG1CQUFPLENBQUMsTUFBbUQ7QUFDdEY7QUFDQSxjQUFjLFFBQVMiLCJmaWxlIjoiNzguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD05YmY0Y2ZjMCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjNkMDllZDQ2XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD05YmY0Y2ZjMCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RyYW5zZmVyLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTliZjRjZmMwJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ0cmFuc2ZlclwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNjcm9sbGVyXCJ9LFsoX3ZtLmFjY291bnQgJiYgX3ZtLnRva2VuICYmIF92bS50b1NlbmQpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJncmV5YmFja1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImxpbWl0LXdpZHRoXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3gtY29udGFpbmVyXCJ9LFtfYygnbGFiZWwnLFtfdm0uX3YoXCJTZW5kaW5nIGZyb21cIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3ggbmVzdGVkIGFjY291bnQtc2VsZWN0b3JcIixvbjp7XCJjbGlja1wiOl92bS5zZWxlY3RUb2tlbkFuZEFjY291bnR9fSxbX2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50LnNlbmRhYmxlKCkpKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmV0d29ya1wifSxbX3ZtLl92KF92bS5fcyhfdm0uYWNjb3VudC5uZXR3b3JrKCkubmFtZSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0b2tlblwifSxbX3ZtLl92KF92bS5fcyhfdm0udG9rZW4uYW1vdW50KStcIiBcIitfdm0uX3MoX3ZtLnRva2VuLnN5bWJvbCkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJwcmljZVwifSxbX3ZtLl92KF92bS5fcyhfdm0udG9rZW4uZmlhdFByaWNlKCkgfHwgJy0tJykpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94LWNvbnRhaW5lclwifSxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiUmVjZWl2aW5nIHRvXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94IG5lc3RlZFwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhZGRlZCByZWNpcGllbnQtc2VsZWN0b3JcIixvbjp7XCJjbGlja1wiOl92bS5zZWxlY3RSZWNpcGllbnR9fSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KFwiQ29udGFjdHNcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibGluZVwifSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5wdXQtY29udGFpbmVyXCJ9LFtfYygnaW5wdXQnLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTooX3ZtLnJlY2lwaWVudCksZXhwcmVzc2lvbjpcInJlY2lwaWVudFwifV0sc3RhdGljQ2xhc3M6XCJpbnB1dFwiLGF0dHJzOntcInBsYWNlaG9sZGVyXCI6XCJBZGRyZXNzIC8gQWNjb3VudFwifSxkb21Qcm9wczp7XCJ2YWx1ZVwiOihfdm0ucmVjaXBpZW50KX0sb246e1wiaW5wdXRcIjpmdW5jdGlvbigkZXZlbnQpe2lmKCRldmVudC50YXJnZXQuY29tcG9zaW5nKXsgcmV0dXJuOyB9X3ZtLnJlY2lwaWVudD0kZXZlbnQudGFyZ2V0LnZhbHVlfX19KV0pXSldKV0pXSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0uYWNjb3VudCAmJiBfdm0udG9rZW4gJiYgX3ZtLnRvU2VuZCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIndoaXRlYmFja1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImxpbWl0LXdpZHRoXCJ9LFtfYygnbGFiZWwnLFtfdm0uX3YoXCJBbW91bnQgJiBEZXRhaWxzXCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbnB1dC1jb250YWluZXJcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxhYmVsXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS50b2tlbi50cnVuY2F0ZWRTeW1ib2woKSkpXSksX3ZtLl92KFwiIFwiKSxfYygnaW5wdXQnLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTooX3ZtLnRvU2VuZC5hbW91bnQpLGV4cHJlc3Npb246XCJ0b1NlbmQuYW1vdW50XCJ9XSxzdGF0aWNDbGFzczpcImlucHV0XCIsYXR0cnM6e1wicGxhY2Vob2xkZXJcIjpcIjAuMDBcIn0sZG9tUHJvcHM6e1widmFsdWVcIjooX3ZtLnRvU2VuZC5hbW91bnQpfSxvbjp7XCJpbnB1dFwiOltmdW5jdGlvbigkZXZlbnQpe2lmKCRldmVudC50YXJnZXQuY29tcG9zaW5nKXsgcmV0dXJuOyB9X3ZtLiRzZXQoX3ZtLnRvU2VuZCwgXCJhbW91bnRcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSl9LF92bS5jaGFuZ2VkQW1vdW50XX19KV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibGluZVwifSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaW5wdXQtY29udGFpbmVyXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJsYWJlbFwifSxbX3ZtLl92KF92bS5fcyhfdm0uZGlzcGxheUN1cnJlbmN5KSldKSxfdm0uX3YoXCIgXCIpLChfdm0udG9TZW5kLmZpYXRQcmljZSgpKT9fYygnaW5wdXQnLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTooX3ZtLmZpYXQpLGV4cHJlc3Npb246XCJmaWF0XCJ9XSxzdGF0aWNDbGFzczpcImlucHV0XCIsYXR0cnM6e1wicGxhY2Vob2xkZXJcIjpcIjAuMDBcIn0sZG9tUHJvcHM6e1widmFsdWVcIjooX3ZtLmZpYXQpfSxvbjp7XCJpbnB1dFwiOltmdW5jdGlvbigkZXZlbnQpe2lmKCRldmVudC50YXJnZXQuY29tcG9zaW5nKXsgcmV0dXJuOyB9X3ZtLmZpYXQ9JGV2ZW50LnRhcmdldC52YWx1ZX0sX3ZtLmNoYW5nZWRGaWF0XX19KTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJpbnB1dCBub3QtYXZhaWxhYmxlXCJ9LFtfdm0uX3YoXCJQcmljZSBub3QgYXZhaWxhYmxlXCIpXSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveFwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImlucHV0LWNvbnRhaW5lclwifSxbX2MoJ3RleHRhcmVhJyx7ZGlyZWN0aXZlczpbe25hbWU6XCJtb2RlbFwiLHJhd05hbWU6XCJ2LW1vZGVsXCIsdmFsdWU6KF92bS5tZW1vKSxleHByZXNzaW9uOlwibWVtb1wifV0sc3RhdGljQ2xhc3M6XCJpbnB1dFwiLGF0dHJzOntcInBsYWNlaG9sZGVyXCI6XCJvcHRpb25hbCBtZW1vXCJ9LGRvbVByb3BzOntcInZhbHVlXCI6KF92bS5tZW1vKX0sb246e1wiaW5wdXRcIjpmdW5jdGlvbigkZXZlbnQpe2lmKCRldmVudC50YXJnZXQuY29tcG9zaW5nKXsgcmV0dXJuOyB9X3ZtLm1lbW89JGV2ZW50LnRhcmdldC52YWx1ZX19fSldKV0pXSldKV0pOl92bS5fZSgpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwidGFpbFwifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcImRpc2FibGVkXCI6IV92bS5jYW5TZW5kLFwiYmlnXCI6XCIxXCIsXCJ0ZXh0XCI6XCJTZW5kXCIsXCJibHVlXCI6XCIxXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnNlbmQoJGV2ZW50KX19fSldLDEpXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cInRyYW5zZmVyXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJzY3JvbGxlclwiPlxyXG5cdFx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0XHQ8IS0tLS0tLS0tLSBGUk9NIC0tLS0tLS0tPlxyXG5cdFx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImdyZXliYWNrXCIgdi1pZj1cImFjY291bnQgJiYgdG9rZW4gJiYgdG9TZW5kXCI+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJsaW1pdC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3hlc1wiPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJveC1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8bGFiZWw+U2VuZGluZyBmcm9tPC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJveCBuZXN0ZWQgYWNjb3VudC1zZWxlY3RvclwiIEBjbGljaz1cInNlbGVjdFRva2VuQW5kQWNjb3VudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thY2NvdW50LnNlbmRhYmxlKCl9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmV0d29ya1wiPnt7YWNjb3VudC5uZXR3b3JrKCkubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJ0b2tlblwiPnt7dG9rZW4uYW1vdW50fX0ge3t0b2tlbi5zeW1ib2x9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicHJpY2VcIj57e3Rva2VuLmZpYXRQcmljZSgpIHx8ICctLSd9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCI+PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94LWNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxsYWJlbD5SZWNlaXZpbmcgdG88L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJwYWRkZWQgcmVjaXBpZW50LXNlbGVjdG9yXCIgQGNsaWNrPVwic2VsZWN0UmVjaXBpZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+Q29udGFjdHM8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCI+PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibGluZVwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHBsYWNlaG9sZGVyPVwiQWRkcmVzcyAvIEFjY291bnRcIiB2LW1vZGVsPVwicmVjaXBpZW50XCIgY2xhc3M9XCJpbnB1dFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHJcblxyXG5cdFx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0XHQ8IS0tLS0tLS0tLS0gVE8gLS0tLS0tLS0tPlxyXG5cdFx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cIndoaXRlYmFja1wiIHYtaWY9XCJhY2NvdW50ICYmIHRva2VuICYmIHRvU2VuZFwiPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwibGltaXQtd2lkdGhcIj5cclxuXHRcdFx0XHRcdDxsYWJlbD5BbW91bnQgJiBEZXRhaWxzPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94ZXNcIj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJib3hcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImxhYmVsXCI+e3t0b2tlbi50cnVuY2F0ZWRTeW1ib2woKX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgcGxhY2Vob2xkZXI9XCIwLjAwXCIgdi1vbjppbnB1dD1cImNoYW5nZWRBbW91bnRcIiB2LW1vZGVsPVwidG9TZW5kLmFtb3VudFwiIGNsYXNzPVwiaW5wdXRcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibGluZVwiPjwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibGFiZWxcIj57e2Rpc3BsYXlDdXJyZW5jeX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgcGxhY2Vob2xkZXI9XCIwLjAwXCIgdi1pZj1cInRvU2VuZC5maWF0UHJpY2UoKVwiIHYtb246aW5wdXQ9XCJjaGFuZ2VkRmlhdFwiIHYtbW9kZWw9XCJmaWF0XCIgY2xhc3M9XCJpbnB1dFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiaW5wdXQgbm90LWF2YWlsYWJsZVwiIHYtZWxzZT5QcmljZSBub3QgYXZhaWxhYmxlPC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94XCI+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIm9wdGlvbmFsIG1lbW9cIiB2LW1vZGVsPVwibWVtb1wiIGNsYXNzPVwiaW5wdXRcIj48L3RleHRhcmVhPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInRhaWxcIj5cclxuXHRcdFx0PEJ1dHRvbiA6ZGlzYWJsZWQ9XCIhY2FuU2VuZFwiIGJpZz1cIjFcIiB0ZXh0PVwiU2VuZFwiIGJsdWU9XCIxXCIgQGNsaWNrLm5hdGl2ZT1cInNlbmRcIiAvPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHttYXBHZXR0ZXJzLCBtYXBTdGF0ZX0gZnJvbSAndnVleCc7XHJcblx0aW1wb3J0IFBvcHVwU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvdXRpbGl0eS9Qb3B1cFNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG5cdGltcG9ydCBUb2tlbiBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvVG9rZW5cIjtcclxuXHRpbXBvcnQgQmFsYW5jZVNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYmxvY2tjaGFpbi9CYWxhbmNlU2VydmljZVwiO1xyXG5cdGltcG9ydCBUcmFuc2ZlclNlcnZpY2UgZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYmxvY2tjaGFpbi9UcmFuc2ZlclNlcnZpY2VcIjtcclxuXHRpbXBvcnQgUHJpY2VTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvUHJpY2VTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFBhc3N3b3JkSGVscGVycyBmcm9tIFwiLi4vc2VydmljZXMvdXRpbGl0eS9QYXNzd29yZEhlbHBlcnNcIjtcclxuXHRyZXF1aXJlKCcuLi9zdHlsZXMvdHJhbnNmZXJzLnNjc3MnKTtcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblx0XHRcdGFjY291bnQ6bnVsbCxcclxuXHRcdFx0dG9rZW46bnVsbCxcclxuXHRcdFx0cmVjaXBpZW50Om51bGwsXHJcblx0XHRcdG1lbW86JycsXHJcblxyXG5cdFx0XHR0b1NlbmQ6bnVsbCxcclxuXHRcdFx0ZmlhdDowLFxyXG5cclxuXHRcdFx0c2VuZGluZzpmYWxzZSxcclxuXHRcdH19LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J2hpc3RvcnknLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2FjY291bnRzJyxcclxuXHRcdFx0XHQnZGlzcGxheUN1cnJlbmN5JyxcclxuXHRcdFx0XHQnY29udGFjdHMnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0c2VuZGFibGVUb2tlbnMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hY2NvdW50LnRva2VucygpLmZpbHRlcih4ID0+ICF4LnVudXNhYmxlKS5zb3J0KChhLGIpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBUb2tlbi5zb3J0ZXIoYSxiKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FuU2VuZCgpe1xyXG5cdFx0XHRcdHJldHVybiAhdGhpcy5zZW5kaW5nICYmIHRoaXMucmVjaXBpZW50ICYmIHRoaXMucmVjaXBpZW50Lmxlbmd0aCAmJiB0aGlzLnRvU2VuZCAmJiB0aGlzLnRvU2VuZC5hbW91bnQgPiAwO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdG1vdW50ZWQoKXtcclxuXHRcdFx0Y29uc3QgaGlzdG9yeSA9IHRoaXMuJHJvdXRlLnF1ZXJ5Lmhpc3RvcnkgPyB0aGlzLmhpc3RvcnkuZmluZCh4ID0+IHguaWQgPT09IHRoaXMuJHJvdXRlLnF1ZXJ5Lmhpc3RvcnkpIDogbnVsbDtcclxuXHRcdFx0Y29uc3QgYWNjb3VudEFuZFRva2VuID0gdGhpcy4kcm91dGUucXVlcnkuYWNjb3VudCA/ICgoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYWNjb3VudCA9IHRoaXMuYWNjb3VudHMuZmluZCh4ID0+IHguaWRlbnRpZmlhYmxlKCkgPT09IHRoaXMuJHJvdXRlLnF1ZXJ5LmFjY291bnQpO1xyXG5cdFx0XHRcdGlmKCFhY2NvdW50KSByZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0YWNjb3VudCxcclxuXHRcdFx0XHRcdHRva2VuOnRoaXMuJHJvdXRlLnF1ZXJ5LnRva2VuID8gYWNjb3VudC50b2tlbnMoKS5maW5kKHggPT4geC51bmlxdWVXaXRoQ2hhaW4oKSA9PT0gdGhpcy4kcm91dGUucXVlcnkudG9rZW4pIDogbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoKSA6IG51bGw7XHJcblxyXG5cdFx0XHRjb25zdCByZWNpcGllbnQgPSB0aGlzLiRyb3V0ZS5xdWVyeS5yZWNpcGllbnQ7XHJcblxyXG5cclxuXHRcdFx0aWYoaGlzdG9yeSl7XHJcblx0XHRcdFx0dGhpcy5hY2NvdW50ID0gaGlzdG9yeS5mcm9tO1xyXG5cdFx0XHRcdHRoaXMucmVjaXBpZW50ID0gaGlzdG9yeS50bztcclxuXHRcdFx0XHR0aGlzLm1lbW8gPSBoaXN0b3J5Lm1lbW87XHJcblx0XHRcdFx0dGhpcy50b2tlbiA9IHRoaXMuYWNjb3VudC50b2tlbnMoKS5maW5kKHggPT4geC51bmlxdWVXaXRoQ2hhaW4oKSA9PT0gaGlzdG9yeS50b2tlbi51bmlxdWVXaXRoQ2hhaW4oKSk7XHJcblx0XHRcdFx0dGhpcy50b1NlbmQgPSBoaXN0b3J5LnRva2VuLmNsb25lKCk7XHJcblx0XHRcdFx0dGhpcy50b1NlbmQuYW1vdW50ID0gaGlzdG9yeS5hbW91bnQ7XHJcblx0XHRcdFx0dGhpcy5jaGFuZ2VkQW1vdW50KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihhY2NvdW50QW5kVG9rZW4pe1xyXG5cdFx0XHRcdHRoaXMuYWNjb3VudCA9IGFjY291bnRBbmRUb2tlbi5hY2NvdW50O1xyXG5cdFx0XHRcdGlmKGFjY291bnRBbmRUb2tlbi50b2tlbikgdGhpcy5zZXRUb2tlbihhY2NvdW50QW5kVG9rZW4udG9rZW4pO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy5zZXRUb2tlbih0aGlzLnNlbmRhYmxlVG9rZW5zWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChyZWNpcGllbnQpe1xyXG5cdFx0XHRcdGNvbnN0IGNvbnRhY3QgPSB0aGlzLmNvbnRhY3RzLmZpbmQoeCA9PiB4LmlkID09PSByZWNpcGllbnQpO1xyXG5cdFx0XHRcdHRoaXMucmVjaXBpZW50ID0gY29udGFjdC5yZWNpcGllbnQ7XHJcblx0XHRcdFx0dGhpcy5hY2NvdW50ID0gdGhpcy5hY2NvdW50cy5maWx0ZXIoeCA9PiBjb250YWN0LmJsb2NrY2hhaW4gPyB4LmJsb2NrY2hhaW4oKSA9PT0gY29udGFjdC5ibG9ja2NoYWluIDogdHJ1ZSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiB4LnRva2VucygpLmxlbmd0aClcclxuXHRcdFx0XHRcdC5zb3J0KChhLGIpID0+IGIudG90YWxGaWF0QmFsYW5jZSgpIC0gYS50b3RhbEZpYXRCYWxhbmNlKCkpWzBdO1xyXG5cdFx0XHRcdHRoaXMuc2V0VG9rZW4odGhpcy5zZW5kYWJsZVRva2Vuc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5hY2NvdW50ID0gdGhpcy5hY2NvdW50cy5maWx0ZXIoeCA9PiB4LnRva2VucygpLmxlbmd0aClcclxuXHRcdFx0XHRcdC5zb3J0KChhLGIpID0+IGIudG90YWxGaWF0QmFsYW5jZSgpIC0gYS50b3RhbEZpYXRCYWxhbmNlKCkpWzBdO1xyXG5cdFx0XHRcdHRoaXMuc2V0VG9rZW4odGhpcy5zZW5kYWJsZVRva2Vuc1swXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHRoaXMucmVjaXBpZW50ID0gJ3NhZmV0cmFuc2Zlcic7XHJcblx0XHRcdC8vIHRoaXMuYWNjb3VudCA9IHRoaXMuYWNjb3VudHMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ3NjYXR0ZXJod3RzdCcpO1xyXG5cdFx0XHQvLyB0aGlzLm1lbW8gPSAnc2NhdHRlcmh3dHN0JztcclxuXHRcdFx0Ly8gdGhpcy50b1NlbmQucXVhbnRpdHkgPSAnMS4wMDAwJztcclxuXHRcdFx0Ly8gdGhpcy5zZXRUb2tlbih0aGlzLnNlbmRhYmxlVG9rZW5zWzBdKTtcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHRcdFx0c2VsZWN0VG9rZW5BbmRBY2NvdW50KCl7XHJcblx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc2VsZWN0VG9rZW5BbmRBY2NvdW50KHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0XHRpZighcmVzdWx0KSByZXR1cm47XHJcblx0XHRcdFx0XHRjb25zdCB7dG9rZW4sIGFjY291bnR9ID0gcmVzdWx0O1xyXG5cdFx0XHRcdFx0dGhpcy5hY2NvdW50ID0gYWNjb3VudDtcclxuXHRcdFx0XHRcdHRoaXMuc2V0VG9rZW4odG9rZW4pO1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RSZWNpcGllbnQoKXtcclxuXHRcdFx0XHRQb3B1cFNlcnZpY2UucHVzaChQb3B1cC5zZWxlY3RSZWNpcGllbnQodGhpcy5hY2NvdW50ID8gdGhpcy5hY2NvdW50LmJsb2NrY2hhaW4oKSA6IG51bGwsIHJlY2lwaWVudCA9PiB7XHJcblx0XHRcdFx0XHRpZighcmVjaXBpZW50KSByZXR1cm47XHJcblx0XHRcdFx0XHR0aGlzLnJlY2lwaWVudCA9IHJlY2lwaWVudDtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldFRva2VuKHRva2VuKXtcclxuXHRcdFx0XHRpZighdG9rZW4pIHJldHVybjtcclxuXHRcdFx0XHRQcmljZVNlcnZpY2Uuc2V0UHJpY2VzKCk7XHJcblx0XHRcdFx0dGhpcy50b2tlbiA9ICgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB0ID0gdGhpcy5hY2NvdW50LnRva2VucygpLmZpbmQoeCA9PiB4LnVuaXF1ZVdpdGhDaGFpbigpID09PSB0b2tlbi51bmlxdWVXaXRoQ2hhaW4oKSk7XHJcblx0XHRcdFx0XHRpZih0KSByZXR1cm4gdC5jbG9uZSgpO1xyXG5cdFx0XHRcdFx0Y29uc3QgY2xvbmUgPSB0b2tlbi5jbG9uZSgpO1xyXG5cdFx0XHRcdFx0Y2xvbmUuYW1vdW50ID0gMDtcclxuXHRcdFx0XHRcdHJldHVybiBjbG9uZTtcclxuXHRcdFx0XHR9KSgpO1xyXG5cdFx0XHRcdHRoaXMudG9TZW5kID0gdGhpcy50b2tlbi5jbG9uZSgpO1xyXG5cdFx0XHRcdHRoaXMudG9TZW5kLmFtb3VudCA9IDA7XHJcblx0XHRcdFx0dGhpcy5maWF0ID0gMDtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2hhbmdlZEZpYXQoKXtcclxuXHRcdFx0XHR0aGlzLnRvU2VuZC5hbW91bnQgPSBwYXJzZUZsb2F0KHRoaXMuZmlhdCAvIHRoaXMudG9TZW5kLmZpYXRQcmljZShmYWxzZSkpLnRvRml4ZWQodGhpcy50b1NlbmQuZGVjaW1hbHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjaGFuZ2VkQW1vdW50KCl7XHJcblx0XHRcdFx0dGhpcy5maWF0ID0gIXRoaXMudG9TZW5kLmFtb3VudCB8fCB0aGlzLnRvU2VuZC5hbW91bnQgPT09ICcnID8gbnVsbCA6IHRoaXMudG9TZW5kLmZpYXRCYWxhbmNlKGZhbHNlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRhc3luYyBzZW5kKCl7XHJcblx0XHRcdFx0Y29uc3QgcmVzZXQgPSAoKSA9PiB0aGlzLnNlbmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRpZighdGhpcy5jYW5TZW5kKSByZXR1cm47XHJcblx0XHRcdFx0Ly8gdGhpcy5zZW5kaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHQvLyBpZighYXdhaXQgUGFzc3dvcmRIZWxwZXJzLnZlcmlmeVBJTigpKSByZXR1cm4gcmVzZXQoKTtcclxuXHRcdFx0XHQvLyB0aGlzLnNldFdvcmtpbmdTY3JlZW4odHJ1ZSk7XHJcblx0XHRcdFx0Y29uc3QgYmxvY2tjaGFpbiA9IHRoaXMuYWNjb3VudC5ibG9ja2NoYWluKCk7XHJcblx0XHRcdFx0Y29uc3Qgc2VudCA9IGF3YWl0IFRyYW5zZmVyU2VydmljZVtibG9ja2NoYWluXSh7XHJcblx0XHRcdFx0XHRhY2NvdW50OnRoaXMuYWNjb3VudCxcclxuXHRcdFx0XHRcdHJlY2lwaWVudDp0aGlzLnJlY2lwaWVudCxcclxuXHRcdFx0XHRcdGFtb3VudDp0aGlzLnRvU2VuZC5hbW91bnQsXHJcblx0XHRcdFx0XHRtZW1vOnRoaXMubWVtbyxcclxuXHRcdFx0XHRcdHRva2VuOnRoaXMudG9rZW4sXHJcblx0XHRcdFx0XHRwcm9tcHRGb3JTaWduYXR1cmU6ZmFsc2UsXHJcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignVHJhbnNmZXIgZXJyb3InLCBlcnJvcik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJlc2V0KCk7XHJcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nU2NyZWVuKGZhbHNlKTtcclxuXHRcdFx0XHRpZihzZW50KSB7XHJcblx0XHRcdFx0XHRpZihzZW50Lmhhc093blByb3BlcnR5KCdlcnJvcicpKXtcclxuXHRcdFx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc25hY2tiYXIoc2VudC5lcnJvciwgXCJhdHRlbnRpb24tY2lyY2xlZFwiKSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHNlbnQpIHtcclxuXHRcdFx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAudHJhbnNhY3Rpb25TdWNjZXNzKGJsb2NrY2hhaW4sIFRyYW5zZmVyU2VydmljZS5nZXRUcmFuc2ZlcklkKHNlbnQsIGJsb2NrY2hhaW4pKSk7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdEJhbGFuY2VTZXJ2aWNlLmxvYWRCYWxhbmNlc0Zvcih0aGlzLmFjY291bnQpO1xyXG5cdFx0XHRcdFx0XHR9LCA1MDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc25hY2tiYXIoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gdHJhbnNmZXIgdGhlc2UgdG9rZW5zLlwiLCBcImF0dGVudGlvbi1jaXJjbGVkXCIpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG5cdEBpbXBvcnQgXCIuLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG5cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1RyYW5zZmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD05YmY0Y2ZjMCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1RyYW5zZmVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9UcmFuc2Zlci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD05YmY0Y2ZjMCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjliZjRjZmMwXCIsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==