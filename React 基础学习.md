# 描述UI

## 一、初见React

### 1、第一个组件  

>  ````//package  配置{"name": "day02","version": "1.0.0","description": "","main": "index.js","scripts": {  "start": "react-scripts start",  "build": "react-scripts build",  "test": "react-scripts test",  "eject": "react-scripts eject"},"author": "","license": "ISC","dependencies": {  "react": "^18.2.0",  "react-dom": "^18.2.0",  "react-scripts": "^5.0.1"}}
>
>  ​````js
>  // App.js
>  function Profile() {
>     // JSX 语法
>    return (
>      <img
>        src="https://i.imgur.com/MK3eW3As.jpg"
>        alt="Katherine Johnson"
>      />
>    );
>  }
>  
>  export default function Gallery() {
>    return (
>        // 使用多个标签时需要用一个父元素包裹，其子组件或则子元素 
>      <section>
>        <h1>人类的先驱</h1>
>        <Profile /> 
>        <Profile />
>        <Profile />
>      </section>
>    );
>  }
>  
>  // index.js
>  import React, { StrictMode } from "react";
>  import { createRoot } from 'react-dom/client';
>  
>  import App from './App.js';
>  
>  const root = createRoot(document.getElementById('root'));
>  root.render(
>    <StrictMode> // 严格模式
>      <App />
>    </StrictMode>
>  );
>  ````
>
>  ````html
>  index.html
>  <!DOCTYPE html>
>  <html lang="en">
>    <head>
>      <meta charset="UTF-8">
>      <meta name="viewport" content="width=device-width, initial-scale=1.0">
>      <title>Document</title>
>    </head>
>    <body>
>      <div id="root"></div>
>    </body>
>  </html>
>  ````

## 二、JSX标签

> [JSX and React 是相互独立的](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) 东西。但它们经常一起使用，但你 *可以* 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。 

>本节学习
>
>- 为什么 React 将标签和渲染逻辑耦合在一起
>- JSX 与 HTML 有什么区别
>- 如何通过 JSX 展示信息

### 1、将 HTML 转化为 JSX

> **HTML 文件中**
>
> ````html
> 
> <h1>海蒂·拉玛的代办事项</h1>
> <img 
>   src="https://i.imgur.com/yXOvdOSs.jpg" 
>   alt="Hedy Lamarr" 
>   class="photo"
> />
> <ul>
>     <li>发明一种新式交通信号灯</li>
>     <li>排练一个电影场景</li>
>     <li>改进频谱技术</li>
> </ul>
> ````
>
> JS 文件中
>
> ````js
> export default function TodoList() {
>   return (
>     <>
>       <h1>海蒂·拉玛的代办事项</h1>
>       <img 
>         src="https://i.imgur.com/yXOvdOSs.jpg" 
>         alt="Hedy Lamarr" 
>         class="photo"
>       />
>       <ul>
>         <li>发明一种新式交通信号灯</li>
>         <li>排练一个电影场景</li>
>         <li>改进频谱技术</li>
>       </ul>
>     </>
>   )
> } 
> ````

### 2、JSX规则

>#### 1、只能返回一个根元素
>
>> 如果想要在一个组件中包含多个元素，**需要用一个父标签把它们包裹起来**。
>
>````react
><div>
>  <h1>海蒂·拉玛的代办事项</h1>
>  <img 
>    src="https://i.imgur.com/yXOvdOSs.jpg" 
>    alt="Hedy Lamarr" 
>    class="photo"
>  >
>  <ul>
>    ...
>  </ul>
></div>
>````
>
>> 如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替： 
>
>````react
><>
>  <h1>海蒂·拉玛的代办事项</h1>
>  <img 
>    src="https://i.imgur.com/yXOvdOSs.jpg" 
>    alt="Hedy Lamarr" 
>    class="photo"
>  >
>  <ul>
>    ...
>  </ul>
></>
>// 这个空标签被称作 Fragment. React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。
>````
>
>> #### 为什么多个 JSX 标签需要被一个父元素包裹？ 
>>
>> JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。 
>
>#### 2、标签必须闭合
>
>> JSX 要求标签必须正确闭合。像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`。 
>
>````js
><>
>  <img 
>    src="https://i.imgur.com/yXOvdOSs.jpg" 
>    alt="Hedy Lamarr" 
>    class="photo"
>   />
>  <ul>
>      <li>发明一种新式交通信号灯</li>
>      <li>排练一个电影场景</li>
>      <li>改进频谱技术</li>
>  </ul>
></>
>````
>
>#### 3、使用驼峰式命名法给大部分属性命名！
>
>> 在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 `-` 符号或者像 `class` 这样的保留字。 
>>
>> 大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 `strokeWidth` 代替 `stroke-width`。由于 **`class`** 是一个保留字，所以在 React 中需要用 **`className`** 来代替。
>>
>> <img 
>>
>>   src="https://i.imgur.com/yXOvdOSs.jpg" 	
>>
>>   alt="Hedy Lamarr" 
>>
>>   className="photo"
>>
>> />
>
>#### 4、高级提示：使用JSX转化器
>
>> 将现有的 HMTL 中的所有属性转化 JSX 的格式是很繁琐的。我们建议使用 [转化器](https://transform.tools/html-to-jsx) 将 HTML 和 SVG 标签转化为 JSX。这种转化器在实践中非常有用。但我们依然有必要去了解这种转化过程中发生了什么，这样你就可以编写自己的 JSX 了。 
>>
>> ````react
>> export default function TodoList() {
>>   return (
>>     <>
>>       <h1>海蒂·拉玛的代办事项</h1>
>>       <img 
>>         src="https://i.imgur.com/yXOvdOSs.jpg" 
>>         alt="Hedy Lamarr" 
>>         className="photo" 
>>       />
>>       <ul>
>>         <li>发明一种新式交通信号灯</li>
>>         <li>排练一个电影场景</li>
>>         <li>改进频谱技术</li>
>>       </ul>
>>     </>
>>   );
>> }
>> ````
>
>#### 5、结语
>
>> 现在你知道了为什么我们需要 JSX 以及如何在组件中使用它：
>>
>> - 由于渲染逻辑和标签是紧密相关的，所以 React 将它们存放在一个组件中。
>> - JSX 类似 HTML，不过有一些区别。如果需要的话可以使用 [转化器](https://transform.tools/html-to-jsx) 将 HTML 转化为 JSX。
>> - 错误提示通常会指引你将标签修改为正确的格式。

## 三、JSX中通过{}使用JS

> 1、JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起 。
>
> 2、可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript 

>**本节学习主要内容**
>
>- **如何使用引号传递字符串**
>- **在 JSX 的大括号内引用 JavaScript 变量**
>- **在 JSX 的大括号内调用 JavaScript 函数**
>- **在 JSX 的大括号内使用 JavaScript 对象**

### 1、引号传递字符串

> 如果要把一个字符串传递给JSX时，可以使用单引号和双引号。
>
> ````js
> export default function Avatar() {
>   return (
>     <img
>       className="avatar"
>       src="https://i.imgur.com/7vQD0fPs.jpg"
>       alt="Gregorio Y. Zara"
>     />
>   );
> }
> ````
>
> `"https://i.imgur.com/7vQD0fPs.jpg"` 和 `"Gregorio Y. Zara"` 就是被作为字符串传递的。 

### 2、{}使用动态变量

> **如果想要动态指定属性或则变量时，可以使用{}代替字符串**
>
> ````js
> export default function Avatar() {
>   const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
>   const description = 'Gregorio Y. Zara';
>   return (
>     <img
>       className="avatar"
>       src={avatar}
>       alt={description}
>     />
>   );
> }
> ````
>
> **注意 ： JSX中使用的是JS语法，所以js的一些关键字和语法都可以在JSX中使用。**

### 3、{} 展示文本

> **JSX 是一种编写 JavaScript 的特殊方式。这为在大括号 `{ }` 中使用 JavaScript 带来了可能** 
>
> ````js
> export default function TodoList() {
>   const name = 'Gregorio Y. Zara';
>   return (
>     <h1>{name}'s To Do List</h1>
>   );
> }
> ````
>
> 注意： 花括号中不仅可以使用变量还可以是函数

### 4、{{}}括号：JSX中CSS和对象

>可能在 JSX 的内联 CSS 样式中就已经见过这种写法了。React 不要求你使用内联样式（使用 CSS 类就能满足大部分情况）。但是当你需要内联样式的时候，你可以给 `style` 属性传递一个对象 
>
>````js
>export default function TodoList() {
>  return (
>    <ul style={{
>      backgroundColor: 'black',
>      color: 'pink'
>    }}>
>      <li>Improve the videophone</li>
>      <li>Prepare aeronautics lectures</li>
>      <li>Work on the alcohol-fuelled engine</li>
>    </ul>
>  );
>}
>// 双花括号中使用变量,es6语法依然可用。
>export default function Person() {
>  const bc = '#222';
>  const color = 'red';
>  return (
>    <ul
>      style={{ 
>        backgroundColor: bc,
>        color,
>    }}>
>      <li>the videophone</li>
>      <li>Prepare aeronautics lectures</li>
>      <li>Work on the alcohol-fuelled engine</li>
>    </ul>
>  )
>}
>
>````
>
>**！！！注意： 内联 `style` 属性 使用驼峰命名法编写。例如，HTML `<ul style="background-color: black">` 在你的组件里应该写成 `<ul style={{ backgroundColor: 'black' }}>`。** 
>
>#### 使用规则
>
>````js
>function useClick(data) {
>  console.log(data)
>}
>export default function Person() {
>  const bc = '#222';
>  const color = 'red';
>  return (
>    <ul style={{ 
>        backgroundColor: bc,
>        color,
>      }}
>      className={['person']}
>      onClick={useClick({person: '张三'})}>
>      <li>the videophone</li>
>      <li>Prepare aeronautics lectures</li>
>      <li>Work on the alcohol-fuelled engine</li>
>    </ul>
>  )
>}
>
>// 1、style 可以使用双花括号 表达对象。但是数组不行。
>// 2、className 可以在花括号中数据属性格式， 但是对象不行。
>// 3、事件处理程序不能在JSX中直接调用不然，事件处理程序会变成函数，只调用一次（其实两次： 一次是	用户调用，一次是react调用）
>// 4、对象写法中value是可以是用变量的，而key是不能使用变量的
>// 5、文本节点不能使用对象写法数组亦然。
>
>````
>
>### JavaScript 对象和大括号的更多可能 
>
>> 你可以将多个表达式合并到一个对象中，在 JSX 的大括号内分别使用它们： 
>>
>> ````js
>> function useClick(data) {
>>   console.log(data)
>> }
>> export default function Person() {
>>   const bc = '#222';
>>   const color = 'red';
>>   return (
>>     <ul style={{ 
>>         backgroundColor: bc,
>>         color,
>>       }}
>>       className={['person']}
>>       onClick={useClick({person: '张三'})}>
>>       <li>the videophone</li>
>>       <li>Prepare aeronautics lectures</li>
>>       <li>Work on the alcohol-fuelled engine</li>
>>     </ul>
>>   )
>> }
>> ````
>>
>> > **JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。** 

### 总结

>### 可以在哪使用大括号 
>
>在 JSX 中，只能在以下两种场景中使用大括号：
>
>1. 用作 JSX 标签内的**文本**：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
>2. 用作紧跟在 `=` 符号后的 **属性**：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。
>
>### **现在你几乎了解了有关 JSX 的一切：**
>
>- JSX 引号内的值会作为字符串传递给属性。
>- 大括号让你可以将 JavaScript 的逻辑和变量带入到标签中。
>- 它们会在 JSX 标签中的内容区域或紧随属性的 `=` 后起作用。
>- `{{` 和 `}}` 并不是什么特殊的语法：它只是包在 JSX 大括号内的 JavaScript 对象。

## 四、Props传递给组件

> React 组件使用 **props**来互相通信。每个**父组件**都可以提供 **props** 给它的**子组件**，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们**传递**任何 JavaScript 值，**包括对象、数组和函数。** 
>
> ### 你将会学习到
>
> - 如何向组件传递 props
> - 如何从组件读取 props
> - 如何为 props 指定默认值
> - 如何给组件传递 JSX
> - Props 如何随时间变化

### 1、向组件传递Props

> Props 是你传递给 JSX 标签的信息。例如，`className`、`src`、`alt`、`width` 和 `height` 便是一些可以传递给 `<img>` 的 props 
>
> #### 通过在 `function Avatar` 之后直接列出它们的名字 `person, size` 来读取这些 props。这些 props 在 `({` 和 `})` 之间，并由逗号分隔。这样，你可以在 `Avatar` 的代码中使用它们，就像使用变量一样。 

###  1、将 props 传递给子组件

> ````js
> export default function Profile() {
>   return (
>     <Avatar 
>       person={{name: 'Lin Lanying', imageId: '1bX5QH6'}}
>       size={100}
>     />
>   )
> }
> 
> ````

### 2、 在子组件中读取 props

> ````js
> // 接收props 可以用一个形参或则使用es6结构语法{person, size}
> export default function Avatar(props) {
>   console.log(props, 'props')
>   return (
>     <img
>       className="avatar"
>       src={getImageUrl(props.person)}
>       alt={props.person.name}
>       width={props.size}
>       height={props.size}
>     />
>   )
> }
> 
> export function getImageUrl(person, size = 's') {
>   return (
>     'https://i.imgur.com/' +
>     person.imageId +
>     size +
>     '.jpg'
>   );
> }
> ````

### 3、prop 指定一个默认值

> ````js
> function Avatar({ person, size = 100 }) {
>   // ...
> }
> ````
>
> **注意:**默认值仅在缺少 `size` prop 或 `size={undefined}` 时生效。 但是如果你传递了 `size={null}` 或 `size={0}`，默认值将 **不** 被使用。 

### 4、JSX 展开语法传递 props

> ````js
> function Profile({ person, size, isSepia, thickBorder }) {
>   return (
>     <div className="card">
>       <Avatar
>         person={person}
>         size={size}
>         isSepia={isSepia}
>         thickBorder={thickBorder}
>       />
>     </div>
>   );
> }
> // 如果父组件的props 需要全部传入子组件那么可以使用ES6展开语法
> function Profile(props) {
>   return (
>     <div className="card">
>       <Avatar {...props} />
>     </div>
>   );
> }
> ````
>
> **注意: 请克制地使用展开语法。 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！**
>
> 

### 5、将 JSX 作为子组件传递

> > **当您将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收到该内容。** 
> >
> > ````js
> > export default function Profile() {
> >   return (
> >     <Card size="500">
> >       <h1>I am the acatar </h1>
> >       <Avatar
> >         size={100}
> >         person={{ 
> >           name: 'Katsuko Saruhashi', 
> >           imageId: 'YfeOqp2'
> >         }}
> >       />
> >     </Card>
> >   )
> > }
> > 
> > //  children 表示Card组件中嵌套的子组件或则元素的实例, 如果接收的是一个props那么props有一个children属性
> > export default function Card({children, size}) {
> >   console.log(children)
> >   return (
> >     <>
> >       <h1>{size}</h1>
> >       <div className="card">
> >         {children}
> >       </div>
> >     </>
> >   );
> > }
> > ````

### 6、Props 如何随时间变化 

> props 是 [不可变的](https://en.wikipedia.org/wiki/Immutable_object)。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递 *不同的 props* —— 一个新对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。
>
> **不要尝试“更改 props”。** 当你需要响应用户输入（例如更改所选颜色）时，你可以“设置 state”，你可以在 [State: 一个组件的内存](https://zh-hans.reactjs.org/learn/state-a-components-memory) 中继续了解。 
>
> ````js
> /*
> 	rops 如何随时间变化 的方式
> 		1、函数方式   需要使用import { useState } from 'react';
> 			语法 const [index, setIndex] = useState(0);
> 			更改index  => setIndex(0)
> 		2、对象方式   需要继承 import { PureComponent} from 'react'; class App extends PureComponent
> 			使用 state 内置属性 设置时需要使用setState方法
> 			this.state = { color: '', time: 0 };
> 			this.setState({
> 			   color： 'red',
>                 time: Date.now()
>               })
>               或则
>               this.setState(state => {
>               // state => { color: '', time: 0}
>               	return {
>                    color： 'red',
>                     time: Date.now()
>                   })
>               })
> 			
> */
> 
> ````
>
> > 具体可以查看 day06_JSX Props 的代码展示

## 五、条件渲染

> 通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。 
>
> ### 你将会学习到
>
> - 如何根据不同条件返回不同的 JSX
> - 如何根据不同条件包含或者去掉部分 JSX
> - 一些你会在 React 代码库里遇到的常用的条件语法快捷表达式

### 1、选择性地返回 `null` 

> 如果某些组件在特定条件下不需要渲染时可以返回null。（推荐写法是直接在父组件中判断子组件是否该渲染）
>
> ````js
> export default function Commodity({isPacked, name}) {
>   if (isPacked) {
> 	return null
>   } else {
>   	return (<p>{name}</p>)
>   }
> }
> 
> 
> // 渲染列表
> const commodityList = [
>   {
>     name: '宇航服',
>     isPacked: false,
>   },
>   {
>     name: '带金箔的头盔',
>     isPacked: false,
>   },
>   {
>     name: 'Tam 的照片',
>     isPacked: false,
>   },
> ];
> export default function PackingList() {
>   const CommodityItems = commodityList.map((item, index) => 
> 	// 如果Commodity 不需要渲染时 直接if 过滤掉                                          
>     <Commodity
>       key={index}
>       isPacked={item.isPacked}
>       name={item.name}
>     />
>   )
>   return (
>     <section>
>       { CommodityItems }
>     </section>
>   );
> }
> ````
>
> 

### 2、选择性地包含 JSX 

>组件内部控制哪些 JSX 树（如果有的话！）会返回。你可能已经发现了在渲染输出里会有一些重复的内容 
>
>````js
>if (isPacked) {
>  return <li className="item">{name} ✔</li>;
>}
>return <li className="item">{name}</li>;
>````
>
>虽然这些重复的内容没什么害处，但这样可能会导致你的代码更难维护。比如你想更改 `className`？你就需要修改两个地方！针对这种情况，你可以通过选择性地包含一小段 JSX 来让你的代码更加 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't repeat yourself)

### 3、三目运算符（`? :`）

> JavaScript 有一种紧凑型语法来实现条件判断表达式——[条件运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 又称“三目运算符”。 
>
> ````js
> // if 写法
> if (isPacked) {
>   return <li className="item">{name} ✔</li>;
> }
> return <li className="item">{name}</li>;
> // 三元运算符
> return (
>   <li className="item">
>     {isPacked ? name + ' ✔' : name}
>   </li>
> );
> ````
>
> **注意**：但 JSX 元素不是“实例”，因为它们没有内部状态也不是真是的 DOM 节点。它们只是一些简单的描述，就像图纸一样。所以上面这两个例子事实上是完全相同的。在 [状态的保持和重置](https://zh-hans.reactjs.org/learn/preserving-and-resetting-state) 里会深入探讨其原因 

### 4、与运算符（`&&`） 

> 在 React 组件里，通常用在当条件成立时，你想渲染一些 JSX，**或者不做任何渲染**。使用 `&&`，你也可以实现仅当 `isPacked` 为 `true` 时，渲染勾选符号。 
>
> ````
> return (
>   <li className="item">
>     {name} {isPacked && '✔'}
>   </li>
> );
> ````
>
> !!**切勿将数字放在 && 左侧.** 
>
> > **JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 `0`，整个表达式将变成左侧的值（`0`），React 此时则会渲染 `0` 而不是不进行渲染。** 

### 5、选择性地将 JSX 赋值给变量 

> 当这些快捷方式妨碍写普通代码时，可以考虑使用 `if` 语句和变量。因为你可以使用 [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) 进行重复赋值，所以一开始你可以将你想展示的（这里指的是物品的名字）作为默认值赋予给该变量 
>
> ````JS
> // 这种方式是最冗长的，但也是最灵活的。
> function Item({ name, isPacked }) {
>   let itemContent = name;
>   if (isPacked) {
>     itemContent = name + " ✔";
>   }
>   return (
>     <li className="item">
>       {itemContent}
>     </li>
>   );
> }
> 
> // 这个方式不仅仅适用于文本，任意的 JSX 均适用
> function Item({ name, isPacked }) {
>   let itemContent = name;
>   if (isPacked) {
>     itemContent = (
>       <del>
>         {name + " ✔"}
>       </del>
>     );
>   }
>   return (
>     <li className="item">
>       {itemContent}
>     </li>
>   );
> }
> 
> export default function PackingList() {
>   return (
>     <section>
>       <h1>Sally Ride 的行李清单</h1>
>       <ul>
>         <Item 
>           isPacked={true} 
>           name="宇航服" 
>         />
>         <Item 
>           isPacked={true} 
>           name="带金箔的头盔" 
>         />
>         <Item 
>           isPacked={false} 
>           name="Tam 的照片" 
>         />
>       </ul>
>     </section>
>   );
> }
> ````
>
> 

### 6、总结

> - 在 React，你可以使用 JavaScript 来控制分支逻辑。
> - 你可以使用 `if` 语句来选择性地返回 JSX 表达式。
> - 你可以选择性地将一些 JSX 赋值给变量，然后用大括号将其嵌入到其他 JSX 中。
> - 在 JSX 中，`{cond ? <A /> : <B />}` 表示 *“当 cond 为真值时, 渲染 <A />，否则 <B />”*。
> - 在 JSX 中，`{cond && <A />}` 表示 *“当 cond 为真值时, 渲染 <A />，否则不进行渲染”*。
> - 快捷的表达式很常见，但如果你更倾向于使用 `if`，你也可以不使用它们，。

## 六、渲染列表

> ### 你将会学习到
>
> - 如何通过 JavaScript 的 `map()` 方法从数组中生成组件
> - 如何通过 JavaScript 的 `filter()` 筛选需要渲染的组件
> - 何时以及为何使用 React 中的 key

### 1、从数组中渲染数据

> 使用Javascript 对选优数据进行操作，如map、filter、 reduce等具体查找[`Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) 
>
> 具体使用https://zh-hans.reactjs.org/learn/rendering-lists

