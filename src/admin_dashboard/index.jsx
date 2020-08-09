// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Nav from './nav_bar';
import NavItem from './nav_bar/item';
import Monthly from './monthly';

const Dashboard = function AdminDashboard() {
  return (
    <div>
      <Nav>
        <NavItem label="Monthly" to="/admin/monthly" />
        <NavItem label="Daily Run Sheet" to="/admin/daily" />
        <NavItem label="Options" to="/admin/options" />
      </Nav>
      <Switch>
        <Route exact path="/admin/monthly" component={Monthly} />
      </Switch>
    </div>
  );
};

export default Dashboard;
