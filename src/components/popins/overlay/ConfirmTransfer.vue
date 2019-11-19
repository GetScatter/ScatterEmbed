<template>
	<section class="pop-over confirm">

		<section class="details">
			<img src="static/assets/icon_send_big.png" class="icon" />
			<label>{{$t('popins.overlay.transferring')}}</label>

			<figure class="amount">{{token.amount}} {{token.symbol}}</figure>
			<section class="accounts">
				<figure class="account">{{from}}</figure>
				<figure class="arrow bounce-right icon-right-small"></figure>
				<figure class="account">{{to}}</figure>
			</section>
			<figure class="memo" v-if="memo">
				<b>{{$t('generic.memo')}}</b>
				<span>{{memo}}</span>
			</figure>
		</section>
		<section class="tail">
			<Button :text="$t('generic.cancel')" @click.native="returnResult(false)" />
			<Button :text="$t('generic.confirm')" blue="1" @click.native="returnResult(true)" />
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as UIActions from "../../../store/ui_actions";

	export default {
		props:['popin'],
		data () {return {

		}},
		created(){

		},
		computed:{
			from(){ return this.popin.data.props.from; },
			to(){ return this.popin.data.props.to; },
			token(){ return this.popin.data.props.token; },
			memo(){ return this.popin.data.props.memo; },
		},
		methods:{
			returnResult(x){
				this.popin.data.callback(x);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">


</style>
