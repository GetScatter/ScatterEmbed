import Vue from 'vue'
import {mapState, mapActions} from 'vuex';
import VTooltip from 'v-tooltip'
// import VueQrcodeReader from 'vue-qrcode-reader'


import VueRouter from 'vue-router'
import {RouteNames, Routing} from './Routing';
import features from '../features';

import {blockchainName, Blockchains} from '@walletpack/core/models/Blockchains'
import {SETTINGS_OPTIONS} from '@walletpack/core/models/Settings'
import StoreService from "@walletpack/core/services/utility/StoreService";
import AppsService from "@walletpack/core/services/apps/AppsService";
import {dateId} from "@walletpack/core/util/DateHelpers";
import PriceService from "@walletpack/core/services/apis/PriceService";
import * as UIActions from "../store/ui_actions";
import Injectable from "../services/wallets/Injectable";
import {localized} from '../localization/locales'
import LANG_KEYS from '../localization/keys'
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
				SETTINGS_OPTIONS,
				langKeys:LANG_KEYS,
				loadingReputation:false,
				features,
				// now:0,
			}},
			computed:{
				...mapState([
					'working',
					'priceData',
					'theme',
					'isMobile',
					'isMobileDevice'
				])
			},
			methods: {
				blockchainName,
				locale:(key, args) => localized(key, args, StoreService.get().getters.language),
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

	setupVue(router){
		const app = new Vue({router, store});
		app.$mount('#scatter');


		document.getElementById('base_loader').remove();

		// This removes the browser console's ability to
		// gain access to vuex store. ( for instance `scatter.__vue__.$store.state` )
		if(document.getElementById('scatter')) {
			document.getElementById('scatter').removeAttribute('id')
		}
	}

}
