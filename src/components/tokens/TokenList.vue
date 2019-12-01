<template>
	<section class="token-list" ref="tokenlist" :class="{'blue':blue}">
		<SearchAndFilter full-search="1" v-on:terms="x => terms = x" />
		<section ref="tokens" class="tokens">
			<section :id="token.uniqueWithChain()"
			         class="single-asset"
			         :class="{'hoverable':hoverable, 'active':selected && selected.uniqueWithChain() === token.uniqueWithChain()}"
			         v-for="token in sortedBalances.slice(0, page*pageLength)"
			         @click="selectToken(token)">
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
						<TokenSymbol :token="token" />
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

		<div id="scroll_handle"></div>

		<!--<section v-if="page*pageLength < sortedBalances.length">-->
			<!--<br>-->
			<!--<br>-->
			<!--<br>-->
			<!--<section class="flex">-->
				<!--<Button text="Show More" @click.native="page++" />-->
			<!--</section>-->
		<!--</section>-->
	</section>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex';
	import SearchAndFilter from "../reusable/SearchAndFilter";
	import Token from "@walletpack/core/models/Token";
	import Hasher from '@walletpack/core/util/Hasher'
	import TokenSymbol from "../reusable/TokenSymbol";
	import SharedFunctions from "../../util/SharedFunctions";

	let elem;
	export default {
		components: {TokenSymbol, SearchAndFilter},
		props:['balances', 'hoverable', 'selected', 'noSearch', 'blue'],
		data(){return {
			terms:'',
			page:1,
			pageLength:20,
		}},
		mounted(){
			setTimeout(() => {
				elem = document.getElementById('assets');
				if(elem) elem.addEventListener('scroll', this.handleScroll);
			}, 200);
		},
		destroyed(){
			if(elem) elem.removeEventListener('scroll', this.handleScroll);
		},
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
			handleScroll(e){
				const offset = document.getElementById('scroll_handle').getBoundingClientRect().top;
				if(offset - window.innerHeight < 0) {
					if(this.page*this.pageLength < this.sortedBalances.length){
						this.page++;
					}
				}
			},
			change:SharedFunctions.change,
			colorHex(token){
				if(!token) return null;
				return '#'+Hasher.unsaltedQuickHash(token.unique()).slice(0,6);
			},
			selectToken(token){
				if(!this.hoverable) return;
				this.$emit('token', token);
			},
		},
		watch:{
			['terms'](){
				this.$emit('balances', this.sortedBalances);
				this.page = 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.token-list {
		width:100%;
		padding:0 0 90px;
		background:white;

		@media (max-width: $breakpoint-mobile) {
			height: calc(100vh - 70px);
		}

		.tokens {
			// height:calc(100% - 70px);
			overflow-y:auto;
			background:white;
			width:100%;

			@media (max-width: $breakpoint-mobile) {
		        width:100vw;
		    }

			.single-asset {
				cursor: pointer;
				background:transparent;
				height:60px;
				margin:0 20px;
				transition: all 0.12s ease-in-out;
				grid-template-columns:120px auto;
				display: grid;
				width:calc(100% - 40px);

				&:nth-child(even) {
					background-color:$lightestgrey;
				}

				@media (max-width: $breakpoint-mobile) {
		            grid-template-columns:80px auto;
		            margin:0;
		            width:100%;
		        }

				&:hover,
				&.active {
					background-color:lighten($blue, 44%)
				}

				.asset-movement {
					border-right:1px solid rgba(0,0,0,.06);
					height:60px;
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

							@media (max-width: $breakpoint-mobile) {
					            font-size: $font-size-standard;
					        }
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
				            font-size: $font-size-standard;
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
