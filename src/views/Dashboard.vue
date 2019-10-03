<template>
    <section class="dashboard">
        <section id="asset-updates">
            <section class="attraction">

            </section>
        </section>
        <section class="focus-boxes">
            <a id="proxy" ref="https://get-scatter.com/vote"  target="_blank">
                <span class="earn-rewards">Earn rewards</span>
                <h3>Make our ecosystem better by proxying your tokens</h3>
                <h5>Help define the gold standard for what a Block Producer should be by proxying your tokens.</h5>
                <Button text="Get started now" />
            </a>
        </section>

    </section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'

	let saveTimeout;
	export default {
		components:{

		},
		data() {
			return {

			}
		},
		computed:{
			...mapState([
				'scatter',
			]),
			...mapGetters([
				'keypairs',
				'accounts',
			]),

		},
		mounted(){

		},
		methods: {

		},
		created() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .dashboard {
        height:calc(100vh - 150px);
        padding:$padding-med;
        display:flex;
        flex-direction:row;

        @media (max-width: $breakpoint-tablet) {
            flex-direction:column;
        }
    }

    #asset-updates {
        height:100%;
        width:60%;

        @media (max-width: $breakpoint-tablet) {
            height:400px;
            width:100%;
        }

        .attraction {
            height:100%;

            text-align:center;
            background:$lightgrey;
            border-radius:10px;
            background-image:url('../assets/gs_mobile_apps_homebg.png');
            background-size:cover;
        }

    }

    .focus-boxes {
        display: grid;
        grid-template-rows: 100%;
        width:40%;

        @media (max-width: $breakpoint-tablet) {
            width:100%;
            display:flex;
            flex-direction:column;
        }

        #proxy {
            text-align:center;
            background:white;
            border:1px solid $lightgrey;
            border-radius:10px;
            background-size:cover;
            margin:0 10px 0px 20px;
            position:relative;
            transition: border 0.12s ease-in-out;
            display:flex;
            flex-direction:column;
            justify-content:end;
            background-image:url('../assets/voting.png');
            background-size:100%;
            background-position:center center;
            background-repeat:no-repeat;
            overflow:hidden;

            .earn-rewards {
                padding:8px 16px 7px;
                background:black;
                color:white;
                border-radius:20px;
                font-size:$font-size-small;
                display:inline-block;
                margin:0 auto;
                text-transform:uppercase;

                @media (max-width: $breakpoint-tablet) {
                    position:absolute;
                    top:20px;
                    left:20px;
                    right:20px;
                    max-width:50%;
                }
            }

            @media (max-width: $breakpoint-tablet) {
                height:400px;
                width:100%;
                display:flex;
                flex-direction:column;
                background-position:center -400px;
                margin:20px 0 0;
            }

            @media (min-width: 601px ) and (max-width: 919px) {
                height:500px;
                background-position:center;
                background-size:70%;
            }

            @media (max-width: $breakpoint-mobile) {
                height:420px;
                background-position:center -120px;
            }

            h3 {
                color:black;
                font-size:20px;
                line-height:24px;
                display:block;
                background-image: linear-gradient(180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%);
                padding:10px 12px 5px;
                margin:0;
                text-shadow:0 0 10px white, 0 0 20px white;

                @media (min-width: $breakpoint-tablet) {
                    font-size:20px;
                }
            }

            h5 {
                color:$silver;
                display:block;
                background:white;
                padding:4px 10px 20px;
                font-size:$font-size-standard;
                font-weight:normal;
            }

            img {
                width: 60%;
                margin:20px auto;
                height:60%;
            }

            &:hover {
                border:1px solid $blue;
            }

            button {
                margin: 0 20px 20px;
            }
        }

        #vote {
            text-align:center;
            border-radius:10px;
            background:white;
            padding:0;
            position:relative;
            overflow:hidden;
            border:1px solid $lightgrey;
            transition: border 0.12s ease-in-out;
            margin:10px 10px 0 20px;
            display:flex;
            flex-direction:column;
            justify-content:end;
            background-image:url('../assets/love.png');
            background-size:90%;
            background-position:top center;
            background-repeat:no-repeat;
            overflow:hidden;

            @media (max-width: $breakpoint-tablet) {
                height:400px;
                width:100%;
                display:flex;
                flex-direction:column;
                margin:20px 0 20px;
            }

            h3 {
                color:black;
                font-size:$font-size-big;
                line-height:28px;
                display:block;
                background-image: linear-gradient(180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%);
                padding:20px 20px 5px;
                margin:0;
                text-shadow:0 0 10px white, 0 0 20px white;
            }

            h5 {
                color:$blue;
                display:block;
                background:white;
                padding:0px 20px 20px;
                font-size:$font-size-standard;
            }

            img {
                width: 60%;
                margin:20px auto;
                height:60%;
            }

            &:hover {
                border:1px solid $blue;
            }

            button {
                margin: 0 20px 20px;
            }
        }
    }




</style>