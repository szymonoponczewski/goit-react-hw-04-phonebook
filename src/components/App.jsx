import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  handleAddContact = (newEntry) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newEntry],
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((entry) => entry.id !== id),
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredEntries = contacts.filter((entry) =>
      entry.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm
          contacts={contacts}
          handleAddContact={this.handleAddContact}
        />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          filteredEntries={filteredEntries}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
