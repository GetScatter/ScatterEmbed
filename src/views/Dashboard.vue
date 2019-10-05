<template>
    <section class="dashboard">
        <section id="asset-updates">
            <section class="attraction">
              <!-- Promoted app -->
              <div class="promoted-pill">
                Promoted app
              </div>
              <a href="" class="premium-attraction">
                <img src="https://source.unsplash.com/random/600x400">
                <div class="description">
                  <div class="logo">
                    <img src="https://source.unsplash.com/random/120x120">
                  </div>
                  <div class="premium-content">
                    <span class="premium-name">Cheesefactory</span>
                    <span class="premium-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum ante ipsum, at rhoncus nisi facilisis ac. Pellentesque eu magna tristique, ornare velit et, porttitor tellus.</span>
                  </div>
                  <Button text="Open Cheesefactory" />
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
                    <Button text="Stabilize" white=1 />
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
                    <Button text="Exchange" white=1 />
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
        height:calc(100vh - 150px);
        padding:$padding-med;
        display:flex;
        flex-direction:row;

        @media (max-width: $breakpoint-tablet) {
            flex-direction:column;
            padding:0;
        }
    }

    #asset-updates {
        height:100%;
        width:60%;

        @media (max-width: $breakpoint-tablet) {
            height:auto;
            width:100%;
        }

        .attraction {
            height:100%;
            overflow:hidden;
            text-align:center;
            background:$lightgrey;
            border-radius:10px;
            background-color:lighten($blue, 10%);
            border:1px solid $lightgrey;
            position:relative;

            @media (max-width: $breakpoint-tablet) {
                height:auto;
                border-radius:0;
            }

            .promoted-pill {
              position:absolute;
              right:20px;
              top:20px;
              padding:8px 16px 7px;
              background:white;
              color:black;
              border-radius:20px;
              font-size:$font-size-small;
              display:inline-block;
              margin:0 auto;
              text-transform:uppercase;
              z-index:1;

              @media (max-width: 420px) {
                  border-radius: 0 20px 0 20px;
              }
            }

            .premium-attraction {
              height:65%;
              background:darken($blue, 25%);
              position:relative;

              @media (max-width: $breakpoint-tablet) {
                  height:400px;
              }

              img {
                width:100%;
                height:100%;
                object-fit:cover;
                opacity:0.6;
                transition:opacity 0.12s ease-in-out;
              }

              &:hover {

                img {
                  opacity:0.44;
                }
              }

              .description {
                display:flex;
                flex-direction:column;
                align-content:end;
                justify-content:end;
                background:rgba(0,0,0,0.42);
                padding:20px;
                position:absolute;
                bottom:0;
                left:0;
                right:0;
                top:0;

                .logo {
                  width:120px;
                  height:120px;
                  border-radius:20px;
                  overflow:hidden;
                  position:absolute;
                  top:20px;
                  left:20px;
                  border: 1px solid rgba(255,255,255,0.16);

                  @media (max-width: 420px) {
                      width:calc(100% - 40px);
                  }

                  img {
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    opacity:1.0;
                  }
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

                    @media (max-width: $breakpoint-tablet) {
                        font-size: $font-size-medium;
                    }
                  }

                  .premium-description {
                    font-size: $medium;
                    font-weight: bold;
                    color:white;
                    opacity:0.6;
                    font-size: $font-size-small;
                    margin-bottom:10px;
                  }

                }

              }

            }
        }

        .suggested-exchanges {
          display:flex;
          flex-direction:column;
          height:35%;
          padding:20px;

          @media (max-width: $breakpoint-tablet) {
              height:300px;
          }

          .token-logo {
            color:white;
            font-size:$font-size-huge;

            @media (max-width: $breakpoint-mobile) {
                display:none;
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
              color:white;
              line-height:18px;
              margin-bottom:4px;
            }

            .suggested-action {
              font-size: $medium;
              color:white;
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

        // <section class="suggested-exchanges">
        //       <section class="convert-to-stable">
        //         <div class="token-logo">
        //           <div class="position-change falling"></div>
        //           <div class="token">
        //             icon
        //           </div>
        //         </div>
        //         <div class="explainer">
        //           <span class="title">EOS is dropping quickly</span>
        //           <span class="suggested-action">You should convert to a stable coin</span>
        //         </div>
        //         <div class="cta">
        //           <Button text="Stabilize" />
        //         </div>
        //       </section>
        //       <section class="convert-to-rising">
        //         <div class="token-logo">
        //           <div class="position-change rising"></div>
        //           <div class="token">
        //             icon
        //           </div>
        //         </div>
        //         <div class="explainer">
        //           <span class="title">ETH has earned you 10%</span>
        //           <span class="suggested-action"></span>
        //         </div>
        //         <div class="cta">
        //           <Button text="Exchange" />
        //         </div>
        //       </section>
        //     </section>

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
                border-radius:20px;
                font-size:$font-size-small;
                display:inline-block;
                margin:0 auto;
                text-transform:uppercase;
            }

            @media (max-width: $breakpoint-tablet) {
                height:400px;
                display:flex;
                flex-direction:column;
                background-position:center -400px;
                margin:0;
                border:0;
                border-radius:0;
                padding:20px;
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