// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import TextInput from 'general_components/form/inputs/text';

const SpecificTime = ({ hours, onUpdate, ...props }) => {
  const displayTimes = useRef([]);
  const [refreshToggle, toggleRefresh] = useState(false);

  const updateBookingTimes = (times) => {
    displayTimes.current = [];
    times.split(/, ?/).forEach((time) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const hourSet of hours) {
        const splitSet = hourSet.split(' - ');
        if (time >= splitSet[0] && time <= splitSet[1]) {
          displayTimes.current.push(time);
          break;
        }
      }
    });
    onUpdate(displayTimes.current);
    toggleRefresh((refresh) => !refresh);
  };

  return (
    <TextInput
      key={refreshToggle}
      {...props}
      value={displayTimes.current.join(', ')}
      onBlur={updateBookingTimes}
    />

  );
};
SpecificTime.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SpecificTime;
