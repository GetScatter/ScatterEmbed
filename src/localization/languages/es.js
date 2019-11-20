export default {

	generic:{
		back:`Atrás`,
		skip:`Omitir`,
		next:`Próxima`,
		confirm:`Confirmar`,
		accept:`Aceptar`,
		allow:`Permitir`,
		deny:`Negar`,
		okay:`Bueno`,
		cancel:`Cancelar`,
		open:`Abierto`,
		yes:`Sí`,
		no:`No`,
		actions:`Comportamiento`,
		enable:`Habilitar`,
		disable:`Inhabilitar`,
		send:`Enviar`,
		receive:`Recibir`,
		select:`Seleccionar`,
		unselect:`Deseleccionar`,
		edit:`Editar`,
		add:`Añadir`,
		save:`Salvar`,
		new:`Nuevo`,
		delete:`Eliminar`,
		remove:`Retirar`,
		remove_all:`Eliminar todo`,
		copy:`Copiar`,
		import:`Importar`,
		export:`Exportar`,
		refresh:`Refrescar`,
		manage:`Gestionar`,
		private_key:`Llave privada | Llaves privadas`,
		public_key:`Llave pública | Llaves públicas`,
		cards:`Tarjeta | Tarjetas`,
		expired:`Muerto`,
		keys:`Llave | Llaves`,
		hide:`Esconder`,
		reveal:`Revelar`,
		tokens:`Ficha | Fichas`,
		networks:`Red | Redes`,
		blockchains:`Blockchain | Blockchains`,
		contracts:`Contrato | Contratos`,
		memo:`Memorándum`,
		symbol:`Símbolo`,
		decimals:`Decimales`,
		chain_id:`ID de cadena`,
		name:`Nombre`,
		accounts:`Cuenta | Cuentas`,
		search:`Buscar`,
		buy:`Comprar`,
		sell:`Vender`,
		contacts:`Contactos`,
		history:`Historia`,
		exchange:`Intercambiar`,
		view:`Ver`,
		redo:`Rehacer`,
		promoted:`Promovido`,
		addressOrAccount:`Dirección o cuenta`,
		pleaseWait:`Por favor espera`,
		selectToken:`Selecciona un token`,
		selectBlockchain:`Seleccione una blockchain`,
	},

	sidebar:{
		dashboard:`Tablero`,
		apps:`Aplicaciones`,
		wallet:`Billetera`,
		assets:`Bienes`,
		identities:`Identidades`,
		locations:`Localizaciones`,
		contacts:`Contactos`,
		history:`Historia`,
		networks:`Redes`,
		settings:`Configuraciones`,
		lock:`Bloquear billetera`
	},

	login:{
		registerButtonTitle:`Empezar`,
		registerButtonSubtitle:`Vamos a configurarlo con Scatter`,
		reset:`Reiniciar`,
		restore:`Restaurar`,
		support:`Apoyo`,
		passwordPlaceholder:`Ingresa tu contraseña`,
	},

	setPassword:{
		title:`Establecer una contraseña segura`,
		description:`Las contraseñas seguras tienen al menos 8 caracteres e incluyen al menos un número y un carácter especial.`,
		choosePass:`Elije una contraseña`,
		confirmPass:`Confirmar la contraseña`
	},

	welcome:{
		title:`Bienvenido al futuro`,
		description:`Su Scatter está configurado y listo para usar.`,
		button:`Comience a usar Scatter`
	},

	destroy:{
		title:`Destruye Scatter`,
		disclaimer:`Antes de hacer esto, asegúrese de tener una copia de seguridad de todas sus claves privadas.`,
		description:`Destruir su Scatter es irreversible, y no podrá restaurar ningún dato sin copias de seguridad.`
	},

	dashboard:{
		vote:{
			title:`Vote por la dispersión`,
			subTitle:`¡Muéstranos un poco de amor!`,
			description:`Hemos lanzado un productor de bloques EOS Mainnet que ahora puede votar. Ayúdenos a alcanzar una posición de producción votando por nosotros.`,
			button:`¡Vota ahora!`,
			voted:`Votado por Scatter en {total} cadenas. ¡Gracias por tu ayuda!`
		}
	},

	apps:{
		explore:`Explorar`,
		myApps:`Mis aplicaciones`,
		allCategories:`Todas las categorias`
	},

	app:{
		loginPermission:`Cuentas proporcionadas`,
		accountsProvided:`Cuentas proporcionadas`,
		requiredFields:`Campos requeridos`,
		mutableFields:`Campos mutables`,
		removePermission:`Eliminar permiso`,
		removeIdentity:`Los permisos de inicio de sesión son los que permiten que las aplicaciones interactúen con su Scatter. Puede forzar el cierre de sesión de una aplicación eliminando este permiso.`,
		removeWhitelist:`Las listas blancas de acción lo hacen para que no tenga que seguir aceptando ventanas emergentes para firmar transacciones. ¿Desea eliminar esta lista blanca?`,
	},

	wallet:{
		noKeys:{
			title:`No tienes llaves`,
			description:`Haga clic en uno de los botones a continuación para importar una clave que ya tiene, o generar una nueva.`
		},

		generateKey:`Generar clave`,
		importKey:`Importar clave`,
		addCreditCard:`Agregar tarjeta de crédito`
	},

	account:{
		totalFiatBalance:`Saldo total de Fiat`,
		actions:{
			unlink_account:`Desvincular cuenta`,
			change_permissions:`Cambiar permisos`,
			proxy_vote:`Voto Proxy`,
			create_account:`Crear una cuenta`,
		}
	},

	assets:{
		noAccounts:`Sin cuentas`
	},

	histories:{
		sent:`Expedido`,
		received:`Recibido`,
		networkDisabled:`Red deshabilitada`,

		clear:{
			title:`Borrar historial`,
			description:`Estás a punto de borrar toda tu historia local. Esto no borrará claves o cuentas.`,
		}
	},

	identities:{
		identities:`Identidades`,

		id:{
			nameLabel:`Nombre de identidad / Nombre de usuario`,
			namePlaceholder:`Su presencia en línea`,
			nameError:`El nombre del nombre de identidad no puede estar vacío, tener espacios o caracteres especiales.`
		},

		personal:{
			nameLabel:`Nombre completo`,
			namePlaceholder:`Ingrese su nombre completo`,
			emailLabel:`Email`,
			dobLabel:`Fecha de nacimiento`,
		},

		location:{
			title:`Ubicación`,
			noneSelected:`Ninguna seleccionada`
		},

		auth:{
			title:`Clave de autenticación`,
			description:`Asegúrese de guardar una copia de esta clave de autenticación, la necesitará para recuperar el acceso a ciertas aplicaciones que lo requieren.`,
			changeButton:`Cambio / Ver`
		},

		removing:{
			title:`Eliminar identidad`,
			description:`¿Está seguro de que desea eliminar {identity}`
		}
	},

	locations:{
		locations:`Localizaciones`,
		nameLabel:`Nombre del lugar`,
		namePlaceholder:`Hogar, oficina, etc.`,
		countryLabel:`País`,
		countryItemNone:`Ninguno`,
		addressLabel:`Dirección`,
		cityLabel:`Ciudad`,
		stateLabel:`Estado`,
		phoneLabel:`Número de teléfono`,
	},

	networks:{
		connectionError:`¡Error de conexión!`
	},


	settings:{
		menu:{
			general:`General`,
			tokens:`Fichas`,
			explorers:`Exploradores`,
			backup:`Copias de seguridad`,
			firewall:`Cortafuegos`,
			password:`Contraseña`,
			destroy:`Reiniciar`
		},

		base:{
			basics:`Lo esencial`,
			secure:`Configuraciones seguras`
		},

		general:{
			version:`Versión`,
			language:`Idioma`,
			simpleMode:`Modo simple`,
			simpleModeDescription:`El modo simple está dirigido a usuarios cotidianos, mientras que el modo avanzado (en el que estás actualmente) está dirigido a usuarios muy técnicos y desarrolladores.`,
			notifications:`Notificaciones de la lista blanca`,
			notificationsDescription:`Estas notificaciones aparecen en ciertos sistemas operativos cuando firma automáticamente las transacciones en la lista blanca.`,
			ports:`Puertos abiertos`,
			portsDescription:`Estos son los puertos abiertos en su máquina local que otras aplicaciones locales pueden usar para contactar a Scatter.`,
			noPorts:`¡No hay puertos abiertos!`,
			dataPath:`Ubicación del archivo de datos`,
			dataPathDescription:`La ubicación en su computadora en la que Scatter guarda sus datos cifrados.`,
			devConsole:`Consola de desarrollador`,
			devConsoleDescription:`A veces es posible que necesite ver si Scatter está arrojando algún error.`,
			devConsoleButton:`Consola abierta`,
		},

		backup:{
			title:`Configurar copias de seguridad`,
			description:`Las copias de seguridad le permiten guardar el estado de su Scatter completo, incluidas todas las claves, permisos y configuraciones.`,
			autobackup:`Seleccionar ubicación de copia de seguridad automática`,
			create:`Crear copia de seguridad`,
			currentFolder:`Carpeta de respaldo actual`,
			created:`Copia de seguridad creada!`
		},

		destroy:{
			title:`Destruye Scatter`,
			description:`La destrucción de su Scatter eliminará todos sus datos, incluidas sus identidades y configuraciones de Keypair de su máquina local. No eliminará sus cuentas de blockchain de la cadena de bloques real.`,
			important:`¡ASEGÚRESE DE TENER UN RESPALDO ANTES DE HACER ESTO!`,
			button:`Destruye Scatter`
		},

		firewall:{
			ridl:{
				title:`Cortafuegos descentralizado`,
				description:`RIDL Defender es el sistema de firewall descentralizado patentado de Scatter. Ayuda a protegerlo de sitios web, aplicaciones y cuentas maliciosas.`,
			},

			blocker:{
				title:`Restricción de acciones del contrato`,
				description:`Estas acciones no serán permitidas desde aplicaciones externas.`,
				blacklisted:`Acciones en la lista negra`
			}

		},

		password:{
			title:`Cambia tu contraseña`,
			description:`Cambiar su contraseña periódicamente es muy saludable. A menudo usamos las mismas contraseñas en varios lugares, lo que lleva a una mayor posibilidad de que sean descubiertas.`,
			button:`Cambia la contraseña`,
			changed:`¡Contraseña cambiada!`,

			pin:{
				title:`Cambia tu PIN`,
				description:`Si está habilitado, su PIN es una contraseña secundaria que se requiere cada vez que realiza una acción no incluida en la lista blanca. No haga esto igual que su contraseña.`,
				disabled:`PIN deshabilitado`,
				changed:'PIN cambiado!',
				pinForAllTitle:`Use PIN para interacciones de aplicaciones externas.`,
				pinForAllDescription:`Si habilita esto, también deberá ingresar su PIN para cada ventana emergente que haga una aplicación externa. De lo contrario, solo se requerirá su PIN para acciones internas de dispersión como transferencia e intercambio.`,
			}
		},

		tokens:{
			switch:{
				add:`Agregar ficha`,
				whitelist:`Fichas`,
				blacklist:`Filtrado`,
				settings:`Configuraciones`
			},

			whitelistButton:`De lista blanca`,
			blacklistButton:`De lista negra`,

			hidePrimaryBalance:`Ocultar saldo primario`,
			hidePrimaryBalanceDescription:`Le permite ocultar su saldo en la barra de acciones rápidas.`,
			filterSmallBalances:`Filtrar saldos pequeños`,
			filterSmallBalancesDescription:`Si desea filtrar siempre los fichas con pequeños saldos, puede establecer un modificador aquí.`,

			noTokens:`Sin fichas`

		}

	},

	receive:{
		receiver:`Cuenta receptora`,
		sendTo:`Enviar fondos a`,
		forEosio:`Algunos intercambios le pedirán una etiqueta de dirección, memo o alguna otra forma de entrada secundaria. Puede ingresar cualquier cosa en ese campo ya que esta es una cuenta real de EOSIO.`
	},

	exchange:{
		fromAndToken:`Desde y ficha`,
		priceNotAvailable:`Precio no disponible`,
		loadingPairs:`Cargando pares`,
		noPairs:`No hay pares disponibles`,
		loadingRate:`Tasa de carga`,
		errorTitle:`Error de intercambio`,
		errorDescription:`No se puede conectar a la API de Exchange.`
	},

	transfer:{
		sender:`Enviando desde`,
		receiver:`Enviando a`,
		amountTitle:`Cantidad y detalles`,
		priceNotAvailable:`Precio no disponible`,
		memo:`Memo (opcional)`,
		loadingBalances:`Sus saldos aún no han terminado de cargarse.`,
	},


	// COMPONENTS ----------------------------

	editNetwork:{
		systemToken:`Ficha del sistema`,
		memorableName:`Agrega un nombre memorable`,
		host:`Anfitrión`,
		protocol:`Protocolo`,
		port:`Puerto`,
		chainIdTooltip:`Obtener ID de cadena`,
		update:`Detalles de actualización`,

		systemTokenTitle:`Ficha de sistema de red`,
		systemTokenDescription:`Algunas redes usan un token de sistema personalizado en lugar del token de sistema predeterminado (como ETH, EOS o TRX).`
	},

	keysAndAccountsList:{
		actions:{
			editName:`Editar nombre`,
			copyPublicKey:`Copiar clave pública`,
			refreshAccounts:`Actualizar cuentas`,
			convertBlockchain:`Convertir Blockchain`,
			removeKey:`Eliminar clave`,
			linkAccount:`Cuenta de enlace`,
		},

		noAccounts:{
			title:`No tiene ninguna cuenta vinculada a esta clave.`,
			requiresPayment:`{blockchain} blockchains requieren que pagues una pequeña tarifa para crear cuentas.`,
			checkEnabled:`Asegúrese de tener una red para {blockchain} blockchain habilitada.`,
			createAccountButton:`¡Crear una ahora!`
		},

		linkedAccounts:`Cuentas vinculadas`,

		changeKeypairNameTitle:`Cambiar nombre de par de claves`,
		changeKeypairNameDescription:`El nombre de un par de claves es solo para fines organizativos. No tiene ningún efecto en la cadena de bloques o la clave en sí.`,
	},

	panels:{
		keypair:{
			selectHardware:`Seleccione una billetera de hardware`,
			availableHardwareChains:`Blockchains disponibles`,
			hardwareIndex:`Índice de clave / dirección`,
			importTextKeyTitle:`Importa tu clave privada`,
			importTextKeyDescription:`Su clave privada nunca abandona su dispositivo. Solo usamos esto para firmar transacciones y nadie tendrá acceso a él excepto usted. Recuerde que aunque Scatter es un buen lugar para guardar su clave, siempre debe tener una copia de seguridad en algún lugar fuera de línea.`,
			validTextKeyWarn:`Una vez que ingrese una clave válida, la importará automáticamente.`,
			scanQR:`Escanea un código QR`,
		}
	},


	// ---------------------------------------
	popins:{
		fullscreen:{
			addCustomNetwork:`Agregar red personalizada`,
			addNewContact:`Añadir nuevo contacto`,
			changeIdentityKey:`Clave de autenticación de identidad`,
			generateRandomKey:`Generar clave aleatoria`,
			saveIdentityKey:`Guardar nueva clave de identidad`,
			checkHardwareTitle:`Comprobar hardware`,
			checkHardwareDescription:`Debería ver una confirmación en su dispositivo de hardware.`,
			confirmPassword:`Confirmar contraseña`,
			securityCode:`Ingrese el código de seguridad`,

			changePermissions:{
				title:`Cambio de claves de cuenta`,
				disclaimer:`¡Esto puede ser peligroso!`,
				disclaimerDescription:`Está a punto de cambiar las claves que controlan esta cuenta. Asegúrate de saber lo que estás haciendo.`,
				owner:`Propietario / clave maestra`,
				active:`Clave activa / diaria`,
				dontChange:`Dejar como está`
			},

			createAccount:{
				title:`Crear una cuenta`,
				exchangeDescription:`Puede enviar fondos desde un intercambio u otra billetera para crear su cuenta.`,
				cardDescription:`Esta opción está actualmente deshabilitada.`,
				startTyping:`Comience a escribir un nombre para ver si está disponible.`,
				includeMemo:`¡Asegúrese de incluir este memo cuando lo envíe o se perderán sus fondos!`,
				clickAfter:`Haga clic después de la transferencia.`,
				lookingTitle:`Buscando cuenta`,
				lookingDescription:`Scatter buscará continuamente la cuenta que se creará durante los próximos 30 minutos. Una vez que se encuentre, se agregará automáticamente a su Scatter.`,
				exchangeErrorTitle:`Error de creación de cuenta de Exchange.`,
				exchangeErrorDescription:`Han pasado 30 minutos desde que enviaste dinero de tu intercambio. Parece que todavía no se ha creado una cuenta. Debe verificar el estado de la transacción en el intercambio.`,
				accountFoundTitle:`Cuenta encontrada!`,
				accountFoundDescription:`Scatter encontró la cuenta que creó usando un intercambio. Ahora puedes verlo en tu billetera.`,
				nameTooShort:`El nombre de la cuenta debe tener 12 caracteres.`,
				nameFormatting:`El nombre de la cuenta debe ser solo letras minúsculas.`,
				checkingName:`Comprobando si el nombre está disponible...`,
				nameTaken:`Este nombre ya ha sido tomado`,
			},

			moderateCpu:{
				available:`Disponible {token}`,
				reclaiming:`Reclamando {token}`,
				stake:`Estaca`,
				unstake:`Unstake`
			},

			moderateRam:{
				type:`Tipo`,
				bytesError:`Los bytes deben ser mayores de 15`
			},

			exportKey:{
				title:`Exportando Clave Privada`,
				disclaimer:`¡Mantenga sus claves privadas seguras!`,
				description:`Exporte siempre sus claves privadas y asegúrese de tener una copia de seguridad de ellas. No podrás recuperar tus tokens si los pierdes.`,
				keyTitle:`Clave`,
				keyDescription:`Exportar esta clave privada como texto`,
				qrTitle:`Billetera de papel`,
				qrDescription:`Exporte esta clave privada como un código QR cifrado`,
				privateKeyAsText:`Clave privada como texto`,
				privateKeyAsQR:`Cartera de papel con código QR`,
				savedImage:`Imagen guardada!`,
			},

			generateKey:{
				title:`Generar par de claves`,
			},

			importBackup:{
				title:`Restaurar desde copia de seguridad`,
				description:`Si tiene una copia de seguridad para su Scatter, puede importarla aquí cargándola en Scatter. Aún necesitará la contraseña para desbloquearla.`,
				buttonTitle:`Seleccione un archivo de respaldo`,
				buttonDescription:`Estos terminarán con .json o .txt`,
				errorParsing:`Se produjo un error al analizar esta copia de seguridad.`,
				errorDecrypting:`Se produjo un error al descifrar esta copia de seguridad`,
				errorReading:`Este archivo de copia de seguridad no se pudo leer`,
			},

			importKeypair:{
				title:`Importar par de claves`,
				text:`Texto`,
				hardware:`Hardware`,
				qrCode:`Código QR`,
				invalidPrivateKey:`Clave privada inválida`,
			},

			removeKeypair:{
				title:`Removiendo Llave`,
				permanent:`Esta acción es permanente`,
				removesAll:`La eliminación de claves también elimina todas sus cuentas vinculadas y sus respectivos permisos. Una vez que elimina una clave, no se puede regenerar.`,

			},

			unlinkAccount:{
				title:`Desvincular cuenta`,
				description:`Al eliminar una cuenta vinculada, también se eliminan todos los permisos de sus aplicaciones.`,
				disclaimer:`Esto NO eliminará la cuenta de blockchain, solo Scatter.`,
			}

		},

		overlay:{
			exchanging:`Intercambiando`,
			transferring:`Transferencia`,
			confirmPin:`Confirmar PIN`,
			selectAccount:`Seleccionar cuenta`,
			selectBlockchain:`Seleccionar Blockchain`,
			selectDisplayToken:`Seleccione Mostrar ficha`,
			selectFiatCurrency:`Seleccione una moneda fiduciaria`,
			selectBlockchainToken:`Seleccione un ficha blockchain`,
			selectPublicKey:`Seleccionar clave pública`,
			selectRecipient:`Seleccionar destinatario`,
			selectToken:`Seleccionar ficha`,
			allBlockchains:`Todas las Blockchains`,
			selectTokenAndAccount:`Seleccionar ficha y cuenta`,
			transactionSuccess:`Transacción exitosa!`,
			viewTransactionOn:`Haga clic en el enlace a continuación para ver en {explorer}`,

			enableSimpleMode:{
				// TODO:
			},

			enterPin:{

			},

			linkAccount:{
				title:`Vincular cuenta EOSIO`,
				description:`Esto le permite vincular cuentas en redes a las que no puede acceder o no tiene complementos de historial habilitados.`,
				selectNetwork:`Selecciona una red`,
				button:`Enlazar`,
				noNetworksAvailable:`¡No hay redes EOSIO disponibles!`,
			}
		},
	},

	// ---------------------------------------
	popouts:{
		popoutApp:{
			noImage:`Sin imágen`,
			reputation:{
				unknown:`Reputación desconocida`,
				trusty:`Digno de confianza`,
				scam:`Estafa conocida`
			}
		},

		requiredFields:{
			title:`Campos de identidad requeridos`,
			personalInformation:`Informacion personal:`
		},

		login: {
			suffix:`veremos:`,
			dangerousPermission:`Estás iniciando sesión con tu permiso de propietario. Esto es peligroso.`,
			allAccountsFor:`Todas las cuentas para:`,
			allAccountsDescription:`{app} solicita ver todas las cuentas de una red específica. Esto significa que podrá solicitar firmas de transacciones para cualquier cuenta que haya vinculado a cualquiera de las redes solicitadas.`,
			noInfoNeededTitle:`Esta aplicación no solicita ninguna información personal o cuentas.`,
			noInfoNeededDescription:`La única información que recibirá esta aplicación es información básica de identidad, como su nombre de usuario.`,
			noAccountsTitle:`No tienes cuentas para esta red`,
			noAccountsDescription:`Debe crear una cuenta antes de poder usar aplicaciones.`,
			personalInformation:`Informacion personal:`,
			requestingPersonalInformation:`{app} está solicitando información personal. Solo podrá ver lo que se solicita y nada más que haya completado en su identidad de Scatter.`,
		},

		getPublicKey:{
			suffix:`quiere que proporciones una clave pública`,
			select:`Selecciona una llave`,
			generate:`Generar una nueva clave`,
		},

		linkApp:{
			suffix:`está volviendo a vincular`,
			description:`Asegúrese de que el nombre de la aplicación es una aplicación con la que está interactuando en este momento. Si no es así, podría ser una aplicación peligrosa tratando de actuar como una diferente.`
		},

		transferRequest:{
			suffix:`está solicitando una transferencia`,
			selectAccount:`Seleccionar cuenta`,
		},

		updateIdentity:{
			suffix:`quiere`,
			changeName:`Cambia tu nombre de identidad`,
			addKycProofs:`Añadir pruebas KYC`,
		},

		signature:{
			moreAccounts:`mas cuentas`,
			keysInvolved:`Claves involucradas`,
			accountsInvolved:`Cuentas involucradas`,
			previouslyWhitelisted:`Esta acción se incluyó previamente en la lista blanca`,
			hiddenAction:`La acción está oculta`,
			dangerous:`¡Una o más de las acciones que está a punto de firmar es peligrosa!`,
			dangerousAction:`¡Esta acción es peligrosa!`,
			dangerousTooltip:`Esta acción es peligrosa. Aceptarlo cambiará sus claves y posiblemente le dará su cuenta a otra persona. Verifique que las claves sean correctas.`,
			whitelistThis:`Puede incluir esto en la lista blanca para no tener que volver a aceptar esta transacción.`,
			whitelistExplainer:`Las casillas de verificación que están marcadas pueden cambiar sus valores sin romper la lista blanca.`,
			actionsTotal:`{x} acciones en total`
		},
	},

	// ---------------------------------------
	errors:{
		badPassword:`Contraseña incorrecta`,
		passwordConfirmation:`La confirmación de contraseña no coincide con la contraseña`,
		keypairExists:`Ya existe un par de claves con ese nombre o clave pública`,
		transferError:`Se produjo un error al intentar transferir fichas`,
		badQrDecryption:`Se produjo un error al descifrar este QR. ¿Estás seguro de que la contraseña de este código QR es correcta?`
	}
}
