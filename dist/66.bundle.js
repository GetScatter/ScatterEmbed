(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[66],{

/***/ "0X4a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9YZ2");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("732114ca", content, true, {});

/***/ }),

/***/ "9SdN":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("SQri");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("27a1bb63", content, true, {});

/***/ }),

/***/ "9YZ2":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".popout{position:relative;display:flex;flex-direction:column;overflow:hidden;height:calc(100vh - 40px)}.popout.login{height:100vh}.popout .popout-window{border:1px solid #dadada;border-top:0;height:calc(100vh - 40px)}.popout>section{display:flex;flex-direction:column;flex:1}.popout .multi-pane{display:flex;flex-direction:row;flex:1;height:calc(100vh - 90px)}.popout .multi-pane .main-panel{position:relative;display:flex;flex-direction:column;flex:1;width:calc(100% - 320px);border-right:1px solid #dfe0e1}.popout .multi-pane .side-panel{width:calc(100% - 420px);display:flex;flex-direction:column;overflow:auto;flex:0 0 auto;background:#f7fafb;position:relative;height:calc(100vh - 41px)}.popout .multi-pane .side-panel .messages-scroller{height:calc(100vh - 91px);overflow-y:scroll;padding:0 30px 80px}.popout .multi-pane .side-panel .whitelist-bar{position:absolute;bottom:0;left:0;right:0;height:50px;z-index:2;background:#fff;border-top:1px solid #dfe0e1;display:flex;justify-content:space-between;align-items:center;padding:10px 10px 10px 20px}.popout .multi-pane .side-panel .whitelist-bar .text{font-size:10px;font-weight:bold;padding-right:50px}.popout .multi-pane .side-panel .whitelist-bar .text.blue{color:#0799ff}.popout .multi-pane .side-panel .whitelist-bar .switch{flex:0 0 auto}.popout .multi-pane .side-bar{cursor:pointer;height:calc(100vh - 70px);width:20px;background:#0799ff;border-left:1px solid #0799ff;display:flex;justify-content:center;align-items:center;color:#fff;font-size:11px;padding-right:3px}.popout .participants{padding:0 30px;text-align:center;margin-top:30px}.popout .participants .more-participants{font-size:10px;margin-top:5px;text-decoration:underline;cursor:pointer}.popout .participants label{display:block;color:#0799ff}.popout .participants .participant{font-size:12px;border:1px solid #dfe0e1;background:#f3f6f7;display:inline-block;padding:6px 10px}.popout .participants .participant:not(:first-child){margin-top:3px}.popout .info-line{padding:0 30px;margin:25px 0 10px;text-align:center;position:relative;height:24px}.popout .info-line span{display:inline-block;padding:0 20px;height:24px;line-height:24px;background:#fafafa;font-size:16px;position:relative;z-index:1}.popout .info-line:after{content:'';display:block;height:1px;position:absolute;left:30px;right:30px;top:12px;background:rgba(0,0,0,0.1);z-index:0}.popout .fixed-actions{position:absolute;bottom:0;left:0;right:0;padding:30px}.popout .fixed-actions .accept-deny{display:flex;justify-content:space-between}\n", ""]);


/***/ }),

/***/ "AvAb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/PopOut.vue?vue&type=template&id=cb70e7f8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[(_vm.scatter && _vm.popOut)?_c('section',[((_vm.popupType !== _vm.apiActions.LOGIN && _vm.popupType !== _vm.apiActions.LOGIN_ALL))?_c('PopOutHead',{on:{"closed":_vm.returnResult}}):_vm._e(),_vm._v(" "),_c('section',{staticClass:"popout",class:{'login':_vm.popupType === _vm.apiActions.LOGIN || _vm.popupType === _vm.apiActions.LOGIN_ALL}},[(_vm.popupType === _vm.apiActions.LOGIN || _vm.popupType === _vm.apiActions.LOGIN_ALL)?_c('AppLogin',{attrs:{"popup":_vm.popup},on:{"returned":_vm.returnResult}}):_vm._e(),_vm._v(" "),(_vm.popupType === _vm.apiActions.SIGN || _vm.popupType === _vm.apiActions.SIGN_ARBITRARY)?_c('Signature',{attrs:{"popup":_vm.popup,"pinning":_vm.pinning},on:{"returned":_vm.returnResult}}):_vm._e(),_vm._v(" "),(_vm.popupType === _vm.apiActions.GET_PUBLIC_KEY)?_c('GetPublicKey',{attrs:{"popup":_vm.popup},on:{"returned":_vm.returnResult}}):_vm._e(),_vm._v(" "),(_vm.popupType === _vm.apiActions.TRANSFER)?_c('TransferRequest',{attrs:{"popup":_vm.popup,"pinning":_vm.pinning},on:{"returned":_vm.returnResult}}):_vm._e(),_vm._v(" "),(_vm.popupType === _vm.apiActions.UPDATE_IDENTITY)?_c('UpdateIdentity',{attrs:{"popup":_vm.popup},on:{"returned":_vm.returnResult}}):_vm._e(),_vm._v(" "),(_vm.popupType === 'linkApp')?_c('LinkApp',{attrs:{"popup":_vm.popup},on:{"returned":_vm.returnResult}}):_vm._e()],1)],1):_vm._e(),_vm._v(" "),_c('section',{staticClass:"dummy-bg",class:{'hide':_vm.popOut}},[_c('figure',[_vm._v("Scatter")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/PopOut.vue?vue&type=template&id=cb70e7f8&scoped=true&

