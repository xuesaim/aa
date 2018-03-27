<template>
	<div class="wrapper" v-title="'申请售后'">
		<div class="applay">
			<div v-for="(item, index) in applytype" v-if="show_link">
				<a href="javascript:;" @click="applay(item.code,item.name)">{{item.name}}</a>
				<!--<router-link :to="{path:'/service/applay_write',query:{code:item.code,applynum:applynum,name:item.name}}">{{item.name}}</router-link>-->
			</div>
	        <p v-if="show">温馨提示：该商品已经超过七日售后期限，</p>
	        <p class="special" v-if="show">如有疑问请联系爱福客客服：<a href="tel:400-900-2925">400-900-2925</a></p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"wrapper",
		data(){
			return{
				show_link:true,
				show:false,
				orderGoodsInfoid:this.$route.query.orderGoodsInfoid,
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				applytype:'',
				applynum:'',
				address:'',
				goods:''
			}
		},
		mounted() {
			this.getData();
		},
		methods:{
			getData(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/afterSale/checkApply.json", {
					token:_this.token,
					orderGoodsInfoid:_this.orderGoodsInfoid,

				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.applytype=res.data.applytype;
						_this.applynum=res.data.applynum;
						_this.goods=res.data.goods;
						_this.address=res.data.address;
					} else {
						_this.show=true;
						_this.show_link=false;
					}
				})
			},
			applay(code,name){
//				alert(encodeURI(name));
				window.localStorage.setItem("goods",JSON.stringify(this.goods));
				this.$router.push({
	               path: '/service/applay_write',
	               query: {
						code:code,
						name:name,
						applynum:this.applynum,
						content:this.address.address,
						Province:this.address.provincetext,
						Province_code:this.address.province,
						City:this.address.citytext,
						City_code:this.address.city,
						District:this.address.countytext,
						District_code:this.address.county,
						Town:this.address.towntext,
						Town_code:this.address.town,
						userName:this.address.name,
						userTel:this.address.mobile,
						orderGoodsInfoid:this.orderGoodsInfoid
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
	.applay{
		font-size:0.36rem;
		padding:0.4rem 0.3rem;
		div{
			&>a{
				display: block;
				text-align: center;
				background:#ffffff;
				border:1px solid #b0b0b0;
				width:100%;
				height:0.9rem;
				line-height: 0.9rem;
				margin-bottom: 0.2rem;
				color:#232323;
			}
		}
		
		p{
			text-align: center;
			margin-top: 0.7rem;
			font-size: 0.26rem;
			&.special{
				margin-top: 0.2rem;
			}
			a{
				color: #78bfff;
			}
		}
	}
	
}
	
	
</style>