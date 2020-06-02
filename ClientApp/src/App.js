import React, { useState, useCallback, useEffect } from "react";
import { BigInput } from "./components/input";
import { useContacts, useSaveContact } from "./contacthooks";
import ContactForm from "./components/contactform";
import ContactList from "./components/contactlist";
import "./App.css";
import "./flex.css";

function App() {
  const [editedContact, setEditedContact] = useState({});
  const [query, setQuery] = useState();
  const { contacts, loading } = useContacts(query);
  const { save, errors = {} } = useSaveContact(editedContact.id);
  const [isAdding, setIsAdding] = useState(false);

  const onSearchChange = useCallback((e) => setQuery(e.target.value), [
    setQuery,
  ]);

  const onSave = useCallback(
    async (contact) => {
      if (await save(contact)) {
        setIsAdding(false);
      }
    },
    [save, setIsAdding]
  );

  const onEditContact = useCallback(
    (contact) => {
      setEditedContact(contact);
      setIsAdding(true);
    },
    [setEditedContact, setIsAdding]
  );

  useEffect(() => {
    isAdding && setQuery();
  }, [isAdding]);

  useEffect(() => {
    query && setIsAdding(false);
  }, [query, setIsAdding])

  const onCancel = useCallback(() => setIsAdding(false), [setIsAdding]);

  console.log("loading:", loading);
  return (
    <div className="App">
      <div className="container">
        <div className="flex column">
          <h1 className="title">Phonebook</h1>
          <BigInput value={query} onChange={onSearchChange} loading={loading} />
          {isAdding && (
            <ContactForm
              contact={editedContact}
              save={onSave}
              errors={errors}
              cancel={onCancel}
            />
          )}
          {!isAdding && (
            <ContactList
              contacts={contacts}
              loading={loading}
              onEdit={onEditContact}
            />
          )}
          {!isAdding && (
            <button className="actionbutton" onClick={() => setIsAdding(true)}>
              Add contact
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
