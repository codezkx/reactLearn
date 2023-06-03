# Routers 

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

##createHashRouter

如果您无法配置您的 Web 服务器以将所有流量定向到您的 React Router 应用程序，则此路由器非常有用。它将使用 URL 的哈希（#）部分来管理“应用程序 URL”，而不是使用普通的 URL。 

>`警告`
>
>不建议使用哈希 URL。 

 除此之外，它在功能上与 [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router).是相同的。 

````react
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createHashRouter([
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

## createMemoryRouter

Memory Router 在管理自己的内存历史堆栈时，不使用浏览器的历史记录。它主要用于测试和组件开发工具，例如 Storybook，但也可用于在任何非浏览器环境中运行 React Router。 

````react
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import * as React from "react";
import {
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarEvent from "./routes/event";

test("event route", async () => {
  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/events/:id",
      element: <CalendarEvent />,
      loader: () => FAKE_EVENT,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(
    FAKE_EVENT.name
  );
});
````

### Type Declaration（类型声明 )

```TS
function createMemoryRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    future?: FutureConfig;
    hydrationData?: HydrationState;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
  }
): RemixRouter;
```

### `initialEntries`

历史堆栈中的初始条目。这允许您在历史堆栈中预先设置多个位置，以便开始测试（或应用程序）时已经有了多个历史记录位置（用于测试后退导航等）。 

```react
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```

### `initialIndex`

`initialIndex` 是 React Router 中 `<MemoryRouter>` 组件的一个属性，它是一个数字，用于设置在 `<MemoryRouter>` 组件中的初始历史堆栈中要呈现的条目的索引。 

````react
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // start at "/events/123"
});
````

###  其他道具

对于所有其他道具，请参阅[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)

## createStaticHandler

`createStaticHandler` 用于在服务器（例如 Node.js 或其他 JavaScript 运行时）上执行数据获取和提交操作，以便在使用 `<StaticRouterProvider>` 进行服务器端渲染之前预处理应用程序。有关更完整的概述，请参阅服务器端渲染指南。 

```react
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import Root, {
  loader as rootLoader,
  ErrorBoundary as RootBoundary,
} from "./root";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    Component: Root,
    ErrorBoundary: RootBoundary,
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );
}
```

### Type Declaration（类型声明 )

`````ts
declare function createStaticHandler(
  routes: RouteObject[],
  opts?: {
    basename?: string;
  }
): StaticHandler;

interface StaticHandler {
  dataRoutes: AgnosticDataRouteObject[];
  query(
    request: Request,
    opts?: {
      requestContext?: unknown;
    }
  ): Promise<StaticHandlerContext | Response>;
  queryRoute(
    request: Request,
    opts?: {
      routeId?: string;
      requestContext?: unknown;
    }
  ): Promise<any>;
}
`````

### `routes`/`basename`

这些路由/基础路径（basename）与您将传递给 `createBrowserRouter` 的路由/基础路径相同。 

### `handler.query(request, opts)`

`handler.query()` 方法接受一个 Fetch 请求，执行路由匹配，并根据请求执行所有相关的路由操作/加载器方法。返回的上下文值包含了为请求渲染 HTML 文档所需的所有信息（路由级别的 actionData、loaderData、错误等）。如果任何匹配的路由返回或抛出重定向响应，则 `query()` 将以 Fetch 响应的形式返回该重定向。 

### `opts.requestContext`

如果您需要将信息从服务器传递到 Remix actions/loaders 中，可以使用 `opts.requestContext`，并将其出现在上下文参数中的 actions/loaders 中。 

````react
const routes = [{
  path: '/',
  loader({ request, context }) {
    // Access `context.dataFormExpressMiddleware` here
  },
}];

export async function render(req: express.Request) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(request);
  let staticHandlerContext = await query(remixRequest, {
    // Pass data from the express layer to the remix layer here
    requestContext: {
      dataFromExpressMiddleware: req.something
    }
 });
 ...
}
````

### `handler.queryRoute(request, opts)`

`handler.queryRoute` 是一种更有针对性的查询单个路由并根据请求运行其加载器或操作的方法。默认情况下，它将根据请求 URL 匹配目标路由。返回值是从加载器或操作返回的值，通常是一个 `Response` 对象。 

### `opts.routeId`

如果您需要调用一个不完全对应于 URL 的特定路由动作/加载器（例如，父路由加载器），则可以指定一个 `routeId`： 

````react
staticHandler.queryRoute(new Request("/parent/child"), {
  routeId: "parent",
});
````

### `opts.requestContext`

如果您需要将信息从服务器传递到 Remix actions/loaders 中，可以使用 `opts.requestContext`，并将其出现在上下文参数中的 actions/loaders 中 

````react
const context = await handler.query({
  request: new Request("/blog/posts/123"),
  opts: {
    requestContext: {
      user: {
        id: 123,
        name: "Alice",
      },
    },
  },
});

// 在 actions/loaders 中访问上下文参数
function loader({ request, context: { user } }) {
  console.log(user); // 输出: { id: 123, name: "Alice" }
  // ...执行其他逻辑
}
````

**See also:**

