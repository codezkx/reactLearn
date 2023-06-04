import { Suspense } from 'react';
import { 
  Await, 
  useLoaderData,
  useAsyncValue,
  useAsyncError,
  defer,
 } from 'react-router-dom';

 import type React from 'react';
 import type { LoaderFunction }  from 'react-router-dom';

 const getReviews = () => {
  const promise = new Promise((resolve, reject) => {
    // resolve(true);
    reject('结果出错误');
  })
    .then(() => ({
      code: 200,
      message: '学习历史，了解人文。增长知识，开放视野。'
    }))
    .catch(res => ({
      code: 400,
      message: res
    }));
  return promise
}

const bookData = () => ({
  book: {
    title: '中国通史',
    description: '描述中国历史长河记录片2',
  },
  reviews: getReviews(),
})

type BookOption = ReturnType<typeof bookData> 

export const loader: LoaderFunction = (params) => {
  return defer(bookData()) // 当数据加载很慢时
}

type items = any

const Reviews: React.FC<items> = () => {
  const resolvedReviews = useAsyncValue() as string; // 从最近的祖先组件返回已解析的数据
  console.log(resolvedReviews, 'resolvedReviews'); 
  if (resolvedReviews.code !== 200) {
    throw resolvedReviews
  }
  return (
    <div>
      { resolvedReviews }  {/* // 描述中国历史长河记录片  */}
    </div>
  );
}

const ReviewsError = () => {
  const error = useAsyncError();
  console.log(error, 'error');
  return <div>{ error.message }</div>
}

const RouterAwait = () => {
  const { book, reviews } = useLoaderData() as BookOption;
  return (
    <div>
      <h1>{ book.title }</h1>
      <p>{book.description}</p>
      <Suspense fallback='loading...'>
        <Await
          resolve={reviews}  // 接受从延迟加载器值返回的Promise，以便解析和呈现。
          errorElement={ <ReviewsError/> }>
          { (resolvedReviews) => <Reviews items={resolvedReviews} /> }
        </Await>
      </Suspense>
    </div>
  )
}

export default RouterAwait