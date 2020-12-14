import {do_login} from '../../api/login.js'
import {setUsername,setToken,getUsername,getToken,removeUsername,removeToken} from '../../utils/cookie'
const state={//原始数据
    // isCollapse:false //展开
    //JSON.parse将字符串转化为原有的类型格式，将数据反序列化
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false, //展开
    token:getToken() || '',//登录状态下刷新如果存在
    username:getUsername() || ''
}

const getters={//衍生数据
    isCollapse:()=>state.isCollapse
}
const mutations={
    // payload传参
    SET_COLLAPSE(state,payload){
        state.isCollapse=!state.isCollapse
        //将此时的状态放到本地存储中//JSON.stringify将数据转化为字符串，将数据序列化
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    //设置用户
    SET_USERNAME(state,value){
        state.username=value
    },
    //设置token
    SET_TOKEN(state,value){
        state.token=value
    }
}
const actions={
    //登录action -->发起网络请求 --> 
    login({commit},data){
        return new Promise((resolve,reject)=>{
            // 发起网络请求
            do_login(data).then(res=>{
                const {username,token}=res.data.data
                //通过同步方式将数据跟新到state中
                commit('SET_USERNAME',username)
                commit('SET_TOKEN',token)
                //下载cookie_js，在cookie.js中引入
                //以cookie的方式存放到浏览器缓存
                setUsername(username)
                setToken(token)
                resolve(res)
            }).catch(err=>{

            })
        })
    },
    //退出按钮，清空用户和token数据
    exit({commit}){
        return new Promise((resolve,reject)=>{
            removeUsername()
            removeToken()
            commit('SET_USERNAME','')
            commit('SET_TOKEN','')
            resolve()
        })
    }
}
export default{
    // vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}