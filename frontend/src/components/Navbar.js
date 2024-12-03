import React from "react";
import './Navbar.css'

function Navbar() {
  return (
    <div className="Nav-container">
      <div className="Heading" href="/">
      RBAC
      </div>
      <div>
        <div className="navbar-items">
            <ul className="nav-items">
            <li>
                <a href="/" className="Login">
                Login
                </a>
            </li>
            <li>
                <a href="/" className="Roles">
                Roles
                </a>
            </li>
            <li>
                <a href="/" className="Users">
                Users
                </a>
            </li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
