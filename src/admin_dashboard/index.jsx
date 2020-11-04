// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Stylesheets
import style from './admin_dashboard.module.css';

// Components
import Nav from './nav_bar';
import NavItem from './nav_bar/item';
import Monthly from './monthly';
import Daily from './daily';

const Dashboard = function AdminDashboard() {
  return (
    <div className={style.container}>
      <Nav>
        <NavItem label="Monthly" to="/admin/monthly" />
        <NavItem label="Daily Run Sheet" to="/admin/daily" />
        <NavItem label="Options" to="/admin/options" />
      </Nav>
      <Switch>
        <Route exact path="/admin/monthly" component={Monthly} />
        <Route path="/admin/daily/:date?" component={Daily} />
      </Switch>
    </div>
  );
};

export default Dashboard;
