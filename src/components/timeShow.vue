<template>
	<div class="timeBd">
		<div class="time-fix">
			<div class="time-title">
				<h3>{{title}}</h3>
				<b @click="time_hide"><img src="../assets/img/cion/close.png"/></b>
			</div>
			<div class="content_xs">
				<ul v-if="reservingDateList !=''">
					<li v-for="(v,k) in reservingDateList" :class="{'active': v.dateStr == dateStr}" @click="time_chose(v.dateStr,v.promiseDate,v.promiseTimeRange,v.promiseTimeRangeCode,v.reservingDate,v.installDate)">{{v.dateStr}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				timeShow:true,
			}
		},
		props:["reservingDateList","dateStr","timeBd","title"],
		mounted() {
			
		},
		methods: {
			time_hide() {
				this.$emit('listenToChildEvent',false,this.dateStr);
			},
			time_chose(time,promiseDate,promiseTimeRange,promiseTimeRangeCode,reservingDate,installDate){
				this.$emit('listenToChildEvent',false,this.timeBd,time,promiseDate,promiseTimeRange,promiseTimeRangeCode,reservingDate,installDate);
			}
		},
	}
</script>
<style lang="less" scoped>
	.timeBd {
		width: 100%;
		font-family:PingFangSC-Regular;
		
		.time-title{
			position: relative;
			height: 0.6rem;
			line-height: 0.6rem;
			text-align: center;
			background: #eee;
			h3{
				font-size: 0.3rem;
			}
			b{
				position: absolute;
				right: 0.1rem;
				top: 0;
				padding: 0 0.2rem;
				img{
					width: 0.3rem;
					height: 0.3rem;
				}
			}
		}
		.head{
			height: 0.8rem;
			line-height: 0.8rem;
			border-bottom: 1px solid #d7d7d9;
			font-size:0.3rem;
			background: #fff;
			a{
				float: left;
				width: 50%;
				text-align: center;
				span{
					display: inline-block;
				}
				&.active{
					span{
						height: 0.78rem;
						line-height: 0.78rem;
						border-bottom: 2px solid #78bfff;;
						color:#78bfff;
					}
					
				}
			}
		}
		.content_xs{
			padding: 0.3rem;
			height: 4.4rem;
			overflow: auto;
			background: #fff;
			p{
				font-size:0.24rem;
				color:#b0b0b0;
			}
			li{
				padding: 0.3rem 0 0;
				font-size:0.28rem;
				height: 0.4rem;
				line-height: 0.4rem;
				&.active{
					color:#78bfff;
				}
			}
		}
	}
</style>