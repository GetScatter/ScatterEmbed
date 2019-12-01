import * as Actions from '@walletpack/core/store/constants'
import StorageService from '../services/wallets/StorageService';
import BackupService from '../services/utility/BackupService';
import Scatter from '@walletpack/core/models/Scatter';
import * as UIActions from "./ui_actions";
import PasswordHelpers from "../services/utility/PasswordHelpers";
import SingletonService from "../services/utility/SingletonService";

import HistoricTransfer from '@walletpack/core/models/histories/HistoricTransfer';
import HistoricExchange from '@walletpack/core/models/histories/HistoricExchange';
import HistoricAction from '@walletpack/core/models/histories/HistoricAction';
import {HISTORY_TYPES} from '@walletpack/core/models/histories/History';

const isPopOut = location.hash.replace("#/", '').split('?')[0] === 'popout' || !!window.PopOutWebView;
let migrationChecked = false;

export const actions = {
    [UIActions.SET_TOKEN_METAS]:({commit}, x) => commit(UIActions.SET_TOKEN_METAS, x),
    [UIActions.SET_FEATURED_APPS]:({commit}, x) => commit(UIActions.SET_FEATURED_APPS, x),
    [UIActions.SET_POPOUT]:({commit}, x) => commit(UIActions.SET_POPOUT, x),
    [UIActions.SET_PORTS]:({commit}, x) => commit(UIActions.SET_PORTS, x),
    [UIActions.SET_SIDEBAR]:({commit}, x) => commit(UIActions.SET_SIDEBAR, x),
    [UIActions.SET_APP_REP]:({commit}, x) => commit(UIActions.SET_APP_REP, x),
    [UIActions.SET_ACTION_REP]:({commit}, x) => commit(UIActions.SET_ACTION_REP, x),
    [UIActions.HIDE_BACK_BTN]:({commit}, x) => commit(UIActions.HIDE_BACK_BTN, x),
    [UIActions.SET_PROCESS]:({commit}, x) => commit(UIActions.SET_PROCESS, x),
    [UIActions.RELEASE_PROCESS]:({commit}, x) => commit(UIActions.RELEASE_PROCESS, x),
    [UIActions.SET_WORKING_SCREEN]:({commit}, x) => commit(UIActions.SET_WORKING_SCREEN, x),
    [UIActions.SET_SEARCH_TERMS]:({commit}, terms) => commit(UIActions.SET_SEARCH_TERMS, terms),
	[Actions.SET_PRICE_DATA]:({commit}, x) => commit(Actions.SET_PRICE_DATA, x),
	[Actions.ADD_RESOURCES]:({commit}, x) => commit(Actions.ADD_RESOURCES, x),
	[Actions.SET_RESOURCES]:({commit}, x) => commit(Actions.SET_RESOURCES, x),
	[Actions.SET_DAPP_DATA]:({commit}, x) => commit(Actions.SET_DAPP_DATA, x),
	[Actions.SET_DAPP_LOGO]:({commit}, x) => commit(Actions.SET_DAPP_LOGO, x),
    [Actions.HOLD_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),

	[UIActions.SET_TESTING_MODE]:({commit}, x) => {
    	window.wallet.storage.setGeneralSetting('testingMode', x);
		commit(UIActions.SET_TESTING_MODE, x)
	},


	// [UIActions.SET_THEME]:({commit}, x) => {
	//     window.localStorage.setItem('theme', x);
	//     setMobileBrowserThemeColor(x);
	//     commit(UIActions.SET_THEME, x);
	// },
	[UIActions.SET_IS_MOBILE]:({commit}, x) => commit(UIActions.SET_IS_MOBILE, x),
	[UIActions.SET_IS_MOBILE_DEVICE]:({commit}, x) => commit(UIActions.SET_IS_MOBILE_DEVICE, x),


	[UIActions.SET_SEED]:({commit}, password) => {

	},

    [Actions.LOAD_SCATTER]:async ({commit, state, dispatch}, forceLocal = false) => {
	    let scatter = await StorageService.getScatter();
	    if (!scatter) return null;

	    scatter = Scatter.fromJson(scatter);
	    commit(Actions.SET_SCATTER, scatter);

	    if(!isPopOut && !migrationChecked){
		    migrationChecked = true;

		    await require('@walletpack/core/migrations/migrator').default(scatter, require('../migrations/version'));

		    // Fixing dangling accounts
		    scatter.keychain.accounts.map(account => {
			    if(
			    	!scatter.keychain.keypairs.find(x => x.unique() === account.keypairUnique) ||
				    !scatter.settings.networks.find(x => x.unique() === account.networkUnique)
			    ) scatter.keychain.removeAccount(account);
		    });

		    scatter.meta.regenerateVersion();
		    commit(Actions.SET_SCATTER, scatter);
	    }

	    return true;
    },

    [UIActions.CREATE_SCATTER]:({state, commit, dispatch}, password) => {
	    return new Promise(async (resolve, reject) => {
		    const scatter = await Scatter.create();
		    scatter.meta.acceptedTerms = true;
		    scatter.onboarded = true;

		    await window.wallet.unlock(password, true);
		    dispatch(Actions.SET_SCATTER, scatter).then(async _scatter => {
		    	// TODO: Mobile unfriendly
			    await BackupService.setDefaultBackupLocation();
			    SingletonService.init();
			    resolve();
		    })
	    })
    },

    [Actions.SET_SCATTER]:async ({commit, state}, scatter) => {
    	if(isPopOut) return state.scatter;
        return new Promise(async resolve => {
	        let updated = await StorageService.setScatter(scatter);
	        if(!updated) return resolve(false);
	        // TODO: Mobile unfriendly
	        BackupService.createAutoBackup();

	        updated = Scatter.fromJson(updated);
            commit(Actions.SET_SCATTER, updated);
            resolve(updated);
        })
    },

    [UIActions.PUSH_POPUP]:({commit}, popup) => commit(UIActions.PUSH_POPUP, popup),
    [UIActions.RELEASE_POPUP]:({commit}, popup) => commit(UIActions.RELEASE_POPUP, popup),
    [UIActions.SET_HARDWARE]:({commit}, hardware) => commit(UIActions.SET_HARDWARE, hardware),
    [UIActions.REMOVE_HARDWARE]:({commit}, key) => commit(UIActions.REMOVE_HARDWARE, key),
    [UIActions.SET_TOKENS]:({commit}, tokens) => commit(UIActions.SET_TOKENS, tokens),
    [Actions.SET_BALANCES]:({commit}, x) => commit(Actions.SET_BALANCES, x),
    [UIActions.SET_FULL_BALANCES]:({commit}, x) => commit(UIActions.SET_FULL_BALANCES, x),
    [Actions.REMOVE_BALANCES]:({commit}, x) => commit(Actions.REMOVE_BALANCES, x),
    [Actions.SET_PRICES]:({commit}, prices) => commit(Actions.SET_PRICES, prices),
    [UIActions.NEW_KEY]:({commit}, x) => commit(UIActions.NEW_KEY, x),
    [UIActions.SET_LANGUAGE]:({commit}, x) => {
	    commit(UIActions.SET_LANGUAGE, x);
	    return StorageService.setTranslation(x);
    },
    [UIActions.LOAD_LANGUAGE]:async ({commit}) => commit(UIActions.SET_LANGUAGE, await StorageService.getTranslation()),
    [Actions.LOAD_HISTORY]:async ({commit}) => {
    	let history = await StorageService.getHistory();
    	if(!history) return;
	    history = history.filter(x => x.txid && x.txid.length)

	    history = history.map(x => {
		    if(x.type === HISTORY_TYPES.Transfer) return HistoricTransfer.fromJson(x);
		    if(x.type === HISTORY_TYPES.Exchange) return HistoricExchange.fromJson(x);
		    if(x.type === HISTORY_TYPES.Action) return HistoricAction.fromJson(x);
		    return null;
	    }).filter(x => x);

    	commit(Actions.LOAD_HISTORY, history);
    },
    [Actions.UPDATE_HISTORY]:async ({dispatch}, x) => {
        await StorageService.updateHistory(x);
        dispatch(Actions.LOAD_HISTORY);
    },
    [Actions.DELTA_HISTORY]:async ({dispatch}, x) => {
        await StorageService.deltaHistory(x);
	    dispatch(Actions.LOAD_HISTORY);
    },

};
