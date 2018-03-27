<template>
	<div class="wrapper" ref="wrapper">
		<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
		<div class="dd_product mt10" v-for="(item, index) in order_list">
			<div class="clearfix order-status">
				<strong v-if="item.ordertype==2 ||item.ordertype==10">订单编号:{{item.jdorderid}}</strong>
				<strong v-if="item.ordertype!=2 && item.ordertype!=10">订单编号:{{item.order_code}}</strong>
				<strong class="right color-ff2c2c" v-if="item.order_status==1 || item.order_status==14">待付款</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==2">正在处理</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==3">待发货</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==4">待收货</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==5">已完成</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==6 || item.order_status==7 || item.order_status==8">已取消</strong>
				<strong class="right color-ff2c2c" v-else-if="item.order_status==10">已拒收</strong>
			</div>
			<div class="order-det" @click="detail_btn(item.goodsinfos.length,item.order_code,item.ordertype,item.order_status,index)">
				<div class="clearfix">
					<h4 class="bac-ff2c2c" v-if="item.ordertype==2 ||item.ordertype==10">京东优选</h4>
					<h4 class="bac-78bfff" v-else-if="item.ordertype!=2 && item.ordertype!=10">小福甄选</h4>
				</div>
				<div class="product_list" v-if="item.goodsinfos.length>1">
					<ul class="clearfix">
						<li @click.prevent="detail_btn(1,item.order_code,item.ordertype,item.order_status,item.paytype)" v-for="(value, index) in item.goodsinfos">
							<img v-if="(item.ordertype==2 || item.ordertype==10)&&value.needChangeImgUrl==true" :src="value.images"/>
							<img v-if="(item.ordertype==2 || item.ordertype==10)&&value.needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+value.images"/>
							<img v-if="item.ordertype!=2 && item.ordertype!=10" :src="value.images"/>
						</li>
						
						<a @click.prevent="merchbill(item.goodsinfos,item.ordertype,item.goodsamount)">
							<img src="../../assets/img/cion/morer.png"/>
						</a>
					</ul>
				</div>
				<div class="clearfix pro" v-if="item.goodsinfos.length==1">
					<img v-if="(item.ordertype==2 || item.ordertype==10)&&item.goodsinfos[0].needChangeImgUrl==true" :src="item.goodsinfos[0].images"/>
					<img v-if="(item.ordertype==2 ||item.ordertype==10)&&item.goodsinfos[0].needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+item.goodsinfos[0].images" />
					<img v-if="item.ordertype!=2 && item.ordertype!=10" :src="item.goodsinfos[0].images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26 nowrap">{{item.goodsinfos[0].name}}</span>
							<strong class="font24">￥{{item.goodsinfos[0].sellingprice | toFloat}}</strong>
						</div>
						<div class=" color-b0b0b0 font22">
							<span class="">{{item.goodsinfos[0].normsinfo}}</span>
							<strong class="">X{{item.goodsinfos[0].num}}</strong>
						</div>
					</div>
				</div>
			</div>
			<div class="service_btn">
				<div class="totle">
					共{{item.goodsamount}}件商品&nbsp;&nbsp;合计：￥{{item.order_totalprice | toFloat}}&nbsp;&nbsp;(含运费：￥{{item.freight | toFloat}})
				</div>
				<div class="look clearfix" v-if="item.order_status==4">
					<a class="active" @click='recived(item.order_code)' v-if="item.ordertype!=2 && item.ordertype!=10">确认收货</a>
					<router-link :to="{path:'/order/logistics_detail',query:{orderid:item.id}}">查看物流</router-link>
				</div>
				<div class="look clearfix" v-if="item.order_status==1 ||item.order_status==14">
					<a @click="payment(item.order_totalprice,item.id,item.ordertype,item.paytype,item.order_status)" class="active">付款</a>
					<a @click="cancelOrder(item.order_code)" href="javascript:;">取消订单</a>
				</div>
			</div>
		</div>
		</mt-loadmore>
		<mt-popup v-model="popupVisible">
			<p>客官确定要取消订单吗？</p>
			<div>
				<a @click="wait">我再想想</a>
				<a class="special" @click="cancle()">去意已决</a>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisible2">
			<p>请确认已收到所有商品</p>
			<div>
				<a @click="cancle_receive">取消</a>
				<a class="special" @click="sure_receive">确定</a>
			</div>
		</mt-popup>
		<div class="null" v-if="nullShow">
			<img src="../../assets/img/cion/order_null.png"/>
			<p>您还没有相关的订单</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Loadmore } from 'mint-ui';
	import { Spinner } from 'mint-ui';