- [`createStaticRouter`](https://reactrouter.com/en/main/routers/create-static-router)
- [`StaticRouterProvider`](https://reactrouter.com/en/main/routers/static-router-provider)

## `createStaticRouter`

`createStaticRouter` 用于在服务器（例如 Node.js 或其他 JavaScript 运行时）上使用数据路由进行渲染。它是一种用于服务器端渲染的工具，用于路由请求和呈现相应的内容。有关更完整的概述，请参阅服务器端渲染指南。 

````react
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import Root, {
  loader as rootLoader,
  ErrorBoundary as RootBoundary,
} from "./root";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    Component: Root,
    ErrorBoundary: RootBoundary,
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );
}
````

###  Type Declaration

````ts
declare function createStaticRouter(
  routes: RouteObject[],
  context: StaticHandlerContext
): Router;
````

### **See also:**

- [`createStaticHandler`](https://reactrouter.com/en/main/routers/create-static-handler)
- [`StaticRouterProvider`](https://reactrouter.com/en/main/routers/static-router-provider)

## `<RouterProvider>`

所有数据路由对象都传递给此组件以渲染您的应用程序，并启用其余的数据 API。 这通常指 `RemixServer` 组件，它是一个 React 组件，用于在服务器端渲染 Remix 应用程序。`RemixServer` 组件将数据路由对象作为其 `dataRouters` 属性传递，以便在服务器端渲染期间使用它们来加载数据和呈现应用程序 

```react
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<BigSpinner />}
  />
);
```

### `fallbackElement`

如果您没有在服务器端渲染应用程序，则 `createBrowserRouter` 将在挂载时启动所有匹配的路由加载器。在此期间，您可以提供一个 `fallbackElement`，以向用户提供一些指示应用程序正在工作的指示。确保您的静态托管 TTFB 尽可能短，以便用户尽快看到应用程序的内容！ 

````react
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
````

## `<StaticRouterProvider>`

`<StaticRouterProvider>` 接受来自 `createStaticRouter()` 的路由器和来自 `createStaticHandler()` 的上下文，并在服务器（例如 Node.js 或其他 JavaScript 运行时）上呈现您的应用程序。它是一种用于服务器端渲染的工具，用于路由请求和呈现相应的内容。有关更完整的概述，请参阅服务器端渲染指南 

```react
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import Root, {
  loader as rootLoader,
  ErrorBoundary as RootBoundary,
} from "./root";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    Component: Root,
    ErrorBoundary: RootBoundary,
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );
}
```

###  Type Declaration

```ts
declare function StaticRouterProvider(props: {
  context: StaticHandlerContext;
  router: Router;
  hydrate?: boolean;
  nonce?: string;
}: JSX.Element;
```

### `context`

这是从 `createStaticHandler().query()` 调用返回的上下文，其中包含请求的所有获取数据。 

### `router`

这是通过 `createStaticRouter` 创建的路由器 

### hydrate

默认情况下，`<StaticRouterProvider>` 将所需的 hydration 数据字符串化到 `<script>` 标签中的 `window.__staticRouterHydrationData` 中，`createBrowserRouter()` 将自动读取并进行 hydration。 

### `nonce`

当利用自动 hydration 时，您可以提供一个 nonce 值以呈现到 `<script>` 标签中，并与您的内容安全策略一起使用。 

### **See also:**

- [`createStaticHandler`](https://reactrouter.com/en/main/routers/create-static-handler)
- [`createStaticRouter`](https://reactrouter.com/en/main/routers/create-static-router)
- [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)

# Router Components 

## BrowserRouter

### Type declaration 

````TS
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;				
  children?: React.ReactNode;
  window?: Window;
}		
````

`<BrowserRouter>` 会使用干净的URL在浏览器地址栏中存储当前位置，并使用浏览器内置的历史记录栈来进行导航。

`<BrowserRouter window>` 默认使用当前文档的 defaultView，但也可以用于跟踪其他窗口（例如在 `<iframe>` 中）的URL更改。

````react
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* The rest of your app goes here */}
  </BrowserRouter>
);
````

##HashRouter

Type declaration 

````
declare function HashRouter(
  props: HashRouterProps
): React.ReactElement;

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
````

`<HashRouter>` 用于在 Web 浏览器中使用，当某些原因不能或不应该将 URL 发送到服务器时。这可能发生在某些共享托管方案中，其中您无法完全控制服务器。在这些情况下，`<HashRouter>` 可以将当前位置存储在当前 URL 的哈希部分中，因此永远不会发送到服务器。

`<HashRouter window>` 默认使用当前文档的 defaultView，但也可以用于跟踪其他窗口（例如在 `<iframe>` 中）的 URL 更改。

````
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    {/* The rest of your app goes here */}
  </HashRouter>,
  root
);
````

>### 警告
>
>`HashRouter`除非绝对必要，否则我们强烈建议您不要使用。 

## MemoryRouter

**类型声明**

````
declare function MemoryRouter(
  props: MemoryRouterProps
): React.ReactElement;

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
}
````

`MemoryRouter` 是 React Router 提供的一个路由组件，它将路由信息存储在内部数组中，而不是像 `BrowserHistory` 和 `HashHistory` 一样绑定到浏览器的历史堆栈。这使得它非常适合需要完全控制历史堆栈的场景， 

- `<MemoryRouter initialEntries>` defaults to `["/"]` (根目录中的单个条目 `/` URL)
- `<MemoryRouter initialIndex>` 的最后一个索引 `initialEntries`

