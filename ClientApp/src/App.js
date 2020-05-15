import React, { useState } from "react";
import "./App.css";
import "./flex.css";
import Contact from "./components/contact";
import Input from "./components/input";
import useContacts from "./useContacts";

function App() {
  const [query, setQuery] = useState();
  const { contacts, loading } = useContacts(query);

  return (
    <div className="App">
      <div className="container">
        <div className="flex column">
          <h1 className="title">Phonebook</h1>
          <Input onChange={setQuery} loading={loading} />
          <div>
            {contacts &&
              contacts.map((contact) => (
                <Contact
                  key={contact.id}
                  name={`${contact.firstName} ${contact.lastName}`}
                  number={contact.phoneNumber}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
