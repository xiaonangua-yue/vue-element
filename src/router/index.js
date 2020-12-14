import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/home",
    hidden:true,//隐藏
    mate:{//自定义属性
      name:""
    },
  },
  //控制台
  {
    path: "/home",
    name: "Home",
    hidden:false,//自定义属性显示
    mate:{
      name:"控制台",
      icon:'home'//定义图标属性
    },
    component: () => import("../views/Layout/index.vue"),
    redirect:'/index',//直接定向Home文件夹下的index.vue子路由的内容
    children:[//子路由，内容放到main.vue中
      {
        path:'/index',
        name:'HomeIndex',
        mate:{name:"首页"},
        component: () => import("../views/Home/index.vue")
      },
      //多个
      // {
      //   path:'/index2',
      //   name:'HomeIndex2',
      //   mate:{name:"其他"},
      //   component: () => import("../views/Home/index.vue")
      // }
    ]
  },
  //信息管理
  {
    path: "/info",
    name: "Info",
    hidden:false,//自定义属性显示
    mate:{
      name:"信息管理",
      icon:'info'//定义图标属性
    },
    component: () => import("../views/Layout/index.vue"),
    children:[
      {
        path:'/infoIndex',
        name:'infoIndex',
        mate:{name:"信息列表"},
        component: () => import("../views/Info/index.vue")
      },
      //
      {
        path:'/infoCate',
        name:'infoCate',
        mate:{name:"信息分类"},
        component: () => import("../views/Info/cate.vue")
      }
    ]
  },
  //用户管理
  {
    path: "/user",
    name: "User",
    hidden:false,//自定义属性显示
    mate:{
      name:"用户管理",
      icon:'user'//定义图标属性
    },
    component: () => import("../views/Layout/index.vue"),
    children:[
      {
        path:'/userIndex',
        name:'userIndex',
        mate:{name:"用户列表"},
        component: () => import("../views/User/index.vue")
      },
      {
        path:'/userCate',
        name:'userCate',
        mate:{name:"用户分类"},
        component: () => import("../views/User/cate.vue")
      }
    ]
  },
  //登录注册页面
  {
    path: "/login",
    name: "Login",
    hidden:true,//隐藏
    mate:{//自定义属性
      name:"登录"
    },
    component: () => import("../views/Login/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// //路由守卫  //只有登录成功才能跳转
// router.beforeEach((to,form,next)=>{
//   // console.log(to) //从哪里来
//   // console.log(form) //到哪里去
//   // console.log(next) //方法
//   //本地读取登录状态
//   // const isLogin=localStorage.getItem('ele_login')?true:false
//   // if(to.path==='/login'){
//   //   next() //执行调用
//   // }else{
//   //   //是否登录，没有登录就重定向到登录的页面，如果登录就正常执行next
//   //   //控制台输入了localStorage.setItem('ele_login',true)回车-->在Application中可以修改true(直接登录)
//   //   isLogin?next():next('/login')
//   // }
//   //换为next直接跳转不用再判断过滤
//   next()//执行调用
// })

export default router;
