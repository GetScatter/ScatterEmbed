<template>
	<section class="receive">

		<section class="scroller">
			<section class="greyback" v-if="account">
				<section class="limit-width">
					<label>{{$t('receive.receiver')}}</label>
					<section class="boxes">
						<section class="box account-selector" @click="selectAccount">
							<section>
								<figure class="name">{{account.sendable()}}</figure>
								<figure class="network">{{account.network().name}}</figure>
							</section>
							<figure class="chevron fas fa-caret-square-down"></figure>
						</section>
					</section>
				</section>
			</section>

			<section class="whiteback" v-if="account">
				<section class="limit-width">
					<section class="boxes">
						<section class="box nested auto-width" v-if="qr">
							<img :src="qr" />
						</section>
						<section class="box nested data-box">
							<section>
								<label>{{$t('receive.sendTo')}}</label>
								<figure class="receiver">{{account.sendable()}}</figure>
							</section>

							<section>
								<figure class="small-info" v-if="account.blockchain() === Blockchains.EOSIO">
									{{$t('receive.forEosio')}}
								</figure>

								<Button blue="1" :text="$t('generic.copy')" @click.native="copy" />
							</section>
						</section>
					</section>
				</section>
			</section>
		</section>

	</section>
</template>

<script>
	import {mapGetters} from 'vuex';
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";
	import QRService from "@walletpack/core/services/secure/QRService";
	import {Blockchains} from "@walletpack/core/models/Blockchains";
	require('../styles/transfers.scss');

	export default {
		data(){return {
			account:null,
			qr:null,
			Blockchains,
		}},
		computed:{
			...mapGetters([
				'accounts',
			])
		},
		mounted(){
			if(this.$route.query.account){
				this.selectedAccount(this.accounts.find(x => x.identifiable() === this.$route.query.account));
			}

			if(!this.account){
				this.selectedAccount(this.accounts.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0]);
			}
		},
		methods:{
			selectAccount(){
				PopupService.push(Popup.selectAccount(account => {
					if(!account) return;
					this.selectedAccount(account);
				}))
			},
			async selectedAccount(account){
				this.account = account;
				const qrData = {
					account:account.sendable(),
					blockchain:account.network().blockchain,
					chainId:account.network().chainId,
				}
				this.qr = await QRService.createUnEncryptedQR(qrData);
			},
			copy(){
				this.copyText(this.account.sendable());
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

</style>
