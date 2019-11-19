<template>
    <section>

        <section class="action-box top-pad">
            <label>{{$t('settings.backup.title')}}</label>
            <p>{{$t('settings.backup.description')}}</p>

            <br>

            <section class="split-inputs">
                <Button style="flex:1;" :text="$t('settings.backup.autobackup')"
                     @click.native="setBackupLocation()" />
                <Button style="flex:0.6;" :text="$t('settings.backup.create')"
                     @click.native="createBackup" />
            </section>
        </section>

        <section class="action-box top-pad">
            <label>{{$t('settings.backup.currentFolder')}}</label>
            <Input style="margin-bottom:0;" dynamic-button="icon-folder-open-empty"
                 disabled="1" :text="scatter.settings.backupLocation"
                 v-on:dynamic="openFilePathLink"/>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '@walletpack/core/store/constants';

    import {BACKUP_STRATEGIES} from '@walletpack/core/models/Settings';
    import BackupService from '../../../services/utility/BackupService';
    import PopupService from "../../../services/utility/PopupService";
    import {Popup} from "../../../models/popups/Popup";

    export default {
        data () {return {
            strategies:BACKUP_STRATEGIES,
        }},
        computed:{
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'autoBackup',
            ])
        },
        mounted(){
            BackupService.setBackupStrategy(BACKUP_STRATEGIES.AUTOMATIC);
        },
        methods: {
	        openFilePathLink(){
		        this.openInBrowser(this.scatter.settings.backupLocation, true);
	        },
            async setBackupLocation(){
                await BackupService.setBackupLocation();
            },
            async createBackup(){
                if(await BackupService.createBackup()){
                	PopupService.push(Popup.snackbar(this.$t('settings.backup.created')))
                }

            },
            ...mapActions([
                Actions.SET_SCATTER
            ])
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../styles/variables";


</style>
