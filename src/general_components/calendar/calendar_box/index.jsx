// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './calendar_box.module.css';

const Box = ({ date, message }) => (
  <td className={style.container}>
    <h1 className={style.dateText}>{date}</h1>
    <h1 className={style.messageText}>{message}</h1>
  </td>
);

Box.propTypes = {
  date: PropTypes.number,
  message: PropTypes.string,
};

Box.defaultProps = {
  date: null,
  message: null,
};

export default Box;
