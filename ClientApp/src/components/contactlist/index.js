import React from "react";
import Contact from "../contact";

export default function ContactList({ contacts, loading, onEdit }) {
  if (!contacts && !loading) {
      return <div>Welcome to phonebook, try searching for a contact!</div>
  }
  
  if (loading && (!contacts || contacts.length === 0)) {
    return <div>Searching...</div>
  }
  
  if (!loading && contacts.length === 0) {
    return <div>No contacts found, try broadening your search or create a new contact</div>
  }

  return (
    <div>
      {contacts &&
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            name={`${contact.firstName} ${contact.lastName}`}
            number={contact.phoneNumber}
            onEdit={() => onEdit(contact)}
          />
        ))}
    </div>
  );
}
