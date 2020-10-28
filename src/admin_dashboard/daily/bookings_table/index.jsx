// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Banner, { bannerTypes } from 'general_components/banner';
import bookingQuickSort from '../bookingQuickSort';
import types from './booking_overlay/window_types';
import { useRefreshContext } from '../refresh_booking_context';

// Components
import EditBookingOverlay from './booking_overlay';
import TableRow from './table_row';

// Stylesheets
import style from './bookings_table.module.css';

const loadBookingsIntoMap = function loadBookingsIntoMapByHour(bookings) {
  const bookingsByHourMap = new Map();
  bookings.forEach((booking) => {
    /* REGEX: get index 11 + 12, if 11 is 0, get only index 12
    example 2020-10-10T18:00:00 would get 18, but if it was T08:00:00, it would only get 8;
    */
    const getHourInIsoPattern = /([0-9-T]{11})(?!0[1-9])(\d+)/;
    const bookingHourMatch = booking.startTime.match(getHourInIsoPattern);
    const bookingHour = bookingHourMatch[2];

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
  bookingsMap, bookingToEdit, setBookingOverlayWindow,
) {
  const bookingDisplay = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString();
    if (bookingsMap.has(hourString)) {
      const bookings = bookingsMap.get(hourString);
      bookingQuickSort(bookings);
      bookingDisplay.push(<HourRow key={hour} hour={hour} />);
      bookings.forEach((booking) => {
        const key = booking.startTime + booking.user.username;
        bookingDisplay.push(
          <TableRow
            key={key}
            booking={booking}
            setBookingForEditOverlay={(selectedBooking) => {
              bookingToEdit.current = selectedBooking;
              setBookingOverlayWindow(types.EDIT);
            }}
          />,
        );
      });
    }
  }

  return bookingDisplay;
};

const Bookings = function BookingsTableByHour({ bookings, date }) {
  const { refresh } = useRefreshContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [bookingOverlayWindow, setBookingOverlayWindow] = useState(null);
  const selectedBooking = useRef();
  let bookingsTableComponents;
  if (bookings != null && bookings.length !== 0) {
    const bookingsMap = loadBookingsIntoMap(bookings);
    bookingsTableComponents = tableBookings(bookingsMap, selectedBooking, setBookingOverlayWindow);
  }
  return (
    <>
      {errorMessage && <Banner type={bannerTypes.ERROR} message={errorMessage} />}
      {bookingOverlayWindow
      && (
      <EditBookingOverlay
        booking={selectedBooking.current}
        entryWindow={bookingOverlayWindow}
        exit={(blockRefresh) => {
          selectedBooking.current = null;
          setBookingOverlayWindow(null);
          if (!blockRefresh) {
            refresh();
          }
        }}
        setErrorBanner={setErrorMessage}
        date={date}
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
              <th><button type="button" onClick={() => setBookingOverlayWindow(types.CREATE)}>Make a booking</button></th>
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
  date: PropTypes.string.isRequired,
};

export default Bookings;
