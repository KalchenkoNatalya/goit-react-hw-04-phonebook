
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({filterChange, filter}) => {
  const handleChangeFilter = event => {
    filterChange(event.target.value);
  };

  return (
    <input
      type="text"
      name="filter"
      className={css.filterInput}
      value={filter}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      onChange={handleChangeFilter}
    />
  );
};


Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
};
