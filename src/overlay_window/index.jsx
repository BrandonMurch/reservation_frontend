// Dependencies
import React, { useRef, useState, useEffect } from 'react';
import {
  Switch, Route, Link, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';

// Components
import Banner, { bannerTypes } from 'general_components/banner';
import Calendar from './calendar';
import ReservationForm from './reservation';
import ContactForm from './contact';
import Review from './review';
import Success from './success';

// CSS
import style from './overlay_window.module.css';

const formatBooking = function formatBookingDateTime(booking) {
  booking.startTime = `${booking.date}T${booking.time}`;
  delete booking.date;
  delete booking.time;
  return booking;
};

const swapComments = function swapCommentsFromUserToBooking(user, booking) {
  booking.userComments = user.comments;
  delete user.comments;
};

const submitReservation = async function postReservationToServer(
  user,
  reservation,
  setError,
  setRedirect,
  setIsLoading,
) {
  setIsLoading(true);
  const booking = formatBooking({ ...reservation });
  swapComments(user, booking);

  fetchWrapper('/bookings', { method: 'POST', body: JSON.stringify({ user, booking }) })
    .then(
      (response) => {
        setError(response.error);
        if (response.error == null) {
          setRedirect('/success');
        }
      },
    );
  setIsLoading(false);
};

const OverlayWindow = function CreateOverlayWindow(props) {
  const { closeOverlay, reservationInfo, userInfo } = props;
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
  // const reservation = useRef({
  //   date: '2020-10-10',
  //   time: '21:00:00.00',
  //   partySize: 2,
  // });
  // const user = useRef({
  //   firstName: 'john',
  //   lastName: 'johnson',
  //   email: 'john@john.com',
  //   phoneNumber: '+1 123456787',
  //   tAC: true,
  // });

  // production
  const reservation = useRef(reservationInfo);
  const user = useRef(userInfo);

  return (
    <div data-testid="overlay-window" className={style.overlay}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      {isLoading && <Banner type={bannerTypes.STANDARD} message="Loading..." />}
      <ExitOverlay closeOverlay={closeOverlay} />
      <Switch>
        <Route
          path="/calendar"
          render={() => (
            <Calendar
              dateClick={(dateStr) => { reservation.current.date = dateStr; }}
            />
          )}
        />
        <Route
          path="/reservation"
          render={() => (
            <ReservationForm
              setError={setError}
              date={reservation.current.date}
              onSubmit={(event, results) => {
                event.preventDefault();
                reservation.current.time = results.time;
                reservation.current.partySize = results.partySize;
                setRedirect('/contact');
              }}
            />
          )}
        />
        <Route
          path="/contact"
          render={() => (
            <ContactForm
              reservation={reservation.current}
              onSubmit={(results) => {
                user.current = results;
                setRedirect('/review');
              }}
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
                    user.current,
                    reservation.current,
                    setError,
                    setRedirect,
                    setIsLoading,
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
};

OverlayWindow.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
  reservationInfo: PropTypes.shape({
    date: PropTypes.string,
    partySize: PropTypes.number,
    time: PropTypes.string,
  }),
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

OverlayWindow.defaultProps = {
  reservationInfo: {},
  userInfo: {},
};

const ExitOverlay = function ButtonToExitOverlay(props) {
  const { closeOverlay } = props;
  return (
    <div className={style.exitContainer}>
      <Link to="/" className={style.exitText} onClick={closeOverlay}>
        x
      </Link>
    </div>
  );
};

ExitOverlay.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};

export default OverlayWindow;
