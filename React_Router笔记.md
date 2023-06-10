# React Router Hooks

## [useBeforeUnload ](https://reactrouter.com/en/main/hooks/use-before-unload)

这个钩子只是一个 window.onbeforeunload 的帮助程序。在用户离开您的页面之前，将重要的应用程序状态保存在页面上（例如浏览器的本地存储）可能很有用。这样，如果他们回来，您就可以恢复任何有状态信息（恢复表单输入值等）。

````reactimport { 
import { 
    // useBeforeUnload,
    Form,
} from 'react-router-dom';
import { 
    useState,
    useCallback,
    useEffect,
} from 'react';


const RouterBeforeUnload = () => {
    const [state, setState] = useState('');
    const a = useBeforeUnload( // 卸载页面时 触发该钩子
        useCallback(() => {
            localStorage.stuff = state
        }, [state])
    );

    useEffect(() => {
        if (!state && localStorage.stuff) {
            setState(localStorage.stuff);
        }
    }, [state]);

    return (
        <Form method='post'>
            <label htmlFor='beforeUnload'>useBeforeUnload</label>
            <input
                value={state}
                type="text" 
                id="beforeUnload" 
                onChange={ (event) => {
                    const text = event.target?.value
                    setState(text)
                } }
            />
        </Form>
    )
}

/* 
	丐版实现
    useBeforeunload 注意思想是
        只要传入一个发生 beforeunload 事件时需要执行的回调函数即可。

        主要做了下面几件事情:

        注册 beforeunload 事件监听器
        执行传入的 onBeforeUnload 回调函数
        返回清理函数,用来在卸载组件时移除事件监听器

*/
const useBeforeUnload = (callback: (event: BeforeUnloadEvent) => any) => {
    useEffect(() => {
        const onBeforeUnloadListener = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            callback(event);
        }
        window.addEventListener('beforeunload', onBeforeUnloadListener);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnloadListener);
        };
    }, [callback]);
}

export default RouterBeforeUnload



````

## [useFetcher ](https://reactrouter.com/en/main/hooks/use-fetcher)

> 在 HTML/HTTP 中，使用导航模型来建模数据的变化和加载：使用 <a href> 和 <form action>。这两种方式都会导致浏览器的导航。React Router 的等价物是 <Link> 和 <Form>。
>
> 但有时候，您可能想在不导航的情况下调用加载器，或者调用操作（并获取页面上的数据以重新验证）而不更改 URL。或者您需要同时进行多个变化。
>
> 与服务器的许多交互并不是导航事件。这个钩子让您可以将 UI 插入到操作和加载器中，而无需导航。

这个特性很有用的场景包括：

- 获取与 UI 路由不相关的数据（例如弹出框、动态表单等）。
- 提交数据到操作而不导航（例如共享组件，例如注册新闻通讯等）。
- 处理列表中多个并发提交的情况（例如典型的 "todo 应用" 列表，您可以单击多个按钮，并且所有按钮都应该同时处于等待状态）。
- 无限滚动容器。
- 等等！

如果您正在构建高度交互式的 "应用程序式" 用户界面，则经常会使用 useFetcher。

````react
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  // call submit or load in a useEffect
  React.useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // build your UI with these properties
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // render a form that doesn't cause navigation
  return <fetcher.Form />;
}
````

Fetchers内置了很多功能：

- 在中断fetch时自动处理取消操作
- 当使用POST、PUT、PATCH、DELETE提交时，首先调用操作
- 操作完成后，重新验证页面上的数据，以捕获可能发生的任何变化，自动保持 UI 与服务器状态同步
- 当有多个fetchers同时进行时，将根据每个fetcher返回的最新数据提交
- 确保没有旧的加载覆盖更新的数据，无论响应的顺序如何
- 通过渲染最近的 errorElement 处理未捕获的错误（就像从 <Link> 或 <Form> 进行正常导航一样）
- 如果被调用的操作/加载程序返回重定向，则会重定向应用程序（就像从 <Link> 或 <Form> 进行正常导航一样）

### fetcher.state

您可以使用 fetcher.state 来了解 fetcher 的状态，它将是以下之一：

