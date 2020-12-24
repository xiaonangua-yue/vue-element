<template>
    <div>
        <el-dialog title="编辑" :visible.sync="my_info_dialog" @close="close" width="580px" @opened="opened" append-to-body>
            <!-- 表单 -->
            <el-form :model="form">
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
import {get_news,edit_news} from '@/api/info'
//单向数据流  父组件传递的参数子组件可以使用但是不能直接去修改
export default({
    //父组件
    props:{
        info_dialog_edit:{
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default:[]
        },
        id:{
            type:String,
            default:''
        }
    },
    setup(props,{root,emit}){
///////////////////////////////////data/////////////////////////////////
        const my_info_dialog=ref(false)
        const formLabelWidth=ref('60px')
        const form=reactive({
            category:'',
            title: '',
            content: ''
        })
////////////////////////////////////methods////////////////////////////////
        const opened=(()=>{
            getinfo()
        })
        const getinfo=(()=>{
            //id 查询数据
            // console.log(props.id)
            get_news({
                id:Number(props.id),
                pageSize:2,
                pageNumber:1
            }).then(res=>{
                console.log(res.data.data.data[0])
                //编辑各行的默认内容都在弹框中
                form.title=res.data.data.data[0].title
                form.content=res.data.data.data[0].content
                form.category=res.data.data.data[0].categoryId
            })
        })
        //确认提交修改
        const submit=(()=>{
            edit_news({
                id:props.id,
                categoryId:form.category,
                title:form.title,
                content:form.content
            }).then(res=>{
                // console.log(res.data.data)
                root.$message({
                    type:"success",
                    message:res.data.message,
                    duration:1000
                })
                close()
                // 修改完成重新刷新页面加载，告诉父组件的弹框重新加载数据
                emit("reload")
            })
        })
        //修改完成关闭弹框
        const close=(()=>{
            emit('update:info_dialog_edit',false)
            form.title=""
            form.content=""
            form.category=""
        })
////////////////////////////////////watch////////////////////////////////
        watch(()=>props.info_dialog_edit,(newValue,oldValue)=>{
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
    }
})
</script>
<style lang="scss" scoped>

</style>