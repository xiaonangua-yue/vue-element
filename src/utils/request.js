import axios from "axios"
import {Message} from "element-ui"
const BASEURL=process.env.NODE_ENV==='development'?'/api':''
const http=axios.create({
  baseURL:BASEURL //http://localhost:8081/api/getSms/ 只要url中/api开头的都是接口请求
})
// 跨域指的是浏览器由于同源策略的限制，不同域名的请求就会出现跨域，但是如果是两个后台发起请求就不存在跨域
// http.defaults.baseURL='http://www.web-jshtml.cn/productapi' //https://www.baidu.com/--->https://www.baidu.com/getSms
// Add a request interceptor添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //手动添加请求头(Request Headers)参数  token userId csrf
    config.headers.token='xxxxx'
    // console.log("请求拦截参数",config.headers);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// Add a response interceptor添加响应拦截器
http.interceptors.response.use(function (response) {
  console.log(response)
    // 对响应数据做些什么 数据进行过滤
    if(response.data.resCode!=0){
      //依赖element-ui弹框提示服务器返回的错误信息
      Message.error(response.data.message);
      return Promise.reject(error);
    }
    return response
  }, function (error) {
    // 对响应错误做些什么
    // console.log("响应拦截")
    return Promise.reject(error);
  });
  export default http