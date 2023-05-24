let componentHooks = [];
let currentHookIndex = 0;

function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) { // 存在对应的数组直接返回
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
  }

  pair = [initialState, setState];

  function setState(nextState) {
     // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState
    updateDOM()  // 重新渲染
  }
  // Store the pair for future renders
  // and prepare for the next Hook call.
  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks.push(pair); // 做缓存
  currentHookIndex++;
  return pair
}

function Gallery() {
  // 每次调用 useState() 都会得到新的 pair
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // 这个例子没有使用 React，所以
  // 返回一个对象而不是 JSX
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // 在渲染组件之前
  // 重置当前 Hook 的下标
  currentHookIndex = 0;
  let ouput = Gallery();
  // 下面是执行对应的事件和渲染DOM
  // 具体查看 https://zh-hans.reactjs.org/learn/state-a-components-memory#giving-a-component-multiple-state-variables
}