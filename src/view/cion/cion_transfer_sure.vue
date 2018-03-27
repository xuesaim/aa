<template>
	<div class="wrapper" v-title="'转福币'">
		<div class="text-center trade_top">
			<span class="font30">爱福客福币转出</span>
			<p class="font70">{{transfer_money | toFloat}}</p>
		</div>
		<div class="yanzhengma clearfix">
			<input type="text" name="" id="" value="" placeholder="短信验证码" v-model="userCode" />
			<button :disabled="!isActive" :class="{ 'hqcodebtn': isActive ,'hhqcodebtn':active }" @click="getCode">{{mess}}</button>
		</div>
		<div class="submit">
			<p class="cion_tip"><img src="../../assets/img/cion/tips.png"><span class="v-middle">本次操作需要短信确认，请输入{{mobile | mobileTurn}}收到的短信验证码,（此处当日最多获取20次验证码）</span></p>
			<button class="btn btn-ff6161 mt100 font36" @click='transfer' :disabled="isDis">立即转账</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import md5 from 'js-md5';
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "activation-get",
		data() {
			return {
				userCode: '',
				isActive: true,
				active: false,
				mess: "获取验证码",
				employeeId:'',
				mobile:window.localStorage.getItem("loginCode"),
				token:window.localStorage.getItem("token"),
				userId:window.localStorage.getItem("userId"),
				transfer_money: this.$route.query.transfer_money,
				receiverName: this.$route.query.receiverName,
				receiverMobile: this.$route.query.receiverMobile,
				id: this.$route.query.id,
				tradeno:'',
				isDis:false
			}
		},
		methods: {
			timer(s) {
				let _this = this;
				_this.isActive = false;
				_this.mess = s + "后重获取";
				var t = setInterval(function() {
					s--;
					_this.mess = s + "后重获取";
					if(s == 0) {
						clearInterval(t);
						_this.isActive = true;
						_this.mess = "获取验证码"
					}
					return s;

				}, 1000)
			},
			getCode() {
				let _this = this;
				_this.$tool.sendOPtion(_this, com.cion_hosturl + '/avicoinapi/sendMsgCode.share', {
					phone: _this.mobile,
					msgType:'3'
				}, "POST", true, function(res) {
					if(res.success) {
						_this.timer(60);
						Toast({
							message: '验证码发送成功!',
							position: 'top',
							duration: 1000
						});
					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				})

			},
			transfer() {
				let _this = this;
				_this.isDis=true;
				var device = navigator.userAgent;
				var channel=encodeURI("爱福客微信端");
				var keyt = md5('qiban@*avi^&smarttrust'+channel+_this.userId+Math.round(_this.transfer_money*100)+_this.id+_this.userCode+'qiban@*avi^&smarttrust');
				keyt=keyt.toUpperCase();
				if( _this.userCode != "") {
					this.$tool.sendOPtion(this, com.cion_hosturl + "/avicoinapi/transferAviCoin.share", {
						token: _this.token,
						aviCoin:Math.round(_this.transfer_money*100),
						fromId: _this.userId,
						receiveId: _this.id,
						receiveName:_this.receiverName,
						receivePhone:_this.receiverMobile,
						msgCode:_this.userCode,
						channel: channel,
						device: device,
						sign: keyt
					}, "POST", true, function(res) {
						if(res.success) {
							_this.tradeno=res.data.transferNo
							_this.$router.push({
								path: '/pay/order_success',
								query: {
			                        state: 1,
			                        transfer_money:_this.transfer_money,
			                        tradeno:_this.tradeno,
			                    }
							});
						} else {
							Toast({
								message: res.bizMessage,
								position: 'top',
								duration: 1000
							});
							_this.isDis=false;
//							_this.$router.push({
//								path: '/pay/order_faile',
//								query: {
//			                        state: 1
//			                    }
//							});
						}
					})
				} else {
					if(_this.userCode == "") {
						Toast({
							message: '验证码不能为空',
							position: 'top',
							duration: 1000
						});
						_this.isDis=false;
						return false;
					}

				}
			}
		}
	})
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		background: #fff;
		.trade_top {
			font-size: 0.36rem;
			padding: 0.5rem 0;
			img {
				width: 0.5rem;
				height: 0.5rem;
				vertical-align: middle;
				margin-right: 10px;
			}
			span {
				vertical-align: middle;
			}
			p {
				font-size: 0.5rem;
				margin-top: 10px;
			}
		}
		.trade_list {
			padding: 0 0.3rem;
		}
		.yanzhengma {
			padding: 0 0.3rem;
			input {
				float: left;
				height: 0.84rem;
				padding: 0 2%;
				width: 66%;
				border: 1px solid #b0b0b0;
				box-sizing: border-box;
				font-size: 0.3rem;
				font-family: PingFangSC-Regular;
				border-radius: 0;
			}
			button{
				float: left;
				border: none;
				height: 0.84rem;
				padding: 0 2%;
				font-family: PingFangSC-Regular;
				font-size: 0.3rem;
				color: #ffffff;
				text-align: center;
				background: #ccc;
			}
			.hqcodebtn {
				float: left;
				width: 30%;
				height: 0.84rem;
				padding: 0 2%;
				border: none;
				color: #fff;
				text-align: center;
				font-size: 0.3rem;
				background: #ff6161;
				font-family: PingFangSC-Regular;
			}
			.hhqcodebtn {
				float: left;
				border: none;
				height: 0.84rem;
				padding: 0 2%;
				font-family: PingFangSC-Regular;
				font-size: 0.3rem;
				color: #ffffff;
				text-align: center;
				background: #ccc;
			}
		}
		.cion_tip {
			padding: 0.3rem 0;
			font-size: 0.24rem;
			color: #9b9b9b;
			vertical-align: middle;
			border-bottom: 1px solid #d7d7d9;
			img {
				width: 0.28rem;
				height: 0.28rem;
				vertical-align: middle;
				margin-right: 0.1rem;
			}
		}
		.submit {
			padding: 0 0.3rem;
			button{
				border: none;
			}
		}
	}
</style>