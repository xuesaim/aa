<template>
	<div class="wrapper" v-title="'交易详情'">
		<div class="text-center trade_top">
			<img src="../../assets/img/cion/fbz.png" /><span v-if="tradeType=='2'">充值</span><span v-else-if="tradeType=='5'">转出</span><span v-else-if="tradeType=='1'">转入</span><span v-else-if="tradeType=='4'">购买商品</span><span v-else-if="tradeType=='3'">福利发放</span><span v-else-if="tradeType=='6'">抽奖发放</span><span v-else-if="tradeType=='7' || tradeType=='8'">冲正收入</span>
			<p>{{aviCoin/100 | toFloat}}</p>
		</div>
		<ul class="trade_list">
			<li class="clearfix">
				<label class="left">订单号:</label>
				<span class="right">{{trade_detail.ThirdId}}</span>
			</li>
			<li class="clearfix">
				<label class="left">交易时间:</label>
				<span class="right">{{trade_detail.tradeTime}}</span>
			</li>
			<li class="clearfix">
				<label class="left">交易金额:</label>
				<span class="right">{{aviCoin/100 | toFloat}}</span>
			</li>
			<li class="clearfix">
				<label class="left">交易类型:</label>
				<span class="right" v-if="tradeType=='3'">福利发放</span>
				<span class="right" v-if="tradeType=='2'">充值</span>
				<span class="right" v-if="tradeType=='5'">转出</span>
				<span class="right" v-if="tradeType=='1'">转入</span>
				<span class="right" v-if="tradeType=='4'">商品购买</span>
				<span class="right" v-if="tradeType=='6'">抽奖发放</span>
				<span class="right" v-if="tradeType=='7' || tradeType=='8'">冲正收入</span>
			</li>
			<li class="clearfix" v-if="tradeType=='5'">
				<label class="left">到账人姓名:</label>
				<span class="right">{{trade_detail.receiver}}</span>
			</li>
			<li class="clearfix" v-if="tradeType=='5'">
				<label class="left">到账人手机:</label>
				<span class="right">{{trade_detail.phone}}</span>
			</li>
			<li class="clearfix" v-if="tradeType=='1'">
				<label class="left">转账人姓名:</label>
				<span class="right">{{trade_detail.fromName}}</span>
			</li>
			<li class="clearfix" v-if="tradeType=='1'">
				<label class="left">转账人手机:</label>
				<span class="right">{{trade_detail.fromPhone}}</span>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import {
		Toast
	} from 'mint-ui';
	export default{
		name: "trade_detail",
		data() {
			return {
				tradeType:this.$route.query.tradeType,
				trade_detail:'',
				tradeno: this.$route.query.tradeno,
				token:window.localStorage.getItem("token"),
				userId:window.localStorage.getItem("userId"),
				aviCoin:0,
			}
		},
		mounted() {
			var device=navigator.userAgent;
			var channel=encodeURI("爱福客微信端");
			let _this=this;
			this.$tool.sendOPtion(this, com.cion_hosturl + "/avicoinapi/aviCoinInfo.share", {
				userId:_this.userId,
                token:_this.token,
                channel:channel,
                device:device,
                tradeno:_this.tradeno
			}, "POST", true, function(res) {
				if(res.success) {
					_this.trade_detail=res.data;
					_this.aviCoin=res.data.aviCoin;
				} 
			})
		}
	}
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	background: #fff;
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
			color: #9b9b9b;
			font-size: 0.3rem;
			padding: 0.2rem 0;
			border-bottom: 1px solid #e6e6e6;
		}
	}
}
	
</style>