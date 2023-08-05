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

###  4、获取高评分数据及其展示

> 1、抽取高评分和高性价比数据
>
> 

### 5、获取顶部导航栏数据及布局

> 1、房源列表数据展示优化，每个区域的数据一行展示个数可以动态设置

### 6、地区tabs 分装

> 1、展示tab name数据
>
> 2、点击name时交互设计
>
> 3、点击name时切换数据
>
> 4、根据name获取对应的列表数据
>
> 5、封装主组件时不要把子组件的逻辑写到父组件
>
> 6、第一次渲染时自动展示第一个地区的数据
>
> ​	1、在父组件中判断对应数据是否有有值（useState只能在第一次渲染时初始化数据，其他情况必须使用setState）
>
> ​	2、使用useEffect()监听数据的变化（缺陷时会渲染多次组件，很浪费性能。不推荐使用）
>
> 父组件传入到子组件中的函数尽量使用useCallback进行优化处理

### 7、展示热门推荐数据展示（复用6的组件）

### 8、封装列表底部的按钮

> 1、没有地区tabs时底部展示“查看全部”
>
> 2、有地区tabs时根据tabs的那么展示对应的文案
>
> 3、根据name是否存在展示对应的文案

### 9、封装tabs的水平滚动效果

> 1、计算右边按钮的显示
>
> ​	1、利用滚动内容宽度和元素宽度计算
>
> 2、点击右边按钮移动tabs中的元素
>
> ​	1、右边按钮在右边元素没有可滚动时需要隐藏，
>
> ​			a、记录滚动宽度减去内容宽度的差值（D）
>
> ​			b、记录右边已经滚动的值 (V)
>
> ​			c、如果V > D 那么右边按钮就应该隐藏，因为右边没有可滚动元素了。反之可滚动
>
> 3、当左边有可滚动元素时，显示左边按钮。
>
> > 同上

### 10、展示推荐地区列表

> 同9

### 11、展示Plus房源列表

> 水平滚动同9

## 三、房间列表页面开发

### 1、获取列表数据及其total

> 展示热门推荐数据展示（复用二中第6点的组件）

### 2、enrire页面的loading效果

> 利用reduce来控值loading变量

### 3、实现轮播图

### 4、实现轮播图的指示器

> 当前的点击的按钮显示在中间（(but.offsetLeft + but.width*0.5) - 容器.width*0.5）= diff
>
> 特殊情况处理
>
> ​	左边 
>
> ​			当 diff < 0时 则左边按钮的移动位置始终是0，这确保了指示器第一个不会向右边偏移
>
>   右边
>
> ​			当diff > but.scrollWidth - 容器宽度时，右边指示器的偏移量始终等于 **but.scrollWidth - 容器宽度**，确保右边指示器不会向左边偏移

### 四、Detail页面开发

> 

