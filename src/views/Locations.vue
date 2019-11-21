<template>
	<section>
		<section class="blockchain-list-container">



			<!-------------------------->
			<!------ BLOCKCHAINS ------->
			<!-------------------------->
			<section class="blockchains" v-if="!isMobile || !location" :class="{'full-width':isMobile}">
				<section class="head with-button">
					<figure>{{$t('locations.locations')}}</figure>
					<Button :text="$t('generic.add')" @click.native="addLocation" />
				</section>
				<section class="scroller">
					<section class="blockchain-list">
						<section class="badge-item hoverable" :class="{'active':location && location.id === loc.id}" v-for="loc in locations" @click="selectLocation(loc)">
							<figure class="badge iconed small icon-globe"></figure>
							<section class="details">
								<figure class="title">{{loc.name}}</figure>
							</section>
						</section>
					</section>
				</section>
			</section>

			<!-------------------------->
			<!------- NETWORKS --------->
			<!-------------------------->
			<section class="list-container" v-if="location">
				<section class="head with-button">
					<figure>
						<figure v-if="isMobile" class="back-button" @click="selectLocation(null)">
							<i class="fal fa-arrow-left"></i>
						</figure>
					</figure>
					<Button :text="$t('generic.remove')" v-if="location && locations.length > 1" @click.native="removeLocation" />
				</section>
				<section class="scroller location" v-if="location">
					<section class="limit-800">
						<figure class="section-title">{{$t('locations.nameLabel')}}</figure>
						<Input big="1"
						       :placeholder="$t('locations.namePlaceholder')"
						       :text="location.name"
						       v-on:changed="x => location.name = x" />

						<br>
						<br>

						<figure class="section-title">{{$t('locations.countryLabel')}}</figure>
						<Select bordered="1" :label="$t('locations.countryLabel')"
						        :selected="location.country" style="flex:3;"
						        :options="[null].concat(countries)"
						        :parser="x => x ? x.name : $t('locations.countryItemNone')"
						        v-on:selected="x => location.country = x" />

						<br>
						<br>
						<br>
						<figure class="section-title">{{$t('locations.addressLabel')}}</figure>
						<Input :text="location.address" v-on:changed="x => location.address = x" />

						<section class="split-inputs">
							<Input :label="$t('locations.cityLabel')"
							       :text="location.city"
							       v-on:changed="x => location.city = x" />
							<Input :label="$t('locations.stateLabel')"
							       :text="location.state"
							       v-on:changed="x => location.state = x" />
						</section>

						<Input :label="$t('locations.phoneLabel')"
						       placeholder="5555555555"
						       :text="location.phone"
						       v-on:changed="x => location.phone = x" />
					</section>
				</section>
			</section>








		</section>
	</section>
</template>

<script>
	import {mapGetters, mapActions, mapState} from 'vuex';
	import * as Actions from '@walletpack/core/store/constants'
	import {LocationInformation} from "@walletpack/core/models/Identity";
	import Countries from '../data/Countries'

	let saveTimeout;
	export default {
		data(){return {
			location:null,
			countries:Countries,
		}},
		computed:{
			...mapState([
				'scatter',
			]),
			...mapGetters([
				'locations'
			]),
			isValidName(){
				if(!this.location) return;
				return this.location.name.length;
			},
			nameExists(){
				if(!this.location) return;
				return this.locations.find(x => x.id !== this.location.id && x.name.toLowerCase() === this.location.name.toLowerCase())
			},
		},
		mounted(){
			if(!this.locations.length) this.addLocation();
			else this.selectLocation(this.locations[0]);
		},
		methods:{
			selectLocation(location){
				this.location = !location ? null : location.clone();
			},
			addLocation(){
				const scatter = this.scatter.clone();
				const location = LocationInformation.placeholder();
				location.name = `New Location - ${new Date().toLocaleString()}`;
				scatter.keychain.updateOrPushLocation(location);
				this[Actions.SET_SCATTER](scatter);
				this.location = location.clone();
			},
			removeLocation(){
				if(!this.location) return;
				const location = this.location.clone();
				this.selectLocation(this.locations.find(x => x.id !== location.id));
				const scatter = this.scatter.clone();
				scatter.keychain.removeLocation(location);
				this[Actions.SET_SCATTER](scatter);
			},
			save(){
				if(!this.location) return;
				const original = this.locations.find(x => x.id === this.location.id);
				if(original && JSON.stringify(original) === JSON.stringify(this.location)) return;
				if(!this.isValidName) return;
				if(this.nameExists) return;
				const scatter = this.scatter.clone();
				scatter.keychain.updateOrPushLocation(this.location);
				this[Actions.SET_SCATTER](scatter);
			},
			...mapActions([
				Actions.SET_SCATTER,
			]),
		},
		watch:{
			location:{
				handler(){
					clearTimeout(saveTimeout);
					saveTimeout = setTimeout(() => {
						this.save();
					}, 500);
				},
				deep:true,
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.location {
		padding:30px;

		@media (max-width: $breakpoint-tablet) {
	        padding:20px;
	    }

	}

</style>
