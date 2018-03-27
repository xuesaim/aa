<template>
	<div class="wrapper" v-title="'支付'">
		<div class="success">
			<img src="../../assets/img/cion/pay_success.png"/>
			<p>支付成功！</p>
			<p class="special">小福会马不停蹄的为您安排发货</p>
		</div>
		<div class="succ_bottom">
			<p class="cion_tip"><img src="../../assets/img/cion/tips.png"><span class="v-middle">为保证尽快收到商品，您的订单有可能被拆分成多个以便同时安排出库哦。</span></p>
			<router-link :to="{path:'/order/totle',query:{order_status:'0'}}" class="order_look">查看订单</router-link>
			<router-link to="/" v-if="state=='107'">返回商城首页</router-link>
			<router-link to="/prefer/index" v-if="state=='105'">返回商城首页</router-link>
		</div>
	</div>
</template>
<script>
	export default({
		name: "success",
		data() {
			return {
				state: this.$route.query.state,
			}
		},
	})
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family:PingFangSC-Medium;
		font-size: 0.3rem;
		background: #fff;
		padding-top:1.5rem;
		.success{
			/*height: 2.2rem;*/
			padding:0 0 0.5rem;
			text-align: center;
			img{
				display: block;
				width: 4.4rem;
				height: 3rem;
				margin: 0 auto;
			}
			p{
				padding-top: 0.5rem;
				margin-bottom: 0.2rem;
				
				&.special{
					padding-top: 0;
				}
			}
		}
		.succ_bottom{
			padding: 0 0.3rem;
			.cion_tip {
				padding: 0.3rem 0;
				font-size: 0.24rem;
				color: #9b9b9b;
				display: flex;
				img {
					width: 0.28rem;
					height: 0.28rem;
					margin-right: 0.1rem;
					margin-top: 0.05rem;
				}
			}
			a{
				display: block;
				width: 100%;
				height: 0.9rem;
				line-height: 0.9rem;
				text-align: center;
				border-radius: 4px;
				font-size: 0.36rem;
				margin-top: 0.5rem;
				border:1px solid #979797;
				box-sizing: border-box;
				&.order_look{
					color: #fff;
					border: none;
					background: #78bfff;
				}
			}
		}
	}
	
</style>