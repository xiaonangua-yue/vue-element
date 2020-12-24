import { MessageBox } from 'element-ui';
export default{
    install (Vue){
        //加到原型里面，在原型上注入了
        Vue.prototype.confirm=({content,tip,type,center,callback})=>{//注入插件
            MessageBox.confirm(content,tip,{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type,//弹框中的提示图标
                center: center//居中
            }).then(() => {
                callback&&callback()
            }).catch(() => {
                
            });
        }
    }
}