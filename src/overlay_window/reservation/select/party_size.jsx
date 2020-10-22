// Dependencies
import React from 'react';
import { emptyOption } from './shared';

// Components
import BaseSelect from './base_select';

const partySizeOptions = function createAListOfPartySizeOptionsForASelectInput() {
  // TODO: get max party size from server;
  const maxPartySize = 8;
  const options = [emptyOption];

  for (let i = 1; i <= maxPartySize; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
};

const PartySizeSelect = function CreateAPartySizeDropDownSelectForForm(props) {
  return (
    <BaseSelect
      {...props}
      options={partySizeOptions()}
      type="party-size"
    />
  );
};

export default PartySizeSelect;
