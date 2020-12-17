<template>
    <div class="con">
        <div class="con-one">
          <el-row :gutter="24" style="margin:0px">
            <el-col :span="6" :lg="6" style="padding:0px">
              <div class="inputa-width fudong">
                <span class="demonstration">类型：</span>
                <el-select v-model="value" clearable placeholder="请选择" style="width:160px">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="10" style="padding:0px">
              <div class="inputb-width fudong">
                  <span class="demonstration">日期：</span>
                  <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                  </el-date-picker>
              </div>
            </el-col>
            <el-col :span="8" style="padding:0px">
              <div class="inputc-width fudong">
                  <span class="text-input">关键字：</span>
                  <el-select v-model="value" placeholder="ID" style="width:100px" class="text-input text-input-right">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                  </el-select>
                  <el-input v-model="input" placeholder="请输入内容" style="width:178px" class="text-input text-input-right"></el-input>
                  <el-row class="text-input">
                      <el-button type="danger" style="width:98px">搜索</el-button>
                  </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 表格 -->
            <el-table ref="multipleTable" :data="tableData" border  style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="45" align=center></el-table-column>
              <el-table-column prop="title" label="标题" width="500" align=center></el-table-column>
              <el-table-column prop="zip" label="类别" width="120" align=center></el-table-column>
              <el-table-column prop="date" label="日期" width="210" align=center></el-table-column>
              <el-table-column prop="name" label="管理员" width="120" align=center></el-table-column>
              
              <el-table-column label="操作" width="auto" align=center>
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="deleteRow(scope.$index, tableData)">删除</el-button>
                  <el-button type="success" size="small" @click="handleClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
          </el-table>
        <div style="margin-top: 20px">
          <el-button  type="selection" @click="toggleSelection([tableData[1], tableData[2]])" style="float:left">批量删除</el-button>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000" style="float:right;margin-top: 6px">
          </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
      deleteRow(index, rows) {
        this.$confirm('确定删除此信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          confirmButtonClass:'yes'
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleClick(row) {
        console.log(row);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '北京烤鸭'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        pickerOptions: {
          shortcuts: [{
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        input: '',
        //表格
        tableData: [{
          date: '2020-12-15 19:31:31',
          title:'彭博社雇员被逮捕 外交部回应',
          name: '管理员',
          zip: '国内信息'
        }, {
          date: '2020-12-15 19:31:31',
          title:'美国防授权法案涉华条款近40条',
          name: '张三',
          zip: '国内信息'
        }, {
          date: '2020-12-15 19:31:31',
          title:'外交部回应纳指将删除中国公司 必将损害各国投资者的利益',
          name: '王大虎',
          zip: '国内信息'
        }, {
          date: '2020-12-15 19:31:31',
          title:'曾光:局部疫情反弹不必恐慌,春节可放心返乡',
          name: '李小妞',
          zip: '国内信息'
        }]
      }
    }
}
</script>
<style lang="scss" scoped>
.yes{
  background-color: red;
}
.con{
    width: 96%;
    height: 100%;
    // margin: 30px auto 0;
    // font-size: 15px;
    font-size: 14px;
    .con-one{
        width: 100%;
        height: 100px;
        .el-range-editor.el-input__inner{
            border: 1px solid #dcdfe6;
        }
        .text-input{
            float: left;
            line-height: 40px;
        }
        .text-input-right{
          margin-right: 15px;
        } 
        .fudong{
          float: left;
        }
        .el-col-6{
          width: 230px;
        }
        .el-col-10{
          width: 470px;
        }
        .el-col-8{
          width: 470px;
        }
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-table{
  border-top: 1px solid#EBEEF5;
  border-left: 1px solid#EBEEF5;
}
</style>