// Dependences
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';
import useTimeHandler from 'shared/useTimeHandler';
import moment from 'moment';
import { Redirect, useParams } from 'react-router-dom';
import { useTokenContext } from 'contexts/token_context';
import bookingQuickSort from './bookingQuickSort';
// import PropTypes from 'prop-types';

// Components
// eslint-disable-next-line
import Header from 'general_components/calendar/header';

// Style sheets
import style from './daily.module.css';
import EditBookingOverlay from './edit_booking';

const Titles = function columnTitlesForBookingsTable() {
  return (
    <thead>
      <tr>
        <th>Time</th>
        <th>Table</th>
        <th>Party Size</th>
        <th>Contact</th>
        <th>User Comments</th>
        <th>Restaurant Comments</th>
      </tr>
    </thead>
  );
};

const HourDisplay = ({ hour }) => (
  <tr className={style.hourRow}>
    <td><h2>{`${hour}:00`}</h2></td>
  </tr>
);

HourDisplay.propTypes = {
  hour: PropTypes.number.isRequired,
};

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

const TableRow = function TableRowForBookingTable({ booking, setBookingForEditOverlay }) {
  const {
    startTime, table, partySize, user, userComments, restaurantComments,
  } = booking;
  return (
    <tr className={style.row}>
      <td>{moment(startTime).format('HH:mm')}</td>
      <td><RestaurantTable table={table} booking={booking} /></td>
      <td>{partySize}</td>
      <td>
        {`${user.firstName} ${user.lastName}`}
        <br />
        { `${user.username}`}
        <br />
        {`${user.phoneNumber}`}
      </td>
      <td>{userComments}</td>
      <td>{restaurantComments}</td>
      <td><button className={style.editButton} type="button" onClick={() => setBookingForEditOverlay(booking)}>Edit</button></td>
      {/* TODO: make booking edit button */}
    </tr>
  );
};

TableRow.propTypes = {
  booking: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    table: PropTypes.string,
    partySize: PropTypes.number.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    userComments: PropTypes.string,
    restaurantComments: PropTypes.string,
  }).isRequired,
  setBookingForEditOverlay: PropTypes.func.isRequired,

};

const loadBookingsIntoMap = function loadBookingsIntoMapByHour(bookings) {
  const bookingsByHourMap = new Map();
  bookings.forEach((booking) => {
    /* REGEX: get index 11 + 12, if 11 is 0, get only index 12
    example 2020-10-10T18:00:00 would get 18, but if it was T08:00:00, it would only get 8;
    */
    const getHourInIsoPattern = '([0-9-T]{11})([1-9])([0-9])';
    const bookingHourMatch = booking.startTime.match(getHourInIsoPattern);
    const bookingHour = bookingHourMatch[2] + bookingHourMatch[3];
    let bookingList;
    if (bookingsByHourMap.has(bookingHour)) {
      bookingList = bookingsByHourMap.get(bookingHour);
    } else {
      bookingList = [];
    }
    bookingList.push(booking);
    bookingsByHourMap.set(bookingHour, bookingList);
  });
  return bookingsByHourMap;
};

const tableBookings = function placeBookingsIntoHourSlotsInTable(
  bookingsMap, setBookingForEditOverlay,
) {
  const bookingDisplay = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString();
    if (bookingsMap.has(hourString)) {
      const bookings = bookingsMap.get(hourString);
      bookingQuickSort(bookings);
      bookingDisplay.push(<HourDisplay key={hour} hour={hour} />);
      bookings.forEach((booking) => {
        const key = booking.startTime + booking.user.firstName;
        bookingDisplay.push(
          <TableRow
            key={key}
            booking={booking}
            setBookingForEditOverlay={setBookingForEditOverlay}
          />,
        );
      });
    }
  }

  return bookingDisplay;
};

const Bookings = function BookingsTableByHour({ bookings, toggleBookingRefresh }) {
  const [errorBanner, setErrorBanner] = useState(null);
  let bookingsTableComponents;
  const [bookingForEditOverlay, setBookingForEditOverlay] = useState(null);
  if (bookings != null && bookings.length !== 0) {
    const bookingsMap = loadBookingsIntoMap(bookings);
    bookingsTableComponents = tableBookings(bookingsMap, setBookingForEditOverlay);
  }

  return (
    <>
      {errorBanner}
      {bookingForEditOverlay
      && (
      <EditBookingOverlay
        booking={bookingForEditOverlay}
        exit={() => {
          setBookingForEditOverlay(null);
          toggleBookingRefresh();
        }}
        setErrorBanner={setErrorBanner}
      />
      )}

      <div className={style.tableContainer}>
        <table className={style.table}>
          <Titles />
          <tbody>
            {bookingsTableComponents}
          </tbody>
        </table>
      </div>
    </>
  );
};

Bookings.propTypes = {
  bookings: PropTypes.arrayOf(Object).isRequired,
};

const Daily = function DisplayDailyReservations() {
  const { date } = useParams();
  const { dateObject, dispatchDate } = useTimeHandler('day', date);
  const token = useTokenContext.getToken;
  const path = `/bookings?date=${dateObject.format('yyyy-MM-DD')}`;
  // let toggleFetch = false;
  const [fetchToggle, toggleFetch] = useState(false);
  // TODO: add updateable option for useFetch
  const { alternativeRender, response, status } = useFetch(path, { headers: { authorization: `Bearer: ${token}` } }, fetchToggle);
  if (status >= 400 && status < 500) {
    return <Redirect to="/admin-login" />;
  }
  if (alternativeRender) {
    return alternativeRender;
  }

  const toggleBookingRefresh = function toggleFetchForBookingRefresh() {
    toggleFetch(!fetchToggle);
  };

  return (
    <div key={dateObject.format('dddd MMMM Do[,] YYYY')} className={style.container}>
      <Header
        date={dateObject.format('dddd MMMM Do[,] YYYY')}
        prev={() => dispatchDate('prev')}
        next={() => dispatchDate('next')}
        isThisToday={dateObject.startOf('day').isSame(moment().startOf('day'))}
        goToToday={() => dispatchDate('current')}
      />
      <Bookings bookings={response} toggleBookingRefresh={() => toggleBookingRefresh()} />
    </div>
  );
};

export default Daily;
