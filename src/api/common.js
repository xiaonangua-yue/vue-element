import {reactive} from '@vue/composition-api';
import {get_all_category} from '@/api/info';
//多个组件之间 只要是重新调用了 组件之间的响应式是不会存在的
export const common=()=>{
    const category=reactive({
        item:[]
    })
    const getCategoryAll=()=>{
        //发送请求
        get_all_category({}).then(res=>{
            // console.log('common',res.data.data)
            category.item=res.data.data
        })
    }
    return{
        category,
        getCategoryAll
    }
}