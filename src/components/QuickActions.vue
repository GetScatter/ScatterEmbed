<template>
	<section class="quick-actions" :class="{'sidebarLocked':!sidebarLocked}">

		<section class="left" :class="{'quickBack':quickBack}">
			<section v-if="quickBack" class="quick-back" @click="$router.back()">
				<i class="fal fa-arrow-left"></i>
			</section>
			<svg v-else width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<path d="M22,0 C34.1502645,0 44,9.8497355 44,22 C44,34.1502645 34.1502645,44 22,44 C9.8497355,44 0,34.1502645 0,22 C0,9.8497355 9.8497355,0 22,0 Z M24.1351973,8.87608069 C23.3172851,8.87608069 22.5023063,9.00882172 21.6902364,9.27430777 C20.8781664,9.53979382 20.0982405,9.90556911 19.350435,10.3716446 C18.6026296,10.8377201 17.9074147,11.3863831 17.2647695,12.0176499 C16.6221242,12.6489167 16.0641996,13.3273709 15.590979,14.0530327 C15.1177584,14.7786946 14.7467824,15.542693 14.4780398,16.3450508 C14.2092972,17.1474087 14.074928,17.9438548 14.074928,18.7344133 C14.074928,19.6547649 14.200534,20.4718597 14.4517499,21.1857222 C14.7029658,21.8995847 15.0330468,22.5396915 15.4420029,23.1060617 C15.850959,23.6724319 16.3183303,24.1738981 16.844131,24.6104751 C17.3699317,25.0470522 17.9074088,25.4541247 18.4565784,25.8317048 C19.005748,26.209285 19.543225,26.5721105 20.0690257,26.9201922 C20.5948264,27.2682739 21.0621978,27.6251998 21.4711538,27.9909805 C21.8801099,28.3567613 22.210191,28.7520346 22.4614068,29.1768123 C22.7126227,29.60159 22.8382288,30.0853573 22.8382288,30.6281288 C22.8382288,31.4068878 22.6045431,32.0233962 22.1371647,32.4776723 C21.6697863,32.9319484 21.0680457,33.1590831 20.3319247,33.1590831 C19.9930754,33.1590831 19.6980472,33.1177859 19.4468314,33.0351902 C19.1956155,32.9525946 18.9852984,32.8611507 18.8158737,32.760856 C18.646449,32.6605613 18.5150008,32.5632179 18.4215252,32.4688228 L18.4215252,32.4688228 L18.2462591,32.291833 C18.141099,32.0794442 18.0067297,31.9732513 17.8431473,31.9732513 C17.7146183,31.9732513 17.5685647,32.0440466 17.4049823,32.1856391 C17.2413998,32.3272317 17.0895041,32.5012699 16.9492906,32.7077591 C16.8090771,32.9142482 16.6922343,33.1384331 16.5987586,33.3803204 C16.5052829,33.6222077 16.4585458,33.8493423 16.4585458,34.0617311 C16.4585458,34.120728 16.5169672,34.2475695 16.6338118,34.4422592 C16.7506564,34.636949 16.9551314,34.8404853 17.2472429,35.0528741 C17.5393543,35.2652629 17.93662,35.457 18.4390518,35.628091 C18.9414835,35.799182 19.5724349,35.8847262 20.3319247,35.8847262 C21.0797301,35.8847262 21.7807872,35.7431358 22.4351169,35.4599507 C23.0894467,35.1767656 23.6561345,34.7932915 24.1351973,34.3095169 C24.6142601,33.8257423 24.9910783,33.2564308 25.2656631,32.6015652 C25.5402479,31.9466996 25.6775382,31.2534964 25.6775382,30.5219349 C25.6775382,29.7667746 25.5519322,29.0971698 25.3007163,28.5131005 C25.0495004,27.9290312 24.7164983,27.3980671 24.3017,26.9201922 C23.8869017,26.4423173 23.4166093,26.0057468 22.8908086,25.6104676 C22.3650079,25.2151883 21.8275308,24.8317142 21.2783612,24.4600338 C20.7291916,24.0883533 20.1917146,23.7137286 19.6659139,23.3361485 C19.1401132,22.9585683 18.6698208,22.5455962 18.2550224,22.0972198 C17.8402241,21.6488433 17.507222,21.150327 17.2560062,20.6016558 C17.0047903,20.0529847 16.8791842,19.4305767 16.8791842,18.7344133 C16.8791842,18.073648 16.993106,17.4394409 17.2209529,16.8317728 C17.4487999,16.2241047 17.7496702,15.657743 18.1235729,15.1326706 C18.4974756,14.6075982 18.9297942,14.1267807 19.4205415,13.6902036 C19.9112888,13.2536266 20.4195551,12.8819517 20.9453558,12.5751678 C21.4711565,12.2683839 21.9940282,12.0294501 22.5139866,11.858359 C23.0339451,11.687268 23.5159218,11.6017238 23.9599313,11.6017238 C24.6726833,11.6017238 25.1780286,11.7787119 25.4759823,12.1326933 C25.773936,12.4866747 25.9229107,12.970442 25.9229107,13.5840097 C25.9229107,14.1857781 25.7447253,14.8052363 25.3883493,15.4424028 C25.0319733,16.0795693 24.5908916,16.6636298 24.0650909,17.1946019 C23.5392902,17.725574 22.9784446,18.1621445 22.3825371,18.5043265 C21.7866297,18.8465086 21.2433105,19.017597 20.7525632,19.017597 C20.6006652,19.017597 20.4662959,19.002848 20.3494513,18.9733495 C20.2326067,18.9438511 20.1362114,18.9261523 20.0602624,18.9202526 C19.9843134,18.9143529 19.925892,18.9350015 19.8849964,18.982199 C19.8441008,19.0293966 19.8236533,19.1296898 19.8236533,19.2830817 C19.8236533,19.4718718 19.8703904,19.6872073 19.9638661,19.9290945 C20.0573418,20.1709818 20.18879,20.4010663 20.3582146,20.6193548 C20.5276393,20.8376433 20.7379564,21.020531 20.9891723,21.1680232 C21.2403882,21.3155155 21.5237321,21.3892605 21.8392125,21.3892605 C22.2014307,21.3892605 22.622065,21.2889673 23.1011278,21.0883778 C23.5801906,20.8877884 24.0738516,20.6075573 24.5821256,20.2476762 C25.0903996,19.8877951 25.5869817,19.4630238 26.0718868,18.9733495 C26.5567918,18.4836753 26.9920314,17.9497614 27.3776186,17.3715917 C27.7632058,16.7934221 28.0728393,16.1798636 28.3065285,15.5308977 C28.5402177,14.8819318 28.6570605,14.2211764 28.6570605,13.5486118 C28.6570605,12.840649 28.551902,12.2005422 28.3415817,11.6282723 C28.1312614,11.0560024 27.8333122,10.5663354 27.447725,10.1592568 C27.0621378,9.75217823 26.5889243,9.43654956 26.0280703,9.21236134 C25.4672162,8.98817312 24.8362649,8.87608069 24.1351973,8.87608069 Z" id="Combined-Shape-Copy-21" fill="#00A8FF"></path>
				</g>
			</svg>
		</section>

		<section class="right">
			<section v-if="accounts.length && !hideMainBalance">
				<section class="balances">
					<section class="fiat">
						<span class="balance" @click="selectDisplays">{{totalBalance.symbol}}<AnimatedNumber :number="totalBalance.amount" /></span>
					</section>
					<section class="token" @click="selectDisplays" v-if="displayToken">
						<i class="symbol" :class="displayTokenClass()"></i>
						<span class="balance">{{formatNumber(totalTokenBalance.amount, true)}} {{totalTokenBalance.symbol}}</span>
					</section>
				</section>
			</section>
			<i v-if="accounts.length && !hideMainBalance" class="fal fa-sync" style="cursor: pointer;" :class="{'spin':loadingBalances}" @click="refreshTokens"></i>
		</section>

	</section>
