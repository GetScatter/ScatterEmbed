<template>
    <section class="app">
        <PanelTabs :tabs="tabs" :state="state" v-on:selected="tabSelected" />


        <!--------------------------------->
        <!------------ APP DATA ----------->
        <!--------------------------------->
        <section class="scroller" v-if="state === applink">
            <section class="padder">
                <section class="featured" v-if="getAppData(applink).hasOwnProperty('img')">
                    <Carousel :no-info="true" :slides="[getAppData(applink)]" />
                </section>

                <section class="info">

                    <section class="actions">
                        <section v-if="canOpenApp(applink)">
                            <Button @click.native="openApp(applink)" :text="$t('generic.open')" :blue="true" />
                        </section>
                        <section v-if="permissionsList.length">
                            <Button :text="$t('generic.remove')" @click.native="removeAll" />
                        </section>
                    </section>

                    <section v-if="getAppData(applink).type">
                        <figure class="category">{{getAppData(applink).type}}</figure>
                        <p>{{getAppData(applink).description}}</p>
                    </section>

                </section>
            </section>
        </section>


        <!--------------------------------->
        <!---------- PERMISSIONS ---------->
        <!--------------------------------->
        <section class="permissions scroller" v-if="state === 'permissions'">
            <section class="perms-list">
                <section class="badge-item hoverable" :class="{'active':selected.id === item.id}" v-for="item in permissionsList" @click="selectPermission(item)">
                    <!--<figure class="badge iconed" :class="item.icon"></figure>-->
                    <section class="details">
                        <figure class="title">{{item.title}}</figure>
                        <figure class="row" style="margin-top:0;">
                            <figure class="secondary">{{item.description}}</figure>
                        </figure>
                    </section>
                </section>
            </section>

            <section class="selected-permission">

                <section class="key-val" v-if="isIdentity && selected.accounts.length">
                    <figure>{{$t('app.accountsProvided')}}</figure>
                    <figure>{{selected.getAccounts().map(x => x.formatted()).join(', ')}}</figure>

                    <br>
                    <figure>{{selected.asIdentityRequirements().personal.concat(selected.asIdentityRequirements().location).join(', ')}}</figure>
                </section>

                <section class="key-val" v-if="selected.isIdentityRequirements">
                    <figure>{{$t('app.requiredFields')}}</figure>
                    <figure>{{selected.identityRequirements.join(', ')}}</figure>
                </section>

                <section class="key-val" v-if="isAction">
                    <figure>{{$t('app.mutableFields')}}</figure>
                    <figure>{{selected.mutableActionFields.join(', ')}}</figure>
                </section>

                <br>
                <br>

                <section class="action-box">
                    <section class="key-val">
                        <figure>{{$t('app.removePermission')}}</figure>
                        <p v-if="isIdentity">{{$t('app.removeIdentity')}}</p>
                        <p v-if="isAction">{{$t('app.removeWhitelist')}}</p>

                        <br>

                        <Button :text="$t('generic.remove')" red="1"
                             @click.native="removeSelected" />
                    </section>
                </section>
            </section>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '@walletpack/core/store/constants';
    import PanelTabs from "../components/reusable/PanelTabs";
    import ObjectHelpers from "@walletpack/core/util/ObjectHelpers";
    import AppsService from "@walletpack/core/services/apps/AppsService";
    import Carousel from "../components/reusable/Carousel";
    import PermissionService from "@walletpack/core/services/apps/PermissionService";


    export default {
	    components: {Carousel, PanelTabs},
	    data () {return {
		    state:null,
		    selected:null,
        }},
        computed:{
            ...mapState([
            	'scatter',
	            'dappLogos',
	            'dappData',
            ]),
            ...mapGetters([
            	'permissions',
            ]),
	        applink(){
                return this.$route.params.applink;
            },
	        tabs(){
		        return [
			        {name:this.getAppData(this.applink).name, state:this.applink},
			        this.perms.length ? {name:'Permissions', state:'permissions'} : null,
		        ].filter(x => !!x)
	        },
	        perms(){
		        return this.permissions.filter(x => x.origin === this.applink);
	        },
	        identityPermission(){
		        return this.perms.find(x => x.isIdentity);
	        },
	        contractPermissions(){
		        return this.perms.filter(x => x.isContractAction);
	        },
	        identityRequirementPermissions(){
		        return this.perms.filter(x => x.isIdentityRequirements);
	        },
	        isIdentity(){ return this.selected.isIdentity; },
	        isAction(){ return this.selected.isContractAction; },
	        permissionsList(){
		        return ((this.identityPermission ? [this.identityPermission] : []).concat(this.contractPermissions)).map(permission => ({
			        id:permission ? permission.id : null,
			        title:this.permissionTitle(permission),
			        description:this.permissionDescription(permission),
                    icon:this.permissionIcon(permission),
		        }));
	        }
        },
	    mounted(){
	    	this.state = this.applink;
            this.selected = this.identityPermission;
	    },
        methods:{
	        getAppData:AppsService.getAppData,
            tabSelected(tab){
	        	this.state = tab;
            },
	        selectPermission(item){
		        this.selected = this.permissions.find(x => x.id === item.id);
	        },
	        permissionTitle(permission){
		        if(!permission) return;
		        return permission.isIdentity
			        ? this.$t('app.loginPermission') :
			        `${permission.action}`;
	        },
	        permissionDescription(permission){
		        if(!permission) return;
		        return permission.isContractAction ? permission.contract : '';
	        },
            permissionIcon(permission){
	        	if(!permission) return;
	        	return permission.isIdentity ? 'icon-user' : 'icon-flow-tree'

            },
	        async removeSelected(){
	        	if(this.perms.length === 1) return this.removeAll();

		        await PermissionService.removePermission(this.selected);
		        if(!this.perms.length) return this.$router.back();
		        this.selected = this.perms[0];
	        },
	        async removeAll(){
		        await PermissionService.removeAllPermissionsFor(this.applink)
                this.$router.back();
	        }
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .app {
        .scroller {
            position: relative;
            height:calc(100vh - 220px);
            overflow-y:auto;

            .padder {
                padding:20px;
            }

            .featured {

            }

            .info {
                margin-top:20px;

                .actions {
                    display:flex;
                    justify-content: space-between;
                }

                .category {
                    margin:20px 0 10px 0;
                    font-size: $small;
                    color:$silver;
                }

                p {
                    font-size: $medium;
                }


            }
        }
    }

    .permissions {
        display:flex;

        .perms-list {
            flex:0 0 auto;
            width:260px;
            padding:20px;
            border-right:1px solid $lightgrey;
        }

        .selected-permission {
            flex:1;
            padding:30px;
        }
    }


</style>
