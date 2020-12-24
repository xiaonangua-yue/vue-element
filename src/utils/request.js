import axios from "axios"
import {Message} from "element-ui"
import {getToken,getUsername} from "./cookie"
// const BASEUSRL=process.env.NODE_ENV==='development'?'/api':'' //api
let BASEUSRL=null
// const mock=true//使用本地的mock数据
const mock=false//走后台代理
if(mock){
  //使用本地的mock数据
  BASEUSRL=process.env.NODE_ENV==='development'?'':''
}else{
  //走后台代理
  BASEUSRL=process.env.NODE_ENV==='development'?'/api':''
}

const http=axios.create({
  baseURL:BASEUSRL //http://localhost:8081/api/getSms/ 只要url中/api开头的都是接口请求
})
// 跨域指的是浏览器由于同源策略的限制，不同域名的请求就会出现跨域，但是如果是两个后台发起请求就不存在跨域
// http.defaults.baseURL='http://www.web-jshtml.cn/productapi' //https://www.baidu.com/--->https://www.baidu.com/getSms
const tokenWhite=['/getSms/','/login/','/register/']//在此白名单里面的接口，都不需要token就可以
//添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //手动添加请求头(Request Headers)参数  token userId csrf
    if(tokenWhite.indexOf(config.url)!==-1){//访问的是白名单里不需要token接口的登录页
      return config;
    }else{
      if(getToken()&&getUsername()){//如果不在白名单里，访问的就是需要token的接口
        config.headers['Tokey']=getToken()//token的值
        config.headers.UserName=getUsername()
        return config;
      }else{
        const message="本地token或者用户名失效，请重新登录"
        Message.error(message);
        return Promise.reject({error:message});
      }
    }
    // console.log("请求拦截参数",config.headers);
    
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

//添加响应拦截器
http.interceptors.response.use(function (response) {
  // console.log(response)
    // 对响应数据做些什么 数据进行过滤
    if(response.data.resCode!=0){
      //依赖element-ui弹框提示服务器返回的错误信息
      Message.error(response.data.message);
      return Promise.reject({error:response.data.message});
    }
    return response
  }, function (error) {
    // 对响应错误做些什么
    // console.log("响应拦截")
    return Promise.reject(error);
  });
  export default http