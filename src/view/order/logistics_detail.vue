<template>
	<div class="wrapper" v-title="'物流详情'">
		<div v-if="ordertype !='JD'&&logisticsList.length>1">
			<div class="tabBd">
				<a v-for="(item, index) in logisticsList" v-if="index<3" @click="packageChose(index,item.logisticscode,item.expressno,item.logisticsname)" :class="{active:active==index}">包裹{{index+1}}</a>
				<a v-if="logisticsList.length>3" class="special" @click="liShow">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<transition name="lishow">
				<ul v-show="lishow" class="ul_list">
					<li v-for="(item, index) in logisticsList" v-if="index>2" @click="packageChose(index,item.logisticscode,item.expressno,item.logisticsname)" :class="{active:active==index}">包裹{{index+1}}</li>
				</ul>
			</transition>
			<div class="posi_height"></div>
		</div>
		<div class="order-det">
			<div class="product_list" v-if="logisticsGoods.length>1">
				<ul class="clearfix">
					<li v-for="(item, index) in logisticsGoods">
						<img v-if="item.supply==''" :src="item.images"/>
						<img v-if="item.supply=='jd_mall'&&item.needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+item.images"/>
						<img v-if="item.supply=='jd_mall'&&item.needChangeImgUrl==true" :src="item.images"/>
						<b>X{{item.num}}</b>
					</li>
				</ul>
			</div>
			<div class="clearfix pro" v-else v-for="(item, index) in logisticsGoods">
				<img v-if="item.supply==''" :src="item.images"/>
				<img v-if="item.supply=='jd_mall'&&item.needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+item.images"/>
				<img v-if="item.supply=='jd_mall'&&item.needChangeImgUrl==true" :src="item.images"/>
				<div class="ddpr_name">
					<div class="">
						<span class="font26 nowrap">{{item.name}}</span>
						<strong class="font24">X{{item.num}}</strong>
					</div>
				</div>
			</div>
		</div>
		<div class="logistics_infor" v-if="ordertype!='JD'">
			<p>物流状态：{{state}}</p>
			<p>物流公司：{{logisticsname}}</p>
			<p>物流单号：{{expressno}}</p>
		</div>
		<div class="service" v-if="orderTrack !=''&&orderTrack !=null" ref="list">
			<h3>物流详情</h3>
			<ul>
				<li v-for="(item, index) in orderTrack">
					<div>
						<p>{{item.content}}</p>
						<p class="color-b0b0b0 border-bottom">{{item.msgTime}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "logistics",
		data() {
			return {
				orderid: this.$route.query.orderid,
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				ordertype:'',
				orderTrack:'',
				expressno:'',
				logisticsname:'',
				state:'',
				lishow:false,
				ordertype:'',
				logisticsList:'',
				str:{},
				active:'0',
				logisticsGoods:''
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			liShow(){
				if(this.lishow==true){
					this.lishow=false
				}else{
					this.lishow=true
				}
			},
			packageChose(index,logisticscode,expressno,logisticsname){
				let _this = this;
				_this.active=index;
				if(index==0){
					_this.orderTrack=_this.str[0].orderTrack;
					_this.expressno=_this.str[0].expressno;
					_this.logisticsname=_this.str[0].logisticsname;
					_this.state=_this.str[0].state;
					_this.logisticsGoods=_this.str[0].logisticsGoods;
				}else{
					var x="";
					for(var key in _this.str){
						if(index==key){
							x=_this.str[key];
						}
					}
					if(x==""){
						_this.$tool.sendOPtion(this, com.logistics_hosturl + "/order/getTrackWithOutOrder.json", {
							token:_this.token,
							logisticscode:logisticscode,
							expressno:expressno,
							logisticsname:logisticsname
						}, "get", true, function(res) {
							if(res.data) {
								_this.orderTrack=res.data.orderTrack;
								_this.ordertype=res.data.ordertype;
								_this.state=res.data.state;
								_this.logisticsname=res.data.logisticsname;
								_this.expressno=res.data.expressno;
								_this.str[index]=res.data;
								_this.logisticsGoods=res.data.logisticsGoods
							} else {
								Toast({
									message: res.bizMessage,
									position: 'top',
									duration: 1000
								});
								return false;
							}
						})
					}else{
						_this.orderTrack=x.orderTrack;
						_this.expressno=x.expressno;
						_this.logisticsname=x.logisticsname;
						_this.state=x.state;
						_this.logisticsGoods=x.logisticsGoods
					}
				}
			},
			getData(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.logistics_hosturl + "/order/orderTrack.json", {
					orderid:_this.orderid,
					token:_this.token
				}, "get", true, function(res) {
					if(res.data) {
						_this.ordertype=res.data.ordertype;
						_this.logisticsList=res.data.logisticsList;
						_this.orderTrack=res.data.orderTrack;
						_this.ordertype=res.data.ordertype;
						_this.state=res.data.state;
						_this.logisticsname=res.data.logisticsname;
						_this.expressno=res.data.expressno;
						_this.str[0]=res.data;
						_this.logisticsGoods=res.data.logisticsGoods
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
				
		}
	})
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
			justify-content: space-around;
			text-align: center;
			padding: 0 0 0 0.3rem;
			background: #fff;
			z-index: 111;
			border-bottom: 1px solid #232323;
			z-index: 1111;
			a{
				font-size:0.3rem;
				color:#232323;
				&.active{
					border-bottom: .04rem solid #78bfff;
				    box-sizing: border-box;
				    color: #78bfff;
				}
				&.special{
					text-align: right;
				}
				span{
					display: inline-block;
					width: 4px;
					height: 4px;
					background: #232323;
					border-radius: 100%;
				}
			}
		}
		.ul_list{
			position: fixed;
			top: 0.8rem;
			right: 0;
			width: 1.6rem;
			color: #fff;
			font-size: 0.28rem;
			background:#232323;
			z-index: 111;
			li{
				padding: 0.2rem 0;
				text-align: center;
				border-bottom: 1px solid #fff;
				&.active{
				    color: #78bfff;
				}
			}
		}
		.order-det{
			padding: 0.15rem 0.3rem;
			border-bottom: 1px solid #eeeeee;
			img{
				width: 1.38rem;
				height: 1.38rem;
				border: 1px solid #eeeeee;	
			}
			.pro{
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
			}
			.product_list{
				li{
					float: left;
					width: 1.4rem;
					margin-top: 0.15rem;
					margin-left: 0.66rem;
					b{
						display: block;
						text-align: center;
						font-size: 0.24rem;
					}
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
		.logistics_infor {
			padding: 0.3rem;
			font-size:0.26rem;
			background:#fff;
			p{
				height: 0.4rem;
				line-height: 0.4rem;
			}
		
		}
		.service{
			position: relative;
			margin-top: 0.2rem;
			padding: 0 0.3rem;
			background: #fff;
			h3{
				font-size:0.3rem;
				height: 0.6rem;
				line-height: 0.6rem;
				border-bottom:1px solid #d7d7d9;
			}
			ul{
				position: relative;
				padding: 0.3rem 0.2rem;
				li{
					position: relative;
				    background: url(../../assets/img/cion/border.png) repeat-y;
				    padding: 0 0.2rem 0.2rem;
				    div{
				    	display: flex;
					    font-size: 0.26rem;
					    flex-direction: column;
					    justify-content: space-between;
					    
					    p{
					    	padding-bottom: 0.2rem;
					    	line-height: 0.4rem;
					    }
					    
				    }
				    &:first-child:after{
						content: '';
					    position: absolute;
					    top: 0;
					    left: -0.1rem;
					    width: 0.14rem;
					    height: 0.14rem;
					    border-radius: 100%;
					    background:#78bfff;
					    border: 2px solid #c9e5ff;
					    -moz-border-radius:100%;
					    -webkit-border-radius: 100%;
					}
				    &:after {
					    content: '';
					    position: absolute;
					    top: 0.1rem;
					    left: -0.06rem;
					    width: 7px;
					    height: 7px;
					    border-radius: 100%;
					    -moz-border-radius:100%;
					    -webkit-border-radius: 100%;
					    background:#707070;
					}
					
				}
				
			}
			
		}
		.lishow-enter-active, .lishow-leave-active{
	        transition: 0.4s all ease;
	    }
	    .lishow-enter-active{
			transform: translate3d(0,0,0);
	    }
	    .lishow-leave-active{
		   transform: translate3d(0,-100%,0);
	    }
	    .lishow-enter,.lishow-leave{
		   transform: translate3d(0,-100%,0);
	    }
		
	}
	
</style>