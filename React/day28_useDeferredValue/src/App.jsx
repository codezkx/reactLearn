import { useState, Suspense, useDeferredValue } from "react";
import Child from "./Child.jsx";

export default function App() {
  const [query, setQeury] = useState("1");
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQeury(e.target.value)}
      />
      {/* Suspense效果体现不出来的, 可以去掉.  这个例子不能体现Suspense  因为没有异步 */}
      <Suspense fallback={<h2>Loading...</h2>}>
        <Child query={deferredQuery}></Child>
      </Suspense>
    </>
  );
}
