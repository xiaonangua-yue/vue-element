<template>
    <div id="category">
        <el-button type="danger" @click="addFirstCategory">添加一级分类</el-button>
        <hr class="hr-e9e9e9" />
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="cate in category.item" :key="cate.id">
                            <!--一级分类-->
                            <h4>
                                <svg-icon iconName="reduce"></svg-icon>
                                {{cate.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round @click="editCategory(cate,'first_category')">编辑</el-button>
                                    <el-button size="mini" type="success" round @click="addSecondCategory(cate)">添加子级</el-button>
                                    <el-button size="mini" round @click="deleteCategory(cate,'first_cate')">删除</el-button>
                                </div>
                            </h4>
                            <!--子级分类-->
                            <ul>
                                <li v-for="cateson in cate.children" :key="cateson.id">
                                    {{cateson.category_name}}
                                    <div class="button-group">
                                        <el-button size="mini" type="danger" round @click="editCategory(cateson,'second_category',cate.category_name)">编辑</el-button>
                                        <el-button size="mini" round @click="deleteCategory(cateson,'second_cate')">删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
				<el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form label-width="135px" class="from-wrap" ref="categoryFrom">
                        <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_input">
                            <el-input v-model="form.categoryName" :disabled='is_disabled'></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName"  v-if="category_second_input">
                            <el-input v-model="form.secCategoryName" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" style='width:100px' @click="submit">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>	
            </el-row>
        </div>
    </div>
</template>
<script>
import { reactive,ref,onMounted,watch } from '@vue/composition-api'
import {add_first_category,get_all_category,add_second_category,delete_first_category,edit_category} from '@/api/info'
import {global} from '@/utils/global_3.0.js'
import {common} from '@/api/common.js'
export default {
    name:'category',
    setup(props,{root,refs}){
////////////////////////////ref///////////////////////////
        const category_first_input=ref(true)
        const category_second_input=ref(true)
        const is_disabled=ref(false)//添加时一级分类的启用和禁用
        const submit_type=ref("")
////////////////////////////reactive/////////////////////////
        //分类表单绑定的数据
        const form=reactive({
            categoryName:'',
            secCategoryName:''
        })
        //存储分类信息
        const category=reactive({
            item:[],//所有的分类数据
            current:[]//当前操作的是哪个分类
        })
//////////////////////////global 公共业务////////////////////////
        const {confirm}=global()
////////////////////////////methods////////////////////////////
        //点击添加一级分类按钮
        const addFirstCategory=(()=>{
            //点击添加一级分类只显示一级分类框，二级分类隐藏
            category_first_input.value=true
            category_second_input.value=false
            submit_type.value='add_first_category'
            is_disabled.value=false//二级分类添加完成点击一级分类启用
            form.categoryName=""
        })
        //点击添加二级分类按钮
        const addSecondCategory=((cate)=>{
            form.categoryName=cate.category_name//写入分类名称
            is_disabled.value=true//添加时一级分类禁用
            category_first_input.value=true
            category_second_input.value=true
            submit_type.value='add_second_category'
            category.current=cate
            form.secCategoryName=""
        })
        //编辑一级二级分类按钮
        const editCategory=((cate,type,first_cate_name='')=>{
            if(type==='first_category'){//编辑一级分类
                form.categoryName=cate.category_name
                category_second_input.value=false//编辑时二级分类隐藏
                is_disabled.value=false
                submit_type.value='edit_first_category'
                category.current=cate
            }else{//编辑二级分类
                is_disabled.value=true
                form.secCategoryName=cate.category_name
                form.categoryName=first_cate_name//直接点击编辑二级时显示对应一级菜单的内容
                category_second_input.value=true
                category_first_input.value=true
                submit_type.value='edit_second_category'
                category.current=cate
            }
        })
        //执行一级分类增加
        const doAddFirstCategory=(()=>{
            //当前分类输入框必须有内容
            if(!form.categoryName){
                root.$message({
                    type:"error",
                    message:"分类不能为空",
                    duration:1000
                })
                return false
            }
            add_first_category({categoryName:form.categoryName}).then(res=>{
                root.$message({
                    type:'success',
                    message:res.data.message,
                    duration:1000
                })
                // category.item.unshift(res.data.data)
                getCategoryAll()
                //清空一级表单数据
                form.categoryName=""
            }).catch(err=>{

            })
        })
        //执行二级分类增加
        const doAddSecondCategory=()=>{
            // console.log(category.current)
            add_second_category({
                categoryName:form.secCategoryName,
                parentId:category.current.id
            }).then(res=>{
                root.$message({
                    type:'success',
                    message:res.data.message,
                    duration:1000
                })
                //1:不用刷新重新发送http请求
                getCategoryAll()

                //2：手动找到父类children数组中的push
                // console.log(res.data.data)
                // category.item.map(cate=>{
                //     if(cate.id===category.current.id){//找到要unshift添加的一级分类
                //         cate.children.unshift(res.data.data)
                //     }
                // })
                //清空二级表单数据
                form.categoryName=""
                form.secCategoryName=""
            }).catch(err=>{

            })
        }
        //执行一级二级分类编辑
        const doEditCategory=(categoryName)=>{
            edit_category({
                id:category.current.id,
                categoryName:categoryName//修改以后的内容
            }).then(res=>{
                // console.log('一级',res)
                //直接修改，因为引用所以不用调接口重新刷新了
                category.current.category_name=res.data.data.data.categoryName
                //清空表单
                form.secCategoryName=""
                form.categoryName=""
            })
        }
        //删除一级和二级分类
        const deleteCategory=((cate,type)=>{
            //弹框询问是否确认删除
            confirm({
                content:'确认删除吗？',
                tip:'提示',
                type:'',
                center:true,
                callback:()=>{//确定删除
                    delete_first_category({
                        //请求删除的参数categoryId
                        categoryId:cate.id
                    }).then(res=>{
                        // console.log(res)
                        if(type==='first_cate'){//删除一级
                            category.item.map((deletecate,index)=>{
                                if(deletecate.id==cate.id){
                                    category.item.splice(index,1)
                                }
                            })
                        }else{//删除二级
                            getCategoryAll()
                        }
                    })
                }
            })
            
        })
        //点击确定按钮提交添加
        const submit=(()=>{
            //判断业务逻辑
            if(submit_type.value==='add_first_category'){
                //添加一级分类
                doAddFirstCategory()
            }
            if(submit_type.value==='add_second_category'){
                //添加二级分类
                doAddSecondCategory()
            }
            if(submit_type.value==='edit_first_category'){
                //编辑一级
                doEditCategory(form.categoryName)
            }
            if(submit_type.value==='edit_second_category'){
                //编辑二级
                doEditCategory(form.secCategoryName)
            }
        })

        //获取分类信息 放到了公共业务里面
        // const getCategoryAll=()=>{
        //     get_all_category().then(res=>{
        //         category.item=res.data.data
        //     }).catch(err=>{
                
        //     })
        // }
////////////////////////公共业务///////////////////////////////
        const {category:categoryChange,getCategoryAll}=common()
        watch(()=>categoryChange.item,(value)=>{//只要发生变化就监听执行
            // console.log('--->',value)
            category.item=value
        })
//////////////////////////生命周期///////////////////////////
        onMounted(()=>{
            //获取分类信息
            getCategoryAll()
        })
        return{
            //////////ref
            category_first_input,category_second_input,is_disabled,
            //////////reactive
            form,category,
            //////////methods
            addFirstCategory,submit,addSecondCategory,deleteCategory,editCategory
        }
    }
}
</script>
<style lang="scss" scoped>
#category{
	margin-top: 25px;
	color:#344a5f;
}
.category-wrap {
    div:first-child {
        &:before { top: 20px; }
    }
    div:last-child {
        &:before { bottom: 21px; }
    }
}
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    font-size: 14px;
    background-color: #f3f3f3;
}
.category {
    position: relative;
    line-height: 44px;
    cursor: pointer;
    font-size: 14px;
    &:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
    }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 14px;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group { display: block; }
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button { font-size: 12px; }
}
.from-wrap {
    width: 410px;
    .el-form-item{
        margin-top: 20px;
    }
}
.hr-e9e9e9 {
    width: calc(100% + 51px);
    margin-left: -26px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
	border-bottom: 1px solid #e9e9e9;
}
</style>