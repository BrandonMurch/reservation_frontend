// Dependencies
import React from 'react';
// import PropTypes from 'prop-types';

// Stylesheet
// import { Redirect } from 'react-router-dom';
import Calendar from 'general_components/calendar';
import style from './monthly.module.css';

const onDateRender = function calendarBoxOptions(/* { date, setMessage } */) {
  // TODO
};

const Monthly = () => (
  <div className={style.container}>
    <Calendar onDateRender={onDateRender} />
  </div>
);
export default Monthly;
