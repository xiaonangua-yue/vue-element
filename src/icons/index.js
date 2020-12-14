import Vue from "vue";
import SvgIcon from './components/SvgIcon.vue';
//声明全局组件
Vue.component('svg-icon',SvgIcon)

//1:读取解析svg文件 
// 参数说明：第一个：目录 ./svg/xxx.svg
//          第二个：是否遍历子级目录
//          第三个：定义遍历文件规则
// 读取svg文件，转化为webpack能访问的资源文件格式（对象）
const req = require.context('./svg', false, /\.svg$/)//交给webpack去处理
// console.log(req.keys())//读取到目录里有哪些svg图片
req.keys().map(req)//解析svg
//2:在vue.config.js中配置webpack
//3:下载loader依赖  yarn add svg-sprite-loader -S
//4:SvgIcon.vue使用svg图标