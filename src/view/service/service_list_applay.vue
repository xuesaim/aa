<template>
	<div class="wrapper" v-title="'售后'" ref="wrapper">
		<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div v-for="(item, index) in order_list">
				<div class="dd_product mt10">
					<div class="clearfix order-status">
						<strong>订单编号：{{item.jdorderid}}</strong>
						<strong class="right color-ff2c2c">￥{{item.order_totalprice |toFloat}}</strong>
					</div>
					<div v-for="(value, index) in item.goodsinfos">
						<div class="order-det">
							<div class="clearfix pro">
								<img :src="'http://img11.360buyimg.com/n1/'+value.images" />
								<div class="ddpr_name">
									<div class="">
										<span class="font26 nowrap">{{value.name}}</span>
									</div>
									<div class="color-b0b0b0 font22">
										<span class="">数量：{{value.num}}件</span>
										<router-link :to="{path:'/service/service_applay',query:{orderGoodsInfoid:value.id}}">申请售后</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</mt-loadmore>
		<div class="null" v-if="nullShow">
			<img src="../../assets/img/cion/service_null.png"/>
			<p>您没有可以申请售后服务的订单</p>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
		Loadmore
	} from 'mint-ui';
	import {
		Spinner
	} from 'mint-ui';
	import {
		Popup
	} from 'mint-ui';

	import {
		Toast
	} from 'mint-ui';
	Vue.component(Spinner.name, Spinner);
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Popup.name, Popup);
	export default {
		name: "service",
		data() {
			return {
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				order_list: [],
				list: [],
				allLoaded: false,
				bottomStatus: '',
				num: 0,
				pagesize: 8,
				pagenum: 1,
				list1: [],
				status: '',
				nullShow:false,
				scrollTop:0
			}
		},
		mounted() {
			this.getList(this.pagenum);
		},
		beforeRouteLeave(to, from, next){
		 	this.scrollTop = document.body.scrollTop;
		  	next()
		},
		activated() {
	      document.body.scrollTop = this.scrollTop
	    },
		methods: {
			getList(pagenum) {
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/afterSale/list.json", {
					token: _this.token,
					pagenum:_this.pagenum,
					pagesize:8,
					status: '1'
				}, "get", true, function(res) {
					if(res.bizCode == '000000') {
						if(res.data.length !=0){
							_this.list1 = res.data;
							for(let i = 0; i < res.data.length; i++) {
								_this.list = res.data[i];
								_this.order_list.push(_this.list);
							}
							_this.num = res.data.length;
						}else{
							_this.allLoaded = true;
							if(pagenum==1){
								_this.nullShow=true;
							}else{
								_this.nullShow=false;
							}
						}
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
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom() {
				setTimeout(() => {
					if(this.num >= this.pagesize) {
						this.pagenum++;
						this.getList(this.pagenum)
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
		.tabBd {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			display: flex;
			height: 0.8rem;
			line-height: 0.8rem;
			-webkit-box-pack: justify;
			-ms-flex-pack: justify;
			justify-content: space-around;
			text-align: center;
			padding: 0 4%;
			background: #fff;
			z-index: 111;
			a {
				font-size: 0.3rem;
				color: #232323;
				&.router-link-active {
					border-bottom: .04rem solid #78bfff;
					box-sizing: border-box;
					color: #78bfff;
				}
			}
		}
		.dd_product {
			padding-bottom: 0.2rem;
			background: #fff;
			.order-status {
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.3rem;
				font-size: 0.3rem;
				background: #fff;
			}
			.order-det {
				padding: 0.15rem 0.3rem;
				background: #fafafa;
				h4 {
					display: inline-block;
					padding: 2px 4px;
					font-size: 11px;
					font-weight: normal;
					color: #fff;
					margin-bottom: 0.15rem;
					background: #78bfff;
				}
				img {
					width: 1.38rem;
					height: 1.38rem;
					border: 1px solid #eeeeee;
				}
				.pro {
					display: flex;
					.ddpr_name {
						margin-left: 0.2rem;
						display: flex;
						display: -webkit-flex;
						width: 0;
						flex: 1;
						margin-left: 10px;
						flex-wrap: wrap;
						align-content: space-between;
						div {
							display: flex;
							display: -webkit-flex;
							flex-basis: 100%;
							justify-content: space-between;
							
							.nowrap{
								overflow: hidden;
							    text-overflow: ellipsis;
							    display: -webkit-box;
							    -webkit-line-clamp: 2;
							    -webkit-box-orient: vertical;
							    height:0.8rem;
							    line-height: 0.4rem;
								
							}
							button,
							a {
								width: 1.5rem;
								height: 0.54rem;
								line-height: 0.54rem;
								color: #fff;
								font-size: 0.28rem;
								border: none;
								text-align: center;
								tab-size: center;
								background: #78bfff;
							}
						}
					}
				}
			}
			.line {
				height: 0.1rem;
				background: #fff;
			}
			.totle {
				padding: 0 0.3rem;
				text-align: right;
				height: 0.6rem;
				line-height: 0.6rem;
				font-size: 0.28rem;
				background: #fff;
			}
		}
		.price {
			padding: 0.2rem 0.3rem;
			background: #fff;
			font-size: 0.3rem;
			p {
				height: 0.72rem;
				line-height: 0.72rem;
			}
			strong {
				color: #ff2c2c;
			}
		}
		.dd_detail {
			padding: 0.2rem 0.3rem;
			font-size: 0.3rem;
			color: #b0b0b0;
			background: #fff;
			p {
				padding: 0.1rem 0;
				letter-spacing: 1px;
				label {
					margin-right: 0.2rem;
				}
			}
		}
		.null{
			position: absolute;
			top: 3rem;
			left: 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
			text-align: center;
			width: 100%;
			color: #232323;
			font-size: 0.3rem;
			img{
				display: block;
				width: 4.4rem;
				height: 3rem;
				margin: 0 auto 0.5rem;
			}
			p{
				margin-bottom: 0.1rem;
			}
		}
	}
</style>