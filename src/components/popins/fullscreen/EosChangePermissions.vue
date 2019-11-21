<template>
	<section class="pop-in">
		<section>
			<section>
				<section class="head">
					<figure class="icon font icon-flow-tree"></figure>
					<figure class="subtitle">{{account.sendable()}}</figure>
					<figure class="title">{{$t('popins.fullscreen.changePermissions.title')}}</figure>

					<section class="disclaimer">
						<figure class="title">{{$t('popins.fullscreen.changePermissions.disclaimer')}}</figure>
						<figure class="description">{{$t('popins.fullscreen.changePermissions.disclaimerDescription')}}</figure>
					</section>

					<section class="authorities">
						<section class="authority" v-if="hasPermission('owner')">
							<label>{{$t('popins.fullscreen.changePermissions.owner')}}</label>
							<Select v-if="otherKeys.length" bordered="1"
							        :options="otherKeys"
							        :selected="ownerKey ? ownerKey.name : ''"
							        :parser="x => x.name"
							        truncate="1"
							        :subparser="x => publicKeyForKeypair(x)"
							        v-on:selected="x => ownerKey = x" />
						</section>

						<section class="authority" v-if="hasPermission('active')">
							<label>{{$t('popins.fullscreen.changePermissions.active')}}</label>
							<Select v-if="otherKeys.length" bordered="1"
							        :options="otherKeys"
							        :selected="activeKey ? activeKey.name : ''"
							        :parser="x => x.name"
							        truncate="1"
							        :subparser="x => publicKeyForKeypair(x)"
							        v-on:selected="x => activeKey = x" />
						</section>
					</section>

				</section>
			</section>

			<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" :buttons-right="[{text:$t('generic.confirm'), red:true, click:() => changePermissions()}]" />
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import '../../../styles/popins.scss';
	import {Popup} from "../../../models/popups/Popup";
	import {Blockchains} from "@walletpack/core/models/Blockchains";
	import * as UIActions from "../../../store/ui_actions";
	import SharedFunctions from "../../../util/SharedFunctions";

	export default {
		props:['popin'],
		data () {return {
			ownerKey:null,
			activeKey:null,
		}},
		computed:{
			...mapState([

			]),
			...mapGetters([
				'keypairs',
				'accounts',
			]),
			account(){
				return this.accounts.find(x => x.unique() === this.popin.data.props.account.unique());
			},
			otherKeys(){
				return [{name:this.$t('popins.fullscreen.changePermissions.dontChange')}].concat(this.keypairs
					.filter(x => x.publicKeys.some(key => key.blockchain === Blockchains.EOSIO)))
			},
		},
		methods:{
			returnResult(result){
				this.popin.data.callback(result);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			changePermissions(){
				this.returnResult({
					owner:this.publicKeyForKeypair(this.ownerKey),
					active:this.publicKeyForKeypair(this.activeKey),
				})
			},
			publicKeyForKeypair:SharedFunctions.publicKeyForKeypair,
			hasPermission(type){
				return !!this.account.authorities().find(x => x.authority === type || x.authority === 'owner');
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";


	.disclaimer {
		margin-top:20px !important;
		margin-bottom:30px !important;
	}

	.authorities {
		margin-top:10px;
		max-width:500px;
		min-width:500px;
		display:flex;
		justify-content: space-between;

		.authority {
			flex:1;
			margin:0 5px 20px;
			display:inline-block;

			label {
				display:block;
				margin-bottom:5px;
				font-size: $medium;
				font-weight: bold;
				color:$silver;

			}
		}
	}


</style>
