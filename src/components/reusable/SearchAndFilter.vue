<template>
	<section class="search-and-filter" :class="{'full':fullSearch,'blue':blue}">

		<figure class="search-bar">
			<input placeholder="Search" v-model="terms" />
		</figure>

		<section class="filters" v-if="!fullSearch">
			<Select class="filter" v-on:selected="x => filter.onSelect(x)" :key="JSON.stringify(filter.selected)+i" v-for="(filter,i) in filters" v-bind="filter" truncate="1" />
		</section>

	</section>
</template>

<script>
	export default {
		props:['filters', 'fullSearch', 'blue',],
		data(){return {
			terms:'',
		}},
		computed:{
			options(){
				return ['All Blockchains', 'EOS'];
			}
		},
		watch:{
			['terms'](){
				this.$emit('terms', this.terms.trim().toLowerCase())
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.search-and-filter {
		display:flex;
		align-items: center;
		padding:10px 0;
		width:calc(100% - 20px);
		margin:10px;

		.search-bar {
			flex:1;

			input {
				border-radius:50px;
				height:36px;
				text-align:center;
				font-size:$font-size-standard;
				box-shadow:none;
				outline:0;
				-webkit-appearance: none;
			}
		}

		&.blue .search-bar input {
			border-color:#67CBFF;
			color:white;
			opacity:.49;

			&::-webkit-input-placeholder {
				color:white; /* fuck you, electron */
			}
		}

		&.blue .search-barinput:hover,
		&.blue .search-barinput:focus {
			border-color:white;
			opacity:1;
		}

		.filters {
			flex:1;
			text-align:right;
			display:flex;
			justify-content: flex-end;

			.filter {
				flex:1;
				max-width:150px;
				margin-left:20px;
			}
		}

		&.full {
			width:calc(100% - 20px);

			.search-bar {
				margin:0;
			}
		}


	}
</style>