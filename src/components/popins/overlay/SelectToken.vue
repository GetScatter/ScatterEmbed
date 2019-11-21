<template>
	<section class="pop-over">
		<PopInHead :title="$t('popins.overlay.selectToken')" v-on:close="returnResult" />
		<section class="select-token">
			<section class="scroller">
				<section class="scroller-category" v-for="category in categories">
					<TokenList :key="category.title" :balances="category.tokens" hoverable="1" v-on:token="returnResult" />
				</section>
			</section>
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import {blockchainName, BlockchainsArray} from "@walletpack/core/models/Blockchains";
	import TokenList from "../../tokens/TokenList";
	import * as UIActions from "../../../store/ui_actions";

	export default {
		components: {TokenList},
		props:['popin'],
		data () {return {
			terms:'',
			blockchainFilter:null,
		}},
		computed:{
			...mapGetters([

			]),
			tokens(){
				return this.popin.data.props.tokens;
			},
			categories(){
				if(!this.tokens[0].hasOwnProperty('tokens')) return [{ tokens:this.tokens }]
				return this.tokens;
			},
			filters(){
				return [
					{
						selected:this.blockchainFilter,
						options:[null].concat(BlockchainsArray.map(x => x.value)),
						parser:x => x === null ? this.$t('popins.overlay.allBlockchains') : blockchainName(x),
						onSelect:x => this.blockchainFilter = x,
					}
				]
			},
		},
		created(){

		},
		methods:{
			returnResult(token){
				this.popin.data.callback(token);
				this[UIActions.RELEASE_POPUP](this.popin);
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.select-token {
		width:100%;

		@media (max-width: $breakpoint-tablet) {
			width: 100%;
		}

		.scroller {
			width:100%;
			height:calc(100vh - 40px - 100px);
			overflow-y: hidden;
			display:flex;
			flex-direction:row;

			@media (max-width: $breakpoint-tablet) {
				min-width:100%;
				flex-direction:column;
				overflow-y: scroll;
			}

			.scroller-category {
				width:50%;

				@media (max-width: $breakpoint-tablet) {
					width:100%;
				}
			}

			.token-list {
				height:100%;
				width:100%;
				padding:0rem;
				border-radius:0;
				border-right:1px solid $lightgrey;
			    background: white;

				.tokens {
					max-height: calc(100vh - 220px);
					overflow:auto;
				}
			}
		}

	}

</style>
