import css from './App.module.css';
import { FormAddContacts } from './FormAddContacts/FormAddContacts';
import { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const filterChange = value => {
    setFilter(value);
  };

  const addContacts = (name, number) => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name: name, number: number },
    ]);
  };
  const onRemoveBook = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(stringifiedContacts);
    if (parcedContacts && parcedContacts.length > 0) {
      setContacts(parcedContacts);
    }
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className={css.wrap}>
      <h2>Phonebook</h2>
      <FormAddContacts addContacts={addContacts} />

      <h2>Find contacts by name</h2>
      <Filter filter={filter} filterChange={filterChange} />

      <h2>Contacts</h2>
      {filter === '' ? (
        <ContactList contacts={contacts} onRemoveBook={onRemoveBook} />
      ) : (
        <ContactList contacts={filteredContacts} />
      )}
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  filterChange: PropTypes.func,
  addContacts: PropTypes.func,
  onRemoveBook: PropTypes.func,
};
