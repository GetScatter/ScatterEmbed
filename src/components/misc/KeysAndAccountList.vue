<template>
	<section class="keys-and-accounts-list">
		<SearchAndFilter :filters="filters" :full-search="!filters.length" v-on:terms="x => terms = x" />

		<section class="keys-list" v-if="keypairs.length">
			<section class="keypair" v-for="keypair in filteredKeypairs" :class="{'new':isNew(keypair), 'selectable':keypairsOnly}" @click="$emit('keypair', keypair)">
				<section class="keypair-info">
					<figure class="blockchain" v-if="refreshingAccounts !== keypair.unique()" :class="`token-${keypair.enabledKey().blockchain}-${keypair.enabledKey().blockchain}`"></figure>
					<figure class="blockchain" v-if="refreshingAccounts === keypair.unique()"><i class="icon-spin4 animate-spin"></i></figure>
					<section class="info">
						<figure class="name">{{keypair.name}}</figure>
						<figure class="key selectable">{{keypair.enabledKey().key}}</figure>
						<figure class="key" v-if="keypair.external"><b>{{keypair.external.type}}</b></figure>
					</section>
					<section class="actions" v-if="!asSelector">
						<figure class="action icon-key" v-tooltip="$t('generic.export')" v-if="!keypair.external" @click="exportPrivateKey(keypair)"></figure>
						<figure class="action hardware icon-microchip" v-if="keypair.external"></figure>
						<figure class="action fas fa-caret-square-down" v-tooltip="$t('generic.actions')" @click="setActionsMenu(keypair)"></figure>

						<section class="action-menu" :class="{'hidden':actionsMenu !== keypair.id}">
							<figure class="item" @click="editKeypairName(keypair)">
								<i class="icon-pencil"></i> {{$t('keysAndAccountsList.actions.editName')}}
							</figure>

							<figure class="item" @click="copyPublicKey(keypair)">
								<i class="icon-docs"></i> {{$t('keysAndAccountsList.actions.copyPublicKey')}}
							</figure>

							<figure class="item" :class="{'disabled':refreshingAccounts}" @click="refreshAccountsFor(keypair)">
								<i class="icon-arrows-ccw"></i> {{$t('keysAndAccountsList.actions.refreshAccounts')}}
							</figure>

							<figure class="item" v-if="!keypair.external" @click="convertKeypair(keypair)">
								<i class="icon-flow-tree"></i> {{$t('keysAndAccountsList.actions.convertBlockchain')}}
							</figure>

							<figure class="item" @click="removeKeypair(keypair)">
								<i class="icon-trash"></i> {{$t('keysAndAccountsList.actions.removeKey')}}
							</figure>

							<figure class="item" v-if="holdingCtrl && keypair.enabledKey().blockchain === Blockchains.EOSIO" @click="linkAccount(keypair)">
								<i class="icon-user"></i> {{$t('keysAndAccountsList.actions.linkAccount')}}
							</figure>
						</section>
					</section>
				</section>

				<section v-if="!keypairsOnly">
					<section v-if="filteredAccounts(keypair).length">
						<figure class="accounts-label">{{$t('keysAndAccountsList.linkedAccounts')}}</figure>
						<section class="accounts-list">
							<section class="account" v-for="account in filteredAccounts(keypair)" @click="$emit('account', account)">
								<section class="details">
									<figure class="name">{{account.sendable()}}</figure>
									<figure class="network">{{account.network().name}}</figure>
								</section>
								<section class="tokens" v-if="!noBalances && account.tokens().length">
									<figure class="balance">{{account.totalFiatBalance()}} {{displayCurrency}}</figure>
									<figure class="quantity">{{account.tokens().length}} {{$tc('generic.tokens', account.tokens().length)}}</figure>
								</section>
								<section class="actions" v-if="!asSelector">
									<figure class="chevron icon-right-open-big"></figure>
								</section>
							</section>
						</section>
					</section>

					<section class="no-accounts" v-else>
						<section>
							{{$t('keysAndAccountsList.noAccounts.title')}}
							<p v-if="canCreateAccounts(keypair)">{{$t('keysAndAccountsList.noAccounts.requiresPayment', {blockchain:blockchainName(keypair.enabledKey().blockchain)})}}</p>
							<p v-else>{{$t('keysAndAccountsList.noAccounts.checkEnabled', {blockchain:blockchainName(keypair.enabledKey().blockchain)})}}</p>
						</section>

						<Button v-if="canCreateAccounts(keypair)" :text="$t('keysAndAccountsList.noAccounts.createAccountButton')" @click.native="createEosAccount(keypair)" />
					</section>
				</section>


			</section>
		</section>

	</section>
</template>

