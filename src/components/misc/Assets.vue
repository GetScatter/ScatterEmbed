<template>
	<section class="assets" id="assets">
		<TokenList hoverable="1" :balances="allBalances" v-on:balances="x => filteredBalances = x" v-on:token="selectToken" :selected="selectedToken" />

		<section class="graph-and-accounts" :class="{'open':selectedToken}">
			<section class="graph-and-accounts-header">
				<span v-if="selectedToken" class="graph-and-accounts-content">
					<span class="graph-and-accounts-name">{{selectedToken.name}}</span>
					<span class="graph-and-accounts-balance">{{selectedToken.amount}}</span>
				</span>
				<i class="fal fa-times graph-and-accounts-close" v-on:click="selectToken(selectedToken)"></i>
			</section>
			<TokenGraph :balances="selectedToken ? [selectedToken] : filteredBalances.length ? filteredBalances : allBalances" />

			<SearchAndFilter full-search="1" v-if="needsAccountSearchBar" v-on:terms="x => terms = x" />
			<section class="accounts" :class="{'with-search':needsAccountSearchBar}" v-if="selectedToken">
				<section class="account" :key="account.unique()" v-for="account in filteredAccounts">
					<figure class="name">{{account.sendable()}}</figure>
					<figure class="network">{{account.network().name}}</figure>
					<section class="details">
						<section v-if="account.balanceFor(selectedToken)">
							<figure class="balance">{{formatNumber(account.balanceFor(selectedToken).amount, true)}} {{selectedToken.symbol}}</figure>
							<figure class="fiat">{{fiatSymbol(displayCurrency)}}{{formatNumber(account.balanceFor(selectedToken).fiatBalance(), true)}}</figure>
						</section>
						<section v-else>
							<figure class="balance">{{formatNumber(parseFloat(0).toFixed(selectedToken.decimals), true)}} {{selectedToken.symbol}}</figure>
							<figure class="fiat">0.0000 {{displayCurrency}}</figure>
						</section>

						<section class="actions" v-if="!asSelector && !selectedToken.unusable">
							<Button :text="$t('generic.send')" big="1" @click.native="sendToken(selectedToken, account)" />
						</section>

						<section class="actions" v-if="asSelector">
							<Button :text="$t('generic.select')" big="1" @click.native="$emit('selected', {token:selectedToken, account})" />
						</section>
					</section>
				</section>
			</section>

			<section v-else class="no-accounts">
				<span v-if="!selectedToken">{{$t('generic.selectToken')}}</span>
				<span v-if="selectedToken">{{$t('assets.noAccounts')}}</span>
			</section>
		</section>
	</section>
</template>