// EXTERNAL MODULE: ./src/styles/popout.scss
var styles_popout = __webpack_require__("0X4a");

// EXTERNAL MODULE: ./src/components/popouts/PopOutHead.vue + 4 modules
var PopOutHead = __webpack_require__("cCRt");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/api/ApiActions.js
var ApiActions = __webpack_require__("+nw1");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./src/store/ui_actions.js
var ui_actions = __webpack_require__("q+A3");

// EXTERNAL MODULE: ./src/services/utility/PasswordHelpers.js
var PasswordHelpers = __webpack_require__("48Ae");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Scatter.js
var Scatter = __webpack_require__("Mb++");
var Scatter_default = /*#__PURE__*/__webpack_require__.n(Scatter);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/PopOut.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

	
	

	
	
	
	
	// import RIDLService from "../services/utility/RIDLService";
	
	
	

	/* harmony default export */ var PopOutvue_type_script_lang_js_ = ({
		data () {return {
			apiActions:ApiActions,
			pinning:false,
            isExtension:false,
			isNativeMobile:false,
		}},
		components:{
			PopOutHead: PopOutHead["a" /* default */],
			GetPublicKey:() => __webpack_require__.e(/* import() */ 56).then(__webpack_require__.bind(null, "2qTD")),
			TransferRequest:() => __webpack_require__.e(/* import() */ 58).then(__webpack_require__.bind(null, "5Pnu")),
			AppLogin:() => __webpack_require__.e(/* import() */ 55).then(__webpack_require__.bind(null, "leBm")),
			Signature:() => Promise.all(/* import() */[__webpack_require__.e(6), __webpack_require__.e(45), __webpack_require__.e(35), __webpack_require__.e(12), __webpack_require__.e(31), __webpack_require__.e(25), __webpack_require__.e(0), __webpack_require__.e(34), __webpack_require__.e(7), __webpack_require__.e(21), __webpack_require__.e(16), __webpack_require__.e(9), __webpack_require__.e(47), __webpack_require__.e(15), __webpack_require__.e(44), __webpack_require__.e(36), __webpack_require__.e(14), __webpack_require__.e(23), __webpack_require__.e(11), __webpack_require__.e(22), __webpack_require__.e(8), __webpack_require__.e(39), __webpack_require__.e(5), __webpack_require__.e(4), __webpack_require__.e(24), __webpack_require__.e(26), __webpack_require__.e(50), __webpack_require__.e(37), __webpack_require__.e(43), __webpack_require__.e(18), __webpack_require__.e(10), __webpack_require__.e(32), __webpack_require__.e(33), __webpack_require__.e(49), __webpack_require__.e(17), __webpack_require__.e(48), __webpack_require__.e(28), __webpack_require__.e(3), __webpack_require__.e(27), __webpack_require__.e(1), __webpack_require__.e(41), __webpack_require__.e(30), __webpack_require__.e(29), __webpack_require__.e(51), __webpack_require__.e(40), __webpack_require__.e(2), __webpack_require__.e(46), __webpack_require__.e(38), __webpack_require__.e(42), __webpack_require__.e(13), __webpack_require__.e(19), __webpack_require__.e(20), __webpack_require__.e(57)]).then(__webpack_require__.bind(null, "82eg")),
			LinkApp:() => __webpack_require__.e(/* import() */ 63).then(__webpack_require__.bind(null, "M/P+")),
			UpdateIdentity:() => __webpack_require__.e(/* import() */ 59).then(__webpack_require__.bind(null, "C6GT")),
		},
		async created(){
			this.isExtension = this.$route.query.extension;
			this.isNativeMobile = !!window.PopOutWebView;

			if(!!this.isExtension || !!this.isNativeMobile){

				const {popout, scatter} = this.isExtension
                    ? await window.wallet.utility.getPopOut(this.$route.query.extension)
                    : JSON.parse(await window.PopOutWebView.getPopOut());

				this[ui_actions["q" /* SET_POPOUT */]](popout);
				this[constants["HOLD_SCATTER"]](Scatter_default.a.fromJson(scatter));
				window.onbeforeunload = () => {
					this.returnResult();
					return undefined;
                }
            }

			this.setup();
		},
		computed:{
			...Object(vuex_esm["d" /* mapState */])([
				'scatter',
				'popOut',
			]),
			popup(){ return this.popOut ? Popup["a" /* Popup */].fromJson(this.popOut) : null },
			appData(){ return this.popOut ? this.popOut.data.props.appData : null; },
			payload(){ return this.popOut ? this.popOut.data.props.payload : null },
			popupType(){ return this.popOut ? this.popOut.data.type : null },
		},
		methods: {
			async returnResult(result = null){

				const formattedResult = {original:this.popOut, result};
				this.isNativeMobile
                    ? await window.PopOutWebView.popoutResponse(JSON.stringify(formattedResult))    // Only needed for native mobile wallets
				    : await window.wallet.utility.popoutResponse(formattedResult);                  // Only needed for native mobile wallets


				if(this.isExtension)        window.close();
                if(this.isNativeMobile)     window.PopOutWebView.close();
                else                        window.wallet.utility.closeWindow(window.wallet.windowId);

			},
			async checkAppReputation(){
				// this[UIActions.SET_APP_REP](await RIDLService.checkApp(this.appData.applink));
			},
			async setup(){
				if(!this.popOut) return;

				// Should never happen on mobile or extension,
                // no need for handling.
				if(!this.scatter) {
					// This window opens before-hand and hangs around in memory waiting to be
					// displayed. This means that the scatter reference on its store is from the past
					// We need to re-generate the Scatter data for it to be up-to-date.
					let scatter = await window.wallet.storage.getWalletData();
					if (!scatter) this.returnResult(null);
					scatter = Scatter_default.a.fromJson(scatter);
					this[constants["HOLD_SCATTER"]](scatter);
				}



				this.checkAppReputation();

				const needsPIN = [
					ApiActions["SIGN_ARBITRARY"],
					ApiActions["SIGN"],
					ApiActions["TRANSFER"]
				];

				setTimeout(async () => {
					if(this.scatter.pinForAll && needsPIN.includes(this.popup.data.type)){
						this.pinning = true;
						if(! await PasswordHelpers["a" /* default */].verifyPIN()){
							this.returnResult(null);
						}
						this.pinning = false;
					}
				})
			},
			...Object(vuex_esm["b" /* mapActions */])([
				constants["HOLD_SCATTER"],
				ui_actions["j" /* SET_APP_REP */],
				ui_actions["q" /* SET_POPOUT */],
			])
		},
		watch:{
			['popOut'](){
				this.setup();
			},
		}
	});

