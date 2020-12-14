<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="toggleMenu">
            <svg-icon iconName='menu' />
        </div>
        <div class="pull-right">
            <div class="pull-left userinfo">
                <img src="../../../assets/a.jpg" alt="">
                <div>管理员</div>
            </div>
            <div class="pull-right header-icon" @click="exit" style="cursor:pointer">
                <svg-icon iconName='exit' />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name:'Heade',
  setup(props,{root}){
      //触发vuex mutations
      const toggleMenu=(()=>{
          root.$store.commit("app/SET_COLLAPSE",123)//123 payload传参
      })
      const exit=(()=>{
          root.$store.dispatch("app/exit").then(res=>{
              //actions关闭执行完成再跳转页面
              root.$router.push({
                  name:'Login'
              })
          })
      })
      return {
          toggleMenu,
          exit
      }
  }
}
</script>
<style lang="scss" scoped>
#header-wrap{
    position: fixed;
    top: 0;
    left: $NavWidth;
    right: 0;
    height: $HeadHeigth;
    background-color: #fff;
    z-index: 1;
    box-shadow:0 3px 16px 0 rgba(0,0,0,.2);
    // -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,.2);
    .header-icon{
        svg{
            font-size: 20px;
            margin: 25px 25px 0;
        }
    }
    .userinfo{
        height: $HeadHeigth;
        padding: 0 20px;
        border-right: 1px solid #ccc;
        font-size: 14px;
        display: flex;
        line-height: $HeadHeigth;
        img{
            width: 35px;
            height: 35px;
            margin: 20px 20px 0 0;
            display: inline-block;
            border-radius: 50%;
        }
    }
}
.open{
    #header-wrap{
        left: $NavWidth;
        @include webkit("transition",all .5s ease 0s);
    }
}
.close{
    #header-wrap{
        left: $NavMinWidth;
        @include webkit("transition",all .5s ease 0s);
    }
}
</style>