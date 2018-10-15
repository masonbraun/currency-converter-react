import React from 'react';
// import PropTypes from 'prop-types';

const ButtonCopyToClipboard = ({ value }) => {
  return (
    <button className="button button--copy" type="button" data-clipboard-text={value}>
      COPY TO CLIPBOARD
    </button>
  );
};

ButtonCopyToClipboard.propTypes = {
  // value: PropTypes.number.isRequired
};

export default ButtonCopyToClipboard;
