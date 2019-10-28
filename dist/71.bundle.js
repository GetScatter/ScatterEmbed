(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[71],{

/***/ "/SjY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Histories.vue?vue&type=template&id=473193c5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"histories"},[_c('SearchAndFilter',{on:{"terms":function (x) { return _vm.terms = x; }}}),_vm._v(" "),_c('section',{staticClass:"events"},_vm._l((_vm.allHistories),function(item){return _c('section',[(item.type === 'transfer' || item.type === 'exchange')?_c('section',{staticClass:"event"},[_c('section',{staticClass:"details"},[(item.type === 'transfer')?_c('figure',{staticClass:"title"},[_vm._v("\n\t\t\t\t\t\tSent "+_vm._s(_vm.formatNumber(parseFloat(item.amount).toFixed(_vm.decimalsOrDefault(item.token)), true))+" "+_vm._s(item.token.symbol)+"\n\t\t\t\t\t")]):_vm._e(),_vm._v(" "),(item.type === 'exchange')?_c('figure',{staticClass:"title"},[_c('figure',{staticClass:"exchange-from"},[_vm._v("Exchanged "+_vm._s(_vm.formatNumber(parseFloat(item.amount).toFixed(_vm.decimalsOrDefault(item.token)), true))+" "+_vm._s(item.token.symbol))]),_vm._v("\n\t\t\t\t\t\tReceived "+_vm._s(_vm.formatNumber(parseFloat(item.toAmount).toFixed(_vm.decimalsOrDefault(item.toToken)), true))+" "+_vm._s(item.toToken.symbol)+"\n\t\t\t\t\t")]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"row"},[(item.type === 'exchange')?_c('figure',{staticClass:"status",on:{"click":function($event){return _vm.refreshStatus(item.id)}}},[(!_vm.loadingStatus)?_c('span',[_c('i',{staticClass:"icon-check"}),_vm._v(" "+_vm._s(item.status))]):_c('i',{staticClass:"icon-arrows-ccw animate-spin"})]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"date"},[_vm._v(_vm._s(new Date(item.timestamp).toLocaleString()))])]),_vm._v(" "),(item.memo && item.memo.length)?_c('section',{staticClass:"row"},[_c('figure',{staticClass:"memo"},[_vm._v(_vm._s(item.memo))])]):_vm._e()]),_vm._v(" "),_c('section',{staticClass:"participants"},[_c('section',{staticClass:"accounts"},[_c('figure',{staticClass:"account blue"},[_vm._v(_vm._s(item.from.sendable()))]),_vm._v(" "),(item.from.sendable() !== item.to)?_c('figure',{staticClass:"account"},[_vm._v(_vm._s(item.to))]):_vm._e()]),_vm._v(" "),(item.from.network())?_c('figure',{staticClass:"network"},[_vm._v(_vm._s(item.from.network().name))]):_c('figure',{staticClass:"network"},[_vm._v("Network disabled ("+_vm._s(item.from.networkUnique)+")")])]),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('Button',{attrs:{"text":"View"},nativeOn:{"click":function($event){return _vm.view(item)}}}),_vm._v(" "),_c('Button',{attrs:{"text":"Redo","blue":"1"},nativeOn:{"click":function($event){return _vm.redo(item)}}})],1)]):_vm._e(),_vm._v(" "),(item.type === 'action')?_c('section',{staticClass:"event"},[_c('section',{staticClass:"details"},[_c('figure',{staticClass:"title"},[_vm._v(_vm._s(item.action))]),_vm._v(" "),_c('section',{staticClass:"row"},[_c('figure',{staticClass:"date"},[_vm._v(_vm._s(new Date(item.timestamp).toLocaleString()))])])]),_vm._v(" "),_c('section',{staticClass:"participants"},[_c('section',{staticClass:"accounts"},[_c('figure',{staticClass:"account blue"},[_vm._v(_vm._s(item.account.sendable()))])]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(item.account.network().name))])]),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('Button',{attrs:{"text":"View"},nativeOn:{"click":function($event){return _vm.view(item)}}})],1)]):_vm._e()])}),0),_vm._v(" "),_c('section',{staticClass:"tail"},[_c('Button',{attrs:{"text":"Clear History","blue":"1"},nativeOn:{"click":function($event){return _vm.clearHistory($event)}}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Histories.vue?vue&type=template&id=473193c5&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/reusable/SearchAndFilter.vue + 4 modules
var SearchAndFilter = __webpack_require__("B0RS");

// EXTERNAL MODULE: ./src/components/svgs/quick-actions/Exchange.vue + 2 modules
var Exchange = __webpack_require__("q4Ju");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgs/quick-actions/Send.vue?vue&type=template&id=12275e0a&
var Sendvue_type_template_id_12275e0a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('img',{attrs:{"src":"static/assets/icon_send.png"}})}
var Sendvue_type_template_id_12275e0a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgs/quick-actions/Send.vue?vue&type=template&id=12275e0a&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/svgs/quick-actions/Send.vue

var script = {}


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  Sendvue_type_template_id_12275e0a_render,
  Sendvue_type_template_id_12275e0a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Send = (component.exports);
// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/histories/History.js
var History = __webpack_require__("EnWD");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apis/ExchangeService.js
var ExchangeService = __webpack_require__("l31u");
var ExchangeService_default = /*#__PURE__*/__webpack_require__.n(ExchangeService);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Histories.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ var Historiesvue_type_script_lang_js_ = ({
	components: {
		SearchAndFilter: SearchAndFilter["a" /* default */],
		Exchange: Exchange["a" /* default */],
		Transfer: Send
	},
	data(){return {
		networkFilter:null,
		typeFilter:null,
		terms:'',
		loadingStatus:false,
	}},
	mounted(){
		// Fix for old bug which might have left dangling histories
		this.history.map(x => {
			const acc = x.type === 'action' ? x.account : x.from;
			if(!this.keypairs.find(kp => kp.unique() === acc.keypairUnique)){
				this[constants["DELTA_HISTORY"]](x);
			}
		})
	},
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'history',
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'accounts',
			'explorers',
			'keypairs',
		]),
		filteredTokenHistories(){
			return this.history
				.filter(x => [History["HISTORY_TYPES"].Transfer, History["HISTORY_TYPES"].Exchange].includes(x.type))
				.map(item => {
					const token = item.type === History["HISTORY_TYPES"].Transfer ? item.token : item.fromToken;
					const toToken = item.type === History["HISTORY_TYPES"].Transfer ? null : item.toToken;
					const amount = item.type === History["HISTORY_TYPES"].Transfer ? item.amount : item.fromToken.amount;
					const toAmount = item.type === History["HISTORY_TYPES"].Transfer ? null : item.orderDetails.expected;

					return {
						id:item.id,
						type:item.type,
						from:item.from,
						to:item.to,
						token,
						memo:item.memo,
						amount,
						toAmount,
						timestamp:item.timestamp,
						txid:item.txid,
						toToken,
						order:item.orderDetails,
						status:item.status,
					}
				})
				.filter(x => !this.networkFilter ? true : x.from.network().unique() === this.networkFilter.unique())
				.filter(x => !this.terms.length ? true : (() => {
					return x.from.sendable().toLowerCase().indexOf(this.terms) > -1 ||
						x.to.toLowerCase().indexOf(this.terms) > -1 ||
						x.token.symbol.toLowerCase().indexOf(this.terms) > -1 ||
						(x.memo && x.memo.toLowerCase().indexOf(this.terms) > -1)
				})())
		},
		filteredActionHistories(){
			return this.history
				.filter(x => [History["HISTORY_TYPES"].Action].includes(x.type))
				.map(item => {
					const clone = item.clone();
					clone.account = this.accounts.find(x => x.unique() === item.account);
					if(!clone.account) return null;
					clone.token = clone.account.network().systemToken().clone();
					return clone;
				})
				.filter(x => x)
				.filter(x => !this.networkFilter ? true : x.account.network().unique() === this.networkFilter.unique())
				.filter(x => !this.terms.length ? true : (() => {
					return x.account.sendable().toLowerCase().indexOf(this.terms) > -1 ||
						x.action.toLowerCase().indexOf(this.terms) > -1
				})())
		},
		allHistories(){
			return this.filteredTokenHistories.concat(this.filteredActionHistories)
				.filter(x => !this.typeFilter ? true : x.type === this.typeFilter)
				.sort((a,b) => b.timestamp - a.timestamp)
		}
	},
	methods:{
		decimalsOrDefault(token){
			if(token.decimals) return token.decimals;
			return PluginRepository.plugin(token.blockchain).defaultDecimals();
		},
		async refreshStatus(id){
			this.loadingStatus = true;
			const history = this.history.find(x => x.id === id);
			if(!history) return this.loadingStatus = false;
			const orderStatus = await ExchangeService_default.a.orderStatus(history.orderDetails.id);
			if(history.status !== orderStatus){
				history.status = orderStatus;
				await this[constants["UPDATE_HISTORY"]](history);
			}
			this.loadingStatus = false;
		},
		clearHistory(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].prompt('Clearing history', 'You are about to erase your entire local history. This will not erase keys or accounts.', yes => {
				if(yes) {
					this[constants["DELTA_HISTORY"]](null);
					this.$router.push({name:this.RouteNames.HOME})
				}
			}, true));
		},
		view(item){
			const explorer = this.explorers[item.token.blockchain].parsed();
			this.openInBrowser(explorer.transaction(item.txid));
		},
		redo(item){
			if(item.type === History["HISTORY_TYPES"].Exchange){
				this.$router.push({name:this.RouteNames.EXCHANGE, query:{history:item.id}});
			}
			else {
				this.$router.push({name:this.RouteNames.TRANSFER, query:{history:item.id}});
			}
		},
		...Object(vuex_esm["b" /* mapActions */])([
			constants["DELTA_HISTORY"],
			constants["UPDATE_HISTORY"],
		])
	}
});

