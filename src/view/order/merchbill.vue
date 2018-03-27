<template>
	<div class="wrapper" v-title="'商品清单'">
		<div class="dd_product">
			<div class="order-det">
				<div class="clearfix">
					<h4 class="bac-ff2c2c" v-if="ordertype==2">京东优选</h4>
					<h4 class="bac-78bfff" v-else-if="ordertype!=2">小福甄选</h4>
					<span class="right font26">共{{goodsamount}}件</span>
				</div>
				<div class="clearfix pro" v-for="(item, index) in goodsinfos">
					<img v-if="(ordertype==2 ||ordertype==10)&&item.needChangeImgUrl==true" :src="item.images" />
					<img v-if="(ordertype==2 ||ordertype==10)&&item.needChangeImgUrl==false" :src="'http://img11.360buyimg.com/n1/'+item.images" />
					<img v-if="ordertype!=2 &&ordertype!=10" :src="item.images" />
					<div class="ddpr_name">
						<div class="">
							<span class="font26" style="width: 3.4rem;">{{item.name}}</span>
							<strong class="font24">￥{{item.sellingprice | toFloat}}</strong>
						</div>
						<div class=" color-b0b0b0 font22">
							<span class="">{{item.normsinfo}}</span>
							<strong class="">X{{item.num}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "list",
		data() {
			return {
				ordertype:this.$route.query.ordertype,
				goodsamount:this.$route.query.goodsamount,
				goodsinfos: JSON.parse((window.localStorage.getItem("goodsinfos")))
			}
		},
		mounted() {
//			
		},
		methods: {
//			
		}
	}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Regular;
		.tabBd {
			height: 0.8rem;
			line-height: 0.8rem;
			background: #fff;
			a {
				float: left;
				width: 25%;
				text-align: center;
				font-size: 0.3rem;
				color: #232323;
				&.active {
					border-bottom: .04rem solid #ff2c2c;
					box-sizing: border-box;
					color: #ff2c2c;
				}
			}
		}
		.dd_product {
			background: #fff;
			.order-status {
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.3rem;
				font-size: 0.3rem;
				background: #fff;
			}
			.order-det {
				padding: 0.15rem 0.3rem;
				h4 {
					display: inline-block;
					padding: 2px 4px;
					font-size: 11px;
					font-weight: normal;
					color: #fff;
					margin-bottom: 0.15rem;
				}
				img {
					width: 1.38rem;
					height: 1.38rem;
					border: 1px solid #eeeeee;
				}
				.pro {
					display: flex;
					border-top: 1px solid #eeeeee;
					padding: 0.2rem 0;
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
			}
			.service_btn {
				padding: 0 0.3rem;
				background: #fff;
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
		.price {
			padding: 0.2rem 0.3rem;
			background: #fff;
			font-size: 0.3rem;
			p {
				height: 0.72rem;
				line-height: 0.72rem;
			}
			strong {
				color: #ff2c2c;
			}
		}
		.dd_detail {
			padding: 0.2rem 0.3rem;
			font-size: 0.3rem;
			color: #b0b0b0;
			background: #fff;
			p {
				padding: 0.1rem 0;
				letter-spacing: 1px;
				label {
					margin-right: 0.2rem;
				}
			}
		}
	}
</style>