// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const DisplayComponent = ({ item }) => (
  <div>
    <h1>{item.name}</h1>
    <h1>{item.gender}</h1>
  </div>
);

DisplayComponent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
};

export default DisplayComponent;
