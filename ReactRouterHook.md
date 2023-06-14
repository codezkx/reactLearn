# React Router Hooks

## useBeforeUnload 

>这个钩子只是一个 window.onbeforeunload 的帮助程序。在用户离开您的页面之前，将重要的应用程序状态保存在页面上（例如浏览器的本地存储）可能很有用。这样，如果他们回来，您就可以恢复任何有状态信息（恢复表单输入值等）。
>
>````react
>import { 
>// useBeforeUnload,
>Form,
>} from 'react-router-dom';
>import { 
>useState,
>useCallback,
>useEffect,
>} from 'react';
>
>
>const RouterBeforeUnload = () => {
>const [state, setState] = useState('');
>const a = useBeforeUnload( // 卸载页面时 触发该钩子
>   useCallback(() => {
>       localStorage.stuff = state
>   }, [state])
>);
>
>useEffect(() => {
>   if (!state && localStorage.stuff) {
>       setState(localStorage.stuff);
>   }
>}, [state]);
>
>return (
>   <Form method='post'>
>       <label htmlFor='beforeUnload'>useBeforeUnload</label>
>       <input
>           value={state}
>           type="text" 
>           id="beforeUnload" 
>           onChange={ (event) => {
>               const text = event.target?.value
>               setState(text)
>           } }
>       />
>   </Form>
>)
>}
>
>/* 
>丐版实现
>useBeforeunload 注意思想是
>   只要传入一个发生 beforeunload 事件时需要执行的回调函数即可。
>
>   主要做了下面几件事情:
>
>   注册 beforeunload 事件监听器
>   执行传入的 onBeforeUnload 回调函数
>   返回清理函数,用来在卸载组件时移除事件监听器
>
>*/
>const useBeforeUnload = (callback: (event: BeforeUnloadEvent) => any) => {
>useEffect(() => {
>   const onBeforeUnloadListener = (event: BeforeUnloadEvent) => {
>       event.preventDefault();
>       callback(event);
>   }
>   window.addEventListener('beforeunload', onBeforeUnloadListener);
>   return () => {
>       window.removeEventListener('beforeunload', onBeforeUnloadListener);
>   };
>}, [callback]);
>}
>
>export default RouterBeforeUnload
>
>
>
>````
>

## [useFetcher ](https://reactrouter.com/en/main/hooks/use-fetcher)(v6)

