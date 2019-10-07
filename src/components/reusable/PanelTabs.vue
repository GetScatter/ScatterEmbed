<template>
	<section class="panel-tabs">
		<figure v-for="tab in tabs"
		        :class="{'active':tab.state === state}"
		        @click="$emit('selected', tab.state)"
		        class="tab-name">{{tab.name}}</figure>
	</section>
</template>

<script>
	export default {
		props:['tabs', 'state']
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.panel-tabs {
		display:flex;
		flex-direction:row;
		align-items:center;
		justify-content:center;
		padding:0 0 20px;
		margin:0 20px;
		border-bottom: 1px solid $lightgrey;

		.tab-name {
			cursor: pointer;
			font-size: $larger;
			font-weight: bold;
			font-family: 'Poppins', sans-serif;
			line-height:68px;
			color:$blue;
			transition:all 0.1s ease;
			width: 100%;
			text-align: center;
			border-bottom: 1px solid tranparent;
			margin-bottom:-21px;

			&:hover, &.active {
				color: black;
				border-bottom: 1px solid $blue;
			}
		}
	}
</style>