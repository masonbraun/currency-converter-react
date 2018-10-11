import React from 'react';
import PropTypes from 'prop-types';

const ForeignTransactionFee = ({ onChange, name }) => {
  return (
    <div class="field">
        <input type="number" v-model="value"/>
      </div>
      
      <div class="field">
        <select v-model="from">
        </select>
      </div>  

      <div class="field">
        <select v-model="to">
         
        </select>
      </div>
      </div>
  );
};

ForeignTransactionFee.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // name: PropTypes.string.isRequired
};

export default ForeignTransactionFee;