>> 在 HTML/HTTP 中，使用导航模型来建模数据的变化和加载：使用 <a href> 和 <form action>。这两种方式都会导致浏览器的导航。React Router 的等价物是 <Link> 和 <Form>。
>
>> 但有时候，您可能想在不导航的情况下调用加载器，或者调用操作（并获取页面上的数据以重新验证）而不更改 URL。或者您需要同时进行多个变化。
>
>> 与服务器的许多交互并不是导航事件。这个钩子让您可以将 UI 插入到操作和加载器中，而无需导航。
>
>这个特性很有用的场景包括：
>
>- 获取与 UI 路由不相关的数据（例如弹出框、动态表单等）。
>- 提交数据到操作而不导航（例如共享组件，例如注册新闻通讯等）。
>- 处理列表中多个并发提交的情况（例如典型的 "todo 应用" 列表，您可以单击多个按钮，并且所有按钮都应该同时处于等待状态）。
>- 无限滚动容器。
>- 等等！
>
>如果您正在构建高度交互式的 "应用程序式" 用户界面，则经常会使用 useFetcher。
>
>````react
>import { useFetcher } from "react-router-dom";
>
>function SomeComponent() {
> const fetcher = useFetcher();
>
> // call submit or load in a useEffect
> React.useEffect(() => {
>   fetcher.submit(data, options);
>   fetcher.load(href);
> }, [fetcher]);
>
> // build your UI with these properties
> fetcher.state;
> fetcher.formData;
> fetcher.formMethod;
> fetcher.formAction;
> fetcher.data;
>
> // render a form that doesn't cause navigation
> return <fetcher.Form />;
>}
>````
>
>Fetchers内置了很多功能：
>
>- 在中断fetch时自动处理取消操作
>- 当使用POST、PUT、PATCH、DELETE提交时，首先调用操作
>- 操作完成后，重新验证页面上的数据，以捕获可能发生的任何变化，自动保持 UI 与服务器状态同步
>- 当有多个fetchers同时进行时，将根据每个fetcher返回的最新数据提交
>- 确保没有旧的加载覆盖更新的数据，无论响应的顺序如何
>- 通过渲染最近的 errorElement 处理未捕获的错误（就像从 <Link> 或 <Form> 进行正常导航一样）
>- 如果被调用的操作/加载程序返回重定向，则会重定向应用程序（就像从 <Link> 或 <Form> 进行正常导航一样）
>
>### fetcher.state
>
>您可以使用 fetcher.state 来了解 fetcher 的状态，它将是以下之一：
>
>- idle - 没有进行任何获取。
>- submitting - 由于使用 POST、PUT、PATCH 或 DELETE 进行 fetcher 提交，正在调用路由操作。
>- loading - fetcher 正在调用加载程序（来自 fetcher.load）或在单独提交或使用 useRevalidator 之后进行重新验证。
>
>### fetcher.Form
>
>与 <Form> 相似，但它不会导致导航。（我们希望您可以适应 JSX 中的点号！）
>
>````react
>function SomeComponent() {
> const fetcher = useFetcher();
> return (
>   <fetcher.Form method="post" action="/some/route">
>     <input type="text" />
>   </fetcher.Form>
> );
>}
>````
>
>### fetcher.load()
>
>从路由加载程序加载数据。
>
>````react
>import { useFetcher } from "react-router-dom";
>
>function SomeComponent() {
> const fetcher = useFetcher();
>
> useEffect(() => {
>   if (fetcher.state === "idle" && !fetcher.data) {
>     fetcher.load("/some/route");
>   }
> }, [fetcher]);
>
> return <div>{fetcher.data || "Loading..."}</div>;
>}
>````
>
>虽然一个 URL 可能匹配多个嵌套路由，但 fetcher.load() 调用仅会在叶子匹配（或索引路由的父级）上调用加载程序。
>
>如果您发现自己在单击处理程序中调用此函数，那么您可能可以通过使用 <fetcher.Form> 来简化代码。
>
>> **提示**
>
>> 页面上任何活动的 fetcher.load 调用都将作为重新验证的一部分被重新执行（在导航提交、另一个 fetcher 提交或 useRevalidator() 调用之后）。
>
>### fetcher.submit()
>
><fetcher.Form> 的命令式版本。如果用户交互应该启动 fetch，则应使用 <fetcher.Form>。但如果您作为程序员发起 fetch（而不是响应用户单击按钮等操作），则应使用此函数。
>
>例如，您可能希望在一定时间的空闲后将用户注销：
>
>````react
>import { useFetcher } from "react-router-dom";
>import { useFakeUserIsIdle } from "./fake/hooks";
>
>export function useIdleLogout() {
> const fetcher = useFetcher();
> const userIsIdle = useFakeUserIsIdle();
>
> useEffect(() => {
>   if (userIsIdle) {
>     fetcher.submit(
>       { idle: true },
>       { method: "post", action: "/logout" }
>     );
>   }
> }, [userIsIdle]);
>}
>````
>
>如果要提交到索引路由，请使用 ?index 参数。
>
>如果您发现自己在单击处理程序中调用此函数，那么您可能可以通过使用 <fetcher.Form> 来简化代码。
>
>### fetcher.data
>
>来自加载程序或操作的返回数据存储在这里。一旦设置了数据，它将在 fetcher 上持续存在，即使重新加载和重新提交数据也是如此。
>
>````react
>function ProductDetails({ product }) {
> const fetcher = useFetcher();
>
> return (
>   <details
>     onToggle={(event) => {
>       if (
>         event.currentTarget.open &&
>         fetcher.state === "idle" &&
>         !fetcher.data
>       ) {
>         fetcher.load(`/product/${product.id}/details`);
>       }
>     }}
>   >
>     <summary>{product.name}</summary>
>     {fetcher.data ? (
>       <div>{fetcher.data}</div>
>     ) : (
>       <div>Loading product details...</div>
>     )}
>   </details>
> );
>}
>````
>
>### fetcher.formData
>
>在使用 <fetcher.Form> 或 fetcher.submit() 时，表单数据可用于构建乐观 UI。
>
>````react
>function TaskCheckbox({ task }) {
> let fetcher = useFetcher();
>
>// 在数据正在进行的时候，使用它来立即渲染您期望任务在表单提交完成时所处的状态，而不是等待网络响应。当网络响应时，formData 将不再可用，UI 将使用重新验证中的 task.status 中的值。
> let status =
>   fetcher.formData?.get("status") || task.status;
>
> let isComplete = status === "complete";
>
> return (
>   <fetcher.Form method="post">
>     <button
>       type="submit"
>       name="status"
>       value={isComplete ? "complete" : "incomplete"}
>     >
>       {isComplete ? "Mark Complete" : "Mark Incomplete"}
>     </button>
>   </fetcher.Form>
> );
>}
>````
>
>### fetcher.formAction
>
>告诉您表单要提交到的操作 URL。
>
>````react
><fetcher.Form action="/mark-as-read" />;
>
>// when the form is submitting
>fetcher.formAction; // "mark-as-read"
>````
>
>### fetcher.formMethod
>
>告诉您被提交表单的方法：get、post、put、patch 或 delete。
>
>````react
><fetcher.Form method="post" />;
>
>// when the form is submitting
>fetcher.formMethod; // "post"
>````
>
>> **警告**
>
>> fetcher.formMethod 字段在未来的 v7_normalizeFormMethod 未来标志下是小写的。为了与 v7 中 fetch() 的行为保持一致，它正在被规范化为大写。因此，请升级您的 React Router v6 应用程序以采用大写的 HTTP 方法。

