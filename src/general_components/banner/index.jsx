// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Stylesheet
import style from './banner.module.css';

export const bannerTypes = enumeration.singleValue('SUCCESS', 'ERROR', 'STANDARD');

const Banner = function InformationBannerTopOfPage({ type, message }) {
  return (
    <div className={style[type.value]} role="banner">
      <div>{message}</div>
    </div>
  );
};

Banner.propTypes = {
  type: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  message: PropTypes.shape({}).isRequired,
};

Banner.defaultProps = {
  type: {
    value: 'standard',
  },
};

export default Banner;
