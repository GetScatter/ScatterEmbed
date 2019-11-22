<template>
	<section class="prompt pop-over">

		<figure class="title">{{$t('popins.overlay.linkAccount.title')}}</figure>
		<figure class="description">{{$t('popins.overlay.linkAccount.description')}}</figure>

		<Input placeholder="name@authority" centered="1" :text="nameauth" v-on:changed="x => nameauth = x" />

		<br>
		<label>{{$t('popins.overlay.linkAccount.selectNetwork')}}</label>
		<Select :options="validNetworks" :parser="x => x.name" bordered="1" v-on:selected="x => network = x" :selected="network" />

		<section class="actions">
			<Button :text="$t('generic.cancel')" @click.native="returnResult(false)" />
			<Button blue="1" :text="$t('popins.overlay.linkAccount.button')" @click.native="addAccount" />
		</section>

	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import Account from "@walletpack/core/models/Account";
	import AccountService from "@walletpack/core/services/blockchain/AccountService";
	import BalanceService from "@walletpack/core/services/blockchain/BalanceService";
	import ResourceService from "@walletpack/core/services/blockchain/ResourceService";
	import {Blockchains} from "@walletpack/core/models/Blockchains";
	import PluginRepository from "@walletpack/core/plugins/PluginRepository";
	import PopupService from "../../../services/utility/PopupService";
	import {Popup} from "../../../models/popups/Popup";
	import * as UIActions from "../../../store/ui_actions";
	import * as Actions from "@walletpack/core/store/constants";

	export default {
		props:['popin'],
		data(){return {
			nameauth:'',
			network:null,
		}},
		computed:{
			...mapGetters([
				'networks'
			]),
			keypair(){ return this.popin.data.props.keypair; },
			validNetworks(){
				const endorsed = PluginRepository.plugin(Blockchains.EOSIO).getEndorsedNetwork();
				return this.networks.filter(x => x.blockchain === Blockchains.EOSIO).sort((a,b) => {
					return b.chainId === endorsed.chainId ? 1 : a.chainId === endorsed.chainId ? -1 : 0;
				});
			}
		},
		mounted(){
			if(!this.validNetworks.length){
				PopupService.push(Popup.snackbar(this.$t('popins.overlay.linkAccount.noNetworksAvailable')));
				return this.returnResult(false);
			}

			this.network = this.validNetworks[0];
		},
		methods:{
			returnResult(value){
				this.popin.data.callback(value);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			async addAccount(){
				const [name, auth] = this.nameauth.trim().toLowerCase().split('@');
				if(!name.length) return;
				const account = Account.fromJson({
					keypairUnique:this.keypair.id,
					networkUnique:this.network.unique(),
					publicKey:this.keypair.enabledKey().key,
					name,
					authority:auth ? auth : 'active',
				});
				await AccountService.addAccount(account);
				BalanceService.loadBalancesFor(account);
				ResourceService.getResourcesFor(account).then(res => {
					this[Actions.ADD_RESOURCES]({acc:account.identifiable(), res});
				});
				this.returnResult(true);
			},

			...mapActions([
				UIActions.RELEASE_POPUP,
				Actions.ADD_RESOURCES
			])
		}

	}
</script>

<style scoped lang="scss">
	@import "../../../styles/variables";

	.pop-over {
		overflow: visible;
	}

	.prompt {
		max-width:600px;
		padding:30px;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			font-size: $large;
			font-weight: bold;
		}

		.description {
			margin-top:4px;
			font-size: $small;
		}

		.input {
			margin:30px 0 0 0;
		}

		.actions {
			margin-top:20px;
			display:flex;
			justify-content: space-between;
			width:100%;
		}
	}

</style>
