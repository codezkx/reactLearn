import { forwardRef } from 'react';

const AddCommentFn = function (props, ref) {
  return <input placeholder="Add comment..." ref={ref} />;
}

const AddComment = forwardRef(AddCommentFn)

export default  AddComment