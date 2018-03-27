<template v-title="'支付凭证'">
	<div class="wrapper">
		<div class="guarantee_infor" v-if="dataList.shortCodes.length==1">
			<div>
				<img src="../../assets/img/cion/icon_bao.png"/>
				<span>保障卡</span>
			</div>
			<h3>{{dataList.shortCodes[0]}}</h3>
			<p>保障卡支付凭证</p>
		</div>
		<div class="wallet-top" :class="{active:dataList.shortCodes.length==1}">
			<p :class="{active:dataList.shortCodes.length==1}">请在48小时内完成支付，超时后您需要重新下单。(注：含秒杀商品的订单请在24小时内完成支付)</p>
		</div>
		<div class="mt10 trade_list" v-if="dataList.shortCodes.length!=1">
			<ul>
				<li v-for="(item, index) in dataList.shortCodes">
					<div class="clearfix">
						<span class="left">凭证短码{{index+1}}:</span>
						<b class="left">{{dataList.shortCodes[index]}}</b>
					</div>
				</li>
			</ul>
		</div>
		<div class="mt10 price_voucher">
			<span>订单总价：</span>	
			<b class="color-ff4343">{{dataList.totalPrice | toFloat}}元</b>
		</div>
		<div class="mt10 address_list">
			<h3>保障卡支付地点</h3>
			<ul>
				<li v-for="(item, index) in dataList.addresses">{{index+1}}.{{dataList.addresses[index]}}</li>
			</ul>
		</div>
		<div class="mt10 hot-line"><span>保障卡服务热线：</span><a :href="'tel:'+dataList.tel">{{dataList.tel}}</a></div>
		<div style="height: 1rem;"></div>
		<div class="back">
			<router-link to="/">返回商城首页</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		name: "wrapper",
		data() {
			return {
				dataList:JSON.parse(window.localStorage.getItem("dataList")),
//				token:"eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiIxNDMyNCMxNTY0MiMxMDMyIn0.ff0EXlOoRWPBAM2S0dZ-GCd4N9-t5aaNsIj9uG-WZp4",
				token: window.localStorage.getItem("token"),
			}
		},
		mounted() {
//			console.log(this.dataList);
		},
	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		font-size: 0.24rem;
		.guarantee_infor{
			width: 100%;
			height: 3.1rem;
			color: #fff;
			background: url(../../assets/img/cion/voucher_bac.png) repeat-x;
			background-size: 100% 100%;
			background-color:#fff;
			div{
				padding: 0.3rem 0.3rem 0;
				img{
					width: 0.7rem;
					height: 0.7rem;
					vertical-align: middle;
				}
				span{
					display: inline-block;
					margin-left: 0.1rem;
					vertical-align: middle;
				}
			}
			h3{
				text-align: center;
				font-size: 0.7rem;
				font-family:PingFangSC-Medium;
				font-weight: normal;
				letter-spacing: 0.3rem;
				text-indent: 0.3rem;
			}
			p{
				text-align: center;
				font-size: 0.3rem;
			}
		}
		.wallet-top {
			width: 100%;
			background: #78bfff;
			color: #fff;
			&.active{
				background: #fff;
			}
			p {
				padding: 0.25rem 0.3rem;
				font-size: 0.28rem;
				line-height: 0.4rem;
				font-family:PingFangSC-Medium;
				&.active{
					font-family:PingFangSC-Regular;
					font-size:0.28rem;
					padding: 0.4rem;
					color:#707070;
				}
			}
		}
		.list {
			padding: 0.2rem 0;
			background: #fff;
			li {
				float: left;
				width: 50%;
				text-align: center;
				box-sizing: border-box;
				border-right: 0.02rem solid #eeeeee;
				&:last-child {
					border-right: none;
				}
				h3 {
					color: #78bfff;
					font-size: 0.4rem;
					margin-bottom: 0.1rem;
				}
			}
		}
		.trade_list {
			background: #fff;
			li {
				padding: 0.3rem 0.3rem;
				border-bottom: 1px solid #eee;
				font-size: 0.3rem;
				div {
					b{
						font-weight: normal;
						color: #78bfff;
						margin-left: 0.2rem;
					}
				}
			}
		}
		.price_voucher{
			font-size: 0.3rem;
			padding: 0.3rem;
			background: #fff;
		}
		.address_list{
			font-size: 0.3rem;
			padding: 0.3rem 0.3rem 0;
			background: #fff;
			h3{
				font-size:0.36rem;
				padding: 0 0 0.2rem;
				font-weight: normal;
				border-bottom:1px solid #d7d7d9;
			}
			ul{
				padding: 0.2rem 0;
				li{
					height: 0.42rem;
					line-height: 0.42rem;
					margin-bottom: 0.1rem;
				}
			}
		}
		.hot-line{
			font-size: 0.3rem;
			padding: 0.3rem;
			background: #fff;
			a{
				margin-left: 0.2rem;
			}
		}
		.back{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			font-size: 0.36rem;
			text-align: center;
			background: #fff;
			a{
				color:#78bfff;
			}
		}
		.color-ff4343{
			color: #ff4343 !important;
		}
		.color-48cfad{
			color: #48cfad !important;
		}
		.font-weight{
			font-weight: 600;
		}
	}
</style>