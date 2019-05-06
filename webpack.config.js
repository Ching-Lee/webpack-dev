const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const OptimizeCss=require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
 devServer:{ //开发服务器的配置
    port:3000, //端口号
  },

 // 优化项，包括js压缩，css压缩
 optimization:{
   minimizer:[
   new UglifyJsPlugin({
    cache:true,
    parallel:true,
    sourceMap:true
  }),
   new  OptimizeCss() 
   ]
 },


 entry: './src/index.js', //入口文件
 output: {
    filename: 'bundle.js',// 出口文件
    path: path.resolve(__dirname, 'dist'),
    //打包完之后发布到cdn上，所有资源根目录都是它
    //publicPath:'http://ww.123.cn'
  },


  // 数组 放着所欲的Webpack插件
  plugins:[
  // 将html打包到dist/html
  new HtmlWebpackPlugin({
  		template:'./src/index.html',// 源文件
  		filename:'index.html', // 生成文件
  		minify:{
  			removeAttributeQuotes:true, //取消标点
  			collapseWhitespace:true, //取消空格
  		},
  		hash:true
  	}),
  // 将css抽象到dist/css
  new MiniCssExtractPlugin({
  	filename:'css/style.css'
  })
  ],

// 通过此模块，能够将在insex.js中import的所有.css结尾的文件，
// 打包到html中的head标签里面
module: {
  rules: [ //loader默认是从右向左，从下到上执行。
  //用户处理js语法校验
  {
    test:/\.js$/,
    use:{
      loader:'eslint-loader',
      options:{
        enforce:'pre' //previous post
      }
    }
  },

  // 用于转换es6语法
  {
    test:/\.js$/,
    use:{
      loader:'babel-loader',
      options:{
        presets:[
        '@babel/preset-env'
        ],
        // 支持ES7装饰器，class语法
        plugins:[
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        "@babel/plugin-transform-runtime"
        ]
      }
    },
    include:path.resolve(__dirname,'src'),
    exclude:/node_modules/
  },
  // css相关规则
  {
    test: /\.css$/,
    use: [
    // 用于将生成的css以内联的方式插入到html
		// 'style-loader',
		MiniCssExtractPlugin.loader,
    // 用于打包生成css
    'css-loader',
    // 用于为css中的内容添加前缀
    'postcss-loader',
    ]
  },
  // 图片相关规则
   {
    test:/\.(png|jpg|gif)$/,
    //use:'file-loader'
    // 做一个限制，当图片小于多少时，使用base64来转化，
    // 否则使用file-loader产生真实图片
    use:{
      loader:'url-loader',
      options:{
        //limit:200*1024,
        limit:1,
        outputPath:'/img/',
        // 也可以根据情况单独添加
        publicPath:'http://ww.123.cn'
      }
    }
   },
   // 在html中能使用图片
   {
    test:/\.html$/,
    use:'html-withimg-loader'
   }
  ]
},

  //mode默认有两种 开发模式：development(方便开发时看)  生产模式：production(默认)
  mode:'production'  
};