// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import types from './window_types';

// Components
import DeleteConfirmation from './confirmation/delete_confirmation';
import EditWindow from './edit_window';
import LoadingWindow from './loading_window';
import Exit from './exit_button';
import CreateBooking from './create_booking';

// Stylesheets
import style from './booking_overlay.module.css';

const BookingOverlay = ({
  booking, exit, setErrorBanner, entryWindow, date,
}) => {
  const [windowToDisplay, setWindowToDisplay] = useState(entryWindow || types.CREATE);

  const handleFetchAndExit = async function handleLoadingAndErrorsForFetch(fetchCallBack) {
    setWindowToDisplay(types.LOADING);
    const { error } = await fetchCallBack();
    setErrorBanner(error);
    exit();
  };

  const getOverlay = ({ value }) => ({
    create: (
      <CreateBooking
        date={date}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />
    ),
    edit: (
      <EditWindow
        booking={booking}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
        deleteBooking={() => setWindowToDisplay(types.DELETE)}
      />),
    delete: (
      <DeleteConfirmation
        booking={booking}
        cancelDelete={() => setWindowToDisplay(types.EDIT)}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />
    ),
    loading: (
      <LoadingWindow />
    ),

  })[value];

  return (
    <div className={style.background}>
      <div className={style.container}>
        <Exit onClick={exit} />
        {getOverlay(windowToDisplay)}
      </div>
    </div>
  );
};

BookingOverlay.propTypes = {
  entryWindow: PropTypes.shape({}).isRequired,
  exit: PropTypes.func.isRequired,
  setErrorBanner: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  date: PropTypes.string,
};

BookingOverlay.defaultProps = {
  date: moment().format('YYYY-MM-DD'),
};

export default BookingOverlay;
