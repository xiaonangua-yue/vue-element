<template>
    <div id="category">
        <div class="one">
            <el-button type="danger">添加一级分类</el-button>
        </div>
        <hr class="hra">
        <el-row :gutter="30">
            <el-col :span="9">
                <div class="category-wrap">
                    <div class="category" style="height:250px">
                        <ul>
                            <li class="icon-bg">
                                <div class="xinwen pull-left">
                                    <svg-icon iconName='reduce' class="svg-icona" color="#9e9e9e"/>
                                    <div>新闻</div>
                                </div>
                                <div class="pull-right">
                                    <el-button type="danger" size="mini" round>编辑</el-button>
                                    <el-button type="success" size="mini" round>添加字段</el-button>
                                    <el-button size="mini" round style="margin-right:10px">删除</el-button>
                                </div>
                            </li>
                            <li class="block-one">
                                <div class="block-a">
                                    <i></i><b></b>
                                </div>
                                <div class="block-b">
                                    <i></i><b></b>
                                </div>
                                <div class="block-c">
                                    <i></i><b></b>
                                </div>
                                <div class="block-d">
                                    <i></i>
                                    <div class="science">
                                        <svg-icon iconName='add' class="svg-icona" color="#9e9e9e"/>
                                        <div>科技</div>
                                    </div>
                                </div>
                                <ul class="text-s">
                                    <li><a href="#">国内</a></li>
                                    <li><a href="#">国际</a></li>
                                    <li><a href="#">数读</a></li>
                                    <li><a href="#">军事</a></li>
                                    <li><a href="#">航空</a></li>
                                    <li><a href="#">无人机</a></li>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </el-col>
            <el-col :span="15">
                <div class="category-wrap">
                    <div class="category" style="height:250px">
                        <ul>
                            <li class="icon-bg">
                                <div class="xinwen pull-left">
                                    <div>一级分类编辑</div>
                                </div>
                            </li>
                            <li id="fenlei">
                                <el-form label-width="120px">
                                    <el-form-item label="一级分类名称：">
                                        <el-input v-model="input"></el-input>
                                    </el-form-item>
                                    <el-form-item label="二级分类名称：">
                                        <el-input v-model="input"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="danger">确定</el-button>
                                    </el-form-item>
                                </el-form>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
        input: ''
        }
    }
}
</script>
<style lang="scss" scoped>
#category{
    margin-top: 25px;
    .one{
        height: 60px;
    }
    .hra{
        margin-left: -25px;
        margin-right: -25px;
        border: none;
        border-bottom: 1px solid #efefef;
    }
    .category-wrap{
        margin-top: 22px;
        font-size: 14px;
        .category{
            color: #30485b;
            ul{
                .icon-bg{
                    padding: 6px 0 8px 0;
                    background-color: #f3f3f3;
                    height: 30px;
                    line-height: 30px;
                    position: relative;
                    .xinwen{
                        display: flex;
                        .svg-icona{
                            margin: 8px 0 0 10px;
                        }
                        div{
                            margin: 1px 0 0 10px;
                        }
                    }
                }
                .block-one{
                    i,b{
                        position: absolute;
                        width: 2.4em;
                        height: 3em;
                        left: 1.2em;
                        border-left: 1px dotted #9e9e9e;
                        border-bottom: 1px dotted #9e9e9e;
                    }
                    i{
                        top: -1.1em;
                    }
                    b {
                        top: 1.9em;
                    }
                    .block-a{
                        position: absolute;
                    }
                    .block-b{
                        position: absolute;
                        top: 152px;
                    }
                    .block-c{
                        position: absolute;
                        top: 238px;
                    }
                    .block-d{
                        position: absolute;
                        top: 324px;
                        i{
                            border-bottom: none;
                        }
                        .science{
                            margin-top: 18px;
                            display: flex;
                            .svg-icona{
                                margin: 8px 0 0 10px;
                            }
                            div{
                                margin: 10px 0 0 10px;
                            }
                        }
                    }
                    .text-s{
                        width: 50px;
                        height: 300px;
                        // background-color: palegreen;
                        margin-left: 60px;
                        li{
                            height: 43px;
                            line-height: 54px;
                            a{
                                text-decoration: none;
                                color: #435567;
                            }
                        }
                    }
                }
                #fenlei{
                    width: 340px;
                    .el-form-item{
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>