// Dependencies
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import formTypes from './form_types';

// Componenets
import Form from 'general_components/form';

// Stylesheets
import style from './contact.module.css';

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

export default Login;
