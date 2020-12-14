import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入路由权限限制
import './router/permit.js'

import store from "./store/index.js";
//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// vue3.0依赖Composition API，VUE2.0也可以用Composition API
import VueCompositionApi from '@vue/composition-api'; 
//导入全局图标组件
import './icons/'
Vue.use(VueCompositionApi);
Vue.use(ElementUI)
//系统默认的环境变量，
// console.log(process.env.NODE_ENV);//development run build 
//自定义环境变量
// 如果是线下 npm run serve
//     默认读取自定义文件 .env.development
// 如果是线上 npm run build
//     默认读取自定义文件 .env.production
// if(process.env.NODE_ENV){//开发时
// }else{//线上
// }
//导入css入口文件
// import './styles/main.scss'//在vue.config.js中配置样式不需要再此处引入
  
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
