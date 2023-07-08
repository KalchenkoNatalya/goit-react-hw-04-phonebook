import css from './FormAddContacts.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const FormAddContacts = ({ addContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputChange = e => {
    e.target.name === 'name' && setName(e.target.value);
    e.target.name === 'number' && setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContacts(name, number);
    setName('');
    setNumber('');
  };

  const idNameInput = nanoid();
  const idNumberInput = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={idNameInput}>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        pattern="^[A-Za-z\u0080-\uFFFF ']+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={idNameInput}
        onChange={inputChange}
        required
      />

      <label htmlFor={idNumberInput}>Number</label>
      <input
        type="tel"
        name="number"
        value={number}
        pattern="^(\+?[0-9.\(\)\-\s]*)$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={idNumberInput}
        onChange={inputChange}
        required
      />

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

FormAddContacts.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  addContacts: PropTypes.func.isRequired,
};

FormAddContacts.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  addContacts: PropTypes.func.isRequired,
};
