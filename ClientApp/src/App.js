import React from "react";
import "./App.css";
import "./flex.css";
import Contact from "./components/contact";
import Input from "./components/input";

function App() {
  const contacts = [
    {
      id: "deaae0a6-511b-4255-a5f6-ea1db4b582f4",
      firstName: "Gabriela",
      lastName: "Alvie",
      phonenumber: "+506 12 345678",
    },
    {
      id: "7bca73c2-394a-4a36-8d2d-aba3ba18efb1",
      firstName: "Lucas",
      lastName: "Coupie",
      phonenumber: "+32 04 12345678",
    },
  ];

  return (
    <div className="App">
      <div className="container">
        <div className="flex column">
          <h1 className="title">Phonebook</h1>
          <Input />
          <div>
            {contacts.map((contact) => (
              <Contact
                name={`${contact.firstName} ${contact.lastName}`}
                number={contact.phonenumber}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
