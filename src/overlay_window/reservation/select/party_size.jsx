// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { emptyOption } from './shared';

// Components
import BaseSelect from './base_select';

const partySizeOptions = function createAListOfPartySizeOptionsForASelectInput(maxPartySize) {
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

const PartySizeSelect = function CreateAPartySizeDropDownSelectForForm({ max, ...props }) {
  return (
    <BaseSelect
      {...props}
      options={partySizeOptions(max)}
      type="party-size"
    />
  );
};

PartySizeSelect.propTypes = {
  max: PropTypes.number.isRequired,
};

export default PartySizeSelect;
