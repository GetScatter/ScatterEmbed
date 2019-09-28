<template>
    <section>
        <section class="view-base" v-if="route">
            <Popups />


            <router-view v-if="isPopout"></router-view>

            <section v-else>
                <section class="app-content">
                    <Sidebar v-if="unlocked && onboarded" />
                    <section class="view-pane">
                        <QuickActions v-if="showQuickActions" />
                        <router-view class="router-view" :class="{'lowered':true, 'floated':unlocked}"></router-view>
                    </section>

                    <Processes />
                </section>
            </section>

            <section class="working-screen" v-if="workingScreen">
                <figure class="spinner icon-spin4 animate-spin"></figure>
            </section>

        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import {RouteNames, Routing} from '../vue/Routing'

    import Processes            from './Processes';
    import Popups               from './Popups';
    import Sidebar              from './Sidebar';
    import QuickActions         from './QuickActions';

    import SingletonService     from "../services/utility/SingletonService";

    export default {
    	components:{
		    Popups,
		    Processes,
            Sidebar,
		    QuickActions,
        },
        data(){ return {
            routeNames:RouteNames,
	        initialized:false,
        }},
        computed:{
            ...mapState([
                'scatter',
                'workingScreen',
                'processes'
            ]),
            ...mapGetters([
                'unlocked',
            ]),
            onboarded(){
                return this.unlocked && this.scatter.onboarded && this.route !== RouteNames.LOGIN
            },
            isPopout(){
                return this.$route.name === 'popout';
            },
            route(){
                return this.$route.name
            },
            showQuickActions(){
            	if(!this.onboarded) return false;
            	return ![
		            RouteNames.ITEMS,
		            RouteNames.NETWORKS,
		            RouteNames.CONTACTS,
		            RouteNames.HISTORIES,
		            RouteNames.RIDL,
		            RouteNames.SETTINGS,
		            RouteNames.PURCHASE,
		            RouteNames.IDENTITIES,
		            RouteNames.LOCATIONS,
                ].includes(this.$route.name);
            },

        },
        mounted(){
	        this.initialized = true;
        },
        methods:{

        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../styles/variables';

    .working-screen {
        background:rgba(255,255,255,0.93);
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:10001;
        display:flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .spinner {
            font-size: 36px;
            color:$blue;
        }
    }

    .app-content {
        height:$fullheight;
        width:100%;
        display:flex;
        background:$white;
        margin-top:0;
        box-shadow:inset 0 0 0 1px $lightgrey;

        &.no-menu {

        }
    }

    .view-base {
        min-height:100vh;
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .view-pane {
        flex:1;
        position: relative;
        overflow-y: auto;
    }

    .floated {
        flex:1;
    }


</style>
