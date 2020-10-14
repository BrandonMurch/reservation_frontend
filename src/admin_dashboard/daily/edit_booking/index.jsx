// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from 'contexts/token_context';
import types from './window_types';

// Components
import DeleteConfirmation from './delete_confirmation';
import EditWindow from './edit_window';
import LoadingWindow from './loading_window';
import Exit from './exit_button';

// Stylesheets
import style from './edit_booking.module.css';

const EditBookingOverlay = ({
  booking, exit, refreshBookings, setErrorBanner,
}) => {
  const [windowToDisplay, setWindowToDisplay] = useState(types.EDIT);

  const checkErrorAndExit = function checkResponseForErrorsRefreshBookingsAndExitWindow(
    error, alternativeRender,
  ) {
    if (error) {
      setErrorBanner(alternativeRender);
    } else {
      setErrorBanner(null);
      refreshBookings();
    }

    exit();
  };

  const deleteBooking = async function submitDeleteRequestForBookingToServer() {
    setWindowToDisplay(types.LOADING);
    const { error, alternativeRender } = await fetchWrapper(`/bookings/${booking.id}`, { method: 'DELETE', authorization: `Bearer: ${useTokenContext.getToken}` });
    checkErrorAndExit(error, alternativeRender);
  };

  const submitEdit = async function editBookingOnSubmit(submittedBooking) {
    setWindowToDisplay(types.LOADING);
    const { error, alternativeRender } = await fetchWrapper(
      `/bookings/${booking.id}`, {
        method: 'PUT',
        body: JSON.stringify(submittedBooking),
        authorization: `Bearer: ${useTokenContext.getToken}`,
      },
    );
    checkErrorAndExit(error, alternativeRender);
  };

  let render;
  switch (windowToDisplay) {
    case types.DELETE:
      render = (
        <DeleteConfirmation
          booking={booking}
          cancelDelete={() => setWindowToDisplay(types.EDIT)}
          refreshBookings={refreshBookings}
          deleteBooking={() => deleteBooking(booking)}
        />
      );
      break;

    case types.EDIT:
      render = (
        <EditWindow
          booking={booking}
          onSubmit={(submittedBooking) => submitEdit(submittedBooking)}
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
  exit: PropTypes.func.isRequired,
  refreshBookings: PropTypes.func.isRequired,
  setErrorBanner: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditBookingOverlay;
