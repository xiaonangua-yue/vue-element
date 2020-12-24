<template>
    <div>
        <div class="space-25"></div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                <label for="category">类型：</label>
                    <div class="warp-content">
                        <el-select id="category" v-model="category_value" placeholder="请选择">
                            <el-option v-for="cate in category.item" :key="cate.id" :label="cate.category_name" :value="cate.id"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                <label for="date">日期：</label>
                    <div class="warp-content">
                        <el-date-picker
                            style="width:100%"
                            v-model="date_value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            >
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="label-wrap key-word">
                <label for="key-word">关键字：</label>
                    <div class="warp-content">
                        <el-select @change="search_keyword" id="key-word" v-model="search_key" placeholder="ID" style="width:100%">
                            <el-option v-for="item in search_option" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_input" placeholder="请输入内容" style="font-size:12px"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width:100%" @click="getNews">搜索</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="success" style="width:50%" class="pull-right" @click="info_dialog=true">新增</el-button>
            </el-col>
        </el-row>

        <div class="space-25"></div>
        <el-row>
            <el-table :data="table_data.item" border  style="width: 100%" ref="tableAll" @selection-change="selected">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="title" label="标题" min-width="6"></el-table-column>
              <el-table-column prop="categoryId" label="类别" :formatter="_cate" min-width="1"></el-table-column>
              <el-table-column prop="createDate" label="日期" :formatter="_date" min-width="2"></el-table-column>
              <!-- <el-table-column prop="user" label="管理人" min-width="1">小南瓜</el-table-column> -->
              <el-table-column prop="id" label="管理人" min-width="1"></el-table-column>
              
              <el-table-column label="操作" min-width="2">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                  <el-button type="success" size="mini" @click="editItem(scope.row.id)">编辑</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-row>

        <div class="space-25"></div>
        <el-row>
            <el-col :span="12">
                <el-button @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                    class="pull-right"
                    background
                    :current-page="1"
                    @current-change='current_change'
                    @size-change='size_change'
                    :page-sizes="[2,4,6]"
                    layout="sizes,total,prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 新增的弹框 -->
        <!-- <InfoDialog :info_dialog.sync='info_dialog' @close='closeDialog'/> -->
        <!-- 使用属性修饰符 ,用.sync-->
        <InfoDialog :info_dialog.sync='info_dialog' :category="category.item" @lodeNews="getNews"/>
        <!-- 编辑弹框 -->
        <EditDialog :info_dialog_edit.sync='info_dialog_edit' @reload="getNews" :category="category.item" :id="editId"/>
    </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from '@vue/composition-api'
