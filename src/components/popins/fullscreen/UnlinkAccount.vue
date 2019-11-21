<template>
	<section class="pop-in">
		<section v-if="account">
			<section>
				<section class="head">
					<figure class="icon font icon-trash"></figure>
					<figure class="subtitle">{{account.sendable()}}</figure>
					<figure class="title">{{$t('popins.fullscreen.unlinkAccount.title')}}</figure>

					<section class="disclaimer" style="margin-top:20px;">
						<figure class="title">{{$t('popins.fullscreen.unlinkAccount.description')}}</figure>
						<figure class="description">{{$t('popins.fullscreen.unlinkAccount.disclaimer')}}</figure>
					</section>
				</section>

			</section>

			<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" :buttons-right="[{text:$t('generic.confirm'), red:true, click:() => unlinkAccount()}]" />
		</section>


	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from "@walletpack/core/store/constants";
	import '../../../styles/popins.scss';
	import AccountService from "@walletpack/core/services/blockchain/AccountService";
	import * as UIActions from "../../../store/ui_actions";

	export default {
		props:['popin'],
		data () {return {

		}},
		mounted(){

		},
		computed:{
			...mapState([

			]),
			...mapGetters([
				'keypairs',
				'accounts',
				'history',
			]),
			account(){
				return this.accounts.find(x => x.unique() === this.popin.data.props.account.unique());
			},
		},
		methods:{
			returnResult(removed){
				this.popin.data.callback(removed);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			async unlinkAccount(){
				await AccountService.removeAccounts(this.account.authorities());
				this.returnResult(true);
			},

			...mapActions([
				UIActions.RELEASE_POPUP,
				Actions.DELTA_HISTORY,
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.panel-container {
		overflow: auto;
		height: calc(100vh - 240px);
	}

	.auto-vote {
		max-width:600px;
		margin:0 auto;
		display:flex;

		.switch {

		}

		.details {
			padding-left:20px;
		}
	}

	.list {
		max-width:700px;
		margin:0 auto;
		width:100%;
		text-align:left;

	}

</style>
