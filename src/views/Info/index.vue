<template>
    <div>
        <div class="space-25"></div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                <label for="category">类型：</label>
                    <div class="warp-content">
                        <el-select id="category" v-model="category_value" placeholder="请选择">
                            <el-option label="分类一" value="1"></el-option>
                            <el-option label="分类二" value="2"></el-option>
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
                <el-button type="danger" style="width:100%">搜索</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="success" style="width:50%" class="pull-right" @click="info_dialog=true">新增<p>{{info_dialog?"true":"false"}}</p></el-button>
            </el-col>
        </el-row>

        <div class="space-25"></div>
        <el-row>
            <el-table :data="table_data" border  style="width: 100%">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="title" label="标题" min-width="6"></el-table-column>
              <el-table-column prop="category" label="类别" min-width="1"></el-table-column>
              <el-table-column prop="date" label="日期" min-width="2"></el-table-column>
              <el-table-column prop="user" label="管理人" min-width="1"></el-table-column>
              
              <el-table-column label="操作" min-width="2">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteRow(scope.$index, tableData)">删除</el-button>
                  <el-button type="success" size="mini" @click="handleClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-row>

        <div class="space-25"></div>
        <el-row>
            <el-col :span="12">
                <el-button>批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                    class="pull-right"
                    background
                    :current-page="2"
                    @current-change='current_change'
                    :page-sizes="[10,20,30]"
                    layout="sizes,total,prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 新增的弹框 -->
        <!-- <InfoDialog :info_dialog.sync='info_dialog' @close='closeDialog'/> -->
        <!-- 使用属性修饰符 ,用.sync-->
        <InfoDialog :info_dialog.sync='info_dialog'/>
        
    </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api'
import InfoDialog from './dialog/info'
export default {
    components:{InfoDialog},
    setup(){
////////////////////////数据////////////////////////////////
        //类型的默认数据
        const category_value =ref('')
        //日期的默认数据
        const date_value =ref('')
        //搜索框的默认数据
        const search_key =ref('ID')
        //搜索框下拉列表
        const search_option =reactive([
            {value:'id',label:'ID'},
            {value:'title',label:'标题'}
        ])
        //输入内容的搜索框
        const search_input =ref('')
        //表格数据
        const table_data =reactive([
            {
            title:'彭博社雇员被逮捕 外交部回应',
            category: '国内信息',
            date: '2020-12-15 19:31:31',
            user: '管理员'
            }, {
            title:'澳大利亚总理莫里森15日出席活动时表示，澳大利亚“支持中国大力发展经济”',
            category: '国内信息',
            date: '2020-12-16 11:31:31',
            user: '张三',
            }, {
            title:'外交部回应纳指将删除中国公司 必将损害各国投资者的利益',
            category: '国内信息',
            date: '2020-12-15 19:31:31',
            user: '王大虎'
            }, {
            title:'曾光:局部疫情反弹不必恐慌,春节可放心返乡',
            category: '国内信息',
            date: '2020-12-15 19:31:31',
            user: '李小妞'
            }
        ])
        //新增弹框
        const info_dialog =ref(false)
////////////////////////methods//////////////////////////////
        // const closeDialog=((value)=>{
        //     info_dialog.value=value
        // })
        const search_keyword=((value)=>{
            console.log(value)
        })
        const current_change=((currentPage)=>{
            console.log(currentPage)
        })
        return{
            //ref
            category_value,date_value,search_key,search_input,info_dialog,
            //reactive
            search_option,table_data,
            //methods
            search_keyword,current_change
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