<template>
    <section class="bottom-actions" :class="{'sidebarLocked':!sidebarLocked}">

        <section class="flex-wrapper">
            <section class="action" @click="quickAction(RouteNames.TRANSFER)">
                <i class="fal fa-sign-out"></i>
                <span>{{$t('generic.send')}}</span>
            </section>
            <section class="action" @click="quickAction(RouteNames.RECEIVE)">
                <i class="fal fa-sign-in"></i>
                <span>{{$t('generic.receive')}}</span>
            </section>
            <section class="action" @click="quickAction(RouteNames.EXCHANGE)">
                <i class="fal fa-retweet"></i>
                <span>{{$t('generic.exchange')}}</span>
            </section>
        </section>
    </section>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import {RouteNames} from "../vue/Routing";
    import PopupService from "../services/utility/PopupService";
    import {Popup} from "../models/popups/Popup";

    export default {
        components:{
        },
        data(){return {

        }},
        computed:{
            ...mapState([
                'scatter',
                'sidebarLocked'
            ]),
            ...mapGetters([
                'accounts',
            ]),

        },
        mounted(){
        },
        methods:{
            quickAction(route){
                if(this.onAccount){
                    return this.$router.push({name:route, query:{account:this.onAccount.identifiable()}})
                }

                this.$router.push({name:route});
            },
            selectDisplays(){
                PopupService.push(Popup.setDisplayToken(done => {

                }));
            },
        }

    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .bottom-actions {
        height:70px;
        background:$black;
        background:linear-gradient(180deg, #464646 0%,$black 100%);
        color:$white;
        z-index:99;
        flex:0 0 auto;

        /* FOR SAFARI ON iOS - DO NOT REMOVE */
        /* nsjames: This is not a good way to do this. By having this element be a floating element it causes flexbox to break. */
        /*position:fixed;*/
        /*left:64px;*/
        /*bottom:0;*/
        /*right:0;*/



        &.sidebarLocked {
            left:240px;
        }

        .flex-wrapper {
            display:flex;
            height:70px;
            flex-direction:row;
            align-items:center;
            justify-content: center;

            .action {
                width:120px;
                display:block;
                text-transform: uppercase;
                font-weight:bold;
                font-size:$medium;
                text-align:center;
                cursor: pointer;

                @media (max-width: $breakpoint-mobile) {
                    width:33.33333%;
                }

                i {
                    transition:transform 0.2s ease;
                    transform:translateY(0px);
                    width: 44px;
                    font-size:20px;
                    margin: -2px auto 8px;
                    display:block;
                }

                &:hover {
                    color:rgba(255,255,255,1);
                }
            }

        }
    }

</style>
