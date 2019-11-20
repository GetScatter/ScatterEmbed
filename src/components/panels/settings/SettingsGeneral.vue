<template>
    <section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.version')}}</label>
            <b>Scatter Desktop v{{version}}</b>
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.language')}}</label>

            <Select bordered="1" :options="locales"
                    :selected="locales.find(x => x.locale === $i18n.locale)"
                    :parser="x => x.name"
                    v-on:selected="x => selectLanguage(x.locale)" />
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.simpleMode')}}</label>

            <p>{{$t('settings.general.simpleModeDescription')}}</p>

            <Switcher :state="false" v-on:switched="enableSimpleMode" />
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.notifications')}}</label>
            <p>{{$t('settings.general.notificationsDescription')}}</p>

            <Switcher :state="showNotifications" @click.native="toggleNotifications" />
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.ports')}}</label>
            <p>{{$t('settings.general.portsDescription')}}</p>

            <br>
            <section v-if="ports && Object.keys(ports).length">
                <section class="port" v-for="(ssl, port) in ports">
                    {{port}}
                    <figure class="ssl" v-if="ssl">SSL</figure>
                </section>
            </section>
            <section v-else>{{$t('settings.general.noPorts')}}</section>
        </section>

        <section class="action-box top-pad" v-if="dataPath">
            <label>{{$t('settings.general.dataPath')}}</label>
            <p>{{$t('settings.general.dataPathDescription')}}</p>

            <br>
            <br>
            <Input style="margin-bottom:0;" dynamic-button="icon-folder-open-empty"
                 disabled="1" :text="dataPath"
                 v-on:dynamic="openFilePathLink"/>
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.general.devConsole')}}</label>
            <p>{{$t('settings.general.devConsoleDescription')}}</p>
            <Button @click.native="openConsole"
                 :text="$t('settings.general.devConsoleButton')"/>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '@walletpack/core/store/constants';
    import * as UIActions from "../../../store/ui_actions";

    import Injectable from "../../../services/wallets/Injectable";
    import {Popup} from "../../../models/popups/Popup";
    import PopupService from "../../../services/utility/PopupService";

    export default {
        data () {return {
	        dataPath:null,
        }},
        computed:{
            ...mapState([
                'scatter',
                'ports',
            ]),
            ...mapGetters([
                'version',
	            'networks',
	            'language',
            ]),
            showNotifications(){
                return this.scatter.settings.showNotifications;
            },
            locales(){
            	return [
                    {locale:'en', name:'English'},
                    {locale:'zh', name:'Mandarin (普通話)'},
                    {locale:'es', name:'Spanish (Español)'},
                ]
            }
        },
        async mounted(){
	        this.dataPath = await Injectable.appPath();
        },
        methods: {
	        async enableSimpleMode(){
	        	PopupService.push(Popup.enableSimpleMode(async enabled => {
	        		if(!enabled) return;

			        await window.wallet.storage.setSimpleMode(true);
			        await window.wallet.lock();
			        window.wallet.utility.reload(null, true)
                }))
            },
        	openFilePathLink(){
        	    this.openInBrowser(this.dataPath, true);
            },
	        openConsole(){ window.wallet.utility.openTools(window.wallet.windowId); },
            async toggleNotifications(){
                const scatter = this.scatter.clone();
                scatter.settings.showNotifications = !scatter.settings.showNotifications;
                this[Actions.SET_SCATTER](scatter);
            },
	        selectLanguage(locale){
                const langFile = require(`../../../localization/languages/${locale}`).default;
		        this.$i18n.setLocaleMessage(locale, langFile);
		        this.$i18n.locale = locale;
		        window.wallet.storage.setLanguage(locale);
	        },
            ...mapActions([
                Actions.SET_SCATTER,
	            UIActions.SET_LANGUAGE,
            ])
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../styles/variables";


    .line {
      width:100%;
      height:1px;
      background:rgba(0,0,0,0.1);
      margin-top:30px;
    }

    .port {
        display:flex;
        font-weight: bold;

        &:not(:last-child){
            margin-bottom:5px;
        }

        .ssl {
            font-size: $tiny;
            padding:2px 6px;
            background:$blue;
            color:$white;
            border-radius:$radius;
            display:flex;
            align-items: center;
            justify-content: center;
            margin-left:10px;
        }
    }
</style>
