import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.js';
import styles from './Homo.scss';
import { VictoryBar } from 'victory';

class Homo extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      inputValue: "",
      show: false,
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      alert("Submit");
      this.setState({show: true});
    }
  }

  render() {
    const showVictory = this.state['show'];
    return (
      <div className="Home-homo">
        <Nav></Nav>
        <div id="title-3">
          <div id="title-main-1">
            HOMOGENEOUS GRAPH
          </div>
          <hr id="hr3"></hr>
          <div id="homo">
          </div>
        </div>

        <div className="input-url-container">
          <div className="input-file">
            Your GitHub Graph File Path
          </div>
          <input className="input-url" type="text" placeholder=" Enter to Submit" value={this.state.inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}>
          </input>
        </div>
        {
          showVictory
            ?
              <div className="victory-bar">
                <VictoryBar style={{data: { width: 30 }}}>
                </VictoryBar>
              </div>
            :
            null
        }
      </div>
    );
  }
}
export default Homo;
