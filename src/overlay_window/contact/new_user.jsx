// Dependencies
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import formTypes from './form_types';

// Components
import Form from 'general_components/form';

// Stylesheets
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
