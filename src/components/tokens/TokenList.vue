<template>
	<section class="token-list" :class="{'blue':blue}">
		<SearchAndFilter full-search="1" v-on:terms="x => terms = x" />
		<section class="tokens">
			<section class="single-asset" :class="{'hoverable':hoverable, 'active':selected && selected.uniqueWithChain() === token.uniqueWithChain()}" v-for="token in sortedBalances" @click="selectToken(token)">
				<section class="asset-movement">
					<section class="token-change" v-if="!token.unusable && change(token).perc">
						<figure class="change-value" :class="{'red':!change(token).plus}" v-if="!token.unusable">{{change(token).perc}}</figure>
					</section>
					<section class="staked" v-if="token.unusable">
						<figure class="locked icon-lock">{{token.unusable}}</figure>
					</section>
				</section>
				<section class="asset-details">
					<section class="column token-icon">
						<section class="token-symbol" :class="token.name">
							<div class="symbol" :style="{'background-color':colorHex(token)}" :class="[{'iconed':token.symbolClass(), 'small':token && token.symbol.length >= 4, 'unusable':!!token.unusable}, token.symbolClass()]"></div>
						</section>
					</section>
					<section class="column token-value">
						<figure class="title">{{token.symbol}}</figure>
						<figure class="secondary" v-if="token.fiatPrice() && parseFloat(token.fiatPrice())">{{fiatSymbol(displayCurrency)}}{{formatNumber(token.fiatPrice(), true)}}</figure>
					</section>
					<section class="column token-conversion" v-if="token.amount">
						<figure class="value">{{formatNumber(token.amount, true)}}</figure>
						<figure class="fiat" v-if="token.fiatBalance() && parseFloat(token.fiatBalance())">{{fiatSymbol(displayCurrency)}}{{formatNumber(token.fiatBalance(false), true)}} </figure>
						<!-- <figure class="secondary" v-if="token.baseTokenPrice() && parseFloat(token.baseTokenPrice())">{{formatNumber(token.baseTokenPrice(), true)}}</figure> -->
					</section>
				</section>
			</section>
		</section>
	</section>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex';
	import SearchAndFilter from "../reusable/SearchAndFilter";
	import Token from "@walletpack/core/models/Token";
	import Hasher from '@walletpack/core/util/Hasher'

	export default {
		components: {SearchAndFilter},
		props:['balances', 'hoverable', 'selected', 'noSearch', 'blue'],
		data(){return {
			terms:'',
		}},
		computed:{
			...mapState([

			]),
			...mapGetters([
				'balanceFilters',
				'displayCurrency',
			]),
			sortedBalances(){
				return this.balances
					.filter(token => {
						if(!this.terms.length) return true;
						if(this.terms === '-') return this.change(token) && !this.change(token).plus && token.fiatBalance(false);
						if(this.terms === '+') return this.change(token) && this.change(token).plus && token.fiatBalance(false);
						if(this.terms.indexOf('::') > -1) return `${token.contract.toLowerCase()}::${token.symbol.toLowerCase()}` === this.terms;
						if(isNaN(this.terms)) return token.symbol.toLowerCase().indexOf(this.terms) > -1 || token.contract.toLowerCase().indexOf(this.terms) > -1;
						return token.amount >= parseFloat(this.terms);
					}).sort((a,b) => {
						if(this.terms === '+' || this.terms === '-') return this.change(b, true) - this.change(a, true);
						return Token.sorter(a,b);
					})
			}
		},
		methods:{
			colorHex(token){
				if(!token) return null;
				return '#'+Hasher.unsaltedQuickHash(token.unique()).slice(0,6);
			},
			selectToken(token){
				if(!this.hoverable) return;
				this.$emit('token', token);
			},
			change(token, numOnly = false){
				const dummy = {plus:false, perc:'0%'};
				if(!this.priceData || !this.priceData.hasOwnProperty('today')) return dummy;
				if(token.unusable) return dummy;
				const hour = this.priceData.today.latest;
				const totaled = this.getTokensTotaled();
				const latest = totaled[totaled.length-1] ? totaled[totaled.length-1].data : null;
				const earliest = totaled[0] ? totaled[0].data : null;
				if(!latest || !earliest || !latest[token.uniqueWithChain()] || !earliest[token.uniqueWithChain()]) return '--';
				const diff = earliest[token.uniqueWithChain()] - latest[token.uniqueWithChain()];
				const change = (diff / earliest[token.uniqueWithChain()]) * 100;
				if(numOnly) return Math.abs(parseFloat(change).toFixed(2));
				const symbol = change > 0 ? '-' : '+';
				return {plus:change <= 0, perc:`${symbol}${Math.abs(parseFloat(change).toFixed(2))}%`};
			},
		},
		watch:{
			['terms'](){
				this.$emit('balances', this.sortedBalances);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.token-list {
		width:100%;
		padding:0;
		background:white;

		.tokens {
			height:calc(100% - 70px);
			border-top:1px solid $lightgrey;
			overflow-y:auto;
			background:white;

			.single-asset {
				cursor: pointer;
				background:transparent;
				border-bottom:1px solid $lightergrey;
				height:88px;
				transition: all 0.12s ease-in-out;
				grid-template-columns:120px auto;
				display: grid;

				@media (max-width: $breakpoint-mobile) {
		            grid-template-columns:80px auto;
		        }

				&:hover,
				&.active {
					background-color:lighten($blue, 44%)
				}

				.asset-movement {
					border-right:1px solid rgba(0,0,0,.06);
					height:88px;
					text-align:center;
					display: flex;
					justify-content: center;
					align-items: center;

					.staked {
						font-size:$large;
						color:$grey;
					}

					.token-change {
						text-align:center;
						align-self:center;
						display: inline-block;

						.change-value {
							font-size:$large;
							display:block;
							color:$green;
							font-family: 'Poppins', sans-serif;

							&.red {
								color:$red;
							}
						}
					}
				}

				.asset-details {
					display: grid;
					grid-template-columns:72px auto auto;

					@media (max-width: $breakpoint-mobile) {
						grid-template-columns:44px auto auto;
					}

					.token-icon {
						width:72px;
						text-align:center;
						align-self:center;

						@media (max-width: $breakpoint-mobile) {
							width:44px;
						}
					}

					.token-symbol {
						line-height: 44px;
						font-size: 16px;
						width: 44px;
						height: 44px;
						border-radius: 22px;
						background: $grey;
						margin: 0 auto;
						position: relative;

						@media (max-width: $breakpoint-mobile) {
				            width: 24px;
							height: 24px;
							border-radius: 12px;
							text-align: center;
							font-size: 18px;
							line-height: 24px;
				        }

						.symbol {
							width: 44px;
							height: 44px;
							border-radius: 22px;
							text-align: center;
							font-size: 32px;
							line-height: 44px;
							color:white;

							@media (max-width: $breakpoint-mobile) {
					            width: 24px;
								height: 24px;
								border-radius: 12px;
								text-align: center;
								font-size: 18px;
								line-height: 24px;
					        }
						}

						.icon-lock {
							float:left;
							color:$red;
						}
					}

					.token-value {
						align-self:center;
						text-align:left;
						font-size:$small;

						.title {
							margin-bottom:4px;
							font-size: $font-size-big;
							font-family: 'Poppins', sans-serif;
							font-weight: bold;
						}
					}

					.token-conversion {
						align-self:center;
						text-align:right;
						padding-right:20px;
						font-size: $font-size-standard;
						font-family: 'Poppins', sans-serif;

						.value {
							margin-bottom:4px;
							font-weight:bold;
							font-size:$large;
							color:black;
						}
					}

					&:hover, &:active, &.active {
						border-color:$blue;
					}
				}



			}
		}
	}

</style>