> **提示**
>
> 大多数 React Router 的测试都使用 <MemoryRouter> 作为真实性源，因此您只需浏览我们的测试即可看到使用它的一些很好的示例。 

````
import * as React from "react";
import { create } from "react-test-renderer";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

describe("My app", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/users/mjackson"]}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
````

## NativeRouter

**类型声明**

````
declare function NativeRouter(
  props: NativeRouterProps
): React.ReactElement;

interface NativeRouterProps extends MemoryRouterProps {}
````

`<NativeRouter>`[是在React Native](https://reactnative.dev/)应用程序中运行 React Router 的推荐接口。 

- `<NativeRouter initialEntries>`默认为`["/"]`（根 URL 中的单个条目`/`）
- `<NativeRouter initialIndex>`默认为最后一个索引`initialEntries`

````
import * as React from "react";
import { NativeRouter } from "react-router-native";

function App() {
  return (
    <NativeRouter>
      {/* 应用程序的其余部分放在这里 */}
    </NativeRouter>
  );
}
````

## Router

**类型声明**

````&lt;Router&gt; 是所有路由组件（例如 &lt;BrowserRouter&gt; 和 &lt;StaticRouter&gt;）共享的低级接口。在 React 中，&lt;Router&gt; 是一个上下文提供者，为应用程序的其他部分提供路由信息。  通常情况下，你不需要手动渲染 &lt;Router&gt;。相反，你应该根据你的环境使用其中一个高级路由器。在一个给定的应用程序中，只需要一个路由器。  &lt;Router basename&gt; 属性可以用于使应用程序中的所有路由和链接相对于它们所共享的 URL 路径名的“基本”部分。当只渲染较大应用程序的一部分或当您的应用程序具有多个入口点时，这非常有用。基本名称不区分大小写。
declare function Router(
  props: RouterProps
): React.ReactElement | null;

interface RouterProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
}
````

> **`<Router>` 是所有路由组件（例如 `<BrowserRouter>` 和 `<StaticRouter>`）共享的低级接口。在 React 中，`<Router>` 是一个上下文提供者，为应用程序的其他部分提供路由信息。**
>
> **通常情况下，你不需要手动渲染 `<Router>`。相反，你应该根据你的环境使用其中一个高级路由器。在一个给定的应用程序中，只需要一个路由器。**
>
> **`<Router basename>` 属性可以用于使应用程序中的所有路由和链接相对于它们所共享的 URL 路径名的“基本”部分。当只渲染较大应用程序的一部分或当您的应用程序具有多个入口点时，这非常有用。基本名称不区分大小写。**

例如，如果应用程序托管在 `https://example.com/myapp/`，则可以使用 `basename` 属性来指定路由器的基本名称： 

````
<BrowserRouter basename="/myapp">
  {/* routes and links here */}
</BrowserRouter>
````

这将使应用程序中的所有路由和链接相对于 `/myapp` 路径名的基本部分进行解析。例如，路径名为 `/users` 的链接将解析为 `https://example.com/myapp/users`。 

## StaticRouter

**类型声明**

````
declare function StaticRouter(
  props: StaticRouterProps
): React.ReactElement;

interface StaticRouterProps {
  basename?: string;
  children?: React.ReactNode;
  location?: Path | LocationPieces;
}
````

`<StaticRouter>`用于在[node](https://nodejs.org/)中呈现 React Router web 应用程序。通过道具提供当前位置`location`。 

- `<StaticRouter location>`默认为`"/"`

````
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}
    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
````

# Route

## Route

路由可能是React Router应用程序中最重要的部分。它们将URL段与组件、数据加载和数据变更联系起来。通过路由嵌套，复杂的应用程序布局和数据依赖变得简单和声明式。

路由是传递给路由创建函数的对象：

````
const router = createBrowserRouter([
  {
    // it renders this element
    element: <Team />,

    // when the URL matches this segment
    path: "teams/:teamId",

    // with this data loaded before rendering
    loader: async ({ request, params }) => {
      return fetch(
        `/fake/api/teams/${params.teamId}.json`,
        { signal: request.signal }
      );
    },

    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    errorElement: <ErrorBoundary />,
  },
]);
````

您也可以使用JSX声明路由，并使用createRoutesFromElements创建路由，元素的属性与路由对象的属性相同： 

````
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Team />}
      path="teams/:teamId"
      loader={async ({ params }) => {
        return fetch(
          `/fake/api/teams/${params.teamId}.json`
        );
      }}
      action={async ({ request }) => {
        return updateFakeTeam(await request.formData());
      }}
      errorElement={<ErrorBoundary />}
    />
  )
);
````

两种风格都没有被反对，而且行为是相同的。在本文档的大部分内容中，我们将使用JSX样式，因为在React Router的上下文中，大多数人都习惯于使用它。 

> **注释**
>
> `当使用RouterProvider时，如果您不想指定一个React元素（例如，element={<MyComponent />}），您可以指定一个组件（例如，Component={MyComponent}），React Router会在内部调用createElement。不过，您只应在RouterProvider应用程序中这样做，因为在<Routes>内部使用Component会降低React重用在多次渲染之间创建的元素的能力。 `

**类型注释**

````
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
````

### 属性

### 1、path

