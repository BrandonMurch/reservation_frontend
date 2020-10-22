// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bookingQuickSort from '../bookingQuickSort';

// Components
import EditBookingOverlay from './edit_booking';
import TableRow from './table_row';

// Stylesheets
import style from './bookings_table.module.css';

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

const HourRow = ({ hour }) => (
  <tr className={style.hourRow}>
    <td><h2>{`${hour}:00`}</h2></td>
  </tr>
);

HourRow.propTypes = {
  hour: PropTypes.number.isRequired,
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
      bookingDisplay.push(<HourRow key={hour} hour={hour} />);
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
  const [bookingForEditOverlay, setBookingForEditOverlay] = useState(null);
  let bookingsTableComponents;
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
          <thead>
            <tr>
              <th>Time</th>
              <th>Table</th>
              <th>Party Size</th>
              <th>Contact</th>
              <th>Comments</th>
            </tr>
          </thead>
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
  toggleBookingRefresh: PropTypes.func.isRequired,
};

export default Bookings;
