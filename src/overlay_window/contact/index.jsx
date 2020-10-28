//  Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formTypes from './form_types';

// Components
import { DisplayReservation } from '../../general_components/display';
import NewUser from './new_user';
import Login from './login';

// Stylesheets
import style from './contact.module.css';

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
