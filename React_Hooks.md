# React Hooks

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

















