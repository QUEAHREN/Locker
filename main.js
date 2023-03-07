import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//引入api
import { myRequest } from './utils/api.js'
Vue.prototype.$myRequest = myRequest

// uni异步化
import uniAsync from './utils/uni-async.js'
// 设置到prototype
Vue.prototype.$uniAsync = uniAsync

const app = new Vue({
    ...App
})
app.$mount()
