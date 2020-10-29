// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import RestaurantTable from './restaurant_table';
import UserDetails from './user_details';

// Stylesheets
import style from './table_row.module.css';

const TableRow = function TableRowForBookingTable({ booking, setBookingForEditOverlay }) {
  const {
    startTime, partySize, user, userComments, restaurantComments,
  } = booking;
  return (
    <tr className={style.row}>
      <td>{moment(startTime).format('H:mm')}</td>
      <td><RestaurantTable key={booking.tables} booking={booking} /></td>
      <td>{partySize}</td>
      <UserDetails user={user} />
      <td>
        {userComments && `${userComments}`}
        <br />
        {restaurantComments && `${restaurantComments}`}
      </td>
      <td><button className={style.editButton} type="button" onClick={() => setBookingForEditOverlay(booking)}>Edit</button></td>
    </tr>
  );
};

TableRow.propTypes = {
  booking: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
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

export default TableRow;
