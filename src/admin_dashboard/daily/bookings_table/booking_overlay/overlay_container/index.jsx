// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import useEventListener from 'shared/useEventListener';

// Components
import Exit from './exit_button';

// Stylesheet
import style from './overlay_container.module.css';

const OverlayContainer = function ContainerForBookingOverlay({ children, exit }) {
  let isMouseOutsideContainer = true;
  const clickOutsideBox = () => {
    if (isMouseOutsideContainer) {
      exit(true);
    }
  };
  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      exit(true);
    }
  });
  return (
    <div
      className={style.background}
      role="none"
      onClick={() => clickOutsideBox()}
    >
      <div
        className={style.container}
        onMouseEnter={() => { isMouseOutsideContainer = false; }}
        onMouseLeave={() => { isMouseOutsideContainer = true; }}
      >
        <Exit onClick={() => exit(true)} />
        {children}
      </div>
    </div>
  );
};

OverlayContainer.propTypes = {
  children: PropTypes.shape(PropTypes.node.isRequired).isRequired,
  exit: PropTypes.func.isRequired,
};

export default OverlayContainer;
