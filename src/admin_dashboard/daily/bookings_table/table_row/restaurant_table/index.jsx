// Dependences
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';
import { useRefreshContext } from '../../../refresh_booking_context';

// Components
import OverlayContainer from '../../booking_overlay/overlay_container';
import ForcibleConfirmation from '../../booking_overlay/confirmation/forcible_confirmation';
import AutoCompleteInput from 'general_components/form/inputs/autocomplete_input';
import Loading from 'general_components/loading';

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
  const [overlay, setOverlay] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loading, response: tableList } = useFetch('/restaurant/tables');
  if (loading || isLoading) {
    return (
      <>
        {overlay}
        <div style={{ position: 'relative' }}>
          <Loading size="small" />
        </div>
      </>
    );
  }

  const tableString = getTableString(booking.tables);
  const inputClass = error ? style.errorTableInput : style.tableInput;
  const filter = (suggestion, input) => (
    suggestion.name.indexOf(input) > -1 && suggestion.seats >= booking.partySize
  );
  const display = (suggestion) => suggestion.name;

  return (
    <div className={style.container}>
      {overlay}
      <AutoCompleteInput
        key={tableString}
        style={style}
        hiddenLabel
        possibleEntries={tableList}
        label="Restaurant Table"
        name="table"
        type="text"
        filter={filter}
        display={display}
        className={inputClass}
        value={tableString}
        onFocus={() => setError('')}
        onBlur={async ({ value: tables }) => {
          if (tableString !== tables && tables !== '') {
            setIsLoading(true);
            await updateTable(
              setError,
              setOverlay,
              () => getUpdateFetch(booking, tables),
            );
          }
          setIsLoading(false);
          setOverlay(null);
          refresh();
        }}
      />
      {error && <p className={style.errorText}>{error}</p>}
    </div>
  );
};

RestaurantTable.propTypes = {
  booking: PropTypes.shape({
    partySize: PropTypes.number.isRequired,
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        seats: PropTypes.number,
      }),
    ),
  }).isRequired,
};

export default RestaurantTable;
