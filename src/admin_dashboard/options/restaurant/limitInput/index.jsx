// Dependencies
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Number from 'general_components/form/inputs/number';
import Checkbox from 'general_components/form/inputs/checkbox';

const LimitPeopleInput = ({ style, ...props }) => {
  const [enabled, toggleEnabled] = useState(false);
  const defaultValues = {
    people: 0,
    intervalInMinutes: 0,
  };
  const storedValues = useRef(defaultValues);

  const updateValue = function updateValueObject(key, value) {
    storedValues.current[key] = value;
    props.updateValue(storedValues.current);
  };
  return (
    <div>
      <Checkbox
        label="Limit people per interval"
        name="toggleLimitInterval"
        style={style}
        value={enabled}
        updateValue={() => toggleEnabled((prevState) => {
          if (prevState) {
            storedValues.current = defaultValues;
          }
          return !prevState;
        })}
      />
      {enabled
      && (
      <div className={style.limitContainer}>
        <Number
          name="people"
          label="People"
          value={0}
          min={0}
          style={style}
          onBlur={(value) => updateValue('people', value)}
        />
        <Number
          name="interval"
          label="Interval in minutes"
          value={0}
          min={0}
          style={style}
          onBlur={(value) => updateValue('interval', value)}
        />
      </div>
      ) }
    </div>
  );
};

LimitPeopleInput.propTypes = {
  updateValue: PropTypes.func.isRequired,
  style: PropTypes.shape({
    limitContainer: PropTypes.string,
  }).isRequired,
};

export default LimitPeopleInput;
