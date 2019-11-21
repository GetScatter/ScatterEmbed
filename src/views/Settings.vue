<template>
    <section>
        <section class="blockchain-list-container">


            <section class="blockchains" v-if="!isMobile || !selectedOption" :class="{'full-width':isMobile}">
                <section class="head">
                    {{$t('settings.base.basics')}}
                </section>
                <section class="scroller dynamic">
                    <section class="blockchain-list">
                        <section class="badge-item hoverable" :class="{'active':selectedOption && selectedOption.name === item.name}" v-for="item in generalItems" @click="selectOption(item)">
                            <section class="details"><figure class="title">{{translate(item)}}</figure></section>
                            <i class="fal fa-chevron-right"></i>
                        </section>
                    </section>
                </section>
                <section class="head">
                    <i :class="{'unlocked':unlocked}" class="danger icon-lock"></i>
                    {{$t('settings.base.secure')}}
                </section>
                <section class="scroller dynamic">
                    <section class="blockchain-list">
                        <section class="badge-item hoverable" :class="{'active':selectedOption && selectedOption.name === item.name}" v-for="item in lockedItems" @click="selectOption(item)">
                            <section class="details"><figure class="title">{{translate(item)}}</figure></section>
                            <i class="fal fa-chevron-right"></i>
                        </section>
                    </section>
                </section>
            </section>

            <section class="list-container" v-if="!isMobile || selectedOption">

                <section class="head">
                    <figure v-if="isMobile" class="back-button" @click="selectOption(null)">
                        <i class="fal fa-arrow-left"></i>
                    </figure>
                    {{translate(selectedOption)}}
                </section>

                <section class="scroller">
                    <SettingsGeneral v-if="selectedOption.name === settingsOptions.GENERAL.name" />
                    <SettingsTokens v-if="selectedOption.name === settingsOptions.TOKENS.name" />
                    <SettingsExplorer v-if="selectedOption.name === settingsOptions.EXPLORER.name" />
                    <SettingsPassword v-if="selectedOption.name === settingsOptions.PASSWORD.name" />
                    <SettingsBackup v-if="selectedOption.name === settingsOptions.BACKUP.name" />
                    <SettingsDestroy v-if="selectedOption.name === settingsOptions.DESTROY.name" />
                    <SettingsFirewall v-if="selectedOption.name === settingsOptions.FIREWALL.name" />
                </section>
            </section>
        </section>



    </section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';
	import {Popup} from '../models/popups/Popup'
	import PopupService from '../services/utility/PopupService'

	import {SETTINGS_OPTIONS} from '@walletpack/core/models/Settings';

	import SettingsGeneral from '../components/panels/settings/SettingsGeneral.vue'
	import SettingsTokens from '../components/panels/settings/SettingsTokens.vue'
	import SettingsExplorer from '../components/panels/settings/SettingsExplorer.vue'
	import SettingsBackup from '../components/panels/settings/SettingsBackup.vue'
	import SettingsDestroy from '../components/panels/settings/SettingsDestroy.vue'
	import SettingsPassword from '../components/panels/settings/SettingsPassword.vue'
	import SettingsFirewall from '../components/panels/settings/SettingsFirewall.vue'



	export default {
		components:{
			SettingsGeneral,
			SettingsTokens,
			SettingsExplorer,
			SettingsBackup,
			SettingsDestroy,
			SettingsPassword,
			SettingsFirewall,
		},
		data () {return {
			settingsOptions:SETTINGS_OPTIONS,
			selectedOption:SETTINGS_OPTIONS.GENERAL,
			unlocked:false,
			mnemonic:null,
		}},
		computed: {
			...mapState([
				'scatter'
			]),
			...mapGetters([
				'version'
			]),
			generalItems(){
				return [
					SETTINGS_OPTIONS.GENERAL,
					SETTINGS_OPTIONS.TOKENS,
					SETTINGS_OPTIONS.EXPLORER,
					SETTINGS_OPTIONS.BACKUP,
				]
			},
			lockedItems(){
				return [
					SETTINGS_OPTIONS.PASSWORD,
					SETTINGS_OPTIONS.FIREWALL,
					SETTINGS_OPTIONS.DESTROY,
				]
			}
		},
		mounted(){

		},
		methods: {
			selectOption(option){
				if(option && (option.locked || false) && !this.unlocked) {
					return this.unlock(option);
				}
				this.selectedOption = option;
			},
			unlock(option){
				PopupService.push(Popup.verifyPassword(verified => {
					if(!verified) return;
					this.mnemonic = verified;
					this.unlocked = true;
					this.selectOption(option);
				}))
			},
			translate(option){
				return this.$t('settings.menu.'+option.name.toLowerCase());
			}
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .blockchain-list-container {

        .blockchains {
            height: calc(100vh - 70px);
            overflow-y: auto;
        }
    }

    .head {
        .danger {
            background:$red;
            color:$white;
            font-size: $small;
            border-radius:$radius;
            padding:3px 3px;
            margin-right:10px;
            overflow:hidden;

            &.unlocked {
                animation: popLock 0.6s normal forwards ease;
                animation-delay: 0.1s;
            }

            @keyframes popLock {
                0% {
                    transform:scale(1);
                }
                20% {
                    transform:scale(0.8);
                }
                60% {
                    opacity:1;
                    transform:scale(2);
                }
                80% {
                    transform:scale(0.5);
                    opacity:0;
                    margin-left:0;
                }
                100% {
                    margin-left:-30px;
                    opacity:0;
                }
            }
        }
    }

    .list-container {
        height: 100%;

        .scroller {
            padding:20px;
            height: calc(100vh - 140px);
            overflow-y: auto;
        }
    }

</style>
