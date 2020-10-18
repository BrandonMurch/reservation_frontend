import React from 'react';
import PropTypes from 'prop-types';

import style from './edit_booking.module.css';

const Exit = function ButtonToExitEditBookingWindow({ onClick }) {
  return (
    <div className={style.buttonContainer}>
      <button className={style.exitButton} type="button" label="Exit Edit Window" onClick={onClick}>X</button>
    </div>
  );
};

Exit.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Exit;
