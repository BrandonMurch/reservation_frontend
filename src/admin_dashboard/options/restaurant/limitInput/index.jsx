import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'general_components/form/inputs';
import BaseInput from 'general_components/form/inputs/base_input';

const LimitPeopleInput = ({ style, ...props }) => {
//   const [enabled, toggleEnabled] = useState(false);
  const enabled = true;
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
        updateValue={() => {}}
        style={style}
        // updateValue={() => toggleEnabled((prevState) => {
        //   if (prevState) {
        //     storedValues.current = defaultValues;
        //   }
        //   return !prevState;
        // })}
      />
      {enabled
      && (
      <div>
        <BaseInput
          name="people"
          label="People"
          type="number"
          value={0}
          min={0}
          style={style}
          updateValue={(value) => updateValue('people', value)}
        />
        <BaseInput
          name="interval"
          label="Interval in minutes"
          type="number"
          value={0}
          min={0}
          style={style}
          updateValue={(value) => updateValue('interval', value)}
        />
      </div>
      ) }
    </div>
  );
};

LimitPeopleInput.propTypes = {
  updateValue: PropTypes.func.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default LimitPeopleInput;
