
import { getContact } from '../contacts';

export const loader = async ({ request , params }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContact(q);
  return { contacts, q };
}