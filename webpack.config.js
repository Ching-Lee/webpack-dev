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
    path: path.resolve(__dirname, 'dist')
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
  	filename:'style.css'
   })
  ],

// 通过此模块，能够将在insex.js中import的所有.css结尾的文件，
// 打包到html中的head标签里面
 module: {
  rules: [
	 {
		test: /\.css$/,
		use: [
		// 'style-loader',
		MiniCssExtractPlugin.loader,
		'css-loader',
		'postcss-loader',
		]
	 }
	]
 },

  //mode默认有两种 开发模式：development(方便开发时看)  生产模式：production(默认)
  mode:'production'  
};