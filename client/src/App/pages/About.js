import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.js';
import styles from './About.scss';
import { VictoryBar } from 'victory';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home-about">
        <Nav></Nav>
        <div id="title-3">
          <div id="title-main-1">
            ABOUT
          </div>
          <hr id="hr3"></hr>

          <div id="title-contact">
            Contact: Zecheng
          </div>
          <div id="title-contact">
            <a href="mailto:zzhan147@illinois.edu" target="_blank">
              Email: zzhan147@illinois.edu
            </a>
          </div>
          <div id="title-contact">
            <a href="https://github.com/RagnaroWA" target="_blank">
              GitHub: RagnaroWA
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