## useFormAction(v6)

**类型注释**

````ts
declare function useFormAction(
  action?: string,
  { relative }: { relative?: RelativeRoutingType } = {}
): string;
````

该 hook 在 <Form> 内部使用，可自动解析默认和相对于上下文的当前路由的操作。虽然不常见，但您可以直接使用它来做一些事情，比如计算一个 <button formAction> 的正确操作来更改按钮的 <Form> 的操作。（是的，HTML 按钮可以更改其表单的操作！）

```react
import { useFormAction } from "react-router-dom";

function DeleteButton() {
  return (
    <button
      formAction={useFormAction("destroy")}
      formMethod="post"
    >
      Delete
    </button>
  );
}
```

它还可以用于自动解析提交和 fetcher.submit 的操作，非常实用

````react
let submit = useSubmit();
let action = useFormAction();
submit(formData, { action });
````

## [useHref](https://reactrouter.com/en/main/hooks/use-href)

**类型注释**

```
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```



useHref hook 返回一个 URL，该 URL 可用于链接到给定的位置，即使在 React Router 外部也可以使用。

> 提示：
>
> 您可能会对查看 react-router-dom 中 <Link> 组件的源代码感兴趣，以了解它如何在内部使用 useHref 来确定自己的 href 值。

## [useInRouterContext](https://reactrouter.com/en/main/hooks/use-in-router-context)

useInRouterContext hooks 返回 true，如果组件在 <Router> 的上下文中呈现，则返回 true，否则返回 false。这对于一些需要知道它们是否在 React Router 应用程序的上下文中呈现的第三方扩展非常有用。

## [useLinkClickHandler](https://reactrouter.com/en/main/hooks/use-link-click-handler)

**类型注释**

