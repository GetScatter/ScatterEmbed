<template>
    <section>

        <section class="snackbar" @click="close">
            <figure class="message no-icon">{{item.message}}</figure>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as UIActions from "../../../store/ui_actions";

    export default {
        computed:{
            item(){
                return this.popup.data.props;
            }
        },
        methods:{
            close(){
                this[UIActions.RELEASE_POPUP](this.popup)
            },
            ...mapActions([
	            UIActions.RELEASE_POPUP
            ])
        },
        props:['popup']
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../styles/variables";

    .snackbar {
        cursor: pointer;
        pointer-events:auto;
        display:inline-block;
        margin-top:10px;
        color:white;
        padding:10px 0;
        border-radius:4px;
        text-align:left;

        background:$blue;
        border:1px solid $darkblue;

        .message {
            vertical-align: middle;
            display:inline-block;
            color:white;
            font-size:13px;
            font-weight: bold;
            padding:0 20px;

        }
    }

</style>
