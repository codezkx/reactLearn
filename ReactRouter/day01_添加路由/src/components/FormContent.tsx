import { 
  Link,
  NavLink,
  useLoaderData,
} from 'react-router-dom'

/* 
  Link：无感跳转路由，不需要想a标签一样刷新页面。
  NavLink: 现在我们有一堆记录，不清楚我们在侧边栏中查看的是哪一个。我们可以用来NavLink解决这个问题。

*/

import type React from 'react'
import type { Contact } from './Contact.tsx';

type ContactOption = Contact['contact']

interface ContactsOption extends ContactOption {
  id: number
} 

const FormContent: React.FC<any> = () => {
  const contacts = useLoaderData() as Array<ContactsOption>;
  if (contacts && !contacts.length) {
    return <></>
  }
  return (
    <nav>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <NavLink
               className={({ isActive, isPending }) =>
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
              to={`contacts/${contact.id}`}
            >
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}{" "}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FormContent
