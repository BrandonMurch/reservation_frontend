import React, { useState } from 'react';
import NumberInput from 'general_components/form/inputs/number';

function TestComponent() {
  const [value, setValue] = useState(10);
  return (
    <div>
      <NumberInput
        value={10}
        onBlur={(newValue) => setValue(newValue)}
        label="number"
        name="number"
        style={{}}
        min="5"
      />
      <p>
        {`Number is: ${value} \n Is number an integer? ${Number.isInteger(value)}`}
      </p>
    </div>
  );
}

export default TestComponent;