> 路径模式用于匹配URL，以确定该路由是否与URL、链接href或表单操作匹配。 
>
> > ### 动态段 
> >
> > 如果路径段以:开头，则它将成为“动态段”。当路由匹配URL时，动态段将从URL中解析出来，并作为参数提供给其他路由器API。 
> >
> > ````react
> > <Route
> >   // this path will match URLs like
> >   // - /teams/hotspur
> >   // - /teams/real
> >   path="/teams/:teamId"
> >   // 匹配的参数将可用于加载器。
> >   loader={({ params }) => {
> >     console.log(params.teamId); // "hotspur"
> >   }}
> >   // and the action
> >   action={({ params }) => {}}
> >   element={<Team />}
> > />;
> > 
> > // 并且可以通过useParams访问匹配的元素。
> > function Team() {
> >   let params = useParams();
> >   console.log(params.teamId); // "hotspur"
> > }
> > ````
> >
> > 您可以在一条路线路径中拥有多个动态段： 
> >
> > ```react
> > <Route path="/c/:categoryId/p/:productId" />;
> > // both will be available
> > params.categoryId;
> > params.productId;
> > ```
> >
> > 动态段不能是“部分的”： 
> >
> > - 🚫`"/teams-:teamId"`
> > - ✅`"/teams/:teamId"`
> > - 🚫`"/:category--:productId"`
> > - ✅`"/:productSlug"`
>
> 你仍然可以支持这样的 URL 模式，你只需要做一些你自己的解析： 
>
> ````js
> function Product() {
>   const { productSlug } = useParams();
>   const [category, product] = productSlug.split("--");
>   // ...
> }
> ````
>
> 
>
> 

### 2、可选段 

`?`您可以通过在段的末尾添加一个来使路线段成为可选的。  

