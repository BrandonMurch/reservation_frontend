// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Stylesheets
import style from './calendar_box.module.css';

const Box = ({
  message, date,
}) => {
  const click = function onClick() {
    if (date) {
      // eslint-disable-next-line no-console
      console.log(date);
    }
  };

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
    <td className={containerStyle} role="gridcell" onClick={click} onKeyUp={click}>
      {date !== ''
        && (
          <>
            <h1 className={style.dateText}>{dateNumber}</h1>
            <h1 className={style.messageText}>{message}</h1>
          </>
        )}
    </td>
  );
};

Box.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
};

Box.defaultProps = {
  message: null,
  date: '',
};

export default Box;
