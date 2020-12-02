import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//导入css入口文件
// import './styles/main.scss'//在vue.config.js中配置样式不需要再此处引入
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
