<template>
	<div class="wrapper" v-title="'交易明细'">
		<h3 class="chose_guige">选择分类</h3>
		<ul class="chose_list clearfix">
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'1'}}" replace>转入</router-link></li>
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'5'}}" replace>转出</router-link></li>
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'2'}}" replace>充值</router-link></li>
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'4'}}" replace>购买商品</router-link></li>
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'3'}}" replace>福利发放</router-link></li>
			<li><router-link :to="{path:'/cion/cion_trade',query:{tradeType:'6'}}" replace>抽奖发放</router-link></li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {

	}
</script>
<style lang="less" scoped>
	.wrapper{
		background: #fff;
	}
	.chose_guige {
		padding: 0.3rem;
		font-size: 0.3rem;
		font-weight: normal;
	}
	.chose_list li {
		float: left;
		border: 1px solid #707070;
		border-radius: 4px;
		width: 2rem;
		height: 0.65rem;
		line-height: 0.65rem;
		text-align: center;
		margin-left: 0.3rem;
		margin-bottom: 10px;
		font-size: 0.26rem;
		a{
			display: block;
		}
	}
</style>