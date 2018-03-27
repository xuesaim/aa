<template>
	<div id="user" v-title="'我的'">
		<div class="banner">
			<div class="userInfo">
				<div class="head">
					<img :src="headimgurl" v-if="headimgurl" />
					<img src="../../assets/img/user/head.png" v-if="!headimgurl_flag" />
				</div>
				<div class="name">
					<p class="userName">{{username}}</p>
					<p class="company">天鼎管佳</p>
				</div>
			</div>
		</div>
		<div class="myOrder_cion">
			<p class="listHead_cion" @click="sendorderurl('0')">
				<span class="listText">我的订单</span>
				<span class="listMore_cion">查看全部订单
	          <img src="../../assets/img/user/more.png"/>
	      </span>
			</p>
			<div class="listBody">
				<div class="waitPay" @click="sendorderurl('1')">
					<label class="li_span">
              <img src="../../assets/img/user/willpay.png" />
              <p>待付款</p>
              <span v-if="order_status_1!=0">{{order_status_1}}</span>
          </label>
				</div>
				<div class="waitSend" @click="sendorderurl('2')">
					<img src="../../assets/img/user/wiisend.png" />
					<p>待发货</p>
					<span v-if="order_status_2!=0">{{order_status_2}}</span>
				</div>
				<div class="waitReceive" @click="sendorderurl('3')">
					<label class="li_span">
              <img src="../../assets/img/user/transport.png" />
              <p>待收货</p>
              <span v-if="order_status_3!=0">{{order_status_3}}</span>
          </label>
				</div>
			</div>
		</div>
		<div class="myCart_cion">
			<router-link :to="{path:'/address/addressmanage',query:{type:1}}">
				<p class="listHead_cion border-bottom">
					<span class="listText">地址管理</span>
					<span class="listMore_cion">
	          <img src="../../assets/img/user/more.png"/>
	      </span>
				</p>
			</router-link>
			<router-link to="/cart">
				<p class="listHead_cion noBorder">
					<span class="listText">我的购物车</span>
					<span class="listMore_cion">
	          <img src="../../assets/img/user/more.png"/>
	      </span>
				</p>
			</router-link>
		</div>
		<div class="phone_cion">
			<p class="listHead_cion noBorder">
				<span class="listText">服务热线</span>
				<a :href="'tel:'+telephone" class="listMore_cion">{{telephone}}</a>
			</p>
		</div>
		<div class="myCart_cion">
			<router-link to="/service/service_list_applay">
				<p class="listHead_cion noBorder">
					<span class="listText">京东售后</span>
					<span class="listMore_cion">
			          <img src="../../assets/img/user/more.png"/>
			      </span>
				</p>
			</router-link>
		</div>
	</div>
</template>

