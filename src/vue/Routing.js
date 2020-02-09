import PopOut from '../views/PopOut';
import Login from '../views/Login';
import Apps from '../views/Apps';
import App from '../views/App';
import Dashboard from '../views/Dashboard';
import Assets from '../views/Assets';
import Wallet from '../views/Wallet';
import Account from '../views/Account';
import Transfer from '../views/Transfer';
import Exchange from '../views/Exchange';
import Receive from '../views/Receive';
import Networks from '../views/Networks';
import Contacts from '../views/Contacts';
import Identities from '../views/Identities';
import Locations from '../views/Locations';
import Histories from '../views/Histories';
import Settings from '../views/Settings';

// const PopOut = () => import('../views/PopOut');
// const Login = () => import('../views/Login');
// const Apps = () => import('../views/Apps');
// const App = () => import('../views/App');
// const Dashboard = () => import('../views/Dashboard');
// const Assets = () => import('../views/Assets');
// const Wallet = () => import('../views/Wallet');
// const Account = () => import('../views/Account');
// const Transfer = () => import('../views/Transfer');
// const Exchange = () => import('../views/Exchange');
// const Receive = () => import('../views/Receive');
// const Networks = () => import('../views/Networks');
// const Contacts = () => import('../views/Contacts');
// const Identities = () => import('../views/Identities');
// const Locations = () => import('../views/Locations');
// const Histories = () => import('../views/Histories');
// const Settings = () => import('../views/Settings');



export const RouteNames = {
	POP_OUT:'popout',

	LOGIN:'login',
	APPS:'apps',
	HOME:'home',
	WALLET:'wallet',
	NETWORKS:'networks',
	ASSETS:'assets',
	TRANSFER:'transfer',
	RECEIVE:'receive',
	EXCHANGE:'exchange',
	CONTACTS:'contacts',
	IDENTITIES:'identities',
	LOCATIONS:'locations',
	HISTORIES:'histories',
	SETTINGS:'settings',


	APP:'app',
	ACCOUNT:'account',
};

const RouteViews = {
	[RouteNames.LOGIN]:Login,
	// [RouteNames.APPS]:Apps,
	[RouteNames.HOME]:Apps,
	[RouteNames.WALLET]:Wallet,
	[RouteNames.NETWORKS]:Networks,
	[RouteNames.ASSETS]:Assets,
	[RouteNames.TRANSFER]:Transfer,
	[RouteNames.RECEIVE]:Receive,
	[RouteNames.EXCHANGE]:Exchange,
	[RouteNames.CONTACTS]:Contacts,
	[RouteNames.IDENTITIES]:Identities,
	[RouteNames.LOCATIONS]:Locations,
	[RouteNames.HISTORIES]:Histories,
	[RouteNames.SETTINGS]:Settings,


	[RouteNames.APP]:App,
	[RouteNames.ACCOUNT]:Account,
	[RouteNames.POP_OUT]:PopOut,
};

const RoutePaths = {
	[RouteNames.HOME]: '/',
	[RouteNames.APP]: '/app/:applink',
	[RouteNames.ACCOUNT]: '/account/:unique',
};

export class Routing {

	static builder(){
		const routeNames = Object.keys(RouteNames).map(key => RouteNames[key]);

		let routesBuilder = {};
		routeNames.map(routeName => {
			routesBuilder[routeName] = {
				path:RoutePaths.hasOwnProperty(routeName) ? RoutePaths[routeName] : `/${routeName}`,
				name:routeName,
				component: RouteViews[routeName]
			}
		});

		return routesBuilder;
	}

	static routes(){
		return Object.keys(Routing.builder())
			.map(routeName => Routing.builder()[routeName]);
	}

	static isRestricted(routeName) {
		return ![
			RouteNames.LOGIN,
			// RouteNames.POP_OUT,
			// RouteNames.LOAD_FROM_BACKUP
		].includes(routeName)
	}

}
