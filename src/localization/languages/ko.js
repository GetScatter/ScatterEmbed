export default {

	generic:{
		back:`뒤로 가기`,
		skip:`건너뛰기`,
		next:`다음`,
		confirm:`확인`,
		accept:`수락`,
		allow:`허용`,
		deny:`취소`,
		okay:`확인`,
		cancel:`취소`,
		open:`이동`,
		yes:`네`,
		no:`아니오`,
		actions:`더보기`,
		enable:`활성화`,
		disable:`비활성화`,
		send:`보내기`,
		receive:`받기`,
		select:`선택`,
		unselect:`선택 취소`,
		edit:`수정하기`,
		add:`추가`,
		save:`저장`,
		new:`신규`,
		delete:`삭제`,
		remove:`제거`,
		remove_all:`모두 제거`,
		copy:`복사`,
		import:`불러오기`,
		export:`내보내기`,
		refresh:`새로 고침`,
		manage:`설정`,
		private_key:`프라이빗 키 | 프라이빗 키`,
		public_key:`퍼블릭 키 | 퍼블릭 키`,
		cards:`카드 | 카드`,
		expired:`만료됨`,
		keys:`키 | 키`,
		hide:`숨기기`,
		reveal:`나타내기`,
		tokens:`토큰 | 토큰`,
		networks:`네트워크 | 네트워크`,
		blockchains:`블록체인 | 블록체인`,
		contracts:`컨트랙트 | 컨트랙트`,
		memo:`메모`,
		symbol:`심볼`,
		decimals:`소수점`,
		chain_id:`체인 아이디`,
		name:`이름`,
		accounts:`계정 | 계정`,
		search:`검색`,
		buy:`구입`,
		sell:`판매`,
		contacts:`연락처`,
		history:`히스토리`,
		exchange:`거래소`,
		view:`보기`,
		redo:`재실행`,
		promoted:`광고`,
		addressOrAccount:`주소 또는 계정`,
		pleaseWait:`잠시만 기다려주세요.`,
		selectToken:`토큰을 선택해주세요.`,
		selectBlockchain:`블록체인을 선택해주세요.`,
	},

	sidebar:{
		dashboard:`대시보드`,
		apps:`앱`,
		wallet:`지갑`,
		assets:`자산`,
		identities:`신원`,
		locations:`주소`,
		contacts:`연락처`,
		history:`히스토리`,
		networks:`네트워크`,
		settings:`설정`,
		lock:`지갑 잠금`
	},

	login:{
		registerButtonTitle:`시작하기`,
		registerButtonSubtitle:`스캐터 설정을 시작합니다.`,
		reset:`초기화`,
		restore:`복구하기`,
		support:`문의하기`,
		passwordPlaceholder:`비밀번호 입력`,
	},

	setPassword:{
		title:`강력한 암호를 설정하세요.`,
		description:`강력한 암호는 8자 이상으로, 숫자 1개와 특수문자 1개를 포함합니다.`,
		choosePass:`비밀번호 입력`,
		confirmPass:`비밀번호 확인`
	},

	welcome:{
		title:`미래에 오신 것을 환영합니다.`,
		description:`스캐터 사용을 위한 준비가 모두 끝났습니다.`,
		button:`스캐터 시작하기`
	},

	destroy:{
		title:`스캐터 초기화`,
		disclaimer:`스캐터를 초기화하기 전에, 프라이빗 키를 모두 백업하셨는지 꼭 확인하세요.`,
		description:`스캐터 초기화 이후에는 초기화 이전의 데이터 복구가 절대로 불가능합니다. 미리 저장해둔 백업 파일에서만 데이터 복구가 가능함을 명심하세요.`
	},

	dashboard:{
		vote:{
			title:`스캐터에게 투표하기`,
			subTitle:`스캐터를 지지해주시길 부탁드립니다!`,
			description:`스캐터는 EOS 메인넷 블록 프로듀서로 출마했습니다. 스캐터가 블록 프로듀서로서 활동할 수 있도록 투표를 부탁드립니다!`,
			button:`지금 투표하기!`,
			voted:`{total} 체인의 스캐터에게 투표해주셨습니다. 큰 도움에 감사드립니다!`
		}
	},

	apps:{
		explore:`익스플로러`,
		myApps:`나의 앱`,
		allCategories:`모든 카테고리`
	},

	app:{
		loginPermission:`사용 중인 계정`,
		accountsProvided:`사용 중인 계정`,
		requiredFields:`필수 필드`,
		mutableFields:`변수 필드`,
		removePermission:`권한 제거`,
		removeIdentity:`로그인 권한은 각 애플리케이션에 스캐터 접근 권한을 주는 것을 의미합니다. 해당 애플리케이션의 로그인 권한을 제거함으로써 강제로 로그아웃 할 수 있습니다.`,
		removeWhitelist:`화이트 리스트 기능은 트랜잭션 서명을 위한 팝업이 계속 뜨는 것을 방지합니다. 해당 화이트 리스트를 제거할까요?`,
	},

	wallet:{
		noKeys:{
			title:`현재 보유하고 있는 키가 없습니다.`,
			description:`하단의 버튼을 이용하여 키를 불러오거나, 새로이 생성하세요.`
		},

		generateKey:`키 생성하기`,
		importKey:`키 불러오기`,
		addCreditCard:`신용카드 추가하기`
	},

	account:{
		totalFiatBalance:`총 평가액`,
		actions:{
			unlink_account:`계정 연결 끊기`,
			change_permissions:`권한 변경하기`,
			proxy_vote:`대리 투표 위임하기`,
			create_account:`계정 생성하기`,
		}
	},

	assets:{
		noAccounts:`계정이 없습니다.`
	},

	histories:{
		sent:`출금`,
		received:`입금`,
		networkDisabled:`네트워크 불안정`,

		clear:{
			title:`저장 내역 삭제`,
			description:`전체 저장 내역을 삭제합니다. 키나 계정이 삭제되는 것은 아닙니다.`,
		}
	},

	identities:{
		identities:`신원인증`,

		id:{
			nameLabel:`신원인증 이름 / 사용자 이름`,
			namePlaceholder:`온라인 신원 이름`,
			nameError:`신원인증 이름은 비워둘 수 없으며, 띄어쓰기와 특수문자는 사용할 수 없습니다.`
		},

		personal:{
			nameLabel:`성명`,
			namePlaceholder:`전체 성함을 입력하세요.`,
			emailLabel:`이메일`,
			dobLabel:`생년월일`,
		},

		location:{
			title:`주소`,
			noneSelected:`선택되지 않음`
		},

		auth:{
			title:`인증 키`,
			description:`해당 인증 키를 꼭 저장해두세요. 특정 애플리케이션 사용에 따른 접근 권한을 얻기 위해서는 해당 인증 키가 꼭 필요합니다.`,
			changeButton:`변경 / 확인`
		},

		removing:{
			title:`신원인증 제거`,
			description:`{identity} 해당 신원인증을 제거할까요?`
		}
	},

	locations:{
		locations:`주소`,
		nameLabel:`주소명`,
		namePlaceholder:`집, 사무실, 기타`,
		countryLabel:`국가`,
		countryItemNone:`없음`,
		addressLabel:`주소`,
		cityLabel:`도시`,
		stateLabel:`주`,
		phoneLabel:`전화번호`,
	},

	networks:{
		connectionError:`연결 실패!`
	},


	settings:{
		menu:{
			general:`일반`,
			tokens:`토큰`,
			explorers:`익스플로러`,
			backup:`백업`,
			firewall:`방화벽`,
			password:`비밀번호`,
			destroy:`초기화`
		},

		base:{
			basics:`기본 설정`,
			secure:`보안 설정`
		},

		general:{
			version:`버전`,
			language:`언어`,
			simpleMode:`심플 모드`,
			simpleModeDescription:`심플 모드는 일반 사용자에게 적합합니다. 현재 사용 중이신 어드밴스 모드는 전문적인 사용자 또는 개발자에게 적합합니다.`,
			notifications:`화이트 리스트 알림`,
			notificationsDescription:`해당 알림은 화이트 리스트가 적용된 트랜잭션에 자동으로 서명할 때에 특정한 오퍼레이팅 시스템에서 작동합니다.`,
			ports:`포트 열기`,
			portsDescription:`해당 포트는 로컬 머신의 포트로써 로컬 애플리케이션이 스캐터에 접근하여 사용할 수 있습니다.`,
			noPorts:`열려있는 포트가 없습니다!`,
			dataPath:`데이터 파일 저장 공간`,
			dataPathDescription:`스캐터가 해당 저장 공간에 데이터를 암호화하여 저장합니다.`,
			devConsole:`개발자 콘솔`,
			devConsoleDescription:`가끔씩 스캐터에서 오류가 나면 이곳을 확인해주세요.`,
			devConsoleButton:`콘솔 열기`,
		},

		backup:{
			title:`백업 설정`,
			description:`현재 스캐터에서 사용 중인 모든 키, 권한, 설정 내역을 저장하여 백업합니다.`,
			autobackup:`자동 백업 저장 공간 설정`,
			create:`백업 파일 생성하기`,
			currentFolder:`현재 백업 저장 공간`,
			created:`백업 파일 생성!`
		},

		destroy:{
			title:`스캐터 초기화`,
			description:`스캐터를 초기화하면 현재 컴퓨터에 저장된 모든 신원인증, 키, 설정을 삭제합니다. 실제 블록체인에 기록되어 있는 블록체인 계정을 삭제하는 것은 아닙니다.`,
			important:`스캐터를 초기화하기 전에, 백업 파일을 생성해두었는지 꼭 확인하십시오!`,
			button:`스캐터 초기화`
		},

		firewall:{
			ridl:{
				title:`탈중앙화 방화벽`,
				description:`RIDL Defender는 스캐터가 출시한 탈중앙화 방화벽 시스템입니다. 이 시스템은 위험한 웹사이트, 애플리케이션, 계정으로부터 사용자를 보호합니다.`,
			},

			blocker:{
				title:`컨트랙트 액션 제한`,
				description:`외부 애플리케이션으로부터 해당 액션을 허용하지 않습니다.`,
				blacklisted:`블랙리스트 액션`
			}

		},

		password:{
			title:`비밀번호 변경`,
			description:`비밀번호를 주기적으로 변경하는 것을 권장합니다. 여러 곳에서 동일한 비밀번호를 사용하는 것은 해킹의 위험성을 높입니다.`,
			button:`비밀번호 변경하기`,
			changed:`비밀번호가 변경되었습니다!`,

			pin:{
				title:`PIN 변경하기`,
				description:`PIN을 활성화하면, PIN이 보조 비밀번호 역할을 합니다. 화이트 리스트에 등록되지 않은 트랜잭션에 서명할 때마다 PIN 입력이 필요합니다. 비밀번호와 동일하게 PIN을 설정하지 마십시오.`,
				disabled:`PIN 비활성화`,
				changed:'PIN 변경 완료!',
				pinForAllTitle:`외부 애플리케이션을 사용할 때에 PIN을 활용하세요.`,
				pinForAllDescription:`PIN을 활성화하면, 외부 애플리케이션을 사용할 때 뜨는 모든 팝업에 PIN을 입력해야 합니다. 그외에 스캐터 앱에서의 송금 및 거래에도 PIN 입력이 필요합니다.`,
			}
		},

		tokens:{
			switch:{
				add:`토큰 추가`,
				whitelist:`토큰`,
				blacklist:`필터링`,
				settings:`설정`
			},

			whitelistButton:`화이트 리스트 토큰`,
			blacklistButton:`블랙리스트 토큰`,

			hidePrimaryBalance:`주요 자산 숨김`,
			hidePrimaryBalanceDescription:`퀵 액션 바에서 자산을 보이지 않도록 합니다.`,
			filterSmallBalances:`소규모 보유 잔고 숨기기`,
			filterSmallBalancesDescription:`자산 규모가 작은 토큰을 숨기려면 이곳에서 설정하세요.`,

			noTokens:`토큰 없음`

		}

	},

	receive:{
		receiver:`입금받을 계정`,
		sendTo:`자산을 이 계정으로 입금합니다.`,
		forEosio:`몇몇 거래소에서 주소 태그, 메모 등의 부수적인 내용을 입력하라고 요구할 것입니다. 이 계정은 EOSIO 상의 실제 계정이기 때문에, 해당 부분에 어떠한 내용을 입력해도 상관없습니다.`
	},

	exchange:{
		fromAndToken:`계정과 토큰`,
		priceNotAvailable:`가격 사용 불가`,
		loadingPairs:`거래쌍 로딩 중`,
		noPairs:`거래쌍 사용 불가`,
		loadingRate:`비율 로딩 중`,
		errorTitle:`거래소 오류`,
		errorDescription:`거래소 API에 연결할 수 없습니다.`
	},

	transfer:{
		sender:`출금할 계정`,
		receiver:`입금받을 계정`,
		amountTitle:`자산 및 세부 사항`,
		priceNotAvailable:`가격 사용 불가`,
		memo:`메모 (선택 입력)`,
		loadingBalances:`아직 자산 내역 로딩 중입니다.`,
	},


	// COMPONENTS ----------------------------

	editNetwork:{
		systemToken:`시스템 토큰`,
		memorableName:`기억할 수 있는 이름으로 입력하세요.`,
		host:`Host`,
		protocol:`Protocol`,
		port:`Port`,
		chainIdTooltip:`Fetch Chain ID`,
		update:`세부 사항 업데이트`,

		systemTokenTitle:`네트워크 시스템 토큰`,
		systemTokenDescription:`몇몇 네트워크는 디폴트 시스템 토큰 대신에 커스텀 토큰을 사용합니다. (ETH, EOS, TRX 등)`
	},

	keysAndAccountsList:{
		actions:{
			editName:`이름 수정`,
			copyPublicKey:`퍼블릭 키 복사`,
			refreshAccounts:`계정 새로 고침`,
			convertBlockchain:`블록체인 변경`,
			removeKey:`키 제거`,
			linkAccount:`계정 연동`,
		},

		noAccounts:{
			title:`해당 키에 연결된 계정이 없습니다.`,
			requiresPayment:`{blockchain} 블록체인에서 계정을 생성하려면 소정의 비용이 필요합니다.`,
			checkEnabled:`네트워크에 {blockchain} 블록체인이 활성화되어 있는지를 확인하십시오.`,
			createAccountButton:`지금 신규 생성하기!`
		},

		linkedAccounts:`연결된 계정`,

		changeKeypairNameTitle:`키쌍 이름 변경하기`,
		changeKeypairNameDescription:`키쌍 이름은 오로지 사용자가 관리 측면에서 사용하는 기능입니다. 블록체인이나 계정의 키쌍에 영향을 미치지 않습니다.`,
	},

	panels:{
		keypair:{
			selectHardware:`하드웨어 지갑 선택`,
			availableHardwareChains:`사용 가능한 블록체인`,
			hardwareIndex:`키/계정 색인`,
			importTextKeyTitle:`프라이빗 키 불러오기`,
			importTextKeyDescription:`프라이빗 키 자체가 디바이스에 저장되지 않습니다. 스캐터는 트랜잭션에 서명할 때에만 이를 사용하며, 사용자를 제외한 아무 누구도 접근할 수 없습니다. 프라이빗 키를 저장하기에 스캐터도 안전한 공간이지만, 오프라인 상태인 공간에도 백업 파일을 저장해둘 것을 권장합니다.`,
			validTextKeyWarn:`유효한 키를 입력하면, 자동으로 불러오기가 실행됩니다.`,
			scanQR:`QR 코드 스캔하기`,
		}
	},


	// ---------------------------------------
	popins:{
		fullscreen:{
			addCustomNetwork:`커스텀 네트워크 추가`,
			addNewContact:`신규 연락처 추가`,
			changeIdentityKey:`신원 인증 키`,
			generateRandomKey:`임의의 키 생성`,
			saveIdentityKey:`신규 신원인증 키 저장`,
			checkHardwareTitle:`하드웨어 체크`,
			checkHardwareDescription:`하드웨어 디바이스에서 확인 창을 보실 수 있습니다.`,
			confirmPassword:`비밀번호 확인`,
			securityCode:`보안 코드 입력`,

			changePermissions:{
				title:`계정 키 변경`,
				disclaimer:`주의하십시오!`,
				disclaimerDescription:`해당 계정의 사용 권한을 가지고 있는 키를 변경하는 작업입니다. 키 변경이 어떤 결과를 초래할 것인지 완벽히 이해한 경우에만 진행하십시오.`,
				owner:`오너 키 / 마스터 키`,
				active:`액티브 키 / 데일리 키`,
				dontChange:`현재 상태로 두기`
			},

			createAccount:{
				title:`게정 생성`,
				exchangeDescription:`계정 생성 비용을 거래소 또는 다른 계정에서 전송하여 지불할 수 있습니다.`,
				cardDescription:`해당 옵션은 현재 사용이 불가능합니다.`,
				startTyping:`사용하고 싶은 계정 이름을 입력하여 생성 가능 여부를 확인하세요.`,
				includeMemo:`송금 시에 해당 메모를 꼭 입력하세요. 그렇지 않으면 자산을 찾을 수 없게 됩니다.`,
				clickAfter:`전송 완료 후에 클릭하세요.`,
				lookingTitle:`계정 검색 중`,
				lookingDescription:`스캐터가 30분간 계정 생성 내역을 확인합니다. 계정 생성이 완료되면 자동으로 스캐터에 해당 계정이 추가됩니다.`,
				exchangeErrorTitle:`거래소 계정 생성 오류`,
				exchangeErrorDescription:`거래소에서 송금 후, 30분이 지났습니다. 해당 계정이 아직 만들어진 것 같지 않습니다. 거래소에서 이체 내역을 확인해보세요.`,
				accountFoundTitle:`계정 검색 완료!`,
				accountFoundDescription:`스캐터가 거래소를 이용하여 생성한 계정을 찾았습니다. 이제 지갑에서 해당 계정을 확인하실 수 있습니다.`,
				nameTooShort:`계정 이름은 12글자여야만 합니다.`,
				nameFormatting:`계정 이름은 영문 소문자만 가능합니다.`,
				checkingName:`계정 이름을 사용할 수 있을지 확인하고 있습니다...`,
				nameTaken:`이 계정 이름은 누군가 사용 중입니다.`,
			},

			moderateCpu:{
				available:`사용 가능한 {token}`,
				reclaiming:`회수 중인 {token}`,
				stake:`스테이킹`,
				unstake:`언스테이킹`
			},

			moderateRam:{
				type:`종류`,
				bytesError:`15 bytes 이상이어야 합니다.`
			},

			exportKey:{
				title:`프라이빗 키 내보내기`,
				disclaimer:`프라이빗 키를 항상 안전하게 보관하세요!`,
				description:`항상 프라이빗 키를 내보내기 하여 백업을 저장해두세요. 프라이빗 키를 분실한 경우에는 절대로 자산을 되찾을 수 없습니다.`,
				keyTitle:`키`,
				keyDescription:`해당 프라이빗 키를 텍스트로 내보내기`,
				qrTitle:`종이 지갑`,
				qrDescription:`해당 프라이빗 키를 암호화된 QR 코드로 내보내기`,
				privateKeyAsText:`텍스트 프라이빗 키`,
				privateKeyAsQR:`QR 코드 종이 지갑`,
				savedImage:`이미지가 저장되었습니다!`,
			},

			generateKey:{
				title:`키쌍 생성하기`,
			},

			importBackup:{
				title:`백업 파일로 복구하기`,
				description:`백업 파일을 불러와서 스캐터를 복구할 수 있습니다. 백업 파일 사용을 위해서는 비밀번호 입력이 필요합니다.`,
				buttonTitle:`백업 파일 선택하기`,
				buttonDescription:`백업 파일은 .json 또는 .txt 로 저장되어 있습니다.`,
				errorParsing:`해당 백업 파일을 불러오는 도중에 오류가 발생했습니다.`,
				errorDecrypting:`해당 백업 파일을 복호화하는 도중에 오류가 발생했습니다.`,
				errorReading:`해당 백업 파일을 불러올 수 없습니다.`,
			},

			importKeypair:{
				title:`키쌍 불러오기`,
				text:`텍스트`,
				hardware:`하드웨어`,
				qrCode:`QR 코드`,
				invalidPrivateKey:`유효하지 않은 프라이빗 키`,
			},

			removeKeypair:{
				title:`키 제거하기`,
				permanent:`이 작업은 되돌릴 수 없습니다.`,
				removesAll:`키를 제거하면 해당 키와 연결된 모든 계정과 권한도 함께 제거됩니다. 한번 키를 제거한 이후에는 다시 생성할 수 없습니다.`,

			},

			unlinkAccount:{
				title:`계정 연결 끊기`,
				description:`계정 연결을 끊으면 해당 계정이 사용 중인 모든 애플리케이션에서 권한을 제거합니다.`,
				disclaimer:`계정 연결을 끊더라도 블록체인에서 해당 계정이 삭제되는 것은 아닙니다. 계정과 스캐터와의 연결을 끊는 것입니다.`,
			}

		},

		overlay:{
			exchanging:`거래 중`,
			transferring:`전송 중`,
			confirmPin:`PIN 입력`,
			selectAccount:`계정 선택`,
			selectBlockchain:`블록체인 선택`,
			selectDisplayToken:`표시할 토큰 선택`,
			selectFiatCurrency:`표시할 통화 선택`,
			selectBlockchainToken:`블록체인 토큰 선택`,
			selectPublicKey:`퍼블릭 키 선택`,
			selectRecipient:`수취인 선택`,
			selectToken:`토큰 선택`,
			allBlockchains:`모든 블록체인`,
			selectTokenAndAccount:`토큰과 계정 선택`,
			transactionSuccess:`트랜잭션 성공!`,
			viewTransactionOn:`링크를 클릭하여 {explorer}에서 확인하세요.`,

			enableSimpleMode:{
				// TODO:
			},

			enterPin:{

			},

			linkAccount:{
				title:`EOSIO 계정 연결`,
				description:`이 작업으로 연결할 수 없거나 활성화된 히스토리 플러그인이 없는 계정에 연결할 수 있습니다.`,
				selectNetwork:`네트워크 선택`,
				button:`연결`,
				noNetworksAvailable:`연결 가능한 EOSIO 네트워크가 없습니다!`,
			}
		},
	},

	// ---------------------------------------
	popouts:{
		popoutApp:{
			noImage:`이미지 없음`,
			reputation:{
				unknown:`알려지지 않은 평판임`,
				trusty:`믿을 수 있음`,
				scam:`사기로 알려져 있음`
			}
		},

		requiredFields:{
			title:`신원인증 필드 입력 필요`,
			personalInformation:`개인 정보:`
		},

		login: {
			suffix:`해당 내용을 확인합니다.:`,
			dangerousPermission:`오너 권한으로 서명합니다. 주의가 필요합니다.`,
			allAccountsFor:`모든 계정은:`,
			allAccountsDescription:`{app}이 특정한 네트워크의 모든 계정의 확인 권한을 요청합니다. 이는 앞으로 해당 애플리케이션이 확인 권한을 요청한 네트워크에 연결된 모든 계정에 트랜잭션 서명을 요청할 수 있다는 뜻입니다.`,
			noInfoNeededTitle:`해당 애플리케이션은 어떠한 개인 정보나 계정 정보를 요구하지 않습니다.`,
			noInfoNeededDescription:`해당 애플리케이션이 요구하는 정보는 오직 사용자 이름과 같은 신원인증 정보입니다.`,
			noAccountsTitle:`해당 네트워크에 계정이 없습니다.`,
			noAccountsDescription:`애플리케이션을 사용하려면 계정 생성이 필요합니다.`,
			personalInformation:`개인 정보:`,
			requestingPersonalInformation:`{app}이 개인 정보를 요청합니다. 해당 애플리케이션은 요청한 정보만 확인할 수 있으며, 스캐터 신원인증에 작성해둔 정보는 확인할 수 없습니다.`,
		},

		getPublicKey:{
			suffix:`퍼블리 키 요청 중`,
			select:`키 선택`,
			generate:`신규 키 생성`,
		},

		linkApp:{
			suffix:`재연결 중`,
			description:`애플리케이션의 이름을 반드시 확인하십시오. 해당 애플리케이션이 실제 사용하려는 애플리케이션이 맞는지 재확인 하십시오. 만약 다르다면, 해킹을 시도하는 악성 앱일 가능성이 있습니다.`
		},

		transferRequest:{
			suffix:`전송 요청 중`,
			selectAccount:`계정 선택`,
		},

		updateIdentity:{
			suffix:`요구 중`,
			changeName:`신원인증 이름 변경`,
			addKycProofs:`KYC 증명 추가`,
		},

		signature:{
			moreAccounts:`계정 더 보기`,
			keysInvolved:`관련 키`,
			accountsInvolved:`관련 계정`,
			previouslyWhitelisted:`화이트 리스트에 등록했던 액션입니다.`,
			hiddenAction:`숨겨진 액션이 있습니다.`,
			dangerous:`서명 하려는 하나 이상의 액션에 주의가 필요합니다!`,
			dangerousAction:`해당 액션에 주의가 필요합니다!`,
			dangerousTooltip:`해당 액션에 주의가 필요합니다. 이 액션으로 말미암아 키가 변경된다거나 해당 계정의 사용 권한이 다른 사람에게 넘어갈 수 있습니다. 키를 다시 한번 확인하십시오!`,
			whitelistThis:`이 트랜잭션을 화이트 리스트에 등록할 수 있습니다. 화이트 리스트에 등록하면, 해당 트랜잭션이 자동으로 수락됩니다.`,
			whitelistExplainer:`화이트 리스트를 변경하지 않고도 체크박스를 선택하여 변경할 수 있습니다.`,
			actionsTotal:`총 {x}개의 액션`
		},
	},

	// ---------------------------------------
	errors:{
		badPassword:`잘못된 비밀번호입니다.`,
		passwordConfirmation:`입력한 비밀번호와 일치하지 않습니다.`,
		keypairExists:`해당 키쌍 또는 퍼블릭 키가 이미 저장되어 있습니다.`,
		transferError:`토큰 전송 중에 오류가 발생하였습니다.`,
		badQrDecryption:`QR 코드 복호화 중에 오류가 발생하였습니다. 해당 QR 코드에 입력하였던 비밀번호가 맞는지 다시 한번 확인해주십시오.`
	}
}
