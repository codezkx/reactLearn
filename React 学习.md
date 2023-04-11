### React 学习

## 一、初见React

### 1、第一个组件  

>  ````//package  配置{"name": "day02","version": "1.0.0","description": "","main": "index.js","scripts": {  "start": "react-scripts start",  "build": "react-scripts build",  "test": "react-scripts test",  "eject": "react-scripts eject"},"author": "","license": "ISC","dependencies": {  "react": "^18.2.0",  "react-dom": "^18.2.0",  "react-scripts": "^5.0.1"}}
>
>  ````js
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













































































































































