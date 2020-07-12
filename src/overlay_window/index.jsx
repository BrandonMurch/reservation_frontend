// Dependencies
import React, { useRef, useState } from 'react';
import {
  Switch, Route, Link, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import Calendar from './calendar';
import ReservationForm from './reservation';
import ContactForm from './contact';
import Review from './review';
import Success from './success';

// CSS
import style from './overlay_window.module.css';

// FIXME: Jackson cannot deserialize booking in backend;
const submitReservation = function postReservationToServer(user, reservation) {
  console.log(reservation);
  const body = JSON.stringify({
    user,
    booking: reservation,
  });

  console.log(body);
  fetch('http://localhost:8080/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
    .then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      },
    );
};

function OverlayWindow(props) {
  const { closeOverlay } = props;
  const [redirect, setRedirect] = useState('');
  const reservation = useRef({
    startTime: '2020-10-10T21:00:00.00',
    partySize: '2',
  });
  const user = useRef({
    firstName: 'john',
    lastName: 'johnson',
    email: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  });

  return (
    <div className={style.overlay}>
      {redirect && <Redirect to={redirect} />}
      <ExitOverlay closeOverlay={closeOverlay} />
      <Switch>
        <Route
          path="/calendar"
          render={() => (
            <Calendar
              dateClick={(args) => {
                if (!args.dayEl.disabled) {
                  reservation.current.date = args.dateStr;
                  setRedirect('/reservation');
                }
              }}
            />
          )}
        />
        <Route
          path="/reservation"
          render={() => (
            <ReservationForm
              date={reservation.current.date}
              onSubmit={
                (event, results) => {
                  event.preventDefault();
                  reservation.current.time = results.time;
                  reservation.current.partySize = results.partySize;
                  setRedirect('/contact');
                }
              }
            />
          )}
        />
        <Route
          path="/contact"
          render={() => (
            <ContactForm
              reservation={reservation.current}
              onSubmit={
                (results) => {
                  user.current = results;
                  setRedirect('/review');
                }
              }
            />
          )}
        />
        <Route
          path="/review"
          render={() => (
            <Review
              user={user.current}
              reservation={reservation.current}
              onClick={(target) => {
                if (target === 'success') {
                  submitReservation(user.current, reservation.current);
                } else {
                  setRedirect(target);
                }
              }}
            />
          )}
        />
        <Route path="/success" render={() => <Success />} />
      </Switch>
    </div>
  );
}

OverlayWindow.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};

function ExitOverlay(props) {
  const { closeOverlay } = props;
  return (
    <div className={style.exitContainer}>
      <Link to="/" className={style.exitText} onClick={closeOverlay}>
        x
      </Link>
    </div>
  );
}

ExitOverlay.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};

export default OverlayWindow;
