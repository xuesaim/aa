<template>
	<div class="wrapper" v-title="'支付'">
		<div class="text-center">
			<img src="../../assets/img/cion/success.png" />
			<p v-if="state==3">购买成功!</p>
			<p v-if="state==2">购买成功：{{transfer_money | toFloat}}福币</p>
			<p v-if="state==1">转账成功：{{transfer_money | toFloat}}福币</p>
		</div>
		<div class="button">
			<router-link v-if="state==3" :to="{path:'/order/totle',query:{order_status:'0'}}" class="btn-red btn">查看订单</router-link>
			<router-link v-if="state==2" :to="{path:'/order/totle',query:{order_status:'0',tradeType:'2'}}" class="btn-red btn">查看订单</router-link>
			<router-link v-if="state==1" :to="{path:'/cion/trade_detail',query:{tradeno:tradeno,tradeType:'5'}}" class="btn-red btn">查看订单详情</router-link>
			<router-link to="/cion/cion_account" class="btn-white btn mt30">返回我的福币</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default({
		name: "success",
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
	.text-center img {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem 0 0.1rem;
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