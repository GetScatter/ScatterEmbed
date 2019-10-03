<template>
    <section class="ridl">

        <iframe ref="embed" src="https://ridl.network/" class="webview" />
    </section>
</template>

<script>

	const STATES = {
		RIDL:'ridl',
		TOKENS:'tokens',
	};


	export default {
		data(){return {

		}},
		methods:{
			switchState(state){
				this.state = state;
			}
		},
		created(){

		},
		beforeDestroy(){
			window.wallet.utility.reload(window.wallet.windowId)
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .ridl {
        height:$fullheight;

        .webview {
            height:calc(#{$fullheight} - 3px);
            width:100%;
        }
    }





</style>
