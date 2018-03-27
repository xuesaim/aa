<template>
	<div class="wrapper" v-title="'订单详情'">
		<div class="dd_top clearfix" v-if="oeder_detail.order_status==5">
			<span>您的订单已收货</span>
			<img class="right v-middle message" src="../../assets/img/cion/message.png" />
		</div>
		<div class="dd_top clearfix" v-if="oeder_detail.order_status==3 || oeder_detail.order_status==2">
			<span>您的订单待发货</span>
			<img class="right v-middle produ_wait" src="../../assets/img/cion/produ_wait.png" />
		</div>
		<div class="dd_top clearfix" v-if="oeder_detail.order_status==4">
			<span>您的订单待收货</span>
			<img class="right v-middle wait_recive" src="../../assets/img/cion/wait_recive.png" />
		</div>
		<div class="dd_top clearfix" v-if="oeder_detail.order_status==1||oeder_detail.order_status==14">
			<span>您的订单待付款</span>
			<img class="right v-middle wait_pay" src="../../assets/img/cion/wait_pay.png" />
		</div>
		<div class="address" v-if="oeder_detail.orderAddress !=null">
			<img src="../../assets/img/cion/position_icon.png"/>
			<div>
				<h3>{{oeder_detail.orderAddress.name}}&nbsp;&nbsp;{{oeder_detail.orderAddress.mobile}}</h3>
				<p v-if="oeder_detail.orderAddress.total_address==''">收货地址：{{oeder_detail.orderAddress.provincetext}}{{oeder_detail.orderAddress.citytext}}{{oeder_detail.orderAddress.countytext}}{{oeder_detail.orderAddress.towntext}}{{oeder_detail.orderAddress.address}}</p>
				<p v-else>收货地址：{{oeder_detail.orderAddress.total_address}}</p>
			</div>
		</div>
		<div class="dd_product mt10">
			<h4 v-if="oeder_detail.ordertype !=2 && oeder_detail.ordertype !=10">小福甄选</h4>
			<h4 v-if="oeder_detail.ordertype ==2 || oeder_detail.ordertype ==10" class="bac-ff2c2c">京东优选</h4>
			<div v-for="(item, index) in oeder_detail.goodsinfos">
				<div class="clearfix pro">
					<img v-if="oeder_detail.ordertype !=2 && oeder_detail.ordertype !=10" :src="item.images" />
					<img v-if="(oeder_detail.ordertype ==2 || oeder_detail.ordertype ==10)&&item.needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+item.images" />
					<img v-if="(oeder_detail.ordertype ==2 || oeder_detail.ordertype ==10)&&item.needChangeImgUrl==true" :src="item.images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26 nowrap">{{item.name}}</span>
							<strong class="font24">￥{{item.sellingprice | toFloat}}</strong>
						</div>
						<div class=" color-b0b0b0 font22">
							<span class="">{{item.normsinfo}}</span>
							<strong class="">X{{item.num}}</strong>
						</div>
					</div>
				</div>
				<div class="clearfix gift" v-if="item.supply=='jd_mall'" v-for="(gift, index) in item.gifts">
					<span class="left">赠品&nbsp;&nbsp;{{gift.name}}</span>
					<span class="color-b0b0b0 right">X{{gift.num}}</span>
				</div>
			</div>
			
		</div>
		<div class="mt10 dd_detail">
			<p v-if="oeder_detail.ordertype ==2 || oeder_detail.ordertype ==10">
				<label>订单编号:</label>{{oeder_detail.jdorderid}}
			</p>
			<p v-if="oeder_detail.ordertype !=2 && oeder_detail.ordertype !=10">
				<label>订单编号:</label>{{oeder_detail.order_code}}
			</p>
			<p v-if="oeder_detail.order_status==1 ||oeder_detail.order_status==14 || oeder_detail.order_status==6 || oeder_detail.order_status==7 || oeder_detail.order_status==8 ">
				<label>创建时间:</label>{{oeder_detail.createtime*1000 | YStime}}
			</p>
			<p v-else>
				<label>创建时间:</label>{{oeder_detail.fcreatetime*1000 | YStime}}
			</p>
			<p>
				<label>支付方式:</label>{{oeder_detail.paytypevalue}}
			</p>
			<p v-if="(oeder_detail.ordertype ==2 || oeder_detail.ordertype ==10)&& oeder_detail.order_status!=14">
				<label>配送方式:</label>京东配送
			</p>
			<p v-if="(oeder_detail.ordertype !=2 && oeder_detail.ordertype !=10)&& oeder_detail.order_status!=14">
				<label>配送方式:</label>小福配送
			</p>
			<p v-if="oeder_detail.order_status==14">
				<label>支付凭证码:</label>{{oeder_detail.shortcode}}
			</p>
			<p v-if="oeder_detail.order_status==3 || oeder_detail.order_status==4 || oeder_detail.order_status==5|| oeder_detail.order_status==10">
				<label>付款时间:</label>{{oeder_detail.paytime*1000 | YStime}}
			</p>
			<p v-if="oeder_detail.prizelevel !='' && oeder_detail.prizelevel !='undefined' && oeder_detail.prizelevel !=null">
				<label>奖品等级:</label>{{oeder_detail.prizelevel}}
			</p>
		</div>
		<div class="mt10 price">
			<p class="clearfix">
				<span>商品总价:</span>
				<strong class="right">￥{{goods_totalprice | toFloat}}</strong>
			</p>
			<p class="clearfix">
				<span>运费:</span>
				<strong class="right">￥{{freight | toFloat}}</strong>
			</p>
			<p class="clearfix">
				<span>订单总价:</span>
				<strong class="right">￥{{order_totalprice | toFloat}}</strong>
			</p>
		</div>
		<div class="look clearfix" v-if="oeder_detail.order_status==4">
			<a class="active" v-if="oeder_detail.ordertype !=2 && oeder_detail.ordertype !=10" @click='recived(oeder_detail.order_code)'>确认收货</a>
			<router-link :to="{path:'/order/logistics_detail',query:{orderid:oeder_detail.id}}">查看物流</router-link>
		</div>
		<div class="look clearfix" v-if="oeder_detail.order_status==1||oeder_detail.order_status==14">
			<a @click="payment(oeder_detail.order_totalprice,oeder_detail.id,oeder_detail.ordertype,oeder_detail.paytype,oeder_detail.order_status)" class="active">付款</a>
			<a @click="cancelOrder()" href="javascript:;">取消订单</a>
		</div>
		<mt-popup v-model="popupVisible">
			<p>客官确定要取消订单吗？</p>
			<div>
				<a @click="wait">我再想想</a>
				<a class="special" @click="cancle">去意已决</a>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisible2">
			<p>请确认已收到所有商品</p>
			<div>
				<a @click="cancle_receive">取消</a>
				<a class="special" @click="sure_receive">确定</a>
			</div>
		</mt-popup>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Popup } from 'mint-ui';
	import {
		Toast
	} from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default{
		name:"order",
		data(){
			return{
				order_code:this.$route.query.order_code,
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token:this.$tool.getCookie("utoken"),
				oeder_detail:'',
				popupVisible:false,
				popupVisible2:false,
				goods_totalprice:0,
				freight:0,
				order_totalprice:0
			}
		},
		mounted() {
			this.getDetail()
		},
		methods:{
			getDetail(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/detail.json", {
					order_code:_this.order_code,
					token:_this.token
				}, "get", true, function(res) {
					if(res.bizCode=="000000") {
						_this.oeder_detail=res.data;
						_this.goods_totalprice=res.data.goods_totalprice;
						_this.freight=res.data.freight;
						_this.order_totalprice=res.data.order_totalprice;
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
			cancelOrder(){
				this.popupVisible=true;
			},
			wait(){
				this.popupVisible=false
			},
			cancle(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/order/cancelOrder.json", {
					order_code:_this.order_code,
					token:_this.token
				}, "get", true, function(res) {
					if(res.bizCode=="000000") {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						_this.popupVisible=false;
						_this.$router.push({
			               path: '/order/totle',
			               query: {
								order_status:'0',
							}
			            });
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
		}
	}
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	.address{
		display: flex;
		padding: 0.3rem;
		background: #fff;
		img{
			width: 0.26rem;
			height: 0.31rem;
			align-self: center;
			margin-top: 0.1rem;
		}
		div{
			flex: 1;
			margin-left: 0.2rem;
			h3{
				font-size: 0.36rem;
				margin-bottom: 0.1rem;
			}
			p{
				font-size: 0.3rem;
				line-height: 0.5rem;
			}
		}
	}
	.dd_top {
		padding: 0.15rem 0.5rem 0.15rem 0.8rem;
		background: #ff2c2c;
		
		span{
			float: left;
			height: 0.8rem;
			line-height: 0.8rem;
			color: #fff;
		}
		.message{
			width: 0.8rem;
			height: 0.81rem;
		}
		.produ_wait{
			width: 1.11rem;
			height: 0.82rem;
		}
		.wait_recive{
			width: 0.75rem;
			height: 0.71rem;
			padding-top: 0.05rem;
		}
		.wait_pay{
			padding-top: 0.1rem;
			width: 0.8rem;
			height: 0.66rem;
		}
	}
	
	.dd_product {
		padding: 0.15rem 0.3rem;
		background: #fff;
		h4{
			display: inline-block;
			padding: 2px 4px;
			font-size: 11px;
			font-weight: normal;
			color: #fff;
			margin-bottom: 0.15rem;
			background: #78bfff;
		}
		.pro {
			display: flex;
			display: -webkit-flex;
			border-bottom: 1px solid #eee;
			
			&:last-child{
				border-bottom: none;
			}
		}
		.gift{
			padding: 0.2rem 0 0.05rem;
			font-size: 0.26rem;
		}
		img{
			width: 1.38rem;
			height: 1.38rem;
			border: 1px solid #eeeeee;	
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
					width: 3.4rem;
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
	.look{
			text-align: right;
			font-size: 0.28rem;
			padding: 0.2rem 0.3rem;
			margin-top: 0.1rem;
			background: #fff;			
			a{
				float: right;
				width:1.46rem;
				padding: 0.1rem 0;
				text-align: center;
				border:1px solid #707070;
				border-radius: 20px;
				&.active{
					margin-left: 0.2rem;
					color:#ff2c2c;
					border:1px solid #ff2c2c;	
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
}
	
	
</style>