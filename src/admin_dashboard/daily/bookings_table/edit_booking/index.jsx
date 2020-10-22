// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';
import moment from 'moment';
import types from './window_types';

// Components
import DeleteConfirmation from './delete_confirmation';
import EditWindow from './edit_window';
import LoadingWindow from './loading_window';
import Exit from './exit_button';
import CreateBooking from './create_booking';

// Stylesheets
import style from './edit_booking.module.css';

const createBookingBody = function splitUserAndBookingForBody(booking) {
  const splitName = booking.name.split(' ');
  const user = {
    username: booking.email,
    firstName: splitName[0],
    lastName: splitName.length > 1 ? splitName[1] : '',
    phoneNumber: booking.phoneNumber,
  };
  delete booking.name;
  delete booking.phoneNumber;
  delete booking.email;
  return { booking, user };
};

const createBooking = async function submitBookingCreationToServer(
  booking, setWindowToDisplay, checkErrorAndExit,
) {
  setWindowToDisplay(types.LOADING);
  const { error, alternativeRender } = await fetchWrapper(
    '/bookings', {
      method: 'POST',
      body: JSON.stringify(createBookingBody(booking)),
      authorization: `Bearer: ${useTokenContext.getToken}`,
    },
  );
  checkErrorAndExit(error, alternativeRender);
};

const submitEdit = async function editBookingOnSubmit(
  bookingId, booking, setWindowToDisplay, checkErrorAndExit,
) {
  setWindowToDisplay(types.LOADING);
  const { error, alternativeRender } = await fetchWrapper(
    `/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(booking),
      authorization: `Bearer: ${useTokenContext.getToken}`,
    },
  );
  checkErrorAndExit(error, alternativeRender);
};

const deleteBooking = async function submitDeleteRequestForBookingToServer(
  booking, setWindowToDisplay, checkErrorAndExit,
) {
  setWindowToDisplay(types.LOADING);
  const { error, alternativeRender } = await fetchWrapper(`/bookings/${booking.id}`, { method: 'DELETE', authorization: `Bearer: ${useTokenContext.getToken}` });
  checkErrorAndExit(error, alternativeRender);
};

const EditBookingOverlay = ({
  booking, exit, setErrorBanner, entryWindow, date,
}) => {
  const [windowToDisplay, setWindowToDisplay] = useState(entryWindow || types.CREATE);

  const checkErrorAndExit = function checkResponseForErrorsRefreshBookingsAndExitWindow(
    error, alternativeRender,
  ) {
    if (error) {
      setErrorBanner(alternativeRender);
    } else {
      setErrorBanner(null);
    }

    exit();
  };

  let render;
  switch (windowToDisplay) {
    case types.DELETE:
      render = (
        <DeleteConfirmation
          booking={booking}
          cancelDelete={() => setWindowToDisplay(types.EDIT)}
          deleteBooking={() => deleteBooking(booking, setWindowToDisplay, checkErrorAndExit)}
        />
      );
      break;

    case types.EDIT:
      render = (
        <EditWindow
          booking={booking}
          onSubmit={(submittedBooking) => {
            submitEdit(booking.id, submittedBooking, setWindowToDisplay, checkErrorAndExit);
          }}
          setWindowToDisplay={setWindowToDisplay}
          exit={exit}
        />
      );
      break;

    case types.LOADING:
      render = (
        <LoadingWindow />
      );
      break;

    case types.CREATE:
      render = (
        <CreateBooking
          date={date}
          onSubmit={(newBooking) => {
            createBooking(newBooking, setWindowToDisplay, checkErrorAndExit);
          }}
        />
      );
      break;

    default:
      render = (
        <h1>
          {'OH NO! This shouldn\'t happen...'}
        </h1>
      );
      break;
  }

  return (
    <div className={style.background}>
      <div className={style.container}>
        <Exit onClick={exit} />
        {render}
      </div>
    </div>
  );
};

EditBookingOverlay.propTypes = {
  entryWindow: PropTypes.shape({}).isRequired,
  exit: PropTypes.func.isRequired,
  setErrorBanner: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  date: PropTypes.string,
};

EditBookingOverlay.defaultProps = {
  date: moment().format('YYYY-MM-DD'),
};

export default EditBookingOverlay;
