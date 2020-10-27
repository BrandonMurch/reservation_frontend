// Modified from https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getMonth } from 'shared/dateHelper';

// Components
import useTimeHandler from 'shared/useTimeHandler';
import Header from './header';
import CalendarBody from './calendar_body';

// Stylesheets
import style from './calendar.module.css';

const Calendar = function Calendar({ onDateRender, onClick, monthlyView }) {
  const { dateObject, dispatchDate } = useTimeHandler();
  const currentMonth = getMonth(dateObject.month()).long;
  const currentYear = dateObject.year();
  const monthYear = `${currentMonth} ${currentYear}`;
  return (
    <div className={style.container}>
      <Header
        date={monthYear}
        prev={() => dispatchDate({ type: 'prev', unit: 'months' })}
        next={() => dispatchDate({ type: 'next', unit: 'months' })}
        isThisToday={dateObject.startOf('month').isSame(moment().startOf('month'))}
        goToToday={() => dispatchDate({ type: 'current' })}
        goToDate={(date) => dispatchDate({ type: 'goTo', date })}
        dateObject={dateObject}
        dispatchDate={dispatchDate}
        monthlyView={monthlyView}
      />
      <CalendarBody dateObject={dateObject} onDateRender={onDateRender} onClick={onClick} />
    </div>
  );
};

Calendar.propTypes = {
  onDateRender: PropTypes.func,
  onClick: PropTypes.func,
  monthlyView: PropTypes.bool,
};

Calendar.defaultProps = {
  onDateRender: () => {},
  onClick: () => {},
  monthlyView: false,
};

export default Calendar;