````react
<Route
  // 这个路径将匹配以下URL：
  // - /categories
  // - /en/categories
  // - /fr/categories
  path="/:lang?/categories"
  // 匹配的参数可能可用于加载器。
  loader={({ params }) => {
    console.log(params["lang"]); // "en"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Categories />}
/>;

// and the element through `useParams`
function Categories() {
  let params = useParams();
  console.log(params.lang);
}
````

您也可以有可选的静态段： 

````
<Route path="/project/task?/:taskId" />
````

### 3、通配符 

通配符也被称为“捕获所有”和“星号”段。如果路由路径模式以/*结尾，则它将匹配/后的任何字符，包括其他/字符。 

````
<Route
  // this path will match URLs like
  // - /files
  // - /files/one
  // - /files/one/two
  // - /files/one/two/three
  path="/files/*"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params["*"]); // "one/two"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params["*"]); // "one/two"
}
````

您可以解构*，只需为其指定一个新名称即可。常用名称是splat： 

````
let { org, "*": splat } = params;
````

### 布局路由 (Outlet)

省略路径会使这个路由成为“布局路由”。它参与UI嵌套，但不会向URL添加任何段。 

````react
<Route
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
  <Route path="/" element={<h2>Home</h2>} />
  <Route path="/about" element={<h2>About</h2>} />
</Route>
````

在这个例子中，<h1>Layout</h1>将与每个子路由的元素属性一起呈现，通过布局路由的Outlet。 

### index

确定路由是否为索引路由。索引路由在其父级URL处呈现为其父级的Outlet（类似于默认的子路由）。 

````react
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} /> // 在utl为 /teams 时 默认显示次路由
  <Route path=":teamId" element={<Team />} />
</Route>
````

这些特殊路由一开始可能会让人感到困惑，因此我们在这里专门为它们提供了一份指南：索引路由。 

### children

（TODO：需要谈论嵌套，甚至可能是一个单独的文档） 

### caseSensitive

指示路由是否匹配大小写：

````
<Route caseSensitive path="/wEll-aCtuA11y" />
````

- 将匹配`"wEll-aCtuA11y"`
- 不会匹配`"well-actua11y"`

### loader

路由加载器在路由渲染之前被调用，并通过 为元素提供数据[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)。

```react
<Route
  path="/teams/:teamId"
  loader={({ params }) => {
    return fetchTeam(params.teamId);
  }}
/>;

function Team() {
  let team = useLoaderData();
  // ...
}
```

> `警告`
>
> 如果您没有使用像`createBrowserRouter`这样的路由器，这将不会执行任何操作。 

### action

[当提交从Form](https://reactrouter.com/en/main/components/form)、[fetcher](https://reactrouter.com/en/main/hooks/use-fetcher)或[submission](https://reactrouter.com/en/main/hooks/use-submit) 发送到路由时，将调用路由操作 

````react
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
````

> `警告`
>
> 如果您没有使用像`createBrowserRouter`这样的路由器，这将不会执行任何操作。 

### element/Component

当路由与 URL 匹配时要呈现的 React 元素/组件。

如果要创建 React 元素，请使用`element`：

````react
<Route path="/for-sale" element={<Properties />} />
````

否则使用`Component`React Router 将为您创建 React 元素： 

````react
<Route path="/for-sale" Component={Properties} /> // 或每次调用createElement 来创建组件
````

> `警告`
>
> **您只应通过RouterProvider来选择使用组件API来处理数据路由。在<Routes>内部使用这个API会降低React重用在多次渲染之间创建的元素的能力。**  

### errorElement/ErrorBoundary

当路由在加载器或操作中渲染时抛出异常时，将呈现此React元素/组件，而不是正常的元素/组件。

如果想要自己创建React元素，请使用errorElement：

````react
<Route
  path="/for-sale"
  // if this throws an error while rendering
  element={<Properties />}
  // or this while loading properties
  loader={() => loadProperties()}
  // or this while creating a property
  action={async ({ request }) =>
    createProperty(await request.formData())
  }
  // then this element will render
  errorElement={<ErrorBoundary />}
/>
````

否则，使用ErrorBoundary，React Router将为您创建React元素： 

````react
<Route
  path="/for-sale"
  Component={Properties}
  loader={() => loadProperties()}
  action={async ({ request }) =>
    createProperty(await request.formData())
  }
  ErrorBoundary={ErrorBoundary}
/>
````

> `警告`
>
> 如果您没有使用像`createBrowserRouter`这样的路由器，这将不会执行任何操作。 

### handle

任何特定于应用程序的数据。有关详细信息和示例，请参阅[useMatches](https://reactrouter.com/en/main/hooks/use-matches)文档。

### lazy

为了使您的应用程序包保持较小，并支持路由的代码拆分，每个路由都可以提供一个异步函数，该函数解析路由定义的非路由匹配部分（加载器、操作、组件/元素、ErrorBoundary/errorElement等）。

每个lazy函数通常会返回动态导入的结果。

````react
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
````

然后，在您的lazy路由模块中，导出您想要为路由定义的属性： 

````react
export async function loader({ request }) {
  let data = await fetchData(request);
  return json(data);
}

export function Component() {
  let data = useLoaderData();

  return (
    <>
      <h1>You made it!</h1>
      <p>{data}</p>
    </>
  );
}
````

> `警告`
>
> 如果您没有使用像`createBrowserRouter`这样的路由器，这将不会执行任何操作。 

## Action

路由操作是路由加载器“读取”时的“写入”。它们提供了一种方法，使应用程序可以使用简单的HTML和HTTP语义执行数据变更，而React Router则抽象了异步UI和重新验证的复杂性。这为您提供了HTML + HTTP的简单思维模型（其中浏览器处理异步性和重新验证），同时具有现代SPA的行为和UX能力。 

> **注意**
>
> 这个特性只有在使用数据路由器（例如createBrowserRouter）时才有效。 

````react
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData();
    return fakeUpdateSong(params.songId, formData);
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId);
  }}
/>
````

当应用程序向您的路由发送非GET提交（“post”，“put”，“patch”，“delete”）时，将调用操作。这可以通过以下几种方式实现： 

````react
// forms
<Form method="post" action="/songs" />;
<fetcher.Form method="put" action="/songs/123/edit" />;

// imperative submissions
let submit = useSubmit();
submit(data, {
  method: "delete",
  action: "/songs/123",
});
fetcher.submit(data, {
  method: "patch",
  action: "/songs/123/edit",
});
````

### params

路由参数从动态段中解析出来并传递给您的操作。这对于确定要修改的资源非常有用： 

````react
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId);
  }}
/>

````

### request

这是一个被发送到您的路由的Fetch请求实例。最常见的用例是从请求中解析FormData。 

````react
<Route
  action={async ({ request }) => {
    let formData = await request.formData();
    // ...
  }}
/>
````

一开始，操作接收“请求”可能看起来有些奇怪。您是否编写过以下代码？ 

````react
<form
  onSubmit={(event) => {
    event.preventDefault();
    // ...
  }}
/>
````

您到底在防止什么？

在没有JavaScript的情况下，只有纯HTML和HTTP Web服务器的情况下，默认的事件是非常好的。浏览器将表单中的所有数据序列化为FormData，并将其作为新请求的主体发送到您的服务器。就像上面的代码一样，React Router的<Form>阻止浏览器发送该请求，而是将请求发送到您的路由操作！这使得高度动态的Web应用程序具有HTML和HTTP的简单模型。

请记住，formData中的值会自动从表单提交进行序列化，因此您的输入需要一个名称。

```react
<Form method="post">
  <input name="songTitle" />
  <textarea name="lyrics" />
  <button type="submit">Save</button>
</Form>;

// accessed by the same names
formData.get("songTitle");
formData.get("lyrics");
```

有关`formData`的更多信息，请参阅  Working with FormData. 

### Returning Responses(返回响应 )

虽然您可以从操作中返回任何您想要的东西并从useActionData获得访问权限，但您也可以返回Web响应。

有关更多信息，请参阅加载器文档。( [loader](https://reactrouter.com/en/main/route/loader#returning-responses) )

### 在操作中抛出异常 

您可以在操作中抛出异常来跳出当前调用堆栈（停止运行当前代码），然后React Router将启动“错误路径”。 

````react
<Route
  action={async ({ params, request }) => {
    const res = await fetch(
      `/api/properties/${params.id}`,
      {
        method: "put",
        body: await request.formData(),
      }
    );
    if (!res.ok) throw res;
    return { ok: true };
  }}
/>
````

有关更多详细信息和扩展用例，请阅读[errorElement](https://reactrouter.com/en/main/route/error-element)文 档。 

### 处理每个路由的多个操作 

经常出现的一个相当常见的问题是“如果我需要在我的操作中处理多个不同的行为怎么办？” 有几种方法可以实现这一点，但通常最简单的方法是在<button type="submit">上放置一个名称/值，并在操作中使用它来决定要执行哪些代码（没错 - 提交按钮可以具有名称/值属性！）： 

````react
async function action({ request }) {
  let formData = await request.formData();
  let intent = formData.get("intent");

  if (intent === "edit") {
    await editSong(formData);
    return { ok: true };
  }

  if (intent === "add") {
    await addSong(formData);
    return { ok: true };
  }

  throw json(
    { message: "Invalid intent" },
    { status: 400 }
  );
}

function Component() {
  let song = useLoaderData();

  // When the song exists, show an edit form
  if (song) {
    return (
      <Form method="post">
        <p>Edit song lyrics:</p>
        {/* Edit song inputs */}
        <button type="submit" name="intent" value="edit">
          Edit
        </button>
      </Form>
    );
  }

  // Otherwise show a form to add a new song
  return (
    <Form method="post">
      <p>Add new lyrics:</p>
      {/* Add song inputs */}
      <button type="submit" name="intent" value="add">
        Add
      </button>
    </Form>
  );
}
````

