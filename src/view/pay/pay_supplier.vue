<template>
	<div class="wrapper" v-title="'支付'">
		<div class="totle_price clearfix">
			<span class="left">商品总价：</span>
			<span class="left color-ff2c2c">￥{{order_totalprice | toFloat}}</span>
		</div>
		<div class="confirm" v-if="paymentType==108">
			<div class="clearfix" @click="check1">
				<label :class="{active:isActive2}"></label>
				<span class="mr10">保障卡</span>
				<!--<span class="color-ff2c2c left">{{deduction}}</span>-->
				<span class="right color-ff2c2c">{{balance | toFloat}}</span>
			</div>
			<div class="yanzhengma clearfix" v-if="isActive2">
				<input type="text" name="" id="" value="" placeholder="输入验证码" v-model="userCode" />
				<button :disabled="!Active" :class="{ 'hqcodebtn': Active ,'hhqcodebtn':active }" @click="getCode">{{mess}}</button>
			</div>
			<div class="submit" v-if="isActive2">
				<p class="cion_tip clearfix"><img class="left" src="../../assets/img/cion/tip.png"><span class="v-middle left" style="width: 6.4rem;">本次操作需要短信确认，请输入{{mobile | mobileTurn}}收到的短信验证码</span></p>
			</div>
		</div>
		<div class="confirm" v-if="paymentType==108">
			<div class="clearfix" @click="check2">
				<label :class="{active:isActive}"></label>
				<span class=" mr10">微信支付</span>
				<span class="right color-ff2c2c" v-if="isActive && isActive2==false">￥{{order_totalprice | toFloat}}</span>
				<span class="right color-ff2c2c" v-if="yueshow && isActive==true && isActive2==true">￥{{(Math.round(order_totalprice*100) - Math.round(balance*100))/100 | places}}</span>
			</div>
		</div>
		<a class="" @click="pay">确认支付</a>
	</div>
