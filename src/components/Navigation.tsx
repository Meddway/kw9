import React from 'react';
import {Link} from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to='/'>
          <span className="navbar-brand">Finance Tracker</span>
        </Link>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <Link to="/categories" className="nav-link">Categories</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-transaction-page" className="nav-link">Add</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
