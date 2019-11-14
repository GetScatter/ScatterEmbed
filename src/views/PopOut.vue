<template>
    <section>
        <section v-if="scatter && popOut">
            <PopOutHead v-on:closed="returnResult" v-if="(popupType !== apiActions.LOGIN && popupType !== apiActions.LOGIN_ALL)" />

            <section class="popout" :class="{'login':popupType === apiActions.LOGIN || popupType === apiActions.LOGIN_ALL}">

                <AppLogin v-if="popupType === apiActions.LOGIN || popupType === apiActions.LOGIN_ALL"
                          :popup="popup"
                          v-on:returned="returnResult" />

                <Signature v-if="popupType === apiActions.SIGN || popupType === apiActions.SIGN_ARBITRARY"
                           :popup="popup" :pinning="pinning"
                           v-on:returned="returnResult" />

                <GetPublicKey v-if="popupType === apiActions.GET_PUBLIC_KEY"
                              :popup="popup" v-on:returned="returnResult" />

                <TransferRequest v-if="popupType === apiActions.TRANSFER"
                                 :popup="popup" :pinning="pinning"
                                 v-on:returned="returnResult" />

                <UpdateIdentity v-if="popupType === apiActions.UPDATE_IDENTITY"
                                :popup="popup" v-on:returned="returnResult" />

                <LinkApp :popup="popup" v-if="popupType === 'linkApp'" v-on:returned="returnResult" />

            </section>

        </section>

        <section class="dummy-bg" :class="{'hide':popOut}">
            <figure>Scatter</figure>
        </section>
    </section>
</template>

<script>
	import '../styles/popout.scss';
	import PopOutHead from '../components/popouts/PopOutHead';

	import { mapActions, mapGetters, mapState } from 'vuex'
	import * as Actions from '@walletpack/core/store/constants';
	import * as ApiActions from '@walletpack/core/models/api/ApiActions';
	import {Popup} from "../models/popups/Popup";
	// import RIDLService from "../services/utility/RIDLService";
	import * as UIActions from "../store/ui_actions";
	import PasswordHelpers from "../services/utility/PasswordHelpers";
	import Scatter from '@walletpack/core/models/Scatter'

	export default {
		data () {return {
			apiActions:ApiActions,
			pinning:false,
            isExtension:false,
			isNativeMobile:false,
		}},
		components:{
			PopOutHead,
			GetPublicKey:() => import('./popouts/GetPublicKey'),
			TransferRequest:() => import('./popouts/TransferRequest'),
			AppLogin:() => import('./popouts/AppLogin'),
			Signature:() => import('./popouts/Signature'),
			LinkApp:() => import('./popouts/LinkApp'),
			UpdateIdentity:() => import('./popouts/UpdateIdentity'),
		},
		async created(){
			this.isExtension = this.$route.query.extension;
			this.isNativeMobile = !!window.PopOutWebView;

			if(!!this.isExtension || !!this.isNativeMobile){

				const {popout, scatter} = this.isExtension
                    ? await window.wallet.utility.getPopOut(this.$route.query.extension)
                    : JSON.parse(await window.PopOutWebView.getPopOut());

				this[UIActions.SET_POPOUT](popout);
				this[Actions.HOLD_SCATTER](Scatter.fromJson(scatter));
				window.onbeforeunload = () => {
					this.returnResult();
					return undefined;
                }
            }

			setTimeout(() => {
				this.setup();
            }, 200);
		},
		computed:{
			...mapState([
				'scatter',
				'popOut',
			]),
			popup(){ return this.popOut ? Popup.fromJson(this.popOut) : null },
			appData(){ return this.popOut ? this.popOut.data.props.appData : null; },
			payload(){ return this.popOut ? this.popOut.data.props.payload : null },
			popupType(){ return this.popOut ? this.popOut.data.type : null },
		},
		methods: {
			async returnResult(result = null){

				const formattedResult = {original:this.popOut, result};
				this.isNativeMobile
                    ? await window.PopOutWebView.popoutResponse(JSON.stringify(formattedResult))    // Only needed for native mobile wallets
				    : await window.wallet.utility.popoutResponse(formattedResult);                  // Only needed for native mobile wallets


				if(this.isExtension)        window.close();
                if(this.isNativeMobile)     window.PopOutWebView.close();
                else                        window.wallet.utility.closeWindow(window.wallet.windowId);

			},
			async checkAppReputation(){
				// this[UIActions.SET_APP_REP](await RIDLService.checkApp(this.appData.applink));
			},
			async setup(){
				if(!this.popOut) return;

				// Should never happen on mobile or extension,
                // no need for handling.
				if(!this.scatter) {
					// This window opens before-hand and hangs around in memory waiting to be
					// displayed. This means that the scatter reference on its store is from the past
					// We need to re-generate the Scatter data for it to be up-to-date.
					let scatter = await window.wallet.storage.getWalletData();
					if (!scatter) this.returnResult(null);
					scatter = Scatter.fromJson(scatter);
					this[Actions.HOLD_SCATTER](scatter);
				}



				this.checkAppReputation();

				const needsPIN = [
					ApiActions.SIGN_ARBITRARY,
					ApiActions.SIGN,
					ApiActions.TRANSFER
				];

				setTimeout(async () => {
					if(this.scatter.pinForAll && needsPIN.includes(this.popup.data.type)){
						this.pinning = true;
						if(! await PasswordHelpers.verifyPIN()){
							this.returnResult(null);
						}
						this.pinning = false;
					}
				})
			},
			...mapActions([
				Actions.HOLD_SCATTER,
				UIActions.SET_APP_REP,
				UIActions.SET_POPOUT,
			])
		},
		watch:{
			['popOut'](){
				this.setup();
			},
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .dummy-bg {
        figure {
            position:fixed;
            top:0;
            left:0;
            right:0;
            z-index:-2;
            height:40px;
            width:100%;
            display:flex;
            align-items: center;
            padding:0 0 0 10px;
            border:1px solid $darkerblue;
            border-bottom:0;
            background:$blue;
            font-family: 'Grand Hotel', sans-serif;
            font-size: 24px;
            color: $white;

            &.hide {
                display:none;
            }
        }
    }


</style>
