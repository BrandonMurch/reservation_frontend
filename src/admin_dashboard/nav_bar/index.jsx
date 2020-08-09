// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './nav_bar.module.css';

const Nav = function NavigationBar({ children }) {
  return <div className={style.container}>{children}</div>;
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
