// const VConsole = require('vconsole');
// const vConsole = new VConsole({});

import './styles/styles.scss'
import './styles/animations.scss'
import './styles/popins.scss'
import './styles/confirm.scss'
import './styles/blockchain-lists.scss'

import WalletHelpers from './util/WalletHelpers';

import VueInitializer from './vue/VueInitializer';
import {RouteNames, Routing} from './vue/Routing';
import { QrcodeStream } from 'vue-qrcode-reader'


import ViewBase from './components/ViewBase.vue'
import Button from './components/reusable/Button.vue'
import Input from './components/reusable/Input.vue'
import Select from './components/reusable/Select.vue'
import SearchBar from './components/reusable/SearchBar.vue'
import Slider from './components/reusable/Slider.vue'
import PopInHead from './components/reusable/PopInHead.vue'
import Switcher from './components/reusable/Switcher.vue'
import SearchAndFilter from './components/reusable/SearchAndFilter.vue'
import AnimatedNumber from './components/reusable/AnimatedNumber.vue'
import ActionBar from './components/reusable/ActionBar.vue'
import PopOutHead from './components/popouts/PopOutHead.vue'
import WalletTalk from "./util/WalletTalk";
import * as Actions from "@walletpack/core/store/constants";
import {store} from "./store/store";

import '@fortawesome/fontawesome-pro/css/all.css'
import SingletonService from "./services/utility/SingletonService";
import IdGenerator from '@walletpack/core/util/IdGenerator';

// f12 to open console from anywhere.
document.addEventListener("keydown", e => {
	if (e.which === 123) window.wallet.utility.openTools(window.wallet.windowId);
});

document.onmousedown= e => {
	if( e.which === 2 ) e.preventDefault();
	// TODO: Add CMD click logic prevention
}

let cssLoaded = false;
const loadStyles = async HOST => {
	if(cssLoaded) return;
	cssLoaded = true;

	const head = document.getElementsByTagName('head')[0];

	const applyStyles = styles => {
		const linkElement = document.createElement('style');
		linkElement.setAttribute('type', 'text/css');
		linkElement.innerHTML = styles;
		head.appendChild(linkElement);
	}

	const fontawesome = await Promise.race([
		fetch(HOST+"static/fonts/fontawesome.css").then(x => x.text()).catch(() => null),
		new Promise(r => setTimeout(() => r(null), 2000))
	]);

	if(!fontawesome) console.log("There was an error setting up fontawesome.");
	applyStyles(fontawesome.replace(/INSERT_HOST/g, HOST+"static/fonts"));


	const stylesheets = [
		"static/fonts/scatter-icons",
		"static/fonts/token-icons",
		"static/fonts/scatter-logo",
		"static/fonts/sidebar-icons",
		"static/fonts/google-fonts",
	];

	stylesheets.map(async stylesheet => {

		const PATH = HOST+stylesheet;

		let styles = await Promise.race([
			fetch(PATH+"/style.css").then(x => x.text()).catch(() => null),
			new Promise(r => setTimeout(() => r(null), 2000))
		]);
		if(!styles) return console.log("There was a problem fetching the CSS for '"+stylesheet+"'.");

		// Remodeling the paths
		styles = styles.replace(/fonts\//g, PATH+"/fonts/");

		applyStyles(styles);
	});
}

window.loadStyles = loadStyles;

class Main {

	constructor(){

		if(process.env.NO_WALLET){
			loadStyles('http://localhost:8081/');
		}

		const isPopOut = location.hash.replace("#/", '').split('?')[0] === 'popout' || !!window.PopOutWebView;

		const setup = () => {

			const shared = [
				{tag:'Button', vue:Button},
				{tag:'Input', vue:Input},
				{tag:'Select', vue:Select},
				{tag:'Slider', vue:Slider},
				{tag:'Switcher', vue:Switcher},
				{tag:'SearchBar', vue:SearchBar},
				{tag:'SearchAndFilter', vue:SearchAndFilter},
				{tag:'ActionBar', vue:ActionBar},
				{tag:'view-base', vue:ViewBase},
				{tag:'PopInHead', vue:PopInHead},
				{tag:'AnimatedNumber', vue:AnimatedNumber},
			];

			let fragments;
			if(isPopOut) fragments = [
				{tag:'PopOutHead', vue:PopOutHead},
			]; else fragments = [

			]

			const components = shared.concat(fragments);

			// Once unlocked, simply returns true instead
			// of hitting the wallet each time.
			let unlocked = null;
			const isUnlocked = async () => {
				if(!unlocked) unlocked = await window.wallet.unlocked();
				return unlocked;
			}

			const middleware = async (to, next) => {
				if(isPopOut) {
					if(to.name !== RouteNames.POP_OUT) return next({name:RouteNames.POP_OUT});
					return next();
				}
				else if(Routing.isRestricted(to.name)) await isUnlocked() ? next() : next({name:RouteNames.LOGIN});
				else next();
			}

			new VueInitializer(Routing.routes(), components, middleware, async (router) => {

			});

			return true;
		};



		const setupWallet = async () => {
			await WalletTalk.setup();
			await WalletHelpers.init(isPopOut);

			if(WalletHelpers.getWalletType() === 'extension' && await window.wallet.unlocked()){
				await store.dispatch(Actions.LOAD_SCATTER);
				SingletonService.init();
			}

			return setup();
		}

		if(process.env.NO_WALLET){

			WalletTalk.setFakeWallet().then(async () => {
				await store.dispatch(Actions.LOAD_SCATTER);
				await setupWallet();
				SingletonService.init();
			})

		} else {

			let foundWallet = false;
			let interval;
			const checkWallet = () => {
				if(window.wallet || window.ReactNativeWebView || window.PopOutWebView){
					if(foundWallet) return;
					foundWallet = true;
					clearInterval(interval);
					setupWallet();
				}
			};

			checkWallet();
			interval = setInterval(() => checkWallet(), 100);


		}


	}

}

new Main();
