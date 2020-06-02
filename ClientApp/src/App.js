import React, { useState, useCallback, useEffect } from "react";
import { BigInput } from "./components/input";
import { useContacts, useSaveContact } from "./contacthooks";
import ContactForm from "./components/contactform";
import ContactList from "./components/contactlist";
import "./App.css";
import "./flex.css";
import Notification from "./components/notification";

function App() {
  const [editedContact, setEditedContact] = useState({});
  const [query, setQuery] = useState("");
  const { contacts, loading } = useContacts(query);
  const { save, saving, errors = {} } = useSaveContact(
    editedContact.id
  );
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState();

  const onSearchChange = useCallback((e) => setQuery(e.target.value), [
    setQuery,
  ]);

  const onSave = useCallback(
    async (contact) => {
      if (await save(contact)) {
        setNotification("your operation was successful 📙🖋");
        setIsAdding(false);
        setEditedContact({});
      }
    },
    [save, setIsAdding, setNotification]
  );

  const onEditContact = useCallback(
    (contact) => {
      setEditedContact(contact);
      setIsAdding(true);
    },
    [setEditedContact, setIsAdding]
  );

  useEffect(() => {
    isAdding && setQuery("");
  }, [isAdding]);

  useEffect(() => {
    query && setIsAdding(false);
  }, [query, setIsAdding]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => {
        setNotification();
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [notification, setNotification]);

  const onCancel = useCallback(() => setIsAdding(false), [setIsAdding]);

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
              saving={saving}
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

        <Notification>{notification}</Notification>
      </div>
    </div>
  );
}

export default App;
