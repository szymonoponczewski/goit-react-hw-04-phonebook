import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newEntry) => {
    setContacts((prevContacts) => [...prevContacts, newEntry]);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((entry) => entry.id !== id)
    );
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredEntries = contacts.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm contacts={contacts} handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        filteredEntries={filteredEntries}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
