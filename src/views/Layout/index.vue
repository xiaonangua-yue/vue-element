<template>
<!-- open展开指定的 sub-menu -->
<!-- close收起指定的 sub-menu -->
  <div :class="[isCollapse ? 'close' : 'open']">
    <LayoutHeader/>
    <LayoutNav/>
    <LayoutMain/>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
// import Abc from '@c/HelloWorld.vue'//使用配置的目录的别名用@
// import Abc from '@c/HelloWorld'//使用配置的后缀名
import LayoutHeader from './components/head'
import LayoutMain from './components/main'
import LayoutNav from './components/nav'

export default {
  name: "Home",
  setup(props,{refs,root}){
    const isCollapse = computed(()=>root.$store.getters['app/isCollapse'])
    return {
      isCollapse
    }
  },
  components:{LayoutHeader,LayoutMain,LayoutNav}
};
</script>
<style lang="scss" scoped>

</style>