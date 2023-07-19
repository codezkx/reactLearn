# airbnb项目

## 1、项目配置

### creco配置webpack

> 使用creco配置webpack时需要修改package.json中的scripts
>
> ````json
>  "scripts": {
>     "start": "react-scripts start",
>     "build": "react-scripts build",
>     "test": "react-scripts test",
>     "eject": "react-scripts eject"
>   },
> // 修改后（必须使用craco启动项目不然在配置文件中的配置不生效）
>  "scripts": {
>     "start": "craco start",
>     "build": "craco build",
>     "test": "cracos test",
>     "eject": "react-scripts eject"
>   },
> ````
>
> 配置creco.config.js
>
> ````js
> const path = require('path');
> const CracoLessPlugin = require('craco-less');
> 
> const resolve = pathname => path.resolve(__dirname, pathname);
> 
> module.exports = {
> 	// less
>     plugins: [
>         {
>             plugins: CracoLessPlugin,
>         },
>     ],
>     // 配置路径别名
>     webpack: {
>         alias: {
>             "@": resolve("src"),
>             "components": resolve("src/components"),
>             "utils": resolve("src/utils"),
>         },
>     },
> };
> 
> ````
>
> 

## 二、组件开发

### 1、header组件开发

> 1、使用styled-components进行样式编写
>
> 2、header组件布局
>
> ​	布局分成三部分
>
> ​		left（flex:1）、center（内容撑开）、right（flex:1）
>
> ​		上面的部分可以确保center水平居中
>
> ​	
>
> 3、因为三个布局项目中引用较多，所以把上面的三部分写成通用组件
>
> 

1、left组件开发

> logo开发
>
> ​	1、svg组件分装及问题解决
>
> ​	2、项目主题注入  使用styled-components 的 ThemeProvider组件向全局注入公共样式参数
>
> 

2、right组件开发

> 1、引用svg图标
>
> 2、布局及hover动画及样式混入
>
> 3、弹出框布局及逻辑（监听window点击事件 --> 关闭弹框）
>
> ​	注意: 弹框点击时要注意冒泡事件 ；
>
> ​			解决方案：
>
> ​					1、阻止点击事件冒泡
>
> ​					2、使用捕获过程

3、center组件开发

> 1、引用svg图标及布局

### 2、mian部分

1、home组件编写

> 1、图片引入 
>
> ```
> // 图片引入
> 
> 1、第一种方式使用import导入
> import img from '路径';
> 2、第二种方式
> background: url(require("路由").default);  //  webpack低版本是不需要default
> ```
>
> 2、使用react-redux获取home数据
>
> 3、分装区域header
>
> 4、items区域布局及展示

### 3、集成第三方UI库





















> 