````react
declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To, // route
  options?: {
    target?: React.HTMLAttributeAnchorTarget; // 
    replace?: boolean; // 替换路由
    state?: any; // 状态
    options?: { relative?: RelativeRoutingType };
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;
````

在 react-router-dom 中构建自定义 <Link> 时，useLinkClickHandler 挂钩返回用于导航的点击事件处理程序。

```react
import {
    useHref,
    useLinkClickHandler,
} from 'react-router-dom';

import { forwardRef } from 'react';

const LinkClickHandler = forwardRef(({
	onClick,
	replace,
	state,
	target,
	to,
	...rest
}, ref) => {
	const href = useHref(to);
	let handleClick = useLinkClickHandler(to, {
		replace,
		state,
		target,
	})
	console.log(to, 'to')
	return (
		<a
			{...rest}
			style={{color: 'fuchsia'}}
			href={href}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					handleClick(event);
				}
			}}
			ref={ref}
			target={target}
		>

		</a>
	)
})

const RouterLinkClickHandler = () => {
	return (
		<LinkClickHandler
			state='你好'
			to='/fetcher'
		>
			Link
		</LinkClickHandler>  
	)
}


export default RouterLinkClickHandler

```

## [useLinkPressHandler](https://reactrouter.com/en/main/hooks/use-link-press-handler)

**类型注释**

````react
declare function useLinkPressHandler(
  to: To, // route
  options?: {
    replace?: boolean; // 
    state?: any;
  }
): (event: GestureResponderEvent) => void;
````



useLinkClickHandler 的 react-router-native 对应物，useLinkPressHandler 返回用于自定义 <Link> 导航的按下事件处理程序。

```react
import { TouchableHighlight } from "react-native";
import { useLinkPressHandler } from "react-router-native";

function Link({
  onPress,
  replace = false,
  state,
  to,
  ...rest
}) {
  let handlePress = useLinkPressHandler(to, {
    replace,
    state,
  });

  return (
    <TouchableHighlight
      {...rest}
      onPress={(event) => {
        onPress?.(event);
        if (!event.defaultPrevented) {
          handlePress(event);
        }
      }}
    />
  );
}
```

## [useLoaderData](https://reactrouter.com/en/main/hooks/use-loader-data)(v6)

这个钩子提供了从您的路由加载器返回的值。

````react
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

function loader() {
  return fetchFakeAlbums();
}

export function Albums() {
  const albums = useLoaderData();
  // ...
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: loader,
    element: <Albums />,
  },
]);

ReactDOM.createRoot(el).render(
  <RouterProvider router={router} />
);
````

在路由操作被调用后，数据将会自动重新验证并返回您的加载器的最新结果。

请注意，useLoaderData 不会启动一个数据获取请求。它只是简单地读取 React Router 内部管理的数据获取请求的结果，因此您不需要担心它会在路由之外的情况下重新渲染时重新发起请求。

这也意味着在重新渲染之间返回的数据是稳定的，因此您可以将其安全地传递给 React hooks 中的依赖数组，如 useEffect。它仅在操作或某些导航后再次调用加载器时才会更改。在这些情况下，标识将会更改（即使值没有更改）。

您可以在任何组件或任何自定义 hook 中使用此钩子，而不仅仅是 Route 元素。它将返回上下文中最近的路由的数据。

要从页面上的任何活动路由获取数据，请使用 useRouteLoaderData。

## [useMatch](https://reactrouter.com/en/main/hooks/use-match)

**类型注释**

````ts
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path
): PathMatch<ParamKey> | null;
````

返回有关相对于当前位置给定路径的路由匹配数据。

```jsx
import { useMatch } from 'react-router-dom';

function MyComponent() {
  const match = useMatch('/users/:userId');

  if (match) {
    return <div>User ID: {match.params.userId}</div>;
  } else {
    return <div>Please provide a valid user ID.</div>;
  }
}
```

在上面的例子中，`useMatch` 会检查当前路径是否与指定的 `/users/:userId` 路径匹配。如果匹配成功，则返回一个包含匹配数据的对象，否则返回 `null`。在这个例子中，如果路径匹配，就会在页面上显示当前用户的 ID，否则会提示用户提供一个有效的用户 ID。

值得注意的是，`useMatch` 只会在第一次渲染时进行匹配，后续的路由变化不会触发匹配，因此需要使用其他的 React Router Hook 来监听路由变化，如 `useLocation` 和 `useHistory`。

