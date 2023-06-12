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
  const promise = new Promise((resolve) => {
    resolve(true);
  })
    .then(() => ({
      code: 200,
      message: '学习历史，了解人文。增长知识，开放视野。'
    }))
    .catch(() => ({
      code: 400,
      message: '结果出错误'
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
type ReviewsOption = {
  code: number;
  message: string;
}

const Reviews: React.FC<items> = () => {
  const resolvedReviews = useAsyncValue() as ReviewsOption; // 从最近的祖先组件返回已解析的数据
  if (resolvedReviews.code !== 200) {
    throw resolvedReviews
  }
  return (
    <div>
      { resolvedReviews.message }  {/* // 描述中国历史长河记录片  */}
    </div>
  );
}

const ReviewsError = () => {
  const error = useAsyncError() as ReviewsOption;
  return <div>{ error.message }</div>
}

const RouterAwait = () => {
  const { book, reviews } = useLoaderData() as BookOption;
  return (
    <div>
      <div style={{
        height: '1000px',
      }}></div>
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