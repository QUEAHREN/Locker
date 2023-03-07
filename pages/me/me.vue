<template>
	<view class="box">
		<view v-if="!isLogin" class="login">
			<button @click="openAuthorizationModal" class="btn-login">授权登录</button>
			<wx-user-info-modal v-model="showAuthorizationModal" @updated="updatedUserInfoEvent"></wx-user-info-modal>

			<!-- <daxiang-getUserProfile ref="getUserProfile" logo="..."></daxiang-getUserProfile> -->
			<!-- <input type="nickname" class="inputbox weui-input ftszie24 ftfamily" v-model="nickname" @blur="getnickname" placeholder="获取昵称"/> -->
		</view>
		<view v-else>
			<view class="header">
				<image :src="avatarUrl" mode="" class="avator"></image>
				<view class="user">
					<view class="info">
						<image src="../../static/person.png" mode="" style="{display: inline;}" class="info-icon">
							{{username}}
					</view>
					<view class="info">
						<image src="../../static/balance.png" mode="" style="{display: inline;}" class="info-icon">
						</image>余额:{{balance}}
					</view>
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
	import WxUserInfoModal from '@/uni_modules/tuniaoui-wx-user-info/components/tuniaoui-wx-user-info/tuniaoui-wx-user-info.vue'

	export default {
		components: {
			WxUserInfoModal
		},

		data() {
			return {
				username: "用户的微信名",
				avatarUrl: "../../static/logo.png",
				balance: 0,
				isLogin: false,
				openid: "",
				nickname: "",
				showAuthorizationModal: false
			}
		},
		methods: {
			// 打开获取用户信息弹框
			openAuthorizationModal() {
				this.showAuthorizationModal = true
			},

			// 获取到的用户信息
			updatedUserInfoEvent(info) {
				const base_url = "https://layznana.xyz/"
				
				let userInfo = JSON.parse(JSON.stringify(info))
				console.log('获取到的用户信息', userInfo)
				_self.username = userInfo.nickname;
				_self.avatarUrl = userInfo.avatar;
				_self.isLogin = true;
				this.showAuthorizationModal = false
				_self.setStor("isLogin", "true");
				_self.setStor("username", _self.username);
				_self.setStor("avatarUrl", _self.avatarUrl);
				uni.request({
					url: base_url + 'users',
					method: "POST",
					data: {
						'User_Name': _self.username,
						'User_Password': ""
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
				});
			},
			setStor(key, data) {
				uni.setStorage({
					key: key,
					data: data,
					success: function() {
						console.log('success');
					}
				});
			},
			
		},
		created() {
			_self = this;
		},
		onShow() {
			uni.getStorage({
				key: 'avatarUrl',
				success: function(res) {
					_self.avatarUrl = res.data
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
			uni.getStorage({
				key: 'username',
				success: function(res) {
					_self.username = res.data
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
			uni.getStorage({
				key: 'isLogin',
				success: function(res) {
					console.log(res)
					if (res.data == "true") {
						_self.isLogin = true;
					} else {
						_self.isLogin = false;
					}
				},
				fail: () => {
					_self.isLogin = false;
				}
			})
			
		},
		onLoad() {
			uni.getStorage({
				key: 'avatarUrl',
				success: function(res) {
					_self.avatarUrl = res.data
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
			uni.getStorage({
				key: 'username',
				success: function(res) {
					_self.username = res.data
				},
				fail: function(res) {
					_self.isLogin = false;
				}
			})
			uni.getStorage({
				key: 'isLogin',
				success: function(res) {
					if (res.data == "true") {
						_self.isLogin = true;
					} else {
						_self.isLogin = false;
					}
				},
				fail: () => {
					_self.isLogin = false;
				}
			})
			console.log(_self.isLogin)
		}
	}
</script>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 2rpx solid #DFDFDF;
		height: 300rpx;
	}

	.login {
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
		align-items: center;
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
