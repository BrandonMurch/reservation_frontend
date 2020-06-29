import React from 'react';
import PropTypes from 'prop-types';
import style from './review.module.css';
import { displayReservation } from '../../overlay_window';

function Review(props) {

    const { reservation, user, onClick } = props

    const buttons = [
        {target: "calendar", text: "Choose a new date."},
        {target: "reservation", text: "Choose a new time or party size."},
        {target: "contact", text: "Change contact information."},
        {target: "success", text: "Make reservation."},
    ]
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
}

function getButtons (info, onClick) {
    const buttons = [];

    info.forEach(button => {
        buttons.push(
            <button
                key={button.target}
                className={style.button}
                type="button"
                onClick={() => onClick(button.target)}>
                    {button.text}
            </button>
        )
    })

    return buttons;
}

function displayUser(user) {
    return (
        <p className={style.title}>
            {user.firstName + " " + user.lastName}<br/>
            {user.email} <br/>
            {user.phoneNumber}
        </p>
    )
}

export default Review;
