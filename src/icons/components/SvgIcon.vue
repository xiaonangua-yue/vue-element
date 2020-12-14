<template>
    <!-- 使用svg图标 -->
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>
<script>
import {onMounted,reactive,ref,computed} from '@vue/composition-api'
export default {
    // props:['iconName'],//简单写法，不限制数据类型
    props:{
        iconName:{//使用不同的图标需要用计算属性
            type:String,
            default:'',
            required:true,
        },
        iconClass:{//额外增加样式也要用计算属性
            type:String,
            default:''
        }
    },
    setup(props,{root,refs}){
        // console.log('-->',props.iconName);
        // const svgClass=ref('svg-icon')
        const svgClass=computed(()=>{//额外增加样式用计算属性
            if(props.iconClass){
                return `svg-icon ${props.iconClass}`
            }else{
                return `svg-icon`
            }
        })
        // const name=ref('#icon-home')//固定一样的图标
        //用计算属性
        const name=computed(()=>`#icon-${props.iconName}`)
        return{
            svgClass,
            name
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1.2em;
    height: 1.2em;
    margin-right: 10px;
}
</style>