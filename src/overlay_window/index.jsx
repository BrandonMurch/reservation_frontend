// Dependencies
import React, {
  useRef, useState, useEffect,
} from 'react';
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
import Banner, { bannerTypes } from './Banner';

// CSS
import style from './overlay_window.module.css';

const submitReservation = function postReservationToServer(
  user, reservation, setError, setRedirect, setIsLoading,
) {
  setIsLoading(true);
  const booking = { ...reservation };

  booking.startTime = `${booking.date}T${booking.time}`;
  delete booking.date;
  delete booking.time;
  const body = JSON.stringify({
    user,
    booking,
  });

  fetch('http://localhost:8080/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
    .then(
      (result) => {
        if (result.status === 201) {
          setRedirect('success');
        } else if (result.status === 409) {
          setError('You have already made a booking on this date.');
        } else {
          setError('Something went wrong... \n please try again later');
        }
        setIsLoading(false);
      },
      (error) => {
        setError('Something went wrong...');
        console.error(error);
        setIsLoading(false);
      },
    );
};

function OverlayWindow(props) {
  const { closeOverlay } = props;
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('');
      setMessage('');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [error, message]);

  // test stub
  const reservation = useRef({
    date: '2020-10-10',
    time: '21:00:00.00',
    partySize: '2',
  });
  const user = useRef({
    firstName: 'john',
    lastName: 'johnson',
    email: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  });

  // production
  // const reservation = useRef({});
  // const user = useRef({});

  return (
    <div className={style.overlay}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      {isLoading && <Banner type={bannerTypes.STANDARD} message="Loading..." />}
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
              isLoading={isLoading}
              onClick={(target) => {
                if (target === 'success') {
                  submitReservation(
                    user.current, reservation.current, setError, setRedirect, setIsLoading,
                  );
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
