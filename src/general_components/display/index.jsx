// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import style from './display.module.css';

export function displayReservation(reservation) {
  const date = new Date(reservation.date).toDateString();
  const person = reservation.partySize > 1 ? 'people' : 'person';
  return (
    <p className={style.title}>
      {`${reservation.partySize} ${person}`}
      <br />
      {reservation.time}
      <br />
      {date}
    </p>
  );
}

export function displayUser({
  firstName,
  lastName,
  email,
  phoneNumber,
}) {
  return (
    <p className={style.title}>
      {`${firstName} ${lastName}`}
      <br />
      {email}
      <br />
      {phoneNumber}
    </p>
  );
}

displayUser.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
