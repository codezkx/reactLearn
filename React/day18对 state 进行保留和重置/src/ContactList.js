import {useState} from 'react';

export default function Messaenger({
  contacts,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact => 
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>{contact.name}</button>
          </li>
        )}
      </ul>
    </section>
  );
}