//	import { MessageBox } from 'mint-ui';
	import { Popup } from 'mint-ui';
	
	import {
		Toast
	} from 'mint-ui';
	Vue.component(Spinner.name, Spinner);
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Popup.name, Popup);
	export default{
		name:"order",
		data(){
			return{
				order_status:this.$route.query.order_status,
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				order_list:[],
				list:[],
				allLoaded: false,
				bottomStatus: '',
				num:0,
				pagesize:8,
				pagenum:1,
				list1:[],
				popupVisible:false,
				popupVisible2:false,
				code:'',
				paymentType:'',
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
		methods:{
			detail_btn(num,order_code,ordertype,order_status,selector){
				if(num>1){
					return false;
				}else{
					this.$router.push({
		               path: '/order/order_detail',
		               query: {
		                   order_code:order_code
		                }
		            });
				}
			},
			getList(pagenum){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/getOrderList.json", {
					order_status:_this.order_status,
					token:_this.token,
					pagenum:_this.pagenum,
					pagesize:8
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						if(res.data.length !=0){
							_this.list1=res.data;
							for(let i=0;i<res.data.length;i++){
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
			merchbill(goodsinfos,ordertype,goodsamount){
				window.localStorage.setItem("goodsinfos",JSON.stringify(goodsinfos));
				this.$router.push({
	               path: '/order/merchbill',
	               query: {
						ordertype:ordertype,
						goodsamount:goodsamount
					}
	            });
			},
			cancelOrder(order_code){
				this.popupVisible=true;
				this.code=order_code
			},
			wait(){
				this.popupVisible=false
			},
			cancle(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/cancelOrder.json", {
					order_code:_this.code,
					token:_this.token
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						_this.popupVisible=false;
						location.reload() 
					} else {
						_this.popupVisible=false;
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				})
			},
			payment(order_totalprice,id,ordertype,paytype,order_status){
				if(paytype==102 || paytype==103 ||paytype==107){
					this.$router.push({
		               path: '/pay/pay_confirm',
		               query: {
							paymentType:paytype,
							order_totalprice:order_totalprice,
							orderId:id,
							ordertype:ordertype
						}
		            });
				}else if(paytype==101 || paytype==104 ||paytype==105){
					this.$router.push({
		               path: '/pay/pay_method',
		               query: {
							paymentType:paytype,
							order_totalprice:order_totalprice,
							orderId:id,
							ordertype:ordertype
						}
		            });
				}else if(paytype==109){
					if(order_status==14){
						let _this = this;
						_this.$tool.sendOPtion(this, com.order_hosturl + "/guaranteepay/guaranteePay.json", {
							orderId: id,
							token: _this.token,
							onlyGetCodeFlag:'1'
						}, "POST", true, function(res) {
							if(res.bizCode == "000000") {
								_this.data=res.data;
								window.localStorage.setItem("dataList",JSON.stringify(_this.data));
								_this.$router.push({
									path: '/pay/pay_voucher',
								});
							}else if(res.bizCode == "413101"){
								_this.$router.push({
					               path: '/pay/pay_confirm',
					               query: {
										paymentType:paytype,
										order_totalprice:order_totalprice,
										orderId:id,
										ordertype:ordertype
									}
					            });
							}else {
								Toast({
									message: res.bizMessage,
									position: 'top',
									duration: 1000
								});
								return false;
							}
						})
					}else{
						this.$router.push({
			               path: '/pay/pay_confirm',
			               query: {
								paymentType:paytype,
								order_totalprice:order_totalprice,
								orderId:id,
								ordertype:ordertype
							}
			            });
					}
				}else if(paytype==108){
					this.$router.push({
		               path: '/pay/pay_supplier',
		               query: {
							paymentType:paytype,
							order_totalprice:order_totalprice,
							orderId:id,
							ordertype:ordertype
						}
		            });
				}
			},
			recived(order_code){
				this.popupVisible2=true;
				this.code=order_code;
			},
			cancle_receive(){
				this.popupVisible2=false;
			},
			sure_receive(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/takeDelivery.json", {
					order_code:_this.code,
					token:_this.token
				}, "get", true, function(res) {
					_this.popupVisible2=false;
					Toast({
						message: res.bizMessage,
						position: 'top',
						duration: 1000
					});
					location.reload() 
				})
			}
		},
	}
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	.tabBd{
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
			&.active{
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
			strong{
				font-family:PingFangSC-Medium;
				font-weight: normal;
			}
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
			}
			
			
			img{
				width: 1.38rem;
				height: 1.38rem;
				border: 1px solid #eeeeee;	
			}
			.pro{
				display: flex;
			}
			.ddpr_name {
				margin-left: 0.2rem;
				display: flex;
				display: -webkit-flex;
				width: 0;
				flex: 1;
				margin-left: 10px;
				flex-wrap: wrap;
				align-content: space-between;
				
				>div{
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
						width: 3.4rem;
						
					}
				}
			}
			
			.product_list{
				li{
					float: left;
					width: 1.4rem;
					height: 1.4rem;
					margin-top: 0.15rem;
					margin-right: 0.2rem;
					
				}
				a{
					padding-top: 0.6rem;
					float: right;
					
					img{
						width: 0.24rem;
						height: 0.05rem;
					}
				}
			} 
		}
		.service_btn{
			padding: 0 0.3rem;
			background: #fff;
		}
		.totle{
			
			text-align: right;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size:0.28rem;
			background: #fff;
		}
		.look{
			text-align: right;
			font-size: 0.28rem;
			padding: 0.2rem 0;
			border-top:1px solid #eeeeee;
			
			a{
				float: right;
				width:1.46rem;
				text-align: center;
				padding: 0.1rem 0;
				border:1px solid #707070;
				border-radius: 20px;
				
				&.active{
					margin-left: 0.2rem;
					color:#ff2c2c;
					border:1px solid #ff2c2c;	
				}
			}
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
	.mint-popup{
		width: 5rem;
		border-radius: 5px;
		p{
			padding:0.5rem 0;
			color: #232323;
			font-size: 0.3rem;
			text-align: center;
			border-bottom: 1px solid #ccc;
		}
		div{
			display: flex;
			a{
				flex: 1;
				text-align: center;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: 0.32rem;
				
				&.special{
					color: #fff;
					border-radius: 0 0 5px 0;
					background: #fd6e46;
				}
			}
		}
	}
	.mint-popup{
		position: fixed;
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