</template>

<script>
	import {mapGetters, mapState} from 'vuex';
	import PriceService from "@walletpack/core/services/apis/PriceService";
	import BalanceService from "@walletpack/core/services/blockchain/BalanceService";
	import {RouteNames} from "../vue/Routing";
	import AnimatedNumber from "./reusable/AnimatedNumber";
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";
	import BalanceHelpers from "../services/utility/BalanceHelpers";

	export default {
		components:{
			AnimatedNumber,
		},
		data(){return {
			loadingBalances:false,
		}},
		computed:{
			...mapState([
				'scatter',
				'balances',
				'prices',
				'history',
				'sidebarLocked'
			]),
			...mapGetters([
				'keypairs',
				'accounts',
				'totalBalances',
				'displayToken',
				'displayCurrency',
				'hideMainBalance',
			]),
			totalBalance(){
				return PriceService.getTotal(BalanceService.totalBalances(true).totals);
			},
			totalTokenBalance(){
				return PriceService.getTotal(BalanceService.totalBalances(true).totals, null, false, this.displayToken);
			},
			quickBack(){
				return [
					RouteNames.ACCOUNT,
					RouteNames.APP,
				].filter(x => !!x).includes(this.$route.name);
			},
			onAccount(){
				if(this.$route.name !== RouteNames.ACCOUNT) return;
				return this.accounts.find(x => x.unique() === this.$route.params.unique);
			},
			hasTooManyAccounts(){
				return this.scatter.keychain.accounts.length > 15
			}
		},
		mounted(){
			if(!this.hasTooManyAccounts) this.refreshTokens();
		},
		methods:{
			async refreshTokens(force = false){
				setTimeout(async () => {
					if(!force && Object.keys(this.balances).length) return;
					if(this.loadingBalances) return;
					this.loadingBalances = true;

					await PriceService.setPrices();

					if(this.hasTooManyAccounts){
						await new Promise(r => {
							PopupService.push(Popup.selectAccount(async accounts => {
								for(let i = 0; i < accounts.length; i++){
									await BalanceService.loadBalancesFor(accounts[i]);
								}
								r(true);
							}, null, true))
						})
					}

					else await BalanceService.loadAllBalances(true);

					await BalanceHelpers.storeBalances();
					this.loadingBalances = false;
				}, 10)
			},
			quickAction(route){
				if(this.onAccount){
					return this.$router.push({name:route, query:{account:this.onAccount.identifiable()}})
				}

				this.$router.push({name:route});
			},
			selectDisplays(){
				PopupService.push(Popup.setDisplayToken(done => {

				}));
			},
			displayTokenClass(){
				return this.scatter.networkTokens().find(x => x.uniqueWithChain() === this.displayToken).symbolClass()
			}
		}

	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.quick-actions {
		background:white;
		padding:0 20px;
		display:flex;
		align-items:center;
		text-align:center;
		justify-content:center;
		color:$black;
		height:70px;
		min-height:70px;
		width:auto;
		z-index:99;
		transition: all 0.12s ease-in-out;

		@media (max-width: $breakpoint-mobile) {
            padding:0 15px;
        }

		&.sidebarLocked {
			left:240px;
		}

		.left {
			opacity:1;
			transition:all 0.22s ease-in-out;

			svg {
				margin-top:2px;
				height:44px;
			}

			&.quickBack {
				width:44px;
				height:44px;
				opacity:1;
				color:$blue;
			}
		}

		.right {
			display:flex;
			justify-content: flex-end;
			flex:1;
			width:80%;
			font-size:$font-size-big;
			align-items: center;

			i {
				margin-left:10px;
			}
		}

		.quick-back {
			font-size: 24px;
			width:44px;
			height:44px;
			line-height:44px;
			text-align:center;
			display:block;
			cursor: pointer;

			i {
				&:before {
					padding:0;
					margin:6px 0 0 0;
				}
			}

		}

		.fiat {
			display:flex;
			align-items: center;

			.balance {
				font-size: $font-size-large;
				font-family: 'Poppins', sans-serif;
				font-weight:bold;
				color:black;
			}

			.refresh {
				cursor: pointer;
				font-size: 22px;
				margin-left:10px;
			}
		}

		.balances {
			cursor: pointer;
		}

		.token {
			display:flex;
			align-items: center;
			margin-top:2px;

			.balance {
				font-size: $small;
				font-weight: bold;
			}
			.symbol {
				cursor: pointer;
				font-size: 18px;
				margin-left:-3px;
			}
		}

		.action {
			height:55px;
			display:flex;
			flex-direction: column;
			justify-content: center;
			padding:0 20px;
			font-size: $medium;
			font-weight:bold;
			text-align:center;
			cursor: pointer;
			margin-top:-7px;
			color:rgba(255,255,255,0.8);

			img {
				transition:transform 0.2s ease;
				transform:translateY(0px);
				width: 44px;
				margin: 0 auto 4px;
			}

			&:hover {
				color:rgba(255,255,255,1);
			}

			&:last-child {
				border-left:1px solid rgba(255,255,255,0.12);
				padding-left:30px;
				margin-left:10px;
				padding-right:0;
			}
		}
	}

</style>
