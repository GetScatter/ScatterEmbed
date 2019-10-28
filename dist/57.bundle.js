(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[57],{

/***/ "82eg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/Signature.vue?vue&type=template&id=425e068e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('section',{staticClass:"multi-pane popout-window"},[_c('section',{staticClass:"main-panel"},[_c('PopOutApp',{attrs:{"app":_vm.appData}}),_vm._v(" "),(_vm.limitedMessages.total > 1)?_c('figure',{staticClass:"has-more"},[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.ActionsTotal,_vm.limitedMessages.total)))]):_vm._e(),_vm._v(" "),(_vm.participantAccounts)?_c('section',{staticClass:"participants"},[_c('label',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.AccountsInvolved)))]),_vm._v(" "),(!_vm.participantsAsSelector)?_c('section',[_vm._l((_vm.participantAccounts.slice(0,2)),function(p){return _c('section',{staticClass:"participant"},[_vm._v("\n                        "+_vm._s(p.network().name)+" - "),_c('b',[_vm._v(_vm._s(p.sendable()))])])}),_vm._v(" "),(_vm.participantAccounts.length > 2)?_c('figure',{staticClass:"more-participants",on:{"click":function($event){_vm.participantsAsSelector = true}}},[_vm._v("\n                        +"+_vm._s(_vm.participantAccounts.length)+" more accounts\n                    ")]):_vm._e()],2):_c('Select',{attrs:{"bordered":"1","options":_vm.participantAccounts,"parser":function (x) { return ((x.network().name) + " - " + (x.sendable())); }}})],1):_vm._e(),_vm._v(" "),(_vm.isArbitrarySignature)?_c('section',{staticClass:"participants"},[_c('label',[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.KeysInvolved)))]),_vm._v(" "),_c('section',{staticClass:"participant"},[_vm._v(_vm._s(_vm.arbitraryKeypair.name))])]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"fixed-actions"},[(_vm.isDangerous)?_c('section',{staticClass:"disclaimer less-pad red centered",staticStyle:{"margin-bottom":"10px"}},[_vm._v("\n                    One of the actions included within this transaction is "),_c('b',[_vm._v("dangerous")]),_vm._v(".\n                ")]):_vm._e(),_vm._v(" "),_c('section',{staticClass:"accept-deny"},[(!_vm.pinning)?_c('Button',{attrs:{"text":_vm.locale(_vm.langKeys.GENERIC.Deny),"big":"1"},nativeOn:{"click":function($event){return _vm.returnResult(false)}}}):_vm._e(),_vm._v(" "),(!_vm.pinning)?_c('Button',{attrs:{"red":_vm.isDangerous || (_vm.reputation && _vm.reputation.decimal < 0),"big":"1","blue":"1","disabled":_vm.cannotSignArbitrary,"text":_vm.locale(_vm.langKeys.GENERIC.Allow)},nativeOn:{"click":function($event){return _vm.accepted($event)}}}):_vm._e()],1)])],1),_vm._v(" "),(!_vm.expanded)?_c('section',{staticClass:"side-panel"},[_c('section',{staticClass:"messages-scroller"},[(!_vm.isArbitrarySignature && (_vm.personalFields.length || _vm.locationFields.length))?_c('RequiredFields',{attrs:{"identity":_vm.identity,"fields":_vm.fields,"selected-identity":_vm.selectedIdentity,"cloned-location":_vm.clonedLocation,"selected-location":_vm.selectedLocation,"split-panels":"1"},on:{"selectLocation":function (x) { _vm.selectedLocation = x; _vm.clonedLocation = x.clone(); },"locationField":function (key, val) { return _vm.clonedLocation[key] = val; },"personalField":function (key, val) { return _vm.selectedIdentity.personal[key] = val; }}}):_vm._e(),_vm._v(" "),_vm._l((_vm.messages),function(message,index){return _c('section',{ref:("message_" + index),refInFor:true,staticClass:"messages",class:{'dangerous':_vm.isDangerous || (_vm.reputable(message) && _vm.reputable(message).decimal < 0)}},[(_vm.isPreviouslyWhitelisted(message))?_c('section',{staticClass:"whitelist-overlay"},[_c('section',{staticClass:"box"},[_c('figure',{staticClass:"info"},[_vm._v(_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.PreviouslyWhitelisted)))])])]):_vm._e(),_vm._v(" "),_c('section',{class:{'previous-whitelist':_vm.isPreviouslyWhitelisted(message)}},[_c('section',{staticClass:"details contract-action"},[(_vm.isDangerous)?_c('section',{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:({content:_vm.isDangerous, classes:['dangertip']}),expression:"{content:isDangerous, classes:['dangertip']}",modifiers:{"right":true}}],staticClass:"danger wiggle"},[_c('i',{staticClass:"icon-help"})]):_vm._e(),_vm._v(" "),_c('figure',{staticClass:"title"},[(_vm.whitelisted && !_vm.isPreviouslyWhitelisted(message))?_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":!!_vm.getWhitelist(message)},on:{"change":function($event){return _vm.addWhitelist(message)}}}):_vm._e(),_vm._v(" "),_c('ReputationScore',{staticClass:"score",attrs:{"reputable":_vm.reputable(message),"small":"1"}}),_vm._v(" "),_c('span',{on:{"click":function($event){return _vm.collapse(message)}}},[_vm._v(_vm._s(message.code)+" "),_c('i',{staticClass:"contract-split icon-right-open-big"}),_vm._v(" "+_vm._s(message.type))])],1),_vm._v(" "),(_vm.isDangerous)?_c('span',{staticClass:"danger-title"},[_vm._v("This action is "),_c('b',[_vm._v("dangerous")]),_vm._v("!")]):_vm._e()]),_vm._v(" "),(!_vm.isCollapsed(message))?_c('section',[_c('br'),_vm._v(" "),_vm._l((message.data),function(value,key){return (_vm.viewType === _vm.VIEW_TYPES.HUMAN)?_c('section',{staticClass:"properties"},[_c('label',[_vm._v(_vm._s(key))]),_vm._v(" "),_c('section',{staticClass:"split-inputs"},[(_vm.whitelisted && !_vm.isPreviouslyWhitelisted(message))?_c('input',{attrs:{"type":"checkbox"},on:{"change":function($event){_vm.toggleWhitelistProp(_vm.getWhitelist(message), key)}}}):_vm._e(),_vm._v(" "),(typeof value === 'object')?_c('figure',{staticClass:"value object"},[_c('div',{ref:_vm.hash(JSON.stringify(message)) + key + _vm.hash(value),refInFor:true,attrs:{"v-html":_vm.formatJson(value, _vm.hash(JSON.stringify(message))+key)}})]):_c('figure',{staticClass:"value"},[_vm._v(_vm._s(value))])])]):_vm._e()}),_vm._v(" "),(_vm.viewType === _vm.VIEW_TYPES.JSON)?_c('section',{staticClass:"properties"},[_c('div',{ref:_vm.hash(message.data),refInFor:true,staticClass:"value object",attrs:{"v-html":_vm.formatJson(message.data)}})]):_vm._e(),_vm._v(" "),(_vm.viewType === _vm.VIEW_TYPES.RICARDIAN)?_c('section',{staticClass:"properties"},[(!_vm.hasRicardianContract(message))?_c('figure',{staticClass:"collapsed"},[_vm._v("No Ricardian Contract")]):_c('figure',{staticClass:"ricardian"},[_vm._v(_vm._s(message.ricardian))])]):_vm._e()],2):_c('section',{staticClass:"collapsed"},[_vm._v("\n                            "+_vm._s(_vm.locale(_vm.langKeys.POPOUTS.SIGNATURE.HiddenActions))+"\n                        ")])])])})],2),_vm._v(" "),(!_vm.isArbitrarySignature && !_vm.isDangerous)?_c('section',{staticClass:"whitelist-bar"},[(!_vm.whitelisted)?_c('figure',{staticClass:"text"},[_vm._v("You can whitelist this so that you don't have to keep re-accepting this transaction.")]):_vm._e(),_vm._v(" "),(_vm.whitelisted)?_c('figure',{staticClass:"text blue"},[_vm._v("Checkboxes that are checked can have their values changed without breaking the whitelist.")]):_vm._e(),_vm._v(" "),_c('Switcher',{attrs:{"state":_vm.whitelisted},nativeOn:{"click":function($event){return _vm.whitelist($event)}}})],1):_vm._e()]):_vm._e()]),_vm._v(" "),(_vm.showingRidlWarning)?_c('section',{staticClass:"ridl-popup"},[_c('figure',{staticClass:"bg",on:{"click":function($event){_vm.showingRidlWarning = false}}}),_vm._v(" "),_c('section',{staticClass:"box"},[_c('h2',[_vm._v("Danger!")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticStyle:{"font-size":"9px"}},[_vm._v("Related Entities")]),_vm._v(" "),_vm._l((_vm.reputation.reputables.filter(function (x) { return x.decimal < 0; })),function(reputable){return _c('i',{staticClass:"link",on:{"click":function($event){_vm.openInBrowser(_vm.ridlLink(reputable))}}},[_vm._v("View "),_c('b',[_vm._v(_vm._s(reputable.entity))]),_vm._v(" on RIDL.")])})],2)]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticStyle:{"font-size":"11px","line-height":"13px"}},[_vm._v("\n                Users of RIDL have rated contracts and/or actions within this transaction negatively.\n                "),_c('b',[_vm._v("This does not mean indefinitely that it is a scam, just that it is dangerous in some way.")])])}]


// CONCATENATED MODULE: ./src/views/popouts/Signature.vue?vue&type=template&id=425e068e&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/store/constants.js
var constants = __webpack_require__("qjwK");

// EXTERNAL MODULE: ./src/components/reusable/ReputationScore.vue + 4 modules
var ReputationScore = __webpack_require__("T/cf");

// EXTERNAL MODULE: ./src/components/reusable/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("RNqi");

// EXTERNAL MODULE: ./node_modules/json-formatter-js/dist/json-formatter.js
var json_formatter = __webpack_require__("6IJF");
var json_formatter_default = /*#__PURE__*/__webpack_require__.n(json_formatter);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/util/Hasher.js
var Hasher = __webpack_require__("zugy");
var Hasher_default = /*#__PURE__*/__webpack_require__.n(Hasher);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Account.js
var Account = __webpack_require__("bUKF");
var Account_default = /*#__PURE__*/__webpack_require__.n(Account);

// EXTERNAL MODULE: ./src/services/utility/PopupService.js
var PopupService = __webpack_require__("IfgB");

// EXTERNAL MODULE: ./src/models/popups/Popup.js
var Popup = __webpack_require__("Gbp+");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/apps/PermissionService.js
var PermissionService = __webpack_require__("eOAV");
var PermissionService_default = /*#__PURE__*/__webpack_require__.n(PermissionService);

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Blockchains.js
var Blockchains = __webpack_require__("F+MN");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/models/Identity.js
var Identity = __webpack_require__("EY8S");

// EXTERNAL MODULE: ./src/components/popouts/RequiredFields.vue + 4 modules
var RequiredFields = __webpack_require__("psvp");

// EXTERNAL MODULE: ./node_modules/@walletpack/core/services/secure/KeyPairService.js
var KeyPairService = __webpack_require__("O1cq");
var KeyPairService_default = /*#__PURE__*/__webpack_require__.n(KeyPairService);

// EXTERNAL MODULE: ./src/services/utility/RIDLService.js
var RIDLService = __webpack_require__("bcyO");

// EXTERNAL MODULE: ./src/components/popouts/PopOutApp.vue + 4 modules
var PopOutApp = __webpack_require__("IeaP");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/views/popouts/Signature.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

	
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	const VIEW_TYPES = {
	    HUMAN:'human',
        JSON:'json',
        RICARDIAN:'ricardian',
    };

	/* harmony default export */ var Signaturevue_type_script_lang_js_ = ({
		props:['popup', 'expanded', 'pinning'],
		components:{
			PopOutApp: PopOutApp["a" /* default */],
			ReputationScore: ReputationScore["a" /* default */],
			RequiredFields: RequiredFields["a" /* default */],
			SearchBar: SearchBar["a" /* default */],
		},
		data () {return {
			Blockchains: Blockchains["Blockchains"],
            whitelisted:false,
			whitelists:[],
			actionList:[],

            viewType:VIEW_TYPES.HUMAN,
            VIEW_TYPES,

			selectedIdentity:null,
			selectedLocation:null,
			clonedLocation:null,
			hideCloseButton:false,

			reputation:null,
            showingRidlWarning:false,

            participantsAsSelector:false,
		}},
		created(){
			this.selectedIdentity = this.identity.clone();
			this.selectedLocation = this.selectedIdentity.getLocation() || this.locations[0];
			this.clonedLocation = this.selectedLocation.clone();

			setTimeout(async() => {
				this.loadingReputation = true;
				this.reputation = await RIDLService["b" /* default */].checkContracts(this.payload.network, this.messages);
				if(this.reputation && this.reputation.decimal < 0) this.showingRidlWarning = true;
				this.loadingReputation = false;
			}, 50);
		},
		computed: {
			...Object(vuex_esm["d" /* mapState */])([
				'scatter',
			]),
			...Object(vuex_esm["c" /* mapGetters */])([
				'identity',
				'identities',
				'accounts',
				'networks',
                'locations',
			]),


			appData(){
				return this.popup.data.props.appData;
			},

            viewTypesArray(){
			    const hasEos = !this.isArbitrarySignature && !!this.payload.participants.find(x => Account_default.a.fromJson(x).blockchain() === Blockchains["Blockchains"].EOSIO);
			    const arrMap = [VIEW_TYPES.HUMAN, VIEW_TYPES.JSON];
			    if(hasEos) arrMap.push(VIEW_TYPES.RICARDIAN);
			    return arrMap;
            },
            payload(){ return this.popup.payload(); },
			participantAccounts(){
				if(!this.payload.hasOwnProperty('participants')) return null;
				return this.payload.participants.map(x => {
					return Account_default.a.fromJson(x);
                })
			},
			messages(){
				return this.payload.messages;
			},
            limitedMessages(){
                return {
                	actions:this.messages.slice(0, 3).map(x => x.type).join(', '),
                    total:this.messages.length
                }
            },
			isArbitrarySignature(){
				return !this.payload.hasOwnProperty('participants');
			},
			fields(){
				return Identity["IdentityRequiredFields"].fromJson(this.payload.requiredFields || {});
			},
			personalFields(){
				return this.fields.personal;
			},
			locationFields(){
				return this.fields.location;
			},
			missingFields(){
				if(!this.personalFields.length && !this.locationFields.length) return false;
				return !this.identity.hasRequiredFields(this.fields);
			},
			isValidIdentity() {
				return this.selectedIdentity.hasRequiredFields(this.fields, this.clonedLocation);
			},
            arbitraryKeypair(){
	            return KeyPairService_default.a.getKeyPairFromPublicKey(this.payload.publicKey);
            },
            cannotSignArbitrary(){
				if(!this.isArbitrarySignature) return false;
				return this.payload.messages[0].data.signing.split(' ').some(x => x.length > 12);
            },
            isDangerous(){
				if(this.messages.find(x => x.code === 'eosio' && x.type === 'updateauth')){
					return `This action is dangerous. Accepting it will change your keys and possibly give your account to someone else. <br><br><b>Check to make sure the keys are correct.</b>`;
                }
				return false;
            }
		},
		methods: {
			returnResult(result){
				this.$emit('returned', result);
			},

            reputable(message){
				if(!this.reputation) return;
			    return this.reputation.reputables.find(x => x.code === `${message.code}${message.type}`);
            },
			ridlLink(reputable){
			    return `${RIDLService["a" /* RIDL_API */]}/reputable?id=${reputable.id}`
            },

            formatViewType(type){
			    switch(type){
                    case VIEW_TYPES.HUMAN: return 'Human Readable';
                    case VIEW_TYPES.JSON: return 'JSON Format';
                    case VIEW_TYPES.RICARDIAN: return 'Ricardian Contracts';
                }
            },

			collapse(message){
                this.toggleAction(message, 'collapsed');
            },
            isCollapsed(message){
				return this.actionList.find(x => x === this.getMessageUnique(message, 'collapsed'))
            },

			async accepted(){
				this.returnResult({
					whitelists:this.whitelists,

					identity:this.selectedIdentity,
					location:this.clonedLocation,
					missingFields:this.missingFields,

					accepted:true,
					needResources:false,
				});
			},

			hash(json){
				return Hasher_default.a.unsaltedQuickHash(JSON.stringify(json));
			},
			formatJson(json, key = null){
				this.$nextTick(() => {
					const refKey = (key ? key : '') + this.hash(json);

					const formatter = new json_formatter_default.a(json, 99999, {
						hoverPreviewEnabled: true,
						hoverPreviewArrayCount: 10,
						hoverPreviewFieldCount: 5,
						useToJSON: true
					});
					const elem = this.$refs[refKey][0];
					if(elem.children.length >= 1) return false;
					elem.appendChild(formatter.render());
				});
			},

			whitelist(){
				this.whitelisted = !this.whitelisted;
				this.messages.map(message => {
					if(!this.isPreviouslyWhitelisted(message)) this.addWhitelist(message);
				})
            },


			getMessageUnique(message, action){
				return `${message.code}:${message.type}:${action}`
			},
			getWhitelist(message){
				const unique = this.getMessageUnique(message, 'whitelist');
				return this.whitelists.find(x => x.unique === unique);
			},
			toggleAction(message, action){
				const unique = this.getMessageUnique(message, action);
				if(this.actionList.includes(unique)) this.actionList = this.actionList.filter(x => x !== unique);
				else this.actionList.push(unique);
			},
			getAction(message, action){
				return this.actionList.find(x => x === this.getMessageUnique(message, action))
			},
			addWhitelist(message){
				if(this.isPreviouslyWhitelisted(message)) return false;

				this.toggleAction(message, 'whitelist');
				const unique = this.getMessageUnique(message, 'whitelist');
				const whitelist = {unique, props:[], code:message.code, type:message.type, fields:message.data};

				if(this.whitelists.find(x => x.unique === whitelist.unique))
					 this.whitelists = this.whitelists.filter(x => x.unique !== unique);
				else this.whitelists.push(whitelist);

				if(this.whitelists.length === 0) this.whitelisted = false;
			},
			toggleWhitelistProp(whitelist, prop){
				if(whitelist.props.includes(prop))
					whitelist.props = whitelist.props.filter(x => x !== prop);
				else whitelist.props.push(prop);
			},
			isPreviouslyWhitelisted(message){
				if(this.isArbitrarySignature) return false;
				return PermissionService_default.a.hasActionPermission(this.payload.origin, this.identity, this.participantAccounts, message);
			},
			hasRicardianContract(message){
				return message.hasOwnProperty('ricardian') && message.ricardian.length
			},

            ...Object(vuex_esm["b" /* mapActions */])([
            	constants["ADD_RESOURCES"]
            ])
		}
	});

