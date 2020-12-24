//单独引入 MessageBox：
import { MessageBox } from 'element-ui';
//自定义方法
export const confirm=({content,tip,type,center,callback})=>{
    MessageBox.confirm(content,tip,{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type,//弹框中的提示图标
        center: center//居中
    }).then(() => {
        // MessageBox.$message({
        //     type: 'success',
        //     message: '删除成功!'
        // });
        //如果callback存在就调用预先设定好的操作来执行
        callback&&callback()
    }).catch(() => {
        // MessageBox.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });
    });
}
//第二种方法
// export const confirm=({content,tip,type,center})=>{
//     return new Promise((resolve,reject)=>{
//         MessageBox.confirm(content,tip,{
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: type,//弹框中的提示图标
//             center: center//居中
//         }).then(() => {
//             resolve('确定')
//         }).catch(() => {
//             reject('取消')
//         });
//     })
// }