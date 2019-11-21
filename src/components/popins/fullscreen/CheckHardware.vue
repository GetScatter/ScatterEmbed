<template>
	<section class="pop-in">
		<section>
			<section class="head">
				<figure class="icon font">
					<i class="icon-spin4 animate-spin"></i>
				</figure>
				<figure class="title">{{$t('popins.fullscreen.checkHardwareTitle')}}</figure>
				<p>{{$t('popins.fullscreen.checkHardwareDescription')}}</p>
			</section>
		</section>

		<ActionBar v-if="canCancel" :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" />
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import '../../../styles/popins.scss';
	import * as UIActions from "../../../store/ui_actions";

	export default {
		props:['popin'],
		data () {return {
			canCancel:false,
			hadWorkingScreen:false,
		}},
		computed:{
			...mapState([
				'workingScreen',
			]),
			...mapGetters([

			]),
		},
		mounted(){
			setTimeout(() => {
				this.canCancel = true;
			}, 1500);
			if(this.workingScreen){
				this.hadWorkingScreen = true;
				this.setWorkingScreen(false);
			}
		},
		methods:{
			returnResult(x){
				if(this.hadWorkingScreen){
					this.setWorkingScreen(true);
				}
				setTimeout(() => {
					this.popin.data.callback(x);
					this[UIActions.RELEASE_POPUP](this.popin);
				}, 10);
			},
			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";



</style>
