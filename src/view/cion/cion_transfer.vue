<template>
	<div class="wrapper" v-title="'转福币'">
		<ul class="">
			<li>
				当前福币余额:{{money | toFloat}}
			</li>
			<li>
				<input type="text" name="" v-model="cion_money" placeholder="请输入转出金额" maxlength="8"/>
			</li>
			<li class="mt20">
				<input type="tel" name="" v-model="transfer_mobile" placeholder="请输入到账人手机号" maxlength="11" />
			</li>
			<li>
				<input type="text" name="" v-model="transfer_name" placeholder="请输入到账人姓名" />
			</li>
		</ul>
		<div class="submit">
			<p class="cion_tip"><img src="../../assets/img/cion/tips.png" /><span class="v-middle">单笔转账金额必须大于1.00元</span></p>
			<button type="submit" class="btn btn-red mt100" @click="submit">提交</button>
			<!--<router-link to="/cion/cion_transfer_check"></router-link>-->
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "transfer",
		data() {
			return {
				cion_money: "",
				transfer_mobile: "",
				transfer_name: "",
				transfer_money: "",
				employeeId: '',
				userId: '',
				id: '',
				money: this.$route.query.money,
			}
		},
		watch: {
			cion_money(){
				if(this.cion_money != '' && this.cion_money.substr(0, 1) == '.') {
					this.cion_money = "";
				}
				this.cion_money = this.cion_money.replace(/[^\d.]/g, "");
				this.cion_money = this.cion_money.replace(/\.{2,}/g, ".");
				this.cion_money = this.cion_money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				this.cion_money = this.cion_money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				if(this.cion_money.indexOf(".") < 0 && this.cion_money != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
					if(this.cion_money.substr(0, 1) == '0' && this.cion_money.length == 2) {
						this.cion_money = this.cion_money.substr(1, this.cion_money.length);
					}
				}

			}
		},
		methods: {
			submit() {
				if(this.cion_money == '') {
					Toast({
						message: "转出金额不能为空",
						position: 'top',
						duration: 1000
					});
					return false;
				}
				if(parseFloat(this.cion_money) < 1) {
					Toast({
						message: "单笔转账金额必须大于1元",
						position: 'top',
						duration: 1000
					});
					return false;
				}

				if(parseFloat(this.cion_money) > parseFloat(this.money)) {
					Toast({
						message: "转出金额大于余额",
						position: 'top',
						duration: 1000
					});
					return false;
				}
				if(this.transfer_mobile == '') {
					Toast({
						message: "手机号不能为空",
						position: 'top',
						duration: 1000
					});
					return false;
				}
				if(!/^1[0-9]{10}$/.test(this.transfer_mobile)) {
					Toast({
						message: "请输入正确的手机号!",
						position: 'top',
						duration: 1000
					});
					return false;
				}
				if(this.transfer_name == '') {
					Toast({
						message: "到账人姓名不能为空",
						position: 'top',
						duration: 1000
					});
					return false;
				}

				let _this = this;

				_this.$tool.sendOPtion(_this, com.hosturl + '/opr/org/employee/findUserByCode', {
					loginCode: _this.transfer_mobile,
					employeeName: _this.transfer_name
				}, "get", true, function(res) {
					if(res.data) {
						_this.id = res.data.id;
						_this.$router.push({
							path: '/cion/cion_transfer_check',
							query: {
								receiverName: _this.transfer_name,
								receiverMobile: _this.transfer_mobile,
								transfer_money: _this.cion_money,
								money: _this.money,
								id: _this.id,
							}
						});
					} else {
						Toast({
							message: res.bizMessage,
							position: 'top',
							duration: 1000
						});
						return false;
					}
				});

			}
		}

	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		li {
			padding: 0.2rem 0.3rem;
			height: 0.42rem;
			line-height: 0.42rem;
			background: #fff;
			border-bottom: 1px solid #e6e6e6;
			font-size: 0.3rem;
			input {
				width: 100%;
				height: 100%;
				border: none;
				font-size: 0.3rem;
			}
		}
		.cion_tip {
			margin: 0.2rem 0;
			font-size: 0.24rem;
			color: #9b9b9b;
			vertical-align: middle;
			img {
				width: 0.28rem;
				height: 0.28rem;
				vertical-align: middle;
				margin-right: 0.1rem;
			}
		}
		.submit {
			padding: 0 0.3rem;
			button {
				border: none;
			}
		}
	}
</style>