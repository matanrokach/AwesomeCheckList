import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <nav className="green lighten-1">
        <div className="nav-wrapper col s12">
          <a href="/" className="brand-logo left">CheckList</a>
          <ul className="right">
            <li className={this.props.active === 'archive' ? "active" : ""}><Link to="/archive">Archive</Link></li>
            <li className={this.props.active === 'tasklist' ? "active" : ""}><Link to="/">List</Link></li>
          </ul>
        </div>
        {this.props.path}
      </nav>
    );
  }
}

export default Header;
