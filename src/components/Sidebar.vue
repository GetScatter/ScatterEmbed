<template>
	<section class="sidebar-container" :class="{'locked':!sidebarLocked}">
		<section class="placeholder"></section>
		<section class="sidebar">
			<figure class="bar-bg"></figure>
			<figure class="category" v-for="category in items">
				<figure class="category-name" v-if="category.name">{{category.name}}</figure>
				<router-link :key="item.name" :to="{name:item.route}" class="item" :class="{'active':$route.name === item.route}" v-for="(item, i) in category.items">
					<!-- <i :class="itemIcon(item)"></i> -->
					<i :class="itemIcon(item)"></i>
					<span>{{item.name}}</span>
				</router-link>
			</figure>

			<figure class="lock-sidebar" @click="toggleSidebar">
				<span class="nav"></span>
			</figure>
		</section>
	</section>
</template>

<script>
	import {mapGetters, mapState, mapActions} from 'vuex';
	import {RouteNames} from "../vue/Routing";
	import * as UIActions from "../store/ui_actions";

	export default {
		data(){return {

		}},
		computed:{
			...mapState([
				'history',
				'sidebarLocked'
			]),
			...mapGetters([
				'accounts',
			]),

			items(){
				return [
					{
						name:null,
						items:[
							{name:'Dashboard', route:RouteNames.HOME},
							this.accounts.length ? {name:'Apps', route:RouteNames.APPS} : null,
							{name:'Wallet', route:RouteNames.WALLET},
							this.accounts.length ? {name:'Assets', route:RouteNames.ASSETS} : null,
							// this.accounts.length ? {name:'Marketplace', route:RouteNames.ITEMS} : null,
							{name:'Identities', route:RouteNames.IDENTITIES},
							{name:'Locations', route:RouteNames.LOCATIONS},
							this.accounts.length ? {name:'Reputation', route:RouteNames.RIDL} : null,
							this.features.creditCards ? {name:'Purchase', route:RouteNames.PURCHASE} : null,
							{name:'Contacts', route:RouteNames.CONTACTS},
							this.history.length ? {name:'History', route:RouteNames.HISTORIES} : null,
							{name:'Networks', route:RouteNames.NETWORKS},
							{name:'Settings', route:RouteNames.SETTINGS},
						].filter(x => !!x)
					}
				]
			}
		},
		mounted(){
			this[UIActions.SET_SIDEBAR](window.localStorage.getItem('sidebar') === 'true');
		},
		methods:{
			itemIcon(item){
				switch(item.name) {
					case 'Dashboard':
						return 'fal fa-rocket'

					case 'Apps':
						return 'fal fa-star'

					case 'Wallet':
						return 'fal fa-wallet'

					case 'Assets':
						return 'fal fa-coins'

					case 'Identities':
						return 'fal fa-passport'

					case 'Locations':
						return 'fal fa-map-marker-alt'

					case 'Reputation':
						return 'fal fa-shield'

					case 'Contacts':
						return 'fal fa-address-book'

					case 'History':
						return 'fal fa-history'

					case 'Networks':
						return 'fal fa-server'

					case 'Settings':
						return 'fal fa-cog'

					case 'Marketplace':
						return 'fal fa-shopping-cart'

					default:
						return 'fal fa-star'

				}
			},
			toggleSidebar(){
				this[UIActions.SET_SIDEBAR](!this.sidebarLocked);
				window.localStorage.setItem('sidebar', this.sidebarLocked);
			},
			...mapActions([
				UIActions.SET_SIDEBAR
			])
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	$time:0.2s;
	$closed:64px;
	$open:240px;

	$mobileClosed:64px;
	$mobileOpen:100%;

	.sidebar-container {
		-webkit-user-select: none !important;
		width:$closed;
		transition:width $time ease; // Matches carousel timeout

		.placeholder {
			width:$closed;
			height:$fullheight;
		}

		.sidebar {
			flex:0 0 auto;
			width:$closed;
			border-right:1px solid $lightgrey;
			padding:20px 0;
			overflow-x:hidden;
			white-space: nowrap;
			position:fixed;
			left:0;
			padding-top:69px;
			top:0px;
			bottom:70px;
			background-color:white;
			z-index:10000;
			box-shadow:0 0 0 transparent, 0 0 0 transparent;

			transition: width $time ease, box-shadow 1.1s ease;

			.bar-bg {
				width:$closed;
				position:absolute;
				left:0;
				top:0;
				bottom:0;
				z-index:-1;
			}

			.lock-sidebar {
				position:absolute;
				top:13px;
				left:22px;
				right:20px;
				height:44px;
				cursor: pointer;
				display:flex;
				flex-direction:row;
				justify-content:space-between;
				align-items:center;

				transition:all 0.2s ease;
				transition-property: background, color;

				span {
					display:block;
					height:2px;
					width:18px;
					background:black;
					position:relative;

					&:before {
						width:18px;
						height:2px;
						display:block;
						background:black;
						position:absolute;
						top:-6px;
						content:'';
					}

					&:after {
						width:18px;
						height:2px;
						display:block;
						background:black;
						position:absolute;
						bottom:-6px;
						content:'';
					}
				}

				svg {
					opacity:1;
				}
			}

			.item {
				cursor: pointer;
				padding:14px 12px;
				margin:0;
				display:flex;
				align-items: center;
				color: black;
				transition:all $time ease;
				transition-property: background, padding;
				font-size:$medium;
				text-transform:uppercase;

				&:first-child {
					border-top:1px solid $lightgrey;
				}

				i {
					padding-right:18px;
					margin-left:4px;
					font-size: 24px;
					transition:all $time ease;
					transition-property: color, margin;
					color: black;
				}

				span {
					margin-left:5px;
					opacity:0;
					transition:all $time ease;
					transition-property: margin-left, opacity, color;
					color: black;
				}

				&:hover {
					background:rgba(0,0,0,0.02);
				}

				&:hover, &.active {

					background-color:rgba($blue,0.04);

					i {
						color:$blue;
					}

					span {
						color:$blue;
					}
				}
			}

			.category-name {
				font-size: $small;
				font-weight: bold;
				text-transform: uppercase;
				padding:0 20px;
				margin-top:40px;
				margin-bottom:10px;
				opacity:0;
				transition:all $time ease;
				transition-property: opacity;
			}


		}

		&:not(.locked){
			.sidebar {
				.item {
					padding:14px 12px;

					i {
						margin-left:7px;
					}
				}

				svg {
					opacity:0;
				}

				.category {
					i {

					}

					span {

					}
				}

				&:hover {
					width:$open;
					transition: width $time ease, box-shadow 0.3s ease;
					box-shadow:10px 0 30px rgba(0,0,0,0.15), 2px 0 10px $blue-shadow;
					border-right:0;

					.category-name {
						opacity:1;
					}

					.item {
						color:$silver;

						span {
							margin-left:0;
							opacity:1;
						}
					}
				}
			}
		}

		&.locked {
			width:$open;

			.sidebar {
				width:$open;
				transition: width $time ease, box-shadow 0.3s ease;

				.category-name {
					opacity:1;
				}

				.item {
					color:$silver;

					span {
						margin-left:0;
						opacity:1;
					}
				}
			}
		}
	}

	.mobile {

		.sidebar-container {
			width:$mobileClosed;

			.placeholder {
				width:$mobileClosed;
			}

			.sidebar {
				width:$mobileClosed;
			}

			&:not(.locked){
				.sidebar {

					&:hover {
						width:$mobileOpen;
					}
				}
			}

			&.locked {
				width:$mobileOpen;

				.sidebar {
					width:$mobileOpen;
				}
			}
		}
	}


</style>
