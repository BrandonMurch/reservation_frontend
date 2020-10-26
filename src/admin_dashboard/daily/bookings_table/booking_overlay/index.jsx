// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import types from './window_types';

// Components
import DeleteConfirmation from './confirmation/delete_confirmation';
import ForcibleConfirmation from './confirmation/forcible_confirmation';
import EditWindow from './edit_window';
import LoadingWindow from './loading_window';
import CreateBooking from './create_booking';

// Stylesheets
import OverlayContainer from './overlay_container';

const BookingOverlay = ({
  booking, exit, setErrorBanner, entryWindow, date,
}) => {
  const [windowToDisplay, setWindowToDisplay] = useState(entryWindow || types.CREATE);

  const previousFetchCall = useRef({});

  const handleFetchAndExit = async function handleLoadingAndErrorsForFetch(fetchCallBack) {
    previousFetchCall.current.call = fetchCallBack;
    setWindowToDisplay(types.LOADING);
    const { error, forcible } = await fetchCallBack();
    if (forcible) {
      previousFetchCall.current.error = error;
      setWindowToDisplay(types.CONFIRM);
    } else {
      setErrorBanner(error);
      exit();
    }
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
    forcible: (
      <ForcibleConfirmation
        exit={exit}
        {...previousFetchCall.current}
      />
    ),

  })[value];

  return (
    <OverlayContainer exit={exit}>
      {getOverlay(windowToDisplay)}
    </OverlayContainer>
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
