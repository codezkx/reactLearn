## 一、使用 ref 引用值

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
> ````js
> import { useRef } from 'react';
> ````
>
> 在你的组件内，调用 `useRef` Hook 并传入你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”： 
>
> ````js
> const ref = useRef(0);
> 
> // 返回一个对象
> { 
>   current: 0 // 你向 useRef 传入的值
> }
> ````
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

## 二、使用ref操作DOM

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
> ````
> import { useRef } from 'react';
> ````
>
> 然后，在你的组件中使用它声明一个 ref： 
>
> ````
> const myRef = useRef(null);
> ````
>
> 最后，将其作为 `ref` 属性传给 DOM 节点： 
>
> ```
> <div ref={myRef}>
> ```
>
> `useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。然后，你可以从 [事件处理器](https://zh-hans.react.dev/learn/responding-to-events) 访问此 DOM 节点，并使用在其上定义的内置[浏览器 API](https://developer.mozilla.org/docs/Web/API/Element)。 
>
> ````
> // 你可以使用任意浏览器 API，例如：
> myRef.current.scrollIntoView();
> ````
>
> ### 使文本输入框获得焦点
>
> ````js
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
> ````
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
> ````
> <ul>
>   {items.map((item) => {
>     // 行不通！
>     const ref = useRef(null);
>     return <li ref={ref} />;
>   })}
> </ul>
> ````
>
> **这是因为 Hook 只能在组件的顶层被调用。不能在循环语句、条件语句或 `map()` 函数中调用 `useRef`**  
>
> ####  解决方案
>
> > 一种可能的解决方案是用一个 ref 引用其父元素，然后用 DOM 操作方法如 [`querySelectorAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 来寻找它的子节点。然而，这种方法很脆弱，如果 DOM 结构发生变化，可能会失效或报错。 
> >
> >  
> >
> > 另一种解决方案是**将函数传递给 ref 属性**。这称为 [`ref` 回调](https://zh-hans.react.dev/reference/react-dom/components/common#ref-callback)。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 `null` 。这使你可以维护自己的数组或 [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，并通过其索引或某种类型的 ID 访问任何 ref。 
> >
> > ````js
> > // node 表示对应的ref  注意这里是ref回调才能获取到列表中的ref
> > ref={(node => {
> >     const map = getMap()
> >     if (node) {
> >       map.set(cat.id, node);
> >     } else {
> >       map.delete(cat.id)
> >     }
> >  })}
> > ````
> >
> > 

### 3、访问另一个组件的DOM节点

> 当你将 ref 放在像 `<input />` 这样输出浏览器元素的内置组件上时，React 会将该 ref 的 `current` 属性设置为相应的 DOM 节点（例如浏览器中实际的 `<input />` ）。
>
> 但是，如果你尝试将 ref 放在 **你自己的** 组件上，例如 `<MyInput />`，默认情况下你会得到 `null`。
>
> #### 使用fofwardRef获取子组件中对应元素ref
>
> ````js
> const MyInput = forwardRef((props, ref) => {
>   return <input {...props} ref={ref} />;
> });
> ````
>
> > 1. `<MyInput ref={inputRef} />` 告诉 React 将对应的 DOM 节点放入 `inputRef.current` 中。但是，这取决于 `MyInput` 组件是否允许这种行为， 默认情况下是不允许的。
> > 2. `MyInput` 组件是使用 `forwardRef` 声明的。 **这让从上面接收的 inputRef 作为第二个参数 ref 传入组件**，第一个参数是 `props` 。
> > 3. `MyInput` 组件将自己接收到的 `ref` 传递给它内部的 `<input>`。
> >
> > ````js
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
> > ````
> >
> > 

### 4、使用命令句柄暴露一部分 API 

> 在上面的例子中，`MyInput` 暴露了原始的 DOM 元素 input。这让父组件可以对其调用`focus()`。然而，这也让父组件能够做其他事情 —— 例如，改变其 CSS 样式。在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 做到这一点： 
>
> ````js
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
> ````
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

## 三、与Effects同步

> useEffect
>
> ​	**参数：**
>
> ​		回调函数
>
> ​		依赖项 -> []（能变化的变量）
>
> 			> 1、依赖项数组可以包含多个依赖项。只有当你指定的所有依赖项与之前渲染时的值完全相同时，React才会跳过重新运行效果。 
> 			>
> 			> 2、注意，你不能“选择”你的依赖项。如果你指定的依赖项与React基于你的Effect中的代码所期望的不匹配，你会得到一个lint错误。
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
> ````js
> import { useEffect } from 'react';
> ````
>
> 然后，在组件的顶层调用它，并将一些代码放入 Effect 中： 
>
> ````js
> function MyComponent() {
>   useEffect(() => {
>     // 这里的代码将在每次渲染后运行
>   });
>   return <div />;
> }
> ````
>
> > ### **陷阱**
> >
> > 默认情况下，**效果在每次渲染后运行**。这就是为什么这样的代码会产生一个无限循环: 
> >
> > ````
> > const [count, setCount] = useState(0);
> > useEffect(() => {
> >   setCount(count + 1);
> > });
> > ````
> >
> > 默认情况下，效果在每次渲染后运行。这就是为什么这样的代码会产生一个无限循环:效果作为渲染的结果运行。设置状态触发呈现。在Effect中立即设置状态就像给自己插上电源插座一样。Effect运行，它设置状态，状态导致重新呈现，状态导致Effect运行，它再次设置状态，这导致另一次重新呈现，以此类推。 

#### 第二步： 指定Effect依赖项

> 默认情况下，效果在每次渲染后运行。通常，这不是你想要的: 
>
> > 1、有时候，它很慢。与外部系统同步并不总是即时的，所以除非必要，否则您可能希望跳过此操作。例如，您不希望每次击键时都重新连接到聊天服务器。 
> >
> > 2、有时候，这是错误的。例如，您不希望在每次击键时触发组件渐入动画。动画应该只在组件第一次出现时播放一次。 
>
> *您可以通过将依赖项*数组指定为调用的第二个参数来告诉 React**跳过不必要的重新运行 Effect**。
>
>  ````
>   useEffect(() => {
>     // ...
>   }, [...]);
>  ````
>
> 依赖项数组可以包含多个依赖项。*如果您指定的所有*依赖项的值与上一次渲染期间的值完全相同，React 只会跳过重新运行 Effect 。React 使用[`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)来比较依赖项的值。有关详细信息，请参阅[`useEffect`参考资料。](https://zh-hans.react.dev/reference/react/useEffect#reference)  
>
> 注意，你不能“选择”你的依赖项。如果你指定的依赖项与React基于你的Effect中的代码所期望的不匹配，你会得到一个lint错误。这有助于捕获代码中的许多错误。如果您不希望某些代码重新运行，请编辑效果代码本身，使其不“需要”依赖项。 、
>
> >#### 陷阱
> >
> >*没有依赖数组和空* 依赖数组的行为`[]`是不同的： 
> >
> >```js
> >useEffect(() => {
> >  // 这在每次渲染后运行
> >});
> >
> >useEffect(() => {
> >  // 这只在挂载时运行(当组件出现时)。
> >}, []);
> >
> >useEffect(() => {
> >  // 这在mount上运行，如果a或b自上次渲染以来发生了变化将重新运行
> >}, [a, b]);
> >```
> >
> >#### 为什么从依赖项数组中省略了 ref？
> >
> >> 此 Effect*同时* `ref`使用和`isPlaying`，但仅`isPlaying`声明为依赖项： 
> >>
> >> ````js
> >> function VideoPlayer({ src, isPlaying }) {
> >>   const ref = useRef(null);
> >>   useEffect(() => {
> >>     if (isPlaying) {
> >>       ref.current.play();
> >>     } else {
> >>       ref.current.pause();
> >>     }
> >>   }, [isPlaying]);
> >> ````
> >>
> >> 这是因为ref对象有一个稳定的标识:React保证在每次渲染时你总是从相同的useRef调用中获得相同的对象。它永远不会改变，所以它本身永远不会导致Effect重新运行。因此，是否包含它并不重要。包括它也很好: 
> >>
> >> ```
> >> function VideoPlayer({ src, isPlaying }) {
> >>   const ref = useRef(null);
> >>   useEffect(() => {
> >>     if (isPlaying) {
> >>       ref.current.play();
> >>     } else {
> >>       ref.current.pause();
> >>     }
> >>   }, [isPlaying, ref]);
> >> ```
> >>
> >> useState返回的set函数也具有稳定的标识，因此您经常会看到它们也从依赖项中被省略。如果过滤器允许您省略依赖项而不会出现错误，那么这样做是安全的。 
> >>
> >> **省略始终稳定的依赖关系只有在检查器可以“看到”对象是稳定的情况下才有效。**例如，如果ref是从父组件传入的，则必须在依赖项数组中指定它。然而，这很好，因为您无法知道父组件是否总是传递相同的ref，还是有条件地传递几个ref中的一个。所以你的效果将取决于哪个ref通过。

#### 第三步： 根据需要添加清理

> **React将在每次Effect再次运行之前调用你的清理函数，并在组件卸载(被移除)时调用最后一次。** 
>
> > 具体解释： https://zh-hans.react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
>
> ````js
>   useEffect(() => {
>     const connection = createConnection();
>     connection.connect(); // 连接聊天室
>     return () => { // 清理函数
>       connection.disconnect(); // 退出聊天室
>     };
>   }, []);
> ````
>
> 

### 4、在开发过程中如何处理Effect触发两次? 

> React故意在开发过程中重新安装组件，以查找上一个示例中的错误。正确的问题不是“如何运行一次效果”，而是“如何修复我的效果，使其在重新安装后工作”。 
>
> 通常，答案是实现清理函数。清理函数应该停止或撤销Effect正在做的任何事情。经验法则是，用户不应该能够区分一次运行的Effect(如在生产中)和设置→清理→设置序列(如在开发中看到的)。

#### 1、控制非react小部件

>  注意，在这种情况下不需要清理。在开发中，React将调用Effect两次，但这不是问题，因为使用相同的值调用setZoomLevel两次不会做任何事情。它可能会稍微慢一些，但这并不重要，因为它不会在生产中不必要地重新安装。 
>
> ```js
> useEffect(() => {
>   const map = mapRef.current; // ref是固定的值
>   map.setZoomLevel(zoomLevel);
> }, [zoomLevel]);
> ```
>
> 有些api可能不允许您在一行中调用它们两次。例如，内置<dialog>元素的showModal方法如果调用两次就会抛出异常。实现清理功能并使其关闭对话框 
>
> ````js
> useEffect(() => {
>   const dialog = dialogRef.current;
>   dialog.showModal(); // 连续调用两次会报错
>   return () => dialog.close(); // 所以需要清理函数
> }, []);
> ````
>
> 在开发中，您的Effect将调用showModal()，然后立即执行close()，又再次调用showModal()。这与调用一次showModal()具有相同的用户可见行为，就像您在生产中看到的那样。 

#### 2、订阅事件

> 如果您的 Effect 订阅了某些东西，清理函数应该取消订阅： 
>
> ````js
> useEffect(() => {
>   function handleScroll(e) {
>     console.log(window.scrollX, window.scrollY);
>   }
>   window.addEventListener('scroll', handleScroll);
>   return () => window.removeEventListener('scroll', handleScroll);
> }, []);
> 
> ````
>
> 在开发中，您的 Effect 将调用`addEventListener()`，然后立即调用`removeEventListener()`，然后`addEventListener()`再次使用相同的处理程序。因此一次只有一个活动订阅。`addEventListener()`这与在生产中调用一次具有相同的用户可见行为。 

#### 3、触发动画

> 如果您的 Effect 对某些内容进行动画处理，清理函数应将动画重置为初始值： 
>
> ````js
> useEffect(() => {
>   const node = ref.current;
>   node.style.opacity = 1; // Trigger the animation
>   return () => {
>     node.style.opacity = 0; // Reset to the initial value
>   };
> }, []);
> ````
>
> 在开发中，不透明度将设置为1，然后设置为0，然后再次设置为1。这应该具有与直接将其设置为1相同的用户可见行为，这是在生产中会发生的情况。如果你使用支持渐变的第三方动画库，你的清理函数应该将时间轴重置为初始状态。 

#### 4、获取数据

> 如果你的Effect fetches 了一些东西，清理函数应该中止 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 或者忽略它的结果: 
>
> ````js
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
> ````
>
> **在开发中，您将在“网络”选项卡中看到两个提取。**没有什么不妥。使用上述方法，第一个 Effect 将立即被清理，因此它的变量副本`ignore`将被设置为`true`. 因此，即使有额外的请求，也不会因为`if (!ignore)`检查而影响状态。
>
> **在生产中，只会有一个请求。**如果开发中的第二个请求困扰您，最好的方法是使用一个解决方案，该解决方案可以对请求进行重复数据删除并在组件之间缓存它们的响应。

#### 5、发送分析

>  考虑在页面访问时发送分析事件的代码： 
>
> ```
> useEffect(() => {
>   logVisit(url); // Sends a POST request
> }, [url]);
> ```
>
> 在开发中，每个URL将调用logVisit两次，因此您可能会尝试修复这个问题。我们建议保持这段代码的原样。与前面的示例一样，运行一次和运行两次之间没有用户可见的行为差异。从实用的角度来看，logVisit不应该在开发中做任何事情，因为您不希望来自开发机器的日志影响生产指标。每次保存文件时，组件都会重新装载，因此无论如何，它都会记录开发过程中的额外访问。 

#### 6、不使用“Effect”:初始化应用程序

> 一些逻辑应该只在应用程序启动时运行一次。你可以把它放在你的组件之外 
>
> ````js
> if (typeof window !== 'undefined') { // Check if we're running in the browser.
>   checkAuthToken();
>   loadDataFromLocalStorage();
> }
> 
> function App() {
>   // ...
> }
> ````
>
> 这保证了此类逻辑仅在浏览器加载页面后运行一次。 

#### 7、不使用Effect: 购买产品

> 有时，即使您编写了一个清理函数，也无法防止两次运行Effect所产生的用户可见的后果。例如，也许你的Effect发送一个POST请求，比如购买一个产品: 
>
> ````js
> useEffect(() => {
>   // 🔴 Wrong: 此Effect在开发过程中触发两次，暴露了代码中的问题。初始化时商品被购买了两次，这是我们不需要的
>   fetch('/api/buy', { method: 'POST' });
> }, []);
> 
> ````
>
> 购买不是由渲染引起的;它是由特定的相互作用引起的。它应该只在用户按下按钮时运行。删除Effect并将/api/buy请求移动到buy按钮事件处理程序中: 
>
> ````js
>   function handleClick() {
>     // ✅ 购买是一个事件，因为它是由特定的交互引起的。
>     fetch('/api/buy', { method: 'POST' });
>   }
> ````
>
> **这说明如果重新挂载破坏了应用程序的逻辑，这通常会发现现有的错误。**从用户的角度来看，访问一个页面与返回该页面、单击一个链接并按下后退没有什么不同。React 通过在开发中重新安装它们来验证您的组件是否遵守此原则。 

### 5、在 Effects 中获取数据的好的替代方法是什么？

>`fetch`在 Effects 中编写调用是一种[流行的获取数据的方式](https://www.robinwieruch.de/react-hooks-fetch-data/)，尤其是在完全客户端的应用程序中。然而，这是一种非常手动的方法，它有很大的缺点： 
>
>- **Effect不在服务器上运行。**这意味着初始服务器呈现的 HTML 将仅包含没有数据的加载状态。客户端计算机必须下载所有 JavaScript 并呈现您的应用程序，然后才发现它现在需要加载数据。这不是很有效。
>- **直接在 Effects 中获取可以轻松创建“网络瀑布”。**您渲染父组件，它获取一些数据，渲染子组件，然后它们开始获取数据。如果网络不是很快，这比并行获取所有数据要慢得多。
>- **直接在 Effects 中获取通常意味着您不需要预加载或缓存数据。**例如，如果组件卸载然后再次安装，则它必须再次获取数据。
>- **这不是很符合人体工程学。**`fetch`在以一种不会出现竞争条件等错误的方式编写调用时，会涉及相当多的样板代码[。](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
>
>这个缺点列表并不是 React 特有的。它适用于使用任何库在 mount 上获取数据。与路由一样，要做好数据获取并非易事，因此我们推荐以下方法：
>
>- **如果您使用框架，请使用其内置的数据获取机制。**现代 React 框架集成了高效的数据获取机制，不会出现上述问题。
>- **否则，请考虑使用或构建客户端缓存。**流行的开源解决方案包括[React Query](https://tanstack.com/query/latest)、[useSWR](https://swr.vercel.app/)和[React Router 6.4+。](https://beta.reactrouter.com/en/main/start/overview)您也可以构建自己的解决方案，在这种情况下，您可以在幕后使用 Effects，但添加用于删除重复请求、缓存响应和避免网络瀑布（通过预加载数据或将数据需求提升到路由）的逻辑。
>
>如果这些方法都不适合您，您可以继续直接在 Effects 中获取数据。

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

## 四、通过自定义钩子重用逻辑

> ### 你将会学习到
>
> - 什么是自定义 Hooks，以及如何编写自己的 Hooks
> - 如何重用组件之间的逻辑
> - 如何命名和构造您的自定义 Hook
> - 何时以及为何提取自定义 Hooks

### 1、自定义hooks：在组件之间共享逻辑

> 当两个组件的代码逻辑相同且需要订阅浏览器事件或featch数据时可以把相同逻辑整合到一个hooks中
>
> ```js
>   // StatusBar组件
>   const [isOnline, setIsOnline] = useState(true);
>   useEffect(() => {
>     function handleOnline() {
>       setIsOnline(true);
>     }
>     function handleOffline() {
>       setIsOnline(false);
>     }
>     window.addEventListener('online', handleOnline);
>     window.addEventListener('offline', handleOffline);
>     return () => {
>       window.removeEventListener('online', handleOnline);
>       window.removeEventListener('offline', handleOffline);
>     };
>   }, []);
> 
>   return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
>   
>   // SaveButton
>   const [isOnline, setIsOnline] = useState(true);
>   useEffect(() => {
>     function handleOnline() {
>       setIsOnline(true);
>     }
>     function handleOffline() {
>       setIsOnline(false);
>     }
>     window.addEventListener('online', handleOnline);
>     window.addEventListener('offline', handleOffline);
>     return () => {
>       window.removeEventListener('online', handleOnline);
>       window.removeEventListener('offline', handleOffline);
>     };
>   }, []);
> 
>   function handleSaveClick() {
>     console.log('✅ Progress saved');
>   }
> 
>   return (
>     <button disabled={!isOnline} onClick={handleSaveClick}>
>       {isOnline ? 'Save progress' : 'Reconnecting...'}
>     </button>
>   );
>  
>   // 相同逻辑整合成一个hooks
>     function useOnlineStatus() {
>       const [isOnline, setIsOnline] = useState(true);
>       useEffect(() => {
>         function handleOnline() {
>           setIsOnline(true);
>         }
>         function handleOffline() {
>           setIsOnline(false);
>         }
>         window.addEventListener('online', handleOnline);
>         window.addEventListener('offline', handleOffline);
>         return () => {
>           window.removeEventListener('online', handleOnline);
>           window.removeEventListener('offline', handleOffline);
>         };
>       }, []);
>       return isOnline;
>     }
> ```
>
> 

### 2、hooks命名以use开头

> React应用程序是由组件构建的。组件是由Hooks构建的，无论是内置的还是自定义的。您可能经常使用别人创建的自定义Hooks，但偶尔您也可能自己编写一个! 
>
> #### hooks命名规则
>
> > 1. **React 组件名称必须以大写字母开头，**例如`StatusBar`and `SaveButton`。React 组件还需要返回一些 React 知道如何显示的东西，比如一段 JSX。
> >
> > 2. 钩子名必须以use开头，后面跟着一个大写字母，比如[`useState`](https://zh-hans.react.dev/reference/react/useState) (内置)或useOnlineStatus(自定义，就像前面的页面一样)。钩子可以返回任意值。
> >
> > 3. 自定义hooks中至少调用一个hooks。 
> >
> >     
> >
> > 注意：
> >
> > > 如果您的 linter 是[为 React 配置的，](https://zh-hans.react.dev/learn/editor-setup#linting)它将强制执行此命名约定。向上滚动到上方的沙箱并将其重命名`useOnlineStatus`为`getOnlineStatus`. 请注意，linter 将不再允许您在其中调用`useState`或调用。`useEffect`只有 Hooks 和组件才能调用其他 Hooks！ 

### 3、自定义hooks允许您共享有状态逻辑，而不是状态本身 

> **自定义挂钩让您共享有状态逻辑，但不能共享状态本身。对 Hook 的每次调用都完全独立于对同一 Hook 的所有其他调用。** 
>
> ````js
> export function useFormInput(initialValue) {
>   const [value, setValue] = useState(initialValue);
> 
>   function handleChange(e) {
>     setValue(e.target.value);
>   }
> 
>   const inputProps = {
>     value: value,
>     onChange: handleChange
>   };
> 
>   return inputProps;
> }
> 
> export default function Form() {
>   const firstNameProps = useFormInput('Mary');
>   const lastNameProps = useFormInput('Poppins');
>    return (
>     <>
>       <label>
>         First name:
>         <input {...firstNameProps} />
>       </label>
>       <label>
>         Last name:
>         <input {...lastNameProps} />
>       </label>
>       <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
>     </>
>  }
> ````
>
> 上面的两个的状态虽然是同一个hook中执行的，但是react会将其分离，自定义hook只共享有状态的逻辑，不共享状态。 所以firstNameProps和lastNameProps编辑时是互不影响的。

### 4、在Hook之间传递响应值

>  自定义 Hooks 中的代码将在每次重新渲染组件时重新运行。这就是为什么像组件一样，自定义 Hooks[需要是纯的。](https://zh-hans.react.dev/learn/keeping-components-pure)将自定义 Hooks 代码视为组件主体的一部分！ 
>
> ````js
> export default function ChatRoom({ roomId }) {
>   const [serverUrl , setServerUrl] = useState('https://localhost:1234');
> 
>   useChatRoom({
>     roomId: roomId,
>     serverUrl: serverUrl  // serverUrl 内置hook的返回值传递给自定义hook
>   });
> ````
>
> 

### 5、将事件处理程序传递给自定义hooks

> 需要使用Effect Event(实验性) API
>
> https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks#passing-event-handlers-to-custom-hooks

### 6、何时使用自定义Hooks

> 每当您编写 Effect 时，请考虑将其包装在自定义 Hook 中是否会更清晰。[你不应该经常需要 Effects，](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)所以如果你正在写一个，这意味着你需要“走出 React”以与一些外部系统同步或做一些 React 没有内置 API 的事情. 将其包装到自定义 Hook 中可以让您准确地传达您的意图以及数据如何流经它 

### 7、自定义 Hooks 帮助您迁移到更好的模式

> https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-help-you-migrate-to-better-patterns   了解(没看懂)

### 8、总结

> - 自定义挂钩让您可以在组件之间共享逻辑。
> - 自定义挂钩的名称必须以`use`大写字母开头。
> - Custom Hooks 只共享状态逻辑，而不是状态本身。
> - 您可以将反应值从一个 Hook 传递到另一个 Hook，并且它们会保持最新。
> - 每次您的组件重新渲染时，所有 Hooks 都会重新运行。
> - 你的自定义 Hooks 的代码应该是纯净的，就像你的组件的代码一样。
> - 将自定义 Hook 接收到的事件处理程序包装到 Effect Events 中。
> - 不要创建像`useMount`. 保持他们的目的明确。
> - 如何以及在何处选择代码边界取决于您。

## 五、useCallback

> useCallback是一个React Hook，它可以让你在重新渲染之间缓存函数定义。 
>
> ````js
> const cachedFn = useCallback(fn, dependencies)
> ````
>
> - 参考
>   - [`useCallback(fn, dependencies)`](https://zh-hans.react.dev/reference/react/useCallback#usecallback)
> - 用法
>   - [跳过组件的重新渲染](https://zh-hans.react.dev/reference/react/useCallback#skipping-re-rendering-of-components)
>   - [从记忆回调更新状态](https://zh-hans.react.dev/reference/react/useCallback#updating-state-from-a-memoized-callback)
>   - [防止 Effect 过于频繁地触发](https://zh-hans.react.dev/reference/react/useCallback#preventing-an-effect-from-firing-too-often)
>   - [优化自定义 Hook](https://zh-hans.react.dev/reference/react/useCallback#optimizing-a-custom-hook)
> - 故障排除
>   - [每次我的组件渲染时，`useCallback`返回一个不同的函数](https://zh-hans.react.dev/reference/react/useCallback#every-time-my-component-renders-usecallback-returns-a-different-function)
>   - [我需要`useCallback`循环调用每个列表项，但这是不允许的](https://zh-hans.react.dev/reference/react/useCallback#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)
>
> #### 参数
>
> - `fn`：要缓存的函数值。它可以接受任何参数并返回任何值。React 将在初始渲染期间返回（而不是调用！）你的函数。`dependencies`在下一次渲染中，如果自上次渲染以来没有改变，React 将再次为您提供相同的功能。否则，它将为您提供您在当前渲染期间传递的功能，并将其存储起来以备日后重用。React 不会调用你的函数。该函数返回给您，因此您可以决定何时以及是否调用它。
> - `dependencies`：代码中引用的所有响应值的列表`fn`。响应式值包括 props、state 以及直接在组件主体内声明的所有变量和函数。如果你的 linter 是[为 React 配置的](https://zh-hans.react.dev/learn/editor-setup#linting)，它将验证每个响应值是否正确指定为依赖项。依赖项列表必须具有恒定数量的项目，并且像`[dep1, dep2, dep3]`. React 将使用比较算法将每个依赖项与其先前的值进行比较[`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)。
>
> #### 返回值
>
> 在初始渲染中，`useCallback`返回`fn`您传递的函数。
>
> 在随后的渲染中，它将返回上次渲染中已经存储的fn函数(如果依赖关系没有改变)，或者返回您在此渲染期间传递的fn函数。 
>
> #### 注意事项
>
> - `useCallback`是一个Hook，所以你只能**在你的组件顶层**或者你自己的Hooks中调用它。您不能在循环或条件内调用它。如果需要，提取一个新组件并将状态移入其中。
> - **除非有特定原因，否则**React不会丢弃缓存的函数。
>
> ## 用法
>
> > https://zh-hans.react.dev/reference/react/useCallback#usage

## 六、useDeferredValue

> - 参考
>   - [`useDeferredValue(value)`](https://zh-hans.react.dev/reference/react/useDeferredValue#usedeferredvalue)
> - 用法
>   - [在加载新内容时显示过时内容](https://zh-hans.react.dev/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading)
>   - [表明内容已过时](https://zh-hans.react.dev/reference/react/useDeferredValue#indicating-that-the-content-is-stale)
>   - [延迟部分 UI 的重新渲染](https://zh-hans.react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui)
>
>  参考
>
> ### `useDeferredValue(value)` 
>
> `useDeferredValue`在组件的顶层调用以获取该值的延迟版本。
>
> ````js
> import { useState, useDeferredValue } from 'react';
> 
> function SearchPage() {
>   const [query, setQuery] = useState('');
>   const deferredQuery = useDeferredValue(query); // 使用延迟值
>   // ...
> }
> ````
>
> #### 参数
>
> - `value`：您要延迟的值。它可以有任何类型。
>
> #### 返回值
>
> 在初始渲染期间，返回的延迟值将与您提供的值相同。在更新期间，React 将首先尝试使用旧值重新渲染（因此它将返回旧值），然后尝试在后台使用新值重新渲染（因此它将返回更新后的值）。（可用console 验证，表现和说明一致）
>
> ### 注意
>
> > 

### 1、在底层，延迟值是如何工作的? 

> 你可以把它想象成两个步骤: 
>
> > 1、首先，React使用新查询(“ab”)重新渲染，但使用旧的deferredQuery(仍然是“a”)。传递给结果列表的deferredQuery值被延迟:它“滞后于”查询值。 
> >
> > 2、在后台，React尝试将query和deferredQuery都更新为“ab”来重新渲染。如果这个重新渲染完成，React将在屏幕上显示它。但是，如果它挂起(“ab”的结果尚未加载)，React将放弃此渲染尝试，并在数据加载后再次重试此重新渲染。用户将一直看到过期的延迟值，直到数据准备好。 
>
> 延迟的“后台”呈现是可中断的。例如，如果您再次输入输入，React将放弃它并使用新值重新启动。React将始终使用最新提供的值。 
>
> 注意，每次击键仍然有一个网络请求。这里延迟的是显示结果(直到它们准备好)，而不是网络请求本身。即使用户继续输入，每次击键的响应也会被缓存，因此按Backspace是即时的，不会再次获取。

### 2、延迟部分 UI 的重新渲染

> 您也可以申请`useDeferredValue`作为性能优化。当你的 UI 的一部分重新呈现很慢，没有简单的方法来优化它，并且你想防止它阻塞 UI 的其余部分时，它很有用。 在某种情况下 `useDeferredValue`与memo配合使用体验是非常好的
>
> > 例子： https://zh-hans.react.dev/reference/react/useDeferredValue#examples
>
> > 假设您有一个文本字段和一个组件（如图表或长列表），它们在每次击键时重新呈现： 
> >
> > ````
> > function App() {
> >   const [text, setText] = useState('');
> >   return (
> >     <>
> >       <input value={text} onChange={e => setText(e.target.value)} />
> >       <SlowList text={text} />
> >     </>
> >   );
> > }
> > ````
> >
> > 首先，优化`SlowList`以在其道具相同时跳过重新渲染。为此，[将其包装在`memo`：](https://zh-hans.react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged) 
> >
> > > const SlowList = memo(function SlowList({ text }) {
> > >
> > >   // ...
> > >
> > > });
> >
> > 然而，这只有在SlowList道具与之前的渲染相同的情况下才有帮助。你现在面临的问题是，当它们不同时，当你需要显示不同的视觉输出时，它会很慢。 
> >
> > 具体地说，主要的性能问题是每当您在输入中输入时，SlowList都会接收到新的道具，并且重新呈现它的整个树会使键入感觉很混乱。在这种情况下，**useDeferredValue允许你优先更新输入(必须快)而不是更新结果列表(允许慢一些):** 
> >
> > ````
> > function App() {
> >   const [text, setText] = useState('');
> >   const deferredText = useDeferredValue(text);
> >   return (
> >     <>
> >       <input value={text} onChange={e => setText(e.target.value)} />
> >       <SlowList text={deferredText} />
> >     </>
> >   );
> > }
> > ````
> >
> > 这并不能使SlowList的重新呈现更快。然而，它告诉React，重新渲染列表可以被取消优先级，这样它就不会阻塞击键。列表将“落后于”输入，然后“迎头赶上”。与之前一样，React将尝试尽快更新列表，但不会阻止用户输入。 











































