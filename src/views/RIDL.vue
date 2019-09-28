<template>
    <section class="ridl">

        <!--<embed v-if="state === STATES.RIDL" class="webview" src="https://ridl.network/" />-->
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import GetRIDL from '../components/misc/GetRIDL';

    const STATES = {
    	RIDL:'ridl',
        TOKENS:'tokens',
    };


    export default {
    	components:{GetRIDL},
    	data(){return {
    		state:STATES.RIDL,
		    STATES
        }},
        methods:{
	        switchState(state){
	        	this.state = state;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .ridl {
        height:$fullheight;

        .panel-switch {
            margin:0;
        }

        .webview {
            height:calc(#{$fullheight} - 3px);
            width:100%;
        }
    }





</style>
