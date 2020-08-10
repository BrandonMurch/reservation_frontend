// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './calendar_box.module.css';

const Box = ({ date, message, dateObject }) => {
  const click = function onClick() { console.log(dateObject.set('date', date).format('YYYY-MM-DD')); };

  const text = (
    <>
      <h1 className={style.dateText}>{date}</h1>
      <h1 className={style.messageText}>{message}</h1>
    </>
  );

  const containerStyle = date ? style.activeContainer : style.container;

  return (
    <td className={containerStyle}>
      {date !== null
        ? (
          <button className={style.button} type="button" onClick={click} onKeyUp={click}>
            {text}
          </button>
        )
        : text}

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
