<template>
	<section class="search-and-filter" :class="{'full':fullSearch,'blue':blue}">

		<figure class="search-bar">
			<input :placeholder="$t('generic.search')" v-model="terms" />
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
		width:calc(100% - 40px);
		margin:20px;

		@media (max-width: $breakpoint-mobile) {
	        flex-direction:column;
	        margin:20px;
	        width:calc(100% - 40px);
	    }

		.search-bar {
			flex:1;

			@media (max-width: $breakpoint-mobile) {
		        width:100%;
		    }

			input {
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

			@media (max-width: $breakpoint-mobile) {
		        justify-content: space-between;
		        text-align:left;
		        width:100%;
		        padding:6px 0;
		    }

			.filter {
				flex:1;
				max-width:150px;
				margin-left:20px;

				@media (max-width: $breakpoint-mobile) {
					max-width:initial;
					margin:0;
				}
			}
		}

		&.full {
			width:calc(100% - 40px);

			@media (max-width: $breakpoint-mobile) {
		        width:calc(100vw - 40px);
		    }

			.search-bar {
				margin:0;
			}
		}


	}
</style>