See [`matchPath`](https://reactrouter.com/en/main/utils/match-path) for more information.

## [useMatches ](https://reactrouter.com/en/main/hooks/use-matches)(v6)

`useRoutes` 返回页面上当前路由匹配的结果。这对于在父级布局中创建抽象组件来访问其子路由的数据非常有用。

```react
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

路由匹配对象的形状如下：

```react
{
  // route id
  id,

  // the portion of the URL the route matched
  pathname,

  // the data from the loader
  data,

  // the parsed params from the URL
  params,

  // the <Route handle> with any app specific data
  handle,
};
```

将 `<Route handle>` 与 `useMatches` 结合使用非常强大，因为您可以将任何内容放在路由句柄上，并且可以在任何地方访问 `useMatches`。

> **警告**
>
> `useMatches` 只适用于像 `createBrowserRouter` 这样的数据路由，因为它们事先知道完整的路由树，可以提供所有当前的匹配结果。此外，`useMatches` 不会向下匹配到任何子路由树，因为路由器不知道子路由。

### Breadcrumbs（面包屑导航）

“面包屑导航”是一个常见的应用场景，它可以在父级布局中添加面包屑导航，使用子路由的数据来构建导航路径。

```react
<Route element={<Root />}>
  <Route
    path="messages"
    element={<Messages />}
    loader={loadMessages}
    handle={{
      // you can put whatever you want on a route handle
      // here we use "crumb" and return some elements,
      // this is what we'll render in the breadcrumbs
      // for this route
      crumb: () => <Link to="/messages">Messages</Link>,
    }}
  >
    <Route
      path="conversation/:id"
      element={<Thread />}
      loader={loadThread}
      handle={{
        // `crumb` is your own abstraction, we decided
        // to make this one a function so we can pass
        // the data from the loader to it so that our
        // breadcrumb is made up of dynamic content
        crumb: (data) => <span>{data.threadName}</span>,
      }}
    />
  </Route>
</Route>
```

现在，我们可以创建一个 `Breadcrumbs` 组件，利用我们自己的面包屑抽象，结合 `useMatches` 和 `handle` 来构建。

```react
function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    // 首先删除没有 handle 和 crumb 属性的匹配结果
    .filter((match) => Boolean(match.handle?.crumb))
    // 现在将它们映射成一个元素数组，并将加载器数据传递给每个元素
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}

/*  useMatches 返回的值
	[
    {
        "id": "0",
        "pathname": "/",
        "params": {
            "id": "123"
        },
        "data": {
            "request": {},
            "params": {
                "id": "123"
            }
        }
    },
    {
        "id": "0-10",
        "pathname": "/matches/123",
        "params": {
            "id": "123"
        },
        handle: {crumb: ƒ}
    }
]
*/
```

现在，您可以在任何地方渲染 `<Breadcrumbs/>`，可能是在根组件中。

## [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)

> **警告**
>
> [`redirect`](https://reactrouter.com/en/main/fetch/redirect)通常使用in [`loaders`](https://reactrouter.com/en/main/route/loader)and[`actions`](https://reactrouter.com/en/main/route/action)比使用这个钩子更好

`useNavigate` 钩子返回一个函数，该函数允许您以编程方式导航，例如在 `useEffect` 中使用

```react
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

**类型声明**

```react
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}
```

`navigate` 函数有两个参数：

1. 要导航到的目标地址（与 `<Link to>` 中的 `to` 属性类型相同），可选的第二个参数为 `{ replace, state }`。
2. 要在历史记录栈中导航的增量。例如，`navigate(-1)` 相当于按下后退按钮。

如果使用 `replace: true`，则导航将替换历史记录栈中的当前条目而不是添加一个新条目。

## [useNavigation ](https://reactrouter.com/en/main/hooks/use-navigation)(v6)

这个钩子可以告诉您有关页面导航的所有信息，以便在数据变化时构建挂起导航指示器和乐观 UI。例如：

- 全局加载指示器
- 在执行变更时禁用表单
- 在提交按钮上添加忙碌指示器
- 在服务器上创建新记录时，乐观地显示新记录
- 在更新记录时，乐观地显示记录的新状态

> **警告**
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

````react
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.formAction;
  navigation.formMethod;
}
````

> **警告**
>
> 如果未启用 future.v7_normalizeFormMethod 未来标志，则 useNavigation().formMethod 字段为小写。为了与 v7 中 fetch() 的行为保持一致，它将被规范化为大写。因此，请升级您的 React Router v6 应用程序以采用大写的 HTTP 方法。

### navigation.state

