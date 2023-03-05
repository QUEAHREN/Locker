<template>
	<view class="box">
		<view v-if="!isLogin" class="login">
			<button @click="login" class="btn-login">授权登录</button>
		</view>
		<view v-else>
		<view class="header">
				<image :src="avatarUrl" mode="" class="avator"></image>
			<view class="user">
				<view class="info"><image src="../../static/person.png" mode="" style="{display: inline;}" class="info-icon">{{username}}</view>
				<view class="info"><image src="../../static/balance.png" mode="" style="{display: inline;}"class="info-icon"></image>余额:{{balance}}</view>
			</view>
		</view>
		<view class="btns">
			<view class="btn">充值</view>
			<view class="btn">我的订单</view>
		</view>
		</view>
	</view>
</template>

<script>
	let _self;
	export default {
		data() {
			return {
				username:"用户的微信名",
				avatarUrl: "../../static/logo.png",
				balance: 0,
				isLogin: false,
				openid: ""
			}
		},
		methods: {
			setStor(key, data){
				uni.setStorage({
					key: key,
					data: data,
					success: function () {
						console.log('success');
					}
				});
			},
			login(){
		    // 获取用户信息
				// let base_url = "http://1.15.231.43:8080/"
				const base_url = "https://layznana.xyz/"
				uni.getUserProfile({
					desc: "注册",
					success: function (infoRes) {
						console.log(2, infoRes);
						_self.username = infoRes.userInfo.nickName;
						_self.avatarUrl = infoRes.userInfo.avatarUrl;
						_self.isLogin = true;
					    _self.setStor("isLogin", "true");
						_self.setStor("username", _self.username);
						_self.setStor("avatarUrl", _self.avatarUrl);
						uni.request({
								url: base_url+'users',
								method: "POST",
								data: {
									'User_Name': _self.username,
									'User_Password': ""
								},
								header: {
												'content-type':'application/json' //自定义请求头信息
										},
										});
							 
						  
					},
					fail: function(){
						console.log("fail");
					}
				});
			}
		},
		created() {
			_self = this;
		},
		onLoad() {
			uni.getStorage({
				key: 'isLogin',
				success: function (res) {
					if(res == "true"){
						_self.isLogin = true;
					}else{
						_self.isLogin = false;
					}
				},
				fail: () => {
					_self.isLogin = false;
				}
			})
		}
	}
</script>

<style>
.header{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 2rpx solid #DFDFDF;
	height: 300rpx;
}
.login{
	height: 200rpx;
	width: 100%;
	position: absolute;
	top: 50%;
	margin-top: -100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.avator {
	height: 180rpx;
	width: 180rpx;
	border-radius: 100rpx;
	margin: 50rpx;
}
.info {
	height: 75rpx;
	display: flex;
	flex-direction: row;
	align-items:center;
	justify-content: flex-start;
	margin-top: 20rpx;
}
.info-icon {
	height: 70rpx;
	width: 70rpx;
	margin-right: 20rpx;
}
.btns {
	display: flex;
	flex-direction: column;
}
.btn {
	height: 100rpx;
	width: 100%;
	text-align: center;
	line-height: 100rpx;
	border-bottom: 2rpx solid #DFDFDF;
}
</style>
