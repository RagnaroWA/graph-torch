import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';
import Nav from './Nav.js';
import $ from "jquery";

class Home extends Component {

  componentDidMount() {
    $("#down1").click(function() {
      $('html, body').animate({
        scrollTop: $(".container2").offset().top
      }, 500);
    });
    $("#down2").click(function() {
      $('html, body').animate({
        scrollTop: $(".container3").offset().top
      }, 500);
    });
    $("#down3").click(function() {
      $('html, body').animate({
        scrollTop: $(".container4").offset().top
      }, 500);
    });
  }
  render() {
    return (
      <div className="Home">
        <Nav></Nav>
        <div className="container1">
          <div id="title-1">
            <div id="title-main-1">
              GRAPH ANALYSIS
            </div>
            <hr id="hr"></hr>
            <div id="title-main-2">
              WITH QUALITY
            </div>
          </div>
          <div id="down1">
          </div>
        </div>

        <div className="container2">
          <div id="title-2">
            <div id="title-main-1">
              YOUR GRAPH FILE FROM GITHUB
            </div>
            <hr id="hr2"></hr>
            <div id="title-main-2">
              One Commit & One Click
            </div>
          </div>
          <div id="down2">
          </div>
        </div>

        <div className="container3">
          <div id="title-3">
            <div id="title-main-1">
              Homogeneous Graph
            </div>
            <hr id="hr3"></hr>
            <div id="homo">
            </div>
          </div>
          <div id="down3">
          </div>
        </div>

        <div className="container4">
          <div id="title-4">
            <div id="title-main-1">
              Heterogeneous Graph
            </div>
            <hr id="hr4"></hr>
            <div id="hete">
            </div>
          </div>
          <Link to={'./homo'}>
            <div id="right">
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Home;
