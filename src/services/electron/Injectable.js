export default class Injectable {

	static async appPath(){
		return window.wallet.storage.getDefaultPath();
	}

	static async openLink(link, filepath = false){
		return window.wallet.utility.openLink(link, filepath);
	}

	static async copy(text){
		return window.wallet.utility.copy(text);
	}

}