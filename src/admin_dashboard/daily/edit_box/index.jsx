// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Form from 'general_components/form';
import DeleteConfirmation from './delete_confirmation';

// Stylesheets
import style from './edit_box.module.css';

const getInputs = function getInputsFromBooking(booking) {
  return [{
    // TODO: get a dropdown of available times?
    name: 'startTime',
    type: 'time',
    label: 'Start Time',
    value: booking.startTime,
    required: true,
  },
  {
    name: 'lastName',
    type: 'time',
    label: 'End Time',
    value: booking.endTime,
    required: true,
  },
  {
    name: 'partySize',
    type: 'text',
    label: 'Party Size',
    value: booking.partySize.toString(),
    required: true,
    pattern: '^[1-9][0-9]*$',
    patternMessage: 'Party size must be a number greater than zero',
  },
  {
    name: 'restaurantComments',
    type: 'text-area',
    label: 'Restaurant Comments',
    value: booking.restaurantComments,
    required: false,
  },
  {
    name: 'userComments',
    type: 'text-area',
    label: 'User Comments',
    value: booking.userComments,
    required: false,
  },
  ];
};

const deleteBooking = function submitDeleteRequestForBookingToServer(booking) {
  // TODO: this. also add a confirmation dialog.
  console.log('deleted.');
  console.log(booking);
};

const onSubmit = function editBookingOnSubmit() {
  console.log('Submitted!');
};

const EditBookingOverlay = ({ booking, exitEditOverlay }) => {
  const [displayDelete, setDisplayDelete] = useState(false);

  if (displayDelete) {
    return (
      <DeleteConfirmation
        booking={booking}
        deleteBooking={() => {
          deleteBooking(booking);
          exitEditOverlay();
        }}
        cancelDelete={() => setDisplayDelete(false)}
      />
    );
  }
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <Form
          inputs={getInputs(booking)}
          onSubmit={(event) => onSubmit(event)}
          submitLabel="Save Booking"
        />
        <button type="button" onClick={() => setDisplayDelete(true)}>Delete this booking</button>
        <button type="button" onClick={() => exitEditOverlay()}>Cancel</button>

      </div>
    </div>
  );
};

EditBookingOverlay.propTypes = {
  booking: PropTypes.shape({
  }).isRequired,
  exitEditOverlay: PropTypes.func.isRequired,
};

export default EditBookingOverlay;
