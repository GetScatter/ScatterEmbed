import {Popup, PopupData, PopupDisplayTypes} from "../models/popups/Popup";
import WindowService from "../services/electron/WindowService";
import WalletPack from "@walletpack/core";
import {store} from "../store/store";
import ExternalWallet, {ExternalWalletInterface} from "@walletpack/core/models/hardware/ExternalWallet";
import SocketService from "../services/electron/SocketService";
import WalletTalk from "./WalletTalk";
import AppsService from '@walletpack/core/services/apps/AppsService'
import PopupService from "../services/utility/PopupService";

export default class WalletHelpers {

	static init(){
		const eventListener = async (type, data) => {
			console.log('event listener', type, data);
			if(type === 'popout') {
				const popup =  new Popup(PopupDisplayTypes.POP_OUT, new PopupData(data.type, data));
				popup.data.props.appData = AppsService.getAppData(popup.data.props.payload.origin);
				return await WindowService.openPopOut(popup);
			}

		};


		WalletPack.initialize(
			{
				blockchains:{
					EOSIO:'eos',
					ETH:'eth',
					TRX:'trx',
					BTC:'btc',
				},
				plugins:[
					require('@walletpack/eosio').default,
					require('@walletpack/ethereum').default,
					require('@walletpack/tron').default,
					require('@walletpack/bitcoin').default,
				]
			},
			store,
			{
				getSalt:window.wallet.getSalt,
				get:() => true,
				set:(seed) => true,
				clear:() => true,
			},
			{
				getVersion:() => require('../../package').version,
				pushNotification:window.wallet.utility.pushNotification,
			},
			eventListener,
			{
				socketService:SocketService,
				signer:async (network, publicKey, payload, arbitrary = false, isHash = false) => {
					const keypair = store.state.scatter.keychain.keypairs.find(x => x.publicKeys.find(k => k.key === publicKey));
					if(!keypair) return;

					let popup;
					if(keypair.external){
						popup = Popup.checkHardwareWalletScreen();
						PopupService.push(popup);
					}

					const result = await window.wallet.sign(network, publicKey, payload, arbitrary, isHash);

					if(popup) PopupService.remove(popup);

					if(result && typeof result === 'object' && result.hasOwnProperty('error')){
						PopupService.push(Popup.snackbar(result.error))
					}

					return result;
				},
			}
		);

		ExternalWallet.loadWallets([
			{type:'LEDGER', name:'Ledger', wallet:() => { /* Handled by primary signer */ }}
		])
	}

}