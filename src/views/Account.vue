<template>
    <section>

        <section class="account" v-if="account">
            <section class="manage">
                <div class="wrapper">

                    <!-- Details -->
                    <section class="details">
                        <figure class="blockchain" :class="`token-${account.blockchain()}-${account.blockchain()}`"></figure>
                        <figure class="name selectable">{{account.sendable()}}</figure>
                        <figure class="network">{{account.network().name}}</figure>
                        <figure class="permissions">
                            <figure class="permission" @click="copyAuthKey(acc)"
                                    :class="{'red':acc.authority === 'owner'}"
                                    v-for="acc in account.authorities()">
                                {{acc.authority}} permission
                            </figure>
                        </figure>
                    </section>

                    <figure class="actions account-actions">
                        <figure class="button fas fa-caret-square-down" @click="actionsMenu = !actionsMenu"></figure>
                        <section class="action-menu" :class="{'hidden':!actionsMenu}">
                            <section class="item" :key="action.id" v-for="action in accountActions" @click="commitAction(action)">
                                <i :class="actionIcon(action)"></i>
                                {{actionText(action)}}
                            </section>
                        </section>
                    </figure>

                    <!-- TODO ADD MENU OF ACTIONS -->
                    <!-- Actions -->
                    <!-- <section class="actions" v-if="accountActions">
                        <section class="action" :key="action.id" v-for="action in accountActions">
                            <figure class="icon" :class="`${action.icon} ${action.isDangerous ? ' red' : ''}`"></figure>
                            <figure class="name">{{action.title}}</figure>
                            <Button small="1" :red="action.isDangerous" :text="action.buttonText" @click.native="commitAction(action)" />
                        </section>
                    </section> -->

                </div>
                <div class="flex-wrapper">

                    <!-- Resources -->
                    <section class="resources" v-if="usesResources">
                        <section class="loading" v-if="!accountResources">
                            <figure class="spinner icon-spin4 animate-spin"></figure>
                        </section>
                        <section class="resource" v-for="resource in accountResources">
                            <figure class="type">{{resource.name}}</figure>
                            <i
                                    :class="{
                                    'fad fa-check':resource.percentage <= 50,
                                    'fas fa-exclamation-triangle red':resource.percentage > 50
                                }"
                            ></i>
                            <figure class="percentage">{{resource.text ? resource.text : parseFloat(resource.percentage).toFixed(2) + '%'}}</figure>
                            <figure class="action"> <!--  v-if="resource.actionable" -->
                                <Button white=1 :disabled="!resource.actionable" @click.native="moderateResource(resource)" :text="resource.actionText" />
                            </figure>
                        </section>
                    </section>


                </div>
            </section>




            <section class="assets">
                <section class="fiat-title">
                    <h5>Total Fiat Balance</h5>
                    <h3>{{fiatSymbol(displayCurrency)}}{{formatNumber(account.totalFiatBalance(), true)}}</h3>
                </section>
                <TokenGraph :balances="filteredBalances || account.tokens()" />
                <TokenList :balances="account.tokens()" v-on:balances="x => filteredBalances = x" />
            </section>
        </section>



    </section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';
	import PanelTabs from "../components/reusable/PanelTabs";
	import ResourceService from "@walletpack/core/services/blockchain/ResourceService";
	import BalanceService from "@walletpack/core/services/blockchain/BalanceService";
	import PriceService from "@walletpack/core/services/apis/PriceService";
	import PluginRepository from '@walletpack/core/plugins/PluginRepository'
	import TokenGraph from "../components/tokens/TokenGraph";
	import TokenList from "../components/tokens/TokenList";
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";

	export default {
		components: {TokenList, TokenGraph, PanelTabs},
		data(){return {
			filteredBalances:null,
			actionsMenu:false,
		}},
		computed:{
			...mapState([
				'resources',
				'balances',
			]),
			...mapGetters([
				'accounts',
                'displayCurrency',
			]),
			tabs(){
				return [
					{name:this.account.sendable(), state:this.account.sendable()},
				];
			},
			account(){
				return this.accounts.find(x => x.unique() === this.$route.params.unique);
			},
			usesResources(){
				return ResourceService.usesResources(this.account);
			},
			accountResources(){
				const resource = this.resources[this.account.identifiable()];
				return resource ? resource : null;
			},
			accountActions(){
				const plugin = PluginRepository.plugin(this.account.blockchain());
				const hasActions = plugin.hasAccountActions();
				if(!hasActions) return null;
				return plugin.accountActions(this.account);
			},
		},
		mounted(){
			window.addEventListener('click', this.handleClick);
			setTimeout(() => {
				ResourceService.cacheResourceFor(this.account)
				BalanceService.loadBalancesFor(this.account)
			}, 250);
		},
		destroyed(){
			window.removeEventListener('click', this.handleClick)
		},
		methods:{
			handleClick(e){
				const paths = e.path.map(x => x.className)
				if(this.actionsMenu && !paths.includes('action-menu') && !paths.includes('button fas fa-caret-square-down')){
					this.actionsMenu = null;
				}
			},
			fiatSymbol:PriceService.fiatSymbol,
			async moderateResource(resource){
				new Promise(async resolve => {
					const {name} = resource;

					const returnResult = tx => resolve(tx)

					if(['CPU', 'NET'].includes(name))
						PopupService.push(Popup.eosModerateCpuNet(this.account, returnResult));

					if(name === 'RAM')
						PopupService.push(Popup.eosModerateRam(this.account, returnResult));

					if(name === 'Refund') {
						PluginRepository.plugin(this.account.blockchain()).refund(this.account).then(tx => returnResult(tx)).catch(err => {
							console.error(err);
							returnResult(null);
						})
					}

				}).then(async tx => {
					if(!tx) return;
					PopupService.push(Popup.transactionSuccess(this.account.blockchain(), tx));
					this[Actions.ADD_RESOURCES]({acc:this.account.identifiable(), res:await ResourceService.getResourcesFor(this.account)});
					await BalanceService.loadBalancesFor(this.account);
				})
			},
			copyAuthKey(account){
				this.copyText(account.publicKey);
			},
			actionText(action){
			    switch(action.type){
                    case 'unlink_account': return 'Unlink Account';
                    case 'change_permissions': return 'Change Permissions';
                    case 'proxy_vote': return 'Proxy Vote';
                    case 'create_account': return 'Create Account';
                }
            },
			actionIcon(action){
			    switch(action.type){
                    case 'unlink_account': return 'icon-trash';
                    case 'change_permissions': return 'icon-key';
                    case 'proxy_vote': return 'icon-heart-1';
                    case 'create_account': return 'icon-user-add';
                }
            },
			async commitAction(action){
				const plugin = PluginRepository.plugin(this.account.blockchain());

				switch(action.type){
					case 'unlink_account': return PopupService.push(Popup.unlinkAccount(this.account, x => {
						if(!x) return;
						this.$router.back();
					}));

					case 'change_permissions': return PopupService.push(Popup.verifyPassword(verified => {
						if(!verified) return false;
						PopupService.push(Popup.eosChangePermissions(this.account, async permissions => {
							await plugin.changePermissions(this.account, permissions);
						}));
					}));
					case 'proxy_vote': return PopupService.push(Popup.eosProxyVotes(this.account, () => {}));
					case 'create_account': return PopupService.push(Popup.eosCreateAccount(this.account, () => {}));
					default: return '';
				}

			},

			...mapActions([
				Actions.ADD_RESOURCES,
			])
		}

	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";
    $panelheight:180px;

    .account {
        height:calc(100vh - 60px - 80px);
        display:flex;
        flex-direction:column;
        overflow-y:auto;

        .manage {
            padding:0;
            height:calc(#{$quickheightnobuffer});
            position:relative;
            border-radius:$radius-big;
            margin:20px;
            margin-top:0;
            background:$blue;

            @media (max-width: $breakpoint-mobile) {
                border-radius:$radius-big $radius-big 0 0;
                margin: 0 0 20px;
            }

            .account-actions {
                width:44px;
                height:44px;
                border-radius:22px;
                background:rgba(255,255,255,0.12);
                display:block;
                position:absolute;
                top:20px;
                right:20px;
                cursor: pointer;
                padding-right:0;

                .button {
                    width:44px;
                    height:44px;
                    color:white;
                    line-height:44px;
                    text-align:center;
                }

                .action-menu {
                    color:$black;
                }
            }

            .wrapper {

                .details {
                    padding:20px 0;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .blockchain {
                        font-size: 80px;
                        color:white;
                    }

                    .name {
                        font-size: $font-size-large;
                        font-family: 'Poppins', sans-serif;
                        font-weight: bold;
                        text-align:center;
                        max-width:80%;
                        color:white;
                    }

                    .network {
                        font-size: $font-size-standard;
                        margin-top:5px;
                        color:white;
                    }

                    .permissions {
                        display:flex;
                        margin-top:15px;

                        .permission {
                            cursor: pointer;
                            padding:6px 12px;
                            border-radius:50px;
                            background:black;
                            color:$white;
                            font-size:$font-size-small;
                            font-weight:bold;

                            &.red {
                                background:$red;
                            }
                        }
                    }
                }
            }

            .flex-wrapper {
                display:flex;
                flex-direction:row;

                .resources {
                    padding:0 20px 40px 20px;
                    display:flex;
                    justify-content: center;
                    width:100%;

                    @media (max-width: $breakpoint-mobile) {
                        flex-direction:column;
                    }

                    .loading {
                        font-size: 36px;
                        color: white;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        width:100%;
                    }

                    .resource {
                        display:flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding:0 20px;

                        @media (max-width: $breakpoint-mobile) {
                            flex-direction:row;
                            flex-grow:1;
                            align-items: center;
                            justify-content: space-evenly;
                            padding:10px 0;
                        }

                        i {
                            display:flex;
                            justify-content: center;
                            align-items: center;
                            width:44px;
                            height:44px;
                            color:$blue;
                            font-size: 22px;
                            background:white;
                            border-radius:22px;

                            @media (max-width: $breakpoint-mobile) {
                                width:28px;
                                height:28px;
                                font-size: 18px;
                                border-radius:22px;
                            }

                            &.red {
                                color:$red;
                                border-color: $red;
                                font-size: 20px;
                                margin-top:-2px;

                                @media (max-width: $breakpoint-mobile) {
                                    font-size: 16px;
                                    margin-top:-4px;
                                }
                            }
                        }

                        .type {
                            margin-bottom:10px;
                            color: white;
                            font-size: $font-size-big;
                            font-family: 'Poppins', sans-serif;
                            font-weight: bold;

                            @media (max-width: $breakpoint-mobile) {
                                margin:0;
                                font-size: $font-size-standard;
                            }
                        }

                        .percentage {
                            font-size: $font-size-standard;
                            margin-top:10px;
                            font-family: 'Poppins', sans-serif;
                            font-weight: bold;
                            color: white;

                            @media (max-width: $breakpoint-mobile) {
                                margin:0;
                            }
                        }

                        .action {
                            margin-top:10px;
                            color: $blue;

                            @media (max-width: $breakpoint-mobile) {
                                margin:0;
                            }
                        }
                    }
                }

                .actions {
                    padding:30px;
                    height:calc(#{$quickheightnobuffer} - #{$panelheight * 2});
                    overflow-y:auto;
                    width:100%;

                    .action {
                        display:flex;
                        margin-bottom:10px;
                        align-items: center;

                        .icon {
                            height:35px;
                            width:35px;
                            border-radius:50%;
                            background:$blue;
                            color:$white;
                            display:flex;
                            justify-content: center;
                            align-items: center;

                            &.red {
                                background:$red;
                            }
                        }

                        .name {
                            padding:0 10px;
                            flex:1;
                            font-size: $small;
                            font-weight: bold;
                        }

                        button {
                            min-width:80px;
                        }
                    }
                }
            }


        }

        .assets {
            flex:1;
            position:relative;

            .fiat-title {
                position:absolute;
                left: 20px;
                top: 0;
                z-index: 1;
            }

            .token-list {
                .tokens {
                    height:auto;
                }
            }
        }


    }


</style>
