import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Filter.module.css";

class Filter extends Component {
  handleChange = (event) => {
    const { handleFilterChange } = this.props;
    handleFilterChange(event.target.value);
  };

  render() {
    const { filter } = this.props;

    return (
      <input
        className={css.input}
        type="text"
        placeholder="Search contacts"
        value={filter}
        onChange={this.handleChange}
      />
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