<script>
	import {mapGetters} from 'vuex';
	import PluginRepository from "@walletpack/core/plugins/PluginRepository";
	import SearchAndFilter from "../reusable/SearchAndFilter";
	import {blockchainName, BlockchainsArray, Blockchains} from '@walletpack/core/models/Blockchains'
	import PopupService from "../../services/utility/PopupService";
	import {Popup} from "../../models/popups/Popup";
	import AccountService from "@walletpack/core/services/blockchain/AccountService";
	import KeyPairService from "@walletpack/core/services/secure/KeyPairService";
	import BalanceService from "@walletpack/core/services/blockchain/BalanceService";

	export default {
		components: {SearchAndFilter},
		props:['asSelector', 'accounts', 'keypairsOnly', 'noBalances', 'startingChain'],
		data(){return {
			blockchainFilter:null,
			terms:'',
			actionsMenu:null,
			refreshingAccounts:null,
			holdingCtrl:false,
			Blockchains,
		}},
		computed:{
			...mapGetters([
				'keypairs',
				'displayCurrency',
				'networks'
			]),

			blockchains(){
				if(!this.accounts) return BlockchainsArray.map(x => x.value);
				return this.accounts.reduce((acc,x) => {
					if(!acc.includes(x.blockchain)) acc.push(x.blockchain);
					return acc;
				}, [])
			},
			filters(){
				if(this.blockchains.length <= 1) return [];

				return [
					{
						selected:this.blockchainFilter,
						options:[null].concat(BlockchainsArray.map(x => x.value)),
						parser:x => x === null ? 'All Blockchains' : blockchainName(x),
						onSelect:x => this.blockchainFilter = x,
					},
				]
			},
			filteredKeypairs(){
				const keypairs = (() => {
					if(!this.accounts) return this.keypairs;
					const accountUniques = this.accounts.map(a => a.unique());
					return this.keypairs.filter(x => {
						return x.accounts(true).find(acc => accountUniques.includes(acc.unique()))
					})
				})();
				return keypairs.filter(x => {
					return !this.blockchainFilter || x.enabledKey().blockchain === this.blockchainFilter;
				}).filter(x => {
					return x.accounts().find(account => account.sendable().toLowerCase().indexOf(this.terms) > -1)
						|| x.enabledKey().key.toLowerCase().indexOf(this.terms) > -1
				}).filter(x => {
					if(this.asSelector) return !!x.accounts().length;
					else return true;
				}).sort((a,b) => {
					return b.accounts().length - a.accounts().length;
				})
			},
		},
		mounted(){
			if(this.startingChain) this.blockchainFilter = this.startingChain;
			window.addEventListener('click', this.handleClick);
			window.addEventListener("keydown", this.handleKeyDown);
			window.addEventListener("keyup", this.handleKeyUp);
		},
		destroyed(){
			window.removeEventListener('click', this.handleClick)
			window.removeEventListener("keydown", this.handleKeyDown);
			window.removeEventListener("keyup", this.handleKeyUp);
		},
		methods:{
			handleClick(e){
				const paths = e.path.map(x => x.className)
				if(this.actionsMenu && !paths.includes('action-menu') && !paths.includes('action fas fa-caret-square-down')){
					this.actionsMenu = null;
				}
			},
			handleKeyDown(e){
				if(e.which === 17) this.holdingCtrl = true;
			},
			handleKeyUp(e){
				if(e.which === 17) {
					setTimeout(() => {
						this.holdingCtrl = false;
					}, 5000);
				}
			},
			canCreateAccounts(keypair){
				return PluginRepository.plugin(keypair.enabledKey().blockchain).accountsAreImported()
			},
			linkAccount(keypair){
				PopupService.push(Popup.eosLinkAccount(keypair))
			},
			createEosAccount(keypair){
				PopupService.push(Popup.eosCreateAccount(keypair, done => {

				}))
			},
			filteredAccounts(keypair){
				return keypair.accounts(true)
					.filter(x => this.accounts ? this.accounts.find(y => y.identifiable() === x.identifiable()) : true)
					.filter(x => x.sendable().indexOf(this.terms) > -1)
					.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())
			},
			isNew(keypair){
				return keypair.createdAt && keypair.createdAt > (+new Date() - (1000 * 30));
			},
			setActionsMenu(keypair){
				setTimeout(() => {
					this.actionsMenu = this.actionsMenu === keypair.id ? null : keypair.id;
				}, 20);
			},
			copyPublicKey(keypair){
				this.actionsMenu = null;
				this.copyText(keypair.enabledKey().key);
			},
			removeKeypair(keypair){
				this.actionsMenu = null;
				PopupService.push(Popup.removeKeypair(keypair, removed => {}));
			},
			convertKeypair(keypair){
				const blockchains = this.networks.reduce((acc, x) => {
					if(!acc.includes(x.blockchain)) acc.push(x.blockchain);
					return acc;
				}, []).filter(x => x !== keypair.enabledKey().blockchain);
				PopupService.push(Popup.selectBlockchain(async blockchain => {
					if(!blockchain) return;
					const clone = KeyPairService.convertKey(keypair, blockchain);
					await KeyPairService.saveKeyPair(clone);
					const accounts = await AccountService.importAllAccounts(clone, false, [blockchain]);
					for(let i = 0; i < accounts.length; i++){
						await BalanceService.loadBalancesFor(accounts[i]);
					}
				}, blockchains));
			},
			editKeypairName(keypair){
				PopupService.push(Popup.prompt(
					this.$t('keysAndAccountsList.changeKeypairNameTitle'),
					this.$t('keysAndAccountsList.changeKeypairNameDescription'),
					name => {
						if(!name || !name.trim().length) return;
						const clone = keypair.clone();
						clone.name = name.trim();
						if(this.keypairs.find(x => x.id !== keypair.id && x.name.toLowerCase() === clone.name.toLowerCase())){
							return PopupService.push(Popup.snackbar(this.$t('errors.keypairExists')));
						}
						KeyPairService.updateKeyPair(clone);
						this.actionsMenu = null;
					},
					true,
					{
						placeholder:'Enter a name',
					}
				))
			},
			async refreshAccountsFor(keypair){
				if(this.refreshingAccounts) return;
				this.actionsMenu = null;
				this.refreshingAccounts = keypair.unique();
				await AccountService.importAllAccounts(keypair, false, keypair.blockchains);
				this.refreshingAccounts = false;
			},
			exportPrivateKey(keypair){
				PopupService.push(Popup.verifyPassword(verified=> {
					if(!verified) return;
					PopupService.push(Popup.exportPrivateKey(keypair.clone()));
				}))
			}
		}

	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.keys-list {
		height:calc(100% - 95px);
		overflow-y:auto;
		padding:0 20px;
		background:white;
		padding-bottom:60px;

		@media (max-width: 400px) {
			padding:0;
		}

		.keypair {
			background-color:$lightergrey;
			margin-bottom:20px;
			border:1px solid $lightgrey;
			padding:10px 10px 0;
			border-radius:$radius;

			@media (max-width: 400px) {
				border-radius:0;
				border:0;
			}

			&.new {
				border:1px solid $lighterblue;
				position:relative;

				&:after {
					content:'NEW';
					background:$blue;
					font-size:$font-size-tiny;
					font-weight:bold;
					right:-1px;
					top:-1px;
					padding:4px 6px 4px;
					color:white;
					position:absolute;
				}
			}

			.keypair-info {
				display:flex;
				align-items: center;
				margin-bottom:10px;

				@media (max-width: $breakpoint-mobile) {
			        flex-direction:column;
			        margin-bottom:-10px;
			    }

				.blockchain {
					font-size: 36px;
					background:$blue;
					border:1px solid $darkblue;
					color:$white;
					border-radius:50%;
					height:50px;
					width:50px;
					display:flex;
					justify-content: center;
					align-items: center;
					margin-right:10px;
					position: relative;

					@media (max-width: $breakpoint-mobile) {
						margin:0;
					}

					.icon-spin4 {
						font-size: 28px;
						padding-top:2px;
						transform-origin: center;
					}
				}

				.info {
					flex:1;

					@media (max-width: $breakpoint-mobile) {
				        margin-top:10px;
				        text-align:center;
				    }

					.name {
						font-size: $large;
						font-weight: bold;
					}

					.key {
						margin-top:3px;
						font-size: $small;
						font-weight: bold;
						color:$silver;

						b {
							color:$blue;
						}
					}
				}

			}

			&.selectable {
				cursor: pointer;

				&:hover {
					.keypair-info {
						.info {
							.name {
								color:$blue;
							}
						}
					}
				}
			}

			.accounts-label {
				margin:20px -10px -10px;
				padding:10px 15px;
				font-size: $tiny;
				background-color:lighten($blue, 40%);
				text-transform: uppercase;
				color:$blue;
				font-weight: bold;
			}

			.no-accounts {
				margin-top:5px;
				font-size: $large;

				display:flex;
				justify-content: space-between;
				align-items: center;

				padding:10px 10px 10px 20px;
				background:$blue;
				color:$white;
				margin-bottom:10px;
				border-radius:$radius;
				border:1px solid $darkblue;

				p {
					margin:0;
				}
			}

			.accounts-list {
				margin-top:10px;

				.account {
					display:flex;
					align-items: center;
					padding:15px;
					background:white;
					cursor: pointer;
					margin-left: -10px;
					margin-right: -10px;

					&:last-child {
						border-bottom-left-radius:$radius;
						border-bottom-right-radius:$radius;
					}

					.details {
						flex:1;

						.name {
							font-size: $font-size-standard;
							font-weight: bold;

							@media (max-width: $breakpoint-mobile) {
								font-size: $font-size-small;
							}
						}

						.network {
							font-size: $font-size-standard;
							color:$silver;

							@media (max-width: $breakpoint-mobile) {
								font-size: $font-size-small;
							}
						}
					}

					.tokens {
						.balance {
							font-size: $medium;
							font-weight: bold;
						}

						.quantity {
							font-size: $small;
						}
					}

					.actions {
						padding-left:10px;
						color:$blue;
					}

					&:hover {
						background-color:lighten($blue, 45%);

						.details {
							.name {
								color:$blue;
							}
						}
					}
				}
			}
		}
	}

	.mobile {
		.keys-list {
			height:calc(100% - 170px);
		}
	}

</style>
