import IdGenerator from "@walletpack/core/util/IdGenerator";
import * as CoreSocketService from "@walletpack/core/services/utility/SocketService";
import * as UIActions from "../store/ui_actions";
import * as Actions from "@walletpack/core/store/constants";
import Scatter from "@walletpack/core/models/Scatter";
import {store} from "../store/store";
import PopupService from "../services/utility/PopupService";
import {Popup} from "../models/popups/Popup";

const scatterChats = {};


export default class WalletTalk {

	static setup(){

		window.wallet.socketResponse = data => {
			switch(data.type){
				case 'api': return CoreSocketService.handleApiResponse(data.request, data.id);
				case 'pair': return CoreSocketService.handlePairedResponse(data.request, data.id);
				case 'ports': return store.dispatch(UIActions.SET_PORTS, data.ports);
				default: return;
			}
		}

		window.wallet.popout = popOut => {
			store.dispatch(UIActions.SET_POPOUT, popOut);
		}
	}



	static setFakeWallet(){
		return new Promise(resolve => {
			require('@walletpack/core/services/utility/Framework').default.init({
				getVersion:() => '1.0.0',
			});

			require('@walletpack/core/models/Scatter').default.create().then(fakeScatter => {
				fakeScatter.onboarded = true;

				const network = require('@walletpack/core/models/Network').default.fromJson({
					blockchain:'eos',
					name:'EOS Mainnet',
					host:'nodes.get-scatter.com',
					port:443,
					protocol:'https',
					chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
				});

				const keypair = require('@walletpack/core/models/Keypair').default.fromJson({
					name:'testkey',
					privateKey:'........................................................................................................................',
					publicKeys:[{key:'EOS7w5aJCv5B7y3a6f4WCwPSvs6TpCAoRGnGpiLMsSWbmxaZdKigd', blockchain:'eos'}],
					blockchains:['eos']
				});

				const account = require('@walletpack/core/models/Account').default.fromJson({
					name:'ramdeathtest',
					authority:'active',
					publicKey:keypair.publicKeys[0].key,
					keypairUnique:keypair.unique(),
					networkUnique:network.unique(),
				})

				fakeScatter.settings.networks.push(network);
				fakeScatter.keychain.keypairs.push(keypair);
				fakeScatter.keychain.accounts.push(account);

				window.wallet = {
					/************************************/
					/**       SIGNING & WALLET         **/
					/************************************/
					exists:() => true,
					unlock:() => fakeScatter,
					verifyPassword:() => true,
					changePassword:() => true,
					hardwareTypes:async () => [],
					hardwareKeys:() => [],
					getPrivateKey:() => null,
					sign:() => 'tester',
					encrypt:() => null,
					decrypt:() => null,
					getSalt:() => null,
					setSalt:() => null,



					/************************************/
					/**        FILES / STORAGE         **/
					/************************************/
					storage:{
						setWalletData:() => fakeScatter,
						getWalletData:() => fakeScatter,
						clearWalletData:() => true,
						getDefaultPath:() => 'nopath',

						saveFile:() => true,
						openFile:() => true,
						getFileLocation:() => true,
						getFolderLocation:() => true,
					},


					/************************************/
					/**           UTILITIES            **/
					/************************************/
					utility:{
						openTools:() => () => true,
						closeWindow:() => () => true,
						flashWindow:() => true,
						openLink:() => true,
						copy:() => true,
						openPopOut:() => true
					},

					sockets:{},
				}

				resolve(true);
			});
		})
	}

}