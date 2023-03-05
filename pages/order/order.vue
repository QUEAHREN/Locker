<template>
	<view>
		<button @click="rentStart">确认订单</button>
		<view>用户编号{{username}}</view>
		<view>冰箱编号{{Fridge_ID}}</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				username: "",
				openid: "",
				Fridge_ID: "",
				Order_Info:{},
			}
		},
		methods: {
			async rentStart() {
				let url = "rent/start?User_ID="+this.openid+"&Fridge_ID="+this.Fridge_ID;
				const res = await this.$myRequest({
						url: url,
						data: {}
				})
				console.log(res);
				if(res.statusCode != 200) {
					uni.showToast({
						icon: "none",
						title: res.data.detail,
					})
				}else{
					uni.navigateTo({
						url:"/pages/orderComplete/orderComplete"
					})
					console.log(res.data);
					this.Order_Info = res.data;
				}
			},
		},
		created() {
			_self = this;
		},
		onLoad(option) {
			_self.Fridge_ID = option.fridgeid;
			uni.getStorage({
				key: 'isLogin',
				success: function (res) {
					if(res.data != "true"){
						
					}
				},
				fail: function(res) {
					uni.navigateTo({
						url:"/pages/me/me"
					})
				}
			})
			// uni.getStorage({
			// 	key: 'openid',
			// 	success: function (res) {
			// 		_self.openid = res.data
			// 	  console.log(res.data);
			// 	},
			// 	fail: function(res) {
			// 		uni.navigateTo({
			// 			url:"/pages/me/me"
			// 		})
			// 	}
			// })
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
			});
		},
	}
</script>

<style>

</style>
