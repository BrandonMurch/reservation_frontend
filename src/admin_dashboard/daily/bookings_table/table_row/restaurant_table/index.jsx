// Dependences
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchWrapper from 'shared/useFetch';

// StyleSheets
import style from './restaurant_table.module.css';

const updateTable = async function updateTableOnServer(table, booking, setError) {
  const { status, error } = await fetchWrapper(`/bookings/${booking.id}/setTable/${table}`, { method: 'PUT' });
  if (status >= 200 && status < 300) {
    booking.tables = [{ name: table }];
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
  return tableNames.match('(.+)(, )')[1];
};

const RestaurantTable = function InputBoxForTableInBooking({ booking }) {
  const tableString = getTableString(booking.tables);
  const [tableValue, setTableValue] = useState(tableString);
  const [error, setError] = useState('');
  const inputClass = error ? style.errorTableInput : style.tableInput;
  // TODO: Dropdown menu containing all possible tables that will accomodate party size.
  return (
    <>
      <input
        className={inputClass}
        type="text"
        value={tableValue}
        onFocus={() => setError('')}
        onChange={(event) => setTableValue(event.target.value)}
        onBlur={async () => {
          if (tableString !== tableValue) {
            setTableValue(
              getTableString(
                await updateTable(tableValue, booking, setError),
              ),
            );
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