如果按钮名称/值不适合您的用例，您还可以使用隐藏输入来发送意图，或者通过<Form method>属性提交不同的HTTP方法（添加的POST，编辑的PUT/PATCH，删除的DELETE）。 

## errorElement

当在加载器、操作或组件渲染中抛出异常时，将呈现错误路径（<Route errorElement>），而不是Routes的正常呈现路径（<Route element>），并且可以使用useRouteError提供错误信息。 

> **注释**
>
>如果您不希望指定React元素（即，errorElement={<MyErrorBoundary />}），您可以指定一个ErrorBoundary组件（即，ErrorBoundary={MyErrorBoundary}），React Router会在内部为您调用createElement。 

> **注意**
>
> **这个特性只有在使用数据路由器（例如createBrowserRouter）时才有效。** 

````react
<Route
  path="/invoices/:id"
  // if an exception is thrown here
  loader={loadInvoice}
  // here
  action={updateInvoice}
  // or here
  element={<Invoice />}
  // this will render instead of `element`
  errorElement={<ErrorBoundary />}
/>;

function Invoice() {
  return <div>Happy {path}</div>;
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
````

### Bubbling

当路由没有errorElement时，错误将通过父路由冒泡。这使您可以按照您喜欢的方式进行细粒度或通用处理。

在您的路由树的顶部放置一个errorElement，在一个地方处理几乎所有的应用程序错误。或者，在所有路由上放置它们，让没有错误的应用程序部分继续正常呈现。这为用户提供了更多从错误中恢复的选项，而不是强制刷新和🤞。

### 默认错误元素 

> `警告` 
>
> 我们建议在将应用程序发布到生产之前始终提供至少一个根级错误元素，因为默认错误元素的UI很丑，并且不适用于最终用户使用。

如果您没有在路由树中提供一个errorElement来处理给定的错误，错误将冒泡并由默认的errorElement处理，该errorElement将打印错误消息和堆栈跟踪。一些人质疑为什么堆栈跟踪会出现在生产构建中。通常，出于安全原因，您不希望在生产站点上公开堆栈跟踪。但是，这更适用于服务器端错误（Remix确实从服务器端loader/action响应中剥离了堆栈跟踪）。在客户端React Router DOM应用程序的情况下，该代码已经可用于浏览器，因此任何隐藏都只是安全性通过模糊处理来实现。此外，我们仍然希望在控制台中公开错误，因此从UI显示中删除它仍然不会隐藏有关堆栈跟踪的任何信息。不在UI中显示它并且不将其记录到控制台中将意味着应用程序开发人员根本没有关于生产错误的信息，这会带来自己的一系列问题。因此，我们建议您在将站点部署到生产之前始终添加一个根级别的errorElement！ 

### 手动抛出异常

虽然errorElement处理意外错误，但它也可以用于处理您预期的异常。

特别是在加载器和操作中，您会使用不在您控制范围内的外部数据，您不能总是计划数据存在，服务可用或用户可以访问它。在这些情况下，您可以抛出自己的异常。

[这是加载程序](https://reactrouter.com/en/main/route/loader)中的“未找到”案例： 

````react
<Route
  path="/properties/:id"
  element={<PropertyForSale />}
  errorElement={<PropertyError />}
  loader={async ({ params }) => {
    const res = await fetch(`/api/properties/${params.id}`);
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const home = await res.json();
    const descriptionHtml = parseMarkdown(
      data.descriptionMarkdown
    );
    return { home, descriptionHtml };
  }}
/>
````

一旦您知道无法使用正在加载的数据呈现路由，就可以抛出异常以中断调用堆栈。当它不存在时，您不必担心加载器中的其余工作（例如解析用户的markdown生物）。只需抛出并退出即可。

这也意味着您不必担心路由组件中的一堆错误分支代码，如果您在加载器或操作中抛出，则它甚至不会尝试进行呈现，而是会呈现errorElement。

您可以像返回任何内容一样从加载器或操作中抛出任何内容：响应（如前面的示例）、错误或普通对象。

### 抛出响应

虽然您可以抛出任何内容，并且它将通过useRouteError返回给您，但如果您抛出一个响应，React Router将在将其返回给组件之前自动解析响应数据。

此外，isRouteErrorResponse允许您在边界中检查此特定类型。与json搭配使用，您可以轻松地抛出带有一些数据的响应，并在边界中呈现不同的情况：

````react
import { json } from "react-router-dom";

function loader() {
  const stillWorksHere = await userStillWorksHere();
  if (!stillWorksHere) {
    throw json(
      {
        sorry: "You have been fired.",
        hrEmail: "hr@bigco.com",
      },
      { status: 401 }
    );
  }
}

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
````

这使得在您的根路由上创建一个通用错误边界成为可能，通常可以处理许多情况： 

````react
function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
````

### 抽象化

 当您知道您无法继续在您正在进行的数据加载路径上时，抛出异常的这种模式使处理异常情况变得非常简单。 

````react
async function getUserToken() {
  const token = await getTokenFromWebWorker();
  if (!token) {
    throw new Response("", { status: 401 });
  }
  return token;
}
````

无论哪个加载器或操作使用该函数，它都将停止当前调用堆栈中的代码执行并将应用程序发送到错误路径。

现在让我们添加一个获取项目的函数：

````react
function fetchProject(id) {
  const token = await getUserToken();
  const response = await fetch(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  // the fetch failed
  if (!response.ok) {
    throw new Error("Could not fetch project");
  }
}
````

由于getUserToken函数的存在，这段代码可以假定它会获得一个令牌。如果没有令牌，则将呈现错误路径。然后，如果项目不存在，则无论哪个加载器调用此函数，它都会将404抛到errorElement。最后，如果完全失败，则会发送错误。

任何时候您意识到“我没有我需要的东西”，您可以简单地抛出异常，知道您仍然为最终用户呈现了有用的东西。

让我们将它们组合成一个路由：

````react
<Route
  path="/"
  element={<Root />}
  errorElement={<RootBoundary />}
>
  <Route
    path="projects/:projectId"
    loader={({ params }) => fetchProject(params.projectId)}
    element={<Project />}
  />
</Route>
````

项目路由不必考虑错误。在像fetchProject和getUserToken这样的加载器实用程序函数以及RootBoundary处理所有情况的情况下，项目路由可以专注于严格的正常路径。 

## lazy

为了保持应用程序包的小巧并支持路由的代码拆分，每个路由可以提供一个异步函数，该函数解析路由定义的非路由匹配部分（如loader、action、Component/element、ErrorBoundary/errorElement等）。

延迟加载的路由在初始加载和导航或获取器调用的加载或提交阶段解析。您不能延迟定义路由匹配属性（如path、index、children、caseSensitive），因为我们只会在匹配已知路由后执行您的延迟加载路由函数。

> `警告`
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router) 

每个延迟加载函数通常会返回动态导入的结果。 

````react
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
````

然后在您的延迟加载路由模块中，导出您要为路由定义的属性： 

````react
export async function loader({request}) {
    let data = await fetchData(request);
    return json(data);
} 

export function Component() {
    let data = useLoaderData();
    
    return (
    	<>
              <h1>You made it!</h1>
              <p>{data}</p>
        <>
    )
}

// 如果您想在React dev工具中自定义组件显示名称：
Component.displayName = "SampleLazyRoute";

export function ErrorBoundary() {
  let error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{error.message || error}</h1>
  );
}

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = "SampleErrorBoundary";


````

### 静态定义的属性

在路由上静态定义的任何属性都无法被延迟加载函数覆盖，如果尝试覆盖这些属性，则会收到控制台警告。

此外，作为优化，如果您静态定义一个`loader`/`action`那么它将与函数并行调用`lazy`。如果您有不介意关键包的 slim loader，并且希望在组件下载的同时启动它们的数据获取，这将很有用。这与 Remix 处理抓取的方式很接近，因为每个路由都是它自己的 API 路由。 

````react
let route = {
  path: "projects",
  loader: ({ request }) => fetchDataForUrl(request.url),
  lazy: () => import("./projects"),
};
````

这也允许您进行更细粒度的代码拆分。例如，您可以将加载器和组件拆分为不同的文件以进行并行下载 :

````react
let route = {
  path: "projects",
  async loader({ request, params }) {
    let { loader } = await import("./projects-loader");
    return loader({ request, params });
  },
  lazy: () => import("./projects-component"),
};
````

### 单个文件中的多个路由

虽然lazy函数通常可以与每个路由的异步import() 1:1使用，但您可以自由实现更高级的lazy函数，只需返回要添加到该路由的属性。这打开了一些有趣的可能性。

例如，如果要避免为嵌套路由加载多个块，则可以将它们全部存储在同一文件中，并将它们返回给各个路由。现代打包工具将为不同的import()调用锁定到相同的Promise。

````react
// Assume pages/Dashboard.jsx has all of our loaders/components for multiple
// dashboard routes
let dashboardRoute = {
  path: "dashboard",
  async lazy() {
    let { Layout } = await import("./pages/Dashboard");
    return { Component: Layout };
  },
  children: [
    {
      index: true,
      async lazy() {
        let { Index } = await import("./pages/Dashboard");
        return { Component: Index };
      },
    },
    {
      path: "messages",
      async lazy() {
        let { messagesLoader, Messages } = await import(
          "./pages/Dashboard"
        );
        return {
          loader: messagesLoader,
          Component: Messages,
        };
      },
    },
  ],
};
````

## loader

每个路由都可以定义一个“loader”函数，在路由元素呈现之前提供数据。 

> `警告`
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router) 

