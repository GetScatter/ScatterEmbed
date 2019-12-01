import {blockchainName, Blockchains, BlockchainsArray} from "@walletpack/core/models/Blockchains";

export const m12_0_0 = async scatter => {

	if(scatter.hasOwnProperty('recurring')) delete scatter.recurring;

	return true;
};
