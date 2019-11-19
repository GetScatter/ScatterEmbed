export default {

	generic:{
		back:`Back`,
		skip:`Skip`,
		next:`Next`,
		confirm:`Confirm`,
		accept:`Accept`,
		allow:`Allow`,
		deny:`Deny`,
		okay:`Okay`,
		cancel:`Cancel`,
		open:`Open`,
		yes:`Yes`,
		no:`No`,
		actions:`Actions`,
		enable:`Enable`,
		disable:`Disable`,
		send:`Send`,
		receive:`Receive`,
		select:`Select`,
		unselect:`Unselect`,
		edit:`Edit`,
		add:`Add`,
		save:`Save`,
		new:`New`,
		delete:`Delete`,
		remove:`Remove`,
		remove_all:`Remove All`,
		copy:`Copy`,
		import:`Import`,
		export:`Export`,
		refresh:`Refresh`,
		manage:`Manage`,
		private_key:`Private Key | Private Keys`,
		public_key:`Public Key | Public Keys`,
		cards:`Card | Cards`,
		expired:`Expired`,
		keys:`Key | Keys`,
		hide:`Hide`,
		reveal:`Reveal`,
		tokens:`Token | Tokens`,
		networks:`Network | Networks`,
		blockchains:`Blockchain | Blockchains`,
		contracts:`Contract | Contracts`,
		memo:`Memo`,
		symbol:`Symbol`,
		decimals:`Decimals`,
		chain_id:`Chain ID`,
		name:`Name`,
		accounts:`Account | Accounts`,
		search:`Search`,
		buy:`Buy`,
		sell:`Sell`,
		contacts:`Contacts`,
		history:`History`,
		exchange:`Exchange`,
		view:`View`,
		redo:`Redo`,
		promoted:`Promoted`,
		addressOrAccount:`Address or account`,
		pleaseWait:`Please wait`,
		selectToken:`Select a token`,
		selectBlockchain:`Select a Blockchain`,
	},

	sidebar:{
		dashboard:`Dashboard`,
		apps:`Apps`,
		wallet:`Wallet`,
		assets:`Assets`,
		identities:`Identities`,
		locations:`Locations`,
		contacts:`Contacts`,
		history:`History`,
		networks:`Networks`,
		settings:`Settings`,
		lock:`Lock Wallet`
	},

	login:{
		registerButtonTitle:`Get Started`,
		registerButtonSubtitle:`Let's get you set up with Scatter`,
		reset:`Reset`,
		restore:`Restore`,
		support:`Support`,
		passwordPlaceholder:`Enter your password`,
	},

	setPassword:{
		title:`Set a strong password`,
		description:`Strong passwords have at least 8 characters and include at least one number and one special character.`,
		choosePass:`Choose a password`,
		confirmPass:`Confirm your password`
	},

	welcome:{
		title:`Welcome to the future`,
		description:`Your Scatter is set up and ready to use.`,
		button:`Start using Scatter`
	},

	destroy:{
		title:`Destroy Scatter`,
		disclaimer:`Before doing this, make sure you have all of your Private Keys backed up.`,
		description:`Destroying your Scatter is irreversible, and you will not be able to restore any data without backups.`
	},

	dashboard:{
		vote:{
			title:`Vote for Scatter`,
			subTitle:`Show us some love!`,
			description:`We've launched an EOS Mainnet Block Producer which you can now vote for. Help us get into a producing position by voting for us.`,
			button:`Vote Now!`,
			voted:`Voted for Scatter on {total} chains. Thanks for your help!`
		}
	},

	apps:{
		explore:`Explore`,
		myApps:`My Apps`,
		allCategories:`All Categories`
	},

	app:{
		loginPermission:`Accounts Provided`,
		accountsProvided:`Accounts provided`,
		requiredFields:`Required Fields`,
		mutableFields:`Mutable Fields`,
		removePermission:`Remove permission`,
		removeIdentity:`Login permissions are what allow applications to interact with your Scatter. You can force a log-out from an application by removing this permission.`,
		removeWhitelist:`Action whitelists make it so you don't have to keep accepting popups to sign transactions. Do you want to remove this whitelist?`,
	},

	wallet:{
		noKeys:{
			title:`You don't have any Keys`,
			description:`Click one of the buttons below to import a key you already have, or generate a brand new one.`
		},

		generateKey:`Generate Key`,
		importKey:`Import Key`,
		addCreditCard:`Add Credit Card`
	},

	account:{
		totalFiatBalance:`Total Fiat Balance`,
		actions:{
			unlink_account:`Unlink Account`,
			change_permissions:`Change Permissions`,
			proxy_vote:`Proxy Vote`,
			create_account:`Create Account`,
		}
	},

	assets:{
		noAccounts:`No Accounts`
	},

	histories:{
		sent:`Sent`,
		received:`Received`,
		networkDisabled:`Network disabled`,

		clear:{
			title:`Clearing history`,
			description:`You are about to erase your entire local history. This will not erase keys or accounts.`,
		}
	},

	identities:{
		identities:`Identities`,

		id:{
			nameLabel:`Identity Name / Username`,
			namePlaceholder:`Your online presence`,
			nameError:`The Identity Name name can not be empty, have any spaces in it, or special characters.`
		},

		personal:{
			nameLabel:`Full Name`,
			namePlaceholder:`Enter your full name`,
			emailLabel:`Email`,
			dobLabel:`Date of birth`,
		},

		location:{
			title:`Location`,
			noneSelected:`None selected`
		},

		auth:{
			title:`Authentication Key`,
			description:`Make sure you save a copy of this authentication key, you will need it to regain access to certain applications that require it.`,
			changeButton:`Change / View`
		},

		removing:{
			title:`Removing Identity`,
			description:`Are you sure you want to remove {identity}`
		}
	},

	locations:{
		locations:`Locations`,
		nameLabel:`Location Name`,
		namePlaceholder:`Home, Office, etc`,
		countryLabel:`Country`,
		countryItemNone:`None`,
		addressLabel:`Address`,
		cityLabel:`City`,
		stateLabel:`State`,
		phoneLabel:`Phone number`,
	},

	networks:{
		connectionError:`Connection error!`
	},


	settings:{
		menu:{
			general:`General`,
			tokens:`Tokens`,
			explorers:`Explorers`,
			backup:`Backups`,
			firewall:`Firewall`,
			password:`Password`,
			destroy:`Reset`
		},

		base:{
			basics:`Basics`,
			secure:`Secure Settings`
		},

		general:{
			version:`Version`,
			language:`Language`,
			simpleMode:`Simple Mode`,
			simpleModeDescription:`Simple Mode is aimed at everyday users, while Advanced Mode (the one you are currently on) is aimed at very technical users, and developers.`,
			notifications:`Whitelist Notifications`,
			notificationsDescription:`These notifications appear on certain operating systems when you auto-sign whitelisted transactions.`,
			ports:`Open Ports`,
			portsDescription:`These are the ports open on your local machine that other local applications can use to contact Scatter.`,
			noPorts:`There are no open ports!`,
			dataPath:`Data File Location`,
			dataPathDescription:`The location on your computer that Scatter saves its encrypted data to.`,
			devConsole:`Developer Console`,
			devConsoleDescription:`Sometimes you might need to see if Scatter is throwing any errors.`,
			devConsoleButton:`Open Console`,
		},

		backup:{
			title:`Configure Backups`,
			description:`Backups allow you to save the state of your entire Scatter including all keys, permissions and settings.`,
			autobackup:`Select auto-backup location`,
			create:`Create backup`,
			currentFolder:`Current backup folder`,
			created:`Backup Created!`
		},

		destroy:{
			title:`Destroy Scatter`,
			description:`Destroying your Scatter will remove all your data including your identities and Keypair configurations from your local machine. It will not delete your blockchain accounts from the actual blockchain.`,
			important:`MAKE SURE YOU HAVE A BACKUP BEFORE YOU DO THIS!`,
			button:`Destroy Scatter`
		},

		firewall:{
			ridl:{
				title:`Decentralized Firewall`,
				description:`RIDL Defender is Scatter's proprietary decentralized firewall system. It helps protect you from malicious websites, applications, and accounts.`,
			},

			blocker:{
				title:`Restriction Contract Actions`,
				description:`These actions will not be allowed from external applications.`,
				blacklisted:`Blacklisted actions`
			}

		},

		password:{
			title:`Change your Password`,
			description:`Changing your password periodically is very healthy. We often use the same passwords in multiple places, which leads to a larger possibility for them to be discovered.`,
			button:`Change Password`,
			changed:`Password Changed!`,

			pin:{
				title:`Change your PIN`,
				description:`If enabled, your PIN is a secondary password which is required each time you do a non-whitelisted action. Do not make this the same as your password.`,
				disabled:`PIN Disabled`,
				changed:'PIN Changed!',
				pinForAllTitle:`Use PIN for external application interactions.`,
				pinForAllDescription:`If you enable this you will also need to enter your PIN for every popup that an external app makes. Otherwise, your PIN will only be required for internal Scatter actions like transfer and exchange.`,
			}
		},

		tokens:{
			switch:{
				add:`Add Token`,
				whitelist:`Tokens`,
				blacklist:`Filtered Out`,
				settings:`Settings`
			},

			whitelistButton:`Whitelist Token`,
			blacklistButton:`Blacklist Token`,

			hidePrimaryBalance:`Hide primary balance`,
			hidePrimaryBalanceDescription:`Allows you to hide your balance in the quick-actions bar.`,
			filterSmallBalances:`Filter Small Balances`,
			filterSmallBalancesDescription:`If you want to always filter out tokens with small balances you can set a modifier here.`,

			noTokens:`No tokens`

		}

	},

	receive:{
		receiver:`Receiving Account`,
		sendTo:`Send funds to`,
		forEosio:`Some exchanges will ask you for an addressTag, memo, or some other form of secondary input. You can enter anything in that field since this is a real EOSIO account.`
	},

	exchange:{
		fromAndToken:`From & Token`,
		priceNotAvailable:`Price not available`,
		loadingPairs:`Loading pairs`,
		noPairs:`No pairs available`,
		loadingRate:`Loading rate`,
		errorTitle:`Exchange Error`,
		errorDescription:`Can't connect to the Exchange API.`
	},

	transfer:{
		sender:`Sending from`,
		receiver:`Sending to`,
		amountTitle:`Amount & Details`,
		priceNotAvailable:`Price not available`,
		memo:`Memo (optional)`,
		loadingBalances:`Your balances aren't finished loading yet.`,
	},


	// COMPONENTS ----------------------------

	editNetwork:{
		systemToken:`System Token`,
		memorableName:`Add a memorable name`,
		host:`Host`,
		protocol:`Protocol`,
		port:`Port`,
		chainIdTooltip:`Fetch Chain ID`,
		update:`Update details`,

		systemTokenTitle:`Network System Token`,
		systemTokenDescription:`Some networks use a custom system token instead of the default system token (like ETH, EOS, or TRX).`
	},

	keysAndAccountsList:{
		actions:{
			editName:`Edit Name`,
			copyPublicKey:`Copy Public Key`,
			refreshAccounts:`Refresh Accounts`,
			convertBlockchain:`Convert Blockchain`,
			removeKey:`Remove Key`,
			linkAccount:`Link Account`,
		},

		noAccounts:{
			title:`You don't have any accounts linked to this key.`,
			requiresPayment:`{blockchain} blockchains require that you pay a small fee to create accounts.`,
			checkEnabled:`Make sure that you have a network for the {blockchain} blockchain enabled.`,
			createAccountButton:`Create one now!`
		},

		linkedAccounts:`Linked Accounts`,

		changeKeypairNameTitle:`Change Keypair Name`,
		changeKeypairNameDescription:`A keypair's name is only for organizational purposes. It has no effect on the blockchain or the key itself.`,
	},

	panels:{
		keypair:{
			selectHardware:`Select a hardware wallet`,
			availableHardwareChains:`Available Blockchains`,
			hardwareIndex:`Key/Address Index`,
			importTextKeyTitle:`Import your Private Key`,
			importTextKeyDescription:`Your private key never leaves your device. We only use this to sign transactions and nobody will have access to it but you. Please remember that though Scatter is a good place to keep your key, you should always have a backup of it somewhere offline.`,
			validTextKeyWarn:`Once you input a valid key, it will automatically import it.`,
			scanQR:`Scan a QR code`,
		}
	},


	// ---------------------------------------
	popins:{
		fullscreen:{
			addCustomNetwork:`Add Custom Network`,
			addNewContact:`Add New Contact`,
			changeIdentityKey:`Identity Authentication Key`,
			generateRandomKey:`Generate random key`,
			saveIdentityKey:`Save new Identity key`,
			checkHardwareTitle:`Check Hardware`,
			checkHardwareDescription:`You should see a confirmation on your hardware device.`,
			confirmPassword:`Confirm Password`,
			securityCode:`Enter Security Code`,

			changePermissions:{
				title:`Changing Account Keys`,
				disclaimer:`This can be dangerous!`,
				disclaimerDescription:`You are about to change the keys that control this account. Make sure you know what you are doing.`,
				owner:`Owner / Master key`,
				active:`Active / Daily key`,
				dontChange:`Leave as is`
			},

			createAccount:{
				title:`Create Account`,
				exchangeDescription:`You can send funds from an exchange or another wallet to create your account.`,
				cardDescription:`This option is currently disabled.`,
				startTyping:`Start typing in a name to see if it is available.`,
				includeMemo:`Make sure you include this memo when you send it or your funds will be lost!`,
				clickAfter:`Click after transfer`,
				lookingTitle:`Looking for account`,
				lookingDescription:`Scatter will continuously look for the account being created for the next 30 minutes. Once it is found it will automatically be added to your Scatter.`,
				exchangeErrorTitle:`Exchange account creation error.`,
				exchangeErrorDescription:`30 minutes have passed since you sent money from your exchange. It looks like an account still hasn't been created. You should check the status of the transaction in the exchange.`,
				accountFoundTitle:`Account found!`,
				accountFoundDescription:`Scatter found the account you created using an exchange. You can now see it in your wallet.`,
				nameTooShort:`Account name must be 12 characters long.`,
				nameFormatting:`Account name must be lowercase letters only.`,
				checkingName:`Checking if name is available...`,
				nameTaken:`This name is already taken`,
			},

			moderateCpu:{
				available:`Available {token}`,
				reclaiming:`Reclaiming {token}`,
				stake:`Stake`,
				unstake:`Unstake`
			},

			moderateRam:{
				type:`Type`,
				bytesError:`Bytes must be over 15`
			},

			exportKey:{
				title:`Exporting Private Key`,
				disclaimer:`Keep your private keys safe!`,
				description:`Always export your private keys and make sure you have a backup of them. You will not be able to recover your tokens if you lose it.`,
				keyTitle:`Key`,
				keyDescription:`Export this Private Key as text`,
				qrTitle:`Paper Wallet`,
				qrDescription:`Export this Private Key as an encrypted QR code`,
				privateKeyAsText:`Private Key as Text`,
				privateKeyAsQR:`QR Code Paper Wallet`,
				savedImage:`Saved Image!`,
			},

			generateKey:{
				title:`Generate Keypair`,
			},

			importBackup:{
				title:`Restore from backup`,
				description:`If you have a backup for your Scatter you can import it here by loading it into Scatter. You will still need the password to unlock it.`,
				buttonTitle:`Select a backup file`,
				buttonDescription:`These will end with .json or .txt`,
				errorParsing:`There was an error parsing this backup`,
				errorDecrypting:`There was an error decrypting this backup`,
				errorReading:`This backup file could not be read`,
			},

			importKeypair:{
				title:`Import Keypair`,
				text:`Text`,
				hardware:`Hardware`,
				qrCode:`QR Code`,
				invalidPrivateKey:`Invalid private key`,
			},

			removeKeypair:{
				title:`Removing Key`,
				permanent:`This action is permanent`,
				removesAll:`Removing keys also removes all of its linked accounts and their respective permissions. Once you remove a key it can not be regenerated.`,

			},

			unlinkAccount:{
				title:`Unlinking Account`,
				description:`Removing a linked account also removes all of its application permissions.`,
				disclaimer:`This will NOT remove the account from the blockchain, only Scatter.`,
			}

		},

		overlay:{
			exchanging:`Exchanging`,
			transferring:`Transferring`,
			confirmPin:`Confirm PIN`,
			selectAccount:`Select Account`,
			selectBlockchain:`Select Blockchain`,
			selectDisplayToken:`Select Display Token`,
			selectFiatCurrency:`Select a fiat currency`,
			selectBlockchainToken:`Select a blockchain token`,
			selectPublicKey:`Select Public Key`,
			selectRecipient:`Select Recipient`,
			selectToken:`Select Token`,
			allBlockchains:`All Blockchains`,
			selectTokenAndAccount:`Select Token and Account`,
			transactionSuccess:`Transaction Success!`,
			viewTransactionOn:`Click link below to view on {explorer}`,

			enableSimpleMode:{
				// TODO:
			},

			enterPin:{

			},

			linkAccount:{
				title:`Link EOSIO Account`,
				description:`This allows you to link accounts on networks that you either can't reach or don't have history plugins enabled.`,
				selectNetwork:`Select a Network`,
				button:`Link`,
				noNetworksAvailable:`No EOSIO networks available!`,
			}
		},
	},

	// ---------------------------------------
	popouts:{
		popoutApp:{
			noImage:`No Image`,
			reputation:{
				unknown:`Unknown Reputation`,
				trusty:`Trustworthy`,
				scam:`Known Scam`
			}
		},

		requiredFields:{
			title:`Required Identity Fields`,
			personalInformation:`Personal information:`
		},

		login: {
			suffix:`will see:`,
			dangerousPermission:`You are signing in with your Owner permission. This is dangerous.`,
			allAccountsFor:`All accounts for:`,
			allAccountsDescription:`{app} is requesting to view every account for a specified network. This means that it will be able to request transaction signatures for any account that you have linked to any of the requested networks.`,
			noInfoNeededTitle:`This application isn't requesting any personal information or accounts.`,
			noInfoNeededDescription:`The only information this application will receive is basic Identity information like your username.`,
			noAccountsTitle:`You don't have accounts for this network`,
			noAccountsDescription:`You need to create an account before being able to use apps.`,
			personalInformation:`Personal information:`,
			requestingPersonalInformation:`{app} is requesting personal information. It will only be able to see what is being requested, and nothing else you may have filled out in your Scatter identity.`,
		},

		getPublicKey:{
			suffix:`wants you to provide a public key`,
			select:`Select a key`,
			generate:`Generate a new key`,
		},

		linkApp:{
			suffix:`is relinking`,
			description:`Make sure the application name is an application you are interacting with right now. If it isn't it could be a dangerous application trying to act like a different one.`
		},

		transferRequest:{
			suffix:`is requesting a transfer`,
			selectAccount:`Select Account`,
		},

		updateIdentity:{
			suffix:`wants to`,
			changeName:`Change your identity name`,
			addKycProofs:`Add KYC proofs`,
		},

		signature:{
			moreAccounts:`more accounts`,
			keysInvolved:`Keys involved`,
			accountsInvolved:`Accounts involved`,
			previouslyWhitelisted:`This action was previously whitelisted`,
			hiddenAction:`Action is hidden`,
			dangerous:`One or more of the actions you are about to sign is dangerous!`,
			dangerousAction:`This action is dangerous!`,
			dangerousTooltip:`This action is dangerous. Accepting it will change your keys and possibly give your account to someone else. Check to make sure the keys are correct.`,
			whitelistThis:`You can whitelist this so that you don't have to keep re-accepting this transaction.`,
			whitelistExplainer:`Checkboxes that are checked can have their values changed without breaking the whitelist.`,
			actionsTotal:`{x} actions in total`
		},
	},

	// ---------------------------------------
	errors:{
		badPassword:`Bad Password`,
		passwordConfirmation:`Password confirmation does not match password`,
		keypairExists:`A keypair with that name or public key already exists`,
		transferError:`An error occurred while trying to transfer tokens`,
		badQrDecryption:`There was an error decrypting this QR. Are you sure the password for this QR code is correct?`
	}
}
