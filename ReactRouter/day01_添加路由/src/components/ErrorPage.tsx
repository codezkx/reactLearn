import { useRouteError } from 'react-router-dom';

type RouteErrorOption = {
  data: string
  error: Error
  internal: boolean
  statusText: string
  message?: string
}

const ErrorPage = () => {
  const error = useRouteError() as RouteErrorOption
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText  || error.message }</i>
      </p>
    </div>
  )
}

export default ErrorPage 