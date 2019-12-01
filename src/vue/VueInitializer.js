import Vue from 'vue'
import {mapState, mapActions} from 'vuex';
import VTooltip from 'v-tooltip'
// import VueQrcodeReader from 'vue-qrcode-reader'
import VueI18n from 'vue-i18n'


import VueRouter from 'vue-router'
import {RouteNames, Routing} from './Routing';

import {blockchainName, Blockchains} from '@walletpack/core/models/Blockchains'
import StoreService from "@walletpack/core/services/utility/StoreService";
import AppsService from "@walletpack/core/services/apps/AppsService";
import {dateId} from "@walletpack/core/util/DateHelpers";
import PriceService from "@walletpack/core/services/apis/PriceService";
import * as UIActions from "../store/ui_actions";
import Injectable from "../services/wallets/Injectable";
import {store} from "../store/store";
import THEMES from "../util/Themes";

Vue.config.productionTip = false

export let router;

/***
 * Sets up an instance of Vue.
 * This is shared between the popup.js and prompt.js scripts.
 */
export default class VueInitializer {

	constructor(routes,
	            components,
	            middleware = () => {},
	            routerCallback = () => {}){

		this.setupVuePlugins();
		this.registerComponents(components);
		router = this.setupRouting(routes, middleware);

		Vue.mixin({
			data(){ return {
				RouteNames,
			}},
			computed:{
				...mapState([
					'isMobile',
					'testingMode',
				])
			},
			methods: {
				blockchainName,
				canOpenApp(applink){
					const data = AppsService.getAppData(applink);
					return data.url.length;
				},
				fiatSymbol:PriceService.fiatSymbol,

				openApp(applink){
					const data = AppsService.getAppData(applink);
					if(data.url.length) this.openInBrowser(data.url);
				},
				openInBrowser(url, filepath = false){
					Injectable.openLink(url, filepath);
				},
				setWorkingScreen(bool){ StoreService.get().dispatch(UIActions.SET_WORKING_SCREEN, bool); },
				copyText(text){ Injectable.copy(text) },
				formatNumber(num, commaOnly = false){
					if(!num) return 0;
					num = parseFloat(num.toString());
					const toComma = x => {
						const [whole, decimal] = x.toString().split('.');
						return whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (decimal ? `.${decimal}` : '').toString();
					}
					if(commaOnly) return toComma(num);
					return (num > 999999999 ? toComma((num/1000000000).toFixed(1)) + ' B' :
						num > 999999 ? toComma((num/1000000).toFixed(1)) + ' M' :
							num > 999 ? toComma((num/1000).toFixed(1)) + ' K' : num)
				},


				...mapActions([

				])
			}
		})

		this.setupVue(router);

		routerCallback(router);

		return router;
	}

	setupVuePlugins(){
		Vue.use(VueRouter);
		Vue.use(VueI18n);
		Vue.use(VTooltip, {
			defaultOffset:5
		});
		// Vue.use(VueQrcodeReader);
	}

	registerComponents(components){
		components.map(component => {
			Vue.component(component.tag, component.vue);
		});
	}

	setupRouting(routes, middleware){
		const router = new VueRouter({routes});
		router.beforeEach((to, from, next) => {
			if(StoreService.get()) StoreService.get().dispatch(UIActions.SET_SEARCH_TERMS, '');
			return middleware(to, next)
		});
		return router;
	}

	async setupLocalization(){

		const currentLanguage = async () => {
			const defaultLanguage = (() => {
				if (Array.isArray(navigator.languages)) return navigator.languages[0];
				else return navigator.language;
			})();

			if(window.wallet){
				const savedLanguage = await window.wallet.storage.getLanguage();
				if(savedLanguage) return savedLanguage;
			}

			return defaultLanguage;
		};

		const langFiles = require('../localization/languages').default;
		let lang = await currentLanguage();

		// Allows support for 'en-US' which defaults to 'en' if no specific one is available.
		if(!langFiles[lang] && langFiles[lang.split('-')[0]]) lang = lang.split('-')[0];

		// No language supported, defaulting to english.
		if(!langFiles[lang]) lang = 'en';

		const messages = {};
		messages[lang] = langFiles[lang];
		if(!messages.hasOwnProperty('en')) messages['en'] = langFiles['en'];

		return new VueI18n({
			locale:lang,
			fallbackLocale: 'en',

			// Only adding the currently selected language.
			// Otherwise we will be adding a large amount of unecessary
			// data onto the running application context.
			messages:{
				[lang]:langFiles[lang]
			}, // set locale messages
		})
	}

	async setupVue(router){


		const app = new Vue({router, store, i18n:await this.setupLocalization()});
		app.$mount('#scatter');


		document.getElementById('base_loader').remove();

		// This removes the browser console's ability to
		// gain access to vuex store. ( for instance `scatter.__vue__.$store.state` )
		if(document.getElementById('scatter')) {
			document.getElementById('scatter').removeAttribute('id')
		}
	}

}
