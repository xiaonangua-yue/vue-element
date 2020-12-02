import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫  //只有登录成功才能跳转
router.beforeEach((to,form,next)=>{
  // console.log(to) //从哪里来
  // console.log(form) //到哪里去
  // console.log(next) //方法
  //本地读取登录状态
  const isLogin=localStorage.getItem('ele_login')?true:false
  if(to.path==='/login'){
    next() //执行调用

  }else{
    //是否登录，没有登录就重定向到登录的页面，如果登录就正常执行next
    //控制台输入了localStorage.setItem('ele_login',true)回车-->在Application中可以修改true(直接登录)
    isLogin?next():next('/login')
  }
})

export default router;
