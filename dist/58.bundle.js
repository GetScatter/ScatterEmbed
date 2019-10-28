(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[58],{

/***/ "5Pnu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/TransferRequest.vue?vue&type=template&id=f21564e2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"popout-window transfer"},[_c('PopOutApp',{attrs:{"app":_vm.popup.data.props.appData,"suffix":"is requesting a transfer"}}),_vm._v(" "),(!_vm.account)?_c('section',[_c('section',{staticClass:"padded"},[_c('Input',{attrs:{"disabled":_vm.amount > 0,"red":_vm.inputError,"big":"1","centered":"1","text":_vm.amount > 0 ? _vm.amount : _vm.customAmount,"placeholder":parseFloat(1).toFixed(_vm.decimals)},on:{"changed":function (x) { return _vm.customAmount = x; }}}),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v("Select Account")]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.network.name))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])])],1)]):_c('section',{staticClass:"padded"},[_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('section',{staticClass:"transfer-details"},[(_vm.amount > 0)?_c('div',[_vm._v(_vm._s(parseFloat(_vm.amount).toFixed(_vm.decimals))+" "+_vm._s(_vm.token.symbol))]):_c('div',[_vm._v(_vm._s(_vm.customAmount)+" "+_vm._s(_vm.token.symbol))]),_vm._v(" "),_c('span',{class:{'small':_vm.to.length > 12}},[_vm._v(_vm._s(_vm.to))])]),_vm._v(" "),(_vm.memo && _vm.memo.length)?_c('section',{staticClass:"memo"},[_c('section',{staticClass:"info-line"},[_c('span',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.GENERIC.Memo)))])]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.memo))])]):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('section',{staticClass:"boxes"},[_c('section',{staticClass:"box nested account-selector",on:{"click":_vm.selectTokenAndAccount}},[_c('section',[_c('figure',{staticClass:"name"},[_vm._v(_vm._s(_vm.account.sendable()))]),_vm._v(" "),_c('figure',{staticClass:"network"},[_vm._v(_vm._s(_vm.network.name))])]),_vm._v(" "),_c('figure',{staticClass:"chevron fas fa-caret-square-down"})])]),_vm._v(" "),(!_vm.pinning)?_c('section',{staticClass:"fixed-actions"},[_c('Button',{attrs:{"blue":"1","text":_vm.locale(_vm.langKeys.GENERIC.Confirm)},nativeOn:{"click":function($event){return _vm.returnResult(true)}}}),_vm._v(" "),_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Deny)},nativeOn:{"click":function($event){return _vm.returnResult(null)}}})],1):_vm._e()])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"info-line"},[_c('span',[_vm._v("From")])])}]


// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=template&id=f21564e2&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Network.js
var Network = __webpack_require__("78si");
var Network_default = /*#__PURE__*/__webpack_require__.n(Network);

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Keypair.js
var Keypair = __webpack_require__("Hxfq");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/IdGenerator.js
var IdGenerator = __webpack_require__("SDtL");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Token.js
var Token = __webpack_require__("GwxU");
var Token_default = /*#__PURE__*/__webpack_require__.n(Token);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/utility/TokenService.js
var TokenService = __webpack_require__("ONSl");
var TokenService_default = /*#__PURE__*/__webpack_require__.n(TokenService);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/TransferRequest.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

	
	
	// import SearchBar from '../../components/reusable/SearchBar';
	
	
	
	
	
	
	
	
	
	
	

	/* harmony default export */ var TransferRequestvue_type_script_lang_js_ = ({
		props:['popup', 'expanded', 'pinning'],
		components:{
			RequiredFields: RequiredFields["a" /* default */],
			PopOutApp: PopOutApp["a" /* default */],
			// SearchBar,
		},
		data () {return {
			searchTerms:'',
            account:null,
			customAmount:0,
			inputError:false,
		}},
		created(){
            this.customAmount = parseFloat(0).toFixed(this.decimals);
		},
		computed: {
			...Object(vuex_esm["d" /* mapState */])([
				'scatter'
			]),
			...Object(vuex_esm["c" /* mapGetters */])([
				'identity',
				'identities',
				'accounts',
				'networks',
				'keypairs',
			]),
			payload(){ return this.popup.payload(); },
			network(){ return this.networks.find(x => x.unique() === Network_default.a.fromJson(this.payload.network).unique()); },
            blockchain(){ return this.network.blockchain; },
			to(){ return this.payload.to; },
			amount(){ return parseFloat(this.payload.amount).toFixed(this.decimals); },
			options(){ return this.payload.options || {}; },
			memo(){ return this.payload.memo; },
			decimals(){ return this.options.decimals || 4; },
            token(){
			    return Token_default.a.fromJson({
                    contract:this.payload.contract,
				    blockchain:this.blockchain,
				    symbol:this.payload.symbol,
                    decimals:this.options.decimals || PluginRepository.plugin(this.blockchain).defaultDecimals(),
                    name:this.payload.symbol
                })
            },
			validAccounts(){
				return this.accounts
					.filter(x => [this.network.unique()].includes(x.networkUnique))
					.filter(x => [this.network.blockchain].includes(x.blockchain().toLowerCase()))
					.filter(id => JSON.stringify(id).toLowerCase().indexOf(this.searchTerms.toLowerCase()) > -1)
					.reduce((acc, account) => {
						if(!acc.find(x => account.network().unique() === x.network().unique()
							&& account.sendable() === x.sendable())) acc.push(account);

						return acc;
					}, [])
			},
            selectedAccounts(){
                return [this.account]
	                .map(x => this.formatAccount(x, false))
            },
            currentAmount(){
	            return this.amount > 0 ? this.amount : this.customAmount;
            }
		},
		methods: {
			returnResult(result){
				if(!result) return this.$emit('returned', null);

				let amount = this.currentAmount;
				if(this.blockchain === Blockchains["Blockchains"].EOSIO){
					amount = parseFloat(amount).toFixed(this.decimals);
				} else {
					amount = TokenService_default.a.formatAmount(amount, this.token);
				}
				this.$emit('returned', {
					account:this.account,
					amount
				});
			},
			selectTokenAndAccount(){
				PopupService["a" /* default */].push(Popup["a" /* Popup */].selectAccount(account => {
					if(!account) return;
					this.account = account;
				}, this.validAccounts))
			},
			selectAccount(account){
				this.inputError = false;
				if(account && this.currentAmount <= 0)
					return this.inputError = true;

                this.account = account;
			},
            formatAccount(account, select = true){
	            return {
		            title:account.sendable(),
		            description:``,
		            actions:[{
			            name:select
							? this.locale(this.langKeys.GENERIC.Select)
							: this.locale(this.langKeys.GENERIC.Unselect),
			            handler:() => this.selectAccount(select ? account : null),
			            blue:select,
                        red:!select,
			            small:1,
		            }]
	            }
            }
		},
        watch:{
			['customAmount'](){
				this.inputError = false;
            }
        }
	});

// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_TransferRequestvue_type_script_lang_js_ = (TransferRequestvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/TransferRequest.vue?vue&type=style&index=0&id=f21564e2&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var TransferRequestvue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("zBGh");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/TransferRequest.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_TransferRequestvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "f21564e2",
  null
  
)

/* harmony default export */ var TransferRequest = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8Yeu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("M1sK");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RequiredFields_vue_vue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "IeaP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=template&id=24ae06ac&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"app-details"},[(!_vm.untrusted)?_c('figure',{staticClass:"logo",class:{'border':_vm.app.applink !== 'Scatter' && !_vm.app.img}},[(_vm.app.applink === 'Scatter')?_c('Scatter'):(_vm.app.img)?_c('img',{attrs:{"src":_vm.app.img}}):_c('span',[_vm._v("No Image")])],1):_c('figure',{staticClass:"logo scam"},[_c('i',{staticClass:"icon-attention"})]),_vm._v(" "),(_vm.ridlEnabled && _vm.app.applink !== 'Scatter')?_c('section',[(_vm.appReputation === false)?_c('figure',{staticClass:"reputation"},[_c('i',{staticClass:"icon-spin4 animate-spin"}),_vm._v(" loading reputation")]):_c('section',[(_vm.unknownReputation)?_c('figure',{staticClass:"reputation"},[_vm._v("Unknown Reputation")]):_vm._e(),_vm._v(" "),(_vm.trusted)?_c('figure',{staticClass:"reputation trusted"},[_vm._v("Trustworthy")]):_vm._e(),_vm._v(" "),(_vm.untrusted)?_c('figure',{staticClass:"reputation untrusted"},[_vm._v("Known Scam")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"name"},[_c('b',[_vm._v(_vm._s(_vm.app.name))]),_vm._v(" "),(_vm.suffix)?_c('span',[_vm._v(_vm._s(_vm.suffix))]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=template&id=24ae06ac&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/components/svgs/ScatterOutline.vue + 2 modules
var ScatterOutline = __webpack_require__("wg2a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var PopOutAppvue_type_script_lang_js_ = ({
	components:{Scatter: ScatterOutline["a" /* default */]},
	props:['app', 'suffix'],
	computed:{
		...Object(vuex_esm["d" /* mapState */])([
			'appReputation'
		]),
		...Object(vuex_esm["c" /* mapGetters */])([
			'ridlEnabled',
		]),
		unknownReputation(){
			return this.appReputation === undefined;
		},
		trusted(){
			return this.appReputation && parseFloat(this.appReputation.decimal) > 0
		},
		untrusted(){
			return this.appReputation && parseFloat(this.appReputation.decimal) < 0
		}
	},
});

// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_PopOutAppvue_type_script_lang_js_ = (PopOutAppvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue?vue&type=style&index=0&id=24ae06ac&scoped=true&lang=scss&
var PopOutAppvue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss_ = __webpack_require__("qEK9");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/popouts/PopOutApp.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_PopOutAppvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "24ae06ac",
  null
  
)

