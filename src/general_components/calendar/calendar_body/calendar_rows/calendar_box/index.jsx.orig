// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Stylesheets
import style from './calendar_box.module.css';

const Box = ({
  message, date, onClick,
}) => {
  const today = moment().startOf('date').format('YYYY-MM-DD');
  let containerStyle;
  if (date === '') {
    containerStyle = style.container;
  } else if (date === today) {
    containerStyle = style.todayContainer;
  } else {
    containerStyle = style.activeContainer;
  }

  const dateNumber = date.substr(8).replace(/^0/, '');

  return (
    <td className={containerStyle} role="gridcell" onClick={() => onClick(date)} onKeyUp={() => onClick(date)}>
      <p className={style.dateText}>{dateNumber}</p>
      <p className={style.messageText}>{message}</p>
    </td>
  );
};

Box.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
};

Box.defaultProps = {
  message: null,
  date: '',
  onClick: () => {},
};

export default Box;
