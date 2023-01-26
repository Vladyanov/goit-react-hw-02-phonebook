import css from './contacts-filter.module.scss';
import PropTypes from 'prop-types';

const ContactsFilter = ({ handleChange }) => {
  return (
    <>
      <h3 className={css.title}>Contacts</h3>
      <label className={css.label}>Find contacts by name</label>
      <input name="filter" onChange={handleChange} />
    </>
  );
};

export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
