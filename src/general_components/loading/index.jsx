import React from 'react';
import PropTypes from 'prop-types';

import style from './loading.module.css';

const getSpinnerSize = (size) => ({
  small: (<div className={style.smallSpinner} />),
  normal: (<div className={style.spinner} />),
  large: (<div className={style.largeSpinner} />),
})[size];

const Loading = function CreateLoadingScreen({ size }) {
  return getSpinnerSize(size);
};

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'normal',
};

export default Loading;
