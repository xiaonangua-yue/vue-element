<template>
    <div id="nav-wrap">
        <!-- logo -->
        <h1 class="logo">
            <img src="../../../assets/logo.png" alt="">
        </h1>
        <!-- 菜单列表开始 -->
        <el-menu default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            router
        >
        <!-- router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转：:index="itemChild.path" -->
        <!-- <template>包裹标签，不会形成DOM元素，可以把v-for拿来实现，解决不与v-if一起使用的问题 -->
        <template v-for="(item,index) in routes">
            <el-submenu :index="index+''" v-if="!item.hidden" :key="index">
                <!-- 一级路由循环遍历 -->
                <template slot="title">
                    <svg-icon :iconName='item.mate.icon' :iconClass='item.mate.icon'/>
                    <span slot="title">{{item.mate.name}}</span>
                </template>
                <!-- 二级路由循环遍历 -->
                <el-menu-item :index="itemChild.path" v-for="(itemChild,_index) in item.children" :key="_index">{{itemChild.mate.name}}</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
    <!-- 菜单列表结束 -->
    
    </div>
</template>
<script>
import {ref,reactive, computed} from '@vue/composition-api'
import SvgIcon from '../../../icons/components/SvgIcon.vue'
export default {
    components:{SvgIcon},
    name:'Main',
    setup(props,{root,refs}){
        //读取vuex中的state
        const isCollapse=computed(()=>{
            return root.$store.getters['app/isCollapse']
        }) //展开
        //获取路由信息
        const routes=reactive(root.$router.options.routes)
        return{
            isCollapse,
            routes
        }
    }
}
</script>
<style lang="scss" scoped>
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: $NavWidth;
    background-color: #344A5F;
    // 在main.scss里面定义侧边菜单栏动画函数，在此使用
    @include webkit("transition",all .5s ease 0s);
    .logo{
        text-align: center;
        img{
            margin: 30px auto 30px;
            width: 70px;
            @include webkit("transition",all .5s ease 0s);
        }
    }
}
.open{
    #nav-wrap{
        width: $NavWidth;
    }
}
.close{
    #nav-wrap{
        width: $NavMinWidth;
        .logo img{
            width: 50%;
        }
    }
}
</style>