- idle - 没有挂起的导航。
- submitting - 由于使用 POST、PUT、PATCH 或 DELETE 提交表单，正在调用路由动作。
- loading - 加载器正在被调用以渲染下一页的路由。

正常的导航和 GET 表单提交将通过以下状态进行转换：

> ```react
> idle → loading → idle
> ```

使用 POST、PUT、PATCH 或 DELETE 的表单提交将通过以下状态进行转换：

> ```react
> idle → submitting → loading → idle
> ```

`navigation.state`在提供活动导航的高级状态的同时，您可以通过将其与其他`navigation`方面相结合来推断出更细粒度的信息：

````react
// Is this just a normal load?
let isNormalLoad =
  navigation.state === "loading" &&
  navigation.formData == null;

// Are we reloading after an action?
let isReloading =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction === navigation.location.pathname;

// Are we redirecting after an action?
let isRedirecting =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction !== navigation.location.pathname;
````

### navigation.formData

使用 <Form> 或 useSubmit 开始的任何 POST、PUT、PATCH 或 DELETE 导航都将附加到您的表单提交数据。这主要有助于使用 submission.formData FormData 对象构建 "乐观 UI"。

在 GET 表单提交的情况下，formData 将为空，数据将反映在 navigation.location.search 中。

### navigation.location

这会告诉您下一个[位置](https://reactrouter.com/en/main/utils/location)是什么。

请注意，如果表单正在提交到链接指向的 URL，则此链接不会显示为“待处理”，因为我们只在“加载”状态下这样做。当状态为“正在提交”时，表单将包含待处理的 UI，一旦操作完成，链接将变为待处理状态。

## useNavigationType 

**类型注释**

````react
declare function useNavigationType(): NavigationType;
// 如果操添加到历史堆栈
type NavigationType = "POP" | "PUSH" | "REPLACE";
````

此钩子返回当前导航的类型，或者用户是通过历史堆栈中的 pop、push 还是 replace 操作来到达当前页面的。

## useOutlet

**类型注释**

```ts
declare function useOutlet(): React.ReactElement | null;
```

返回路由层次结构这一级别的子路由的元素。这个钩子在内部被用来[``](https://reactrouter.com/en/main/components/outlet)渲染子路由。

有几个原因可能会导致 useOutlet 返回空值:

1. 当前组件没有被包含在任何 <Routes> 组件内。

​			只有嵌套在 <Routes> 内的路由才会有 outlet 对象。

1. 当前组件不是一个路由或子路由。

​			只有符合路由规则(<Route> 组件)的组件才会有 outlet 对象。

1. 当前路由已经被卸载。

​			当路由已经离开 DOM 树时,其 outlet 对象将会被销毁。

1. 路由的 key 发生变化。

​			当路由的 key prop 变化时,其 outlet 对象也将被重新创建。

1. 当前路由是懒加载路由。

​			懒加载路由在初始化时并不被创建,等到真正访问时才创建,导致在初始渲染时 useOutlet 返回空。

所以一般情况下,如果 useOutlet 返回空值,需要检查:

- 组件是否正确嵌套在 <Routes> 内
- 组件是否是一个有效的 <Route> 组件
- 路由是否已经离开 DOM 树
- 路由 key 是否发生变化
- 路由是否是一个懒加载路由

解决方法通常是正确设置组件,保证路由一直存在于 DOM 树中,避免在初始化时使用懒加载路由等。

## [useOutletContext](https://reactrouter.com/en/main/hooks/use-outlet-context)

**类型注释**

````ts
declare function useOutletContext<
  Context = unknown
>(): Context;
````

父子路由间共享状态是非常普通的场景。React Router的<Outlet/>提供了一个不错的解决方案,使用context。

```react
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
```

```react
import { useOutletContext } from "react-router-dom";

function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

如果你使用TypeScript,我们推荐父组件提供一个自定义hook来访问context值。这有助于消费者拥有良好的类型定义,控制消费者以及知道谁在消耗context值。这里是一个更现实的例子:

```react
import * as React from "react";
import type { User } from "./types";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { user: User | null };

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ user }} />
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
```

```react
import { useUser } from "../dashboard";

