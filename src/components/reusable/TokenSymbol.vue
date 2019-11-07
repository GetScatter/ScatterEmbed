<template>
	<figure class="token-symbol" :style="{'background-color':colorHex, color:colorHex ? 'white' : 'inherit'}">
		<figure     class="symbol-holder as-class"    v-if="token.symbolClass()" :class="token.symbolClass()"></figure>
		<img        class="symbol-holder as-image"    v-else-if="tokenLogo" :src="tokenLogo" />
		<figure     class="symbol-holder as-text"     v-else>{{token.symbol[0]}}</figure>
	</figure>
</template>

<script>
	import Hasher from '@walletpack/core/util/Hasher'
	import {mapState} from "vuex";

	export default {
		props:['token'],
		computed:{
			tokenLogo(){
				if(!this.tokenMetas) return;
				return this.tokenMetas[this.token.uniqueWithChain()]
			},
			colorHex(){
				if(!this.token) return null;
				if(!this.token.symbolClass() && this.tokenLogo) return null;
				return '#'+Hasher.unsaltedQuickHash(this.token.unique()).slice(0,6);
			},
			...mapState([
				'tokenMetas',
			])
		},
		methods:{
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.token-symbol {
		font-size: 16px;
		width: 44px;
		height: 44px;
		margin: 0 auto;
		position: relative;
		display:flex;
		align-items: center;
		justify-content: center;

		@media (max-width: $breakpoint-mobile) {
			width: 24px;
			height: 24px;
			text-align: center;
			font-size: 18px;
		}

		.symbol-holder {
			width: 44px;
			height: 44px;
			text-align: center;
			font-size: 32px;
			display:flex;
			align-items: center;
			justify-content: center;
			color:white;

			@media (max-width: $breakpoint-mobile) {
				width: 24px;
				height: 24px;
				text-align: center;
				font-size: 18px;
				line-height: 24px;
			}
		}
	}
</style>
