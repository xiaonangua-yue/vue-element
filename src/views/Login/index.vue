<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{current:item.current}" @click="toggleMenu(item)" v-for="(item,index) in menuTab" :key="index">{{item.txt}}</li>
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
                            <el-button type="success" class="block" :disabled="codeButtonStatus" @click="getCode">{{codeButtonText}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type="danger" class="block top" :disabled="buttonStatus" @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import valueDefaults from '@/utils/validate.js'//导入全部过滤特殊字符
import {onMounted,reactive,ref} from '@vue/composition-api'//导入vue3.0
import {get_code,do_login,do_register} from '@/api/login.js'//导入axios

export default {
    setup(prop,{refs,root}){
//----------------------生命周期---------------------

//---------------data----------------
        const status_username=ref(false)
        const status_password=ref(false)
        const status_passwordb=ref(false)
        //验证码
        let validateCode = (rule, value, callback) => {
            // console.log(validate_inputValue(value));
            ruleForm.code = value = valueDefaults.validate_inputValue(value,'code');
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(valueDefaults.test_code(value)){
                callback(new Error('验证码格式错误！'));
            }else{
                callback()
            }
        };
        //验证邮箱
        let validateUsername = (rule, value, callback) => {
            ruleForm.username = value = valueDefaults.validate_inputValue(value,'email');
            if (value === '') {
                status_username.value=false
                callback(new Error('请输入邮箱'));
            // } else if(!reg.test(value)){
            } else if(valueDefaults.test_email(value)){
                status_username.value=false
                callback(new Error('邮箱格式错误！'));
            }else{
                status_username.value=true
                callback();
            }
        };
        //验证密码
        let validatePassword = (rule, value, callback) => {
            //验证的字段，输入的值，验证后做的事（回调函数）
            // console.log('rule',rule)
            // console.log('value',value)
            ruleForm.password = value = valueDefaults.validate_inputValue(value,'password');
            if (value === '') {
                status_password.value=false
                callback(new Error('请输入密码'));
            } else if (valueDefaults.test_password(value)){
                status_password.value=false
                callback(new Error('密码格式需6~20位数字与字母'));
            } else {
                status_password.value=true
                //正确了就调用
                callback();
            }
        };
        //验证重复密码
        let validatePasswordb = (rule, value, callback) => {
            if(mode.value=='login'){
                callback()
                return
            }//如果在登录界面时调用后return终止确认密码的操作框，确认密码框display="none"只是用v-show隐藏了此元素
            console.log("验证重复密码")
            ruleForm.passwordb = value = valueDefaults.validate_inputValue(value,'passwordb');
            if (value !== ruleForm.password){
                status_passwordb.value=false
                callback(new Error('两次密码不一致'));
            } else {
                status_passwordb.value=true
                callback();
            }
        };
        //定义tab切换模式
        const mode=ref('login')
        //定义表单的相关数据
        const menuTab=reactive([
            {txt:'登录',current:true,type:'login'},
            {txt:'注册',current:false,type:'register'}
        ])
        //input绑定的数据
        const ruleForm=reactive({
            username: '',
            password: '',
            passwordb:'',
            code: ''
        })
        //密码校验方式
        const rules=reactive({
            username: [
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
        })
        //定义登录注册按钮的启用和禁用
        const buttonStatus=ref(true)
        //定义验证码按钮的启用和禁用
        const codeButtonStatus=ref(false)
        //定义验证码文本按钮
        const codeButtonText=ref('获取验证码')
        //定义发送验证码延迟定时器
        const timer_delay=ref(null)
        //定义验证码定时器的倒计时效果
        const timerCountDown=ref(null)
    //---------------methods----------------
        //对表单的每一个字段进行验证
        const submitForm=(formName=>{
            refs[formName].validate((result) => {
                if (result) {
                    //执行登录注册
                    mode.value==='login'?doLogin():doRegister()
                } else {
                    // console.log('error submit!!');
                    // console.log(process.env.NODE_ENV);
                    // console.log(result);
                    return false;
                }
            });
        })
        //点击切换登录注册按钮时所有的状态
        const toggleMenu=((item)=>{
            // console.log(item);
            menuTab.map(item=>item.current=false)
            item.current=true
            mode.value=item.type//切换登录login或注册register
            //点击切换时清空表单数据
            refs["ruleForm"].resetFields()
            //调用：还原验证码的相关状态，为初始的
            resetCodeButton()
            //还原登录注册按钮的状态
            buttonStatus.value=true
        })
        //获取验证码
        const getCode=(()=>{
            //判断如果邮箱不存在
            // if(ruleForm.username==''){
            //     root.$message.error('邮箱不能为空！')//错误弹框
            //     return false
            // }
            //判断如果邮箱/密码/重复密码不存在或格式不正确
            const {result,filed}=validateFileds()
            let offset=20//距离窗口顶部的偏移量为20
            if(!result){//返回true验证通过，false就验证失败
                filed.map(item=>{
                    //错误弹框多个错误时会重叠
                    // root.$message.error(`错误字段：${item.filed}`)
                    //错误弹框多个错误时解决重叠问题
                    offset+=40//多个弹框间隔
                    root.$message({
                        type:'error',
                        message:`错误字段：${item.message}`,//弹框提示错误的内容
                        offset:offset,//message距离窗口顶部的偏移量
                        duration:3000//弹框会显示的毫秒数，设为0不会自动关闭
                    })
                })
                return false
            }
            //发送验证码时让按钮禁用并显示“发送中”
            // codeButtonStatus.value=true
            // codeButtonText.value='发送中'
            setCodeButton({//使用封装的简洁
                status:true,
                text:'发送中'
            })
            //使用定时器为了模拟网络延迟发送验证码
            timer_delay.value=setTimeout(()=>{
                const data={
                    username:ruleForm.username,
                    module:mode.value
                }
                get_code(data).then((res)=>{//监听事件
                    //显示倒计时
                    countDown(5)
                    //获取到验证码 成功弹框
                    root.$message.success(res.data.message)
                    //登录注册按钮启用
                    buttonStatus.value=false
                }).catch((err)=>{
                    console.log(2);
                })
            },2000)
        })
    //-------------------辅助方法-----------------------------
        //验证码定时器的倒计时效果
        const countDown=(timer)=>{
            if(timerCountDown.value){//存在定时器
                clearInterval(timerCountDown.value)
            }
            timerCountDown.value=setInterval(()=>{
                timer--;
                if(timer===0){
                    clearInterval(timerCountDown.value)
                    //显示重新发送
                    // codeButtonText.value='重新发送'
                    // codeButtonStatus.value=false
                    setCodeButton({//使用封装的简洁
                        status:false,
                        text:'重新发送'
                    })
                }else{
                    codeButtonText.value=`倒计时${timer}秒`
                }
            },1000)
        }
        //还原验证码的相关状态，为初始的
        const resetCodeButton=()=>{
            //默认 启用为 获取验证码
            // codeButtonText.value='获取验证码'
            // codeButtonStatus.value=false
            setCodeButton({//使用封装的简洁
                status:false,
                text:'获取验证码'
                
            })
            //清空所有定时器
            clearTimeout(timer_delay.value)
            clearInterval(timerCountDown.value)
        }
        //封装写法：设置获取验证码时按钮的相关状态和内容
        const setCodeButton=({status,text})=>{
            codeButtonStatus.value=status
            codeButtonText.value=text
        }
        //执行登录（在login.js中设置访问接口）
        const doLogin=()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            do_login(data).then(res=>{
                root.$message.success(res.data.message)
            }).catch(err=>{
                
            })
        }
        //执行注册
        const doRegister=()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            //注册，访问接口
            do_register(data).then(res=>{
                //提示注册成功
                root.$message.success(res.data.message)
                // 注册成功后直接切换到登录tab页
                toggleMenu(menuTab[0])
            }).catch(err=>{
                
            })
        }
        //发送验证码前验证相关字段存不存在或者格式是否正确
        const validateFileds=()=>{
            //固定弹框
            // return status_username.value && status_password.value && status_passwordb.value
            //封装输入框不同错误的不同弹框
            const _filed_arr=[
                {filed:'username',flag:status_username.value,message:'邮箱格式不正确'},
                {filed:'password',flag:status_password.value,message:'密码格式不正确'},
                {filed:'passwordb',flag:status_passwordb.value,message:'重复密码与密码不符合'},
            ].filter(item=>!item.flag)
            // console.log(_filed_arr)
            return{
                result:status_username.value && status_password.value && status_passwordb.value,
                filed:_filed_arr
            }
        }
        //导出！！！！！！！！！！！！！！！
        return{
            mode,
            menuTab,
            ruleForm,
            rules,
            toggleMenu,
            submitForm,
            getCode,
            buttonStatus,
            codeButtonStatus,
            codeButtonText
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