import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ value, handleChange, options, name, label }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} value={value} onChange={handleChange} name={name}>
        <option value="" disabled>
          --Select Currency--
        </option>
        {Object.keys(options).map(option => {
          console.log(option);
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FormSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormSelect;
