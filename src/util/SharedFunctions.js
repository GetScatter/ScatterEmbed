import StoreService from '@walletpack/core/services/utility/StoreService'
import {dateId} from "@walletpack/core/util/DateHelpers";

export default class SharedFunctions {

	static change(token, numOnly = false){
		const priceData = StoreService.get().state.priceData;
		const dummy = {plus:false, perc:'0%'};
		if(!priceData || !priceData.hasOwnProperty('today')) return dummy;
		if(token.unusable) return dummy;
		const hour = priceData.today.latest;
		const totaled = SharedFunctions.getTokensTotaled();
		const latest = totaled[totaled.length-1] ? totaled[totaled.length-1].data : null;
		const earliest = totaled[0] ? totaled[0].data : null;
		if(!latest || !earliest || !latest[token.uniqueWithChain()] || !earliest[token.uniqueWithChain()]) return '--';
		const diff = earliest[token.uniqueWithChain()] - latest[token.uniqueWithChain()];
		const change = (diff / earliest[token.uniqueWithChain()]) * 100;
		if(numOnly) return Math.abs(parseFloat(change).toFixed(2));
		const symbol = change > 0 ? '-' : '+';
		return {plus:change <= 0, perc:`${symbol}${Math.abs(parseFloat(change).toFixed(2))}%`};
	}

	static getTokensTotaled(){
		const priceData = StoreService.get().state.priceData;
		if(!priceData || !priceData.hasOwnProperty('yesterday')) return [];
		let totaled = [];
		Object.keys(priceData.yesterday).filter(x => x !== 'latest').sort((a,b) => a - b).map(hour =>
			totaled.push({hour, data:priceData.yesterday[hour], date:dateId(1)}));
		Object.keys(priceData.today).filter(x => x !== 'latest').sort((a,b) => a - b).map(hour =>
			totaled.push({hour, data:priceData.today[hour], date:dateId()}));
		totaled = totaled.slice(totaled.length-(totaled.length > 24 ? 24 : totaled.length), totaled.length);
		return totaled;
	}

	static publicKeyForKeypair(keypair){
		if(!keypair) return null;
		if(!keypair.hasOwnProperty('publicKeys')) return null;
		return keypair.enabledKey().key;
	}

}
