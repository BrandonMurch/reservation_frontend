// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './confirmation.module.css';

const Confirmation = ({
  message, cancel, confirm,
}) => {
  const messageWithNewLines = message
    .split('\n')
  // eslint-disable-next-line react/no-array-index-key
    .map((item, i) => <p className={style.text} key={i}>{item}</p>);

  return (
    <div className={style.container}>

      <div className={style.textContainer}>{messageWithNewLines}</div>

      <button
        className={style.button}
        type="button"
        onClick={() => confirm()}
      >
        Yes
      </button>

      <button
        className={style.button}
        type="button"
        onClick={() => cancel()}
      >
        No

      </button>
    </div>
  );
};

Confirmation.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default Confirmation;