/* harmony default export */ var PopOutApp = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "M1sK":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("QBFQ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("66bb7c78", content, true, {});

/***/ }),

/***/ "Mq7R":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("edmm");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("5b3a30d5", content, true, {});

/***/ }),

/***/ "QBFQ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".fields-title[data-v-0a29a3fd]{margin:-20px -30px 0;padding:20px 30px;background:linear-gradient(180deg, #007fd7 0%, #0799ff 100%);color:#fff;font-size:18px;margin-bottom:20px}.required-fields[data-v-0a29a3fd]{padding:20px 0 0}\n", ""]);


/***/ }),

/***/ "edmm":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".reputation[data-v-24ae06ac]{padding:5px 12px;font-size:10px;margin-bottom:10px;margin-top:-5px;font-weight:bold;background:#f3f6f7;color:#c8c8c8}.reputation.trusted[data-v-24ae06ac]{background:#159F00;color:#fff}.reputation.untrusted[data-v-24ae06ac]{background:#ff0707;color:#fff}.app-details[data-v-24ae06ac]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.app-details .logo[data-v-24ae06ac]{display:flex;align-items:center;justify-content:center;height:100px;width:100px;border-radius:0;padding:5px;margin-bottom:20px}.app-details .logo.border[data-v-24ae06ac]{background:#f3f6f7;border:1px solid #dfe0e1}.app-details .logo img[data-v-24ae06ac]{height:100%;width:100%}.app-details .logo span[data-v-24ae06ac]{font-size:10px;font-weight:bold;color:#7a7a7a}.app-details .logo.scam[data-v-24ae06ac]{font-size:48px;border-radius:50%;color:#ff0707;background:#f3f6f7;border:1px solid #dfe0e1;animation:pulsate 0.5s ease infinite}.app-details .name[data-v-24ae06ac]{font-size:14px}\n", ""]);


/***/ }),

/***/ "psvp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/RequiredFields.vue?vue&type=template&id=0a29a3fd&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"required-fields"},[_c('section',{staticClass:"fields-title"},[_vm._v("\n\t\tRequired Identity Fields\n\t")]),_vm._v(" "),_c('section',[_c('label',[_vm._v("Personal information:")]),_vm._v(" "),_c('figure',{staticClass:"text"},[_vm._v("\n\t\t\t"+_vm._s(_vm.identityRequirements)+"\n\t\t")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=template&id=0a29a3fd&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/popouts/RequiredFields.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var RequiredFieldsvue_type_script_lang_js_ = ({
	props:['fields', 'identity', 'selectedIdentity', 'selectedLocation', 'clonedLocation'],

	data(){return {

	}},
	computed:{

		identityRequirements() {
			return this.personalFields.concat(this.locationFields).join(', ');
		},

		personalFields(){
			return this.fields.personal;
		},
		locationFields(){
			return this.fields.location;
		},
	},
	methods:{

		fieldValueFor(field, useUnclonedIdentity = false){
			return useUnclonedIdentity
				? this.identity.getPropertyValueByName(field, this.selectedLocation)
				: this.selectedIdentity.getPropertyValueByName(field, this.clonedLocation);
		},
	}

});

// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_RequiredFieldsvue_type_script_lang_js_ = (RequiredFieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue?vue&type=style&index=0&id=0a29a3fd&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var RequiredFieldsvue_type_style_index_0_id_0a29a3fd_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("8Yeu");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/popouts/RequiredFields.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_RequiredFieldsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0a29a3fd",
  null
  
)

/* harmony default export */ var RequiredFields = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "q1LW":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-f21564e2]{padding:50px 50px 20px 50px}.boxes[data-v-f21564e2]{width:100%}.boxes .box[data-v-f21564e2]{width:100%}.memo[data-v-f21564e2]{text-align:center}.memo>span[data-v-f21564e2]{font-size:13px;color:#0799ff;font-weight:bold}.padded[data-v-f21564e2]{padding:0 30px}.transfer-details[data-v-f21564e2]{text-align:center}.transfer-details span[data-v-f21564e2]{display:block;font-size:22px}.transfer-details div[data-v-f21564e2]{font-size:36px}.transfer-details .blue[data-v-f21564e2]{color:#0799ff}.transfer-details .small[data-v-f21564e2]{font-size:13px}.transfer-details .bold[data-v-f21564e2]{font-weight:800}.popout-list[data-v-f21564e2]{padding-top:0}.popout-list.done[data-v-f21564e2]{opacity:0.3}.popout-list.done[data-v-f21564e2]:hover{opacity:1}.popout-list .search-bar[data-v-f21564e2]{margin-left:-30px}\n", ""]);


/***/ }),

/***/ "qEK9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Mq7R");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "wg2a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgs/ScatterOutline.vue?vue&type=template&id=361960f5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":"88px","height":"88px","viewBox":"0 0 88 88","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('g',{attrs:{"id":"welcome_scatter","stroke":"none","stroke-width":"1","fill":"none","fill-rule":"evenodd","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('g',{attrs:{"id":"Group","stroke":"#00A8FF"}},[_c('g',{attrs:{"id":"Icon"}},[_c('circle',{attrs:{"id":"Base","cx":"44","cy":"44","r":"43.7079646"}})]),_vm._v(" "),_c('path',{attrs:{"d":"M40.8188559,71.5932203 C39.3040178,71.5932203 38.0455559,71.423153 37.0434322,71.0830131 C36.0413085,70.7428732 35.2489436,70.3616877 34.6663136,69.9394451 C34.0836835,69.5172025 33.6758486,69.1125594 33.4427966,68.7255037 C33.2097446,68.338448 33.0932203,68.0862791 33.0932203,67.9689895 C33.0932203,67.5467469 33.1864397,67.0951887 33.3728814,66.6143013 C33.559323,66.1334139 33.7923715,65.68772 34.0720339,65.2772064 C34.3516963,64.8666928 34.6546594,64.5206936 34.9809322,64.2391985 C35.307205,63.9577035 35.5985157,63.816958 35.8548729,63.816958 C36.1811457,63.816958 36.4491515,64.0280762 36.6588983,64.4503188 L37.0084746,64.8021858 C37.1949162,64.9898492 37.4570958,65.1833742 37.7950212,65.3827665 C38.1329466,65.5821588 38.5524339,65.763955 39.0534958,65.9281605 C39.5545576,66.0923659 40.1430051,66.1744674 40.8188559,66.1744674 C42.2870836,66.1744674 43.4872835,65.7229092 44.4194915,64.8197792 C45.3516996,63.9166492 45.8177966,62.6909911 45.8177966,61.1427683 C45.8177966,60.0637039 45.5672695,59.1019435 45.0662076,58.2574583 C44.5651458,57.4129731 43.9067837,56.6271445 43.0911017,55.8999489 C42.2754197,55.1727533 41.3432256,54.4631618 40.2944915,53.7711531 C39.2457575,53.0791444 38.1737343,52.3578241 37.0783898,51.6071706 C35.9830454,50.8565171 34.9110222,50.0472309 33.8622881,49.1792878 C32.8135541,48.3113447 31.88136,47.314398 31.065678,46.1884177 C30.2499959,45.0624374 29.5916339,43.7898643 29.090572,42.37066 C28.5895102,40.9514557 28.3389831,39.3270189 28.3389831,37.497301 C28.3389831,35.9256202 28.6069888,34.3422342 29.1430085,32.7470955 C29.6790281,31.1519568 30.4189571,29.6330792 31.3628178,28.190417 C32.3066784,26.7477547 33.4194851,25.3989445 34.7012712,24.1439456 C35.9830573,22.8889468 37.3696959,21.7981698 38.8612288,20.8715818 C40.3527617,19.9449939 41.9083605,19.2178092 43.528072,18.690006 C45.1477835,18.1622028 46.7732969,17.8983051 48.404661,17.8983051 C49.8029731,17.8983051 51.0614351,18.121152 52.1800847,18.5668525 C53.2987344,19.012553 54.2425809,19.640043 55.0116525,20.4493414 C55.7807242,21.2586397 56.3749979,22.2321288 56.7944915,23.3698381 C57.2139851,24.5075473 57.4237288,25.7801205 57.4237288,27.1875958 C57.4237288,28.5246974 57.1906803,29.8383213 56.7245763,31.128507 C56.2584722,32.4186927 55.6408937,33.6384864 54.871822,34.7879246 C54.1027504,35.9373627 53.2346447,36.9988178 52.2674788,37.9723216 C51.300313,38.9458253 50.3098568,39.7902979 49.2960805,40.5057645 C48.2823043,41.2212311 47.2976743,41.7783484 46.342161,42.1771331 C45.3866478,42.5759178 44.5476731,42.7753071 43.8252119,42.7753071 C43.1959714,42.7753071 42.6308288,42.6286973 42.1297669,42.3354733 C41.6287051,42.0422492 41.2092178,41.6786569 40.8712924,41.2446853 C40.533367,40.8107138 40.2711874,40.3532912 40.0847458,39.8724038 C39.8983042,39.3915164 39.8050847,38.9634157 39.8050847,38.5880889 C39.8050847,38.283136 39.8458682,38.0837466 39.9274364,37.9899149 C40.0090046,37.8960832 40.1255289,37.8550325 40.2770127,37.8667614 C40.4284965,37.8784904 40.6207615,37.9136768 40.8538136,37.9723216 C41.0868656,38.0309664 41.3548714,38.0602883 41.657839,38.0602883 C42.6366574,38.0602883 43.720333,37.7201536 44.9088983,37.0398738 C46.0974636,36.3595941 47.2160965,35.491664 48.2648305,34.4360575 C49.3135646,33.380451 50.1933227,32.2193013 50.9041314,30.9525735 C51.61494,29.6858457 51.970339,28.4543232 51.970339,27.2579692 C51.970339,26.0381573 51.6732021,25.0763969 51.0789195,24.3726592 C50.4846369,23.6689216 49.476702,23.317058 48.0550847,23.317058 C47.1694871,23.317058 46.208162,23.4871254 45.1710805,23.8272653 C44.1339991,24.1674051 43.0911069,24.6424209 42.0423729,25.2523269 C40.9936388,25.8622329 39.9798778,26.6011463 39.0010593,27.4690895 C38.0222409,28.3370326 37.1599614,29.2929286 36.4141949,30.3368061 C35.6684285,31.3806836 35.0683285,32.506647 34.6138771,33.71473 C34.1594257,34.922813 33.9322034,36.1836574 33.9322034,37.497301 C33.9322034,38.8813184 34.1827305,40.1187053 34.6837924,41.2094986 C35.1848542,42.300292 35.8490425,43.2913744 36.6763771,44.1827754 C37.5037118,45.0741764 38.441732,45.8951914 39.4904661,46.6458449 C40.5392002,47.3964984 41.6112233,48.1412763 42.7065678,48.8802008 C43.8019123,49.6191254 44.8739354,50.3814964 45.9226695,51.1673368 C46.9714035,51.9531772 47.9094238,52.8211073 48.7367585,53.7711531 C49.5640931,54.721199 50.2282814,55.7767896 50.7293432,56.9379568 C51.230405,58.0991239 51.4809322,59.430341 51.4809322,60.931648 C51.4809322,62.3860392 51.2071002,63.7641715 50.659428,65.0660861 C50.1117557,66.3680008 49.3601743,67.4998286 48.404661,68.4616034 C47.4491478,69.4233782 46.3188625,70.1857492 45.0137712,70.7487394 C43.7086799,71.3117295 42.3103888,71.5932203 40.8188559,71.5932203 Z","id":"Scatter"}})])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgs/ScatterOutline.vue?vue&type=template&id=361960f5&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/svgs/ScatterOutline.vue

