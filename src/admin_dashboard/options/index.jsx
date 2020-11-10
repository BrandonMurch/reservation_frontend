// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Components
import NavBar from '../nav_bar';
import NavItem from '../nav_bar/item';
import TableList from './tables';

// Stylesheets
import style from './options.module.css';

const Options = function RestaurantOptions({ locationOfParent }) {
  return (
    <>
      <NavBar secondary>
        <NavItem label="Tables" to={`${locationOfParent}/tables`} />
        <NavItem label="Rules" to={`${locationOfParent}/rules`} />
        <NavItem label="Restaurant" to={`${locationOfParent}/restaurant`} />
      </NavBar>
      <div className={style.container}>
        <Switch>
          <Route path={`${locationOfParent}/tables`} component={TableList} />
          <Route path={`${locationOfParent}/rules`} />
          <Route path={`${locationOfParent}/restaurant`} />
        </Switch>
      </div>

    </>
  );
};

Options.propTypes = {
  locationOfParent: PropTypes.string.isRequired,
};

export default Options;
