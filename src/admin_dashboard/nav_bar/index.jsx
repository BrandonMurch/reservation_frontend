import React from 'react';
import PropTypes from 'prop-types';

const Nav = function NavigationBar({ children }) {
  return <div>{children}</div>;
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
