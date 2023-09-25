import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts //挂载到Vue实例上面
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