</template>
<script>
	import md5 from 'js-md5';
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "pay_supplier",
		data() {
			return {
				isActive: true,
				isActive2: false,
				paymentType: this.$route.query.paymentType,
				ordertype: this.$route.query.ordertype,
				userCode: '',
				Active: true,
				active: false,
				mess: "获取验证码",
				employeeId: '',
				mobile:'',
				token: window.localStorage.getItem("token"),
//				token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiJjMmNmNTQ4NTQ4YWI0ZGZlODU3OTE5Y2YzYzdhNDQzYiMzMjEyNjNlYTk1NjA0NWQ2OWU3YmFjNDkwMTU1YWMyYyMxMDcyIn0.hPjlLxD5ZJyMMCULPFeWgvvZP1f0FXdJUUZ_SeuXqEE',
				userId:'',
				order_totalprice: this.$route.query.order_totalprice,
				orderId: this.$route.query.orderId,
				balance: '0',
				yueshow: false,
			}
		},
		mounted() {
			this.getUser();
		},
		methods: {
			check1() {
				if(parseFloat(this.balance) == 0) {
					this.isActive2 = false;
				} else if(parseFloat(this.balance) < parseFloat(this.order_totalprice)) {
					this.isActive = true;
					this.isActive2 = true;
					this.yueshow = true
				} else {
					this.isActive2 = true;
					this.isActive = false;
					this.yueshow = false
				}
			},
			check2() {
				if(parseFloat(this.balance) < parseFloat(this.order_totalprice)) {
					this.isActive = true;
					this.isActive2 = false;
				} else {
					this.isActive = true;
					this.isActive2 = false
				}

			},
			timer(s) {
				let _this = this;
				_this.Active = false;
				_this.mess = s + "后重获取";
				var t = setInterval(function() {
					s--;
					_this.mess = s + "后重获取";
					if(s == 0) {
						clearInterval(t);
						_this.Active = true;
						_this.mess = "获取验证码"
					}
					return s;

				}, 1000)
			},
			getCode() {
				let _this = this;
				_this.$tool.sendOPtion(_this, com.cion_hosturl + '/avicoinapi/sendMsgCode.share', {
					phone: _this.mobile,
					msgType: '1'
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
			getUser() {
				let _this = this;
				_this.$tool.sendOPtion(_this, com.loginhosturl + '/unlogin/passport/findUserInfoByToken', {
					utoken: _this.token,
				}, "get", true, function(res) {
					if(res.success) {
						_this.userId = res.value.userId;
						_this.mobile = res.value.loginCode;
						_this.getMoney();

					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				});
			},
			getMoney() {
				var device = navigator.userAgent;
				var channel = encodeURI("爱福客微信端");
				let _this = this;
				_this.$tool.sendOPtion(_this, com.market_hosturl + "/guaranteeapi/guarantee.share", {
					token: _this.token,
					userId: _this.userId,
					channel: channel,
					device: device,
				}, "get", true, function(res) {
					if(res.success) {
						_this.credit = res.data.credit;
						_this.balance = res.data.balance;
						_this.repayment = res.data.repayment;
						
						if(_this.paymentType==108){
							if(parseFloat(_this.balance) == 0) {
								_this.isActive2 = false;
							} else if(parseFloat(_this.balance) < parseFloat(_this.order_totalprice)) {
								_this.isActive = true;
								_this.isActive2 = true;
								_this.yueshow = true
							} else {
								_this.isActive2 = true;
								_this.isActive = false;
								_this.yueshow = false
							}
						}else{
							_this.isActive2 = false;
							_this.isActive = true;
						}

					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				})
			},
			pay() {
				if(this.isActive2 && this.isActive == false) {
					this.payBzk()
				} else if(this.isActive) {
					if(this.isActive2) {
						this.payWeixin('bzk')
					} else {
						this.payWeixin('')
					}
				}
			},
			payBzk() {
				let _this = this;
				if(_this.userCode != "") {
					_this.$tool.sendOPtion(this, com.order_hosturl + "/wechat/guaranteepay.json", {
						orderId: _this.orderId,
						verificationCode: _this.userCode,
						cellphone: _this.mobile,
						token: _this.token,
						msgType: '1'
					}, "POST", true, function(res) {
						if(res.bizMessage == "操作成功") {
							_this.$router.push({
								path: '/pay/pay_success',
								query: {
									state: 105,
								}
							});

						} else {
							Toast({
								message: res.bizMessage,
								position: 'top',
								duration: 1000
							});
							return false;
						}
					})
				} else {
					Toast({
						message: '验证码不能为空',
						position: 'top',
						duration: 1000
					});
					return false;
				}

			},
			payWeixin(use_fb) {
				let _this = this;
				if(use_fb == "bzk") {
					if(_this.userCode == "" || _this.userCode == null || _this.userCode == "undefined") {
						Toast({
							message: "验证码不能为空",
							position: 'top',
							duration: 1000
						});
						return false;
					} else {
						_this.$tool.sendOPtion(this, com.order_hosturl + "/wechat/wxpay.json", {
							orderid: _this.orderId,
							token: _this.token,
							use_fb: use_fb,
							verificationCode: _this.userCode

						}, "POST", true, function(res) {
							if(res.bizCode=="000000") {
								var payJson = res.data;
								if(typeof WeixinJSBridge == "undefined") {
									if(document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady, false);
									} else if(document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady);
										document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady);
									}
								} else {
									_this.onBridgeReady(payJson);

								}
							} else {
								Toast({
									message: res.bizMessage,
									position: 'top',
									duration: 1000
								});
								return false;
							}

						})

					}
				} else {
					_this.$tool.sendOPtion(this, com.order_hosturl + "/wechat/wxpay.json", {
						orderid: _this.orderId,
						token: _this.token,
						use_fb: use_fb,
						verificationCode: _this.userCode

					}, "POST", true, function(res) {
						if(res.bizCode=="000000") {
							var payJson = res.data;
							if(typeof WeixinJSBridge == "undefined") {
								if(document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady, false);
								} else if(document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady);
								}
							} else {
								_this.onBridgeReady(payJson);

							}
						} else {
							Toast({
								message: res.bizMessage,
								position: 'top',
								duration: 1000
							});
							return false;
						}
					})
				}
			},
			onBridgeReady(payJson) {
				let _this = this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": payJson.appId, //公众号名称，由商户传入
						"timeStamp": payJson.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": payJson.nonceStr, //随机串     
						"package": payJson.package,
						"signType": payJson.signType, //微信签名方式：     
						"paySign": payJson.paySign, //微信签名 
					},
					function(res) {
						if(res && res.err_msg) {
							if(res.err_msg.indexOf("get_brand_wcpay_request") >= 0 && res.err_msg.indexOf("ok") >= 0) {
								// 使用以上方式判断前端返回，微信团队郑重提示：get_brand_wcpay_request:ok
								// res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠
								if(_this.ordertype == 4) {
									_this.$router.push({
										path: '/pay/order_success',
										query: {
											state: 2,
											transfer_money: _this.order_totalprice
										}
									});
								} else {
									_this.$router.push({
										path: '/pay/pay_success',
										query: {
											state: 107,
										}
									});
								}
							} else {
								if(_this.ordertype == 4) {
									_this.$router.push({
										path: '/pay/order_faile',
										query: {
											state: 2,
											transfer_money: _this.order_totalprice
										}
									});
								} else {
									_this.$router.push({
										path: '/pay/order_faile',
										query: {
											state: 3,
										}
									});
								}
							}
						} else {
							Toast({
								message: '请使用微信公众号',
								position: 'top',
								duration: 1000
							});
							return false;
						}
					}
				);
			}
		}
	})
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Medium;
		font-size: 0.3rem;
		.totle_price {
			padding: 0.2rem 0.3rem;
			background: #fff;
			span {
				margin-right: 0.15rem;
			}
		}
		.confirm {
			margin-top: 0.2rem;
			padding: 0.3rem 0.3rem 0.3rem;
			background: #fff;
			label {
				display: inline-block;
				width: 0.38rem;
				height: 0.38rem;
				background: url(../../assets/img/cion/radio_gray.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
				margin-right: 0.1rem;
				&.active {
					width: 0.38rem;
					height: 0.38rem;
					background: url(../../assets/img/cion/radio.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			span{
				display: inline-block;
				vertical-align: middle;
			}
			.yanzhengma {
				margin-top: 0.4rem;
				input {
					float: left;
					height: 0.84rem;
					padding: 0 2%;
					width: 70%;
					border: 1px solid #b0b0b0;
					box-sizing: border-box;
					border-radius: 0;
				}
				button {
					float: left;
					border: none;
					height: 0.84rem;
					padding: 0 2%;
					font-family: PingFangSC-Regular;
					font-size: 0.3rem;
					color: #ffffff;
					text-align: center;
					background: #ccc;
					border: 1px solid #ccc;
				}
				.hqcodebtn {
					float: left;
					width: 30%;
					padding: 0 2%;
					height: 0.84rem;
					border: none;
					color: #fff;
					text-align: center;
					font-size: 0.3rem;
					background: #78bfff;
					border: 1px solid #78bfff;
					font-family: PingFangSC-Regular;
				}
				.hhqcodebtn {
					float: left;
					border: none;
					padding: 0 2%;
					height: 0.84rem;
					font-family: PingFangSC-Regular;
					font-size: 0.3rem;
					color: #ffffff;
					text-align: center;
					background: #ccc;
				}
			}
			.submit {
				.cion_tip {
					padding: 0.3rem 0;
					font-size: 0.24rem;
					color: #9b9b9b;
					vertical-align: middle;
					img {
						width: 0.28rem;
						height: 0.28rem;
						vertical-align: middle;
						margin-right: 0.1rem;
						margin-top: 0.06rem;
					}
				}
			}
		}
		.pay_w {
			margin-top: 0.2rem;
			padding: 0.2rem 0.3rem;
			background: #fff;
		}
		a {
			position: fixed;
			bottom: 0;
			left: 0;
			background: #ff2c2c;
			width: 100%;
			height: 0.9rem;
			line-height: 0.9rem;
			text-align: center;
			color: #fff;
			font-size: 0.36rem;
		}
	}
</style>