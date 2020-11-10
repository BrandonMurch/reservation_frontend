// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './nav_bar.module.css';

const Nav = function NavigationBar({ children, secondary }) {
  return (
    <div className={secondary ? style.secondary : style.container}>
      {children}
    </div>
  );
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
};

Nav.defaultProps = {
  secondary: false,
};

export default Nav;
