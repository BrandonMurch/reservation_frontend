// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './tooltip.module.css';

const ToolTip = function ContactDetailsTooltip({ children }) {
  return (
    <div className={style.container}>
      <div className={style.toolTip}>
        {children}
      </div>

    </div>
  );
};

ToolTip.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ToolTip;
