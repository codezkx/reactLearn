# React Router Hooks

## [useBeforeUnload ](https://reactrouter.com/en/main/hooks/use-before-unload)

在 HTML/HTTP 中，使用导航模型来建模数据的变化和加载：使用 <a href> 和 <form action>。这两种方式都会导致浏览器的导航。React Router 的等价物是 <Link> 和 <Form>。

但有时候，您可能想在不导航的情况下调用加载器，或者调用操作（并获取页面上的数据以重新验证）而不更改 URL。或者您需要同时进行多个变化。

与服务器的许多交互并不是导航事件。这个钩子让您可以将 UI 插入到操作和加载器中，而无需导航。

> **警告**
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

这些情况下使用 JavaScript 很有用：

- 获取与 UI 路由无关的数据（弹出框、动态表单等）。
- 提交数据到操作而无需导航（例如共享组件，如新闻订阅注册）。
- 处理列表中的多个并发提交（典型的“待办事项”列表，您可以单击多个按钮，所有按钮都应该同时处于等待状态）。
- 无限滚动容器。
- 还有其他更多情况！

如果您正在构建高度交互式、类似应用程序的用户界面，您经常会使用 Fetcher。

````react
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  // 可以在 useEffect 中调用 submit 或 load。
  React.useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // 使用以下属性构建您的 UI：
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // 要渲染不会导致页面导航的表单，请使用 <fetcher.Form>
  return <fetcher.Form />;
}
````

Fetchers具有许多内置行为：

- 自动处理取消操作，以避免在获取数据时出现中断情况。
- 当使用POST、PUT、PATCH、DELETE等方式提交时，会首先调用操作。
- 操作完成后，会重新验证页面上的数据以捕获可能发生的任何变化，从而自动保持您的UI与服务器状态同步。
- 当同时有多个Fetchers正在获取数据时，它会：
  - 在它们每次到达时提交最新的可用数据。
  - 确保没有过时的数据覆盖更新的数据，无论哪个响应返回的顺序都是如此。
- 处理未捕获的错误，并渲染最近的错误元素（就像从<Link>或<Form>进行普通导航一样）。
- 如果您调用的操作/加载器返回重定向，则会重定向应用程序（就像从<Link>或<Form>进行普通导航一样）。

### fetcher.state

您可以通过 fetcher.state 来了解 fetcher 的状态。它将是以下之一：

- idle - 没有正在获取数据。
- submitting - 由于使用 POST、PUT、PATCH 或 DELETE 提交 fetcher，正在调用路由操作。
- loading - fetcher 正在调用 loader（从 fetcher.load 中）或在单独的提交或 useRevalidator 调用之后进行重新验证。

### fetcher.Form

fetcher.Form 就像 <Form> 一样，但不会导致页面导航。（您可能需要适应 JSX 中的点号...我们希望如此！）

```react
function SomeComponent() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/some/route">
      <input type="text" />
    </fetcher.Form>
  );
}
```

### fetcher.load()

从路由加载器中加载数据。

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

虽然一个 URL 可能匹配多个嵌套路由，但 fetcher.load() 调用只会在叶子路由匹配（或索引路由的父路由）上调用加载器。

如果您发现自己在单击处理程序中调用此函数，您可能可以通过使用 <fetcher.Form> 来简化代码。

>**提示**
>
>虽然一个 URL 可能匹配多个嵌套路由，但 fetcher.load() 调用只会在叶子路由匹配（或索引路由的父路由）上调用加载器。
>
>如果您发现自己在单击处理程序中调用此函数，您可能可以通过使用 <fetcher.Form> 来简化代码。

### fetcher.submit()

<fetcher.Form> 的命令式版本。如果用户交互应该启动请求，则应使用 <fetcher.Form>。但是，如果您作为程序员启动请求（而不是响应用户单击按钮等操作），则应使用此函数。

例如，您可能希望在一段空闲时间后注销用户：

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

如果您发现自己在单击处理程序中调用此函数，您可能可以通过使用 <fetcher.Form> 来简化代码。

### fetcher.data

加载器或操作返回的数据存储在这里。一旦数据设置，即使重新加载和重新提交，它也会持久存在于 fetcher 上。

```react
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
```

### fetcher.formData

使用 <fetcher.Form> 或 fetcher.submit() 时，表单数据可用于构建乐观 UI。

```react
function TaskCheckbox({ task }) {
  let fetcher = useFetcher();

// 当数据正在获取时，使用它立即渲染
// 任务提交完成时，您期望任务处于的状态，
// 而不是等待网络响应。当网络响应时，
// formData 将不再可用，UI 将使用从重新验证中的 task.status 中的值
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
```

fetcher.formAction

告诉您表单提交到的操作 URL。

```react
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
```

### fetcher.formMethod

告诉您表单提交的方法：get、post、put、patch 或 delete。

```react
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
```

>**警告**
>
>如果没有使用 future.v7_normalizeFormMethod 未来的标志，fetcher.formMethod 字段是小写的。将其规范化为大写以与 v7 中 fetch() 的行为一致，因此请升级您的 React Router v6 应用程序以采用大写 HTTP 方法。