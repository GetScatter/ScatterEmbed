<template>
	<section class="pop-over enable-simple-mode">
		<!--<PopInHead title="Select accounts" v-on:close="returnResult" />-->

		<section class="head">
			<section>
				<figure class="title">
					Select accounts
				</figure>
				<figure class="subtitle">
					In <b>Simple Mode</b> you only use a single account at once for each network. Please select your preferred accounts.
				</figure>
			</section>

			<figure class="close" @click="returnResult(null)">
				<i class="fal fa-times"></i>
			</figure>
		</section>

		<section class="scroller container">

			<section class="transfer">
				<section class="boxes" v-for="(account, networkUnique) in accounts">
					<section class="box-container" style="width:100%;">
						<label>{{accountNetwork(networkUnique).name}}</label>
						<section class="box nested account-selector flex" @click="replaceAccount(account)">
							<section class="symbol">
								<TokenSymbol :token="accountNetwork(networkUnique).systemToken()" />
							</section>
							<section>
								<figure class="name">{{sendable(account)}}</figure>
							</section>
							<figure class="chevron fas fa-caret-square-down"></figure>
						</section>
					</section>
				</section>





			</section>
		</section>

		<br>
		<br>

		<section class="actions">
			<Button text="Cancel" @click.native="returnResult(false)" />
			<Button blue="1" text="Enable Simple Mode" @click.native="enableAndSave" />
		</section>

	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as UIActions from "../../../store/ui_actions";
	import {BlockchainsArray, Blockchains} from '@walletpack/core/models/Blockchains';
	import PluginRepository from '@walletpack/core/plugins/PluginRepository';
	import Account from '@walletpack/core/models/Account'
	import Keypair from '@walletpack/core/models/Keypair'
	import KeyPairService from '@walletpack/core/services/secure/KeyPairService'
	import TokenSymbol from "../../reusable/TokenSymbol";
	import PopupService from "../../../services/utility/PopupService";
	import {Popup} from "../../../models/popups/Popup";
	import * as Actions from '@walletpack/core/store/constants'
	import AccountService from '@walletpack/core/services/blockchain/AccountService';

	export default {
		components: {TokenSymbol},
		props:['popin'],
		data () {return {
			// {network:[Account]}
			accounts:{},
			keys:{},
		}},
		computed:{
			...mapState([
				'scatter',
			]),
			pair(){ return this.popin.data.props.pair; },
		},
		mounted(){
			this.prepareData();
		},
		methods:{
			async prepareData(){
				await Promise.all(BlockchainsArray.map(async ({value: blockchain}) => {
					const networks = this.scatter.settings.networks.filter(x => x.blockchain === blockchain);
					let key = this.scatter.keychain.keypairs.find(x => x.blockchains[0] === blockchain);

					if(!key){
						const keypair = Keypair.placeholder();
						keypair.blockchains = [blockchain];
						await KeyPairService.generateKeyPair(keypair);
						await KeyPairService.makePublicKeys(keypair);
						keypair.setName();
						key = keypair;
					}

					this.keys[blockchain] = key.clone();

					networks.map(network => {
						let account;

						const createNewAccount = () => {
							this.accounts[network.unique()] = Account.fromJson({
								keypairUnique:keypair.unique(),
								networkUnique:network.unique(),
								publicKey:key.enabledKey(),
							});
						};

						const defaultAccounts = this.defaultKeyAccounts(key, network);
						if(defaultAccounts && defaultAccounts.length){
							this.accounts[network.unique()] = defaultAccounts[0].clone();
						}
					})

				}));
				this.$forceUpdate();
			},
			defaultKeyAccounts(key, network){
				if(!this.keypairExists(key.id)) {
					if(PluginRepository.plugin(key.blockchains[0]).accountsAreImported()) return [Account.fromJson({
						keypairUnique:key.unique(),
						networkUnique:network.unique(),
						publicKey:key.enabledKey().key,
					})];
					else return null;
				} else {
					return key.accounts(true).filter(x => x.networkUnique === network.unique()).sort((a,b) => b.logins - a.logins)
				}
			},
			accountNetwork(unique){
				return this.scatter.settings.networks.find(x => x.unique() === unique);
			},
			accountExists(id){
				return !!this.scatter.keychain.accounts.find(x => x.id === id);
			},
			keypairExists(id){
				return !!this.scatter.keychain.keypairs.find(x => x.id === id);
			},
			sendable(account){
				return account.name.length ? account.name : account.publicKey;
			},
			replaceAccount(account){
				const validAccounts = (() => {
					if(!this.accountExists(account.id)) return [account];
					const network = this.scatter.settings.networks.find(x => x.unique() === account.networkUnique);
					return network.accounts(true).sort((a,b) => b.logins - a.logins);
				})();

				PopupService.push(Popup.selectAccount(selected => {
					if(selected){
						const blockchain = this.scatter.settings.networks.find(x => x.unique() === account.networkUnique).blockchain;
						if(selected.keypairUnique !== this.keys[blockchain].unique()){
							this.keys[blockchain] = this.scatter.keychain.keypairs.find(x => x.unique() === selected.keypairUnique).clone();
						}

						this.accounts[account.networkUnique] = selected.clone();
						this.$forceUpdate();
					}

				}, validAccounts));
			},
			async enableAndSave(){
				// No keys or accounts are removed. Instead this is all handled with references and orderings.
				const scatter = this.scatter.clone();
				Object.keys(this.keys).map(blockchain => {
					const key = this.keys[blockchain];
					// Saving new keys if necessary.
					if(!this.keypairExists(key.id)){
						scatter.keychain.keypairs.unshift(key);
					}
				});

				// Persisting new keys
				await this[Actions.SET_SCATTER](scatter);

				await Promise.all(scatter.settings.networks.map(async network => {
					const account = this.accounts[network.unique()];
					// Adding references
					if(account) {
						window.localStorage.setItem(`acc_${network.unique()}`, account.unique());
						// Removing unused accounts
						await AccountService.removeAccounts(network.accounts().filter(x => x.unique() !== account.unique()));
					}

					return true;
				}));

				this.returnResult(true);
			},
			returnResult(x){
				this.popin.data.callback(x);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			...mapActions([
				UIActions.RELEASE_POPUP,
				Actions.SET_SCATTER,
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.enable-simple-mode {
		border-radius:$radius-big;
		max-width:500px;
		display:flex;
		flex-direction: column;

		.head {
			padding:30px;
			background:$blue;
			color:white;
			display:flex;
			padding-bottom:70px;

			.title {
				font-size: $font-size-medium;
			}

			.subtitle {
				font-size: $font-size-small;
				margin-top:8px;
			}

			.close {
				cursor: pointer;
				color:white;
				font-size:$font-size-large;
				border-radius:$radius;
				margin-left:50px;
			}

		}

		.transfer {
			height:auto;
		}

		.container {
			padding:30px;
			margin-top:-40px;
			background:white;
			border-top-left-radius:$radius-big;
			border-top-right-radius:$radius-big;
			height:auto;
			max-height:300px;


			label {
				color:$black;
				font-size: $font-size-small;
			}

			.account-selector {
				padding:10px;
			}
		}

		.boxes {
			margin-bottom:20px;
		}

		.actions {
			padding:10px;
			display:flex;
			justify-content: flex-end;
			width:100%;

			button {
				margin-left:10px;
			}
		}
	}


</style>