export default function DashboardMessages() {
  const { user } = useUser();
  return (
    <div>
      <h2>Messages</h2>
      <p>Hello, {user.name}!</p>
    </div>
  );
}
```

## [useParams](https://reactrouter.com/en/main/hooks/use-params)

**类型注释**

````ts
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
````

useParams hook返回当前URL匹配的<Route path>动态参数的键值对对象。子路由会继承父路由的所有参数。

```react
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```

## [useResolvedPath](https://reactrouter.com/en/main/hooks/use-resolved-path)

**类型注释**

> ```ts
> declare function useResolvedPath(
>   to: To,
>   options?: { relative?: RelativeRoutingType }
> ): Path;
> ```

这个钩子会将给定的路径名与当前位置的路径名解析出来，从而得到完整的路径名。

在构建相对路径的链接时，这非常有用。例如，可以查看<NavLink>的源代码，它内部调用了useResolvedPath来解析要链接的页面的完整路径名。

```react
import React from "react";
import { useResolvedPath } from "react-router-dom";

function Demo() {
  const resolvedPath = useResolvedPath("/about");
  console.log(resolvedPath);
  // Object:
  // {
  //   pathname: "/about"
  //   search: ""
  //   hash: ""
  //   state: {}
  //   key: "some_key"
  // }
  
  return <div>Demo</div>;
}

export default Demo;
```

有关详细信息，请参阅[解析路径。](https://reactrouter.com/en/main/utils/resolve-path)

## [useRevalidator 🆕](https://reactrouter.com/en/main/hooks/use-revalidator)

这个钩子允许你出于任何原因重新验证数据。React Router在调用操作后会自动重新验证数据，但是你可能希望在其他情况下重新验证，比如当焦点返回窗口时。

> **警告**
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```react
import { useRevalidator } from "react-router-dom";

function WindowFocusRevalidator() {
  let revalidator = useRevalidator();

  useFakeWindowFocus(() => {
    revalidator.revalidate();
  });

  return (
    <div hidden={revalidator.state === "idle"}>
      Revalidating...
    </div>
  );
}
```

再次强调，React Router 已经在绝大多数情况下自动重新验证页面上的数据，因此这种情况很少需要使用本钩子。如果你发现自己需要使用它来响应用户交互的普通 CRUD 操作，那么可能没有充分利用其他自动完成此操作的 API，例如 <Form>、useSubmit 或 useFetcher。

### revalidator.state

属性告诉你当前重新验证的状态，可能是 "idle"（空闲）或 "loading"（加载中）。

这对于创建加载指示器和旋转动画非常有用，让用户知道应用正在处理中。

### revalidator.revalidate()

这会启动重新验证。

```react
function useLivePageData() {
  let revalidator = useRevalidator();
  let interval = useInterval(5000);

  useEffect(() => {
    if (revalidator.state === "idle") {
      revalidator.revalidate();
    }
  }, [interval]);
}
```

### Notes

虽然可以同时渲染多个 useRevalidator，但它实际上是一个单例。这意味着当调用一个 revalidator.revalidate() 时，所有实例都会同时进入 "loading" 状态（或者更确切地说，它们都会更新以报告单例状态）。

当在重新验证正在进行时调用 revalidate() 时，竞态条件会自动处理。

如果在重新验证正在进行时发生导航，重新验证将被取消，并为下一页从所有加载器请求新数据。

## [useRouteError 🆕](https://reactrouter.com/en/main/hooks/use-route-error)

在 errorElement 内部，这个钩子返回在操作、加载程序或渲染过程中抛出的任何内容。注意，抛出的响应有特殊的处理方式，请参阅 isRouteErrorResponse 了解更多信息。

> **警告**
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```react
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // unexpected errors in loaders/actions
    something.that.breaks();
  }}
  action={() => {
    // stuff you throw on purpose in loaders/actions
    throw new Response("Bad Request", { status: 400 });
  }}
  element={
    // and errors thrown while rendering
    <div>{breaks.while.rendering}</div>
  }