### 2、用 `key` 保持列表项的顺序

> 1、直接放在 `map()` 方法里的 JSX 元素一般都需要指定 `key` 值！ 
>
> 这些 key 会告诉 React，每个组件对应着数组里的哪一项，所以 React 可以把它们匹配起来。这在数组项2、进行移动（例如排序）、插入或删除等操作时非常重要。 
>
> ````js
> // util.js
> export function getImageUrl(person) {
>   return (
>     'https://i.imgur.com/' +
>     person.imageId +
>     's.jpg'
>   )
> }
> // data.js
> export const people = [
>   {
>     id: 0, // 在 JSX 中作为 key 使用
>     name: '凯瑟琳·约翰逊',
>     profession: '数学家',
>     accomplishment: '太空飞行相关数值的核算',
>     imageId: 'MK3eW3A',
>   },
>   {
>     id: 1, // 在 JSX 中作为 key 使用
>     name: '马里奥·莫利纳',
>     profession: '化学家',
>     accomplishment: '北极臭氧空洞的发现',
>     imageId: 'mynHUSa',
>   },
> ];
> 
> // ScientistList.js
> export default function ScientistList() {
>   // Fragment  相当于vue中的template 在真实DOM中并不会渲染
>   // Fragment: 语法的简写形式 <> </> 无法接受 key 值，所以你只能要么把生成的节点用一个 <div> 标签包裹起来，要么使用长一点但更明确的 <Fragment> 	
>   const scientistList = people.map(person => 
>     <Fragment key={person.id}>
>       <img
>         src={getImageUrl(person)}
>         alt={person.name}
>       />
>       <p>
>         <b>{person.name}</b>
>         {' ' + person.profession + ''}
>         因{person.accomplishment}而闻名世界
>       </p>
>     </Fragment>
>   )
>   console.log(scientistList)
>   return (
>       <>{scientistList}</>
>   )
> }
> ````
>
> ### 如何设定 `key` 值 
>
> 不同来源的数据往往对应不同的 key 值获取方式：
>
> - **来自数据库的数据：** 如果你的数据是从数据库中获取的，那你可以直接使用数据表中的主键，因为它们天然具有唯一性。
> - **本地产生数据：** 如果你数据的产生和保存都在本地（例如笔记软件里的笔记），那么你可以使用一个自增计数器或者一个类似 [`uuid`](https://www.npmjs.com/package/uuid) 的库来生成 key。
>
> ### key 需要满足的条件 
>
> - **key 值在兄弟节点之间必须是唯一的。** 不过不要求全局唯一，在不同的数组中可以使用相同的 key。
> - **key 值不能改变**，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。(如：key={Math.random()} )
>
> https://zh-hans.reactjs.org/learn/rendering-lists  挑战四写法简洁度高
>
> ```js
> const poem = {
>   lines: [
>     'I write, erase, rewrite',
>     'Erase again, and then',
>     'A poppy blooms.'
>   ]
> };
> 
> export default function Poem() {
>   let output = [];
> 
>   // 填充输出的数组
>   poem.lines.forEach((line, i) => {
>     output.push(
>       <hr key={i + '-separator'} />
>     );
>     output.push(
>       <p key={i + '-text'}>
>         {line}
>       </p>
>     );
>   });
>   // 移除第一个 <hr />
>   output.shift();
> 
>   return (
>     <article>
>       {output}
>     </article>
>   );
> }
> 
> // 页面展示  代码没有DRY
> I write, erase, rewrite
> -----------------
> Erase again, and then
> ----------------
> A poppy blooms.
> 
> ```
>
> 

## 七、保持组件纯粹

### 1、纯函数：组件作为公式

```
只负责自己的任务。它不会更改在该函数调用前，就已存在的对象或变量。
输入相同，则输出相同。给定相同的输入，纯函数应总是返回相同的结果。
```

### 2、副作用：（不符合）预期的后果 

React 的渲染过程必须自始至终是纯粹的。组件应该只 **返回** 它们的 JSX，而不 **改变** 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！ （**提别是Props， 新定义数组千万别写在组件外，如果数组需要用到多个组件中那么就提取在父组件传入子组件**）

### 3、使用严格模式检测不纯的计算 

> 注意： 
>
> ​	1、React 提供了 “严格模式”，在严格模式下开发时，它将会调用每个组件函数两次。**通过重复调用组件函数，严格模式有助于找到违反这些规则的组件**。（React.**StrictMode** ）、
>
> ​	2、严格模式在生产环境下不生效，因此它不会降低应用程序的速度。如需引入严格模式，你可以用 `<React.StrictMode>` 包裹根组件。一些框架会默认这样做。 

### 4、局部 mutation：组件的小秘密 

> 组件改变了 **预先存在的** 变量的值。为了让它听起来更可怕一点，我们将这种现象称为 **突变（mutation）** 。纯函数不会改变函数作用域外的变量、或在函数调用前创建的对象 — 这会使函数变得不纯粹！ 
>
> 但是，**你完全可以在渲染时更改你 刚刚 创建的变量和对象** 。在本示例中，你创建一个 `[]` 数组，将其分配给一个 `cups` 变量，然后 `push` 一打 cup 进去： 
>
> `````js
> function Cup({ guest }) {
>   return <h2>Tea cup for guest #{guest}</h2>;
> }
> export default function TeaGathering() {
>   let cups = []; // 在严格模式下千万别写在组件外
>   for (let i = 1; i <= 12; i++) {
>     cups.push(<Cup key={i} guest={i} />);
>   }
>   return cups;
> }
> `````
>
> > 如果 `cups` 变量或 `[]` 数组是在 `TeaGathering` 函数之外创建的，这将是一个很大的问题！因为如果那样的话，当你调用数组的 push 方法时，就会更改 **预先存在的** 对象。
> >
> > 但是，这里不会有影响，因为每次渲染时，你都是在 `TeaGathering` 函数内部创建的它们。`TeaGathering` 之外的代码并不会知道发生了什么。这就被称为 **“局部 mutation”** — 如同藏在组件里的小秘密。

### 5、哪些地方 **可能** 引发副作用 

> > 函数式编程在很大程度上依赖于纯函数，但 **某些事物** 在特定情况下不得不发生改变。这是编程的要义！这些变动包括更新屏幕、启动动画、更改数据等，它们被称为 **副作用**。它们是 **“额外”** 发生的事情，与渲染过程无关。 
>
> > 在 React 中，**副作用通常属于 事件处理程序**。事件处理程序是 React 在你执行某些操作（如单击按钮）时运行的函数。即使事件处理程序是在你的组件 **内部** 定义的，它们也不会在渲染期间运行！ **因此事件处理程序无需是纯函数**。 
> >
> > 如果你用尽一切办法，仍无法为副作用找到合适的事件处理程序，你还可以调用组件中的 [`useEffect`](https://zh-hans.reactjs.org/reference/react/useEffect) 方法将其附加到返回的 JSX 中。这会告诉 React 在渲染结束后执行它。**然而，这种方法应该是你最后的手段**。 

### 6、React 为何侧重于纯函数? 

> > 编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：
> >
> > - 你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
> > - 你可以为那些输入未更改的组件来 [跳过渲染](https://zh-hans.reactjs.org/reference/react/memo)，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
> > - 如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。
> >
> > 我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。

### 7、总结

> 一个组件必须是纯粹的，就意味着： 
>
> - **只负责自己的任务。** 不应更改渲染前存在的任何对象或变量。
> - **输入相同，则输出相同。** 给定相同的输入，组件应该总是返回相同的 JSX。
>
> - 渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序。
> - 你不应该改变组件用于渲染的任何输入。这包括 props、state 和 context。通过 [“设置” state](https://zh-hans.reactjs.org/learn/state-a-components-memory)) 来更新界面，而不要改变预先存在的对象。
> - 努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 `useEffect`。
> - 编写纯函数需要一些练习，但它充分释放了 React 范式的能力。

# 添加交互

## 一、响应事件

> 使用 React 可以在 JSX 中添加 **事件处理函数**。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。 
>
> ### 你将会学习到
>
> - 编写事件处理函数的不同方法
> - 如何从父组件传递事件处理逻辑
> - 事件如何传播以及如何停止它们

### 1、添加事件处理函数

> 如需添加一个事件处理函数，你需要先定义一个函数，然后 [将其作为 prop 传入](https://zh-hans.reactjs.org/learn/passing-props-to-a-component) 合适的 JSX 标签。 
>
> 按照如下三个步骤，即可让它在用户点击时显示消息：
>
> 1. 在 `Button` 组件 *内部* 声明一个名为 `handleClick` 的函数。
> 2. 实现函数内部的逻辑（使用 `alert` 来显示消息）。
> 3. 添加 `onClick={handleClick}` 到 `<button>` JSX 中。
>
> ````js
> export default function Button() {
>   function handleClick() {
>     alert('你点击了我！');
>   }
>   // 第一种写法
>   return (
>     <button onClick={handleClick}>
>       点击
>     </button>
>   )
>  // 第二种写法
>   return (
>     <button onClick={() => handleClick()}>
>       按钮
>     </button>
>   )
>   // 第三种写法
>   return (
>     <button onClick={function handleClick() {
>       alert('内联写法')
>     }}>
>       按钮
>     </button>
>   )
>   // 第四种写法
>   return (
>    <>
>     <button onClick={() =>  alert('内联写法之箭头函数')}>
>         按钮1
>     </button>
>     <button onClick={() =>  {
>         alert('内联写法之箭头函数')
>     }}>
>       按钮之箭头函数
>     </button>
>    </>
>   )
> }
> ````
>
> **！！注意**
>
> ````js
> // 这个 alert 在组件渲染时触发，而不是点击时触发！
> <button onClick={alert('你点击了我！')}>
> ````
>
> 

### 2、事件处理函数与props

#### a、在事件处理函数中读取 props

> 由于事件处理函数声明于组件内部，因此它们可以直接访问组件的 props。 
>
> ````
> function AlertButton({ message, children }) {
>   return (
>     <button onClick={() => alert(message)}>
>       {children}
>     </button>
>   );
> }
> 
> export default function Toolbar() {
>   return (
>     <div>
>       <AlertButton message="正在播放！">
>         播放电影
>       </AlertButton>
>       <AlertButton message="正在上传！">
>         上传图片
>       </AlertButton>
>     </div>
>   );
> }
> 
> ````
>
> 

#### b、将事件处理函数作为 props 传递 

> 通常，我们会在**父组件**中**定义子组件**的**事件处理函数**。 
>
> ````js
> function Button({ onClick, children }) {
>   return (
>     <button onClick={onClick}>
>       {children}
>     </button>
>   );
> }
> 
> function PlayButton({ movieName }) {
>   function handlePlayClick() {
>     alert(`正在播放 ${movieName}！`);
>   }
> 
>   return (
>     <Button onClick={handlePlayClick}>
>       播放 "{movieName}"
>     </Button>
>   );
> }
> 
> function UploadButton() {
>   return (
>     <Button onClick={() => alert('正在上传！')}>
>       上传图片
>     </Button>
>   );
> }
> 
> export default function Toolbar() {
>   return (
>     <div>
>       <PlayButton movieName="魔女宅急便" />
>       <UploadButton />
>     </div>
>   );
> }
> 
> ````
>
> 

####  c、命名事件处理函数Prop

> 内置组件（`<button>` 和 `<div>`）仅支持 [浏览器事件名称](https://zh-hans.reactjs.org/reference/react-dom/components/common#common-props)，例如 `onClick`。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。 
>
> **！！！注意：按照惯例，事件处理函数 props 应该以 `on` 开头，后跟一个大写字母。**
>
> ````
> function Button({ onSmash, children }) {
>   return (
>     <button onClick={onSmash}>
>       {children}
>     </button>
>   );
> }
> 
> export default function App() {
>   return (
>     <div>
>       <Button onSmash={() => alert('正在播放！')}>
>         播放电影
>       </Button>
>       <Button onSmash={() => alert('正在上传！')}>
>         上传图片
>       </Button>
>     </div>
>   );
> }
> 
> ````
>
> 

#### d、事件传播 

>事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。
>
>````js
>export default function() {
>  return (
>    <div
>      className="propagation"
>      onClick={() => alert('事件传播到了父元素')}>
>        <button onClick={() => alert('正在播放!')}>播放电影</button>
>        <button onClick={() => alert('正在上传！')}>上传图片</button>
>    </div>
>  )
>}
>````
>
>>### 陷阱
>>
>>在 React 中所有事件都会传播，除了 `onScroll`，它仅适用于你附加到的 JSX 标签。

### 3、阻止传播(stopPrapagation)

> 事件处理函数接收一个 **事件对象** 作为唯一的参数。按照惯例，它通常被称为 `e` ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。 
>
> ````
> export default function() {
>   return (
>     <div
>       className="propagation"
>       onClick={() => alert('事件传播到了父元素')}>
>         <button onClick={(e) => {
>           alert('正在播放!');
>           e.stopPropagation() // 阻止事件传播
>         }}>播放电影</button>
>         <button onClick={() => alert('正在上传！')}>上传图片</button>
>     </div>
>   )
> }
> ````
>
> #### 

#### f、事件捕获

> 极少数情况下，你可能需要捕获子元素上的所有事件，**即便它们阻止了传播**。例如，你可能想对每次点击进行埋点记录，传播逻辑暂且不论 。**捕获事件对于路由或数据分析之类的代码很有用** 
>
> ````js
> export default function() {
>   return (
>     <div
>       className="propagation"
>       onClickCapture={() => alert('事件传播到了父元素')}> //点击button时先执行capture事件
>         <button onClick={(e) => {
>           alert('正在播放!');
>           e.stopPropagation()
>         }}>播放电影</button>
>         <button onClick={() => alert('正在上传！')}>上传图片</button>
>     </div>
>   )
> }
> ````
>
> > 每个事件分三个阶段传播：
> >
> > 1. 它向下传播，调用所有的 `onClickCapture` 处理函数。
> > 2. 它执行被点击元素的 `onClick` 处理函数。
> > 3. 它向上传播，调用所有的 `onClick` 处理函数。

### 4、传递处理函数作为事件传播的替代方案 

> **如果你依赖于事件传播，而且很难追踪哪些处理程序在执行，及其执行的原因，可以尝试这种方法。** 
>
> ````js
> App.js
> export default function App() {
>   function replacementPropagation(str) {
>     alert(str);
>   }
>   return (
>     <div onClick={() => replacementPropagation('父组件执行')}>
>       <ReplacementEventPropagation
>         onReplacementClick={replacementPropagation}>
>         父组件
>       </ReplacementEventPropagation>
>     </div>
>   )
> }
> 
> export default function({onReplacementClick, children}) {
>   return (
>     <button 
>       onClick={(e) => {
>         e.stopPropagation()
>         onReplacementClick() // 如果不想默认传播到父组件，那么可以通过这种方式自定义执行父组件的事件处理程序
>       }}
>     >
>       {children}
>     </button>
>   )
> }
> ````
>
> 

### 5、阻止默认行为

> **某些浏览器事件具有与事件相关联的默认行为。例如，点击 `<form>` 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：** 
>
> ````
> export default function() {
>   
>   return (
>     <form onSubmit={(e) => {
>       e.preventDefault(); // 阻止浏览器默认行为
>       alert('提交表单!');
>     }}>
>       <input type="text" />
>       <button>提交</button>
>     </form>
>   )
> }
> ````
>
> 
>
> #### 注意
>
> > 不要混淆 `e.stopPropagation()` 和 `e.preventDefault()`。它们都很有用，但二者并不相关：
> >
> > - [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) 阻止触发绑定在外层标签上的事件处理函数。
> > - [`e.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) 阻止少数事件的默认浏览器行为。

### 6、总结

> - 你可以通过将函数作为 prop 传递给元素如 `<button>` 来处理事件。
> - 必须传递事件处理函数，**而非函数调用！** `onClick={handleClick}` ，不是 `onClick={handleClick()}`。
> - 你可以单独或者内联定义事件处理函数。
> - 事件处理函数在组件内部定义，所以它们可以访问 props。
> - 你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件。
> - 你可以根据特定于应用程序的名称定义事件处理函数的 prop。
> - 事件会向上传播。通过事件的第一个参数调用 `e.stopPropagation()` 来防止这种情况。
> - 事件可能具有不需要的浏览器默认行为。调用 `e.preventDefault()` 来阻止这种情况。
> - 从子组件显式调用事件处理函数 prop 是事件传播的另一种优秀替代方案。

## 二、State: 组件的记忆

> > ### 你将会学习到
> >
> > - 如何使用 [`useState`](https://zh-hans.reactjs.org/reference/usestate) Hook 添加 state 变量
> > - `useState` Hook 返回哪一对值
> > - 如何添加多个 state 变量
> > - 为什么 state 被称作是局部的
> >
> > ````js
> > //这里的 [ 和 ] 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。
> > const [index, setIndex] = useState(0);
> > ````

### 1、当普通的变量无法满足时

> 1. **局部变量无法在多次渲染中持久保存。** 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
> 2. **更改局部变量不会触发渲染。** React 没有意识到它需要使用新数据再次渲染组件。
>
> 要使用新数据更新组件，需要做两件事：
>
> 1. **保留** 渲染之间的数据。
> 2. **触发** React 使用新数据渲染组件（重新渲染）。
>
> [`useState`](https://zh-hans.reactjs.org/reference/usestate) Hook 提供了这两个功能：
>
> 1. **State 变量** 用于保存渲染间的数据。
> 2. **State setter 函数** 更新变量并触发 React 再次渲染组件。

### 2、遇见你的第一个 Hook

> 在 React 中，`useState` 以及任何其他以“`use`”开头的函数都被称为 **Hook**。
>
> Hook 是特殊的函数，只在 React [渲染](https://zh-hans.reactjs.org/learn/render-and-commit#step-1-trigger-a-render)时有效（我们将在下一节详细介绍）。它们能让你 “hook” 到不同的 React 特性中去。
>
> >### 陷阱
> >
> >**Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。** 你不能在**！！！！！！！！条件语句、循环语句或其他嵌套函数内调用 Hook（非常重要）！！！！**。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。
>
> 

### 3、state原理

> #### React 如何知道返回哪个 state
>
> **在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序**。这在实践中很有效，因为如果你遵循上面的规则（“只在顶层调用 Hooks”），Hooks 将始终以相同的顺序被调用。此外，[linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)也可以捕获大多数错误。 
>
> > 在 React 内部，为每个组件保存了一个数组，其中每一项都是一个 state 对。它维护当前 state 对的索引值，在渲染之前将其设置为 “0”。每次调用 useState 时，React 都会为你提供一个 state 对并增加索引值。 
> >
> > 基本原理代码可查看(或则查看day11中的PrincipleState组件)
> >
> > >   https://zh-hans.reactjs.org/learn/state-a-components-memory#giving-a-component-multiple-state-variables

### 4、State 是隔离且私有的 

> 1、State 是屏幕上组件实例内部的状态。换句话说，**如果你渲染同一个组件两次，每个副本都会有完全隔离的 state**！改变其中一个不会影响另一个。 
>
> 2、**state 完全私有于声明它的组件**。父组件无法更改它。这使你可以向任何组件添加或删除 state，而不会影响其他组件。 

### 5、总结

> ## 摘要
>
> - 当一个组件需要在多次渲染间“记住”某些信息时使用 state 变量。
> - State 变量是通过调用 `useState` Hook 来声明的。
> - Hook 是以 `use` 开头的特殊函数。它们能让你 “hook” 到像 state 这样的 React 特性中。
> - Hook 可能会让你想起 import：它们需要在非条件语句中调用。调用 Hook 时，包括 `useState`，仅在组件或另一个 Hook 的顶层被调用才有效。
> - `useState` Hook 返回一对值：当前 state 和更新它的函数。
> - 你可以拥有多个 state 变量。在内部，React 按顺序匹配它们。
> - State 是组件私有的。如果你在两个地方渲染它，则每个副本都有独属于自己的 state。

## 三、渲染和提交

> 组件显示到屏幕之前，其必须被 React 渲染。理解这些处理步骤将帮助您思考代码的执行过程并能解释其行为。 
>
> ### 你将会学习到
>
> - 在 React 中渲染的含义是什么
> - 为什么以及什么时候 React 会渲染一个组件
> - 在屏幕上显示组件所涉及的步骤
> - 为什么渲染并不一定会导致 DOM 更新
>
> > 1. **触发** 一次渲染（把客人的点单分发到厨房）
> > 2. **渲染** 组件（在厨房准备订单）
> > 3. **提交** 到 DOM（将菜品放在桌子上）
>
> ### 步骤1
>
> 有两种原因会导致组件的渲染:
>
> 1. 组件的 **初次渲染。**
> 2. 组件（或者其祖先之一）的 **状态发生了改变。**
>
> #### 初次渲染 
>
> 当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用目标 DOM 节点的 [`createRoot`](https://zh-hans.reactjs.org/reference/react-dom/client/createRoot)，然后用你的组件调用 `render` 函数完成的
>
> #### 状态更新时重新渲染 
>
> 一旦组件被初次渲染，您就可以通过使用 [`set` 函数](https://zh-hans.reactjs.org/reference/react/useState#setstate) 更新其状态来触发之后的渲染。更新组件的状态会自动将一次渲染送入队列。
>
> ## 步骤 2: React 渲染您的组件 
>
> 在您触发渲染后，React 会调用您的组件来确定要在屏幕上显示的内容。**“渲染中” 即 React 在调用您的组件。**
>
> - **在进行初次渲染时,** React 会调用根组件。
> - **对于后续的渲染,** React 会调用内部状态更新触发了渲染的函数组件。
>
> > 这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染 *那个* 组件，而如果那个组件又返回了某个组件，那么 React 接下来就会渲染 *那个* 组件，以此类推。 
>
> > ### 陷阱
> >
> > 渲染必须始终是一次 [纯计算](https://zh-hans.reactjs.org/learn/keeping-components-pure):
> >
> > - **输入相同，输出相同。** 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
> > - **只做它自己的事情。** 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）
> >
> > 否则，随着代码库复杂性的增加，您可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。
>
> > ### 性能优化
> >
> >  收起如果更新的组件在树中的位置非常高，渲染更新后的组件内部所有嵌套组件的默认行为将不会获得最佳性能。如果您遇到了性能问题，[性能](https://reactjs.org/docs/optimizing-performance.html) 章节描述了几种可选的解决方案 。**不要过早进行优化！** 
>
> ## 步骤 3: React 把更改提交到 DOM 上
>
> 在渲染（调用）您的组件之后，React 将会修改 DOM。
>
> - **对于初次渲染，** React 会使用 [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API 将其创建的所有 DOM 节点放在屏幕上。
> - **对于重渲染，** React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。
> - **React 仅在渲染之间存在差异时才会更改 DOM 节点** 
>
> ## 摘要
>
> > - 在一个 React 应用中一次屏幕更新都会发生以下三个步骤
> >
> > 1. 触发
> > 2. 渲染
> > 3. 提交
> >
> > - 您可以使用严格模式去找到组件中的错误
> > - 如果渲染结果与上次一样，那么 React 将不会修改 DOM
>
> 

## 四、state 如同一张快照

> **React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。** 

> ### 你将会学习到
>
> - 设置 state 如何导致重新渲染
> - state 在何时以何种方式更新
> - 为什么 state 不在设置后立即更新
> - 事件处理函数如何获取 state 的一张“快照”

### 1、设置 state 会触发渲染

> 你可能会认为你的用户界面会直接对点击之类的用户输入做出响应并发生变化。在 React 中，它的工作方式与这种思维模型略有不同。在上一页中，你看到了来自 React 的[设置 state 请求重新渲染](https://zh-hans.reactjs.org/learn/render-and-commit#step-1-trigger-a-render)。这意味着要使界面对输入做出反应，你需要设置其 state。 

### 2、渲染会及时生成一张快照 

> [“正在渲染”](https://zh-hans.reactjs.org/learn/render-and-commit#step-2-react-renders-your-components) 就意味着 React 正在调用你的组件——一个函数。你从该函数返回的 JSX 就像是 UI 的一张及时的快照。它的 props、事件处理函数和内部变量都是 **根据当前渲染时的 state** 被计算出来的。 
>
> > ##### 当 React 重新渲染一个组件时：
> >
> > 1. React 会再次调用你的函数
> > 2. 你的函数会返回新的 JSX 快照
> > 3. React 会更新界面来匹配你返回的快照
>
> https://zh-hans.reactjs.org/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time
>
> ````js
> import { useState } from 'react';
> 
> export default function Counter() {
>   const [number, setNumber] = useState(0);
>   return (
>     <>
>       <h1>{number}</h1>
>       <button onClick={() => {
>         setNumber(number + 1);
>         setNumber(number + 1);
>         setNumber(number + 1);
>       }}>+3</button>
>     </>
>   )
> }
> 
> ````
>
> **设置 state 只会为 下一次 渲染变更 state 的值**。在第一次渲染期间，`number` 为 `0`。这也就解释了为什么在 *那次渲染中的* `onClick` 处理函数中，即便在调用了 `setNumber(number + 1)` 之后，`number` 的值也仍然是 `0`： 

### 3、随时间变化的 state 

> 渲染组件过程是异步的（`setState`在事件处理程序内部是异步的 ）
>
> ````js
> import { useState } from 'react';
> 
> export default function Counter() {
>   const [number, setNumber] = useState(0);
> 
>   return (
>     <>
>       <h1>{number}</h1>
>       <button onClick={() => {
>         setNumber(number + 5);
>         alert(number); // 先执行弹框 number才会变 说明setNumber过程是异步的
>       }}>+5</button>
>     </>
>   )
> }
> 
> ````
>
> **alert()**添加异步处理后显示结果
>
> `````js
> import { useState } from 'react';
> export default function AsyncCounter() {
>   const [number, setNumber] = useState(0);
>   return (
>     <>
>       <h1>{number}</h1>
>       <button onClick={() => {
>         setNumber(number + 5);
>         setTimeout(() => {
>           alert(number); // 第一次点击显示0
>         }, 3000);
>       }}>
>         +5
>       </button>
>     </>
>   )
> }
> `````
>
> 提示框运行时，React 中存储的 state 可能已经发生了更改，但是这次**更改是根据用户与其交互时的 state 快照来安排的！** 
>
> > **一个 state 变量的值永远不会在一次渲染的内部发生变化，** 即使其事件处理函数的代码是异步的。在 *那次渲染的* `onClick` 内部，`number` 的值即使在调用 `setNumber(number + 5)` 之后也还是 `0`。它的值在 R**eact 通过调用你的组件“获取 UI 的快照”时就被“固定”了。** 
>
> **React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部。** 你无需担心代码运行时 state 是否发生了变化。
>
> 但是，万一你想在重新渲染之前读取最新的 state 怎么办？你应该使用 [状态更新函数](https://zh-hans.reactjs.org/learn/queueing-a-series-of-state-updates)，下一页将会介绍！

### 4、总结

> - 设置 state 请求一次新的渲染。
> - React 将 state 存储在组件之外，就像在架子上一样。
> - 当你调用 `useState` 时，React 会为你提供*该次渲染* 的一张 state 快照。
> - 变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。
> - 每个渲染（以及其中的函数）始终“看到”的是 React 提供给*这个* 渲染的 state 快照。
> - 你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX。
> - 过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值。

## 五、state 更新加入队列

> 设置组件 state 会把一次重新渲染加入队列。但有时你可能会希望在下次渲染加入队列之前对 state 的值执行多次操作。 
>
> > ### 你将会学习到
> >
> > - 什么是“批处理”以及 React 如何使用它来处理多个 state 更新
> > - 如何连续多次对同一 state 变量进行更新

### 1、React 会对 state 更新进行批处理

> **React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新** 

![img](https://zh-hans.reactjs.org/images/docs/illustrations/i_react-batching.png) 

> 这让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 [重新渲染](https://zh-hans.reactjs.org/learn/render-and-commit#re-renders-when-state-updates)。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 *之后*，UI 才会更新。这种特性也就是 **批处理**，它会使你的 React 应用运行得更快。它还会帮你避免处理只更新了一部分 state 变量的令人困惑的“半成品”渲染。 (理解：同一次更新批量state, React只会更新更新一次)
>
> **React 不会跨 多个 需要刻意触发的事件（如点击）进行批处理**——每次点击都是单独处理的。请放心，React 只会在一般来说安全的情况下才进行批处理。 

### 2、在下次渲染前多次更新同一个 state

> 这是一个不常见的用例，但是如果你想在下次渲染之前多次更新同一个 state，你可以像 `setNumber(n => n + 1)` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 *函数*，而不是像 `setNumber(number + 1)` 这样传入 *下一个 state 值*。 
>
> > - **一个更新函数**（例如：`n => n + 1`）会被添加到队列中。
> > - **任何其他的值**（例如：数字 `5`）会导致“替换为 `5`”被添加到队列中，已经在队列中的内容会被忽略。
>
> 事件处理函数执行完成后，React 将触发重新渲染。在重新渲染期间，React 将处理队列。更新函数会在渲染期间执行，因此 **更新函数必须是 纯函数** 并且只 *返回* 结果。不要尝试从它们内部设置 state 或者执行其他副作用。在严格模式下，React 会执行每个更新函数两次（但是丢弃第二个结果）以便帮助你发现错误。 

### 3、命名惯例

> 通常可以通过相应 state 变量的第一个字母来命名更新函数的参数：
>
> ```js
> setEnabled(e => !e);
> 
> setLastName(ln => ln.reverse());
> 
> setFriendCount(fc => fc * 2);
> ```
>
> 如果你喜欢更冗长的代码，另一个常见的惯例是重复使用完整的 state 变量名称，如 `setEnabled(enabled => !enabled)`，或使用前缀，如 `setEnabled(prevEnabled => !prevEnabled)`。

### 4、总结

> ## 摘要
>
> - 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
> - React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
> - 要在一个事件中多次更新某些 state，你可以使用 `setNumber(n => n + 1)` 更新函数。

## 六、更新State中的对象

> 如何正确更新处于 React 状态的对象
> 如何在不改变嵌套对象的情况下更新它
> 什么是不变性，以及如何不破坏它
> 如何使用 Immer 减少对象复制的重复性

### 1、什么是突变？

> 从技术上讲，可以更改*对象本身*的内容。**这称为突变：** 
>
> `````js
> const [position, setPosition] = useState({ x: 0, y: 0 });
> position.x = 5;
> `````
>
> 然而，尽管 React 状态中的对象在技术上是可变的，但您应该将它们视为**不可**变的——就像数字、布尔值和字符串一样。您应该始终替换它们，而不是改变它们。 

### 2、将状态视为只读

> **将放入状态的任何 JavaScript 对象视为只读。** (修改State时不能直接修改对象，而是要通过设置函数进行修改，不然页面无法响应修改的值)。
>
> ````js
> const [position, setPosition] = useState({
>     x: 0,
>     y: 0
> });
> 
> //  错误修改 因为  position对象已属于State对象  不能直接修改它的值
> position.x = e.clientX;
> position.y = e.clientY;
> // 正确修改
> setPosition({
>   x: e.clientX,
>   y: e.clientY
> });
> 
> // 正确
> const nextPosition = {};
> nextPosition.x = e.clientX;
> nextPosition.y = e.clientY;
> setPosition(nextPosition);
> ````
>
> 只有当您更改已处于状态的*现有*对象时，变异才会成为问题。改变您刚刚创建的对象是可以的，因为*还没有其他代码引用它。***更改它不会意外影响依赖它的东西。这被称为“局部突变”**。您甚至可以[在渲染时进行局部突变。](https://zh-hans.reactjs.org/learn/keeping-components-pure#local-mutation-your-components-little-secret)很方便，完全没问题！ 
>
> 示例
>
> https://zh-hans.reactjs.org/learn/updating-objects-in-state#local-mutation-is-fine

### 3、使用扩展语法复制对象

>  您可以使用`...` [展开语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)语法，这样您就不需要单独复制每个属性。 
>
> ````
> setPerson({
>   ...person, // Copy the old fields
>   firstName: e.target.value // But override this one
> });
> ````
>
> **注意：**… 扩展语法是“浅的”——它只复制一个层次的内容。这使得它快速，但这也意味着如果您想要更新一个嵌套的属性，您将不得不使用它不止一次。 
>
> 

### 4、更新嵌套对象

> 但是在 React 中，你将状态视为不可变的！为了更改`city`，您首先需要生成新`artwork`对象（预先填充了前一个对象的数据），然后生成`person`指向新对象的新对象`artwork`： 
>
> ````
> const nextArtwork = { ...person.artwork, city: 'New Delhi' };
> const nextPerson = { ...person, artwork: nextArtwork };
> setPerson(nextPerson);
> 
> // 或则, 写成单个函数调用：
> setPerson({
>   ...person, // Copy other fields
>   artwork: { // but replace the artwork
>     ...person.artwork, // with the same one
>     city: 'New Delhi' // but in New Delhi!
>   }
> });
> ````
>
> https://zh-hans.reactjs.org/learn/updating-objects-in-state#updating-a-nested-object

### 5、使用 Immer 编写简洁的更新逻辑 

>  [Immer](https://github.com/immerjs/use-immer) 是一个流行的库，它允许您使用方便但不断变化的语法进行编写，并负责为您生成副本。 
>
>  > #### Immer 是如何工作的？
>  >
>  > Immer提供的草稿是一种特殊类型的对象，称为proxy，它“记录”您使用它所做的事情。这就是为什么你可以随心所欲地改变它!在底层，Immer会找出草稿的哪些部分被更改了，并生成一个包含您的编辑的全新对象。
>  >
>  > > To try Immer:
>  > >
>  > > 1. Run `npm install use-immer` to add Immer as a dependency
>  > > 2. Then replace `import { useState } from 'react'` with `import { useImmer } from 'use-immer'`
>  > >
>  > > **语法**
>  > >
>  > > ````js
>  > > // state更新  
>  > > const [person, setPerson] = useState({
>  > >     name: 'Niki de Saint Phalle',
>  > >     artwork: {
>  > >       title: 'Blue Nana',
>  > >       city: 'Hamburg',
>  > >       image: 'https://i.imgur.com/Sd1AgUOm.jpg',
>  > >     }
>  > >   });
>  > > 
>  > >   function handleNameChange(e) {
>  > >     setPerson({
>  > >       ...person,
>  > >       name: e.target.value
>  > >     });
>  > >   }
>  > > 
>  > > // immer 更新
>  > >   const [person, updatePerson] = useImmer({
>  > >     name: 'Niki de Saint Phalle',
>  > >     artwork: {
>  > >       title: 'Blue Nana',
>  > >       city: 'Hamburg',
>  > >       image: 'https://i.imgur.com/Sd1AgUOm.jpg',
>  > >     }
>  > >   });
>  > > 
>  > >   function handleNameChange(e) {
>  > >     updatePerson(draft => {
>  > >       draft.name = e.target.value;
>  > >     });
>  > >   }
>  > > ````
>  > >
>  > > 
>  >
>  > #### 具体使用查看
>  >
>  > https://zh-hans.reactjs.org/learn/updating-objects-in-state#write-concise-update-logic-with-immer

### 6、总结

> 将React中的所有状态都视为不可变的。 
>
> 当你以状态存储对象时，改变它们不会触发渲染，而是会改变之前渲染“快照”中的状态。 
>
> 与其改变对象，不如创建它的新版本，并通过设置状态来触发重新呈现。 
>
> 您可以使用{…'newValue'}对象扩展语法，用于创建对象的副本。 
>
> 扩展语法很浅:它只复制一层深度。 
>
> 要更新嵌套对象，您需要从正在更新的位置一直往上创建副本。 
>
> 要减少重复复制代码，请使用Immer。

## 七、更新state中的数组

> 数组是另外一种可以存储在 state 中的 JavaScript 对象，它虽然是可变的，但是却应该被视为不可变。 
>
> > ### 你将会学习到
> >
> > - 如何添加、删除或者修改 React state 中的数组中的元素
> > - 如何更新数组内部的对象
> > - 如何通过 Immer 降低数组拷贝的重复度

### 1、在没有 mutation 的前提下更新数组

> 在 JavaScript 中，数组只是另一种对象。[同对象一样](https://zh-hans.reactjs.org/learn/updating-objects-in-state)，**你需要将 React state 中的数组视为只读的**。这意味着你不应该使用类似于 `arr[0] = 'bird'` 这样的方式来重新分配数组中的元素，也不应该使用会直接修改原始数组的方法，例如 `push()` 和 `pop()`。 

| 避免使用 (会改变原始数组) | 推荐使用 (会返回一个新数组）  |                                                              |
| ------------------------- | ----------------------------- | ------------------------------------------------------------ |
| 添加元素                  | `push`，`unshift`             | `concat`，`[...arr]` 展开语法（[例子](https://zh-hans.reactjs.org/learn/updating-arrays-in-state#adding-to-an-array)） |
| 删除元素                  | `pop`，`shift`，`splice`      | `filter`，`slice`（[例子](https://zh-hans.reactjs.org/learn/updating-arrays-in-state#removing-from-an-array)） |
| 替换元素                  | `splice`，`arr[i] = ...` 赋值 | `map`（[例子](https://zh-hans.reactjs.org/learn/updating-arrays-in-state#replacing-items-in-an-array)） |
| 排序                      | `reverse`，`sort`             | 先将数组复制一份（[例子](https://zh-hans.reactjs.org/learn/updating-arrays-in-state#making-other-changes-to-an-array)） |

#### a、向数组中添加元素

> 创建一个 *新* 数组，其包含了原始数组的所有元素 *以及* 一个在末尾的新元素。这可以通过很多种方法实现，最简单的一种就是使用 `...` [数组展开](https://zh-hans.reactjs.org/a-javascript-refresher#array-spread) 语法： 

````js

const [artists, setArtists] = useState([]);
setArtists( // 替换 state
  [ // 是通过传入一个新数组实现的
    ...artists, // 新数组包含原数组的所有元素
    { id: nextId++, name: name } // 并在末尾添加了一个新的元素
  ]
);
````

#### b、从数组中删除元素

> 从数组中删除一个元素最简单的方法就是将它*过滤出去*。换句话说，你需要生成一个不包含该元素的新数组。这可以通过 `filter` 方法实现， 

````js
 let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];
const [artists, setArtists] = useState(
	initialArtists
);
  
setArtists(
    artists.filter(a =>
      a.id !== artist.id
    )
);
````

#### c、转换数组

> 如果你想改变数组中的某些或全部元素，你可以用 `map()` 创建一个**新**数组。你传入 `map` 的函数决定了要根据每个元素的值或索引（或二者都要）对元素做何处理。 

````js
const nextShapes = shapes.map(shape => {
  if (shape.type === 'square') {
    // 不作改变
    return shape;
  } else {
    // 返回一个新的圆形，位置在下方 50px 处
    return {
      ...shape,
      y: shape.y + 50,
    };
  }
});
// 使用新的数组进行重渲染
setShapes(nextShapes);
````

#### d、替换数组中的元素

> 想要替换数组中一个或多个元素是非常常见的。类似 `arr[0] = 'bird'` 这样的赋值语句会直接修改原始数组，所以在这种情况下，你也应该使用 `map`。 

````
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 递增被点击的计数器数值
        return c + 1;
      } else {
        // 其余部分不发生变化
        return c;
      }
    });
    setCounters(nextCounters);
````

#### e、向数组中插入元素

> 有时，你也许想向数组特定位置插入一个元素，这个位置既不在数组开头，也不在末尾。为此，你可以将数组展开运算符 `...` 和 `slice()` 方法一起使用。 

````
    const insertAt = 1; // 可能是任何索引
    const nextArtists = [
      // 插入点之前的元素：
      ...artists.slice(0, insertAt),
      // 新的元素：
      { id: nextId++, name: name },
      // 插入点之后的元素：
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName(''); // 输入框的值清空
````

#### f、其他改变数组的情况

> 总会有一些事，是你仅仅依靠展开运算符和 `map()` 或者 `filter()` 等不会直接修改原值的方法所无法做到的。例如，你可能想翻转数组，或是对数组排序。而 JavaScript 中的 `reverse()` 和 `sort()` 方法会改变原数组，所以你无法直接使用它们。 
>
> **然而，你可以先拷贝这个数组，再改变这个拷贝后的值。** 

`````js
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
`````

> **如果数组中有嵌套的对象需要想[更新嵌套的 JavaScript 对象](https://zh-hans.reactjs.org/docs/updating-objects-in-state#updating-a-nested-object)**  

### 2、更新数组内部的对象

> **当你更新一个嵌套的 state 时，你需要从想要更新的地方创建拷贝值，一直这样，直到顶层** (深拷贝也行)
>
> https://zh-hans.reactjs.org/learn/updating-arrays-in-state#updating-objects-inside-arrays
>
> **你可以使用 map 在没有 mutation 的前提下将一个旧的元素替换成更新的版本。**
>
> ````
> setMyList(myList.map(artwork => {
>   if (artwork.id === artworkId) {
>     // 创建包含变更的*新*对象
>     return { ...artwork, seen: nextSeen };
>   } else {
>     // 没有变更
>     return artwork;
>   }
> }));
> ````
>
>  

### 3、使用 Immer 编写简洁的更新逻辑 

> 修改数组中嵌套对象属性时建议使用Immer，如果是操作数组中某一项的整个对象建议直接使用map 或则 filter（如： 添加、删除）

> 在没有 mutation 的前提下更新嵌套数组可能会变得有点重复。[就像对对象一样](https://zh-hans.reactjs.org/learn/updating-objects-in-state#write-concise-update-logic-with-immer):
>
> - 通常情况下，你应该不需要更新处于非常深层级的 state 。如果你有此类需求，你或许需要[调整一下数据的结构](https://zh-hans.reactjs.org/learn/choosing-the-state-structure#avoid-deeply-nested-state)，让数据变得扁平一些。
> - 如果你不想改变 state 的数据结构，你也许会更喜欢使用 [Immer](https://github.com/immerjs/use-immer) ，它让你可以继续使用方便的，但会直接修改原值的语法，并负责为你生成拷贝值。

````js
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];
  const [yourList, updateYourList] = useImmer(
    initialList
  );
updateMyList(draft => {
  const artwork = draft.find(a =>
    a.id === id
  );
  artwork.seen = nextSeen;
});
````

### 4、摘要

> - 你可以把数组放入 state 中，但你不应该直接修改它。
> - 不要直接修改数组，而是创建它的一份 *新的* 拷贝，然后使用新的数组来更新它的状态。
> - 你可以使用 `[...arr, newItem]` 这样的数组展开语法来向数组中添加元素。
> - 你可以使用 `filter()` 和 `map()` 来创建一个经过过滤或者变换的数组。
> - 你可以使用 Immer 来保持代码简洁。

# 状态管理

## 一、State响应输入

> 我写的代码
>
> 问题有
>
> 1、代码太过繁琐
>
> 2、state理解不到位
>
> 3、事件处理函数运用熟不
>
> 4、变量和不变量控制，缺乏意识。不变量应该不进行重复出现（DRY）
>
> 5、stata过多，下面功能只需要一个state即可
>
> https://zh-hans.react.dev/learn/reacting-to-input-with-state

```js
import { useState } from "react";
export default function Picture() {
  const [background, setBackground] = useState("background background--active");
  const [imgClassName, setImgClassName] = useState("picture");
  function handleImgClassName() {
    setBackground("background");
    setImgClassName("picture picture--active");
  }
  function handleDivClassName() {
    setBackground("background background--active");
    setImgClassName("picture");
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleDivClassName(e);
      }}
      className={background}
    >
      <img
        className={imgClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={(e) => {
          e.stopPropagation();
          handleImgClassName(e);
        }}
      />
    </div>
  );
}

```

## 二、选择状态结构

> #### 你将会学习到
>
> - 何时使用单个与多个状态变量
> - 组织状态时要避免什么
> - 如何解决状态结构的常见问题

### 1、结构化状态的原则

> 1. **组相关状态。**如果您总是同时更新两个或多个状态变量，请考虑将它们合并为一个状态变量。
> 2. **避免状态上的矛盾。**当状态的结构方式使多个状态可能相互矛盾和“不一致”时，就会为错误留下空间。尽量避免这种情况。
> 3. **避免冗余状态。**如果您可以在渲染期间从组件的 props 或其现有状态变量中计算出一些信息，则不应将该信息放入该组件的状态中。
> 4. **避免状态重复。**当相同的数据在多个状态变量之间或嵌套对象中重复时，很难使它们保持同步。尽可能减少重复。
> 5. **避免深度嵌套状态。**层次很深的状态更新起来不是很方便。如果可能，更喜欢以扁平的方式构建状态

### 2、组相关状态

> **如果某些两个状态变量总是一起变化，那么将它们统一为一个状态变量可能是个好主意** 
>
> ````
>   const [position, setPosition] = useState({
>     x: 0,
>     y: 0
>   });
>   
>   ....
> setPosition({
>     x: e.clientX,
>     y: e.clientY
> });
> ````
>
> **注意： **如果您的状态变量是一个对象，请记住[您不能](https://zh-hans.react.dev/learn/updating-objects-in-state)在不显式复制其他字段的情况下只更新其中的一个字段。 

###  3、避免状态矛盾

> **当两个state永远不应该同时为真，因此最好将它们替换为一个状态变量，该变量可能采用三种有效状态status之一** `'typing'`：（初始）、`'sending'`和`'sent'`：
>
> 这样就可以避免状态矛盾
>
> ````js
>   // const [isSending, setIsSending] = useState(false)
>   // const [isSent, setIsSent] = useState(false); // 冗余的state变量
>   const [status, setStatus] = useState('typing'); // 取代isSent and isSending
> ````
>
> 

### 4、避免冗余状态

> 如果您可以在渲染期间从组件的 **props** 或其**现有状态变量**中计算出一些信息，则**不应**将该信息放入该组件的**状态**中。 
>
> ````js
>   const [firstName, setFirstName] = useState('');
>   const [lastName, setLastName] = useState('');
>   // const [fullName, setFullName] = useState(''); // 冗余的state 
> 
>   const fullName = firstName + lastName; // 通过state计算fullName值
> 
> ````
>
> ##### 深入探讨
>
> > 只有当你想忽略特定道具的所有更新时，“镜像”道具到状态才有意义。按照惯例，以initial或default作为prop名称的开头，以澄清其新值将被忽略: 
> >
> > - ！！！除非你特别想阻止更新，否则不要将道具*放入状态。*
> >
> > ````js
> > function Message({ initialColor }) {
> >   // The `color` state variable holds the *first* value of `initialColor`.
> >   // Further changes to the `initialColor` prop are ignored.
> >   const [color, setColor] = useState(initialColor);
> > ````
> >
> > 上面代码说明initialColor对于当前组件来说只要一个初始值的作用。**因为在项目中initialColor可能是接口获取的数据，但是我们不希望在父组件中把它变成state（父组件中也有应用）,那么我们就需要在子组件中把它设置成state. (注意：是需要它来不断改变一些元素或者数据才能设置成state)**

### 5、避免状态重复

> 一组数据（数组或则对象）避免出现数组（嵌套对象形式）为一个state，而其中的子项又为一个state这会造成状态重复
>
> ````js
>   const initialItems = [
>   { title: 'pretzels', id: 0 },
>   { title: 'crispy seaweed', id: 1 },
>   { title: 'granola bar', id: 2 },
> ];
>   const [items , setItems] = useState(initialItems);
>   // const [selectedItem, setSelectedItem] = useState(items[0]); // 重复的state   items[0]  是 items 子项
>   
>   const [selectedId, setSelectedId] = useState(0);  // 替代selectedItem   获取更新数组对象中的id
>   
>  const selectedItem = items.find(item => selectedId === item.id);
> 
> ````
>
> 

### 6、避免深度嵌套状态（重点）

> **如果状态嵌套太多而不易更新，请考虑使其“扁平化”。** 这是您可以重组此数据的一种方法。 

### 7、总结

> - 如果两个状态变量总是一起更新，考虑将它们合并为一个。
> - 仔细选择状态变量以避免产生“不可能”的状态。
> - 以一种减少更新错误的可能性的方式来构建你的状态。
> - 避免冗余和重复状态，这样您就不需要保持同步。
> - 除非你特别想阻止更新，否则不要将道具*放入状态。*
> - 对于像选择这样的 UI 模式，将 ID 或索引保持在状态而不是对象本身。
> - 如果更新深层嵌套状态很复杂，请尝试将其展平。

## 三、在组件间共享状态

> 有时候，你希望两个组件的状态始终同步更改。要实现这一点，可以将相关 state 从这两个组件上移除，并把 **state** 放到它们的**公共父级**，再通过 **props** 将 **state** 传递给这两个组件。这被称为“状态提升”， 
>
> ### 你将会学习到
>
> - 如何使用状态提升在组件之间共享状态
> - 什么是受控组件和非受控组件

### 1、状态提升步骤

> **第1步：从子组件中移除状态**
>
> **第2步：从公共父组件传递硬编码数据**
>
> **第3步：为公共父组件添加状态**

### 2、每个状态都对应唯一的数据源 

> 在 `React` 应用中，很多组件都有自己的状态。一些状态可能“活跃”在叶子组件（树形结构最底层的组件）附近，例如输入框。另一些状态可能在应用程序顶部“活动”。例如，客户端路由库也是通过将当前路由存储在 `React` 状态中，利用 `props` 将状态层层传递下去来实现的！ 
>
> **对于每个独特的状态，都应该存在且只存在于一个指定的组件中作为 state **。这一原则也被称为拥有 [“可信单一数据源”](https://en.wikipedia.org/wiki/Single_source_of_truth)。它并不意味着所有状态都存在一个地方——对每个状态来说，都需要一个特定的组件来保存这些状态信息。你应该 *将状态提升* 到公共父级，或 *将状态传递* 到需要它的子级中，而不是在组件之间复制共享的状态。  

### 3、总结

> - 当你想要整合两个组件时，将它们的 state 移动到共同的父组件中。
> - 然后在父组件中通过 `props` 把信息传递下去。
> - 最后，向下传递事件处理程序，以便子组件可以改变父组件的 state 。
> - 考虑该将组件视为“受控”（由 prop 驱动）或是“不受控”（由 state 驱动）是十分有益的。

## 四、对 state 进行保留和重置

> 各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。 

>### 你将会学习到
>
>- React 如何“处理”组件结构
>- React 何时选择保留或重置 state
>- 如何强制 React 重置组件的 state
>- key 和组件类型如何影响 state 是否被保留

### 1、UI树

> React 也使用树形结构来对你创造的 UI 进行管理和建模。React 根据你的 JSX 生成 **UI 树**。React DOM 根据 UI 树去更新浏览器的 DOM 元素。（React Native 则将这些 UI 树转译成移动平台上特有的元素。） 

![**UI 树**](E:\reactLearn\assets\react_comller.png)

### 2、state与树中的某个位置相关联(独立性)

> 当你为一个组件添加 state 时，你可能会觉得 state “活”在组件内部。但实际上，state 被保存在 React 内部。根据组件在 UI 树中的位置，React 将它所持有的每个 state 与正确的组件关联起来。 
>
> **只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。** 如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。 
>
> ````js
> <Counter />
> {showB && <Counter />}  {/* state 不会被保留 因为组件已经注销*/} 
> ````
>
> 上面第二个组件因为会被移除，又因stata是独立且组件在 **UI 树中的位置**，React 将它所持有的每个 **state 与正确的组件关联起来**。 所以不会保留stata原状态而是随着组件一起移除

**过程： 观察stats变化**

1、渲染组件

![](E:\reactLearn\assets\rander1.png)

2、删除组件

![](E:\reactLearn\assets\rander2.png)

3、再次渲染同一个组件

![](E:\reactLearn\assets\rander3.png)

**上面过程state随着组件的移除而被移除，重新渲染而被初始化。只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state**。（就是a组件移除时a组件立即进行渲染，才能保持state。这样渲染的结果可能是组件内部有些许差异）

### 3、相同位置的相同组件会使得 state 被保留下来

> 记住 **对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置！** 
>
> `````js
> // state是否被保持，看父组件的UI树是否变化(位置/元素（组件是否改变或则父元素是否改变-->注意这个的父元素指的是条件判断里的父元素）)，
> // 如果没有变化则保持state不变，反之初始化state
> // 下面三种情况
> export default function KeepCounter() {
>   const [isFancy, setIsFancy] = useState(false)
> 
>   // 这种情况也是可以保持state的,因为UI树未发生变化
>   if (isFancy) {
>   	return (
>      <div>
>         .....
>       <Counter isFancy={isFancy} />
>      </div>
>     )
>   } else {
>     return (
>      <div>
>         .....
>       <Counter isFancy={isFancy} />
>      </div>
>     )
>   }
>     
>       // 因为UI树发生变化，所以初始化state
>   if (isFancy) {
>   	return (
>      <div>
>         .....
>         <span>额外元素</span>
>       	<Counter isFancy={isFancy} />
>      </div>
>     )
>   } else {
>     return (
>      <div>
>         .....
>       <Counter isFancy={isFancy} />
>      </div>
>     )
>   }
>   
>   return (
>     <div>
>       <label>
>       使用好看的样式
>         <input
>           type="checkbox"
>           checked={isFancy}
>           onChange={(e) => setIsFancy(e.target.checked)}
>         />
>       </label>
>       {/* 添加一个元素也不会影响下面组件的UI树 理解UI树的构造形式就可以理解为什么不会重置其state 这里为false时相当于一个文本节点 */}
>       {isFancy && <h1>勾选checkbox</h1>}
>       {/* 第一种保持了state */}
>       {isFancy ? (
>         <Counter isFancy={isFancy} />
>         ) : (
>         <Counter isFancy={isFancy}/> 
>       )}
>       {/* 重置了state */}
>       {isFancy ? (
>         <div>
>           <Counter isFancy={isFancy} />
>         </div>
>         ) : (
>         <section>
>           <Counter isFancy={isFancy}/> 
>         </section>
>       )}
>     </div>
>   )
> }
> `````
>
> **以上示例足以说明那些情况是可以保持state那些情况是重置state。再则如果父组件转入到子组件中的prop为子组件添加或则删除一个元素，则也不会重置state**
>
> > 另一种情况是
>
> 

### 4、相同位置的不同组件会使 state 重置 

> ````js
> <div>
>   {/* 改变了UI树结构 所以state会被重置 */}
>   {isPaused ? (
>     <p>待会见！</p>
>   ) : (
>     <Counter/>
>   )}
>   <label>
>     <input
>         type="checkbox"
>         checked={isPaused}
>         onChange={e => {
>           setIsPaused(e.target.checked)
>         }}
>       />
>     休息一下
>   </label>
> </div>
> ````
>
> 一般来说，**如果你想在重新渲染时保留 state，几次渲染中的树形结构就应该相互“匹配”**。结构不同就会导致 state 的销毁，因为 React 会在将一个组件从树中移除时销毁它的 state。 
>
> ​     这也是为什么不应该把组件嵌套起来使用的原因（组件中直接写子组件而不是引用）。父组件中写子组件每个子组件都是独立的，内部作用域和“地址”都不同，**最重要的是当父组件中的state被修改时，会重新渲染整个父组件，导致子组件（虽然名字相同但是其‘地址不同’相当于{} !== {}）也重新渲染并重置所有state**
>
> 为了避免这个问题， **永远要将组件定义在最上层并且不要把它们的定义嵌套起来。** 

### 5、在相同位置重置 state 

> React 会在一个组件保持在同一位置时保留它的 state。通常这就是你想要的，所以把它作为默认特性很合理。但有时候，你可能想要重置一个组件的 state。 
>
> > 有两个方法可以在它们相互切换时重置 state：
> >
> > 1. 将组件渲染在不同的位置
> > 2. 使用 `key` 赋予每个组件一个明确的身份

#### 方法一：将组件渲染在不同的位置

> 这个解决方案在你只有少数几个独立的组件渲染在相同的位置时会很方便。 

````js
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
````

> 具体解释看第4小节

#### 方法二：使用key来重置state

> 你可能在 [渲染列表](https://zh-hans.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) 时见到过 `key`。但 key 不只可以用于列表！你可以使用 key 来让 React 区分任何组件。默认情况下，React 使用父组件内部的顺序（“第一个计数器”、“第二个计数器”）来区分组件。但是 key 可以让你告诉 React 这不仅仅是 *第一个* 或者 *第二个* 计数器，而且还是一个特定的计数器——例如，*Taylor 的* 计数器。这样无论它出现在树的任何位置， React 都会知道它是 *Taylor 的* 计数器！ 
>
> `````js
> // 设置key值react会特定的处理设置key的组件，而不是利用渲染顺序区分，则会重置state
> {isPlayerA ? (
> 	<Counter key="Taylor" person="Taylor" />
> ) : (
> 	<Counter key="Sarah" person="Sarah" />
> )}
> `````
>
> > ### 注意
> >
> > 请记住 key 不是全局唯一的。它们只能指定 **父组件内部** 的顺序。
>
> #### 为被移除的组件保留 state(应用)
>
> >在真正的聊天应用中，你可能会想在用户再次选择前一个收件人时恢复输入 state。对于一个不可见的组件，有几种方法可以让它的 state “活下去”：
> >
> >- 与其只渲染现在这一个聊天，你可以把 *所有* 聊天都渲染出来，但用 CSS 把其他聊天隐藏起来。这些聊天就不会从树中被移除了，所以它们的内部 state 会被保留下来。这种解决方法对于简单 UI 非常有效。但如果要隐藏的树形结构很大且包含了大量的 DOM 节点，那么性能就会变得很差。
> >- 你可以进行 [状态提升](https://zh-hans.react.dev/learn/sharing-state-between-components) 并在父组件中保存每个收件人的草稿消息。这样即使子组件被移除了也无所谓，因为保留重要信息的是父组件。这是最常见的解决方法。
> >- 除了 React 的 state，你也可以使用其他数据源。例如，也许你希望即使用户不小心关闭页面也可以保存一份信息草稿。要实现这一点，你可以让 `Chat` 组件通过读取 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 对其 state 进行初始化，并把草稿保存在那里。
> >
> >无论采取哪种策略，*与 Alice* 的聊天在概念上都不同于 *与 Bob* 的聊天，因此根据当前收件人为 `<Chat>` 树指定一个 `key` 是合理的。
>
> 实现上面的应用可以用key的特殊性
>
> ````js
> export default function App() {
>   const [reverse, setReverse] = useState(false);
>   let checkbox = (
>     <label>
>       <input
>         type="checkbox"
>         checked={reverse}
>         onChange={e => setReverse(e.target.checked)}
>       />
>       调换顺序
>     </label>
>   );
>   // 组件位置变化了但是组件引用没有变，而且没有从UI树中移除对应组件，可以实现state保持， 注意当带有key的组件变换的时候，是按替换前的位置进行替换的。所以在切换的后元素的相对位置一定要与之间的保持一致。不然会渲染多个组件。（具体查看第18天笔记代码Fields组件内容）
>   return (
>     <>
>       <Field key={reverse ? '名字' : '姓氏' } label={reverse ? '名字' : '姓氏' }/>
>       <Field key={reverse ? '姓氏' : '名字' } label={reverse ? '姓氏' : '名字' }/>
>       {checkbox}
>     </>
>   );
> }
> ````
>
> #### ！！！key作为组件的标志时，只要在重渲染中没有被移除且只是UI树的位置发生看改变，那么该组件的state会被保持

### 6、总结

> - 只要在相同位置渲染的是相同组件， React 就会保留状态。
> - state 不会被保存在 JSX 标签里。它与你在树中放置该 JSX 的位置相关联。
> - 你可以通过为一个子树指定一个不同的 key 来重置它的 state。
> - 不要嵌套组件的定义，否则你会意外地导致 state 被重置。

## 五、迁移状态逻辑至Reducer

> 对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 **reducer**。 
>
> > ### 你将会学习到
> >
> > - 什么是 reducer 函数
> > - 如何将 `useState` 重构成 `useReducer`
> > - 什么时候使用 reducer
> > - 如何编写一个好的 reducer

### 对比 `useState` 和 `useReducer` 

> Reducers 并非没有缺点！以下是比较它们的几种方法：
>
> - **代码体积：** 通常，在使用 `useState` 时，一开始只需要编写少量代码。而 `useReducer` 必须提前编写 reducer 函数和需要调度的 actions。但是，当多个事件处理程序以相似的方式修改 state 时，`useReducer` 可以减少代码量。
> - **可读性：** 当状态更新逻辑足够简单时，`useState` 的可读性还行。但是，一旦逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，`useReducer` 允许你将状态更新逻辑与事件处理程序分离开来。
> - **可调试性：** 当使用 `useState` 出现问题时, 你很难发现具体原因以及为什么。 而使用 `useReducer` 时， 你可以在 reducer 函数中通过打印日志的方式来观察每个状态的更新，以及为什么要更新（来自哪个 `action`）。 如果所有 `action` 都没问题，你就知道问题出在了 reducer 本身的逻辑中。 然而，与使用 `useState` 相比，你必须单步执行更多的代码。
> - **可测试性：** reducer 是一个不依赖于组件的纯函数。这就意味着你可以单独对它进行测试。一般来说，我们最好是在真实环境中测试组件，但对于复杂的状态更新逻辑，针对特定的初始状态和 `action`，断言 reducer 返回的特定状态会很有帮助。
> - **个人偏好：** 并不是所有人都喜欢用 reducer，没关系，这是个人偏好问题。你可以随时在 `useState` 和 `useReducer` 之间切换，它们能做的事情是一样的！
>
> 
>
> > 如果你在修改某些组件状态时经常出现问题或者想给组件添加更多逻辑时，我们建议你还是使用 reducer。当然，你也不必整个项目都用 reducer，这是可以自由搭配的。你甚至可以在一个组件中同时使用 `useState` 和 `useReducer`。 

### 编写一个好的 reducers 

> 编写 `reducers` 时最好牢记以下两点：
>
> - **reducers 必须是纯粹的。** 这一点和 [状态更新函数](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates) 是相似的，`reducers` 在是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 `reducers` [必须纯净](https://zh-hans.react.dev/learn/keeping-components-pure)，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 [对象](https://zh-hans.react.dev/learn/updating-objects-in-state) 和 [数组](https://zh-hans.react.dev/learn/updating-arrays-in-state)。
> - **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。** 举个例子，如果用户在一个由 `reducer` 管理的表单（包含五个表单项）中点击了 `重置按钮`，那么 dispatch 一个 `reset_form` 的 action 比 dispatch 五个单独的 `set_field` 的 action 更加合理。如果你在一个 `reducer` 中打印了所有的 `action` 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！

### 1、使用 reducer 整合状态逻辑 

> 随着这个组件的不断迭代，其状态逻辑也会越来越多。为了降低这种复杂度，并让所有逻辑都可以存放在一个易于理解的地方，你可以将这些状态逻辑移到组件之外的一个称为 **reducer** 的函数中。 
>
> **Reducer 是处理状态的另一种方式。你可以通过三个步骤将 `useState` 迁移到 `useReducer`：**
>
> 1. 将设置状态的逻辑 **修改** 成 dispatch 的一个 action；
> 2. **编写** 一个 reducer 函数；
> 3. 在你的组件中 **使用** reducer。

#### 第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action

>https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer#step-1-move-from-setting-state-to-dispatching-actions 查看官网例子  下面的步骤同步 。 同步查看day19天。官方写法和自己写法的不同。
>
>`````js
>  const [tasks, dispatch] = useReducer(tasksReducer ,initialTasks)
>  const handleAddTask = (text) => {
>    dispatch({
>      type: 'added',
>      id: nextId++,
>      text: text
>    })
>    // setTasks([
>    //   ...tasks,
>    //   {
>    //     id: nextId++,
>    //     text: text,
>    //     done: false,
>    //   }
>    // ]);
>  }
>  const handleChangeStak = (task) => {
>    dispatch({
>      type: 'changed',
>      task: task
>    })
>    // setTasks(
>    //   tasks.map(task => {
>    //     if (task.id === id) {
>    //       return {
>    //         ...task,
>    //         text,
>    //         done,
>    //       }
>    //     }
>    //     return task
>    //   })
>    // )
>  }
>`````
>
>

#### 第 2 步: 编写一个 reducer 函数 

> 上面的代码使用了 `if/else` 语句，但是在 reducers 中使用 [switch 语句](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/switch) 是一种惯例。两种方式结果是相同的，但 `switch` 语句读起来一目了然。 

`````js
function tasksReducer(tasks, action) {
  switch(action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ]
    }
    case 'changed': {
      return tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task
        }
        return task
      });
    }
    case 'remove': {
      return tasks.filter(task => task.id !== action.id)
    }
      
  }
}
`````

#### 第 3 步: 在组件中使用 reducer

> **`useReducer` 钩子接受 2 个参数：**
>
> 1. 一个 reducer 函数
> 2. 一个初始的 state
>
> **它返回如下内容：**
>
> 1. 一个有状态的值
> 2. 一个 dispatch 函数（用来 “派发” 用户操作给 reducer）****

````js
import { useReducer } from 'react';

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
````

### 2、使用Immer 简化 reducers 

> 与在平常的 state 中 [修改对象](https://zh-hans.react.dev/learn/updating-objects-in-state#write-concise-update-logic-with-immer) 和 [数组](https://zh-hans.react.dev/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) 一样，你可以使用 `Immer` 这个库来简化 `reducer`。在这里，[`useImmerReducer`](https://github.com/immerjs/use-immer#useimmerreducer) 
>
> ````
>   const [tasks, dispatch] = useImmerReducer(tasksImmerReducer, initialTasks); // 和reducer一样但是可以传入可以参入三个参数
> 
> // dispatch 用法和reducer一样
> 
> function tasksImmerReducer(draft, action) {
>   switch(action.type) {
>     case 'added': {
>       draft.push({
>         id: action.id,
>         text: action.text,
>         done: false
>       });
>       break;
>     }
>     case 'changed': {
>       const index = draft.findIndex(t => t.id === action.task.id)
>       draft[index] = action.task
>       break;
>     }
>     case 'remove': {
>       return draft.filter(t => t.id !== action.id)
>     }
>     default: {
>       throw Error('未知 action：' + action.type);
>     }
>   }
> }
> ````
>
> 

## 六、使用Context深层传递参数

> 通常来说，你会通过 **props 将信息从父组件传递到子组件**。但是，如果你必须通过许多**中间组件向下传递 props**，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。**Context** 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。 
>
> > ### 你将会学习到
> >
> > - 什么是 “prop 逐级透传”
> > - 如何使用 context 代替重复的参数传递
> > - Context 的常见用法
> > - Context 的常见替代方案

### 1、传递Props带来的问题

> [传递 props](https://zh-hans.react.dev/learn/passing-props-to-a-component) 是将数据通过 UI 树显式传递到使用它的组件的好方法。 
>
> 但是当你需要在组件树中深层传递参数以及需要在组件间复用相同的参数时，传递 props 就会变得很麻烦。最近的根节点父组件可能离需要数据的组件很远，[状态提升](https://zh-hans.react.dev/learn/sharing-state-between-components) 到太高的层级会导致 “逐层传递 props” 的情况。 
>
> 

![1682735927765](E:\reactLearn\assets\prop.png)

### 2、Content: 传递props的另一种方法

> 1. **创建** 一个 context。（你可以将其命名为 `LevelContext`, 因为它表示的是标题级别。)
> 2. 在需要数据的组件内 **使用** 刚刚创建的 context。（`Heading` 将会使用 `LevelContext`。）
> 3. 在指定数据的组件中 **提供** 这个 context。 （`Section` 将会提供 `LevelContext`。）
>
> Context 可以让父节点，甚至是很远的父节点都可以为其内部的整个组件树提供数据。 
>
> ![1682737953160](E:\reactLearn\assets\Context.png)

#### Step1：创建context

> 首先，你需要创建这个 context，并 **将其从一个文件中导出**，这样你的组件才可以使用它 
>
> ````js
> // LevelContext.js 
> import { createContext } from 'react';
> export const LevelContext = createContext(1);
> ````
>
> 

#### Step2: 使用Context

> 从 React 中引入 `useContext` Hook 以及你刚刚创建的 context: 
>
> ````js
> import { useContext } from 'react';
> import { LevelContext } from './LevelContext.js';
> ````
>
> 删掉 `Propsn` 参数并从你刚刚引入的 `LevelContext` 中读取值： 
>
> > **注意：**`useContext` 是一个 Hook。和 `useState` 以及 `useReducer`一样，你只能在 React 组件中（**不是循环或者条件里**）立即调用 Hook。**useContext 告诉 React Heading 组件想要读取 LevelContext。** 
>
> ````js
>   const level = useContext(LevelContext);
> ````
>
> 修改一下 JSX，让 `Section` 组件代替 `Heading` 组件接收 level 参数： (具体代码查看day20)
>
> ````
> <Section level={4}>
>   <Heading>子子标题</Heading>
>   <Heading>子子标题</Heading>
>   <Heading>子子标题</Heading>
> </Section>
> ````
>
> > 注意！这个示例还不能运行。所有 headings 的尺寸都一样，因为 **即使你正在使用 context，但是你还没有提供它。** React 不知道从哪里获取这个 context！ 如果你不提供 context，React 会使用你在上一步指定的默认值 

#### Step3: 提供Context

> **把它们用 context provider 包裹起来**  以提供 `LevelContext` 给它们： 
>
> > 这告诉 React：“如果在 `<Section>` 组件中的任何子组件请求 `LevelContext`，给他们这个 `level`。”组件会使用 UI 树中在它上层最近的那个 `<LevelContext.Provider>` 传递过来的值。 
>
> `````js
> import { LevelContext } from './LevelContext.js'; 
> 
> export default function Section({ level, children }) {
>   return (
>     <section className="section">
>       <LevelContext.Provider value={level}> // value接收对应需要的props
>         {children}
>       </LevelContext.Provider>
>     </section>
>   );
> }
> `````
>
> > context代替prop写法过程
> >
> > 1. 你将一个 `level` 参数传递给 `<Section>`。
> > 2. `Section` 把它的子元素包在 `<LevelContext.Provider value={level}>` 里面。
> > 3. `Heading` 使用 `useContext(LevelContext)` 访问上层最近的 `LevelContext` 提供的值。

### 3、在相同中间中使用并提供context

> https://zh-hans.react.dev/learn/passing-data-deeply-with-context#using-and-providing-context-from-the-same-component  示例连接
>
> ````js
> import {useContext} from 'react';
> import {LevelContext} from './LevelContext';
> // 使用levelContext替代Prop中的leave  这种方式比较适合树形结构组件
> export default function PropsSection({level ,children}) {
>   const levelContext = useContext(LevelContext)
>   return (
>    <>
>     <section>
>       <LevelContext.Provider value={levelContext + 1}>
>         {children}
>       </LevelContext.Provider>
>     </section>
>    </> 
>   )
> }
> ````
>
> 

### 4、Context会穿过中间层级的组件

> 你可以在提供 context 的组件和使用它的组件之间的层级插入任意数量的组件。这包括像 `<div>` 这样的内置组件和你自己创建的组件。 
>
> >**!!!!!注意：**在 React 中，**覆盖来自上层的某些 context 的唯一方法是将子组件包裹到一个提供不同值的 context provider 中。** 
>
> **不同的 React context 不会覆盖彼此**
>
> > 你通过 `createContext()` 创建的每个 context 都和其他 context 完全分离，只有使用和提供 *那个特定的* context 的组件才会联系在一起。一个组件可以轻松地使用或者提供许多不同的 context。 

### 5、context 使用时机

> 使用 Context 看起来非常诱人！然而，这也意味着它也太容易被过度使用了。**如果你只想把一些 props 传递到多个层级中，这并不意味着你需要把这些信息放到 context 里。** 
>
> >在使用 context 之前，你可以考虑以下几种替代方案：
> >
> >1. **从 传递 props 开始。** 如果你的组件看起来不起眼，那么通过十几个组件向下传递一堆 props 并不罕见。这有点像是在埋头苦干，但是这样做可以让哪些组件用了哪些数据变得十分清晰！维护你代码的人会很高兴你用 props 让数据流变得更加清晰。
> >2. **抽象组件并 将 JSX 作为 children 传递 给它们。** 如果你通过很多层不使用该数据的中间组件（并且只会向下传递）来传递数据，这通常意味着你在此过程中忘记了抽象组件。举个例子，你可能想传递一些像 `posts` 的数据 props 到不会直接使用这个参数的组件，类似 `<Layout posts={posts} />`。取而代之的是，让 `Layout` 把 `children` 当做一个参数，然后渲染 `<Layout><Posts posts={posts} /></Layout>`。这样就减少了定义数据的组件和使用数据的组件之间的层级。
> >
> >如果这两种方法都不适合你，再考虑使用 context。
>
> 

### 6、Context使用场景

> - **主题：** 如果你的应用允许用户更改其外观（例如暗夜模式），你可以在应用顶层放一个 context provider，并在需要调整其外观的组件中使用该 context。
> - **当前账户：** 许多组件可能需要知道当前登录的用户信息。将它放到 context 中可以方便地在树中的任何位置读取它。某些应用还允许你同时操作多个账户（例如，以不同用户的身份发表评论）。在这些情况下，将 UI 的一部分包裹到具有不同账户数据的 provider 中会很方便。
> - **路由：** 大多数路由解决方案在其内部使用 context 来保存当前路由。这就是每个链接“知道”它是否处于活动状态的方式。如果你创建自己的路由库，你可能也会这么做。
> - **状态管理：** 随着你的应用的增长，最终在靠近应用顶部的位置可能会有很多 state。许多遥远的下层组件可能想要修改它们。通常 [将 reducer 与 context 搭配使用](https://zh-hans.react.dev/learn/scaling-up-with-reducer-and-context)来管理复杂的状态并将其传递给深层的组件来避免过多的麻烦。
>
> Context 不局限于静态值。如果你在下一次渲染时传递不同的值，React 将会更新读取它的所有下层组件！这就是 context 经常和 state 结合使用的原因。
>
>  

### 7、总结

> - Context 使组件向其下方的整个树提供信息。
> - 传递 Context 的方法
>   - 通过 `export const MyContext = createContext(defaultValue)` 创建并导出 context。
>   - 在无论层级多深的任何子组件中，把 context 传递给 `useContext(MyContext)` Hook 来读取它。
>   - 在父组件中把 children 包在 `<MyContext.Provider value={...}>` 中来提供 context。
> - Context 会穿过中间的任何组件。
> - Context 可以让你写出 “较为通用” 的组件。
> - 在使用 context 之前，先试试传递 props 或者将 JSX 作为 `children` 传递。

## 七、使用Reducer和Context来拓展你的应用

> Reducer 可以整合组件的状态更新逻辑。Context 可以将信息深入传递给其他组件。你可以组合使用它们来共同管理一个复杂页面的状态。 
>
> >### 你将会学习到
> >
> >- 如何结合使用 reducer 和 context
> >- 如何去避免通过 props 传递 state 和 dispatch
> >- 如何将 context 和状态逻辑保存在一个单独的文件中
>
> 

### 1、结合使用reducer和context

> 下面将介绍如何结合使用 reducer 和 context：
>
> 1. **创建** context。
> 2. 将 state 和 dispatch **放入** context。
> 3. 在组件树的任何地方 **使用** context。

#### 第一步：创建context

> `useReducer` 返回当前的 `tasks` 和 `dispatch` 函数来让你更新它们： 
>
> ````js
> const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
> ````
>
> 为了将它们从组件树往下传，你将 [创建](https://zh-hans.react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context) 两个不同的 context：
>
> - `TasksContext` 提供当前的 tasks 列表。
> - `TasksDispatchContext` 提供了一个函数可以让组件分发动作。

#### 第二步：将state和dispatch函数放入context

> 现在，你可以将所有的 context 导入 `TaskApp` 组件。获取 `useReducer()` 返回的 `tasks` 和 `dispatch` 并将它们 [提供](https://zh-hans.react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context) 给整个组件树： 
>
> ````js
> import { TasksContext, TasksDispatchContext } from './TasksContext.js';
> //  记住每一个context就是一个“组件”
> export default function TaskApp() {
>   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
>   // ...
>   return (
>     <TasksContext.Provider value={tasks}>
>       <TasksDispatchContext.Provider value={dispatch}>
>         <AddTask
>           onAddTask={handleAddTask}
>         />
>         <TaskList
>           tasks={tasks}
>           onChangeTask={handleChangeTask}
>           onDeleteTask={handleDeleteTask}
>         />
>       </TasksDispatchContext.Provider>
>     </TasksContext.Provider>
>   );
> }
> ````
>
> 

#### 第三步：在组件树中的任何地方使用context

> 你将删除通过 props 传递的代码。 
>
> ````js
> <TasksContext.Provider value={tasks}>
>   <TasksDispatchContext.Provider value={dispatch}>
>     <h1>Day off in Kyoto</h1>
>     <AddTask />
>     <TaskList />
>   </TasksDispatchContext.Provider>
> </TasksContext.Provider>
> ````
>
> > **TasksContext和TasksDispatchContext下的任何子组件都可以使用useContext读取context**
>
> 任何组件都可以从 context 中读取 `dispatch` 函数并调用它，从而更新任务列表： 
>
> ````js
> export default function AddTask() {
>   const [text, setText] = useState('');
>   const dispatch = useContext(TasksDispatchContext);
>   // ...
>   return (
>     // ...
>     <button onClick={() => {
>       setText('');
>       dispatch({
>         type: 'added',
>         id: nextId++,
>         text: text,
>       });
>     }}>Add</button>
>   )
> ````
>
> 

### 2、将相关逻辑迁移到一个文件当中

> context如果有变的非常复杂且嵌套层数很深则需要把它迁移到对应的context文件中创建一个context组件进行集中管理`Provider`  ，此组件将所有部分连接在一起： 
>
> > 1. 它将管理 reducer 的状态。
> > 2. 它将提供现有的 context 给组件树。
> > 3. 它将 [把 `children` 作为 prop](https://zh-hans.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)，所以你可以传递 JSX。
>
> ````
> export function TasksProvider({ children }) {
>   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
> 
>   return (
>     <TasksContext.Provider value={tasks}>
>       <TasksDispatchContext.Provider value={dispatch}>
>         {children}
>       </TasksDispatchContext.Provider>
>     </TasksContext.Provider>
>   );
> }
> ````
>
> 这不会改变任何行为，但它会允许你之后进一步分割这些 context 或向这些函数添加一些逻辑。**现在所有的 context 和 reducer 连接部分都在 TasksContext.js 中。这保持了组件的干净和整洁，让我们专注于它们显示的内容，而不是它们从哪里获得数据：** 
>
> > ### 注意
> >
> > 像 `useTasks` 和 `useTasksDispatch` 这样的函数被称为 **自定义 Hook。** 如果你的函数名以 `use` 开头，它就被认为是一个自定义 Hook。这让你可以使用其他 Hook，比如 `useContext`。

### 3、总结

> - 你可以将 reducer 与 context 相结合，让任何组件读取和更新它的状态。
> - 为子组件提供 state 和 dispatch 函数：
>   - 创建两个 context (一个用于 state,一个用于 dispatch 函数)。
>   - 让组件的 context 使用 reducer。
>   - 使用组件中需要读取的 context。
> - 你可以通过将所有传递信息的代码移动到单个文件中来进一步整理组件。 
>   - 你可以导出一个像 `TasksProvider` 可以提供 context 的组件。
>   - 你也可以导出像 `useTasks` 和 `useTasksDispatch` 这样的自定义 Hook。
> - 你可以在你的应用程序中大量使用 context 和 reducer 的组合。

## 八、使用 ref 引用值

> 当你希望组件“记住”某些信息，但又不想让这些信息 [触发新的渲染](https://zh-hans.react.dev/learn/render-and-commit) 时，你可以使用 *ref* 。 
>
> ### 你将会学习到
>
> - 如何向组件添加 ref
> - 如何更新 ref 的值
> - ref 与 state 有何不同
> - 如何安全地使用 ref

### 1、给你的组件添加ref

> 你可以通过从 React 导入 `useRef` Hook 来为你的组件添加一个 ref： 
>
> ```js
> import { useRef } from 'react';
> ```
>
> 在你的组件内，调用 `useRef` Hook 并传入你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”： 
>
> ```js
> const ref = useRef(0);
> 
> // 返回一个对象
> { 
>   current: 0 // 你向 useRef 传入的值
> }
> ```
>
> 你可以用 `ref.current` 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它。 
>
> > 请注意，**组件不会在每次递增时重新渲染。** 与 state 一样，React 会在每次重新渲染之间保留 ref。但是，设置 **state 会重新渲染组件**，更改 **ref 不会**！ 

### 2、ref和state的不同之处

> 也许你觉得 ref 似乎没有 state 那样“严格” —— 例如，你可以改变它们而非总是必须使用 state 设置函数。但在大多数情况下，我们建议你使用 state。ref 是一个“应急方案”，你并不会经常用到它。 以下是 state 和 ref 的对比： 
>
> | ref                                                     | state                                                        |
> | ------------------------------------------------------- | ------------------------------------------------------------ |
> | `useRef(initialValue)`返回 `{ current: initialValue }`  | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`) |
> | 更改时不会触发重新渲染                                  | 更改时触发重新渲染。                                         |
> | 可变 —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。 |
> | 你不应在渲染期间读取（或写入） `current` 值。           | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)。 |
>
> 

