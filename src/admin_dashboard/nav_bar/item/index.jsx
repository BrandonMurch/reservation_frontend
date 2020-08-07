// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Stylesheets
import style from './item.module.css';

const Item = function NavBarItem({ label, to }) {
  return (
    <div className={style.container}>
      <Link className={style.text} to={to}>
        {label}
      </Link>
    </div>
  );
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Item;
