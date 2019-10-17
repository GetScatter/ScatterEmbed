import Vue from 'vue'
import {mapState, mapActions} from 'vuex';
import VTooltip from 'v-tooltip'
import VueQrcodeReader from 'vue-qrcode-reader'


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
import Injectable from "../services/electron/Injectable";
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
				back(){ this.$router.back(); },
				locale:(key, args) => localized(key, args, StoreService.get().getters.language),
				newKeypair(){ this.$router.push({name:RouteNames.NEW_KEYPAIR}); },
				canOpenApp(applink){
					const data = AppsService.getAppData(applink);
					return data.url.length;
				},
				fiatSymbol:PriceService.fiatSymbol,
				getTokensTotaled(){
					if(!this.priceData || !this.priceData.hasOwnProperty('yesterday')) return [];
					let totaled = [];
					Object.keys(this.priceData.yesterday).filter(x => x !== 'latest').sort((a,b) => a - b).map(hour =>
						totaled.push({hour, data:this.priceData.yesterday[hour], date:dateId(1)}));
					Object.keys(this.priceData.today).filter(x => x !== 'latest').sort((a,b) => a - b).map(hour =>
						totaled.push({hour, data:this.priceData.today[hour], date:dateId()}));
					totaled = totaled.slice(totaled.length-(totaled.length > 24 ? 24 : totaled.length), totaled.length);
					return totaled;
				},
				change(token, numOnly = false){
					const dummy = {plus:false, perc:'0%'};
					if(!this.priceData || !this.priceData.hasOwnProperty('today')) return dummy;
					if(token.unusable) return dummy;
					const hour = this.priceData.today.latest;
					const totaled = this.getTokensTotaled();
					const latest = totaled[totaled.length-1] ? totaled[totaled.length-1].data : null;
					const earliest = totaled[0] ? totaled[0].data : null;
					if(!latest || !earliest || !latest[token.uniqueWithChain()] || !earliest[token.uniqueWithChain()]) return '--';
					const diff = earliest[token.uniqueWithChain()] - latest[token.uniqueWithChain()];
					const change = (diff / earliest[token.uniqueWithChain()]) * 100;
					if(numOnly) return Math.abs(parseFloat(change).toFixed(2));
					const symbol = change > 0 ? '-' : '+';
					return {plus:change <= 0, perc:`${symbol}${Math.abs(parseFloat(change).toFixed(2))}%`};
				},
				openApp(applink){
					const data = AppsService.getAppData(applink);
					if(data.url.length) this.openInBrowser(data.url);
				},
				openInBrowser(url, filepath = false){
					Injectable.openLink(url, filepath);
				},
				setWorkingScreen(bool){ StoreService.get().dispatch(UIActions.SET_WORKING_SCREEN, bool); },
				copyText(text){ Injectable.copy(text) },
				publicKeyForKeypair(keypair){
					if(!keypair) return null;
					if(!keypair.hasOwnProperty('publicKeys')) return null;
					return keypair.enabledKey().key;
				},


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
				formatTime(milliseconds){
					const formatTimeNumber = n => {
						if(!n) return '00';
						if(n.toString().length === 1) n = '0'+n;
						if(n.toString().length === 0) n = '00';
						return n;
					};

					const seconds = Math.trunc(milliseconds) % 60;
					const minutes = Math.trunc(milliseconds / 60) % 60;
					return `${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`;
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
		Vue.use(VueQrcodeReader);
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
