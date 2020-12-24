<template>
    <div>
        <el-dialog title="新增" :visible.sync="my_info_dialog" @close="close" @opened="opened" width="580px" append-to-body>
            <!-- 表单 -->
            <el-form :model="form" ref="info">
                <el-form-item label="类型：" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择">
                        <el-option v-for="cate in category" :label="cate.category_name" :key="cate.id" :value="cate.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="标题：" :label-width="formLabelWidth">
                    <el-input v-model="form.title" placeholder="请输入内容"></el-input>
                </el-form-item>
                
                <el-form-item label="概况：" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="6" v-model="form.content" placeholder="请输入内容"></el-input>
                </el-form-item>
                
            </el-form>
            <!-- 操作按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { reactive,ref,watch } from '@vue/composition-api'
import {add_new} from '@/api/info.js'
//单向数据流  父组件传递的参数子组件可以使用但是不能直接去修改
export default({
    //父组件
    props:{
        info_dialog:{
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default:[]
        }
    },
    setup(props,{root,emit,refs}){
///////////////////////////////////data/////////////////////////////////
        const my_info_dialog=ref(false)
        const formLabelWidth=ref('60px')
        const form=reactive({
            category:"",
            title:"",
            content:""
        })
////////////////////////////////////methods///////////////////////////////
        //3：opened
        const opened=(()=>{
            
        })
        const submit=(()=>{
            //提交字段必填
            if(!form.category){
                root.$message({
                    type:"error",
                    message:'分类必须填写',
                    duration:1000
                })
                return false
            }
            const data={
                categoryId:form.category,
                title:form.title,
                content:form.content
            }
            add_new(data).then(res=>{
                root.$message({
                    type:"success",
                    message:'添加信息成功',
                    duration:1000
                })
                close()
            })
        })
        const close=(()=>{
            emit('update:info_dialog',false)
            // 重置表单
            resetForm()
            // 通知父组件跟新数据
            emit('lodeNews')
        })
        //添加完成后重置表单
        const resetForm=()=>{
            form.category="",
            form.title="",
            form.content=""
        }
        // setTimeout(()=>{
        //     // 1：蓝色i标志：其实，代码运行到console.log()时，确实是没值的，我们展开小三角看到的值，其实是在展开时，浏览器将此时内存中的值展示了。解决动态添加后获取这个属性值为undefined的问题是延迟一秒再获取就可以获取到了该属性值。
        //     // 当你展开数组的时候,显示出来的数据是最终发生了改变的数据
        //     console.log('--->',props)
        // },1000)
        //2：改为watch
        // watch(()=>props.category,(value)=>{
        //     console.log('--->',value)
        // })
////////////////////////////////////watch////////////////////////////////
        watch(()=>props.info_dialog,(newValue,oldValue)=>{
            my_info_dialog.value=newValue
        })
        return{
            //ref
            my_info_dialog,formLabelWidth,
            //reactive
            form,
            //methods
            close,opened,submit
        }
    },
    //子组件拷贝一份父组件的属性，修改的就是子组件自己的属性了，这样就不违背单向数据流
    //关联属性用watch，可以监听自己子组件的属性也可以监听父组件里面的属性
    // watch:{
    //     info_dialog:{//监听父组件的属性的变化
    //         handler(newValue,oldValue){
    //             // console.log(newValue,oldValue)//true false
    //             this.my_info_dialog=newValue//模态框显示
    //         }
    //     }
    // },
    // methods:{
    //     close(){
    //         //使用属性修饰符
    //         // 适合场景：只是更新告知父组件更新某一个值，没有其他业务逻辑
    //         // 通过用.sync，子组件告诉父组件更新修改某一个数据
    //         this.$emit('update:info_dialog',false)
    //         // 使用触发事件，是父组件监听子组件的自定义事件触发父组件的一个回调函数
    //         // 适合场景：有可能在父组件的回调函数中写其他的业务逻辑
    //         //close触发事件，传false，但是需要父组件去监听事件
    //         // this.$emit('close',false)
    //     }
    // }
})
</script>
<style lang="scss" scoped>

</style>