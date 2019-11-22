<template>
	<section>

		<section class="action-box top-pad">
			<label>{{$t('settings.password.title')}}</label>
			<p>{{$t('settings.password.description')}}</p>

			<br><br>

			<Input :label="$t('setPassword.choosePass')"
			       type="password"
			       :text="password"
			       v-on:changed="x => password = x" />

			<Input :label="$t('setPassword.confirmPass')"
			       type="password"
			       :text="confirmPassword"
			       v-on:changed="x => confirmPassword = x" />

			<Button red="true" @click.native="changePassword"
			        :text="$t('settings.password.button')" />

		</section>

		<section class="action-box">
			<label>{{$t('settings.password.pin.title')}}</label>
			<p>{{$t('settings.password.pin.description')}}</p>

			<br><br>

			<Input style="margin-bottom:0;" big="1"
			       :placeholder="$t('settings.password.pin.disabled')"
			       type="password"
			       :text="pin"
			       :dynamic-button="pin.length ? 'icon-cancel' : ''"
			       v-on:dynamic="pin = ''"
			       v-on:changed="x => pin = x" />

			<section>
				<br>
				<br>
				<section class="split-inputs">
					<Switcher :state="scatter.pinForAll" @click.native="togglePinForAll" />
					<section class="details">
						<figure class="title">{{$t('settings.password.pin.pinForAllTitle')}}</figure>
						<p>{{$t('settings.password.pin.pinForAllDescription')}}</p>
					</section>
				</section>
			</section>
		</section>

	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';

	import PasswordService from '@walletpack/core/services/secure/PasswordService';
	import PopupService from '../../../services/utility/PopupService';
	import {Popup} from '../../../models/popups/Popup';

	let saveTimeout;
	export default {
		props:['mnemonic'],
		data () {return {
			password:'',
			confirmPassword:'',
			pin:'',
		}},
		computed:{
			...mapState([
				'scatter'
			])
		},
		mounted(){
			this.pin = this.scatter.pin ? this.scatter.pin : '';
		},
		methods: {
			async changePassword(){
				const err = PasswordService.hasError(this.password);
				if(err) return PopupService.push(Popup.snackbar(err));
				if(this.password !== this.confirmPassword) return PopupService.push(Popup.snackbar(this.$t('errors.passwordConfirmation')));

				await window.wallet.changePassword(this.password);
				this.password = '';
				this.confirmPassword = '';

				this[Actions.LOAD_HISTORY]();
				// this[Actions.LOAD_TRANSLATION]();

				PopupService.push(Popup.snackbar(this.$t('settings.password.changed')))
			},
			async changePin(){
				clearTimeout(saveTimeout);
				saveTimeout = setTimeout(async () => {
					await PasswordService.setPIN(this.pin, false);
					PopupService.push(Popup.snackbar(this.$t('settings.password.pin.changed'), 'check'))
				}, 500);
			},
			togglePinForAll(){
				const scatter = this.scatter.clone();
				scatter.pinForAll = !scatter.pinForAll;
				this[Actions.SET_SCATTER](scatter);
			},
			...mapActions([
				Actions.SET_SCATTER,
				Actions.LOAD_HISTORY,
			])
		},
		watch:{
			pin(a,b){
				if(!b) return;
				this.changePin();
			}
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";


</style>
