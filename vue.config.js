//path  common.js
const cons = require("consolidate")
const path=require("path")
console.log('项目的绝对路径',__dirname)//C:\Users\小南瓜`\Desktop\vue-element
console.log('项目中某个目录的绝对路径',path.resolve(__dirname,'./src/components'))//C:\Users\小南瓜`\Desktop\vue-element\src\components

module.exports  = {
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
                "@c":path.resolve(__dirname,'./src/components'), //path.resolve() 方法会将路径或路径片段的序列解析为绝对路径
                "@a":path.resolve(__dirname,'./src/assets'),
                "@p":path.resolve(__dirname,'./public'),
                vue$:"vue/dist/vue.esm.js"
            },
            //配置后缀名，引入文件时不写后缀名，默认加载文件类型
            extensions:['.js','.json','.vue'],
        }
    },
    //代理
    
}