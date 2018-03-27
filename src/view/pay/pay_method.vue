<template>
	<div class="wrapper" v-title="'支付'">
		<div class="totle_price clearfix">
			<span class="left">商品总价：</span>
			<span class="left color-ff2c2c">￥{{order_totalprice | toFloat}}</span>
		</div>
		<div class="confirm" v-if="paymentType==105">
			<div class="clearfix bzk" @click="check1">
				<label :class="{active:isActive2}"></label>
				<span class="mr10">保障卡</span>
				<span class="right color-ff2c2c">{{balance | toFloat}}</span>
			</div>
			<div class="pay_password" v-if="isActive2">
				<input type="password" name="" id="" value="" placeholder="请填写保障卡支付密码" v-model="userCode"/>
			</div>
		</div>
		<div class="confirm" v-if="paymentType==105 ||paymentType==104">
			<div class="clearfix" @click="check2">
				<label :class="{active:paymentType==104?true:isActive}"></label>
				<span class="mr10">支付宝支付</span>
				<span class="right color-ff2c2c" v-if="isActive && isActive2==false">￥{{order_totalprice | toFloat}}</span>
				<span class="right color-ff2c2c" v-if="yueshow && isActive==true && isActive2==true">￥{{(Math.round(order_totalprice*100) - Math.round(balance*100))/100 | places}}</span>
			</div>
		</div>
		<a class="" @click="pay">确认支付</a>
		<div>
			<form ref="mybox" id="alipaysubmit" name="alipaysubmit" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="get">
				<input type="hidden" name="sign" :value="sPara.sign" />
				<input type="hidden" name="_input_charset" :value="sPara._input_charset" />
				<input type="hidden" name="subject" :value="sPara.subject" />
				<input type="hidden" name="total_fee" :value="sPara.total_fee" />
				<input type="hidden" name="sign_type" :value="sPara.sign_type" />
				<input type="hidden" name="service" :value="sPara.service" />
				<input type="hidden" name="notify_url" :value="sPara.notify_url" />
				<input type="hidden" name="partner" :value="sPara.partner" />
				<input type="hidden" name="seller_id" :value="sPara.seller_id" />
				<input type="hidden" name="out_trade_no" :value="sPara.out_trade_no" />
				<input type="hidden" name="payment_type" :value="sPara.payment_type" />
				<input type="hidden" name="return_url" :value="sPara.return_url" />
				<input type="hidden" name="show_url" :value="sPara.show_url" />
				<input type="submit" value="确认" style="display:none;">
			</form>
		</div>
	</div>
</template>
<script>
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "activation-get",
		data() {
			return {
				isActive: true,
				isActive2: false,
				paymentType: this.$route.query.paymentType,
				ordertype: this.$route.query.ordertype,
				userCode: '',
				Active: true,
				active: false,
				token: window.localStorage.getItem("token"),
//				token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiJkMDk3NjAyOTE5ODI0OTkwOGZlYjBiNzIwOWNlOWExNyNjNmUyZDllMzY1OGE0OTg5Yjg0ZjhiMmZlMGE5NTNkNSMyMDAwIn0.ClVzHMeCUPcmsolP7-wqcG3rRtXVdZqRW3lXU9AID80',
				order_totalprice: this.$route.query.order_totalprice,
				orderId: this.$route.query.orderId,
				balance: '0',
				yueshow: false,
				submithtml: '',
				sPara: '',
				form_action: ''
			}
		},
		mounted() {
			if(this.paymentType ==105){
				this.getMoney();
			}
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
			getMoney() {
				let _this = this;
				this.$tool.sendOPtion(this, com.order_hosturl + "/guaranteepay/querycredit.json", {
				}, "get", true, function(res) {
					if(res.bizCode=="000000") {
						_this.balance = res.data;
						
						if(_this.paymentType==105){
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
						this.payZhifubao('use')
					} else {
						this.payZhifubao('')
					}

				}

			},
			payBzk() {
				let _this = this;
				if(_this.userCode != "") {
					_this.$tool.sendOPtion(this, com.order_hosturl + "/wechat/guaranteepay.json", {
						orderId: _this.orderId,
						verificationCode: _this.userCode,
						token: _this.token
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
						message: '支付密码不能为空',
						position: 'top',
						duration: 1000
					});
					return false;
				}

			},
			payZhifubao(use_bz) {
				let _this = this;
				if(use_bz == "use") {
					if(_this.userCode == "" || _this.userCode == null || _this.userCode == "undefined") {
						Toast({
							message: "支付密码不能为空",
							position: 'top',
							duration: 1000
						});
						return false;
					} else {
						_this.$tool.sendOPtion(this, com.order_hosturl + "/alipay/alipay.json", {
							orderid: _this.orderId,
							token: _this.token,
							use_bz: use_bz,
							verificationCode: _this.userCode

						}, "POST", true, function(res) {
							if(res.data) {
								_this.form_action = res.data.form_action;
								_this.sPara = res.data.sPara;
								setTimeout(_this.timedMsg, 1000)

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
					_this.$tool.sendOPtion(this, com.order_hosturl + "/alipay/alipay.json", {
						orderid: _this.orderId,
						token: _this.token,
						use_bz: use_bz,
						verificationCode: _this.userCode

					}, "POST", true, function(res) {
						if(res.data) {
							_this.form_action = res.data.form_action;
							_this.sPara = res.data.sPara;
							setTimeout(_this.timedMsg, 1000)
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
			timedMsg() {
				this.$refs.mybox.submit()

			},
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
			background: #fff;
			
			&>div{
				padding: 0.3rem 0.3rem 0.3rem;
			}
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
			.pay_password{
				border-top: 1px solid #f7f7f7;
				input{
					border: none;
					width: 100%;
					text-indent: 0.56rem;
					outline:none;
					font-size: 0.3rem;
					letter-spacing:0.05rem;
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