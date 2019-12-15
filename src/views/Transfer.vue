<template>
	<section class="transfer">

		<section class="scroller" v-if="account && token && toSend">
			<!----------------------->
			<!--------- FROM -------->
			<!----------------------->
			<section class="greyback">
				<section class="limit-width">
					<section class="boxes">
						<section class="box-container">
							<label>{{$t('transfer.sender')}}</label>
							<section class="box nested account-selector flex" @click="selectTokenAndAccount">
								<section class="symbol">
									<TokenSymbol :token="token" />
								</section>
								<section>
									<figure class="name">{{account.sendable()}}</figure>
									<figure class="network">{{account.network().name}}</figure>
									<figure class="token">{{token.amount}} {{token.symbol}}</figure>
									<figure class="price">{{token.fiatPrice() || '--'}}</figure>
								</section>
								<figure class="chevron fas fa-caret-square-down"></figure>
							</section>
						</section>
						<section class="box-container">
							<label>{{$t('transfer.receiver')}}</label>
							<section class="box nested">
								<section class="padded recipient-selector" @click="selectRecipient">
									<figure class="name">{{$t('generic.contacts')}}</figure>
									<figure class="chevron fas fa-caret-square-down"></figure>
								</section>
								<figure class="line"></figure>
								<section class="input-container">
									<input :placeholder="$t('generic.addressOrAccount')" v-model="recipient" class="input" />
								</section>
							</section>
						</section>

					</section>
				</section>
			</section>



			<!----------------------->
			<!---------- TO --------->
			<!----------------------->
			<section class="whiteback">
				<section class="limit-width">
					<label>{{$t('transfer.amountTitle')}}</label>
					<section class="boxes">
						<section class="box">
							<section class="input-container">
								<figure class="label">{{token.truncatedSymbol()}}</figure>
								<input placeholder="0.00" v-on:input="changedAmount" v-model="toSend.amount" class="input" />

								<section class="amount-helpers">
									<Button @click.native="() => {toSend.amount = token.amount / 2; changedAmount(); }" small="1" text="50%" />
									<Button @click.native="() => {toSend.amount = token.amount; changedAmount(); }" small="1" text="100%" />
								</section>
							</section>
							<figure class="line"></figure>
							<section class="input-container">
								<figure class="label">{{displayCurrency}}</figure>
								<input placeholder="0.00" v-if="toSend.fiatPrice()" v-on:input="changedFiat" v-model="fiat" class="input" />
								<figure class="input not-available" v-else>{{$t('transfer.priceNotAvailable')}}</figure>
							</section>
						</section>
						<section class="box">
							<section class="input-container">
								<textarea :placeholder="$t('transfer.memo')" v-model="memo" class="input"></textarea>
							</section>
						</section>
					</section>
				</section>
			</section>
		</section>

		<section class="scroller loading-tokens" v-else>
			<section>
				<h1>{{$t('generic.pleaseWait')}}</h1>
				<p>{{$t('transfer.loadingBalances')}}</p>
			</section>
		</section>


		<section class="tail">
			<Button :disabled="!canSend" big="1" :text="$t('generic.send')" blue="1" @click.native="send" />
		</section>
	</section>
</template>

