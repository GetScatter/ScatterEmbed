<template>
	<section class="pop-in import-backup">
		<section>
			<h2>{{$t('popins.fullscreen.importBackup.title')}}</h2>
			<p>{{$t('popins.fullscreen.importBackup.description')}}</p>

			<br>

			<section style="display:flex; justify-content: center;">
				<LoginButton on-white="1" @click.native="importBackup" primary="1"
				             :title="$t('popins.fullscreen.importBackup.buttonTitle')"
				             :description="$t('popins.fullscreen.importBackup.buttonDescription')" />
			</section>

			<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" />
		</section>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from "@walletpack/core/store/constants";
	import PopupService from "../../../services/utility/PopupService";
	import {Popup} from "../../../models/popups/Popup";
	import Mnemonic from "@walletpack/core/util/Mnemonic";
	import StorageService from "../../../services/wallets/StorageService";
	import Scatter from "@walletpack/core/models/Scatter";
	import Keypair from "@walletpack/core/models/Keypair";
	import KeyPairService from "@walletpack/core/services/secure/KeyPairService";
	import AccountService from "@walletpack/core/services/blockchain/AccountService";
	import LoginButton from "../../login/LoginButton";
	import AES from 'aes-oop';
	import Crypto from "@walletpack/core/util/Crypto";
	import * as UIActions from "../../../store/ui_actions";
	import Seeder from "@walletpack/core/services/secure/Seeder";
	const {getFileLocation} = require('../../../services/wallets/FileService');
	// const fs = window.require('fs');

	export default {
		components: {LoginButton},
		props:['popin'],

		data(){return {

		}},

		methods:{
			returnResult(proxy){
				this.popin.data.callback(proxy);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			async importBackup(){
				const unrestore = () => {
					this.setWorkingScreen(false);
					this.restoringBackup = false;
					window.wallet.lock();
				}

				if(this.restoringBackup) return;
				this.restoringBackup = true;

				const possibleFile = await getFileLocation(['json', 'txt']);
				if(!possibleFile) return unrestore();
				const file = possibleFile[0];
				if(!file) return unrestore();



				const importDesktopBackup = async (data, password) => {
					const [obj, salt] = data.split('|SLT|');
					if(!obj || !salt) {
						unrestore();
						return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorParsing')));
					}

					await window.wallet.lock();
					await window.wallet.unlock(password, true, salt);
					const decrypted = await window.wallet.decrypt(obj);
					if(typeof decrypted === 'object' && decrypted.hasOwnProperty('keychain')){
						decrypted.keychain = await window.wallet.decrypt(decrypted.keychain);
						decrypted.settings.backupLocation = '';
						this.setWorkingScreen(false);
						PopupService.push(Popup.showTerms(async accepted => {
							if(!accepted) {
								window.wallet.lock();
								return this.returnResult(false);
							}
							decrypted.onboarded = true;
							await this[Actions.SET_SCATTER](Scatter.fromJson(decrypted));
							await window.wallet.lock();
							window.wallet.utility.reload();
						}))
					} else {
						unrestore();
						return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorDecrypting')));
					}
				};

				const importExtensionBackup = async (data, password) => {
					const [obj, salt] = data.split('|SSLT|');

					if(!obj || !salt) {
						unrestore();
						return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorParsing')));
					}

					await window.wallet.lock();
					await window.wallet.unlock(password, true, salt);
					const decrypted = await window.wallet.decrypt(obj);
					if(typeof decrypted === 'object' && decrypted.hasOwnProperty('keychain')){
						const keypairs = await Promise.all(decrypted.keychain.keypairs
							.map(async x => {
								x.privateKey = await window.wallet.decrypt(x.privateKey)
								return x;
							})
							.map(async x => {
								const keypair = Keypair.fromJson({
									name:x.name,
									blockchains:[x.blockchain],
									privateKey:Crypto.privateKeyToBuffer(x.privateKey, x.blockchain),
								});
								await KeyPairService.makePublicKeys(keypair);
								return keypair;
							}));
						const scatter = await Scatter.create();
						scatter.keychain.keypairs = keypairs;


						this.setWorkingScreen(false);
						PopupService.push(Popup.showTerms(async accepted => {
							if(!accepted) {
								window.wallet.lock();
								return this.returnResult(false);
							}
							scatter.onboarded = true;
							await this[Actions.SET_SCATTER](scatter);
							await Promise.all(keypairs.map(keypair => {
								return AccountService.importAllAccounts(keypair);
							}));
							await window.wallet.lock();
							window.wallet.utility.reload()
						}))
					} else {
						unrestore();
						return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorDecrypting')));
					}
				};

				window.wallet.storage.openFile(file).then(data => {
					if(!data) {
						unrestore();
						return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorReading')));
					}

					const fileExtension = file.split('.')[file.split('.').length-1];
					PopupService.push(Popup.verifyPassword(async password => {
						if(!password || !password.length) return unrestore();
						this.setWorkingScreen(true);
						try {
							switch(fileExtension){
								case 'json': return await importDesktopBackup(data, password);
								case 'txt': return await importExtensionBackup(data, password);
							}
						} catch(e){
							console.error('e',e);
							unrestore();
							return PopupService.push(Popup.snackbar(this.$t('popins.fullscreen.importBackup.errorDecrypting')));
						}
					}, true))
				})
			},

			...mapActions([
				UIActions.SET_SEED,
				Actions.SET_SCATTER,
				UIActions.RELEASE_POPUP
			])
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../styles/variables";

	.import-backup {


	}

</style>
