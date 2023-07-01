import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const { contacts, handleAddContact } = this.props;

    if (name.trim() === "") return;

    const isNameUnique = contacts.every(
      (entry) => entry.name.toLowerCase() !== name.toLowerCase()
    );

    if (!isNameUnique) {
      alert(`${name} is already in the Phonebook!`);
      return;
    }

    const newEntry = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    handleAddContact(newEntry);
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formContainer} onSubmit={this.handleSubmit}>
        <label className={css.formLabel}>
          Name 
          <input
            className={css.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={css.formLabel}>
          Number 
          <input
            className={css.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button className={css.formButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
