import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./ContactList.module.css";

class ContactList extends Component {
  handleDelete = (id) => {
    const { handleDelete } = this.props;
    handleDelete(id);
  };

  render() {
    const { filteredEntries } = this.props;

    return (
      <ul className={css.list}>
        {filteredEntries.map((entry) => (
          <li className={css.item} key={entry.id}>
            {entry.name}: {entry.number}
            <button
              className={css.deleteBtn}
              onClick={() => this.handleDelete(entry.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  filteredEntries: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
