export default class WindowService {

	static async openTools(){
		return window.wallet.utility.openTools();
	}

	static async close(){
		return window.wallet.utility.closeWindow();
	}

	static async flashWindow(){
		return window.wallet.utility.flashWindow();
	}

	static async openPopOut(popup){
		return window.wallet.utility.openPopOut(popup);
	}
}