// CONCATENATED MODULE: ./src/views/popouts/Signature.vue?vue&type=script&lang=js&
 /* harmony default export */ var popouts_Signaturevue_type_script_lang_js_ = (Signaturevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/popouts/Signature.vue?vue&type=style&index=0&id=425e068e&scoped=true&lang=scss&rel=stylesheet%2Fscss&
var Signaturevue_type_style_index_0_id_425e068e_scoped_true_lang_scss_rel_stylesheet_2Fscss_ = __webpack_require__("qYDv");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/popouts/Signature.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  popouts_Signaturevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "425e068e",
  null
  
)

/* harmony default export */ var Signature = __webpack_exports__["default"] = (component.exports);

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

/***/ "Xo6p":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("JPst")(false);
// Module
exports.push([module.i, ".app-details[data-v-425e068e]{padding:60px 60px 30px}.ridl-popup[data-v-425e068e]{position:fixed;top:79px;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;align-items:center}.ridl-popup .bg[data-v-425e068e]{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(255,0,0,0.8);z-index:-1}.ridl-popup .box[data-v-425e068e]{background:#fff;padding:30px;text-align:center;min-width:250px;max-width:450px;width:100%;box-shadow:0 0 0 3px red, 0 0 0 6px white}.ridl-popup .box .link[data-v-425e068e]{cursor:pointer;display:block;text-decoration:underline}.view-types[data-v-425e068e]{position:relative;margin-top:-10px;margin-left:-30px;margin-right:-30px;background:#fff;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05),0 10px 20px rgba(0,0,0,0.02)}input[type=checkbox][data-v-425e068e]{flex:0 0 auto;align-self:flex-start;margin-right:10px;width:20px;height:20px;cursor:pointer}.has-more[data-v-425e068e]{text-align:center;font-size:10px;font-weight:bold;color:#7a7a7a;border:1px solid #c8c8c8;display:table;padding:5px 8px;margin:-25px auto 0}.messages[data-v-425e068e]{padding:20px 0 20px;position:relative}.messages[data-v-425e068e]:not(:first-child){margin-top:60px}.messages .previous-whitelist[data-v-425e068e]{opacity:0.4;cursor:not-allowed}.messages .collapsed[data-v-425e068e]{padding-top:10px;font-size:11px}.messages .whitelist-overlay[data-v-425e068e]{position:absolute;top:50px;right:0;z-index:2;display:flex;justify-content:center;align-items:center}.messages .whitelist-overlay .box[data-v-425e068e]{width:150px;padding:20px;background:#fff;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1),0 10px 20px rgba(0,0,0,0.03);font-size:13px;font-weight:bold}.messages .details .title[data-v-425e068e]{align-items:center;display:flex;font-size:14px;cursor:pointer}.messages .details .title[data-v-425e068e]:hover{text-decoration:underline}.messages .details .contract-split[data-v-425e068e]{padding:0 5px;font-size:13px;display:inline-block;animation:bounce-data-v-425e068e 0.7s infinite}@keyframes bounce-data-v-425e068e{0%,100%{transform:translateX(-2px)}50%{transform:translateX(2px)}}.messages .properties .ricardian[data-v-425e068e]{background:rgba(0,0,0,0.05);border:1px solid rgba(0,0,0,0.15);padding:10px}.messages .properties label[data-v-425e068e]{margin-bottom:5px}.messages .properties .value[data-v-425e068e]{overflow-x:auto;min-height:16px;font-size:16px;font-weight:bold}.messages .properties .value.object[data-v-425e068e]{font-size:13px;font-weight:500}.messages .properties:not(:last-child) .value[data-v-425e068e]{margin-bottom:20px}.messages.dangerous .danger[data-v-425e068e]{cursor:pointer;float:left;padding:6px 5px 5px;background:rgba(0,0,0,0.1);box-shadow:inset 0 5px 10px rgba(0,0,0,0.1);text-shadow:0 2px 0 rgba(0,0,0,0.1);margin-top:7px;margin-right:10px}.messages.dangerous .details.contract-action[data-v-425e068e]{background:red;background:linear-gradient(-180deg, #ff0707 -20%, #e23b3b 100%);border-bottom:1px solid darkred;color:#fff}.messages.dangerous .danger-title[data-v-425e068e]{font-size:11px;width:100%}.json-formatter-dark.json-formatter-row[data-v-425e068e]{padding:0}.contract-action[data-v-425e068e]{margin:-20px -30px 0;border-top:1px solid rgba(0,0,0,0.04);padding:20px 30px;background:linear-gradient(180deg, #007fd7 0%, #0799ff 100%);color:#fff}.contract-action .title span[data-v-425e068e]{font-size:18px}\n", ""]);


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

