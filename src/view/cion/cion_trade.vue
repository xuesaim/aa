<template>
	<div class="wrapper" v-title="'交易明细'" ref="wrapper">
		<div class="filter">
			<router-link to="/cion/cion_chose" replace>筛选</router-link>
		</div>
		<div style="height: 0.6rem;"></div>
		<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="jiaoyi_list">
				<li class="clearfix" v-for="(item, index) in tradeList">
					<router-link :to="{path:'/cion/trade_detail',query:{tradeno:item.tradeno,tradeType:item.tradeType}}">
						<div class="trade">
							<h3 v-if="item.tradeType=='5'">-{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='1'">+{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='2'">+{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='3'">+{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='4'">-{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='6'">+{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='7'">+{{item.aviCoin/100 | toFloat}}</h3>
							<h3 v-if="item.tradeType=='8'">-{{item.aviCoin/100 | toFloat}}</h3>
							<p v-if="item.tradeType=='3'">福利发放</p>
							<p v-if="item.tradeType=='2'">充值</p>
							<p v-if="item.tradeType=='5'">转出</p>
							<p v-if="item.tradeType=='1'">转入</p>
							<p v-if="item.tradeType=='4'">商品购买</p>
							<p v-if="item.tradeType=='6'">抽奖发放</p>
							<p v-if="item.tradeType=='7' || item.tradeType=='8'">冲正收入</p>
						</div>
						<span class="time">{{item.tradeTime}}</span>
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>
<script >
	import Vue from 'vue';
	import { Loadmore } from 'mint-ui';
	import { Spinner } from 'mint-ui';
	import {
		Toast
	} from 'mint-ui';

	Vue.component(Spinner.name, Spinner);
	Vue.component(Loadmore.name, Loadmore);
	export default {
		name: "wrapper",
		data() {
			return {
				list:[],
				tradeList: [],
				tradeType: this.$route.query.tradeType,
				allLoaded: false,
				bottomStatus: '',
				pageSize: '8',
				pageNo:'1',
				pageNum:'',
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token:window.localStorage.getItem("token"),
				userId:window.localStorage.getItem("userId"),
				scrollTop:0
			}
		},
		mounted() {
			this.getData(this.pageNo);
		},
		beforeRouteLeave(to, from, next){
		 	this.scrollTop = document.body.scrollTop;
		  	next()
		},
		activated() {
	      document.body.scrollTop = this.scrollTop
	    },
		methods: {
			getData(pageNo) {
				var device = navigator.userAgent;
				let _this = this;
				var channel=encodeURI("爱福客微信端");
				this.$tool.sendOPtion(this, com.cion_hosturl + "/avicoinapi/getaviCoinInfoList.share", {
					userId: _this.userId,
					token: _this.token,
					tradeType: _this.tradeType,
					channel: channel,
					device: device,
					pageNo: this.pageNo,
					pageSize: '8'
				}, "get", true, function(res) {
					if(res.success) {
						for(let i=0;i<res.data.length;i++){
							_this.list = res.data[i];
							_this.tradeList.push(_this.list);
						}
						_this.pageNum = res.data.length;
					}
				})
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom() {
				setTimeout(() => {
					if(this.pageNum >= this.pageSize) {
						this.pageNo++;
						this.getData(this.pageNo)
					} else {
						this.allLoaded = true;
					}
					this.$refs.loadmore.onBottomLoaded();
				}, 1500);
			}
		},
	}
</script>
<style lang="less" scoped>
	.wrapper {
		background: #fff;
	}
	
	.filter {
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		width: 100%;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: right;
		font-size: 15px;
		color: #ffffff;
		background: #1b1b1f;
		z-index: 111;
		a {
			color: #fff;
			margin-right: 0.3rem;
		}
	}
	
	.wrapper .jiaoyi_list li {
		padding: 0.3rem;
		border-bottom: 1px solid #dadada;
		a {
			display: flex;
			display: -webkit-flex;
			flex-direction: row;
		}
		img {
			align-self: center;
			width: 0.64rem;
			height: 0.64rem;
		}
	}
	
	.trade {
		font-size: 0.3rem;
		margin-left: 0.3rem;
		h3 {
			height: 0.56rem;
			line-height: 0.56rem;
			font-weight: normal;
			font-size: 0.4rem;
		}
		p {
			height: 0.42rem;
			line-height: 0.42rem;
		}
	}
	
	.time {
		font-size: 0.24rem;
		height: 0.34rem;
		line-height: 0.34rem;
		color: #9b9b9b;
		flex: 1;
		-webkit-flex: 1;
		text-align: right;
	}
	.loading{
		display: inline-block;
		text-align: center;
	}
</style>