//测试用api
const BASE_URL = "https://layznana.xyz/"

// const BASE_URL = "http://1.15.231.43:8080/"
// 实际使用api
//const BASE_URL = ""
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			header: options.header || {},
			method: options.method || 'GET',
			data: options.data || {},
			success:res => {
				// if (res.statusCode !== 200) {
				// 	return uni.showToast({
				// 		title: '调用失败',
				// 		icon: "none"
				// 	})
				// }
				resolve(res)
			},
			fail:err => {
				uni.showToast({
					icon: "none",
					title: '调用接口失败'
				})
				resolve(res);
			}
		})
	})
}