//  Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import Form from '../../general_components/form';
import { DisplayReservation } from '../../general_components/display';

// CSS
import style from './contact.module.css';

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

  //
  const inputs = [
    { name: 'firstName', type: 'text', label: 'First Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'email', type: 'email', label: 'Email' },
    {
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone Number',
      validator(phone) {
        if (/^\+\d{1,3} \d{6,14}$/.test(phone)) {
          return '';
        }

        return 'Phone number must be in the format of +1 123456789 where 1 is the country code, followed by the phone number';
      },
    },
    //  TODO: Allow user to create an account
    // {
    //   name: 'password',
    //   type: 'confirmPassword',
    //   label: 'Password',
    //   validator(password) {
    //     console.log();
    //     if (password.length < 8) {
    //       return 'Password must be at least 8 characters';
    //     }
    //     if (!/\d/.test(password)) {
    //       return 'Password must have at least one number';
    //     }
    //     if (!/[A-Z]/.test(password)) {
    //       return 'Password must have at least one capital letter';
    //     }
    //     return '';
    //   },
    // },
    {
      name: 'tAC',
      type: 'checkbox',
      label: 'Yes, I agree to the terms and conditions',
    },
  ];

  const onSubmit = function contactFormSubmit() {
    props.onSubmit(user.current);
  };

  const onClick = function toggleBooleanCheckBoxVariable(name, value) {
    user.current[name] = value;
  };

  const onBlur = function updateUserOnInputBlur(value, name) {
    user.current[name] = value;
  };

  return (
    <>
      <p className={style.switchText}>
        Do you already have an account?
        <button
          type="button"
          className={style.switchButton}
          onClick={() => setFormDisplay('login')}
          onKeyUp={() => setFormDisplay('login')}
        >
          Login.
        </button>
      </p>
      <Form
        setFormDisplay={setFormDisplay}
        submitLabel="Next"
        onClick={(name, value) => onClick(name, value)}
        onBlur={(value, name) => onBlur(value, name)}
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
    // TODO pass back user that is received from server
    // Stub for testing purposes
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@email.com',
      phoneNumber: '234566443',
    };
    props.onSubmit(user);
  };

  const onBlur = function updateLoginOnBlur(value, name) {
    login.current[name] = value;
  };

  return (
    <>
      <p className={style.switchText}>
        You don&apos;t already have an account?
        <button
          type="button"
          className={style.switchButton}
          onClick={() => setFormDisplay('newUser')}
          onKeyUp={() => setFormDisplay('newUser')}
        >
          {' '}
          Sign up.
        </button>
      </p>
      <Form
        submitLabel="Next"
        onBlur={(value, name) => onBlur(value, name)}
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
  const [formDisplay, setFormDisplay] = useState('newUser');
  const { onSubmit, reservation } = props;

  return (
    <div className={style.container}>
      <DisplayReservation reservation={reservation} />
      {formDisplay === 'newUser'
        ? <NewUser setFormDisplay={setFormDisplay} onSubmit={onSubmit} />
        : <Login setFormDisplay={setFormDisplay} onSubmit={onSubmit} />}
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    time: PropTypes.string,
    date: PropTypes.string,
    partySize: PropTypes.string,
  }).isRequired,
};

export default ContactForm;
