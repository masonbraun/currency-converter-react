import React from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ onChange, name }) => {
  return (
    <div>
      <input type="number" name={name} onChange={onChange} />
    </div>
  );
};

InputNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default InputNumber;
