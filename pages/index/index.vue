<template>
	<view class="content">
		<view class="header">
			<view class="header-title">欢迎使用储物柜</view>
				<image src="../../static/fridge.png" class="img-fridge"></image>
		</view>
		<view class="scan-code-box">
			<view @click="scanCode()" class="scan-code"><image src="../../static/scanCode.png" class="img-scan"></image><view class="scan-text">扫一扫</view></view>
		</view>
	</view>
</template>

<script>
	let _self;
	export default {
		data() {
			return {
				isLogin: false
			}
		},
		onLoad() {

		},
		methods: {
			scanCode() {
				let login = this.isLogin;
				if(!login){
					uni.switchTab({
						url:"/pages/me/me"
					})
				}else{
					uni.scanCode({
						success: function (res) {
								console.log('条码类型：' + res.scanType);
								console.log('条码内容：' + res.result);
								if(login){
									uni.navigateTo({
										url:"/pages/order/order?fridgeid="+res.result
									})
								}else{
									uni.navigateTo({
										url:"/pages/order/order?fridgeid="+res.result
									})
								}
						},
						fail: function(){
							console.log("失败");
							uni.showToast({
								icon:"none",
								title:"扫码失败"
							})
						}
					});
				}			 
			}
		},
		created() {
			_self=this;
		},
		onShow() {
			uni.getStorage({
				key: 'isLogin',
				success: function (res) {
					if(res.data != "true"){
						_self.isLogin = false
					}else{
						_self.isLogin = true;
					}
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
		},
		onLoad() {
			uni.getStorage({
				key: 'isLogin',
				success: function (res) {
					if(res.data != "true"){
						_self.isLogin = false;
					}else{
						_self.isLogin = true;
					}
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
		}
	}
</script>

<style>
.scan-code-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 90rpx;
	margin-top: 50rpx;
}
.scan-code {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 80%;
	height: 100%;
	color: white;
	font-size: 43rpx;
	border-radius: 45rpx;
	background-color: #007AFF;
}
.img-scan {
	display: inline-block;
	height: 60rpx;
	width: 60rpx;
	margin-right: 10rpx;
}
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 50rpx;
}
.header-title {
	font-size: 50rpx;
	font-weight: 600;
	line-height: 50rpx;
	margin-bottom: 50rpx;
}
.img-fridge {
	height: 700rpx;
	width: 700rpx;
}
</style>
