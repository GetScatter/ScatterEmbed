<template>
    <section class="pop-over">
        <PopInHead :title="$t('popins.overlay.transactionSuccess')" v-on:close="returnResult" />
        <section class="success">
            <section>
                <img src="static/assets/piggy_bank.png" />
                <figure class="info">{{$t('popins.overlay.viewTransactionOn', {explorer:explorer.name})}}</figure>
                <figure class="link" style="cursor:pointer;" @click="open"><u>{{tx}}</u></figure>

                <br>
                <br>

                <Button :text="$t('generic.okay')"
                        @click.native="returnResult(true)" blue="1" />
            </section>
        </section>
    </section>
</template>

<script>
    import {RouteNames} from '../../../vue/Routing'
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as UIActions from "../../../store/ui_actions";

    export default {
	    props:['popin'],
        data(){ return {

        }},
        mounted(){

        },
        computed:{
            ...mapGetters([
                'explorers',
            ]),
            tx(){
                return this.popin.data.props.tx
            },
            blockchain(){
                return this.popin.data.props.blockchain
            },
	        explorer(){
            	return this.explorers[this.blockchain].parsed()
            }
        },
        methods:{
            returnResult(truthy){
                this.popin.data.callback(truthy);
                this[UIActions.RELEASE_POPUP](this.popin);
            },
            open(){
                this.openInBrowser(this.explorer.transaction(this.tx));
            },
            ...mapActions([
	            UIActions.RELEASE_POPUP
            ])
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../styles/variables";

    .pop-over {
        min-width:0;
        max-width:380px;
    }

    .mobile {
        .pop-over {
            max-width:none;
        }
    }

    .success {
        display:flex;
        justify-content: center;
        align-items: center;
        text-align:center;
        padding:30px;

        .info {
            font-size: $small;
            color:$silver;
            margin-bottom:5px;
        }

        .link {
            font-size: $tiny;
        }
    }

</style>
