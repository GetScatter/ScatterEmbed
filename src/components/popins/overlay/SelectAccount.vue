<template>
	<section class="select-account pop-over">
		<PopInHead :title="$t('popins.overlay.selectAccount')" v-on:close="returnResult" />
		<KeysAndAccountList :accounts="validAccounts" v-on:account="returnResult" as-selector="1" no-balances="1" :checkboxes="checkboxes" v-on:selected="changeSelected" />

		<section class="actions" v-if="checkboxes">
			<Button :text="$t('generic.cancel')" @click.native="returnResult(false)" />
			<Button blue="1" :text="$t('generic.okay')" @click.native="returnResult(selected)" />
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import KeysAndAccountList from "../../misc/KeysAndAccountList";
	import {BlockchainsArray, blockchainName} from '@walletpack/core/models/Blockchains';
	import * as UIActions from "../../../store/ui_actions";

	export default {
		components: {KeysAndAccountList},
		props:['popin'],
		data(){return {
			terms:'',
			blockchainFilter:null,

			selected:[],
		}},
		computed:{
			...mapGetters([
				'accounts',
			]),
			validAccounts(){
				return this.popin.data.props.validAccounts;
			},
			checkboxes(){
				return this.popin.data.props.checkboxes;
			},
		},
		methods:{
			returnResult(account){
				this.popin.data.callback(account);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			changeSelected(uniques){
				this.selected = uniques.map(unique => this.accounts.find(x => x.unique() === unique));
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		}

	}
</script>

<style scoped lang="scss">
	@import "../../../styles/variables";

	.select-account {
		//min-width:800px;

		.actions {
			width:100%;
			padding:5px;
			display:flex;
			justify-content: space-between;
		}
	}
	.keys-and-accounts-list {
		overflow-y: auto;
		height:calc(100vh - 160px);
	}

	.mobile {
		.keys-and-accounts-list {
			height:100vh;
		}
	}

</style>