<script>
import {
	Toast
} from 'mint-ui';
export default {
	name: "user",
	data() {
		return {
			telephone: com.telephone,
			username: '',
			usercompany: '',
			isshow: 0,
			headimgurl: '',
			headimgurl_flag: true,
			loaded: true,
			color: "#4285f4",
			token: this.$route.query.token,
			order_status_1: '',
			order_status_2: '',
			order_status_3: ''
		}
	},
	mounted() {
		this.getdata();
		this.getOrdercount();
		window.localStorage.setItem("token", this.token);
		this.token = window.localStorage.getItem("token");
	},
	methods: {
		sendorderurl(type) {
			if(type === '0') {
				this.$router.push({
					path: '/order/totle',
					query: {
						order_status: type
					}
				});
			} else if(type === '1') {
				this.$router.push({
					path: '/order/obligation',
					query: {
						order_status: type
					}
				});
			} else if(type === '2') {
				this.$router.push({
					path: '/order/shipment',
					query: {
						order_status: type
					}
				});
			} else if(type === '3') {
				this.$router.push({
					path: '/order/received',
					query: {
						order_status: type
					}
				});
			}

		},
		getdata() {
			let _this = this;
			_this.$tool.sendOPtion(_this, com.user_hosturl + "/unlogin/passport/findUserInfoByToken", {
				utoken: _this.token,
			}, "POST", true, function(res) {
				if(res.success) {
					if(res.value.nickname != '' && res.value.nickname != null) {
						_this.username = res.value.nickname
					} else {
						_this.username = res.value.empName
					}
					if(res.value.headimgurl != "" && res.value.headimgurl != null) {

						_this.headimgurl = res.value.headimgurl;
						_this.headimgurl_flag = true;
					} else {
						_this.headimgurl_flag = false;
					}
					_this.usercompany = res.value.enterpriseName;
				}
			})
		},
		getOrdercount() {
			let _this = this;
			_this.$tool.sendOPtion(_this, com.order_hosturl + "/order/countOrder.json", {
				token: _this.token,
			}, "get", true, function(res) {
				if(res.data) {
					_this.order_status_1 = res.data.order_status_1;
					_this.order_status_2 = res.data.order_status_2;
					_this.order_status_3 = res.data.order_status_3;
				}
			})
		}

	}

}
</script>
<style lang="less" scoped>
	.banner {
		width: 100%;
		height: 2.5rem;
		background: url("../../assets/img/user/myBanner.jpg") no-repeat center center;
		background-size: 100%;
		position: relative;
		overflow: hidden;
		margin-bottom: 0.2rem;
		.userInfo {
			height: 1.3rem;
			width: 7rem;
			margin: 0.6rem 0 0 0.5rem;
			.head {
				background: rgba(148, 162, 255, 0.5);
				width: 1.4rem;
				height: 1.4rem;
				border-radius: 100%;
				float: left;
				img {
					margin-top: 0.05rem;
					margin-left: 0.05rem;
					width: 1.3rem;
					height: 1.3rem;
					border-radius: 100%;
				}
			}
			.name {
				overflow: hidden;
				margin-left: 0.3rem;
				float: left;
				.userName {
					margin: 0.2rem 0 0 0;
					line-height: 0.4rem;
					color: #fff;
					font-size: 0.36rem;
					text-align: left;
				}
				.company {
					margin: 0.1rem 0 0 0;
					line-height: 0.4rem;
					color: #fff;
					font-size: 0.26rem;
					text-align: left;
				}
			}
		}
		.swapCompany {
			height: 0.3rem;
			border-radius: 0.15rem;
			background-color: #94a2ff;
			opacity: 0.48;
			position: absolute;
			top: 0.2rem;
			right: 0.5rem;
			line-height: 0.3rem;
			text-align: center;
			box-sizing: border-box;
			padding: 0 0.16rem;
			color: #fff;
			font-size: 0.22rem;
		}
	}
	
	.myOrder_cion {
		width: 100%;
		height: 2.4rem;
		background-color: #fff;
		margin-bottom: 0.2rem;
		.listBody {
			box-sizing: border-box;
			padding: 0.4rem 0.5rem;
			// display: flex;
			height: 1.55rem;
			width: 100%;
			>div {
				display: block;
				width: 2rem;
				float: left;
				// flex: 1;
				text-align: center;
				p {
					font-size: 0.24rem;
					color: #232323;
					margin: 0.05rem 0 0 0;
				}
			}
			span {
				position: absolute;
				z-index: 2;
				background: #ff1010;
				width: 0.3rem;
				height: 0.3rem;
				border-radius: 100%;
				line-height: 0.3rem;
				color: #fff;
				font-size: 0.22rem;
				text-align: center;
				margin-top: -1rem;
				margin-left: 0.05rem;
			}
			.waitPay {
				text-align: left;
				label {
					display: inline-block;
					text-align: center;
					img {
						width: 0.4rem;
						height: 0.34rem;
					}
				}
			}
			.waitSend {
				img {
					width: 0.39rem;
					height: 0.34rem;
				}
			}
			.waitReceive {
				text-align: right;
				label {
					display: inline-block;
					text-align: center;
					img {
						width: 0.4rem;
						height: 0.34rem;
					}
				}
			}
		}
	}
	
	.myCart_cion,
	.phone_cion {
		background-color: #fff;
		margin-bottom: 0.2rem;
		.listHead_cion {
			margin: 0 0.5rem;
			padding: 0.2rem 0;
			font-size: 0.3rem;
			.listMore {
				float: right;
				img {
					width: 0.14rem;
					height: 0.24rem;
				}
			}
		}
	}
	
	.phone_cion .listMore_cion {
		font-size: 0.3rem;
		color: #232323
	}
	
	.myOrder_cion .listHead_cion {
		padding: .2rem .3rem;
		font-size: .3rem;
		border-bottom: 1px solid #ddd;
	}
	
	.listHead_cion .listMore_cion {
		text-align: right;
		float: right;
		font-size: .26rem;
		color: #707070;
		line-height: .3rem;
		height: .3rem;
		padding-top: .1rem;
		overflow: hidden;
	}
	
	.listHead_cion .listMore_cion img {
		width: .15rem;
		display: block;
		float: right;
		margin-left: .15rem;
	}
</style>