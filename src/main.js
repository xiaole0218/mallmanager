// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import HttpTool from '@/pulign/http.js'
import App from './App'
import router from './router'
import '@/assets/css/index.css'
Vue.use(ElementUI);
Vue.use(HttpTool);

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
