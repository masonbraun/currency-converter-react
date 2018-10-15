import React from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ handleChange, name, value }) => {
  return (
    <div className="field field--number">
      <input type="number" name={name} onChange={handleChange} value={value} />
    </div>
  );
};

InputNumber.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default InputNumber;
