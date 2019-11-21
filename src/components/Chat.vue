<template>
	<section class="chat" :class="{'open':chat}">
		<section class="inner">

			<section ref="chat" class="display">


				<section class="login" v-if="!sender">
					<section class="box">
						<label>Select an account to chat with</label>
						<Button text="Select Account" @click.native="selectAccount" />
					</section>
				</section>

				<section class="message" v-for="message in messages">
					<figure class="head-bar">
						<!--<figure class="chain" :class="systemTokenFor(message.user)"></figure>-->
						<figure class="user">{{message.user.sender}}</figure>
						<figure class="proof fal fa-id-card" @click="copyText(`key: ${message.user.publicKey} signature: ${message.sig} data: msg::${message.message}:${message.nonce}`)">
							<div class="floater">
								<label>click to copy proofs</label>
								<span>{{message.user.publicKey}}</span>
							</div>
						</figure>
						<figure class="timestamp">
							<time-ago :refresh="60" :datetime="message.timestamp" :locale="$i18n.locale"></time-ago>
						</figure>
					</figure>
					<figure class="text">{{message.message}}</figure>
				</section>
			</section>

			<figure class="error" v-if="error">{{error}}</figure>
			<section class="input" v-if="sender">
				<input @keyup.enter="send" v-model="message" />
				<Button :text="sender.sendable()" @click.native="selectAccount" />
			</section>
		</section>
	</section>
</template>

<script>
	import {mapState} from "vuex";
	import PluginRepository from '@walletpack/core/plugins/PluginRepository'
	import TimeAgo from 'vue2-timeago'
	import PopupService from "../services/utility/PopupService";
	import {Popup} from "../models/popups/Popup";
	import SigningService from '@walletpack/core/services/secure/SigningService'
	import IdGenerator from '@walletpack/core/util/IdGenerator'

	let connection;

	export default {
		components:{
			TimeAgo,
		},
		data(){return {
			message:'',
			messages:[],
			error:null,
			sender:null,
		}},
		computed:{
			...mapState([
				'chat',
				'chatUser',
			])
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){

				connection = new WebSocket('ws://localhost:10585');
				// connection = new WebSocket('ws://chat.get-scatter.com');

				connection.onopen = () => this.getMessages();

				connection.onclose = () => {
					console.error('disconnected');
				};

				connection.onerror = (error) => {
					console.error('failed to connect', error);
				};

				connection.onmessage = (event) => {
					console.log('received', event.data);
					try {
						const data = JSON.parse(event.data);
						if(Array.isArray(data)) data.map(x => this.addMessage(x));
						else this.addMessage(data);


					} catch(e){
						// just catching json errors.
						// Really, if this throws an error, it should just fail.
					}
				};
			},

			selectAccount(){
				PopupService.push(Popup.selectAccount(account => {
					if(!account) return;
					this.sender = account;
				}));
			},

			getMessages(){
				connection.send('get_messages');
			},

			addMessage(data){
				this.messages.push(data);
				this.$nextTick(() => this.scrollToBottom());

				// Only latest 250 messages are available.
				if(this.messages.length > 250) this.messages.shift();
			},

			async send(){
				this.error = null;
				if(this.message.length > 500) return this.error = 'Message is too long (1000 chars max)';

				try {
					const nonce = IdGenerator.text(24);
					connection.send(JSON.stringify({
						nonce,
						user:{
							blockchain:this.sender.network().blockchain,
							chainId:this.sender.network().chainId,
							publicKey:this.sender.publicKey,
							sender:this.sender.sendable(),
						},
						sig:await SigningService.sign(
							this.sender.network(),
							{data:`msg::${this.message}:${nonce}`},
							this.sender.publicKey,
							true,
						),
						message:this.message
					}));
					this.message = '';
				} catch(e){
					console.error('ERR!', e);
				}
			},

			scrollToBottom(){
				this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
			},

			systemTokenFor(user){
				const plugin = PluginRepository.plugin(user.blockchain);
				if(!plugin) return null;
				return plugin.defaultToken().symbolClass();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.chat {
		position:fixed;
		bottom:0;
		right:-50%;
		top:80px;
		z-index:100;
		width:50%;
		border-left:1px solid $border-standard;
		background:$white;
		padding:0 15px 15px;

		transition:right 0.15s ease;

		&.open {
			right:0;
		}

		.inner {
			height:100%;
			display:flex;
			flex-direction: column;

			.input {
				border-radius:$radius;
				background: $white;
				flex:0 0 auto;
				margin-top:10px;

				display:flex;

				button {
					display:inline-block;
					margin-left:5px;
					font-size: 9px;
					flex:0 0 auto;
					text-transform: none;
				}
			}

			.display {
				border-radius:$radius;
				background: #fbfbff;
				flex:1;
				box-shadow:inset 0 0 2px rgba(0,0,0,0.05);
				padding:10px 10px 60px 10px;
				overflow-y: auto;

				.login {
					position:absolute;
					top:0;
					bottom:0;
					left:0;
					right:0;
					display:flex;
					align-items: center;
					justify-content: center;

					.box {
						padding:20px;
						background:$white;
						display:flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						border-radius:$radius;
						z-index:2;
						box-shadow:0 3px 10px rgba(0,0,0,0.05);
					}
				}

				.message {
					padding:10px;
					background:$white;
					border-radius:$radius;
					box-shadow:0 1px 2px rgba(0,0,0,0.05);
					display:table;
					margin-bottom:10px;

					.head-bar {
						display:flex;
						justify-content: space-between;
						align-items: center;

						.chain {
							font-size: 16px;
						}

						.user {
							font-size: 11px;
							font-weight: bold;
							flex:1;
						}

						.proof {
							font-size: 11px;
							cursor: pointer;
							position: relative;
							flex:0 0 auto;
							margin-left:30px;

							.floater {
								display:none;
								position:absolute;
								top:15px;
								background:$white;
								width:250px;
								box-shadow:0 4px 10px rgba(0,0,0,0.08);
								padding:10px;
								border-radius:$radius;
								z-index:2;

								label {
									font-size: 9px;
									margin:0;
									margin-bottom:2px;
								}

								span {
									font-size: 9px;
								}
							}

							&:hover {
								.floater {
									display:block;
								}
							}
						}

						.timestamp {
							margin-left:5px;

						}
					}


					.text {
						font-size: 14px;
						margin-top:10px;
					}
				}
			}
		}

	}

</style>
