<template>
	<div class="wrapper" v-title="'转福币'">
		<div class="text-center trade_top">
			请核对账户信息
		</div>
		<ul class="trade_list">
			<li class="clearfix">
				<label class="left">到账人姓名:</label>
				<span class="right">{{receiverName}}</span>
			</li>
			<li class="clearfix">
				<label class="left">到账人手机:</label>
				<span class="right">{{receiverMobile}}</span>
			</li>
			<li class="clearfix">
				<label class="left">转出福币:</label>
				<span class="right">{{transfer_money | toFloat}}</span>
			</li>
		</ul>
		<div class="clearfix btns">
			<router-link :to="{path:'/cion/cion_transfer',query:{money:money}}" class="left">取消</router-link>
			<router-link :to="{path:'/cion/cion_transfer_sure',query:{transfer_money:transfer_money,id:id,receiverName:receiverName,receiverMobile:receiverMobile}}" class="right red">确认</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "check",
		data() {
			return {
				aviCoin: '',
				receiverName: this.$route.query.receiverName,
				receiverMobile: this.$route.query.receiverMobile,
				transfer_money: this.$route.query.transfer_money,
				money: this.$route.query.money,
				id: this.$route.query.id,
			}
		},
	})
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	padding-bottom: 0.2rem;
	background: #fff;
	font-family: PingFangSC-Regular;
	.trade_top {
		font-size: 0.36rem;
		padding: 0.5rem 0;
		
		img{
			width: 0.5rem;
			height: 0.5rem;
			vertical-align: middle;
			margin-right: 10px;
		}
		
		span{
			vertical-align: middle;
		}
		p{
			font-size: 0.5rem;
			margin-top: 10px;
		}
	}
	
	.trade_list {
		padding: 0 0.3rem;
		
		li{
			font-size: 0.3rem;
			padding: 0.2rem 0;
			border-bottom: 1px solid #e6e6e6;
			
			&:last-child {
				border-bottom: none;
			}
		}
	}
	
	.btns {
		margin-top: 1rem;
		padding: 0 0.3rem;
		
		a{
			width: 45%;
			height: 0.9rem;
			line-height: 0.9rem;
			border: 1px solid #4a4a4a;
			text-align: center;
			border-radius: 4px;
			color: #232323;
			box-sizing: border-box;
			&.red{
				border: none;
				color: #fff;
				color: #fff;
				background: #ff6161;
			}
		}
	}
}
	
</style>