// CONCATENATED MODULE: ./src/views/PopOut.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_PopOutvue_type_script_lang_js_ = (PopOutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/PopOut.vue?vue&type=style&index=0&id=cb70e7f8&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var PopOutvue_type_style_index_0_id_cb70e7f8_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("IoCn");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/PopOut.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_PopOutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "cb70e7f8",
  null
  
)

/* harmony default export */ var PopOut = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "IoCn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOut_vue_vue_type_style_index_0_id_cb70e7f8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9SdN");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOut_vue_vue_type_style_index_0_id_cb70e7f8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOut_vue_vue_type_style_index_0_id_cb70e7f8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOut_vue_vue_type_style_index_0_id_cb70e7f8_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "SQri":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".dummy-bg figure[data-v-cb70e7f8]{position:fixed;top:0;left:0;right:0;z-index:-2;height:40px;width:100%;display:flex;align-items:center;padding:0 0 0 10px;border:1px solid #0778dd;border-bottom:0;background:#0799ff;font-family:'Grand Hotel', sans-serif;font-size:24px;color:#fff}.dummy-bg figure.hide[data-v-cb70e7f8]{display:none}\n", ""]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3BvcG91dC5zY3NzP2FjMWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcE91dC52dWU/NDFmNyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3BvcG91dC5zY3NzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9Qb3BPdXQudnVlP2E1NjgiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9Qb3BPdXQudnVlIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9Qb3BPdXQudnVlPzY4OTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcE91dC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcE91dC52dWU/MGU2OCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUG9wT3V0LnZ1ZT9mYTc4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBc0c7QUFDNUgsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUE2RDtBQUMvRSw4Q0FBOEMsRTs7Ozs7OztBQ1I5Qzs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFpVDtBQUN2VSw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7O0FDUjlDLDJCQUEyQixtQkFBTyxDQUFDLE1BQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTLFdBQVcsa0JBQWtCLGFBQWEsc0JBQXNCLGdCQUFnQiwwQkFBMEIsY0FBYyxhQUFhLHVCQUF1Qix5QkFBeUIsYUFBYSwwQkFBMEIsZ0JBQWdCLGFBQWEsc0JBQXNCLE9BQU8sb0JBQW9CLGFBQWEsbUJBQW1CLE9BQU8sMEJBQTBCLGdDQUFnQyxrQkFBa0IsYUFBYSxzQkFBc0IsT0FBTyx5QkFBeUIsK0JBQStCLGdDQUFnQyx5QkFBeUIsYUFBYSxzQkFBc0IsY0FBYyxjQUFj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SSxpQ0FBcUI7QUFDekIsSUFBSSxnQ0FBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUMvSnVILENBQWdCLHVHQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBNUM7QUFDdkM7QUFDTDtBQUM0RDs7O0FBR2pIO0FBQzBGO0FBQzFGLGdCQUFnQiw4Q0FBVTtBQUMxQixFQUFFLG9DQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLDZGOzs7Ozs7OztBQ25CZjtBQUFBO0FBQUE7QUFBK1csQ0FBZ0IsMmFBQUcsRUFBQyxDOzs7Ozs7O0FDQW5ZLDJCQUEyQixtQkFBTyxDQUFDLE1BQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTLHFDQUFxQyxlQUFlLE1BQU0sT0FBTyxRQUFRLFdBQVcsWUFBWSxXQUFXLGFBQWEsbUJBQW1CLG1CQUFtQix5QkFBeUIsZ0JBQWdCLG1CQUFtQixzQ0FBc0MsZUFBZSxXQUFXLHVDQUF1QyxhQUFhIiwiZmlsZSI6IjY2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wb3BvdXQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI3MzIxMTRjYVwiLCBjb250ZW50LCB0cnVlLCB7fSk7IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9Y2I3MGU3Zjgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiMjdhMWJiNjNcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnBvcG91dHtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6Y2FsYygxMDB2aCAtIDQwcHgpfS5wb3BvdXQubG9naW57aGVpZ2h0OjEwMHZofS5wb3BvdXQgLnBvcG91dC13aW5kb3d7Ym9yZGVyOjFweCBzb2xpZCAjZGFkYWRhO2JvcmRlci10b3A6MDtoZWlnaHQ6Y2FsYygxMDB2aCAtIDQwcHgpfS5wb3BvdXQ+c2VjdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXg6MX0ucG9wb3V0IC5tdWx0aS1wYW5le2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7ZmxleDoxO2hlaWdodDpjYWxjKDEwMHZoIC0gOTBweCl9LnBvcG91dCAubXVsdGktcGFuZSAubWFpbi1wYW5lbHtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXg6MTt3aWR0aDpjYWxjKDEwMCUgLSAzMjBweCk7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZGZlMGUxfS5wb3BvdXQgLm11bHRpLXBhbmUgLnNpZGUtcGFuZWx7d2lkdGg6Y2FsYygxMDAlIC0gNDIwcHgpO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47b3ZlcmZsb3c6YXV0bztmbGV4OjAgMCBhdXRvO2JhY2tncm91bmQ6I2Y3ZmFmYjtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6Y2FsYygxMDB2aCAtIDQxcHgpfS5wb3BvdXQgLm11bHRpLXBhbmUgLnNpZGUtcGFuZWwgLm1lc3NhZ2VzLXNjcm9sbGVye2hlaWdodDpjYWxjKDEwMHZoIC0gOTFweCk7b3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzowIDMwcHggODBweH0ucG9wb3V0IC5tdWx0aS1wYW5lIC5zaWRlLXBhbmVsIC53aGl0ZWxpc3QtYmFye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO2hlaWdodDo1MHB4O3otaW5kZXg6MjtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLXRvcDoxcHggc29saWQgI2RmZTBlMTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6MTBweCAxMHB4IDEwcHggMjBweH0ucG9wb3V0IC5tdWx0aS1wYW5lIC5zaWRlLXBhbmVsIC53aGl0ZWxpc3QtYmFyIC50ZXh0e2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7cGFkZGluZy1yaWdodDo1MHB4fS5wb3BvdXQgLm11bHRpLXBhbmUgLnNpZGUtcGFuZWwgLndoaXRlbGlzdC1iYXIgLnRleHQuYmx1ZXtjb2xvcjojMDc5OWZmfS5wb3BvdXQgLm11bHRpLXBhbmUgLnNpZGUtcGFuZWwgLndoaXRlbGlzdC1iYXIgLnN3aXRjaHtmbGV4OjAgMCBhdXRvfS5wb3BvdXQgLm11bHRpLXBhbmUgLnNpZGUtYmFye2N1cnNvcjpwb2ludGVyO2hlaWdodDpjYWxjKDEwMHZoIC0gNzBweCk7d2lkdGg6MjBweDtiYWNrZ3JvdW5kOiMwNzk5ZmY7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICMwNzk5ZmY7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2NvbG9yOiNmZmY7Zm9udC1zaXplOjExcHg7cGFkZGluZy1yaWdodDozcHh9LnBvcG91dCAucGFydGljaXBhbnRze3BhZGRpbmc6MCAzMHB4O3RleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MzBweH0ucG9wb3V0IC5wYXJ0aWNpcGFudHMgLm1vcmUtcGFydGljaXBhbnRze2ZvbnQtc2l6ZToxMHB4O21hcmdpbi10b3A6NXB4O3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7Y3Vyc29yOnBvaW50ZXJ9LnBvcG91dCAucGFydGljaXBhbnRzIGxhYmVse2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzA3OTlmZn0ucG9wb3V0IC5wYXJ0aWNpcGFudHMgLnBhcnRpY2lwYW50e2ZvbnQtc2l6ZToxMnB4O2JvcmRlcjoxcHggc29saWQgI2RmZTBlMTtiYWNrZ3JvdW5kOiNmM2Y2Zjc7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo2cHggMTBweH0ucG9wb3V0IC5wYXJ0aWNpcGFudHMgLnBhcnRpY2lwYW50Om5vdCg6Zmlyc3QtY2hpbGQpe21hcmdpbi10b3A6M3B4fS5wb3BvdXQgLmluZm8tbGluZXtwYWRkaW5nOjAgMzBweDttYXJnaW46MjVweCAwIDEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjI0cHh9LnBvcG91dCAuaW5mby1saW5lIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIDIwcHg7aGVpZ2h0OjI0cHg7bGluZS1oZWlnaHQ6MjRweDtiYWNrZ3JvdW5kOiNmYWZhZmE7Zm9udC1zaXplOjE2cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxfS5wb3BvdXQgLmluZm8tbGluZTphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjFweDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjMwcHg7cmlnaHQ6MzBweDt0b3A6MTJweDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC4xKTt6LWluZGV4OjB9LnBvcG91dCAuZml4ZWQtYWN0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtwYWRkaW5nOjMwcHh9LnBvcG91dCAuZml4ZWQtYWN0aW9ucyAuYWNjZXB0LWRlbnl7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicsWyhfdm0uc2NhdHRlciAmJiBfdm0ucG9wT3V0KT9fYygnc2VjdGlvbicsWygoX3ZtLnBvcHVwVHlwZSAhPT0gX3ZtLmFwaUFjdGlvbnMuTE9HSU4gJiYgX3ZtLnBvcHVwVHlwZSAhPT0gX3ZtLmFwaUFjdGlvbnMuTE9HSU5fQUxMKSk/X2MoJ1BvcE91dEhlYWQnLHtvbjp7XCJjbG9zZWRcIjpfdm0ucmV0dXJuUmVzdWx0fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBvcG91dFwiLGNsYXNzOnsnbG9naW4nOl92bS5wb3B1cFR5cGUgPT09IF92bS5hcGlBY3Rpb25zLkxPR0lOIHx8IF92bS5wb3B1cFR5cGUgPT09IF92bS5hcGlBY3Rpb25zLkxPR0lOX0FMTH19LFsoX3ZtLnBvcHVwVHlwZSA9PT0gX3ZtLmFwaUFjdGlvbnMuTE9HSU4gfHwgX3ZtLnBvcHVwVHlwZSA9PT0gX3ZtLmFwaUFjdGlvbnMuTE9HSU5fQUxMKT9fYygnQXBwTG9naW4nLHthdHRyczp7XCJwb3B1cFwiOl92bS5wb3B1cH0sb246e1wicmV0dXJuZWRcIjpfdm0ucmV0dXJuUmVzdWx0fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wb3B1cFR5cGUgPT09IF92bS5hcGlBY3Rpb25zLlNJR04gfHwgX3ZtLnBvcHVwVHlwZSA9PT0gX3ZtLmFwaUFjdGlvbnMuU0lHTl9BUkJJVFJBUlkpP19jKCdTaWduYXR1cmUnLHthdHRyczp7XCJwb3B1cFwiOl92bS5wb3B1cCxcInBpbm5pbmdcIjpfdm0ucGlubmluZ30sb246e1wicmV0dXJuZWRcIjpfdm0ucmV0dXJuUmVzdWx0fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wb3B1cFR5cGUgPT09IF92bS5hcGlBY3Rpb25zLkdFVF9QVUJMSUNfS0VZKT9fYygnR2V0UHVibGljS2V5Jyx7YXR0cnM6e1wicG9wdXBcIjpfdm0ucG9wdXB9LG9uOntcInJldHVybmVkXCI6X3ZtLnJldHVyblJlc3VsdH19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0ucG9wdXBUeXBlID09PSBfdm0uYXBpQWN0aW9ucy5UUkFOU0ZFUik/X2MoJ1RyYW5zZmVyUmVxdWVzdCcse2F0dHJzOntcInBvcHVwXCI6X3ZtLnBvcHVwLFwicGlubmluZ1wiOl92bS5waW5uaW5nfSxvbjp7XCJyZXR1cm5lZFwiOl92bS5yZXR1cm5SZXN1bHR9fSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnBvcHVwVHlwZSA9PT0gX3ZtLmFwaUFjdGlvbnMuVVBEQVRFX0lERU5USVRZKT9fYygnVXBkYXRlSWRlbnRpdHknLHthdHRyczp7XCJwb3B1cFwiOl92bS5wb3B1cH0sb246e1wicmV0dXJuZWRcIjpfdm0ucmV0dXJuUmVzdWx0fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5wb3B1cFR5cGUgPT09ICdsaW5rQXBwJyk/X2MoJ0xpbmtBcHAnLHthdHRyczp7XCJwb3B1cFwiOl92bS5wb3B1cH0sb246e1wicmV0dXJuZWRcIjpfdm0ucmV0dXJuUmVzdWx0fX0pOl92bS5fZSgpXSwxKV0sMSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZHVtbXktYmdcIixjbGFzczp7J2hpZGUnOl92bS5wb3BPdXR9fSxbX2MoJ2ZpZ3VyZScsW192bS5fdihcIlNjYXR0ZXJcIildKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICAgIDxzZWN0aW9uIHYtaWY9XCJzY2F0dGVyICYmIHBvcE91dFwiPlxyXG4gICAgICAgICAgICA8UG9wT3V0SGVhZCB2LW9uOmNsb3NlZD1cInJldHVyblJlc3VsdFwiIHYtaWY9XCIocG9wdXBUeXBlICE9PSBhcGlBY3Rpb25zLkxPR0lOICYmIHBvcHVwVHlwZSAhPT0gYXBpQWN0aW9ucy5MT0dJTl9BTEwpXCIgLz5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicG9wb3V0XCIgOmNsYXNzPVwieydsb2dpbic6cG9wdXBUeXBlID09PSBhcGlBY3Rpb25zLkxPR0lOIHx8IHBvcHVwVHlwZSA9PT0gYXBpQWN0aW9ucy5MT0dJTl9BTEx9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPEFwcExvZ2luIHYtaWY9XCJwb3B1cFR5cGUgPT09IGFwaUFjdGlvbnMuTE9HSU4gfHwgcG9wdXBUeXBlID09PSBhcGlBY3Rpb25zLkxPR0lOX0FMTFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvcHVwPVwicG9wdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246cmV0dXJuZWQ9XCJyZXR1cm5SZXN1bHRcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDxTaWduYXR1cmUgdi1pZj1cInBvcHVwVHlwZSA9PT0gYXBpQWN0aW9ucy5TSUdOIHx8IHBvcHVwVHlwZSA9PT0gYXBpQWN0aW9ucy5TSUdOX0FSQklUUkFSWVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3B1cD1cInBvcHVwXCIgOnBpbm5pbmc9XCJwaW5uaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpyZXR1cm5lZD1cInJldHVyblJlc3VsdFwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPEdldFB1YmxpY0tleSB2LWlmPVwicG9wdXBUeXBlID09PSBhcGlBY3Rpb25zLkdFVF9QVUJMSUNfS0VZXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvcHVwPVwicG9wdXBcIiB2LW9uOnJldHVybmVkPVwicmV0dXJuUmVzdWx0XCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8VHJhbnNmZXJSZXF1ZXN0IHYtaWY9XCJwb3B1cFR5cGUgPT09IGFwaUFjdGlvbnMuVFJBTlNGRVJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9wdXA9XCJwb3B1cFwiIDpwaW5uaW5nPVwicGlubmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246cmV0dXJuZWQ9XCJyZXR1cm5SZXN1bHRcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDxVcGRhdGVJZGVudGl0eSB2LWlmPVwicG9wdXBUeXBlID09PSBhcGlBY3Rpb25zLlVQREFURV9JREVOVElUWVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvcHVwPVwicG9wdXBcIiB2LW9uOnJldHVybmVkPVwicmV0dXJuUmVzdWx0XCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8TGlua0FwcCA6cG9wdXA9XCJwb3B1cFwiIHYtaWY9XCJwb3B1cFR5cGUgPT09ICdsaW5rQXBwJ1wiIHYtb246cmV0dXJuZWQ9XCJyZXR1cm5SZXN1bHRcIiAvPlxyXG5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZHVtbXktYmdcIiA6Y2xhc3M9XCJ7J2hpZGUnOnBvcE91dH1cIj5cclxuICAgICAgICAgICAgPGZpZ3VyZT5TY2F0dGVyPC9maWd1cmU+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgJy4uL3N0eWxlcy9wb3BvdXQuc2Nzcyc7XHJcblx0aW1wb3J0IFBvcE91dEhlYWQgZnJvbSAnLi4vY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEhlYWQnO1xyXG5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblx0aW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICdAd2FsbGV0cGFjay9jb3JlL3N0b3JlL2NvbnN0YW50cyc7XHJcblx0aW1wb3J0ICogYXMgQXBpQWN0aW9ucyBmcm9tICdAd2FsbGV0cGFjay9jb3JlL21vZGVscy9hcGkvQXBpQWN0aW9ucyc7XHJcblx0aW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4uL21vZGVscy9wb3B1cHMvUG9wdXBcIjtcclxuXHQvLyBpbXBvcnQgUklETFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3V0aWxpdHkvUklETFNlcnZpY2VcIjtcclxuXHRpbXBvcnQgKiBhcyBVSUFjdGlvbnMgZnJvbSBcIi4uL3N0b3JlL3VpX2FjdGlvbnNcIjtcclxuXHRpbXBvcnQgUGFzc3dvcmRIZWxwZXJzIGZyb20gXCIuLi9zZXJ2aWNlcy91dGlsaXR5L1Bhc3N3b3JkSGVscGVyc1wiO1xyXG5cdGltcG9ydCBTY2F0dGVyIGZyb20gJ0B3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1NjYXR0ZXInXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblx0XHRcdGFwaUFjdGlvbnM6QXBpQWN0aW9ucyxcclxuXHRcdFx0cGlubmluZzpmYWxzZSxcclxuICAgICAgICAgICAgaXNFeHRlbnNpb246ZmFsc2UsXHJcblx0XHRcdGlzTmF0aXZlTW9iaWxlOmZhbHNlLFxyXG5cdFx0fX0sXHJcblx0XHRjb21wb25lbnRzOntcclxuXHRcdFx0UG9wT3V0SGVhZCxcclxuXHRcdFx0R2V0UHVibGljS2V5OigpID0+IGltcG9ydCgnLi9wb3BvdXRzL0dldFB1YmxpY0tleScpLFxyXG5cdFx0XHRUcmFuc2ZlclJlcXVlc3Q6KCkgPT4gaW1wb3J0KCcuL3BvcG91dHMvVHJhbnNmZXJSZXF1ZXN0JyksXHJcblx0XHRcdEFwcExvZ2luOigpID0+IGltcG9ydCgnLi9wb3BvdXRzL0FwcExvZ2luJyksXHJcblx0XHRcdFNpZ25hdHVyZTooKSA9PiBpbXBvcnQoJy4vcG9wb3V0cy9TaWduYXR1cmUnKSxcclxuXHRcdFx0TGlua0FwcDooKSA9PiBpbXBvcnQoJy4vcG9wb3V0cy9MaW5rQXBwJyksXHJcblx0XHRcdFVwZGF0ZUlkZW50aXR5OigpID0+IGltcG9ydCgnLi9wb3BvdXRzL1VwZGF0ZUlkZW50aXR5JyksXHJcblx0XHR9LFxyXG5cdFx0YXN5bmMgY3JlYXRlZCgpe1xyXG5cdFx0XHR0aGlzLmlzRXh0ZW5zaW9uID0gdGhpcy4kcm91dGUucXVlcnkuZXh0ZW5zaW9uO1xyXG5cdFx0XHR0aGlzLmlzTmF0aXZlTW9iaWxlID0gISF3aW5kb3cuUG9wT3V0V2ViVmlldztcclxuXHJcblx0XHRcdGlmKCEhdGhpcy5pc0V4dGVuc2lvbiB8fCAhIXRoaXMuaXNOYXRpdmVNb2JpbGUpe1xyXG5cclxuXHRcdFx0XHRjb25zdCB7cG9wb3V0LCBzY2F0dGVyfSA9IHRoaXMuaXNFeHRlbnNpb25cclxuICAgICAgICAgICAgICAgICAgICA/IGF3YWl0IHdpbmRvdy53YWxsZXQudXRpbGl0eS5nZXRQb3BPdXQodGhpcy4kcm91dGUucXVlcnkuZXh0ZW5zaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIDogSlNPTi5wYXJzZShhd2FpdCB3aW5kb3cuUG9wT3V0V2ViVmlldy5nZXRQb3BPdXQoKSk7XHJcblxyXG5cdFx0XHRcdHRoaXNbVUlBY3Rpb25zLlNFVF9QT1BPVVRdKHBvcG91dCk7XHJcblx0XHRcdFx0dGhpc1tBY3Rpb25zLkhPTERfU0NBVFRFUl0oU2NhdHRlci5mcm9tSnNvbihzY2F0dGVyKSk7XHJcblx0XHRcdFx0d2luZG93Lm9uYmVmb3JldW5sb2FkID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5yZXR1cm5SZXN1bHQoKTtcclxuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdHRoaXMuc2V0dXAoKTtcclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDp7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnc2NhdHRlcicsXHJcblx0XHRcdFx0J3BvcE91dCcsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHRwb3B1cCgpeyByZXR1cm4gdGhpcy5wb3BPdXQgPyBQb3B1cC5mcm9tSnNvbih0aGlzLnBvcE91dCkgOiBudWxsIH0sXHJcblx0XHRcdGFwcERhdGEoKXsgcmV0dXJuIHRoaXMucG9wT3V0ID8gdGhpcy5wb3BPdXQuZGF0YS5wcm9wcy5hcHBEYXRhIDogbnVsbDsgfSxcclxuXHRcdFx0cGF5bG9hZCgpeyByZXR1cm4gdGhpcy5wb3BPdXQgPyB0aGlzLnBvcE91dC5kYXRhLnByb3BzLnBheWxvYWQgOiBudWxsIH0sXHJcblx0XHRcdHBvcHVwVHlwZSgpeyByZXR1cm4gdGhpcy5wb3BPdXQgPyB0aGlzLnBvcE91dC5kYXRhLnR5cGUgOiBudWxsIH0sXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRhc3luYyByZXR1cm5SZXN1bHQocmVzdWx0ID0gbnVsbCl7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGZvcm1hdHRlZFJlc3VsdCA9IHtvcmlnaW5hbDp0aGlzLnBvcE91dCwgcmVzdWx0fTtcclxuXHRcdFx0XHR0aGlzLmlzTmF0aXZlTW9iaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCB3aW5kb3cuUG9wT3V0V2ViVmlldy5wb3BvdXRSZXNwb25zZShKU09OLnN0cmluZ2lmeShmb3JtYXR0ZWRSZXN1bHQpKSAgICAvLyBPbmx5IG5lZWRlZCBmb3IgbmF0aXZlIG1vYmlsZSB3YWxsZXRzXHJcblx0XHRcdFx0ICAgIDogYXdhaXQgd2luZG93LndhbGxldC51dGlsaXR5LnBvcG91dFJlc3BvbnNlKGZvcm1hdHRlZFJlc3VsdCk7ICAgICAgICAgICAgICAgICAgLy8gT25seSBuZWVkZWQgZm9yIG5hdGl2ZSBtb2JpbGUgd2FsbGV0c1xyXG5cclxuXHJcblx0XHRcdFx0aWYodGhpcy5pc0V4dGVuc2lvbikgICAgICAgIHdpbmRvdy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc05hdGl2ZU1vYmlsZSkgICAgIHdpbmRvdy5Qb3BPdXRXZWJWaWV3LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndhbGxldC51dGlsaXR5LmNsb3NlV2luZG93KHdpbmRvdy53YWxsZXQud2luZG93SWQpO1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0YXN5bmMgY2hlY2tBcHBSZXB1dGF0aW9uKCl7XHJcblx0XHRcdFx0Ly8gdGhpc1tVSUFjdGlvbnMuU0VUX0FQUF9SRVBdKGF3YWl0IFJJRExTZXJ2aWNlLmNoZWNrQXBwKHRoaXMuYXBwRGF0YS5hcHBsaW5rKSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIHNldHVwKCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucG9wT3V0KSByZXR1cm47XHJcblxyXG5cdFx0XHRcdC8vIFNob3VsZCBuZXZlciBoYXBwZW4gb24gbW9iaWxlIG9yIGV4dGVuc2lvbixcclxuICAgICAgICAgICAgICAgIC8vIG5vIG5lZWQgZm9yIGhhbmRsaW5nLlxyXG5cdFx0XHRcdGlmKCF0aGlzLnNjYXR0ZXIpIHtcclxuXHRcdFx0XHRcdC8vIFRoaXMgd2luZG93IG9wZW5zIGJlZm9yZS1oYW5kIGFuZCBoYW5ncyBhcm91bmQgaW4gbWVtb3J5IHdhaXRpbmcgdG8gYmVcclxuXHRcdFx0XHRcdC8vIGRpc3BsYXllZC4gVGhpcyBtZWFucyB0aGF0IHRoZSBzY2F0dGVyIHJlZmVyZW5jZSBvbiBpdHMgc3RvcmUgaXMgZnJvbSB0aGUgcGFzdFxyXG5cdFx0XHRcdFx0Ly8gV2UgbmVlZCB0byByZS1nZW5lcmF0ZSB0aGUgU2NhdHRlciBkYXRhIGZvciBpdCB0byBiZSB1cC10by1kYXRlLlxyXG5cdFx0XHRcdFx0bGV0IHNjYXR0ZXIgPSBhd2FpdCB3aW5kb3cud2FsbGV0LnN0b3JhZ2UuZ2V0V2FsbGV0RGF0YSgpO1xyXG5cdFx0XHRcdFx0aWYgKCFzY2F0dGVyKSB0aGlzLnJldHVyblJlc3VsdChudWxsKTtcclxuXHRcdFx0XHRcdHNjYXR0ZXIgPSBTY2F0dGVyLmZyb21Kc29uKHNjYXR0ZXIpO1xyXG5cdFx0XHRcdFx0dGhpc1tBY3Rpb25zLkhPTERfU0NBVFRFUl0oc2NhdHRlcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0XHRcdHRoaXMuY2hlY2tBcHBSZXB1dGF0aW9uKCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IG5lZWRzUElOID0gW1xyXG5cdFx0XHRcdFx0QXBpQWN0aW9ucy5TSUdOX0FSQklUUkFSWSxcclxuXHRcdFx0XHRcdEFwaUFjdGlvbnMuU0lHTixcclxuXHRcdFx0XHRcdEFwaUFjdGlvbnMuVFJBTlNGRVJcclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdGlmKHRoaXMuc2NhdHRlci5waW5Gb3JBbGwgJiYgbmVlZHNQSU4uaW5jbHVkZXModGhpcy5wb3B1cC5kYXRhLnR5cGUpKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5waW5uaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0aWYoISBhd2FpdCBQYXNzd29yZEhlbHBlcnMudmVyaWZ5UElOKCkpe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmV0dXJuUmVzdWx0KG51bGwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRoaXMucGlubmluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdC4uLm1hcEFjdGlvbnMoW1xyXG5cdFx0XHRcdEFjdGlvbnMuSE9MRF9TQ0FUVEVSLFxyXG5cdFx0XHRcdFVJQWN0aW9ucy5TRVRfQVBQX1JFUCxcclxuXHRcdFx0XHRVSUFjdGlvbnMuU0VUX1BPUE9VVCxcclxuXHRcdFx0XSlcclxuXHRcdH0sXHJcblx0XHR3YXRjaDp7XHJcblx0XHRcdFsncG9wT3V0J10oKXtcclxuXHRcdFx0XHR0aGlzLnNldHVwKCk7XHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuICAgIEBpbXBvcnQgXCIuLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG4gICAgLmR1bW15LWJnIHtcclxuICAgICAgICBmaWd1cmUge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjpmaXhlZDtcclxuICAgICAgICAgICAgdG9wOjA7XHJcbiAgICAgICAgICAgIGxlZnQ6MDtcclxuICAgICAgICAgICAgcmlnaHQ6MDtcclxuICAgICAgICAgICAgei1pbmRleDotMjtcclxuICAgICAgICAgICAgaGVpZ2h0OjQwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgcGFkZGluZzowIDAgMCAxMHB4O1xyXG4gICAgICAgICAgICBib3JkZXI6MXB4IHNvbGlkICRkYXJrZXJibHVlO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOjA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6JGJsdWU7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnR3JhbmQgSG90ZWwnLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XHJcblxyXG4gICAgICAgICAgICAmLmhpZGUge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTpub25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbjwvc3R5bGU+XHJcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUG9wT3V0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUG9wT3V0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jYjcwZTdmOCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qb3BPdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BPdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1BvcE91dC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jYjcwZTdmOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJjYjcwZTdmOFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jYjcwZTdmOCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9Y2I3MGU3Zjgmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmR1bW15LWJnIGZpZ3VyZVtkYXRhLXYtY2I3MGU3Zjhde3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6LTI7aGVpZ2h0OjQwcHg7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6MCAwIDAgMTBweDtib3JkZXI6MXB4IHNvbGlkICMwNzc4ZGQ7Ym9yZGVyLWJvdHRvbTowO2JhY2tncm91bmQ6IzA3OTlmZjtmb250LWZhbWlseTonR3JhbmQgSG90ZWwnLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyNHB4O2NvbG9yOiNmZmZ9LmR1bW15LWJnIGZpZ3VyZS5oaWRlW2RhdGEtdi1jYjcwZTdmOF17ZGlzcGxheTpub25lfVxcblwiLCBcIlwiXSk7XG4iXSwic291cmNlUm9vdCI6IiJ9