import React from 'react';
import PropTypes from 'prop-types';

const DirectionalButton = function DirectionalButtonForSelector({
  dispatchDate, unit, direction, style,
}) {
  let number;
  let label;
  if (direction === 'up') {
    number = -1;
    label = '<';
  } else if (direction === 'down') {
    number = 1;
    label = '>';
  }

  return (
    <button
      className={style}
      type="button"
      onClick={() => {
        dispatchDate({
          unit,
          number,
          type: 'jumpUnit',
        });
      }}
    >
      {label}
    </button>
  );
};

DirectionalButton.propTypes = {
  dispatchDate: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  style: PropTypes.string,
};

DirectionalButton.defaultProps = {
  style: '',
};

export default DirectionalButton;
