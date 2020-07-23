// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { DisplayReservation, DisplayUser } from '../../general_components/display';

// Stylesheets
import style from './review.module.css';

const ButtonsList = function getButtonsFromList({ buttonsInfo, onClick, isLoading }) {
  const buttons = [];

  buttonsInfo.forEach((button) => {
    buttons.push(
      <button
        disabled={isLoading}
        key={button.target}
        className={style.button}
        name={button.target}
        type="button"
        onClick={() => onClick(button.target)}
      >
        {button.text}
      </button>,
    );
  });

  return buttons;
};

const Review = function DisplayDetailsForReview({
  reservation, user, onClick, isLoading,
}) {
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
      <ButtonsList
        buttonsInfo={buttons}
        onClick={onClick}
        isLoading={isLoading}
      />
    </div>
  );
};

Review.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    date: PropTypes.string,
    partySize: PropTypes.number,
    time: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
};

export default Review;
