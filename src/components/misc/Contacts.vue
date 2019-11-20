<template>
	<section class="blockchain-list-container">

		<!-------------------------->
		<!------ BLOCKCHAINS ------->
		<!-------------------------->
		<section class="blockchains" v-if="!isMobile || !selectedBlockchain" :class="{'full-width':isMobile}">
			<section class="head">
				{{$t('generic.selectBlockchain')}}
			</section>
			<section class="scroller">
				<section class="blockchain-list">
					<section class="badge-item hoverable" :class="{'active':selectedBlockchain === blockchain}" v-for="blockchain in blockchains" @click="selectBlockchain(blockchain)">
						<figure class="badge iconed" :class="blockchainIcon(blockchain)"></figure>
						<section class="details">
							<figure class="title">{{blockchainName(blockchain)}}</figure>
							<figure class="row">
								<figure class="secondary">{{contactsFor(blockchain).length}} {{$tc('generic.contacts', contactsFor(blockchain).length)}}</figure>
							</figure>
						</section>
						<i class="fal fa-chevron-right"></i>
					</section>
				</section>
			</section>
		</section>

		<!-------------------------->
		<!------- NETWORKS --------->
		<!-------------------------->
		<section class="list-container" v-if="!isMobile || selectedBlockchain">
			<section class="head">
				<figure v-if="isMobile" class="back-button" @click="selectBlockchain(null)">
					<i class="fal fa-arrow-left"></i>
				</figure>
				{{blockchainName(selectedBlockchain)}} {{$tc('generic.contacts', 2)}}
			</section>
			<SearchAndFilter :key="selectedBlockchain" full-search="1" v-on:terms="x => terms = x" />
			<section class="scroller with-tail with-search">
				<section class="item-list">
					<section class="item" v-for="contact in visibleContacts" @click="asSelector ? $emit('recipient', contact.recipient) : () => {}">
						<section class="basics" :class="{'open':expanded && expanded.unique() === contact.unique()}">
							<figure class="chevron" v-if="!asSelector" @click="asSelector ? () => {} : toggleExpansion(contact)">
								<i class="icon-right-open-big"></i>
							</figure>
							<section class="details" @click="asSelector ? () => {} : toggleExpansion(contact)">
								<figure class="name">{{contact.name}}</figure>
								<figure class="text">{{contact.recipient}}</figure>
							</section>
							<section class="actions" v-if="!asSelector">
								<Button :text="$t('generic.remove')" @click.native="removeContact(contact)" />
								<Button :text="$t('generic.send')" blue="1" @click.native="sendContact(contact)" />
							</section>
							<section class="actions" v-if="asSelector">
								<Button :text="$t('generic.select')" blue="1" />
							</section>
						</section>

						<section class="expanded" v-if="expandedUnique === contact.unique()">
							<EditContact :original="expanded" v-on:updated="x => expanded = x" v-on:save="saveContact" />
						</section>
					</section>
				</section>
			</section>
			<section class="tail">
				<Button @click.native="addNewContact" :text="$t('generic.add')" blue="1" />
			</section>
		</section>

	</section>
</template>

<script>
	import {mapState, mapGetters} from 'vuex';
	import {Blockchains, BlockchainsArray} from "@walletpack/core/models/Blockchains";
	import EditNetwork from "../../components/misc/EditNetwork";
	import PopupService from "../../services/utility/PopupService";
	import {Popup} from "../../models/popups/Popup";
	import SearchAndFilter from "../../components/reusable/SearchAndFilter";
	import ContactService from "@walletpack/core/services/utility/ContactService";
	import EditContact from "../../components/misc/EditContact";

	export default {
		components: {EditContact, SearchAndFilter, EditNetwork},
		props:['asSelector'],
		data(){return {
			terms:'',
			expandedUnique:null,
			expanded:null,
			knownNetworks:[],
			test:false,
			blockchains: BlockchainsArray.map(x => x.value),
			selectedBlockchain:null,
			unreachable:{},
		}},
		computed:{
			...mapGetters([
				'networks',
				'accounts',
				'contacts',
			]),
			visibleContacts(){
				return this.contactsFor(this.selectedBlockchain).filter(x => {
					if(!this.terms.length) return true;
					return x.name.toLowerCase().indexOf(this.terms) > -1 || x.recipient.toLowerCase().indexOf(this.terms) > -1
				});
			},
		},
		created(){
			if(!this.isMobile){
				this.selectedBlockchain = this.blockchains[0];
			}
		},
		methods:{
			async removeContact(contact){
				await ContactService.remove(contact);
			},
			sendContact(contact){
				this.$router.push({name:this.RouteNames.TRANSFER, query:{recipient:contact.id}})
			},

			blockchainIcon(blockchain){
				if(BlockchainsArray.map(x => x.value).includes(blockchain)){
					return `token-${blockchain}-${blockchain}`;
				}

				return `icon-network`;
			},
			isCustom(contact){
				return !this.contactsFor(contact.blockchain).find(x => x.unique() === contact.unique())
			},
			selectBlockchain(blockchain){
				this.selectedBlockchain = blockchain;
				this.expanded = null;
				this.terms = '';
			},
			toggleExpansion(contact){
				if(this.expanded && this.expanded.unique() === contact.unique()) {
					this.expandedUnique = null;
					return this.expanded = null;
				}
				this.expandedUnique = contact.unique();
				this.expanded = contact.clone();
			},
			contactsFor(blockchain){
				return this.contacts.filter(x => x.blockchain === blockchain);
			},
			async saveContact(){
				const updated = await ContactService.addOrUpdate(this.expanded);
				if(!updated) return;
				this.expanded = null;
				this.expandedUnique = null;
			},
			addNewContact(){
				PopupService.push(Popup.addNewContact(this.selectedBlockchain, async network => {

				}));
			},

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../styles/variables";

	.actions {
		button {
			margin-left:5px;
		}
	}


</style>
