<template>
	<view>
		<!-- <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">唤起授权</button> -->
		<button @click="login">授权登录</button>
		<view>{{code}}</view>
		<view>{{log}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:0,
				log: "无",
			}
		},
		methods: {
			login(){
				let base_url = "http://1.15.231.43:7474/"
			  this.log = "调用接口";
				 // wx.login({  
				 //        success: (res) => {  
				 //            if (res.code) {  
					// 						this.code = res.code;
					// 						console.log(res.code);//微信登录成功 已拿到code  
				 //                // ...doSomething  
				 //            } else {  
				 //              console.log('登录失败！' + res.errMsg);
				 //            }  
				 //        }  
				 //    })  
				 wx.login({  
				         success: (res) => {  
				             if (res.code) {         //微信登录成功 已拿到code  
				                 this.jsCode=res.code;        //保存获取到的code  
				                 uni.request({  
				                     url: base_url+'get_session?JSCODE='+res.code,  
				                     method:'GET', 
				                     success: (cts) => {  
				                         // 换取成功后 暂存这些数据 留作后续操作  
																 console.log(cts);
																 this.openid=cts.data.openid     //openid 用户唯一标识  
																 console.log(this.openid);
																 this.unionid=cts.data.unionid     //unionid 开放平台唯一标识  
																 this.session_key=cts.data.session_key     //session_key  会话密钥 
																 uni.request({
																				url: base_url+'users',
																				method: "POST",
																				data: {
																					'User_Name': this.openid,
																					'User_Password': ""
																				},
																				header: {
																								'content-type':'application/json' //自定义请求头信息
																						},
																 });
																 uni.setStorage({
																     key: 'openid',
																     data: this.openid,
																     success: function () {
																        console.log('success');
																     }
																 });
				                     }  
				                 });  
				             } else {  
				                 console.log('登录失败！' + res.errMsg)  
				             }  
				         }  
				     })  
			}
		}
	}
</script>

<style>

</style>
