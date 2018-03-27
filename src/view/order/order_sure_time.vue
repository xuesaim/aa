<template>
	<div class="wrapper" v-title="'确认订单'">
		<div class="clearfix payment">
			<span>京东配送</span>
		</div>
		<div class="dd_product mt10" v-if="reservingDateList!=''&&reservingDateList!=null&&reservingDateList!='undefined'">
			<div class="order-det">
				<div>
					<div class="clearfix pro">
						<ul>
							<li v-if="cart=='null'"><img :src="'http://img11.360buyimg.com/n1/'+images"/></li>
							<li v-else-if="cart=='cart'" v-for="(item, index) in small_piecesList"><img :src="'http://img11.360buyimg.com/n1/'+item.images"/></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="method" @click="timeshow('small_time')">
				<div class="pay_way">
					<p class="clearfix">
						<span class="left">中小件送货时间</span>
					</p>
					<p>{{dateStr}}</p>
				</div>
			</div>
		</div>
		<div class="dd_product mt10" v-if="reservingDateList_la!=''&&reservingDateList_la!=null&&reservingDateList_la!='undefined'">
			<div class="order-det">
				<div>
					<div class="clearfix pro">
						<ul>
							<li v-if="cart=='null'"><img :src="'http://img11.360buyimg.com/n1/'+images"/></li>
							<li v-else-if="cart=='cart'" v-for="(item, index) in large_appliancesList"><img :src="'http://img11.360buyimg.com/n1/'+item.images"/></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="method" @click="timeshow('la_time')">
				<div class="pay_way">
					<p class="clearfix">
						<span class="left">大件送货时间</span>
					</p>
					<p>{{dateStr_la}}</p>
				</div>
			</div>
		</div>
		<div class="dd_product mt10">
			<div class="order-det" v-if="installDateListAll!=''&&installDateListAll!=null&&installDateListAll!='undefined'">
				<div>
					<div class="clearfix pro">
						<ul>
							<li v-if="cart=='null'"><img :src="'http://img11.360buyimg.com/n1/'+images"/></li>
							<li v-else-if="cart=='cart'" v-for="(item, index) in large_appliancesList"><img :src="'http://img11.360buyimg.com/n1/'+item.images"/></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="method" @click="timeshow('install_time')" v-if="installDateListAll!=''&&installDateListAll!=null&&installDateListAll!='undefined'">
				<div class="pay_way">
					<p class="clearfix">
						<span class="left">大件安装时间</span>
					</p>
					<p>{{dateStr_install}}</p>
				</div>
			</div>
			<div class="telphone" v-if="(reservingDateList_la!=''&&reservingDateList_la!=null&&reservingDateList_la!='undefined')&&(installDateListAll==''||installDateListAll==null||installDateListAll=='undefined')">
				安装服务请联系京东家电热线：<a href="tel:400-656-1000">400-656-1000</a>
			</div>
		</div>
		<a href="javascript:;" class="sure" @click="time_sure">确认</a>
		<transition name="fade">
			<div class="position_ra" v-show="timeShow" @click="hide" @touchmove.prevent></div>
		</transition>
		<transition name="timeshow">
			<time-show v-show="timeShow" :reservingDateList="reservingDateList_time" :dateStr="dateStr_time" :timeBd="timeBd" :title="title" @listenToChildEvent="showFromChild" class="time-fix"></time-show>
		</transition>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
		Toast
	} from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	import timeShow from '../../components/timeShow.vue'
	export default{
		name: "wrapper",
		data() {
			return {
				timeShow:false,
				token:window.localStorage.getItem("token"),
				isDis:false,
				popupVisible:false,
				jdfreightmsg:'',
				acceptAnAppointment:'',
				promiseCalendar:'',
				promiseDate:this.$route.query.promiseDate,
				promiseTimeRange:this.$route.query.promiseTimeRange,
				promiseTimeRangeCode:this.$route.query.promiseTimeRangeCode,
				reservingDate:this.$route.query.reservingDate,
				installDate:this.$route.query.installDate,
				images:this.$route.query.images,
				skuClassifyType:this.$route.query.skuClassifyType,
				cart:this.$route.query.cart,
				welfareid:this.$route.query.welfareid,
				sku:this.$route.query.sku,
				activeid:this.$route.query.activeid,
				addresscallback:this.$route.query.addresscallback,
				dateStr:this.$route.query.dateStr,
				dateStr_la:this.$route.query.dateStr_la,
				dateStr_install:this.$route.query.dateStr_install,
				reservingDateList:JSON.parse(window.localStorage.getItem("reservingDateList")),
				reservingDateList_la:JSON.parse(window.localStorage.getItem("reservingDateList_la")),
				installDateList:[],
				installDateListAll:JSON.parse(window.localStorage.getItem("installDateListAll")),
				small_piecesList:JSON.parse(window.localStorage.getItem("small_piecesList")),
				large_appliancesList:JSON.parse(window.localStorage.getItem("large_appliancesList")),
				timeBd:'',
				reservingDateList_time:'',
				dateStr_time:'',
				num:0,
				title:'送货时间'
			}
		},
		components: {
		    timeShow,
		},
		mounted() {
			if(this.reservingDateList=="" || this.reservingDateList==null || this.reservingDateList=="undefined"){
				this.reservingDateList=''
			}
			if(this.reservingDateList_la=="" || this.reservingDateList_la==null || this.reservingDateList_la=="undefined"){
				this.reservingDateList_la=''
			}
			if(this.installDateList=="" || this.installDateList==null || this.installDateList=="undefined"){
				this.installDateList=[]
			}
			if(this.installDateListAll=="" || this.installDateListAll==null || this.installDateListAll=="undefined"){
				this.installDateListAll=''
			}
			if(this.small_piecesList=="" || this.small_piecesList==null || this.small_piecesList=="undefined"){
				this.small_piecesList=''
			}
			if(this.small_piecesList=="" || this.small_piecesList==null || this.small_piecesList=="undefined"){
				this.small_piecesList=''
			}
		},
		methods: {
			hide() {
				this.timeShow = false;
			},
			timeshow(time){
				if(time=="small_time"){
					this.title="送货时间";
					this.reservingDateList_time=this.reservingDateList;
					this.dateStr_time=this.dateStr;
				}else if(time=="la_time"){
					this.title="送货时间";
					this.reservingDateList_time=this.reservingDateList_la;
					this.dateStr_time=this.dateStr_la;
					
				}else if(time=="install_time"){
					this.title="安装时间";
					this.dateStr_time=this.dateStr_install;
					
					this.installDateList=[];
					for(var key in this.installDateListAll){
						for(var i=0;i<this.installDateListAll[key].length;i++){
							if(this.reservingDate==key){
								this.installDateList.push(this.installDateListAll[key][i]);
							}
						}
					}
					this.reservingDateList_time=this.installDateList;
				}
				this.timeBd=time;
				this.timeShow = true;
			},
			showFromChild(data,timeBd,time,promiseDate,promiseTimeRange,promiseTimeRangeCode,reservingDate,installDate) {
				this.timeShow=data;
				if(this.cart=="cart"){
					if(timeBd=="small_time"){
						this.dateStr=time;
						this.promiseDate=promiseDate;
						this.promiseTimeRange=promiseTimeRange;
						this.promiseTimeRangeCode=promiseTimeRangeCode;
					}else if(timeBd=="la_time"){
						this.dateStr_la=time;
						this.reservingDate=reservingDate;
						this.installDate=installDate;
						for(var key in this.installDateListAll){
							for(var i=0;i<this.installDateListAll[key].length;i++){
								if(this.reservingDate==key){
									this.installDateList=[];
									this.installDateList=this.installDateListAll[key];
									this.installDate=this.installDateListAll[key][0].installDate;
									this.dateStr_install=this.installDateListAll[key][0].dateStr;
								}
							}
						}
						
					}else if(timeBd=="install_time"){
						this.installDate=installDate;
						this.dateStr_install=time;
					}
				}else{
					if(timeBd=="small_time"){
						this.dateStr=time;
						this.promiseDate=promiseDate;
						this.promiseTimeRange=promiseTimeRange;
						this.promiseTimeRangeCode=promiseTimeRangeCode;
						this.reservingDate=reservingDate;
						this.installDate=installDate;
					}else if(timeBd=="la_time"){
						this.dateStr_la=time;
						this.dateStr=time;
						this.promiseDate=promiseDate;
						this.promiseTimeRange=promiseTimeRange;
						this.promiseTimeRangeCode=promiseTimeRangeCode;
						this.reservingDate=reservingDate;
						this.installDate=installDate;
						for(var key in this.installDateListAll){
							for(var i=0;i<this.installDateListAll[key].length;i++){
								if(this.reservingDate==key){
									this.installDateList=[];
									this.installDateList=this.installDateListAll[key];
									this.installDate=this.installDateListAll[key][0].installDate;
									this.dateStr_install=this.installDateListAll[key][0].dateStr;
								}
							}
						}
					}else if(timeBd=="install_time"){
						this.installDate=installDate;
						this.dateStr_install=time;
					}
				}
				
			},
			time_sure(){
				this.$router.replace({
					path: '/order/order_sure',
					query: {
						dateStr:this.dateStr,
						dateStr_la:this.dateStr_la,
						dateStr_install:this.dateStr_install,
						status:'1',
						cart:this.cart,
						welfareid:this.welfareid,
						sku:this.sku,
						activeid:this.activeid,
						promiseDate:this.promiseDate,
						promiseTimeRange:this.promiseTimeRange,
						promiseTimeRangeCode:this.promiseTimeRangeCode,
						reservingDate:this.reservingDate,
						installDate:this.installDate,
						addresscallback:this.addresscallback
					}
				});
			}
		},

	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Medium;
		.payment {
			font-size: 0.3rem;
			padding: 0.2rem 0.3rem;
			margin-bottom: 0.2rem;
			background: #fff;
			label {
				float: left;
				width: 0.38rem;
				height: 0.38rem;
				background: url(../../assets/img/cion/radio.png) no-repeat;
				background-size: 0.38rem 0.38rem;
				border-radius: 100%;
				vertical-align: middle;
				margin-right: 0.1rem;
			}
		}
		.dd_product {
			.order-det {
				padding: 0.15rem 0.3rem;
				background: #fff;
				.pro {
					display: flex;
					border-bottom: 1px solid #eeeeee;
					li{
						float: left;
						width: 1.4rem;
						height: 1.4rem;
						margin-right: 0.2rem;
						margin-bottom: 0.2rem;
						img {
							width: 1.38rem;
							height: 1.38rem;
							border: 1px solid #eeeeee;
						}
					}
				}
			}
			.method {
				padding: 0 0.3rem;
				font-size: 0.26rem;
				background: #fff;
				
				.pay_way {
					padding: 0.1rem 0.5rem 0.1rem 0;
					background: url(../../assets/img/cion/right_icon.png) right 0.3rem no-repeat;
					background-size: 0.18rem 0.3rem;
					p {
						height: 0.4rem;
						line-height: 0.4rem;
						margin-bottom: 0.05rem;
						&.special {
							margin-bottom: 0.1rem;
							text-align: right;
							color: #bbb;
						}
					}
				}
				.tot_money {
					padding: 0.1rem 0;
					margin-top: 0.55rem;
					border-top: 1px solid #eeeeee;
					p {
						height: 0.4rem;
						line-height: 0.4rem;
						margin-top: 0.05rem;
					}
				}
			}
			.telphone{
				margin-top: 0.1rem;
				font-size: 0.3rem;
				padding: 0.2rem 0.3rem;
				text-align: center;
				background: #fff;
			}
			
		}
		.sure{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ff2c2c;
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.36rem;
			color: #ffffff;
			text-align: center;
		}
		.fade-enter-active, .fade-leave-active{
            transition: 0.5s all ease;
        }
        .fade-enter-active{
            opacity:1;
        }
        .fade-leave-active{
            opacity:0;
        }
        .fade-enter,.fade-leave{
            opacity:0;
        }
		.timeshow-enter-active, .timeshow-leave-active{
            transition: 0.4s all ease;
        }
        .timeshow-enter-active{
        	transform: translate3d(0,0,0);
           
        }
        .timeshow-leave-active{
            transform: translate3d(0,100%,0);
        }
        .timeshow-enter,.timeshow-leave{
            transform: translate3d(0,100%,0);
        }
		.time-fix{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 222;
		}
	}
</style>