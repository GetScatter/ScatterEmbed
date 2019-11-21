<template>
	<section class="center-panel">
		<ScatterOutline />
		<br>
		<br>
		<h2>{{$t('welcome.title')}}</h2>
		<p>{{$t('welcome.description')}}</p>

		<br>

		<Button big="1" blue="1" :text="$t('welcome.button')" @click.native="go" />
	</section>
</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import * as Actions from '@walletpack/core/store/constants'
	import {RouteNames} from "../../vue/Routing";
	import ScatterOutline from '../svgs/ScatterOutline'

	export default {
		components:{ScatterOutline},
		computed:{
			...mapState([
				'scatter'
			]),
		},
		methods:{
			async go(){
				const scatter = this.scatter.clone();
				scatter.onboarded = true;
				await this[Actions.SET_SCATTER](scatter);
				this.$router.push({name:RouteNames.HOME})
			},
			...mapActions([
				Actions.SET_SCATTER
			])
		}
	}
</script>