<script>
	import {mapState, mapGetters} from 'vuex';
	import TokenList from "../../components/tokens/TokenList";
	import TokenGraph from "../../components/tokens/TokenGraph";
	import SearchAndFilter from "../reusable/SearchAndFilter";

	export default {
		props:['asSelector', 'hideUnusable'],
		components: {SearchAndFilter, TokenGraph, TokenList},
		data(){return {
			filteredBalances:[],
			selectedToken:null,
			terms:'',
		}},
		computed:{
			...mapState([
				'balances',
			]),
			...mapGetters([
				'totalBalances',
				'balanceFilters',
				'displayCurrency'
			]),
			allBalances(){
				return Object.keys(this.totalBalances.totals).map(key => this.totalBalances.totals[key])
					.filter(x => this.hideUnusable ? !x.unusable : true)
					.filter(token => !this.balanceFilters.hasOwnProperty(token.blockchain) || (this.balanceFilters[token.blockchain] && parseFloat(this.balanceFilters[token.blockchain]) < parseFloat(token.amount)))
			},
			filteredAccounts(){
				return this.selectedToken.accounts()
					.filter(x => {
						if(!this.terms.length) return true;
						return x.sendable().toLowerCase().indexOf(this.terms) > -1
					})
					.sort((a,b) => {
						const bBal = b.balanceFor(this.selectedToken) ? b.balanceFor(this.selectedToken).amount : 0;
						const aBal = a.balanceFor(this.selectedToken) ? a.balanceFor(this.selectedToken).amount : 0;
						return bBal - aBal;
					});
			},
			needsAccountSearchBar(){
				return this.selectedToken && this.selectedToken.accounts().length >= 5
			}
		},
		methods:{
			selectToken(token){
				this.selectedToken = this.selectedToken && this.selectedToken.uniqueWithChain() === token.uniqueWithChain() ? null : token;
			},
			sendToken(token, account){
				this.$router.push({name:this.RouteNames.TRANSFER, query:{account:account.identifiable(), token:token.uniqueWithChain()}})
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.assets {
		display:flex;
		flex-direction:column;
		height:100%;
		overflow-y: scroll;

		@media (max-width: $breakpoint-mobile) {
            border:0;
            border-radius:0;
        }

		.token-list {
			display:flex;
			flex-direction:column;
			width:100%;

			.tokens {
				height:calc(100vh - 220px);
				overflow-y:auto;
			}
		}

		.graph-and-accounts {
			display:flex;
			flex-direction:column;
			background:white;
			right: -100%;
		    width: 50vw;
		    top: 0;
		    position: fixed;
		    bottom: 0;
		    height: initial;
		    z-index: 102;
		    opacity:0;
		    transition: box-shadow 0.3s ease, right .44s ease-in-out, opacity .12 ease;
		    box-shadow:none;

		    @media (max-width: $breakpoint-tablet) {
		    	width:calc(100vw);
		    }

			&.open {
				right:0;
				box-shadow:10px 0 30px rgba(0,0,0,0.15), 2px 0 10px $blue-shadow;
				opacity:1;
			}

			.graph-and-accounts-header {
				display:flex;
		        width:100%;
		        height:120px;
		        justify-content: space-between;
		        align-items: center;
		        padding:20px;
		        background:$lightergrey;

		        @media (max-width: $breakpoint-mobile) {
		            width:100vw;
		        }

		        .graph-and-accounts-content {
		        	display:flex;
		        	flex-direction:column;

		            .graph-and-accounts-name {
		            	font-size: $font-size-large;
			            font-family: 'Poppins', sans-serif;
			            font-weight: bold;
			            color:black;
		            }

		            .graph-and-accounts-balance {
		            	font-size: $font-size-standard;
			            font-family: 'Poppins', sans-serif;
			            font-weight: bold;
			            color:black;
		            }
		        }

		        .graph-and-accounts-close {
		            padding:10px;
		            cursor: pointer;
		            color:$blue;
		            font-size:$font-size-large;
		            border-radius:$radius;
		        }
			}

			.no-accounts {
				height:calc(100% - 180px);
				display:flex;
				justify-content: center;
				align-items: center;

				font-size: $medium;
				font-weight: bold;
				color: rgba(255,255,255,0.24);
			}

			.accounts {
				padding:20px;
				overflow:auto;
				height:calc(100% - 180px);
				border-top:1px solid $lightgrey;

				&.with-search {
					height:calc(100% - 180px - 70px);
				}

				.account {
					display:flex;
					flex-direction: column;
					margin-bottom:20px;
					padding-bottom:20px;
					border-bottom:1px solid $lightgrey;

					&:last-child { border:0; }

					.name {
						font-size: $font-size-medium;
						font-family: 'Poppins', sans-serif;
						font-weight: bold;
					}

					.network {
						font-size: $font-size-small;
						font-family: 'Poppins', sans-serif;
						color:rgba(0,0,0,.6);
						margin-bottom:6px;
					}

					.details {
						display:flex;
						width:100%;
						justify-content: space-between;
						align-items: flex-end;
						margin-top:5px;

						.balance {
							font-size: $medium;
							font-weight: bold;
							margin-bottom:2px;
						}

						.fiat {
							font-size: $medium;
						}
					}

					.actions {
						flex:0 0 auto;
						padding-left:20px;

					}
				}
			}
		}
	}

</style>
