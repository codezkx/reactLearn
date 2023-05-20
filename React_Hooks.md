# HOOKS

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
> ```js
> > 1、依赖项数组可以包含多个依赖项。只有当你指定的所有依赖项与之前渲染时的值完全相同时，React才会跳过重新运行效果。 
> 
> > 2、注意，你不能“选择”你的依赖项。如果你指定的依赖项与React基于你的Effect中的代码所期望的不匹配，你会得到一个lint错误。
> ```
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

> **不要急于向组件添加Effect。记住，特效通常是用来“跳出”你的React代码，并与一些外部系统同步。这包括浏览器api、第三方小部件、网络等等。如果您的Effect仅根据其他状态调整某些状态，则可能不需要Effect。** 

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
>   const deferredQuery = useDeferredValue(query); // 使用延迟值  只有query改变时useDeferredValue才会重新执行
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

## 七、useId

> `useId` 是一个 React Hook，可以生成传递给无障碍属性的唯一 ID。 
>
> ```js
> const id = useId()
> ```
>
> - 参考
>   - [`useId()`](https://zh-hans.react.dev/reference/react/useId#useid)
> - 用法
>   - [为无障碍属性生成唯一 ID](https://zh-hans.react.dev/reference/react/useId#generating-unique-ids-for-accessibility-attributes)
>   - [为多个相关元素生成 ID](https://zh-hans.react.dev/reference/react/useId#generating-ids-for-several-related-elements)
>   - [为所有生成的 ID 指定共享前缀](https://zh-hans.react.dev/reference/react/useId#specifying-a-shared-prefix-for-all-generated-ids)
>
>  参考 
>
> ###      `useId()` 
>
> ​	在组件的顶层调用 `useId` 生成唯一 ID：
>
> ```
> import { useId } from 'react';
> 
> function PasswordField() {
>   const passwordHintId = useId();
>  }
> ```
>
> #### 参数 
>
> `useId` 不带任何参数。
>
> #### 返回值 
>
> `useId` 返回一个唯一的字符串 ID，与此特定组件中的 `useId` 调用相关联。
>
> #### 注意事项 
>
> - `useId` 是一个 Hook，因此你只能 **在组件的顶层** 或自己的 Hook 中调用它。你不能在内部循环或条件判断中调用它。如果需要，可以提取一个新组件并将 state 移到该组件中。
> - `useId` **不应该被用来生成列表中的 key**。[key 应该由你的数据生成](https://zh-hans.react.dev/learn/rendering-lists#where-to-get-your-key)。
>
> #### 陷阱
>
> > **不要使用 useId 来生成列表中的 key**。[key 应该由你的数据生成](https://zh-hans.react.dev/learn/rendering-lists#where-to-get-your-key)。 

### 1、为所有生成的 ID 指定共享前缀 

> 如果你在单个页面上渲染多个独立的 React 应用程序，请在 [`createRoot`](https://zh-hans.react.dev/reference/react-dom/client/createRoot#parameters) 或 [`hydrateRoot`](https://zh-hans.react.dev/reference/react-dom/client/hydrateRoot) 调用中将 `identifierPrefix` 作为选项传递。这确保了由两个不同应用程序生成的 ID 永远不会冲突，因为使用 `useId` 生成的每个 ID 都将以你指定的不同前缀开头。  

## 八、useImperativeHandle

> `useImperativeHandle` 是 React 中的一个 Hook，它能让你自定义由 [ref](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 暴露出来的句柄。 
>
> ````js
> useImperativeHandle(ref, createHandle, dependencies?)
> ````
>
> - 参考
>   - [`useImperativeHandle(ref, createHandle, dependencies?)`](https://zh-hans.react.dev/reference/react/useImperativeHandle#useimperativehandle)
> - 使用方法
>   - [向父组件暴露一个自定义的 ref 句柄](https://zh-hans.react.dev/reference/react/useImperativeHandle#exposing-a-custom-ref-handle-to-the-parent-component)
>   - [暴露你自己的命令式方法](https://zh-hans.react.dev/reference/react/useImperativeHandle#exposing-your-own-imperative-methods)
>
> ## 参考 
>
> ### `useImperativeHandle(ref, createHandle, dependencies?)` 
>
> 在组件顶层通过调用 `useImperativeHandle` 来自定义 ref 暴露出来的句柄：
>
> ````
> import { forwardRef, useImperativeHandle } from 'react';
> 
> const MyInput = forwardRef(function MyInput(props, ref) {
>   useImperativeHandle(ref, () => {
>     return {
>       // ... 你的方法 ...
>     };
>   }, []);
>   // ...
> ````
>
> #### 参数 
>
> - `ref`：该 `ref` 是你从 [`forwardRef` 渲染函数](https://zh-hans.react.dev/reference/react/forwardRef#render-function) 中获得的第二个参数。
> - `createHandle`：该函数无需参数，它返回你想要暴露的 ref 的句柄。该句柄可以包含任何类型。通常，你会返回一个包含你想暴露的方法的对象。
> - **可选的** `dependencies`：函数 `createHandle` 代码中所用到的所有反应式的值的列表。反应式的值包含 props、状态和其他所有直接在你组件体内声明的变量和函数。倘若你的代码检查器已 [为 React 配置好](https://zh-hans.react.dev/learn/editor-setup#linting)，它会验证每一个反应式的值是否被正确指定为依赖项。该列表的长度必须是一个常数项，并且必须按照 `[dep1, dep2, dep3]` 的形式罗列各依赖项。React 会使用 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每一个依赖项与其对应的之前值。如果一次重新渲染导致某些依赖项发生了改变，或你没有提供这个参数列表，你的函数 `createHandle` 将会被重新执行，而新生成的句柄则会被分配给 ref。
>
> #### 返回值 
>
> `useImperativeHandle` 返回 `undefined`。

### 1、向父组件暴露一个自定义的 ref 句柄

> 默认情况下，组件不会将它们的 DOM 节点暴露给父组件。举例来说，如果你想要 `MyInput` 的父组件 [能访问到](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) `<input>` DOM 节点，你必须选择使用 [`forwardRef`:](https://zh-hans.react.dev/reference/react/forwardRef)。 
>
> ````js
> import { forwardRef } from 'react';
> 	
> const MyInput = forwardRef(function MyInput(props, ref) {
> 	// 父组件ref
> 	return <input {...props} ref={ref} />;
> });
> ````
>
> **完整例子：**
>
> ````js
> import { forwardRef, useRef, useImperativeHandle } from 'react';
> 
> const MyInput = forwardRef(function MyInput(props, ref) {
>   const inputRef = useRef(null);
> 
>   useImperativeHandle(ref, () => {
>   // 只向父组件中暴露两个方法
>     return {
>       focus() {
>         inputRef.current.focus();
>       },
>       scrollIntoView() {
>         inputRef.current.scrollIntoView();
>       },
>     };
>   }, []);
>   return <input {...props} ref={inputRef} />;
> });
> ````
>
> 

### 2、暴露你自己的命令式方法

> 你通过命令式句柄暴露出来的方法不一定需要完全匹配 DOM 节点的方法。 (可以自定义一些方法暴露出来)
>
> > 例子： https://zh-hans.react.dev/reference/react/useImperativeHandle#exposing-your-own-imperative-methods 
>
> ### 陷阱
>
> > **不要滥用 ref。** 你应当仅在你没法通过 prop 来表达 *命令式* 行为的时候才使用 ref：例如，滚动到指定节点、聚焦某个节点、触发一次动画，以及选择文本等等。
> >
> > **如果可以通过 prop 实现，那就不应该使用 ref**。例如，你不应该从一个 `Model` 组件暴露出 `{open, close}` 这样的命令式句柄，最好是像 `<Modal isOpen={isOpen} />` 这样，将 `isOpen` 作为一个 prop。[副作用](https://zh-hans.react.dev/learn/synchronizing-with-effects) 可以帮你通过 prop 来暴露一些命令式的行为。

## 九、useInsertion

> **useInsertionEffect是为CSS-in-JS库作者准备的。除非你正在使用CSS-in-JS库，并且需要一个地方来注入样式，否则你可能会想要useEffect或uselayouteeffect。** 
>
> - 参考
>   - [`useInsertionEffect(setup, dependencies?)`](https://zh-hans.react.dev/reference/react/useInsertionEffect#useinsertioneffect)
> - 用法
>   - [从 CSS-in-JS 库注入动态样式](https://zh-hans.react.dev/reference/react/useInsertionEffect#injecting-dynamic-styles-from-css-in-js-libraries)
>
> ## 语法
>
> ### `useInsertionEffect(setup, dependencies?)` 
>
> 调用`useInsertionEffect`以在任何 DOM 更改之前插入样式：
>
> ````js
> import { useInsertionEffect } from 'react';
> 
> // Inside your CSS-in-JS library
> function useCSS(rule) {
>   useInsertionEffect(() => {
>     // ... inject <style> tags here ...
>   });
>   return rule;
> }
> 
> /**
>  执行对比
> 	useInsertionEffect > useLayoutEffect > useEffect
> **/
> ````
>
> #### 参数
>
> - `setup`：具有您的effect逻辑的功能。您的设置函数也可以选择返回一个*清理*函数。在你的组件被添加到 DOM 之前，React 将运行你的设置函数。在每次使用更改的依赖项重新渲染后，React 将首先使用旧值运行清理函数（如果你提供了它），然后使用新值运行你的设置函数。在您的组件从 DOM 中删除之前，React 将运行您的清理功能。
> - **可选** `dependencies(Arrar)`：设置依赖项，依赖项发生变化时setup才会重新运行（初次渲染不管有没有依赖项都会运行），如果没有设置依赖项，则每次组件重新渲染时都会执行setup。
>
> ````js
> // Inside your CSS-in-JS library
> let isInserted = new Set();
> function useCSS(rule) {
>   useInsertionEffect(() => {
>     // As explained earlier, we don't recommend runtime injection of <style> tags.
>     // But if you have to do it, then it's important to do in useInsertionEffect.
>     if (!isInserted.has(rule)) {
>       isInserted.add(rule);
>       document.head.appendChild(getStyleForRule(rule));
>     }
>   });
>   return rule;
> }
> 
> function Button() {
>   const className = useCSS('...');
>   return <div className={className} />;
> }
> ````
>
> 

## 十、useLayoutEffect

> **`useLayoutEffect`会损害性能。[`useEffect`](https://zh-hans.react.dev/reference/react/useEffect)尽可能选择。** 
>
> `useLayoutEffect`是[`useEffect`](https://zh-hans.react.dev/reference/react/useEffect)在浏览器重新绘制屏幕之前触发的一个hooks。 
>
> ````js
> useLayoutEffect(setup, dependencies?)
> /**
>  执行对比
> 	useInsertionEffect > useLayoutEffect > useEffect
> **/
> ````
>
> - 参考
>   - [`useLayoutEffect(setup, dependencies?)`](https://zh-hans.react.dev/reference/react/useLayoutEffect#useinsertioneffect)
> - 用法
>   - [在浏览器重绘屏幕之前测量布局](https://zh-hans.react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)
> - 故障排除
>   - [我收到一个错误：“`useLayoutEffect`在服务器上什么都不做”](https://zh-hans.react.dev/reference/react/useLayoutEffect#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)
>
> ## 语法
>
> ### `useLayoutEffect(setup, dependencies?)` 
>
> `useLayoutEffect`在浏览器重新绘制屏幕之前调用执行布局测量：
>
> ````
> import { useState, useRef, useLayoutEffect } from 'react';
> 
> function Tooltip() {
>   const ref = useRef(null);
>   const [tooltipHeight, setTooltipHeight] = useState(0);
> 
>   useLayoutEffect(() => {
>     const { height } = ref.current.getBoundingClientRect();
>     setTooltipHeight(height);
>   }, []);
> ````
>
> #### 参数
>
> - `setup`：具有您的effect逻辑的功能。您的设置函数也可以选择返回一个*清理*函数。在你的组件被添加到 DOM 之前，React 将运行你的设置函数。在每次使用更改的依赖项重新渲染后，React 将首先使用旧值运行清理函数（如果你提供了它），然后使用新值运行你的设置函数。在您的组件从 DOM 中删除之前，React 将运行您的清理功能。
> - **可选** `dependencies(Arrar)`：设置依赖项，依赖项发生变化时setup才会重新运行（初次渲染不管有没有依赖项都会运行），如果没有设置依赖项，则每次组件重新渲染时都会执行setup。
>
> #### 返回值
>
> `useLayoutEffect`回报`undefined`。
>
> #### 注意事项
>
> - `useLayoutEffect`是一个Hook，所以你只能**在你的组件顶层**或者你自己的Hooks中调用它。您不能在循环或条件内调用它。如果需要，请提取一个组件并将Effect移到那里。
> - 当严格模式打开时，React 将在第一次真正的设置之前**运行一个额外的开发专用设置+清理周期。**这是一个压力测试，可确保您的清理逻辑“镜像”您的设置逻辑，并确保它停止或撤消设置正在执行的任何操作。如果这导致问题，[请执行清理功能。](https://zh-hans.react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
> - **如果您的某些依赖项是在组件内部定义的对象或函数，则它们会导致 Effect 比需要更频繁地重新运行的**风险。要解决此问题，请删除不必要的[对象](https://zh-hans.react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies)和[函数](https://zh-hans.react.dev/reference/react/useEffect#removing-unnecessary-function-dependencies)依赖项。您还可以在 Effect 之外[提取状态更新](https://zh-hans.react.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect)和[非反应性逻辑。](https://zh-hans.react.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect)
> - 效果**仅在客户端上运行。**它们不会在服务器渲染期间运行。
> - `useLayoutEffect`里面的代码和它安排的所有状态更新**都会阻止浏览器重新绘制屏幕。**如果过度使用，这会使您的应用变慢。如果可能，请使用[`useEffect`.](https://zh-hans.react.dev/reference/react/useEffect)

## 十一、useMemo

> `useMemo`是一个 React Hook，可让您在重新渲染时缓存计算结果。 
>
> ```js
> const cachedValue = useMemo(calculateValue, dependencies)
> ```
>
> - 参考
>   - [`useMemo(calculateValue, dependencies)`](https://zh-hans.react.dev/reference/react/useMemo#usememo)
> - 用法
>   - [跳过昂贵的重新计算](https://zh-hans.react.dev/reference/react/useMemo#skipping-expensive-recalculations)
>   - [跳过组件的重新渲染](https://zh-hans.react.dev/reference/react/useMemo#skipping-re-rendering-of-components)
>   - [记忆另一个 Hook 的依赖](https://zh-hans.react.dev/reference/react/useMemo#memoizing-a-dependency-of-another-hook)
>   - [记忆一个函数](https://zh-hans.react.dev/reference/react/useMemo#memoizing-a-function)
> - 故障排除
>   - [我的计算在每次重新渲染时运行两次](https://zh-hans.react.dev/reference/react/useMemo#my-calculation-runs-twice-on-every-re-render)
>   - [我的`useMemo`调用应该返回一个对象，但返回未定义](https://zh-hans.react.dev/reference/react/useMemo#my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined)
>   - [每次我的组件渲染时，计算都会`useMemo`重新运行](https://zh-hans.react.dev/reference/react/useMemo#every-time-my-component-renders-the-calculation-in-usememo-re-runs)
>   - [我需要`useMemo`循环调用每个列表项，但这是不允许的](https://zh-hans.react.dev/reference/react/useMemo#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)
>
> ## 参考
>
> ### `useMemo(calculateValue, dependencies)` 
>
> `useMemo`在组件的顶层调用以在重新渲染时缓存计算：
>
> ````js
> import { useMemo } from 'react';
> 
> function TodoList({ todos, tab }) {
>   const visibleTodos = useMemo(
>     () => filterTodos(todos, tab),
>     [todos, tab]
>   );
>   // ...
> }
> ````
>
> #### 参数
>
> - `calculateValue`：计算要缓存的值的函数。它应该是纯粹的，不带任何参数，并且应该返回任何类型的值。React 将在初始渲染期间调用您的函数。`dependencies`在下一次渲染中，如果自上次渲染以来没有改变，React 将再次返回相同的值。否则，它会调用`calculateValue`，返回它的结果，并存储它以便以后可以重用。
> - **可选** `dependencies(Arrar)`：设置依赖项，依赖项发生变化时setup才会重新运行（初次渲染不管有没有依赖项都会运行），如果没有设置依赖项，则每次组件重新渲染时都会执行setup。
>
> #### 返回值
>
> 在初始渲染时，返回不带参数`useMemo`调用的结果。`calculateValue`
>
> 在下一次渲染期间，它将返回上次渲染中已经存储的值(如果依赖关系没有改变)，或者再次调用calculateValue，并返回calculateValue已经返回的结果。 
>
> #### 注意事项
>
> - `useMemo`是一个Hook，所以你只能**在你的组件顶层**或者你自己的Hooks中调用它。您不能在循环或条件内调用它。如果需要，提取一个新组件并将状态移入其中。
> - 在严格模式下，React 会**调用你的计算函数两次**，以[帮助你发现意外的杂质。](https://zh-hans.react.dev/reference/react/useMemo#my-calculation-runs-twice-on-every-re-render)这是仅限开发的行为，不会影响生产。如果您的计算函数是纯粹的（应该是），这应该不会影响您的逻辑。其中一个调用的结果将被忽略。
> - **除非有特定原因，否则**React不会丢弃缓存值。例如，在开发中，当您编辑组件的文件时，React 会丢弃缓存。在开发和生产中，如果您的组件在初始挂载期间挂起，React 将丢弃缓存。

### 1、用法

> ### 用法
>
> #### 跳过昂贵的重新计算
>
> 要在重新渲染时缓存计算，请将其包装`useMemo`在组件顶层的调用中：
>
> ````js
> import { useMemo } from 'react';
> 
> function TodoList({ todos, tab, theme }) {
>   const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
>   // ...
> }
> ````
>
> 您需要将两件事传递给`useMemo`：
>
> 1. **一个不带参数的计算函数`() =>`，例如，并返回您想要计算的内容。**
> 2. **依赖项列表，包括计算中使用的组件中的每个值。**
>
> 在初始渲染中，您将从中获得的值将是调用calculation`useMemo`的结果。
>
> 在每个后续渲染中，React 会将依赖项与您在上次渲染期间传递的依赖项进行比较。如果没有任何依赖项发生变化（与 相比[`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)），`useMemo`将返回您之前计算的值。否则，React 将重新运行您的计算并返回新值。
>
> 换句话说，`useMemo`缓存重新渲染之间的计算结果，直到其依赖项发生变化。

#### 1、如何判断计算是否昂贵

> (官方解释)https://zh-hans.react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive
>
> 一般而言，除非您要创建或遍历数千个对象，否则它可能并不昂贵。 那么如何测试呢。可以通过console来进行测试计算是否非常花费性能
>
> ````js
> console.time('filter array');
> const visibleTodos = filterTodos(todos, tab);
> console.timeEnd('filter array');
> ````
>
> 注意: 您的机器可能比用户的机器快，因此最好通过人为减速来测试性能。例如，Chrome为此提供了一个[CPU Throttling选项。](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) 

#### 2、何时使用useMemo

> 优化`useMemo`  只在少数情况下有价值：
>
> - 您输入的计算速度`useMemo`明显很慢，而且它的依赖关系很少改变。
> - 您将它作为 prop 传递给包装在[`memo`. ](https://zh-hans.react.dev/reference/react/memo)如果值没有改变，你想跳过重新渲染。Memoization 让您的组件仅在依赖项不同时才重新渲染。
> - 你传递的值稍后会作为某个Hook的依赖项使用。例如，可能另一个useMemo计算值依赖于它 。或者你可能依赖于useEffect的这个hooks.
>
> https://zh-hans.react.dev/reference/react/useMemo#should-you-add-usememo-everywhere

#### 3、跳过组件的重新渲染

> **默认情况下，当一个组件重新渲染时，React 会递归地重新渲染它的所有子组件。某一块JSX结构没有变化且数据和上一次渲染使用的同一个对象或则数组可以使用**[`memo`](https://zh-hans.react.dev/reference/react/memo) 把这些JSX抽取到子组件中使其跳过重新渲染。
>
> 例子：https://zh-hans.react.dev/reference/react/useMemo#skipping-re-rendering-of-components

#### 4、记忆另一个 Hook 的依赖

> 假设您有一个计算依赖于直接在组件主体中创建的对象： 
>
> ````js
> function Dropdown({ allItems, text }) {
>   const searchOptions = { matchMode: 'whole-word', text };
> 
>   const visibleItems = useMemo(() => {
>     return searchItems(allItems, searchOptions);
>   }, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body
> ````
>
> 依赖这样的对象会破坏记忆点。当组件重新渲染时，组件主体内的所有代码都会再次运行。**创建对象的代码行searchOptions也将在每次重新渲染时运行。**因为`searchOptions`是你调用的依赖`useMemo`，而且每次都不一样，React 知道依赖是不同的，并且`searchItems`每次都重新计算。
>
> 要解决此问题，您可以在将`searchOptions`对象作为依赖项传递之前记忆对象*本身：*
>
> ````js
> function Dropdown({ allItems,  text }) { //  text state
>   const visibleItems = useMemo(() => {
>     const searchOptions = { matchMode: 'whole-word', text };
>     return searchItems(allItems, searchOptions);
>   }, [allItems, text]); // ✅ Only changes when allItems or text changes
> ````
>
> 

#### 5、记忆一个函数

> 要使用 记忆一个函数`useMemo`，您的计算函数必须返回另一个函数： 
>
> ````js
> export default function Page({ productId, referrer }) {
>   const handleSubmit = useMemo(() => {
>     return (orderDetails) => {
>       post('/product/' + productId + '/buy', {
>         referrer,
>         orderDetails
>       });
>     };
>   }, [productId, referrer]);
> 
>   return <Form onSubmit={handleSubmit} />; // Form被memo包裹起来的组件
> }
> ````
>
> 这看起来很笨重！**记忆函数很常见，React 有一个专门用于此的内置 Hook。将函数包装成useCallbackinstead ofuseMemo**以避免必须编写额外的嵌套函数： 
>
> ````js
> export default function Page({ productId, referrer }) {
>   const handleSubmit = useCallback((orderDetails) => {
>     post('/product/' + productId + '/buy', {
>       referrer,
>       orderDetails
>     });
>   }, [productId, referrer]);
> 
>   return <Form onSubmit={handleSubmit} />;
> }
> ````
>
> 上面两个例子是完全等价的。唯一的好处`useCallback`是它可以让你避免在里面写一个额外的嵌套函数。它没有做任何其他事情。[阅读更多关于`useCallback`。](https://zh-hans.react.dev/reference/react/useCallback) 

### 2、！！！故障排除

> https://zh-hans.react.dev/reference/react/useMemo#troubleshooting  了解一下就行，很简单

## 十二、useSyncExternalStore

> useSyncExternalStore是一个 React Hook，可以让你订阅一个外部存储。 
>
> **比如获取路由中的参数或则状态管理库（Redux）和浏览器API返回的一些数据**

> - 参考
>   - [`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`](https://zh-hans.react.dev/reference/react/useSyncExternalStore#usesyncexternalstore)
> - 用法
>   - [订阅外部商店](https://zh-hans.react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store)
>   - [订阅浏览器 API](https://zh-hans.react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api)
>   - [将逻辑提取到自定义 Hook](https://zh-hans.react.dev/reference/react/useSyncExternalStore#extracting-the-logic-to-a-custom-hook)
>   - [添加对服务器渲染的支持](https://zh-hans.react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
> - 故障排除
>   - [`getSnapshot`我收到一个错误：“应该缓存的结果”](https://zh-hans.react.dev/reference/react/useSyncExternalStore#im-getting-an-error-the-result-of-getsnapshot-should-be-cached)
>   - [`subscribe`每次重新渲染后都会调用我的函数](https://zh-hans.react.dev/reference/react/useSyncExternalStore#my-subscribe-function-gets-called-after-every-re-render)
>
> #### 参考
>
> #### `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` 
>
> `useSyncExternalStore`在组件的顶层调用以从外部数据存储中读取值。
>
> > `useSyncExternalStore`在组件的顶层调用以从外部数据存储中读取值。 
> >
> > ````js
> > import { useSyncExternalStore } from 'react';
> > import { todosStore } from './todoStore.js';
> > 
> > function TodosApp() {
> >   const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
> >   // ...
> > }
> > ````
> >
> > 它返回存储中数据的快照。您需要传递两个函数作为参数：
> >
> > 1. 该`subscribe`函数应该订阅商店并返回一个取消订阅的函数。
> > 2. 该`getSnapshot`函数应该从存储中读取数据的快照。
>
> #### 参数
>
> - `subscribe`：一个接受单个`callback` 参数并将其订阅到存储库的函数。当存储更改时，它应该调用提供的`callback` 。这将导致组件重新渲染。订阅函数应该返回一个清理订阅的函数。 
> - `getSnapshot`：一个函数，它返回组件所需的存储中数据的快照。当存储没有改变时，对getSnapshot的重复调用必须返回相同的值。如果存储更改并且返回值不同(通过Object.is进行比较)，React将重新呈现组件。 
> - **可选** `getServerSnapshot`：返回存储区中数据的初始快照的函数。它将仅在服务器呈现期间和在客户机上对服务器呈现的内容进行聚合期间使用。服务器快照在客户端和服务器之间必须是相同的，并且通常是序列化的，并从服务器传递到客户端。如果省略此参数，则在服务器上呈现组件将抛出错误。 
>
> #### 返回值
>
> 可以在呈现逻辑中使用的存储的当前快照。
>
> #### 注意事项
>
> getSnapshot返回的存储快照必须是不可变的。如果底层存储具有可变数据，则在数据发生更改时返回一个新的不可变快照。否则，返回上次缓存的快照。 
>
> 如果在重新呈现期间传递了不同的订阅函数，React将使用新传递的订阅函数重新订阅存储。可以通过在组件外部声明订阅来防止这种情况。

### 1、订阅浏览器 API

> useSyncExternalStore 实际例子

> ````js
> import { useSyncExternalStore } from 'react';
> 
> export default function ChatIndicator() {
>   const isOnline = useSyncExternalStore(subscribe, getSnapshot);
>   return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
> }
> 
> function getSnapshot() {
>   return navigator.onLine;
> }
> 
> function subscribe(callback) {
>   window.addEventListener('online', callback);
>   window.addEventListener('offline', callback);
>   return () => {
>     window.removeEventListener('online', callback);
>     window.removeEventListener('offline', callback);
>   };
> }
> ````
>
> 

### 2、将逻辑提取到自定义 Hook

````js
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

````



````js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}

````

### 3、添加对服务器渲染的支持

> 了解即可： https://zh-hans.react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering

#### 4、故障排除

> https://zh-hans.react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering

## 十三、useTransition

> useTransition是一个React Hook，可以让你在不阻塞UI的情况下更新状态。 
>
> ````js
> import { useTransition } from 'react';
> 
> function TabContainer() {
>   const [isPending, startTransition] = useTransition();
>   // ...
> }
> ````
>
> - 参考
>   - [`useTransition()`](https://zh-hans.react.dev/reference/react/useTransition#usetransition)
>   - [`startTransition`功能](https://zh-hans.react.dev/reference/react/useTransition#starttransition)
> - 用法
>   - [将状态更新标记为非阻塞转换](https://zh-hans.react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition)
>   - [在过渡中更新父组件](https://zh-hans.react.dev/reference/react/useTransition#updating-the-parent-component-in-a-transition)
>   - [在过渡期间显示挂起的视觉状态](https://zh-hans.react.dev/reference/react/useTransition#displaying-a-pending-visual-state-during-the-transition)
>   - [防止不需要的加载指示器](https://zh-hans.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators)
>   - [构建一个支持 Suspense 的路由器](https://zh-hans.react.dev/reference/react/useTransition#building-a-suspense-enabled-router)
> - 故障排除
>   - [在转换中更新输入不起作用](https://zh-hans.react.dev/reference/react/useTransition#updating-an-input-in-a-transition-doesnt-work)
>   - [React 不会将我的状态更新视为转换](https://zh-hans.react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-as-a-transition)
>   - [`useTransition`我想从组件外部调用](https://zh-hans.react.dev/reference/react/useTransition#i-want-to-call-usetransition-from-outside-a-component)
>   - [我传递给`startTransition`的函数被立即执行](https://zh-hans.react.dev/reference/react/useTransition#the-function-i-pass-to-starttransition-executes-immediately)
>
> 
>
> #### 参数
>
> `useTransition`不带任何参数
>
> #### 返回值
>
> useTransition返回一个包含两个元素的数组: 
>
> isPending标志，告诉您是否存在挂起的转换。 
>
> startTransition函数允许您将状态更新标记为转换。
>
> #### `startTransition`功能
>
> `startTransition`返回的函数允许`useTransition`您将状态更新标记为转换。
>
> ````js
> function TabContainer() {
>   const [isPending, startTransition] = useTransition();
>   const [tab, setTab] = useState('about');
> 
>   function selectTab(nextTab) {
>     startTransition(() => {
>       setTab(nextTab);
>     });
>   }
> }
> ````
>
> #### 参数
>
> - `scope`[`set`：通过调用一个或多个函数](https://zh-hans.react.dev/reference/react/useState#setstate)来更新某些状态的函数。React 立即调用不带参数`scope`，并将在`scope`函数调用期间同步安排的所有状态更新标记为转换。它们将是[非阻塞的](https://zh-hans.react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition)，[不会显示不需要的加载指示器。](https://zh-hans.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators)
>
> #### 返回值
>
> `startTransition`不返回任何东西。 
>
> #### 注意事项
>
> **1、useTransition是一个钩子，所以它只能在组件或自定义钩子中调用。如果您需要在其他地方开始转换(例如，从一个数据库)，则调用独立的startTransition。** 
>
> **2、只有当您有权访问该状态的set函数时，才能将更新包装到转换中。如果你想在响应某个prop或自定义Hook值时启动转换，请尝试使用useDeferredValue。** 
>
> **3、传递给startTransition的函数必须是同步的。React立即执行此函数，并将执行时发生的所有状态更新标记为转换。如果稍后尝试执行更多状态更新(例如，在超时中)，则不会将其标记为转换。** 
>
> **4、标记为转换的状态更新将被其他状态更新中断。例如，如果你在一个过渡中更新了一个图表组件，但是当图表处于重新呈现的过程中时，你开始在一个输入中输入，React将在处理输入更新后重新开始图表组件上的呈现工作。** 
>
>  **5、转换更新不能用于控制文本输入。**

### 1、在过渡中更新父组件

> 您也可以从useTransition调用中更新父组件的状态 
>
> ````js
> export default function TabButton({ children, isActive, onClick }) {
>   const [isPending, startTransition] = useTransition();
>   if (isActive) {
>     return <b>{children}</b>
>   }
>   return (
>     <button onClick={() => {
>       startTransition(() => {
>         onClick();
>       });
>     }}>
>       {children}
>     </button>
>   );
> }
> ````
>
> 

### 2、在转换期间显示挂起的过度状态

 ````js
function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  // ...
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  // ...
 ````

### 3、防止不必要的加载指示器

> 隐藏整个选项卡容器以显示加载指示符会导致用户体验不和谐。如果将useTransition添加到TabButton，则可以在选项卡按钮中指示显示挂起状态。 
>
> https://zh-hans.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators

### 4、构建一个支持 Suspense 的路由器

> 推荐这样做有两个原因：
>
> - [过渡是可中断的，](https://zh-hans.react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition)这让用户无需等待重新渲染完成就可以点击离开。
> - [过渡可以防止不需要的加载指示器，](https://zh-hans.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators)这可以让用户避免在导航中出现不和谐的跳跃。

### 5、故障排除

> https://zh-hans.react.dev/reference/react/useTransition#troubleshooting

# API

## 一、forwardRef

> `forwardRef`让您的组件通过 ref 向父组件公开 DOM 节点[。](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 
>
> ````
> const SomeComponent = forwardRef(render)
> ````
>
> - 参考
>   - [`forwardRef(render)`](https://zh-hans.react.dev/reference/react/forwardRef#forwardref)
>   - [`render`功能](https://zh-hans.react.dev/reference/react/forwardRef#render-function)
> - 用法
>   - [将 DOM 节点暴露给父组件](https://zh-hans.react.dev/reference/react/forwardRef#exposing-a-dom-node-to-the-parent-component)
>   - [通过多个组件转发 ref](https://zh-hans.react.dev/reference/react/forwardRef#forwarding-a-ref-through-multiple-components)
>   - [公开命令句柄而不是 DOM 节点](https://zh-hans.react.dev/reference/react/forwardRef#exposing-an-imperative-handle-instead-of-a-dom-node)
> - 故障排除
>   - [我的组件包装在 中`forwardRef`，但`ref`它始终是`null`](https://zh-hans.react.dev/reference/react/forwardRef#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null)
>
> ## 参考
>
> ### `forwardRef(render)` 
>
> 调用`forwardRef()`让您的组件接收 ref 并将其转发给子组件：
>
> ````js
> import { forwardRef } from 'react';
> 
> const MyInput = forwardRef(function MyInput(props, ref) {
>   // ...
> });
> ````
>
> #### 参数
>
> - `render`: 组件的渲染函数。React 使用 props 调用此函数，并且`ref`您的组件从其父组件接收到。您返回的 JSX 将是您组件的输出。
>
> #### 返回值
>
> > `forwardRef`返回一个可以在 JSX 中呈现的 React 组件。与定义为普通函数的 React 组件不同，由 返回的组件`forwardRef`也能够接收`ref`prop。 
>
> #### 注意事项
>
> > 在 Strict Mode 中，React 会调用你的 render 函数两次以帮助你找到意外的不纯性。这只是开发环境中的行为，不会影响生产环境。如果你的 render 函数是纯的（应该是这样的），这不会影响你的组件的逻辑。其中一次调用的结果将被忽略。 

### 1、render功能

> forwardRef接受一个渲染函数作为参数。React将使用props和ref调用此函数： 
>
> ````js
> const MyInput = forwardRef(function MyInput(props, ref) {
>   return (
>     <label>
>       {props.label}
>       <input ref={ref} />
>     </label>
>   );
> });
> ````
>
> #### 参数
>
> - `props`: 父组件传递的 props。
> - `ref`:由父组件传递的ref属性。ref可以是一个对象或者一个函数。如果父组件没有传递ref，它将为null。你应该将接收到的ref传递给另一个组件，或者传递给[`useImperativeHandle`.](https://zh-hans.react.dev/reference/react/useImperativeHandle)
>
> #### 返回值
>
> forwardRef返回一个React组件，你可以在JSX中渲染它。与定义为普通函数的React组件不同，forwardRef返回的组件可以接受ref属性。 

### 2、将 DOM 节点暴露给父组件

> 将DOM节点暴露给父组件 默认情况下，每个组件的DOM节点都是私有的。但是，有时将DOM节点暴露给父组件很有用. 
>
> ````js
> const FormField = forwardRef(function FormField(props, ref) {
>   // ...
>   return (
>     <>
>       <MyInput ref={ref} />
>       ...
>     </>
>   );
> });
> ````
>
> 

### 3、通过多个组件转发 ref

> https://zh-hans.react.dev/reference/react/forwardRef#forwarding-a-ref-through-multiple-components   掌握

### 4、暴露命令式处理程序而不是DOM节点 

> 你可以暴露一个自定义对象，称为命令式处理程序，而不是整个DOM节点，该对象具有一组更受限制的方法。为此，你需要定义一个单独的ref来保存DOM节点： 
>
> ````js
> const MyInout = forwardRef(function MyInput(props, ref) {
>     const inputRef = useRef(null);
>     return <input {...props} ref={inputRef} />
> })
> ````
>
> 将你接收到的ref传递给[`useImperativeHandle`](https://zh-hans.react.dev/reference/react/useImperativeHandle) ，并指定你想要暴露给ref的值： 
>
> ````js
> import { forwarRef, useRef, useImperrativeHandle } from 'react'
> 
> const Myinput = forwardRef(function MyInput(props, ref) {
>     const inputRef = useRef(null);
>     useImperativeHandle(ref, () => {
>         return {
>   			focus() {
>                 inputRef.current.focus();
>               },
>               scrollIntoView() {
>                 inputRef.current.scrollIntoView();
>               },
>         }
>     }, [])
>     return <input {...props} ref={inputRef}>
> })
> 
> ````
>
> 如果某个组件获取了MyInput的ref，它只会收到你的{ focus，scrollIntoView }对象，而不是DOM节点。这使你可以将暴露的有关DOM节点的信息限制到最小。 

### 5、警告

> 不要过度使用Refs。你应该只在无法用Props表达的情况下使用Refs，比如滚动到一个节点、将一个节点聚焦、触发动画、选择文本等等。
>
> 如果你可以用Props表达某些行为，就不应该使用Ref。例如，不要从Modal组件中暴露像{open，close}这样的命令式处理程序，而是应该将isOpen作为一个Props传递，例如<Modal isOpen={isOpen} />。使用Effect可以帮助你通过Props暴露命令式行为。

## 二、lazy

> `lazy` 能够让你在组件第一次被渲染之前延迟加载组件的代码。 
>
> ````js
> const SomeComponent = lazy(load)
> ````
>
> - 参考
>   - [`lazy(load)`](https://zh-hans.react.dev/reference/react/lazy#lazy)
>   - [`load` 函数](https://zh-hans.react.dev/reference/react/lazy#load)
> - 使用方法
>   - [使用 Suspense 实现懒加载组件](https://zh-hans.react.dev/reference/react/lazy#suspense-for-code-splitting)
> - 疑难解答
>   - [我的 `lazy` 组件状态意外重置](https://zh-hans.react.dev/reference/react/lazy#my-lazy-components-state-gets-reset-unexpectedly)
>
> ## 参考
>
> ##### `lazy(load)` 
>
> 在组件外部调用 `lazy`，以声明一个懒加载的 React 组件: 
>
> ````js
> import { lazy } from 'react';
> 
> const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
> ````
>
> #### 参数
>
> - `load`: 一个返回 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或另一个 *thenable*（具有 `then` 方法的类 Promise 对象）的函数。在你尝试第一次渲染返回的组件之前，React 是不会调用 load 函数的。在 React 首次调用 `load` 后，它将等待其解析，然后将解析值渲染成 React 组件。返回的 Promise 和 Promise 的解析值都将被缓存，因此 React 不会多次调用 `load` 函数。如果 Promise 被拒绝，则 React 将抛出拒绝原因给最近的错误边界处理。
>
> #### 返回值
>
> `lazy` 返回一个 React 组件，你可以在 fiber 树中渲染。当懒加载组件的代码仍在加载时，尝试渲染它将会处于 *暂停* 状态。使用 [``](https://zh-hans.react.dev/reference/react/Suspense) 可以在其加载时显示一个正在加载的提示。

### `load`函数

#### 参数

`load`不接收任何参数。

#### 返回值

你需要返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或其他 *thenable* （具有 `then` 方法的类 Promise 对象）。它最终需要解析为有效的 React 组件类型，例如函数、[`memo`](https://zh-hans.react.dev/reference/react/memo) 或 [`forwardRef`](https://zh-hans.react.dev/reference/react/forwardRef) 组件。

### 1、使用 Suspense 实现懒加载组件

通常，你可以使用静态 [`import`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import) 声明来导入组件： 

```js
import MarkdownPreview from './MarkdownPreview.js';
```

如果想在组件第一次渲染前延迟加载这个组件的代码，请替换成以下导入方式： 

````js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
````

此代码依赖于 [动态 `import()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import)，可能需要你的打包工具或框架提供支持。

现在你的组件代码可以按需加载，同时你需要指定在它正在加载时应该显示什么。你可以通过将懒加载组件或其任何父级包装到 [`Suspense  `](https://zh-hans.react.dev/reference/react/Suspense) 边界中来实现：

````js
<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
 </Suspense>
````

### 我的 `lazy` 组件状态意外重置

不要在其他组件 *内部* 声明 `lazy` 组件： 

````
import { lazy } from 'react';

function Editor() {
  // 🔴 Bad: 这将导致在重新渲染时重置所有状态
  const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
  // ...
}
````

相反，总是在模块的顶层声明它们： 

````
import { lazy } from 'react';

// ✅ Good: 将 lazy 组件声明在组件外部
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function Editor() {
  // ...
}
````



## 三、memo

React.memo() 函数可以让你在组件的 props 未改变时跳过重新渲染。 

````js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
````

> - 参考
>   - [`memo(Component, arePropsEqual?)`](https://zh-hans.react.dev/reference/react/memo#memo)
> - 用法
>   - [道具不变时跳过重新渲染](https://zh-hans.react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged)
>   - [使用状态更新记忆组件](https://zh-hans.react.dev/reference/react/memo#updating-a-memoized-component-using-state)
>   - [使用上下文更新记忆组件](https://zh-hans.react.dev/reference/react/memo#updating-a-memoized-component-using-a-context)
>   - [最小化道具变化](https://zh-hans.react.dev/reference/react/memo#minimizing-props-changes)
>   - [指定自定义比较函数](https://zh-hans.react.dev/reference/react/memo#specifying-a-custom-comparison-function)
> - 故障排除
>   - [当 prop 是对象、数组或函数时，我的组件会重新渲染](https://zh-hans.react.dev/reference/react/memo#my-component-rerenders-when-a-prop-is-an-object-or-array)

## Reference 

### `memo(Component, arePropsEqual?)` 

将一个组件包裹在 React.memo() 中，可以得到该组件的记忆化版本。只要该组件的 props 未改变，通常情况下，这个记忆化版本的组件在其父组件重新渲染时不会被重新渲染。但是，React 可能仍会重新渲染它：记忆化是一种性能优化，而不是一种保证。 

```
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

#### 参数

- Component ：你想要进行记忆化的组件。React.memo() 不会修改此组件，而是返回一个新的记忆化组件。任何有效的 React 组件，包括函数组件和 forwardRef 组件，都可以被接受。
- **optional** `arePropsEqual`： 一个函数，接受两个参数：组件的先前 props 和新 props。如果旧的和新的 props 相等，它应该返回 true，即如果组件在新的 props 下呈现相同的输出并以相同的方式运行，就像在旧的 props 下一样。否则，它应该返回 false。通常情况下，你不需要指定这个函数。默认情况下，React 会使用 Object.is 来比较每个 prop。

#### 返回值

React.memo() 返回一个新的 React 组件。它的行为与 memo 所提供的组件相同，除非其 props 发生了改变，否则 React 不会总是在父组件重新渲染时重新渲染它。 

### 1、道具不变时跳过重新渲染

通常情况下，当组件的父组件重新渲染时，React 会重新渲染该组件。使用 memo，您可以创建一个组件，只要其新的 props 与旧的 props 相同，React 就不会重新渲染它，这样的组件被称为记忆化组件。

要记忆化一个组件，将其包裹在 memo 中，并使用它返回的值来替换原始组件：

````js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
````

一个 React 组件应该始终具有纯粹的渲染逻辑。这意味着，如果组件的 props、state 和 context 没有改变，它必须返回相同的输出。通过使用 memo，你告诉 React，你的组件符合这个要求，因此只要它的 props 没有改变，React 就不需要重新渲染。**即使使用 memo，如果组件自身的 state 发生变化或它正在使用的 context 发生变化，组件仍会重新渲染。** \

>#### 注意
>
>你应该将 memo 视为一种性能优化，而不是必须的东西。如果你的代码没有 memo 无法正常工作，那么首先要找到潜在的问题并解决它。然后，你可以添加 memo 来提高性能。 

### 2、不应该在所有组件中都使用 memo。 

> 实际上，你可以通过遵循以下几个原则来减少记忆化的使用：
>
> - 当一个组件在视觉上包裹其他组件时，让它接受 JSX 作为 children。这样，当包装组件更新自己的状态时，React 知道它的子组件不需要重新渲染。
> - 尽可能使用本地状态，不要将状态抬升到不必要的高度。例如，不要将短暂状态（如表单和项目是否悬停）保存在树的顶部或全局状态库中。
> - 保持你的渲染逻辑是纯粹的。如果重新渲染组件会引起问题或产生一些明显的视觉问题，那么这是组件中的一个 bug！修复 bug 而不是添加记忆化。
> - 避免更新状态的不必要 Effects。React 应用程序中大多数性能问题都是由 Effects 引起的更新链导致你的组件一遍又一遍地重新渲染。
> - 尽量从 Effect 中删除不必要的依赖关系。例如，与其使用记忆化，通常更简单的方法是将一些对象或函数移动到 Effect 内部或组件外部。
>
> 如果某个具体的交互仍然感觉很卡顿，可以使用 React Developer Tools 分析器来查看哪些组件会最受记忆化的好处，然后在需要的地方添加记忆化。这些原则使你的组件更易于调试和理解，所以无论如何都要遵循它们。从长远来看，我们正在研究自动进行细粒度记忆化，以解决这个问题

### 3、使用状态更新记忆组件

> https://zh-hans.react.dev/reference/react/memo#updating-a-memoized-component-using-state
>
> 如果将一个状态变量设置为其当前值（判断语句 更新state  如果没有通过则不设置新的state），即使没有使用 memo，React 也会跳过重新渲染组件。你可能仍然会看到组件函数被调用了一次，但结果将被丢弃。 

### 4、useContext 更新有记忆组件

>即使一个组件被记忆化了，当它使用的上下文（Context）发生更改时，它仍然会重新渲染。记忆化只与从父组件传递给组件的 props 有关。
>
>Context 是 React 中共享数据的一种方式，可以被多个组件访问。当一个使用 Context 的组件所消费的上下文值发生更改时，React 将会重新渲染该组件，即使该组件已被记忆化。\
>
>https://zh-hans.react.dev/reference/react/memo#updating-a-memoized-component-using-a-context

### 5、最小化Props更改

当你使用 memo 时，只要任何一个 prop 不等于它以前的值，你的组件就会重新渲染。这意味着 React 使用 Object.is 比较每个 prop 与其先前的值。请注意，Object.is(3, 3) 为 true，但 Object.is({}, {}) 为 false。

为了充分利用 memo，尽量减少 props 更改的次数。例如，如果 prop 是一个对象，请使用 useMemo 防止父组件每次重新创建该对象：

````js
const MyComponent = ({ data }) => {
  return <div>{data}</div>;
};

const ParentComponent = () => {
  const data = useMemo(() => ({ name: "John", age: 30 }), []); // use useMemo to prevent re-creating data object
  return <MyComponent data={data} />;
};
````

减少 props 更改的更好方法是确保组件在其 props 中接受最少必要的信息。例如，它可以接受单独的值而不是整个对象： 

````js
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
````

即使是单独的值有时也可以转换为更不经常更改的值。例如，这里的一个组件接受一个布尔值来指示值的存在与否，而不是值本身： 

````js
function GroupsLanding({ person }) {
  const hasGroups = person.groups !== null;
  return <CallToAction hasGroups={hasGroups} />;
}

const CallToAction = memo(function CallToAction({ hasGroups }) {
  // ...
});
````

当你需要将一个函数传递给 memoized 组件时，可以将它声明在组件外部，以便它永远不会改变，或者使用 useCallback 将其定义缓存起来，避免在重新渲染时重新定义。 

````js
const MyComponent = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

const handleClick = () => {
  console.log("Button clicked");
};

const ParentComponent = () => {
  return <MyComponent onClick={handleClick} />;
};	
````

另一种方法是使用 useCallback 来缓存函数定义。useCallback 接受一个函数和一个依赖数组作为参数，并返回一个 memoized 版本的函数。每当依赖数组中的任何一个值发生更改时，useCallback 将重新计算 memoized 函数，并返回新的版本。这可以确保在重新渲染组件时，函数不会被重新定义，除非依赖项发生更改 

````js
const MyComponent = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

const ParentComponent = () => {
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // use useCallback to cache handleClick function definition
  return <MyComponent onClick={handleClick} />;
};
````

### 6、指定自定义比较函数

在极少数情况下，可能无法减少 memoized 组件的 props 更改。在这种情况下，可以提供一个自定义比较函数，React 将使用它来比较旧的和新的 props，而不是使用浅层相等性。这个函数作为 memo 的第二个参数传递进去。它应该只返回 true，如果新的 props 会产生与旧的 props 相同的输出；否则应该返回 false。

使用自定义比较函数可以让你完全控制组件何时重新渲染。这对于某些高度动态的组件可能是必要的，例如具有大量内部状态的复杂表单或图形组件。

````js
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
````

如果这样做，请使用浏览器开发人员工具中的性能面板来确保您的比较功能实际上比重新渲染组件更快。你可能会感到惊讶。 

当您进行性能测量时，请确保 React 在生产模式下运行。 

> ### 陷阱
>
> 如果你提供了一个自定义的 `arePropsEqual` 实现，**你必须比较每一个 prop，包括函数**。函数通常会闭包父组件的 props 和 state。如果你在 `arePropsEqual` 中返回 `true`，而旧的 props 和新的 props 中 `onClick` **函数不相等**，那么你的组件在其 `onClick` 处理函数中将会继续“看到”先前渲染中的 props 和 state，从而导致非常令人困惑的错误。
>
> 除非你100%确定你正在处理的数据结构具有已知的有限深度，否则避免在 `arePropsEqual` 中进行深度相等性检查。**深度相等性检查可能会变得非常慢**，并且如果某人稍后更改数据结构，则可能会冻结你的应用程序数秒钟。

### 7、故障排除

#### 当 prop 是对象、数组或函数时，我的组件会重新渲染

> React 通过浅相等来比较新旧 props：也就是说，它会考虑每个新 prop 是否引用等于旧 prop。如果每次重新渲染父级时都创建一个新对象或数组，即使各个元素都相同，React 仍会认为它已更改。同样，如果你在渲染父组件时创建了一个新的函数，即使函数定义相同，React 也会认为它发生了变化。为避免这种情况，请[在父组件中简化 props 或 memoize props](https://zh-hans.react.dev/reference/react/memo#minimizing-props-changes)。 

## 四、startTransition

`startTransition` 可以让你在不阻塞 UI 的情况下更新 state。 

````
startTransition(scope)
````

- 参考
  - [`startTransition(scope)`](https://zh-hans.react.dev/reference/react/startTransition#starttransitionscope)
- 使用方法
  - [将 state 更新标记为非阻塞 transition](https://zh-hans.react.dev/reference/react/startTransition#marking-a-state-update-as-a-non-blocking-transition)

### 参考 

### `startTransition(scope)` 

`startTransition` 函数可以将 state 更新标记为 transition。

````js
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
````

#### 参数 

- `scope`：调用一个或多个 [`set` 函数](https://zh-hans.react.dev/reference/react/useState#setstate) 来更新 state 的函数。React 会立即调用没有参数的 `scope`，并将在 `scope` 函数调用期间，调度所有的 state，并将同步更新标记为 transition。它们是 [非阻塞的](https://zh-hans.react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition)，并且 [不会显示不想要的加载提示](https://zh-hans.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators)。

#### 返回值 

`startTransition` 不返回任何内容。

#### 注意事项 

- `startTransition` 没有提供一种跟踪 transition 是否处于待定状态的方法。为了在 transition 进行时显示一个待定状态的指示器，你需要使用 [`useTransition`](https://zh-hans.react.dev/reference/react/useTransition)。
- 只有当你能访问某个 state 的 `set` 函数时，你才能将它的更新包裹到 transition 中。如果你想根据 props 或自定义 Hook 的返回值来启动一个 transition，请尝试使用 [`useDeferredValue`](https://zh-hans.react.dev/reference/react/useDeferredValue)。
- 你传递给 `startTransition` 的函数必须是同步的。React 会立即执行此函数，将其执行期间发生的所有 state 更新标记为 transition。如果你想试着稍后执行更多的 state 更新（例如，在 timeout 中），它们不会被标记为转换。
- 一个被标记为 transition 的 state 更新时将会被其他 state 更新打断。例如，如果你在 transition 内部更新图表组件，但在图表重新渲染时在输入框中打字，则 React 将先处理输入 state 更新，之后才会重新启动对图表组件的渲染工作。
- transition 更新不能用于控制文本输入。
- 如果有多个正在进行的 transition，当前 React 会将它们集中在一起处理。这是一个限制，在未来的版本中可能会被移除。

###  1、将 state 更新标记为非阻塞 transition 

 你可以通过将一个 state 包裹在 `startTransition` 回调中，将其更新标记为一个 **transition**： 

````js
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
````

transition 可以让用户界面在慢速设备上保持更新响应。

通过 transition，你的 UI 在重新渲染过程中保持响应。例如，如果用户单击一个选项卡后又改变主意并单击另一个选项卡，则可以在第一次重新渲染完成之前执行此操作而无需等待。

````
startTransition 与 useTransition 非常相似，但它不提供 isPending 标志来跟踪一个 transition 是否正在进行。你可以在 useTransition 不可用时调用 startTransition。例如，在组件外部（如从数据库中）使用 startTransition。

在 useTransition 页面上了解 transition 并查看示例。
````













