var script = {}


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ScatterOutline = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "zBGh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zT7j");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferRequest_vue_vue_type_style_index_0_id_f21564e2_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "zT7j":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("q1LW");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("8a96d28e", content, true, {});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9UcmFuc2ZlclJlcXVlc3QudnVlPzZjN2UiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL1RyYW5zZmVyUmVxdWVzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVHJhbnNmZXJSZXF1ZXN0LnZ1ZT9hMzM2Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1RyYW5zZmVyUmVxdWVzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/MzRhMCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NGM1MyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80NjIxIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mOTc4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9kZmI0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlP2UxYTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/ZmJmMCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/MjQ5MiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9UcmFuc2ZlclJlcXVlc3QudnVlP2U1YmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzg3N2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3Zncy9TY2F0dGVyT3V0bGluZS52dWU/MWQ2MyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdmdzL1NjYXR0ZXJPdXRsaW5lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9UcmFuc2ZlclJlcXVlc3QudnVlPzEzMWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvVHJhbnNmZXJSZXF1ZXN0LnZ1ZT9kOTUyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IscUJBQXFCLHFDQUFxQyxrQkFBa0IsT0FBTyx3RUFBd0UseURBQXlELHFCQUFxQixjQUFjLE9BQU8sZ0xBQWdMLEtBQUssd0JBQXdCLDZCQUE2QixJQUFJLDRCQUE0QixvQkFBb0IsZ0JBQWdCLDhDQUE4QyxtQ0FBbUMsNkJBQTZCLG1CQUFtQixzREFBc0Qsc0JBQXNCLGdFQUFnRSwrQ0FBK0MsMEJBQTBCLHFCQUFxQiwwREFBMEQsK0JBQStCLDBOQUEwTixPQUFPLDRCQUE0QixxRkFBcUYsbUJBQW1CLGdCQUFnQix3QkFBd0Isb0xBQW9MLG9CQUFvQixnQkFBZ0IsOENBQThDLG1DQUFtQyw2QkFBNkIsbUJBQW1CLG9FQUFvRSxzQkFBc0IsZ0VBQWdFLCtDQUErQywrQ0FBK0MsNEJBQTRCLGVBQWUsT0FBTywyREFBMkQsV0FBVyx5QkFBeUIsZ0NBQWdDLDJCQUEyQixPQUFPLDZDQUE2QyxXQUFXLHlCQUF5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Y0FBYyxtQkFBTyxDQUFDLE1BQXNVO0FBQzVWLDRDQUE0QyxRQUFTO0FBQ3JEO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsTUFBZ0U7QUFDbEYsOENBQThDLEUiLCJmaWxlIjoiNTguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBvcG91dC13aW5kb3cgdHJhbnNmZXJcIn0sW19jKCdQb3BPdXRBcHAnLHthdHRyczp7XCJhcHBcIjpfdm0ucG9wdXAuZGF0YS5wcm9wcy5hcHBEYXRhLFwic3VmZml4XCI6XCJpcyByZXF1ZXN0aW5nIGEgdHJhbnNmZXJcIn19KSxfdm0uX3YoXCIgXCIpLCghX3ZtLmFjY291bnQpP19jKCdzZWN0aW9uJyxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhZGRlZFwifSxbX2MoJ0lucHV0Jyx7YXR0cnM6e1wiZGlzYWJsZWRcIjpfdm0uYW1vdW50ID4gMCxcInJlZFwiOl92bS5pbnB1dEVycm9yLFwiYmlnXCI6XCIxXCIsXCJjZW50ZXJlZFwiOlwiMVwiLFwidGV4dFwiOl92bS5hbW91bnQgPiAwID8gX3ZtLmFtb3VudCA6IF92bS5jdXN0b21BbW91bnQsXCJwbGFjZWhvbGRlclwiOnBhcnNlRmxvYXQoMSkudG9GaXhlZChfdm0uZGVjaW1hbHMpfSxvbjp7XCJjaGFuZ2VkXCI6ZnVuY3Rpb24gKHgpIHsgcmV0dXJuIF92bS5jdXN0b21BbW91bnQgPSB4OyB9fX0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveGVzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94IG5lc3RlZCBhY2NvdW50LXNlbGVjdG9yXCIsb246e1wiY2xpY2tcIjpfdm0uc2VsZWN0VG9rZW5BbmRBY2NvdW50fX0sW19jKCdzZWN0aW9uJyxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmFtZVwifSxbX3ZtLl92KFwiU2VsZWN0IEFjY291bnRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcIm5ldHdvcmtcIn0sW192bS5fdihfdm0uX3MoX3ZtLm5ldHdvcmsubmFtZSkpXSldKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCJ9KV0pXSldLDEpXSk6X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhZGRlZFwifSxbX2MoJ2JyJyksX3ZtLl92KFwiIFwiKSxfYygnYnInKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ0cmFuc2Zlci1kZXRhaWxzXCJ9LFsoX3ZtLmFtb3VudCA+IDApP19jKCdkaXYnLFtfdm0uX3YoX3ZtLl9zKHBhcnNlRmxvYXQoX3ZtLmFtb3VudCkudG9GaXhlZChfdm0uZGVjaW1hbHMpKStcIiBcIitfdm0uX3MoX3ZtLnRva2VuLnN5bWJvbCkpXSk6X2MoJ2RpdicsW192bS5fdihfdm0uX3MoX3ZtLmN1c3RvbUFtb3VudCkrXCIgXCIrX3ZtLl9zKF92bS50b2tlbi5zeW1ib2wpKV0pLF92bS5fdihcIiBcIiksX2MoJ3NwYW4nLHtjbGFzczp7J3NtYWxsJzpfdm0udG8ubGVuZ3RoID4gMTJ9fSxbX3ZtLl92KF92bS5fcyhfdm0udG8pKV0pXSksX3ZtLl92KFwiIFwiKSwoX3ZtLm1lbW8gJiYgX3ZtLm1lbW8ubGVuZ3RoKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwibWVtb1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImluZm8tbGluZVwifSxbX2MoJ3NwYW4nLFtfdm0uX3YoX3ZtLl9zKF92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuTWVtbykpKV0pXSksX3ZtLl92KFwiIFwiKSxfYygnc3BhbicsW192bS5fdihfdm0uX3MoX3ZtLm1lbW8pKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfdm0uX20oMCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiYm94ZXNcIn0sW19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3ggbmVzdGVkIGFjY291bnQtc2VsZWN0b3JcIixvbjp7XCJjbGlja1wiOl92bS5zZWxlY3RUb2tlbkFuZEFjY291bnR9fSxbX2MoJ3NlY3Rpb24nLFtfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfdm0uX3YoX3ZtLl9zKF92bS5hY2NvdW50LnNlbmRhYmxlKCkpKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwibmV0d29ya1wifSxbX3ZtLl92KF92bS5fcyhfdm0ubmV0d29yay5uYW1lKSldKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY2hldnJvbiBmYXMgZmEtY2FyZXQtc3F1YXJlLWRvd25cIn0pXSldKSxfdm0uX3YoXCIgXCIpLCghX3ZtLnBpbm5pbmcpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJmaXhlZC1hY3Rpb25zXCJ9LFtfYygnQnV0dG9uJyx7YXR0cnM6e1wiYmx1ZVwiOlwiMVwiLFwidGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuQ29uZmlybSl9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdCh0cnVlKX19fSksX3ZtLl92KFwiIFwiKSxfYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuRGVueSl9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLnJldHVyblJlc3VsdChudWxsKX19fSldLDEpOl92bS5fZSgpXSldLDEpfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJpbmZvLWxpbmVcIn0sW19jKCdzcGFuJyxbX3ZtLl92KFwiRnJvbVwiKV0pXSl9XVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwb3BvdXQtd2luZG93IHRyYW5zZmVyXCI+XHJcbiAgICAgICAgPFBvcE91dEFwcCA6YXBwPVwicG9wdXAuZGF0YS5wcm9wcy5hcHBEYXRhXCIgc3VmZml4PVwiaXMgcmVxdWVzdGluZyBhIHRyYW5zZmVyXCIgLz5cclxuXHJcbiAgICAgICAgPHNlY3Rpb24gdi1pZj1cIiFhY2NvdW50XCI+XHJcblxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwYWRkZWRcIj5cclxuICAgICAgICAgICAgICAgIDxJbnB1dCA6ZGlzYWJsZWQ9XCJhbW91bnQgPiAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgOnJlZD1cImlucHV0RXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICBiaWc9XCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgY2VudGVyZWQ9XCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJhbW91bnQgPiAwID8gYW1vdW50IDogY3VzdG9tQW1vdW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgdi1vbjpjaGFuZ2VkPVwieCA9PiBjdXN0b21BbW91bnQgPSB4XCJcclxuICAgICAgICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwicGFyc2VGbG9hdCgxKS50b0ZpeGVkKGRlY2ltYWxzKVwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJib3hlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZCBhY2NvdW50LXNlbGVjdG9yXCIgQGNsaWNrPVwic2VsZWN0VG9rZW5BbmRBY2NvdW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm5hbWVcIj5TZWxlY3QgQWNjb3VudDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm5ldHdvcmtcIj57e25ldHdvcmsubmFtZX19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCI+PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGFkZGVkXCIgdi1lbHNlPlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ0cmFuc2Zlci1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJhbW91bnQgPiAwXCI+e3twYXJzZUZsb2F0KGFtb3VudCkudG9GaXhlZChkZWNpbWFscyl9fSB7e3Rva2VuLnN5bWJvbH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHYtZWxzZT57e2N1c3RvbUFtb3VudH19IHt7dG9rZW4uc3ltYm9sfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIDpjbGFzcz1cInsnc21hbGwnOnRvLmxlbmd0aCA+IDEyfVwiPnt7dG99fTwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtZW1vXCIgdi1pZj1cIm1lbW8gJiYgbWVtby5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiaW5mby1saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5NZW1vKX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e3ttZW1vfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJpbmZvLWxpbmVcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPkZyb208L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94ZXNcIj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYm94IG5lc3RlZCBhY2NvdW50LXNlbGVjdG9yXCIgQGNsaWNrPVwic2VsZWN0VG9rZW5BbmRBY2NvdW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJuYW1lXCI+e3thY2NvdW50LnNlbmRhYmxlKCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwibmV0d29ya1wiPnt7bmV0d29yay5uYW1lfX08L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNoZXZyb24gZmFzIGZhLWNhcmV0LXNxdWFyZS1kb3duXCI+PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZml4ZWQtYWN0aW9uc1wiIHYtaWY9XCIhcGlubmluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBibHVlPVwiMVwiIDp0ZXh0PVwibG9jYWxlKGxhbmdLZXlzLkdFTkVSSUMuQ29uZmlybSlcIiBAY2xpY2submF0aXZlPVwicmV0dXJuUmVzdWx0KHRydWUpXCIgLz5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gOnRleHQ9XCJsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5EZW55KVwiIEBjbGljay5uYXRpdmU9XCJyZXR1cm5SZXN1bHQobnVsbClcIiAvPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHsgbWFwQWN0aW9ucywgbWFwR2V0dGVycywgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cdGltcG9ydCBQb3BPdXRBcHAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcCc7XHJcblx0Ly8gaW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JldXNhYmxlL1NlYXJjaEJhcic7XHJcblx0aW1wb3J0IHtJZGVudGl0eVJlcXVpcmVkRmllbGRzfSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvSWRlbnRpdHlcIjtcclxuXHRpbXBvcnQgTmV0d29yayBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvTmV0d29ya1wiO1xyXG5cdGltcG9ydCBSZXF1aXJlZEZpZWxkcyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzXCI7XHJcblx0aW1wb3J0IEtleVBhaXJTZXJ2aWNlIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3NlcnZpY2VzL3NlY3VyZS9LZXlQYWlyU2VydmljZVwiO1xyXG5cdGltcG9ydCBLZXlwYWlyIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9LZXlwYWlyXCI7XHJcblx0aW1wb3J0IElkR2VuZXJhdG9yIGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL3V0aWwvSWRHZW5lcmF0b3JcIjtcclxuXHRpbXBvcnQgVG9rZW4gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL1Rva2VuXCI7XHJcblx0aW1wb3J0IHtCbG9ja2NoYWluc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCI7XHJcblx0aW1wb3J0IFRva2VuU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy91dGlsaXR5L1Rva2VuU2VydmljZVwiO1xyXG5cdGltcG9ydCBQb3B1cFNlcnZpY2UgZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3V0aWxpdHkvUG9wdXBTZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4uLy4uL21vZGVscy9wb3B1cHMvUG9wdXBcIjtcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wydwb3B1cCcsICdleHBhbmRlZCcsICdwaW5uaW5nJ10sXHJcblx0XHRjb21wb25lbnRzOntcclxuXHRcdFx0UmVxdWlyZWRGaWVsZHMsXHJcblx0XHRcdFBvcE91dEFwcCxcclxuXHRcdFx0Ly8gU2VhcmNoQmFyLFxyXG5cdFx0fSxcclxuXHRcdGRhdGEgKCkge3JldHVybiB7XHJcblx0XHRcdHNlYXJjaFRlcm1zOicnLFxyXG4gICAgICAgICAgICBhY2NvdW50Om51bGwsXHJcblx0XHRcdGN1c3RvbUFtb3VudDowLFxyXG5cdFx0XHRpbnB1dEVycm9yOmZhbHNlLFxyXG5cdFx0fX0sXHJcblx0XHRjcmVhdGVkKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQW1vdW50ID0gcGFyc2VGbG9hdCgwKS50b0ZpeGVkKHRoaXMuZGVjaW1hbHMpO1xyXG5cdFx0fSxcclxuXHRcdGNvbXB1dGVkOiB7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnc2NhdHRlcidcclxuXHRcdFx0XSksXHJcblx0XHRcdC4uLm1hcEdldHRlcnMoW1xyXG5cdFx0XHRcdCdpZGVudGl0eScsXHJcblx0XHRcdFx0J2lkZW50aXRpZXMnLFxyXG5cdFx0XHRcdCdhY2NvdW50cycsXHJcblx0XHRcdFx0J25ldHdvcmtzJyxcclxuXHRcdFx0XHQna2V5cGFpcnMnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0cGF5bG9hZCgpeyByZXR1cm4gdGhpcy5wb3B1cC5wYXlsb2FkKCk7IH0sXHJcblx0XHRcdG5ldHdvcmsoKXsgcmV0dXJuIHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgudW5pcXVlKCkgPT09IE5ldHdvcmsuZnJvbUpzb24odGhpcy5wYXlsb2FkLm5ldHdvcmspLnVuaXF1ZSgpKTsgfSxcclxuICAgICAgICAgICAgYmxvY2tjaGFpbigpeyByZXR1cm4gdGhpcy5uZXR3b3JrLmJsb2NrY2hhaW47IH0sXHJcblx0XHRcdHRvKCl7IHJldHVybiB0aGlzLnBheWxvYWQudG87IH0sXHJcblx0XHRcdGFtb3VudCgpeyByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLnBheWxvYWQuYW1vdW50KS50b0ZpeGVkKHRoaXMuZGVjaW1hbHMpOyB9LFxyXG5cdFx0XHRvcHRpb25zKCl7IHJldHVybiB0aGlzLnBheWxvYWQub3B0aW9ucyB8fCB7fTsgfSxcclxuXHRcdFx0bWVtbygpeyByZXR1cm4gdGhpcy5wYXlsb2FkLm1lbW87IH0sXHJcblx0XHRcdGRlY2ltYWxzKCl7IHJldHVybiB0aGlzLm9wdGlvbnMuZGVjaW1hbHMgfHwgNDsgfSxcclxuICAgICAgICAgICAgdG9rZW4oKXtcclxuXHRcdFx0ICAgIHJldHVybiBUb2tlbi5mcm9tSnNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJhY3Q6dGhpcy5wYXlsb2FkLmNvbnRyYWN0LFxyXG5cdFx0XHRcdCAgICBibG9ja2NoYWluOnRoaXMuYmxvY2tjaGFpbixcclxuXHRcdFx0XHQgICAgc3ltYm9sOnRoaXMucGF5bG9hZC5zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6dGhpcy5vcHRpb25zLmRlY2ltYWxzIHx8IFBsdWdpblJlcG9zaXRvcnkucGx1Z2luKHRoaXMuYmxvY2tjaGFpbikuZGVmYXVsdERlY2ltYWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTp0aGlzLnBheWxvYWQuc3ltYm9sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG5cdFx0XHR2YWxpZEFjY291bnRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWNjb3VudHNcclxuXHRcdFx0XHRcdC5maWx0ZXIoeCA9PiBbdGhpcy5uZXR3b3JrLnVuaXF1ZSgpXS5pbmNsdWRlcyh4Lm5ldHdvcmtVbmlxdWUpKVxyXG5cdFx0XHRcdFx0LmZpbHRlcih4ID0+IFt0aGlzLm5ldHdvcmsuYmxvY2tjaGFpbl0uaW5jbHVkZXMoeC5ibG9ja2NoYWluKCkudG9Mb3dlckNhc2UoKSkpXHJcblx0XHRcdFx0XHQuZmlsdGVyKGlkID0+IEpTT04uc3RyaW5naWZ5KGlkKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXJtcy50b0xvd2VyQ2FzZSgpKSA+IC0xKVxyXG5cdFx0XHRcdFx0LnJlZHVjZSgoYWNjLCBhY2NvdW50KSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmKCFhY2MuZmluZCh4ID0+IGFjY291bnQubmV0d29yaygpLnVuaXF1ZSgpID09PSB4Lm5ldHdvcmsoKS51bmlxdWUoKVxyXG5cdFx0XHRcdFx0XHRcdCYmIGFjY291bnQuc2VuZGFibGUoKSA9PT0geC5zZW5kYWJsZSgpKSkgYWNjLnB1c2goYWNjb3VudCk7XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0XHRcdFx0fSwgW10pXHJcblx0XHRcdH0sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQWNjb3VudHMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdGhpcy5hY2NvdW50XVxyXG5cdCAgICAgICAgICAgICAgICAubWFwKHggPT4gdGhpcy5mb3JtYXRBY2NvdW50KHgsIGZhbHNlKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3VycmVudEFtb3VudCgpe1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmFtb3VudCA+IDAgPyB0aGlzLmFtb3VudCA6IHRoaXMuY3VzdG9tQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQocmVzdWx0KXtcclxuXHRcdFx0XHRpZighcmVzdWx0KSByZXR1cm4gdGhpcy4kZW1pdCgncmV0dXJuZWQnLCBudWxsKTtcclxuXHJcblx0XHRcdFx0bGV0IGFtb3VudCA9IHRoaXMuY3VycmVudEFtb3VudDtcclxuXHRcdFx0XHRpZih0aGlzLmJsb2NrY2hhaW4gPT09IEJsb2NrY2hhaW5zLkVPU0lPKXtcclxuXHRcdFx0XHRcdGFtb3VudCA9IHBhcnNlRmxvYXQoYW1vdW50KS50b0ZpeGVkKHRoaXMuZGVjaW1hbHMpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbW91bnQgPSBUb2tlblNlcnZpY2UuZm9ybWF0QW1vdW50KGFtb3VudCwgdGhpcy50b2tlbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuJGVtaXQoJ3JldHVybmVkJywge1xyXG5cdFx0XHRcdFx0YWNjb3VudDp0aGlzLmFjY291bnQsXHJcblx0XHRcdFx0XHRhbW91bnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0VG9rZW5BbmRBY2NvdW50KCl7XHJcblx0XHRcdFx0UG9wdXBTZXJ2aWNlLnB1c2goUG9wdXAuc2VsZWN0QWNjb3VudChhY2NvdW50ID0+IHtcclxuXHRcdFx0XHRcdGlmKCFhY2NvdW50KSByZXR1cm47XHJcblx0XHRcdFx0XHR0aGlzLmFjY291bnQgPSBhY2NvdW50O1xyXG5cdFx0XHRcdH0sIHRoaXMudmFsaWRBY2NvdW50cykpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdEFjY291bnQoYWNjb3VudCl7XHJcblx0XHRcdFx0dGhpcy5pbnB1dEVycm9yID0gZmFsc2U7XHJcblx0XHRcdFx0aWYoYWNjb3VudCAmJiB0aGlzLmN1cnJlbnRBbW91bnQgPD0gMClcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmlucHV0RXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XHJcblx0XHRcdH0sXHJcbiAgICAgICAgICAgIGZvcm1hdEFjY291bnQoYWNjb3VudCwgc2VsZWN0ID0gdHJ1ZSl7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHtcclxuXHRcdCAgICAgICAgICAgIHRpdGxlOmFjY291bnQuc2VuZGFibGUoKSxcclxuXHRcdCAgICAgICAgICAgIGRlc2NyaXB0aW9uOmBgLFxyXG5cdFx0ICAgICAgICAgICAgYWN0aW9uczpbe1xyXG5cdFx0XHQgICAgICAgICAgICBuYW1lOnNlbGVjdFxyXG5cdFx0XHRcdFx0XHRcdD8gdGhpcy5sb2NhbGUodGhpcy5sYW5nS2V5cy5HRU5FUklDLlNlbGVjdClcclxuXHRcdFx0XHRcdFx0XHQ6IHRoaXMubG9jYWxlKHRoaXMubGFuZ0tleXMuR0VORVJJQy5VbnNlbGVjdCksXHJcblx0XHRcdCAgICAgICAgICAgIGhhbmRsZXI6KCkgPT4gdGhpcy5zZWxlY3RBY2NvdW50KHNlbGVjdCA/IGFjY291bnQgOiBudWxsKSxcclxuXHRcdFx0ICAgICAgICAgICAgYmx1ZTpzZWxlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZDohc2VsZWN0LFxyXG5cdFx0XHQgICAgICAgICAgICBzbWFsbDoxLFxyXG5cdFx0ICAgICAgICAgICAgfV1cclxuXHQgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0sXHJcbiAgICAgICAgd2F0Y2g6e1xyXG5cdFx0XHRbJ2N1c3RvbUFtb3VudCddKCl7XHJcblx0XHRcdFx0dGhpcy5pbnB1dEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuICAgIEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG4gICAgLmFwcC1kZXRhaWxzIHtcclxuICAgICAgICBwYWRkaW5nOjUwcHggNTBweCAyMHB4IDUwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJveGVzIHtcclxuICAgICAgICB3aWR0aDoxMDAlO1xyXG5cclxuICAgICAgICAuYm94IHtcclxuICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAubWVtbyB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcblxyXG4gICAgICAgID4gc3BhbiB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgY29sb3I6ICRibHVlO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnBhZGRlZCB7XHJcbiAgICAgICAgcGFkZGluZzowIDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRyYW5zZmVyLWRldGFpbHMge1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXYge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYmx1ZSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkYmx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zbWFsbCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5ib2xkIHtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnBvcG91dC1saXN0IHtcclxuICAgICAgICBwYWRkaW5nLXRvcDowO1xyXG5cclxuICAgICAgICAmLmRvbmUge1xyXG4gICAgICAgICAgICBvcGFjaXR5OjAuMztcclxuXHJcbiAgICAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eToxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLnNlYXJjaC1iYXIge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDotMzBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZjIxNTY0ZTImc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9UcmFuc2ZlclJlcXVlc3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjIxNTY0ZTImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiZjIxNTY0ZTJcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFwcC1kZXRhaWxzXCJ9LFsoIV92bS51bnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ29cIixjbGFzczp7J2JvcmRlcic6X3ZtLmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIV92bS5hcHAuaW1nfX0sWyhfdm0uYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJyk/X2MoJ1NjYXR0ZXInKTooX3ZtLmFwcC5pbWcpP19jKCdpbWcnLHthdHRyczp7XCJzcmNcIjpfdm0uYXBwLmltZ319KTpfYygnc3BhbicsW192bS5fdihcIk5vIEltYWdlXCIpXSldLDEpOl9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ28gc2NhbVwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tYXR0ZW50aW9uXCJ9KV0pLF92bS5fdihcIiBcIiksKF92bS5yaWRsRW5hYmxlZCAmJiBfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyk/X2MoJ3NlY3Rpb24nLFsoX3ZtLmFwcFJlcHV0YXRpb24gPT09IGZhbHNlKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pLF92bS5fdihcIiBsb2FkaW5nIHJlcHV0YXRpb25cIildKTpfYygnc2VjdGlvbicsWyhfdm0udW5rbm93blJlcHV0YXRpb24pP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW192bS5fdihcIlVua25vd24gUmVwdXRhdGlvblwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHRydXN0ZWRcIn0sW192bS5fdihcIlRydXN0d29ydGh5XCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvbiB1bnRydXN0ZWRcIn0sW192bS5fdihcIktub3duIFNjYW1cIildKTpfdm0uX2UoKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfYygnYicsW192bS5fdihfdm0uX3MoX3ZtLmFwcC5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLChfdm0uc3VmZml4KT9fYygnc3BhbicsW192bS5fdihfdm0uX3MoX3ZtLnN1ZmZpeCkpXSk6X3ZtLl9lKCldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tIEFQUCBERVRBSUxTIC0tLS0tLS0tLS0tLT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJhcHAtZGV0YWlsc1wiPlxyXG5cdFx0PGZpZ3VyZSBjbGFzcz1cImxvZ29cIiB2LWlmPVwiIXVudHJ1c3RlZFwiIDpjbGFzcz1cInsnYm9yZGVyJzphcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInICYmICFhcHAuaW1nfVwiPlxyXG5cdFx0XHQ8U2NhdHRlciB2LWlmPVwiYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJ1wiIC8+XHJcblx0XHRcdDxpbWcgdi1lbHNlLWlmPVwiYXBwLmltZ1wiIDpzcmM9XCJhcHAuaW1nXCIgLz5cclxuXHRcdFx0PHNwYW4gdi1lbHNlPk5vIEltYWdlPC9zcGFuPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nbyBzY2FtXCIgdi1lbHNlPlxyXG5cdFx0XHQ8aSBjbGFzcz1cImljb24tYXR0ZW50aW9uXCI+PC9pPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8c2VjdGlvbiB2LWlmPVwicmlkbEVuYWJsZWQgJiYgYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJ1wiPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJhcHBSZXB1dGF0aW9uID09PSBmYWxzZVwiPjxpIGNsYXNzPVwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIj48L2k+IGxvYWRpbmcgcmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHQ8c2VjdGlvbiB2LWVsc2U+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb25cIiB2LWlmPVwidW5rbm93blJlcHV0YXRpb25cIj5Vbmtub3duIFJlcHV0YXRpb248L2ZpZ3VyZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvbiB0cnVzdGVkXCIgdi1pZj1cInRydXN0ZWRcIj5UcnVzdHdvcnRoeTwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwiIHYtaWY9XCJ1bnRydXN0ZWRcIj5Lbm93biBTY2FtPC9maWd1cmU+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPjxiPnt7YXBwLm5hbWV9fTwvYj4gPHNwYW4gdi1pZj1cInN1ZmZpeFwiPnt7c3VmZml4fX08L3NwYW4+PC9maWd1cmU+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQge21hcFN0YXRlLCBtYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQgU2NhdHRlciBmcm9tICcuLi9zdmdzL1NjYXR0ZXJPdXRsaW5lJ1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOntTY2F0dGVyfSxcclxuXHRcdHByb3BzOlsnYXBwJywgJ3N1ZmZpeCddLFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J2FwcFJlcHV0YXRpb24nXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQncmlkbEVuYWJsZWQnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0dW5rbm93blJlcHV0YXRpb24oKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uID09PSB1bmRlZmluZWQ7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpID4gMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR1bnRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpIDwgMFxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LnJlcHV0YXRpb24ge1xyXG5cdFx0cGFkZGluZzo1cHggMTJweDtcclxuXHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0bWFyZ2luLWJvdHRvbToxMHB4O1xyXG5cdFx0bWFyZ2luLXRvcDotNXB4O1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRiYWNrZ3JvdW5kOiRsaWdodGVyZ3JleTtcclxuXHRcdGNvbG9yOiRncmV5O1xyXG5cclxuXHRcdCYudHJ1c3RlZCB7XHJcblx0XHRcdGJhY2tncm91bmQ6JGRhcmtncmVlbjtcclxuXHRcdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdCYudW50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokcmVkO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQuYXBwLWRldGFpbHMge1xyXG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XHJcblx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuXHRcdCRsb2dvOjEwMHB4O1xyXG5cdFx0LmxvZ28ge1xyXG5cdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHRoZWlnaHQ6JGxvZ287XHJcblx0XHRcdHdpZHRoOiRsb2dvO1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiRyYWRpdXM7XHJcblx0XHRcdHBhZGRpbmc6NXB4O1xyXG5cdFx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblxyXG5cdFx0XHQmLmJvcmRlciB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW1nIHtcclxuXHRcdFx0XHRoZWlnaHQ6MTAwJTtcclxuXHRcdFx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzcGFuIHtcclxuXHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRjb2xvcjokc2lsdmVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQmLnNjYW0ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogNDhweDtcclxuXHRcdFx0XHRib3JkZXItcmFkaXVzOjUwJTtcclxuXHRcdFx0XHRjb2xvcjokcmVkO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICRsaWdodGVyZ3JleTtcclxuXHRcdFx0XHRib3JkZXI6MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblxyXG5cdFx0XHRcdGFuaW1hdGlvbjogcHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQubmFtZSB7XHJcblx0XHRcdGZvbnQtc2l6ZTogJGxhcmdlO1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMjRhZTA2YWNcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjY2YmI3Yzc4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yNGFlMDZhYyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjViM2EzMGQ1XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5maWVsZHMtdGl0bGVbZGF0YS12LTBhMjlhM2ZkXXttYXJnaW46LTIwcHggLTMwcHggMDtwYWRkaW5nOjIwcHggMzBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwMDdmZDcgMCUsICMwNzk5ZmYgMTAwJSk7Y29sb3I6I2ZmZjtmb250LXNpemU6MThweDttYXJnaW4tYm90dG9tOjIwcHh9LnJlcXVpcmVkLWZpZWxkc1tkYXRhLXYtMGEyOWEzZmRde3BhZGRpbmc6MjBweCAwIDB9XFxuXCIsIFwiXCJdKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnJlcHV0YXRpb25bZGF0YS12LTI0YWUwNmFjXXtwYWRkaW5nOjVweCAxMnB4O2ZvbnQtc2l6ZToxMHB4O21hcmdpbi1ib3R0b206MTBweDttYXJnaW4tdG9wOi01cHg7Zm9udC13ZWlnaHQ6Ym9sZDtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Y29sb3I6I2M4YzhjOH0ucmVwdXRhdGlvbi50cnVzdGVkW2RhdGEtdi0yNGFlMDZhY117YmFja2dyb3VuZDojMTU5RjAwO2NvbG9yOiNmZmZ9LnJlcHV0YXRpb24udW50cnVzdGVkW2RhdGEtdi0yNGFlMDZhY117YmFja2dyb3VuZDojZmYwNzA3O2NvbG9yOiNmZmZ9LmFwcC1kZXRhaWxzW2RhdGEtdi0yNGFlMDZhY117dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYXBwLWRldGFpbHMgLmxvZ29bZGF0YS12LTI0YWUwNmFjXXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7aGVpZ2h0OjEwMHB4O3dpZHRoOjEwMHB4O2JvcmRlci1yYWRpdXM6MDtwYWRkaW5nOjVweDttYXJnaW4tYm90dG9tOjIwcHh9LmFwcC1kZXRhaWxzIC5sb2dvLmJvcmRlcltkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTF9LmFwcC1kZXRhaWxzIC5sb2dvIGltZ1tkYXRhLXYtMjRhZTA2YWNde2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmFwcC1kZXRhaWxzIC5sb2dvIHNwYW5bZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDpib2xkO2NvbG9yOiM3YTdhN2F9LmFwcC1kZXRhaWxzIC5sb2dvLnNjYW1bZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6NDhweDtib3JkZXItcmFkaXVzOjUwJTtjb2xvcjojZmYwNzA3O2JhY2tncm91bmQ6I2YzZjZmNztib3JkZXI6MXB4IHNvbGlkICNkZmUwZTE7YW5pbWF0aW9uOnB1bHNhdGUgMC41cyBlYXNlIGluZmluaXRlfS5hcHAtZGV0YWlscyAubmFtZVtkYXRhLXYtMjRhZTA2YWNde2ZvbnQtc2l6ZToxNHB4fVxcblwiLCBcIlwiXSk7XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicmVxdWlyZWQtZmllbGRzXCJ9LFtfYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwiZmllbGRzLXRpdGxlXCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRSZXF1aXJlZCBJZGVudGl0eSBGaWVsZHNcXG5cXHRcIildKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyxbX2MoJ2xhYmVsJyxbX3ZtLl92KFwiUGVyc29uYWwgaW5mb3JtYXRpb246XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0XCJ9LFtfdm0uX3YoXCJcXG5cXHRcXHRcXHRcIitfdm0uX3MoX3ZtLmlkZW50aXR5UmVxdWlyZW1lbnRzKStcIlxcblxcdFxcdFwiKV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxyXG5cdDxzZWN0aW9uIGNsYXNzPVwicmVxdWlyZWQtZmllbGRzXCI+XHJcblxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJmaWVsZHMtdGl0bGVcIj5cclxuXHRcdFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXHJcblx0XHQ8L3NlY3Rpb24+XHJcblxyXG5cdFx0PHNlY3Rpb24+XHJcblx0XHRcdDxsYWJlbD5QZXJzb25hbCBpbmZvcm1hdGlvbjo8L2xhYmVsPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwidGV4dFwiPlxyXG5cdFx0XHRcdHt7aWRlbnRpdHlSZXF1aXJlbWVudHN9fVxyXG5cdFx0XHQ8L2ZpZ3VyZT5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHQ8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMsIG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6WydmaWVsZHMnLCAnaWRlbnRpdHknLCAnc2VsZWN0ZWRJZGVudGl0eScsICdzZWxlY3RlZExvY2F0aW9uJywgJ2Nsb25lZExvY2F0aW9uJ10sXHJcblxyXG5cdFx0ZGF0YSgpe3JldHVybiB7XHJcblxyXG5cdFx0fX0sXHJcblx0XHRjb21wdXRlZDp7XHJcblxyXG5cdFx0XHRpZGVudGl0eVJlcXVpcmVtZW50cygpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wZXJzb25hbEZpZWxkcy5jb25jYXQodGhpcy5sb2NhdGlvbkZpZWxkcykuam9pbignLCAnKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBlcnNvbmFsRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLnBlcnNvbmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb2NhdGlvbkZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5sb2NhdGlvbjtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHJcblx0XHRcdGZpZWxkVmFsdWVGb3IoZmllbGQsIHVzZVVuY2xvbmVkSWRlbnRpdHkgPSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIHVzZVVuY2xvbmVkSWRlbnRpdHlcclxuXHRcdFx0XHRcdD8gdGhpcy5pZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLnNlbGVjdGVkTG9jYXRpb24pXHJcblx0XHRcdFx0XHQ6IHRoaXMuc2VsZWN0ZWRJZGVudGl0eS5nZXRQcm9wZXJ0eVZhbHVlQnlOYW1lKGZpZWxkLCB0aGlzLmNsb25lZExvY2F0aW9uKTtcclxuXHRcdFx0fSxcclxuXHRcdH1cclxuXHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuXHRAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlc1wiO1xyXG5cclxuXHQuZmllbGRzLXRpdGxlIHtcclxuXHRcdG1hcmdpbjotMjBweCAtMzBweCAwO1xyXG5cdFx0cGFkZGluZzoyMHB4IDMwcHg7XHJcblx0XHRiYWNrZ3JvdW5kOiRibHVlLWdyYWRpZW50O1xyXG5cdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0Zm9udC1zaXplOiAxOHB4O1xyXG5cclxuXHRcdG1hcmdpbi1ib3R0b206MjBweDtcclxuXHR9XHJcblxyXG5cdC5yZXF1aXJlZC1maWVsZHMge1xyXG5cdFx0cGFkZGluZzoyMHB4IDAgMDtcclxuXHR9XHJcblxyXG48L3N0eWxlPiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwYTI5YTNmZFwiLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZzo1MHB4IDUwcHggMjBweCA1MHB4fS5ib3hlc1tkYXRhLXYtZjIxNTY0ZTJde3dpZHRoOjEwMCV9LmJveGVzIC5ib3hbZGF0YS12LWYyMTU2NGUyXXt3aWR0aDoxMDAlfS5tZW1vW2RhdGEtdi1mMjE1NjRlMl17dGV4dC1hbGlnbjpjZW50ZXJ9Lm1lbW8+c3BhbltkYXRhLXYtZjIxNTY0ZTJde2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiMwNzk5ZmY7Zm9udC13ZWlnaHQ6Ym9sZH0ucGFkZGVkW2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZzowIDMwcHh9LnRyYW5zZmVyLWRldGFpbHNbZGF0YS12LWYyMTU2NGUyXXt0ZXh0LWFsaWduOmNlbnRlcn0udHJhbnNmZXItZGV0YWlscyBzcGFuW2RhdGEtdi1mMjE1NjRlMl17ZGlzcGxheTpibG9jaztmb250LXNpemU6MjJweH0udHJhbnNmZXItZGV0YWlscyBkaXZbZGF0YS12LWYyMTU2NGUyXXtmb250LXNpemU6MzZweH0udHJhbnNmZXItZGV0YWlscyAuYmx1ZVtkYXRhLXYtZjIxNTY0ZTJde2NvbG9yOiMwNzk5ZmZ9LnRyYW5zZmVyLWRldGFpbHMgLnNtYWxsW2RhdGEtdi1mMjE1NjRlMl17Zm9udC1zaXplOjEzcHh9LnRyYW5zZmVyLWRldGFpbHMgLmJvbGRbZGF0YS12LWYyMTU2NGUyXXtmb250LXdlaWdodDo4MDB9LnBvcG91dC1saXN0W2RhdGEtdi1mMjE1NjRlMl17cGFkZGluZy10b3A6MH0ucG9wb3V0LWxpc3QuZG9uZVtkYXRhLXYtZjIxNTY0ZTJde29wYWNpdHk6MC4zfS5wb3BvdXQtbGlzdC5kb25lW2RhdGEtdi1mMjE1NjRlMl06aG92ZXJ7b3BhY2l0eToxfS5wb3BvdXQtbGlzdCAuc2VhcmNoLWJhcltkYXRhLXYtZjIxNTY0ZTJde21hcmdpbi1sZWZ0Oi0zMHB4fVxcblwiLCBcIlwiXSk7XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3N2Zycse2F0dHJzOntcIndpZHRoXCI6XCI4OHB4XCIsXCJoZWlnaHRcIjpcIjg4cHhcIixcInZpZXdCb3hcIjpcIjAgMCA4OCA4OFwiLFwidmVyc2lvblwiOlwiMS4xXCIsXCJ4bWxuc1wiOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInhtbG5zOnhsaW5rXCI6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwid2VsY29tZV9zY2F0dGVyXCIsXCJzdHJva2VcIjpcIm5vbmVcIixcInN0cm9rZS13aWR0aFwiOlwiMVwiLFwiZmlsbFwiOlwibm9uZVwiLFwiZmlsbC1ydWxlXCI6XCJldmVub2RkXCIsXCJzdHJva2UtbGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZS1saW5lam9pblwiOlwicm91bmRcIn19LFtfYygnZycse2F0dHJzOntcImlkXCI6XCJHcm91cFwiLFwic3Ryb2tlXCI6XCIjMDBBOEZGXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwiSWNvblwifX0sW19jKCdjaXJjbGUnLHthdHRyczp7XCJpZFwiOlwiQmFzZVwiLFwiY3hcIjpcIjQ0XCIsXCJjeVwiOlwiNDRcIixcInJcIjpcIjQzLjcwNzk2NDZcIn19KV0pLF92bS5fdihcIiBcIiksX2MoJ3BhdGgnLHthdHRyczp7XCJkXCI6XCJNNDAuODE4ODU1OSw3MS41OTMyMjAzIEMzOS4zMDQwMTc4LDcxLjU5MzIyMDMgMzguMDQ1NTU1OSw3MS40MjMxNTMgMzcuMDQzNDMyMiw3MS4wODMwMTMxIEMzNi4wNDEzMDg1LDcwLjc0Mjg3MzIgMzUuMjQ4OTQzNiw3MC4zNjE2ODc3IDM0LjY2NjMxMzYsNjkuOTM5NDQ1MSBDMzQuMDgzNjgzNSw2OS41MTcyMDI1IDMzLjY3NTg0ODYsNjkuMTEyNTU5NCAzMy40NDI3OTY2LDY4LjcyNTUwMzcgQzMzLjIwOTc0NDYsNjguMzM4NDQ4IDMzLjA5MzIyMDMsNjguMDg2Mjc5MSAzMy4wOTMyMjAzLDY3Ljk2ODk4OTUgQzMzLjA5MzIyMDMsNjcuNTQ2NzQ2OSAzMy4xODY0Mzk3LDY3LjA5NTE4ODcgMzMuMzcyODgxNCw2Ni42MTQzMDEzIEMzMy41NTkzMjMsNjYuMTMzNDEzOSAzMy43OTIzNzE1LDY1LjY4NzcyIDM0LjA3MjAzMzksNjUuMjc3MjA2NCBDMzQuMzUxNjk2Myw2NC44NjY2OTI4IDM0LjY1NDY1OTQsNjQuNTIwNjkzNiAzNC45ODA5MzIyLDY0LjIzOTE5ODUgQzM1LjMwNzIwNSw2My45NTc3MDM1IDM1LjU5ODUxNTcsNjMuODE2OTU4IDM1Ljg1NDg3MjksNjMuODE2OTU4IEMzNi4xODExNDU3LDYzLjgxNjk1OCAzNi40NDkxNTE1LDY0LjAyODA3NjIgMzYuNjU4ODk4Myw2NC40NTAzMTg4IEwzNy4wMDg0NzQ2LDY0LjgwMjE4NTggQzM3LjE5NDkxNjIsNjQuOTg5ODQ5MiAzNy40NTcwOTU4LDY1LjE4MzM3NDIgMzcuNzk1MDIxMiw2NS4zODI3NjY1IEMzOC4xMzI5NDY2LDY1LjU4MjE1ODggMzguNTUyNDMzOSw2NS43NjM5NTUgMzkuMDUzNDk1OCw2NS45MjgxNjA1IEMzOS41NTQ1NTc2LDY2LjA5MjM2NTkgNDAuMTQzMDA1MSw2Ni4xNzQ0Njc0IDQwLjgxODg1NTksNjYuMTc0NDY3NCBDNDIuMjg3MDgzNiw2Ni4xNzQ0Njc0IDQzLjQ4NzI4MzUsNjUuNzIyOTA5MiA0NC40MTk0OTE1LDY0LjgxOTc3OTIgQzQ1LjM1MTY5OTYsNjMuOTE2NjQ5MiA0NS44MTc3OTY2LDYyLjY5MDk5MTEgNDUuODE3Nzk2Niw2MS4xNDI3NjgzIEM0NS44MTc3OTY2LDYwLjA2MzcwMzkgNDUuNTY3MjY5NSw1OS4xMDE5NDM1IDQ1LjA2NjIwNzYsNTguMjU3NDU4MyBDNDQuNTY1MTQ1OCw1Ny40MTI5NzMxIDQzLjkwNjc4MzcsNTYuNjI3MTQ0NSA0My4wOTExMDE3LDU1Ljg5OTk0ODkgQzQyLjI3NTQxOTcsNTUuMTcyNzUzMyA0MS4zNDMyMjU2LDU0LjQ2MzE2MTggNDAuMjk0NDkxNSw1My43NzExNTMxIEMzOS4yNDU3NTc1LDUzLjA3OTE0NDQgMzguMTczNzM0Myw1Mi4zNTc4MjQxIDM3LjA3ODM4OTgsNTEuNjA3MTcwNiBDMzUuOTgzMDQ1NCw1MC44NTY1MTcxIDM0LjkxMTAyMjIsNTAuMDQ3MjMwOSAzMy44NjIyODgxLDQ5LjE3OTI4NzggQzMyLjgxMzU1NDEsNDguMzExMzQ0NyAzMS44ODEzNiw0Ny4zMTQzOTggMzEuMDY1Njc4LDQ2LjE4ODQxNzcgQzMwLjI0OTk5NTksNDUuMDYyNDM3NCAyOS41OTE2MzM5LDQzLjc4OTg2NDMgMjkuMDkwNTcyLDQyLjM3MDY2IEMyOC41ODk1MTAyLDQwLjk1MTQ1NTcgMjguMzM4OTgzMSwzOS4zMjcwMTg5IDI4LjMzODk4MzEsMzcuNDk3MzAxIEMyOC4zMzg5ODMxLDM1LjkyNTYyMDIgMjguNjA2OTg4OCwzNC4zNDIyMzQyIDI5LjE0MzAwODUsMzIuNzQ3MDk1NSBDMjkuNjc5MDI4MSwzMS4xNTE5NTY4IDMwLjQxODk1NzEsMjkuNjMzMDc5MiAzMS4zNjI4MTc4LDI4LjE5MDQxNyBDMzIuMzA2Njc4NCwyNi43NDc3NTQ3IDMzLjQxOTQ4NTEsMjUuMzk4OTQ0NSAzNC43MDEyNzEyLDI0LjE0Mzk0NTYgQzM1Ljk4MzA1NzMsMjIuODg4OTQ2OCAzNy4zNjk2OTU5LDIxLjc5ODE2OTggMzguODYxMjI4OCwyMC44NzE1ODE4IEM0MC4zNTI3NjE3LDE5Ljk0NDk5MzkgNDEuOTA4MzYwNSwxOS4yMTc4MDkyIDQzLjUyODA3MiwxOC42OTAwMDYgQzQ1LjE0Nzc4MzUsMTguMTYyMjAyOCA0Ni43NzMyOTY5LDE3Ljg5ODMwNTEgNDguNDA0NjYxLDE3Ljg5ODMwNTEgQzQ5LjgwMjk3MzEsMTcuODk4MzA1MSA1MS4wNjE0MzUxLDE4LjEyMTE1MiA1Mi4xODAwODQ3LDE4LjU2Njg1MjUgQzUzLjI5ODczNDQsMTkuMDEyNTUzIDU0LjI0MjU4MDksMTkuNjQwMDQzIDU1LjAxMTY1MjUsMjAuNDQ5MzQxNCBDNTUuNzgwNzI0MiwyMS4yNTg2Mzk3IDU2LjM3NDk5NzksMjIuMjMyMTI4OCA1Ni43OTQ0OTE1LDIzLjM2OTgzODEgQzU3LjIxMzk4NTEsMjQuNTA3NTQ3MyA1Ny40MjM3Mjg4LDI1Ljc4MDEyMDUgNTcuNDIzNzI4OCwyNy4xODc1OTU4IEM1Ny40MjM3Mjg4LDI4LjUyNDY5NzQgNTcuMTkwNjgwMywyOS44MzgzMjEzIDU2LjcyNDU3NjMsMzEuMTI4NTA3IEM1Ni4yNTg0NzIyLDMyLjQxODY5MjcgNTUuNjQwODkzNywzMy42Mzg0ODY0IDU0Ljg3MTgyMiwzNC43ODc5MjQ2IEM1NC4xMDI3NTA0LDM1LjkzNzM2MjcgNTMuMjM0NjQ0NywzNi45OTg4MTc4IDUyLjI2NzQ3ODgsMzcuOTcyMzIxNiBDNTEuMzAwMzEzLDM4Ljk0NTgyNTMgNTAuMzA5ODU2OCwzOS43OTAyOTc5IDQ5LjI5NjA4MDUsNDAuNTA1NzY0NSBDNDguMjgyMzA0Myw0MS4yMjEyMzExIDQ3LjI5NzY3NDMsNDEuNzc4MzQ4NCA0Ni4zNDIxNjEsNDIuMTc3MTMzMSBDNDUuMzg2NjQ3OCw0Mi41NzU5MTc4IDQ0LjU0NzY3MzEsNDIuNzc1MzA3MSA0My44MjUyMTE5LDQyLjc3NTMwNzEgQzQzLjE5NTk3MTQsNDIuNzc1MzA3MSA0Mi42MzA4Mjg4LDQyLjYyODY5NzMgNDIuMTI5NzY2OSw0Mi4zMzU0NzMzIEM0MS42Mjg3MDUxLDQyLjA0MjI0OTIgNDEuMjA5MjE3OCw0MS42Nzg2NTY5IDQwLjg3MTI5MjQsNDEuMjQ0Njg1MyBDNDAuNTMzMzY3LDQwLjgxMDcxMzggNDAuMjcxMTg3NCw0MC4zNTMyOTEyIDQwLjA4NDc0NTgsMzkuODcyNDAzOCBDMzkuODk4MzA0MiwzOS4zOTE1MTY0IDM5LjgwNTA4NDcsMzguOTYzNDE1NyAzOS44MDUwODQ3LDM4LjU4ODA4ODkgQzM5LjgwNTA4NDcsMzguMjgzMTM2IDM5Ljg0NTg2ODIsMzguMDgzNzQ2NiAzOS45Mjc0MzY0LDM3Ljk4OTkxNDkgQzQwLjAwOTAwNDYsMzcuODk2MDgzMiA0MC4xMjU1Mjg5LDM3Ljg1NTAzMjUgNDAuMjc3MDEyNywzNy44NjY3NjE0IEM0MC40Mjg0OTY1LDM3Ljg3ODQ5MDQgNDAuNjIwNzYxNSwzNy45MTM2NzY4IDQwLjg1MzgxMzYsMzcuOTcyMzIxNiBDNDEuMDg2ODY1NiwzOC4wMzA5NjY0IDQxLjM1NDg3MTQsMzguMDYwMjg4MyA0MS42NTc4MzksMzguMDYwMjg4MyBDNDIuNjM2NjU3NCwzOC4wNjAyODgzIDQzLjcyMDMzMywzNy43MjAxNTM2IDQ0LjkwODg5ODMsMzcuMDM5ODczOCBDNDYuMDk3NDYzNiwzNi4zNTk1OTQxIDQ3LjIxNjA5NjUsMzUuNDkxNjY0IDQ4LjI2NDgzMDUsMzQuNDM2MDU3NSBDNDkuMzEzNTY0NiwzMy4zODA0NTEgNTAuMTkzMzIyNywzMi4yMTkzMDEzIDUwLjkwNDEzMTQsMzAuOTUyNTczNSBDNTEuNjE0OTQsMjkuNjg1ODQ1NyA1MS45NzAzMzksMjguNDU0MzIzMiA1MS45NzAzMzksMjcuMjU3OTY5MiBDNTEuOTcwMzM5LDI2LjAzODE1NzMgNTEuNjczMjAyMSwyNS4wNzYzOTY5IDUxLjA3ODkxOTUsMjQuMzcyNjU5MiBDNTAuNDg0NjM2OSwyMy42Njg5MjE2IDQ5LjQ3NjcwMiwyMy4zMTcwNTggNDguMDU1MDg0NywyMy4zMTcwNTggQzQ3LjE2OTQ4NzEsMjMuMzE3MDU4IDQ2LjIwODE2MiwyMy40ODcxMjU0IDQ1LjE3MTA4MDUsMjMuODI3MjY1MyBDNDQuMTMzOTk5MSwyNC4xNjc0MDUxIDQzLjA5MTEwNjksMjQuNjQyNDIwOSA0Mi4wNDIzNzI5LDI1LjI1MjMyNjkgQzQwLjk5MzYzODgsMjUuODYyMjMyOSAzOS45Nzk4Nzc4LDI2LjYwMTE0NjMgMzkuMDAxMDU5MywyNy40NjkwODk1IEMzOC4wMjIyNDA5LDI4LjMzNzAzMjYgMzcuMTU5OTYxNCwyOS4yOTI5Mjg2IDM2LjQxNDE5NDksMzAuMzM2ODA2MSBDMzUuNjY4NDI4NSwzMS4zODA2ODM2IDM1LjA2ODMyODUsMzIuNTA2NjQ3IDM0LjYxMzg3NzEsMzMuNzE0NzMgQzM0LjE1OTQyNTcsMzQuOTIyODEzIDMzLjkzMjIwMzQsMzYuMTgzNjU3NCAzMy45MzIyMDM0LDM3LjQ5NzMwMSBDMzMuOTMyMjAzNCwzOC44ODEzMTg0IDM0LjE4MjczMDUsNDAuMTE4NzA1MyAzNC42ODM3OTI0LDQxLjIwOTQ5ODYgQzM1LjE4NDg1NDIsNDIuMzAwMjkyIDM1Ljg0OTA0MjUsNDMuMjkxMzc0NCAzNi42NzYzNzcxLDQ0LjE4Mjc3NTQgQzM3LjUwMzcxMTgsNDUuMDc0MTc2NCAzOC40NDE3MzIsNDUuODk1MTkxNCAzOS40OTA0NjYxLDQ2LjY0NTg0NDkgQzQwLjUzOTIwMDIsNDcuMzk2NDk4NCA0MS42MTEyMjMzLDQ4LjE0MTI3NjMgNDIuNzA2NTY3OCw0OC44ODAyMDA4IEM0My44MDE5MTIzLDQ5LjYxOTEyNTQgNDQuODczOTM1NCw1MC4zODE0OTY0IDQ1LjkyMjY2OTUsNTEuMTY3MzM2OCBDNDYuOTcxNDAzNSw1MS45NTMxNzcyIDQ3LjkwOTQyMzgsNTIuODIxMTA3MyA0OC43MzY3NTg1LDUzLjc3MTE1MzEgQzQ5LjU2NDA5MzEsNTQuNzIxMTk5IDUwLjIyODI4MTQsNTUuNzc2Nzg5NiA1MC43MjkzNDMyLDU2LjkzNzk1NjggQzUxLjIzMDQwNSw1OC4wOTkxMjM5IDUxLjQ4MDkzMjIsNTkuNDMwMzQxIDUxLjQ4MDkzMjIsNjAuOTMxNjQ4IEM1MS40ODA5MzIyLDYyLjM4NjAzOTIgNTEuMjA3MTAwMiw2My43NjQxNzE1IDUwLjY1OTQyOCw2NS4wNjYwODYxIEM1MC4xMTE3NTU3LDY2LjM2ODAwMDggNDkuMzYwMTc0Myw2Ny40OTk4Mjg2IDQ4LjQwNDY2MSw2OC40NjE2MDM0IEM0Ny40NDkxNDc4LDY5LjQyMzM3ODIgNDYuMzE4ODYyNSw3MC4xODU3NDkyIDQ1LjAxMzc3MTIsNzAuNzQ4NzM5NCBDNDMuNzA4Njc5OSw3MS4zMTE3Mjk1IDQyLjMxMDM4ODgsNzEuNTkzMjIwMyA0MC44MTg4NTU5LDcxLjU5MzIyMDMgWlwiLFwiaWRcIjpcIlNjYXR0ZXJcIn19KV0pXSldKX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TY2F0dGVyT3V0bGluZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzYxOTYwZjUmXCJcbnZhciBzY3JpcHQgPSB7fVxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVHJhbnNmZXJSZXF1ZXN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWYyMTU2NGUyJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RyYW5zZmVyUmVxdWVzdC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1mMjE1NjRlMiZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFuc2ZlclJlcXVlc3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZjIxNTY0ZTImc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiOGE5NmQyOGVcIiwgY29udGVudCwgdHJ1ZSwge30pOyJdLCJzb3VyY2VSb290IjoiIn0=