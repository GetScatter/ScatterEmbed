(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[77],{

/***/ "4ZpK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Receive.vue?vue&type=template&id=df4b0a9e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"receive"},[_c('section',{staticClass:"scroller"},[(_vm.account)?_c('section',{staticClass:"greyback"},[_c('section',{staticClass:"limit-width"},[_c('label',[_vm._v("Receiving Account")]),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box account-selector",on:{"click":_vm.selectAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.account.network().name))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])])])]):_vm._e(),_vm._v(" "),(_vm.account)?_c('section',{staticClass:"whiteback"},[_c('section',{staticClass:"limit-width"},[_c('section',{staticClass:"boxes"},[(_vm.qr)?_c('section',{staticClass:"box nested auto-width"},[_c('img',{attrs:{"src":_vm.qr}})]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"box nested data-box"},[_c('section',[_c('label',[_vm._v("Send funds to")]),_vm._v(" "),_c('figure',{staticClass:"receiver"},[_vm._v(_vm._s(_vm.account.sendable()))])]),_vm._v(" "),_c('section',[(_vm.account.blockchain() === _vm.Blockchains.EOSIO)?_c('figure',{staticClass:"small-info"},[_vm._v("\n\t\t\t\t\t\t\t\tSome exchanges will ask you for an addressTag, memo, or some other form of secondary input.\n\t\t\t\t\t\t\t\tYou can enter anything in that field since this is a real EOSIO account.\n\t\t\t\t\t\t\t")]):_vm._e(),_vm._v(" "),_c('Button',{attrs:{"blue":"1","text":"Copy to clipboard"},nativeOn:{"click":function($event){return _vm.copy($event)}}})],1)])])])]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Receive.vue?vue&type=template&id=df4b0a9e&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/QRService.js
var QRService = __webpack_require__("sZoq");
var QRService_default = /*#__PURE__*/__webpack_require__.n(QRService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Receive.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ var Receivevue_type_script_lang_js_ = ({
	data(){return {
		account:null,
		qr:null,
		Blockchains: Blockchains["Blockchains"],
	}},
	computed:{
		...Object(vuex_esm["c" /* mapGetters */])([
			'accounts',
		])
	},
	mounted(){
		if(this.$route.query.account){
			this.selectedAccount(this.accounts.find(x => x.identifiable() === this.$route.query.account));
		}

		if(!this.account){
			this.selectedAccount(this.accounts.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0]);
		}
	},
	methods:{
		selectAccount(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].selectAccount(account => {
				if(!account) return;
				this.selectedAccount(account);
			}))
		},
		async selectedAccount(account){
			this.account = account;
			const qrData = {
				account:account.sendable(),
				blockchain:account.network().blockchain,
				chainId:account.network().chainId,
			}
			this.qr = await QRService_default.a.createUnEncryptedQR(qrData);
		},
		copy(){
			this.copyText(this.account.sendable());
		}
	}
});

// CONCATENATED MODULE: ./src/views/Receive.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Receivevue_type_script_lang_js_ = (Receivevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Receive.vue?vue&type=style&index=0&id=df4b0a9e&scoped=true&lang=scss&
var Receivevue_type_style_index_0_id_df4b0a9e_scoped_true_lang_scss_ = __webpack_require__("QSKd");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Receive.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Receivevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "df4b0a9e",
  null
  
)

/* harmony default export */ var Receive = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "BtFj":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("gVLh");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("a372487a", content, true, {});

/***/ }),

