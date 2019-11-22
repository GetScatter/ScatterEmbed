<template>
    <section>

        <section class="action-box top-pad">
            <label>{{$t('settings.destroy.title')}}</label>

            <p>{{$t('settings.destroy.description')}}</p>

            <br><br>
            <section class="disclaimer red" style="margin-bottom:0;">
				<b>{{$t('settings.destroy.important')}}</b>
			</section>
            <br>
            <br>
            <Button :text="$t('settings.destroy.button')" red="true" @click.native="destroy" />
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import PopupService from '../../../services/utility/PopupService';
    import {Popup} from '../../../models/popups/Popup'

    export default {
        data () {return {

        }},
        computed:{
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks',
            ])
        },
        methods: {
            destroy(){
                PopupService.push(Popup.destroyScatter());
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../styles/variables";


</style>
