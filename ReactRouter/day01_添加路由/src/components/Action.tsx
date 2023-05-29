import { redirect } from 'react-router-dom'

import { createContact } from '.././contacts';

async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`); // 重定向
}
export default action