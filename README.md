@[TOC](webpack4+加vue2+从零开始搭设vue项目)

本地环境
> node -v    // v9.1.0
npm -v  // 6.5.0
webpack -v   // 4.32.2
webpack-cli -v // 3.3.2

*这里需要注意的是webpack4+以后需要单独安装webpack-cli*
### 起步
#### 1.初始化项目
```
npm init
```
一直enter生成package.json文件（小技巧:npm init -y 可以免去繁琐的enter）
#### 2.安装依赖
```
npm i webpack webpack-cli webpack-dev-server --save-dev
```
> 想要深入上述依赖请转[webpack文档](https://webpack.js.org/configuration)

依赖安装成功接下来就开始动手吧
#### 3.目录文件配置
根目录鼠标右键新建index.html    webpack.config.js  src文件夹或：
```
// window
type >webpcak.config.js
type >index.html
md src

//mac 土豪玩家
touch webpcak.config.js
touch index.html
mkdir src
```

src目录下面新建 main.js

此时目录如下
```
project/
        src/
            main.js
        webpack.config.js
        index.html
        package.json

```
内容如下：
```javascript
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>webpack从零搭设</title>
</head>
<body>
<div id="app"></div>
</body>
</html>

```
```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
modul.exports = {}
```
#### 4.配置index.html及webpack.config.js
首先
main.js修改如下:
```javascript
// src/main.js
console.log('hello world');
```
webpack.config.js修改如下:

```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {  // module.exports commonjs规范
  entry: './src/main.js', // 项目入口文件，webpack将从main.js开始，把所有依赖的js都打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包后的输出路径 可修改
    publicPath: '/dist/', // 通过devServer访问路径 可修改
    filename: 'build.js' // 打包后的文件名 可修改
  },
  devServer: {
    historyApiFallback: true, // When using the HTML5 History API, the `index.html` page will likely have to be served in place of any `404` responses
    overlay: true //Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors
  },
};

```
index.html 修改如下 *增加引入打包后的js*
```javascript
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>webpack从零搭设</title>
</head>
<body>
<div id="app"></div>
</body>
<script src="/dist/build.js"></script>
</html>

```
package.json修改如下：
```json
"scripts": {
    "dev": "webpack-dev-server --open --hot",
    "build": "webpack --progress --hide-modules"
  },
```
> webpack-dev-server会启动一个静态资源web服务器 --hot参数表示启动热更新

重新启动服务
```
npm run dev
```
打开控制台可以看到 有输出hello world
![控制台输出hello world](https://upload-images.jianshu.io/upload_images/11447772-436a3617acf0b57a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 5.vue的起步
安装vue
```javascript
npm install vue --save
```
修改main.js如下
```
// src/main.js
import Vue from 'vue';
// import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build

// console.log('hello world');

var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  }
})

```
此时 修改index.html如下:
```JavaScript
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>webpack从零搭设</title>
</head>
<body>
<div id="app">
	{{ mess }}
</div>
</body>
<script src="/dist/build.js"></script>
</html>

```
重新启动服务
```JavaScript
npm run build
npm run dev
```
此时
![控制台报错，页面也未显示hello Vue！](https://upload-images.jianshu.io/upload_images/11447772-d32d4812803e8fc7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

查阅资料发现:
**vue有两种形式的代码 compiler（模板）模式和runtime模式（运行）
vue模块的package.json的main字段默认为runtime模式， 指向"dist/vue.runtime.common.js"位置。这是vue升级到2.0之后就有的特点。**

但此时我们main.js的写法是
```
// src/main.js
import Vue from 'vue';
// import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build

// console.log('hello world');

var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  }
})

```
##### 解决方案 一

```
// src/main.js
//import Vue from 'vue';
 import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build

// console.log('hello world');

var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  }
})

```
因为vue2.0默认的是runtime模式，需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript代码；
##### 解决方案 二(常规操作)

```
// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {  //module.exports commonjs规范
  entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/dist/', // 通过devServer访问路径
    filename: 'build.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  resolve: { // 修改别名，import Vue from ‘vue’ 这行代码被解析为 import Vue from ‘vue/dist/vue.esm.js
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
};

```
> 这个修改和上次是一样的意思，不过相对雅观很多...

#### 解决方案 三
修改main.js的模式
1. compiler 模式
```javascript
// src/main.js
// compiler 模式
new Vue({
  el: '#app',
})
```
2.runtime 模式
```
//runtime模式
new Vue({
render: h => h(App)  // App.vue
}).$mount("#app")
```
将1换成2，但我们推荐使用方案二；

最后 页面展示如下:
![hello Vue@2.0](https://upload-images.jianshu.io/upload_images/11447772-4470400cac4db5f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 引入css和scss

> **webpack默认支持的是js的模块化，如果需要其他类型文件也支持模块化开发，则需要引入相应的loader用以解析!**

安装相关依赖
```javascript
npm i node-sass css-loader vue-style-loader sass-loader --save-dev
```
 webpack.config.js 修改如下
```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {  //module.exports commonjs规范
  entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/dist/', // 通过devServer访问路径
    filename: 'build.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'vue-style-loader',
           'css-loader'
         ],
       },
       { // scss
         test: /\.scss$/,
         use: [
           'vue-style-loader',
           'css-loader',
           'sass-loader'
         ],
       }
     ]
   }
};

```
此时scss 及 css都能在开发中使用并且模块化引入了

### 语法转译 ES6 => ES5
引入相关依赖 利用bable转译
```javascript
npm i babel-core babel-loader babel-preset-env babel-preset-stage-3 --save-dev
```
**其中  babel-preset-stage是不同阶段语法提案的转码规则（共有4个阶段），选装一个,其中0最厉害**
> npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3
```
// .babelrc
{
  "presets": [
    ["env", { "modules": false }],
    "stage-3"
  ]
}

```
同时修改 webpack.config.js
```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {  //module.exports commonjs规范
  entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/dist/', // 通过devServer访问路径
    filename: 'build.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'vue-style-loader',
           'css-loader'
         ],
       },
       { // scss
         test: /\.scss$/,
         use: [
           'vue-style-loader',
           'css-loader',
           'sass-loader'
         ],
       },
       { // 添加解析js的loader
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
       }
     ]
   }
};

```
此时我们修改main.js尝试使用es6语法
```javascript
// src/main.js
import Vue from 'vue';
// import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build


// console.log('hello world');

const say = function () {
  return new Promise((resolve, reject) => {
    resolve('I am es6');
  })
}


var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  },
  methods: {
    updateData() {
      say().then((res)=>{
        this.mess = res;
      });
    },

  },
  created() {
    this.updateData();
  }
})

```
此时页面输出效果如下
![I am es6](https://upload-images.jianshu.io/upload_images/11447772-b3232207a960b915.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
虽然满足我们使用了，那么接下来我们尝试一下ES7支持与否
main.js修改如下:
```JavaScript
import Vue from 'vue';
// import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build


// console.log('hello world');

const say = function () {
  return new Promise((resolve, reject) => {
    resolve('I am es7');
  })
}


var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  },
  methods: {
    /*updateData() {
      say().then((res)=>{
        this.mess = res;
      });
    },*/
    async updateData() {
      const mess = await say();
      this.mess = mess;
    }
  },
  created() {
    this.updateData();
  }
})

```
页面展示如下:
![ES7测试](https://upload-images.jianshu.io/upload_images/11447772-b1ef12f2c2f7effb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时看到控制台报错
> "ReferenceError: regeneratorRuntime is not defined"

查阅相关文章发现， 要想对es7语法进行支持，还需要安装相关依赖进行转译；
##### 这里有两种方案
##### 方案一
```javascript
npm i --save-dev babel-plugin-transform-runtime
```
修改.babelrc文件
```
// .babelrc
{
	"presets": [
		["env", { "modules": false }],
		"stage-3"
	],
	"plugins": [[  //  参考 https://www.jianshu.com/p/7a7f7abcddb5
		"transform-runtime",
		{
			"helpers": false,
			"polyfill": false,
			"regenerator": true,
			"moduleName": "babel-runtime"
		}
	]]
}
```
这里顺带解释一下preset与babel的关系:
* preset中已经包含了一组用来转换ES6+的语法的插件,如果只使用少数新特性而非大多数新特性,可以不使用preset而只使用对应的转换插件
* babel默认只转换语法,而不转换新的API,如需使用新的API,还需要使用对应的转换插件或者polyfill
> 例如，默认情况下babel可以将箭头函数，class等语法转换为ES5兼容的形式，但是却不能转换Map，Set，Promise等新的全局对象，这时候就需要使用polyfill去模拟这些新特性

此时看到页面输出正常:
![ES7正常](https://upload-images.jianshu.io/upload_images/11447772-0bd3c3d1769d22ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 方案二
全局babel-polyfill
```
npm i babel-polyfill --save-dev
```
 webpack.config.js修改如下 **注意看注释**
```JavaScript
// webpack.config.js
  // entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  entry: ['babel-polyfill', './src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包 参考 https://www.jianshu.com/p/3b27dfc6785c
```
此时重新跑项目npm run dev 结果方案一

>es6与es7转译部分参考文章
[babel-polyfill的几种使用方式
](https://www.jianshu.com/p/3b27dfc6785c)[babel的使用](https://www.jianshu.com/p/7a7f7abcddb5)

### 文章最后
> 缺啥补啥,项目完整地址查看@安静Eno[webpack4.0+vue2.0从零开始](https://github.com/wLove-c/webpack4-vue2)