/>;
```

## useRouteLoaderData

钩子可以使当前渲染路由的数据在树中的任何位置都可用。这对于需要远在树深处的路由中获取数据的组件非常有用，也可以让父级路由获取树深处子路由的数据。

> **警告**
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](

React Router 内部使用确定性的、自动生成的路由 ID 存储数据，但你可以提供自己的路由 ID，使得这个钩子更易于使用。考虑一个定义了 ID 的路由的路由器：

```react
createBrowserRouter([
  {
    path: "/",
    loader: () => fetchUser(),
    element: <Root />,
    id: "root",
    children: [
      {
        path: "jobs/:jobId",
        loader: loadJob,
        element: <JobListing />,
      },
    ],
  },
]);
```

现在用户数据可以在应用的任何其他地方使用了。

````react
const user = useRouteLoaderData("root");
````

useRouteLoaderData 钩子只能获取当前渲染的路由的数据。如果你请求的是当前未渲染的路由的数据，钩子将返回 undefined。

## [useRoutes](https://reactrouter.com/en/main/hooks/use-routes)

**类型注释**

````react
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
````

useRoutes 钩子是 <Routes> 的函数式等价物，但它使用 JavaScript 对象来定义路由，而不是使用 <Route> 元素。这些对象具有与普通 <Route> 元素相同的属性，但它们不需要 JSX。

useRoutes 的返回值可以是一个有效的 React 元素，你可以用它来渲染路由树，如果没有匹配的路由，则返回 null。

```react
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```

## [useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)

> **提示**
>
> 这是 的网络版本`useSearchParams`。对于 React Native 版本，[请转到此处](https://reactrouter.com/en/main/hooks/use-search-params-rn)。

**类型声明**

```ts
declare function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```

useSearchParams 钩子用于读取和修改当前位置 URL 的查询字符串。与 React 自带的 useState 钩子类似，useSearchParams 返回一个由两个值组成的数组：当前位置的 search 参数和一个可用于更新它们的函数。与 React 的 useState 钩子一样，setSearchParams 还支持函数式更新。因此，你可以提供一个接受 searchParams 并返回更新后版本的函数。

```react
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </div>
  );
}
```

> **提示**
>
> setSearchParams 函数的工作方式类似于 navigate，但仅适用于 URL 的查询部分。另外请注意，setSearchParams 的第二个参数的类型与 navigate 的第二个参数相同。

````react
import { useSearchParams,   } from 'react-router-dom';

const RouterSearchParams =  () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('name'); // uzi
    console.log(userId, 'userId')
    function handleClick() {
        setSearchParams({name: 'uzi-s'})
        console.log(searchParams.get('name'), 'update')
    }
    return (
        <>
            <div onClick={ () => handleClick()}>setSearchParams</div>
        </>
    )
}

export default RouterSearchParams;
````



## [useSubmit 🆕](https://reactrouter.com/en/main/hooks/use-submit)

<Form> 的命令式版本，让你作为程序员可以提交一个表单，而不是用户。

> **警告**
>
> **此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)**

例如，每次表单内的值发生变化时提交表单：

```react
import { useSubmit, Form } from "react-router-dom";

function SearchField() {
  let submit = useSubmit();
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget);
      }}
    >
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </Form>
  );
}
```

如果你想在一段时间内没有活动后自动将某人登出你的网站，这也可能很有用。在这种情况下，我们将“没有活动”定义为用户在 5 分钟内没有导航到任何其他页面。

```react
import { useSubmit, useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdminPage() {
  useSessionTimeout();
  return <div>{/* ... */}</div>;
}

function useSessionTimeout() {
  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, 5 * 60_000);

    return () => clearTimeout(timer);
  }, [submit, location]);
}
```

### submit

submit 函数的第一个参数可以接受许多不同的值。

你可以提交任何表单或表单输入元素：

````
// input element events
<input onChange={(event) => submit(event.currentTarget)} />;

// React refs
let ref = useRef();
<button ref={ref} />;
submit(ref.current);
````

You can submit `FormData`:

````
let formData = new FormData();
formData.append("cheese", "gouda");
submit(formData);
````

### Submit options

第二个参数是一组直接映射到表单提交属性的选项：

```react
submit(null, {
  action: "/logout",
  method: "post",
});

// same as
<Form action="/logout" method="post" />;
```













