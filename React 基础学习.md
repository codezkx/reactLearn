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

### 第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action

>https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer#step-1-move-from-setting-state-to-dispatching-actions 查看官网例子  下面的步骤同步 。 同步查看day19天代码写法和自己写法的不同。

### 第 2 步: 编写一个 reducer 函数 

### 第 3 步: 在组件中使用 reducer











