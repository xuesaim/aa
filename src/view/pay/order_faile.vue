<template>
	<div class="wrapper" v-title="'支付'">
		<div class="text-center">
			<img src="../../assets/img/cion/pay_faile.png" />
			<p v-if="state==3">支付失败啦</p>
			<p v-if="state==2">购买失败</p>
			<p v-if="state==1">转账失败</p>
		</div>
		<div class="button">
			<router-link v-if="state==3" :to="{path:'/order/totle',query:{order_status:'0'}}" class="btn-red btn">查看订单</router-link>
			<router-link v-if="state==2" :to="{path:'/order/totle',query:{order_status:'0',tradeType:'2'}}" class="btn-red btn">查看订单</router-link>
			<router-link v-if="state==1" :to="{path:'/cion/trade_detail',query:{tradeno:tradeno,tradeType:'5'}}" class="btn-red btn">查看订单详情</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default({
		name: "faile",
		data() {
			return {
				tradeno: this.$route.query.tradeno,
				state: this.$route.query.state,
				transfer_money: this.$route.query.transfer_money,
			}
		},
	})
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	background: #fff;
	.text-center img {
		width: 4.4rem;
		height: 3rem;
		margin: 2rem 0 0.4rem;
	}
	
	.text-center p {
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.36rem;
	}
	
	.button {
		padding: 1.5rem 0.3rem 0;
	}
}
	
	
</style>