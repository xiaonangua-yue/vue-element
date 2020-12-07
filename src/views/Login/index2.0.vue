<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current':item.current}" @click="toggleMenu(item)" v-for="(item,index) in menuTab" :key="index">{{item.txt}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item prop="username" class="form-item">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form-item">
                    <label for="password">密码</label>
                    <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwordb" v-show="mode=='register'" class="form-item">
                    <label for="passwordb">确认您的密码</label>
                    <el-input id="passwordb" type="text" v-model="ruleForm.passwordb" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="form-item">
                    <label for="code">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input id="code" v-model="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type="danger" class="block top" @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import valueDefaults from '@/utils/validate.js'//导入全部过滤特殊字符
export default {
    data(){
        //验证码
        var validateCode = (rule, value, callback) => {
            // console.log(validate_inputValue(value));
            this.ruleForm.code = value = valueDefaults.validate_inputValue(value,'code');
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(valueDefaults.test_code(value)){
                callback(new Error('验证码格式错误！'));
            }else{
                callback()
            }
        };
        //验证邮箱
        var validateUsername = (rule, value, callback) => {
            this.ruleForm.username = value = valueDefaults.validate_inputValue(value,'email');
            if (value === '') {
                callback(new Error('请输入邮箱'));
            // } else if(!reg.test(value)){
            } else if(valueDefaults.test_email(value)){
                callback(new Error('邮箱格式错误！'));
            }else{
                callback();
            }
        };
        //验证密码
        var validatePassword = (rule, value, callback) => {
            //验证的字段，输入的值，验证后做的事（回调函数）
            // console.log('rule',rule)
            // console.log('value',value)
            this.ruleForm.password = value = valueDefaults.validate_inputValue(value,'password');
            if (value === '') {
                //错误了
                callback(new Error('请输入密码'));
            } else if (valueDefaults.test_password(value)) {
                callback(new Error('密码格式需6~20位数字与字母'));
            } else {
                //正确了就调用
                callback();
            }
        };
        //验证重复密码
        var validatePasswordb = (rule, value, callback) => {
            if(this.mode=='login'){
                callback()
                return
            }//如果在登录界面时调用后return终止确认密码的操作框，确认密码框display="none"只是用v-show隐藏了此元素
            console.log("验证重复密码")
            this.ruleForm.passwordb = value = valueDefaults.validate_inputValue(value,'passwordb');
            if (value !== this.ruleForm.password){
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return{
            mode:'login',
            menuTab:[
                {txt:"登录",current:true,type:'login'},
                {txt:"注册",current:false,type:'register'}
            ],
            //input绑定的数据
            ruleForm: {
                username: '',
                password: '',
                passwordb:'',
                code: ''
            },
            //密码校验方式
            rules: {
                username: [
                    // trigger: 'blur'失去焦点时触发
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwordb: [
                    { validator: validatePasswordb, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        toggleMenu(item){
            // console.log(item);
            this.menuTab.map(item=>item.current=false)
            item.current=true
            this.mode=item.type//切换登录login或注册register
        },
        //对表单的每一个字段进行验证
        submitForm(formName) {
            this.$refs[formName].validate((result) => {
                if (result) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    console.log(result);
                    return false;
                }
            });
        }
    }
}

</script>

<style lang="scss">
#login{
    height: 100vh;//vh 基于浏览器的可视区域设置高
    background-color: #344A5F;
}
.login-wrap{
    width: 330px;
    margin: 0 auto;
}
.menu-tab{
    text-align: center;
    padding-top: 100px;
    li{
        display: inline-block;
        width: 88px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    label{
        display: block;
        color: #fff;
        font-size: 14px;
        margin-bottom: 3px;
    }
    .form-item{
        margin-bottom: 12px;
    }
    .top{
        margin-top: 15px;
    }
    .block{
        display: block;
        width: 100%;
    }
}
</style>