(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[75],{

/***/ "AiW6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Networks_vue_vue_type_style_index_0_id_41b59d10_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YXaT");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Networks_vue_vue_type_style_index_0_id_41b59d10_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Networks_vue_vue_type_style_index_0_id_41b59d10_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Networks_vue_vue_type_style_index_0_id_41b59d10_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "YXaT":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("oMCZ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("f2f4c13e", content, true, {});

/***/ }),

/***/ "oMCZ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, "", ""]);


/***/ }),

/***/ "rU3z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Networks.vue?vue&type=template&id=41b59d10&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"blockchain-list-container"},[(!_vm.isMobile || !_vm.selectedBlockchain)?_c('section',{staticClass:"blockchains",class:{'full-width':_vm.isMobile}},[_c('section',{staticClass:"head"},[_vm._v("\n\t\t\tSelect a Blockchain\n\t\t")]),_vm._v(" "),_c('section',{staticClass:"scroller"},[_c('section',{staticClass:"blockchain-list"},_vm._l((_vm.blockchains),function(blockchain){return _c('section',{staticClass:"badge-item hoverable",class:{'active':_vm.selectedBlockchain === blockchain},on:{"click":function($event){return _vm.selectBlockchain(blockchain)}}},[_c('figure',{staticClass:"badge iconed",class:("token-" + blockchain + "-" + blockchain)}),_vm._v(" "),_c('section',{staticClass:"details"},[_c('figure',{staticClass:"title"},[_vm._v(_vm._s(_vm.blockchainName(blockchain)))]),_vm._v(" "),_c('figure',{staticClass:"row"},[_c('figure',{staticClass:"secondary"},[_vm._v(_vm._s(_vm.networksFor(blockchain).length)+" network"+_vm._s(_vm.networksFor(blockchain).length === 1 ? '' : 's'))])])]),_vm._v(" "),_c('i',{staticClass:"fal fa-chevron-right"})])}),0)])]):_vm._e(),_vm._v(" "),(!_vm.isMobile || _vm.selectedBlockchain)?_c('section',{staticClass:"list-container"},[_c('section',{staticClass:"head"},[(_vm.isMobile)?_c('figure',{staticClass:"back-button",on:{"click":function($event){return _vm.selectBlockchain(null)}}},[_c('i',{staticClass:"fal fa-arrow-left"})]):_vm._e(),_vm._v("\n\t\t\tNetworks\n\t\t")]),_vm._v(" "),_c('section',{staticClass:"scroller with-tail"},[_c('section',{staticClass:"item-list"},_vm._l((_vm.visibleNetworks),function(network){return _c('section',{staticClass:"item"},[_c('section',{staticClass:"basics",class:{'open':_vm.expanded && _vm.expanded.unique() === network.unique()}},[_c('figure',{staticClass:"chevron",on:{"click":function($event){return _vm.toggleExpansion(network)}}},[_c('i',{staticClass:"fas fa-caret-circle-up"})]),_vm._v(" "),_c('section',{staticClass:"details",on:{"click":function($event){return _vm.toggleExpansion(network)}}},[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(network.name))]),_vm._v(" "),_c('figure',{staticClass:"text"},[_vm._v(_vm._s(network.host))]),_vm._v(" "),(_vm.cantReach(network))?_c('figure',{staticClass:"connection-error"},[_c('i',{staticClass:"icon-attention"}),_vm._v(" Connection error!\n\t\t\t\t\t\t\t")]):_vm._e()]),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('figure',{staticClass:"system-token"},[_vm._v(_vm._s(network.systemToken().symbol))]),_vm._v(" "),(!_vm.isCustom(network))?_c('Switcher',{staticClass:"switch",attrs:{"state":_vm.isEnabled(network)},on:{"switched":function($event){return _vm.toggleNetwork(network)}}}):_vm._e(),_vm._v(" "),(_vm.isCustom(network))?_c('Button',{attrs:{"blue":"1","text":"Remove"},nativeOn:{"click":function($event){return _vm.toggleNetwork(network)}}}):_vm._e()],1)]),_vm._v(" "),(_vm.expandedUnique === network.unique())?_c('section',{staticClass:"expanded"},[(!_vm.isEnabled(network))?_c('pre',[_vm._v(_vm._s(_vm.networkJson(network)))]):_c('EditNetwork',{attrs:{"original":_vm.expanded},on:{"updated":function (x) { return _vm.expanded = x; },"save":_vm.saveNetwork}})],1):_vm._e()])}),0)]),_vm._v(" "),_c('section',{staticClass:"tail"},[_c('Button',{attrs:{"text":"Add custom network","blue":"1"},nativeOn:{"click":function($event){return _vm.addCustomNetwork($event)}}})],1)]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Networks.vue?vue&type=template&id=41b59d10&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apis/BackendApiService.js
var BackendApiService = __webpack_require__("MPB0");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Network.js
var Network = __webpack_require__("78si");
var Network_default = /*#__PURE__*/__webpack_require__.n(Network);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/plugins/PluginRepository.js
var PluginRepository = __webpack_require__("IMve");
var PluginRepository_default = /*#__PURE__*/__webpack_require__.n(PluginRepository);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/NetworkService.js
var NetworkService = __webpack_require__("B9Ha");
var NetworkService_default = /*#__PURE__*/__webpack_require__.n(NetworkService);

