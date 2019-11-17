<template>
	<section class="dashboard" :class="{'full-mobile':!tokens && (!canVote)}">
		<section id="asset-updates">

			<section class="attraction" :class="{'full-mobile':!tokens && (!canVote)}">
				<div class="promoted-pill">Promoted</div>
				<section class="premium-attraction" :class="{'no-tokens':!tokens}">
					<!-- Top left logo -->
					<img class="logo" src="https://cryptolegends.io/assets/use-images/logo_crypto.png">

					<!-- Fallback image for when video isn't loaded -->
					<img class="promo" src="https://cryptolegends.io/assets/use-images/bg_special.png">

					<!-- Video promotion -->
					<video class="promo" data-v-1b6b9b64="" data-v-3b6b0f2a="" loop="loop" muted="muted" autoplay="autoplay">
						<source data-v-1b6b9b64="" data-v-3b6b0f2a="" src="https://cryptolegends.io/assets/video/crypto-03.mp4" type="video/mp4">
					</video>

					<div class="description">
						<div class="premium-content">
							<span class="premium-name">Crypto Legends</span>
							<span class="premium-description">
                                Get ready for the battle of your lifetime.<br>
                                Win with strategy by changing your decks according to your opponent and fight to become globally adorned a Crypto Legend.
                            </span>
						</div>
						<Button blue="1" text="Open Crypto Legends" @click.native="openInBrowser('https://cryptolegends.io/home?ref=scatterrefer')" />
					</div>
				</section>

				<!-- Exchange CTA -->
				<section class="suggested-exchanges" v-if="tokens">
					<section class="exchange-panel" v-if="tokens && tokens.lowest">
						<div class="token-logo">
							<i class="fad fa-chart-line-down"></i>
						</div>
						<div class="explainer">
							<span class="title">{{tokens.lowest.token.name}} has dropped {{tokens.lowest.change.perc.replace('-', '')}}</span>
							<!--<span class="suggested-action">This might be a good time to convert to a stable coin.</span>-->
						</div>
						<Button class="cta" text="Exchange" @click.native="exchange(tokens.lowest.token)" />
					</section>
					<section class="exchange-panel" v-if="tokens && tokens.highest">
						<div class="token-logo">
							<i class="fad fa-coins"></i>
						</div>
						<div class="explainer">
							<span class="title">{{tokens.highest.token.name}} has risen {{tokens.highest.change.perc.replace('+', '')}}</span>
							<!--<span class="suggested-action">This might be a good time to secure some gains.</span>-->
						</div>
						<Button class="cta" text="Exchange" @click.native="exchange(tokens.highest.token)" />
					</section>
				</section>

			</section>

		</section>
		<!--<section class="focus-boxes">-->
		<!--<a id="proxy" ref="https://get-scatter.com/vote" style="background-image:url(static/assets/voting.png);"  target="_blank">-->
		<!--<span class="earn-rewards">Earn rewards</span>-->
		<!--<h3>Proxy your EOSIO votes to get daily rewards!</h3>-->
		<!--<h5>-->
		<!--By proxying your votes you can earn daily rewards.-->
		<!--The third party proxies we select all have our Block Producer in them, so you'll also be voting for Scatter and helping us grow!-->
		<!--</h5>-->
		<!--<Button text="Proxy Now!" />-->
		<!--</a>-->
		<!--</section>-->

		<section class="focus-boxes" v-if="canVote">
			<a id="proxy" ref="https://get-scatter.com/vote" style="background-image:url(static/assets/voting.png);"  target="_blank">
				<span class="earn-rewards">Vote for Scatter</span>
				<h3>Show us some love!</h3>
				<h5>
					We've launched an EOS Mainnet Block Producer which you can now vote for. Help us get into a producing position by
					voting for us.
				</h5>
				<Button text="Join our Proxy" @click.native="voteForScatter" :loading="proxying" />
			</a>
		</section>

	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";

	import PluginRepository from '@walletpack/core/plugins/PluginRepository';
	import {Blockchains} from '@walletpack/core/models/Blockchains';
	import SharedFunctions from "../util/SharedFunctions";

	let saveTimeout;
	export default {
		data() {return {
			proxying:false,
			votableChains:[
				'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
				'4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'
			]
		}},
		computed:{
			...mapState([
				'scatter',
			]),
			...mapGetters([
				'keypairs',
				'accounts',
				'networks',
				'totalBalances',
			]),
			tokens(){
				// TODO: This looks better without the tokens panels
				return;
				if(!this.totalBalances) return;
				if(!this.totalBalances.totals) return;

				const balances = Object.keys(this.totalBalances.totals).map(key => this.totalBalances.totals[key]);
				const balanceAndChanges = balances.map(token => {
					return {
						token,
						change:this.change(token)
					}
				}).filter(x => x.change !== '--');

				const percToNum = perc => parseFloat(perc.replace('-', '').replace('%', ''));

				const highest = balanceAndChanges.filter(x => x.change.plus).sort((a,b) => {
					return percToNum(b.change.perc) - percToNum(a.change.perc)
				})[0];
				if(!highest) return;

				const lowest = balanceAndChanges.filter(x => !x.change.plus).sort((a,b) => {
					return percToNum(b.change.perc) - percToNum(a.change.perc)
				})[0];

				return {
					highest,
					lowest
				}
			},
			votableChains(){
				return [

				]
			},
			votableNetworks(){
				return this.votableChains.map(chainId => {
					return this.scatter.settings.networks.find(x => x.blockchain === Blockchains.EOSIO && x.chainId === chainId);
				}).filter(x => !!x);
			},
			canVote(){
				console.log('votableNetworks', this.votableChains, this.votableNetworks);
				return !!this.votableNetworks.length;
			},

		},
		mounted(){

		},
		methods: {
			change:SharedFunctions.change,
			exchange(token){
				const accounts = token.accounts().filter(x => {
					return (bal => bal ? bal.amount : 0)(x.balanceFor(token)) > 0;
				}).sort((a,b) => {
					const bbal = (bal => bal ? bal.amount : 0)(b.balanceFor(token));
					const abal = (bal => bal ? bal.amount : 0)(a.balanceFor(token));
					return bbal - abal
				});
				if(!accounts.length) return;
				const account = accounts[0];
				if(!account) return;
				this.$router.push({name:this.RouteNames.EXCHANGE, query:{account:account.identifiable(), token:token.uniqueWithChain()}})
			},
			async voteForScatter(){
				if(this.proxying) return;
				this.proxying = true;

				const reset = () => {
					this.proxying = false;
				}

				const plugin = PluginRepository.plugin(Blockchains.EOSIO);
				if(!plugin) return reset();

				let trxs = [];
				for(let i = 0; i < this.votableNetworks.length; i++){
					const network = this.votableNetworks[i];
					const accounts = network.accounts(true).filter(account => account.systemBalance() >= 5);

					if(accounts.length){
						const eos = plugin.getSignableEosjs(accounts, () => { reset(); });

						const actions = accounts.map(account => {
							return {
								account: 'eosio',
								name:'voteproducer',
								authorization: [{
									actor: account.sendable(),
									permission: account.authority,
								}],
								data:{
									voter: account.name,
									proxy: 'scatterproxy',
									producers:[],
								},
							}
						});

						await eos.transact({ actions }, { blocksBehind: 3, expireSeconds: 30 })
							.then(trx => {
								trxs.push(trx);
								// PopupService.push(Popup.transactionSuccess(Blockchains.EOSIO, trx.transaction_id));
								return true;
							})
							.catch(res => {
								PopupService.push(Popup.snackbar(res));
								return null;
							})
					}

					if(trxs.length){
						PopupService.push(Popup.snackbar(`Voted for Scatter on ${trxs.length} chains. Thanks for your help!`))
					}

					reset();
				}

			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../styles/variables";

	.dashboard {
		height:calc(100vh - 140px);
		padding:10px 20px 20px;
		display:flex;
		flex-direction:row;

		@media (max-width: $breakpoint-tablet) {
			flex-direction:column;
			padding:0;
			border-radius:0;
			overflow-y: scroll;
		}

		&.full-mobile {
			overflow-y: hidden;
			padding:0;
		}
	}

	#asset-updates {
		flex:1;
		display:flex;

		@media (max-width: $breakpoint-tablet) {
			width:100%;
			display:block;
		}

		.attraction {
			height: 100%;
			text-align: center;
			background: #066AA7;
			position: relative;
			z-index: 0;
			width:100%;

			@media (max-width: $breakpoint-tablet) {
				height:auto;
				border:0;
				margin-bottom:30px;

				&.full-mobile {
					height:100%;
					margin:0;
				}
			}

			.promoted-pill {
				position:absolute;
				right:20px;
				top:20px;
				padding:8px 16px 7px;
				background:rgba(0,0,0,0.34);
				color:white;
				border-radius:$radius-big;
				font-size:$font-size-small;
				display:inline-block;
				margin:0 auto;
				text-transform:uppercase;
				z-index:1;
			}

			.premium-attraction {
				height:65%;
				background-color:$blue;
				background-image: linear-gradient(211deg, #0280CE 12%, #0799FF 46%, #066AA7 100%);
				position:relative;
				overflow:hidden;
				border-radius:$radius-big $radius-big 0 0;

				@media (max-width: $breakpoint-tablet) {
					border-radius:0;
					min-height:400px;
				}

				&.no-tokens {
					height:100%;
				}

				.promo {
					width:100%;
					height:100%;
					object-fit:cover;
					position:absolute;
					top:0;
					bottom:0;
					left:0;
					right:0;

					video {

						width:100%;
					}
				}

				.logo {
					width:120px;
					border-radius:$radius;
					position:absolute;
					top:30px;
					left:30px;
					z-index:2;
					object-fit:cover;
				}

				.description {
					display:block;
					padding:30px;
					position:absolute;
					bottom:0;
					left:0;
					right:0;
					text-align:left;

					&:before {
						content:'';
						display:block;
						position: absolute;
						z-index:0;
						bottom:- calc(200% - 200px);
						left:0;
						right:0;
						background:rgba(0,0,0,0.9);
						height:200%;
						transform: skewY(10deg);
					}

					button {
						max-height: 42px;
						place-self: start;
						margin-top:10px;
					}

					div.premium-content {
						margin-right:20px;
						display:flex;
						flex-direction:column;
						text-align:left;
						justify-content:end;
						align-content:center;
						align-self:end;
						position: relative;

						.premium-name {
							font-size: $font-size-large;
							font-family: 'Poppins', sans-serif;
							font-weight: bold;
							color:white;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
							margin-bottom:8px;

							@media (max-width: $breakpoint-tablet) {
								font-size: 20px;
							}
						}

						.premium-description {
							color:white;
							opacity:0.9;
							font-size: $font-size-standard;
							line-height:1.1rem;
							margin-bottom:10px;
							max-width:400px;

							@media (max-width: 1120px) {
								font-size: $font-size-small;
								line-height:1rem;
							}
						}

					}

				}

			}


			&.full-mobile {
				.premium-attraction {
					border-radius: 0;
				}
			}
		}

		.suggested-exchanges {
			display:flex;
			flex-direction:column;
			height:35%;
			padding:20px 30px;
			background:$lightergrey;
			border-radius:0 0 $radius-big $radius-big;
			z-index: 1;
			position:relative;

			@media (max-width: $breakpoint-tablet) {
				border-radius:0;
				height:auto;
			}

			.token-logo {
				color:$blue;
				font-size:34px;

				@media (max-width: $breakpoint-mobile) {
					font-size:44px;
					margin-bottom:10px;
				}
			}

			.cta {
				justify-self: end;

				button {
					width:120px;
				}
			}

			.explainer {
				display:flex;
				flex-direction:column;
				padding:0 20px;
				flex:1;
				text-align: left;

				@media (max-width: $breakpoint-mobile) {
					padding:0;
				}

				.title {
					font-size: $font-size-standard;
					font-family: 'Poppins', sans-serif;
					font-weight: bold;
					color:black;
					line-height:18px;
					margin-bottom:4px;
				}

				.suggested-action {
					color:black;
					opacity:1;
					font-size: $font-size-small;
					margin-bottom:10px;
				}
			}

			.exchange-panel {
				display:flex;
				flex-direction:row;
				height:50%;
				align-items: center;
				flex: 1;

				@media (max-width: $breakpoint-mobile) {
					flex-direction:column;
					align-items: flex-start;
					height:auto;
					padding:20px 0;
				}
			}

		}

	}

	.focus-boxes {
		display: grid;
		grid-template-rows: 100%;
		width:40%;

		@media (max-width: $breakpoint-tablet) {
			width:100%;
			height:400px;
			display:block;
			flex-direction:column;
		}

		#proxy {
			text-align:center;
			background:white;
			border:1px solid $lightgrey;
			border-radius:$radius-big;
			margin:0 10px 0 20px;
			position:relative;
			transition: border 0.12s ease-in-out;
			display:flex;
			flex-direction:column;
			justify-content:center;
			background-size:100%;
			background-position:center center;
			background-repeat:no-repeat;
			overflow:hidden;
			padding:10px;

			.earn-rewards {
				padding:8px 26px 7px;
				background:black;
				color:white;
				border-radius:$radius-big;
				font-size:$font-size-small;
				display:inline-block;
				margin:0 auto;
				text-transform:uppercase;
			}

			@media (max-width: $breakpoint-tablet) {
				border-radius:$radius-big;
				border:0 !important;
				margin:0 0 70px 0;
				padding:40px 40px 80px;
				display:block;
				height: 400px;

				&:hover {
					border:0;
				}
			}

			h3 {
				color:black;
				font-size:20px;
				line-height:24px;
				display:block;
				background-image: linear-gradient(180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%);
				padding:10px 12px 5px;
				margin:0;
				text-shadow:0 0 10px white, 0 0 20px white;

				@media (min-width: $breakpoint-tablet) {
					font-size:20px;
				}
			}

			h5 {
				color:$silver;
				display:block;
				background:white;
				padding:4px 10px 20px;
				font-size:$font-size-standard;
				font-weight:normal;
			}

			img {
				width: 60%;
				margin:20px auto;
				height:60%;
			}

			&:hover {
				border:1px solid $blue;

				@media (max-width: $breakpoint-mobile) {
					border:0;
				}
			}

			button {
				margin: 0 60px 20px;
			}
		}
	}




</style>
