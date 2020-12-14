import router from './index.js'
import {getToken} from '../utils/cookie'
import {removeUsername,removeToken} from '../utils/cookie'
import store from '../store/'
//白名单 只要在白名单里面的路由，都可以在未登录时访问，例如购物网站
const writeRouter=['/login','/home','/detail']
//路由相关逻辑
//路由守卫  //只有登录成功才能跳转
 router.beforeEach((to,from,next)=>{
     //判断登录的唯一标识就是token是否存在
    if(getToken()){
        //存在就可以登录
        if(to.path=='/login'){ //如果访问的是login的话就是要重新登录，不再回到之前的登录完成的页面
            //清理localhost中的数据
            removeUsername()
            removeToken()
            //清理vuex中的数据
            store.commit('app/SET_USERNAME','')
            store.commit('app/SET_TOKEN','')
        }
        next()
        
    }else{
        // if(to.path==='/login'){//如果访问的是登录 应该执行next()
        if(writeRouter.indexOf(to.path)!==-1){//如果在白名单里面
            next()
        }else{//不存在 未登录 跳转到登录页执行登录
            next('/login')
        }        
    }
 })