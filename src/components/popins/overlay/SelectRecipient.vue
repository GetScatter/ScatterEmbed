<template>
	<section class="pop-over">
		<PopInHead :title="$t('popins.overlay.selectRecipient')" v-on:close="returnResult" />
		<section class="select-recipient">
			<section class="head">


				<section class="panel-switch">
					<figure class="button" :class="{'active':state === STATES.CONTACTS}" @click="switchState(STATES.CONTACTS)">
						{{$tc('generic.contacts', 2)}}
					</figure>
					<figure class="button" :class="{'active':state === STATES.ACCOUNTS}" @click="switchState(STATES.ACCOUNTS)">
						{{$tc('generic.accounts', 2)}}
					</figure>
				</section>
			</section>
			<section class="body">
				<KeysAndAccountList as-selector="1" v-on:account="accountSelected" v-if="state === STATES.ACCOUNTS" :starting-chain="blockchain" />
				<Contacts v-on:recipient="returnResult" as-selector="1" v-if="state === STATES.CONTACTS" />
			</section>
		</section>
	</section>

</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import KeysAndAccountList from "../../misc/KeysAndAccountList";
	import Contacts from "../../../components/misc/Contacts";
	import * as UIActions from "../../../store/ui_actions";

	const STATES = {
		CONTACTS:'contacts',
		ACCOUNTS:'accounts',
	}

	export default {
		components: {Contacts, KeysAndAccountList},
		props:['popin'],
		data(){return {
			state:STATES.CONTACTS,
			STATES,
		}},
		computed:{
			...mapGetters([
				'accounts',
			]),
			blockchain(){
				return this.popin.data.props.blockchain;
			}
		},
		methods:{
			returnResult(recipient){
				this.popin.data.callback(recipient);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			switchState(state){
				this.state = state;
			},
			accountSelected(account){
				if(!account) this.returnResult(null);
				this.returnResult(account.sendable());
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		}

	}
</script>

<style lang="scss">
	@import "../../../styles/variables";

	.select-recipient {
		display:flex;
		flex-direction:column;
		width:100%;

		.head {
			.panel-switch {
				margin-bottom:0;
			}
		}

		.body {
			height:calc(100vh - 60px - 70px);
			overflow-y:hidden;

			.blockchain-list-container {
				.blockchains {
					.scroller {
						max-height:calc(100vh - 240px);
					}
				}
			}
		}

		.keys-and-accounts-list {
			height: calc(100vh - 120px);
			overflow-y:auto;
			padding-top:20px;
		}


	}

	.mobile {


		.select-recipient {

			.keys-and-accounts-list {
				height: calc(100vh - 80px);
			}
		}
	}

</style>
