<template>
	<div class="wrapper" v-title="'确认订单'">
		<div class="address">
			<img src="../../assets/img/cion/position_icon.png"/>
			<div class="address_det">
				<div class="address_name">
					<strong>{{addressName}}</strong>
					<strong>{{addressTel}}</strong>
				</div>
				<span>收货地址：{{provincetext}}{{citytext}}{{countytext}}{{towntext}}{{address}}</span>
				<div class="chose_address">请选择地址</div>
			</div>
		</div>
		<div class="dd_product mt10" v-if="aviGoodsInfoList.length!=0 && cart !=''">
			<div class="order-det">
				<h4 class="bac-78bfff">小福甄选</h4>
				<div class="clearfix pro" v-for="(item, index) in aviGoodsInfoList">
					<img :src="item.images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26 nowrap">{{item.name}}</span>
							<strong class="font24">￥ {{item.sellingprice | toFloat}}</strong>
						</div>
						<div class=" color-b0b0b0 font22">
							<span class="">{{item.normsinfo}}</span>
							<strong class="">X {{item.num}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dd_price" v-if="aviGoodsInfoList.length!=0 && cart !=''">
			<p class="clearfix">
				<span class="left">配送方式</span>
				<span class="right">小福配送(包邮)</span>
			</p>
			<p class="clearfix">
				<span class="left">小计商品金额</span>
				<span class="right color-ff2c2c" v-if="cart==''">￥ {{goods_totalprice | toFloat}}</span>
				<span class="right color-ff2c2c" v-if="cart!=''">￥ {{goods_totalprice_avi | toFloat}}</span>
			</p>
		</div>
		<div class="dd_product mt10" v-if="jdGoodsInfoList.length!=0 && cart !=''">
			<div class="order-det">
				<h4 class="bac-ff2c2c">京东优选</h4>
				<div v-for="(item, index) in jdGoodsInfoList">
					<div class="clearfix pro">
						<img :src="'http://img11.360buyimg.com/n1/'+item.images" />
						<div class="ddpr_name clearfix">
							<div class="">
								<span class="font26 nowrap">{{item.name}}</span>
								<strong class="font24">￥ {{item.sellingprice | toFloat}}</strong>
							</div>
							<div class=" color-b0b0b0 font22">
								<span class="">{{item.normsinfo}}</span>
								<strong class="">X{{item.num}}</strong>
							</div>
						</div>
					</div>
					<div class="border-bottom" v-if="gifts_show && item.gifts !=''&&item.gifts !=null">
						<div class="clearfix gifts_top">
							<span class="left">赠品</span>
							<b class="right" @click="gifts_delate">
								<img src="../../assets/img/cion/close.png"/>
							</b>
						</div>
						<div class="zengpin" v-for="(value, index) in item.gifts">
							{{value.name}}
						</div>
					</div>
				</div>
			</div>
			<div class="method">
				<div class="pay_way" :class="{active:activeStyle}" @click="product_list('cart')">
					<p class="clearfix">
						<span class="left">配送方式</span>
						<span class="right">京东配送</span>
					</p>
					<p class="special" v-if="promiseCalendar.reservingDateList_la!=''&&promiseCalendar.reservingDateList_la!='undefined'&&promiseCalendar.reservingDateList_la!=null">[大件]送货时间:{{dateStr_la}}</p>
					<p class="special" v-if="JSON.stringify(promiseCalendar.installDateList) !='{}'&&JSON.stringify(promiseCalendar.installDateList) !=null">[大件]安装时间:{{dateStr_install}}</p>
					<p class="special" v-if="promiseCalendar.reservingDateList!=''&&promiseCalendar.reservingDateList !=null &&promiseCalendar.reservingDateList !='undefined'">[中小件]送货时间:{{dateStr}}</p>
				</div>
				<div class="tot_money">
					<p class="clearfix">
						<span class="left">小计商品金额</span>
						<span class="right color-ff2c2c">￥ {{goods_totalprice_jd | toFloat}}</span>
					</p>
					<p class="clearfix">
						<span class="left">运费</span>
						<span class="right color-ff2c2c">+￥ {{freight | toFloat}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="dd_product mt10" v-if="cart=='' && goods.JDGoods==false">
			<div class="order-det">
				<h4 class="bac-78bfff">小福甄选</h4>
				<div class="clearfix pro">
					<img :src="goods.images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26 nowrap">{{goods.name}}</span>
							<strong class="font24">￥ {{goods.sellingprice | toFloat}}</strong>
						</div>
						<div class=" color-b0b0b0 font22">
							<span class="">{{goods.normsinfo}}</span>
							<strong class="">X {{goods.num}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dd_price" v-if="cart=='' && goods.JDGoods==false">
			<p class="clearfix">
				<span class="left">配送方式</span>
				<span class="right">小福配送(包邮)</span>
			</p>
			<p class="clearfix">
				<span class="left">小计商品金额</span>
				<span class="right color-ff2c2c" v-if="cart==''">￥ {{goods_totalprice | toFloat}}</span>
				<span class="right color-ff2c2c" v-if="cart!=''">￥ {{goods_totalprice_avi | toFloat}}</span>
			</p>
		</div>
		<div class="dd_product mt10" v-if="cart=='' && goods.JDGoods==true ">
			<div class="order-det">
				<h4 class="bac-ff2c2c">京东优选</h4>
				<div>
					<div class="clearfix pro">
						<img :src="'http://img11.360buyimg.com/n1/'+goods.images" />
						<div class="ddpr_name clearfix">
							<div class="">
								<span class="font26 nowrap">{{goods.name}}</span>
								<strong class="font24">￥ {{goods.sellingprice | toFloat}}</strong>
							</div>
							<div class=" color-b0b0b0 font22">
								<span class="">{{goods.normsinfo}}</span>
								<strong class="">X {{goods.num}}</strong>
							</div>
						</div>
					</div>
					<div class="border-bottom" v-if="gifts_show && goods.gifts !=''&& goods.gifts !=null">
						<div class="clearfix gifts_top">
							<span class="left">赠品</span>
							<b class="right" @click="gifts_delate">
								<img src="../../assets/img/cion/close.png"/>
							</b>
						</div>
						<div class="zengpin clearfix" v-for="(value, index) in goods.gifts">
							{{value.name}}
						</div>
					</div>
				</div>
			</div>
			<div class="method">
				<div class="pay_way" :class="{active:activeStyle}" @click="product_list('null')">
					<p class="clearfix">
						<span class="left">配送方式</span>
						<span class="right">京东配送</span>
					</p>
					<p class="special" v-if="promiseCalendar.reservingDateList_la !=''&&promiseCalendar!=''">[大件]送货时间:{{dateStr_la}}</p>
					<p class="special" v-if="JSON.stringify(promiseCalendar.installDateList) !='{}'&&promiseCalendar!=''">[大件]安装时间:{{dateStr_install}}</p>
					<p class="special" v-if="promiseCalendar.reservingDateList !=''&&promiseCalendar!=''">[中小件]送货时间:{{dateStr}}</p>
				</div>
				<div class="tot_money">
					<p class="clearfix">
						<span class="left">小计商品金额</span>
						<span class="right color-ff2c2c">￥ {{goods_totalprice | toFloat}}</span>
					</p>
					<p class="clearfix">
						<span class="left">运费</span>
						<span class="right color-ff2c2c">+￥ {{freight | toFloat}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="mt10 price" v-if="welfareid ==''|| welfareid ==null || welfareid =='undefined'">
			<p class="clearfix">
				<span>商品总额:</span>
				<span class="right color-ff2c2c">￥ {{goods_totalprice | toFloat}}</span>
			</p>
			<p class="clearfix">
				<span>运费:</span>
				<span class="right color-ff2c2c">￥ {{freight | toFloat}}</span>
			</p>
		</div>
		<div style="height: 1rem;"></div>
		<div class="pay_bottom clearfix">
			<div class="left">实付款:<span class="color-ff2c2c">￥ {{order_totalprice | toFloat}}</span></div>
			<i class="left" @click="sendOrder" v-if="isActive==false" v-text="welfareid!='' && welfareid!=null && welfareid!='undefined' ?'领取福利':'提交订单'"></i>
			<i class="left active" v-else v-text="welfareid!='' && welfareid!=null && welfareid!='undefined' ?'领取福利':'提交订单'"></i>
		</div>
		<!--<mt-popup v-model="popupVisible">
			<p>京东优选商品满159元<br>包邮，再去看看么？</p>
			<div>
				<a @click="wait">提交订单</a>
				<router-link class="special" to="/prefer/jd">去凑单</router-link>
			</div>
		</mt-popup>-->
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
	import timeShow from '../../components/timeShow.vue';
	import '../../assets/less/confirm.less';
	export default{
		name: "wrapper",
		data() {
			return {
				addressid:'1',//地址id
				addressName:'猴子搬来的救兵',//地址人姓名
				addressTel:'18614025117',//地址人手机号
				province:'-100',//省编号
				provincetext:'26',//省名字
				city:'3971',//市编号
				citytext:'0',//市名字
				county:'3981',//区编号
				countytext:'0',//区名字
				town:'12278',//县编号
				towntext:'0',//县名字
				address:'1号楼',//具体地址
				sku:this.$route.query.sku,
//				sku:'2695883!1@@2388423!1@@569172!1',
				cart:this.$route.query.cart,
				welfareid:this.$route.query.welfareid,
				activeid:this.$route.query.activeid,
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token:this.$tool.getCookie("utoken"),
				aviGoodsInfoList:[],
				jdGoodsInfoList:'',
				order:[],
				goods_totalprice_avi:'',
				goods_totalprice_jd:'',
				order_totalprice:'',
				orderId:'',
				paymentType:'',
				goods:'',
//				popupVisible:false,
				jdfreightmsg:'',
				acceptAnAppointment:'',
				promiseCalendar:'',
				dateStr:'',
				dateStr_la:'',
				dateStr_install:'',
				promiseDate:'',
				promiseTimeRange:'',
				promiseTimeRangeCode:'0',
				reservingDate:'-2',
				installDate:'0',
				status:this.$route.query.status,
				installDateList:[],
				installDateListAll:[],
				bizMessage:'',
				isActive:false,
				activeStyle:true,
				goods_totalprice:0,
				freight:0,
				order_totalprice:0,
				needAnnexFlag:true,
				isbNeedAnnex:'',
				gifts_show:true
			}
		},
		components: {
		    timeShow,
		},
		deactivated() {
		    this.$destroy()
		},
		watch: {
		   province(newValue,oldValue) {
		   		if(this.province !='-100'){
					if(this.cart=="" || this.cart==null || this.cart=="undefined" ||this.cart=="null"){
						this.cart='';
						this.confirmOrdernow();
					}else{
						this.cart=this.$route.query.cart;
						this.confirmOrder()
					}
				}
		   }
		},
		mounted() {
//			this.province=26;
			window.localStorage.setItem("token",this.token);
			this.token=window.localStorage.getItem("token");
			
			if(this.welfareid==""||this.welfareid==null || this.welfareid=="undefined"){
				this.welfareid='';
			}else{
				this.welfareid=this.$route.query.welfareid
			}
			if(this.activeid==""||this.activeid==null || this.activeid=="undefined"){
				this.activeid='';
			}else{
				this.activeid=this.$route.query.activeid
			}
			window.localStorage.removeItem("reservingDateList");
			window.localStorage.removeItem("reservingDateList_la");
			window.localStorage.removeItem("installDateList");
			window.localStorage.removeItem("installDateListAll");
			window.localStorage.removeItem("small_piecesList");
			window.localStorage.removeItem("large_appliancesList");
			if((this.promiseCalendar.reservingDateList !=''&&this.promiseCalendar.reservingDateList !=null && this.promiseCalendar.reservingDateList !='undefined')|| (this.promiseCalendar.reservingDateList_la !=''&&this.promiseCalendar.reservingDateList_la !=null && this.promiseCalendar.reservingDateList_la !='undefined')){
				this.activeStyle=false;
			}else{
				this.activeStyle=true;
			}
			
			
		},
		methods: {
			gifts_delate(){
				this.gifts_show=false;
				this.isActive=false;
				this.isbNeedAnnex=false;
			},
			product_list(cart){
				if(this.promiseCalendar.reservingDateList !=""&&this.promiseCalendar.reservingDateList!=null && this.promiseCalendar.reservingDateList!="undefined"){
					window.localStorage.setItem("reservingDateList",JSON.stringify(this.promiseCalendar.reservingDateList));
				}
				if(this.installDateList !=""&&this.installDateList!=null && this.installDateList!="undefined"){
					window.localStorage.setItem("installDateList",JSON.stringify(this.installDateList));
				}
				if(JSON.stringify(this.promiseCalendar.installDateList) !="{}"){
					window.localStorage.setItem("installDateListAll",JSON.stringify(this.promiseCalendar.installDateList));
					
				}
				if(this.promiseCalendar.reservingDateList_la !=""&&this.promiseCalendar.reservingDateList_la!=null && this.promiseCalendar.reservingDateList_la!="undefined"){
					window.localStorage.setItem("reservingDateList_la",JSON.stringify(this.promiseCalendar.reservingDateList_la));
				}
				if(this.promiseCalendar.small_piecesList !=""&&this.promiseCalendar.small_piecesList!=null && this.promiseCalendar.small_piecesList!="undefined"){
					window.localStorage.setItem("small_piecesList",JSON.stringify(this.promiseCalendar.small_piecesList));
				}
				if(this.promiseCalendar.large_appliancesList !=""&&this.promiseCalendar.large_appliancesList!=null && this.promiseCalendar.large_appliancesList!="undefined"){
					window.localStorage.setItem("large_appliancesList",JSON.stringify(this.promiseCalendar.large_appliancesList));
				}
				
				if((this.promiseCalendar.reservingDateList !=''&&this.promiseCalendar.reservingDateList !=null && this.promiseCalendar.reservingDateList !='undefined')|| (this.promiseCalendar.reservingDateList_la !=''&&this.promiseCalendar.reservingDateList_la !=null && this.promiseCalendar.reservingDateList_la !='undefined')){
					if(cart=='null'){
						let images=this.goods.images;
						this.$router.push({
							path: '/order/order_sure_time',
							query: {
								cart:cart,
								welfareid:this.welfareid,
								sku:this.sku,
								activeid:this.activeid,
								images:images,
								skuClassifyType:this.promiseCalendar.skuClassifyType,
								dateStr:this.dateStr,
								dateStr_la:this.dateStr_la,
								dateStr_install:this.dateStr_install,
								promiseDate:this.promiseDate,
								promiseTimeRange:this.promiseTimeRange,
								promiseTimeRangeCode:this.promiseTimeRangeCode,
								reservingDate:this.reservingDate,
								installDate:this.installDate,
								addresscallback:this.addresscallback
							}
						});
					}else{
						this.$router.push({
							path: '/order/order_sure_time',
							query: {
								cart:cart,
								welfareid:this.welfareid,
								sku:this.sku,
								activeid:this.activeid,
								skuClassifyType:this.promiseCalendar.skuClassifyType,
								dateStr:this.dateStr,
								dateStr_la:this.dateStr_la,
								dateStr_install:this.dateStr_install,
								promiseDate:this.promiseDate,
								promiseTimeRange:this.promiseTimeRange,
								promiseTimeRangeCode:this.promiseTimeRangeCode,
								reservingDate:this.reservingDate,
								installDate:this.installDate,
								addresscallback:this.addresscallback
							}
						});
					}
				}
			},
			confirmOrder(){
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/order/confirmOrder.json', {
					addressid:_this.addressid,
					name:_this.addressName,
					mobile:_this.addressTel,
					province:_this.province,
					provincetext:_this.provincetext,
					city:_this.city,
					citytext:_this.citytext,
					county:_this.county,
					countytext:_this.countytext,
					town:_this.town,
					towntext:_this.towntext,
					address:_this.address,
					skuIDs:_this.sku,
					welfareid:_this.welfareid,
					activeid:_this.activeid,
					token:_this.token,
					
				}, "get", true, function(res) {
					if(res.data) {
						_this.aviGoodsInfoList=res.data.aviGoodsInfoList;
						_this.jdGoodsInfoList=res.data.jdGoodsInfoList
						_this.order=res.data.order;
						_this.goods_totalprice_jd=res.data.goods_totalprice_jd;
						_this.goods_totalprice_avi=res.data.goods_totalprice_avi;
						_this.jdfreightmsg=res.data.jdfreightmsg;
						
						_this.goods_totalprice=res.data.order.goods_totalprice;
						_this.freight=res.data.order.freight;
						_this.order_totalprice=res.data.order.order_totalprice;
						
						/*大小件时间选择(购物车)*/
						
						
						if(res.data.promiseCalendar !=''&&res.data.promiseCalendar !=null && res.data.promiseCalendar!="undefined" && res.bizCode=="000000"){
							_this.promiseCalendar=res.data.promiseCalendar;
							if(_this.status==1){//从order_sure_time过来的
								_this.dateStr=_this.$route.query.dateStr;
								_this.dateStr_la=_this.$route.query.dateStr_la;
								_this.dateStr_install=_this.$route.query.dateStr_install;
								_this.promiseDate=_this.$route.query.promiseDate;
								_this.promiseTimeRange=_this.$route.query.promiseTimeRange;
								_this.promiseTimeRangeCode=_this.$route.query.promiseTimeRangeCode;
								_this.reservingDate=_this.$route.query.reservingDate;
								_this.installDate=_this.$route.query.installDate;
							}else{
								if(_this.promiseCalendar.reservingDateList !=""&&_this.promiseCalendar.reservingDateList !=null && _this.promiseCalendar.reservingDateList !="undefined"){
									for(var i=0;i<_this.promiseCalendar.reservingDateList.length;i++){
										if(_this.promiseCalendar.reservingDateList[i].selected==true){
											_this.dateStr=_this.promiseCalendar.reservingDateList[i].dateStr;
											_this.promiseDate=_this.promiseCalendar.reservingDateList[i].promiseDate;
											_this.promiseTimeRange=_this.promiseCalendar.reservingDateList[i].promiseTimeRange;
											_this.promiseTimeRangeCode=_this.promiseCalendar.reservingDateList[i].promiseTimeRangeCode;
											_this.reservingDate=_this.promiseCalendar.reservingDateList[i].reservingDate;
										}
									}
								}
								if(_this.promiseCalendar.reservingDateList_la !=""&&_this.promiseCalendar.reservingDateList_la !=null && _this.promiseCalendar.reservingDateList_la !="undefined"){
									for(var i=0;i<_this.promiseCalendar.reservingDateList_la.length;i++){
										if(_this.promiseCalendar.reservingDateList_la[i].selected==true){
											
											_this.dateStr_la=_this.promiseCalendar.reservingDateList_la[i].dateStr;
											_this.reservingDate=_this.promiseCalendar.reservingDateList_la[i].reservingDate;
											_this.installDate=_this.promiseCalendar.reservingDateList_la[i].installDate;
										}
									}
								}
								for(var key in _this.promiseCalendar.installDateList){
									for(var i=0;i<_this.promiseCalendar.installDateList[key].length;i++){
										if(_this.reservingDate==key){
											_this.installDateList.push(_this.promiseCalendar.installDateList[key][i]);
											_this.installDate=_this.promiseCalendar.installDateList[key][0].installDate;
											_this.dateStr_install=_this.promiseCalendar.installDateList[key][0].dateStr;
										}
									}
								}
							}
							
						}else if(res.bizCode=="411204"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.acceptAnAppointment=res.bizCode;
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else if(res.bizCode!="000000"){
							_this.bizMessage=res.bizMessage;
							_this.isActive=true;
							Toast({
								message: res.bizMessage,
								position: 'top',
								duration: 5000
							});
						}
						
						
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
			},
			confirmOrdernow(){
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/order/getGoodsInfoFromBuynow.json', {
					addressid:_this.addressid,
					name:_this.addressName,
					mobile:_this.addressTel,
					province:_this.province,
					provincetext:_this.provincetext,
					city:_this.city,
					citytext:_this.citytext,
					county:_this.county,
					countytext:_this.countytext,
					town:_this.town,
					towntext:_this.towntext,
					address:_this.address,
					skuIDs:_this.sku,
					welfareid:_this.welfareid,
					activeid:_this.activeid,
					token:_this.token,
					
				}, "get", true, function(res) {
					if(res.data) {
//						_this.paymentType=res.data.paymentType;
						_this.goods=res.data.goods;
						_this.order=res.data.order;
						_this.jdfreightmsg=res.data.jdfreightmsg;
						
						_this.goods_totalprice=res.data.order.goods_totalprice;
						_this.freight=res.data.order.freight;
						_this.order_totalprice=res.data.order.order_totalprice;
						
						/*大小件时间选择(立即购买)*/
						if(_this.goods.JDGoods==true && res.bizCode=="000000"){
							_this.promiseCalendar=res.data.promiseCalendar;
							if(_this.status==1){
								_this.dateStr=_this.$route.query.dateStr;
								_this.dateStr_la=_this.$route.query.dateStr_la;
								_this.dateStr_install=_this.$route.query.dateStr_install;
								_this.promiseDate=_this.$route.query.promiseDate;
								_this.promiseTimeRange=_this.$route.query.promiseTimeRange;
								_this.promiseTimeRangeCode=_this.$route.query.promiseTimeRangeCode;
								_this.reservingDate=_this.$route.query.reservingDate;
								_this.installDate=_this.$route.query.installDate;
							}else{
								
								if(_this.promiseCalendar.skuClassifyType=='1'){
									for(var i=0;i<_this.promiseCalendar.reservingDateList.length;i++){
										if(_this.promiseCalendar.reservingDateList[i].selected==true){
											
											_this.dateStr=_this.promiseCalendar.reservingDateList[i].dateStr;
											_this.promiseDate=_this.promiseCalendar.reservingDateList[i].promiseDate;
											_this.promiseTimeRange=_this.promiseCalendar.reservingDateList[i].promiseTimeRange;
											_this.promiseTimeRangeCode=_this.promiseCalendar.reservingDateList[i].promiseTimeRangeCode;
											_this.reservingDate=_this.promiseCalendar.reservingDateList[i].reservingDate;
											_this.installDate=_this.promiseCalendar.reservingDateList[i].installDate;
										}
									}
								}else{
									if(_this.promiseCalendar.reservingDateList !=""&&_this.promiseCalendar.reservingDateList !=null && _this.promiseCalendar.reservingDateList !="undefined"){
										for(var i=0;i<_this.promiseCalendar.reservingDateList.length;i++){
											if(_this.promiseCalendar.reservingDateList[i].selected==true){
												
												_this.dateStr=_this.promiseCalendar.reservingDateList[i].dateStr;
												_this.promiseDate=_this.promiseCalendar.reservingDateList[i].promiseDate;
												_this.promiseTimeRange=_this.promiseCalendar.reservingDateList[i].promiseTimeRange;
												_this.promiseTimeRangeCode=_this.promiseCalendar.reservingDateList[i].promiseTimeRangeCode;
												_this.reservingDate=_this.promiseCalendar.reservingDateList[i].reservingDate;
												_this.installDate=_this.promiseCalendar.reservingDateList[i].installDate;
											}
										}
									}
									if(_this.promiseCalendar.reservingDateList_la !=""&&_this.promiseCalendar.reservingDateList_la !=null && _this.promiseCalendar.reservingDateList_la !="undefined"){
										for(var i=0;i<_this.promiseCalendar.reservingDateList_la.length;i++){
											if(_this.promiseCalendar.reservingDateList_la[i].selected==true){
												
												_this.dateStr_la=_this.promiseCalendar.reservingDateList_la[i].dateStr;
												_this.reservingDate=_this.promiseCalendar.reservingDateList_la[i].reservingDate;
												_this.installDate=_this.promiseCalendar.reservingDateList_la[i].installDate;
											}
										}
									}
									for(var key in _this.promiseCalendar.installDateList){
										for(var i=0;i<_this.promiseCalendar.installDateList[key].length;i++){
											if(_this.reservingDate==key){
												_this.installDateList.push(_this.promiseCalendar.installDateList[key][i]);
												_this.installDate=_this.promiseCalendar.installDateList[key][0].installDate;
												_this.dateStr_install=_this.promiseCalendar.installDateList[key][0].dateStr;
											}
										}
									}
									
								}
							}
						}else if(res.bizCode=="411204"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.acceptAnAppointment=res.bizCode;
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else if(res.bizCode!="000000"){
							_this.bizMessage=res.bizMessage;
							_this.isActive=true;
							Toast({
								message: res.bizMessage,
								position: 'top',
								duration: 5000
							});
						}
						
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
			},
			sendOrder(){
				if(this.bizMessage !=""){
					Toast({
						message: this.bizMessage,
						position: 'top',
						duration: 1000
					});
					
					return false;
				}
				if(this.jdfreightmsg!='' && this.jdfreightmsg!=null){
//					this.popupVisible=true;
					MessageBox.confirm('', {
		                message: '京东优选商品满159元包邮，再去看看么？',
		                confirmButtonText: '提交订单',
        				cancelButtonText: '去凑单'
		            }).then(action => {
		                this.wait();
		            }).catch(err => {
		                this.$router.push({
							path: '/prefer/jd',
						});
		            })
				}else if(this.welfareid!='' && this.welfareid!=null && this.welfareid!='undefined'){
					MessageBox.confirm('', {
		                message: '您确定要领取'+this.goods.name+'吗？提交订单后就不可修改了呦~',
		                confirmButtonText: '就选它',
        				cancelButtonText: '再想想'
		            }).then(action => {
		                this.wait();
		            }).catch(err => {
		                this.isActive=true;
		            })
				}else{
					this.wait();
				}
			},
			wait(){
				let _this=this;
//				_this.popupVisible=false;
				if(_this.addressid=="" || _this.addressid==null || _this.addressid=='0'){
					Toast({
						message: '请选择地址',
						position: 'top',
						duration: 1000
					});
					return false;
				}
				_this.isActive=true;
				if(_this.cart == ''){
					_this.$tool.sendOPtion(this, com.order_hosturl + '/order/createOrderFromBuynow.json', {
						addressid:_this.addressid,
						name:_this.addressName,
						mobile:_this.addressTel,
						province:_this.province,
						provincetext:_this.provincetext,
						city:_this.city,
						citytext:_this.citytext,
						county:_this.county,
						countytext:_this.countytext,
						town:_this.town,
						towntext:_this.towntext,
						address:_this.address,
						skuIDs:_this.sku,
						email:'',
						token:_this.token,
						welfareid:_this.welfareid,
						activeid:_this.activeid,
						acceptAnAppointment:_this.acceptAnAppointment,
						reservingDate:_this.reservingDate,
						installDate:_this.installDate,
						promiseDate:_this.promiseDate,
						promiseTimeRange:_this.promiseTimeRange,
						promiseTimeRangeCode:_this.promiseTimeRangeCode,
						isbNeedAnnex:_this.isbNeedAnnex

					}, "get", true, function(res) {
						if(res.bizCode=="000000") {
							_this.order_totalprice=res.data.order_totalprice;
							_this.orderId=res.data.orderId;
							_this.paymentType=res.data.paymentType;

							if(_this.paymentType==107 || _this.paymentType==102 ||_this.paymentType==103|| _this.paymentType==109){
								_this.$router.push({
									path: '/pay/pay_confirm',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}else if(_this.paymentType==105 || _this.paymentType==101 ||_this.paymentType==104){
								_this.$router.push({
									path: '/pay/pay_method',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}else if(_this.paymentType==108){
								_this.$router.push({
									path: '/pay/pay_supplier',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}else if(_this.paymentType==100){//100为免费订单（福利礼包）
								Toast({
									message: '领取成功',
									position: 'middle',
									duration: 1000
								});
								_this.$router.push({
									path: '/order/shipment',
									query: {
										order_status:'2',
									}
								});
							}
						}else if(res.bizCode=="411204"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.acceptAnAppointment=res.bizCode;
				                _this.wait();
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else if(res.bizCode=="411707"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.isbNeedAnnex=false;
				                _this.wait();
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else{
							Toast({
								message: res.bizMessage,
								position: 'middle',
								duration: 5000
							});
							_this.isActive=true;
						}
					});
				}else{
					_this.$tool.sendOPtion(this, com.order_hosturl + '/order/createOrderFromShoppingCart.json', {
						addressid:_this.addressid,
						name:_this.addressName,
						mobile:_this.addressTel,
						province:_this.province,
						provincetext:_this.provincetext,
						city:_this.city,
						citytext:_this.citytext,
						county:_this.county,
						countytext:_this.countytext,
						town:_this.town,
						towntext:_this.towntext,
						address:_this.address,
						skuIDs:_this.sku,
						ordertype:'',
						email:'',
						token:_this.token,
						acceptAnAppointment:_this.acceptAnAppointment,
						reservingDate:_this.reservingDate,
						installDate:_this.installDate,
						promiseDate:_this.promiseDate,
						promiseTimeRange:_this.promiseTimeRange,
						promiseTimeRangeCode:_this.promiseTimeRangeCode,
						isbNeedAnnex:_this.isbNeedAnnex
					}, "get", true, function(res) {
						if(res.bizCode=="000000") {
							_this.order_totalprice=res.data.order_totalprice;
							_this.orderId=res.data.orderId;
							_this.paymentType=res.data.paymentType;
							
							if(_this.paymentType==107 || _this.paymentType==102 ||_this.paymentType==103 || _this.paymentType==109){
								_this.$router.push({
									path: '/pay/pay_confirm',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}else if(_this.paymentType==105 || _this.paymentType==101 ||_this.paymentType==104){
								_this.$router.push({
									path: '/pay/pay_method',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}else if(_this.paymentType==108){
								_this.$router.push({
									path: '/pay/pay_supplier',
									query: {
										order_totalprice:_this.order_totalprice,
										paymentType:_this.paymentType,
										orderId:_this.orderId
									}
								});
							}
							
						}else if(res.bizCode=="411204"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.acceptAnAppointment=res.bizCode;
				                _this.wait();
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else if(res.bizCode=="411707"){
							MessageBox.confirm('', {
				                message: res.bizMessage,
				                confirmButtonText: '是',
                				cancelButtonText: '否'
				            }).then(action => {
				                _this.isbNeedAnnex=false;
				                _this.wait();
				            }).catch(err => {
				                _this.isActive=true;
				            })
						}else{
							Toast({
								message: res.bizMessage,
								position: 'middle',
								duration: 5000
							});
							_this.isActive=true;
						}
					});
				}
				
			},
		},

	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		.address{
			display: flex;
			padding: 0.3rem;
			font-size: 0.36rem;
			background: #fff;
			img{
				width: 0.26rem;
				height: 0.31rem;
				align-self: center;
				margin-right: 0.2rem;
				margin-top: 0.3rem;
			}
			.address_det{
				flex: 1;
				.address_name{
					margin-bottom: 0.2rem;
					background: url(../../assets/img/cion/right_icon.png) right 0.05rem no-repeat;
					background-size:0.18rem 0.3rem;
				}
				.chose_address{
					background: url(../../assets/img/cion/right_icon.png) right 0.05rem no-repeat;
					background-size:0.18rem 0.3rem;
				}
				span{
					font-size: 0.3rem;
				}
			}
			
		}
		.dd_product {
			.order-det {
				padding: 0.15rem 0.3rem;
				background: #fff;
				h4 {
					display: inline-block;
					padding: 2px 4px;
					font-size: 11px;
					font-weight: normal;
					color: #fff;
				}
				img {
					width: 1.38rem;
					height: 1.38rem;
					border: 1px solid #eeeeee;
				}
				.pro {
					display: flex;
					padding:0.2rem 0;
					border-bottom: 1px solid #eeeeee;
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
					>div {
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
				.product_list {
					li {
						float: left;
						width: 1.4rem;
						height: 1.4rem;
						margin-top: 0.15rem;
						margin-right: 0.2rem;
					}
					a {
						padding-top: 0.6rem;
						float: right;
						img {
							width: 0.24rem;
							height: 0.05rem;
						}
					}
				}
				.gifts_top{
					font-size:0.26rem;
					padding-top: 0.2rem;
					height: 0.4rem;
					line-height: 0.4rem;
					b{
						width: 0.6rem;
						height: 0.4rem;
						text-align: center;
						img{
							width: 0.4rem;
							height: 0.4rem;
							border: none;
						}
					}
				}
				.zengpin {
					font-size:0.26rem;
					padding: 0.2rem 0;
				}
			}
			.totle {
				text-align: right;
				height: 0.6rem;
				line-height: 0.6rem;
				font-size: 0.28rem;
				background: #fff;
			}
			.look {
				text-align: right;
				font-size: 0.28rem;
				padding: 0.2rem 0;
				border-top: 1px solid #eeeeee;
				a {
					float: right;
					width: 1.46rem;
					height: 0.5rem;
					text-align: center;
					line-height: 0.5rem;
					border: 1px solid #707070;
					border-radius: 20px;
					&.active {
						margin-left: 0.2rem;
						color: #ff2c2c;
						border: 1px solid #ff2c2c;
					}
				}
			}
		}
		.dd_price {
			padding: 0.1rem 0.3rem;
			font-size: 0.26rem;
			background: #fff;
			p {
				height: 0.4rem;
				line-height: 0.4rem;
				margin-bottom: 0.05rem;
			}
		}
		.method {
			padding: 0 0.3rem 0.1rem;
			font-size: 0.26rem;
			background: #fff;
			
			.pay_way {
				padding: 0.1rem 0.5rem 0.1rem 0;
				border-bottom: 1px solid #eeeeee;
				background: url(../../assets/img/cion/right_icon.png) right 0.16rem no-repeat;
				background-size: 0.18rem 0.3rem;
				&.active{
					background: none;
				}
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
				padding: 0.15rem 0 0;
				margin-top: 0.55rem;
				border-top: 1px solid #eeeeee;
				p {
					height: 0.4rem;
					line-height: 0.4rem;
					margin-top: 0.05rem;
				}
			}
		}
		.price {
			padding: 0.2rem 0.3rem 0.1rem;
			background: #fff;
			font-size: 0.3rem;
			p {
				height: 0.4rem;
				line-height: 0.4rem;
				margin-bottom: 0.1rem;
			}
		}
		.pay_bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 0.9rem;
			line-height: 0.9rem;
			z-index: 111;
			background: #fff;
			div {
				width: 50%;
				text-align: right;
				font-size: 0.3rem;
				span {
					margin-right: 0.2rem;
				}
				&.left{
					font-family:PingFangSC-Medium;
				}
			}
			i {
				width: 50%;
				height: 0.9rem;
				line-height: 0.9rem;
				text-align: center;
				color: #fff;
				font-size: 0.36rem;
				background: #ff2c2c;
				border: none;
				font-style:normal;
				&.active{
					background: #ccc;
				}
			}
		}
		.fk_detail {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #fff;
			h2 {
				height: 0.9rem;
				line-height: 0.9rem;
				border-bottom: 1px solid #d7d7d9;
				font-size: 0.36rem;
				text-align: center;
				i {
					width: 0.3rem;
					height: 0.3rem;
					position: absolute;
					left: 0.3rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			ul {
				padding-bottom: 3.8rem;
				li {
					font-size: 0.3rem;
					height: 0.7rem;
					line-height: 0.7rem;
					padding: 0 0.3rem;
					border-bottom: 1px solid #d7d7d9;
				}
			}
			a {
				display: block;
				height: 45px;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 18px;
				background: #ff2c2c;
			}
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
		.mint-popup{
			width: 5rem;
			border-radius: 5px;
			p{
				padding:0.5rem;
				color: #232323;
				font-size: 0.3rem;
				text-align: center;
				border-bottom: 1px solid #ccc;
				line-height: 0.4rem;
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
						background: #fd6e46;
					}
				}
			}
		}
		.mint-popup{
			position: fixed;
		}
		.mint-msgbox,.mint-toast,.mint-indicator-wrapper{
			z-index: 2001;
		}
	}
</style>