<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#main-wrap{
    position: fixed;
    overflow-y: auto;
    top: $HeadHeigth;
    left: $NavWidth;
    right: 0;
    bottom: 0;
    padding: 0 25px;
    border: 30px solid #F7f7F7;
    border-bottom: none;
    background-color: #fff;
}
.open{
    #main-wrap{
        left: $NavWidth;
        @include webkit("transition",all .5s ease 0s);
    }
}
.close{
    #main-wrap{
        left: $NavMinWidth;
        @include webkit("transition",all .5s ease 0s);
    }
}
</style>