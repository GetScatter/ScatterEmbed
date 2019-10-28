import * as Actions from '@walletpack/core/store/constants';
import AccountService from "@walletpack/core/services/blockchain/AccountService";
import PriceService from "@walletpack/core/services/apis/PriceService";
import PermissionService from "@walletpack/core/services/apps/PermissionService";
import SocketService from "@walletpack/core/services/utility/SocketService";
import AppsService from "@walletpack/core/services/apps/AppsService";
import PluginRepository from "@walletpack/core/plugins/PluginRepository";
import { Blockchains } from "@walletpack/core/models/Blockchains";
import RecurringService from "./RecurringService";

import {store} from "../../store/store";
import * as UIActions from "../../store/ui_actions";
import {GET} from "@walletpack/core/services/apis/BackendApiService";

let initialized = false;
export default class SingletonService {
	static async init() {
		if (initialized) return true;
		initialized = true;

		// Gives priority to UI rendering first.
		setTimeout(async () => {
			PluginRepository.plugin(Blockchains.TRX).init();
			SocketService.initialize();

			store.dispatch(Actions.LOAD_HISTORY);
			store.dispatch(UIActions.SET_TOKEN_METAS, await GET('tokenmeta'));
			// store.dispatch(Actions.LOAD_LANGUAGE);

			AppsService.getApps();
			PriceService.watchPrices();
			PriceService.loadPriceTimelineData();
			PermissionService.removeDanglingPermissions();
			AccountService.fixOrphanedAccounts();
			RecurringService.checkProxies();
		});

		return true;
	}

}
