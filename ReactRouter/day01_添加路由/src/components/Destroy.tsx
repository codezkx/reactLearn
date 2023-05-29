import { redirect } from 'react-router-dom';

import { deleteContact } from '../contacts';

// 添加销毁
export const Action = async ({ params }) => {
  throw new Error('oh dang');
  await deleteContact(params.id);
  return redirect("/");
};


