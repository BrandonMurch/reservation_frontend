// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'general_components/form';

// Stylesheets
import style from '../edit_window/edit_window.module.css';

const getInputs = function getInputsFromBooking(date) {
  // TODO: remove default values that were used for testing
  return [{
    name: 'date',
    type: 'date',
    label: 'Date',
    value: date || undefined,
    required: true,
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'Start Time',
    required: true,
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'End Time',
    required: true,
  },
  {
    name: 'partySize',
    type: 'text',
    label: 'Party Size',
    required: true,
    pattern: '^[1-9][0-9]*$',
    patternMessage: 'Party size must be a number greater than zero',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: '^[\\w\\-_.+]*[\\w\\-_.]@([\\w]+\\.)+[\\w]+[\\w]$',
    patternMessage: 'Email must be properly formatted',
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    required: true,
    pattern: '^\\+\\d{1,3} \\d{6,14}$',
    patternMessage:
        'Phone number must be in the format of +1 123456789 where +1 is the country code, followed by the phone number',
  },
  {
    name: 'restaurantComments',
    type: 'text-area',
    label: 'Restaurant Comments',
    required: false,
  },
  {
    name: 'userComments',
    type: 'text-area',
    label: 'User Comments',
    required: false,
  },
  ];
};

const CreateBooking = ({
  date, onSubmit,
}) => (
  <div className={style.formContainer}>
    <Form
      inputs={getInputs(date)}
      onSubmit={(event) => {
        event.startTime = `${event.date}T${event.startTime}`;
        event.endTime = `${event.date}T${event.endTime}`;
        event.partySize = Number.parseInt(event.partySize, 10);
        onSubmit(event);
      }}
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
