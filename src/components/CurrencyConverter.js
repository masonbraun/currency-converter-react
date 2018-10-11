import React from 'react';
import PropTypes from 'prop-types';

const CurrencyConverter = ({ from, handleChange, rates, to }) => {
  return (
    <section>
      <div className="field">
        <input type="number" name="value" onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="baseCurrency">Base Currency</label>
        <select id="baseCurrency" value={from} onChange={handleChange} name="baseCurrency">
          {Object.keys(rates).map(rate => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <select value={to} onChange={handleChange} name="to">
          {Object.keys(rates).map(rate => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

CurrencyConverter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  rates: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default CurrencyConverter;
