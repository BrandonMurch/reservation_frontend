import React from 'react';
import PropTypes from 'prop-types';
import style from './review.module.css';
import { displayReservation, displayUser } from '../../general_components/display';

const getButtons = function getButtonsFromList(info, onClick) {
  const buttons = [];

  info.forEach((button) => {
    buttons.push(
      <button
        key={button.target}
        className={style.button}
        type="button"
        onClick={() => onClick(button.target)}
      >
        {button.text}
      </button>,
    );
  });

  return buttons;
};

function Review(props) {
  const { reservation, user, onClick } = props;

  console.log(reservation);
  console.log(user);

  const buttons = [
    { target: 'calendar', text: 'Choose a new date.' },
    { target: 'reservation', text: 'Choose a new time or party size.' },
    { target: 'contact', text: 'Change contact information.' },
    { target: 'success', text: 'Make reservation.' },
  ];
  return (
    <div className={style.container}>
      {displayReservation(reservation)}
      {displayUser(user)}
      {getButtons(buttons, onClick)}
    </div>
  );
}

Review.propTypes = {
  reservation: PropTypes.shape({
    date: PropTypes.string,
    partySize: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Review;
