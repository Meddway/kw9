import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation: React.FC = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Finance Tracker</span>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories-page" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-transaction-page" className="nav-link">Add</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
};


export default Navigation;