// Dependencies
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';

// Components
import DayRow from './day_row';
import EditHours from './edit_hours';
import { getDayOfWeek } from 'shared/dateHelper';
import { useBannerContext } from 'contexts/banner_context';

const changeObjectKeysToLowercase = (object) => {
  Object.keys(object).forEach((key) => {
    object[key.toLowerCase()] = object[key];
  });
};

const HoursOfOperationController = () => {
  const { response, alternativeRender } = useFetch('/hours-of-operation');
  if (alternativeRender) {
    return alternativeRender;
  }
  changeObjectKeysToLowercase(response);
  return <HoursOfOperation days={response} />;
};

const HoursOfOperation = ({ days: initialDaysValue }) => {
  const [editWindowDay, setEditWindowDay] = useState('');
  const setBanner = useBannerContext();
  const update = async (openingHours, day) => {
    const { error: fetchError } = await fetchWrapper(`/hours-of-operation/opening-hours/${day}`, { method: 'PUT', body: JSON.stringify(openingHours) });
    if (fetchError) {
      setBanner(fetchError);
    }
  };

  const hoursReducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        state.openingHours[action.day].push(action.hours);
        state.openingHours[action.day] = state.openingHours[action.day].sort();
        update(state.openingHours, action.day);
        return { ...state };
      }
      case 'remove': {
        state.openingHours[action.day].splice(action.hoursIndex, 1);
        update(state.openingHours, action.day);
        return { ...state };
      }
      default: {
        return state;
      }
    }
  };
  const [days, dispatchDays] = useReducer(hoursReducer, initialDaysValue);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {getDayOfWeek().map((day) => (
            <DayRow
              key={day}
              day={day}
              hours={days[day.toLowerCase()].openingHours}
              setEditWindow={((dayToSet) => setEditWindowDay(dayToSet.toLowerCase()))}
            />
          ))}
        </tbody>
      </table>
      { editWindowDay !== ''
        ? (
          <EditHours
            day={editWindowDay}
            hours={days[editWindowDay].openingHours}
            bookingTimeType={initialDaysValue[editWindowDay].bookingTimeType}
            bookingTimes={initialDaysValue[editWindowDay].bookingTimes}
            add={(hours) => dispatchDays({ type: 'add', day: editWindowDay, hours })}
            remove={(hoursIndex) => dispatchDays({ type: 'remove', day: editWindowDay, hoursIndex })}
            cancel={() => setEditWindowDay('')}
          />
        )
        : null}
    </>
  );
};

HoursOfOperation.propTypes = {
  days: PropTypes.shape({}).isRequired,
};

export default HoursOfOperationController;
