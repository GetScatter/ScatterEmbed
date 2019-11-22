<template>
	<section class="login">


		<section class="entry" v-if="state === STATES.NEW_OR_LOGIN">
			<figure class="login-bg">
				<img src="static/assets/login_bg.jpg" />
			</figure>
			<!--<section class="meteors">-->
				<!--<section class="rotator">-->
					<!--<figure class="shooting_star" v-for="i in new Array(20).keys()"></figure>-->
				<!--</section>-->
			<!--</section>-->

			<section class="head">
				<section class="details">
					<figure class="logo scatter-logologo"></figure>
					<figure class="version">nebula</figure>
				</section>
			</section>

			<!-------------------------->
			<!------ NEW SCATTER ------->
			<!-------------------------->
			<section class="body">
				<section v-if="isNewScatter">
					<LoginButton
							@click.native="state = STATES.CREATE_NEW"
							primary="1"
							:title="$t('login.registerButtonTitle')"
							:description="$t('login.registerButtonSubtitle')" />
					<!--<LoginButton-->
							<!--@click.native="state = STATES.IMPORT_KEYS"-->
							<!--title="I'm an advanced user"-->
							<!--description="Import your blockchain keys manually" />-->
				</section>

				<!-------------------------->
				<!---- EXISTING SCATTER ---->
				<!-------------------------->
				<section v-if="!isNewScatter">
					<Input class="welcome-password" :focus="focusing" big="1" for-login="1"
					       :placeholder="$t('login.passwordPlaceholder')"
					       type="password" :disabled="opening"
					       :loader-on-dynamic="opening"
					       :text="password" v-on:enter="unlock" v-on:dynamic="unlock" v-on:changed="x => password = x"
					       :dynamic-button="'icon-right-open-big'" :hide-dynamic-button="!password.length" />


				</section>
			</section>

			<section class="tail">
				<!--<section class="terms">-->
				<!--Use of Scatter is limited to our <u>Terms of Use</u>.<br>-->
				<!--Please make sure to also read our <u>Privacy Policy</u>.-->
				<!--</section>-->
				<section class="actions">
					<section class="action" @click="destroy" v-if="!isNewScatter">
						<Reset class="logo" />
						<figure class="text">{{$t('login.reset')}}</figure>
					</section>
					<section class="action" @click="importBackup" v-if="isNewScatter">
						<Restore class="logo" />
						<figure class="text">{{$t('login.restore')}}</figure>
					</section>
					<section class="action" @click="goToSupport">
						<Support class="logo" />
						<figure class="text">{{$t('login.support')}}</figure>
					</section>
				</section>
			</section>

		</section>


		<!-------------------------->
		<!-- CREATING NEW SCATTER (No keys) -->
		<!-------------------------->
		<section class="onboard" v-if="state === STATES.CREATE_NEW">
			<ProgressBubbles :total="steps" :index="step" />

			<section class="panel">
				<Terms v-if="step === 1" v-on:back="stepBack" v-on:next="stepForward" />
				<SetPassword v-if="step === 2" v-on:back="stepBack" v-on:next="stepForward" />
				<Welcome v-if="step === 3" />
			</section>

		</section>


		<!-------------------------->
		<!-- CREATING NEW SCATTER (Has keys) -->
		<!-------------------------->
		<section class="onboard" v-if="state === STATES.IMPORT_KEYS">
			<ProgressBubbles :total="steps" :index="step" />

			<section class="panel">
				<Terms v-if="step === 1" v-on:back="stepBack" v-on:next="stepForward" />
				<SetPassword v-if="step === 2" v-on:back="stepBack" v-on:next="importKeypair" />
				<Welcome v-if="step === 4" />
			</section>

		</section>

	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';
	import { QrcodeStream } from 'vue-qrcode-reader'

	import ProgressBubbles from "../components/reusable/ProgressBubbles";
	import ActionBar from "../components/reusable/ActionBar";
	import LoginButton from '../components/login/LoginButton'
	import Terms from '../components/login/Terms'
	import SetPassword from '../components/login/SetPassword'
	import Welcome from "../components/login/Welcome";
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";

	import Reset from '../components/svgs/login/Reset';
	import Restore from '../components/svgs/login/Restore';
	import Support from '../components/svgs/login/Support';
	import BackupService from "../services/utility/BackupService";
	import * as UIActions from "../store/ui_actions";
	import {RouteNames} from "../vue/Routing";
	import SingletonService from "../services/utility/SingletonService";

	const STATES = {
		NEW_OR_LOGIN:'newOrLogin',
		CREATE_NEW:'createNew',
		IMPORT_KEYS:'importKeys',
		IMPORT_BACKUP:'importBackup',
	};


	export default {
		components:{
			Welcome,
			ActionBar,
			ProgressBubbles,
			LoginButton,
			SetPassword,
			Terms,

			Reset,
			Restore,
			Support,
			QrcodeStream,
		},
		data(){return {
			state:STATES.NEW_OR_LOGIN,
			STATES,

			step:1,

			password:'',

			opening:false,

			isNewScatter:true,
			focusing:true,
		}},
		async created(){
			this.isNewScatter = !(await window.wallet.exists());
			// this.isNewScatter = true;
		},
		computed:{
			...mapState([
				'scatter',
			]),
			steps(){
				switch(this.state){
					case STATES.CREATE_NEW: return 3;
					case STATES.IMPORT_KEYS: return 4;
					case STATES.IMPORT_BACKUP: return 3;
				}
			},
			lockedTimeLeft(){
				return (this.lockedOutTime - this.now)/1000;
			},
		},
		methods:{
			stepBack(){
				if(this.step === 1){
					this.state = STATES.NEW_OR_LOGIN;
					return;
				}
				this.step--;
			},
			stepForward(){
				this.step++;
			},

			goToSupport(){
				this.openInBrowser('https://support.get-scatter.com/');
			},
			importBackup(){
				PopupService.push(Popup.importFullBackup({}, done => {

				}));
			},
			importKeypair(){
				this.stepForward();
				PopupService.push(Popup.importKeypair({forSignup:true}, keypair => {
					this.stepForward();
				}));
			},

			async unlock(){
				if(this.opening) return;
				this.opening = true;


				const tryBiometrics = await (async () => {
					let biometrics;
					try {
						biometrics = await window.wallet.biometrics.available();
					} catch(e){
						// Happens when biometrics isn't available.
						return true;
					}

					if(biometrics && biometrics.toString().indexOf('error') > -1){
						this.opening = false;
						return PopupService.push(Popup.snackbar(JSON.parse(biometrics).error));
					} else {
						PopupService.push(Popup.snackbar(`Scan your ${biometrics}`))
						const authorized = await window.wallet.biometrics.authorize();
						if(authorized && typeof authorized === 'object' && authorized.hasOwnProperty('error')){
							this.opening = false;
							PopupService.push(Popup.snackbar(authorized.error));
							return false;
						}
						else if (authorized === true) return true;
						else {
							this.opening = false;
							PopupService.push(Popup.snackbar("Biometric error!"));
							return false;
						}
					}
				})();

				if(!tryBiometrics) return;


				const unlocked = await window.wallet.unlock(this.password);
				if(unlocked) {

					await this[Actions.LOAD_SCATTER]();
					this.$router.push({name:RouteNames.HOME});
					SingletonService.init();
				} else {
					this.focusing = false;
					this.$nextTick(() => {
						this.focusing = true;
						this.$forceUpdate();
					});
					PopupService.push(Popup.snackbar(this.$t('errors.badPassword')))
				}

				this.opening = false;
			},
			destroy(){
				PopupService.push(Popup.destroyScatter());
			},


			...mapActions([
				UIActions.SET_SEED,
				Actions.LOAD_SCATTER,
				Actions.SET_SCATTER,
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../styles/variables";

	.login {
		display:flex;
		justify-content: center;
		align-items: center;
		height:$fullheight;
		position: relative;

		.login-bg {
			position:absolute;
			top:0;
			bottom:0;
			left:0;
			right:0;
			overflow: hidden;
			display:flex;
			align-items: center;
			justify-content: center;

			img {
				display:block;
				width:1920px;
				height:100%;
			}

			animation: fadein 0.5s ease forwards;
		}

		.meteors {
			position:absolute;
			top:0;
			bottom:0;
			left:0;
			right:0;
			display:flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			.rotator {
				position:absolute;
				top:0;
				bottom:0;
				left:0;
				right:0;
				transform: rotateZ(145deg);
			}
		}

		.entry {
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height:$fullheight;
			width:100%;
			position: relative;
			z-index:1;
			overflow:hidden;
			opacity:1;

			transition: all 0.5s ease;
			transition-property: opacity;
			transition-delay: 0.5s;

			.head {
				display:flex;
				align-items: flex-end;
				flex:1;

				.details {
					text-align: center;

					.logo {
						font-size: 82px;
						line-height: 82px;
						font-family: 'Grand Hotel', sans-serif;
						text-shadow:0 0 90px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.2), 0 3px 7px rgba(0,0,0,0.2);
						color: $white;
						transform:translateY(-1000px);
						animation: inFromTop 0.8s ease forwards;
						animation-delay: 0.4s;
					}

					.version {
						font-size: 11px;
						font-weight: bold;
						color:$white;
						text-transform: uppercase;
						margin-top:4px;
						letter-spacing: 20px;
						margin-right:-20px;
						opacity:0.9;
						text-shadow:0 0 2px $black;
						transform:translateY(-1000px);
						animation: inFromTop 0.5s ease forwards;
						animation-delay: 0.2s;
					}
				}
			}

			.body {
				padding:50px 0;
				opacity:0;
				animation: fadein 0.5s ease forwards;
				animation-delay: 0.2s;
			}

			.tail {
				display:flex;
				align-items: flex-start;
				flex:1;
				animation: inFromBottom 0.6s ease forwards;
				animation-delay: 0.6s;
				transform:translateY(1000px);
			}

			&.success {
				opacity:0;
			}

			.terms {
				max-width:500px;
				margin:0 auto;
				font-size: $small;

				u {
					color:$white;
					text-decoration: underline;
				}
			}

			.actions {
				margin:0 auto;
				display:flex;
				justify-content: space-between;

				.action {
					cursor: pointer;
					padding:0 40px;
					text-align:center;

					transition: all 0.1s ease;
					transition-property: transform;

					.icon {


					}

					svg {
						fill:$white;
						stroke:$white;
					}

					.text {
						font-size: $medium;
						font-weight: bold;
						color:$white;
					}

					&:hover {
						transform:scale(1.1);
						background: rgba(0,0,0,0.08);
					}

				}
			}
		}



		.welcome-password {
			max-width: 450px;
			width: calc(100% - 40px);
			margin: 0 20px;
		}
	}



	.onboard {
		width:100%;
		height:$fullheight;

		.panel {
			display:flex;
			flex-direction: column;
			justify-content: center;
			height:calc(100vh - 40px - 250px);
		}
	}



</style>
