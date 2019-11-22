<template>
	<section class="pop-in">
		<section>

			<!-- SELECT EXPORT TYPE -->
			<section class="export-your-key" v-if="state === STATES.SELECT">
				<h1>{{$t('popins.fullscreen.exportKey.title')}}</h1>
				<section class="disclaimer">
					<figure class="title">{{$t('popins.fullscreen.exportKey.disclaimer')}}</figure>
					<figure class="description">{{$t('popins.fullscreen.exportKey.description')}}</figure>
				</section>

				<section class="types">

					<!-- EXPORT KEY -->
					<section class="type" @click="state = STATES.KEY">
						<figure class="badge icon-key"></figure>
						<figure class="name">{{$t('popins.fullscreen.exportKey.keyTitle')}}</figure>
						<p>{{$t('popins.fullscreen.exportKey.keyDescription')}}</p>
					</section>

					<!-- EXPORT QR -->
					<section class="type" @click="createQR">
						<figure class="badge icon-qrcode"></figure>
						<figure class="name">{{$t('popins.fullscreen.exportKey.qrTitle')}}</figure>
						<p>{{$t('popins.fullscreen.exportKey.qrDescription')}}</p>
					</section>

				</section>
			</section>

			<!-- EXPORT AS TEXT KEY -->
			<section class="export-text" v-if="state === STATES.KEY">
				<h1>{{$t('popins.fullscreen.exportKey.privateKeyAsText')}}</h1>
				<section class="split-inputs">
					<Input style="flex:1;" :text="privateKey" />
					<Button :text="$t('generic.copy')" @click.native="copyPrivateKey" />
				</section>
			</section>

			<!-- EXPORT AS QR -->
			<section v-if="state === STATES.QR">
				<section v-if="!screenshotting">
					<h1>{{$t('popins.fullscreen.exportKey.privateKeyAsQR')}}</h1>
					<section class="disclaimer" style="margin:0 auto 10px; max-width:500px;">
						<figure class="description">This QR code is encrypted with your password.</figure>
					</section>
					<section class="split-inputs">

						<Button style="flex:1;" :text="$t('generic.save')" @click.native="screenshot" />
					</section>
				</section>
				<section v-else>
					<h1>{{keypair.name}}</h1>
					<section class="keys">
						<figure class="key" v-for="key in publicKeyItems">
							{{key.description }} - <b>{{key.title}}</b>
						</figure>
					</section>
				</section>
				<br>
				<section class="qr">
					<img :src="qr" />
				</section>
			</section>

			<ActionBar v-if="!screenshotting" :buttons-left="buttonsLeft" />
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import '../../../styles/popins.scss';
	import Crypto from "@walletpack/core/util/Crypto";
	import QRService from "@walletpack/core/services/secure/QRService";
	import Seeder from "@walletpack/core/services/secure/Seeder";
	import PopupService from "../../../services/utility/PopupService";
	import {Popup} from "../../../models/popups/Popup";
	import * as UIActions from "../../../store/ui_actions";


	const STATES = {
		SELECT:'select',
		KEY:'key',
		QR:'qr',
	};

	export default {
		props:['popin'],

		data () {return {
			state:STATES.SELECT,
			STATES,

			screenshotting:false,

			privateKey:false,
		}},

		computed:{
			...mapState([

			]),
			...mapGetters([
				'keypairs',
			]),

			buttonsLeft(){
				if(this.state === STATES.SELECT){
					return [{text:this.$t('generic.back'), click:() => this.returnResult(null)}];
				} else {
					return [{text:this.$t('generic.back'), click:() => this.state = STATES.SELECT}];
				}
			},
			publicKeyItems(){
				return this.keypair.publicKeys.map(x => {
					if(!this.keypair.blockchains.includes(x.blockchain)) return null;
					return {
						title:x.key,
						description:this.blockchainName(x.blockchain),
						actions:[]
					};
				}).filter(x => !!x);
			},
			keypair(){
				return this.popin.data.props.keypair;
			}
		},

		mounted(){
			this.init();
		},

		methods:{
			returnResult(){
				this.popin.data.callback(this.network);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			async init(){
				this.privateKey = await this.getPrivateKey();
			},
			getPublicKey(){
				return this.keypair.enabledKey().key;
			},
			async getPrivateKey(){
				return window.wallet.getPrivateKey(this.keypair.id, this.keypair.enabledKey().blockchain);
			},
			async copyPrivateKey(){
				const prv = await this.getPrivateKey();
				const pub = this.getPublicKey();
				const copy = `${this.blockchainName(this.keypair.enabledKey().blockchain)} - ${this.keypair.name}\r\nPublic: ${pub}\r\nPrivate: ${prv}`;
				this.copyText(copy);
			},
			async createQR(){
				this.qr = await QRService.createQR(this.keypair.privateKey);
				this.state = STATES.QR;
			},
			async screenshot(){
				this.screenshotting = true;
				setTimeout(async () => {
					let location = await window.wallet.storage.getFolderLocation({properties: ['openDirectory']});
					if(!location) return this.screenshotting = false;
					location = location[0];

					const filename = `${this.keypair.name}.jpg`;

					window.wallet.utility.screenshot(window.wallet.windowId).then(img => {
						window.wallet.storage.saveFile(location, filename, img).then(saved => {
							PopupService.push(Popup.snackbar($t('popins.fullscreen.exportKey.savedImage'), 'check'));
							this.openInBrowser(location);
							setTimeout(() => {
								this.screenshotting = false;
							}, 500);
						})
					})
				}, 500);
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.export-your-key {
		height:100%;
	}

	.split-inputs {
		input {
			padding:inherit !important;
		}
		.input {
			margin:0;
		}
	}

	.export-text {
		width:500px;

		@media (max-width: $breakpoint-tablet) {
			width:100%;
			margin:0 20px;
		}
	}

	.keys {
		margin:0 auto;
		max-width:500px;
		text-align:center;

		.key {
			font-size: 11px;
		}

		.public {
			font-size: 11px;
		}
	}

	.types {
		margin-top:100px;
		display:flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom:70px;

		@media (max-width: $breakpoint-tablet) {
			flex-direction:column;
			margin-top:20px;
			max-width: 300px;
		}

		.type {
			width:calc(50% - 10px);
			max-width:400px;
			background:#fff;
			border:1px solid #e8e8e8;
			padding:36px;
			position: relative;
			padding-top:65px;
			text-align: center;
			cursor: pointer;

			@media (max-width: $breakpoint-tablet) {
				width:100%;
				padding-top: 70px;
			}

			transition: all 0.15s ease;
			transition-property: background;

			&:last-child {
				margin-left:20px;

				@media (max-width: $breakpoint-tablet) {
					margin:20px 0 0 0;
				}
			}

			.badge {
				width:100px;
				height:100px;
				border-radius:50%;
				background:#fff;
				border:1px solid #e8e8e8;
				color:$dark-grey;
				font-size: 36px;
				display:flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top:-50px;
				left:0;
				right:0;
				margin:0 auto;

				@media (max-width: $breakpoint-tablet) {
					width:60px;
					height:60px;
					top:-10px;
				}

				transition: all 0.15s ease;
				transition-property: background, color, border;
			}

			.name {
				font-size: 24px;
				color:$blue;
				margin-bottom:5px;
			}

			p {
				font-size: 11px;
			}

			&:hover {
				background:rgba(0,0,0,0.02);

				.badge {
					background:$blue;
					border:1px solid $blue;
					color:#fff;
				}
			}
		}
	}

</style>
