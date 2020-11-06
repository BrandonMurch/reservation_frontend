// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';

// Components
import EditWindow from './index';

const getInputs = function getInputsFromBooking(user) {
  return [{
    name: 'name',
    type: 'text',
    label: 'Name',
    value: `${user.firstName} ${user.lastName}`,
    required: true,
  }, {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    value: 'john@john.com',
    pattern: '^[\\w\\-_.+]*[\\w\\-_.]@([\\w]+\\.)+[\\w]+[\\w]$',
    patternMessage: 'Email must be properly formatted',
  }, {
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    value: '+1 1231233',
    required: true,
    pattern: '^\\+\\d{1,3} \\d{6,14}$',
    patternMessage:
        'Phone number must be in the format of +1 123456789 where +1 is the country code, followed by the phone number',
  }, {
    name: 'comments',
    type: 'text-area',
    label: 'Comments for restaurant',
    value: user.comments || undefined,
    required: false,
  },
  ];
};

const submitEdit = async function editBookingOnSubmit(user) {
  return fetchWrapper(
    `/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      authorization: `Bearer: ${useTokenContext.getToken}`,
    },
  );
};

const getDetails = function getBookingDetails(user) {
  return (`Edit: ${user.firstName} ${user.lastName}`);
};

const splitName = (user) => {
  const userNames = user.name.split(' ');
  [user.firstName] = userNames.splice(0, 1);
  user.lastName = userNames.join(' ');
};

const EditUser = function OverlayWindowToEditUser({ onSubmit, user }) {
  return (
    <EditWindow
      onSubmit={(event) => {
        splitName(event);
        Object.keys(event).forEach((key) => {
          if (key === 'email') {
            user.username = event.email;
          }
          if (key !== 'undefined' && key !== 'name') {
            user[key] = event[key];
          }
        });

        onSubmit(() => submitEdit(user));
      }}
      submitLabel="Save user"
      inputs={getInputs(user)}
      detailsString={getDetails(user)}
    />
  );
};

EditUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

EditUser.defaultProps = {
};

export default EditUser;
