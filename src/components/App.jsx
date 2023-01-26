import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './app.module.scss';

class App extends Component {
  state = {
    contacts: [
      {
        id: nanoid(),
        name: 'Apple',
        number: '12349999',
      },
      {
        id: nanoid(),
        name: 'Android',
        number: '54399921',
      },
    ],
    name: '',
    number: '',
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

  addContact = e => {
    e.preventDefault();
    const { contacts, name, number } = this.state;
    if (this.isDuplicate(name)) {
      return alert(`${name} is already in contacts list`);
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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

  render() {
    const { addContact, handleChange, removeContact } = this;
    const { name, number } = this.state;

    const contacts = this.getFilteredContacts();
    const items = contacts.map(({ id, name, number }) => (
      <li key={id} className={css.item}>
        {name}: {number}{' '}
        <button onClick={() => removeContact(id)} className={css.btn}>
          Delete
        </button>
      </li>
    ));

    return (
      <>
        <div className={css.block}>
          <h3 className={css.title}>Phone Book</h3>
          <form action="" onSubmit={addContact}>
            <div className={css.formGroup}>
              <label className={css.label}>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label}>Number</label>
              <input
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>

            <button className={css.btn} type="submit">
              Add contact
            </button>
          </form>
        </div>
        <div className={css.block}>
          <h3 className={css.title}>Contacts</h3>
          <label className={css.label}>Find contacts by name</label>
          <input name="filter" onChange={handleChange} />
          <ol className={css.list}>{items}</ol>
        </div>
      </>
    );
  }
}

export default App;
