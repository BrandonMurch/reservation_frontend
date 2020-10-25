import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';

// Components
import Confirmation from '.';

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

const DeleteConfirmation = function DeleteUsingConfirmationComponent({
  booking, onSubmit, cancelDelete,
}) {
  const message = `Do you really wish to delete the booking for ${booking.user.firstName} on ${moment(booking.startTime).format('dddd MMMM Do[,] YYYY')} at ${moment(booking.startTime).format('h:mm A')} for ${booking.partySize} people?`;
  return (
    <Confirmation
      message={message}
      confirm={() => onSubmit(() => deleteBooking(booking))}
      cancel={() => cancelDelete()}
    />
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
