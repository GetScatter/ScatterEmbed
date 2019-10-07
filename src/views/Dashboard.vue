<template>
    <section class="dashboard">
        <section id="asset-updates">
            <section class="attraction">
              <!-- Promoted app -->
              <div class="promoted-pill">
                Promoted app
              </div>
              <a href="" class="premium-attraction">
                <div class="logo">
                  <img src="https://get-scatter.com/promos/prospectors.jpg">
                </div>
                <img src="https://prospectors.io/assets/landing/main_back-8c9f9ebc866cfda98aa32ee12eb975e0a5307ab4fadc296ce05ec93cad876beb.jpg">
                <div class="description">
                  <div class="premium-content">
                    <span class="premium-name">Prospectors</span>
                    <span class="premium-description">First MMO Game on EOS! Real Time Economic Strategy with fully user-generated economy. Prices for in-game goods and services are determined based on supply and demand, making the Prospectors economy equivalent to an economy during the Gold Rush.</span>
                  </div>
                  <Button text="Open Prospectors" />
                </div>
              </a>

              <!-- Exchange CTA -->
              <section class="suggested-exchanges">
                <section class="convert-to-stable">
                  <div class="token-logo">
                    <i class="fad fa-chart-line-down"></i>
                  </div>
                  <div class="explainer">
                    <span class="title">EOS is dropping quickly</span>
                    <span class="suggested-action">You should convert to a stable coin</span>
                  </div>
                  <div class="cta">
                    <Button text="Stabilize" />
                  </div>
                </section>
                <section class="convert-to-rising">
                  <div class="token-logo">
                    <i class="fad fa-coins"></i>
                  </div>
                  <div class="explainer">
                    <span class="title">ETH has earned you 10% over the last week</span>
                    <span class="suggested-action">Use those earnings to buy a rising token.</span>
                  </div>
                  <div class="cta">
                    <Button text="Exchange" />
                  </div>
                </section>
              </section>

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
        height:calc(100vh - 140px);
        padding:10px 20px 90px;
        display:flex;
        flex-direction:row;

        @media (max-width: $breakpoint-tablet) {
            flex-direction:column;
            padding:0;
            border-radius: $radius-big 0 0 0;
            overflow-y: scroll;
            height:auto;
        }
    }

    #asset-updates {
        width:60%;

        @media (max-width: $breakpoint-tablet) {
            width:100%;
        }

        .attraction {
            height:100%;
            text-align:center;
            background:#066AA7;
            border-radius:$radius-big;
            border:1px solid $lightgrey;
            position:relative;
            z-index: 0;

            @media (max-width: $breakpoint-tablet) {
                height:auto;
                border-radius:$radius-big;
                border:0;
                margin-bottom:30px;
            }

            @media (max-width: $breakpoint-mobile) {

            }

            .promoted-pill {
              position:absolute;
              right:20px;
              top:20px;
              padding:8px 16px 7px;
              background:rgba(0,0,0,0.34);
              color:white;
              border-radius:$radius-big;
              font-size:$font-size-small;
              display:inline-block;
              margin:0 auto;
              text-transform:uppercase;
              z-index:1;

              @media (max-width: 420px) {
                  border-radius: 0 0 0 $radius;
                  top:0;
                  right:0;
              }
            }

            .premium-attraction {
              height:65%;
              background-color:$blue;
              background-image: linear-gradient(211deg, #0280CE 12%, #0799FF 46%, #066AA7 100%);
              position:relative;
              overflow:hidden;
              border-radius:$radius-big $radius-big 0 0;

              img {
                width:90vw;
                height:90vw;
                border-radius:50%;
                object-fit:cover;
                position:absolute;
                top:-60%;
                left:40%;
                box-shadow: 0 0 100px #010b11b5;

                @media (max-width: $breakpoint-tablet) {
                    width:120vw;
                    height:120vw;
                    top:-20%;
                    left:40%;
                }

                @media (max-width: $breakpoint-mobile) {
                    display:none;
                }
              }

              .logo {
                width:120px;
                height:120px;
                border-radius:$radius;
                overflow:hidden;
                position:absolute;
                top:30px;
                left:30px;
                border: 1px solid rgba(255,255,255,0.16);

                @media (max-width: $breakpoint-large-desktop) {
                  width:80px;
                  height:80px;
                  top:20px;
                  left:20px;
                }

                @media (max-width: $breakpoint-mobile) {
                  width:100%;
                  height:180px;
                  top:0px;
                  left:0px;
                  border-radius:$radius-big 0 0 0;
                }

                img {
                  width:100%;
                  height:100%;
                  object-fit:cover;
                  opacity:1.0;
                  border-radius:0;
                  position:relative;
                  top:0;
                  left:0;

                  @media (max-width: $breakpoint-mobile) {
                      display:block;
                  }
                }
              }

              @media (max-width: $breakpoint-tablet) {
                height:400px;
              }

              @media (max-width: $breakpoint-mobile) {
                height:440px;
                border-radius:$radius-big 0 0 0;
              }


              &:hover {

                img {

                }
              }

              .description {
                display:block;
                padding:30px;
                position:absolute;
                bottom:0;
                left:0;
                right:40%;
                text-align:left;

                @media (max-width: $breakpoint-small-desktop) {
                  right:20%;
                }

                @media (max-width: $breakpoint-mobile) {
                  right:0%;
                  padding:40px 20px;
                }

                button {
                  max-height: 42px;
                  place-self: start;
                  margin-top:10px;
                }

                div.premium-content {
                  margin-right:20px;
                  display:flex;
                  flex-direction:column;
                  text-align:left;
                  justify-content:end;
                  align-content:center;
                  align-self:end;

                  .premium-name {
                    font-size: $font-size-large;
                    font-family: 'Poppins', sans-serif;
                    font-weight: bold;
                    color:white;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    margin-bottom:8px;

                    @media (max-width: $breakpoint-tablet) {
                        font-size: 20px;
                    }
                  }

                  .premium-description {
                    font-size: $medium;
                    color:white;
                    opacity:0.9;
                    font-size: $font-size-standard;
                    line-height:1.1rem;
                    margin-bottom:10px;

                    @media (max-width: 1120px) {
                        font-size: $font-size-small;
                        line-height:1rem;
                    }
                  }

                }

              }

            }
        }

        .suggested-exchanges {
          display:flex;
          flex-direction:column;
          height:35%;
          padding:20px 30px;
          background:$lightergrey;
          border-radius:$radius-big 0 29px 29px;
          z-index: 1;
          position:relative;

          @media (max-width: $breakpoint-tablet) {
              min-height: 200px;
          }

          .token-logo {
            color:$blue;
            font-size:34px;

            @media (max-width: $breakpoint-mobile) {
                font-size:44px;
                margin-bottom:10px;
            }
          }

          .cta {
            max-width:120px;
            justify-self: end;

            button {
              width:120px;
            }
          }

          .explainer {
            display:flex;
            flex-direction:column;
            padding:0 20px;
            flex: 1 min-content !important;
            text-align: left;

            @media (max-width: $breakpoint-mobile) {
                padding:0;
            }

            .title {
              font-size: $font-size-standard;
              font-family: 'Poppins', sans-serif;
              font-weight: bold;
              color:black;
              line-height:18px;
              margin-bottom:4px;
            }

            .suggested-action {
              font-size: $medium;
              color:black;
              opacity:1;
              font-size: $font-size-small;
              margin-bottom:10px;
            }
          }

          .convert-to-stable {
            display:flex;
            flex-direction:row;
            height:50%;
            align-items: center;
            flex: 1;

            @media (max-width: $breakpoint-mobile) {
                flex-direction:column;
                align-items: flex-start;
                height:auto;
                padding:20px 0;
            }
          }

          .convert-to-rising {
            display:flex;
            flex-direction:row;
            height:50%;
            align-items: center;
            flex: 1;
            border-top:1px solid rgba(255,255,255,0.12);

            @media (max-width: $breakpoint-mobile) {
                flex-direction:column;
                align-items: flex-start;
                height:auto;
                padding:20px 0;
            }
          }

        }

    }

    .focus-boxes {
        display: grid;
        grid-template-rows: 100%;
        width:40%;

        @media (max-width: $breakpoint-tablet) {
            width:100%;
            height:400px;
            display:block;
            flex-direction:column;
        }

        #proxy {
            text-align:center;
            background:white;
            border:1px solid $lightgrey;
            border-radius:$radius-big;
            background-size:cover;
            margin:0 10px 0px 20px;
            position:relative;
            transition: border 0.12s ease-in-out;
            display:flex;
            flex-direction:column;
            justify-content:center;
            background-image:url('../assets/voting.png');
            background-size:100%;
            background-position:center center;
            background-repeat:no-repeat;
            overflow:hidden;

            .earn-rewards {
                padding:8px 16px 7px;
                background:black;
                color:white;
                border-radius:$radius-big;
                font-size:$font-size-small;
                display:inline-block;
                margin:0 auto;
                text-transform:uppercase;
            }

            @media (max-width: $breakpoint-tablet) {
                border-radius:$radius-big;
                border:0 !important;
                margin:0 0 70px 0;
                padding:40px 40px 80px;
                display:block;
                height: 400px;

                &:hover {
                    border:0;
                }
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

                @media (max-width: $breakpoint-mobile) {
                    border:0;
                }
            }

            button {
                margin: 0 60px 20px;
            }
        }

        #vote {
            text-align:center;
            border-radius:$radius-big;
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

                @media (max-width: $breakpoint-mobile) {
                    border:0;
                }
            }

            button {
                margin: 0 20px 20px;
            }
        }
    }




</style>
