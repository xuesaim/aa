<template>
	<div class="wrapper" v-title="'充福币'">
		<h3 class="chose_guige">请选择充值规格</h3>
		<ul class="mt20 clearfix">
			<li class="clearfix" v-for="(item, index) in rechargeList">
				<!--<router-link :to="{path:'/pay/payment',query:{skuid:item.skuid}}">-->
				<a @click="getData(item.skuid)" href="javascript:;">
					<img class="left" v-if="item.thumbPath" :src="item.thumbPath" />
					<img class="left" v-else src="../../assets/img/cion/img1.jpg" />
					<div class="left text-center">
						{{item.faceVal}}
					</div>
				</a>
				<!--</router-link>-->
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "recharge",
		data() {
			return {
				moneyList: '',
				token:window.localStorage.getItem("token"),
				rechargeList:com.rechargeList
			}
		},
		methods: {
			getData(skuid) {
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/createFBOrder.json", {
					skuid: skuid,
					skunum: '1',
					token: _this.token
				}, "get", true, function(res) {
					if(res.data) {
						_this.order_totalprice = res.data.order_totalprice;
						_this.paymentType = res.data.paymentType;
						_this.orderId = res.data.orderId;
						_this.$router.push({
							path: '/pay/payment',
							query: {
								order_totalprice: _this.order_totalprice,
								paymentType: _this.paymentType,
								orderId: _this.orderId,
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
			},
		}

	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		background: #fff;
		font-family: PingFangSC-Regular;
		.chose_guige {
			padding: 0.3rem;
			font-size: 0.3rem;
			font-weight: normal;
			font-family: PingFangSC-Medium;
		}
		li {
			float: left;
			width: 3.3rem;
			margin-left: 0.3rem;
			height: 1.2rem;
			line-height: 1.2rem;
			margin-bottom: 0.3rem;
			background: #eeeeee;
			a {
				display: block;
				width: 100%;
				height: 100%;
				font-family: PingFangSC-Medium;
				div {
					width: 2.1rem;
				}
				img {
					width: 1.2rem;
					height: 1.2rem;
				}
			}
		}
	}
</style>