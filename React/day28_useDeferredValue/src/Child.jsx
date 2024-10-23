import { Fragment, memo } from "react";

function Child({ query }) {
  return <Fragment>{query}</Fragment>;
}

export default memo(Child);