// CONCATENATED MODULE: ./src/views/Histories.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Historiesvue_type_script_lang_js_ = (Historiesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Histories.vue?vue&type=style&index=0&id=473193c5&scoped=true&lang=scss&
var Historiesvue_type_style_index_0_id_473193c5_scoped_true_lang_scss_ = __webpack_require__("1XCn");

// CONCATENATED MODULE: ./src/views/Histories.vue






/* normalize component */

var Histories_component = Object(componentNormalizer["a" /* default */])(
  views_Historiesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "473193c5",
  null
  
)

/* harmony default export */ var Histories = __webpack_exports__["default"] = (Histories_component.exports);

/***/ }),

/***/ "1XCn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Histories_vue_vue_type_style_index_0_id_473193c5_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cX2l");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Histories_vue_vue_type_style_index_0_id_473193c5_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Histories_vue_vue_type_style_index_0_id_473193c5_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Histories_vue_vue_type_style_index_0_id_473193c5_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "Zm+8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".histories[data-v-473193c5]{height:calc(100vh - 0px);display:flex;flex-direction:column}.histories .tail[data-v-473193c5]{flex:0 0 auto;display:flex;align-items:center;padding:0 20px;height:70px;border-top:1px solid #dfe0e1;justify-content:flex-end}.histories .events[data-v-473193c5]{overflow-y:scroll;padding:10px 40px;flex:1}.histories .events .event[data-v-473193c5]{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dfe0e1;padding:20px 0}.histories .events .event .icon[data-v-473193c5]{flex:0 0 auto;margin-right:20px}.histories .events .event .details[data-v-473193c5]{flex:1;padding-right:20px}.histories .events .event .details .title[data-v-473193c5]{font-size:12px;font-weight:bold}.histories .events .event .details .exchange-from[data-v-473193c5]{font-size:10px;color:#7a7a7a}.histories .events .event .details .row[data-v-473193c5]{margin-top:3px;font-size:10px;display:flex}.histories .events .event .details .row .status[data-v-473193c5]{margin-right:12px}.histories .events .event .details .row .memo[data-v-473193c5]{margin-top:10px;font-size:9px;padding:5px;border:1px solid #dfe0e1;border-radius:0}.histories .events .event .participants[data-v-473193c5]{flex:1;font-size:10px}.histories .events .event .participants .account[data-v-473193c5]{font-weight:bold}.histories .events .event .participants .account.blue[data-v-473193c5]{color:#0799ff}.histories .events .event .participants .network[data-v-473193c5]{font-size:9px;color:#7a7a7a;margin-top:10px}.histories .events .event .actions[data-v-473193c5]{padding-left:20px;display:flex;justify-content:flex-end}.histories .events .event .actions button[data-v-473193c5]{margin-right:10px}\n", ""]);


/***/ }),

