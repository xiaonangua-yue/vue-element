//path  common.js
// const cons = require("consolidate")
const path=require("path")
console.log('项目的绝对路径',__dirname)//C:\Users\小南瓜`\Desktop\vue-element
console.log('项目中某个目录的绝对路径',path.resolve(__dirname,'./src/components'))//C:\Users\小南瓜`\Desktop\vue-element\src\components

module.exports  = {
    //基本路径
    publicPath:process.env.NODE_ENV==="production"?'':'/',
    lintOnSave:false,//是否开启语法检测
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true, 
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/main.scss";`
			}
        }
    },
    configureWebpack:(config)=>{
        config.resolve={
            //配置目录的别名
            alias:{
                "@":path.resolve(__dirname,'./src'),
                "@c":path.resolve(__dirname,'./src/components'), //path.resolve() 方法会将路径或路径片段的序列解析为绝对路径
                "@a":path.resolve(__dirname,'./src/assets'),
                "@p":path.resolve(__dirname,'./public'),
                vue$:"vue/dist/vue.esm.js"
            },
            //配置后缀名，引入文件时不写后缀名，默认加载文件类型
            extensions:['.js','.json','.vue'],
        }
    },
    // https://www.jianshu.com/p/5ef2b17f9b25
    // 代理 //在vue-cli3.0 里面的 vue.config.js做配置
    //设置vue静态服务器代理。使用的是 http-proxy-middleware 这个模块（这个模块相当于是node.js的一个插件）。
    devServer:{
        // port:8010,//修改为8010，不存在跨域
        port:8080,
        open:true,//启动项目会自动打开此浏览器
        // logLevel:'debug',//打印代理日志
        proxy:{
        //配代理请求
        // http://localhost:8010/api/getSms
        // http://www.web-jshtml.cn/productapi/api/getSms//替换为：
        // http://www.web-jshtml.cn/productapi/getSms
            '/api':{
                target:'http://www.web-jshtml.cn/productapi/',//目标接口
                changeOrigin:true, //生成一个localhost:8010域名下的一个node服务器，帮你做代理
                //重写url，去掉url以/api开头的为：http://www.web-jshtml.cn/productapi/getSms
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}