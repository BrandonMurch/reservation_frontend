// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './delete_confirmation.module.css';

const DeleteConfirmation = ({
  cancelDelete, booking, deleteBooking,
}) => {
  const { startTime, partySize, user } = booking;

  return (
    <div className={style.container}>
      <p className={style.text}>
        {`Do you really wish to delete the booking for ${user.firstName} on ${startTime} for ${partySize} people?`}
      </p>
      <button className={style.button} type="button" onClick={() => deleteBooking()}>Yes</button>
      <button className={style.button} type="button" onClick={() => cancelDelete()}>No</button>
    </div>
  );
};

DeleteConfirmation.propTypes = {
  cancelDelete: PropTypes.func.isRequired,
  deleteBooking: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    partySize: PropTypes.number.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DeleteConfirmation;
