<template>
	<div class="wrapper" v-title="'支付'">
		<div class="clearfix payment">
			<span class="left">商品总价:</span>
			<span class="left color-ff2c2c">￥{{order_totalprice | toFloat}}</span>
		</div>
		<div class="clearfix payment" @click="check" v-if="paymentType==107?true:false">
			<label class="left" :class="{active:isActive2}"></label>
			<span class="left">福币可抵扣</span>
			<!--<span class="color-ff2c2c left"></span>
			<span class="right color-ff2c2c">余额:￥698.00</span>-->
		</div>
		<div class="payment clearfix" @click="check">
			<label class="left" :class="{active:paymentType==103?true:isActive}"></label>
			<span  class="left">微信支付</span>
		</div>
		<a href="javascript:;" @click="postData">确认支付</a>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
				return {
					order_totalprice: this.$route.query.order_totalprice,
					paymentType: this.$route.query.paymentType,
					orderId: this.$route.query.orderId,
					isActive: false,
					isActive2: true,
					skuid: this.$route.query.skuid,
					token: window.localStorage.getItem("token"),
//					token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiIxNDMyNSMxNTY0MyMxMDMyIn0.OQ3MHInUv1HQgbfvRIKnv4DIi8ycHu5Ne7-0h5-uEHA',
					userId: window.localStorage.getItem("userId"),
					appId: '',
					timestamp: '',
				}
			},
			methods: {
				check() {
					this.isActive = !this.isActive,
					this.isActive2 = !this.isActive2
				},
				postData() {
					let _this = this;
					_this.$tool.sendOPtion(this, com.order_hosturl + "/wechat/wxpay.json", {
						orderid: _this.orderId,
						token:_this.token
					}, "get", true, function(res) {
						if(res.data) {
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
				},
				onBridgeReady(payJson) {
					let _this=this;
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
									_this.$router.push({
										path: '/pay/order_success',
										query: {
											state: 2,
											transfer_money: _this.order_totalprice,
										}
									});
								} else {
									_this.$router.push({
										path: '/pay/order_faile',
										query: {
											state: 2,
											transfer_money: _this.order_totalprice,
										}
									});
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
	}
</script>

<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Medium;
		.payment {
			font-size: 0.3rem;
			padding: 0.2rem 0.3rem;
			margin-bottom: 0.2rem;
			background: #fff;
			label {
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
		}
		a {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ff2c2c;
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.36rem;
			color: #ffffff;
			text-align: center;
		}
	}
</style>