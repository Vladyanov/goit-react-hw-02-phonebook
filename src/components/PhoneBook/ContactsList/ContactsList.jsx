import css from './contacts-list.module.scss';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, removeContact }) => {
  const items = contacts.map(({ id, name, number }) => (
    <li key={id} className={css.item}>
      {name}: {number}{' '}
      <button onClick={() => removeContact(id)} className={css.btn}>
        Delete
      </button>
    </li>
  ));
  return <ol className={css.list}> {items}</ol>;
};

export default ContactsList;

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
