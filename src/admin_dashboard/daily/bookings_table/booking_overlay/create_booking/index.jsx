// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';

// Components
import Form from 'general_components/form';

// Stylesheets
import style from '../edit_window/edit_window.module.css';

const getInputs = function getInputsFromBooking(date) {
  return [{
    name: 'date',
    type: 'date',
    label: 'Date',
    value: date || undefined,
    required: true,
    hiddenLabel: true,
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'Start Time',
    required: true,
    hiddenLabel: true,
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'End Time',
    hiddenLabel: true,
  },
  {
    name: 'partySize',
    type: 'text',
    label: 'Party Size',
    required: true,
    pattern: '^[1-9][0-9]*$',
    patternMessage: 'Party size must be a number greater than zero',
    hiddenLabel: true,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
    hiddenLabel: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: '^[\\w\\-_.+]*[\\w\\-_.]@([\\w]+\\.)+[\\w]+[\\w]$',
    patternMessage: 'Email must be properly formatted',
    hiddenLabel: true,
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    required: true,
    pattern: '^\\+\\d{1,3} \\d{6,14}$',
    patternMessage:
        'Phone number must be in the format of +1 123456789 where +1 is the country code, followed by the phone number',
    hiddenLabel: true,
  },
  {
    name: 'restaurantComments',
    type: 'text-area',
    label: 'Restaurant Comments',
    required: false,
    hiddenLabel: true,
  },
  {
    name: 'userComments',
    type: 'text-area',
    label: 'User Comments',
    required: false,
    hiddenLabel: true,
  },
  ];
};

const createBookingBody = function splitUserAndBookingForBody(booking) {
  const splitName = booking.name.split(' ');
  const user = {
    username: booking.email,
    firstName: splitName.splice(0, 1)[0],
    lastName: splitName.length > 0 ? splitName.join(' ') : '',
    phoneNumber: booking.phoneNumber,
  };
  delete booking.name;
  delete booking.phoneNumber;
  delete booking.email;

  booking.startTime = `${booking.date}T${booking.startTime}`;
  booking.endTime = `${booking.date}T${booking.endTime}`;
  booking.partySize = Number.parseInt(booking.partySize, 10);
  return { booking, user };
};

const createBooking = function submitBookingCreationToServer(booking) {
  return fetchWrapper('/bookings', {
    method: 'POST',
    body: JSON.stringify(createBookingBody(booking)),
    authorization: `Bearer: ${useTokenContext.getToken}`,
  });
};

const CreateBooking = ({
  date, onSubmit,
}) => (
  <div className={style.formContainer}>
    <Form
      inputs={getInputs(date)}
      onSubmit={(event) => onSubmit(() => createBooking(event))}
      submitLabel="Create booking"
      styleProp={style}
    />
  </div>

);

CreateBooking.propTypes = {
  date: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateBooking;
