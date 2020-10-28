// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import style from './display.module.css';

function DisplayReservation(props) {
  const { reservation } = props;
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

DisplayReservation.propTypes = {
  reservation: PropTypes.shape({
    partySize: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

function DisplayUser({ user }) {
  const {
    firstName,
    lastName,
    username,
    phoneNumber,
  } = user;
  return (
    <p className={style.title}>
      {`${firstName} ${lastName}`}
      <br />
      {username}
      <br />
      {phoneNumber}
    </p>
  );
}

DisplayUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export { DisplayReservation, DisplayUser };
