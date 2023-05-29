import { useEffect, useState } from 'react';
import { 
  Form, 
  useLoaderData,
  useSubmit,
  useNavigation,
} from 'react-router-dom';

import React from 'react'

const FormSearch: React.FC<any> = () => {
  const { contacts, q} = useLoaderData();
  const [query, setQuery] = useState(q);
  const submit = useSubmit();
  
  const navigation = useNavigation();
  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  useEffect(() => {
    setQuery(q);
  }, [q])
  console.log(q, 'q')
  return (
    <div style={{
      display: 'flex',
    }}>
      <Form
        id="search-form"
        role="search">
        <input
          id="q"
          type="search"
          aria-label="Search contacts"
          placeholder="Search"
          name="q"
          value={query}
          className={searching ? "loading" : ""}
          onChange={(e) => {
            const isFirstSearch = q == null;
            submit(e.currentTarget.form, {
              replace: !isFirstSearch,
            });
            // setQuery(e.target.value);
          }}
        />
        <div
          id="search-spinner"
          aria-hidden
          hidden={!searching}
        />
        <div
          
          className="sr-only"
          aria-live="polite"
        />
        <button
          style={{
            paddingLeft: '16px', 
          }}
          type="submit">New</button>
      </Form>
      <Form 
        method="post">
        <button type="submit">New</button>
      </Form>
    </div>
  )
}

export default FormSearch
