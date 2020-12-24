import {ref} from '@vue/composition-api';
import { MessageBox } from 'element-ui';
export const global=()=>{
    // const str=ref('xxx')
    const confirm=({content,tip,type,center,callback,id})=>{
        MessageBox.confirm(content,tip,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,//弹框中的提示图标
            center: center//居中
        }).then(() => {
            // str.value='nice'
            callback&&callback(id)
        }).catch(() => {
            
        });
    }
    return{
        // str,
        confirm
    }
}