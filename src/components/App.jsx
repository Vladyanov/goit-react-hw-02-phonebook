import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './PhoneBook/ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import ContactsForm from './ContactsForm/ContactsForm';

import items from './items';

import css from './app.module.scss';

class App extends Component {
  state = {
    contacts: [...items],
    filter: '',
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  isDuplicate(name) {
    const normalizedName = name.toLowerCase();

    const { contacts } = this.state;
    const isUnique = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });
    return isUnique;
  }

  addContact = ({ name, number }) => {
    // const { contacts, name, number } = this.state;
    if (this.isDuplicate(name)) {
      return alert(`${name} is already in contacts list`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => {
      const { contacts } = prevState;
      return { contacts: [newContact, ...contacts] };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const res = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return res;
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { addContact, removeContact, handleFilter } = this;

    const contacts = this.getFilteredContacts();

    return (
      <>
        <div className={css.block}>
          <h3 className={css.title}>Phone Book</h3>
          <ContactsForm onSubmit={addContact} />
        </div>
        <div className={css.block}>
          <ContactsFilter handleChange={handleFilter} />
          <ContactsList contacts={contacts} removeContact={removeContact} />
        </div>
      </>
    );
  }
}

export default App;
