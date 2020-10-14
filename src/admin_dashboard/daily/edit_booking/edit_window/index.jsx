// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Form from 'general_components/form';
import types from '../window_types';

// Components

// Stylesheets
import style from './edit_window.module.css';

const getInputs = function getInputsFromBooking(booking) {
  const startTime = moment(booking.startTime).format('HH:mm');
  const endTime = moment(booking.endTime).format('HH:mm');
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
    value: startTime || undefined,
    required: true,
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'End Time',
    value: endTime || undefined,
    required: true,
  },
  {
    name: 'partySize',
    type: 'text',
    label: 'Party Size',
    value: booking.partySize.toString() || undefined,
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

const EditWindow = ({
  exit, booking, setWindowToDisplay, onSubmit,
}) => (
  <div className={style.formContainer}>
    <Form
      inputs={getInputs(booking)}
      onSubmit={(event) => {
        event.startTime = `${event.date}T${event.startTime}`;
        event.endTime = `${event.date}T${event.endTime}`;
        const keys = Object.keys(event);
        keys.forEach((key) => {
          booking[key] = event[key];
        });
        onSubmit(booking);
      }}
      submitLabel="Save Booking"
    />
    <button type="button" onClick={() => setWindowToDisplay(types.DELETE)}>Delete this booking</button>
    <button type="button" onClick={() => exit()}>Cancel</button>
  </div>

);

EditWindow.propTypes = {
  exit: PropTypes.func.isRequired,
  setWindowToDisplay: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    partySize: PropTypes.number.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

};

export default EditWindow;
