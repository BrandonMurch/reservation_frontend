// Dependences
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useRefreshContext } from '../../../refresh_booking_context';
// Components
import OverlayContainer from '../../booking_overlay/overlay_container';
import ForcibleConfirmation from '../../booking_overlay/confirmation/forcible_confirmation';

// StyleSheets
import style from './restaurant_table.module.css';

const ForceWindow = function getForcibleConfirmationDialog(setOverlay, error, forceUpdate) {
  return new Promise((resolve) => {
    setOverlay(
      <OverlayContainer exit={() => setOverlay(null)}>
        <ForcibleConfirmation
          error={error}
          previousFetch={() => resolve(forceUpdate())}
          exit={() => resolve(false)}
        />
      </OverlayContainer>,
    );
  });
};

const getUpdateFetch = function getFetchToUpdateTableOnServer(booking, table) {
  const path = `/bookings/${booking.id}/setTable`;
  const body = table;
  return fetchWrapper(path, { method: 'PUT', body });
};

const updateTable = async function updateTableOnServerAndHandleErrors(
  setError, setOverlay, fetchCall,
) {
  const { status, error, forceFetch } = await fetchCall();

  if ((status >= 200 && status < 300)) {
    setError(null);
    return true;
  }

  if (forceFetch != null) {
    const forceUpdate = () => updateTable(setError, setOverlay, forceFetch);
    return ForceWindow(setOverlay, error, forceUpdate);
  }

  setError(error);
  return false;
};

const getTableString = function getStringOfTableNamesFromArray(tables) {
  let tableNames = '';
  if (tables.length === 0) {
    return tableNames;
  }
  tables.forEach((table) => {
    tableNames += `${table.name}, `;
  });
  // REGEX: remove last , and space then return string
  return tableNames.match('(.+)(, )')[1];
};

const RestaurantTable = function InputBoxForTableInBooking({ booking }) {
  const { refresh } = useRefreshContext();
  const tableString = getTableString(booking.tables);
  const [tableValue, setTableValue] = useState(tableString);
  const [overlay, setOverlay] = useState(null);
  const [error, setError] = useState('');
  const inputClass = error ? style.errorTableInput : style.tableInput;
  return (
    <>
      {overlay}
      <input
        className={inputClass}
        type="text"
        value={tableValue}
        onFocus={() => setError('')}
        onChange={(event) => setTableValue(event.target.value)}
        onBlur={async () => {
          if (tableString !== tableValue) {
            const tableUpdated = await updateTable(
              setError,
              setOverlay,
              () => getUpdateFetch(booking, tableValue),
            );
            if (tableUpdated) {
              booking.tables = [{ name: tableValue }];
            }
            setTableValue(
              getTableString(booking.tables),
            );
            setOverlay(null);
            refresh();
          }
        }}
      />
      {error && <p className={style.errorText}>{error}</p>}
    </>
  );
};

RestaurantTable.propTypes = {
  booking: PropTypes.shape({
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        seats: PropTypes.number,
      }),
    ),
  }).isRequired,
};

export default RestaurantTable;
