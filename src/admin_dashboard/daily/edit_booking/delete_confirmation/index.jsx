// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const DeleteConfirmation = ({
  cancelDelete, booking, deleteBooking,
}) => {
  const { startTime, partySize, user } = booking;

  return (
    <>
      <errorBanner />
      <p>
        {`Do you really wish to delete the booking for ${user.firstName} on ${startTime} for ${partySize} people?`}
      </p>
      <button type="button" onClick={() => deleteBooking()}>Yes</button>
      <button type="button" onClick={() => cancelDelete()}>No</button>
    </>
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
