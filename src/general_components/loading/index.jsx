import React from 'react';
import PropTypes from 'prop-types';

import style from './loading.module.css';

const getSpinnerStyle = (size) => ({
  small: style.smallSpinner,
  normal: style.spinner,
  large: style.largeSpinner,
})[size];

const Loading = function CreateLoadingScreen({ size }) {
  const spinnerStyle = getSpinnerStyle(size);

  return (
    <div
      className={spinnerStyle}
      role="presentation"
      aria-label="loading"
    />
  );
};

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'normal',
};

export default Loading;