import InfoDialog from './dialog/info'
import EditDialog from './dialog/edit'
// import {confirm} from '@/utils/helper.js'
import {global} from '@/utils/global_3.0.js'
import {common} from '@/api/common.js'
import {get_news,delete_news} from '@/api/info.js'
import {formatDate} from '@/utils/functions.js'
export default {
    components:{InfoDialog,EditDialog},
    setup(props,{emit,refs,root}){
////////////////////////公共业务///////////////////////////////
        const category=reactive({
            item:[]
        })
        const {confirm}=global()
        const {category:categoryChange,getCategoryAll}=common()
        watch(()=>categoryChange.item,(value)=>{//只要发生变化就监听执行
            // console.log('--->',value)
            category.item=value
        })
////////////////////////生命周期相关////////////////////////////////
        onMounted(()=>{
            //1.获取对应的分类信息 ---vuex获取  
            //---vue3.0公共业务抽离 分类信息
            getCategoryAll()
            //2.获取列表数据
            getNews()
            //使用日期处理类库moment
            // console.log(root.$moment.unix("1608661298").format("YYYY-MM-DD HH:mm:ss"))
        })
////////////////////////数据data////////////////////////////////
        //ref字符串或数字或布尔值，（对象，数组）如果在模板中触发其响应式则用reactive
        //类型的默认数据
        const category_value =ref('')
        //日期的默认数据
        const date_value =ref('')
        //搜索框的默认数据
        const search_key =ref('id')
        //搜索框下拉列表
        const search_option =reactive([
            {value:'id',label:'ID'},
            {value:'title',label:'标题'}
        ])
        //输入内容的搜索框
        const search_input =ref('')
        //表格数据
        const table_data =reactive({
            item:[//新增的数据内容，不要写死的这些
                // {
                //     id:1,
                //     title:'彭博社雇员被逮捕 外交部回应',
                //     category: '国内信息',
                //     date: '2020-12-15 19:31:31',
                //     user: '管理员'
                // }, {
                //     id:2,
                //     title:'澳大利亚总理莫里森15日出席活动时表示，澳大利亚“支持中国大力发展经济”',
                //     category: '国内信息',
                //     date: '2020-12-16 11:31:31',
                //     user: '张三',
                // }
            ]
        })
        //新增弹框
        const info_dialog =ref(false)
        const info_dialog_edit =ref(false)
        const total=ref(0)//总页数
        //选中的数据行
        let selected_data=reactive([])
        //编辑
        const editId=ref('')
////////////////////////////////////methods////////////////////////////////////
        // const closeDialog=((value)=>{
        //     info_dialog.value=value
        // })
        //编辑内容
        const editItem=((id)=>{
            info_dialog_edit.value=true
            editId.value=id
        })
        //封装分页
        const page=reactive({
            pageNumber:1,//页码
            pageSize:2//每页多少数据
        })
        //点击页码
        const current_change=((currentPage)=>{
            page.pageNumber=currentPage
            getNews()
        })
        //点击分页大小
        const size_change=((pageSize)=>{
            page.pageSize=pageSize
            getNews()
        })
        //搜索关键字
        const search_keyword=((value)=>{
            search_key.value=value
            // console.log("-->",search_key.value)
        })
        //点击搜索
        const search=()=>{
            //调用分页
            let data={
                pageNumber:page.pageNumber,//页码
                pageSize:page.pageSize//每页多少数据
            }
            //处理类型搜索
            if(category_value.value){
                data.categoryId=category_value.value
            }
            //日期
            if(Array.isArray(date_value.value)&&date_value.value.length>0){
                data.startTime=date_value.value[0]
                data.endTime=date_value.value[1]
            }
            //关键字
            if(search_input.value){
                data[search_key.value]=search_input.value
            }
            return data
            
        }
        //获取列表数据
        const getNews=()=>{
            let data=search()//调用
            get_news(data).then(res=>{
                table_data.item=res.data.data.data
                total.value=res.data.data.total
                // total.value=res.data.data.length
                //搜索完成后清空
                category_value.value=""
                date_value.value=""
                search_input.value=""
                // res.data.data.data.length==0 删除当前页的所有内容之后不会显示暂无数据，直接再次刷新页面回到第一页默认的页码上
                // page.pageNumber!==1 当批量删除所有之后会一直刷新页面，所以当页码不是1的时候，才会刷新页面
                if(res.data.data.data.length==0 && page.pageNumber!==1){
                    window.location.reload()
                }
            }).catch(err=>{

            })
        }
        //格式化日期 elementUi中的formatter用来格式化内容
        const _date=((row,column,cellValue,index)=>{
            // console.log(row.createDate)
            //时间戳转化为对应的日期格式
            return formatDate(row.createDate)
        })
        //格式化类别
        const _cate=((row)=>{
            let cate_name=""
            let tmp=category.item.filter(cate=>{
                if(cate.id==row.categoryId){
                    cate_name=cate.category_name
                }
            })
            return cate_name
            //或者
            // let cate_name=category.item.filter(cate=>cate.id===row.categoryId)[0].category_name
            // return cate_name
        })
        //执行删除
        const delete_item=(ids)=>{
            //发送请求，删除数据
            // console.log(ids)
            delete_news({
                id:ids
            }).then(res=>{
                getNews()
            })
        }
        //vue添加全局方法 通过vue实例 调用（全局注入main.js中）
        //把这些删除操作的弹框内容提取到utils文件夹的helper.js中
        //单个删除
        const deleteItem=((id)=>{
            // const {str,confirm}=global()
            // const {confirm}=global()
            selected_data=reactive([Number(id)])
            confirm({//3.0不需要root
            // root.confirm({
                content:'确定删除此信息?',
                tip:'提示',
                type:'warning',
                center:true,
                callback:delete_item,
                id:selected_data
            })
            //3.0可以直接监听str的属性
            // watch(()=>str.value,(value)=>{
            //     console.log('--->',value)
            // })
            //或者
            // watch(str,(value)=>{
            //     console.log('###',value)
            // })
            //第二种方法
            // .then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })
        })
        //批量删除，选中内容时
        const selected=(rows)=>{
            selected_data=reactive([])
            rows.map(item=>{
                selected_data.push(item.id)
            })
        }
        //批量删除，全部选中时
        const deleteAll=(()=>{
            // console.log(selected_data)
            const {confirm}=global()
            //选中数据才能执行弹框确认是否删除
            if(selected_data.length==0){//未选中内容提示
                root.$message({
                    type:"error",
                    showClose: true,
                    message:"请先选中要删除的数据！",
                    duration:2000
                })
                return false
            }
            confirm({
                content:'确定删除所有选中信息?',
                tip:'提示',
                type:'warning',
                center:true,
                callback:delete_item,
                id:selected_data
            })
        })
        
        
        return{
            //ref
            category_value,date_value,search_key,search_input,info_dialog,info_dialog_edit,total,editId,
            //reactive
            search_option,table_data,category,
            //methods
            search_keyword,current_change,size_change,deleteItem,deleteAll,selected,_date,_cate,getNews,editItem
        }
    }
}
</script>
<style lang="scss" scoped>
.label-wrap{
    &.category{@include labelDom(center,60,40)}
    &.date{@include labelDom(center,60,40)}
    &.key-word{@include labelDom(center,60,40)}
}
</style>