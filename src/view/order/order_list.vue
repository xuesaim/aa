<template>
	<div class="wrapper" v-title="'订单列表'">
		<div class="tabBd">
			<router-link :to="{path:'/order/totle',query:{order_status:'0'}}" replace>全部</router-link>
			<router-link :to="{path:'/order/obligation',query:{order_status:'1'}}" replace>待付款</router-link>
			<router-link :to="{path:'/order/shipment',query:{order_status:'2'}}" replace>待发货</router-link>
			<router-link :to="{path:'/order/received',query:{order_status:'3'}}" replace>待收货</router-link>
			<!--<a @click="tabToggle('0')" :class="{active:order_status==0}">全部</a>
            <a @click="tabToggle('1')" :class="{active:order_status==1}">待付款</a>
            <a @click="tabToggle('2')" :class="{active:order_status==2}">待发货</a>
            <a @click="tabToggle('3')" :class="{active:order_status==3}">待收货</a>-->
		</div>
		<div class="posi_height"></div>
		<div>
			<router-view keep-alive></router-view>
			<!--<component :is="tabView" :orderList="order_list"></component>-->
        </div>
	</div>
</template>
<script type="text/javascript">
//	import totle from './totle.vue'
//	import obligation from './obligation.vue'
//	import shipment from './shipment.vue'
//	import received from './received.vue'
	import {
		Toast
	} from 'mint-ui';
	export default{
		name:"wrapper",
		data(){
			return{
				order_status:this.$route.query.order_status,
				token: this.$tool.getCookie("utoken"),
				order_list:''
			}
		},
		mounted() {
			window.localStorage.setItem("token",this.token);
			this.token=window.localStorage.getItem("token");
//			this.$router.replace({
//				path: '/order/totle',
//				query: {
//                  order_status:'0'
//              }
//			});
		},
//		components:{
//			0:totle,
//			1:obligation,
//			2:shipment,
//			3:received
//		},
		methods:{
//			tabToggle(tabText){
//				if(tabText==0){
//					this.$router.push({
//						path: '/order/totle',
//						query: {
//	                        order_status:'0'
//	                    }
//					});
//				}else if(tabText==1){
//					this.$router.push({
//						path: '/order/obligation',
//						query: {
//							order_status:'1'
//	                    }
//					});
//				}else if(tabText==2){
//					this.$router.push({
//						path: '/order/shipment',
//						query: {
//							order_status:'2'
//	                    }
//					});
//				}else if(tabText==3){
//					this.$router.push({
//						path: '/order/received',
//						query: {
//							order_status:'3'
//	                    }
//					});
//				}
//				
////				this.getList(tabText);
//			},
//			getList(order_status){
//				let _this = this;
//				_this.$tool.sendOPtion(this, com.pay_hosturl + "/v1/order/getOrderList.json", {
//					order_status:order_status,
//					token:_this.token
//				}, "get", true, function(res) {
//					if(res.data) {
//						_this.order_list=res.data;
//					} else {
//						Toast({
//							message: res.bizMessage,
//							position: 'top',
//							duration: 1000
//						});
//						return false;
//					}
//				})
//			}
		}
	}
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	.tabBd{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		height: 0.8rem;
		line-height: 0.8rem;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		text-align: center;
		padding: 0 4%;
		background: #fff;
		z-index: 111;
		a{
			font-size:0.3rem;
			color:#232323;
			&.router-link-active{
				border-bottom: .04rem solid #ff2c2c;
			    box-sizing: border-box;
			    color: #ff2c2c;
			}
		}
		
	}
	.dd_product {
		
		.order-status{
			height: 0.8rem;
			line-height: 0.8rem;
			padding: 0 0.3rem;
			font-size: 0.3rem;
			background: #fff;
		}
		
		.order-det {
			padding: 0.15rem 0.3rem;
			
			h4{
				display: inline-block;
				padding: 2px 4px;
				font-size: 11px;
				font-weight: normal;
				color: #fff;
				margin-bottom: 0.15rem;
				background: #78bfff;
			}
			
			img{
				width: 1.38rem;
				height: 1.38rem;
				border: 1px solid #eeeeee;	
			}
			&>div{
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
					
					div{
						display: flex;
						display: -webkit-flex;
						flex-basis: 100%;
						justify-content: space-between;
					}
				}
				
			}
		}
		
		.totle{
			padding: 0 0.3rem;
			text-align: right;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size:0.28rem;
			background: #fff;
		}
		
	}
	.price {
		padding: 0.2rem 0.3rem;
		background: #fff;
		font-size: 0.3rem;
		p{
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
		
		p{
			padding: 0.1rem 0;
			letter-spacing:1px;
			label{
				margin-right: 0.2rem;
			}
		}
	}
}

</style>