import React from 'react';
import PropTypes from 'prop-types';

const InputRadio = ({ handleChange, id, value, label, fee }) => {
  return (
    <div className="radio-button">
      <input id={id} type="radio" name="fee" value={value} onChange={handleChange} checked={fee === value} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

InputRadio.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputRadio;
