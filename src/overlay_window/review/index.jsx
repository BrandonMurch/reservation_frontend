import React from 'react';
import PropTypes from 'prop-types';
import style from './review.module.css';
import { DisplayReservation, DisplayUser } from '../../general_components/display';

const getButtons = function getButtonsFromList(info, onClick, isLoading) {
  const buttons = [];

  info.forEach((button) => {
    buttons.push(
      <button
        disabled={isLoading}
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
  const {
    reservation, user, onClick, isLoading,
  } = props;

  const buttons = [
    { target: 'calendar', text: 'Choose a new date.' },
    { target: 'reservation', text: 'Choose a new time or party size.' },
    { target: 'contact', text: 'Change contact information.' },
    { target: 'success', text: 'Make reservation.' },
  ];
  return (
    <div className={style.container}>
      <DisplayReservation reservation={reservation} />
      <DisplayUser user={user} />
      {getButtons(buttons, onClick, isLoading)}
    </div>
  );
}

Review.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
