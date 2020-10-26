// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Exit from '../exit_button';

// Stylesheet
import style from './overlay_container.module.css';

const OverlayContainer = function ContainerForBookingOverlay({ children, exit }) {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <Exit onClick={exit} />
        {children}
      </div>
    </div>
  );
};

OverlayContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  exit: PropTypes.func.isRequired,
};

export default OverlayContainer;
