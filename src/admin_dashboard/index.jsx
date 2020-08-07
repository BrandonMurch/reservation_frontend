// Dependencies
import React from 'react';

// Components
import Nav from './nav_bar';
import NavItem from './nav_bar/item';

const Dashboard = function AdminDashboard() {
  return (
    <div>
      <Nav>
        <NavItem label="Monthly" to="/admin/monthly" />
        <NavItem label="Daily Run Sheet" to="/admin/daily" />
        <NavItem label="Options" to="/admin/options" />
      </Nav>
    </div>
  );
};

export default Dashboard;
