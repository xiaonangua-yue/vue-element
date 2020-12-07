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
                    <p>{{num}}</p>
                    <p>{{obj.name}}</p>
                    <p @click="test">点击调用测试方法</p>
                    <el-button type="danger" class="block top" @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import valueDefaults from '@/utils/validate.js'//导入全部过滤特殊字符
import {onMounted,reactive,ref} from '@vue/composition-api'//导入vue3.0
export default {
//     setup(props, context) {
//         //包含了父组件给子组件传递的属性（除了prop之外的其他属性也除了style class的属性）
//         this.$attrs//-->context.attrs
//         //访问当前组件中的其他插槽
//         this.$slots//-->context.slots
//         //代表父组件的实例化对象this.$parent，调用父组件的方法和属性
//         this.$parent//-->context.parent
//         //根组件 main.js
//         this.$root//-->context.root
//         //用来子组件向父组件触发一个自定义方法，目的是为了传递参数，这是实现2.0父子组件传值的基本方式
//         this.$emit//-->context.emit
//         //在组建中获取DOM元素的引用，返回的是一个对象，ref在DOM元素上返回的就是DOM的JS对象，如果ref在子组件上返回的就是子组件的实例化对象this.$refs.xxx.数据/方法 （测试：调用子组件的数据或方法）
//         this.$refs//-->context.refs
//     },
    
    setup(props,{refs}) {
    //1：数据的定义和使用
        //reactive:引用类型数据 Object Array
        const obj=reactive({name:'xiaopingguo',age:21})
        //ref:基本类型数据 string number boolean null undefined返回的是一个响应式对象
        const num=ref(100)
        const flag=ref(true)
        num.value=200//设置修改
        flag.value=false
        console.log(flag.value)
        //响应式：
        //获取.value触发get方法
        //num.value
        //设置.value='新值'触发set方法（通知视图更新）
        //num.value=111
    
    //2：setup定义数据 生命周期钩子 自定义方法
        //定义的数据必须return返回，如果不返回就不能在模板中使用
        //定义生命周期：
        onMounted(()=>{//回调函数
            console.log("111")
            test()
        })
        //定义自定义方法，如果在模板中使用这个函数必须return
        // const test=(()=>{
        //     console.log("这是一个测试方法");
        // })
        //或者简写
        const test=()=>{
            console.log("这是一个测试方法");
        }

        return{
            obj,
            num,
            test
        }
    },
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
    mounted(){

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
                    console.log(process.env.NODE_ENV);
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