// EXTERNAL MODULE: ./src/components/misc/EditNetwork.vue + 4 modules
var EditNetwork = __webpack_require__("8s8y");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/blockchain/AccountService.js
var AccountService = __webpack_require__("5lq1");
var AccountService_default = /*#__PURE__*/__webpack_require__.n(AccountService);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Networks.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ var Networksvue_type_script_lang_js_ = ({
	components: {EditNetwork: EditNetwork["a" /* default */]},
	data(){return {
		expandedUnique:null,
		expanded:null,
		knownNetworks:[],
		test:false,
		blockchains: Blockchains["BlockchainsArray"].map(x => x.value),
		selectedBlockchain:null,
		unreachable:{},
	}},
	computed:{
		...Object(vuex_esm["c" /* mapGetters */])([
			'networks',
			'accounts',
		]),
		visibleNetworks(){
			return this.networksFor(this.selectedBlockchain).sort((a,b) => {
				const endorsed = PluginRepository_default.a.plugin(this.selectedBlockchain).getEndorsedNetwork();
				const isEndorsed = endorsed.unique() === b.unique() ? 1 : endorsed.unique() === a.unique() ? -1 : 0;
				let byName = a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

				return isEndorsed || byName;
			});
		},
	},
	created(){
		this.init();
	},
	methods:{
		async init(){
			if(!this.isMobile){
				this.selectedBlockchain = this.blockchains[0];
			}
			this.setWorkingScreen(true);
			this.knownNetworks = await Promise.race([
				new Promise(resolve => setTimeout(() => resolve([]), 2000)),
				Object(BackendApiService["GET"])(`networks?flat=true`).then(networks => networks.map(x => Network_default.a.fromJson(x))).catch(() => [])
			]);
			this.setWorkingScreen(false);
			this.networks.map(async network => {
				await this.checkReachable(network);
			})
		},
		cantReach(network){
			return this.unreachable[network.unique()]
		},
		isCustom(network){
			return !this.networksFor(network.blockchain, false).find(x => x.unique() === network.unique())
		},
		selectBlockchain(blockchain){
			this.selectedBlockchain = blockchain;
			this.expanded = null;
		},
		isEnabled(network){
			return !!this.networks.find(x => x.unique() === network.unique());
		},
		async toggleNetwork(network){
			this.setWorkingScreen(true);
			if(this.isEnabled(network)) await NetworkService_default.a.removeNetwork(network);
			else {
				await NetworkService_default.a.addNetwork(network);
				await AccountService_default.a.importAllAccountsForNetwork(network);
			}
			this.setWorkingScreen(false);
		},
		toggleExpansion(network){
			if(this.expanded && this.expanded.unique() === network.unique()) {
				this.expandedUnique = null;
				return this.expanded = null;
			}
			this.expandedUnique = network.unique();
			this.expanded = network.clone();
		},
		networkJson(network){
			const clone = network.clone();
			delete clone.id;
			delete clone.createdAt;
			if(!clone.fromOrigin){
				delete clone.fromOrigin;
			}
			if(clone.token){
				delete clone.token.id;
				delete clone.token.amount;
				delete clone.token.unusable;
				delete clone.token.fromOrigin;
				delete clone.token.createdAt;
			} else {
				delete clone.token;
			}
			return clone;
		},
		networksFor(blockchain, withSaved = true){
			const endorsed = (() => {
				const n = PluginRepository_default.a.plugin(blockchain).getEndorsedNetwork();
				return this.networks.find(x => x.unique() === n.unique()) ? [] : [n];
			})();
			const savedNetworks = withSaved ? this.networks.filter(x => x.blockchain === blockchain) : [];
			const knownNetworks = this.knownNetworks.filter(x => x.blockchain === blockchain);
			return endorsed.concat(savedNetworks).concat(knownNetworks).reduce((acc,network) => {
				if(!acc.find(x => x.unique() === network.unique())) acc.push(network);
				return acc;
			}, []);
		},
		async saveNetwork(){
			await NetworkService_default.a.updateNetwork(this.expanded);
			this.expanded = null;
			this.expandedUnique = null;
		},
		addCustomNetwork(){
			PopupService["a" /* default */].push(Popup["a" /* Popup */].addCustomNetwork(this.selectedBlockchain, async network => {
				if(!network) return;
				this.checkReachable(network);
			}));
		},
		async checkReachable(network){
			const reachable = await PluginRepository_default.a.plugin(network.blockchain).checkNetwork(network);
			if(!reachable){
				this.unreachable[network.unique()] = true;
				this.$forceUpdate();
			}
		}

	}
});

