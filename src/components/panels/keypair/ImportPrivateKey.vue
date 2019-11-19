<template>
	<section class="center-panel">
		<Key />
		<br>
		<br>
		<h2>{{$t('panels.keypair.importTextKeyTitle')}}</h2>
		<p>{{$t('panels.keypair.importTextKeyDescription')}}</p>

		<br>

		<input class="center" type="password" v-model="privateKey" placeholder="input your private key" />
		<p v-if="!error"><u>{{$t('panels.keypair.validTextKeyWarn')}}</u></p>
		<p v-else>{{error}}</p>

		<ActionBar v-if="returnOnly" :buttons-left="[{text:$t('generic.back'), click:() => $emit('back')}]" :buttons-right="[{text:$t('generic.skip'), click:() => $emit('next')}]" />
	</section>
</template>

<script>
	import {mapGetters} from 'vuex';
	import Key from '../../svgs/Key'

	export default {
		components:{Key},
		props:['returnOnly'],
		data(){return {
			privateKey:'',
			importing:false,
			error:'',
		}},
		computed:{
			...mapGetters([
				'keypairs'
			])
		},
		methods:{

		},
		watch:{
			['privateKey'](){
				this.$emit('key', this.privateKey.trim().replace(/\W/g, '').replace('0x', ''));
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
