// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/enum';

// Stylesheet
import style from './banner.module.css';

export const bannerTypes = enumeration.singleValue('SUCCESS', 'ERROR', 'STANDARD');

const Banner = function InformationBannerTopOfPage({ type, message }) {
  return (
    <div className={style[type.value]} role="banner">
      <p style={{ whiteSpace: 'break-spaces' }}>{message}</p>
    </div>
  );
};

Banner.propTypes = {
  type: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  message: PropTypes.string.isRequired,
};

Banner.defaultProps = {
  type: {
    value: 'standard',
  },
};

export default Banner;
