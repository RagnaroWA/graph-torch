import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.js';
import styles from './About.scss';
import { VictoryBar } from 'victory';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const m = "m";
    const s = "s";
    return (
      <div className="Home-about">
        <Nav></Nav>
        <div id="title-3" className="down">
          <div id="title-main-1">
            ABOUT
          </div>
          <hr id="hr3"></hr>
          <div id="title-contact">
            Homogeneous Graph File Format:
          </div>
          <div id="title-contact-small">
            The homogeneous graph format should be two nodes in a line and empty space or tab between each node.
          </div>
          <br></br>
          <div id="file-format">
            <div id="file-format-inner">
              x y
            </div>
            <div id="file-format-inner">
              y z
            </div>
            <div id="file-format-inner">
              w x
            </div>
          </div>

          <br></br>
          <div id="title-contact">
            Heterogeneous Graph File Format:
          </div>
          <div id="title-contact-small">
            The heterogeneous graph format should include the node type information at last but link information similar with that in homogeneous graph. With the format x:y etc.
          </div>
          <div id="file-format">
            <div id="file-format-inner">
              x y
            </div>
            <div id="file-format-inner">
              y z
            </div>
            <div id="file-format-inner">
              w x
            </div>
            <div id="file-format-inner">
              x:1
            </div>
            <div id="file-format-inner">
              w:1
            </div>
            <div id="file-format-inner">
              y:2
            </div>
            <div id="file-format-inner">
              z:3
            </div>
          </div>

          <br></br>
          <div id="title-main-1">
            EQUATION
          </div>
          <hr id="hr3"></hr>
            <div id="title-contact">
              Reciprocity Equation:
            </div>
            <div id="title-contact-small">
              <BlockMath>{"y = \\frac{1}{m} |\\{ (u, v) \\in E \\} | \\{ (v, u) \\in E \\}|"}</BlockMath>
            </div>

            <div id="title-contact">
              Gini Coefficient Equation:
            </div>
            <div id="title-contact-small">
              <BlockMath>{"G = \\frac{2 \\sum_{i=1}^{n} i \\times d_i }{n \\sum_{i=1}^{n} d_i} - \\frac{n + 1}{n}, \\text{where } d_i \\text{ is ascending sorted degree}"}</BlockMath>
            </div>

            <div id="title-contact">
              Relative Edge Distribution Entropy Equation:
            </div>
            <div id="title-contact-small">
              <BlockMath>{"H_{er} = \\frac{1}{\\ln n} \\sum_{ u \\in V} - \\frac{d(u)}{2m} \\ln \\frac{d(u)}{2m}"}</BlockMath>
            </div>

          <br></br>
          <br></br>
          <div id="title-main-1">
            CONTACT
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
        <div className="footnote">
          <div className="footer-font">
            &copy; Zecheng Zhang
          </div>
        </div>
      </div>
    );
  }
}
export default About;
