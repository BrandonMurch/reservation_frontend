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

function OverlayWindow(props) {
  const { closeOverlay } = props;
  const [redirect, setRedirect] = useState('');
  const reservation = useRef({});
  const user = useRef({});

  return (
    <div className={style.overlay}>
      {redirect && <Redirect to={redirect} />}
      <ExitOverlay closeOverlay={closeOverlay} />
      <Switch>
        <Route
          path="/calendar"
          render={() => (
            <Calendar
              dateClick={({ dateStr }) => {
                reservation.current.date = dateStr;
                setRedirect('/reservation');
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
                  // TODO: send completed reservation to server
                }
                setRedirect(target);
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
