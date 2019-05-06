import './index.css'

// 在js中打包时需要import图片进来
// import logo from './logo.png'

// 用于测试ES6语法的转换
let fn=()=>{
	// eslint语法检验时会检验不能console
	//console.log('log');
}
fn();

// 装饰器测试
//@log
// 用于测试ES7中class语法的转换
class T{
	a=1;
}
let t=new T();
t.a=5;
console.log(t.a);

console.log('aaa'.includes('a'));

// 打包图片
// 1.在js中创建图片并引用
// file-loader默认会在内部生成一张图片到build目录下，并且把生成的图片名字返回回来
// let image=new Image();
// console.log(logo);
// image.src=logo;
// document.body.appendChild(image);