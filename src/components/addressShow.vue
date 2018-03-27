<template>
	<div class="addressBd" @touchmove.prevent>
		<div class="address-fix">
			<div class="time-title">
				<h3>所在地区</h3>
				<b @click="closeAdd"><img src="../assets/img/cion/close.png"/></b>
			</div>
			<div class="address_title">
				<a href="javascript:;" @click="provinceSelected()" :class="Province?'':'active'">{{Province?Province:'请选择'}}</a>
				<a href="javascript:;" @click="citySelected()" :class="City?'':'active'" v-show="Province">{{City?City:'请选择'}}</a>
				<a href="javascript:;" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</a>
				<a href="javascript:;" @click="townSelected()" :class="Town?'':'active'" v-show="Town">{{Town?Town:'请选择'}}</a>
			</div>
			<ul class="city_list">
				<li v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
				<li v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
				<li v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
				<li v-for="(v,k) in showTownList" @click="getTownId(v.id, v.name, k)" v-show="showTown" :class="v.selected ? 'active' : ''">{{v.name}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {
	    Toast
	} from 'mint-ui';
	export default {
		name: "write",
		data() {
			return {
				result: "地址",
				//showChose: false,
				showProvince: true,
				showCity: false,
				showDistrict: false,
				showTown:false,
				showCityList: false,
				showDistrictList: false,
				showTownList:false,
				province: 5,
				city: 3,
				district: 57,
				district:21,
				GetProvinceId: 2,
				District: false,
				Province: false,
				City: false,
				Town:false,
				// v-for循环判断是否为当前
				selected: false,
				info: '',
			}
		},
		props:["message"],
		mounted() {
			this.getAddress()
		},
		methods: {
			choseAdd: function() {
				this.showChose = true;
			},
			closeAdd: function() {
				this.showChose = false;
				this.$emit('showParent',this.showChose);
			},
			_filter(add, name, code) {
				let result = [];
				for(let i = 0; i < add.length; i++) {
					if(code == add[i].id) {
						result = add[i][name];
					}
				}
				return result;
			},
			getAddress(){
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/address/getAreaProvince.json', {
					
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.info=res.data
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
			},
			getProvinceId: function(code, input, index) {
				this.province = code;
				this.Province = input;

				this.showProvince = false;
				this.showCity = true;
				this.showDistrict = false;
				this.showTown = false;
				
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/address/getAreaCity.json', {
					province:_this.province
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.showCityList=res.data
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
				
				// 点击选择当前
				this.info.map(a => a.selected = false);
				this.info[index].selected = true;
			},
			provinceSelected: function() {
				// 清除市级和区级列表
				this.showCityList = false;
				this.showDistrictList = false;
				this.showTownList=false;
				// 清除市级和区级选项
				this.City = false;
				this.District = false;
				this.Town=false;
				// 选项页面的切换
				this.showProvince = true;
				this.showCity = false;
				this.showDistrict = false;
				this.showTown = false;
			},
			getCityId: function(code, input, index) {
				this.city = code;
				this.City = input;

				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = true;
				this.showTown = false;
				
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/address/getAreaCounty.json', {
					city:_this.city
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.showDistrictList=res.data
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
				
				// 选择当前添加active
				this.showCityList.map(a => a.selected = false);
				this.showCityList[index].selected = true;
			},
			citySelected: function() {
				// 清除市级和区级列表
				this.showDistrictList = false;
				this.showTownList=false;
				// 清除市级和区级选项
				this.District = false;
				this.Town=false;
				
				this.showProvince = false;
				this.showCity = true;
				this.showDistrict = false;
				this.showTown = false;
			},
			getDistrictId: function(code, input, index) {
				this.district = code;
				this.District = input;
				
				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = false;
				this.showTown = true;
				
				let _this=this;
				_this.$tool.sendOPtion(this, com.order_hosturl + '/address/getAreaTown.json', {
					county:_this.district
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						if(res.data=='' || res.data==null){
							_this.town = 0;
							_this.Town = '';
							_this.showChose = false;
							_this.$emit('showParent',_this.showChose,_this.Province,_this.province,_this.City,_this.city,_this.District,_this.district,_this.Town,_this.town,_this.message);
						}else{
							_this.showTownList=res.data
						}
						
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
				
				// 选择当前添加active
				this.showDistrictList.map(a => a.selected = false);
				this.showDistrictList[index].selected = true;

			},
			districtSelected: function() {
				// 清除市级和区级列表
				this.showTownList=false;
				// 清除市级和区级选项
				this.Town=false;
				
				
				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = true;
				this.showTown = false;
			},
			
			getTownId: function(code, input, index) {
				this.town = code;
				this.Town = input;

				// 选择当前添加active
				this.showTownList.map(a => a.selected = false);
				this.showTownList[index].selected = true;
				

				this.result = this.Province + this.City + this.District + this.Town;
				// 选取市区选项之后关闭弹层
				this.showChose = false;
				this.$emit('showParent',this.showChose,this.Province,this.province,this.City,this.city,this.District,this.district,this.Town,this.town,this.message);
				
			},
			townSelected: function() {
				
				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = false;
				this.showTown = true;
			}
		}
	}
</script>
<style lang="less" scoped>
	.addressBd {
		width: 100%;
		font-family: PingFangSC-Regular;
		.time-title {
			position: relative;
			height: 0.6rem;
			line-height: 0.6rem;
			text-align: center;
			background: #eee;
			h3 {
				font-size: 0.3rem;
			}
			b {
				position: absolute;
				right: 0.1rem;
				top: 0;
				padding: 0 0.2rem;
				img {
					width: 0.3rem;
					height: 0.3rem;
				}
			}
		}
		.address_title {
			height: 0.8rem;
			line-height: 0.8rem;
			border-bottom: 1px solid #d7d7d9;
			font-size: 0.3rem;
			background: #fff;
			a {
				float: left;
				margin-left: 0.4rem;
				text-align: center;
				span {
					display: inline-block;
				}
				&.active {
					height: 0.78rem;
					line-height: 0.78rem;
					border-bottom: 0.04rem solid #78bfff;
					color: #78bfff;
				}
			}
		}
		.city_list {
			width: 100%;
			height: 4.4rem;
			overflow: auto;
			background: #fff;
			li {
				height: 0.65rem;
				line-height: 0.65rem;
				font-size: 0.3rem;
				padding: 0 0.3rem;
				&:first-child {
					padding-top: 0.1rem;
				}
			}
		}
	}
</style>