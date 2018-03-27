<template>
	<div class="wrapper" v-title="'售后'">
		<div class="tabBd">
			<router-link to="/service/service_list_applay" replace>售后申请</router-link>
			<router-link to="/service/service_progress" replace>售后进度</router-link>
		</div>
		<div class="posi_height"></div>
		<div>
			<router-view  keep-alive></router-view>
        </div>
	</div>
</template>
<script>
	import {
		Toast
	} from 'mint-ui';
	export default{
		name:"wrapper",
		data(){
			return{
				token: window.localStorage.getItem("token"),
			}
		},
		mounted() {
			
		},
//		
		methods:{
//			
		}
	}
	
</script>
<style lang="less" scoped>
.wrapper{
	width: 100%;
	height: 100%;
	font-family: PingFangSC-Regular;
	.tabBd{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		height: 0.8rem;
		line-height: 0.8rem;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-around;
		text-align: center;
		padding: 0 4%;
		background: #fff;
		z-index: 111;
		a{
			font-size:0.3rem;
			color:#232323;
			&.router-link-active{
				border-bottom: .04rem solid #78bfff;
			    box-sizing: border-box;
			    color: #78bfff;
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
			background: #fafafa;
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
		.line{
			height: 0.1rem;
			background: #fff;
		}
		.totle{
			padding: 0 0.3rem;
			text-align: right;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size:0.28rem;
			background: #fff;
		}
		
	}
	.price {
		padding: 0.2rem 0.3rem;
		background: #fff;
		font-size: 0.3rem;
		p{
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
		
		p{
			padding: 0.1rem 0;
			letter-spacing:1px;
			label{
				margin-right: 0.2rem;
			}
		}
	}
}
	
	
</style>