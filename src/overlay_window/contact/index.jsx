//  Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Form from '../../general_components/form';
import { displayReservation } from '../../general_components/display';

// CSS
import style from './contact.module.css';

function ContactForm(props) {
  const [formDisplay, setFormDisplay] = useState('login');
  const { onSubmit, reservation } = props;

  const contactForm = {
    object: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      tAC: false,
    },
    inputs: [
      { name: 'firstName', type: 'text', label: 'First Name' },
      { name: 'lastName', type: 'text', label: 'Last Name' },
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phoneNumber', type: 'tel', label: 'Phone Number' },
      { name: 'pass', type: 'password', label: 'Password' },
      { name: 'confirm', type: 'password', label: 'Confirm Password' },
      {
        name: 'tAC',
        type: 'checkbox',
        label: 'Yes, I agree to the terms and conditions',
      },
      { type: 'submit', label: 'Make Reservation' },
    ],
    onSubmit(user, event) {
      // TODO verify that pass and confirm are identical / indepth verification
      if (user.pass === user.confirm) {
        // TODO, remove this console.log when fully implemented
        console.log(`login successful for user: ${user}`);// eslint-disable-line no-console
        props.onSubmit(user);
      } else {
        // TODO custom implementation ensuring password and confirm are identical
        event.preventDefault();
        alert('Password and confirm password must be identical.'); // eslint-disable-line no-alert, no-undef
      }
    },
    switch: (
      <p className={style.switchText}>
        Do you already have an account?
        <button
          type="button"
          className={style.switch}
          onClick={() => setFormDisplay('login')}
          onKeyUp={() => setFormDisplay('login')}
        >
          Login.
        </button>
      </p>
    ),
  };

  const loginForm = {
    object: {
      username: '',
      password: '',
    },
    inputs: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'pass', type: 'password', label: 'Password' },
      { type: 'submit', to: 'review', label: 'Make Reservation' },
    ],
    onSubmit() {
      // TODO pass back user that is received from server
      // Stub for testing purposes
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phoneNumber: '234566443',
      };
      onSubmit(user);
    },

    switch: (
      <p className={style.switchText}>
        You don&apos;t already have an account?
        <button
          type="button"
          className={style.switch}
          onClick={() => setFormDisplay('contact')}
          onKeyUp={() => setFormDisplay('contact')}
        >
          {' '}
          Sign up.
        </button>
      </p>
    ),
  };

  let form = '';

  if (formDisplay === 'contact') {
    form = contactForm;
  } else if (formDisplay === 'login') {
    form = loginForm;
  }
  return (
    <div className={style.container}>
      {displayReservation(reservation)}
      {form.switch}
      <Form
        object={form.object}
        inputs={form.inputs}
        onSubmit={(event) => form.onSubmit(form.object, event)}
      />
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
