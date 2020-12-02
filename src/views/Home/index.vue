<template>
  <div class="home">
    <p>Home~~~</p>
    11111
    <!-- 使用 -->
    <Abc/>
  </div>
</template>

<script>
// import Abc from '@c/HelloWorld.vue'//使用配置的目录的别名用@
import Abc from '@c/HelloWorld'//使用配置的后缀名
export default {
  name: "Home",
  components:{Abc}
};
</script>
