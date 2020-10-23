// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';

// Stylesheets
import style from './delete_confirmation.module.css';

const deleteBooking = async function submitDeleteRequestForBookingToServer(
  booking,
) {
  return fetchWrapper(
    `/bookings/${booking.id}`,
    {
      method: 'DELETE',
      authorization: `Bearer: ${useTokenContext.getToken}`,
    },
  );
};

const DeleteConfirmation = ({
  cancelDelete, booking, onSubmit,
}) => {
  const { startTime, partySize, user } = booking;

  return (
    <div className={style.container}>

      <p className={style.text}>
        {`Do you really wish to delete the booking for ${user.firstName} on ${startTime} for ${partySize} people?`}
      </p>

      <button
        className={style.button}
        type="button"
        onClick={() => onSubmit(() => deleteBooking(booking))}
      >
        Yes
      </button>

      <button
        className={style.button}
        type="button"
        onClick={() => cancelDelete()}
      >
        No

      </button>
    </div>
  );
};

DeleteConfirmation.propTypes = {
  cancelDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    partySize: PropTypes.number.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DeleteConfirmation;
