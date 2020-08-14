import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Echarts from 'echarts'

Vue.use(ElementUI)
Vue.prototype.$echarts=Echarts;
Vue.prototype.$bus=new Vue();
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')