<script>
	import {mapGetters, mapState} from 'vuex';
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";
	import Token from "@walletpack/core/models/Token";
	import BalanceService from "@walletpack/core/services/blockchain/BalanceService";
	import TransferService from "@walletpack/core/services/blockchain/TransferService";
	import PriceService from "@walletpack/core/services/apis/PriceService";
	import PasswordHelpers from "../services/utility/PasswordHelpers";
	import TokenSymbol from "../components/reusable/TokenSymbol";
	require('../styles/transfers.scss');

	export default {
		components: {TokenSymbol},
		data(){return {
			account:null,
			token:null,
			recipient:null,
			memo:'',

			toSend:null,
			fiat:0,

			sending:false,
		}},
		computed:{
			...mapState([
				'history',
			]),
			...mapGetters([
				'accounts',
				'displayCurrency',
				'contacts',
			]),
			sendableTokens(){
				return this.account.tokens().filter(x => !x.unusable).sort((a,b) => {
					return Token.sorter(a,b);
				});
			},
			canSend(){
				return !this.sending && this.recipient && this.recipient.length && this.toSend && this.toSend.amount > 0;
			},
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				const history = this.$route.query.history ? this.history.find(x => x.id === this.$route.query.history) : null;
				const accountAndToken = this.$route.query.account ? (() => {
					const account = this.accounts.find(x => x.identifiable() === this.$route.query.account);
					if(!account) return null;
					return {
						account,
						token:this.$route.query.token ? account.tokens().find(x => x.uniqueWithChain() === this.$route.query.token) : null
					}
				})() : null;

				const recipient = this.$route.query.recipient;


				if(history){
					this.setAccount(history.from);
					this.recipient = history.to;
					this.memo = history.memo;
					this.token = this.account.tokens().find(x => x.uniqueWithChain() === history.token.uniqueWithChain());
					this.toSend = history.token.clone();
					this.toSend.amount = history.amount;
					this.changedAmount();
				}
				else if(accountAndToken){
					this.setAccount(accountAndToken.account);
					if(accountAndToken.token) this.setToken(accountAndToken.token);
					else this.setToken(this.sendableTokens[0]);
				}
				else if (recipient){
					const contact = this.contacts.find(x => x.id === recipient);
					this.recipient = contact.recipient;
					this.setAccount(this.accounts.filter(x => contact.blockchain ? x.blockchain() === contact.blockchain : true)
						.filter(x => x.tokens().length)
						.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0]);
					this.setToken(this.sendableTokens[0]);
				}
				else {
					this.setAccount(this.accounts.filter(x => x.tokens().length)
						.sort((a,b) => b.totalFiatBalance() - a.totalFiatBalance())[0]);
					this.setToken(this.sendableTokens[0]);
				}

				if(!this.account || !this.token || !this.toSend) setTimeout(() => {
					this.init();
				}, 1000);
			},
			selectTokenAndAccount(){
				PopupService.push(Popup.selectTokenAndAccount(result => {
					if(!result) return;
					const {token, account} = result;
					this.setAccount(account);
					this.setToken(token);
				}))
			},
			async setAccount(account){
				this.account = account;
				// await BalanceService.loadBalancesFor(account);
				// this.$forceUpdate();
			},
			selectRecipient(){
				PopupService.push(Popup.selectRecipient(this.account ? this.account.blockchain() : null, recipient => {
					if(!recipient) return;
					this.recipient = recipient;
				}));
			},
			setToken(token){
				if(!token) return;
				PriceService.setPrices();
				this.token = (() => {
					const t = this.account.tokens().find(x => x.uniqueWithChain() === token.uniqueWithChain());
					if(t) return t.clone();
					const clone = token.clone();
					clone.amount = 0;
					return clone;
				})();
				this.toSend = this.token.clone();
				this.toSend.amount = 0;
				this.fiat = 0;
			},
			changedFiat(){
				this.toSend.amount = parseFloat(this.fiat / this.toSend.fiatPrice(false)).toFixed(this.toSend.decimals);
			},
			changedAmount(){
				this.fiat = !this.toSend.amount || this.toSend.amount === '' ? null : this.toSend.fiatBalance(false)
			},
			async send(){
				const reset = () => this.sending = false;
				if(!this.canSend) return;
				this.sending = true;
				if(!await PasswordHelpers.verifyPIN()) return reset();
				this.setWorkingScreen(true);
				const blockchain = this.account.blockchain();
				const sent = await TransferService[blockchain]({
					account:this.account,
					recipient:this.recipient,
					amount:this.toSend.amount,
					memo:this.memo,
					token:this.token,
					promptForSignature:false,
				}).catch(error => {
					console.error('Transfer error', error);
					return false;
				});

				reset();
				this.setWorkingScreen(false);
				if(sent) {
					if(sent.hasOwnProperty('error')){
						PopupService.push(Popup.snackbar(sent.error, "attention-circled"));
					} else if (sent) {
						PopupService.push(Popup.transactionSuccess(blockchain, TransferService.getTransferId(sent, blockchain)));
						setTimeout(() => {
							BalanceService.loadBalancesFor(this.account);
						}, 500);
					} else {

						PopupService.push(Popup.snackbar(this.$t('errors.transferError'), "attention-circled"));
					}

				}
			},
		},
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.loading-tokens {
		display:flex;
		justify-content: center;
		align-items: center;
		text-align:center;

	}


</style>
