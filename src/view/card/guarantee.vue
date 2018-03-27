<template v-title="'保障卡'">
	<div class="wrapper">
		<div class="wallet-top">
			<h2 v-if="guaCardno !=''&&guaCardno !=null">{{guaCardno}}</h2>
		</div>
		<div class="trade_list">
			<h2><img src="../../assets/img/cion/message_icon.png"/><span>交易明细</span></h2>
			<ul>
				<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<li v-for="(item, index) in tradeList">
						<div class="clearfix" v-if="item.type==1">
							<div class="left">
								<h3>支出-商城消费</h3>
								<span>{{item.paytimeStr}}</span>
							</div>
							<span class="right color-ff4343 font-weight font30">-{{item.money | toFloat}}</span>
						</div>
						<div class="clearfix" v-if="item.type==2">
							<div class="left">
								<h3>单位发放</h3>
								<span>{{item.paytimeStr}}</span>
							</div>
							<span class="right color-ff4343 font-weight font30">+{{item.money | toFloat}}</span>
						</div>
					</li>
				</mt-loadmore>
			</ul>
		</div>
		<div class="null" v-if="nullShow">
			<img src="../../assets/img/cion/null.png"/>
			<p>您还没有交易明细</p>
		</div>
	</div>
</template>
<script>
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
				allLoaded: false,
				bottomStatus: '',
				pageSize: 8,
				pageNo:1,
				pageNum:'',
//				token:"eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI1Yzk2ODUxMTJhMDk0OWI3YmQzM2IzMmNhMGYxNzhlMSMyOWNlZjI3ODUzZmQ0OWZiYjYzZjAwNDc1ODNmNWM3OCMxMDcyIn0.4iza757ryMeBvdPrLnwfYrE0jsHLu40_IZA0d7urKfA",
				token: this.$tool.getCookie("utoken"),
				employeeId:window.localStorage.getItem("employeeId"),
				guaCardno:'',
				nullShow:false
			}
		},
		mounted() {
			window.localStorage.setItem("token",this.token);
			this.token=window.localStorage.getItem("token");
			this.getUser();
		},
		methods: {
			getUser(){
				let _this=this;
				_this.$tool.sendOPtion(this, com.loginhosturl + '/unlogin/passport/findUserInfoByToken', {
					utoken:_this.token,
				}, "get", true, function(res) {
					if(res.success) {
						_this.employeeId=res.value.employeeId;
						window.localStorage.setItem("employeeId",_this.employeeId);
						_this.getData(_this.pageNo);
						
					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				});
			},
			getData(pageNo) {
				var device = navigator.userAgent;
				var channel=encodeURI("爱福客微信端");
				let _this = this;
				
				_this.$tool.sendOPtion(this, com.order_hosturl + "/guaranteepay/guaranteeList.json", {
					token: _this.token,
					employeeid:_this.employeeId,
					pagenum: _this.pageNo,
					pagesize: '8'
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.guaCardno=res.data.guaCardno;
						if(res.data.guaranteeList.length !=0){
							for(let i=0;i<res.data.guaranteeList.length;i++){
								_this.list = res.data.guaranteeList[i];
								_this.tradeList.push(_this.list);
							}
							_this.pageNum = res.data.guaranteeList.length;
						}else{
							_this.allLoaded = true;
							if(pageNo==1){
								_this.nullShow=true;
							}else{
								_this.nullShow=false;
							}
						}
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
			},
		},
	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		font-size: 0.24rem;
		.wallet-top {
			width: 100%;
			height: 2.5rem;
			background: url(../../assets/img/cion/guarantee_bac.png) no-repeat;
			background-size: 100% 100%;
			color: #fff;
			text-align: center;
			h2 {
				font-size: 0.4rem;
				padding: 0.35rem 0 0;
				height: 0.56rem;
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
			h2 {
				padding: 0 0.3rem;
				height: 0.7rem;
				line-height: 0.7rem;
				border-bottom: 1px solid #eee;
				font-size: 0.3rem;
				img {
					width: 0.32rem;
					height: 0.38rem;
					margin-right: 0.1rem;
					vertical-align: middle;
				}
				span{
					display: inline-block;
					height: 0.38rem;
					line-height: 0.38rem;
					vertical-align: middle;
				}
			}
			li {
				padding: 0.2rem 0.3rem;
				border-bottom: 1px solid #eee;
				div {
					h3 {
						font-size: 0.26rem;
						height: 0.4rem;
						line-height: 0.4rem;
						margin-bottom: 0.1rem;
					}
					p {
						color: #b0b0b0;
						height: 0.35rem;
						line-height: 0.35rem;
					}
				}
				span {
					font-size: 0.24rem;
					color: #b0b0b0;
					margin-top: 0.27rem;
				}
			}
		}
		.null{
			margin-top: 2rem;
			text-align: center;
			font-size: 0.28rem;
			color: #232323;
			img{
				width: 2rem;
				height: 2rem;
			}
			p{
				margin-top: 0.2rem;
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