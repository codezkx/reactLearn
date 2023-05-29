# React Router

## createBrowserRouter

> 这是所有React Router Web项目推荐的路由器。它使用DOM History API来更新URL并管理历史记录堆栈。
>
> 它还启用了v6.4数据API，如加载器(loaders)、动作(actions)、获取器(fetchers)等。

````react
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
````

###  类型声明

```
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    future?: FutureConfig;
    hydrationData?: HydrationState;
    window?: Window;
  }
): RemixRouter;
```

### `routes`

[`Route`](https://reactrouter.com/en/main/route/route)属性上具有嵌套路由的对象数组`children`。

````
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "events/:id",
        element: <Event />,
        loader: eventLoader,
      },
    ],
  },
]);
````

### `basename`

应用程序的基本名称，适用于您无法部署到域的根目录，而是部署到子目录的情况。

````react
createBrowserRouter(routes, {
  basename: "/app",
});
````

在链接到根目录时，尾部的斜杠将被保留： 

````react
createBrowserRouter(routes, {
  basename: "/app",
});
<Link to="/" />; // results in <a href="/app" />

createBrowserRouter(routes, {
  basename: "/app/",
});
<Link to="/" />; // results in <a href="/app/" />
````

### `future`

一组可选的“未来标志”，用于在此路由器中启用。我们建议尽早选择最新发布的“未来标志”，以便于最终迁移到v7版本时更加轻松。 

````js
const router = createBrowserRouter(routes, {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
});
````

### window 

适用于像浏览器开发工具插件或测试等环境，可以使用与全局窗口不同的窗口。 

### 













































































