<template>
	<section class="apps">
		<PanelTabs :tabs="tabs" :state="this.selectedCategory ? this.selectedCategory : state" v-on:selected="setState" />

		<section class="search-icon" :class="{'visible':exploreTerms.length}" v-if="state === STATES.EXPLORE">
			<i class="icon-search"></i>
			<input v-model="exploreTerms" />
		</section>

		<section class="scroller" ref="scroller" v-if="state === STATES.EXPLORE">
			<section class="padder">
				<section class="featured" v-if="!exploreTerms.length && !selectedCategory && featuredApps.length">
					<section @click="openInBrowser(app.url)" class="featured-app" :key="app.applink" v-for="app in featuredApps">
						<img class="featured-background" :src="app.img" />
						<figure class="tag">{{$t('generic.promoted')}}</figure>
					</section>
				</section>

				<section v-if="!categories.length">
					<section class="categories">
						<section class="category">
							<section class="apps">
								<figure class="app" v-for="i in new Array(5).keys()">
									<figure class="image no-image animated-gradient"></figure>
									<figure class="name"></figure>
								</figure>
							</section>
						</section>
					</section>
				</section>

				<section v-else>
					<section class="categories" v-if="exploreTerms.length">
						<section class="category singular">
							<section class="info">
								<figure class="name">{{terms}}</figure>
							</section>

							<section class="apps">
								<router-link :to="{name:RouteNames.APP, params:{applink:app.applink}}" class="app" :key="app.applink" v-for="app in filteredApps">
									<figure class="image" :class="{'no-image':!getAppData(app.applink).hasOwnProperty('img')}">
										<img v-if="getAppData(app.applink).hasOwnProperty('img')" :src="getAppData(app.applink).img" />
									</figure>
									<figure class="name">{{app.name}}</figure>
								</router-link>
							</section>

						</section>
					</section>

					<section class="categories" v-if="!exploreTerms.length">

						<section class="category" :class="{'singular':selectedCategory}" :key="category.type" v-for="category in categories" v-if="!selectedCategory || selectedCategory === category.type">
							<section class="info" v-if="!selectedCategory">
								<figure class="name">{{category.type}}</figure>
								<figure class="view-all" v-if="category.apps.length > 4" @click="selectCategory(category)">View all {{category.apps.length}} apps <i class="icon-right-open-big"></i></figure>
							</section>

							<section class="apps">
								<router-link :to="{name:RouteNames.APP, params:{applink:app.applink}}" class="app" :key="app.applink" v-for="app in selectedCategory ? category.apps : category.apps.slice(0,10)">
									<figure class="image" :class="{'no-image':!getAppData(app.applink).hasOwnProperty('img')}">
										<img v-if="getAppData(app.applink).hasOwnProperty('img')" :src="getAppData(app.applink).img" />
									</figure>
									<figure class="name">{{app.name}}</figure>
								</router-link>
							</section>

						</section>
					</section>
				</section>


			</section>
		</section>



		<section v-if="state === STATES.MINE">
			<SearchAndFilter v-on:terms="x => terms = x" :filters="filters" />

			<section class="scroller with-search">
				<section class="linked-apps">
					<section class="app" :key="app.applink" v-for="app in linkedApps">
						<figure class="image" @click="goToApp(app)">
							<img v-if="getAppData(app.applink).hasOwnProperty('img')" :src="getAppData(app.applink).img" />
							<figure v-else class="dummy-image"></figure>
						</figure>
						<section class="info" @click="goToApp(app)">
							<figure class="name">{{app.name}}</figure>
							<figure class="category">{{app.type}}</figure>
						</section>
						<section class="actions">
							<Button @click.native="removeApp(app)" :text="$t('generic.remove')" />
							<Button @click.native="goToApp(app)" :text="$t('generic.manage')" />
							<Button v-if="canOpenApp(app.applink)" @click.native="openApp(app.applink)" :text="$t('generic.open')" blue="1" />
						</section>
					</section>
				</section>
			</section>
		</section>


	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';
	import PanelTabs from "../components/reusable/PanelTabs";
	import ObjectHelpers from "@walletpack/core/util/ObjectHelpers";
	import AppsService from "@walletpack/core/services/apps/AppsService";
	import Carousel from "../components/reusable/Carousel";
	import PermissionService from "@walletpack/core/services/apps/PermissionService";
	import {RouteNames} from "../vue/Routing";
	import * as UIActions from "../store/ui_actions";


	const STATES = {
		EXPLORE:'explore',
		MINE:'mine',
	}

	export default {
		components: {Carousel, PanelTabs},
		data () {return {
			state:STATES.EXPLORE,
			STATES,
			selectedCategory:null,
			terms:'',
			exploreTerms:'',
			typeFilter:null,
		}},
		computed:{
			...mapState([
				'scatter',
				'dappLogos',
				'dappData',
				'featuredApps',
			]),
			...mapGetters([
				'permissions',
				'apps',
				'accounts',
			]),
			tabs(){
				let tabs = [
					{name:this.$t('apps.explore'), state:STATES.EXPLORE},
				];
				if(this.selectedCategory) tabs.splice(1, 0, { name:this.selectedCategory, state:this.selectedCategory });
				if(this.permissions.filter(x => x.isIdentity).length) tabs.push({name:this.$t('apps.myApps'), state:STATES.MINE});
				return tabs;
			},
			categories(){
				return AppsService.appsByCategory(this.selectedCategory);
			},
			filteredApps(){
				return AppsService.appsByTerm(this.exploreTerms);
			},
			filters(){
				return [
					{
						selected:this.typeFilter,
						options:[null].concat(AppsService.categories(this.selectedCategory)),
						parser:x => x === null ? this.$t('apps.allCategories') : x,
						onSelect:x => this.typeFilter = x,
					}
				]
			},
			linkedApps(){
				return AppsService.linkedApps(this.terms, this.typeFilter);
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			async init(){
				if(!this.featuredApps || !this.featuredApps.length) {
					this[UIActions.SET_FEATURED_APPS](await AppsService.getFeaturedApps());
				}


				if(!this.accounts.length){
					return this.$router.push({name:this.RouteNames.WALLET});
				}
				if(this.$route.query.hasOwnProperty('state')){
					this.state = this.$route.query.state;
					if(this.state === STATES.MINE && !this.linkedApps.length){
						this.state = STATES.EXPLORE;
					}
				}

				if(this.$route.query.hasOwnProperty('category')){
					this.selectedCategory = this.$route.query.category;
				}

			},
			goToApp(app){
				this.$router.push({name:this.RouteNames.APP, params:{applink:app.applink}})
			},
			getAppData:AppsService.getAppData,
			setState(state){
				if(state === this.selectedCategory) return;
				this.$router.push({ query: {state} });
				this.state = state;
				this.selectedCategory = null;
				this.scrollToTop();
			},
			selectCategory(category){
				this.$router.push({ query: {category:category.type} });
				this.selectedCategory = category.type;
				this.scrollToTop();
			},
			scrollToTop(){
				this.$nextTick(() => {
					if(!this.$refs.scroller) return;
					this.$refs.scroller.scrollTop = 0;
				})
			},
			async removeApp(app){
				await PermissionService.removeAllPermissionsFor(app.applink);
				if(!this.permissions.filter(x => x.isIdentity).length){
					this.state = STATES.EXPLORE;
				}
			},
			...mapActions([
				UIActions.SET_FEATURED_APPS
			])
		},
		created(){
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../styles/variables";

	.apps {
		position: relative;
		height: 100%;

		.search-icon {
			margin:20px 20px 0;
			color:$blue;
			font-size: 22px;
			cursor: pointer;
			border-radius:$radius;
			position:relative;

			.icon-search {
				right: 10px;
				top:16px;
				position: absolute;
			}

			input {
				font-size: $large;
				width:100%;
				-webkit-appearance: none;
				transition:opacity 0.5s ease;
			}

			&:hover, &.visible, &:active, &:focus {
				input {
					border-color:$blue;

				}
			}
		}

		.scroller {
			position: relative;
			height: calc(100vh - 288px);
			margin-top:10px;
			overflow-x: hidden;
			overflow-y: auto;

			&.with-search {
				height:calc(100vh - 290px);
			}

			.padder {
				padding:20px;
				position: relative;
				z-index:2;
			}

			.featured {
				overflow:visible;
				display:flex;
				flex-direction:row;
				flex-wrap:wrap;
				justify-content:space-between;


				.featured-app {
					overflow:hidden;
					border-radius: $radius 0 $radius $radius;
					width:calc(33.3333% - 10px);
					padding-bottom:15%;
					position: relative;
					margin-bottom:20px;
					cursor: pointer;

					@media (max-width: $breakpoint-tablet) {
						width:calc(50% - 10px);
						padding-bottom: 25%;
					}

					@media (max-width: $breakpoint-mobile) {
						width:100%;
						padding-bottom: 50%;
					}

					img {
						position:absolute;
						top:0;
						bottom:0;
						left:0;
						right:0;
						width:100%;
						height:100%;
					}

					.tag {
						position: absolute;
						top: 0;
						right: 0;
						background: white;
						padding: 4px;
						font-size: 9px;
						text-transform: uppercase;
						font-weight: bold;
						color: $black;
					}
				}
			}

			.categories {
				margin-top:40px;

				@media (max-width: $breakpoint-mobile) {
	                margin-top:20px;
	            }

				.category {
					margin:0 -20px 40px;
					padding:40px;

					@media (max-width: $breakpoint-mobile) {
		                margin:0 -20px 20px;
						padding:20px;
		            }

					&:nth-child(even) {
						background:$lightergrey;
					}

					.info {
						display:flex;
						justify-content: space-between;
						font-size: $medium;
						font-weight: bold;
						margin-bottom:15px;

						.name {
							font-size: $font-size-medium;
	                        font-family: 'Poppins', sans-serif;
	                        font-weight: bold;
						}

						.view-all {
							color:$blue;
							cursor: pointer;
						}
					}

					.apps {
						white-space: nowrap;
						overflow-y:auto;
						padding-bottom:20px;

						&:after {
							content: "";
							flex: auto;
						}


						.app {
							display:inline-block;
							width:calc(20% - 10px);
							max-width:100px;

							@media (max-width: $breakpoint-tablet) {
								width:calc(50% - 5px);
								max-width:80px;
							}

							.image {
								border-radius:$radius;
								overflow:hidden;
								position: relative;

								&:after {
									content: "";
									display: block;
									padding-bottom: 100%;
								}

								img {
									position: absolute;
									top:0; bottom:0; left:0; right:0;
									width:100%;
									height:100%;
								}

							}

							.name {
								margin-top:10px;
								text-align:center;
								font-size: $small;
								font-weight: bold;
							}

						}
					}

					&:not(.singular){
						.apps {
							.app {
								margin-right:20px;

								@media (max-width: $breakpoint-tablet) {
									margin-right:10px;
								}

								&:last-child {
									margin-right:0;
								}
							}
						}
					}

					&.singular {
						.apps {
							white-space: normal;
							display:flex;
							flex-wrap: wrap;
							justify-content: space-between;

							.app {
								margin-bottom:50px;

								&:last-child {
									margin-left:20px;
								}
							}
						}
					}
				}
			}

			.linked-apps {
				padding:40px;

				@media (max-width: $breakpoint-mobile) {
					padding:20px;
				}

				.app {
					display:flex;
					align-items: center;
					margin-bottom:20px;

					@media (max-width: $breakpoint-mobile) {
						padding:20px;
						flex-direction:column;
					}

					.image {
						flex:0 0 auto;
						height:90px;
						width:90px;
						border-radius:$radius;
						overflow:hidden;
						cursor: pointer;

						&.no-image {
							background:rgba(0,0,0,0.02);
						}

						img, .dummy-image {
							height:90px;
							width:90px;
						}

						.dummy-image {
							background:$lightergrey;
						}
					}

					.info {
						flex:1;
						padding:0 20px;
						cursor: pointer;
						font-size: $font-size-standard;
						font-family: 'Poppins', sans-serif;

						.name {
							font-size: $medium;
							font-weight: bold;
							color:black;
							font-size: $font-size-standard;
						}

						.category {
							font-size: $font-size-small;
							opacity:0.6;
							color:black;
						}
					}

					.actions {
						flex:0 0 auto;

						@media (max-width: $breakpoint-mobile) {
							margin:10px -10px 0 0;
						}

						button + button {
							margin-left:10px;
						}
					}
				}
			}
		}
	}


</style>
