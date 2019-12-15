import {store} from "../../store/store";
import BalanceService from '@walletpack/core/services/blockchain/BalanceService'
import * as UIActions from "../../store/ui_actions";
import Token from "@walletpack/core/models/Token"

export default class BalanceHelpers {

	static async firstLoad(){
		let balances = await window.wallet.storage.getGeneralSetting('balances');
		if(!balances) return null;

		balances = Object.keys(balances).reduce((acc, accountIdentifier) => {
			acc[accountIdentifier] = balances[accountIdentifier].map(x => Token.fromJson(x));
			return acc;
		}, {});

		store.dispatch(UIActions.SET_FULL_BALANCES, balances);
	}

	static storeBalances(balances = null){
		window.wallet.storage.setGeneralSetting('balances', balances || store.state.balances)
	}

}
