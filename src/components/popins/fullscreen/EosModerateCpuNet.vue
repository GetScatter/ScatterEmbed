<template>
	<section class="pop-in">
		<section>
			<section class="head">
				<figure class="icon font icon-network"></figure>
				<figure class="subtitle">{{account.sendable()}}</figure>
				<figure class="title">CPU &amp; NET</figure>
			</section>

			<section class="panel-switch">
				<figure class="button" :class="{'active':state === STATES.STAKE}" @click="switchState(STATES.STAKE)">
					{{$t('popins.fullscreen.moderateCpu.stake')}}
				</figure>
				<figure class="button" :class="{'active':state === STATES.UNSTAKE}" @click="switchState(STATES.UNSTAKE)">
					{{$t('popins.fullscreen.moderateCpu.unstake')}}
				</figure>
			</section>

			<section class="resource-moderator">
				<section class="split-inputs">
					<section class="split-inputs" style="width:300px;">
						<Input label="CPU"
						       type="number"
						       v-on:changed="x => cpu = x"
						       :text="cpu" />
						<Input label="NET"
						     type="number"
						     v-on:changed="x => net = x"
						     :text="net" />
					</section>

					<section style="flex:1;"></section>

					<section class="available-input">
						<Input v-if="state === STATES.STAKE"
						     :label="$t('popins.fullscreen.moderateCpu.available', {token:systemToken.symbol})" :disabled="true"
						     :text="parseFloat(balance - cpu - net).toFixed(systemToken.decimals)"
						     v-on:changed="" />

						<Input v-if="state === STATES.UNSTAKE"
						     :label="$t('popins.fullscreen.moderateCpu.reclaiming', {token:systemToken.symbol})" :disabled="true"
						     :text="parseFloat(cpu + net).toFixed(systemToken.decimals)"
						     v-on:changed="" />
					</section>

				</section>

				<section v-if="state === STATES.STAKE">
					<section class="split-inputs">
						<figure class="resource">CPU</figure>
						<Slider :min="0" :max="balance - this.net" step="0.0001" :value="cpu" v-on:changed="x => cpu = x" />
					</section>
					<section class="split-inputs">
						<figure class="resource">NET</figure>
						<Slider :min="0" :max="balance - this.cpu" step="0.0001" :value="net" v-on:changed="x => net = x" />
					</section>
				</section>

				<section v-if="state === STATES.UNSTAKE">
					<section class="split-inputs">
						<figure class="resource">CPU</figure>
						<Slider :min="-availableCPU" :max="0" step="0.0001" :value="-cpu" v-on:changed="x => cpu = Math.abs(x)" />
						<figure class="resource">{{parseFloat(availableCPU - cpu).toFixed(this.account.network().systemToken().decimals)}}</figure>
					</section>
					<section class="split-inputs">
						<figure class="resource">NET</figure>
						<Slider :min="-availableNET" :max="0" step="0.0001" :value="-net" v-on:changed="x => net = Math.abs(x)" />
						<figure class="resource">{{parseFloat(availableNET - net).toFixed(this.account.network().systemToken().decimals)}}</figure>
					</section>
				</section>
			</section>


		</section>

		<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" :buttons-right="[{text:$t('generic.confirm'), red:true, click:() => stakeOrUnstake()}]" />
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import '../../../styles/popins.scss';
	import {Blockchains} from "@walletpack/core/models/Blockchains";
	import PluginRepository from "@walletpack/core/plugins/PluginRepository";
	import PopupService from "../../../services/utility/PopupService";
	import {Popup} from "../../../models/popups/Popup";
	import HistoricAction from "@walletpack/core/models/histories/HistoricAction";
	import * as UIActions from "../../../store/ui_actions";
	import * as Actions from "@walletpack/core/store/constants";

	const STATES = {
		STAKE:'stake',
		UNSTAKE:'unstake',
	}

	export default {
		props:['popin'],
		data () {return {
			state:STATES.STAKE,
			STATES,

			balance:0,

			cpu:0,
			net:0,
		}},
		created(){
			this.init()
		},
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

			systemToken(){
				return this.account.network().systemToken();
			},

			availableCPU(){
				if(!this.accountData) return 0;
				if(!this.accountData.self_delegated_bandwidth) return 0;
				return this.accountData.self_delegated_bandwidth.cpu_weight.split(' ')[0];
			},
			availableNET(){
				if(!this.accountData) return 0;
				if(!this.accountData.self_delegated_bandwidth) return 0;
				return this.accountData.self_delegated_bandwidth.net_weight.split(' ')[0];
			},

		},
		methods:{
			returnResult(proxy){
				this.popin.data.callback(proxy);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			stakeOrUnstake(){
				if(this.cpu < 0 || this.net < 0) return null;
				if(this.cpu <= 0 && this.net <= 0) return null;

				this.setWorkingScreen(true);

				const cpu = `${parseFloat(this.cpu).toFixed(this.systemToken.decimals)} ${this.systemToken.symbol}`;
				const net = `${parseFloat(this.net).toFixed(this.systemToken.decimals)} ${this.systemToken.symbol}`;

				const isStaking = this.state === STATES.STAKE;
				PluginRepository.plugin(Blockchains.EOSIO).stakeOrUnstake(this.account, cpu, net, isStaking).then(res => {
					this.setWorkingScreen(false);
					if(!res || !res.hasOwnProperty('transaction_id')) {
						return false;
					}
					PopupService.push(Popup.transactionSuccess(Blockchains.EOSIO, res.transaction_id));
					const history = new HistoricAction(this.account, isStaking ? 'delegatebw' : 'undelegatebw', res.transaction_id);
					this[Actions.DELTA_HISTORY](history);
					this.returnResult(res);
				}).catch(err => {
					this.setWorkingScreen(false);
				})

			},

			async init(){
				this.setWorkingScreen(false);
				const plugin = PluginRepository.plugin(Blockchains.EOSIO);
				const network = this.account.network();
				const token = this.systemToken;
				this.balance = await plugin.balanceFor(this.account, token);

				plugin.accountData(this.account).then(data => {
					this.accountData = data;
				});
			},



			switchState(state){
				this.state = state;
				this.cpu = 0;
				this.net = 0;

			},

			...mapActions([
				UIActions.RELEASE_POPUP,
				Actions.DELTA_HISTORY,
			])
		},
		watch:{
			['ram.quantity'](){
				if(!this.ram.quantity.toString().length) this.ram.quantity = 0;
			}
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.panel-container {
		overflow: auto;
		height: calc(100vh - 240px);
	}

	.resource-moderator {

		.available-input {
			width:200px;
			align-self:
			flex-end;

			@media (max-width: $breakpoint-mobile) {
	            width:100%;
	        }
		}

		@media (max-width: $breakpoint-mobile) {
            flex-direction: column;
        }

	}

	.resource {
		font-size: 11px;
		font-weight: bold;
		color:$mid-dark-grey;
		flex:0 0 auto;
		margin:20px 10px 0;
		max-width:150px;

		&:first-child {
			margin-left:0;
		}

		&:last-child {
			margin-right:0;
			min-width:50px;
			text-align:right;
		}

		@media (max-width: $breakpoint-mobile) {
            margin:0 0 10px !important;
        }
	}


</style>
