import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/favorites">
          Favorites
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
