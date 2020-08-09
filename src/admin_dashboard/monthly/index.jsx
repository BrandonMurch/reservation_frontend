// Dependencies
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Stylesheet
import { Redirect } from 'react-router-dom';
import Calendar from 'general_components/calendar';
import style from './monthly.module.css';
import Box from './calendar_box';

const Monthly = () => (
  <div className={style.container}>
    <Calendar />
  </div>
);
export default Monthly;
