<template>
	<view class="card" v-if="has">
		<view class="content-up">
			<image :src="image.url" alt="" class="image"></image>
			<view class="three">
				<view class="content-center">
					<view class="info">
						储物柜编号:{{fridgeId}}
					</view>
					<view class="info">
						柜门编号:{{boxId}}
					</view>
					<!-- <view class="info">
						应还时间:{{getDateString(rentdate)}}
					</view> -->
				</view>
				<view class="content-up-right">
					<view class="content-up-right-btn" @click="rentOpen">
						中途开箱
					</view>
					<view class="content-up-right-btn1" @click="rentStop">
						结束服务
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _self;
	const BASE_URL = "https://layznana.xyz/"
	// const BASE_URL = "http://1.15.231.43:8080/"
	export default {
		name:"fridge-card",
		props: {
			fridgeId: {
				type: String
			},
			boxId: {
				type: String
			},
			// rentdate: {
			// 	type: Date,
			// },
			index: {
				default:0
			},
			image: {
				type: Object,
				default: function() {
						return {
							url: "../../static/fridge-card-logo.png", //图片地址
						}
					}
			},
		},
		computed:{	
		},
		data() {
			return {
				has:true,
				openid: "",
				username: "",
			};
		},
		methods:{
			// getDateString(date) {
			// 	let month = date.getMonth()+1;
			// 	let day = date.getDate();
			// 	return month + "月" + day + "日"; 
			// }
			rentOpen() {
				uni.request({
					url:BASE_URL+"rent/open?User_ID="+_self.username,
					success(res) {
						if(res.statusCode != 200){
							uni.showToast({
								icon: "none",
								title: res.data.detail,
							})
						}else{
							uni.showToast({
								title: "开箱成功",
							})
						}
					}
				})
			},
			rentStop() {
				uni.request({
					url:BASE_URL+"rent/stop?User_ID="+_self.username,
					success(res) {
						if(res.statusCode != 200){
							uni.showToast({
								icon: "none",
								title: res.data.detail,
							})
						}else{
							uni.showToast({
								title: "结束订单成功",
							})
							_self.has = false;
						}
					},
					fail(res) {
						
					}
				})
			}
		},
		created() {
			_self = this;
			uni.getStorage({
				key: 'username',
				success: function (res) {
					_self.username = res.data
				  console.log(res.data);
				},
				fail: function(res) {
					uni.navigateTo({
						url:"/pages/me/me"
					})
				}
			})
		}
	}
</script>

<style>
.card {
	display: flex;
	align-items: center;
	margin: 0;
	height: 250rpx;
	width: 742rpx;
	border: 5rpx solid rgb(82, 175, 253);
	border-radius: 30rpx;
}
.info{
	margin-top: 20rpx;
}
.image {
	width: 200rpx;
	height: 200rpx;
}
.content-up {
	display: flex;
	flex-direction: row;
	height: 200rpx;
}
.three {
	display: flex;
	width: 550rpx;
}
.content-center{
	display: flex;
	flex-direction: column;
	line-height: 50rpx;
	justify-content: center;
	width: 400rpx;
}
.content-up-right {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}
.content-up-right-btn,
.content-up-right-btn1 {
	background-color: #007AFF;
	text-align: center;
	line-height: 80rpx;
	height: 80rpx;
	width: 180rpx;
	color: white;
	border-radius: 45rpx;
}
.content-up-right-btn1 {
	margin-top: 20rpx;
}
</style>
