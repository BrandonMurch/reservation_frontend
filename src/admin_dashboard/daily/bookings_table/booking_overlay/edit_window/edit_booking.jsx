// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';

// Components
import EditWindow from './index';

const getInputs = function getInputsFromBooking(booking) {
  const startTime = booking.startTime
    ? moment(booking.startTime).format('HH:mm')
    : undefined;
  const endTime = booking.endTime
    ? moment(booking.endTime).format('HH:mm')
    : undefined;
  const partySize = booking.partySize
    ? booking.partySize.toString()
    : undefined;

  return [{
    name: 'date',
    type: 'date',
    label: 'Date',
    value: booking.date || undefined,
    required: true,
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'Start Time',
    value: startTime,
    required: true,
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'End Time',
    value: endTime,
    required: true,
  },
  {
    name: 'partySize',
    type: 'text',
    label: 'Party Size',
    value: partySize,
    required: true,
    pattern: '^[1-9][0-9]*$',
    patternMessage: 'Party size must be a number greater than zero',
  },
  {
    name: 'restaurantComments',
    type: 'text-area',
    label: 'Restaurant Comments',
    value: booking.restaurantComments || undefined,
    required: false,
  },
  {
    name: 'userComments',
    type: 'text-area',
    label: 'User Comments',
    value: booking.userComments || undefined,
    required: false,
  },
  ];
};

const submitEdit = async function editBookingOnSubmit(booking) {
  return fetchWrapper(
    `/bookings/${booking.id}`, {
      method: 'PUT',
      body: JSON.stringify(booking),
      authorization: `Bearer: ${useTokenContext.getToken}`,
    },
  );
};

const formatEventDateTime = function joinDateAndTimeForStartAndEnd(event) {
  event.startTime = event.startTime
    ? `${event.date}T${event.startTime}`
    : null;
  event.endTime = event.endTime
    ? `${event.date}T${event.endTime}`
    : null;
};

const getDetails = function getBookingDetails({ user, startTime, partySize }) {
  return (`Booking for ${user.firstName} ${user.lastName} on ${moment(startTime).format('dddd MMMM Do[,] YYYY')} at ${moment(startTime).format('h:mm A')} for ${partySize} people`);
};

const EditBooking = function OverlayWindowToEditBooking({ onSubmit, booking, deleteBooking }) {
  return (
    <EditWindow
      onSubmit={(event) => {
        formatEventDateTime(event);
        event.partySize = Number.parseInt(event.partySize, 10);
        Object.keys(event).forEach((key) => {
          booking[key] = event[key];
        });
        onSubmit(() => submitEdit(booking));
      }}
      submitLabel="Save booking"
      inputs={getInputs(booking)}
      deleteCallback={deleteBooking}
      deleteText="Delete"
      detailsString={getDetails(booking)}
    />
  );
};

EditBooking.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  deleteBooking: PropTypes.func.isRequired,
  booking: PropTypes.shape({}).isRequired,
};

EditBooking.defaultProps = {
};

export default EditBooking;