### 3、何时使用ref

> 通常，当你的组件需要“跳出” React 并与外部 API 通信时，你会用到 ref —— 通常是不会影响组件外观的浏览器 API。以下是这些罕见情况中的几个：
>
> - 存储 [timeout ID](https://developer.mozilla.org/docs/Web/API/setTimeout)
> - 存储和操作 [DOM 元素](https://developer.mozilla.org/docs/Web/API/Element)，我们将在 [下一页](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 中介绍
> - 存储不需要被用来计算 JSX 的其他对象。
>
> 如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref。

### 4、ref的最佳实践

> 遵循这些原则将使你的组件更具可预测性：
>
> - **将 ref 视为应急方案。** 当你使用外部系统或浏览器 API 时，ref 很有用。如果你很大一部分应用程序逻辑和数据流都依赖于 ref，你可能需要重新考虑你的方法。
> - **不要在渲染过程中读取或写入 ref.current。** 如果渲染过程中需要某些信息，请使用 [state](https://zh-hans.react.dev/learn/state-a-components-memory) 代替。由于 React 不知道 `ref.current` 何时发生变化，即使在渲染时读取它也会使组件的行为难以预测。（唯一的例外是像 `if (!ref.current) ref.current = new Thing()` 这样的代码，它只在第一次渲染期间设置一次 ref。）
>
> React state 的限制不适用于 ref。例如，state 就像 [每次渲染的快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)，并且 [不会同步更新](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)。但是当你改变 ref 的 current 值时，它会立即改变：
>
> ```
> ref.current = 5;
> 
> console.log(ref.current); // 5
> ```
>
> 这是因为 **ref 本身是一个普通的 JavaScript 对象，** 所以它的行为就像对象那样。
>
> 当你使用 ref 时，也无需担心 [避免变更](https://zh-hans.react.dev/learn/updating-objects-in-state)。只要你改变的对象不用于渲染，React 就不会关心你对 ref 或其内容做了什么。

#### 5、ref和DOM

> 你可以将 ref 指向任何值。但是，ref 最常见的用法是访问 DOM 元素。例如，如果你想以编程方式聚焦一个输入框，这种用法就会派上用场。当你将 ref 传递给 JSX 中的 `ref` 属性时，比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。你可以在 [使用 ref 操作 DOM](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 中阅读更多相关信息。 

### 6、总结

> - ref 是一个应急方案，用于保留不用于渲染的值。 你不会经常需要它们。
> - ref 是一个普通的 JavaScript 对象，具有一个名为 `current` 的属性，你可以对其进行读取或设置。
> - 你可以通过调用 `useRef` Hook 来让 React 给你一个 ref。
> - 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
> - 与 state 不同，设置 ref 的 `current` 值不会触发重新渲染。
> - 不要在渲染过程中读取或写入 `ref.current`。这使你的组件难以预测。
>
> > #### 尝试一些挑战: https://zh-hans.react.dev/learn/referencing-values-with-refs#challenges

## 九、使用ref操作DOM

> 由于 React 会自动处理更新 [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) 以匹配你的渲染输出，因此你在组件中通常不需要操作 DOM。但是，有时你可能需要访问由 React 管理的 DOM 元素 —— 例如，让一个节点获得焦点、滚动到它或测量它的尺寸和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个指向 DOM 节点的 *ref* 来实现。 
>
> > ### 你将会学习到
> >
> > - 如何使用 `ref` 属性访问由 React 管理的 DOM 节点
> > - `ref` JSX 属性如何与 `useRef` Hook 相关联
> > - 如何访问另一个组件的 DOM 节点
> > - 在哪些情况下修改 React 管理的 DOM 是安全的

### 1、获取指向节点的ref

> 要访问由 React 管理的 DOM 节点，首先，引入 `useRef` Hook： 
>
> ```
> import { useRef } from 'react';
> ```
>
> 然后，在你的组件中使用它声明一个 ref： 
>
> ```
> const myRef = useRef(null);
> ```
>
> 最后，将其作为 `ref` 属性传给 DOM 节点： 
>
> ```
> <div ref={myRef}>
> ```
>
> `useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。然后，你可以从 [事件处理器](https://zh-hans.react.dev/learn/responding-to-events) 访问此 DOM 节点，并使用在其上定义的内置[浏览器 API](https://developer.mozilla.org/docs/Web/API/Element)。 
>
> ```
> // 你可以使用任意浏览器 API，例如：
> myRef.current.scrollIntoView();
> ```
>
> ### 使文本输入框获得焦点
>
> ```js
> import { useRef } from 'react';
> 
> export default function Form() {
>   const inputRef = useRef(null);
> 
>   function handleClick() {
>     inputRef.current.focus();
>   }
> 
>   return (
>     <>
>       <input ref={inputRef} />
>       <button onClick={handleClick}>
>         聚焦输入框
>       </button>
>     </>
> ```
>
> 要实现这一点：
>
> 1. 使用 `useRef` Hook 声明 `inputRef`。
> 2. 像 `<input ref={inputRef}>` 这样传递它。这告诉 React **将这个 <input> 的 DOM 节点放入 inputRef.current。**
> 3. 在 `handleClick` 函数中，从 `inputRef.current` 读取 input DOM 节点并使用 `inputRef.current.focus()` 调用它的 [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)。
> 4. 用 `onClick` 将 `handleClick` 事件处理器传递给 `<button>`。
>
> 虽然 DOM 操作是 ref 最常见的用例，但 `useRef` Hook 可用于存储 React 之外的其他内容，例如计时器 ID 。与 state 类似，ref 能在渲染之间保留。你甚至可以将 ref 视为设置它们时不会触发重新渲染的 state 变量！你可以在[使用 Ref 引用值](https://zh-hans.react.dev/learn/referencing-values-with-refs)中了解有关 ref 的更多信息。

### 2、获取列表每一项的ref

> ref 的数量是预先确定的。但有时候，你可能需要为列表中的每一项都绑定 ref ，而你又不知道会有多少项。像下面这样做**是行不通的** 
>
> ```
> <ul>
>   {items.map((item) => {
>     // 行不通！
>     const ref = useRef(null);
>     return <li ref={ref} />;
>   })}
> </ul>
> ```
>
> **这是因为 Hook 只能在组件的顶层被调用。不能在循环语句、条件语句或 `map()` 函数中调用 `useRef`**  
>
> #### 解决方案
>
> > 一种可能的解决方案是用一个 ref 引用其父元素，然后用 DOM 操作方法如 [`querySelectorAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 来寻找它的子节点。然而，这种方法很脆弱，如果 DOM 结构发生变化，可能会失效或报错。 
> >
> >  
> >
> > 另一种解决方案是**将函数传递给 ref 属性**。这称为 [`ref` 回调](https://zh-hans.react.dev/reference/react-dom/components/common#ref-callback)。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 `null` 。这使你可以维护自己的数组或 [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，并通过其索引或某种类型的 ID 访问任何 ref。 
> >
> > ```js
> > // node 表示对应的ref  注意这里是ref回调才能获取到列表中的ref
> > ref={(node => {
> >     const map = getMap()
> >     if (node) {
> >       map.set(cat.id, node);
> >     } else {
> >       map.delete(cat.id)
> >     }
> >  })}
> > ```
> >
> > 

### 3、访问另一个组件的DOM节点

> 当你将 ref 放在像 `<input />` 这样输出浏览器元素的内置组件上时，React 会将该 ref 的 `current` 属性设置为相应的 DOM 节点（例如浏览器中实际的 `<input />` ）。
>
> 但是，如果你尝试将 ref 放在 **你自己的** 组件上，例如 `<MyInput />`，默认情况下你会得到 `null`。
>
> #### 使用fofwardRef获取子组件中对应元素ref
>
> ```js
> const MyInput = forwardRef((props, ref) => {
>   return <input {...props} ref={ref} />;
> });
> ```
>
> > 1. `<MyInput ref={inputRef} />` 告诉 React 将对应的 DOM 节点放入 `inputRef.current` 中。但是，这取决于 `MyInput` 组件是否允许这种行为， 默认情况下是不允许的。
> > 2. `MyInput` 组件是使用 `forwardRef` 声明的。 **这让从上面接收的 inputRef 作为第二个参数 ref 传入组件**，第一个参数是 `props` 。
> > 3. `MyInput` 组件将自己接收到的 `ref` 传递给它内部的 `<input>`。
> >
> > ```js
> > import { forwardRef, useRef } from 'react';
> > 
> > const MyInput = forwardRef((props, ref) => {
> >   return <input {...props} ref={ref} />;
> > });
> > 
> > export default function Form() {
> >   const inputRef = useRef(null);
> >   
> >   function handleClick() {
> >     inputRef.current.focus();
> >   }
> > 
> >   return (
> >     <>
> >       <MyInput ref={inputRef} />
> >       <button onClick={handleClick}>
> >         聚焦输入框
> >       </button>
> >     </>
> >   );
> > }
> > ```
> >
> > 

### 4、使用命令句柄暴露一部分 API

> 在上面的例子中，`MyInput` 暴露了原始的 DOM 元素 input。这让父组件可以对其调用`focus()`。然而，这也让父组件能够做其他事情 —— 例如，改变其 CSS 样式。在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 做到这一点： 
>
> ```js
> import {
>   forwardRef, 
>   useRef, 
>   useImperativeHandle
> } from 'react';
> 
> const MyInput = forwardRef((props, ref) => {
>   const realInputRef = useRef(null); // 使用useImperativeHandle 需要在子组件中重新声明一个ref
>   useImperativeHandle(ref, () => ({
>     // 只暴露 focus，没有别的
>     focus() {
>       realInputRef.current.focus();
>     },
>   }));
>   return <input {...props} ref={realInputRef} />;
> });
> 
> export default function Form() {
>   console.log(inputRef) // 父组件调用时 {current: { focus }} 只有focus方法
>   const inputRef = useRef(null);
> 
>   function handleClick() {
>     inputRef.current.focus();
>   }
> 
>   return (
>     <>
>       <MyInput ref={inputRef} />
>       <button onClick={handleClick}>
>         聚焦输入框
>       </button>
>     </>
>   );
> }
> 
> ```
>
> 

### 5、React何时添加refs

> 在 React 中，每次更新都分为 [两个阶段](https://zh-hans.react.dev/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)：
>
> - 在 **渲染** 阶段， React 调用你的组件来确定屏幕上应该显示什么。
> - 在 **提交** 阶段， React 把变更应用于 DOM。
>
> 在 React 中，每次更新都分为 [两个阶段](https://zh-hans.react.dev/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)：
>
> - 在 **渲染** 阶段， React 调用你的组件来确定屏幕上应该显示什么。
> - 在 **提交** 阶段， React 把变更应用于 DOM。
>
> 通常，你 [不希望](https://zh-hans.react.dev/learn/referencing-values-with-refs#best-practices-for-refs) 在渲染期间访问 refs。这也适用于保存 DOM 节点的 refs。在第一次渲染期间，DOM 节点尚未创建，因此 `ref.current` 将为 `null`。在渲染更新的过程中，DOM 节点还没有更新。所以读取它们还为时过早。
>
> React 在提交阶段设置 `ref.current`。在更新 DOM 之前，React 将受影响的 `ref.current` 值设置为 `null`。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。
>
> **通常，你将从事件处理器访问 refs。** 如果你想使用 ref 执行某些操作，但没有特定的事件可以执行此操作，你可能需要一个 effect。我们将在下一页讨论 effect。

### 6、用 flushSync 同步更新 state

> 案例： https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs#flushing-state-updates-synchronously-with-flush-sync 
>
> ```js
> import {flushSync} from 'react-dom';
> flushSync(() => {
>   setTodos([ ...todos, newTodo]);
> });
> ```
>
> 这将指示 React 当封装在 `flushSync` 中的代码执行后，立即同步更新 DOM。 

### 7、使用refs操作DOM的最佳实践

> 1、Refs 是一个应急方案。你应该只在你必须“跳出 React”时使用它们。这方面的常见示例包括管理焦点、滚动位置或调用 React 未暴露的浏览器 API。
>
> 2、如果你坚持聚焦和滚动等非破坏性操作，应该不会遇到任何问题。但是，如果你尝试手动**修改** DOM，则可能会与 React 所做的更改发生冲突。
>
> 3、**避免更改由 React 管理的 DOM 节点。** 对 React 管理的元素进行修改、添加子元素、从中删除子元素会导致不一致的视觉结果，或与上述类似的崩溃。
>
> 4、但是，这并不意味着你完全不能这样做。它需要谨慎。 **你可以安全地修改 React 没有理由 更新的部分 DOM。** 例如，如果某些 `<div>` 在 JSX 中始终为空，React 将没有理由去变动其子列表。 因此，在那里手动增删元素是安全的。

### 8、总结

> - Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
> - 你通过传递 `<div ref={myRef}>` 指示 React 将 DOM 节点放入 `myRef.current`。
> - 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
> - 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 `forwardRef` 并将第二个 `ref` 参数传递给特定节点来暴露 DOM 节点。
> - 避免更改由 React 管理的 DOM 节点。
> - 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。

## 十、与Effects同步

> useEffect
>
> ​	**参数：**
>
> ​		回调函数
>
> ​		依赖项 -> []（能变化的变量）
>
> ```
> 		> 1、依赖项数组可以包含多个依赖项。只有当你指定的所有依赖项与之前渲染时的值完全相同时，React才会跳过重新运行效果。 
> 		>
> 		> 2、注意，你不能“选择”你的依赖项。如果你指定的依赖项与React基于你的Effect中的代码所期望的不匹配，你会得到一个lint错误。
> ```
>
> 
>
> ​	无返回值

> ### 你将会学习到
>
> - Effect是什么? 
> - Effect与事件有何不同 
> - 如何在组件中声明Effect 
> - 如何跳过不必要重新运行的Effect  
> - 为什么Effect在开发中运行两次，如何修复它们  
>
> 

### 1、什么是 Effect，它们与事件有何不同？

> 什么是 Effect，它们与事件有何不同?
>
> > **呈现代码：**(在描述UI中介绍)位于组件的顶层。在这里，您可以获取道具和状态，对它们进行转换，并返回希望在屏幕上看到的JSX。呈现代码必须是纯的。就像数学公式一样，它应该只计算结果，而不做任何其他事情。  
> >
> > **事件处理程序：**(在添加交互性中引入)是嵌套在组件中的函数，它们执行任务而不仅仅是计算它们。事件处理程序可能会更新输入字段，提交HTTP POST请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作(例如，单击按钮或键入)引起的“副作用”(它们改变程序的状态)。
>
> Effects允许您指定由呈现本身而不是由特定事件引起的副作用。在聊天中发送消息是一个事件，因为它是由用户单击特定按钮直接引起的。但是，设置服务器连接是一种Effect，因为无论哪个交互导致组件出现，它都应该发生。效果在屏幕更新后的提交结束时运行。这是将React组件与一些外部系统(如网络或第三方库)同步的好时机。 
>
> > 在这里和后面的文本中，大写的“Effect”指的是上面特定于react的定义，即由渲染引起的副作用。为了引用更广泛的编程概念，我们会说“副作用”。 

### 2、!!!你可能不需要效果

> **不要急于向组件添加特效。记住，特效通常是用来“跳出”你的React代码，并与一些外部系统同步。这包括浏览器api、第三方小部件、网络等等。如果您的Effect仅根据其他状态调整某些状态，则可能不需要Effect。** 

### 3、如何编写效果

> 要编写效果，请遵循以下三个步骤: 
>
> 1. **声明一个Effect**。默认情况下，你的Effect将在每次渲染后运行。 
> 2. **指定Effect依赖项**。大多数Effect应该只在需要时重新运行，而不是在每次渲染之后。例如，淡入动画应该只在组件出现时触发。连接和断开到聊天室的连接应该仅在组件出现和消失时发生，或者当聊天室更改时发生。您将了解如何通过指定依赖项来控制它。
> 3. **如果需要，添加清理**。一些特效需要指定如何停止、撤销或清理它们正在做的事情。例如，“连接”需要“断开”，“订阅”需要“取消订阅”，“获取”需要“取消”或“忽略”。您将了解如何通过返回一个清理函数来实现这一点。

#### 第一步： 声明效果

> 要在组件中声明 Effect，请从 React导入[`useEffect`Hook ：](https://zh-hans.react.dev/reference/react/useEffect) 
>
> ```js
> import { useEffect } from 'react';
> ```
>
> 然后，在组件的顶层调用它，并将一些代码放入 Effect 中： 
>
> ```js
> function MyComponent() {
>   useEffect(() => {
>     // 这里的代码将在每次渲染后运行
>   });
>   return <div />;
> }
> ```

#### **陷阱**（无限循环）

> > 默认情况下，**效果在每次渲染后运行**。这就是为什么这样的代码会产生一个无限循环: 
> >
> > ```js
> > const [count, setCount] = useState(0);
> > useEffect(() => {
> >   setCount(count + 1);
> > }); // 这个的依赖项是count 所以count会一直更新下去
> > // 另一种情况
> > 
> >   const [firstName, setFirstName] = useState('Taylor');
> >   const [lastName, setLastName] = useState('Swift');
> >   const [fullName, setFullName] = useState('');
> >   useEffect(() => {
> >     console.log(fullName) // 打印不算逻辑代码，react会直接过滤掉console里面引用的state
> >     setFullName(firstName + ' ' + lastName);
> >   }) // useEffect收集的依赖只有 firstName 和 lastName 所以这里不会产生无限渲染
> > ```
> >
> > 默认情况下，效果在每次渲染后运行。这就是为什么这样的代码会产生一个无限循环:效果作为渲染的结果运行。设置状态触发呈现。在Effect中立即设置状态就像给自己插上电源插座一样。Effect运行，它设置状态，状态导致重新呈现，状态导致Effect运行，它再次设置状态，这导致另一次重新呈现，以此类推。 
>
> 

#### 第二步： 指定Effect依赖项

> 默认情况下，效果在每次渲染后运行。通常，这不是你想要的: 
>
> > 1、有时候，它很慢。与外部系统同步并不总是即时的，所以除非必要，否则您可能希望跳过此操作。例如，您不希望每次击键时都重新连接到聊天服务器。 
> >
> > 2、有时候，这是错误的。例如，您不希望在每次击键时触发组件渐入动画。动画应该只在组件第一次出现时播放一次。
> >
> > > **组件中的所有值(包括props、state和组件主体中的变量)都是响应式的。任何响应值都可以在重新渲染时改变，所以这些响应值都可以作为Effect的依赖项。** 
>
> *您可以通过将依赖项*数组指定为调用的第二个参数来告诉 React**跳过不必要的重新运行 Effect**。
>
> ```
>   useEffect(() => {
>     // ...
>   }, [...]);
> ```
>
> 依赖项数组可以包含多个依赖项。*如果您指定的所有*依赖项的值与上一次渲染期间的值完全相同，React 只会跳过重新运行 Effect 。React 使用[`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)来比较依赖项的值。有关详细信息，请参阅[`useEffect`参考资料。](https://zh-hans.react.dev/reference/react/useEffect#reference)  
>
> 注意，你不能“选择”你的依赖项。如果你指定的依赖项与React基于你的Effect中的代码所期望的不匹配，你会得到一个lint错误。这有助于捕获代码中的许多错误。如果您不希望某些代码重新运行，请编辑效果代码本身，使其不“需要”依赖项。 、
>
> > #### 陷阱
> >
> > *没有依赖数组和空* 依赖数组的行为`[]`是不同的： 
> >
> > ```js
> > useEffect(() => {
> >   // 这在每次渲染后运行
> > });
> > 
> > useEffect(() => {
> >   // 这只在挂载时运行(当组件出现时)。
> > }, []);
> > 
> > useEffect(() => {
> >   // 这在mount上运行，如果a或b自上次渲染以来发生了变化将重新运行
> > }, [a, b]);
> > ```
> >
> > #### 为什么从依赖项数组中省略了 ref？
> >
> > > 此 Effect*同时* `ref`使用和`isPlaying`，但仅`isPlaying`声明为依赖项： 
> > >
> > > ```js
> > > function VideoPlayer({ src, isPlaying }) {
> > >   const ref = useRef(null);
> > >   useEffect(() => {
> > >     if (isPlaying) {
> > >       ref.current.play();
> > >     } else {
> > >       ref.current.pause();
> > >     }
> > >   }, [isPlaying]);
> > > ```
> > >
> > > 这是因为ref对象有一个稳定的标识:React保证在每次渲染时你总是从相同的useRef调用中获得相同的对象。它永远不会改变，所以它本身永远不会导致Effect重新运行。因此，是否包含它并不重要。包括它也很好: 
> > >
> > > ```
> > > function VideoPlayer({ src, isPlaying }) {
> > >   const ref = useRef(null);
> > >   useEffect(() => {
> > >     if (isPlaying) {
> > >       ref.current.play();
> > >     } else {
> > >       ref.current.pause();
> > >     }
> > >   }, [isPlaying, ref]);
> > > ```
> > >
> > > useState返回的set函数也具有稳定的标识，因此您经常会看到它们也从依赖项中被省略。如果过滤器允许您省略依赖项而不会出现错误，那么这样做是安全的。 
> > >
> > > **省略始终稳定的依赖关系只有在检查器可以“看到”对象是稳定的情况下才有效。**例如，如果ref是从父组件传入的，则必须在依赖项数组中指定它。然而，这很好，因为您无法知道父组件是否总是传递相同的ref，还是有条件地传递几个ref中的一个。所以你的效果将取决于哪个ref通过。

#### 第三步： 根据需要添加清理

> **React将在每次Effect再次运行之前调用你的清理函数，并在组件卸载(被移除)时调用最后一次。** 
>
> > 具体解释： https://zh-hans.react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
>
> ```js
>   useEffect(() => {
>     const connection = createConnection();
>     connection.connect(); // 连接聊天室
>     return () => { // 清理函数
>       connection.disconnect(); // 退出聊天室
>     };
>   }, []);
> ```
>
> 

### 4、在开发过程中如何处理Effect触发两次?

> React故意在开发过程中重新安装组件，以查找上一个示例中的错误。正确的问题不是“如何运行一次效果”，而是“如何修复我的效果，使其在重新安装后工作”。 
>
> 通常，答案是实现清理函数。清理函数应该停止或撤销Effect正在做的任何事情。经验法则是，用户不应该能够区分一次运行的Effect(如在生产中)和设置→清理→设置序列(如在开发中看到的)。

#### 1、控制非react小部件

> 注意，在这种情况下不需要清理。在开发中，React将调用Effect两次，但这不是问题，因为使用相同的值调用setZoomLevel两次不会做任何事情。它可能会稍微慢一些，但这并不重要，因为它不会在生产中不必要地重新安装。 
>
> ```js
> useEffect(() => {
>  const map = mapRef.current; // ref是固定的值
>  map.setZoomLevel(zoomLevel);
> }, [zoomLevel]);
> ```
>
> 有些api可能不允许您在一行中调用它们两次。例如，内置<dialog>元素的showModal方法如果调用两次就会抛出异常。实现清理功能并使其关闭对话框 
>
> ```js
> useEffect(() => {
>  const dialog = dialogRef.current;
>  dialog.showModal(); // 连续调用两次会报错
>  return () => dialog.close(); // 所以需要清理函数
> }, []);
> ```
>
> 在开发中，您的Effect将调用showModal()，然后立即执行close()，又再次调用showModal()。这与调用一次showModal()具有相同的用户可见行为，就像您在生产中看到的那样。 

#### 2、订阅事件

> 如果您的 Effect 订阅了某些东西，清理函数应该取消订阅： 
>
> ```js
> useEffect(() => {
>   function handleScroll(e) {
>     console.log(window.scrollX, window.scrollY);
>   }
>   window.addEventListener('scroll', handleScroll);
>   return () => window.removeEventListener('scroll', handleScroll);
> }, []);
> 
> ```
>
> 在开发中，您的 Effect 将调用`addEventListener()`，然后立即调用`removeEventListener()`，然后`addEventListener()`再次使用相同的处理程序。因此一次只有一个活动订阅。`addEventListener()`这与在生产中调用一次具有相同的用户可见行为。 

#### 3、触发动画

> 如果您的 Effect 对某些内容进行动画处理，清理函数应将动画重置为初始值： 
>
> ```js
> useEffect(() => {
>   const node = ref.current;
>   node.style.opacity = 1; // Trigger the animation
>   return () => {
>     node.style.opacity = 0; // Reset to the initial value
>   };
> }, []);
> ```
>
> 在开发中，不透明度将设置为1，然后设置为0，然后再次设置为1。这应该具有与直接将其设置为1相同的用户可见行为，这是在生产中会发生的情况。如果你使用支持渐变的第三方动画库，你的清理函数应该将时间轴重置为初始状态。 

#### 4、获取数据

> 如果你的Effect fetches 了一些东西，清理函数应该中止 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 或者忽略它的结果: 
>
> ```js
> useEffect(() => {
>   let ignore = false;
> 
>   async function startFetching() {
>     const json = await fetchTodos(userId);
>     if (!ignore) { // 在严格模式下组件会渲染两次，确保组件的稳定性。这个的操作是让第二次请求的数据不在赋值，因为生产环境组件只渲染一次
>       setTodos(json);
>     }
>   }
> 
>   startFetching();
> 
>   return () => {
>     ignore = true;
>   };
> }, [userId]);
> ```
>
> **在开发中，您将在“网络”选项卡中看到两个提取。**没有什么不妥。使用上述方法，第一个 Effect 将立即被清理，因此它的变量副本`ignore`将被设置为`true`. 因此，即使有额外的请求，也不会因为`if (!ignore)`检查而影响状态。
>
> **在生产中，只会有一个请求。**如果开发中的第二个请求困扰您，最好的方法是使用一个解决方案，该解决方案可以对请求进行重复数据删除并在组件之间缓存它们的响应。

#### 5、发送分析

> 考虑在页面访问时发送分析事件的代码： 
>
> ```
> useEffect(() => {
>  logVisit(url); // Sends a POST request
> }, [url]);
> ```
>
> 在开发中，每个URL将调用logVisit两次，因此您可能会尝试修复这个问题。我们建议保持这段代码的原样。与前面的示例一样，运行一次和运行两次之间没有用户可见的行为差异。从实用的角度来看，logVisit不应该在开发中做任何事情，因为您不希望来自开发机器的日志影响生产指标。每次保存文件时，组件都会重新装载，因此无论如何，它都会记录开发过程中的额外访问。 

#### 6、不使用“Effect”:初始化应用程序

> 一些逻辑应该只在应用程序启动时运行一次。你可以把它放在你的组件之外 
>
> ```js
> if (typeof window !== 'undefined') { // Check if we're running in the browser.
>   checkAuthToken();
>   loadDataFromLocalStorage();
> }
> 
> function App() {
>   // ...
> }
> ```
>
> 这保证了此类逻辑仅在浏览器加载页面后运行一次。 

#### 7、不使用Effect: 购买产品

> 有时，即使您编写了一个清理函数，也无法防止两次运行Effect所产生的用户可见的后果。例如，也许你的Effect发送一个POST请求，比如购买一个产品: 
>
> ```js
> useEffect(() => {
>   // 🔴 Wrong: 此Effect在开发过程中触发两次，暴露了代码中的问题。初始化时商品被购买了两次，这是我们不需要的
>   fetch('/api/buy', { method: 'POST' });
> }, []);
> 
> ```
>
> 购买不是由渲染引起的;它是由特定的相互作用引起的。它应该只在用户按下按钮时运行。删除Effect并将/api/buy请求移动到buy按钮事件处理程序中: 
>
> ```js
>   function handleClick() {
>     // ✅ 购买是一个事件，因为它是由特定的交互引起的。
>     fetch('/api/buy', { method: 'POST' });
>   }
> ```
>
> **这说明如果重新挂载破坏了应用程序的逻辑，这通常会发现现有的错误。**从用户的角度来看，访问一个页面与返回该页面、单击一个链接并按下后退没有什么不同。React 通过在开发中重新安装它们来验证您的组件是否遵守此原则。 

### 5、在 Effects 中获取数据的好的替代方法是什么？

> `fetch`在 Effects 中编写调用是一种[流行的获取数据的方式](https://www.robinwieruch.de/react-hooks-fetch-data/)，尤其是在完全客户端的应用程序中。然而，这是一种非常手动的方法，它有很大的缺点： 
>
> - **Effect不在服务器上运行。**这意味着初始服务器呈现的 HTML 将仅包含没有数据的加载状态。客户端计算机必须下载所有 JavaScript 并呈现您的应用程序，然后才发现它现在需要加载数据。这不是很有效。
> - **直接在 Effects 中获取可以轻松创建“网络瀑布”。**您渲染父组件，它获取一些数据，渲染子组件，然后它们开始获取数据。如果网络不是很快，这比并行获取所有数据要慢得多。
> - **直接在 Effects 中获取通常意味着您不需要预加载或缓存数据。**例如，如果组件卸载然后再次安装，则它必须再次获取数据。
> - **这不是很符合人体工程学。**`fetch`在以一种不会出现竞争条件等错误的方式编写调用时，会涉及相当多的样板代码[。](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
>
> 这个缺点列表并不是 React 特有的。它适用于使用任何库在 mount 上获取数据。与路由一样，要做好数据获取并非易事，因此我们推荐以下方法：
>
> - **如果您使用框架，请使用其内置的数据获取机制。**现代 React 框架集成了高效的数据获取机制，不会出现上述问题。
> - **否则，请考虑使用或构建客户端缓存。**流行的开源解决方案包括[React Query](https://tanstack.com/query/latest)、[useSWR](https://swr.vercel.app/)和[React Router 6.4+。](https://beta.reactrouter.com/en/main/start/overview)您也可以构建自己的解决方案，在这种情况下，您可以在幕后使用 Effects，但添加用于删除重复请求、缓存响应和避免网络瀑布（通过预加载数据或将数据需求提升到路由）的逻辑。
>
> 如果这些方法都不适合您，您可以继续直接在 Effects 中获取数据。

### 6、总结

> **1、与事件不同，Effects是由呈现本身而不是特定的交互引起的。** 
>
> **2、Effects允许您将组件与某些外部系统(第三方API、网络等)同步。**
>
> **3、默认情况下，Effects在每次渲染后运行(包括初始渲染)。** 
>
> **5、如果所有依赖项的值与上次渲染时的值相同，React将跳过该效果。**
>
> **6、你不能“选择”你的依赖。它们是由Effect中的代码决定的。** 
>
> **7、空依赖数组([])对应组件“mount”，即被添加到屏幕上。** 
>
> **8、在严格模式下，React挂载组件两次(仅在开发中!)以对效果进行压力测试。** 
>
> **9、如果您的Effect由于重新挂载而中断，则需要实现一个清理函数。** 
>
> **10、React将在Effect下次运行之前和卸载期间调用您的清理函数。**

## 十一、你可能不需要Effects

> Effect是React范式的逃生口。它们让你“走出”React，**并将你的组件与一些外部系统(如非React小部件、网络或浏览器DOM)同步**。如果不涉及外部系统(例如，如果你想在一些道具或状态改变时更新组件的状态)，你不应该需要Effect。删除不必要的Effect将使您的代码运行更快，更少出错。 
>
> > ### 你将会学习到
> >
> > - 为什么以及如何从您的组件中删除不必要的效果
> > - 如何在没有 Effects 的情况下缓存昂贵的计算
> > - 如何在没有 Effects 的情况下重置和调整组件状态
> > - 如何在事件处理程序之间共享逻辑
> > - 哪些逻辑应该移至事件处理程序
> > - 如何将更改通知父组件

### 1、如何删除不必要的Effects

>有两种常见情况不需要 Effects： 
>
>- **您不需要 Effects 来转换数据进行渲染。**在Effects中更改state时会重新渲染组件。因为Effects总是在组件渲染后执行，这时去更改state会出现无限循环渲染组件。
>- **您不需要 Effects 来处理用户事件（一般情况下）。** Effects是在渲染期间执行的hooks

#### 1、基于state或props更新state

> **当某些东西可以从现有的props或state中计算出来时，不要把它放在state中。相反，在渲染期间计算它。**这使您的代码更快（您避免了额外的“级联”更新）、更简单（您删除了一些代码）并且更不容易出错（您避免了由于不同状态变量彼此不同步而导致的错误）。 
>
> ````js
> export default function UpdateText() {
>   const [firstName, setFirstName] = useState('Taylor');
>   const [lastName, setLastName] = useState('Swift');
>   // const [fullName, setFullName] = useState('');  // 冗余状态
>   // 这种写法是冗余的，且效率低下。
>   // useEffect(() => {
>   //   setFullName(firstName + ' ' + lastName);
>   // }) // useEffect收集的依赖只有 firstName 和 lastName 所以这个不会产生无限渲染
> 
>   // 正确写法是
>   const fullName = firstName + ' ' + lastName
> 
>   return (
>     <>
>       <h1>{fullName}</h1>
>     </>
>   )
> }
> ````
>
> 

#### 2、缓存昂贵的计算

> 将昂贵的计算包装在Hook 中来缓存（或[“记忆”](https://en.wikipedia.org/wiki/Memoization)[`useMemo`](https://zh-hans.react.dev/reference/react/useMemo) ） ： 
>
> ````js
> import { useMemo, useState } from 'react';
> 
> function TodoList({ todos, filter }) {
>   const [newTodo, setNewTodo] = useState('');
>   // ✅ Does not re-run getFilteredTodos() unless todos or filter change
>   const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
>   // ...
> }
> ````
>
> **这告诉 React 你不希望内部函数重新运行，除非todosorfilter已经改变。**`getFilteredTodos()`React 会记住初始渲染期间的返回值。在下一次渲染期间，它将检查`todos`或 是否`filter`不同。如果它们与上次相同，`useMemo`将返回它存储的最后一个结果。但如果它们不同，React 将再次调用内部函数（并存储其结果）。 
>
> 您包装的函数[`useMemo`](https://zh-hans.react.dev/reference/react/useMemo)在渲染期间运行，因此这仅适用于[纯计算。](https://zh-hans.react.dev/learn/keeping-components-pure) 

#### 3、当props改变时重置所有state

>  
>
> ````js
> export default function ProfilePage({ userId }) {
>   return (
>     <Profile
>       userId={userId}
>       key={userId} // userId不变时状态将保存，userId变化时DOM将重新渲染（key）
>     />
>   );
> }
> 
> function Profile({ userId }) {
>   // ✅ This and any other state below will reset on key change automatically
>   const [comment, setComment] = useState('');
>   // ...
> }
> ````
>
> 通常，当相同的组件在相同的位置呈现时，React会保留状态。通过将userId作为键传递给Profile组件，您要求React将具有不同userId的两个Profile组件视为不应该共享任何状态的两个不同组件。每当键(您已经将其设置为userId)更改时，React将重新创建DOM并重置Profile组件及其所有子组件的状态。现在，当在配置文件之间导航时，评论字段将自动清除。 

#### 4、当道具改变时调整一些状态

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
>
> 一般使用的方式是复制一份相当于用上一次的数据和当前的数据进行比较，但**尽管此模式比 Effect 更有效，但大多数组件也不需要它。**不管你怎么做，基于 props 或其他状态调整状态都会使你的数据流更难理解和调试。始终检查您是否可以[使用键重置所有状态](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)或[在渲染期间计算所有内容](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)。 

#### 5、在事件处理程序之间共享逻辑

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers 了解即可一般不会这么做

#### 6、发送post请求

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#sending-a-post-request了解即可一般不会这么做

#### 7、计算链

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#chains-of-computations 了解即可

#### 8、初始化应用程序

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#initializing-the-application 了解即可

#### 9、通知父组件状态变化

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#notifying-parent-components-about-state-changes 一般使用状态提升

#### 10、将数据传递给父级

>https://zh-hans.react.dev/learn/you-might-not-need-an-effect#passing-data-to-the-parent了解即可

#### 11、订阅外部商店

> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#subscribing-to-an-external-store 了解即可

#### 12、获取数据

> ````js
> import {useState, useEffect} from 'react';
> export default function GetData() {
>   const [results, setResults] = useState([]);
>   const [page, setPage] = useState(1);
>   useEffect(() => {
>     let ignore = false;
>     console.log(1)
>     setTimeout(() => {
>       console.log(ignore)
>       if (!ignore) { // 连续点击按钮ignore始终都是true
>         // console.log(page);
>         setResults([...results, page + 1])
>       }
>     }, 1000)
>     return () => {
>       ignore = true;
>     console.log(3)
> 
>     }
>   }, [page])
> 
>   return (
>     <>
>       <button onClick={() => setPage(page + 1)}>Next Page</button>
>     </>
>   )
> }
> ````
>
> https://zh-hans.react.dev/learn/you-might-not-need-an-effect#fetching-data  理解并掌握

### 2、总结

> 1、如果你能在渲染过程中计算一些东西，你就不需要特效了。 
>
> 2、要缓存昂贵的计算，请添加useMemo而不是useEffect。 
>
> 3、要重置整个组件树的状态，可以向它传递一个不同的键。 
>
> 4、要在响应道具更改时重置特定的状态位，请在渲染期间设置它。 
>
> 5、因为显示组件而运行的代码应该在Effects中，其余的应该在事件中。 
>
> 6、如果需要更新多个组件的状态，最好在单个事件期间进行更新。 
>
> 7、每当您尝试同步不同组件中的状态变量时，请考虑提升状态。 
>
> 8、您可以使用Effects获取数据，但是您需要实现清理以避免竞争条件。
>
> 

## 十二、反应Effects的生命周期

> Effect 与组件有不同的生命周期。组件可以挂载、更新或卸载。Effect 只能做两件事：开始同步某些东西，然后停止同步它。如果你的 Effect 依赖于随时间变化的道具和状态，这个循环可能会发生多次。React 提供了一个 linter 规则来检查您是否正确指定了 Effect 的依赖项。这使您的 Effect 与最新的道具和状态保持同步 
>
> > ### 你将会学习到
> >
> > - Effect 的生命周期与组件的生命周期有何不同
> > - 如何孤立地考虑每个单独的 Effect
> > - 您的 Effect 何时需要重新同步，以及为什么
> > - 如何确定 Effect 的依赖项
> > - 值是反应性的意味着什么
> > - 空的依赖数组意味着什么
> > - React 如何使用 linter 验证您的依赖关系是否正确
> > - 当你不同意 linter 时该怎么办

### 1、Effect的生命周期

> 每个 React 组件都经历相同的生命周期：
>
> - 当一个组件被添加到屏幕上时它*就会被挂载。*
> - 组件在接收到新的道具或状态时*更新*，通常是为了响应交互。
> - 当组件从屏幕上移除时，组件*将卸载。*

### 2、组件主体中声明的所有变量都是响应式的

> 组件中的所有值(包括props、state和组件主体中的变量)都是响应式的。任何响应值都可以在重新渲染时改变，所以你需要将响应值作为Effect的依赖项。 

### 3、全局或可变值可以是依赖项吗？

> **可变值（包括全局变量）不是反应性的。**
>
> **像这样的可变值location.pathname不能是依赖项。**它是可变的，因此它可以完全在 React 渲染数据流之外随时更改。更改它不会触发组件的重新渲染。因此，即使您在依赖项中指定它，React 也*不会知道*在 Effect 发生变化时重新同步它。这也打破了 React 的规则，因为在渲染期间读取可变数据（也就是计算依赖项时）会破坏[渲染的纯度。](https://zh-hans.react.dev/learn/keeping-components-pure)相反，您应该使用[`useSyncExternalStore`.](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#subscribing-to-an-external-store)
>
> **像可变值ref.current或您从中读取的内容也不能成为依赖项。**自身返回的 ref 对象`useRef`可以是一个依赖项，但它的`current`属性是有意可变的。它使您可以[在不触发重新渲染的情况下跟踪某些内容。](https://zh-hans.react.dev/learn/referencing-values-with-refs)但是因为更改它不会触发重新渲染，所以它不是一个反应值，并且 React 不会知道在更改时重新运行您的 Effect。
>
> 正如您将在本页下方了解到的，linter 将自动检查这些问题。

### 4、不想重新同步时怎么办

> **Effect是反应性代码块。**当您在其中读取的值发生变化时，它们会重新同步。与每次交互只运行一次的事件处理程序不同，Effects 在需要同步时运行。
>
> **您不能“选择”您的依赖项。**您的依赖项必须包括您在 Effect 中读取的每个[反应值。](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive)linter 强制执行此操作。有时这可能会导致无限循环等问题，并导致您的 Effect 过于频繁地重新同步。不要通过抑制 linter 来解决这些问题！以下是尝试的方法：
>
> - **检查您的 Effect 是否代表一个独立的同步过程。**如果您的 Effect 不同步任何内容，[则可能没有必要。](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)如果它同步几个独立的东西，[把它分开。](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process)
> - **如果你想读取道具或状态的最新值而不对其做出“反应”并重新同步Effect，**你可以将你的效果分成一个反应部分（你将保留在Effect中）和一个非反应部分（您将提取到称为*Effect Event*的东西中）。[阅读有关将事件与效果分开的信息。](https://zh-hans.react.dev/learn/separating-events-from-effects)
> - **避免依赖对象和函数作为依赖项。**如果您在渲染期间创建对象和函数，然后从 Effect 中读取它们，则它们在每次渲染时都会不同。这将导致您的Effect每次都重新同步。[阅读有关从 Effects 中删除不必要的依赖项的更多信息。](https://zh-hans.react.dev/learn/removing-effect-dependencies)

### 5、总结

> - 组件可以挂载、更新和卸载。
> - 每个 Effect 都有一个独立于周围组件的生命周期。
> - 每个 Effect 都描述了一个可以*启动*和*停止的*单独同步过程。
> - 当您编写和阅读 Effects 时，请从每个单独的 Effect 的角度（如何开始和停止同步）而不是从组件的角度（它如何安装、更新或卸载）思考。
> - 在组件体内声明的值是“反应性的”。
> - 反应值应该重新同步效果，因为它们会随时间变化。
> - linter 验证 Effect 中使用的所有反应值是否都指定为依赖项。
> - linter 标记的所有错误都是合法的。总有一种方法可以修复代码以不违反规则。

## 十三、将事件与效果分开

> 事件处理程序仅在您再次执行相同的交互时重新运行。与事件处理程序不同，如果 Effects 读取的某些值（如 prop 或状态变量）与上次渲染期间的值不同，则 Effects 会重新同步。有时，您还需要两种行为的混合：一个 Effect 重新运行以响应某些值而不是其他值。  
>
> > **你将会学习到**
> >
> > - 如何在事件处理程序和 Effect 之间进行选择
> > - 为什么Effect 是响应性的，而事件处理程序不是
> > - 当您希望 Effect 的部分代码不响应时该怎么做
> > - 什么是Effect Events ，以及如何从您的Effect 中提取它们
> > - 如何使用 Effect Events 从 Effects 中读取最新的道具和状态

### 1、响应值和响应逻辑

> 在组件体内声明的道具、状态和变量称为反应值。在这个例子中，`serverUrl`不是反应值，而是`roomId`和`message`是。它们参与渲染数据流： 
>
> ````js
> const serverUrl = 'https://localhost:1234';
> 
> function ChatRoom({ roomId }) {
>   const [message, setMessage] = useState('');
>   // ...
> }
> ````
>
> - **事件处理程序中的逻辑不是响应性的。**它不会再次运行，除非用户再次执行相同的交互（例如单击）。事件处理程序可以读取响应值而无需对其更改做出“响应”。
> - **Effects 内部的逻辑是响应式的。**如果您的 Effect 读取一个响应值，[您必须将其指定为依赖项。](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values)然后，如果重新渲染导致该值发生变化，React 将使用新值重新运行 Effect 的逻辑。

### 2、事件处理程序内部的逻辑不是响应式的

> 从用户的角度来看，**对消息 的更改并不意味着他们要发送消息。**它仅表示用户正在键入。换句话说，发送消息的逻辑不应该是反应性的。它不应该仅仅因为无功值已经改变而再次运行。这就是它属于事件处理程序的原因： 
>
> ````js
>   function handleSendClick() {
>     sendMessage(message);
>   }
> ````
>
> 

### 3、Effects 内部的逻辑是反应式的

> ````js
>  const connection = createConnection(serverUrl, roomId);
>  connection.connect();
> ````

> 从用户的角度来看，**对 的更改确实roomId 意味着他们想要连接到不同的房间。**换句话说，连接到房间的逻辑应该是反应性的。您*希望*这些代码行“跟上”反应值，并在该值不同时再次运行。这就是它属于 Effect 的原因： 
>
> ````js
>   useEffect(() => {
>     const connection = createConnection(serverUrl, roomId);
>     connection.connect();
>     return () => {
>       connection.disconnect()
>     };
>   }, [roomId]);
> ````
>
> 

### 4、声明一个效果事件（实验性API）

>https://zh-hans.react.dev/learn/separating-events-from-effects#declaring-an-effect-event

## 十四、移除effect依赖

> 当您编写 Effect 时，linter 将验证您是否已将 Effect 读取的每个反应值（如 props 和 state）包含在 Effect 的依赖项列表中。这确保您的 Effect 与组件的最新道具和状态保持同步。不必要的依赖项可能会导致您的 Effect 运行过于频繁，甚至会造成无限循环。按照本指南检查并从您的效果中删除不必要的依赖项 
>
> > ### 你将会学习到
> >
> > - 如何修复无限效果依赖循环
> > - 当你想删除依赖项时该怎么做
> > - 如何从 Effect 中读取值而不对其做出“反应”
> > - 如何以及为什么要避免对象和函数依赖
> > - 为什么抑制依赖 linter 是危险的，应该怎么做

### 1、依赖项应与代码匹配

> https://zh-hans.react.dev/learn/removing-effect-dependencies#dependencies-should-match-the-code

###  2、要删除依赖项，请证明它不是依赖项

> https://zh-hans.react.dev/learn/removing-effect-dependencies#to-remove-a-dependency-prove-that-its-not-a-dependency

### 3、要更改依赖项，请更改代码

> https://zh-hans.react.dev/learn/removing-effect-dependencies#to-change-the-dependencies-change-the-code

### 4、为什么抑制依赖 linter 如此危险？

> https://zh-hans.react.dev/learn/removing-effect-dependencies#why-is-suppressing-the-dependency-linter-so-dangerous

### 5、要更改依赖项，请更改代码

> 您可能已经注意到工作流程中的一种模式：
>
> 1. 首先，您**更改 Effect 的代码**或声明反应值的方式。
> 2. 然后，您按照 linter 并调整依赖项以**匹配您更改的代码。**
> 3. 如果您对依赖项列表不满意，请**返回第一步**（并再次更改代码）。
>
> 最后一部分很重要。**如果要更改依赖项，请先更改周围的代码。**您可以将依赖项列表视为[您的 Effect 代码使用的所有反应值的列表。](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency)您不能*选择*将什么放在该列表中。该列表*描述了*您的代码。要更改依赖项列表，请更改代码。 

### 6、此代码是否应移至事件处理程序

> https://zh-hans.react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler

### 7、您的 Effect 是否在做几件不相关的事情？

> https://zh-hans.react.dev/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things

### 8、你在读一些状态来计算下一个状态吗？

> https://zh-hans.react.dev/learn/removing-effect-dependencies#are-you-reading-some-state-to-calculate-the-next-state

### 9、你想读取一个值而不对其变化做出“反应”吗？

> https://zh-hans.react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes

### 10、从道具包装事件处理程序

> https://zh-hans.react.dev/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props

### 11、分离反应性和非反应性代码

> https://zh-hans.react.dev/learn/removing-effect-dependencies#separating-reactive-and-non-reactive-code

### 12、一些无功值是否会无意中改变？

> https://zh-hans.react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes

### 13、总结

> - 依赖项应始终与代码匹配。
> - 当您对依赖项不满意时，您需要编辑的是代码。
> - 抑制 linter 会导致非常混乱的错误，您应该始终避免它。
> - 要删除依赖项，您需要向 linter“证明”它不是必需的。
> - 如果某些代码应该运行以响应特定的交互，请将该代码移至事件处理程序。
> - 如果您的 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect。
> - 如果你想根据以前的状态更新一些状态，传递一个更新函数。
> - 如果您想读取最新值而不对其进行“反应”，请从您的效果中提取一个效果事件。
> - 在 JavaScript 中，如果对象和函数是在不同时间创建的，则它们被认为是不同的。
> - 尽量避免对象和函数依赖。将它们移到组件外或 Effect 内。















































































