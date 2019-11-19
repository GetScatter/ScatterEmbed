<template>
	<section>
		<section class="edit-network" v-if="network">

			<section class="panel-switch" v-if="canEditOrShowToken">
				<figure class="button" :class="{'active':state === STATES.NETWORK}" @click="state = STATES.NETWORK">
					{{$t('generic.networks', 1)}}
				</figure>
				<figure class="button" :class="{'active':state === STATES.TOKEN}" @click="state = STATES.TOKEN">
					{{$t('editNetwork.systemToken')}}
				</figure>
			</section>

			<figure style="height:20px;" v-if="!canEditOrShowToken"></figure>


			<section v-if="state === STATES.NETWORK">
				<Input :label="$t('generic.name')"
				       v-if="isNew"
				       :placeholder="$t('editNetwork.memorableName')"
				       :text="network.name"
				       v-on:changed="x => network.name = x" />

				<section class="split-inputs">
					<Input style="flex:2; margin-bottom:0;" :label="$t('editNetwork.host')"
					       placeholder="127.0.0.1"
					       :text="network.host"
					       v-on:changed="x => network.host = x" />

					<section style="flex:1;">
						<label>{{$t('editNetwork.protocol')}}</label>
						<Select style="flex:1; margin-top:12px;" bordered="1"
						        :selected="network.protocol"
						        :options="['http', 'https']"
						        v-on:selected="x => network.protocol = x" />
					</section>

					<Input style="flex:1; margin-bottom:0;"
					       :label="$t('editNetwork.port')"
					       placeholder="443"
					       type="number"
					       :text="network.port > 0 ? network.port : ''"
					       v-on:changed="x => network.port = x" />
				</section>

				<br>

				<Input :label="$t('generic.chain_id')"
				       :disabled="!isNew"
				       placeholder="x..."
				       :text="network.chainId"
				       :dynamic-button="!isNew ? null : 'icon-globe-1'"
				       :dynamic-tooltip="$t('editNetwork.chainIdTooltip')"
				       :copy="!isNew"
				       v-on:dynamic="fetchChainId"
				       v-on:changed="x => network.chainId = x" />

				<section style="text-align:right" v-if="!brandNew">
					<Button :text="$t('editNetwork.update')" blue="1" @click.native="$emit('save')" />
				</section>
			</section>

			<section v-if="state === STATES.TOKEN">
				<section style="margin-top:10px; text-align:left;" v-if="network && (isNew || network.token)">
					<section class="custom-token-info" v-if="isNew">
						<section style="padding-right:50px;">
							<label>{{$t('editNetwork.systemTokenTitle')}}</label>
							<p>{{$t('editNetwork.systemTokenDescription')}}</p>
						</section>
						<Switcher style="flex:0 0 auto;" :state="network.token" v-on:switched="useCustomToken" />
					</section>

					<section v-if="canEditOrShowToken">
						<section class="split-inputs" v-if="network.token">
							<Input style="flex:1; margin-bottom:0;"
							       :placeholder="contractPlaceholder"
							       :text="network.token.contract"
							       :disabled="!isNew"
							       v-on:changed="x => network.token.contract = x"
							       :label="$tc('generic.contracts', 1)" />
							<Input style="flex:0.5; margin-bottom:0;" placeholder="XXX"
							       :label="$t('generic.symbol')"
							       :text="network.token.symbol"
							       :disabled="!isNew"
							       v-on:changed="x => network.token.symbol = x" />
							<Input style="flex:0.5; margin-bottom:0;" placeholder="4" type="number"
							       :label="$t('generic.decimals')"
							       :disabled="!isNew"
							       :text="network.token.decimals" v-on:changed="x => network.token.decimals = x" />
						</section>
					</section>
				</section>
			</section>


		</section>
	</section>
</template>

<script>
	import {mapGetters} from 'vuex';
	import Token from "@walletpack/core/models/Token";
	import PluginRepository from '@walletpack/core/plugins/PluginRepository'
	import Network from "@walletpack/core/models/Network";

	const STATES = {
		NETWORK:'network',
		TOKEN:'token',
	}

	export default {
		props:['original', 'brandNew'],
		data(){return {
			state:STATES.NETWORK,
			STATES,

			network:null
		}},
		mounted(){
			this.network = this.original ? this.original.clone() : Network.placeholder();
		},
		computed:{
			...mapGetters([
				'networks',
			]),
			isNew(){
				if(!this.network) return false;
				if(this.brandNew) return true;
				return !this.networks.find(x => x.id === this.network.id);
			},
			contractPlaceholder(){
				if(!this.network.token || !this.network.token.blockchain) return;
				return PluginRepository.plugin(this.network.token.blockchain).contractPlaceholder();
			},
			canEditOrShowToken(){
				return this.isNew || this.network.token;
			}
		},
		methods:{
			async fetchChainId(){
				this.network.chainId = await PluginRepository.plugin(this.network.blockchain).getChainId(this.network);
			},
			useCustomToken(){
				if(this.network.token) return this.network.token = null;

				const token = Token.placeholder();
				token.blockchain = this.network.blockchain;
				this.network.token = token;
			},
		},
		watch:{
			['network'](){
				this.$emit('updated', this.network);
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";


	.edit-network {
		padding:0 20px 20px;
		border-radius:$radius;
		margin-top:20px;
		width:100%;
		max-width:500px;

		.select {
			text-align:left;
		}

		.custom-token-info {
			display:flex;
			flex-direction: row;
			align-items: center;
			margin-bottom:20px;
		}
	}


</style>
