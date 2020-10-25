// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './confirmation.module.css';

const Confirmation = ({
  message, cancel, confirm,
}) => (
  <div className={style.container}>

    <p className={style.text}>{message}</p>

    <button
      className={style.button}
      type="button"
      onClick={confirm}
    >
      Yes
    </button>

    <button
      className={style.button}
      type="button"
      onClick={cancel}
    >
      No

    </button>
  </div>
);

Confirmation.propTypes = {
  message: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default Confirmation;
