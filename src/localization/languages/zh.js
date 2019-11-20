export default {

	generic:{
		back:`返回`,
		skip:`跳过`,
		next:`下一步`,
		confirm:`确认`,
		accept:`接受`,
		allow:`允许`,
		deny:`拒绝`,
		okay:`我知道了`,
		cancel:`取消`,
		open:`打开`,
		yes:`是`,
		no:`不是`,
		actions:`操作`,
		enable:`启用`,
		disable:`禁用`,
		send:`转账`,
		receive:`收款`,
		select:`选择`,
		unselect:`取消选择`,
		edit:`编辑`,
		add:`添加`,
		save:`保持`,
		new:`新加`,
		delete:`删除`,
		remove:`清除`,
		remove_all:`全部清除`,
		copy:`复制`,
		import:`导入`,
		export:`导出`,
		refresh:`刷新`,
		manage:`管理`,
		private_key:`私钥`,
		public_key:`公钥`,
		cards:`银行卡`,
		expired:`已过期`,
		keys:`密钥`,
		hide:`隐藏`,
		reveal:`展示`,
		tokens:`代币`,
		networks:`网络`,
		blockchains:`区块链`,
		contracts:`合约`,
		memo:`Memo`,
		symbol:`符号`,
		decimals:`小数`,
		chain_id:`Chain ID`,
		name:`名字`,
		accounts:`账号`,
		search:`搜索`,
		buy:`购买`,
		sell:`出售`,
		contacts:`联络人`,
		history:`历史`,
		exchange:`交易所`,
		view:`查看`,
		redo:`重做`,
		promoted:`晋升`,
		addressOrAccount:`地址或账号`,
		pleaseWait:`请稍等`,
		selectToken:`选择一种代币`,
		selectBlockchain:`选择区块链`,
	},

	sidebar:{
		dashboard:`仪表板`,
		apps:`程序`,
		wallet:`钱包`,
		assets:`资产`,
		identities:`身份`,
		locations:`位置`,
		contacts:`联络人`,
		history:`历史`,
		networks:`网络`,
		settings:`设置`,
		lock:`锁上钱包`
	},

	login:{
		registerButtonTitle:`开始使用`,
		registerButtonSubtitle:`设置您的Scatter`,
		reset:`重设`,
		restore:`恢复`,
		support:`支持`,
		passwordPlaceholder:`输入您的密码`,
	},

	setPassword:{
		title:`设置复杂的密码`,
		description:`复杂的密码至少包含8个字符，并且至少包含一个数字和一个特殊字符。`,
		choosePass:`选择一个密码`,
		confirmPass:`确认您的密码`
	},

	welcome:{
		title:`欢迎来到未来`,
		description:`您的Scatter已设置好并可被使用。`,
		button:`开始使用Scatter`
	},

	destroy:{
		title:`销毁Scatter`,
		disclaimer:`在执行此操作之前，请确保已备份所有私钥。`,
		description:`销毁Scatter此操作是不可逆的，如无事先备份，您将无法还原任何数据。`
	},

	dashboard:{
		vote:{
			title:`投票给Scatter`,
			subTitle:`向我们展示您对我们的爱戴!`,
			description:`您可投票给我们在EOS主网上的区块生产候选者。通过投票帮助我们入围成为区块生产者.`,
			button:`立即投票!`,
			voted:`在{total}链条上投票给Scatter。谢谢您的帮助!`
		}
	},

	apps:{
		explore:`探索`,
		myApps:`我的应用程序`,
		allCategories:`所有类别`
	},

	app:{
		loginPermission:`已提供账户`,
		accountsProvided:`已提供账户`,
		requiredFields:`必填事项`,
		mutableFields:`可变事项`,
		removePermission:`删除权限`,
		removeIdentity:`登录权限是允许应用程序与您的Scatter进行交互的权限。您可以通过删除此权限来强制登出某个应用程。`,
		removeWhitelist:`白名单使您无需接受弹出窗口来签署交易。您确定要删除此白名单吗？`,
	},

	wallet:{
		noKeys:{
			title:`您没有任何密钥`,
			description:`单击下面的按钮之一，以导入您现有的私钥，或生成一个全新的私钥。`
		},

		generateKey:`生成密钥`,
		importKey:`导入密钥`,
		addCreditCard:`添加信用卡`
	},

	account:{
		totalFiatBalance:`法币总余额`,
		actions:{
			unlink_account:`取消帐户关联`,
			change_permissions:`变更权限`,
			proxy_vote:`代理投票`,
			create_account:`创建帐号`,
		}
	},

	assets:{
		noAccounts:`没有帐号`
	},

	histories:{
		sent:`转账`,
		received:`收款`,
		networkDisabled:`网路已停用`,

		clear:{
			title:`清除历史记录`,
			description:`您将删除所有本地历史记录。此操作不会删除密钥或帐户。`,
		}
	},

	identities:{
		identities:`身份`,

		id:{
			nameLabel:`身份名称/用户名称`,
			namePlaceholder:`您在线的称呼`,
			nameError:`必须有身份名称，名称不能含有空格或特殊字符`
		},

		personal:{
			nameLabel:`全名`,
			namePlaceholder:`输入您的全名`,
			emailLabel:`电子邮件`,
			dobLabel:`生日日期`,
		},

		location:{
			title:`位置`,
			noneSelected:`未选择`
		},

		auth:{
			title:`认证密钥`,
			description:`确保您已备份并安全储存此认证密钥，您将需要此认证密钥来重新访问某些应用程序。`,
			changeButton:`变更 / 查看`
		},

		removing:{
			title:`删除身份`,
			description:`您确定您要删除 {identity}吗？`
		}
	},

	locations:{
		locations:`位置`,
		nameLabel:`位置名称`,
		namePlaceholder:`住家, 办公室, 或其他`,
		countryLabel:`国家`,
		countryItemNone:`没有`,
		addressLabel:`地址`,
		cityLabel:`城市`,
		stateLabel:`州属`,
		phoneLabel:`电话号码`,
	},

	networks:{
		connectionError:`连接错误!`
	},


	settings:{
		menu:{
			general:`一般事项`,
			tokens:`代币`,
			explorers:`浏览器`,
			backup:`备份文件`,
			firewall:`防火墙`,
			password:`密码`,
			destroy:`重设`
		},

		base:{
			basics:`基本`,
			secure:`安全设定`
		},

		general:{
			version:`版本`,
			language:`語言`,
			simpleMode:`简单模式`,
			simpleModeDescription:`“简单模式”适合一般用户，而“高级模式”（您当前使用的模式）则适合有技术经验的用户或开发人员。`,
			notifications:`白名单通知`,
			notificationsDescription:`当您对白名单交易进行自动签名时，这些通知会显示在某些操作系统上。`,
			ports:`开放端口`,
			portsDescription:`这些是您本地计算机上开放的端口，其他本地应用程序可以使用这些端口联系Scatter。`,
			noPorts:`暂无开放的端口!`,
			dataPath:`数据文件位置`,
			dataPathDescription:`Scatter将加密数据保存到您计算机上的位置。`,
			devConsole:`开发者控制台`,
			devConsoleDescription:`有时您可能需要查看Scatter是否有任何错误。`,
			devConsoleButton:`打开控制台`,
		},

		backup:{
			title:`配置备份`,
			description:`通过备份，您可以保存您Scatter的状态，包括所有键，权限和设置。`,
			autobackup:`选择自动备份位置`,
			create:`创建备份`,
			currentFolder:`当前备份文件夹`,
			created:`已创建备份!`
		},

		destroy:{
			title:`销毁Scatter`,
			description:`销毁Scatter会从您本地计算机上删除所有保存的数据，包括身份和密钥对配置。此操作不会在区块链上删除您的区块链账户。`,
			important:`在执行此操作之前，请确保您已进行了备份!`,
			button:`销毁Scatter`
		},

		firewall:{
			ridl:{
				title:`分散式防火墙`,
				description:`RIDL防守者是Scatter的专有分散式防火墙系统。它有助于保护您免受恶意网站，应用程序和帐户的侵害。`,
			},

			blocker:{
				title:`限制合同操作`,
				description:`外部应用程序将不允许这些操作`,
				blacklisted:`列入黑名单的操作`
			}

		},

		password:{
			title:`更改您的密码`,
			description:`我们鼓励您定期更改您密码。用户往往会在在多个地方使用相同的登入密码，从而使得该密码被发现的可能性变大。`,
			button:`更改密码`,
			changed:`密码已更改!`,

			pin:{
				title:`更改您的PIN码`,
				description:`若启用，PIN码则是您在执行非白名单操作时需要输入的密码。请勿将此PIN码设置为您的密码。`,
				disabled:`已停用PIN码`,
				changed:'已更改PIN码!',
				pinForAllTitle:`使用PIN码进行外部应用程序交互。`,
				pinForAllDescription:`如果启用此功能，则还需要为外部应用程序产生的每个弹出窗口输入PIN码。否则，只有Scatter内部散操作（例如转账或代币兑换）才需要输入您的PIN码。`,
			}
		},

		tokens:{
			switch:{
				add:`添加代币`,
				whitelist:`代币`,
				blacklist:`过滤`,
				settings:`设置`
			},

			whitelistButton:`白名单代币`,
			blacklistButton:`黑名单代币`,

			hidePrimaryBalance:`隐藏余额`,
			hidePrimaryBalanceDescription:`使您可以在快速操作栏中隐藏余额。`,
			filterSmallBalances:`过滤小余额`,
			filterSmallBalancesDescription:`如果您想过滤掉小余额的代币，可以在此处设置。`,

			noTokens:`无代币`

		}

	},

	receive:{
		receiver:`收款账号`,
		sendTo:`汇款至`,
		forEosio:`一些交易所会要求您提供addressTag，memo或其他形式的辅助输入。您可以在该字段中输入任何内容，因为这是真实的EOSIO帐户。`
	},

	exchange:{
		fromAndToken:`从 & 代币`,
		priceNotAvailable:`无法显示价格`,
		loadingPairs:`加载配对中`,
		noPairs:`没有可用的配对`,
		loadingRate:`加载汇率中`,
		errorTitle:`兑换错误`,
		errorDescription:`无法连接到交易所的API.`
	},

	transfer:{
		sender:`发送自`,
		receiver:`发送至`,
		amountTitle:`金额和明细`,
		priceNotAvailable:`暂无价格`,
		memo:`Memo (可选)`,
		loadingBalances:`您的余额尚未加载完毕`,
	},


// COMPONENTS ----------------------------

	editNetwork:{
		systemToken:`系统代币`,
		memorableName:`添加一个易记名字`,
		host:`Host`,
		protocol:`协议`,
		port:`端口`,
		chainIdTooltip:`获取链ID`,
		update:`更新详细信息`,

		systemTokenTitle:`网络系统代币`,
		systemTokenDescription:`某些网络使用自定义系统代币而不是默认系统代币（例如ETH，EOS或TRX）。`
	},

	keysAndAccountsList:{
		actions:{
			editName:`编辑名称`,
			copyPublicKey:`复制公钥`,
			refreshAccounts:`刷新账户`,
			convertBlockchain:`更换区块链`,
			removeKey:`删除密钥`,
			linkAccount:`连接帐户`,
		},

		noAccounts:{
			title:`您没有任何与此密钥连接的帐户`,
			requiresPayment:`{blockchain} 区块链要求您支付小额费用才能创建帐户。`,
			checkEnabled:`确保您已经为{blockchain}区块链启用了网络。`,
			createAccountButton:`立即创建!`
		},

		linkedAccounts:`连接账户`,

		changeKeypairNameTitle:`更改密钥配对名称`,
		changeKeypairNameDescription:`密钥配对的名称仅用于组织目的。它对区块链或密钥本身没有影响。`,
	},

	panels:{
		keypair:{
			selectHardware:`选择一个硬件钱包`,
			availableHardwareChains:`可选区块链`,
			hardwareIndex:`密钥/地址指标`,
			importTextKeyTitle:`导入您的私钥`,
			importTextKeyDescription:`您的私钥永远不会离开您的设备。我们仅使用它来签署交易，除了您之外，没有人可以访问它。请记住，尽管Scatter是保留密钥的好地方，但您始终应该在离线状态下对其进行备份。`,
			validTextKeyWarn:`输入有效密钥后，它将自动导入。`,
			scanQR:`扫描二维码`,
		}
	},


// ---------------------------------------
	popins:{
		fullscreen:{
			addCustomNetwork:`添加自定义网络`,
			addNewContact:`添加新联系人`,
			changeIdentityKey:`身份验证密钥`,
			generateRandomKey:`生成随机密钥`,
			saveIdentityKey:`保存新的身份密钥`,
			checkHardwareTitle:`检查硬件`,
			checkHardwareDescription:`您应该在硬件设备上看到确认信息`,
			confirmPassword:`确认密码`,
			securityCode:`输入安全码`,

			changePermissions:{
				title:`更改帐户密钥`,
				disclaimer:`此操作可能危险`,
				disclaimerDescription:`您将要更改控制此帐户的密钥。确保您知道自己在做什么`,
				owner:`所有者/主密钥`,
				active:`活动/每日密钥`,
				dontChange:`保持原样`
			},

			createAccount:{
				title:`创建帐号`,
				exchangeDescription:`您可以从交易所或其他钱包汇款以创建您的帐户。`,
				cardDescription:`该选项当前被禁用。`,
				startTyping:`输入名称以查看是否可用。`,
				includeMemo:`请确保在汇款时填写此memo，否则您的资金将会丢失！`,
				clickAfter:`汇款后点击此处`,
				lookingTitle:`寻找帐户`,
				lookingDescription:`所创建的帐户会在30分钟内自动添加到您的Scatter中。`,
				exchangeErrorTitle:`帐户创建错误`,
				exchangeErrorDescription:`从您汇出汇款至今已过了30分钟。您的账号似乎尚未创建。请查看您交易所转出交易的状态。`,
				accountFoundTitle:`找到帐号!`,
				accountFoundDescription:`Scatter已找到了您使用交易所创建的帐户。您现在可以在钱包中看到它。`,
				nameTooShort:`帐户名称必须为12个字符长。`,
				nameFormatting:`帐户名只能是小写字母。`,
				checkingName:`正在检查该名称是否可用..`,
				nameTaken:`此名称已经被使用了`,
			},

			moderateCpu:{
				available:`可用 {token}`,
				reclaiming:`赎回中 {token}`,
				stake:`质押`,
				unstake:`解除质押`
			},

			moderateRam:{
				type:`类型`,
				bytesError:`必须超过15字节数`
			},

			exportKey:{
				title:`导出私钥`,
				disclaimer:`请妥善保管您的私钥！`,
				description:`请记得导出您的私钥，并备份。若丢失了，您将无法恢复此账号。`,
				keyTitle:`密钥`,
				keyDescription:`将此私钥导出为文本`,
				qrTitle:`钱包`,
				qrDescription:`将此私钥导出为加密的QR码`,
				privateKeyAsText:`私钥作为文本`,
				privateKeyAsQR:`QR码纸钱包`,
				savedImage:`已保存图像!`,
			},

			generateKey:{
				title:`生成密钥对`,
			},

			importBackup:{
				title:`从备份还原`,
				description:`如果您有Scatter的备份档案，则可以通过将其加载到Scatter中将其导入此处。您仍然需要密码才能解锁。`,
				buttonTitle:`选择备份文件`,
				buttonDescription:`该文档的名字将以.json或.txt结尾`,
				errorParsing:`解析此备份时出错`,
				errorDecrypting:`解密此备份时出错`,
				errorReading:`无法读取备份文件`,
			},

			importKeypair:{
				title:`导入密钥对`,
				text:`文本`,
				hardware:`硬件`,
				qrCode:`二维码`,
				invalidPrivateKey:`私钥无效`,
			},

			removeKeypair:{
				title:`删除密钥`,
				permanent:`此操作是永久性的`,
				removesAll:`删除密钥还会删除其所有链接帐户及其各自的权限。删除密钥后，将无法重新生成它。`,

			},

			unlinkAccount:{
				title:`取消帐户连接`,
				description:`取消链接的帐户也会删除其所有应用程序权限。`,
				disclaimer:`此操作不会从区块链中删除该帐户，而只会从Scatter删除该帐户。`,
			}

		},

		overlay:{
			exchanging:`兑换中`,
			transferring:`转移中`,
			confirmPin:`确认PIN码`,
			selectAccount:`选择帐户`,
			selectBlockchain:`选择区块链`,
			selectDisplayToken:`选择显示代币`,
			selectFiatCurrency:`选择法定货币`,
			selectBlockchainToken:`选择区块链代币`,
			selectPublicKey:`选择公钥`,
			selectRecipient:`选择收款人`,
			selectToken:`选择代币`,
			allBlockchains:`所有区块链`,
			selectTokenAndAccount:`选择代币和账号`,
			transactionSuccess:`交易成功!`,
			viewTransactionOn:`点击下面的链接以查看 {explorer}`,

			enableSimpleMode:{
				// TODO:
			},

			enterPin:{

			},

			linkAccount:{
				title:`链接EOSIO帐户`,
				description:`这使您可以在无法访问或未启用历史记录插件的网络上链接帐户`,
				selectNetwork:`选择网络`,
				button:`链接`,
				noNetworksAvailable:`无可用的EOSIO网络!`,
			}
		},
	},

// ---------------------------------------
	popouts:{
		popoutApp:{
			noImage:`没有图像`,
			reputation:{
				unknown:`未知声誉`,
				trusty:`值得信赖`,
				scam:`已知骗局`
			}
		},

		requiredFields:{
			title:`必填身份字段`,
			personalInformation:`个人信息：`
		},

		login: {
			suffix:`will see:`,
			dangerousPermission:`您正在使用所有者权限登录。这很危险。`,
			allAccountsFor:`所有帐户：`,
			allAccountsDescription:`{app}要求查看指定网络的每个帐户。这意味着它将能够为您已链接到任何请求的网络的任何帐户请求交易签名。`,
			noInfoNeededTitle:`此应用程序不要求任何个人信息或帐户。`,
			noInfoNeededDescription:`该应用程序将收到的唯一信息是基本的身份信息，例如您的用户名。`,
			noAccountsTitle:`您没有此网络的帐户`,
			noAccountsDescription:`您需要先创建一个帐户，然后才能使用应用程序。`,
			personalInformation:`个人信息：`,
			requestingPersonalInformation:`{app}正在请求个人信息。它只能看到请求的内容，非您在Scatter身份中没有填写的其他内容。`,
		},

		getPublicKey:{
			suffix:`需要您提供一个公共密钥`,
			select:`选择一个密钥`,
			generate:`生成新密钥`,
		},

		linkApp:{
			suffix:`正在重新链接`,
			description:`确保应用程序名称是您当前正在与之交互的应用程序。`
		},

		transferRequest:{
			suffix:`正在请求转账`,
			selectAccount:`选择帐号`,
		},

		updateIdentity:{
			suffix:`要`,
			changeName:`更改您的身份名称`,
			addKycProofs:`添加KYC证明`,
		},

		signature:{
			moreAccounts:`更多帐户`,
			keysInvolved:`涉及的密钥`,
			accountsInvolved:`涉及的帐户`,
			previouslyWhitelisted:`此操作先前已列入白名单`,
			hiddenAction:`操作已隐藏`,
			dangerous:`您将要签署的单个或多个操作有危险！`,
			dangerousAction:`此操作有危险!`,
			dangerousTooltip:`此操作有危险。接受它会更改您的密钥，并可能将您的帐户转让给其他人。检查以确保密钥正确。`,
			whitelistThis:`您可以将其列入白名单。`,
			whitelistExplainer:`选中的复选框可以更改其值，而不影响白名单。`,
			actionsTotal:`一共有{x} 项操作`
		},
	},

// ---------------------------------------
	errors:{
		badPassword:`密码错误`,
		passwordConfirmation:`密码确认与密码不符`,
		keypairExists:`具有该名称或公钥的密钥对已存在`,
		transferError:`尝试转移代币时发生错误`,
		badQrDecryption:`解密此二维码时出错。您确定此二维码的密码正确吗？`
	}
}