/***/ "qEK9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Mq7R");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PopOutApp_vue_vue_type_style_index_0_id_24ae06ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "qYDv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_425e068e_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("qh4L");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_425e068e_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_425e068e_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_style_index_0_id_425e068e_scoped_true_lang_scss_rel_stylesheet_2Fscss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "qh4L":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Xo6p");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("SZ7m").default
var update = add("fec7d68a", content, true, {});

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wb3V0cy9TaWduYXR1cmUudnVlPzlhM2IiLCJ3ZWJwYWNrOi8vL3NyYy92aWV3cy9wb3BvdXRzL1NpZ25hdHVyZS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvU2lnbmF0dXJlLnZ1ZT85ZTRmIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1NpZ25hdHVyZS52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWU/MzRhMCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1BvcE91dEFwcC52dWU/NGM1MyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT80NjIxIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3BvdXRzL1JlcXVpcmVkRmllbGRzLnZ1ZT9mOTc4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9kZmI0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvU2lnbmF0dXJlLnZ1ZT81YTIzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwLnZ1ZT9lMWEzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlP2ZiZjAiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BvcG91dHMvUmVxdWlyZWRGaWVsZHMudnVlPzI0OTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkcy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9wb3V0cy9Qb3BPdXRBcHAudnVlPzg3N2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcG91dHMvU2lnbmF0dXJlLnZ1ZT8wYWIyIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3BvdXRzL1NpZ25hdHVyZS52dWU/NWJmYyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdmdzL1NjYXR0ZXJPdXRsaW5lLnZ1ZT8xZDYzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N2Z3MvU2NhdHRlck91dGxpbmUudnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDBCQUEwQixhQUFhLDBCQUEwQix3QkFBd0IsbUNBQW1DLHVDQUF1QyxnQkFBZ0IseUJBQXlCLGtCQUFrQixPQUFPLG1CQUFtQiwyREFBMkQsdUJBQXVCLG1LQUFtSywyQkFBMkIsNE1BQTRNLHFCQUFxQiwwQkFBMEIsK0dBQStHLGdFQUFnRSxvQ0FBb0MseUJBQXlCLG9DQUFvQyxrSkFBa0osT0FBTyx3RUFBd0Usc0RBQXNELElBQUksb0VBQW9FLDJCQUEyQixrSEFBa0gsMEJBQTBCLG1GQUFtRiw0QkFBNEIsa0NBQWtDLDREQUE0RCx3QkFBd0IsMkxBQTJMLDBCQUEwQiw4QkFBOEIsT0FBTyx1REFBdUQsV0FBVyx5QkFBeUIsaUNBQWlDLG1EQUFtRCxPQUFPLDhLQUE4SyxXQUFXLHlCQUF5Qiw4QkFBOEIsK0RBQStELHlCQUF5QixnQkFBZ0IsZ0NBQWdDLCtHQUErRyxPQUFPLHNMQUFzTCxLQUFLLCtCQUErQiwwQkFBMEIsZ0NBQWdDLEVBQUUsc0NBQXNDLHNDQUFzQyxFQUFFLHNDQUFzQyxpREFBaUQsSUFBSSxxRUFBcUUs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RyxFQUFDLEM7Ozs7Ozs7O0FDQS9YO0FBQUE7QUFBQTtBQUFpWSxDQUFnQiw4YUFBRyxFQUFDLEM7Ozs7Ozs7QUNBclo7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBZ1U7QUFDdFYsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFnRTtBQUNsRiw4Q0FBOEMsRTs7Ozs7Ozs7OztBQ1I5QywwQkFBMEIsYUFBYSwwQkFBMEIsd0JBQXdCLGlCQUFpQixPQUFPLHdKQUF3SixVQUFVLE9BQU8sa0pBQWtKLFVBQVUsT0FBTyxpQ0FBaUMsVUFBVSxPQUFPLGFBQWEsZUFBZSxPQUFPLGtEQUFrRCwyQkFBMkIsT0FBTyw4bEpBQThsSjtBQUNwc0s7Ozs7Ozs7OztBQ0Q2RjtBQUM3Rjs7O0FBR0E7QUFDNkY7QUFDN0YsZ0JBQWdCLDhDQUFVO0FBQzFCO0FBQ0EsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLCtGIiwiZmlsZSI6IjU3LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzZWN0aW9uJyxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIm11bHRpLXBhbmUgcG9wb3V0LXdpbmRvd1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIm1haW4tcGFuZWxcIn0sW19jKCdQb3BPdXRBcHAnLHthdHRyczp7XCJhcHBcIjpfdm0uYXBwRGF0YX19KSxfdm0uX3YoXCIgXCIpLChfdm0ubGltaXRlZE1lc3NhZ2VzLnRvdGFsID4gMSk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiaGFzLW1vcmVcIn0sW192bS5fdihfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuQWN0aW9uc1RvdGFsLF92bS5saW1pdGVkTWVzc2FnZXMudG90YWwpKSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0ucGFydGljaXBhbnRBY2NvdW50cyk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhcnRpY2lwYW50c1wifSxbX2MoJ2xhYmVsJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5BY2NvdW50c0ludm9sdmVkKSkpXSksX3ZtLl92KFwiIFwiKSwoIV92bS5wYXJ0aWNpcGFudHNBc1NlbGVjdG9yKT9fYygnc2VjdGlvbicsW192bS5fbCgoX3ZtLnBhcnRpY2lwYW50QWNjb3VudHMuc2xpY2UoMCwyKSksZnVuY3Rpb24ocCl7cmV0dXJuIF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYXJ0aWNpcGFudFwifSxbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIrX3ZtLl9zKHAubmV0d29yaygpLm5hbWUpK1wiIC0gXCIpLF9jKCdiJyxbX3ZtLl92KF92bS5fcyhwLnNlbmRhYmxlKCkpKV0pXSl9KSxfdm0uX3YoXCIgXCIpLChfdm0ucGFydGljaXBhbnRBY2NvdW50cy5sZW5ndGggPiAyKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJtb3JlLXBhcnRpY2lwYW50c1wiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtfdm0ucGFydGljaXBhbnRzQXNTZWxlY3RvciA9IHRydWV9fX0sW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICtcIitfdm0uX3MoX3ZtLnBhcnRpY2lwYW50QWNjb3VudHMubGVuZ3RoKStcIiBtb3JlIGFjY291bnRzXFxuICAgICAgICAgICAgICAgICAgICBcIildKTpfdm0uX2UoKV0sMik6X2MoJ1NlbGVjdCcse2F0dHJzOntcImJvcmRlcmVkXCI6XCIxXCIsXCJvcHRpb25zXCI6X3ZtLnBhcnRpY2lwYW50QWNjb3VudHMsXCJwYXJzZXJcIjpmdW5jdGlvbiAoeCkgeyByZXR1cm4gKCh4Lm5ldHdvcmsoKS5uYW1lKSArIFwiIC0gXCIgKyAoeC5zZW5kYWJsZSgpKSk7IH19fSldLDEpOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS5pc0FyYml0cmFyeVNpZ25hdHVyZSk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInBhcnRpY2lwYW50c1wifSxbX2MoJ2xhYmVsJyxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5LZXlzSW52b2x2ZWQpKSldKSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwYXJ0aWNpcGFudFwifSxbX3ZtLl92KF92bS5fcyhfdm0uYXJiaXRyYXJ5S2V5cGFpci5uYW1lKSldKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImZpeGVkLWFjdGlvbnNcIn0sWyhfdm0uaXNEYW5nZXJvdXMpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJkaXNjbGFpbWVyIGxlc3MtcGFkIHJlZCBjZW50ZXJlZFwiLHN0YXRpY1N0eWxlOntcIm1hcmdpbi1ib3R0b21cIjpcIjEwcHhcIn19LFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICAgIE9uZSBvZiB0aGUgYWN0aW9ucyBpbmNsdWRlZCB3aXRoaW4gdGhpcyB0cmFuc2FjdGlvbiBpcyBcIiksX2MoJ2InLFtfdm0uX3YoXCJkYW5nZXJvdXNcIildKSxfdm0uX3YoXCIuXFxuICAgICAgICAgICAgICAgIFwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFjY2VwdC1kZW55XCJ9LFsoIV92bS5waW5uaW5nKT9fYygnQnV0dG9uJyx7YXR0cnM6e1widGV4dFwiOl92bS5sb2NhbGUoX3ZtLmxhbmdLZXlzLkdFTkVSSUMuRGVueSksXCJiaWdcIjpcIjFcIn0sbmF0aXZlT246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0ucmV0dXJuUmVzdWx0KGZhbHNlKX19fSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoIV92bS5waW5uaW5nKT9fYygnQnV0dG9uJyx7YXR0cnM6e1wicmVkXCI6X3ZtLmlzRGFuZ2Vyb3VzIHx8IChfdm0ucmVwdXRhdGlvbiAmJiBfdm0ucmVwdXRhdGlvbi5kZWNpbWFsIDwgMCksXCJiaWdcIjpcIjFcIixcImJsdWVcIjpcIjFcIixcImRpc2FibGVkXCI6X3ZtLmNhbm5vdFNpZ25BcmJpdHJhcnksXCJ0ZXh0XCI6X3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuR0VORVJJQy5BbGxvdyl9LG5hdGl2ZU9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtyZXR1cm4gX3ZtLmFjY2VwdGVkKCRldmVudCl9fX0pOl92bS5fZSgpXSwxKV0pXSwxKSxfdm0uX3YoXCIgXCIpLCghX3ZtLmV4cGFuZGVkKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwic2lkZS1wYW5lbFwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIm1lc3NhZ2VzLXNjcm9sbGVyXCJ9LFsoIV92bS5pc0FyYml0cmFyeVNpZ25hdHVyZSAmJiAoX3ZtLnBlcnNvbmFsRmllbGRzLmxlbmd0aCB8fCBfdm0ubG9jYXRpb25GaWVsZHMubGVuZ3RoKSk/X2MoJ1JlcXVpcmVkRmllbGRzJyx7YXR0cnM6e1wiaWRlbnRpdHlcIjpfdm0uaWRlbnRpdHksXCJmaWVsZHNcIjpfdm0uZmllbGRzLFwic2VsZWN0ZWQtaWRlbnRpdHlcIjpfdm0uc2VsZWN0ZWRJZGVudGl0eSxcImNsb25lZC1sb2NhdGlvblwiOl92bS5jbG9uZWRMb2NhdGlvbixcInNlbGVjdGVkLWxvY2F0aW9uXCI6X3ZtLnNlbGVjdGVkTG9jYXRpb24sXCJzcGxpdC1wYW5lbHNcIjpcIjFcIn0sb246e1wic2VsZWN0TG9jYXRpb25cIjpmdW5jdGlvbiAoeCkgeyBfdm0uc2VsZWN0ZWRMb2NhdGlvbiA9IHg7IF92bS5jbG9uZWRMb2NhdGlvbiA9IHguY2xvbmUoKTsgfSxcImxvY2F0aW9uRmllbGRcIjpmdW5jdGlvbiAoa2V5LCB2YWwpIHsgcmV0dXJuIF92bS5jbG9uZWRMb2NhdGlvbltrZXldID0gdmFsOyB9LFwicGVyc29uYWxGaWVsZFwiOmZ1bmN0aW9uIChrZXksIHZhbCkgeyByZXR1cm4gX3ZtLnNlbGVjdGVkSWRlbnRpdHkucGVyc29uYWxba2V5XSA9IHZhbDsgfX19KTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF92bS5fbCgoX3ZtLm1lc3NhZ2VzKSxmdW5jdGlvbihtZXNzYWdlLGluZGV4KXtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtyZWY6KFwibWVzc2FnZV9cIiArIGluZGV4KSxyZWZJbkZvcjp0cnVlLHN0YXRpY0NsYXNzOlwibWVzc2FnZXNcIixjbGFzczp7J2Rhbmdlcm91cyc6X3ZtLmlzRGFuZ2Vyb3VzIHx8IChfdm0ucmVwdXRhYmxlKG1lc3NhZ2UpICYmIF92bS5yZXB1dGFibGUobWVzc2FnZSkuZGVjaW1hbCA8IDApfX0sWyhfdm0uaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSkpP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJ3aGl0ZWxpc3Qtb3ZlcmxheVwifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImJveFwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiaW5mb1wifSxbX3ZtLl92KF92bS5fcyhfdm0ubG9jYWxlKF92bS5sYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5QcmV2aW91c2x5V2hpdGVsaXN0ZWQpKSldKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicse2NsYXNzOnsncHJldmlvdXMtd2hpdGVsaXN0Jzpfdm0uaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSl9fSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImRldGFpbHMgY29udHJhY3QtYWN0aW9uXCJ9LFsoX3ZtLmlzRGFuZ2Vyb3VzKT9fYygnc2VjdGlvbicse2RpcmVjdGl2ZXM6W3tuYW1lOlwidG9vbHRpcFwiLHJhd05hbWU6XCJ2LXRvb2x0aXAucmlnaHRcIix2YWx1ZTooe2NvbnRlbnQ6X3ZtLmlzRGFuZ2Vyb3VzLCBjbGFzc2VzOlsnZGFuZ2VydGlwJ119KSxleHByZXNzaW9uOlwie2NvbnRlbnQ6aXNEYW5nZXJvdXMsIGNsYXNzZXM6WydkYW5nZXJ0aXAnXX1cIixtb2RpZmllcnM6e1wicmlnaHRcIjp0cnVlfX1dLHN0YXRpY0NsYXNzOlwiZGFuZ2VyIHdpZ2dsZVwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24taGVscFwifSldKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRpdGxlXCJ9LFsoX3ZtLndoaXRlbGlzdGVkICYmICFfdm0uaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSkpP19jKCdpbnB1dCcse2F0dHJzOntcInR5cGVcIjpcImNoZWNrYm94XCJ9LGRvbVByb3BzOntcImNoZWNrZWRcIjohIV92bS5nZXRXaGl0ZWxpc3QobWVzc2FnZSl9LG9uOntcImNoYW5nZVwiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS5hZGRXaGl0ZWxpc3QobWVzc2FnZSl9fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksX2MoJ1JlcHV0YXRpb25TY29yZScse3N0YXRpY0NsYXNzOlwic2NvcmVcIixhdHRyczp7XCJyZXB1dGFibGVcIjpfdm0ucmVwdXRhYmxlKG1lc3NhZ2UpLFwic21hbGxcIjpcIjFcIn19KSxfdm0uX3YoXCIgXCIpLF9jKCdzcGFuJyx7b246e1wiY2xpY2tcIjpmdW5jdGlvbigkZXZlbnQpe3JldHVybiBfdm0uY29sbGFwc2UobWVzc2FnZSl9fX0sW192bS5fdihfdm0uX3MobWVzc2FnZS5jb2RlKStcIiBcIiksX2MoJ2knLHtzdGF0aWNDbGFzczpcImNvbnRyYWN0LXNwbGl0IGljb24tcmlnaHQtb3Blbi1iaWdcIn0pLF92bS5fdihcIiBcIitfdm0uX3MobWVzc2FnZS50eXBlKSldKV0sMSksX3ZtLl92KFwiIFwiKSwoX3ZtLmlzRGFuZ2Vyb3VzKT9fYygnc3Bhbicse3N0YXRpY0NsYXNzOlwiZGFuZ2VyLXRpdGxlXCJ9LFtfdm0uX3YoXCJUaGlzIGFjdGlvbiBpcyBcIiksX2MoJ2InLFtfdm0uX3YoXCJkYW5nZXJvdXNcIildKSxfdm0uX3YoXCIhXCIpXSk6X3ZtLl9lKCldKSxfdm0uX3YoXCIgXCIpLCghX3ZtLmlzQ29sbGFwc2VkKG1lc3NhZ2UpKT9fYygnc2VjdGlvbicsW19jKCdicicpLF92bS5fdihcIiBcIiksX3ZtLl9sKChtZXNzYWdlLmRhdGEpLGZ1bmN0aW9uKHZhbHVlLGtleSl7cmV0dXJuIChfdm0udmlld1R5cGUgPT09IF92bS5WSUVXX1RZUEVTLkhVTUFOKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicHJvcGVydGllc1wifSxbX2MoJ2xhYmVsJyxbX3ZtLl92KF92bS5fcyhrZXkpKV0pLF92bS5fdihcIiBcIiksX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInNwbGl0LWlucHV0c1wifSxbKF92bS53aGl0ZWxpc3RlZCAmJiAhX3ZtLmlzUHJldmlvdXNseVdoaXRlbGlzdGVkKG1lc3NhZ2UpKT9fYygnaW5wdXQnLHthdHRyczp7XCJ0eXBlXCI6XCJjaGVja2JveFwifSxvbjp7XCJjaGFuZ2VcIjpmdW5jdGlvbigkZXZlbnQpe192bS50b2dnbGVXaGl0ZWxpc3RQcm9wKF92bS5nZXRXaGl0ZWxpc3QobWVzc2FnZSksIGtleSl9fX0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInZhbHVlIG9iamVjdFwifSxbX2MoJ2Rpdicse3JlZjpfdm0uaGFzaChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSkgKyBrZXkgKyBfdm0uaGFzaCh2YWx1ZSkscmVmSW5Gb3I6dHJ1ZSxhdHRyczp7XCJ2LWh0bWxcIjpfdm0uZm9ybWF0SnNvbih2YWx1ZSwgX3ZtLmhhc2goSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpK2tleSl9fSldKTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ2YWx1ZVwifSxbX3ZtLl92KF92bS5fcyh2YWx1ZSkpXSldKV0pOl92bS5fZSgpfSksX3ZtLl92KFwiIFwiKSwoX3ZtLnZpZXdUeXBlID09PSBfdm0uVklFV19UWVBFUy5KU09OKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicHJvcGVydGllc1wifSxbX2MoJ2Rpdicse3JlZjpfdm0uaGFzaChtZXNzYWdlLmRhdGEpLHJlZkluRm9yOnRydWUsc3RhdGljQ2xhc3M6XCJ2YWx1ZSBvYmplY3RcIixhdHRyczp7XCJ2LWh0bWxcIjpfdm0uZm9ybWF0SnNvbihtZXNzYWdlLmRhdGEpfX0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnZpZXdUeXBlID09PSBfdm0uVklFV19UWVBFUy5SSUNBUkRJQU4pP19jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJwcm9wZXJ0aWVzXCJ9LFsoIV92bS5oYXNSaWNhcmRpYW5Db250cmFjdChtZXNzYWdlKSk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiY29sbGFwc2VkXCJ9LFtfdm0uX3YoXCJObyBSaWNhcmRpYW4gQ29udHJhY3RcIildKTpfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyaWNhcmRpYW5cIn0sW192bS5fdihfdm0uX3MobWVzc2FnZS5yaWNhcmRpYW4pKV0pXSk6X3ZtLl9lKCldLDIpOl9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJjb2xsYXBzZWRcIn0sW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIitfdm0uX3MoX3ZtLmxvY2FsZShfdm0ubGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuSGlkZGVuQWN0aW9ucykpK1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIpXSldKV0pfSldLDIpLF92bS5fdihcIiBcIiksKCFfdm0uaXNBcmJpdHJhcnlTaWduYXR1cmUgJiYgIV92bS5pc0Rhbmdlcm91cyk/X2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcIndoaXRlbGlzdC1iYXJcIn0sWyghX3ZtLndoaXRlbGlzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJ0ZXh0XCJ9LFtfdm0uX3YoXCJZb3UgY2FuIHdoaXRlbGlzdCB0aGlzIHNvIHRoYXQgeW91IGRvbid0IGhhdmUgdG8ga2VlcCByZS1hY2NlcHRpbmcgdGhpcyB0cmFuc2FjdGlvbi5cIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLChfdm0ud2hpdGVsaXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInRleHQgYmx1ZVwifSxbX3ZtLl92KFwiQ2hlY2tib3hlcyB0aGF0IGFyZSBjaGVja2VkIGNhbiBoYXZlIHRoZWlyIHZhbHVlcyBjaGFuZ2VkIHdpdGhvdXQgYnJlYWtpbmcgdGhlIHdoaXRlbGlzdC5cIildKTpfdm0uX2UoKSxfdm0uX3YoXCIgXCIpLF9jKCdTd2l0Y2hlcicse2F0dHJzOntcInN0YXRlXCI6X3ZtLndoaXRlbGlzdGVkfSxuYXRpdmVPbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7cmV0dXJuIF92bS53aGl0ZWxpc3QoJGV2ZW50KX19fSldLDEpOl92bS5fZSgpXSk6X3ZtLl9lKCldKSxfdm0uX3YoXCIgXCIpLChfdm0uc2hvd2luZ1JpZGxXYXJuaW5nKT9fYygnc2VjdGlvbicse3N0YXRpY0NsYXNzOlwicmlkbC1wb3B1cFwifSxbX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwiYmdcIixvbjp7XCJjbGlja1wiOmZ1bmN0aW9uKCRldmVudCl7X3ZtLnNob3dpbmdSaWRsV2FybmluZyA9IGZhbHNlfX19KSxfdm0uX3YoXCIgXCIpLF9jKCdzZWN0aW9uJyx7c3RhdGljQ2xhc3M6XCJib3hcIn0sW19jKCdoMicsW192bS5fdihcIkRhbmdlciFcIildKSxfdm0uX3YoXCIgXCIpLF92bS5fbSgwKSxfdm0uX3YoXCIgXCIpLF9jKCdicicpLF92bS5fdihcIiBcIiksX2MoJ3NwYW4nLHtzdGF0aWNTdHlsZTp7XCJmb250LXNpemVcIjpcIjlweFwifX0sW192bS5fdihcIlJlbGF0ZWQgRW50aXRpZXNcIildKSxfdm0uX3YoXCIgXCIpLF92bS5fbCgoX3ZtLnJlcHV0YXRpb24ucmVwdXRhYmxlcy5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguZGVjaW1hbCA8IDA7IH0pKSxmdW5jdGlvbihyZXB1dGFibGUpe3JldHVybiBfYygnaScse3N0YXRpY0NsYXNzOlwibGlua1wiLG9uOntcImNsaWNrXCI6ZnVuY3Rpb24oJGV2ZW50KXtfdm0ub3BlbkluQnJvd3Nlcihfdm0ucmlkbExpbmsocmVwdXRhYmxlKSl9fX0sW192bS5fdihcIlZpZXcgXCIpLF9jKCdiJyxbX3ZtLl92KF92bS5fcyhyZXB1dGFibGUuZW50aXR5KSldKSxfdm0uX3YoXCIgb24gUklETC5cIildKX0pXSwyKV0pOl92bS5fZSgpXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW2Z1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3AnLHtzdGF0aWNTdHlsZTp7XCJmb250LXNpemVcIjpcIjExcHhcIixcImxpbmUtaGVpZ2h0XCI6XCIxM3B4XCJ9fSxbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIFVzZXJzIG9mIFJJREwgaGF2ZSByYXRlZCBjb250cmFjdHMgYW5kL29yIGFjdGlvbnMgd2l0aGluIHRoaXMgdHJhbnNhY3Rpb24gbmVnYXRpdmVseS5cXG4gICAgICAgICAgICAgICAgXCIpLF9jKCdiJyxbX3ZtLl92KFwiVGhpcyBkb2VzIG5vdCBtZWFuIGluZGVmaW5pdGVseSB0aGF0IGl0IGlzIGEgc2NhbSwganVzdCB0aGF0IGl0IGlzIGRhbmdlcm91cyBpbiBzb21lIHdheS5cIildKV0pfV1cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwibXVsdGktcGFuZSBwb3BvdXQtd2luZG93XCI+XHJcblxyXG5cclxuICAgICAgICAgICAgPCEtLSBNQUlOIFBBTkVMIC0tPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm1haW4tcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgIDxQb3BPdXRBcHAgOmFwcD1cImFwcERhdGFcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImhhcy1tb3JlXCIgdi1pZj1cImxpbWl0ZWRNZXNzYWdlcy50b3RhbCA+IDFcIj57e2xvY2FsZShsYW5nS2V5cy5QT1BPVVRTLlNJR05BVFVSRS5BY3Rpb25zVG90YWwsbGltaXRlZE1lc3NhZ2VzLnRvdGFsKX19PC9maWd1cmU+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGFydGljaXBhbnRzXCIgdi1pZj1cInBhcnRpY2lwYW50QWNjb3VudHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3tsb2NhbGUobGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuQWNjb3VudHNJbnZvbHZlZCl9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gdi1pZj1cIiFwYXJ0aWNpcGFudHNBc1NlbGVjdG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicGFydGljaXBhbnRcIiB2LWZvcj1cInAgaW4gcGFydGljaXBhbnRBY2NvdW50cy5zbGljZSgwLDIpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3AubmV0d29yaygpLm5hbWV9fSAtIDxiPnt7cC5zZW5kYWJsZSgpfX08L2I+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cIm1vcmUtcGFydGljaXBhbnRzXCIgdi1pZj1cInBhcnRpY2lwYW50QWNjb3VudHMubGVuZ3RoID4gMlwiIEBjbGljaz1cInBhcnRpY2lwYW50c0FzU2VsZWN0b3IgPSB0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAre3twYXJ0aWNpcGFudEFjY291bnRzLmxlbmd0aH19IG1vcmUgYWNjb3VudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3Qgdi1lbHNlIGJvcmRlcmVkPVwiMVwiIDpvcHRpb25zPVwicGFydGljaXBhbnRBY2NvdW50c1wiIDpwYXJzZXI9XCJ4ID0+IGAke3gubmV0d29yaygpLm5hbWV9IC0gJHt4LnNlbmRhYmxlKCl9YFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwYXJ0aWNpcGFudHNcIiB2LWlmPVwiaXNBcmJpdHJhcnlTaWduYXR1cmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3tsb2NhbGUobGFuZ0tleXMuUE9QT1VUUy5TSUdOQVRVUkUuS2V5c0ludm9sdmVkKX19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBhcnRpY2lwYW50XCI+e3thcmJpdHJhcnlLZXlwYWlyLm5hbWV9fTwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImZpeGVkLWFjdGlvbnNcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gdi1pZj1cImlzRGFuZ2Vyb3VzXCIgY2xhc3M9XCJkaXNjbGFpbWVyIGxlc3MtcGFkIHJlZCBjZW50ZXJlZFwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToxMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPbmUgb2YgdGhlIGFjdGlvbnMgaW5jbHVkZWQgd2l0aGluIHRoaXMgdHJhbnNhY3Rpb24gaXMgPGI+ZGFuZ2Vyb3VzPC9iPi5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImFjY2VwdC1kZW55XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gREVOWSBUUkFOU0FDVElPTiAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImxvY2FsZShsYW5nS2V5cy5HRU5FUklDLkRlbnkpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWc9XCIxXCIgdi1pZj1cIiFwaW5uaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlPVwicmV0dXJuUmVzdWx0KGZhbHNlKVwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEFDQ0VQVCBUUkFOU0FDVElPTiAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiA6cmVkPVwiaXNEYW5nZXJvdXMgfHwgKHJlcHV0YXRpb24gJiYgcmVwdXRhdGlvbi5kZWNpbWFsIDwgMClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpZz1cIjFcIiBibHVlPVwiMVwiIHYtaWY9XCIhcGlubmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiY2Fubm90U2lnbkFyYml0cmFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJsb2NhbGUobGFuZ0tleXMuR0VORVJJQy5BbGxvdylcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJhY2NlcHRlZFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG5cclxuICAgICAgICAgICAgPCEtLVNJREUgUEFORUwtLT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzaWRlLXBhbmVsXCIgdi1pZj1cIiFleHBhbmRlZFwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS08c2VjdGlvbiBjbGFzcz1cInZpZXctdHlwZXNcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tPFNlbGVjdCA6c2VsZWN0ZWQ9XCJ2aWV3VHlwZVwiIGJvcmRlcmVkPVwiMVwiLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tOm9wdGlvbnM9XCJ2aWV3VHlwZXNBcnJheVwiLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tOnBhcnNlcj1cInggPT4gZm9ybWF0Vmlld1R5cGUoeClcIi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPCEtLXYtb246c2VsZWN0ZWQ9XCJ4ID0+IHZpZXdUeXBlID0geFwiPjwvU2VsZWN0Pi0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLTwvc2VjdGlvbj4tLT5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm1lc3NhZ2VzLXNjcm9sbGVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxSZXF1aXJlZEZpZWxkcyB2LWlmPVwiIWlzQXJiaXRyYXJ5U2lnbmF0dXJlICYmIChwZXJzb25hbEZpZWxkcy5sZW5ndGggfHwgbG9jYXRpb25GaWVsZHMubGVuZ3RoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZGVudGl0eT1cImlkZW50aXR5XCIgOmZpZWxkcz1cImZpZWxkc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWxlY3RlZC1pZGVudGl0eT1cInNlbGVjdGVkSWRlbnRpdHlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xvbmVkLWxvY2F0aW9uPVwiY2xvbmVkTG9jYXRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c2VsZWN0ZWQtbG9jYXRpb249XCJzZWxlY3RlZExvY2F0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BsaXQtcGFuZWxzPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246c2VsZWN0TG9jYXRpb249XCJ4ID0+IHsgc2VsZWN0ZWRMb2NhdGlvbiA9IHg7IGNsb25lZExvY2F0aW9uID0geC5jbG9uZSgpOyB9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpsb2NhdGlvbkZpZWxkPVwiKGtleSwgdmFsKSA9PiBjbG9uZWRMb2NhdGlvbltrZXldID0gdmFsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpwZXJzb25hbEZpZWxkPVwiKGtleSwgdmFsKSA9PiBzZWxlY3RlZElkZW50aXR5LnBlcnNvbmFsW2tleV0gPSB2YWxcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm1lc3NhZ2VzXCIgOmNsYXNzPVwieydkYW5nZXJvdXMnOmlzRGFuZ2Vyb3VzIHx8IChyZXB1dGFibGUobWVzc2FnZSkgJiYgcmVwdXRhYmxlKG1lc3NhZ2UpLmRlY2ltYWwgPCAwKX1cIiA6cmVmPVwiYG1lc3NhZ2VfJHtpbmRleH1gXCIgdi1mb3I9XCIobWVzc2FnZSwgaW5kZXgpIGluIG1lc3NhZ2VzXCI+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ3aGl0ZWxpc3Qtb3ZlcmxheVwiIHYtaWY9XCJpc1ByZXZpb3VzbHlXaGl0ZWxpc3RlZChtZXNzYWdlKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiaW5mb1wiPnt7bG9jYWxlKGxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLlByZXZpb3VzbHlXaGl0ZWxpc3RlZCl9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiA6Y2xhc3M9XCJ7J3ByZXZpb3VzLXdoaXRlbGlzdCc6aXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSl9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJkZXRhaWxzIGNvbnRyYWN0LWFjdGlvblwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImRhbmdlciB3aWdnbGVcIiB2LWlmPVwiaXNEYW5nZXJvdXNcIiB2LXRvb2x0aXAucmlnaHQ9XCJ7Y29udGVudDppc0Rhbmdlcm91cywgY2xhc3NlczpbJ2RhbmdlcnRpcCddfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24taGVscFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1pZj1cIndoaXRlbGlzdGVkICYmICFpc1ByZXZpb3VzbHlXaGl0ZWxpc3RlZChtZXNzYWdlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2hlY2tlZD1cIiEhZ2V0V2hpdGVsaXN0KG1lc3NhZ2UpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwiYWRkV2hpdGVsaXN0KG1lc3NhZ2UpXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZXB1dGF0aW9uU2NvcmUgY2xhc3M9XCJzY29yZVwiIDpyZXB1dGFibGU9XCJyZXB1dGFibGUobWVzc2FnZSlcIiBzbWFsbD1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XCJjb2xsYXBzZShtZXNzYWdlKVwiPnt7bWVzc2FnZS5jb2RlfX0gPGkgY2xhc3M9XCJjb250cmFjdC1zcGxpdCBpY29uLXJpZ2h0LW9wZW4tYmlnXCI+PC9pPiB7e21lc3NhZ2UudHlwZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGFuZ2VyLXRpdGxlXCIgdi1pZj1cImlzRGFuZ2Vyb3VzXCI+VGhpcyBhY3Rpb24gaXMgPGI+ZGFuZ2Vyb3VzPC9iPiE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gdi1pZj1cIiFpc0NvbGxhcHNlZChtZXNzYWdlKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByb3BlcnRpZXNcIiB2LWZvcj1cIih2YWx1ZSxrZXkpIGluIG1lc3NhZ2UuZGF0YVwiIHYtaWY9XCJ2aWV3VHlwZSA9PT0gVklFV19UWVBFUy5IVU1BTlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3trZXl9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic3BsaXQtaW5wdXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1pZj1cIndoaXRlbGlzdGVkICYmICFpc1ByZXZpb3VzbHlXaGl0ZWxpc3RlZChtZXNzYWdlKVwiIHR5cGU9XCJjaGVja2JveFwiIEBjaGFuZ2U9XCJ0b2dnbGVXaGl0ZWxpc3RQcm9wKGdldFdoaXRlbGlzdChtZXNzYWdlKSwga2V5KVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwidmFsdWUgb2JqZWN0XCIgdi1pZj1cInR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpyZWY9XCJoYXNoKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKSArIGtleSArIGhhc2godmFsdWUpXCIgOnYtaHRtbD1cImZvcm1hdEpzb24odmFsdWUsIGhhc2goSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpK2tleSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cInZhbHVlXCIgdi1lbHNlPnt7dmFsdWV9fTwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicHJvcGVydGllc1wiIHYtaWY9XCJ2aWV3VHlwZSA9PT0gVklFV19UWVBFUy5KU09OXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZSBvYmplY3RcIiA6cmVmPVwiaGFzaChtZXNzYWdlLmRhdGEpXCIgOnYtaHRtbD1cImZvcm1hdEpzb24obWVzc2FnZS5kYXRhKVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByb3BlcnRpZXNcIiB2LWlmPVwidmlld1R5cGUgPT09IFZJRVdfVFlQRVMuUklDQVJESUFOXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjb2xsYXBzZWRcIiB2LWlmPVwiIWhhc1JpY2FyZGlhbkNvbnRyYWN0KG1lc3NhZ2UpXCI+Tm8gUmljYXJkaWFuIENvbnRyYWN0PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJyaWNhcmRpYW5cIiB2LWVsc2U+e3ttZXNzYWdlLnJpY2FyZGlhbn19PC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sbGFwc2VkXCIgdi1lbHNlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7bG9jYWxlKGxhbmdLZXlzLlBPUE9VVFMuU0lHTkFUVVJFLkhpZGRlbkFjdGlvbnMpfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIndoaXRlbGlzdC1iYXJcIiB2LWlmPVwiIWlzQXJiaXRyYXJ5U2lnbmF0dXJlICYmICFpc0Rhbmdlcm91c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ0ZXh0XCIgdi1pZj1cIiF3aGl0ZWxpc3RlZFwiPllvdSBjYW4gd2hpdGVsaXN0IHRoaXMgc28gdGhhdCB5b3UgZG9uJ3QgaGF2ZSB0byBrZWVwIHJlLWFjY2VwdGluZyB0aGlzIHRyYW5zYWN0aW9uLjwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJ0ZXh0IGJsdWVcIiB2LWlmPVwid2hpdGVsaXN0ZWRcIj5DaGVja2JveGVzIHRoYXQgYXJlIGNoZWNrZWQgY2FuIGhhdmUgdGhlaXIgdmFsdWVzIGNoYW5nZWQgd2l0aG91dCBicmVha2luZyB0aGUgd2hpdGVsaXN0LjwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTd2l0Y2hlciA6c3RhdGU9XCJ3aGl0ZWxpc3RlZFwiIEBjbGljay5uYXRpdmU9XCJ3aGl0ZWxpc3RcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcblxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicmlkbC1wb3B1cFwiIHYtaWY9XCJzaG93aW5nUmlkbFdhcm5pbmdcIj5cclxuICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImJnXCIgQGNsaWNrPVwic2hvd2luZ1JpZGxXYXJuaW5nID0gZmFsc2VcIj48L2ZpZ3VyZT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgIDxoMj5EYW5nZXIhPC9oMj5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxMXB4OyBsaW5lLWhlaWdodDogMTNweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICBVc2VycyBvZiBSSURMIGhhdmUgcmF0ZWQgY29udHJhY3RzIGFuZC9vciBhY3Rpb25zIHdpdGhpbiB0aGlzIHRyYW5zYWN0aW9uIG5lZ2F0aXZlbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgPGI+VGhpcyBkb2VzIG5vdCBtZWFuIGluZGVmaW5pdGVseSB0aGF0IGl0IGlzIGEgc2NhbSwganVzdCB0aGF0IGl0IGlzIGRhbmdlcm91cyBpbiBzb21lIHdheS48L2I+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDlweDtcIj5SZWxhdGVkIEVudGl0aWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJsaW5rXCIgdi1mb3I9XCJyZXB1dGFibGUgaW4gcmVwdXRhdGlvbi5yZXB1dGFibGVzLmZpbHRlcih4ID0+IHguZGVjaW1hbCA8IDApXCIgQGNsaWNrPVwib3BlbkluQnJvd3NlcihyaWRsTGluayhyZXB1dGFibGUpKVwiPlZpZXcgPGI+e3tyZXB1dGFibGUuZW50aXR5fX08L2I+IG9uIFJJREwuPC9pPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHsgbWFwQWN0aW9ucywgbWFwR2V0dGVycywgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG4gICAgaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICdAd2FsbGV0cGFjay9jb3JlL3N0b3JlL2NvbnN0YW50cyc7XHJcblx0aW1wb3J0IFJlcHV0YXRpb25TY29yZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JldXNhYmxlL1JlcHV0YXRpb25TY29yZSc7XHJcblx0aW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JldXNhYmxlL1NlYXJjaEJhcic7XHJcblx0aW1wb3J0IEpTT05Gb3JtYXR0ZXIgZnJvbSAnanNvbi1mb3JtYXR0ZXItanMnXHJcblx0aW1wb3J0IEhhc2hlciBmcm9tIFwiQHdhbGxldHBhY2svY29yZS91dGlsL0hhc2hlclwiO1xyXG5cdGltcG9ydCBBY2NvdW50IGZyb20gXCJAd2FsbGV0cGFjay9jb3JlL21vZGVscy9BY2NvdW50XCI7XHJcblx0aW1wb3J0IFBvcHVwU2VydmljZSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXRpbGl0eS9Qb3B1cFNlcnZpY2VcIjtcclxuXHRpbXBvcnQge1BvcHVwfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3BvcHVwcy9Qb3B1cFwiO1xyXG5cdGltcG9ydCBQZXJtaXNzaW9uU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9hcHBzL1Blcm1pc3Npb25TZXJ2aWNlXCI7XHJcblx0aW1wb3J0IHtCbG9ja2NoYWluc30gZnJvbSBcIkB3YWxsZXRwYWNrL2NvcmUvbW9kZWxzL0Jsb2NrY2hhaW5zXCI7XHJcblx0aW1wb3J0IHtJZGVudGl0eVJlcXVpcmVkRmllbGRzfSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9tb2RlbHMvSWRlbnRpdHlcIjtcclxuXHRpbXBvcnQgUmVxdWlyZWRGaWVsZHMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcG9wb3V0cy9SZXF1aXJlZEZpZWxkc1wiO1xyXG5cdGltcG9ydCBLZXlQYWlyU2VydmljZSBmcm9tIFwiQHdhbGxldHBhY2svY29yZS9zZXJ2aWNlcy9zZWN1cmUvS2V5UGFpclNlcnZpY2VcIjtcclxuXHRpbXBvcnQgUklETFNlcnZpY2UsIHtSSURMX0FQSX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3V0aWxpdHkvUklETFNlcnZpY2VcIjtcclxuXHRpbXBvcnQgUG9wT3V0QXBwIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3BvcG91dHMvUG9wT3V0QXBwXCI7XHJcblxyXG5cdGNvbnN0IFZJRVdfVFlQRVMgPSB7XHJcblx0ICAgIEhVTUFOOidodW1hbicsXHJcbiAgICAgICAgSlNPTjonanNvbicsXHJcbiAgICAgICAgUklDQVJESUFOOidyaWNhcmRpYW4nLFxyXG4gICAgfTtcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6Wydwb3B1cCcsICdleHBhbmRlZCcsICdwaW5uaW5nJ10sXHJcblx0XHRjb21wb25lbnRzOntcclxuXHRcdFx0UG9wT3V0QXBwLFxyXG5cdFx0XHRSZXB1dGF0aW9uU2NvcmUsXHJcblx0XHRcdFJlcXVpcmVkRmllbGRzLFxyXG5cdFx0XHRTZWFyY2hCYXIsXHJcblx0XHR9LFxyXG5cdFx0ZGF0YSAoKSB7cmV0dXJuIHtcclxuXHRcdFx0QmxvY2tjaGFpbnMsXHJcbiAgICAgICAgICAgIHdoaXRlbGlzdGVkOmZhbHNlLFxyXG5cdFx0XHR3aGl0ZWxpc3RzOltdLFxyXG5cdFx0XHRhY3Rpb25MaXN0OltdLFxyXG5cclxuICAgICAgICAgICAgdmlld1R5cGU6VklFV19UWVBFUy5IVU1BTixcclxuICAgICAgICAgICAgVklFV19UWVBFUyxcclxuXHJcblx0XHRcdHNlbGVjdGVkSWRlbnRpdHk6bnVsbCxcclxuXHRcdFx0c2VsZWN0ZWRMb2NhdGlvbjpudWxsLFxyXG5cdFx0XHRjbG9uZWRMb2NhdGlvbjpudWxsLFxyXG5cdFx0XHRoaWRlQ2xvc2VCdXR0b246ZmFsc2UsXHJcblxyXG5cdFx0XHRyZXB1dGF0aW9uOm51bGwsXHJcbiAgICAgICAgICAgIHNob3dpbmdSaWRsV2FybmluZzpmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHBhcnRpY2lwYW50c0FzU2VsZWN0b3I6ZmFsc2UsXHJcblx0XHR9fSxcclxuXHRcdGNyZWF0ZWQoKXtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZElkZW50aXR5ID0gdGhpcy5pZGVudGl0eS5jbG9uZSgpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkTG9jYXRpb24gPSB0aGlzLnNlbGVjdGVkSWRlbnRpdHkuZ2V0TG9jYXRpb24oKSB8fCB0aGlzLmxvY2F0aW9uc1swXTtcclxuXHRcdFx0dGhpcy5jbG9uZWRMb2NhdGlvbiA9IHRoaXMuc2VsZWN0ZWRMb2NhdGlvbi5jbG9uZSgpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChhc3luYygpID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmdSZXB1dGF0aW9uID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLnJlcHV0YXRpb24gPSBhd2FpdCBSSURMU2VydmljZS5jaGVja0NvbnRyYWN0cyh0aGlzLnBheWxvYWQubmV0d29yaywgdGhpcy5tZXNzYWdlcyk7XHJcblx0XHRcdFx0aWYodGhpcy5yZXB1dGF0aW9uICYmIHRoaXMucmVwdXRhdGlvbi5kZWNpbWFsIDwgMCkgdGhpcy5zaG93aW5nUmlkbFdhcm5pbmcgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMubG9hZGluZ1JlcHV0YXRpb24gPSBmYWxzZTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fSxcclxuXHRcdGNvbXB1dGVkOiB7XHJcblx0XHRcdC4uLm1hcFN0YXRlKFtcclxuXHRcdFx0XHQnc2NhdHRlcicsXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQnaWRlbnRpdHknLFxyXG5cdFx0XHRcdCdpZGVudGl0aWVzJyxcclxuXHRcdFx0XHQnYWNjb3VudHMnLFxyXG5cdFx0XHRcdCduZXR3b3JrcycsXHJcbiAgICAgICAgICAgICAgICAnbG9jYXRpb25zJyxcclxuXHRcdFx0XSksXHJcblxyXG5cclxuXHRcdFx0YXBwRGF0YSgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBvcHVwLmRhdGEucHJvcHMuYXBwRGF0YTtcclxuXHRcdFx0fSxcclxuXHJcbiAgICAgICAgICAgIHZpZXdUeXBlc0FycmF5KCl7XHJcblx0XHRcdCAgICBjb25zdCBoYXNFb3MgPSAhdGhpcy5pc0FyYml0cmFyeVNpZ25hdHVyZSAmJiAhIXRoaXMucGF5bG9hZC5wYXJ0aWNpcGFudHMuZmluZCh4ID0+IEFjY291bnQuZnJvbUpzb24oeCkuYmxvY2tjaGFpbigpID09PSBCbG9ja2NoYWlucy5FT1NJTyk7XHJcblx0XHRcdCAgICBjb25zdCBhcnJNYXAgPSBbVklFV19UWVBFUy5IVU1BTiwgVklFV19UWVBFUy5KU09OXTtcclxuXHRcdFx0ICAgIGlmKGhhc0VvcykgYXJyTWFwLnB1c2goVklFV19UWVBFUy5SSUNBUkRJQU4pO1xyXG5cdFx0XHQgICAgcmV0dXJuIGFyck1hcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGF5bG9hZCgpeyByZXR1cm4gdGhpcy5wb3B1cC5wYXlsb2FkKCk7IH0sXHJcblx0XHRcdHBhcnRpY2lwYW50QWNjb3VudHMoKXtcclxuXHRcdFx0XHRpZighdGhpcy5wYXlsb2FkLmhhc093blByb3BlcnR5KCdwYXJ0aWNpcGFudHMnKSkgcmV0dXJuIG51bGw7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGF5bG9hZC5wYXJ0aWNpcGFudHMubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIEFjY291bnQuZnJvbUpzb24oeCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXNzYWdlcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnBheWxvYWQubWVzc2FnZXM7XHJcblx0XHRcdH0sXHJcbiAgICAgICAgICAgIGxpbWl0ZWRNZXNzYWdlcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFx0YWN0aW9uczp0aGlzLm1lc3NhZ2VzLnNsaWNlKDAsIDMpLm1hcCh4ID0+IHgudHlwZSkuam9pbignLCAnKSxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbDp0aGlzLm1lc3NhZ2VzLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cdFx0XHRpc0FyYml0cmFyeVNpZ25hdHVyZSgpe1xyXG5cdFx0XHRcdHJldHVybiAhdGhpcy5wYXlsb2FkLmhhc093blByb3BlcnR5KCdwYXJ0aWNpcGFudHMnKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIElkZW50aXR5UmVxdWlyZWRGaWVsZHMuZnJvbUpzb24odGhpcy5wYXlsb2FkLnJlcXVpcmVkRmllbGRzIHx8IHt9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cGVyc29uYWxGaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMucGVyc29uYWw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGxvY2F0aW9uRmllbGRzKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZmllbGRzLmxvY2F0aW9uO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRtaXNzaW5nRmllbGRzKCl7XHJcblx0XHRcdFx0aWYoIXRoaXMucGVyc29uYWxGaWVsZHMubGVuZ3RoICYmICF0aGlzLmxvY2F0aW9uRmllbGRzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdHJldHVybiAhdGhpcy5pZGVudGl0eS5oYXNSZXF1aXJlZEZpZWxkcyh0aGlzLmZpZWxkcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGlzVmFsaWRJZGVudGl0eSgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZElkZW50aXR5Lmhhc1JlcXVpcmVkRmllbGRzKHRoaXMuZmllbGRzLCB0aGlzLmNsb25lZExvY2F0aW9uKTtcclxuXHRcdFx0fSxcclxuICAgICAgICAgICAgYXJiaXRyYXJ5S2V5cGFpcigpe1xyXG5cdCAgICAgICAgICAgIHJldHVybiBLZXlQYWlyU2VydmljZS5nZXRLZXlQYWlyRnJvbVB1YmxpY0tleSh0aGlzLnBheWxvYWQucHVibGljS2V5KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2Fubm90U2lnbkFyYml0cmFyeSgpe1xyXG5cdFx0XHRcdGlmKCF0aGlzLmlzQXJiaXRyYXJ5U2lnbmF0dXJlKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGF5bG9hZC5tZXNzYWdlc1swXS5kYXRhLnNpZ25pbmcuc3BsaXQoJyAnKS5zb21lKHggPT4geC5sZW5ndGggPiAxMik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzRGFuZ2Vyb3VzKCl7XHJcblx0XHRcdFx0aWYodGhpcy5tZXNzYWdlcy5maW5kKHggPT4geC5jb2RlID09PSAnZW9zaW8nICYmIHgudHlwZSA9PT0gJ3VwZGF0ZWF1dGgnKSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gYFRoaXMgYWN0aW9uIGlzIGRhbmdlcm91cy4gQWNjZXB0aW5nIGl0IHdpbGwgY2hhbmdlIHlvdXIga2V5cyBhbmQgcG9zc2libHkgZ2l2ZSB5b3VyIGFjY291bnQgdG8gc29tZW9uZSBlbHNlLiA8YnI+PGJyPjxiPkNoZWNrIHRvIG1ha2Ugc3VyZSB0aGUga2V5cyBhcmUgY29ycmVjdC48L2I+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdHJldHVyblJlc3VsdChyZXN1bHQpe1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoJ3JldHVybmVkJywgcmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHJcbiAgICAgICAgICAgIHJlcHV0YWJsZShtZXNzYWdlKXtcclxuXHRcdFx0XHRpZighdGhpcy5yZXB1dGF0aW9uKSByZXR1cm47XHJcblx0XHRcdCAgICByZXR1cm4gdGhpcy5yZXB1dGF0aW9uLnJlcHV0YWJsZXMuZmluZCh4ID0+IHguY29kZSA9PT0gYCR7bWVzc2FnZS5jb2RlfSR7bWVzc2FnZS50eXBlfWApO1xyXG4gICAgICAgICAgICB9LFxyXG5cdFx0XHRyaWRsTGluayhyZXB1dGFibGUpe1xyXG5cdFx0XHQgICAgcmV0dXJuIGAke1JJRExfQVBJfS9yZXB1dGFibGU/aWQ9JHtyZXB1dGFibGUuaWR9YFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZm9ybWF0Vmlld1R5cGUodHlwZSl7XHJcblx0XHRcdCAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWSUVXX1RZUEVTLkhVTUFOOiByZXR1cm4gJ0h1bWFuIFJlYWRhYmxlJztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFZJRVdfVFlQRVMuSlNPTjogcmV0dXJuICdKU09OIEZvcm1hdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWSUVXX1RZUEVTLlJJQ0FSRElBTjogcmV0dXJuICdSaWNhcmRpYW4gQ29udHJhY3RzJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcblx0XHRcdGNvbGxhcHNlKG1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3Rpb24obWVzc2FnZSwgJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0NvbGxhcHNlZChtZXNzYWdlKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hY3Rpb25MaXN0LmZpbmQoeCA9PiB4ID09PSB0aGlzLmdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgJ2NvbGxhcHNlZCcpKVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHRcdFx0YXN5bmMgYWNjZXB0ZWQoKXtcclxuXHRcdFx0XHR0aGlzLnJldHVyblJlc3VsdCh7XHJcblx0XHRcdFx0XHR3aGl0ZWxpc3RzOnRoaXMud2hpdGVsaXN0cyxcclxuXHJcblx0XHRcdFx0XHRpZGVudGl0eTp0aGlzLnNlbGVjdGVkSWRlbnRpdHksXHJcblx0XHRcdFx0XHRsb2NhdGlvbjp0aGlzLmNsb25lZExvY2F0aW9uLFxyXG5cdFx0XHRcdFx0bWlzc2luZ0ZpZWxkczp0aGlzLm1pc3NpbmdGaWVsZHMsXHJcblxyXG5cdFx0XHRcdFx0YWNjZXB0ZWQ6dHJ1ZSxcclxuXHRcdFx0XHRcdG5lZWRSZXNvdXJjZXM6ZmFsc2UsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoYXNoKGpzb24pe1xyXG5cdFx0XHRcdHJldHVybiBIYXNoZXIudW5zYWx0ZWRRdWlja0hhc2goSlNPTi5zdHJpbmdpZnkoanNvbikpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRmb3JtYXRKc29uKGpzb24sIGtleSA9IG51bGwpe1xyXG5cdFx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlZktleSA9IChrZXkgPyBrZXkgOiAnJykgKyB0aGlzLmhhc2goanNvbik7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gbmV3IEpTT05Gb3JtYXR0ZXIoanNvbiwgOTk5OTksIHtcclxuXHRcdFx0XHRcdFx0aG92ZXJQcmV2aWV3RW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0aG92ZXJQcmV2aWV3QXJyYXlDb3VudDogMTAsXHJcblx0XHRcdFx0XHRcdGhvdmVyUHJldmlld0ZpZWxkQ291bnQ6IDUsXHJcblx0XHRcdFx0XHRcdHVzZVRvSlNPTjogdHJ1ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRjb25zdCBlbGVtID0gdGhpcy4kcmVmc1tyZWZLZXldWzBdO1xyXG5cdFx0XHRcdFx0aWYoZWxlbS5jaGlsZHJlbi5sZW5ndGggPj0gMSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0ZWxlbS5hcHBlbmRDaGlsZChmb3JtYXR0ZXIucmVuZGVyKCkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d2hpdGVsaXN0KCl7XHJcblx0XHRcdFx0dGhpcy53aGl0ZWxpc3RlZCA9ICF0aGlzLndoaXRlbGlzdGVkO1xyXG5cdFx0XHRcdHRoaXMubWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSkpIHRoaXMuYWRkV2hpdGVsaXN0KG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH0pXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cclxuXHRcdFx0Z2V0TWVzc2FnZVVuaXF1ZShtZXNzYWdlLCBhY3Rpb24pe1xyXG5cdFx0XHRcdHJldHVybiBgJHttZXNzYWdlLmNvZGV9OiR7bWVzc2FnZS50eXBlfToke2FjdGlvbn1gXHJcblx0XHRcdH0sXHJcblx0XHRcdGdldFdoaXRlbGlzdChtZXNzYWdlKXtcclxuXHRcdFx0XHRjb25zdCB1bmlxdWUgPSB0aGlzLmdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgJ3doaXRlbGlzdCcpO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLndoaXRlbGlzdHMuZmluZCh4ID0+IHgudW5pcXVlID09PSB1bmlxdWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0b2dnbGVBY3Rpb24obWVzc2FnZSwgYWN0aW9uKXtcclxuXHRcdFx0XHRjb25zdCB1bmlxdWUgPSB0aGlzLmdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgYWN0aW9uKTtcclxuXHRcdFx0XHRpZih0aGlzLmFjdGlvbkxpc3QuaW5jbHVkZXModW5pcXVlKSkgdGhpcy5hY3Rpb25MaXN0ID0gdGhpcy5hY3Rpb25MaXN0LmZpbHRlcih4ID0+IHggIT09IHVuaXF1ZSk7XHJcblx0XHRcdFx0ZWxzZSB0aGlzLmFjdGlvbkxpc3QucHVzaCh1bmlxdWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXRBY3Rpb24obWVzc2FnZSwgYWN0aW9uKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hY3Rpb25MaXN0LmZpbmQoeCA9PiB4ID09PSB0aGlzLmdldE1lc3NhZ2VVbmlxdWUobWVzc2FnZSwgYWN0aW9uKSlcclxuXHRcdFx0fSxcclxuXHRcdFx0YWRkV2hpdGVsaXN0KG1lc3NhZ2Upe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNQcmV2aW91c2x5V2hpdGVsaXN0ZWQobWVzc2FnZSkpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0dGhpcy50b2dnbGVBY3Rpb24obWVzc2FnZSwgJ3doaXRlbGlzdCcpO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXF1ZSA9IHRoaXMuZ2V0TWVzc2FnZVVuaXF1ZShtZXNzYWdlLCAnd2hpdGVsaXN0Jyk7XHJcblx0XHRcdFx0Y29uc3Qgd2hpdGVsaXN0ID0ge3VuaXF1ZSwgcHJvcHM6W10sIGNvZGU6bWVzc2FnZS5jb2RlLCB0eXBlOm1lc3NhZ2UudHlwZSwgZmllbGRzOm1lc3NhZ2UuZGF0YX07XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMud2hpdGVsaXN0cy5maW5kKHggPT4geC51bmlxdWUgPT09IHdoaXRlbGlzdC51bmlxdWUpKVxyXG5cdFx0XHRcdFx0IHRoaXMud2hpdGVsaXN0cyA9IHRoaXMud2hpdGVsaXN0cy5maWx0ZXIoeCA9PiB4LnVuaXF1ZSAhPT0gdW5pcXVlKTtcclxuXHRcdFx0XHRlbHNlIHRoaXMud2hpdGVsaXN0cy5wdXNoKHdoaXRlbGlzdCk7XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMud2hpdGVsaXN0cy5sZW5ndGggPT09IDApIHRoaXMud2hpdGVsaXN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0fSxcclxuXHRcdFx0dG9nZ2xlV2hpdGVsaXN0UHJvcCh3aGl0ZWxpc3QsIHByb3Ape1xyXG5cdFx0XHRcdGlmKHdoaXRlbGlzdC5wcm9wcy5pbmNsdWRlcyhwcm9wKSlcclxuXHRcdFx0XHRcdHdoaXRlbGlzdC5wcm9wcyA9IHdoaXRlbGlzdC5wcm9wcy5maWx0ZXIoeCA9PiB4ICE9PSBwcm9wKTtcclxuXHRcdFx0XHRlbHNlIHdoaXRlbGlzdC5wcm9wcy5wdXNoKHByb3ApO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc1ByZXZpb3VzbHlXaGl0ZWxpc3RlZChtZXNzYWdlKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzQXJiaXRyYXJ5U2lnbmF0dXJlKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0cmV0dXJuIFBlcm1pc3Npb25TZXJ2aWNlLmhhc0FjdGlvblBlcm1pc3Npb24odGhpcy5wYXlsb2FkLm9yaWdpbiwgdGhpcy5pZGVudGl0eSwgdGhpcy5wYXJ0aWNpcGFudEFjY291bnRzLCBtZXNzYWdlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0aGFzUmljYXJkaWFuQ29udHJhY3QobWVzc2FnZSl7XHJcblx0XHRcdFx0cmV0dXJuIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoJ3JpY2FyZGlhbicpICYmIG1lc3NhZ2UucmljYXJkaWFuLmxlbmd0aFxyXG5cdFx0XHR9LFxyXG5cclxuICAgICAgICAgICAgLi4ubWFwQWN0aW9ucyhbXHJcbiAgICAgICAgICAgIFx0QWN0aW9ucy5BRERfUkVTT1VSQ0VTXHJcbiAgICAgICAgICAgIF0pXHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIiByZWw9XCJzdHlsZXNoZWV0L3Njc3NcIj5cclxuICAgIEBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzXCI7XHJcblxyXG4gICAgLmFwcC1kZXRhaWxzIHtcclxuICAgICAgICBwYWRkaW5nOjYwcHggNjBweCAzMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5yaWRsLXBvcHVwIHtcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgdG9wOjc5cHg7XHJcbiAgICAgICAgbGVmdDowO1xyXG4gICAgICAgIHJpZ2h0OjA7XHJcbiAgICAgICAgYm90dG9tOjA7XHJcbiAgICAgICAgei1pbmRleDo5OTk5O1xyXG4gICAgICAgIGRpc3BsYXk6ZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICAgICAuYmcge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgICAgICAgICAgdG9wOjA7XHJcbiAgICAgICAgICAgIGJvdHRvbTowO1xyXG4gICAgICAgICAgICBsZWZ0OjA7XHJcbiAgICAgICAgICAgIHJpZ2h0OjA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAwLjgpO1xyXG4gICAgICAgICAgICB6LWluZGV4Oi0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmJveCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6I2ZmZjtcclxuICAgICAgICAgICAgcGFkZGluZzozMHB4O1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICAgICAgbWluLXdpZHRoOjI1MHB4O1xyXG4gICAgICAgICAgICBtYXgtd2lkdGg6NDUwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6MCAwIDAgM3B4IHJlZCwgMCAwIDAgNnB4IHdoaXRlO1xyXG5cclxuICAgICAgICAgICAgLmxpbmsge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTpibG9jaztcclxuICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC52aWV3LXR5cGVzIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgbWFyZ2luLXRvcDotMTBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDotMzBweDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6LTMwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDojZmZmO1xyXG4gICAgICAgIHBhZGRpbmc6MTBweDtcclxuICAgICAgICBib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDUpLCAwIDEwcHggMjBweCByZ2JhKDAsMCwwLDAuMDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0W3R5cGU9Y2hlY2tib3hdIHtcclxuICAgICAgICBmbGV4OjAgMCBhdXRvO1xyXG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OjEwcHg7XHJcbiAgICAgICAgd2lkdGg6MjBweDtcclxuICAgICAgICBoZWlnaHQ6MjBweDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLmhhcy1tb3JlIHtcclxuICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICBmb250LXNpemU6JHNtYWxsO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIGNvbG9yOiRzaWx2ZXI7XHJcbiAgICAgICAgYm9yZGVyOjFweCBzb2xpZCAkZ3JleTtcclxuICAgICAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgICAgIHBhZGRpbmc6NXB4IDhweDtcclxuICAgICAgICBtYXJnaW46LTI1cHggYXV0byAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZXNzYWdlcyB7XHJcbiAgICAgICAgcGFkZGluZzoyMHB4IDAgMjBweDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAgICY6bm90KDpmaXJzdC1jaGlsZCl7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6NjBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5wcmV2aW91cy13aGl0ZWxpc3Qge1xyXG4gICAgICAgICAgICBvcGFjaXR5OjAuNDtcclxuICAgICAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jb2xsYXBzZWQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLXRvcDoxMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAud2hpdGVsaXN0LW92ZXJsYXkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgICAgICAgICAgdG9wOjUwcHg7XHJcbiAgICAgICAgICAgIHJpZ2h0OjA7XHJcbiAgICAgICAgICAgIHotaW5kZXg6MjtcclxuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgICAgIC5ib3gge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6MTUwcHg7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjIwcHg7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiNmZmY7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICAgICAgICAgIC8vYm9yZGVyOjFweCBzb2xpZCAkcHJpbWFyeTtcclxuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6MCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKSwgMCAxMHB4IDIwcHggcmdiYSgwLDAsMCwwLjAzKTtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZGV0YWlscyB7XHJcbiAgICAgICAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmNvbnRyYWN0LXNwbGl0IHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MCA1cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYm91bmNlIDAuN3MgaW5maW5pdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcclxuICAgICAgICAgICAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMnB4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA1MCUge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKDJweCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucHJvcGVydGllcyB7XHJcblxyXG4gICAgICAgICAgICAucmljYXJkaWFuIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA1KTtcclxuICAgICAgICAgICAgICAgIGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjE1KTtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MTBweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTo1cHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdy14OmF1dG87XHJcbiAgICAgICAgICAgICAgICBtaW4taGVpZ2h0OjE2cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuXHJcbiAgICAgICAgICAgICAgICAmLm9iamVjdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICY6bm90KDpsYXN0LWNoaWxkKXtcclxuICAgICAgICAgICAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbToyMHB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmRhbmdlcm91cyB7XHJcblxyXG4gICAgICAgICAgICAuZGFuZ2VyIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjZweCA1cHggNXB4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93Omluc2V0IDAgNXB4IDEwcHggcmdiYSgwLDAsMCwwLjEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1zaGFkb3c6MCAycHggMCByZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOjdweDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDoxMHB4O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLmRldGFpbHMge1xyXG4gICAgICAgICAgICAgICAgJi5jb250cmFjdC1hY3Rpb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6cmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6JHJlZC1ncmFkaWVudDtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCBkYXJrcmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiNmZmY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5kYW5nZXItdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cge1xyXG4gICAgICAgIHBhZGRpbmc6MDtcclxuICAgIH1cclxuXHJcbiAgICAuY29udHJhY3QtYWN0aW9uIHtcclxuICAgICAgICBtYXJnaW46LTIwcHggLTMwcHggMDtcclxuICAgICAgICBib3JkZXItdG9wOjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDQpO1xyXG4gICAgICAgIHBhZGRpbmc6MjBweCAzMHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6JGJsdWUtZ3JhZGllbnQ7XHJcbiAgICAgICAgY29sb3I6JHdoaXRlO1xyXG5cclxuICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG48L3N0eWxlPlxyXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NpZ25hdHVyZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1NpZ25hdHVyZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDI1ZTA2OGUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDI1ZTA2OGUmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDI1ZTA2OGVcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wYTI5YTNmZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImFwcC1kZXRhaWxzXCJ9LFsoIV92bS51bnRydXN0ZWQpP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ29cIixjbGFzczp7J2JvcmRlcic6X3ZtLmFwcC5hcHBsaW5rICE9PSAnU2NhdHRlcicgJiYgIV92bS5hcHAuaW1nfX0sWyhfdm0uYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJyk/X2MoJ1NjYXR0ZXInKTooX3ZtLmFwcC5pbWcpP19jKCdpbWcnLHthdHRyczp7XCJzcmNcIjpfdm0uYXBwLmltZ319KTpfYygnc3BhbicsW192bS5fdihcIk5vIEltYWdlXCIpXSldLDEpOl9jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcImxvZ28gc2NhbVwifSxbX2MoJ2knLHtzdGF0aWNDbGFzczpcImljb24tYXR0ZW50aW9uXCJ9KV0pLF92bS5fdihcIiBcIiksKF92bS5yaWRsRW5hYmxlZCAmJiBfdm0uYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJyk/X2MoJ3NlY3Rpb24nLFsoX3ZtLmFwcFJlcHV0YXRpb24gPT09IGZhbHNlKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uXCJ9LFtfYygnaScse3N0YXRpY0NsYXNzOlwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIn0pLF92bS5fdihcIiBsb2FkaW5nIHJlcHV0YXRpb25cIildKTpfYygnc2VjdGlvbicsWyhfdm0udW5rbm93blJlcHV0YXRpb24pP19jKCdmaWd1cmUnLHtzdGF0aWNDbGFzczpcInJlcHV0YXRpb25cIn0sW192bS5fdihcIlVua25vd24gUmVwdXRhdGlvblwiKV0pOl92bS5fZSgpLF92bS5fdihcIiBcIiksKF92bS50cnVzdGVkKT9fYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJyZXB1dGF0aW9uIHRydXN0ZWRcIn0sW192bS5fdihcIlRydXN0d29ydGh5XCIpXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSwoX3ZtLnVudHJ1c3RlZCk/X2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwicmVwdXRhdGlvbiB1bnRydXN0ZWRcIn0sW192bS5fdihcIktub3duIFNjYW1cIildKTpfdm0uX2UoKV0pXSk6X3ZtLl9lKCksX3ZtLl92KFwiIFwiKSxfYygnZmlndXJlJyx7c3RhdGljQ2xhc3M6XCJuYW1lXCJ9LFtfYygnYicsW192bS5fdihfdm0uX3MoX3ZtLmFwcC5uYW1lKSldKSxfdm0uX3YoXCIgXCIpLChfdm0uc3VmZml4KT9fYygnc3BhbicsW192bS5fdihfdm0uX3MoX3ZtLnN1ZmZpeCkpXSk6X3ZtLl9lKCldKV0pfVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCI8dGVtcGxhdGU+XHJcblx0PCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG5cdDwhLS0tLS0tLS0tLS0tIEFQUCBERVRBSUxTIC0tLS0tLS0tLS0tLT5cclxuXHQ8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcblx0PHNlY3Rpb24gY2xhc3M9XCJhcHAtZGV0YWlsc1wiPlxyXG5cdFx0PGZpZ3VyZSBjbGFzcz1cImxvZ29cIiB2LWlmPVwiIXVudHJ1c3RlZFwiIDpjbGFzcz1cInsnYm9yZGVyJzphcHAuYXBwbGluayAhPT0gJ1NjYXR0ZXInICYmICFhcHAuaW1nfVwiPlxyXG5cdFx0XHQ8U2NhdHRlciB2LWlmPVwiYXBwLmFwcGxpbmsgPT09ICdTY2F0dGVyJ1wiIC8+XHJcblx0XHRcdDxpbWcgdi1lbHNlLWlmPVwiYXBwLmltZ1wiIDpzcmM9XCJhcHAuaW1nXCIgLz5cclxuXHRcdFx0PHNwYW4gdi1lbHNlPk5vIEltYWdlPC9zcGFuPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibG9nbyBzY2FtXCIgdi1lbHNlPlxyXG5cdFx0XHQ8aSBjbGFzcz1cImljb24tYXR0ZW50aW9uXCI+PC9pPlxyXG5cdFx0PC9maWd1cmU+XHJcblx0XHQ8c2VjdGlvbiB2LWlmPVwicmlkbEVuYWJsZWQgJiYgYXBwLmFwcGxpbmsgIT09ICdTY2F0dGVyJ1wiPlxyXG5cdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvblwiIHYtaWY9XCJhcHBSZXB1dGF0aW9uID09PSBmYWxzZVwiPjxpIGNsYXNzPVwiaWNvbi1zcGluNCBhbmltYXRlLXNwaW5cIj48L2k+IGxvYWRpbmcgcmVwdXRhdGlvbjwvZmlndXJlPlxyXG5cdFx0XHQ8c2VjdGlvbiB2LWVsc2U+XHJcblx0XHRcdFx0PGZpZ3VyZSBjbGFzcz1cInJlcHV0YXRpb25cIiB2LWlmPVwidW5rbm93blJlcHV0YXRpb25cIj5Vbmtub3duIFJlcHV0YXRpb248L2ZpZ3VyZT5cclxuXHRcdFx0XHQ8ZmlndXJlIGNsYXNzPVwicmVwdXRhdGlvbiB0cnVzdGVkXCIgdi1pZj1cInRydXN0ZWRcIj5UcnVzdHdvcnRoeTwvZmlndXJlPlxyXG5cdFx0XHRcdDxmaWd1cmUgY2xhc3M9XCJyZXB1dGF0aW9uIHVudHJ1c3RlZFwiIHYtaWY9XCJ1bnRydXN0ZWRcIj5Lbm93biBTY2FtPC9maWd1cmU+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHQ8ZmlndXJlIGNsYXNzPVwibmFtZVwiPjxiPnt7YXBwLm5hbWV9fTwvYj4gPHNwYW4gdi1pZj1cInN1ZmZpeFwiPnt7c3VmZml4fX08L3NwYW4+PC9maWd1cmU+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQge21hcFN0YXRlLCBtYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcclxuXHRpbXBvcnQgU2NhdHRlciBmcm9tICcuLi9zdmdzL1NjYXR0ZXJPdXRsaW5lJ1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRjb21wb25lbnRzOntTY2F0dGVyfSxcclxuXHRcdHByb3BzOlsnYXBwJywgJ3N1ZmZpeCddLFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cdFx0XHQuLi5tYXBTdGF0ZShbXHJcblx0XHRcdFx0J2FwcFJlcHV0YXRpb24nXHJcblx0XHRcdF0pLFxyXG5cdFx0XHQuLi5tYXBHZXR0ZXJzKFtcclxuXHRcdFx0XHQncmlkbEVuYWJsZWQnLFxyXG5cdFx0XHRdKSxcclxuXHRcdFx0dW5rbm93blJlcHV0YXRpb24oKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uID09PSB1bmRlZmluZWQ7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpID4gMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR1bnRydXN0ZWQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBSZXB1dGF0aW9uICYmIHBhcnNlRmxvYXQodGhpcy5hcHBSZXB1dGF0aW9uLmRlY2ltYWwpIDwgMFxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LnJlcHV0YXRpb24ge1xyXG5cdFx0cGFkZGluZzo1cHggMTJweDtcclxuXHRcdGZvbnQtc2l6ZTogJHNtYWxsO1xyXG5cdFx0bWFyZ2luLWJvdHRvbToxMHB4O1xyXG5cdFx0bWFyZ2luLXRvcDotNXB4O1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRiYWNrZ3JvdW5kOiRsaWdodGVyZ3JleTtcclxuXHRcdGNvbG9yOiRncmV5O1xyXG5cclxuXHRcdCYudHJ1c3RlZCB7XHJcblx0XHRcdGJhY2tncm91bmQ6JGRhcmtncmVlbjtcclxuXHRcdFx0Y29sb3I6JHdoaXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdCYudW50cnVzdGVkIHtcclxuXHRcdFx0YmFja2dyb3VuZDokcmVkO1xyXG5cdFx0XHRjb2xvcjokd2hpdGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQuYXBwLWRldGFpbHMge1xyXG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XHJcblx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuXHRcdCRsb2dvOjEwMHB4O1xyXG5cdFx0LmxvZ28ge1xyXG5cdFx0XHRkaXNwbGF5OmZsZXg7XHJcblx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHRoZWlnaHQ6JGxvZ287XHJcblx0XHRcdHdpZHRoOiRsb2dvO1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiRyYWRpdXM7XHJcblx0XHRcdHBhZGRpbmc6NXB4O1xyXG5cdFx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblxyXG5cdFx0XHQmLmJvcmRlciB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogJGxpZ2h0ZXJncmV5O1xyXG5cdFx0XHRcdGJvcmRlcjoxcHggc29saWQgJGxpZ2h0Z3JleTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW1nIHtcclxuXHRcdFx0XHRoZWlnaHQ6MTAwJTtcclxuXHRcdFx0XHR3aWR0aDoxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzcGFuIHtcclxuXHRcdFx0XHRmb250LXNpemU6ICRzbWFsbDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRjb2xvcjokc2lsdmVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQmLnNjYW0ge1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogNDhweDtcclxuXHRcdFx0XHRib3JkZXItcmFkaXVzOjUwJTtcclxuXHRcdFx0XHRjb2xvcjokcmVkO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICRsaWdodGVyZ3JleTtcclxuXHRcdFx0XHRib3JkZXI6MXB4IHNvbGlkICRsaWdodGdyZXk7XHJcblxyXG5cdFx0XHRcdGFuaW1hdGlvbjogcHVsc2F0ZSAwLjVzIGVhc2UgaW5maW5pdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQubmFtZSB7XHJcblx0XHRcdGZvbnQtc2l6ZTogJGxhcmdlO1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUG9wT3V0QXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI0YWUwNmFjJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMjRhZTA2YWNcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlcXVpcmVkRmllbGRzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBhMjlhM2ZkJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjY2YmI3Yzc4XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BvcE91dEFwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yNGFlMDZhYyZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjViM2EzMGQ1XCIsIGNvbnRlbnQsIHRydWUsIHt9KTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5maWVsZHMtdGl0bGVbZGF0YS12LTBhMjlhM2ZkXXttYXJnaW46LTIwcHggLTMwcHggMDtwYWRkaW5nOjIwcHggMzBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwMDdmZDcgMCUsICMwNzk5ZmYgMTAwJSk7Y29sb3I6I2ZmZjtmb250LXNpemU6MThweDttYXJnaW4tYm90dG9tOjIwcHh9LnJlcXVpcmVkLWZpZWxkc1tkYXRhLXYtMGEyOWEzZmRde3BhZGRpbmc6MjBweCAwIDB9XFxuXCIsIFwiXCJdKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcC1kZXRhaWxzW2RhdGEtdi00MjVlMDY4ZV17cGFkZGluZzo2MHB4IDYwcHggMzBweH0ucmlkbC1wb3B1cFtkYXRhLXYtNDI1ZTA2OGVde3Bvc2l0aW9uOmZpeGVkO3RvcDo3OXB4O2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO3otaW5kZXg6OTk5OTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LnJpZGwtcG9wdXAgLmJnW2RhdGEtdi00MjVlMDY4ZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7YmFja2dyb3VuZDpyZ2JhKDI1NSwwLDAsMC44KTt6LWluZGV4Oi0xfS5yaWRsLXBvcHVwIC5ib3hbZGF0YS12LTQyNWUwNjhlXXtiYWNrZ3JvdW5kOiNmZmY7cGFkZGluZzozMHB4O3RleHQtYWxpZ246Y2VudGVyO21pbi13aWR0aDoyNTBweDttYXgtd2lkdGg6NDUwcHg7d2lkdGg6MTAwJTtib3gtc2hhZG93OjAgMCAwIDNweCByZWQsIDAgMCAwIDZweCB3aGl0ZX0ucmlkbC1wb3B1cCAuYm94IC5saW5rW2RhdGEtdi00MjVlMDY4ZV17Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpibG9jazt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS52aWV3LXR5cGVzW2RhdGEtdi00MjVlMDY4ZV17cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luLXRvcDotMTBweDttYXJnaW4tbGVmdDotMzBweDttYXJnaW4tcmlnaHQ6LTMwcHg7YmFja2dyb3VuZDojZmZmO3BhZGRpbmc6MTBweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDUpLDAgMTBweCAyMHB4IHJnYmEoMCwwLDAsMC4wMil9aW5wdXRbdHlwZT1jaGVja2JveF1bZGF0YS12LTQyNWUwNjhlXXtmbGV4OjAgMCBhdXRvO2FsaWduLXNlbGY6ZmxleC1zdGFydDttYXJnaW4tcmlnaHQ6MTBweDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2N1cnNvcjpwb2ludGVyfS5oYXMtbW9yZVtkYXRhLXYtNDI1ZTA2OGVde3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6IzdhN2E3YTtib3JkZXI6MXB4IHNvbGlkICNjOGM4Yzg7ZGlzcGxheTp0YWJsZTtwYWRkaW5nOjVweCA4cHg7bWFyZ2luOi0yNXB4IGF1dG8gMH0ubWVzc2FnZXNbZGF0YS12LTQyNWUwNjhlXXtwYWRkaW5nOjIwcHggMCAyMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5tZXNzYWdlc1tkYXRhLXYtNDI1ZTA2OGVdOm5vdCg6Zmlyc3QtY2hpbGQpe21hcmdpbi10b3A6NjBweH0ubWVzc2FnZXMgLnByZXZpb3VzLXdoaXRlbGlzdFtkYXRhLXYtNDI1ZTA2OGVde29wYWNpdHk6MC40O2N1cnNvcjpub3QtYWxsb3dlZH0ubWVzc2FnZXMgLmNvbGxhcHNlZFtkYXRhLXYtNDI1ZTA2OGVde3BhZGRpbmctdG9wOjEwcHg7Zm9udC1zaXplOjExcHh9Lm1lc3NhZ2VzIC53aGl0ZWxpc3Qtb3ZlcmxheVtkYXRhLXYtNDI1ZTA2OGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MHB4O3JpZ2h0OjA7ei1pbmRleDoyO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ubWVzc2FnZXMgLndoaXRlbGlzdC1vdmVybGF5IC5ib3hbZGF0YS12LTQyNWUwNjhlXXt3aWR0aDoxNTBweDtwYWRkaW5nOjIwcHg7YmFja2dyb3VuZDojZmZmO3RleHQtYWxpZ246Y2VudGVyO2JveC1zaGFkb3c6MCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKSwwIDEwcHggMjBweCByZ2JhKDAsMCwwLDAuMDMpO2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OmJvbGR9Lm1lc3NhZ2VzIC5kZXRhaWxzIC50aXRsZVtkYXRhLXYtNDI1ZTA2OGVde2FsaWduLWl0ZW1zOmNlbnRlcjtkaXNwbGF5OmZsZXg7Zm9udC1zaXplOjE0cHg7Y3Vyc29yOnBvaW50ZXJ9Lm1lc3NhZ2VzIC5kZXRhaWxzIC50aXRsZVtkYXRhLXYtNDI1ZTA2OGVdOmhvdmVye3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9Lm1lc3NhZ2VzIC5kZXRhaWxzIC5jb250cmFjdC1zcGxpdFtkYXRhLXYtNDI1ZTA2OGVde3BhZGRpbmc6MCA1cHg7Zm9udC1zaXplOjEzcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7YW5pbWF0aW9uOmJvdW5jZS1kYXRhLXYtNDI1ZTA2OGUgMC43cyBpbmZpbml0ZX1Aa2V5ZnJhbWVzIGJvdW5jZS1kYXRhLXYtNDI1ZTA2OGV7MCUsMTAwJXt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMnB4KX01MCV7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMnB4KX19Lm1lc3NhZ2VzIC5wcm9wZXJ0aWVzIC5yaWNhcmRpYW5bZGF0YS12LTQyNWUwNjhlXXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC4wNSk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTUpO3BhZGRpbmc6MTBweH0ubWVzc2FnZXMgLnByb3BlcnRpZXMgbGFiZWxbZGF0YS12LTQyNWUwNjhlXXttYXJnaW4tYm90dG9tOjVweH0ubWVzc2FnZXMgLnByb3BlcnRpZXMgLnZhbHVlW2RhdGEtdi00MjVlMDY4ZV17b3ZlcmZsb3cteDphdXRvO21pbi1oZWlnaHQ6MTZweDtmb250LXNpemU6MTZweDtmb250LXdlaWdodDpib2xkfS5tZXNzYWdlcyAucHJvcGVydGllcyAudmFsdWUub2JqZWN0W2RhdGEtdi00MjVlMDY4ZV17Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NTAwfS5tZXNzYWdlcyAucHJvcGVydGllczpub3QoOmxhc3QtY2hpbGQpIC52YWx1ZVtkYXRhLXYtNDI1ZTA2OGVde21hcmdpbi1ib3R0b206MjBweH0ubWVzc2FnZXMuZGFuZ2Vyb3VzIC5kYW5nZXJbZGF0YS12LTQyNWUwNjhlXXtjdXJzb3I6cG9pbnRlcjtmbG9hdDpsZWZ0O3BhZGRpbmc6NnB4IDVweCA1cHg7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMSk7Ym94LXNoYWRvdzppbnNldCAwIDVweCAxMHB4IHJnYmEoMCwwLDAsMC4xKTt0ZXh0LXNoYWRvdzowIDJweCAwIHJnYmEoMCwwLDAsMC4xKTttYXJnaW4tdG9wOjdweDttYXJnaW4tcmlnaHQ6MTBweH0ubWVzc2FnZXMuZGFuZ2Vyb3VzIC5kZXRhaWxzLmNvbnRyYWN0LWFjdGlvbltkYXRhLXYtNDI1ZTA2OGVde2JhY2tncm91bmQ6cmVkO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmZjA3MDcgLTIwJSwgI2UyM2IzYiAxMDAlKTtib3JkZXItYm90dG9tOjFweCBzb2xpZCBkYXJrcmVkO2NvbG9yOiNmZmZ9Lm1lc3NhZ2VzLmRhbmdlcm91cyAuZGFuZ2VyLXRpdGxlW2RhdGEtdi00MjVlMDY4ZV17Zm9udC1zaXplOjExcHg7d2lkdGg6MTAwJX0uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3dbZGF0YS12LTQyNWUwNjhlXXtwYWRkaW5nOjB9LmNvbnRyYWN0LWFjdGlvbltkYXRhLXYtNDI1ZTA2OGVde21hcmdpbjotMjBweCAtMzBweCAwO2JvcmRlci10b3A6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4wNCk7cGFkZGluZzoyMHB4IDMwcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMDA3ZmQ3IDAlLCAjMDc5OWZmIDEwMCUpO2NvbG9yOiNmZmZ9LmNvbnRyYWN0LWFjdGlvbiAudGl0bGUgc3BhbltkYXRhLXYtNDI1ZTA2OGVde2ZvbnQtc2l6ZToxOHB4fVxcblwiLCBcIlwiXSk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yZXB1dGF0aW9uW2RhdGEtdi0yNGFlMDZhY117cGFkZGluZzo1cHggMTJweDtmb250LXNpemU6MTBweDttYXJnaW4tYm90dG9tOjEwcHg7bWFyZ2luLXRvcDotNXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZDojZjNmNmY3O2NvbG9yOiNjOGM4Yzh9LnJlcHV0YXRpb24udHJ1c3RlZFtkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6IzE1OUYwMDtjb2xvcjojZmZmfS5yZXB1dGF0aW9uLnVudHJ1c3RlZFtkYXRhLXYtMjRhZTA2YWNde2JhY2tncm91bmQ6I2ZmMDcwNztjb2xvcjojZmZmfS5hcHAtZGV0YWlsc1tkYXRhLXYtMjRhZTA2YWNde3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFwcC1kZXRhaWxzIC5sb2dvW2RhdGEtdi0yNGFlMDZhY117ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2hlaWdodDoxMDBweDt3aWR0aDoxMDBweDtib3JkZXItcmFkaXVzOjA7cGFkZGluZzo1cHg7bWFyZ2luLWJvdHRvbToyMHB4fS5hcHAtZGV0YWlscyAubG9nby5ib3JkZXJbZGF0YS12LTI0YWUwNmFjXXtiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxfS5hcHAtZGV0YWlscyAubG9nbyBpbWdbZGF0YS12LTI0YWUwNmFjXXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5hcHAtZGV0YWlscyAubG9nbyBzcGFuW2RhdGEtdi0yNGFlMDZhY117Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojN2E3YTdhfS5hcHAtZGV0YWlscyAubG9nby5zY2FtW2RhdGEtdi0yNGFlMDZhY117Zm9udC1zaXplOjQ4cHg7Ym9yZGVyLXJhZGl1czo1MCU7Y29sb3I6I2ZmMDcwNztiYWNrZ3JvdW5kOiNmM2Y2Zjc7Ym9yZGVyOjFweCBzb2xpZCAjZGZlMGUxO2FuaW1hdGlvbjpwdWxzYXRlIDAuNXMgZWFzZSBpbmZpbml0ZX0uYXBwLWRldGFpbHMgLm5hbWVbZGF0YS12LTI0YWUwNmFjXXtmb250LXNpemU6MTRweH1cXG5cIiwgXCJcIl0pO1xuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcInJlcXVpcmVkLWZpZWxkc1wifSxbX2MoJ3NlY3Rpb24nLHtzdGF0aWNDbGFzczpcImZpZWxkcy10aXRsZVwifSxbX3ZtLl92KFwiXFxuXFx0XFx0UmVxdWlyZWQgSWRlbnRpdHkgRmllbGRzXFxuXFx0XCIpXSksX3ZtLl92KFwiIFwiKSxfYygnc2VjdGlvbicsW19jKCdsYWJlbCcsW192bS5fdihcIlBlcnNvbmFsIGluZm9ybWF0aW9uOlwiKV0pLF92bS5fdihcIiBcIiksX2MoJ2ZpZ3VyZScse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbX3ZtLl92KFwiXFxuXFx0XFx0XFx0XCIrX3ZtLl9zKF92bS5pZGVudGl0eVJlcXVpcmVtZW50cykrXCJcXG5cXHRcXHRcIildKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIjx0ZW1wbGF0ZT5cclxuXHQ8c2VjdGlvbiBjbGFzcz1cInJlcXVpcmVkLWZpZWxkc1wiPlxyXG5cclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwiZmllbGRzLXRpdGxlXCI+XHJcblx0XHRcdFJlcXVpcmVkIElkZW50aXR5IEZpZWxkc1xyXG5cdFx0PC9zZWN0aW9uPlxyXG5cclxuXHRcdDxzZWN0aW9uPlxyXG5cdFx0XHQ8bGFiZWw+UGVyc29uYWwgaW5mb3JtYXRpb246PC9sYWJlbD5cclxuXHRcdFx0PGZpZ3VyZSBjbGFzcz1cInRleHRcIj5cclxuXHRcdFx0XHR7e2lkZW50aXR5UmVxdWlyZW1lbnRzfX1cclxuXHRcdFx0PC9maWd1cmU+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblx0PC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRpbXBvcnQgeyBtYXBBY3Rpb25zLCBtYXBHZXR0ZXJzLCBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdHByb3BzOlsnZmllbGRzJywgJ2lkZW50aXR5JywgJ3NlbGVjdGVkSWRlbnRpdHknLCAnc2VsZWN0ZWRMb2NhdGlvbicsICdjbG9uZWRMb2NhdGlvbiddLFxyXG5cclxuXHRcdGRhdGEoKXtyZXR1cm4ge1xyXG5cclxuXHRcdH19LFxyXG5cdFx0Y29tcHV0ZWQ6e1xyXG5cclxuXHRcdFx0aWRlbnRpdHlSZXF1aXJlbWVudHMoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGVyc29uYWxGaWVsZHMuY29uY2F0KHRoaXMubG9jYXRpb25GaWVsZHMpLmpvaW4oJywgJyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwZXJzb25hbEZpZWxkcygpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmZpZWxkcy5wZXJzb25hbDtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9jYXRpb25GaWVsZHMoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5maWVsZHMubG9jYXRpb247XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblxyXG5cdFx0XHRmaWVsZFZhbHVlRm9yKGZpZWxkLCB1c2VVbmNsb25lZElkZW50aXR5ID0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiB1c2VVbmNsb25lZElkZW50aXR5XHJcblx0XHRcdFx0XHQ/IHRoaXMuaWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5zZWxlY3RlZExvY2F0aW9uKVxyXG5cdFx0XHRcdFx0OiB0aGlzLnNlbGVjdGVkSWRlbnRpdHkuZ2V0UHJvcGVydHlWYWx1ZUJ5TmFtZShmaWVsZCwgdGhpcy5jbG9uZWRMb2NhdGlvbik7XHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCIgcmVsPVwic3R5bGVzaGVldC9zY3NzXCI+XHJcblx0QGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXNcIjtcclxuXHJcblx0LmZpZWxkcy10aXRsZSB7XHJcblx0XHRtYXJnaW46LTIwcHggLTMwcHggMDtcclxuXHRcdHBhZGRpbmc6MjBweCAzMHB4O1xyXG5cdFx0YmFja2dyb3VuZDokYmx1ZS1ncmFkaWVudDtcclxuXHRcdGNvbG9yOiR3aGl0ZTtcclxuXHRcdGZvbnQtc2l6ZTogMThweDtcclxuXHJcblx0XHRtYXJnaW4tYm90dG9tOjIwcHg7XHJcblx0fVxyXG5cclxuXHQucmVxdWlyZWQtZmllbGRzIHtcclxuXHRcdHBhZGRpbmc6MjBweCAwIDA7XHJcblx0fVxyXG5cclxuPC9zdHlsZT4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXF1aXJlZEZpZWxkcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vUmVxdWlyZWRGaWVsZHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGEyOWEzZmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMGEyOWEzZmRcIixcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qb3BPdXRBcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjRhZTA2YWMmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lnbmF0dXJlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQyNWUwNjhlJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZyZWw9c3R5bGVzaGVldCUyRnNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NpZ25hdHVyZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00MjVlMDY4ZSZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmcmVsPXN0eWxlc2hlZXQlMkZzY3NzJlwiIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TaWduYXR1cmUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDI1ZTA2OGUmc2NvcGVkPXRydWUmbGFuZz1zY3NzJnJlbD1zdHlsZXNoZWV0JTJGc2NzcyZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiZmVjN2Q2OGFcIiwgY29udGVudCwgdHJ1ZSwge30pOyIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuIF9jKCdzdmcnLHthdHRyczp7XCJ3aWR0aFwiOlwiODhweFwiLFwiaGVpZ2h0XCI6XCI4OHB4XCIsXCJ2aWV3Qm94XCI6XCIwIDAgODggODhcIixcInZlcnNpb25cIjpcIjEuMVwiLFwieG1sbnNcIjpcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJ4bWxuczp4bGlua1wiOlwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wifX0sW19jKCdnJyx7YXR0cnM6e1wiaWRcIjpcIndlbGNvbWVfc2NhdHRlclwiLFwic3Ryb2tlXCI6XCJub25lXCIsXCJzdHJva2Utd2lkdGhcIjpcIjFcIixcImZpbGxcIjpcIm5vbmVcIixcImZpbGwtcnVsZVwiOlwiZXZlbm9kZFwiLFwic3Ryb2tlLWxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2UtbGluZWpvaW5cIjpcInJvdW5kXCJ9fSxbX2MoJ2cnLHthdHRyczp7XCJpZFwiOlwiR3JvdXBcIixcInN0cm9rZVwiOlwiIzAwQThGRlwifX0sW19jKCdnJyx7YXR0cnM6e1wiaWRcIjpcIkljb25cIn19LFtfYygnY2lyY2xlJyx7YXR0cnM6e1wiaWRcIjpcIkJhc2VcIixcImN4XCI6XCI0NFwiLFwiY3lcIjpcIjQ0XCIsXCJyXCI6XCI0My43MDc5NjQ2XCJ9fSldKSxfdm0uX3YoXCIgXCIpLF9jKCdwYXRoJyx7YXR0cnM6e1wiZFwiOlwiTTQwLjgxODg1NTksNzEuNTkzMjIwMyBDMzkuMzA0MDE3OCw3MS41OTMyMjAzIDM4LjA0NTU1NTksNzEuNDIzMTUzIDM3LjA0MzQzMjIsNzEuMDgzMDEzMSBDMzYuMDQxMzA4NSw3MC43NDI4NzMyIDM1LjI0ODk0MzYsNzAuMzYxNjg3NyAzNC42NjYzMTM2LDY5LjkzOTQ0NTEgQzM0LjA4MzY4MzUsNjkuNTE3MjAyNSAzMy42NzU4NDg2LDY5LjExMjU1OTQgMzMuNDQyNzk2Niw2OC43MjU1MDM3IEMzMy4yMDk3NDQ2LDY4LjMzODQ0OCAzMy4wOTMyMjAzLDY4LjA4NjI3OTEgMzMuMDkzMjIwMyw2Ny45Njg5ODk1IEMzMy4wOTMyMjAzLDY3LjU0Njc0NjkgMzMuMTg2NDM5Nyw2Ny4wOTUxODg3IDMzLjM3Mjg4MTQsNjYuNjE0MzAxMyBDMzMuNTU5MzIzLDY2LjEzMzQxMzkgMzMuNzkyMzcxNSw2NS42ODc3MiAzNC4wNzIwMzM5LDY1LjI3NzIwNjQgQzM0LjM1MTY5NjMsNjQuODY2NjkyOCAzNC42NTQ2NTk0LDY0LjUyMDY5MzYgMzQuOTgwOTMyMiw2NC4yMzkxOTg1IEMzNS4zMDcyMDUsNjMuOTU3NzAzNSAzNS41OTg1MTU3LDYzLjgxNjk1OCAzNS44NTQ4NzI5LDYzLjgxNjk1OCBDMzYuMTgxMTQ1Nyw2My44MTY5NTggMzYuNDQ5MTUxNSw2NC4wMjgwNzYyIDM2LjY1ODg5ODMsNjQuNDUwMzE4OCBMMzcuMDA4NDc0Niw2NC44MDIxODU4IEMzNy4xOTQ5MTYyLDY0Ljk4OTg0OTIgMzcuNDU3MDk1OCw2NS4xODMzNzQyIDM3Ljc5NTAyMTIsNjUuMzgyNzY2NSBDMzguMTMyOTQ2Niw2NS41ODIxNTg4IDM4LjU1MjQzMzksNjUuNzYzOTU1IDM5LjA1MzQ5NTgsNjUuOTI4MTYwNSBDMzkuNTU0NTU3Niw2Ni4wOTIzNjU5IDQwLjE0MzAwNTEsNjYuMTc0NDY3NCA0MC44MTg4NTU5LDY2LjE3NDQ2NzQgQzQyLjI4NzA4MzYsNjYuMTc0NDY3NCA0My40ODcyODM1LDY1LjcyMjkwOTIgNDQuNDE5NDkxNSw2NC44MTk3NzkyIEM0NS4zNTE2OTk2LDYzLjkxNjY0OTIgNDUuODE3Nzk2Niw2Mi42OTA5OTExIDQ1LjgxNzc5NjYsNjEuMTQyNzY4MyBDNDUuODE3Nzk2Niw2MC4wNjM3MDM5IDQ1LjU2NzI2OTUsNTkuMTAxOTQzNSA0NS4wNjYyMDc2LDU4LjI1NzQ1ODMgQzQ0LjU2NTE0NTgsNTcuNDEyOTczMSA0My45MDY3ODM3LDU2LjYyNzE0NDUgNDMuMDkxMTAxNyw1NS44OTk5NDg5IEM0Mi4yNzU0MTk3LDU1LjE3Mjc1MzMgNDEuMzQzMjI1Niw1NC40NjMxNjE4IDQwLjI5NDQ5MTUsNTMuNzcxMTUzMSBDMzkuMjQ1NzU3NSw1My4wNzkxNDQ0IDM4LjE3MzczNDMsNTIuMzU3ODI0MSAzNy4wNzgzODk4LDUxLjYwNzE3MDYgQzM1Ljk4MzA0NTQsNTAuODU2NTE3MSAzNC45MTEwMjIyLDUwLjA0NzIzMDkgMzMuODYyMjg4MSw0OS4xNzkyODc4IEMzMi44MTM1NTQxLDQ4LjMxMTM0NDcgMzEuODgxMzYsNDcuMzE0Mzk4IDMxLjA2NTY3OCw0Ni4xODg0MTc3IEMzMC4yNDk5OTU5LDQ1LjA2MjQzNzQgMjkuNTkxNjMzOSw0My43ODk4NjQzIDI5LjA5MDU3Miw0Mi4zNzA2NiBDMjguNTg5NTEwMiw0MC45NTE0NTU3IDI4LjMzODk4MzEsMzkuMzI3MDE4OSAyOC4zMzg5ODMxLDM3LjQ5NzMwMSBDMjguMzM4OTgzMSwzNS45MjU2MjAyIDI4LjYwNjk4ODgsMzQuMzQyMjM0MiAyOS4xNDMwMDg1LDMyLjc0NzA5NTUgQzI5LjY3OTAyODEsMzEuMTUxOTU2OCAzMC40MTg5NTcxLDI5LjYzMzA3OTIgMzEuMzYyODE3OCwyOC4xOTA0MTcgQzMyLjMwNjY3ODQsMjYuNzQ3NzU0NyAzMy40MTk0ODUxLDI1LjM5ODk0NDUgMzQuNzAxMjcxMiwyNC4xNDM5NDU2IEMzNS45ODMwNTczLDIyLjg4ODk0NjggMzcuMzY5Njk1OSwyMS43OTgxNjk4IDM4Ljg2MTIyODgsMjAuODcxNTgxOCBDNDAuMzUyNzYxNywxOS45NDQ5OTM5IDQxLjkwODM2MDUsMTkuMjE3ODA5MiA0My41MjgwNzIsMTguNjkwMDA2IEM0NS4xNDc3ODM1LDE4LjE2MjIwMjggNDYuNzczMjk2OSwxNy44OTgzMDUxIDQ4LjQwNDY2MSwxNy44OTgzMDUxIEM0OS44MDI5NzMxLDE3Ljg5ODMwNTEgNTEuMDYxNDM1MSwxOC4xMjExNTIgNTIuMTgwMDg0NywxOC41NjY4NTI1IEM1My4yOTg3MzQ0LDE5LjAxMjU1MyA1NC4yNDI1ODA5LDE5LjY0MDA0MyA1NS4wMTE2NTI1LDIwLjQ0OTM0MTQgQzU1Ljc4MDcyNDIsMjEuMjU4NjM5NyA1Ni4zNzQ5OTc5LDIyLjIzMjEyODggNTYuNzk0NDkxNSwyMy4zNjk4MzgxIEM1Ny4yMTM5ODUxLDI0LjUwNzU0NzMgNTcuNDIzNzI4OCwyNS43ODAxMjA1IDU3LjQyMzcyODgsMjcuMTg3NTk1OCBDNTcuNDIzNzI4OCwyOC41MjQ2OTc0IDU3LjE5MDY4MDMsMjkuODM4MzIxMyA1Ni43MjQ1NzYzLDMxLjEyODUwNyBDNTYuMjU4NDcyMiwzMi40MTg2OTI3IDU1LjY0MDg5MzcsMzMuNjM4NDg2NCA1NC44NzE4MjIsMzQuNzg3OTI0NiBDNTQuMTAyNzUwNCwzNS45MzczNjI3IDUzLjIzNDY0NDcsMzYuOTk4ODE3OCA1Mi4yNjc0Nzg4LDM3Ljk3MjMyMTYgQzUxLjMwMDMxMywzOC45NDU4MjUzIDUwLjMwOTg1NjgsMzkuNzkwMjk3OSA0OS4yOTYwODA1LDQwLjUwNTc2NDUgQzQ4LjI4MjMwNDMsNDEuMjIxMjMxMSA0Ny4yOTc2NzQzLDQxLjc3ODM0ODQgNDYuMzQyMTYxLDQyLjE3NzEzMzEgQzQ1LjM4NjY0NzgsNDIuNTc1OTE3OCA0NC41NDc2NzMxLDQyLjc3NTMwNzEgNDMuODI1MjExOSw0Mi43NzUzMDcxIEM0My4xOTU5NzE0LDQyLjc3NTMwNzEgNDIuNjMwODI4OCw0Mi42Mjg2OTczIDQyLjEyOTc2NjksNDIuMzM1NDczMyBDNDEuNjI4NzA1MSw0Mi4wNDIyNDkyIDQxLjIwOTIxNzgsNDEuNjc4NjU2OSA0MC44NzEyOTI0LDQxLjI0NDY4NTMgQzQwLjUzMzM2Nyw0MC44MTA3MTM4IDQwLjI3MTE4NzQsNDAuMzUzMjkxMiA0MC4wODQ3NDU4LDM5Ljg3MjQwMzggQzM5Ljg5ODMwNDIsMzkuMzkxNTE2NCAzOS44MDUwODQ3LDM4Ljk2MzQxNTcgMzkuODA1MDg0NywzOC41ODgwODg5IEMzOS44MDUwODQ3LDM4LjI4MzEzNiAzOS44NDU4NjgyLDM4LjA4Mzc0NjYgMzkuOTI3NDM2NCwzNy45ODk5MTQ5IEM0MC4wMDkwMDQ2LDM3Ljg5NjA4MzIgNDAuMTI1NTI4OSwzNy44NTUwMzI1IDQwLjI3NzAxMjcsMzcuODY2NzYxNCBDNDAuNDI4NDk2NSwzNy44Nzg0OTA0IDQwLjYyMDc2MTUsMzcuOTEzNjc2OCA0MC44NTM4MTM2LDM3Ljk3MjMyMTYgQzQxLjA4Njg2NTYsMzguMDMwOTY2NCA0MS4zNTQ4NzE0LDM4LjA2MDI4ODMgNDEuNjU3ODM5LDM4LjA2MDI4ODMgQzQyLjYzNjY1NzQsMzguMDYwMjg4MyA0My43MjAzMzMsMzcuNzIwMTUzNiA0NC45MDg4OTgzLDM3LjAzOTg3MzggQzQ2LjA5NzQ2MzYsMzYuMzU5NTk0MSA0Ny4yMTYwOTY1LDM1LjQ5MTY2NCA0OC4yNjQ4MzA1LDM0LjQzNjA1NzUgQzQ5LjMxMzU2NDYsMzMuMzgwNDUxIDUwLjE5MzMyMjcsMzIuMjE5MzAxMyA1MC45MDQxMzE0LDMwLjk1MjU3MzUgQzUxLjYxNDk0LDI5LjY4NTg0NTcgNTEuOTcwMzM5LDI4LjQ1NDMyMzIgNTEuOTcwMzM5LDI3LjI1Nzk2OTIgQzUxLjk3MDMzOSwyNi4wMzgxNTczIDUxLjY3MzIwMjEsMjUuMDc2Mzk2OSA1MS4wNzg5MTk1LDI0LjM3MjY1OTIgQzUwLjQ4NDYzNjksMjMuNjY4OTIxNiA0OS40NzY3MDIsMjMuMzE3MDU4IDQ4LjA1NTA4NDcsMjMuMzE3MDU4IEM0Ny4xNjk0ODcxLDIzLjMxNzA1OCA0Ni4yMDgxNjIsMjMuNDg3MTI1NCA0NS4xNzEwODA1LDIzLjgyNzI2NTMgQzQ0LjEzMzk5OTEsMjQuMTY3NDA1MSA0My4wOTExMDY5LDI0LjY0MjQyMDkgNDIuMDQyMzcyOSwyNS4yNTIzMjY5IEM0MC45OTM2Mzg4LDI1Ljg2MjIzMjkgMzkuOTc5ODc3OCwyNi42MDExNDYzIDM5LjAwMTA1OTMsMjcuNDY5MDg5NSBDMzguMDIyMjQwOSwyOC4zMzcwMzI2IDM3LjE1OTk2MTQsMjkuMjkyOTI4NiAzNi40MTQxOTQ5LDMwLjMzNjgwNjEgQzM1LjY2ODQyODUsMzEuMzgwNjgzNiAzNS4wNjgzMjg1LDMyLjUwNjY0NyAzNC42MTM4NzcxLDMzLjcxNDczIEMzNC4xNTk0MjU3LDM0LjkyMjgxMyAzMy45MzIyMDM0LDM2LjE4MzY1NzQgMzMuOTMyMjAzNCwzNy40OTczMDEgQzMzLjkzMjIwMzQsMzguODgxMzE4NCAzNC4xODI3MzA1LDQwLjExODcwNTMgMzQuNjgzNzkyNCw0MS4yMDk0OTg2IEMzNS4xODQ4NTQyLDQyLjMwMDI5MiAzNS44NDkwNDI1LDQzLjI5MTM3NDQgMzYuNjc2Mzc3MSw0NC4xODI3NzU0IEMzNy41MDM3MTE4LDQ1LjA3NDE3NjQgMzguNDQxNzMyLDQ1Ljg5NTE5MTQgMzkuNDkwNDY2MSw0Ni42NDU4NDQ5IEM0MC41MzkyMDAyLDQ3LjM5NjQ5ODQgNDEuNjExMjIzMyw0OC4xNDEyNzYzIDQyLjcwNjU2NzgsNDguODgwMjAwOCBDNDMuODAxOTEyMyw0OS42MTkxMjU0IDQ0Ljg3MzkzNTQsNTAuMzgxNDk2NCA0NS45MjI2Njk1LDUxLjE2NzMzNjggQzQ2Ljk3MTQwMzUsNTEuOTUzMTc3MiA0Ny45MDk0MjM4LDUyLjgyMTEwNzMgNDguNzM2NzU4NSw1My43NzExNTMxIEM0OS41NjQwOTMxLDU0LjcyMTE5OSA1MC4yMjgyODE0LDU1Ljc3Njc4OTYgNTAuNzI5MzQzMiw1Ni45Mzc5NTY4IEM1MS4yMzA0MDUsNTguMDk5MTIzOSA1MS40ODA5MzIyLDU5LjQzMDM0MSA1MS40ODA5MzIyLDYwLjkzMTY0OCBDNTEuNDgwOTMyMiw2Mi4zODYwMzkyIDUxLjIwNzEwMDIsNjMuNzY0MTcxNSA1MC42NTk0MjgsNjUuMDY2MDg2MSBDNTAuMTExNzU1Nyw2Ni4zNjgwMDA4IDQ5LjM2MDE3NDMsNjcuNDk5ODI4NiA0OC40MDQ2NjEsNjguNDYxNjAzNCBDNDcuNDQ5MTQ3OCw2OS40MjMzNzgyIDQ2LjMxODg2MjUsNzAuMTg1NzQ5MiA0NS4wMTM3NzEyLDcwLjc0ODczOTQgQzQzLjcwODY3OTksNzEuMzExNzI5NSA0Mi4zMTAzODg4LDcxLjU5MzIyMDMgNDAuODE4ODU1OSw3MS41OTMyMjAzIFpcIixcImlkXCI6XCJTY2F0dGVyXCJ9fSldKV0pXSl9XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU2NhdHRlck91dGxpbmUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTM2MTk2MGY1JlwiXG52YXIgc2NyaXB0ID0ge31cblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=