- idle - 没有进行任何获取。
- submitting - 由于使用 POST、PUT、PATCH 或 DELETE 进行 fetcher 提交，正在调用路由操作。
- loading - fetcher 正在调用加载程序（来自 fetcher.load）或在单独提交或使用 useRevalidator 之后进行重新验证。

### fetcher.Form

与 <Form> 相似，但它不会导致导航。（我们希望您可以适应 JSX 中的点号！）

````react
function SomeComponent() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/some/route">
      <input type="text" />
    </fetcher.Form>
  );
}
````

### fetcher.load()

从路由加载程序加载数据。

````react
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/some/route");
    }
  }, [fetcher]);

  return <div>{fetcher.data || "Loading..."}</div>;
}
````

虽然一个 URL 可能匹配多个嵌套路由，但 fetcher.load() 调用仅会在叶子匹配（或索引路由的父级）上调用加载程序。

如果您发现自己在单击处理程序中调用此函数，那么您可能可以通过使用 <fetcher.Form> 来简化代码。

> **提示**
>
> 页面上任何活动的 fetcher.load 调用都将作为重新验证的一部分被重新执行（在导航提交、另一个 fetcher 提交或 useRevalidator() 调用之后）。

### fetcher.submit()

<fetcher.Form> 的命令式版本。如果用户交互应该启动 fetch，则应使用 <fetcher.Form>。但如果您作为程序员发起 fetch（而不是响应用户单击按钮等操作），则应使用此函数。

例如，您可能希望在一定时间的空闲后将用户注销：

````react
import { useFetcher } from "react-router-dom";
import { useFakeUserIsIdle } from "./fake/hooks";

export function useIdleLogout() {
  const fetcher = useFetcher();
  const userIsIdle = useFakeUserIsIdle();

  useEffect(() => {
    if (userIsIdle) {
      fetcher.submit(
        { idle: true },
        { method: "post", action: "/logout" }
      );
    }
  }, [userIsIdle]);
}
````

如果要提交到索引路由，请使用 ?index 参数。

如果您发现自己在单击处理程序中调用此函数，那么您可能可以通过使用 <fetcher.Form> 来简化代码。

### fetcher.data

来自加载程序或操作的返回数据存储在这里。一旦设置了数据，它将在 fetcher 上持续存在，即使重新加载和重新提交数据也是如此。

````react
function ProductDetails({ product }) {
  const fetcher = useFetcher();

  return (
    <details
      onToggle={(event) => {
        if (
          event.currentTarget.open &&
          fetcher.state === "idle" &&
          !fetcher.data
        ) {
          fetcher.load(`/product/${product.id}/details`);
        }
      }}
    >
      <summary>{product.name}</summary>
      {fetcher.data ? (
        <div>{fetcher.data}</div>
      ) : (
        <div>Loading product details...</div>
      )}
    </details>
  );
}
````

### fetcher.formData

在使用 <fetcher.Form> 或 fetcher.submit() 时，表单数据可用于构建乐观 UI。

````react
function TaskCheckbox({ task }) {
  let fetcher = useFetcher();

// 在数据正在进行的时候，使用它来立即渲染您期望任务在表单提交完成时所处的状态，而不是等待网络响应。当网络响应时，formData 将不再可用，UI 将使用重新验证中的 task.status 中的值。
  let status =
    fetcher.formData?.get("status") || task.status;

  let isComplete = status === "complete";

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="status"
        value={isComplete ? "complete" : "incomplete"}
      >
        {isComplete ? "Mark Complete" : "Mark Incomplete"}
      </button>
    </fetcher.Form>
  );
}
````

### fetcher.formAction

告诉您表单要提交到的操作 URL。

````react
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
````

### fetcher.formMethod

告诉您被提交表单的方法：get、post、put、patch 或 delete。

````react
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
````

> **警告**
>
> fetcher.formMethod 字段在未来的 v7_normalizeFormMethod 未来标志下是小写的。为了与 v7 中 fetch() 的行为保持一致，它正在被规范化为大写。因此，请升级您的 React Router v6 应用程序以采用大写的 HTTP 方法。



















