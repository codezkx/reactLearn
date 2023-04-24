import {useState} from 'react';

import ContactList from './ContactList';
import Chat from './Chat';


export default function Messaenger() {
  const [to, setTo] = useState(contacts);

  return (
    <div>
      <ContactList 
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      {/* // 每个人的输入框都是一样的因为state被保持了  */}
      <Chat contact={to} /> 
      <Chat key={to.id} contact={to} /> 

    </div>  
  );
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
