// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Stylesheet
import style from './banner.module.css';

export const bannerTypes = enumeration(
  'SUCCESS', 'ERROR', 'STANDARD',
);

const Banner = function InformationBannerTopOfPage(props) {
  const { type, message } = props;
  let bannerStyle;
  switch (type) {
    case (bannerTypes.SUCCESS):
      bannerStyle = style.success;
      break;
    case (bannerTypes.ERROR):
      bannerStyle = style.error;
      break;
    default:
      bannerStyle = style.standard;
      break;
  }

  return (
    <div className={bannerStyle}>
      <p>
        {message}
      </p>
    </div>
  );
};

Banner.propTypes = {
  type: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.string.isRequired,
};

export default Banner;
