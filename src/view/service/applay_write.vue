<template>
	<div class="wrapper" v-title="'售后'">
		<div class="dd_product">
			<div class="order-det">
				<div class="clearfix pro">
					<img :src="'http://img11.360buyimg.com/n1/'+goods.images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26">{{goods.name}}</span>
						</div>
						<div class="font22">
							<span class="">¥ {{goods.sellingprice | toFloat}}</span>
							<span class="right">X {{goods.num}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt20 applay_num">
			<h2><span class="color-ff2c2c">*</span>申请数量</h2>
			<div class="num">
				<span @click="minus"><img src="../../assets/img/cion/reduce.png"/></span>
				<span>{{number}}</span>
				<span @click="add"><img src="../../assets/img/cion/add.png"/></span>
				<i>最多可申请{{applynum}}件</i>
			</div>
		</div>
		<div class="mt20 applay_num">
			<h2><span class="color-ff2c2c">*</span>上门取回商品地址</h2>
			<div class="picking">
				<div>
					<p>京东将在1-3天内上门取货</p>
				</div>
			</div>
			<div class="address">
				<div @click="addreshow(1)">{{Province}}{{City}}{{District}}{{Town}}</div>
				<textarea name="" rows="4" cols="" placeholder="请输入详细地址" v-model="content"></textarea>
				<p>
					<label><span class="color-ff2c2c">*</span>联系人:</label>
					<input type="text" name="" id="" value="" v-model="userName"/>
				</p>
				<p>
					<label><span class="color-ff2c2c">*</span>手机号:</label>
					<input type="mobile" name="" id="" value="" v-model="userTel"/>
				</p>
				<p class="color-b0b0b0">
					温馨提示：因质量问题造成的退换货，我们将免费为您上门服务，若非
质量问题造成，还需由您承担返回运费，望理解。
				</p>
			</div>
		</div>
		<div class="mt20 applay_num">
			<h2><span class="color-ff2c2c">*</span>您的收货地址</h2>
			<div class="address mt30">
				<div @click="addreshow(2)">{{Province_ret}}{{City_ret}}{{District_ret}}{{Town_ret}}</div>
				<textarea name="" rows="4" cols="" placeholder="请输入详细地址" v-model="content_ret"></textarea>
				<p class="color-b0b0b0">
					换货／维修完成后将发回该地址
				</p>
			</div>
		</div>
		<div class="mt20 applay_num">
			<h2><span class="color-ff2c2c">*</span>详细描述原因</h2>
			<div class="address mt30">
				<div @click="choiceArea" v-text="Picker?Picker:'请选择'"></div>
				<textarea name="" rows="4" placeholder="  再次描述你遇到的问题，最多125字" maxlength="125" v-model="question_desc"></textarea>
			</div>
		</div>
		<div class="post_img" v-if="imgShow">
			<h2>上传图片</h2>
			<p>请上传照片或检测报告，最多5张。</p>
			<div class="img_totle clearfix">
				<span ref="mybox" v-for="(item, index) in imageurls">
					<img :src="imageurls[index]"/>
					<b @click="remove(index)"></b>
				</span>
				<div  ref="addImg" class="add_img left" @click="getimg()">
					<img src="../../assets/img/cion/add_img.png"/>
				</div>
			</div>
			<p class="color-232323">申请服务单后，售后专员可能与您电话沟通，请保持手机畅通</p>
		</div>
		<div class="post"><a href="javascript:;" @click="submit">提交</a></div>
		<transition name="fade">
			<div class="position_ra" v-show="addressShow" @click="hide" @touchmove.prevent></div>
		</transition>
		<transition name="addressshow">
			<address-show v-show="addressShow" :message="status" class="address-fix" @showParent="showmsgFrom"></address-show>
		</transition>
		<mt-popup v-model="popupVisible" position="bottom"> 
			<div @touchmove.prevent>
				 <div class="picker-toolbar">  
		            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>  
		            <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>  
		          </div>  
		          <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3"></mt-picker>
			</div>
        </mt-popup>  
		<!---->
	</div>
</template>
<script>
	import addressShow from '../../components/addressShow.vue'
	import Vue from 'vue';
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	import { Picker } from 'mint-ui';
	Vue.component(Picker.name, Picker);
	import {
	    Toast
	} from 'mint-ui';
	export default{
		name:"applay_write",
		data(){
			return{
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				applynum:this.$route.query.applynum,
				code:this.$route.query.code,
				name:this.$route.query.name,
				orderGoodsInfoid:this.$route.query.orderGoodsInfoid,
			    number: '1',
			    userTel: this.$route.query.userTel,
			    userName: this.$route.query.userName,
			    addressShow:false,
			    status:'',
			    Province:this.$route.query.Province,
			    Province_code:this.$route.query.Province_code,
			    City:this.$route.query.City,
			    City_code:this.$route.query.City_code,
			    District:this.$route.query.District,
			    District_code:this.$route.query.District_code,
			    Town:this.$route.query.Town,
			    Town_code:this.$route.query.Town_code,
			    Province_ret:this.$route.query.Province,
			    Province_ret_code:this.$route.query.Province_code,
			    City_ret:this.$route.query.City,
			    City_ret_code:this.$route.query.City_code,
			    District_ret:this.$route.query.District,
			    District_ret_code:this.$route.query.District_code,
			    Town_ret:this.$route.query.Town,
			    Town_ret_code:this.$route.query.Town_code,
			    question_desc:'',
			    popupVisible:false,
			    content:this.$route.query.content,
			    content_ret:this.$route.query.content,
			    slots: [
			        {
			          flex:1,
			          values: ['质量问题', '其他'],
			          className: 'slot1',
			          textAlign: 'center'
			        }
			    ],
			    Picker:false,
			    goods: JSON.parse((window.localStorage.getItem("goods"))),
			    imgShow:true,
			    appId:'',//公众号的唯一标识
			    signature:'',//签名
			    nonceStr:'',//生成签名的随机串
			    timestamp:'',//生成签名的时间戳
			    jsapi_ticket:'',
			    localIds:'',
			    imageurls:[],
			    serverId:'',
			    imgList:'',
			    num:''
			}
		},
		components: {
		    addressShow,
		},
		mounted() {
			this.weixinflag();
		},
		methods:{
			showmsgFrom(flag,Province,province,City,city,District,district,Town,town,message){
				this.addressShow=flag;
				if(message==1){
					this.Province=Province;
					this.Province_code=province;
					this.City=City;
					this.City_code=city;
					this.District=District;
					this.District_code=district;
					this.Town=Town;
					this.Town_code=town;
				}else if(message==2){
					this.Province_ret=Province;
					this.Province_ret_code=province;
					this.City_ret=City;
					this.City_ret_code=city;
					this.District_ret=District;
					this.District_ret_code=district;
					this.Town_ret=Town;
					this.Town_ret_code=town;
				}
				
			},
			hide() {
				this.addressShow = false;
			},
			addreshow(status){
				this.status=status;
				this.addressShow = true;
			},
			minus () {
		      if (this.number <= 1) {
		        return
		      }
		      this.number --
		    },
		    add () {
		      if (this.number >= this.applynum) {
		        return
		      }
		      this.number ++
		    },
		    choiceArea(event) { 
		      event.preventDefault();
	          this.popupVisible = true  
	          
	        },  
	        cancleaddress() {  
	          this.popupVisible = false  
	        }, 
	        selectaddress() {  
	          this.popupVisible = false  
	          
	        },  
	        onValuesChange(picker,values){
	        	this.Picker = values[0];
	        },
	        getWeixinid(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/weixin/getticket.json", {
					url:location.href.split('#')[0]
				}, "get", true, function(res) {
					if(res.data) {
						wx.config({
						    debug: false,
						    appId: res.data.appId,
						    timestamp:res.data.timestamp,
						    nonceStr: res.data.nonceStr,
						    signature:res.data.signature,
						    jsApiList: [
						      'chooseImage',
						      'uploadImage',
						    ]
						});
					} else {
						Toast({
				            message:res.msg,
				            position: 'top',
				            duration: 1000
				        });
					}
				})
				
			},
	        weixinflag() {
	        	var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
					this.imgShow=true;
					this.getWeixinid()
				}else{
					this.imgShow=false;
				}
			},
			imglist(){
				let _this = this;
			  	_this.$tool.sendOPtion(this, com.order_hosturl + "/weixin/getimg.json", {
					mediaid:_this.serverId
				}, "get", true, function(res) {
					if(res.data) {
						_this.imageurls.push(res.data);
						_this.syncUpload();
					} else {
						Toast({
				            message:res.msg,
				            position: 'top',
				            duration: 1000
				        });
					}
				})
			},
			getimg(){
				let _this=this;
				_this.num=_this.imageurls.length;
			  	if(_this.num==5){
			  		Toast({
			            message:"最多只能选5张",
			            position: 'top',
			            duration: 1000
			        });
				  	return false;
				}
				wx.ready(function () {
					wx.chooseImage({			
						count: 5-_this.num, // 默认9			
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有			
//						sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有			
						success: function (res) {
							_this.localIds = res.localIds;
							_this.syncUpload();
						}		
					});
				})
				wx.error(function (res) {
					Toast({
			            message:res.errMsg,
			            position: 'top',
			            duration: 1000
			        });
				});
			},
			syncUpload(){
				let _this=this;
				wx.uploadImage({
				    localId:_this.localIds.shift(), // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    success: function (res) {
					    _this.num++;
				        _this.serverId = res.serverId;
				        
				        if(_this.serverId !="" && _this.serverId!=null && _this.serverId !="undefined"){
				        	_this.imglist();
				        }
				    }
				
				});
			},
			remove(index){
			    for(var i = 0; i < this.imageurls.length; i++)
			    {
			        if(i == index)
			        {
			            this.imageurls.splice(index,1);
			        }
			    }
			},
		    submit(){
		    	if (this.userName == '') {
		          Toast({
		            message: "联系人不能为空",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		    	if (this.userTel == '') {
		          Toast({
		            message: "手机号不能为空",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        if (!/^1[0-9]{10}$/.test(this.userTel)) {
		          Toast({
		            message: "请输入正确的手机号!",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        if (this.Province_code == '') {
		          Toast({
		            message: "请选择地址",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        if (this.content == '') {
		          Toast({
		            message: "取件地址不能为空",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        if (this.content_ret == '') {
		          Toast({
		            message: "收货地址不能为空",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        if (this.Province_code_ret == '') {
		          Toast({
		            message: "请选择收货地址",
		            position: 'top',
		            duration: 1000
		          });
		          return false;
		        }
		        let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/afterSale/apply.json', {
					customer_expect:_this.code,
					customer_expect_name:_this.name,
					question_desc:_this.Picker+_this.question_desc,
					need_detectionreport:'1',
					question_pic:_this.imageurls.join(","),
					haspackage:'1',
					skunum:_this.number,
					package_desc:'0',
					customer_contact_name:_this.userName,
					customer_tel:_this.userTel,
					customer_mobilephone:_this.userTel,
					customer_email:'',
					customer_postcode:'',
					pickwaretype:'4',
					pickware_province:_this.Province_code,
					pickware_province_text:_this.Province,
					pickware_city:_this.City_code,
					pickware_city_text:_this.City,
					pickware_county:_this.District_code,
					pickware_county_text:_this.District,
					pickware_village:_this.Town_code,
					pickware_village_text:_this.Town,
					pickware_address:_this.content,
					returnware_type:'10',
					returnware_province:_this.Province_ret_code,
					returnware_province_text:_this.Province_ret,
					returnware_city:_this.City_ret_code,
					returnware_city_text:_this.City_ret,
					returnware_county:_this.District_ret_code,
					returnware_county_text:_this.District_ret,
					returnware_village:_this.Town_ret_code,
					returnware_village_text:_this.Town_ret,
					returnware_address:_this.content_ret,
					token:_this.token,
					ordergoodsinfoid:_this.orderGoodsInfoid
					
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.$router.push({
			               path: '/service/service_progress',
			            });
						
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
		        
		    }
		}
	}
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	.tabBd{
		height: 0.8rem;
		line-height: 0.8rem;
		background: #fff;
		a{
			float: left;
			width: 50%;
			text-align: center;
			font-size:0.3rem;
			color:#232323;
			span{
				display: inline-block;
				&.active{
					border-bottom: .04rem solid #78bfff;
				    box-sizing: border-box;
				    color: #78bfff;
				}
			}
		}
		
	}
	.dd_product {
		padding-bottom: 0.1rem;
		background: #fff;
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
					
					div{
						display: flex;
						display: -webkit-flex;
						flex-basis: 100%;
						justify-content: space-between;
						
						button{
							width:1.5rem;
							height:0.54rem;
							color: #fff;
							font-size:0.28rem;
							border: none;
							background:#78bfff;
						}
					}
				}
				
			}
		}
		
	}
	.applay_num{
		padding: 0 0.3rem;
		background: #fff;
		h2{
			font-size: 0.3rem;
			height: 0.6rem;
			line-height: 0.6rem;
			border-bottom:1px solid #eeeeee;
		}
		.num{
			padding: 0.3rem 0;
			span{
				display: inline-block;
				vertical-align: middle;
				margin-right: 0.3rem;
				img{
					width: 0.54rem;
					height: 0.54rem;
				}
			}
			i{
				font-size:0.26rem;
				color:#b0b0b0;
				font-style: normal;
			}
		}
		.picking{
			display: flex;
			padding: 0.3rem 0;
			label{
				border:2px solid #b0b0b0;
				width:0.28rem;
				height:0.28rem;
				border-radius:100%;
				
				&.active{
					border:2px solid #FF2C2C;
					background: #FF2C2C;
				}
			}
			div{
				flex: 1;
				margin-left: 0.2rem;
				
				h3{
					font-size:0.3rem;
					margin-bottom: 0.1rem;
				}
				p{
					font-size:0.22rem;
					color:#b0b0b0;
				}
			}
			
		}
		.address{
			padding-bottom: 0.3rem;
			div{
				font-size: 0.3rem;
				width: 96%;
				border:1px solid #b0b0b0;
				height:0.7rem;
				line-height: 0.7rem;
				padding: 0 2%;
				background: url(../../assets/img/cion/xiala.png) 98% 0.2rem no-repeat;
				background-size: 0.3rem 0.18rem;
			}
			textarea{
				font-size: 0.3rem;
				font-family: PingFangSC-Regular;
				padding: 0.2rem 0;
				text-indent: 0.2rem;
				resize: none;
				width: 100%;
				margin-top: 0.2rem;
				border-radius: 0;
				border:1px solid #b0b0b0;
				box-shadow:0px 0px 0px rgba(0,0,0,0);
     			-webkit-appearance:none;
			}	
			p{
				font-size: 0.3rem;
				margin-top: 0.3rem;
				display: flex;
				label{
					padding: 0.2rem 0;
				}
				input{
					font-size: 0.3rem;
					font-family: PingFangSC-Regular;
					flex: 1;
					margin-left: 0.2rem;
					padding: 0.2rem 0;
					text-indent: 0.2rem;
					border-radius: 0;
					border:1px solid #b0b0b0;
					box-shadow:0px 0px 0px rgba(0,0,0,0);
     				-webkit-appearance:none;
				}
			}
		}
	}
	.post_img{
		padding: 0.3rem;
		h2{
			font-size:0.3rem;
		}
		p{
			font-size:0.3rem;
			color:#b0b0b0;
			margin: 0.1rem 0 0.2rem;
		}
		.img_totle span{
			position: relative;
			float: left;
			width: 1.65rem;
			height: 1.65rem;
			margin-right: 0.1rem;
			margin-bottom: 0.1rem;
			&>img{
				width: 1.65rem;
				height: 1.65rem;
			}
			b{
				position: absolute;
				right: 0;
				top: 0;
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../assets/img/cion/delate.png) no-repeat;
				background-size: 0.4rem 0.4rem;
			}
		}
		.add_img{
			width: 1.65rem;
			height: 1.65rem;
			background: #fff;
			text-align: center;
			margin-right: 0.1rem;
    		margin-bottom: 0.1rem;
			img{
				width: 0.7rem;
				height: 0.7rem;
				margin-top: 0.475rem;
			}
		}
	}
	.post{
		padding: 0 0.3rem;
		a{
			display: block;
			width: 100%;
			background:#78bfff;
			height:0.9rem;
			line-height: 0.9rem;
			color: #fff;
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.2rem;
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
	.addressshow-enter-active, .addressshow-leave-active{
        transition: 0.4s all ease;
    }
    .addressshow-enter-active{
    	transform: translate3d(0,0,0);
       
    }
    .addressshow-leave-active{
        transform: translate3d(0,100%,0);
    }
    .addressshow-enter,.addressshow-leave{
        transform: translate3d(0,100%,0);
    }
	.address-fix{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 222;
	}
	.mint-popup-bottom{
		left: 0;
		width: 100%;
		transform: none;
	}
	.mint-popup{
		transform: none;
	}
	.mint-popup{
		position: fixed;
	}
}
	
	
</style>