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

const forceWindow = function getForcibleConfirmationDialog(setOverlay, error, forceUpdate, exit) {
  return new Promise((resolve) => {
    const forcibleArguments = {
      error,
      previousFetch: () => resolve(forceUpdate()),
      exit: () => resolve(exit()),
    };

    setOverlay(
      <OverlayContainer exit={() => setOverlay(null)}>
        <ForcibleConfirmation {...forcibleArguments} />
      </OverlayContainer>,
    );
  });
};

const updateTable = async function updateTableOnServerAndHandleErrors(
  table, booking, setError, setOverlay, force = false,
) {
  const path = `/bookings/${booking.id}/setTable`;
  const body = table;
  const headers = force ? { Force: true } : {};
  const { status, error, forcible } = await fetchWrapper(path, { method: 'PUT', headers, body });

  if ((status >= 200 && status < 300)) {
    setError(null);
    return [{ name: table }];
  }

  if (forcible) {
    const forceUpdate = () => updateTable(table, booking, setError, setOverlay, true);
    const exit = () => booking.tables;
    return forceWindow(setOverlay, error, forceUpdate, exit);
  }

  setError(error);
  return booking.tables;
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
            booking.tables = await updateTable(tableValue, booking, setError, setOverlay);
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
