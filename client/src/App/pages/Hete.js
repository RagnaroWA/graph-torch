import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './Nav.js';
import styles from './Hete.scss';
import { VictoryBar, VictoryChart, VictoryArea, VictoryAxis, VictoryTheme, VictoryStack, VictoryLegend, VictoryLabel, VictoryScatter } from 'victory';
import $ from "jquery";
import axios from 'axios';
import Modal from 'react-responsive-modal';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Page, Text, View, Document, PDFViewer, ReactPDF, PDFDownloadLink, StyleSheet, Font, Image } from '@react-pdf/renderer';

class Hete extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMetaChange = this.handleMetaChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      inputValue: "",
      show: false,
      open: false,
      error: null,
      numbermeta: "",
      metrics: [],
      vertexNum: [],
    }
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleMetaChange(event) {
    this.setState({numbermeta: event.target.value});
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      // alert("Submit");
      this.setState({show: true});
      this.submit();
    }
  }

  buttonSubmit() {
    this.setState({show: true});
    this.submit();
  }

  componentDidMount() {

  }

  submit() {
    let fetchAsync = async (filePath, metaNum) => {
      try {
        const data = await axios.get('/api/getHete', {
            params: {
              filePath:filePath,
              metaNum: metaNum,
            }
        })
        console.log(data['data'][0]);
        if(data['data'][0].includes("invalid") === true) {
          this.setState({open: true});
          this.setState({error: data['data'][0]});
          this.setState({show: false});
        }
        else{
          let res = data['data'][0];
          let resArray = res.split("\n")
          let renderArray = [];
          for(let i=0; i<resArray.length; i++) {
            renderArray.push([resArray[i], i]);
          }
          let string = renderArray[1][0].replace(/\,/g,'');
          string = string.replace(/\(/g,'');
          string = string.replace(/\)/g,'');
          let numVertices = string.split(" ");
          let vertexNum = [];
          for(let i=0; i<numVertices.length; i++) {
            if(i === 1) {
              vertexNum.push({x:numVertices[2], y:parseInt(numVertices[1]), symbol: "star", opacity: 0.9, fill: "black"});
            }
            if(i === 3) {
              vertexNum.push({x:numVertices[4], y:parseInt(numVertices[3]), symbol: "circle", opacity: 0.9, fill: "black"});
            }
            if(i === 5) {
              vertexNum.push({x:numVertices[6], y:parseInt(numVertices[5]), symbol: "diamond", opacity: 0.9, fill: "black"});
            }
          }
          console.log(vertexNum);
          this.setState({vertexNum:vertexNum});
          this.setState({metrics: renderArray});
          Font.register(
            { family: 'Oswald' , src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'},
          );
          const stylesPDF = StyleSheet.create({
            body: {
              paddingTop: 35,
              paddingBottom: 65,
              paddingHorizontal: 35,
            },
            title: {
              fontSize: 24,
              textAlign: 'center',
              fontFamily: 'Oswald'
            },
            header: {
              fontSize: 12,
              marginBottom: 20,
              textAlign: 'center',
              color: 'grey',
            },
            author: {
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 40,
            },
            subtitle: {
              fontSize: 18,
              margin: 12,
              textAlign: 'center',
              fontFamily: 'Oswald'
            },
            text: {
              margin: 12,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Times-Roman'
            },
            image: {
              marginVertical: 0,
              display:'block',
              margin:'auto',
              maxHeight: 80,
              maxWidth: 80,
            },
            pageNumber: {
              position: 'absolute',
              fontSize: 12,
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'grey',
            },
          });
          const Doc = () => (
                <Document>
                  <Page style={stylesPDF.body}>
                      <Text style={stylesPDF.header} fixed>
                        Created By GraphTorch
                      </Text>
                      <Text style={stylesPDF.title}>Heterogeneous Graph Analysis Report</Text>
                      <Text style={stylesPDF.author}>Zecheng Zhang</Text>
                      <Image
                        style={stylesPDF.image}
                        src='./torch.png'
                      />

                      <Text style={stylesPDF.subtitle}>
                        Graph Basics:
                      </Text>
                        <Text style={stylesPDF.text}>
                          {renderArray[0][0]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {renderArray[1][0]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {renderArray[2][0]}
                        </Text>

                      <Text style={stylesPDF.subtitle}>
                        Reciprocity:
                      </Text>
                        <Text style={stylesPDF.text}>
                          {renderArray[3][0]}
                        </Text>

                        <Text style={stylesPDF.subtitle}>
                          Gini Coefficient:
                        </Text>
                          <Text style={stylesPDF.text}>
                            {renderArray[4][0]}
                          </Text>

                          <Text style={stylesPDF.subtitle}>
                            Relative Edge Distribution Entropiey:
                          </Text>
                            <Text style={stylesPDF.text}>
                              {renderArray[5][0]}
                            </Text>

                            <Text style={stylesPDF.subtitle}>
                              Average Degree:
                            </Text>
                              <Text style={stylesPDF.text}>
                                {renderArray[6][0]}
                              </Text>
                    <Text style={stylesPDF.pageNumber} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />
                  </Page>
                </Document>
          );
          this.setState({doc: <Doc />});
        }
      }
      catch (error){
        console.log('error');
      }
    }
    fetchAsync(this.state.inputValue, this.state.numbermeta);
  }

  render() {
    const open = this.state['open'];
    const error = this.state['error'];
    const showVictory = this.state['show'];
    const metrics = this.state['metrics'];
    const vertexNum = this.state['vertexNum'];
    return (
      <div className="Home-hete">
        <Nav></Nav>
        <div id="title-3">
          <div id="title-main-1">
            HETEROGENEOUS GRAPH
          </div>
          <hr id="hr3"></hr>
          <div id="hete">
          </div>
        </div>

        <div className="input-url-container">
          <div className="input-file">
            Your GitHub Graph File Path
          </div>
          <input className="input-url" type="text" placeholder=" GitHub File Path" value={this.state.inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}>
          </input>
          <input className="input-meta" type="text" placeholder=" # Metapaths" value={this.state.numbermeta} onChange={this.handleMetaChange} onKeyPress={this.handleKeyPress}>
          </input>
          <div id="downinfo" onClick={this.buttonSubmit}>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} little className="modal">
          <h2 className="modal-error">ERROR:</h2>
          <h2>{error}</h2>
        </Modal>
        <div className="infocontainer">
        {
          showVictory
            ?
              <div>
                <div className="info">
                  {
                    metrics.map((metric) => {
                      return (
                        <div className="info-text" key={metric[1]}>
                          {metric[0]}
                        </div>
                      )
                    })
                  }
                </div>
                <div className="victory-chart">
                  <VictoryChart
                    theme={VictoryTheme.material}
                  >
                    <VictoryArea data={vertexNum}/>
                  </VictoryChart>
                </div>
                <div id="downinfo-2">
                    <PDFDownloadLink className="button-name" document={this.state['doc']} fileName="graphAnalysis.pdf">
                      {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download')}
                    </PDFDownloadLink>
                </div>
              </div>
            :
            null
        }
      </div>
      </div>
    );
  }
}
export default Hete;
