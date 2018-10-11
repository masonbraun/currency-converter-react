import React from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ handleChange, name }) => {
  return (
    <div>
      <input type="number" name={name} onChange={handleChange} />
    </div>
  );
};

InputNumber.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default InputNumber;
