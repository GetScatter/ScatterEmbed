import IdGenerator from "@walletpack/core/util/IdGenerator";
import * as CoreSocketService from "@walletpack/core/services/utility/SocketService";
import ApiService from "@walletpack/core/services/apis/ApiService";
import * as UIActions from "../store/ui_actions";
import {store} from "../store/store";
import {AES} from "aes-oop";

const scatterChats = {};


export default class WalletTalk {

	static setup(){

		WalletTalk.checkMobileWallet();

		window.wallet.socketResponse = data => {
			if(typeof data === 'string') data = JSON.parse(data);
			switch(data.type){
				case 'ext_api': return ApiService.handler(data.request);
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

	// Mobile doesn't allow injection of window objects the same way.
	// So we're building a communication system for mobile instead which
	// proxies all requests over the connection.
	static checkMobileWallet(){
		if(typeof window.ReactNativeWebView !== 'undefined' || typeof window.PopOutWebView !== 'undefined'){
			const parseIfNeeded = x => {
				if(x && typeof x === 'string' && x.indexOf(`{`) > -1) x = JSON.parse(x);
			}

			// For mobile popouts only.
			if(typeof window.ReactNativeWebView === 'undefined'){
				window.ReactNativeWebView = {
					postMessage:() => {}
				};
			}

			let resolvers = {};

			window.ReactNativeWebView.response = ({id, result}) => {
				parseIfNeeded(result);
				resolvers[id](result);
				delete resolvers[id];
			}

			const proxyGet = (prop, target, key) => {
				if (key === 'then') {
					return (prop ? target[prop] : target).then.bind(target);
				}

				if(key === 'socketResponse'){
					return (prop ? target[prop] : target)[key];
				}

				return (...params) => new Promise(async resolve => {
					const id = IdGenerator.text(24);
					resolvers[id] = resolve;
					window.ReactNativeWebView.postMessage(JSON.stringify({id, prop, key, params}));
				});
			};

			const proxied = (prop) => new Proxy({}, { get(target, key){ return proxyGet(prop, target, key); } });


			window.wallet = new Proxy({
				storage:proxied('storage'),
				utility:proxied('utility'),
				sockets:proxied('sockets'),
				biometrics:proxied('biometrics'),
			}, {
				get(target, key) {
					if(['storage', 'utility', 'sockets', 'biometrics'].includes(key)) return target[key];
					return proxyGet(null, target, key);
				},
			});



			// --------------------------------------------------------------------------------------------------------------------
			// These methods are being used temporarily in the mobile version
			// since there is no viable port of sjcl or aes-gcm
			window.ReactNativeWebView.mobileEncrypt = ({id, data, key}) => {
				parseIfNeeded(data);
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'mobile_response', id, result:AES.encrypt(data, key)}));
				return true;
			};

			window.ReactNativeWebView.mobileDecrypt = ({id, data, key}) => {
				parseIfNeeded(data);
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'mobile_response', id, result:AES.decrypt(data, key)}));
				return true;
			};

			const Mnemonic = require('@walletpack/core/util/Mnemonic').default;
			window.ReactNativeWebView.seedPassword = async ({id, password, salt}) => {
				const [_, seed] = await Mnemonic.generateMnemonic(password, salt);
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'mobile_response', id, result:seed}));
				return true;
			};

			// Just because doing sha256 on a buffer in react is dumb.
			const ecc = require('eosjs-ecc');
			window.ReactNativeWebView.sha256 = ({id, data}) => {
				parseIfNeeded(data);
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'mobile_response', id, result:ecc.sha256(Buffer.from(data))}));
				return true;
			};

			const log = console.log;
			const error = console.error;

			console.log = (...params) => {
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'console', params}));
				return log(...params);
			};

			console.error = (...params) => {
				window.ReactNativeWebView.postMessage(JSON.stringify({type:'console', params}));
				return error(...params);
			};

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

				const network2 = require('@walletpack/core/models/Network').default.fromJson({
					blockchain:'eos',
					name:'Telos Mainnet',
					host:'api.eos.miami',
					port:443,
					protocol:'https',
					chainId:'4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
					token:{
						blockchain:'eos',
						symbol:"TLOS",
						contract:"eosio.token",
						decimals:4
					}
				});

				const keypair = require('@walletpack/core/models/Keypair').default.fromJson({
					name:'testkey',
					privateKey:'{test:"key"}',
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

				const account2 = require('@walletpack/core/models/Account').default.fromJson({
					name:'ramijames123',
					authority:'active',
					publicKey:keypair.publicKeys[0].key,
					keypairUnique:keypair.unique(),
					networkUnique:network.unique(),
				})

				const account3 = require('@walletpack/core/models/Account').default.fromJson({
					name:'b1',
					authority:'active',
					publicKey:keypair.publicKeys[0].key,
					keypairUnique:keypair.unique(),
					networkUnique:network2.unique(),
				});

				fakeScatter.settings.networks.push(network);
				fakeScatter.settings.networks.push(network2);
				fakeScatter.keychain.keypairs.push(keypair);
				fakeScatter.keychain.accounts.push(account);
				fakeScatter.keychain.accounts.push(account2);
				fakeScatter.keychain.accounts.push(account3);

				// Taken randomly from a snapshot: https://www.eossnapshots.io/?prefix=data/2018-07/
				// Used for stress testing many accounts
				// [   'gm2dgnbugige',
				// 	'gm2dgnbtgqge',
				// 	'gm2dgnbwgige',
				// 	'gm2dgnbzgege',
				// 	'gm2dgnbvhege',
				// 	'gm2dgnbxgige',
				// 	'gm2dgnbzg4ge',
				// 	'gm2dgnjqgige',
				// 	'gm2dgnjqgmge',
				// 	'gm2dgnjqguge',
				// 	'gm2dgnjqhege',
				// 	'gm2dgnjrgqge',
				// 	'gm2dgnjtgyge',
				// 	'gm2dgnjthege',
				// 	'gm2dgnjugage',
				// 	'gm2dgnjug4ge',
				// 	'gm2dgnjuguge',
				// 	'gm2dgnjvg4ge',
				// 	'gm2dgnjugyge',
				// 	'gm2dgnjxgage',
				// 	'gm2dgnjvgege',
				// 	'gm2dgnrrg4ge',
				// 	'gm2dgnrqgege',
				// 	'gm2dgnrqhage',
				// 	'gm2dgnrrgqge',
				// 	'gm2dgnjzgege',
				// 	'gm2dgnrrgage',
				// 	'gm2dgnrvgmge',
				// 	'gm2dgnrvgqge',
				// 	'gm2dgnrwguge',
				// 	'gm2dgnrwgyge',
				// 	'gm2dgnzqgqge',
				// 	'gm2dgnrwgqge',
				// 	'gm2dgnzrgage',
				// 	'gm2dgnzrguge',
				// 	'gm2dgnzrgege',
				// 	'gm2dgnzsgqge',
				// 	'gm2dgnrwhege',
				// 	'gm2dgnzshege',
				// 	'gm2dgnztgege',
				// 	'gm2dgnzxguge',
				// 	'gm2dgnzsgage',
				// 	'gm2dgnzwg4ge',
				// 	'gm2dgnzxhege',
				// 	'gm2dgnzyhage',
				// 	'gm2dgnzzgige',
				// 	'gm2dgnzzgege',
				// 	'gm2dgobqhege',
				// 	'gm2dgnzzguge',
				// 	'gm2dgobtg4ge',
				// 	'gm2dgobthege',
				// 	'gm2dgobugmge',
				// 	'gm2dgobugage',
				// 	'gm2dgobuguge',
				// 	'gm2dgmjrhage',
				// 	'gm2dgmbzgege',
				// 	'gm2dgmjrgyge',
				// 	'gm2dgmjqg4ge',
				// 	'gm2dgmbsgqge',
				// 	'gm2dgmjwgage',
				// 	'gm2dgmjug4ge',
				// 	'gm2dgmjvgqge',
				// 	'gm2dgmjsg4ge',
				// 	'gm2dgmjuhage',
				// 	'gm2dgmjygyge',
				// 	'gm2dgmjxgage',
				// 	'gm2dgmjxg4ge',
				// 	'gm2dgmjzgmge',
				// 	'gm2dgmjxgige',
				// 	'gm2dgmrrgyge',
				// 	'gm2dgmjzguge',
				// 	'gm2dgmrrhage',
				// 	'gm2dgmrsguge',
				// 	'gm2dgmrrhege',
				// 	'gm2dgmrvgyge',
				// 	'gm2dgmrshege',
				// 	'gm2dgmrugige',
				// 	'gm2dgmrvgege',
				// 	'gm2dgmrvhage',
				// 	'gm2dgmrxhege',
				// 	'gm2dgmrvg4ge',
				// 	'gm2dgmrzgqge',
				// 	'gm2dgmrygqge',
				// 	'gm2dgmrxgage',
				// 	'gm2dgmrwgige',
				// 	'gm2dgmrxgqge',
				// 	'gm2dgmzugige',
				// 	'gm2dgmzsguge',
				// 	'gm2dgmzvhage',
				// 	'gm2dgmzuhage',
				// 	'gm2dgmzqhege',
				// 	'gm2dgmzygyge',
				// 	'gm2denjshage',
				// 	'gm2denjsguge',
				// 	'gm2denjsgmge',
				// 	'gm2denjrguge',
				// 	'gm2denjshege',
				// 	'gm2denjugyge',
				// 	'gm2denjugqge',
				// 	'gm2denjtgige',
				// 	'gm2denjugige',
				// 	'gm2denjvgmge',
				// 	'gm2denjwhege',
				// 	'gm2denjvgage',
				// 	'gm2denjxgege',
				// 	'gm2denjxgmge',
				// 	'gm2denjygmge',
				// 	'gm2denjzgage',
				// 	'gm2denjzhage',
				// 	'gm2denjzhege',
				// 	'gm2denjygige',
				// 	'gm2denjyhege',
				// 	'gm2denjzgige',
				// 	'gm2denrrg4ge',
				// 	'gm2denrsgqge',
				// 	'gm2denrrgige',
				// 	'gm2denrtgqge',
				// 	'gm2denrsgyge',
				// 	'gm2denrrgage',
				// 	'gm2denrthege',
				// 	'gm2denrugyge',
				// 	'gm2denrugege',
				// 	'gm2denrvguge',
				// 	'gm2denrwgmge',
				// 	'gm2denrygige',
				// 	'gm2denrvgqge',
				// 	'gm2denzsgqge',
				// 	'gm2denrzhege',
				// 	'gm2denrwgege',
				// 	'gm2denzqgyge',
				// 	'gm2denzqhage',
				// 	'gm2denzsgyge',
				// 	'gm2denztgege',
				// 	'gm2denzvhage',
				// 	'gm2denzuhage',
				// 	'gm2denzwgege',
				// 	'gm2denzyhege',
				// 	'gm2denztgige',
				// 	'gm2denzxgege',
				// 	'gm2deobsguge',
				// 	'gm2deobsgqge',
				// 	'gm2deobtgage',
				// 	'gm2deobtgqge',
				// 	'gm2deobrg4ge',
				// 	'gm2deobtgyge',
				// 	'gm2deobqgqge',
				// 	'gm2deobuguge',
				// 	'gm2deobxgyge',
				// 	'gm2deobugmge',
				// 	'gm2deobvgqge',
				// 	'gm2deobxgege',
				// 	'gm2deobzhege',
				// 	'gm2deojrhage',
				// 	'gm2deojqgige',
				// 	'gm2deojsgige',
				// 	'gm2deojwgqge',
				// 	'gm2deojshage',
				// 	'gm2deojwgmge',
				// 	'gm2deojvg4ge',
				// 	'gm2deojwhege',
				// 	'gm2deojtgige',
				// 	'gm2deojzg4ge',
				// 	'gm2dgmbqgmge',
				// 	'gm2deojxgage',
				// ].map(name => {
				// 	const acc = require('@walletpack/core/models/Account').default.fromJson({
				// 		name:name,
				// 		authority:'active',
				// 		publicKey:keypair.publicKeys[0].key,
				// 		keypairUnique:keypair.unique(),
				// 		networkUnique:network.unique(),
				// 	});
				//
				// 	fakeScatter.keychain.accounts.push(acc);
				// })

				window.wallet = {
					getVersion:() => `testing_0.0.0`,
					/************************************/
					/**       SIGNING & WALLET         **/
					/************************************/
					availableBlockchains:() => ({
						EOSIO:'eos',
						ETH:'eth',
						TRX:'trx',
						BTC:'btc',
					}),
					exists:() => true,
					unlocked:() => true,
					unlock:() => fakeScatter,
					lock:() => true,
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

						getGeneralSetting:(key, val) => {},
						setGeneralSetting:(key) => {},
						setSimpleMode:() => false,
						getLanguage:() => 'en-US',
						setLanguage:() => true,

						setWalletData:() => fakeScatter,
						getWalletData:() => fakeScatter,
						clearWalletData:() => true,
						getDefaultPath:() => 'nopath',

						saveFile:() => true,
						openFile:() => true,
						getFileLocation:() => true,
						getFolderLocation:() => true,
						mkdir:() => true,

						cacheABI:() => true,
						getCachedABI:() => true,
						getTranslation:() => true,
						setTranslation:() => true,
						getHistory:() => [],
						updateHistory:() => true,
						deltaHistory:() => true,
						swapHistory:() => true,
					},


					/************************************/
					/**           UTILITIES            **/
					/************************************/
					utility:{
						openTools:() => true,
						closeWindow:() => true,
						flashWindow:() => true,
						openLink:(url) => window.open(url),
						reload:() => window.reload(),
						copy:() => true,
						screenshot:() => true,
						openPopOut:() => true,
						popoutResponse:() => true,
						socketResponse:() => {},
						pushNotification:() => true
					},

					sockets:{
						initialize:() => true,
					},
				}

				resolve(true);
			});
		})
	}

}