```react
createBrowserRouter([
  {
    element: <Teams />,
    path: "teams",
    loader: async () => {
      return fakeDb.from("teams").select("*");
    },
    children: [
      {
        element: <Team />,
        path: ":teamId",
        loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`);
        },
      },
    ],
  },
]);
```

当用户在应用程序中导航时，下一个匹配的路由分支的加载器将被并行调用，并且它们的数据通过[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data). 

### params

[路由参数从动态段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给您的加载程序。这对于确定要加载的资源很有用： 

````
createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: ({ params }) => {
      return fakeGetTeam(params.teamId);
    },
  },
]);
````

请注意，`:teamId`路径中的 被解析为`params.teamId`同名提供的。 

### request

这是对您的应用程序发出的[获取请求实例。](https://developer.mozilla.org/en-US/docs/Web/API/Request)

```
function loader({ request }) {}
```

一开始看起来可能很奇怪，加载器函数接收“请求”参数。考虑到<Link>会执行以下代码，然后问自己，“这里防止了什么默认行为？” 

````react
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>
````

如果没有React Router，浏览器将向您的服务器发出请求，但React Router阻止了它！React Router不是让浏览器向服务器发送请求，而是将请求发送到您的加载器函数。 

最常见的用例是创建一个[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)并从中读取[URLSearchParams ：](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 

````react
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
````

请注意，这里的 API 不是特定于 React Router 的，而是标准的 Web 对象：[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)、[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。 

### 返回响应

虽然您可以从加载器函数中返回任何东西并从useLoaderData hook中访问它，但您也可以返回一个web Response。

这可能一开始看起来不是很有用，但考虑到fetch的返回值是一个Response，而加载器函数可以解析响应，因此许多加载器函数可以返回一个简单的fetch！

````react
// an HTTP/REST API
function loader({ request }) {
  return fetch("/api/teams.json", {
    signal: request.signal,
  });
}

// or even a graphql endpoint
function loader({ request, params }) {
  return fetch("/_gql", {
    signal: request.signal,
    method: "post",
    body: JSON.stringify({
      query: gql`...`,
      params: params,
    }),
  });
}
````

您也可以自己构建响应： 

```react
function loader({ request, params }) {
  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}
