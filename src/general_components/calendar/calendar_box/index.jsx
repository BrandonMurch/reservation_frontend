// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Stylesheets
import style from './calendar_box.module.css';

const Box = ({
  date, message, dateObject,
}) => {
  const click = function onClick() { console.log(dateObject.set('date', date).format('YYYY-MM-DD')); };

  const text = (
    <>
      <h1 className={style.dateText}>{date}</h1>
      <h1 className={style.messageText}>{message}</h1>
    </>
  );

  const today = moment().startOf('date');
  let containerStyle;
  if (date === null) {
    containerStyle = style.container;
  } else if (dateObject.set('date', date).isSame(today)) {
    containerStyle = style.todayContainer;
  } else {
    containerStyle = style.activeContainer;
  }

  return (
    <td className={containerStyle}>
      {date !== null
        && (
          <label className={style.hiddenLabelText} htmlFor="button">
            {date}
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className={style.button} type="button" name="button" onClick={click} onKeyUp={click} />
          </label>
        )}
      {text}

    </td>
  );
};

Box.propTypes = {
  date: PropTypes.number,
  message: PropTypes.string,
  dateObject: PropTypes.shape({
    set: PropTypes.func,
  }),
};

Box.defaultProps = {
  date: null,
  message: null,
  dateObject: {
    date: () => '',
  },
};

export default Box;