/***/ "cX2l":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Zm+8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("50ae6de1", content, true, {});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvSGlzdG9yaWVzLnZ1ZT83N2FhIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvcXVpY2stYWN0aW9ucy9TZW5kLnZ1ZT8zZGM4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvcXVpY2stYWN0aW9ucy9TZW5kLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL3ZpZXdzL0hpc3Rvcmllcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0hpc3Rvcmllcy52dWU/MjZkYyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvSGlzdG9yaWVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvSGlzdG9yaWVzLnZ1ZT84MjBmIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9IaXN0b3JpZXMudnVlP2QyNmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0hpc3Rvcmllcy52dWU/ZjcxNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQix3QkFBd0Isd0JBQXdCLElBQUksc0JBQXNCLHNCQUFzQixJQUFJLDRCQUE0QixxQkFBcUIsMENBQTBDLDBGQUEwRixvQkFBb0IsZ0JBQWdCLHNCQUFzQiwwQ0FBMEMsb0JBQW9CLCtPQUErTyxvQkFBb0IsZUFBZSw0QkFBNEIsdVhBQXVYLGtCQUFrQiwwQ0FBMEMseUJBQXlCLHlCQUF5QixvQ0FBb0MsMENBQTBDLHlCQUF5Qiw0Q0FBNEMsMkNBQTJDLHNDQUFzQyxtQkFBbUIsMEhBQTBILGtCQUFrQixlQUFlLG1CQUFtQixxRUFBcUUsMkJBQTJCLGdCQUFnQix1QkFBdUIsZUFBZSwyQkFBMkIscUdBQXFHLHNCQUFzQixzRkFBc0Ysc0JBQXNCLDBEQUEwRCxzQkFBc0IsaUdBQWlHLHNCQUFzQixlQUFlLE9BQU8sY0FBYyxXQUFXLHlCQUF5Qix3QkFBd0IsMkJBQTJCLE9BQU8seUJBQXlCLFdB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QUFhLGlFQUFpRSxrQkFBa0IsK0RBQStELGdCQUFnQixjQUFjLFlBQVkseUJBQXlCLGdCQUFnQix5REFBeUQsT0FBTyxlQUFlLGtFQUFrRSxpQkFBaUIsdUVBQXVFLGNBQWMsa0VBQWtFLGNBQWMsY0FBYyxnQkFBZ0Isb0RBQW9ELGtCQUFrQixhQUFhLHlCQUF5QiwyREFBMkQsa0JBQWtCOzs7Ozs7OztBQ0YzckQ7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBOFI7QUFDcFQsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUE2RDtBQUMvRSw4Q0FBOEMsRSIsImZpbGUiOiI3MS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaGlzdG9yaWVzXCJ9LFtfYygnU2VhcmNoQW5kRmlsdGVyJyx7b246e1widGVybXNcIjpmdW5jdGlvbiAoeCkgeyByZXR1cm4gX3ZtLnRlcm1zID0geDsgfX19KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJldmVudHNcIn0sX3ZtLl9sKChfdm0uYWxsSGlzdG9yaWVzKSxmdW5jdGlvbihpdGVtKXtyZXR1cm4gX2MoJ3NlY3Rpb24nLFsoaXRlbS50eXBlID09PSAndHJhbnNmZXInIHx8IGl0ZW0udHlwZSA9PT0gJ2V4Y2hhbmdlJyk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImV2ZW50XCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZGV0YWlsc1wifSxbKGl0ZW0udHlwZSA9PT0gJ3RyYW5zZmVyJyk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW192bS5fdihcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFNlbnQgXCIrX3ZtLl9zKF92bS5mb3JtYXROdW1iZXIocGFyc2VGbG9hdChpdGVtLmFtb3VudCkudG9GaXhlZChfdm0uZGVjaW1hbHNPckRlZmF1bHQoaXRlbS50b2tlbikpLCB0cnVlKSkrXCIgXCIrX3ZtLl9zKGl0ZW0udG9rZW4uc3ltYm9sKStcIlxcblxcdFxcdFxcdFxcdFxcdFwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKGl0ZW0udHlwZSA9PT0gJ2V4Y2hhbmdlJyk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImV4Y2hhbmdlLWZyb21cIn0sW192bS5fdihcIkV4Y2hhbmdlZCBcIitfdm0uX3MoX3ZtLmZvcm1hdE51bWJlcihwYXJzZUZsb2F0KGl0ZW0uYW1vdW50KS50b0ZpeGVkKF92bS5kZWNpbWFsc09yRGVmYXVsdChpdGVtLnRva2VuKSksIHRydWUpKStcIiBcIitfdm0uX3MoaXRlbS50b2tlbi5zeW1ib2wpKV0pLF92bS5fdihcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFJlY2VpdmVkIFwiK192bS5fcyhfdm0uZm9ybWF0TnVtYmVyKHBhcnNlRmxvYXQoaXRlbS50b0Ftb3VudCkudG9GaXhlZChfdm0uZGVjaW1hbHNPckRlZmF1bHQoaXRlbS50b1Rva2VuKSksIHRydWUpKStcIiBcIitfdm0uX3MoaXRlbS50b1Rva2VuLnN5bWJvbCkrXCJcXG5cXHRcXHRcXHRcXHRcXHRcIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJyb3dcIn0sWyhpdGVtLnR5cGUgPT09ICdleGNoYW5nZScpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInN0YXR1c1wiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJlZnJlc2hTdGF0dXMoaXRlbS5pZCl9fX0sWyghX3ZtLmxvYWRpbmdTdGF0dXMpP19jKCdzcGFuJyxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tY2hlY2tcIn0pLF92bS5fdihcIiBcIitfdm0uX3MoaXRlbS5zdGF0dXMpKV0pOl9jKCdpJyx7c3RhdGljQ2xhc3M6XCJpY29uLWFycm93cy1jY3cgYW5pbWF0ZS1zcGluXCJ9KV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiZGF0ZVwifSxbX3ZtLl92KF92bS5fcyhuZXcgRGF0ZShpdGVtLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoKSkpXSldKSxfdm0uX3YoXCIgXCIpLChpdGVtLm1lbW8gJiYgaXRlbS5tZW1vLmxlbmd0aCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJvd1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibWVtb1wifSxbX3ZtLl92KF92bS5fcyhpdGVtLm1lbW8pKV0pXSk6X3ZtLl9lKCldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYXJ0aWNpcGFudHNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJhY2NvdW50c1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiYWNjb3VudCBibHVlXCJ9LFtfdm0uX3YoX3ZtLl9zKGl0ZW0uZnJvbS5zZW5kYWJsZSgpKSldKSxfdm0uX3YoXCIgXCIpLChpdGVtLmZyb20uc2VuZGFibGUoKSAhPT0gaXRlbS50byk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiYWNjb3VudFwifSxbX3ZtLl92KF92bS5fcyhpdGVtLnRvKSldKTpfdm0uX2UoKV0pLF92bS5fdihcIiBcIiksKGl0ZW0uZnJvbS5uZXR3b3JrKCkpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5ldHdvcmtcIn0sW192bS5fdihfdm0uX3MoaXRlbS5mcm9tLm5ldHdvcmsoKS5uYW1lKSldKTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuZXR3b3JrXCJ9LFtfdm0uX3YoXCJOZXR3b3JrIGRpc2FibGVkIChcIitfdm0uX3MoaXRlbS5mcm9tLm5ldHdvcmtVbmlxdWUpK1wiKVwiKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYWN0aW9uc1wifSxbX2MoJ0J1dHRvbicse2F0dHJzOntcInRleHRcIjpcIlZpZXdcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0udmlldyhpdGVtKX19fSksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOlwiUmVkb1wiLFwiYmx1ZVwiOlwiMVwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5yZWRvKGl0ZW0pfX19KV0sMSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChpdGVtLnR5cGUgPT09ICdhY3Rpb24nKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZXZlbnRcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJkZXRhaWxzXCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0aXRsZVwifSxbX3ZtLl92KF92bS5fcyhpdGVtLmFjdGlvbikpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicm93XCJ9LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJkYXRlXCJ9LFtfdm0uX3YoX3ZtLl9zKG5ldyBEYXRlKGl0ZW0udGltZXN0YW1wKS50b0xvY2FsZVN0cmluZygpKSldKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicGFydGljaXBhbnRzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYWNjb3VudHNcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImFjY291bnQgYmx1ZVwifSxbX3ZtLl92KF92bS5fcyhpdGVtLmFjY291bnQuc2VuZGFibGUoKSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5ldHdvcmtcIn0sW192bS5fdihfdm0uX3MoaXRlbS5hY2NvdW50Lm5ldHdvcmsoKS5uYW1lKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjdGlvbnNcIn0sW19jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6XCJWaWV3XCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnZpZXcoaXRlbSl9fX0pXSwxKV0pOl92bS5fZSgpXSl9KSwwKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ0YWlsXCJ9LFtfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOlwiQ2xlYXIgSGlzdG9yeVwiLFwiYmx1ZVwiOlwiMVwifSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5jbGVhckhpc3RvcnkoJGV2ZW50KX19fSldLDEpXSwxKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ2ltZycse2F0dHJzOntcInNyY1wiOlwic3RhdGljL2Fzc2V0cy9pY29uX3NlbmQucG5nXCJ9fSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU2VuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTIyNzVlMGEmXCJcbnZhciBzY3JpcHQgPSB7fVxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwiaGlzdG9yaWVzXCI+XHJcblx0XHQ8U2VhcmNoQW5kRmlsdGVyIHYtb246dGVybXM9XCJ4ID0+IHRlcm1zID0geFwiIC8+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJldmVudHNcIj5cclxuXHJcblx0XHRcdDxzZWN0aW9uIHYtZm9yPVwiaXRlbSBpbiBhbGxIaXN0b3JpZXNcIj5cclxuXHJcblx0XHRcdFx0PCEtLSBUUkFOU0ZFUiBPUiBFWENIQU5HRSAtLT5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImV2ZW50XCIgdi1pZj1cIml0ZW0udHlwZSA9PT0gJ3RyYW5zZmVyJyB8fCBpdGVtLnR5cGUgPT09ICdleGNoYW5nZSdcIj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImRldGFpbHNcIj5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRpdGxlXCIgdi1pZj1cIml0ZW0udHlwZSA9PT0gJ3RyYW5zZmVyJ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFNlbnQge3tmb3JtYXROdW1iZXIocGFyc2VGbG9hdChpdGVtLmFtb3VudCkudG9GaXhlZChkZWNpbWFsc09yRGVmYXVsdChpdGVtLnRva2VuKSksIHRydWUpfX0ge3tpdGVtLnRva2VuLnN5bWJvbH19XHJcblx0XHRcdFx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwidGl0bGVcIiB2LWlmPVwiaXRlbS50eXBlID09PSAnZXhjaGFuZ2UnXCI+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImV4Y2hhbmdlLWZyb21cIj5FeGNoYW5nZWQge3tmb3JtYXROdW1iZXIocGFyc2VGbG9hdChpdGVtLmFtb3VudCkudG9GaXhlZChkZWNpbWFsc09yRGVmYXVsdChpdGVtLnRva2VuKSksIHRydWUpfX0ge3tpdGVtLnRva2VuLnN5bWJvbH19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0UmVjZWl2ZWQge3tmb3JtYXROdW1iZXIocGFyc2VGbG9hdChpdGVtLnRvQW1vdW50KS50b0ZpeGVkKGRlY2ltYWxzT3JEZWZhdWx0KGl0ZW0udG9Ub2tlbikpLCB0cnVlKX19IHt7aXRlbS50b1Rva2VuLnN5bWJvbH19XHJcblx0XHRcdFx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJzdGF0dXNcIiBAY2xpY2s9XCJyZWZyZXNoU3RhdHVzKGl0ZW0uaWQpXCIgdi1pZj1cIml0ZW0udHlwZSA9PT0gJ2V4Y2hhbmdlJ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4gdi1pZj1cIiFsb2FkaW5nU3RhdHVzXCI+PGkgY2xhc3M9XCJpY29uLWNoZWNrXCI+PC9pPiB7e2l0ZW0uc3RhdHVzfX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImljb24tYXJyb3dzLWNjdyBhbmltYXRlLXNwaW5cIiB2LWVsc2U+PC9pPlxyXG5cdFx0XHRcdFx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJkYXRlXCI+e3tuZXcgRGF0ZShpdGVtLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoKX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJyb3dcIiB2LWlmPVwiaXRlbS5tZW1vICYmIGl0ZW0ubWVtby5sZW5ndGhcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibWVtb1wiPnt7aXRlbS5tZW1vfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwicGFydGljaXBhbnRzXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYWNjb3VudHNcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiYWNjb3VudCBibHVlXCI+e3tpdGVtLmZyb20uc2VuZGFibGUoKX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImFjY291bnRcIiB2LWlmPVwiaXRlbS5mcm9tLnNlbmRhYmxlKCkgIT09IGl0ZW0udG9cIj57e2l0ZW0udG99fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCIgdi1pZj1cIml0ZW0uZnJvbS5uZXR3b3JrKClcIj57e2l0ZW0uZnJvbS5uZXR3b3JrKCkubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCIgdi1lbHNlPk5ldHdvcmsgZGlzYWJsZWQgKHt7aXRlbS5mcm9tLm5ldHdvcmtVbmlxdWV9fSk8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImFjdGlvbnNcIj5cclxuXHRcdFx0XHRcdFx0PEJ1dHRvbiB0ZXh0PVwiVmlld1wiIEBjbGljay5uYXRpdmU9XCJ2aWV3KGl0ZW0pXCIgLz5cclxuXHRcdFx0XHRcdFx0PEJ1dHRvbiB0ZXh0PVwiUmVkb1wiIGJsdWU9XCIxXCIgQGNsaWNrLm5hdGl2ZT1cInJlZG8oaXRlbSlcIiAvPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblxyXG5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImV2ZW50XCIgdi1pZj1cIml0ZW0udHlwZSA9PT0gJ2FjdGlvbidcIj5cclxuXHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImRldGFpbHNcIj5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRpdGxlXCI+e3tpdGVtLmFjdGlvbn19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImRhdGVcIj57e25ldyBEYXRlKGl0ZW0udGltZXN0YW1wKS50b0xvY2FsZVN0cmluZygpfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwicGFydGljaXBhbnRzXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYWNjb3VudHNcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiYWNjb3VudCBibHVlXCI+e3tpdGVtLmFjY291bnQuc2VuZGFibGUoKX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cIm5ldHdvcmtcIj57e2l0ZW0uYWNjb3VudC5uZXR3b3JrKCkubmFtZX19PC9maWd1cmU+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhY3Rpb25zXCI+XHJcblx0XHRcdFx0XHRcdDxCdXR0b24gdGV4dD1cIlZpZXdcIiBAY2xpY2submF0aXZlPVwidmlldyhpdGVtKVwiIC8+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwidGFpbFwiPlxyXG5cdFx0XHQ8QnV0dG9uIEBjbGljay5uYXRpdmU9XCJjbGVhckhpc3RvcnlcIiB0ZXh0PVwiQ2xlYXIgSGlzdG9yeVwiIGJsdWU9XCIxXCIgLz5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7bWFwU3RhdGUsIG1hcEFjdGlvbnMsIG1hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xyXG5cdGltcG9ydCBTZWFyY2hBbmRGaWx0ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvcmV1c2FibGUvU2VhcmNoQW5kRmlsdGVyXCI7XHJcblx0aW1wb3J0IEV4Y2hhbmdlIGZyb20gJy4uL2NvbXBvbmVudHMvc3Zncy9xdWljay1hY3Rpb25zL0V4Y2hhbmdlJ1xyXG5cdGltcG9ydCBUcmFuc2ZlciBmcm9tICcuLi9jb21wb25lbnRzL3N2Z3MvcXVpY2stYWN0aW9ucy9TZW5kJ1xyXG5cdGltcG9ydCB7SElTVE9SWV9UWVBFU30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL2hpc3Rvcmllcy9IaXN0b3J5XCI7XHJcblx0aW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zdG9yZS9jb25zdGFudHNcIjtcclxuXHRpbXBvcnQgRXhjaGFuZ2VTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2FwaXMvRXhjaGFuZ2VTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFBvcHVwU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvdXRpbGl0eS9Qb3B1cFNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOiB7XHJcblx0XHRcdFNlYXJjaEFuZEZpbHRlcixcclxuXHRcdFx0RXhjaGFuZ2UsXHJcblx0XHRcdFRyYW5zZmVyXHJcblx0XHR9LFxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblx0XHRcdG5ldHdvcmtGaWx0ZXI6bnVsbCxcclxuXHRcdFx0dHlwZUZpbHRlcjpudWxsLFxyXG5cdFx0XHR0ZXJtczonJyxcclxuXHRcdFx0bG9hZGluZ1N0YXR1czpmYWxzZSxcclxuXHRcdH19LFxyXG5cdFx0bW91bnRlZCgpe1xyXG5cdFx0XHQvLyBGaXggZm9yIG9sZCBidWcgd2hpY2ggbWlnaHQgaGF2ZSBsZWZ0IGRhbmdsaW5nIGhpc3Rvcmllc1xyXG5cdFx0XHR0aGlzLmhpc3RvcnkubWFwKHggPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGFjYyA9IHgudHlwZSA9PT0gJ2FjdGlvbicgPyB4LmFjY291bnQgOiB4LmZyb207XHJcblx0XHRcdFx0aWYoIXRoaXMua2V5cGFpcnMuZmluZChrcCA9PiBrcC51bmlxdWUoKSA9PT0gYWNjLmtleXBhaXJVbmlxdWUpKXtcclxuXHRcdFx0XHRcdHRoaXNbQWN0aW9ucy5ERUxUQV9ISVNUT1JZXSh4KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J2hpc3RvcnknLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J2FjY291bnRzJyxcclxuXHRcdFx0XHQnZXhwbG9yZXJzJyxcclxuXHRcdFx0XHQna2V5cGFpcnMnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0ZmlsdGVyZWRUb2tlbkhpc3Rvcmllcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmhpc3RvcnlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiBbSElTVE9SWV9UWVBFUy5UcmFuc2ZlciwgSElTVE9SWV9UWVBFUy5FeGNoYW5nZV0uaW5jbHVkZXMoeC50eXBlKSlcclxuXHRcdFx0XHRcdC5tYXAoaXRlbSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHRva2VuID0gaXRlbS50eXBlID09PSBISVNUT1JZX1RZUEVTLlRyYW5zZmVyID8gaXRlbS50b2tlbiA6IGl0ZW0uZnJvbVRva2VuO1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0b1Rva2VuID0gaXRlbS50eXBlID09PSBISVNUT1JZX1RZUEVTLlRyYW5zZmVyID8gbnVsbCA6IGl0ZW0udG9Ub2tlbjtcclxuXHRcdFx0XHRcdFx0Y29uc3QgYW1vdW50ID0gaXRlbS50eXBlID09PSBISVNUT1JZX1RZUEVTLlRyYW5zZmVyID8gaXRlbS5hbW91bnQgOiBpdGVtLmZyb21Ub2tlbi5hbW91bnQ7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHRvQW1vdW50ID0gaXRlbS50eXBlID09PSBISVNUT1JZX1RZUEVTLlRyYW5zZmVyID8gbnVsbCA6IGl0ZW0ub3JkZXJEZXRhaWxzLmV4cGVjdGVkO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRpZDppdGVtLmlkLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6aXRlbS50eXBlLFxyXG5cdFx0XHRcdFx0XHRcdGZyb206aXRlbS5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdHRvOml0ZW0udG8sXHJcblx0XHRcdFx0XHRcdFx0dG9rZW4sXHJcblx0XHRcdFx0XHRcdFx0bWVtbzppdGVtLm1lbW8sXHJcblx0XHRcdFx0XHRcdFx0YW1vdW50LFxyXG5cdFx0XHRcdFx0XHRcdHRvQW1vdW50LFxyXG5cdFx0XHRcdFx0XHRcdHRpbWVzdGFtcDppdGVtLnRpbWVzdGFtcCxcclxuXHRcdFx0XHRcdFx0XHR0eGlkOml0ZW0udHhpZCxcclxuXHRcdFx0XHRcdFx0XHR0b1Rva2VuLFxyXG5cdFx0XHRcdFx0XHRcdG9yZGVyOml0ZW0ub3JkZXJEZXRhaWxzLFxyXG5cdFx0XHRcdFx0XHRcdHN0YXR1czppdGVtLnN0YXR1cyxcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiAhdGhpcy5uZXR3b3JrRmlsdGVyID8gdHJ1ZSA6IHguZnJvbS5uZXR3b3JrKCkudW5pcXVlKCkgPT09IHRoaXMubmV0d29ya0ZpbHRlci51bmlxdWUoKSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiAhdGhpcy50ZXJtcy5sZW5ndGggPyB0cnVlIDogKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHguZnJvbS5zZW5kYWJsZSgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm1zKSA+IC0xIHx8XHJcblx0XHRcdFx0XHRcdFx0eC50by50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy50ZXJtcykgPiAtMSB8fFxyXG5cdFx0XHRcdFx0XHRcdHgudG9rZW4uc3ltYm9sLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm1zKSA+IC0xIHx8XHJcblx0XHRcdFx0XHRcdFx0KHgubWVtbyAmJiB4Lm1lbW8udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMudGVybXMpID4gLTEpXHJcblx0XHRcdFx0XHR9KSgpKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmaWx0ZXJlZEFjdGlvbkhpc3Rvcmllcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmhpc3RvcnlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiBbSElTVE9SWV9UWVBFUy5BY3Rpb25dLmluY2x1ZGVzKHgudHlwZSkpXHJcblx0XHRcdFx0XHQubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBjbG9uZSA9IGl0ZW0uY2xvbmUoKTtcclxuXHRcdFx0XHRcdFx0Y2xvbmUuYWNjb3VudCA9IHRoaXMuYWNjb3VudHMuZmluZCh4ID0+IHgudW5pcXVlKCkgPT09IGl0ZW0uYWNjb3VudCk7XHJcblx0XHRcdFx0XHRcdGlmKCFjbG9uZS5hY2NvdW50KSByZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcdFx0Y2xvbmUudG9rZW4gPSBjbG9uZS5hY2NvdW50Lm5ldHdvcmsoKS5zeXN0ZW1Ub2tlbigpLmNsb25lKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjbG9uZTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQuZmlsdGVyKHggPT4geClcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiAhdGhpcy5uZXR3b3JrRmlsdGVyID8gdHJ1ZSA6IHguYWNjb3VudC5uZXR3b3JrKCkudW5pcXVlKCkgPT09IHRoaXMubmV0d29ya0ZpbHRlci51bmlxdWUoKSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiAhdGhpcy50ZXJtcy5sZW5ndGggPyB0cnVlIDogKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHguYWNjb3VudC5zZW5kYWJsZSgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm1zKSA+IC0xIHx8XHJcblx0XHRcdFx0XHRcdFx0eC5hY3Rpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMudGVybXMpID4gLTFcclxuXHRcdFx0XHRcdH0pKCkpXHJcblx0XHRcdH0sXHJcblx0XHRcdGFsbEhpc3Rvcmllcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpbHRlcmVkVG9rZW5IaXN0b3JpZXMuY29uY2F0KHRoaXMuZmlsdGVyZWRBY3Rpb25IaXN0b3JpZXMpXHJcblx0XHRcdFx0XHQuZmlsdGVyKHggPT4gIXRoaXMudHlwZUZpbHRlciA/IHRydWUgOiB4LnR5cGUgPT09IHRoaXMudHlwZUZpbHRlcilcclxuXHRcdFx0XHRcdC5zb3J0KChhLGIpID0+IGIudGltZXN0YW1wIC0gYS50aW1lc3RhbXApXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHRcdFx0ZGVjaW1hbHNPckRlZmF1bHQodG9rZW4pe1xyXG5cdFx0XHRcdGlmKHRva2VuLmRlY2ltYWxzKSByZXR1cm4gdG9rZW4uZGVjaW1hbHM7XHJcblx0XHRcdFx0cmV0dXJuIFBsdWdpblJlcG9zaXRvcnkucGx1Z2luKHRva2VuLmJsb2NrY2hhaW4pLmRlZmF1bHREZWNpbWFscygpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhc3luYyByZWZyZXNoU3RhdHVzKGlkKXtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSB0cnVlO1xyXG5cdFx0XHRcdGNvbnN0IGhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZmluZCh4ID0+IHguaWQgPT09IGlkKTtcclxuXHRcdFx0XHRpZighaGlzdG9yeSkgcmV0dXJuIHRoaXMubG9hZGluZ1N0YXR1cyA9IGZhbHNlO1xyXG5cdFx0XHRcdGNvbnN0IG9yZGVyU3RhdHVzID0gYXdhaXQgRXhjaGFuZ2VTZXJ2aWNlLm9yZGVyU3RhdHVzKGhpc3Rvcnkub3JkZXJEZXRhaWxzLmlkKTtcclxuXHRcdFx0XHRpZihoaXN0b3J5LnN0YXR1cyAhPT0gb3JkZXJTdGF0dXMpe1xyXG5cdFx0XHRcdFx0aGlzdG9yeS5zdGF0dXMgPSBvcmRlclN0YXR1cztcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXNbQWN0aW9ucy5VUERBVEVfSElTVE9SWV0oaGlzdG9yeSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IGZhbHNlO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjbGVhckhpc3RvcnkoKXtcclxuXHRcdFx0XHRQb3B1cFNlcnZpY2UucHVzaChQb3B1cC5wcm9tcHQoJ0NsZWFyaW5nIGhpc3RvcnknLCAnWW91IGFyZSBhYm91dCB0byBlcmFzZSB5b3VyIGVudGlyZSBsb2NhbCBoaXN0b3J5LiBUaGlzIHdpbGwgbm90IGVyYXNlIGtleXMgb3IgYWNjb3VudHMuJywgeWVzID0+IHtcclxuXHRcdFx0XHRcdGlmKHllcykge1xyXG5cdFx0XHRcdFx0XHR0aGlzW0FjdGlvbnMuREVMVEFfSElTVE9SWV0obnVsbCk7XHJcblx0XHRcdFx0XHRcdHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOnRoaXMuUm91dGVOYW1lcy5IT01FfSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCB0cnVlKSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHZpZXcoaXRlbSl7XHJcblx0XHRcdFx0Y29uc3QgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyc1tpdGVtLnRva2VuLmJsb2NrY2hhaW5dLnBhcnNlZCgpO1xyXG5cdFx0XHRcdHRoaXMub3BlbkluQnJvd3NlcihleHBsb3Jlci50cmFuc2FjdGlvbihpdGVtLnR4aWQpKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cmVkbyhpdGVtKXtcclxuXHRcdFx0XHRpZihpdGVtLnR5cGUgPT09IEhJU1RPUllfVFlQRVMuRXhjaGFuZ2Upe1xyXG5cdFx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6dGhpcy5Sb3V0ZU5hbWVzLkVYQ0hBTkdFLCBxdWVyeTp7aGlzdG9yeTppdGVtLmlkfX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOnRoaXMuUm91dGVOYW1lcy5UUkFOU0ZFUiwgcXVlcnk6e2hpc3Rvcnk6aXRlbS5pZH19KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdC4uLm1hcEFjdGlvbnMoW1xyXG5cdFx0XHRcdEFjdGlvbnMuREVMVEFfSElTVE9SWSxcclxuXHRcdFx0XHRBY3Rpb25zLlVQREFURV9ISVNUT1JZLFxyXG5cdFx0XHRdKVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0Lmhpc3RvcmllcyB7XHJcblx0XHRoZWlnaHQ6JGZ1bGxoZWlnaHQ7XHJcblx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuXHRcdC50YWlsIHtcclxuXHRcdFx0ZmxleDowIDAgYXV0bztcclxuXHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0XHRwYWRkaW5nOjAgMjBweDtcclxuXHRcdFx0aGVpZ2h0OjcwcHg7XHJcblx0XHRcdGJvcmRlci10b3A6MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC5ldmVudHMge1xyXG5cdFx0XHRvdmVyZmxvdy15OnNjcm9sbDtcclxuXHRcdFx0cGFkZGluZzoxMHB4IDQwcHg7XHJcblx0XHRcdGZsZXg6MTtcclxuXHJcblx0XHRcdC5ldmVudCB7XHJcblx0XHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cdFx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdFx0XHRcdGJvcmRlci1ib3R0b206MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblx0XHRcdFx0cGFkZGluZzoyMHB4IDA7XHJcblxyXG5cdFx0XHRcdC5pY29uIHtcclxuXHRcdFx0XHRcdGZsZXg6MCAwIGF1dG87XHJcblx0XHRcdFx0XHRtYXJnaW4tcmlnaHQ6MjBweDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5kZXRhaWxzIHtcclxuXHRcdFx0XHRcdGZsZXg6MTtcclxuXHRcdFx0XHRcdHBhZGRpbmctcmlnaHQ6MjBweDtcclxuXHJcblx0XHRcdFx0XHQudGl0bGUge1xyXG5cdFx0XHRcdFx0XHRmb250LXNpemU6ICRtZWRpdW07XHJcblx0XHRcdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC5leGNoYW5nZS1mcm9tIHtcclxuXHRcdFx0XHRcdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblx0XHRcdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0LnJvdyB7XHJcblx0XHRcdFx0XHRcdG1hcmdpbi10b3A6M3B4O1xyXG5cdFx0XHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTpmbGV4O1xyXG5cclxuXHRcdFx0XHRcdFx0LnN0YXR1cyB7XHJcblx0XHRcdFx0XHRcdFx0bWFyZ2luLXJpZ2h0OjEycHg7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC5kYXRlIHtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Lm1lbW8ge1xyXG5cdFx0XHRcdFx0XHRcdG1hcmdpbi10b3A6MTBweDtcclxuXHRcdFx0XHRcdFx0XHRmb250LXNpemU6ICR0aW55O1xyXG5cdFx0XHRcdFx0XHRcdHBhZGRpbmc6NXB4O1xyXG5cdFx0XHRcdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHRcdFx0XHRcdFx0XHRib3JkZXItcmFkaXVzOiRyYWRpdXM7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5wYXJ0aWNpcGFudHMge1xyXG5cdFx0XHRcdFx0ZmxleDoxO1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiAkc21hbGw7XHJcblxyXG5cdFx0XHRcdFx0LmFjY291bnQge1xyXG5cdFx0XHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHJcblx0XHRcdFx0XHRcdCYuYmx1ZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29sb3I6JGJsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQubmV0d29yayB7XHJcblx0XHRcdFx0XHRcdGZvbnQtc2l6ZTogJHRpbnk7XHJcblx0XHRcdFx0XHRcdGNvbG9yOiRzaWx2ZXI7XHJcblx0XHRcdFx0XHRcdG1hcmdpbi10b3A6MTBweDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC5hY3Rpb25zIHtcclxuXHRcdFx0XHRcdHBhZGRpbmctbGVmdDoyMHB4O1xyXG5cdFx0XHRcdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdFx0XHRcdGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uIHtcclxuXHRcdFx0XHRcdFx0bWFyZ2luLXJpZ2h0OjEwcHg7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGlzdG9yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hpc3Rvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0hpc3Rvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDczMTkzYzUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSGlzdG9yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vSGlzdG9yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9IaXN0b3JpZXMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDczMTkzYzUmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0NzMxOTNjNVwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hpc3Rvcmllcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NzMxOTNjNSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hpc3Rvcmllcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NzMxOTNjNSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oaXN0b3JpZXNbZGF0YS12LTQ3MzE5M2M1XXtoZWlnaHQ6Y2FsYygxMDB2aCAtIDBweCk7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uaGlzdG9yaWVzIC50YWlsW2RhdGEtdi00NzMxOTNjNV17ZmxleDowIDAgYXV0bztkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6MCAyMHB4O2hlaWdodDo3MHB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkZmUwZTE7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5oaXN0b3JpZXMgLmV2ZW50c1tkYXRhLXYtNDczMTkzYzVde292ZXJmbG93LXk6c2Nyb2xsO3BhZGRpbmc6MTBweCA0MHB4O2ZsZXg6MX0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50W2RhdGEtdi00NzMxOTNjNV17ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZGZlMGUxO3BhZGRpbmc6MjBweCAwfS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLmljb25bZGF0YS12LTQ3MzE5M2M1XXtmbGV4OjAgMCBhdXRvO21hcmdpbi1yaWdodDoyMHB4fS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLmRldGFpbHNbZGF0YS12LTQ3MzE5M2M1XXtmbGV4OjE7cGFkZGluZy1yaWdodDoyMHB4fS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLmRldGFpbHMgLnRpdGxlW2RhdGEtdi00NzMxOTNjNV17Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZH0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50IC5kZXRhaWxzIC5leGNoYW5nZS1mcm9tW2RhdGEtdi00NzMxOTNjNV17Zm9udC1zaXplOjEwcHg7Y29sb3I6IzdhN2E3YX0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50IC5kZXRhaWxzIC5yb3dbZGF0YS12LTQ3MzE5M2M1XXttYXJnaW4tdG9wOjNweDtmb250LXNpemU6MTBweDtkaXNwbGF5OmZsZXh9Lmhpc3RvcmllcyAuZXZlbnRzIC5ldmVudCAuZGV0YWlscyAucm93IC5zdGF0dXNbZGF0YS12LTQ3MzE5M2M1XXttYXJnaW4tcmlnaHQ6MTJweH0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50IC5kZXRhaWxzIC5yb3cgLm1lbW9bZGF0YS12LTQ3MzE5M2M1XXttYXJnaW4tdG9wOjEwcHg7Zm9udC1zaXplOjlweDtwYWRkaW5nOjVweDtib3JkZXI6MXB4IHNvbGlkICNkZmUwZTE7Ym9yZGVyLXJhZGl1czowfS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLnBhcnRpY2lwYW50c1tkYXRhLXYtNDczMTkzYzVde2ZsZXg6MTtmb250LXNpemU6MTBweH0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50IC5wYXJ0aWNpcGFudHMgLmFjY291bnRbZGF0YS12LTQ3MzE5M2M1XXtmb250LXdlaWdodDpib2xkfS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLnBhcnRpY2lwYW50cyAuYWNjb3VudC5ibHVlW2RhdGEtdi00NzMxOTNjNV17Y29sb3I6IzA3OTlmZn0uaGlzdG9yaWVzIC5ldmVudHMgLmV2ZW50IC5wYXJ0aWNpcGFudHMgLm5ldHdvcmtbZGF0YS12LTQ3MzE5M2M1XXtmb250LXNpemU6OXB4O2NvbG9yOiM3YTdhN2E7bWFyZ2luLXRvcDoxMHB4fS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLmFjdGlvbnNbZGF0YS12LTQ3MzE5M2M1XXtwYWRkaW5nLWxlZnQ6MjBweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5oaXN0b3JpZXMgLmV2ZW50cyAuZXZlbnQgLmFjdGlvbnMgYnV0dG9uW2RhdGEtdi00NzMxOTNjNV17bWFyZ2luLXJpZ2h0OjEwcHh9XFxuXCIsIFwiXCJdKTtcbiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGlzdG9yaWVzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ3MzE5M2M1JnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiNTBhZTZkZTFcIiwgY29udGVudCwgdHJ1ZSwge30pOyJdLCJzb3VyY2VSb290IjoiIn0=