```

React Router 会自动调用`response.json()`，所以你的组件在渲染时不需要解析它： 

`````
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }

`````

使用json实用程序可以简化此过程，使您不必自己构建它们。下一个示例与前一个示例实际上是相同的： 

````
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}
````

如果您计划升级到Remix，则从每个加载器返回响应将使迁移更加顺畅。 

### 在加载器函数中抛出异常

 您可以在加载器函数中抛出异常，以退出当前调用堆栈（停止运行当前代码），然后React Router将沿着“错误路径”重新启动 

````
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
````

有关详细信息，请阅读[`errorElement`](https://reactrouter.com/en/main/route/error-element)文档。 

## shouldRevalidate

此函数允许您从路由的加载器函数中选择退出重新验证，作为优化。 

> `警告`
>
> 此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router) 

有几种情况会重新验证数据，使您的 UI 与数据自动保持同步： 

> - 当从`<Form>`元素中调用一个action时。
> - 当从`<fetcher.Form>`组件中调用一个action时。
> - 当从`useSubmit` hook中调用一个action时。
> - 当从`<fetcher.submit>`组件中调用一个action时。
> - 当[URL params](https://reactrouter.com/en/main/route/route#dynamic-segments)  发生变化并且已经呈现了该路由时。
> - 当URL搜索参数发生变化时。
> - 当导航到与当前URL相同的URL时。

如果您在某个路由上定义了shouldRevalidate函数，则它将在调用路由加载器函数获取新数据之前首先检查该函数。如果该函数返回false，则不会调用加载器函数，并且该加载器函数的现有数据将保留在页面上。 

`````react
<Route
  path="meals-plans"
  element={<MealPlans />}
  loader={loadMealPlans}
  shouldRevalidate={({ currentUrl }) => {
    // only revalidate if the submission originates from
    // the `/meal-plans/new` route.
    return currentUrl.pathname === "/meal-plans/new";
  }}
>
  <Route
    path="new"
    element={<NewMealPlanForm />}
    // `loadMealPlans` will be revalidated after
    // this action...
    action={createMealPlan}
  />
  <Route
    path=":planId/meal"
    element={<Meal />}
    // ...but not this one because origin the URL
    // is not "/meal-plans/new"
    action={updateMeal}
  />
</Route>
`````

请注意，这仅适用于已加载、当前呈现并将继续在新URL上呈现的数据。新路由和新URL上的fetcher的数据始终会被初始获取。 

> `警告`
>
> **使用此 API 可能会使您的 UI 与您的数据不同步，请谨慎使用！** 

类型声明

````react
interface ShouldRevalidateFunction {
  (args: {
    currentUrl: URL;
    currentParams: AgnosticDataRouteMatch["params"];
    nextUrl: URL;
    nextParams: AgnosticDataRouteMatch["params"];
    formMethod?: Submission["formMethod"];
    formAction?: Submission["formAction"];
    formEncType?: Submission["formEncType"];
    formData?: Submission["formData"];
    actionResult?: DataResult;
    defaultShouldRevalidate: boolean;
  }): boolean;
}
````











































































































