<template>
	<div class="wrapper" v-title="'福币'">
		<div class="fb_top">
			<div>
				<router-link to="/cion/cion_trade">交易明细</router-link>
			</div>
			<h3>{{aviCoin/100 | toFloat}}</h3>
			<p>账户余额</p>
		</div>
		<div class="clearfix fb_list">
			<router-link to="/cion/cion_recharge" class="left border-right link_a">
				<img src="../../assets/img/cion/fbc.png" /><span>购买</span>
			</router-link>
			<router-link :to="{path:'/cion/cion_transfer',query:{money:aviCoin/100}}" class="left link_a">
				<img src="../../assets/img/cion/fbz.png" /><span>转账</span>
			</router-link>
		</div>

	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default({
		name: "account",
		data() {
			return {
				aviCoin: '',
				token:this.$tool.getCookie("utoken")
			}
		},
		mounted(){
//			document.cookie="utoken="+'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiIxNDMyNSMxNTY0MyMxMDMyIn0.OQ3MHInUv1HQgbfvRIKnv4DIi8ycHu5Ne7-0h5-uEHA'
			
			window.localStorage.setItem("token",this.token);
			this.token=window.localStorage.getItem("token");
			this.getUser();
		},
		methods: {
			getUser(){
				let _this=this;
				_this.$tool.sendOPtion(this, com.loginhosturl + '/unlogin/passport/findUserInfoByToken', {
					utoken:_this.token,
				}, "get", true, function(res) {
					if(res.success) {
						_this.userId=res.value.userId;
						_this.loginCode=res.value.loginCode;
						window.localStorage.setItem("userId",_this.userId);
						window.localStorage.setItem("loginCode",_this.loginCode);
						
						_this.getAvicion()
					}else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				});
			},
			getAvicion(){
				let _this=this;
				var userId=window.localStorage.getItem("userId")
				var device=navigator.userAgent;
				var channel=encodeURI("爱福客微信端");
				_this.$tool.sendOPtion(this, com.cion_hosturl + "/avicoinapi/aviCoin.share", {
					userId:userId,
	                token:_this.token,
	                channel:channel,
	                device:device
				}, "POST", true, function(res) {
					if(res.success) {
						_this.aviCoin=res.data.aviCoin;
					} else{
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
					}
				})
			}
		}
	})
</script>

<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		.fb_top {
			color: #fff;
			text-align: center;
			padding: 0.2rem 0.3rem 0.6rem;
			background: #ff6161;
			div {
				font-size: 0.24rem;
				height: 0.35rem;
				line-height: 0.35rem;
				text-align: right;
				padding-right: 0.2rem;
				background: url(../../assets/img/cion/jiantou.png) no-repeat right 0.06rem;
				background-size: 0.14rem 0.24rem;
				a {
					color: #fff;
				}
			}
			h3 {
				font-size: 0.7rem;
				letter-spacing: 0;
				height: 1rem;
				line-height: 1rem;
				font-weight: normal;
				font-family: PingFangSC-Medium;
			}
			p {
				font-size: 0.24rem;
				letter-spacing: 0;
				height: 0.35rem;
				line-height: 0.35rem;
			}
		}
		.fb_list {
			padding: 0.35rem 0;
			background: #fff;
			.link_a {
				width: 50%;
				box-sizing: border-box;
				text-align: center;
				font-size: 0.3rem;
				font-family: PingFangSC-Medium;
			}
			img {
				width: 0.7rem;
				height: 0.7rem;
				vertical-align: middle;
				margin-right: 0.3rem;
			}
		}
		.border-right {
			border-right: 1px solid #eeeeee;
		}
	}
</style>