// CONCATENATED MODULE: ./src/views/Networks.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Networksvue_type_script_lang_js_ = (Networksvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Networks.vue?vue&type=style&index=0&id=41b59d10&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Networksvue_type_style_index_0_id_41b59d10_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("AiW6");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/Networks.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Networksvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "41b59d10",
  null
  
)

/* harmony default export */ var Networks = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvTmV0d29ya3MudnVlPzEyMjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05ldHdvcmtzLnZ1ZT8wNDcxIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9OZXR3b3Jrcy52dWU/ZTIzNCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvTmV0d29ya3MudnVlP2U3OGIiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9OZXR3b3Jrcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05ldHdvcmtzLnZ1ZT9lMmVhIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9OZXR3b3Jrcy52dWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQWlYLENBQWdCLDZhQUFHLEVBQUMsQzs7Ozs7OztBQ0FyWTs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxNQUFtVDtBQUN6VSw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLE1BQTZEO0FBQy9FLDhDQUE4QyxFOzs7Ozs7O0FDUjlDLDJCQUEyQixtQkFBTyxDQUFDLE1BQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTOzs7Ozs7Ozs7Ozs7QUNGdkIsMEJBQTBCLGFBQWEsMEJBQTBCLHdCQUF3QixxQkFBcUIsd0NBQXdDLDJEQUEyRCxpQ0FBaUMsMkJBQTJCLGdCQUFnQixtQkFBbUIsMEVBQTBFLHVCQUF1QixnQkFBZ0IsOEJBQThCLCtDQUErQyxxQkFBcUIsMENBQTBDLCtDQUErQyxLQUFLLHlCQUF5QiwwQ0FBMEMsZUFBZSw0RUFBNEUsNEJBQTRCLHNCQUFzQixlQUFlLG9CQUFvQiw0RUFBNEUsa0JBQWtCLGVBQWUsd0JBQXdCLHNKQUFzSixtQ0FBbUMsSUFBSSxzRkFBc0YsNkJBQTZCLGdCQUFnQixtQkFBbUIsOEJBQThCLDhCQUE4Qix5QkFBeUIsb0NBQW9DLFVBQVUsZ0NBQWdDLDBFQUEwRSxpQ0FBaUMsZ0JBQWdCLHdCQUF3QixnREFBZ0QscUJBQXFCLG1CQUFtQixnQkFBZ0IsNEJBQTRCLG1FQUFtRSxlQUFlLDBCQUEwQix5QkFBeUIsc0NBQXNDLFVBQVUscUNBQXFDLDhCQUE4QiwwQkFBMEIseUJBQXlCLHNDQUFzQyxlQUFlLG1CQUFtQiwwREFBMEQsbUJBQW1CLG1GQUFtRiwrQkFBK0IsVUFBVSw2QkFBNkIsc0ZBQXNGLHNCQUFzQixlQUFlLDJCQUEyQixxR0FBcUcsNEJBQTRCLCtCQUErQixLQUFLLDRCQUE0QixvQ0FBb0MsNERBQTRELE9BQU8sMkJBQTJCLFdBQVcseUJBQXlCLG9DQUFvQyxxRkFBcUYsdUJBQXVCLG1HQUFtRyxPQUFPLHdCQUF3QixLQUFLLHdCQUF3Qix5QkFBeUIsRUFBRSx5QkFBeUIsaUJBQWlCLGlDQUFpQyxtQkFBbUIsZUFBZSxPQUFPLHVDQUF1QyxXQUFXLHlCQUF5QixzQ0FBc0M7QUFDMzJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3dFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQ2hOMkgsQ0FBZ0IsMkdBQUcsRUFBQyxDOzs7Ozs7OztBQ0E1QztBQUN2QztBQUNMO0FBQzREOzs7QUFHbkg7QUFDMEY7QUFDMUYsZ0JBQWdCLDhDQUFVO0FBQzFCLEVBQUUsc0NBQU07QUFDUixFQUFFLE1BQU07QUFDUixFQUFFLGVBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsK0YiLCJmaWxlIjoiNzUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDFiNTlkMTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDFiNTlkMTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDFiNTlkMTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiZjJmNGMxM2VcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJibG9ja2NoYWluLWxpc3QtY29udGFpbmVyXCJ9LFsoIV92bS5pc01vYmlsZSB8fCAhX3ZtLnNlbGVjdGVkQmxvY2tjaGFpbik/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJsb2NrY2hhaW5zXCIsY2xhc3M6eydmdWxsLXdpZHRoJzpfdm0uaXNNb2JpbGV9fSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImhlYWRcIn0sW192bS5fdihcIlxcblxcdFxcdFxcdFNlbGVjdCBhIEJsb2NrY2hhaW5cXG5cXHRcXHRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJzY3JvbGxlclwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJsb2NrY2hhaW4tbGlzdFwifSxfdm0uX2woKF92bS5ibG9ja2NoYWlucyksZnVuY3Rpb24oYmxvY2tjaGFpbil7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJiYWRnZS1pdGVtIGhvdmVyYWJsZVwiLGNsYXNzOnsnYWN0aXZlJzpfdm0uc2VsZWN0ZWRCbG9ja2NoYWluID09PSBibG9ja2NoYWlufSxvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5zZWxlY3RCbG9ja2NoYWluKGJsb2NrY2hhaW4pfX19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJiYWRnZSBpY29uZWRcIixjbGFzczooXCJ0b2tlbi1cIiArIGJsb2NrY2hhaW4gKyBcIi1cIiArIGJsb2NrY2hhaW4pfSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZGV0YWlsc1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGl0bGVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmJsb2NrY2hhaW5OYW1lKGJsb2NrY2hhaW4pKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJvd1wifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwic2Vjb25kYXJ5XCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5uZXR3b3Jrc0ZvcihibG9ja2NoYWluKS5sZW5ndGgpK1wiIG5ldHdvcmtcIitfdm0uX3MoX3ZtLm5ldHdvcmtzRm9yKGJsb2NrY2hhaW4pLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnKSldKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnaScse3N0YXRpY0NsYXNzOlwiZmFsIGZhLWNoZXZyb24tcmlnaHRcIn0pXSl9KSwwKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoIV92bS5pc01vYmlsZSB8fCBfdm0uc2VsZWN0ZWRCbG9ja2NoYWluKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibGlzdC1jb250YWluZXJcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJoZWFkXCJ9LFsoX3ZtLmlzTW9iaWxlKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJiYWNrLWJ1dHRvblwiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnNlbGVjdEJsb2NrY2hhaW4obnVsbCl9fX0sW19jKCdpJyx7c3RhdGljQ2xhc3M6XCJmYWwgZmEtYXJyb3ctbGVmdFwifSldKTpfdm0uX2UoKSxfdm0uX3YoXCJcXG5cXHRcXHRcXHROZXR3b3Jrc1xcblxcdFxcdFwiKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNjcm9sbGVyIHdpdGgtdGFpbFwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIml0ZW0tbGlzdFwifSxfdm0uX2woKF92bS52aXNpYmxlTmV0d29ya3MpLGZ1bmN0aW9uKG5ldHdvcmspe3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiaXRlbVwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJhc2ljc1wiLGNsYXNzOnsnb3Blbic6X3ZtLmV4cGFuZGVkICYmIF92bS5leHBhbmRlZC51bmlxdWUoKSA9PT0gbmV0d29yay51bmlxdWUoKX19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJjaGV2cm9uXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0udG9nZ2xlRXhwYW5zaW9uKG5ldHdvcmspfX19LFtfYygnaScse3N0YXRpY0NsYXNzOlwiZmFzIGZhLWNhcmV0LWNpcmNsZS11cFwifSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJkZXRhaWxzXCIsb246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0udG9nZ2xlRXhwYW5zaW9uKG5ldHdvcmspfX19LFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKG5ldHdvcmsubmFtZSkpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0XCJ9LFtfdm0uX3YoX3ZtLl9zKG5ldHdvcmsuaG9zdCkpXSksX3ZtLl92KFwiIFwiKSwoX3ZtLmNhbnRSZWFjaChuZXR3b3JrKSk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY29ubmVjdGlvbi1lcnJvclwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tYXR0ZW50aW9uXCJ9KSxfdm0uX3YoXCIgQ29ubmVjdGlvbiBlcnJvciFcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcIildKTpfdm0uX2UoKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjdGlvbnNcIn0sW19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInN5c3RlbS10b2tlblwifSxbX3ZtLl92KF92bS5fcyhuZXR3b3JrLnN5c3RlbVRva2VuKCkuc3ltYm9sKSldKSxfdm0uX3YoXCIgXCIpLCghX3ZtLmlzQ3VzdG9tKG5ldHdvcmspKT9fYygnU3dpdGNoZXInLHtzdGF0aWNDbGFzczpcInN3aXRjaFwiLGF0dHJzOntcInN0YXRlXCI6X3ZtLmlzRW5hYmxlZChuZXR3b3JrKX0sb246e1wic3dpdGNoZWRcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0udG9nZ2xlTmV0d29yayhuZXR3b3JrKX19fSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLmlzQ3VzdG9tKG5ldHdvcmspKT9fYygnQnV0dG9uJyx7YXR0cnM6e1wiYmx1ZVwiOlwiMVwiLFwidGV4dFwiOlwiUmVtb3ZlXCJ9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnRvZ2dsZU5ldHdvcmsobmV0d29yayl9fX0pOl92bS5fZSgpXSwxKV0pLF92bS5fdihcIiBcIiksKF92bS5leHBhbmRlZFVuaXF1ZSA9PT0gbmV0d29yay51bmlxdWUoKSk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImV4cGFuZGVkXCJ9LFsoIV92bS5pc0VuYWJsZWQobmV0d29yaykpP19jKCdwcmUnLFtfdm0uX3YoX3ZtLl9zKF92bS5uZXR3b3JrSnNvbihuZXR3b3JrKSkpXSk6X2MoJ0VkaXROZXR3b3JrJyx7YXR0cnM6e1wib3JpZ2luYWxcIjpfdm0uZXhwYW5kZWR9LG9uOntcInVwZGF0ZWRcIjpmdW5jdGlvbiAoeCkgeyByZXR1cm4gX3ZtLmV4cGFuZGVkID0geDsgfSxcInNhdmVcIjpfdm0uc2F2ZU5ldHdvcmt9fSldLDEpOl92bS5fZSgpXSl9KSwwKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInRhaWxcIn0sW19jKCdCdXR0b24nLHthdHRyczp7XCJ0ZXh0XCI6XCJBZGQgY3VzdG9tIG5ldHdvcmtcIixcImJsdWVcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uYWRkQ3VzdG9tTmV0d29yaygkZXZlbnQpfX19KV0sMSldKTpfdm0uX2UoKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJibG9ja2NoYWluLWxpc3QtY29udGFpbmVyXCI+XHJcblxyXG5cdFx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHRcdDwhLS0tLS0tIEJMT0NLQ0hBSU5TIC0tLS0tLS0+XHJcblx0XHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJibG9ja2NoYWluc1wiIHYtaWY9XCIhaXNNb2JpbGUgfHwgIXNlbGVjdGVkQmxvY2tjaGFpblwiIDpjbGFzcz1cInsnZnVsbC13aWR0aCc6aXNNb2JpbGV9XCI+XHJcblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiaGVhZFwiPlxyXG5cdFx0XHRcdFNlbGVjdCBhIEJsb2NrY2hhaW5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInNjcm9sbGVyXCI+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJibG9ja2NoYWluLWxpc3RcIj5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYmFkZ2UtaXRlbSBob3ZlcmFibGVcIiA6Y2xhc3M9XCJ7J2FjdGl2ZSc6c2VsZWN0ZWRCbG9ja2NoYWluID09PSBibG9ja2NoYWlufVwiIHYtZm9yPVwiYmxvY2tjaGFpbiBpbiBibG9ja2NoYWluc1wiIEBjbGljaz1cInNlbGVjdEJsb2NrY2hhaW4oYmxvY2tjaGFpbilcIj5cclxuXHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImJhZGdlIGljb25lZFwiIDpjbGFzcz1cImB0b2tlbi0ke2Jsb2NrY2hhaW59LSR7YmxvY2tjaGFpbn1gXCI+PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZGV0YWlsc1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJ0aXRsZVwiPnt7YmxvY2tjaGFpbk5hbWUoYmxvY2tjaGFpbil9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJzZWNvbmRhcnlcIj57e25ldHdvcmtzRm9yKGJsb2NrY2hhaW4pLmxlbmd0aH19IG5ldHdvcmt7e25ldHdvcmtzRm9yKGJsb2NrY2hhaW4pLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfX08L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhbCBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPlxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0XHQ8IS0tLS0tLS0gTkVUV09SS1MgLS0tLS0tLS0tPlxyXG5cdFx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwibGlzdC1jb250YWluZXJcIiB2LWlmPVwiIWlzTW9iaWxlIHx8IHNlbGVjdGVkQmxvY2tjaGFpblwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImhlYWRcIj5cclxuXHRcdFx0XHQ8ZmlndXJlIHYtaWY9XCJpc01vYmlsZVwiIGNsYXNzPVwiYmFjay1idXR0b25cIiBAY2xpY2s9XCJzZWxlY3RCbG9ja2NoYWluKG51bGwpXCI+XHJcblx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhbCBmYS1hcnJvdy1sZWZ0XCI+PC9pPlxyXG5cdFx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHRcdE5ldHdvcmtzXHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJzY3JvbGxlciB3aXRoLXRhaWxcIj5cclxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cIml0ZW0tbGlzdFwiPlxyXG5cdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJpdGVtXCIgdi1mb3I9XCJuZXR3b3JrIGluIHZpc2libGVOZXR3b3Jrc1wiPlxyXG5cdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImJhc2ljc1wiIDpjbGFzcz1cInsnb3Blbic6ZXhwYW5kZWQgJiYgZXhwYW5kZWQudW5pcXVlKCkgPT09IG5ldHdvcmsudW5pcXVlKCl9XCI+XHJcblx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cImNoZXZyb25cIiBAY2xpY2s9XCJ0b2dnbGVFeHBhbnNpb24obmV0d29yaylcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWNhcmV0LWNpcmNsZS11cFwiPjwvaT5cclxuXHRcdFx0XHRcdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImRldGFpbHNcIiBAY2xpY2s9XCJ0b2dnbGVFeHBhbnNpb24obmV0d29yaylcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3tuZXR3b3JrLm5hbWV9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRleHRcIj57e25ldHdvcmsuaG9zdH19PC9maWd1cmU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwiY29ubmVjdGlvbi1lcnJvclwiIHYtaWY9XCJjYW50UmVhY2gobmV0d29yaylcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJpY29uLWF0dGVudGlvblwiPjwvaT4gQ29ubmVjdGlvbiBlcnJvciFcclxuXHRcdFx0XHRcdFx0XHRcdDwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImFjdGlvbnNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJzeXN0ZW0tdG9rZW5cIj57e25ldHdvcmsuc3lzdGVtVG9rZW4oKS5zeW1ib2x9fTwvZmlndXJlPlxyXG5cdFx0XHRcdFx0XHRcdFx0PFN3aXRjaGVyIHYtaWY9XCIhaXNDdXN0b20obmV0d29yaylcIiBjbGFzcz1cInN3aXRjaFwiIDpzdGF0ZT1cImlzRW5hYmxlZChuZXR3b3JrKVwiIHYtb246c3dpdGNoZWQ9XCJ0b2dnbGVOZXR3b3JrKG5ldHdvcmspXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxCdXR0b24gdi1pZj1cImlzQ3VzdG9tKG5ldHdvcmspXCIgYmx1ZT1cIjFcIiB0ZXh0PVwiUmVtb3ZlXCIgQGNsaWNrLm5hdGl2ZT1cInRvZ2dsZU5ldHdvcmsobmV0d29yaylcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJleHBhbmRlZFwiIHYtaWY9XCJleHBhbmRlZFVuaXF1ZSA9PT0gbmV0d29yay51bmlxdWUoKVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxwcmUgdi1pZj1cIiFpc0VuYWJsZWQobmV0d29yaylcIj57e25ldHdvcmtKc29uKG5ldHdvcmspfX08L3ByZT5cclxuXHRcdFx0XHRcdFx0XHQ8RWRpdE5ldHdvcmsgdi1lbHNlIDpvcmlnaW5hbD1cImV4cGFuZGVkXCIgdi1vbjp1cGRhdGVkPVwieCA9PiBleHBhbmRlZCA9IHhcIiB2LW9uOnNhdmU9XCJzYXZlTmV0d29ya1wiIC8+XHJcblx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJ0YWlsXCI+XHJcblx0XHRcdFx0PEJ1dHRvbiBAY2xpY2submF0aXZlPVwiYWRkQ3VzdG9tTmV0d29ya1wiIHRleHQ9XCJBZGQgY3VzdG9tIG5ldHdvcmtcIiBibHVlPVwiMVwiIC8+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQge21hcFN0YXRlLCBtYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQge0Jsb2NrY2hhaW5zLCBCbG9ja2NoYWluc0FycmF5fSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvQmxvY2tjaGFpbnNcIjtcclxuXHRpbXBvcnQge0dFVH0gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvc2VydmljZXMvYXBpcy9CYWNrZW5kQXBpU2VydmljZVwiO1xyXG5cdGltcG9ydCBOZXR3b3JrIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9OZXR3b3JrXCI7XHJcblx0aW1wb3J0IFBsdWdpblJlcG9zaXRvcnkgZnJvbSAnQHdhbGxldHBhY2svY29yZS9wbHVnaW5zL1BsdWdpblJlcG9zaXRvcnknXHJcblx0aW1wb3J0IE5ldHdvcmtTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL2Jsb2NrY2hhaW4vTmV0d29ya1NlcnZpY2VcIjtcclxuXHRpbXBvcnQgRWRpdE5ldHdvcmsgZnJvbSBcIi4uL2NvbXBvbmVudHMvbWlzYy9FZGl0TmV0d29ya1wiO1xyXG5cdGltcG9ydCBBY2NvdW50U2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9ibG9ja2NoYWluL0FjY291bnRTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IFBvcHVwU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvdXRpbGl0eS9Qb3B1cFNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOiB7RWRpdE5ldHdvcmt9LFxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblx0XHRcdGV4cGFuZGVkVW5pcXVlOm51bGwsXHJcblx0XHRcdGV4cGFuZGVkOm51bGwsXHJcblx0XHRcdGtub3duTmV0d29ya3M6W10sXHJcblx0XHRcdHRlc3Q6ZmFsc2UsXHJcblx0XHRcdGJsb2NrY2hhaW5zOiBCbG9ja2NoYWluc0FycmF5Lm1hcCh4ID0+IHgudmFsdWUpLFxyXG5cdFx0XHRzZWxlY3RlZEJsb2NrY2hhaW46bnVsbCxcclxuXHRcdFx0dW5yZWFjaGFibGU6e30sXHJcblx0XHR9fSxcclxuXHRcdGNvbXB1dGVkOntcclxuXHRcdFx0Li4ubWFwR2V0dGVycyhbXHJcblx0XHRcdFx0J25ldHdvcmtzJyxcclxuXHRcdFx0XHQnYWNjb3VudHMnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0dmlzaWJsZU5ldHdvcmtzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubmV0d29ya3NGb3IodGhpcy5zZWxlY3RlZEJsb2NrY2hhaW4pLnNvcnQoKGEsYikgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgZW5kb3JzZWQgPSBQbHVnaW5SZXBvc2l0b3J5LnBsdWdpbih0aGlzLnNlbGVjdGVkQmxvY2tjaGFpbikuZ2V0RW5kb3JzZWROZXR3b3JrKCk7XHJcblx0XHRcdFx0XHRjb25zdCBpc0VuZG9yc2VkID0gZW5kb3JzZWQudW5pcXVlKCkgPT09IGIudW5pcXVlKCkgPyAxIDogZW5kb3JzZWQudW5pcXVlKCkgPT09IGEudW5pcXVlKCkgPyAtMSA6IDA7XHJcblx0XHRcdFx0XHRsZXQgYnlOYW1lID0gYS5uYW1lIDwgYi5uYW1lID8gLTEgOiBhLm5hbWUgPiBiLm5hbWUgPyAxIDogMDtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gaXNFbmRvcnNlZCB8fCBieU5hbWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlZCgpe1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHRcdFx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0XHRcdGlmKCF0aGlzLmlzTW9iaWxlKXtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRCbG9ja2NoYWluID0gdGhpcy5ibG9ja2NoYWluc1swXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nU2NyZWVuKHRydWUpO1xyXG5cdFx0XHRcdHRoaXMua25vd25OZXR3b3JrcyA9IGF3YWl0IFByb21pc2UucmFjZShbXHJcblx0XHRcdFx0XHRuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShbXSksIDIwMDApKSxcclxuXHRcdFx0XHRcdEdFVChgbmV0d29ya3M/ZmxhdD10cnVlYCkudGhlbihuZXR3b3JrcyA9PiBuZXR3b3Jrcy5tYXAoeCA9PiBOZXR3b3JrLmZyb21Kc29uKHgpKSkuY2F0Y2goKCkgPT4gW10pXHJcblx0XHRcdFx0XSk7XHJcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nU2NyZWVuKGZhbHNlKTtcclxuXHRcdFx0XHR0aGlzLm5ldHdvcmtzLm1hcChhc3luYyBuZXR3b3JrID0+IHtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuY2hlY2tSZWFjaGFibGUobmV0d29yayk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FudFJlYWNoKG5ldHdvcmspe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnVucmVhY2hhYmxlW25ldHdvcmsudW5pcXVlKCldXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzQ3VzdG9tKG5ldHdvcmspe1xyXG5cdFx0XHRcdHJldHVybiAhdGhpcy5uZXR3b3Jrc0ZvcihuZXR3b3JrLmJsb2NrY2hhaW4sIGZhbHNlKS5maW5kKHggPT4geC51bmlxdWUoKSA9PT0gbmV0d29yay51bmlxdWUoKSlcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0QmxvY2tjaGFpbihibG9ja2NoYWluKXtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQmxvY2tjaGFpbiA9IGJsb2NrY2hhaW47XHJcblx0XHRcdFx0dGhpcy5leHBhbmRlZCA9IG51bGw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGlzRW5hYmxlZChuZXR3b3JrKXtcclxuXHRcdFx0XHRyZXR1cm4gISF0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4LnVuaXF1ZSgpID09PSBuZXR3b3JrLnVuaXF1ZSgpKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0YXN5bmMgdG9nZ2xlTmV0d29yayhuZXR3b3JrKXtcclxuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmdTY3JlZW4odHJ1ZSk7XHJcblx0XHRcdFx0aWYodGhpcy5pc0VuYWJsZWQobmV0d29yaykpIGF3YWl0IE5ldHdvcmtTZXJ2aWNlLnJlbW92ZU5ldHdvcmsobmV0d29yayk7XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhd2FpdCBOZXR3b3JrU2VydmljZS5hZGROZXR3b3JrKG5ldHdvcmspO1xyXG5cdFx0XHRcdFx0YXdhaXQgQWNjb3VudFNlcnZpY2UuaW1wb3J0QWxsQWNjb3VudHNGb3JOZXR3b3JrKG5ldHdvcmspO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmdTY3JlZW4oZmFsc2UpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0b2dnbGVFeHBhbnNpb24obmV0d29yayl7XHJcblx0XHRcdFx0aWYodGhpcy5leHBhbmRlZCAmJiB0aGlzLmV4cGFuZGVkLnVuaXF1ZSgpID09PSBuZXR3b3JrLnVuaXF1ZSgpKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV4cGFuZGVkVW5pcXVlID0gbnVsbDtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmV4cGFuZGVkID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5leHBhbmRlZFVuaXF1ZSA9IG5ldHdvcmsudW5pcXVlKCk7XHJcblx0XHRcdFx0dGhpcy5leHBhbmRlZCA9IG5ldHdvcmsuY2xvbmUoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bmV0d29ya0pzb24obmV0d29yayl7XHJcblx0XHRcdFx0Y29uc3QgY2xvbmUgPSBuZXR3b3JrLmNsb25lKCk7XHJcblx0XHRcdFx0ZGVsZXRlIGNsb25lLmlkO1xyXG5cdFx0XHRcdGRlbGV0ZSBjbG9uZS5jcmVhdGVkQXQ7XHJcblx0XHRcdFx0aWYoIWNsb25lLmZyb21PcmlnaW4pe1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGNsb25lLmZyb21PcmlnaW47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKGNsb25lLnRva2VuKXtcclxuXHRcdFx0XHRcdGRlbGV0ZSBjbG9uZS50b2tlbi5pZDtcclxuXHRcdFx0XHRcdGRlbGV0ZSBjbG9uZS50b2tlbi5hbW91bnQ7XHJcblx0XHRcdFx0XHRkZWxldGUgY2xvbmUudG9rZW4udW51c2FibGU7XHJcblx0XHRcdFx0XHRkZWxldGUgY2xvbmUudG9rZW4uZnJvbU9yaWdpbjtcclxuXHRcdFx0XHRcdGRlbGV0ZSBjbG9uZS50b2tlbi5jcmVhdGVkQXQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBjbG9uZS50b2tlbjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGNsb25lO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRuZXR3b3Jrc0ZvcihibG9ja2NoYWluLCB3aXRoU2F2ZWQgPSB0cnVlKXtcclxuXHRcdFx0XHRjb25zdCBlbmRvcnNlZCA9ICgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuID0gUGx1Z2luUmVwb3NpdG9yeS5wbHVnaW4oYmxvY2tjaGFpbikuZ2V0RW5kb3JzZWROZXR3b3JrKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC51bmlxdWUoKSA9PT0gbi51bmlxdWUoKSkgPyBbXSA6IFtuXTtcclxuXHRcdFx0XHR9KSgpO1xyXG5cdFx0XHRcdGNvbnN0IHNhdmVkTmV0d29ya3MgPSB3aXRoU2F2ZWQgPyB0aGlzLm5ldHdvcmtzLmZpbHRlcih4ID0+IHguYmxvY2tjaGFpbiA9PT0gYmxvY2tjaGFpbikgOiBbXTtcclxuXHRcdFx0XHRjb25zdCBrbm93bk5ldHdvcmtzID0gdGhpcy5rbm93bk5ldHdvcmtzLmZpbHRlcih4ID0+IHguYmxvY2tjaGFpbiA9PT0gYmxvY2tjaGFpbik7XHJcblx0XHRcdFx0cmV0dXJuIGVuZG9yc2VkLmNvbmNhdChzYXZlZE5ldHdvcmtzKS5jb25jYXQoa25vd25OZXR3b3JrcykucmVkdWNlKChhY2MsbmV0d29yaykgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIWFjYy5maW5kKHggPT4geC51bmlxdWUoKSA9PT0gbmV0d29yay51bmlxdWUoKSkpIGFjYy5wdXNoKG5ldHdvcmspO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHR9LCBbXSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIHNhdmVOZXR3b3JrKCl7XHJcblx0XHRcdFx0YXdhaXQgTmV0d29ya1NlcnZpY2UudXBkYXRlTmV0d29yayh0aGlzLmV4cGFuZGVkKTtcclxuXHRcdFx0XHR0aGlzLmV4cGFuZGVkID0gbnVsbDtcclxuXHRcdFx0XHR0aGlzLmV4cGFuZGVkVW5pcXVlID0gbnVsbDtcclxuXHRcdFx0fSxcclxuXHRcdFx0YWRkQ3VzdG9tTmV0d29yaygpe1xyXG5cdFx0XHRcdFBvcHVwU2VydmljZS5wdXNoKFBvcHVwLmFkZEN1c3RvbU5ldHdvcmsodGhpcy5zZWxlY3RlZEJsb2NrY2hhaW4sIGFzeW5jIG5ldHdvcmsgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIW5ldHdvcmspIHJldHVybjtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tSZWFjaGFibGUobmV0d29yayk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhc3luYyBjaGVja1JlYWNoYWJsZShuZXR3b3JrKXtcclxuXHRcdFx0XHRjb25zdCByZWFjaGFibGUgPSBhd2FpdCBQbHVnaW5SZXBvc2l0b3J5LnBsdWdpbihuZXR3b3JrLmJsb2NrY2hhaW4pLmNoZWNrTmV0d29yayhuZXR3b3JrKTtcclxuXHRcdFx0XHRpZighcmVhY2hhYmxlKXtcclxuXHRcdFx0XHRcdHRoaXMudW5yZWFjaGFibGVbbmV0d29yay51bmlxdWUoKV0gPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy4kZm9yY2VVcGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHJcblxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9OZXR3b3Jrcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDFiNTlkMTAmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9OZXR3b3Jrcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vTmV0d29ya3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDFiNTlkMTAmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDFiNTlkMTBcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9