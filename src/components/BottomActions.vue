<template>
    <section class="bottom-actions">

        <section class="flex-wrapper" v-if="accounts.length">
            <section class="action" @click="quickAction(RouteNames.TRANSFER)">
                <i class="fal fa-sign-out"></i>
                <span>Send</span>
            </section>
            <section class="action" @click="quickAction(RouteNames.RECEIVE)">
                <i class="fal fa-sign-in"></i>
                <span>Receive</span>
            </section>
            <section class="action" @click="quickAction(RouteNames.EXCHANGE)">
                <i class="fal fa-retweet"></i>
                <span>Exchange</span>
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
            displayTokenClass(){
                return this.scatter.networkTokens().find(x => x.uniqueWithChain() === this.displayToken).symbolClass()
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .bottom-actions {
        height:70px;
        background:black;
        color:$white;
        z-index:101;
        flex:0 0 auto;

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
