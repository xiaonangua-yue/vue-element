import axios from "@/utils/request.js"
//请求和响应 拦截

//获取验证码
export const get_code=(data)=>{
    // return axios.request({
    //     url:'/mock/code.json',//使用本地的mock数据
    //     method:'get',
    //     data:{
    //         "username":"123@qq.com"
    //     }
    // })
    //http://www.axios-js.com/docsv/#axios-API
    //不写return是undefined
    return axios.request({
        // method: 'get',//Request URL:http://localhost:8081/user/12345?firstName=Fred&lastName=Flintstone
        // url: '/user/12345',
        // params: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
        //post
        method: 'post',//Request URL: http://localhost:8081/user/12345
        url: '/getSms/',//走后台代理
        data: data
    })
}
//登录//访问接口
export const do_login=(data)=>{
    return axios.request({
        method: 'post',
        url: '/login/',
        data: data
    })
}
//注册//访问接口
export const do_register=(data)=>{
    return axios.request({
        method: 'post',
        url: '/register/',
        data: data
    })
}
