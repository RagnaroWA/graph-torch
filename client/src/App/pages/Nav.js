import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.scss';

class Nav extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="navigation">
        <Link className="home-link" to={'./'}>
          <div className="home-button">
            GRAPH TORCH
          </div>
        </Link>

        <div className="links">
          <Link className="about-link" to={'./about'}>
            <div className="about-button">
              ABOUT
            </div>
          </Link>

          <Link className="hete-link" to={'./hete'}>
            <div className="hete-button">
              HETE
            </div>
          </Link>

          <Link className="homo-link" to={'./homo'}>
            <div className="homo-button">
              HOMO
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Nav;
