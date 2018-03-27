<template>
	<div class="wrapper" v-title="'服务单详情'">
		<div class="list">
			<p>
				<strong>售后状态：</strong>
				<span class="color-78bfff">{{afsservicestepname}}</span>
			</p>
			<p>
				<strong>服务单号：</strong>
				<span>{{serviceid}}</span>
			</p>
			<p>
				<strong>售后类型：</strong>
				<span class="color-78bfff">{{customer_expect_name}}</span>
			</p>
		</div>
		<div class="mt20 list">
			<p>
				<strong>商品名称：</strong>
				<span>{{skuname}}</span>
			</p>
			<p class="border-bottom">
				<strong>申请时间：</strong>
				<span>{{applytimestr}}</span>
			</p>
			<p>
				<strong>详细描述原因：</strong>
			</p>
			<p>
				{{question_desc}}
			</p>
			<p v-if="picArr !=''">
				<i v-for="(item, index) in picArr">
					<img :src="picArr[index]"/>
				</i>
			</p>
		</div>
		<div class="service mt20">
			<h3>进度跟踪</h3>
			<ul>
				<li v-for="(item, index) in serviceTrackInfo">
					<div>
						<p>{{item.context}}</p>
						<p class="color-b0b0b0 border-bottom">{{item.createDate}}</p>
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
	export default{
		name:"detail",
		data(){
			return{
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI5NDQjMTI1NCM0NSJ9.KjUQ-zYsixZhxnpmT0mZHVyz9MPevBRVn8xvoVO9-rM',
				token: window.localStorage.getItem("token"),
				id:this.$route.query.id,
				afsservicestepname:'',
				customer_expect_name:'',
				serviceid:'',
				skuname:'',
				question_desc:'',
				picArr:'',
				serviceTrackInfo:'',
				applytimestr:''
			}
		},
		mounted() {
			this.getDetail();
		},
		methods:{
			getDetail(){
				let _this = this;
				_this.$tool.sendOPtion(this, com.order_hosturl + "/afterSale/detail.json", {
					token:_this.token,
					id:_this.id
				}, "get", true, function(res) {
					if(res.bizCode=='000000') {
						_this.afsservicestepname=res.data.aftersale.afsservicestepname;
						_this.customer_expect_name=res.data.aftersale.customer_expect_name;
						_this.serviceid=res.data.aftersale.serviceid;
						_this.skuname=res.data.aftersale.skuname;
						_this.question_desc=res.data.aftersale.question_desc;
						_this.picArr=res.data.aftersale.picArr;
						_this.applytimestr=res.data.aftersale.applytimestr;
						_this.serviceTrackInfo=res.data.serviceTrackInfo;
						
					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		.list {
			font-size: 0.3rem;
			padding: 0.2rem 0.3rem;
			background: #fff;
			p {
				padding: 0.1rem 0;
				display: flex;
				.strong {
					font-family: PingFangSC-Medium;
				}
				span:nth-child(2) {
					flex: 1;
				}
				i {
					display: inline-block;
					width: 1.65rem;
					height: 1.65rem;
					margin-bottom: 0.2rem;
					margin-right: 0.1rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.service {
			position: relative;
			margin-top: 0.2rem;
			padding: 0 0.3rem;
			background: #fff;
			h3 {
				font-size: 0.3rem;
				height: 0.6rem;
				line-height: 0.6rem;
			}
			ul {
				position: relative;
				padding: 0.3rem 0.2rem;
				li {
					position: relative;
					background: url(../../assets/img/cion/border.png) no-repeat;
					padding: 0 0.2rem 0.2rem;
					div {
						display: flex;
						font-size: 0.26rem;
						flex-direction: column;
						justify-content: space-between;
						p {
							padding-bottom: 0.2rem;
							line-height: 0.4rem;
						}
					}
					&:first-child:after {
						content: '';
						position: absolute;
						top: 0rem;
						left: -0.1rem;
						width: 0.14rem;
						height: 0.14rem;
						border-radius: 100%;
						background: #78bfff;
						border: 2px solid #c9e5ff;
					}
					&:after {
						content: '';
						position: absolute;
						top: 0.1rem;
						left: -0.08rem;
						width: 7px;
						height: 7px;
						border-radius: 100%;
						background: #707070;
					}
				}
			}
		}
	}
</style>