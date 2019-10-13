<template>
    <section class="pop-in-head">
        <figure class="popin-title">{{title}}</figure>
        <figure class="popin-close" @click="$emit('close')">
            <i class="fal fa-times"></i>
        </figure>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as UIActions from "../../store/ui_actions";

    export default {
    	props:['title'],
        computed:{
            ...mapGetters([

            ])
        },
        methods:{
            returnResult(truthy){
                this.nextPopIn.data.callback(truthy);
                this[UIActions.RELEASE_POPUP](this.nextPopIn);
            },
            ...mapActions([
	            UIActions.RELEASE_POPUP
            ])
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../styles/variables";

    .pop-in-head {
        display:flex;
        width:100%;
        height:70px;
        justify-content: space-between;
        align-items: center;
        padding:20px;
        background:$lightergrey;

        .popin-title {
            font-size: $font-size-standard;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            color:black;
        }

        .popin-close {
            padding:10px;
            cursor: pointer;
            color:$blue;
            font-size:$font-size-large;
            border-radius:$radius;
        }
    }

</style>