/***/ "QSKd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Receive_vue_vue_type_style_index_0_id_df4b0a9e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("BtFj");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Receive_vue_vue_type_style_index_0_id_df4b0a9e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Receive_vue_vue_type_style_index_0_id_df4b0a9e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Receive_vue_vue_type_style_index_0_id_df4b0a9e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "gVLh":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, "", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUmVjZWl2ZS52dWU/M2JhYyIsIndlYnBhY2s6Ly8vc3JjL3ZpZXdzL1JlY2VpdmUudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9SZWNlaXZlLnZ1ZT8zMzA3Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9SZWNlaXZlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUmVjZWl2ZS52dWU/OTgyNSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUmVjZWl2ZS52dWU/NjdjNCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUmVjZWl2ZS52dWU/ZmE5MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLHFCQUFxQixzQkFBc0IsZ0JBQWdCLHVCQUF1Qiw4QkFBOEIsdUJBQXVCLGdCQUFnQiwwQkFBMEIsc0VBQXNFLG9CQUFvQixnQkFBZ0IsdUNBQXVDLDJCQUEyQiw2QkFBNkIsbUJBQW1CLG9FQUFvRSxzQkFBc0IsMEVBQTBFLCtDQUErQywyREFBMkQsd0JBQXdCLGdCQUFnQiwwQkFBMEIsZ0JBQWdCLG9CQUFvQix5QkFBeUIsb0NBQW9DLFlBQVksT0FBTyxjQUFjLHVDQUF1QyxrQ0FBa0MsK0VBQStFLHVCQUF1Qix5SUFBeUkseUJBQXlCLHdRQUF3USxPQUFPLHNDQUFzQyxXQUFXLHlCQUF5QiwwQkFBMEI7QUFDNW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2dEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEcwSCxDQUFnQix5R0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQTVDO0FBQ3ZDO0FBQ0w7QUFDc0M7OztBQUc1RjtBQUMwRjtBQUMxRixnQkFBZ0IsOENBQVU7QUFDMUIsRUFBRSxxQ0FBTTtBQUNSLEVBQUUsTUFBTTtBQUNSLEVBQUUsZUFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSw4Rjs7Ozs7OztBQ25CZjs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUE0UjtBQUNsVCw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7OztBQ1I5QztBQUFBO0FBQUE7QUFBMFYsQ0FBZ0Isc1pBQUcsRUFBQyxDOzs7Ozs7O0FDQTlXLDJCQUEyQixtQkFBTyxDQUFDLE1BQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTIiwiZmlsZSI6Ijc3LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJyZWNlaXZlXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2Nyb2xsZXJcIn0sWyhfdm0uYWNjb3VudCk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImdyZXliYWNrXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibGltaXQtd2lkdGhcIn0sW19jKCdsYWJlbCcsW192bS5fdihcIlJlY2VpdmluZyBBY2NvdW50XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3ggYWNjb3VudC1zZWxlY3RvclwiLG9uOntcImNsaWNrXCI6X3ZtLnNlbGVjdEFjY291bnR9fSxbX2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50LnNlbmRhYmxlKCkpKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmV0d29ya1wifSxbX3ZtLl92KF92bS5fcyhfdm0uYWNjb3VudC5uZXR3b3JrKCkubmFtZSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pXSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5hY2NvdW50KT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwid2hpdGViYWNrXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibGltaXQtd2lkdGhcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hlc1wifSxbKF92bS5xcik/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveCBuZXN0ZWQgYXV0by13aWR0aFwifSxbX2MoJ2ltZycse2F0dHJzOntcInNyY1wiOl92bS5xcn19KV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveCBuZXN0ZWQgZGF0YS1ib3hcIn0sW19jKCdzZWN0aW9uJyxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiU2VuZCBmdW5kcyB0b1wiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVjZWl2ZXJcIn0sW192bS5fdihfdm0uX3MoX3ZtLmFjY291bnQuc2VuZGFibGUoKSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbKF92bS5hY2NvdW50LmJsb2NrY2hhaW4oKSA9PT0gX3ZtLkJsb2NrY2hhaW5zLkVPU0lPKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJzbWFsbC1pbmZvXCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRTb21lIGV4Y2hhbmdlcyB3aWxsIGFzayB5b3UgZm9yIGFuIGFkZHJlc3NUYWcsIG1lbW8sIG9yIHNvbWUgb3RoZXIgZm9ybSBvZiBzZWNvbmRhcnkgaW5wdXQuXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0WW91IGNhbiBlbnRlciBhbnl0aGluZyBpbiB0aGF0IGZpZWxkIHNpbmNlIHRoaXMgaXMgYSByZWFsIEVPU0lPIGFjY291bnQuXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1wiYmx1ZVwiOlwiMVwiLFwidGV4dFwiOlwiQ29weSB0byBjbGlwYm9hcmRcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uY29weSgkZXZlbnQpfX19KV0sMSldKV0pXSldKTpfdm0uX2UoKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cInJlY2VpdmVcIj5cclxuXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInNjcm9sbGVyXCI+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZ3JleWJhY2tcIiB2LWlmPVwiYWNjb3VudFwiPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwibGltaXQtd2lkdGhcIj5cclxuXHRcdFx0XHRcdDxsYWJlbD5SZWNlaXZpbmcgQWNjb3VudDwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJveGVzXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94IGFjY291bnQtc2VsZWN0b3JcIiBAY2xpY2s9XCJzZWxlY3RBY2NvdW50XCI+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPnt7YWNjb3VudC5zZW5kYWJsZSgpfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuZXR3b3JrXCI+e3thY2NvdW50Lm5ldHdvcmsoKS5uYW1lfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCI+PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwid2hpdGViYWNrXCIgdi1pZj1cImFjY291bnRcIj5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImxpbWl0LXdpZHRoXCI+XHJcblx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJveGVzXCI+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZCBhdXRvLXdpZHRoXCIgdi1pZj1cInFyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGltZyA6c3JjPVwicXJcIiAvPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZCBkYXRhLWJveFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPlNlbmQgZnVuZHMgdG88L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlY2VpdmVyXCI+e3thY2NvdW50LnNlbmRhYmxlKCl9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwic21hbGwtaW5mb1wiIHYtaWY9XCJhY2NvdW50LmJsb2NrY2hhaW4oKSA9PT0gQmxvY2tjaGFpbnMuRU9TSU9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0U29tZSBleGNoYW5nZXMgd2lsbCBhc2sgeW91IGZvciBhbiBhZGRyZXNzVGFnLCBtZW1vLCBvciBzb21lIG90aGVyIGZvcm0gb2Ygc2Vjb25kYXJ5IGlucHV0LlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRZb3UgY2FuIGVudGVyIGFueXRoaW5nIGluIHRoYXQgZmllbGQgc2luY2UgdGhpcyBpcyBhIHJlYWwgRU9TSU8gYWNjb3VudC5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZmlndXJlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdDxCdXR0b24gYmx1ZT1cIjFcIiB0ZXh0PVwiQ29weSB0byBjbGlwYm9hcmRcIiBAY2xpY2submF0aXZlPVwiY29weVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQgUG9wdXBTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1BvcHVwU2VydmljZVwiO1xyXG5cdGltcG9ydCB7UG9wdXB9IGZyb20gXCIuLi9tb2RlbHMvcG9wdXBzL1BvcHVwXCI7XHJcblx0aW1wb3J0IFFSU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvUVJTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtCbG9ja2NoYWluc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCI7XHJcblx0cmVxdWlyZSgnLi4vc3R5bGVzL3RyYW5zZmVycy5zY3NzJyk7XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGRhdGEoKXtyZXR1cm4ge1xyXG5cdFx0XHRhY2NvdW50Om51bGwsXHJcblx0XHRcdHFyOm51bGwsXHJcblx0XHRcdEJsb2NrY2hhaW5zLFxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdhY2NvdW50cycsXHJcblx0XHRcdF0pXHJcblx0XHR9LFxyXG5cdFx0bW91bnRlZCgpe1xyXG5cdFx0XHRpZih0aGlzLiRyb3V0ZS5xdWVyeS5hY2NvdW50KXtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQWNjb3VudCh0aGlzLmFjY291bnRzLmZpbmQoeCA9PiB4LmlkZW50aWZpYWJsZSgpID09PSB0aGlzLiRyb3V0ZS5xdWVyeS5hY2NvdW50KSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCF0aGlzLmFjY291bnQpe1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRBY2NvdW50KHRoaXMuYWNjb3VudHMuc29ydCgoYSxiKSA9PiBiLnRvdGFsRmlhdEJhbGFuY2UoKSAtIGEudG90YWxGaWF0QmFsYW5jZSgpKVswXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHRcdFx0c2VsZWN0QWNjb3VudCgpe1xyXG5cdFx0XHRcdFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLnNlbGVjdEFjY291bnQoYWNjb3VudCA9PiB7XHJcblx0XHRcdFx0XHRpZighYWNjb3VudCkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEFjY291bnQoYWNjb3VudCk7XHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIHNlbGVjdGVkQWNjb3VudChhY2NvdW50KXtcclxuXHRcdFx0XHR0aGlzLmFjY291bnQgPSBhY2NvdW50O1xyXG5cdFx0XHRcdGNvbnN0IHFyRGF0YSA9IHtcclxuXHRcdFx0XHRcdGFjY291bnQ6YWNjb3VudC5zZW5kYWJsZSgpLFxyXG5cdFx0XHRcdFx0YmxvY2tjaGFpbjphY2NvdW50Lm5ldHdvcmsoKS5ibG9ja2NoYWluLFxyXG5cdFx0XHRcdFx0Y2hhaW5JZDphY2NvdW50Lm5ldHdvcmsoKS5jaGFpbklkLFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnFyID0gYXdhaXQgUVJTZXJ2aWNlLmNyZWF0ZVVuRW5jcnlwdGVkUVIocXJEYXRhKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29weSgpe1xyXG5cdFx0XHRcdHRoaXMuY29weVRleHQodGhpcy5hY2NvdW50LnNlbmRhYmxlKCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlY2VpdmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVjZWl2ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1JlY2VpdmUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRmNGIwYTllJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1JlY2VpdmUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZWNlaXZlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9SZWNlaXZlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRmNGIwYTllJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiZGY0YjBhOWVcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlY2VpdmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZGY0YjBhOWUmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJhMzcyNDg3YVwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVjZWl2ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1kZjRiMGE5ZSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlY2VpdmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZGY0YjBhOWUmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==