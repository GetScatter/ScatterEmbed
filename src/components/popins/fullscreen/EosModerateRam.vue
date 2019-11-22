<template>
	<section class="pop-in">
		<section>
			<section class="head">
				<figure class="icon font icon-microchip" style="padding-top:7px;"></figure>
				<figure class="subtitle">{{account.sendable()}}</figure>
				<figure class="title">RAM</figure>
			</section>

			<section class="panel-switch">
				<figure class="button" :class="{'active':state === STATES.BUY}" @click="switchState(STATES.BUY)">
					{{$t('generic.buy')}}
				</figure>
				<figure class="button" :class="{'active':state === STATES.SELL}" @click="switchState(STATES.SELL)">
					{{$t('generic.sell')}}
				</figure>
			</section>

			<section class="resource-moderator">
				<section class="split-inputs">
					<Input style="width:120px;"
					     :label="quantityLabel"
					     type="number"
					     v-on:changed="x => ram.quantity = x"
					     :text="ram.quantity" />

					<section>
						<label>{{$t('popins.fullscreen.moderateRam.type')}}</label>
						<Select style="width:200px; margin-top:5px; text-align:left;" bordered="1"
						        :selected="ram.denom"
						        :options="Object.keys(denom).map(x => denom[x])"
						        v-on:selected="changeRamDenom"></Select>
					</section>

					<section style="flex:1;"></section>

					<section style="width:200px; align-self: flex-end;">
						<Input v-if="state === STATES.BUY"
						     :label="$t('popins.fullscreen.moderateCpu.available', {token:systemToken.symbol})"
						     :text="parseFloat(balance - (ram.quantity * price)).toFixed(systemToken.decimals)"
						     v-on:changed="" />

						<Input v-if="state === STATES.SELL"
						     :label="$t('popins.fullscreen.moderateCpu.reclaiming', {token:systemToken.symbol})"
						     :text="parseFloat(ram.quantity * price).toFixed(systemToken.decimals)"
						     v-on:changed="" />
					</section>

				</section>

				<Slider v-if="state === STATES.BUY" :min="0" :max="balance / price" step="1" :value="ram.quantity" v-on:changed="x => ram.quantity = x" />
				<Slider v-if="state === STATES.SELL && accountData" :min="0" :max="availableRam" step="1" :value="ram.quantity" v-on:changed="x => ram.quantity = x" />
			</section>


		</section>

		<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" :buttons-right="[{text:$t('generic.confirm'), red:true, click:() => buyOrSell()}]" />
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
		BUY:'buy',
		SELL:'sell',
	}

	const denom = {
		BYTES:'Bytes',
		KB:'Kilo-Bytes',
		MB:'Mega-Bytes'
	}

	export default {
		props:['popin'],
		data () {return {
			state:STATES.BUY,
			STATES,

			pricePerByte:0,
			balance:0,

			denom,
			ram:{
				denom:denom.BYTES,
				quantity:0,
			},
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

			pricePerKB(){
				return (this.pricePerByte * 1024).toFixed(this.systemToken.decimals);
			},
			pricePerMB(){
				return (this.pricePerKB * 1024).toFixed(this.systemToken.decimals);
			},
			price(){
				switch(this.ram.denom){
					case denom.BYTES: return this.pricePerByte;
					case denom.KB: return this.pricePerKB;
					case denom.MB: return this.pricePerMB;
				}
			},
			availableRam(){
				const ram = this.accountData.ram_quota - this.accountData.ram_usage;
				switch(this.ram.denom){
					case denom.BYTES: return ram;
					case denom.KB: return ram / 1024;
					case denom.MB: return (ram / 1024) / 1024;
				}
			},

			quantityLabel(){
				switch(this.state){
					case STATES.BUY: return this.$t('generic.buy');
					case STATES.SELL: return this.$t('generic.sell');
				}
			}
		},
		methods:{
			returnResult(proxy){
				this.popin.data.callback(proxy);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			buyOrSell(){

				let bytes = 0;
				switch(this.ram.denom){
					case denom.BYTES: bytes = this.ram.quantity; break;
					case denom.KB: bytes = this.ram.quantity * 1024; break;
					case denom.MB: bytes = (this.ram.quantity * 1024) * 1024; break;
				}

				bytes = parseFloat(bytes);
				if(bytes <= 15) return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.moderateRam.bytesError'), 'attention'));

				this.setWorkingScreen(true);

				const isBuying = this.state === STATES.BUY;
				PluginRepository.plugin(Blockchains.EOSIO).buyOrSellRAM(this.account, bytes, isBuying).then(res => {
					this.setWorkingScreen(false);
					if(!res || !res.hasOwnProperty('transaction_id')) {
						return false;
					}
					PopupService.push(Popup.transactionSuccess(Blockchains.EOSIO, res.transaction_id));

					const history = new HistoricAction(this.account, isBuying ? 'buyram' : 'sellram', res.transaction_id);
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

				this.pricePerByte = await plugin.getRamPrice(network);

				plugin.accountData(this.account).then(data => {
					this.accountData = data;
				});
			},



			switchState(state){
				this.state = state;
				this.ram.denom = denom.BYTES;
				this.ram.quantity = 0;
			},
			changeRamDenom(denom){
				this.ram.denom = denom;
				this.ram.quantity = 0;
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
		.input {
			margin-bottom:0;
		}
	}


</style>
