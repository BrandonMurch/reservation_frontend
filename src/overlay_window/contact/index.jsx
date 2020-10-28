//  Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import { enumeration } from 'shared/helpers';
import Form from '../../general_components/form';
import { DisplayReservation } from '../../general_components/display';

// Stylesheets
import style from './contact.module.css';

const formTypes = enumeration.singleValue('NEW_USER', 'LOGIN');

// TODO: break this into two files.

const NewUser = function PopulateContactForm(props) {
  const { setFormDisplay } = props;
  const user = useRef({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    tAC: false,
  });

  const inputs = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'username',
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
      name: 'comments',
      type: 'textarea',
      label: 'Comments / Dietary requirements',
    },
    {
      name: 'tAC',
      type: 'checkbox',
      label: 'Yes, I agree to the terms and conditions',
      required: true,
    },
  ];

  const onSubmit = function contactFormSubmit(submittedUser) {
    props.onSubmit(submittedUser);
  };

  const onCheckboxClick = function toggleBooleanCheckBoxVariable(name, value) {
    user.current[name] = value;
  };

  return (
    <>
      <p className={style.switchText}>
        Do you already have an account?
        <button
          type="button"
          className={style.switchButton}
          onClick={() => setFormDisplay(formTypes.LOGIN)}
          onKeyUp={() => setFormDisplay(formTypes.LOGIN)}
        >
          Login
        </button>
      </p>
      <Form
        setFormDisplay={setFormDisplay}
        submitLabel="Next"
        onCheckboxClick={(name, value) => onCheckboxClick(name, value)}
        inputs={inputs}
        onSubmit={(event) => onSubmit(event)}
      />
    </>
  );
};

NewUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setFormDisplay: PropTypes.func.isRequired,
};

const Login = function CreateLoginForm(props) {
  const { setFormDisplay } = props;
  const login = useRef({
    username: '',
    password: '',
  });

  const inputs = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'pass', type: 'password', label: 'Password' },
  ];

  const onSubmit = function GetUserFromServer() {
    // TODO: pass back user that is received from server
    // Stub for testing purposes
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@email.com',
      phoneNumber: '234566443',
    };
    props.onSubmit(user);
  };

  const onTextBlur = function updateLoginOnBlur(value, name) {
    login.current[name] = value;
  };

  return (
    <>
      <p className={style.switchText}>
        You don&apos;t already have an account?
        <button
          type="button"
          className={style.switchButton}
          onClick={() => setFormDisplay(formTypes.NEW_USER)}
          onKeyUp={() => setFormDisplay(formTypes.NEW_USER)}
        >
          Sign up
        </button>
      </p>
      <Form
        submitLabel="Next"
        onTextBlur={(value, name) => onTextBlur(value, name)}
        inputs={inputs}
        onSubmit={(event) => onSubmit(event)}
      />
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setFormDisplay: PropTypes.func.isRequired,
};

function ContactForm(props) {
  const [formDisplay, setFormDisplay] = useState(formTypes.NEW_USER);
  const { onSubmit, reservation } = props;

  return (
    <div className={style.container}>
      <DisplayReservation reservation={reservation} />
      {formDisplay === formTypes.NEW_USER && (
        <NewUser setFormDisplay={setFormDisplay} onSubmit={onSubmit} />
      )}
      {formDisplay === formTypes.LOGIN && (
        <Login setFormDisplay={setFormDisplay} onSubmit={onSubmit} />
      )}
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    time: PropTypes.string,
    date: PropTypes.string,
    partySize: PropTypes.number,
  }).isRequired,
};

export default ContactForm;
