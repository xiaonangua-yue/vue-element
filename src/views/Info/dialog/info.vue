<template>
    <el-dialog title="收货地址" :visible.sync="my_info_dialog" append-to-body>
        111
    </el-dialog>
</template>
<script lang="ts">
//单向数据流  父组件传递的参数子组件可以使用但是不能直接去修改
export default({
    //父组件
    props:{
        info_dialog:{
            type:Boolean,
            default:false
        }
    },
    //子组件拷贝一份父组件的属性，修改的就是子组件自己的属性了，这样就不违背单向数据流
    data(){
        return{
            my_info_dialog:false
        }
    },
    //关联属性用watch，可以监听自己子组件的属性也可以监听父组件里面的属性
    watch:{
        info_dialog:{//监听父组件的属性的变化
            handler(newValue,oldValue){
                console.log(newValue,oldValue)//true false
                this.my_info_dialog=newValue//模态框显示
            }
        }
    }
})
</script>
<style lang="scss" scoped>

</style>